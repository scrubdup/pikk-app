# PIKK Master Task Board

**Owner:** PIKK Supervisor  
**Last updated:** 2026-11-19  

## Current Focus

Engine auth layer is complete.  
Frontend auth service layer is now in place.  
Vault foundations (stubs) started.

---

## Status Overview

### Engine (Backend)
| Task | Status |
|------|--------|
| Stack + structure | **DONE** |
| Core auth + sessions | **DONE** |
| Email verification endpoint | **DONE** |
| Roles + admin tools | **DONE** |
| Rate limiting | **DONE** |
| Change password | **DONE** |
| Security headers | **DONE** |
| Vault route stubs | **DONE** |
| Real D1 database | Waiting on owner |
| Real R2 bucket | Waiting on owner |
| Real email delivery | Waiting on provider |

### Frontend
| Task | Status |
|------|--------|
| API client | **DONE** |
| Auth service (dual-mode) | **DONE** |
| Readiness contract updated | **DONE** |
| Wire signup/login screens to service | Next |
| Session survival on reload | Next |

---

## Next Actions

1. Owner: create D1 (`wrangler d1 create pikk-db`) and R2 bucket
2. Wire the actual login/signup UI pages to `src/auth/service.js`
3. Make app boot call `getAuthState()` so session survives reload
4. Continue Vault signed URL implementation once R2 is bound

---

## Handoff

2026-11-19 — Auth service layer + Vault stubs committed. Backend is ready; frontend can now prefer real sessions.
