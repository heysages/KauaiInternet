export const networkMetrics = {
  status: "definitions-only" as const,
  metrics: [
    { id: "population-reachable", label: "Population potentially reachable", unit: "people" },
    { id: "communities-connected", label: "Communities connected", unit: "count" },
    { id: "sq-miles-measured", label: "Square miles measured", unit: "mi²" },
    { id: "backbone-sites", label: "Backbone sites", unit: "count" },
    { id: "relay-sites", label: "Relay sites", unit: "count" },
    { id: "gateways", label: "Independent gateways", unit: "count" },
    { id: "network-uptime", label: "Network uptime", unit: "%" },
    { id: "island-mode-uptime", label: "Island Mode uptime", unit: "%" },
    { id: "messages-outage", label: "Messages delivered during outages", unit: "count" },
    { id: "battery-autonomy", label: "Battery autonomy", unit: "hours" },
    { id: "community-hosts", label: "Community hosts", unit: "count" },
    { id: "resilience-hubs", label: "Resilience hubs", unit: "count" },
    { id: "rf-paths-measured", label: "Measured RF paths", unit: "count" },
    { id: "redundant-routes", label: "Redundant routes per community", unit: "count" },
    { id: "subscribers", label: "Commercial subscribers", unit: "count" },
    { id: "mrr", label: "Monthly recurring revenue", unit: "USD" },
    { id: "cost-per-household", label: "Infrastructure cost per household reachable", unit: "USD" },
  ],
};

export const failureScenarios = [
  { id: "fiber-cut", label: "Fiber cut" },
  { id: "cellular-failure", label: "Cellular failure" },
  { id: "power-failure", label: "Power failure" },
  { id: "backbone-failure", label: "Backbone node failure" },
  { id: "satellite-failure", label: "Satellite failure" },
  { id: "multiple-link", label: "Multiple link failure" },
];
