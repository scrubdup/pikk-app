import { Hono } from 'hono'
import { requireAuth } from '../lib/middleware'

const broadcast = new Hono()
broadcast.use('*', requireAuth)

const PROVIDERS = [
  { id: 'pikk', name: 'PIKK Live', supportsOAuth: false, supportsKey: false, note: 'Native destination' },
  { id: 'youtube', name: 'YouTube Live', supportsOAuth: true, supportsKey: true, note: 'OAuth or stream key' },
  { id: 'twitch', name: 'Twitch', supportsOAuth: true, supportsKey: true, note: 'OAuth or stream key' },
  { id: 'kick', name: 'Kick', supportsOAuth: true, supportsKey: true, note: 'OAuth or stream key' },
  { id: 'tiktok', name: 'TikTok LIVE', supportsOAuth: true, supportsKey: false, note: 'Eligibility + OAuth required' },
  { id: 'instagram', name: 'Instagram Live', supportsOAuth: true, supportsKey: false, note: 'Eligibility required' },
  { id: 'facebook', name: 'Facebook Live', supportsOAuth: true, supportsKey: true, note: 'OAuth or stream key' },
  { id: 'custom', name: 'Custom RTMP', supportsOAuth: false, supportsKey: true, note: 'Bring your own RTMP URL + key' },
]

function rowToSession(row: any) {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    status: row.status,
    mode: row.mode || 'test',
    destinations: typeof row.destinations === 'string' ? JSON.parse(row.destinations) : row.destinations,
    playbackUrl: row.playback_url || null,
    ingestToken: row.ingest_token || null,
    ingestUrl: row.ingest_url || null,
    whipUrl: row.whip_url || null,
    viewerCount: row.viewer_count ?? 0,
    category: row.category || null,
    lastHeartbeatAt: row.last_heartbeat_at || null,
    startedAt: row.started_at || null,
    endedAt: row.ended_at || null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function rowToDestination(row: any) {
  return {
    id: row.id,
    userId: row.user_id,
    provider: row.provider,
    status: row.status,
    externalAccount: row.external_account || null,
    hasSecret: !!row.secret_ref,
    lastError: row.last_error || null,
    connectedAt: row.connected_at || null,
    updatedAt: row.updated_at,
  }
}

function rowToRelay(row: any) {
  return {
    id: row.id,
    sessionId: row.session_id,
    provider: row.provider,
    status: row.status,
    externalStreamUrl: row.external_stream_url || null,
    lastError: row.last_error || null,
    startedAt: row.started_at || null,
    stoppedAt: row.stopped_at || null,
    updatedAt: row.updated_at,
  }
}

broadcast.get('/destinations', (c) => c.json({ providers: PROVIDERS }))

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
    return c.json({ error: 'internal error' }, 500)
  }
})

broadcast.post('/connectors', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const body = await c.req.json().catch(() => ({}))
    const provider = (body.provider || '').toString().toLowerCase()
    const prov = PROVIDERS.find((p) => p.id === provider)
    if (!prov) return c.json({ error: 'invalid provider' }, 400)

    let status = (body.status || 'disconnected').toString()
    if (!['disconnected', 'connected', 'ready', 'failed', 'revoked'].includes(status)) {
      return c.json({ error: 'invalid status' }, 400)
    }

    const streamKey = body.streamKey ? String(body.streamKey).trim() : null
    const rtmpUrl = body.rtmpUrl ? String(body.rtmpUrl).trim() : null
    const externalAccount = body.externalAccount ? String(body.externalAccount).trim() : null
    if (streamKey || rtmpUrl) status = status === 'disconnected' ? 'ready' : status
    const secretRef = streamKey || rtmpUrl || null
    const now = new Date().toISOString()

    const existing = await db.prepare(
      `SELECT id FROM broadcast_destinations WHERE user_id = ? AND provider = ?`
    ).bind(user.id, provider).first()

    if (existing) {
      await db.prepare(
        `UPDATE broadcast_destinations
         SET status = ?, external_account = COALESCE(?, external_account),
             secret_ref = COALESCE(?, secret_ref), last_error = ?, updated_at = ?,
             connected_at = CASE WHEN ? IN ('connected','ready') THEN COALESCE(connected_at, ?) ELSE connected_at END
         WHERE id = ?`
      ).bind(status, externalAccount, secretRef, body.lastError || null, now, status, now, existing.id).run()
      const row = await db.prepare(`SELECT * FROM broadcast_destinations WHERE id = ?`).bind(existing.id).first()
      return c.json({ connector: rowToDestination(row) })
    }

    const id = crypto.randomUUID()
    await db.prepare(
      `INSERT INTO broadcast_destinations
       (id, user_id, provider, status, external_account, secret_ref, last_error, connected_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(id, user.id, provider, status, externalAccount, secretRef, body.lastError || null,
      status === 'connected' || status === 'ready' ? now : null, now).run()
    const row = await db.prepare(`SELECT * FROM broadcast_destinations WHERE id = ?`).bind(id).first()
    return c.json({ connector: rowToDestination(row) }, 201)
  } catch (err) {
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
    if (row.user_id !== user.id && user.role !== 'admin') return c.json({ error: 'forbidden' }, 403)
    await db.prepare(`DELETE FROM broadcast_destinations WHERE id = ?`).bind(id).run()
    return c.json({ ok: true })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

broadcast.post('/sessions', async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json().catch(() => ({}))
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)

    // One live at a time
    const existingLive = await db.prepare(
      `SELECT id FROM broadcast_sessions WHERE user_id = ? AND status = 'live'`
    ).bind(user.id).first()
    if (existingLive) {
      return c.json({ error: 'already live', sessionId: existingLive.id }, 409)
    }

    const id = crypto.randomUUID()
    const ingestToken = crypto.randomUUID().replace(/-/g, '') + crypto.randomUUID().replace(/-/g, '')
    const now = new Date().toISOString()
    const title = (body.title || 'Untitled broadcast').toString().slice(0, 120)
    const category = body.category ? String(body.category).slice(0, 40) : null
    const destinations = Array.isArray(body.destinations) && body.destinations.length
      ? body.destinations
      : ['pikk']

    const base = new URL(c.req.url).origin
    const ingestUrl = `${base}/broadcast/sessions/${id}/ingest`
    const whipUrl = `${base}/broadcast/sessions/${id}/whip`

    await db.prepare(
      `INSERT INTO broadcast_sessions
       (id, user_id, title, status, destinations, ingest_token, ingest_url, whip_url, mode, category, viewer_count, created_at, updated_at)
       VALUES (?, ?, ?, 'draft', ?, ?, ?, ?, 'test', ?, 0, ?, ?)`
    ).bind(id, user.id, title, JSON.stringify(destinations), ingestToken, ingestUrl, whipUrl, category, now, now).run()

    for (const provider of destinations) {
      await db.prepare(
        `INSERT INTO broadcast_relays (id, session_id, provider, status, updated_at) VALUES (?, ?, ?, 'pending', ?)`
      ).bind(crypto.randomUUID(), id, provider, now).run()
    }

    const row = await db.prepare(`SELECT * FROM broadcast_sessions WHERE id = ?`).bind(id).first()
    return c.json({
      session: rowToSession(row),
      ingest: { token: ingestToken, ingestUrl, whipUrl },
    }, 201)
  } catch (err) {
    return c.json({ error: 'failed to create session', detail: String(err) }, 500)
  }
})

broadcast.get('/sessions', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const limit = Math.min(Number(c.req.query('limit') || 20), 50)
    const rows = user.role === 'admin'
      ? await db.prepare(`SELECT * FROM broadcast_sessions ORDER BY created_at DESC LIMIT ?`).bind(limit).all()
      : await db.prepare(`SELECT * FROM broadcast_sessions WHERE user_id = ? ORDER BY created_at DESC LIMIT ?`).bind(user.id, limit).all()
    return c.json({ sessions: (rows.results || []).map(rowToSession) })
  } catch (err) {
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
    if (row.user_id !== user.id && user.role !== 'admin') return c.json({ error: 'forbidden' }, 403)
    const relays = await db.prepare(`SELECT * FROM broadcast_relays WHERE session_id = ? ORDER BY provider`).bind(row.id).all().catch(() => ({ results: [] }))
    return c.json({ session: rowToSession(row), relays: (relays.results || []).map(rowToRelay) })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

broadcast.patch('/sessions/:id', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const id = c.req.param('id')
    const body = await c.req.json().catch(() => ({}))
    const row = await db.prepare(`SELECT * FROM broadcast_sessions WHERE id = ?`).bind(id).first()
    if (!row) return c.json({ error: 'not found' }, 404)
    if (row.user_id !== user.id) return c.json({ error: 'forbidden' }, 403)

    const title = body.title != null ? String(body.title).slice(0, 120) : null
    const category = body.category != null ? String(body.category).slice(0, 40) : null
    const now = new Date().toISOString()
    await db.prepare(
      `UPDATE broadcast_sessions SET
         title = COALESCE(?, title),
         category = COALESCE(?, category),
         updated_at = ?
       WHERE id = ?`
    ).bind(title, category, now, id).run()
    const updated = await db.prepare(`SELECT * FROM broadcast_sessions WHERE id = ?`).bind(id).first()
    return c.json({ session: rowToSession(updated) })
  } catch (err) {
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

    if (user.role !== 'creator' && user.role !== 'admin') {
      return c.json({ error: 'creator role required', apply: '/creator/apply' }, 403)
    }

    if (row.status === 'live') return c.json({ session: rowToSession(row), warning: 'Already live' })

    const otherLive = await db.prepare(
      `SELECT id FROM broadcast_sessions WHERE user_id = ? AND status = 'live' AND id != ?`
    ).bind(user.id, id).first()
    if (otherLive) return c.json({ error: 'already live on another session', sessionId: otherLive.id }, 409)

    const now = new Date().toISOString()
    const playbackUrl = row.playback_url || `https://playback.pikk.local/live/${id}.m3u8`

    await db.prepare(
      `UPDATE broadcast_sessions
       SET status = 'live', started_at = ?, updated_at = ?, playback_url = ?, last_heartbeat_at = ?, viewer_count = 0
       WHERE id = ?`
    ).bind(now, now, playbackUrl, now, id).run()

    await db.prepare(
      `UPDATE broadcast_relays SET status = 'connecting', started_at = ?, updated_at = ? WHERE session_id = ?`
    ).bind(now, now, id).run()
    await db.prepare(
      `UPDATE broadcast_relays SET status = 'live', updated_at = ? WHERE session_id = ? AND provider = 'pikk'`
    ).bind(now, id).run()

    const updated = await db.prepare(`SELECT * FROM broadcast_sessions WHERE id = ?`).bind(id).first()
    const relays = await db.prepare(`SELECT * FROM broadcast_relays WHERE session_id = ?`).bind(id).all()

    return c.json({
      session: rowToSession(updated),
      relays: (relays.results || []).map(rowToRelay),
      ingest: { token: updated.ingest_token, ingestUrl: updated.ingest_url, whipUrl: updated.whip_url },
      warning: 'Live in API state. Media plane not attached yet.',
    })
  } catch (err) {
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
    if (row.user_id !== user.id && user.role !== 'admin') return c.json({ error: 'forbidden' }, 403)

    const now = new Date().toISOString()
    await db.prepare(
      `UPDATE broadcast_sessions SET status = 'ended', ended_at = ?, updated_at = ?, viewer_count = 0 WHERE id = ?`
    ).bind(now, now, id).run()
    await db.prepare(
      `UPDATE broadcast_relays SET status = 'stopped', stopped_at = ?, updated_at = ? WHERE session_id = ?`
    ).bind(now, now, id).run()

    const updated = await db.prepare(`SELECT * FROM broadcast_sessions WHERE id = ?`).bind(id).first()
    return c.json({ session: rowToSession(updated) })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

broadcast.post('/sessions/:id/heartbeat', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const id = c.req.param('id')
    const row = await db.prepare(`SELECT * FROM broadcast_sessions WHERE id = ?`).bind(id).first()
    if (!row) return c.json({ error: 'not found' }, 404)
    if (row.user_id !== user.id) return c.json({ error: 'forbidden' }, 403)
    if (row.status !== 'live') return c.json({ error: 'not live' }, 400)

    const now = new Date().toISOString()
    await db.prepare(
      `UPDATE broadcast_sessions SET last_heartbeat_at = ?, updated_at = ? WHERE id = ?`
    ).bind(now, now, id).run()
    return c.json({ ok: true, at: now })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

broadcast.get('/sessions/:id/health', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const row = await db.prepare(`SELECT * FROM broadcast_sessions WHERE id = ?`).bind(c.req.param('id')).first()
    if (!row) return c.json({ error: 'session not found' }, 404)
    const user = c.get('user')
    if (row.user_id !== user.id && user.role !== 'admin') return c.json({ error: 'forbidden' }, 403)
    const relays = await db.prepare(`SELECT * FROM broadcast_relays WHERE session_id = ?`).bind(row.id).all().catch(() => ({ results: [] }))
    return c.json({
      status: row.status,
      mode: row.mode || 'test',
      viewerCount: row.viewer_count ?? 0,
      lastHeartbeatAt: row.last_heartbeat_at,
      health: { bitrate: null, fps: null, dropped: 0 },
      relays: (relays.results || []).map(rowToRelay),
    })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

async function authorizeIngest(c: any, sessionId: string) {
  const db = c.env.DB
  const row = await db.prepare(`SELECT * FROM broadcast_sessions WHERE id = ?`).bind(sessionId).first()
  if (!row) return { error: c.json({ error: 'session not found' }, 404) }
  const auth = c.req.header('authorization') || ''
  const bearer = auth.startsWith('Bearer ') ? auth.slice(7) : null
  const token = bearer || c.req.query('token')
  if (!token || token !== row.ingest_token) return { error: c.json({ error: 'invalid ingest token' }, 401) }
  return { row }
}

broadcast.post('/sessions/:id/ingest', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const auth = await authorizeIngest(c, c.req.param('id'))
    if (auth.error) return auth.error
    const body = await c.req.json().catch(() => ({}))
    const event = (body.event || 'publish').toString()
    if (event === 'publish' || event === 'start') {
      if (auth.row.status !== 'live') {
        const now = new Date().toISOString()
        await db.prepare(
          `UPDATE broadcast_sessions SET status = 'live', started_at = COALESCE(started_at, ?), updated_at = ?, last_heartbeat_at = ? WHERE id = ?`
        ).bind(now, now, now, auth.row.id).run()
      }
      return c.json({ ok: true, event, sessionId: auth.row.id })
    }
    return c.json({ ok: true, event, sessionId: auth.row.id })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

broadcast.post('/sessions/:id/whip', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const auth = await authorizeIngest(c, c.req.param('id'))
    if (auth.error) return auth.error
    const contentType = c.req.header('content-type') || ''
    if (!contentType.includes('application/sdp')) {
      return c.json({ error: 'expected Content-Type: application/sdp' }, 415)
    }
    return c.json({
      error: 'whip_not_implemented',
      message: 'No WebRTC media worker attached.',
      sessionId: auth.row.id,
    }, 501)
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

broadcast.patch('/sessions/:id/relays/:provider', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const sessionId = c.req.param('id')
    const provider = c.req.param('provider')
    const body = await c.req.json().catch(() => ({}))
    const session = await db.prepare(`SELECT * FROM broadcast_sessions WHERE id = ?`).bind(sessionId).first()
    if (!session) return c.json({ error: 'session not found' }, 404)
    if (session.user_id !== user.id && user.role !== 'admin') return c.json({ error: 'forbidden' }, 403)

    const status = body.status
    if (!['pending', 'connecting', 'live', 'error', 'stopped'].includes(status)) {
      return c.json({ error: 'invalid status' }, 400)
    }
    const now = new Date().toISOString()
    await db.prepare(
      `UPDATE broadcast_relays SET status = ?, last_error = ?, external_stream_url = COALESCE(?, external_stream_url), updated_at = ?
       WHERE session_id = ? AND provider = ?`
    ).bind(status, body.lastError || null, body.externalStreamUrl || null, now, sessionId, provider).run()

    const relay = await db.prepare(
      `SELECT * FROM broadcast_relays WHERE session_id = ? AND provider = ?`
    ).bind(sessionId, provider).first()
    return c.json({ relay: rowToRelay(relay) })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

export default broadcast
