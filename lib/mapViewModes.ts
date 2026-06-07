import type { MapCameraPreset, MapViewMode } from "@/types/mapView";

const ISLAND_CAMERA: MapCameraPreset = {
  zoom: 7.5,
  pitch: 0,
  bearing: 0,
  terrainExaggeration: 1.4,
  maxZoom: 14,
};

const FOCUS_CAMERAS: Record<MapViewMode, MapCameraPreset> = {
  community: {
    zoom: 11.2,
    pitch: 32,
    bearing: -12,
    terrainExaggeration: 1.4,
    maxZoom: 14,
  },
  live: {
    zoom: 16.8,
    pitch: 58,
    bearing: -28,
    terrainExaggeration: 1.85,
    maxZoom: 18,
  },
  scene: {
    zoom: 17.2,
    pitch: 68,
    bearing: -35,
    terrainExaggeration: 2.1,
    maxZoom: 18,
  },
  street: {
    zoom: 18.4,
    pitch: 78,
    bearing: -18,
    terrainExaggeration: 2.4,
    maxZoom: 19,
  },
};

export function cameraForView(
  mode: MapViewMode,
  hasFocus: boolean
): MapCameraPreset {
  return hasFocus ? FOCUS_CAMERAS[mode] : ISLAND_CAMERA;
}

/** Slight bearing offset from longitude so each address feels oriented uniquely */
export function focusBearingOffset(lng: number, mode: MapViewMode): number {
  if (mode === "community") return 0;
  const wave = Math.sin(lng * 40) * 8;
  if (mode === "scene") return wave + 6;
  if (mode === "street") return wave * 0.5;
  return wave;
}
