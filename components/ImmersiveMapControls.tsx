"use client";

import type { MapViewMode } from "@/types/mapView";

type ImmersiveMapControlsProps = {
  viewMode: MapViewMode;
  fullscreen: boolean;
  sceneOrbit: boolean;
  onFullscreenChange: (next: boolean) => void;
  onSceneOrbitChange: (next: boolean) => void;
};

export default function ImmersiveMapControls({
  viewMode,
  fullscreen,
  sceneOrbit,
  onFullscreenChange,
  onSceneOrbitChange,
}: ImmersiveMapControlsProps) {
  const immersive = viewMode !== "community";

  if (!immersive) {
    return (
      <div className="pointer-events-auto">
        <button
          type="button"
          onClick={() => onFullscreenChange(true)}
          className="map-immersive-btn"
          title="Expand map"
          aria-label="Enter fullscreen map"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="pointer-events-auto flex items-center gap-1.5">
      {viewMode === "scene" && (
        <button
          type="button"
          onClick={() => onSceneOrbitChange(!sceneOrbit)}
          className={`map-immersive-btn ${sceneOrbit ? "map-immersive-btn--active" : ""}`}
          title="Orbit camera around your address"
          aria-label={sceneOrbit ? "Stop orbit" : "Start orbit"}
          aria-pressed={sceneOrbit}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="hidden sm:inline text-[10px] font-semibold">
            {sceneOrbit ? "Orbiting" : "Orbit"}
          </span>
        </button>
      )}

      <button
        type="button"
        onClick={() => onFullscreenChange(!fullscreen)}
        className="map-immersive-btn"
        title={fullscreen ? "Exit fullscreen" : "Fullscreen immersive view"}
        aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      >
        {fullscreen ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9H5v4m0-4l5 5m5-5h4v4m-4 0l5-5M9 15H5v-4m0 4l5-5m5 5h4v-4m-4 0l-5 5" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        )}
      </button>
    </div>
  );
}
