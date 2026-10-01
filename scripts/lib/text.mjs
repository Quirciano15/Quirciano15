import * as fontkit from 'fontkit';
import { fileURLToPath } from 'node:url';

const FONT_FILE = fileURLToPath(new URL('../.cache/bricolage.ttf', import.meta.url));
let _font;
function font() {
  if (!_font) _font = fontkit.openSync(FONT_FILE).getVariation({ wght: 800, wdth: 100, opsz: 96 });
  return _font;
}
const num = (d) => d.replace(/-?\d+\.\d+/g, (n) => String(Math.round(parseFloat(n) * 10) / 10));
const cache = new Map();

/** Path con la línea base en y=0, ya escalado a `size` px y con el eje Y hacia abajo. */
export function measure(str, size) {
  const key = `${str}|${size}`;
  if (cache.has(key)) return cache.get(key);
  const f = font();
  const run = f.layout(str);
  const k = size / f.unitsPerEm;
  let pen = 0;
  let d = '';
  run.glyphs.forEach((g, i) => {
    const p = run.positions[i];
    d += g.path.translate(pen + p.xOffset, p.yOffset).scale(k, -k).toSVG();
    pen += p.xAdvance;
  });
  const out = { d: num(d), w: pen * k };
  cache.set(key, out);
  return out;
}

export function hasGlyphs(str) {
  const f = font();
  return [...str].every((ch) => ch === ' ' || f.hasGlyphForCodePoint(ch.codePointAt(0)));
}

/** <path> de texto. `shadow` dibuja antes una copia desplazada (sombra plana de pegatina). */
export function ptext(str, { x = 0, y = 0, size, fill, stroke, sw = 0, anchor = 'start', shadow, cls = '' }) {
  const { d, w } = measure(str, size);
  const ox = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x;
  const st = stroke ? ` stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round" paint-order="stroke fill"` : '';
  const c = cls ? ` class="${cls}"` : '';
  const sh = shadow
    ? `<path transform="translate(${ox + shadow.dx} ${y + shadow.dy})" d="${d}" fill="${shadow.fill}"${stroke ? ` stroke="${shadow.fill}" stroke-width="${sw}" stroke-linejoin="round"` : ''}/>`
    : '';
  return `${sh}<path${c} transform="translate(${ox} ${y})" d="${d}" fill="${fill}"${st}/>`;
}
