/**
 * Merekam video demonstrasi ADIL mengikuti docs/demo-video-storyboard.md.
 * Menghasilkan rekaman layar 1920×1080 tanpa narasi — narasi ditambahkan terpisah.
 *
 *   node tools/rekam-demo.js            (butuh dev server di :5174)
 */
const { chromium } = require("@playwright/test");
const path = require("path");
const fs = require("fs");

const URL = process.env.ADIL_URL || "http://127.0.0.1:5174";
const KELUARAN = path.join(__dirname, "..", "rekaman");
const jeda = (ms) => new Promise((r) => setTimeout(r, ms));

/** Gerakkan kursor bertahap supaya terbaca di video, bukan melompat. */
async function arahkan(page, sel) {
  const el = page.locator(sel).first();
  await el.scrollIntoViewIfNeeded().catch(() => {});
  const b = await el.boundingBox();
  if (!b) return null;
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 22 });
  await jeda(450);
  return el;
}

async function klik(page, sel, tunggu = 1100) {
  const el = await arahkan(page, sel);
  if (el) { await el.click(); await jeda(tunggu); }
  return el;
}

(async () => {
  fs.rmSync(KELUARAN, { recursive: true, force: true });
  fs.mkdirSync(KELUARAN, { recursive: true });

  const browser = await chromium.launch({ args: ["--no-sandbox", "--hide-scrollbars"] });
  const ctx = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: { dir: KELUARAN, size: { width: 1920, height: 1080 } },
    deviceScaleFactor: 1
  });
  const page = await ctx.newPage();
  // Mulai dari progres bersih agar seluruh sidang tampak terkunci.
  await page.addInitScript(() => localStorage.clear());

  // 1–2 · Laman Muka & tujuan pembelajaran
  await page.goto(URL + "/#/", { waitUntil: "networkidle" });
  await jeda(2600);
  await arahkan(page, "text=TUJUAN PEMBELAJARAN");
  await jeda(3200);

  // 3 · Panduan cara bermain
  await klik(page, "text=CARA BERMAIN", 1500);
  for (const s of ["text=LIMA TAHAP TIAP SIDANG", "text=CARA SKOR DIHITUNG", "text=KONTROL"]) {
    await arahkan(page, s);
    await jeda(1500);
  }

  // 4 · Orientasi
  await klik(page, "text=MULAI SIDANG ▸", 1600);
  await jeda(2200);
  await klik(page, "text=LEWATI DIALOG", 1500);

  // 5 · Arsip kasus: tampakkan penguncian bertingkat
  await arahkan(page, "text=ADIL-002");
  await jeda(1200);
  await arahkan(page, "text=SELESAIKAN SIDANG SEBELUMNYA");
  await jeda(1600);

  // 6 · Briefing: keyakinan & manfaat sistem
  await klik(page, "text=MULAI INVESTIGASI", 1800);
  await arahkan(page, "text=MANFAAT SISTEM INI");
  await jeda(2600);

  // 7 · Papan bukti: umpan balik instan
  await klik(page, "text=02 · PAPAN BUKTI", 1200);
  const pindai = page.getByRole("button", { name: /^Pindai berkas / });
  // Tiga pertama pelan agar temuan dan umpan balik terbaca di video,
  // sisanya cepat — tahap Analisis hanya menawarkan berkas yang sudah dipindai.
  for (let i = 0; (await pindai.count()) > 0; i++) {
    const lambat = i < 3;
    const b = await pindai.first().boundingBox();
    if (!b) break;
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: lambat ? 18 : 6 });
    await jeda(lambat ? 350 : 120);
    await pindai.first().click();
    await jeda(lambat ? 1500 : 450);
  }

  // 8 · Interogasi LUMA
  await klik(page, "text=03 · INTEROGASI AI", 1300);
  for (let i = 0; i < 2; i++) {
    const q = page.getByRole("button", { name: /^▸ / }).first();
    if (!(await q.count())) break;
    const b = await q.boundingBox();
    if (b) await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 16 });
    await jeda(300);
    await q.click();
    await jeda(2100);
  }

  // 9 · Meja analisis
  await klik(page, "text=04 · ANALISIS", 1300);
  for (const t of ["LAPORAN DATASET", "SURAT KETERANGAN EKONOMI", "TUJUAN PROGRAM BEASISWA"]) {
    const el = page.getByRole("button").filter({ hasText: t }).first();
    const b = await el.boundingBox();
    if (b) { await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 16 }); await jeda(320); }
    await el.click().catch(() => {});
    await jeda(800);
  }
  await klik(page, "text=KUNCI ANALISIS", 2200);

  // 10 · Ruang putusan
  await klik(page, "text=LANJUT KE RUANG PUTUSAN ▸", 2000);
  await jeda(1800);
  const opsi = page.getByRole("button").filter({ hasText: "Keputusan AI bias karena data tidak lengkap" }).first();
  const bo = await opsi.boundingBox();
  if (bo) { await page.mouse.move(bo.x + bo.width / 2, bo.y + bo.height / 2, { steps: 20 }); await jeda(900); }
  await opsi.click();
  await jeda(2600);

  // 11 · Hasil: skor, lencana, evaluasi
  for (const s of ["text=EVIDENCE SCORE", "text=EVALUASI PUTUSANMU", "text=LENCANA"]) {
    await arahkan(page, s);
    await jeda(1900);
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

  const webm = fs.readdirSync(KELUARAN).find((f) => f.endsWith(".webm"));
  console.log("rekaman mentah:", path.join(KELUARAN, webm));
})();
