import { Hono } from 'hono'
import { requireAuth, requireAdmin } from '../lib/middleware'

/**
 * PIKK AI Support – foundation
 * Creates tickets and message threads.
 * Real LLM replies are not connected; AI responses are clearly marked as stub.
 */

const support = new Hono()

support.use('*', requireAuth)

const CATEGORIES = ['account', 'billing', 'technical', 'safety', 'other']
const PRIORITIES = ['low', 'normal', 'high', 'urgent']

/** Create a support ticket */
support.post('/tickets', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const body = await c.req.json().catch(() => ({}))

    const subject = (body.subject || '').toString().trim().slice(0, 200)
    const message = (body.message || '').toString().trim()
    if (!subject || !message) return c.json({ error: 'subject and message required' }, 400)

    const category = CATEGORIES.includes(body.category) ? body.category : 'other'
    const priority = PRIORITIES.includes(body.priority) ? body.priority : 'normal'
    const now = new Date().toISOString()
    const ticketId = crypto.randomUUID()
    const msgId = crypto.randomUUID()

    await db.prepare(
      `INSERT INTO support_tickets
       (id, user_id, subject, status, priority, category, assigned_to, created_at, updated_at)
       VALUES (?, ?, ?, 'open', ?, ?, 'bot', ?, ?)`
    ).bind(ticketId, user.id, subject, priority, category, now, now).run()

    await db.prepare(
      `INSERT INTO support_messages
       (id, ticket_id, sender_type, sender_id, body, created_at)
       VALUES (?, ?, 'user', ?, ?, ?)`
    ).bind(msgId, ticketId, user.id, message, now).run()

    // Stub AI first response
    const aiMsgId = crypto.randomUUID()
    const aiBody = `Thanks for contacting PIKK Support. This is an automated acknowledgment (AI not fully connected yet). A human or full AI agent will follow up. Ticket: ${ticketId.slice(0, 8)}`

    await db.prepare(
      `INSERT INTO support_messages
       (id, ticket_id, sender_type, sender_id, body, meta, created_at)
       VALUES (?, ?, 'ai', NULL, ?, ?, ?)`
    ).bind(aiMsgId, ticketId, aiBody, JSON.stringify({ stub: true }), now).run()

    return c.json({
      ticket: {
        id: ticketId,
        subject,
        status: 'open',
        priority,
        category,
        assignedTo: 'bot',
        createdAt: now,
      },
      mode: 'STUB_AI',
    }, 201)
  } catch (err) {
    console.error('create ticket error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

/** List own tickets */
support.get('/tickets', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const limit = Math.min(Number(c.req.query('limit') || 20), 50)

    let rows
    if (user.role === 'admin') {
      rows = await db.prepare(
        `SELECT * FROM support_tickets ORDER BY updated_at DESC LIMIT ?`
      ).bind(limit).all()
    } else {
      rows = await db.prepare(
        `SELECT * FROM support_tickets WHERE user_id = ? ORDER BY updated_at DESC LIMIT ?`
      ).bind(user.id, limit).all()
    }

    return c.json({ tickets: rows.results || [] })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

/** Get ticket + messages */
support.get('/tickets/:id', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const id = c.req.param('id')

    const ticket = await db.prepare(`SELECT * FROM support_tickets WHERE id = ?`).bind(id).first()
    if (!ticket) return c.json({ error: 'not found' }, 404)
    if (ticket.user_id !== user.id && user.role !== 'admin') {
      return c.json({ error: 'forbidden' }, 403)
    }

    const messages = await db.prepare(
      `SELECT * FROM support_messages WHERE ticket_id = ? ORDER BY created_at ASC`
    ).bind(id).all()

    return c.json({ ticket, messages: messages.results || [] })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

/** Add message to ticket */
support.post('/tickets/:id/messages', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const id = c.req.param('id')
    const body = await c.req.json().catch(() => ({}))
    const text = (body.message || '').toString().trim()
    if (!text) return c.json({ error: 'message required' }, 400)

    const ticket = await db.prepare(`SELECT * FROM support_tickets WHERE id = ?`).bind(id).first()
    if (!ticket) return c.json({ error: 'not found' }, 404)
    if (ticket.user_id !== user.id && user.role !== 'admin') {
      return c.json({ error: 'forbidden' }, 403)
    }

    const now = new Date().toISOString()
    const msgId = crypto.randomUUID()
    const senderType = user.role === 'admin' ? 'agent' : 'user'

    await db.prepare(
      `INSERT INTO support_messages
       (id, ticket_id, sender_type, sender_id, body, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(msgId, id, senderType, user.id, text, now).run()

    await db.prepare(
      `UPDATE support_tickets SET updated_at = ?, status = CASE WHEN status = 'resolved' THEN 'open' ELSE status END WHERE id = ?`
    ).bind(now, id).run()

    return c.json({ messageId: msgId, createdAt: now }, 201)
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

/** Admin: update ticket status */
support.patch('/tickets/:id', requireAdmin, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const id = c.req.param('id')
    const body = await c.req.json().catch(() => ({}))
    const status = body.status
    const allowed = ['open', 'pending', 'resolved', 'closed']
    if (!allowed.includes(status)) return c.json({ error: 'invalid status' }, 400)

    const now = new Date().toISOString()
    await db.prepare(
      `UPDATE support_tickets
       SET status = ?, updated_at = ?,
           resolved_at = CASE WHEN ? IN ('resolved','closed') THEN ? ELSE resolved_at END
       WHERE id = ?`
    ).bind(status, now, status, now, id).run()

    return c.json({ ok: true, id, status })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

export default support
