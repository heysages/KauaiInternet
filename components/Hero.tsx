import HashLink from "@/components/HashLink";
import { designPrinciple } from "@/data/resilienceMission";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] text-white overflow-hidden pt-6">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/kauai-satellite.jpg')" }}
        role="img"
        aria-label="Aerial view of Kauai"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(13,43,69,0.82) 0%, rgba(13,43,69,0.38) 48%, rgba(13,43,69,0.72) 100%)",
        }}
      />

      <div className="relative z-10 section-padding pt-12 pb-20 lg:pb-28 min-h-[80vh] flex items-center">
        <div className="max-w-3xl mx-auto lg:mx-0 space-y-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-xs font-medium text-sand-warm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-glow animate-pulse-node" />
            Kauai Resilient Communications Network
          </div>

          <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] text-balance">
            {designPrinciple}
          </h1>

          <p className="text-lg sm:text-xl text-mist leading-relaxed max-w-2xl text-balance">
            Cell service along the North Shore is already thin on an ordinary day. After
            Hurricane Lowell, power and phones stayed down for days. This corridor is the
            powered sites and the wireless backhaul those two problems share.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <HashLink
              href="/#lowell"
              className="inline-flex items-center justify-center gap-2 bg-amber-emergency hover:bg-amber-glow text-ocean-deep font-semibold px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-amber-emergency/25"
            >
              What Lowell taught us
            </HashLink>
            <HashLink
              href="/#cost"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 font-medium px-7 py-3.5 rounded-xl transition-colors"
            >
              What it costs
            </HashLink>
            <HashLink
              href="/#network-map"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 font-medium px-7 py-3.5 rounded-xl transition-colors"
            >
              Explore the map
            </HashLink>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
          <path d="M0 60V30C240 60 480 0 720 30C960 60 1200 0 1440 30V60H0Z" fill="#f7f4ef" />
        </svg>
      </div>
    </section>
  );
}
