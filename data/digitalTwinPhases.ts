import type { DigitalTwinPhase } from "@/types/network";

export const digitalTwinPhases: DigitalTwinPhase[] = [
  {
    phase: 1,
    title: "Community Planning Platform",
    subtitle: "Where we are today",
    description:
      "An open island map where residents, planners, and partners explore scenarios, candidate sites, and community support — together.",
    capabilities: [
      "Interactive island map with terrain and towns",
      "Vision, community, and infrastructure perspectives",
      "Property impact explorer with simulated scoring",
      "Community support markers and site planning panels",
    ],
    status: "current",
  },
  {
    phase: 2,
    title: "Coverage & Resilience Modeling",
    subtitle: "Next horizon",
    description:
      "Physics-informed models that estimate who benefits from each site, how paths fail, and where gaps remain after storms.",
    capabilities: [
      "Line-of-sight analysis from ridge candidates",
      "Coverage simulation by site and equipment type",
      "Failure impact modeling for uplink loss",
      "Disaster scenario planning workflows",
    ],
    status: "next",
  },
  {
    phase: 3,
    title: "Island Digital Twin",
    subtitle: "Full island model",
    description:
      "A living digital twin of Kauai's connectivity fabric — buildings, utilities, towers, and fiber — for optimization and emergency planning.",
    capabilities: [
      "Building footprints and utility infrastructure",
      "Fiber routes and tower inventory",
      "Real-time coverage and capacity overlays",
      "Infrastructure optimization and what-if planning",
    ],
    status: "future",
  },
];

export const futureTwinFeatures = [
  "Building footprints",
  "Utility infrastructure",
  "Fiber routes",
  "Tower inventory",
  "Line-of-sight analysis",
  "Coverage simulation",
  "Failure impact modeling",
  "Disaster scenario planning",
  "Infrastructure optimization",
];
