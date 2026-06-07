import type { DataConfidence } from "@/types/network";

export const dataConfidenceLegend: {
  id: DataConfidence;
  label: string;
  description: string;
  color: string;
}[] = [
  {
    id: "verified",
    label: "Verified Information",
    description: "Publicly known facilities and general provider facts — not address-level coverage",
    color: "#1a6b7c",
  },
  {
    id: "community",
    label: "Community-Contributed Information",
    description: "Neighbor observations — helpful context, not verified facts",
    color: "#c4a574",
  },
  {
    id: "future-opportunity",
    label: "Future Opportunities",
    description: "Ideas under discussion — not existing infrastructure",
    color: "#5a9a7a",
  },
];

export const dataConfidenceColors: Record<DataConfidence, string> = {
  verified: "#1a6b7c",
  community: "#c4a574",
  "future-opportunity": "#5a9a7a",
};
