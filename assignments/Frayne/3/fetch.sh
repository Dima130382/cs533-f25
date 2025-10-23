set -euo pipefail

mkdir -p responses
SITES_FILE="sites.txt"
if [ ! -f "$SITES_FILE" ]; then
  echo "ERROR: $SITES_FILE not found. Put your 100 hosts (one per line) in sites.txt"
  exit 1
fi

SLEEP_BETWEEN=0.2   

while IFS= read -r host || [ -n "$host" ]; do
  host_trimmed="$(echo "$host" | tr -d '\r' | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')"
  if [ -z "$host_trimmed" ] || [[ "$host_trimmed" == \#* ]]; then
    continue
  fi

  out="responses/${host_trimmed}.txt"
  echo "Fetching HEAD for: $host_trimmed -> $out"
  curl -ILsk --max-time 30 "http://${host_trimmed}" > "$out" 2>&1 || true
  sleep "$SLEEP_BETWEEN"
done < "$SITES_FILE"

echo "Done. Responses are in the responses/ directory."