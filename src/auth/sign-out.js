// One backend sign-out path for every UI entry point (Profile, Settings).
// Order matters: invalidate in-flight /auth/me probes BEFORE the logout request, then always clear local state,
// even when the server request fails. The result says truthfully whether the server confirmed the sign-out.
import { authApi } from '../api/auth-client.js';
import { clearAuthenticatedUser } from '../store.js';
import { clearLiveAuthMe, invalidateAuthProbes } from './readiness.js';
import { resetMembershipSync } from '../membership-sync.js';

export const SIGNED_OUT_MESSAGE = 'Signed out';
export const SIGNED_OUT_LOCAL_ONLY_MESSAGE = 'Signed out on this device, but the server did not confirm sign-out. Reconnect, then sign in and sign out again to end the server session.';

export async function signOutBackendSession() {
  invalidateAuthProbes();
  let serverConfirmed = true;
  try { await authApi.logout(); } catch (_) { serverConfirmed = false; }
  clearLiveAuthMe();
  clearAuthenticatedUser();
  resetMembershipSync('signed_out');
  return { serverConfirmed, message: serverConfirmed ? SIGNED_OUT_MESSAGE : SIGNED_OUT_LOCAL_ONLY_MESSAGE };
}
