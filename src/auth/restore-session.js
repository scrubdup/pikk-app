// Startup backend session restore (GET /auth/me), extracted from main.js so it can be tested as a real module.
// Generation-guarded: a response that arrives after sign-out or an account switch never touches local identity.
import { getState, syncRemoteAuthUser, clearAuthenticatedUser, setServerRoles } from '../store.js';
import { authApi, isPikkApiConfigured } from '../api/auth-client.js';
import { noteLiveAuthMe, clearLiveAuthMe, currentAuthGeneration, isAuthGenerationCurrent } from './readiness.js';
import { requestMembershipSync } from '../membership-sync.js';

export async function restoreBackendSession() {
  if (!isPikkApiConfigured()) {
    clearLiveAuthMe();
    return;
  }
  const cached = getState().user;
  if (cached && cached.authSource !== 'backend') clearAuthenticatedUser();
  const probeGen = currentAuthGeneration();
  try {
    const session = await authApi.me();
    if (!isAuthGenerationCurrent(probeGen)) return; // signed out / switched while in flight
    if (session?.user) {
      syncRemoteAuthUser(session.user);
      noteLiveAuthMe(session.user);
      requestMembershipSync();
    } else {
      clearLiveAuthMe();
    }
    setServerRoles(session?.roles || []);
  } catch (err) {
    if (!isAuthGenerationCurrent(probeGen)) return;
    if (err?.status === 401) {
      setServerRoles([]);
      clearLiveAuthMe();
      if (getState().user?.authSource === 'backend') clearAuthenticatedUser();
      return;
    }
    console.warn('PIKK startup session check failed', err);
  }
}
