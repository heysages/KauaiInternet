import ScoreGauge from "@/components/ScoreGauge";
import {
  currentVisionScores,
  futureVisionScores,
  visionScoreLabels,
} from "@/data/visionScores";
import { interpolateVisionScores } from "@/lib/visionScores";
import type { VisionScoreSet } from "@/types/network";

type VisionInsightPanelProps = {
  futureProgress: number;
};

function ComparisonRow({
  label,
  current,
  future,
  active,
}: {
  label: string;
  current: number;
  future: number;
  active: number;
}) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/8 px-3 py-2.5">
      <div className="flex items-center justify-between gap-2 mb-2">
        <p className="text-xs font-medium text-white">{label}</p>
        <p className="text-sm font-semibold text-amber-glow tabular-nums">{active}</p>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-amber-emergency transition-all duration-300"
          style={{ width: `${active}%` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-mist/60 mt-1.5 tabular-nums">
        <span>Today: {current}</span>
        <span>Future: {future}</span>
      </div>
    </div>
  );
}

export default function VisionInsightPanel({ futureProgress }: VisionInsightPanelProps) {
  const activeScores = interpolateVisionScores(futureProgress);
  const keys = Object.keys(visionScoreLabels) as (keyof VisionScoreSet)[];

  return (
    <div className="platform-panel h-full flex flex-col overflow-hidden">
      <div className="shrink-0 px-5 pt-5 pb-4 border-b border-white/10">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-glow mb-1">
          Current vs Future
        </p>
        <h2 className="heading-display text-lg font-semibold text-white">
          Island resilience outlook
        </h2>
        <p className="text-xs text-mist/75 mt-1 leading-relaxed">
          Simulated scores based on candidate site coverage — not official metrics.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          {keys.map((key) => (
            <ScoreGauge
              key={key}
              label={visionScoreLabels[key]}
              value={activeScores[key]}
              compareValue={currentVisionScores[key]}
              size="sm"
            />
          ))}
        </div>

        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-wider text-amber-glow mb-3">
            Score comparison
          </h3>
          <div className="space-y-2">
            {keys.map((key) => (
              <ComparisonRow
                key={key}
                label={visionScoreLabels[key]}
                current={currentVisionScores[key]}
                future={futureVisionScores[key]}
                active={activeScores[key]}
              />
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-amber-emergency/10 border border-amber-emergency/25 px-4 py-3">
          <p className="text-xs text-white leading-relaxed">
            At <strong>{futureProgress}%</strong> of the future network vision, Kauai moves from
            fragile single-path dependence toward distributed anchors, redundant uplinks, and
            community-owned edge capacity.
          </p>
        </div>
      </div>
    </div>
  );
}
