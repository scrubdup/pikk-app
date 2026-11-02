import { describe, it, expect } from 'vitest';
import { call, newUser, freshIp } from './helpers.js';

async function start(a, handle) {
  return call('POST', '/messages/conversations', {
    cookie: a.cookie,
    ip: freshIp(),
    body: { handle },
  });
}

describe('persistent messages', () => {
  it('creates and reuses a two-person conversation', async () => {
    const a = await newUser();
    const b = await newUser();
    const first = await start(a, b.handle);
    expect(first.status).toBe(201);
    expect(first.json.conversation.peer.handle).toBe(b.handle);
    const again = await start(a, b.handle);
    expect(again.status).toBe(200);
    expect(again.json.conversation.id).toBe(first.json.conversation.id);
  });

  it('persists messages and exposes them only to conversation members', async () => {
    const a = await newUser();
    const b = await newUser();
    const outsider = await newUser();
    const convo = await start(a, b.handle);
    const id = convo.json.conversation.id;

    const sent = await call('POST', '/messages/conversations/' + id + '/messages', {
      cookie: a.cookie,
      ip: freshIp(),
      body: { message: 'Persistent private message from A.' },
    });
    expect(sent.status).toBe(201);

    const bView = await call('GET', '/messages/conversations/' + id, { cookie: b.cookie, ip: freshIp() });
    expect(bView.status).toBe(200);
    expect(bView.json.messages.some(m => m.body === 'Persistent private message from A.')).toBe(true);

    const outsiderView = await call('GET', '/messages/conversations/' + id, { cookie: outsider.cookie, ip: freshIp() });
    expect(outsiderView.status).toBe(404);

    const outsiderSend = await call('POST', '/messages/conversations/' + id + '/messages', {
      cookie: outsider.cookie,
      ip: freshIp(),
      body: { message: 'Should never enter this thread.' },
    });
    expect(outsiderSend.status).toBe(404);
  });

  it('lists conversations with latest-message preview and marks read', async () => {
    const a = await newUser();
    const b = await newUser();
    const convo = await start(a, b.handle);
    const id = convo.json.conversation.id;
    await call('POST', '/messages/conversations/' + id + '/messages', {
      cookie: b.cookie,
      ip: freshIp(),
      body: { message: 'Latest message preview.' },
    });

    const list = await call('GET', '/messages/conversations', { cookie: a.cookie, ip: freshIp() });
    expect(list.status).toBe(200);
    const row = list.json.conversations.find(c => c.id === id);
    expect(row).toBeTruthy();
    expect(row.peer_handle).toBe(b.handle);
    expect(row.last_message).toBe('Latest message preview.');

    const read = await call('POST', '/messages/conversations/' + id + '/read', {
      cookie: a.cookie,
      ip: freshIp(),
      body: {},
    });
    expect(read.status).toBe(200);
    expect(read.json.last_read_message_id).toBeTruthy();
  });

  it('enforces block relationships on conversation creation and sending', async () => {
    const a = await newUser();
    const b = await newUser();

    const convo = await start(a, b.handle);
    const id = convo.json.conversation.id;

    const blocked = await call('POST', '/blocks', {
      cookie: b.cookie,
      ip: freshIp(),
      body: { handle: a.handle },
    });
    expect(blocked.status).toBe(200);

    const newAttempt = await start(a, b.handle);
    expect(newAttempt.status).toBe(403);
    expect(newAttempt.json.error.code).toBe('blocked');

    const sendAttempt = await call('POST', '/messages/conversations/' + id + '/messages', {
      cookie: a.cookie,
      ip: freshIp(),
      body: { message: 'Blocked message must not send.' },
    });
    expect(sendAttempt.status).toBe(403);
    expect(sendAttempt.json.error.code).toBe('blocked');
  });

  it('requires verified email to start or send DMs', async () => {
    const unverified = await newUser({ verify: false });
    const b = await newUser();
    const r = await start(unverified, b.handle);
    expect(r.status).toBe(403);
    expect(r.json.error.code).toBe('email_unverified');
  });
});
