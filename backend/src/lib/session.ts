const SESSION_DAYS = 30
const SLIDE_THRESHOLD_MS = 24 * 60 * 60 * 1000 // extend if last_seen older than 1 day

export async function createSession(
  db: D1Database,
  userId: number,
  meta?: { userAgent?: string; ip?: string }
): Promise<string> {
  const sessionId = crypto.randomUUID()
  const now = new Date().toISOString()
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000).toISOString()

  await db.prepare(
    `INSERT INTO sessions (id, user_id, created_at, expires_at, user_agent, ip, last_seen_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    sessionId,
    userId,
    now,
    expiresAt,
    meta?.userAgent || null,
    meta?.ip || null,
    now
  ).run()

  return sessionId
}

export async function getSession(db: D1Database, sessionId: string) {
  const session = await db.prepare(
    `SELECT id, user_id, created_at, expires_at, user_agent, ip, last_seen_at
     FROM sessions
     WHERE id = ? AND expires_at > datetime('now')`
  ).bind(sessionId).first()

  return session as {
    id: string
    user_id: number
    created_at: string
    expires_at: string
    user_agent?: string
    ip?: string
    last_seen_at?: string
  } | null
}

/** Sliding expiry — keep active users logged in */
export async function touchSession(db: D1Database, sessionId: string) {
  const now = new Date()
  const expiresAt = new Date(now.getTime() + SESSION_DAYS * 24 * 60 * 60 * 1000).toISOString()
  await db.prepare(
    `UPDATE sessions SET last_seen_at = ?, expires_at = ? WHERE id = ?`
  ).bind(now.toISOString(), expiresAt, sessionId).run()
}

export async function deleteSession(db: D1Database, sessionId: string) {
  await db.prepare('DELETE FROM sessions WHERE id = ?').bind(sessionId).run()
}

export async function cleanupExpiredSessions(db: D1Database) {
  await db.prepare(`DELETE FROM sessions WHERE expires_at <= datetime('now')`).run()
}

export async function deleteAllUserSessions(db: D1Database, userId: number) {
  await db.prepare('DELETE FROM sessions WHERE user_id = ?').bind(userId).run()
}

export async function listUserSessions(db: D1Database, userId: number) {
  const rows = await db.prepare(
    `SELECT id, created_at, expires_at, user_agent, ip, last_seen_at
     FROM sessions WHERE user_id = ? AND expires_at > datetime('now')
     ORDER BY last_seen_at DESC, created_at DESC`
  ).bind(userId).all()
  return rows.results || []
}
