#!/usr/bin/env bash
# Regenerate PWA icons from public/icon.svg (rounded teal gradient background)
# plus the Korean brand glyph "마" annotated with a real CJK font, because
# ImageMagick's SVG engine does not render <text> reliably.
set -euo pipefail
cd "$(dirname "$0")/../public"

KO_FONT="/usr/share/fonts/truetype/nanum/NanumSquareRoundB.ttf"
GLYPH="마"

render() { # size out
  local size="$1" out="$2"
  convert -background none icon.svg -resize "${size}x${size}" \
    -font "$KO_FONT" -fill white -gravity center \
    -pointsize "$(( size * 52 / 100 ))" -annotate +0+0 "$GLYPH" \
    "$out"
}

render 512 icon-512.png
render 192 icon-192.png
render 180 apple-touch-icon.png
render 64  favicon.png
# Maskable: same glyph but smaller so it stays inside the safe zone.
convert -background none icon.svg -resize 512x512 \
  -font "$KO_FONT" -fill white -gravity center \
  -pointsize 210 -annotate +0+0 "$GLYPH" icon-512-maskable.png

echo "Icons regenerated in $(pwd)"
