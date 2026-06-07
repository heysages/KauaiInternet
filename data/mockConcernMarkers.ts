import type { CommunityConcernMarker } from "@/types/network";

export const mockConcernMarkers: CommunityConcernMarker[] = [
  {
    id: "concern-mock-1",
    nameOrOrg: "North shore resident",
    category: "visual-impact",
    message:
      "We are open to exploring connectivity ideas, but want to understand what might be visible along the Hanalei corridor before anything is considered.",
    lat: 22.2,
    lng: -159.5,
    locationLabel: "North shore · approximate",
    mayContact: false,
    createdAt: "2026-05-18T10:00:00.000Z",
    source: "mock",
  },
  {
    id: "concern-mock-2",
    nameOrOrg: "Parent",
    category: "health-emf",
    message:
      "Would like more information about wireless equipment near schools and what lower-power community options might look like.",
    lat: 21.978,
    lng: -159.365,
    locationLabel: "Lihue area · approximate",
    mayContact: true,
    createdAt: "2026-05-10T14:00:00.000Z",
    source: "mock",
  },
  {
    id: "concern-mock-3",
    nameOrOrg: "Community member",
    category: "cultural-stewardship",
    message:
      "Important that any planning respects cultural sites and includes community stewards in the conversation from the beginning.",
    lat: 22.04,
    lng: -159.55,
    locationLabel: "West Kauai · approximate",
    mayContact: false,
    createdAt: "2026-05-02T09:30:00.000Z",
    source: "mock",
  },
  {
    id: "concern-mock-4",
    nameOrOrg: "Local business",
    category: "tourism-impact",
    message:
      "Curious how community resilience could help small businesses during outages without prioritizing visitor corridors over residents.",
    lat: 21.876,
    lng: -159.446,
    locationLabel: "Poipu area · approximate",
    mayContact: true,
    createdAt: "2026-04-22T16:00:00.000Z",
    source: "mock",
  },
  {
    id: "concern-mock-5",
    nameOrOrg: "Neighbor",
    category: "questions-ideas",
    message:
      "Could community Wi-Fi at existing gathering places be explored first, before any larger infrastructure is considered?",
    lat: 22.075,
    lng: -159.318,
    locationLabel: "Kapaa · approximate",
    mayContact: true,
    createdAt: "2026-04-15T11:00:00.000Z",
    source: "mock",
  },
  {
    id: "concern-mock-6",
    nameOrOrg: "Environmental advocate",
    category: "environmental-impact",
    message:
      "Interested in how solar, battery, and low-impact siting could be part of any pilot — and how e-waste would be handled.",
    lat: 22.06,
    lng: -159.35,
    locationLabel: "East Kauai · approximate",
    mayContact: false,
    createdAt: "2026-03-28T08:00:00.000Z",
    source: "mock",
  },
];
