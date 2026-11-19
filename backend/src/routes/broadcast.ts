import { Hono } from 'hono'
import { requireAuth } from '../lib/middleware'

/**
 * Broadcast API stubs
 * Real ingest, RTMP, and destination adapters come later.
 * These endpoints define the contract from the Master Plan.
 */

const broadcast = new Hono()

broadcast.use('*', requireAuth)

const DESTINATIONS = [
  { id: 'pikk', name: 'PIKK Live', status: 'ready', note: 'Native destination' },
  { id: 'youtube', name: 'YouTube Live', status: 'disconnected', note: 'OAuth required' },
  { id: 'twitch', name: 'Twitch', status: 'disconnected', note: 'OAuth required' },
  { id: 'kick', name: 'Kick', status: 'disconnected', note: 'OAuth required' },
  { id: 'tiktok', name: 'TikTok LIVE', status: 'unavailable', note: 'Conditional / eligibility required' },
  { id: 'instagram', name: 'Instagram Live', status: 'unavailable', note: 'Conditional / eligibility required' },
  { id: 'facebook', name: 'Facebook Live', status: 'unavailable', note: 'Conditional / eligibility required' },
  { id: 'custom-rtmp', name: 'Custom RTMP', status: 'disconnected', note: 'Bring your own key' },
]

// In-memory session store for stub (replace with D1 later)
const sessions = new Map<string, any>()

broadcast.get('/destinations', async (c) => {
  return c.json({ destinations: DESTINATIONS })
})

broadcast.post('/sessions', async (c) => {
  const user = c.get('user')
  const body = await c.req.json().catch(() => ({}))
  const id = crypto.randomUUID()
  const session = {
    id,
    userId: user.id,
    title: body.title || 'Untitled broadcast',
    status: 'draft',
    destinations: body.destinations || ['pikk'],
    createdAt: new Date().toISOString(),
    startedAt: null,
    endedAt: null,
    health: { bitrate: null, fps: null, dropped: 0 },
  }
  sessions.set(id, session)
  return c.json({ session }, 201)
})

broadcast.get('/sessions/:id', async (c) => {
  const session = sessions.get(c.req.param('id'))
  if (!session) return c.json({ error: 'session not found' }, 404)
  const user = c.get('user')
  if (session.userId !== user.id && user.role !== 'admin') {
    return c.json({ error: 'forbidden' }, 403)
  }
  return c.json({ session })
})

broadcast.post('/sessions/:id/start', async (c) => {
  const session = sessions.get(c.req.param('id'))
  if (!session) return c.json({ error: 'session not found' }, 404)
  const user = c.get('user')
  if (session.userId !== user.id) return c.json({ error: 'forbidden' }, 403)

  // Stub: no real ingest yet
  session.status = 'live'
  session.startedAt = new Date().toISOString()
  session.note = 'TEST MODE — no real media ingest or multistream yet'
  sessions.set(session.id, session)

  return c.json({
    session,
    warning: 'Broadcast started in stub mode only. Real RTMP/WHIP ingest and destination relays are not connected.',
  })
})

broadcast.post('/sessions/:id/stop', async (c) => {
  const session = sessions.get(c.req.param('id'))
  if (!session) return c.json({ error: 'session not found' }, 404)
  const user = c.get('user')
  if (session.userId !== user.id) return c.json({ error: 'forbidden' }, 403)

  session.status = 'ended'
  session.endedAt = new Date().toISOString()
  sessions.set(session.id, session)
  return c.json({ session })
})

broadcast.get('/sessions/:id/health', async (c) => {
  const session = sessions.get(c.req.param('id'))
  if (!session) return c.json({ error: 'session not found' }, 404)
  return c.json({
    status: session.status,
    health: session.health,
    note: 'Stub health — real metrics require ingest workers',
  })
})

export default broadcast
