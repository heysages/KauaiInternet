import type { PropertyHelpCategory } from "@/types/network";

export const propertyHelpCategories: PropertyHelpCategory[] = [
  {
    id: "site-host",
    label: "Site host",
    description: "Rooftop, tower, or sheltered space for relay or anchor equipment.",
    icon: "📡",
  },
  {
    id: "power-backup",
    label: "Power backup host",
    description: "Generator hookup, battery bank, or solar capacity for extended outages.",
    icon: "🔋",
  },
  {
    id: "shelter-partner",
    label: "Emergency shelter partner",
    description: "School, church, or community building that can serve as an assembly connectivity hub.",
    icon: "🏠",
  },
  {
    id: "wifi-location",
    label: "Community Wi-Fi location",
    description: "Outdoor or indoor area where public emergency Wi-Fi could be offered.",
    icon: "📶",
  },
  {
    id: "technical-volunteer",
    label: "Technical volunteer",
    description: "RF, networking, or operations skills to help deploy and maintain pilot sites.",
    icon: "🛠️",
  },
  {
    id: "funding-supporter",
    label: "Funding supporter",
    description: "Donor, sponsor, or grant partner helping fund gear and site readiness.",
    icon: "🤝",
  },
];
