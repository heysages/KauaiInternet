import type { HardwareKitConcept } from "@/types/network";

export const hardwareKits: HardwareKitConcept[] = [
  {
    id: "mini",
    name: "Kauai Node Mini",
    tagline: "Personal / community LoRa node",
    nodeClass: "K1",
    priceRange: "Concept — TBD",
    features: ["LoRa radio", "USB power", "Indoor/desktop use", "Community mesh participation"],
    status: "proposed",
  },
  {
    id: "home",
    name: "Kauai Node Home",
    tagline: "Home resilient communications gateway",
    nodeClass: "K1",
    priceRange: "Concept — TBD",
    features: ["Wi-Fi access", "LoRa relay", "Battery backup option", "Local messaging gateway"],
    status: "proposed",
  },
  {
    id: "pro",
    name: "Kauai Node Pro",
    tagline: "Business / resilience gateway",
    nodeClass: "K1",
    features: ["Higher-gain antenna", "Extended battery", "Managed monitoring", "Business SLA option"],
    status: "proposed",
  },
  {
    id: "relay",
    name: "Kauai Relay",
    tagline: "Solar outdoor relay",
    nodeClass: "K2",
    features: ["Solar + battery", "Weatherproof enclosure", "LoRa backbone relay", "Telemetry"],
    status: "proposed",
  },
  {
    id: "backbone",
    name: "Kauai Backbone",
    tagline: "Professional infrastructure node",
    nodeClass: "K3",
    features: ["Multi-radio", "Fixed wireless", "Reticulum transport", "Site engineering required"],
    status: "proposed",
  },
];
