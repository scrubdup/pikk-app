import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { TABBAR } from '../src/data.js';
const messages = readFileSync(new URL('../src/pages/messages.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');

test('premium Messages keeps the existing messaging engine and explicit test-mode disclosures', () => {
  for (const token of ['sendMessage', 'sendGroupMessage', 'getThreadUnreadCount', 'markThreadRead',
    'setThreadFlags', 'updateMessagePrefs', 'Priority $2.99 TEST MODE', 'TEST MODE', 'msgOpenTeam']) {
    assert.ok(messages.includes(token), 'Missing existing feature: ' + token);
  }
});

test('inbox has functional search, quick chat, group and empty search results', () => {
  for (const token of ['pikk-messages-hero', 'pikkMsgSearch', 'pikk-msg-avatar', 'pikk-msg-thread-body',
    'pikkNewChatTop', 'pikkGroupTop', 'pikkMsgNoResults', 'data-open-thread', 'dataset.search']) {
    assert.ok(messages.includes(token), token);
  }
  assert.match(messages, /row\.hidden = !\(matchesSearch && matchesUnread\)/);
  assert.match(messages, /empty\.hidden = shown > 0/);
  assert.match(messages, /pikkMsgUnreadOnly/);
  assert.match(messages, /data-unread/);
  assert.match(messages, /row\.dataset\.unread === 'true'/);
  assert.match(messages, /No unread conversations/);
  assert.match(css, /\.pikk-msg-tools input\[type="checkbox"\]/);
  assert.match(css, /\.msg-inbox \.msg-thread-row\[hidden\]\{display:none!important\}/);
  assert.match(css, /\.pikk-msg-no-results\[hidden\]\{display:none!important\}/);
});

test('Messages visual update preserves owner-approved seven navigation tabs', () => {
  assert.deepEqual(TABBAR.map(x => x.href),
    ['#/music', '#/videos', '#/connect', '#/create', '#/dating', '#/games', '#/shop']);
});
