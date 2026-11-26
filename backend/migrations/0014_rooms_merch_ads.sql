-- Group/text rooms, merch catalog, ad campaigns (control plane)

CREATE TABLE IF NOT EXISTS rooms (
  id TEXT PRIMARY KEY,
  topic_id TEXT NOT NULL,
  section TEXT NOT NULL,
  title TEXT NOT NULL,
  mode TEXT NOT NULL DEFAULT 'text', -- text | voice | video (voice/video need media plane)
  status TEXT NOT NULL DEFAULT 'open', -- open | live | closed
  host_id INTEGER NOT NULL,
  participant_count INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  closed_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_rooms_status ON rooms(status);
CREATE INDEX IF NOT EXISTS idx_rooms_topic ON rooms(topic_id);

CREATE TABLE IF NOT EXISTS room_messages (
  id TEXT PRIMARY KEY,
  room_id TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  body TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_room_messages_room ON room_messages(room_id, created_at);

CREATE TABLE IF NOT EXISTS room_participants (
  room_id TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  role TEXT NOT NULL DEFAULT 'member', -- host | cohost | member
  joined_at TEXT NOT NULL,
  PRIMARY KEY (room_id, user_id)
);

CREATE TABLE IF NOT EXISTS merch_products (
  id TEXT PRIMARY KEY,
  creator_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price_cents INTEGER NOT NULL,
  cost_cents INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'draft', -- draft | active | archived
  image_url TEXT,
  meta TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_merch_creator ON merch_products(creator_id);

CREATE TABLE IF NOT EXISTS merch_orders (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  buyer_id INTEGER NOT NULL,
  creator_id INTEGER NOT NULL,
  amount_cents INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending | paid | held | fulfilled | cancelled | refunded
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_merch_orders_buyer ON merch_orders(buyer_id);

CREATE TABLE IF NOT EXISTS ad_campaigns (
  id TEXT PRIMARY KEY,
  advertiser_name TEXT NOT NULL,
  contact_email TEXT,
  title TEXT NOT NULL,
  placement TEXT NOT NULL DEFAULT 'feed', -- feed | banner | live_corner
  budget_cents INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft', -- draft | submitted | approved | active | paused | rejected | completed
  creative_url TEXT,
  target_url TEXT,
  notes TEXT,
  created_by INTEGER,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_ad_campaigns_status ON ad_campaigns(status);

ALTER TABLE broadcast_sessions ADD COLUMN recording_status TEXT;
ALTER TABLE broadcast_sessions ADD COLUMN recording_url TEXT;
