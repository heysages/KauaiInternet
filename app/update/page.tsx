import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import KauaiInternetLogo from "@/components/KauaiInternetLogo";
import { siteUpdate } from "@/data/siteUpdate";

export const metadata = {
  title: "Community Update | Kauai Internet",
  description:
    "What Tropical Storm Lala showed about power and radios, and the three-step plan for a short message that still moves when the grid is out.",
};

export default function UpdatePage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-sand-light pt-20">
        <div className="max-w-3xl mx-auto section-padding pb-16">
          <div className="mb-6">
            <p className="text-xs text-ocean-mid">
              Last updated {siteUpdate.lastUpdated} · Public sources only
            </p>
          </div>

          <h1 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-3">
            {siteUpdate.headline}
          </h1>
          <p className="text-lg text-ocean-mid leading-relaxed mb-10">{siteUpdate.subhead}</p>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-ocean-deep mb-4">
              What people are reporting
            </h2>
            <div className="space-y-4">
              {siteUpdate.whatsBeingReported.map((item) => (
                <div key={item.id} className="glass-card rounded-xl p-5">
                  <h3 className="font-semibold text-ocean-deep mb-2">{item.title}</h3>
                  <p className="text-sm text-ocean-mid leading-relaxed mb-3">{item.summary}</p>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-ocean-mid hover:text-ocean-deep underline"
                  >
                    Source: {item.source} →
                  </a>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-ocean-deep mb-4">What this means</h2>
            <ul className="space-y-2">
              {siteUpdate.whatThisMeans.map((line) => (
                <li key={line} className="text-sm text-ocean-mid flex gap-2">
                  <span className="text-amber-emergency shrink-0">•</span>
                  {line}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-10 glass-card rounded-2xl p-6 border-amber-emergency/20">
            <h2 className="text-xl font-semibold text-ocean-deep mb-4">
              {siteUpdate.ourRemedy.title}
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium text-ocean-deep mb-1">Now</p>
                <ul className="text-ocean-mid space-y-1">
                  {siteUpdate.ourRemedy.now.map((x) => (
                    <li key={x}>• {x}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-ocean-deep mb-1">Near term</p>
                <ul className="text-ocean-mid space-y-1">
                  {siteUpdate.ourRemedy.nearTerm.map((x) => (
                    <li key={x}>• {x}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-ocean-deep mb-1">Long term</p>
                <ul className="text-ocean-mid space-y-1">
                  {siteUpdate.ourRemedy.longTerm.map((x) => (
                    <li key={x}>• {x}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-xs text-ocean-mid/80 mt-4 italic">
              This is a community build-out — not an instant fix for today&apos;s outages.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-ocean-deep mb-4">What you can do</h2>
            <div className="flex flex-wrap gap-3">
              {siteUpdate.whatYouCanDo.map((action) =>
                action.external ? (
                  <a
                    key={action.label}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-ocean-mid text-white text-sm font-medium hover:bg-ocean-deep transition-colors"
                  >
                    {action.label}
                  </a>
                ) : (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="px-4 py-2.5 rounded-xl border border-ocean-mid/30 text-ocean-deep text-sm font-medium hover:bg-white transition-colors"
                  >
                    {action.label}
                  </Link>
                )
              )}
            </div>
          </section>

          <div className="rounded-xl bg-amber-emergency/10 border border-amber-emergency/20 p-4 mb-10">
            <p className="text-sm text-ocean-deep">{siteUpdate.disclaimer}</p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/" className="text-ocean-mid hover:text-ocean-deep underline">
              ← Full site
            </Link>
            <Link href="/#host-node" className="text-amber-emergency font-semibold hover:underline">
              Host a node →
            </Link>
          </div>
        </div>

        <footer className="border-t border-sand-warm py-8 px-5 text-center">
          <KauaiInternetLogo variant="dark" compact />
        </footer>
      </main>
    </>
  );
}
