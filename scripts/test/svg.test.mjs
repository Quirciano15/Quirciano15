import test from 'node:test';
import assert from 'node:assert/strict';
import { svgDoc, typedLines, esc } from '../lib/svg.mjs';

test('svgDoc incluye title, desc, reduced-motion y viewBox', () => {
  const s = svgDoc({ w: 100, h: 50, title: 'Título largo', desc: 'Descripción larga', css: '', body: '' });
  assert.match(s, /viewBox="0 0 100 50"/);
  assert.match(s, /<title id="t">Título largo<\/title>/);
  assert.match(s, /prefers-reduced-motion: reduce/);
  assert.match(s, /animation:none!important/);
});

test('esc escapa caracteres XML', () => {
  assert.equal(esc('a<b>&"c'), 'a&lt;b&gt;&amp;&quot;c');
});

test('typedLines: estado base descubierto (reduced-motion enseña el texto)', () => {
  const { css, svg } = typedLines({ id: 'ty', x: 10, y: 40, lineH: 30, bg: '#fff', size: 24, fill: '#000', lines: ['hola', 'mundo'] });
  assert.match(css, /\.ty0\{[^}]*transform:translateX\(112%\)/);
  assert.match(css, /@keyframes ty0\{0%,0\.00%\{transform:translateX\(0\)\}/);
  assert.match(svg, /clip-path="url\(#ty-c0\)"/);
  assert.doesNotMatch(svg, /class="ty0"[^>]*transform=/);
});
