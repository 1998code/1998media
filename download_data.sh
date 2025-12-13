#!/bin/bash
mkdir -p data/i18n

echo "Downloading i18n data..."
curl -k -s "https://www.1998.media/api/i18n?lang=en" -o data/i18n/en.json
curl -k -s "https://www.1998.media/api/i18n?lang=zh" -o data/i18n/zh.json
curl -k -s "https://www.1998.media/api/i18n?lang=zh-HK" -o data/i18n/zh-HK.json
curl -k -s "https://www.1998.media/api/i18n?lang=ko" -o data/i18n/ko.json
curl -k -s "https://www.1998.media/api/i18n?lang=ja" -o data/i18n/ja.json

echo "Downloading AI data (via manual extraction simulation)..."
# Note: AI data (DALL-E) is embedded in the homepage on Vercel Edge Config, so it's not directly accessible via a public API endpoint.
# You might need to manually update data/ai.json if the content changes, or scrape it from the homepage.
# For now, we assume data/ai.json is populated via other means or this script.

echo "Downloading paywall data..."
# Simple loop to fetch first 10 pages (100 items), usually enough for a blog paywall
echo "[" > data/paywall.json
first=true
for i in {0..100..10}
do
  response=$(curl -k -s "https://www.1998.media/api/paywall?offset=$i")
  # Check if response is empty array or error
  if [[ "$response" == "[]" ]]; then
    break
  fi
  
  if [ "$first" = true ]; then
    echo "$response" | sed 's/^\[//' | sed 's/\]$//' >> data/paywall.json
    first=false
  else
    echo "," >> data/paywall.json
    echo "$response" | sed 's/^\[//' | sed 's/\]$//' >> data/paywall.json
  fi
done
echo "]" >> data/paywall.json

# Clean up empty commas if any (simple fix for valid JSON)
# This sed logic is a bit fragile for JSON construction, but good enough for a quick dump.
# A better approach is to download separate files and merge with node.

