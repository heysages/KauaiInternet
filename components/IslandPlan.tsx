"use client";

import { useGapFill } from "@/components/GapFillContext";
import IslandLivingSections from "@/components/IslandLivingSections";
import ProposedCoverageMap from "@/components/ProposedCoverageMap";

export default function IslandPlan() {
  const { showIsland, setShowIsland } = useGapFill();

  return (
    <div>
      <ProposedCoverageMap showIsland={showIsland} onShowIslandChange={setShowIsland} />
      {showIsland ? (
        <IslandLivingSections />
      ) : (
        <p className="text-sm text-ocean-mid mt-6 max-w-3xl leading-relaxed">
          The first build is four North Shore towns. The same idea follows the coast through
          the east side, Līhuʻe, the south shore, and the west end. Turn on Whole island to
          read that part of the plan.
        </p>
      )}
    </div>
  );
}
