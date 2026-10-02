import { C } from '../lib/palette.mjs';
import { svgDoc } from '../lib/svg.mjs';
import { ptext, measure } from '../lib/text.mjs';

export const file = 'tape.svg';
const W = 900, H = 70;
const WORDS = ['WEBS CON ARTE', 'BOTS CURRANDO', 'CERO PLANTILLAS', 'MADRID CITY'];

export function build() {
  let x = 0;
  let unit = '';
  for (const w of WORDS) {
    unit += ptext(w, { x, y: 41, size: 30, fill: C.ink });
    x += measure(w, 30).w + 22;
    unit += `<path transform="translate(${x} 29)" d="M0 -11 L11 0 L0 11 L-11 0 Z" fill="${C.pink}" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/>`;
    x += 34;
  }
  const U = Math.round(x);
  const copies = `<defs><g id="tu">${unit}</g></defs>` + Array.from({ length: 3 }, (_, i) => `<use href="#tu" x="${i * U}"/>`).join('');
  const stripes = `<defs><pattern id="st" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="14" height="28" fill="${C.ink}" fill-opacity=".08"/></pattern></defs>`;
  const css = `.run{animation:run 14s linear infinite}
@keyframes run{from{transform:translateX(0)}to{transform:translateX(-${U}px)}}`;
  const body = `${stripes}
<g transform="rotate(-0.8 450 35)">
<rect x="-30" y="9" width="960" height="52" fill="${C.yellow}" stroke="${C.ink}" stroke-width="3"/>
<rect x="-30" y="9" width="960" height="52" fill="url(#st)"/>
<g class="run">${copies}</g>
</g>`;
  return svgDoc({
    w: W, h: H, css, body,
    title: 'Cinta amarilla: webs con arte, bots currando, cero plantillas, Madrid city',
    desc: 'Cinta de precaución amarilla que desfila de derecha a izquierda con las frases webs con arte, bots currando, cero plantillas y Madrid city.',
  });
}
