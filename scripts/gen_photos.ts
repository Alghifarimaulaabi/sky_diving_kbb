/**
 * Generate cinematic section photos for BAC website.
 * Saves to /home/z/my-project/public/images/photos/
 * Run: bun /home/z/my-project/scripts/gen_photos.ts
 */
import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";
import path from "path";

const OUT_DIR = "/home/z/my-project/public/images/photos";

const CINEMA =
  "photorealistic, cinematic color grading, deep navy and teal tones, National Geographic style underwater photography, atmospheric depth haze, floating particles in water, high quality, detailed, no text, no watermark";

const PHOTOS: { file: string; prompt: string; size: string }[] = [
  {
    file: "hero.png",
    size: "1440x704",
    prompt:
      "cinematic wide underwater photograph, scuba diver silhouette drifting in vast deep blue ocean, dramatic god rays of sunlight penetrating down through the water surface, strong atmospheric haze, sense of epic scale and solitude,",
  },
  {
    file: "pool.png",
    size: "1344x768",
    prompt:
      "underwater photograph of a scuba diving instructor guiding a beginner student in a clear blue swimming pool, both in full scuba gear, bubbles rising, calm turquoise water,",
  },
  {
    file: "reef1.png",
    size: "1344x768",
    prompt:
      "scuba diver with perfect buoyancy hovering above a vibrant coral reef teeming with colorful tropical fish, sun rays from the surface above,",
  },
  {
    file: "reef2.png",
    size: "1344x768",
    prompt:
      "vibrant coral reef seascape with schools of tropical fish, orange and purple corals, clear blue water with light rays,",
  },
  {
    file: "buddy.png",
    size: "1344x768",
    prompt:
      "two scuba divers in full gear performing a buddy check together on a dive boat, inspecting BCD and regulator, warm morning light on the ocean, candid documentary style,",
  },
  {
    file: "community1.png",
    size: "1344x768",
    prompt:
      "group of happy scuba divers in wetsuits laughing together on a dive boat after a dive, ocean and island in background, golden hour light, candid lifestyle photography,",
  },
  {
    file: "community2.png",
    size: "864x1152",
    prompt:
      "scuba divers sitting on the edge of a dive boat in full gear ready to backroll into the deep blue sea, seen from behind, adventure mood,",
  },
  {
    file: "deepwall.png",
    size: "1344x768",
    prompt:
      "scuba diver descending along a dramatic deep underwater coral wall, the blue abyss fading into darkness below, strong sense of depth and scale,",
  },
  {
    file: "nightdive.png",
    size: "1344x768",
    prompt:
      "scuba diver at night holding a bright dive torch, dramatic light beam cutting through dark blue water, bubbles glowing in the beam, mysterious mood,",
  },
  {
    file: "cleanup.png",
    size: "1344x768",
    prompt:
      "scuba divers collecting plastic debris and fishing nets from a coral reef during an underwater cleanup dive, mesh bags in hands, documentary photography,",
  },
  {
    file: "turtle.png",
    size: "1344x768",
    prompt:
      "scuba diver swimming calmly beside a green sea turtle in crystal clear blue water, sun rays streaming from the surface, peaceful moment,",
  },
  {
    file: "wreck.png",
    size: "1344x768",
    prompt:
      "scuba diver exploring a sunken shipwreck covered in soft corals, beams of light entering through the structure, atmospheric,",
  },
  {
    file: "surface.png",
    size: "1344x768",
    prompt:
      "scuba divers at the ocean surface next to an orange surface marker buoy, calm sea with gentle waves, golden hour, planning a dive,",
  },
];

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const zai = await ZAI.create();

  for (const p of PHOTOS) {
    const outPath = path.join(OUT_DIR, p.file);
    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 30_000) {
      console.log(`SKIP ${p.file}`);
      continue;
    }
    let ok = false;
    for (let attempt = 1; attempt <= 4 && !ok; attempt++) {
      try {
        const res = await zai.images.generations.create({
          prompt: `${p.prompt} ${CINEMA}`,
          size: p.size,
        });
        const b64 = res.data?.[0]?.base64;
        if (!b64) throw new Error("empty base64");
        fs.writeFileSync(outPath, Buffer.from(b64, "base64"));
        console.log(`OK ${p.file}`);
        ok = true;
      } catch (err) {
        console.error(`FAIL ${p.file} attempt ${attempt}: ${(err as Error).message}`);
        await new Promise((r) => setTimeout(r, 4000 * attempt));
      }
    }
  }
  console.log("PHOTOS_DONE");
}

main().catch((e) => {
  console.error("FATAL", e);
  process.exit(1);
});
