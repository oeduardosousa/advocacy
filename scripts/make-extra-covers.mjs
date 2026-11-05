// One-off generator: extra demo cover illustrations (post-4..7) in the same palette as post-1..3.
import fs from "node:fs";
const out = "assets/images-src";
const stack = (x, y, w, h, n) =>
  Array.from({ length: n }, (_, i) => {
    const c = ["#C9BDA8", "#D8CDB9", "#E6DCC8", "#F0E8D8"][i % 4];
    return `<rect x="${x + i * 4}" y="${y - i * 14}" width="${w}" height="${h}" fill="${c}"/>`;
  }).join("");
const wrap = (body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800"><rect width="1200" height="800" fill="#2A231D"/>${body}</svg>`;
const desk = `<rect y="620" width="1200" height="180" fill="#1B1713"/><rect y="616" width="1200" height="4" fill="#3A3027"/>`;
const beam = (a, b, c, d) =>
  `<polygon points="${a},0 ${b},0 ${c},800 ${d},800" fill="#4B3F33"/><polygon points="${a + 80},0 ${b - 90},0 ${c - 200},800 ${d + 40},800" fill="#6A5B49"/>`;
const files = {
  "post-4": wrap(beam(120, 360, 640, 300) + `<rect x="620" y="140" width="420" height="480" fill="#3A3027"/><rect x="640" y="160" width="380" height="440" fill="#4B3F33"/>` + desk + stack(180, 600, 360, 120, 4)),
  "post-5": wrap(beam(700, 960, 1200, 880) + desk + stack(220, 600, 420, 130, 6) + `<rect x="260" y="470" width="220" height="3" fill="#B8AFA1"/><rect x="260" y="496" width="300" height="3" fill="#B8AFA1"/>`),
  "post-6": wrap(beam(400, 640, 900, 560) + desk + stack(140, 600, 300, 120, 3) + stack(560, 600, 300, 120, 5)),
  "post-7": wrap(beam(260, 480, 760, 440) + desk + stack(180, 600, 340, 120, 3) + stack(700, 600, 340, 120, 3) + `<rect x="548" y="560" width="104" height="6" fill="#6B6155"/>`),
};
for (const [k, v] of Object.entries(files)) fs.writeFileSync(`${out}/${k}.svg`, v);
