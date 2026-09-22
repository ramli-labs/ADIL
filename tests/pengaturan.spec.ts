import { expect, test } from "@playwright/test";
import { bacaSettings, bukaPengaturan } from "./helpers";

test.describe("pengaturan", () => {
  /**
   * Regresi: modal sempat dirender di dalam <header> yang punya stacking context
   * sendiri, jadi header institusional menimpanya dan baris toggle teratas tak
   * bisa diklik sama sekali — padahal tampak terlihat di layar.
   */
  test("setiap toggle bisa diklik dan tersimpan", async ({ page }) => {
    await page.goto("/");
    await bukaPengaturan(page);

    const toggle = page.getByRole("checkbox");
    await expect(toggle).toHaveCount(3);
    for (let i = 0; i < 3; i++) await toggle.nth(i).click();

    expect(await bacaSettings(page)).toEqual({ sound: false, narration: false, reducedMotion: true });
  });

  test("pilihan bertahan setelah dimuat ulang", async ({ page }) => {
    await page.goto("/");
    await bukaPengaturan(page);
    await page.getByRole("checkbox").first().click();

    await page.reload();
    await expect(page.getByText("AUDIO OFF")).toBeVisible();
    await bukaPengaturan(page);
    await expect(page.getByRole("checkbox").first()).not.toBeChecked();
  });

  /**
   * Regresi: modal sempat tidak menangani keyboard sama sekali — Escape tak berfungsi,
   * fokus tidak masuk ke dalamnya, dan Tab bocor ke tombol di halaman yang tertutup.
   */
  test("bisa ditutup dengan Escape", async ({ page }) => {
    await page.goto("/");
    await bukaPengaturan(page);
    await expect(page.getByRole("dialog", { name: "Pengaturan" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Pengaturan" })).toBeHidden();
  });

  test("fokus keyboard tidak keluar dari modal", async ({ page }) => {
    await page.goto("/");
    await bukaPengaturan(page);

    for (let i = 0; i < 10; i++) {
      await page.keyboard.press("Tab");
      const didalam = await page.evaluate(() =>
        !!document.activeElement?.closest('[role="dialog"]'));
      expect(didalam).toBe(true);
    }
  });

  /** Reset butuh konfirmasi — sekali klik tidak boleh langsung menghapus progres. */
  test("reset progres meminta konfirmasi lebih dulu", async ({ page }) => {
    await page.goto("/");
    await bukaPengaturan(page);
    await page.getByRole("button", { name: "RESET SELURUH PROGRES" }).click();

    await expect(page.getByText(/tidak bisa dibatalkan/)).toBeVisible();
    await page.getByRole("button", { name: "BATAL" }).click();
    await expect(page.getByRole("button", { name: "RESET SELURUH PROGRES" })).toBeVisible();
  });

  test("reset mengembalikan pengaturan ke bawaan", async ({ page }) => {
    await page.goto("/");
    await bukaPengaturan(page);
    await page.getByRole("checkbox").nth(2).click();
    expect((await bacaSettings(page)).reducedMotion).toBe(true);

    await page.getByRole("button", { name: "RESET SELURUH PROGRES" }).click();
    await page.getByRole("button", { name: "YA, HAPUS SEMUA" }).click();

    await expect(page).toHaveURL("/");
    expect(await bacaSettings(page)).toEqual({ sound: true, narration: true, reducedMotion: false });
  });
});
