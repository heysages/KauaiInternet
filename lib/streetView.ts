/** Street View embed helpers — optional Google API key, svembed fallback */

export type StreetViewPov = {
  heading: number;
  pitch: number;
  fov: number;
};

const DEFAULT_POV: StreetViewPov = { heading: 0, pitch: 0, fov: 90 };

function normalizeHeading(heading: number): number {
  return ((heading % 360) + 360) % 360;
}

/** Bearing from a longitude — gives each address a natural “look down the road” heading */
export function streetViewHeading(lng: number, lat: number): number {
  const wave = Math.sin(lng * 38) * 55;
  const latBias = (lat - 22.05) * 120;
  return normalizeHeading(210 + wave + latBias);
}

export function streetViewPov(lng: number, lat: number): StreetViewPov {
  return {
    ...DEFAULT_POV,
    heading: streetViewHeading(lng, lat),
    pitch: -2,
  };
}

function googleMapsApiKey(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ??
    process.env.GOOGLE_MAPS_API_KEY
  );
}

/** Google Maps Embed API — best quality when a key is configured */
export function streetViewEmbedUrl(
  lat: number,
  lng: number,
  pov: StreetViewPov = DEFAULT_POV
): string {
  const key = googleMapsApiKey();
  const heading = normalizeHeading(pov.heading);
  if (key) {
    const params = new URLSearchParams({
      key,
      location: `${lat},${lng}`,
      heading: String(heading),
      pitch: String(pov.pitch),
      fov: String(pov.fov),
    });
    return `https://www.google.com/maps/embed/v1/streetview?${params}`;
  }

  // No-key fallback used by many community sites
  const cbp = `11,${heading},${pov.pitch},0,0`;
  return `https://maps.google.com/maps?layer=c&cbll=${lat},${lng}&cbp=${cbp}&output=svembed`;
}

export function streetViewExternalUrl(lat: number, lng: number, pov?: StreetViewPov): string {
  const heading = normalizeHeading(pov?.heading ?? streetViewHeading(lng, lat));
  return `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}&heading=${heading}&pitch=${pov?.pitch ?? 0}`;
}
