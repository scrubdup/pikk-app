-- User enforcement fields for Trust & Safety
ALTER TABLE users ADD COLUMN muted_until TEXT;
ALTER TABLE users ADD COLUMN suspended_until TEXT;
ALTER TABLE users ADD COLUMN banned_at TEXT;
