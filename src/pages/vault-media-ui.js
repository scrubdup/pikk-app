/**
 * Vault media panel (upload / list / retrieve / cancel unfinished).
 * Nested under Music → Vault. No redesign of membership demo cards.
 * Server is authority — never localStorage for media rows or signed URLs.
 */
import { esc, toast } from '../ui.js';
import { getState } from '../store.js';
import { resolveAuthState, canAccessProtectedAction, getLiveAuthMeUserId, AUTH_STATES } from '../auth/readiness.js';
import { getPikkApiBase } from '../api/auth-client.js';
import {
  isVaultApiConfigured,
  fetchVaultMediaStorageReady,
  vaultApi,
  uploadVaultFile,
  waitForVaultMediaReady,
  VAULT_CLIENT_LIMITS,
  inferVaultMediaType,
} from '../api/vault-client.js';

const ACCEPT = [
  VAULT_CLIENT_LIMITS.photo.accept,
  VAULT_CLIENT_LIMITS.video.accept,
  VAULT_CLIENT_LIMITS.audio.accept,
].join(',');

/** Per-bind generation so stale async list/readiness/upload completion cannot cross-account render. */
let bindGeneration = 0;
/** In-flight upload abort for the current bind; aborted on re-bind / disconnect. */
let activeAbort = null;
let activeAbortOwnerId = null;
let activeUploadId = null;

function currentBoundUserId() {
  const live = getLiveAuthMeUserId();
  if (live) return live;
  const session = getState()?.session;
  if (session?.liveFromAuthMe === true && session?.user?.id) return String(session.user.id);
  return null;
}

function authOk() {
  const { user, session } = getState();
  const state = resolveAuthState({ demoUser: user && !session?.liveFromAuthMe ? user : null, session });
  return canAccessProtectedAction(state);
}

function formatSize(n) {
  const b = Number(n) || 0;
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / (1024 * 1024)).toFixed(1)} MB`;
}

/** Owner-facing safe error text (backend also maps; belt-and-suspenders). */
function safeOwnerError(err) {
  const msg = String(err || '');
  if (/size (did not match|mismatch)/i.test(msg)) return 'Stored size did not match';
  if (/type did not match|content does not match/i.test(msg)) return 'File type did not match';
  if (/incomplete|object missing/i.test(msg)) return 'Upload incomplete';
  return 'Processing failed';
}

function progressLabel(p) {
  if (!p || !p.phase) return '';
  if (p.phase === 'create') return 'Creating upload…';
  if (p.phase === 'upload' && p.part && p.partCount) return `Uploading part ${p.part} of ${p.partCount}…`;
  if (p.phase === 'upload') return 'Uploading…';
  if (p.phase === 'assemble') return 'Assembling parts…';
  if (p.phase === 'finalize') return 'Finalizing…';
  if (p.phase === 'processing') return 'Processing (probe only; no thumbnail)…';
  return `${p.phase}…`;
}

function renderList(items) {
  if (!items?.length) return '<p class="muted">No Vault media yet.</p>';
  return `<div class="support-history">${items.map((m) => {
    const unfinished = m.state === 'pending_upload' || m.state === 'uploaded';
    const ready = m.state === 'ready';
    const processing = m.state === 'processing';
    const errText = m.state === 'failed' ? safeOwnerError(m.error) : '';
    return `<article class="card" style="margin:0 0 8px" data-vault-media-id="${esc(m.id)}">
      <div class="row wrap" style="gap:8px;align-items:center">
        <strong>${esc(m.filename || m.id)}</strong>
        <span class="chip">${esc(m.state)}</span>
        <span class="chip">${esc(m.type || '')}</span>
      </div>
      <p class="muted" style="margin:5px 0;font-size:12px">${formatSize(m.size)} · ${esc(m.access || 'private')}
        ${errText ? ` · ${esc(errText)}` : ''}
        ${ready ? '' : processing ? ' · processing (no thumbnail yet)' : ''}
      </p>
      <div class="row wrap" style="gap:8px">
        ${ready ? `<button type="button" class="btn ghost vault-media-open" data-id="${esc(m.id)}">Open (signed link)</button>` : ''}
        ${ready ? `<button type="button" class="btn ghost vault-media-delete" data-id="${esc(m.id)}">Delete</button>` : ''}
        ${unfinished ? `<button type="button" class="btn ghost vault-media-cancel" data-id="${esc(m.id)}">Cancel upload</button>` : ''}
      </div>
    </article>`;
  }).join('')}</div>`;
}

export function renderVaultMediaPanelHtml() {
  const apiOn = isVaultApiConfigured();
  return `
    <div class="card" id="vaultMediaPanel" style="margin-top:16px">
      <h3 style="margin:0 0 6px">My Vault media</h3>
      <p class="muted" style="font-size:12px;margin:0 0 10px" id="vaultMediaReadyStatus">
        ${apiOn ? 'Checking media storage readiness…' : 'API not configured · Vault media uploads unavailable.'}
      </p>
      <p class="muted" style="font-size:11px;margin:0 0 10px">
        Private by default. Thumbnails and video/audio transcoding are <strong>not</strong> available yet
        (probe/checksum only). Signed links are short-lived and are not saved on this device.
      </p>
      <form id="vaultMediaUploadForm" hidden>
        <label class="muted" style="display:block;font-size:12px;margin-bottom:6px" for="vaultMediaFile">
          Photo, video, or audio (server size limits apply)
        </label>
        <input type="file" id="vaultMediaFile" accept="${ACCEPT}" style="margin-bottom:8px" />
        <div class="row wrap" style="gap:8px;margin-bottom:8px">
          <button type="submit" class="btn primary" id="vaultMediaSubmit">Upload to Vault</button>
          <button type="button" class="btn ghost" id="vaultMediaCancelInFlight" hidden>Cancel upload</button>
        </div>
      </form>
      <p class="muted" id="vaultMediaFormBlocked" style="font-size:12px"></p>
      <div id="vaultMediaProgress" class="muted" style="font-size:12px;margin:8px 0" hidden></div>
      <div id="vaultMediaList"><p class="muted">No media loaded yet.</p></div>
      <div class="row wrap" style="gap:8px;margin-top:8px">
        <button type="button" class="btn ghost" id="vaultMediaLoadMore" hidden>Load more</button>
      </div>
    </div>`;
}

function setProgress(el, text, show = true) {
  if (!el) return;
  el.hidden = !show;
  el.textContent = text || '';
}

/**
 * Resolve a server-provided access URL against the API origin only.
 * Rejects arbitrary absolute URLs / schemes / non-/media/ paths.
 */
export function resolveSafeMediaUrl(rel, base) {
  if (!base || rel == null || rel === '') return null;
  try {
    const resolved = new URL(String(rel), base);
    const origin = new URL(base).origin;
    if (resolved.origin !== origin) return null;
    if (!resolved.pathname.startsWith('/media/')) return null;
    return resolved.href;
  } catch {
    return null;
  }
}

/**
 * Bind Vault media panel interactions. Call from bindMusic after DOM paint.
 * Captures bind generation + user identity so stale async work cannot cross-account render.
 * Re-bind / disconnect aborts any in-flight upload (best-effort cancel with original identity).
 */
export function bindVaultMediaPanel(root) {
  const panelNode = root && root.querySelector ? root.querySelector('#vaultMediaPanel') : null;
  if (!panelNode) return;

  const bindGen = ++bindGeneration;
  const boundUserId = currentBoundUserId();

  // Abort prior bind's in-flight upload; best-effort cancel with original identity.
  if (activeAbort) {
    try { activeAbort.abort(); } catch { /* ignore */ }
    const prevId = activeUploadId;
    activeAbort = null;
    activeUploadId = null;
    activeAbortOwnerId = null;
    if (prevId) vaultApi.cancel(prevId).catch(() => {});
  }

  const statusEl = panelNode.querySelector('#vaultMediaReadyStatus');
  const form = panelNode.querySelector('#vaultMediaUploadForm');
  const blocked = panelNode.querySelector('#vaultMediaFormBlocked');
  const listEl = panelNode.querySelector('#vaultMediaList');
  const progressEl = panelNode.querySelector('#vaultMediaProgress');
  const cancelBtn = panelNode.querySelector('#vaultMediaCancelInFlight');
  const fileInput = panelNode.querySelector('#vaultMediaFile');

  const stillThisBind = () => bindGen === bindGeneration && !!panelNode.isConnected;
  const sameUser = () => {
    const nowId = currentBoundUserId();
    return boundUserId != null && nowId != null && String(boundUserId) === String(nowId);
  };

  const disableMutations = (reason) => {
    if (!stillThisBind()) return;
    if (form) form.hidden = true;
    if (blocked) blocked.textContent = reason;
  };

  const enableMutations = () => {
    if (!stillThisBind() || !sameUser()) return;
    if (form) form.hidden = false;
    if (blocked) blocked.textContent = '';
  };

  if (!isVaultApiConfigured()) {
    if (statusEl) statusEl.textContent = 'API not configured · Vault media uploads unavailable.';
    disableMutations('Configure the Worker API base to use Vault media. No local upload fallback.');
    return;
  }

  // Capture auth at bind time (boot awaits restoreBackendSession before router).
  if (!authOk() || !boundUserId) {
    if (statusEl) statusEl.textContent = 'Sign in with a verified account to upload or list Vault media.';
    disableMutations('Authenticated verified session required. Demo/local membership unlock is separate and does not grant uploads.');
    return;
  }

  const loadMoreBtn = panelNode.querySelector('#vaultMediaLoadMore');
  let listItems = [];
  let nextCursor = null;
  let loadingMore = false;
  /** Bumped on every full refresh so in-flight load-more appends are ignored (H5). */
  let listRequestGen = 0;

  function paintList() {
    if (!listEl) return;
    listEl.innerHTML = renderList(listItems);
    if (loadMoreBtn) {
      loadMoreBtn.hidden = !nextCursor;
      loadMoreBtn.disabled = false;
      loadMoreBtn.textContent = 'Load more';
    }
  }

  function dedupeById(items) {
    const seen = new Set();
    const out = [];
    for (const m of items || []) {
      if (!m?.id || seen.has(m.id)) continue;
      seen.add(m.id);
      out.push(m);
    }
    return out;
  }

  async function refreshList({ append = false, cursor = null } = {}) {
    if (!listEl) return;
    const gen = bindGen;
    const userId = boundUserId;
    let reqGen;
    if (append) {
      reqGen = listRequestGen;
    } else {
      listRequestGen += 1;
      reqGen = listRequestGen;
      loadingMore = false; // invalidate in-flight load-more
    }
    try {
      const data = await vaultApi.listMine(50, { cursor: cursor || undefined });
      if (gen !== bindGeneration || !listEl.isConnected) return;
      if (String(userId) !== String(currentBoundUserId() || '')) return;
      if (reqGen !== listRequestGen) return; // stale load-more after full refresh
      const page = data.media || [];
      if (append) listItems = dedupeById(listItems.concat(page));
      else listItems = dedupeById(page);
      nextCursor = data.next_cursor || null;
      paintList();
    } catch (err) {
      if (gen !== bindGeneration || !listEl.isConnected) return;
      if (String(userId) !== String(currentBoundUserId() || '')) return;
      if (reqGen !== listRequestGen) return;
      if (!append) {
        if (err?.status === 401 || err?.code === 'unauthenticated') {
          listEl.innerHTML = '<p class="muted">Sign in from <a href="#/profile">Profile</a> to see your Vault media.</p>';
        } else if (err?.status === 403 || err?.code === 'email_unverified') {
          listEl.innerHTML = '<p class="muted">Verify your email before using Vault media.</p>';
        } else {
          listEl.innerHTML = `<p class="muted">Could not load media: ${esc(err?.message || 'error')}</p>`;
        }
        if (loadMoreBtn) loadMoreBtn.hidden = true;
      } else {
        toast(err?.message || 'Could not load more');
      }
    }
  }

  loadMoreBtn?.addEventListener('click', async () => {
    if (!stillThisBind() || !sameUser() || !nextCursor || loadingMore) return;
    loadingMore = true;
    if (loadMoreBtn) { loadMoreBtn.disabled = true; loadMoreBtn.textContent = 'Loading…'; }
    const cursor = nextCursor;
    const reqGenAtClick = listRequestGen;
    try {
      await refreshList({ append: true, cursor });
    } finally {
      if (reqGenAtClick === listRequestGen) loadingMore = false;
    }
  });

  fetchVaultMediaStorageReady().then(async (r) => {
    if (!stillThisBind() || !sameUser() || !statusEl?.isConnected) return;
    if (!r.reachable) {
      statusEl.textContent = 'Could not reach API /health · uploads disabled.';
      disableMutations('Could not reach API. No local fallback.');
      return;
    }
    if (!r.mediaStorage) {
      statusEl.textContent = 'Media storage not ready (R2 unbound or Worker reports media_storage:false). Uploads disabled — nothing was saved locally.';
      disableMutations('Vault storage unavailable. Mutations are disabled until /health capabilities.media_storage is true.');
      return;
    }
    statusEl.textContent = 'Media storage ready · private uploads use your signed-in session. Thumbnails/transcoding unsupported.';
    enableMutations();
    await refreshList();
  }).catch(() => {
    if (!stillThisBind() || !statusEl?.isConnected) return;
    statusEl.textContent = 'Could not reach API /health · uploads disabled.';
    disableMutations('Could not reach API. No local fallback.');
  });

  let disconnectTimer = null;
  const disconnectAbort = () => {
    if (bindGen !== bindGeneration) return;
    if (activeAbort) {
      try { activeAbort.abort(); } catch { /* ignore */ }
      const prevId = activeUploadId;
      activeAbort = null;
      activeUploadId = null;
      activeAbortOwnerId = null;
      if (prevId) vaultApi.cancel(prevId).catch(() => {});
    }
  };
  const watchDisconnect = () => {
    if (disconnectTimer) clearInterval(disconnectTimer);
    disconnectTimer = setInterval(() => {
      if (bindGen !== bindGeneration) {
        clearInterval(disconnectTimer);
        disconnectTimer = null;
        return;
      }
      if (!panelNode.isConnected) {
        clearInterval(disconnectTimer);
        disconnectTimer = null;
        disconnectAbort();
      }
    }, 500);
  };

  cancelBtn?.addEventListener('click', () => {
    if (activeAbort && bindGen === bindGeneration) activeAbort.abort();
  });

  form?.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    if (!stillThisBind() || !sameUser()) return;
    const file = fileInput?.files?.[0];
    if (!file) return toast('Choose a photo, video, or audio file');
    if (!inferVaultMediaType(file)) return toast('Unsupported file type for Vault');

    if (activeAbort) {
      try { activeAbort.abort(); } catch { /* ignore */ }
    }
    activeAbort = new AbortController();
    activeAbortOwnerId = boundUserId;
    activeUploadId = null;
    const signal = activeAbort.signal;
    watchDisconnect();
    if (cancelBtn) cancelBtn.hidden = false;
    const submit = panelNode.querySelector('#vaultMediaSubmit');
    if (submit) submit.disabled = true;
    setProgress(progressEl, 'Creating upload…');

    try {
      const result = await uploadVaultFile(file, {
        access: 'private',
        signal,
        onProgress: (p) => {
          if (!stillThisBind()) return;
          if (p?.media?.id) activeUploadId = p.media.id;
          setProgress(progressEl, progressLabel(p));
        },
      });
      if (!stillThisBind() || !sameUser()) return;
      const id = result?.media?.id;
      activeUploadId = id || null;
      setProgress(progressEl, 'Waiting for ready…');
      if (id) {
        try {
          const media = await waitForVaultMediaReady(id, { signal, timeoutMs: 90000 });
          if (!stillThisBind() || !sameUser()) return;
          if (media.state === 'ready') {
            setProgress(progressEl, `Ready: ${media.filename || id}`);
            toast('Vault upload ready');
          } else {
            const errText = media.state === 'failed' ? safeOwnerError(media.error) : '';
            setProgress(progressEl, `Finished with state ${media.state}${errText ? ': ' + errText : ''}`);
            toast(`Upload ended: ${media.state}`);
          }
        } catch (e) {
          if (!stillThisBind()) return;
          if (e?.code === 'processing_timeout') {
            setProgress(progressEl, 'Uploaded; processing still running — refresh list shortly.');
          } else throw e;
        }
      }
      if (fileInput) fileInput.value = '';
      if (stillThisBind() && sameUser()) await refreshList();
    } catch (err) {
      if (!stillThisBind()) return;
      if (err?.code === 'cancelled') {
        setProgress(progressEl, 'Upload cancelled.');
        toast('Upload cancelled');
      } else {
        const messages = {
          unauthenticated: 'Sign in to upload.',
          email_unverified: 'Verify your email before uploading.',
          vault_storage_not_configured: 'Media storage not configured. Nothing was uploaded.',
          media_storage_not_configured: 'Media storage not configured. Nothing was uploaded.',
          payload_too_large: 'File exceeds the server size limit.',
          unsupported_type: 'Unsupported file type.',
          quota_exceeded: 'Vault quota exceeded.',
        };
        const msg = messages[err?.code] || 'Upload failed';
        setProgress(progressEl, msg);
        toast(msg);
      }
      if (stillThisBind() && sameUser()) await refreshList().catch(() => {});
    } finally {
      if (bindGen === bindGeneration) {
        activeAbort = null;
        activeUploadId = null;
        activeAbortOwnerId = null;
        if (disconnectTimer) { clearInterval(disconnectTimer); disconnectTimer = null; }
      }
      if (stillThisBind()) {
        if (cancelBtn) cancelBtn.hidden = true;
        if (submit) submit.disabled = false;
      }
    }
  });

  listEl?.addEventListener('click', async (ev) => {
    if (!stillThisBind() || !sameUser()) return;
    const openBtn = ev.target.closest?.('.vault-media-open');
    const cancelItem = ev.target.closest?.('.vault-media-cancel');
    const deleteItem = ev.target.closest?.('.vault-media-delete');
    if (openBtn) {
      const id = openBtn.getAttribute('data-id');
      if (!id) return;
      openBtn.disabled = true;
      try {
        const data = await vaultApi.accessUrl(id);
        if (!stillThisBind() || !sameUser()) return;
        const abs = resolveSafeMediaUrl(data?.url, getPikkApiBase());
        if (!abs) {
          toast('Could not open media');
          return;
        }
        const a = document.createElement('a');
        a.href = abs;
        a.target = '_blank';
        a.rel = 'noopener';
        a.click();
      } catch (err) {
        if (stillThisBind()) toast('Could not open media');
      } finally {
        if (stillThisBind()) openBtn.disabled = false;
      }
      return;
    }
    if (cancelItem) {
      const id = cancelItem.getAttribute('data-id');
      if (!id) return;
      cancelItem.disabled = true;
      try {
        const data = await vaultApi.cancel(id);
        if (!stillThisBind() || !sameUser()) return;
        if (data?.media?.cleanup_pending) {
          toast('Cancelled · storage cleanup pending');
          setProgress(progressEl, 'Cancelled · storage cleanup pending');
        } else {
          toast('Upload cancelled');
        }
        await refreshList();
      } catch (err) {
        if (stillThisBind()) toast(err?.message || 'Cancel failed');
      } finally {
        if (stillThisBind()) cancelItem.disabled = false;
      }
      return;
    }
    if (deleteItem) {
      const id = deleteItem.getAttribute('data-id');
      if (!id) return;
      const ok = typeof window.confirm === 'function'
        ? window.confirm('Remove this ready media from your Vault library? Signed links will stop working. Storage cleanup may finish in the background if needed.')
        : false;
      if (!ok) return;
      deleteItem.disabled = true;
      try {
        const data = await vaultApi.delete(id);
        if (!stillThisBind() || !sameUser()) return;
        if (data?.media?.cleanup_pending) {
          toast('Removed from library · storage cleanup pending');
          setProgress(progressEl, 'Removed from library · storage cleanup pending (bytes may still be queued)');
        } else {
          toast('Media deleted');
        }
        await refreshList();
      } catch (err) {
        if (stillThisBind()) toast(err?.message || 'Delete failed');
      } finally {
        if (stillThisBind()) deleteItem.disabled = false;
      }
    }
  });
}

export const __vaultMediaTest = {
  renderList,
  ACCEPT,
  AUTH_STATES,
  resolveSafeMediaUrl,
  progressLabel,
  safeOwnerError,
};
