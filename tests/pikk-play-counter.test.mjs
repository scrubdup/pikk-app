import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const store = {}; globalThis.localStorage = { getItem: (k) => store[k] ?? null, setItem: (k, v) => { store[k] = String(v); } };
const m = await import('../src/play-counter.js');
test('promoted and organic plays share one counter; only ≥3s plays count', () => {
  m._resetForTests();
  assert.equal(m.recordPlay('yt1', { seconds: 2.9, now: 0 }), false, 'under 3s ignored');
  assert.equal(m.recordPlay('yt1', { seconds: 0, now: 0 }), false, 'impression ignored');
  assert.ok(m.recordPlay('yt1', { seconds: 3, source: 'organic', now: 1_000 }));
  assert.ok(m.recordPlay('yt1', { seconds: 5, source: 'promote', now: 60_000 }));
  assert.equal(m.playCount('yt1'), 2);
});
test('rapid repeats are deduped', () => {
  m._resetForTests();
  assert.ok(m.recordPlay('v', { kind: 'video', seconds: 4, now: 0 }));
  assert.equal(m.recordPlay('v', { kind: 'video', seconds: 4, now: 10_000 }), false);
  assert.ok(m.recordPlay('v', { kind: 'video', seconds: 4, now: m.DEDUPE_MS + 1 }));
  assert.equal(m.playCount('v'), 2);
});
test('stories count on open only', () => {
  m._resetForTests();
  assert.equal(m.recordPlay('story:a', { kind: 'story', opened: false }), false);
  assert.ok(m.recordPlay('story:a', { kind: 'story', opened: true, source: 'promote' }));
  assert.equal(m.playCount('story:a'), 1);
  assert.equal(m.playCountLabel(1, 'audio'), '1 play · this device'); assert.equal(m.playCountLabel(3, 'video'), '3 views · this device');
});
test('wired into sticky player, page embeds, story rail, route decoration; backend doc line', () => {
  const player = readFileSync(new URL('../src/player.js', import.meta.url), 'utf8');
  assert.match(player, /recordPlay\(t\?\.youtubeId \|\| t\?\.title, \{ kind: 'audio', seconds: 3/);
  assert.match(player, /recordPlay\(vid, \{ kind: 'video', seconds: 3/);
  const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
  assert.match(main, /decoratePlayCounts\(app\);/); assert.match(main, /kind: 'story', opened: true/);
  assert.match(readFileSync(new URL('../index.html', import.meta.url), 'utf8'), /id="spPlays"/);
  assert.match(readFileSync(new URL('../docs/promote-slots.md', import.meta.url), 'utf8'), /server-side play\/view counting/i);
});
