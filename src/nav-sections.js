/**
 * Single source of truth for the seven bottom-tab sections, shared by the tab option
 * sheets and the ☰ drawer groups (owner: drawer mirrors tabs, same full lists).
 */
import { TABBAR, DRAWER_GROUPS } from './data.js';
import { MUSIC_MENU_ITEMS } from './music-menu.js';
import { SECTION_MENU_ITEMS } from './section-menus.js';
import { CREATE_MENU_ITEMS } from './create-menu.js';
import { PROMOTE_SECTIONS, promoteHref } from './promote-data.js';

const norm = (i) => ({ title: i.title || i.label, href: i.href || '', detail: i.detail || '' });

export function sectionItems(key) {
  if (key === 'music') return MUSIC_MENU_ITEMS.map(norm);
  if (key === 'create') return CREATE_MENU_ITEMS.map(norm);
  return (SECTION_MENU_ITEMS[key] || []).map(norm);
}

/** Tab keys in exact bottom-tab order. */
export const TAB_KEYS = TABBAR.map((t) => t.href.replace('#/', ''));

/** Promote group (t337u): after tab groups, before utilities; each deep-links to a #/promote section. */
export const PROMOTE_GROUP = Object.freeze({ id: 'promote', label: 'Promote', links: PROMOTE_SECTIONS.map((s) => ({ href: promoteHref(s.id), label: s.title })) });

const UTILITY = [
  { id: 'explore', label: 'Explore', href: '#/explore' },
  { id: 'profile', label: 'Profile / Sign in', href: '#/profile' },
  { id: 'messages', label: 'Messages', href: '#/messages' },
  { id: 'notifications', label: 'Notifications', href: '#/notifications' },
  { id: 'settings', label: 'Settings', href: '#/profile?tab=settings' },
  { id: 'donate', label: 'Donate · PIKK goal', href: '#/donate' },
];

const pathOf = (h) => '/' + String(h).replace(/^#\/?/, '').split(/[?#]/)[0];

/** Drawer: Home · 7 tab groups (tab order) · utilities · More (every other legacy destination). */
export function drawerGroups() {
  const tabs = TAB_KEYS.map((key) => {
    const tab = TABBAR.find((t) => t.href === '#/' + key);
    return { id: key, label: tab.label, links: sectionItems(key).map((i) => ({ href: i.href, label: i.title, soon: !i.href, detail: i.detail })) };
  });
  const covered = new Set(['/home', ...tabs.flatMap((g) => g.links.filter((l) => l.href).map((l) => pathOf(l.href))), ...UTILITY.map((u) => pathOf(u.href)), '/promote']);
  const legacy = DRAWER_GROUPS.flatMap((g) => (g.href ? [{ href: g.href, label: g.label }] : g.links || []));
  const seen = new Set();
  const more = legacy.filter((l) => { const p = pathOf(l.href); if (covered.has(p) || seen.has(p)) return false; seen.add(p); return true; });
  return [{ id: 'home', label: 'Home', href: '#/home' }, ...tabs, PROMOTE_GROUP, ...UTILITY, { id: 'more', label: 'More', links: more },
    { id: 'updates', label: "What's New · App Updates", href: '#/updates' }];
}
