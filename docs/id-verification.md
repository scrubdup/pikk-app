# PIKK ID / age verification

Status: **built, not connected.** With no provider secrets set, the API reports `provider not connected`, nobody can be verified, and Dating / 18+ contests stay locked. Nothing in the browser can mark anyone verified.

## How it works
- Adapter interface (`backend/src/idv/index.js`): `isConfigured(env)`, `createSession(env, {userId, redirectUri})` → `{providerRef, hostedUrl}`, `verifyWebhook(env, req, raw)`, `parseEvent(json)` → `{eventId, providerRef, status, occurredAt}`. Status is one of `pending | verified | declined | needs_review | expired`.
- **Persona** (primary, `backend/src/idv/persona.js`): hosted inquiry flow (government ID + selfie/liveness, set by your template). It calls `POST https://api.withpersona.com/api/v1/inquiries` with `inquiry-template-id` and `meta.auto-create-account-reference-id` = PIKK user id, and `auto-create-one-time-link` (the hosted URL). Webhooks are checked against the `Persona-Signature` header: `t=<unix>,v1=<hex HMAC-SHA256 of "t.body">`, with space-separated sets during secret rotation. Any `v1` may match, and there's a 5-minute tolerance.
- **Didit** (backup, `backend/src/idv/didit.js`): **stub only** and never connects. It fits the same interface (hosted session + signed webhook) and also has room for a cheap selfie-only **age estimate** for contest voters (planned method `age_estimate`). To build it, read docs.didit.me for the session endpoint and webhook signature, then implement the four functions.
- Endpoints:
  - `GET /verification/age` returns `not_connected | not_started | pending | needs_review | verified | declined | expired`.
  - `POST /verification/age/start` requires a signed-in user with a verified email. It's limited to 5 a day and returns `hosted_url`.
  - `POST /webhooks/idv/persona` (and `/webhooks/idv/<provider>`) verifies the signature, is rate-limited, is idempotent per event id, and writes to `audit_log`.
- **Data kept:** `users.age_verified_18`, `age_verification_method` (e.g. `persona:government_id+selfie`), `age_verified_at` and `age_verification_ref` (`persona:inq_…`). There's also a session table with status only. **No ID images, names, document numbers or dates of birth are stored.** The webhook payload is reduced to id/status and then discarded. An approved result is never downgraded by a later event; revocation has to be a staff action.
- Frontend: `#/verify-age`, linked from Dating and the Twerk Contest gate. It shows the server status and opens the provider's https hosted page. It never claims success unless the server says so.

## Biometric consent (draft, lawyer review required)
Before Persona starts, `#/verify-age` shows a written notice covering what's collected (ID photo, selfie, face geometry), the purpose (18+ only), Persona as vendor, retention and destruction (PIKK stores no biometrics, Illinois at the latest when the purpose is met or 3 years after the last interaction), no sale, and the right to decline. The user has to check a box and type their full name. `POST /verification/age/consent` stores the user, consent version, SHA-256 of the text, timestamp, salted IP hash and signed name in `biometric_consents`, plus an `audit_log` row. `/verification/age/start` returns 403 `biometric_consent_required` without consent to the current version. The public policy is at `#/biometric-policy`.

## Twerk Contest
- Owner rule: contestants are **women only**. Submitting or going live (`POST /contests/twerk/entries`, `/contests/twerk/live`) requires server `age_verified_18 = 1` **and** account `gender = 'female'`. Otherwise it returns 403 (`contestant_not_eligible` or `age_verification_required`). The entry UI only shows when `GET /contests/twerk/eligibility` returns `can_enter`.
- Gender is **self-declared on the account** (`POST /account/gender`, server-stored and audited). It is **not** read from the ID; we store no ID data.
- Viewing uses the existing 18+ self-confirmation. Voting (`POST /contests/twerk/votes`) needs a signed-in, email-verified account and **no** ID or gender check.

## Owner setup steps
1. Create a Persona account at withpersona.com and finish their business onboarding and contract. Start in **Sandbox**.
2. In Persona, create or choose an **Inquiry Template** with Government ID + Selfie (liveness). Turn on an age check (18+) in the template/workflow so that only adults get **approved**. Copy the template id (`itmpl_…`).
3. In Persona → Integration → **API keys**, create an API key.
4. In Persona → Integration → **Webhooks**, add `https://<your-pikk-api-worker>/webhooks/idv/persona` and enable the `inquiry.approved`, `inquiry.declined`, `inquiry.marked-for-review`, `inquiry.expired` and `inquiry.failed` events. Use an attribute blocklist to strip birthdate, name and photos from webhook payloads (PIKK ignores them anyway). Copy the webhook secret.
5. Set the Cloudflare Worker secrets (never commit them):
   ```
   cd backend
   npx wrangler secret put PERSONA_API_KEY
   npx wrangler secret put PERSONA_TEMPLATE_ID
   npx wrangler secret put PERSONA_WEBHOOK_SECRET   # comma-separate old,new during PIKK-side rotation
   npx wrangler secret put IP_HASH_SALT             # salt for hashing consent IPs
   # optional: ID_VERIFICATION_PROVIDER (default "persona")
   ```
6. Apply migration `0012_id_verification.sql` (renumbered from 0008 to avoid Mastermind's `0008_owner_role.sql`; 0009–0011 are used by vault/jobs branches) (the Worker build runs `d1 migrations apply`) and deploy.
7. Test in Sandbox end to end, then switch to Production keys and template.

## Lawyer review needed (not legal advice)
- **Illinois BIPA**, plus Texas CUBI and Washington's biometric law: selfie/liveness is biometric data. These need written notice, written consent before capture, a public retention and destruction policy, and no sale of the data. BIPA has a private right of action. Confirm Persona's role (processor) and its retention settings, and add a consent screen before launching the flow.
- **State age-verification laws** (e.g. Texas HB 1181, Utah, Louisiana, Virginia and others) and the UK Online Safety Act, EU DSA, GDPR Art. 9 and CCPA/CPRA: confirm which ones apply to Dating and 18+ contests and whether "store only the result" meets them.
- Data processing agreement with Persona, retention period for results and audit logs, and a user appeal path for wrong declines.

- **Women-only contest:** a sex-restricted contest may raise anti-discrimination issues (e.g. state public-accommodation laws such as California's Unruh Act, and platform policies) and sweepstakes/contest-law issues, especially if prizes are involved. Gender is self-declared on the account and not verified from ID, so it can be misstated. Counsel should approve the rule, the contest's official rules and the wording.
- The consent text and retention policy are drafts. Confirm Persona's actual retention configuration matches them.

## Gaps
- Not connected: no account, keys or webhook exist yet. Persona endpoints and headers were checked against public docs on 2026-11-02 but have not been tested against a live sandbox.
- Didit is a stub, and no age-estimate path is built.
- Contest entries are recorded server-side (title only, status `pending_review`). Media upload, live streaming and a moderator review queue for entries are not built. Viewing still uses device-only self-confirmation, as the owner requested.
- Gender can be changed by the user (audited). There's no lock or review if it changes after entering.
- There's no consent/BIPA notice screen yet, no staff revoke/re-verify tooling, and no polling or refresh on return beyond reloading the page.
