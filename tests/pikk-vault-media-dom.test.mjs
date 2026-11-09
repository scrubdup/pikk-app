import test from 'node:test';
import assert from 'node:assert/strict';
import { parseHTML } from 'linkedom';

const mem = new Map();
globalThis.localStorage = {
  getItem: (k) => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => mem.set(k, String(v)),
  removeItem: (k) => mem.delete(k),
  clear: () => mem.clear(),
};
const { document, window } = parseHTML('<!doctype html><html><body><main id="app"></main></body></html>');
globalThis.document = document;
globalThis.window = window;
globalThis.CustomEvent = window.CustomEvent;

// Prefer real Blob/File (Node undici) so slice is genuine. Fallback only if missing.
if (typeof globalThis.Blob !== 'function' || typeof globalThis.File !== 'function') {
  globalThis.Blob = class Blob {
    constructor(parts = [], opts = {}) {
      const chunks = [];
      for (const p of parts) {
        if (p instanceof Uint8Array) chunks.push(p);
        else if (p instanceof ArrayBuffer) chunks.push(new Uint8Array(p));
        else if (typeof p === 'string') chunks.push(new TextEncoder().encode(p));
        else if (p?.buffer) chunks.push(new Uint8Array(p.buffer, p.byteOffset || 0, p.byteLength || p.length));
        else chunks.push(new TextEncoder().encode(String(p)));
      }
      const size = chunks.reduce((n, c) => n + c.byteLength, 0);
      this._buf = new Uint8Array(size);
      let o = 0;
      for (const c of chunks) { this._buf.set(c, o); o += c.byteLength; }
      this.type = opts.type || '';
      this.size = size;
    }
    slice(start = 0, end = this.size, contentType = '') {
      const s = Math.max(0, start | 0);
      const e = Math.min(this.size, end == null ? this.size : end | 0);
      const out = this._buf.slice(s, Math.max(s, e));
      const b = new Blob([out], { type: contentType || this.type });
      return b;
    }
    arrayBuffer() { return Promise.resolve(this._buf.buffer.slice(this._buf.byteOffset, this._buf.byteOffset + this._buf.byteLength)); }
  };
  globalThis.File = class File extends globalThis.Blob {
    constructor(parts, name, opts = {}) {
      super(parts, opts);
      this.name = name;
      this.lastModified = Date.now();
    }
  };
}

window.__PIKK_API_BASE__ = 'https://api.test';
globalThis.window = window;

const calls = [];
let mediaStorage = true;
let healthMode = 'ok'; // ok | unbound | unreachable | throw
const mediaStore = new Map();
const putBodies = [];

globalThis.fetch = async (url, opts = {}) => {
  const u = String(url);
  const method = (opts.method || 'GET').toUpperCase();
  calls.push({ u, method, body: opts.body });
  const json = (status, body) => ({
    ok: status >= 200 && status < 300,
    status,
    headers: { get: (h) => (h === 'Content-Type' ? 'application/json' : null) },
    json: async () => body,
    text: async () => JSON.stringify(body),
  });

  if (u.endsWith('/health') && method === 'GET') {
    if (healthMode === 'throw') throw new TypeError('network');
    if (healthMode === 'unreachable') return json(502, { error: 'bad gateway' });
    if (healthMode === 'unbound') return json(200, { ok: true, capabilities: { media_storage: false } });
    return json(200, { ok: true, capabilities: { media_storage: mediaStorage } });
  }
  if ((u.includes('/media?') || /\/media$/.test(u.split('?')[0])) && method === 'GET') {
    const url = new URL(u, 'https://api.test');
    let limit = Number(url.searchParams.get('limit') || 50);
    if (!Number.isFinite(limit) || limit < 1) limit = 50;
    if (limit > 100) limit = 100;
    const all = [...mediaStore.values()];
    const cursor = url.searchParams.get('cursor');
    let start = 0;
    if (cursor) {
      const idx = all.findIndex((m) => m.id === cursor);
      start = idx >= 0 ? idx + 1 : all.length;
    }
    const slice = all.slice(start, start + limit);
    const next = start + limit < all.length ? slice[slice.length - 1]?.id : null;
    return json(200, { media: slice, count: slice.length, next_cursor: next });
  }
  if (u.endsWith('/media/uploads') && method === 'POST') {
    const body = JSON.parse(opts.body);
    const id = 'med_test_' + (mediaStore.size + 1);
    const row = {
      id, type: body.type, filename: body.filename, size: body.size,
      access: body.access || 'private', state: 'pending_upload',
    };
    mediaStore.set(id, row);
    return json(201, {
      upload: {
        id, mode: body.multipart ? 'multipart' : 'single',
        upload_url: `/media/uploads/${id}`,
        part_size: 8 * 1024 * 1024,
        part_count: body.multipart ? Math.ceil(body.size / (8 * 1024 * 1024)) : undefined,
      },
    });
  }
  if (/\/media\/uploads\/[^/]+$/.test(u) && method === 'PUT') {
    const id = u.split('/').pop();
    const row = mediaStore.get(id);
    if (row) row.state = 'uploaded';
    putBodies.push(opts.body);
    return json(200, { media: { id, state: 'uploaded' } });
  }
  if (/\/media\/uploads\/[^/]+\/parts\/\d+$/.test(u) && method === 'PUT') {
    putBodies.push(opts.body);
    return json(200, { ok: true });
  }
  if (/\/parts\/complete$/.test(u) && method === 'POST') {
    const id = u.split('/')[u.split('/').indexOf('uploads') + 1];
    const row = mediaStore.get(id);
    if (row) row.state = 'uploaded';
    return json(200, { media: { id, state: 'uploaded' } });
  }
  if (/\/media\/[^/]+\/complete$/.test(u) && method === 'POST') {
    const id = u.split('/')[u.split('/').length - 2];
    const row = mediaStore.get(id);
    if (row) row.state = 'ready';
    return json(202, { media: { ...row, state: 'ready' }, job: { id: 'job_1', state: 'queued' } });
  }
  if (/\/media\/[^/]+\/access-url/.test(u) && method === 'POST') {
    const id = u.split('/')[u.split('/').length - 2];
    return json(200, { url: `/media/${id}/content?sig=test&exp=1`, expires_at: new Date(Date.now() + 60000).toISOString() });
  }
  if (/\/media\/uploads\/[^/]+$/.test(u) && method === 'DELETE') {
    const id = u.split('/').pop();
    mediaStore.delete(id);
    return json(202, { media: { id, state: 'deleted', cancelled: true, cleanup_pending: true } });
  }
  if (/\/media\/med_[^/?]+$/.test(u) && method === 'DELETE' && !u.includes('/uploads/')) {
    const id = u.split('/').pop().split('?')[0];
    const row = mediaStore.get(id);
    if (!row || row.state !== 'ready') return json(409, { error: { code: 'invalid_state', message: 'Only ready' } });
    mediaStore.delete(id);
    return json(200, { media: { id, state: 'deleted', deleted: true, cleanup_pending: false } });
  }
  if (/\/media\/med_/.test(u) && method === 'GET') {
    const id = u.split('/').pop().split('?')[0];
    const row = mediaStore.get(id);
    if (!row) return json(404, { error: { code: 'not_found', message: 'Not found' } });
    return json(200, { media: row });
  }
  return json(404, { error: { code: 'not_found', message: u } });
};

const { noteLiveAuthMe, clearLiveAuthMe } = await import('../src/auth/readiness.js');
const { clearAuthenticatedUser, syncRemoteAuthUser } = await import('../src/store.js');
noteLiveAuthMe({ id: 'usr_dom_test' });
syncRemoteAuthUser({ id: 'usr_dom_test', email: 'dom@example.com', email_verified: true });

const { renderVaultMediaPanelHtml, bindVaultMediaPanel, __vaultMediaTest } = await import('../src/pages/vault-media-ui.js');
const { isVaultApiConfigured, uploadVaultFile, VAULT_CLIENT_LIMITS } = await import('../src/api/vault-client.js');

test('DOM: storage ready enables form, upload + list refresh via real event handlers', async () => {
  assert.equal(isVaultApiConfigured(), true);
  mediaStorage = true;
  healthMode = 'ok';
  mediaStore.clear();
  calls.length = 0;
  const root = document.getElementById('app');
  root.innerHTML = renderVaultMediaPanelHtml();
  bindVaultMediaPanel(root);
  await new Promise((r) => setTimeout(r, 20));
  const form = root.querySelector('#vaultMediaUploadForm');
  assert.ok(form, 'form present');
  assert.equal(form.hidden, false, 'form enabled when media_storage true');
  assert.match(root.querySelector('#vaultMediaReadyStatus').textContent, /Media storage ready/);

  const fileInput = root.querySelector('#vaultMediaFile');
  const jpeg = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0, 0x10, 0x4a, 0x46, 0x49, 0x46, ...Array(200).fill(1)]);
  const file = new File([jpeg], 'shot.jpg', { type: 'image/jpeg' });
  Object.defineProperty(fileInput, 'files', { configurable: true, get: () => [file] });

  form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
  await new Promise((r) => setTimeout(r, 80));

  assert.ok(calls.some((c) => c.method === 'POST' && c.u.includes('/media/uploads')), 'createUpload called');
  assert.ok(calls.some((c) => c.method === 'PUT' && /\/media\/uploads\//.test(c.u)), 'putBytes called');
  assert.ok(calls.some((c) => c.method === 'POST' && /\/complete$/.test(c.u)), 'complete called');
  assert.ok(calls.some((c) => c.method === 'GET' && c.u.includes('/media?')), 'listMine called');
  assert.match(root.querySelector('#vaultMediaList').innerHTML, /shot\.jpg|ready|med_test/);
});

test('DOM: media_storage false disables mutations (distinct from unreachable)', async () => {
  healthMode = 'unbound';
  mediaStorage = false;
  mediaStore.clear();
  const root = document.getElementById('app');
  root.innerHTML = renderVaultMediaPanelHtml();
  bindVaultMediaPanel(root);
  await new Promise((r) => setTimeout(r, 20));
  assert.equal(root.querySelector('#vaultMediaUploadForm').hidden, true);
  assert.match(root.querySelector('#vaultMediaFormBlocked').textContent, /unavailable|disabled/i);
  assert.match(root.querySelector('#vaultMediaReadyStatus').textContent, /not ready|unbound|false/i);
  assert.doesNotMatch(root.querySelector('#vaultMediaReadyStatus').textContent, /Could not reach/i);
});

test('DOM: /health unreachable disables mutations with distinct messaging', async () => {
  healthMode = 'throw';
  const root = document.getElementById('app');
  root.innerHTML = renderVaultMediaPanelHtml();
  bindVaultMediaPanel(root);
  await new Promise((r) => setTimeout(r, 20));
  assert.equal(root.querySelector('#vaultMediaUploadForm').hidden, true);
  assert.match(root.querySelector('#vaultMediaReadyStatus').textContent, /Could not reach/i);
});

test('DOM: cancel unfinished item calls DELETE; cleanup_pending toast path', async () => {
  healthMode = 'ok';
  mediaStorage = true;
  mediaStore.clear();
  mediaStore.set('med_pending1', {
    id: 'med_pending1', type: 'photo', filename: 'x.jpg', size: 10,
    access: 'private', state: 'pending_upload',
  });
  const root = document.getElementById('app');
  root.innerHTML = renderVaultMediaPanelHtml();
  bindVaultMediaPanel(root);
  await new Promise((r) => setTimeout(r, 30));
  assert.match(root.querySelector('#vaultMediaList').innerHTML, /Cancel upload/);
  const btn = root.querySelector('.vault-media-cancel');
  calls.length = 0;
  btn.dispatchEvent(new window.Event('click', { bubbles: true }));
  await new Promise((r) => setTimeout(r, 40));
  assert.ok(calls.some((c) => c.method === 'DELETE' && c.u.includes('/media/uploads/med_pending1')));
  assert.equal(mediaStore.has('med_pending1'), false);
  assert.match(root.querySelector('#vaultMediaProgress').textContent, /cleanup pending/i);
});

test('multipart uses genuine Blob.slice (part bodies are truncated)', async () => {
  healthMode = 'ok';
  mediaStorage = true;
  mediaStore.clear();
  putBodies.length = 0;
  calls.length = 0;
  const partSize = VAULT_CLIENT_LIMITS.multipartPartBytes;
  const size = partSize + 1234;
  const buf = new Uint8Array(size);
  for (let i = 0; i < size; i++) buf[i] = i & 0xff;
  const file = new File([buf], 'big.mp4', { type: 'video/mp4' });
  // Ensure slice is genuine
  const sliced = file.slice(0, 10);
  assert.equal(sliced.size, 10, 'Blob.slice must return truncated size, not whole blob');

  await uploadVaultFile(file, { access: 'private' });
  const partPuts = calls.filter((c) => /\/parts\/\d+$/.test(c.u) && c.method === 'PUT');
  assert.equal(partPuts.length, 2, 'two parts uploaded');
  // First part body should be partSize bytes (Blob/File)
  const b0 = partPuts[0].body;
  const size0 = b0?.size ?? b0?.byteLength ?? b0?.length;
  assert.equal(size0, partSize, `part1 size ${size0} === partSize ${partSize}`);
  const b1 = partPuts[1].body;
  const size1 = b1?.size ?? b1?.byteLength ?? b1?.length;
  assert.equal(size1, 1234, `part2 size ${size1} === remainder 1234`);
});

test('resolveSafeMediaUrl rejects cross-origin and non-/media/ paths', () => {
  const base = 'https://api.test';
  assert.equal(__vaultMediaTest.resolveSafeMediaUrl('/media/x/content?sig=1', base), 'https://api.test/media/x/content?sig=1');
  assert.equal(__vaultMediaTest.resolveSafeMediaUrl('https://evil.example/media/x', base), null);
  assert.equal(__vaultMediaTest.resolveSafeMediaUrl('javascript:alert(1)', base), null);
  assert.equal(__vaultMediaTest.resolveSafeMediaUrl('/auth/me', base), null);
  assert.equal(__vaultMediaTest.resolveSafeMediaUrl('https://api.test/auth/me', base), null);
});

test('progressLabel is stage text without fake percentages', () => {
  assert.equal(__vaultMediaTest.progressLabel({ phase: 'create' }), 'Creating upload…');
  assert.equal(__vaultMediaTest.progressLabel({ phase: 'upload', part: 1, partCount: 2 }), 'Uploading part 1 of 2…');
  assert.equal(__vaultMediaTest.progressLabel({ phase: 'finalize' }), 'Finalizing…');
  assert.doesNotMatch(__vaultMediaTest.progressLabel({ phase: 'upload' }), /\d+%/);
});

test('safeOwnerError maps internal last_error', () => {
  assert.equal(__vaultMediaTest.safeOwnerError('size mismatch at /tmp/x'), 'Stored size did not match');
  assert.equal(__vaultMediaTest.safeOwnerError('object missing key=vault/…'), 'Upload incomplete');
  assert.equal(__vaultMediaTest.safeOwnerError('stack at /srv'), 'Processing failed');
});


test('DOM: delete ready item requires confirm then DELETE /media/:id', async () => {
  healthMode = 'ok';
  mediaStorage = true;
  mediaStore.clear();
  mediaStore.set('med_ready1', {
    id: 'med_ready1', type: 'photo', filename: 'ready.png', size: 10,
    access: 'private', state: 'ready',
  });
  const root = document.getElementById('app');
  root.innerHTML = renderVaultMediaPanelHtml();
  bindVaultMediaPanel(root);
  await new Promise((r) => setTimeout(r, 30));
  assert.match(root.querySelector('#vaultMediaList').innerHTML, /Delete/);
  let confirmCalls = 0;
  window.confirm = () => { confirmCalls += 1; return false; };
  calls.length = 0;
  root.querySelector('.vault-media-delete').dispatchEvent(new window.Event('click', { bubbles: true }));
  await new Promise((r) => setTimeout(r, 20));
  assert.equal(confirmCalls, 1);
  assert.equal(calls.some((c) => c.method === 'DELETE'), false, 'no delete without confirm');

  window.confirm = () => true;
  calls.length = 0;
  root.querySelector('.vault-media-delete').dispatchEvent(new window.Event('click', { bubbles: true }));
  await new Promise((r) => setTimeout(r, 40));
  assert.ok(calls.some((c) => c.method === 'DELETE' && /\/media\/med_ready1$/.test(c.u) && !c.u.includes('/uploads/')));
  assert.equal(mediaStore.has('med_ready1'), false);
});

test('DOM: load more uses next_cursor', async () => {
  healthMode = 'ok';
  mediaStorage = true;
  mediaStore.clear();
  for (let i = 0; i < 3; i++) {
    mediaStore.set('med_p' + i, {
      id: 'med_p' + i, type: 'photo', filename: 'p' + i + '.jpg', size: 10,
      access: 'private', state: 'ready',
    });
  }
  // Override list to page size 2 using real cursor field from stub (id-based in stub)
  const root = document.getElementById('app');
  root.innerHTML = renderVaultMediaPanelHtml();
  // Monkeypatch listMine via re-bind after adjusting fetch — use limit by patching vaultApi through fetch only.
  // Stub already pages by cursor=id; force small pages by wrapping fetch for this test.
  const prev = globalThis.fetch;
  globalThis.fetch = async (url, opts = {}) => {
    const u = String(url);
    if (u.includes('/media?') || /\/media(\?|$)/.test(u)) {
      const urlObj = new URL(u, 'https://api.test');
      urlObj.searchParams.set('limit', '2');
      return prev(urlObj.toString(), opts);
    }
    return prev(url, opts);
  };
  bindVaultMediaPanel(root);
  await new Promise((r) => setTimeout(r, 40));
  const more = root.querySelector('#vaultMediaLoadMore');
  assert.equal(more.hidden, false, 'load more visible when next_cursor');
  calls.length = 0;
  more.dispatchEvent(new window.Event('click', { bubbles: true }));
  await new Promise((r) => setTimeout(r, 40));
  assert.ok(calls.some((c) => c.method === 'GET' && /cursor=/.test(c.u)));
  globalThis.fetch = prev;
});
