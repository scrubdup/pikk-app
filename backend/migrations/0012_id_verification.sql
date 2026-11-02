-- Pluggable ID/age verification sessions. Stores ONLY provider, provider reference and status.
-- Never ID images, document numbers, names or date of birth.
ALTER TABLE users ADD COLUMN age_verification_ref TEXT;
CREATE TABLE id_verification_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  provider TEXT NOT NULL,
  provider_ref TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('pending','verified','declined','needs_review','expired')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(provider, provider_ref)
);
CREATE INDEX id_verification_sessions_user ON id_verification_sessions(user_id, created_at);
CREATE TABLE id_verification_events (
  provider TEXT NOT NULL,
  event_id TEXT NOT NULL,
  received_at TEXT NOT NULL,
  PRIMARY KEY(provider, event_id)
);

-- Written biometric consent (BIPA 740 ILCS 14/15, Texas Bus. & Com. Code 503.001, Washington RCW 19.375).
CREATE TABLE biometric_consents (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  consent_version TEXT NOT NULL,
  consent_sha256 TEXT NOT NULL,
  signature_name TEXT NOT NULL,
  ip_sha256 TEXT,
  consented_at TEXT NOT NULL,
  UNIQUE(user_id, consent_version)
);

-- Twerk Contest: contestants need server age_verified_18; viewers/voters do not.
CREATE TABLE contest_entries (
  id TEXT PRIMARY KEY,
  contest TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id),
  kind TEXT NOT NULL CHECK(kind IN ('upload','live')),
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending_review',
  created_at TEXT NOT NULL
);
CREATE INDEX contest_entries_contest ON contest_entries(contest, created_at);
CREATE TABLE contest_votes (
  entry_id TEXT NOT NULL REFERENCES contest_entries(id),
  voter_id TEXT NOT NULL REFERENCES users(id),
  created_at TEXT NOT NULL,
  PRIMARY KEY(entry_id, voter_id)
);

-- Account gender (self-declared, server-stored; NOT read from ID documents). Used for women-only contests.
ALTER TABLE users ADD COLUMN gender TEXT CHECK(gender IN ('female','male','nonbinary','undisclosed'));
ALTER TABLE users ADD COLUMN gender_set_at TEXT;
