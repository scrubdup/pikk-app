-- PIKK backend foundation (Cloudflare D1 / SQLite).
-- Schema only: no production service, authentication, streaming or payments are enabled.
PRAGMA foreign_keys = ON;

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  auth_subject TEXT NOT NULL UNIQUE,
  handle TEXT NOT NULL COLLATE NOCASE UNIQUE,
  display_name TEXT NOT NULL,
  account_type TEXT NOT NULL CHECK(account_type IN ('member','creator','artist','streamer','seller')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  disabled_at TEXT
);
CREATE INDEX idx_users_created ON users(created_at);

CREATE TABLE conversations (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE conversation_members (
  conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  joined_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_read_message_id TEXT,
  PRIMARY KEY(conversation_id,user_id)
);
CREATE INDEX idx_members_user ON conversation_members(user_id);
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id TEXT NOT NULL REFERENCES users(id),
  body TEXT NOT NULL CHECK(length(body) BETWEEN 1 AND 4000),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TEXT
);
CREATE INDEX idx_messages_thread ON messages(conversation_id,created_at,id);
-- Application must enforce sender membership and per-conversation authorization.

CREATE TABLE live_sessions (
  id TEXT PRIMARY KEY,
  host_id TEXT NOT NULL REFERENCES users(id),
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK(status IN ('scheduled','live','ended')),
  provider_stream_id TEXT UNIQUE,
  started_at TEXT,
  ended_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_live_host ON live_sessions(host_id,status);

CREATE TABLE payment_orders (
  id TEXT PRIMARY KEY,
  buyer_id TEXT NOT NULL REFERENCES users(id),
  seller_id TEXT REFERENCES users(id),
  kind TEXT NOT NULL CHECK(kind IN ('music','merch','subscription','coins','donation')),
  amount_cents INTEGER NOT NULL CHECK(amount_cents > 0),
  currency TEXT NOT NULL DEFAULT 'usd',
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','paid','failed','refunded','cancelled')),
  provider TEXT NOT NULL DEFAULT 'stripe',
  provider_payment_id TEXT UNIQUE,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  paid_at TEXT
);
CREATE INDEX idx_orders_buyer ON payment_orders(buyer_id,created_at);
CREATE TABLE payment_events (
  provider_event_id TEXT PRIMARY KEY,
  order_id TEXT REFERENCES payment_orders(id),
  event_type TEXT NOT NULL,
  received_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- Payment state must be changed ONLY after verified provider webhooks,
-- using idempotent provider_event_id, never browser-supplied paid flags.
