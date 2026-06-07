import type { PlanningScenario } from "@/types/network";

export const planningScenarios: PlanningScenario[] = [
  {
    id: "resident",
    name: "Resident View",
    description:
      "Community Wi-Fi, local anchors, and everyday connectivity resilience for households.",
    enabledLayers: [
      "candidate-sites",
      "public-wifi",
      "community-support",
      "emergency-resilience",
    ],
    emphasizedLayers: ["public-wifi", "candidate-sites", "community-support"],
  },
  {
    id: "emergency-services",
    name: "Emergency Services View",
    description:
      "First responder paths, backup uplinks, and coordination anchors that must survive outages.",
    enabledLayers: [
      "existing-infrastructure",
      "emergency-resilience",
      "edge-compute",
      "candidate-sites",
    ],
    emphasizedLayers: ["emergency-resilience", "existing-infrastructure", "edge-compute"],
  },
  {
    id: "tourism",
    name: "Tourism View",
    description:
      "Visitor corridors, public Wi-Fi zones, and south/north shore connectivity during disruptions.",
    enabledLayers: [
      "candidate-sites",
      "public-wifi",
      "existing-infrastructure",
      "community-support",
    ],
    emphasizedLayers: ["public-wifi", "candidate-sites"],
  },
  {
    id: "economic-development",
    name: "Economic Development View",
    description:
      "Edge compute, data aggregation, and infrastructure that supports local business continuity.",
    enabledLayers: [
      "existing-infrastructure",
      "future-data-center",
      "edge-compute",
      "candidate-sites",
    ],
    emphasizedLayers: ["future-data-center", "edge-compute", "existing-infrastructure"],
  },
  {
    id: "digital-sovereignty",
    name: "Digital Sovereignty View",
    description:
      "Island-owned edge capacity, redundant backhaul, and local control of critical services.",
    enabledLayers: [
      "future-data-center",
      "edge-compute",
      "emergency-resilience",
      "existing-infrastructure",
    ],
    emphasizedLayers: ["future-data-center", "edge-compute", "emergency-resilience"],
  },
];

export const defaultScenarioId = planningScenarios[0].id;
