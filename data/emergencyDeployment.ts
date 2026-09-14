import type { DeploymentKit, DeploymentKitType, EmergencyAlert } from "@/types/network";

export const deploymentKitTypes: { id: DeploymentKitType; name: string; description: string }[] = [
  {
    id: "solarRelay",
    name: "Solar LoRa Relay",
    description: "Self-contained K2 node for extending mesh coverage in grid-down areas. Solar-powered with 48+ hour battery backup.",
  },
  {
    id: "communityHub",
    name: "Community Hub",
    description: "K5-class deployment for shelters and gathering points. Provides Wi-Fi, device charging, and local information services.",
  },
  {
    id: "backboneLink",
    name: "Backbone Link",
    description: "Point-to-point backhaul restoration kit. Re-establishes connectivity between network segments.",
  },
  {
    id: "meshExtender",
    name: "Mesh Extender",
    description: "Lightweight K1 node for filling coverage gaps. Battery-powered, rapid deployment.",
  },
];

export const deploymentKits: DeploymentKit[] = [
  {
    id: "kit-a1",
    name: "Solar Relay Kit Alpha",
    type: "solarRelay",
    nodeClass: "K2",
    status: "staged",
    location: "Staging required",
    estimatedDeploymentMinutes: 45,
    offGridRuntime: 48,
    solarCapable: true,
    components: [
      { name: "LoRa Radio (RAK/Heltec)", quantity: 1, category: "access-points-radios", notes: "Pre-configured with KauaiNet settings" },
      { name: "Raspberry Pi 4", quantity: 1, category: "edge-compute", notes: "Reticulum transport" },
      { name: "100W Solar Panel", quantity: 1, category: "solar", notes: "Foldable or rigid mount" },
      { name: "12V 50Ah LiFePO4 Battery", quantity: 1, category: "batteries-resilience", notes: "~600Wh capacity" },
      { name: "MPPT Charge Controller", quantity: 1, category: "solar", notes: "20A minimum" },
      { name: "5dBi Omni Antenna", quantity: 1, category: "antennas" },
      { name: "NEMA 4X Enclosure", quantity: 1, category: "mounting" },
      { name: "Mounting Hardware", quantity: 1, category: "mounting", notes: "Pole clamps, guy wires, stakes" },
      { name: "Cabling Kit", quantity: 1, category: "power-rack", notes: "Coax and power, pre-terminated" },
      { name: "Tool Kit", quantity: 1, category: "tools", notes: "Wrenches, zip ties, tape" },
    ],
  },
  {
    id: "kit-a2",
    name: "Solar Relay Kit Bravo",
    type: "solarRelay",
    nodeClass: "K2",
    status: "staged",
    location: "Staging required",
    estimatedDeploymentMinutes: 45,
    offGridRuntime: 48,
    solarCapable: true,
    components: [
      { name: "LoRa Radio (RAK/Heltec)", quantity: 1, category: "access-points-radios" },
      { name: "Raspberry Pi 4", quantity: 1, category: "edge-compute" },
      { name: "100W Solar Panel", quantity: 1, category: "solar" },
      { name: "12V 50Ah LiFePO4 Battery", quantity: 1, category: "batteries-resilience" },
      { name: "MPPT Charge Controller", quantity: 1, category: "solar" },
      { name: "Yagi Antenna", quantity: 1, category: "antennas", notes: "For directional coverage" },
      { name: "NEMA 4X Enclosure", quantity: 1, category: "mounting" },
      { name: "Mounting Hardware", quantity: 1, category: "mounting" },
      { name: "Cabling Kit", quantity: 1, category: "power-rack" },
      { name: "Tool Kit", quantity: 1, category: "tools" },
    ],
  },
  {
    id: "kit-a3",
    name: "Solar Relay Kit Charlie",
    type: "solarRelay",
    nodeClass: "K2",
    status: "staged",
    location: "Staging required",
    estimatedDeploymentMinutes: 45,
    offGridRuntime: 48,
    solarCapable: true,
    components: [
      { name: "LoRa Radio (RAK/Heltec)", quantity: 1, category: "access-points-radios" },
      { name: "Raspberry Pi 4", quantity: 1, category: "edge-compute" },
      { name: "100W Solar Panel", quantity: 1, category: "solar" },
      { name: "12V 50Ah LiFePO4 Battery", quantity: 1, category: "batteries-resilience" },
      { name: "MPPT Charge Controller", quantity: 1, category: "solar" },
      { name: "5dBi Omni Antenna", quantity: 1, category: "antennas" },
      { name: "NEMA 4X Enclosure", quantity: 1, category: "mounting" },
      { name: "Mounting Hardware", quantity: 1, category: "mounting" },
      { name: "Cabling Kit", quantity: 1, category: "power-rack" },
      { name: "Tool Kit", quantity: 1, category: "tools" },
    ],
  },
  {
    id: "kit-b1",
    name: "Community Hub Kit Alpha",
    type: "communityHub",
    nodeClass: "K5",
    status: "staged",
    location: "Staging required",
    estimatedDeploymentMinutes: 90,
    offGridRuntime: 72,
    solarCapable: true,
    components: [
      { name: "Wave AP (Outdoor)", quantity: 2, category: "access-points-radios" },
      { name: "MikroTik Router", quantity: 1, category: "routing-switching", notes: "DHCP, DNS, captive portal" },
      { name: "Raspberry Pi 4", quantity: 1, category: "edge-compute", notes: "Local info page, messaging" },
      { name: "200W Solar Array", quantity: 1, category: "solar", notes: "Portable panels" },
      { name: "12V 100Ah LiFePO4 Battery", quantity: 2, category: "batteries-resilience", notes: "2400Wh total" },
      { name: "Pure Sine Inverter 500W", quantity: 1, category: "power-rack" },
      { name: "USB Charging Station (10-port)", quantity: 1, category: "power-rack" },
      { name: "LoRa Radio", quantity: 1, category: "access-points-radios", notes: "Mesh connectivity" },
      { name: "Starlink Terminal", quantity: 1, category: "backup-internet", notes: "If backhaul required" },
      { name: "Generator 2000W", quantity: 1, category: "power-rack", notes: "Backup, 24+ hr fuel" },
      { name: "Signage Set", quantity: 1, category: "safety", notes: "Emergency Wi-Fi / Charging Station" },
      { name: "Extension Cords", quantity: 4, category: "power-rack" },
    ],
  },
  {
    id: "kit-b2",
    name: "Community Hub Kit Bravo",
    type: "communityHub",
    nodeClass: "K5",
    status: "staged",
    location: "Staging required",
    estimatedDeploymentMinutes: 90,
    offGridRuntime: 72,
    solarCapable: true,
    components: [
      { name: "Wave AP (Outdoor)", quantity: 2, category: "access-points-radios" },
      { name: "MikroTik Router", quantity: 1, category: "routing-switching" },
      { name: "Raspberry Pi 4", quantity: 1, category: "edge-compute" },
      { name: "200W Solar Array", quantity: 1, category: "solar" },
      { name: "12V 100Ah LiFePO4 Battery", quantity: 2, category: "batteries-resilience" },
      { name: "Pure Sine Inverter 500W", quantity: 1, category: "power-rack" },
      { name: "USB Charging Station (10-port)", quantity: 1, category: "power-rack" },
      { name: "LoRa Radio", quantity: 1, category: "access-points-radios" },
      { name: "Starlink Terminal", quantity: 1, category: "backup-internet" },
      { name: "Generator 2000W", quantity: 1, category: "power-rack" },
      { name: "Signage Set", quantity: 1, category: "safety" },
      { name: "Extension Cords", quantity: 4, category: "power-rack" },
    ],
  },
  {
    id: "kit-c1",
    name: "Backbone Link Kit Alpha",
    type: "backboneLink",
    nodeClass: "K3",
    status: "staged",
    location: "Staging required",
    estimatedDeploymentMinutes: 150,
    offGridRuntime: 36,
    solarCapable: true,
    components: [
      { name: "NanoBeam 5AC", quantity: 2, category: "wireless-backhaul", notes: "Point-to-point pair" },
      { name: "MikroTik Router", quantity: 1, category: "routing-switching" },
      { name: "100W Solar Panel", quantity: 1, category: "solar" },
      { name: "12V 50Ah LiFePO4 Battery", quantity: 1, category: "batteries-resilience" },
      { name: "MPPT Charge Controller", quantity: 1, category: "solar" },
      { name: "Tripod Mount", quantity: 2, category: "mounting", notes: "Temporary alignment" },
      { name: "Laptop with UISP/WinBox", quantity: 1, category: "edge-compute", notes: "Config and alignment" },
      { name: "Spectrum Analyzer", quantity: 1, category: "tools", notes: "Optional, interference check" },
      { name: "Cabling Kit", quantity: 1, category: "power-rack" },
      { name: "Tool Kit", quantity: 1, category: "tools" },
    ],
  },
  {
    id: "kit-c2",
    name: "Backbone Link Kit Bravo",
    type: "backboneLink",
    nodeClass: "K3",
    status: "staged",
    location: "Staging required",
    estimatedDeploymentMinutes: 150,
    offGridRuntime: 36,
    solarCapable: true,
    components: [
      { name: "NanoBeam 5AC", quantity: 2, category: "wireless-backhaul" },
      { name: "MikroTik Router", quantity: 1, category: "routing-switching" },
      { name: "100W Solar Panel", quantity: 1, category: "solar" },
      { name: "12V 50Ah LiFePO4 Battery", quantity: 1, category: "batteries-resilience" },
      { name: "MPPT Charge Controller", quantity: 1, category: "solar" },
      { name: "Tripod Mount", quantity: 2, category: "mounting" },
      { name: "Laptop with UISP/WinBox", quantity: 1, category: "edge-compute" },
      { name: "Cabling Kit", quantity: 1, category: "power-rack" },
      { name: "Tool Kit", quantity: 1, category: "tools" },
    ],
  },
];

export const teamDeploymentChecklist = [
  {
    phase: "pre-deployment",
    title: "Pre-Deployment",
    items: [
      { id: "weather", label: "Weather window confirmed safe for travel", required: true },
      { id: "inventory", label: "All deployment kits inventoried and charged", required: true },
      { id: "vehicle", label: "Vehicle(s) fueled and equipment loaded", required: true },
      { id: "comms", label: "Communication plan established (radio frequencies, check-in schedule)", required: true },
      { id: "access", label: "Site access permissions confirmed", required: true },
      { id: "safety", label: "Safety gear packed (hard hats, vests, gloves, first aid)", required: true },
      { id: "supplies", label: "Personal supplies (water, food, flashlights, rain gear)", required: true },
      { id: "docs", label: "Documentation and site info printed/downloaded", required: true },
    ],
  },
  {
    phase: "site-assessment",
    title: "Site Assessment (15 min)",
    items: [
      { id: "safe", label: "Confirm site is safe (no downed lines, structural damage)", required: true },
      { id: "antenna", label: "Identify optimal antenna placement", required: true },
      { id: "power-loc", label: "Locate power source or solar panel position", required: true },
      { id: "ground", label: "Verify ground/mounting surface stability", required: true },
    ],
  },
  {
    phase: "power-setup",
    title: "Power System Setup (20-30 min)",
    items: [
      { id: "solar-pos", label: "Position solar panel(s) facing south", required: true },
      { id: "controller", label: "Connect charge controller to battery", required: true },
      { id: "solar-connect", label: "Connect solar panel(s) to controller", required: true },
      { id: "verify-charge", label: "Verify charging indicator / voltage", required: true },
      { id: "load-connect", label: "Connect load output to equipment", required: true },
    ],
  },
  {
    phase: "equipment-deploy",
    title: "Equipment Deployment (20-40 min)",
    items: [
      { id: "antenna-mount", label: "Mount antenna at identified location", required: true },
      { id: "coax", label: "Connect antenna to radio with coax", required: true },
      { id: "power-on", label: "Power on equipment in sequence", required: true },
      { id: "verify-radio", label: "Verify radio connectivity (LED, mesh peers)", required: true },
      { id: "test-network", label: "Test network connectivity", required: true },
    ],
  },
  {
    phase: "verification",
    title: "Verification & Documentation (10-15 min)",
    items: [
      { id: "telemetry", label: "Confirm node in network status", required: false },
      { id: "end-user", label: "Test end-user connectivity", required: true },
      { id: "document", label: "Document site location and equipment", required: true },
      { id: "photos", label: "Take photos of installation", required: true },
      { id: "notify", label: "Notify operations center", required: true },
    ],
  },
];

export const currentAlerts: EmergencyAlert[] = [];

export function getKitsByType(type: DeploymentKitType): DeploymentKit[] {
  return deploymentKits.filter((k) => k.type === type);
}

export function getAvailableKits(): DeploymentKit[] {
  return deploymentKits.filter((k) => k.status === "staged");
}

export function getDeployedKits(): DeploymentKit[] {
  return deploymentKits.filter((k) => k.status === "deployed");
}

export const deploymentStats = {
  totalKits: deploymentKits.length,
  staged: deploymentKits.filter((k) => k.status === "staged").length,
  deployed: deploymentKits.filter((k) => k.status === "deployed").length,
  byType: {
    solarRelay: deploymentKits.filter((k) => k.type === "solarRelay").length,
    communityHub: deploymentKits.filter((k) => k.type === "communityHub").length,
    backboneLink: deploymentKits.filter((k) => k.type === "backboneLink").length,
    meshExtender: deploymentKits.filter((k) => k.type === "meshExtender").length,
  },
};
