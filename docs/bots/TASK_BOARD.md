# PIKK Master Task Board

**Owner:** PIKK Supervisor  
**Last updated:** 2026-11-19  

## Backend (Engine) — essentially complete

| Area | Status |
|------|--------|
| Signup / Login / Logout / Me | **DONE** |
| Secure cookie sessions | **DONE** |
| Roles + admin tools | **DONE** |
| Change password | **DONE** |
| Email verification endpoint | **DONE** |
| Password reset (request + confirm) | **DONE** |
| Account deletion | **DONE** |
| Rate limiting | **DONE** |
| Vault stubs | **DONE** |
| Real D1 database | Waiting on owner |
| Real R2 bucket | Waiting on owner |
| Real email delivery | Waiting on provider |

## Frontend Auth

| Area | Status |
|------|--------|
| API client | **DONE** |
| Auth service | **DONE** |
| Real auth page (`#/auth`) | **DONE** |
| Password reset page (`#/auth/reset`) | **DONE** |
| Boot session restore helper | **DONE** |
| Route registration helper | **DONE** |
| Wire routes into main.js ROUTES | **Next (one-line import)** |
| Call restoreServerSession() in boot() | **Next** |

## Immediate next steps for full live flow

1. In `main.js`:
   ```js
   import { authRoutes } from './auth/routes.js'
   import { restoreServerSession } from './auth/boot.js'

   const ROUTES = { ...authRoutes, /* existing routes */ }

   async function boot() {
     await restoreServerSession()
     // ... rest of boot
   }
   ```
2. Owner creates D1 database and runs migrations
3. Set `VITE_API_URL` to the live API

After those three things, signup → login → reload → logout works end-to-end in the browser.
