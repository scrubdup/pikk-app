import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { openChallengeWindow, isWindowOpen, tryAccept, startBattle, addGift, timeLeftMs, isOver, computeWinner, CHALLENGE_WINDOW_MS, BATTLE_MS, renderGiftForAllControls, renderGiftBattleExplainer, DEMO_PLACEHOLDER } from '../src/live-gift-battle.js';
const rd = (f) => readFileSync(new URL('../src/' + f, import.meta.url), 'utf8');
const mod = rd('live-gift-battle.js'), live = rd('pages/live.js'), rooms = rd('live-rooms.js'), gbPage = rd('pages/giftbattles.js'), roast = rd('pages/roast-arena.js');
const T0 = 1_000_000;

test('t402u: 30s challenge window opens on gift-for-all and expires', () => {
  assert.equal(CHALLENGE_WINDOW_MS, 30000);
  const w = openChallengeWindow({ gifter: 'ann', now: T0 });
  assert.ok(isWindowOpen(w, T0 + 29999));
  assert.ok(!isWindowOpen(w, T0 + 30000));
  const r = tryAccept(w, 'bob', T0 + 30000);
  assert.equal(r.ok, false); assert.equal(r.reason, 'expired');
});
test('t402u: first tap wins; a second tap is rejected; gifter cannot self-accept', () => {
  const w = openChallengeWindow({ gifter: 'ann', now: T0 });
  assert.equal(tryAccept(w, 'ann', T0 + 1).reason, 'self');
  const first = tryAccept(w, 'bob', T0 + 1000);
  assert.ok(first.ok); assert.equal(first.window.challenger, 'bob');
  assert.equal(first.battle.a.name, 'ann'); assert.equal(first.battle.b.name, 'bob');
  const second = tryAccept(first.window, 'cat', T0 + 1001);
  assert.equal(second.ok, false); assert.equal(second.reason, 'taken');
});
test('t402u: 60s battle timer; gifts after the end are ignored', () => {
  assert.equal(BATTLE_MS, 60000);
  let b = startBattle('ann', 'bob', T0);
  assert.equal(timeLeftMs(b, T0 + 15000), 45000);
  assert.ok(!isOver(b, T0 + 59999)); assert.ok(isOver(b, T0 + 60000));
  b = addGift(b, 'a', 5, T0 + 1000); b = addGift(b, 'b', 10, T0 + 2000);
  const after = addGift(b, 'a', 100, T0 + 60000);
  assert.equal(after.a.total, 5);
});
test('t402u: computeWinner — more total wins; ties', () => {
  let b = startBattle('ann', 'bob', T0);
  assert.deepEqual(computeWinner(b), { result: 'tie', name: null });
  b = addGift(addGift(b, 'a', 5, T0), 'b', 10, T0);
  assert.deepEqual(computeWinner(b), { result: 'b', name: 'bob' });
  b = addGift(b, 'a', 6, T0);
  assert.deepEqual(computeWinner(b), { result: 'a', name: 'ann' });
  b = addGift(b, 'b', 1, T0);
  assert.equal(computeWinner(b).result, 'tie');
});
test('t402u: wired into Live and Group Rooms; no host battle button; non-blocking; honest TEST MODE', () => {
  const c = renderGiftForAllControls('room');
  assert.match(c, /Send gift for all viewers/); assert.match(c, /data-gb-slot="room" hidden/);
  assert.match(live, /\$\{renderGiftForAllControls\('live'\)\}/); assert.match(rooms, /\$\{renderGiftForAllControls\('room'\)\}/);
  assert.match(live, /bindGiftForAll\(root/);
  assert.ok(!/data-gb-start|Gift Battle<\/button>|renderGiftBattleButton/.test(mod + live + rooms));
  assert.ok(rooms.indexOf("renderGiftForAllControls('room')") < rooms.indexOf('id="roomHostTools"'), 'members see it (outside host tools)');
  assert.ok(!/Math\.random|fetch\(|getUserMedia|champion|rest of (the )?day|end of day/i.test(mod));
  assert.ok(!/from '\.\/store\.js'/.test(mod));
  assert.match(mod, /TEST MODE · demo gifts · no charges/); assert.match(DEMO_PLACEHOLDER, /placeholder/);
  const css = rd('pikk-pages.css'); assert.match(css, /\.pikk-gb\{position:sticky/);
});
test('t402u: Gift Battles page = explainer of the flow linking into Live; no sign-in wall; Roast untouched', () => {
  const ex = renderGiftBattleExplainer();
  for (const x of ['for all viewers', '30 seconds', '60-second', 'first', '#/live?tab=channels', '#/live?tab=rooms', 'TEST MODE']) assert.ok(ex.includes(x), x);
  assert.match(gbPage, /if \(!user\) return shellPage\('Gift Battles', renderGiftBattleExplainer\(\)/);
  assert.ok(!/live-gift-battle/.test(roast));
});
import { recordResult, hasWinnerBadge, battleRecord, dailyWinners, stripWinners, gridCell, emptyRecords, BADGE_MS, DAY_MS, STRIP_MAX } from '../src/live-gift-battle.js';
const battle = (a, at, b, bt, now) => { let x = startBattle(a, b, now); x = addGift(x, 'a', at, now); return addGift(x, 'b', bt, now); };
const D0 = DAY_MS * 1000; // start of a 24h window
test('t403u: winner badge lasts exactly 24h from the win; never end-of-day/3h', () => {
  assert.equal(BADGE_MS, 24 * 3600000);
  const rec = recordResult(emptyRecords(), battle('ann', 10, 'bob', 3, D0 + 5000), D0 + 5000);
  assert.ok(hasWinnerBadge(rec, 'ann', D0 + 5000));
  assert.ok(hasWinnerBadge(rec, 'ann', D0 + 5000 + BADGE_MS - 1));
  assert.ok(!hasWinnerBadge(rec, 'ann', D0 + 5000 + BADGE_MS));
  assert.ok(!hasWinnerBadge(rec, 'bob', D0 + 5000));
  assert.ok(!/3h|3 hours|end of day|rest of (the )?day/i.test(mod));
});
test('t403u: battle record W-L (ties counted separately)', () => {
  let rec = emptyRecords();
  rec = recordResult(rec, battle('ann', 10, 'bob', 3, D0), D0);
  rec = recordResult(rec, battle('ann', 1, 'bob', 3, D0), D0);
  rec = recordResult(rec, battle('ann', 2, 'cat', 2, D0), D0);
  assert.deepEqual(battleRecord(rec, 'ann'), { w: 1, l: 1, t: 1 });
  assert.deepEqual(battleRecord(rec, 'bob'), { w: 1, l: 1, t: 0 });
});
test('t403u/t404u: daily winners ranked by gift total, top-10 cap, resets every 24h', () => {
  let rec = emptyRecords();
  for (let i = 1; i <= 12; i++) rec = recordResult(rec, battle('w' + i, i * 10, 'x', 0, D0 + i), D0 + i);
  rec = recordResult(rec, battle('w1', 500, 'x', 0, D0 + 99), D0 + 99); // w1 total 510
  const list = dailyWinners(rec, D0 + 1000);
  assert.equal(list.length, 12);
  assert.deepEqual(list.slice(0, 3).map((x) => [x.rank, x.name, x.gifts]), [[1, 'w1', 510], [2, 'w12', 120], [3, 'w11', 110]]);
  assert.equal(STRIP_MAX, 10); assert.equal(stripWinners(rec, D0 + 1000).length, 10);
  assert.equal(dailyWinners(rec, D0 + DAY_MS).length, 0, 'next 24h window starts empty');
});
test('t404u: strip grid is 5x2 filled column-first', () => {
  assert.deepEqual([1, 2, 3, 4, 9, 10].map(gridCell), [{ col: 1, row: 1 }, { col: 1, row: 2 }, { col: 2, row: 1 }, { col: 2, row: 2 }, { col: 5, row: 1 }, { col: 5, row: 2 }]);
  const css = rd('pikk-pages.css');
  assert.match(css, /\.pikk-gb-strip-grid\{display:grid;grid-template-columns:repeat\(5,minmax\(0,1fr\)\);grid-template-rows:repeat\(2,auto\);grid-auto-flow:column/);
  // just above the chat in Live and Rooms
  assert.ok(live.indexOf("renderWinnersStrip('live')") < live.indexOf('id="liveChat"'));
  assert.ok(rooms.indexOf("renderWinnersStrip('room')") < rooms.indexOf('class="pikk-room-chat"'));
});
