import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { SLOT_CAPS, slotStatus, canBook, rotate, DEMO_OCCUPANCY, hourlyPlayerSchedule, HOUR_S } from '../src/promote-pricing.js';
globalThis.location = { hash: '#/promote' };
test('slot caps per window match owner', () => assert.deepEqual({ ...SLOT_CAPS }, { player: 20, storyrail: 20, spotlight: 1, featured: 2, promo: 3 }));
test('rotation gives an equal share per slot and never exceeds cap', () => {
  for (const [k, cap] of Object.entries(SLOT_CAPS)) {
    const bookings = Array.from({ length: cap + 3 }, (_, i) => `${k}${i}`);
    const { accepted, rejected, schedule } = rotate(bookings, cap, cap * 7 + 3);
    assert.equal(accepted.length, cap); assert.equal(rejected.length, 3);
    const counts = Object.values(schedule.reduce((m, x) => ((m[x] = (m[x] || 0) + 1), m), {}));
    assert.equal(counts.length, cap); assert.ok(Math.max(...counts) - Math.min(...counts) <= 1, k);
    assert.ok(schedule.every((x) => accepted.includes(x)));
  }
  assert.deepEqual(rotate([], 3, 5).schedule, []);
});
test('sold out blocks booking; labels', () => {
  assert.equal(slotStatus(6, 6).label, 'Sold out'); assert.equal(canBook(6, 6), false); assert.equal(canBook(1, 0), true);
  assert.equal(slotStatus(10, 3).label, '7 of 10 slots left'); assert.equal(slotStatus(2, 9).booked, 2);
});
test('#/promote shows slot labels (TEST MODE, all open) and renders sold-out disabled', async () => {
  const { renderPromote } = await import('../src/pages/promote.js');
  const html = renderPromote();
  for (const k of Object.keys(SLOT_CAPS)) assert.ok(html.includes(`data-slots="${k}"`), k);
  assert.ok(Object.values(DEMO_OCCUPANCY).every((v) => v === 0), 'no fake bookings');
  assert.match(html, /20 of 20 slots left · TEST MODE/); assert.match(html, /20 of 20 slots left/); assert.match(html, /1 of 1 slots left/);
  const src = readFileSync(new URL('../src/pages/promote.js', import.meta.url), 'utf8');
  assert.match(src, /st\.soldOut \? ' disabled aria-disabled="true"'/); assert.match(src, /Sold out for this window/);
});
test('backend slot doc exists with server-side enforcement', () => {
  const p = new URL('../docs/promote-slots.md', import.meta.url); assert.ok(existsSync(p));
  const d = readFileSync(p, 'utf8'); assert.match(d, /server-side/i); assert.match(d, /round-robin/i); assert.match(d, /window/i);
});

test('t346u: a full set of 20 paid songs each gets ≥ 1 play in every hour', () => {
  for (const len of [150, 210, 245, 420]) {
    const songs = Array.from({ length: 20 }, (_, i) => ({ id: 's' + i, seconds: len + i * 7 }));
    const hours = hourlyPlayerSchedule(songs, 24);
    assert.equal(hours.length, 24);
    hours.forEach((plays, h) => {
      const ids = new Set(plays.map((p) => p.id));
      for (const s of songs) assert.ok(ids.has(s.id), `hour ${h} missing ${s.id} (len ${len})`);
      assert.equal(plays.reduce((a, p) => a + p.seconds, 0), HOUR_S);
      assert.ok(plays.every((p) => p.start >= h * HOUR_S && p.start < (h + 1) * HOUR_S));
    });
  }
  const extra = hourlyPlayerSchedule(Array.from({ length: 25 }, (_, i) => ({ id: 'x' + i, seconds: 200 })), 1);
  assert.ok(!extra[0].some((p) => /x2[0-4]/.test(p.id)), 'songs beyond cap 20 never play');
});
test('t346u: story rail swipeable', () => {
  const css = readFileSync(new URL('../src/pikk-pages.css', import.meta.url), 'utf8');
  assert.match(css, /\.pikk-home-circle-strip\{overflow-x:auto;scroll-snap-type:x mandatory/);
});
