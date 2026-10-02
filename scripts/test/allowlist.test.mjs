import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { disallowedTargets } from '../lib/allowlist.mjs';

const ROOT = fileURLToPath(new URL('../../', import.meta.url));

test('el detector marca cualquier destino que no esté en la lista de permitidos', () => {
  assert.deepEqual(disallowedTargets('[x](https://github.com/Quirciano15/algun-repo) y github.com/Quirciano15/otro'), [
    'https://github.com/Quirciano15/algun-repo',
    'github.com/Quirciano15/otro',
  ]);
  assert.deepEqual(disallowedTargets('mailto:otro@ejemplo.com y alguien@ejemplo.com'), ['mailto:otro@ejemplo.com', 'alguien@ejemplo.com']);
  assert.deepEqual(disallowedTargets('https://github.com/Quirciano15/claude-skills-collection-privado'), [
    'https://github.com/Quirciano15/claude-skills-collection-privado',
  ]);
});

test('el detector deja pasar solo los destinos aprobados', () => {
  const ok = `[a](https://prismo.digital/) [b](https://laestanteriaoculta.es/) [c](https://www.correctorarmonia.com/)
[d](https://github.com/Quirciano15/claude-skills-collection) [e](mailto:quirciano@gmail.com) quirciano@gmail.com
xmlns="http://www.w3.org/2000/svg"`;
  assert.deepEqual(disallowedTargets(ok), []);
});

test('README, SVG y escenas solo contienen destinos aprobados (sin repos privados)', () => {
  const files = [
    ['README.md', readFileSync(ROOT + 'README.md', 'utf8')],
    ...readdirSync(ROOT + 'assets').map((f) => [`assets/${f}`, readFileSync(ROOT + 'assets/' + f, 'utf8')]),
    ...readdirSync(ROOT + 'scripts/scenes').map((f) => [`scripts/scenes/${f}`, readFileSync(ROOT + 'scripts/scenes/' + f, 'utf8')]),
  ];
  for (const [name, text] of files) assert.deepEqual(disallowedTargets(text), [], `destino no permitido en ${name}`);
});
