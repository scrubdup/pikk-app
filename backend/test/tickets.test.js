import { describe, it, expect } from 'vitest';
import { call, newUser, staff, freshIp } from './helpers.js';

describe('support tickets', () => {
  it('creates a persistent ticket and lists it for the owner', async () => {
    const u = await newUser();
    const created = await call('POST', '/support/tickets', {
      cookie: u.cookie,
      ip: freshIp(),
      body: { category: 'technical', subject: 'App login problem', message: 'The app keeps showing an error when I open my account.' },
    });
    expect(created.status).toBe(201);
    expect(created.json.ticket.status).toBe('open');
    expect(created.json.ticket.category).toBe('technical');

    const list = await call('GET', '/support/tickets', { cookie: u.cookie, ip: freshIp() });
    expect(list.status).toBe(200);
    expect(list.json.tickets.some(t => t.id === created.json.ticket.id)).toBe(true);

    const detail = await call('GET', '/support/tickets/' + created.json.ticket.id, { cookie: u.cookie, ip: freshIp() });
    expect(detail.status).toBe(200);
    expect(detail.json.messages).toHaveLength(1);
    expect(detail.json.messages[0].is_staff).toBe(0);
  });

  it('keeps tickets private but exposes them to support staff', async () => {
    const owner = await newUser();
    const other = await newUser();
    const agent = await staff('support_agent');

    const created = await call('POST', '/support/tickets', {
      cookie: owner.cookie,
      ip: freshIp(),
      body: { category: 'account', subject: 'Account access help', message: 'I need help understanding access to my account settings.' },
    });
    const id = created.json.ticket.id;

    expect((await call('GET', '/support/tickets/' + id, { cookie: other.cookie, ip: freshIp() })).status).toBe(403);

    const queue = await call('GET', '/support/staff/tickets', { cookie: agent.cookie, ip: freshIp() });
    expect(queue.status).toBe(200);
    expect(queue.json.tickets.some(t => t.id === id && t.handle === owner.handle)).toBe(true);

    const staffDetail = await call('GET', '/support/tickets/' + id, { cookie: agent.cookie, ip: freshIp() });
    expect(staffDetail.status).toBe(200);
  });

  it('supports real staff and user replies with status handoff', async () => {
    const owner = await newUser();
    const agent = await staff('support_agent');
    const created = await call('POST', '/support/tickets', {
      cookie: owner.cookie,
      ip: freshIp(),
      body: { category: 'payments', subject: 'Purchase question', message: 'I have a question about a purchase shown in my account.' },
    });
    const id = created.json.ticket.id;

    const staffReply = await call('POST', '/support/tickets/' + id + '/messages', {
      cookie: agent.cookie,
      ip: freshIp(),
      body: { message: 'Support is reviewing this. Can you confirm the date of the purchase?' },
    });
    expect(staffReply.status).toBe(201);
    expect(staffReply.json.message.is_staff).toBe(true);

    let detail = await call('GET', '/support/tickets/' + id, { cookie: owner.cookie, ip: freshIp() });
    expect(detail.json.ticket.status).toBe('pending_user');
    expect(detail.json.messages).toHaveLength(2);

    const ownerReply = await call('POST', '/support/tickets/' + id + '/messages', {
      cookie: owner.cookie,
      ip: freshIp(),
      body: { message: 'It was shown yesterday evening.' },
    });
    expect(ownerReply.status).toBe(201);
    expect(ownerReply.json.message.is_staff).toBe(false);

    detail = await call('GET', '/support/tickets/' + id, { cookie: owner.cookie, ip: freshIp() });
    expect(detail.json.ticket.status).toBe('open');
    expect(detail.json.messages).toHaveLength(3);
  });

  it('requires authentication and validates ticket categories', async () => {
    const unauth = await call('POST', '/support/tickets', {
      ip: freshIp(),
      body: { category: 'technical', subject: 'Cannot submit', message: 'This should require a signed-in account.' },
    });
    expect(unauth.status).toBe(401);

    const u = await newUser();
    const invalid = await call('POST', '/support/tickets', {
      cookie: u.cookie,
      ip: freshIp(),
      body: { category: 'not-real', subject: 'Invalid category', message: 'This should be rejected by validation.' },
    });
    expect(invalid.status).toBe(422);
  });
});
