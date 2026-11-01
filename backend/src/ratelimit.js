import { ApiError } from './http.js';

// Fixed-window per-IP limiter persisted in D1 (works across isolates).
export async function rateLimit(env, bucket, limit, windowSec) {
  const now = Math.floor(Date.now() / 1000);
  const win = now - (now % windowSec);
  const row = await env.DB.prepare(
    `INSERT INTO rate_limits(bucket, window_start, count) VALUES (?1, ?2, 1)
     ON CONFLICT(bucket, window_start) DO UPDATE SET count = count + 1
     RETURNING count`).bind(bucket, win).first();
  if (row.count > limit) {
    throw new ApiError(429, 'rate_limited', 'Too many requests', { retry_after_seconds: win + windowSec - now });
  }
}
