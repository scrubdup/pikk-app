# Commercial holds (code vs activation)

This note is not a completion score. It separates **code on main** from **deployed Worker/Pages** from **live provider / paid activation**, which have not been authorized.

## Code already on main (PR #395 / #396)

- Server membership billing slice (`3966c8a`, merged in PR #395): `POST /memberships/checkout`, webhook lifecycle, `POST /admin/memberships/resync`, `POST /admin/memberships/needs-review/retry`, and authoritative `GET /memberships/me`. Billing stays **off** (`MEMBERSHIP_BILLING` is not `enabled`, and every other membership-config gate must also pass).
- Frontend read-only wiring (`fcd500f`, merged in PR #396): Profile and Pricing show server inactive/active status. They do not grant entitlements. Join/Subscribe stay disabled while billing is off.
- Coin/order webhook settlement (atomic claim-before-credit) remains separate from membership Checkout.
- Migration `0016_membership_billing.sql` is in `backend/migrations-pending/` only. A main merge does not apply it.

`src/data.js` `MEMBERSHIPS` figures (PIKK+ $3.99 / Backstage $7.99 / Inner Circle $12.99, t400u) are UI preview only. `MASTER_FEATURES.md` §13 marks Ad-Free `$4.99/mo` or `$49.99/yr` as **not final**. Those values are not a live Stripe catalog.

## Held (owner / business — not missing code from #395/#396)

1. Final membership catalog: plan IDs, Stripe price IDs, amounts, interval (monthly/yearly/both).
2. Ad-Free entitlement mapping across Music/Videos/Dating/Games/Connect.
3. Free trials, founding grants, or referral membership awards.
4. Enabling billing in production: Stripe keys, webhook secret, success/cancel URLs, account identity, `MEMBERSHIP_BILLING=enabled`.
5. Applying migration 0016 to production D1.
6. Domain, DNS, and email-delivery credentials (Resend or otherwise).
7. R2 enablement, media buckets/bindings, and vault signing credential.
8. Live two-account / paid-charge verification. A successful Pages or Worker deploy is not a launch or billing PASS.

No prices, trials, or entitlements are invented here. `/health` `activation_readiness` reports only whether required bindings or credentials are present, using public codes — not whether a provider is reachable.
