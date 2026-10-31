import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('Dating random chat targets the existing Connect section', () => {
  assert.match(source('src/pages/dating.js'), /#\/connect#connect-random-chat/);
  assert.match(source('src/pages/connect.js'), /id="connect-random-chat"/);
});

test('Connect deep links use the router anchor with only approved targets', () => {
  const connect = source('src/pages/connect.js');
  assert.match(connect, /getRoute\(\)\.elementId/);
  assert.match(connect, /anchor === 'connect-random-chat' \|\| anchor === 'connect-multistream'/);
  assert.match(connect, /scrollIntoView/);
});

test('Connect does not claim real random video chat is launched', () => {
  const connect = source('src/pages/connect.js');
  assert.match(connect, /WebRTC \+ age assurance required before launch/);
  assert.match(connect, /TEST MODE/);
});

test('Connect Random Chat link stays on Connect route so its anchor can scroll', () => {
  const connect = source('src/pages/connect.js');
  assert.match(connect, /href="#\/connect#connect-random-chat"/);
  assert.doesNotMatch(connect, /href="#connect-random-chat"/);
});
