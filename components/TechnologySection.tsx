import { technologyStack, meshtasticVsReticulum } from "@/data/technologyStack";
import { nodeClasses, solarNodeDiagram } from "@/data/nodeClasses";
import { regulatoryWorkstream } from "@/data/regulatoryWorkstream";
import ReticulumArchitectureDiagram from "@/components/ReticulumArchitectureDiagram";
import OperationalStatusBadge from "@/components/OperationalStatusBadge";

export default function TechnologySection() {
  return (
    <section id="technology" className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-3">
          Technology
        </p>
        <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4">
          Voice + data + Internet
        </h2>
        <p className="text-ocean-mid max-w-3xl mb-10">
          No single technology does everything. KauaiInternet combines whatever communication paths
          remain available — and clearly labels what is operational vs. under evaluation.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {technologyStack.map((tech) => (
            <div key={tech.id} className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-ocean-deep">{tech.name}</h3>
                <OperationalStatusBadge status={tech.status} />
              </div>
              <p className="text-xs text-ridge-mid font-medium mb-2">{tech.role}</p>
              <p className="text-sm text-ocean-mid leading-relaxed">{tech.summary}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <ReticulumArchitectureDiagram />
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-semibold text-ocean-deep mb-3">Meshtastic vs Reticulum</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-ocean-deep">{meshtasticVsReticulum.meshtastic.label}</p>
                  <p className="text-xs text-ridge-mid mt-1">{meshtasticVsReticulum.meshtastic.role}</p>
                  <p className="text-ocean-mid mt-2">{meshtasticVsReticulum.meshtastic.bestFor}</p>
                </div>
                <div>
                  <p className="font-medium text-ocean-deep">{meshtasticVsReticulum.reticulum.label}</p>
                  <p className="text-xs text-ridge-mid mt-1">{meshtasticVsReticulum.reticulum.role}</p>
                  <p className="text-ocean-mid mt-2">{meshtasticVsReticulum.reticulum.bestFor}</p>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-semibold text-ocean-deep mb-3">{solarNodeDiagram.title}</h3>
              <OperationalStatusBadge status="proposed" className="mb-3" />
              <div className="space-y-1 text-sm font-mono text-ocean-mid">
                {solarNodeDiagram.components.map((c, i) => (
                  <div key={c.id}>
                    {c.label}
                    {i < solarNodeDiagram.components.length - 1 && (
                      <span className="block text-center text-mist py-0.5">↓</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold text-ocean-deep mb-4">Node classes</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {nodeClasses.map((nc) => (
              <div key={nc.id} className="rounded-xl border border-sand-warm bg-sand-light/50 p-4">
                <p className="text-lg font-bold text-ocean-deep">{nc.id}</p>
                <p className="text-sm font-medium text-ocean-deep">{nc.name}</p>
                <p className="text-xs text-ocean-mid mt-2">{nc.summary}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-amber-emergency/20 bg-amber-emergency/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-ocean-deep mb-2">
            Regulatory workstream
          </p>
          <p className="text-sm text-ocean-mid">{regulatoryWorkstream.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
