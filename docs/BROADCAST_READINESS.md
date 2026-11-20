# Broadcast Readiness

Aligned with `PIKK_Broadcast_Master_Plan.md`.

## What exists now

- Studio UI shell at `#/broadcast`
- Destination status model (ready / disconnected / unavailable)
- Session create / start / stop API stubs (`/broadcast/*`)
- Health stub
- Clear TEST MODE honesty (no fake live claims)

## M1 gate (first real milestone)

Creator starts one genuine **PIKK Live** broadcast with authenticated playback.

Required:
1. D1 (or Postgres) for sessions
2. Ingest gateway (RTMP/RTMPS or WHIP)
3. Media worker (FFmpeg or SFU path)
4. HLS packaging + playback URL
5. Auth-gated start/stop that only flips to `live` after ingest confirms

## M2 gate

Same source → PIKK Live + one authorized external destination (YouTube or Twitch).

## Do not claim

- Do not show a destination as Connected until real OAuth + live test succeeds
- Do not show "Live" until backend confirms ingest
- Do not promise TikTok / Instagram / Facebook until eligibility is verified

## Next engineering steps

1. Create real broadcast_sessions table in D1
2. Replace in-memory session Map with DB
3. Add WHIP or RTMP ingest proof-of-concept on a worker
4. Return a real playback URL from start endpoint
