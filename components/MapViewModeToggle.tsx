"use client";

import type { MapViewMode } from "@/types/mapView";

const MODES: {
  id: MapViewMode;
  label: string;
  hint: string;
}[] = [
  {
    id: "community",
    label: "Community",
    hint: "Island overview with regional layers",
  },
  {
    id: "live",
    label: "Live",
    hint: "Aerial view — zoom to rooftops & roads",
  },
  {
    id: "scene",
    label: "Scene",
    hint: "AR-style scene with connection layers",
  },
  {
    id: "street",
    label: "Ground",
    hint: "Street panorama + AR layers for infrastructure & proposals",
  },
];

type MapViewModeToggleProps = {
  value: MapViewMode;
  onChange: (mode: MapViewMode) => void;
  hasFocus: boolean;
  variant?: "dark" | "light";
};

export default function MapViewModeToggle({
  value,
  onChange,
  hasFocus,
  variant = "dark",
}: MapViewModeToggleProps) {
  const isDark = variant === "dark";

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`inline-flex flex-wrap rounded-xl p-1 gap-0.5 max-w-full ${
          isDark ? "bg-ocean-deep/80 backdrop-blur-md" : "bg-white/90 border border-ocean-mid/10"
        }`}
        role="tablist"
        aria-label="Map view mode"
      >
        {MODES.map((mode) => {
          const active = value === mode.id;
          const dimmed = !hasFocus && mode.id !== "community";
          return (
            <button
              key={mode.id}
              type="button"
              role="tab"
              aria-selected={active}
              disabled={dimmed}
              title={mode.hint}
              onClick={() => onChange(mode.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                active
                  ? isDark
                    ? "bg-amber-glow text-ocean-deep shadow-sm"
                    : "bg-ocean-deep text-white shadow-sm"
                  : isDark
                    ? "text-mist/80 hover:text-white"
                    : "text-ocean-mid hover:text-ocean-deep"
              } ${dimmed ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              {mode.label}
            </button>
          );
        })}
      </div>
      {value !== "street" && (
        <p className={`text-[10px] leading-relaxed ${isDark ? "text-mist/70" : "text-ocean-mid/70"}`}>
          {hasFocus
            ? MODES.find((m) => m.id === value)?.hint
            : "Search an address to unlock Live, Scene, and Ground views"}
        </p>
      )}
    </div>
  );
}
