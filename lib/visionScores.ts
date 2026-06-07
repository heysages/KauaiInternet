import {
  currentVisionScores,
  futureVisionScores,
} from "@/data/visionScores";
import type { VisionScoreSet } from "@/types/network";

export function interpolateVisionScores(progress: number): VisionScoreSet {
  const t = Math.max(0, Math.min(100, progress)) / 100;
  const keys = Object.keys(currentVisionScores) as (keyof VisionScoreSet)[];
  const result = {} as VisionScoreSet;
  for (const key of keys) {
    result[key] = Math.round(
      currentVisionScores[key] + (futureVisionScores[key] - currentVisionScores[key]) * t
    );
  }
  return result;
}
