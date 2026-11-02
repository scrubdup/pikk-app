-- PIKK Master Mind phase 1: add 'owner' role above admin (holds all admin permissions + ops.view).
-- owner is never grantable through /admin/roles; it is assigned only by the env-gated one-time
-- bootstrap (POST /bootstrap/owner, OWNER_BOOTSTRAP_TOKEN secret). This migration grants nothing.
CREATE TABLE roles_v5 (
  name TEXT PRIMARY KEY CHECK(name IN ('user','creator','moderator','support_agent','admin','dmca','owner')),
  is_staff INTEGER NOT NULL CHECK(is_staff IN (0,1))
);
INSERT INTO roles_v5(name, is_staff) SELECT name, is_staff FROM roles;
INSERT INTO roles_v5(name, is_staff) VALUES ('owner',1);
DROP TABLE roles;
ALTER TABLE roles_v5 RENAME TO roles;
-- At most one owner, enforced in the database as well as in code.
CREATE UNIQUE INDEX uq_single_owner ON user_roles(role) WHERE role = 'owner';
