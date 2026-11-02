-- PIKK backend 0003: Trust & Safety permissions (per docs/safety.md, PIKK Safety 2026-10-31).
-- Roles: user (base), creator, moderator, support_agent, admin, dmca. Staff roles granted only by admin (API) and audited.
PRAGMA defer_foreign_keys = ON;

CREATE TABLE roles_v3 (
  name TEXT PRIMARY KEY CHECK(name IN ('user','creator','moderator','support_agent','admin','dmca')),
  is_staff INTEGER NOT NULL CHECK(is_staff IN (0,1))
);
INSERT INTO roles_v3(name, is_staff) VALUES ('user',0),('creator',0),('moderator',1),('support_agent',1),('admin',1),('dmca',1);
UPDATE user_roles SET role = 'user' WHERE role = 'member';
DROP TABLE roles;
ALTER TABLE roles_v3 RENAME TO roles;

-- Account restrictions + server-only age verification result (no ID images, ever).
ALTER TABLE users ADD COLUMN muted_until TEXT;
ALTER TABLE users ADD COLUMN suspended_until TEXT;
ALTER TABLE users ADD COLUMN banned_at TEXT;
ALTER TABLE users ADD COLUMN age_verified_18 INTEGER NOT NULL DEFAULT 0 CHECK(age_verified_18 IN (0,1));
ALTER TABLE users ADD COLUMN age_verification_method TEXT;
ALTER TABLE users ADD COLUMN age_verified_at TEXT;
CREATE TRIGGER users_age_verification_complete BEFORE UPDATE OF age_verified_18 ON users
WHEN NEW.age_verified_18 = 1 AND (NEW.age_verification_method IS NULL OR NEW.age_verified_at IS NULL)
BEGIN SELECT RAISE(ABORT, 'age_verification_requires_method_and_date'); END;

CREATE TABLE age_verification_events (
  id TEXT PRIMARY KEY,
  vendor TEXT NOT NULL,
  vendor_event_id TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id),
  method TEXT NOT NULL,
  result TEXT NOT NULL CHECK(result IN ('verified_adult','not_verified')),
  received_at TEXT NOT NULL,
  UNIQUE(vendor, vendor_event_id)
);

CREATE TABLE reports (
  id TEXT PRIMARY KEY,
  reporter_id TEXT NOT NULL REFERENCES users(id),
  target_type TEXT NOT NULL CHECK(target_type IN ('user','post','message','live','room','listing','dating_profile','roast')),
  target_id TEXT NOT NULL,
  category TEXT NOT NULL CHECK(category IN ('csam','ncii','self_harm','threat','harassment','hate','sexual','violence','spam','impersonation','underage','copyright','fraud','other')),
  details TEXT CHECK(details IS NULL OR length(details) <= 2000),
  priority INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK(status IN ('open','resolved','dismissed')),
  resolved_by TEXT REFERENCES users(id),
  resolution TEXT,
  created_at TEXT NOT NULL,
  resolved_at TEXT
);
CREATE UNIQUE INDEX uq_reports_open ON reports(reporter_id, target_type, target_id) WHERE status = 'open';
CREATE INDEX idx_reports_queue ON reports(status, priority, created_at);

CREATE TABLE moderation_actions (
  id TEXT PRIMARY KEY,
  actor_id TEXT NOT NULL REFERENCES users(id),
  target_user_id TEXT NOT NULL REFERENCES users(id),
  action TEXT NOT NULL CHECK(action IN ('remove_content','mute','suspend','ban','ban_permanent','restore')),
  content_type TEXT CHECK(content_type IS NULL OR content_type IN ('post')),
  content_id TEXT,
  reason TEXT NOT NULL CHECK(length(reason) BETWEEN 3 AND 1000),
  report_id TEXT REFERENCES reports(id),
  reverses_action_id TEXT REFERENCES moderation_actions(id),
  expires_at TEXT,
  created_at TEXT NOT NULL
);
CREATE INDEX idx_modactions_target ON moderation_actions(target_user_id, created_at);
CREATE TRIGGER moderation_actions_no_update BEFORE UPDATE ON moderation_actions
BEGIN SELECT RAISE(ABORT, 'moderation_actions is append-only'); END;
CREATE TRIGGER moderation_actions_no_delete BEFORE DELETE ON moderation_actions
BEGIN SELECT RAISE(ABORT, 'moderation_actions is append-only'); END;

CREATE TABLE appeals (
  id TEXT PRIMARY KEY,
  action_id TEXT NOT NULL UNIQUE REFERENCES moderation_actions(id),
  appellant_id TEXT NOT NULL REFERENCES users(id),
  body TEXT NOT NULL CHECK(length(body) BETWEEN 1 AND 2000),
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','upheld','overturned')),
  reviewer_id TEXT REFERENCES users(id),
  decision_reason TEXT,
  created_at TEXT NOT NULL,
  decided_at TEXT
);

CREATE TABLE tickets (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  category TEXT NOT NULL CHECK(category IN ('account','payments','safety','technical','other')),
  subject TEXT NOT NULL CHECK(length(subject) BETWEEN 1 AND 200),
  status TEXT NOT NULL DEFAULT 'open' CHECK(status IN ('open','pending_user','closed')),
  created_at TEXT NOT NULL
);
CREATE TABLE ticket_messages (
  id TEXT PRIMARY KEY,
  ticket_id TEXT NOT NULL REFERENCES tickets(id),
  author_id TEXT NOT NULL REFERENCES users(id),
  is_staff INTEGER NOT NULL CHECK(is_staff IN (0,1)),
  body TEXT NOT NULL CHECK(length(body) BETWEEN 1 AND 5000),
  created_at TEXT NOT NULL
);

-- DMCA §512(c)(3)-style notices. Legal review required before production use.
CREATE TABLE takedowns (
  id TEXT PRIMARY KEY,
  submitted_by TEXT REFERENCES users(id),
  claimant_name TEXT NOT NULL,
  claimant_email TEXT NOT NULL,
  work_description TEXT NOT NULL,
  target_type TEXT NOT NULL CHECK(target_type IN ('post')),
  target_id TEXT NOT NULL,
  good_faith_statement INTEGER NOT NULL CHECK(good_faith_statement = 1),
  accuracy_statement INTEGER NOT NULL CHECK(accuracy_statement = 1),
  signature TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'received' CHECK(status IN ('received','actioned','rejected')),
  reviewer_id TEXT REFERENCES users(id),
  decision_reason TEXT,
  created_at TEXT NOT NULL,
  decided_at TEXT
);

CREATE TABLE roast_invites (
  id TEXT PRIMARY KEY,
  inviter_id TEXT NOT NULL REFERENCES users(id),
  invitee_id TEXT NOT NULL REFERENCES users(id),
  mode TEXT NOT NULL CHECK(mode IN ('roast_1v1','battle')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','accepted','declined')),
  inviter_consent_at TEXT NOT NULL,
  invitee_consent_at TEXT,
  created_at TEXT NOT NULL,
  CHECK(inviter_id <> invitee_id),
  CHECK(status <> 'accepted' OR invitee_consent_at IS NOT NULL)
);
