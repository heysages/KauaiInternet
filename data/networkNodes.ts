import { candidateSites } from "@/data/candidateSites";
import type { NetworkNode, NodeClass, NetworkNodeRole, PowerConfiguration } from "@/types/network";

const siteToNodeClass: Record<string, NodeClass> = {
  "data-center-edge": "K4",
  "high-site-ridge": "K3",
  "backup-uplink": "K4",
  "emergency-anchor": "K5",
  "community-anchor": "K5",
  "public-wifi-zone": "K1",
  "partner-hosted": "K2",
};

const siteToRoles: Record<string, NetworkNodeRole[]> = {
  "data-center-edge": ["internetGateway", "localService", "reticulumTransport"],
  "high-site-ridge": ["backbone", "fixedWireless", "microwaveLink"],
  "backup-uplink": ["satelliteGateway", "internetGateway"],
  "emergency-anchor": ["emergencyComms", "wifiNode"],
  "community-anchor": ["wifiNode", "communityHub"],
  "public-wifi-zone": ["wifiNode"],
  "partner-hosted": ["loraRelay", "fixedWireless"],
};

/** Map legacy candidate sites to network nodes */
const candidateNodes: NetworkNode[] = candidateSites.map((site) => ({
  id: `node-${site.id}`,
  name: site.name,
  nodeClass: siteToNodeClass[site.type] ?? "K2",
  roles: siteToRoles[site.type] ?? ["loraRelay"],
  networkLayers:
    site.type === "backup-uplink" || site.type === "data-center-edge"
      ? (["internet", "kauaiLocal"] as const)
      : site.type === "high-site-ridge"
        ? (["internet", "kauaiLocal"] as const)
        : (["kauaiLocal", "resilientRadio"] as const),
  operationalStatus: site.status === "active" ? "live" : "proposed",
  permissionStatus: site.partnerName ? "activePartner" : "permissionRequired",
  visibility: "approximate",
  lat: site.lat,
  lng: site.lng,
  areaLabel: site.areaLabel,
  elevation: site.elevation,
  description: site.description,
  whyItMatters: site.whyItMatters,
  candidateSiteId: site.id,
  populationServed: site.populationServed,
  power: { grid: true, battery: site.type.includes("emergency") || site.type.includes("anchor") },
}));

/** North Shore pilot planning nodes — all proposed, no coverage claims */
const northShorePlanningNodes: NetworkNode[] = [
  {
    id: "node-haena-plan",
    name: "Hāʻena Planning Node",
    nodeClass: "K2",
    roles: ["loraRelay"],
    networkLayers: ["resilientRadio"],
    operationalStatus: "proposed",
    permissionStatus: "permissionRequired",
    visibility: "approximate",
    lat: 22.22,
    lng: -159.58,
    areaLabel: "Hāʻena · approximate",
    planningAreaId: "haena",
    description: "Proposed North Shore pilot relay endpoint.",
    whyItMatters: "Tests LoRa range from the island's northern gateway community.",
    power: { solar: true, solarWatts: 100, battery: true, batteryWh: 600, tier: 0, offGridRuntime: 48 },
  },
  {
    id: "node-hanalei-plan",
    name: "Hanalei Planning Node",
    nodeClass: "K2",
    roles: ["loraRelay", "wifiNode"],
    networkLayers: ["kauaiLocal", "resilientRadio"],
    operationalStatus: "proposed",
    permissionStatus: "permissionRequired",
    visibility: "approximate",
    lat: 22.21,
    lng: -159.5,
    areaLabel: "Hanalei · approximate",
    planningAreaId: "hanalei",
    description: "Proposed community relay in Hanalei valley area.",
    whyItMatters: "Valley terrain makes this a key RF measurement point for the pilot.",
    power: { solar: true, solarWatts: 100, battery: true, batteryWh: 600, tier: 0, offGridRuntime: 48 },
  },
  {
    id: "node-princeville-plan",
    name: "Princeville Planning Node",
    nodeClass: "K3",
    roles: ["backbone", "loraRelay"],
    networkLayers: ["kauaiLocal", "resilientRadio"],
    operationalStatus: "proposed",
    permissionStatus: "permissionRequired",
    visibility: "approximate",
    lat: 22.22,
    lng: -159.48,
    areaLabel: "Princeville · approximate",
    elevation: "~200 ft",
    planningAreaId: "princeville",
    description: "Proposed elevated backbone candidate for North Shore pilot.",
    whyItMatters: "Elevated sites may extend LoRa and fixed-wireless reach toward Kīlauea.",
    power: { solar: true, solarWatts: 200, battery: true, batteryWh: 1200, tier: 1, offGridRuntime: 72 },
  },
  {
    id: "node-kilauea-plan",
    name: "Kīlauea / Crater Hill Planning Node",
    nodeClass: "K3",
    roles: ["backbone", "loraRelay", "reticulumTransport"],
    networkLayers: ["kauaiLocal", "resilientRadio"],
    operationalStatus: "proposed",
    permissionStatus: "permissionRequired",
    visibility: "approximate",
    lat: 22.21,
    lng: -159.41,
    areaLabel: "Kīlauea · approximate",
    elevation: "~500 ft",
    planningAreaId: "kilauea",
    description: "Proposed strategic backbone site for North-to-East corridor.",
    whyItMatters: "Crater Hill area may offer line-of-sight toward both North Shore and Kapaʻa.",
    power: { solar: true, solarWatts: 200, battery: true, batteryWh: 1200, tier: 1, offGridRuntime: 72 },
  },
  {
    id: "node-anahola-plan",
    name: "Anahola Planning Node",
    nodeClass: "K2",
    roles: ["loraRelay"],
    networkLayers: ["resilientRadio"],
    operationalStatus: "proposed",
    permissionStatus: "permissionRequired",
    visibility: "approximate",
    lat: 22.15,
    lng: -159.32,
    areaLabel: "Anahola · approximate",
    planningAreaId: "anahola",
    description: "Proposed relay linking North Shore pilot toward East Side.",
    whyItMatters: "Coastal plain relay point between ridge and Kapaʻa corridor.",
    power: { solar: true, solarWatts: 100, battery: true, batteryWh: 600, tier: 0, offGridRuntime: 48 },
  },
  {
    id: "node-kapaa-plan",
    name: "Kapaʻa Pilot Endpoint",
    nodeClass: "K5",
    roles: ["communityHub", "wifiNode", "emergencyComms"],
    networkLayers: ["kauaiLocal", "resilientRadio"],
    operationalStatus: "proposed",
    permissionStatus: "permissionRequired",
    visibility: "approximate",
    lat: 22.08,
    lng: -159.32,
    areaLabel: "Kapaʻa · approximate",
    planningAreaId: "kapaa",
    description: "Proposed East Side pilot endpoint — community resilience hub candidate.",
    whyItMatters: "Tests whether North Shore pilot links can reach East Side population centers.",
    power: { solar: true, solarWatts: 400, battery: true, batteryWh: 2400, generator: true, generatorWatts: 2000, tier: 1, offGridRuntime: 72 },
  },
];

export const networkNodes: NetworkNode[] = [...candidateNodes, ...northShorePlanningNodes];

export function getNetworkNodeById(id: string): NetworkNode | undefined {
  return networkNodes.find((n) => n.id === id);
}

export function getNodesByPlanningArea(areaId: string): NetworkNode[] {
  return networkNodes.filter((n) => n.planningAreaId === areaId);
}

export function getNodesByClass(nodeClass: NodeClass): NetworkNode[] {
  return networkNodes.filter((n) => n.nodeClass === nodeClass);
}
