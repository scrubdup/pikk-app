import { ApiError, clientIp } from './http.js';
import { requirePermission, can } from './permissions.js';
import { requireString } from './validate.js';
import { newId } from './crypto.js';
import { audit } from './audit.js';

const CATEGORIES = new Set(['account','payments','safety','technical','other']);

function categoryOf(body) {
  const v = String(body?.category || '').trim();
  if (!CATEGORIES.has(v)) throw new ApiError(422, 'validation_failed', 'Invalid input', { category: 'account, payments, safety, technical or other' });
  return v;
}

export async function supportRoute(env, req, ctx, method, path) {
  if (!path.startsWith('/support/')) return null;
  const session = ctx.session;

  if (method === 'POST' && path === '/support/tickets') {
    const s = requirePermission(ctx, 'tickets.create');
    const body = await req.json();
    const category = categoryOf(body);
    const subject = requireString(body, 'subject', { min: 4, max: 200 });
    const message = requireString(body, 'message', { min: 10, max: 5000 });
    const now = new Date().toISOString();
    const ticketId = newId('tkt');
    const messageId = newId('tmsg');
    await env.DB.batch([
      env.DB.prepare(`INSERT INTO tickets(id,user_id,category,subject,status,created_at) VALUES (?,?,?,?, 'open', ?)`)
        .bind(ticketId, s.user.id, category, subject, now),
      env.DB.prepare(`INSERT INTO ticket_messages(id,ticket_id,author_id,is_staff,body,created_at) VALUES (?,?,?,?,?,?)`)
        .bind(messageId, ticketId, s.user.id, 0, message, now),
    ]);
    await audit(env, { actor: s.user.id, action: 'support.ticket_created', target: ticketId, ip: clientIp(req), meta: { category } });
    return { status: 201, body: { ticket: { id: ticketId, category, subject, status: 'open', created_at: now } } };
  }

  if (method === 'GET' && path === '/support/tickets') {
    const s = requirePermission(ctx, 'tickets.create');
    const r = await env.DB.prepare(
      `SELECT id, category, subject, status, created_at FROM tickets WHERE user_id = ? ORDER BY created_at DESC LIMIT 100`
    ).bind(s.user.id).all();
    return { status: 200, body: { tickets: r.results } };
  }

  if (method === 'GET' && path === '/support/staff/tickets') {
    requirePermission(ctx, 'tickets.view');
    const r = await env.DB.prepare(
      `SELECT t.id, t.user_id, u.handle, c.email, t.category, t.subject, t.status, t.created_at
         FROM tickets t
         JOIN users u ON u.id = t.user_id
         JOIN credentials c ON c.user_id = t.user_id
        ORDER BY CASE t.status WHEN 'open' THEN 0 WHEN 'pending_user' THEN 1 ELSE 2 END, t.created_at ASC
        LIMIT 200`
    ).all();
    return { status: 200, body: { tickets: r.results } };
  }

  let m = path.match(/^\/support\/tickets\/([\w-]{1,80})$/);
  if (method === 'GET' && m) {
    if (!session) throw new ApiError(401, 'unauthenticated', 'Sign in required');
    const ticket = await env.DB.prepare(
      `SELECT id,user_id,category,subject,status,created_at FROM tickets WHERE id = ?`
    ).bind(m[1]).first();
    if (!ticket) throw new ApiError(404, 'not_found', 'Ticket not found');
    const staff = can(session, 'tickets.view');
    if (ticket.user_id !== session.user.id && !staff) throw new ApiError(403, 'forbidden', 'Ticket access denied');
    const messages = await env.DB.prepare(
      `SELECT tm.id, tm.author_id, tm.is_staff, tm.body, tm.created_at, u.handle
         FROM ticket_messages tm JOIN users u ON u.id = tm.author_id
        WHERE tm.ticket_id = ? ORDER BY tm.created_at, tm.id`
    ).bind(ticket.id).all();
    const { user_id, ...publicTicket } = ticket;
    return { status: 200, body: { ticket: publicTicket, messages: messages.results } };
  }

  m = path.match(/^\/support\/tickets\/([\w-]{1,80})\/messages$/);
  if (method === 'POST' && m) {
    if (!session) throw new ApiError(401, 'unauthenticated', 'Sign in required');
    const ticket = await env.DB.prepare(`SELECT id,user_id,status FROM tickets WHERE id = ?`).bind(m[1]).first();
    if (!ticket) throw new ApiError(404, 'not_found', 'Ticket not found');
    const staff = can(session, 'tickets.reply');
    if (ticket.user_id !== session.user.id && !staff) throw new ApiError(403, 'forbidden', 'Ticket access denied');
    if (ticket.status === 'closed' && !staff) throw new ApiError(409, 'ticket_closed', 'Ticket is closed');
    const body = await req.json();
    const message = requireString(body, 'message', { min: 1, max: 5000 });
    const now = new Date().toISOString();
    const id = newId('tmsg');
    await env.DB.prepare(
      `INSERT INTO ticket_messages(id,ticket_id,author_id,is_staff,body,created_at) VALUES (?,?,?,?,?,?)`
    ).bind(id, ticket.id, session.user.id, staff ? 1 : 0, message, now).run();
    if (staff && ticket.status === 'open') {
      await env.DB.prepare(`UPDATE tickets SET status = 'pending_user' WHERE id = ?`).bind(ticket.id).run();
    } else if (!staff && ticket.status === 'pending_user') {
      await env.DB.prepare(`UPDATE tickets SET status = 'open' WHERE id = ?`).bind(ticket.id).run();
    }
    await audit(env, { actor: session.user.id, action: 'support.ticket_message', target: ticket.id, ip: clientIp(req), meta: { staff } });
    return { status: 201, body: { message: { id, ticket_id: ticket.id, is_staff: staff, body: message, created_at: now } } };
  }

  return null;
}
