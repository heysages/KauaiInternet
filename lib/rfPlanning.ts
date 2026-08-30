export type RfPathInput = {
  fromLat: number;
  fromLng: number;
  toLat: number;
  toLng: number;
  frequencyMhz?: number;
  antennaHeightM?: number;
  txPowerDbm?: number;
  antennaGainDbi?: number;
};

export type RfPathResult = {
  available: false;
  reason: string;
  distanceKm?: number;
};

export type LinkBudgetResult = {
  available: false;
  reason: string;
};

/** Stub — no propagation engine yet */
export function estimateLinkBudget(_input: RfPathInput): LinkBudgetResult {
  return {
    available: false,
    reason: "No propagation engine — RF modeling is planned for a future phase.",
  };
}

/** Stub — no LOS/DEM analysis yet */
export function analyzeLineOfSight(_input: RfPathInput): RfPathResult {
  const dLat = _input.toLat - _input.fromLat;
  const dLng = _input.toLng - _input.fromLng;
  const distanceKm = Math.sqrt(dLat * dLat + dLng * dLng) * 111;

  return {
    available: false,
    reason: "Line-of-sight analysis requires terrain elevation data — not yet integrated.",
    distanceKm: Math.round(distanceKm * 10) / 10,
  };
}

export const rfPlanningLabels = {
  title: "RF Path Planning",
  status: "planned" as const,
  fields: [
    "Line of sight",
    "Fresnel zones",
    "Elevation profile",
    "Distance",
    "Antenna height",
    "Frequency",
    "Transmit power",
    "Antenna gain",
    "Receiver sensitivity",
    "Estimated link budget",
    "Terrain obstruction",
  ],
};
