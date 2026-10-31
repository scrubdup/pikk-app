# DBS LIVE Gifts — Grok Implementation Package

Project: DatBoiSkeet (DBS) Network app. Integrate into the EXISTING app and preserve its current branding, navigation, and features. This package is a specification, not completed code or rendered 3D assets.

## Approved business direction
- Competitive but sustainable virtual gifting, not cheapest in market.
- Standard creator payout: **80% of NET eligible gift revenue**; DBS platform share **20%**.
- Potential **85% creator / 15% DBS** tier for established creators is a future option, **not automatically enabled**. Admin approval and financial review required.
- NET eligible gift revenue means actual proceeds after applicable app-store/payment processing fees, applicable taxes, refunds, chargebacks and adjustments. Define calculations in creator terms and use auditable ledger records. Don't silently change payouts.
- Viewers see gift names, coin costs, animations and sender recognition; **never show the internal revenue split to viewers**. Creators see their own payout terms, earned/pending/available balances and withdrawals. Admins see financial breakdowns.
- Illustrative standard coin pricing: **100 coins = $2.00 USD (1 coin = $0.02)**. Coin packages and local currency/store prices require platform compliance and validation. Do not promise that purchases and payouts are fee-free.
- Gifts are optional purchases, with clear prices, purchase confirmation and responsible spending controls.

## Final proposed gift catalog
| Gift | Coins | USD equivalent | 3D animation brief |
|---|---:|---:|---|
| DBS Rose | 5 | $0.10 | Rotating glossy rose with petals |
| Big Love | 25 | $0.50 | Pulsing heart with luminous particles |
| Turn Up | 50 | $1.00 | Flame burst and glowing DBS sparks |
| Cash Rain | 150 | $3.00 | Floating stylized bills and confetti |
| Bottle Pop | 300 | $6.00 | 3D champagne-style bottle with popping confetti (non-brand-specific) |
| Money Gun | 750 | $15.00 | Stylized cash launcher firing animated bills |
| Diamond Drip | 1,500 | $30.00 | Rotating faceted diamond with liquid light |
| Foreign Whip | 3,000 | $60.00 | Original luxury vehicle drives across screen with headlights; no trademarked vehicle model |
| Helicopter | 5,000 | $100.00 | Helicopter flyover and spotlight |
| Private Jet | 10,000 | $200.00 | Jet flies across screen with cinematic trail |
| DBS Crown | 25,000 | $500.00 | Gold/diamond crown rotates with royal glow |
| DBS Universe | 50,000 | $1,000.00 | Full-screen galaxy reveal with DBS logo |

Optional proposed future gift: DBS Millionaire, **125,000 coins / $2,500**, pending separate approval; DO NOT include as live catalog item yet.

## Coin packages (no discount assumed)
100 coins $2; 500 $10; 1,000 $20; 2,500 $50; 5,000 $100; 10,000 $200. Add larger packages if needed, preserving transparent pricing. Validate store rules, regional prices and tax presentation before release.

## Gift animation rules
- Make ORIGINAL polished 3D models/animations, not reused TikTok/Kick assets.
- Small gifts: brief lightweight overlay; premium gifts: ~3–6-second cinematic effects. Do not obscure essential LIVE controls or block accessibility.
- Stream and battle overlays must be performant on midrange mobile devices; implement reduced-motion, mute and low-data options, asset preloading, rate limiting and animation queue.
- Premium gift sender acknowledgement, sounds where permitted, replay-safe rendering and visible gift history.
- Deliver source 3D assets, optimized mobile runtime formats, thumbnails, previews, sound files with rights, and fallback 2D animations.

## LIVE / battle integration
- Gifts available on DBS LIVE streams and 1-minute LIVE Battles.
- Gift points count toward battle score with a published, consistent coin-to-point rule; keep scoring separate from real creator payouts.
- Winner recognition for 3 hours, top-15 leaderboard, monthly ticker, winner glow and battle effects remain compatible with existing app plan.
- Record gifts given, received, battle points and creator balances in admin stats. Handle canceled/invalid purchases and abuse.

## Revenue calculation example
For $100 USD of coin spending, if external deductions are 15%, net eligible revenue is $85. At 80/20, creator gets $68 and DBS retains $17 before DBS operating costs. At optional 85/15, creator $72.25, DBS $12.75. Actual external fees vary by channel, jurisdiction and transaction; these are illustrative only.

## Implementation checklist
1. Inspect existing DBS codebase/36-section developer plan and identify LIVE, gifts, battles, wallet, payments, admin, moderation and creator profile components; do not delete or overwrite features.
2. Add configurable gift catalog, coin purchase UI, gift preview and 3D rendering pipeline.
3. Integrate compliant in-app purchases and server-side purchase verification. Never trust client-reported balances or purchases.
4. Implement transactional coin ledger (purchase, gift debit, refund/chargeback reversal), idempotency, fraud checks, rate limits and audit trail.
5. Implement server-side net-revenue and payout ledger; support pending vs settled revenue, negative adjustments, payout thresholds and eligibility verification.
6. Add creator earnings dashboard and private admin finance dashboard with role-based access. Viewer interface must not reveal payout split.
7. Integrate with LIVE and battle score overlays, leaderboards and replay policy.
8. Add spending limits/confirmations, accessibility, age/region restrictions as applicable, privacy, reporting and dispute handling.
9. Run test cases: purchases, failed purchases, duplicate callbacks, low balance, refunds, chargebacks, network interruptions, battle concurrency and creator payouts.
10. Provide working builds, preview videos of each gift, assets and a changelog for review. Do not claim completion until validated.

## Grok instruction
Implement the approved core catalog and 80/20 net payout model into the EXISTING DBS app. Preserve current DBS look and features. The 85% creator tier and $2,500 Millionaire gift are proposed future enhancements, not automatically active. Show a working preview and verify the accounting logic before deployment. Do not represent the sample values as guaranteed real-world take-home earnings.
