import { C, FONT_MONO } from '../lib/palette.mjs';
import { svgDoc, frame, sticker, dots } from '../lib/svg.mjs';
import { ptext, measure } from '../lib/text.mjs';
import { prism, sparkle, MASCOT_CSS } from '../lib/mascots.mjs';

export const file = 'footer.svg';
const W = 900, H = 260;

export function build() {
  const f = frame({ w: W, h: H, fill: C.ink, shadow: C.pink, id: 'ft' });
  const d = dots('fd', '#fff', 0.07);
  const cta = sticker({
    x: 44, y: 168, w: measure('Escríbeme', 26).w + 36 + 44, h: 50, fill: C.green, rot: -2, cls: 'cta',
    children: `${ptext('Escríbeme', { x: 18, y: 36, size: 26, fill: C.ink })}<path transform="translate(${18 + measure('Escríbeme', 26).w + 14} 25)" d="M0 0 H20 M12 -9 L21 0 L12 9" fill="none" stroke="${C.ink}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  });
  const css = `${MASCOT_CSS}
.cta{transform-box:fill-box;transform-origin:center;animation:cta 2.6s ease-in-out infinite}
@keyframes cta{0%,100%{transform:rotate(0) scale(1)}50%{transform:rotate(2deg) scale(1.05)}}`;
  const body = `${f.open}
${d.defs}${d.rect(W, H)}
${ptext('HABLEMOS', { x: 44, y: 96, size: 78, fill: '#fff', stroke: C.ink, sw: 10, shadow: { dx: 5, dy: 5, fill: C.pink } })}
<text x="48" y="140" font-family="${FONT_MONO}" font-size="22" font-weight="700" fill="#fff">quirciano@gmail.com · Madrid, España</text>
${cta}
${prism({ x: 720, y: 130, s: 1.25 })}
${sparkle({ x: 610, y: 60, r: 14, fill: C.yellow })}${sparkle({ x: 840, y: 52, r: 16, fill: C.green, delay: 0.9 })}${sparkle({ x: 830, y: 205, r: 12, fill: '#fff', delay: 1.5 })}
${f.close}`;
  return svgDoc({
    w: W, h: H, css, body,
    title: 'Hablemos: contacto de Alberto Quirce por email',
    desc: 'Tarjeta oscura con sombra rosa y un prisma sonriente. Texto: Hablemos. quirciano@gmail.com, Madrid, España. Botón verde: Escríbeme.',
  });
}
