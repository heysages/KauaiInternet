import { candidateSites } from "@/data/candidateSites";
import { existingInfrastructure } from "@/data/existingInfrastructure";
import { propertyHelpCategories as helpCategoryOptions } from "@/data/propertyHelpCategories";
import { sampleAddresses } from "@/data/sampleAddresses";
import type { PropertyImpactSnapshot, SampleAddress } from "@/types/network";

const EARTH_RADIUS_KM = 6371;

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

export function distanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function searchSampleAddress(query: string): SampleAddress | null {
  const q = query.trim().toLowerCase();
  if (!q) return null;

  const exact = sampleAddresses.find(
    (a) =>
      a.address.toLowerCase() === q ||
      a.neighborhood.toLowerCase() === q ||
      a.id === q
  );
  if (exact) return exact;

  const partial = sampleAddresses.find(
    (a) =>
      a.address.toLowerCase().includes(q) ||
      a.neighborhood.toLowerCase().includes(q) ||
      q.split(/\s+/).every((word) => a.address.toLowerCase().includes(word))
  );
  return partial ?? null;
}

export function getAddressSuggestions(query: string, limit = 5): SampleAddress[] {
  const q = query.trim().toLowerCase();
  if (!q) return sampleAddresses.slice(0, limit);

  return sampleAddresses
    .filter(
      (a) =>
        a.address.toLowerCase().includes(q) ||
        a.neighborhood.toLowerCase().includes(q)
    )
    .slice(0, limit);
}

export function computePropertySnapshot(
  lat: number,
  lng: number,
  futureProgress = 50
): PropertyImpactSnapshot {
  const nearbySites = candidateSites
    .map((site) => ({ site, km: distanceKm(lat, lng, site.lat, site.lng) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, 4);

  const nearbyInfra = existingInfrastructure
    .map((infra) => ({ infra, km: distanceKm(lat, lng, infra.lat, infra.lng) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, 2);

  const nearestKm = nearbySites[0]?.km ?? 12;
  const baseScore = Math.max(18, Math.min(72, Math.round(68 - nearestKm * 4.2)));
  const futureBoost = Math.round((futureProgress / 100) * 22);
  const resilienceScore = Math.min(94, baseScore + futureBoost);

  const emergencyResources = [
    ...nearbySites
      .filter(({ site }) => site.type === "emergency-anchor")
      .map(({ site, km }) => `${site.name} (~${km.toFixed(1)} km)`),
    ...nearbyInfra
      .filter(({ infra }) => infra.type === "utility-substation")
      .map(({ infra, km }) => `${infra.name} (~${km.toFixed(1)} km)`),
  ];

  if (emergencyResources.length === 0) {
    emergencyResources.push(
      "Nearest emergency anchor still in planning — north or east shore candidates may apply"
    );
  }

  const coverageImprovements = nearbySites.slice(0, 3).map(({ site, km }) => {
    const label =
      site.type === "public-wifi-zone" || site.type === "community-anchor"
        ? "Community Wi-Fi reach"
        : site.type === "high-site-ridge"
          ? "Ridge relay backhaul"
          : "Resilience anchor coverage";
    return `${label} from ${site.name} (~${km.toFixed(1)} km)`;
  });

  const peopleEstimate = nearbySites.reduce(
    (sum, { site }) => sum + (site.populationServed ?? 4000) * 0.08,
    1200
  );

  const matchedHelpCategories = helpCategoryOptions
    .filter((cat) => {
      if (cat.id === "site-host") return nearestKm < 8;
      if (cat.id === "wifi-location") return nearestKm < 6;
      if (cat.id === "shelter-partner") return true;
      return cat.id === "technical-volunteer" || cat.id === "funding-supporter";
    })
    .map((c) => c.label);

  return {
    resilienceScore,
    nearbySiteIds: nearbySites.map(({ site }) => site.id),
    emergencyResources,
    coverageImprovements,
    communityBenefitEstimate: `~${Math.round(peopleEstimate).toLocaleString()} neighbors could benefit from improved relay paths in this corridor`,
    propertyHelpCategories: matchedHelpCategories,
  };
}
