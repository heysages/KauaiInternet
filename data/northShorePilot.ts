import { northShorePilotAreaIds } from "@/data/planningAreas";

export type PilotChecklistItem = {
  id: string;
  label: string;
  status: "pending" | "in-progress" | "complete";
};

export const northShorePilot = {
  title: "North Shore Pilot",
  status: "proposed" as const,
  summary:
    "An operating resilience corridor for Hāʻena, Hanalei, Princeville, and Kīlauea. Hubs, a wireless backbone, and an emergency mesh that keep a message moving when utility power is out.",
  corridor: northShorePilotAreaIds,
  corridorLabels: ["Hāʻena", "Hanalei", "Princeville", "Kīlauea"],
  goals: [
    "Keep critical nodes up for 72 hours on solar and battery",
    "Pass short messages along the corridor with the grid off",
    "Hold a cached status note at each hub for roads, water, and aid",
    "Link the hubs with a wireless backbone",
    "Use gear already on hand before buying more hardware",
    "Publish what the corridor can and cannot do",
  ],
  checklist: [
    { id: "sites", label: "Confirm host sites in Hāʻena, Hanalei, Princeville, and Kīlauea", status: "pending" },
    { id: "power", label: "Size solar and battery for 72 hours at each critical node", status: "pending" },
    { id: "hubs", label: "Stand up resilience hubs with a cached status note", status: "pending" },
    { id: "backbone", label: "Link the hubs with a wireless backbone", status: "pending" },
    { id: "mesh", label: "Pass a short message with utility power off", status: "pending" },
    { id: "bom", label: "Finish site design and the bill of materials", status: "pending" },
    { id: "report", label: "Publish pilot findings (honest scope)", status: "pending" },
  ] as PilotChecklistItem[],
  budget: {
    targetRange: "$65,000–$115,000 capital, $25,000–$50,000 per year to operate",
    status: "preliminary" as const,
    note: "Planning estimates pending final site design and a bill of materials.",
  },
};
