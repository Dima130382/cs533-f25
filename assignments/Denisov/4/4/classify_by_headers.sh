#!/usr/bin/env bash
set -euo pipefail
CSV="evidence/header_report.csv"
OUT_DIR="evidence"
OUT_TXT="$OUT_DIR/framable_by_headers.txt"

mkdir -p "$OUT_DIR"
: > "$OUT_TXT"

# Counters
nf=0   # not framable by headers
pf=0   # possibly framable by headers
total=0

# Skip header line
tail -n +2 "$CSV" | while IFS=, read -r url xfo fa; do
  # Strip surrounding quotes
  url=${url#\"}; url=${url%\"}
  xfo=${xfo#\"}; xfo=${xfo%\"}
  fa=${fa#\"};  fa=${fa%\"}
  ((total++))

  # Heuristics:
  # - XFO DENY or SAMEORIGIN => NOT FRAMABLE (cross-origin)
  # - frame-ancestors 'none' => NOT FRAMABLE
  # - frame-ancestors 'self' (and nothing else) => NOT FRAMABLE (cross-origin)
  lower_xfo=$(printf "%s" "$xfo" | tr '[:upper:]' '[:lower:]')
  lower_fa=$(printf "%s" "$fa" | tr '[:upper:]' '[:lower:]')

  notframable=0
  if [[ "$lower_xfo" =~ deny ]] || [[ "$lower_xfo" =~ sameorigin ]]; then
    notframable=1
  fi
  if [[ "$lower_fa" =~ frame-ancestors ]]; then
    if [[ "$lower_fa" =~ "none" ]]; then
      notframable=1
    else
      # if only 'self' appears and no other origins, treat as not framable (cross-origin)
      t=$(printf "%s" "$lower_fa" | sed 's/frame-ancestors//')
      # remove quotes/semicolons and compress spaces
      t=$(printf "%s" "$t" | tr -d "'" | tr -s ' ')
      case "$t" in
        *self* )
          # if it mentions self but no http(s) origins, assume only self
          if ! printf "%s" "$t" | grep -qE 'https?://|[a-z0-9.-]+\.[a-z]{2,}'; then
            notframable=1
          fi
          ;;
      esac
    fi
  fi

  if [ $notframable -eq 1 ]; then
    echo "[NOT FRAMABLE by headers] $url | XFO=\"$xfo\" | $fa" >> "$OUT_TXT"
    nf=$((nf+1))
  else
    echo "[POSSIBLY FRAMABLE by headers] $url | XFO=\"$xfo\" | $fa" >> "$OUT_TXT"
    pf=$((pf+1))
  fi
done

printf "total=%d\nnot_framable=%d\npossibly_framable=%d\n" "$total" "$nf" "$pf" > "$OUT_DIR/framable_by_headers.counts"
echo "Wrote $OUT_TXT and $OUT_DIR/framable_by_headers.counts"
