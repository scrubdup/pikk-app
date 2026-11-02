import test from 'node:test';
import assert from 'node:assert/strict';
import { createRoastInvite, respondRoastInvite, createRoastMatch, tickRoastMatch, castRoastVote, castRematchVote, sendRoastTestGift, recordRoastReport, ROAST_TEST_TIMINGS_OWNER_VERIFICATION_NEEDED as TIMINGS, ROUND_SECONDS, VOTE_SECONDS } from '../src/roast-engine.js';
const advance = (m, n) => { for (let i = 0; i < n; i++) m = tickRoastMatch(m); return m; };
const V = ['v1', 'v2', 'v3'];
const accepted = () => respondRoastInvite(createRoastInvite({ inviterId: 'a', inviteeId: 'b', consentAccepted: true }), { accept: true, consentAccepted: true });
const newMatch = () => createRoastMatch(accepted(), { eligibleViewerIds: V });
const playRound = (m, votes) => { m = advance(m, ROUND_SECONDS); for (const [c, v] of votes) m = castRoastVote(m, c, v); return advance(m, VOTE_SECONDS); };

test('timings live in one config constant with the existing unverified values', () => {
  assert.deepEqual({ ...TIMINGS }, { roundSeconds: 60, voteSeconds: 10, rematchSeconds: 10, baseRounds: 3 });
  assert.ok(Object.isFrozen(TIMINGS));
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
  m = castRematchVote(m, true, 'v1'); m = castRematchVote(m, true, 'v1');
  assert.deepEqual(m.rematchVotes, [1, 0]);
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
