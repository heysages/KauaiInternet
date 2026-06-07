import { candidateSites } from "@/data/candidateSites";
import { mapRegions } from "@/data/mapRegions";
import type { CandidateSite, MapLayer, MapPlanningStats } from "@/types/network";

function isSiteLayer(layer: MapLayer): boolean {
  return (
    !layer.isSupportLayer &&
    !layer.isInfrastructureLayer &&
    !layer.isConcernLayer &&
    !layer.isTechnologyLayer &&
    !layer.isIslandAssetsLayer &&
    !layer.isResidentKnowledgeLayer &&
    !layer.isConnectivityRegionLayer
  );
}

export function getVisibleSiteIds(layers: MapLayer[]): Set<string> {
  const enabled = layers.filter((l) => l.enabled && isSiteLayer(l));
  const ids = new Set<string>();

  for (const layer of enabled) {
    if (layer.isFutureOpportunitiesLayer || layer.isAllSitesLayer) {
      candidateSites.forEach((s) => ids.add(s.id));
    } else if (layer.siteTypes) {
      candidateSites
        .filter((s) => layer.siteTypes!.includes(s.type))
        .forEach((s) => ids.add(s.id));
    }
  }

  return ids;
}

export function getVisibleSites(layers: MapLayer[]): CandidateSite[] {
  const ids = getVisibleSiteIds(layers);
  return candidateSites.filter((s) => ids.has(s.id));
}

const DEFAULT_POPULATION_PER_SITE = 8500;

export function computeMapStats(layers: MapLayer[]): MapPlanningStats {
  const visible = getVisibleSites(layers);
  const populationServed = visible.reduce(
    (sum, s) => sum + (s.populationServed ?? DEFAULT_POPULATION_PER_SITE),
    0
  );

  const regionsWithSites = mapRegions.filter((region) => {
    const poly = region.polygon;
    const lngs = poly.map((p) => p[0]);
    const lats = poly.map((p) => p[1]);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    return visible.some(
      (s) => s.lng >= minLng && s.lng <= maxLng && s.lat >= minLat && s.lat <= maxLat
    );
  });

  const resilienceImpactPercent = Math.min(
    95,
    Math.round((visible.length / candidateSites.length) * 62 + regionsWithSites.length * 6)
  );

  return {
    populationServed,
    candidateSites: visible.length,
    resilienceImpactPercent,
    coverageZones: regionsWithSites.length,
  };
}
