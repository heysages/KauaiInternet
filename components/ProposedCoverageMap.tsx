"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";

if (typeof window !== "undefined") {
  maplibregl.setWorkerUrl("/maplibre-gl-csp-worker.js");
}

import {
  expansionHubs,
  expansionLinks,
  expansionServiceAreas,
  islandCoverageBounds,
  islandHubs,
  islandLinks,
  islandServiceAreas,
  pilotCoverageBounds,
  pilotHubs,
  pilotLinks,
  pilotServiceAreas,
} from "@/data/proposedCoverage";
import { ReadingText } from "@/components/ReadingMode";
import { satelliteBasemapStyle } from "@/lib/mapBasemaps";

const laterLayerIds = [
  "expansion-fill",
  "expansion-line",
  "expansion-links",
  "expansion-hubs",
  "expansion-labels",
  "island-fill",
  "island-line",
  "island-links",
  "island-hubs",
  "island-labels",
];

type ProposedCoverageMapProps = {
  showIsland: boolean;
  onShowIslandChange: (show: boolean) => void;
};

export default function ProposedCoverageMap({
  showIsland,
  onShowIslandChange,
}: ProposedCoverageMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
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
      minZoom: 8,
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
        paint: { "fill-color": "#e6c07b", "fill-opacity": 0.34 },
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

      map.addSource("island-areas", { type: "geojson", data: islandServiceAreas });
      map.addLayer({
        id: "island-fill",
        type: "fill",
        source: "island-areas",
        layout: { visibility: "none" },
        paint: { "fill-color": "#e6c07b", "fill-opacity": 0.34 },
      });
      map.addLayer({
        id: "island-line",
        type: "line",
        source: "island-areas",
        layout: { visibility: "none" },
        paint: { "line-color": "#e6e2d6", "line-width": 1.5, "line-dasharray": [2, 2] },
      });
      map.addSource("island-links", { type: "geojson", data: islandLinks });
      map.addLayer({
        id: "island-links",
        type: "line",
        source: "island-links",
        layout: { visibility: "none" },
        paint: { "line-color": "#f4b942", "line-width": 2, "line-dasharray": [1.5, 1.5] },
      });
      map.addSource("island-hubs", { type: "geojson", data: islandHubs });
      map.addLayer({
        id: "island-hubs",
        type: "circle",
        source: "island-hubs",
        layout: { visibility: "none" },
        paint: {
          "circle-radius": 6,
          "circle-color": "#1a4a5c",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      });
      map.addLayer({
        id: "island-labels",
        type: "symbol",
        source: "island-hubs",
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
    const visibility = showIsland ? "visible" : "none";
    for (const id of laterLayerIds) {
      if (map.getLayer(id)) map.setLayoutProperty(id, "visibility", visibility);
    }
    map.fitBounds(showIsland ? islandCoverageBounds : pilotCoverageBounds, {
      padding: 36,
      duration: 700,
    });
  }, [showIsland, ready]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <p className="text-sm text-ocean-mid">
          {showIsland ? (
            "Towns where people live, around the island"
          ) : (
            <ReadingText technical="North Shore pilot only" plain="North Shore first" />
          )}
        </p>
        <button
          type="button"
          role="switch"
          aria-checked={showIsland}
          onClick={() => onShowIslandChange(!showIsland)}
          className="inline-flex items-center gap-3 rounded-full border border-sand-warm bg-white px-3 py-2 text-sm font-medium text-ocean-deep"
        >
          <span>Whole island</span>
          <span
            className={`relative h-6 w-11 rounded-full transition-colors ${
              showIsland ? "bg-ocean-deep" : "bg-sand-warm"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                showIsland ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </span>
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
            <ReadingText
              technical="Community a pilot hub is meant to serve"
              plain="Town this first build would serve"
            />
          </li>
          <li className="flex items-center gap-2">
            <span className="h-0.5 w-4 bg-[#f4b942]" />
            <ReadingText
              technical="Proposed link between hubs"
              plain="Link from one community site to the next"
            />
          </li>
          <li className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border-2 border-white bg-ocean-deep" />
            <ReadingText
              technical="Proposed hub, site not surveyed"
              plain="Community site, location not chosen yet"
            />
          </li>
          {showIsland && (
            <li className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm bg-[#e6c07b]/90" />
              Other towns where people live
            </li>
          )}
        </ul>
      </div>
      <p className="text-xs text-ocean-mid mt-3 max-w-3xl leading-relaxed">
        {showIsland ? (
          <ReadingText
            technical="Gold areas are the other towns where people live: the east side, Līhuʻe, the south shore, and the west end. The mountains, Nāpali, and the canyon interior are left unshaded. The cost on this page includes these towns while Whole island is on."
            plain="Gold areas are the other towns where people live: the east side, Līhuʻe, the south shore, and the west end. The mountains are left blank on purpose. The price on this page includes these towns while Whole island is on."
          />
        ) : (
          "Shaded areas are the towns the first build is for. Turn on Whole island to see the same pattern in the other places people live."
        )}{" "}
        <ReadingText
          technical="The line between hubs is point-to-point, not a blanket of signal. This is not a measured coverage prediction, and no site is permitted yet."
          plain="The line is the link from one community site to the next, not a blanket of phone signal. The color is the town, not a measured coverage map, and no site has a permit yet."
        />
      </p>
    </div>
  );
}
