"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import AddressImpactReportPanel from "@/components/AddressImpactReportPanel";
import AddressImpactSearch from "@/components/AddressImpactSearch";
import CommunityFeedbackForm from "@/components/CommunityFeedbackForm";
import ImmersiveMapControls from "@/components/ImmersiveMapControls";
import MapViewModeToggle from "@/components/MapViewModeToggle";
import TodayFutureSlider from "@/components/TodayFutureSlider";
import type { MapViewMode } from "@/types/mapView";
import { communityMapLayers } from "@/data/communityMapLayers";
import { computeAddressImpactReport } from "@/lib/addressImpactReport";
import { getGroundViewSceneFeatures, getNearbySceneFeatures } from "@/lib/nearbySceneFeatures";
import { isImmersiveMode } from "@/lib/mapBasemaps";
import { useAddressImpact } from "@/components/AddressImpactContext";
import type { MapLayer } from "@/types/network";

const IslandMap = dynamic(() => import("@/components/IslandMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#d4dde0] text-ocean-mid text-sm rounded-xl">
      Loading your area…
    </div>
  ),
});

export default function AddressImpactExplorer() {
  const {
    selectedLocation,
    futureProgress,
    searchType,
    setSelectedLocation,
    setFutureProgress,
    setSearchType,
    selectLocationAndScroll,
  } = useAddressImpact();

  const [mapViewMode, setMapViewMode] = useState<MapViewMode>("community");
  const [mapFullscreen, setMapFullscreen] = useState(false);
  const [sceneOrbit, setSceneOrbit] = useState(false);
  useEffect(() => {
    if (!selectedLocation && mapViewMode !== "community") {
      setMapViewMode("community");
    }
  }, [selectedLocation, mapViewMode]);

  useEffect(() => {
    if (mapViewMode !== "scene") {
      setSceneOrbit(false);
    }
  }, [mapViewMode]);

  useEffect(() => {
    if (!mapFullscreen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMapFullscreen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mapFullscreen]);

  const report = useMemo(
    () =>
      selectedLocation
        ? computeAddressImpactReport(
            selectedLocation.lat,
            selectedLocation.lng,
            selectedLocation,
            futureProgress
          )
        : null,
    [selectedLocation, futureProgress]
  );

  const explorerLayers = useMemo<MapLayer[]>(() => {
    return communityMapLayers.map((layer) => {
      if (layer.id === "future-opportunities") {
        return { ...layer, enabled: futureProgress > 20 };
      }
      if (layer.id === "existing-connectivity" || layer.id === "island-assets") {
        return { ...layer, enabled: true };
      }
      if (layer.id === "what-residents-know") {
        return { ...layer, enabled: true };
      }
      if (layer.id === "community-concerns") {
        return { ...layer, enabled: futureProgress > 40 };
      }
      return { ...layer, enabled: false };
    });
  }, [futureProgress]);

  const sceneFeatures = useMemo(() => {
    if (!selectedLocation || !isImmersiveMode(mapViewMode)) return [];
    if (mapViewMode === "street") {
      return getGroundViewSceneFeatures(
        selectedLocation.lat,
        selectedLocation.lng,
        explorerLayers,
        futureProgress
      );
    }
    return getNearbySceneFeatures(
      selectedLocation.lat,
      selectedLocation.lng,
      explorerLayers,
      futureProgress
    );
  }, [selectedLocation, mapViewMode, explorerLayers, futureProgress]);

  return (
    <section id="explore" className="section-padding gradient-sand">
      <div className="max-w-6xl mx-auto">
        <p className="text-ridge-mid font-semibold text-sm tracking-widest uppercase mb-3">
          Address Impact Explorer
        </p>
        <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4 text-balance">
          Explore Your Community
        </h2>
        <p className="text-ocean-mid text-lg max-w-3xl leading-relaxed mb-8">
          See how resilience, connectivity, emergency readiness, and future community
          projects may relate to your location. The first question we answer:{" "}
          <strong className="text-ocean-deep font-medium">How does this affect me?</strong>
        </p>

        <div className="glass-card rounded-2xl p-5 sm:p-6 mb-8 lg:hidden">
          <AddressImpactSearch
            searchType={searchType}
            onSearchTypeChange={setSearchType}
            onLocationSelect={selectLocationAndScroll}
            selectedId={selectedLocation?.id}
          />
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-3 space-y-4">
            <div
              className={`platform-shell platform-shell-embedded rounded-2xl overflow-hidden relative transition-[height] duration-300 ${
                mapFullscreen
                  ? "map-immersive-fullscreen"
                  : mapViewMode === "street" && selectedLocation
                    ? "h-[520px] sm:h-[580px]"
                    : "h-[420px] sm:h-[480px]"
              }`}
            >
              <div className="absolute top-3 left-3 right-3 z-30 flex items-start justify-between gap-2 pointer-events-none">
                <div className="pointer-events-auto min-w-0">
                  <MapViewModeToggle
                    value={mapViewMode}
                    onChange={setMapViewMode}
                    hasFocus={!!selectedLocation}
                    variant="dark"
                  />
                </div>
                <ImmersiveMapControls
                  viewMode={mapViewMode}
                  fullscreen={mapFullscreen}
                  sceneOrbit={sceneOrbit}
                  onFullscreenChange={setMapFullscreen}
                  onSceneOrbitChange={setSceneOrbit}
                />
              </div>

              <IslandMap
                layers={explorerLayers}
                focusLocation={selectedLocation}
                futureProgress={futureProgress}
                viewMode={mapViewMode}
                sceneOrbit={sceneOrbit}
                displayOptions={{ terrain: true, towns: true, majorRoads: true }}
                onSelectionChange={() => {}}
              />
            </div>

            <div className="glass-card rounded-2xl p-5 sm:p-6">
              <TodayFutureSlider
                value={futureProgress}
                onChange={setFutureProgress}
                variant="light"
              />
              {futureProgress > 0 && (
                <p className="text-xs text-ocean-mid/80 mt-3 leading-relaxed">
                  Showing {futureProgress}% toward future possibilities — community projects
                  and resources appear as ideas under discussion, not built infrastructure.
                </p>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="hidden lg:block glass-card rounded-2xl p-5 sm:p-6">
              <AddressImpactSearch
                searchType={searchType}
                onSearchTypeChange={setSearchType}
                onLocationSelect={setSelectedLocation}
                selectedId={selectedLocation?.id}
              />
            </div>

            <AddressImpactReportPanel
              location={selectedLocation}
              report={report}
              futureProgress={futureProgress}
              variant="light"
            />
          </div>
        </div>

        <div className="mt-10 max-w-2xl">
          <CommunityFeedbackForm locationLabel={selectedLocation?.neighborhood} />
        </div>
      </div>
    </section>
  );
}
