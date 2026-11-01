import { esc, shellPage, toast } from '../ui.js';
import { innerCircle, favorites, addStory, listStories, removeStory, rankByFavorites, AUDIENCES } from '../circle-store.js';

const TEST = '<p class="pikk-ic-test">TEST MODE · Saved only on this device until PIKK accounts are live. No one is notified.</p>';
const ring = (aud) => aud === 'circle' ? '<span class="pikk-ic-badge" title="Inner Circle only">◎ Inner Circle</span>' : '<span class="pikk-ic-everyone">Everyone</span>';
const star = '<span class="pikk-fav-star" aria-hidden="true">★</span>';
const subnav = (on) => `<nav class="pikk-ic-subnav" aria-label="Stories and people">${[['#/story', 'New Story'], ['#/inner-circle', 'Inner Circle'], ['#/favorites', 'Favorites']].map(([h, l]) => `<a href="${h}"${h === on ? ' aria-current="page" class="on"' : ''}>${l}</a>`).join('')}</nav>`;

function peopleList(kind) {
  const store = kind === 'circle' ? innerCircle : favorites;
  const items = store.list();
  if (!items.length) return `<p class="muted pikk-ic-empty">${kind === 'circle' ? 'Your Inner Circle is empty. Add people by @handle.' : 'No favorites yet. Add people by @handle.'}</p>`;
  return `<ul class="pikk-ic-people">${items.map((h) => `<li>${kind === 'fav' ? star : '<span class="pikk-ic-dot" aria-hidden="true"></span>'}<span>@${esc(h)}</span><button type="button" class="btn ghost" data-remove="${esc(h)}" aria-label="Remove @${esc(h)}">Remove</button></li>`).join('')}</ul>`;
}
function adder(kind) {
  const label = kind === 'circle' ? 'Add to Inner Circle' : 'Add favorite';
  return `<form class="pikk-ic-add" data-add-form="${kind}"><label class="sr-only" for="ic-add-${kind}">@handle</label><input id="ic-add-${kind}" name="h" placeholder="@handle" autocomplete="off" maxlength="31" /><button class="btn primary" type="submit">${label}</button></form>`;
}
export function renderInnerCircle() {
  return shellPage('Inner Circle', `${subnav('#/inner-circle')}
    <section class="pikk-ic-hero"><span class="pikk-ic-ring-demo" aria-hidden="true"></span><div><h2>Inner Circle</h2><p>Share stories with a private list you choose. Stories set to Inner Circle show a blue chrome ring and only people on this list can view them.</p></div></section>
    <section class="card pikk-ic-panel"><h3>People in your Inner Circle (<span data-count>${innerCircle.list().length}</span>)</h3>${adder('circle')}<div data-people="circle">${peopleList('circle')}</div>${TEST}</section>`, { badge: 'TEST MODE' });
}
export function renderFavorites() {
  return shellPage('Favorites', `${subnav('#/favorites')}
    <section class="pikk-ic-hero pikk-fav-hero"><span class="pikk-fav-star big" aria-hidden="true">★</span><div><h2>Favorites</h2><p>Posts and stories from people you favorite rank first in your feeds. Reorder by removing and re-adding; the first favorite ranks highest.</p></div></section>
    <section class="card pikk-ic-panel"><h3>Your favorites (<span data-count>${favorites.list().length}</span>)</h3>${adder('fav')}<div data-people="fav">${peopleList('fav')}</div>${TEST}</section>`, { badge: 'TEST MODE' });
}
function storyList() {
  const items = rankByFavorites(listStories());
  if (!items.length) return '<p class="muted pikk-ic-empty">No stories in the last 24 hours on this device.</p>';
  return `<ul class="pikk-story-list">${items.map((s) => `<li class="pikk-story-item${s.audience === 'circle' ? ' is-circle' : ''}"><span class="pikk-story-ring${s.audience === 'circle' ? ' circle' : ''}" aria-hidden="true">${esc(s.author.slice(0, 1).toUpperCase())}</span><div><p>${esc(s.text)}</p><small>${favorites.has(s.author) ? star + ' ' : ''}@${esc(s.author)} · ${ring(s.audience)}</small></div><button type="button" class="btn ghost" data-del-story="${esc(s.id)}" aria-label="Delete story">Delete</button></li>`).join('')}</ul>`;
}
export function renderStory() {
  return shellPage('New Story', `${subnav('#/story')}
    <form class="card pikk-story-form" data-story-form>
      <label for="story-text"><strong>Your story</strong></label>
      <textarea id="story-text" name="text" maxlength="280" rows="3" placeholder="What's happening?"></textarea>
      <fieldset class="pikk-audience"><legend>Who can see this?</legend>
        <label><input type="radio" name="audience" value="everyone" checked /> <span>${AUDIENCES.everyone}</span></label>
        <label><input type="radio" name="audience" value="circle" /> <span class="pikk-ic-badge">◎ ${AUDIENCES.circle}</span> <small data-circle-count>(${innerCircle.list().length} people)</small></label>
      </fieldset>
      <p class="muted pikk-aud-hint"><a href="#/inner-circle">Edit Inner Circle list</a></p>
      <button class="btn primary" type="submit">Share story</button>
      ${TEST}
    </form>
    <section class="card pikk-ic-panel"><h3>Your recent stories</h3><div data-stories>${storyList()}</div></section>`, { badge: 'TEST MODE' });
}
function bindPeople(root, kind) {
  const store = kind === 'circle' ? innerCircle : favorites;
  const refresh = () => { root.querySelector(`[data-people="${kind}"]`).innerHTML = peopleList(kind); const c = root.querySelector('[data-count]'); if (c) c.textContent = store.list().length; };
  root.querySelector(`[data-add-form="${kind}"]`)?.addEventListener('submit', (e) => { e.preventDefault(); const i = e.target.h; if (store.add(i.value)) { i.value = ''; refresh(); toast(kind === 'circle' ? 'Added to Inner Circle' : 'Added to Favorites'); } else toast('Enter a valid @handle (2–30 letters, numbers, _ or .)'); });
  root.addEventListener('click', (e) => { const b = e.target.closest('[data-remove]'); if (b) { store.remove(b.dataset.remove); refresh(); } });
}
export const bindInnerCircle = (root = document) => bindPeople(root, 'circle');
export const bindFavorites = (root = document) => bindPeople(root, 'fav');
export function bindStory(root = document) {
  const f = root.querySelector('[data-story-form]'); if (!f) return;
  f.addEventListener('submit', (e) => {
    e.preventDefault(); const aud = f.querySelector('input[name=audience]:checked')?.value;
    if (aud === 'circle' && !innerCircle.list().length) { toast('Add people to your Inner Circle first'); return; }
    if (!addStory({ text: f.text.value, audience: aud })) { toast('Write something first'); return; }
    f.text.value = ''; root.querySelector('[data-stories]').innerHTML = storyList(); toast(aud === 'circle' ? 'Shared to Inner Circle · TEST MODE' : 'Shared to Everyone · TEST MODE');
  });
  root.addEventListener('click', (e) => { const b = e.target.closest('[data-del-story]'); if (b) { removeStory(b.dataset.delStory); root.querySelector('[data-stories]').innerHTML = storyList(); } });
}
