import EvidenceCard from "./EvidenceCard";
import type { Evidence } from "../../types";

export default function EvidenceBoard({
  evidence, scanned, onScan
}: { evidence: Evidence[]; scanned: Record<string, boolean>; onScan: (id: string) => void }) {
  const done = evidence.filter((e) => scanned[e.id]);
  const relevantFound = done.filter((e) => e.relevant).length;
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2.5">
        <div className="font-mono text-[12px] tracking-[.18em] text-cyan">PAPAN BUKTI · KLIK BERKAS UNTUK MEMINDAI</div>
        <div className="font-mono text-[12px] text-haze">{done.length} / {evidence.length} BERKAS DIPINDAI · {relevantFound} RELEVAN</div>
      </div>
      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
        {evidence.map((e) => (
          <EvidenceCard key={e.id} evidence={e} scanned={Boolean(scanned[e.id])} onScan={() => onScan(e.id)} />
        ))}
      </div>
    </div>
  );
}
