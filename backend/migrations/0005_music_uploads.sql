-- PIKK backend 0005: creator-owned music upload metadata.
-- Audio bytes live in object storage (R2 MEDIA binding); D1 stores ownership/status only.
CREATE TABLE media_assets (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  kind TEXT NOT NULL CHECK(kind IN ('music')),
  storage_key TEXT NOT NULL UNIQUE,
  original_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size_bytes INTEGER NOT NULL CHECK(size_bytes > 0),
  status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','published','deleted')),
  created_at TEXT NOT NULL,
  published_at TEXT,
  deleted_at TEXT
);
CREATE INDEX idx_media_assets_owner ON media_assets(owner_id,status,created_at);

CREATE TABLE music_tracks (
  media_id TEXT PRIMARY KEY REFERENCES media_assets(id) ON DELETE CASCADE,
  title TEXT NOT NULL CHECK(length(title) BETWEEN 1 AND 160),
  artist_name TEXT NOT NULL CHECK(length(artist_name) BETWEEN 1 AND 120),
  album_title TEXT CHECK(album_title IS NULL OR length(album_title) <= 160),
  genre TEXT CHECK(genre IS NULL OR length(genre) <= 80),
  rights_certified INTEGER NOT NULL CHECK(rights_certified = 1),
  explicit_content INTEGER NOT NULL DEFAULT 0 CHECK(explicit_content IN (0,1))
);
