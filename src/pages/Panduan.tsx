import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { learning } from "../engine/content";
import { useGame } from "../engine/gameState";

/** Lima fase ini sama persis dengan tab di ruang investigasi. */
const LANGKAH = [
  {
    no: "01", nama: "BRIEFING",
    apa: "Baca duduk perkara: keputusan apa yang diambil AI, atas dasar apa, dan apa manfaat sistemnya.",
    lakukan: "Perhatikan angka keyakinan (confidence) sistem. Angka rendah adalah petunjuk awal."
  },
  {
    no: "02", nama: "PAPAN BUKTI",
    apa: "Klik tiap berkas untuk memindainya. Setiap pindaian membuka temuan dan konsep di baliknya.",
    lakukan: "Pindai semua berkas, termasuk yang tampak tidak penting — tidak semua bukti relevan, dan mengetahui mana yang tidak relevan juga bagian dari analisis."
  },
  {
    no: "03", nama: "INTEROGASI AI",
    apa: "Ajukan pertanyaan kepada LUMA, sistem AI yang diperiksa. Sebagian jawaban membuka wawasan kunci.",
    lakukan: "Ajukan seluruh pertanyaan. Jawaban LUMA sering mengungkap apa yang tidak ada di berkas."
  },
  {
    no: "04", nama: "ANALISIS",
    apa: "Pilih tiga bukti kunci yang paling membuktikan keputusan AI bermasalah, lalu kunci analisismu.",
    lakukan: "Pilih bukti yang saling menyambung menjadi satu sebab-akibat, bukan tiga fakta terpisah."
  },
  {
    no: "05", nama: "PUTUSAN",
    apa: "Jatuhkan putusan etismu. Tidak ada tombol undo.",
    lakukan: "Putusan terbaik menunjuk penyebabnya, dampaknya, dan perbaikannya — bukan sekadar menyalahkan AI."
  }
];

const SKOR = [
  { nama: "EVIDENCE SCORE", nilai: "35", arti: "seberapa teliti kamu menemukan bukti yang relevan" },
  { nama: "REASONING SCORE", nilai: "25", arti: "keberanian bertanya + ketepatan memilih bukti kunci" },
  { nama: "ETHICS SCORE", nilai: "40", arti: "kualitas putusanmu: memperbaiki sistem, bukan menghakimi" }
];

export default function Panduan() {
  const navigate = useNavigate();
  const { cases, config } = useGame();

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="mx-auto w-full max-w-5xl px-7 py-10 md:px-10">
      <div className="font-mono text-[12px] tracking-[.2em] text-cyan">PANDUAN · SEBELUM SIDANG DIMULAI</div>
      <h2 className="mt-2 font-display text-[clamp(22px,3.4vw,34px)] font-bold tracking-[.04em]">CARA BERMAIN</h2>

      <div className="mt-5 border-l-2 border-gold bg-gold/[.06] px-4 py-3.5">
        <div className="font-mono text-[12px] tracking-[.18em] text-gold">TUJUAN PEMBELAJARAN</div>
        <p className="mt-2 text-[14px] leading-relaxed text-[#e3ebf3]">{learning.meta.competency}</p>
        <p className="mt-2 font-mono text-[12px] text-haze">{learning.meta.curriculum} · {learning.meta.grade}</p>
      </div>

      <p className="mt-6 max-w-[70ch] text-[15px] leading-relaxed text-[#d7e2ee]">
        Kamu berperan sebagai <strong className="text-white">{config.game.player_role}</strong>. Tugasmu bukan menebak
        jawaban benar, melainkan memeriksa apakah keputusan sebuah sistem AI sudah adil, transparan, dan
        bertanggung jawab. Ada <strong className="text-white">{cases.length} sidang</strong>, masing-masing terkunci
        sampai sidang sebelumnya selesai.
      </p>

      <h3 className="mt-8 font-display text-[16px] font-bold tracking-[.1em] text-cyan">LIMA TAHAP TIAP SIDANG</h3>
      <div className="mt-3.5 flex flex-col gap-2.5">
        {LANGKAH.map((l) => (
          <div key={l.no} className="grid gap-3 border border-haze/20 bg-white/[.02] p-4 sm:grid-cols-[auto_1fr]">
            <div className="font-display text-[20px] font-black text-gold">{l.no}</div>
            <div>
              <div className="font-display text-[14px] font-bold tracking-[.08em] text-white">{l.nama}</div>
              <p className="mt-1.5 text-[14px] leading-relaxed text-[#d7e2ee]">{l.apa}</p>
              <p className="mt-2 border-l-2 border-cyan/50 pl-2.5 font-mono text-[12px] leading-relaxed text-cyan">
                TIPS: {l.lakukan}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="mt-8 font-display text-[16px] font-bold tracking-[.1em] text-cyan">CARA SKOR DIHITUNG</h3>
      <p className="mt-2 max-w-[70ch] text-[14px] leading-relaxed text-haze">
        Tiap sidang bernilai maksimal 100, dari tiga bagian. Mengulang sidang tidak menurunkan skor terbaikmu.
      </p>
      <div className="mt-3.5 grid gap-2.5 sm:grid-cols-3">
        {SKOR.map((s) => (
          <div key={s.nama} className="border border-cyan/25 bg-cyan/[.05] p-4">
            <div className="font-mono text-[12px] tracking-[.14em] text-cyan">{s.nama}</div>
            <div className="mt-1 font-display text-[22px] font-black text-white">{s.nilai}</div>
            <p className="mt-1.5 text-[13px] leading-snug text-[#d7e2ee]">{s.arti}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-8 font-display text-[16px] font-bold tracking-[.1em] text-cyan">KONTROL</h3>
      <ul className="mt-3 flex max-w-[70ch] list-none flex-col gap-2 p-0 text-[14px] leading-relaxed text-[#d7e2ee]">
        <li>· <strong className="text-white">Tab</strong> berpindah antar tombol, <strong className="text-white">Enter</strong> memilih — seluruh permainan bisa dimainkan tanpa tetikus.</li>
        <li>· <strong className="text-white">AUDIO</strong> di header mematikan musik dan efek suara.</li>
        <li>· <strong className="text-white">⚙ Pengaturan</strong> memisahkan narasi suara dari efek suara, menyediakan mode kurangi animasi, dan reset progres.</li>
        <li>· Progres tersimpan otomatis di perangkat setiap satu sidang selesai.</li>
      </ul>

      <div className="mt-9 flex flex-wrap gap-3.5">
        <Button onClick={() => navigate("/academy")}>MULAI SIDANG ▸</Button>
        <Button variant="ghost" onClick={() => navigate("/")}>← KEMBALI KE LOBI</Button>
      </div>
    </motion.section>
  );
}
