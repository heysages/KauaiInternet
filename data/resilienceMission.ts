/**
 * Homepage operational story after Hurricane Lowell.
 * Dollar figures come from data/pilotBudget.ts (October 2026, no contributed gear).
 */

import { pilotCapital, pilotOperating } from "@/data/pilotBudget";

export { pilotCapital, pilotOperating };

export const designPrinciple = "Grid down. Internet down. Kauaʻi still communicates.";

export const kauaiInternet72 = {
  name: "KauaiInternet 72",
  hours: 72,
  rule: "Critical network nodes operate for at least 72 hours without utility power, on solar and battery.",
};

export const architecture = [
  {
    id: "hubs",
    title: "Resilience Hubs",
    summary:
      "Community sites that hold a cached status note — roads, water, aid — and run on their own solar and battery.",
  },
  {
    id: "backbone",
    title: "Wireless Backbone",
    summary:
      "Links the hubs along the corridor so a message can move from one community to the next.",
  },
  {
    id: "mesh",
    title: "Emergency Mesh",
    summary:
      "Short messages from people nearby when phones, fiber, and ordinary radio are down.",
  },
] as const;

export const pilotCorridor = ["Hāʻena", "Hanalei", "Princeville", "Kīlauea"] as const;

export const rolloutStages = [
  {
    id: "pilot",
    title: "North Shore Pilot",
    summary: "Hāʻena, Hanalei, Princeville, and Kīlauea. The first corridor that meets KauaiInternet 72.",
  },
  {
    id: "expansion",
    title: "North/East Expansion",
    summary: "Extend the same pattern toward Anahola and Kapaʻa after the pilot corridor is working.",
  },
  {
    id: "backbone",
    title: "Island Backbone",
    summary: "A small set of elevated sites so the rest of Kauaʻi can join the same network.",
  },
] as const;

export const costEstimateNote =
  "October 2026 budget to buy the corridor new. No contributed gear is subtracted. Listed hardware uses published prices. Labor, freight, cabinets, and overhead are allowances, not quotes.";

export function formatUsd(amount: number): string {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function formatUsdRange(low: number, high: number): string {
  return `${formatUsd(low)}–${formatUsd(high)}`;
}

export type FailureState = "up" | "limited" | "down";

export const failureColumns = [
  { id: "grid", label: "Grid down" },
  { id: "fiber", label: "Fiber down" },
  { id: "cellular", label: "Cellular down" },
  { id: "satellite", label: "Satellite down" },
  { id: "combined", label: "All of these" },
] as const;

export const failureRows: {
  service: string;
  cells: { state: FailureState; label: string }[];
}[] = [
  {
    service: "Emergency mesh messages",
    cells: [
      { state: "up", label: "Stays up" },
      { state: "up", label: "Stays up" },
      { state: "up", label: "Stays up" },
      { state: "up", label: "Stays up" },
      { state: "up", label: "Stays up for 72 hours" },
    ],
  },
  {
    service: "Cached hub status",
    cells: [
      { state: "up", label: "Stays up" },
      { state: "up", label: "Stays up" },
      { state: "up", label: "Stays up" },
      { state: "up", label: "Stays up" },
      { state: "up", label: "Stays up for 72 hours" },
    ],
  },
  {
    service: "Links between hubs",
    cells: [
      { state: "up", label: "Stays up" },
      { state: "up", label: "Stays up" },
      { state: "up", label: "Stays up" },
      { state: "up", label: "Stays up" },
      { state: "up", label: "Stays up for 72 hours" },
    ],
  },
  {
    service: "Off-island internet",
    cells: [
      { state: "limited", label: "Only if hub solar runs a path" },
      { state: "limited", label: "Cellular or satellite" },
      { state: "limited", label: "Fiber or satellite" },
      { state: "limited", label: "Fiber or cellular" },
      { state: "down", label: "Down" },
    ],
  },
  {
    service: "Cellular alerts and phone service",
    cells: [
      { state: "down", label: "Down when towers lose power" },
      { state: "limited", label: "May remain" },
      { state: "down", label: "Down" },
      { state: "limited", label: "May remain" },
      { state: "down", label: "Down" },
    ],
  },
];

export const lowellLessons = [
  {
    id: "duration",
    title: "The grid stayed down for days, and longer on the North Shore",
    summary:
      "The County of Kauaʻi reported on September 14, 2026 that peak outages hit about 33,000 customers, with roughly 6,900 still out that morning. KIUC reported on September 21 that restoration had reached 98% fourteen days after Hurricane Lowell. On September 22, about 500 members in Wainiha and Hāʻena were still without power.",
    sources: [
      {
        label: "County of Kauaʻi, Sept. 14, 2026",
        href: "https://content.govdelivery.com/accounts/HIKAUAICOUNTY/bulletins/42a9fa7",
      },
      {
        label: "KIUC Lowell updates",
        href: "https://kiuc.coop/lowell_updates",
      },
    ],
  },
  {
    id: "radio",
    title: "People could not count on radio or internet alerts",
    summary:
      "KKCR stayed on the air through the night of the storm, then lost internet and was running on generator fuel. Designated emergency stations ran into power problems, so large parts of the island could not hear which roads were open, where water and food were, or which facilities were operating.",
    sources: [
      {
        label: "Hawaiʻi Public Radio, Sept. 10, 2026",
        href: "https://www.hawaiipublicradio.org/local-news/2026-09-10/kkcr-was-on-air-for-residents-during-lowell-and-now-needs-help-to-avoid-closure",
      },
      {
        label: "WTOP / Hawaiʻi reporting on radio silence",
        href: "https://wtop.com/national/2026/09/radio-silence-amid-lowell-reveals-critical-gap-in-emergency-plan/",
      },
    ],
  },
  {
    id: "need",
    title: "The need was local status, not a faster internet plan",
    summary:
      "Neighbors needed a way to learn road closures, water, aid, and whether a clinic or shelter was open, and a way to tell someone nearby they were all right. Official alerts still matter. Call 911 when you can, and sign up for county Everbridge alerts.",
    sources: [
      {
        label: "County of Kauaʻi / KEMA",
        href: "https://www.kauai.gov/KEMA",
      },
    ],
  },
];
