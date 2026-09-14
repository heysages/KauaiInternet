export const islandModeServices = {
  uxLabel: "kauaʻi.local",
  status: "concept" as const,
  note: "UX concept only — literal .local mDNS architecture requires separate networking evaluation. During power outages, solar-powered nodes provide these services where deployed.",
  services: [
    "Emergency information",
    "Local network status",
    "Messaging",
    "Maps",
    "Shelters",
    "Community announcements",
    "Contact information",
    "Local directory",
    "Transportation information",
    "Medical resources",
    "Weather (if locally available)",
    "Cached preparedness information",
  ],
  cachingPrinciples: [
    "Source attribution required",
    "Respect copyright and licensing",
    "Prefer public-domain and government emergency content",
    "No casual caching of copyrighted third-party material",
  ],
};

export const islandModeStates = [
  {
    mode: "global" as const,
    label: "Global Mode",
    headline: "Internet available",
    icon: "🟢",
    description: "Full connectivity to global Internet and local Kauaʻi network.",
  },
  {
    mode: "island" as const,
    label: "Island Mode",
    headline: "Mainland connectivity unavailable",
    subline: "Kauaʻi network operational",
    icon: "🟠",
    description:
      "Upstream Internet may be degraded or unavailable. Local messaging, status pages, and island services continue where nodes remain powered.",
  },
  {
    mode: "emergencyMesh" as const,
    label: "Emergency Mesh Mode",
    headline: "Grid power down",
    subline: "Solar mesh active",
    icon: "🔴",
    description:
      "Grid power unavailable — exactly when resilient infrastructure matters most. Solar-powered LoRa and radio mesh nodes provide essential communications.",
  },
];
