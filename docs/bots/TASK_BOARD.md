# PIKK Master Task Board

**Owner:** PIKK Supervisor  
**Last updated:** 2026-11-19  

## Status

### Backend (Engine)
| Area | Status |
|------|--------|
| Auth (signup/login/logout/me) | **DONE** |
| Secure sessions + roles | **DONE** |
| Change password | **DONE** |
| Email verification endpoint | **DONE** |
| Password reset request + confirm | **DONE** |
| Account deletion | **DONE** |
| Rate limiting | **DONE** |
| Admin users list | **DONE** |
| Vault route stubs | **DONE** |
| Real D1 + R2 | Waiting on owner |
| Real email delivery | Waiting on provider |

### Frontend
| Area | Status |
|------|--------|
| API client | **DONE** |
| Auth service | **DONE** |
| Real auth page (`#/auth`) | **DONE** |
| Profile still has local demo fallback | Kept for TEST MODE |
| Boot session check | Next (main.js) |
| Wire more screens to real user | Ongoing |

---

## Next

1. Owner creates D1 + runs migrations
2. Finish boot-time session restore in main.js
3. Add password-reset UI page
4. Expand Vault once R2 exists
