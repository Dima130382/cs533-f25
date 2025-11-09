#!/usr/bin/env bash
set -euo pipefail
IN="${1:-sites.txt}"
OUT="header_report.csv"
echo "url,x-frame-options,frame-ancestors" > "$OUT"

while IFS= read -r url; do
  [ -z "$url" ] && continue
  # Fetch headers (follow redirects, 12s timeout)
  H=$(curl -sSIL --max-time 12 "$url" || true)
  XFO=$(printf "%s" "$H" | grep -i '^x-frame-options:' | head -n1 | cut -d: -f2- | tr -d '\r' | xargs)
  CSP=$(printf "%s" "$H" | grep -i '^content-security-policy:' | head -n1 | cut -d: -f2- | tr -d '\r' | xargs)
  FA=""
  if [ -n "$CSP" ]; then
    # extract frame-ancestors directive if present
    FA=$(printf "%s" "$CSP" | sed -n 's/.*frame-ancestors\([^;]*\).*/frame-ancestors\1/p' | tr -d '\n' | xargs)
  fi
  # escape quotes
  XFO_ESC=$(printf "%s" "$XFO" | sed 's/"/""/g')
  FA_ESC=$(printf "%s" "$FA" | sed 's/"/""/g')
  echo "\"$url\",\"$XFO_ESC\",\"$FA_ESC\"" >> "$OUT"
done < "$IN"

echo "Wrote $OUT"
