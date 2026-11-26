ALTER TABLE broadcast_sessions ADD COLUMN viewer_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE broadcast_sessions ADD COLUMN category TEXT;
ALTER TABLE broadcast_sessions ADD COLUMN last_heartbeat_at TEXT;

CREATE TABLE IF NOT EXISTS live_chat (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  body TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_live_chat_session ON live_chat(session_id, created_at);
