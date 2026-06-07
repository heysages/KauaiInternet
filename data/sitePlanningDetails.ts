import type { SitePlanningDetail } from "@/types/network";

export const sitePlanningDetails: SitePlanningDetail[] = [
  {
    siteId: "central-edge-candidate",
    potentialBenefits: [
      "Local DNS and alert caching when upstream links fail",
      "Traffic aggregation for multiple pilot corridors",
      "Staging ground for rapid emergency deployment",
    ],
    challenges: [
      "Shelter, cooling, and commercial power design still needed",
      "Fiber path diversity not yet confirmed",
      "Operations staffing and governance model TBD",
    ],
    equipmentIds: [
      "cisco-9300-nexus",
      "mikrotik-cloud-switch",
      "edge-router",
      "starlink-setup",
      "cyberpower-ups",
    ],
    commentIds: ["comment-3"],
  },
  {
    siteId: "east-ridge-candidate",
    potentialBenefits: [
      "Line-of-sight backhaul across east-side valleys",
      "Extends mesh beyond single fiber entry points",
      "Supports east shore emergency anchor handoff",
    ],
    challenges: [
      "Ridge access road and landowner agreement required",
      "Wind and lightning exposure on elevated mounts",
      "Battery runtime sizing for multi-day outages",
    ],
    equipmentIds: ["nanobeam-5ac", "rocket-5ac-ap", "j-mount", "tower-site-batteries"],
    commentIds: [],
  },
  {
    siteId: "north-emergency-candidate",
    potentialBenefits: [
      "Civil defense coordination during north shore isolation",
      "Mutual aid comms when Hanalei corridor floods",
      "Battery-backed wireless path independent of ISP",
    ],
    challenges: [
      "Flood-prone access during major weather events",
      "Limited commercial power redundancy",
      "Coordination with county emergency protocols needed",
    ],
    equipmentIds: ["baicell-nova-430i", "mikrotik-outdoor-copper", "cyberpower-ups", "tower-site-batteries"],
    commentIds: ["comment-1"],
  },
  {
    siteId: "north-community-candidate",
    potentialBenefits: [
      "Assembly-point Wi-Fi for north shore residents",
      "Local information relay during grid outages",
      "Community steward model for sustained operations",
    ],
    challenges: [
      "Partner agreement and liability conversation early stage",
      "Backhaul path depends on ridge relay build-out",
      "Public access policy needs community input",
    ],
    equipmentIds: ["wave-ap", "nano-switch", "mikrotik-router"],
    commentIds: [],
  },
  {
    siteId: "west-uplink-candidate",
    potentialBenefits: [
      "Clear-sky satellite backup when fiber fails",
      "Redundant off-island path for pilot hub",
      "High elevation reduces foliage obstruction",
    ],
    challenges: [
      "Remote site access and security",
      "Generator or extended battery bank required",
      "Starlink capacity planning for shared hub use",
    ],
    equipmentIds: ["starlink-setup", "edge-router", "tower-site-batteries", "nanobeam-5ac"],
    commentIds: [],
  },
  {
    siteId: "south-wifi-candidate",
    potentialBenefits: [
      "Emergency Wi-Fi for residents and visitors",
      "High visibility during south shore outages",
      "Pilot endpoint for central aggregation handoff",
    ],
    challenges: [
      "Heavy tourist demand may exceed pilot capacity",
      "Coastal corrosion on outdoor gear",
      "Backhaul sharing with commercial traffic needs policy",
    ],
    equipmentIds: ["wave-ap", "baicell-nova-430i", "mikrotik-network-switch"],
    commentIds: [],
  },
  {
    siteId: "west-partner-candidate",
    potentialBenefits: [
      "Extends coverage to west-end gaps",
      "Landowner partnership reduces build cost",
      "Relay hop toward Waimea corridor",
    ],
    challenges: [
      "Landowner conversation in early stage",
      "Structural assessment for rooftop mount",
      "Limited line-of-sight to central hub",
    ],
    equipmentIds: ["nanobeam-5ac", "kpp-dual-band-antenna", "j-mount"],
    commentIds: ["comment-2"],
  },
  {
    siteId: "west-community-candidate",
    potentialBenefits: [
      "West-side local anchor reducing single-point failure",
      "Community hub for Waimea-area residents",
      "Staging for west uplink integration",
    ],
    challenges: [
      "Distance from primary fiber entry points",
      "Power backup for extended outage windows",
      "Volunteer capacity for local stewardship",
    ],
    equipmentIds: ["mikrotik-outdoor-copper", "wave-nano", "cyberpower-ups"],
    commentIds: [],
  },
  {
    siteId: "east-emergency-candidate",
    potentialBenefits: [
      "First responder comms near coastal population centers",
      "Handoff from ridge relay to ground anchors",
      "Prioritized traffic during ISP outages",
    ],
    challenges: [
      "Agency coordination and failover testing required",
      "HIPAA/public safety network segmentation",
      "Site hardening against storm surge zones",
    ],
    equipmentIds: ["copper-switch-rb5009", "baicell-nr-11", "cyberpower-ups", "tower-site-batteries"],
    commentIds: [],
  },
  {
    siteId: "south-community-candidate",
    potentialBenefits: [
      "South shore pilot corridor endpoint",
      "School or center-based community Wi-Fi",
      "Mesh handoff testing from central aggregation",
    ],
    challenges: [
      "Indoor shelter and rack space confirmation",
      "After-hours access for maintenance",
      "Bandwidth sharing with existing tenant networks",
    ],
    equipmentIds: ["usw-pro-max", "wave-ap", "mikrotik-sfp-switch"],
    commentIds: [],
  },
];

export const sitePlanningById = Object.fromEntries(
  sitePlanningDetails.map((d) => [d.siteId, d])
);
