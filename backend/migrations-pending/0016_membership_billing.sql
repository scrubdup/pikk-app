-- 0016 membership billing. LOCAL / TEST ONLY. PENDING OWNER APPROVAL.
-- Deliberately NOT in migrations/: Workers Builds on main runs `wrangler d1 migrations apply DB --remote`
-- (scripts/migrate-if-main.mjs) on migrations/ only, so this file is never applied to production by a merge.
-- Promotion = owner-approved `git mv migrations-pending/0016_membership_billing.sql migrations/` + review.
-- Additive only: two new tables, indexes and triggers. No existing table or row is changed.
-- No prices, intervals, trials or benefits are stored here: those live in Stripe and in the owner-approved
-- MEMBERSHIP_CATALOG config, which the Worker validates strictly (src/membership-config.js).

-- One row per server-created Stripe Checkout Session (subscription mode). user_id is set from the session cookie.
CREATE TABLE membership_checkouts (
  id TEXT PRIMARY KEY,                          -- also client_reference_id + metadata on the Stripe session
  user_id TEXT NOT NULL REFERENCES users(id),
  plan_id TEXT NOT NULL,
  stripe_price_id TEXT NOT NULL,
  livemode INTEGER NOT NULL CHECK(livemode IN (0,1)),
  status TEXT NOT NULL CHECK(status IN ('open','completed','expired','failed')),
  stripe_session_id TEXT UNIQUE,
  checkout_url TEXT,
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  completed_at TEXT,
  -- Owner resync bookkeeping (MB-4): rotation + cross-pass completion. needs_review rows are excluded from resync.
  resync_attempted_at_ms INTEGER,
  resync_ok_at_ms INTEGER,               -- start time of the last SUCCESSFUL Stripe read
  needs_review TEXT
);
-- At most one open checkout per user (blocks concurrent double-checkout races at the DB level).
CREATE UNIQUE INDEX uq_membership_checkout_open ON membership_checkouts(user_id) WHERE status = 'open';
CREATE INDEX idx_membership_checkouts_user ON membership_checkouts(user_id, created_at);
-- Binding to a Stripe session/subscription is write-once.
CREATE TRIGGER membership_checkout_bind_once BEFORE UPDATE ON membership_checkouts
WHEN (OLD.stripe_session_id IS NOT NULL AND NEW.stripe_session_id IS NOT OLD.stripe_session_id)
  OR (OLD.stripe_subscription_id IS NOT NULL AND NEW.stripe_subscription_id IS NOT OLD.stripe_subscription_id)
  OR NEW.user_id IS NOT OLD.user_id OR NEW.plan_id IS NOT OLD.plan_id OR NEW.stripe_price_id IS NOT OLD.stripe_price_id
BEGIN SELECT RAISE(ABORT, 'membership_checkout_binding_immutable'); END;

-- Latest Stripe subscription state, synced ONLY from a Stripe API read triggered by a signature-verified webhook.
CREATE TABLE membership_subscriptions (
  stripe_subscription_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  checkout_id TEXT NOT NULL UNIQUE REFERENCES membership_checkouts(id),
  plan_id TEXT NOT NULL,
  stripe_price_id TEXT NOT NULL,                -- price the checkout was created for (immutable)
  current_price_id TEXT,                        -- price on the subscription at last sync
  current_quantity INTEGER,
  stripe_customer_id TEXT NOT NULL,
  livemode INTEGER NOT NULL CHECK(livemode IN (0,1)),
  status TEXT NOT NULL CHECK(status IN ('incomplete','incomplete_expired','trialing','active','past_due','canceled','unpaid','paused')),
  current_period_end INTEGER,                   -- unix seconds, from Stripe
  cancel_at_period_end INTEGER NOT NULL DEFAULT 0 CHECK(cancel_at_period_end IN (0,1)),
  synced_at_ms INTEGER NOT NULL,                -- start time of the Stripe API read (last-started read wins)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  -- Owner resync bookkeeping (MB-4). needs_review (e.g. stripe_not_found) is never entitled and excluded from resync.
  resync_attempted_at_ms INTEGER,
  resync_ok_at_ms INTEGER,
  needs_review TEXT
);
CREATE INDEX idx_membership_subs_user ON membership_subscriptions(user_id, status);
-- canceled / incomplete_expired are terminal in Stripe: never revert. Identity columns never change.
CREATE TRIGGER membership_subs_terminal BEFORE UPDATE ON membership_subscriptions
WHEN (OLD.status IN ('canceled','incomplete_expired') AND NEW.status IS NOT OLD.status)
  OR NEW.user_id IS NOT OLD.user_id OR NEW.checkout_id IS NOT OLD.checkout_id OR NEW.plan_id IS NOT OLD.plan_id
  OR NEW.stripe_price_id IS NOT OLD.stripe_price_id OR NEW.stripe_customer_id IS NOT OLD.stripe_customer_id
  OR NEW.livemode IS NOT OLD.livemode
BEGIN SELECT RAISE(ABORT, 'membership_subscription_immutable'); END;
CREATE TRIGGER membership_subs_no_delete BEFORE DELETE ON membership_subscriptions
BEGIN SELECT RAISE(ABORT, 'membership_subscriptions is append/update-only'); END;
