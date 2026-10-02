/**
 * Plain-language community update — edit when facts change.
 * Always cite sources; do not claim KauaiInternet operates affected systems.
 */
export const siteUpdate = {
  lastUpdated: "2026-10-02",
  headline: "When the power goes out, a lot of radios go quiet",
  subhead:
    "Tropical Storm Lala showed the failure. Here is what public sources report, and the small service KauaiInternet is planning so a short message can still move with the grid off.",

  whatsBeingReported: [
    {
      id: "hpr-north-shore",
      title: "Hawaiʻi Public Radio — a Kauaʻi transmitter is off because the site lost power",
      summary:
        "As of 3:10 a.m. on October 2, 2026, HPR’s transmitter status page says KIPL 89.9 FM on Kauaʻi is off the air due to a power outage at the transmitter site, with no estimate for when power returns. North Shore stations 89.9 FM and 101.7 FM are listed as back on the air as of September 17. Streaming still works, which does not help a house with no power and no internet. This is broadcast news radio — not the county’s emergency two-way radio system.",
      source: "Hawaiʻi Public Radio Transmitter Network Status",
      sourceUrl: "https://www.hawaiipublicradio.org/transmitter-network-status",
    },
    {
      id: "storm-lala",
      title: "Tropical Storm Lala — power outages affected radios at home",
      summary:
        "In mid-August 2026, KIUC’s outage map showed more than 7,300 customers without power at 10:15 a.m. Sunday during Tropical Storm Lala, later falling to 301 by Monday morning. KIUC told members to prepare for prolonged outages. A radio or alert that plugs into the house stops in that window, even if a transmitter upstream is still on.",
      source: "Kauai Now / County of Kauaʻi storm updates",
      sourceUrl: "https://kauainownews.com/2026/08/16/7354-customers-of-kaua%CA%BBi-island-utility-cooperative-are-without-power-due-to-tropical-storm-lala/",
    },
    {
      id: "everbridge",
      title: "Everbridge alert tests rescheduled (not a radio tower failure)",
      summary:
        "Kauaʻi County’s new Everbridge emergency notification service had a planned public test for June 16, 2026 postponed because of vendor issues. The county said a new date would be announced. That is separate from police and fire radio — and it is a reminder that an alert people never receive does not help.",
      source: "County of Kauaʻi / Kauai Now",
      sourceUrl: "https://www.kauai.gov/County-Press-Releases/Emergency-mass-notification-service-test-scheduled-for-June-16-2026",
    },
    {
      id: "county-phones",
      title: "County phone line outages (2025)",
      summary:
        "Kauaʻi County has experienced intermittent phone and voicemail outages affecting some non-emergency lines. 911 remained operational during those events, though KPD reported brief technical issues affecting some 911 calls in July 2025 — callers were directed to alternate numbers.",
      source: "Kauai Now / County press releases",
      sourceUrl: "https://kauainownews.com/2025/07/28/police-report-technical-issues-affecting-911-calls-push-use-of-non-emergency-number/",
    },
  ],

  whatThisMeans: [
    "Different systems get mixed together: FM broadcast radio, cell alerts, county phones, and first-responder radio are not the same thing.",
    "Lala showed the failure that matters here: when KIUC power is out, a radio or alert that plugs into the house goes quiet, even if a transmitter upstream is still on.",
    "A transmitter can go silent because the site itself lost power. Streaming does not replace it for a home with no power and no internet.",
    "KauaiInternet does not operate county emergency radio, 911, or HPR. The near-term build is a few solar and battery nodes that can still pass a short text when the grid is dark.",
    "In a true emergency, call 911 when you can. Monitor official county sources (KEMA, kauai.gov).",
  ],

  ourRemedy: {
    title: "What KauaiInternet is doing about it",
    now: [
      "Leading with Hurricane Lowell: a corridor that still communicates when the grid and the internet are down",
      "Requiring KauaiInternet 72 on critical nodes — at least 72 hours on solar and battery",
      "Asking for host sites in Hāʻena, Hanalei, Princeville, and Kīlauea",
    ],
    nearTerm: [
      "North Shore pilot corridor: Hāʻena, Hanalei, Princeville, and Kīlauea",
      "KauaiInternet 72: critical nodes run at least 72 hours on solar and battery with no utility power",
      "Resilience hubs, a wireless backbone, and an emergency mesh",
      "About $65,000–$115,000 to build and $25,000–$50,000 a year to operate. Planning estimates, pending site design and a bill of materials",
    ],
    longTerm: [
      "Island backbone, more hubs, and subscriber internet only after this first path works with the grid off",
      "No claim that this replaces 911, county radio, or broadcast news",
    ],
  },

  whatYouCanDo: [
    { label: "Read what Hurricane Lowell changed", href: "/#lowell", external: false },
    { label: "Sign up for official county alerts", href: "https://www.kauai.gov/KEMA", external: true },
    { label: "Report your experience on our map", href: "/#network-map", external: false },
    { label: "Offer to host a node", href: "/#host-node", external: false },
    { label: "Join the North Shore pilot", href: "/#north-shore-pilot", external: false },
    { label: "Read the full network plan", href: "/#how-it-works", external: false },
  ],

  disclaimer:
    "KauaiInternet is not an official emergency agency and does not operate public-safety radio. This page summarizes publicly reported information as of the date above. For emergencies, call 911.",
};
