/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#081A33", deep: "#050e1c", panel: "#0a1a30" },
        gold: "#D4AF37",
        cyan: { DEFAULT: "#00D9FF" },
        haze: "#AAB7C4",
        nara: "#C7A6FF"
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      keyframes: {
        scanline: { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(900%)" } },
        holo: { from: { opacity: "0", transform: "translateY(24px) scale(.96)" }, to: { opacity: "1", transform: "none" } }
      },
      animation: { scanline: "scanline 6s linear infinite", holo: "holo .8s ease both" }
    }
  },
  plugins: []
};
