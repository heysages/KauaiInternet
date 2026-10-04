"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";

if (typeof window !== "undefined") {
  maplibregl.setWorkerUrl("/maplibre-gl-csp-worker.js");
}

import {
  expansionCoverageBounds,
  expansionHubs,
  expansionLinks,
  expansionServiceAreas,
  pilotCoverageBounds,
  pilotHubs,
  pilotLinks,
  pilotServiceAreas,
} from "@/data/proposedCoverage";
import { satelliteBasemapStyle } from "@/lib/mapBasemaps";

export default function ProposedCoverageMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [showLater, setShowLater] = useState(false);
  const [ready, setReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || mapRef.current) return;

    const map = new maplibregl.Map({
      container,
      style: satelliteBasemapStyle,
      bounds: pilotCoverageBounds,
      fitBoundsOptions: { padding: 36 },
      attributionControl: false,
      maxZoom: 15,
      minZoom: 9,
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right");
    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-left");
    map.on("error", () => setMapError("Map tiles failed to load. Try a refresh."));

    const resize = () => map.resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    map.on("load", () => {
      resize();
      map.addSource("pilot-areas", { type: "geojson", data: pilotServiceAreas });
      map.addLayer({
        id: "pilot-fill",
        type: "fill",
        source: "pilot-areas",
        paint: { "fill-color": "#3fa7b5", "fill-opacity": 0.38 },
      });
      map.addLayer({
        id: "pilot-line",
        type: "line",
        source: "pilot-areas",
        paint: { "line-color": "#e6e2d6", "line-width": 2 },
      });

      map.addSource("expansion-areas", { type: "geojson", data: expansionServiceAreas });
      map.addLayer({
        id: "expansion-fill",
        type: "fill",
        source: "expansion-areas",
        layout: { visibility: "none" },
        paint: { "fill-color": "#7db9a6", "fill-opacity": 0.28 },
      });
      map.addLayer({
        id: "expansion-line",
        type: "line",
        source: "expansion-areas",
        layout: { visibility: "none" },
        paint: { "line-color": "#e6e2d6", "line-width": 1.5, "line-dasharray": [2, 2] },
      });

      map.addSource("pilot-links", { type: "geojson", data: pilotLinks });
      map.addLayer({
        id: "pilot-links",
        type: "line",
        source: "pilot-links",
        paint: { "line-color": "#f4b942", "line-width": 3 },
      });

      map.addSource("expansion-links", { type: "geojson", data: expansionLinks });
      map.addLayer({
        id: "expansion-links",
        type: "line",
        source: "expansion-links",
        layout: { visibility: "none" },
        paint: {
          "line-color": "#f4b942",
          "line-width": 2,
          "line-dasharray": [1.5, 1.5],
        },
      });

      map.addSource("pilot-hubs", { type: "geojson", data: pilotHubs });
      map.addLayer({
        id: "pilot-hubs",
        type: "circle",
        source: "pilot-hubs",
        paint: {
          "circle-radius": 7,
          "circle-color": "#0d2b45",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      });
      map.addLayer({
        id: "pilot-labels",
        type: "symbol",
        source: "pilot-hubs",
        layout: {
          "text-field": ["get", "name"],
          "text-size": 13,
          "text-font": ["Open Sans Bold"],
          "text-offset": [0, 1.1],
          "text-anchor": "top",
        },
        paint: {
          "text-color": "#ffffff",
          "text-halo-color": "#0d2b45",
          "text-halo-width": 1.2,
        },
      });

      map.addSource("expansion-hubs", { type: "geojson", data: expansionHubs });
      map.addLayer({
        id: "expansion-hubs",
        type: "circle",
        source: "expansion-hubs",
        layout: { visibility: "none" },
        paint: {
          "circle-radius": 6,
          "circle-color": "#1a4a5c",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      });
      map.addLayer({
        id: "expansion-labels",
        type: "symbol",
        source: "expansion-hubs",
        layout: {
          visibility: "none",
          "text-field": ["get", "name"],
          "text-size": 12,
          "text-font": ["Open Sans Bold"],
          "text-offset": [0, 1.1],
          "text-anchor": "top",
        },
        paint: {
          "text-color": "#ffffff",
          "text-halo-color": "#0d2b45",
          "text-halo-width": 1.2,
        },
      });

      setReady(true);
    });

    mapRef.current = map;
    return () => {
      observer.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    const visibility = showLater ? "visible" : "none";
    for (const id of ["expansion-fill", "expansion-line", "expansion-links", "expansion-hubs", "expansion-labels"]) {
      map.setLayoutProperty(id, "visibility", visibility);
    }
    map.fitBounds(showLater ? expansionCoverageBounds : pilotCoverageBounds, {
      padding: 36,
      duration: 700,
    });
  }, [showLater, ready]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <button
          type="button"
          onClick={() => setShowLater(false)}
          className={`rounded-full px-3 py-1.5 text-sm font-medium ${
            showLater ? "bg-sand-light text-ocean-mid" : "bg-ocean-deep text-white"
          }`}
        >
          North Shore pilot
        </button>
        <button
          type="button"
          onClick={() => setShowLater(true)}
          className={`rounded-full px-3 py-1.5 text-sm font-medium ${
            showLater ? "bg-ocean-deep text-white" : "bg-sand-light text-ocean-mid"
          }`}
        >
          Include later expansion
        </button>
      </div>
      <div className="relative">
        <div
          ref={containerRef}
          className="h-[420px] sm:h-[520px] rounded-2xl overflow-hidden border border-sand-warm"
        />
        {mapError && (
          <p className="absolute inset-x-0 top-3 mx-auto w-fit rounded-full bg-white/90 px-3 py-1 text-xs text-ocean-deep">
            {mapError}
          </p>
        )}
        <ul className="absolute left-3 bottom-3 max-w-[240px] space-y-1.5 rounded-xl bg-ocean-deep/90 px-3 py-2 text-xs text-white pointer-events-none">
          <li className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-brand-teal/80" />
            Community a pilot hub is meant to serve
          </li>
          <li className="flex items-center gap-2">
            <span className="h-0.5 w-4 bg-[#f4b942]" />
            Proposed link between hubs
          </li>
          <li className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border-2 border-white bg-ocean-deep" />
            Proposed hub, site not surveyed
          </li>
          {showLater && (
            <li className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm border border-dashed border-white bg-brand-sage/70" />
              Later: Anahola and Kapaʻa
            </li>
          )}
        </ul>
      </div>
      <p className="text-xs text-ocean-mid mt-3 max-w-3xl leading-relaxed">
        Shaded areas are the towns the plan is built for. The line between them is a
        point-to-point backbone, not a blanket of signal. Handheld mesh is meant to work
        near a hub and between people who carry a radio. This is not a measured coverage
        prediction, and no site is permitted yet.
      </p>
    </div>
  );
}
