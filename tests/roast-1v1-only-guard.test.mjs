import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
// Owner ruling t461u: there is NO Tag-Team anywhere in PIKK. Roast is 1v1 only.
const TAG = /tag[\s_-]*team|2v2|roast_tag/i;
for (const f of ['src/roast-engine.js', 'src/pages/roast-arena.js', 'scripts/visual-review-roast-taps.mjs', '.github/workflows/pikk-roast-visual.yml', 'src/pages/live.js']) {
  test(`no Tag-Team in ${f}`, () => {
    assert.doesNotMatch(readFileSync(new URL('../' + f, import.meta.url), 'utf8'), TAG);
  });
}
test('roast engine exports no team API and matches are 1v1', async () => {
  const e = await import('../src/roast-engine.js');
  for (const k of Object.keys(e)) assert.doesNotMatch(k, /tag|team/i, k);
});
