import type { Page } from "@playwright/test";

/** Bukti kunci case001 — cocok dengan `analysis.key` di cases.json. */
export const CASE001_KEY_EVIDENCE = ["LAPORAN DATASET", "RAPOR ANDI", "SURAT KETERANGAN EKONOMI"];

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
  for (let i = await belumDitanya.count(); i > 0; i--) {
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

/** Buka modal pengaturan dari HUD. */
export async function bukaPengaturan(page: Page) {
  await page.getByRole("button", { name: "Pengaturan" }).click();
}

/** Baca blok settings dari save di localStorage. */
export async function bacaSettings(page: Page) {
  return page.evaluate(() => {
    const kunci = Object.keys(localStorage).find((k) => k.toLowerCase().includes("adil"));
    return kunci ? JSON.parse(localStorage.getItem(kunci)!).settings : null;
  });
}
