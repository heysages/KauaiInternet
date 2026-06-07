import type {
  CandidateSite,
  CommunityConcernMarker,
  ExistingInfrastructure,
  IslandAsset,
  MapRegion,
  MapTown,
  ResidentObservation,
  SupportMarker,
  TechnologyOption,
} from "@/types/network";
import { concernCategoryColors } from "@/data/concernCategories";
import { dataConfidenceColors } from "@/data/dataConfidenceLegend";
import { candidateSiteTypeById } from "@/data/candidateSiteTypes";
import { islandAssetCategoryLabels } from "@/data/islandAssets";
import { residentObservationColors } from "@/data/residentObservationTypes";
import { mapConnections } from "@/data/mapLayers";

export function sitesToGeoJSON(
  sites: CandidateSite[],
  options?: { futureOpportunityOnly?: boolean }
) {
  const color = options?.futureOpportunityOnly
    ? dataConfidenceColors["future-opportunity"]
    : undefined;

  return {
    type: "FeatureCollection" as const,
    features: sites.map((site) => ({
      type: "Feature" as const,
      id: site.id,
      geometry: {
        type: "Point" as const,
        coordinates: [site.lng, site.lat],
      },
      properties: {
        id: site.id,
        name: site.name,
        type: site.type,
        status: site.status,
        color: color ?? candidateSiteTypeById[site.type]?.mapColor ?? "#94a3b8",
        areaLabel: site.areaLabel,
        dataConfidence: options?.futureOpportunityOnly
          ? "future-opportunity"
          : "verified",
      },
    })),
  };
}

export function islandAssetsToGeoJSON(assets: IslandAsset[]) {
  return {
    type: "FeatureCollection" as const,
    features: assets.map((asset) => ({
      type: "Feature" as const,
      id: asset.id,
      geometry: {
        type: "Point" as const,
        coordinates: [asset.lng, asset.lat],
      },
      properties: {
        id: asset.id,
        name: asset.name,
        category: asset.category,
        categoryLabel: islandAssetCategoryLabels[asset.category],
        color: dataConfidenceColors.verified,
        areaLabel: asset.areaLabel,
        dataConfidence: "verified",
      },
    })),
  };
}

export function residentObservationsToGeoJSON(observations: ResidentObservation[]) {
  return {
    type: "FeatureCollection" as const,
    features: observations.map((obs) => ({
      type: "Feature" as const,
      id: obs.id,
      geometry: {
        type: "Point" as const,
        coordinates: [obs.lng, obs.lat],
      },
      properties: {
        id: obs.id,
        observationType: obs.observationType,
        color: residentObservationColors[obs.observationType],
        dataConfidence: "community",
        locationLabel: obs.locationLabel,
      },
    })),
  };
}

export function markersToGeoJSON(markers: SupportMarker[]) {
  return {
    type: "FeatureCollection" as const,
    features: markers.map((marker) => ({
      type: "Feature" as const,
      id: marker.id,
      geometry: {
        type: "Point" as const,
        coordinates: [marker.lng, marker.lat],
      },
      properties: {
        id: marker.id,
        nameOrOrg: marker.nameOrOrg,
        supportType: marker.supportType,
        source: marker.source,
      },
    })),
  };
}

export function regionsToGeoJSON(regions: MapRegion[]) {
  return {
    type: "FeatureCollection" as const,
    features: regions.map((region) => ({
      type: "Feature" as const,
      id: region.id,
      geometry: {
        type: "Polygon" as const,
        coordinates: [[...region.polygon, region.polygon[0]]],
      },
      properties: {
        id: region.id,
        name: region.name,
        fillColor: region.fillColor,
      },
    })),
  };
}

export function connectionsToGeoJSON(sites: CandidateSite[]) {
  const byId = Object.fromEntries(sites.map((s) => [s.id, s]));
  const visibleIds = new Set(sites.map((s) => s.id));
  const features = mapConnections
    .filter(({ from, to }) => visibleIds.has(from) && visibleIds.has(to))
    .flatMap(({ from, to }) => {
      const a = byId[from];
      const b = byId[to];
      if (!a || !b) return [];
      return [
        {
          type: "Feature" as const,
          geometry: {
            type: "LineString" as const,
            coordinates: [
              [a.lng, a.lat],
              [b.lng, b.lat],
            ],
          },
          properties: { from, to },
        },
      ];
    });

  return { type: "FeatureCollection" as const, features };
}

const infraColors: Record<ExistingInfrastructure["type"], string> = {
  "fiber-hub": "#475569",
  "cell-tower": "#6366f1",
  "isp-pop": "#0ea5e9",
  "utility-substation": "#78716c",
};

export function infrastructureToGeoJSON(items: ExistingInfrastructure[]) {
  return {
    type: "FeatureCollection" as const,
    features: items.map((item) => ({
      type: "Feature" as const,
      id: item.id,
      geometry: {
        type: "Point" as const,
        coordinates: [item.lng, item.lat],
      },
      properties: {
        id: item.id,
        name: item.name,
        type: item.type,
        color: infraColors[item.type],
      },
    })),
  };
}

export function concernMarkersToGeoJSON(markers: CommunityConcernMarker[]) {
  return {
    type: "FeatureCollection" as const,
    features: markers.map((marker) => ({
      type: "Feature" as const,
      id: marker.id,
      geometry: {
        type: "Point" as const,
        coordinates: [marker.lng, marker.lat],
      },
      properties: {
        id: marker.id,
        nameOrOrg: marker.nameOrOrg,
        category: marker.category,
        color: concernCategoryColors[marker.category],
        source: marker.source,
      },
    })),
  };
}

export function technologyHighlightsToGeoJSON(
  sites: CandidateSite[],
  infrastructure: ExistingInfrastructure[],
  options: TechnologyOption[]
) {
  const enabled = options.filter((o) => o.enabled);
  const features: {
    type: "Feature";
    geometry: { type: "Point"; coordinates: [number, number] };
    properties: { id: string; name: string; color: string; techId: string };
  }[] = [];

  for (const tech of enabled) {
    if (tech.siteTypes) {
      for (const site of sites) {
        if (tech.siteTypes.includes(site.type)) {
          features.push({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [site.lng, site.lat],
            },
            properties: {
              id: `${tech.id}-${site.id}`,
              name: site.name,
              color: tech.color,
              techId: tech.id,
            },
          });
        }
      }
    }
    if (tech.infraTypes) {
      for (const infra of infrastructure) {
        if (tech.infraTypes.includes(infra.type)) {
          features.push({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [infra.lng, infra.lat],
            },
            properties: {
              id: `${tech.id}-${infra.id}`,
              name: infra.name,
              color: tech.color,
              techId: tech.id,
            },
          });
        }
      }
    }
  }

  return { type: "FeatureCollection" as const, features };
}

export function townsToGeoJSON(towns: MapTown[]) {
  return {
    type: "FeatureCollection" as const,
    features: towns.map((town) => ({
      type: "Feature" as const,
      id: town.id,
      geometry: {
        type: "Point" as const,
        coordinates: [town.lng, town.lat],
      },
      properties: {
        id: town.id,
        name: town.name,
      },
    })),
  };
}

export function sceneBeamsToGeoJSON(
  focusLng: number,
  focusLat: number,
  features: { lng: number; lat: number; color: string }[]
) {
  return {
    type: "FeatureCollection" as const,
    features: features.map((feature, index) => ({
      type: "Feature" as const,
      id: `beam-${index}`,
      geometry: {
        type: "LineString" as const,
        coordinates: [
          [focusLng, focusLat],
          [feature.lng, feature.lat],
        ],
      },
      properties: {
        color: feature.color,
      },
    })),
  };
}
