"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { NetworkMode } from "@/types/network";

type NetworkModeContextValue = {
  mode: NetworkMode;
  setMode: (mode: NetworkMode) => void;
  demoEnabled: boolean;
};

const NetworkModeContext = createContext<NetworkModeContextValue | null>(null);

export function NetworkModeProvider({
  children,
  demoEnabled = false,
  initialMode = "global",
}: {
  children: ReactNode;
  demoEnabled?: boolean;
  initialMode?: NetworkMode;
}) {
  const [mode, setMode] = useState<NetworkMode>(initialMode);
  return (
    <NetworkModeContext.Provider value={{ mode, setMode, demoEnabled }}>
      {children}
    </NetworkModeContext.Provider>
  );
}

export function useNetworkMode() {
  const ctx = useContext(NetworkModeContext);
  if (!ctx) {
    return { mode: "global" as NetworkMode, setMode: () => {}, demoEnabled: false };
  }
  return ctx;
}
