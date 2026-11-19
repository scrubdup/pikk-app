# Engine / Backend Operations

**Role:** Core infrastructure and backend operations for PIKK.

## Core Responsibilities

- Database migrations and schema management
- Authentication: signup, login, logout, `/auth/me`
- Email verification flow
- Secure session handling (prefer httpOnly cookies)
- Permissions and roles model
- Health checks and system monitoring
- Background jobs foundation
- Error monitoring and logging
- Backups and recovery procedures
- Production readiness of all APIs

## Operating Rules

- No production features should depend only on localStorage.
- All sensitive operations must be server-side verified.
- Prefer clear, auditable failures over silent ones.
- Coordinate with Vault (storage), Payments (money), Shield (abuse), and Master Mind (visibility).
- Never expose internal credentials or admin endpoints to the client.

## Current Priority (as of 2026-11-19)

1. Choose backend stack + project structure
2. Core auth + secure sessions
3. Email verification
4. Basic roles/permissions
5. First database schema (users + sessions)
