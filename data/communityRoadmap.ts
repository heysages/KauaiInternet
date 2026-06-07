export type RoadmapPhase = {
  phase: number;
  title: string;
  description: string;
  highlights: string[];
};

export const communityRoadmap: RoadmapPhase[] = [
  {
    phase: 1,
    title: "Community Listening",
    description:
      "Gather ideas, priorities, concerns, and support from people across Kauai.",
    highlights: [
      "Neighborhood conversations and listening sessions",
      "Mapping where communities want stronger connections",
      "Building a shared vision residents can believe in",
    ],
  },
  {
    phase: 2,
    title: "Community Pilot Projects",
    description:
      "Explore small resilience and connectivity initiatives that could show what is possible.",
    highlights: [
      "School and community space pilots",
      "Emergency readiness hubs in key areas",
      "Volunteer-led projects with local partners",
    ],
  },
  {
    phase: 3,
    title: "Island Resilience Network",
    description:
      "Connect projects into a broader community-supported system for the whole island.",
    highlights: [
      "Shared infrastructure neighbors can count on",
      "Stronger preparedness across Kauai",
      "A model shaped by the community, for the community",
    ],
  },
];
