"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";

if (typeof window !== "undefined") {
  maplibregl.setWorkerUrl("/maplibre-gl-csp-worker.js");
}

import {
  phoneFillAreas,
  phoneFillNodes,
  phoneGapAreas,
  pilotCoverageBounds,
  pilotHubs,
  pilotServiceAreas,
} from "@/data/proposedCoverage";
import { useGapFill } from "@/components/GapFillContext";
import { gapFill } from "@/data/resilienceMission";
import { satelliteBasemapStyle } from "@/lib/mapBasemaps";

type PhoneView = "before" | "after";

export default function PhoneSignalMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [ready, setReady] = useState(false);
  const { showGapFill, setShowGapFill } = useGapFill();
  const [view, setView] = useState<PhoneView>("before");
  const showFill = showGapFill && view === "after";
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
      map.addSource("phone-gap", { type: "geojson", data: phoneGapAreas });
      map.addLayer({
        id: "phone-gap-fill",
        type: "fill",
        source: "phone-gap",
        paint: { "fill-color": "#c46b5a", "fill-opacity": 0.45 },
      });
      map.addLayer({
        id: "phone-gap-line",
        type: "line",
        source: "phone-gap",
        paint: { "line-color": "#f4e4df", "line-width": 2 },
      });

      map.addSource("phone-after", { type: "geojson", data: pilotServiceAreas });
      map.addLayer({
        id: "phone-after-fill",
        type: "fill",
        source: "phone-after",
        layout: { visibility: "none" },
        paint: { "fill-color": "#3fa7b5", "fill-opacity": 0.42 },
      });
      map.addLayer({
        id: "phone-after-line",
        type: "line",
        source: "phone-after",
        layout: { visibility: "none" },
        paint: { "line-color": "#e6e2d6", "line-width": 2 },
      });

      map.addSource("phone-fill-areas", { type: "geojson", data: phoneFillAreas });
      map.addLayer({
        id: "phone-fill-fill",
        type: "fill",
        source: "phone-fill-areas",
        layout: { visibility: "none" },
        paint: { "fill-color": "#e6c07b", "fill-opacity": 0.55 },
      });
      map.addLayer({
        id: "phone-fill-line",
        type: "line",
        source: "phone-fill-areas",
        layout: { visibility: "none" },
        paint: { "line-color": "#fff6df", "line-width": 1.5 },
      });
      map.addSource("phone-fill-nodes", { type: "geojson", data: phoneFillNodes });
      map.addLayer({
        id: "phone-fill-nodes",
        type: "circle",
        source: "phone-fill-nodes",
        layout: { visibility: "none" },
        paint: {
          "circle-radius": 5,
          "circle-color": "#f4b942",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      });
      map.addLayer({
        id: "phone-fill-labels",
        type: "symbol",
        source: "phone-fill-nodes",
        layout: {
          visibility: "none",
          "text-field": ["get", "name"],
          "text-size": 11,
          "text-font": ["Open Sans Bold"],
          "text-offset": [0, 1],
          "text-anchor": "top",
        },
        paint: {
          "text-color": "#ffffff",
          "text-halo-color": "#0d2b45",
          "text-halo-width": 1.2,
        },
      });

      map.addSource("phone-hubs", { type: "geojson", data: pilotHubs });
      map.addLayer({
        id: "phone-hubs",
        type: "circle",
        source: "phone-hubs",
        paint: {
          "circle-radius": 7,
          "circle-color": "#0d2b45",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      });
      map.addLayer({
        id: "phone-labels",
        type: "symbol",
        source: "phone-hubs",
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
    const showTowns = view === "after";
    const showBefore = view === "before";
    const setVisibility = (ids: string[], visible: boolean) => {
      const visibility = visible ? "visible" : "none";
      for (const id of ids) {
        if (map.getLayer(id)) map.setLayoutProperty(id, "visibility", visibility);
      }
    };
    setVisibility(["phone-after-fill", "phone-after-line"], showTowns);
    setVisibility(["phone-gap-fill", "phone-gap-line"], showBefore);
    setVisibility(
      ["phone-fill-fill", "phone-fill-line", "phone-fill-nodes", "phone-fill-labels"],
      showFill,
    );
  }, [view, showFill, ready]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <p className="text-sm text-ocean-mid">
          {view === "before"
            ? "Before: where phones already fail, Princeville west to Keʻē"
            : showFill
              ? "Filled in: smaller solar nodes in the pockets those radios miss"
              : "After: towns the new phone radios are aimed at"}
        </p>
        <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex flex-wrap rounded-full border border-sand-warm bg-white p-1" role="group" aria-label="Phone signal">
          <button
            type="button"
            aria-pressed={view === "before"}
            onClick={() => setView("before")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              view === "before" ? "bg-ocean-deep text-white" : "text-ocean-deep"
            }`}
          >
            Before
          </button>
          <button
            type="button"
            aria-pressed={view === "after"}
            onClick={() => setView("after")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              view === "after" ? "bg-ocean-deep text-white" : "text-ocean-deep"
            }`}
          >
            After
          </button>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={showGapFill}
          onClick={() => {
            const next = !showGapFill;
            setShowGapFill(next);
            if (next) setView("after");
          }}
          className="inline-flex items-center gap-3 rounded-full border border-sand-warm bg-white px-3 py-2 text-sm font-medium text-ocean-deep"
        >
          <span>Gap fill</span>
          <span
            className={`relative h-6 w-11 rounded-full transition-colors ${
              showGapFill ? "bg-ocean-deep" : "bg-sand-warm"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                showGapFill ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </span>
        </button>
        </div>
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
        <ul className="absolute left-3 top-3 max-w-[240px] space-y-1.5 rounded-xl bg-ocean-deep/90 px-3 py-2 text-xs text-white pointer-events-none">
          {view === "before" ? (
            <li className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm bg-[#c46b5a]/90" />
              Unreliable phone service in the public record
            </li>
          ) : (
            <li className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm bg-brand-teal/80" />
              Town a Band 48 radio is aimed at
            </li>
          )}
          {showFill && (
            <li className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm bg-[#e6c07b]/90" />
              Pocket a solar node would fill
            </li>
          )}
          <li className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border-2 border-white bg-ocean-deep" />
            Proposed hub, site not surveyed
          </li>
        </ul>
      </div>
      <p className="text-xs text-ocean-mid mt-3 max-w-3xl leading-relaxed">
        {view === "before"
          ? "Rose marks Hāʻena, Wainiha, and Hanalei. In 2024, fire and emergency management told the County Council that service from this stretch to Keʻē drops or disappears. Princeville and Kīlauea are not drawn as dead. This is not a carrier coverage map."
          : showFill
            ? `Gold marks ${gapFill.pockets.length} pockets the 180° town radios do not face. Each pocket would get a smaller solar node: a ${gapFill.radio}, ${gapFill.eirp} of signal and ${gapFill.watts} watts of draw, on ${gapFill.batteries} batteries and ${gapFill.panels} panels, with a short hop back to the nearest hub. It holds 72 hours on the battery and does not get a generator. A walk test adds or drops sites. These nodes are not in the pilot price, and the shade is still not a measured contour.`
            : "Teal marks the four towns. Each town hub gets one BLiNQ radio covering about 180° of that town. A phone shows this network after it installs the profile. The shade is the town, not a measured signal contour, and it is not Verizon, AT&T, or T-Mobile."}
      </p>
    </div>
  );
}
