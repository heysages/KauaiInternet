export const businessModel = {
  principle:
    "Businesses and Internet customers help fund a communications network the entire island can depend on during emergencies. Basic emergency and local messaging should remain accessible without expensive subscriptions.",
  models: [
    { id: "residential", title: "Residential Internet", description: "Monthly connectivity for homes." },
    { id: "business", title: "Business Internet", description: "Higher reliability for businesses." },
    { id: "resilience", title: "Resilience Service", description: "Backup connectivity and local-network access." },
    { id: "community-nodes", title: "Community Nodes", description: "Hardware kits and installations." },
    { id: "managed", title: "Managed Resilience", description: "Schools, farms, clinics, nonprofits, HOAs." },
    { id: "hosting", title: "Infrastructure Hosting", description: "Partnership with property owners." },
    { id: "preparedness", title: "Emergency Preparedness", description: "Resilience packages for households and organizations." },
    { id: "grants", title: "Government / Grants", description: "Broadband, disaster resilience, emergency comms programs (eligibility not claimed)." },
    { id: "sponsorship", title: "Sponsorship", description: "Community-supported node sponsorship." },
    { id: "donations", title: "Donations", description: "Community-funded infrastructure." },
  ],
  grantAreas: [
    "Broadband programs",
    "Disaster resilience",
    "Emergency communications",
    "Rural connectivity",
    "Infrastructure resilience",
    "Community development",
  ],
};

export const hardwareEconomics = {
  status: "planning-assumptions" as const,
  ranges: [
    { item: "LoRa radio", range: "$25–$100" },
    { item: "Enclosure / antenna / cabling", range: "$50–$250" },
    { item: "Solar", range: "$100–$500" },
    { item: "Battery", range: "$50–$300" },
    { item: "Small relay node", range: "Hundreds of dollars" },
    { item: "Backbone node", range: "Hundreds to several thousand dollars" },
  ],
  note: "Tower and site costs can dominate equipment costs. All figures are editable planning assumptions.",
};
