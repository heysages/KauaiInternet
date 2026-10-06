import { ScenarioBudgetSummary } from "@/components/ScenarioCost";
import OperationalStatusBadge from "@/components/OperationalStatusBadge";
import { northShorePilot } from "@/data/northShorePilot";
import { costEstimateNote } from "@/data/resilienceMission";

export default function NorthShorePilotSection() {
  return (
    <section id="north-shore-pilot" className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid">
            Pilot Program
          </p>
          <OperationalStatusBadge status="proposed" />
        </div>
        <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4">
          {northShorePilot.title}
        </h2>
        <p className="text-ocean-mid max-w-3xl mb-8">{northShorePilot.summary}</p>

        <div className="flex flex-wrap items-center gap-2 mb-8 p-4 rounded-xl bg-sand-light border border-sand-warm">
          {northShorePilot.corridorLabels.map((label, i) => (
            <span key={label} className="flex items-center gap-2 text-sm font-medium text-ocean-deep">
              {label}
              {i < northShorePilot.corridorLabels.length - 1 && (
                <span className="text-mist">↓</span>
              )}
            </span>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-ocean-deep mb-3">Pilot goals</h3>
            <ul className="space-y-2">
              {northShorePilot.goals.map((g) => (
                <li key={g} className="text-sm text-ocean-mid flex gap-2">
                  <span className="text-amber-emergency shrink-0">○</span>
                  {g}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-ocean-deep mb-3">Checklist</h3>
            <ul className="space-y-2">
              {northShorePilot.checklist.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 text-sm text-ocean-mid glass-card rounded-lg px-3 py-2"
                >
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      item.status === "complete"
                        ? "bg-emerald-500"
                        : item.status === "in-progress"
                          ? "bg-amber-emergency"
                          : "bg-slate-300"
                    }`}
                  />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 glass-card rounded-2xl p-6">
          <ScenarioBudgetSummary />
          <p className="text-xs text-ocean-mid/80">{costEstimateNote}</p>
          <a
            href="#cost"
            className="inline-flex mt-3 text-sm font-semibold text-ocean-deep underline underline-offset-2"
          >
            See the cost section
          </a>
          <a
            href="#host-node"
            className="inline-flex mt-4 px-5 py-2.5 bg-amber-emergency text-ocean-deep font-semibold rounded-xl text-sm hover:bg-amber-glow transition-colors"
          >
            Join the Pilot
          </a>
        </div>
      </div>
    </section>
  );
}
