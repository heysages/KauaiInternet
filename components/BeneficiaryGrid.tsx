const beneficiaries = [
  {
    name: "Emergency Services",
    description: "Reliable comms for police, fire, and search & rescue during island-wide outages.",
    icon: "🚨",
    highlight: true,
  },
  {
    name: "Residents",
    description: "Stable home internet and community Wi-Fi when storms knock out primary service.",
    icon: "🏠",
    highlight: false,
  },
  {
    name: "Tourists & Visitors",
    description: "Safety alerts, navigation, and connectivity that doesn't vanish during peak season.",
    icon: "🌺",
    highlight: false,
  },
  {
    name: "Schools",
    description: "Uninterrupted learning with local caching and resilient connections for remote education.",
    icon: "📚",
    highlight: false,
  },
  {
    name: "Healthcare",
    description: "Telehealth continuity and hospital data links that survive infrastructure failures.",
    icon: "🏥",
    highlight: true,
  },
  {
    name: "Local Businesses",
    description: "POS systems, reservations, and operations stay online through redundant paths.",
    icon: "🏪",
    highlight: false,
  },
  {
    name: "Prominent Residents",
    description: "Island leaders and landowners who can host relay sites and sponsor infrastructure.",
    icon: "🤝",
    highlight: false,
  },
  {
    name: "Remote Workers",
    description: "Dependable bandwidth for the growing community of island-based remote professionals.",
    icon: "💻",
    highlight: false,
  },
];

export default function BeneficiaryGrid() {
  return (
    <section className="section-padding bg-ocean-deep text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-amber-glow font-semibold text-sm tracking-widest uppercase mb-3">
            Who Benefits
          </p>
          <h2 className="heading-display text-3xl sm:text-4xl font-semibold mb-5 text-balance">
            A network that serves everyone on the island
          </h2>
          <p className="text-mist text-lg leading-relaxed">
            From first responders to families, from schools to small businesses —
            resilient infrastructure is a public good.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {beneficiaries.map((b) => (
            <div
              key={b.name}
              className={`rounded-2xl p-5 lg:p-6 transition-transform hover:-translate-y-1 ${
                b.highlight
                  ? "bg-amber-emergency/15 border border-amber-glow/30"
                  : "bg-white/5 border border-white/10"
              }`}
            >
              <span className="text-2xl mb-3 block" role="img" aria-hidden="true">
                {b.icon}
              </span>
              <h3 className="font-semibold text-sm lg:text-base mb-2">{b.name}</h3>
              <p className="text-mist text-xs lg:text-sm leading-relaxed">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
