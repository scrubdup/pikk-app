# DBS Design Status

**Agent:** DBS Design  
**App root:** `/workspace/dbs-app`  
**No merge / deploy / push** — visual + asset integration only.  
**Coordinate with DBS Build:** leave paths/comments; do not break routing.

## Status table

| § | Section | Status | Evidence | Files touched |
|---|---|---|---|---|
| **19** | Loading screen | **done** (Checker PASS 2026-10-25 · t178u) | `phase2/splash-t178u/checker/` (+ legacy `design/evidence/19_loading.png`) | `index.html` (`.splash-logo` + `#splashChime`), `src/styles.css`, `src/main.js` (3s hold + chime), `/public/loading/dbs-tuning-fork.{mp3,wav}` |
| **21** | Foreign X-Change Merch | **done** | `design/evidence/21_merch.png` | `src/pages/merch.js`, `src/styles.css` (`.merch-*`, `.lightbox`), `src/data.js` (`MERCH` → all 10 `/public/merch/*`) |
| **34** | Coming Soon covers | **done** | `design/evidence/34_covers.png` | `src/pages/music.js`, `src/pages/home.js`, `src/styles.css` (`.cover-*`, `.badge-cs`), covers at `/public/music/01_*.jpg`, `02_*.jpg` |
| **22** | Profile Shop | **done** (Checker PASS 2026-10-25) | `design/evidence/22_shop.png` + `phase2/shop/checker/` | Live preview + unlock/equip demo. Files: `src/pages/shop.js`, `store.js` `profileShop`, `styles.css` preview states, concept PNG preserved |
| **15** | Community redesign polish | **done** (Checker PASS 2026-10-25 · Lounge Discord UI) | `phase2/lounge-discord/checker/` (+ legacy `design/evidence/15_community.png`) | Discord-inspired channel rail + room panes + DEMO members; DatBoiSkeet branded. Rooms still Phase 2 honesty. |
| **8** | Music & Vault layout | **done** | `design/evidence/08_vault.png` | `src/pages/music.js` (Upcoming + Vault panel + tiers), `src/styles.css` (`.vault-panel`, `.tier-*`) — Build owns membership/purchase logic |
| **20** | Home dashboard polish | **done** | `design/evidence/20_home.png` | `src/pages/home.js` (swipe previews, live activity, covers row), `src/styles.css` (`.preview-card`, `.live-activity`) |
| **17** | Homepage music video | **done** | `design/evidence/17_video.png` | `src/pages/home.js` (16:9 featured embed + video list from `data.js` `VIDEOS`), `src/styles.css` (`.hero-video`, `.video-list`) |
| **39** | Home stage rotation + creator sell promo | **done** (Checker PASS 2026-10-25) | `design/evidence/39_home_rotation.png` + `phase2/home-rotation/checker/` | `src/pages/home.js` (stage tabs Videos/Rising/Hot/Songs + auto-cycle), `src/styles.css` (`.home-stage*`, sell promo), `#home-creator-sell-promo` DEMO 10%/90% · Pricing Commerce |

## Asset paths (public)

| Use | Path |
|---|---|
| Official splash logo | `/public/brand/logo-dbs-v3@{1,2,3}x.webp` (primary `#splash` art · t178u) |
| Splash tuning fork | `/public/loading/dbs-tuning-fork.mp3` (+ `.wav`) |
| Legacy loading PNG | `/public/loading/DBS_Official_Loading_Screen.png` (archived; not primary splash) |
| Merch 01–10 | `/public/merch/01_black_orange_716_hat.jpeg` … `10_white_skulls_tee.jpeg` |
| Coming Soon covers | `/public/music/01_Long_Story_Short_Coming_Soon.jpg`, `/public/music/02_Ladies_Only_Coming_Soon.jpg` |
| Profile Shop concept | `/public/design/DBS_Profile_Shop_Concept.png` |

## Acceptance notes

### 19 Loading (t178u · DONE)
- Primary art: official DBS logo (`logo-dbs-v3@*.webp`) centered on `#0a0a0a`; size `min(70vw, 280px)`.
- Subtle text `LOADING` under logo (not baked into PNG). Cox Creations credit at bottom.
- Hold **~3000ms** from boot when splash is shown, then fade/hide. Subsequent visits skip via `shouldShowSplash()`; `?holdSplash=1` keeps splash for screenshots.
- Tuning-fork chime once on show: `/loading/dbs-tuning-fork.mp3` (wav fallback). Autoplay failures swallowed; unlock on first pointer/key if blocked.
- Legacy PNG kept on disk; not used as primary splash.
- Evidence: `/workspace/dbs-evidence/phase2/splash-t178u/`.

### 21 Merch
- All **10** products in `MERCH` map 1:1 to `public/merch` images.
- Prices: hats **$30**, tees **$65**, jackets **$200**.
- CTA: **Shop on Foreign X-Change** → `https://foreignx-change.com` (homepage; no invented product URLs).
- Gallery grid + tap-to-zoom lightbox; TEST MODE / external-checkout copy on every card.

### 34 Coming Soon
- **Long Story Short** then **Ladies Only** on Music Upcoming + Home cover row.
- Premium square frames, Coming Soon badge, titles/artist.

### 22 Profile Shop
- **DONE** (Checker PASS 2026-10-25 · phase2/shop/checker/). CONCEPT / TEST MODE demo; Unlock = local grant (no wallet debit). Minor: Unequip keeps last Preview until reload (non-blocking).
- Concept art hero + category chips (All / frames / effects / banners / name styles / badges).
- Full `PROFILE_SHOP` catalog; **CONCEPT** + **TEST MODE**; live preview before unlock.
- Unlock = local grant (no real pay / no wallet debit); Equip/Unequip; starter bundle; reset.
- Persist `dbs_v1.profileShop` `{ owned, equipped, reduceMotion }`.
- Separated from Foreign X-Change merch (`#/merch` + foreignx-change.com homepage only).
- Evidence: `/workspace/dbs-evidence/phase2/shop/` + `design/evidence/22_shop.png`.

### Build coordination
- Do not remove `TEST MODE` labels or splash asset path.
- Merch checkout stays external; Profile Shop is digital-only CONCEPT / TEST MODE (local unlock grant — no payment wiring yet).
- Music membership / My Music / buy-demo logic is Build’s — Design only polished covers/Vault chrome.
- Routing unchanged (`#/home`, `#/merch`, `#/music`, `#/shop`, `#/community`, …).

## Evidence directory

```
/workspace/dbs-app/design/evidence/
  19_loading.png
  21_merch.png
  34_covers.png
  22_shop.png
  20_home.png
  08_vault.png
  15_community.png
  17_video.png
```

## Admin Add Content CSS (assist)
- Polished `src/styles.css` admin hooks only (no `admin.js` logic changes).
- Evidence: run app `#/admin` with demo admin; tabs 48px, dropzones 112px min, 16px inputs (no iOS zoom).

## Content Polish note (2026-10-25) — not Design visual work

- **§15 Community:** Lounge page copy enriched (room descriptions, artist-owned network voice). Visual shell / Phase 2 rooms status unchanged — Design still owns layout/CSS.
- **§20 Home:** Activity feed + `HOME_SECTIONS` blurbs copy-polished for DatBoiSkeet voice. Layout/CSS remain Design’s; no visual redesign by Content Polish.

## §15 Lounge Discord redesign (2026-10-25 t165u) · DONE
Checker PASS. Channel sidebar + room panes + DEMO member strip. Evidence: `/workspace/dbs-evidence/phase2/lounge-discord/checker/`. No deploy.

## §36 Connect Monkey visual redesign (2026-10-25 t165u) · DONE
Checker PASS. Dual You|Them tiles, Find match / Next / End, matching pulse → BLOCK_MSG (no WebRTC). Evidence: `/workspace/dbs-evidence/phase2/connect-monkey/checker/`. Prefs API unchanged. Live IA still Live Social.

## Brand triad — black / red / blue (t187u · DONE)

Checker PASS 2026-10-25. Brand is black + red + blue (red/black not replaced).

- Tokens: `--blue` / `--acc-blue` `#2f6bff`; `--blue-dim` / `--blue-glow`; `--sk` → `--blue`.
- Red `--acc` remains primary CTA / LIVE hot / danger.
- Evidence: `/workspace/dbs-evidence/phase2/brand-blue-t187u/checker/`. **No deploy.**

## Gift stickers + Gift Battle stickers (t198u · DONE)

Checker PASS 2026-10-25. Original DBS SVG sticker pack for Live gifts (Rose→Universe) + battle win/crown.

- Assets: `/public/gifts/<slug>.svg` (12 catalog + battle-win, battle-crown, battle-vs, battle-fire)
- Helper: `src/gifts-stickers.js` — **`getGiftSticker(slug)`** → `{ src, html, className, emoji }`
- Evidence: `/workspace/dbs-evidence/phase2/gift-stickers-t198u/checker/`
- **No deploy.**

- t202u more blue (light touch): DONE (Checker PASS) — evidence phase2/brand-blue-more-t202u/checker/

## Card blue triad (t205u · DONE)
Checker PASS. Every `.card`/panel gets BW-family subtle blue edge/glow; red primary kept. Evidence: `/workspace/dbs-evidence/phase2/card-blue-t205u/checker/`.

## Home Top live first (t227u · DONE)

**DONE** (Checker PASS re-audit 2026-10-25). `.page-head` zero LIVE chrome; Top live first + selected on first paint; delayed cycle OK. Observe `index-Cej89PCx.js` / `index-BWlhTyvE.css`.

- Files: `src/pages/home.js`, `src/styles.css`.
- Evidence: `/workspace/dbs-evidence/phase2/home-top-live-t227u/checker-reaudit/`.
- Tabbar untouched (t228u).

## Coming Soon · Home sell + Clippers (t249u + t251u · DONE)

**DONE** (Checker PASS 2026-10-25). Observe `index-C5Y6AIbd.js` / `index-BlXaFuvo.css` (gh-pages `2353416`).

- **t249u** Home Creators sell: `#home-sell-coming-soon` inline next to title; TEST MODE chip + Start selling demo kept; blue accent kept.
- **t251u** `#/clippers` `#clippers-coming-soon` next to Clipper application; Profile Apply as Clipper Coming Soon chip.
- Tabbar untouched. Evidence: `phase2/home-sell-coming-soon-t249u/checker/`.

## t255u JOINT — Home daily app goal UI → **DONE**

**DONE** (Checker PASS joint 2026-10-25). Owner Design (Home card). Observe `index-C1DrFrz7.js` (Commerce cap cleared prior REJECT).

- `#home-app-goal`: name · USD progress · time left · Donate 50/100/250 coins · TEST MODE · blue accent.
- APIs: `getAppDailyGoal` / `donateToGoal(goalId, amountCoins)`.
- Evidence: `phase2/home-app-goals-t255u/` (+ LS `phase2/daily-goals-t255u/checker/`).
- Tabbar untouched.

## t267u — Header Messages pill replaces Sign-in → **DONE**

**DONE** (Checker PASS · 2026-10-25 · observe `index-DO3IwXZt.js`; tip also `index-CtrRwU1M.js` — DONE still stands). Owner: Design. Scope: header `.top-actions` only.

- `#headerMsg` now `.pill.header-msg` (envelope + **Messages** label) — same visual weight as `#tierPill` Sign in.
- Red `--acc` unread badge (`#headerMsgBadge`) when count > 0; hidden at 0. Swap via existing `updateChrome`.
- Observe (PASS): `index-DO3IwXZt.js` · forever https://scrubdup.github.io/dbs-app/
- Evidence: `/workspace/dbs-evidence/phase2/header-messages-t267u/` (+ checker/)
- Tabbar / Block Wars untouched.

## t269u / t272u — Posts Text (words-only) → **DONE**

**DONE** (Checker PASS re-audit · 2026-10-25 · observe `index-Cqo3Rs-G.js` / `index-B1bmV7qo.css` · gh-pages `c647f99`). Alias **t272u** = same Text post. Owner: Design.
Prior REJECT cleared: `.field[hidden], #postMediaField[hidden], #postPresets[hidden], #postMediaNote[hidden] { display:none !important; }`.

- Composer `#composer` `.post-type-picker`: **Text** alongside Picture · Short · Video.
- Text = caption only; media field/presets/note hidden; `createPost({ text, mediaType: 'text' })`.
- Feed **Text** chip; lead + `data.js` blurb include Text.
- Evidence: `/workspace/dbs-evidence/phase2/posts-text-t269u/`
- Forever: https://scrubdup.github.io/dbs-app/#/posts?compose=1

## t277u — Game tab + Block Wars Coming Soon → **DONE**

**DONE** (Checker PASS · 2026-10-25 · Supervisor locked). Owner: Design.

- Tabbar **Game** → `#/blockwars` Coming Soon (preview video tap-to-play · not playable).
- Drawer **Games** · Block Wars · Coming Soon. Post drawer label includes Text.
- Assets: `public/blockwars-preview/` (mp4 + frames). Reuses Home `#home-blockwars-preview` pattern.
- Evidence: `/workspace/dbs-evidence/phase2/game-tab-blockwars-t277u/`
- Forever: https://scrubdup.github.io/dbs-app/#/blockwars

## t290u / t291u — Header Messages always + 7-tab bar → **DONE**
- **Checker PASS** (observe `index-tM6mWAjU.js` / `index-CX-L09lP.css` · gh-pages `2b373fb`): header Messages pill + red unread "2", no Sign in/#tierPill; tabbar 7 = Home · Post · Music · Go Live · Videos · Chat · Game. Evidence `phase2/tabbar-header-t290u/checker/` (th-notes.txt, th-01/02/03.png) · forever https://scrubdup.github.io/dbs-app/


**PENDING AUDIT** (2026-10-25). Owner: Design. Alias **t291u** = header half (Messages replaces Sign in).

- Header: `#tierPill` Sign in **removed**; `#headerMsg` Messages pill **always** in that slot (signed-out + signed-in). Red unread badge when count > 0. Sign in only on `#/profile`.
- Tabbar exactly 7 (no scroll): **Home · Post · Music · Go Live · Videos · Chat · Game** — Go Live 4th/center, flat. Messages OFF tabbar; Profile via drawer.
- Evidence: `/workspace/dbs-evidence/phase2/tabbar-header-t290u/`
- Observe: `index-tM6mWAjU.js` / `index-CX-L09lP.css` · gh-pages `2b373fb` · main `674645f`
- Forever: https://scrubdup.github.io/dbs-app/

## t298u — Profile find + Block Wars lobby → **PENDING AUDIT**

**PENDING AUDIT** (2026-10-25). Owner: Design. Not DONE until Checker PASS.

### A) Profile discoverability
- Header: `#headerProfile` next to Messages → `#/profile`. No Sign in in header.
- Drawer: **Profile / Sign in** top-level after Home.
- Tabbar 7 unchanged.

### B) Block Wars lobby
- City select NY · LA · Chicago + focus + Coming Soon + preview video + honest arena toast.
- Evidence: `/workspace/dbs-evidence/phase2/profile-find-t298u/` + `blockwars-lobby-t298u/`
- Observe: `index-BA6Hkbfj.js` / `index-DYSeIUqf.css` · gh-pages `0a43ba5` · main `3015eeb` · forever https://scrubdup.github.io/dbs-app/

