const steps = [
  {
    title: "3.2 kW solar",
    text: "Eight panels refill the bank on a clear day.",
    icon: <SunIcon />,
  },
  {
    title: "Batteries online",
    text: "Seven at each town hub, about 29 kWh usable, so the phone radio lasts 72 hours at full draw. The ridge relay stays at four.",
    icon: <BatteryIcon />,
  },
  {
    title: "One hot spare",
    text: "Pull a weak pack and bolt this one in. The packs still online stay on.",
    icon: <SwapIcon />,
  },
  {
    title: "Propane generator",
    text: "Refills the bank when the storm keeps the sun away.",
    icon: <GeneratorIcon />,
  },
];

export default function PowerPathDiagram() {
  return (
    <ol className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
      {steps.map((step) => (
        <li key={step.title} className="rounded-2xl border border-sand-warm bg-white p-4">
          <div className="mb-3 text-ocean-deep">{step.icon}</div>
          <p className="font-semibold text-ocean-deep text-sm mb-1">{step.title}</p>
          <p className="text-xs text-ocean-mid leading-relaxed">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 72 48" className="h-12 w-16" aria-hidden="true">
      <circle cx="22" cy="16" r="7" fill="#f4b942" />
      <path d="M8 34 h40 l-6 8 H14 z" fill="#0d2b45" />
      <path d="M16 34 l4 -8 h16 l4 8" fill="#3fa7b5" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg viewBox="0 0 72 48" className="h-12 w-16" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={6 + i * 16} y="14" width="12" height="26" rx="2" fill="#0d2b45" />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={9 + i * 16} y="22" width="6" height="14" fill="#7db9a6" />
      ))}
    </svg>
  );
}

function SwapIcon() {
  return (
    <svg viewBox="0 0 72 48" className="h-12 w-16" aria-hidden="true">
      <rect x="8" y="16" width="14" height="24" rx="2" fill="#0d2b45" />
      <rect x="28" y="16" width="14" height="24" rx="2" fill="#0d2b45" />
      <rect x="50" y="8" width="14" height="24" rx="2" fill="#3fa7b5" />
      <path d="M46 20 h6" stroke="#0d2b45" strokeWidth="2" />
    </svg>
  );
}

function GeneratorIcon() {
  return (
    <svg viewBox="0 0 72 48" className="h-12 w-16" aria-hidden="true">
      <rect x="8" y="16" width="40" height="24" rx="4" fill="#0d2b45" />
      <circle cx="22" cy="28" r="6" fill="none" stroke="#e6e2d6" strokeWidth="2" />
      <path d="M52 22 h10 v8 H52" fill="none" stroke="#7db9a6" strokeWidth="2" />
      <path d="M58 12 v6" stroke="#f4b942" strokeWidth="2" />
    </svg>
  );
}
