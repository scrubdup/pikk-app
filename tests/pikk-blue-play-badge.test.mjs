import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const r = (p) => new URL('../' + p, import.meta.url);
test('header logo and Create tab use the blue circle play badge assets', () => {
  const html = readFileSync(r('index.html'), 'utf8');
  const main = readFileSync(r('src/main.js'), 'utf8');
  assert.match(html, /class="logo-img" src="%BASE_URL%brand\/pikk-logo-official\.png"/);
  assert.match(main, /pikk-create-logo-icon" src="\$\{asset\('\/brand\/pikk-logo-badge\.png'\)\}"/);
  for (const f of ['public/brand/pikk-logo-official.png', 'public/brand/pikk-logo-badge.png', 'public/brand/pikk-logo-official.png']) assert.ok(existsSync(r(f)), f);
});
