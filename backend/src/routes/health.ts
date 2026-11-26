import { Hono } from 'hono'

const health = new Hono()

async function safeCount(db: D1Database, sql: string): Promise<number> {
  try {
    const row = await db.prepare(sql).first()
    return (row?.c as number) ?? 0
  } catch {
    return 0
  }
}

health.get('/', async (c) => {
  const started = Date.now()
  const db = c.env.DB

  let dbStatus = 'not configured'
  const stats: Record<string, number | null> = {
    users: null,
    sessions: null,
    liveBroadcasts: null,
    openFlags: null,
    openIncidents: null,
    openTickets: null,
    queuedJobs: null,
  }

  try {
    if (db) {
      await db.prepare('SELECT 1').first()
      dbStatus = 'connected'
      stats.users = await safeCount(db, 'SELECT COUNT(*) as c FROM users')
      stats.sessions = await safeCount(db, 'SELECT COUNT(*) as c FROM sessions')
      stats.liveBroadcasts = await safeCount(db, `SELECT COUNT(*) as c FROM broadcast_sessions WHERE status = 'live'`)
      stats.openFlags = await safeCount(db, `SELECT COUNT(*) as c FROM shield_flags WHERE status = 'open'`)
      stats.openIncidents = await safeCount(db, `SELECT COUNT(*) as c FROM incidents WHERE status = 'open'`)
      stats.openTickets = await safeCount(db, `SELECT COUNT(*) as c FROM support_tickets WHERE status IN ('open','pending')`)
      stats.queuedJobs = await safeCount(db, `SELECT COUNT(*) as c FROM supervisor_jobs WHERE status = 'queued'`)
    }
  } catch (err) {
    dbStatus = `error: ${String(err)}`
  }

  return c.json({
    status: dbStatus === 'connected' ? 'ok' : 'degraded',
    version: '0.8.0',
    timestamp: new Date().toISOString(),
    latencyMs: Date.now() - started,
    environment: c.env.ENVIRONMENT || 'unknown',
    db: dbStatus,
    capabilities: {
      aiSupport: !!c.env.AI_API_KEY,
      vaultR2: !!c.env.VAULT_BUCKET,
    },
    stats,
  })
})

export default health
