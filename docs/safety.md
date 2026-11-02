# PIKK Safety plan (PIKK Shield)

Status: draft. Recreated on 2026-11-02 after the uncommitted original was lost from the shared checkout. Legal links and requirements still need online verification and a lawyer's review.

**Owner rule:** admin access is for PIKK staff only and is checked on the server. A URL flag, a localStorage value, or a browser toggle can never grant it. (`?admin=1` was removed in `feature/pikk-safety-wiring`.)

## 1. Audit: what's real, what's demo, what's missing

| Feature | State | Notes |
|---|---|---|
| Reports | Backend real (`POST/GET /reports`, priorities, dedupe, rate limits). Frontend wired in Messages when API configured; otherwise **device-only demo** | Demo reports are not sent to moderators |
| Blocking | Backend real (`POST /blocks`, `isBlocked`/`assertNotBlocked`). Frontend wired in Messages when API configured; otherwise **device-only demo** | Demo block hides on this device only |
| Admin gate | Server role from `/auth/me`; dev-only local demo toggle | `?admin=1` bypass removed |
| Moderator / support roles | Backend permissions exist; separate from admin | No moderator UI for the report queue yet |
| Audit log | Backend `audit_log` for moderation actions | No viewer UI |
| Age 18+ (Dating, 18+ contests) | Backend `age_verified_18` set only by vendor webhook | **No vendor contracted; no real ID check runs** |
| DMCA / copyright | Backend intake exists; Shield drafts in browser are local-only | No counter-notice flow UI |
| Support tickets | Real backend + frontend (PRs #302/#303/#313) | AI support bot: **planned, not built** |
| Rate limits | Backend real | |
| Shield anti-fraud | **Missing** | Planned |
| Appeals | **Missing** | Planned |

## 2. Planned flows
- **Reports:** user picks target + category → server stores with priority (CSAM/NCII/self-harm/threat first) → moderator queue → resolve/dismiss with reason → audit log. Reporter identity hidden from the queue.
- **Blocking:** applies across the whole app (DMs, profiles, live, rooms, dating, roast invites, follows) via `assertNotBlocked`; silent 404 where revealing a block is unsafe.
- **Moderation & appeals:** actions (remove, mute, suspend, ban) logged; user notified with reason; one appeal reviewed by a different moderator.
- **Consent & access:** 18+ areas require server-verified `age_verified_18`; explicit consent for recording/clips; NCII takedown fast path.
- **DMCA copyright:** notice intake → takedown → uploader notified → counter-notice → restore window; repeat-infringer policy.
- **Support tickets:** real tickets now; an AI support bot is **planned**, must be labeled as AI, and must hand off to humans for safety/legal issues.
- **Shield anti-fraud:** planned — gift/payment velocity checks, multi-account and self-referral detection, chargeback signals, impersonation checks.

## 3. Legal & age/ID verification
Region rules to confirm with counsel: US state age-verification laws for adult content, COPPA (under 13), UK Online Safety Act, EU DSA, Australia Online Safety Act, DMCA safe harbor (registered agent), NCMEC reporting for CSAM.

Vendor options: **Yoti** (age estimation + ID), **Persona**, **Veriff**, **Onfido**, **Jumio**, **Incode**, **Stripe Identity**, **Ondato**. Requirement for any vendor: **store only the result (verified / age band / timestamp / vendor ref), never ID images or document data.**

## 4. Backend dependencies
Roles/permissions, reports, blocks, the `age_verified_18` vendor webhook, tickets, DMCA, rate limits and `audit_log` come from backend-foundation (PR #215, merged). Still needed: moderator queue UI, appeals tables/routes, vendor webhook secret + contract, anti-fraud signals.

## 5. Questions for the owner
1. Minimum age for PIKK overall (13? 16? 18?) and for each area.
2. Which countries/states to launch in first.
3. Who handles moderation (in-house, contractor, both) and coverage hours.
4. Which age/ID vendor and budget.
5. Is Dating 18+ only with mandatory ID check, or age estimation acceptable?
6. Policy on adult/suggestive content (e.g. Twerk Contest) and where it's allowed.
7. Who is the DMCA registered agent.
8. Appeal process: one appeal or more, and target turnaround.
9. Should the AI support bot launch at all, and which topics must go to a human.
10. Data retention for reports, logs and verification results.
