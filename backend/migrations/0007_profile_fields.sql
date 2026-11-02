-- PIKK backend 0007: persistent public profile fields.
ALTER TABLE users ADD COLUMN bio TEXT NOT NULL DEFAULT '' CHECK(length(bio) <= 280);
ALTER TABLE users ADD COLUMN avatar_url TEXT NOT NULL DEFAULT '' CHECK(length(avatar_url) <= 500);
