import type { NetworkStatusSnapshot, NetworkMode } from "@/types/network";

const DEMO_SNAPSHOT: NetworkStatusSnapshot = {
  mode: "global",
  dataSource: "simulated",
  updatedAt: null,
  components: [
    { label: "Internet gateways", online: 0, total: 0, status: "proposed", detail: "No gateways deployed" },
    { label: "Backbone nodes", online: 0, total: 0, status: "proposed", detail: "Planning phase" },
    { label: "LoRa relays", online: 0, total: 0, status: "proposed", detail: "North Shore pilot pending" },
  ],
  localNetworkStatus: "proposed",
  internetStatus: "proposed",
  emergencyMessagingStatus: "proposed",
};

const DEMO_SNAPSHOT_MOCK: NetworkStatusSnapshot = {
  mode: "island",
  dataSource: "simulated",
  updatedAt: new Date().toISOString(),
  components: [
    { label: "Internet gateways", online: 3, total: 5, status: "simulated", detail: "Demonstration data" },
    { label: "Backbone nodes", online: 7, total: 9, status: "simulated", detail: "Demonstration data" },
    { label: "LoRa relays", online: 16, total: 18, status: "simulated", detail: "Demonstration data" },
  ],
  localNetworkStatus: "simulated",
  internetStatus: "simulated",
  emergencyMessagingStatus: "simulated",
};

export function getNetworkStatusSnapshot(useMock = false): NetworkStatusSnapshot {
  const telemetryEnv = process.env.NEXT_PUBLIC_NETWORK_TELEMETRY;
  if (telemetryEnv === "live") {
    // Future: fetch from telemetry API
    return { ...DEMO_SNAPSHOT, dataSource: "unavailable", updatedAt: new Date().toISOString() };
  }
  if (telemetryEnv === "mock" || useMock) {
    return DEMO_SNAPSHOT_MOCK;
  }
  return DEMO_SNAPSHOT;
}

export function getNetworkModeLabel(mode: NetworkMode): string {
  switch (mode) {
    case "global":
      return "Global Mode";
    case "island":
      return "Island Mode";
    case "emergencyMesh":
      return "Emergency Mesh Mode";
  }
}

export function isDemoTelemetry(): boolean {
  return (
    process.env.NEXT_PUBLIC_NETWORK_TELEMETRY === "mock" ||
    process.env.NEXT_PUBLIC_NETWORK_TELEMETRY !== "live"
  );
}
