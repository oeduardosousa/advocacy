// Offline image pipeline (static export has no image server).
// Source: assets/images-src/*.svg  ->  public/img/opt/<name>-<width>.{avif,webp}
// One warm grade for every image (DESIGN.md "Imagery"). Run: npm run images
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = "assets/images-src";
const OUT = "public/img/opt";
export const WIDTHS = [480, 800, 1200, 1600];

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

// Subtle grain, generated once and reused (seeded noise, identical on every run).
async function grain(w, h) {
  const raw = Buffer.alloc(w * h);
  let s = 1234567;
  for (let i = 0; i < raw.length; i++) {
    s = (s * 1664525 + 1013904223) >>> 0;
    raw[i] = 118 + ((s >>> 24) % 20);
  }
  return sharp(raw, { raw: { width: w, height: h, channels: 1 } }).toColourspace("b-w").png().toBuffer();
}

let total = 0;
for (const file of fs.readdirSync(SRC).filter((f) => f.endsWith(".svg"))) {
  const name = path.basename(file, ".svg");
  const svg = fs.readFileSync(path.join(SRC, file));
  const meta = await sharp(svg).metadata();
  const ratio = meta.height / meta.width;
  for (const w of WIDTHS) {
    const h = Math.round(w * ratio);
    const base = await sharp(svg, { density: Math.ceil((72 * w) / meta.width) * 1.0 })
      .resize(w, h)
      .modulate({ saturation: 0.9 })
      // lift blacks toward #1B1713, pull whites toward #F4EFE6
      .linear([0.9, 0.9, 0.88], [24, 21, 18])
      .toBuffer();
    const g = await grain(w, h);
    const graded = sharp(base).composite([{ input: g, blend: "soft-light", opacity: 0.35 }]);
    for (const [fmt, opts] of [
      ["avif", { quality: 52, effort: 6 }],
      ["webp", { quality: 76, effort: 6 }],
    ]) {
      const dest = path.join(OUT, `${name}-${w}.${fmt}`);
      await graded.clone()[fmt](opts).toFile(dest);
      total += fs.statSync(dest).size;
    }
  }
  console.log("ok", name);
}
console.log(`total ${(total / 1024).toFixed(0)} KB`);
