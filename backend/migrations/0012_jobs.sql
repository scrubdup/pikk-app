-- PIKK Master Mind phase 2 (slice 2): durable job records. No PII: kind, idempotency key,
-- state, attempt counts, schedule and a short sanitized error code only. No input payloads.
CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  kind TEXT NOT NULL CHECK(length(kind) BETWEEN 1 AND 64),
  idempotency_key TEXT NOT NULL UNIQUE CHECK(length(idempotency_key) BETWEEN 1 AND 128),
  state TEXT NOT NULL DEFAULT 'queued' CHECK(state IN ('queued','running','succeeded','failed','dead')),
  attempts INTEGER NOT NULL DEFAULT 0 CHECK(attempts >= 0),
  max_attempts INTEGER NOT NULL DEFAULT 3 CHECK(max_attempts BETWEEN 1 AND 20),
  next_run_at TEXT NOT NULL,
  last_error_code TEXT CHECK(last_error_code IS NULL OR length(last_error_code) <= 64),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_jobs_state_next ON jobs(state, next_run_at);
CREATE INDEX IF NOT EXISTS idx_jobs_updated ON jobs(updated_at);
