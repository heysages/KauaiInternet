import type { ConcernCategory } from "@/types/network";

export type ConcernCategoryMeta = {
  id: ConcernCategory;
  label: string;
  shortLabel: string;
};

export const concernCategories: ConcernCategoryMeta[] = [
  { id: "health-emf", label: "Health & EMF", shortLabel: "Health" },
  { id: "environmental-impact", label: "Environmental Impact", shortLabel: "Environment" },
  { id: "visual-impact", label: "Visual Impact", shortLabel: "Visual" },
  { id: "privacy", label: "Privacy", shortLabel: "Privacy" },
  { id: "emergency-preparedness", label: "Emergency Preparedness", shortLabel: "Preparedness" },
  { id: "cultural-stewardship", label: "Cultural Stewardship", shortLabel: "Culture" },
  { id: "community-benefits", label: "Community Benefits", shortLabel: "Benefits" },
  { id: "tourism-impact", label: "Tourism Impact", shortLabel: "Tourism" },
  { id: "questions-ideas", label: "Questions & Ideas", shortLabel: "Ideas" },
];

export const concernCategoryById = Object.fromEntries(
  concernCategories.map((c) => [c.id, c])
);

export const concernCategoryColors: Record<ConcernCategory, string> = {
  "health-emf": "#d4a574",
  "environmental-impact": "#40916c",
  "visual-impact": "#94a3b8",
  privacy: "#6366f1",
  "emergency-preparedness": "#e8a317",
  "cultural-stewardship": "#b45309",
  "community-benefits": "#2d6a4f",
  "tourism-impact": "#f4b942",
  "questions-ideas": "#7c9eb2",
};
