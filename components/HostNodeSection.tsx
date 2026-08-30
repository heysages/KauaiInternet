import HostNodeForm from "@/components/HostNodeForm";

export default function HostNodeSection() {
  return (
    <section id="host-node" className="section-padding gradient-sand">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-3">
          Host a Node
        </p>
        <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4">
          Volunteer infrastructure for Kauaʻi
        </h2>
        <p className="text-ocean-mid mb-8 leading-relaxed">
          Community members can help by hosting nodes — roof access, tower sites, solar, fiber,
          Starlink, generator backup, or technical skills. Precise site details are kept private
          and reviewed by our team before any public map display.
        </p>
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <HostNodeForm />
        </div>
      </div>
    </section>
  );
}
