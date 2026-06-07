import type { UseCase } from "@/types/network";

export const useCases: UseCase[] = [
  {
    id: "pilot-core-switching",
    title: "Pilot site aggregation",
    description:
      "Aggregate traffic from 2–3 pilot nodes with VLAN segmentation between emergency, community, and backhaul networks.",
    category: "routing-switching",
    pilotRole: "Wire a small edge closet or rack at a community anchor or data-center-edge candidate site.",
  },
  {
    id: "ridge-backhaul-link",
    title: "Ridge-to-coast backhaul",
    description:
      "Connect a high-site ridge relay to a coastal hub using point-to-point 5 GHz or 60 GHz links.",
    category: "wireless-backhaul",
    pilotRole: "Link one ridge relay to one hub in a pilot corridor — line-of-sight surveys required.",
  },
  {
    id: "community-wifi-zone",
    title: "Community Wi-Fi zone",
    description:
      "Provide public emergency Wi-Fi at a school, community center, or assembly point during outages.",
    category: "access-points-radios",
    pilotRole: "Cover a single public Wi-Fi zone; backhaul and power must be provisioned separately.",
  },
  {
    id: "fixed-wireless-access",
    title: "Fixed wireless access",
    description:
      "Deliver broadband to remote pockets not served by resilient fiber paths.",
    category: "access-points-radios",
    pilotRole: "Serve a limited subscriber pilot — not a replacement for island-wide ISP coverage.",
  },
  {
    id: "relay-antenna-mount",
    title: "Relay antenna deployment",
    description:
      "Mount sector and panel antennas on J-mounts or tower structures for ridge and rooftop relays.",
    category: "antennas",
    pilotRole: "Hardware ready for several mounts; structural and permit review still needed per site.",
  },
  {
    id: "sheltered-node-power",
    title: "Sheltered node power",
    description:
      "PDU, UPS, and rack power for a small indoor edge or switching closet.",
    category: "power-rack",
    pilotRole: "Power a few sheltered racks — outdoor/tower power engineering is a separate effort.",
  },
  {
    id: "local-edge-services",
    title: "Local edge services",
    description:
      "Run DNS caching, local alert relay, and lightweight apps when upstream connectivity is degraded.",
    category: "edge-compute",
    pilotRole: "Stand up one pilot edge node — scaling requires more compute, power, and cooling planning.",
  },
  {
    id: "satellite-failover",
    title: "Satellite uplink failover",
    description:
      "Maintain a backup internet path when submarine fiber or primary ISP links are disrupted.",
    category: "backup-internet",
    pilotRole: "Backup one pilot hub uplink — additional kits and sites needed for broader redundancy.",
  },
  {
    id: "tower-outage-runtime",
    title: "Tower outage runtime",
    description:
      "Keep ridge relays and emergency anchors powered through multi-hour or multi-day grid failures.",
    category: "batteries-resilience",
    pilotRole: "Support runtime at several tower sites in a pilot — full resilience sizing not yet complete.",
  },
];

export const useCaseById = Object.fromEntries(useCases.map((u) => [u.id, u]));
