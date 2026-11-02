# PIKK — Production Build, Integration and Acceptance Master Plan
Owner-approved directive: stop counting demo screens as completed features. Every advertised feature must have working services, backend persistence, real authorization, security and automated/manual end-to-end acceptance tests.

## Verified starting point (repository audit)
- package.json uses Vite 5 with scripts build/test; no declared backend, database, realtime, media, payment or authentication SDK dependencies.
- README documents localStorage-only `dbs_v1`, local demo sign-in and TEST MODE, and is outdated; verify actual deployments separately.
- Live UI imports demo helpers from src/store.js. A UI showing destination icons is not evidence of external connectivity.
- No real platform integration or streaming connection has been verified as of this audit.

## Foundational production architecture (must implement)
- [ ] Select and provision production backend API, managed database, object storage, cache, background jobs/queues and secrets management; document staging vs production environments.
- [ ] Authentication (email/social), sessions, password reset, MFA options, user deletion, age assurance, roles/permissions and admin RBAC.
- [ ] Database schema and migrations for users, profiles, roles, memberships, content, uploads, rights, posts, comments, follows, messages, matches, communities, streams, gifts, wallets, purchases, orders, reports, moderation, consent, tickets and audit logs.
- [ ] Real-time service for messages, presence, chat, live events, battle scores and notifications.
- [ ] Media ingestion, virus checks, image/video processing, transcoding, thumbnails, CDN, signed downloads, copyright fingerprinting and rights enforcement.
- [ ] Payment processor(s), subscriptions, marketplace checkout, creator onboarding/KYC, tax, ledger, refunds, chargebacks, payouts and reconciliation.
- [ ] Push/email notification delivery, monitoring, logging, error tracking, rate limits, anti-spam, backups, disaster recovery and data retention.
- [ ] Enforce privacy, consent, moderation, age gates and legal compliance before enabling sensitive features.

## Product workstreams — each must pass production acceptance
- [ ] Home: live spotlight, Stories, 1 large/2 medium/3 small sponsored inventory per Home and Videos, moderation, scheduling, paid bookings, analytics.
- [ ] Navigation and premium approved visuals: seven tabs, global player, accessible responsive mobile/desktop layout, real search.
- [ ] Signup: PIKK Free $0 forever; nine selectable account roles; optional PIKK+ $3.99, PIKK VIP $6.99, PIKK Elite $12.99; editable roles, real backend persistence and approvals.
- [ ] Connect: real posts/reels/stories, follow, likes, comments, shares, DMs, group chat, communities, discovery, notifications, reporting, Monkey-style random video chat.
- [ ] Dating: opt-in age-eligible profiles, preferences, swipe, mutual matches, private chat, privacy, location protection, report/block, safe account deletion.
- [ ] Music: rights-attested uploads, singles/albums, Vault, permanent downloads, paid checkout, creator royalties, beat marketplace, creator analytics and PIKK Shield.
- [ ] Videos: upload/transcode/playback, long-form channels (YouTube-style), playlists, search, recommendations, rights/moderation, creator monetization.
- [ ] Live: streaming ingest/playback, live chat, moderation, guests, gifts, coins, battles, roast battles, fan gift battles, leaderboards, payouts.
- [ ] PIKK Broadcast: live destination linking, supported multistreaming, streaming health, disconnect/retry, credential handling, permissions and platform-specific tests.
- [ ] Shop: seller applications, verification, product/inventory, orders, checkout, shipping, returns, marketplace fees, seller payout.
- [ ] Arcade: actual playable Speed, Blackjack, Slots, Poker, Spades, Dominoes, Chess, Clash, Knockout, Playground, Bowling, Pickleball, Pool, Cup Pong and any separately approved games; save progress and test multiplayer where applicable; play chips nonredeemable.
- [ ] Creator tools: fan alerts, clippers, creator studio, analytics, rewards, Share & Earn, Refer & Earn, subscription management and admin controls.
- [ ] PIKK AI Support: authenticated support assistant, ticket creation, status, escalation, human review and audit trails.
- [ ] Legal Center: policies, role-specific agreements, versioned affirmative consent, rights reports, DMCA notices/counter-notices, user rights and privacy requests.
- [ ] Admin: moderation, payouts, analytics, featured inventory, price controls, account/role approvals, tickets and audit logs.

## External broadcasting platform connection acceptance
Never label a destination CONNECTED until a real user authorization or platform-supported stream-key configuration is completed and validated. Do not scrape credentials or bypass platform access controls.
- [ ] YouTube Live: official Google OAuth/scopes as required, channel and livestream eligibility, create/bind live broadcast/stream through authorized APIs where available, publish test stream, confirm playback on YouTube, handle expiry/revocation.
- [ ] Twitch: official OAuth/approved account stream key or supported ingest, confirm ingest and live playback on Twitch, handle disconnect/reconnect.
- [ ] Kick: verify current official developer access, authorization and permitted livestream ingest/stream-key flow; confirm actual test stream.
- [ ] TikTok LIVE: verify account LIVE eligibility and available approved LIVE Studio/RTMP or partner integrations; do not assume unrestricted public streaming API. If unavailable, show 'Requires platform approval' instead of a fake Connect success.
- [ ] Instagram Live: verify official eligible account and Live Producer/RTMP or supported Meta integration, where available; don't claim general-purpose API access.
- [ ] Facebook Live: verify Meta app review, permissions, eligible Pages/profiles and permitted live API/RTMP; publish test stream and confirm playback.
- [ ] PIKK Live: build our own authorized ingest, transcode, playback, moderation, recording, latency, scaling and monitoring.
- [ ] For each destination: consent screen, encrypted credential storage, refresh/revoke, capability detection, publish test, live health, status UI, errors and audit logs.
- [ ] End-to-end broadcast test from one creator to every eligible destination, individually and simultaneously; monitor bandwidth, transcoding, latency, recovery and platform rate limits.
- [ ] Never promise compatibility where the external provider withholds permissions.

## Definition of done (for EVERY feature)
1. User can complete the actual action from start to finish.
2. Backend saves it and it works after refresh and across devices/accounts.
3. Permission, privacy, abuse, legal and payment requirements pass.
4. Automated tests and real-device manual QA pass.
5. Staging deployment and production deployment are verified.
6. Status evidence (test results, screenshots/video, commit and URL) is recorded.
7. No demo-only or localStorage-only implementation counted as production complete.

## Delivery sequencing
P0 foundation and authentication -> P1 media/realtime/Connect and Dating -> P2 live and external broadcast platform permissions -> P3 payments/music/shop -> P4 creator systems, games and polish -> staged beta and launch.
Parallelize design, legal and platform API approval applications. Track external approval blockers separately from code defects.
