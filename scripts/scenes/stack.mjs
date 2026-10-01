import { C } from '../lib/palette.mjs';
import { svgDoc, frame, sticker } from '../lib/svg.mjs';
import { ptext, measure } from '../lib/text.mjs';

export const file = 'stack.svg';
const W = 900, H = 260;
const FILLS = [C.pink, C.green, C.yellow, C.sky, '#fff', C.pinkPastel];
const ROW1 = ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4', 'Three.js', 'R3F', 'GSAP', 'Motion'];
const ROW2 = ['Medusa.js', 'PostgreSQL', 'FastAPI', 'Cloudflare R2', 'Claude', 'Claude Code', 'Vercel', 'pnpm'];

function row(names, y, offset) {
  let x = 0;
  let svg = '';
  names.forEach((n, i) => {
    const fill = FILLS[(i + offset) % FILLS.length];
    const w = Math.ceil(measure(n, 26).w) + 36;
    svg += sticker({
      x, y, w, h: 50, fill, rot: i % 2 ? 1.2 : -1.2,
      children: ptext(n, { x: 18, y: 35, size: 26, fill: fill === C.pink ? '#fff' : C.ink }),
    });
    x += w + 18;
  });
  return { svg, width: Math.round(x) };
}

export function build() {
  const f = frame({ w: W, h: H, fill: C.navy, id: 'st' });
  const r1 = row(ROW1, 96, 0);
  const r2 = row(ROW2, 170, 3);
  // Cada fila se define una vez y se usa dos veces (bucle sin hueco) sin repetir los trazados.
  const defs = `<defs><g id="ra">${r1.svg}</g><g id="rb">${r2.svg}</g></defs>`;
  const dup = (id, r) => `<use href="#${id}"/><use href="#${id}" x="${r.width}"/>`;
  const title = sticker({
    x: 40, y: 26, w: measure('MI STACK', 26).w + 36, h: 50, fill: C.pink, rot: -3,
    children: ptext('MI STACK', { x: 18, y: 35, size: 26, fill: '#fff' }),
  });
  const css = `.l{animation:l1 26s linear infinite}
.r{animation:l2 30s linear infinite}
@keyframes l1{from{transform:translateX(0)}to{transform:translateX(-${r1.width}px)}}
@keyframes l2{from{transform:translateX(-${r2.width}px)}to{transform:translateX(0)}}`;
  const body = `${f.open}
${defs}
<g class="l">${dup('ra', r1)}</g>
<g class="r">${dup('rb', r2)}</g>
${title}
${f.close}`;
  return svgDoc({
    w: W, h: H, css, body,
    title: 'Mi stack: Next.js, React, TypeScript, Three.js, GSAP, Medusa, Postgres, FastAPI, Claude y Vercel',
    desc: 'Dos filas de pegatinas de colores que se deslizan en sentidos opuestos con las tecnologías: Next.js 16, React 19, TypeScript, Tailwind v4, Three.js, R3F, GSAP, Motion, Medusa.js, PostgreSQL, FastAPI, Cloudflare R2, Claude, Claude Code, Vercel y pnpm.',
  });
}
