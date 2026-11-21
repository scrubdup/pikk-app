-- Payments, Support, Moderation & Supervisor foundations
-- Apply after 0003_shield_incidents.sql

-- ===================== PAYMENTS & PAYOUTS =====================

CREATE TABLE IF NOT EXISTS wallets (
  user_id INTEGER PRIMARY KEY,
  balance_cents INTEGER NOT NULL DEFAULT 0,          -- available balance in cents
  pending_cents INTEGER NOT NULL DEFAULT 0,          -- held / pending
  currency TEXT NOT NULL DEFAULT 'USD',
  updated_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  type TEXT NOT NULL,                -- deposit | purchase | gift_sent | gift_received | payout | refund | adjustment
  amount_cents INTEGER NOT NULL,     -- positive = credit, negative = debit
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'pending', -- pending | completed | failed | reversed
  description TEXT,
  related_id TEXT,                   -- gift id, payout id, etc.
  meta TEXT,                         -- JSON
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_tx_user ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_tx_type ON transactions(type);
CREATE INDEX IF NOT EXISTS idx_tx_status ON transactions(status);

CREATE TABLE IF NOT EXISTS payouts (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'requested', -- requested | processing | paid | failed | cancelled
  method TEXT,                             -- bank | paypal | stripe | other
  destination_ref TEXT,                    -- last4 or external ref (never full secrets)
  failure_reason TEXT,
  requested_at TEXT NOT NULL,
  processed_at TEXT,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_payouts_user ON payouts(user_id);
CREATE INDEX IF NOT EXISTS idx_payouts_status ON payouts(status);

-- ===================== AI SUPPORT =====================

CREATE TABLE IF NOT EXISTS support_tickets (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  subject TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',     -- open | pending | resolved | closed
  priority TEXT NOT NULL DEFAULT 'normal', -- low | normal | high | urgent
  category TEXT,                           -- account | billing | technical | safety | other
  assigned_to TEXT,                        -- bot | human | null
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  resolved_at TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_tickets_user ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON support_tickets(status);

CREATE TABLE IF NOT EXISTS support_messages (
  id TEXT PRIMARY KEY,
  ticket_id TEXT NOT NULL,
  sender_type TEXT NOT NULL,               -- user | ai | agent | system
  sender_id INTEGER,                       -- user id or null
  body TEXT NOT NULL,
  meta TEXT,                               -- JSON (model, confidence, etc.)
  created_at TEXT NOT NULL,
  FOREIGN KEY (ticket_id) REFERENCES support_tickets(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_support_msg_ticket ON support_messages(ticket_id);

-- ===================== TRUST & SAFETY =====================

CREATE TABLE IF NOT EXISTS moderation_actions (
  id TEXT PRIMARY KEY,
  target_type TEXT NOT NULL,               -- user | content | broadcast
  target_id TEXT NOT NULL,
  action TEXT NOT NULL,                    -- warn | restrict | suspend | ban | remove_content | restore
  reason TEXT,
  duration_hours INTEGER,                  -- null = permanent
  performed_by INTEGER,                    -- admin user id or null (system)
  related_flag_id TEXT,
  created_at TEXT NOT NULL,
  expires_at TEXT,
  FOREIGN KEY (performed_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_mod_target ON moderation_actions(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_mod_action ON moderation_actions(action);

CREATE TABLE IF NOT EXISTS appeals (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  action_id TEXT NOT NULL,
  statement TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',  -- pending | approved | denied
  reviewed_by INTEGER,
  review_notes TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (action_id) REFERENCES moderation_actions(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_appeals_status ON appeals(status);

-- ===================== SUPERVISOR =====================

CREATE TABLE IF NOT EXISTS supervisor_jobs (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,                      -- health_check | retry_destination | review_flag | payout_process | other
  status TEXT NOT NULL DEFAULT 'queued',   -- queued | running | succeeded | failed | cancelled
  priority INTEGER NOT NULL DEFAULT 50,    -- lower = higher priority
  payload TEXT,                            -- JSON
  result TEXT,                             -- JSON
  attempts INTEGER NOT NULL DEFAULT 0,
  max_attempts INTEGER NOT NULL DEFAULT 3,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  started_at TEXT,
  finished_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_jobs_status ON supervisor_jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_type ON supervisor_jobs(type);
CREATE INDEX IF NOT EXISTS idx_jobs_priority ON supervisor_jobs(priority);
