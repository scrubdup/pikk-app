-- PIKK Master Mind - Offline Command Center: local task/error/progress/approval DB (SQLite).
-- Local only. Never contains secrets. Not a D1 migration and never applied to pikk-db.
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS tasks (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  agent       TEXT,                       -- local agent currently assigned (e.g. backend, design)
  branch      TEXT,                       -- git branch holding the work (never main)
  status      TEXT NOT NULL DEFAULT 'open'
              CHECK (status IN ('open','claimed','blocked','gate_passed','gate_failed','approved','synced','done')),
  created_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
  updated_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now'))
);

CREATE TABLE IF NOT EXISTS handoffs (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  task_id    INTEGER NOT NULL REFERENCES tasks(id),
  from_agent TEXT,
  to_agent   TEXT NOT NULL,
  note       TEXT NOT NULL DEFAULT '',
  at         TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now'))
);

CREATE TABLE IF NOT EXISTS errors (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  task_id  INTEGER REFERENCES tasks(id),
  agent    TEXT,
  message  TEXT NOT NULL,
  at       TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now'))
);

CREATE TABLE IF NOT EXISTS progress (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  task_id  INTEGER NOT NULL REFERENCES tasks(id),
  agent    TEXT,
  note     TEXT NOT NULL,
  percent  INTEGER CHECK (percent IS NULL OR (percent BETWEEN 0 AND 100)),
  at       TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now'))
);

-- One row per test-gate run. commit_sha pins exactly what was tested.
CREATE TABLE IF NOT EXISTS gate_runs (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  task_id     INTEGER NOT NULL REFERENCES tasks(id),
  branch      TEXT,
  commit_sha  TEXT,
  result      TEXT NOT NULL CHECK (result IN ('pass','fail')),
  details     TEXT NOT NULL DEFAULT '',
  at          TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now'))
);

-- Owner approval. Only written after a passing gate run AND an interactive owner confirmation.
CREATE TABLE IF NOT EXISTS approvals (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  task_id      INTEGER NOT NULL REFERENCES tasks(id),
  gate_run_id  INTEGER NOT NULL REFERENCES gate_runs(id),
  branch       TEXT,
  commit_sha   TEXT,
  approved_by  TEXT NOT NULL,
  at           TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now'))
);
