#!/usr/bin/env bash
set -euo pipefail

RESPDIR="evidence/http_responses"
mkdir -p "$RESPDIR"

UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"

while IFS= read -r url || [ -n "$url" ]; do
  [ -z "${url// /}" ] && continue
  name=$(printf "%s" "$url" | sed -E 's@https?://@@; s@/@@g; s@[:?&=]@-@g; s@[^A-Za-z0-9._-]@-@g' | cut -c1-120)
  out="${RESPDIR}/${name}.response.txt"
  echo "Fetching: $url"
  # -L follow redirects, --max-time cap request time, -D - dumps headers, -sS quiet but show errors
  # Include UA; some sites block default curl UA
  curl -sSL --max-time 25 -A "$UA" -D - "$url" > "$out" 2>&1 || echo "curl failed for $url" >> "$out"
done < sites.txt

echo "Done. Saved responses into $RESPDIR"
