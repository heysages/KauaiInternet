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
    description: "When power goes out and cell towers fail, neighbors still need to communicate. Solar-powered mesh networks keep communities connected during hurricanes and recovery.",
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
    description: "When submarine cables or mainland infrastructure fail, Kauaʻi needs communications that work independently — solar-powered, battery-backed, and locally operated.",
    icon: "🏝️",
  },
  {
    id: "future",
    title: "Future Preparedness",
    description: "Build a stronger foundation for generations to come.",
    icon: "🌱",
  },
];
