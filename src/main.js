import './styles.css';
import './brand-lock-home.css';
import './skip-content.css';
import './featured-promos.css';
import './page-announcement.css';
import './updates.css';
import './viral-live.css';
import './shield.css';
import './wallet-premium.css';
import './dating-premium.css';
import './notifications-premium.css';
import './messages-premium.css';
import './missions-premium.css';
import './loyalty-premium.css';
import './fanclubs-premium.css';
import './earnings-premium.css';
import './openmic-premium.css';
import './clippers-premium.css';
import './ai-artists.css';

import { getState, setState, subscribe } from './store.js';
import { parseRoute, navigate } from './router.js';
import { toast, openDrawer, closeDrawer, renderDrawer, updateChrome } from './ui.js';
import { ensureCreateMenu, openCreateMenu, closeCreateMenu } from './create-menu.js';
import { ensureMusicMenu, openMusicMenu, closeMusicMenu } from './music-menu.js';
import { SECTION_MENU_ITEMS } from './section-menus.js';
import { markActiveTab } from './tabbar-state.js';
import { initPlayer } from './player.js';
import { getAuthState, getCurrentUser } from './auth/service.js';
import { AUTH_STATES } from './auth/readiness.js';
import { bindPageAnnouncement } from './page-announcement.js';
import { renderStoriesAndPromotions, bindStoriesAndPromotions } from './featured-promos.js';

// NOTE: This file is truncated in tool payload — DO NOT USE FULL REPLACE
