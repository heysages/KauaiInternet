import PlanningPlatform from "@/components/PlanningPlatform";

export default function PlanningToolsSection() {
  return (
    <section id="planning" className="bg-ocean-deep">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-16 pb-6">
        <p className="text-amber-glow font-semibold text-sm tracking-widest uppercase mb-3">
          Planning Tools
        </p>
        <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-white mb-3 text-balance">
          Explore the details together
        </h2>
        <p className="text-mist text-lg max-w-2xl leading-relaxed">
          The community map above is welcoming and open to every voice. This section goes
          deeper — for neighbors, volunteers, and planners who want to explore scenarios,
          site information, resilience scores, and technical options we are still evaluating.
        </p>
      </div>
      <div className="max-w-[1400px] mx-auto mb-16 sm:mx-8 lg:mx-auto sm:rounded-2xl overflow-hidden">
        <PlanningPlatform embedded />
      </div>
    </section>
  );
}
