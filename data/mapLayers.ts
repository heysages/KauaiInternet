import type { MapLayer } from "@/types/network";
import { candidateSites } from "@/data/candidateSites";
import { candidateSiteTypeById } from "@/data/candidateSiteTypes";

export type { MapLayer } from "@/types/network";

/** @deprecated Legacy shape — prefer candidateSites directly */
export type MapNode = {
  id: string;
  name: string;
  type: string;
  lat: number;
  lng: number;
  status: "active" | "staging" | "planned";
  elevation: string;
  notes: string;
  siteType?: string;
};

function siteStatusToNodeStatus(
  status: (typeof candidateSites)[number]["status"]
): MapNode["status"] {
  if (status === "active") return "active";
  if (status === "staging" || status === "approved") return "staging";
  return "planned";
}

export const mapNodes: MapNode[] = candidateSites.map((site) => ({
  id: site.id,
  name: site.name,
  type: site.type,
  lat: site.lat,
  lng: site.lng,
  status: siteStatusToNodeStatus(site.status),
  elevation: site.elevation ?? "—",
  notes: site.description,
  siteType: candidateSiteTypeById[site.type]?.label,
}));

export const mapLayers: MapLayer[] = [
  {
    id: "existing-infrastructure",
    name: "Existing Infrastructure",
    description: "Known fiber hubs, cell sites, and utility points (approximate)",
    color: "#64748b",
    enabled: true,
    isInfrastructureLayer: true,
  },
  {
    id: "candidate-sites",
    name: "Candidate Sites",
    description: "All proposed resilience network locations",
    color: "#40916c",
    enabled: true,
    isAllSitesLayer: true,
  },
  {
    id: "emergency-resilience",
    name: "Emergency Resilience",
    description: "Emergency anchors and backup uplink candidates",
    color: "#e8a317",
    enabled: true,
    siteTypes: ["emergency-anchor", "backup-uplink"],
  },
  {
    id: "public-wifi",
    name: "Public Wi-Fi",
    description: "Community Wi-Fi zones and public assembly connectivity",
    color: "#f4b942",
    enabled: true,
    siteTypes: ["public-wifi-zone", "community-anchor"],
  },
  {
    id: "edge-compute",
    name: "Edge Compute",
    description: "Ridge relays, partner sites, and distributed edge nodes",
    color: "#1a6b7c",
    enabled: true,
    siteTypes: ["high-site-ridge", "partner-hosted"],
  },
  {
    id: "future-data-center",
    name: "Future Data Center",
    description: "Proposed island edge aggregation and data center candidates",
    color: "#134e5e",
    enabled: true,
    siteTypes: ["data-center-edge"],
  },
  {
    id: "community-support",
    name: "Community Support",
    description: "Public support markers and community voices on the map",
    color: "#c084fc",
    enabled: true,
    isSupportLayer: true,
  },
];

export const mapConnections = [
  { from: "central-edge-candidate", to: "east-ridge-candidate" },
  { from: "east-ridge-candidate", to: "north-emergency-candidate" },
  { from: "central-edge-candidate", to: "west-uplink-candidate" },
  { from: "central-edge-candidate", to: "south-wifi-candidate" },
  { from: "west-uplink-candidate", to: "west-partner-candidate" },
  { from: "south-wifi-candidate", to: "west-community-candidate" },
  { from: "east-ridge-candidate", to: "east-emergency-candidate" },
];
