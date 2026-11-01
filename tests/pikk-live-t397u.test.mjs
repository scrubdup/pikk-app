import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { LIVE_DISCOVERY_GROUPS, renderLiveDiscoveryDirectory } from '../src/live-discovery.js';
import { GENERAL_LIVE, ROOM_GROUPS, ROOM_MODES, PIN_DURATIONS, renderGoLiveCategoryFields, renderGroupRoomsPanel } from '../src/live-rooms.js';
const SPEC = new URL('./fixtures/PIKK_Live_78_Topics.md', import.meta.url);

const md = readFileSync(SPEC, 'utf8');
const live = readFileSync(new URL('../src/pages/live.js', import.meta.url), 'utf8');
const rooms = readFileSync(new URL('../src/live-rooms.js', import.meta.url), 'utf8');
const spec = [...md.matchAll(/^## (.+?) — (\d+)[^\n]*\n((?:\d+\. .+\n?)+)/gm)].map((m) => ({ title: m[1].trim(), count: +m[2], names: [...m[3].matchAll(/^\d+\. (.+)$/gm)].map((x) => x[1].trim()) }));
const block = live.slice(live.indexOf('const LIVE_DISCOVERY_CATEGORIES = ['), live.indexOf('\n];', live.indexOf('const LIVE_DISCOVERY_CATEGORIES = [')));
const cats = [...block.matchAll(/^\s*\[\s*(?:'((?:\\'|[^'])*)'|"((?:\\"|[^"])*)")\s*,/gm)].map((m) => (m[1] ?? m[2]).replace(/\\'/g, "'"));

test('t397u spec parse: 8 sections, 78 topics, counts match headers', () => {
  assert.equal(spec.length, 8);
  for (const s of spec) assert.equal(s.names.length, s.count, s.title);
  assert.equal(spec.reduce((n, s) => n + s.count, 0), 78);
});
test('t397u data matches spec exactly (section titles, names, order, counts)', () => {
  for (const s of spec) {
    const g = LIVE_DISCOVERY_GROUPS.find((x) => x.title === s.title.replace(/ Live$/, ' Live'));
    assert.ok(g, 'section ' + s.title);
    assert.deepEqual(g.names, s.names, s.title);
  }
  assert.equal(LIVE_DISCOVERY_GROUPS.length, 8);
  assert.deepEqual([...cats].sort(), spec.flatMap((s) => s.names).sort(), 'every topic has a category entry');
});
test('t397u categories tab renders all 78 topics with correct per-section counts', () => {
  const h = renderLiveDiscoveryDirectory(cats.map((n) => [n, 'd', '•']), (x) => String(x).replace(/&/g, '&amp;'));
  for (const s of spec) {
    const g = LIVE_DISCOVERY_GROUPS.find((x) => x.title === s.title);
    const sec = h.slice(h.indexOf(`id="pikk-live-group-${g.id}"`)); 
    assert.match(sec, new RegExp(`pikk-live-directory-count">${s.count} rooms`));
  }
  assert.equal((h.match(/class="live-cat-card pikk-live-room-card"/g) || []).length, 78);
});
test('t397u Go Live: exactly one of 17 General categories + title + permissions; start requires a category', () => {
  assert.deepEqual(GENERAL_LIVE, spec.find((s) => s.title === 'General Live').names);
  const h = renderGoLiveCategoryFields();
  assert.equal((h.match(/data-golive-cat=/g) || []).length, 17);
  assert.match(h, /role="radiogroup"/);
  for (const id of ['livePermChat', 'livePermGuests', 'livePermGifts']) assert.ok(h.includes(`id="${id}"`), id);
  assert.match(live, /\$\{renderGoLiveCategoryFields\(\)\}/);
  assert.match(live, /id="liveTitle"/);
  assert.match(live, /if \(!goFields\.category\) return toast\('Pick one Go Live category'\)/);
});
test('t397u Group Rooms: topic → Video/Voice/Text TEST MODE shell with all controls', () => {
  assert.equal(ROOM_GROUPS.reduce((n, g) => n + g.names.length, 0), 61);
  assert.deepEqual(ROOM_MODES, ['Video', 'Voice', 'Text']);
  const h = renderGroupRoomsPanel({ goalHtml: '<div id="liveDailyGoal"></div>' });
  for (const x of ['id="roomTopic"', 'data-room-mode="Video"', 'data-room-mode="Voice"', 'data-room-mode="Text"', 'id="roomChatForm"', 'pikk-room-react', 'Raise hand / Request to speak',
    'Approve', 'Make co-host', 'Mute', 'Remove', 'Block / Report', 'Leave Room', 'Open microphones', 'Demo-only activity', 'TEST MODE', 'Pinned', 'id="liveDailyGoal"']) assert.ok(h.includes(x) || rooms.includes(x), x);
  assert.equal(PIN_DURATIONS[0][0], 2); assert.equal(PIN_DURATIONS.at(-1)[0], 120);
  assert.match(live, /\{ id: 'rooms', href: '#\/live\?tab=rooms', label: 'Group Rooms' \}/);
  assert.match(live, /renderGroupRoomsPanel\(\{ user, goalHtml: [^)]*renderLiveDailyGoalCard\(/);
});
test('t397u honesty: no camera/mic access, no fabricated viewer counts in rooms', () => {
  assert.ok(!/getUserMedia|mediaDevices/.test(rooms));
  assert.ok(!/Math\.random|viewers\s*[:=]/.test(rooms));
  assert.match(rooms, /1 participant \(you\)/);
});
test('t397u follow-up: no Math.random viewer counts in Go Live / live page / rooms code', () => {
  const store = readFileSync(new URL('../src/store.js', import.meta.url), 'utf8');
  const fn = (name) => { const i = store.indexOf(`export function ${name}(`); return store.slice(i, store.indexOf('\nexport function', i + 10)); };
  for (const n of ['startLiveDemo', 'bumpLiveViewers']) assert.ok(!/Math\.random/.test(fn(n)), n);
  assert.match(fn('startLiveDemo'), /viewers: 0,/);
  assert.ok(!/Math\.random[^;\n]*view|view[^;\n]*Math\.random/i.test(live + rooms));
  assert.ok(!live.includes('liveBumpViewers'));
  assert.match(live, /Demo · no real viewers/);
});
test('t397u follow-up: Voice mode hides video seats and shows voice avatars', () => {
  const h = renderGroupRoomsPanel();
  assert.match(h, /id="roomVoice" hidden/);
  assert.match(h, /mic off \(demo\)/);
  assert.match(rooms, /\$\('#roomStage'\)\.hidden = st\.mode !== 'Video';/);
  assert.match(rooms, /\$\('#roomVoice'\)\.hidden = st\.mode !== 'Voice';/);
});
