"use client";

import AddressImpactSearch from "@/components/AddressImpactSearch";
import { useAddressImpact } from "@/components/AddressImpactContext";

export default function HeroAddressSearch() {
  const { searchType, setSearchType, selectLocationAndScroll } = useAddressImpact();

  return (
    <div className="mt-6 pt-6 border-t border-white/15">
      <p className="text-amber-glow font-semibold text-sm tracking-widest uppercase mb-2">
        Explore Your Community
      </p>
      <p className="text-mist text-base sm:text-lg leading-relaxed mb-5 max-w-xl">
        See how resilience, connectivity, emergency readiness, and future community
        projects may relate to your location.
      </p>
      <AddressImpactSearch
        variant="hero"
        searchType={searchType}
        onSearchTypeChange={setSearchType}
        onLocationSelect={selectLocationAndScroll}
      />
    </div>
  );
}
