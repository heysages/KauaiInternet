import { everydayCoverage } from "@/data/resilienceMission";

export default function EverydayCoverage() {
  return (
    <div>
      <div className="md:hidden space-y-3 mb-4">
        {everydayCoverage.pieces.map((piece) => (
          <article key={piece.id} className="rounded-2xl border border-sand-warm bg-white p-4">
            <h3 className="font-semibold text-ocean-deep mb-3">{piece.title}</h3>
            <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-1">
              Ordinary day
            </p>
            <p className="text-sm text-ocean-mid leading-relaxed mb-3">{piece.ordinary}</p>
            <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-1">
              Power or internet down
            </p>
            <p className="text-sm text-ocean-mid leading-relaxed">{piece.outage}</p>
          </article>
        ))}
      </div>
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-sand-warm mb-4">
        <table className="w-full min-w-[680px] text-sm text-left">
          <thead className="bg-ocean-deep text-white">
            <tr>
              <th className="px-4 py-3 font-semibold">Already in this pilot</th>
              <th className="px-4 py-3 font-semibold">Ordinary day</th>
              <th className="px-4 py-3 font-semibold">Power or internet down</th>
            </tr>
          </thead>
          <tbody>
            {everydayCoverage.pieces.map((piece) => (
              <tr key={piece.id} className="border-t border-sand-warm">
                <th className="px-4 py-3 font-medium text-ocean-deep align-top bg-white">
                  {piece.title}
                </th>
                <td className="px-4 py-3 align-top bg-emerald-50 text-emerald-950">
                  {piece.ordinary}
                </td>
                <td className="px-4 py-3 align-top bg-sand-light text-ocean-mid">{piece.outage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid lg:grid-cols-3 gap-3">
        {everydayCoverage.stillNeeded.map((item) => (
          <article key={item.id} className="rounded-2xl border border-sand-warm bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-ridge-mid mb-2">
              Still a later step
            </p>
            <h3 className="font-semibold text-ocean-deep mb-2">{item.title}</h3>
            <p className="text-sm text-ocean-mid leading-relaxed">{item.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
