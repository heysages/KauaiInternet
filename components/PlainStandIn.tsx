import type { ReactNode } from "react";
import Link from "next/link";

export default function PlainStandIn({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-sand-light pt-28 pb-16 px-5 sm:px-8">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-3">
          {kicker}
        </p>
        <h1 className="heading-display text-3xl sm:text-4xl font-semibold text-ocean-deep mb-4 text-balance">
          {title}
        </h1>
        <div className="text-ocean-mid leading-relaxed space-y-4">{children}</div>
        <p className="mt-8">
          <Link href="/#service" className="font-semibold text-ocean-deep underline underline-offset-2">
            Back to everyday service
          </Link>
        </p>
      </div>
    </main>
  );
}
