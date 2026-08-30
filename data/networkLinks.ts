import { mapConnections } from "@/data/mapLayers";
import type { NetworkLink, LinkMedium } from "@/types/network";

/** Typed network links — enhanced from legacy mapConnections */
const legacyMediumMap: Record<string, LinkMedium> = {
  "central-edge-candidate→east-ridge-candidate": "fixedWireless",
  "east-ridge-candidate→north-emergency-candidate": "fixedWireless",
  "central-edge-candidate→west-uplink-candidate": "satellite",
  "central-edge-candidate→south-wifi-candidate": "wifi",
  "west-uplink-candidate→west-partner-candidate": "fixedWireless",
  "south-wifi-candidate→west-community-candidate": "wifi",
  "east-ridge-candidate→east-emergency-candidate": "fixedWireless",
};

function legacyLinks(): NetworkLink[] {
  return mapConnections.map((conn, i) => {
    const key = `${conn.from}→${conn.to}`;
    return {
      id: `link-legacy-${i}`,
      fromNodeId: `node-${conn.from}`,
      toNodeId: `node-${conn.to}`,
      medium: legacyMediumMap[key] ?? "fixedWireless",
      operationalStatus: "proposed",
      visibility: "public",
      bidirectional: false,
    };
  });
}

/** North Shore pilot corridor links — proposed only */
const pilotLinks: NetworkLink[] = [
  {
    id: "link-pilot-haena-hanalei",
    fromNodeId: "node-haena-plan",
    toNodeId: "node-hanalei-plan",
    medium: "lora",
    operationalStatus: "proposed",
    visibility: "public",
    label: "North Shore pilot segment",
  },
  {
    id: "link-pilot-hanalei-princeville",
    fromNodeId: "node-hanalei-plan",
    toNodeId: "node-princeville-plan",
    medium: "lora",
    operationalStatus: "proposed",
    visibility: "public",
  },
  {
    id: "link-pilot-princeville-kilauea",
    fromNodeId: "node-princeville-plan",
    toNodeId: "node-kilauea-plan",
    medium: "lora",
    operationalStatus: "proposed",
    visibility: "public",
  },
  {
    id: "link-pilot-kilauea-anahola",
    fromNodeId: "node-kilauea-plan",
    toNodeId: "node-anahola-plan",
    medium: "lora",
    operationalStatus: "proposed",
    visibility: "public",
  },
  {
    id: "link-pilot-anahola-kapaa",
    fromNodeId: "node-anahola-plan",
    toNodeId: "node-kapaa-plan",
    medium: "lora",
    operationalStatus: "proposed",
    visibility: "public",
  },
  {
    id: "link-reticulum-central-east",
    fromNodeId: "node-central-edge-candidate",
    toNodeId: "node-east-ridge-candidate",
    medium: "reticulumLogical",
    operationalStatus: "experimental",
    visibility: "public",
    label: "Reticulum transport (evaluation)",
  },
];

export const networkLinks: NetworkLink[] = [...legacyLinks(), ...pilotLinks];

export const linkMediumLabels: Record<LinkMedium, string> = {
  fiber: "Fiber",
  microwave: "Microwave",
  fixedWireless: "Fixed Wireless",
  wifi: "Wi-Fi",
  lora: "LoRa",
  radio: "Radio",
  satellite: "Satellite",
  internetBackhaul: "Internet Backhaul",
  reticulumLogical: "Reticulum (logical)",
};

export const linkMediumColors: Record<LinkMedium, string> = {
  fiber: "#3b82f6",
  microwave: "#8b5cf6",
  fixedWireless: "#06b6d4",
  wifi: "#f59e0b",
  lora: "#22c55e",
  radio: "#ef4444",
  satellite: "#6366f1",
  internetBackhaul: "#64748b",
  reticulumLogical: "#14b8a6",
};

export function getLinksForNode(nodeId: string): NetworkLink[] {
  return networkLinks.filter((l) => l.fromNodeId === nodeId || l.toNodeId === nodeId);
}
