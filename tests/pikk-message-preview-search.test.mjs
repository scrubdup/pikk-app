import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { messageSearchText } from '../src/message-search.js';

const messagesPage = readFileSync(new URL('../src/pages/messages.js', import.meta.url), 'utf8');

test('Messages search matches participant names and the visible latest preview', () => {
  const thread = {
    peerId: 'user-14',
    peerName: 'Jordan',
    messages: [
      { text: 'An older secret conversation' },
      { text: 'See you at the community event' },
    ],
  };
  const text = messageSearchText(thread);
  assert.ok(text.includes('jordan'));
  assert.ok(text.includes('community event'));
  assert.ok(!text.includes('older secret'));
});

test('Messages search safely handles empty threads, missing names, and non-string previews', () => {
  assert.equal(messageSearchText({ peerId: 'dbs', messages: [] }), 'dbs ');
  assert.equal(messageSearchText({ peerName: 'Team', messages: [{ text: 42 }] }), 'team 42');
  assert.equal(messageSearchText(null), ' ');
});

test('Inbox binds browser-local preview search to the existing accessible filters', () => {
  assert.match(messagesPage, /import \{ messageSearchText \} from '\.\.\/message-search\.js';/);
  assert.match(messagesPage, /data-search="\$\{esc\(messageSearchText\(t\)\)\}"/);
  assert.match(messagesPage, /placeholder="Search names or latest messages\.\.\."/);
  assert.match(messagesPage, /row\.dataset\.search \|\| ''\)\.includes\(query\)/);
  assert.match(messagesPage, /id="pikkMsgNoResults"[^>]*role="status"/);
  assert.match(messagesPage, /TEST MODE · No server messaging/);
});
