import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { MANIFEST } from '../manifest.mjs';

const ASSETS = fileURLToPath(new URL('../../assets/', import.meta.url));
const only = process.env.ONLY; // p. ej. ONLY=hero.svg

for (const { file, w, h, maxKB } of MANIFEST.filter((m) => !only || m.file === only)) {
  const path = ASSETS + file;
  const read = () => readFileSync(path, 'utf8');

  test(`${file}: existe y respeta el presupuesto de peso`, () => {
    assert.ok(existsSync(path), `falta ${file} (ejecuta: npm run build)`);
    assert.ok(statSync(path).size <= maxKB * 1024, `${file} pesa más de ${maxKB} KB`);
  });
  test(`${file}: XML bien formado`, () => {
    execFileSync('xmllint', ['--noout', path]);
  });
  test(`${file}: autocontenido`, () => {
    const s = read();
    assert.match(s, new RegExp(`viewBox="0 0 ${w} ${h}"`));
    assert.doesNotMatch(s, /<script|<foreignObject|<image|@import|<a[ >]|<animate|<set /i);
    assert.doesNotMatch(s.replace('http://www.w3.org/2000/svg', ''), /https?:\/\//);
  });
  test(`${file}: accesible, animado y con reduced-motion`, () => {
    const s = read();
    assert.match(s, /<title id="t">[^<]{8,}<\/title>/);
    assert.match(s, /<desc id="d">[^<]{20,}<\/desc>/);
    assert.match(s, /@keyframes/);
    assert.match(s, /prefers-reduced-motion: reduce/);
  });
  test(`${file}: texto legible en móvil (font-size >= 22)`, () => {
    const sizes = [...read().matchAll(/font-size[=:]"?(\d+)/g)].map((m) => Number(m[1]));
    for (const sz of sizes) assert.ok(sz >= 22, `font-size ${sz} < 22`);
  });
}
