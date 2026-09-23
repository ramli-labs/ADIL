import { expect, test } from "@playwright/test";
import { KASUS, kunciAnalisis, mainkanSidang, masukSidangPertama, pindaiSemuaBukti, tanyaSemuaPertanyaan } from "./helpers";

const SIDANG_1 = KASUS[0];
const KUNCI_SAVE = "adil.save.v3";

const bacaSave = (page: import("@playwright/test").Page) =>
  page.evaluate((k) => JSON.parse(localStorage.getItem(k) ?? "{}"), KUNCI_SAVE);

test.describe("ketahanan data", () => {
  /**
   * Skor tersimpan mewakili pencapaian terbaik siswa. Mengulang sidang untuk belajar
   * tidak boleh menghukum mereka dengan menimpa skor lama yang lebih tinggi.
   */
  test("mengulang sidang tidak menurunkan skor yang sudah tersimpan", async ({ page }) => {
    await masukSidangPertama(page);
    await mainkanSidang(page, SIDANG_1);
    const awal = (await bacaSave(page)).cases.case001.total;
    expect(awal).toBeGreaterThan(80);

    // Ulangi dengan buruk: tanpa interogasi, bukti kunci salah semua, putusan lemah.
    await page.goto("/case/case001");
    await pindaiSemuaBukti(page);
    await kunciAnalisis(page, ["RAPOR ANDI", "LOG KEHADIRAN", "JADWAL SERVER"]);
    await page.getByRole("button", { name: "LANJUT KE RUANG PUTUSAN ▸" }).click();
    await page.getByRole("button").filter({ hasText: "AI salah dan sengaja merugikan Andi" }).click();
    await page.waitForURL("**/result");

    expect((await bacaSave(page)).cases.case001.total).toBe(awal);
  });

  /** Lencana disimpan sebagai daftar; entri kembar akan menggandakan hitungan di profil. */
  test("lencana tidak pernah tercatat dobel", async ({ page }) => {
    await masukSidangPertama(page);
    await mainkanSidang(page, SIDANG_1);
    const pertama = (await bacaSave(page)).badges;
    expect(pertama.length).toBeGreaterThan(0);
    expect(new Set(pertama).size).toBe(pertama.length);

    // Mainkan ulang: syarat lencana yang sama terpenuhi lagi.
    await page.goto("/case/case001");
    await pindaiSemuaBukti(page);
    await tanyaSemuaPertanyaan(page);
    await kunciAnalisis(page, SIDANG_1.buktiKunci);
    await page.getByRole("button", { name: "LANJUT KE RUANG PUTUSAN ▸" }).click();
    await page.getByRole("button").filter({ hasText: SIDANG_1.putusanTerbaik }).click();
    await page.waitForURL("**/result");

    const kedua = (await bacaSave(page)).badges;
    expect(new Set(kedua).size).toBe(kedua.length);
  });

  /**
   * Sprite dan environment sengaja opsional — sekolah boleh memangkas aset berat.
   * Tanpa satu pun gambar, sidang harus tetap bisa dituntaskan.
   */
  test("sidang tetap bisa dituntaskan tanpa satu pun file gambar", async ({ page }) => {
    await page.route("**/assets/**", (route) => route.abort());
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));

    await masukSidangPertama(page);
    await mainkanSidang(page, SIDANG_1);

    await expect(page.getByText("JUSTICE SCORE").first()).toBeVisible();
    expect(errors).toEqual([]);
  });
});
