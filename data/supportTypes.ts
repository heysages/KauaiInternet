import type { SupportType } from "@/types/network";

export const supportTypes: { id: SupportType; label: string }[] = [
  { id: "resident", label: "Resident" },
  { id: "business", label: "Business" },
  { id: "emergency-services", label: "Emergency Services" },
  { id: "land-site-owner", label: "Land / Site Owner" },
  { id: "nonprofit", label: "Nonprofit" },
  { id: "government", label: "Government" },
  { id: "visitor", label: "Visitor" },
  { id: "technical-volunteer", label: "Technical Volunteer" },
];

export const supportTypeById = Object.fromEntries(
  supportTypes.map((t) => [t.id, t])
);
