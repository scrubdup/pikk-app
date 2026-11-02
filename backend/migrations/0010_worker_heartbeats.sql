-- PIKK Master Mind phase 2 (slice 1): durable worker heartbeats.
-- One row per worker; the worker upserts it on every run. Contains no PII: worker name,
-- timestamps, a status, a duration and a short sanitized error code only.
-- (0009 is reserved for PIKK Vault media, PR #236.)
CREATE TABLE worker_heartbeats (
  worker TEXT PRIMARY KEY CHECK(length(worker) BETWEEN 1 AND 64),
  last_beat_at TEXT NOT NULL,
  last_status TEXT NOT NULL CHECK(last_status IN ('ok','error')),
  last_duration_ms INTEGER NOT NULL DEFAULT 0 CHECK(last_duration_ms >= 0),
  last_error TEXT CHECK(last_error IS NULL OR length(last_error) <= 64),
  last_ok_at TEXT,
  run_count INTEGER NOT NULL DEFAULT 0
);
