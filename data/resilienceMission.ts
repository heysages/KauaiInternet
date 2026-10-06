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

export const everydayCoverage = {
  sources: [
    {
      label: "Kauai Now, May 2, 2024",
      href: "https://kauainownews.com/2024/05/02/haena-residents-challenge-att-cell-tower-plans/",
    },
    {
      label: "Civil Beat / AP, North Shore coverage gap",
      href: "https://apnews.com/article/hawaii-fire-departments-communication-fc8c2f9a7cb93f4b546e5e44ac7ea9e5",
    },
  ],
  pieces: [
    {
      id: "site",
      title: "Powered site",
      ordinary:
        "A radio here stays on when the utility blinks, so everyday service on the site does not wait for KIUC.",
      outage: "Solar and battery cover 72 hours. The generator refills after that.",
    },
    {
      id: "backbone",
      title: "Town-to-town backbone",
      ordinary:
        "This is backhaul. A home internet link, or a carrier small cell on the same site, uses it to reach the rest of the internet.",
      outage: "The status note and short messages still move from Hāʻena to Kīlauea.",
    },
    {
      id: "hub",
      title: "Internet at the hub",
      ordinary:
        "Starlink at two hubs, and Wi-Fi in the building, so a phone there can load a page or place a Wi-Fi call every day.",
      outage: "If the path off the island dies, the cached note at the hub remains.",
    },
    {
      id: "phone",
      title: "Band 48 phone radios",
      ordinary:
        "One BLiNQ FW-300i at each town hub, covering about 180° of that town. A phone that installs this profile can call and use data there on an ordinary day.",
      outage:
        "The radio draws up to 180 watts. Seven batteries at the town hub keep that maximum inside the 72 hours.",
    },
  ],
  stillNeeded: [
    {
      id: "bars",
      title: "Carrier bars",
      text: "A Verizon, AT&T, or T-Mobile phone does not join this network by itself. Their bars still need their own radio, or an agreement to share the site. This budget buys the Band 48 radios, not theirs.",
    },
    {
      id: "house",
      title: "A call from the house",
      text: "A house the town radio can see uses this network once the phone has the profile. A house behind a ridge is a gap-fill pocket, not a radio on every home. A subscriber radio for each house is still not in the pilot price.",
    },
    {
      id: "mesh",
      title: "The handheld mesh",
      text: "The mesh carries a short message when a phone has no service. Putting bars on a phone is a different radio.",
    },
  ],
} as const;

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
      "Links the hubs along the corridor. On an ordinary day that link is backhaul. In an outage it still carries a message from one community to the next.",
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
    id: "gap-fill",
    title: "Gap fill",
    summary:
      "Smaller solar nodes in the pockets a town radio does not face: Keʻē, Wainiha, the Hanalei valley, the road off Princeville, Anini, Kalihiwai, Kīlauea point, and Moloaʻa. A walk test adds or drops sites. Gap fill adds this phase to the cost.",
  },
  {
    id: "expansion",
    title: "North/East Expansion",
    summary:
      "Extend the same pattern toward Anahola and Kapaʻa after the pilot corridor is working. Whole island adds these towns to the cost.",
  },
  {
    id: "backbone",
    title: "Island Backbone",
    summary:
      "The same hub pattern in the towns where people live: Wailua, Līhuʻe, Kōloa, Kalaheo, Hanapēpē, Waimea, and Kekaha. Whole island adds these towns to the cost. Not the empty interior.",
  },
] as const;

export const gapFill = {
  radio: "BLiNQ X-300i",
  radioPrice: 4000,
  corePrice: 750,
  watts: 70,
  eirp: "33 dBm, about 2 watts",
  coverage: "about 270°",
  batteries: 2,
  panels: 2,
  pockets: [
    "Keʻē",
    "Wainiha",
    "Hanalei valley",
    "Princeville road",
    "Anini",
    "Kalihiwai",
    "Kīlauea point",
    "Moloaʻa",
  ],
} as const;

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
