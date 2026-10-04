/**
 * North Shore pilot budget, October 2026.
 * Buys every piece new. Nothing on the shelf is counted.
 * Listed prices are published distributor or manufacturer prices, rounded to the dollar.
 * Allowances are planning amounts where no single public price covers the line.
 */

export type BudgetBasis = "listed" | "allowance";

export type BudgetGroupId = "equipment" | "power" | "freight" | "survey" | "labor" | "overhead";

export type BudgetLine = {
  id: string;
  group: BudgetGroupId;
  label: string;
  detail: string;
  quantity: number;
  unitDollars: number;
  basis: BudgetBasis;
  sourceLabel?: string;
  sourceHref?: string;
};

export const budgetAssumptions = {
  sites: 5,
  hops: 4,
  asOf: "October 2026",
  design:
    "Four town hubs (Hāʻena, Hanalei, Princeville, Kīlauea) plus one ridge relay, because the North Shore usually needs an extra hop. A survey can drop the relay.",
  technology:
    "Ubiquiti airFiber 5XHD on 5 GHz for the backbone, with 30 dBi dishes. Ubiquiti is still selling and supporting this radio. Cambium Networks Ltd went into administration on September 14, 2026, and the ePMP line was not in the product set Airspan bought on September 22. 60 GHz gear is newer on paper, and it fades in Kauaʻi rain, so it is not the primary path. Each site gets four EG4 5.12 kWh batteries online, a fifth pack as a hot spare, 3.2 kW of solar, and a propane generator. That covers the radios past 72 hours and still leaves room to charge phones. Starlink Mini is the off-island path at two hubs. Messages use current RAK WisMesh gateways.",
  labor:
    "Install labor is priced at $185 an hour. That is a Kauaʻi contractor bill rate for a licensed electrician and a helper, above the roughly $47 journey-worker wage in local job postings. It is not the $89.71 prevailing-wage total, which is a wage-plus-fringe figure for covered public work, not a bill rate. The earlier $150 rate did not cover a four-day site or the North Shore shuttle.",
  noDonatedGear:
    "This version assumes no contributed radios, switches, batteries, or antennas. The shelf inventory is a separate asset and is not subtracted here.",
};

/** 15% covers insurance, trucks, project management, and contractor margin. */
export const overheadRate = 0.15;

/**
 * Kauaʻi GET is 4% state plus 0.5% county. The tax is charged on the tax,
 * so the effective rate is 4.5 / 95.5.
 */
export const kauaiGetRate = 0.045 / 0.955;

/** Covers a longer cable run or a mount the survey adds. Not a second design. */
export const materialsContingencyRate = 0.08;

export const budgetLines: BudgetLine[] = [
  {
    id: "af-5xhd",
    group: "equipment",
    label: "Ubiquiti airFiber 5XHD radios",
    detail: "8 radios, two per hop, for 4 links. Ubiquiti’s store lists the AF-5XHD at $429. 5 GHz keeps working in heavy rain. 60 GHz does not.",
    quantity: 8,
    unitDollars: 429,
    basis: "listed",
    sourceLabel: "Ubiquiti store, airFiber 5XHD",
    sourceHref: "https://store.ui.com/us/en/products/airfiber-5xhd-1",
  },
  {
    id: "spare-radios",
    group: "equipment",
    label: "Spare airFiber radios",
    detail: "Two spares on the shelf the day the corridor is built, so a failed radio is not a reorder from the mainland.",
    quantity: 2,
    unitDollars: 429,
    basis: "listed",
    sourceLabel: "Ubiquiti store, airFiber 5XHD",
    sourceHref: "https://store.ui.com/us/en/products/airfiber-5xhd-1",
  },
  {
    id: "dishes",
    group: "equipment",
    label: "Ubiquiti RocketDish 30 dBi",
    detail: "One RD-5G30 per radio. A distributor lists it at $182.52, rounded here.",
    quantity: 8,
    unitDollars: 183,
    basis: "listed",
    sourceLabel: "NewTech Industries, RD-5G30",
    sourceHref: "https://www.newtechindustries.com/ubiquiti-rd-5g30-5ghz-rocketdish-30dbi-2x2/",
  },
  {
    id: "radio-mounts",
    group: "equipment",
    label: "airFiber dish mount kits",
    detail: "The RocketDish needs an airFiber X mount to hold a 5XHD. Allowance until that SKU is on the order.",
    quantity: 8,
    unitDollars: 99,
    basis: "allowance",
  },
  {
    id: "drone-kit",
    group: "survey",
    label: "Survey drone kit",
    detail: "DJI Mavic 3 Enterprise with spare batteries and a zoom camera, bought rather than rented, so later roof and path checks use the same kit. UAV Coach lists a battery kit at $5,721.",
    quantity: 1,
    unitDollars: 5721,
    basis: "listed",
    sourceLabel: "UAV Coach, Mavic 3 Enterprise battery kit",
    sourceHref: "https://uavcoach.com/shop/dji-mavic-3-enterprise-battery-kit/",
  },
  {
    id: "wismesh-gateway",
    group: "equipment",
    label: "RAK WisMesh Ethernet gateways",
    detail: "One current Meshtastic gateway at each powered site. Rokland lists the PoE build at $114.97.",
    quantity: 5,
    unitDollars: 115,
    basis: "listed",
    sourceLabel: "Rokland, WisMesh Ethernet gateway",
    sourceHref: "https://store.rokland.com/products/wismesh-ethernet-gateway",
  },
  {
    id: "mesh-nodes",
    group: "equipment",
    label: "Community mesh radios",
    detail: "20 current WisMesh-class handhelds, about five per town, for the short-message layer.",
    quantity: 20,
    unitDollars: 65,
    basis: "allowance",
  },
  {
    id: "routers",
    group: "equipment",
    label: "Site routers",
    detail: "One current MikroTik RB5009-class router at each powered site.",
    quantity: 5,
    unitDollars: 250,
    basis: "allowance",
  },
  {
    id: "edge-pc",
    group: "equipment",
    label: "Hub computers",
    detail: "Four fanless edge PCs, one per town hub, to hold the cached status note. The relay does not get one.",
    quantity: 4,
    unitDollars: 650,
    basis: "allowance",
  },
  {
    id: "poe-switch",
    group: "equipment",
    label: "Outdoor PoE switches",
    detail: "One small PoE switch at each powered site.",
    quantity: 5,
    unitDollars: 200,
    basis: "allowance",
  },
  {
    id: "starlink",
    group: "equipment",
    label: "Starlink Mini kits",
    detail: "Two kits, at Hanalei and Princeville. Starlink lists the Mini from $199. The dish stays inside the power budget. Community outlets are limited before the dish or the radios.",
    quantity: 2,
    unitDollars: 199,
    basis: "listed",
    sourceLabel: "Starlink Mini",
    sourceHref: "https://starlink.com/cd/mini-product-us",
  },
  {
    id: "batteries",
    group: "power",
    label: "EG4 48V 100Ah LiFePO4 batteries",
    detail: "Four 5.12 kWh batteries online at each site. That is 20.48 kWh nameplate, about 16 kWh usable at 80% depth of discharge. A 200 watt average load — radios, phone charging, and a light — is about 15 kWh over 72 hours. The radios alone are closer to 100 watts, so the bank covers them well past 72 hours.",
    quantity: 20,
    unitDollars: 1471,
    basis: "listed",
    sourceLabel: "SanTan Solar, EG4 LifePower4 V2",
    sourceHref: "https://www.santansolar.com/product/eg4-lifepower-4-v2-lithium-battery-48v-100ah-ul-1973-ul-9540a/",
  },
  {
    id: "hot-swap-batteries",
    group: "power",
    label: "Hot-swap spare batteries",
    detail: "One extra 5.12 kWh pack at each site, stored charged. The four online packs each sit on their own fuse, so a weak pack can be unbolted and this spare bolted in while the other three keep the hub up. Three packs still hold about 12 kWh usable, roughly two days at a 200 watt load.",
    quantity: 5,
    unitDollars: 1471,
    basis: "listed",
    sourceLabel: "SanTan Solar, EG4 LifePower4 V2",
    sourceHref: "https://www.santansolar.com/product/eg4-lifepower-4-v2-lithium-battery-48v-100ah-ul-1973-ul-9540a/",
  },
  {
    id: "lynx",
    group: "power",
    label: "Victron Lynx Distributor",
    detail: "One fused DC bus per site. Four positions, one per online battery, so a single pack can be isolated without shutting the hub down. Current Connected lists the M10 at $232.90.",
    quantity: 5,
    unitDollars: 233,
    basis: "listed",
    sourceLabel: "Current Connected, Lynx Distributor M10",
    sourceHref: "https://www.currentconnected.com/product/victron-lynx-distributor-power-distribution-system-m10",
  },
  {
    id: "mega-fuses",
    group: "power",
    label: "Battery fuses",
    detail: "Four MEGA fuses plus a spare at each site. The Lynx ships without fuses.",
    quantity: 5,
    unitDollars: 125,
    basis: "allowance",
  },
  {
    id: "inverters",
    group: "power",
    label: "Victron MultiPlus-II 48/5000",
    detail: "One 120V UL inverter/charger per site. 4,000 watts continuous and a 70 amp charger, so the hub can run a charging station and still take a generator. The charger is limited to about 2.5 kW so it stays inside the generator’s propane rating. Current Connected lists it at $1,458.60.",
    quantity: 5,
    unitDollars: 1459,
    basis: "listed",
    sourceLabel: "Current Connected, MultiPlus-II 48/5000 120V",
    sourceHref: "https://www.currentconnected.com/product/victron-48v-multiplus-2-5kva-120v-inverter-70a-charger-ul-1741",
  },
  {
    id: "mppt",
    group: "power",
    label: "Victron SmartSolar MPPT 250/70",
    detail: "One charge controller per site. Eight 400W panels are about 57 amps while charging, inside the 70 amp limit. EXPLORIST.life lists it at $502.35.",
    quantity: 5,
    unitDollars: 502,
    basis: "listed",
    sourceLabel: "EXPLORIST.life, SmartSolar MPPT 250/70",
    sourceHref: "https://shop.explorist.life/shop/all-products/victron-smartsolar-mppt-25070/",
  },
  {
    id: "panels",
    group: "power",
    label: "400W solar modules",
    detail: "Eight modules per site, 3.2 kW. On a clear day that is on the order of 9–10 kWh, enough to run the hub and put charge back in the bank. After a storm the yield drops, which is why the generator is in the budget. Retail allowance.",
    quantity: 40,
    unitDollars: 210,
    basis: "allowance",
  },
  {
    id: "generators",
    group: "power",
    label: "Dual-fuel inverter generators",
    detail: "One Champion 4500-watt inverter generator per site, model 201319, so no one has to haul a generator across the bridge during the storm. Propane is the storm fuel because it stores. Gasoline is the second fuel. SuperGen lists it at $959. Propane running output is about 3,150 watts.",
    quantity: 5,
    unitDollars: 959,
    basis: "listed",
    sourceLabel: "SuperGen, Champion 201319",
    sourceHref: "https://www.supergenproducts.com/product/201319-4500w-champion-electric-start-dual-fuel-inverter-with-co-shield/",
  },
  {
    id: "propane",
    group: "power",
    label: "Propane cache",
    detail: "Four 20-pound tanks at each site, bought on Kauaʻi. One tank is about one full recharge of the online bank. Four tanks cover several cloudy days of top-ups. Tank plus the first fill.",
    quantity: 20,
    unitDollars: 85,
    basis: "allowance",
  },
  {
    id: "balance-of-system",
    group: "power",
    label: "Racks, racking, generator inlet",
    detail: "Rack for four server batteries, a shelf for the spare pack, eight-panel racking, generator inlet, propane cage, surge protection, conduit, and grounding. Per-site allowance, not a quote.",
    quantity: 5,
    unitDollars: 2400,
    basis: "allowance",
  },
  {
    id: "freight",
    group: "freight",
    label: "Freight to Kauaʻi",
    detail: "About four tons once the battery racks, eight-panel arrays, and generators are included. Ocean freight to Nāwiliwili, then a smaller shuttle past the Hanalei bridge, which a full box truck may not cross. Propane tanks are bought on island and are not in this weight.",
    quantity: 1,
    unitDollars: 18000,
    basis: "allowance",
  },
  {
    id: "drone-pilot",
    group: "survey",
    label: "Drone path survey",
    detail: "Four days with a Part 107 pilot to check line of sight on each hop and the spare ridge, including a weather hold. Day rate allowance, not an electrician hour.",
    quantity: 4,
    unitDollars: 1800,
    basis: "allowance",
  },
  {
    id: "boom-lift",
    group: "survey",
    label: "Boom lift",
    detail: "Lift rental and delivery to the North Shore for roof mounts the drone cannot install.",
    quantity: 1,
    unitDollars: 3000,
    basis: "allowance",
  },
  {
    id: "permits",
    group: "survey",
    label: "Permits",
    detail: "Electrical and solar permits for a 3.2 kW array and a generator at each site, plus a coastal Special Management Area allowance where Hāʻena or Hanalei sites fall inside it.",
    quantity: 1,
    unitDollars: 8000,
    basis: "allowance",
  },
  {
    id: "field-labor",
    group: "labor",
    label: "Install and alignment",
    detail: "400 hours at $185. Two people for five days at each of five sites: battery rack, eight-panel array, generator inlet, radio alignment, and the drive past Princeville.",
    quantity: 400,
    unitDollars: 185,
    basis: "allowance",
  },
  {
    id: "design-labor",
    group: "labor",
    label: "RF and electrical design",
    detail: "80 hours at $185 for the link budget, the one-line with the generator inlet and hot-swap bus, and permit drawings.",
    quantity: 80,
    unitDollars: 185,
    basis: "allowance",
  },
];

export const operatingLines: BudgetLine[] = [
  {
    id: "starlink-service",
    group: "equipment",
    label: "Starlink Roam 300GB",
    detail: "Two dishes at $80 a month. Starlink’s published Roam 300GB plan.",
    quantity: 24,
    unitDollars: 80,
    basis: "listed",
    sourceLabel: "Starlink service plans",
    sourceHref: "https://starlink.com/service-plans",
  },
  {
    id: "maintenance",
    group: "labor",
    label: "Maintenance labor",
    detail: "Four quarterly service visits, 48 hours at the $185 bill rate. Storm response is the on-call roster and the outage week below, not this line.",
    quantity: 48,
    unitDollars: 185,
    basis: "allowance",
  },
  {
    id: "site-access",
    group: "overhead",
    label: "Site access",
    detail: "$200 a month at five sites if the roof or yard is not donated. Drop this line if hosts give the location.",
    quantity: 60,
    unitDollars: 200,
    basis: "allowance",
  },
  {
    id: "insurance",
    group: "overhead",
    label: "Equipment insurance",
    detail: "Inland-marine style allowance for the installed gear, including the battery racks and generators. Not a broker quote.",
    quantity: 1,
    unitDollars: 3600,
    basis: "allowance",
  },
  {
    id: "admin",
    group: "labor",
    label: "Admin and bookkeeping",
    detail: "About four hours a month to pay bills and track spares. Updating the status note during an outage is the outage-week line.",
    quantity: 48,
    unitDollars: 100,
    basis: "allowance",
  },
  {
    id: "on-call",
    group: "labor",
    label: "On-call roster",
    detail: "Two local people, primary and backup, alternating weeks, so someone can reach the North Shore. $60 a day for the person carrying the phone, 365 days. That is availability, not the repair rate. They answer, start a generator, swap a battery, and call the backup if they cannot get there.",
    quantity: 365,
    unitDollars: 60,
    basis: "allowance",
  },
  {
    id: "outage-ops",
    group: "labor",
    label: "Outage operations",
    detail: "One week of active response in the year: two people, eight hours a day, 80 hours at the $185 bill rate. They check each site, run the generator if the array is down, swap a pack if one fails, and keep the cached status note current. A longer outage adds hours beyond this allowance.",
    quantity: 80,
    unitDollars: 185,
    basis: "allowance",
  },
  {
    id: "generator-fuel",
    group: "power",
    label: "Generator exercise fuel",
    detail: "A short monthly run at each site so the propane generator starts when the storm actually comes. Allowance for fuel, not a delivery contract.",
    quantity: 1,
    unitDollars: 900,
    basis: "allowance",
  },
  {
    id: "spares",
    group: "equipment",
    label: "Spares reserve",
    detail: "Annual set-aside toward a replacement radio, a battery, or a generator hose. The batteries themselves are warrantied for about 10 years.",
    quantity: 1,
    unitDollars: 2000,
    basis: "allowance",
  },
];

export const budgetGroups: { id: BudgetGroupId; label: string }[] = [
  { id: "equipment", label: "Radios, mesh, and compute" },
  { id: "power", label: "Solar, batteries, and generators" },
  { id: "freight", label: "Shipping to Kauaʻi" },
  { id: "survey", label: "Drone survey, lift, and permits" },
  { id: "labor", label: "Labor" },
];

export function lineTotal(line: BudgetLine): number {
  return line.quantity * line.unitDollars;
}

export function groupTotal(lines: BudgetLine[], group: BudgetGroupId): number {
  return lines.filter((line) => line.group === group).reduce((sum, line) => sum + lineTotal(line), 0);
}

const directCapital = budgetLines.reduce((sum, line) => sum + lineTotal(line), 0);
const materialsAndFreight =
  groupTotal(budgetLines, "equipment") +
  groupTotal(budgetLines, "power") +
  groupTotal(budgetLines, "freight") +
  groupTotal(budgetLines, "survey");

export const capitalOverhead = Math.round(directCapital * overheadRate);
export const capitalBeforeTax = directCapital + capitalOverhead;
export const capitalGet = Math.round(capitalBeforeTax * kauaiGetRate);
export const capitalContingency = Math.round(materialsAndFreight * materialsContingencyRate);
export const pilotCapital = capitalBeforeTax + capitalGet + capitalContingency;

const directOperating = operatingLines.reduce((sum, line) => sum + lineTotal(line), 0);
export const operatingGet = Math.round(directOperating * kauaiGetRate);
export const pilotOperating = directOperating + operatingGet;

export const capitalBreakdown = [
  ...budgetGroups.map((group) => ({
    id: group.id,
    label: group.label,
    amount: groupTotal(budgetLines, group.id),
  })),
  { id: "overhead", label: "Overhead and margin", amount: capitalOverhead },
  { id: "get", label: "Kauaʻi GET", amount: capitalGet },
  { id: "contingency", label: "Materials contingency", amount: capitalContingency },
];
