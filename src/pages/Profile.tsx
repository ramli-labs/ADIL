import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnalystProfileCard from "../components/ui/AnalystProfileCard";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { endings } from "../engine/content";
import { useGame } from "../engine/gameState";

export default function Profile() {
  const navigate = useNavigate();
  const g = useGame();
  const [konfirmasiReset, setKonfirmasiReset] = useState(false);
  const playerName = (g.save.playerName ?? "ANALIS NUSANTARA").toUpperCase();

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col gap-7 px-7 py-10 md:px-14">
      <div className="grid gap-[18px] lg:grid-cols-3">
        <div className="border border-gold/30 bg-gradient-to-b from-gold/10 to-transparent p-6">
          <div className="font-mono text-[12px] tracking-[.22em] text-gold">KARTU IDENTITAS ANALIS</div>
          <input defaultValue={playerName} onBlur={(e) => g.setPlayerName(e.currentTarget.value.trim() || "ANALIS NUSANTARA")}
            className="mt-3.5 w-full border-b border-haze/30 bg-transparent pb-1 font-display text-[24px] font-black uppercase text-white outline-none focus:border-gold" />
          <div className="mt-2.5 font-mono text-[12px] tracking-[.16em] text-cyan">{g.config.game.player_role} · ADIL ACADEMY {g.config.game.year_setting}</div>
          <div className="mt-4 flex flex-col gap-2 font-mono text-[12px] tracking-[.14em] text-haze">
            <div className="flex justify-between"><span>JUSTICE SCORE</span><span className="text-white">{g.justiceScore}/100</span></div>
            <div className="flex justify-between"><span>PANGKAT</span><span className="text-gold">{g.rank.label}</span></div>
            <div className="flex justify-between"><span>SIDANG SELESAI</span><span className="text-white">{Object.keys(g.save.cases).length}/{g.cases.length}</span></div>
            <div className="flex justify-between"><span>LENCANA</span><span className="text-white">{g.save.badges.length}/{endings.badges.length}</span></div>
          </div>
        </div>
        <AnalystProfileCard profile={g.profile} />
        <div className="border border-cyan/25 p-6">
          <div className="font-mono text-[12px] tracking-[.22em] text-cyan">RIWAYAT SIDANG</div>
          <div className="mt-3.5 flex flex-col gap-2">
            {g.cases.map((c) => {
              const r = g.save.cases[c.id];
              return (
                <div key={c.id} className="flex items-center justify-between gap-3 border-b border-haze/15 pb-2 text-[12.5px]">
                  <span className="text-[#d7e2ee]">{c.case_code} · {c.title}</span>
                  <span className={`font-mono text-[12px] ${r ? "text-gold" : "text-haze/70"}`}>{r ? r.total : "—"}</span>
                </div>
              );
            })}
          </div>
          {g.ending && (
            <div className="mt-4 border border-nara/35 bg-nara/[.07] p-3.5">
              <div className="font-display text-[13px] font-bold text-nara">{g.ending.title}</div>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#e3ebf3]">{g.ending.text}</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="mb-3.5 font-mono text-[12px] tracking-[.2em] text-gold">LENCANA PRESTASI — DIBERIKAN ATAS CARA BERMAIN, BUKAN JAWABAN BENAR SAJA</div>
        <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
          {endings.badges.map((b) => <Badge key={b.id} badge={b} owned={g.save.badges.includes(b.id)} />)}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="cyan" onClick={() => navigate("/cases")}>LANJUT KE ARSIP KASUS</Button>
        <Button variant="ghost" onClick={() => navigate("/teacher")}>PANDUAN GURU</Button>
        {/* Menghapus progres tidak boleh terjadi dalam satu klik — sama seperti di Pengaturan. */}
        {konfirmasiReset ? (
          <div className="flex flex-wrap items-center gap-2.5 border border-[#e07a7a]/40 bg-[#e07a7a]/[.06] px-4 py-3">
            <span className="font-mono text-[12px] leading-relaxed text-white">
              Hapus seluruh skor, lencana, dan riwayat sidang? Tidak bisa dibatalkan.
            </span>
            <Button variant="ghost" onClick={() => setKonfirmasiReset(false)}>BATAL</Button>
            <Button variant="ghost" onClick={() => { g.resetSave(); setKonfirmasiReset(false); }}>YA, HAPUS SEMUA</Button>
          </div>
        ) : (
          <Button variant="ghost" onClick={() => setKonfirmasiReset(true)}>RESET DOSIR</Button>
        )}
      </div>
    </motion.section>
  );
}
