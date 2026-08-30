import AdminShell from "@/components/admin/AdminShell";
import { strategySections } from "@/data/regulatoryWorkstream";
import { businessModel, hardwareEconomics } from "@/data/businessModel";
import { networkRoadmap } from "@/data/networkRoadmap";
import { northShorePilot } from "@/data/northShorePilot";
import { networkMetrics } from "@/data/networkMetrics";
import { regulatoryWorkstream } from "@/data/regulatoryWorkstream";

export default function AdminStrategyPage() {
  return (
    <AdminShell title="Strategy & operating plan">
      <p className="text-xs text-mist mb-8">
        Living plan from static data — last updated {strategySections.lastUpdated}. Edit source
        files in <code className="text-amber-glow/80">data/</code> to revise.
      </p>

      <div className="space-y-8">
        <Section title="Mission" body={strategySections.mission} />
        <Section title="Technology plan" body={strategySections.technologyPlan} />
        <Section title="Network plan" body={strategySections.networkPlan} />
        <Section title="Pilot plan" body={strategySections.pilotPlan} />
        <Section title="Capital requirements" body={strategySections.capitalRequirements} />

        <div className="platform-panel rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white mb-3">Business model</h2>
          <p className="text-sm text-mist mb-4">{businessModel.principle}</p>
          <ul className="grid sm:grid-cols-2 gap-2 text-xs text-mist">
            {businessModel.models.map((m) => (
              <li key={m.id}>
                <strong className="text-white">{m.title}</strong> — {m.description}
              </li>
            ))}
          </ul>
        </div>

        <div className="platform-panel rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white mb-3">Hardware economics (assumptions)</h2>
          <ul className="text-xs text-mist space-y-1">
            {hardwareEconomics.ranges.map((r) => (
              <li key={r.item} className="flex justify-between">
                <span>{r.item}</span>
                <span className="text-amber-glow">{r.range}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="platform-panel rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white mb-3">North Shore pilot budget</h2>
          <p className="text-sm text-amber-glow mb-2">{northShorePilot.budget.targetRange}</p>
          <p className="text-xs text-mist">{northShorePilot.budget.excluded.join("; ")}</p>
        </div>

        <div className="platform-panel rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white mb-3">Roadmap</h2>
          <ul className="space-y-3">
            {networkRoadmap.map((p) => (
              <li key={p.phase} className="text-xs text-mist">
                <span className="text-white font-medium">
                  Phase {p.phase}: {p.title}
                </span>{" "}
                — {p.summary}
              </li>
            ))}
          </ul>
        </div>

        <div className="platform-panel rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white mb-3">Mission metrics (definitions)</h2>
          <ul className="grid sm:grid-cols-2 gap-1 text-xs text-mist">
            {networkMetrics.metrics.map((m) => (
              <li key={m.id}>{m.label}</li>
            ))}
          </ul>
        </div>

        <div className="platform-panel rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white mb-3">Risks</h2>
          <ul className="text-xs text-mist list-disc pl-4 space-y-1">
            {strategySections.risks.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>

        <div className="platform-panel rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white mb-3">Regulatory questions</h2>
          <p className="text-xs text-mist mb-3">{regulatoryWorkstream.disclaimer}</p>
          <ul className="text-xs text-mist space-y-2">
            {regulatoryWorkstream.topics.map((t) => (
              <li key={t.area}>
                <strong className="text-white">{t.area}</strong>: {t.question}
              </li>
            ))}
          </ul>
        </div>

        <div className="platform-panel rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white mb-3">Decisions log</h2>
          <ul className="text-xs text-mist space-y-2">
            {strategySections.decisions.map((d) => (
              <li key={d.date}>
                <span className="text-amber-glow">{d.date}</span> — {d.decision}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AdminShell>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div className="platform-panel rounded-2xl p-5">
      <h2 className="text-sm font-semibold text-white mb-2">{title}</h2>
      <p className="text-sm text-mist leading-relaxed">{body}</p>
    </div>
  );
}
