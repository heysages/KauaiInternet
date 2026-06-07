import {
  connectivityProviders,
  connectivityServiceLabels,
} from "@/data/connectivityProviders";

export default function ProviderOverviewSection() {
  return (
    <section id="providers" className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        <p className="text-ridge-mid font-semibold text-sm tracking-widest uppercase mb-3">
          What exists today
        </p>
        <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4 text-balance">
          Connectivity on Kauai — provider overview
        </h2>
        <p className="text-ocean-mid text-lg max-w-3xl leading-relaxed mb-4">
          Before exploring future possibilities, we start with what is publicly known about
          service types available on the island. We do not display coverage maps or claim
          service at specific addresses.
        </p>
        <p className="text-sm text-ocean-mid/90 max-w-3xl leading-relaxed mb-12 p-4 rounded-xl bg-sand-light border border-ocean-mid/10">
          <strong className="text-ocean-deep">Important:</strong> Availability varies by
          address and terrain. Always verify with providers directly. If you have local
          knowledge, share it on the map under &ldquo;What Residents Know.&rdquo;
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {connectivityProviders.map((provider) => (
            <article key={provider.id} className="glass-card rounded-2xl p-6">
              <h3 className="heading-display text-lg font-semibold text-ocean-deep mb-2">
                {provider.name}
              </h3>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {provider.serviceTypes.map((type) => (
                  <span
                    key={type}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-ocean-mid/10 text-ocean-mid border border-ocean-mid/15"
                  >
                    {connectivityServiceLabels[type]}
                  </span>
                ))}
              </div>
              <p className="text-sm text-ocean-mid leading-relaxed mb-2">
                {provider.description}
              </p>
              <p className="text-xs text-ocean-mid/85 leading-relaxed mb-2">
                {provider.generalAvailability}
              </p>
              <p className="text-[10px] text-ridge-mid leading-relaxed border-t border-ocean-mid/10 pt-2 mt-2">
                {provider.note}
              </p>
            </article>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <h3 className="heading-display text-xl font-semibold text-ocean-deep mb-4">
            Service types on Kauai
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(connectivityServiceLabels).map(([key, label]) => (
              <div
                key={key}
                className="flex items-center gap-3 rounded-xl bg-white/60 border border-ocean-mid/10 px-4 py-3"
              >
                <span className="w-2 h-2 rounded-full bg-ocean-mid shrink-0" />
                <span className="text-sm text-ocean-deep">{label}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-ocean-mid/80 mt-6 leading-relaxed">
            Emergency communications include county systems, amateur radio networks, and
            official alert channels. Detailed asset locations are not published here until
            verified — <strong>Data Needed</strong> in several areas.
          </p>
        </div>
      </div>
    </section>
  );
}
