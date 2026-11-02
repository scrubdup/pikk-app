-- PIKK Vault slice 3: processing states, processing_jobs, vault_settings (pause flag, sweeper/heartbeat).
-- SQLite cannot alter a CHECK constraint, so `media` is rebuilt to add state 'processing' and probe columns.
-- media_entitlements is backed up first because DROP TABLE media cascades into it.
PRAGMA defer_foreign_keys = on;

CREATE TABLE media_entitlements_bak AS SELECT * FROM media_entitlements;

CREATE TABLE media_new (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL CHECK(media_type IN ('photo','video','audio')),
  is_story INTEGER NOT NULL DEFAULT 0 CHECK(is_story IN (0,1)),
  object_key TEXT NOT NULL UNIQUE,
  filename TEXT NOT NULL CHECK(length(filename) BETWEEN 1 AND 120),
  declared_content_type TEXT NOT NULL,
  detected_content_type TEXT,
  size_bytes INTEGER NOT NULL CHECK(size_bytes > 0),
  checksum_sha256 TEXT CHECK(checksum_sha256 IS NULL OR length(checksum_sha256) = 64),
  access_policy TEXT NOT NULL DEFAULT 'private' CHECK(access_policy IN ('private','followers','public','entitled')),
  state TEXT NOT NULL DEFAULT 'pending_upload' CHECK(state IN ('pending_upload','uploaded','processing','ready','rejected','failed','deleted')),
  last_error TEXT,
  expires_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  uploaded_at TEXT,
  ready_at TEXT,
  deleted_at TEXT,
  width INTEGER,
  height INTEGER,
  duration_ms INTEGER,
  -- No free provider for thumbnails/transcodes yet: never faked.
  thumbnail_state TEXT NOT NULL DEFAULT 'unavailable_pending_provider' CHECK(thumbnail_state IN ('unavailable_pending_provider','not_applicable','ready')),
  variants_state TEXT NOT NULL DEFAULT 'unavailable_pending_provider' CHECK(variants_state IN ('unavailable_pending_provider','not_applicable','ready'))
);
INSERT INTO media_new(id,owner_id,media_type,is_story,object_key,filename,declared_content_type,detected_content_type,size_bytes,checksum_sha256,access_policy,state,last_error,expires_at,created_at,updated_at,uploaded_at,ready_at,deleted_at)
  SELECT id,owner_id,media_type,is_story,object_key,filename,declared_content_type,detected_content_type,size_bytes,checksum_sha256,access_policy,state,last_error,expires_at,created_at,updated_at,uploaded_at,ready_at,deleted_at FROM media;
DROP TABLE media;
ALTER TABLE media_new RENAME TO media;
CREATE INDEX idx_media_owner ON media(owner_id, created_at);
CREATE INDEX idx_media_state ON media(state, updated_at);
CREATE INDEX idx_media_story_expiry ON media(is_story, expires_at) WHERE is_story = 1 AND deleted_at IS NULL;

INSERT INTO media_entitlements SELECT * FROM media_entitlements_bak;
DROP TABLE media_entitlements_bak;

CREATE TABLE processing_jobs (
  id TEXT PRIMARY KEY,
  media_id TEXT NOT NULL REFERENCES media(id) ON DELETE CASCADE,
  job_type TEXT NOT NULL CHECK(job_type IN ('probe')),
  state TEXT NOT NULL DEFAULT 'queued' CHECK(state IN ('queued','running','succeeded','failed')),
  attempts INTEGER NOT NULL DEFAULT 0 CHECK(attempts >= 0),
  max_attempts INTEGER NOT NULL DEFAULT 3 CHECK(max_attempts BETWEEN 1 AND 3),
  last_error TEXT,
  run_after TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  started_at TEXT,
  finished_at TEXT
);
CREATE INDEX idx_jobs_state ON processing_jobs(state, run_after);
CREATE INDEX idx_jobs_media ON processing_jobs(media_id);

CREATE TABLE vault_settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TEXT NOT NULL,
  updated_by TEXT
);
INSERT INTO vault_settings(key,value,updated_at) VALUES ('processing_paused','0',strftime('%Y-%m-%dT%H:%M:%fZ','now'));
