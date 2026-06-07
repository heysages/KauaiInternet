export type GearCapability = {
  id: string;
  title: string;
  description: string;
  enabledBy: string;
};

export const gearCapabilities: GearCapability[] = [
  {
    id: "wireless-links",
    title: "Wireless links",
    description:
      "Point-to-point radios and sector antennas connect ridge relays to coastal hubs — creating paths that don't depend on a single fiber route.",
    enabledBy: "Backhaul radios, antennas, routing",
  },
  {
    id: "community-wifi",
    title: "Community Wi-Fi",
    description:
      "Access points at schools, community centers, and assembly points give residents a connection when home internet goes dark.",
    enabledBy: "Access points, switching, power",
  },
  {
    id: "backup-internet",
    title: "Backup internet",
    description:
      "Satellite uplink kits maintain a failover path when submarine fiber or primary ISP links are disrupted during storms.",
    enabledBy: "Starlink kits, routing failover",
  },
  {
    id: "edge-compute",
    title: "Edge compute",
    description:
      "Local servers cache critical data, run DNS, and relay emergency alerts — keeping island services alive when upstream is degraded.",
    enabledBy: "Edge servers, switching, rack power",
  },
  {
    id: "power-resilience",
    title: "Power resilience",
    description:
      "UPS, batteries, and solar-ready power keep nodes running through multi-hour or multi-day grid outages.",
    enabledBy: "Batteries, PDU, UPS, rack infrastructure",
  },
];
