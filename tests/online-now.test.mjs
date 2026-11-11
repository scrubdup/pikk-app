import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizePresenceSnapshot, renderMemberOnlineNow, renderAdminOnlineNow } from '../src/online-now.js';
test('never display fabricated live counts when server presence is unavailable', () => {
  assert.equal(normalizePresenceSnapshot(null), null);
  assert.equal(normalizePresenceSnapshot({ source: 'demo', onlineMembers: 99 }), null);
  assert.match(renderMemberOnlineNow(), /unavailable until secure presence tracking/);
  assert.match(renderAdminOnlineNow(), /No real-time presence backend/);
  assert.doesNotMatch(renderAdminOnlineNow(), />99</);
});
test('only accept valid authenticated server counters', () => {
  const data = normalizePresenceSnapshot({source:'authenticated-server',onlineMembers:42,onlineCreators:4,activeLivestreams:2,activeCities:3});
  assert.equal(data.onlineMembers,42);
  assert.match(renderAdminOnlineNow({source:'authenticated-server',onlineMembers:42,onlineCreators:4,activeLivestreams:2,activeCities:3}), />42</);
  assert.equal(normalizePresenceSnapshot({source:'authenticated-server',onlineMembers:-1}).onlineMembers,null);
});
