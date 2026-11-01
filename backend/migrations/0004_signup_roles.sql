-- PIKK backend 0004: self-selected signup roles, aligned to PR #110
-- (docs/PIKK_SIGNUP_FREE_ROLES_APPROVED.md on feature/pikk-signup-roles-20261028).
-- These are DECLARED interests/capabilities, NOT permissions: "Role selection is not approval or
-- permission to monetize." Permission roles stay in user_roles (granted by admin only).
CREATE TABLE user_signup_roles (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK(role IN ('member','creator','artist','streamer','publisher','producer','seller','advertiser','clipper')),
  status TEXT NOT NULL DEFAULT 'declared' CHECK(status IN ('declared','pending_review','approved','rejected')),
  declared_at TEXT NOT NULL,
  PRIMARY KEY(user_id, role)
);
-- Every account keeps free member access.
CREATE TRIGGER signup_roles_keep_member BEFORE DELETE ON user_signup_roles
WHEN OLD.role = 'member' BEGIN SELECT RAISE(ABORT, 'member_role_is_permanent'); END;
