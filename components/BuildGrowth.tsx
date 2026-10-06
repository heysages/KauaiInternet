"use client";

import RolloutDiagram from "@/components/explainers/RolloutDiagram";
import { useGapFill } from "@/components/GapFillContext";
import { rolloutStages } from "@/data/resilienceMission";

export default function BuildGrowth() {
  const { showGapFill } = useGapFill();
  const stages = showGapFill
    ? rolloutStages
    : rolloutStages.filter((stage) => stage.id !== "gap-fill");

  return (
    <>
      <h3 className="font-semibold text-ocean-deep mb-1">How the build grows</h3>
      <p className="text-sm text-ocean-mid mb-4">
        {showGapFill
          ? "North Shore first. Then smaller solar nodes where those radios leave a hole. East side next. The rest of the island after that."
          : "North Shore first. East side next. The rest of the island after that."}
      </p>
      <div className="mb-8">
        <RolloutDiagram />
      </div>
      <ol className={`grid gap-3 ${showGapFill ? "sm:grid-cols-2" : "lg:grid-cols-3"}`}>
        {stages.map((stage, index) => (
          <li key={stage.id} className="rounded-2xl border border-sand-warm bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-2">
              Stage {index + 1}
            </p>
            <p className="font-semibold text-ocean-deep mb-2">{stage.title}</p>
            <p className="text-sm text-ocean-mid leading-relaxed">{stage.summary}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
