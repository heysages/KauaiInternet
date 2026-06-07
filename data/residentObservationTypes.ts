import type { ResidentObservationType } from "@/types/network";

export type ResidentObservationMeta = {
  id: ResidentObservationType;
  label: string;
  description: string;
};

export const residentObservationTypes: ResidentObservationMeta[] = [
  {
    id: "strong-connectivity",
    label: "Strong connectivity",
    description: "Reliable service in this area under normal conditions",
  },
  {
    id: "weak-connectivity",
    label: "Weak connectivity",
    description: "Slow or unreliable service in everyday use",
  },
  {
    id: "frequent-outages",
    label: "Frequent outages",
    description: "Regular service interruptions reported",
  },
  {
    id: "storm-issues",
    label: "Storm-related issues",
    description: "Connectivity problems during or after storms",
  },
  {
    id: "backup-power",
    label: "Backup power availability",
    description: "Generator, solar, or battery backup for connectivity",
  },
  {
    id: "starlink-usage",
    label: "Starlink usage",
    description: "Satellite internet used in this area",
  },
  {
    id: "community-wifi",
    label: "Community Wi-Fi location",
    description: "Known public or community Wi-Fi gathering point",
  },
  {
    id: "emergency-comms",
    label: "Emergency communication resource",
    description: "Radio, ham, or emergency coordination resource",
  },
];

export const residentObservationById = Object.fromEntries(
  residentObservationTypes.map((t) => [t.id, t])
);

export const residentObservationColors: Record<ResidentObservationType, string> = {
  "strong-connectivity": "#40916c",
  "weak-connectivity": "#b45309",
  "frequent-outages": "#dc2626",
  "storm-issues": "#e8a317",
  "backup-power": "#6366f1",
  "starlink-usage": "#134e5e",
  "community-wifi": "#f4b942",
  "emergency-comms": "#1a6b7c",
};
