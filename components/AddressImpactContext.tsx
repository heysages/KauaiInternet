"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { PlaceSearchType, SampleAddress } from "@/types/network";

type AddressImpactContextValue = {
  selectedLocation: SampleAddress | null;
  futureProgress: number;
  searchType: PlaceSearchType;
  setSelectedLocation: (location: SampleAddress | null) => void;
  setFutureProgress: (value: number) => void;
  setSearchType: (type: PlaceSearchType) => void;
  selectLocationAndScroll: (location: SampleAddress) => void;
};

const AddressImpactContext = createContext<AddressImpactContextValue | null>(null);

export function AddressImpactProvider({ children }: { children: React.ReactNode }) {
  const [selectedLocation, setSelectedLocation] = useState<SampleAddress | null>(null);
  const [futureProgress, setFutureProgress] = useState(0);
  const [searchType, setSearchType] = useState<PlaceSearchType>("home");

  const selectLocationAndScroll = useCallback((location: SampleAddress) => {
    setSelectedLocation(location);
    requestAnimationFrame(() => {
      document.getElementById("explore")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const value = useMemo(
    () => ({
      selectedLocation,
      futureProgress,
      searchType,
      setSelectedLocation,
      setFutureProgress,
      setSearchType,
      selectLocationAndScroll,
    }),
    [selectedLocation, futureProgress, searchType, selectLocationAndScroll]
  );

  return (
    <AddressImpactContext.Provider value={value}>{children}</AddressImpactContext.Provider>
  );
}

export function useAddressImpact() {
  const ctx = useContext(AddressImpactContext);
  if (!ctx) {
    throw new Error("useAddressImpact must be used within AddressImpactProvider");
  }
  return ctx;
}
