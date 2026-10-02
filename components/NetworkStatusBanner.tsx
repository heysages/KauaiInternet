import Link from "next/link";
import { getNetworkStatusSnapshot } from "@/lib/networkStatus";
import OperationalStatusBadge from "@/components/OperationalStatusBadge";

export default function NetworkStatusBanner() {
  const snapshot = getNetworkStatusSnapshot(true);

  return (
    <section id="network-status" className="border-b border-sand-warm bg-ocean-deep text-white py-4 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <p className="text-sm font-semibold text-white">
                Demonstration, not a live network
              </p>
              <OperationalStatusBadge status="simulated" />
            </div>
            <p className="text-sm text-mist max-w-2xl">
              The figures below are sample numbers for a planning dashboard. They are not
              coverage on Kauaʻi, and no nodes are on the air.
            </p>
          </div>
          <Link
            href="/network"
            className="shrink-0 text-sm text-amber-glow hover:underline"
          >
            Open the sample dashboard →
          </Link>
        </div>
        <p className="text-xs text-mist">
          <span className="uppercase tracking-widest text-sand-warm/80">Sample figures only</span>
          {" · "}
          {snapshot.components.map((c, i) => (
            <span key={c.label}>
              {i > 0 && " · "}
              <span className="tabular-nums">
                {c.online ?? "—"}/{c.total ?? "—"}
              </span>{" "}
              {c.label}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
