import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { learning } from "../engine/content";
import { useGame } from "../engine/gameState";

export default function Home() {
  const navigate = useNavigate();
  const { save, cases, justiceScore, rank, config } = useGame();
  const playerName = (save.playerName ?? "ANALIS NUSANTARA").toUpperCase();

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="grid flex-1 items-center gap-10 px-7 py-12 md:grid-cols-[1.1fr_.9fr] md:px-14 lg:px-20">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="mb-6 inline-flex items-center gap-2.5 border border-cyan/30 px-3.5 py-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
          <span className="font-mono text-[12px] tracking-[.22em] text-cyan">SESI TAHUN {config.game.year_setting} · AKSES ANALIS TERVERIFIKASI</span>
        </div>
        <h1 className="m-0 font-display text-[clamp(42px,7vw,92px)] font-black leading-[.95]">THE AI<br /><span className="text-gold">TRIAL</span></h1>
        <p className="mb-6 mt-1.5 font-mono text-[12px] tracking-[.24em] text-cyan">SIDANG KEADILAN ALGORITMA · ADIL ACADEMY</p>
        <p className="max-w-[54ch] text-pretty text-[17px] leading-relaxed text-[#d7e2ee]">
          AI dapat mengambil keputusan dalam sekejap. Tetapi keputusan yang cepat tidak selalu adil.
          Masuki ADIL Academy sebagai <strong className="text-white">{config.game.player_role}</strong>: kumpulkan bukti,
          interogasi sistem, lalu jatuhkan putusan etismu.
        </p>
        <p className="mb-5 mt-2.5 font-mono text-[12px] text-haze">{cases.length} SIDANG · BUKTI INTERAKTIF · INTEROGASI AI · PUTUSAN ETIS</p>

        {/* Laman Muka wajib menyatakan tujuan pembelajaran; sumbernya learning.json
            supaya tidak pernah berbeda dari materi yang benar-benar diajarkan. */}
        <div className="mb-8 max-w-[58ch] border-l-2 border-gold bg-gold/[.06] px-4 py-3.5">
          <div className="font-mono text-[12px] tracking-[.18em] text-gold">TUJUAN PEMBELAJARAN</div>
          <p className="mt-2 text-[14px] leading-relaxed text-[#e3ebf3]">{learning.meta.competency}</p>
          <p className="mt-2 font-mono text-[12px] leading-relaxed text-haze">
            {learning.meta.curriculum} · {learning.meta.grade}
          </p>
        </div>

        <div className="flex flex-wrap gap-3.5">
          <Button onClick={() => navigate("/academy")}>MULAI SIDANG</Button>
          <Button variant="ghost" onClick={() => navigate("/panduan")}>CARA BERMAIN</Button>
          <Button variant="ghost" onClick={() => navigate("/archive")}>ARSIP BUKTI</Button>
          <Button variant="ghost" onClick={() => navigate("/profile")}>PROFIL ANALIS</Button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 24, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9 }} className="border border-cyan/20 bg-gradient-to-br from-cyan/[.08] to-navy/50 p-5">
        <div className="relative aspect-[4/3] overflow-hidden border border-cyan/20 bg-[#071427]">
          <img src="assets/environments/home_courtroom.png" alt="" className="h-full w-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = "hidden"; }} />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(0,217,255,.13)_0_2px,transparent_2px_11px)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 animate-scanline bg-gradient-to-b from-transparent via-cyan/15 to-transparent" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {[{ k: "ANALIS", v: playerName, c: "text-white" }, { k: "PANGKAT", v: rank.label, c: "text-gold" },
            { k: "SIDANG", v: `${Object.keys(save.cases).length}/${cases.length}`, c: "text-cyan" }].map((x) => (
            <div key={x.k} className="border border-haze/20 p-3">
              <div className="font-mono text-[12px] tracking-[.16em] text-haze">{x.k}</div>
              <div className={`mt-1.5 font-display text-[12px] ${x.c}`}>{x.v}</div>
            </div>
          ))}
        </div>
        <div className="mt-2.5 border border-haze/20 p-3 font-mono text-[12px] tracking-[.16em] text-haze">
          JUSTICE SCORE TERSIMPAN: <span className="text-white">{justiceScore}</span>/100
        </div>
      </motion.div>
    </motion.section>
  );
}
