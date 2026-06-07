export type WhyStory = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export const whyStories: WhyStory[] = [
  {
    id: "storm",
    title: "Storm Readiness",
    description: "Help communities stay connected during emergencies.",
    icon: "⛈️",
  },
  {
    id: "connectivity",
    title: "Community Connectivity",
    description: "Expand opportunities for residents and local organizations.",
    icon: "🤝",
  },
  {
    id: "schools",
    title: "Schools & Community Spaces",
    description: "Support learning, communication, and public gathering places.",
    icon: "🏫",
  },
  {
    id: "economy",
    title: "Tourism & Local Economy",
    description: "Help businesses and visitors remain connected.",
    icon: "🌺",
  },
  {
    id: "self-sufficiency",
    title: "Island Self-Sufficiency",
    description: "Reduce dependence on fragile outside systems.",
    icon: "🏝️",
  },
  {
    id: "future",
    title: "Future Preparedness",
    description: "Build a stronger foundation for generations to come.",
    icon: "🌱",
  },
];
