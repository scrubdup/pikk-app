export async function createSession(db: D1Database, userId: number): Promise<string> {
  const sessionId = crypto.randomUUID()
  const now = new Date().toISOString()
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days

  await db.prepare(
    `INSERT INTO sessions (id, user_id, created_at, expires_at)
     VALUES (?, ?, ?, ?)`
  ).bind(sessionId, userId, now, expiresAt).run()

  return sessionId
}

export async function getSession(db: D1Database, sessionId: string) {
  const session = await db.prepare(
    `SELECT id, user_id, created_at, expires_at
     FROM sessions
     WHERE id = ? AND expires_at > datetime('now')`
  ).bind(sessionId).first()

  return session as { id: string; user_id: number; created_at: string; expires_at: string } | null
}

export async function deleteSession(db: D1Database, sessionId: string) {
  await db.prepare('DELETE FROM sessions WHERE id = ?').bind(sessionId).run()
}

/** Delete all expired sessions (can be called periodically) */
export async function cleanupExpiredSessions(db: D1Database) {
  await db.prepare(`DELETE FROM sessions WHERE expires_at <= datetime('now')`).run()
}

/** Delete all sessions for a user (logout everywhere) */
export async function deleteAllUserSessions(db: D1Database, userId: number) {
  await db.prepare('DELETE FROM sessions WHERE user_id = ?').bind(userId).run()
}
