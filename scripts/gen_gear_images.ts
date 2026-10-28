/**
 * Generate consistent studio product shots for BAC gear catalog.
 * Saves to /home/z/my-project/public/images/gear/
 * Run: bun /home/z/my-project/scripts/gen_gear_images.ts
 */
import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";
import path from "path";

const OUT_DIR = "/home/z/my-project/public/images/gear";

const STYLE =
  "professional e-commerce product photography, centered on a seamless light cool-gray studio background, soft diffused lighting, gentle soft shadow beneath the product, crisp details, premium catalog shot, no text, no watermark, no people";

const ITEMS: { file: string; prompt: string; size: string }[] = [
  { file: "mask.png", size: "1024x1024", prompt: "scuba diving mask with tempered glass lens and deep blue silicone skirt," },
  { file: "snorkel.png", size: "1024x1024", prompt: "scuba diving snorkel with dry-top splash guard, deep blue and black silicone mouthpiece," },
  { file: "fins.png", size: "1024x1024", prompt: "pair of open-heel scuba diving fins with adjustable straps, black with turquoise accents," },
  { file: "wetsuit.png", size: "1024x1024", prompt: "full-length black neoprene wetsuit for scuba diving with back zipper, neatly presented upright," },
  { file: "bcd.png", size: "1024x1024", prompt: "scuba buoyancy control device BCD vest in black nylon with corrugated hose and inflator," },
  { file: "regulator.png", size: "1024x1024", prompt: "scuba regulator first and second stage with submersible pressure gauge console, black and chrome," },
  { file: "dive-computer.png", size: "1024x1024", prompt: "wrist-mounted dive computer with round digital display showing depth, black rubber strap," },
  { file: "tank.png", size: "1024x1024", prompt: "aluminum scuba diving tank cylinder painted aqua blue with chrome valve," },
  { file: "torch.png", size: "1024x1024", prompt: "black aluminum scuba dive torch flashlight with bright LED beam glow," },
  { file: "weight-belt.png", size: "1024x1024", prompt: "diving weight belt with black nylon webbing and molded lead weight blocks," },
  { file: "dry-bag.png", size: "1024x1024", prompt: "waterproof roll-top dry bag in turquoise blue heavy-duty PVC with shoulder strap," },
  { file: "pkg-essential.png", size: "1152x864", prompt: "tidy flat lay of essential scuba diving gear set: mask, snorkel, open-heel fins, mesh bag, on light cool-gray background, soft daylight," },
  { file: "pkg-explorer.png", size: "1152x864", prompt: "tidy flat lay of a full scuba gear package: wetsuit, BCD vest, regulator console, dive computer, fins," },
  { file: "pkg-pro.png", size: "1152x864", prompt: "premium professional scuba gear kit flat lay: regulator set with gauges, dive computer, dive torch, surface marker buoy, slate," },
];

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const zai = await ZAI.create();

  for (const item of ITEMS) {
    const outPath = path.join(OUT_DIR, item.file);
    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 20_000) {
      console.log(`SKIP ${item.file} (exists)`);
      continue;
    }
    let ok = false;
    for (let attempt = 1; attempt <= 4 && !ok; attempt++) {
      try {
        const res = await zai.images.generations.create({
          prompt: `${item.prompt} ${STYLE}`,
          size: item.size,
        });
        const b64 = res.data?.[0]?.base64;
        if (!b64) throw new Error("empty base64");
        fs.writeFileSync(outPath, Buffer.from(b64, "base64"));
        console.log(`OK ${item.file}`);
        ok = true;
      } catch (err) {
        console.error(`FAIL ${item.file} attempt ${attempt}: ${(err as Error).message}`);
        await new Promise((r) => setTimeout(r, 4000 * attempt));
      }
    }
  }
  console.log("GEAR_IMAGES_DONE");
}

main().catch((e) => {
  console.error("FATAL", e);
  process.exit(1);
});
