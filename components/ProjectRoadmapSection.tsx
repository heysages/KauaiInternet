import { communityRoadmap } from "@/data/communityRoadmap";

export default function ProjectRoadmapSection() {
  return (
    <section id="roadmap" className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        <p className="text-ridge-mid font-semibold text-sm tracking-widest uppercase mb-3">
          Project Roadmap
        </p>
        <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4 text-balance">
          Built step by step, with the community
        </h2>
        <p className="text-ocean-mid text-lg max-w-2xl leading-relaxed mb-12">
          We are exploring a long-term community effort — not announcing a finished plan.
          Each phase listens, learns, and earns trust.
        </p>

        <div className="grid lg:grid-cols-3 gap-6">
          {communityRoadmap.map((phase) => (
            <article key={phase.phase} className="glass-card rounded-2xl p-6 flex flex-col">
              <span className="text-4xl font-semibold text-ocean-deep/15 tabular-nums mb-3">
                {String(phase.phase).padStart(2, "0")}
              </span>
              <h3 className="heading-display text-xl font-semibold text-ocean-deep mb-3">
                {phase.title}
              </h3>
              <p className="text-ocean-mid text-sm leading-relaxed mb-5 flex-1">
                {phase.description}
              </p>
              <ul className="space-y-2 border-t border-ocean-mid/10 pt-4">
                {phase.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm text-ocean-mid">
                    <span className="text-ridge-light shrink-0">✓</span>
                    {h}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
