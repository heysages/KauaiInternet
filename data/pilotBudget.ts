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
    "Four town hubs (Hāʻena, Hanalei, Princeville, Kīlauea) plus one ridge relay, because the North Shore usually needs an extra hop. A survey can drop the relay. Each town hub gets one BLiNQ FW-300i phone radio, covering about 180° of that town. Smaller solar nodes for the pockets that face misses are a later phase and are not in this price. A Verizon, AT&T, or T-Mobile radio, and a radio on every house, are still later purchases.",
  technology:
    "Ubiquiti airFiber 5XHD on 5 GHz for the backbone, with 30 dBi dishes. It stays up in rain when a clean channel is available, and it is the radio a working fixed-wireless builder would still use for most links. Ubiquiti’s newer Wave MLO5 can bond more 5 GHz spectrum for multi-gigabit speed and also does not fade in rain, but this pilot does not need that speed and wide channels are harder to find. Phones do not join that backbone. Each town hub gets one BLiNQ FW-300i on Band 48, the shared CBRS band, covering about 180° of that town, so a phone that installs this network’s profile has LTE there. Town hubs get seven EG4 5.12 kWh batteries online so the phone radio stays inside 72 hours at its published maximum draw. The ridge relay stays at four. Every site keeps a hot spare, 3.2 kW of solar, and a propane generator. Starlink Mini is the off-island path at two hubs. Messages use current RAK WisMesh gateways.",
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
    detail: "One small PoE switch at each powered site. The phone radio runs on the 48 volt battery bus, not on this switch.",
    quantity: 5,
    unitDollars: 200,
    basis: "allowance",
  },
  {
    id: "phone-radios",
    group: "equipment",
    label: "BLiNQ FW-300i phone radios",
    detail:
      "One at each town hub, none at the ridge relay. BLiNQ’s shop lists the Band 48 model at $8,000, with the mount and a 48 volt jumper. It is one box with about 180° of coverage, so it faces the town instead of three separate sectors. BLiNQ lists up to 53 dBm EIRP per sector; a Category B grant is capped at 47 dBm per 10 MHz, and the grant sets the power. Maximum draw is 180 watts, off the 48 volt battery bus. The map still shades the town, not a measured contour. A phone uses this after it installs a profile. It stays a Band 48 network, not Verizon, AT&T, or T-Mobile.",
    quantity: 4,
    unitDollars: 8000,
    basis: "listed",
    sourceLabel: "BLiNQ shop, FW-300i Band 48",
    sourceHref: "https://shop.blinqnetworks.com/index.php/product/fw-300i-band-48-enodeb/",
  },
  {
    id: "spare-phone-radios",
    group: "equipment",
    label: "Spare phone radio",
    detail: "One spare FW-300i, so a failed town radio is a swap and not a mainland reorder.",
    quantity: 1,
    unitDollars: 8000,
    basis: "listed",
    sourceLabel: "BLiNQ shop, FW-300i Band 48",
    sourceHref: "https://shop.blinqnetworks.com/index.php/product/fw-300i-band-48-enodeb/",
  },
  {
    id: "embedded-epc",
    group: "equipment",
    label: "Embedded core licenses",
    detail:
      "BLiNQ’s embedded EPC license is $750 and runs inside one base station, so the town does not need a separate core server. Five licenses: four live radios and the spare.",
    quantity: 5,
    unitDollars: 750,
    basis: "listed",
    sourceLabel: "BLiNQ shop, embedded EPC license",
    sourceHref: "https://shop.blinqnetworks.com/index.php/product/embedded-epc-license/",
  },
  {
    id: "phone-profiles",
    group: "equipment",
    label: "First 100 phone profiles",
    detail:
      "SIM or eSIM cards so the first neighbors can join the Band 48 network. The core license is a separate line. No single catalog price covers the card pack. Allowance, not a carrier plan.",
    quantity: 1,
    unitDollars: 1500,
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
    detail:
      "Four online at the ridge relay, seven online at each town hub. Seven packs are 35.84 kWh nameplate, about 29 kWh usable at 80% depth of discharge. The phone radio’s published maximum is 180 watts, so a town hub is about 380 watts and about 27 kWh over 72 hours. That fits the seven-pack bank. The ridge relay stays near 200 watts and keeps four packs.",
    quantity: 32,
    unitDollars: 1471,
    basis: "listed",
    sourceLabel: "SanTan Solar, EG4 LifePower4 V2",
    sourceHref: "https://www.santansolar.com/product/eg4-lifepower-4-v2-lithium-battery-48v-100ah-ul-1973-ul-9540a/",
  },
  {
    id: "hot-swap-batteries",
    group: "power",
    label: "Hot-swap spare batteries",
    detail:
      "One extra 5.12 kWh pack at each site, stored charged. A weak online pack can be unbolted and this spare bolted in while the others keep the hub up. At a town hub, six packs remain until the spare is in, about 25 kWh usable. At the ridge relay, three remain, about 12 kWh.",
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
    detail:
      "One fused DC bus at the ridge relay, two at each town hub. Two distributors give eight fuse positions. Seven packs sit online, and the spare can take the eighth during a swap. Current Connected lists the M10 at $232.90.",
    quantity: 9,
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
    detail:
      "Rack space for the online batteries, including seven packs at each town hub, a shelf for the spare, eight-panel racking, generator inlet, propane cage, surge protection, conduit, and grounding. Per-site allowance, not a quote.",
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
    detail:
      "Electrical and solar permits for a 3.2 kW array and a generator at each site, the four phone-radio mounts, plus a coastal Special Management Area allowance where Hāʻena or Hanalei sites fall inside it.",
    quantity: 1,
    unitDollars: 10000,
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
    id: "phone-install",
    group: "labor",
    label: "Phone-radio install",
    detail:
      "64 hours at $185. Two people for one day at each town hub to mount the FW-300i, aim its 180° face at the town, land it on the 48 volt bus, and confirm a handset joins.",
    quantity: 64,
    unitDollars: 185,
    basis: "allowance",
  },
  {
    id: "cbrs-registration",
    group: "survey",
    label: "CBRS installer registration",
    detail:
      "A certified professional installer has to register each Category B radio with a spectrum system before it can transmit. Allowance for four radios. Not a vendor quote.",
    quantity: 1,
    unitDollars: 1600,
    basis: "allowance",
  },
  {
    id: "design-labor",
    group: "labor",
    label: "RF and electrical design",
    detail:
      "80 hours at $185 for the link budget, the Band 48 sector aim, the one-line with the generator inlet and hot-swap bus, and permit drawings.",
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
    id: "sas",
    group: "equipment",
    label: "Spectrum access system",
    detail:
      "Key Bridge Wireless lists $500 a month, and that base fee includes the first 200 radios. Four phone radios fit inside it. Google is not taking new SAS customers. The radios cannot legally transmit on Band 48 without a grant.",
    quantity: 12,
    unitDollars: 500,
    basis: "listed",
    sourceLabel: "Key Bridge Wireless, June 16, 2026",
    sourceHref: "https://keybridgewireless.com/codex/read/blog/press/reduced-pricing-and-seamless-migration-support",
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

/**
 * Eight pocket nodes the town radios do not face.
 * Listed lines use the same shops as the pilot. Allowances use the same rates.
 * A walk test can add or drop a site, so this is the illustrated eight, not a survey.
 */
export const gapFillCapitalLines: BudgetLine[] = [
  {
    id: "gap-radios",
    group: "equipment",
    label: "BLiNQ X-300i pocket radios",
    detail:
      "One at each of eight pockets: Keʻē, Wainiha, the Hanalei valley, the road off Princeville, Anini, Kalihiwai, Kīlauea point, and Moloaʻa. The shop lists the DC model at $4,000. About 270° and 33 dBm, 70 watts maximum, on the 48 volt bus. A walk test can add or drop a site.",
    quantity: 8,
    unitDollars: 4000,
    basis: "listed",
    sourceLabel: "BLiNQ shop, X-300i DC",
    sourceHref: "https://shop.blinqnetworks.com/index.php/product/x-300i-enodeb-dc/",
  },
  {
    id: "gap-spare-radio",
    group: "equipment",
    label: "Spare pocket radio",
    detail: "One spare X-300i, so a failed pocket radio is a swap and not a mainland reorder.",
    quantity: 1,
    unitDollars: 4000,
    basis: "listed",
    sourceLabel: "BLiNQ shop, X-300i DC",
    sourceHref: "https://shop.blinqnetworks.com/index.php/product/x-300i-enodeb-dc/",
  },
  {
    id: "gap-epc",
    group: "equipment",
    label: "Pocket core licenses",
    detail:
      "The same embedded EPC license as the town hubs, one per live pocket radio and one for the spare.",
    quantity: 9,
    unitDollars: 750,
    basis: "listed",
    sourceLabel: "BLiNQ shop, embedded EPC license",
    sourceHref: "https://shop.blinqnetworks.com/index.php/product/embedded-epc-license/",
  },
  {
    id: "gap-hop",
    group: "equipment",
    label: "LiteBeam hop radios",
    detail:
      "A pair for each pocket: one at the node and one at the nearest town hub. B&H lists the LiteBeam 5AC Gen2 at $71. The hop is how the pocket reaches the town. It is not a second phone signal.",
    quantity: 16,
    unitDollars: 71,
    basis: "listed",
    sourceLabel: "B&H, LiteBeam 5AC Gen2",
    sourceHref:
      "https://www.bhphotovideo.com/c/product/1348249-REG/ubiquiti_networks_lbe_5ac_gen2_us_litebeam_ac_gen2_airmax.html",
  },
  {
    id: "gap-hop-spare",
    group: "equipment",
    label: "Spare hop radios",
    detail: "Two spare LiteBeams for the pocket hops.",
    quantity: 2,
    unitDollars: 71,
    basis: "listed",
    sourceLabel: "B&H, LiteBeam 5AC Gen2",
    sourceHref:
      "https://www.bhphotovideo.com/c/product/1348249-REG/ubiquiti_networks_lbe_5ac_gen2_us_litebeam_ac_gen2_airmax.html",
  },
  {
    id: "gap-batteries",
    group: "power",
    label: "Pocket batteries",
    detail:
      "Two EG4 packs per pocket. One pack’s usable energy is short of 70 watts plus the hop for 72 hours. Two packs cover it. These nodes do not get a generator or a third spare pack.",
    quantity: 16,
    unitDollars: 1471,
    basis: "listed",
    sourceLabel: "SanTan Solar, EG4 LifePower4 V2",
    sourceHref:
      "https://www.santansolar.com/product/eg4-lifepower-4-v2-lithium-battery-48v-100ah-ul-1973-ul-9540a/",
  },
  {
    id: "gap-lynx",
    group: "power",
    label: "Pocket fuse buses",
    detail: "One Victron Lynx Distributor per pocket for the two packs. Same listed price as the town hubs.",
    quantity: 8,
    unitDollars: 233,
    basis: "listed",
    sourceLabel: "Current Connected, Lynx Distributor M10",
    sourceHref:
      "https://www.currentconnected.com/product/victron-lynx-distributor-power-distribution-system-m10",
  },
  {
    id: "gap-fuses",
    group: "power",
    label: "Pocket battery fuses",
    detail: "The Lynx ships without fuses. Same fuse-kit allowance as a pilot site.",
    quantity: 8,
    unitDollars: 125,
    basis: "allowance",
  },
  {
    id: "gap-mppt",
    group: "power",
    label: "Pocket charge controllers",
    detail:
      "The same 48-volt SmartSolar as the town hubs. Two panels do not use its full capacity. A 12- or 24-volt controller cannot charge this battery.",
    quantity: 8,
    unitDollars: 502,
    basis: "listed",
    sourceLabel: "EXPLORIST.life, SmartSolar MPPT 250/70",
    sourceHref: "https://shop.explorist.life/shop/all-products/victron-smartsolar-mppt-25070/",
  },
  {
    id: "gap-panels",
    group: "power",
    label: "Pocket solar modules",
    detail: "Two 400W modules per pocket, 800 watts. Same per-panel allowance as the town arrays.",
    quantity: 16,
    unitDollars: 210,
    basis: "allowance",
  },
  {
    id: "gap-dcdc",
    group: "power",
    label: "48-to-24 volt converters",
    detail:
      "The LiteBeam at the pocket runs on 24 volts. The town hub powers its own end. Allowance for a small isolated converter at each pocket. A US shop price for that converter is not locked.",
    quantity: 8,
    unitDollars: 75,
    basis: "allowance",
  },
  {
    id: "gap-mount",
    group: "equipment",
    label: "Pocket pole and enclosure",
    detail:
      "Pole, small enclosure, and DC jumper per pocket. Not the Sunflower kit, which adds an AC power supply these nodes do not use. Allowance, not a catalog bundle.",
    quantity: 8,
    unitDollars: 400,
    basis: "allowance",
  },
  {
    id: "gap-freight",
    group: "freight",
    label: "Freight for the pocket nodes",
    detail:
      "Extra ocean freight for 16 batteries and 16 panels on top of the pilot shipment. Allowance, not a carrier quote.",
    quantity: 1,
    unitDollars: 4000,
    basis: "allowance",
  },
  {
    id: "gap-permits",
    group: "survey",
    label: "Pocket permits",
    detail:
      "Electrical permit allowance per pocket. Not a county fee schedule. A walk test can drop a site before this is filed.",
    quantity: 8,
    unitDollars: 500,
    basis: "allowance",
  },
  {
    id: "gap-cbrs",
    group: "survey",
    label: "Pocket radio registration",
    detail:
      "Same $400 per Category B radio as the four town radios. Eight live pocket radios. The spare stays on the shelf.",
    quantity: 1,
    unitDollars: 3200,
    basis: "allowance",
  },
  {
    id: "gap-labor",
    group: "labor",
    label: "Pocket install",
    detail:
      "128 hours at $185. Two people for one day at each of eight pockets, the same bill rate as the town radio install.",
    quantity: 128,
    unitDollars: 185,
    basis: "allowance",
  },
  {
    id: "gap-walk",
    group: "labor",
    label: "Walk test",
    detail:
      "16 hours at $185. Two people for one day to walk the pockets and add or drop a site before the order is placed.",
    quantity: 16,
    unitDollars: 185,
    basis: "allowance",
  },
];

/**
 * Nine more town hubs on the coast where people live.
 * Anahola, Kapaʻa, Wailua, Līhuʻe, Kōloa (with Poʻipū), Kalaheo,
 * Hanapēpē (with ʻEleʻele), Waimea, and Kekaha.
 * Each one is a town hub, not a ridge relay: phone radio, seven batteries,
 * solar, generator, and a link to the next town. A survey can still add a
 * ridge relay where two towns cannot see each other. That relay is not priced.
 */
const laterTowns = 9;
const laterHops = 9;

export const islandCapitalLines: BudgetLine[] = [
  {
    id: "island-af",
    group: "equipment",
    label: "Backbone radios for the rest of the coast",
    detail:
      "Two airFiber 5XHD radios on each of nine new hops: Kīlauea to Anahola, Anahola to Kapaʻa, Kapaʻa to Wailua, Wailua to Līhuʻe, Līhuʻe to Kōloa, Kōloa to Kalaheo, Kalaheo to Hanapēpē, Hanapēpē to Waimea, and Waimea to Kekaha. Same listed radio as the North Shore.",
    quantity: laterHops * 2,
    unitDollars: 429,
    basis: "listed",
    sourceLabel: "Ubiquiti store, airFiber 5XHD",
    sourceHref: "https://store.ui.com/us/en/products/airfiber-5xhd-1",
  },
  {
    id: "island-spare-radios",
    group: "equipment",
    label: "Spare backbone radios",
    detail: "Four spare airFiber radios for the longer coast, so a failed hop is not a mainland reorder.",
    quantity: 4,
    unitDollars: 429,
    basis: "listed",
    sourceLabel: "Ubiquiti store, airFiber 5XHD",
    sourceHref: "https://store.ui.com/us/en/products/airfiber-5xhd-1",
  },
  {
    id: "island-dishes",
    group: "equipment",
    label: "Backbone dishes",
    detail: "One 30 dBi RocketDish per working radio. Spares do not get a dish until they are installed.",
    quantity: laterHops * 2,
    unitDollars: 183,
    basis: "listed",
    sourceLabel: "NewTech Industries, RD-5G30",
    sourceHref: "https://www.newtechindustries.com/ubiquiti-rd-5g30-5ghz-rocketdish-30dbi-2x2/",
  },
  {
    id: "island-mounts",
    group: "equipment",
    label: "Dish mount kits",
    detail: "Same airFiber mount allowance as the North Shore, one per working radio.",
    quantity: laterHops * 2,
    unitDollars: 99,
    basis: "allowance",
  },
  {
    id: "island-gateways",
    group: "equipment",
    label: "Mesh gateways",
    detail: "One WisMesh Ethernet gateway at each of the nine town sites. Same listed price as the pilot.",
    quantity: laterTowns,
    unitDollars: 115,
    basis: "listed",
    sourceLabel: "Rokland, WisMesh Ethernet gateway",
    sourceHref: "https://store.rokland.com/products/wismesh-ethernet-gateway",
  },
  {
    id: "island-mesh",
    group: "equipment",
    label: "Community mesh radios",
    detail: "Five handhelds at each town, the same allowance as the North Shore towns.",
    quantity: laterTowns * 5,
    unitDollars: 65,
    basis: "allowance",
  },
  {
    id: "island-routers",
    group: "equipment",
    label: "Site routers",
    detail: "One router at each town site. Same allowance as the pilot.",
    quantity: laterTowns,
    unitDollars: 250,
    basis: "allowance",
  },
  {
    id: "island-pcs",
    group: "equipment",
    label: "Hub computers",
    detail: "One fanless computer at each town, to hold the local status note.",
    quantity: laterTowns,
    unitDollars: 650,
    basis: "allowance",
  },
  {
    id: "island-poe",
    group: "equipment",
    label: "PoE switches",
    detail: "One small PoE switch at each town. The phone radio stays on the 48 volt battery bus.",
    quantity: laterTowns,
    unitDollars: 200,
    basis: "allowance",
  },
  {
    id: "island-phone",
    group: "equipment",
    label: "Town phone radios",
    detail:
      "One BLiNQ FW-300i at each of the nine towns, the same radio as Hāʻena, Hanalei, Princeville, and Kīlauea. Kōloa covers Poʻipū. Hanapēpē covers ʻEleʻele. About 180° of that town, on the 48 volt bus.",
    quantity: laterTowns,
    unitDollars: 8000,
    basis: "listed",
    sourceLabel: "BLiNQ shop, FW-300i Band 48",
    sourceHref: "https://shop.blinqnetworks.com/index.php/product/fw-300i-band-48-enodeb/",
  },
  {
    id: "island-spare-phone",
    group: "equipment",
    label: "Spare town phone radios",
    detail: "Two spare FW-300i radios, one kept for the east side and one for the west side.",
    quantity: 2,
    unitDollars: 8000,
    basis: "listed",
    sourceLabel: "BLiNQ shop, FW-300i Band 48",
    sourceHref: "https://shop.blinqnetworks.com/index.php/product/fw-300i-band-48-enodeb/",
  },
  {
    id: "island-epc",
    group: "equipment",
    label: "Town core licenses",
    detail: "One embedded EPC license per live town radio and one per spare. Same $750 license.",
    quantity: laterTowns + 2,
    unitDollars: 750,
    basis: "listed",
    sourceLabel: "BLiNQ shop, embedded EPC license",
    sourceHref: "https://shop.blinqnetworks.com/index.php/product/embedded-epc-license/",
  },
  {
    id: "island-profiles",
    group: "equipment",
    label: "Phone profiles for the other towns",
    detail: "Three more packs of 100 profiles, the same allowance as the North Shore’s first pack. Not a carrier plan.",
    quantity: 3,
    unitDollars: 1500,
    basis: "allowance",
  },
  {
    id: "island-starlink",
    group: "equipment",
    label: "Starlink Mini kits",
    detail: "Two more kits, at Līhuʻe and Waimea, so the east-side services and the west end each have a path off the island. Same listed Mini price.",
    quantity: 2,
    unitDollars: 199,
    basis: "listed",
    sourceLabel: "Starlink Mini",
    sourceHref: "https://starlink.com/cd/mini-product-us",
  },
  {
    id: "island-batteries",
    group: "power",
    label: "Town batteries",
    detail:
      "Seven EG4 packs at each town, the same bank the North Shore towns use so the phone radio stays inside 72 hours. No extra ridge relay is included. A survey can add one later if two towns cannot see each other.",
    quantity: laterTowns * 7,
    unitDollars: 1471,
    basis: "listed",
    sourceLabel: "SanTan Solar, EG4 LifePower4 V2",
    sourceHref: "https://www.santansolar.com/product/eg4-lifepower-4-v2-lithium-battery-48v-100ah-ul-1973-ul-9540a/",
  },
  {
    id: "island-hot-swap",
    group: "power",
    label: "Hot-swap spare batteries",
    detail: "One spare pack at each town, stored charged, same as the North Shore sites.",
    quantity: laterTowns,
    unitDollars: 1471,
    basis: "listed",
    sourceLabel: "SanTan Solar, EG4 LifePower4 V2",
    sourceHref: "https://www.santansolar.com/product/eg4-lifepower-4-v2-lithium-battery-48v-100ah-ul-1973-ul-9540a/",
  },
  {
    id: "island-lynx",
    group: "power",
    label: "Fuse buses",
    detail: "Two Lynx distributors per town, eight fuse positions, same as a North Shore town hub.",
    quantity: laterTowns * 2,
    unitDollars: 233,
    basis: "listed",
    sourceLabel: "Current Connected, Lynx Distributor M10",
    sourceHref: "https://www.currentconnected.com/product/victron-lynx-distributor-power-distribution-system-m10",
  },
  {
    id: "island-fuses",
    group: "power",
    label: "Battery fuses",
    detail: "Same fuse-kit allowance as a pilot site. The Lynx ships without fuses.",
    quantity: laterTowns,
    unitDollars: 125,
    basis: "allowance",
  },
  {
    id: "island-inverters",
    group: "power",
    label: "Inverter chargers",
    detail: "One MultiPlus-II 48/5000 per town. Same listed price as the North Shore.",
    quantity: laterTowns,
    unitDollars: 1459,
    basis: "listed",
    sourceLabel: "Current Connected, MultiPlus-II 48/5000 120V",
    sourceHref: "https://www.currentconnected.com/product/victron-48v-multiplus-2-5kva-120v-inverter-70a-charger-ul-1741",
  },
  {
    id: "island-mppt",
    group: "power",
    label: "Charge controllers",
    detail: "One SmartSolar MPPT 250/70 per town, for an eight-panel array. Same listed price.",
    quantity: laterTowns,
    unitDollars: 502,
    basis: "listed",
    sourceLabel: "EXPLORIST.life, SmartSolar MPPT 250/70",
    sourceHref: "https://shop.explorist.life/shop/all-products/victron-smartsolar-mppt-25070/",
  },
  {
    id: "island-panels",
    group: "power",
    label: "Solar modules",
    detail: "Eight 400W modules per town, 3.2 kW. Same per-panel allowance as the North Shore.",
    quantity: laterTowns * 8,
    unitDollars: 210,
    basis: "allowance",
  },
  {
    id: "island-generators",
    group: "power",
    label: "Propane generators",
    detail: "One Champion 201319 per town. The 72 hours are still the solar and the batteries. The generator is the refill after that.",
    quantity: laterTowns,
    unitDollars: 959,
    basis: "listed",
    sourceLabel: "SuperGen, Champion 201319",
    sourceHref: "https://www.supergenproducts.com/product/201319-4500w-champion-electric-start-dual-fuel-inverter-with-co-shield/",
  },
  {
    id: "island-propane",
    group: "power",
    label: "Propane cache",
    detail: "Four 20-pound tanks at each town, bought on island. Same allowance as a North Shore site.",
    quantity: laterTowns * 4,
    unitDollars: 85,
    basis: "allowance",
  },
  {
    id: "island-bos",
    group: "power",
    label: "Racks, racking, generator inlet",
    detail: "Same per-site allowance as a North Shore town hub: battery rack, eight-panel racking, generator inlet, propane cage, surge protection, conduit, and grounding.",
    quantity: laterTowns,
    unitDollars: 2400,
    basis: "allowance",
  },
  {
    id: "island-freight",
    group: "freight",
    label: "Freight for the other towns",
    detail: "The North Shore shipment is $18,000 for five sites, $3,600 a site. Nine more town hubs use that same per-site allowance. Not a carrier quote.",
    quantity: laterTowns,
    unitDollars: 3600,
    basis: "allowance",
  },
  {
    id: "island-drone",
    group: "survey",
    label: "Path survey",
    detail: "Nine days at the same $1,800 day rate, one day along each new hop, including a weather hold. The drone bought for the North Shore is reused.",
    quantity: laterHops,
    unitDollars: 1800,
    basis: "allowance",
  },
  {
    id: "island-lift",
    group: "survey",
    label: "Boom lifts",
    detail: "Two lift rentals, one for the east side and one for the west side. Same $3,000 allowance as the North Shore rental.",
    quantity: 2,
    unitDollars: 3000,
    basis: "allowance",
  },
  {
    id: "island-permits",
    group: "survey",
    label: "Permits",
    detail: "The North Shore permit allowance is $10,000 for five sites, $2,000 a site. Nine more towns use that same allowance. Not a county fee schedule.",
    quantity: laterTowns,
    unitDollars: 2000,
    basis: "allowance",
  },
  {
    id: "island-cbrs",
    group: "survey",
    label: "Phone-radio registration",
    detail: "Same $400 per Category B radio as the North Shore. Nine live town radios. The two spares stay on the shelf.",
    quantity: 1,
    unitDollars: laterTowns * 400,
    basis: "allowance",
  },
  {
    id: "island-labor",
    group: "labor",
    label: "Install and alignment",
    detail: "720 hours at $185. The North Shore prices five sites at 80 hours each. These nine towns use that same allowance: two people for five days, including the drive.",
    quantity: laterTowns * 80,
    unitDollars: 185,
    basis: "allowance",
  },
  {
    id: "island-phone-install",
    group: "labor",
    label: "Phone-radio install",
    detail: "144 hours at $185. Two people for one day at each town, the same allowance as a North Shore town radio.",
    quantity: laterTowns * 16,
    unitDollars: 185,
    basis: "allowance",
  },
  {
    id: "island-design",
    group: "labor",
    label: "RF and electrical design",
    detail: "120 hours at $185 for the nine new hops, the phone-radio aim in each town, and the permit drawings. The North Shore design block was 80 hours.",
    quantity: 120,
    unitDollars: 185,
    basis: "allowance",
  },
];

export const islandOperatingLines: BudgetLine[] = [
  {
    id: "island-starlink-service",
    group: "equipment",
    label: "Starlink service",
    detail: "The Līhuʻe and Waimea dishes on the same Roam 300GB plan, $80 a month each.",
    quantity: 24,
    unitDollars: 80,
    basis: "listed",
    sourceLabel: "Starlink service plans",
    sourceHref: "https://starlink.com/service-plans",
  },
  {
    id: "island-maintenance",
    group: "labor",
    label: "Maintenance labor",
    detail: "90 hours at $185, about ten hours a year at each of the nine towns. The North Shore quarterly block stays its own line.",
    quantity: 90,
    unitDollars: 185,
    basis: "allowance",
  },
  {
    id: "island-access",
    group: "overhead",
    label: "Site access",
    detail: "Same $200 a month assumption at each of the nine towns, if the roof or yard is not donated.",
    quantity: laterTowns * 12,
    unitDollars: 200,
    basis: "allowance",
  },
  {
    id: "island-insurance",
    group: "overhead",
    label: "Equipment insurance",
    detail: "The North Shore allowance is $3,600. This adds $6,500 for the nine town hubs. Not a broker quote.",
    quantity: 1,
    unitDollars: 6500,
    basis: "allowance",
  },
  {
    id: "island-admin",
    group: "labor",
    label: "Admin and bookkeeping",
    detail: "Another four hours a month, at the same $100 rate, once the coast is more than the North Shore.",
    quantity: 48,
    unitDollars: 100,
    basis: "allowance",
  },
  {
    id: "island-on-call",
    group: "labor",
    label: "Second on-call seat",
    detail: "Another person at $60 a day, so Līhuʻe and the west side are not waiting on a drive from the North Shore. The first seat stays the North Shore line.",
    quantity: 365,
    unitDollars: 60,
    basis: "allowance",
  },
  {
    id: "island-outage",
    group: "labor",
    label: "Outage operations",
    detail: "Another 80 hours at $185, one more week of two people, for the towns past Kīlauea. A longer outage still adds hours beyond this.",
    quantity: 80,
    unitDollars: 185,
    basis: "allowance",
  },
  {
    id: "island-fuel",
    group: "power",
    label: "Generator exercise fuel",
    detail: "The North Shore fuel allowance is $900 for five sites, $180 a site. Nine more towns use that same allowance.",
    quantity: laterTowns,
    unitDollars: 180,
    basis: "allowance",
  },
  {
    id: "island-spares",
    group: "equipment",
    label: "Spares reserve",
    detail: "Annual set-aside for the longer coast, on top of the North Shore reserve. Not a replacement schedule.",
    quantity: 1,
    unitDollars: 3000,
    basis: "allowance",
  },
];

export const gapFillOperatingLines: BudgetLine[] = [
  {
    id: "gap-access",
    group: "overhead",
    label: "Pocket site access",
    detail:
      "Same $200 a month assumption as the pilot sites, for eight pockets, if the pole or yard is not donated. Drop this line if hosts give the spot.",
    quantity: 96,
    unitDollars: 200,
    basis: "allowance",
  },
  {
    id: "gap-maintenance",
    group: "labor",
    label: "Pocket maintenance",
    detail:
      "32 hours at $185, about four hours a year at each pocket. The on-call roster and the outage week stay the pilot lines. They already cover this corridor. The spectrum fee does not go up: the $500 a month already includes the first 200 radios.",
    quantity: 32,
    unitDollars: 185,
    basis: "allowance",
  },
];

export function lineTotal(line: BudgetLine): number {
  return line.quantity * line.unitDollars;
}

export function groupTotal(lines: BudgetLine[], group: BudgetGroupId): number {
  return lines.filter((line) => line.group === group).reduce((sum, line) => sum + lineTotal(line), 0);
}

export type PricedBuild = {
  capitalLines: BudgetLine[];
  operatingLines: BudgetLine[];
  capital: number;
  operating: number;
  capitalOverhead: number;
  capitalGet: number;
  capitalContingency: number;
  operatingGet: number;
  capitalBreakdown: { id: string; label: string; amount: number }[];
};

export function priceBuild(capitalLines: BudgetLine[], yearlyLines: BudgetLine[]): PricedBuild {
  const directCapital = capitalLines.reduce((sum, line) => sum + lineTotal(line), 0);
  const materialsAndFreight =
    groupTotal(capitalLines, "equipment") +
    groupTotal(capitalLines, "power") +
    groupTotal(capitalLines, "freight") +
    groupTotal(capitalLines, "survey");
  const overhead = Math.round(directCapital * overheadRate);
  const beforeTax = directCapital + overhead;
  const get = Math.round(beforeTax * kauaiGetRate);
  const contingency = Math.round(materialsAndFreight * materialsContingencyRate);
  const directOperating = yearlyLines.reduce((sum, line) => sum + lineTotal(line), 0);
  const yearlyGet = Math.round(directOperating * kauaiGetRate);
  return {
    capitalLines,
    operatingLines: yearlyLines,
    capital: beforeTax + get + contingency,
    operating: directOperating + yearlyGet,
    capitalOverhead: overhead,
    capitalGet: get,
    capitalContingency: contingency,
    operatingGet: yearlyGet,
    capitalBreakdown: [
      ...budgetGroups.map((group) => ({
        id: group.id,
        label: group.label,
        amount: groupTotal(capitalLines, group.id),
      })),
      { id: "overhead", label: "Overhead and margin", amount: overhead },
      { id: "get", label: "Kauaʻi GET", amount: get },
      { id: "contingency", label: "Materials contingency", amount: contingency },
    ],
  };
}

const pilotQuote = priceBuild(budgetLines, operatingLines);
export const capitalOverhead = pilotQuote.capitalOverhead;
export const capitalGet = pilotQuote.capitalGet;
export const capitalContingency = pilotQuote.capitalContingency;
export const pilotCapital = pilotQuote.capital;
export const operatingGet = pilotQuote.operatingGet;
export const pilotOperating = pilotQuote.operating;
export const capitalBreakdown = pilotQuote.capitalBreakdown;

export type CostScenario = "before" | "after" | "fill";

export type CostSelection = {
  view: "before" | "after";
  gap: boolean;
  island: boolean;
};

const emptyQuote = priceBuild([], []);

export function quoteSelection(
  selection: CostSelection,
): PricedBuild & CostSelection & { name: string; plainName: string } {
  if (selection.view === "before") {
    return {
      view: "before",
      gap: false,
      island: false,
      name: "Before: nothing in this plan is built yet.",
      plainName: "Today: this plan is not built yet.",
      ...emptyQuote,
    };
  }

  const extras = [
    selection.gap ? "the eight pockets" : "",
    selection.island ? "nine more towns around the coast" : "",
  ].filter(Boolean);
  const plainExtras = [
    selection.gap ? "the gaps filled in" : "",
    selection.island ? "the rest of the coast" : "",
  ].filter(Boolean);

  return {
    view: "after",
    gap: selection.gap,
    island: selection.island,
    name: extras.length
      ? `After: the four North Shore towns, plus ${extras.join(" and ")}.`
      : "After: the four North Shore towns.",
    plainName: plainExtras.length
      ? `The four towns, plus ${plainExtras.join(" and ")}.`
      : "The four towns.",
    ...priceBuild(
      [
        ...budgetLines,
        ...(selection.gap ? gapFillCapitalLines : []),
        ...(selection.island ? islandCapitalLines : []),
      ],
      [
        ...operatingLines,
        ...(selection.gap ? gapFillOperatingLines : []),
        ...(selection.island ? islandOperatingLines : []),
      ],
    ),
  };
}

export function quoteFor(scenario: CostScenario) {
  if (scenario === "before") return quoteSelection({ view: "before", gap: false, island: false });
  if (scenario === "fill") return quoteSelection({ view: "after", gap: true, island: false });
  return quoteSelection({ view: "after", gap: false, island: false });
}
