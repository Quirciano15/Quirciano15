import { C, FONT_MONO } from '../lib/palette.mjs';
import { svgDoc, frame, sticker, dots, typedLines } from '../lib/svg.mjs';
import { ptext, measure } from '../lib/text.mjs';
import { prism, sparkle, MASCOT_CSS } from '../lib/mascots.mjs';

export const file = 'hero.svg';
const W = 900, H = 420;

export function build() {
  const f = frame({ w: W, h: H, fill: C.pinkPastel, id: 'hero' });
  const d = dots('hd');
  const spectrum = ['#ffc2d9', '#ff8fb8', C.pink, C.pinkDeep, C.green, C.sky];
  const rays = spectrum
    .map((c, i) => {
      const y0 = 198 + (i - 2.5) * 7, y1 = 215 + (i - 2.5) * 52;
      return `<polygon class="ray" style="animation-delay:${i * 0.18}s" points="748,${y0 - 4} 748,${y0 + 4} 920,${y1 + 15} 920,${y1 - 15}" fill="${c}"/>`;
    })
    .join('');
  const beam = `<polygon class="beam" points="540,212 662,196 662,226 540,218" fill="#fff"/>`;
  const typed = typedLines({
    id: 'ty', x: 46, y: 332, lineH: 36, bg: C.pinkPastel, size: 26, fill: C.ink,
    lines: ['Webs que se mueven + IA que curra por ti'], cycle: 9, per: 3.2,
  });
  const hola = sticker({
    x: 40, y: 38, w: measure('HOLA, SOY', 24).w + 36, h: 46, fill: C.green, rot: -4, cls: 'wig',
    children: ptext('HOLA, SOY', { x: 18, y: 32, size: 24, fill: C.ink }),
  });
  const css = `${MASCOT_CSS}
.ray{transform-box:fill-box;transform-origin:left center;animation:ray 2.4s ease-in-out infinite}
@keyframes ray{0%,100%{transform:scaleY(.8);opacity:.85}50%{transform:scaleY(1.15);opacity:1}}
.beam{animation:beam 2.4s ease-in-out infinite}
@keyframes beam{0%,100%{opacity:.75}50%{opacity:1}}
.wig{transform-box:fill-box;transform-origin:center;animation:wig 2.6s ease-in-out infinite}
@keyframes wig{0%,100%{transform:rotate(0)}50%{transform:rotate(3deg)}}
${typed.css}`;
  const body = `${f.open}
${d.defs}${d.rect(W, H)}
${beam}${rays}
${prism({ x: 700, y: 218, s: 1.5 })}
${sparkle({ x: 820, y: 60, r: 16, fill: C.yellow })}${sparkle({ x: 505, y: 70, r: 12, fill: C.green, delay: 0.8 })}${sparkle({ x: 850, y: 350, r: 14, fill: '#fff', delay: 1.4 })}
${hola}
${ptext('ALBERTO', { x: 44, y: 160, size: 100, fill: '#fff', stroke: C.ink, sw: 12, shadow: { dx: 6, dy: 6, fill: C.ink } })}
${ptext('QUIRCE', { x: 44, y: 258, size: 100, fill: C.pink, stroke: C.ink, sw: 12, shadow: { dx: 6, dy: 6, fill: C.ink } })}
${typed.svg}
<text x="46" y="378" font-family="${FONT_MONO}" font-size="22" font-weight="700" fill="${C.ink}" fill-opacity=".7">Full-stack · Madrid · Next.js, motion e IA</text>
${f.close}`;
  return svgDoc({
    w: W, h: H, css, body,
    title: 'Alberto Quirce — webs animadas y automatizaciones con IA',
    desc: 'Banner cartoon rosa con el nombre Alberto Quirce y un prisma sonriente que refracta un rayo de luz en un espectro de colores.',
  });
}
