import type { OperationalStatus } from "@/types/network";

export type TechnologyEntry = {
  id: string;
  name: string;
  status: OperationalStatus;
  role: string;
  summary: string;
  whyEvaluating?: string[];
};

export const technologyStack: TechnologyEntry[] = [
  {
    id: "reticulum",
    name: "Reticulum",
    status: "experimental",
    role: "Candidate foundation for heterogeneous networking",
    summary:
      "Reticulum can create encrypted networks across heterogeneous links — LoRa, Wi-Fi, Ethernet, radio, and Internet paths — treating them as parts of one resilient system.",
    whyEvaluating: [
      "Encrypted communications",
      "Decentralized networking",
      "Low-bandwidth and intermittent links",
      "Multi-hop networks",
      "Infrastructure-light deployments",
    ],
  },
  {
    id: "meshtastic",
    name: "Meshtastic",
    status: "experimental",
    role: "Rapid LoRa experimentation and community-accessible mesh",
    summary:
      "Meshtastic enables quick LoRa mesh prototyping. It is not the entire KauaiInternet architecture — it helps us test range, antennas, and community UX before deeper Reticulum integration.",
  },
  {
    id: "lora",
    name: "LoRa",
    status: "planned",
    role: "Low-power resilient digital data",
    summary:
      "LoRa carries small amounts of data over long distances with minimal power — ideal for relay nodes and emergency check-ins when broadband fails.",
  },
  {
    id: "voice-radio",
    name: "Voice Radio (VHF/UHF)",
    status: "planned",
    role: "Parallel voice workstream — not replaced by data mesh",
    summary:
      "Traditional radio remains valuable for immediate group voice. KauaiInternet investigates lawful integration with repeaters, community radio, and radio-over-IP gateways.",
  },
  {
    id: "wifi-fixed",
    name: "Wi-Fi & Fixed Wireless",
    status: "planned",
    role: "Layer 1–2 local access",
    summary: "High-bandwidth local access when power and backhaul permit.",
  },
  {
    id: "starlink",
    name: "Satellite / Starlink",
    status: "planned",
    role: "Gateway backhaul when fiber or cellular fails",
    summary: "Backup off-island path — not a replacement for local mesh.",
  },
];

export const meshtasticVsReticulum = {
  meshtastic: {
    label: "Meshtastic",
    role: "Rapid LoRa experimentation",
    bestFor: "Community-accessible mesh prototyping, North Shore pilot tests",
  },
  reticulum: {
    label: "Reticulum",
    role: "Heterogeneous network foundation",
    bestFor: "Multi-transport routing, encrypted island-wide logical network",
  },
};
