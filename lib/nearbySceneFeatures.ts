import { candidateSites } from "@/data/candidateSites";
import { existingInfrastructure } from "@/data/existingInfrastructure";
import { islandAssets } from "@/data/islandAssets";
import { communityMapLayers } from "@/data/communityMapLayers";
import { distanceKm } from "@/lib/propertyImpact";
import { loadAllConcernMarkers } from "@/lib/concernMarkerStorage";
import { loadAllResidentObservations } from "@/lib/residentKnowledgeStorage";
import type { MapLayer } from "@/types/network";
import type {
  NearbySceneFeature,
  SceneDeploymentStatus,
  SceneFeatureKind,
} from "@/types/mapView";

const MAX_BEAM_KM = 8;
const MAX_FEATURES = 6;
const MAX_GROUND_FEATURES = 12;

function layerEnabled(layers: MapLayer[], id: string): boolean {
  return layers.find((l) => l.id === id)?.enabled ?? false;
}

function pushFeature(
  list: NearbySceneFeature[],
  item: Omit<NearbySceneFeature, "distanceKm"> & { distanceKm?: number },
  lat: number,
  lng: number
) {
  const distance = item.distanceKm ?? distanceKm(lat, lng, item.lat, item.lng);
  if (distance > MAX_BEAM_KM) return;
  list.push({ ...item, distanceKm: distance });
}

function collectNearbyFeatures(
  lat: number,
  lng: number,
  layers: MapLayer[],
  futureProgress: number
): NearbySceneFeature[] {
  const features: NearbySceneFeature[] = [];
  const showFuture = layerEnabled(layers, "future-opportunities") || futureProgress > 20;

  if (layerEnabled(layers, "existing-connectivity")) {
    for (const infra of existingInfrastructure) {
      pushFeature(
        features,
        {
          id: infra.id,
          name: infra.name,
          kind: "infrastructure",
          lat: infra.lat,
          lng: infra.lng,
          color: "#1a6b7c",
          layerId: "existing-connectivity",
          deploymentStatus: "existing",
        },
        lat,
        lng
      );
    }
  }

  if (layerEnabled(layers, "island-assets")) {
    for (const asset of islandAssets) {
      pushFeature(
        features,
        {
          id: asset.id,
          name: asset.name,
          kind: "island-asset",
          lat: asset.lat,
          lng: asset.lng,
          color: "#1a6b7c",
          layerId: "island-assets",
          deploymentStatus: "existing",
        },
        lat,
        lng
      );
    }
  }

  const showSites = showFuture || layerEnabled(layers, "existing-connectivity");
  if (showSites) {
    for (const site of candidateSites) {
      const isProposed = showFuture;
      pushFeature(
        features,
        {
          id: site.id,
          name: site.name,
          kind: "site",
          lat: site.lat,
          lng: site.lng,
          color: isProposed ? "#5a9a7a" : "#f4b942",
          layerId: isProposed ? "future-opportunities" : "existing-connectivity",
          deploymentStatus: isProposed ? "proposed" : "existing",
        },
        lat,
        lng
      );
    }
  }

  if (layerEnabled(layers, "what-residents-know")) {
    for (const obs of loadAllResidentObservations()) {
      pushFeature(
        features,
        {
          id: obs.id,
          name: obs.locationLabel || "Neighbor observation",
          kind: "observation",
          lat: obs.lat,
          lng: obs.lng,
          color: "#c4a574",
          layerId: "what-residents-know",
          deploymentStatus: "community",
        },
        lat,
        lng
      );
    }
  }

  if (layerEnabled(layers, "community-concerns") || futureProgress > 40) {
    for (const concern of loadAllConcernMarkers()) {
      pushFeature(
        features,
        {
          id: concern.id,
          name: concern.locationLabel || "Community question",
          kind: "concern",
          lat: concern.lat,
          lng: concern.lng,
          color: "#d4a574",
          layerId: "community-concerns",
          deploymentStatus: "community",
        },
        lat,
        lng
      );
    }
  }

  return features;
}

function pickBalanced(
  features: NearbySceneFeature[],
  limits: Partial<Record<SceneDeploymentStatus, number>>,
  maxTotal: number
): NearbySceneFeature[] {
  const buckets: Record<SceneDeploymentStatus, NearbySceneFeature[]> = {
    existing: [],
    proposed: [],
    community: [],
  };

  for (const feature of features.sort((a, b) => a.distanceKm - b.distanceKm)) {
    buckets[feature.deploymentStatus].push(feature);
  }

  const picked: NearbySceneFeature[] = [];
  const seen = new Set<string>();

  const take = (status: SceneDeploymentStatus, count: number) => {
    for (const feature of buckets[status]) {
      if (picked.length >= maxTotal || count <= 0) break;
      if (seen.has(feature.id)) continue;
      picked.push(feature);
      seen.add(feature.id);
      count -= 1;
    }
  };

  take("existing", limits.existing ?? 4);
  take("proposed", limits.proposed ?? 4);
  take("community", limits.community ?? 3);

  for (const feature of features) {
    if (picked.length >= maxTotal) break;
    if (seen.has(feature.id)) continue;
    picked.push(feature);
    seen.add(feature.id);
  }

  return picked.sort((a, b) => a.distanceKm - b.distanceKm);
}

export function getNearbySceneFeatures(
  lat: number,
  lng: number,
  layers: MapLayer[],
  futureProgress: number
): NearbySceneFeature[] {
  return collectNearbyFeatures(lat, lng, layers, futureProgress)
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, MAX_FEATURES);
}

/** Ground view — ensure infrastructure, community data, and proposed deployments all appear */
export function getGroundViewSceneFeatures(
  lat: number,
  lng: number,
  layers: MapLayer[],
  futureProgress: number
): NearbySceneFeature[] {
  const all = collectNearbyFeatures(lat, lng, layers, futureProgress);
  const showFuture = layerEnabled(layers, "future-opportunities") || futureProgress > 20;

  return pickBalanced(
    all,
    {
      existing: 5,
      proposed: showFuture ? 4 : 0,
      community: 3,
    },
    MAX_GROUND_FEATURES
  );
}

export function sceneLayerLabels(layers: MapLayer[]): { id: string; name: string; color: string }[] {
  return communityMapLayers
    .filter((meta) => layers.find((l) => l.id === meta.id)?.enabled)
    .map((meta) => ({ id: meta.id, name: meta.name, color: meta.color }));
}

export function kindLabel(kind: SceneFeatureKind, feature?: NearbySceneFeature): string {
  if (feature?.deploymentStatus === "proposed") {
    return "Proposed deployment";
  }
  switch (kind) {
    case "infrastructure":
      return "Infrastructure";
    case "island-asset":
      return "Island asset";
    case "site":
      return "Community site";
    case "observation":
      return "Neighbor report";
    case "concern":
      return "Community voice";
    default:
      return "Connection";
  }
}
