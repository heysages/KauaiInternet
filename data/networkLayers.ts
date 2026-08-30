import type { NetworkLayerId } from "@/types/network";

export type NetworkLayerDefinition = {
  id: NetworkLayerId;
  name: string;
  purpose: string;
  technologies: string[];
};

export const networkLayers: NetworkLayerDefinition[] = [
  {
    id: "internet",
    name: "Layer 1 — Internet",
    purpose: "High-bandwidth connectivity to the global Internet when upstream paths are available.",
    technologies: [
      "Fiber",
      "Fixed wireless",
      "Point-to-point wireless",
      "Microwave",
      "Commercial upstream",
      "Satellite / Starlink",
      "Cellular backhaul",
    ],
  },
  {
    id: "kauaiLocal",
    name: "Layer 2 — Kauaʻi Local Network",
    purpose: "Move local traffic around Kauaʻi without requiring mainland or cloud connectivity.",
    technologies: [
      "Wi-Fi",
      "Fixed wireless",
      "Microwave",
      "Ethernet",
      "Fiber",
      "Reticulum over IP",
      "Local servers and caches",
    ],
  },
  {
    id: "resilientRadio",
    name: "Layer 3 — Resilient Radio Mesh",
    purpose: "Low-power, low-bandwidth communications when conventional infrastructure fails.",
    technologies: [
      "LoRa",
      "Reticulum",
      "RNode-compatible hardware",
      "Meshtastic (experimental)",
      "VHF/UHF packet radio (where lawful)",
      "Conventional VHF/UHF voice",
      "Solar-powered relay nodes",
    ],
  },
];

export const networkPathConcept = {
  title: "Best Available Path",
  steps: ["Device", "Local Access Network", "KauaiInternet Resilient Network", "Best Available Path"],
  paths: [
    "Fiber",
    "Fixed wireless",
    "Microwave",
    "Wi-Fi",
    "LoRa",
    "Reticulum",
    "Traditional radio",
    "Cellular",
    "Satellite",
    "Other KauaiInternet nodes",
  ],
};
