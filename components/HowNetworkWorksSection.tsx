import { networkPathConcept } from "@/data/networkLayers";

export default function HowNetworkWorksSection() {
  return (
    <section id="how-it-works" className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-3">
          Architecture
        </p>
        <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4">
          How the network works
        </h2>
        <p className="text-ocean-mid max-w-3xl mb-10 leading-relaxed">
          Traditional Internet architecture stops when the upstream connection disappears.
          KauaiInternet routes traffic through a local resilient layer and selects the{" "}
          <strong className="text-ocean-deep">best available path</strong> — fiber, wireless,
          satellite, radio, or mesh.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass-card rounded-2xl p-6">
            <p className="text-xs uppercase tracking-widest text-ridge-mid mb-4">Traditional</p>
            <div className="space-y-2 text-sm text-ocean-mid font-mono">
              {["Device", "ISP", "Internet", "Service"].map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-200 text-ocean-deep text-xs flex items-center justify-center">
                    {i + 1}
                  </span>
                  {step}
                  {i < 3 && <span className="text-mist ml-auto">↓</span>}
                </div>
              ))}
            </div>
            <p className="text-xs text-ocean-mid mt-4">
              If upstream fails, communication often stops entirely.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border-amber-emergency/20">
            <p className="text-xs uppercase tracking-widest text-amber-emergency mb-4">
              KauaiInternet
            </p>
            <div className="space-y-2 text-sm text-ocean-deep font-mono">
              {networkPathConcept.steps.map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-emergency/20 text-ocean-deep text-xs flex items-center justify-center">
                    {i + 1}
                  </span>
                  {step}
                  {i < networkPathConcept.steps.length - 1 && (
                    <span className="text-mist ml-auto">↓</span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-ocean-mid mt-4">
              Local Kauaʻi traffic can continue even when mainland connectivity is lost.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {networkPathConcept.paths.map((p) => (
            <span
              key={p}
              className="px-3 py-1 rounded-full bg-sand-warm text-ocean-deep text-xs font-medium"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
