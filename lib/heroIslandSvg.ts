/** Simplified Kauai coastline for the hero schematic (not survey-grade). */
export const KAUAI_COAST_PATH =
  "M 118 158 Q 108 128 118 98 Q 132 72 162 58 Q 198 48 232 58 Q 268 72 288 98 " +
  "Q 302 122 298 152 Q 290 182 268 208 Q 238 232 202 240 Q 168 246 138 234 " +
  "Q 108 218 98 188 Q 92 162 96 138 Q 102 122 118 158 Z";

export const HERO_MAP_BOUNDS = {
  west: -159.79,
  east: -159.31,
  south: 21.86,
  north: 22.23,
};

export function projectToHeroSvg(
  lng: number,
  lat: number,
  width: number,
  height: number,
  padding = 36
): { x: number; y: number } {
  const { west, east, south, north } = HERO_MAP_BOUNDS;
  const x =
    padding + ((lng - west) / (east - west)) * (width - padding * 2);
  const y =
    padding + ((north - lat) / (north - south)) * (height - padding * 2);
  return { x, y };
}
