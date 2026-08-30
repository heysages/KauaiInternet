import type { PlanningArea } from "@/types/network";

/** Geographic planning areas — not promised tower locations */
export const planningAreas: PlanningArea[] = [
  { id: "haena", name: "Hāʻena", description: "North Shore gateway community", lat: 22.22, lng: -159.58, region: "north" },
  { id: "hanalei", name: "Hanalei", description: "North Shore bay community", lat: 22.21, lng: -159.5, region: "north" },
  { id: "princeville", name: "Princeville", description: "North Shore elevated community", lat: 22.22, lng: -159.48, region: "north" },
  { id: "kilauea", name: "Kīlauea / Crater Hill", description: "North-central ridge and coastal area", lat: 22.21, lng: -159.41, region: "north" },
  { id: "anahola", name: "Anahola", description: "East-north coastal community", lat: 22.15, lng: -159.32, region: "east" },
  { id: "kapaa", name: "Kapaʻa", description: "East Side population center", lat: 22.08, lng: -159.32, region: "east" },
  { id: "wailua", name: "Wailua", description: "East-central river corridor", lat: 22.04, lng: -159.34, region: "east" },
  { id: "lihue", name: "Līhuʻe", description: "Island commercial and services hub", lat: 21.98, lng: -159.37, region: "central" },
  { id: "kalepa", name: "Kalepa", description: "South-central elevated area", lat: 21.96, lng: -159.42, region: "central" },
  { id: "koloa-poipu", name: "Kōloa / Poʻipū", description: "South shore visitor and resident corridor", lat: 21.88, lng: -159.47, region: "south" },
  { id: "kalaheo", name: "Kalaheo", description: "Southwest ridge community", lat: 21.92, lng: -159.53, region: "south" },
  { id: "hanapepe", name: "Hanapēpē", description: "West Side historic town", lat: 21.91, lng: -159.59, region: "west" },
  { id: "waimea", name: "Waimea", description: "West end community", lat: 21.96, lng: -159.67, region: "west" },
  { id: "kekaha", name: "Kekaha", description: "West end coastal community", lat: 21.97, lng: -159.71, region: "west" },
  { id: "waimea-canyon", name: "Waimea Canyon", description: "Elevated western ridge sites (planning only)", lat: 22.05, lng: -159.65, region: "west" },
  { id: "central-ridge", name: "Central Ridge", description: "Interior ridge planning corridor", lat: 22.02, lng: -159.45, region: "central" },
];

export const northShorePilotAreaIds = [
  "haena",
  "hanalei",
  "princeville",
  "kilauea",
  "anahola",
  "kapaa",
] as const;
