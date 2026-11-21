-- Vault object metadata registry
-- Tracks intended media objects even before R2 is fully wired

CREATE TABLE IF NOT EXISTS vault_objects (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  key TEXT NOT NULL UNIQUE,
  filename TEXT NOT NULL,
  content_type TEXT,
  size_bytes INTEGER,
  status TEXT NOT NULL DEFAULT 'pending',  -- pending | uploaded | failed | deleted
  visibility TEXT NOT NULL DEFAULT 'private', -- private | unlisted | public
  meta TEXT,                               -- JSON
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_vault_user ON vault_objects(user_id);
CREATE INDEX IF NOT EXISTS idx_vault_status ON vault_objects(status);
CREATE INDEX IF NOT EXISTS idx_vault_key ON vault_objects(key);
