import {esc, shellPage, toast} from '../ui.js';
import {normalizeShieldSubmission,readShieldIntakes,saveShieldIntake,removeShieldIntake,RIGHTS_OPTIONS,safeShieldUrl,serializeShieldDrafts,importShieldDrafts} from '../pikk-shield.js';
const data = () => readShieldIntakes(window.localStorage);
export function renderShield() {
  const entries = data();
  const history = entries.length ? entries.map(e=>{
    // Local storage can be edited outside the form: validate links again before rendering.
    const source = safeShieldUrl(e.source);
    return `
    <article class="card shield-entry" data-shield-id="${esc(e.id)}" data-shield-search="${esc(`${e.title || ""} ${e.owner || ""}`.toLocaleLowerCase())}">
      <div class="row wrap"><strong>${esc(e.title)}</strong><span class="chip">${esc(e.status)}</span></div>
      <p class="muted">${esc(e.owner)} · ${esc(e.rights)}</p>
      <details class="shield-draft-details">
        <summary>Review saved draft details</summary>
        <p class="muted"><strong>Contact:</strong> ${esc(e.contact || 'Not provided')}</p>
        ${source ? `<p class="muted"><strong>Source:</strong> <a href="${esc(source)}" target="_blank" rel="noopener noreferrer">Open official source</a></p>` : ''}
        ${e.notes ? `<p class="muted"><strong>Rights details:</strong> ${esc(e.notes)}</p>` : ''}
        <p class="muted">Saved on this device only · Not submitted to PIKK</p>
      </details>
      <div class="row wrap"><small>${new Date(e.at).toLocaleDateString()}</small><button type="button" class="btn ghost shield-delete" data-id="${esc(e.id)}">Delete local draft</button></div>
    </article>`;
  }).join('') : '<p class="muted">No rights declarations saved on this device.</p>';
  return shellPage('PIKK Shield', `
    <div class="shield-studio">
      <header class="shield-hero">
        <div class="shield-kicker">PIKK CREATOR PROTECTION · EARLY ACCESS</div>
        <h2>Your music. Your rights. Your control.</h2>
        <p>Record a draft ownership declaration for music you have rights to. This prototype saves information only on this device.</p>
        <p class="shield-notice"><strong>TEST MODE:</strong> No upload scanning, automated fingerprinting, copyright registration, takedown, or staff review is active. These records are not sent to PIKK.</p>
      </header>
      <div class="shield-grid">
        <section class="card shield-panel">
          <h3>Rights declaration draft</h3>
          <p class="muted">Only certify work you own or are authorized to distribute. Do not enter confidential agreements or private documents.</p>
          <form id="shieldForm">
            <div class="field"><label for="shieldTitle">Song or album title *</label><input id="shieldTitle" name="title" maxlength="120" required /></div>
            <div class="field"><label for="shieldOwner">Rights holder / artist *</label><input id="shieldOwner" name="owner" maxlength="100" required /></div>
            <div class="field"><label for="shieldRights">Rights basis *</label><select id="shieldRights" name="rights" required>${RIGHTS_OPTIONS.map(o=>`<option value="${esc(o)}">${esc(o)}</option>`).join('')}</select></div>
            <div class="field"><label for="shieldContact">Contact for future review *</label><input id="shieldContact" name="contact" maxlength="180" required placeholder="Artist email or business contact" /></div>
            <div class="field"><label for="shieldSource">Official public source link (optional)</label><input id="shieldSource" name="source" type="url" placeholder="https://..." /></div>
            <div class="field"><label for="shieldNotes">Rights details (optional)</label><textarea id="shieldNotes" name="notes" maxlength="800" placeholder="Describe your original work or license permission"></textarea></div>
            <label class="shield-certify"><input id="shieldCertify" type="checkbox" required /> I certify that I own or am authorized to use these rights, and understand that this is a local draft, not registration or a submitted claim.</label>
            <div class="row wrap shield-form-actions"><button type="submit" class="btn primary">Save rights draft on this device</button><button type="reset" class="btn ghost">Clear form</button></div>
          </form>
        </section>
        <section class="card shield-panel">
          <h3>Protection roadmap</h3>
          <div class="shield-roadmap">
            <div><strong>01 · Rights declarations</strong><span>Local drafts available now; secure submission and admin review not connected</span></div>
            <div><strong>02 · Audio fingerprinting</strong><span>Planned — no matching or altered-audio detection active</span></div>
            <div><strong>03 · Dispute and appeals</strong><span>Planned — no claim or takedown enforcement active</span></div>
            <div><strong>04 · External platform notices</strong><span>Planned — PIKK cannot automatically remove copies from YouTube, Apple or Spotify</span></div>
          </div>
          <div class="row wrap shield-drafts-header"><h3>My local drafts (${entries.length})</h3><div class="row wrap shield-backup-actions">${entries.length ? '<button type="button" class="btn ghost" id="shieldExportDrafts">Download local backup (.json)</button>' : ""}<button type="button" class="btn ghost" id="shieldImportDrafts">Restore local backup (.json)</button><input id="shieldImportFile" type="file" accept=".json,application/json" hidden aria-label="Choose a PIKK Shield JSON backup" /></div></div>
          <p class="muted shield-backup-notice">Backups contain your contact and rights details. Store them privately. Restoring merges drafts on this device only; it does not register or submit copyright claims.</p>
          ${entries.length ? `<div class="field shield-search"><label for="shieldDraftSearch">Find a saved draft</label><input id="shieldDraftSearch" type="search" placeholder="Search song or artist" autocomplete="off" /><p class="muted shield-search-count" role="status" aria-live="polite" id="shieldSearchCount">Showing ${entries.length} of ${entries.length} drafts</p></div>` : ""}
          <div class="shield-history">${history}</div>
          ${entries.length ? '<p class="muted" id="shieldSearchEmpty" hidden>No saved drafts match your search.</p>' : ""}
        </section>
      </div>
    </div>`, {lead:'Rights declaration preview · No official copyright protection is active yet'});
}
export function bindShield(root) {
  root.querySelector('#shieldForm')?.addEventListener('submit', event=>{
    event.preventDefault();
    const f=event.currentTarget;
    try {
      const item=normalizeShieldSubmission({
        title:f.elements.title.value,owner:f.elements.owner.value,rights:f.elements.rights.value,
        contact:f.elements.contact.value,source:f.elements.source.value,notes:f.elements.notes.value,
        certified:root.querySelector('#shieldCertify').checked
      });
      saveShieldIntake(window.localStorage,item);
      toast('Local rights draft saved — not submitted');
      location.hash = '#/shield?updated=1';
      // Re-render through an explicit hash update (even if the route was already open).
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    } catch(e){toast(e.message)}
  });
  const importFile = root.querySelector('#shieldImportFile');
  root.querySelector('#shieldImportDrafts')?.addEventListener('click', () => importFile?.click());
  importFile?.addEventListener('change', async () => {
    const file = importFile.files?.[0];
    if (!file) return;
    try {
      if (file.size > 65536) throw new Error('Backup file must be under 64 KB.');
      const json = await file.text();
      if (!window.confirm('Restore PIKK Shield drafts from this file? Valid drafts will be merged into this browser, without replacing existing drafts.')) return;
      const result = importShieldDrafts(window.localStorage, json);
      toast(`Restored ${result.added} local draft(s); ${result.duplicates} already saved`);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    } catch (error) { toast(error.message || 'Unable to restore backup'); }
    finally { importFile.value = ''; }
  });
  root.querySelector('#shieldExportDrafts')?.addEventListener('click', () => {
    // Only a direct user click creates a local download; no data is sent to PIKK.
    const json = serializeShieldDrafts(window.localStorage);
    const url = URL.createObjectURL(new Blob([json], {type:'application/json'}));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pikk-shield-local-drafts.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('Local backup downloaded — store it privately');
  });
  const search = root.querySelector('#shieldDraftSearch');
  const cards = [...root.querySelectorAll('.shield-entry')];
  search?.addEventListener('input', () => {
    const term = search.value.trim().toLocaleLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const matches = card.dataset.shieldSearch.includes(term);
      card.hidden = !matches;
      if (matches) visible++;
    });
    const count = root.querySelector('#shieldSearchCount');
    if (count) count.textContent = `Showing ${visible} of ${cards.length} drafts`;
    const empty = root.querySelector('#shieldSearchEmpty');
    if (empty) empty.hidden = visible !== 0;
  });
  root.querySelectorAll('.shield-delete').forEach(b=>b.addEventListener('click',()=>{
    // Drafts exist only in this browser: accidental deletion cannot be recovered from PIKK.
    const title = b.closest('.shield-entry')?.querySelector('strong')?.textContent || 'this rights draft';
    if (!window.confirm(`Delete local rights draft "${title}"? This cannot be undone.`)) return;
    removeShieldIntake(window.localStorage,b.dataset.id);
    toast('Local draft deleted');
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }));
}
