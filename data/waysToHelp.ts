export type WayToHelp = {
  id: string;
  label: string;
  description: string;
  href: string;
};

export const waysToHelp: WayToHelp[] = [
  {
    id: "host-site",
    label: "I can host a site",
    description: "Offer rooftop, tower, or sheltered space for community infrastructure.",
    href: "#support",
  },
  {
    id: "land-building",
    label: "I own land or a building",
    description: "Share property that could support a hub, shelter, or gathering place.",
    href: "#support",
  },
  {
    id: "organization",
    label: "I represent an organization",
    description: "Schools, nonprofits, agencies, and businesses can partner on local projects.",
    href: "#support",
  },
  {
    id: "volunteer",
    label: "I can volunteer",
    description: "Lend your time, skills, or local knowledge to move projects forward.",
    href: "#support",
  },
  {
    id: "funding",
    label: "I can provide funding",
    description: "Help fund pilots, equipment, and community readiness efforts.",
    href: "#support",
  },
  {
    id: "updates",
    label: "I want updates",
    description: "Stay informed as the community blueprint grows — no commitment required.",
    href: "#support",
  },
];
