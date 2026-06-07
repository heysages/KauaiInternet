import type { CandidateSite } from "@/types/network";

/**
 * Placeholder candidate sites with generalized coordinates only.
 * Locations are approximate area centers — not exact infrastructure positions.
 */
export const candidateSites: CandidateSite[] = [
  {
    id: "central-edge-candidate",
    name: "Central Kauai Edge Candidate",
    type: "data-center-edge",
    lat: 21.98,
    lng: -159.38,
    status: "under-review",
    elevation: "~500 ft",
    areaLabel: "Central Kauai · approximate",
    description:
      "Proposed sheltered aggregation point for switching, edge compute, and traffic handoff.",
    whyItMatters:
      "A central edge node could keep local DNS, alerts, and caching online when upstream links fail — but shelter, power, and fiber access still need assessment.",
    populationServed: 22000,
  },
  {
    id: "east-ridge-candidate",
    name: "East Side Ridge Candidate",
    type: "high-site-ridge",
    lat: 22.06,
    lng: -159.34,
    status: "proposed",
    elevation: "~800 ft",
    areaLabel: "East Kauai ridges · approximate",
    description:
      "Elevated ridge area with potential line-of-sight across east-side valleys.",
    whyItMatters:
      "Ridge relays can link coastal communities when valley terrain blocks single-path fiber or coax routes.",
    populationServed: 12000,
  },
  {
    id: "north-emergency-candidate",
    name: "North Shore Emergency Anchor",
    type: "emergency-anchor",
    lat: 22.18,
    lng: -159.49,
    status: "proposed",
    elevation: "~100 ft",
    areaLabel: "North shore · approximate",
    description:
      "Candidate emergency coordination area for north shore communities.",
    whyItMatters:
      "North shore areas are often isolated by flooding and landslides — a resilient anchor here supports evacuations and mutual aid.",
    populationServed: 6500,
  },
  {
    id: "north-community-candidate",
    name: "North Shore Community Anchor",
    type: "community-anchor",
    lat: 22.21,
    lng: -159.47,
    status: "under-review",
    elevation: "~200 ft",
    areaLabel: "North Kauai · approximate",
    description:
      "Community hub candidate for assembly-point connectivity and local information relay.",
    whyItMatters:
      "Community anchors turn schools and centers into connectivity hubs when home internet fails during storms.",
    partnerName: "Community partner (TBD)",
    populationServed: 4800,
  },
  {
    id: "west-uplink-candidate",
    name: "West Side Uplink Candidate",
    type: "backup-uplink",
    lat: 22.04,
    lng: -159.66,
    status: "proposed",
    elevation: "~1,800 ft",
    areaLabel: "West Kauai highlands · approximate",
    description:
      "High-elevation area with potential clear sky view for satellite backup uplink.",
    whyItMatters:
      "Backup uplinks give the pilot a path off-island when submarine fiber or ISP backhaul is disrupted.",
    populationServed: 3500,
  },
  {
    id: "south-wifi-candidate",
    name: "South Shore Wi-Fi Zone",
    type: "public-wifi-zone",
    lat: 21.91,
    lng: -159.48,
    status: "proposed",
    elevation: "~50 ft",
    areaLabel: "South shore · approximate",
    description:
      "Public Wi-Fi zone candidate near south shore town and visitor corridors.",
    whyItMatters:
      "Visitor corridors and town centers see heavy demand — emergency Wi-Fi here helps residents and visitors alike during outages.",
    populationServed: 14000,
  },
  {
    id: "west-partner-candidate",
    name: "West Side Partner Site",
    type: "partner-hosted",
    lat: 22.01,
    lng: -159.76,
    status: "proposed",
    elevation: "~50 ft",
    areaLabel: "West end · approximate",
    description:
      "Partner-hosted west-side location for relay coverage. Landowner conversation in early stage.",
    whyItMatters:
      "West-end coverage gaps are hard to reach from a single hub — partner sites extend the mesh without large commercial builds.",
    partnerName: "Private landowner (TBD)",
    populationServed: 2800,
  },
  {
    id: "west-community-candidate",
    name: "West Side Community Anchor",
    type: "community-anchor",
    lat: 21.92,
    lng: -159.58,
    status: "proposed",
    elevation: "~50 ft",
    areaLabel: "West Kauai · approximate",
    description:
      "West-side community anchor for local access and emergency information relay.",
    whyItMatters:
      "West-side towns sit far from primary fiber entry points — a local anchor reduces single-point-of-failure risk.",
    populationServed: 5200,
  },
  {
    id: "east-emergency-candidate",
    name: "East Side Emergency Anchor",
    type: "emergency-anchor",
    lat: 22.08,
    lng: -159.32,
    status: "proposed",
    elevation: "~150 ft",
    areaLabel: "East Kauai · approximate",
    description:
      "East-side emergency services coordination candidate near coastal population centers.",
    whyItMatters:
      "First responders need comms that survive ISP outages — emergency anchors prioritize battery-backed wireless paths.",
    populationServed: 11000,
  },
  {
    id: "south-community-candidate",
    name: "South Shore Community Anchor",
    type: "community-anchor",
    lat: 21.89,
    lng: -159.45,
    status: "proposed",
    elevation: "~40 ft",
    areaLabel: "South Kauai · approximate",
    description:
      "South shore community center candidate for pilot Wi-Fi and local services.",
    whyItMatters:
      "South shore communities can serve as a pilot corridor endpoint, testing mesh handoff from central aggregation.",
    populationServed: 7500,
  },
];
