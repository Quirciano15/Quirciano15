import { mkdirSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const dir = fileURLToPath(new URL('./scenes/', import.meta.url));
const out = fileURLToPath(new URL('../assets/', import.meta.url));
mkdirSync(out, { recursive: true });

for (const f of readdirSync(dir).filter((n) => n.endsWith('.mjs')).sort()) {
  const mod = await import(pathToFileURL(dir + f).href);
  writeFileSync(out + mod.file, mod.build());
  console.log('✔', mod.file);
}
