import maplibregl from "maplibre-gl";

import { candidateSites } from "@/data/candidateSites";
import { mapRegions } from "@/data/mapRegions";
import { mapTowns } from "@/data/mapTowns";

export const KAUAI_CENTER: [number, number] = [-159.45, 22.05];

/** Pan/zoom limits — ocean margin around the island */
export const KAUAI_MAX_BOUNDS: [[number, number], [number, number]] = [
  [-160.05, 21.70],
  [-159.05, 22.36],
];

function collectIslandExtents() {
  const lngs: number[] = [];
  const lats: number[] = [];

  for (const site of candidateSites) {
    lngs.push(site.lng);
    lats.push(site.lat);
  }
  for (const town of mapTowns) {
    lngs.push(town.lng);
    lats.push(town.lat);
  }
  for (const region of mapRegions) {
    for (const [lng, lat] of region.polygon) {
      lngs.push(lng);
      lats.push(lat);
    }
  }

  // Full Kauai coastline envelope (approx.) — ensures west & south tips stay in frame
  lngs.push(-159.79, -159.31);
  lats.push(21.87, 22.22);

  return {
    west: Math.min(...lngs),
    east: Math.max(...lngs),
    south: Math.min(...lats),
    north: Math.max(...lats),
  };
}

export function getKauaiFitBounds(): maplibregl.LngLatBoundsLike {
  const { west, east, south, north } = collectIslandExtents();
  return [
    [west - 0.06, south - 0.05],
    [east + 0.06, north + 0.05],
  ];
}

export function fitKauaiIsland(map: maplibregl.Map) {
  const canvas = map.getCanvas();
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;

  map.fitBounds(getKauaiFitBounds(), {
    padding: {
      top: Math.max(52, h * 0.1),
      bottom: Math.max(72, h * 0.14),
      left: Math.max(52, w * 0.07),
      right: Math.max(52, w * 0.07),
    },
    pitch: 0,
    bearing: 0,
    duration: 0,
    maxZoom: 8.2,
  });
}
