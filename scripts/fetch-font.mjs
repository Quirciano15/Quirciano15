import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const OUT = fileURLToPath(new URL('./.cache/bricolage.ttf', import.meta.url));
const URL_ =
  'https://raw.githubusercontent.com/google/fonts/main/ofl/bricolagegrotesque/BricolageGrotesque%5Bopsz%2Cwdth%2Cwght%5D.ttf';

if (!existsSync(OUT)) {
  mkdirSync(new URL('./.cache/', import.meta.url), { recursive: true });
  const res = await fetch(URL_);
  if (!res.ok) throw new Error(`No se pudo descargar la fuente: ${res.status}`);
  writeFileSync(OUT, Buffer.from(await res.arrayBuffer()));
  console.log('Fuente descargada en', OUT);
} else {
  console.log('Fuente ya en caché');
}
