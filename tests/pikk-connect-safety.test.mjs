import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { renderConnect } from '../src/pages/connect.js';
import { renderDating } from '../src/pages/dating.js';

const source = readFileSync(new URL('../src/pages/connect.js', import.meta.url), 'utf8');

test('random chat remains a clearly blocked preview without fake matching', () => {
  // The existing restream demo lazily persists defaults while rendering.
  // Supply a browser storage stub without touching real user data.
  const priorStorage = globalThis.localStorage;
  const entries = new Map();
  globalThis.localStorage = {
    getItem: (key) => entries.get(key) ?? null,
    setItem: (key, value) => entries.set(key, String(value)),
    removeItem: (key) => entries.delete(key),
  };
  let html;
  try {
    html = renderConnect();
  } finally {
    if (priorStorage === undefined) delete globalThis.localStorage;
    else globalThis.localStorage = priorStorage;
  }
  assert.match(html, /No matching service · TEST MODE/);
  assert.match(html, /Unavailable · review 18\+ &amp; rules/);
  assert.match(html, /No match was created, no camera was requested/);
  assert.match(html, /WebRTC \+ age assurance required before launch/);
  assert.doesNotMatch(html, /Waiting for match/);
  assert.doesNotMatch(html, /Find match/);
});

test('random chat click shows launch requirements, never fakes a partner or starts camera', () => {
  assert.match(source, /id="connect-start">View launch requirements/);
  assert.match(source, /blocked\?\.removeAttribute\('hidden'\)/);
  assert.doesNotMatch(source, /getUserMedia\s*\(/);
  assert.doesNotMatch(source, /new RTCPeerConnection\s*\(/);
  assert.doesNotMatch(source, /Matching…/);
  assert.doesNotMatch(source, /window\.setTimeout\s*\(/);
  for (const control of ['Next', 'End', 'Mute', 'Camera', 'Report', 'Block']) {
    assert.match(source, new RegExp('disabled aria-label="' + control + ' \\(disabled\\)"'));
  }
});

test('dating remains a separate, explicitly pre-launch opt-in experience', () => {
  const html = renderDating();
  assert.match(html, /No real matches are being created here/);
  assert.match(html, /verified adult eligibility/);
  assert.match(html, /Random Chat never automatically creates a dating match/);
});
