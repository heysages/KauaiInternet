import type { EquipmentItem, InventoryStats, NetworkAssetCategory } from "@/types/network";
import { categoryById, networkAssetCategories } from "@/data/categories";
import { useCaseById } from "@/data/useCases";

export const equipmentItems: EquipmentItem[] = [
  // Routing & switching
  { id: "copper-switch-rb5009", name: "Copper Switch RB5009", category: "routing-switching", quantity: 13, disposition: "available", useCaseIds: ["pilot-core-switching"], manufacturer: "MikroTik" },
  { id: "mikrotik-outdoor-copper", name: "MikroTik Outdoor Copper Switches (Used)", category: "routing-switching", quantity: 20, disposition: "available", useCaseIds: ["pilot-core-switching"], manufacturer: "MikroTik" },
  { id: "mikrotik-network-switch", name: "MikroTik Network Switch", category: "routing-switching", quantity: 9, disposition: "available", useCaseIds: ["pilot-core-switching"], manufacturer: "MikroTik" },
  { id: "mikrotik-router", name: "MikroTik Router", category: "routing-switching", quantity: 4, disposition: "available", useCaseIds: ["pilot-core-switching"], manufacturer: "MikroTik" },
  { id: "mikrotik-cloud-switch", name: "MikroTik Cloud Switch", category: "routing-switching", quantity: 9, disposition: "available", useCaseIds: ["pilot-core-switching"], manufacturer: "MikroTik" },
  { id: "mikrotik-cloud-switch-router", name: "MikroTik Cloud Switch Router", category: "routing-switching", quantity: 2, disposition: "available", useCaseIds: ["pilot-core-switching"], manufacturer: "MikroTik" },
  { id: "edge-router", name: "Edge Router", category: "routing-switching", quantity: 3, disposition: "available", useCaseIds: ["pilot-core-switching"] },
  { id: "mikrotik-sfp-switch", name: "MikroTik SFP Switch", category: "routing-switching", quantity: 3, disposition: "available", useCaseIds: ["pilot-core-switching"], manufacturer: "MikroTik" },
  { id: "usw-pro-max", name: "USW Pro Max", category: "routing-switching", quantity: 4, disposition: "available", useCaseIds: ["pilot-core-switching"], manufacturer: "Ubiquiti" },
  { id: "ubnt-pro-max-poe", name: "Ubiquiti Pro Max PoE Switch", category: "routing-switching", quantity: 2, disposition: "available", useCaseIds: ["pilot-core-switching"], manufacturer: "Ubiquiti" },
  { id: "cisco-9300-nexus", name: "Cisco 9300 Nexus", category: "routing-switching", quantity: 2, disposition: "available", useCaseIds: ["pilot-core-switching"], manufacturer: "Cisco" },
  { id: "nano-switch", name: "Nano Switch", category: "routing-switching", quantity: 9, disposition: "available", useCaseIds: ["pilot-core-switching"], manufacturer: "Ubiquiti" },

  // Wireless backhaul
  { id: "nanobeam-5ac", name: "NanoBeam 5AC", category: "wireless-backhaul", quantity: 85, disposition: "available", useCaseIds: ["ridge-backhaul-link"], manufacturer: "Ubiquiti", notes: "Largest backhaul stock — ideal for pilot ridge links after LOS survey." },
  { id: "airfiber-60xr", name: "AirFiber 60XR UISP", category: "wireless-backhaul", quantity: 2, disposition: "available", useCaseIds: ["ridge-backhaul-link"], manufacturer: "Ubiquiti" },
  { id: "tachyon-tna-302", name: "Tachyon TNA 302", category: "wireless-backhaul", quantity: 2, disposition: "available", useCaseIds: ["ridge-backhaul-link"], manufacturer: "Tachyon" },

  // Access points / radios
  { id: "baicell-nova-430i", name: "Baicell Nova 430i", category: "access-points-radios", quantity: 12, disposition: "available", useCaseIds: ["fixed-wireless-access", "community-wifi-zone"], manufacturer: "Baicell" },
  { id: "baicell-window-units", name: "Window Units Baicell", category: "access-points-radios", quantity: 18, disposition: "available", useCaseIds: ["fixed-wireless-access"], manufacturer: "Baicell" },
  { id: "rocket-5ac-ap", name: "Rocket 5AC AP", category: "access-points-radios", quantity: 7, disposition: "available", useCaseIds: ["community-wifi-zone", "ridge-backhaul-link"], manufacturer: "Ubiquiti" },
  { id: "baicell-nr-11", name: "Baicell NR 11", category: "access-points-radios", quantity: 7, disposition: "available", useCaseIds: ["fixed-wireless-access"], manufacturer: "Baicell" },
  { id: "wave-nano", name: "Wave Nano", category: "access-points-radios", quantity: 7, disposition: "available", useCaseIds: ["community-wifi-zone"] },
  { id: "wave-ap", name: "Wave AP", category: "access-points-radios", quantity: 14, disposition: "available", useCaseIds: ["community-wifi-zone"] },
  { id: "baicell-846", name: "Baicell 846", category: "access-points-radios", quantity: 2, disposition: "available", useCaseIds: ["fixed-wireless-access"], manufacturer: "Baicell" },

  // Antennas
  { id: "kpp-dual-band-antenna", name: "KPP Dual-Band 8-Port Antenna", category: "antennas", quantity: 41, disposition: "available", useCaseIds: ["relay-antenna-mount"] },
  { id: "netpoint-antenna", name: "NetPoint Antenna", category: "antennas", quantity: 4, disposition: "available", useCaseIds: ["relay-antenna-mount"] },
  { id: "j-mount", name: "J Mount", category: "antennas", quantity: 32, disposition: "available", useCaseIds: ["relay-antenna-mount"] },
  { id: "long-j-mount", name: "Long J Mount", category: "antennas", quantity: 9, disposition: "available", useCaseIds: ["relay-antenna-mount"] },

  // Power & rack infrastructure
  { id: "cat24-patch-panel", name: "CAT 24 Patch Panel", category: "power-rack", quantity: 12, disposition: "available", useCaseIds: ["sheltered-node-power", "pilot-core-switching"] },
  { id: "power-strip-rack", name: "Power Strip for Rack", category: "power-rack", quantity: 3, disposition: "available", useCaseIds: ["sheltered-node-power"] },
  { id: "ubnt-dual-power-injector", name: "Ubiquiti Dual Power Injector", category: "power-rack", quantity: 2, disposition: "available", useCaseIds: ["sheltered-node-power"], manufacturer: "Ubiquiti" },
  { id: "power-control", name: "Power Control", category: "power-rack", quantity: 5, disposition: "available", useCaseIds: ["sheltered-node-power"] },
  { id: "power-supply", name: "Power Supply", category: "power-rack", quantity: 2, disposition: "available", useCaseIds: ["sheltered-node-power"] },
  { id: "pdu", name: "PDU", category: "power-rack", quantity: 3, disposition: "available", useCaseIds: ["sheltered-node-power"] },
  { id: "cyberpower-ups", name: "CyberPower UPS", category: "power-rack", quantity: 2, disposition: "available", useCaseIds: ["sheltered-node-power"], manufacturer: "CyberPower" },

  // Edge compute
  { id: "micro-pc", name: "Micro PC", category: "edge-compute", quantity: 3, disposition: "available", useCaseIds: ["local-edge-services"] },
  { id: "dell-micro-pc", name: "Dell Micro PC", category: "edge-compute", quantity: 6, disposition: "available", useCaseIds: ["local-edge-services"], manufacturer: "Dell" },
  { id: "ipc", name: "IPC", category: "edge-compute", quantity: 5, disposition: "available", useCaseIds: ["local-edge-services"], notes: "Industrial PC for outdoor or edge cabinet deployments." },

  // Backup internet / Starlink
  { id: "starlink-setup", name: "Starlink Setup", category: "backup-internet", quantity: 2, disposition: "available", useCaseIds: ["satellite-failover"], manufacturer: "Starlink" },

  // Batteries / resilience power
  { id: "tower-site-batteries", name: "Tower Site Batteries", category: "batteries-resilience", quantity: 30, disposition: "available", useCaseIds: ["tower-outage-runtime"], notes: "For tower and ridge relay runtime — sizing per site still required." },
];

export function getInventoryStats(): InventoryStats {
  const categories = new Set(equipmentItems.map((i) => i.category));
  return {
    totalUnits: equipmentItems.reduce((sum, i) => sum + i.quantity, 0),
    uniqueSkus: equipmentItems.length,
    categoriesRepresented: categories.size,
    dispositionAvailable: equipmentItems
      .filter((i) => i.disposition === "available")
      .reduce((sum, i) => sum + i.quantity, 0),
  };
}

export type CategoryInventoryGroup = {
  category: NetworkAssetCategory;
  meta: (typeof categoryById)[NetworkAssetCategory];
  items: EquipmentItem[];
  totalUnits: number;
  useCases: ReturnType<typeof getUseCasesForCategory>;
};

export function getUseCasesForCategory(category: NetworkAssetCategory) {
  const ids = new Set(
    equipmentItems
      .filter((i) => i.category === category)
      .flatMap((i) => i.useCaseIds)
  );
  return [...ids].map((id) => useCaseById[id]).filter(Boolean);
}

export function getInventoryByCategory(): CategoryInventoryGroup[] {
  return networkAssetCategories.map((meta) => {
    const items = equipmentItems.filter((i) => i.category === meta.id);
    return {
      category: meta.id,
      meta,
      items,
      totalUnits: items.reduce((sum, i) => sum + i.quantity, 0),
      useCases: getUseCasesForCategory(meta.id),
    };
  });
}

/** @deprecated Use equipmentItems — kept for any lingering imports */
export const inventoryItems = equipmentItems;

export const inventoryStats = getInventoryStats();
