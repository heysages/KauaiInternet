const steps = [
  {
    title: "Resilience hub",
    text: "A status note for roads, water, and aid, plus a place to charge a phone.",
    icon: <HubIcon />,
  },
  {
    title: "Wireless backbone",
    text: "A radio link from one hub to the next. On an ordinary day it is backhaul. In an outage the note still travels the corridor.",
    icon: <LinkIcon />,
  },
  {
    title: "Emergency mesh",
    text: "A short message from a handheld near the hub when phones are down.",
    icon: <MeshIcon />,
  },
];

export default function ArchitectureDiagram() {
  return (
    <ol className="grid lg:grid-cols-3 gap-3">
      {steps.map((step, index) => (
        <li key={step.title} className="glass-card rounded-2xl p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-ridge-mid">
              {index + 1}
            </span>
            {index < steps.length - 1 && (
              <span className="hidden lg:inline text-xs text-ocean-mid">then →</span>
            )}
          </div>
          <div className="mb-4 text-ocean-deep">{step.icon}</div>
          <h3 className="font-semibold text-ocean-deep mb-2">{step.title}</h3>
          <p className="text-sm text-ocean-mid leading-relaxed">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

function HubIcon() {
  return (
    <svg viewBox="0 0 160 96" className="h-24 w-40" aria-hidden="true">
      <rect x="18" y="40" width="70" height="44" rx="4" fill="#0d2b45" />
      <path d="M14 42 L53 18 L92 42" fill="none" stroke="#3fa7b5" strokeWidth="4" />
      <rect x="28" y="22" width="22" height="14" rx="1" fill="#7db9a6" transform="rotate(-28 39 29)" />
      <rect x="46" y="56" width="14" height="28" fill="#e6e2d6" />
      <circle cx="118" cy="34" r="16" fill="none" stroke="#3fa7b5" strokeWidth="3" />
      <path d="M118 18 v8 M118 42 v8 M102 34 h8 M126 34 h8" stroke="#3fa7b5" strokeWidth="3" />
      <rect x="112" y="48" width="12" height="28" fill="#0d2b45" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 160 96" className="h-24 w-40" aria-hidden="true">
      <path d="M16 72 Q80 20 144 72" fill="none" stroke="#f4b942" strokeWidth="3" strokeDasharray="5 4" />
      <circle cx="24" cy="70" r="8" fill="#0d2b45" />
      <circle cx="136" cy="70" r="8" fill="#0d2b45" />
      <path d="M48 58 q16 -16 32 0" fill="none" stroke="#3fa7b5" strokeWidth="3" />
      <path d="M44 50 q20 -22 40 0" fill="none" stroke="#3fa7b5" strokeWidth="3" />
      <path d="M80 58 q16 -16 32 0" fill="none" stroke="#3fa7b5" strokeWidth="3" />
      <path d="M76 50 q20 -22 40 0" fill="none" stroke="#3fa7b5" strokeWidth="3" />
    </svg>
  );
}

function MeshIcon() {
  return (
    <svg viewBox="0 0 160 96" className="h-24 w-40" aria-hidden="true">
      <circle cx="80" cy="28" r="8" fill="#0d2b45" />
      <circle cx="36" cy="70" r="7" fill="#3fa7b5" />
      <circle cx="80" cy="78" r="7" fill="#3fa7b5" />
      <circle cx="124" cy="70" r="7" fill="#3fa7b5" />
      <path d="M80 36 L36 63 M80 36 L80 71 M80 36 L124 63 M36 70 L80 78 L124 70" stroke="#7db9a6" strokeWidth="2" />
    </svg>
  );
}
