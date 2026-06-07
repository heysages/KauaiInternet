import type { VisionScoreSet } from "@/types/network";

/** Simulated baseline scores — not survey data */
export const currentVisionScores: VisionScoreSet = {
  resilience: 34,
  communityImpact: 28,
  emergencyReadiness: 41,
  economicImpact: 36,
};

export const futureVisionScores: VisionScoreSet = {
  resilience: 82,
  communityImpact: 78,
  emergencyReadiness: 88,
  economicImpact: 74,
};

export const visionScoreLabels: Record<keyof VisionScoreSet, string> = {
  resilience: "Resilience Score",
  communityImpact: "Community Impact",
  emergencyReadiness: "Emergency Readiness",
  economicImpact: "Economic Impact",
};
