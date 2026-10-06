"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type GapFillContextValue = {
  showGapFill: boolean;
  setShowGapFill: (show: boolean) => void;
};

const GapFillContext = createContext<GapFillContextValue | null>(null);

export function GapFillProvider({ children }: { children: ReactNode }) {
  const [showGapFill, setShowGapFill] = useState(false);
  return (
    <GapFillContext.Provider value={{ showGapFill, setShowGapFill }}>
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
