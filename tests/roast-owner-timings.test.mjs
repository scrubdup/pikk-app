import test from 'node:test';
import assert from 'node:assert/strict';
import { createRoastInvite, respondRoastInvite, createRoastMatch, tickRoastMatch, castRoastVote, castRematchVote, startRematch, ROAST_APPROVED_RULES as RULES, ROUND_SECONDS, VOTE_SECONDS, REMATCH_SECONDS } from '../src/roast-engine.js';
import { matchView } from '../src/pages/roast-arena.js';

const advance = (m, n) => { for (let i = 0; i < n; i++) m = tickRoastMatch(m); return m; };
const V = ['test-viewer-1', 'test-viewer-2', 'test-viewer-3'];
const oneVOne = () => respondRoastInvite(createRoastInvite({ inviterId: 'a', inviteeId: 'b', consentAccepted: true }), { accept: true, consentAccepted: true });
const decided = (rules, inv = oneVOne()) => { let m = createRoastMatch(inv, { eligibleViewerIds: V, rules }); for (let r = 0; r < 3; r++) { m = advance(m, ROUND_SECONDS); m = castRoastVote(m, 0, 'test-viewer-1'); m = advance(m, VOTE_SECONDS); } return m; };

for (const [key, inv] of [['1v1', oneVOne]]) {
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

// Owner ruling t447u: vote screen shows round number + both names, tap a name to vote, tiebreaker says "Tie Breaker".
const NAMES = { '1v1': ['Challenger (test)', 'Opponent (test)'] };
const tieTo = (m, rounds) => { for (let r = 0; r < rounds; r++) { m = advance(m, ROUND_SECONDS); m = advance(m, VOTE_SECONDS); } return m; };
for (const [key, inv] of [['1v1', oneVOne]]) {
  test(`${key}: vote screen shows round number, both names as tap-to-vote buttons, 10s window`, () => {
    const m = advance(advance(createRoastMatch(inv(), { eligibleViewerIds: V }), ROUND_SECONDS), 0);
    const m2 = advance(tieTo(createRoastMatch(inv(), { eligibleViewerIds: V }), 1), ROUND_SECONDS);
    assert.equal(m.seconds, 10);
    const html = matchView(key, { match: m2, viewer: V[0] });
    assert.match(html, /<strong data-roast-vote-round>Round 2<\/strong>/);
    for (const [i, n] of NAMES[key].entries()) assert.match(html, new RegExp(`data-roast-vote="${i}"[^>]*>${n.replace(/[()]/g, '\\$&')}</button>`));
    assert.match(html, /Tap a name to vote/);
    assert.doesNotMatch(html, /Tie Breaker/);
    const voted = castRoastVote(m2, 1, V[0]); assert.deepEqual(voted.votes, [0, 1], 'tapping a name records the vote');
  });
  test(`${key}: tiebreaker round is labeled "Tie Breaker" instead of a round number`, () => {
    let m = tieTo(createRoastMatch(inv(), { eligibleViewerIds: V }), 3);
    assert.equal(m.tieBreaker, true);
    assert.match(matchView(key, { match: m, viewer: V[0] }), /Tie Breaker · <span data-roast-clock>/);
    m = advance(m, ROUND_SECONDS);
    const html = matchView(key, { match: m, viewer: V[0] });
    assert.match(html, /<strong data-roast-vote-round>Tie Breaker<\/strong>/);
    assert.doesNotMatch(html, /Round 4/);
  });
}
test('rematch needs BOTH contestants within the 5s window; one yes then timeout expires', () => {
  let m = castRematchVote(decided(), true, 'a');
  assert.equal(m.rematch, null);
  m = advance(m, 4); assert.equal(m.phase, 'rematch');
  assert.equal(castRematchVote(m, true, 'b').rematch, 'agreed');
  assert.equal(advance(m, 1).rematch, 'expired');
});

import { readFileSync } from 'node:fs';
test('Roast tap targets: vote and rematch buttons carry roast-tap, CSS beats .page .btn, rendered check wired into CI', () => {
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  assert.match(css, /html body \.page \.btn\.roast-tap\s*\{\s*min-height:\s*44px;/);
  let m = advance(createRoastMatch(oneVOne(), { eligibleViewerIds: V }), ROUND_SECONDS);
  assert.equal((matchView('1v1', { match: m, viewer: V[0] }).match(/class="btn primary roast-tap" data-roast-vote=/g) || []).length, 2);
  assert.equal((matchView('1v1', { match: decided(), viewer: V[0] }).match(/class="btn roast-tap" data-roast-rematch=/g) || []).length, 4);
  const wf = readFileSync(new URL('../.github/workflows/pikk-roast-visual.yml', import.meta.url), 'utf8');
  assert.match(wf, /visual-review-roast-taps\.mjs/);
  const script = readFileSync(new URL('../scripts/visual-review-roast-taps.mjs', import.meta.url), 'utf8');
  assert.match(script, /getBoundingClientRect/); assert.match(script, /\[360, 390, 430\]/); assert.match(script, /\['1v1'\]/);
});
test('no stale test-value label on the vote window in the Roast page', () => {
  const src = readFileSync(new URL('../src/pages/roast-arena.js', import.meta.url), 'utf8');
  assert.doesNotMatch(src, /seconds · test value/); assert.doesNotMatch(src, /10 seconds/);
});
