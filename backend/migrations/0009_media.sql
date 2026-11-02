-- PIKK Vault slice 1: media metadata. Bytes live in R2 (binding MEDIA); D1 holds metadata only.
-- LOCAL ONLY until the owner provisions R2 on a permanent Cloudflare account.
CREATE TABLE media (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL CHECK(media_type IN ('photo','video','audio')),
  is_story INTEGER NOT NULL DEFAULT 0 CHECK(is_story IN (0,1)),
  object_key TEXT NOT NULL UNIQUE,
  filename TEXT NOT NULL CHECK(length(filename) BETWEEN 1 AND 120),  -- sanitized server-side
  declared_content_type TEXT NOT NULL,
  detected_content_type TEXT,
  size_bytes INTEGER NOT NULL CHECK(size_bytes > 0),
  checksum_sha256 TEXT CHECK(checksum_sha256 IS NULL OR length(checksum_sha256) = 64),
  access_policy TEXT NOT NULL DEFAULT 'private' CHECK(access_policy IN ('private','followers','public','entitled')),
  state TEXT NOT NULL DEFAULT 'pending_upload' CHECK(state IN ('pending_upload','uploaded','ready','rejected','failed','deleted')),
  last_error TEXT,
  expires_at TEXT,           -- Stories only
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  uploaded_at TEXT,
  ready_at TEXT,
  deleted_at TEXT
);
CREATE INDEX idx_media_owner ON media(owner_id, created_at);
CREATE INDEX idx_media_state ON media(state, updated_at);

CREATE TABLE media_entitlements (
  media_id TEXT NOT NULL REFERENCES media(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  source TEXT NOT NULL CHECK(source IN ('grant','purchase','subscription')),
  granted_by TEXT REFERENCES users(id),
  order_id TEXT,             -- set only from verified payment webhooks (future slice)
  created_at TEXT NOT NULL,
  expires_at TEXT,
  PRIMARY KEY(media_id, user_id)
);
CREATE INDEX idx_media_ent_user ON media_entitlements(user_id);
