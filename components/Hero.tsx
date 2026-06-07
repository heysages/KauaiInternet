import Link from "next/link";
import HeroAddressSearch from "@/components/HeroAddressSearch";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] text-white overflow-hidden pt-20">
      {/* Kauai imagery */}
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
            "linear-gradient(135deg, rgba(13,43,69,0.9) 0%, rgba(13,43,69,0.58) 45%, rgba(35,111,163,0.72) 100%)",
        }}
      />

      <div className="relative z-10 section-padding pt-12 pb-20 lg:pb-28 min-h-[80vh] flex items-center">
        <div className="max-w-3xl mx-auto lg:mx-0 space-y-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-xs font-medium text-sand-warm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-glow animate-pulse-node" />
            A community-built blueprint for a more connected and resilient Kauai
          </div>

          <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] text-balance">
            A More Resilient Kauai
          </h1>

          <p className="text-lg sm:text-xl text-mist leading-relaxed max-w-2xl text-balance">
            Exploring how stronger local infrastructure, emergency readiness, and community
            participation can help Kauai stay connected when it matters most.
          </p>

          <HeroAddressSearch />

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="#explore"
              className="inline-flex items-center justify-center gap-2 bg-amber-emergency hover:bg-amber-glow text-ocean-deep font-semibold px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-amber-emergency/25"
            >
              Explore the Map
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </Link>
            <Link
              href="#support"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 font-medium px-7 py-3.5 rounded-xl transition-colors"
            >
              Support the Vision
            </Link>
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
