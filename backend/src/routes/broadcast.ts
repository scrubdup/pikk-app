import { Hono } from 'hono'
import { requireAuth } from '../lib/middleware'

/**
 * Broadcast API
 * - Sessions persisted in D1
 * - Destination connectors persisted in broadcast_destinations
 * - Real media ingest (RTMP/WHIP) and platform relays remain TEST MODE
 */

const broadcast = new Hono()

broadcast.use('*', requireAuth)

const PROVIDERS = [
  { id: 'pikk', name: 'PIKK Live', supportsOAuth: false, note: 'Native destination' },
  { id: 'youtube', name: 'YouTube Live', supportsOAuth: true, note: 'OAuth required' },
  { id: 'twitch', name: 'Twitch', supportsOAuth: true, note: 'OAuth required' },
  { id: 'kick', name: 'Kick', supportsOAuth: true, note: 'OAuth required' },
  { id: 'tiktok', name: 'TikTok LIVE', supportsOAuth: true, note: 'Eligibility required' },
  { id: 'instagram', name: 'Instagram Live', supportsOAuth: true, note: 'Eligibility required' },
  { id: 'facebook', name: 'Facebook Live', supportsOAuth: true, note: 'Eligibility required' },
  { id: 'custom', name: 'Custom RTMP', supportsOAuth: false, note: 'Bring your own key' },
]

function rowToSession(row: any) {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    status: row.status,
    destinations: typeof row.destinations === 'string' ? JSON.parse(row.destinations) : row.destinations,
    playbackUrl: row.playback_url || null,
    startedAt: row.started_at || null,
    endedAt: row.ended_at || null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    health: { bitrate: null, fps: null, dropped: 0 },
  }
}

function rowToDestination(row: any) {
  return {
    id: row.id,
    userId: row.user_id,
    provider: row.provider,
    status: row.status,
    externalAccount: row.external_account || null,
    lastError: row.last_error || null,
    connectedAt: row.connected_at || null,
    updatedAt: row.updated_at,
  }
}

// ---------------------------------------------------------------------------
// Destinations / Connectors
// ---------------------------------------------------------------------------

broadcast.get('/destinations', async (c) => {
  return c.json({ providers: PROVIDERS })
})

/** List the current user's connected destinations */
broadcast.get('/connectors', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')

    const rows = await db.prepare(
      `SELECT * FROM broadcast_destinations WHERE user_id = ? ORDER BY provider`
    ).bind(user.id).all()

    return c.json({ connectors: (rows.results || []).map(rowToDestination) })
  } catch (err) {
    console.error('list connectors error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

/**
 * Create or update a connector for a provider.
 * Real OAuth / stream-key validation is not implemented yet.
 * This only records the intended connection state.
 */
broadcast.post('/connectors', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const body = await c.req.json().catch(() => ({}))

    const provider = (body.provider || '').toString().toLowerCase()
    if (!PROVIDERS.find(p => p.id === provider)) {
      return c.json({ error: 'invalid provider' }, 400)
    }

    const status = body.status || 'disconnected'
    const allowed = ['disconnected', 'connected', 'ready', 'failed', 'revoked']
    if (!allowed.includes(status)) {
      return c.json({ error: 'invalid status' }, 400)
    }

    const now = new Date().toISOString()
    const existing = await db.prepare(
      `SELECT id FROM broadcast_destinations WHERE user_id = ? AND provider = ?`
    ).bind(user.id, provider).first()

    if (existing) {
      await db.prepare(
        `UPDATE broadcast_destinations
         SET status = ?, external_account = ?, last_error = ?, updated_at = ?,
             connected_at = CASE WHEN ? IN ('connected','ready') THEN COALESCE(connected_at, ?) ELSE connected_at END
         WHERE id = ?`
      ).bind(
        status,
        body.externalAccount || null,
        body.lastError || null,
        now,
        status, now,
        existing.id
      ).run()

      const row = await db.prepare(`SELECT * FROM broadcast_destinations WHERE id = ?`).bind(existing.id).first()
      return c.json({ connector: rowToDestination(row) })
    }

    const id = crypto.randomUUID()
    await db.prepare(
      `INSERT INTO broadcast_destinations
       (id, user_id, provider, status, external_account, secret_ref, last_error, connected_at, updated_at)
       VALUES (?, ?, ?, ?, ?, NULL, ?, ?, ?)`
    ).bind(
      id,
      user.id,
      provider,
      status,
      body.externalAccount || null,
      body.lastError || null,
      status === 'connected' || status === 'ready' ? now : null,
      now
    ).run()

    const row = await db.prepare(`SELECT * FROM broadcast_destinations WHERE id = ?`).bind(id).first()
    return c.json({ connector: rowToDestination(row) }, 201)
  } catch (err) {
    console.error('upsert connector error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

broadcast.delete('/connectors/:id', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const id = c.req.param('id')

    const row = await db.prepare(`SELECT * FROM broadcast_destinations WHERE id = ?`).bind(id).first()
    if (!row) return c.json({ error: 'not found' }, 404)
    if (row.user_id !== user.id && user.role !== 'admin') {
      return c.json({ error: 'forbidden' }, 403)
    }

    await db.prepare(`DELETE FROM broadcast_destinations WHERE id = ?`).bind(id).run()
    return c.json({ ok: true })
  } catch (err) {
    console.error('delete connector error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

// ---------------------------------------------------------------------------
// Sessions
// ---------------------------------------------------------------------------

broadcast.post('/sessions', async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json().catch(() => ({}))
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    const id = crypto.randomUUID()
    const now = new Date().toISOString()
    const title = (body.title || 'Untitled broadcast').toString().slice(0, 120)
    const destinations = Array.isArray(body.destinations) && body.destinations.length
      ? body.destinations
      : ['pikk']

    await db.prepare(
      `INSERT INTO broadcast_sessions
       (id, user_id, title, status, destinations, created_at, updated_at)
       VALUES (?, ?, ?, 'draft', ?, ?, ?)`
    ).bind(id, user.id, title, JSON.stringify(destinations), now, now).run()

    const row = await db.prepare(`SELECT * FROM broadcast_sessions WHERE id = ?`).bind(id).first()
    return c.json({ session: rowToSession(row) }, 201)
  } catch (err) {
    console.error('broadcast create session error', err)
    return c.json({ error: 'failed to create session', detail: String(err) }, 500)
  }
})

broadcast.get('/sessions', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const limit = Math.min(Number(c.req.query('limit') || 20), 50)

    let rows
    if (user.role === 'admin') {
      rows = await db.prepare(
        `SELECT * FROM broadcast_sessions ORDER BY created_at DESC LIMIT ?`
      ).bind(limit).all()
    } else {
      rows = await db.prepare(
        `SELECT * FROM broadcast_sessions WHERE user_id = ? ORDER BY created_at DESC LIMIT ?`
      ).bind(user.id, limit).all()
    }

    return c.json({ sessions: (rows.results || []).map(rowToSession) })
  } catch (err) {
    console.error('broadcast list sessions error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

broadcast.get('/sessions/:id', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    const row = await db.prepare(`SELECT * FROM broadcast_sessions WHERE id = ?`).bind(c.req.param('id')).first()
    if (!row) return c.json({ error: 'session not found' }, 404)

    const user = c.get('user')
    if (row.user_id !== user.id && user.role !== 'admin') {
      return c.json({ error: 'forbidden' }, 403)
    }

    return c.json({ session: rowToSession(row) })
  } catch (err) {
    console.error('broadcast get session error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

broadcast.post('/sessions/:id/start', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    const id = c.req.param('id')
    const row = await db.prepare(`SELECT * FROM broadcast_sessions WHERE id = ?`).bind(id).first()
    if (!row) return c.json({ error: 'session not found' }, 404)

    const user = c.get('user')
    if (row.user_id !== user.id) return c.json({ error: 'forbidden' }, 403)

    if (row.status === 'live') {
      return c.json({ session: rowToSession(row), warning: 'Already live (TEST MODE)' })
    }

    const now = new Date().toISOString()
    await db.prepare(
      `UPDATE broadcast_sessions
       SET status = 'live', started_at = ?, updated_at = ?
       WHERE id = ?`
    ).bind(now, now, id).run()

    const updated = await db.prepare(`SELECT * FROM broadcast_sessions WHERE id = ?`).bind(id).first()

    return c.json({
      session: rowToSession(updated),
      warning: 'Broadcast marked live in TEST MODE only. Real RTMP/WHIP ingest and destination relays are not connected.',
    })
  } catch (err) {
    console.error('broadcast start error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

broadcast.post('/sessions/:id/stop', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    const id = c.req.param('id')
    const row = await db.prepare(`SELECT * FROM broadcast_sessions WHERE id = ?`).bind(id).first()
    if (!row) return c.json({ error: 'session not found' }, 404)

    const user = c.get('user')
    if (row.user_id !== user.id && user.role !== 'admin') {
      return c.json({ error: 'forbidden' }, 403)
    }

    const now = new Date().toISOString()
    await db.prepare(
      `UPDATE broadcast_sessions
       SET status = 'ended', ended_at = ?, updated_at = ?
       WHERE id = ?`
    ).bind(now, now, id).run()

    const updated = await db.prepare(`SELECT * FROM broadcast_sessions WHERE id = ?`).bind(id).first()
    return c.json({ session: rowToSession(updated) })
  } catch (err) {
    console.error('broadcast stop error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

broadcast.get('/sessions/:id/health', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    const row = await db.prepare(`SELECT id, status, user_id FROM broadcast_sessions WHERE id = ?`).bind(c.req.param('id')).first()
    if (!row) return c.json({ error: 'session not found' }, 404)

    const user = c.get('user')
    if (row.user_id !== user.id && user.role !== 'admin') {
      return c.json({ error: 'forbidden' }, 403)
    }

    return c.json({
      status: row.status,
      health: { bitrate: null, fps: null, dropped: 0 },
      note: 'Stub health — real metrics require ingest workers',
    })
  } catch (err) {
    console.error('broadcast health error', err)
    return c.json({ error: 'internal error' }, 500)
  }
})

export default broadcast
