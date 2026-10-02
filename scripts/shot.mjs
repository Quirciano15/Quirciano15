import puppeteer from 'puppeteer-core';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { MANIFEST } from './manifest.mjs';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ASSETS = fileURLToPath(new URL('../assets/', import.meta.url));
const OUT = fileURLToPath(new URL('./.out/', import.meta.url));
mkdirSync(OUT, { recursive: true });
const only = process.argv[2]; // p. ej. hero.svg
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
for (const { file, w, h } of MANIFEST.filter((m) => !only || m.file === only)) {
  const name = file.replace('.svg', '');
  const shoot = async ({ tag, bg, width, reduced = false, waits }) => {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 200, deviceScaleFactor: 1 });
    if (reduced) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    if (reduced) {
      // La emulación de media features no llega a un SVG dentro de <img>: se carga como documento.
      await page.goto(`file://${ASSETS}${file}`);
    } else {
      const html = `${OUT}${name}-${tag}.html`;
      writeFileSync(html, `<body style="margin:0;background:${bg}"><img src="file://${ASSETS}${file}" style="width:100%;display:block"></body>`);
      await page.goto(`file://${html}`);
    }
    let t = 0;
    for (const at of waits) {
      await sleep(Math.max(0, (at - t) * 1000));
      t = at;
      await page.screenshot({ path: `${OUT}${name}-${tag}-t${at}.png`, fullPage: true });
    }
    await page.close();
  };
  await shoot({ tag: 'light', bg: '#ffffff', width: 900, waits: [1, 4, 8] });
  await shoot({ tag: 'dark', bg: '#0d1117', width: 900, waits: [4] });
  await shoot({ tag: 'mobile', bg: '#ffffff', width: 390, waits: [4] });
  await shoot({ tag: 'reduced', bg: '#ffffff', width: 900, reduced: true, waits: [1] });
  console.log('✔ capturas', file, `(${w}x${h})`);
}
await browser.close();
