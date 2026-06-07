"use client";

import { useEffect, useMemo, useState } from "react";
import type maplibregl from "maplibre-gl";

import { kindLabel, sceneLayerLabels } from "@/lib/nearbySceneFeatures";
import type { MapLayer } from "@/types/network";
import type { MapViewMode, NearbySceneFeature } from "@/types/mapView";

type ProjectedFeature = NearbySceneFeature & { x: number; y: number };

type MapSceneOverlayProps = {
  map: maplibregl.Map | null;
  mapReady: boolean;
  viewMode: MapViewMode;
  focusLat: number;
  focusLng: number;
  features: NearbySceneFeature[];
  layers: MapLayer[];
  futureProgress?: number;
  addressLabel?: string;
};

export default function MapSceneOverlay({
  map,
  mapReady,
  viewMode,
  focusLat,
  focusLng,
  features,
  layers,
  futureProgress = 0,
  addressLabel,
}: MapSceneOverlayProps) {
  const [projected, setProjected] = useState<ProjectedFeature[]>([]);
  const [focusPoint, setFocusPoint] = useState<{ x: number; y: number } | null>(null);
  const [deviceTilt, setDeviceTilt] = useState(0);
  const [mapBearing, setMapBearing] = useState(0);

  const activeLayers = useMemo(() => sceneLayerLabels(layers), [layers]);
  const showAr = viewMode === "scene" || viewMode === "street";
  const showLive = viewMode === "live" || viewMode === "scene" || viewMode === "street";

  const proposedCount = features.filter((f) => f.deploymentStatus === "proposed").length;

  useEffect(() => {
    if (!showAr || typeof window === "undefined") return;

    const onOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta == null) return;
      const tilt = Math.max(-12, Math.min(12, (event.beta - 45) * 0.15));
      setDeviceTilt(tilt);
    };

    window.addEventListener("deviceorientation", onOrientation);
    return () => window.removeEventListener("deviceorientation", onOrientation);
  }, [showAr]);

  useEffect(() => {
    if (!map || !mapReady || !showLive) {
      setProjected([]);
      setFocusPoint(null);
      return;
    }

    const update = () => {
      if (!map.isStyleLoaded()) return;
      try {
        const focus = map.project([focusLng, focusLat]);
        setFocusPoint({ x: focus.x, y: focus.y });
        setMapBearing(map.getBearing());
        setProjected(
          features.map((feature) => {
            const point = map.project([feature.lng, feature.lat]);
            return { ...feature, x: point.x, y: point.y };
          })
        );
      } catch {
        setProjected([]);
        setFocusPoint(null);
      }
    };

    update();
    map.on("move", update);
    map.on("resize", update);
    map.on("rotate", update);
    return () => {
      map.off("move", update);
      map.off("resize", update);
      map.off("rotate", update);
    };
  }, [map, mapReady, showLive, focusLat, focusLng, features]);

  if (!showLive || !focusPoint) return null;

  return (
    <div
      className={`map-scene-overlay pointer-events-none absolute inset-0 z-20 overflow-hidden ${
        showAr ? "map-scene-overlay--ar" : "map-scene-overlay--live"
      } ${viewMode === "street" ? "map-street-ar-overlay" : ""}`}
      style={showAr ? { transform: `perspective(900px) rotateX(${deviceTilt}deg)` } : undefined}
    >
      {showAr && (
        <>
          <div className="map-ar-frame" aria-hidden />
          <div className="map-ar-crosshair" aria-hidden />
          <div className="map-ar-radar" aria-hidden />
          <div className={`map-ar-status ${viewMode === "street" ? "map-street-ar-status" : ""}`}>
            <span className="map-ar-live-dot" />
            {viewMode === "street"
              ? "Ground AR · infrastructure & community layers"
              : "Scene view · community layers projected"}
          </div>
          <div
            className="map-ar-compass"
            style={{ transform: `rotate(${-mapBearing}deg)` }}
            aria-hidden
          >
            <span className="map-ar-compass-n">N</span>
          </div>
        </>
      )}

      {showLive && !showAr && (
        <div className="map-live-badge">
          Live aerial · Esri imagery
        </div>
      )}

      {futureProgress > 20 && proposedCount > 0 && showAr && (
        <div className="map-street-proposed-badge">
          {proposedCount} proposed deployment{proposedCount === 1 ? "" : "s"} · planning view
        </div>
      )}

      {addressLabel && (
        <div className={`map-scene-address ${viewMode === "street" ? "map-street-ar-address" : ""}`}>
          <span className="map-scene-address-label">You are here</span>
          <span className="map-scene-address-text">{addressLabel}</span>
        </div>
      )}

      <svg className="absolute inset-0 w-full h-full" aria-hidden>
        <defs>
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f4b942" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1a6b7c" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        {projected.map((feature) => (
          <g key={feature.id}>
            <line
              x1={focusPoint.x}
              y1={focusPoint.y}
              x2={feature.x}
              y2={feature.y}
              className={
                feature.deploymentStatus === "proposed"
                  ? "map-street-beam-proposed"
                  : "map-scene-beam"
              }
              stroke={feature.color}
            />
            <circle
              cx={feature.x}
              cy={feature.y}
              r={feature.deploymentStatus === "proposed" ? 6 : showAr ? 5 : 4}
              fill={feature.color}
              opacity={0.9}
            />
          </g>
        ))}
        <circle
          cx={focusPoint.x}
          cy={focusPoint.y}
          r={showAr ? 10 : 7}
          className="map-scene-focus-ring"
        />
      </svg>

      {showAr &&
        projected.map((feature) => (
          <div
            key={`label-${feature.id}`}
            className={`map-scene-feature-label ${
              feature.deploymentStatus === "proposed" ? "map-street-ar-label--proposed" : ""
            }`}
            style={{ left: feature.x, top: feature.y }}
          >
            <span className="map-scene-feature-kind">{kindLabel(feature.kind, feature)}</span>
            <span className="map-scene-feature-name">{feature.name}</span>
            <span className="map-scene-feature-distance">{feature.distanceKm.toFixed(1)} km</span>
          </div>
        ))}

      {showAr && activeLayers.length > 0 && (
        <div className={`map-scene-layer-stack ${viewMode === "street" ? "map-street-ar-layers" : ""}`}>
          {activeLayers.map((layer) => (
            <span
              key={layer.id}
              className="map-scene-layer-pill"
              style={{ borderColor: layer.color }}
            >
              <span className="map-scene-layer-dot" style={{ background: layer.color }} />
              {layer.name}
            </span>
          ))}
        </div>
      )}

      {showAr && features.length > 0 && (
        <div className={`map-scene-feature-rail ${viewMode === "street" ? "map-street-ar-rail" : ""}`}>
          {features.map((feature) => (
            <div
              key={`rail-${feature.id}`}
              className={`map-scene-rail-chip ${
                feature.deploymentStatus === "proposed" ? "map-street-rail-chip--proposed" : ""
              }`}
            >
              <span className="map-scene-feature-kind">{kindLabel(feature.kind, feature)}</span>
              <span className="map-scene-rail-name">{feature.name}</span>
              <span className="map-scene-feature-distance">{feature.distanceKm.toFixed(1)} km</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
