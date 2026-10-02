import { C } from './palette.mjs';

/* Regla: el grupo con clase animada NUNCA lleva atributo transform (el CSS lo pisaría). */
export const MASCOT_CSS = `
.bob{animation:bob 3s ease-in-out infinite}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
.blink{transform-box:fill-box;transform-origin:center;animation:blink 4.2s infinite}
@keyframes blink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}
.pulse{transform-box:fill-box;transform-origin:center;animation:pulse 1.6s ease-in-out infinite}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.35)}}
.wave{transform-box:fill-box;transform-origin:10% 90%;animation:wave 1.2s ease-in-out infinite}
@keyframes wave{0%,100%{transform:rotate(-12deg)}50%{transform:rotate(22deg)}}
.twinkle{transform-box:fill-box;transform-origin:center;animation:twinkle 2.4s ease-in-out infinite}
@keyframes twinkle{0%,100%{transform:scale(.4) rotate(0deg);opacity:.5}50%{transform:scale(1) rotate(45deg);opacity:1}}
`;

/** Prisma rosa con cara. (x,y) = centro del cuerpo; ~150×140 a escala 1. */
export function prism({ x, y, s = 1 }) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="bob">
<path d="M0 -78 L66 46 Q70 58 56 58 L-56 58 Q-70 58 -66 46 Z" fill="${C.pink}" stroke="${C.ink}" stroke-width="7" stroke-linejoin="round"/>
<path d="M-8 -50 L-40 14" stroke="#fff" stroke-opacity=".55" stroke-width="9" stroke-linecap="round"/>
<g class="blink">
<ellipse cx="-17" cy="8" rx="11" ry="14" fill="#fff" stroke="${C.ink}" stroke-width="4"/>
<ellipse cx="17" cy="8" rx="11" ry="14" fill="#fff" stroke="${C.ink}" stroke-width="4"/>
<circle cx="-14" cy="11" r="5" fill="${C.ink}"/><circle cx="20" cy="11" r="5" fill="${C.ink}"/>
</g>
<path d="M-14 36 Q0 48 14 36" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
</g></g>`;
}

/** Robot de metal con antena, visor y brazo que saluda. (x,y) = centro del torso. */
export function robot({ x, y, s = 1 }) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="bob">
<rect x="-4" y="-120" width="8" height="34" rx="4" fill="${C.ink}"/>
<circle class="pulse" cx="0" cy="-126" r="11" fill="${C.blue}" stroke="${C.ink}" stroke-width="5"/>
<rect x="-70" y="-90" width="140" height="130" rx="36" fill="${C.metal}" stroke="${C.ink}" stroke-width="7"/>
<rect x="-52" y="-68" width="104" height="58" rx="22" fill="${C.navy}" stroke="${C.ink}" stroke-width="5"/>
<g class="blink"><circle cx="-22" cy="-39" r="10" fill="${C.sky}"/><circle cx="22" cy="-39" r="10" fill="${C.sky}"/></g>
<rect x="-26" y="2" width="52" height="14" rx="7" fill="${C.metalDark}" stroke="${C.ink}" stroke-width="4"/>
<circle cx="-56" cy="-76" r="4" fill="${C.metalDark}"/><circle cx="56" cy="-76" r="4" fill="${C.metalDark}"/>
<rect x="-62" y="46" width="124" height="52" rx="22" fill="${C.metal}" stroke="${C.ink}" stroke-width="7"/>
<rect x="-20" y="60" width="40" height="22" rx="8" fill="${C.pink}" stroke="${C.ink}" stroke-width="4"/>
<g class="wave"><rect x="62" y="40" width="46" height="18" rx="9" fill="${C.metal}" stroke="${C.ink}" stroke-width="5" transform="rotate(-50 62 49)"/></g>
</g></g>`;
}

/** Estrella de 4 puntas que centellea. */
export function sparkle({ x, y, r, fill = '#fff', delay = 0 }) {
  return `<g transform="translate(${x} ${y})"><path class="twinkle" style="animation-delay:${delay}s" d="M0 ${-r} Q${r * 0.18} ${-r * 0.18} ${r} 0 Q${r * 0.18} ${r * 0.18} 0 ${r} Q${-r * 0.18} ${r * 0.18} ${-r} 0 Q${-r * 0.18} ${-r * 0.18} 0 ${-r} Z" fill="${fill}" stroke="${C.ink}" stroke-width="2.5" stroke-linejoin="round"/></g>`;
}
