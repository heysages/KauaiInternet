import type { NodeClass } from "@/types/network";

export type NodeClassDefinition = {
  id: NodeClass;
  name: string;
  summary: string;
  functions: string[];
};

export const nodeClasses: NodeClassDefinition[] = [
  {
    id: "K1",
    name: "Community Node",
    summary: "Home or business local access point",
    functions: ["Wi-Fi", "Local access", "Optional LoRa", "Local messaging gateway"],
  },
  {
    id: "K2",
    name: "Relay Node",
    summary: "Low-cost resilient repeater",
    functions: ["LoRa relay", "Reticulum transport", "Solar power", "Telemetry"],
  },
  {
    id: "K3",
    name: "Backbone Node",
    summary: "Strategic elevated site",
    functions: [
      "High-gain antennas",
      "Multiple LoRa radios",
      "Fixed wireless",
      "Microwave",
      "Reticulum transport",
      "Substantial battery/solar",
    ],
  },
  {
    id: "K4",
    name: "Gateway Node",
    summary: "Connects KauaiInternet to external networks",
    functions: ["Fiber", "Commercial ISP", "Satellite", "Cellular backhaul"],
  },
  {
    id: "K5",
    name: "Community Resilience Hub",
    summary: "School, shelter, clinic, or community facility (proposed partnerships only)",
    functions: [
      "Wi-Fi",
      "Device charging",
      "Messaging",
      "Information display",
      "Network gateway",
      "Emergency communications",
    ],
  },
];

export const solarNodeDiagram = {
  title: "Autonomous KauaiInternet Node (Reference Design)",
  status: "proposed" as const,
  components: [
    { id: "solar", label: "Solar array and propane generator", next: "charge-controller" },
    { id: "charge-controller", label: "Charge controller or inverter/charger", next: "battery" },
    { id: "battery", label: "Battery bank and hot-swap spare", next: "computer" },
    { id: "computer", label: "Hub computer and community outlet", next: "radios" },
    { id: "radios", label: "Radios (LoRa / Wi-Fi / Fixed Wireless)", next: "optional" },
    { id: "optional", label: "Optional: Starlink, sensors, monitoring", next: null },
  ],
};
