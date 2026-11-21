-- Broadcast ingest + per-session destination relay status

ALTER TABLE broadcast_sessions ADD COLUMN ingest_token TEXT;
ALTER TABLE broadcast_sessions ADD COLUMN ingest_url TEXT;
ALTER TABLE broadcast_sessions ADD COLUMN whip_url TEXT;
ALTER TABLE broadcast_sessions ADD COLUMN mode TEXT DEFAULT 'test'; -- test | live

CREATE TABLE IF NOT EXISTS broadcast_relays (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  provider TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending | connecting | live | failed | stopped
  external_stream_url TEXT,
  last_error TEXT,
  started_at TEXT,
  stopped_at TEXT,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (session_id) REFERENCES broadcast_sessions(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_relays_session ON broadcast_relays(session_id);
CREATE INDEX IF NOT EXISTS idx_relays_status ON broadcast_relays(status);
