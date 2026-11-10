import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const output = resolve('dist/client');
const html = readFileSync(resolve(output, 'index.html'), 'utf8');
const prefix = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
assert(html.includes('Little gifts.'), 'Homepage content is missing from the export');
for (const filename of ['joy-gift-box.jpg', 'gift-hero.png', 'og.png', 'favicon.svg']) {
  assert(existsSync(resolve(output, filename)), `Missing public file: ${filename}`);
  assert(html.includes(`${prefix}/${filename}`), `Missing prefixed image URL: ${filename}`);
}
for (const [, url] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (/^(?:https?:|data:|mailto:|tel:)/.test(url)) continue;
  if (!url.startsWith('/')) continue;
  assert(!prefix || url.startsWith(`${prefix}/`), `URL escapes the repository path: ${url}`);
  const file = decodeURIComponent(url.slice(prefix.length).split(/[?#]/)[0]);
  assert(existsSync(resolve(output, '.' + file)), `Missing local asset: ${url}`);
}
assert(/rel="stylesheet"/.test(html), 'Built CSS is missing');
console.log('Verified exported homepage, styles, scripts and repository-prefixed images.');
