# t255u — Daily goals (Live Social half) · PENDING AUDIT

**Owner:** Live Social (joint Design Home + Commerce coins)  
**Date:** 2026-10-25  
**Observe:** https://scrubdup.github.io/dbs-app/#/live · https://scrubdup.github.io/dbs-app/#/live?go=1 · Home `#home-app-goal`

## Contract (HARD LOCK)
- `donateToGoal(goalId, amountCoins)` — **coins** arg
- `raised` / `targetAmount` stay **USD**; on donate `raised += amountCoins/50` (100 coins = $2)
- Live CTAs: **50 / 100 / 250** coins (≈ $1 / $2 / $5)
- Goal: `{ id, scope:'app'|'live', hostId?, hostName?, name, targetAmount, raised, endsAt, createdAt, completedAt? }`

## Store APIs (`src/store.js`)
- `getAppDailyGoal()` — active app goal; **seeds** “DBS daily community goal” ($50 / 24h) when none
- `setAppDailyGoal({ name, targetAmount })`
- `getLiveDailyGoal(hostId?)`
- `setLiveDailyGoal({ name, targetAmount })` — signed-in host; edit = **new 24h window**
- `listLiveDailyGoals()` — active live-scope goals (Design)
- `listDailyGoals()` — debug
- `donateToGoal(goalId, amountCoins)` → `{ ok, goal, coins, donated }` or `{ error: 'insufficient'|'expired'|'unknown_goal'|'invalid_amount'|'signin' }`
  - Debits coins; coin history `Goal donate · … · TEST MODE`
- Design temp stubs (`/* t255u: LS will own */`) **removed**

## Live UI (`src/pages/live.js`)
1. Go-live form (`#live-go`): optional Goal name + Goal amount ($) → `setLiveDailyGoal` on Start stream
2. Active Live: `#liveDailyGoal` progress card — name, `$raised/$target`, %, far/close/complete chip, resets label, host edit (new 24h)
3. Viewers: Donate 50/100/250 coins → `donateToGoal`; toasts; coin balance chip
4. Untouched: gifts tray, Request Spotlight, song packs, house teaser, tabbar, Design `#home-app-goal` markup

## Design Home
Already consumes `getAppDailyGoal` + `donateToGoal` with 50/100/250 chips on `#home-app-goal` (main `3409942`). Real APIs replace stubs — no Home markup change.

## Commerce
Coin debit lives in `donateToGoal` for now (same 100=$2 as gifts). Commerce may refine later — no parallel write this ship.

## Checker steps
1. Sign in → `#/live` → Start stream with goal name+$amount → card shows bar + resets in ~24h
2. Donate 50 coins (buy pack if needed) → raised += $1; balance drops; toast TEST MODE
3. Host edit goal → raised resets, new 24h window
4. Home `#home-app-goal` still renders seeded app goal; donate chips work
5. Gifts / song requests / Request Spotlight / house teaser / tabbar unchanged

## Files
- `src/store.js` — dailyGoals state + APIs (stubs removed)
- `src/pages/live.js` — go-live fields + live room card + donate
- `src/styles.css` — `.live-goal-bar` / `.live-goal-fill`
- Design `src/pages/home.js` — unchanged (already wired)

## Build
`VITE_BASE=/dbs-app/ npm run build` → green  
Assets: see STATUS / DEPLOY after Pages push

## Ship SHAs
- **main:** `ded7066`
- **gh-pages:** `c024365` — assets `index-FnZdyRFa.js` / `index-Blll5lBt.css`
- Observe Live: https://scrubdup.github.io/dbs-app/#/live
- Observe Live go: https://scrubdup.github.io/dbs-app/#/live (Start stream form)
- Observe Home goal: https://scrubdup.github.io/dbs-app/#/home (`#home-app-goal`)
