import { businessModel } from "@/data/businessModel";
import { kauaiMessagingConcept, messagingDisclaimer } from "@/data/messagePriorities";
import HardwareKitCards from "@/components/HardwareKitCards";

export default function CommunityResilienceSection() {
  return (
    <section className="section-padding bg-sand-light">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-3">
          Community Resilience
        </p>
        <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4">
          A network the island can depend on
        </h2>
        <p className="text-ocean-mid max-w-3xl mb-6">{businessModel.principle}</p>

        <div className="glass-card rounded-2xl p-6 mb-10">
          <h3 className="font-semibold text-ocean-deep mb-2">{kauaiMessagingConcept.title}</h3>
          <p className="text-sm text-ocean-mid mb-4">
            Future lightweight messaging — transport selected automatically by the network.
          </p>
          <div className="grid sm:grid-cols-2 gap-2 mb-4">
            {kauaiMessagingConcept.functions.map((f) => (
              <span key={f} className="text-xs text-ocean-mid flex gap-2">
                <span className="text-amber-emergency">•</span>
                {f}
              </span>
            ))}
          </div>
          <p className="text-xs text-amber-800 bg-amber-emergency/10 rounded-lg p-3">
            {messagingDisclaimer}
          </p>
        </div>

        <h3 className="font-semibold text-ocean-deep mb-4">Hardware concepts</h3>
        <HardwareKitCards />
      </div>
    </section>
  );
}
