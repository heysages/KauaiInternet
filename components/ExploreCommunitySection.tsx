"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { sampleAddresses } from "@/data/sampleAddresses";
import { computeCommunitySnapshot } from "@/lib/communitySnapshot";
import { getAddressSuggestions } from "@/lib/propertyImpact";
import type { SampleAddress } from "@/types/network";

const placeFilters = [
  { id: "all", label: "All" },
  { id: "residential", label: "Home" },
  { id: "business", label: "Business" },
  { id: "school", label: "School" },
  { id: "neighborhood", label: "Neighborhood" },
] as const;

type ExploreCommunitySectionProps = {
  selectedAddress: SampleAddress | null;
  onAddressSelect: (address: SampleAddress) => void;
};

export default function ExploreCommunitySection({
  selectedAddress,
  onAddressSelect,
}: ExploreCommunitySectionProps) {
  const [query, setQuery] = useState("");
  const [placeFilter, setPlaceFilter] = useState<string>("all");

  const suggestions = useMemo(() => {
    let results = getAddressSuggestions(query, 8);
    if (placeFilter === "neighborhood") {
      results = query
        ? results
        : sampleAddresses.filter((a) => a.placeType === "residential" || a.placeType === "public");
    } else if (placeFilter !== "all") {
      results = results.filter((a) => a.placeType === placeFilter);
    }
    return results;
  }, [query, placeFilter]);

  const snapshot = selectedAddress
    ? computeCommunitySnapshot(selectedAddress.lat, selectedAddress.lng, selectedAddress)
    : null;

  return (
    <section id="explore" className="section-padding gradient-sand">
      <div className="max-w-6xl mx-auto">
        <p className="text-ridge-mid font-semibold text-sm tracking-widest uppercase mb-3">
          Explore Your Community
        </p>
        <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4 text-balance">
          How could this help where you live, work, or learn?
        </h2>
        <p className="text-ocean-mid text-lg max-w-2xl leading-relaxed mb-10">
          Search for a home, business, school, or neighborhood to see a simple community
          snapshot — nearby projects, possible benefits, and ways to participate.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <div className="flex flex-wrap gap-2 mb-5">
              {placeFilters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setPlaceFilter(f.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    placeFilter === f.id
                      ? "bg-ridge-mid text-white"
                      : "bg-white/80 text-ocean-mid hover:bg-white"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <label className="block">
              <span className="text-sm font-medium text-ocean-deep mb-2 block">
                Search Kauai
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try Lihue, Kapaa, Poipu, Princeville…"
                className="w-full rounded-xl border border-ocean-mid/15 bg-white px-4 py-3 text-ocean-deep placeholder:text-ocean-mid/50 focus:outline-none focus:border-ridge-mid/50"
              />
            </label>

            <ul className="mt-4 space-y-2 max-h-56 overflow-y-auto">
              {suggestions.map((addr) => (
                <li key={addr.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onAddressSelect(addr);
                      setQuery(addr.address);
                    }}
                    className={`w-full text-left rounded-xl px-4 py-3 transition-colors border ${
                      selectedAddress?.id === addr.id
                        ? "bg-ridge-light/15 border-ridge-mid/30 text-ocean-deep"
                        : "border-transparent bg-white/50 hover:bg-white text-ocean-mid"
                    }`}
                  >
                    <p className="text-sm font-medium">{addr.address}</p>
                    <p className="text-xs text-ocean-mid/70 mt-0.5">{addr.neighborhood}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card rounded-2xl p-6 sm:p-8 min-h-[320px]">
            {!snapshot ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <span className="text-4xl mb-4" aria-hidden>
                  🏡
                </span>
                <h3 className="heading-display text-xl font-semibold text-ocean-deep mb-2">
                  Community Snapshot
                </h3>
                <p className="text-ocean-mid text-sm leading-relaxed max-w-xs">
                  Choose a location to see nearby projects, potential benefits, and ways you
                  can help.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ridge-mid mb-1">
                    Community Snapshot
                  </p>
                  <h3 className="heading-display text-xl font-semibold text-ocean-deep mb-2">
                    {snapshot.headline}
                  </h3>
                  <p className="text-ocean-mid text-sm leading-relaxed">{snapshot.summary}</p>
                </div>

                <SnapshotBlock title="Nearby projects">
                  <ul className="space-y-2">
                    {snapshot.nearbyProjects.map((p) => (
                      <li key={p.id} className="text-sm text-ocean-mid flex gap-2">
                        <span className="text-ridge-light shrink-0">•</span>
                        <span>
                          <span className="font-medium text-ocean-deep">{p.name}</span>
                          <span className="text-ocean-mid/70"> — {p.area}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </SnapshotBlock>

                <SnapshotBlock title="Potential future benefits">
                  <ul className="space-y-2">
                    {snapshot.futureBenefits.map((b) => (
                      <li key={b} className="text-sm text-ocean-mid flex gap-2">
                        <span className="text-amber-emergency shrink-0">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </SnapshotBlock>

                <SnapshotBlock title="Ways to participate">
                  <div className="flex flex-wrap gap-2">
                    {snapshot.waysToParticipate.map((w) => (
                      <span
                        key={w}
                        className="text-xs font-medium px-3 py-1.5 rounded-full bg-ridge-light/15 text-ridge-dark border border-ridge-light/25"
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                </SnapshotBlock>

                <Link
                  href="#map"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-ridge-mid hover:text-ridge-dark transition-colors"
                >
                  View on the community map
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function SnapshotBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-ocean-mid mb-2">
        {title}
      </h4>
      {children}
    </div>
  );
}
