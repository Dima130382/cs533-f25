#!/usr/bin/env bash
set -euo pipefail

OUTDIR="evidence"
RESPDIR="${OUTDIR}/http_responses"
CSV="${OUTDIR}/header_report.csv"

mkdir -p "$RESPDIR"
# Ensure CSV header
printf '%s\n' '"url","x_frame_options","frame_ancestors"' > "$CSV"

# Read sites.txt line by line
while IFS= read -r url || [ -n "$url" ]; do
  # skip empty lines
  [ -z "${url// /}" ] && continue

  # safe filename
  name=$(printf "%s" "$url" | sed -E 's@https?://@@; s@/@@g; s@[:?&=]@-@g; s@[^A-Za-z0-9._-]@-@g' | cut -c1-120)
  file="${RESPDIR}/${name}.response.txt"

  # If response file doesn't exist, note that
  if [ ! -f "$file" ]; then
    XFO="(no-response-file)"
    FA=""
  else
    XFO=$(grep -i '^X-Frame-Options:' "$file" 2>/dev/null | head -n1 | sed -E 's/^[^:]*:[[:space:]]*//I' | tr -d '\r' | sed 's/"/""/g' || printf "")
    CSP=$(grep -i '^Content-Security-Policy:' "$file" 2>/dev/null | head -n1 | sed -E 's/^[^:]*:[[:space:]]*//I' | tr -d '\r' | sed 's/"/""/g' || printf "")
    FA=""
    if [ -n "$CSP" ]; then
      FA=$(printf "%s" "$CSP" | sed -n "s/.*frame-ancestors\([^;]*\).*/frame-ancestors\1/p" | tr -d '\n' | sed 's/"/""/g' || printf "")
    fi
  fi

  printf "\"%s\",\"%s\",\"%s\"\n" "$url" "$XFO" "$FA" >> "$CSV"
done < sites.txt

echo "Wrote: $CSV"
