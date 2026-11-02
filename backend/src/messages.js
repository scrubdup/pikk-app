import { ApiError, clientIp, readJson } from './http.js';
import { requireActive, requireAuth, requireVerified } from './auth.js';
import { assertNotBlocked } from './blocks.js';
import { requireString } from './validate.js';
import { rateLimit } from './ratelimit.js';
import { audit } from './audit.js';
import { newId } from './crypto.js';

const HANDLE = /^[a-zA-Z0-9_]{3,30}$/;

async function userByHandle(env, handle) {
  const user = await env.DB.prepare(
    `SELECT id, handle, display_name FROM users
      WHERE handle = ? AND disabled_at IS NULL AND banned_at IS NULL`
  ).bind(handle).first();
  if (!user) throw new ApiError(404, 'not_found', 'User not found');
  return user;
}

async function membership(env, conversationId, userId) {
  return env.DB.prepare(
    `SELECT conversation_id,user_id,joined_at,last_read_message_id
       FROM conversation_members
      WHERE conversation_id = ? AND user_id = ?`
  ).bind(conversationId, userId).first();
}

async function requireMembership(env, conversationId, userId) {
  const member = await membership(env, conversationId, userId);
  if (!member) throw new ApiError(404, 'not_found', 'Conversation not found');
  return member;
}

async function peerForConversation(env, conversationId, userId) {
  return env.DB.prepare(
    `SELECT u.id,u.handle,u.display_name
       FROM conversation_members cm
       JOIN users u ON u.id = cm.user_id
      WHERE cm.conversation_id = ? AND cm.user_id <> ?
      ORDER BY cm.joined_at LIMIT 1`
  ).bind(conversationId, userId).first();
}

export async function messagesRoute(env, req, ctx, method, path) {
  if (!path.startsWith('/messages/')) return null;

  if (method === 'POST' && path === '/messages/conversations') {
    const s = requireVerified(ctx);
    await rateLimit(env, `dm-new:${s.user.id}`, 20, 3600);
    const body = await readJson(req);
    const handle = requireString(body, 'handle', { min: 3, max: 30, pattern: HANDLE });
    const peer = await userByHandle(env, handle);
    if (peer.id === s.user.id) throw new ApiError(422, 'validation_failed', 'Cannot message yourself');
    await assertNotBlocked(env, s.user.id, peer.id);

    const existing = await env.DB.prepare(
      `SELECT c.id
         FROM conversations c
         JOIN conversation_members a ON a.conversation_id = c.id AND a.user_id = ?1
         JOIN conversation_members b ON b.conversation_id = c.id AND b.user_id = ?2
        WHERE (SELECT COUNT(*) FROM conversation_members z WHERE z.conversation_id = c.id) = 2
        ORDER BY c.created_at LIMIT 1`
    ).bind(s.user.id, peer.id).first();

    if (existing) {
      return { status: 200, body: { conversation: { id: existing.id, peer } } };
    }

    const id = newId('cnv');
    const now = new Date().toISOString();
    await env.DB.batch([
      env.DB.prepare(`INSERT INTO conversations(id,created_at) VALUES (?,?)`).bind(id, now),
      env.DB.prepare(`INSERT INTO conversation_members(conversation_id,user_id,joined_at) VALUES (?,?,?)`).bind(id, s.user.id, now),
      env.DB.prepare(`INSERT INTO conversation_members(conversation_id,user_id,joined_at) VALUES (?,?,?)`).bind(id, peer.id, now),
    ]);
    await audit(env, { actor: s.user.id, action: 'messages.conversation_created', target: id, ip: clientIp(req), meta: { peer_id: peer.id } });
    return { status: 201, body: { conversation: { id, peer, created_at: now } } };
  }

  if (method === 'GET' && path === '/messages/conversations') {
    const s = requireActive(ctx);
    const r = await env.DB.prepare(
      `SELECT c.id,c.created_at,
              p.id AS peer_id,p.handle AS peer_handle,p.display_name AS peer_display_name,
              (SELECT body FROM messages lm WHERE lm.conversation_id=c.id AND lm.deleted_at IS NULL ORDER BY lm.created_at DESC,lm.id DESC LIMIT 1) AS last_message,
              (SELECT created_at FROM messages lm WHERE lm.conversation_id=c.id AND lm.deleted_at IS NULL ORDER BY lm.created_at DESC,lm.id DESC LIMIT 1) AS last_message_at,
              (SELECT COUNT(*) FROM messages um
                WHERE um.conversation_id=c.id AND um.deleted_at IS NULL AND um.sender_id<>?1
                  AND um.created_at > COALESCE(
                    (SELECT created_at FROM messages rm WHERE rm.id=mine.last_read_message_id),
                    mine.joined_at
                  )
              ) AS unread_count
         FROM conversations c
         JOIN conversation_members mine ON mine.conversation_id=c.id AND mine.user_id=?1
         JOIN conversation_members other ON other.conversation_id=c.id AND other.user_id<>?1
         JOIN users p ON p.id=other.user_id
        WHERE (SELECT COUNT(*) FROM conversation_members z WHERE z.conversation_id=c.id)=2
          AND p.disabled_at IS NULL AND p.banned_at IS NULL
          AND NOT EXISTS (
            SELECT 1 FROM blocks b
             WHERE (b.blocker_id=?1 AND b.blocked_id=p.id) OR (b.blocker_id=p.id AND b.blocked_id=?1)
          )
        ORDER BY COALESCE(last_message_at,c.created_at) DESC
        LIMIT 100`
    ).bind(s.user.id).all();
    return { status: 200, body: { conversations: r.results } };
  }

  if (method === 'GET' && path === '/messages/unread-count') {
    const s = requireActive(ctx);
    const row = await env.DB.prepare(
      `SELECT COUNT(*) AS n
         FROM messages m
         JOIN conversation_members mine ON mine.conversation_id=m.conversation_id AND mine.user_id=?1
        WHERE m.deleted_at IS NULL AND m.sender_id<>?1
          AND m.created_at > COALESCE(
            (SELECT created_at FROM messages rm WHERE rm.id=mine.last_read_message_id),
            mine.joined_at
          )
          AND NOT EXISTS (
            SELECT 1
              FROM conversation_members other
              JOIN blocks b ON ((b.blocker_id=?1 AND b.blocked_id=other.user_id) OR (b.blocker_id=other.user_id AND b.blocked_id=?1))
             WHERE other.conversation_id=m.conversation_id AND other.user_id<>?1
          )`
    ).bind(s.user.id).first();
    return { status: 200, body: { unread: Number(row?.n || 0) } };
  }

  let match = path.match(/^\/messages\/conversations\/([\w-]{1,80})$/);
  if (method === 'GET' && match) {
    const s = requireAuth(ctx);
    const id = match[1];
    await requireMembership(env, id, s.user.id);
    const peer = await peerForConversation(env, id, s.user.id);
    if (peer) await assertNotBlocked(env, s.user.id, peer.id, { silent: true });
    const messages = await env.DB.prepare(
      `SELECT m.id,m.sender_id,m.body,m.created_at,u.handle AS sender_handle,u.display_name AS sender_display_name
         FROM messages m JOIN users u ON u.id=m.sender_id
        WHERE m.conversation_id=? AND m.deleted_at IS NULL
        ORDER BY m.created_at ASC,m.id ASC LIMIT 200`
    ).bind(id).all();
    return { status: 200, body: { conversation: { id, peer }, messages: messages.results } };
  }

  match = path.match(/^\/messages\/conversations\/([\w-]{1,80})\/messages$/);
  if (method === 'POST' && match) {
    const s = requireVerified(ctx);
    const id = match[1];
    await requireMembership(env, id, s.user.id);
    const peer = await peerForConversation(env, id, s.user.id);
    if (!peer) throw new ApiError(409, 'invalid_conversation', 'Conversation has no recipient');
    await assertNotBlocked(env, s.user.id, peer.id);
    await rateLimit(env, `dm-send:${s.user.id}`, 120, 3600);
    const body = await readJson(req);
    const text = requireString(body, 'message', { min: 1, max: 4000 });
    const messageId = newId('msg');
    const now = new Date().toISOString();
    await env.DB.prepare(
      `INSERT INTO messages(id,conversation_id,sender_id,body,created_at) VALUES (?,?,?,?,?)`
    ).bind(messageId, id, s.user.id, text, now).run();
    await audit(env, { actor: s.user.id, action: 'messages.sent', target: id, ip: clientIp(req) });
    return { status: 201, body: { message: { id: messageId, conversation_id: id, sender_id: s.user.id, body: text, created_at: now } } };
  }

  if (method === 'POST' && path.match(/^\/messages\/conversations\/([\w-]{1,80})\/read$/)) {
    const s = requireActive(ctx);
    const id = path.match(/^\/messages\/conversations\/([\w-]{1,80})\/read$/)[1];
    await requireMembership(env, id, s.user.id);
    const latest = await env.DB.prepare(
      `SELECT id FROM messages WHERE conversation_id=? AND deleted_at IS NULL ORDER BY created_at DESC,id DESC LIMIT 1`
    ).bind(id).first();
    await env.DB.prepare(
      `UPDATE conversation_members SET last_read_message_id=? WHERE conversation_id=? AND user_id=?`
    ).bind(latest?.id || null, id, s.user.id).run();
    return { status: 200, body: { ok: true, last_read_message_id: latest?.id || null } };
  }

  return null;
}
