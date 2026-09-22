import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
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
