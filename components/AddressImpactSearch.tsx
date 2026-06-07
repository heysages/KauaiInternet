"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { sampleAddresses } from "@/data/sampleAddresses";
import { getAddressSuggestions } from "@/lib/propertyImpact";
import type { GeocodeResult, PlaceSearchType, SampleAddress } from "@/types/network";

const searchTypes: { id: PlaceSearchType; label: string }[] = [
  { id: "home", label: "Home Address" },
  { id: "business", label: "Business" },
  { id: "school", label: "School" },
  { id: "neighborhood", label: "Neighborhood" },
  { id: "landmark", label: "Landmark" },
];

const placeTypeBySearch: Record<PlaceSearchType, SampleAddress["placeType"] | "any"> = {
  home: "residential",
  business: "business",
  school: "school",
  neighborhood: "any",
  landmark: "landmark",
};

type AddressImpactSearchProps = {
  variant?: "hero" | "section";
  searchType: PlaceSearchType;
  onSearchTypeChange: (type: PlaceSearchType) => void;
  onLocationSelect: (location: SampleAddress) => void;
  selectedId?: string;
};

function geocodeToSample(result: GeocodeResult, searchType: PlaceSearchType): SampleAddress {
  return {
    id: `geo-${result.id}`,
    address: result.label,
    lat: result.lat,
    lng: result.lng,
    neighborhood: result.neighborhood,
    placeType: result.placeType,
    source: "geocoded",
    searchType,
  };
}

export default function AddressImpactSearch({
  variant = "section",
  searchType,
  onSearchTypeChange,
  onLocationSelect,
  selectedId,
}: AddressImpactSearchProps) {
  const [query, setQuery] = useState("");
  const [geocodeResults, setGeocodeResults] = useState<GeocodeResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [geocodeError, setGeocodeError] = useState<string | null>(null);

  const isHero = variant === "hero";

  const sampleSuggestions = useMemo(() => {
    let results = getAddressSuggestions(query, 6);
    const targetType = placeTypeBySearch[searchType];
    if (targetType !== "any") {
      results = results.filter((a) => a.placeType === targetType || a.placeType === "public");
    }
    if (searchType === "neighborhood" && !query) {
      return sampleAddresses.slice(0, 6);
    }
    return results;
  }, [query, searchType]);

  const fetchGeocode = useCallback(async (q: string) => {
    if (q.trim().length < 3) {
      setGeocodeResults([]);
      return;
    }
    setLoading(true);
    setGeocodeError(null);
    try {
      const res = await fetch(`/api/geocode?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setGeocodeResults(data.results ?? []);
      if (data.error) setGeocodeError("Search temporarily unavailable — try a sample address.");
    } catch {
      setGeocodeError("Search temporarily unavailable — try a sample address.");
      setGeocodeResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => fetchGeocode(query), 400);
    return () => clearTimeout(timer);
  }, [query, fetchGeocode]);

  const handleSelect = (location: SampleAddress) => {
    onLocationSelect({ ...location, searchType });
    setQuery(location.address);
  };

  const showGeocode = query.trim().length >= 3 && geocodeResults.length > 0;

  return (
    <div className={isHero ? "space-y-4" : "space-y-4"}>
      <div className={`flex flex-wrap gap-2 ${isHero ? "" : "mb-1"}`}>
        {searchTypes.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onSearchTypeChange(t.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              searchType === t.id
                ? isHero
                  ? "bg-amber-emergency text-ocean-deep"
                  : "bg-ridge-mid text-white"
                : isHero
                  ? "bg-white/15 text-mist hover:bg-white/25 border border-white/20"
                  : "bg-white/80 text-ocean-mid hover:bg-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <label className="block">
        <span className={`text-sm font-medium mb-2 block ${isHero ? "text-sand-warm" : "text-ocean-deep"}`}>
          Search Kauai
        </span>
        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your address, school, business, or neighborhood…"
            className={`w-full rounded-xl px-4 py-3.5 text-base focus:outline-none transition-colors ${
              isHero
                ? "bg-white/95 text-ocean-deep placeholder:text-ocean-mid/50 border-2 border-amber-emergency/40 focus:border-amber-glow shadow-lg shadow-ocean-deep/20"
                : "border border-ocean-mid/15 bg-white text-ocean-deep placeholder:text-ocean-mid/50 focus:border-ridge-mid/50"
            }`}
          />
          {loading && (
            <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs ${isHero ? "text-ocean-mid" : "text-ocean-mid"}`}>
              Searching…
            </span>
          )}
        </div>
      </label>

      {geocodeError && (
        <p className={`text-xs ${isHero ? "text-sand-warm/80" : "text-ocean-mid"}`}>{geocodeError}</p>
      )}

      <ul className={`space-y-2 max-h-52 overflow-y-auto ${isHero ? "mt-2" : ""}`}>
        {showGeocode &&
          geocodeResults.map((result) => (
            <li key={result.id}>
              <button
                type="button"
                onClick={() => handleSelect(geocodeToSample(result, searchType))}
                className={`w-full text-left rounded-xl px-4 py-3 transition-colors border ${
                  isHero
                    ? "bg-white/10 hover:bg-white/20 border-white/15 text-white"
                    : selectedId === `geo-${result.id}`
                      ? "bg-ridge-light/15 border-ridge-mid/30 text-ocean-deep"
                      : "border-transparent bg-white/50 hover:bg-white text-ocean-mid"
                }`}
              >
                <p className="text-sm font-medium">{result.label}</p>
                <p className={`text-xs mt-0.5 ${isHero ? "text-mist/70" : "text-ocean-mid/70"}`}>
                  {result.neighborhood} · geocoded
                </p>
              </button>
            </li>
          ))}

        {sampleSuggestions.map((addr) => (
          <li key={addr.id}>
            <button
              type="button"
              onClick={() => handleSelect(addr)}
              className={`w-full text-left rounded-xl px-4 py-3 transition-colors border ${
                isHero
                  ? "bg-white/10 hover:bg-white/20 border-white/15 text-white"
                  : selectedId === addr.id
                    ? "bg-ridge-light/15 border-ridge-mid/30 text-ocean-deep"
                    : "border-transparent bg-white/50 hover:bg-white text-ocean-mid"
              }`}
            >
              <p className="text-sm font-medium">{addr.address}</p>
              <p className={`text-xs mt-0.5 ${isHero ? "text-mist/70" : "text-ocean-mid/70"}`}>
                {addr.neighborhood}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
