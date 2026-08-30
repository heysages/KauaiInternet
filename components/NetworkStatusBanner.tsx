import Link from "next/link";
import { getNetworkStatusSnapshot } from "@/lib/networkStatus";
import OperationalStatusBadge from "@/components/OperationalStatusBadge";

export default function NetworkStatusBanner() {
  const snapshot = getNetworkStatusSnapshot(true);

  return (
    <section id="network-status" className="border-b border-sand-warm bg-ocean-deep text-white py-4 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-sand-warm">
              Kauaʻi Network
            </p>
            <OperationalStatusBadge status="simulated" />
          </div>
          <p className="text-sm text-mist">
            Demonstration data — not live telemetry.{" "}
            <Link href="/network" className="text-amber-glow hover:underline">
              Open network dashboard →
            </Link>
          </p>
        </div>
        <div className="flex flex-wrap gap-4 sm:gap-6">
          {snapshot.components.map((c) => (
            <div key={c.label} className="text-center">
              <p className="text-lg font-semibold tabular-nums">
                {c.online ?? "—"} / {c.total ?? "—"}
              </p>
              <p className="text-xs text-mist">{c.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
