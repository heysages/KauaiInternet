export type PilotPhase = {
  phase: number;
  title: string;
  summary: string;
  outcomes: string[];
  status: "current" | "next" | "future";
};

export const pilotPhases: PilotPhase[] = [
  {
    phase: 1,
    title: "Starter resilience pilot",
    summary:
      "Deploy contributed gear across a focused corridor — proving switching, backhaul, and community Wi-Fi with honest pilot scope.",
    outcomes: [
      "Wire 2–3 community or emergency anchor sites with contributed switching and radios",
      "Stand up one ridge-to-coast wireless link with line-of-sight validation",
      "Launch a public Wi-Fi zone at a school or assembly point",
      "Document power, permitting, and operations lessons for scale-up",
    ],
    status: "current",
  },
  {
    phase: 2,
    title: "Emergency & community anchor sites",
    summary:
      "Expand anchor coverage across the island — connecting civil defense, healthcare, schools, and community hubs into a coordinated mesh.",
    outcomes: [
      "Map and activate emergency anchor sites in each planning region",
      "Integrate backup satellite uplinks at key hubs",
      "Coordinate with emergency services on failover and alert paths",
      "Train community stewards for each anchor node",
    ],
    status: "next",
  },
  {
    phase: 3,
    title: "Island edge & redundant backhaul",
    summary:
      "Build island-owned digital infrastructure — a community-governed edge facility and diverse backhaul paths that survive single-point failures.",
    outcomes: [
      "Establish a Līhuʻe-area edge data center for local services and traffic aggregation",
      "Deploy redundant backhaul across ridge relays, fiber entry points, and satellite",
      "Host local DNS, alert relay, and critical apps when upstream links fail",
      "Transition from pilot to sustained community operations",
    ],
    status: "future",
  },
];
