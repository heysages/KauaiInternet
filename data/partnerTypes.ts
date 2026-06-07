import type { PartnerType } from "@/types/network";

export const partnerTypes: PartnerType[] = [
  {
    id: "land-site-hosts",
    label: "Land & site hosts",
    description:
      "Landowners offering ridge, rooftop, or tower access for relays and antennas.",
  },
  {
    id: "equipment-donors",
    label: "Equipment donors",
    description:
      "Organizations or individuals contributing gear to expand the starter inventory.",
  },
  {
    id: "technical-volunteers",
    label: "Technical volunteers",
    description:
      "RF engineers, network operators, and installers helping site surveys and deployments.",
  },
  {
    id: "local-businesses",
    label: "Local businesses",
    description:
      "Businesses sponsoring nodes, hosting equipment, or funding pilot segments.",
  },
  {
    id: "emergency-agencies",
    label: "Emergency agencies",
    description:
      "Civil defense, fire, police, and healthcare partners defining resilience requirements.",
  },
  {
    id: "grant-funding",
    label: "Grant & funding partners",
    description:
      "Foundations, grants, and civic funders supporting pilot build-out and operations.",
  },
];
