import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  setState, getSpotlightState, removeFromSpotlightQueue,
  advanceSpotlight, advanceSpotlightHouseTrack, skipSpotlight, endSpotlightSet,
} from '../src/store.js';

// Node has no browser storage; store.save() uses this local demo persistence API.
globalThis.localStorage ??= {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

const stage = () => ({
  id: 'stage-one', userId: 'artist', username: 'Artist', type: 'song',
  title: 'Demo Song', playCount: 1, awaitingPlayAnother: false,
});
const queue = () => [{ id: 'queue-two', userId: 'another', username: 'Another', type: 'song', title: 'Next' }];
function reset(role = 'fan', id = 'viewer') {
  setState({
    user: { id, username: id, role },
    spotlight: { nowPlaying: stage(), queue: queue(), history: [], houseIndex: 0 },
  });
}

test('ordinary demo fan cannot remove, skip, rotate house or end another performer set', () => {
  reset();
  assert.equal(removeFromSpotlightQueue('queue-two').error, 'forbidden');
  assert.equal(skipSpotlight().error, 'forbidden');
  assert.equal(advanceSpotlight().error, 'forbidden');
  assert.equal(advanceSpotlight('max_streak').error, 'forbidden');
  assert.equal(advanceSpotlightHouseTrack().error, 'forbidden');
  assert.equal(endSpotlightSet().error, 'forbidden');
  const sp = getSpotlightState();
  assert.equal(sp.queue.length, 1);
  assert.equal(sp.nowPlaying.id, 'stage-one');
  assert.equal(sp.nowPlaying.awaitingPlayAnother, false);
});

test('performer keeps the ability to end their own upload set', () => {
  reset('fan', 'artist');
  const result = endSpotlightSet();
  assert.equal(result.ok, true);
  assert.equal(getSpotlightState().nowPlaying.awaitingPlayAnother, true);
});

test('demo admin retains queue moderation and skip controls', () => {
  reset('admin', 'mod');
  assert.equal(removeFromSpotlightQueue('queue-two').ok, true);
  assert.equal(getSpotlightState().queue.length, 0);
  assert.equal(skipSpotlight().ok, true);
  assert.equal(getSpotlightState().nowPlaying.house, true);
});

test('moderator UI is not exposed to ordinary signed-in users', () => {
  const src = readFileSync(new URL('../src/pages/spotlight.js', import.meta.url), 'utf8');
  assert.ok(src.includes('function canMod() {'));
  assert.ok(src.includes('return isAdmin();'));
  assert.doesNotMatch(src, /Demo moderator/);
  assert.match(src, /Cannot skip:/);
  assert.match(src, /Cannot remove:/);
});
