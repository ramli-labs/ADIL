import { expect, test } from "@playwright/test";
import { bukaKunciSampai, KASUS, mainkanSidang } from "./helpers";

/**
 * Keempat kasus punya set bukti, pertanyaan, dan opsi putusan sendiri-sendiri di
 * data JSON. Sebelumnya hanya case001 yang terjaga otomatis, padahal kesalahan
 * penulisan konten pada kasus lain (id bukti tidak cocok, verdict_set salah tunjuk)
 * hanya ketahuan saat kasus itu benar-benar dimainkan.
 *
 * Kasus pendahulunya tidak ikut dimainkan — save-nya di-seed supaya kuncinya terbuka,
 * jadi tiap kasus diuji terisolasi dan suite-nya tetap cepat.
 */
test.describe("tiap kasus bisa dituntaskan", () => {
  for (const [indeks, kasus] of KASUS.entries()) {
    test(`${kasus.kode} — putusan terbaik memberi skor etika penuh`, async ({ page }) => {
      await bukaKunciSampai(page, indeks);
      await page.goto(`/case/${kasus.id}`);
      await expect(page).toHaveURL(new RegExp(`/case/${kasus.id}$`));

      await mainkanSidang(page, kasus);

      // Rincian di panel hasil — bukan toast, yang teksnya sebagian sama.
      const n = kasus.buktiKunci.length;
      await expect(page.getByText(new RegExp(`\\d+/\\d+ pertanyaan diajukan · ${n}/${n} bukti kunci tepat`))).toBeVisible();
      await expect(page.getByText("40/40")).toBeVisible();
    });
  }
});
