import { networkLayers } from "@/data/networkLayers";
import OperationalStatusBadge from "@/components/OperationalStatusBadge";

export default function NetworkLayersSection() {
  return (
    <section className="section-padding gradient-ocean text-white">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-sand-warm mb-3">
          Three layers
        </p>
        <h2 className="heading-display text-3xl sm:text-4xl font-semibold mb-4">
          One resilient communications stack
        </h2>
        <p className="text-mist max-w-3xl mb-10">
          Internet access is one service. The network combines overlapping layers so Kauaʻi can
          communicate when any single technology fails.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {networkLayers.map((layer, i) => (
            <div
              key={layer.id}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-light text-sand-warm/60">0{i + 1}</span>
                <OperationalStatusBadge status="planned" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{layer.name}</h3>
              <p className="text-sm text-mist mb-4 leading-relaxed">{layer.purpose}</p>
              <ul className="space-y-1">
                {layer.technologies.slice(0, 5).map((t) => (
                  <li key={t} className="text-xs text-sand-warm/90 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-amber-glow" />
                    {t}
                  </li>
                ))}
                {layer.technologies.length > 5 && (
                  <li className="text-xs text-mist">+{layer.technologies.length - 5} more</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
