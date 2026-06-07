export type PartnerNeed = {
  id: string;
  title: string;
  description: string;
};

export const partnerNeeds: PartnerNeed[] = [
  {
    id: "site-access",
    title: "Rooftop / ridge / tower access",
    description:
      "Landowners and site hosts willing to offer mount points for relays, antennas, and backup uplinks — with honest conversations about access and liability.",
  },
  {
    id: "emergency-coordination",
    title: "Emergency-service coordination",
    description:
      "Civil defense, fire, police, and healthcare partners to define resilience requirements, failover priorities, and alert paths.",
  },
  {
    id: "power-shelter",
    title: "Power and shelter locations",
    description:
      "Indoor rack space, generator hookups, and weatherproof shelters for edge nodes — especially at ridge and coastal anchor sites.",
  },
  {
    id: "funding",
    title: "Funding / grants / sponsorship",
    description:
      "Foundations, grants, civic funders, and local businesses to fund pilot build-out, permitting, and sustained operations.",
  },
  {
    id: "technical-volunteers",
    title: "Technical volunteers",
    description:
      "RF engineers, network operators, electricians, and installers for site surveys, deployments, and documentation.",
  },
  {
    id: "county-community",
    title: "County / community support",
    description:
      "County agencies, neighborhood boards, and civic groups to align the plan with local priorities and public benefit.",
  },
];
