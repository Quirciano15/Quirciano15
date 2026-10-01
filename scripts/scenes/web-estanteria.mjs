import { C } from '../lib/palette.mjs';
import { webCard } from '../lib/webcard.mjs';
import { sparkle } from '../lib/mascots.mjs';

export const file = 'web-estanteria.svg';

const SPINE = ['#2f8f4e', '#d4a84b', '#8a2b3d', '#3b6fb6', '#e8dcc0', '#2f8f4e', '#d4a84b'];

/** Una balda de libros sobre la línea `y`. `gapIdx` deja un hueco (para el libro que se tira). */
function shelfRow(y, seed, floatIdx = [], gapIdx = -1) {
  let x = 622;
  let svg = '';
  let gap = null;
  for (let i = 0; i < 6; i++) {
    const w = 26 + ((seed + i * 7) % 4) * 5;
    const h = 44 + ((seed * 3 + i * 11) % 5) * 6;
    if (i === gapIdx) {
      gap = { x, w, h };
    } else {
      const cls = floatIdx.includes(i) ? ` class="fl${i % 3}"` : '';
      svg += `<g${cls}><rect x="${x}" y="${y - h}" width="${w}" height="${h}" rx="4" fill="${SPINE[(i + seed) % SPINE.length]}" stroke="${C.ink}" stroke-width="3"/><rect x="${x + 5}" y="${y - h + 9}" width="${w - 10}" height="5" rx="2" fill="${C.ink}" fill-opacity=".35"/></g>`;
    }
    x += w + 6;
  }
  return { svg, gap };
}

export function build() {
  const board = (y) => `<rect x="606" y="${y}" width="254" height="14" rx="5" fill="#6b4a1e" stroke="${C.ink}" stroke-width="3"/>`;
  const r1 = shelfRow(96, 1, [1, 4]);
  const r2 = shelfRow(176, 3, [2, 5], 3);
  const r3 = shelfRow(256, 5, [0, 3]);
  const g = r2.gap;
  const art = `
<rect class="glow" x="${g.x}" y="${176 - g.h - 4}" width="${g.w}" height="${g.h + 4}" rx="6" fill="${C.green}"/>
${board(96)}${board(176)}${board(256)}
${r1.svg}${r2.svg}${r3.svg}
<g transform="translate(${g.x + g.w / 2} 176)"><g class="pull"><rect x="${-g.w / 2}" y="${-g.h}" width="${g.w}" height="${g.h}" rx="4" fill="${C.gold}" stroke="${C.ink}" stroke-width="3"/><rect x="${-g.w / 2 + 5}" y="${-g.h + 9}" width="${g.w - 10}" height="5" rx="2" fill="${C.ink}" fill-opacity=".4"/></g></g>
${sparkle({ x: 588, y: 262, r: 13, fill: C.gold })}${sparkle({ x: 590, y: 60, r: 11, fill: C.green, delay: 1.1 })}`;
  return webCard({
    id: 'we',
    a11y: {
      title: 'La Estantería Oculta: libros de fantasía y romance — laestanteriaoculta.es',
      desc: 'Tarjeta verde oscuro y dorado con una estantería de libros que flotan y uno que se inclina revelando una luz verde. Texto: Libros de fantasía y romance. Órdenes de lectura que se usan de verdad. Botón dorado: laestanteriaoculta.es.',
    },
    bg: C.forest, shadow: C.gold, dotColor: C.gold,
    titleLines: ['LA ESTANTERÍA', 'OCULTA'], titleSize: 60, titleFill: C.gold, titleShadow: C.ink,
    subs: ['Libros de fantasía y romance.', 'Órdenes de lectura que se usan de verdad.'],
    subFill: '#f6efdc', cta: 'laestanteriaoculta.es', ctaFill: C.gold,
    art,
    css: `.fl0{animation:fl 3.2s ease-in-out infinite}
.fl1{animation:fl 3.8s ease-in-out .6s infinite}
.fl2{animation:fl 4.4s ease-in-out 1.2s infinite}
@keyframes fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
.pull{transform-box:fill-box;transform-origin:100% 100%;animation:pull 5s ease-in-out infinite}
@keyframes pull{0%,55%,100%{transform:rotate(0)}65%,85%{transform:rotate(-17deg)}}
.glow{opacity:0;animation:glow 5s ease-in-out infinite}
@keyframes glow{0%,55%,100%{opacity:0}65%,85%{opacity:.95}}`,
  });
}
