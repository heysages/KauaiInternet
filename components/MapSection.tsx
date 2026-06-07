import PlanningPlatform from "@/components/PlanningPlatform";

export default function MapSection() {
  return (
    <section id="map" className="bg-ocean-deep section-padding !pt-24 lg:!pt-28">
      <div className="max-w-[1400px] mx-auto mb-6">
        <p className="text-amber-glow font-semibold text-sm tracking-widest uppercase mb-3">
          Island Planning Map
        </p>
        <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-white mb-3 text-balance">
          Plan Kauai&apos;s resilience network together
        </h2>
        <p className="text-mist text-lg max-w-2xl leading-relaxed">
          Explore scenarios, toggle layers, and click candidate sites to understand
          benefits, challenges, and community support. All locations are approximate.
        </p>
      </div>
      <div className="max-w-[1400px] mx-auto">
        <PlanningPlatform />
      </div>
    </section>
  );
}
