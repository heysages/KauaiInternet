const problems = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    title: "Emergency Fragility",
    description:
      "When storms hit or fiber paths fail, Kauai loses connectivity fast. First responders, hospitals, and residents are left without reliable comms.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: "Remote & Ridge Gaps",
    description:
      "North shore valleys, west-side canyons, and ridge communities sit outside reliable coverage. Geography makes single-path networks brittle.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
    title: "Storm & Outage Risk",
    description:
      "Submarine cables, landslides, and flooding routinely disrupt island-wide service. One failure can cascade across the entire grid.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "Tourist & Peak Load",
    description:
      "Visitor surges strain existing capacity. Seasonal demand spikes leave locals competing for bandwidth when they need it most.",
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="section-padding gradient-sand">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="text-amber-emergency font-semibold text-sm tracking-widest uppercase mb-3">
            The Challenge
          </p>
          <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-5 text-balance">
            Island connectivity is fragile when it matters most
          </h2>
          <p className="text-ocean-mid text-lg leading-relaxed">
            Kauai depends on a handful of paths for internet access. When those paths
            fail — during hurricanes, floods, or infrastructure outages — the whole
            island feels it. We need infrastructure designed for resilience, not just
            speed.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="glass-card rounded-2xl p-6 lg:p-8 hover:shadow-lg hover:shadow-ocean-deep/5 transition-shadow group"
            >
              <div className="w-12 h-12 rounded-xl bg-ocean-deep/8 text-ocean-mid flex items-center justify-center mb-5 group-hover:bg-amber-emergency/15 group-hover:text-amber-emergency transition-colors">
                {problem.icon}
              </div>
              <h3 className="heading-display text-xl font-semibold text-ocean-deep mb-3">
                {problem.title}
              </h3>
              <p className="text-ocean-mid leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 lg:p-8 rounded-2xl border border-amber-emergency/30 bg-amber-emergency/8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-emergency flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-ocean-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-ocean-deep font-medium leading-relaxed">
              <span className="font-semibold">In 2024,</span> Kauai experienced multiple
              multi-hour outages affecting emergency communications, telehealth, and
              remote learning. A resilient local network changes that equation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
