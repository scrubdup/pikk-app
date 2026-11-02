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
  if (gb?.status === 'active' || gb?.status === 'voting') { run(() => S.tickGiftBattle(), (gb.endsAt || 0) + 1); const v = S.getActiveGiftBattle(); if (v?.status === 'voting') run(() => S.tickGiftBattle(), v.voteEndsAt + 1); }
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
// Drive a battle: accept at t0, optional gifts, close countdown into voting, cast votes, close vote.
function battle({ opp = 'streamer_maya', gifts = [], votes = [], t0 = 1_800_000_000_000 } = {}) {
  S.startGiftBattle({ opponentId: opp });
  run(() => S.acceptGiftBattle({ actorId: opp }), t0);
  for (const [side, amount] of gifts) run(() => S.recordBattleGift({ side, amount }), t0 + 1000);
  const voting = run(() => S.tickGiftBattle(), t0 + 60_000);
  const results = votes.map(([viewerId, side]) => run(() => S.castBattleVote({ viewerId, side }), t0 + 61_000));
  const ended = run(() => S.tickGiftBattle(), voting.voteEndsAt);
  return { voting, results, ended };
}

test('TEST gifts go to a streamer side, do not score, no wallet/payment change', () => {
  reset();
  const wallet0 = JSON.stringify(S.getState().wallet); const live0 = S.getState().live.giftsTotal;
  S.startGiftBattle({ opponentId: 'streamer_maya' });
  S.acceptGiftBattle({ actorId: 'streamer_maya' });
  const r = S.recordBattleGift({ side: 'opponent', amount: 10 });
  assert.equal(r.entry.toStreamerId, 'streamer_maya'); assert.equal(r.entry.testMode, true);
  assert.equal(r.battle.giftB, 10); assert.equal(r.battle.scoreB, 0, 'gifts never score');
  assert.equal(S.recordBattleGift({ side: 'viewer', amount: 1 }).error, 'bad_side');
  assert.equal(JSON.stringify(S.getState().wallet), wallet0, 'no wallet debit');
  assert.equal(S.getState().live.giftsTotal, live0, 'no live-support event');
  assert.deepEqual({ ...S.GB_WINNER_RULE }, { decidedBy: 'audience_votes', giftsScore: false });
});
test('after the 60s countdown a vote opens (10s placeholder, owner verification needed)', () => {
  reset();
  const { voting } = battle();
  assert.equal(voting.status, 'voting'); assert.equal(voting.voteEndsAt - voting.voteStartedAt, 10_000);
  assert.deepEqual({ ...S.GB_VOTE_TIMING_OWNER_VERIFICATION_NEEDED }, { voteSeconds: 10 });
});
test('audience votes decide the winner even when gifts favor the other streamer; history + leaderboard', () => {
  reset();
  const { ended } = battle({ gifts: [['opponent', 500]], votes: [['test-viewer-1', 'challenger'], ['test-viewer-2', 'challenger'], ['test-viewer-3', 'opponent']] });
  assert.equal(ended.result, 'win'); assert.equal(ended.winnerId, S.getState().user.id);
  assert.equal(ended.scoreA, 2); assert.equal(ended.scoreB, 1); assert.equal(ended.giftB, 500);
  assert.equal(S.listBattleHistory(1)[0].id, ended.id, 'history entry');
  assert.ok(S.listTopBattleWinners().some((t) => t.userId === ended.winnerId), 'leaderboard entry');
});
test("a streamer's vote is rejected; a duplicate viewer vote is rejected; non-eligible rejected", () => {
  reset();
  const { results } = battle({ votes: [['streamer_maya', 'opponent'], [S.getState().user.id, 'challenger'], ['test-viewer-1', 'opponent'], ['test-viewer-1', 'challenger'], ['random', 'opponent']] });
  assert.deepEqual(results.map((r) => r.error || 'ok'), ['streamer_cannot_vote', 'streamer_cannot_vote', 'ok', 'already_voted', 'not_eligible']);
});
test('"X of Y eligible viewers voted" count during voting', () => {
  reset();
  S.startGiftBattle({ opponentId: 'streamer_jay' });
  const t0 = 1_900_000_000_000;
  run(() => S.acceptGiftBattle({ actorId: 'streamer_jay' }), t0);
  const v = run(() => S.tickGiftBattle(), t0 + 60_000);
  assert.deepEqual(S.battleVoteTurnout(v), { voted: 0, eligible: 3 }, 'host streamer excluded');
  const r = run(() => S.castBattleVote({ viewerId: 'test-viewer-2', side: 'opponent' }), t0 + 61_000);
  assert.deepEqual(S.battleVoteTurnout(r.battle), { voted: 1, eligible: 3 });
  const page = readFileSync(new URL('../src/pages/giftbattles.js', import.meta.url), 'utf8');
  assert.match(page, /data-gb-turnout[^>]*><strong>\$\{voted\} of \$\{eligible\} eligible viewers voted/);
  run(() => S.tickGiftBattle(), r.battle.voteEndsAt);
});
test('champion badge expires exactly winAt + 24h, also across midnight', () => {
  reset();
  const lateNight = new Date(2026, 10, 2, 23, 30, 0).getTime(); // 11:30 PM local = vote close
  const { ended } = battle({ opp: 'streamer_jay', t0: lateNight - 70_000, votes: [['test-viewer-1', 'challenger']] });
  assert.equal(ended.endedAt, lateNight); assert.equal(ended.championUntil, lateNight + 24 * H);
  assert.equal(S.gbChampionExpiresAt(lateNight), lateNight + 24 * H);
  const holder = (t) => S.getChampion(t)?.battleId === ended.id;
  assert.ok(new Date(lateNight + 2 * H).getDate() !== new Date(lateNight).getDate(), 'crosses midnight');
  assert.equal(holder(lateNight + 2 * H), true, 'still champion after midnight');
  assert.equal(holder(lateNight + 24 * H - 1), true);
  assert.equal(holder(lateNight + 24 * H), false, 'expired at +24h');
});
test('equal votes = tie, no badge (placeholder); placeholders flagged', () => {
  reset();
  const { ended } = battle({ gifts: [['challenger', 50]], votes: [['test-viewer-1', 'challenger'], ['test-viewer-2', 'opponent']] });
  assert.equal(ended.result, 'tie'); assert.equal(ended.championUntil, null);
  assert.equal(S.GB_TIE_OWNER_VERIFICATION_NEEDED.onTie, 'tie_no_badge');
  assert.ok(S.GB_BADGE_RESET_OWNER_VERIFICATION_NEEDED && S.GB_STREAMER_DEFINITION_OWNER_VERIFICATION_NEEDED);
});
test('page: streamer-vs-streamer, vote screen, gifts labeled not scoring, no scoring-weight copy', () => {
  const page = readFileSync(new URL('../src/pages/giftbattles.js', import.meta.url), 'utf8');
  assert.match(page, /Streamer vs streamer/); assert.match(page, /Viewers cannot be contestants/);
  assert.match(page, /gb-split/); assert.match(page, /24-hour champion badge/);
  assert.match(page, /data-gb-vote="challenger"/); assert.match(page, /gb-vote-tap/);
  assert.match(page, /does not score/); assert.match(page, /Audience votes decide the winner, not gifts/);
  assert.doesNotMatch(page, /scoring weights|Score = TEST gift points/i);
  assert.doesNotMatch(page, /viewer vs viewer|rest of (the calendar )?day|end of day|Demo battle sandbox|simulate opponent/i);
  assert.match(readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8'), /html body \.page \.btn\.gb-vote-tap\s*\{\s*min-height:\s*44px/);
});
test('rendered 44px vote taps at 360/390/430 are checked in CI', () => {
  const sc = readFileSync(new URL('../scripts/visual-review-battles-taps.mjs', import.meta.url), 'utf8');
  const wf = readFileSync(new URL('../.github/workflows/pikk-battles-visual.yml', import.meta.url), 'utf8');
  assert.match(sc, /getBoundingClientRect/); assert.match(sc, /\[360, 390, 430\]/); assert.match(sc, /h >= 44/); assert.match(sc, /eligible viewers voted/);
  assert.match(wf, /visual-review-battles-taps\.mjs/); assert.match(wf, /src\/pages\/giftbattles\.js/);
});
