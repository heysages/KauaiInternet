import { NextRequest, NextResponse } from "next/server";

/** Kauai bounding box — geocoding restricted to the island */
const KAUAI_BBOX = {
  minLng: -159.85,
  minLat: 21.85,
  maxLng: -159.3,
  maxLat: 22.28,
};

type GeocodeResponse = {
  id: string;
  label: string;
  lat: number;
  lng: number;
  neighborhood: string;
  placeType: "residential" | "business" | "school" | "public" | "landmark";
};

function inKauaiBounds(lat: number, lng: number): boolean {
  return (
    lat >= KAUAI_BBOX.minLat &&
    lat <= KAUAI_BBOX.maxLat &&
    lng >= KAUAI_BBOX.minLng &&
    lng <= KAUAI_BBOX.maxLng
  );
}

function neighborhoodFromLabel(label: string): string {
  const parts = label.split(",").map((p) => p.trim());
  return parts.length >= 2 ? parts[parts.length - 2] : parts[0] ?? "Kauai";
}

async function geocodeMapbox(query: string, token: string): Promise<GeocodeResponse[]> {
  const bbox = `${KAUAI_BBOX.minLng},${KAUAI_BBOX.minLat},${KAUAI_BBOX.maxLng},${KAUAI_BBOX.maxLat}`;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${token}&bbox=${bbox}&limit=6&country=US`;

  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  const features = data.features ?? [];

  return features
    .map((f: { id: string; place_name: string; center: [number, number]; place_type?: string[] }) => {
      const [lng, lat] = f.center;
      if (!inKauaiBounds(lat, lng)) return null;
      const types = f.place_type ?? [];
      const placeType = types.includes("poi")
        ? "landmark"
        : types.includes("address")
          ? "residential"
          : "public";
      return {
        id: String(f.id),
        label: f.place_name,
        lat,
        lng,
        neighborhood: neighborhoodFromLabel(f.place_name),
        placeType,
      } satisfies GeocodeResponse;
    })
    .filter(Boolean) as GeocodeResponse[];
}

async function geocodeNominatim(query: string): Promise<GeocodeResponse[]> {
  const viewbox = `${KAUAI_BBOX.minLng},${KAUAI_BBOX.maxLat},${KAUAI_BBOX.maxLng},${KAUAI_BBOX.minLat}`;
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query + " Kauai Hawaii")}&format=json&limit=6&viewbox=${viewbox}&bounded=1`;

  const res = await fetch(url, {
    headers: { "User-Agent": "KauaiResilienceNetwork/1.0 (community planning tool)" },
  });
  if (!res.ok) return [];
  const data = await res.json();

  return (data as { place_id: number; display_name: string; lat: string; lon: string; type?: string }[])
    .map((item) => {
      const lat = parseFloat(item.lat);
      const lng = parseFloat(item.lon);
      if (!inKauaiBounds(lat, lng)) return null;
      const placeType =
        item.type === "school" || item.type === "university"
          ? "school"
          : item.type === "commercial" || item.type === "retail"
            ? "business"
            : item.type === "tourism" || item.type === "attraction"
              ? "landmark"
              : "residential";
      return {
        id: String(item.place_id),
        label: item.display_name,
        lat,
        lng,
        neighborhood: neighborhoodFromLabel(item.display_name),
        placeType,
      } satisfies GeocodeResponse;
    })
    .filter(Boolean) as GeocodeResponse[];
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();
  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const mapboxToken =
      process.env.MAPBOX_ACCESS_TOKEN ?? process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    const results = mapboxToken
      ? await geocodeMapbox(query, mapboxToken)
      : await geocodeNominatim(query);

    return NextResponse.json({ results, source: mapboxToken ? "mapbox" : "nominatim" });
  } catch {
    return NextResponse.json({ results: [], error: "Geocoding unavailable" }, { status: 500 });
  }
}
