"use client";

import { useMemo, useState } from "react";
import { demoRoute, findAlternatePath, getNodeLabel } from "@/lib/networkTopology";
import OperationalStatusBadge from "@/components/OperationalStatusBadge";

export default function RouteSimulationPanel() {
  const [failureActive, setFailureActive] = useState(false);
  const failure = demoRoute.failureScenario;

  const path = useMemo(() => {
    if (!failureActive) return demoRoute.normalPath;
    return (
      findAlternatePath(demoRoute.fromNodeId, demoRoute.toNodeId, [
        `link-pilot-princeville-kilauea`,
        `link-pilot-kilauea-anahola`,
      ]) ?? []
    );
  }, [failureActive]);

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <p className="text-sm font-semibold text-white">Route visualization</p>
        <OperationalStatusBadge status="simulated" />
      </div>
      <p className="text-xs text-mist mb-4">
        {demoRoute.from} → {demoRoute.to} — educational simulation only, not live routing.
      </p>
      <label className="flex items-center gap-2 text-sm text-mist mb-4 cursor-pointer">
        <input
          type="checkbox"
          checked={failureActive}
          onChange={(e) => setFailureActive(e.target.checked)}
          className="rounded"
        />
        Simulate: {failure.label}
      </label>
      <div className="flex flex-wrap items-center gap-2">
        {(path.length > 0 ? path : demoRoute.normalPath).map((nodeId, i, arr) => (
          <span key={`${nodeId}-${i}`} className="flex items-center gap-2">
            <span className="px-2 py-1 rounded-md bg-ocean-deep/80 text-xs text-sand-warm border border-white/10">
              {getNodeLabel(nodeId).replace(/ Planning Node| Candidate/g, "")}
            </span>
            {i < arr.length - 1 && <span className="text-mist">→</span>}
          </span>
        ))}
      </div>
      {failureActive && path.length === 0 && (
        <p className="text-xs text-amber-glow mt-3">
          No alternate path found in planning graph — real deployment would need redundant routes.
        </p>
      )}
    </div>
  );
}
