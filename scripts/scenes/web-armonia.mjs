import { C } from '../lib/palette.mjs';
import { webCard } from '../lib/webcard.mjs';
import { sparkle } from '../lib/mascots.mjs';

export const file = 'web-armonia.svg';

const STAFF_Y = [112, 134, 156, 178, 200];
const PERIOD = 160;

function note(x, y, up = true) {
  const stem = up ? `M${x + 11} ${y} V${y - 52}` : `M${x - 11} ${y} V${y + 52}`;
  return `<ellipse cx="${x}" cy="${y}" rx="13" ry="10" transform="rotate(-20 ${x} ${y})" fill="${C.ink}"/><path d="${stem}" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>`;
}

export function build() {
  const unit = [note(40, 178), note(100, 145), note(150, 123, false)].join('');
  const marching = Array.from({ length: 4 }, (_, i) => `<g transform="translate(${i * PERIOD} 0)">${unit}</g>`).join('');
  const chordY = [112, 145, 178, 211];
  const chord = chordY
    .map((y, i) => `<g class="ch" style="animation-delay:${i * 0.35}s"><ellipse cx="822" cy="${y}" rx="14" ry="10.5" fill="${C.pink}" stroke="${C.ink}" stroke-width="3"/></g>`)
    .join('');
  const art = `
<defs><clipPath id="wa-staff"><rect x="566" y="46" width="294" height="230" rx="22"/></clipPath></defs>
<rect x="572" y="52" width="294" height="230" rx="22" fill="${C.ink}"/>
<rect x="566" y="46" width="294" height="230" rx="22" fill="${C.cream}" stroke="${C.ink}" stroke-width="3"/>
<g clip-path="url(#wa-staff)">
${STAFF_Y.map((y) => `<path d="M566 ${y} H860" stroke="${C.ink}" stroke-width="2.5"/>`).join('')}
<g transform="translate(580 0)"><g class="march">${marching}</g></g>
<rect x="770" y="46" width="90" height="230" fill="${C.cream}"/>
<path d="M770 100 V222" stroke="${C.ink}" stroke-width="3"/>
${STAFF_Y.map((y) => `<path d="M770 ${y} H860" stroke="${C.ink}" stroke-width="2.5"/>`).join('')}
${chord}
</g>
<g transform="translate(800 248)"><g class="stamp"><circle r="22" fill="${C.green}" stroke="${C.ink}" stroke-width="4"/><path d="M-10 0 L-3 8 L11 -9" fill="none" stroke="${C.ink}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></g></g>
${sparkle({ x: 580, y: 36, r: 12, fill: C.yellow })}`;
  return webCard({
    id: 'wm',
    a11y: {
      title: 'Filarmonic: corrector de armonía y blog de música — correctorarmonia.com',
      desc: 'Tarjeta azul con un pentagrama por el que desfilan notas, un acorde que se ilumina nota a nota y un sello verde de corregido. Texto: Corrige tu armonía SATB y te dice dónde la has liado. Botón verde: correctorarmonia.com.',
    },
    bg: C.blue, dotColor: '#fff', titleLines: ['FILARMONIC'], titleSize: 78, titleFill: '#fff',
    subs: ['Corrige tu armonía SATB', 'y te dice dónde la has liado.'], subFill: '#fff',
    cta: 'correctorarmonia.com', art,
    css: `.march{animation:march 3.6s linear infinite}
@keyframes march{from{transform:translateX(0)}to{transform:translateX(-${PERIOD}px)}}
.ch{transform-box:fill-box;transform-origin:center;animation:ch 1.8s ease-in-out infinite}
@keyframes ch{0%,100%{transform:scale(1);opacity:.75}50%{transform:scale(1.25);opacity:1}}
.stamp{transform-box:fill-box;transform-origin:center;animation:stamp 4s ease-in-out infinite}
@keyframes stamp{0%,40%{transform:scale(0)}50%{transform:scale(1.25)}58%,92%{transform:scale(1)}100%{transform:scale(0)}}`,
  });
}
