-- Shield + incidents foundation
-- Apply after 0002_broadcast.sql

CREATE TABLE IF NOT EXISTS shield_flags (
  id TEXT PRIMARY KEY,
  reporter_id INTEGER,                     -- null = system
  target_type TEXT NOT NULL,               -- user | content | broadcast | other
  target_id TEXT NOT NULL,
  reason TEXT NOT NULL,                    -- impersonation | copyright | suspicious | spam | other
  details TEXT,
  status TEXT NOT NULL DEFAULT 'open',     -- open | reviewing | resolved | dismissed
  severity TEXT NOT NULL DEFAULT 'medium', -- low | medium | high | critical
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  resolved_at TEXT,
  resolved_by INTEGER,
  FOREIGN KEY (reporter_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_shield_status ON shield_flags(status);
CREATE INDEX IF NOT EXISTS idx_shield_target ON shield_flags(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_shield_severity ON shield_flags(severity);

CREATE TABLE IF NOT EXISTS incidents (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL,                    -- broadcast | shield | system | payment | other
  severity TEXT NOT NULL DEFAULT 'medium', -- low | medium | high | critical
  title TEXT NOT NULL,
  details TEXT,
  status TEXT NOT NULL DEFAULT 'open',     -- open | acknowledged | resolved
  related_id TEXT,                         -- optional link to session, flag, etc.
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  resolved_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_incidents_status ON incidents(status);
CREATE INDEX IF NOT EXISTS idx_incidents_source ON incidents(source);
CREATE INDEX IF NOT EXISTS idx_incidents_severity ON incidents(severity);
