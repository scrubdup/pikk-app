/**
 * Vault media panel (upload / list / retrieve / cancel unfinished).
 * Nested under Music → Vault. No redesign of membership demo cards.
 * Server is authority — never localStorage for media rows or signed URLs.
 */
import { esc, toast } from '../ui.js';
import { getState } from '../store.js';
import { resolveAuthState, canAccessProtectedAction, AUTH_STATES } from '../auth/readiness.js';
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

/** In-memory only for this page bind (never localStorage). */
let activeAbort = null;
/** Ephemeral signed URL opens — cleared on navigate; not durable. */
const ephemeralOpens = new Set();

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
    </div>`;
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

function renderList(items) {
  if (!items?.length) return '<p class="muted">No Vault media yet.</p>';
  return `<div class="support-history">${items.map((m) => {
    const unfinished = m.state === 'pending_upload' || m.state === 'uploaded';
    const ready = m.state === 'ready';
    const processing = m.state === 'processing';
    return `<article class="card" style="margin:0 0 8px" data-vault-media-id="${esc(m.id)}">
      <div class="row wrap" style="gap:8px;align-items:center">
        <strong>${esc(m.filename || m.id)}</strong>
        <span class="chip">${esc(m.state)}</span>
        <span class="chip">${esc(m.type || '')}</span>
      </div>
      <p class="muted" style="margin:5px 0;font-size:12px">${formatSize(m.size)} · ${esc(m.access || 'private')}
        ${m.error ? ` · ${esc(m.error)}` : ''}
        ${ready ? '' : processing ? ' · processing (no thumbnail yet)' : ''}
      </p>
      <div class="row wrap" style="gap:8px">
        ${ready ? `<button type="button" class="btn ghost vault-media-open" data-id="${esc(m.id)}">Open (signed link)</button>` : ''}
        ${unfinished ? `<button type="button" class="btn ghost vault-media-cancel" data-id="${esc(m.id)}">Cancel upload</button>` : ''}
      </div>
    </article>`;
  }).join('')}</div>`;
}

async function refreshList(listEl) {
  if (!listEl) return;
  try {
    const data = await vaultApi.listMine(50);
    listEl.innerHTML = renderList(data.media || []);
  } catch (err) {
    if (err?.status === 401 || err?.code === 'unauthenticated') {
      listEl.innerHTML = '<p class="muted">Sign in from <a href="#/profile">Profile</a> to see your Vault media.</p>';
    } else if (err?.status === 403 || err?.code === 'email_unverified') {
      listEl.innerHTML = '<p class="muted">Verify your email before using Vault media.</p>';
    } else {
      listEl.innerHTML = `<p class="muted">Could not load media: ${esc(err?.message || 'error')}</p>`;
    }
  }
}

function setProgress(el, text, show = true) {
  if (!el) return;
  el.hidden = !show;
  el.textContent = text || '';
}

/**
 * Bind Vault media panel interactions. Call from bindMusic after DOM paint.
 */
export function bindVaultMediaPanel(root) {
  const panel = root.querySelector('#vaultMediaPanel');
  if (!panel) return;

  const statusEl = panel.querySelector('#vaultMediaReadyStatus');
  const form = panel.querySelector('#vaultMediaUploadForm');
  const blocked = panel.querySelector('#vaultMediaFormBlocked');
  const listEl = panel.querySelector('#vaultMediaList');
  const progressEl = panel.querySelector('#vaultMediaProgress');
  const cancelBtn = panel.querySelector('#vaultMediaCancelInFlight');
  const fileInput = panel.querySelector('#vaultMediaFile');

  const disableMutations = (reason) => {
    if (form) form.hidden = true;
    if (blocked) blocked.textContent = reason;
  };

  const enableMutations = () => {
    if (form) form.hidden = false;
    if (blocked) blocked.textContent = '';
  };

  if (!isVaultApiConfigured()) {
    disableMutations('Configure the Worker API base to use Vault media. No local upload fallback.');
    return;
  }

  if (!authOk()) {
    if (statusEl) statusEl.textContent = 'Sign in with a verified account to upload or list Vault media.';
    disableMutations('Authenticated verified session required. Demo/local membership unlock is separate and does not grant uploads.');
    return;
  }

  fetchVaultMediaStorageReady().then(async (r) => {
    if (!statusEl?.isConnected) return;
    if (!r.mediaStorage) {
      statusEl.textContent = 'Media storage not ready (R2 unbound or Worker reports media_storage:false). Uploads disabled — nothing was saved locally.';
      disableMutations('Vault storage unavailable. Mutations are disabled until /health capabilities.media_storage is true.');
      return;
    }
    statusEl.textContent = 'Media storage ready · private uploads use your signed-in session. Thumbnails/transcoding unsupported.';
    enableMutations();
    await refreshList(listEl);
  }).catch(() => {
    if (statusEl?.isConnected) {
      statusEl.textContent = 'Could not read /health · uploads disabled.';
    }
    disableMutations('Health check failed. No local fallback.');
  });

  cancelBtn?.addEventListener('click', () => {
    if (activeAbort) activeAbort.abort();
  });

  form?.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const file = fileInput?.files?.[0];
    if (!file) return toast('Choose a photo, video, or audio file');
    if (!inferVaultMediaType(file)) return toast('Unsupported file type for Vault');

    if (activeAbort) activeAbort.abort();
    activeAbort = new AbortController();
    const signal = activeAbort.signal;
    if (cancelBtn) cancelBtn.hidden = false;
    const submit = panel.querySelector('#vaultMediaSubmit');
    if (submit) submit.disabled = true;
    setProgress(progressEl, 'Starting upload…');

    try {
      const result = await uploadVaultFile(file, {
        access: 'private',
        signal,
        onProgress: (p) => {
          const label = p.phase === 'upload' && p.part
            ? `Uploading part ${p.part}/${p.partCount}…`
            : p.phase === 'processing'
              ? 'Processing (probe only; no thumbnail)…'
              : `${p.phase}…`;
          setProgress(progressEl, `${label} ${p.pct || 0}%`);
        },
      });
      const id = result?.media?.id;
      setProgress(progressEl, 'Waiting for ready…');
      if (id) {
        try {
          const media = await waitForVaultMediaReady(id, { signal, timeoutMs: 90000 });
          if (media.state === 'ready') {
            setProgress(progressEl, `Ready: ${media.filename || id}`);
            toast('Vault upload ready');
          } else {
            setProgress(progressEl, `Finished with state ${media.state}${media.error ? ': ' + media.error : ''}`);
            toast(`Upload ended: ${media.state}`);
          }
        } catch (e) {
          if (e?.code === 'processing_timeout') {
            setProgress(progressEl, 'Uploaded; processing still running — refresh list shortly.');
          } else throw e;
        }
      }
      if (fileInput) fileInput.value = '';
      await refreshList(listEl);
    } catch (err) {
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
        const msg = messages[err?.code] || err?.message || 'Upload failed';
        setProgress(progressEl, msg);
        toast(msg);
      }
      await refreshList(listEl).catch(() => {});
    } finally {
      activeAbort = null;
      if (cancelBtn) cancelBtn.hidden = true;
      if (submit) submit.disabled = false;
    }
  });

  listEl?.addEventListener('click', async (ev) => {
    const openBtn = ev.target.closest?.('.vault-media-open');
    const cancelItem = ev.target.closest?.('.vault-media-cancel');
    if (openBtn) {
      const id = openBtn.getAttribute('data-id');
      if (!id) return;
      openBtn.disabled = true;
      try {
        const data = await vaultApi.accessUrl(id);
        const rel = data?.url;
        if (!rel) throw new Error('No access URL');
        const base = getPikkApiBase();
        // Ephemeral tab open only — do not write URL into localStorage or durable DOM attributes beyond href of a temporary <a>.
        const abs = rel.startsWith('http') ? rel : `${base}${rel}`;
        ephemeralOpens.add(abs);
        const a = document.createElement('a');
        a.href = abs;
        a.target = '_blank';
        a.rel = 'noopener';
        a.click();
        // Drop reference; browser tab holds the short-lived signed URL.
        setTimeout(() => ephemeralOpens.delete(abs), 1000);
      } catch (err) {
        toast(err?.message || 'Could not open media');
      } finally {
        openBtn.disabled = false;
      }
      return;
    }
    if (cancelItem) {
      const id = cancelItem.getAttribute('data-id');
      if (!id) return;
      cancelItem.disabled = true;
      try {
        await vaultApi.cancel(id);
        toast('Upload cancelled');
        await refreshList(listEl);
      } catch (err) {
        toast(err?.message || 'Cancel failed');
      } finally {
        cancelItem.disabled = false;
      }
    }
  });
}

export const __vaultMediaTest = {
  renderList,
  ACCEPT,
  AUTH_STATES,
};
