-- Broadcast sessions foundation (Master Plan)
-- Apply after 0001_init.sql

CREATE TABLE IF NOT EXISTS broadcast_sessions (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft', -- draft | live | ended | failed
  destinations TEXT NOT NULL DEFAULT '["pikk"]', -- JSON array
  playback_url TEXT,
  started_at TEXT,
  ended_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_broadcast_user ON broadcast_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_broadcast_status ON broadcast_sessions(status);

CREATE TABLE IF NOT EXISTS broadcast_destinations (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  provider TEXT NOT NULL, -- pikk | youtube | twitch | kick | tiktok | instagram | facebook | custom
  status TEXT NOT NULL DEFAULT 'disconnected', -- disconnected | connected | ready | live | failed | revoked
  external_account TEXT,
  -- secrets must never be stored in plain text; use secret ref later
  secret_ref TEXT,
  last_error TEXT,
  connected_at TEXT,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_bcast_dest_user ON broadcast_destinations(user_id);
CREATE INDEX IF NOT EXISTS idx_bcast_dest_provider ON broadcast_destinations(provider);
