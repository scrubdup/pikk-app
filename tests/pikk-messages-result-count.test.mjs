import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { messageResultSummary } from '../src/message-search.js';

test('messages inbox count describes initial, filtered, singular and zero results', () => {
  assert.equal(messageResultSummary(5, 5), '5 conversations');
  assert.equal(messageResultSummary(2, 5, true), 'Showing 2 of 5 conversations');
  assert.equal(messageResultSummary(0, 1, true), 'Showing 0 of 1 conversation');
  assert.equal(messageResultSummary(1, 1), '1 conversation');
  assert.equal(messageResultSummary(0, 0), '0 conversations');
  assert.equal(messageResultSummary(10, 2, true), 'Showing 2 of 2 conversations');
});

test('messages view exposes live result count and updates it with the search/unread filters', () => {
  const source = readFileSync(new URL('../src/pages/messages.js', import.meta.url), 'utf8');
  assert.match(source, /id="pikkMsgResultCount"[^>]*role="status"[^>]*aria-live="polite"/);
  assert.match(source, /messageResultSummary\(threads\.length, threads\.length\)/);
  assert.match(source, /messageResultSummary\(shown, total, !!\(query \|\| unreadOnly\)\)/);
  assert.match(source, /inboxSearch\?\.addEventListener\('input', filterInbox\)/);
  assert.match(source, /#pikkMsgUnreadOnly'\)\?\.addEventListener\('change', filterInbox\)/);
});
