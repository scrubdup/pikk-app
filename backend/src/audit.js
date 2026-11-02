import { newId } from './crypto.js';
export function auditStmt(env, { actor = null, action, target = null, ip = null, meta = null }) {
  return env.DB.prepare(`INSERT INTO audit_log(id,actor_id,action,target,ip,meta,created_at) VALUES (?,?,?,?,?,?,?)`)
    .bind(newId('aud'), actor, action, target, ip, meta ? JSON.stringify(meta) : null, new Date().toISOString());
}
export async function audit(env, e) { await auditStmt(env, e).run(); }
