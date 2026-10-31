import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const index = readFileSync(new URL('index.html', root), 'utf8');
const manifest = readFileSync(new URL('public/manifest.webmanifest', root), 'utf8');

test('PIKK social previews point to the real GitHub Pages image, not site root', () => {
  assert.match(index, /<meta property="og:image" content="https:\/\/scrubdup\.github\.io\/pikk-app\/og-image\.png"\s*\/>/);
  assert.ok(existsSync(new URL('public/og-image.png', root)));
});

test('PIKK approved published logo is retained for splash and sticky player', () => {
  assert.ok(existsSync(new URL('public/brand/pikk-official-approved.jpg', root)));
  assert.ok((index.match(/%BASE_URL%brand\/pikk-official-approved\.jpg/g) || []).length >= 2);
});

test('PIKK public entrypoint and manifest do not revert to KLIK or KLIKK', () => {
  assert.doesNotMatch(index + manifest, /\bKLIKK?\b/i);
  assert.equal(JSON.parse(manifest).short_name, 'PIKK');
});
