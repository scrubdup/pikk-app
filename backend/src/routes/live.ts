import { Hono } from 'hono'

/**
 * Public native PIKK Live discovery
 * PIKK is its own platform — this is the primary live surface.
 */

const live = new Hono()

live.get('/', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    const limit = Math.min(Number(c.req.query('limit') || 20), 50)

    const rows = await db.prepare(
      `SELECT s.id, s.title, s.status, s.playback_url, s.started_at, s.user_id,
              u.display_name
       FROM broadcast_sessions s
       LEFT JOIN users u ON u.id = s.user_id
       WHERE s.status = 'live'
       ORDER BY s.started_at DESC
       LIMIT ?`
    ).bind(limit).all()

    return c.json({
      lives: (rows.results || []).map((r: any) => ({
        id: r.id,
        title: r.title,
        playbackUrl: r.playback_url,
        startedAt: r.started_at,
        host: {
          id: r.user_id,
          displayName: r.display_name || 'Creator',
        },
        platform: 'pikk',
      })),
      note: 'Native PIKK Live sessions only. Playback URLs require a media worker for real video.',
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
      `SELECT s.*, u.display_name
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
        host: { id: row.user_id, displayName: row.display_name || 'Creator' },
        platform: 'pikk',
      },
    })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

export default live
