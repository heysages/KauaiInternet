export type PartnerOpportunity = {
  id: string;
  title: string;
  whyItMatters: string;
  whoBenefits: string;
  waysToParticipate: string[];
};

export const partnerOpportunities: PartnerOpportunity[] = [
  {
    id: "community-wifi",
    title: "Community Wi-Fi",
    whyItMatters:
      "When home internet fails, public gathering places can become lifelines for families, students, and neighbors.",
    whoBenefits: "Residents, visitors, schools, and local organizations during outages.",
    waysToParticipate: [
      "Host a community space",
      "Volunteer for setup days",
      "Share ideas for high-need locations",
    ],
  },
  {
    id: "emergency-preparedness",
    title: "Emergency Preparedness",
    whyItMatters:
      "Storms and outages isolate neighborhoods — local readiness helps people get information and support faster.",
    whoBenefits: "First responders, families, elders, and rural communities.",
    waysToParticipate: [
      "Partner as a shelter or hub location",
      "Join preparedness planning conversations",
      "Help coordinate neighborhood check-ins",
    ],
  },
  {
    id: "resilience-hubs",
    title: "Neighborhood Resilience Hubs",
    whyItMatters:
      "Stronger neighborhoods start with places people already trust — schools, churches, and community centers.",
    whoBenefits: "Whole neighborhoods, especially areas prone to flooding or isolation.",
    waysToParticipate: [
      "Offer land or building access",
      "Become a hub steward",
      "Connect us with local leaders",
    ],
  },
  {
    id: "school-connectivity",
    title: "School Connectivity",
    whyItMatters:
      "Schools are anchors for learning, family communication, and community assembly when crises hit.",
    whoBenefits: "Students, teachers, parents, and surrounding neighborhoods.",
    waysToParticipate: [
      "Support a school pilot",
      "Volunteer technical or organizational help",
      "Advocate for school readiness funding",
    ],
  },
  {
    id: "tech-programs",
    title: "Community Technology Programs",
    whyItMatters:
      "Shared knowledge builds lasting resilience — not just equipment, but people who know how to help.",
    whoBenefits: "Volunteers, small businesses, nonprofits, and civic groups.",
    waysToParticipate: [
      "Teach or mentor",
      "Host a workshop",
      "Join a community tech working group",
    ],
  },
];
