import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
// PIKK Battles: streamer vs streamer, 60s countdown, TEST gifts per side, 24-hour badge (MASTER_HANDOFF).
const mem = {};
globalThis.localStorage = { getItem: (k) => mem[k] ?? null, setItem: (k, v) => { mem[k] = String(v); }, removeItem: (k) => { delete mem[k]; } };
globalThis.window ??= globalThis;
const S = await import('../src/store.js');
const H = 3600000;

function reset({ live = true } = {}) {
  S.signOut?.(); S.signInLocal('test_host');
  const gb = S.getActiveGiftBattle();
  if (gb?.status === 'pending') S.declineGiftBattle({ actorId: gb.opponent.id });
  if (gb?.status === 'active') run(() => S.tickGiftBattle(), gb.endsAt + 1);
  if (S.getState().live && !S.getState().live.endedAt) S.endLiveDemo();
  S.clearActiveGiftBattle();
  if (live) S.startLiveDemo('Battle test');
}
function run(fn, now) { const real = Date.now; Date.now = () => now; try { return fn(); } finally { Date.now = real; } }

test('only streamers can invite: a viewer (not live) is refused', () => {
  reset({ live: false });
  assert.equal(S.startGiftBattle({ opponentId: 'streamer_maya' }).error, 'not_streamer');
  assert.equal(S.isBattleStreamer(S.getState().user.id), false);
});
test('viewers cannot be contestants: invitee must be a live streamer; gifter pop challenge refused', () => {
  reset();
  assert.equal(S.startGiftBattle({ opponentId: 'fan_maya' }).error, 'opponent_not_streamer');
  assert.equal(S.startGiftBattle({ opponentId: 'some_viewer' }).error, 'opponent_not_streamer');
  assert.equal(S.challengeGifterFromPop().error, 'viewer_not_contestant');
  assert.ok(S.listDemoBattleStreamers().every((x) => x.live && S.isBattleStreamer(x.id)));
});
test('invite → only the invited streamer can accept; countdown is exactly 60s', () => {
  reset();
  const { battle } = S.startGiftBattle({ opponentId: 'streamer_maya' });
  assert.equal(battle.status, 'pending'); assert.equal(battle.mode, 'streamer_vs_streamer');
  assert.equal(S.acceptGiftBattle({ actorId: battle.challenger.id }).error, 'not_invitee');
  assert.equal(S.acceptGiftBattle({ actorId: 'some_viewer' }).error, 'not_invitee');
  const t0 = 1_800_000_000_000;
  const a = run(() => S.acceptGiftBattle({ actorId: 'streamer_maya' }), t0).battle;
  assert.equal(S.GB_DURATION_MS, 60_000); assert.equal(a.endsAt - a.startedAt, 60_000); assert.equal(a.status, 'active');
});
test('decline by the invited streamer ends the invite', () => {
  reset();
  S.startGiftBattle({ opponentId: 'streamer_jay' });
  assert.equal(S.declineGiftBattle({ actorId: 'test_x' }).error, 'not_invitee');
  assert.equal(S.declineGiftBattle({ actorId: 'streamer_jay' }).battle.result, 'declined');
});
test('TEST gifts go to a streamer side, no wallet/payment change; higher score wins and is announced', () => {
  reset();
  const wallet0 = JSON.stringify(S.getState().wallet); const live0 = S.getState().live.giftsTotal;
  S.startGiftBattle({ opponentId: 'streamer_maya' });
  S.acceptGiftBattle({ actorId: 'streamer_maya' });
  let r = S.recordBattleGift({ side: 'opponent', amount: 10 });
  assert.equal(r.entry.toStreamerId, 'streamer_maya'); assert.equal(r.entry.testMode, true);
  S.recordBattleGift({ side: 'challenger', amount: 5 });
  assert.equal(S.recordBattleGift({ side: 'viewer', amount: 1 }).error, 'bad_side');
  assert.equal(JSON.stringify(S.getState().wallet), wallet0, 'no wallet debit');
  assert.equal(S.getState().live.giftsTotal, live0, 'no live-support event');
  const b = S.getActiveGiftBattle();
  const ended = run(() => S.tickGiftBattle(), b.endsAt + 1);
  assert.equal(ended.result, 'win'); assert.equal(ended.winnerId, 'streamer_maya'); assert.equal(ended.scoreB, 10); assert.equal(ended.scoreA, 5);
  assert.equal(S.listBattleHistory(1)[0].id, ended.id, 'history entry');
  assert.ok(S.listTopBattleWinners().some((t) => t.userId === 'streamer_maya'), 'leaderboard entry');
});
test('champion badge expires exactly winAt + 24h, also across midnight', () => {
  reset();
  S.startGiftBattle({ opponentId: 'streamer_jay' });
  const lateNight = new Date(2026, 10, 2, 23, 30, 0).getTime(); // 11:30 PM local
  run(() => S.acceptGiftBattle({ actorId: 'streamer_jay' }), lateNight - 60_000);
  run(() => S.recordBattleGift({ side: 'challenger', amount: 1 }), lateNight - 30_000);
  const ended = run(() => S.tickGiftBattle(), lateNight);
  assert.equal(ended.championUntil, lateNight + 24 * H);
  assert.equal(S.gbChampionExpiresAt(lateNight), lateNight + 24 * H);
  const holder = (t) => [S.getChampion(t)].concat([]).some((c) => c?.battleId === ended.id) || false;
  assert.ok(new Date(lateNight + 2 * H).getDate() !== new Date(lateNight).getDate(), 'crosses midnight');
  assert.equal(holder(lateNight + 2 * H), true, 'still champion after midnight');
  assert.equal(holder(lateNight + 24 * H - 1), true);
  assert.equal(holder(lateNight + 24 * H), false, 'expired at +24h');
});
test('tie gives no badge (tie handling flagged for owner)', () => {
  reset();
  S.startGiftBattle({ opponentId: 'streamer_maya' });
  S.acceptGiftBattle({ actorId: 'streamer_maya' });
  const b = S.getActiveGiftBattle();
  const ended = run(() => S.tickGiftBattle(), b.endsAt + 1);
  assert.equal(ended.result, 'tie'); assert.equal(ended.championUntil, null);
  assert.equal(S.GB_TIE_OWNER_VERIFICATION_NEEDED.onTie, 'tie_no_badge');
  assert.equal(S.GB_SCORING_OWNER_VERIFICATION_NEEDED.formula, 'sum_of_test_gift_points');
});
test('page: streamer-vs-streamer copy, split screen, 24h badge, no midnight / viewer-vs-viewer wording', () => {
  const page = readFileSync(new URL('../src/pages/giftbattles.js', import.meta.url), 'utf8');
  assert.match(page, /Streamer vs streamer/); assert.match(page, /Viewers cannot be contestants/);
  assert.match(page, /gb-split/); assert.match(page, /24-hour champion badge/);
  assert.match(page, /owner verification needed/);
  assert.doesNotMatch(page, /viewer vs viewer|rest of (the calendar )?day|end of day|Demo battle sandbox|simulate opponent/i);
  const store = readFileSync(new URL('../src/store.js', import.meta.url), 'utf8');
  assert.doesNotMatch(store, /championUntil: winnerId \? gbEndOfLocalDay/);
});
