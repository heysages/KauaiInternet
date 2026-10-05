import Link from "next/link";

export default function AppPreviewSection() {
  return (
    <section id="app" className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-3">
          The app
        </p>
        <h2 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4 text-balance">
          Neighbors need a client. The on-call crew needs controls.
        </h2>
        <p className="text-ocean-mid max-w-3xl leading-relaxed mb-8">
          The hubs and radios do not help if the only way to use them is a laptop in a
          cabinet. A phone app pairs with a WisMesh radio for short messages, shows the
          hub’s status note, and lets the people on call shed load and mark a battery swap.
        </p>
        <div className="grid md:grid-cols-3 gap-3 mb-8">
          <Card title="Messages" text="A short text that queues on the radio and hops toward the next hub." />
          <Card title="Reach and quality" text="Which towns you can reach from here, and which hop is weak." />
          <Card title="Load and power" text="Shed Starlink or the charging outlet, and swap one pack while the hub stays up." />
        </div>
        <Link
          href="/app"
          className="inline-flex rounded-full bg-ocean-deep text-white px-5 py-2.5 text-sm font-semibold"
        >
          Open the app mock
        </Link>
      </div>
    </section>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-2xl border border-sand-warm bg-sand-light p-5">
      <h3 className="font-semibold text-ocean-deep mb-2">{title}</h3>
      <p className="text-sm text-ocean-mid leading-relaxed">{text}</p>
    </article>
  );
}
