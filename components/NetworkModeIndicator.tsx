"use client";

import { islandModeStates } from "@/data/islandModeServices";
import { useNetworkMode } from "@/components/NetworkModeContext";
import type { NetworkMode } from "@/types/network";

export default function NetworkModeIndicator({ compact = false }: { compact?: boolean }) {
  const { mode, setMode, demoEnabled } = useNetworkMode();
  const state = islandModeStates.find((s) => s.mode === mode)!;

  if (!demoEnabled) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
        <p className="text-xs uppercase tracking-widest text-mist mb-1">Network mode</p>
        <p className="text-sm text-white font-medium">{state.label}</p>
        <p className="text-xs text-mist mt-1">{state.description}</p>
      </div>
    );
  }

  return (
    <div className={compact ? "space-y-2" : "space-y-3"}>
      <div className="flex flex-wrap gap-2">
        {islandModeStates.map((s) => (
          <button
            key={s.mode}
            type="button"
            onClick={() => setMode(s.mode as NetworkMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              mode === s.mode
                ? "bg-amber-emergency/20 border-amber-emergency text-white"
                : "bg-white/5 border-white/10 text-mist hover:text-white"
            }`}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
        <p className="text-sm font-semibold text-white">{state.headline}</p>
        {"subline" in state && state.subline && (
          <p className="text-sm text-emerald-300 mt-0.5">{state.subline}</p>
        )}
        {!compact && <p className="text-xs text-mist mt-2">{state.description}</p>}
      </div>
    </div>
  );
}
