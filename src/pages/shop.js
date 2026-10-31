/** §22 Profile Shop — digital cosmetics CONCEPT / TEST MODE (Design).
 *  No real payments. Separate from Foreign X-Change physical merch (#/merch).
 *  Badges are cosmetic styles only — never false Founder/Verified status.
 */
import { PROFILE_SHOP, SHOP_CATEGORIES } from '../data.js';
import {
  getState,
  getProfileShop,
  unlockCosmetic,
  unlockDemoBundle,
  equipCosmetic,
  unequipCosmetic,
  setShopReduceMotion,
  resetProfileShopDemo,
  shopSlotForItem,
} from '../store.js';
import { esc, toast, shellPage } from '../ui.js';
import { navigate } from '../router.js';

/** Ephemeral UI: selected catalog item for live preview (not persisted). */
let previewId = null;
/** Ephemeral UI: active category chip. */
let activeCat = 'all';

try {
  const seededCat = sessionStorage.getItem('dbs_shop_cat');
  if (seededCat) {
    activeCat = seededCat;
    sessionStorage.removeItem('dbs_shop_cat');
  }
  const seededPreview = sessionStorage.getItem('dbs_shop_preview');
  if (seededPreview) {
    previewId = seededPreview;
    sessionStorage.removeItem('dbs_shop_preview');
  }
} catch (_) {}

function refresh() {
  navigate('#/profile-shop');
}

function itemById(id) {
  return PROFILE_SHOP.find((x) => x.id === id) || null;
}

function slotOf(item) {
  return shopSlotForItem(item);
}

/** Merge equipped + optional preview override for one mock card. */
function previewLook(shop) {
  const look = { ...shop.equipped };
  const sel = previewId ? itemById(previewId) : null;
  if (sel) {
    const slot = slotOf(sel);
    if (slot) look[slot] = sel.id;
  }
  return look;
}

function rarityClass(r) {
  return `rarity-${esc(r || 'rare')}`;
}

function formatPrice(n) {
  return `$${Number(n).toFixed(2)}`;
}

function renderPreviewCard(shop) {
  const { user } = getState();
  const look = previewLook(shop);
  const frame = look.frame ? itemById(look.frame) : null;
  const effect = look.effect ? itemById(look.effect) : null;
  const banner = look.banner ? itemById(look.banner) : null;
  const nameStyle = look.nameStyle ? itemById(look.nameStyle) : null;
  const badge = look.badge ? itemById(look.badge) : null;
  const name = user?.username || 'DemoFan';
  const reduce = shop.reduceMotion;
  const fxClass = effect
    ? `shop-fx shop-fx--${esc(effect.id.replace(/^fx-/, ''))}${reduce ? ' shop-fx--still' : ''}`
    : '';
  const nameClass = nameStyle
    ? `shop-name shop-name--${esc(nameStyle.id.replace(/^name-/, ''))}`
    : 'shop-name';
  const frameClass = frame
    ? `shop-avatar-frame shop-frame--${esc(frame.id.replace(/^frame-/, ''))}`
    : 'shop-avatar-frame';
  const bannerClass = banner
    ? `shop-preview-banner shop-banner--${esc(banner.id.replace(/^ban-/, ''))}`
    : 'shop-preview-banner shop-banner--default';

  return `
    <div class="shop-preview card" id="shopPreview">
      <div class="row wrap" style="justify-content:space-between;gap:8px;margin-bottom:10px">
        <h3 style="margin:0">Live preview</h3>
        <span class="chip">CONCEPT</span>
      </div>
      <div class="${bannerClass}" aria-hidden="true">
        <span class="shop-banner-emoji">${banner ? esc(banner.emoji) : '🎧'}</span>
      </div>
      <div class="shop-preview-body ${fxClass}">
        <div class="${frameClass}">
          <div class="shop-avatar-inner">${esc((name || 'D').slice(0, 1).toUpperCase())}</div>
          ${frame ? `<span class="shop-frame-emoji" aria-hidden="true">${esc(frame.emoji)}</span>` : ''}
        </div>
        <div class="shop-preview-meta">
          <div class="${nameClass}">${esc(name)}</div>
          <p class="muted small" style="margin:4px 0 0">Cosmetic preview only · not a status grant</p>
          ${
            badge
              ? `<span class="shop-cosmetic-badge" title="Cosmetic style — not Verified/Founder">${esc(badge.emoji)} ${esc(badge.name)}</span>`
              : `<span class="muted small">No cosmetic badge equipped</span>`
          }
        </div>
      </div>
      <div class="shop-equipped-row">
        ${['frame', 'effect', 'banner', 'nameStyle', 'badge']
          .map((slot) => {
            const id = look[slot];
            const it = id ? itemById(id) : null;
            const label =
              slot === 'nameStyle' ? 'Name' : slot.charAt(0).toUpperCase() + slot.slice(1);
            return `<span class="shop-eq-chip ${it ? 'on' : ''}">${esc(label)}: ${
              it ? esc(it.emoji + ' ' + it.name) : '—'
            }</span>`;
          })
          .join('')}
      </div>
    </div>`;
}

function renderCard(item, shop) {
  const owned = shop.owned.includes(item.id);
  const slot = slotOf(item);
  const equipped = slot && shop.equipped[slot] === item.id;
  const selected = previewId === item.id;
  return `
    <article class="cosmetic-card ${rarityClass(item.rarity)} ${selected ? 'is-selected' : ''} ${
      owned ? 'is-owned' : ''
    } ${equipped ? 'is-equipped' : ''}" data-id="${esc(item.id)}">
      <div class="cosmetic-art" role="button" tabindex="0" data-preview="${esc(item.id)}" aria-label="Preview ${esc(item.name)}">
        <span class="cosmetic-emoji">${esc(item.emoji)}</span>
        <span class="concept-flag">CONCEPT</span>
        ${owned ? `<span class="owned-flag">Owned</span>` : ''}
        ${equipped ? `<span class="equipped-flag">Equipped</span>` : ''}
      </div>
      <div class="body">
        <div class="name">${esc(item.name)}</div>
        <div class="meta">${esc(item.category)} · ${esc(item.rarity)}</div>
        <div class="price">${formatPrice(item.price)} <span class="chip" style="margin-left:4px">TEST MODE</span></div>
        <div class="cosmetic-actions row wrap" style="gap:6px;margin-top:8px">
          <button type="button" class="btn ghost shop-act" data-act="preview" data-id="${esc(item.id)}">Preview</button>
          ${
            owned
              ? equipped
                ? `<button type="button" class="btn shop-act" data-act="unequip" data-slot="${esc(slot)}" data-id="${esc(item.id)}">Unequip</button>`
                : `<button type="button" class="btn primary shop-act" data-act="equip" data-id="${esc(item.id)}">Equip</button>`
              : `<button type="button" class="btn primary shop-act" data-act="unlock" data-id="${esc(item.id)}">Unlock · TEST MODE</button>`
          }
        </div>
      </div>
    </article>`;
}

export function renderShop() {
  const shop = getProfileShop();
  const items =
    activeCat === 'all'
      ? PROFILE_SHOP
      : PROFILE_SHOP.filter((i) => i.category === activeCat);

  const chips = SHOP_CATEGORIES.map(
    (c) =>
      `<button type="button" class="shop-chip ${activeCat === c.id ? 'on' : ''}" data-cat="${esc(
        c.id
      )}" aria-pressed="${activeCat === c.id ? 'true' : 'false'}">${esc(c.label)}</button>`
  ).join('');

  const grid =
    items.length === 0
      ? `<p class="muted">No cosmetics in this category.</p>`
      : `<div class="cosmetic-grid">${items.map((i) => renderCard(i, shop)).join('')}</div>`;

  const body = `
    <div class="shop-concept">
      <img src="/design/DBS_Profile_Shop_Concept.png" alt="Profile Shop concept art" />
    </div>

    <div class="shop-note">
      <strong>Digital cosmetics ≠ physical merch.</strong>
      Frames, effects, banners, name styles, and badge <em>styles</em> live here (CONCEPT / TEST MODE — no real charges).
      Physical Foreign X-Change gear stays on
      <a href="#/merch">#/merch</a>
      and
      <a href="https://foreignx-change.com" target="_blank" rel="noopener">foreignx-change.com</a>
      (homepage only — no invented product URLs).
      Cosmetic badges never grant Founder or Verified status.
    </div>

    ${renderPreviewCard(shop)}

    <div class="card">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center;margin-bottom:10px">
        <h3 style="margin:0">Catalog · ${PROFILE_SHOP.length} items</h3>
        <div class="row wrap" style="gap:8px">
          <span class="chip">${shop.owned.length} owned</span>
          <span class="chip">CONCEPT</span>
          <span class="chip">TEST MODE</span>
        </div>
      </div>
      <div class="shop-chips" role="tablist" aria-label="Cosmetic categories">${chips}</div>
      <label class="shop-reduce row" style="gap:8px;align-items:center;margin:0 0 12px;cursor:pointer">
        <input type="checkbox" id="shopReduceMotion" ${shop.reduceMotion ? 'checked' : ''} />
        <span>Reduce motion (effects)</span>
      </label>
      <div class="row wrap" style="gap:8px;margin-bottom:14px">
        <button type="button" class="btn" id="shopBundle">Unlock starter bundle · TEST MODE</button>
        <button type="button" class="btn ghost" id="shopReset">Reset demo inventory</button>
        <a class="btn" href="#/merch">Physical merch</a>
        <a class="btn" href="#/profile">Profile</a>
      </div>
      ${grid}
    </div>
  `;

  return shellPage('Profile Shop', body, {
    lead: 'PIKK digital cosmetics · live preview · CONCEPT / TEST MODE.',
    badge: 'Phase 2 · CONCEPT',
  });
}

export function bindShop(root) {
  root.querySelectorAll('.shop-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeCat = btn.dataset.cat || 'all';
      refresh();
    });
  });

  root.querySelector('#shopReduceMotion')?.addEventListener('change', (e) => {
    setShopReduceMotion(e.target.checked);
    toast(e.target.checked ? 'Motion reduced' : 'Motion on');
    refresh();
  });

  root.querySelector('#shopBundle')?.addEventListener('click', () => {
    const res = unlockDemoBundle();
    toast(`Starter bundle unlocked · ${res.unlocked?.length || 0} items · no charge`);
    refresh();
  });

  root.querySelector('#shopReset')?.addEventListener('click', () => {
    resetProfileShopDemo();
    previewId = null;
    toast('Demo inventory reset');
    refresh();
  });

  const doPreview = (id) => {
    previewId = id;
    toast('Preview updated');
    refresh();
  };

  root.querySelectorAll('[data-preview]').forEach((el) => {
    el.addEventListener('click', () => doPreview(el.dataset.preview));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        doPreview(el.dataset.preview);
      }
    });
  });

  root.querySelectorAll('.shop-act').forEach((btn) => {
    btn.addEventListener('click', () => {
      const act = btn.dataset.act;
      const id = btn.dataset.id;
      if (act === 'preview') return doPreview(id);
      if (act === 'unlock') {
        const res = unlockCosmetic(id);
        if (res.error) return toast('Could not unlock');
        previewId = id;
        toast(res.already ? 'Already owned · TEST MODE' : 'Unlocked · TEST MODE · no charge');
        return refresh();
      }
      if (act === 'equip') {
        const res = equipCosmetic(id);
        if (res.error === 'not_owned') return toast('Unlock first · TEST MODE');
        if (res.error) return toast('Could not equip');
        previewId = id;
        toast('Equipped');
        return refresh();
      }
      if (act === 'unequip') {
        const slot = btn.dataset.slot;
        const res = unequipCosmetic(slot);
        if (res.error) return toast('Could not unequip');
        // Clear ephemeral Preview override when it was this slot (Preview ≠ equipped)
        const sel = previewId ? itemById(previewId) : null;
        if (sel && shopSlotForItem(sel) === slot) previewId = null;
        toast('Unequipped');
        return refresh();
      }
    });
  });
}
