# t255u · Daily goal donate — Commerce debit review

**Date:** 2026-10-25  
**Owner:** Commerce (debit review) · Live Social (goal CRUD + UI) · Design (Home bars)  
**Status:** Commerce debit review shipped · joint PENDING AUDIT until Checker

## Locked API
- `donateToGoal(goalId, amountCoins)` — second arg is **coins**
- `getAppDailyGoal` / `setAppDailyGoal` / `getLiveDailyGoal` / `setLiveDailyGoal` / `listLiveDailyGoals` / `listDailyGoals` (LS)
- Coins: `getCoinBalance` / `buyCoins` (t185u)

## Accounting
- Rate: **100 coins = $2** → USD = coins / 50
- `raised` / `targetAmount` stay **USD**
- Debit from `dbs_v1.coins` (not USD wallet, not Marketplace)
- Commerce refinement: **cap** debit to remaining USD (`ceil(remaining * 50)` coins); already-complete → `{ error: 'completed' }`; raised never exceeds target
- Errors: `signin` | `invalid_amount` | `unknown_goal` | `expired` | `insufficient` | `completed`
- Success: `{ ok, goal, coins, donated: { coins, usd, requested } }`
- TEST MODE honesty; viewers never see a creator split on goal donate

## Checker flows
1. Sign in · demo; buy coin pack on `#/wallet#wallet-coins` if needed
2. Ensure app goal via `getAppDailyGoal` (auto-seeds) or Live host `setLiveDailyGoal`
3. `donateToGoal(id, 50)` → coins −50, raised +$1.00
4. Oversize donate near target → only remaining coins debited; `completedAt` set; further donate → `completed`
5. Expired `endsAt` → `expired`; low balance → `insufficient`
6. Confirm USD `wallet` and Marketplace unchanged

LS UI evidence: `phase2/daily-goals-t255u/`
