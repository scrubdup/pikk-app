import test from 'node:test';
import assert from 'node:assert/strict';
import { createRoastInvite, respondRoastInvite, createRoastMatch, tickRoastMatch, castRoastVote, castRematchVote, startRematch, createTagTeamInvite, respondTagTeamInvite, ROAST_APPROVED_RULES as RULES, ROUND_SECONDS, VOTE_SECONDS, REMATCH_SECONDS } from '../src/roast-engine.js';
import { matchView } from '../src/pages/roast-arena.js';

const advance = (m, n) => { for (let i = 0; i < n; i++) m = tickRoastMatch(m); return m; };
const V = ['test-viewer-1', 'test-viewer-2', 'test-viewer-3'];
const oneVOne = () => respondRoastInvite(createRoastInvite({ inviterId: 'a', inviteeId: 'b', consentAccepted: true }), { accept: true, consentAccepted: true });
const tag = () => ['test-a2', 'test-b1', 'test-b2'].reduce((i, m) => respondTagTeamInvite(i, m, { accept: true, consentAccepted: true }),
  createTagTeamInvite({ teams: [['test-a1', 'test-a2'], ['test-b1', 'test-b2']], inviterId: 'test-a1', consentAccepted: true }));
const decided = (rules, inv = oneVOne()) => { let m = createRoastMatch(inv, { eligibleViewerIds: V, rules }); for (let r = 0; r < 3; r++) { m = advance(m, ROUND_SECONDS); m = castRoastVote(m, 0, 'test-viewer-1'); m = advance(m, VOTE_SECONDS); } return m; };

for (const [key, inv] of [['1v1', oneVOne], ['tag', tag]]) {
  test(`${key}: "X of Y eligible viewers voted" is visible during voting`, () => {
    let m = advance(createRoastMatch(inv(), { eligibleViewerIds: V }), ROUND_SECONDS);
    assert.equal(m.phase, 'vote');
    let html = matchView(key, { match: m, viewer: V[0] });
    assert.match(html, /data-roast-turnout/);
    assert.match(html, /0 of 3 eligible viewers voted/);
    m = castRoastVote(m, 1, V[0]);
    html = matchView(key, { match: m, viewer: V[1] });
    assert.match(html, /1 of 3 eligible viewers voted/);
    assert.doesNotMatch(matchView(key, { match: advance(m, VOTE_SECONDS), viewer: V[0] }), /data-roast-turnout/, 'only shown in the vote phase');
  });
  test(`${key}: UI shows approved 10s vote / 5s rematch with no test-value label on timings`, () => {
    const m = advance(createRoastMatch(inv(), { eligibleViewerIds: V }), ROUND_SECONDS);
    const html = matchView(key, { match: m, viewer: V[0] });
    assert.match(html, /vote window 10s\)/); assert.match(html, /decision window 5s, rematch rounds are also 60s/);
    assert.doesNotMatch(html, /vote window 10s <em>/); assert.doesNotMatch(html, /5s <em>/);
  });
}

test('vote countdown starts at 10s and rematch countdown at 5s; rematch rounds are 60s', () => {
  assert.equal(advance(createRoastMatch(oneVOne(), { eligibleViewerIds: V }), ROUND_SECONDS).seconds, 10);
  let m = decided(); assert.equal(m.phase, 'rematch'); assert.equal(m.seconds, 5); assert.equal(REMATCH_SECONDS, 5);
  assert.equal(advance(m, 5).rematch, 'expired');
  const inv = oneVOne();
  m = castRematchVote(castRematchVote(decided(undefined, inv), true, 'a'), true, 'b');
  assert.equal(startRematch(m, inv).seconds, 60);
});

test('engine reads ROAST_APPROVED_RULES.rematchRequiresAllContestants; flipping it changes behavior', () => {
  const strict = castRematchVote(decided(), true, 'a');
  assert.equal(strict.rematch, null); assert.equal(strict.phase, 'rematch');
  const loose = castRematchVote(decided({ ...RULES, rematchRequiresAllContestants: false }), true, 'a');
  assert.equal(loose.rematch, 'agreed'); assert.equal(loose.phase, 'finished');
});
