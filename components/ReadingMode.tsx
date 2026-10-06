"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ReadingMode = "technical" | "plain";

const STORAGE_KEY = "kauai-reading-mode";

type ReadingModeContextValue = {
  mode: ReadingMode;
  setMode: (mode: ReadingMode) => void;
};

const ReadingModeContext = createContext<ReadingModeContextValue | null>(null);

function applyReadingClass(next: ReadingMode) {
  document.documentElement.classList.toggle("reading-plain", next === "plain");
}

export function ReadingModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ReadingMode>("technical");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const next = stored === "plain" || stored === "technical" ? stored : "technical";
    setModeState(next);
    applyReadingClass(next);
    const id = window.location.hash.slice(1);
    if (!id) return;
    const slot = next === "plain" ? ".reading-slot-plain" : ".reading-slot-technical";
    document.querySelector<HTMLElement>(`${slot} #${CSS.escape(id)}`)?.scrollIntoView();
  }, []);

  const setMode = (next: ReadingMode) => {
    setModeState(next);
    applyReadingClass(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <ReadingModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ReadingModeContext.Provider>
  );
}

export function useReadingMode() {
  const value = useContext(ReadingModeContext);
  if (!value) {
    throw new Error("useReadingMode must be used inside ReadingModeProvider");
  }
  return value;
}

export function ReadingText({ technical, plain }: { technical: string; plain: string }) {
  return (
    <>
      <span className="reading-slot-technical">{technical}</span>
      <span className="reading-slot-plain">{plain}</span>
    </>
  );
}

export function ViewSwitch({
  technical,
  plain,
}: {
  technical: ReactNode;
  plain: ReactNode;
}) {
  return (
    <>
      <div className="reading-slot-technical">{technical}</div>
      <div className="reading-slot-plain">{plain}</div>
    </>
  );
}

export function ReadingToggle() {
  const { mode, setMode } = useReadingMode();

  return (
    <div
      className="inline-flex rounded-full border border-white/20 bg-white/5 p-0.5"
      role="group"
      aria-label="Site version"
    >
      <button
        type="button"
        aria-pressed={mode === "plain"}
        onClick={() => setMode("plain")}
        className="rounded-full px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors reading-plain:bg-white reading-plain:text-ocean-deep reading-technical:text-mist reading-technical:hover:text-white"
      >
        Neighbors
      </button>
      <button
        type="button"
        aria-pressed={mode === "technical"}
        onClick={() => setMode("technical")}
        className="rounded-full px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors reading-technical:bg-white reading-technical:text-ocean-deep reading-plain:text-mist reading-plain:hover:text-white"
      >
        Technical
      </button>
    </div>
  );
}
