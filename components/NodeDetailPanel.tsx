import type { NetworkNode } from "@/types/network";
import OperationalStatusBadge from "@/components/OperationalStatusBadge";
import { sitePermissionLabels } from "@/data/existingRadioInfrastructure";
import { getNeighborNodes } from "@/lib/networkTopology";
import { getLinksForNode } from "@/data/networkLinks";
import { linkMediumLabels } from "@/data/networkLinks";
import { rfPlanningLabels } from "@/lib/rfPlanning";

export default function NodeDetailPanel({ node, onClose }: { node: NetworkNode; onClose?: () => void }) {
  const neighbors = getNeighborNodes(node.id);
  const links = getLinksForNode(node.id);

  return (
    <div className="space-y-4 text-sm">
      {onClose && (
        <button type="button" onClick={onClose} className="text-xs text-mist hover:text-white">
          ← Back
        </button>
      )}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h3 className="font-semibold text-white text-base">{node.name}</h3>
          <OperationalStatusBadge status={node.operationalStatus} />
        </div>
        <p className="text-mist text-xs">{node.areaLabel}</p>
      </div>
      <dl className="grid grid-cols-2 gap-2 text-xs">
        <dt className="text-mist">Class</dt>
        <dd className="text-white font-medium">{node.nodeClass}</dd>
        <dt className="text-mist">Permission</dt>
        <dd className="text-white">{sitePermissionLabels[node.permissionStatus]}</dd>
        {node.elevation && (
          <>
            <dt className="text-mist">Elevation</dt>
            <dd className="text-white">{node.elevation}</dd>
          </>
        )}
        <dt className="text-mist">Roles</dt>
        <dd className="text-white col-span-1">{node.roles.join(", ")}</dd>
      </dl>
      <p className="text-mist leading-relaxed">{node.description}</p>
      {links.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-widest text-mist mb-2">Links</p>
          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.id} className="text-xs text-sand-warm">
                {linkMediumLabels[l.medium]} — {l.operationalStatus}
              </li>
            ))}
          </ul>
        </div>
      )}
      {neighbors.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-widest text-mist mb-2">Neighbor nodes</p>
          <ul className="space-y-1">
            {neighbors.map((n) => (
              <li key={n.id} className="text-xs text-sand-warm">
                {n.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="rounded-lg border border-white/10 bg-white/5 p-3">
        <p className="text-xs font-semibold text-sand-warm mb-1">{rfPlanningLabels.title}</p>
        <OperationalStatusBadge status="planned" className="mb-2" />
        <p className="text-xs text-mist">{rfPlanningLabels.status} — propagation engine not yet integrated.</p>
      </div>
    </div>
  );
}
