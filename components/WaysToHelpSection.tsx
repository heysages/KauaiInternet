import { waysToHelp } from "@/data/waysToHelp";

export default function WaysToHelpSection() {
  return (
    <section id="help" className="section-padding gradient-ocean text-white">
      <div className="max-w-6xl mx-auto">
        <p className="text-amber-glow font-semibold text-sm tracking-widest uppercase mb-3">
          Ways to Help
        </p>
        <h2 className="heading-display text-3xl sm:text-4xl font-semibold mb-4 text-balance">
          Everyone has a role in a more resilient Kauai
        </h2>
        <p className="text-mist text-lg max-w-2xl leading-relaxed mb-12">
          Participation should feel welcoming and simple. Choose the path that fits you —
          or just say you want to stay informed.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {waysToHelp.map((way) => (
            <a
              key={way.id}
              href={way.href}
              className="group bg-white/6 border border-white/12 rounded-2xl p-6 hover:bg-white/10 hover:border-amber-emergency/30 transition-colors"
            >
              <h3 className="font-semibold text-white mb-2 group-hover:text-amber-glow transition-colors">
                {way.label}
              </h3>
              <p className="text-mist text-sm leading-relaxed">{way.description}</p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-glow mt-4 opacity-80 group-hover:opacity-100">
                Get started
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
