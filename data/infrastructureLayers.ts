import type { MapLayer } from "@/types/network";

/** Granular infrastructure planner layers — site-type specific toggles */
export const infrastructureMapLayers: MapLayer[] = [
  {
    id: "existing-infrastructure",
    name: "Existing Infrastructure",
    description: "Fiber hubs, cell sites, ISP POPs, and utility substations",
    color: "#64748b",
    enabled: true,
    isInfrastructureLayer: true,
  },
  {
    id: "emergency-resilience",
    name: "Emergency Anchors",
    description: "Civil defense and first-responder coordination anchors",
    color: "#e8a317",
    enabled: true,
    siteTypes: ["emergency-anchor"],
  },
  {
    id: "edge-compute",
    name: "Candidate High Sites & Relays",
    description: "Ridge relays, elevated backhaul, and partner-hosted relay hops",
    color: "#2d6a4f",
    enabled: true,
    siteTypes: ["high-site-ridge", "partner-hosted"],
  },
  {
    id: "public-wifi",
    name: "Community Anchors & Wi-Fi",
    description: "Community hubs and public emergency Wi-Fi zones",
    color: "#40916c",
    enabled: true,
    siteTypes: ["community-anchor", "public-wifi-zone"],
  },
  {
    id: "future-data-center",
    name: "Proposed Data Center Nodes",
    description: "Island edge aggregation and sheltered compute candidates",
    color: "#1a6b7c",
    enabled: true,
    siteTypes: ["data-center-edge"],
  },
  {
    id: "candidate-sites",
    name: "Proposed Backup Uplinks",
    description: "Satellite and alternate uplink candidates with clear sky view",
    color: "#134e5e",
    enabled: true,
    siteTypes: ["backup-uplink"],
  },
  {
    id: "community-support",
    name: "Community Support Markers",
    description: "Public voices and volunteer interest on the map",
    color: "#c084fc",
    enabled: false,
    isSupportLayer: true,
  },
];
