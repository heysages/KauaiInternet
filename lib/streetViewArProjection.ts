/** Project lat/lng features into street-view screen space from camera heading */

const DEG = Math.PI / 180;

export function bearingDegrees(
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number
): number {
  const lat1 = fromLat * DEG;
  const lat2 = toLat * DEG;
  const dLng = (toLng - fromLng) * DEG;
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  return (Math.atan2(y, x) / DEG + 360) % 360;
}

function normalizeAngle(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

export function angleDelta(cameraHeading: number, targetBearing: number): number {
  let delta = normalizeAngle(targetBearing) - normalizeAngle(cameraHeading);
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  return delta;
}

export type StreetArProjection = {
  x: number;
  y: number;
  visible: boolean;
  scale: number;
  bearingDelta: number;
};

export function projectFeatureToStreetView(
  viewerLat: number,
  viewerLng: number,
  featureLat: number,
  featureLng: number,
  cameraHeading: number,
  distanceKm: number,
  width: number,
  height: number,
  fov = 90
): StreetArProjection {
  const bearing = bearingDegrees(viewerLat, viewerLng, featureLat, featureLng);
  const delta = angleDelta(cameraHeading, bearing);
  const halfFov = fov / 2 + 10;
  const visible = Math.abs(delta) <= halfFov;

  const x = width / 2 + (delta / halfFov) * (width * 0.44);
  const horizonY = height * 0.36;
  const depthFactor = Math.min(distanceKm / 7, 1);
  const y = horizonY + depthFactor * height * 0.3 + Math.abs(delta) * 0.06;
  const scale = Math.max(0.6, 1.15 - depthFactor * 0.4);

  return { x, y, visible, scale, bearingDelta: delta };
}

export function streetViewFocusPoint(width: number, height: number): { x: number; y: number } {
  return { x: width / 2, y: height * 0.8 };
}
