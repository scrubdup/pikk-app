import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
// PNG IHDR width/height
const dims = (p) => { const b = readFileSync(new URL('../' + p, import.meta.url)); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
test('t357u: header logo tightly cropped (no reflection/flare band), Create icon re-cropped; CSS aspect matches', () => {
  const [w, h] = dims('public/brand/pikk-logo-official.png');
  assert.deepEqual([w, h], [1023, 242]);
  assert.deepEqual(dims('public/brand/pikk-logo-badge.png'), [120, 88]);
  const css = readFileSync(new URL('../src/pikk-mockup.css', import.meta.url), 'utf8');
  assert.ok(Math.abs(h / w - 0.2366) < 0.001);
  assert.match(css, /\.logo-img \{ width: min\(34vw, 340px\); height: calc\(min\(34vw, 340px\) \* 0\.2366\); object-fit: contain; background: #000; \}/);
});

test('t360u: one official master; derived icons; no old logo paths referenced', async () => {
  const { readdirSync, statSync, existsSync } = await import('node:fs');
  for (const f of ['public/brand/pikk-logo-official.png','public/brand/pikk-logo-badge.png','public/brand/pikk-logo-square.png','public/favicon.ico','public/favicon-16.png','public/favicon-32.png','public/apple-touch-icon.png','public/brand/icon-192.png','public/brand/icon-512.png','public/brand/maskable-192.png','public/brand/maskable-512.png','public/og-image.png']) assert.ok(existsSync(new URL('../' + f, import.meta.url)), f);
  assert.deepEqual(dims('public/og-image.png'), [1200, 630]);
  assert.deepEqual(dims('public/apple-touch-icon.png'), [180, 180]);
  const old = /logo-dbs-v3|pikk-official-approved|pikk-create-play-cursor|pikk-official-logo\.jpg/;
  const walk = (d) => readdirSync(d).flatMap((n) => { const p = d + '/' + n; return statSync(p).isDirectory() ? walk(p) : [p]; });
  const root = new URL('..', import.meta.url).pathname;
  const files = ['index.html', 'public/manifest.webmanifest', ...walk(root + 'src').map((p) => p.slice(root.length)), ...walk(root + 'scripts').map((p) => p.slice(root.length))];
  for (const f of files) assert.doesNotMatch(readFileSync(root + f, 'utf8'), old, f);
  const man = JSON.parse(readFileSync(root + 'public/manifest.webmanifest', 'utf8'));
  assert.ok(man.icons.some((i) => i.purpose === 'maskable' && i.sizes === '512x512'));
});
