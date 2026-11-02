import { ApiError, clientIp } from './http.js';
import { newId } from './crypto.js';
import { auditStmt } from './audit.js';
import { assertNotBlocked } from './blocks.js';

export async function balance(env, userId) {
  const r = await env.DB.prepare(`SELECT COALESCE(SUM(e.amount),0) AS bal FROM ledger_entries e WHERE e.account_id = ?`).bind(`acct_${userId}`).first();
  return r.bal;
}

/** User-to-user coin transfer. Debit precedes credit; DB trigger rejects negative balances, batch is atomic. */
export async function transfer(env, req, fromUser, toHandle, amount, memo) {
  const to = await env.DB.prepare(`SELECT id FROM users WHERE handle = ? AND disabled_at IS NULL`).bind(toHandle).first();
  if (!to) throw new ApiError(404, 'not_found', 'Recipient not found');
  if (to.id === fromUser.id) throw new ApiError(422, 'validation_failed', 'Cannot transfer to yourself');
  await assertNotBlocked(env, fromUser.id, to.id);
  const txn = newId('txn'); const t = new Date().toISOString();
  try {
    await env.DB.batch([
      env.DB.prepare(`INSERT INTO ledger_transactions(id,kind,initiated_by,memo,created_at) VALUES (?, 'transfer', ?, ?, ?)`).bind(txn, fromUser.id, memo, t),
      env.DB.prepare(`INSERT INTO ledger_entries(id,transaction_id,account_id,amount,created_at) VALUES (?,?,?,?,?)`).bind(newId('le'), txn, `acct_${fromUser.id}`, -amount, t),
      env.DB.prepare(`INSERT INTO ledger_entries(id,transaction_id,account_id,amount,created_at) VALUES (?,?,?,?,?)`).bind(newId('le'), txn, `acct_${to.id}`, amount, t),
      auditStmt(env, { actor: fromUser.id, action: 'ledger.transfer', target: to.id, ip: clientIp(req), meta: { amount, txn } }),
    ]);
  } catch (e) {
    if (String(e.message).includes('insufficient_funds')) throw new ApiError(409, 'insufficient_funds', 'Insufficient balance');
    throw e;
  }
  return { transaction_id: txn, balance: await balance(env, fromUser.id) };
}
