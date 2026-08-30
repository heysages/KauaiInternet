export default function ReticulumArchitectureDiagram() {
  return (
    <div className="rounded-2xl border border-white/10 bg-ocean-deep/40 p-6 overflow-x-auto">
      <p className="text-xs uppercase tracking-widest text-mist mb-4">
        Reticulum — heterogeneous transport (evaluation)
      </p>
      <pre className="text-xs sm:text-sm text-sand-warm font-mono leading-relaxed whitespace-pre">
{`        LoRa ──────┐
                 │
    Wi-Fi ───────┼──── RETICULUM ──── Ethernet
                 │
       Radio ────┤
                 │
    Internet / Satellite ──┘

Multiple physical links → one logical resilient network`}
      </pre>
      <p className="text-xs text-mist mt-4">
        Reticulum is under evaluation — not deployed operationally on Kauaʻi.
      </p>
    </div>
  );
}
