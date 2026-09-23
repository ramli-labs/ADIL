import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  // Relatif, bukan "/": karya lomba dibuka langsung dari hasil ekstrak ZIP,
  // sehingga path absolut membuat seluruh aset gagal dimuat.
  base: "./",
  plugins: [
    react(),
    VitePWA({
      // "prompt", bukan "autoUpdate": versi baru tidak boleh menyelinap masuk di tengah
      // sidang yang sedang berjalan. Pemain diberi tahu dan memilih kapan memuat ulang.
      registerType: "prompt",
      injectRegister: null, // registrasi dilakukan dari UpdateNotice.tsx
      includeAssets: ["favicon.svg", "icon-192.png", "icon-512.png", "icon-maskable-512.png"],
      manifest: {
        name: "ADIL — The AI Trial",
        short_name: "ADIL",
        description: "Game investigasi etika AI untuk siswa SMP. Jadilah AI Justice Analyst di ADIL Academy.",
        lang: "id",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "any",
        background_color: "#050e1c",
        theme_color: "#050e1c",
        icons: [
          { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
        ]
      },
      workbox: {
        // Shell, sprite, dan SFX (76KB) di-precache supaya sidang langsung bisa dimainkan
        // offline. Musik latar & suara karakter (9MB) sengaja dibiarkan runtime-cache:
        // game dirancang tetap jalan dengan subtitle saja, jadi tidak perlu menahan muat pertama.
        globPatterns: ["**/*.{js,css,html,woff2,png,svg}", "assets/audio/effects/*.mp3"],
        navigateFallback: "/index.html",
        cleanupOutdatedCaches: true,
        // Wajib bersama registerType "prompt": tanpa ini SW baru aktif tapi tidak pernah
        // mengambil alih tab yang sudah terbuka, jadi "controllerchange" tak menyala dan
        // tombol MUAT ULANG tidak menghasilkan apa-apa. skipWaiting tetap mati —
        // pergantian versi hanya boleh terjadi setelah pemain menekan tombol.
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /\/assets\/audio\/.*\.mp3$/,
            handler: "CacheFirst",
            options: {
              cacheName: "adil-audio",
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 90 },
              cacheableResponse: { statuses: [0, 200] },
              rangeRequests: true
            }
          }
        ]
      }
    })
  ],
  resolve: { alias: { "@": "/src" } }
});
