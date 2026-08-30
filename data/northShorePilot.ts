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
    "Determine whether inexpensive resilient radio nodes can provide useful community communications across the North Shore and toward the East Side.",
  corridor: northShorePilotAreaIds,
  corridorLabels: ["Hāʻena", "Hanalei", "Princeville", "Kīlauea", "Anahola", "Kapaʻa"],
  goals: [
    "Test LoRa range across North Shore terrain",
    "Measure terrain impact on RF paths",
    "Test antennas and mounting approaches",
    "Identify elevated host sites (with permission)",
    "Test solar relay reference design",
    "Evaluate Reticulum transport",
    "Evaluate Meshtastic for prototyping",
    "Collect real RF measurements (Map the Island program)",
    "Evaluate phone UX for offline messaging concepts",
    "Estimate island-wide infrastructure requirements",
  ],
  checklist: [
    { id: "sites", label: "Identify 3–5 host site candidates", status: "pending" },
    { id: "hardware", label: "Procure pilot hardware ($2k–$4k range)", status: "pending" },
    { id: "lora-test", label: "Conduct initial LoRa range tests", status: "pending" },
    { id: "solar", label: "Build one solar relay prototype", status: "pending" },
    { id: "reticulum", label: "Reticulum lab evaluation", status: "pending" },
    { id: "meshtastic", label: "Meshtastic field prototype", status: "pending" },
    { id: "measurements", label: "Upload first RF measurements", status: "pending" },
    { id: "report", label: "Publish pilot findings (honest scope)", status: "pending" },
  ] as PilotChecklistItem[],
  budget: {
    targetRange: "$2,000–$4,000",
    status: "preliminary" as const,
    categories: [
      { label: "LoRa radios", range: "$150–$600" },
      { label: "Antennas & cabling", range: "$100–$400" },
      { label: "Raspberry Pi / small computers", range: "$100–$300" },
      { label: "Solar & batteries", range: "$200–$800" },
      { label: "Enclosures & mounting", range: "$100–$400" },
      { label: "Test equipment & spares", range: "$100–$500" },
    ],
    excluded: [
      "Tower rent",
      "Professional climbing",
      "Engineering & permitting",
      "Commercial installation",
      "Power work",
      "Land/site agreements",
      "Insurance",
    ],
  },
};
