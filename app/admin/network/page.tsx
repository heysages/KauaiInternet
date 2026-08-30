"use client";

import { useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import NetworkTopologyGraph from "@/components/NetworkTopologyGraph";
import RouteSimulationPanel from "@/components/RouteSimulationPanel";
import OperationalStatusBadge from "@/components/OperationalStatusBadge";
import { networkNodes } from "@/data/networkNodes";
import { networkLinks } from "@/data/networkLinks";
import { demoRoute } from "@/lib/networkTopology";
import Link from "next/link";

export default function AdminNetworkPage() {
  const [disabledNodes, setDisabledNodes] = useState<string[]>([]);

  const toggleNode = (id: string) => {
    setDisabledNodes((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <AdminShell title="Network operations">
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <OperationalStatusBadge status="simulated" />
        <span className="text-xs text-mist">Demo NOC — no live telemetry connected</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="platform-panel rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Logical topology</h2>
          <NetworkTopologyGraph disabledNodeIds={disabledNodes} height={260} />
        </div>
        <RouteSimulationPanel />
      </div>

      <div className="platform-panel rounded-2xl p-5 mb-8">
        <h2 className="text-sm font-semibold text-white mb-3">Failure simulator</h2>
        <p className="text-xs text-mist mb-4">
          Toggle nodes to simulate outages — results are planning-graph only, not measured resilience.
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {networkNodes.slice(0, 12).map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => toggleNode(n.id)}
              className={`text-xs px-2 py-1 rounded-md border ${
                disabledNodes.includes(n.id)
                  ? "border-red-400/50 bg-red-500/10 text-red-300"
                  : "border-white/10 text-mist hover:text-white"
              }`}
            >
              {n.name.slice(0, 20)}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setDisabledNodes([demoRoute.failureScenario.disabledNodeId])}
          className="text-xs text-amber-glow underline"
        >
          Apply demo failure: {demoRoute.failureScenario.label}
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="platform-panel rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white mb-3">Nodes ({networkNodes.length})</h2>
          <ul className="text-xs text-mist space-y-1 max-h-64 overflow-y-auto">
            {networkNodes.map((n) => (
              <li key={n.id} className="flex justify-between gap-2">
                <span>{n.name}</span>
                <span className="text-amber-glow/80">{n.nodeClass}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="platform-panel rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white mb-3">Links ({networkLinks.length})</h2>
          <ul className="text-xs text-mist space-y-1 max-h-64 overflow-y-auto">
            {networkLinks.map((l) => (
              <li key={l.id}>
                {l.fromNodeId.replace("node-", "")} → {l.toNodeId.replace("node-", "")}{" "}
                <span className="text-amber-glow/70">({l.medium})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-xs text-mist mt-6">
        <Link href="/admin/submissions?kind=node-application" className="text-amber-glow hover:underline">
          Review host node applications →
        </Link>
      </p>
    </AdminShell>
  );
}
