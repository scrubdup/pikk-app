-- PIKK Vault slice 4: storage management (quotas/usage), resumable multipart uploads, backup/recovery bookkeeping.
-- Numbering agreed across PRs: main 0001-0007, #234 0008, Vault 0009/0010, #336 0011-0012, #339 0013, Vault slice 4 0014.
-- Bytes stay in R2 (MEDIA); backup copies go to a separate R2 binding MEDIA_BACKUP (LOCAL PLACEHOLDER until the owner provisions it).

-- Per-user quota overrides (defaults live in src/media-config.js VAULT_QUOTA).
CREATE TABLE vault_quota_overrides (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  max_bytes INTEGER NOT NULL CHECK(max_bytes >= 0),
  reason TEXT,
  updated_by TEXT REFERENCES users(id),
  updated_at TEXT NOT NULL
);

-- R2 multipart session for a media row (one active session per media).
CREATE TABLE media_multipart (
  media_id TEXT PRIMARY KEY REFERENCES media(id) ON DELETE CASCADE,
  r2_upload_id TEXT NOT NULL,
  part_size INTEGER NOT NULL CHECK(part_size > 0),
  part_count INTEGER NOT NULL CHECK(part_count BETWEEN 1 AND 10000),
  state TEXT NOT NULL DEFAULT 'active' CHECK(state IN ('active','completed','aborted')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE TABLE media_multipart_parts (
  media_id TEXT NOT NULL REFERENCES media(id) ON DELETE CASCADE,
  part_number INTEGER NOT NULL CHECK(part_number >= 1),
  etag TEXT,
  size_bytes INTEGER,
  attempts INTEGER NOT NULL DEFAULT 0,
  last_error TEXT,
  updated_at TEXT NOT NULL,
  PRIMARY KEY(media_id, part_number)
);

-- Backup runs and per-object backup records.
CREATE TABLE vault_backup_runs (
  id TEXT PRIMARY KEY,
  trigger TEXT NOT NULL CHECK(trigger IN ('cron','admin')),
  state TEXT NOT NULL CHECK(state IN ('running','succeeded','partial','failed','skipped')),
  objects_copied INTEGER NOT NULL DEFAULT 0,
  bytes_copied INTEGER NOT NULL DEFAULT 0,
  errors INTEGER NOT NULL DEFAULT 0,
  manifest_key TEXT,
  manifest_entries INTEGER,
  message TEXT,
  started_at TEXT NOT NULL,
  finished_at TEXT
);
CREATE INDEX idx_backup_runs_started ON vault_backup_runs(started_at);
CREATE TABLE media_backups (
  media_id TEXT PRIMARY KEY,           -- no FK: backup records outlive deleted media until retention expires
  backup_key TEXT NOT NULL,
  checksum_sha256 TEXT NOT NULL,
  size_bytes INTEGER NOT NULL,
  run_id TEXT NOT NULL,
  backed_up_at TEXT NOT NULL
);
