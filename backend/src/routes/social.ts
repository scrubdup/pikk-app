import { Hono } from 'hono'
import { requireAuth } from '../lib/middleware'

const social = new Hono()

social.get('/search', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const q = (c.req.query('q') || '').trim()
    if (!q || q.length < 2) return c.json({ users: [] })
    const limit = Math.min(Number(c.req.query('limit') || 20), 50)
    const like = `%${q}%`
    const rows = await db.prepare(
      `SELECT id, display_name, role, avatar_url, bio
       FROM users WHERE display_name LIKE ? OR email LIKE ?
       ORDER BY display_name ASC LIMIT ?`
    ).bind(like, like, limit).all()
    return c.json({
      users: (rows.results || []).map((u: any) => ({
        id: u.id,
        displayName: u.display_name,
        role: u.role,
        avatarUrl: u.avatar_url || null,
        bio: u.bio || '',
      })),
    })
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

social.get('/users/:id', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const id = Number(c.req.param('id'))
    const user = await db.prepare(
      `SELECT id, display_name, role, bio, avatar_url, created_at FROM users WHERE id = ?`
    ).bind(id).first()
    if (!user) return c.json({ error: 'not found' }, 404)

    let followers = 0
    let following = 0
    let isFollowing = false
    try {
      const f1 = await db.prepare(`SELECT COUNT(*) as c FROM follows WHERE followee_id = ?`).bind(id).first()
      const f2 = await db.prepare(`SELECT COUNT(*) as c FROM follows WHERE follower_id = ?`).bind(id).first()
      followers = (f1?.c as number) ?? 0
      following = (f2?.c as number) ?? 0
      const session = c.req.header('cookie') || c.req.header('authorization')
      // best-effort isFollowing if we can parse user from requireAuth optional — skip if no auth
    } catch { /* optional */ }

    return c.json({
      user: {
        id: user.id,
        displayName: user.display_name,
        role: user.role,
        bio: user.bio || '',
        avatarUrl: user.avatar_url || null,
        createdAt: user.created_at,
        followers,
        following,
      },
    })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

social.get('/users/:id/followers', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const id = Number(c.req.param('id'))
    const limit = Math.min(Number(c.req.query('limit') || 30), 100)
    const rows = await db.prepare(
      `SELECT u.id, u.display_name, u.avatar_url, f.created_at
       FROM follows f JOIN users u ON u.id = f.follower_id
       WHERE f.followee_id = ? ORDER BY f.created_at DESC LIMIT ?`
    ).bind(id, limit).all()
    return c.json({ followers: rows.results || [] })
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

social.get('/users/:id/following', async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const id = Number(c.req.param('id'))
    const limit = Math.min(Number(c.req.query('limit') || 30), 100)
    const rows = await db.prepare(
      `SELECT u.id, u.display_name, u.avatar_url, f.created_at
       FROM follows f JOIN users u ON u.id = f.followee_id
       WHERE f.follower_id = ? ORDER BY f.created_at DESC LIMIT ?`
    ).bind(id, limit).all()
    return c.json({ following: rows.results || [] })
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

social.get('/users/:id/relationship', requireAuth, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const me = c.get('user')
    const targetId = Number(c.req.param('id'))
    const following = await db.prepare(
      `SELECT 1 FROM follows WHERE follower_id = ? AND followee_id = ?`
    ).bind(me.id, targetId).first()
    const followedBy = await db.prepare(
      `SELECT 1 FROM follows WHERE follower_id = ? AND followee_id = ?`
    ).bind(targetId, me.id).first()
    let blocked = false
    try {
      const b = await db.prepare(
        `SELECT 1 FROM blocks WHERE blocker_id = ? AND blocked_id = ?`
      ).bind(me.id, targetId).first()
      blocked = !!b
    } catch { /* optional */ }
    return c.json({
      following: !!following,
      followedBy: !!followedBy,
      blocked,
    })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

social.post('/users/:id/follow', requireAuth, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const me = c.get('user')
    const targetId = Number(c.req.param('id'))
    if (!targetId || targetId === me.id) return c.json({ error: 'invalid target' }, 400)
    const target = await db.prepare(`SELECT id FROM users WHERE id = ?`).bind(targetId).first()
    if (!target) return c.json({ error: 'not found' }, 404)

    try {
      const blocked = await db.prepare(
        `SELECT 1 FROM blocks WHERE (blocker_id = ? AND blocked_id = ?) OR (blocker_id = ? AND blocked_id = ?)`
      ).bind(me.id, targetId, targetId, me.id).first()
      if (blocked) return c.json({ error: 'cannot follow' }, 403)
    } catch { /* table may not exist yet */ }

    const now = new Date().toISOString()
    await db.prepare(
      `INSERT OR IGNORE INTO follows (follower_id, followee_id, created_at) VALUES (?, ?, ?)`
    ).bind(me.id, targetId, now).run()

    try {
      const prefs = await db.prepare(`SELECT follows FROM notification_prefs WHERE user_id = ?`).bind(targetId).first()
      if (!prefs || prefs.follows !== 0) {
        await db.prepare(
          `INSERT INTO notifications (id, user_id, type, title, body, href, created_at)
           VALUES (?, ?, 'system', ?, ?, ?, ?)`
        ).bind(
          crypto.randomUUID(), targetId, 'New follower',
          `${me.displayName || 'Someone'} started following you`,
          `/social/users/${me.id}`, now
        ).run()
      }
    } catch { /* optional */ }

    return c.json({ ok: true, following: true })
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

social.delete('/users/:id/follow', requireAuth, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const me = c.get('user')
    const targetId = Number(c.req.param('id'))
    await db.prepare(`DELETE FROM follows WHERE follower_id = ? AND followee_id = ?`).bind(me.id, targetId).run()
    return c.json({ ok: true, following: false })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

social.post('/users/:id/block', requireAuth, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const me = c.get('user')
    const targetId = Number(c.req.param('id'))
    if (!targetId || targetId === me.id) return c.json({ error: 'invalid target' }, 400)
    const now = new Date().toISOString()
    await db.prepare(
      `INSERT OR IGNORE INTO blocks (blocker_id, blocked_id, created_at) VALUES (?, ?, ?)`
    ).bind(me.id, targetId, now).run()
    // Unfollow both directions
    await db.prepare(`DELETE FROM follows WHERE (follower_id = ? AND followee_id = ?) OR (follower_id = ? AND followee_id = ?)`)
      .bind(me.id, targetId, targetId, me.id).run()
    return c.json({ ok: true, blocked: true })
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

social.delete('/users/:id/block', requireAuth, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const me = c.get('user')
    const targetId = Number(c.req.param('id'))
    await db.prepare(`DELETE FROM blocks WHERE blocker_id = ? AND blocked_id = ?`).bind(me.id, targetId).run()
    return c.json({ ok: true, blocked: false })
  } catch (err) {
    return c.json({ error: 'internal error' }, 500)
  }
})

social.get('/blocks', requireAuth, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const me = c.get('user')
    const rows = await db.prepare(
      `SELECT u.id, u.display_name, u.avatar_url, b.created_at
       FROM blocks b JOIN users u ON u.id = b.blocked_id
       WHERE b.blocker_id = ? ORDER BY b.created_at DESC LIMIT 100`
    ).bind(me.id).all()
    return c.json({ blocks: rows.results || [] })
  } catch (err) {
    return c.json({ blocks: [], error: String(err) })
  }
})

social.patch('/me/profile', requireAuth, async (c) => {
  try {
    const db = c.env.DB
    if (!db) return c.json({ error: 'database not configured' }, 500)
    const user = c.get('user')
    const body = await c.req.json().catch(() => ({}))
    const bio = body.bio !== undefined ? String(body.bio).slice(0, 280) : undefined
    const avatarUrl = body.avatarUrl !== undefined ? String(body.avatarUrl).slice(0, 500) : undefined
    const displayName = body.displayName !== undefined ? String(body.displayName).trim().slice(0, 40) : undefined
    const now = new Date().toISOString()

    await db.prepare(
      `UPDATE users SET
         bio = COALESCE(?, bio),
         avatar_url = COALESCE(?, avatar_url),
         display_name = COALESCE(?, display_name),
         updated_at = ?
       WHERE id = ?`
    ).bind(bio ?? null, avatarUrl ?? null, displayName ?? null, now, user.id).run()

    const row = await db.prepare(
      `SELECT id, email, display_name, role, bio, avatar_url FROM users WHERE id = ?`
    ).bind(user.id).first()

    return c.json({
      user: {
        id: row?.id,
        email: row?.email,
        displayName: row?.display_name,
        role: row?.role,
        bio: row?.bio || '',
        avatarUrl: row?.avatar_url || null,
      },
    })
  } catch (err) {
    return c.json({ error: 'internal error', detail: String(err) }, 500)
  }
})

export default social
