/**
 * Merekam video demonstrasi ADIL, lengkap dengan audio asli gim.
 *
 *   npm run dev -- --port 5174 --host 127.0.0.1   (di terminal lain)
 *   node tools/rekam-demo.cjs                       → video-demonstrasi.mp4
 *
 * Perekaman layar Playwright tidak menyertakan suara. Karena itu setiap panggilan
 * play()/pause() dari pemutar audio gim dicatat beserta waktunya, lalu berkas suara
 * yang sama ditempatkan pada detik yang sama. Hasilnya adalah persis yang didengar
 * pemain — bukan tebakan kapan efek suara seharusnya berbunyi.
 */
const { chromium } = require("@playwright/test");
const { execFileSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const AKAR = path.join(__dirname, "..");
const URL = process.env.ADIL_URL || "http://127.0.0.1:5174";
const KERJA = path.join(AKAR, "rekaman");
const HASIL = path.join(AKAR, "video-demonstrasi.mp4");
const AUDIO = JSON.parse(fs.readFileSync(path.join(AKAR, "src/data/config.json"), "utf8")).audio;
const jeda = (ms) => new Promise((r) => setTimeout(r, ms));

/** Gerakkan kursor bertahap supaya terbaca di video, bukan melompat. */
async function arahkan(page, sel, langkah = 22) {
  const el = page.locator(sel).first();
  await el.scrollIntoViewIfNeeded().catch(() => {});
  const b = await el.boundingBox();
  if (!b) return null;
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: langkah });
  await jeda(450);
  return el;
}

async function klik(page, sel, tunggu = 1100) {
  const el = await arahkan(page, sel);
  if (el) { await el.click(); await jeda(tunggu); }
  return el;
}

async function klikLocator(page, el, tunggu, langkah = 16) {
  const b = await el.boundingBox();
  if (b) { await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: langkah }); await jeda(320); }
  await el.click();
  await jeda(tunggu);
}

async function rekam() {
  fs.rmSync(KERJA, { recursive: true, force: true });
  fs.mkdirSync(KERJA, { recursive: true });

  const browser = await chromium.launch({ args: ["--no-sandbox", "--hide-scrollbars"] });
  const ctx = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: { dir: KERJA, size: { width: 1920, height: 1080 } }
  });

  const log = [];
  await ctx.exposeFunction("__catatAudio", (e) => log.push(e));
  await ctx.addInitScript(() => {
    localStorage.clear();
    const id = new WeakMap();
    let n = 0;
    const catat = (el, jenis) => {
      if (!el.src || !el.src.includes("/assets/audio/")) return;
      if (!id.has(el)) id.set(el, ++n);
      window.__catatAudio({ t: Date.now(), jenis, node: id.get(el), src: el.src.split("/assets/audio/")[1] });
    };
    const play = HTMLMediaElement.prototype.play;
    const pause = HTMLMediaElement.prototype.pause;
    HTMLMediaElement.prototype.play = function () { catat(this, "play"); return play.apply(this, arguments); };
    HTMLMediaElement.prototype.pause = function () { catat(this, "pause"); return pause.apply(this, arguments); };
  });

  const page = await ctx.newPage();
  const t0 = Date.now(); // perekaman video dimulai bersama halaman

  // 1–2 · Laman Muka & tujuan pembelajaran
  await page.goto(URL + "/#/", { waitUntil: "networkidle" });
  await page.locator("text=TUJUAN PEMBELAJARAN").waitFor();
  await jeda(400);
  // Rekaman sudah berjalan selama halaman dimuat; bagian kosong itu dipotong nanti.
  const tampil = (Date.now() - t0) / 1000;
  await jeda(2600);
  await arahkan(page, "text=TUJUAN PEMBELAJARAN");
  await jeda(3200);

  // 3 · Panduan cara bermain
  await klik(page, "text=CARA BERMAIN", 1500);
  for (const s of ["text=LIMA TAHAP TIAP SIDANG", "text=CARA SKOR DIHITUNG", "text=KONTROL"]) {
    await arahkan(page, s);
    await jeda(1500);
  }

  // 4 · Orientasi — biarkan kalimat pertama Arya (7,3 dtk) selesai sebelum dilewati
  await klik(page, "text=MULAI SIDANG ▸", 1600);
  await jeda(6200);
  await klik(page, "text=LEWATI DIALOG", 1500);

  // 5 · Arsip kasus: tampakkan penguncian bertingkat
  await arahkan(page, "text=ADIL-002");
  await jeda(1200);
  await arahkan(page, "text=SELESAIKAN SIDANG SEBELUMNYA");
  await jeda(1600);

  // 6 · Briefing — sapaan Arya (7,9 dtk) berbunyi saat ruang investigasi terbuka
  await klik(page, "text=MULAI INVESTIGASI", 1800);
  await arahkan(page, "text=MANFAAT SISTEM INI");
  await jeda(5800);

  // 7 · Papan bukti: tiga pertama pelan agar temuan terbaca, sisanya cepat —
  //     tahap Analisis hanya menawarkan berkas yang sudah dipindai.
  await klik(page, "text=02 · PAPAN BUKTI", 1200);
  const pindai = page.getByRole("button", { name: /^Pindai berkas / });
  for (let i = 0; (await pindai.count()) > 0; i++) {
    const lambat = i < 3;
    await klikLocator(page, pindai.first(), lambat ? 1500 : 450, lambat ? 18 : 6);
  }

  // 8 · Interogasi LUMA — tunggu jawaban selesai; pertanyaan berikutnya memotong suara
  await klik(page, "text=03 · INTEROGASI AI", 1300);
  for (const tunggu of [7900, 5000]) {
    const q = page.getByRole("button", { name: /^▸ / }).first();
    if (!(await q.count())) break;
    await klikLocator(page, q, tunggu);
  }

  // 9 · Meja analisis
  await klik(page, "text=04 · ANALISIS", 1300);
  for (const t of ["LAPORAN DATASET", "SURAT KETERANGAN EKONOMI", "TUJUAN PROGRAM BEASISWA"]) {
    await klikLocator(page, page.getByRole("button").filter({ hasText: t }).first(), 800).catch(() => {});
  }
  await klik(page, "text=KUNCI ANALISIS", 2200);

  // 10 · Ruang putusan
  await klik(page, "text=LANJUT KE RUANG PUTUSAN ▸", 2000);
  await jeda(1800);
  const opsi = page.getByRole("button").filter({ hasText: "Keputusan AI bias karena data tidak lengkap" }).first();
  await klikLocator(page, opsi, 2600, 20);

  // 11 · Hasil — Prof. Nara menutup sidang (10,8 dtk)
  for (const s of ["text=EVIDENCE SCORE", "text=EVALUASI PUTUSANMU", "text=LENCANA"]) {
    await arahkan(page, s);
    await jeda(2700);
  }

  // 12 · Pengaturan & aksesibilitas, lalu kembali ke lobi
  await klik(page, 'button[aria-label="Pengaturan"]', 1600);
  await jeda(2400);
  await page.keyboard.press("Escape");
  await jeda(900);
  await page.goto(URL + "/#/", { waitUntil: "networkidle" });
  await jeda(2800);

  await ctx.close();
  await browser.close();

  const webm = path.join(KERJA, fs.readdirSync(KERJA).find((f) => f.endsWith(".webm")));
  return { webm, t0, log, tampil };
}

/** Ubah catatan play/pause menjadi potongan suara berawal-berakhir. */
function potongan({ t0, log, tampil }, durasiVideo) {
  const kategori = (src) => src.startsWith("background/") ? "musik" : src.startsWith("effects/") ? "sfx" : "suara";
  const aktif = new Map();
  const hasil = [];
  for (const e of log) {
    const dtk = (e.t - t0) / 1000 - tampil;
    if (e.jenis === "play") {
      if (aktif.has(e.node)) continue;
      aktif.set(e.node, { src: e.src, mulai: dtk, jenis: kategori(e.src) });
    } else if (aktif.has(e.node)) {
      hasil.push({ ...aktif.get(e.node), selesai: dtk });
      aktif.delete(e.node);
    }
  }
  for (const p of aktif.values()) hasil.push({ ...p, selesai: durasiVideo });
  for (const p of hasil) p.mulai = Math.max(0, p.mulai);

  // Tema baru boleh berbunyi setelah interaksi pertama (kebijakan autoplay peramban).
  // Di video, tema lobi diawali sejak detik nol agar pembuka tidak senyap.
  const tema = hasil.find((p) => p.jenis === "musik");
  if (tema && tema.src.includes("adil_theme")) tema.mulai = 0;
  return hasil.filter((p) => p.selesai - p.mulai > 0.05);
}

function durasi(berkas) {
  return parseFloat(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", berkas]).toString());
}

function gabungkan(webm, bagian, durasiVideo, potongAwal) {
  const masukan = ["-y", "-hide_banner", "-loglevel", "error", "-ss", potongAwal.toFixed(3), "-i", webm];
  const filter = [];
  const label = [];
  const volume = { musik: AUDIO.music_volume, sfx: AUDIO.sfx_volume, suara: AUDIO.voice_volume };

  bagian.forEach((p, i) => {
    const berkas = path.join(AKAR, "public/assets/audio", p.src);
    if (p.jenis === "musik") masukan.push("-stream_loop", "-1");
    masukan.push("-i", berkas);
    const panjang = (p.selesai - p.mulai).toFixed(3);
    const tunda = Math.max(0, Math.round(p.mulai * 1000));
    const rantai = [`atrim=0:${panjang}`, "asetpts=PTS-STARTPTS", `volume=${volume[p.jenis]}`];
    if (p.jenis === "musik") {
      rantai.push("afade=t=in:d=0.8", `afade=t=out:st=${Math.max(0, panjang - 0.6).toFixed(3)}:d=0.6`);
    }
    rantai.push(`adelay=${tunda}|${tunda}`);
    filter.push(`[${i + 1}:a]${rantai.join(",")}[a${i}]`);
    label.push(`[a${i}]`);
  });

  const akhir = durasiVideo.toFixed(3);
  filter.push(
    `${label.join("")}amix=inputs=${label.length}:normalize=0:dropout_transition=0,` +
    `apad,atrim=0:${akhir},afade=t=out:st=${(durasiVideo - 2).toFixed(3)}:d=2,alimiter=limit=0.95[aout]`
  );

  execFileSync("ffmpeg", [
    ...masukan,
    "-filter_complex", filter.join(";"),
    "-map", "0:v", "-map", "[aout]",
    "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p", "-r", "30",
    "-b:v", "5000k", "-maxrate", "6000k", "-bufsize", "10000k",
    "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-ac", "2",
    "-movflags", "+faststart", "-t", akhir, HASIL
  ], { stdio: "inherit" });
}

(async () => {
  const rekaman = await rekam();
  const panjang = durasi(rekaman.webm) - rekaman.tampil;
  const bagian = potongan(rekaman, panjang);
  fs.writeFileSync(path.join(KERJA, "audio-log.json"), JSON.stringify(bagian, null, 1));

  console.log(`rekaman ${panjang.toFixed(1)} dtk, ${bagian.length} potongan suara:`);
  for (const p of bagian) console.log(`  ${p.mulai.toFixed(1).padStart(6)}–${p.selesai.toFixed(1).padEnd(6)} ${p.jenis.padEnd(6)} ${p.src}`);

  console.log(`bagian kosong saat memuat dipotong: ${rekaman.tampil.toFixed(1)} dtk`);
  gabungkan(rekaman.webm, bagian, panjang, rekaman.tampil);
  console.log("\n✓", HASIL);
})();
