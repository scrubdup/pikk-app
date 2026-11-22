import { Hono } from 'hono'
import { requireAuth, requireAdmin } from '../lib/middleware'

const notifications = new Hono()

notifications.use('*', requireAuth)

notifications.get('/', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const limit = Math.min(Number(c.req.query('limit') || 30), 100)
    const unreadOnly = c.req.query('unread') === '1'

    let query = `SELECT * FROM notifications WHERE user_id = ?`
    const params: any[] = [user.id]
    if (unreadOnly) query += ` AND read_at IS NULL`
    query += ` ORDER BY created_at DESC LIMIT ?`
    params.push(limit)

    const rows = await db.prepare(query).bind(...params).all()
    const unread = await db.prepare(
      `SELECT COUNT(*) as c FROM notifications WHERE user_id = ? AND read_at IS NULL`
    ).bind(user.id).first()

    return c.json({
      notifications: rows.results || [],
      unreadCount: unread?.c ?? 0,
    })
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

notifications.post('/read', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const body = await c.req.json().catch(() => ({}))
    const now = new Date().toISOString()

    if (body.all) {
      await db.prepare(
        `UPDATE notifications SET read_at = ? WHERE user_id = ? AND read_at IS NULL`
      ).bind(now, user.id).run()
      return c.json({ ok: true, all: true })
    }

    const ids = Array.isArray(body.ids) ? body.ids : []
    if (!ids.length) return c.json({ error: 'ids or all required' }, 400)

    for (const id of ids.slice(0, 50)) {
      await db.prepare(
        `UPDATE notifications SET read_at = ? WHERE id = ? AND user_id = ?`
      ).bind(now, id, user.id).run()
    }
    return c.json({ ok: true, count: ids.length })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

/** Admin / system: create notification for a user */
notifications.post('/', requireAdmin, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const body = await c.req.json().catch(() => ({}))
    const userId = Number(body.userId)
    const title = (body.title || '').toString().trim()
    if (!userId || !title) return c.json({ error: 'userId and title required' }, 400)

    const id = crypto.randomUUID()
    const now = new Date().toISOString()
    await db.prepare(
      `INSERT INTO notifications (id, user_id, type, title, body, href, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      id,
      userId,
      body.type || 'system',
      title,
      body.body || null,
      body.href || null,
      now
    ).run()

    return c.json({ id, createdAt: now }, 201)
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

export default notifications
