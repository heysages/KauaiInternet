"use client";

import { useMemo } from "react";
import { buildTopologyGraph } from "@/lib/networkTopology";
import { linkMediumColors } from "@/data/networkLinks";
import type { LinkMedium } from "@/types/network";

const layout: Record<string, { x: number; y: number }> = {
  "node-haena-plan": { x: 40, y: 30 },
  "node-hanalei-plan": { x: 120, y: 50 },
  "node-princeville-plan": { x: 200, y: 40 },
  "node-kilauea-plan": { x: 280, y: 80 },
  "node-anahola-plan": { x: 360, y: 60 },
  "node-kapaa-plan": { x: 440, y: 90 },
  "node-central-edge-candidate": { x: 320, y: 160 },
  "node-east-ridge-candidate": { x: 400, y: 140 },
};

export default function NetworkTopologyGraph({
  disabledNodeIds = [],
  disabledLinkIds = [],
  height = 220,
}: {
  disabledNodeIds?: string[];
  disabledLinkIds?: string[];
  height?: number;
}) {
  const { nodes, edges } = useMemo(
    () => buildTopologyGraph({ disabledNodeIds, disabledLinkIds }),
    [disabledNodeIds, disabledLinkIds]
  );

  const positioned = nodes.map((n, i) => ({
    ...n,
    ...(layout[n.id] ?? { x: 60 + (i % 5) * 90, y: 40 + Math.floor(i / 5) * 70 }),
  }));

  const posById = Object.fromEntries(positioned.map((n) => [n.id, n]));

  return (
    <svg viewBox="0 0 520 200" className="w-full" style={{ height }} aria-hidden>
      {edges.map((e) => {
        const a = posById[e.from];
        const b = posById[e.to];
        if (!a || !b) return null;
        const color = linkMediumColors[e.medium as LinkMedium] ?? "#64748b";
        return (
          <line
            key={e.id}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={color}
            strokeWidth={2}
            strokeOpacity={e.active ? 0.8 : 0.25}
            strokeDasharray={e.medium === "lora" ? "4 4" : undefined}
          />
        );
      })}
      {positioned.map((n) => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r={10} fill="#0D2B45" stroke="#3FA7B5" strokeWidth={2} />
          <text
            x={n.x}
            y={n.y + 22}
            textAnchor="middle"
            fill="#E6E2D6"
            fontSize={9}
            className="select-none"
          >
            {n.label.slice(0, 12)}
          </text>
        </g>
      ))}
    </svg>
  );
}
