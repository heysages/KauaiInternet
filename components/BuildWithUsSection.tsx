import { waysToHelp } from "@/data/waysToHelp";

export default function BuildWithUsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-3">
          Build With Us
        </p>
        <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4">
          Help shape Kauaʻi&apos;s communications future
        </h2>
        <p className="text-ocean-mid max-w-3xl mb-8">
          Whether you can host a node, share local knowledge, volunteer technical skills, or
          support the pilot — there is a place for you in this community effort.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {waysToHelp.map((w) => (
            <div key={w.id} className="glass-card rounded-xl p-4">
              <h3 className="font-semibold text-ocean-deep text-sm mb-2">{w.label}</h3>
              <p className="text-xs text-ocean-mid leading-relaxed">{w.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#host-node"
            className="px-5 py-2.5 bg-amber-emergency text-ocean-deep font-semibold rounded-xl text-sm"
          >
            Host a Node
          </a>
          <a
            href="#support"
            className="px-5 py-2.5 border border-ocean-mid/30 text-ocean-deep font-medium rounded-xl text-sm"
          >
            Get Involved
          </a>
          <a
            href="#map"
            className="px-5 py-2.5 border border-ocean-mid/30 text-ocean-deep font-medium rounded-xl text-sm"
          >
            Map the Island
          </a>
        </div>
      </div>
    </section>
  );
}
