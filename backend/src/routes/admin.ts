import { Hono } from 'hono'
import { requireAuth, requireAdmin } from '../lib/middleware'

const admin = new Hono()

// All admin routes require auth + admin role
admin.use('*', requireAuth, requireAdmin)

/**
 * GET /admin/users
 * Simple paginated user list for Master Mind / admin tools
 */
admin.get('/users', async (c) => {
  const db = c.env.DB
  if (!db) return c.json({ error: 'database not configured' }, 500)

  const limit = Math.min(Number(c.req.query('limit') || 50), 100)
  const offset = Number(c.req.query('offset') || 0)

  const users = await db.prepare(
    `SELECT id, email, display_name, role, email_verified, created_at, updated_at
     FROM users
     ORDER BY id DESC
     LIMIT ? OFFSET ?`
  ).bind(limit, offset).all()

  const total = await db.prepare('SELECT COUNT(*) as c FROM users').first()

  return c.json({
    users: users.results || [],
    total: total?.c ?? 0,
    limit,
    offset
  })
})

export default admin
