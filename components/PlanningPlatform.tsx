"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";

import CommunityLayerPanel from "@/components/CommunityLayerPanel";
import InfrastructureLayerPanel from "@/components/InfrastructureLayerPanel";
import MapInfoDrawer, { type MapSelection } from "@/components/MapInfoDrawer";
import MapLayerToggle from "@/components/MapLayerToggle";
import MapStatsBar from "@/components/MapStatsBar";
import PlatformLayerTabs from "@/components/PlatformLayerTabs";
import PropertyImpactPanel from "@/components/PropertyImpactPanel";
import TechnologyOptionsPanel from "@/components/TechnologyOptionsPanel";
import VisionInsightPanel from "@/components/VisionInsightPanel";
import VisionLayerPanel from "@/components/VisionLayerPanel";
import { communityMapLayers } from "@/data/communityMapLayers";
import { mapLayers as defaultMapLayers } from "@/data/mapLayers";
import { infrastructureMapLayers } from "@/data/infrastructureLayers";
import { technologyOptions as defaultTechnologyOptions } from "@/data/technologyOptions";
import { computePropertySnapshot } from "@/lib/propertyImpact";
import { computeMapStats, getVisibleSites } from "@/lib/mapStats";
import type {
  MapDisplayOptions,
  MapLayer,
  MapLayerId,
  PlatformLayerId,
  SampleAddress,
  TechnologyOption,
} from "@/types/network";

const EXTRA_MAP_LAYERS = communityMapLayers.filter((l) =>
  ["community-concerns", "technology-options"].includes(l.id)
);

function withExtraLayers(layers: MapLayer[]): MapLayer[] {
  return [...layers.map((l) => ({ ...l })), ...EXTRA_MAP_LAYERS.map((l) => ({ ...l }))];
}

const IslandMap = dynamic(() => import("@/components/IslandMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-ocean-deep text-mist text-sm">
      Loading Kauai map…
    </div>
  ),
});

const VISION_LAYERS: MapLayer[] = defaultMapLayers.map((l) => ({
  ...l,
  enabled: ["candidate-sites", "public-wifi", "emergency-resilience", "community-support"].includes(
    l.id
  ),
}));

const COMMUNITY_LAYERS: MapLayer[] = defaultMapLayers.map((l) => ({
  ...l,
  enabled: ["candidate-sites", "emergency-resilience", "public-wifi", "community-support"].includes(
    l.id
  ),
}));

function layersForPlatformLayer(layer: PlatformLayerId): MapLayer[] {
  if (layer === "infrastructure") {
    return withExtraLayers(infrastructureMapLayers.map((l) => ({ ...l })));
  }
  if (layer === "community") {
    return withExtraLayers(COMMUNITY_LAYERS.map((l) => ({ ...l })));
  }
  return withExtraLayers(VISION_LAYERS.map((l) => ({ ...l })));
}

type PlanningPlatformProps = {
  embedded?: boolean;
};

export default function PlanningPlatform({ embedded = false }: PlanningPlatformProps) {
  const [platformLayer, setPlatformLayer] = useState<PlatformLayerId>("vision");
  const [layers, setLayers] = useState<MapLayer[]>(() => layersForPlatformLayer("vision"));
  const [futureProgress, setFutureProgress] = useState(35);
  const [selection, setSelection] = useState<MapSelection>(null);
  const [selectedAddress, setSelectedAddress] = useState<SampleAddress | null>(null);
  const [displayOptions, setDisplayOptions] = useState<MapDisplayOptions>({
    terrain: true,
    towns: true,
    majorRoads: true,
  });
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [technologyOptions, setTechnologyOptions] = useState<TechnologyOption[]>(() =>
    defaultTechnologyOptions.map((t) => ({ ...t }))
  );
  const [mounted, setMounted] = useState(false);

  const showTechnologyPanel = layers.find((l) => l.id === "technology-options")?.enabled;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePlatformLayerChange = useCallback((id: PlatformLayerId) => {
    setPlatformLayer(id);
    setLayers(layersForPlatformLayer(id));
    setSelection(null);
    if (id !== "community") setSelectedAddress(null);
  }, []);

  const stats = useMemo(() => computeMapStats(layers), [layers]);
  const visibleSites = useMemo(() => getVisibleSites(layers), [layers]);
  const focusSiteId =
    selection?.kind === "site" ? selection.data.id : undefined;

  const propertySnapshot = useMemo(() => {
    if (!selectedAddress) return null;
    return computePropertySnapshot(
      selectedAddress.lat,
      selectedAddress.lng,
      futureProgress
    );
  }, [selectedAddress, futureProgress]);

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

  const handleDisplayOptionChange = useCallback(
    (key: keyof MapDisplayOptions, value: boolean) => {
      setDisplayOptions((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleAddressSelect = useCallback((address: SampleAddress) => {
    setSelectedAddress(address);
    setSelection(null);
    setRightOpen(true);
  }, []);

  const emphasizedLayers = useMemo((): Set<MapLayerId> => {
    if (platformLayer === "infrastructure") {
      return new Set(layers.filter((l) => l.enabled).map((l) => l.id));
    }
    if (platformLayer === "community") {
      return new Set<MapLayerId>([
        "public-wifi",
        "emergency-resilience",
        "candidate-sites",
      ]);
    }
    return new Set<MapLayerId>([
      "public-wifi",
      "emergency-resilience",
      "community-support",
    ]);
  }, [platformLayer, layers]);

  return (
    <div
      className={`platform-shell ${embedded ? "platform-shell-embedded" : "platform-shell-fullscreen"}`}
    >
      <header className="platform-header shrink-0">
        <div className="min-w-0 shrink-0 hidden sm:block">
          <p className="font-semibold text-sm text-white">Planning explorer</p>
          <p className="text-[10px] text-mist/70">Vision · community · infrastructure</p>
        </div>

        <div className="flex-1 min-w-0 max-w-xl mx-2 sm:mx-4">
          <PlatformLayerTabs active={platformLayer} onChange={handlePlatformLayerChange} />
        </div>

        <div className="flex-1 max-w-2xl hidden lg:block">
          {mounted ? <MapStatsBar stats={stats} /> : <StatsPlaceholder />}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setLeftOpen((o) => !o)}
            className="lg:hidden platform-icon-btn"
            aria-label="Toggle layers panel"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setRightOpen((o) => !o)}
            className="lg:hidden platform-icon-btn"
            aria-label="Toggle info panel"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
          </button>
        </div>
      </header>

      <div className="lg:hidden shrink-0 px-3 pb-2 border-b border-white/10 bg-ocean-deep/95">
        {mounted ? <MapStatsBar stats={stats} /> : <StatsPlaceholder />}
      </div>

      <div className="platform-body">
        <aside
          className={`platform-sidebar-left ${leftOpen ? "platform-sidebar-open" : "platform-sidebar-closed"}`}
        >
          {platformLayer === "vision" && (
            <VisionLayerPanel
              futureProgress={futureProgress}
              onFutureProgressChange={setFutureProgress}
            />
          )}
          {platformLayer === "community" && (
            <CommunityLayerPanel
              onAddressSelect={handleAddressSelect}
              selectedAddressId={selectedAddress?.id}
            />
          )}
          {platformLayer === "infrastructure" && (
            <>
              <InfrastructureLayerPanel
                layers={layers.filter(
                  (l) => !l.isConcernLayer && !l.isTechnologyLayer
                )}
                displayOptions={displayOptions}
                visibleSites={visibleSites}
                emphasizedLayers={emphasizedLayers}
                selectedSiteId={focusSiteId}
                onToggleLayer={toggleLayer}
                onDisplayOptionChange={handleDisplayOptionChange}
                onSiteSelect={(site) => setSelection({ kind: "site", data: site })}
              />
              <div className="platform-panel p-4 shrink-0">
                <MapLayerToggle
                  layers={layers.filter(
                    (l) => l.isConcernLayer || l.isTechnologyLayer
                  )}
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
            </>
          )}
          {(platformLayer === "vision" || platformLayer === "community") &&
            layers.some((l) => l.isConcernLayer || l.isTechnologyLayer) && (
              <div className="platform-panel p-4 shrink-0">
                <MapLayerToggle
                  layers={layers.filter(
                    (l) => l.isConcernLayer || l.isTechnologyLayer
                  )}
                  emphasizedLayers={new Set()}
                  onToggle={toggleLayer}
                  variant="platform"
                />
                {showTechnologyPanel && (
                  <div className="mt-3">
                    <TechnologyOptionsPanel
                      options={technologyOptions}
                      onToggle={toggleTechnology}
                    />
                  </div>
                )}
              </div>
            )}
        </aside>

        <main className="platform-map-area">
          <IslandMap
            layers={layers}
            focusSiteId={focusSiteId}
            focusLocation={selectedAddress}
            futureProgress={futureProgress}
            displayOptions={displayOptions}
            technologyOptions={technologyOptions}
            onSelectionChange={setSelection}
          />
        </main>

        <aside
          className={`platform-sidebar-right ${rightOpen ? "platform-sidebar-open" : "platform-sidebar-closed"}`}
        >
          {platformLayer === "vision" && (
            <VisionInsightPanel futureProgress={futureProgress} />
          )}
          {platformLayer === "community" && (
            <PropertyImpactPanel
              address={selectedAddress}
              snapshot={propertySnapshot}
            />
          )}
          {platformLayer === "infrastructure" && (
            <MapInfoDrawer
              selection={selection}
              onClose={() => setSelection(null)}
              variant={
                selection?.kind === "site" || selection?.kind === "infrastructure"
                  ? "planner"
                  : "community"
              }
            />
          )}
        </aside>
      </div>
    </div>
  );
}

function StatsPlaceholder() {
  return (
    <div className="flex items-stretch gap-2 sm:gap-3 overflow-x-auto pb-0.5">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="platform-panel shrink-0 px-3 sm:px-4 py-2 sm:py-2.5 min-w-[120px] animate-pulse"
        >
          <div className="h-2.5 w-16 bg-white/10 rounded mb-2" />
          <div className="h-6 w-12 bg-white/10 rounded" />
        </div>
      ))}
    </div>
  );
}
