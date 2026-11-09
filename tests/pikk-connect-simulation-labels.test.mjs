import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const connect = readFileSync(new URL('../src/pages/connect.js', import.meta.url), 'utf8');

test('multi-platform controls identify mock account selections honestly', () => {
  assert.match(connect, /Demo selected/);
  assert.match(connect, /Not selected/);
  assert.match(connect, />Add demo<\/button>/);
  assert.match(connect, />Remove demo<\/button>/);
  assert.match(connect, /No accounts are linked, no real broadcast is sent/);
  assert.doesNotMatch(connect, /<span class="chip">Linked/);
  assert.doesNotMatch(connect, />Link<\/button>/);
});

test('mock live sessions are not described as real broadcasts', () => {
  assert.match(connect, />Simulate multi-platform live<\/button>/);
  assert.match(connect, />End simulation<\/button>/);
  assert.match(connect, /SIMULATED ·/);
  assert.match(connect, /Simulation started · no live broadcast sent/);
  assert.doesNotMatch(connect, />Go live to selected<\/button>/);
  assert.doesNotMatch(connect, /<span class="chip">LIVE ·/);
});

test('Connect retains opt-in and disabled WebRTC safety controls', () => {
  assert.match(connect, /ageConfirmed && p\.rulesAccepted/);
  assert.match(connect, /BLOCK_MSG/);
  assert.match(connect, /aria-label="Report \(disabled\)"/);
  assert.match(connect, /aria-label="Block \(disabled\)"/);
  assert.doesNotMatch(connect, /getUserMedia\s*\(/);
  assert.match(connect, /renderMultiPlatform\(\)/);
  assert.match(connect, /href="#\/dating"/);
});
