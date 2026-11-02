# PIKK 18+ Twerk Contest — Moderation Rules (DRAFT)

Status: **Draft for owner + legal review. Nothing in this doc is built yet unless marked otherwise.** Labels: **[PLANNED]** = not built; **[PROPOSED]** = number/policy awaiting owner sign-off.
Related: `docs/safety.md` (PIKK Shield safety plan — roles, reporting, blocking, age verification). This doc must stay consistent with it; where they differ, `docs/safety.md` and PIKK Backend's roles/permissions win.

**Owner rulings:** entries are **live and solo only**: no recorded uploads, co-hosts, guests, duos or groups. Contestants are women who are server-verified 18+. Viewers confirm 18+ themselves, and voting needs no ID check.

Flow: text-only Home tile → age gate → contest page. The Home tile shows no thumbnails or previews of entries.

---

## 1. Content rules

The contest is a **dance** contest. Entries must be non-explicit.

Allowed: dance performance (twerk and related styles), music, choreography, costumes that meet the clothing standard.

Not allowed (removal, see §8):
- Nudity of any kind, full or partial.
- Exposed genitals, buttocks (including thongs/G-strings that expose the buttocks), or nipples/areolae (any gender presentation for female-presenting nipples; sheer/see-through counts as exposed).
- Sexual acts, simulated sex, sexual touching of self or others, sex toys, or camera framing that focuses on genitals.
- Sexualized solicitation: offers of sex or sexual content, links/handles to adult sites (OnlyFans etc.), "DM for more," price lists, escort ads.
- Anyone under 18 in frame (see §2), non-consenting people (see §3), hate, harassment, violence, drugs, or dangerous stunts.

**Clothing standard [PROPOSED]:** opaque clothing that fully covers genitals, buttocks and nipples during the entire entry; minimum coverage roughly equal to athletic shorts / bike shorts and a sports bra or top. No wardrobe malfunctions—an entry with a malfunction is rejected (entrant may re-submit).

## 2. Protecting minors (zero tolerance)

- **The contestant must be server-verified 18+** (`age_verified_18`, enforced on `POST /contests/twerk/live` in PR #339). Entries are solo, so **nobody else may be in frame**. Anyone else appearing means the stream is cut and the entry is disqualified.
- Viewing uses the 18+ self-confirmation gate (owner ruling). Voting requires a signed-in account but no ID check.
- Any doubt about age → reject and escalate. Moderators do not "give the benefit of the doubt."
- **Suspected CSAM:** do not download, share, or re-view beyond what's needed; immediately remove from public view, lock the account, **preserve evidence** (content, hashes, metadata, account/IP/logs) in restricted storage, and report to the **NCMEC CyberTipline** (US provider obligation under 18 U.S.C. 2258A). Do not notify the user before law-enforcement handling. Only designated trust & safety staff handle these cases. **[PLANNED — process + restricted evidence store not built]**
- Permanent ban; no appeal for confirmed CSAM.

## 3. Consent

- Entries are **solo**: the only person on camera is the contestant, who consents to the live broadcast, any replay and voting when she goes live. There are no other participants to collect consent from. **[PLANNED: consent checkbox at go-live]**
- No one else may appear on camera: no co-hosts, guests, partners, bystanders or people in public, and no hidden-camera or "creep" content. If anyone else appears, the stream is cut (§6).
- The contestant can **revoke consent** at any time: the stream or replay is hidden immediately, then removed, and that entry's votes are frozen. **[PLANNED]**
- Non-consensual intimate imagery is treated as severe (§8) and evidence is preserved.

## 4. Entry review

Entries are live, so review happens **during the broadcast** (§6) plus a review of any replay before it's shown again. The checks below apply to replays and to the automated scanning of live frames.

- **No replay goes public before human review.** Live entries are recorded as `pending_review` (built in PR #339); replays stay hidden until approved. **[PLANNED: review tools]**
- Automated checks before human review **[PLANNED]**:
  - Hash matching against known CSAM/NCII databases (e.g., PhotoDNA / industry hash lists, StopNCII) and PIKK's own banned-content hashes.
  - Nudity/minor-age classifiers as a *flag*, never as a substitute for human review.
  - Duplicate/stolen-video detection (re-uploads of others' content; ties to copyright flow in `docs/safety.md`).
- Moderator checklist: only the verified contestant in frame; clothing standard; no sexual acts/solicitation; consent records present; captions/audio clean.
- Outcomes: approve / reject with reason (entrant may fix and re-submit) / escalate (age, CSAM, NCII → T&S lead).
- Every decision logged with moderator ID, time, reason (moderation audit log per Backend roles). **[PLANNED]**

## 5. Report flow

Report button on every entry, profile, comment and live stream. Server-side, cross-user (current browser-only reports in the app do not meet this). **[PLANNED]**

| Category | Priority | Target first action [PROPOSED] |
|---|---|---|
| Suspected minor / CSAM | P0 | Auto-hide on report; human review ≤ 15 min, 24/7 |
| Non-consensual content / person didn't agree | P0 | Auto-hide; review ≤ 1 hr |
| Nudity / sexual act / live violation | P1 | Review ≤ 1 hr (live: immediate) |
| Sexual solicitation / scam / fraud | P1 | ≤ 4 hrs |
| Harassment / hate / threats | P2 | ≤ 12 hrs |
| Vote manipulation | P2 | ≤ 24 hrs |
| Copyright / stolen video | P3 | ≤ 48 hrs (formal DMCA path per `docs/safety.md`) |
| Other | P3 | ≤ 72 hrs |

All SLA numbers are **proposals**, not commitments, until staffing is confirmed. Reporter gets a status update; repeated bad-faith reporting is itself actionable.

## 6. Live moderation (the contest is live-only)

All **[PLANNED]**:
- **Broadcast delay** [PROPOSED 10–30 s] so moderators can cut before viewers see a violation.
- **Moderators on shift** for every live window; [PROPOSED] at least 2, one with T&S-lead authority. No live contest without staffed moderation.
- **Kill switch:** moderators can instantly end a stream, hide an entry, or pause the whole contest page; staff-only, server-enforced (admin is staff-only per owner rule—no `?admin=1`).
- **Chat filters:** block-lists for sexual solicitation, minors-related terms, external adult links, phone numbers/handles; slow mode; mod-only mode; per-user mute/timeout.
- Solo only: the server refuses co-host, guest and multi-guest invites and duo/group fields (422 `solo_only`, PR #339). If anyone other than the contestant appears on camera, the stream is cut immediately.

## 7. Voting integrity (PIKK Shield tie-in)

All **[PLANNED]**:
- Voting by logged-in accounts that have passed the 18+ self-confirmation gate, with no ID check (owner ruling). One vote per account per entry (built), and only on approved entries (built in PR #339).
- PIKK Shield anti-fraud: device/IP velocity limits, new-account cooldowns, bot/sybil detection, paid-vote-ring detection.
- Votes are server-side only; suspicious votes quarantined, not silently counted; results audited before winners announced.
- Entrants caught manipulating votes → disqualification (see §8).
- Removed entries have votes frozen; prizes withheld pending investigation.

## 8. Enforcement ladder

| Severity | Examples | Action |
|---|---|---|
| Critical | CSAM, minor in frame (knowing), NCII, trafficking/solicitation of minors | Permanent ban, device/account linkage ban, evidence preserved, NCMEC / law enforcement report. No appeal for confirmed CSAM. |
| Severe | Nudity/sexual act, sexual solicitation, vote fraud ring, filming non-consenting people | Remove + contest disqualification + suspension [PROPOSED 30 days] → ban on repeat |
| Moderate | Clothing-standard miss, harassment, spam | Remove + warning → 7-day contest ban → disqualification |
| Minor | Off-topic, low-quality, mis-tagged | Reject with reason; can re-submit |

Strikes expire [PROPOSED 12 months] except Critical/Severe. All actions logged. **[PLANNED]**

### Appeals [PLANNED]
- Entrant can appeal once per decision within [PROPOSED 14 days]; reviewed by a different moderator than the original.
- Target response [PROPOSED] 7 days. Outcome logged; overturned entries restored with vote state explained.
- No appeal for confirmed CSAM. Age-related rejections can only be appealed by the contestant completing ID verification.

## 9. Legal notes (needs lawyer review — not legal advice)

- **18 U.S.C. § 2257 / 28 C.F.R. Part 75:** record-keeping for sexually explicit content. The contest must stay **non-explicit** so 2257 does not apply. If any content could be considered sexually explicit, we would need 2257 records/custodian—treat as a red line, not a feature.
- **18 U.S.C. § 2258A:** providers must report apparent CSAM to NCMEC and preserve it (now 1 year under the REPORT Act). Confirm retention process with counsel.
- **State age-verification laws** (e.g., Texas HB 1181, Louisiana, Utah, Virginia, Mississippi and others; upheld in *Free Speech Coalition v. Paxton*, 2025): mostly target sites with a threshold of material "harmful to minors." Staying non-explicit reduces exposure, but server-side 18+ verification is required anyway for this feature. Check each launch state's current law.
- **Other regions:** UK Online Safety Act, EU DSA, Australia Online Safety Act — age assurance and illegal-content duties may apply; see regional table in `docs/safety.md`.
- Biometric/ID data from age verification (e.g., Illinois BIPA, Texas CUBI) — vendor contract + consent needed.
- Prize/contest laws (sweepstakes vs. skill contest rules, official rules, eligibility by state) — counsel to draft official rules.
- **All of the above must be reviewed by a lawyer before launch.** Citations should be re-verified online.

## 10. Open questions for owner

Resolved by the owner: entries are **live only** and **solo only**.

1. Approve the clothing standard wording in §1?
2. Who staffs moderation (in-house or vendor), and for what hours? This decides whether the SLAs in §5 and the live staffing in §6 are realistic.
3. Launch countries and states?
4. Prizes (cash?): these affect contest-law and fraud requirements.

## 11. Launch gate (must all be true before entries go public)

- [ ] Server-side `age_verified_18` + female account enforced for contestants (built in PR #339; ID provider not connected yet)
- [ ] Live-only and solo-only enforced server-side (built in PR #339)
- [ ] Broadcast delay, kill switch and moderators on shift for every live window
- [ ] Live moderation tools, replay review queue + audit log
- [ ] Hash matching + NCMEC reporting process + evidence preservation
- [ ] Server-side reports and blocks (per `docs/safety.md`)
- [ ] Staff-only admin/moderator roles (no `?admin=1`)
- [ ] PIKK Shield vote anti-fraud
- [ ] Lawyer sign-off
