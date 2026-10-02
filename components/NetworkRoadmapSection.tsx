import { networkRoadmap } from "@/data/networkRoadmap";
import { rolloutStages } from "@/data/resilienceMission";
import OperationalStatusBadge from "@/components/OperationalStatusBadge";

const statusToBadge = {
  current: "testing" as const,
  next: "planned" as const,
  future: "proposed" as const,
  complete: "live" as const,
};

export default function NetworkRoadmapSection() {
  return (
    <section id="roadmap" className="section-padding gradient-sand">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-3">
          Roadmap
        </p>
        <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4">
          Building island communications
        </h2>
        <p className="text-ocean-mid max-w-3xl mb-6">
          North Shore Pilot, then North/East expansion, then an island backbone.
          The phase list below is the longer record. Nothing here implies guaranteed
          timelines or funding.
        </p>

        <ol className="grid sm:grid-cols-3 gap-3 mb-10">
          {rolloutStages.map((stage, index) => (
            <li key={stage.id} className="rounded-xl bg-white/70 border border-sand-warm px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-1">
                Stage {index + 1}
                {index < rolloutStages.length - 1 ? " →" : ""}
              </p>
              <p className="text-sm font-semibold text-ocean-deep">{stage.title}</p>
            </li>
          ))}
        </ol>

        <div className="space-y-4">
          {networkRoadmap.map((phase) => (
            <div key={phase.phase}>
              {phase.phase === 4 && (
                <p className="text-sm font-semibold text-ocean-deep mb-4">
                  Island backbone and the work that follows the corridor
                </p>
              )}
            <div className="glass-card rounded-2xl p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="text-2xl font-light text-ridge-mid">
                  {String(phase.phase).padStart(2, "0")}
                </span>
                <h3 className="font-semibold text-ocean-deep text-lg">{phase.title}</h3>
                <OperationalStatusBadge status={statusToBadge[phase.status]} />
              </div>
              <p className="text-sm text-ocean-mid mb-3">{phase.summary}</p>
              <ul className="flex flex-wrap gap-2">
                {phase.outcomes.map((o) => (
                  <li
                    key={o}
                    className="text-xs px-2 py-1 rounded-md bg-sand-warm/80 text-ocean-deep"
                  >
                    {o}
                  </li>
                ))}
              </ul>
            </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
