import type { CandidateSiteType } from "@/types/network";

export type CandidateSiteTypeMeta = {
  id: CandidateSiteType;
  label: string;
  description: string;
  mapColor: string;
};

export const candidateSiteTypes: CandidateSiteTypeMeta[] = [
  {
    id: "emergency-anchor",
    label: "Emergency Readiness Hub",
    description:
      "Places that could help communities stay connected and coordinated during emergencies.",
    mapColor: "#e8a317",
  },
  {
    id: "community-anchor",
    label: "Community Gathering Place",
    description:
      "Schools, centers, and town hubs where neighbors already come together.",
    mapColor: "#40916c",
  },
  {
    id: "high-site-ridge",
    label: "Island Connection Point",
    description:
      "Elevated areas that could help link neighborhoods across valleys and coastlines.",
    mapColor: "#2d6a4f",
  },
  {
    id: "data-center-edge",
    label: "Community Hub Idea",
    description:
      "A sheltered community space that could support shared island services.",
    mapColor: "#1a6b7c",
  },
  {
    id: "public-wifi-zone",
    label: "Community Wi-Fi Space",
    description:
      "Public areas where neighbors could connect during outages and emergencies.",
    mapColor: "#f4b942",
  },
  {
    id: "backup-uplink",
    label: "Preparedness Site",
    description:
      "Locations that could help Kauai stay connected when outside links are disrupted.",
    mapColor: "#134e5e",
  },
  {
    id: "partner-hosted",
    label: "Neighbor-Hosted Project",
    description:
      "Land or buildings offered by local partners to strengthen community connections.",
    mapColor: "#94a3b8",
  },
];

export const candidateSiteTypeById = Object.fromEntries(
  candidateSiteTypes.map((t) => [t.id, t])
);
