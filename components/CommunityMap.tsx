"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";

import MapDataLegend from "@/components/MapDataLegend";
import MapInfoDrawer, { type MapSelection } from "@/components/MapInfoDrawer";
import MapLayerToggle from "@/components/MapLayerToggle";
import TechnologyOptionsPanel from "@/components/TechnologyOptionsPanel";
import { communityMapLayers } from "@/data/communityMapLayers";
import { technologyOptions as defaultTechnologyOptions } from "@/data/technologyOptions";
import { candidateSiteTypeById } from "@/data/candidateSiteTypes";
import { islandAssetCategoryLabels } from "@/data/islandAssets";
import { islandAssets } from "@/data/islandAssets";
import { getVisibleSites } from "@/lib/mapStats";
import type { CandidateSite, MapLayer, SampleAddress, TechnologyOption } from "@/types/network";

const IslandMap = dynamic(() => import("@/components/IslandMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#d4dde0] text-ocean-mid text-sm">
      Loading Kauai…
    </div>
  ),
});

type CommunityMapProps = {
  focusLocation?: SampleAddress | null;
  futureProgress?: number;
  concernRefreshKey?: number;
  observationRefreshKey?: number;
  onConcernAdded?: () => void;
  onObservationAdded?: () => void;
};

export default function CommunityMap({
  focusLocation,
  futureProgress = 0,
  concernRefreshKey = 0,
  observationRefreshKey = 0,
  onConcernAdded,
  onObservationAdded,
}: CommunityMapProps) {
  const [layers, setLayers] = useState<MapLayer[]>(() =>
    communityMapLayers.map((l) => ({ ...l }))
  );

  useEffect(() => {
    setLayers((prev) =>
      prev.map((l) =>
        l.id === "future-opportunities"
          ? { ...l, enabled: futureProgress > 20 }
          : l
      )
    );
  }, [futureProgress]);
  const [technologyOptions, setTechnologyOptions] = useState<TechnologyOption[]>(() =>
    defaultTechnologyOptions.map((t) => ({ ...t }))
  );
  const [selection, setSelection] = useState<MapSelection>(null);
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [addConcernMode, setAddConcernMode] = useState(false);
  const [addObservationMode, setAddObservationMode] = useState(false);

  const visibleSites = useMemo(() => getVisibleSites(layers), [layers]);
  const showIslandAssets = layers.find((l) => l.id === "island-assets")?.enabled ?? false;
  const focusSiteId = selection?.kind === "site" ? selection.data.id : undefined;
  const showTechnologyPanel = layers.find((l) => l.id === "technology-options")?.enabled;

  const toggleLayer = useCallback((id: string) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, enabled: !l.enabled } : l))
    );
  }, []);

  const toggleTechnology = useCallback((id: string) => {
    setTechnologyOptions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t))
    );
  }, []);

  const handleSiteSelect = useCallback((site: CandidateSite) => {
    setSelection({ kind: "site", data: site });
    setRightOpen(true);
  }, []);

  const handleConcernPlaced = useCallback(() => {
    setAddConcernMode(false);
    onConcernAdded?.();
  }, [onConcernAdded]);

  const handleObservationPlaced = useCallback(() => {
    setAddObservationMode(false);
    onObservationAdded?.();
  }, [onObservationAdded]);

  return (
    <section id="map" className="bg-ocean-deep">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-16 pb-6">
        <p className="text-amber-glow font-semibold text-sm tracking-widest uppercase mb-3">
          Community Map
        </p>
        <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-white mb-3 text-balance">
          A living community knowledge map
        </h2>
        <p className="text-mist text-lg max-w-2xl leading-relaxed">
          Start with what exists today — verified facilities, regional connectivity
          knowledge, and neighbor observations. Future ideas stay visually distinct.
        </p>
      </div>

      <div className="platform-shell platform-shell-embedded max-w-[1400px] mx-auto mb-16 sm:mx-8 lg:mx-auto sm:rounded-2xl">
        <header className="platform-header shrink-0">
          <p className="text-sm text-mist hidden sm:block">
            Existing connectivity first · community observations · future opportunities
          </p>
          <button
            type="button"
            onClick={() => {
              setAddObservationMode((m) => !m);
              if (!addObservationMode) setAddConcernMode(false);
            }}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
              addObservationMode
                ? "bg-ridge-mid text-white"
                : "bg-white/10 text-mist hover:text-white"
            }`}
          >
            {addObservationMode ? "Tap map to place…" : "Share observation"}
          </button>
          <button
            type="button"
            onClick={() => {
              setAddConcernMode((m) => !m);
              if (!addConcernMode) setAddObservationMode(false);
            }}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
              addConcernMode
                ? "bg-amber-emergency text-ocean-deep"
                : "bg-white/10 text-mist hover:text-white"
            }`}
          >
            {addConcernMode ? "Tap map to place…" : "Add question"}
          </button>
          <div className="flex items-center gap-2 ml-auto shrink-0">
            <button
              type="button"
              onClick={() => setLeftOpen((o) => !o)}
              className="lg:hidden platform-icon-btn"
              aria-label="Toggle map layers"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setRightOpen((o) => !o)}
              className="lg:hidden platform-icon-btn"
              aria-label="Toggle details panel"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </button>
          </div>
        </header>

        <div className="platform-body">
          <aside
            className={`platform-sidebar-left ${leftOpen ? "platform-sidebar-open" : "platform-sidebar-closed"}`}
          >
            <div className="flex flex-col gap-4 h-full overflow-hidden">
              <MapDataLegend variant="platform" compact />
              <div className="platform-panel p-4 shrink-0 max-h-[42vh] overflow-hidden flex flex-col">
                <MapLayerToggle
                  layers={layers}
                  emphasizedLayers={new Set()}
                  onToggle={toggleLayer}
                  variant="platform"
                />
              </div>
              {showTechnologyPanel && (
                <TechnologyOptionsPanel
                  options={technologyOptions}
                  onToggle={toggleTechnology}
                />
              )}
              {showIslandAssets && (
                <div className="platform-panel p-4 shrink-0 max-h-[22vh] overflow-hidden flex flex-col">
                  <h3 className="text-sm font-semibold text-white mb-1">Verified assets</h3>
                  <ul className="space-y-1 overflow-y-auto pr-0.5 flex-1">
                    {islandAssets.slice(0, 6).map((asset) => (
                      <li key={asset.id} className="text-xs text-mist px-2 py-1">
                        <span className="text-mist/60">
                          {islandAssetCategoryLabels[asset.category]} ·{" "}
                        </span>
                        {asset.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {visibleSites.length > 0 && (
                <div className="platform-panel p-4 shrink-0 max-h-[24vh] overflow-hidden flex flex-col">
                  <h3 className="text-sm font-semibold text-white mb-1">Future opportunities</h3>
                  <ul className="space-y-1 overflow-y-auto pr-0.5 flex-1">
                    {visibleSites.map((site) => (
                      <li key={site.id}>
                        <button
                          type="button"
                          onClick={() => handleSiteSelect(site)}
                          className={`w-full text-left rounded-lg px-2.5 py-2 text-xs transition-colors border ${
                            site.id === focusSiteId
                              ? "bg-amber-emergency/15 border-amber-emergency/35 text-white"
                              : "border-transparent text-mist hover:bg-white/8 hover:text-white"
                          }`}
                        >
                          <span
                            className="inline-block w-2 h-2 rounded-full mr-2 align-middle"
                            style={{
                              backgroundColor:
                                candidateSiteTypeById[site.type]?.mapColor ?? "#94a3b8",
                            }}
                          />
                          {site.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>

          <main className="platform-map-area">
            <IslandMap
              layers={layers}
              focusSiteId={focusSiteId}
              focusLocation={focusLocation}
              futureProgress={futureProgress}
              technologyOptions={technologyOptions}
              addConcernMode={addConcernMode}
              concernRefreshKey={concernRefreshKey}
              addObservationMode={addObservationMode}
              observationRefreshKey={observationRefreshKey}
              onConcernPlaced={handleConcernPlaced}
              onObservationPlaced={handleObservationPlaced}
              displayOptions={{ terrain: true, towns: true, majorRoads: true }}
              onSelectionChange={setSelection}
            />
          </main>

          <aside
            className={`platform-sidebar-right ${rightOpen ? "platform-sidebar-open" : "platform-sidebar-closed"}`}
          >
            <MapInfoDrawer
              selection={selection}
              onClose={() => setSelection(null)}
              variant="community"
            />
          </aside>
        </div>
      </div>
    </section>
  );
}
