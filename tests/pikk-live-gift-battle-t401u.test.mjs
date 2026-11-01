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
