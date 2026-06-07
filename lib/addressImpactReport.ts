import { candidateSites } from "@/data/candidateSites";
import { connectivityServiceLabels } from "@/data/connectivityProviders";
import { islandAssetCategoryLabels, islandAssets } from "@/data/islandAssets";
import { mapRegions } from "@/data/mapRegions";
import { regionConnectivityProfiles } from "@/data/regionConnectivity";
import { waysToHelp } from "@/data/waysToHelp";
import { computeCommunitySnapshot } from "@/lib/communitySnapshot";
import { distanceKm } from "@/lib/propertyImpact";
import type { AddressImpactReport, CommunityScoreSet, SampleAddress } from "@/types/network";

const FRIENDLY_PROJECT_NAMES: Record<string, string> = {
  "central-edge-candidate": "Central island community hub idea",
  "east-ridge-candidate": "East side connection project",
  "north-emergency-candidate": "North shore readiness hub",
  "north-community-candidate": "North shore gathering place",
  "west-uplink-candidate": "West side preparedness site",
  "south-wifi-candidate": "South shore community Wi-Fi idea",
  "west-partner-candidate": "West end neighborhood project",
  "west-community-candidate": "Waimea area community anchor",
  "east-emergency-candidate": "East shore emergency readiness",
  "south-community-candidate": "South shore school & center project",
};

function pointInPolygon(lng: number, lat: number, polygon: [number, number][]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    const intersect =
      yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function findRegionId(lat: number, lng: number): string | null {
  for (const region of mapRegions) {
    if (pointInPolygon(lng, lat, region.polygon)) return region.id;
  }
  return mapRegions[0]?.id ?? null;
}

function computeScores(
  lat: number,
  lng: number,
  address: SampleAddress | undefined,
  futureProgress: number
): CommunityScoreSet {
  const regionId = findRegionId(lat, lng);
  const profile = regionConnectivityProfiles.find((p) => p.regionId === regionId);
  const nearbySites = candidateSites
    .map((s) => ({ s, km: distanceKm(lat, lng, s.lat, s.lng) }))
    .sort((a, b) => a.km - b.km);
  const nearestKm = nearbySites[0]?.km ?? 12;
  const nearbyAssets = islandAssets.filter(
    (a) => distanceKm(lat, lng, a.lat, a.lng) < 15
  ).length;

  const serviceCount = profile?.knownServiceTypes.length ?? 3;
  const baseConnectivity = Math.min(78, 28 + serviceCount * 8 - nearestKm * 1.5);
  const baseEmergency = Math.min(
    75,
    30 +
      nearbySites.filter(({ s }) => s.type === "emergency-anchor").length * 12 +
      nearbyAssets * 3
  );
  const baseResources = Math.min(82, 35 + nearbyAssets * 6);
  const baseResilience = Math.min(80, 32 + (profile?.resilienceConsiderations.length ?? 2) * 5);
  const baseParticipation = Math.min(
    88,
    40 +
      (address?.placeType === "school" || address?.placeType === "business" ? 12 : 0) +
      waysToHelp.length * 2
  );

  const boost = Math.round((futureProgress / 100) * 18);

  return {
    connectivity: Math.min(94, Math.round(baseConnectivity + boost * 0.6)),
    emergencyReadiness: Math.min(94, Math.round(baseEmergency + boost * 0.8)),
    communityResources: Math.min(94, Math.round(baseResources + boost * 0.7)),
    resilience: Math.min(94, Math.round(baseResilience + boost)),
    participationOpportunities: Math.min(94, Math.round(baseParticipation + boost * 0.5)),
  };
}

export function computeAddressImpactReport(
  lat: number,
  lng: number,
  address?: SampleAddress,
  futureProgress = 0
): AddressImpactReport {
  const snapshot = computeCommunitySnapshot(lat, lng, address);
  const regionId = findRegionId(lat, lng);
  const profile = regionConnectivityProfiles.find((p) => p.regionId === regionId);

  const connectivityOptions =
    profile?.knownServiceTypes.map((t) => connectivityServiceLabels[t]) ?? [
      "Mobile networks",
      "Satellite internet",
      "Varies by address — verify with providers",
    ];

  const nearbyAssets = islandAssets
    .map((asset) => ({ asset, km: distanceKm(lat, lng, asset.lat, asset.lng) }))
    .filter(({ km }) => km < 18)
    .sort((a, b) => a.km - b.km)
    .slice(0, 5)
    .map(({ asset, km }) => ({
      id: asset.id,
      name: asset.name,
      category: islandAssetCategoryLabels[asset.category],
      km,
    }));

  const nearbySites = candidateSites
    .map((site) => ({ site, km: distanceKm(lat, lng, site.lat, site.lng) }))
    .sort((a, b) => a.km - b.km);

  const emergencyResources = [
    ...nearbyAssets
      .filter((a) =>
        /healthcare|emergency|safety|hospital|shelter/i.test(a.category)
      )
      .map((a) => `${a.name} (~${a.km.toFixed(1)} km)`),
    ...nearbySites
      .filter(({ site }) => site.type === "emergency-anchor")
      .slice(0, 2)
      .map(({ site, km }) => `${site.name} — community readiness idea (~${km.toFixed(1)} km)`),
  ];

  if (emergencyResources.length === 0) {
    emergencyResources.push(
      "County emergency services — verify official channels for your area",
      "Community gathering places may serve as informal coordination points during outages"
    );
  }

  const nearestKm = nearbySites[0]?.km ?? 10;
  const participationOpportunities = waysToHelp
    .filter((w) => {
      if (w.id === "host-site") return nearestKm < 10;
      if (w.id === "organization")
        return address?.placeType === "school" || address?.placeType === "business";
      return true;
    })
    .map((w) => ({
      id: w.id,
      label: w.label,
      description: w.description,
      href: w.href,
    }));

  const visibleProjectCount = Math.max(1, Math.round((futureProgress / 100) * 4) + 1);
  const futureProjects = nearbySites.slice(0, visibleProjectCount).map(({ site, km }) => ({
    id: site.id,
    name: FRIENDLY_PROJECT_NAMES[site.id] ?? site.name,
    area: site.areaLabel.replace(" · approximate", ""),
    km,
  }));

  const futureBenefits = snapshot.futureBenefits.map((b) =>
    futureProgress > 50 ? b : b.replace(/could|may/gi, "might")
  );

  return {
    headline: snapshot.headline,
    summary: snapshot.summary,
    scores: computeScores(lat, lng, address, futureProgress),
    connectivityOptions,
    nearbyAssets,
    emergencyResources,
    participationOpportunities,
    futureProjects,
    futureBenefits,
  };
}
