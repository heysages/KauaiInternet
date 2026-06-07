import { partnerOpportunities } from "@/data/partnerOpportunities";

export default function PartnerOpportunitiesSection() {
  return (
    <section id="projects" className="section-padding bg-sand-light">
      <div className="max-w-6xl mx-auto">
        <p className="text-ridge-mid font-semibold text-sm tracking-widest uppercase mb-3">
          Partner Opportunities
        </p>
        <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4 text-balance">
          Projects you can help bring to life
        </h2>
        <p className="text-ocean-mid text-lg max-w-2xl leading-relaxed mb-12">
          Each initiative starts with a simple question: who benefits, and how can neighbors
          participate?
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {partnerOpportunities.map((project) => (
            <article key={project.id} className="glass-card rounded-2xl p-6 sm:p-8">
              <h3 className="heading-display text-xl font-semibold text-ocean-deep mb-4">
                {project.title}
              </h3>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ridge-mid mb-1">
                    Why it matters
                  </p>
                  <p className="text-ocean-mid leading-relaxed">{project.whyItMatters}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ridge-mid mb-1">
                    Who benefits
                  </p>
                  <p className="text-ocean-mid leading-relaxed">{project.whoBenefits}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ridge-mid mb-2">
                    Ways to participate
                  </p>
                  <ul className="space-y-1.5">
                    {project.waysToParticipate.map((way) => (
                      <li key={way} className="flex gap-2 text-ocean-mid">
                        <span className="text-amber-emergency shrink-0">→</span>
                        {way}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <a
                href="#support"
                className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-ridge-mid hover:text-ridge-dark transition-colors"
              >
                Offer your support
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
