import { Hono } from 'hono'
import { requireAuth, requireAdmin } from '../lib/middleware'
import { chatCompletion, SUPPORT_SYSTEM_PROMPT, buildSupportReplyStub } from '../lib/ai'

/**
 * PIKK AI Support
 * - Full ticket + message threads
 * - Live AI when AI_API_KEY is set (OpenAI-compatible)
 * - Automatic stub reply when no key is configured
 * - Escalation to human when AI requests it or category is safety
 */

const support = new Hono()

support.use('*', requireAuth)

const CATEGORIES = ['account', 'billing', 'technical', 'safety', 'other']
const PRIORITIES = ['low', 'normal', 'high', 'urgent']

async function generateAiReply(
  env: any,
  ticket: { id: string; subject: string; category: string | null },
  history: { role: string; body: string }[]
): Promise<{ text: string; model: string; stub: boolean; escalate: boolean }> {
  const messages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
    { role: 'system', content: SUPPORT_SYSTEM_PROMPT },
    {
      role: 'system',
      content: `Ticket category: ${ticket.category || 'other'}. Subject: ${ticket.subject}. If this is a safety emergency or you cannot help, include the exact phrase ESCALATE_HUMAN in your reply.`,
    },
  ]

  for (const m of history.slice(-12)) {
    if (m.role === 'user') messages.push({ role: 'user', content: m.body })
    else if (m.role === 'ai' || m.role === 'assistant' || m.role === 'agent') {
      messages.push({ role: 'assistant', content: m.body })
    }
  }

  try {
    const result = await chatCompletion(env, messages)
    if (result.stub) {
      return {
        text: buildSupportReplyStub(ticket.subject, ticket.id.slice(0, 8)),
        model: 'stub',
        stub: true,
        escalate: ticket.category === 'safety',
      }
    }
    const escalate =
      result.text.includes('ESCALATE_HUMAN') ||
      ticket.category === 'safety'
    const text = result.text.replace(/ESCALATE_HUMAN/g, '').trim()
    return { text, model: result.model, stub: false, escalate }
  } catch (err) {
    console.error('AI reply failed', err)
    return {
      text: buildSupportReplyStub(ticket.subject, ticket.id.slice(0, 8)) +
        '\n\n(AI temporarily unavailable — your message was saved.)',
      model: 'error-fallback',
      stub: true,
      escalate: true,
    }
  }
}

/** Create a support ticket + first AI reply */
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
    let priority = PRIORITIES.includes(body.priority) ? body.priority : 'normal'
    if (category === 'safety') priority = 'urgent'

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

    const ai = await generateAiReply(
      c.env,
      { id: ticketId, subject, category },
      [{ role: 'user', body: message }]
    )

    const aiMsgId = crypto.randomUUID()
    await db.prepare(
      `INSERT INTO support_messages
       (id, ticket_id, sender_type, sender_id, body, meta, created_at)
       VALUES (?, ?, 'ai', NULL, ?, ?, ?)`
    ).bind(
      aiMsgId,
      ticketId,
      ai.text,
      JSON.stringify({ model: ai.model, stub: ai.stub, escalate: ai.escalate }),
      now
    ).run()

    if (ai.escalate) {
      await db.prepare(
        `UPDATE support_tickets SET assigned_to = 'human', priority = 'urgent', updated_at = ? WHERE id = ?`
      ).bind(now, ticketId).run()

      // Surface in Master Mind
      try {
        await db.prepare(
          `INSERT INTO incidents
           (id, source, severity, title, details, status, related_id, created_at, updated_at)
           VALUES (?, 'system', 'high', ?, ?, 'open', ?, ?, ?)`
        ).bind(
          crypto.randomUUID(),
          `Support escalation: ${subject.slice(0, 80)}`,
          message.slice(0, 500),
          ticketId,
          now,
          now
        ).run()
      } catch { /* incidents table may not exist in partial migrate */ }
    }

    return c.json({
      ticket: {
        id: ticketId,
        subject,
        status: 'open',
        priority: ai.escalate ? 'urgent' : priority,
        category,
        assignedTo: ai.escalate ? 'human' : 'bot',
        createdAt: now,
      },
      ai: {
        mode: ai.stub ? 'STUB' : 'LIVE',
        model: ai.model,
        escalated: ai.escalate,
      },
    }, 201)
  } catch (err) {
    console.error('create ticket error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

support.get('/tickets', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const limit = Math.min(Number(c.req.query('limit') || 20), 50)

    const rows = user.role === 'admin'
      ? await db.prepare(`SELECT * FROM support_tickets ORDER BY updated_at DESC LIMIT ?`).bind(limit).all()
      : await db.prepare(`SELECT * FROM support_tickets WHERE user_id = ? ORDER BY updated_at DESC LIMIT ?`).bind(user.id, limit).all()

    return c.json({
      tickets: rows.results || [],
      aiConfigured: !!c.env.AI_API_KEY,
    })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

support.get('/tickets/:id', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const id = c.req.param('id')

    const ticket = await db.prepare(`SELECT * FROM support_tickets WHERE id = ?`).bind(id).first()
    if (!ticket) return c.json({ error: 'not found' }, 404)
    if (ticket.user_id !== user.id && user.role !== 'admin') return c.json({ error: 'forbidden' }, 403)

    const messages = await db.prepare(
      `SELECT * FROM support_messages WHERE ticket_id = ? ORDER BY created_at ASC`
    ).bind(id).all()

    return c.json({ ticket, messages: messages.results || [], aiConfigured: !!c.env.AI_API_KEY })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

/** User or agent message; AI auto-replies when user writes and ticket is still bot-assigned */
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
    if (ticket.user_id !== user.id && user.role !== 'admin') return c.json({ error: 'forbidden' }, 403)

    const now = new Date().toISOString()
    const msgId = crypto.randomUUID()
    const senderType = user.role === 'admin' ? 'agent' : 'user'

    await db.prepare(
      `INSERT INTO support_messages
       (id, ticket_id, sender_type, sender_id, body, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(msgId, id, senderType, user.id, text, now).run()

    await db.prepare(
      `UPDATE support_tickets SET updated_at = ?, status = CASE WHEN status IN ('resolved','closed') THEN 'open' ELSE status END WHERE id = ?`
    ).bind(now, id).run()

    let aiReply: any = null

    // Auto AI reply only for end-user messages while assigned to bot
    if (senderType === 'user' && (ticket.assigned_to === 'bot' || !ticket.assigned_to)) {
      const prior = await db.prepare(
        `SELECT sender_type as role, body FROM support_messages WHERE ticket_id = ? ORDER BY created_at ASC`
      ).bind(id).all()

      const history = (prior.results || []).map((r: any) => ({
        role: r.role === 'user' ? 'user' : 'ai',
        body: r.body as string,
      }))

      const ai = await generateAiReply(
        c.env,
        {
          id: ticket.id as string,
          subject: ticket.subject as string,
          category: ticket.category as string,
        },
        history
      )

      const aiMsgId = crypto.randomUUID()
      await db.prepare(
        `INSERT INTO support_messages
         (id, ticket_id, sender_type, sender_id, body, meta, created_at)
         VALUES (?, ?, 'ai', NULL, ?, ?, ?)`
      ).bind(
        aiMsgId,
        id,
        ai.text,
        JSON.stringify({ model: ai.model, stub: ai.stub, escalate: ai.escalate }),
        now
      ).run()

      if (ai.escalate) {
        await db.prepare(
          `UPDATE support_tickets SET assigned_to = 'human', priority = 'urgent', updated_at = ? WHERE id = ?`
        ).bind(now, id).run()
      }

      aiReply = { mode: ai.stub ? 'STUB' : 'LIVE', model: ai.model, escalated: ai.escalate, messageId: aiMsgId }
    }

    return c.json({ messageId: msgId, createdAt: now, ai: aiReply }, 201)
  } catch (err) {
    console.error('support message error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

support.patch('/tickets/:id', requireAdmin, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const id = c.req.param('id')
    const body = await c.req.json().catch(() => ({}))

    const status = body.status
    const assignedTo = body.assignedTo
    const allowedStatus = ['open', 'pending', 'resolved', 'closed']
    const allowedAssign = ['bot', 'human']

    if (status && !allowedStatus.includes(status)) return c.json({ error: 'invalid status' }, 400)
    if (assignedTo && !allowedAssign.includes(assignedTo)) return c.json({ error: 'invalid assignedTo' }, 400)

    const now = new Date().toISOString()
    await db.prepare(
      `UPDATE support_tickets
       SET status = COALESCE(?, status),
           assigned_to = COALESCE(?, assigned_to),
           updated_at = ?,
           resolved_at = CASE WHEN ? IN ('resolved','closed') THEN ? ELSE resolved_at END
       WHERE id = ?`
    ).bind(
      status || null,
      assignedTo || null,
      now,
      status || '',
      now,
      id
    ).run()

    return c.json({ ok: true, id, status, assignedTo })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

/** AI status for ops */
support.get('/ai/status', requireAdmin, async (c) => {
  return c.json({
    configured: !!c.env.AI_API_KEY,
    baseUrl: c.env.AI_BASE_URL || 'https://api.openai.com/v1',
    model: c.env.AI_MODEL || 'gpt-4o-mini',
  })
})

export default support
