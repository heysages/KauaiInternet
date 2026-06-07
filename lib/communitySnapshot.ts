import { candidateSites } from "@/data/candidateSites";
import { waysToHelp } from "@/data/waysToHelp";
import { distanceKm } from "@/lib/propertyImpact";
import type { SampleAddress } from "@/types/network";

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

export type CommunitySnapshot = {
  headline: string;
  summary: string;
  nearbyProjects: { id: string; name: string; area: string }[];
  futureBenefits: string[];
  waysToParticipate: string[];
};

export function computeCommunitySnapshot(
  lat: number,
  lng: number,
  address?: SampleAddress
): CommunitySnapshot {
  const nearby = candidateSites
    .map((site) => ({ site, km: distanceKm(lat, lng, site.lat, site.lng) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, 3);

  const neighborhood = address?.neighborhood ?? "your area";
  const placeLabel =
    address?.placeType === "school"
      ? "school community"
      : address?.placeType === "business"
        ? "local business corridor"
        : address?.placeType === "landmark"
          ? "well-known community area"
          : address?.placeType === "public"
            ? "public gathering area"
            : "neighborhood";

  const nearestKm = nearby[0]?.km ?? 10;
  const headline =
    nearestKm < 5
      ? `A strong place to build community resilience`
      : nearestKm < 10
        ? `Growing opportunity for ${neighborhood}`
        : `Your voice matters for ${neighborhood}`;

  const summary = `This ${placeLabel} on Kauai could benefit from shared infrastructure, emergency readiness, and neighbors working together. Community projects are being explored nearby — and there are simple ways to participate.`;

  const futureBenefits = nearby.map(({ site, km }) => {
    if (site.type === "emergency-anchor" || site.type === "backup-uplink") {
      return `Stronger emergency readiness within the ${neighborhood} area`;
    }
    if (site.type === "public-wifi-zone" || site.type === "community-anchor") {
      return `Better connectivity near schools and gathering places (${site.areaLabel.replace(" · approximate", "")})`;
    }
    if (km < 8) {
      return `More connected neighborhoods as community projects move forward`;
    }
    return `Long-term preparedness for east-west connections across the island`;
  });

  const uniqueBenefits = [...new Set(futureBenefits)].slice(0, 3);
  if (uniqueBenefits.length === 0) {
    uniqueBenefits.push(
      "Stronger neighborhood connections during storms",
      "More support for schools and community spaces",
      "A shared plan shaped by local residents"
    );
  }

  const participation = waysToHelp
    .filter((w) => {
      if (w.id === "host-site") return nearestKm < 9;
      if (w.id === "land-building") return true;
      if (w.id === "organization") return address?.placeType === "school" || address?.placeType === "business";
      return true;
    })
    .map((w) => w.label)
    .slice(0, 4);

  return {
    headline,
    summary,
    nearbyProjects: nearby.map(({ site }) => ({
      id: site.id,
      name: FRIENDLY_PROJECT_NAMES[site.id] ?? site.name,
      area: site.areaLabel.replace(" · approximate", ""),
    })),
    futureBenefits: uniqueBenefits,
    waysToParticipate: participation,
  };
}
