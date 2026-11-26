import { Hono } from 'hono'
import { requireAuth } from '../lib/middleware'
import { findTopic, LIVE_SECTIONS } from '../lib/live-categories'

/**
 * Group / topic rooms
 * Text mode is fully usable. Voice/video modes are reserved until media plane exists.
 */

const rooms = new Hono()

rooms.get('/categories', (c) => {
  return c.json({
    sections: LIVE_SECTIONS,
    totalTopics: LIVE_SECTIONS.reduce((n, s) => n + s.count, 0),
    modes: {
      text: 'available',
      voice: 'requires_media_worker',
      video: 'requires_media_worker',
    },
  })
})

rooms.get('/', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const limit = Math.min(Number(c.req.query('limit') || 30), 100)
    const topicId = c.req.query('topic')
    const status = c.req.query('status') || 'open'

    let query = `SELECT r.*, u.display_name as host_name FROM rooms r
                 LEFT JOIN users u ON u.id = r.host_id WHERE 1=1`
    const params: any[] = []
    if (status !== 'all') { query += ` AND r.status = ?`; params.push(status) }
    if (topicId) { query += ` AND r.topic_id = ?`; params.push(topicId) }
    query += ` ORDER BY r.updated_at DESC LIMIT ?`
    params.push(limit)

    const rows = await db.prepare(query).bind(...params).all()
    return c.json({ rooms: rows.results || [] })
  } catch (err) {
    return c.json({ rooms: [], error: String(err) })
  }
})

rooms.post('/', requireAuth, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const body = await c.req.json().catch(() => ({}))
    const topicId = (body.topicId || '').toString()
    const topic = findTopic(topicId)
    if (!topic) return c.json({ error: 'invalid topicId — use GET /rooms/categories' }, 400)

    const mode = (body.mode || 'text').toString()
    if (!['text', 'voice', 'video'].includes(mode)) return c.json({ error: 'invalid mode' }, 400)
    if (mode !== 'text') {
      return c.json({
        error: 'mode_not_available',
        message: `${mode} rooms need a media worker. Use mode=text for now.`,
        mode,
      }, 501)
    }

    const title = (body.title || topic.name).toString().slice(0, 120)
    const id = crypto.randomUUID()
    const now = new Date().toISOString()

    await db.prepare(
      `INSERT INTO rooms (id, topic_id, section, title, mode, status, host_id, participant_count, created_at, updated_at)
       VALUES (?, ?, ?, ?, 'text', 'open', ?, 1, ?, ?)`
    ).bind(id, topic.id, topic.section, title, user.id, now, now).run()

    await db.prepare(
      `INSERT INTO room_participants (room_id, user_id, role, joined_at) VALUES (?, ?, 'host', ?)`
    ).bind(id, user.id, now).run()

    return c.json({
      room: {
        id, topicId: topic.id, section: topic.section, title, mode: 'text',
        status: 'open', hostId: user.id, participantCount: 1,
      },
    }, 201)
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

rooms.get('/:id', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const row = await db.prepare(
      `SELECT r.*, u.display_name as host_name FROM rooms r
       LEFT JOIN users u ON u.id = r.host_id WHERE r.id = ?`
    ).bind(c.req.param('id')).first()
    if (!row) return c.json({ error: 'not found' }, 404)
    return c.json({ room: row })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

rooms.post('/:id/join', requireAuth, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const id = c.req.param('id')
    const room = await db.prepare(`SELECT * FROM rooms WHERE id = ?`).bind(id).first()
    if (!room || room.status === 'closed') return c.json({ error: 'room not available' }, 404)

    const now = new Date().toISOString()
    const existing = await db.prepare(
      `SELECT 1 FROM room_participants WHERE room_id = ? AND user_id = ?`
    ).bind(id, user.id).first()
    if (!existing) {
      await db.prepare(
        `INSERT INTO room_participants (room_id, user_id, role, joined_at) VALUES (?, ?, 'member', ?)`
      ).bind(id, user.id, now).run()
      await db.prepare(
        `UPDATE rooms SET participant_count = participant_count + 1, updated_at = ? WHERE id = ?`
      ).bind(now, id).run()
    }
    return c.json({ ok: true, roomId: id })
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

rooms.post('/:id/leave', requireAuth, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const id = c.req.param('id')
    const now = new Date().toISOString()
    const res = await db.prepare(
      `DELETE FROM room_participants WHERE room_id = ? AND user_id = ?`
    ).bind(id, user.id).run()
    if (res.meta.changes) {
      await db.prepare(
        `UPDATE rooms SET participant_count = MAX(participant_count - 1, 0), updated_at = ? WHERE id = ?`
      ).bind(now, id).run().catch(async () => {
        const row = await db.prepare(`SELECT participant_count FROM rooms WHERE id = ?`).bind(id).first()
        const next = Math.max(0, Number(row?.participant_count || 0) - 1)
        await db.prepare(`UPDATE rooms SET participant_count = ?, updated_at = ? WHERE id = ?`).bind(next, now, id).run()
      })
    }
    return c.json({ ok: true })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

rooms.get('/:id/messages', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const limit = Math.min(Number(c.req.query('limit') || 50), 100)
    const rows = await db.prepare(
      `SELECT m.id, m.body, m.created_at, m.user_id, u.display_name
       FROM room_messages m LEFT JOIN users u ON u.id = m.user_id
       WHERE m.room_id = ? ORDER BY m.created_at DESC LIMIT ?`
    ).bind(c.req.param('id'), limit).all()
    return c.json({
      messages: (rows.results || []).reverse().map((r: any) => ({
        id: r.id,
        body: r.body,
        createdAt: r.created_at,
        user: { id: r.user_id, displayName: r.display_name || 'User' },
      })),
    })
  } catch (err) {
    return c.json({ messages: [], error: String(err) })
  }
})

rooms.post('/:id/messages', requireAuth, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const id = c.req.param('id')
    const body = await c.req.json().catch(() => ({}))
    const text = (body.message || body.body || '').toString().trim().slice(0, 500)
    if (!text) return c.json({ error: 'message required' }, 400)

    const room = await db.prepare(`SELECT status FROM rooms WHERE id = ?`).bind(id).first()
    if (!room || room.status === 'closed') return c.json({ error: 'room closed' }, 404)

    // Auto-join on message
    const part = await db.prepare(
      `SELECT 1 FROM room_participants WHERE room_id = ? AND user_id = ?`
    ).bind(id, user.id).first()
    const now = new Date().toISOString()
    if (!part) {
      await db.prepare(
        `INSERT INTO room_participants (room_id, user_id, role, joined_at) VALUES (?, ?, 'member', ?)`
      ).bind(id, user.id, now).run()
      await db.prepare(
        `UPDATE rooms SET participant_count = participant_count + 1, updated_at = ? WHERE id = ?`
      ).bind(now, id).run()
    }

    const msgId = crypto.randomUUID()
    await db.prepare(
      `INSERT INTO room_messages (id, room_id, user_id, body, created_at) VALUES (?, ?, ?, ?, ?)`
    ).bind(msgId, id, user.id, text, now).run()
    await db.prepare(`UPDATE rooms SET updated_at = ? WHERE id = ?`).bind(now, id).run()

    return c.json({
      message: {
        id: msgId,
        body: text,
        createdAt: now,
        user: { id: user.id, displayName: user.displayName || 'User' },
      },
    }, 201)
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

rooms.post('/:id/close', requireAuth, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const id = c.req.param('id')
    const room = await db.prepare(`SELECT * FROM rooms WHERE id = ?`).bind(id).first()
    if (!room) return c.json({ error: 'not found' }, 404)
    if (room.host_id !== user.id && user.role !== 'admin') return c.json({ error: 'forbidden' }, 403)
    const now = new Date().toISOString()
    await db.prepare(
      `UPDATE rooms SET status = 'closed', closed_at = ?, updated_at = ? WHERE id = ?`
    ).bind(now, now, id).run()
    return c.json({ ok: true, status: 'closed' })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

export default rooms
