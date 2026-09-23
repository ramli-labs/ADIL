import type { Page } from "@playwright/test";

const KUNCI_SAVE = "adil.save.v3";

export type Kasus = {
  id: string;
  kode: string;
  /** Judul bukti pada `analysis.key` di cases.json — pilihan yang dinilai benar. */
  buktiKunci: string[];
  /** Potongan teks opsi putusan bertier "best". */
  putusanTerbaik: string;
};

/** Urutannya harus sama dengan cases.json, karena kunci kasus memakai indeks. */
export const KASUS: Kasus[] = [
  {
    id: "case001", kode: "ADIL-001",
    buktiKunci: ["LAPORAN DATASET", "SURAT KETERANGAN EKONOMI", "TUJUAN PROGRAM BEASISWA"],
    putusanTerbaik: "Keputusan AI bias karena data tidak lengkap"
  },
  {
    id: "case002", kode: "ADIL-002",
    buktiKunci: ["AKURASI PER KELOMPOK", "KOMPOSISI DATASET LATIH", "LAPORAN CONFIDENCE"],
    putusanTerbaik: "Hentikan sementara keputusan otomatis"
  },
  {
    id: "case003", kode: "ADIL-003",
    buktiKunci: ["KEBIJAKAN SEKOLAH", "WAWANCARA SINTA", "SURVEI SISWA"],
    putusanTerbaik: "hanya sebagai bahan diskusi"
  },
  {
    id: "case004", kode: "ADIL-004",
    buktiKunci: ["SURAT RUMAH SAKIT", "TABEL SANKSI OTOMATIS", "LOG PERSETUJUAN"],
    putusanTerbaik: "Batalkan skors"
  }
];

/**
 * Tandai kasus-kasus sebelum `indeks` sebagai selesai, supaya kasus ke-`indeks`
 * terbuka tanpa perlu memainkan semua pendahulunya. Dipasang sebelum skrip aplikasi
 * jalan, karena gerbang kunci membaca save saat muat pertama.
 */
export async function bukaKunciSampai(page: Page, indeks: number) {
  const sebelumnya = KASUS.slice(0, indeks).map((k) => k.id);
  await page.addInitScript(([kunci, ids]: [string, string[]]) => {
    const rekaman = (id: string) => ({
      total: 100, evidence: 35, reasoning: 25, ethics: 40, verdict: `${id}_v`, tier: "best",
      traits: [], relFound: 0, relTotal: 0, asked: 0, askTotal: 0,
      correctPicks: 0, pickTotal: 0, scannedAll: true, completedAt: Date.now()
    });
    localStorage.setItem(kunci, JSON.stringify({
      playerName: null, badges: [], teacherMode: false,
      settings: { sound: true, narration: true, reducedMotion: false },
      cases: Object.fromEntries(ids.map((id) => [id, rekaman(id)]))
    }));
  }, [KUNCI_SAVE, sebelumnya] as [string, string[]]);
}

/** Dari beranda sampai ruang investigasi case001, melewati dialog orientasi. */
export async function masukSidangPertama(page: Page) {
  await page.goto("/");
  await page.getByText("MULAI SIDANG").click();
  await page.getByText("LEWATI DIALOG").click();
  await page.getByText("MULAI INVESTIGASI").first().click();
  await page.waitForURL("**/case/case001");
}

/** Pindai seluruh berkas pada fase papan bukti. */
export async function pindaiSemuaBukti(page: Page) {
  await page.getByRole("button", { name: "02 · PAPAN BUKTI" }).click();
  const belumDipindai = page.getByRole("button", { name: /^Pindai berkas / });
  await belumDipindai.first().waitFor();
  for (let sisa = await belumDipindai.count(); sisa > 0; sisa--) {
    await belumDipindai.first().click();
  }
}

/** Ajukan seluruh pertanyaan yang tersedia ke LUMA. */
export async function tanyaSemuaPertanyaan(page: Page) {
  await page.getByRole("button", { name: "03 · INTEROGASI AI" }).click();
  const belumDitanya = page.getByRole("button", { name: /^▸ / });
  for (let sisa = await belumDitanya.count(); sisa > 0; sisa--) {
    await belumDitanya.first().click();
  }
}

/** Pilih bukti kunci lalu kunci analisis. */
export async function kunciAnalisis(page: Page, bukti: string[]) {
  await page.getByRole("button", { name: "04 · ANALISIS" }).click();
  for (const judul of bukti) {
    await page.getByRole("button").filter({ hasText: judul }).click();
  }
  await page.getByRole("button", { name: "KUNCI ANALISIS" }).click();
}

/** Satu sidang utuh: pindai semua, tanya semua, pilih bukti kunci, jatuhkan putusan terbaik. */
export async function mainkanSidang(page: Page, kasus: Kasus) {
  await pindaiSemuaBukti(page);
  await tanyaSemuaPertanyaan(page);
  await kunciAnalisis(page, kasus.buktiKunci);
  await page.getByRole("button", { name: "LANJUT KE RUANG PUTUSAN ▸" }).click();
  await page.waitForURL(`**/case/${kasus.id}/verdict`);
  await page.getByRole("button").filter({ hasText: kasus.putusanTerbaik }).click();
  await page.waitForURL(`**/case/${kasus.id}/result`);
}

/** Buka modal pengaturan dari HUD. */
export async function bukaPengaturan(page: Page) {
  await page.getByRole("button", { name: "Pengaturan" }).click();
}

/** Baca blok settings dari save di localStorage. */
export async function bacaSettings(page: Page) {
  return page.evaluate((kunci) => {
    const isi = localStorage.getItem(kunci);
    return isi ? JSON.parse(isi).settings : null;
  }, KUNCI_SAVE);
}
