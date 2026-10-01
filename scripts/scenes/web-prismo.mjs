import { C } from '../lib/palette.mjs';
import { webCard } from '../lib/webcard.mjs';
import { prism, sparkle } from '../lib/mascots.mjs';

export const file = 'web-prismo.svg';

export function build() {
  const spectrum = ['#ffc2d9', '#ff8fb8', '#fff', C.green, C.sky];
  const rays = spectrum
    .map((c, i) => `<polygon class="ray" style="animation-delay:${i * 0.2}s" points="745,${150 + i * 5} 745,${160 + i * 5} 920,${60 + i * 60} 920,${90 + i * 60}" fill="${c}" fill-opacity=".9"/>`)
    .join('');
  const art = `${rays}${prism({ x: 700, y: 160, s: 1.35 })}${sparkle({ x: 850, y: 50, r: 15, fill: C.yellow })}${sparkle({ x: 600, y: 250, r: 12, fill: C.green, delay: 1 })}`;
  return webCard({
    id: 'wp',
    a11y: {
      title: 'Prismo: webs y automatizaciones con IA para pequeños negocios — prismo.digital',
      desc: 'Tarjeta rosa con el prisma sonriente de Prismo. Texto: Ponemos tu negocio en internet. Tú no tienes que entender nada. Botón verde: prismo.digital.',
    },
    bg: C.pink, dotColor: '#fff', titleLines: ['PRISMO'], titleSize: 92, titleFill: '#fff',
    subs: ['Ponemos tu negocio en internet.', 'Tú no tienes que entender nada.'], subFill: '#fff',
    cta: 'prismo.digital', art,
    css: `.ray{transform-box:fill-box;transform-origin:left center;animation:ray 2.4s ease-in-out infinite}
@keyframes ray{0%,100%{transform:scaleY(.8);opacity:.8}50%{transform:scaleY(1.15);opacity:1}}`,
  });
}
