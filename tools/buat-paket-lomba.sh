#!/usr/bin/env bash
# Merakit paket karya Festival Biru Putih dari hasil build.
# Ketentuan yang dipenuhi: index.html di root ZIP, seluruh aset lokal, dan PDF panduan disertakan.
set -euo pipefail

AKAR="$(cd "$(dirname "$0")/.." && pwd)"
KELUARAN="$AKAR/paket-lomba"
NAMA="ADIL-The-AI-Trial"

cd "$AKAR"
echo "▸ Membangun ulang dari sumber…"
npm run build >/dev/null

rm -rf "$KELUARAN"
mkdir -p "$KELUARAN/$NAMA"

echo "▸ Menyalin gim (index.html di akar)…"
cp -r dist/. "$KELUARAN/$NAMA/"

echo "▸ Menyertakan BACA-SAYA.txt (tautan versi daring)…"
cp docs/BACA-SAYA.txt "$KELUARAN/$NAMA/"

echo "▸ Menyertakan PDF panduan penggunaan…"
cp docs/panduan-penggunaan/ADIL-Panduan-Penggunaan.pdf "$KELUARAN/$NAMA/"

# PDF, bukan Markdown: di laptop juri .md terbuka sebagai teks mentah penuh simbol.
echo "▸ Menyertakan pemetaan CP/TP dan atribusi aset…"
cp docs/ADIL-Pemetaan-CP-TP.pdf docs/ADIL-Atribusi-Aset.pdf "$KELUARAN/$NAMA/"

# Video demonstrasi wajib; dibuat dengan tools/rekam-demo.cjs.
if [ -f "$AKAR/video-demonstrasi.mp4" ]; then
  echo "▸ Menyertakan video demonstrasi…"
  cp "$AKAR/video-demonstrasi.mp4" "$KELUARAN/$NAMA/"
else
  echo "  ⚠ video-demonstrasi.mp4 belum ada di akar proyek — WAJIB ditambahkan sebelum dikirim."
fi

# index.html WAJIB berada di root ZIP, bukan di dalam subfolder — karena itu
# pengarsipan dilakukan dari dalam folder isinya.
cd "$KELUARAN/$NAMA"
zip -qr "../$NAMA.zip" .
cd "$KELUARAN"
UKURAN=$(du -m "$NAMA.zip" | cut -f1)

echo
echo "✓ Paket siap: $KELUARAN/$NAMA.zip (${UKURAN} MB, batas 150 MB)"
echo "  Isi akar ZIP:"
unzip -l "$NAMA.zip" | awk 'NR>3 && $4 ~ /^[^\/]+$/ {print "    " $4}' | head -12
