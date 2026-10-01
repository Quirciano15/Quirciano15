import { C } from '../lib/palette.mjs';
import { svgDoc, frame, dots, typedLines } from '../lib/svg.mjs';
import { ptext } from '../lib/text.mjs';
import { robot, sparkle, MASCOT_CSS } from '../lib/mascots.mjs';

export const file = 'about.svg';
const W = 900, H = 360;

export function build() {
  const f = frame({ w: W, h: H, fill: C.paper, id: 'ab' });
  const d = dots('ad', C.ink, 0.07);
  const typed = typedLines({
    id: 'tp', x: 330, y: 112, lineH: 42, bg: '#fff', size: 26, fill: C.ink, cycle: 16, per: 1.8, gap: 0.6,
    lines: ['> Hola, soy Alberto.', '> Hago webs que se mueven', '> y automatizaciones con IA', '> para negocios de verdad.'],
  });
  const bubble = `<g>
<rect x="305" y="53" width="545" height="255" rx="34" fill="${C.ink}"/>
<rect x="300" y="48" width="545" height="255" rx="34" fill="#fff" stroke="${C.ink}" stroke-width="3"/>
<path d="M303 140 L250 176 L303 192 Z" fill="#fff" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/>
<rect x="298" y="144" width="8" height="46" fill="#fff"/>
</g>`;
  const css = `${MASCOT_CSS}${typed.css}`;
  const body = `${f.open}
${d.defs}${d.rect(W, H)}
${robot({ x: 140, y: 204, s: 1.2 })}
${sparkle({ x: 52, y: 70, r: 15, fill: C.green })}${sparkle({ x: 230, y: 300, r: 12, fill: C.yellow, delay: 1 })}
${bubble}
${typed.svg}
${ptext('MADRID · NEXT.JS · THREE.JS · CLAUDE', { x: 330, y: 282, size: 26, fill: C.pinkDeep })}
${f.close}`;
  return svgDoc({
    w: W, h: H, css, body,
    title: 'Quién soy: Alberto, webs que se mueven y automatizaciones con IA',
    desc: 'Un robot de metal con antena saluda dentro de una viñeta de cómic donde se teclea: Hola, soy Alberto. Hago webs que se mueven y automatizaciones con IA para negocios de verdad. Madrid, Next.js, Three.js, Claude.',
  });
}
