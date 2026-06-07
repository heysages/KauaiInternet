"use client";

import { useMemo, useState } from "react";
import { propertyHelpCategories } from "@/data/propertyHelpCategories";
import { sampleAddresses } from "@/data/sampleAddresses";
import { getAddressSuggestions } from "@/lib/propertyImpact";
import type { SampleAddress } from "@/types/network";

type CommunityLayerPanelProps = {
  onAddressSelect: (address: SampleAddress) => void;
  selectedAddressId?: string;
};

export default function CommunityLayerPanel({
  onAddressSelect,
  selectedAddressId,
}: CommunityLayerPanelProps) {
  const [query, setQuery] = useState("");
  const suggestions = useMemo(() => getAddressSuggestions(query), [query]);

  return (
    <div className="flex flex-col gap-4 h-full overflow-hidden">
      <div className="platform-panel p-4 shrink-0">
        <h2 className="heading-display text-sm font-semibold text-white mb-1">
          Property Impact Explorer
        </h2>
        <p className="text-[11px] text-mist/80 mb-3 leading-relaxed">
          Search an address to see how island resilience planning could affect your home,
          neighborhood, business, or school.
        </p>

        <label className="block">
          <span className="sr-only">Address search</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try: Lihue, Kapaa, Poipu, Princeville…"
            className="w-full rounded-xl bg-white/8 border border-white/12 px-3 py-2.5 text-sm text-white placeholder:text-mist/50 focus:outline-none focus:border-amber-emergency/50"
          />
        </label>

        {(query || suggestions.length > 0) && (
          <ul className="mt-2 space-y-1 max-h-[28vh] overflow-y-auto">
            {suggestions.map((addr) => {
              const isSelected = addr.id === selectedAddressId;
              return (
                <li key={addr.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onAddressSelect(addr);
                      setQuery(addr.address);
                    }}
                    className={`w-full text-left rounded-lg px-2.5 py-2 text-xs transition-colors border ${
                      isSelected
                        ? "bg-amber-emergency/15 border-amber-emergency/35 text-white"
                        : "border-transparent text-mist hover:bg-white/8 hover:text-white"
                    }`}
                  >
                    <p className="font-medium leading-snug">{addr.address}</p>
                    <p className="text-[10px] text-mist/60 mt-0.5">{addr.neighborhood}</p>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {!query && (
          <p className="text-[10px] text-mist/55 mt-2">
            {sampleAddresses.length} sample addresses · simulated scoring
          </p>
        )}
      </div>

      <div className="platform-panel p-4 flex-1 min-h-0 overflow-y-auto">
        <h3 className="text-sm font-semibold text-white mb-1">Could your property help?</h3>
        <p className="text-[10px] text-mist/75 mb-3">
          Ways homes, businesses, and community sites can join the network.
        </p>
        <ul className="space-y-2">
          {propertyHelpCategories.map((cat) => (
            <li
              key={cat.id}
              className="rounded-xl bg-white/5 border border-white/8 px-3 py-2.5"
            >
              <div className="flex items-start gap-2">
                <span className="text-sm shrink-0" aria-hidden>
                  {cat.icon}
                </span>
                <div>
                  <p className="text-xs font-semibold text-white">{cat.label}</p>
                  <p className="text-[10px] text-mist/75 mt-0.5 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
