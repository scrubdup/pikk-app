-- PIKK backend foundation 0002: first-party auth, roles, social graph, posts,
-- append-only double-entry ledger, deduplicated payment events, audit log.
-- Builds on 0001_core.sql (PR #169). Local/test only until owner approves deploy.

CREATE TABLE credentials (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  email TEXT NOT NULL COLLATE NOCASE UNIQUE,
  password_hash TEXT NOT NULL,          -- base64 PBKDF2-SHA256 derived key
  password_salt TEXT NOT NULL,          -- base64 16 random bytes
  password_iterations INTEGER NOT NULL CHECK(password_iterations >= 100000),
  email_verified_at TEXT,
  updated_at TEXT NOT NULL
);

CREATE TABLE email_verifications (
  token_hash TEXT PRIMARY KEY,          -- SHA-256 of token; raw token never stored
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL,
  used_at TEXT
);

CREATE TABLE sessions (
  id_hash TEXT PRIMARY KEY,             -- SHA-256 of cookie token
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  revoked_at TEXT,
  ip TEXT,
  user_agent TEXT
);
CREATE INDEX idx_sessions_user ON sessions(user_id);

CREATE TABLE roles (
  name TEXT PRIMARY KEY CHECK(name IN ('member','creator','moderator','admin'))
);
INSERT INTO roles(name) VALUES ('member'),('creator'),('moderator'),('admin');
CREATE TABLE user_roles (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL REFERENCES roles(name),
  granted_by TEXT REFERENCES users(id),
  granted_at TEXT NOT NULL,
  PRIMARY KEY(user_id, role)
);

CREATE TABLE follows (
  follower_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  followee_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL,
  PRIMARY KEY(follower_id, followee_id),
  CHECK(follower_id <> followee_id)
);
CREATE INDEX idx_follows_followee ON follows(followee_id);
CREATE TABLE blocks (
  blocker_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  blocked_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL,
  PRIMARY KEY(blocker_id, blocked_id),
  CHECK(blocker_id <> blocked_id)
);

CREATE TABLE posts (
  id TEXT PRIMARY KEY,
  author_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  kind TEXT NOT NULL CHECK(kind IN ('text','photo','video','poll','link')),
  body TEXT NOT NULL CHECK(length(body) BETWEEN 1 AND 5000),
  created_at TEXT NOT NULL,
  deleted_at TEXT
);
CREATE INDEX idx_posts_author ON posts(author_id, created_at);

-- Payment events: dedupe by provider + provider_event_id. Replaces 0001 table
-- (unused, empty) to add provider, payload digest and processing state.
DROP TABLE payment_events;
CREATE TABLE payment_events (
  id TEXT PRIMARY KEY,
  provider TEXT NOT NULL CHECK(provider IN ('stripe')),
  provider_event_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  order_id TEXT REFERENCES payment_orders(id),
  payload_sha256 TEXT NOT NULL,
  signature_verified INTEGER NOT NULL CHECK(signature_verified = 1),
  received_at TEXT NOT NULL,
  processed_at TEXT,
  outcome TEXT,
  UNIQUE(provider, provider_event_id)
);

-- Double-entry ledger. Amounts in integer minor units (coins/cents).
CREATE TABLE ledger_accounts (
  id TEXT PRIMARY KEY,
  kind TEXT NOT NULL CHECK(kind IN ('user','external','platform')),
  user_id TEXT UNIQUE REFERENCES users(id),
  currency TEXT NOT NULL DEFAULT 'pikk_coin',
  created_at TEXT NOT NULL,
  CHECK((kind = 'user') = (user_id IS NOT NULL))
);
INSERT INTO ledger_accounts(id, kind, currency, created_at) VALUES
  ('acct_external_stripe', 'external', 'pikk_coin', '2026-10-31T00:00:00Z'),
  ('acct_platform_fees',   'platform', 'pikk_coin', '2026-10-31T00:00:00Z');

CREATE TABLE ledger_transactions (
  id TEXT PRIMARY KEY,
  kind TEXT NOT NULL CHECK(kind IN ('purchase','transfer','refund')),
  payment_event_id TEXT UNIQUE REFERENCES payment_events(id),
  initiated_by TEXT REFERENCES users(id),
  memo TEXT,
  created_at TEXT NOT NULL,
  CHECK(kind = 'transfer' OR payment_event_id IS NOT NULL)
);

CREATE TABLE ledger_entries (
  id TEXT PRIMARY KEY,
  transaction_id TEXT NOT NULL REFERENCES ledger_transactions(id),
  account_id TEXT NOT NULL REFERENCES ledger_accounts(id),
  amount INTEGER NOT NULL CHECK(amount <> 0),   -- +credit / -debit
  created_at TEXT NOT NULL
);
CREATE INDEX idx_ledger_entries_account ON ledger_entries(account_id);
CREATE INDEX idx_ledger_entries_txn ON ledger_entries(transaction_id);

-- Append-only.
CREATE TRIGGER ledger_entries_no_update BEFORE UPDATE ON ledger_entries
BEGIN SELECT RAISE(ABORT, 'ledger_entries is append-only'); END;
CREATE TRIGGER ledger_entries_no_delete BEFORE DELETE ON ledger_entries
BEGIN SELECT RAISE(ABORT, 'ledger_entries is append-only'); END;
CREATE TRIGGER ledger_transactions_no_update BEFORE UPDATE ON ledger_transactions
BEGIN SELECT RAISE(ABORT, 'ledger_transactions is append-only'); END;
CREATE TRIGGER ledger_transactions_no_delete BEFORE DELETE ON ledger_transactions
BEGIN SELECT RAISE(ABORT, 'ledger_transactions is append-only'); END;

-- User balances can never go negative.
CREATE TRIGGER ledger_no_negative_user_balance BEFORE INSERT ON ledger_entries
WHEN (SELECT kind FROM ledger_accounts WHERE id = NEW.account_id) = 'user'
 AND (SELECT COALESCE(SUM(amount), 0) FROM ledger_entries WHERE account_id = NEW.account_id) + NEW.amount < 0
BEGIN SELECT RAISE(ABORT, 'insufficient_funds'); END;

-- New value may only enter from the external account inside a purchase/refund
-- transaction bound to a signature-verified payment event.
CREATE TRIGGER ledger_external_requires_verified_event BEFORE INSERT ON ledger_entries
WHEN (SELECT kind FROM ledger_accounts WHERE id = NEW.account_id) = 'external'
 AND NOT EXISTS (
   SELECT 1 FROM ledger_transactions t JOIN payment_events e ON e.id = t.payment_event_id
   WHERE t.id = NEW.transaction_id AND t.kind IN ('purchase','refund') AND e.signature_verified = 1)
BEGIN SELECT RAISE(ABORT, 'external_entry_requires_verified_payment_event'); END;

CREATE TABLE audit_log (
  id TEXT PRIMARY KEY,
  actor_id TEXT REFERENCES users(id),
  action TEXT NOT NULL,
  target TEXT,
  ip TEXT,
  meta TEXT,
  created_at TEXT NOT NULL
);
CREATE INDEX idx_audit_created ON audit_log(created_at);
CREATE TRIGGER audit_log_no_update BEFORE UPDATE ON audit_log
BEGIN SELECT RAISE(ABORT, 'audit_log is append-only'); END;
CREATE TRIGGER audit_log_no_delete BEFORE DELETE ON audit_log
BEGIN SELECT RAISE(ABORT, 'audit_log is append-only'); END;

CREATE TABLE rate_limits (
  bucket TEXT NOT NULL,
  window_start INTEGER NOT NULL,
  count INTEGER NOT NULL,
  PRIMARY KEY(bucket, window_start)
);
