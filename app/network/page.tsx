import Link from "next/link";
import PlainStandIn from "@/components/PlainStandIn";
import { ViewSwitch } from "@/components/ReadingMode";
import SiteNav from "@/components/SiteNav";
import NetworkModeIndicator from "@/components/NetworkModeIndicator";
import { NetworkModeProvider } from "@/components/NetworkModeContext";
import NetworkTopologyGraph from "@/components/NetworkTopologyGraph";
import RouteSimulationPanel from "@/components/RouteSimulationPanel";
import MapLinkLegend from "@/components/MapLinkLegend";
import OperationalStatusBadge from "@/components/OperationalStatusBadge";
import { getNetworkStatusSnapshot } from "@/lib/networkStatus";
import { networkNodes } from "@/data/networkNodes";
import { networkLinks } from "@/data/networkLinks";

export const metadata = {
  title: "Network Status | Kauai Internet",
  description: "KauaiInternet network operations dashboard — demonstration and planning view.",
};

export default function NetworkPage() {
  const snapshot = getNetworkStatusSnapshot(true);

  return (
    <>
      <SiteNav />
      <ViewSwitch
        plain={
          <PlainStandIn kicker="Neighbor version" title="This page is the technical drawing">
            <p>
              Nothing here is on the air. It is a diagram for the people designing the
              network. What neighbors would notice is on the front page: a phone signal in
              town on an ordinary day, and a short message that still gets through when the
              power and the internet are out.
            </p>
            <p>Switch to Technical if you want the diagram.</p>
          </PlainStandIn>
        }
        technical={
      <main className="min-h-screen bg-ocean-deep text-white pt-20">
        <div className="max-w-6xl mx-auto section-padding pb-16">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="heading-display text-3xl sm:text-4xl font-semibold">Kauaʻi Network</h1>
            <OperationalStatusBadge status="simulated" />
          </div>
          <p className="text-mist mb-6 max-w-2xl">
            Demonstration data — not live telemetry.{" "}
            <Link href="/" className="text-amber-glow hover:underline">
              Return to homepage
            </Link>
          </p>

          <NetworkModeProvider demoEnabled initialMode="global">
            <div className="grid lg:grid-cols-3 gap-4 mb-8">
              <div className="lg:col-span-2 platform-shell rounded-2xl p-6">
                <NetworkModeIndicator />
              </div>
              <div className="space-y-3">
                {snapshot.components.map((c) => (
                  <div key={c.label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-2xl font-semibold tabular-nums">
                      {c.online ?? "—"} / {c.total ?? "—"}
                    </p>
                    <p className="text-xs text-mist">{c.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </NetworkModeProvider>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <div className="platform-shell rounded-2xl p-6">
              <h2 className="font-semibold mb-4">Logical topology</h2>
              <NetworkTopologyGraph height={240} />
              <MapLinkLegend dark />
            </div>
            <RouteSimulationPanel />
          </div>

          <div className="platform-shell rounded-2xl p-6">
            <h2 className="font-semibold mb-4">Planning inventory</h2>
            <div className="grid sm:grid-cols-3 gap-4 mb-6 text-center">
              <div>
                <p className="text-3xl font-semibold">{networkNodes.length}</p>
                <p className="text-xs text-mist">Planning nodes</p>
              </div>
              <div>
                <p className="text-3xl font-semibold">{networkLinks.length}</p>
                <p className="text-xs text-mist">Proposed links</p>
              </div>
              <div>
                <p className="text-3xl font-semibold">0</p>
                <p className="text-xs text-mist">Live telemetry feeds</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#host-node"
                className="px-4 py-2 bg-amber-emergency text-ocean-deep font-semibold rounded-lg text-sm"
              >
                Host a Node
              </Link>
              <Link
                href="/#north-shore-pilot"
                className="px-4 py-2 border border-white/20 rounded-lg text-sm text-mist hover:text-white"
              >
                Join the Pilot
              </Link>
            </div>
          </div>
        </div>
      </main>
        }
      />
    </>
  );
}
