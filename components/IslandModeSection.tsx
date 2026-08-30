import { islandModeStates, islandModeServices } from "@/data/islandModeServices";
import NetworkModeIndicator from "@/components/NetworkModeIndicator";
import { NetworkModeProvider } from "@/components/NetworkModeContext";
import OperationalStatusBadge from "@/components/OperationalStatusBadge";

export default function IslandModeSection() {
  return (
    <section id="island-mode" className="section-padding bg-sand-light">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid">
            Island Mode
          </p>
          <OperationalStatusBadge status="proposed" />
        </div>
        <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4">
          When the Internet goes down, Kauaʻi keeps talking
        </h2>
        <p className="text-ocean-mid max-w-3xl mb-8 leading-relaxed">
          <strong className="text-ocean-deep">Island Mode</strong> occurs when Kauaʻi loses
          significant upstream Internet connectivity but the local KauaiInternet network remains
          operational. Local messaging, emergency information, maps, and community bulletins can
          continue — where nodes remain powered.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          <NetworkModeProvider demoEnabled initialMode="global">
            <div className="platform-shell rounded-2xl p-6">
              <p className="text-xs uppercase tracking-widest text-mist mb-4">
                Demo — toggle network states
              </p>
              <NetworkModeIndicator />
            </div>
          </NetworkModeProvider>

          <div>
            <h3 className="font-semibold text-ocean-deep mb-3">Services in Island Mode</h3>
            <ul className="grid sm:grid-cols-2 gap-2 mb-6">
              {islandModeServices.services.slice(0, 8).map((s) => (
                <li key={s} className="text-sm text-ocean-mid flex items-start gap-2">
                  <span className="text-amber-emergency mt-0.5">•</span>
                  {s}
                </li>
              ))}
            </ul>
            <p className="text-xs text-ocean-mid/80 italic">{islandModeServices.note}</p>
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {islandModeStates.map((s) => (
            <div key={s.mode} className="glass-card rounded-xl p-4">
              <p className="text-lg mb-1">{s.icon}</p>
              <p className="font-semibold text-ocean-deep text-sm">{s.label}</p>
              <p className="text-xs text-ocean-mid mt-1">{s.headline}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
