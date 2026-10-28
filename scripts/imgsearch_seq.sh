#!/bin/bash
# Sequential image search with retry + backoff (avoids 429 rate limits)
OUT=/home/z/my-project/scripts/imgsearch
mkdir -p "$OUT"
cd "$OUT"

run_search() {
  local key="$1"; local query="$2"; local tries=0
  while [ $tries -lt 5 ]; do
    if [ -s "$OUT/$key.json" ]; then
      echo "[$key] already done"
      return 0
    fi
    echo "[$key] try $((tries+1)): $query"
    z-ai image-search -q "$query" --count 6 --gl us --no-rank -o "$OUT/$key.json" > "$OUT/$key.log" 2>&1
    if [ -s "$OUT/$key.json" ]; then
      echo "[$key] OK"
      return 0
    fi
    tries=$((tries+1))
    echo "[$key] failed, sleeping $((10 + tries*10))s"
    sleep $((10 + tries*10))
  done
  echo "[$key] FAILED after $tries tries"
}

run_search hero "scuba diver swimming in deep blue ocean with sun rays penetrating the water surface, cinematic underwater photography"
sleep 8
run_search course-pool "scuba diving instructor teaching a beginner student in a swimming pool training session"
sleep 8
run_search reef "scuba diver exploring a vibrant coral reef with colorful tropical fish"
sleep 8
run_search buddy "scuba divers performing buddy check inspecting scuba diving equipment before a dive"
sleep 8
run_search community "group of happy scuba divers on a dive boat in the ocean after a dive"
sleep 8
run_search gearlay "scuba diving gear equipment flat lay mask fins wetsuit regulator on wooden deck"
sleep 8
run_search deepwall "technical scuba diver descending along a deep underwater coral wall"
sleep 8
run_search nightdive "scuba diver holding a dive torch during an exciting night dive"
sleep 8
run_search cleanup "volunteer scuba divers collecting debris during an underwater ocean cleanup"
sleep 8
run_search turtle "scuba diver swimming gracefully with a sea turtle in clear blue water"
sleep 8
run_search shipwreck "scuba diver exploring a sunken shipwreck underwater"
sleep 8
run_search surfaceswim "scuba diver swimming at the ocean surface with snorkel and fins"

echo "ALL_SEARCHES_DONE"
