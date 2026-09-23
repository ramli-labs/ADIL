import { AnimatePresence, motion } from "framer-motion";
import { useRegisterSW } from "virtual:pwa-register/react";

/**
 * Versi baru sengaja tidak dipasang diam-diam: kalau service worker berganti di
 * tengah sidang, pemain bisa melihat layar berubah tanpa sebab. Jadi versi baru
 * menunggu di latar sampai pemain menekan MUAT ULANG.
 */
export default function UpdateNotice() {
  const { needRefresh: [perluMuatUlang], updateServiceWorker } = useRegisterSW({
    onRegisteredSW(_url, registration) {
      if (!registration) return;
      // Service worker hanya diperiksa saat halaman dimuat. Tab yang dibiarkan terbuka
      // sepanjang jam pelajaran tak akan pernah tahu ada versi baru, jadi periksa lagi
      // tiap kali tab kembali dilihat.
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") registration.update();
      });
    }
  });

  return (
    <AnimatePresence>
      {perluMuatUlang && (
        <motion.div
          role="status" aria-live="polite"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
          className="fixed bottom-6 right-6 z-[70] flex max-w-[calc(100vw-3rem)] flex-wrap items-center gap-4 border border-cyan/50 bg-navy-deep px-5 py-4 shadow-[0_8px_30px_rgba(0,0,0,.5)]"
        >
          <span className="font-mono text-[11px] leading-relaxed tracking-[.06em] text-white">
            Versi baru ADIL tersedia.
            <span className="mt-0.5 block text-haze">Progresmu tetap tersimpan.</span>
          </span>
          <button
            onClick={() => {
              // Reload ditangani sendiri, bukan lewat updateServiceWorker(true): reload
              // bawaannya terbukti tidak menyala di sini, sedangkan controllerchange selalu.
              navigator.serviceWorker.addEventListener(
                "controllerchange", () => window.location.reload(), { once: true }
              );
              updateServiceWorker(false);
            }}
            className="border border-cyan bg-cyan/15 px-4 py-2.5 font-mono text-[10px] tracking-[.16em] text-cyan hover:bg-cyan/25"
          >
            MUAT ULANG
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
