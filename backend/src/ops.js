/**
 * PIKK Master Mind phase 1: GET /admin/ops/summary (owner-only via ops.view).
 * Strictly read-only: SELECTs only, no writes. Returns counts/status only, no PII
 * (no emails, names, handles, user ids, IPs or audit meta). Never reports "healthy" without a live check.
 */
const VERSION = 'mastermind-phase1';

function panel(status, source, freshnessLimitSec, detail, checkedAt = new Date().toISOString()) {
  return { status, checkedAt, source, freshnessLimitSec, detail };
}
const unknown = (source, reason) => panel('unknown', source, null, { reason }, null);

async function count(env, sql, ...args) {
  const r = await env.DB.prepare(sql).bind(...args).first();
  return r ? Number(r.n) : 0;
}

async function safe(fn, source, freshness) {
  try { return await fn(); } catch { return panel('down', source, freshness, { reason: 'query failed' }); }
}

export async function opsSummary(env) {
  const panels = {};
  panels.api = panel('healthy', 'pikk-api (self: this request was served)', 60, { version: VERSION });

  panels.database = await safe(async () => {
    const t0 = Date.now();
    const r = await env.DB.prepare('SELECT 1 AS ok').first();
    if (!r || r.ok !== 1) return panel('down', 'D1 SELECT 1', 60, { reason: 'unexpected result' });
    return panel('healthy', 'D1 SELECT 1', 60, { latencyMs: Date.now() - t0 });
  }, 'D1 SELECT 1', 60);

  panels.shield = await safe(async () => panel('healthy', 'D1 reports/appeals/takedowns', 300, {
    openReports: await count(env, `SELECT COUNT(*) AS n FROM reports WHERE status = 'open'`),
    pendingAppeals: await count(env, `SELECT COUNT(*) AS n FROM appeals WHERE status = 'pending'`),
    openTakedowns: await count(env, `SELECT COUNT(*) AS n FROM takedowns WHERE status = 'received'`),
    note: 'Queue counts are live; automated enforcement is not verified.',
  }), 'D1 reports/appeals/takedowns', 300);

  panels.support = await safe(async () => panel('healthy', 'D1 tickets', 300, {
    openTickets: await count(env, `SELECT COUNT(*) AS n FROM tickets WHERE status = 'open'`),
    pendingUserTickets: await count(env, `SELECT COUNT(*) AS n FROM tickets WHERE status = 'pending_user'`),
    aiSupportBot: 'absent',
  }), 'D1 tickets', 300);

  panels.audit = await safe(async () => {
    const r = await env.DB.prepare(`SELECT action, created_at FROM audit_log ORDER BY created_at DESC LIMIT 20`).all();
    return panel('healthy', 'D1 audit_log (read-only)', 300, {
      total: await count(env, `SELECT COUNT(*) AS n FROM audit_log`),
      last24h: await count(env, `SELECT COUNT(*) AS n FROM audit_log WHERE created_at >= ?`, new Date(Date.now() - 864e5).toISOString()),
      recent: r.results.map(e => ({ action: e.action, at: e.created_at })),
    });
  }, 'D1 audit_log (read-only)', 300);

  panels.ledger = panel('demo', 'stub', null, { reason: 'Stripe is stubbed (webhook returns 503 without a secret); no real revenue is reported.' });
  panels.vault = unknown('GET /vault/health (planned by PIKK Vault)', 'Vault media worker and /vault/health do not exist yet.');
  panels.live = unknown('none', 'No server-side live/stream source yet.');
  panels.broadcast = unknown('none', 'Restream/broadcast is a client prototype; no server source.');
  panels.costs = unknown('none', 'No billing/usage source connected.');
  panels.backups = unknown('none', 'No backup job or source exists yet.');

  return { generatedAt: new Date().toISOString(), readOnly: true, panels };
}
