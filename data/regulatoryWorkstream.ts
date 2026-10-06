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
    { area: "Electrical work", question: "Solar, battery, and generator installations require qualified electricians where required by code." },
  ],
};

export const strategySections = {
  lastUpdated: "2026-10-02",
  mission:
    "Grid down. Internet down. Kauaʻi still communicates. Critical nodes meet KauaiInternet 72: at least 72 hours on solar and battery with no utility power.",
  technologyPlan:
    "Three-layer architecture: Internet (Layer 1), Kauaʻi Local Network (Layer 2), Resilient Radio Mesh (Layer 3). Reticulum evaluated as heterogeneous transport foundation; Meshtastic for LoRa prototyping.",
  networkPlan:
    "North Shore pilot first, then East Side connection, then island backbone hypothesis (6–10 strategic sites). All coverage claims require measurement.",
  pilotPlan:
    "Operational corridor: Hāʻena, Hanalei, Princeville, Kīlauea. Resilience hubs, a wireless backbone, and an emergency mesh. Then North/East expansion, then an island backbone.",
  capitalRequirements:
    "North Shore pilot is budgeted as a buy-new build on Ubiquiti airFiber 5XHD radios, a LiFePO4 bank with a hot-swap spare, 3.2 kW of solar, a propane generator at each site, drone survey, freight past the Hanalei bridge, labor, overhead, and Kauaʻi GET. Wave MLO5 is the higher-capacity 5 GHz option and is not the pilot radio. Cambium ePMP is not the vendor. Shelf inventory is not subtracted.",
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
    {
      date: "2026-10",
      decision:
        "After Hurricane Lowell, lead with a Hāʻena–Kīlauea resilience corridor and KauaiInternet 72. The pilot budget buys all new current-generation gear and includes labor and overhead.",
    },
  ],
};
