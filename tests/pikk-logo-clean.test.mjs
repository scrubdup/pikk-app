import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
// PNG IHDR width/height
const dims = (p) => { const b = readFileSync(new URL('../' + p, import.meta.url)); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
test('t357u: header logo tightly cropped (no reflection/flare band), Create icon re-cropped; CSS aspect matches', () => {
  const [w, h] = dims('public/brand/pikk-logo-header.png');
  assert.deepEqual([w, h], [1023, 242]);
  assert.deepEqual(dims('public/brand/pikk-create-play-cursor-blue.png'), [120, 88]);
  const css = readFileSync(new URL('../src/pikk-mockup.css', import.meta.url), 'utf8');
  assert.ok(Math.abs(h / w - 0.2366) < 0.001);
  assert.match(css, /\.logo-img \{ width: min\(34vw, 340px\); height: calc\(min\(34vw, 340px\) \* 0\.2366\); object-fit: contain; background: #000; \}/);
});
