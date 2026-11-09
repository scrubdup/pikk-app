# Commercial decisions NOT invented in this batch

Source docs consulted:
- `docs/owner-requirements/MASTER_FEATURES.md` §13 — Ad-Free proposed `$4.99/mo` or `$49.99/yr` explicitly **"not final"**
- `src/data.js` `MEMBERSHIPS` — UI preview prices (PIKK+ $3.99 / Backstage $7.99 / Inner Circle $12.99) from t400u; TEST MODE only
- `STATUS.md` — Vault/membership unlocks are TEST MODE localStorage demo
- `backend/README.md` — Stripe webhook is a stub; no Checkout creation

Held pending owner approval (not implemented as live grants):
1. Final membership plan catalog / IDs / prices / annual vs monthly
2. Ad-Free entitlement mapping across Music/Videos/Dating/Games/Connect
3. Free trials, founding grants, or referral membership awards
4. Subscription webhook → entitlement activation path
5. Creating checkout sessions or enabling real Stripe charges
6. Any D1 migration for `user_memberships` (would need owner approval before apply)

This batch only hardens payment security already in schema and exposes inactive authoritative membership status.
