const pillars = [
  {
    number: "01",
    title: "Local Edge & Compute",
    description:
      "Island-hosted edge nodes cache critical data, run local DNS, and relay emergency alerts — keeping services alive even when upstream links fail.",
    accent: "bg-ocean-mid",
  },
  {
    number: "02",
    title: "Redundant Paths",
    description:
      "Mesh relays across ridge lines, satellite backhaul, and multiple fiber entry points ensure no single failure takes the network down.",
    accent: "bg-ridge-mid",
  },
  {
    number: "03",
    title: "Emergency-First Wireless",
    description:
      "Battery-backed radios and solar-powered relays maintain connectivity through 72+ hours of grid outage — designed for disaster scenarios first.",
    accent: "bg-amber-emergency",
  },
  {
    number: "04",
    title: "Community Wi-Fi",
    description:
      "Public access points at schools, community centers, and assembly points give everyone a connection when home internet goes dark.",
    accent: "bg-ridge-light",
  },
  {
    number: "05",
    title: "Edge Data Center",
    description:
      "A community-governed edge facility in Līhuʻe aggregates traffic, hosts local services, and provides a staging ground for rapid deployment.",
    accent: "bg-ocean-light",
  },
];

export default function VisionSection() {
  return (
    <section id="vision" className="section-padding bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-24">
            <p className="text-ridge-mid font-semibold text-sm tracking-widest uppercase mb-3">
              Our Vision
            </p>
            <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-5 text-balance">
              Infrastructure built for the island, by the community
            </h2>
            <p className="text-ocean-mid text-lg leading-relaxed mb-8">
              The Kauai Resilience Network is not another telecom play. It&apos;s a
              civic infrastructure layer — locally operated, emergency-ready, and
              designed around the geography and people of this place.
            </p>

            <div className="relative rounded-2xl overflow-hidden aspect-video border border-ocean-deep/10">
              <div className="absolute inset-0 gradient-ocean" />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="text-center text-white">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-amber-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  </div>
                  <p className="heading-display text-lg font-semibold">Emergency-first design</p>
                  <p className="text-mist text-sm mt-1">Power, paths, and people — in that order</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="glass-card rounded-2xl p-6 flex gap-5 hover:shadow-md transition-shadow"
              >
                <div
                  className={`shrink-0 w-10 h-10 rounded-lg ${pillar.accent} flex items-center justify-center text-white text-xs font-bold`}
                >
                  {pillar.number}
                </div>
                <div>
                  <h3 className="heading-display text-lg font-semibold text-ocean-deep mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-ocean-mid leading-relaxed text-sm">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
