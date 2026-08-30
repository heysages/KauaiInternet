"use client";

import dynamic from "next/dynamic";
import MapLinkLegend from "@/components/MapLinkLegend";
import RouteSimulationPanel from "@/components/RouteSimulationPanel";
import OperationalStatusBadge from "@/components/OperationalStatusBadge";

const PlanningPlatform = dynamic(() => import("@/components/PlanningPlatform"), {
  ssr: false,
  loading: () => (
    <div className="h-[480px] flex items-center justify-center text-mist text-sm">
      Loading network map…
    </div>
  ),
});

export default function NetworkMapSection() {
  return (
    <section id="network-map" className="section-padding bg-ocean-deep text-white">
      <div className="max-w-[1400px] mx-auto mb-6">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-sand-warm">
            Network Map
          </p>
          <OperationalStatusBadge status="proposed" />
        </div>
        <h2 className="heading-display text-3xl sm:text-4xl font-semibold mb-3">
          Infrastructure planning map
        </h2>
        <p className="text-mist max-w-3xl mb-4">
          Explore proposed nodes, link types, and planning areas. All locations are approximate
          until field surveys and permissions are complete.
        </p>
        <MapLinkLegend dark />
      </div>
      <div className="max-w-[1400px] mx-auto sm:rounded-2xl overflow-hidden">
        <PlanningPlatform embedded />
      </div>
      <div className="max-w-[1400px] mx-auto mt-6">
        <div className="max-w-2xl">
          <RouteSimulationPanel />
        </div>
      </div>
    </section>
  );
}
