import type { OperationalStatus } from "@/types/network";

const styles: Record<OperationalStatus, string> = {
  live: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
  testing: "bg-blue-500/15 text-blue-700 border-blue-500/30",
  planned: "bg-slate-500/15 text-slate-600 border-slate-500/30",
  proposed: "bg-amber-500/15 text-amber-800 border-amber-500/30",
  simulated: "bg-purple-500/15 text-purple-700 border-purple-500/30",
  experimental: "bg-teal-500/15 text-teal-700 border-teal-500/30",
};

const labels: Record<OperationalStatus, string> = {
  live: "Live",
  testing: "Testing",
  planned: "Planned",
  proposed: "Proposed",
  simulated: "Simulated",
  experimental: "Experimental",
};

export default function OperationalStatusBadge({
  status,
  className = "",
}: {
  status: OperationalStatus;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border uppercase tracking-wide ${styles[status]} ${className}`}
    >
      {labels[status]}
    </span>
  );
}
