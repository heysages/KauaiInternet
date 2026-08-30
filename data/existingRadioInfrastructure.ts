import type { RadioSiteResearch } from "@/types/network";

/**
 * Seed research entries — publicly documented infrastructure only.
 * KauaiInternet does NOT have permission to access any site listed here unless noted.
 */
export const existingRadioInfrastructure: RadioSiteResearch[] = [
  {
    id: "research-amateur-north",
    name: "North Shore Amateur Repeater (research)",
    type: "amateurRepeater",
    permissionStatus: "known",
    operationalStatus: "live",
    lat: 22.17,
    lng: -159.45,
    areaLabel: "North Kauai · approximate",
    notes: "Publicly referenced amateur repeater — verify current status with local radio club.",
    source: "Public repeater directories (verify independently)",
  },
  {
    id: "research-tower-lihue",
    name: "Līhuʻe Area Communications Tower (research)",
    type: "commercialTower",
    permissionStatus: "known",
    operationalStatus: "live",
    lat: 21.98,
    lng: -159.37,
    areaLabel: "Līhuʻe · approximate",
    notes: "Commercial/cellular tower area — exact operator and access unknown.",
    source: "Public FCC/facility databases (verify independently)",
  },
  {
    id: "research-ridge-potential",
    name: "Interior Ridge Elevated Site (potential)",
    type: "utility",
    permissionStatus: "potential",
    operationalStatus: "proposed",
    lat: 22.05,
    lng: -159.42,
    areaLabel: "Central ridge · approximate",
    notes: "Potential elevated site for backbone planning — permission required before any survey.",
  },
  {
    id: "research-historic-radio",
    name: "Historic Communication Site (research)",
    type: "historic",
    permissionStatus: "historic",
    operationalStatus: "proposed",
    lat: 22.08,
    lng: -159.55,
    areaLabel: "West Kauai · approximate",
    notes: "Decommissioned or historic facility — may inform site selection research only.",
  },
];

export const sitePermissionLabels: Record<
  RadioSiteResearch["permissionStatus"],
  string
> = {
  known: "Known Site",
  potential: "Potential Site",
  permissionRequired: "Permission Required",
  historic: "Historic Site",
  activePartner: "Active Partner Site",
};
