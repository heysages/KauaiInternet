export const regulatoryWorkstream = {
  status: "planning" as const,
  disclaimer:
    "This is a planning workstream, not legal advice. Consult qualified counsel before operating any radio or communications service.",
  topics: [
    { area: "FCC Part 15", question: "Which unlicensed devices apply to LoRa, Wi-Fi, and ISM-band equipment?" },
    { area: "Amateur radio", question: "What traffic may traverse amateur spectrum? Encryption restrictions?" },
    { area: "Commercial frequencies", question: "Licensed spectrum requirements for fixed wireless and microwave." },
    { area: "Transmitter power", question: "EIRP limits by band and equipment class." },
    { area: "Antenna regulations", question: "Height, structure, and HOA/local ordinances." },
    { area: "Tower/site permissions", question: "Land use, zoning, and environmental review." },
    { area: "Emergency claims", question: "KauaiInternet is not an official emergency service without formal integration." },
    { area: "Electrical work", question: "Solar and battery installations require qualified electricians where required by code." },
  ],
};

export const strategySections = {
  lastUpdated: "2026-08-30",
  mission:
    "Build an independent, resilient communications layer for Kauaʻi — so the island can still communicate when the Internet does not.",
  technologyPlan:
    "Three-layer architecture: Internet (Layer 1), Kauaʻi Local Network (Layer 2), Resilient Radio Mesh (Layer 3). Reticulum evaluated as heterogeneous transport foundation; Meshtastic for LoRa prototyping.",
  networkPlan:
    "North Shore pilot first, then East Side connection, then island backbone hypothesis (6–10 strategic sites). All coverage claims require measurement.",
  pilotPlan: "North Shore corridor: Hāʻena → Kapaʻa. Budget $2k–$4k experimental hardware.",
  capitalRequirements: "Pilot hardware $2k–$4k; site costs dominate at scale. Grant research in progress.",
  partners: "No confirmed facility partnerships — all K5 hubs marked proposed.",
  sitePipeline: "10 candidate sites + 6 North Shore planning nodes + radio infrastructure research entries.",
  risks: [
    "Terrain limits RF without elevated sites",
    "Permitting and site access",
    "Power autonomy during extended outages",
    "Regulatory compliance across multiple radio types",
    "Community trust requires transparency",
  ],
  grants: "Potential areas: broadband, disaster resilience, emergency comms — eligibility not verified.",
  decisions: [
    { date: "2026-08", decision: "Adopt three-layer network architecture and Island Mode concept." },
    { date: "2026-08", decision: "North Shore selected as first RF pilot corridor." },
    { date: "2026-08", decision: "Reticulum evaluation; Meshtastic for prototyping only." },
  ],
};
