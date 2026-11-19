import { Hono } from 'hono'

const health = new Hono()

health.get('/', async (c) => {
  try {
    // Quick DB ping if available
    const db = c.env.DB
    if (db) {
      await db.prepare('SELECT 1').first()
    }
    return c.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      db: db ? 'connected' : 'not configured'
    })
  } catch (err) {
    return c.json({
      status: 'degraded',
      error: String(err),
      timestamp: new Date().toISOString()
    }, 503)
  }
})

export default health
