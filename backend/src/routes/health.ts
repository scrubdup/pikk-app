import { Hono } from 'hono'

const health = new Hono()

health.get('/', async (c) => {
  const started = Date.now()
  const db = c.env.DB

  let dbStatus = 'not configured'
  let userCount: number | null = null
  let sessionCount: number | null = null

  try {
    if (db) {
      await db.prepare('SELECT 1').first()
      dbStatus = 'connected'

      const users = await db.prepare('SELECT COUNT(*) as c FROM users').first()
      const sessions = await db.prepare('SELECT COUNT(*) as c FROM sessions').first()
      userCount = (users?.c as number) ?? 0
      sessionCount = (sessions?.c as number) ?? 0
    }
  } catch (err) {
    dbStatus = `error: ${String(err)}`
  }

  return c.json({
    status: dbStatus === 'connected' ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    latencyMs: Date.now() - started,
    environment: c.env.ENVIRONMENT || 'unknown',
    db: dbStatus,
    stats: {
      users: userCount,
      sessions: sessionCount
    }
  })
})

export default health
