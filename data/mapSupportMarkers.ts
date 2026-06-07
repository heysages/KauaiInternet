import type { SupportMarker } from "@/types/network";

/** Mock community support markers — generalized locations only. */
export const mockSupportMarkers: SupportMarker[] = [
  {
    id: "mock-1",
    nameOrOrg: "Maria K.",
    supportType: "resident",
    message:
      "We lost internet for 3 days during the last storm. A local mesh network would have kept our family connected to emergency updates.",
    lat: 22.19,
    lng: -159.5,
    locationLabel: "North shore area · approximate",
    mayContact: true,
    createdAt: "2026-05-12T10:00:00.000Z",
    source: "mock",
  },
  {
    id: "mock-2",
    nameOrOrg: "David T.",
    supportType: "land-site-owner",
    message:
      "I have ridge-line property with clear sight lines toward central Kauai. Happy to host a relay site if it helps the community.",
    lat: 21.9,
    lng: -159.46,
    locationLabel: "South shore ridges · approximate",
    mayContact: true,
    createdAt: "2026-04-08T14:30:00.000Z",
    source: "mock",
  },
  {
    id: "mock-3",
    nameOrOrg: "Dr. Sarah L.",
    supportType: "emergency-services",
    message:
      "Our clinic needs redundant connectivity for telehealth. This initiative is exactly what Kauai healthcare has been asking for.",
    lat: 21.98,
    lng: -159.37,
    locationLabel: "Central Kauai · approximate",
    mayContact: false,
    createdAt: "2026-03-22T09:15:00.000Z",
    source: "mock",
  },
  {
    id: "mock-4",
    nameOrOrg: "Kauai Tech Volunteers",
    supportType: "technical-volunteer",
    message:
      "Local RF and network engineers ready to help with site surveys and pilot deployments on weekends.",
    lat: 22.06,
    lng: -159.35,
    locationLabel: "East Kauai · approximate",
    mayContact: true,
    createdAt: "2026-05-01T16:00:00.000Z",
    source: "mock",
  },
];
