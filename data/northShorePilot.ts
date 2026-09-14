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
    "Validate 72+ hour off-grid operation capability",
    "Test rapid deployment procedures during power outages",
    "Establish emergency mesh coverage for priority messaging",
  ],
  checklist: [
    { id: "sites", label: "Identify 3–5 host site candidates", status: "pending" },
    { id: "hardware", label: "Procure pilot hardware ($2k–$4k range)", status: "pending" },
    { id: "lora-test", label: "Conduct initial LoRa range tests", status: "pending" },
    { id: "solar", label: "Build one solar relay prototype", status: "in-progress" },
    { id: "solar-sizing", label: "Validate solar/battery sizing for 72+ hour runtime", status: "pending" },
    { id: "deployment-kits", label: "Stage rapid deployment kits", status: "pending" },
    { id: "reticulum", label: "Reticulum lab evaluation", status: "pending" },
    { id: "meshtastic", label: "Meshtastic field prototype", status: "pending" },
    { id: "measurements", label: "Upload first RF measurements", status: "pending" },
    { id: "power-test", label: "Test off-grid operation during simulated outage", status: "pending" },
    { id: "emergency-deploy", label: "Deploy emergency mesh during active event", status: "pending" },
    { id: "report", label: "Publish pilot findings (honest scope)", status: "pending" },
  ] as PilotChecklistItem[],
  budget: {
    targetRange: "$4,000–$8,000",
    status: "revised" as const,
    categories: [
      { label: "LoRa radios", range: "$150–$600" },
      { label: "Antennas & cabling", range: "$100–$400" },
      { label: "Raspberry Pi / small computers", range: "$100–$300" },
      { label: "Solar panels (100W–200W per node)", range: "$400–$1,200" },
      { label: "LiFePO4 batteries (50–100Ah)", range: "$600–$1,500" },
      { label: "Charge controllers & inverters", range: "$200–$500" },
      { label: "Enclosures & mounting", range: "$200–$600" },
      { label: "Test equipment & spares", range: "$100–$500" },
      { label: "Emergency deployment tools", range: "$100–$300" },
    ],
    excluded: [
      "Tower rent",
      "Professional climbing",
      "Engineering & permitting",
      "Commercial installation",
      "Major power infrastructure",
      "Land/site agreements",
      "Insurance",
    ],
    powerNote: "Budget increased to prioritize solar/battery independence. All pilot nodes must operate 48+ hours without grid power.",
  },
};
