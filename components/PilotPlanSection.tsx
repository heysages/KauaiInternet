import { pilotPhases } from "@/data/pilotPhases";

const statusStyles = {
  current: {
    badge: "bg-amber-emergency/15 text-amber-emergency border-amber-emergency/30",
    label: "Phase 1 · In planning",
    ring: "ring-amber-emergency/40",
  },
  next: {
    badge: "bg-ridge-light/15 text-ridge-dark border-ridge-light/30",
    label: "Next",
    ring: "ring-ridge-light/30",
  },
  future: {
    badge: "bg-ocean-mid/10 text-ocean-mid border-ocean-mid/20",
    label: "Future",
    ring: "ring-ocean-mid/20",
  },
};

export default function PilotPlanSection() {
  return (
    <section id="pilot-plan" className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="text-ridge-mid font-semibold text-sm tracking-widest uppercase mb-3">
            Pilot Plan
          </p>
          <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4 text-balance">
            Three phases to island-wide resilience
          </h2>
          <p className="text-ocean-mid text-lg leading-relaxed">
            A honest, staged build — starting with contributed gear and community
            partners, growing into coordinated anchors, and eventually island-owned
            edge infrastructure.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-5">
          {pilotPhases.map((phase) => {
            const style = statusStyles[phase.status];
            return (
              <div
                key={phase.phase}
                className={`glass-card rounded-2xl p-7 flex flex-col ring-1 ${style.ring} hover:shadow-lg hover:shadow-ocean-deep/5 transition-shadow`}
              >
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="heading-display text-4xl font-semibold text-ocean-deep/20">
                    {String(phase.phase).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${style.badge}`}
                  >
                    {style.label}
                  </span>
                </div>

                <h3 className="heading-display text-xl font-semibold text-ocean-deep mb-3">
                  {phase.title}
                </h3>
                <p className="text-ocean-mid text-sm leading-relaxed mb-6">
                  {phase.summary}
                </p>

                <ul className="space-y-3 mt-auto">
                  {phase.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-2.5 text-sm text-ocean-mid">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-ridge-light/15 text-ridge-mid flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </span>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
