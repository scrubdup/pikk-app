CREATE TABLE IF NOT EXISTS vault_shares (
  id TEXT PRIMARY KEY,
  object_id TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_vault_shares_token ON vault_shares(token);
CREATE INDEX IF NOT EXISTS idx_vault_shares_object ON vault_shares(object_id);
