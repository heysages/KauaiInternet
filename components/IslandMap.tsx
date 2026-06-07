"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import maplibregl from "maplibre-gl";

import { candidateSites } from "@/data/candidateSites";
import { dataConfidenceColors } from "@/data/dataConfidenceLegend";
import { existingInfrastructure } from "@/data/existingInfrastructure";
import { islandAssets } from "@/data/islandAssets";
import { mapTowns } from "@/data/mapTowns";
import { mapRegions } from "@/data/mapRegions";
import { regionConnectivityProfiles } from "@/data/regionConnectivity";
import { MAP_STYLE_URL } from "@/lib/mapStyle";
import {
  KAUAI_CENTER,
  KAUAI_MAX_BOUNDS,
  fitKauaiIsland,
} from "@/lib/kauaiMapView";
import type {
  CommunityConcernMarker,
  MapDisplayOptions,
  MapLayer,
  SampleAddress,
  SupportMarker,
  TechnologyOption,
} from "@/types/network";
import {
  concernMarkersToGeoJSON,
  connectionsToGeoJSON,
  infrastructureToGeoJSON,
  islandAssetsToGeoJSON,
  markersToGeoJSON,
  regionsToGeoJSON,
  residentObservationsToGeoJSON,
  sitesToGeoJSON,
  technologyHighlightsToGeoJSON,
  townsToGeoJSON,
} from "@/lib/mapGeojson";
import { getVisibleSites } from "@/lib/mapStats";
import ConcernMarkerForm from "@/components/ConcernMarkerForm";
import ResidentKnowledgeForm from "@/components/ResidentKnowledgeForm";
import { loadAllConcernMarkers } from "@/lib/concernMarkerStorage";
import { loadAllResidentObservations } from "@/lib/residentKnowledgeStorage";
import { loadAllSupportMarkers } from "@/lib/supportMarkerStorage";
import type { MapSelection } from "@/components/MapInfoDrawer";

if (typeof window !== "undefined") {
  maplibregl.setWorkerUrl("/maplibre-gl-csp-worker.js");
}

type IslandMapProps = {
  layers: MapLayer[];
  focusSiteId?: string;
  focusLocation?: SampleAddress | null;
  futureProgress?: number;
  displayOptions?: MapDisplayOptions;
  technologyOptions?: TechnologyOption[];
  addConcernMode?: boolean;
  onConcernPlaced?: () => void;
  concernRefreshKey?: number;
  addObservationMode?: boolean;
  onObservationPlaced?: () => void;
  observationRefreshKey?: number;
  onSelectionChange: (selection: MapSelection) => void;
};

function addNetworkLayers(map: maplibregl.Map) {
  map.addSource("terrain-dem", {
    type: "raster-dem",
    url: "https://demotiles.maplibre.org/terrain-tiles/tiles.json",
    tileSize: 256,
  });

  map.setTerrain({ source: "terrain-dem", exaggeration: 1.4 });

  map.addSource("regions", {
    type: "geojson",
    data: regionsToGeoJSON(mapRegions),
  });
  map.addLayer({
    id: "regions-fill",
    type: "fill",
    source: "regions",
    paint: {
      "fill-color": ["get", "fillColor"],
      "fill-opacity": 0.1,
    },
  });
  map.addLayer({
    id: "regions-outline",
    type: "line",
    source: "regions",
    paint: {
      "line-color": ["get", "fillColor"],
      "line-width": 1.5,
      "line-opacity": 0.3,
    },
  });

  map.addSource("connections", {
    type: "geojson",
    data: connectionsToGeoJSON(candidateSites),
  });
  map.addLayer({
    id: "connections-line",
    type: "line",
    source: "connections",
    paint: {
      "line-color": "#f4b942",
      "line-width": 2,
      "line-opacity": 0.4,
      "line-dasharray": [2, 2],
    },
  });

  map.addSource("infrastructure", {
    type: "geojson",
    data: infrastructureToGeoJSON(existingInfrastructure),
  });
  map.addLayer({
    id: "infra-circle",
    type: "circle",
    source: "infrastructure",
    paint: {
      "circle-radius": 8,
      "circle-color": ["get", "color"],
      "circle-stroke-width": 2,
      "circle-stroke-color": "#ffffff",
      "circle-opacity": 0.9,
    },
  });

  map.addSource("sites", {
    type: "geojson",
    data: sitesToGeoJSON(candidateSites),
  });
  map.addLayer({
    id: "sites-glow",
    type: "circle",
    source: "sites",
    paint: {
      "circle-radius": 16,
      "circle-color": ["get", "color"],
      "circle-opacity": 0.2,
      "circle-blur": 0.6,
    },
  });
  map.addLayer({
    id: "sites-circle",
    type: "circle",
    source: "sites",
    paint: {
      "circle-radius": 10,
      "circle-color": ["get", "color"],
      "circle-stroke-width": 2,
      "circle-stroke-color": "#ffffff",
      "circle-opacity": 0.95,
    },
  });

  map.addSource("concern-markers", {
    type: "geojson",
    data: concernMarkersToGeoJSON(loadAllConcernMarkers()),
  });
  map.addLayer({
    id: "concern-glow",
    type: "circle",
    source: "concern-markers",
    paint: {
      "circle-radius": 14,
      "circle-color": ["get", "color"],
      "circle-opacity": 0.22,
      "circle-blur": 0.5,
    },
  });
  map.addLayer({
    id: "concern-bubble",
    type: "circle",
    source: "concern-markers",
    paint: {
      "circle-radius": 11,
      "circle-color": ["get", "color"],
      "circle-stroke-width": 2.5,
      "circle-stroke-color": "#ffffff",
      "circle-opacity": 0.92,
    },
  });
  map.addLayer({
    id: "concern-symbol",
    type: "symbol",
    source: "concern-markers",
    layout: {
      "text-field": "?",
      "text-size": 13,
      "text-font": ["Open Sans Bold"],
      "text-allow-overlap": true,
      "text-ignore-placement": true,
    },
    paint: {
      "text-color": "#ffffff",
    },
  });

  map.addSource("technology-highlights", {
    type: "geojson",
    data: { type: "FeatureCollection", features: [] },
  });
  map.addLayer({
    id: "technology-glow",
    type: "circle",
    source: "technology-highlights",
    paint: {
      "circle-radius": 18,
      "circle-color": ["get", "color"],
      "circle-opacity": 0.18,
      "circle-blur": 0.6,
    },
  });
  map.addLayer({
    id: "technology-circle",
    type: "circle",
    source: "technology-highlights",
    paint: {
      "circle-radius": 9,
      "circle-color": ["get", "color"],
      "circle-stroke-width": 2,
      "circle-stroke-color": "#ffffff",
      "circle-opacity": 0.85,
    },
  });

  map.addSource("support-markers", {
    type: "geojson",
    data: markersToGeoJSON(loadAllSupportMarkers()),
  });
  map.addLayer({
    id: "support-glow",
    type: "circle",
    source: "support-markers",
    paint: {
      "circle-radius": 12,
      "circle-color": "#c084fc",
      "circle-opacity": 0.2,
      "circle-blur": 0.5,
    },
  });
  map.addLayer({
    id: "support-circle",
    type: "circle",
    source: "support-markers",
    paint: {
      "circle-radius": 6,
      "circle-color": "#c084fc",
      "circle-stroke-width": 2,
      "circle-stroke-color": "#ffffff",
    },
  });

  map.addSource("property-focus", {
    type: "geojson",
    data: { type: "FeatureCollection", features: [] },
  });
  map.addLayer({
    id: "property-focus-glow",
    type: "circle",
    source: "property-focus",
    paint: {
      "circle-radius": 22,
      "circle-color": "#f4b942",
      "circle-opacity": 0.25,
      "circle-blur": 0.5,
    },
  });
  map.addLayer({
    id: "property-focus-pin",
    type: "circle",
    source: "property-focus",
    paint: {
      "circle-radius": 8,
      "circle-color": "#e8a317",
      "circle-stroke-width": 2.5,
      "circle-stroke-color": "#ffffff",
    },
  });

  map.addSource("island-assets", {
    type: "geojson",
    data: islandAssetsToGeoJSON(islandAssets),
  });
  map.addLayer({
    id: "island-assets-glow",
    type: "circle",
    source: "island-assets",
    paint: {
      "circle-radius": 14,
      "circle-color": ["get", "color"],
      "circle-opacity": 0.2,
      "circle-blur": 0.5,
    },
  });
  map.addLayer({
    id: "island-assets-circle",
    type: "circle",
    source: "island-assets",
    paint: {
      "circle-radius": 9,
      "circle-color": ["get", "color"],
      "circle-stroke-width": 2,
      "circle-stroke-color": "#ffffff",
      "circle-opacity": 0.95,
    },
  });

  map.addSource("resident-observations", {
    type: "geojson",
    data: residentObservationsToGeoJSON([]),
  });
  map.addLayer({
    id: "resident-obs-glow",
    type: "circle",
    source: "resident-observations",
    paint: {
      "circle-radius": 13,
      "circle-color": ["get", "color"],
      "circle-opacity": 0.22,
      "circle-blur": 0.5,
    },
  });
  map.addLayer({
    id: "resident-obs-circle",
    type: "circle",
    source: "resident-observations",
    paint: {
      "circle-radius": 10,
      "circle-color": ["get", "color"],
      "circle-stroke-width": 2,
      "circle-stroke-color": "#ffffff",
      "circle-opacity": 0.9,
    },
  });

  map.addSource("towns", {
    type: "geojson",
    data: townsToGeoJSON(mapTowns),
  });
  map.addLayer({
    id: "town-labels",
    type: "symbol",
    source: "towns",
    layout: {
      "text-field": ["get", "name"],
      "text-size": 12,
      "text-font": ["Open Sans Regular"],
      "text-offset": [0, 1.2],
      "text-anchor": "top",
      "text-letter-spacing": 0.02,
    },
    paint: {
      "text-color": "#0a2f3d",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1.5,
      "text-halo-blur": 0.5,
    },
  });
}

export default function IslandMap({
  layers,
  focusSiteId,
  focusLocation,
  futureProgress = 0,
  displayOptions = { terrain: true, towns: true, majorRoads: true },
  technologyOptions = [],
  addConcernMode = false,
  onConcernPlaced,
  concernRefreshKey = 0,
  addObservationMode = false,
  onObservationPlaced,
  observationRefreshKey = 0,
  onSelectionChange,
}: IslandMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const focusSiteIdRef = useRef(focusSiteId);
  focusSiteIdRef.current = focusSiteId;
  const [supportMarkers, setSupportMarkers] = useState<SupportMarker[]>([]);
  const [concernMarkers, setConcernMarkers] = useState<CommunityConcernMarker[]>([]);
  const [residentObservations, setResidentObservations] = useState(
    () => loadAllResidentObservations()
  );
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [pendingConcern, setPendingConcern] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [pendingObservation, setPendingObservation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const visibleSites = useMemo(() => getVisibleSites(layers), [layers]);
  const showInfra =
    (layers.find((l) => l.id === "existing-infrastructure")?.enabled ?? false) &&
    existingInfrastructure.length > 0;
  const showIslandAssets = layers.some((l) => l.isIslandAssetsLayer && l.enabled);
  const showResidentKnowledge = layers.some(
    (l) => l.isResidentKnowledgeLayer && l.enabled
  );
  const showConnectivityRegions = layers.some(
    (l) => l.isConnectivityRegionLayer && l.enabled
  );
  const showFutureOpportunities = layers.some(
    (l) => l.isFutureOpportunitiesLayer && l.enabled
  );
  const showSupportLayer = layers.some((l) => l.isSupportLayer && l.enabled);
  const showConcernLayer = layers.some((l) => l.isConcernLayer && l.enabled);
  const showTechnologyLayer =
    layers.find((l) => l.id === "technology-options")?.enabled ?? false;
  const showConnections = visibleSites.length > 1;

  const refreshMarkers = useCallback(() => {
    setSupportMarkers(loadAllSupportMarkers());
    setConcernMarkers(loadAllConcernMarkers());
    setResidentObservations(loadAllResidentObservations());
  }, []);

  useEffect(() => {
    refreshMarkers();
  }, [refreshMarkers, concernRefreshKey, observationRefreshKey]);

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container || mapRef.current) return;

    const map = new maplibregl.Map({
      container,
      style: MAP_STYLE_URL,
      center: KAUAI_CENTER,
      zoom: 7.5,
      pitch: 0,
      bearing: 0,
      minZoom: 6.8,
      maxZoom: 14,
      maxBounds: KAUAI_MAX_BOUNDS,
      attributionControl: false,
      fadeDuration: 0,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: true }), "bottom-right");
    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-left");

    map.on("error", (e) => {
      console.error("MapLibre error:", e);
      setMapError("Map tiles failed to load. Try a hard refresh.");
    });

    map.on("load", () => {
      try {
        addNetworkLayers(map);
      } catch (err) {
        console.error("Failed to add network layers:", err);
      }
      const applyIslandFit = () => {
        map.resize();
        if (!focusSiteIdRef.current) {
          fitKauaiIsland(map);
        }
      };

      requestAnimationFrame(() => {
        applyIslandFit();
        // Container may still be settling inside the embedded layout
        requestAnimationFrame(applyIslandFit);
        setTimeout(applyIslandFit, 150);
        setMapReady(true);
        setMapError(null);
      });
    });

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const resizeObserver = new ResizeObserver(() => {
      map.resize();
      if (focusSiteIdRef.current) return;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => fitKauaiIsland(map), 120);
    });
    resizeObserver.observe(container);
    mapRef.current = map;

    return () => {
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
      setMapReady(false);
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    const sitesSource = map.getSource("sites") as maplibregl.GeoJSONSource | undefined;
    sitesSource?.setData(
      sitesToGeoJSON(visibleSites, { futureOpportunityOnly: showFutureOpportunities })
    );

    const assetsSource = map.getSource("island-assets") as maplibregl.GeoJSONSource | undefined;
    assetsSource?.setData(islandAssetsToGeoJSON(showIslandAssets ? islandAssets : []));

    const obsSource = map.getSource("resident-observations") as maplibregl.GeoJSONSource | undefined;
    obsSource?.setData(
      residentObservationsToGeoJSON(
        showResidentKnowledge ? residentObservations : []
      )
    );

    const connSource = map.getSource("connections") as maplibregl.GeoJSONSource | undefined;
    connSource?.setData(connectionsToGeoJSON(visibleSites));

    const markersSource = map.getSource("support-markers") as maplibregl.GeoJSONSource | undefined;
    markersSource?.setData(markersToGeoJSON(showSupportLayer ? supportMarkers : []));

    const concernSource = map.getSource("concern-markers") as maplibregl.GeoJSONSource | undefined;
    concernSource?.setData(
      concernMarkersToGeoJSON(showConcernLayer ? concernMarkers : [])
    );

    const techSource = map.getSource("technology-highlights") as maplibregl.GeoJSONSource | undefined;
    techSource?.setData(
      showTechnologyLayer
        ? technologyHighlightsToGeoJSON(
            candidateSites,
            existingInfrastructure,
            technologyOptions
          )
        : { type: "FeatureCollection", features: [] }
    );

    const setVis = (id: string, visible: boolean) => {
      if (map.getLayer(id)) {
        map.setLayoutProperty(id, "visibility", visible ? "visible" : "none");
      }
    };

    setVis("connections-line", showConnections);
    setVis("sites-glow", visibleSites.length > 0);
    setVis("sites-circle", visibleSites.length > 0);
    setVis("support-glow", showSupportLayer);
    setVis("support-circle", showSupportLayer);
    setVis("concern-glow", showConcernLayer);
    setVis("concern-bubble", showConcernLayer);
    setVis("concern-symbol", showConcernLayer);
    setVis("technology-glow", showTechnologyLayer && technologyOptions.some((t) => t.enabled));
    setVis("technology-circle", showTechnologyLayer && technologyOptions.some((t) => t.enabled));
    setVis("infra-circle", showInfra);
    setVis("island-assets-glow", showIslandAssets);
    setVis("island-assets-circle", showIslandAssets);
    setVis("resident-obs-glow", showResidentKnowledge);
    setVis("resident-obs-circle", showResidentKnowledge);

    if (map.getLayer("regions-fill")) {
      if (showConnectivityRegions) {
        map.setPaintProperty("regions-fill", "fill-color", dataConfidenceColors.verified);
        map.setPaintProperty("regions-fill", "fill-opacity", 0.2);
        map.setPaintProperty("regions-outline", "line-color", dataConfidenceColors.verified);
        map.setPaintProperty("regions-outline", "line-opacity", 0.5);
        map.setPaintProperty("regions-outline", "line-width", 2);
      } else {
        map.setPaintProperty("regions-fill", "fill-color", ["get", "fillColor"]);
        map.setPaintProperty("regions-fill", "fill-opacity", 0.1);
        map.setPaintProperty("regions-outline", "line-color", ["get", "fillColor"]);
        map.setPaintProperty("regions-outline", "line-opacity", 0.3);
        map.setPaintProperty("regions-outline", "line-width", 1.5);
      }
    }

    if (map.getLayer("sites-circle") && showFutureOpportunities) {
      map.setPaintProperty(
        "sites-circle",
        "circle-stroke-color",
        dataConfidenceColors["future-opportunity"]
      );
      map.setPaintProperty("sites-circle", "circle-stroke-width", 3);
    } else if (map.getLayer("sites-circle")) {
      map.setPaintProperty("sites-circle", "circle-stroke-color", "#ffffff");
      map.setPaintProperty("sites-circle", "circle-stroke-width", 2);
    }

    const showTechConnections =
      showTechnologyLayer &&
      technologyOptions.some((t) => t.enabled && t.showConnections);
    setVis("connections-line", showConnections || showTechConnections);
    setVis("town-labels", displayOptions.towns);

    const progress = Math.max(0, Math.min(100, futureProgress)) / 100;
    if (map.getLayer("connections-line")) {
      map.setPaintProperty("connections-line", "line-opacity", 0.25 + progress * 0.45);
      map.setPaintProperty("connections-line", "line-width", 1.5 + progress * 1.5);
    }
    if (map.getLayer("sites-glow")) {
      map.setPaintProperty("sites-glow", "circle-opacity", 0.12 + progress * 0.2);
    }

    const propertySource = map.getSource("property-focus") as maplibregl.GeoJSONSource | undefined;
    if (focusLocation) {
      propertySource?.setData({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: { type: "Point", coordinates: [focusLocation.lng, focusLocation.lat] },
            properties: { label: focusLocation.address },
          },
        ],
      });
      setVis("property-focus-glow", true);
      setVis("property-focus-pin", true);
    } else {
      propertySource?.setData({ type: "FeatureCollection", features: [] });
      setVis("property-focus-glow", false);
      setVis("property-focus-pin", false);
    }

    if (map.getTerrain()) {
      if (displayOptions.terrain) {
        map.setTerrain({ source: "terrain-dem", exaggeration: 1.4 });
      } else {
        map.setTerrain(null);
      }
    }
  }, [
    mapReady,
    visibleSites,
    supportMarkers,
    concernMarkers,
    showSupportLayer,
    showConcernLayer,
    showTechnologyLayer,
    technologyOptions,
    showConnections,
    showInfra,
    showIslandAssets,
    showResidentKnowledge,
    showConnectivityRegions,
    showFutureOpportunities,
    residentObservations,
    displayOptions,
    futureProgress,
    focusLocation,
  ]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    const interactiveLayers = [
      "sites-circle",
      "infra-circle",
      "island-assets-circle",
      "resident-obs-circle",
      "support-circle",
      "concern-bubble",
      "concern-symbol",
      "technology-circle",
      "regions-fill",
    ];

    const handleMapClick = (e: maplibregl.MapMouseEvent) => {
      if (addObservationMode) {
        setPendingObservation({ lat: e.lngLat.lat, lng: e.lngLat.lng });
        return;
      }

      if (addConcernMode) {
        setPendingConcern({ lat: e.lngLat.lat, lng: e.lngLat.lng });
        return;
      }

      const pad = 12;
      const features = map.queryRenderedFeatures(
        [
          [e.point.x - pad, e.point.y - pad],
          [e.point.x + pad, e.point.y + pad],
        ],
        { layers: interactiveLayers }
      );

      const assetFeature = features.find((f) => f.layer.id === "island-assets-circle");
      if (assetFeature) {
        const id = assetFeature.properties?.id as string;
        const asset = islandAssets.find((a) => a.id === id);
        if (asset) {
          onSelectionChange({ kind: "island-asset", data: asset });
          return;
        }
      }

      const obsFeature = features.find((f) => f.layer.id === "resident-obs-circle");
      if (obsFeature) {
        const id = obsFeature.properties?.id as string;
        const obs = residentObservations.find((o) => o.id === id);
        if (obs) {
          onSelectionChange({ kind: "resident-observation", data: obs });
          return;
        }
      }

      const siteFeature = features.find((f) => f.layer.id === "sites-circle");
      if (siteFeature) {
        const id = siteFeature.properties?.id as string;
        const site = candidateSites.find((s) => s.id === id);
        if (site) {
          onSelectionChange({
            kind: "site",
            data: site,
            isFutureOpportunity: showFutureOpportunities,
          });
          return;
        }
      }

      const infraFeature = features.find((f) => f.layer.id === "infra-circle");
      if (infraFeature) {
        const id = infraFeature.properties?.id as string;
        const infra = existingInfrastructure.find((i) => i.id === id);
        if (infra) {
          onSelectionChange({ kind: "infrastructure", data: infra });
          return;
        }
      }

      const markerFeature = features.find((f) => f.layer.id === "support-circle");
      if (markerFeature) {
        const id = markerFeature.properties?.id as string;
        const marker = supportMarkers.find((m) => m.id === id);
        if (marker) {
          onSelectionChange({ kind: "marker", data: marker });
          return;
        }
      }

      const concernFeature = features.find(
        (f) => f.layer.id === "concern-bubble" || f.layer.id === "concern-symbol"
      );
      if (concernFeature) {
        const id = concernFeature.properties?.id as string;
        const concern = concernMarkers.find((m) => m.id === id);
        if (concern) {
          onSelectionChange({ kind: "concern", data: concern });
          return;
        }
      }

      const regionFeature = features.find((f) => f.layer.id === "regions-fill");
      if (regionFeature) {
        const id = regionFeature.properties?.id as string;
        const region = mapRegions.find((r) => r.id === id);
        if (!region) return;
        if (showConnectivityRegions) {
          const profile = regionConnectivityProfiles.find((p) => p.regionId === id);
          if (profile) {
            onSelectionChange({ kind: "connectivity-region", data: region, profile });
            return;
          }
        }
        onSelectionChange({ kind: "region", data: region });
      }
    };

    const handleMouseMove = (e: maplibregl.MapMouseEvent) => {
      const pad = 8;
      const features = map.queryRenderedFeatures(
        [
          [e.point.x - pad, e.point.y - pad],
          [e.point.x + pad, e.point.y + pad],
        ],
        { layers: interactiveLayers }
      );
      map.getCanvas().style.cursor =
        addConcernMode || addObservationMode || features.length ? "pointer" : "";
    };

    map.on("click", handleMapClick);
    map.on("mousemove", handleMouseMove);

    return () => {
      map.off("click", handleMapClick);
      map.off("mousemove", handleMouseMove);
      map.getCanvas().style.cursor = "";
    };
  }, [
    mapReady,
    supportMarkers,
    concernMarkers,
    residentObservations,
    addConcernMode,
    addObservationMode,
    showConnectivityRegions,
    showFutureOpportunities,
    onSelectionChange,
  ]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;
    map.getCanvas().style.cursor =
      addConcernMode || addObservationMode ? "crosshair" : "";
  }, [addConcernMode, addObservationMode, mapReady]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    if (focusLocation) {
      map.flyTo({
        center: [focusLocation.lng, focusLocation.lat],
        zoom: 11.2,
        pitch: 32,
        bearing: -12,
        duration: 900,
        essential: true,
      });
      return;
    }

    if (!focusSiteId) {
      fitKauaiIsland(map);
      return;
    }

    const site = candidateSites.find((s) => s.id === focusSiteId);
    if (!site) return;
    map.flyTo({
      center: [site.lng, site.lat],
      zoom: 10.6,
      pitch: 28,
      bearing: -8,
      duration: 700,
      essential: true,
    });
  }, [focusSiteId, focusLocation, mapReady]);

  return (
    <div className="relative w-full h-full bg-[#d4dde0]">
      <div ref={mapContainerRef} className="absolute inset-0 network-map-canvas" />

      {!mapReady && !mapError && (
        <div className="absolute inset-0 z-[5] flex items-center justify-center bg-[#d4dde0] text-ocean-mid text-sm">
          Loading Kauai terrain map…
        </div>
      )}

      {mapError && (
        <div className="absolute inset-0 z-[5] flex items-center justify-center bg-[#d4dde0] text-ocean-deep text-sm px-6 text-center">
          {mapError}
        </div>
      )}

      <div className="pointer-events-none absolute bottom-14 left-3 z-10 platform-panel px-3 py-1.5 text-[10px] text-mist/80 hidden sm:block">
        Community knowledge map · verified + neighbor observations · Kauai, Hawaiʻi
      </div>

      {addObservationMode && !pendingObservation && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 platform-panel px-4 py-2 text-xs text-white text-center max-w-xs">
          Tap the map to share a connectivity observation
        </div>
      )}

      {addConcernMode && !pendingConcern && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 platform-panel px-4 py-2 text-xs text-white text-center max-w-xs">
          Tap the map to place a question or concern
        </div>
      )}

      {pendingConcern && (
        <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-ocean-deep/40 backdrop-blur-sm">
          <div className="w-full max-w-md">
            <ConcernMarkerFormOverlay
              lat={pendingConcern.lat}
              lng={pendingConcern.lng}
              onCancel={() => setPendingConcern(null)}
              onSubmit={() => {
                setPendingConcern(null);
                refreshMarkers();
                onConcernPlaced?.();
              }}
            />
          </div>
        </div>
      )}

      {pendingObservation && (
        <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-ocean-deep/40 backdrop-blur-sm">
          <div className="w-full max-w-md">
            <button
              type="button"
              onClick={() => setPendingObservation(null)}
              className="mb-2 text-xs text-white/80 hover:text-white"
            >
              Cancel
            </button>
            <ResidentKnowledgeForm
              compact
              initialLat={pendingObservation.lat}
              initialLng={pendingObservation.lng}
              onSubmit={() => {
                setPendingObservation(null);
                refreshMarkers();
                onObservationPlaced?.();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ConcernMarkerFormOverlay({
  lat,
  lng,
  onCancel,
  onSubmit,
}: {
  lat: number;
  lng: number;
  onCancel: () => void;
  onSubmit: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onCancel}
        className="mb-2 text-xs text-white/80 hover:text-white"
      >
        Cancel
      </button>
      <ConcernMarkerForm
        compact
        initialLat={lat}
        initialLng={lng}
        initialLocationLabel={`${lat.toFixed(2)}°, ${lng.toFixed(2)}° · approximate`}
        onSubmit={onSubmit}
      />
    </div>
  );
}
