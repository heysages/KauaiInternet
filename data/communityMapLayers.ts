import type { MapLayer } from "@/types/network";

/** Community map layers — existing knowledge first, then community input, then future ideas */
export const communityMapLayers: MapLayer[] = [
  {
    id: "existing-connectivity",
    name: "Existing Connectivity & Infrastructure",
    description: "What we know about connectivity by region — click an area to explore",
    color: "#1a6b7c",
    enabled: true,
    isConnectivityRegionLayer: true,
  },
  {
    id: "island-assets",
    name: "Island Assets",
    description: "Verified public schools, libraries, hospitals, and community facilities",
    color: "#1a6b7c",
    enabled: true,
    isIslandAssetsLayer: true,
  },
  {
    id: "what-residents-know",
    name: "What Residents Know",
    description: "Community observations — labeled as neighbor reports, not verified facts",
    color: "#c4a574",
    enabled: true,
    isResidentKnowledgeLayer: true,
  },
  {
    id: "future-opportunities",
    name: "Future Opportunities",
    description: "Ideas under discussion — visually distinct from existing infrastructure",
    color: "#5a9a7a",
    enabled: false,
    isFutureOpportunitiesLayer: true,
  },
  {
    id: "community-concerns",
    name: "Community Questions & Concerns",
    description: "Questions, ideas, and perspectives shared by neighbors",
    color: "#d4a574",
    enabled: true,
    isConcernLayer: true,
  },
  {
    id: "community-support",
    name: "Community Support",
    description: "Messages and voices from people across Kauai",
    color: "#c084fc",
    enabled: false,
    isSupportLayer: true,
  },
  {
    id: "technology-options",
    name: "Technology Options",
    description: "Different approaches being explored — no single solution",
    color: "#1a6b7c",
    enabled: false,
    isTechnologyLayer: true,
  },
];
