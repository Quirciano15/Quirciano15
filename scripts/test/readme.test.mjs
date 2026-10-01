import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { MANIFEST } from '../manifest.mjs';

const P = fileURLToPath(new URL('../../README.md', import.meta.url));
const README = existsSync(P) ? readFileSync(P, 'utf8') : '';

test('enlaza exactamente las tres webs', () => {
  for (const u of ['https://prismo.digital/', 'https://laestanteriaoculta.es/', 'https://www.correctorarmonia.com/'])
    assert.ok(README.includes(`](${u})`), `falta enlace a ${u}`);
});
test('usa cada asset con alt descriptivo', () => {
  for (const { file } of MANIFEST)
    assert.match(README, new RegExp(`!\\[[^\\]]{12,}\\]\\(assets/${file.replace('.', '\\.')}\\)`), `alt/uso de ${file}`);
});
test('no nombra ni enlaza repos privados', () => {
  const bloqueo = /bonnibel|leo-medusa|pisos-bot|xergiok|FINN|estanteria-medusa|prismo-web|JAKE|albertoquirce\.dev|claude-skills-private|Enchiridion|LEO_shopify|PokeApi|github\.com\/Quirciano15\/(?!claude-skills-collection)(?!Quirciano15)/i;
  assert.doesNotMatch(README, bloqueo);
});
test('mantiene el contacto público y el repo público', () => {
  assert.ok(README.includes('mailto:quirciano@gmail.com'));
  assert.ok(README.includes('https://github.com/Quirciano15/claude-skills-collection'));
});
