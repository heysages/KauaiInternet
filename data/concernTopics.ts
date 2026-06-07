export type ConcernTopic = {
  id: string;
  title: string;
  whatWeveHeard: string[];
  whatWeKnow: string[];
  stillExploring: string[];
  communityComments: { name: string; location: string; text: string }[];
};

export const concernTopics: ConcernTopic[] = [
  {
    id: "health-emf",
    title: "Health & EMF",
    whatWeveHeard: [
      "Some residents want more information about radio frequencies, wireless equipment, and possible health effects.",
      "Others have asked whether lower-power community approaches differ from large commercial installations.",
      "Families near schools and gathering places have raised thoughtful questions about placement and design.",
    ],
    whatWeKnow: [
      "Health questions deserve clear, respectful answers — not dismissal.",
      "Equipment choices, power levels, siting, and distance from homes are planning variables we can discuss openly.",
      "We are not presenting this project as a large-scale commercial wireless rollout.",
    ],
    stillExploring: [
      "How to share plain-language resources from credible public health sources",
      "Whether community-sited, lower-power approaches can address common concerns",
      "How neighbors want to be notified and consulted before any pilot moves forward",
    ],
    communityComments: [
      {
        name: "Anonymous neighbor",
        location: "North shore",
        text: "I support better connectivity, but I want to understand what equipment might be near homes and schools before anything is considered.",
      },
    ],
  },
  {
    id: "visual-impact",
    title: "Visual Impact",
    whatWeveHeard: [
      "Residents care deeply about preserving Kauai's natural views, ridgelines, and neighborhood character.",
      "Some worry about towers, antennas, or equipment visible from roads, beaches, and cultural sites.",
      "Others note that existing utility infrastructure is already part of the landscape.",
    ],
    whatWeKnow: [
      "Visual impact is a legitimate community value — not an afterthought.",
      "Many resilience approaches can use existing buildings, lower profiles, or concealed equipment.",
      "Any future pilot would need honest conversation about what is visible and where.",
    ],
    stillExploring: [
      "Community preferences for low-profile vs. elevated installations",
      "How to document viewshed concerns on the map",
      "Design standards neighbors would find acceptable",
    ],
    communityComments: [
      {
        name: "K. M.",
        location: "East side",
        text: "Our ridge views are part of why we live here. If something is being explored, we should see what it could look like.",
      },
    ],
  },
  {
    id: "environmental-impact",
    title: "Environmental Impact",
    whatWeveHeard: [
      "Neighbors ask how projects might affect land, wildlife, watersheds, and sensitive habitats.",
      "Some prefer solar and battery approaches; others worry about e-waste and equipment lifecycles.",
      "Environmental stewardship is central to how many residents think about development.",
    ],
    whatWeKnow: [
      "Kauai's environment is not negotiable — it must be part of every conversation.",
      "Smaller community pilots may have different impacts than large industrial builds.",
      "We are gathering input on siting, power, and materials before identifying opportunities.",
    ],
    stillExploring: [
      "How to align with existing conservation and land-use values",
      "Preferred power approaches for remote or ridge locations",
      "Community-led environmental review for any pilot site",
    ],
    communityComments: [
      {
        name: "Community member",
        location: "West side",
        text: "Resilience should not come at the cost of the land and water we are trying to protect.",
      },
    ],
  },
  {
    id: "cultural-stewardship",
    title: "Cultural Stewardship",
    whatWeveHeard: [
      "Residents emphasize respect for ʻāina, cultural sites, and traditional knowledge.",
      "Some ask who decides where infrastructure is explored and who benefits.",
      "Others want technology to serve community values — not override them.",
    ],
    whatWeKnow: [
      "Cultural stewardship must be part of planning from the beginning.",
      "This initiative is intended to listen to — not speak over — local voices.",
      "No site or approach should move forward without appropriate community consultation.",
    ],
    stillExploring: [
      "How to include cultural advisors and community stewards in planning conversations",
      "Protocols for discussing sites near sensitive areas",
      "Ways technology can support cultural preservation and communication",
    ],
    communityComments: [
      {
        name: "Local educator",
        location: "Central Kauai",
        text: "Any plan for Kauai should start with respect for place and people. We are still in a listening phase.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy & Data",
    whatWeveHeard: [
      "Residents ask who would operate systems, what data is collected, and how privacy is protected.",
      "Some prefer community-governed approaches over outside corporate control.",
      "Others want clarity about emergency access vs. everyday use.",
    ],
    whatWeKnow: [
      "Privacy questions are reasonable and important.",
      "Community governance models are among the approaches being discussed.",
      "We are not claiming a finished design — we are exploring options openly.",
    ],
    stillExploring: [
      "Community preferences for local vs. third-party operation",
      "Data minimization principles neighbors expect",
      "Transparent policies before any pilot stores or routes information",
    ],
    communityComments: [
      {
        name: "Small business owner",
        location: "Lihue",
        text: "I want better connectivity, but I also want to know who controls the data and how it is used.",
      },
    ],
  },
  {
    id: "emergency-readiness",
    title: "Emergency Readiness",
    whatWeveHeard: [
      "Many residents strongly support better communication during storms and outages.",
      "Some ask how community infrastructure relates to official emergency systems.",
      "Others want reassurance that pilots would complement — not replace — existing preparedness.",
    ],
    whatWeKnow: [
      "Emergency readiness is one of the most widely shared goals on the island.",
      "Community hubs and schools are often discussed as natural gathering points.",
      "We are evaluating how local approaches could support — not duplicate — county and state efforts.",
    ],
    stillExploring: [
      "Coordination with emergency management partners",
      "Which community spaces neighbors trust during crises",
      "How to test readiness without disrupting existing systems",
    ],
    communityComments: [
      {
        name: "Neighborhood organizer",
        location: "Kapaa",
        text: "When the power goes out, we need ways to check on elders and share information. That part of this conversation makes sense to me.",
      },
    ],
  },
  {
    id: "community-access",
    title: "Community Access & Equity",
    whatWeveHeard: [
      "Residents ask whether benefits would reach rural areas, renters, elders, and lower-income households.",
      "Some worry projects could favor tourist corridors over local neighborhoods.",
      "Others see an opportunity to close long-standing connectivity gaps.",
    ],
    whatWeKnow: [
      "Equity should guide which areas are explored first.",
      "Community participation is meant to surface priorities from across the island.",
      "We are identifying opportunities — not announcing finished plans.",
    ],
    stillExploring: [
      "Which neighborhoods feel most underserved today",
      "How to measure community benefit beyond speed tests",
      "Affordable access models neighbors would support",
    ],
    communityComments: [
      {
        name: "Resident",
        location: "West side",
        text: "If we are exploring this, west side families should be at the table from the start.",
      },
    ],
  },
  {
    id: "tourism-economic",
    title: "Tourism & Economic Impact",
    whatWeveHeard: [
      "Business owners and workers ask how connectivity affects jobs, visitors, and local commerce.",
      "Some worry about overbuilding for tourism at the expense of residents.",
      "Others see resilience as a way to keep small businesses operating during disruptions.",
    ],
    whatWeKnow: [
      "Tourism and the local economy are intertwined with everyday connectivity needs.",
      "Community-led approaches may balance visitor needs with resident priorities differently than commercial builds.",
      "We are gathering input on where economic benefits and concerns overlap.",
    ],
    stillExploring: [
      "How businesses would use community resilience hubs during outages",
      "Whether visitor corridors should be prioritized differently than residential areas",
      "Long-term economic models that keep value on the island",
    ],
    communityComments: [
      {
        name: "Hospitality worker",
        location: "South shore",
        text: "Visitors need to stay connected, but so do the people who live and work here year-round.",
      },
    ],
  },
];
