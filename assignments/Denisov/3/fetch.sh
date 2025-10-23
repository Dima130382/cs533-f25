#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
URLS="$ROOT/urls.txt"
OUT="$ROOT/responses"
LOG="$ROOT/fetch.log"

mkdir -p "$OUT"
: > "$LOG"

# -I = HEAD, -L = follow redirects, -s = silent (no progress), -k = ignore TLS errors
# Add UA + timeout (some sites behave differently without UA)
CURL_OPTS=(-I -L -s -k --max-time 25 -H "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/124 Safari/537.36")

pretty_name() {
  local u="$1"
  u="${u#http://}"; u="${u#https://}"   # strip scheme
  echo "$u" | tr '/:' '__' | tr -cd '[:alnum:]_.-'
}

fetch_one() {
  local url="$1"
  [[ "$url" =~ ^https?:// ]] || url="https://$url"
  local base="$(pretty_name "$url")"
  local out="$OUT/${base}.txt"

  echo "[*] $url" | tee -a "$LOG"
  # Save ALL headers for the whole redirect chain
  if ! curl "${CURL_OPTS[@]}" "$url" > "$out"; then
    echo "[!] curl failed for $url" | tee -a "$LOG"
  fi
}

export -f fetch_one pretty_name
export OUT LOG

# Parallelize a bit
grep -v '^\s*$' "$URLS" | xargs -I{} -P4 bash -c 'fetch_one "$@"' _ {}
echo "[✓] Done. Headers saved in $OUT"
