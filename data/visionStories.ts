import type { VisionStory } from "@/types/network";

export const visionStories: VisionStory[] = [
  {
    id: "storm",
    title: "Storm resilience",
    description:
      "Battery-backed relays and redundant paths keep alerts, 911 handoff, and mutual aid online when fiber and power fail.",
    icon: "storm",
  },
  {
    id: "comms",
    title: "Emergency communications",
    description:
      "Anchors at schools and civic sites become coordination hubs — not just Wi-Fi, but local voice and data relay.",
    icon: "comms",
  },
  {
    id: "school",
    title: "School connectivity",
    description:
      "Campuses stay connected for attendance, family updates, and shelter operations during extended outages.",
    icon: "school",
  },
  {
    id: "tourism",
    title: "Tourism continuity",
    description:
      "Visitor corridors retain basic connectivity so businesses can operate, guests can reach family, and recovery info spreads.",
    icon: "tourism",
  },
  {
    id: "sovereignty",
    title: "Local digital independence",
    description:
      "Island-hosted edge keeps DNS, alerts, and essential services under community governance — not solely offshore clouds.",
    icon: "sovereignty",
  },
  {
    id: "remote",
    title: "Remote work & business continuity",
    description:
      "Local businesses and remote workers maintain operations when upstream ISP links are saturated or down.",
    icon: "remote",
  },
];
