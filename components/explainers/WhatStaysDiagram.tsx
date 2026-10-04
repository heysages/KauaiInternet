const drops = ["Utility power", "Fiber", "Cellular", "Satellite"];
const stays = ["Short mesh messages", "Status note at the hub", "Link from hub to hub"];

export default function WhatStaysDiagram() {
  return (
    <div className="grid md:grid-cols-2 gap-3 mb-8">
      <div className="rounded-2xl bg-sand-light p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-ocean-mid mb-3">
          These can all be down
        </p>
        <ul className="space-y-2">
          {drops.map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm text-ocean-mid">
              <span className="h-2.5 w-2.5 rounded-full bg-sand-warm ring-2 ring-ocean-mid/30" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl bg-ocean-deep p-5 text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-sand-warm mb-3">
          These are designed to stay up for 72 hours
        </p>
        <ul className="space-y-2">
          {stays.map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-teal" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
