/** Alternate map presentations for address-focused exploration */
export type MapViewMode = "community" | "live" | "scene" | "street";

export type MapCameraPreset = {
  zoom: number;
  pitch: number;
  bearing: number;
  terrainExaggeration: number;
  maxZoom: number;
};

export type SceneFeatureKind =
  | "infrastructure"
  | "island-asset"
  | "site"
  | "observation"
  | "concern";

export type SceneDeploymentStatus = "existing" | "proposed" | "community";

export type NearbySceneFeature = {
  id: string;
  name: string;
  kind: SceneFeatureKind;
  lat: number;
  lng: number;
  color: string;
  distanceKm: number;
  layerId: string;
  deploymentStatus: SceneDeploymentStatus;
};
