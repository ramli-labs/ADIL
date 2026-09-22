import { expect, test } from "@playwright/test";
import {
  CASE001_KEY_EVIDENCE, kunciAnalisis, masukSidangPertama, pindaiSemuaBukti, tanyaSemuaPertanyaan
} from "./helpers";

test.describe("alur sidang", () => {
  /**
   * Regresi: transisi ke halaman putusan pernah macet permanen — URL berubah ke
   * /verdict tapi halaman lama tetap tampil dengan opacity 0, tanpa error konsol.
   * Akibatnya tidak ada satu pun sidang yang bisa diselesaikan.
   */
  test("satu sidang penuh bisa diselesaikan sampai halaman hasil", async ({ page }) => {
    await masukSidangPertama(page);
    await pindaiSemuaBukti(page);
    await tanyaSemuaPertanyaan(page);
    await kunciAnalisis(page, CASE001_KEY_EVIDENCE);

    await page.getByRole("button", { name: "LANJUT KE RUANG PUTUSAN ▸" }).click();
    await page.waitForURL("**/case/case001/verdict");
    await expect(page.getByText("RUANG PUTUSAN")).toBeVisible();

    await page.getByRole("button").filter({ hasText: "Keputusan AI bias karena data tidak lengkap" }).click();
    await page.waitForURL("**/case/case001/result");
    await expect(page.getByText("JUSTICE SCORE").first()).toBeVisible();
  });

  /**
   * Regresi: penguncian kasus hanya menonaktifkan tombol di halaman arsip, tapi
   * Investigation memulai kasus apa pun yang id-nya ada di URL — progresi tingkat
   * kesulitan bisa dilompati cukup dengan mengetik alamat.
   */
  test("kasus terkunci tidak bisa dibuka lewat URL langsung", async ({ page }) => {
    await page.goto("/case/case003");
    await page.waitForURL("**/cases");
    await expect(page.getByText("SELESAIKAN SIDANG SEBELUMNYA").first()).toBeVisible();
  });

  test("menyelesaikan kasus pertama membuka kasus kedua", async ({ page }) => {
    await page.goto("/cases");
    await expect(page.getByText("ADIL-002")).toBeVisible();
    await expect(page.getByText("SELESAIKAN SIDANG SEBELUMNYA").first()).toBeVisible();

    await masukSidangPertama(page);
    await pindaiSemuaBukti(page);
    await tanyaSemuaPertanyaan(page);
    await kunciAnalisis(page, CASE001_KEY_EVIDENCE);
    await page.getByRole("button", { name: "LANJUT KE RUANG PUTUSAN ▸" }).click();
    await page.getByRole("button").filter({ hasText: "Keputusan AI bias karena data tidak lengkap" }).click();
    await page.waitForURL("**/result");

    await page.goto("/case/case002");
    await expect(page).toHaveURL(/\/case\/case002$/);
    await expect(page.getByText("SISWA YANG TAK TERLIHAT")).toBeVisible();
  });

  /** Progres disimpan di localStorage, jadi reload tidak boleh menghapus skor. */
  test("skor bertahan setelah halaman dimuat ulang", async ({ page }) => {
    await masukSidangPertama(page);
    await pindaiSemuaBukti(page);
    await tanyaSemuaPertanyaan(page);
    await kunciAnalisis(page, CASE001_KEY_EVIDENCE);
    await page.getByRole("button", { name: "LANJUT KE RUANG PUTUSAN ▸" }).click();
    await page.getByRole("button").filter({ hasText: "Keputusan AI bias karena data tidak lengkap" }).click();
    await page.waitForURL("**/result");

    await page.goto("/profile");
    await expect(page.getByText("1/4")).toBeVisible();
    await page.reload();
    await expect(page.getByText("1/4")).toBeVisible();
  });
});
