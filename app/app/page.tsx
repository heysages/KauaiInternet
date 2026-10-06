import type { Metadata } from "next";
import Link from "next/link";

import KauaiAppMock from "@/components/KauaiAppMock";
import PlainStandIn from "@/components/PlainStandIn";
import { ViewSwitch } from "@/components/ReadingMode";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "App mock",
  description:
    "A mock of the KauaiInternet app: mesh messages for neighbors, and load, quality, and power controls for the people on call.",
};

export default function AppMockPage() {
  return (
    <>
      <SiteNav />
      <ViewSwitch
        plain={
          <PlainStandIn kicker="Neighbor version" title="An app for a note and a short message">
            <p>
              This is a preview, not an app you can download yet. Neighbors would open it
              to read what is open — roads, water, a shelter — and to send a short message
              when their phone has no service.
            </p>
            <p>
              The people who look after the sites would use the same app to see if a site
              is running low on power. Switch to Technical to see that preview.
            </p>
          </PlainStandIn>
        }
        technical={
      <main className="bg-sand-light min-h-screen pt-24 pb-16 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-3">
            Mock · not a shipped app
          </p>
          <h1 className="heading-display text-4xl sm:text-5xl font-semibold text-ocean-deep mb-4 text-balance">
            The app people would actually use
          </h1>
          <p className="text-ocean-mid max-w-3xl leading-relaxed mb-4">
            A phone cannot speak LoRa by itself. This app pairs with a WisMesh radio over
            Bluetooth, or joins the hub Wi-Fi when you are at the hub. Neighbors read the
            status note and send a short text. The two people on call watch link quality,
            shed Starlink or the charging outlet, and mark a battery for a live swap.
          </p>
          <p className="text-sm text-ocean-mid mb-10">
            Sample Hanalei data. Nothing here is on the air.{" "}
            <Link href="/#what-we-are-building" className="underline underline-offset-2">
              Back to the plan
            </Link>
          </p>
          <KauaiAppMock />
          <div className="grid md:grid-cols-3 gap-4 mt-12">
            <article className="rounded-2xl bg-white border border-sand-warm p-5">
              <h2 className="font-semibold text-ocean-deep mb-2">Mesh client</h2>
              <p className="text-sm text-ocean-mid leading-relaxed">
                Queue a text on the radio. Show when it is waiting, hopping, or delivered.
                Stop at a short length so one photo cannot fill the channel.
              </p>
            </article>
            <article className="rounded-2xl bg-white border border-sand-warm p-5">
              <h2 className="font-semibold text-ocean-deep mb-2">Quality</h2>
              <p className="text-sm text-ocean-mid leading-relaxed">
                Say which hop is good, fair, or weak, and which towns you cannot reach from
                where you are standing.
              </p>
            </article>
            <article className="rounded-2xl bg-white border border-sand-warm p-5">
              <h2 className="font-semibold text-ocean-deep mb-2">Load and power</h2>
              <p className="text-sm text-ocean-mid leading-relaxed">
                The on-call view turns down Starlink and the outlet before the radios die,
                and walks a battery swap without dropping the hub.
              </p>
            </article>
          </div>
        </div>
      </main>
        }
      />
    </>
  );
}
