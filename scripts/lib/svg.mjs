import { C, FONT_MONO } from './palette.mjs';

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function svgDoc({ w, h, title, desc, css = '', body }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-labelledby="t d">
<title id="t">${esc(title)}</title>
<desc id="d">${esc(desc)}</desc>
<style>
${css}
@media (prefers-reduced-motion: reduce){*{animation:none!important}}
</style>
${body}
</svg>
`;
}

/** Caja bento: sombra plana 6px + cuerpo con borde de tinta 3px. Deja un <g clip-path> abierto. */
export function frame({ w, h, fill, shadow = C.ink, id }) {
  const off = 6, x = 10, y = 10, bw = w - 26, bh = h - 26, r = 30;
  return {
    open: `<defs><clipPath id="${id}-clip"><rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="${r}"/></clipPath></defs>
<rect x="${x + off}" y="${y + off}" width="${bw}" height="${bh}" rx="${r}" fill="${shadow}"/>
<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="${r}" fill="${fill}"/>
<g clip-path="url(#${id}-clip)">`,
    close: `</g>
<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="${r}" fill="none" stroke="${C.ink}" stroke-width="3"/>`,
    inner: { x, y, w: bw, h: bh },
  };
}

/** Pegatina con borde de tinta y sombra plana; `children` se pinta dentro (coordenadas locales). */
export function sticker({ x, y, w, h, fill, rot = 0, children = '', cls = '' }) {
  return `<g transform="translate(${x} ${y}) rotate(${rot})"><g${cls ? ` class="${cls}"` : ''}>
<rect x="4" y="4" width="${w}" height="${h}" rx="${h / 2.4}" fill="${C.ink}"/>
<rect width="${w}" height="${h}" rx="${h / 2.4}" fill="${fill}" stroke="${C.ink}" stroke-width="3"/>
${children}</g></g>`;
}

export function dots(id, color = C.ink, opacity = 0.1) {
  return {
    defs: `<defs><pattern id="${id}" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="2" fill="${color}" fill-opacity="${opacity}"/></pattern></defs>`,
    rect: (w, h) => `<rect width="${w}" height="${h}" fill="url(#${id})"/>`,
  };
}

/**
 * Líneas de texto que se "teclean" una tras otra. Una tapa del color del fondo se desliza
 * y descubre el texto con `steps()`; la tapa lleva un cursor. Estado base = descubierto
 * (así reduced-motion enseña todo). Cada línea va recortada a su caja para que la tapa no
 * pise el borde de la viñeta.
 */
export function typedLines({ id, x, y, lineH, bg, size, fill, lines, cycle = 14, per = 1.4, gap = 0.5, cursor = C.pink }) {
  let css = '';
  let svg = '';
  lines.forEach((t, i) => {
    const n = Math.max(t.length, 1);
    const cw = Math.ceil(n * size * 0.62) + 12;
    const base = y + i * lineH;
    const s = ((i * (per + gap)) / cycle) * 100;
    const e = s + (per / cycle) * 100;
    css += `.${id}${i}{transform-box:fill-box;transform:translateX(112%);animation:${id}${i} ${cycle}s steps(${n},end) infinite}
@keyframes ${id}${i}{0%,${s.toFixed(2)}%{transform:translateX(0)}${e.toFixed(2)}%,100%{transform:translateX(112%)}}
`;
    svg += `<defs><clipPath id="${id}-c${i}"><rect x="${x - 4}" y="${base - size}" width="${cw + 8}" height="${size + 12}"/></clipPath></defs>
<g clip-path="url(#${id}-c${i})">
<text x="${x}" y="${base}" font-family="${FONT_MONO}" font-size="${size}" font-weight="700" fill="${fill}">${esc(t)}</text>
<g class="${id}${i}"><rect x="${x - 2}" y="${base - size}" width="${cw}" height="${size + 12}" fill="${bg}"/><rect x="${x - 2}" y="${base - size + 2}" width="5" height="${size + 4}" rx="2" fill="${cursor}"/></g>
</g>
`;
  });
  return { svg, css };
}
