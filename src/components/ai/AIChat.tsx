import { motion } from "framer-motion";
import type { ChatMessage, InterviewQuestion } from "../../types";

export default function AIChat({
  chat, questions, asked, playerName, onAsk
}: {
  chat: ChatMessage[]; questions: InterviewQuestion[]; asked: string[];
  playerName: string; onAsk: (id: string) => void;
}) {
  return (
    <div className="border border-cyan/20 bg-[#061426]/70">
      <div className="flex items-center gap-3 border-b border-cyan/20 px-4.5 px-[18px] py-3.5">
        <span className="h-2 w-2 animate-pulse rounded-full bg-cyan shadow-[0_0_10px_#00D9FF]" />
        <span className="font-display text-[13px] font-bold tracking-[.16em] text-cyan">INTEROGASI LUMA</span>
        <span className="font-mono text-[9px] text-haze">SESI TERENKRIPSI · SUBTITLE AKTIF</span>
      </div>
      <div className="flex max-h-[46vh] flex-col gap-3 overflow-y-auto p-[18px]">
        {chat.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.who === "player" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[78%] border p-4 ${m.who === "player" ? "border-gold/40 bg-gold/[.14] text-white" : "border-cyan/35 bg-cyan/[.09] text-[#e6f6ff]"}`}>
              <div className="mb-1.5 font-mono text-[8.5px] tracking-[.16em] opacity-80">
                {m.who === "player" ? `ANALIS · ${playerName}` : "LUMA · AI SYSTEM ASSISTANT"}
              </div>
              <div className="text-[14.5px] leading-relaxed">{m.text}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex flex-col gap-2 border-t border-cyan/20 p-[18px]">
        <div className="font-mono text-[9px] tracking-[.18em] text-haze">
          {asked.length >= questions.length ? "SEMUA PERTANYAAN TERJAWAB · LANJUT KE ANALISIS" : "PILIH PERTANYAAN UNTUK LUMA"}
        </div>
        {questions.map((q) => {
          const used = asked.includes(q.id);
          return (
            <button key={q.id} disabled={used} onClick={() => onAsk(q.id)}
              className={`border px-3.5 py-3 text-left text-[13.5px] leading-snug ${used ? "cursor-default border-haze/20 bg-white/[.03] text-haze/60" : "border-cyan/35 bg-cyan/[.07] text-white hover:bg-cyan/15"}`}>
              {used ? "✓ " : "▸ "}{q.q}
            </button>
          );
        })}
      </div>
    </div>
  );
}
