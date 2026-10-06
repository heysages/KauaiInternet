"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { quoteSelection, type PricedBuild } from "@/data/pilotBudget";

export type PhoneView = "before" | "after";

type GapFillContextValue = {
  showGapFill: boolean;
  setShowGapFill: (show: boolean) => void;
  showIsland: boolean;
  setShowIsland: (show: boolean) => void;
  view: PhoneView;
  setView: (view: PhoneView) => void;
};

const GapFillContext = createContext<GapFillContextValue | null>(null);

export function GapFillProvider({ children }: { children: ReactNode }) {
  const [showGapFill, setShowGapFillState] = useState(false);
  const [showIsland, setShowIslandState] = useState(false);
  const [view, setView] = useState<PhoneView>("before");

  const setShowGapFill = (show: boolean) => {
    setShowGapFillState(show);
    if (show) setView("after");
  };

  const setShowIsland = (show: boolean) => {
    setShowIslandState(show);
    if (show) setView("after");
  };

  return (
    <GapFillContext.Provider
      value={{ showGapFill, setShowGapFill, showIsland, setShowIsland, view, setView }}
    >
      {children}
    </GapFillContext.Provider>
  );
}

export function useGapFill() {
  const value = useContext(GapFillContext);
  if (!value) {
    throw new Error("useGapFill must be used inside GapFillProvider");
  }
  return value;
}

export function useCostScenario(): ReturnType<typeof quoteSelection> & PricedBuild {
  const { view, showGapFill, showIsland } = useGapFill();
  return quoteSelection({
    view,
    gap: view === "after" && showGapFill,
    island: view === "after" && showIsland,
  });
}
