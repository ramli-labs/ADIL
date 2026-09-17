import type { CaseRecord, GameConfig } from "../../types";

export default function ScoreBoard({ record, config }: { record: CaseRecord; config: GameConfig }) {
  const bars = [
    { label: "EVIDENCE SCORE", value: record.evidence, max: config.weights.evidence, color: "#00D9FF", note: `${record.relFound} dari ${record.relTotal} bukti relevan ditemukan.` },
    { label: "REASONING SCORE", value: record.reasoning, max: config.weights.reasoning, color: "#C7A6FF", note: `${record.asked}/${record.askTotal} pertanyaan diajukan · ${record.correctPicks}/${record.pickTotal} bukti kunci tepat.` },
    { label: "ETHICS SCORE", value: record.ethics, max: config.weights.ethics, color: "#D4AF37", note: "Kualitas putusan etismu atas kasus ini." }
  ];
  return (
    <div className="flex flex-col gap-3">
      {bars.map((b) => (
        <div key={b.label}>
          <div className="mb-1.5 flex justify-between font-mono text-[10px] tracking-[.14em] text-haze">
            <span>{b.label}</span>
            <span className="text-white">{b.value}/{b.max}</span>
          </div>
          <div className="h-1.5 bg-haze/20">
            <div className="h-full transition-all" style={{ width: `${Math.round((b.value / b.max) * 100)}%`, background: b.color, boxShadow: `0 0 12px ${b.color}` }} />
          </div>
          <p className="mt-1.5 text-[12.5px] text-haze/80">{b.note}</p>
        </div>
      ))}
    </div>
  );
}
