import type { ResidentObservation } from "@/types/network";

/** Clearly labeled community observations — not verified facts */
export const mockResidentObservations: ResidentObservation[] = [
  {
    id: "obs-mock-1",
    observationType: "storm-issues",
    message:
      "North shore loses both road access and internet together during heavy rain — happens most winters.",
    lat: 22.2,
    lng: -159.5,
    locationLabel: "Hanalei area · community observation",
    nameOrOrg: "North shore neighbor",
    createdAt: "2026-05-14T10:00:00.000Z",
    source: "mock",
    dataConfidence: "community",
  },
  {
    id: "obs-mock-2",
    observationType: "starlink-usage",
    message:
      "Several households on our street use Starlink because cable was never extended up the valley.",
    lat: 21.924,
    lng: -159.527,
    locationLabel: "Kalaheo area · community observation",
    nameOrOrg: "West Kauai resident",
    createdAt: "2026-05-08T14:00:00.000Z",
    source: "mock",
    dataConfidence: "community",
  },
  {
    id: "obs-mock-3",
    observationType: "community-wifi",
    message:
      "Library parking lot is where people go to get signal during outages — not official but everyone knows.",
    lat: 22.075,
    lng: -159.318,
    locationLabel: "Kapaʻa · community observation",
    createdAt: "2026-04-20T09:00:00.000Z",
    source: "mock",
    dataConfidence: "community",
  },
  {
    id: "obs-mock-4",
    observationType: "weak-connectivity",
    message:
      "Cell signal drops to one bar in our neighborhood most afternoons. Fixed broadband is inconsistent.",
    lat: 21.876,
    lng: -159.446,
    locationLabel: "Poipu area · community observation",
    nameOrOrg: "South shore resident",
    createdAt: "2026-04-12T16:30:00.000Z",
    source: "mock",
    dataConfidence: "community",
  },
  {
    id: "obs-mock-5",
    observationType: "frequent-outages",
    message:
      "Power and internet both go out 3–4 times a year minimum. Usually restored within a day but not always.",
    lat: 21.957,
    lng: -159.669,
    locationLabel: "Waimea · community observation",
    createdAt: "2026-03-25T11:00:00.000Z",
    source: "mock",
    dataConfidence: "community",
  },
];
