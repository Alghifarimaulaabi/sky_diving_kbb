#!/bin/bash
# Parallel image search for BAC website - runs all queries in background
OUT=/home/z/my-project/scripts/imgsearch
mkdir -p "$OUT"
cd "$OUT"

declare -A QUERIES=(
  [hero]="scuba diver swimming in deep blue ocean with sun rays penetrating the water surface, cinematic underwater photography"
  [course-pool]="scuba diving instructor teaching a beginner student in a swimming pool training session"
  [reef]="scuba diver exploring a vibrant coral reef with colorful tropical fish"
  [buddy]="scuba divers performing buddy check inspecting scuba diving equipment before a dive"
  [community]="group of happy scuba divers on a dive boat in the ocean after a dive"
  [gearlay]="scuba diving gear equipment flat lay mask fins wetsuit regulator on wooden deck"
  [deepwall]="technical scuba diver descending along a deep underwater coral wall"
  [nightdive]="scuba diver holding a dive torch during an exciting night dive"
  [cleanup]="volunteer scuba divers collecting debris during an underwater ocean cleanup"
  [turtle]="scuba diver swimming gracefully with a sea turtle in clear blue water"
  [shipwreck]="scuba diver exploring a sunken shipwreck underwater"
  [surfaceswim]="scuba diver swimming at the ocean surface with snorkel and fins"
)

for key in "${!QUERIES[@]}"; do
  if [ ! -s "$OUT/$key.json" ]; then
    nohup z-ai image-search -q "${QUERIES[$key]}" --count 6 --gl us --no-rank -o "$OUT/$key.json" > "$OUT/$key.log" 2>&1 &
  fi
done

echo "jobs launched: $(jobs -p | wc -l)"
