import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/player.js', import.meta.url), 'utf8');

function bodyBetween(startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  assert.notEqual(start, -1, 'missing ' + startMarker);
  const end = source.indexOf(endMarker, start + startMarker.length);
  assert.notEqual(end, -1, 'missing ' + endMarker);
  return source.slice(start, end);
}

test('music play rejects active video/live interruptions', () => {
  const play = bodyBetween('function playInternal() {', 'function pauseInternal(');
  assert.match(play, /if \(interrupts\.size > 0\)/);
  assert.match(play, /autoplay: interrupts\.size === 0 && playingDesired/);
});

test('interruptions preserve desired playback for later resume', () => {
  const pause = bodyBetween('export function pauseDbsPlayer(', 'export function resumeDbsPlayerIfAllowed(');
  assert.match(pause, /interrupts\.add\(reason\)/);
  assert.match(pause, /clearDesire: reason === 'user'/);
  const resume = bodyBetween('export function resumeDbsPlayerIfAllowed(', 'export function pauseGlobalMusic(');
  assert.match(resume, /interrupts\.size === 0 && userArmed && playingDesired/);
});

test('manual player controls cannot wipe video/live interruption reasons', () => {
  const play = bodyBetween('function playInternal() {', 'function pauseInternal(');
  assert.doesNotMatch(play, /interrupts\.clear\(\)/);
  const select = bodyBetween('function playTrackAt(', 'function ',);
  assert.doesNotMatch(select, /interrupts\.clear\(\)/);
});

test('delayed playlist autoplay rechecks interruption state at callback time', () => {
  const player = bodyBetween('function loadCurrentIntoPlayer(', 'function ');
  assert.match(player, /setTimeout\(\(\) => \{/);
  assert.match(player, /if \(interrupts\.size > 0 \|\| !userArmed \|\| !playingDesired\) return/);
  assert.match(player, /ytPlayer\?\.playVideo\?\.\(\)/);
});
