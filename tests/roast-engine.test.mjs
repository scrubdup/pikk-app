import test from 'node:test';
import assert from 'node:assert/strict';
import { createRoastMatch, tickRoastMatch, castRoastVote, castRematchVote, ROUND_SECONDS } from '../src/roast-engine.js';
const advance = (match, ticks) => { for (let i = 0; i < ticks; i++) match = tickRoastMatch(match); return match; };
test('automated round leads to voting then immediate next round', () => {
  let m = advance(createRoastMatch(), ROUND_SECONDS);
  assert.equal(m.phase, 'vote');
  m = castRoastVote(m, 0);
  m = advance(m, 10);
  assert.equal(m.phase, 'round');
  assert.equal(m.phase, 'round');
  assert.equal(m.round, 2);
  assert.equal(m.voted, false);
});
test('tied scheduled match triggers a final tiebreaker', () => {
  let m = createRoastMatch();
  for (let i = 0; i < 3; i++) {
    m = advance(m, ROUND_SECONDS);
    if (i < 2) m = castRoastVote(m, i);
    m = advance(m, 10);
    
  }
  assert.equal(m.phase, 'round');
  assert.equal(m.tieBreaker, true);
  assert.equal(m.round, 4);
  m = advance(m, ROUND_SECONDS);
  m = castRoastVote(m, 1);
  m = advance(m, 10);
  assert.equal(m.phase, 'rematch');
  assert.equal(m.winner, 1);
  m = castRematchVote(m, true);
  assert.deepEqual(m.rematchVotes, [1,0]);
  assert.deepEqual(m.gifts, [0,0]);
});
