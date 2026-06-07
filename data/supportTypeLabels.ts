import type { SupportType } from "@/types/network";

export const supportTypeOptions: { value: SupportType; label: string }[] = [
  { value: "resident", label: "Resident" },
  { value: "business", label: "Business" },
  { value: "land-site-owner", label: "Site owner" },
  { value: "emergency-services", label: "Emergency services" },
  { value: "nonprofit", label: "Nonprofit" },
  { value: "government", label: "Government" },
  { value: "visitor", label: "Visitor" },
  { value: "technical-volunteer", label: "Technical volunteer" },
];
