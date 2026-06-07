import type { MapRegion } from "@/types/network";

/** Approximate planning regions — generalized polygons, not parcel boundaries. */
export const mapRegions: MapRegion[] = [
  {
    id: "north-shore",
    name: "North Shore",
    description: "Hanalei Bay to Kīlauea — flood-prone, often cut off during storms.",
    whyItMatters:
      "North shore communities lose road and telecom access together. Ridge relays and community anchors here could keep coordination links alive when Kūhiō Highway closes.",
    fillColor: "#1a6b7c",
    polygon: [
      [-159.55, 22.12],
      [-159.42, 22.12],
      [-159.40, 22.28],
      [-159.52, 22.28],
      [-159.55, 22.12],
    ],
  },
  {
    id: "east-side",
    name: "East Side",
    description: "Kapaʻa to Anahola — coastal corridor with ridge access inland.",
    whyItMatters:
      "The east side has the island's densest coastal population outside Līhuʻe. A pilot corridor here could test ridge-to-coast backhaul and community Wi-Fi zones.",
    fillColor: "#2d6a4f",
    polygon: [
      [-159.38, 22.00],
      [-159.28, 22.00],
      [-159.28, 22.12],
      [-159.38, 22.12],
      [-159.38, 22.00],
    ],
  },
  {
    id: "central",
    name: "Central Kauai",
    description: "Līhuʻe and surrounding areas — primary services and fiber handoff zone.",
    whyItMatters:
      "Central Kauai is the natural place for an edge aggregation node — close to services, transport, and existing fiber paths, without claiming a finished data center.",
    fillColor: "#134e5e",
    polygon: [
      [-159.42, 21.94],
      [-159.34, 21.94],
      [-159.34, 22.02],
      [-159.42, 22.02],
      [-159.42, 21.94],
    ],
  },
  {
    id: "south-shore",
    name: "South Shore",
    description: "Poʻipū to Kōloa — visitor load and local residential mix.",
    whyItMatters:
      "South shore sees seasonal bandwidth spikes. Resilient community Wi-Fi and a south anchor would help residents when tourist demand strains local ISP capacity.",
    fillColor: "#e8a317",
    polygon: [
      [-159.52, 21.86],
      [-159.42, 21.86],
      [-159.42, 21.94],
      [-159.52, 21.94],
      [-159.52, 21.86],
    ],
  },
  {
    id: "west-side",
    name: "West Side",
    description: "Waimea to Polihale — remote, canyon terrain, long fiber paths.",
    whyItMatters:
      "West Kauai is among the most remote and outage-prone areas. Satellite backup uplinks and partner-hosted ridge relays are especially valuable here.",
    fillColor: "#40916c",
    polygon: [
      [-159.80, 21.88],
      [-159.62, 21.88],
      [-159.62, 22.08],
      [-159.80, 22.08],
      [-159.80, 21.88],
    ],
  },
];
