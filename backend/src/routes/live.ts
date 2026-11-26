import { Hono } from 'hono'
import { requireAuth } from '../lib/middleware'
import { LIVE_SECTIONS, LIVE_TOPIC_COUNT, LIVE_TOPICS } from '../lib/live-categories'

const live = new Hono()

/** Full 78-topic directory for Go Live + discovery UI */
live.get('/categories', (c) => {
  return c.json({
    sections: LIVE_SECTIONS,
    totalTopics: LIVE_TOPIC_COUNT,
    expected: 78,
    complete: LIVE_TOPIC_COUNT === 78,
    note: 'General Live (17) for broadcast categories; other sections for group rooms.',
  })
})

live.get('/topics', (c) => {
  const section = c.req.query('section')
  const topics = section ? LIVE_TOPICS.filter((t) => t.section === section) : LIVE_TOPICS
  return c.json({ total: topics.length, topics })
})

live.get('/', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    const limit = Math.min(Number(c.req.query('limit') || 20), 50)
    const category = c.req.query('category')

    let query = `
      SELECT s.id, s.title, s.status, s.playback_url, s.started_at, s.user_id,
             s.viewer_count, s.category, u.display_name, u.avatar_url
      FROM broadcast_sessions s
      LEFT JOIN users u ON u.id = s.user_id
      WHERE s.status = 'live'`
    const params: any[] = []
    if (category) {
      query += ` AND s.category = ?`
      params.push(category)
    }
    query += ` ORDER BY s.viewer_count DESC, s.started_at DESC LIMIT ?`
    params.push(limit)

    const rows = await db.prepare(query).bind(...params).all()

    return c.json({
      lives: (rows.results || []).map((r: any) => ({
        id: r.id,
        title: r.title,
        playbackUrl: r.playback_url,
        startedAt: r.started_at,
        viewerCount: r.viewer_count ?? 0,
        category: r.category || null,
        host: {
          id: r.user_id,
          displayName: r.display_name || 'Creator',
          avatarUrl: r.avatar_url || null,
        },
        platform: 'pikk',
      })),
      categoriesAvailable: LIVE_TOPIC_COUNT,
      note: 'Native PIKK Live. Real video needs a media worker.',
    })
  } catch (err) {
    return c.json({ lives: [], error: String(err) })
  }
})

live.get('/following', requireAuth, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const limit = Math.min(Number(c.req.query('limit') || 20), 50)

    const rows = await db.prepare(
      `SELECT s.id, s.title, s.playback_url, s.started_at, s.user_id, s.viewer_count, s.category,
              u.display_name, u.avatar_url
       FROM broadcast_sessions s
       JOIN follows f ON f.followee_id = s.user_id AND f.follower_id = ?
       LEFT JOIN users u ON u.id = s.user_id
       WHERE s.status = 'live'
       ORDER BY s.started_at DESC
       LIMIT ?`
    ).bind(user.id, limit).all()

    return c.json({
      lives: (rows.results || []).map((r: any) => ({
        id: r.id,
        title: r.title,
        playbackUrl: r.playback_url,
        startedAt: r.started_at,
        viewerCount: r.viewer_count ?? 0,
        category: r.category || null,
        host: {
          id: r.user_id,
          displayName: r.display_name || 'Creator',
          avatarUrl: r.avatar_url || null,
        },
        platform: 'pikk',
      })),
    })
  } catch (err) {
    return c.json({ lives: [], error: String(err) })
  }
})

live.get('/:id', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    const row = await db.prepare(
      `SELECT s.*, u.display_name, u.avatar_url
       FROM broadcast_sessions s
       LEFT JOIN users u ON u.id = s.user_id
       WHERE s.id = ?`
    ).bind(c.req.param('id')).first()

    if (!row) return c.json({ error: 'not found' }, 404)
    if (row.status !== 'live' && row.status !== 'ended') {
      return c.json({ error: 'not available' }, 404)
    }

    return c.json({
      live: {
        id: row.id,
        title: row.title,
        status: row.status,
        playbackUrl: row.playback_url,
        startedAt: row.started_at,
        endedAt: row.ended_at,
        viewerCount: row.viewer_count ?? 0,
        category: row.category || null,
        host: {
          id: row.user_id,
          displayName: row.display_name || 'Creator',
          avatarUrl: row.avatar_url || null,
        },
        platform: 'pikk',
      },
    })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

live.post('/:id/join', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const id = c.req.param('id')
    const row = await db.prepare(`SELECT id, status FROM broadcast_sessions WHERE id = ?`).bind(id).first()
    if (!row || row.status !== 'live') return c.json({ error: 'not live' }, 404)
    await db.prepare(
      `UPDATE broadcast_sessions SET viewer_count = COALESCE(viewer_count, 0) + 1 WHERE id = ?`
    ).bind(id).run()
    const updated = await db.prepare(`SELECT viewer_count FROM broadcast_sessions WHERE id = ?`).bind(id).first()
    return c.json({ ok: true, viewerCount: updated?.viewer_count ?? 0 })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

live.post('/:id/leave', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const id = c.req.param('id')
    const row = await db.prepare(`SELECT viewer_count FROM broadcast_sessions WHERE id = ?`).bind(id).first()
    const next = Math.max(0, Number(row?.viewer_count || 0) - 1)
    await db.prepare(`UPDATE broadcast_sessions SET viewer_count = ? WHERE id = ?`).bind(next, id).run()
    return c.json({ ok: true, viewerCount: next })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

live.get('/:id/chat', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const id = c.req.param('id')
    const limit = Math.min(Number(c.req.query('limit') || 50), 100)
    const rows = await db.prepare(
      `SELECT c.id, c.body, c.created_at, c.user_id, u.display_name
       FROM live_chat c LEFT JOIN users u ON u.id = c.user_id
       WHERE c.session_id = ? ORDER BY c.created_at DESC LIMIT ?`
    ).bind(id, limit).all()
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

live.post('/:id/chat', requireAuth, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const id = c.req.param('id')
    const body = await c.req.json().catch(() => ({}))
    const text = (body.message || body.body || '').toString().trim().slice(0, 300)
    if (!text) return c.json({ error: 'message required' }, 400)

    const session = await db.prepare(`SELECT status FROM broadcast_sessions WHERE id = ?`).bind(id).first()
    if (!session || session.status !== 'live') return c.json({ error: 'not live' }, 404)

    const msgId = crypto.randomUUID()
    const now = new Date().toISOString()
    await db.prepare(
      `INSERT INTO live_chat (id, session_id, user_id, body, created_at) VALUES (?, ?, ?, ?, ?)`
    ).bind(msgId, id, user.id, text, now).run()

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

export default live
