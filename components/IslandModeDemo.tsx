"use client";

import NetworkModeIndicator from "@/components/NetworkModeIndicator";
import { NetworkModeProvider, useNetworkMode } from "@/components/NetworkModeContext";
import NetworkTopologyGraph from "@/components/NetworkTopologyGraph";
import { networkNodes } from "@/data/networkNodes";
import type { LinkMedium } from "@/types/network";

const VISIBLE_NODES = new Set([
  "node-haena-plan",
  "node-hanalei-plan",
  "node-princeville-plan",
  "node-kilauea-plan",
  "node-anahola-plan",
  "node-kapaa-plan",
  "node-central-edge-candidate",
  "node-west-uplink-candidate",
]);

const hiddenNodeIds = networkNodes
  .map((node) => node.id)
  .filter((id) => !VISIBLE_NODES.has(id));

const DIMMED_BY_MODE: Record<string, LinkMedium[]> = {
  global: [],
  island: ["satellite"],
  emergencyMesh: ["satellite", "wifi", "fixedWireless", "fiber", "microwave", "reticulumLogical"],
};

function ModeDiagram() {
  const { mode } = useNetworkMode();
  const caption =
    mode === "emergencyMesh"
      ? "Only the local radio path stays bright. Broadband links drop out."
      : mode === "island"
        ? "The island path stays up. The satellite hop off-island goes dim."
        : "Every planned path is available, including the hop off-island.";

  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3">
      <p className="text-[10px] uppercase tracking-widest text-mist mb-1">
        What this mode keeps lit
      </p>
      <p className="text-xs text-sand-warm mb-2">{caption}</p>
          <NetworkTopologyGraph
            height={210}
            disabledNodeIds={hiddenNodeIds}
            dimmedMediums={DIMMED_BY_MODE[mode] ?? []}
          />
    </div>
  );
}

export default function IslandModeDemo() {
  return (
    <NetworkModeProvider demoEnabled initialMode="global">
      <div className="rounded-2xl bg-ocean-deep text-white p-6 border border-white/10">
        <p className="text-xs uppercase tracking-widest text-mist mb-4">
          Demo — toggle network states
        </p>
        <NetworkModeIndicator />
        <ModeDiagram />
      </div>
    </NetworkModeProvider>
  );
}
