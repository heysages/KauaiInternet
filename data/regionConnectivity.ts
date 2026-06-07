import type { RegionConnectivityProfile } from "@/types/network";

/** Region-level connectivity knowledge — no address-level coverage claims */
export const regionConnectivityProfiles: RegionConnectivityProfile[] = [
  {
    regionId: "central",
    knownServiceTypes: ["fiber-internet", "cable-internet", "mobile-network", "satellite-internet"],
    providerNotes: [
      "Hawaiian Telcom and Spectrum may serve parts of Līhuʻe — verify by address",
      "Mobile carriers generally have stronger signals near population centers",
      "Starlink used by some residents as backup or primary where wired options are limited",
    ],
    communityObservations: [
      "Central areas often have more service choices than remote valleys",
      "Outages still occur during major storms despite better infrastructure density",
    ],
    dataNeeded: [
      "Address-level fiber availability map (not published here)",
      "Storm outage frequency by neighborhood",
      "Public emergency communications asset inventory",
    ],
    resilienceConsiderations: [
      "County seat concentration creates single-point dependence for some services",
      "Airport and hospital connectivity critical during emergencies",
    ],
    opportunityQuestions: [
      "Could libraries or community centers serve as resilience hubs?",
      "Where do neighbors already gather during outages?",
    ],
  },
  {
    regionId: "east-side",
    knownServiceTypes: ["cable-internet", "fiber-internet", "mobile-network", "satellite-internet"],
    providerNotes: [
      "Coastal corridor generally has more broadband options than inland valleys",
      "Service quality varies toward Anahola and inland areas — Data Needed",
    ],
    communityObservations: [
      "East side residents report mixed experiences during storm season",
      "Some areas rely on satellite backup when wired links fail",
    ],
    dataNeeded: [
      "Inland valley connectivity surveys",
      "Documented outage patterns along Kūhiō Highway corridor",
    ],
    resilienceConsiderations: [
      "Ridge terrain blocks line-of-sight for some wireless options",
      "Schools and libraries may anchor community connectivity during crises",
    ],
    opportunityQuestions: [
      "Which community spaces could host neighborhood Wi-Fi?",
      "Where are the most frequent outage reports?",
    ],
  },
  {
    regionId: "north-shore",
    knownServiceTypes: ["mobile-network", "satellite-internet", "fixed-wireless"],
    providerNotes: [
      "Wired broadband options are more limited than central or east Kauai",
      "Mobile coverage exists but varies significantly in Hanalei and Hāʻena",
      "Starlink commonly reported in community conversations",
    ],
    communityObservations: [
      "Road closures and flooding often coincide with connectivity loss",
      "North shore isolation during storms is a recurring community concern",
    ],
    dataNeeded: [
      "Verified fiber/cable reach into Hanalei corridor",
      "Emergency communications paths when highway closes",
      "Community Wi-Fi locations neighbors already use",
    ],
    resilienceConsiderations: [
      "Geographic isolation amplifies any single connectivity failure",
      "Community coordination hubs especially important here",
    ],
    opportunityQuestions: [
      "Could existing gathering places support emergency readiness?",
      "What backup options do north shore residents use today?",
    ],
  },
  {
    regionId: "south-shore",
    knownServiceTypes: ["cable-internet", "fiber-internet", "mobile-network", "satellite-internet"],
    providerNotes: [
      "Poʻipū and Kōloa corridor has commercial broadband presence",
      "Visitor demand may affect local experience during peak seasons",
    ],
    communityObservations: [
      "Residents and businesses both depend on reliable connectivity",
      "Tourism infrastructure stress during events — community reports welcome",
    ],
    dataNeeded: [
      "Resident vs. visitor bandwidth priority during outages",
      "Small business backup connectivity practices",
    ],
    resilienceConsiderations: [
      "Economic dependence on connectivity for hospitality sector",
      "Community centers could support residents when tourism systems strain capacity",
    ],
    opportunityQuestions: [
      "How do south shore businesses stay connected during outages?",
      "Where could community Wi-Fi complement existing services?",
    ],
  },
  {
    regionId: "west-side",
    knownServiceTypes: ["mobile-network", "satellite-internet", "cable-internet"],
    providerNotes: [
      "Waimea and west side communities — fewer provider options than east/central",
      "Long distances to population centers affect service economics",
    ],
    communityObservations: [
      "West side residents often describe longer repair times after outages",
      "Starlink and mobile hotspots commonly mentioned",
    ],
    dataNeeded: [
      "Fiber/cable availability west of Kōkeʻe access road",
      "Healthcare facility connectivity redundancy",
      "Documented storm impact on west side communications",
    ],
    resilienceConsiderations: [
      "Distance from primary hubs increases vulnerability",
      "Healthcare and elder populations may need prioritized planning",
    ],
    opportunityQuestions: [
      "What community spaces could west side neighbors rely on?",
      "Are there existing mutual-aid communication practices?",
    ],
  },
];

export const regionConnectivityById = Object.fromEntries(
  regionConnectivityProfiles.map((p) => [p.regionId, p])
);
