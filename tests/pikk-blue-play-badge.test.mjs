import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const r = (p) => new URL('../' + p, import.meta.url);
test('header logo and Create tab use the blue circle play badge assets', () => {
  const html = readFileSync(r('index.html'), 'utf8');
  const main = readFileSync(r('src/main.js'), 'utf8');
  assert.match(html, /class="logo-img" src="%BASE_URL%brand\/pikk-logo-header\.png"/);
  assert.match(main, /pikk-create-logo-icon" src="\$\{asset\('\/brand\/pikk-create-play-cursor-blue\.png'\)\}"/);
  for (const f of ['public/brand/pikk-logo-header.png', 'public/brand/pikk-create-play-cursor-blue.png', 'public/brand/pikk-official-approved.jpg']) assert.ok(existsSync(r(f)), f);
});
