// Shared Report/Block for a real PIKK user (Messages, user profiles).
import { getState } from './store.js';
import { toast } from './ui.js';
import { safetyApi, isSafetyApiConfigured, safetyErrorMessage, LOCAL_ONLY_BLOCK_NOTE, LOCAL_ONLY_REPORT_NOTE } from './api/safety-client.js';

const PEER_HANDLE_RE = /^[A-Za-z0-9_]{3,30}$/;
/** Normalize a backend user handle (what POST /blocks `handle` and report target_id expect). */
export function normalizePeerHandle(h) {
  const v = String(h || '').trim().replace(/^@/, '');
  return PEER_HANDLE_RE.test(v) ? v : '';
}
/** Server Report/Block needs: API configured + backend session + real handle. */
export function canUseServerSafety(peerHandle) {
  return !!normalizePeerHandle(peerHandle) && isSafetyApiConfigured() && getState().user?.authSource === 'backend';
}
/** Returns a promise of the toast text shown. Success text only after the server confirms. */
export function runPeerSafetyAction(action, peerHandle, { notify = toast, details = 'Reported from Messages' } = {}) {
  const handle = normalizePeerHandle(peerHandle);
  if (!canUseServerSafety(handle)) {
    const msg = action === 'block' ? 'Blocked · ' + LOCAL_ONLY_BLOCK_NOTE : 'Reported · stub (Guidelines §13) · ' + LOCAL_ONLY_REPORT_NOTE;
    notify(msg);
    return Promise.resolve(msg);
  }
  const p = action === 'block'
    ? safetyApi.block(handle).then(() => 'Blocked across PIKK', (err) => 'Hidden here only — server block failed: ' + safetyErrorMessage(err))
    : safetyApi.report({ targetType: 'user', targetId: handle, category: 'harassment', details })
        .then(() => 'Report sent to PIKK moderators', (err) => 'Report not sent: ' + safetyErrorMessage(err));
  return p.then((msg) => { notify(msg); return msg; });
}
