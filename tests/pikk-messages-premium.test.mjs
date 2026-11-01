import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { TABBAR } from '../src/data.js';

const page = readFileSync(new URL('../src/pages/messages.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/messages-premium.css', import.meta.url), 'utf8');
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('premium Messages covers signed-out, new contact, team and thread states without false delivery claims', () => {
  for (const marker of ['PIKK messages sign-in','Start a PIKK conversation','DatBoiSkeet team inbox','Current PIKK conversation','pikk-msg-contact-grid','pikk-msg-flow-panel']) {
    assert.ok(page.includes(marker), marker);
  }
  assert.match(page, /Browser-local conversation preview/);
  assert.match(page, /No real delivery/);
  assert.match(page, /No server messaging/);
  assert.match(page, /Priority \$2\.99 TEST MODE/);
  assert.match(page, /No messages yet/);
});

test('Messages retains actual demo messaging and moderation stub controls', () => {
  for (const marker of ['sendMessage(', 'sendGroupMessage(', 'getOrCreateThread(', 'ensureDemoGroupThread(', 'markThreadRead(', 'setThreadFlags(', 'updateMessagePrefs(', 'msgSend', 'msgSendPriority', 'msgBackInbox', 'data-start-peer', 'data-flag']) {
    assert.ok(page.includes(marker), marker);
  }
  assert.match(page, /Reported · stub/);
});

test('Messages visual is isolated, responsive, keyboard accessible and preserves seven tabs/player', () => {
  for (const marker of ['.pikk-msg-flow-hero', '.pikk-msg-contact-grid', '.pikk-msg-flow-panel .msg-bubble.mine', ':focus-visible', '@media(max-width:650px)', '@media(prefers-reduced-motion:reduce)']) {
    assert.ok(css.includes(marker), marker);
  }
  assert.match(main, /import '\.\/messages-premium\.css';/);
  assert.match(main, /'\/messages': \{ render: renderMessages, bind: bindMessages \}/);
  assert.deepEqual(TABBAR.map(t => t.label), ['Music','Videos','Connect','Create','Dating','Games','Shop']);
  assert.match(html, /pikk-official-approved\.jpg/);
  assert.match(html, /dbs-sticky-player/);
});


test('Messages bulk mark-read action uses the real local read state and never fakes server delivery', () => {
  assert.match(page, /id="msgMarkAllRead"/);
  assert.match(page, /unreadThreads\.length \? '' : 'disabled'/);
  assert.match(page, /listThreads\(\)\.filter\(t => getThreadUnreadCount\(t\) > 0\)/);
  assert.match(page, /unread\.forEach\(t => markThreadRead\(t\.id\)\)/);
  assert.match(page, /refresh\('#\/messages'\)/);
  assert.match(page, /ensureDemoUnreadMessages\(\);[\s\S]*const view = route\?\.query/);
});

test('Messages clear filters resets both browser-local inbox filters and restores all conversations', () => {
  assert.match(page, /id="pikkMsgClearFilters"[^>]*hidden>Clear filters<\/button>/);
  assert.match(page, /clearFilters\.hidden = !query && !unreadOnly/);
  assert.match(page, /if \(search\) search\.value = ''/);
  assert.match(page, /if \(unread\) unread\.checked = false/);
  assert.match(page, /filterInbox\(\);\s*search\?\.focus\(\)/);
  assert.match(css, /#pikkMsgClearFilters\[hidden\]\{display:none!important\}/);
});

test('Escape clears only Messages inbox search and keeps the unread filter intact', () => {
  assert.match(page, /inboxSearch\?\.addEventListener\('keydown', event => \{/);
  assert.match(page, /event\.key !== 'Escape' \|\| !inboxSearch\.value/);
  assert.match(page, /event\.preventDefault\(\);\s*event\.stopPropagation\(\);\s*inboxSearch\.value = '';\s*filterInbox\(\);/);
  assert.match(page, /const unreadOnly = !!root\.querySelector\('#pikkMsgUnreadOnly'\)\?\.checked/);
  assert.match(page, /clearFilters\.hidden = !query && !unreadOnly/);
});
