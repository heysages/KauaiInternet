import type { StyleSpecification } from "maplibre-gl";

import { MAP_STYLE_URL } from "@/lib/mapStyle";
import type { MapViewMode } from "@/types/mapView";

/** Esri World Imagery — aerial “live” feel without API keys */
export const satelliteBasemapStyle: StyleSpecification = {
  version: 8,
  glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
  sources: {
    satellite: {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      attribution: "Tiles © Esri",
      maxzoom: 19,
    },
    "satellite-labels": {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      maxzoom: 19,
    },
  },
  layers: [
    { id: "satellite", type: "raster", source: "satellite" },
    {
      id: "satellite-labels",
      type: "raster",
      source: "satellite-labels",
      paint: { "raster-opacity": 0.55 },
    },
  ],
};

export function basemapStyleForMode(mode: MapViewMode): string | StyleSpecification {
  return mode === "community" ? MAP_STYLE_URL : satelliteBasemapStyle;
}

export function isSatelliteMode(mode: MapViewMode): boolean {
  return mode === "live" || mode === "scene" || mode === "street";
}

export function isImmersiveMode(mode: MapViewMode): boolean {
  return mode !== "community";
}

export function showsStreetPanorama(mode: MapViewMode): boolean {
  return mode === "street";
}
