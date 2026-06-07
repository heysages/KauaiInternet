import { digitalTwinPhases, futureTwinFeatures } from "@/data/digitalTwinPhases";

const statusStyles = {
  current: "bg-ridge-light/15 text-ridge-light border-ridge-light/30",
  next: "bg-amber-emergency/15 text-amber-glow border-amber-emergency/30",
  future: "bg-ocean-light/15 text-mist border-white/15",
};

export default function DigitalTwinRoadmap() {
  return (
    <section id="digital-twin" className="section-padding bg-sand-light">
      <div className="max-w-6xl mx-auto">
        <p className="text-ocean-mid font-semibold text-sm tracking-widest uppercase mb-3">
          Long-range planning
        </p>
        <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4 text-balance">
          What we might explore over time
        </h2>
        <p className="text-ocean-mid text-lg max-w-2xl leading-relaxed mb-12">
          For planners, volunteers, and curious neighbors — a look at how community planning
          could evolve toward deeper modeling, coverage analysis, and island-wide coordination.
          We are exploring these ideas; nothing here is predetermined.
        </p>

        <div className="grid lg:grid-cols-3 gap-6 mb-14">
          {digitalTwinPhases.map((phase) => (
            <article
              key={phase.phase}
              className="glass-card rounded-2xl p-6 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-semibold text-ocean-deep/20 tabular-nums">
                  {String(phase.phase).padStart(2, "0")}
                </span>
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${statusStyles[phase.status]}`}
                >
                  {phase.status === "current"
                    ? "Phase 1 · Now"
                    : phase.status === "next"
                      ? "Phase 2 · Next"
                      : "Phase 3 · Future"}
                </span>
              </div>
              <h3 className="heading-display text-xl font-semibold text-ocean-deep mb-1">
                {phase.title}
              </h3>
              <p className="text-sm text-ocean-mid font-medium mb-3">{phase.subtitle}</p>
              <p className="text-sm text-ocean-mid/90 leading-relaxed mb-4 flex-1">
                {phase.description}
              </p>
              <ul className="space-y-2 border-t border-ocean-mid/10 pt-4">
                {phase.capabilities.map((cap) => (
                  <li key={cap} className="flex gap-2 text-sm text-ocean-mid">
                    <span className="text-ridge-light shrink-0">✓</span>
                    {cap}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <h3 className="heading-display text-xl font-semibold text-ocean-deep mb-4">
            Capabilities under discussion
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {futureTwinFeatures.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 rounded-xl bg-white/60 border border-ocean-mid/10 px-4 py-3 text-sm text-ocean-deep"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-emergency shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
