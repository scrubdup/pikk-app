import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const mem = new Map(); globalThis.localStorage = { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, String(v)), removeItem: (k) => mem.delete(k) };
const c = await import('../src/pages/contest.js');
const { renderHomeShowcase } = await import('../src/home-showcase.js');
test('t356u: gate blocks rules until 18+ confirmed, stored locally, honest wording', () => {
  mem.clear();
  const g = c.renderTwerkContest();
  assert.match(g, /id="twerkGateYes"/); assert.doesNotMatch(g, /Rules/);
  assert.match(g, /Real age verification will be required once PIKK Safety and the backend are live/);
  c.confirmTwerkGate(); assert.equal(mem.get(c.TWERK_GATE_KEY), 'yes');
  const r = c.renderTwerkContest();
  assert.doesNotMatch(r, /twerkGateYes/);
  for (const re of [/18\+ only/, /No nudity or sexual content/, /community guidelines/, /Report/, /href="#\/guidelines"/, /Entries &amp; voting coming soon/]) assert.match(r, re);
});
test('t356u: Home tile is text only with 18+ badge and Enter to #/contest/twerk; route registered', () => {
  const h = renderHomeShowcase(); const s = h.slice(h.indexOf('data-hs="contest"')); const tile = s.slice(0, s.indexOf('</section>'));
  assert.match(tile, /Twerk Contest/); assert.match(tile, />18\+</); assert.match(tile, /href="#\/contest\/twerk">Enter</);
  assert.doesNotMatch(tile, /<img|<video|background-image|url\(/);
  assert.match(readFileSync(new URL('../src/main.js', import.meta.url), 'utf8'), /'\/contest\/twerk': \{ render: renderTwerkContest, bind: bindTwerkContest \}/);
});
