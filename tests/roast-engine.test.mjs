import test from 'node:test';
import assert from 'node:assert/strict';
import { createRoastInvite, respondRoastInvite, createRoastMatch, tickRoastMatch, castRoastVote, castRematchVote, sendRoastTestGift, recordRoastReport, ROAST_APPROVED_TIMINGS as TIMINGS, roastVoteTurnout, ROAST_APPROVED_RULES as RULES, startRematch, ROUND_SECONDS, VOTE_SECONDS, REMATCH_SECONDS } from '../src/roast-engine.js';
const advance = (m, n) => { for (let i = 0; i < n; i++) m = tickRoastMatch(m); return m; };
const V = ['v1', 'v2', 'v3'];
const accepted = () => respondRoastInvite(createRoastInvite({ inviterId: 'a', inviteeId: 'b', consentAccepted: true }), { accept: true, consentAccepted: true });
const newMatch = () => createRoastMatch(accepted(), { eligibleViewerIds: V });
const playRound = (m, votes) => { m = advance(m, ROUND_SECONDS); for (const [c, v] of votes) m = castRoastVote(m, c, v); return advance(m, VOTE_SECONDS); };

test('owner-approved timings: 60s rounds, 3 rounds, 10s vote, 5s rematch agree window', () => {
  assert.deepEqual({ ...TIMINGS }, { roundSeconds: 60, baseRounds: 3, voteSeconds: 10, rematchSeconds: 5 });
  assert.ok(Object.isFrozen(TIMINGS)); assert.equal(VOTE_SECONDS, 10); assert.equal(REMATCH_SECONDS, 5);
  assert.deepEqual({ ...RULES }, { tiebreakerRounds: 1, contestantsMayVote: false, rematchRequiresAllContestants: true });
  assert.ok(Object.isFrozen(TIMINGS) && Object.isFrozen(RULES));
});
test('invite requires challenger consent and mirrors backend fields', () => {
  assert.equal(createRoastInvite({ inviterId: 'a', inviteeId: 'b', consentAccepted: false }).error, 'consent_required');
  assert.equal(createRoastInvite({ inviterId: 'a', inviteeId: 'a', consentAccepted: true }).error, 'validation_failed');
  assert.equal(createRoastInvite({ inviterId: 'a', inviteeId: 'b', consentAccepted: true, blocked: true }).error, 'blocked');
  const inv = createRoastInvite({ inviterId: 'a', inviteeId: 'b', consentAccepted: true });
  assert.equal(inv.status, 'pending'); assert.equal(inv.mode, 'roast_1v1'); assert.ok(inv.inviter_consent_at); assert.equal(inv.invitee_consent_at, null); assert.equal(inv.testMode, true);
});
test('match cannot start without consent from both sides', () => {
  const inv = createRoastInvite({ inviterId: 'a', inviteeId: 'b', consentAccepted: true });
  assert.throws(() => createRoastMatch(inv), /consent_required/);
  assert.equal(respondRoastInvite(inv, { accept: true, consentAccepted: false }).error, 'consent_required');
  assert.throws(() => createRoastMatch({ ...inv, status: 'accepted' }), /consent_required/);
  const m = createRoastMatch(accepted(), { eligibleViewerIds: V });
  assert.equal(m.phase, 'round'); assert.equal(m.round, 1);
});
test('decline path ends the invite and blocks a match', () => {
  const inv = respondRoastInvite(createRoastInvite({ inviterId: 'a', inviteeId: 'b', consentAccepted: true }), { accept: false });
  assert.equal(inv.status, 'declined');
  assert.throws(() => createRoastMatch(inv), /consent_required/);
  assert.equal(respondRoastInvite(inv, { accept: true, consentAccepted: true }).error, 'not_found');
});
test('one vote per eligible viewer per round, by viewer id', () => {
  let m = advance(newMatch(), ROUND_SECONDS);
  assert.equal(m.phase, 'vote');
  m = castRoastVote(m, 0, 'v1'); m = castRoastVote(m, 1, 'v1'); m = castRoastVote(m, 0, 'v1');
  m = castRoastVote(m, 1, 'stranger'); m = castRoastVote(m, 1, 'a');
  assert.deepEqual(m.votes, [1, 0]);
  m = advance(m, VOTE_SECONDS);
  m = advance(m, ROUND_SECONDS);
  m = castRoastVote(m, 1, 'v1');
  assert.deepEqual(m.votes, [0, 1], 'same viewer may vote again in a new round');
});
test('votes outside the voting window are ignored', () => {
  const m = newMatch();
  assert.deepEqual(castRoastVote(m, 0, 'v1').votes, [0, 0]);
});
test('round progression: round -> vote -> next round', () => {
  let m = newMatch();
  m = advance(m, ROUND_SECONDS - 1); assert.equal(m.phase, 'round'); assert.equal(m.seconds, 1);
  m = advance(m, 1); assert.equal(m.phase, 'vote'); assert.equal(m.seconds, VOTE_SECONDS);
  m = advance(m, VOTE_SECONDS); assert.equal(m.phase, 'round'); assert.equal(m.round, 2);
});
test('gifts are tallied separately and never decide the winner', () => {
  let m = newMatch();
  for (let r = 0; r < 3; r++) {
    m = advance(m, ROUND_SECONDS);
    m = sendRoastTestGift(m, 1, 1000);
    m = castRoastVote(m, 0, 'v1');
    m = advance(m, VOTE_SECONDS);
  }
  assert.equal(m.result, 'winner'); assert.equal(m.winner, 0);
  assert.deepEqual(m.scores, [3, 0]); assert.deepEqual(m.gifts, [0, 3000]);
});
test('tied match plays one tiebreaker then decides winner', () => {
  let m = newMatch();
  m = playRound(m, [[0, 'v1']]); m = playRound(m, [[1, 'v1']]); m = playRound(m, []);
  assert.equal(m.phase, 'round'); assert.equal(m.tieBreaker, true); assert.equal(m.round, 4);
  m = playRound(m, [[1, 'v2'], [1, 'v3'], [0, 'v1']]);
  assert.equal(m.phase, 'rematch'); assert.equal(m.winner, 1); assert.equal(m.result, 'winner');
  m = castRematchVote(m, true, 'v1');
  assert.deepEqual(m.rematchAgreement, {}, 'viewers cannot vote on a rematch');
});
test('tiebreaker that also ties ends as a tie', () => {
  let m = newMatch();
  for (let i = 0; i < 4; i++) m = playRound(m, [[0, 'v1'], [1, 'v2']]);
  assert.equal(m.phase, 'finished'); assert.equal(m.result, 'tie'); assert.equal(m.winner, null);
});
test('report stub records locally', () => {
  const m = recordRoastReport(newMatch(), { reporterId: 'v1', targetId: 'a', reason: 'harassment' });
  assert.equal(m.reports.length, 1); assert.equal(m.reports[0].localOnly, true);
});

test('Roast matches are 1v1 only', () => {
  const m = newMatch();
  assert.equal(m.mode, 'roast_1v1'); assert.equal(m.teams, undefined);
});

const decided = () => { let m = newMatch(); for (let r = 0; r < 3; r++) m = playRound(m, [[0, 'v1']]); return m; };
test('rematch requires both 1v1 contestants to agree, then starts a fresh match', () => {
  const inv = accepted();
  let m = createRoastMatch(inv, { eligibleViewerIds: V });
  for (let r = 0; r < 3; r++) m = playRound(m, [[0, 'v1']]);
  assert.equal(m.phase, 'rematch');
  m = castRematchVote(m, true, 'a');
  assert.equal(m.phase, 'rematch'); assert.equal(m.rematch, null);
  assert.throws(() => startRematch(m, inv), /rematch_not_agreed/);
  m = castRematchVote(m, false, 'a'); assert.deepEqual(m.rematchAgreement, { a: true }, 'no changing answer');
  m = castRematchVote(m, true, 'b');
  assert.equal(m.rematch, 'agreed'); assert.equal(m.phase, 'finished');
  const r = startRematch(m, inv);
  assert.equal(r.phase, 'round'); assert.equal(r.round, 1); assert.deepEqual(r.scores, [0, 0]); assert.deepEqual(r.contestants, ['a', 'b']);
});
test('one contestant saying no declines the rematch', () => {
  let m = castRematchVote(decided(), true, 'a');
  m = castRematchVote(m, false, 'b');
  assert.equal(m.rematch, 'declined'); assert.equal(m.phase, 'finished');
});
test('rematch window closing without agreement expires', () => {
  let m = castRematchVote(decided(), true, 'a');
  m = advance(m, REMATCH_SECONDS);
  assert.equal(m.phase, 'finished'); assert.equal(m.rematch, 'expired');
});
test('vote turnout counts eligible room viewers minus contestants', () => {
  const m0 = createRoastMatch(accepted(), { eligibleViewerIds: ['v1', 'v2', 'v3', 'a', 'v1'] });
  assert.deepEqual(roastVoteTurnout(m0), { voted: 0, eligible: 3 }, 'contestant a and duplicate v1 removed');
  let m = advance(m0, ROUND_SECONDS);
  m = castRoastVote(m, 0, 'v1'); m = castRoastVote(m, 0, 'v1'); m = castRoastVote(m, 1, 'v3');
  assert.deepEqual(roastVoteTurnout(m), { voted: 2, eligible: 3 });
  m = advance(m, VOTE_SECONDS + ROUND_SECONDS);
  assert.deepEqual(roastVoteTurnout(m), { voted: 0, eligible: 3 }, 'resets each round');
});
test('engine reads ROAST_APPROVED_RULES: contestants cannot vote', () => {
  let m = advance(createRoastMatch(accepted(), { eligibleViewerIds: V }), ROUND_SECONDS);
  m = castRoastVote({ ...m, eligibleViewerIds: [...m.eligibleViewerIds, 'a'] }, 0, 'a');
  assert.deepEqual(m.votes, [0, 0], 'contestant rejected even if smuggled into the eligible list');
  let open = advance(createRoastMatch(accepted(), { eligibleViewerIds: [...V, 'a'], rules: { ...RULES, contestantsMayVote: true } }), ROUND_SECONDS);
  open = castRoastVote(open, 0, 'a');
  assert.deepEqual(open.votes, [1, 0], 'flipping the rule changes behavior, proving it is read');
});
test('engine reads ROAST_APPROVED_RULES: tiebreaker round count', () => {
  const tieAll = (m, n) => { for (let i = 0; i < n; i++) m = playRound(m, [[0, 'v1'], [1, 'v2']]); return m; };
  const one = tieAll(newMatch(), 4);
  assert.equal(one.result, 'tie'); assert.equal(one.tiebreakersPlayed, 1);
  const none = tieAll(createRoastMatch(accepted(), { eligibleViewerIds: V, rules: { ...RULES, tiebreakerRounds: 0 } }), 3);
  assert.equal(none.result, 'tie'); assert.equal(none.round, 3);
  let two = tieAll(createRoastMatch(accepted(), { eligibleViewerIds: V, rules: { ...RULES, tiebreakerRounds: 2 } }), 4);
  assert.equal(two.phase, 'round'); assert.equal(two.round, 5);
  two = tieAll(two, 1); assert.equal(two.result, 'tie'); assert.equal(two.tiebreakersPlayed, 2);
});
