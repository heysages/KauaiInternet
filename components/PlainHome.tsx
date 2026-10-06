import HashLink from "@/components/HashLink";
import IslandPlan from "@/components/IslandPlan";
import KauaiInternetLogo from "@/components/KauaiInternetLogo";
import PhoneSignalMap from "@/components/explainers/PhoneSignalMap";
import { GapFillProvider } from "@/components/GapFillContext";
import SupportCTA from "@/components/SupportCTA";
import { formatUsd, lowellLessons } from "@/data/resilienceMission";
import { pilotCapital, pilotOperating } from "@/data/pilotBudget";
import { siteConfig } from "@/lib/site";

const stillWorks = [
  {
    title: "A short message nearby",
    text: "When the phone network is down, a person near a community site can still send a short note to someone else on this network. It is a message, not a normal phone call.",
  },
  {
    title: "A note at the community site",
    text: "Roads, water, food, and whether a shelter is open stay posted at the site, so people are not waiting on a radio station or a webpage that has gone quiet.",
  },
  {
    title: "The site stays on for three days",
    text: "Each site carries its own solar and batteries. If the power company is out, the site keeps going for at least three days. A generator is there for longer outages.",
  },
];

export default function PlainHome() {
  const powerLesson = lowellLessons.find((lesson) => lesson.id === "duration");
  const radioLesson = lowellLessons.find((lesson) => lesson.id === "radio");

  return (
    <>
      <section className="relative min-h-[88vh] text-white overflow-hidden">
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
              "linear-gradient(115deg, rgba(13,43,69,0.86) 0%, rgba(13,43,69,0.45) 50%, rgba(13,43,69,0.78) 100%)",
          }}
        />
        <div className="relative z-10 section-padding pt-28 pb-24 min-h-[80vh] flex items-center">
          <div className="max-w-3xl space-y-8">
            <p className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-xs font-medium text-sand-warm">
              Neighbor version
            </p>
            <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] text-balance">
              More phone service on a normal day. A way to reach someone when the connection is lost.
            </h1>
            <p className="text-lg sm:text-xl text-mist leading-relaxed max-w-2xl">
              On the North Shore, calls already drop. After Hurricane Lowell, the power
              and the phones stayed down for days. This plan starts with those two problems.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <HashLink
                href="/#service"
                className="inline-flex items-center justify-center bg-amber-emergency hover:bg-amber-glow text-ocean-deep font-semibold px-7 py-3.5 rounded-xl transition-colors"
              >
                Where service would grow
              </HashLink>
              <HashLink
                href="/#lost"
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 font-medium px-7 py-3.5 rounded-xl transition-colors"
              >
                When the connection is lost
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

      <section id="service" className="section-padding bg-sand-light scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-3">
            Everyday service
          </p>
          <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4 text-balance">
            The first build puts a phone signal in four North Shore towns
          </h2>
          <p className="text-ocean-mid max-w-3xl leading-relaxed mb-8">
            Hāʻena, Hanalei, Princeville, and Kīlauea. Today, calls from Princeville west
            toward Keʻē already fail. The colored areas are the towns, not a promise of
            bars in every house, and this is not Verizon, AT&T, or T-Mobile. A phone uses
            the new signal after it is set up for this network.
          </p>
          <GapFillProvider>
            <PhoneSignalMap />
          </GapFillProvider>
          <p className="text-sm text-ocean-mid mt-4 max-w-3xl leading-relaxed">
            Fill the gaps adds smaller solar spots in the holes those town sites leave.
            A walk of the roads would add or drop some of them. That step is later, and
            it is not in the price below.
          </p>
        </div>
      </section>

      <section id="lost" className="section-padding bg-white scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-3">
            Lost connections
          </p>
          <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4 text-balance">
            When the power goes out, the phones and the internet go with it
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            <article className="rounded-2xl border border-sand-warm bg-sand-light p-6">
              <h3 className="font-semibold text-ocean-deep mb-2">Days without power</h3>
              <p className="text-sm text-ocean-mid leading-relaxed mb-4">
                {powerLesson?.summary}
              </p>
              <ul className="space-y-1 text-xs">
                {powerLesson?.sources.map((source) => (
                  <li key={source.href}>
                    <a href={source.href} className="underline underline-offset-2 text-ocean-deep" target="_blank" rel="noreferrer">
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-2xl border border-sand-warm bg-sand-light p-6">
              <h3 className="font-semibold text-ocean-deep mb-2">No way to hear what was open</h3>
              <p className="text-sm text-ocean-mid leading-relaxed mb-4">
                {radioLesson?.summary} Kauai Internet does not run 911, county radio, or those stations.
              </p>
              <ul className="space-y-1 text-xs">
                {radioLesson?.sources.map((source) => (
                  <li key={source.href}>
                    <a href={source.href} className="underline underline-offset-2 text-ocean-deep" target="_blank" rel="noreferrer">
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <h3 className="font-semibold text-ocean-deep mb-4">What would still work</h3>
          <ol className="grid lg:grid-cols-3 gap-4 mb-8">
            {stillWorks.map((item, index) => (
              <li key={item.title} className="rounded-2xl border border-sand-warm p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-2">
                  {index + 1}
                </p>
                <p className="font-semibold text-ocean-deep mb-2">{item.title}</p>
                <p className="text-sm text-ocean-mid leading-relaxed">{item.text}</p>
              </li>
            ))}
          </ol>
          <div className="rounded-2xl bg-ocean-deep text-white p-6 max-w-3xl">
            <p className="font-semibold mb-2">What this does not do</p>
            <p className="text-sm text-mist leading-relaxed">
              A Verizon, AT&T, or T-Mobile call can still fail when their towers lose power.
              The internet off the island can fail too. A house tucked behind a ridge may
              still have no signal until a later gap is filled. Call 911 when you can, and
              sign up for county Everbridge alerts. This network is the local message and
              the community note for the hours those usual paths are gone.
            </p>
          </div>
        </div>
      </section>

      <section id="where" className="section-padding bg-sand-light scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-3">
            Where
          </p>
          <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4 text-balance">
            North Shore first, then the towns where people live
          </h2>
          <p className="text-ocean-mid max-w-3xl leading-relaxed mb-8">
            The price on this page is only the North Shore. The same kind of community
            site can follow the coast later, through the east side, Līhuʻe, the south
            shore, and the west side. Not the empty mountains.
          </p>
          <IslandPlan />
        </div>
      </section>

      <section id="cost" className="section-padding bg-white scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-3">
            Cost
          </p>
          <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4 text-balance">
            What the North Shore start costs
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
            <article className="rounded-2xl border border-sand-warm p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-2">
                To build
              </p>
              <p className="heading-display text-4xl font-semibold text-ocean-deep mb-3">
                {formatUsd(pilotCapital)}
              </p>
              <p className="text-sm text-ocean-mid leading-relaxed">
                New equipment, solar and batteries, shipping, and the people to install
                the four town sites. Bought new. Nothing already on a shelf is subtracted.
              </p>
            </article>
            <article className="rounded-2xl border border-sand-warm p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-2">
                Each year
              </p>
              <p className="heading-display text-4xl font-semibold text-ocean-deep mb-3">
                {formatUsd(pilotOperating)}
              </p>
              <p className="text-sm text-ocean-mid leading-relaxed">
                People on call, one week of storm work, and the fees that keep the phone
                signal legal to turn on. The smaller gap-filling sites are not in either number.
              </p>
            </article>
          </div>
          <p className="text-sm text-ocean-mid mt-6">
            Switch to Technical for the part-by-part budget.
          </p>
        </div>
      </section>

      <SupportCTA />

      <footer className="bg-ocean-deep text-mist py-12 px-5 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4">
            <KauaiInternetLogo variant="light" />
          </div>
          <p className="text-sm leading-relaxed max-w-md mb-8">
            {siteConfig.projectName}. More everyday phone service, and a local message
            that still moves when the usual connection is gone.
          </p>
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs">
            <p>&copy; {new Date().getFullYear()} Kauai Resilience Network.</p>
            <p>
              <a href="mailto:hello@kauaiinternet.com" className="hover:text-white">
                hello@kauaiinternet.com
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
