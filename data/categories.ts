import type { NetworkAssetCategory } from "@/types/network";

export type CategoryMeta = {
  id: NetworkAssetCategory;
  label: string;
  shortLabel: string;
  description: string;
  pilotSummary: string;
  icon: "routing" | "backhaul" | "radio" | "antenna" | "power" | "compute" | "satellite" | "battery";
};

export const networkAssetCategories: CategoryMeta[] = [
  {
    id: "routing-switching",
    label: "Routing & Switching",
    shortLabel: "Routing",
    description: "Core and access-layer switches, routers, and patch infrastructure for site interconnect.",
    pilotSummary:
      "Enough switching to wire 2–3 pilot sites and a small edge aggregation point — not island-wide core capacity.",
    icon: "routing",
  },
  {
    id: "wireless-backhaul",
    label: "Wireless Backhaul",
    shortLabel: "Backhaul",
    description: "Point-to-point and high-capacity wireless links between ridge relays and hub sites.",
    pilotSummary:
      "Strong backhaul stock for linking a handful of ridge and coastal nodes in a pilot corridor.",
    icon: "backhaul",
  },
  {
    id: "access-points-radios",
    label: "Access Points / Radios",
    shortLabel: "Radios",
    description: "LTE, Wi-Fi, and fixed wireless radios for last-mile and community access.",
    pilotSummary:
      "Radios to serve pilot coverage zones — additional licensing, backhaul, and sites still needed beyond inventory.",
    icon: "radio",
  },
  {
    id: "antennas",
    label: "Antennas",
    shortLabel: "Antennas",
    description: "Sector, panel, and mounting hardware for relay and access deployments.",
    pilotSummary:
      "Mounting and antenna stock to support multiple relay builds; site surveys still required per location.",
    icon: "antenna",
  },
  {
    id: "power-rack",
    label: "Power & Rack Infrastructure",
    shortLabel: "Power & Rack",
    description: "PDUs, UPS, injectors, patch panels, and rack power for sheltered deployments.",
    pilotSummary:
      "Rack and power basics for a few sheltered nodes — outdoor power design still needed per site.",
    icon: "power",
  },
  {
    id: "edge-compute",
    label: "Edge Compute",
    shortLabel: "Edge",
    description: "Small-form-factor servers and industrial PCs for local caching, DNS, and services.",
    pilotSummary:
      "Compute to stand up one edge pilot node with local services — not a full data center build-out.",
    icon: "compute",
  },
  {
    id: "backup-internet",
    label: "Backup Internet / Starlink",
    shortLabel: "Backup Uplink",
    description: "Satellite and alternate uplink kits for redundancy when fiber or terrestrial links fail.",
    pilotSummary:
      "Two Starlink kits can backup a pilot uplink — not enough for island-wide satellite redundancy.",
    icon: "satellite",
  },
  {
    id: "batteries-resilience",
    label: "Batteries / Resilience Power",
    shortLabel: "Batteries",
    description: "Battery banks and resilience power for tower and relay runtime during grid outages.",
    pilotSummary:
      "Battery stock to support several tower sites in a pilot — solar, generator, and sizing work still TBD.",
    icon: "battery",
  },
];

export const categoryById = Object.fromEntries(
  networkAssetCategories.map((c) => [c.id, c])
) as Record<NetworkAssetCategory, CategoryMeta>;
