-- Pluggable ID/age verification sessions. Stores ONLY provider, provider reference and status.
-- Never ID images, document numbers, names or date of birth.
ALTER TABLE users ADD COLUMN age_verification_ref TEXT;
CREATE TABLE id_verification_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  provider TEXT NOT NULL,
  provider_ref TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('pending','verified','declined','needs_review','expired')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(provider, provider_ref)
);
CREATE INDEX id_verification_sessions_user ON id_verification_sessions(user_id, created_at);
CREATE TABLE id_verification_events (
  provider TEXT NOT NULL,
  event_id TEXT NOT NULL,
  received_at TEXT NOT NULL,
  PRIMARY KEY(provider, event_id)
);
