-- PIKK password recovery tokens. Additive; separate from email_verifications
-- (verify-email proves mailbox ownership; these authorize a credential change).
-- Raw tokens are never stored — only SHA-256 hashes. HOLD: local/tests until owner
-- approves applying this migration to production pikk-db.
CREATE TABLE password_reset_tokens (
  token_hash TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  used_at TEXT,
  requested_ip TEXT
);
CREATE INDEX idx_password_reset_user ON password_reset_tokens(user_id, created_at);
