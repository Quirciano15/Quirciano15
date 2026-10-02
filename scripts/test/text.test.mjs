import test from 'node:test';
import assert from 'node:assert/strict';
import { measure, ptext, hasGlyphs } from '../lib/text.mjs';

test('measure devuelve un path y un ancho positivo', () => {
  const { d, w } = measure('PRISMO', 80);
  assert.match(d, /^M/);
  assert.ok(w > 150 && w < 500, `ancho raro: ${w}`);
});

test('el ancho escala con el tamaño', () => {
  assert.ok(measure('ABC', 100).w > measure('ABC', 50).w * 1.9);
});

test('la fuente tiene glifo para los acentos que usamos', () => {
  assert.equal(hasGlyphs('ESTANTERÍA ARMONÍA ESPAÑA ÓÁÉÚñ'), true);
});

test('measure rechaza texto con caracteres que la fuente no tiene (evita .notdef silencioso)', () => {
  assert.throws(() => measure('日本語', 40), /glifo/i);
});

test('ptext rechaza tamaños ilegibles en móvil (< 22)', () => {
  assert.throws(() => ptext('HOLA', { x: 0, y: 0, size: 20, fill: '#000' }), /22/);
});

test('ptext genera un <path> con translate y respeta anchor=middle', () => {
  const a = ptext('HOLA', { x: 100, y: 50, size: 40, fill: '#fff' });
  const b = ptext('HOLA', { x: 100, y: 50, size: 40, fill: '#fff', anchor: 'middle' });
  assert.match(a, /<path[^>]+translate\(100 50\)/);
  assert.notEqual(a, b);
});
