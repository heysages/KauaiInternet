import { useCases } from "@/data/useCases";
import { networkAssetCategories } from "@/data/categories";

const categoryLabels = Object.fromEntries(
  networkAssetCategories.map((c) => [c.id, c.label])
);

export default function UseCasesSection() {
  return (
    <section id="use-cases" className="section-padding gradient-sand">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-12">
          <p className="text-ridge-mid font-semibold text-sm tracking-widest uppercase mb-3">
            Use Cases
          </p>
          <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4 text-balance">
            What this network enables on Kauai
          </h2>
          <p className="text-ocean-mid text-lg leading-relaxed">
            Real scenarios the gear and sites are being planned for — each scoped
            as a pilot contribution, not a claim of full deployment.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {useCases.map((uc) => (
            <article
              key={uc.id}
              className="glass-card rounded-2xl p-6 hover:shadow-md hover:shadow-ocean-deep/5 transition-shadow flex flex-col"
            >
              <span className="text-[10px] font-semibold uppercase tracking-wider text-ridge-mid mb-3">
                {categoryLabels[uc.category] ?? uc.category}
              </span>
              <h3 className="heading-display text-lg font-semibold text-ocean-deep mb-2">
                {uc.title}
              </h3>
              <p className="text-sm text-ocean-mid leading-relaxed mb-4 flex-grow">
                {uc.description}
              </p>
              <div className="pt-4 border-t border-ocean-deep/8">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-emergency mb-1.5">
                  Pilot role
                </p>
                <p className="text-sm text-ocean-deep leading-relaxed">
                  {uc.pilotRole}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
