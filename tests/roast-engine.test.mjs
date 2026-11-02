import test from 'node:test';
import assert from 'node:assert/strict';
import { createRoastInvite, respondRoastInvite, createRoastMatch, tickRoastMatch, castRoastVote, castRematchVote, sendRoastTestGift, recordRoastReport, ROAST_APPROVED_TIMINGS as TIMINGS, ROAST_REMATCH_TEST_TIMING_OWNER_VERIFICATION_NEEDED as REMATCH, ROAST_APPROVED_RULES as RULES, startRematch, ROUND_SECONDS, VOTE_SECONDS } from '../src/roast-engine.js';
const advance = (m, n) => { for (let i = 0; i < n; i++) m = tickRoastMatch(m); return m; };
const V = ['v1', 'v2', 'v3'];
const accepted = () => respondRoastInvite(createRoastInvite({ inviterId: 'a', inviteeId: 'b', consentAccepted: true }), { accept: true, consentAccepted: true });
const newMatch = () => createRoastMatch(accepted(), { eligibleViewerIds: V });
const playRound = (m, votes) => { m = advance(m, ROUND_SECONDS); for (const [c, v] of votes) m = castRoastVote(m, c, v); return advance(m, VOTE_SECONDS); };

test('approved timings and rules are separate from the still-unverified rematch window', () => {
  assert.deepEqual({ ...TIMINGS }, { roundSeconds: 60, voteSeconds: 10, baseRounds: 3 });
  assert.deepEqual({ ...REMATCH }, { rematchSeconds: 10 });
  assert.deepEqual({ ...RULES }, { tiebreakerRounds: 1, contestantsMayVote: false, rematchRequiresAllContestants: true });
  assert.ok(Object.isFrozen(TIMINGS) && Object.isFrozen(REMATCH) && Object.isFrozen(RULES));
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

import { ROAST_TAG_TEAM_TEST_FORMAT_OWNER_VERIFICATION_NEEDED as TT, createTagTeamInvite, respondTagTeamInvite, tagTeamTurnOrder } from '../src/roast-engine.js';
const TEAMS = [['a1', 'a2'], ['b1', 'b2']];
const tagInvite = () => createTagTeamInvite({ teams: TEAMS, inviterId: 'a1', consentAccepted: true });
const allAccept = (inv) => ['a2', 'b1', 'b2'].reduce((i, m) => respondTagTeamInvite(i, m, { accept: true, consentAccepted: true }), inv);
const tagMatch = () => createRoastMatch(allAccept(tagInvite()), { eligibleViewerIds: [...V, 'a2'] });

test('tag-team format lives in one frozen config: 2v2, teams alternate', () => {
  assert.deepEqual({ ...TT }, { teamSize: 2, turnOrder: 'teams-alternate' });
  assert.ok(Object.isFrozen(TT));
});
test('tag-team invite validates teams and requires inviter consent', () => {
  assert.equal(createTagTeamInvite({ teams: TEAMS, inviterId: 'a1', consentAccepted: false }).error, 'consent_required');
  assert.equal(createTagTeamInvite({ teams: [['a1'], ['b1']], inviterId: 'a1', consentAccepted: true }).error, 'validation_failed');
  assert.equal(createTagTeamInvite({ teams: [['a1', 'a2'], ['a1', 'b2']], inviterId: 'a1', consentAccepted: true }).error, 'validation_failed');
  assert.equal(createTagTeamInvite({ teams: TEAMS, inviterId: 'zz', consentAccepted: true }).error, 'validation_failed');
  assert.equal(createTagTeamInvite({ teams: TEAMS, inviterId: 'a1', consentAccepted: true, blocked: true }).error, 'blocked');
  const inv = tagInvite();
  assert.equal(inv.mode, 'roast_tag_team'); assert.equal(inv.status, 'pending');
  assert.ok(inv.consents.a1); assert.equal(inv.consents.b2, null);
});
test('tag-team match needs consent from every member', () => {
  let inv = tagInvite();
  assert.equal(respondTagTeamInvite(inv, 'b1', { accept: true, consentAccepted: false }).error, 'consent_required');
  inv = respondTagTeamInvite(inv, 'a2', { accept: true, consentAccepted: true });
  inv = respondTagTeamInvite(inv, 'b1', { accept: true, consentAccepted: true });
  assert.equal(inv.status, 'pending');
  assert.throws(() => createRoastMatch(inv), /every team member/);
  assert.throws(() => createRoastMatch({ ...inv, status: 'accepted' }), /every team member/);
  inv = respondTagTeamInvite(inv, 'b2', { accept: true, consentAccepted: true });
  assert.equal(inv.status, 'accepted');
  assert.equal(createRoastMatch(inv).mode, 'roast_tag_team');
  assert.equal(respondTagTeamInvite(inv, 'zz', { accept: true, consentAccepted: true }).error, 'not_found');
});
test('any member declining cancels the tag-team invite', () => {
  const inv = respondTagTeamInvite(tagInvite(), 'b2', { accept: false });
  assert.equal(inv.status, 'declined'); assert.equal(inv.declined_by, 'b2');
  assert.throws(() => createRoastMatch(inv), /consent_required/);
});
test('tag-team turn order alternates teams', () => {
  assert.deepEqual(tagTeamTurnOrder(TEAMS).map((t) => t.memberId), ['a1', 'b1', 'a2', 'b2']);
  assert.deepEqual(tagMatch().turnOrder.map((t) => t.team), [0, 1, 0, 1]);
});
test('tag-team: one vote per viewer per round for a team; members cannot vote', () => {
  let m = advance(tagMatch(), ROUND_SECONDS);
  m = castRoastVote(m, 1, 'v1'); m = castRoastVote(m, 0, 'v1'); m = castRoastVote(m, 0, 'a2');
  assert.deepEqual(m.votes, [0, 1]);
  assert.ok(!m.eligibleViewerIds.includes('a2'));
});
test('tag-team: gifts separate, votes decide winner, ties resolve', () => {
  let m = tagMatch();
  for (let r = 0; r < 3; r++) { m = advance(m, ROUND_SECONDS); m = sendRoastTestGift(m, 0, 500); m = castRoastVote(m, 1, 'v1'); m = advance(m, VOTE_SECONDS); }
  assert.equal(m.winner, 1); assert.deepEqual(m.gifts, [1500, 0]);
  let t = tagMatch();
  for (let i = 0; i < 4; i++) t = playRound(t, [[0, 'v1'], [1, 'v2']]);
  assert.equal(t.result, 'tie');
});
test('1v1 still works alongside tag-team', () => {
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
  m = advance(m, REMATCH.rematchSeconds);
  assert.equal(m.phase, 'finished'); assert.equal(m.rematch, 'expired');
});
test('tag-team rematch requires every member', () => {
  const inv = allAccept(tagInvite());
  let m = createRoastMatch(inv, { eligibleViewerIds: V });
  for (let r = 0; r < 3; r++) m = playRound(m, [[1, 'v1']]);
  for (const c of ['a1', 'a2', 'b1']) m = castRematchVote(m, true, c);
  assert.equal(m.rematch, null); assert.equal(m.phase, 'rematch');
  m = castRematchVote(m, true, 'b2');
  assert.equal(m.rematch, 'agreed');
  assert.equal(startRematch(m, inv).mode, 'roast_tag_team');
  let d = createRoastMatch(inv, { eligibleViewerIds: V });
  for (let r = 0; r < 3; r++) d = playRound(d, [[1, 'v1']]);
  d = castRematchVote(d, false, 'a2');
  assert.equal(d.rematch, 'declined');
});
