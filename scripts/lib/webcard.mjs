import { C, FONT_MONO } from './palette.mjs';
import { svgDoc, frame, sticker, dots } from './svg.mjs';
import { ptext, measure } from './text.mjs';
import { MASCOT_CSS } from './mascots.mjs';

const W = 900, H = 310;

export function webCard({
  id, a11y, bg, shadow = C.ink, dotColor = C.ink, titleLines, titleSize, titleFill, titleStroke = C.ink,
  titleShadow = C.ink, subs, subFill, cta, ctaFill = C.green, ctaColor = C.ink, art, css = '',
}) {
  const f = frame({ w: W, h: H, fill: bg, shadow, id });
  const d = dots(`${id}-d`, dotColor, 0.1);
  const first = 34 + titleSize * 0.78;
  const step = titleSize * 0.92;
  const titles = titleLines
    .map((t, i) => ptext(t, { x: 46, y: first + i * step, size: titleSize, fill: titleFill, stroke: titleStroke, sw: 10, shadow: { dx: 5, dy: 5, fill: titleShadow } }))
    .join('');
  const lastBase = first + (titleLines.length - 1) * step;
  const subY = lastBase + 46;
  const subSvg = subs
    .map((t, i) => `<text x="48" y="${subY + i * 30}" font-family="${FONT_MONO}" font-size="22" font-weight="700" fill="${subFill}">${t}</text>`)
    .join('');
  const ctaY = subY + (subs.length - 1) * 30 + 22;
  const tw = measure(cta, 24).w;
  const ctaW = Math.ceil(tw) + 36 + 46;
  const ctaSvg = sticker({
    x: 44, y: ctaY, w: ctaW, h: 46, fill: ctaFill, rot: -1.5, cls: 'cta',
    children: `${ptext(cta, { x: 18, y: 32, size: 24, fill: ctaColor })}<path transform="translate(${18 + tw + 14} 23)" d="M0 0 H20 M12 -9 L21 0 L12 9" fill="none" stroke="${ctaColor}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  });
  const allCss = `${MASCOT_CSS}
.cta{transform-box:fill-box;transform-origin:center;animation:cta 2.6s ease-in-out infinite}
@keyframes cta{0%,100%{transform:rotate(0) scale(1)}50%{transform:rotate(2deg) scale(1.04)}}
${css}`;
  const body = `${f.open}
${d.defs}${d.rect(W, H)}
${art}
${titles}${subSvg}${ctaSvg}
${f.close}`;
  return svgDoc({ w: W, h: H, css: allCss, body, title: a11y.title, desc: a11y.desc });
}
