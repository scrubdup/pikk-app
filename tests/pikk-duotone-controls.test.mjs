import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const read = (p) => readFileSync(new URL('../' + p, import.meta.url), 'utf8');
test('shared duotone tokens apply blue edge + red glow to buttons, chips, pills, drawer and sheet rows', () => {
  const css = read('src/pikk-duotone.css');
  assert.match(css, /--pikk-duo-edge: rgba\(47, 107, 255/); assert.match(css, /--pikk-duo-glow: 0 0 9px rgba\(255, 49, 55/);
  for (const k of ['.btn', 'button', '.chip', '.pill', '.icon-btn', '.drawer-link', '.pikk-create-tile']) assert.ok(css.includes(k), k);
  assert.match(css, /#tabbar > a:not\(\.tab-primary\) \.tab-ico svg \{ stroke: var\(--pikk-red\)/);
  assert.match(read('src/main.js'), /import '\.\/pikk-duotone\.css';/);
  assert.ok(existsSync(new URL('../scripts/visual-review-duotone.mjs', import.meta.url)));
  assert.match(read('.github/workflows/pikk-duotone-visual.yml'), /node scripts\/visual-review-duotone\.mjs/);
});
