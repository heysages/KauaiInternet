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
    "Buy the corridor new, with current radios, a hot-swap battery bank, solar, and a propane generator. Nothing on the shelf is assumed",
    "Publish what the corridor can and cannot do",
  ],
  checklist: [
    { id: "sites", label: "Confirm host sites in Hāʻena, Hanalei, Princeville, and Kīlauea", status: "pending" },
    { id: "power", label: "Size solar, a hot-swap battery bank, and a propane generator at each critical node", status: "pending" },
    { id: "hubs", label: "Stand up resilience hubs with a cached status note", status: "pending" },
    { id: "backbone", label: "Link the hubs with a wireless backbone", status: "pending" },
    { id: "mesh", label: "Pass a short message with utility power off", status: "pending" },
    { id: "bom", label: "Finish site design and the bill of materials", status: "pending" },
    { id: "report", label: "Publish pilot findings (honest scope)", status: "pending" },
  ] as PilotChecklistItem[],
  budget: {
    targetRange: "Buy-new budget in the cost section, including labor and overhead",
    status: "preliminary" as const,
    note: "October 2026 prices. No contributed gear. Labor and overhead included.",
  },
};
