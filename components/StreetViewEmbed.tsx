"use client";

import { useEffect, useMemo, useState } from "react";
import type maplibregl from "maplibre-gl";

import {
  streetViewEmbedUrl,
  streetViewExternalUrl,
  streetViewPov,
  type StreetViewPov,
} from "@/lib/streetView";

type StreetViewEmbedProps = {
  lat: number;
  lng: number;
  map: maplibregl.Map | null;
  mapReady: boolean;
};

/** Full-screen Google Street View — AR layers render in IslandMap above this */
export default function StreetViewEmbed({
  lat,
  lng,
  map,
  mapReady,
}: StreetViewEmbedProps) {
  const [pov, setPov] = useState<StreetViewPov>(() => streetViewPov(lng, lat));

  useEffect(() => {
    setPov(streetViewPov(lng, lat));
  }, [lat, lng]);

  const embedUrl = useMemo(() => streetViewEmbedUrl(lat, lng, pov), [lat, lng, pov]);

  const turn = (delta: number) => {
    setPov((prev) => ({ ...prev, heading: prev.heading + delta }));
    if (map && mapReady) {
      map.easeTo({ bearing: map.getBearing() + delta, duration: 400 });
    }
  };

  const heading = Math.round(pov.heading);

  return (
    <div className="absolute inset-0 z-0 bg-ocean-deep">
      <iframe
        key={embedUrl}
        title="Street-level view of your address"
        src={embedUrl}
        className="absolute inset-0 w-full h-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />

      <div className="absolute bottom-20 left-3 z-[15] flex items-center gap-1.5 pointer-events-auto">
        <button
          type="button"
          onClick={() => turn(-45)}
          className="map-immersive-btn"
          aria-label="Turn view left"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => turn(45)}
          className="map-immersive-btn"
          aria-label="Turn view right"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <span className="map-street-heading">{heading}°</span>
      </div>

      <div className="absolute bottom-20 right-3 z-[15] pointer-events-auto">
        <a
          href={streetViewExternalUrl(lat, lng, pov)}
          target="_blank"
          rel="noopener noreferrer"
          className="map-immersive-btn text-[10px] font-semibold gap-1.5"
        >
          Open in Google Maps
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}
