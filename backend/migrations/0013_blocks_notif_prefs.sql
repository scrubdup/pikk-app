CREATE TABLE IF NOT EXISTS blocks (
  blocker_id INTEGER NOT NULL,
  blocked_id INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  PRIMARY KEY (blocker_id, blocked_id)
);

CREATE TABLE IF NOT EXISTS notification_prefs (
  user_id INTEGER PRIMARY KEY,
  gifts INTEGER NOT NULL DEFAULT 1,
  follows INTEGER NOT NULL DEFAULT 1,
  payouts INTEGER NOT NULL DEFAULT 1,
  moderation INTEGER NOT NULL DEFAULT 1,
  system INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL
);
