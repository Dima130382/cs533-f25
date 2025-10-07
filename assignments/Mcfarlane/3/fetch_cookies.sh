#!/bin/bash
mkdir -p responses
while read -r site; do
  echo "Fetching $site ..."
  # replace https:// if needed
  curl -ILsk --max-time 15 "$site" > "responses/${site//\//_}.txt" 2>&1
  sleep 1  # small delay to avoid being blocked
done < AMCFA010@ODU.EDU
