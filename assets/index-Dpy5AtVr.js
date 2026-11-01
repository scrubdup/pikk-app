(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function s(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(a){if(a.ep)return;a.ep=!0;const n=s(a);fetch(a.href,n)}})();function or(e,t=Date.now()){const s=new URL(e);return s.searchParams.set("refresh",String(t)),s.toString()}var rr;(rr=document.getElementById("pikk-refresh-link"))==null||rr.addEventListener("click",function(e){e.preventDefault(),window.location.assign(or(window.location.href))});const ul={BASE_URL:"/pikk-app/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_BASE:"/pikk-app/",VITE_BUILD_SHA:"291f11d05ef96fdf66e148305b5086c039e18093"},Ft=Object.freeze([{name:"Block Wars",players:"1–2",icon:"🥊",theme:"fighters",artwork:"/games/approved/01_block_wars.jpg",description:"City-based fighters, combos and special moves.",href:"#/blockwars"},{name:"PIKK Playground",players:"1–8",icon:"🎈",theme:"playground",artwork:"/games/approved/02_pikk_playground.jpg",description:"Create your character, race, jump and explore with friends."},{name:"PIKK Clash",players:"1",icon:"💎",theme:"clash",artwork:"/games/approved/03_pikk_clash.jpg",description:"Original neighborhood-themed match puzzles and venue upgrades."},{name:"PIKK Knockout",players:"1",icon:"💥",theme:"knockout",artwork:"/games/approved/04_pikk_knockout.jpg",description:"Stylized physics challenges: launch, bounce and knock targets off moving platforms."},{name:"PIKK Bowling",players:"1–4",icon:"🎳",theme:"bowling",artwork:"/games/approved/05_pikk_bowling.jpg",description:"Compete for strikes, spares and high scores."},{name:"PIKK Pickleball",players:"2–4",icon:"🏓",theme:"pickleball",artwork:"/games/approved/06_pikk_pickleball.jpg",description:"Play singles or doubles on colorful courts."},{name:"PIKK Pool",players:"1–2",icon:"🎱",theme:"pool",artwork:"/games/approved/07_pikk_pool.jpg",description:"Play 8-ball pool against friends or the computer."},{name:"PIKK Cup Pong",players:"2–4",icon:"🥤",theme:"pong",artwork:"/games/approved/08_pikk_cup_pong.jpg",description:"Aim, throw and eliminate opponents’ cups."},{name:"PIKK Poker",players:"2–8",icon:"♠️",theme:"poker",artwork:"/games/approved/09_pikk_poker.jpg",description:"Social Texas Hold’em with nonredeemable Play Chips."},{name:"PIKK Blackjack",players:"1–5",icon:"🃏",theme:"blackjack",artwork:"/games/approved/10_pikk_blackjack.jpg",description:"Try for 21 against the dealer using Play Chips."},{name:"PIKK Slots",players:"1",icon:"🎰",theme:"slots",artwork:"/games/approved/11_pikk_slots.jpg",description:"Entertainment-only reels and virtual Play Chips."},{name:"PIKK Speed",players:"2",icon:"⚡",theme:"speed",artwork:"/games/approved/12_pikk_speed.jpg",description:"Race to play your cards before your opponent."},{name:"PIKK Spades",players:"4",icon:"♠",theme:"spades",artwork:"/games/approved/13_pikk_spades.jpg",description:"Partner strategy and card battles."},{name:"PIKK Dominoes",players:"2–4",icon:"🁢",theme:"dominoes",artwork:"/games/approved/14_pikk_dominoes.jpg",description:"Match tiles and outplay opponents."},{name:"PIKK Chess",players:"2",icon:"♟",theme:"chess",artwork:"/games/approved/15_pikk_chess.jpg",description:"Challenge opponents in a classic strategy game."}]);function ys(e){return e!=null&&e.artwork?(ul&&"/pikk-app/"||"/").replace(/\/?$/,"/")+String(e.artwork).replace(/^\/+/,""):""}let nn;function g(e){const t=document.getElementById("toast");t&&(t.textContent=e,t.classList.add("show"),clearTimeout(nn),nn=setTimeout(()=>t.classList.remove("show"),2400))}function l(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function K(e){const t=Math.max(0,Math.floor((Date.now()-e)/1e3));if(t<60)return t+"s";const s=Math.floor(t/60);if(s<60)return s+"m";const i=Math.floor(s/60);return i<24?i+"h":Math.floor(i/24)+"d"}function I(e,t,s={}){let i="";if(s.badgeHtml)i=s.badgeHtml;else if(s.badge){const n=l(s.badge),o=s.badgeAria?` aria-label="${l(s.badgeAria)}"`:"",r=s.badgeTitle||s.badgeAria?` title="${l(s.badgeTitle||s.badgeAria)}"`:"";s.badgeHref?i=`<a class="badge-phase"${o}${r} href="${l(s.badgeHref)}">${n}</a>`:i=`<span class="badge-phase"${o}${r}>${n}</span>`}const a=s.lead?`<p class="lead">${s.lead}</p>`:"";return`
    <section class="page">
      <header class="page-head">
        <h1>${l(e)} ${i}</h1>
        ${a}
      </header>
      ${t}
    </section>
  `}const ks={heart:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.5c0 4.6-8.8 10.4-8.8 10.4S3.2 13.1 3.2 8.5a4.5 4.5 0 0 1 8.8-1.2 4.5 4.5 0 0 1 8.8 1.2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',home:'<svg viewBox="0 0 24 24"><path d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5z" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',posts:'<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 10h8M8 14h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',camera:'<svg viewBox="0 0 24 24"><path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h2.1l1.2-1.8A1.5 1.5 0 0 1 11 3.5h2a1.5 1.5 0 0 1 1.2.7L15.4 6h2.1A2.5 2.5 0 0 1 20 8.5v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-8z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="12.5" r="3.2" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',music:'<svg viewBox="0 0 24 24"><path d="M9 18V6l10-2v12" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="7" cy="18" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="16" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',merch:'<svg viewBox="0 0 24 24"><path d="M6 8h12l1 12H5L6 8zm3-3a3 3 0 0 1 6 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',explore:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m20 20-3.5-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',live:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" fill="currentColor"/><circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.2" opacity=".5"/></svg>',profile:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 19a7 7 0 0 1 14 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',videos:'<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10 9.5v5l5-2.5-5-2.5z" fill="currentColor"/></svg>',chat:'<svg viewBox="0 0 24 24"><path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v5A2.5 2.5 0 0 1 16.5 14H11l-3.5 3v-3H7.5A2.5 2.5 0 0 1 5 11.5v-5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 17.5V19a1 1 0 0 0 1.5.85L14 17h2.5" fill="none" stroke="currentColor" stroke-width="1.6" opacity=".55"/></svg>',msg:'<svg viewBox="0 0 24 24"><rect x="3.5" y="6" width="17" height="12" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m4.5 7.5 7.5 5.2L19.5 7.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',game:'<svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="11" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 13h2.5M9.25 11.5v3M15.2 12.2h.01M17.3 14.2h.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M9 8V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V8" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>'};function Xe(e,t="rel=0"){const s=String(e||"").trim();if(!s)return"";const i=s.includes("?")?"&":"?";return`${s}${i}${t}`}const ws=Object.freeze({videos:[{title:"Video Feed",href:"#/videos",detail:"Watch and discover videos",icon:"▶"},{title:"Shorts & Reels",href:"#/shorts",detail:"Browse short-form clips",icon:"▣"},{title:"Posts",href:"#/posts",detail:"View the community feed",icon:"▤"},{title:"Upload Video",href:"#/posts?type=video",detail:"Available prototype publishing tools · TEST MODE",icon:"⇧"},{title:"24/7 Viral Live",href:"#/viral-live",detail:"Rotating viral clips · preview",icon:"◉"},{title:"Spotlight",href:"#/spotlight",detail:"Featured creators · preview",icon:"✦"},{title:"Clippers",href:"#/clippers",detail:"Clip creators · TEST MODE",icon:"✂"},{title:"Stories",detail:"24-hour stories · Coming Soon",icon:"◌"},{title:"Premieres",detail:"Video premieres · Coming Soon",icon:"▶"}],connect:[{title:"Connect",href:"#/connect",detail:"Discover people and communities",icon:"♧"},{title:"PIKK Communities",href:"#/communities",detail:"Topic discussions, votes and replies · TEST MODE",icon:"#"},{title:"Communities",href:"#/community",detail:"Explore PIKK Lounge channel rooms",icon:"☷"},{title:"Messages",href:"#/messages",detail:"Open your messages",icon:"✉"},{title:"Random Chat",href:"#/connect#connect-random-chat",detail:"Preview only · real matching unavailable",icon:"◉"},{title:"Multistream",href:"#/connect#connect-multistream",detail:"Broadcast connection preview · TEST MODE",icon:"▹"},{title:"Explore",href:"#/explore",detail:"Search people, music, videos, live",icon:"⌕"},{title:"Live Rooms",href:"#/live",detail:"Live room directory · TEST MODE",icon:"●"},{title:"Fan Clubs",href:"#/fanclubs",detail:"Creator fan clubs · TEST MODE",icon:"♛"},{title:"Party Line",href:"#/multiguest",detail:"Multi-guest rooms · preview",icon:"☎"},{title:"Notifications",href:"#/notifications",detail:"Your activity",icon:"🔔"},{title:"City Connect",detail:"City-based rooms · Coming Soon",icon:"⌂"},{title:"Events",detail:"Community events · Coming Soon",icon:"◷"}],dating:[{title:"Discover Dating",href:"#/dating",detail:"Explore dating features · TEST MODE",icon:"♡"},{title:"Messages",href:"#/messages",detail:"Open private messages",icon:"✉"},{title:"My Profile",href:"#/profile",detail:"Review your profile settings",icon:"◉"},{title:"Safety Guidelines",href:"#/guidelines",detail:"Review community safety rules",icon:"◇"},{title:"Matches",detail:"Mutual matches · Coming Soon",icon:"♥"},{title:"Liked You",detail:"Who liked you · Coming Soon",icon:"♡"},{title:"Age & ID Verification",detail:"18+ identity checks · Coming Soon",icon:"✓"},{title:"Report & Block",href:"#/shield",detail:"PIKK Shield safety tools · TEST MODE",icon:"⚑"}],games:[{title:"PIKK Arcade",href:"#/games",detail:"View the full game collection · preview",icon:"♜"},...Ft.map(e=>({title:e.name,...e.href?{href:e.href}:{},detail:e.href?"Fighting game · development preview":e.description+" · planned",icon:e.name==="Block Wars"?"▣":"♜"})),{title:"Roast Arena",href:"#/roast-arena",detail:"Roast battles · preview",icon:"🔥"},{title:"Gift Battles",href:"#/giftbattles",detail:"Live gift battles · TEST MODE",icon:"⚔"},{title:"Missions",href:"#/missions",detail:"Daily missions · TEST MODE",icon:"★"},{title:"Loyalty Rewards",href:"#/loyalty",detail:"Play Chips & rewards · no cash value",icon:"◆"}],shop:[{title:"PIKK Shop",href:"#/shop",detail:"Browse available products",icon:"▤"},{title:"Marketplace",href:"#/marketplace",detail:"Community listings · TEST MODE",icon:"◇"},{title:"Foreign X-Change",href:"#/merch",detail:"Official merchandise",icon:"✦"},{title:"Creator Pricing",href:"#/pricing",detail:"Explore creator selling information",icon:"$"},{title:"Profile Shop",href:"#/profile-shop",detail:"Creator storefront · preview",icon:"▦"},{title:"Wallet",href:"#/wallet",detail:"Balance & activity · TEST MODE",icon:"◎"},{title:"Sell on PIKK",href:"#/pricing?focus=sell",detail:"Seller rules & apply · TEST MODE",icon:"⇧"},{title:"Orders & Shipping",detail:"Order tracking · Coming Soon",icon:"⛟"},{title:"Refunds",detail:"Returns & disputes · Coming Soon",icon:"↺"}]}),ml=Object.freeze({"Video Feed":"videos","Shorts & Reels":"videos",Posts:"posts","Upload Video":"videos",Connect:"profile","PIKK Communities":"chat",Communities:"chat",Messages:"msg","Random Chat":"camera",Multistream:"live","Discover Dating":"heart","My Profile":"profile","Safety Guidelines":"heart","PIKK Arcade":"game","PIKK Speed":"game","PIKK Blackjack":"game","PIKK Slots":"game","PIKK Poker":"game","PIKK Spades":"game","PIKK Dominoes":"game","PIKK Chess":"game","PIKK Clash":"game","PIKK Knockout":"game","PIKK Playground":"game","PIKK Bowling":"game","PIKK Pickleball":"game","PIKK Pool":"game","PIKK Cup Pong":"game","Block Wars":"game","24/7 Viral Live":"live",Spotlight:"videos",Clippers:"videos",Stories:"camera",Premieres:"videos",Explore:"explore","Live Rooms":"live","Fan Clubs":"heart","Party Line":"chat",Notifications:"msg","City Connect":"explore",Events:"explore",Matches:"heart","Liked You":"heart","Age & ID Verification":"profile","Report & Block":"heart","Roast Arena":"game","Gift Battles":"live",Missions:"game","Loyalty Rewards":"game","Profile Shop":"merch",Wallet:"merch","Sell on PIKK":"merch","Orders & Shipping":"merch",Refunds:"merch","PIKK Shop":"merch",Marketplace:"merch","Foreign X-Change":"merch","Creator Pricing":"posts"}),lr={videos:"pikkVideosMenu",connect:"pikkConnectMenu",dating:"pikkDatingMenu",games:"pikkGamesMenu",shop:"pikkShopMenu"};function wt(e=!1){for(const[t,s]of Object.entries(lr)){const i=document.getElementById(s);if(!i||i.hidden)continue;i.hidden=!0;const a=document.querySelector(`#tabbar a[href="#/${t}"]`);a==null||a.setAttribute("aria-expanded","false"),e&&(a==null||a.focus())}}function hl(e,t){var r,c,d;if(!Object.hasOwn(ws,e))return;const s=lr[e];let i=document.getElementById(s);i||(i=document.createElement("div"),i.id=s,i.className="pikk-create-overlay",i.hidden=!0,i.innerHTML=`<div class="pikk-create-sheet" role="dialog" aria-modal="true" aria-labelledby="${s}Title">
      <div class="pikk-create-head"><strong id="${s}Title">${e[0].toUpperCase()+e.slice(1)} on PIKK</strong><button type="button" class="btn ghost" data-section-close aria-label="Close ${e} menu">✕</button></div>
      <div class="pikk-create-options pikk-create-grid">${ws[e].map(p=>{const m=`<span class="pikk-menu-icon" aria-hidden="true">${ks[ml[p.title]||"explore"]}</span><strong class="pikk-menu-title">${p.title}</strong><small>${p.detail}</small>`;return p.href?`<a class="pikk-create-tile" href="${p.href}">${m}</a>`:`<div class="pikk-create-tile pikk-menu-planned" aria-disabled="true">${m}</div>`}).join("")}</div>
      <button type="button" class="pikk-menu-cancel" data-section-close>Cancel</button>
      <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · Production features are not enabled until secure services are available.</p>
    </div>`,document.body.appendChild(i),i.addEventListener("click",p=>{p.target===i||p.target.closest("[data-section-close]")?wt(!0):p.target.closest(".pikk-create-options a")&&wt()}),document.addEventListener("keydown",p=>{if(i.hidden)return;if(p.key==="Escape"){p.preventDefault(),wt(!0);return}if(p.key!=="Tab")return;const m=[...i.querySelectorAll("button:not([disabled]), a[href]")],h=m[0],f=m[m.length-1];if(!h){p.preventDefault();return}i.contains(document.activeElement)?p.shiftKey&&document.activeElement===h?(p.preventDefault(),f.focus()):!p.shiftKey&&document.activeElement===f&&(p.preventDefault(),h.focus()):(p.preventDefault(),(p.shiftKey?f:h).focus())}),window.addEventListener("hashchange",()=>wt()));const a=i.hidden;wt();const n=document.getElementById("pikkMusicMenu");n&&!n.hidden&&(n.hidden=!0,(r=document.querySelector('#tabbar a[href="#/music"]'))==null||r.setAttribute("aria-expanded","false"));const o=document.getElementById("pikkCreateMenu");o&&!o.hidden&&(o.hidden=!0,(c=document.querySelector('#tabbar a[href="#/create"]'))==null||c.setAttribute("aria-expanded","false")),i.hidden=!a,t==null||t.setAttribute("aria-expanded",String(a)),a?(d=i.querySelector("[data-section-close]"))==null||d.focus():t==null||t.focus()}const cr=Object.freeze([{title:"Create on PIKK",items:[{title:"Post Photos",href:"#/posts?type=picture",detail:"Add photos · TEST MODE",icon:"camera"},{title:"Story",detail:"24-hour stories · Planned",icon:"camera"},{title:"Shorts / Reels",href:"#/posts?type=short",detail:"Short video · TEST MODE",icon:"videos"},{title:"Upload Video",href:"#/posts?type=video",detail:"Long video · TEST MODE",icon:"videos"},{title:"Create Post",href:"#/posts?type=text",detail:"Text / poll / link · TEST MODE",icon:"posts"},{title:"Go Live",href:"#/live?go=1",detail:"Start a stream · TEST MODE",icon:"live"},{title:"Upload Music",href:"#/music?view=upload",detail:"Beat / song · planned",icon:"music"},{title:"Sell Something",href:"#/marketplace",detail:"List a product · TEST MODE",icon:"merch"},{title:"Paid Content",href:"#/pricing",detail:"Premium creator content · planned",icon:"merch"}]},{title:"Social & Community",items:[{title:"Community Post",href:"#/community",detail:"Open community · preview",icon:"chat"},{title:"Reels",href:"#/posts?type=short",detail:"Short video · TEST MODE",icon:"videos"},{title:"Photo Post",href:"#/posts?type=picture",detail:"Photos · TEST MODE",icon:"camera"},{title:"Create Poll",detail:"Interactive polls · Planned",icon:"posts"},{title:"Create Community",href:"#/community",detail:"Community area · preview",icon:"chat"},{title:"Create Chatroom",detail:"Room creation · Planned",icon:"msg"},{title:"Create Event",detail:"Events · Planned",icon:"explore"}]},{title:"Videos & Music",items:[{title:"Music Video",href:"#/posts?type=video",detail:"Video composer · TEST MODE",icon:"videos"},{title:"Short Video",href:"#/posts?type=short",detail:"Short composer · TEST MODE",icon:"videos"},{title:"Upload Song",detail:"Song publishing · Planned",icon:"music"},{title:"Upload Album",detail:"Album publishing · Planned",icon:"music"},{title:"Upload EP",detail:"EP publishing · Planned",icon:"music"},{title:"Upload Beats",detail:"Beat publishing · Planned",icon:"music"},{title:"Create Playlist",href:"#/music",detail:"Open music area · preview",icon:"music"},{title:"Add to Vault",href:"#/vault",detail:"Open Vault · preview",icon:"music"}]},{title:"Live & Commerce",items:[{title:"Schedule Live",detail:"Live scheduling · Planned",icon:"live"},{title:"Live Battle",href:"#/giftbattles",detail:"Battle area · preview",icon:"live"},{title:"List Product",href:"#/marketplace",detail:"Marketplace · TEST MODE",icon:"merch"},{title:"Seller Store",detail:"Store creation · Planned",icon:"merch"},{title:"Exclusive Content",detail:"Exclusive publishing · Planned",icon:"heart"}]},{title:"Creator Tools & Protection",items:[{title:"Creator Dashboard",href:"#/profile",detail:"Creator profile",icon:"profile"},{title:"Manage Content",href:"#/posts",detail:"Posts and content",icon:"posts"},{title:"Drafts",detail:"Draft management · Planned",icon:"posts"},{title:"Artist Protection",href:"#/shield",detail:"PIKK Shield local rights drafts · TEST MODE",icon:"music"},{title:"AI Support",detail:"Support assistant · Planned",icon:"chat"}]}]),gl=Object.freeze(cr.flatMap(e=>e.items)),le=[{id:"dirty-money",title:"Dirty Money ft. Lil Baby",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=-rHDLWfiuDI",embed:"https://www.youtube.com/embed/-rHDLWfiuDI"},{id:"93",title:"93 ft. DaBaby",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=zC0BYFxs5W0",embed:"https://www.youtube.com/embed/zC0BYFxs5W0"},{id:"no-love",title:"No Love ft. YFN Lucci",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=6pCVEIE9pB8",embed:"https://www.youtube.com/embed/6pCVEIE9pB8"},{id:"bouquet",title:"Bouquet",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=DTe4OiX2otg",embed:"https://www.youtube.com/embed/DTe4OiX2otg"},{id:"where-im-from",title:"Where I'm From ft. Tee Grizzley",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=BH7_Ttk86eQ",embed:"https://www.youtube.com/embed/BH7_Ttk86eQ"},{id:"gang-ties",title:"Gang Ties",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=0ikbrk901Kc",embed:"https://www.youtube.com/embed/0ikbrk901Kc"},{id:"go-2-work",title:"Go 2 Work",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=gRq8c2i4ESM",embed:"https://www.youtube.com/embed/gRq8c2i4ESM"},{id:"ramen-noodles",title:"Ramen Noodles",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=YNCdtAC273M",embed:"https://www.youtube.com/embed/YNCdtAC273M"},{id:"men-in-blacc",title:"Men In Blacc",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=MKyw-hzxQWY",embed:"https://www.youtube.com/embed/MKyw-hzxQWY"},{id:"king-city",title:"King City",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=wyNJYUqpRFM",embed:"https://www.youtube.com/embed/wyNJYUqpRFM"},{id:"in-her-bag",title:"In Her Bag",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=Dux8rm-pzRg",embed:"https://www.youtube.com/embed/Dux8rm-pzRg"},{id:"lonely",title:"Lonely",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=IVnDjPJ8dRg",embed:"https://www.youtube.com/embed/IVnDjPJ8dRg"},{id:"they-aint-coming-home",title:"They Ain't Coming Home",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=Yi4uBFkn0-o",embed:"https://www.youtube.com/embed/Yi4uBFkn0-o"},{id:"mind-on-a-licc",title:"Mind On A Licc",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=sADinuRcRr4",embed:"https://www.youtube.com/embed/sADinuRcRr4"},{id:"dbs-mix",title:"DatBoiSkeet Mix",artist:"DatBoiSkeet",category:"Mixes",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t",embed:"https://www.youtube.com/embed/videoseries?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t",openLink:"https://www.youtube.com/playlist?list=RDEMDYIvPhQWVGU3Zf3gcxT_4w"},{id:"on-the-radar",title:"On The Radar Interview — Talk of The Town",artist:"DatBoiSkeet",category:"Interviews",youtube:"https://www.youtube.com/watch?v=6IFiHo5HrdE",embed:"https://www.youtube.com/embed/6IFiHo5HrdE"}],ba=[{id:"dbs-mix",title:"DatBoiSkeet Mix",blurb:"Official channel Music Videos playlist embed (stable). YouTube Radio Mix link kept as Play on YouTube — RD mixes often fail to embed.",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t",embed:"https://www.youtube.com/embed/videoseries?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t",openLink:"https://www.youtube.com/playlist?list=RDEMDYIvPhQWVGU3Zf3gcxT_4w",source:"channel-pl-music-videos + user-t96u openLink"}],sa=[{id:"pl-music-videos",title:"DatBoiSkeet Music Videos",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t"},{id:"pl-interviews",title:"DatBoiSkeet Interviews",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQHoRjRTD58TpLGqm0XMsa7U"},{id:"pl-vlogs",title:"DatBoiSkeet Vlogs",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQEqroQ8LYGLgpDfzK3pyutQ"}],fl=[{category:"Interviews",title:"Off The Porch (no verified DatBoiSkeet YouTube URL yet — add via Admin)"},{category:"Behind the Scenes",title:"BTS clips (coming soon)"},{category:"Exclusive Videos",title:"Vault / member exclusives (coming soon)"}],ue={youtube:"https://www.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA",youtubeHandle:"https://www.youtube.com/@DatBoiSkeet1",youtubeMusic:"https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA",spotify:"https://open.spotify.com/artist/0Po64h8VleQOR97okM68zh",apple:"https://music.apple.com/us/artist/datboiskeet/1270542870"},Qe=[{id:"stream-dirty-money",title:"Dirty Money (feat. Lil Baby)",artist:"DatBoiSkeet",type:"single",year:2018,albumNote:"From Broke Is the Root of All Evil",cover:"https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2a/7a/67/2a7a676e-af85-489e-55fd-2bae2793948b/datboiskeet-bitroae-cover-3000px.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/track/17Pw88uBIWpgOVCfhEyszG",apple:"https://music.apple.com/us/song/dirty-money-feat-lil-baby/1395681218",youtubeMusic:"https://music.youtube.com/watch?v=-rHDLWfiuDI",youtube:"https://www.youtube.com/watch?v=-rHDLWfiuDI"}},{id:"stream-93",title:"93 (feat. DaBaby)",artist:"DatBoiSkeet",type:"single",year:2019,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/19/60/5f/19605f4c-7014-6dbc-ca18-baa2a672c697/194923194110.png/600x600bb.jpg",links:{spotify:"https://open.spotify.com/track/3gKwZybDOkUoz2wXquDHVZ",apple:"https://music.apple.com/us/album/93-feat-da-baby-single/1493456214",youtubeMusic:"https://music.youtube.com/watch?v=zC0BYFxs5W0",youtube:"https://www.youtube.com/watch?v=zC0BYFxs5W0"}},{id:"stream-no-love",title:"No Love (feat. YFN Lucci)",artist:"DatBoiSkeet",type:"single",year:2017,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/49/e5/62/49e56292-e427-3992-84bd-ead0b06fb06a/artwork.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/track/2KqnCXMM0lAMlEv1fDN63o",apple:"https://music.apple.com/us/album/no-love-feat-yfn-lucci-single/1317778810",youtubeMusic:"https://music.youtube.com/watch?v=6pCVEIE9pB8",youtube:"https://www.youtube.com/watch?v=6pCVEIE9pB8"}},{id:"stream-broke",title:"Broke Is the Root of All Evil",artist:"DatBoiSkeet",type:"album",year:2018,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2a/7a/67/2a7a676e-af85-489e-55fd-2bae2793948b/datboiskeet-bitroae-cover-3000px.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/album/51j6ReXYreCDV0ZwtPdj1Q",apple:"https://music.apple.com/us/album/broke-is-the-root-of-all-evil/1395680910",youtubeMusic:"https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA"}},{id:"stream-talk",title:"Talk of the Town",artist:"DatBoiSkeet",type:"album",year:2020,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/f6/0d/a0/f60da0bf-c3de-8b12-5cd8-e8c1d3c2053b/artwork.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/album/4OY5rM0TBPDsC4n8Dka4Gr",apple:"https://music.apple.com/us/album/talk-of-the-town/1541180619",youtubeMusic:"https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA"}},{id:"stream-said-you-love-me",title:"Said You Love Me",artist:"DatBoiSkeet",type:"single",year:2025,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/f4/4f/6b/f44f6b18-dff9-0486-e6e6-a615724e02fe/artwork.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/album/7FhoRIzhuGgmt2pZlWMc5c",apple:"https://music.apple.com/us/album/said-you-love-me-single/1835164001",youtubeMusic:"https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA"}}],Bt=[{id:"long-story-short",title:"Long Story Short",artist:"DatBoiSkeet",cover:"/music/01_Long_Story_Short_Coming_Soon.jpg",status:"Coming Soon",order:1},{id:"ladies-only",title:"Ladies Only",artist:"DatBoiSkeet",cover:"/music/02_Ladies_Only_Coming_Soon.jpg",status:"Coming Soon",order:2}],vl=[{id:"vault-long-story-short",title:"Long Story Short (Vault Preview)",artist:"DatBoiSkeet",cover:"/music/01_Long_Story_Short_Coming_Soon.jpg",tier:"skeet+",status:"Coming Soon"},{id:"vault-ladies-only",title:"Ladies Only (Vault Exclusive)",artist:"DatBoiSkeet",cover:"/music/02_Ladies_Only_Coming_Soon.jpg",tier:"backstage",status:"Coming Soon"}],rn=[{id:"long-story-short",title:"Long Story Short",artist:"DatBoiSkeet",cover:"/music/01_Long_Story_Short_Coming_Soon.jpg",price:1.29,status:"Coming Soon"},{id:"ladies-only",title:"Ladies Only",artist:"DatBoiSkeet",cover:"/music/02_Ladies_Only_Coming_Soon.jpg",price:1.29,status:"Coming Soon"}],Ae=[{id:"hat-716-orange",name:"716 Buffalo Braves Snapback (Black/Orange)",price:30,category:"Hats",image:"/merch/01_black_orange_716_hat.jpeg",shopUrl:"https://foreignx-change.com"},{id:"hat-716-blue",name:"716 Buffalo Hat (Blue/Red)",price:30,category:"Hats",image:"/merch/02_blue_red_716_hat.jpeg",shopUrl:"https://foreignx-change.com"},{id:"jacket-blue",name:"Buffalo Sports Varsity Jacket (Blue/White)",price:200,category:"Jackets",image:"/merch/03_blue_buffalo_jacket.jpeg",shopUrl:"https://foreignx-change.com"},{id:"jacket-black",name:"Foreign X-Change Buffalo Varsity (Black/White)",price:200,category:"Jackets",image:"/merch/07_black_buffalo_jacket.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-fx-back",name:"Foreign X-Change Graphic Tee (Back)",price:65,category:"Shirts",image:"/merch/04_black_fx_tee_back_screenshot.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-fx-front",name:"Foreign X-Change Text Tee (Front)",price:65,category:"Shirts",image:"/merch/05_black_fx_tee_front_screenshot.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-ptsd",name:"PTSD Tee (Black)",price:65,category:"Shirts",image:"/merch/06_black_ptsd_tee.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-abstract",name:"Abstract FX Tee (White)",price:65,category:"Shirts",image:"/merch/08_white_abstract_fx_tee.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-dealer",name:"Support Your Local Dealer Tee (Navy)",price:65,category:"Shirts",image:"/merch/09_navy_dealer_tee.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-skulls",name:"Skulls FX Tee (White)",price:65,category:"Shirts",image:"/merch/10_white_skulls_tee.jpeg",shopUrl:"https://foreignx-change.com"}],Qs=[{id:"frame-chrome-crown",name:"Chrome Crown",category:"frames",rarity:"legendary",price:12.99,emoji:"👑"},{id:"frame-iced-out",name:"Iced Out",category:"frames",rarity:"epic",price:9.99,emoji:"💎"},{id:"frame-trap-flame",name:"Trap Flame",category:"frames",rarity:"epic",price:7.99,emoji:"🔥"},{id:"frame-rodeo-gold",name:"Rodeo Gold",category:"frames",rarity:"rare",price:5.99,emoji:"🤠"},{id:"frame-rose-petals",name:"Rose Petals",category:"frames",rarity:"rare",price:4.99,emoji:"🌹"},{id:"fx-bass-pulse",name:"Bass Pulse",category:"effects",rarity:"epic",price:8.99,emoji:"🎵"},{id:"fx-snowfall",name:"Snowfall",category:"effects",rarity:"rare",price:5.99,emoji:"❄️"},{id:"fx-city-lights",name:"City Lights",category:"effects",rarity:"epic",price:7.99,emoji:"🌃"},{id:"fx-holo-glitch",name:"Holographic Glitch",category:"effects",rarity:"legendary",price:14.99,emoji:"✨"},{id:"ban-skyline",name:"City Skyline",category:"banners",rarity:"rare",price:4.99,emoji:"🏙️"},{id:"ban-studio",name:"Studio Booth",category:"banners",rarity:"rare",price:4.99,emoji:"🎙️"},{id:"ban-arena",name:"Arena Lights",category:"banners",rarity:"epic",price:6.99,emoji:"🏟️"},{id:"ban-chrome",name:"Luxury Chrome",category:"banners",rarity:"legendary",price:11.99,emoji:"🪞"},{id:"name-chrome",name:"Chrome Name",category:"name styles",rarity:"epic",price:6.99,emoji:"🅰️"},{id:"name-neon",name:"Neon Name",category:"name styles",rarity:"rare",price:3.99,emoji:"💜"},{id:"name-varsity",name:"Bold Varsity",category:"name styles",rarity:"rare",price:3.99,emoji:"🏟️"},{id:"name-western",name:"Western Script",category:"name styles",rarity:"epic",price:5.99,emoji:"🏜️"},{id:"badge-dayone",name:"Day One (cosmetic style)",category:"badges",rarity:"rare",price:2.99,emoji:"1️⃣"},{id:"badge-topfan",name:"Top Fan (cosmetic style)",category:"badges",rarity:"epic",price:4.99,emoji:"⭐"},{id:"badge-backstage",name:"Backstage Glow",category:"badges",rarity:"epic",price:5.99,emoji:"🎫"}],bl=[{id:"all",label:"All"},{id:"frames",label:"Frames"},{id:"effects",label:"Effects"},{id:"banners",label:"Banners"},{id:"name styles",label:"Name styles"},{id:"badges",label:"Badges"}],dr=[{id:"skeet",name:"Skeet+",price:3.99,blurb:"Early DatBoiSkeet releases · basic Vault"},{id:"backstage",name:"Backstage",price:7.99,blurb:"Deeper Vault · studio lives · listening rooms"},{id:"inner",name:"Inner Circle",price:14.99,blurb:"VIP drops · private Q&As · Inner Circle rooms"}],yl=[{label:"Long Story Short",src:"/music/01_Long_Story_Short_Coming_Soon.jpg"},{label:"Ladies Only",src:"/music/02_Ladies_Only_Coming_Soon.jpg"},{label:"716 Orange Hat",src:"/merch/01_black_orange_716_hat.jpeg"},{label:"716 Blue Hat",src:"/merch/02_blue_red_716_hat.jpeg"},{label:"Blue Jacket",src:"/merch/03_blue_buffalo_jacket.jpeg"},{label:"PTSD Tee",src:"/merch/06_black_ptsd_tee.jpeg"}],kl=[{route:"/explore",title:"Explore",blurb:"Discover DatBoiSkeet · creators · drops"},{route:"/music",title:"Music",blurb:"Long Story Short · Ladies Only · Vault"},{route:"/videos",title:"Videos",blurb:"Official DatBoiSkeet MVs"},{route:"/posts",title:"Posts",blurb:"Text · Picture · Short · Video"},{route:"/shorts",title:"Shorts",blurb:"Under Posts · quick clips"},{route:"/live",title:"Live",blurb:"Go live · TEST MODE demo"},{route:"/shop",title:"PIKK Shop",blurb:"Foreign X-Change merch · external checkout"},{route:"/community",title:"PIKK Lounge",blurb:"Artist-owned rooms · Phase 2"},{route:"/music",title:"Vault",blurb:"Member exclusives · Coming Soon",hash:"vault"},{route:"/marketplace",title:"Marketplace",blurb:"Brand ads & sponsored offers"},{route:"/missions",title:"Missions",blurb:"Clipper promo campaigns"},{route:"/clippers",title:"Clippers",blurb:"Apply · cut clips · earn"}],pr=[{id:"home",label:"Home",href:"#/home"},{id:"explore",label:"Explore",href:"#/explore"},{id:"profile",label:"Profile / Sign in",href:"#/profile"},{id:"watch",label:"Watch",links:[{href:"#/videos",label:"Videos"},{href:"#/live",label:"Live"},{href:"#/openmic",label:"Open Mic / Talent Discovery (24/7)"},{href:"#/spotlight",label:"Spotlight (24/7)"},{href:"#/multiguest",label:"Multi-Guest Live"}]},{id:"music",label:"Music",links:[{href:"#/music",label:"Music & Vault"}]},{id:"social",label:"Social",links:[{href:"#/posts",label:"Posts"},{href:"#/posts?compose=1",label:"Post · Text / Picture / Short / Video"},{href:"#/shorts",label:"Shorts (in Posts)"},{href:"#/notifications",label:"Notifications"},{href:"#/connect",label:"Connect"},{href:"#/dating",label:"Dating & Connections"},{href:"#/community",label:"Community / Lounge"}]},{id:"messages",label:"Messages",href:"#/messages"},{id:"games",label:"Games",links:[{href:"#/games",label:"PIKK Arcade · 15 Games Coming Soon"},{href:"#/blockwars",label:"Block Wars · Coming Soon"}]},{id:"shop",label:"Shop",links:[{href:"#/merch",label:"Foreign X-Change Merch"},{href:"#/marketplace",label:"Marketplace"},{href:"#/shop",label:"PIKK Shop"},{href:"#/profile-shop",label:"Profile Shop · cosmetics"}]},{id:"earn",label:"Creators & Earnings",links:[{href:"#/wallet",label:"Wallet"},{href:"#/earnings",label:"Creator Earnings"},{href:"#/missions",label:"Missions"},{href:"#/clippers",label:"Clippers Apply"},{href:"#/share",label:"Share & Earn"},{href:"#/refer",label:"Refer & Earn"},{href:"#/pricing",label:"Pricing (rules & fees)"}]},{id:"account",label:"Account",links:[{href:"#/profile",label:"Profile"},{href:"#/signup",label:"Signup / Creator Apps"},{href:"#/loyalty",label:"Loyalty Club"},{href:"#/fanclubs",label:"Fan Clubs"},{href:"#/guidelines",label:"Community Guidelines"}]},{id:"studio",label:"Studio / Owner",links:[{href:"#/admin",label:"Admin"},{href:"#/phases",label:"Development Phases"},{href:"#/launch",label:"Launch Readiness"}]}];pr.flatMap(e=>e.href?[{href:e.href,label:e.label}]:e.links||[]);const ya=[{href:"#/music",label:"Music",icon:"music"},{href:"#/videos",label:"Videos",icon:"videos"},{href:"#/connect",label:"Connect",icon:"profile"},{href:"#/create",label:"Create",icon:"live",primary:!0},{href:"#/dating",label:"Dating",icon:"heart"},{href:"#/games",label:"Games",icon:"game"},{href:"#/shop",label:"Shop",icon:"merch"}],ur=Object.freeze([{label:"Songs",href:"#/music?view=songs",detail:"Browse released singles",icon:"♫"},{label:"Albums",href:"#/music?view=albums",detail:"Browse released albums",icon:"▣"},{label:"Beats",href:"#/music?view=beats",detail:"Beat marketplace not yet available",icon:"◉"},{label:"Playlists",href:"#/music?view=playlists",detail:"Verified YouTube playlists",icon:"▤"},{label:"Upload Music",href:"#/music?view=upload",detail:"Creator uploads coming later",icon:"⇧"},{label:"Trending",href:"#/music?view=songs",detail:"Most-played released songs",icon:"↗"},{label:"Music Vault",href:"#/vault",detail:"Vault · preview",icon:"◈"},{label:"AI Artists",href:"#/ai-artists",detail:"AI artist area · labelled AI",icon:"✦"},{label:"Open Mic",href:"#/openmic",detail:"Open mic sessions · TEST MODE",icon:"🎤"},{label:"Artist Earnings",href:"#/earnings",detail:"Creator earnings · TEST MODE",icon:"$"}]),wl=Object.freeze({Songs:"music",Albums:"music",Beats:"music",Playlists:"videos","Upload Music":"music"});function ds(e=!1){const t=document.getElementById("pikkMusicMenu");if(!t||t.hidden)return;t.hidden=!0;const s=document.querySelector('#tabbar a[href="#/music"]');s==null||s.setAttribute("aria-expanded","false"),e&&(s==null||s.focus())}function Sl(){let e=document.getElementById("pikkMusicMenu");return e||(e=document.createElement("div"),e.id="pikkMusicMenu",e.className="pikk-create-overlay",e.hidden=!0,e.innerHTML=`<div class="pikk-create-sheet" role="dialog" aria-modal="true" aria-labelledby="pikkMusicMenuTitle">
    <div class="pikk-create-head"><strong id="pikkMusicMenuTitle">Music on PIKK</strong><button type="button" class="btn ghost" data-music-close aria-label="Close music menu">✕</button></div>
    <div class="pikk-create-options pikk-create-grid">
      ${ur.map(t=>`<a class="pikk-create-tile" href="${t.href}"><span class="pikk-menu-icon" aria-hidden="true">${ks[wl[t.label]||"music"]}</span><strong class="pikk-menu-title">${t.label}</strong><small>${t.detail}</small></a>`).join("")}
    </div>
    <button type="button" class="pikk-menu-cancel" data-music-close>Cancel</button>
    <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · Beat selling and music uploads are not available yet</p>
  </div>`,document.body.appendChild(e),window.addEventListener("hashchange",()=>ds()),e.addEventListener("click",t=>{t.target===e||t.target.closest("[data-music-close]")?ds(!0):t.target.closest(".pikk-create-options a")&&ds()}),document.addEventListener("keydown",t=>{if(e.hidden||(t.key==="Escape"&&(t.preventDefault(),ds(!0)),t.key!=="Tab"))return;const s=[...e.querySelectorAll("a[href], button:not([disabled])")],i=s[0],a=s[s.length-1];if(!i){t.preventDefault();return}e.contains(document.activeElement)?t.shiftKey&&document.activeElement===i?(t.preventDefault(),a.focus()):!t.shiftKey&&document.activeElement===a&&(t.preventDefault(),i.focus()):(t.preventDefault(),(t.shiftKey?a:i).focus())}),e)}function $l(e){var a,n;const t=Sl(),s=t.hidden,i=document.getElementById("pikkCreateMenu");s&&i&&!i.hidden&&(i.hidden=!0,(a=document.querySelector('#tabbar a[href="#/create"]'))==null||a.setAttribute("aria-expanded","false")),t.hidden=!s,e==null||e.setAttribute("aria-expanded",String(s)),s?(n=t.querySelector("[data-music-close]"))==null||n.focus():e==null||e.focus()}const Xs=Object.freeze([{tier:"spotlight",name:"Premium Spotlight",slots:1,day:199,week:999},{tier:"featured",name:"Featured Box",slots:2,day:99,week:499},{tier:"promo",name:"Promo Box",slots:3,day:49,week:249}]),ye=e=>Object.freeze(e),ai=Object.freeze([{id:"featured",title:"Featured placements",link:"#/videos",items:Xs.map(e=>ye({name:e.name,day:e.day,week:e.week,slots:e.slots}))},{id:"player",title:"Music Player placement",link:"#/home",items:[ye({name:"Top PIKK Music Player on Home (Trending / Promoted slot)",day:149,week:699,slots:20})]},{id:"storyrail",title:"Story rail placement",link:"#/home",items:[ye({name:"Home story rail (Trending / Promoted slot)",day:49,week:229,slots:20})]},{id:"music",title:"Music",link:"#/music",items:[ye({name:"Trending Music boost (tracks, albums)",day:29,week:129})]},{id:"videos",title:"Videos and Clips",link:"#/videos",items:[ye({name:"Video / Clip boost",day:19,week:89})]},{id:"live",title:"Live",link:"#/live",items:[ye({name:"Live stream boost (pre-live + during the live)",perStream:25})]},{id:"shop",title:"Shop",link:"#/shop",items:[ye({name:"Shop product boost",day:15,week:69}),ye({name:"Store spotlight",week:59})]},{id:"posts",title:"Posts and Stories",link:"#/posts",items:[ye({name:"Post / Story boost",day:9,week:39})]},{id:"profiles",title:"Profiles",link:"#/profile",items:[ye({name:"Profile / Creator boost",day:19,week:89})]},{id:"events",title:"Events",link:"#/openmic",items:[ye({name:"Event / Open Mic listing",perEvent:25})]},{id:"battles",title:"Battles and Roast",link:"#/giftbattles",items:[ye({name:"Battles / Roast Arena matchup feature",perMatch:35})]},{id:"communities",title:"Communities",link:"#/communities",items:[ye({name:"Community spotlight",week:29})]},{id:"dating",title:"Dating boost",link:"#/dating",gate:"18+ only · requires age & ID verification and safety review before launch",items:[ye({name:"Dating profile boost",hour:4.99,day:14.99})]}]),Pt=e=>"$"+(Number.isInteger(e)?e:e.toFixed(2));function xl(e){return[e.hour!=null&&`${Pt(e.hour)} / hour`,e.day!=null&&`${Pt(e.day)} / 24h`,e.week!=null&&`${Pt(e.week)} / 7 days`,e.perStream!=null&&`${Pt(e.perStream)} per stream`,e.perEvent!=null&&`${Pt(e.perEvent)} per event`,e.perMatch!=null&&`${Pt(e.perMatch)} per match`].filter(Boolean)}const mr=Object.freeze({player:20,storyrail:20,spotlight:1,featured:2,promo:3}),El=Object.freeze({player:0,storyrail:0,spotlight:0,featured:0,promo:0});function Al(e,t){const s=Math.max(0,e|0),i=Math.min(s,Math.max(0,t|0)),a=s-i;return{cap:s,booked:i,left:a,soldOut:a===0,label:a===0?"Sold out":`${a} of ${s} slots left`}}const Cl=e=>`#/promote?s=${e}`;function Tl(e={}){return e.promoted&&e.house?"Promoted · House demo":e.trending===!0?"Trending":"House pick"}const Ri=e=>({title:e.title||e.label,href:e.href||"",detail:e.detail||""});function Dl(e){return e==="music"?ur.map(Ri):e==="create"?gl.map(Ri):(ws[e]||[]).map(Ri)}const Ml=ya.map(e=>e.href.replace("#/","")),Ll=Object.freeze({id:"promote",label:"Promote",links:ai.map(e=>({href:Cl(e.id),label:e.title}))}),on=[{id:"explore",label:"Explore",href:"#/explore"},{id:"profile",label:"Profile / Sign in",href:"#/profile"},{id:"messages",label:"Messages",href:"#/messages"},{id:"notifications",label:"Notifications",href:"#/notifications"},{id:"settings",label:"Settings",href:"#/profile?tab=settings"},{id:"donate",label:"Donate · PIKK goal",href:"#/donate"}],ji=e=>"/"+String(e).replace(/^#\/?/,"").split(/[?#]/)[0];function Il(){const e=Ml.map(n=>{const o=ya.find(r=>r.href==="#/"+n);return{id:n,label:o.label,links:Dl(n).map(r=>({href:r.href,label:r.title,soon:!r.href,detail:r.detail}))}}),t=new Set(["/home",...e.flatMap(n=>n.links.filter(o=>o.href).map(o=>ji(o.href))),...on.map(n=>ji(n.href)),"/promote"]),s=pr.flatMap(n=>n.href?[{href:n.href,label:n.label}]:n.links||[]),i=new Set,a=s.filter(n=>{const o=ji(n.href);return t.has(o)||i.has(o)?!1:(i.add(o),!0)});return[{id:"home",label:"Home",href:"#/home"},...e,Ll,...on,{id:"more",label:"More",links:a},{id:"updates",label:"What's New · App Updates",href:"#/updates"}]}const hr="dbs_v1",gs=()=>({user:null,profiles:{dbs:{id:"dbs",username:"DatBoiSkeet",bio:"Official DatBoiSkeet · Long Story Short & Ladies Only Coming Soon · Vault · Foreign X-Change",avatar:"/brand/logo-dbs-v3@2x.webp",followers:[],following:[],verified:!0}},posts:[],comments:{},likes:{},clipperApps:[],creatorSellApps:[],brandApps:[],listings:[],live:null,liveHistory:[],liveSongRequests:[],coins:{balance:0,history:[]},liveGiftLedger:[],liveGbChallengePop:null,threads:{},demoUnreadSeeded:!1,messagePrefs:{allowDMs:!0,allowRequests:!0},notifications:{releases:!0,lives:!0,messages:!0,quietHours:!1},wallet:{balance:0,history:[]},creatorWallet:{available:0,holds:0,threshold:25,verification:"demo_unverified",earnings:[],payouts:[]},catalog:[],missions:[],giftBattles:{active:null,history:[],champions:[],prefs:{invitationsEnabled:!0}},multiGuest:{active:null,history:[]},spotlight:{nowPlaying:null,queue:[],history:[],houseIndex:0},fanClubs:{clubs:[],posts:{},seeded:!1},shareEarn:{platformsLinked:[],challenge:null,submissions:[],rewardsClaimed:[]},referEarn:{code:"",invitees:[],milestonesClaimed:[]},restream:{platforms:{},selected:[],session:null,history:[],ingest:null,campaign:{tier:null,status:"none",enrolledAt:null,cancelledAt:null},campaignConfig:null},loyalty:{points:0,history:[],badges:[],publicVisible:!0,lastActionAt:{},dayCounts:{}},openMic:{applications:[],seeded:!1,houseIndex:0},profileShop:{owned:[],equipped:{},reduceMotion:!1},hotFeed:{lives:[],posts:[],seededLives:!1,seededPosts:!1,seededPostsVer:0},engagementAlerts:[],postShares:{},splashSeenAt:0,dailyGoals:{app:null,liveByHost:{},history:[]}});function Pl(){var e,t,s,i,a,n,o,r,c,d,p,m,h,f,v,k,b,S,$,A,w,P,C,B,x,Y,D,_,G,T,O,N,V,ce,de,U,Se,Ge,Ve,Ue,ut,mt,ht,gt,ft,X,be,Pe,Ns,Bs,Rs;try{const ss=localStorage.getItem(hr);if(!ss)return gs();const y=JSON.parse(ss),j=gs();return{...j,...y,profiles:{...j.profiles,...y.profiles||{}},notifications:{...j.notifications,...y.notifications||{}},wallet:{...j.wallet,...y.wallet||{}},creatorWallet:{...j.creatorWallet,...y.creatorWallet||{},earnings:Array.isArray((e=y.creatorWallet)==null?void 0:e.earnings)?y.creatorWallet.earnings:[],payouts:Array.isArray((t=y.creatorWallet)==null?void 0:t.payouts)?y.creatorWallet.payouts:[],available:Number((s=y.creatorWallet)==null?void 0:s.available)||0,holds:Number((i=y.creatorWallet)==null?void 0:i.holds)||0,threshold:Number((a=y.creatorWallet)==null?void 0:a.threshold)>0?Number(y.creatorWallet.threshold):25,verification:((n=y.creatorWallet)==null?void 0:n.verification)==="demo_verified"?"demo_verified":"demo_unverified"},brandApps:y.brandApps||[],listings:Array.isArray(y.listings)?y.listings:[],live:y.live??null,liveHistory:Array.isArray(y.liveHistory)?y.liveHistory:[],liveSongRequests:Array.isArray(y.liveSongRequests)?y.liveSongRequests:[],coins:{balance:Number((o=y.coins)==null?void 0:o.balance)||0,history:Array.isArray((r=y.coins)==null?void 0:r.history)?y.coins.history:[]},liveGiftLedger:Array.isArray(y.liveGiftLedger)?y.liveGiftLedger:[],liveGbChallengePop:y.liveGbChallengePop||null,threads:{...y.threads||{}},demoUnreadSeeded:!!y.demoUnreadSeeded,messagePrefs:{...j.messagePrefs,...y.messagePrefs||{}},catalog:Array.isArray(y.catalog)?y.catalog:[],missions:Array.isArray(y.missions)?y.missions:[],giftBattles:{...j.giftBattles,...y.giftBattles||{},history:Array.isArray((c=y.giftBattles)==null?void 0:c.history)?y.giftBattles.history:[],champions:Array.isArray((d=y.giftBattles)==null?void 0:d.champions)?y.giftBattles.champions:[],prefs:{...j.giftBattles.prefs,...((p=y.giftBattles)==null?void 0:p.prefs)||{}},active:((m=y.giftBattles)==null?void 0:m.active)??null},multiGuest:{...j.multiGuest,...y.multiGuest||{},history:Array.isArray((h=y.multiGuest)==null?void 0:h.history)?y.multiGuest.history:[],active:((f=y.multiGuest)==null?void 0:f.active)??null},fanClubs:{...j.fanClubs,...y.fanClubs||{},clubs:Array.isArray((v=y.fanClubs)==null?void 0:v.clubs)?y.fanClubs.clubs:[],posts:(k=y.fanClubs)!=null&&k.posts&&typeof y.fanClubs.posts=="object"?y.fanClubs.posts:{},seeded:!!((b=y.fanClubs)!=null&&b.seeded)},shareEarn:{...j.shareEarn,...y.shareEarn||{},platformsLinked:Array.isArray((S=y.shareEarn)==null?void 0:S.platformsLinked)?y.shareEarn.platformsLinked:[],challenge:(($=y.shareEarn)==null?void 0:$.challenge)??null,submissions:Array.isArray((A=y.shareEarn)==null?void 0:A.submissions)?y.shareEarn.submissions:[],rewardsClaimed:Array.isArray((w=y.shareEarn)==null?void 0:w.rewardsClaimed)?y.shareEarn.rewardsClaimed:[]},referEarn:{...j.referEarn,...y.referEarn||{},code:typeof((P=y.referEarn)==null?void 0:P.code)=="string"?y.referEarn.code:"",invitees:Array.isArray((C=y.referEarn)==null?void 0:C.invitees)?y.referEarn.invitees:[],milestonesClaimed:Array.isArray((B=y.referEarn)==null?void 0:B.milestonesClaimed)?y.referEarn.milestonesClaimed:[]},restream:{...j.restream,...y.restream||{},platforms:(x=y.restream)!=null&&x.platforms&&typeof y.restream.platforms=="object"?y.restream.platforms:{},selected:Array.isArray((Y=y.restream)==null?void 0:Y.selected)?y.restream.selected:[],session:((D=y.restream)==null?void 0:D.session)??null,history:Array.isArray((_=y.restream)==null?void 0:_.history)?y.restream.history:[],ingest:((G=y.restream)==null?void 0:G.ingest)??null,campaign:{...j.restream.campaign,...((T=y.restream)==null?void 0:T.campaign)||{}},campaignConfig:((O=y.restream)==null?void 0:O.campaignConfig)??null},loyalty:{...j.loyalty,...y.loyalty||{},points:Number((N=y.loyalty)==null?void 0:N.points)||0,history:Array.isArray((V=y.loyalty)==null?void 0:V.history)?y.loyalty.history:[],badges:Array.isArray((ce=y.loyalty)==null?void 0:ce.badges)?y.loyalty.badges:[],publicVisible:((de=y.loyalty)==null?void 0:de.publicVisible)===void 0?!0:!!y.loyalty.publicVisible,lastActionAt:(U=y.loyalty)!=null&&U.lastActionAt&&typeof y.loyalty.lastActionAt=="object"?y.loyalty.lastActionAt:{},dayCounts:(Se=y.loyalty)!=null&&Se.dayCounts&&typeof y.loyalty.dayCounts=="object"?y.loyalty.dayCounts:{}},openMic:{...j.openMic,...y.openMic||{},applications:Array.isArray((Ge=y.openMic)==null?void 0:Ge.applications)?y.openMic.applications:[],seeded:!!((Ve=y.openMic)!=null&&Ve.seeded),houseIndex:typeof((Ue=y.openMic)==null?void 0:Ue.houseIndex)=="number"?y.openMic.houseIndex:0},profileShop:{...j.profileShop,...y.profileShop||{},owned:Array.isArray((ut=y.profileShop)==null?void 0:ut.owned)?y.profileShop.owned:[],equipped:(mt=y.profileShop)!=null&&mt.equipped&&typeof y.profileShop.equipped=="object"?y.profileShop.equipped:{},reduceMotion:!!((ht=y.profileShop)!=null&&ht.reduceMotion)},hotFeed:{...j.hotFeed,...y.hotFeed||{},lives:Array.isArray((gt=y.hotFeed)==null?void 0:gt.lives)?y.hotFeed.lives:[],posts:Array.isArray((ft=y.hotFeed)==null?void 0:ft.posts)?y.hotFeed.posts:[],seededLives:!!((X=y.hotFeed)!=null&&X.seededLives),seededPosts:!!((be=y.hotFeed)!=null&&be.seededPosts),seededPostsVer:Number((Pe=y.hotFeed)==null?void 0:Pe.seededPostsVer)||0},engagementAlerts:Array.isArray(y.engagementAlerts)?y.engagementAlerts:[],postShares:y.postShares&&typeof y.postShares=="object"?y.postShares:{},creatorSellApps:Array.isArray(y.creatorSellApps)?y.creatorSellApps:[],dailyGoals:{...j.dailyGoals,...y.dailyGoals||{},app:((Ns=y.dailyGoals)==null?void 0:Ns.app)??null,liveByHost:(Bs=y.dailyGoals)!=null&&Bs.liveByHost&&typeof y.dailyGoals.liveByHost=="object"?y.dailyGoals.liveByHost:{},history:Array.isArray((Rs=y.dailyGoals)==null?void 0:Rs.history)?y.dailyGoals.history:[]}}}catch{return gs()}}function E(e){localStorage.setItem(hr,JSON.stringify(e))}let u=Pl();function M(){return u}function ln(e){return u={...u,...e},E(u),u}function Ol(e){return u=e(u)||u,E(u),u}function ot(e){e&&(u={...u,profiles:{...u.profiles,[e.id]:{id:e.id,username:e.username,bio:e.bio||"",avatar:e.avatar||"",followers:e.followers||[],following:e.following||[],memberships:e.memberships||{},verified:!!e.verified}}})}function At(e){return e?u.user&&u.user.id===e?u.user:u.profiles[e]||null:null}function cn(e){const t=At(e);return t?(t.followers||[]).map(s=>At(s)||{id:s,username:s}).filter(Boolean):[]}function ia(e){const t=At(e);return t?(t.following||[]).map(s=>At(s)||{id:s,username:s}).filter(Boolean):[]}function gr(){if(u.posts.length)return;const e=[{id:"p1",userId:"dbs",username:"DatBoiSkeet",text:"Long Story Short — cover is up. Coming Soon on DBS Music. Stay ready.",image:"/music/01_Long_Story_Short_Coming_Soon.jpg",at:Date.now()-864e5*2},{id:"p2",userId:"dbs",username:"DatBoiSkeet",text:"Foreign X-Change — hats, tees & jackets. Checkout on ForeignX-Change.com (not inside DBS).",image:"/merch/01_black_orange_716_hat.jpeg",at:Date.now()-864e5},{id:"p3",userId:"dbs",username:"DatBoiSkeet",text:"Ladies Only — cover art live. Official playback unlocks when the single drops.",image:"/music/02_Ladies_Only_Coming_Soon.jpg",at:Date.now()-864e5*3},{id:"p4",userId:"dbs",username:"DatBoiSkeet",text:"716 Buffalo Braves snapback on Foreign X-Change — shop the external store.",image:"/merch/02_blue_red_716_hat.jpeg",at:Date.now()-864e5*4}];u={...u,posts:e,likes:{p1:[],p2:[],p3:[],p4:[]},comments:{p1:[],p2:[],p3:[],p4:[]}},E(u)}function zt(e){const t=(e||"Fan").trim().slice(0,24)||"Fan",s="u_"+t.toLowerCase().replace(/\W+/g,"_")+"_"+Date.now().toString(36),i={id:s,username:t,bio:"DBS fan · local demo account (TEST MODE)",avatar:"",followers:[],following:["dbs"],membership:null,memberships:{skeetPlus:!1,backstage:!1,innerCircle:!1},purchasedTracks:[],createdAt:Date.now()},a=u.profiles.dbs||gs().profiles.dbs,n=new Set(a.followers||[]);return n.add(s),u={...u,user:i,profiles:{...u.profiles,dbs:{...a,followers:[...n]}}},ot(i),E(u),i}function _l(){u={...u,user:null},E(u)}function ql({bio:e,avatar:t,username:s}){const i=u.user;if(!i)return{error:"signin"};const a={...i,bio:e!==void 0?String(e).slice(0,280):i.bio,avatar:t!==void 0?String(t).trim():i.avatar,username:s!==void 0&&String(s).trim().slice(0,24)||i.username};return u={...u,user:a},ot(a),E(u),a}function yi(e,t=!0){const s=u.user;if(!s)return{error:"signin"};let i=s.membership??null;const a=d=>d==="skeet"||d==="skeetPlus"||d==="skeet+"?"skeet+":d==="backstage"?"backstage":d==="inner"||d==="innerCircle"?"inner":null,n={null:0,"skeet+":1,backstage:2,inner:3},o=a(e);t?o&&(i=o):i=null;const r={skeetPlus:n[i||"null"]>=1,backstage:n[i||"null"]>=2,innerCircle:n[i||"null"]>=3},c={...s,membership:i,memberships:r};return u={...u,user:c},ot(c),E(u),c}function Tt(){const e=u.user;if(!e)return null;if(e.membership)return e.membership;const t=e.memberships||{};return t.innerCircle?"inner":t.backstage?"backstage":t.skeetPlus?"skeet+":null}function aa(e="skeet"){const t=Tt(),s={null:0,"skeet+":1,backstage:2,inner:3},i=e==="backstage"?2:e==="inner"?3:1;return(s[t||"null"]||0)>=i}function Nl(e){const t=u.user;if(!t)return{error:"signin"};const s=new Set(t.purchasedTracks||[]);s.add(e);const i={...t,purchasedTracks:[...s]};return u={...u,user:i},ot(i),E(u),i}function dn({text:e,image:t,mediaType:s,mediaUrl:i}){const a=u.user;if(!a)throw new Error("Sign in required");const n="p_"+Date.now().toString(36),o=["picture","short","video","image","text"].includes(s)?s==="image"?"picture":s:t?"picture":"text",r={id:n,userId:a.id,username:a.username,text:(e||"").trim(),image:(t||"").trim(),mediaType:o==="text"&&!(t||"").trim()?"text":o,mediaUrl:(i||"").trim(),at:Date.now()};return u={...u,posts:[r,...u.posts],likes:{...u.likes,[n]:[]},comments:{...u.comments,[n]:[]}},E(u),r}function Bl(e){const t=u.user;if(!t)return{error:"signin"};const s=new Set(u.likes[e]||[]);s.has(t.id)?s.delete(t.id):s.add(t.id),u={...u,likes:{...u.likes,[e]:[...s]}},E(u);try{Be()}catch{}return{count:s.size,liked:s.has(t.id)}}function Rl(e,t){const s=u.user;if(!s)return{error:"signin"};const i={id:"c_"+Date.now().toString(36),userId:s.id,username:s.username,text:t.trim(),at:Date.now()},a=u.comments[e]||[];u={...u,comments:{...u.comments,[e]:[...a,i]}},E(u);try{Be()}catch{}return i}function ki(e){const t=u.user;if(!t)return{error:"signin"};if(e===t.id)return{error:"self"};if(t.following.includes(e))return t;const s={...t,following:[...t.following,e]},i={...u.profiles},a=i[e]||At(e);if(a){const n=new Set(a.followers||[]);n.add(t.id),i[e]={...a,followers:[...n]}}return u={...u,user:s,profiles:i},ot(s),E(u),s}function wi(e){const t=u.user;if(!t)return{error:"signin"};const s={...t,following:(t.following||[]).filter(n=>n!==e)},i={...u.profiles},a=i[e]||At(e);return a&&(i[e]={...a,followers:(a.followers||[]).filter(n=>n!==t.id)}),u={...u,user:s,profiles:i},ot(s),E(u),s}function jl(e){const t={id:"clip_"+Date.now().toString(36),...e,status:"pending",at:Date.now()};return u={...u,clipperApps:[t,...u.clipperApps]},E(u),t}function Kl(e){const t=e||{},s=String(t.name||"").trim().slice(0,80),i=String(t.contact||t.email||t.handle||"").trim().slice(0,120),a=String(t.sells||"both").trim().slice(0,40),n=!!t.agreed;if(!s||!i)return{error:"missing"};if(!n)return{error:"rules"};const o={id:"csa_"+Date.now().toString(36),name:s,contact:i,sells:["music","merch","both"].includes(a)?a:"both",agreed:!0,status:"pending",at:Date.now()},r=[o,...u.creatorSellApps||[]].slice(0,40);return u={...u,creatorSellApps:r},E(u),{ok:!0,app:o}}function fr(e,t){if(!["pending","approved","rejected","waitlisted"].includes(t))return{error:"bad_status"};const i=u.clipperApps.map(a=>a.id===e?{...a,status:t,reviewedAt:Date.now()}:a);return u={...u,clipperApps:i},E(u),i.find(a=>a.id===e)}function Ki(e){u={...u,notifications:{...u.notifications,...e}},E(u)}function Fl(){u={...u,splashSeenAt:Date.now()},E(u)}function Gl(){return!u.splashSeenAt}function se(){return!!(u.user&&u.user.role==="admin")}function Ts(e=!0){const t=u.user;if(!t)return{error:"signin"};const s={...t,role:e?"admin":"fan"};return u={...u,user:s},ot(s),E(u),s}function vr(){var r;const e=u.posts||[],t=u.clipperApps||[],s={pending:0,approved:0,rejected:0,waitlisted:0};t.forEach(c=>{const d=c.status||"pending";s[d]!==void 0?s[d]+=1:s.pending+=1});let i=0;Object.values(u.likes||{}).forEach(c=>{i+=(c||[]).length});let a=0;Object.values(u.comments||{}).forEach(c=>{a+=(c||[]).length});let n=0;u.user&&(u.user.membership||(r=u.user.memberships)!=null&&r.skeetPlus)&&(n+=1),Object.values(u.profiles||{}).forEach(c=>{var d,p;c.id!==((d=u.user)==null?void 0:d.id)&&(c.membership||(p=c.memberships)!=null&&p.skeetPlus)&&(n+=1)});const o=u.catalog||[];return{posts:e.length,likes:i,comments:a,clippers:t.length,clipperByStatus:s,members:n,profiles:Object.keys(u.profiles||{}).length,catalogTotal:o.length,catalogPublished:o.filter(c=>c.published).length}}function br(e){const t=["spotify","apple","youtubeMusic","youtube","tidal","amazon"],s={};if(!e||typeof e!="object")return s;for(const i of t){const a=String(e[i]||"").trim();(a.startsWith("http://")||a.startsWith("https://"))&&(s[i]=a.slice(0,500))}return s}function Et({publishedOnly:e=!1,types:t=null,includeUnpublishedForAdmin:s=!1}={}){let i=u.catalog||[];if(e?i=i.filter(a=>a.published):s||(i=i.filter(a=>a.published)),t&&t.length){const a=new Set(t);i=i.filter(n=>a.has(n.type))}return[...i].sort((a,n)=>(n.createdAt||0)-(a.createdAt||0))}function Vl(e){var i;if(!se())return{error:"forbidden"};const s={id:e.id||"cat_"+Date.now().toString(36),type:e.type,title:String(e.title||"").trim().slice(0,120),artist:String(e.artist).trim().slice(0,80),coverRef:e.coverRef||"",mediaRef:e.mediaRef||"",youtube:String(e.youtube||"").trim(),embed:String(e.embed||"").trim(),streamingLinks:br(e.streamingLinks),published:!!e.published,createdAt:Date.now(),updatedAt:Date.now(),createdBy:((i=u.user)==null?void 0:i.id)||null};return s.title?["song","album","video","picture"].includes(s.type)?(u={...u,catalog:[s,...u.catalog||[]]},E(u),s):{error:"type"}:{error:"title"}}function yr(e,t){if(!se())return{error:"forbidden"};let s=null;const i=(u.catalog||[]).map(a=>{if(a.id!==e)return a;const n={...a,...t,id:a.id,updatedAt:Date.now()};return t&&Object.prototype.hasOwnProperty.call(t,"streamingLinks")&&(n.streamingLinks=br(t.streamingLinks)),s=n,s});return s?(u={...u,catalog:i},E(u),s):{error:"missing"}}function Ul(e,t){return yr(e,{published:!!t})}function Hl(e){if(!se())return{error:"forbidden"};const t=(u.catalog||[]).filter(s=>s.id!==e);return u={...u,catalog:t},E(u),!0}function pn(e){const t=u.user;if(!t)return{error:"signin"};if(u.live&&!u.live.endedAt)return{error:"already_live",live:u.live};const s={id:"live_"+Date.now().toString(36),hostId:t.id,hostName:t.username,title:(e||"DBS Live · TEST MODE").trim().slice(0,80),startedAt:Date.now(),viewers:3+Math.floor(Math.random()*18),giftsTotal:0,tipsTotal:0,giftLog:[],chat:[{id:"sys1",userId:"system",username:"DBS",text:"Welcome · Follow DatBoiSkeet · TEST MODE (no real stream)",at:Date.now()}],endedAt:null};return u={...u,live:s},E(u),s}function zl(){if(!u.live||u.live.endedAt)return u.live;const e={...u.live,endedAt:Date.now()},t=[e,...u.liveHistory||[]].slice(0,20);return u={...u,live:e,liveHistory:t},E(u),e}function Wl(){if(!u.live||u.live.endedAt)return u.live;const e=Math.floor(Math.random()*5)-1,t=Math.max(1,(u.live.viewers||1)+e),s={...u.live,viewers:t};return u={...u,live:s},E(u),s}function Yl(e){const t=u.user;if(!t)return{error:"signin"};if(!u.live||u.live.endedAt)return{error:"offline"};const s={id:"lc_"+Date.now().toString(36),userId:t.id,username:t.username,text:String(e||"").trim().slice(0,280),at:Date.now()};if(!s.text)return{error:"empty"};const i={...u.live,chat:[...u.live.chat||[],s]};return u={...u,live:i},E(u),s}function kr({kind:e="tip",amount:t=1,label:s=""}={}){var m;const i=u.user;if(!i)return{error:"signin"};if(!u.live||u.live.endedAt)return{error:"offline"};const a=Math.max(.5,Number(t)||1),n=e==="gift"?"gift":"tip",o=((m=u.wallet)==null?void 0:m.balance)||0;let r=u.wallet||{balance:0,history:[]};o>=a&&(r={balance:+(o-a).toFixed(2),history:[...r.history||[],{at:Date.now(),amount:-a,note:`Live ${n} · ${u.live.title}`}]});const c={id:"lg_"+Date.now().toString(36),userId:i.id,username:i.username,kind:n,amount:a,label:(s||(n==="gift"?"🔥 Fire":"Tip")).slice(0,40),at:Date.now()},d={id:"lc_"+Date.now().toString(36)+"g",userId:i.id,username:i.username,text:n==="gift"?`sent ${c.label} ($${a.toFixed(2)}) · TEST MODE`:`tipped $${a.toFixed(2)} · TEST MODE`,at:Date.now(),support:!0},p={...u.live,giftsTotal:(u.live.giftsTotal||0)+(n==="gift"?a:0),tipsTotal:(u.live.tipsTotal||0)+(n==="tip"?a:0),giftLog:[...u.live.giftLog||[],c],chat:[...u.live.chat||[],d]};return u={...u,live:p,wallet:r},E(u),o>=a&&Ta({category:n==="gift"?"gifts":"tips",gross:a,note:`Live ${n} from @${i.username} · ${u.live.title}`,source:"live"}),{live:p,entry:c,wallet:u.wallet,creatorWallet:u.creatorWallet}}function Jl(){return u.liveHistory||[]}const wr=[{pack:1,price:10,label:"1 song",save:0},{pack:2,price:25,label:"2 songs",save:0},{pack:3,price:45,label:"3 songs",save:5}];function fs(){return Array.isArray(u.liveSongRequests)?u.liveSongRequests:[]}function Ql(e){var s;const t=e||((s=u.live)==null?void 0:s.id);return t?fs().filter(i=>i.liveId===t):[]}function ka(e){const t=[];for(const s of Ql(e))(s.titles||[]).forEach((i,a)=>{t.push({requestId:s.id,songIndex:a,title:i,status:s.songStatuses&&s.songStatuses[a]||"queued",username:s.username,userId:s.userId,pack:s.pack,price:s.price,at:s.at})});return t}function Xl({pack:e,titles:t}={}){var p;const s=u.user;if(!s)return{error:"signin"};if(!u.live||u.live.endedAt)return{error:"offline"};const i=wr.find(m=>m.pack===Number(e));if(!i)return{error:"bad_pack"};const a=(Array.isArray(t)?t:[]).map(m=>String(m||"").trim().slice(0,80)).filter(Boolean);if(a.length!==i.pack)return{error:"title_count",need:i.pack,got:a.length};const n=Lr(i.price,`Song request ×${i.pack} · ${u.live.title} · TEST MODE`);if((n==null?void 0:n.error)==="insufficient")return{error:"insufficient",need:i.price,balance:Number(((p=u.wallet)==null?void 0:p.balance)||0)};const o={id:"lsr_"+Date.now().toString(36),liveId:u.live.id,hostId:u.live.hostId,userId:s.id,username:s.username,pack:i.pack,price:i.price,titles:a,songStatuses:a.map(()=>"queued"),status:"open",at:Date.now(),charged:i.price},r=[o,...fs()].slice(0,200),c={id:"lc_"+Date.now().toString(36)+"sr",userId:s.id,username:s.username,text:`requested ${i.pack} song${i.pack>1?"s":""} ($${i.price}) · TEST MODE`,at:Date.now(),support:!0},d={...u.live,chat:[...u.live.chat||[],c]};return u={...u,liveSongRequests:r,live:d},E(u),Ta({category:"tips",gross:i.price,note:`Song request ×${i.pack} from @${s.username} · ${u.live.title}`,source:"live_song_request"}),{ok:!0,entry:o,wallet:u.wallet,live:u.live}}function wa(e,t,s){var v;const i=u.user;if(!i)return{error:"signin"};if(!["playing","played","skipped","queued"].includes(s))return{error:"bad_status"};const n=fs().findIndex(k=>k.id===e);if(n<0)return{error:"missing"};const o=fs()[n],r=u.live;if(!(r&&r.hostId===i.id&&r.id===o.liveId||i.id===o.hostId)&&!se())return{error:"host_only"};const d=Number(t);if(!Number.isInteger(d)||d<0||d>=(o.titles||[]).length)return{error:"bad_index"};let p=[...o.songStatuses||o.titles.map(()=>"queued")];if(s==="playing"){const k=fs().map(b=>{if(b.liveId!==o.liveId)return b;const S=[...b.songStatuses||(b.titles||[]).map(()=>"queued")];let $=!1;for(let w=0;w<S.length;w++)S[w]==="playing"&&(S[w]="played",$=!0);if(!$)return b;const A=S.every(w=>w==="played"||w==="skipped");return{...b,songStatuses:S,status:A?"done":"open"}});u={...u,liveSongRequests:k},p=[...((v=u.liveSongRequests[n])==null?void 0:v.songStatuses)||p]}p[d]=s;const m=p.every(k=>k==="played"||k==="skipped"),h={...u.liveSongRequests[n],songStatuses:p,status:m?"done":"open"},f=[...u.liveSongRequests];return f[n]=h,u={...u,liveSongRequests:f},E(u),{ok:!0,entry:h}}function Zl(e,t){return wa(e,t,"playing")}function ec(e,t){return wa(e,t,"skipped")}function tc(e,t){return wa(e,t,"played")}const Sa=[{slug:"rose",name:"DBS Rose",coins:5,usd:.1,animation:"Rotating glossy rose and petals",tier:"small"},{slug:"big-love",name:"Big Love",coins:25,usd:.5,animation:"Pulsing luminous heart",tier:"small"},{slug:"turn-up",name:"Turn Up",coins:50,usd:1,animation:"Flame burst and DBS sparks",tier:"small"},{slug:"cash-rain",name:"Cash Rain",coins:150,usd:3,animation:"Stylized bills and confetti",tier:"mid"},{slug:"bottle-pop",name:"Bottle Pop",coins:300,usd:6,animation:"Bottle pop and confetti",tier:"mid"},{slug:"money-gun",name:"Money Gun",coins:750,usd:15,animation:"Stylized cash launcher",tier:"premium"},{slug:"diamond-drip",name:"Diamond Drip",coins:1500,usd:30,animation:"Rotating diamond",tier:"premium"},{slug:"foreign-whip",name:"Foreign Whip",coins:3e3,usd:60,animation:"Original luxury vehicle drives across screen",tier:"premium"},{slug:"helicopter",name:"Helicopter",coins:5e3,usd:100,animation:"Helicopter spotlight flyover",tier:"cinematic"},{slug:"private-jet",name:"Private Jet",coins:1e4,usd:200,animation:"Jet cinematic flyover",tier:"cinematic"},{slug:"dbs-crown",name:"DBS Crown",coins:25e3,usd:500,animation:"Gold diamond crown",tier:"cinematic"},{slug:"dbs-universe",name:"DBS Universe",coins:5e4,usd:1e3,animation:"Galaxy DBS logo reveal",tier:"cinematic"}],Si=[{coins:100,usd:2},{coins:500,usd:10},{coins:1e3,usd:20},{coins:2500,usd:50},{coins:5e3,usd:100},{coins:1e4,usd:200}],sc=750,Fi=80,un=20;function $i(e){return{balance:Math.max(0,Number(e==null?void 0:e.balance)||0),history:Array.isArray(e==null?void 0:e.history)?e.history:[]}}function xi(){return $i(u.coins).balance}function ic(){return Si.map(e=>({...e}))}function ac(){return Sa.map(e=>({...e}))}function Sr(e){const t=Si.find(n=>n.coins===Number(e));if(!t)return{error:"bad_package"};const s=$i(u.coins),i={at:Date.now(),amount:t.coins,note:`Bought ${t.coins} coins ($${t.usd}) · TEST MODE`,kind:"buy",packageCoins:t.coins,usd:t.usd},a={balance:s.balance+t.coins,history:[i,...s.history].slice(0,200)};return u={...u,coins:a},E(u),{ok:!0,coins:a,pack:t,entry:i}}function $a(){return Array.isArray(u.liveGiftLedger)?u.liveGiftLedger:[]}function nc(e){var s;const t=e||((s=u.live)==null?void 0:s.id);return t?$a().filter(i=>i.liveId===t).map(i=>({id:i.id,liveId:i.liveId,giftSlug:i.giftSlug,giftName:i.giftName,coins:i.coins,usd:i.usd,fromUserId:i.fromUserId,fromUser:i.fromUser,at:i.at,animation:i.animation,tier:i.tier})):[]}function rc(e=10,t=Date.now()){const s=Math.min(Math.max(1,Number(e)||10),10),i=new Date(t);i.setHours(0,0,0,0);const a=i.getTime(),n=new Date(t);n.setHours(23,59,59,999);const o=n.getTime(),r={};for(const c of $a()){const d=Number(c.at||0);if(d<a||d>o)continue;const p=c.fromUserId||c.fromUser||"anon",m=r[p]||{userId:p,username:c.fromUser||p,usd:0,coins:0,gifts:0,lastSlug:c.giftSlug||"rose"};m.usd=+(m.usd+Number(c.usd||0)).toFixed(2),m.coins+=Number(c.coins||0),m.gifts+=1,m.username=c.fromUser||m.username,m.lastSlug=c.giftSlug||m.lastSlug,r[p]=m}return Object.values(r).sort((c,d)=>d.usd-c.usd||d.coins-c.coins||c.username.localeCompare(d.username)).slice(0,s)}function $r(e){let s=(Ca(u.creatorWallet).earnings||[]).filter(i=>i.category==="gifts");return e&&(s=s.filter(i=>!i.hostId||i.hostId===e)),s.map(i=>({...i}))}function oc({liveId:e,slug:t}={}){const s=u.user;if(!s)return{error:"signin"};const i=u.live;if(!i||i.endedAt)return{error:"offline"};if(e&&e!==i.id)return{error:"live_mismatch"};const a=Sa.find(x=>x.slug===t);if(!a)return{error:"bad_gift"};const n=$i(u.coins);if(n.balance<a.coins)return{error:"insufficient",need:a.coins,balance:n.balance};const o=q(a.usd),r=0,c=o,d=q(c*Fi/100),p=q(c-d),m=Date.now(),h="lgift_"+m.toString(36)+"_"+Math.random().toString(36).slice(2,6),f={at:m,amount:-a.coins,note:`Gift ${a.name} · ${i.title} · TEST MODE`,kind:"gift",giftSlug:a.slug,liveId:i.id,usd:o},v={balance:n.balance-a.coins,history:[f,...n.history].slice(0,200)},k={id:h,liveId:i.id,hostId:i.hostId,giftSlug:a.slug,giftName:a.name,coins:a.coins,usd:o,fees:r,net:c,creatorShare:d,platformShare:p,dbsShare:p,creatorPct:Fi,dbsPct:un,fromUserId:s.id,fromUser:s.username,at:m,animation:a.animation,tier:a.tier,testModeNetAsListed:!0},b={id:h,userId:s.id,username:s.username,kind:"gift",giftSlug:a.slug,label:a.name,amount:o,coins:a.coins,at:m},S={id:"lc_"+m.toString(36)+"gf",userId:s.id,username:s.username,text:`sent ${a.name} (${a.coins} coins) · TEST MODE`,at:m,support:!0,giftSlug:a.slug},$={...i,giftsTotal:q((i.giftsTotal||0)+o),giftLog:[...i.giftLog||[],b],chat:[...i.chat||[],S]},A=[k,...$a()].slice(0,500),w=Ca(u.creatorWallet),P={id:"earn_"+m.toString(36)+"_"+Math.random().toString(36).slice(2,6),category:"gifts",label:"Live gifts",note:`Live gift ${a.name} from @${s.username} · ${i.title}`,gross:o,fees:r,net:c,creatorPct:Fi,dbsPct:un,creatorShare:d,dbsShare:p,source:"live_gift",giftSlug:a.slug,giftId:h,liveId:i.id,hostId:i.hostId,fromUserId:s.id,at:m,payoutId:null},C={...w,available:q(w.available+d),earnings:[P,...w.earnings||[]]},B={id:"gbpop_"+m.toString(36),liveId:i.id,fromUserId:s.id,fromUser:s.username,giftSlug:a.slug,giftName:a.name,coins:a.coins,usd:o,at:m,expiresAt:m+6e4};return u={...u,coins:v,live:$,liveGiftLedger:A,creatorWallet:C,liveGbChallengePop:B},E(u),{ok:!0,entry:k,viewerEntry:b,coins:v,live:$,earning:P,creatorWallet:C,challengePop:B}}const xr=24*60*60*1e3,mn=50;function Ei(e){return{app:e!=null&&e.app&&typeof e.app=="object"?e.app:null,liveByHost:e!=null&&e.liveByHost&&typeof e.liveByHost=="object"?{...e.liveByHost}:{},history:Array.isArray(e==null?void 0:e.history)?e.history:[]}}function Ss(e,t=Date.now()){return!e||typeof e!="object"?!1:(Number(e.endsAt)||0)>t}function Rt(e){return e?{...e}:null}function Er(e){return"goal_"+e+"_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,6)}function xa(e,t){if(!t)return e;const s=[{...t,archivedAt:Date.now()},...e.history||[]].slice(0,40);return{...e,history:s}}function lc(e=Date.now()){return{id:Er("app"),scope:"app",name:"PIKK daily community goal",targetAmount:50,raised:0,endsAt:e+xr,createdAt:e}}function ni(e){return u={...u,dailyGoals:e},E(u),e}function ri(e=Date.now()){let t=Ei(u.dailyGoals),s=!1;return t.app&&!Ss(t.app,e)&&(t={...xa(t,t.app),app:null},s=!0),Ss(t.app,e)||(t={...t,app:lc(e)},s=!0),s&&ni(t),t.app&&t.app.name==="DBS daily community goal"&&(t={...t,app:{...t.app,name:"PIKK daily community goal"}},ni(t)),Rt(t.app)}function cc(e,t=Date.now()){var n,o;const s=e||((n=u.live)==null?void 0:n.hostId)||((o=u.user)==null?void 0:o.id)||null;if(!s)return null;let i=Ei(u.dailyGoals);const a=i.liveByHost[s]||null;if(a&&!Ss(a,t)){const r={...i.liveByHost};return delete r[s],i={...xa(i,a),liveByHost:r},ni(i),null}return Rt(Ss(a,t)?a:null)}function Ar({name:e,targetAmount:t}={}){const s=u.user;if(!s)return{error:"signin"};const i=String(e||"").trim().slice(0,80),a=Number(t);if(!i)return{error:"bad_name"};if(!Number.isFinite(a)||a<=0)return{error:"bad_amount"};const n=Date.now();let o=Ei(u.dailyGoals);const r=o.liveByHost[s.id];r&&(o=xa(o,r));const c={id:Er("live"),scope:"live",hostId:s.id,hostName:s.username,name:i,targetAmount:q(a),raised:0,endsAt:n+xr,createdAt:n};return o={...o,liveByHost:{...o.liveByHost,[s.id]:c}},ni(o),{ok:!0,goal:Rt(c)}}function oi(e,t,s={}){if(!u.user)return{error:"signin"};const a=Math.floor(Number(t));if(!Number.isFinite(a)||a<=0)return{error:"invalid_amount"};const n=String(e||"");if(!n)return{error:"unknown_goal"};const o=Date.now();let r=Ei(u.dailyGoals),c=null,d=null,p=null;if(r.app&&r.app.id===n)c="app",p=r.app;else for(const[C,B]of Object.entries(r.liveByHost))if(B&&B.id===n){c="live",d=C,p=B;break}if(!p)return{error:"unknown_goal"};if(!Ss(p,o))return{error:"expired"};const m=Number(p.targetAmount)||0,h=Number(p.raised)||0;if(p.completedAt||m>0&&h>=m)return{error:"completed",goal:Rt(p)};let f=a;if(m>0){const C=Math.max(0,q(m-h)),B=Math.ceil(C*mn);if(B<=0)return{error:"completed",goal:Rt(p)};f>B&&(f=B)}const v=$i(u.coins);if(v.balance<f)return{error:"insufficient",need:f,balance:v.balance};const k=q(f/mn),b=q(h+k),S=m>0&&b>=m?o:p.completedAt,$={...p,raised:m>0?Math.min(b,q(m)):b,...S?{completedAt:S}:{}},A=String((s==null?void 0:s.message)||"").trim().slice(0,180),w={at:o,amount:-f,note:`Goal donate · ${p.name} · $${k.toFixed(2)} · TEST MODE`,kind:"goal",goalId:p.id,...A?{message:A}:{},usd:k},P={balance:v.balance-f,history:[w,...v.history].slice(0,200)};return c==="app"?r={...r,app:$}:r={...r,liveByHost:{...r.liveByHost,[d]:$}},u={...u,dailyGoals:r,coins:P},E(u),{ok:!0,goal:Rt($),coins:P,donated:{coins:f,usd:k,requested:a,message:A}}}function dc(e){const t=u.user,s={id:"brand_"+Date.now().toString(36),brand:String(e.brand||"").trim().slice(0,80),contact:String(e.contact||"").trim().slice(0,120),email:String(e.email||"").trim().slice(0,120),campaign:String(e.campaign||"sponsored_post").trim().slice(0,40),budget:String(e.budget||"").trim().slice(0,40),pitch:String(e.pitch||"").trim().slice(0,500),url:String(e.url||"").trim().slice(0,300),applicantUserId:(t==null?void 0:t.id)||null,status:"pending",at:Date.now()};return!s.brand||!s.email?{error:"required"}:(u={...u,brandApps:[s,...u.brandApps]},E(u),s)}function pc(e,t){if(!["pending","approved","rejected"].includes(t))return{error:"bad_status"};const i=u.brandApps.map(a=>a.id===e?{...a,status:t,reviewedAt:Date.now()}:a);return u={...u,brandApps:i},E(u),i.find(a=>a.id===e)}function hn(e){const t=u.user,s={id:"list_"+Date.now().toString(36),title:String(e.title||"").trim().slice(0,80),brand:String(e.brand||"").trim().slice(0,80),blurb:String(e.blurb||"").trim().slice(0,280),url:String(e.url||"").trim().slice(0,300),disclosure:String(e.disclosure||"Paid partnership · TEST MODE").trim().slice(0,120),brandAppId:e.brandAppId||null,createdBy:(t==null?void 0:t.id)||null,active:!0,at:Date.now()};return!s.title||!s.brand?{error:"required"}:(u={...u,listings:[s,...u.listings||[]]},E(u),s)}function uc(e,t){const s=(u.listings||[]).map(i=>i.id===e?{...i,active:!!t}:i);return u={...u,listings:s},E(u),s.find(i=>i.id===e)}function mc({activeOnly:e=!1}={}){const t=u.listings||[];return e?t.filter(s=>s.active):t}function hc(e){var s;return[((s=u.user)==null?void 0:s.id)||"guest",e].sort().join("__")}function Ea(){const e=u.user;return e?Object.values(u.threads||{}).filter(t=>{var s;return(s=t.participants)==null?void 0:s.includes(e.id)}).sort((t,s)=>(s.updatedAt||0)-(t.updatedAt||0)):[]}function li(e){const t=u.user;if(!t||!e||e.muted||e.blocked)return 0;const s=e.lastReadAt||0;return(e.messages||[]).filter(i=>i.from!==t.id&&(i.at||0)>s).length}function it(){return Ea().reduce((e,t)=>e+li(t),0)}function gn(e){const t=u.user;if(!t||!e)return null;const s=u.threads[e];if(!s||!(s.participants||[]).includes(t.id))return null;const i={...s,lastReadAt:Date.now()};u={...u,threads:{...u.threads,[i.id]:i},demoUnreadSeeded:!0},E(u);try{typeof window<"u"&&window.dispatchEvent&&window.dispatchEvent(new CustomEvent("dbs:messages-unread",{detail:{count:it()}}))}catch{}return u.threads[i.id]}function Aa(){var d;const e=u.user;if(!e)return{seeded:!1};if(Ds(),u.demoUnreadSeeded)return{seeded:!1,count:it(),once:!0};if(it()>0)return u={...u,demoUnreadSeeded:!0},E(u),{seeded:!1,count:it()};const t="maya",s=(((d=u.profiles)==null?void 0:d.maya)||{}).username||"MayaBeats",i=vs(t,s);if(i.error)return i;const a=u.threads[i.id];if((a.messages||[]).some(p=>p.from!==e.id)){const p=(a.messages||[]).filter(k=>k.from!==e.id).map(k=>k.at||0),m=a.lastReadAt||0;if(m>=Math.max(...p,0)||m>0)return u={...u,demoUnreadSeeded:!0},E(u),{seeded:!1,count:it()};const f=Math.min(...p),v={...a,lastReadAt:Math.max(0,f-1)};return u={...u,threads:{...u.threads,[v.id]:v},demoUnreadSeeded:!0},E(u),{seeded:!0,count:it()}}const o=Date.now(),r=[{id:"m_demo_unread_1",from:t,fromName:s,text:"Yo — drop coming Friday. You in for the listening party?",at:o-1e3*60*12},{id:"m_demo_unread_2",from:t,fromName:s,text:"Also sent a beat pack in the vault 🔥",at:o-1e3*60*5}],c={...a,messages:[...a.messages||[],...r],updatedAt:o-1e3*60*5,lastReadAt:0,request:!1};return u={...u,threads:{...u.threads,[c.id]:c},demoUnreadSeeded:!0},E(u),{seeded:!0,count:it()}}function Cr(e){return(u.threads||{})[e]||null}function Tr(e){var i;const t=u.user;if(!t||!e)return!1;const s=(i=u.profiles)==null?void 0:i[e];return s?(t.following||[]).includes(e)&&(s.following||[]).includes(t.id):!1}function vs(e,t){const s=u.user;if(!s)return{error:"signin"};const i=hc(e);let a=u.threads[i];if(!a){const n=e==="dbs"||Tr(e);a={id:i,kind:"dm",participants:[s.id,e],peerId:e,peerName:t||e,messages:[],updatedAt:Date.now(),request:!n,muted:!1,blocked:!1},u={...u,threads:{...u.threads,[i]:a}},E(u)}return a}function gc(e,t,s,{priority:i=!1}={}){const a=u.user;if(!a)return{error:"signin"};const n=String(s||"").trim().slice(0,500);if(!n)return{error:"empty"};const o=vs(e,t);if(o.error)return o;const r={id:"m_"+Date.now().toString(36),from:a.id,fromName:a.username,text:n,at:Date.now(),priority:!!i},c={...u.threads[o.id],messages:[...u.threads[o.id].messages||[],r],updatedAt:Date.now(),peerName:t||u.threads[o.id].peerName};if(u={...u,threads:{...u.threads,[c.id]:c}},i){const d=u.wallet||{balance:0,history:[]};u={...u,wallet:{balance:d.balance,history:[...d.history||[],{at:Date.now(),amount:0,note:"Priority message · TEST MODE $2.99 (not charged)"}]}}}return E(u),{thread:u.threads[c.id],message:r}}function Ds(){const e={...u.profiles||{}};let t=!1;e.maya||(e.maya={id:"maya",username:"MayaBeats",bio:"Creator · beats & live demos",avatar:"",followers:[],following:["dbs"],verified:!1},t=!0),e.fanjay||(e.fanjay={id:"fanjay",username:"FanJay",bio:"Day-one fan · playlist curator",avatar:"",followers:[],following:["dbs"],verified:!1},t=!0);const s=u.user;if(s){const i={...e.maya},a=new Set(i.following||[]),n=new Set(i.followers||[]);a.has(s.id)||(a.add(s.id),t=!0),n.has(s.id)||(n.add(s.id),t=!0),i.following=[...a],i.followers=[...n],e.maya=i;let o=s;(s.following||[]).includes("maya")||(o={...s,following:[...s.following||[],"maya"]},t=!0),t&&(u={...u,user:o,profiles:e},ot(o),E(u))}else t&&(u={...u,profiles:e},E(u));return[{id:"dbs",username:"DatBoiSkeet",team:!0,bio:(u.profiles.dbs||{}).bio||""},{id:"maya",username:u.profiles.maya.username,team:!1,bio:u.profiles.maya.bio},{id:"fanjay",username:u.profiles.fanjay.username,team:!1,bio:u.profiles.fanjay.bio}]}function fc(e,t=[]){const s=u.user;if(!s)return{error:"signin"};const i=String(e).trim().slice(0,60)||"Group",a=[...new Set([s.id,...t.filter(Boolean)])],n=i.toLowerCase().replace(/\W+/g,"_").slice(0,24)||"group",o=n==="dbs_fans"?"group_dbs_fans":"group_"+n+"_"+String(s.id).slice(-4);let r=u.threads[o];if(!r)r={id:o,kind:"group",peerId:o,peerName:i,participants:a,memberIds:a,messages:[],updatedAt:Date.now(),muted:!1,blocked:!1},u={...u,threads:{...u.threads,[o]:r}},E(u);else if(s&&!(r.participants||[]).includes(s.id)){const c=[...new Set([...r.participants||[],s.id])],d=[...new Set([...r.memberIds||c,s.id])];r={...r,participants:c,memberIds:d},u={...u,threads:{...u.threads,[o]:r}},E(u)}return u.threads[o]}function vc(){return u.user?(Ds(),fc("DBS Fans",["dbs","maya","fanjay"])):{error:"signin"}}function bc(e,t){const s=u.user;if(!s)return{error:"signin"};const i=u.threads[e];if(!i||i.kind!=="group")return{error:"not_group"};if(!(i.participants||[]).includes(s.id))return{error:"forbidden"};const a=String(t||"").trim().slice(0,500);if(!a)return{error:"empty"};const n={id:"m_"+Date.now().toString(36),from:s.id,fromName:s.username,text:a,at:Date.now(),priority:!1},o={...i,messages:[...i.messages||[],n],updatedAt:Date.now()};return u={...u,threads:{...u.threads,[o.id]:o}},E(u),{thread:u.threads[o.id],message:n}}function Gi(e,t={}){const s=u.threads[e];if(!s)return{error:"missing"};const i={...s,muted:t.muted!==void 0?!!t.muted:!!s.muted,blocked:t.blocked!==void 0?!!t.blocked:!!s.blocked,reportedAt:t.report?Date.now():s.reportedAt||null};return u={...u,threads:{...u.threads,[i.id]:i}},E(u),i}function fn(e={}){const t={...u.messagePrefs||{allowDMs:!0,allowRequests:!0},...e};return u={...u,messagePrefs:t},E(u),t}const St={gifts:{creatorPct:80,dbsPct:20,label:"Live gifts"},tips:{creatorPct:90,dbsPct:10,label:"Tips"},subscriptions:{creatorPct:85,dbsPct:15,label:"Subscriptions"},paid_content:{creatorPct:85,dbsPct:15,label:"Paid content"},referrals:{creatorPct:85,dbsPct:15,label:"Referrals"},clippers:{creatorPct:80,dbsPct:20,label:"Clippers"},sponsorships:{creatorPct:80,dbsPct:20,label:"Sponsorships"},merch:{creatorPct:85,dbsPct:15,label:"Merch / affiliate"}},yc=[{category:"gifts",gross:40,note:"Live gifts · demo week"},{category:"tips",gross:22.5,note:"Live tips · demo week"},{category:"subscriptions",gross:29.99,note:"Skeet+ fan sub · demo"},{category:"referrals",gross:15,note:"Refer & Earn milestone · demo"},{category:"clippers",gross:50,note:"Clippers campaign payout · demo"},{category:"sponsorships",gross:100,note:"Sponsored livestream · demo"},{category:"merch",gross:35,note:"Foreign X-Change affiliate · demo"}];function q(e){return Math.round(Number(e)*100)/100}function Ca(e){const t=gs().creatorWallet;return!e||typeof e!="object"?{...t}:{...t,...e,available:q(e.available??0),holds:q(e.holds??0),threshold:Number(e.threshold)>0?Number(e.threshold):25,verification:e.verification==="demo_verified"?"demo_verified":"demo_unverified",earnings:Array.isArray(e.earnings)?e.earnings:[],payouts:Array.isArray(e.payouts)?e.payouts:[]}}function lt(){const e=Ca(u.creatorWallet);return u.creatorWallet!==e&&(u={...u,creatorWallet:e}),e}function Dr({category:e,gross:t,note:s,source:i="demo",at:a=Date.now()}){const n=St[e]||St.tips,o=q(Math.max(0,Number(t)||0)),r=q(o*.029+(o>0?.3:0)),c=q(Math.max(0,o-r)),d=q(c*n.creatorPct/100),p=q(c-d);return{id:"earn_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,6),category:e,label:n.label,note:String(s||n.label).slice(0,120),gross:o,fees:r,net:c,creatorPct:n.creatorPct,dbsPct:n.dbsPct,creatorShare:d,dbsShare:p,source:i,at:a,payoutId:null}}function kc(){return{...St}}function $s(){return lt()}function Ta(e){const t=Dr(e),s=lt(),i={...s,available:q(s.available+t.creatorShare),earnings:[t,...s.earnings||[]]};return u={...u,creatorWallet:i},E(u),t}function Mr({force:e=!1}={}){const t=lt();if(!e&&(t.earnings||[]).length>0)return{skipped:!0,creatorWallet:t};const s=Date.now()-6*864e5,a=yc.map((r,c)=>Dr({category:r.category,gross:r.gross,note:r.note,source:"seed",at:s+c*36e5})).map((r,c)=>({...r,id:"earn_seed_"+c+"_"+r.category})),n=q(a.reduce((r,c)=>r+c.creatorShare,0)),o={...t,available:e?n:q(t.available+n),earnings:e?a:[...a,...t.earnings||[]],holds:e?0:t.holds,payouts:e?[]:t.payouts};return e&&(o.available=n,o.holds=0,o.payouts=[],o.earnings=a),u={...u,creatorWallet:o},E(u),{seeded:a.length,creatorWallet:o}}function wc({amount:e}={}){const t=lt(),s=(t.payouts||[]).find(h=>h.status==="pending");if(s)return{error:"pending_exists",pending:s};const i=q(t.available);if(i<t.threshold)return{error:"below_threshold",available:i,threshold:t.threshold};const a=e!=null?q(e):i;if(a<=0||a>i)return{error:"bad_amount"};const n=(t.earnings||[]).filter(h=>!h.payoutId).sort((h,f)=>h.at-f.at),o=[];let r=0;for(const h of n){const f=q(h.creatorShare);if(!(f<=0)&&!(q(r+f)>a)&&(o.push(h.id),r=q(r+f),r>=a))break}if(!o.length){const h=n.find(f=>q(f.creatorShare)>0);if(!h)return{error:"no_earnings"};if(q(h.creatorShare)>i)return{error:"bad_amount"};o.push(h.id),r=q(h.creatorShare)}const c=r,d={id:"po_"+Date.now().toString(36),amount:c,status:"pending",at:Date.now(),earningIds:o,note:"TEST MODE payout request · not real money"},p=(t.earnings||[]).map(h=>o.includes(h.id)?{...h,payoutId:d.id}:h),m={...t,available:q(i-c),holds:q(t.holds+c),earnings:p,payouts:[d,...t.payouts||[]]};return u={...u,creatorWallet:m},E(u),d}function Sc(e,t){if(!["pending","completed","rejected"].includes(t))return{error:"bad_status"};const i=lt(),a=(i.payouts||[]).find(p=>p.id===e);if(!a)return{error:"missing"};if(a.status!=="pending"&&t!=="pending")return{error:"already_final",payout:a};let n=i.available,o=i.holds,r=i.earnings||[];if(a.status==="pending"&&t==="completed")o=q(Math.max(0,o-a.amount));else if(a.status==="pending"&&t==="rejected"){o=q(Math.max(0,o-a.amount)),n=q(n+a.amount);const p=new Set(a.earningIds||[]);r=r.map(m=>p.has(m.id)?{...m,payoutId:null}:m)}const c=i.payouts.map(p=>p.id===e?{...p,status:t,reviewedAt:Date.now()}:p),d={...i,available:n,holds:o,earnings:r,payouts:c};return u={...u,creatorWallet:d},E(u),c.find(p=>p.id===e)}function $c(e){const s={...lt(),verification:e?"demo_verified":"demo_unverified"};return u={...u,creatorWallet:s},E(u),s}function Da(){const e=lt(),t={};for(const s of Object.keys(St))t[s]={category:s,label:St[s].label,creatorPct:St[s].creatorPct,dbsPct:St[s].dbsPct,gross:0,fees:0,net:0,creatorShare:0,dbsShare:0,count:0};for(const s of e.earnings||[]){const i=t[s.category]||(t[s.category]={category:s.category,label:s.label||s.category,creatorPct:s.creatorPct,dbsPct:s.dbsPct,gross:0,fees:0,net:0,creatorShare:0,dbsShare:0,count:0});i.gross=q(i.gross+s.gross),i.fees=q(i.fees+s.fees),i.net=q(i.net+s.net),i.creatorShare=q(i.creatorShare+s.creatorShare),i.dbsShare=q(i.dbsShare+s.dbsShare),i.count+=1}return Object.values(t)}function ci(e=5,t="Demo credit"){const s=u.wallet||{balance:0,history:[]},i=Number(s.balance||0)+Number(e),a=[...s.history||[],{at:Date.now(),amount:Number(e),note:t}];return u={...u,wallet:{balance:i,history:a}},E(u),u.wallet}function Lr(e,t="Demo spend"){const s=u.wallet||{balance:0,history:[]},i=Number(e);if(Number(s.balance||0)<i)return{error:"insufficient"};const a=Number(s.balance||0)-i,n=[...s.history||[],{at:Date.now(),amount:-i,note:t}];return u={...u,wallet:{balance:a,history:n}},E(u),u.wallet}function F(e,t){return String(e||"").toLowerCase().includes(t)}function xc(e){const t=String(e||"").trim().toLowerCase(),s={query:String(e||"").trim(),posts:[],profiles:[],music:[],videos:[],lives:[],products:[],pictures:[]};if(!t)return s;const i=(u.posts||[]).filter(h=>F(h.text,t)||F(h.username,t)),a=Object.values(u.profiles||{}).filter(h=>F(h.username,t)||F(h.bio,t));if(u.user){const h=u.user;(F(h.username,t)||F(h.bio,t))&&(a.find(f=>f.id===h.id)||a.push(h))}const n=(u.catalog||[]).filter(h=>h.published),o=n.filter(h=>(h.type==="song"||h.type==="album")&&(F(h.title,t)||F(h.artist,t)||F(h.type,t))),r=n.filter(h=>h.type==="video"&&(F(h.title,t)||F(h.artist,t)||F("video",t))),c=n.filter(h=>h.type==="picture"&&(F(h.title,t)||F(h.artist,t)||F("picture",t))),d=[],p=u.live;p&&!p.endedAt&&(F(p.title,t)||F(p.hostName,t)||F("live",t))&&d.push({...p,status:"live"}),(u.liveHistory||[]).forEach(h=>{(F(h.title,t)||F(h.hostName,t)||F("live",t))&&d.push({...h,status:"ended"})});const m=(u.listings||[]).filter(h=>h.active!==!1&&(F(h.title,t)||F(h.brand,t)||F(h.blurb,t)||F("marketplace",t)||F("product",t)));return{query:String(e||"").trim(),posts:i,profiles:a,music:o,videos:r,lives:d,products:m,pictures:c}}function Ec(e=8){const t=u.likes||{},s=(u.posts||[]).map(r=>({kind:"post",id:r.id,title:(r.text||"").slice(0,72)||"Post",subtitle:"@"+(r.username||"creator"),href:"#/posts",score:(t[r.id]||[]).length,image:r.image||""})).sort((r,c)=>c.score-r.score||(c.id>r.id?1:-1)),i=[{kind:"music",id:"trend_music",title:"Long Story Short",subtitle:"Coming Soon · Music",href:"#/music",score:3,image:"/music/01_Long_Story_Short_Coming_Soon.jpg"},{kind:"video",id:"trend_video",title:"Dirty Money ft. Lil Baby",subtitle:"Official MV",href:"#/videos",score:3,image:""},{kind:"live",id:"trend_live",title:"Go live on DBS",subtitle:"Creators · Live",href:"#/live",score:2,image:""},{kind:"market",id:"trend_mkt",title:"Sponsored Marketplace",subtitle:"Brand ads · demo",href:"#/marketplace",score:2,image:""},{kind:"spotlight",id:"trend_spot",title:"24/7 Spotlight",subtitle:"Stage · Discover",href:"#/spotlight",score:1,image:""}],a=u.live;return a&&!a.endedAt&&i.unshift({kind:"live",id:"trend_live_now",title:a.title||"Live now",subtitle:"@"+(a.hostName||"creator")+" · LIVE",href:"#/live",score:99,image:""}),(u.catalog||[]).filter(r=>r.published).slice(0,3).forEach(r=>{const c=r.type==="video"?"#/videos":r.type==="picture"?"#/home":"#/music";i.push({kind:r.type,id:"trend_cat_"+r.id,title:r.title,subtitle:(r.artist||"Admin")+" · From Admin",href:c,score:4,image:r.coverRef&&!String(r.coverRef).startsWith("idb:")?r.coverRef:""})}),[...s,...i].sort((r,c)=>c.score-r.score).slice(0,e)}function Ac(){const e=Object.values(u.profiles||{}).map(t=>({id:t.id,username:t.username,bio:t.bio||"",avatar:t.avatar||"",verified:!!t.verified,followers:(t.followers||[]).length}));return u.user&&!e.find(t=>t.id===u.user.id)&&e.push({id:u.user.id,username:u.user.username,bio:u.user.bio||"",avatar:u.user.avatar||"",verified:!!u.user.verified,followers:(u.user.followers||[]).length}),e.sort((t,s)=>s.followers-t.followers||t.username.localeCompare(s.username))}const Ir=6e4,Vi=10;function Pr(e=Date.now()){const t=new Date(e);return t.setHours(23,59,59,999),t.getTime()}function Cc(e=Date.now()){const t=new Date(e);return t.setHours(0,0,0,0),t.getTime()}const Or=[{id:"fan_maya",name:"MayaBeats",bio:"Demo fan · mutual"},{id:"fan_jay",name:"FanJay",bio:"Demo fan · sandbox opponent"}];function ge(){return u.giftBattles||{active:null,history:[],champions:[],prefs:{invitationsEnabled:!0}}}function Dt(e){return u={...u,giftBattles:e},E(u),e}function Ma(e,t=Date.now()){if(!e||e.status!=="active"||t<(e.endsAt||0))return e;const s=Number(e.scoreA||0),i=Number(e.scoreB||0);let a="tie",n=null,o=null;return s>i?(a="win",n=e.challenger.id,o=e.challenger.name):i>s&&(a="win",n=e.opponent.id,o=e.opponent.name),{...e,status:"ended",endedAt:t,result:a,winnerId:n,winnerName:o,scoreA:s,scoreB:i,championUntil:n?Pr(t):null}}function _r(){return Or.map(e=>({...e}))}function La(){return{invitationsEnabled:!0,...ge().prefs||{}}}function Tc(e={}){const t=ge(),s={...t.prefs,...e};return Dt({...t,prefs:s})}function Ia(){let t=ge().active;if(!t)return null;if(t.status==="active"){const s=Ma(t);if(s!==t&&s.status==="ended")return Pa(s);t=s}return t}function Pa(e){const t=ge(),s=[e,...(t.history||[]).filter(a=>a.id!==e.id)].slice(0,40);let i=t.champions||[];return e.winnerId&&(i=[{battleId:e.id,userId:e.winnerId,username:e.winnerName,score:e.winnerId===e.challenger.id?e.scoreA:e.scoreB,opponentScore:e.winnerId===e.challenger.id?e.scoreB:e.scoreA,endedAt:e.endedAt,championUntil:e.championUntil,mode:e.mode},...i.filter(n=>n.battleId!==e.id)].slice(0,30)),Dt({...t,active:e,history:s,champions:i}),e}function Dc({opponentId:e,opponentName:t,mode:s}={}){const i=u.user;if(!i)return{error:"signin"};if(!La().invitationsEnabled)return{error:"invites_disabled"};const n=u.live&&!u.live.endedAt,o=s||(n?"live":"sandbox");if(o==="live"&&!n)return{error:"not_live"};const r=ge(),c=r.active;if(c&&(c.status==="pending"||c.status==="active"))return{error:"battle_in_progress",battle:c};const d=Or.find(h=>h.id===e),p={id:e||(d==null?void 0:d.id)||"fan_maya",name:t||(d==null?void 0:d.name)||"MayaBeats"};if(p.id===i.id)return{error:"self"};const m={id:"gb_"+Date.now().toString(36),status:"pending",mode:o,liveId:n?u.live.id:null,liveTitle:n?u.live.title:null,challenger:{id:i.id,name:i.username},opponent:p,createdAt:Date.now(),startedAt:null,endsAt:null,durationMs:Ir,scoreA:0,scoreB:0,giftLog:[],result:null,winnerId:null,winnerName:null,endedAt:null,championUntil:null};return Dt({...r,active:m}),{battle:m}}function Mc(){const e=ge(),t=e.active;if(!t||t.status!=="pending")return{error:"no_pending"};if(!La().invitationsEnabled)return{error:"invites_disabled"};const s=Date.now(),i={...t,status:"active",startedAt:s,endsAt:s+(t.durationMs||Ir),scoreA:0,scoreB:0};return Dt({...e,active:i}),{battle:i}}function Lc(){const e=ge(),t=e.active;if(!t||t.status!=="pending")return{error:"no_pending"};const s={...t,status:"declined",endedAt:Date.now(),result:"declined"},i=[s,...e.history||[]].slice(0,40);return Dt({...e,active:null,history:i}),{battle:s}}function Ic(){const e=ge(),t=e.active;return t&&(t.status==="pending"||t.status==="active")?{error:"still_running",battle:t}:(Dt({...e,active:null}),{ok:!0})}function Pc(e=Date.now()){const t=u.liveGbChallengePop;return t?t.expiresAt&&e>t.expiresAt?(u={...u,liveGbChallengePop:null},E(u),null):!u.live||u.live.endedAt||t.liveId&&t.liveId!==u.live.id?null:{...t}:null}function Oc({side:e="challenger",kind:t="gift",amount:s=2,label:i=""}={}){var k;if(!u.user)return{error:"signin"};let n=Ia();if(!n||n.status!=="active")return{error:"no_active"};if(n=ge().active,!n||n.status!=="active")return{error:"ended"};const o=Math.max(.5,Number(s)||1),r=t==="tip"?"tip":"gift",c=e==="opponent",d=c?n.opponent:n.challenger;let p=null;if(n.mode==="live"&&!c){if(p=kr({kind:r,amount:o,label:i||(r==="gift"?"🔥 Fire":"Tip")}),p!=null&&p.error)return p}else(((k=u.wallet)==null?void 0:k.balance)||0)>=o&&Lr(o,`Gift battle ${r} · ${d.name} · TEST MODE`);const m={id:"gbg_"+Date.now().toString(36),side:c?"opponent":"challenger",userId:d.id,username:d.name,kind:r,amount:o,label:(i||(r==="gift"?"🔥 Fire":"Tip")).slice(0,40),at:Date.now()},h=Number(n.scoreA||0)+(c?0:o),f=Number(n.scoreB||0)+(c?o:0);let v={...n,scoreA:+h.toFixed(2),scoreB:+f.toFixed(2),giftLog:[...n.giftLog||[],m]};return v=Ma(v),v.status==="ended"?Pa(v):Dt({...ge(),active:v}),{battle:v,entry:m,live:(p==null?void 0:p.live)||null,wallet:u.wallet}}function Oa(){const t=ge().active;if(!t||t.status!=="active")return t;const s=Ma(t);return s.status==="ended"&&t.status!=="ended"?Pa(s):s}function _c(e=20){return(ge().history||[]).slice(0,e)}function qc(e=Date.now()){const t=ge(),s=t.active;return s&&s.status==="ended"&&s.winnerId&&s.championUntil&&e<s.championUntil?{battleId:s.id,userId:s.winnerId,username:s.winnerName,score:s.winnerId===s.challenger.id?s.scoreA:s.scoreB,endedAt:s.endedAt,championUntil:s.championUntil,mode:s.mode}:(t.champions||[]).find(a=>a.championUntil&&e<a.championUntil)||null}function Nc(e=15){var s;const t={};for(const i of ge().history||[]){if(i.result!=="win"||!i.winnerId)continue;const a=t[i.winnerId]||{userId:i.winnerId,username:i.winnerName,wins:0,points:0};a.wins+=1;const n=i.winnerId===((s=i.challenger)==null?void 0:s.id)?Number(i.scoreA||0):Number(i.scoreB||0);a.points=+(a.points+n).toFixed(2),a.username=i.winnerName||a.username,t[i.winnerId]=a}return Object.values(t).sort((i,a)=>a.wins-i.wins||a.points-i.points||i.username.localeCompare(a.username)).slice(0,e)}function _a(e=Vi,t=Date.now()){var c;const s=Math.min(Math.max(1,Number(e)||Vi),Vi),i=Cc(t),a=Pr(t),n=new Set,o=[],r=d=>{if(!(d!=null&&d.userId)||!(d!=null&&d.username)||n.has(d.userId))return;const p=Number(d.endedAt||0);p<i||p>a||d.championUntil&&t>d.championUntil||(n.add(d.userId),o.push({userId:d.userId,username:d.username,score:Number(d.score||0),endedAt:p,championUntil:d.championUntil||a,battleId:d.battleId||d.id||null,mode:d.mode||"demo"}))};for(const d of ge().champions||[])if(r(d),o.length>=s)return o;for(const d of ge().history||[])if(!(d.result!=="win"||!d.winnerId)&&(r({userId:d.winnerId,username:d.winnerName,score:d.winnerId===((c=d.challenger)==null?void 0:c.id)?d.scoreA:d.scoreB,endedAt:d.endedAt,championUntil:d.championUntil||a,battleId:d.id,mode:d.mode}),o.length>=s))break;return o}const qa=4,na=[{id:"maya",username:"MayaBeats",bio:"Creator · beats & live demos"},{id:"fanjay",username:"FanJay",bio:"Day-one fan · playlist curator"},{id:"ria",username:"RiaLoops",bio:"Demo co-host · loops & hooks"},{id:"dez",username:"DezOnMic",bio:"Demo guest · freestyle nights"}];function Ce(){return u.multiGuest||{active:null,history:[]}}function Re(e){return u={...u,multiGuest:e},E(u),e}function Ms(e,t){const s=[e,...t],i=s.length||1,a=Math.floor(100/i*100)/100,n={};let o=0;return s.forEach((r,c)=>{c===s.length-1?n[r]=+(100-o).toFixed(2):(n[r]=a,o=+(o+a).toFixed(2))}),n}function Ai(){Ds();const e={...u.profiles||{}};let t=!1;for(const s of na)e[s.id]||(e[s.id]={id:s.id,username:s.username,bio:s.bio,avatar:"",followers:[],following:["dbs"],verified:!1},t=!0);return t&&(u={...u,profiles:e},E(u)),na.map(s=>{const i=u.profiles[s.id]||s;return{id:s.id,username:i.username||s.username,bio:i.bio||s.bio,followers:(i.followers||[]).length}})}function Bc(){return Ai()}function xs(){return Ce().active||null}function Rc(e=20){return(Ce().history||[]).slice(0,e)}function jc(e){const t=u.user;if(!t)return{error:"signin"};const s=Ce();if(s.active&&!s.active.endedAt)return{error:"session_in_progress",session:s.active};const i=String(e||"").trim().slice(0,80)||"Multi-Guest Live";Ai();const a={id:"mg_"+Date.now().toString(36),title:i,hostId:t.id,hostName:t.username,startedAt:Date.now(),endedAt:null,maxGuests:qa,guests:[],chat:[{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:"Multi-guest session started · TEST MODE · no camera / WebRTC",at:Date.now(),system:!0}],giftSplit:{mode:"equal",shares:{[t.id]:100},disclosed:!1,disclosedAt:null},broadcastReady:!1};return Re({...s,active:a}),{session:a}}function Kc(e){var h;const t=u.user;if(!t)return{error:"signin"};const s=Ce(),i=s.active;if(!i||i.endedAt)return{error:"no_session"};if(i.hostId!==t.id)return{error:"host_only"};Ai();const a=na.find(f=>f.id===e),n=(h=u.profiles)==null?void 0:h[e];if(!a&&!n)return{error:"unknown_guest"};if(e===t.id||e===i.hostId)return{error:"self"};const o=(i.guests||[]).find(f=>f.id===e);if(o&&(o.status==="invited"||o.status==="joined"))return{error:"already_invited",session:i};if((i.guests||[]).filter(f=>f.status==="joined"||f.status==="invited").length>=(i.maxGuests||qa))return{error:"full"};const c={id:e,username:(n==null?void 0:n.username)||(a==null?void 0:a.username)||e,status:"invited",muted:!1,invitedAt:Date.now(),joinedAt:null},d=[...(i.guests||[]).filter(f=>f.id!==e),c],p=[...i.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`Invited @${c.username} to the stage`,at:Date.now(),system:!0}].slice(-80),m={...i,guests:d,chat:p,broadcastReady:!1};return m.giftSplit={...m.giftSplit,disclosed:!1,disclosedAt:null,shares:Ms(i.hostId,d.filter(f=>f.status==="joined").map(f=>f.id))},Re({...s,active:m}),{session:m,guest:c}}function Fc(e){var p;const t=u.user;if(!t)return{error:"signin"};const s=Ce(),i=s.active;if(!i||i.endedAt)return{error:"no_session"};if(i.hostId!==t.id)return{error:"host_only"};const a=(i.guests||[]).map(m=>({...m})),n=a.findIndex(m=>m.id===e);if(n<0)return{error:"not_found"};if(a[n].status==="joined")return{session:i,guest:a[n]};if(a.filter(m=>m.status==="joined").length>=(i.maxGuests||qa))return{error:"full"};a[n]={...a[n],status:"joined",joinedAt:Date.now(),muted:!1};const r=a.filter(m=>m.status==="joined").map(m=>m.id),c=[...i.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`@${a[n].username} joined the stage`,at:Date.now(),system:!0}].slice(-80),d={...i,guests:a,chat:c,broadcastReady:!1,giftSplit:{mode:((p=i.giftSplit)==null?void 0:p.mode)||"equal",shares:Ms(i.hostId,r),disclosed:!1,disclosedAt:null}};return Re({...s,active:d}),{session:d,guest:a[n]}}function Gc(e){var c;const t=u.user;if(!t)return{error:"signin"};const s=Ce(),i=s.active;if(!i||i.endedAt)return{error:"no_session"};if(i.hostId!==t.id)return{error:"host_only"};const a=(i.guests||[]).map(d=>d.id===e?{...d,status:"declined"}:d);if(!(i.guests||[]).some(d=>d.id===e))return{error:"not_found"};const n=((c=(i.guests||[]).find(d=>d.id===e))==null?void 0:c.username)||e,o=[...i.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`@${n} declined the invite`,at:Date.now(),system:!0}].slice(-80),r={...i,guests:a,chat:o};return Re({...s,active:r}),{session:r}}function Vc(e){var d,p;const t=u.user;if(!t)return{error:"signin"};const s=Ce(),i=s.active;if(!i||i.endedAt)return{error:"no_session"};if(i.hostId!==t.id&&t.id!==e)return{error:"forbidden"};const a=(i.guests||[]).map(m=>m.id===e?{...m,status:"left",muted:!1}:m);if(!(i.guests||[]).some(m=>m.id===e))return{error:"not_found"};const n=((d=(i.guests||[]).find(m=>m.id===e))==null?void 0:d.username)||e,o=a.filter(m=>m.status==="joined").map(m=>m.id),r=[...i.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`@${n} left the stage`,at:Date.now(),system:!0}].slice(-80),c={...i,guests:a,chat:r,broadcastReady:!1,giftSplit:{mode:((p=i.giftSplit)==null?void 0:p.mode)||"equal",shares:Ms(i.hostId,o),disclosed:!1,disclosedAt:null}};return Re({...s,active:c}),{session:c}}function Uc(e){var d,p;const t=u.user;if(!t)return{error:"signin"};const s=Ce(),i=s.active;if(!i||i.endedAt)return{error:"no_session"};if(i.hostId!==t.id)return{error:"host_only"};const a=(i.guests||[]).map(m=>m.id===e?{...m,status:"removed",muted:!1}:m);if(!(i.guests||[]).some(m=>m.id===e))return{error:"not_found"};const n=((d=(i.guests||[]).find(m=>m.id===e))==null?void 0:d.username)||e,o=a.filter(m=>m.status==="joined").map(m=>m.id),r=[...i.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`Host removed @${n} from the stage`,at:Date.now(),system:!0}].slice(-80),c={...i,guests:a,chat:r,broadcastReady:!1,giftSplit:{mode:((p=i.giftSplit)==null?void 0:p.mode)||"equal",shares:Ms(i.hostId,o),disclosed:!1,disclosedAt:null}};return Re({...s,active:c}),{session:c}}function Hc(e,t=!0){var d;const s=u.user;if(!s)return{error:"signin"};const i=Ce(),a=i.active;if(!a||a.endedAt)return{error:"no_session"};if(a.hostId!==s.id)return{error:"host_only"};const n=(a.guests||[]).map(p=>p.id===e&&p.status==="joined"?{...p,muted:!!t}:p);if(!(a.guests||[]).some(p=>p.id===e&&p.status==="joined"))return{error:"not_joined"};const o=((d=(a.guests||[]).find(p=>p.id===e))==null?void 0:d.username)||e,r=[...a.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:t?`Host muted @${o}`:`Host unmuted @${o}`,at:Date.now(),system:!0}].slice(-80),c={...a,guests:n,chat:r};return Re({...i,active:c}),{session:c}}function zc(e){const t=u.user;if(!t)return{error:"signin"};const s=Ce(),i=s.active;if(!i||i.endedAt)return{error:"no_session"};const a=String(e||"").trim().slice(0,280);if(!a)return{error:"empty"};const n={id:"c_"+Date.now().toString(36),userId:t.id,username:t.username,text:a,at:Date.now()},o=[...i.chat||[],n].slice(-80),r={...i,chat:o};return Re({...s,active:r}),{session:r,message:n}}function ps({mode:e="equal",shares:t=null,disclose:s=!1}={}){var h,f;const i=u.user;if(!i)return{error:"signin"};const a=Ce(),n=a.active;if(!n||n.endedAt)return{error:"no_session"};if(n.hostId!==i.id)return{error:"host_only"};const o=(n.guests||[]).filter(v=>v.status==="joined").map(v=>v.id),r=[n.hostId,...o];let c,d=e==="custom"?"custom":"equal";if(d==="equal")c=Ms(n.hostId,o);else{c={};let v=0;for(const k of r){const b=Math.max(0,Number(t==null?void 0:t[k])||0);c[k]=+b.toFixed(2),v+=c[k]}if(v=+v.toFixed(2),Math.abs(v-100)>.05)return{error:"split_total",total:v,expected:100}}const p={mode:d,shares:c,disclosed:!!s||!!((h=n.giftSplit)!=null&&h.disclosed),disclosedAt:s?Date.now():((f=n.giftSplit)==null?void 0:f.disclosedAt)||null};s&&(p.disclosed=!0),s&&(p.disclosedAt=Date.now());const m={...n,giftSplit:p,broadcastReady:!!p.disclosed};return Re({...a,active:m}),{session:m}}function Wc(){var e,t,s,i;return ps({mode:((t=(e=xs())==null?void 0:e.giftSplit)==null?void 0:t.mode)||"equal",shares:((i=(s=xs())==null?void 0:s.giftSplit)==null?void 0:i.shares)||null,disclose:!0})}function Yc(){const e=u.user;if(!e)return{error:"signin"};const t=Ce(),s=t.active;if(!s||s.endedAt)return{error:"no_session"};if(s.hostId!==e.id)return{error:"host_only"};const i={...s,endedAt:Date.now(),broadcastReady:!1},a=[i,...(t.history||[]).filter(n=>n.id!==i.id)].slice(0,20);return Re({active:null,history:a}),{session:i}}const qr=["song","album","video","live","app","interview"],Na=["draft","active","paused","ended"];function Mt(e){if(!e||typeof e!="object")return null;const t=e.fundSource==="third_party"?"third_party":"dbs",s=qr.includes(e.promoteType)?e.promoteType:"app",i=Na.includes(e.status)?e.status:"draft",a=Number(e.deadline)||0;return{id:String(e.id||""),title:String(e.title||"").slice(0,120),promoteType:s,budget:Math.max(0,Number(e.budget)||0),deadline:a,fundSource:t,managementFeePct:t==="third_party"?20:0,reward:String(e.reward||"").slice(0,200),status:i,participants:Array.isArray(e.participants)?e.participants:[],submissions:Array.isArray(e.submissions)?e.submissions:[],createdAt:Number(e.createdAt)||Date.now(),createdBy:e.createdBy||null}}function Wt(e){u={...u,missions:e},E(u)}function Ci({status:e=null}={}){const t=(u.missions||[]).map(Mt).filter(Boolean);if(!e)return t;const s=Array.isArray(e)?e:[e];return t.filter(i=>s.includes(i.status))}function Jc(e){return Ci().find(t=>t.id===e)||null}function Qc(e={}){var r;const t=String(e.title||"").trim().slice(0,120);if(!t)return{error:"required"};const s=qr.includes(e.promoteType)?e.promoteType:"app",i=e.fundSource==="third_party"?"third_party":"dbs";let a=e.deadline;if(typeof a=="string"&&a){const c=Date.parse(a);a=Number.isFinite(c)?c:Date.now()+7*864e5}else a=Number(a)||Date.now()+7*864e5;const n=Na.includes(e.status)?e.status:"active",o=Mt({id:"msn_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),title:t,promoteType:s,budget:Number(e.budget)||0,deadline:a,fundSource:i,reward:String(e.reward||"").trim().slice(0,200)||"Demo reward · TEST MODE",status:n,participants:[],submissions:[],createdAt:Date.now(),createdBy:((r=u.user)==null?void 0:r.id)||"demo_admin"});return Wt([o,...u.missions||[]]),o}function Xc(e,t){if(!Na.includes(t))return{error:"bad_status"};let s=null;const i=(u.missions||[]).map(a=>{const n=Mt(a);return!n||n.id!==e?a:(s={...n,status:t},s)});return s?(Wt(i),s):{error:"not_found"}}function Zc(e){const t=u.user;if(!t)return{error:"signin"};let s=null;const i=(u.missions||[]).map(a=>{const n=Mt(a);if(!n||n.id!==e)return a;if(n.status!=="active")return s={error:"not_active",mission:n},a;if((n.participants||[]).some(c=>c.userId===t.id))return s={error:"already_joined",mission:n},a;const r={userId:t.id,username:t.username||"creator",joinedAt:Date.now(),score:0,referralCode:"REF-"+t.id.slice(0,6).toUpperCase()+"-"+Math.random().toString(36).slice(2,5).toUpperCase()};return s={...n,participants:[...n.participants||[],r]},s});return s?(s.error||Wt(i),s):{error:"not_found"}}function ed(e,{proof:t=""}={}){const s=u.user;if(!s)return{error:"signin"};const i=String(t||"").trim().slice(0,400);if(!i)return{error:"required"};let a=null;const n=(u.missions||[]).map(o=>{const r=Mt(o);if(!r||r.id!==e)return o;if(r.status!=="active")return a={error:"not_active",mission:r},o;if(!(r.participants||[]).some(m=>m.userId===s.id))return a={error:"not_joined",mission:r},o;const d={id:"sub_"+Date.now().toString(36)+Math.random().toString(36).slice(2,5),userId:s.id,username:s.username||"creator",proof:i,at:Date.now(),status:"pending"},p=(r.participants||[]).map(m=>m.userId===s.id?{...m,score:(Number(m.score)||0)+10}:m);return a={...r,participants:p,submissions:[d,...r.submissions||[]]},a});return a?(a.error||Wt(n),a):{error:"not_found"}}function td(e,t=5){const s=u.user;if(!s)return{error:"signin"};const i=Math.max(1,Math.min(50,Number(t)||5));let a=null;const n=(u.missions||[]).map(o=>{const r=Mt(o);if(!r||r.id!==e)return o;if(!(r.participants||[]).some(p=>p.userId===s.id))return a={error:"not_joined",mission:r},o;const d=(r.participants||[]).map(p=>p.userId===s.id?{...p,score:(Number(p.score)||0)+i}:p);return a={...r,participants:d},a});return a?(a.error||Wt(n),a):{error:"not_found"}}function sd(e){const t=Jc(e);return t?[...t.participants||[]].map(s=>({userId:s.userId,username:s.username,score:Number(s.score)||0,referralCode:s.referralCode||"",joinedAt:s.joinedAt,submissions:(t.submissions||[]).filter(i=>i.userId===s.userId).length})).sort((s,i)=>i.score-s.score||(s.joinedAt||0)-(i.joinedAt||0)):[]}function id({force:e=!1}={}){if((u.missions||[]).length&&!e)return{skipped:!0,missions:Ci()};const s=Date.now(),i=864e5,a=[{id:"msn_demo_song",title:"Push Long Story Short (clip challenge)",promoteType:"song",budget:2500,deadline:s+14*i,fundSource:"dbs",reward:"$50–$200 demo credits by rank · DBS-funded marketing",status:"active",participants:[{userId:"clipper_demo",username:"ClipQueen",joinedAt:s-2*i,score:42,referralCode:"REF-CLIP-AAA"},{userId:"dbs",username:"DatBoiSkeet",joinedAt:s-i,score:28,referralCode:"REF-DBS-001"}],submissions:[{id:"sub_demo1",userId:"clipper_demo",username:"ClipQueen",proof:"https://example.com/tiktok/lss-clip-1 · 12k views",at:s-i,status:"pending"}],createdAt:s-3*i,createdBy:"demo_admin"},{id:"msn_demo_live",title:"Boost Friday Night Live",promoteType:"live",budget:800,deadline:s+5*i,fundSource:"third_party",reward:"Share of $800 pot after 20% management fee",status:"active",participants:[],submissions:[],createdAt:s-i,createdBy:"demo_admin"},{id:"msn_demo_app",title:"Download DBS · invite 3 friends",promoteType:"app",budget:1200,deadline:s+30*i,fundSource:"dbs",reward:"Referral bonus stack · verified installs only",status:"active",participants:[],submissions:[],createdAt:s-5*i,createdBy:"demo_admin"},{id:"msn_demo_ended",title:"Ladies Only teaser push (ended)",promoteType:"video",budget:500,deadline:s-2*i,fundSource:"third_party",reward:"Completed · demo archive",status:"ended",participants:[{userId:"clipper_demo",username:"ClipQueen",joinedAt:s-10*i,score:90,referralCode:"REF-CLIP-OLD"}],submissions:[],createdAt:s-20*i,createdBy:"demo_admin"}].map(Mt);return Wt(a),{seeded:a.length,missions:a}}const Nr=60*1e3,Ba=60*1e3,Es=2,Ti=3,Di=3,Ls=3,ad=["song","beat","music_video"],nd=[...ad,"freestyle"];function Br(){const e=u.spotlight||{};return{nowPlaying:e.nowPlaying||null,queue:Array.isArray(e.queue)?e.queue:[],history:Array.isArray(e.history)?e.history:[],houseIndex:typeof e.houseIndex=="number"?e.houseIndex:0}}function me(e){return u={...u,spotlight:e},E(u),e}function rd(e){return e==="freestyle"?"Live Freestyle":e==="beat"?"Beat":e==="music_video"?"Music Video":"Song"}function ra(e,t="ended"){return e?{id:e.id,userId:e.userId,username:e.username,type:e.type,title:e.title,artist:e.artist,startedAt:e.startedAt,endedAt:Date.now(),extensions:e.extensions||0,playCount:e.playCount||1,reason:t}:null}function re(e=Date.now()){let t=Br(),s=t.nowPlaying;if(!s)return od(t,e);if(s.house)return t;if(s.type==="freestyle"&&s.endsAt&&e>=s.endsAt&&!s.awaitingPlayAnother){if(Object.keys(s.keepGoingVotes||{}).length>=Ti&&(s.extensions||0)<Es&&!s.extensionApplied){s={...s,extensions:(s.extensions||0)+1,endsAt:e+Ba,keepGoingVotes:{},extensionApplied:!1,voteWindowOpen:!0};const p={...t,nowPlaying:s};return me(p),p}const n=[ra(s,"timer"),...t.history||[]].slice(0,30),o=[...t.queue||[]];let r=null,c=typeof t.houseIndex=="number"?t.houseIndex:0;if(o.length){const p=o.shift();r=di(p,e)}else r=pi(Ct(c),e);const d={nowPlaying:r,queue:o,history:n,houseIndex:c};return me(d),d}if(s.awaitingPlayAnother&&s.playAnotherDeadline&&e>=s.playAnotherDeadline){const i=Object.keys(s.playAnotherVotes||{}).length,a=s.playCount||1;if(i>=Di&&a<Ls){s={...s,awaitingPlayAnother:!1,playAnotherVotes:{},playAnotherDeadline:null,playCount:a+1,title:s.nextTitle||s.title,startedAt:e,endsAt:null,nextTitle:null};const p={...t,nowPlaying:s};return me(p),p}const n=[ra(s,"play_another_fail"),...t.history||[]].slice(0,30),o=[...t.queue||[]];let r=null,c=typeof t.houseIndex=="number"?t.houseIndex:0;o.length?r=di(o.shift(),e):r=pi(Ct(c),e);const d={nowPlaying:r,queue:o,history:n,houseIndex:c};return me(d),d}return t}function di(e,t=Date.now()){const s=e.type==="freestyle";return{id:"sp_"+t.toString(36)+"_"+Math.random().toString(36).slice(2,6),userId:e.userId,username:e.username,type:e.type,title:e.title||(s?"Live Freestyle":"Untitled"),artist:e.artist||e.username,cover:e.cover||"",startedAt:t,endsAt:s?t+Nr:null,extensions:0,playCount:1,keepGoingVotes:{},playAnotherVotes:{},voteWindowOpen:s,awaitingPlayAnother:!1,playAnotherDeadline:null,reactions:{fire:0,heart:0,clap:0},chat:[{id:"c_"+t.toString(36),userId:"system",username:"DBS",text:`${e.username} took the Spotlight · ${rd(e.type)} · TEST MODE`,at:t,system:!0}]}}function ne(){const e=re();return{nowPlaying:e.nowPlaying||null,queue:[...e.queue||[]],history:[...e.history||[]],houseIndex:typeof e.houseIndex=="number"?e.houseIndex:0,thresholds:{keepGoing:Ti,playAnother:Di,maxExtensions:Es,maxUploadStreak:Ls,freestyleMs:Nr}}}function Rr(){const e=[];for(const s of le||[])!s||!s.embed||(s.category==="Music Videos"?e.push({id:s.id,title:s.title,artist:s.artist||"DatBoiSkeet",embed:s.embed,youtube:s.youtube||"",kind:"music_video",chipLabel:"House · Music Video",note:"DatBoiSkeet catalog · original YouTube · not a live act",cover:s.cover||""}):s.category==="Interviews"&&e.push({id:s.id,title:s.title,artist:s.artist||"DatBoiSkeet",embed:s.embed,youtube:s.youtube||"",kind:"interview",chipLabel:"House · Interview",note:"DatBoiSkeet interview · original YouTube · not a live act",cover:s.cover||""}));const t=(sa||[]).find(s=>s.id==="pl-vlogs");if(t&&t.youtube){const s=String(t.youtube).match(/[?&]list=([^&]+)/),i=s&&s[1];i&&e.push({id:"house-bts-vlogs",title:t.title||"DatBoiSkeet Vlogs",artist:"DatBoiSkeet",embed:"https://www.youtube.com/embed/videoseries?list="+i,youtube:t.youtube,kind:"bts",chipLabel:"House · BTS",note:"Channel vlogs · dedicated BTS clips thin · original YouTube · not a live act",cover:""})}return e}function jr(){const e=Rr().length;return e>0?e:1}function Ct(e){const t=Rr();if(!t.length)return{id:"house_empty",title:"DatBoiSkeet catalog",artist:"DatBoiSkeet",embed:"",youtube:"https://www.youtube.com/@DatBoiSkeet1",kind:"music_video",chipLabel:"House · Music Video",note:"Catalog loading · not a live act",cover:"",status:"House rotation"};const s=(e%t.length+t.length)%t.length;return{...t[s],status:t[s].chipLabel}}function pi(e,t=Date.now()){return{id:"house_"+(e.id||"x")+"_"+t.toString(36),userId:"dbs",username:"DatBoiSkeet",type:"music_video",house:!0,houseKind:e.kind||"music_video",chipLabel:e.chipLabel||"House · Music Video",title:e.title,artist:e.artist||"DatBoiSkeet",embed:e.embed||"",youtube:e.youtube||"",note:e.note||"House catalog · not a live act",cover:e.cover||"",startedAt:t,endsAt:null,extensions:0,playCount:1,keepGoingVotes:{},playAnotherVotes:{},voteWindowOpen:!1,awaitingPlayAnother:!1,playAnotherDeadline:null,reactions:{fire:0,heart:0,clap:0},chat:[{id:"c_house_"+t.toString(36),userId:"system",username:"DBS",text:`House catalog · ${e.chipLabel||"House"} · ${e.title} · not a live act · TEST MODE`,at:t,system:!0}]}}function od(e,t=Date.now()){if(e.nowPlaying)return e;const s=typeof e.houseIndex=="number"?e.houseIndex:0,i=Ct(s),a=pi(i,t),n={...e,nowPlaying:a,houseIndex:s};return me(n),n}function Kr(){const e=Br();return Ct(typeof e.houseIndex=="number"?e.houseIndex:0)}function ld({type:e="song",title:t="",artist:s=""}={}){const i=u.user;if(!i)return{error:"signin"};const a=nd.includes(e)?e:"song",n=re(),o=i.id,r=(n.queue||[]).some(k=>k.userId===o),c=n.nowPlaying&&!n.nowPlaying.house&&n.nowPlaying.userId===o&&!n.nowPlaying.awaitingPlayAnother;if(r||c)return{error:"already_queued",state:ne()};const d=String(t||"").trim().slice(0,80)||(a==="freestyle"?"Live Freestyle":a==="beat"?"Untitled Beat":a==="music_video"?"Untitled MV":"Untitled Song"),p=String(s||i.username||"").trim().slice(0,60),m={id:"q_"+Date.now().toString(36),userId:o,username:i.username,type:a,title:d,artist:p,cover:"",joinedAt:Date.now()};let h=n.nowPlaying,f=[...n.queue||[]],v=typeof n.houseIndex=="number"?n.houseIndex:0;return h?(h.house,f.push(m)):(h=di(m),f=[]),me({...n,nowPlaying:h,queue:f,houseIndex:v}),{ok:!0,state:ne()}}function vn(){const e=u.user;if(!e)return{error:"signin"};const t=re(),s=(t.queue||[]).length,i=(t.queue||[]).filter(a=>a.userId!==e.id);return i.length===s?{error:"not_in_queue"}:(me({...t,queue:i}),{ok:!0,state:ne()})}function cd(e){if(!u.user)return{error:"signin"};const s=re(),i=(s.queue||[]).filter(a=>a.id!==e);return me({...s,queue:i}),{ok:!0,state:ne()}}function Fr(e="advance"){if(!u.user)return{error:"signin"};const s=re(),i=s.nowPlaying,a=!!(i&&i.house),n=i&&!a?[ra(i,e),...s.history||[]].slice(0,30):[...s.history||[]],o=[...s.queue||[]];let r=typeof s.houseIndex=="number"?s.houseIndex:0;a&&(r=(r+1)%jr());let c=null;return o.length?c=di(o.shift()):c=pi(Ct(r)),me({nowPlaying:c,queue:o,history:n,houseIndex:r}),{ok:!0,state:ne()}}function dd(){return Fr("skip")}function pd(){const e=u.user;if(!e)return{error:"signin"};const t=re(),s=t.nowPlaying;if(!s)return{error:"empty_stage"};if(s.house)return{error:"house_use_skip"};if(s.type==="freestyle")return{error:"freestyle_use_timer"};if(s.awaitingPlayAnother)return{error:"already_voting"};!(s.userId===e.id)&&se();const a=s.playCount||1;if(a>=Ls)return Fr("max_streak");const n={...s,awaitingPlayAnother:!0,playAnotherVotes:{},playAnotherDeadline:Date.now()+30*1e3,nextTitle:s.title+" (take "+(a+1)+")"};return me({...t,nowPlaying:n}),{ok:!0,state:ne()}}function ud(){const e=u.user;if(!e)return{error:"signin"};const t=re(),s=t.nowPlaying;if(!s||s.type!=="freestyle")return{error:"no_freestyle"};if(!s.voteWindowOpen)return{error:"window_closed"};if(s.awaitingPlayAnother)return{error:"wrong_mode"};if((s.extensions||0)>=Es)return{error:"max_extensions"};const i={...s.keepGoingVotes||{}};if(i[e.id])return{error:"already_voted",state:ne()};i[e.id]=Date.now();let a={...s,keepGoingVotes:i};const n=Object.keys(i).length;return n>=Ti&&(s.extensions||0)<Es&&(a={...a,extensions:(s.extensions||0)+1,endsAt:Date.now()+Ba,keepGoingVotes:{},voteWindowOpen:!0}),me({...t,nowPlaying:a}),{ok:!0,state:ne(),votes:Object.keys(a.keepGoingVotes||{}).length||n}}function md(e=2){const t=re(),s=t.nowPlaying;if(!s||s.type!=="freestyle")return{error:"no_freestyle"};const i={...s.keepGoingVotes||{}},a=Object.keys(i).length;for(let r=0;r<e;r++){const c="fan_sim_"+(a+r)+"_"+Date.now().toString(36);i[c]=Date.now()}let n={...s,keepGoingVotes:i};return Object.keys(i).length>=Ti&&(s.extensions||0)<Es&&(n={...n,extensions:(s.extensions||0)+1,endsAt:Date.now()+Ba,keepGoingVotes:{},voteWindowOpen:!0}),me({...t,nowPlaying:n}),{ok:!0,state:ne()}}function hd(){const e=u.user;if(!e)return{error:"signin"};const t=re(),s=t.nowPlaying;if(!s||!s.awaitingPlayAnother)return{error:"no_vote"};const i={...s.playAnotherVotes||{}};if(i[e.id])return{error:"already_voted",state:ne()};i[e.id]=Date.now();let a={...s,playAnotherVotes:i};const n=Object.keys(i).length,o=s.playCount||1;return n>=Di&&o<Ls&&(a={...a,awaitingPlayAnother:!1,playAnotherVotes:{},playAnotherDeadline:null,playCount:o+1,title:s.nextTitle||s.title,startedAt:Date.now(),endsAt:null,nextTitle:null}),me({...t,nowPlaying:a}),{ok:!0,state:ne()}}function gd(e=2){const t=re(),s=t.nowPlaying;if(!s||!s.awaitingPlayAnother)return{error:"no_vote"};const i={...s.playAnotherVotes||{}},a=Object.keys(i).length;for(let c=0;c<e;c++)i["fan_pa_"+(a+c)+"_"+Date.now().toString(36)]=Date.now();let n={...s,playAnotherVotes:i};const o=Object.keys(i).length,r=s.playCount||1;return o>=Di&&r<Ls&&(n={...n,awaitingPlayAnother:!1,playAnotherVotes:{},playAnotherDeadline:null,playCount:r+1,title:s.nextTitle||s.title,startedAt:Date.now(),endsAt:null,nextTitle:null}),me({...t,nowPlaying:n}),{ok:!0,state:ne()}}function fd(e="fire"){const t=re(),s=t.nowPlaying;if(!s)return{error:"empty_stage"};const i=["fire","heart","clap"].includes(e)?e:"fire",a={...s.reactions||{fire:0,heart:0,clap:0}};return a[i]=(a[i]||0)+1,me({...t,nowPlaying:{...s,reactions:a}}),{ok:!0,state:ne()}}function vd(e){const t=u.user;if(!t)return{error:"signin"};const s=String(e||"").trim().slice(0,200);if(!s)return{error:"empty"};const i=re(),a=i.nowPlaying;if(!a)return{error:"empty_stage"};const n=[...a.chat||[],{id:"c_"+Date.now().toString(36),userId:t.id,username:t.username,text:s,at:Date.now()}].slice(-40);return me({...i,nowPlaying:{...a,chat:n}}),{ok:!0,state:ne()}}function bd(e=20){return(re().history||[]).slice(0,e)}function je(){const e=u.fanClubs||{clubs:[],posts:{},seeded:!1};return{clubs:Array.isArray(e.clubs)?e.clubs:[],posts:e.posts&&typeof e.posts=="object"?e.posts:{},seeded:!!e.seeded}}function Yt(e){u={...u,fanClubs:e},E(u)}function Gr(e){return e+"_"+Date.now().toString(36)+Math.random().toString(36).slice(2,7)}function Vr(){return Ke(),je().clubs.slice().sort((e,t)=>e.official&&!t.official?-1:!e.official&&t.official?1:(t.memberCount||0)-(e.memberCount||0))}function Is(e){return Ke(),je().clubs.find(t=>t.id===e)||null}function Ke({force:e=!1}={}){const t=je();if(t.seeded&&!e&&t.clubs.length>0)return{skipped:!0,clubs:t.clubs};const s=Date.now(),i=864e5,a=[{id:"fc_official_dbs",name:"DatBoiSkeet Official",description:"Official DatBoiSkeet fan club inside DBS Lounge. Music drops, Vault tips, Foreign X-Change, and community rules — DBS branding first. Follow optional.",graphic:"/brand/logo-dbs-v3@2x.webp",hostId:"dbs",hostName:"DatBoiSkeet",privacy:"public",official:!0,members:["dbs"],followers:["dbs"],mods:["dbs"],memberCount:1,createdAt:s-14*i},{id:"fc_lss_crew",name:"Long Story Short Crew",description:"Creator club for LSS listeners. Public lounge chat + Skeet+ members-only drop room.",graphic:"/music/01_Long_Story_Short_Coming_Soon.jpg",hostId:"dbs",hostName:"DatBoiSkeet",privacy:"members",official:!1,members:["dbs"],followers:["dbs"],mods:["dbs"],memberCount:1,createdAt:s-7*i},{id:"fc_ladies_only",name:"Ladies Only Circle",description:"Paid / Skeet+ gated room demo for Ladies Only supporters. Unlock via membership TEST MODE.",graphic:"/music/02_Ladies_Only_Coming_Soon.jpg",hostId:"dbs",hostName:"DatBoiSkeet",privacy:"paid",official:!1,members:["dbs"],followers:[],mods:["dbs"],memberCount:1,createdAt:s-3*i}],n={fc_official_dbs:[{id:"fcp_welcome",userId:"dbs",username:"DatBoiSkeet",text:"Welcome to the official club. Discover music on #/music · explore more on #/explore. No forced follows.",at:s-2*i,pinned:!0,removed:!1},{id:"fcp_lounge",userId:"dbs",username:"DatBoiSkeet",text:"DBS Lounge rooms stay music-first. Keep it respectful — see Community Guidelines.",at:s-i,pinned:!1,removed:!1}],fc_lss_crew:[{id:"fcp_lss1",userId:"dbs",username:"DatBoiSkeet",text:"LSS cover art is live in Coming Soon. Members can discuss theories here.",at:s-i,pinned:!1,removed:!1}],fc_ladies_only:[{id:"fcp_lo1",userId:"dbs",username:"DatBoiSkeet",text:"Skeet+ members-only preview chat. Join Skeet+ on Pricing (TEST MODE) to unlock.",at:s-12*36e5,pinned:!0,removed:!1}]};return Yt({clubs:a,posts:n,seeded:!0}),{seeded:a.length,clubs:a}}function yd({name:e,description:t,graphic:s,privacy:i="public"}={}){const a=u.user;if(!a)return{error:"signin"};se()||a.role==="creator"||a.id;const n=String(e||"").trim().slice(0,48);if(!n)return{error:"name"};const o=["public","members","paid"].includes(i)?i:"public";Ke();const r=je(),c={id:Gr("fc"),name:n,description:String(t||"").trim().slice(0,280),graphic:String(s||"/brand/logo-dbs-v3@2x.webp").slice(0,200),hostId:a.id,hostName:a.username,privacy:o,official:!1,members:[a.id],followers:[a.id],mods:[a.id],memberCount:1,createdAt:Date.now()};return Yt({...r,clubs:[c,...r.clubs],posts:{...r.posts,[c.id]:[]},seeded:!0}),{ok:!0,club:c}}function Mi(e,t){Ke();const s=je(),i=s.clubs.findIndex(o=>o.id===e);if(i<0)return{error:"missing"};const a=t({...s.clubs[i]});if(a&&a.error)return a;const n=s.clubs.slice();return n[i]=a,Yt({...s,clubs:n}),{ok:!0,club:a}}function Ur(e){const t=u.user;return t?Mi(e,s=>{const i=new Set(s.members||[]);return i.add(t.id),{...s,members:[...i],memberCount:i.size}}):{error:"signin"}}function kd(e){const t=u.user;return t?Mi(e,s=>{if(s.hostId===t.id)return{error:"host"};const i=(s.members||[]).filter(a=>a!==t.id);return{...s,members:i,memberCount:i.length}}):{error:"signin"}}function wd(e){const t=u.user;return t?Mi(e,s=>{const i=new Set(s.followers||[]);return i.add(t.id),{...s,followers:[...i]}}):{error:"signin"}}function Sd(e){const t=u.user;return t?Mi(e,s=>{const i=(s.followers||[]).filter(a=>a!==t.id);return{...s,followers:i}}):{error:"signin"}}function Hr(e){const t=u.user;if(!t)return!1;const s=Is(e);return!!(s&&(s.members||[]).includes(t.id))}function $d(e){const t=u.user;if(!t)return!1;const s=Is(e);return!!(s&&(s.followers||[]).includes(t.id))}function As(e){const t=u.user;if(!t)return!1;const s=Is(e);return s?se()||s.hostId===t.id||(s.mods||[]).includes(t.id):!1}function zr(e){const t=Is(e);if(!t)return{ok:!1,reason:"missing"};if(t.privacy==="public")return{ok:!0,reason:"public"};if(t.privacy==="members")return Hr(e)||As(e)?{ok:!0,reason:"member"}:{ok:!1,reason:"members"};if(t.privacy==="paid"){const s=Tt();return({null:0,"skeet+":1,backstage:2,inner:3}[s||"null"]||0)>=1||As(e)?{ok:!0,reason:"paid"}:{ok:!1,reason:"paid"}}return{ok:!0,reason:"public"}}function xd(e){return Ke(),(je().posts[e]||[]).filter(s=>!s.removed).slice().sort((s,i)=>s.pinned&&!i.pinned?-1:!s.pinned&&i.pinned?1:(i.at||0)-(s.at||0))}function Ed(e,t){const s=u.user;if(!s)return{error:"signin"};const i=zr(e);if(!i.ok)return{error:"gated",reason:i.reason};const a=String(t||"").trim().slice(0,500);if(!a)return{error:"empty"};const n=je();if(!n.clubs.some(c=>c.id===e))return{error:"missing"};const o={id:Gr("fcp"),userId:s.id,username:s.username,text:a,at:Date.now(),pinned:!1,removed:!1},r=[o,...n.posts[e]||[]].slice(0,100);return Yt({...n,posts:{...n.posts,[e]:r}}),{ok:!0,post:o}}function Ad(e,t){if(!As(e))return{error:"mod"};const s=je(),i=(s.posts[e]||[]).map(a=>a.id===t?{...a,pinned:!a.pinned}:a);return Yt({...s,posts:{...s.posts,[e]:i}}),{ok:!0}}function Cd(e,t){if(!As(e))return{error:"mod"};const s=je(),i=(s.posts[e]||[]).map(a=>a.id===t?{...a,removed:!0}:a);return Yt({...s,posts:{...s.posts,[e]:i}}),{ok:!0}}const Ra=["instagram","tiktok","facebook","youtube","x","snapchat","other"],Wr=[{id:"badge",minVerified:1,label:"Exclusive DBS badge",kind:"badge"},{id:"decoration",minVerified:2,label:"Premium avatar decoration",kind:"decoration"},{id:"skeet7",minVerified:3,label:"7 days Skeet+ (TEST MODE)",kind:"membership_trial",membership:"skeet+",days:7},{id:"skeet30",minVerified:3,requireAllLinked:!0,label:"30 days Skeet+ (all linked · min 3)",kind:"membership_trial",membership:"skeet+",days:30}],Yr=[{n:1,id:"m1",label:"Profile decoration",kind:"decoration"},{n:3,id:"m3",label:"7 days Skeet+ (TEST MODE)",kind:"membership_trial",membership:"skeet+",days:7},{n:5,id:"m5",label:"30 days Skeet+ (TEST MODE)",kind:"membership_trial",membership:"skeet+",days:30},{n:10,id:"m10",label:"Premium profile bundle",kind:"bundle"},{n:25,id:"m25",label:"30 days Backstage (TEST MODE)",kind:"membership_trial",membership:"backstage",days:30},{n:50,id:"m50",label:"30 days Inner Circle (TEST MODE)",kind:"membership_trial",membership:"inner",days:30},{n:100,id:"m100",label:"Founder Promoter badge / VIP",kind:"badge"}];function Jr(){return{platformsLinked:[],challenge:null,submissions:[],rewardsClaimed:[]}}function Qr(){return{code:"",invitees:[],milestonesClaimed:[]}}function Xr(e){const t=Jr();return!e||typeof e!="object"?t:{platformsLinked:Array.isArray(e.platformsLinked)?e.platformsLinked:[],challenge:e.challenge&&typeof e.challenge=="object"?e.challenge:null,submissions:Array.isArray(e.submissions)?e.submissions:[],rewardsClaimed:Array.isArray(e.rewardsClaimed)?e.rewardsClaimed:[]}}function Zr(e){const t=Qr();return!e||typeof e!="object"?t:{code:typeof e.code=="string"?e.code:"",invitees:Array.isArray(e.invitees)?e.invitees:[],milestonesClaimed:Array.isArray(e.milestonesClaimed)?e.milestonesClaimed:[]}}function et(e){return u={...u,shareEarn:Xr(e)},E(u),u.shareEarn}function ct(e){return u={...u,referEarn:Zr(e)},E(u),u.referEarn}function eo(e){if(!e)return"DBS-GUEST";const t=String(e.username||"fan").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,8)||"FAN",s=String(e.id||"").replace(/^u_/,"").slice(-4).toUpperCase()||"DEMO";return`DBS-${t}-${s}`}function Lt(e){return e+"_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function us(e=Date.now()){return new Date(e).toISOString().slice(0,10)}function Q(){return Xr(u.shareEarn)}function bn(){return Ra.slice()}function Td(){return Wr.map(e=>({...e}))}function Dd({platform:e,handle:t="",url:s="",followers:i=""}={}){if(!u.user)return{error:"signin"};const n=String(e||"").toLowerCase().trim();if(!Ra.includes(n))return{error:"bad_platform"};const o=String(t||"").trim().replace(/^@+/,"").slice(0,64),r=String(s||"").trim().slice(0,240);if(!o&&!r)return{error:"required"};const c=Q();if((c.platformsLinked||[]).some(m=>m.platform===n))return{error:"already_linked",shareEarn:c};const d={id:Lt("plat"),platform:n,handle:o,url:r,followers:String(i||"").trim().slice(0,32),linkedAt:Date.now()},p={...c,platformsLinked:[...c.platformsLinked||[],d]};return et(p),{ok:!0,platform:d,shareEarn:Q()}}function Md(e){const t=Q(),s={...t,platformsLinked:(t.platformsLinked||[]).filter(i=>i.id!==e)};return et(s),Q()}function Ld(){if(!u.user)return{error:"signin"};const t=Q();if(t.challenge&&t.challenge.status==="active")return{error:"already_active",shareEarn:t};const s=Jt().code,i=Date.now(),a={id:Lt("ch"),startedAt:i,endsAt:i+24*60*60*1e3,adTitle:"DatBoiSkeet · Long Story Short & Ladies Only",caption:"🔥 Join me on DBS — music, live, vault & more. Long Story Short + Ladies Only Coming Soon. #DBS #PaidPartnership #ad",trackedLink:`https://dbs.app/s/${s}?utm=share24`,status:"active",disclosure:"Incentivized promotion · disclose #ad / Paid partnership"};return et({...t,challenge:a,submissions:[],rewardsClaimed:(t.rewardsClaimed||[]).filter(n=>n.challengeId!==a.id)}),{ok:!0,challenge:a,shareEarn:Q()}}function Id(){const e=Q();if(!e.challenge||e.challenge.status!=="active")return{error:"no_active"};const t={...e.challenge,startedAt:Date.now()-25*60*60*1e3,endsAt:Date.now()-1*60*60*1e3,simulatedElapsed:!0};return et({...e,challenge:t}),{ok:!0,challenge:t,shareEarn:Q()}}function Pd(){const e=Q();if(!e.challenge)return{error:"none"};const t={...e.challenge,status:"ended",endedAt:Date.now()};return et({...e,challenge:t}),{ok:!0,challenge:t,shareEarn:Q()}}function Od({platform:e,postUrl:t=""}={}){if(!u.user)return{error:"signin"};const i=Q();if(!i.challenge||i.challenge.status!=="active")return{error:"no_challenge"};const a=String(e||"").toLowerCase().trim();if(!Ra.includes(a))return{error:"bad_platform"};const n=String(t||"").trim().slice(0,400);if(!n)return{error:"required"};if((i.submissions||[]).some(c=>c.platform===a&&(c.status==="pending"||c.status==="verified")))return{error:"duplicate",shareEarn:i};const r={id:Lt("sub"),platform:a,postUrl:n,submittedAt:Date.now(),status:"pending",note:"Awaiting 24h continuous visibility check (manual/demo)"};return et({...i,submissions:[r,...i.submissions||[]]}),{ok:!0,submission:r,shareEarn:Q()}}function yn(e,t,{note:s=""}={}){if(!["pending","verified","rejected"].includes(t))return{error:"bad_status"};const i=Q();let a=null;const n=(i.submissions||[]).map(o=>o.id!==e?o:(a={...o,status:t,verifiedAt:t==="verified"?Date.now():o.verifiedAt||null,note:s||(t==="verified"?"Demo verified · 24h visibility assumed (manual)":t==="rejected"?"Rejected · ineligible / deleted / unverified":o.note)},a));return a?(et({...i,submissions:n}),{ok:!0,submission:a,shareEarn:Q()}):{error:"not_found"}}function to(){const e=Q();return new Set((e.submissions||[]).filter(s=>s.status==="verified").map(s=>s.platform)).size}function so(){const e=Q(),t=to(),s=(e.platformsLinked||[]).length,i=new Set((e.rewardsClaimed||[]).map(a=>a.tierId));return Wr.filter(a=>{if(i.has(a.id)||t<a.minVerified)return!1;if(a.requireAllLinked){if(s<3)return!1;const n=new Set((e.platformsLinked||[]).map(r=>r.platform)),o=new Set((e.submissions||[]).filter(r=>r.status==="verified").map(r=>r.platform));for(const r of n)if(!o.has(r))return!1}return!0}).map(a=>({...a,verifiedCount:t,linkedCount:s}))}function _d(e){var o;if(!u.user)return{error:"signin"};const i=so().find(r=>r.id===e);if(!i)return{error:"not_claimable"};const a=Q(),n={id:Lt("srw"),tierId:i.id,label:i.label,kind:i.kind,at:Date.now(),challengeId:((o=a.challenge)==null?void 0:o.id)||null,testMode:!0};return i.membership&&yi(i.membership,!0),et({...a,rewardsClaimed:[n,...a.rewardsClaimed||[]]}),{ok:!0,claim:n,shareEarn:Q(),membership:Tt()}}function qd(){return et(Jr()),Q()}function xe(){return Zr(u.referEarn)}function Nd(){return Yr.map(e=>({...e}))}function Jt(){const e=u.user,t=xe();if(t.code)return t;const s=eo(e);return ct({...t,code:s})}function io(){return`https://dbs.app/r/${Jt().code}`}function Bd({username:e=""}={}){const t=u.user;if(!t)return{error:"signin"};const s=Jt(),i=String(e||"").trim().slice(0,24)||"Invitee"+(s.invitees.length+1);if(i.toLowerCase()===String(t.username||"").toLowerCase())return{error:"self_referral"};const a={id:Lt("inv"),username:i,signedUpAt:Date.now(),activeDays:[],status:"pending",welcomeClaimed:!1,flaggedFraud:!1};return ct({...s,invitees:[a,...s.invitees||[]]}),{ok:!0,invitee:a,referEarn:xe()}}function Rd(e){const t=xe();let s=null;const i=(t.invitees||[]).map(a=>a.id!==e?a:a.flaggedFraud?(s={error:"fraud",invitee:a},a):(s={...a,welcomeClaimed:!0,welcomeAt:Date.now()},s));return s?s.error?s:(ct({...t,invitees:i}),{ok:!0,invitee:s,perk:"Welcome badge / profile decoration (TEST MODE)"}):{error:"not_found"}}function jd(e,{day:t=null}={}){const s=xe();let i=null;const a=(s.invitees||[]).map(n=>{if(n.id!==e)return n;if(n.flaggedFraud)return i={error:"fraud",invitee:n},n;const o=Number(n.signedUpAt)||Date.now(),r=o+7*864e5;let c=t;if(!c){const h=new Set(n.activeDays||[]);let f=null;for(let v=0;v<7;v++){const k=us(o+v*864e5);if(!h.has(k)){f=k;break}}if(!f)return i={error:"window_full",invitee:n},n;c=f}const d=Date.parse(c+"T12:00:00Z");if(!Number.isFinite(d)||d<o-864e5||d>r)return i={error:"outside_window",invitee:n},n;const p=Array.from(new Set([...n.activeDays||[],c])).sort();let m=n.status;return p.length>=3&&(m="active"),i={...n,activeDays:p,status:m},i});return i?i.error?i:(ct({...s,invitees:a}),{ok:!0,invitee:i,referEarn:xe()}):{error:"not_found"}}function kn(e,t=!0){const s=xe();let i=null;const a=(s.invitees||[]).map(n=>{var o;return n.id!==e?n:(i={...n,flaggedFraud:!!t,status:t?"fraud":((o=n.activeDays)==null?void 0:o.length)>=3?"active":"pending"},i)});return i?(ct({...s,invitees:a}),{ok:!0,invitee:i,referEarn:xe()}):{error:"not_found"}}function ao(){return(xe().invitees||[]).filter(t=>t.status==="active"&&!t.flaggedFraud).length}function no(){const e=xe(),t=ao(),s=new Set((e.milestonesClaimed||[]).map(i=>i.milestoneId));return Yr.filter(i=>t>=i.n&&!s.has(i.id)).map(i=>({...i,activeCount:t}))}function Kd(e){if(!u.user)return{error:"signin"};const i=no().find(o=>o.id===e);if(!i)return{error:"not_claimable"};const a=xe(),n={id:Lt("rmw"),milestoneId:i.id,n:i.n,label:i.label,kind:i.kind,at:Date.now(),testMode:!0,note:"Distinct from Clippers commissions · TEST MODE · no real billing"};return i.membership&&yi(i.membership,!0),ct({...a,milestonesClaimed:[n,...a.milestonesClaimed||[]]}),{ok:!0,claim:n,referEarn:xe(),membership:Tt()}}function Fd(){const e=u.user;return ct({...Qr(),code:eo(e)}),xe()}function Gd({force:e=!1}={}){if(!u.user)return{error:"signin"};const s=Jt();if(!e&&(s.invitees||[]).length>0)return{error:"already_seeded",referEarn:s};const i=Date.now(),a=864e5,n=[{id:"inv_demo_a",username:"NovaFan",signedUpAt:i-5*a,activeDays:[us(i-5*a),us(i-4*a),us(i-3*a)],status:"active",welcomeClaimed:!0,flaggedFraud:!1},{id:"inv_demo_b",username:"ClipCurious",signedUpAt:i-2*a,activeDays:[us(i-2*a)],status:"pending",welcomeClaimed:!0,flaggedFraud:!1},{id:"inv_demo_c",username:"BottyMcBot",signedUpAt:i-6*a,activeDays:[],status:"fraud",welcomeClaimed:!1,flaggedFraud:!0}];return ct({...s,invitees:n,milestonesClaimed:s.milestonesClaimed||[]}),{ok:!0,seeded:n.length,referEarn:xe()}}const Li=[{id:"youtube",label:"YouTube",color:"#ff4444",hint:"YouTube Live / Studio"},{id:"tiktok",label:"TikTok",color:"#69c9d0",hint:"TikTok LIVE"},{id:"twitch",label:"Twitch",color:"#9146ff",hint:"Twitch Dashboard"},{id:"facebook",label:"Facebook",color:"#1877f2",hint:"Facebook Live"},{id:"instagram",label:"Instagram",color:"#e1306c",hint:"IG Live (demo)"},{id:"kick",label:"Kick",color:"#53fc18",hint:"Kick Studio"},{id:"custom_rtmp",label:"Custom RTMP",color:"#ffb020",hint:"Any RTMP endpoint"}],Vd=()=>({freeMaxDestinations:2,houseUnlimited:!0,houseUserIds:["dbs"],tiers:{bronze:{id:"bronze",label:"Bronze",price:4.99,maxDestinations:3,placement:!1,badge:"Bronze Streamer",perks:["3 destination slots","Campaign badge on Go Live"]},silver:{id:"silver",label:"Silver",price:9.99,maxDestinations:5,placement:!0,badge:"Silver Streamer",perks:["5 destination slots","Campaign badge","Explore / Live placement flag"]},gold:{id:"gold",label:"Gold",price:19.99,maxDestinations:7,placement:!0,badge:"Gold Streamer",perks:["All 7 destinations","Campaign badge","Priority Explore / Live placement"]}}});function Zs(){return{platforms:{},selected:[],session:null,history:[],ingest:null,campaign:{tier:null,status:"none",enrolledAt:null,cancelledAt:null},campaignConfig:null}}function Ii(){const e=u.restream||Zs();return{...Zs(),...e,platforms:e.platforms&&typeof e.platforms=="object"?e.platforms:{},selected:Array.isArray(e.selected)?e.selected:[],history:Array.isArray(e.history)?e.history:[],campaign:{...Zs().campaign,...e.campaign||{}}}}function Qt(e){return u={...u,restream:e},E(u),u.restream}function Ud(e){var s,i;if((s=e.ingest)!=null&&s.rtmpUrl&&((i=e.ingest)!=null&&i.streamKey))return e;const t="dbs_demo_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,10);return{...e,ingest:{rtmpUrl:"rtmp://ingest.dbs.local/live",streamKey:t,rotatedAt:Date.now(),note:"TEST MODE demo key · not a real media server"}}}function dt(){let e=Ii();const t=e.ingest;return e=Ud(e),e.ingest!==t&&Qt(e),e}function ro(){const e=dt();return Li.map(t=>{const s=e.platforms[t.id]||{};return{...t,connected:!!s.connected,connectedAt:s.connectedAt||null,handle:s.handle||"",lastError:s.lastError||null,enabled:s.enabled!==!1}})}function Hd(e,t=""){const s=Li.find(n=>n.id===e);if(!s)return{error:"unknown_platform"};const i=dt(),a={...i.platforms,[e]:{id:e,connected:!0,connectedAt:Date.now(),handle:String(t||s.label+" Demo").slice(0,40),lastError:null,enabled:!0}};return Qt({...i,platforms:a}),{ok:!0,platform:ro().find(n=>n.id===e)}}function zd(e){var n;const t=dt();if(!((n=t.platforms[e])!=null&&n.connected))return{error:"not_connected"};const s={...t.platforms,[e]:{...t.platforms[e],connected:!1,disconnectedAt:Date.now(),lastError:null}},i=(t.selected||[]).filter(o=>o!==e);let a=t.session;return a&&!a.endedAt&&(a={...a,destinations:(a.destinations||[]).map(o=>o.id===e?{...o,status:"disconnected",health:"error"}:o)}),Qt({...t,platforms:s,selected:i,session:a}),{ok:!0}}function Wd(e){const t=dt(),s=new Set(Object.values(t.platforms).filter(a=>a.connected).map(a=>a.id)),i=(Array.isArray(e)?e:[]).filter(a=>s.has(a)).slice(0,7);return Qt({...t,selected:i}),{ok:!0,selected:i}}function Yd(e){var i;const t=dt();if(!((i=t.platforms[e])!=null&&i.connected))return{error:"not_connected"};const s=new Set(t.selected||[]);return s.has(e)?s.delete(e):s.add(e),Wd([...s])}function oo(){var i,a,n;const e=Ii(),t=Vd(),s=e.campaignConfig||{};return{...t,...s,tiers:{...t.tiers,...s.tiers||{},bronze:{...t.tiers.bronze,...((i=s.tiers)==null?void 0:i.bronze)||{}},silver:{...t.tiers.silver,...((a=s.tiers)==null?void 0:a.silver)||{}},gold:{...t.tiers.gold,...((n=s.tiers)==null?void 0:n.gold)||{}}},freeMaxDestinations:Number(s.freeMaxDestinations)>0?Number(s.freeMaxDestinations):t.freeMaxDestinations,houseUnlimited:s.houseUnlimited!==!1,houseUserIds:Array.isArray(s.houseUserIds)?s.houseUserIds:t.houseUserIds}}function lo(){return{...Zs().campaign,...Ii().campaign||{}}}function Jd(){const e=u.user;if(!e)return!1;const t=oo();return e.id==="dbs"||e.username==="DatBoiSkeet"?!0:(t.houseUserIds||[]).includes(e.id)}function co(){const e=oo();if(Jd()&&e.houseUnlimited)return{max:Li.length,source:"house_free",tier:null};const t=lo();if(t.status==="active"&&t.tier&&e.tiers[t.tier]){const s=e.tiers[t.tier];return{max:s.maxDestinations,source:"campaign",tier:t.tier,badge:s.badge,placement:!!s.placement}}return{max:e.freeMaxDestinations,source:"free_baseline",tier:null,badge:null,placement:!1}}function Qd(){const e=u.user;if(!e)return{error:"signin"};const t=dt();if(t.session&&!t.session.endedAt)return{error:"already_live"};const s=Object.values(t.platforms).filter(c=>c.connected).map(c=>c.id);if(!s.length)return{error:"no_platforms"};let i=(t.selected||[]).filter(c=>s.includes(c));if(!i.length)return{error:"none_selected"};const a=co();if(i.length>a.max)return{error:"over_cap",max:a.max,selected:i.length,source:a.source};const n=i.map((c,d)=>{const p=Li.find(h=>h.id===c),m=d===i.length-1&&i.length>2?"connecting":"streaming";return{id:c,label:(p==null?void 0:p.label)||c,status:m==="connecting"?"connecting":"streaming",health:m,startedAt:Date.now()}}),o=lo(),r={id:Lt("rs"),hostId:e.id,hostName:e.username,startedAt:Date.now(),destinations:n,selected:i.slice(),campaignTier:o.status==="active"?o.tier:null,campaignBadge:a.badge||null,placement:!!a.placement,testMode:!0,endedAt:null};return Qt({...t,session:r,selected:i}),{ok:!0,session:r}}function Xd(){const e=dt();if(!e.session||e.session.endedAt)return{error:"offline"};const t={...e.session,endedAt:Date.now(),destinations:(e.session.destinations||[]).map(i=>({...i,status:i.health==="error"?"error":"ended",health:i.health==="error"?"error":"ended"}))},s=[t,...e.history||[]].slice(0,20);return Qt({...e,session:null,history:s}),{ok:!0,session:t,history:s}}function Zd(){const e=Ii().session;return e&&!e.endedAt?e:null}function po(){const e=M().connectPrefs||{};return{ageConfirmed:!!e.ageConfirmed,rulesAccepted:!!e.rulesAccepted}}function wn(e={}){const t={...po(),...e};return t.ageConfirmed||(t.rulesAccepted=!1),Ol(s=>({...s,connectPrefs:t})),t}const uo=[{id:"day_one",name:"Day One",blurb:"Joined the Loyalty Club — recognition starts with showing up, not spending.",need:0,kind:"join"},{id:"listener",name:"Listener",blurb:"Logged authorized listening (demo tick). Not purchase-only.",need:1,kind:"listen"},{id:"live_attendee",name:"Live Regular",blurb:"Attended a livestream (demo stub). Healthy participation.",need:1,kind:"live"},{id:"club_member",name:"Club Member",blurb:"Joined a Fan Club discussion community.",need:1,kind:"club"},{id:"helper",name:"Helper",blurb:"Community-helper milestone (welcome tip / guidelines share demo).",need:1,kind:"help"},{id:"top_fan",name:"Top Fan",blurb:"Earned 50+ loyalty points from mixed healthy actions — gifts alone do not unlock this.",needPoints:50}];function mo(e=Date.now()){return new Date(e).toISOString().slice(0,10)}function Ps(){const e=u.loyalty||{};return{points:Number(e.points)||0,history:Array.isArray(e.history)?e.history:[],badges:Array.isArray(e.badges)?e.badges:[],publicVisible:e.publicVisible!==!1,lastActionAt:e.lastActionAt&&typeof e.lastActionAt=="object"?e.lastActionAt:{},dayCounts:e.dayCounts&&typeof e.dayCounts=="object"?e.dayCounts:{}}}function ja(e){u={...u,loyalty:e},E(u)}function ep(){return"loy_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function tp(e,{cooldownMs:t=8e3,dailyCap:s=8}={}){const i=Ps(),a=Date.now(),n=Number(i.lastActionAt[e])||0;if(a-n<t)return{ok:!1,reason:"cooldown"};const o=mo(a);return((i.dayCounts[o]||{})[e]||0)>=s?{ok:!1,reason:"daily_cap"}:{ok:!0}}function sp(e){const t=new Set(e.badges||[]),s={};return(e.history||[]).forEach(i=>{s[i.kind]=(s[i.kind]||0)+1}),uo.forEach(i=>{if(!t.has(i.id)){if(i.needPoints!=null){e.points>=i.needPoints&&t.add(i.id);return}if(i.id==="day_one"){((e.history||[]).length>0||e.points>0)&&t.add(i.id);return}(s[i.kind]||0)>=(i.need||1)&&t.add(i.id)}}),[...t]}function Os(){return Ps()}function ip(e){const t=Ps();return ja({...t,publicVisible:!!e}),Os()}function ap(e,{points:t=5,note:s=""}={}){if(!u.user)return{error:"signin"};const a=tp(e);if(!a.ok)return{error:a.reason};const n=Ps(),o=Date.now(),r=mo(o),c={...n.dayCounts,[r]:{...n.dayCounts[r]||{},[e]:((n.dayCounts[r]||{})[e]||0)+1}},d={id:ep(),at:o,kind:e,points:t,note:String(s||e).slice(0,120)},p={...n,points:n.points+t,history:[d,...n.history].slice(0,80),lastActionAt:{...n.lastActionAt,[e]:o},dayCounts:c};return p.badges.includes("day_one")||(p.history=p.history),p.badges=sp(p),p.badges.includes("day_one")||(p.badges=["day_one",...p.badges]),ja(p),{ok:!0,loyalty:Os(),entry:d,newBadges:p.badges.filter(m=>!(n.badges||[]).includes(m))}}function ho(){const e=Os(),t=new Set(e.badges||[]);return uo.map(s=>({...s,unlocked:t.has(s.id)}))}function np(){return ja({points:0,history:[],badges:[],publicVisible:!0,lastActionAt:{},dayCounts:{}}),Os()}function It(){const e=u.openMic||{};return{applications:Array.isArray(e.applications)?e.applications:[],seeded:!!e.seeded,houseIndex:typeof e.houseIndex=="number"?e.houseIndex:0}}function Pi(e){u={...u,openMic:e},E(u)}function rp(){return"om_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function Xt({force:e=!1}={}){const t=It();if(t.seeded&&!e&&t.applications.length>0)return{skipped:!0,applications:t.applications};const s=Date.now(),i=864e5,a=[{id:"om_demo_approved",userId:"u_ria",username:"RiaLoops",talent:"producer",trackTitle:"Midnight Pads (demo)",profileNote:"Beatmaker · looking to collab on LSS energy",rightsCertified:!0,status:"approved",at:s-10*i,reviewedAt:s-9*i},{id:"om_demo_pending",userId:"u_dez",username:"DezOnMic",talent:"rapper",trackTitle:"Porch Light Freestyle",profileNote:"Opt-in showcase · not pay-to-win",rightsCertified:!0,status:"pending",at:s-2*i},{id:"om_demo_rejected",userId:"u_spam",username:"SpamBeats",talent:"dj",trackTitle:"Untitled drop",profileNote:"No rights cert honesty",rightsCertified:!1,status:"rejected",at:s-5*i,reviewedAt:s-4*i,reviewNote:"Rights certification required"}],n=typeof t.houseIndex=="number"?t.houseIndex:0;return Pi({applications:a,seeded:!0,houseIndex:n}),{seeded:a.length,applications:a}}function oa({status:e=null}={}){Xt();let t=It().applications.slice();return e&&(t=t.filter(s=>s.status===e)),t.sort((s,i)=>(i.at||0)-(s.at||0))}function op(){return oa({status:"approved"})}function lp(){const e=It();return Ct(typeof e.houseIndex=="number"?e.houseIndex:0)}function cp(){const e=It(),t=((typeof e.houseIndex=="number"?e.houseIndex:0)+1)%jr();return Pi({...e,houseIndex:t}),Ct(t)}function dp({talent:e="rapper",trackTitle:t="",profileNote:s="",rightsCertified:i=!1}={}){const a=u.user;if(!a)return{error:"signin"};if(!i)return{error:"rights"};const n=String(t||"").trim().slice(0,80);if(!n)return{error:"title"};Xt();const o=It();if(o.applications.some(c=>c.userId===a.id&&c.status==="pending"))return{error:"pending"};const r={id:rp(),userId:a.id,username:a.username,talent:String(e||"other").slice(0,32),trackTitle:n,profileNote:String(s||"").trim().slice(0,240),rightsCertified:!0,status:"pending",at:Date.now()};return Pi({...o,applications:[r,...o.applications],seeded:!0}),{ok:!0,application:r}}function la(e,t,s=""){if(!se())return{error:"admin"};if(!["pending","approved","rejected"].includes(t))return{error:"status"};const a=It();let n=null;const o=a.applications.map(r=>r.id!==e?r:(n={...r,status:t,reviewedAt:Date.now(),reviewNote:String(s||"").slice(0,160)},n));return n?(Pi({...a,applications:o}),{ok:!0,application:n}):{error:"missing"}}function pp(){var $,A;Xt(),Ke();try{_s(),Be()}catch{}const e=It().applications||[],t={pending:0,approved:0,rejected:0};e.forEach(w=>{const P=w.status||"pending";t[P]!==void 0?t[P]+=1:t.pending+=1});const s=e.filter(w=>w.status==="pending").sort((w,P)=>(P.at||0)-(w.at||0)),i=je().clubs.slice().sort((w,P)=>(P.createdAt||0)-(w.createdAt||0)),a=i.slice(0,5).map(w=>({id:w.id,name:w.name,privacy:w.privacy,official:!!w.official,memberCount:w.memberCount||(w.members||[]).length||0,createdAt:w.createdAt||0})),n=Ps(),r=ho().filter(w=>w.unlocked),c=lt(),d=Da();let p=0,m=0,h=0,f=0,v=0;d.forEach(w=>{p=q(p+(w.gross||0)),m=q(m+(w.fees||0)),h=q(h+(w.creatorShare||0)),f=q(f+(w.dbsShare||0)),v+=w.count||0});const k=u.wallet||{balance:0},b=u.catalog||[],S=vr();return{openMic:{total:e.length,byStatus:t,pending:s},fanClubs:{total:i.length,recent:a},loyalty:{points:n.points||0,badgeCount:r.length,badges:r.map(w=>w.name||w.id),publicVisible:n.publicVisible!==!1,historyCount:(n.history||[]).length,note:"Device-local loyalty for signed-in user · not a multi-fan leaderboard"},revenue:{demo:!0,chip:"demo figures · not production",gross:p,fees:m,creatorShare:h,dbsShare:f,earnCount:v,creatorAvailable:q(c.available||0),creatorHolds:q(c.holds||0),fanWalletBalance:Number(k.balance)||0,byCategory:d.filter(w=>w.count>0),catalogPublished:b.filter(w=>w.published).length,catalogTotal:b.length},moderation:{warnings:[],suspensions:[],note:"Stub · Content Polish owns Guidelines copy"},hotFeed:{openAlerts:(u.engagementAlerts||[]).filter(w=>!w.handledAt).length,totalAlerts:(u.engagementAlerts||[]).length,hotPosts:Array.isArray(($=u.hotFeed)==null?void 0:$.posts)?u.hotFeed.posts.length:0,hotLives:Array.isArray((A=u.hotFeed)==null?void 0:A.lives)?u.hotFeed.lives.length:0,note:"§38 · Build posts + Live Social lives"},stats:S}}const up={frames:"frame",effects:"effect",banners:"banner","name styles":"nameStyle",badges:"badge"},Sn=["frame-rodeo-gold","fx-snowfall","ban-skyline","name-neon","badge-dayone"];function mp(e){const t=e&&typeof e=="object"?e:{},s={};return["frame","effect","banner","nameStyle","badge"].forEach(i=>{typeof t[i]=="string"&&t[i]&&(s[i]=t[i])}),s}function Zt(){const e=u.profileShop||{};return{owned:Array.isArray(e.owned)?[...new Set(e.owned.map(String))]:[],equipped:mp(e.equipped),reduceMotion:!!e.reduceMotion}}function es(e){u={...u,profileShop:e},E(u)}function nt(){return Zt()}function go(e){return e&&up[e.category]||null}function hp(e){const t=String(e||"");if(!t)return{error:"missing"};const s=Zt();return s.owned.includes(t)?{ok:!0,already:!0,shop:nt()}:(es({...s,owned:[...s.owned,t]}),{ok:!0,shop:nt()})}function gp(){const e=Zt(),t=new Set(e.owned);return Sn.forEach(s=>t.add(s)),es({...e,owned:[...t]}),{ok:!0,unlocked:Sn,shop:nt()}}function fp(e){const t=String(e||"");return t.startsWith("frame-")?"frame":t.startsWith("fx-")?"effect":t.startsWith("ban-")?"banner":t.startsWith("name-")?"nameStyle":t.startsWith("badge-")?"badge":null}function vp(e){const t=String(e||""),s=Zt();if(!s.owned.includes(t))return{error:"not_owned"};const i=fp(t);if(!i)return{error:"unknown_item"};const a={...s.equipped,[i]:t};return es({...s,equipped:a}),{ok:!0,slot:i,shop:nt()}}function bp(e){const t=String(e||"");if(!["frame","effect","banner","nameStyle","badge"].includes(t))return{error:"bad_slot"};const s=Zt(),i={...s.equipped};return delete i[t],es({...s,equipped:i}),{ok:!0,shop:nt()}}function yp(e){const t=Zt();return es({...t,reduceMotion:!!e}),nt()}function kp(){return es({owned:[],equipped:{},reduceMotion:!1}),nt()}const wp=5,Sp=8,$p=[{id:"hp_maya_1",userId:"maya",username:"MayaBeats",text:"Studio loop dropping later — who wants the stem pack? 🔥",image:"/music/01_Long_Story_Short_Coming_Soon.jpg",mediaType:"image",atOffset:36e5*5,likeUsers:["dbs","fanjay","u_seed_a","u_seed_b","u_seed_c","u_seed_d","clipqueen"],comments:[{id:"hc_m1",userId:"fanjay",username:"FanJay",text:"Send it 🙌"},{id:"hc_m2",userId:"dbs",username:"DatBoiSkeet",text:"Pull up on Spotlight"},{id:"hc_m3",userId:"clipqueen",username:"ClipQueen",text:"Stem pack please"}],shares:5},{id:"hp_jay_1",userId:"fanjay",username:"FanJay",text:"Foreign X-Change fit check from the community — buffalo energy.",image:"/merch/03_blue_buffalo_jacket.jpeg",mediaType:"image",atOffset:36e5*8,likeUsers:["maya","dbs","u_seed_a","u_seed_c","u_seed_d","clipqueen","u_seed_b"],comments:[{id:"hc_j1",userId:"maya",username:"MayaBeats",text:"Jacket hits"},{id:"hc_j2",userId:"clipqueen",username:"ClipQueen",text:"Need this"}],shares:6},{id:"hp_clip_1",userId:"clipqueen",username:"ClipQueen",text:"New clip cut from last Live — tag @DatBoiSkeet if you remix 🎬",image:"/merch/06_black_ptsd_tee.jpeg",mediaType:"video",atOffset:36e5*12,likeUsers:["dbs","maya","fanjay","u_seed_a","u_seed_b","u_seed_c"],comments:[{id:"hc_c1",userId:"dbs",username:"DatBoiSkeet",text:"Clean edit"},{id:"hc_c2",userId:"maya",username:"MayaBeats",text:"Clipping goals"},{id:"hc_c3",userId:"fanjay",username:"FanJay",text:"Saved"},{id:"hc_c4",userId:"u_seed_a",username:"FanA",text:"Fire"}],shares:4},{id:"hp_dbs_boost",userId:"dbs",username:"DatBoiSkeet",text:"Community shoutout — Maya + Jay keeping the feed hot. Keep posting.",image:"/music/02_Ladies_Only_Coming_Soon.jpg",mediaType:"image",atOffset:36e5*3,likeUsers:["maya","fanjay","u_seed_a"],comments:[{id:"hc_d1",userId:"maya",username:"MayaBeats",text:"Grateful 💛"},{id:"hc_d2",userId:"fanjay",username:"FanJay",text:"Lets go"}],shares:2}];function Le(){const e=u.hotFeed||{};return{lives:Array.isArray(e.lives)?e.lives:[],posts:Array.isArray(e.posts)?e.posts:[],seededLives:!!e.seededLives,seededPosts:!!e.seededPosts,seededPostsVer:Number(e.seededPostsVer)||0}}function fo(e){u={...u,hotFeed:e},E(u)}function xp(){const e={...u.profiles};let t=!1;const s=(i,a,n)=>{e[i]||(e[i]={id:i,username:a,bio:n,avatar:"",followers:[],following:["dbs"],verified:!1},t=!0)};s("maya","MayaBeats","Creator · beats & live demos"),s("fanjay","FanJay","Day-one fan · playlist curator"),s("clipqueen","ClipQueen","Clipper · community edits"),t&&(u={...u,profiles:e})}function _s(){gr(),xp();const e=Le(),t=Number(e.seededPostsVer)||0;if(e.seededPosts&&t>=2)return Le();if(e.seededPosts&&t<2){const c={...u.likes||{}},d={...u.comments||{}},p={...u.postShares||{}},m=(h,f,v,k)=>{c[h]=[...new Set([...c[h]||[],...f])];const b=new Set((d[h]||[]).map($=>$.id)),S=[...d[h]||[]];(v||[]).forEach($=>{b.has($.id)||S.push({...$,at:$.at||Date.now()})}),d[h]=S,p[h]=Math.max(Number(p[h]||0),k)};return m("hp_maya_1",["dbs","fanjay","u_seed_a","u_seed_b","u_seed_c","u_seed_d","clipqueen"],[{id:"hc_m3",userId:"clipqueen",username:"ClipQueen",text:"Stem pack please"}],5),m("hp_jay_1",["maya","dbs","u_seed_a","u_seed_c","u_seed_d","clipqueen","u_seed_b"],[{id:"hc_j2",userId:"clipqueen",username:"ClipQueen",text:"Need this"}],6),m("hp_clip_1",["dbs","maya","fanjay","u_seed_a","u_seed_b","u_seed_c"],[{id:"hc_c4",userId:"u_seed_a",username:"FanA",text:"Fire"}],4),c.hp_dbs_boost&&(c.hp_dbs_boost=(c.hp_dbs_boost||[]).slice(0,3),p.hp_dbs_boost=Math.min(Number(p.hp_dbs_boost||0),2)),u={...u,likes:c,comments:d,postShares:p,hotFeed:{...e,seededPosts:!0,seededPostsVer:2}},E(u),Be(),Le()}const s=new Set((u.posts||[]).map(c=>c.id)),i=[...u.posts||[]],a={...u.likes||{}},n={...u.comments||{}},o={...u.postShares||{}},r=Date.now();return $p.forEach(c=>{s.has(c.id)||(i.unshift({id:c.id,userId:c.userId,username:c.username,text:c.text,image:c.image||"",mediaType:c.mediaType||(c.image?"image":"text"),at:r-(c.atOffset||0),house:c.userId==="dbs"}),a[c.id]=[...c.likeUsers||[]],n[c.id]=(c.comments||[]).map(d=>({...d,text:d.text,at:r-(c.atOffset||0)+6e4})),c.shares&&(o[c.id]=c.shares))}),a.p1&&a.p1.length<3&&(a.p1=[...new Set([...a.p1||[],"maya","fanjay","u_seed_a"])]),a.p2&&a.p2.length<2&&(a.p2=[...new Set([...a.p2||[],"maya","fanjay"])]),(!n.p1||n.p1.length<2)&&(n.p1=[...n.p1||[],{id:"hc_p1a",userId:"maya",username:"MayaBeats",text:"Cover art goes crazy",at:r-8e7},{id:"hc_p1b",userId:"fanjay",username:"FanJay",text:"Been waiting on this",at:r-7e7}]),o.p1=Math.max(o.p1||0,2),o.p2=Math.max(o.p2||0,1),u={...u,posts:i,likes:a,comments:n,postShares:o,hotFeed:{...e,seededPosts:!0,seededPostsVer:2}},E(u),Be(),Le()}function Oi(e){const t=u.likes&&u.likes[e]||[],s=u.comments&&u.comments[e]||[],i=u.postShares&&u.postShares[e]||0;return t.length+s.length+Number(i||0)}function Be(){const e=Le(),s=(u.posts||[]).map(r=>{const c=(u.likes&&u.likes[r.id]||[]).length,d=(u.comments&&u.comments[r.id]||[]).length,p=Number(u.postShares&&u.postShares[r.id]||0),m=c+d+p;return{id:r.id,postId:r.id,score:m,likes:c,comments:d,shares:p,username:r.username,userId:r.userId,preview:(r.text||"").slice(0,120),text:r.text||"",image:r.image||"",mediaType:r.mediaType||(r.image?"image":"text"),at:r.at||0,house:r.userId==="dbs"||!!r.house}}).filter(r=>r.score>=wp).sort((r,c)=>c.score-r.score||c.at-r.at).slice(0,Sp),i=new Set((e.posts||[]).map(r=>r.postId||r.id)),a=Array.isArray(u.engagementAlerts)?[...u.engagementAlerts]:[],n=new Set(a.filter(r=>r.kind==="post").map(r=>r.refId));s.forEach(r=>{n.has(r.id)||i.has(r.id)&&e.posts.length||(a.unshift({id:"ea_post_"+r.id+"_"+Date.now().toString(36),kind:"post",refId:r.id,title:(r.preview||r.text||"Hot post").slice(0,80),username:r.username,score:r.score,mediaType:r.mediaType||"text",at:Date.now(),handledAt:null,handledNote:null}),n.add(r.id))});const o=a.slice(0,60);return u={...u,hotFeed:{lives:e.lives,seededLives:e.seededLives,posts:s,seededPosts:e.seededPosts||s.length>0,seededPostsVer:Number(e.seededPostsVer)||0},engagementAlerts:o},E(u),Le()}function vo(e=8){return _s(),Le().posts.length||Be(),(Le().posts||[]).slice(0,Math.max(1,Number(e)||8))}function bo(e){const t=String(e||"");if(!t)return{error:"missing"};if(!(u.posts||[]).find(a=>a.id===t))return{error:"missing"};const i={...u.postShares||{}};return i[t]=Number(i[t]||0)+1,u={...u,postShares:i},E(u),Be(),{ok:!0,shares:i[t],score:Oi(t)}}function Ep(e){const t=e||{},s=t.kind==="live"?"live":"post",i=String(t.refId||t.id||"");if(!i)return{error:"missing"};const a=Array.isArray(u.engagementAlerts)?[...u.engagementAlerts]:[],n=a.find(r=>r.kind===s&&r.refId===i&&!r.handledAt);if(n)return{ok:!0,alert:n,deduped:!0};const o={id:t.id||"ea_"+s+"_"+i+"_"+Date.now().toString(36),kind:s,refId:i,title:String(t.title||"Hot item").slice(0,120),username:String(t.username||""),score:Number(t.score)||0,viewers:t.viewers!=null?Number(t.viewers):void 0,gifts:t.gifts!=null?Number(t.gifts):void 0,mediaType:t.mediaType||(s==="live"?"live":"text"),at:t.at||Date.now(),handledAt:t.handledAt||null,handledNote:t.handledNote||null};return u={...u,engagementAlerts:[o,...a].slice(0,60)},E(u),{ok:!0,alert:o}}function $n({openOnly:e=!0}={}){const t=Array.isArray(u.engagementAlerts)?u.engagementAlerts:[];return(e?t.filter(i=>!i.handledAt):t.slice()).sort((i,a)=>(a.at||0)-(i.at||0))}function js(e,t){const s=String(e||"");if(!s)return{error:"missing"};const i=Array.isArray(u.engagementAlerts)?u.engagementAlerts:[];let a=null;const n=i.map(o=>o.id!==s?o:(a={...o,handledAt:Date.now(),handledNote:t!=null?String(t):o.handledNote||"handled"},a));return a?(u={...u,engagementAlerts:n},E(u),{ok:!0,alert:a}):{error:"missing"}}function Ap(e){if(!se())return{error:"admin"};const t=u.user;if(!t)return{error:"signin"};const s=String(e||""),i=new Set(u.likes&&u.likes[s]||[]);return i.add(t.id),u={...u,likes:{...u.likes,[s]:[...i]}},E(u),Be(),{ok:!0,count:i.size,score:Oi(s)}}function Cp(e,t){if(!se())return{error:"admin"};const s=u.user;if(!s)return{error:"signin"};const i=String(e||""),a=t.trim();if(!a)return{error:"empty"};const n={id:"c_admin_"+Date.now().toString(36),userId:s.id,username:s.username,text:a,at:Date.now(),admin:!0},o=u.comments&&u.comments[i]||[];return u={...u,comments:{...u.comments,[i]:[...o,n]}},E(u),Be(),{ok:!0,comment:n,score:Oi(i)}}function Tp(e){if(!se())return{error:"admin"};const t=bo(e);return t.error?t:{ok:!0,shares:t.shares,link:"#/posts",score:t.score}}function Ka(e,t){return Math.max(0,Number(e)||0)+Math.max(0,Number(t)||0)*20}function Fa(e){if(!e||typeof e!="object")return null;const t=String(e.id||e.liveId||"");if(!t)return null;const s=String(e.hostId||e.userId||""),i=String(e.hostName||e.username||e.handle||"Creator"),a=Math.max(0,Number(e.viewers)||0),n=Math.max(0,Number(e.giftsTotal??e.gifts)||0),o=e.score!=null&&Number.isFinite(Number(e.score))?Number(e.score):Ka(a,n);return{id:t,hostId:s,hostName:i,title:String(e.title||"Live"),viewers:a,giftsTotal:n,house:!!e.house,spikedAt:e.spikedAt||null,score:o}}function yo({force:e=!1}={}){const t=Le();if(t.seededLives&&!e&&(t.lives||[]).length>0)return{skipped:!0,lives:t.lives.map(Fa).filter(Boolean)};const s=[{id:"hl_dbs_house",hostId:"dbs",hostName:"DatBoiSkeet",title:"DBS Live · Listening Session",viewers:8420,giftsTotal:186,house:!0},{id:"hl_dbs_vault",hostId:"dbs",hostName:"DatBoiSkeet",title:"Vault Drop Afterparty · House",viewers:3210,giftsTotal:94,house:!0},{id:"hl_skeetfan",hostId:"u_skeetfanatl",hostName:"SkeetFanATL",title:"ATL reacts · Long Story Short",viewers:1540,giftsTotal:42,house:!1},{id:"hl_vaultwatch",hostId:"u_vaultwatcher",hostName:"VaultWatcher",title:"Vault deep cut night",viewers:980,giftsTotal:61,house:!1},{id:"hl_fxclip",hostId:"u_fxclipper",hostName:"FXClipper",title:"Foreign X-Change clips live",viewers:2210,giftsTotal:28,house:!1},{id:"hl_nightowl",hostId:"u_nightowldbs",hostName:"NightOwlDBS",title:"Late night lounge · chill",viewers:412,giftsTotal:15,house:!1},{id:"hl_longstory",hostId:"u_longstorylistener",hostName:"LongStoryListener",title:"LSS theory hour",viewers:128,giftsTotal:7,house:!1},{id:"hl_ladies",hostId:"u_ladiesonlyfan",hostName:"LadiesOnlyFan",title:"Ladies Only countdown",viewers:67,giftsTotal:3,house:!1}].map(i=>({...i,spikedAt:null,score:Ka(i.viewers,i.giftsTotal)}));return fo({...t,lives:s,seededLives:!0}),{ok:!0,lives:s}}function ts(){return yo(),(Le().lives||[]).map(Fa).filter(Boolean).sort((t,s)=>(s.score||0)-(t.score||0)||(s.viewers||0)-(t.viewers||0))}function Dp(e){const t=String(e||"");if(!t)return{error:"missing"};yo();const s=Le();let i=null;const a=(s.lives||[]).map(o=>{const r=Fa(o);if(!r||r.id!==t)return o;const c=180+Math.floor(Math.random()*920),d=4+Math.floor(Math.random()*28),p=r.viewers+c,m=r.giftsTotal+d,h=Ka(p,m);return i={...r,viewers:p,giftsTotal:m,score:h,spikedAt:Date.now()},i});if(!i)return{error:"missing"};fo({...s,lives:a,seededLives:!0});const n=Ep({kind:"live",refId:i.id,title:i.title,username:i.hostName,score:i.score,viewers:i.viewers,gifts:i.giftsTotal});return{ok:!0,live:i,alert:(n==null?void 0:n.alert)||null,deduped:!!(n!=null&&n.deduped)}}function Mp(){return ts().filter(s=>s&&!s.house).sort((s,i)=>(i.score||0)-(s.score||0)||(i.viewers||0)-(s.viewers||0)).slice(0,6).map(s=>({id:s.id,hostId:s.hostId,hostName:s.hostName,title:s.title,viewers:s.viewers,giftsTotal:s.giftsTotal,house:!!s.house,score:s.score,spikedAt:s.spikedAt||null,playbacksToday:s.playbacksToday!=null?s.playbacksToday:Math.max(1,Math.round((s.viewers||0)/40))}))}function ko(){const e=new Date().toISOString().slice(0,10),s=(Et({publishedOnly:!0,types:["song"]})||[]).map(a=>{const n=Number(a.playsToday)||Number(a.playCount)||Number(a.plays)||0;let o="";return a.coverRef&&!String(a.coverRef).startsWith("idb:")&&(o=a.coverRef),{id:a.id,title:a.title||"Untitled",artist:a.artist||"DatBoiSkeet",cover:o,playsToday:n,href:"#/music",demo:!1,day:e,status:a.status||(a.published?"Published":"Catalog")}}).filter(a=>a.playsToday>0).sort((a,n)=>n.playsToday-a.playsToday||String(a.title).localeCompare(String(n.title)));return s[0]?s[0]:{id:"demo_most_played_lss",title:"Long Story Short",artist:"DatBoiSkeet",cover:"/music/01_Long_Story_Short_Coming_Soon.jpg",playsToday:900+e.split("-").reduce((a,n)=>a+Number(n),0)%400,href:"#/music",demo:!0,day:e,status:"Coming Soon"}}const Lp=3,Ip=3e4,wo="pikk.playCounts.v1";let So={};const $o=()=>{try{return globalThis.localStorage||null}catch{return null}};function xo(){const e=$o();try{return JSON.parse((e?e.getItem(wo):So.v)||"{}")}catch{return{}}}function Pp(e){const t=JSON.stringify(e),s=$o();s?s.setItem(wo,t):So.v=t}const xn=new Map;function Ga(e,{kind:t="audio",seconds:s=0,opened:i=!1,source:a="organic",now:n=Date.now()}={}){var p;const o=String(e||"").trim();if(!o||(t==="story"?!i:!(Number(s)>=Lp)))return!1;const r=xn.get(o);if(r!=null&&n-r<Ip)return!1;xn.set(o,n);const c=xo(),d=c[o]||{total:0,promote:0};d.total+=1,a==="promote"&&(d.promote+=1),c[o]=d,Pp(c);try{(p=globalThis.dispatchEvent)==null||p.call(globalThis,new CustomEvent("pikk:playcount",{detail:{id:o,count:d.total}}))}catch{}return!0}function Eo(e){var t;return((t=xo()[String(e||"").trim()])==null?void 0:t.total)||0}function Ao(e,t="audio"){return`${e} ${t==="audio"?e===1?"play":"plays":e===1?"view":"views"} · this device`}function Co(e=globalThis.document){var s,i;if(!(e!=null&&e.querySelectorAll))return;const t=a=>(String(a).match(/ytimg\.com\/vi(?:_webp)?\/([\w-]{6,})\//)||[])[1];for(const a of e.querySelectorAll('[data-yt], [data-video-id], img[src*="ytimg.com/vi"]')){const n=((s=a.dataset)==null?void 0:s.yt)||((i=a.dataset)==null?void 0:i.videoId)||t(a.getAttribute("src"));if(!n)continue;const o=a.tagName==="IMG"?a.parentElement:a;if(!o)continue;let r=o.querySelector(":scope > .pikk-play-count");const c=Eo(n);if(!c){r==null||r.remove();continue}r||(r=e.createElement?e.createElement("small"):globalThis.document.createElement("small"),r.className="pikk-play-count",o.appendChild(r)),r.dataset.playCountFor=n,r.textContent=Ao(c,"video")}}const En="https://www.youtube.com/iframe_api";let W=[],te=0,L=null,Ks=!1,Ie=!1,pt=!1;const J=new Set;let An=!1,Cn=null;const Tn=new Map;function Je(e){if(!e)return"";try{const t=new URL(e);if(t.hostname.includes("youtu.be"))return t.pathname.slice(1).split("/")[0]||"";const s=t.searchParams.get("v");if(s)return s;const i=t.pathname.match(/\/embed\/([^/?]+)/);if(i)return i[1]==="videoseries"?"":i[1]}catch{}return""}function Dn(e){if(!e)return"";try{return new URL(e).searchParams.get("list")||""}catch{return""}}function jt(e){return e?`https://i.ytimg.com/vi/${e}/hqdefault.jpg`:""}function Op(){var n,o;const e=[],t=new Set,s=new Set,i=r=>{if(r.playlistId){if(s.has(r.playlistId))return;s.add(r.playlistId)}else if(r.youtubeId){if(t.has(r.youtubeId))return;t.add(r.youtubeId)}else return;e.push(r)};for(const r of Qe){const c=((n=r.links)==null?void 0:n.youtube)||"",d=Je(c)||Je(((o=r.links)==null?void 0:o.youtubeMusic)||"");d&&i({id:r.id,title:r.title,artist:r.artist||"DatBoiSkeet",cover:r.cover||jt(d),youtubeId:d,youtube:c||`https://www.youtube.com/watch?v=${d}`,embed:`https://www.youtube.com/embed/${d}`,links:{...r.links||{},youtube:c||`https://www.youtube.com/watch?v=${d}`},kind:"track"})}for(const r of ba){const c=Dn(r.youtube)||Dn(r.embed);c&&i({id:r.id,title:r.title,artist:"DatBoiSkeet",cover:jt("DTe4OiX2otg")||"/brand/logo-dbs-v3@2x.webp",playlistId:c,youtube:r.youtube,embed:r.embed||`https://www.youtube.com/embed/videoseries?list=${c}`,links:{youtube:r.youtube,youtubeMusic:ue.youtubeMusic,spotify:ue.spotify,apple:ue.apple},kind:"mix"})}const a=new Set(["Music Videos"]);for(const r of le){if(!a.has(r.category||"Music Videos")||!r.featured&&!["dirty-money","93","no-love","bouquet","where-im-from","go-2-work"].includes(r.id)&&!r.featured)continue;const c=Je(r.youtube)||Je(r.embed);if(!c||t.has(c))continue;const d=Qe.find(p=>{var m;return Je(((m=p.links)==null?void 0:m.youtube)||"")===c});i({id:r.id,title:r.title,artist:r.artist||"DatBoiSkeet",cover:(d==null?void 0:d.cover)||jt(c),youtubeId:c,youtube:r.youtube,embed:r.embed||`https://www.youtube.com/embed/${c}`,links:{youtube:r.youtube,youtubeMusic:`https://music.youtube.com/watch?v=${c}`,...(d==null?void 0:d.links)||{}},kind:"mv"})}return W=e,te>=W.length&&(te=0),W}function He(e){return String(e||"").toLowerCase().replace(/\(.*?\)/g,"").replace(/[^a-z0-9]+/g," ").trim()}function To(){var i,a;const e=ko();if(!e)return{item:null,meta:null,playable:!1};const t=He(e.title),s=W.find(n=>He(n.title)===t||He(n.title).includes(t)||t.includes(He(n.title)));if(s&&(s.youtubeId||s.playlistId))return{item:{...s},meta:e,playable:!0};for(const n of Qe){if(He(n.title)!==t&&!He(n.title).startsWith(t)&&!t.startsWith(He(n.title)))continue;const o=((i=n.links)==null?void 0:i.youtube)||"",r=Je(o)||Je(((a=n.links)==null?void 0:a.youtubeMusic)||"");return r?{item:{id:n.id,title:n.title,artist:n.artist||"DatBoiSkeet",cover:n.cover||jt(r),youtubeId:r,youtube:o||`https://www.youtube.com/watch?v=${r}`,embed:`https://www.youtube.com/embed/${r}`,links:{...n.links||{},youtube:o||`https://www.youtube.com/watch?v=${r}`},kind:"track"},meta:e,playable:!0}:{item:{id:n.id,title:n.title,artist:n.artist||"DatBoiSkeet",cover:n.cover||e.cover||"",youtube:o||ue.youtube,embed:"",links:{...n.links||{}},kind:"track"},meta:e,playable:!1}}for(const n of le){if(He(n.title)!==t&&!He(n.title).includes(t))continue;const o=Je(n.youtube)||Je(n.embed);if(o)return{item:{id:n.id,title:n.title,artist:n.artist||"DatBoiSkeet",cover:jt(o),youtubeId:o,youtube:n.youtube,embed:n.embed||`https://www.youtube.com/embed/${o}`,links:{youtube:n.youtube,youtubeMusic:`https://music.youtube.com/watch?v=${o}`},kind:"mv"},meta:e,playable:!0}}return{item:{id:e.id||"most-played",title:e.title||"Most played",artist:e.artist||"DatBoiSkeet",cover:e.cover||"",youtube:"",embed:"",links:{spotify:ue.spotify,apple:ue.apple,youtubeMusic:ue.youtubeMusic,youtube:ue.youtube},kind:"track"},meta:e,playable:!1}}function Do(){const e=document.getElementById("spPlayNextMost"),t=document.getElementById("spPlayNextSub"),{meta:s,playable:i}=To();if(e){if(!s){e.hidden=!0;return}if(e.hidden=!1,e.dataset.playable=i?"1":"0",e.dataset.demo=s.demo?"1":"0",e.title=i?`Most played today · ${s.title} → Play next`:`Most played today · ${s.title} (Coming Soon / open platform)`,e.setAttribute("aria-label",`Play next — ${s.title}`),t){const a=s.demo?"DEMO · ":"";t.textContent=`${a}Most played today · ${s.title}`}}}function Mn(e){if(!e)return-1;if(!W.length)return W.push(e),te=0,0;let t=W.findIndex(i=>e.youtubeId&&i.youtubeId===e.youtubeId||e.playlistId&&i.playlistId===e.playlistId||i.id===e.id);if(t===te)return te;if(t>=0){const[i]=W.splice(t,1);t<te&&(te-=1),e=i}const s=Math.min(te+1,W.length);return W.splice(s,0,e),s}function _p(){var n,o,r,c;const{item:e,meta:t,playable:s}=To();if(!t||!e){g("No most-played track yet");return}if(!s){const d=document.getElementById("spOpen"),p=((n=e.links)==null?void 0:n.apple)||((o=e.links)==null?void 0:o.youtubeMusic)||((r=e.links)==null?void 0:r.spotify)||((c=e.links)==null?void 0:c.youtube)||ue.apple;d&&p&&(d.href=p),g(t.demo||t.status==="Coming Soon"?`${t.title} · Coming Soon — no in-app master. Open Music / Stream Everywhere when it drops.`:`${t.title} — open official platform (not in-app audio)`),Do();return}if(_i()||!!pt&&Ie&&J.size===0||J.size>0){const d=Mn(e);g(d===te?`Already playing · ${e.title}`:`Queued next · ${e.title}`),he();return}let a=W.findIndex(d=>e.youtubeId&&d.youtubeId===e.youtubeId||e.playlistId&&d.playlistId===e.playlistId||d.id===e.id);a<0&&(a=Mn(e)),_o(a),g(`Playing · ${e.title}`)}const is=[];function Mo(){var e;return(e=window.YT)!=null&&e.Player?Promise.resolve(window.YT):new Promise(t=>{var i;if(is.push(t),Ks)return;Ks=!0;const s=window.onYouTubeIframeAPIReady;if(window.onYouTubeIframeAPIReady=()=>{Ks=!1;try{s==null||s()}catch{}const a=window.YT;for(;is.length;)try{is.shift()(a)}catch{}Gt()},document.querySelector(`script[src="${En}"]`)){if((i=window.YT)!=null&&i.Player){Ks=!1;const a=window.YT;for(;is.length;)try{is.shift()(a)}catch{}Gt()}}else{const a=document.createElement("script");a.src=En,a.async=!0,document.head.appendChild(a)}})}function Lo(){Mo().then(()=>Gt()).catch(()=>{})}function Gt(){var n;if(!(document.getElementById("dbsStickyFrame")||document.getElementById("dbsYtHost"))||!((n=window.YT)!=null&&n.Player)||L)return;const t=W[te],s={autoplay:0,controls:0,rel:0,modestbranding:1,playsinline:1,enablejsapi:1,origin:location.origin},i={height:"1",width:"1",playerVars:s,events:{onReady:()=>{he()},onStateChange:o=>{if(clearTimeout(Cn),o.data===1){const r=W[te];Cn=setTimeout(()=>{W[te]===r&&_i()&&(Ga((r==null?void 0:r.youtubeId)||(r==null?void 0:r.title),{kind:"audio",seconds:3,source:r!=null&&r.promoted?"promote":"organic"}),he())},3e3)}o.data===0&&Oo({auto:!0}),he()},onError:()=>{g("YouTube embed error — Open on YouTube"),he()}}};t!=null&&t.playlistId?i.playerVars={...s,listType:"playlist",list:t.playlistId}:t!=null&&t.youtubeId?i.videoId=t.youtubeId:i.videoId="DTe4OiX2otg";const a=document.getElementById("dbsStickyFrame")?"dbsStickyFrame":"dbsYtHost";L=new window.YT.Player(a,i)}function Cs({autoplay:e}={autoplay:!1}){const t=W[te];if(!t||!(L!=null&&L.cueVideoById)){Gt();return}try{t.playlistId?(typeof L.loadPlaylist=="function"?L.loadPlaylist({list:t.playlistId,listType:"playlist",index:0}):typeof L.cuePlaylist=="function"&&L.cuePlaylist({list:t.playlistId,listType:"playlist",index:0}),e&&Ie&&J.size===0&&setTimeout(()=>{try{L.playVideo()}catch{}},250)):t.youtubeId&&(e&&Ie&&J.size===0?L.loadVideoById(t.youtubeId):L.cueVideoById(t.youtubeId))}catch{}he()}function _i(){var e;try{return((e=L==null?void 0:L.getPlayerState)==null?void 0:e.call(L))===1}catch{return!1}}function he(){var m,h,f;const e=W[te],t=document.getElementById("spArt"),s=document.getElementById("spTitle"),i=document.getElementById("spSub"),a=document.getElementById("spPlay"),n=document.getElementById("spOpen"),o=document.getElementById("spSource"),r=J.size>0,c=!r&&(pt||_i());t&&e&&(t.src=e.cover||jt(e.youtubeId||"")||"/brand/logo-dbs-v3@2x.webp",t.alt=e.title||""),s&&(s.textContent=(e==null?void 0:e.title)||"PIKK Music");const d=document.getElementById("spPlays");if(d){const v=e?Eo(e.youtubeId||e.title):0;d.textContent=v?Ao(v,"audio"):""}if(i&&(Ie?r?i.textContent=`Paused · ${[...J][0]} interrupt`:i.textContent=`${(e==null?void 0:e.artist)||"DatBoiSkeet"} · via YouTube (not Spotify in-app)`:i.textContent="Tap Play · YouTube embed · Stream Everywhere"),a&&(a.textContent=c?"❚❚":"▶",a.setAttribute("aria-label",c?"Pause":"Play PIKK Music"),a.dataset.playing=c?"1":"0"),n&&e){const v=((m=e.links)==null?void 0:m.apple)||((h=e.links)==null?void 0:h.youtubeMusic)||((f=e.links)==null?void 0:f.spotify)||e.youtube||ue.apple;n.href=v,n.title="Open on official platform"}o&&(o.textContent=(e==null?void 0:e.kind)==="mix"?"YT Mix":(e==null?void 0:e.kind)==="mv"?"YT MV":"YouTube");const p=document.getElementById("spBadge");p&&(p.textContent=r?"INTERRUPTED":Ie&&c?"PLAYING · YT":"TEST · YT EMBED"),Do()}function qp(){var e;if(J.size>0){g("Paused for "+[...J][0]+" — resume when done"),he();return}Ie=!0,pt=!0,Lo(),Gt();try{if(L!=null&&L.playVideo){const t=(e=L.getPlayerState)==null?void 0:e.call(L);t===-1||t===5||t===void 0?Cs({autoplay:!0}):L.playVideo()}else{const t=setInterval(()=>{L!=null&&L.playVideo&&(clearInterval(t),Cs({autoplay:!0}))},120);setTimeout(()=>clearInterval(t),8e3)}}catch{g("Tap Play PIKK Music again if autoplay blocked")}he()}function Np({clearDesire:e}={}){var t;e&&(pt=!1);try{(t=L==null?void 0:L.pauseVideo)==null||t.call(L)}catch{}he()}function qs(e="user"){e&&e!=="user"&&J.add(e),Np({clearDesire:e==="user"}),he()}function Io(e){var t;if(e?J.delete(e):J.clear(),J.size===0&&Ie&&pt)try{(t=L==null?void 0:L.playVideo)==null||t.call(L)}catch{}he()}function ui(e){return Io(e)}function Vt(){qs("video")}function Ui(){qs("live")}function Po(){ui("live")}function Ze(){ui("video")}function Oo({auto:e}={}){W.length&&(te=(te+1)%W.length,pt=!0,e||(Ie=!0),Cs({autoplay:Ie&&J.size===0}),he())}function Bp(){W.length&&(te=(te-1+W.length)%W.length,Ie=!0,pt=!0,Cs({autoplay:J.size===0}),he())}function _o(e){e<0||e>=W.length||(te=e,Ie=!0,J.clear(),pt=!0,Cs({autoplay:!0}),he())}function Rp(){var e,t,s,i,a,n;An||(An=!0,(e=document.getElementById("spPlay"))==null||e.addEventListener("click",()=>{J.size>0&&J.clear(),_i()?qs("user"):qp()}),(t=document.getElementById("spPrev"))==null||t.addEventListener("click",()=>{J.clear(),Bp()}),(s=document.getElementById("spNext"))==null||s.addEventListener("click",()=>{J.clear(),Oo()}),zp(),(i=document.getElementById("spOpen"))==null||i.addEventListener("click",o=>{g("Opening external music service (playback depends on provider)")}),(a=document.getElementById("spPlayNextMost"))==null||a.addEventListener("click",()=>{_p()}),(n=document.getElementById("spQueueBtn"))==null||n.addEventListener("click",()=>{const o=document.getElementById("spQueuePanel");if(!o)return;o.hasAttribute("hidden")?(o.removeAttribute("hidden"),o.innerHTML=W.map((c,d)=>`<button type="button" class="sp-q-item${d===te?" on":""}" data-i="${d}">
              <img src="${c.cover||""}" alt="" width="36" height="36" />
              <span><b>${Ln(c.title)}</b><small>${Ln(c.artist)} · ${c.kind}</small></span>
            </button>`).join(""),o.querySelectorAll(".sp-q-item").forEach(c=>{c.addEventListener("click",()=>{_o(Number(c.dataset.i)),o.setAttribute("hidden","")})})):o.setAttribute("hidden","")}),document.addEventListener("click",o=>{const r=document.getElementById("spQueuePanel");!r||r.hasAttribute("hidden")||!o.target.closest("#spQueuePanel")&&!o.target.closest("#spQueueBtn")&&r.setAttribute("hidden","")}))}function Ln(e){return String(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}let In=!1;function jp(){In||(In=!0,window.addEventListener("dbs:interrupt-music",e=>{var s;const t=((s=e==null?void 0:e.detail)==null?void 0:s.reason)||"user";qs(t)}))}function Kp(){Op(),Rp(),jp(),he(),Lo(),setTimeout(()=>Gt(),400)}function Fp(e){var i,a;const t=e==="/live",s=e==="/videos"||e==="/home"||e==="/music"||e==="/vault";!t&&J.has("live")&&ui("live");for(const[n,o]of[...Z.entries()])if(!document.getElementById(n)){o.playing&&(qe=Math.max(0,qe-1));try{(a=(i=o.player)==null?void 0:i.destroy)==null||a.call(i)}catch{}Z.delete(n)}qe===0&&!s&&J.has("video")&&ui("video"),he()}const Z=new Map;let qe=0,Pn=0;function ca(e){var s;if(!e||!(e instanceof Element))return!0;const t=e.id||"";return!!(t==="dbsStickyFrame"||t==="dbsYtHost"||(s=e.closest)!=null&&s.call(e,"#dbs-sticky-player, #stickyPlayer, #dbsStickyFrame, #dbsYtHost"))}function Va(e){return e?/youtube\.com\/embed|youtube-nocookie\.com\/embed|youtu\.be\//.test(e):!1}function Gp(e){let t=e.getAttribute("src")||e.src||"";if(!Va(t))return!1;let s=!1;return/[?&]enablejsapi=1(?:&|$)/.test(t)||(t+=(t.includes("?")?"&":"?")+"enablejsapi=1",s=!0),/[?&]origin=/.test(t)||(t+=(t.includes("?")?"&":"?")+"origin="+encodeURIComponent(location.origin),s=!0),s&&(e.setAttribute("src",t),e.src=t),!0}function Vp(e){if(e.id&&!Z.has(e.id)&&e.id!=="dbsStickyFrame"&&e.id!=="dbsYtHost"||e.id&&Z.has(e.id))return e.id;Pn+=1;const t=`dbs-page-yt-${Pn}`;return e.id=t,t}function Up(e,t){var i,a,n;const s=Z.get(e);if(s){if(clearTimeout(Tn.get(e)),t.data===1){const o=(n=(a=(i=t.target)==null?void 0:i.getVideoData)==null?void 0:a.call(i))==null?void 0:n.video_id;o&&Tn.set(e,setTimeout(()=>{var r,c;(r=Z.get(e))!=null&&r.playing&&(Ga(o,{kind:"video",seconds:3,source:(c=document.querySelector(`#${CSS.escape(e)}`))!=null&&c.closest("[data-promoted]")?"promote":"organic"}),Co(document))},3e3))}t.data===1?(s.playing||(s.playing=!0,qe+=1),Vt()):(t.data===0||t.data===2)&&(s.playing&&(s.playing=!1,qe=Math.max(0,qe-1)),qe===0&&Ze())}}function qo(e){var n,o;const t=typeof e=="string"?document.getElementById(e):e;if(!t||ca(t))return Promise.resolve(null);let s=t;if(t.tagName!=="IFRAME"&&(s=((n=t.querySelector)==null?void 0:n.call(t,"iframe"))||t),!s||s.tagName!=="IFRAME"||ca(s))return Promise.resolve(null);const i=s.getAttribute("src")||s.src||"";if(!Va(i)||!Gp(s))return Promise.resolve(null);const a=Vp(s);return Z.has(a)&&((o=Z.get(a))!=null&&o.player)?Promise.resolve(Z.get(a).player):Mo().then(()=>new Promise(r=>{var m;if(Z.has(a)&&((m=Z.get(a))!=null&&m.player)){r(Z.get(a).player);return}const c=()=>{var h;if(!document.getElementById(a)){r(null);return}if(Z.has(a)&&((h=Z.get(a))!=null&&h.player)){r(Z.get(a).player);return}try{const f=new window.YT.Player(a,{events:{onReady:()=>{},onStateChange:v=>Up(a,v),onError:()=>{}}});Z.set(a,{player:f,el:s,playing:!1}),s.dataset.dbsYtBound="1",r(f)}catch(f){console.warn("[dbs] bindYoutubeInterrupt failed",a,f),r(null)}};if(s.dataset.dbsYtBound==="1"&&Z.has(a)){r(Z.get(a).player);return}let d=!1;const p=()=>{d||(d=!0,c())};s.addEventListener("load",p,{once:!0}),setTimeout(p,400)}))}function qi(e){const s=[...(e&&e.querySelectorAll?e:document).querySelectorAll("iframe")].filter(i=>{if(ca(i))return!1;const a=i.getAttribute("src")||i.src||"";return Va(a)});return Promise.all(s.map(i=>qo(i)))}function Hp(e){var a,n;const t=typeof e=="string"?document.getElementById(e):e,s=typeof e=="string"?e:t==null?void 0:t.id;if(!s||s==="dbsStickyFrame"||s==="dbsYtHost")return;const i=Z.get(s);if(i){i.playing&&(i.playing=!1,qe=Math.max(0,qe-1),qe===0&&Ze());try{(n=(a=i.player)==null?void 0:a.destroy)==null||n.call(a)}catch{}Z.delete(s)}}function Fs(e){if(!Number.isFinite(e)||e<=0)return"--:--";const t=Math.floor(e);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}let Hi=!1;function zp(){var a;const e=document.getElementById("spSeek"),t=document.getElementById("spTimeCur"),s=document.getElementById("spTimeDur"),i=document.getElementById("spVol");!e||!t||!s||(e.addEventListener("input",()=>{Hi=!0}),e.addEventListener("change",()=>{var o,r;const n=((o=L==null?void 0:L.getDuration)==null?void 0:o.call(L))||0;n>0&&((r=L.seekTo)==null||r.call(L,Number(e.value)/1e3*n,!0)),Hi=!1}),i==null||i.addEventListener("input",()=>{var n;return(n=L==null?void 0:L.setVolume)==null?void 0:n.call(L,Number(i.value))}),(a=document.getElementById("spCast"))==null||a.addEventListener("click",()=>g("Cast is not available yet")),setInterval(()=>{var r,c;const n=((r=L==null?void 0:L.getDuration)==null?void 0:r.call(L))||0,o=((c=L==null?void 0:L.getCurrentTime)==null?void 0:c.call(L))||0;n>0?(e.disabled=!1,Hi||(e.value=String(Math.round(o/n*1e3))),t.textContent=o>0?Fs(o):"0:00",s.textContent=Fs(n),e.setAttribute("aria-valuetext",`${Fs(o)} of ${Fs(n)}`),e.style.setProperty("--sp-pct",`${o/n*100}%`)):(e.disabled=!0,t.textContent="--:--",s.textContent="--:--")},500))}const mi=new Set;function Fe(){const e=(location.hash||"").replace(/^#/,"")||"/home";let t="",s=e;const i=e.indexOf("#");i>=0&&(t=e.slice(i+1).split("?")[0],s=e.slice(0,i));const a=s.startsWith("/")?s:"/"+s,n=a.indexOf("?"),o=n===-1?a:a.slice(0,n),r=n===-1?"":a.slice(n+1),c=o.split("/").filter(Boolean);return{path:"/"+(c[0]||"home"),parts:c,query:Object.fromEntries(new URLSearchParams(r)),elementId:t,raw:a}}function R(e){const s=(e.startsWith("#")?e:"#"+(e.startsWith("/")?e:"/"+e)).replace(/^#/,"");if((location.hash||"").replace(/^#/,"")===s){mi.forEach(a=>a(Fe()));return}location.hash=s}function Wp(e){return mi.add(e),()=>mi.delete(e)}function Yp(){const e=()=>mi.forEach(t=>t(Fe()));window.addEventListener("hashchange",e),location.hash?e():location.hash="/home"}const zi="/pikk-app/",qt=zi.endsWith("/")?zi.slice(0,-1):zi;function $t(e){if(e==null||e==="")return e;const t=String(e);return/^(https?:|data:|blob:|idb:|#|\/\/)/i.test(t)||qt&&(t===qt||t.startsWith(qt+"/"))?t:t.startsWith("/")?qt+t:(qt||"")+"/"+t}function No(e=document){qt&&(e.querySelectorAll("[src]").forEach(t=>{const s=t.getAttribute("src");if(!s)return;const i=$t(s);i!==s&&t.setAttribute("src",i)}),e.querySelectorAll("[srcset]").forEach(t=>{const s=t.getAttribute("srcset");if(!s||!s.includes("/"))return;const i=s.replace(/(^|,\s*)(\/(?!\/)[^\s,]+)/g,(a,n,o)=>n+$t(o));i!==s&&t.setAttribute("srcset",i)}),e.querySelectorAll("[data-zoom]").forEach(t=>{const s=t.getAttribute("data-zoom");if(!s)return;const i=$t(s);i!==s&&t.setAttribute("data-zoom",i)}),e.querySelectorAll("[poster]").forEach(t=>{const s=t.getAttribute("poster");if(!s)return;const i=$t(s);i!==s&&t.setAttribute("poster",i)}))}function Bo(e,t){e&&e.querySelectorAll("a[data-path]").forEach(s=>{const i=s.getAttribute("data-path")===t;s.classList.toggle("on",i),i?s.setAttribute("aria-current","page"):s.removeAttribute("aria-current")})}function Jp(e,t){var a,n,o;const s=(o=(n=(a=t==null?void 0:t.querySelector)==null?void 0:a.call(t,"h1"))==null?void 0:n.textContent)==null?void 0:o.replace(/\s+/g," ").trim();return s?s.slice(0,80):(String((e==null?void 0:e.path)||"/home").split("/").filter(Boolean).pop()||"home").replace(/[-_]+/g," ").replace(/\b\w/g,r=>r.toUpperCase())}function Qp(e,t,s,i=document){const a=Jp(e,t);return i.title=`${a} | PIKK`,s&&(s.textContent=`${a} page loaded`),a}function Xp({drawer:e,scrim:t,trigger:s},i,a=!1){var o;if(!e||!t||!s)return;const n=!!i;e.classList.toggle("open",n),e.setAttribute("aria-hidden",String(!n)),e.inert=!n,t.classList.toggle("show",n),s.setAttribute("aria-expanded",String(n)),s.setAttribute("aria-label",n?"Close navigation menu":"Open navigation menu"),n?(o=e.querySelector("button, a[href]"))==null||o.focus():a&&s.focus()}const Zp="dbs_media_v1",Ut="blobs",eu=1;function Ro(){return new Promise((e,t)=>{const s=indexedDB.open(Zp,eu);s.onupgradeneeded=()=>{const i=s.result;i.objectStoreNames.contains(Ut)||i.createObjectStore(Ut,{keyPath:"id"})},s.onsuccess=()=>e(s.result),s.onerror=()=>t(s.error||new Error("idb open failed"))})}async function tu(e,t,s={}){const i=await Ro();return new Promise((a,n)=>{const o=i.transaction(Ut,"readwrite");o.objectStore(Ut).put({id:e,blob:t,mime:t.type||s.mime||"application/octet-stream",name:s.name||"",size:t.size||0,at:Date.now()}),o.oncomplete=()=>a(e),o.onerror=()=>n(o.error)})}async function su(e){const t=await Ro();return new Promise((s,i)=>{const n=t.transaction(Ut,"readonly").objectStore(Ut).get(e);n.onsuccess=()=>s(n.result||null),n.onerror=()=>i(n.error)})}const Wi=new Map;async function Ni(e){if(!e)return"";if(e.startsWith("idb:")){const t=e.slice(4);if(Wi.has(t))return Wi.get(t);const s=await su(t);if(!(s!=null&&s.blob))return"";const i=URL.createObjectURL(s.blob);return Wi.set(t,i),i}return e}function iu(e="blob"){return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function Yi(e,t){return`<article class="pikk-ad-slot pikk-ad-${e.tier}" data-promo-tier="${e.tier}" aria-label="${e.name} slot ${t}, pricing preview">
    <span class="pikk-ad-slot-top"><span class="pikk-ad-slot-icon" aria-hidden="true">▶</span><span class="pikk-ad-slot-number">0${t}</span></span>
    <strong>${e.name}</strong>
    <span class="pikk-ad-slot-description">Available placement · booking coming soon</span>
    <span class="pikk-ad-slot-prices"><b>$${e.day}</b><small>/ 24 hours</small></span>
    <span class="pikk-ad-slot-week">$${e.week} / 7 days</span>
  </article>`}function jo(){return`<section class="pikk-featured-inventory" aria-label="Featured on PIKK sponsored placement pricing">
      <div class="pikk-featured-heading"><div><p class="kicker">Creator &amp; brand visibility</p><h2>Featured on PIKK</h2></div><span class="pikk-featured-sponsored">Sponsored placements</span></div>
      <p class="pikk-featured-intro">Six premium advertising positions on each page. Preview pricing below; booking and checkout are not active yet.</p>
      <div class="pikk-featured-rows">
        <div class="pikk-featured-row pikk-featured-row-hero">${Yi(Xs[0],1)}</div>
        <div class="pikk-featured-row pikk-featured-row-two">${[1,2].map(e=>Yi(Xs[1],e)).join("")}</div>
        <div class="pikk-featured-row pikk-featured-row-three">${[1,2,3].map(e=>Yi(Xs[2],e)).join("")}</div>
      </div>
      <p class="pikk-featured-footnote">Home and Videos placements are priced separately. Rates are introductory proposals; no paid placement or guaranteed views are currently offered.</p>
    </section>`}function Ko(e){const t=e==="videos"?"videos":"home";return`<div class="pikk-stories-promotions" data-featured-context="${t}">
    <section class="pikk-stories-strip" aria-label="PIKK Stories preview">
      <div class="pikk-featured-heading"><div><p class="kicker">Connect in 24 hours</p><h2>PIKK Stories</h2></div><span class="pikk-featured-state">Coming soon</span></div>
      <div class="pikk-stories-preview">
        <div class="pikk-story-preview"><span class="pikk-story-ring"><span aria-hidden="true">＋</span></span><strong>Your Story</strong></div>
        <p>Share moments with your followers. Stories will disappear after 24 hours once publishing launches.</p>
      </div>
    </section>
    ${t==="home"?"":jo()}
  </div>`}const au=e=>(String(e||"").match(/(?:v=|embed\/|youtu\.be\/)([\w-]{6,})/)||[])[1]||"",On=e=>{const t=au(e);return t?`https://i.ytimg.com/vi/${t}/hqdefault.jpg`:""},Ot=(e,t="")=>e?`<img src="${l(e)}" alt="${l(t)}" loading="lazy" decoding="async"/>`:'<span class="hs-ph" aria-hidden="true">◆</span>',ze=(e,t,s,i,a,n="")=>`
  <section class="pikk-hs" id="hs-${e}" data-hs="${e}" aria-labelledby="hs-${e}-h">
    <div class="pikk-hs-head"><div><p class="kicker">${l(i)}</p><h2 id="hs-${e}-h">${l(t)}</h2></div><a class="pikk-hs-all" href="${s}" data-see-all>See all →</a></div>
    <div class="pikk-hs-row" role="list">${a}</div>${n?`<p class="pikk-hs-note">${l(n)}</p>`:""}
  </section>`,Te=(e,t,s,i,a="",n="")=>`<a class="pikk-hs-card ${a}" role="listitem" href="${e}"><span class="pikk-hs-media">${t}${n?`<span class="pikk-hs-badge">${l(n)}</span>`:""}</span><strong>${l(s)}</strong>${i?`<small>${l(i)}</small>`:""}</a>`,nu=["music","posts","videos","live","connect","dating","games","battles","shop"],We=Object.freeze({music:"#/music",posts:"#/posts",videos:"#/videos",live:"#/live",connect:"#/connect",dating:"#/dating",games:"#/games",battles:"#/giftbattles",shop:"#/shop"});function ru(){const e=Qe.map(h=>Te("#/music",Ot(h.cover,h.title),h.title,`${h.artist} · ${h.type==="album"?"Album":"Single"}${h.year?" · "+h.year:""}`,"is-square",h.type==="album"?"Album":"Track")).join(""),s=le.filter(h=>h.category==="Music Videos").slice(0,6).map((h,f)=>Te(f%3===1?"#/shorts":"#/posts",Ot(On(h.youtube),h.title),h.title,f%3===0?"Picture · house":f%3===1?"Short · house":"Video · house",f%3===1?"is-tall":"is-square",f%3===0?"Photo":f%3===1?"Short":"Video")).join(""),i=le.slice(0,8).map(h=>Te("#/videos",Ot(On(h.youtube),h.title),h.title,`${h.artist||"DatBoiSkeet"} · PIKK Official`,"is-wide")).join(""),a=[["#/live","Live Rooms","Directory preview · TEST MODE"],["#/live?go=1","Go Live","Start a stream · TEST MODE"],["#/viral-live","24/7 Viral Live","Rotating clips · preview"]].map(([h,f,v])=>Te(h,'<span class="hs-ph hs-live" aria-hidden="true">●</span>',f,v,"is-chip")).join(""),n=[["#/explore","People","Discover creators"],["#/communities","Communities","Topics & votes · TEST MODE"],["#/community","PIKK Lounge","Channel rooms"],["#/live","Live connections","Rooms · TEST MODE"],["#/messages","Messages","Your inbox"]].map(([h,f,v])=>Te(h,'<span class="hs-ph" aria-hidden="true">◎</span>',f,v,"is-chip")).join(""),o=Te("#/dating",'<span class="hs-ph hs-18" aria-hidden="true">18+</span>',"PIKK Dating · pre-launch","Adults only · age & ID verification and safety review before launch. No profiles shown.","is-wide is-teaser"),c=Te("#/blockwars",Ot("/blockwars-preview/01-title.jpg","Block Wars"),"Block Wars","Coming Soon · gameplay paused","is-wide","Coming Soon")+Ft.filter(h=>h.name!=="Block Wars").map(h=>Te("#/games",Ot(ys(h),h.name),h.name,"Coming Soon · concept art","is-square","Coming Soon")).join(""),d=[["#/giftbattles","Live Battles","Battle area · preview"],["#/roast-arena","Roast Arena","Matchups · preview"]].map(([h,f,v])=>Te(h,'<span class="hs-ph" aria-hidden="true">⚔</span>',f,v,"is-chip")).join(""),p=Ae.slice(0,8).map(h=>Te("#/shop",Ot(h.image,h.name),h.name,`$${h.price} · Foreign X-Change`,"is-square")).join("")+Te("#/shop",'<span class="hs-ph" aria-hidden="true">⌂</span>',"Foreign X-Change store","Official merch store · checkout on merchant site","is-chip"),m={music:ze("music","Music",We.music,"Tracks & albums",e),posts:ze("posts","Posts",We.posts,"Pictures · shorts · videos",s,"House samples from official releases."),videos:ze("videos","Videos",We.videos,"Long-form",i),live:ze("live","Live",We.live,"Live now & go live",a,"Live streaming is TEST MODE; no viewer counts are shown."),connect:ze("connect","Connect",We.connect,"People · communities · live",n),dating:ze("dating","Dating",We.dating,"18+ · safety-gated",o),games:ze("games","Games",We.games,"PIKK Arcade · all games",c,"Concept previews · games are not playable yet."),battles:ze("battles","Battles & Roast",We.battles,"Head-to-head",d),shop:ze("shop","Shop",We.shop,"Featured products & stores",p)};return`<div class="pikk-home-showcase" id="pikkHomeShowcase">${nu.map(h=>m[h]).join("")}</div>`}const ou={Explore:"🧭","Shorts / Clips":"▶",Music:"🎵",Videos:"🎬",Posts:"📸",Live:"🔴","PIKK Lounge":"💬",Vault:"🔐",Marketplace:"🛍️",Missions:"🎯"},hi=[{id:"toplive",label:"Top live"},{id:"videos",label:"Videos"},{id:"rising",label:"Rising"},{id:"hot",label:"Hot lives"},{id:"songs",label:"Songs"}],lu=8e3,Ua="dbs_home_stage_v2",cu=["dbs_home_stage"];function Ha(e){const t=Number(e)||0;return t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)}k`:String(t)}function Gs(e){return e?!!(e.house||e.hostId==="dbs"||e.hostName==="DatBoiSkeet"):!1}function _n(e){return e?!!(e.house||e.userId==="dbs"||e.username==="DatBoiSkeet"):!1}function du(e=3){const t=ts(),s=t.filter(n=>!Gs(n)),i=t.filter(n=>Gs(n)),a=s.slice(0,Math.max(2,e-1));for(i[0]&&a.push(i[0]);a.length<e&&s[a.filter(n=>!Gs(n)).length];){const n=s[a.filter(o=>!Gs(o)).length];if(!n||a.includes(n))break;a.push(n)}return a.slice(0,e)}function pu(e=4){const t=vo(Math.max(8,e+4)),s=t.filter(n=>!_n(n)),i=t.filter(n=>_n(n)),a=[...s.slice(0,3)];i[0]&&a.push(i[0]);for(const n of s.slice(3)){if(a.length>=e)break;a.includes(n)||a.push(n)}for(const n of i.slice(1)){if(a.length>=e)break;a.includes(n)||a.push(n)}return a.slice(0,e)}function Fo(){const e=M().live,t=ts().map(s=>({...s}));if(e&&!e.endedAt){const s=Math.max(0,Number(e.viewers)||0),i=Math.max(0,Number(e.giftsTotal)||0);t.push({id:e.id||"session",hostId:e.hostId,hostName:e.hostName||"Creator",title:e.title||"Live now",viewers:s,giftsTotal:i,score:s+i*20,house:e.hostId==="dbs"||e.hostName==="DatBoiSkeet"})}return t.sort((s,i)=>(Number(i.viewers)||0)-(Number(s.viewers)||0)||(Number(i.score)||0)-(Number(s.score)||0)),t[0]||null}function ei(e,{rising:t=!1}={}){const s=e.house?"House":t?"Rising":"Hot",i=Number(e.viewers)||0,a=Ha(i),n=t&&e.playbacksToday!=null?` · ~${l(String(e.playbacksToday))} playbacks today`:"";return`
    <a class="home-live-card" href="#/live">
      <div class="live-hoodie" aria-hidden="false">
        <span class="live-hoodie-pill">LIVE</span>
        <span class="live-hoodie-viewers" title="${l(a)} watching">${l(a)}</span>
      </div>
      <div class="home-live-top">
        <span class="home-live-dot" aria-hidden="true"></span>
        <strong>@${l(e.hostName)}</strong>
        <span class="chip home-live-chip">${l(s)}</span>
      </div>
      <div class="home-live-title">${l(e.title||"Live now")}</div>
      <div class="home-live-stats muted">
        ${l(a)} watching · ${l(String(e.giftsTotal||0))} gifts
        ${n}
      </div>
      <div class="home-live-score muted">Score ${l(String(e.score||0))} · TEST MODE seed</div>
    </a>`}function uu(e){return e.mediaType==="video"?"Video":e.image||e.mediaType==="image"?"Pic":"Post"}function mu(e){if(!e)return"";const t=Number(e.playsToday)||0,s=t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)}k`:String(t),i=e.cover?`<img class="la-thumb" src="${l(e.cover)}" alt="" loading="lazy" />`:'<span class="la-thumb la-thumb-empty" aria-hidden="true">♪</span>',a=e.demo?" · DEMO seed":"";return`
    <li class="la-row la-song">
      <a class="la-main" href="#/music">
        ${i}
        <span class="la-body">
          <strong>${l(e.title||"Track")}</strong>
          <span class="la-preview">${l(e.artist||"DatBoiSkeet")} · ${l(s)} plays today${l(a)}</span>
          <span class="la-stats muted">${l(e.status||"Music")} · ${l(e.day||"today")}</span>
        </span>
      </a>
      <span class="chip la-chip-played">Most played · today</span>
    </li>`}function hu(e){const t=Number(e.viewers)||0,s=Ha(t),i=e.house?"House":"Hot";return`
    <li class="la-row la-live">
      <a class="la-main" href="#/live">
        <span class="la-hoodie" aria-label="Live · ${l(s)} watching">
          <span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span>
          <span class="live-hoodie-viewers">${l(s)}</span>
        </span>
        <span class="la-body">
          <strong>@${l(e.hostName)}</strong>
          <span class="la-preview">${l(e.title||"Live now")}</span>
          <span class="la-stats muted">${l(s)} watching · ${l(String(e.giftsTotal||0))} gifts · score ${l(String(e.score||0))}</span>
        </span>
      </a>
      <span class="chip">${l(i)}</span>
    </li>`}function gu(e){const t=e.postId||e.id,s=uu(e),i=e.image?`<img class="la-thumb" src="${l(e.image)}" alt="" loading="lazy" />`:`<span class="la-thumb la-thumb-empty" aria-hidden="true">${l(((e.username||"?")[0]||"?").toUpperCase())}</span>`,a=e.house?" · house":"";return`
    <li class="la-row la-post">
      <a class="la-main" href="#/posts?focus=${l(t)}">
        ${i}
        <span class="la-body">
          <strong>@${l(e.username||"creator")}</strong>
          <span class="la-preview">${l((e.preview||e.text||"Hot post").slice(0,72))}</span>
          <span class="la-stats muted">♥ ${l(String(e.likes||0))} · 💬 ${l(String(e.comments||0))} · ↗ ${l(String(e.shares||0))} · score ${l(String(e.score||0))}${l(a)}</span>
        </span>
      </a>
      <span class="chip">${l(s)}</span>
    </li>`}function fu(e){const t=e.coverRef&&!String(e.coverRef).startsWith("idb:")?e.coverRef:"";return`
    <li class="la-row la-pic">
      <a class="la-main" href="#/posts">
        ${t?`<img class="la-thumb" src="${l(t)}" alt="" loading="lazy" />`:'<span class="la-thumb la-thumb-empty" aria-hidden="true">📷</span>'}
        <span class="la-body">
          <strong>${l(e.title||"Picture")}</strong>
          <span class="la-preview">${l(e.artist||"DatBoiSkeet")} · from Admin catalog</span>
          <span class="la-stats muted">High-engagement pic · TEST MODE</span>
        </span>
      </a>
      <span class="chip">Pic</span>
    </li>`}function vu(){for(const e of cu){try{sessionStorage.removeItem(e)}catch{}try{localStorage.removeItem(e)}catch{}}try{localStorage.removeItem(Ua)}catch{}}function Go(){vu();try{const e=sessionStorage.getItem(Ua);if(hi.some(t=>t.id===e))return e}catch{}return"toplive"}function bu(e){try{sessionStorage.setItem(Ua,e)}catch{}}function gi(e){return"$"+Number(e||0).toLocaleString(void 0,{maximumFractionDigits:2})}function yu(e){const t=Math.max(0,e-Date.now()),s=Math.floor(t/36e5),i=Math.floor(t%36e5/6e4);return t<=0?"Ended":`${s}h ${i}m left`}function ku(e){const t=e?Math.min(100,Math.round(e.raised/(e.targetAmount||1)*100)):0;return`<a class="home-goal-slim" id="home-app-goal" href="#/donate" aria-label="PIKK daily goal ${t}% funded. Open Donate">
    <span class="home-goal-slim-label"><strong>PIKK goal</strong><small>${e?`${gi(e.raised)} of ${gi(e.targetAmount)} · TEST MODE`:"No goal today"}</small></span>
    <span class="home-goal-slim-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${t}"><span style="width:${t}%"></span></span>
    <span class="btn primary home-goal-slim-btn">Donate</span>
  </a>`}function Vo(e){if(!e)return'<p class="muted" style="margin:0">No daily app goal right now.</p>';const t=Math.min(100,Math.round(e.raised/(e.targetAmount||1)*100));return`
    <div class="home-goal-head"><strong class="home-goal-name">${l(e.name)}</strong>
      <span class="chip home-goal-time" id="homeGoalTimeLeft">${yu(e.endsAt)}</span></div>
    <div class="home-goal-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${t}">
      <div class="home-goal-fill" style="width:${t}%"></div></div>
    <p class="muted home-goal-amounts" style="margin:6px 0 10px">${gi(e.raised)} raised of ${gi(e.targetAmount)} · ${t}%</p>
    <div class="row wrap" style="gap:8px">
      ${[50,100,250].map(s=>`<button type="button" class="btn ghost home-goal-donate" data-goal-id="${l(e.id)}" data-coins="${s}">Donate ${s} coins</button>`).join("")}
      <form class="home-goal-custom-form" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;align-items:end">
        <label style="flex:1;min-width:125px">Custom coins
          <input class="home-goal-custom-coins" type="number" inputmode="numeric" min="1" max="1000000" step="1" required placeholder="Enter coins" style="width:100%" />
        </label>
        <button type="submit" class="btn primary">Donate custom</button>
      </form>
    </div>`}function wu(){var ss;const e=kl.map(y=>`
    <a class="preview-card" href="#${y.route}${y.hash?"#"+y.hash:""}">
      <span class="pc-icon" aria-hidden="true">${ou[y.title]||"◆"}</span>
      <strong>${l(y.title)}</strong>
      <span class="muted">${l(y.blurb)}</span>
    </a>`).join(""),t=Bt.map(y=>`
    <a class="cover-card" href="#/music">
      <div class="cover-frame">
        <span class="badge-cs">${l(y.status)}</span>
        <img src="${l(y.cover)}" alt="${l(y.title)}" loading="lazy" />
      </div>
      <div class="t">${l(y.title)}</div>
      <div class="sub">${l(y.artist)}</div>
    </a>`).join(""),s=le.filter(y=>(y.category||"Music Videos")==="Music Videos"),i=s.filter(y=>y.featured),a=i.length?i:s.slice(0,6),n=a[0]||s[0]||le[0],o=ba[0],r=a.map(y=>`
    <div class="vid">
      <a class="thumb" href="${l(y.youtube)}" target="_blank" rel="noopener" aria-label="Play ${l(y.title)}"><span>▶</span></a>
      <div>
        <strong>${l(y.title)}</strong>
        <div class="muted" style="font-size:12px;margin-top:4px">
          <a href="${l(y.youtube)}" target="_blank" rel="noopener">Watch on YouTube</a>
          · <a href="#/videos">Embed on Videos</a>
        </div>
      </div>
    </div>`).join(""),c=a.map((y,j)=>`
    <button type="button" class="mv-pick${j===0?" on":""}" data-embed="${l(y.embed)}" data-title="${l(y.title)}" data-yt="${l(y.youtube)}">
      <span class="mv-pick-play" aria-hidden="true">▶</span>
      <span class="mv-pick-t">${l(y.title)}</span>
    </button>`).join(""),d=o?`<div class="card home-mix" id="home-dbs-mix">
        <h3>DatBoiSkeet Mix</h3>
        <p class="muted" style="margin:0 0 10px">Stream from the original YouTube Mix playlist — not rehosted.</p>
        <div class="hero-video" style="margin:0 0 10px">
          <iframe src="${l(Xe(o.embed))}" title="${l(o.title)}" allowfullscreen loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
        </div>
        <div class="row wrap" style="gap:8px">
          <a class="btn" href="${l(o.youtube)}" target="_blank" rel="noopener">Play on YouTube</a>
          <a class="btn ghost" href="#/music#youtube-mixes">Music · Mixes</a>
          <a class="btn ghost" href="#/videos">All videos</a>
        </div>
      </div>`:"",m=Et({publishedOnly:!0,types:["picture"]}).map(y=>`
    <div class="cover-card catalog-admin-home" data-id="${l(y.id)}">
      <div class="cover-frame">
        <span class="badge-cs">From Admin</span>
        <img data-idb-src="${l(y.coverRef&&y.coverRef.startsWith("idb:")?y.coverRef:"")}" src="${l(y.coverRef&&!y.coverRef.startsWith("idb:")?y.coverRef:"")}" alt="${l(y.title)}" loading="lazy" />
      </div>
      <div class="t">${l(y.title)}</div>
      <div class="sub">${l(y.artist)}</div>
    </div>`).join(""),f=Et({publishedOnly:!0,types:["video"]}).slice(0,3).map(y=>`
    <div class="vid catalog-admin-home" data-id="${l(y.id)}">
      <a class="thumb" href="${l(y.youtube||"#/videos")}" ${y.youtube?'target="_blank" rel="noopener"':""}><span>▶</span></a>
      <div>
        <strong>${l(y.title)}</strong>
        <div class="muted" style="font-size:12px;margin-top:4px">${l(y.artist)} · Admin</div>
      </div>
    </div>`).join(""),v=M().live,k=v&&!v.endedAt?`<li class="la-row la-session"><a class="la-main" href="#/live"><span class="la-hoodie" aria-label="Live now"><span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span><span class="live-hoodie-viewers">${l(Ha(v.viewers||0))}</span></span><span class="la-body"><strong>@${l(v.hostName)}</strong><span class="la-preview">${l(v.title||"Live now")}</span><span class="la-stats muted">${l(String(v.viewers||0))} watching · your session</span></span></a><span class="chip">Live</span></li>`:"",b=ko(),S=mu(b),$=du(3),A=pu(4),w=Et({publishedOnly:!0,types:["picture"]}).slice(0,2),P=$.map(hu).join(""),C=A.map(gu).join(""),B=w.map(fu).join(""),D=`${S}${k}${P}${C}${B}
        <li class="la-row la-kicker"><span class="la-main la-kicker-main"><span class="la-body"><strong>Ladies Only</strong><span class="la-preview">Art live on Music · playback when it drops</span></span></span><span class="chip">Music</span></li>
        <li class="la-row la-kicker"><a class="la-main" href="#/restream"><span class="la-body"><strong>PIKK Restream</strong><span class="la-preview">Stream to YouTube, TikTok, Twitch &amp; more — free inside PIKK</span></span></a><span class="chip">Restream</span></li>${!S&&!P&&!C&&!B&&!k?'<li class="la-row"><span class="la-main la-kicker-main"><span class="la-body"><span class="la-preview muted">No hot activity yet — engage on Posts / go Live to spike the feed.</span></span></span><span class="chip">TEST</span></li>':""}`,_=Go(),G=hi.map(y=>`
    <button type="button" class="home-stage-tab${y.id===_?" on":""}" role="tab"
      aria-selected="${y.id===_?"true":"false"}" data-stage="${y.id}" id="stage-tab-${y.id}">
      ${l(y.label)}
    </button>`).join(""),T=ts().slice(0,5),O=Mp().slice(0,5),N=T.map(y=>ei(y)).join("")||'<p class="muted">No hot lives yet — seed from Live / Hot Feed.</p>',V=O.map(y=>ei(y,{rising:!0})).join("")||'<p class="muted">No rising streamers yet.</p>',ce=Bt.map(y=>`
    <a class="home-song-card" href="#/music">
      <img src="${l(y.cover)}" alt="" loading="lazy" />
      <div>
        <strong>${l(y.title)}</strong>
        <div class="muted" style="font-size:12px">${l(y.artist)} · ${l(y.status)}</div>
        <span class="chip" style="margin-top:6px">Enhancement · Coming Soon</span>
      </div>
    </a>`).join(""),de=Fo(),U=de?ei(de):'<p class="muted">No live streams right now — go Live or check Hot Feed.</p>',Se=`
    <div class="home-stage-panel${_==="toplive"?" on":""}" data-panel="toplive" role="tabpanel" id="homeTopLivePanel" ${_==="toplive"?"":"hidden"}>
      <p class="muted home-stage-lead">Top live · highest viewers right now. Red LIVE hoodie on the card · updates as rankings change.</p>
      <div class="home-live-grid" id="homeTopLiveGrid">${U}</div>
      <a class="btn ghost block" href="#/live" style="margin-top:10px">Open Live</a>
    </div>`,Ge=`
    <div class="home-stage-panel${_==="videos"?" on":""}" data-panel="videos" role="tabpanel" ${_==="videos"?"":"hidden"}>
      <div class="hero-video" id="homeFeaturedVideo">
        <iframe
          id="homeFeaturedIframe"
          src="${l(Xe(n.embed))}"
          title="${l(n.title)}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          loading="lazy"></iframe>
      </div>
      <div class="hero-caption">
        <strong id="homeFeaturedTitle">${l(n.title)}</strong>
        <a href="#/videos">All videos →</a>
      </div>
      <div class="mv-carousel" role="tablist" aria-label="Official music videos">${c}</div>
    </div>`,Ve=`
    <div class="home-stage-panel${_==="rising"?" on":""}" data-panel="rising" role="tabpanel" ${_==="rising"?"":"hidden"}>
      <p class="muted home-stage-lead">Rising streamers · mid-tier creators from §38 Hot Feed signals (non-house). TEST MODE seeds.</p>
      <div class="home-live-grid">${V}</div>
      <a class="btn ghost block" href="#/live" style="margin-top:10px">Open Live</a>
    </div>`,Ue=`
    <div class="home-stage-panel${_==="hot"?" on":""}" data-panel="hot" role="tabpanel" ${_==="hot"?"":"hidden"}>
      <p class="muted home-stage-lead">Hot lives · ranked by viewers + gifts score (house OK). Strong playbacks / spikes from earlier today count.</p>
      <div class="home-live-grid">${N}</div>
      <a class="btn ghost block" href="#/live" style="margin-top:10px">Open Live</a>
    </div>`,ut=`
    <div class="home-stage-panel${_==="songs"?" on":""}" data-panel="songs" role="tabpanel" ${_==="songs"?"":"hidden"}>
      <p class="muted home-stage-lead">Enhancements &amp; songs · Coming Soon covers + featured tracks. Upload &amp; sell on Music when Commerce lands.</p>
      <div class="home-song-grid">${ce}
        <a class="home-song-card home-song-promo" href="#/pricing?focus=sell">
          <div class="home-song-promo-icon" aria-hidden="true">♪</div>
          <div>
            <strong>Sell your music on PIKK</strong>
            <div class="muted" style="font-size:12px">Artists &amp; producers · creator-friendly · DEMO</div>
          </div>
        </a>
      </div>
      <div class="row wrap" style="gap:8px;margin-top:10px">
        <a class="btn ghost" href="#/music">Music</a>
        <a class="btn ghost" href="#/pricing?focus=sell">Start selling</a>
      </div>
    </div>`,mt=`
    <div class="home-stage card" id="homeFeaturedStage" data-active="${l(_)}">
      <div class="home-stage-head">
        <div>
          <p class="kicker" style="margin:0">Featured stage</p>
          <h2 class="home-stage-title">Top live · Videos · Rising · Hot · Songs</h2>
        </div>
        <span class="chip chip-audit">TEST MODE · auto-cycle</span>
      </div>
      <div class="home-stage-tabs" role="tablist" aria-label="Featured stage">${G}</div>
      <div class="home-stage-panels">
        ${Se}
        ${Ge}
        ${Ve}
        ${Ue}
        ${ut}
      </div>
    </div>`,ht=`
    <div class="card bw-preview" id="home-blockwars-preview">
      <div class="bw-preview-head">
        <div>
          <p class="kicker" style="margin:0">Games · Coming soon</p>
          <h3 class="bw-preview-title">Block Wars</h3>
        </div>
        <span class="chip bw-preview-chip">Preview · not live</span>
      </div>
      <p class="muted bw-preview-lead">NY · LA · Chicago fighters — teaser only. Gameplay ships later.</p>
      <div class="bw-preview-frame">
        <video
          id="bwPreviewVideo"
          class="bw-preview-video"
          poster="/blockwars-preview/frames/01.jpg"
          src="/blockwars-preview/blockwars-fighters-preview.mp4"
          playsinline
          webkit-playsinline
          preload="metadata"
          controls
          controlslist="nodownload noplaybackrate"
          aria-label="Block Wars fighter preview"></video>
        <button type="button" class="bw-preview-play" id="bwPreviewPlay" aria-label="Play Block Wars preview">
          <span class="bw-preview-play-icon" aria-hidden="true">▶</span>
          <span class="bw-preview-play-label">Watch preview</span>
        </button>
      </div>
      <div class="bw-preview-foot muted">~12s fighter slideshow · Coming soon on PIKK</div>
    </div>`,gt=`
    <div class="card home-sell-promo" id="home-creator-sell-promo">
      <p class="kicker">Creators · sell on PIKK</p>
      <div class="home-sell-title-row">
        <h3 style="margin:0">Upload music, videos, beats &amp; list merch</h3>
        <span class="badge-cs badge-cs-inline" id="home-sell-coming-soon">Coming Soon</span>
      </div>
      <p style="margin:0 0 8px">Artists and producers can sell <strong>music, videos, beats,</strong> and merch on PIKK. We keep a fair, creator-friendly cut — and merch runs on <strong>your</strong> payments (PIKK is not the merchant of record).</p>
      <p class="muted" style="margin:0 0 12px;font-size:12px">Rules, fees, and the apply form live on Pricing — tap below. No fee numbers on Home.</p>
      <div class="row wrap" style="gap:8px;margin-top:4px">
        <a class="btn primary" href="#/pricing?focus=sell">Start selling · rules &amp; fees</a>
        <a class="btn ghost" href="#/music">Music</a>
        <a class="btn ghost" href="#/videos">Videos</a>
        <a class="btn ghost" href="#/music">Beats</a>
        <a class="btn ghost" href="#/merch">Merch</a>
      </div>
      <p class="chip" style="margin-top:10px">TEST MODE · no payment processing</p>
    </div>`,ft=ku(ri()),X=a.slice(0,6).map((y,j)=>{const sn=new URL(y.youtube).searchParams.get("v")||"",an=sn?`https://i.ytimg.com/vi/${encodeURIComponent(sn)}/hqdefault.jpg`:"";return`<a class="pikk-home-media-card ${j<2?"is-featured":""}" href="${l(y.youtube)}" target="_blank" rel="noopener noreferrer"
       aria-label="Watch ${l(y.title)} on YouTube">
       ${an?`<img src="${l(an)}" alt="" loading="${j<2?"eager":"lazy"}" decoding="async" referrerpolicy="no-referrer"/>`:'<span class="pikk-home-media-fallback" aria-hidden="true">♫</span>'}
       <span class="pikk-home-media-shadow"></span>
       <span class="pikk-home-media-badge">▶ OFFICIAL VIDEO</span>
       <span class="pikk-home-media-title">${l(y.title)}</span>
     </a>`}).join(""),be=[...Qe.map(y=>y.cover),...Bt.slice(0,4).map(y=>y.cover)].filter(Boolean),Ns=[{label:"For You",href:"#/explore"},{label:"Following",href:"#/posts"},{label:"Music",href:"#/music"},{label:"Nearby",href:"#/connect"},{label:"Live",href:"#/live"}].map((y,j)=>`
    <a class="pikk-home-circle" href="${y.href}" aria-label="Open ${l(y.label)}">
      <span class="pikk-home-circle-ring">${be[j]?`<img src="${l(be[j])}" alt="" loading="lazy" decoding="async"/>`:'<span aria-hidden="true">●</span>'}</span>
      <small class="pikk-rail-tag">${l(Tl(y))}</small>
      <span>${l(y.label)}</span>
    </a>`).join(""),Bs=`
    <section class="pikk-home-visual" id="pikkHomeVisual" aria-labelledby="pikkHomeVisualTitle">
      <div class="pikk-home-visual-top">
        <div><p class="kicker">PIKK DISCOVER</p><h2 id="pikkHomeVisualTitle">Your music. Your world.</h2></div>
        <a href="#/explore" class="pikk-home-visual-more">Explore ↗</a>
      </div>
      <nav class="pikk-home-circle-strip" aria-label="Browse PIKK features">
        <a class="pikk-home-circle pikk-home-circle-me" href="#/posts?compose=1" aria-label="Create a post on PIKK">
          <span class="pikk-home-circle-ring">${(ss=M().user)!=null&&ss.avatar?`<img src="${l(M().user.avatar)}" alt="" loading="lazy" decoding="async"/>`:'<span class="pikk-home-circle-avatar" aria-hidden="true"><svg viewBox="0 0 24 24" width="40" height="40"><circle cx="12" cy="8.5" r="4" fill="currentColor"/><path d="M4 21c1.4-4.2 4.6-6.3 8-6.3s6.6 2.1 8 6.3" fill="currentColor"/></svg></span>'}</span>
          <span class="pikk-home-circle-plus" aria-hidden="true">+</span><span>Create</span>
        </a>
        ${Ns}
      </nav>
      <nav class="pikk-home-filterbar" aria-label="Discover categories">
        <a class="is-current" href="#/explore">All</a>
        <a href="#/videos">Videos</a>
        <a href="#/music">Music</a>
        <a href="#/posts">Photos</a>
        <a href="#/live">Live</a>
        <a href="#/shop">Shop</a>
        <a href="#/dating">Dating</a>
        <a class="pikk-home-promote" href="#/promote">Promote</a>
      </nav>
      <div class="pikk-home-media-grid" aria-label="Official DatBoiSkeet video selections">
        ${X}
      </div>
      <div class="pikk-home-media-footer">
        <p class="muted">Real official releases · Video thumbnails from YouTube · No fabricated views or live counts</p>
        <a href="#/videos">View all videos →</a>
      </div>
    </section>`,Rs=`
    ${ft}
    ${Bs}
    ${ru()}
    <section class="pikk-home-discover" aria-label="PIKK quick discovery">
      <div class="pikk-home-discover-heading">
        <div><p class="kicker">Your world on PIKK</p><h2>Discover what’s happening</h2></div>
        <a href="#/explore" class="pikk-home-explore-cta" aria-label="Open Explore search">⌕ Explore all</a>
      </div>
      <nav class="pikk-home-discover-links" aria-label="Explore PIKK categories">
        <a href="#/live"><span aria-hidden="true">●</span> Live</a>
        <a href="#/videos"><span aria-hidden="true">▶</span> Videos</a>
        <a href="#/music"><span aria-hidden="true">♫</span> Music</a>
        <a href="#/posts"><span aria-hidden="true">▧</span> Posts</a>
        <a href="#/community"><span aria-hidden="true">♧</span> Community</a>
        <a href="#/games"><span aria-hidden="true">♜</span> Arcade</a>
      </nav>
    </section>


    ${mt}

    ${Ko("home")}

    ${ht}

    <section class="home-arcade card" id="homeArcade" aria-label="PIKK Games featured slideshow">
      <div class="home-arcade-top">
        <div><p class="kicker">Discover the arcade</p><h2>15 GAMES. ONE PIKK.</h2></div>
        <a href="#/games" class="btn ghost">All games →</a>
      </div>
      <div class="home-arcade-stage" aria-live="off">
        ${Ft.map((y,j)=>`<article class="home-arcade-slide pikk-game-${l(y.theme)}" data-game-slide="${j}" ${j?"hidden":""}>
          <div class="home-arcade-image">${y.artwork?`<img src="${l(ys(y))}" alt="" loading="lazy" decoding="async" />`:`<span class="home-arcade-symbol" aria-hidden="true">${y.icon}</span>`}</div>
          <div class="home-arcade-info">
            <span class="chip">GAME ${j+1} OF 15 · COMING SOON</span>
            <h3>${l(y.name)}</h3>
            <p>${l(y.description)}</p>
            <small>${l(y.players)} ${y.players==="1"?"Player":"Players"} · Preview only</small>
            <a class="btn primary" href="${l(y.href||"#/games")}">View in Arcade</a>
          </div>
        </article>`).join("")}
      </div>
      <div class="home-arcade-controls">
        <button type="button" class="btn ghost" data-arcade-prev aria-label="Previous game">‹</button>
        <span id="homeArcadePosition" aria-live="polite">1 / 15</span>
        <button type="button" class="btn ghost" data-arcade-next aria-label="Next game">›</button>
      </div>
      <p class="muted" style="font-size:11px;margin:8px 0 0">Concept previews · Games are not playable yet</p>
    </section>


    ${gt}

    ${d}

    <p class="kicker">Coming Soon</p>
    <h2 style="margin:0 0 8px;font-size:15px;text-transform:uppercase;letter-spacing:.04em">Upcoming Releases</h2>
    <div class="cover-row" style="margin-bottom:18px">${t}${m}</div>

    <p class="kicker">DatBoiSkeet Network</p>
    <h2 style="margin:0 0 8px;font-size:15px;text-transform:uppercase;letter-spacing:.04em">Explore PIKK</h2>
    <div class="section-swipe" style="margin-bottom:18px">${e}</div>

    <div class="card live-activity" id="home-live-activity">
      <div class="live-activity-head">
        <h3><span class="dot" aria-hidden="true"></span> Live activity</h3>
        <span class="chip">TEST MODE</span>
      </div>
      <p class="muted live-activity-lead">Most played today · hot lives · high-engagement posts from creators &amp; community · house updates.</p>
      <ul class="list-plain live-activity-list">
        ${D}
      </ul>
      <div class="row wrap live-activity-links">
        <a class="btn ghost" href="#/music">Music</a>
        <a class="btn ghost" href="#/live">Live</a>
        <a class="btn ghost" href="#/posts">Posts · Hot</a>
      </div>
    </div>

    <div class="card video-list">
      <h3>Official DatBoiSkeet MVs</h3>
      ${r}${f}
      <a class="btn ghost block" href="#/videos" style="margin-top:10px">All videos</a>
    </div>
  `;return I("Home",Rs,{lead:"Featured stage · Top live · Block Wars preview · Live activity (hot lives · high-engagement posts from creators &amp; community · house updates) · Mix · Coming Soon · creator sell DEMO."})}function Su(e){var B,x,Y,D,_,G;const t=e.querySelector("#homeArcade");if(t){const T=[...t.querySelectorAll("[data-game-slide]")],O=t.querySelector("#homeArcadePosition");let N=0,V=null;const ce=(x=(B=window.matchMedia)==null?void 0:B.call(window,"(prefers-reduced-motion: reduce)"))==null?void 0:x.matches,de=Ge=>{N=(Ge+T.length)%T.length,T.forEach((Ve,Ue)=>{Ve.hidden=Ue!==N}),O&&(O.textContent=`${N+1} / ${T.length}`)},U=()=>{V!==null&&clearInterval(V),V=null};(Y=t.querySelector("[data-arcade-prev]"))==null||Y.addEventListener("click",()=>{U(),de(N-1)}),(D=t.querySelector("[data-arcade-next]"))==null||D.addEventListener("click",()=>{U(),de(N+1)}),ce||(V=setInterval(()=>{if(!document.body.contains(t)){U();return}document.visibilityState==="visible"&&de(N+1)},6500));const Se=new MutationObserver(()=>{document.body.contains(t)||(U(),Se.disconnect())});Se.observe(document.body,{childList:!0,subtree:!0})}Uo(e);const s=e.querySelector(".page-head");if(s){s.querySelectorAll(".badge-phase, a.badge-phase, .live-hoodie-pill, .live-hoodie").forEach(O=>{O.remove()}),s.querySelectorAll("a, span, button").forEach(O=>{const N=(O.textContent||"").replace(/\s+/g," ").trim();(/^●?\s*LIVE$/i.test(N)||N==="LIVE")&&O.remove()});const T=s.querySelector("h1");T&&[...T.children].forEach(O=>{const N=(O.textContent||"").replace(/\s+/g," ").trim();(/LIVE/i.test(N)||O.classList.contains("badge-phase")||O.classList.contains("live-hoodie-pill"))&&O.remove()})}e.querySelectorAll("[data-idb-src]").forEach(async T=>{const O=T.getAttribute("data-idb-src");if(!O)return;const N=await Ni(O);N&&(T.tagName==="IMG"||T.tagName==="VIDEO"||T.tagName==="AUDIO")&&(T.src=N)});const i=e.querySelector("#homeFeaturedIframe"),a=e.querySelector("#homeFeaturedTitle");e.querySelectorAll(".mv-pick").forEach(T=>{T.addEventListener("click",()=>{e.querySelectorAll(".mv-pick").forEach(N=>N.classList.remove("on")),T.classList.add("on");const O=T.dataset.embed||"";i&&O&&(Hp(i),i.removeAttribute("data-dbs-yt-bound"),i.src=O+(O.includes("?")?"&":"?")+"rel=0",i.title=T.dataset.title||"",qo(i)),a&&(a.textContent=T.dataset.title||"")})}),qi(e);const n=e.querySelector("#bwPreviewVideo"),o=e.querySelector("#bwPreviewPlay");if(n){const T=()=>{if(!o)return;const O=n.paused||n.ended;o.hidden=!O,o.setAttribute("aria-hidden",O?"false":"true")};o==null||o.addEventListener("click",O=>{O.preventDefault(),n.play().catch(()=>{})}),n.addEventListener("play",()=>{Vt(),T()}),n.addEventListener("pause",()=>{Ze(),T()}),n.addEventListener("ended",()=>{Ze(),T()}),n.addEventListener("pointerdown",()=>{n.paused||Vt()}),T()}const r=2e4;function c(){const T=e.querySelector("#homeTopLiveGrid");if(!T||!document.body.contains(T))return!1;const O=Fo();return T.innerHTML=O?ei(O):'<p class="muted">No live streams right now — go Live or check Hot Feed.</p>',!0}let d=setInterval(()=>{c()||(clearInterval(d),d=null)},r);const p=()=>{document.visibilityState==="visible"&&c()};document.addEventListener("visibilitychange",p),window.addEventListener("focus",c);const m=e.querySelector("#homeFeaturedStage");if(!m){const T=new MutationObserver(()=>{document.body.contains(e)||(d&&clearInterval(d),document.removeEventListener("visibilitychange",p),window.removeEventListener("focus",c),T.disconnect())});T.observe(document.body,{childList:!0,subtree:!0});return}const h=[...e.querySelectorAll(".home-stage-tab")],f=[...e.querySelectorAll(".home-stage-panel")];let v=!1,k=null;const b=typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||document.documentElement.classList.contains("reduce-motion")||((G=(_=document.body)==null?void 0:_.classList)==null?void 0:G.contains("reduce-motion"));function S(T){hi.some(O=>O.id===T)||(T="toplive"),m.dataset.active=T,bu(T),h.forEach(O=>{const N=O.dataset.stage===T;O.classList.toggle("on",N),O.setAttribute("aria-selected",N?"true":"false")}),f.forEach(O=>{const N=O.dataset.panel===T;O.classList.toggle("on",N),N?O.removeAttribute("hidden"):O.setAttribute("hidden","")})}function $(){const T=hi.map(V=>V.id),O=m.dataset.active||"toplive",N=T.indexOf(O);S(T[(N+1)%T.length])}function A(){w(),!(v||b)&&(k=setInterval($,lu))}function w(){k&&(clearInterval(k),k=null)}h.forEach(T=>{T.addEventListener("click",()=>{v=!0,w(),S(T.dataset.stage)})});const P=Go()||"toplive";S(P),b||setTimeout(()=>{!document.body.contains(m)||v||A()},1e4);const C=new MutationObserver(()=>{document.body.contains(m)||(w(),d&&(clearInterval(d),d=null),document.removeEventListener("visibilitychange",p),window.removeEventListener("focus",c),C.disconnect())});C.observe(document.body,{childList:!0,subtree:!0})}function Uo(e){const t=e.querySelector("#homeAppGoalBody");if(t){const s=()=>{document.body.contains(t)?t.innerHTML=Vo(ri()):(clearInterval(a),document.removeEventListener("visibilitychange",i))},i=()=>{document.visibilityState==="visible"&&s()},a=setInterval(s,3e4);document.addEventListener("visibilitychange",i),t.addEventListener("submit",n=>{var d,p;if(!n.target.matches(".home-goal-custom-form"))return;n.preventDefault();const o=Number((d=n.target.querySelector(".home-goal-custom-coins"))==null?void 0:d.value);if(!Number.isSafeInteger(o)||o<1||o>1e6)return g("Enter 1–1,000,000 whole coins");const r=(p=ri())==null?void 0:p.id,c=oi(r,o);g(c!=null&&c.ok?"Custom donation sent · TEST MODE":(c==null?void 0:c.error)==="insufficient"?"Not enough demo coins":(c==null?void 0:c.error)==="signin"?"Sign in first":"Donation unavailable · TEST MODE"),s()}),t.addEventListener("click",n=>{const o=n.target.closest(".home-goal-donate");if(!o)return;const r=oi(o.dataset.goalId,Number(o.dataset.coins));g(r&&r.ok?`TEST MODE · ${o.dataset.coins} coins donated (no real payment)`:"TEST MODE · donate unavailable"),s()})}}const $u="291f11d05ef96fdf66e148305b5086c039e18093",xu=Object.freeze([{title:"Viral Live: Correct Category Destinations",detail:"Viral Clips opens Clips, Songs opens Music, and Photos opens Home. These are links to existing PIKK sections; the 24/7 channel is still a preview, not broadcasting.",route:"#/viral-live",pr:197,kind:"VIRAL LIVE · PREVIEW"},{title:"Viral Live: Mobile Category Visibility",detail:"On narrow phones, keyboard-selected Videos, Viral Clips, Songs and Photos tabs scroll into view without changing the existing swipeable design. Continuous broadcasting is not live.",route:"#/viral-live",pr:196,kind:"VIRAL LIVE · PREVIEW"},{title:"Viral Live: Source Queue Keyboard Browsing",detail:"Use arrow keys or Home/End to select among three original music-video sources. The preview updates its artwork and YouTube source link; this is not a livestream.",route:"#/viral-live",pr:195,kind:"VIRAL LIVE · PREVIEW"},{title:"Explore: Escape Clears Search",detail:"Press Escape in Explore search to clear the query and results while keeping focus in the search field. Existing discovery and profiles remain available.",route:"#/explore",pr:194,kind:"EXPLORE · NAVIGATION"},{title:"Explore: Search Survives Tab Changes",detail:"Keep an Explore search when switching between Trending, Following and Discover; Clear resets the query and results. This improves browsing, not backend search coverage.",route:"#/explore",pr:193,kind:"EXPLORE · NAVIGATION"}]);function Eu(){const e=$u.slice(0,8),t=xu.map((s,i)=>`
    <article class="pikk-update-card">
      <span class="pikk-update-number" aria-hidden="true">${String(i+1).padStart(2,"0")}</span>
      <div class="pikk-update-card-copy">
        <span class="pikk-update-kind">${l(s.kind)}</span>
        <h3>${l(s.title)}</h3>
        <p>${l(s.detail)}</p>
        <div class="pikk-update-links">
          <a class="btn primary" href="${l(s.route)}" aria-label="${l(`See ${s.title} in PIKK`)}">See in PIKK</a>
          <a class="pikk-update-source" href="https://github.com/scrubdup/pikk-app/pull/${s.pr}" target="_blank" rel="noopener noreferrer">Code update #${s.pr}</a>
        </div>
      </div>
    </article>`).join("");return I("PIKK Updates",`
    <section class="pikk-updates-hero" aria-label="PIKK app release information">
      <div>
        <p class="kicker">PIKK · WHAT'S NEW</p>
        <h2>See what changed. <span>Know what loaded.</span></h2>
        <p>Five recent user-visible improvements are below. Open each updated section and see exactly what shipped. Backend services marked TEST MODE are not production-ready.</p>
        <div class="pikk-updates-build">
          <span>Version loaded on this device</span>
          <strong id="pikkLoadedBuild" data-build="${l(e)}">${l(e)}</strong>
        </div>
        <div class="pikk-updates-actions">
          <button class="btn primary" type="button" id="pikkUpdatesRefresh">Check for latest version</button>
          <a class="btn ghost" href="#/home">Return home</a>
        </div>
      </div>
      <div class="pikk-updates-hero-mark"><img src="${l($t("brand/pikk-official-approved.jpg"))}" alt="PIKK official chrome logo" loading="eager"></div>
    </section>
    <section class="pikk-updates-list" aria-label="Recent published updates">
      <h2>Latest verified improvements</h2>
      ${t}
    </section>
    <p class="pikk-updates-note">A refresh reloads this browser's app bundle; it does not clear your account or local demo data. If a change still does not appear, compare the version above with the published source commit.</p>
  `,{lead:"A clear record of recent PIKK improvements."})}function Au(e){var t;(t=e.querySelector("#pikkUpdatesRefresh"))==null||t.addEventListener("click",()=>{window.location.assign(or(window.location.href))})}const Cu=20*60,Tu=250*1024*1024;function Du({duration:e,size:t,type:s}){return s!=null&&s.startsWith("video/")?!Number.isFinite(t)||t<=0||t>Tu?"Video must be under 250 MB for this device-local preview.":!Number.isFinite(e)||e<=0?"Unable to read video duration. Try another file.":e>Cu?"PIKKUP Phase 1 videos must be 20 minutes or shorter.":"":"Select a supported video file."}function Mu(e){return new Promise((t,s)=>{const i=URL.createObjectURL(e),a=document.createElement("video");let n=!1;const o=setTimeout(()=>r(new Error("Video metadata timed out")),12e3);function r(c,d){n||(n=!0,clearTimeout(o),a.removeAttribute("src"),a.load(),URL.revokeObjectURL(i),c?s(c):t(d))}a.preload="metadata",a.onloadedmetadata=()=>r(null,a.duration),a.onerror=()=>r(new Error("Cannot read this video file")),a.src=i})}const Ho=[{id:"song",label:"Song",acceptCover:"image/*",acceptMedia:"audio/*,.mp3,.m4a,.wav,.aac"},{id:"album",label:"Album",acceptCover:"image/*",acceptMedia:"audio/*,.mp3,.m4a,.wav,.aac"},{id:"video",label:"Video",acceptCover:"image/*",acceptMedia:"video/*,.mp4,.mov,.webm"},{id:"picture",label:"Picture",acceptCover:"image/*",acceptMedia:"image/*"}];function Lu(e){return I("Admin",`<div class="card admin-gate">
      <h3>Admin gate · TEST MODE</h3>
      <p class="muted">Demo-only. No real auth. Enable one of:</p>
      <ol class="admin-gate-steps">
        <li>Sign in on <a href="#/profile">Profile</a>, then toggle <strong>Demo Admin</strong>.</li>
        <li>While signed in, open <code>#/admin?admin=1</code> (sets <code>user.role='admin'</code> in <code>dbs_v1</code>).</li>
      </ol>
      <p>Signed in as: <strong>${l((e==null?void 0:e.username)||"guest")}</strong>
        ${e?"":'· <a class="btn" href="#/profile">Sign in</a>'}</p>
      ${e?'<a class="btn primary" href="#/admin?admin=1">Enable Admin · TEST MODE</a>':""}
    </div>
    <div class="card muted">Full team roles, revenue, and moderation ship later phases.</div>`,{lead:"Gated demo dashboard."})}function Iu(){return`
  <section class="card admin-add" id="adminAdd">
    <h3>Add Content</h3>
    <p class="muted admin-add-note">PIKKUP preview: video uploads must be 20 minutes or shorter and at most 250 MB. Device-local only, not public hosting. TEST MODE · no backend. Metadata → <code>localStorage dbs_v1.catalog</code>. Files → IndexedDB <code>dbs_media_v1</code>. Works on iPhone Safari &amp; desktop. Large files stay on this device only.</p>

    <div class="admin-type-tabs" role="tablist" aria-label="Content type">${Ho.map((t,s)=>`<button type="button" class="admin-type-tab${s===0?" on":""}" data-type="${l(t.id)}" role="tab">${l(t.label)}</button>`).join("")}</div>

    <form class="admin-add-form" id="adminAddForm" novalidate>
      <input type="hidden" name="type" id="adminType" value="song" />

      <div class="admin-field">
        <label for="adminTitle">Title *</label>
        <input id="adminTitle" name="title" required maxlength="120" placeholder="Track or release title" autocomplete="off" />
      </div>

      <div class="admin-field">
        <label for="adminArtist">Artist / credit</label>
        <input id="adminArtist" name="artist" maxlength="80" value="DatBoiSkeet" autocomplete="off" />
      </div>

      <div class="admin-field admin-field-cover">
        <label>Cover / image</label>
        <div class="admin-dropzone" data-zone="cover" tabindex="0">
          <input type="file" id="adminCoverFile" class="admin-file-input" accept="image/*" capture="environment" />
          <p class="admin-dropzone-label"><strong>Tap to upload cover</strong><span class="muted"> · photo library or camera (iPhone) · or paste URL below</span></p>
          <p class="admin-file-name muted" data-for="cover"></p>
        </div>
        <input id="adminCoverUrl" name="coverUrl" type="url" inputmode="url" placeholder="https://… or /music/…" class="admin-url-input" />
      </div>

      <div class="admin-field admin-field-media">
        <label id="adminMediaLabel">Media file (audio / video / image)</label>
        <div class="admin-dropzone" data-zone="media" tabindex="0">
          <input type="file" id="adminMediaFile" class="admin-file-input" accept="audio/*,video/*,image/*,.mp3,.m4a,.wav,.mp4,.mov,.webm" />
          <p class="admin-dropzone-label"><strong>Tap to upload media</strong><span class="muted"> · Files app / Photos on iPhone · desktop drag-drop</span></p>
          <p class="admin-file-name muted" data-for="media"></p>
        </div>
        <input id="adminMediaUrl" name="mediaUrl" type="url" inputmode="url" placeholder="https://… media URL (optional)" class="admin-url-input" />
      </div>

      <div class="admin-field admin-field-youtube">
        <label for="adminYoutube">YouTube link (optional)</label>
        <input id="adminYoutube" name="youtube" type="url" inputmode="url" placeholder="https://www.youtube.com/watch?v=…" />
      </div>

      <div class="admin-field admin-field-streaming" id="adminStreamingFields">
        <label>Streaming links (optional · song/album · official URLs only)</label>
        <p class="muted" style="margin:0 0 8px;font-size:12px">Leave blank if unknown — never invent. Shown on Music · Stream Everywhere when published.</p>
        <div class="admin-stream-grid">
          <input id="adminSpotify" name="spotify" type="url" inputmode="url" placeholder="Spotify https://open.spotify.com/…" />
          <input id="adminApple" name="apple" type="url" inputmode="url" placeholder="Apple Music https://music.apple.com/…" />
          <input id="adminYtm" name="youtubeMusic" type="url" inputmode="url" placeholder="YouTube Music https://music.youtube.com/…" />
          <input id="adminTidal" name="tidal" type="url" inputmode="url" placeholder="Tidal (optional)" />
          <input id="adminAmazon" name="amazon" type="url" inputmode="url" placeholder="Amazon Music (optional)" />
        </div>
      </div>

      <div class="admin-field admin-publish">
        <label class="admin-publish-toggle">
          <input type="checkbox" id="adminPublished" name="published" checked />
          <span>Publish now</span>
        </label>
        <p class="muted">Unpublished items stay admin-only. Published songs/albums appear on Music; videos on Videos &amp; Home; pictures on Home.</p>
      </div>

      <div class="admin-add-actions">
        <button type="submit" class="btn primary" id="adminSave">Save to catalog</button>
        <span class="chip">TEST MODE</span>
      </div>
      <p class="muted admin-add-status" id="adminAddStatus" aria-live="polite"></p>
    </form>
  </section>`}function Pu(e){if(!e.length)return'<div class="card admin-catalog"><h3>Catalog</h3><p class="muted">No admin-added items yet.</p></div>';const t=e.map(s=>{const i=s.coverRef&&!s.coverRef.startsWith("idb:")?l(s.coverRef):"";return`<div class="admin-catalog-row" data-id="${l(s.id)}">
        <div class="admin-catalog-thumb">
          ${i?`<img src="${i}" alt="" />`:`<img data-idb-src="${l(s.coverRef||"")}" alt="" class="idb-pending" />`}
        </div>
        <div class="admin-catalog-meta">
          <strong>${l(s.title)}</strong>
          <span class="muted">${l(s.type)} · ${l(s.artist)}</span>
          <span class="chip">${s.published?"Published":"Draft"}</span>
          ${s.streamingLinks&&Object.keys(s.streamingLinks).length?'<span class="chip">Streaming links</span>':""}
        </div>
        <div class="admin-catalog-actions">
          <button type="button" class="btn ghost admin-cat-pub" data-id="${l(s.id)}" data-on="${s.published?"0":"1"}">${s.published?"Unpublish":"Publish"}</button>
          <button type="button" class="btn ghost admin-cat-del" data-id="${l(s.id)}">Delete</button>
        </div>
      </div>`}).join("");return`<div class="card admin-catalog"><h3>Catalog (${e.length})</h3>
    <p class="muted">Drafts are admin-only. Publish to show on Music / Videos / Home.</p>
    <div class="admin-catalog-list">${t}</div></div>`}function Oe(e){return"$"+(Number(e)||0).toFixed(2)}function Ou(e){var a,n,o;const t=((a=e.openMic)==null?void 0:a.pending)||[],s=((n=e.openMic)==null?void 0:n.byStatus)||{},i=t.length?t.map(r=>`<div class="row wrap admin-om-row" data-om-id="${l(r.id)}">
            <span class="spacer"><strong>${l(r.username)}</strong> · ${l(r.talent)} · ${l(r.trackTitle)}
              <span class="chip">pending</span>
              ${r.rightsCertified?'<span class="chip">rights</span>':'<span class="chip">no rights</span>'}
            </span>
            <button type="button" class="btn primary admin-om" data-id="${l(r.id)}" data-status="approved">Approve</button>
            <button type="button" class="btn ghost admin-om" data-id="${l(r.id)}" data-status="rejected">Reject</button>
          </div>`).join(""):'<p class="muted">No pending applications. Seeded demos may already be approved/rejected — open <a href="#/openmic">Open Mic</a>.</p>';return`<section class="card admin-openmic" id="adminOpenMic">
    <h3>Open Mic queue</h3>
    <p class="muted">TEST MODE · reuse store Approve/Reject. Pending ${s.pending||0} · approved ${s.approved||0} · rejected ${s.rejected||0} · total ${((o=e.openMic)==null?void 0:o.total)||0}</p>
    ${i}
    <p class="admin-panel-links"><a class="btn" href="#/openmic">Full Open Mic page</a></p>
  </section>`}function _u(e){const t=e.fanClubs||{total:0,recent:[]},s=t.recent.length?`<ul class="list-plain">${t.recent.map(i=>`<li><span><strong>${l(i.name)}</strong> · ${l(i.privacy)}${i.official?" · official":""}</span><span class="muted">${i.memberCount} members</span></li>`).join("")}</ul>`:'<p class="muted">No clubs yet.</p>';return`<section class="card admin-fanclubs" id="adminFanClubs">
    <h3>Fan Clubs glance</h3>
    <div class="stats">
      <div><strong>${t.total}</strong><span>Clubs</span></div>
    </div>
    ${s}
    <p class="admin-panel-links"><a class="btn" href="#/fanclubs">Open Fan Clubs</a></p>
  </section>`}function qu(e){const t=e.loyalty||{},s=(t.badges||[]).slice(0,6).map(i=>`<span class="chip">${l(i)}</span>`).join(" ")||'<span class="muted">None unlocked</span>';return`<section class="card admin-loyalty" id="adminLoyalty">
    <h3>Loyalty glance</h3>
    <p class="muted">${l(t.note||"Device-local loyalty")}</p>
    <div class="stats">
      <div><strong>${t.points||0}</strong><span>Points</span></div>
      <div><strong>${t.badgeCount||0}</strong><span>Badges</span></div>
      <div><strong>${t.historyCount||0}</strong><span>Actions</span></div>
    </div>
    <p class="admin-badge-row">${s}</p>
    <p class="admin-panel-links"><a class="btn" href="#/loyalty">Open Loyalty Club</a></p>
  </section>`}function Nu(){return`<section class="card admin-quicklinks" id="adminQuickLinks">
    <h3>Quick links</h3>
    <p class="muted">Deep-links only · page ownership stays with Live Social / Commerce / Build.</p>
    ${[{owner:"Live Social",links:[["#/live","Live"],["#/messages","Messages"],["#/giftbattles","Gift battles"],["#/multiguest","Multi-guest"],["#/spotlight","Spotlight"],["#/restream","Restream"],["#/connect","Connect"]]},{owner:"Commerce",links:[["#/marketplace","Marketplace"],["#/wallet","Wallet"],["#/earnings","Earnings"],["#/missions","Missions"],["#/share","Share & Earn"],["#/refer","Refer & Earn"]]},{owner:"Build",links:[["#/explore","Explore"],["#/notifications","Notifications"],["#/fanclubs","Fan Clubs"],["#/loyalty","Loyalty"],["#/openmic","Open Mic"]]}].map(s=>{const i=s.links.map(([a,n])=>`<a class="btn ghost admin-qlink" href="${a}">${l(n)}</a>`).join("");return`<div class="admin-ql-group"><span class="chip">${l(s.owner)}</span><div class="admin-ql-row">${i}</div></div>`}).join("")}
  </section>`}function Bu(e){const t=e.revenue||{},s=(t.byCategory||[]).map(i=>`<li><span>${l(i.label||i.category)} ×${i.count}</span><span class="muted">gross ${Oe(i.gross)} · creator ${Oe(i.creatorShare)} · PIKK ${Oe(i.dbsShare)}</span></li>`).join("");return`<section class="card admin-revenue" id="adminRevenue">
    <h3>Revenue / analytics shell</h3>
    <div class="row wrap" style="gap:8px;margin-bottom:8px">
      <span class="chip">TEST MODE</span>
      <span class="chip">${l(t.chip||"demo figures · not production")}</span>
    </div>
    <div class="stats">
      <div><strong>${Oe(t.gross)}</strong><span>Gross</span></div>
      <div><strong>${Oe(t.fees)}</strong><span>Fees</span></div>
      <div><strong>${Oe(t.creatorShare)}</strong><span>Creator net</span></div>
      <div><strong>${Oe(t.dbsShare)}</strong><span>PIKK net</span></div>
    </div>
    <p class="muted">Creator available ${Oe(t.creatorAvailable)} · holds ${Oe(t.creatorHolds)} · fan wallet ${Oe(t.fanWalletBalance)} · catalog ${t.catalogPublished||0}/${t.catalogTotal||0} published · earning lines ${t.earnCount||0}</p>
    ${s?`<ul class="list-plain">${s}</ul>`:'<p class="muted">No creator earnings in store yet — open Wallet / Earnings (Commerce) to seed demos.</p>'}
    <p class="admin-panel-links">
      <a class="btn" href="#/wallet">Wallet</a>
      <a class="btn" href="#/earnings">Earnings</a>
    </p>
  </section>`}function Ru(e){_s(),Be();const t=$n({openOnly:!0}),s=$n({openOnly:!1}).length,i=e.hotFeed||{},a=t.length?t.slice(0,12).map(n=>{const o=n.kind==="live"?'<span class="chip">live</span>':'<span class="chip">post</span>',r=n.kind==="live"?` · viewers ${n.viewers??"—"} · gifts ${n.gifts??"—"}`:` · score ${n.score??0}`,c=n.kind==="post"?`<button type="button" class="btn primary admin-ea-like" data-ref="${l(n.refId)}" data-alert="${l(n.id)}">Like</button>
                 <button type="button" class="btn ghost admin-ea-comment" data-ref="${l(n.refId)}" data-alert="${l(n.id)}">Comment</button>
                 <button type="button" class="btn ghost admin-ea-share" data-ref="${l(n.refId)}" data-alert="${l(n.id)}">Share</button>`:'<a class="btn ghost" href="#/live">Open Live</a>';return`<div class="admin-ea-row" data-alert-id="${l(n.id)}">
            <div class="admin-ea-main">
              <strong>${l(n.username||"creator")}</strong> ${o}
              <div class="muted">${l(n.title||"")}${r}</div>
            </div>
            <div class="admin-ea-actions row wrap">
              ${c}
              <button type="button" class="btn ghost admin-ea-handle" data-alert="${l(n.id)}">Mark handled</button>
            </div>
          </div>`}).join(""):'<p class="muted">No open engagement alerts. Hot posts/lives will appear here when score spikes (TEST MODE).</p>';return`<section class="card admin-engagement" id="adminEngagement">
    <h3>Engagement alerts</h3>
    <div class="row wrap" style="gap:8px;margin-bottom:8px">
      <span class="chip">TEST MODE</span>
      <span class="chip">§38 Hot Feed</span>
    </div>
    <p class="muted">When posts or lives go hot, alert Admin · one-tap Like / Comment / Share · mark handled. Persist <code>dbs_v1.engagementAlerts</code>.</p>
    <div class="stats">
      <div><strong>${t.length}</strong><span>Open</span></div>
      <div><strong>${s}</strong><span>Total alerts</span></div>
      <div><strong>${i.hotPosts||0}</strong><span>Hot posts</span></div>
      <div><strong>${i.hotLives||0}</strong><span>Hot lives</span></div>
    </div>
    ${a}
    <p class="admin-panel-links"><a class="btn" href="#/posts">Open Posts Hot strip</a><a class="btn" href="#/live">Open Live</a></p>
  </section>`}function ju(e){const t=e.moderation||{};return`<section class="card admin-moderation" id="adminModeration">
    <h3>Moderation stub</h3>
    <p class="muted">${l(t.note||"Stub")}</p>
    <div class="stats">
      <div><strong>${(t.warnings||[]).length}</strong><span>Warnings</span></div>
      <div><strong>${(t.suspensions||[]).length}</strong><span>Suspensions</span></div>
    </div>
    <p class="muted">Empty-state · no enforcement actions stored yet.</p>
    <p class="admin-panel-links"><a class="btn" href="#/guidelines">Community Guidelines</a></p>
  </section>`}function Ku(){var c;const e=Fe(),{posts:t,clipperApps:s,user:i}=M();if(((c=e.query)==null?void 0:c.admin)==="1"&&i&&i.role!=="admin"&&Ts(!0),!se())return Lu(i);Xt(),Ke(),_s();const a=vr(),n=pp(),o=a.clipperByStatus,r=Et({includeUnpublishedForAdmin:!0});return I("Admin",`<div class="card admin-header">
      <div class="row wrap">
        <span class="chip">TEST MODE</span>
        <span class="chip">role=admin</span>
        <span class="spacer muted">Signed in as <strong>${l(i.username)}</strong></span>
        <button class="btn ghost" id="adminRevoke">Revoke admin</button>
      </div>
      <p class="muted admin-gate-hint">Gate: Profile toggle or <code>?admin=1</code> → <code>user.role='admin'</code> in <code>dbs_v1</code>. Phase 2 panels deep-link to owner pages.</p>
    </div>

    ${Nu()}
    ${Ru(n)}
    ${Ou(n)}
    ${_u(n)}
    ${qu(n)}
    ${Bu(n)}
    ${ju(n)}

    ${Iu()}
    ${Pu(r)}

    <div class="card admin-stats">
      <h3>Phase 1 stats</h3>
      <div class="stats">
        <div><strong>${a.posts}</strong><span>Posts</span></div>
        <div><strong>${a.likes}</strong><span>Likes</span></div>
        <div><strong>${a.comments}</strong><span>Comments</span></div>
        <div><strong>${a.clippers}</strong><span>Clipper apps</span></div>
        <div><strong>${a.catalogPublished||0}</strong><span>Published</span></div>
        <div><strong>${a.catalogTotal||0}</strong><span>Catalog</span></div>
      </div>
      <p class="muted">Clippers — pending ${o.pending} · approved ${o.approved} · waitlisted ${o.waitlisted} · rejected ${o.rejected}</p>
    </div>

    <div class="card admin-posts"><h3>Posts (${t.length})</h3>
      <ul class="list-plain">${t.slice(0,20).map(d=>`<li><span>${l(d.username)}: ${l((d.text||"").slice(0,48))}</span><span class="muted">${new Date(d.at).toLocaleDateString()}</span></li>`).join("")||'<li class="muted">None</li>'}</ul>
      <a class="btn" href="#/posts">Open Posts</a>
    </div>

    <div class="card admin-clippers"><h3>Clipper applications (${s.length})</h3>
      ${s.length?s.map(d=>`<div class="row wrap admin-clip-row">
                     <span class="spacer">${l(d.name)} · ${l(d.email)} <span class="chip">${l(d.status)}</span></span>
                     <button class="btn primary admin-clip" data-id="${l(d.id)}" data-status="approved">Approve</button>
                     <button class="btn ghost admin-clip" data-id="${l(d.id)}" data-status="waitlisted">Waitlist</button>
                     <button class="btn ghost admin-clip" data-id="${l(d.id)}" data-status="rejected">Reject</button>
                   </div>`).join(""):'<p class="muted">None yet — submit via <a href="#/clippers">Clippers</a>.</p>'}</div>`,{lead:"Phase 2 controls · Add Content · Clippers · catalog."})}async function qn(e){if(!e)return"";const t=iu("media");return await tu(t,e,{name:e.name,mime:e.type}),"idb:"+t}function Nn(e){if(!e)return"";try{const t=new URL(e);let s=t.searchParams.get("v");return!s&&t.hostname.includes("youtu.be")&&(s=t.pathname.slice(1)),!s&&t.pathname.startsWith("/embed/")&&(s=t.pathname.split("/")[2]),s?`https://www.youtube.com/embed/${s}`:""}catch{return""}}function Fu(e){var a,n;(a=e.querySelector("#adminRevoke"))==null||a.addEventListener("click",()=>{Ts(!1),g("Admin revoked"),R("#/admin")}),e.querySelectorAll(".admin-clip").forEach(o=>{o.addEventListener("click",()=>{fr(o.dataset.id,o.dataset.status),g("Clipper "+o.dataset.status),R("#/admin")})}),e.querySelectorAll(".admin-om").forEach(o=>{o.addEventListener("click",()=>{const r=la(o.dataset.id,o.dataset.status,o.dataset.status==="rejected"?"Admin reject":"");if(r!=null&&r.error){g(r.error==="admin"?"Admin required":"Open Mic update failed");return}g(o.dataset.status==="approved"?"Open Mic approved":"Open Mic rejected"),R("#/admin")})}),e.querySelectorAll(".admin-ea-like").forEach(o=>{o.addEventListener("click",()=>{const r=Ap(o.dataset.ref);if(r!=null&&r.error)return g(r.error==="admin"?"Admin required":"Like failed");o.dataset.alert&&js(o.dataset.alert,"liked"),g("Liked · TEST MODE"),R("#/admin")})}),e.querySelectorAll(".admin-ea-comment").forEach(o=>{o.addEventListener("click",()=>{const r=Cp(o.dataset.ref,"🔥 PIKK team — keep it up! (TEST MODE)");if(r!=null&&r.error)return g(r.error==="admin"?"Admin required":"Comment failed");o.dataset.alert&&js(o.dataset.alert,"commented"),g("Comment posted · TEST MODE"),R("#/admin")})}),e.querySelectorAll(".admin-ea-share").forEach(o=>{o.addEventListener("click",async()=>{var d;const r=Tp(o.dataset.ref);if(r!=null&&r.error)return g(r.error==="admin"?"Admin required":"Share failed");const c=`${location.origin}${location.pathname}#/posts?focus=${encodeURIComponent(o.dataset.ref)}`;try{(d=navigator.clipboard)!=null&&d.writeText&&await navigator.clipboard.writeText(c),g("Link copied · share +1 (TEST MODE)")}catch{g("Share +1 (TEST MODE)")}o.dataset.alert&&js(o.dataset.alert,"shared"),R("#/admin")})}),e.querySelectorAll(".admin-ea-handle").forEach(o=>{o.addEventListener("click",()=>{const r=js(o.dataset.alert,"handled");if(r!=null&&r.error)return g("Could not mark handled");g("Alert handled"),R("#/admin")})}),e.querySelectorAll("img[data-idb-src]").forEach(async o=>{const r=o.getAttribute("data-idb-src");if(!r)return;const c=await Ni(r);c&&(o.src=c,o.classList.remove("idb-pending"))});const t=e.querySelector("#adminType"),s=e.querySelector("#adminMediaFile"),i=e.querySelector("#adminCoverFile");e.querySelectorAll(".admin-type-tab").forEach(o=>{o.addEventListener("click",()=>{e.querySelectorAll(".admin-type-tab").forEach(m=>m.classList.remove("on")),o.classList.add("on");const r=o.dataset.type;t&&(t.value=r);const c=Ho.find(m=>m.id===r);c&&s&&(s.accept=c.acceptMedia),c&&i&&(i.accept=c.acceptCover);const d=e.querySelector("#adminMediaLabel");d&&(d.textContent=r==="picture"?"Picture file (or use cover only)":r==="video"?"Video file (optional if YouTube link set)":"Audio / media file (optional)");const p=e.querySelector("#adminStreamingFields");p&&(p.style.display=r==="song"||r==="album"?"":"none")})}),e.querySelectorAll(".admin-dropzone").forEach(o=>{const r=o.querySelector(".admin-file-input"),c=o.querySelector(".admin-file-name");o.addEventListener("click",d=>{d.target!==r&&(r==null||r.click())}),o.addEventListener("keydown",d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),r==null||r.click())}),r==null||r.addEventListener("change",()=>{var p;const d=(p=r.files)==null?void 0:p[0];c&&(c.textContent=d?`${d.name} · ${(d.size/1024/1024).toFixed(2)} MB`:"")}),o.addEventListener("dragover",d=>{d.preventDefault(),o.classList.add("drag")}),o.addEventListener("dragleave",()=>o.classList.remove("drag")),o.addEventListener("drop",d=>{var h,f;d.preventDefault(),o.classList.remove("drag");const p=(f=(h=d.dataTransfer)==null?void 0:h.files)==null?void 0:f[0];if(!p||!r)return;const m=new DataTransfer;m.items.add(p),r.files=m.files,r.dispatchEvent(new Event("change"))})}),(n=e.querySelector("#adminAddForm"))==null||n.addEventListener("submit",async o=>{var A,w,P,C,B,x,Y,D,_,G,T,O,N,V,ce,de,U,Se,Ge,Ve,Ue,ut,mt,ht,gt,ft;o.preventDefault();const r=e.querySelector("#adminAddStatus"),c=e.querySelector("#adminSave"),d=(w=(A=e.querySelector("#adminTitle"))==null?void 0:A.value)==null?void 0:w.trim(),p=((C=(P=e.querySelector("#adminArtist"))==null?void 0:P.value)==null?void 0:C.trim())||"DatBoiSkeet",m=((B=e.querySelector("#adminType"))==null?void 0:B.value)||"song",h=((Y=(x=e.querySelector("#adminCoverUrl"))==null?void 0:x.value)==null?void 0:Y.trim())||"",f=((_=(D=e.querySelector("#adminMediaUrl"))==null?void 0:D.value)==null?void 0:_.trim())||"",v=((T=(G=e.querySelector("#adminYoutube"))==null?void 0:G.value)==null?void 0:T.trim())||"",k={spotify:((N=(O=e.querySelector("#adminSpotify"))==null?void 0:O.value)==null?void 0:N.trim())||"",apple:((ce=(V=e.querySelector("#adminApple"))==null?void 0:V.value)==null?void 0:ce.trim())||"",youtubeMusic:((U=(de=e.querySelector("#adminYtm"))==null?void 0:de.value)==null?void 0:U.trim())||"",tidal:((Ge=(Se=e.querySelector("#adminTidal"))==null?void 0:Se.value)==null?void 0:Ge.trim())||"",amazon:((Ue=(Ve=e.querySelector("#adminAmazon"))==null?void 0:Ve.value)==null?void 0:Ue.trim())||"",youtube:v||""},b=!!((ut=e.querySelector("#adminPublished"))!=null&&ut.checked),S=(ht=(mt=e.querySelector("#adminCoverFile"))==null?void 0:mt.files)==null?void 0:ht[0],$=(ft=(gt=e.querySelector("#adminMediaFile"))==null?void 0:gt.files)==null?void 0:ft[0];if(!d){g("Title required");return}if(m==="video"&&$)try{const X=await Mu($),be=Du({duration:X,size:$.size,type:$.type});if(be){g(be),r&&(r.textContent=be);return}}catch{const X="Could not verify video duration. Upload canceled.";g(X),r&&(r.textContent=X);return}c&&(c.disabled=!0),r&&(r.textContent="Saving… (large files may take a moment on iPhone)");try{let X=h,be=f;S&&(X=await qn(S)),$&&(be=await qn($)),m==="picture"&&!X&&be&&(X=be);const Pe=Vl({type:m,title:d,artist:p,coverRef:X,mediaRef:be,youtube:v,streamingLinks:m==="song"||m==="album"?k:{},published:b,embed:Nn(v)});if(Pe!=null&&Pe.error){g(Pe.error==="forbidden"?"Admin required":"Could not save"),r&&(r.textContent=""),c&&(c.disabled=!1);return}v&&Pe.id&&yr(Pe.id,{embed:Nn(v)}),g(b?"Published to catalog":"Saved as draft"),R("#/admin")}catch(X){console.error(X),g("Save failed — file may be too large for this browser"),r&&(r.textContent=String((X==null?void 0:X.message)||X)),c&&(c.disabled=!1)}}),e.querySelectorAll(".admin-cat-pub").forEach(o=>{o.addEventListener("click",()=>{Ul(o.dataset.id,o.dataset.on==="1"),g(o.dataset.on==="1"?"Published":"Unpublished"),R("#/admin")})}),e.querySelectorAll(".admin-cat-del").forEach(o=>{o.addEventListener("click",()=>{confirm("Delete this catalog item?")&&(Hl(o.dataset.id),g("Deleted"),R("#/admin"))})})}function _t(){R("#/posts")}function Gu(){_s();const e=vo(8);return e.length?`<section class="card hot-strip" id="hotStrip">
    <div class="row wrap hot-strip-head">
      <h3 class="hot-strip-title">🔥 Hot / Trending</h3>
      <span class="chip">TEST MODE</span>
      <span class="muted hot-strip-note">likes + comments + shares · house + community</span>
    </div>
    <div class="hot-rail" role="list">${e.map((s,i)=>{const a=i+1,n=s.image?`<img class="hot-thumb" src="${l(s.image)}" alt="" loading="lazy" />`:`<div class="hot-thumb hot-thumb-empty">${l((s.username||"?")[0].toUpperCase())}</div>`,o=s.mediaType==="video"?'<span class="chip">video</span>':s.image?'<span class="chip">pic</span>':'<span class="chip">text</span>',r=s.house?'<span class="chip">house</span>':'<span class="chip">community</span>';return`<a class="hot-card" href="#/posts?focus=${l(s.postId||s.id)}" data-hot-id="${l(s.postId||s.id)}">
        <span class="hot-rank">#${a}</span>
        ${n}
        <span class="hot-meta">
          <span class="hot-user">@${l(s.username)}</span>
          <span class="hot-preview">${l((s.preview||s.text||"").slice(0,64))}</span>
          <span class="hot-stats">♥ ${s.likes} · 💬 ${s.comments} · ↗ ${s.shares} · score ${s.score}</span>
          <span class="hot-chips">${o}${r}</span>
        </span>
      </a>`}).join("")}</div>
  </section>`:`<section class="card hot-strip" id="hotStrip">
      <div class="row wrap hot-strip-head">
        <h3 class="hot-strip-title">🔥 Hot / Trending</h3>
        <span class="chip">TEST MODE</span>
      </div>
      <p class="muted">No hot posts yet — engage (like · comment · share) to spike the feed.</p>
    </section>`}function Vu(e){var S,$,A,w,P;const{posts:t,likes:s,comments:i,user:a,postShares:n}=M(),o=((S=e==null?void 0:e.query)==null?void 0:S.tab)==="following"?"following":"discover",r=(($=e==null?void 0:e.query)==null?void 0:$.focus)||"",c=new Set((a==null?void 0:a.following)||[]),d=o==="following"&&a?t.filter(C=>c.has(C.userId)||C.userId===a.id):t,p=yl.map(C=>`<button type="button" class="chip preset-img" data-src="${l(C.src)}" title="${l(C.label)}">${l(C.label)}</button>`).join(""),m=((A=e==null?void 0:e.query)==null?void 0:A.compose)==="1"||((w=e==null?void 0:e.query)==null?void 0:w.type),h=["text","picture","short","video"].includes((P=e==null?void 0:e.query)==null?void 0:P.type)?e.query.type:"",f=a?`
    <div class="card post-create" id="composer">
      <h3>Create</h3>
      <p class="muted" style="margin:0 0 10px">Pick what you’re posting — not separate tabs.</p>
      <div class="post-type-picker" role="group" aria-label="Post type">
        <button type="button" class="post-type-btn${h==="text"?" on":""}" data-type="text">
          <span class="post-type-ico" aria-hidden="true">Aa</span>
          <strong>Text</strong>
          <span class="muted">Words only</span>
        </button>
        <button type="button" class="post-type-btn${h==="picture"?" on":""}" data-type="picture">
          <span class="post-type-ico" aria-hidden="true">🖼</span>
          <strong>Picture</strong>
          <span class="muted">Photo / still</span>
        </button>
        <button type="button" class="post-type-btn${h==="short"?" on":""}" data-type="short">
          <span class="post-type-ico" aria-hidden="true">▶</span>
          <strong>Short</strong>
          <span class="muted">Vertical clip</span>
        </button>
        <button type="button" class="post-type-btn${h==="video"?" on":""}" data-type="video">
          <span class="post-type-ico" aria-hidden="true">🎬</span>
          <strong>Video</strong>
          <span class="muted">Full video</span>
        </button>
      </div>
      <div class="post-compose-body${h||m?"":" is-collapsed"}" id="postComposeBody" ${h?"":"hidden"}>
        <input type="hidden" id="postType" value="${l(h||"picture")}" />
        <p class="chip" id="postTypeChip">${l((h||"picture").charAt(0).toUpperCase()+(h||"picture").slice(1))} post</p>
        <div class="field"><label>Caption</label>
          <textarea id="postText" placeholder="Say something…" maxlength="2000"></textarea></div>
        <div class="field" id="postMediaField">
          <label id="postMediaLabel">Media link (demo)</label>
          <input id="postImg" placeholder="/music/… · YouTube URL · /merch/…" />
        </div>
        <div class="row wrap" id="postPresets" style="margin-bottom:10px">${p}</div>
        <p class="muted" id="postMediaNote" style="font-size:12px;margin:0 0 10px">TEST MODE · no real upload — paste a path or YouTube link.</p>
        <button class="btn primary" id="postSubmit">Post</button>
      </div>
    </div>`:`<div class="card"><p class="muted">Sign in from Profile to post text, a picture, short, or video.</p>
       <a class="btn primary" href="#/profile">Sign in</a></div>`,v=`
    <div class="row wrap" style="margin-bottom:12px;gap:8px">
      <a class="btn ${o==="discover"?"primary":"ghost"}" href="#/posts">Discover</a>
      <a class="btn ${o==="following"?"primary":"ghost"}" href="#/posts?tab=following">Following</a>
      <a class="btn ghost" href="#/profile/dbs">@DatBoiSkeet</a>
    </div>`,k=d.map(C=>{const B=s[C.id]||[],x=a&&B.includes(a.id),Y=i[C.id]||[],D=n&&n[C.id]||0,_=Oi(C.id),G=a&&c.has(C.userId),T=r&&r===C.id?" post-focus":"",O=a&&C.userId!==a.id?`<button class="btn ghost follow-btn" data-uid="${l(C.userId)}" data-on="${G?"1":"0"}">${G?"Following":"Follow"}</button>`:"",N=C.userId==="dbs"?'<span class="chip">house</span>':'<span class="chip">community</span>',V=C.mediaType||(C.image?"picture":"text"),ce=V==="short"?'<span class="chip">Short</span>':V==="video"?'<span class="chip">Video</span>':V==="picture"||V==="image"?'<span class="chip">Picture</span>':V==="text"?'<span class="chip">Text</span>':"",de=(()=>{const U=(C.mediaUrl||C.image||"").trim();if(!U)return"";if(V==="short"||V==="video"){const Se=/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{6,})/i.exec(U);if(Se)return`<div class="media media-video"><iframe src="https://www.youtube.com/embed/${Se[1]}?rel=0" title="post video" allowfullscreen loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>`;if(U.startsWith("http")||U.endsWith(".mp4")||U.endsWith(".webm"))return`<video class="media" src="${l(U)}" controls playsinline preload="metadata"></video>`}return`<img class="media" src="${l(U)}" alt="" loading="lazy" />`})();return`
      <article class="post${T}" data-id="${l(C.id)}" id="post-${l(C.id)}">
        <div class="meta">
          <a class="avatar" href="#/profile/${l(C.userId)}">${l((C.username||"?")[0].toUpperCase())}</a>
          <div class="spacer">
            <div class="who"><a href="#/profile/${l(C.userId)}">${l(C.username)}</a> ${N}${ce}</div>
            <div class="when">${K(C.at)}${_>=5?` · <span class="hot-inline">🔥 ${_}</span>`:""}</div>
          </div>
          ${O}
        </div>
        <p class="body-text">${l(C.text)}</p>
        ${de}
        <div class="post-actions">
          <button class="btn like-btn ${x?"primary":""}" data-id="${l(C.id)}">
            ♥ ${B.length}
          </button>
          <button class="btn ghost comment-toggle" data-id="${l(C.id)}">💬 ${Y.length}</button>
          <button class="btn ghost share-btn" data-id="${l(C.id)}" title="Share (demo count)">↗ ${D}</button>
        </div>
        <div class="comments" id="c-${l(C.id)}" hidden>
          ${Y.map(U=>`<div class="comment"><b>${l(U.username)}</b> ${l(U.text)}</div>`).join("")||'<div class="muted">No comments yet</div>'}
          ${a?`<div class="row" style="margin-top:8px">
                  <input class="c-input" data-id="${l(C.id)}" placeholder="Add a comment…" style="flex:1;background:#0e0e14;border:1px solid var(--line);border-radius:12px;padding:8px 10px" />
                  <button class="btn primary c-send" data-id="${l(C.id)}">Send</button>
                </div>`:""}
        </div>
      </article>`}).join(""),b=o==="following"?'<div class="card muted">No posts from people you follow yet. Discover feed has official drops.</div>':'<div class="card muted">No posts yet.</div>';return I("Posts",Gu()+f+v+(k||b),{lead:"Post Text, a Picture, Short, or Video · Shorts live here (not separate tabs) · Hot strip ranks engagement."})}function Uu(e){var c;const t=e.querySelector(".post-focus");if(t)try{t.scrollIntoView({behavior:"smooth",block:"center"})}catch{}else typeof location<"u"&&(location.hash.includes("compose=1")||location.hash.includes("type="))&&setTimeout(()=>{var d;return(d=e.querySelector("#composer"))==null?void 0:d.scrollIntoView({behavior:"smooth",block:"start"})},50);const s=e.querySelector("#postComposeBody"),i=e.querySelector("#postType"),a=e.querySelector("#postTypeChip"),n=e.querySelector("#postMediaLabel"),o=e.querySelector("#postPresets");function r(d){const p=d||"picture";e.querySelectorAll(".post-type-btn").forEach(v=>v.classList.toggle("on",v.dataset.type===p)),i&&(i.value=p),a&&(a.textContent=p.charAt(0).toUpperCase()+p.slice(1)+" post");const m=e.querySelector("#postMediaField"),h=e.querySelector("#postMediaNote"),f=p==="text";m&&(m.hidden=f),h&&(h.hidden=f),n&&!f&&(n.textContent=p==="short"?"Short clip link (YouTube / demo path)":p==="video"?"Video link (YouTube / demo path)":"Picture link (demo path)"),o&&(o.hidden=p!=="picture"),s&&(s.hidden=!1,s.classList.remove("is-collapsed"))}e.querySelectorAll(".post-type-btn").forEach(d=>{d.addEventListener("click",()=>r(d.dataset.type))}),i!=null&&i.value&&r(i.value),e.querySelectorAll(".preset-img").forEach(d=>{d.addEventListener("click",()=>{const p=e.querySelector("#postImg");p&&(p.value=d.dataset.src||""),g("Picture selected")})}),(c=e.querySelector("#postSubmit"))==null||c.addEventListener("click",()=>{var d,p;try{const m=(d=e.querySelector("#postText"))==null?void 0:d.value,h=(i==null?void 0:i.value)||"picture",f=(((p=e.querySelector("#postImg"))==null?void 0:p.value)||"").trim();if(h==="text"){if(!(m!=null&&m.trim()))return g("Write some words for a Text post");dn({text:m.trim(),mediaType:"text"}),g("Text posted"),_t();return}if(!(m!=null&&m.trim())&&!f)return g("Add a caption or media");if((h==="short"||h==="video")&&!f)return g("Add a "+h+" link (TEST MODE)");dn({text:m||(h==="picture"?"Photo":h==="short"?"Short":"Video"),image:h==="picture"?f:"",mediaType:h,mediaUrl:f}),g(h.charAt(0).toUpperCase()+h.slice(1)+" posted"),_t()}catch(m){g(m.message||"Could not post")}}),e.querySelectorAll(".like-btn").forEach(d=>{d.addEventListener("click",()=>{if(Bl(d.dataset.id).error)return g("Sign in to like");_t()})}),e.querySelectorAll(".comment-toggle").forEach(d=>{d.addEventListener("click",()=>{const p=e.querySelector("#c-"+d.dataset.id);p&&(p.hidden=!p.hidden)})}),e.querySelectorAll(".c-send").forEach(d=>{d.addEventListener("click",()=>{var v;const p=d.dataset.id,m=e.querySelector(`.c-input[data-id="${p}"]`),h=(v=m==null?void 0:m.value)==null?void 0:v.trim();if(!h)return;if(Rl(p,h).error)return g("Sign in to comment");g("Comment added"),_t()})}),e.querySelectorAll(".share-btn").forEach(d=>{d.addEventListener("click",async()=>{var f;const p=d.dataset.id;if(bo(p).error)return g("Could not share");const h=`${location.origin}${location.pathname}#/posts?focus=${encodeURIComponent(p)}`;try{(f=navigator.clipboard)!=null&&f.writeText&&await navigator.clipboard.writeText(h),g("Shared · link copied (TEST MODE)")}catch{g("Shared · count +1 (TEST MODE)")}_t()})}),e.querySelectorAll(".follow-btn").forEach(d=>{d.addEventListener("click",()=>{const p=d.dataset.uid,m=d.dataset.on==="1";if((m?wi(p):ki(p)).error)return g("Sign in to follow");g(m?"Unfollowed":"Following"),_t()})})}const Hu={"Premium Spotlight":"spotlight","Featured Box":"featured","Promo Box":"promo"},zu=(e,t)=>Hu[t.name]||(mr[e.id]?e.id:null);function Wu(){const e=ai.map(t=>`
    <section class="pikk-promote-group" id="promote-${t.id}" data-promote-section="${t.id}" aria-labelledby="promote-${t.id}-h">
      <div class="pikk-promote-head"><h3 id="promote-${t.id}-h">${l(t.title)}</h3>${t.gate?`<span class="chip pikk-promote-gate">${l(t.gate)}</span>`:""}</div>
      <ul class="pikk-promote-items">${t.items.map(s=>{const i=zu(t,s),a=i?Al(mr[i],El[i]):null;return`<li data-promote-option${a?` data-slots="${i}" data-sold-out="${a.soldOut}"`:""}><span>${l(s.name)}</span><span class="pikk-promote-tiers">${xl(s).map(n=>`<small data-price>${l(n)}</small>`).join("")}${a?`<small class="pikk-promote-slots${a.soldOut?" is-sold-out":""}" data-slot-label>${l(a.label)} · TEST MODE (no bookings yet)</small>`:""}</span><button type="button" class="btn ghost" data-promote-book="${l(s.name)}"${a&&a.soldOut?' disabled aria-disabled="true"':""} aria-label="Promote ${l(s.name)} (${a&&a.soldOut?"sold out":"coming soon"})">${a&&a.soldOut?"Sold out":"Promote"}</button></li>`}).join("")}</ul>
      <a class="pikk-promote-open" href="${t.link}">Open ${l(t.title)} →</a>
    </section>`).join("");return I("Promote on PIKK",`
    <p class="pikk-promote-intro">Choose what to promote. Prices are introductory previews. <strong>Booking and checkout are Coming soon</strong> until secure payments (Stripe) are live; nothing is charged and no views are guaranteed.</p>
    <nav class="pikk-promote-jump" aria-label="Promote sections">${ai.map(t=>`<a class="chip" href="#/promote?s=${t.id}">${l(t.title)}</a>`).join("")}</nav>
    ${jo()}
    <div class="pikk-promote-groups">${e}</div>`,{badge:"TEST MODE · Coming soon"})}function Yu(e=document){e.addEventListener("click",s=>{const i=s.target.closest("[data-promote-book]");if(i){if(s.preventDefault(),i.disabled||i.closest('[data-sold-out="true"]')){g(`${i.dataset.promoteBook} · Sold out for this window`);return}g(`${i.dataset.promoteBook} · Coming soon, no payment taken`)}});const t=new URLSearchParams(location.hash.split("?")[1]||"").get("s");t&&ai.some(s=>s.id===t)&&setTimeout(()=>{var s;return(s=document.getElementById("promote-"+t))==null?void 0:s.scrollIntoView({block:"start"})},60)}function Ju(){return I("Donate",`<section class="card home-app-goal home-app-goal-full">
    <p class="kicker">PIKK daily app goal · 24h</p>
    <div id="homeAppGoalBody">${Vo(ri())}</div>
    <p class="chip" style="margin-top:10px">TEST MODE · demo coins only · no real payments</p>
  </section>`,{badge:"TEST MODE"})}const Qu=e=>Uo(e),Xu=Object.freeze([{id:"donate",title:"Donate",detail:"PIKK daily app goal · TEST MODE demo coins",href:"#/donate"},{id:"donate-live",title:"Creator & host goals",detail:"Live goals on streams · TEST MODE",href:"#/live"},{id:"coins",title:"Buy coins & gifts",detail:"Coin packs and gifts · Coming soon until Stripe",soon:!0},{id:"promote",title:"Promote bookings",detail:"Placements and boosts · booking Coming soon",href:"#/promote"},{id:"shop",title:"Shop orders & checkout",detail:"Merch checkout on the merchant site; in-app orders Coming soon",href:"#/shop"},{id:"subs",title:"Subscriptions & fan clubs",detail:"Creator fan clubs · TEST MODE",href:"#/fanclubs"},{id:"membership",title:"PIKK memberships",detail:"Plans preview · no billing yet",href:"#/pricing"},{id:"tips",title:"Tips",detail:"Tip creators · Coming soon until Stripe",soon:!0},{id:"wallet",title:"Wallet balance",detail:"Demo coin balance · TEST MODE",href:"#/wallet"},{id:"payouts",title:"Payouts & earnings",detail:"Creator earnings preview · payouts Coming soon",href:"#/earnings"},{id:"history",title:"Payment history",detail:"Receipts and refunds · Coming soon until Stripe",soon:!0}]);function Zu(){const e=Xu.map(t=>t.href?`<a class="pikk-pay-item" href="${t.href}" data-pay="${t.id}"><span class="pikk-pay-ico" aria-hidden="true">$</span><span><strong>${l(t.title)}</strong><small>${l(t.detail)}</small></span><span aria-hidden="true">→</span></a>`:`<div class="pikk-pay-item is-soon" data-pay="${t.id}" data-coming-soon role="button" tabindex="0"><span class="pikk-pay-ico" aria-hidden="true">$</span><span><strong class="pikk-menu-title">${l(t.title)}</strong><small>${l(t.detail)}</small></span><span class="chip">Coming soon</span></div>`).join("");return I("Payments",`<p class="pikk-pay-intro">Everything money on PIKK in one place. <strong>No real payments are processed yet</strong>; secure checkout (Stripe) is Coming soon. Balances are TEST MODE demo coins.</p><div class="pikk-pay-list">${e}</div>`,{badge:"TEST MODE"})}function em(){}function Bn(e){R(e)}const da={apple:"Apple Music",spotify:"Spotify",youtubeMusic:"YouTube Music",youtube:"YouTube",tidal:"Tidal",amazon:"Amazon Music"};function zo(e){if(!e||typeof e!="object")return{};const t={};for(const s of Object.keys(da)){const i=String(e[s]||"").trim();(i.startsWith("http://")||i.startsWith("https://"))&&(t[s]=i)}return t}function tm(e){const t=zo(e),s=Object.keys(da).filter(i=>t[i]);return s.length?s.map(i=>`<a class="btn stream-plat stream-plat-${l(i)}" href="${l(t[i])}" target="_blank" rel="noopener">${l(da[i])}</a>`).join(""):'<span class="muted" style="font-size:12px">No platform links yet</span>'}function sm(e){try{const t=new URL(e);return t.protocol!=="https:"||t.hostname!=="music.apple.com"||!/^\/[a-z]{2}(?:-[a-z]{2})?\/(?:song|album)\//i.test(t.pathname)?"":"https://embed.music.apple.com"+t.pathname+t.search}catch{return""}}function Ji(e){var o;const t=e.cover?`<img class="stream-cover" src="${l(e.cover)}" alt="${l(e.title)}" loading="lazy" referrerpolicy="no-referrer" />`:'<div class="stream-cover stream-cover-empty" aria-hidden="true">♪</div>',s=e.albumNote?`<div class="muted" style="font-size:11px">${l(e.albumNote)}</div>`:"",i=e.year?` · ${l(String(e.year))}`:"",a=sm((o=e.links)==null?void 0:o.apple),n=a?`<details class="apple-music-embed"><summary>▶ Play in PIKK · Apple Music</summary><iframe title="Apple Music player for ${l(e.title)}" src="${l(a)}" loading="lazy" allow="autoplay *; encrypted-media *; fullscreen *" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation" style="width:100%;height:175px;border:0;border-radius:12px"></iframe><small class="muted">Apple controls playback availability. Full listening may require Apple Music.</small></details>`:"";return`
    <article class="stream-release">
      ${t}
      <div class="stream-meta">
        <span class="chip">${l(e.type||"release")}</span>
        <strong>${l(e.title)}</strong>
        <div class="muted" style="font-size:12px">${l(e.artist||"DatBoiSkeet")}${i}</div>
        ${s}
        ${n}
        <div class="stream-plats">${tm(e.links)}</div>
      </div>
    </article>`}function Rn(e){return e==="inner"?"Inner Circle":e==="backstage"?"Backstage":e==="skeet+"?"Skeet+":"None"}function im(e){return vl.map(t=>{const s=t.tier==="backstage"||t.tier==="inner";return e&&aa(s?"backstage":"skeet")?`
      <article class="vault-card unlocked" data-id="${l(t.id)}">
        <img src="${l(t.cover)}" alt="${l(t.title)}" />
        <div class="vault-meta">
          <span class="chip" style="border-color:#2a4a3a;color:#8dffb0">Unlocked</span>
          <strong>${l(t.title)}</strong>
          <div class="muted" style="font-size:12px">${l(t.artist)} · ${l(t.status)}</div>
          <div class="muted" style="font-size:11px">Requires ${l(t.tier)} · no audio yet</div>
        </div>
      </article>`:`
      <article class="vault-card locked" data-id="${l(t.id)}">
        <div class="vault-art">
          <img src="${l(t.cover)}" alt="${l(t.title)}" />
          <div class="vault-lock-badge" aria-hidden="true">🔒</div>
        </div>
        <div class="vault-meta">
          <span class="chip">Locked</span>
          <strong>${l(t.title)}</strong>
          <div class="muted" style="font-size:12px">${l(t.artist)}</div>
          <div class="muted" style="font-size:11px">Join ${l(t.tier)} to unlock</div>
        </div>
      </article>`}).join("")}function jn(e={}){var A;const t=["songs","albums","beats","playlists","upload"].includes((A=e.query)==null?void 0:A.view)?e.query.view:"",{user:s}=M(),i=Tt(),a=aa("skeet"),n=new Set((s==null?void 0:s.purchasedTracks)||[]),o=Bt.map(w=>`
    <div class="cover-card" style="flex:0 0 160px">
      <span class="badge-cs">${l(w.status)}</span>
      <img src="${l(w.cover)}" alt="${l(w.title)}" style="width:160px;height:160px" />
      <div class="t">${l(w.title)}</div>
      <div class="muted" style="font-size:11px">${l(w.artist)}</div>
    </div>`).join(""),r=dr.map(w=>{const P=w.id==="skeet"?"skeet+":w.id==="inner"?"inner":w.id,C=i===P;return`
    <div class="card" style="margin:0">
      <h3>${l(w.name)}</h3>
      <div class="price" style="font-size:22px;font-weight:900">$${w.price}<span class="muted" style="font-size:13px">/mo</span></div>
      <p class="muted">${l(w.blurb)}</p>
      ${s?C?`<button type="button" class="btn ghost block mem-toggle" data-tier="${l(w.id)}" data-on="1">Active · tap to cancel (demo)</button>`:`<button type="button" class="btn primary block mem-toggle" data-tier="${l(w.id)}" data-on="0">Join · TEST MODE</button>`:'<a class="btn primary block" href="#/profile">Sign in to join</a>'}
    </div>`}).join(""),c=rn.filter(w=>n.has(w.id)),d=rn.map(w=>{const P=n.has(w.id);return`
      <div class="card" style="margin:0;display:flex;gap:12px;align-items:center">
        <img src="${l(w.cover)}" alt="" style="width:72px;height:72px;border-radius:10px;object-fit:cover;flex:0 0 72px" />
        <div class="spacer">
          <strong>${l(w.title)}</strong>
          <div class="muted" style="font-size:12px">${l(w.artist)} · ${l(w.status)}</div>
          <div style="font-weight:800;margin-top:4px">$${w.price.toFixed(2)}</div>
        </div>
        ${s?P?'<span class="chip">In My Music</span>':`<button type="button" class="btn primary buy-track" data-id="${l(w.id)}">Buy · demo</button>`:'<a class="btn" href="#/profile">Sign in</a>'}
      </div>`}).join(""),p=Et({publishedOnly:!0,types:["song","album"]}),m=p.map(w=>{const P=zo(w.streamingLinks||{});return Object.keys(P).length?{id:w.id,title:w.title,artist:w.artist,type:w.type||"song",cover:w.coverRef&&!String(w.coverRef).startsWith("idb:")?w.coverRef:"",links:P,fromAdmin:!0}:null}).filter(Boolean),h=[...Qe,...m];let f="";if(t==="songs"||t==="albums"){const w=t==="albums",P=h.filter(C=>w?C.type==="album":C.type==="single"||C.type==="song");f=`<div class="card" id="music-focused-view">
      <h2>${w?"Albums":"Songs"}</h2>
      <p class="muted">Verified releases and available official listening links.</p>
      <div class="stream-grid">${P.map(Ji).join("")||'<p class="muted">No releases listed in this category yet.</p>'}</div>
      <a class="btn ghost" href="#/music">Music overview</a>
    </div>`}else if(t==="playlists")f=`<div class="card" id="music-focused-view">
      <h2>Playlists</h2>
      <p class="muted">Official YouTube playlists open on YouTube. No rehosted audio.</p>
      <div class="row wrap" style="gap:8px">
        ${sa.map(w=>`<a class="btn ghost" href="${l(w.youtube)}" target="_blank" rel="noopener">${l(w.title)}</a>`).join("")}
      </div>
      <a class="btn ghost" href="#/music">Music overview</a>
    </div>`;else if(t==="beats"||t==="upload"){const w=t==="upload";f=`<div class="card" id="music-focused-view">
      <h2>${w?"Upload Music":"Beats"}</h2>
      <p class="muted">Not available yet · TEST MODE. ${w?"Creator music uploads require secure storage, ownership verification and publishing tools.":"The producer beat marketplace and licensing checkout are still in development."}</p>
      <a class="btn ghost" href="#/music">Music overview</a>
    </div>`}const v=p.length?`<div class="card catalog-admin-music">
        <h2>From Admin</h2>
        <p class="muted">Published songs &amp; albums added in Admin · TEST MODE (device-local).</p>
        <div class="cover-row">${p.map(w=>`
          <div class="cover-card catalog-item" data-id="${l(w.id)}" style="flex:0 0 160px">
            <span class="badge-cs">${l(w.type)}</span>
            <img data-idb-src="${l(w.coverRef||"")}" src="${l(w.coverRef&&!w.coverRef.startsWith("idb:")?w.coverRef:"")}" alt="${l(w.title)}" style="width:160px;height:160px;object-fit:cover;background:#111" />
            <div class="t">${l(w.title)}</div>
            <div class="muted" style="font-size:11px">${l(w.artist)}</div>
            ${w.mediaRef?`<audio class="catalog-audio" data-idb-src="${l(w.mediaRef)}" controls preload="none" style="width:100%;margin-top:6px"></audio>`:""}
          </div>`).join("")}</div>
      </div>`:"",k=Qe.find(w=>w.cover)||null,b=Qe.filter(w=>w.cover).slice(0,5),$=`
    ${`
    <section class="pikk-music-showcase card" aria-label="Official PIKK music discovery">
      <div class="pikk-music-showcase-copy">
        <p class="kicker">PIKK MUSIC · DATBOISKEET</p>
        <h2>Discover the sound.</h2>
        <p>Stream verified releases, browse albums and playlists, and explore the Vault.</p>
        <div class="pikk-music-showcase-actions">
          <a class="btn primary" href="#/music?view=songs">Listen to Songs</a>
          <a class="btn ghost" href="#/music?view=albums">Browse Albums</a>
        </div>
        <span class="pikk-music-showcase-note">Official listening destinations · TEST MODE for purchases and memberships</span>
      </div>
      ${k?`<div class="pikk-music-showcase-art"><img src="${l(k.cover)}" alt="${l(k.title)} official cover" decoding="async" loading="eager"/><span>${l(k.title)}</span></div>`:""}
    </section>
    <nav class="pikk-music-categories" aria-label="Music categories">
      <a href="#/music?view=songs" class="${t==="songs"?"on":""}">Songs</a>
      <a href="#/music?view=albums" class="${t==="albums"?"on":""}">Albums</a>
      <a href="#/music?view=beats" class="${t==="beats"?"on":""}">Beats</a>
      <a href="#/music?view=playlists" class="${t==="playlists"?"on":""}">Playlists</a>
      <a href="#/music#vault">Vault</a>
      <a href="#/ai-artists">AI Artists · Clearly labeled</a>
      <a href="#/shield">PIKK Shield · Rights preview</a>
    </nav>
    <section class="pikk-music-release-strip" aria-label="Official music covers">
      <div class="pikk-music-release-header"><h3>Listen &amp; discover</h3><a href="#/music#stream-everywhere">See all releases →</a></div>
      <div class="pikk-music-release-row">
        ${b.map(w=>`<a class="pikk-music-release-tile" href="#/music#stream-everywhere">
          <img src="${l(w.cover)}" alt="${l(w.title)} cover" loading="lazy" decoding="async"/>
          <strong>${l(w.title)}</strong>
          <small>${l(w.artist||"DatBoiSkeet")}</small>
        </a>`).join("")}
      </div>
    </section>`}
    ${f}
    <div class="card">
      <h2>Upcoming Releases</h2>
      <p class="muted">Real DatBoiSkeet cover art · playback unlocks when released. No fake tracks.</p>
      <div class="cover-row">${o}</div>
    </div>
    ${v}


    <div class="card" id="youtube-mixes">
      <h2>YouTube Mixes · Channel</h2>
      <p class="muted">Dogs &amp; mixes stream from the <strong>original YouTube source</strong> (embeds / Play on YouTube). Not rehosted. Released catalog still uses Stream Everywhere below.</p>
      <div class="row wrap" style="gap:8px;margin:10px 0 14px">
        <a class="btn" href="${l(ue.youtube)}" target="_blank" rel="noopener">Official channel</a>
        <a class="btn ghost" href="${l(ue.youtubeHandle)}" target="_blank" rel="noopener">@DatBoiSkeet1</a>
        ${sa.map(w=>`<a class="btn ghost" href="${l(w.youtube)}" target="_blank" rel="noopener">${l(w.title)}</a>`).join("")}
      </div>
      <div class="yt-mix-grid">
        ${ba.map(w=>`
          <article class="yt-mix-card">
            <div class="hero-video" style="margin:0 0 10px">
              <iframe src="${l(Xe(w.embed))}" title="${l(w.title)}" allowfullscreen loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            </div>
            <h3 style="margin:0 0 6px">${l(w.title)}</h3>
            <p class="muted" style="margin:0 0 10px;font-size:13px">${l(w.blurb||"")}</p>
            <a class="btn" href="${l(w.youtube)}" target="_blank" rel="noopener">Play on YouTube</a>
          </article>`).join("")}
      </div>
    </div>

    <div class="card" id="stream-everywhere">
      <h2>Featured · Stream Everywhere</h2>
      <p class="muted">Official DatBoiSkeet releases — Apple Music is the primary listening destination: use the Apple-hosted player on supported releases or open the song in Apple Music. Other verified platforms are optional. Full Apple Music playback may require a subscription. External streams are not rehosted in-app. Separate from Vault &amp; purchases.</p>
      <div class="stream-artist row wrap" style="gap:8px;margin:10px 0 14px">
        <span class="chip">Artist</span>
        <a class="btn stream-plat stream-plat-apple" href="${l(ue.apple)}" target="_blank" rel="noopener">Apple Music · Listen</a>
        <a class="btn ghost stream-plat stream-plat-spotify" href="${l(ue.spotify)}" target="_blank" rel="noopener">Spotify · Alternative</a>
        <a class="btn stream-plat stream-plat-youtubeMusic" href="${l(ue.youtubeMusic)}" target="_blank" rel="noopener">YouTube Music</a>
        <a class="btn stream-plat stream-plat-youtube" href="${l(ue.youtube)}" target="_blank" rel="noopener">YouTube</a>
      </div>
      <div class="stream-grid">
        ${Qe.map(Ji).join("")}
        ${m.map(Ji).join("")}
      </div>
      <p class="muted" style="margin-top:12px;font-size:12px">Tidal / Amazon Music omitted until official links are verified. Admin can add more via streaming link fields.</p>
    </div>

    <div class="card">
      <h2>My Music</h2>
      <p class="muted">Purchases stay here even if membership ends.</p>
      ${c.length?`<div class="cover-row">${c.map(w=>`
            <div class="cover-card" style="flex:0 0 120px">
              <img src="${l(w.cover)}" alt="${l(w.title)}" style="width:120px;height:120px" />
              <div class="t">${l(w.title)}</div>
              <div class="muted" style="font-size:11px">Owned · Coming Soon</div>
            </div>`).join("")}</div>`:'<p class="muted">Nothing purchased yet. Buy a Coming Soon cover below (demo · no charge).</p>'}
    </div>

    <div class="card">
      <h2>Buy (demo)</h2>
      <p class="muted">TEST MODE — no charges. Marks the cover as owned in My Music. Audio not available until release.</p>
      <div style="display:flex;flex-direction:column;gap:10px">${d}</div>
    </div>

    <div class="card" id="vault">
      <h2>Vault ${a?'<span class="chip" style="border-color:#2a4a3a;color:#8dffb0">Unlocked · '+l(Rn(i))+"</span>":'<span class="chip">Locked</span>'}</h2>
      <p class="muted">Exclusive unreleased tracks &amp; previews for members. Nested under Music — not a bottom-nav tab.</p>

      <div class="vault-grid" style="margin:12px 0">
        ${im(a)}
      </div>

      ${a?`<div class="vault-lock" style="border-style:solid;border-color:#2a4a3a;color:var(--tx)">
              ✅ Membership active: <strong>${l(Rn(i))}</strong>. Exclusive cards above are unlocked.
              Cancel anytime with the tier button below (demo). Purchased My Music items are kept.
            </div>`:`<div class="vault-lock">
              🔒 Vault locked. Sign in, then tap <strong>Join · TEST MODE</strong> on Skeet+ or Backstage below.
              Locked cards show title/cover only — no exclusive content until you join.
            </div>`}

      <h3 style="margin:16px 0 8px">Membership (TEST MODE)</h3>
      <div class="grid-2">${r}</div>
    </div>

  `;return I("Music & Vault",$,{lead:"Singles, albums, Coming Soon, and member Vault."})}function Kn(e){const t=e.querySelector("#youtube-mixes")||e;qi(t),e.querySelectorAll(".mem-toggle").forEach(s=>{s.addEventListener("click",i=>{i.preventDefault();const a=s.dataset.on==="1",n=yi(s.dataset.tier,!a);if(n!=null&&n.error)return g("Sign in required — open Profile first");g(a?"Membership cancelled (demo) · My Music purchases kept":`Joined ${s.dataset.tier} (TEST MODE) · Vault unlocked`),Bn("#/music"),setTimeout(()=>{var o;return(o=document.getElementById("vault"))==null?void 0:o.scrollIntoView({behavior:"smooth",block:"start"})},40)})}),e.querySelectorAll(".buy-track").forEach(s=>{s.addEventListener("click",i=>{i.preventDefault();const a=Nl(s.dataset.id);if(a!=null&&a.error)return g("Sign in required");g("Added to My Music (demo · no charge)"),Bn("#/music")})}),e.querySelectorAll("[data-idb-src]").forEach(async s=>{const i=s.getAttribute("data-idb-src");if(!i)return;const a=await Ni(i);a&&(s.tagName==="IMG"||s.tagName==="AUDIO"||s.tagName==="VIDEO")&&(s.src=a)})}const za="pikk_ai_artists_local_drafts_v1",Wo=Object.freeze(["Fully AI-generated music","AI-assisted music with human performance","Human-made music with AI artwork only"]),am="AI-generated or AI-assisted";function nm(e,t=Date.now()){const s=String(e.artist||"").trim().slice(0,80),i=String(e.track||"").trim().slice(0,120),a=String(e.creation||""),n=String(e.description||"").trim().slice(0,600),o=Number(e.price);if(!s||!i||!Wo.includes(a)||!e.confirmed)throw Error("Artist, title, creation type and honest AI disclosure are required.");if(!Number.isFinite(o)||o<0||o>100)throw Error("Preview price must be between $0 and $100.");return{id:"ai-draft-"+t+"-"+Math.random().toString(36).slice(2,8),artist:s,track:i,creation:a,description:n,price:o,createdAt:t,status:"Private local draft · not published",disclosure:am}}function Wa(e){try{const t=JSON.parse(e.getItem(za)||"[]");return Array.isArray(t)?t.filter(s=>s&&typeof s.id=="string").slice(0,40):[]}catch{return[]}}function rm(e,t){const s=[t,...Wa(e)].slice(0,40);return e.setItem(za,JSON.stringify(s)),s}function om(e,t){const s=Wa(e).filter(i=>i.id!==t);return e.setItem(za,JSON.stringify(s)),s}function lm(){const e=Wa(window.localStorage),t=e.length?e.map(s=>`<article class="card ai-artist-draft"><div class="row wrap"><strong>${l(s.track)}</strong><span class="chip">AI · ${l(s.creation)}</span></div><p class="muted">by ${l(s.artist)} · Preview price $${s.price.toFixed(2)}</p><p class="muted">${l(s.status)}</p><button type="button" class="btn ghost ai-artist-delete" data-id="${l(s.id)}">Delete draft</button></article>`).join(""):'<p class="muted">No AI music drafts saved on this device. This is not a public music catalog.</p>';return I("PIKK AI Artists",`
  <div class="ai-artist-studio">
   <header class="ai-artist-hero"><span class="ai-artist-kicker">PIKK MUSIC · DISTINCT AI CREATOR SPACE</span><h2>AI creativity. Clearly labeled.</h2><p>AI artists can build communities and, once commerce launches, offer songs for purchase. Human musicians remain clearly distinguished in the main music experience.</p><p class="ai-artist-caution"><strong>EARLY ACCESS / TEST MODE:</strong> No AI audio uploads, public profiles, followers, streams or song sales are enabled here yet. Drafts are stored only on this device. Setting a price does not activate checkout.</p></header>
   <div class="ai-artist-policies">
    <article class="card"><h3>AI Artists discovery</h3><p>A separate, opt-in category for fully AI-generated songs and virtual performers, with obvious AI labels on tracks and profiles.</p></article>
    <article class="card"><h3>Real artists stay distinct</h3><p>Human-made music remains clearly identified. AI-assisted works are labeled by their actual contribution; declaring AI artwork alone does not make the song AI-generated.</p></article>
    <article class="card"><h3>Fans and music purchases</h3><p>Planned: follow AI artists, comment, share, listen and buy clearly licensed tracks to keep permanently. No live payments are available in this preview.</p></article>
    <article class="card"><h3>Ownership and safety</h3><p>Creators must disclose AI use, confirm commercial rights and avoid impersonating real artists or cloning voices without permission. Review and appeals will be required before sales.</p></article>
   </div>
   <div class="ai-artist-columns">
    <section class="card ai-artist-panel"><h3>Prepare an AI artist listing</h3><p class="muted">Save a private demo draft. This does not upload music or make it searchable by other users.</p>
     <form id="aiArtistForm">
       <div class="field"><label for="aiArtistName">Artist / virtual artist name *</label><input id="aiArtistName" name="artist" maxlength="80" required /></div>
       <div class="field"><label for="aiTrackName">Song title *</label><input id="aiTrackName" name="track" maxlength="120" required /></div>
       <div class="field"><label for="aiCreationType">How was this made? *</label><select id="aiCreationType" name="creation">${Wo.map(s=>`<option value="${l(s)}">${l(s)}</option>`).join("")}</select></div>
       <div class="field"><label for="aiPreviewPrice">Planned purchase price in USD (preview only)</label><input id="aiPreviewPrice" name="price" type="number" min="0" max="100" step=".01" value="1.00" required /></div>
       <div class="field"><label for="aiDescription">Description (optional)</label><textarea id="aiDescription" name="description" maxlength="600"></textarea></div>
       <label class="ai-artist-certify"><input type="checkbox" id="aiArtistCertify" required /> I accurately disclosed the use of AI and confirm I hold or can obtain the necessary commercial rights, including voice and likeness permissions.</label>
       <button type="submit" class="btn primary">Save private AI music draft</button>
     </form>
    </section>
    <section class="card ai-artist-panel"><h3>My private drafts (${e.length})</h3><div class="ai-artist-drafts">${t}</div><p class="muted">A real AI Artist storefront, public discovery feed and licensed downloadable sales require backend, payments and rights verification.</p></section>
   </div>
  </div>`,{lead:"Dedicated AI music category · Disclosure first"})}function cm(e){var t;(t=e.querySelector("#aiArtistForm"))==null||t.addEventListener("submit",s=>{s.preventDefault();const i=s.currentTarget;try{const a=nm({artist:i.elements.artist.value,track:i.elements.track.value,creation:i.elements.creation.value,price:i.elements.price.value,description:i.elements.description.value,confirmed:e.querySelector("#aiArtistCertify").checked});rm(window.localStorage,a),g("Private AI artist draft saved · not published"),location.hash==="#/ai-artists"&&(location.hash="#/ai-artists?updated=1"),window.dispatchEvent(new HashChangeEvent("hashchange"))}catch(a){g(a.message)}}),e.querySelectorAll(".ai-artist-delete").forEach(s=>s.addEventListener("click",()=>{om(window.localStorage,s.dataset.id),window.dispatchEvent(new HashChangeEvent("hashchange"))}))}const Bi="pikk_shield_intake_v1",fi=30,Ya=Object.freeze(["Original creator","Licensed with permission","Authorized representative"]);function Kt(e){const t=String(e||"").trim();if(!t)return"";try{const s=new URL(t);return["https:","http:"].includes(s.protocol)?s.href:""}catch{return""}}function dm(e,t=Date.now()){const s=String(e.title||"").trim().slice(0,120),i=String(e.owner||"").trim().slice(0,100),a=String(e.rights||""),n=String(e.contact||"").trim().slice(0,180),o=String(e.notes||"").trim().slice(0,800),r=Kt(e.source);if(!s||!i||!n||!Ya.includes(a)||!e.certified)throw new Error("Complete title, rights holder, contact, ownership basis and certification.");if(String(e.source||"").trim()&&!r)throw new Error("Use a valid http or https link.");return{id:"shield-"+t+"-"+Math.random().toString(36).slice(2,8),type:"rights-declaration",title:s,owner:i,rights:a,contact:n,notes:o,source:r,at:t,status:"Local draft — not submitted"}}function Ht(e){try{const t=JSON.parse(e.getItem(Bi)||"[]");return Array.isArray(t)?t.filter(s=>s&&s.type==="rights-declaration").slice(0,fi):[]}catch{return[]}}function pm(e,t){const s=[t,...Ht(e)].slice(0,fi);return e.setItem(Bi,JSON.stringify(s)),s}function um(e,t){const s=Ht(e).filter(i=>i.id!==t);return e.setItem(Bi,JSON.stringify(s)),s}function mm(e){const t=Ht(e).map(s=>({id:String(s.id||""),type:"rights-declaration",title:String(s.title||""),owner:String(s.owner||""),rights:String(s.rights||""),contact:String(s.contact||""),notes:String(s.notes||""),source:Kt(s.source),at:Number.isFinite(s.at)?s.at:null,status:"Local draft — not submitted"}));return JSON.stringify({format:"PIKK Shield local rights drafts",version:1,drafts:t},null,2)}function hm(e,t){if(typeof t!="string"||t.length>65536)throw new Error("Backup file must be under 64 KB.");let s;try{s=JSON.parse(t)}catch{throw new Error("Invalid JSON backup file.")}if(!s||s.format!=="PIKK Shield local rights drafts"||s.version!==1||!Array.isArray(s.drafts)||s.drafts.length>fi)throw new Error("Not a supported PIKK Shield backup (maximum 30 drafts).");const i=s.drafts.map((c,d)=>{if(!c||typeof c!="object"||Array.isArray(c))throw new Error("Invalid draft in backup.");for(const p of["id","title","owner","rights","contact","notes","source"])if(typeof c[p]!="string")throw new Error("Invalid draft field: "+p);if(!/^shield-[a-zA-Z0-9-]{1,80}$/.test(c.id)||!c.title.trim()||c.title.length>120||!c.owner.trim()||c.owner.length>100||!Ya.includes(c.rights)||!c.contact.trim()||c.contact.length>180||c.notes.length>800||c.source&&(!Kt(c.source)||Kt(c.source)!==c.source)||c.at!==null&&(!Number.isFinite(c.at)||c.at<0))throw new Error("Backup draft "+(d+1)+" contains invalid fields.");return{id:c.id,type:"rights-declaration",title:c.title.trim(),owner:c.owner.trim(),rights:c.rights,contact:c.contact.trim(),notes:c.notes,source:Kt(c.source),at:c.at??Date.now(),status:"Local draft — not submitted"}}),a=Ht(e),n=new Set(a.map(c=>c.id)),o=[];for(const c of i)n.has(c.id)||(n.add(c.id),o.push(c));const r=o.slice(0,Math.max(0,fi-a.length));return r.length&&e.setItem(Bi,JSON.stringify([...r,...a])),{added:r.length,duplicates:i.length-o.length,total:Ht(e).length}}const gm=()=>Ht(window.localStorage);function fm(){const e=gm(),t=e.length?e.map(s=>{const i=Kt(s.source);return`
    <article class="card shield-entry" data-shield-id="${l(s.id)}" data-shield-search="${l(`${s.title||""} ${s.owner||""}`.toLocaleLowerCase())}">
      <div class="row wrap"><strong>${l(s.title)}</strong><span class="chip">${l(s.status)}</span></div>
      <p class="muted">${l(s.owner)} · ${l(s.rights)}</p>
      <details class="shield-draft-details">
        <summary>Review saved draft details</summary>
        <p class="muted"><strong>Contact:</strong> ${l(s.contact||"Not provided")}</p>
        ${i?`<p class="muted"><strong>Source:</strong> <a href="${l(i)}" target="_blank" rel="noopener noreferrer">Open official source</a></p>`:""}
        ${s.notes?`<p class="muted"><strong>Rights details:</strong> ${l(s.notes)}</p>`:""}
        <p class="muted">Saved on this device only · Not submitted to PIKK</p>
      </details>
      <div class="row wrap"><small>${new Date(s.at).toLocaleDateString()}</small><button type="button" class="btn ghost shield-delete" data-id="${l(s.id)}">Delete local draft</button></div>
    </article>`}).join(""):'<p class="muted">No rights declarations saved on this device.</p>';return I("PIKK Shield",`
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
            <div class="field"><label for="shieldRights">Rights basis *</label><select id="shieldRights" name="rights" required>${Ya.map(s=>`<option value="${l(s)}">${l(s)}</option>`).join("")}</select></div>
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
          <div class="row wrap shield-drafts-header"><h3>My local drafts (${e.length})</h3><div class="row wrap shield-backup-actions">${e.length?'<button type="button" class="btn ghost" id="shieldExportDrafts">Download local backup (.json)</button>':""}<button type="button" class="btn ghost" id="shieldImportDrafts">Restore local backup (.json)</button><input id="shieldImportFile" type="file" accept=".json,application/json" hidden aria-label="Choose a PIKK Shield JSON backup" /></div></div>
          <p class="muted shield-backup-notice">Backups contain your contact and rights details. Store them privately. Restoring merges drafts on this device only; it does not register or submit copyright claims.</p>
          ${e.length?`<div class="field shield-search"><label for="shieldDraftSearch">Find a saved draft</label><input id="shieldDraftSearch" type="search" placeholder="Search song or artist" autocomplete="off" /><p class="muted shield-search-count" role="status" aria-live="polite" id="shieldSearchCount">Showing ${e.length} of ${e.length} drafts</p></div>`:""}
          <div class="shield-history">${t}</div>
          ${e.length?'<p class="muted" id="shieldSearchEmpty" hidden>No saved drafts match your search.</p>':""}
        </section>
      </div>
    </div>`,{lead:"Rights declaration preview · No official copyright protection is active yet"})}function vm(e){var a,n,o;(a=e.querySelector("#shieldForm"))==null||a.addEventListener("submit",r=>{r.preventDefault();const c=r.currentTarget;try{const d=dm({title:c.elements.title.value,owner:c.elements.owner.value,rights:c.elements.rights.value,contact:c.elements.contact.value,source:c.elements.source.value,notes:c.elements.notes.value,certified:e.querySelector("#shieldCertify").checked});pm(window.localStorage,d),g("Local rights draft saved — not submitted"),location.hash="#/shield?updated=1",window.dispatchEvent(new HashChangeEvent("hashchange"))}catch(d){g(d.message)}});const t=e.querySelector("#shieldImportFile");(n=e.querySelector("#shieldImportDrafts"))==null||n.addEventListener("click",()=>t==null?void 0:t.click()),t==null||t.addEventListener("change",async()=>{var c;const r=(c=t.files)==null?void 0:c[0];if(r)try{if(r.size>65536)throw new Error("Backup file must be under 64 KB.");const d=await r.text();if(!window.confirm("Restore PIKK Shield drafts from this file? Valid drafts will be merged into this browser, without replacing existing drafts."))return;const p=hm(window.localStorage,d);g(`Restored ${p.added} local draft(s); ${p.duplicates} already saved`),window.dispatchEvent(new HashChangeEvent("hashchange"))}catch(d){g(d.message||"Unable to restore backup")}finally{t.value=""}}),(o=e.querySelector("#shieldExportDrafts"))==null||o.addEventListener("click",()=>{const r=mm(window.localStorage),c=URL.createObjectURL(new Blob([r],{type:"application/json"})),d=document.createElement("a");d.href=c,d.download="pikk-shield-local-drafts.json",document.body.appendChild(d),d.click(),d.remove(),setTimeout(()=>URL.revokeObjectURL(c),1e3),g("Local backup downloaded — store it privately")});const s=e.querySelector("#shieldDraftSearch"),i=[...e.querySelectorAll(".shield-entry")];s==null||s.addEventListener("input",()=>{const r=s.value.trim().toLocaleLowerCase();let c=0;i.forEach(m=>{const h=m.dataset.shieldSearch.includes(r);m.hidden=!h,h&&c++});const d=e.querySelector("#shieldSearchCount");d&&(d.textContent=`Showing ${c} of ${i.length} drafts`);const p=e.querySelector("#shieldSearchEmpty");p&&(p.hidden=c!==0)}),e.querySelectorAll(".shield-delete").forEach(r=>r.addEventListener("click",()=>{var d,p;const c=((p=(d=r.closest(".shield-entry"))==null?void 0:d.querySelector("strong"))==null?void 0:p.textContent)||"this rights draft";window.confirm(`Delete local rights draft "${c}"? This cannot be undone.`)&&(um(window.localStorage,r.dataset.id),g("Local draft deleted"),window.dispatchEvent(new HashChangeEvent("hashchange")))}))}function bm(){const t=`
    <div class="card merch-hero">
      <p class="kicker">Physical merch</p>
      <h2 style="margin:0 0 8px">Foreign X-Change</h2>
      <p class="muted">All orders, sizes, shipping, and payment happen on
        <a class="fx-link" href="https://foreignx-change.com" target="_blank" rel="noopener">foreignx-change.com</a>
        — not inside PIKK. Product links open the shop homepage until verified per-item URLs are provided.</p>
      <a class="btn primary" href="https://foreignx-change.com" target="_blank" rel="noopener">Visit Foreign X-Change</a>
      <p class="merch-note" style="margin-top:10px">Hats $30 · Tees $65 · Jackets $200 · prices exclude shipping</p>
    </div>
    <div class="merch-grid">${Ae.map(s=>`
    <article class="merch-card">
      <div class="img-wrap" data-zoom="${l(s.image)}" role="button" tabindex="0" aria-label="Zoom ${l(s.name)}">
        <img src="${l(s.image)}" alt="${l(s.name)}" loading="lazy" />
      </div>
      <div class="body">
        <div class="cat">${l(s.category)}</div>
        <div class="name">${l(s.name)}</div>
        <div class="price">$${s.price}</div>
        <a class="btn primary block shop-link" href="${l(s.shopUrl)}" target="_blank" rel="noopener" data-name="${l(s.name)}">
          Shop on Foreign X-Change
        </a>
        <span class="merch-note">Redirects to Foreign X-Change for secure checkout · shipping &amp; tax calculated there</span>
        <span class="chip">TEST MODE · external checkout</span>
      </div>
    </article>`).join("")}</div>
    <div id="merchLightbox" class="lightbox" role="dialog" aria-modal="true" aria-label="Product image preview" aria-hidden="true"><button type="button" class="merch-lightbox-close" aria-label="Close product preview">×</button><img alt="" /></div>
  `;return I("Merch",t,{lead:"Foreign X-Change showcase · 10 products · external checkout only"})}function ym(e){e.querySelectorAll(".shop-link").forEach(r=>{r.addEventListener("click",()=>{g("TEST MODE — opening Foreign X-Change")})});const t=e.querySelector("#merchLightbox"),s=t==null?void 0:t.querySelector("img"),i=t==null?void 0:t.querySelector(".merch-lightbox-close");let a=null;const n=r=>{var c,d;!t||!s||!i||(a=r,s.src=((c=r.querySelector("img"))==null?void 0:c.currentSrc)||r.dataset.zoom,s.alt=((d=r.querySelector("img"))==null?void 0:d.alt)||"Product preview",t.classList.add("show"),t.setAttribute("aria-hidden","false"),i.focus())},o=()=>{t!=null&&t.classList.contains("show")&&(t.classList.remove("show"),t.setAttribute("aria-hidden","true"),s==null||s.removeAttribute("src"),a!=null&&a.isConnected&&a.focus(),a=null)};e.querySelectorAll(".img-wrap").forEach(r=>{const c=()=>n(r);r.addEventListener("click",c),r.addEventListener("keydown",d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),c())})}),t==null||t.addEventListener("click",o),t==null||t.addEventListener("keydown",r=>{r.key==="Escape"?(r.preventDefault(),o()):r.key==="Tab"&&(r.preventDefault(),i==null||i.focus())})}function as(e){R(e||"#/profile")}function Fn(e){return e.avatar?`<img class="avatar" src="${l(e.avatar)}" alt="" style="object-fit:cover" />`:`<div class="avatar">${l((e.username||"?")[0].toUpperCase())}</div>`}function Vs(e,t){return t.length?`<div class="card"><h3>${l(e)}</h3>
    <ul class="list-plain">${t.map(s=>`<li><a href="#/profile/${l(s.id)}"><span>${l(s.username)}</span></a>
           <a class="chip" href="#/profile/${l(s.id)}">View</a></li>`).join("")}</ul></div>`:`<div class="card"><h3>${l(e)}</h3><p class="muted">None yet.</p></div>`}function km(e){var m,h;const t=((m=e==null?void 0:e.parts)==null?void 0:m[1])||null,{user:s,posts:i}=M(),a=!!(t&&s&&t===s.id&&((h=e==null?void 0:e.query)==null?void 0:h.view)==="public");if(!!t&&(!s||t!==s.id)||a){const f=At(t);if(!f)return I("Profile",`<div class="card muted">User not found.</div>
         <a class="btn" href="#/profile">Back</a>`);const v=i.filter(A=>A.userId===f.id),k=s&&!a&&(s.following||[]).includes(f.id),b=cn(f.id),S=ia(f.id),$=`
      <section class="pikk-profile-cover" aria-label="Public PIKK profile">
        <div class="pikk-profile-cover-inner">
          <span class="pikk-profile-cover-kicker">PIKK · CREATOR PROFILE</span>
          ${Fn(f)}
          <div>
            <h2 style="margin:0">${l(f.username)}${f.verified?" ✓":""}</h2>
            <p class="muted" style="margin:4px 0 0">${l(f.bio||"")}</p>
            ${f.verified?'<span class="chip">Verified</span>':""}
          </div>
        </div>
        <div class="stats pikk-profile-stats">
          <div><strong>${v.length}</strong><span>Posts</span></div>
          <div><strong>${(f.followers||[]).length}</strong><span>Followers</span></div>
          <div><strong>${(f.following||[]).length}</strong><span>Following</span></div>
        </div>
        <div class="row wrap pikk-profile-shortcuts">
          ${a?'<a class="btn primary" href="#/profile">Edit profile</a>':s?`<button class="btn ${k?"ghost":"primary"}" id="pubFollow" data-uid="${l(f.id)}" data-on="${k?"1":"0"}">${k?"Unfollow":"Follow"}</button>`:'<a class="btn primary" href="#/profile">Sign in to follow</a>'}
          <a class="btn ghost" href="#/posts">Posts feed</a>
          ${a?"":'<a class="btn ghost" href="#/profile">My profile</a>'}
        </div>
      </section>
      <div class="card">
        <h3>Posts</h3>
        ${v.length?v.map(A=>`<div style="padding:8px 0;border-bottom:1px solid var(--line)">
                      <div class="muted" style="font-size:11px">${new Date(A.at).toLocaleString()}</div>
                      ${l(A.text)}
                      ${A.image?`<img src="${l(A.image)}" alt="" style="margin-top:8px;border-radius:12px;max-height:200px;object-fit:cover;width:100%" />`:""}
                    </div>`).join(""):'<p class="muted">No posts yet.</p>'}
      </div>
      ${Vs("Followers",b)}
      ${Vs("Following",S)}
    `;return I(f.username,$)}if(!s)return I("Profile",`
      <section class="pikk-profile-guest-hero" aria-label="Join PIKK">
        <p class="kicker">PIKK · YOUR PROFILE</p>
        <h2>Your space. Your people. <span>One PIKK.</span></h2>
        <p>Follow artists, share posts and build your profile. Explore the official DatBoiSkeet page or create a local demo account to try the experience.</p>
        <span class="chip">TEST MODE · Browser-local account only</span>
      </section>
      <div class="card">
        <p class="kicker">PIKK account</p>
        <h3>Sign in · local demo</h3>
        <p class="muted">Free fan account for this browser — follow @DatBoiSkeet, post, and apply for roles. TEST MODE: no password, email, or backend auth yet.</p>
        <div class="field"><label>Username</label>
          <input id="signinName" placeholder="Your PIKK name" maxlength="24" /></div>
        <button class="btn primary block" id="signinBtn">Sign in</button>
        <p class="chip" style="margin-top:10px">TEST MODE · demo user only</p>
      </div>
      <div class="card">
        <h3>Official profile</h3>
        <p class="muted" style="margin:0 0 8px">Music, Vault Coming Soon, Foreign X-Change — start here.</p>
        <a class="btn" href="#/profile/dbs">@DatBoiSkeet</a>
      </div>
      <div class="card">
        <h3>Become a Creator</h3>
        <p class="muted">After you sign in, apply for Clipper, Creator/Streamer, Brand, Affiliate, or Seller. Admin review unlocks tools — no automatic earnings access.</p>
        <a class="btn" href="#/signup">Creator applications</a>
        <a class="btn" href="#/clippers">Clippers apply</a>
        <a class="btn ghost" href="#/guidelines">Guidelines</a>
      </div>`,{lead:"Free PIKK fan profile · follow · posts · role apps · TEST MODE."});const o=i.filter(f=>f.userId===s.id),r=cn(s.id),c=ia(s.id),d=s.memberships||{},p=`
    <section class="pikk-profile-cover" aria-label="Your PIKK profile">
      <div class="pikk-profile-cover-inner">
        <span class="pikk-profile-cover-kicker">PIKK · MY PROFILE</span>
        ${Fn(s)}
        <div>
          <h2 style="margin:0">${l(s.username)}</h2>
          <p class="muted" style="margin:4px 0 0">${l(s.bio)}</p>
          <span class="chip">TEST MODE · demo</span>
          ${d.skeetPlus||d.backstage||d.innerCircle?`<span class="chip">${d.innerCircle?"Inner Circle":d.backstage?"Backstage":"Skeet+"}</span>`:""}
        </div>
      </div>
      <div class="stats pikk-profile-stats">
        <div><strong>${o.length}</strong><span>Posts</span></div>
        <div><strong>${(s.followers||[]).length}</strong><span>Followers</span></div>
        <div><strong>${(s.following||[]).length}</strong><span>Following</span></div>
      </div>
      <div class="row wrap pikk-profile-shortcuts">
        <a class="btn" href="#/posts">New post</a>
        <a class="btn" href="#/profile/${l(s.id)}?view=public">Public view</a>
        <a class="btn" href="#/profile-shop">Profile Shop</a>
        <a class="btn" href="#/messages">Messages</a>
        <button class="btn ghost" id="signoutBtn">Sign out</button>
      </div>
    </section>

    <div class="card" id="editCard">
      <h3>Edit profile</h3>
      <div class="field"><label>Bio</label>
        <textarea id="editBio" maxlength="280">${l(s.bio||"")}</textarea></div>
      <div class="field"><label>Avatar URL</label>
        <input id="editAvatar" placeholder="/brand/… or https://…" value="${l(s.avatar||"")}" /></div>
      <button class="btn primary" id="saveProfile">Save</button>
    </div>

    <div class="card">
      <h3>Your posts</h3>
      ${o.length?o.map(f=>`<div style="padding:8px 0;border-bottom:1px solid var(--line)">
                    <div class="muted" style="font-size:11px">${new Date(f.at).toLocaleString()}</div>
                    ${l(f.text)}
                  </div>`).join(""):'<p class="muted">No posts yet.</p>'}
    </div>

    ${Vs("Followers",r)}
    ${Vs("Following",c)}

    <div class="card">
      <h3>Roles &amp; membership</h3>
      <p class="muted" style="margin:0 0 8px">Clipper campaigns, Live creator tools, brand ads, or Skeet+ / Backstage / Inner Circle for Vault access.</p>
      <a class="btn block" href="#/clippers">Apply as Clipper <span class="badge-cs badge-cs-inline">Coming Soon</span></a>
      <a class="btn block" href="#/signup" style="margin-top:8px">Other creator roles</a>
      <a class="btn block" href="#/music" style="margin-top:8px">Music &amp; Vault membership</a>
    </div>

    <div class="card">
      <h3>Demo Admin · TEST MODE</h3>
      <p class="muted" style="font-size:12px">Sets <code>user.role='admin'</code> in localStorage <code>dbs_v1</code>. Also available via <code>#/admin?admin=1</code>.</p>
      <div class="row wrap" style="margin-top:8px">
        <span class="chip">${se()?"role=admin":"role=fan"}</span>
        <button class="btn ${se()?"ghost":"primary"}" id="toggleAdmin">${se()?"Revoke admin":"Enable Demo Admin"}</button>
        <a class="btn" href="#/admin">Open Admin</a>
      </div>
    </div>
  `;return I("Profile",p)}function wm(e){var t,s,i,a,n,o;(t=e.querySelector("#signinBtn"))==null||t.addEventListener("click",()=>{var c;const r=(c=e.querySelector("#signinName"))==null?void 0:c.value;zt(r),g("Signed in"),as("#/profile")}),(s=e.querySelector("#signinName"))==null||s.addEventListener("keydown",r=>{var c;r.key==="Enter"&&((c=e.querySelector("#signinBtn"))==null||c.click())}),(i=e.querySelector("#signoutBtn"))==null||i.addEventListener("click",()=>{_l(),g("Signed out"),as("#/profile")}),(a=e.querySelector("#saveProfile"))==null||a.addEventListener("click",()=>{var c,d;if(ql({bio:(c=e.querySelector("#editBio"))==null?void 0:c.value,avatar:(d=e.querySelector("#editAvatar"))==null?void 0:d.value}).error)return g("Sign in required");g("Profile saved"),as("#/profile")}),(n=e.querySelector("#pubFollow"))==null||n.addEventListener("click",r=>{const c=r.currentTarget,d=c.dataset.uid,p=c.dataset.on==="1";if((p?wi(d):ki(d)).error)return g("Sign in to follow");g(p?"Unfollowed":"Following"),as("#/profile/"+d)}),(o=e.querySelector("#toggleAdmin"))==null||o.addEventListener("click",()=>{const r=!se();if(Ts(r).error)return g("Sign in required");g(r?"Demo Admin enabled":"Admin revoked"),as("#/profile")})}function Gn(){R("#/clippers")}const Sm={pending:"Pending",approved:"Approved",rejected:"Rejected",waitlisted:"Waitlisted"};function $m(){const{clipperApps:e,user:t}=M(),s=e.length,i=e.filter(o=>o.status==="approved").length,a=e.filter(o=>o.status==="pending").length,n=`
    <div class="clippers-studio">
      <header class="clippers-hero">
        <div class="clippers-hero-label">PIKK CREATOR STUDIO <span aria-hidden="true">◆</span> CLIPPER PROGRAM</div>
        <h2>Turn your edits into opportunities.</h2>
        <p>Apply to become a PIKK Clipper, share your work and track your application in one place.</p>
        <div class="clippers-hero-actions"><a class="btn primary" href="#clipper-application">Apply to clip</a><a class="btn ghost" href="#clipper-submissions">My applications</a></div>
        <div class="clippers-hero-disclaimer">TEST MODE · Applications saved on this device · No paid campaigns or payouts active</div>
      </header>
      <section class="clippers-stats" aria-label="Application overview">
        <div><span>Applications</span><strong>${s}</strong><small>On this device</small></div>
        <div><span>Pending review</span><strong>${a}</strong><small>Demo review queue</small></div>
        <div><span>Approved</span><strong>${i}</strong><small>Demo status only</small></div>
      </section>
    <div class="card clippers-panel" id="clipper-application">
      <div class="home-sell-title-row">
        <h3 style="margin:0">Clipper application</h3>
        <span class="badge-cs badge-cs-inline" id="clippers-coming-soon">Coming Soon</span>
      </div>
      <p class="chip" style="margin:0 0 8px">Clipper earnings not live yet · TEST MODE</p>
      <p class="muted">No minimum followers. Admin reviews every application. Analytics screenshots can be linked as URLs for this demo.</p>
      <div class="grid-2">
        <div class="field"><label>Name *</label><input id="cName" required /></div>
        <div class="field"><label>Email *</label><input id="cEmail" type="email" required /></div>
      </div>
      <div class="field"><label>Age</label><input id="cAge" type="number" min="13" max="120" /></div>
      <h3 style="margin-top:8px">Platforms</h3>
      <div class="grid-2">
        <div class="field"><label>TikTok</label><input id="cTiktok" placeholder="@ or URL" /></div>
        <div class="field"><label>Instagram</label><input id="cIg" placeholder="@ or URL" /></div>
        <div class="field"><label>YouTube</label><input id="cYt" /></div>
        <div class="field"><label>X / Twitter</label><input id="cX" /></div>
        <div class="field"><label>Facebook</label><input id="cFb" /></div>
        <div class="field"><label>Followers (total approx)</label><input id="cFollowers" /></div>
      </div>
      <h3 style="margin-top:8px">Analytics</h3>
      <div class="grid-2">
        <div class="field"><label>Monthly views</label><input id="cViews" /></div>
        <div class="field"><label>Avg views / post</label><input id="cAvgViews" /></div>
        <div class="field"><label>Engagement rate</label><input id="cEngage" placeholder="e.g. 4.2%" /></div>
        <div class="field"><label>Posting frequency</label><input id="cFreq" placeholder="e.g. 5× / week" /></div>
      </div>
      <div class="field"><label>Niche / promotional experience</label><textarea id="cNiche"></textarea></div>
      <div class="field"><label>Work sample links</label><textarea id="cSamples" placeholder="Paste URLs, one per line"></textarea></div>
      <div class="field"><label>Analytics notes / screenshot links</label><textarea id="cAnalytics" placeholder="Describe numbers or paste image URLs"></textarea></div>
      <button class="btn primary block" id="cSubmit">Submit application</button>
    </div>

    <div class="card clippers-panel" id="clipper-submissions">
      <h3>Submissions (this device)</h3>
      ${e.length?e.map(o=>`
            <div class="card" style="margin:0 0 10px;background:#12121a" data-app="${l(o.id)}">
              <div class="row wrap">
                <strong>${l(o.name)}</strong>
                <span class="chip">${l(Sm[o.status]||o.status)}</span>
                <span class="muted spacer" style="text-align:right">${K(o.at)}</span>
              </div>
              <p class="muted" style="margin:6px 0;font-size:12px">${l(o.email)} · ${l(o.niche||"—")}</p>
              <p style="font-size:12px;margin:0 0 8px">${l((o.samples||"").slice(0,120))}</p>
              <div class="row wrap admin-actions">
                <button class="btn primary clip-status" data-id="${l(o.id)}" data-status="approved">Approve</button>
                <button class="btn ghost clip-status" data-id="${l(o.id)}" data-status="waitlisted">Waitlist</button>
                <button class="btn ghost clip-status" data-id="${l(o.id)}" data-status="rejected">Reject</button>
              </div>
            </div>`).join(""):'<p class="muted">None yet.</p>'}
      <p class="muted" style="font-size:12px;margin-top:8px">Demo admin: approve / reject here or on <a href="#/admin" style="color:var(--sk)">Admin</a>. Signed in as ${l((t==null?void 0:t.username)||"guest")}.</p>
    </div>
    </div>
  `;return I("Clippers",n,{lead:"Apply → admin approve → paid campaigns & tracked links."})}function xm(e){var t;(t=e.querySelector("#cSubmit"))==null||t.addEventListener("click",()=>{var a,n,o,r,c,d,p,m,h,f,v,k,b,S,$,A,w,P,C;const s=(n=(a=e.querySelector("#cName"))==null?void 0:a.value)==null?void 0:n.trim(),i=(r=(o=e.querySelector("#cEmail"))==null?void 0:o.value)==null?void 0:r.trim();if(!s||!i)return g("Name and email required");jl({name:s,email:i,age:(c=e.querySelector("#cAge"))==null?void 0:c.value,tiktok:(d=e.querySelector("#cTiktok"))==null?void 0:d.value,instagram:(p=e.querySelector("#cIg"))==null?void 0:p.value,youtube:(m=e.querySelector("#cYt"))==null?void 0:m.value,x:(h=e.querySelector("#cX"))==null?void 0:h.value,facebook:(f=e.querySelector("#cFb"))==null?void 0:f.value,followers:(v=e.querySelector("#cFollowers"))==null?void 0:v.value,views:(k=e.querySelector("#cViews"))==null?void 0:k.value,avgViews:(b=e.querySelector("#cAvgViews"))==null?void 0:b.value,engagement:(S=e.querySelector("#cEngage"))==null?void 0:S.value,frequency:($=e.querySelector("#cFreq"))==null?void 0:$.value,niche:(A=e.querySelector("#cNiche"))==null?void 0:A.value,samples:(w=e.querySelector("#cSamples"))==null?void 0:w.value,analyticsNotes:(P=e.querySelector("#cAnalytics"))==null?void 0:P.value,applicantUserId:((C=M().user)==null?void 0:C.id)||null}),g("Application saved for admin review"),Gn()}),e.querySelectorAll(".clip-status").forEach(s=>{s.addEventListener("click",()=>{fr(s.dataset.id,s.dataset.status),g("Marked "+s.dataset.status),Gn()})})}const Em={rose:"🌹","big-love":"💖","turn-up":"🔥","cash-rain":"💵","bottle-pop":"🍾","money-gun":"💸","diamond-drip":"💎","foreign-whip":"🚗",helicopter:"🚁","private-jet":"✈️","dbs-crown":"👑","dbs-universe":"🌌","battle-win":"✅","battle-crown":"👑","battle-vs":"⚔️","battle-fire":"🔥"},Am={rose:"/gifts/rose.svg","big-love":"/gifts/big-love.svg","turn-up":"/gifts/turn-up.svg","cash-rain":"/gifts/cash-rain.svg","bottle-pop":"/gifts/bottle-pop.svg","money-gun":"/gifts/money-gun.svg","diamond-drip":"/gifts/diamond-drip.svg","foreign-whip":"/gifts/foreign-whip.svg",helicopter:"/gifts/helicopter.svg","private-jet":"/gifts/private-jet.svg","dbs-crown":"/gifts/dbs-crown.svg","dbs-universe":"/gifts/dbs-universe.svg","battle-win":"/gifts/battle-win.svg","battle-crown":"/gifts/battle-crown.svg","battle-vs":"/gifts/battle-vs.svg","battle-fire":"/gifts/battle-fire.svg"},Vn="gift-sticker";function Us(e){return String(e??"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function Cm(e,t){return t&&typeof t=="object"&&t.className?t.className:`${Vn} ${Vn}--${e}`}function Ja(e,t={}){const s=String(e||""),i=Cm(s||"unknown",t),a=Em[s]||"🎁",n=Am[s]||null;return n?{src:n,className:i,emoji:a,html:`<img class="${Us(i)}" src="${Us(n)}" alt="" width="48" height="48" decoding="async" draggable="false" data-gift-slug="${Us(s)}" />`}:{src:null,className:i,emoji:a,html:`<span class="${Us(i)} gift-sticker--emoji" aria-hidden="true">${a}</span>`}}function rt(e,t){return Ja(e,t&&typeof t=="object"&&typeof t!="function"?t:{}).html}const Tm=Object.freeze([{id:"women",title:"Women's Rooms",icon:"💗",description:"Conversations, style, wellness, business and community",names:["Ladies Lounge","Girl Talk","Tea Time","What's the Word?","Who Did What?","Beauty Bar","Girls' Night In","Love & Standards","Boss Ladies","Fashion & Fits","Ladies Only Live","Women in Business","Women's Mental Wellness","Dating From Her Side","The Hustle Room: Women"]},{id:"men",title:"Men's Rooms",icon:"🫱🏻‍🫲🏿",description:"Brotherhood, relationships, business, wellness and hobbies",names:["The Man Cave","The Barbershop","Fellas' Night","Men's Corner","Men in Business","Cars & Motors","Fitness & Brotherhood","Fatherhood","Men's Mental Wellness","Dating From His Side","Sports Debate","Gaming Brotherhood","Men's Style","The Hustle Room","Brotherhood & Mentorship"]},{id:"coed",title:"Coed Communities",icon:"🌐",description:"Shared conversations, learning and networking for everyone",names:["Let's Talk","The Hangout","Business Connect & Wealth Academy","Couples Corner","Conspiracy Room","Game Room","Why Are You Single?","What Are You Looking For?","Single & Ready to Mingle","City Connect"]},{id:"dating",title:"Singles & Dating",icon:"💘",description:"Opt-in conversations, introductions and relationship topics",names:["Looking for My Match","The Flirt Zone","Speed Connections","Poly Connections","Date Night Live","Love & Advice"]},{id:"sports",title:"Sports",icon:"🏆",description:"A separate place for every major sport",names:["Sports Central","Basketball","Football","Soccer","Baseball","Hockey"]},{id:"talent",title:"Music & Talent",icon:"🎙️",description:"Rappers, singers, bands, producers and city competitions",names:["The Booth","Producer Room","The Stage","City Takeover"]},{id:"news",title:"News & Innovation",icon:"📰",description:"World events, markets and new ideas",names:["World News","Economy & Markets","Startups & Innovation","Tech Talk","Money Talk"]},{id:"general",title:"General Live",icon:"📡",description:"IRL, gaming, shows, comedy, food, fitness and more",names:["Just Chatting","Gaming","Music","IRL","Sports","Creative","Podcasts & Talk Shows","Food & Cooking","Fitness","Beauty & Fashion","Business & Money Talk","Dating & Connections","Education","News & Commentary","Comedy & Entertainment","Comedy & Roast Battles","Creator Spotlight"]}]);function Dm(e,t){const s=new Map(e.map(c=>[c[0],c])),i=new Set,a=([c,d,p])=>'<a class="live-cat-card pikk-live-room-card" href="'+(c==="Comedy & Roast Battles"?"#/roast-arena":"#/live?tab=channels&category="+encodeURIComponent(c))+'" aria-label="'+t(c)+': browse channels"><span class="pikk-live-room-emoji" aria-hidden="true">'+t(p)+"</span><strong>"+t(c)+'</strong><p class="muted">'+t(d)+'</p><span class="pikk-live-room-action">Browse channels <span aria-hidden="true">›</span></span></a>',n=Tm.map(c=>{const d=c.names.map(p=>s.get(p)).filter(Boolean);return d.forEach(p=>i.add(p[0])),'<details class="pikk-live-directory-group" id="pikk-live-group-'+c.id+'"'+(c.id==="coed"?" open":"")+'><summary class="pikk-live-directory-summary"><span class="pikk-live-directory-icon" aria-hidden="true">'+c.icon+'</span><span class="pikk-live-directory-label"><strong>'+t(c.title)+"</strong><small>"+t(c.description)+'</small></span><span class="pikk-live-directory-count">'+d.length+' rooms</span><span class="pikk-live-directory-chevron" aria-hidden="true">⌄</span></summary><div class="live-cat-cards pikk-live-directory-cards">'+d.map(a).join("")+"</div></details>"}),o=e.filter(c=>!i.has(c[0]));return o.length&&n.push('<details class="pikk-live-directory-group" open><summary class="pikk-live-directory-summary"><span class="pikk-live-directory-icon" aria-hidden="true">✨</span><span class="pikk-live-directory-label"><strong>More Live</strong><small>Additional topics</small></span><span class="pikk-live-directory-count">'+o.length+' rooms</span><span class="pikk-live-directory-chevron" aria-hidden="true">⌄</span></summary><div class="live-cat-cards pikk-live-directory-cards">'+o.map(a).join("")+"</div></details>"),'<div class="pikk-live-directory" role="region" aria-label="Live category groups">'+('<div class="card pikk-live-room-search" style="margin-bottom:4px"><label for="liveRoomSearch"><strong>Find a Live topic</strong></label><div class="row wrap" style="gap:8px;margin-top:8px"><input id="liveRoomSearch" type="search" autocomplete="off" placeholder="Search '+e.length+' topics" aria-describedby="liveRoomSearchStatus" style="width:auto;flex:1 1 220px;min-width:0"><button type="button" id="liveRoomSearchClear" class="btn ghost" hidden style="display:none">Clear</button></div><p class="muted small" id="liveRoomSearchStatus" role="status" aria-live="polite">Browse '+e.length+" topics · these filter channels, not hosted rooms.</p></div>")+n.join("")+"</div>"}function Mm(e,t){return String(e).toLocaleLowerCase().includes(String(t).trim().toLocaleLowerCase())}function Lm(e){const t=e.querySelector("#liveRoomSearch"),s=e.querySelector("#liveRoomSearchClear"),i=e.querySelector("#liveRoomSearchStatus"),a=[...e.querySelectorAll(".pikk-live-directory-group")];if(!t||!s||!i||!a.length)return;let n=null;const o=()=>{const r=t.value.trim();r&&n===null&&(n=a.map(d=>d.open));let c=0;for(const d of a){let p=0;d.querySelectorAll(".pikk-live-room-card").forEach(h=>{const f=Mm(h.textContent,r);h.style.display=f?"":"none",f&&p++}),d.style.display=!r||p?"":"none";const m=d.querySelector(".pikk-live-directory-count");if(m){const h=d.querySelectorAll(".pikk-live-room-card").length;m.textContent=r?p+" of "+h+" topics":h+" rooms"}r&&p&&(d.open=!0),c+=p}!r&&n!==null&&(a.forEach((d,p)=>{d.open=n[p]}),n=null),s.hidden=!r,s.style.display=r?"":"none",i.textContent=r?c+" matching topic"+(c===1?"":"s")+" · channel discovery only.":"Browse "+c+" topics · these filter channels, not hosted rooms."};t.addEventListener("input",o),s.addEventListener("click",()=>{t.value="",o(),t.focus()}),o()}function Yo(){const e=(Fe().query||{}).tab;return e==="live"||e==="channels"?"channels":e==="following"||e==="categories"?e:"channels"}function fe(){const e=Yo();R(e==="channels"?"#/live":`#/live?tab=${e}`)}function ve(e){return"$"+Number(e||0).toFixed(2)}function Ne(e){const t=Number(e)||0;return t>=1e3?(t/1e3).toFixed(t>=1e4?0:1).replace(/\.0$/,"")+"K":String(t)}function Im(e="live"){return`
    <nav class="live-cat-chips" aria-label="Live categories">
      ${[{id:"live",href:"#/live?tab=channels",label:"Live"},{id:"openmic",href:"#/openmic",label:"Open Mic / Talent Discovery (24/7)"},{id:"spotlight",href:"#/spotlight",label:"Spotlight (24/7)"},{id:"viral",href:"#/viral-live",label:"Viral Live · Preview"}].map(i=>{const a=i.id===e?" on":"",n=i.id===e?' aria-current="page"':"";return`<a class="live-cat-chip${a}" href="${i.href}"${n}>${l(i.label)}</a>`}).join("")}
    </nav>`}function Pm(e="channels"){return`
    <nav class="live-disc-tabs" aria-label="Live discovery">
      ${[{id:"following",href:"#/live?tab=following",label:"Following"},{id:"clips",href:"#/shorts",label:"Clips"},{id:"channels",href:"#/live?tab=channels",label:"Channels"},{id:"categories",href:"#/live?tab=categories",label:"Categories"}].map(i=>{const a=i.id===e?" on":"",n=i.id===e?' aria-current="page"':"";return`<a class="live-disc-tab${a}" href="${i.href}" data-tab="${i.id}"${n}>${l(i.label)}</a>`}).join("")}
    </nav>`}function Jo(e={}){const t=Kr(),s=t.chipLabel||"House · Music Video",i=t.embed?Xe(t.embed,"rel=0"):"",a=e.title||"House catalog · while stages are quiet";return`
    <div class="card sp-house live-house-teaser" style="margin-top:12px">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center">
        <div class="chip">${l(s)}</div>
        <span class="chip">TEST MODE</span>
      </div>
      <p class="muted" style="margin:8px 0 0;font-size:12px">${l(a)} · original YouTube · not a fake live act</p>
      ${i?`<div class="sp-house-embed hero-video" style="margin-top:10px">
               <iframe src="${l(i)}" title="${l(t.title)}" allowfullscreen loading="lazy"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
             </div>`:""}
      <div class="sp-now-title" style="margin-top:10px">${l(t.title)}</div>
      <div class="muted" style="font-size:12px">${l(t.artist||"DatBoiSkeet")} · ${l(t.note||"")}</div>
      <div class="row wrap" style="gap:8px;margin-top:10px">
        <a class="btn ghost" href="#/spotlight">24/7 Spotlight</a>
        <a class="btn ghost" href="#/openmic">Open Mic</a>
        ${t.youtube?`<a class="btn ghost" href="${l(t.youtube)}" target="_blank" rel="noopener">YouTube</a>`:""}
      </div>
    </div>`}function Om(e){const t=e?ia(e.id):[],s=new Set(t.map(o=>o.id)),i=ts().filter(o=>s.has(o.hostId)),a=t.length?t.slice(0,12).map(o=>`<a class="chip" href="#/profile">${l("@"+(o.username||o.id))}</a>`).join(""):'<span class="muted">Nobody followed yet · DEMO</span>';let n;if(!e)n=`
      <p class="muted">Sign in to see lives from accounts you follow.</p>
      <a class="btn primary" href="#/profile">Demo profile</a>
      <p class="chip" style="margin-top:10px">TEST MODE · Following is local demo graph</p>`;else if(!i.length)n=`
      <p class="muted" style="margin:0 0 8px">
        None of the people you follow are live right now (demo filter on seeded Hot lives).
      </p>
      <div class="row wrap" style="gap:6px;margin-bottom:10px">${a}</div>
      <a class="btn ghost" href="#/live?tab=channels">Browse Live channels</a>
      <p class="chip" style="margin-top:10px">TEST MODE · not a scrape</p>
      ${Jo({title:"Meanwhile — DatBoiSkeet house catalog on 24/7 stages"})}`;else{const o=i.map(r=>`
        <article class="hot-live-card${r.house?" is-house":""}" data-live-id="${l(r.id)}">
          <div class="live-hoodie" aria-label="Live · ${l(Ne(r.viewers))} watching">
            <span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span>
            <span class="live-hoodie-viewers">${l(Ne(r.viewers))}</span>
          </div>
          <div class="hot-live-body">
            <div class="hot-live-host">@${l(r.hostName)}</div>
            <div class="hot-live-title">${l(r.title)}</div>
            <div class="hot-live-actions row wrap">
              <button type="button" class="btn ghost hot-live-watch" data-id="${l(r.id)}" data-host="${l(r.hostName)}">Watch demo</button>
            </div>
          </div>
        </article>`).join("");n=`
      <p class="muted" style="margin:0 0 8px;font-size:12px">Lives from accounts you follow · ${t.length} following · TEST MODE</p>
      <div class="row wrap" style="gap:6px;margin-bottom:10px">${a}</div>
      <div class="hot-lives-track">${o}</div>`}return`
    <div class="card live-disc-panel" id="liveTabFollowing" data-panel="following">
      <h3 style="margin:0 0 8px">Following</h3>
      ${n}
    </div>`}const _m=[["The Booth","Rappers, freestyles, hip-hop performances and song previews","🎙️"],["The Stage","Singers, bands, vocalists and instrumental performances","🎤"],["City Takeover","City-versus-city showcases, performances and local pride challenges","🌆"],["Producer Room","Beat showcases, producer collaborations and beat competitions","🎹"],["Ladies Lounge","Women-centered girl talk, beauty, fashion, relationships and community","💅"],["Girl Talk","Everyday conversations, friendships and women’s discussions","💬"],["Tea Time","Celebrity gossip, trending stories and entertainment drama","🫖"],["Who Did What?","Viral moments, celebrity controversies and debates","👀"],["Boss Ladies","Women entrepreneurs, business networking and financial growth","👑"],["Fashion & Fits","Fashion, outfits and personal style","👗"],["Ladies Only Live","Women-centered livestreams and hosted events","🎥"],["What's the Word?","Entertainment news, celebrity conversations, viral moments and trending discussions","🗣️"],["Women in Business","Women entrepreneurs, founders, business networking and mentorship","👩‍💼"],["The Man Cave","Men’s social conversations, sports and community","🤝"],["Men in Business","Men’s entrepreneurship, networking, mentorship and partnerships","👔"],["Girls' Night In","Women-centered social nights, games and discussions","🌙"],["Beauty Bar","Beauty, hair, makeup and skincare conversations","💄"],["Love & Standards","Dating, relationships and boundaries","💗"],["Women's Mental Wellness","Women-centered stress, confidence, emotional wellbeing and peer support","🧠"],["Dating From Her Side","Women-centered dating experiences, relationships and personal standards","💞"],["The Hustle Room: Women","Women-centered side hustles, extra income ideas and building businesses","📈"],["The Barbershop","Men-centered everyday debates, conversation and community","💈"],["Fellas' Night","Men-centered social events and games","🌃"],["Men's Corner","Men-centered life, relationships and personal development","🧢"],["Cars & Motors","Cars, motorcycles, customization and auto culture","🚘"],["Fitness & Brotherhood","Fitness, wellbeing and peer support","💪"],["Fatherhood","Parenting, family responsibilities and raising children","👨‍👧"],["Men's Mental Wellness","Men-centered stress, wellbeing and peer support","🧠"],["Dating From His Side","Men-centered dating experiences and relationship advice","💬"],["Sports Debate","Sports arguments, player comparisons and predictions","🏅"],["Gaming Brotherhood","Gaming, tournaments and player communities","🎮"],["Men's Style","Fashion, grooming, watches and fragrances","⌚"],["The Hustle Room","Careers, side businesses and professional growth","📈"],["Brotherhood & Mentorship","Intergenerational mentoring and peer support","🤝"],["Sports Central","All-sports discussion, fan talk and analysis","🏆"],["Basketball","Basketball discussion and fan streams","🏀"],["Football","American football discussion and fan streams","🏈"],["Soccer","Soccer discussion and fan streams","⚽"],["Baseball","Baseball discussion and fan streams","⚾"],["Hockey","Hockey discussion and fan streams","🏒"],["Tech Talk","AI, gadgets, apps and technology","💻"],["Startups & Innovation","Building businesses, technology and new ideas","🚀"],["World News","International events and global news discussions","🌍"],["Economy & Markets","Inflation, housing, jobs, interest rates and markets","📈"],["Let's Talk","Open conversations, questions and community discussion","🗣️"],["The Hangout","Conversations and social live streams","💬"],["Creator Spotlight","Featured creators and emerging talent","🌟"],["Game Room","Gameplay, tournaments and community games","🎮"],["Why Are You Single?","Coed conversations about single life, dating experiences and relationship challenges","❓"],["What Are You Looking For?","Coed conversations about dating intentions, values and ideal partners","💭"],["Single & Ready to Mingle","Opt-in coed social conversations and introductions for singles","💘"],["Looking for My Match","Opt-in dating live conversations","❤️"],["The Flirt Zone","Dating and connection conversations","💕"],["Speed Connections","Fast-paced introductions and connections","⏱️"],["Poly Connections","Consensual nonmonogamy discussions and connections","🔗"],["Couples Corner","Couples-versus-couples games, trivia, partner challenges, friendly competitions and rematches","💞"],["Date Night Live","Live dating conversations and activities","🌹"],["Love & Advice","Relationship conversations and advice","💌"],["Business Connect & Wealth Academy","Coed business networking and beginner education in entrepreneurship, credit, stocks, crypto, real estate and Roth IRAs","💼"],["City Connect","Meet people by city for friendship, dating, business networking and local conversations","📍"],["Conspiracy Room","Open discussion of theories and claims","🧩"],["Money Talk","Stocks, housing, crypto and financial discussions","💰"],["Just Chatting","Conversations, Q&A and hanging out","💬"],["Gaming","Gameplay, tournaments and community games","🎮"],["Music","Artists, DJs, producers and listening sessions","🎵"],["IRL","Everyday life, travel and outdoor streams","🌎"],["Sports","Sports talk and watch-along discussions","🏀"],["Creative","Art, design, production and making things","🎨"],["Podcasts & Talk Shows","Interviews, panels and conversations","🎙️"],["Food & Cooking","Recipes, kitchens and food reviews","🍳"],["Fitness","Training, wellness and movement","💪"],["Beauty & Fashion","Style, hair, makeup and fashion","✨"],["Business & Money Talk","Entrepreneurs, careers and money discussions","💼"],["Dating & Connections","Opt-in conversations and dating live rooms","❤️"],["Education","Tutorials, learning and study sessions","📚"],["News & Commentary","Current events and opinions","📰"],["Comedy & Entertainment","Comedy, variety and entertainment","🎭"],["Comedy & Roast Battles","1v1, tag team, open mic and tournaments","🎤"]];function qm(){return`
    <div class="card live-disc-panel" id="liveTabCategories" data-panel="categories">
      <div class="pikk-live-directory-hero">
        <span class="pikk-live-directory-kicker">PIKK LIVE · DISCOVER</span>
        <h3>Find your room.</h3>
        <p>Choose a community, explore a sport or find a conversation. Open a section to browse its topics.</p>
        <span class="pikk-live-directory-note">Discovery categories filter channels; a category is not a hosted room or a live stream. No active stream? You'll see an empty result.</span>
      </div>
      ${Dm(_m,l)}
      <h3 style="margin:20px 0 8px">PIKK 24/7 Stages</h3>
      <div class="live-cat-cards">
        <a class="live-cat-card" href="#/openmic"><strong>Open Mic / Talent Discovery</strong><span class="chip">24/7 stage</span><p class="muted">Join the performance queue</p></a>
        <a class="live-cat-card" href="#/spotlight"><strong>Spotlight Live</strong><span class="chip">24/7 stage</span><p class="muted">Keep Going votes and creator performances</p></a>
        <a class="live-cat-card" href="#/shorts"><strong>Clips / Shorts</strong><span class="chip">Watch</span><p class="muted">Watch short videos</p></a>
        <a class="live-cat-card" href="#/viral-live"><strong>PIKK Viral Live</strong><span class="chip">Preview · not broadcasting</span><p class="muted">Explore the future 24/7 trending channel and original video sources</p></a>
      </div>
    </div>`}function Nm(e){return e!=null&&e.spikedAt?Date.now()-Number(e.spikedAt)<15*60*1e3:!1}function Bm(e=""){const t=ts();return`
    <div class="card hot-lives-rail" id="hotLivesRail">
      <div class="row wrap" style="justify-content:space-between;align-items:baseline;gap:8px">
        <h3 style="margin:0">Hot lives · Top streamers</h3>
        <span class="chip">score · viewers + engagement</span>
      </div>
      <p class="muted" style="margin:6px 0 10px;font-size:12px">TEST MODE · seeded demo · not third-party scrape · house + community</p>
      <div class="hot-lives-track">
        ${(e?t.filter(a=>String(a.category||"").toLowerCase()===e.toLowerCase()):t).map(a=>{const n=Nm(a);return`
      <article class="hot-live-card${n?" is-hot":""}${a.house?" is-house":""}" data-live-id="${l(a.id)}">
        <div class="live-hoodie" aria-label="Live · ${l(Ne(a.viewers))} watching">
          <span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span>
          <span class="live-hoodie-viewers" title="${l(Ne(a.viewers))} watching">${l(Ne(a.viewers))}</span>
        </div>
        <div class="hot-live-body">
          <div class="hot-live-host">@${l(a.hostName)}</div>
          <div class="hot-live-title">${l(a.title)}</div>
          <div class="hot-live-chips">
            <span class="chip">${l(Ne(a.viewers))} watching</span>
            ${a.house?'<span class="chip chip-ok">House</span>':""}
            ${n?'<span class="chip live-chip"><span class="dot" aria-hidden="true"></span> HOT</span>':""}
          </div>
          <div class="hot-live-actions row wrap">
            <button type="button" class="btn ghost hot-live-watch" data-id="${l(a.id)}" data-host="${l(a.hostName)}">Watch demo</button>
            <button type="button" class="btn hot-live-spike" data-id="${l(a.id)}">Simulate spike</button>
          </div>
        </div>
      </article>`}).join("")||'<p class="muted">No matching live channels in this category yet.</p>'}
      </div>
    </div>`}function Rm(e){const t=String(e||"queued");return t==="playing"?'<span class="chip live-chip">Playing</span>':t==="played"?'<span class="chip chip-ok">Played</span>':t==="skipped"?'<span class="chip">Skipped</span>':'<span class="chip">Queued</span>'}function $e(e){const t=Number(e)||0;return t>=1e3?(t/1e3).toFixed(t%1e3===0?0:1).replace(/\.0$/,"")+"K":String(t)}function jm(e,t){if(!e||e.endedAt)return"";const s=xi(),i=ac(),a=nc(e.id).slice(0,12),n=i.map(d=>{const p=d.coins>=sc,m=s>=d.coins;return`
      <button type="button" class="lg-gift" data-slug="${l(d.slug)}" data-coins="${d.coins}" data-confirm="${p?"1":"0"}" title="${l(d.animation)}">
        <span class="lg-gift-emoji">${rt(d.slug)}</span>
        <span class="lg-gift-name">${l(d.name)}</span>
        <span class="lg-gift-price">${l($e(d.coins))} · ${ve(d.usd)}</span>
        ${m?'<span class="chip">Ready</span>':'<span class="chip">Need demo coins</span>'}
        ${p?'<span class="chip lg-confirm-chip">Confirm</span>':""}
      </button>`}).join(""),o=Si.map(d=>`<button type="button" class="btn ghost lg-buy" data-coins="${d.coins}">${l($e(d.coins))} · ${ve(d.usd)}</button>`).join(""),r=a.length?a.map(d=>`<li class="lg-hist-row">
            <span class="lg-hist-emoji">${rt(d.giftSlug)}</span>
            <span><strong>${l(d.giftName)}</strong> · @${l(d.fromUser)} · ${l($e(d.coins))} coins</span>
          </li>`).join(""):'<li class="muted" style="padding:6px 0">No gifts yet this Live.</li>';return`
    <div class="card live-gifts" id="liveGifts">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:baseline">
        <h3 style="margin:0">Gifts</h3>
        <span class="chip">TEST MODE · simulated gifts · no real payouts</span>
      </div>
      <p class="muted" style="margin:6px 0 12px;font-size:12px">
        PIKK prototype gift catalog · send during Live · expensive gifts (Money Gun+) ask to confirm ·
        viewers see names &amp; coins only
      </p>
      <div class="live-gift-overlay" id="liveGiftOverlay" aria-live="polite" aria-atomic="true"></div>
      ${t?`
      <div class="lg-tray" id="liveGiftTray" role="list" aria-label="Live gifts">
        ${n}
      </div>
      <div class="row wrap" style="gap:8px;margin-top:12px;align-items:center">
        <span class="chip">Coins ${l($e(s))} · TEST MODE</span>
        <a class="btn ghost" href="#/wallet" style="font-size:12px">Wallet</a>
      </div>
      <details class="lg-buy-details" style="margin-top:10px">
        <summary class="muted" style="cursor:pointer;font-size:13px">Add demo coins · no payment</summary>
        <div class="row wrap lg-buy-row" style="gap:6px;margin-top:8px">${o}</div>
        <p class="muted" style="margin:8px 0 0;font-size:12px">Demo coin values only. No charge, cash value, or withdrawal.</p>
      </details>`:`
      <div class="card" style="margin-top:8px;padding:12px">
        <p class="muted" style="margin:0">Create a local demo profile to try gifts during this Live. No real account required.</p>
        <a class="btn primary" href="#/profile" style="margin-top:8px">Sign in</a>
      </div>`}
      <h4 style="margin:14px 0 8px;font-size:13px">Recent gifts</h4>
      <ul class="list-plain lg-hist" id="lgHist">${r}</ul>
    </div>`}function Km(e,t){var c;if(!e||e.endedAt)return"";const s=!!(t&&e.hostId===t.id),i=Number(((c=M().wallet)==null?void 0:c.balance)||0),a=ka(e.id),n=wr.map(d=>{const p=d.save>0?`<span class="chip chip-ok lsr-save">Save $${d.save}</span>`:"";return`
      <button type="button" class="lsr-pack" data-pack="${d.pack}" data-price="${d.price}" aria-pressed="false">
        <strong>${l(d.label)}</strong>
        <span class="lsr-pack-price">${ve(d.price)}</span>
        ${p}
      </button>`}).join(""),o=a.length?a.map(d=>{const p=s?`<div class="row wrap lsr-host-acts" style="gap:6px">
                 ${d.status==="queued"||d.status==="playing"?`<button type="button" class="btn primary lsr-play" data-rid="${l(d.requestId)}" data-si="${d.songIndex}">${d.status==="playing"?"Mark played":"Play"}</button>
                        <button type="button" class="btn ghost lsr-skip" data-rid="${l(d.requestId)}" data-si="${d.songIndex}">Skip</button>`:""}
               </div>`:"";return`
          <li class="lsr-queue-row" data-status="${l(d.status)}">
            <div class="lsr-queue-main">
              <strong>${l(d.title)}</strong>
              <span class="muted" style="font-size:12px">@${l(d.username)} · ${l(String(d.pack))}‑pack</span>
            </div>
            ${Rm(d.status)}
            ${p}
          </li>`}).join(""):'<li class="muted" style="padding:8px 0">No song requests yet · fans can buy a pack below.</li>',r=t?`
      <div class="lsr-form" id="lsrForm">
        <p class="muted" style="margin:0 0 8px;font-size:12px">Pick a pack, enter song title(s), then pay from demo Wallet · <span class="chip">TEST MODE</span></p>
        <div class="lsr-packs" id="lsrPacks" role="group" aria-label="Song request packs">
          ${n}
        </div>
        <div id="lsrTitleFields" class="lsr-titles"></div>
        <div class="row wrap" style="gap:8px;margin-top:10px;align-items:center">
          <button type="button" class="btn primary" id="lsrSubmit">Request songs · pay</button>
          <button type="button" class="btn ghost" id="lsrSeedWallet">+ $50 demo credit</button>
          <span class="chip">Wallet ${ve(i)}</span>
        </div>
        <p class="muted" style="margin:8px 0 0;font-size:12px">3‑song pack is <strong>$45</strong> · promoted as <strong>Save $5</strong> (not $50). Demo charge only.</p>
      </div>`:`
      <div class="card" style="margin-top:10px;padding:12px">
        <p class="muted" style="margin:0">Sign in to request songs during this Live.</p>
        <a class="btn primary" href="#/profile" style="margin-top:8px">Sign in</a>
      </div>`;return`
    <div class="card live-song-requests" id="liveSongRequests">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:baseline">
        <h3 style="margin:0">Song requests</h3>
        <span class="chip">TEST MODE · demo wallet</span>
      </div>
      <p class="muted" style="margin:6px 0 12px;font-size:12px">
        Fans pay for song requests on anyone’s live · host Play / Skip ·
        ${s?"<strong>You are the host</strong>":"viewer queue is read-only for Play/Skip"}
      </p>
      <h4 style="margin:0 0 8px;font-size:13px">Queue</h4>
      <ul class="list-plain lsr-queue" id="lsrQueue">${o}</ul>
      <h4 style="margin:14px 0 8px;font-size:13px">Request a pack</h4>
      ${r}
    </div>`}function Fm(e){var r;const t=e.endedAt?Math.max(0,Math.floor((e.endedAt-e.startedAt)/1e3)):Math.max(0,Math.floor((Date.now()-e.startedAt)/1e3)),s=String(Math.floor(t/60)).padStart(2,"0"),i=String(t%60).padStart(2,"0"),a=Ne(e.viewers||0),n=e.endedAt?`<div class="live-stage-meta"><span class="chip">Ended · ${K(e.endedAt)}</span></div>`:`<div class="live-hoodie live-hoodie--stage" aria-label="Live · ${l(a)} watching">
          <span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span>
          <span class="live-hoodie-viewers" id="liveViewers" title="${l(a)} watching">${l(a)}</span>
        </div>
        <div class="live-stage-meta">
          <span class="chip">${s}:${i}</span>
        </div>`,o=(e.chat||[]).slice(-40).map(c=>`
      <div class="live-chat-row ${c.support?"support":""}">
        <strong>${l(c.username)}</strong>
        <span>${l(c.text)}</span>
      </div>`).join("");return`
    <div class="card live-stage">
      <div class="live-stage-frame" role="img" aria-label="Fake stream stage · TEST MODE">
        <div class="live-stage-brand">
          <img src="/brand/pikk-official-approved.jpg" alt="PIKK" />
          <div>
            <div class="live-stage-title">${l(e.title)}</div>
            <div class="muted" style="font-size:12px">@${l(e.hostName)} · Follow DatBoiSkeet</div>
          </div>
        </div>
        ${n}
        <p class="live-stage-note">TEST MODE · no camera / no real stream · branding + chat demo only</p>
      </div>

      <div class="row wrap live-earn" style="margin-top:10px">
        <span class="chip">Tips ${ve(e.tipsTotal)}</span>
        <span class="chip">Gifts ${ve(e.giftsTotal||0)}</span>
        <span class="chip">Song reqs (see queue)</span>
        <span class="chip">Coins ${$e(xi())}</span>
        <span class="chip">Wallet ${ve(((r=M().wallet)==null?void 0:r.balance)||0)}</span>
      </div>

      ${e.endedAt?`<p class="muted" style="margin:10px 0 0">Stream ended. Start another below.</p>
             <button class="btn primary" id="liveRestart">New go-live</button>`:`<div class="row wrap" style="margin-top:10px;gap:8px">
               <button class="btn" id="liveTip" data-kind="tip" data-amt="1">Tip $1 · demo</button>
               <button class="btn ghost" id="liveFocusGifts">Gifts tray</button>
               <button class="btn ghost" id="liveBumpViewers">Refresh viewers</button>
               <button class="btn ghost danger" id="liveEnd">End stream</button>
             </div>`}
    </div>

    <div class="card live-chat-card">
      <h3>Live chat</h3>
      <div class="live-chat" id="liveChat">${o||'<p class="muted">No messages yet.</p>'}</div>
      ${e.endedAt?"":`<div class="row" style="gap:8px;margin-top:10px">
               <input id="liveChatInput" placeholder="Say something…" maxlength="280" style="flex:1" />
               <button class="btn primary" id="liveChatSend">Send</button>
             </div>`}
    </div>
  `}function Gm(e){const t=Number(e==null?void 0:e.targetAmount)||0;return t<=0?0:Math.min(100,Math.round((Number(e.raised)||0)/t*100))}function Vm(e){const t=Math.max(0,Number(e)-Date.now());if(t<=0)return"Ended · 24h window over";const s=Math.floor(t/36e5),i=Math.floor(t%36e5/6e4);return s>=1?`Resets in ${s}h ${i}m`:`Resets in ${i}m`}function Um(e,t){if(!e||e.endedAt)return"";const s=e.hostId,i=cc(s),a=!!(t&&s&&t.id===s),n=xi();if(!i)return a?`
    <div class="card live-daily-goal" id="liveDailyGoal">
      <h3 style="margin:0 0 6px">Set today's Live goal</h3>
      <p class="muted" style="margin:0 0 10px;font-size:12px">Name + amount · 24h window · viewers can donate with coins · TEST MODE</p>
      <div class="field"><label>Goal name</label>
        <input id="liveGoalName" maxlength="80" placeholder="e.g. New merch drop fund" /></div>
      <div class="field"><label>Goal amount ($)</label>
        <input id="liveGoalAmt" type="number" min="1" step="1" placeholder="50" /></div>
      <button type="button" class="btn primary" id="liveGoalSave">Start 24h goal</button>
      <p class="chip" style="margin-top:10px">TEST MODE · demo coins only</p>
    </div>`:`
      <div class="card live-daily-goal" id="liveDailyGoal">
        <h3 style="margin:0 0 6px">Host daily goal</h3>
        <p class="muted" style="margin:0;font-size:12px">No goal set for this Live yet · TEST MODE</p>
      </div>`;const o=Gm(i),r=!!(i.completedAt||o>=100),c=o>=100?"Complete":o>=70?"Close":o>=30?"On the way":"Far",d=[50,100,250].map(m=>`<button type="button" class="btn ghost live-goal-donate" data-goal-id="${l(i.id)}" data-coins="${m}" title="≈ $${(m/50).toFixed(0)}">Donate ${m} coins</button>`).join(""),p=a?`<details class="live-goal-edit" style="margin-top:10px">
        <summary class="muted" style="cursor:pointer;font-size:12px">Edit goal (new 24h window)</summary>
        <div class="field" style="margin-top:8px"><label>Goal name</label>
          <input id="liveGoalName" maxlength="80" value="${l(i.name)}" /></div>
        <div class="field"><label>Goal amount ($)</label>
          <input id="liveGoalAmt" type="number" min="1" step="1" value="${l(String(i.targetAmount))}" /></div>
        <button type="button" class="btn" id="liveGoalSave">Save · reset 24h</button>
      </details>`:"";return`
    <div class="card live-daily-goal" id="liveDailyGoal">
      <div class="live-goal-head">
        <h3 style="margin:0">Daily goal · ${l(i.name)}</h3>
        <span class="chip${r?" chip-ok":""}">${r?"Goal met":l(c)}</span>
      </div>
      <p class="muted" style="margin:4px 0 8px;font-size:12px">${l(Vm(i.endsAt))} · @${l(i.hostName||e.hostName)} · TEST MODE</p>
      <div class="live-goal-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${o}" aria-label="Goal progress">
        <div class="live-goal-fill" style="width:${o}%"></div>
      </div>
      <p class="live-goal-amounts" style="margin:8px 0 10px">
        <strong>${ve(i.raised)}</strong> / ${ve(i.targetAmount)}
        <span class="muted"> · ${o}%</span>
        <span class="chip" style="margin-left:8px">Coins ${l($e(n))}</span>
      </p>
      <div class="field live-goal-message-field" style="margin:10px 0 8px">
        <label for="liveGoalSupportMessage">Message to the creator (optional)</label>
        <input id="liveGoalSupportMessage" maxlength="180" placeholder="Show some love with your donation" autocomplete="off" aria-describedby="liveGoalSupportMessageHint liveGoalSupportMessageCount" />
        <div class="live-goal-message-meta">
          <p class="muted" id="liveGoalSupportMessageHint">Saved with your demo coin transaction on this device only. Not delivered to a real streamer.</p>
          <output id="liveGoalSupportMessageCount" for="liveGoalSupportMessage" aria-live="off">0 / 180</output>
        </div>
      </div>
      <div class="row wrap live-goal-donate-row" style="gap:8px">
        ${d}
      </div>
      <form class="live-goal-custom-form" data-goal-id="${l(i.id)}" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;align-items:end">
        <label style="flex:1;min-width:125px">Custom coins<input type="number" class="live-goal-custom-coins" inputmode="numeric" min="1" max="1000000" step="1" required placeholder="Enter coins" style="width:100%" /></label>
        <button class="btn primary" type="submit">Donate custom</button>
      </form>
      <p class="muted" style="margin:8px 0 0;font-size:11px">50 / 100 / 250 coins ≈ $1 / $2 / $5 · 100 coins = $2 · TEST MODE</p>
      ${p}
    </div>`}function Hm(e){return e?`
    <div class="card" id="live-go">
      <h3>Go live · TEST MODE</h3>
      <p class="muted">Fake stream UI with title, viewer stub, chat, tips, gifts (coins), and paid song requests. Persisted in localStorage (<code>dbs_v1.live</code> + <code>coins</code> + <code>liveGiftLedger</code> + <code>liveSongRequests</code>).</p>
      <div class="field"><label>Stream title</label>
        <input id="liveTitle" maxlength="80" placeholder="e.g. Listening session · Long Story Short" value="PIKK Live · ${l(e.username)}" />
      </div>
      <div class="field"><label>Today's goal name <span class="muted">(optional)</span></label>
        <input id="liveGoalNameGo" maxlength="80" placeholder="e.g. Studio session fund" />
      </div>
      <div class="field"><label>Goal amount ($) <span class="muted">(optional)</span></label>
        <input id="liveGoalAmtGo" type="number" min="1" step="1" placeholder="50" />
      </div>
      <button class="btn primary block" id="liveStart">Start stream</button>
      <p class="chip" style="margin-top:10px">No real media · tips/song reqs use demo wallet · gifts use demo coins · optional 24h goal</p>
    </div>`:`
      <div class="card" id="live-go">
        <h3>Go live</h3>
        <p class="muted">Sign in to start a demo livestream (no real camera).</p>
        <a class="btn primary" href="#/profile">Sign in</a>
        <p class="chip" style="margin-top:10px">TEST MODE</p>
      </div>`}function zm(e){return e.length?`
    <div class="card">
      <h3>Recent streams (this device)</h3>
      <ul class="list-plain">
        ${e.slice(0,8).map(t=>`<li>
              <span><strong>${l(t.title)}</strong><br/><span class="muted" style="font-size:12px">@${l(t.hostName)} · ${K(t.endedAt||t.startedAt)} · tips ${ve(t.tipsTotal)}</span></span>
              <span class="chip">${t.endedAt?"Ended":"Live"}</span>
            </li>`).join("")}
      </ul>
    </div>`:""}function Wm(e){if(!e||e.endedAt)return"";const t=rc(10),s=t.length?t.map((r,c)=>{const d=rt(r.lastSlug||"rose",{className:"gift-sticker gift-sticker--xs"});return`<div class="live-obar-cell" title="${l(r.username)} · ${ve(r.usd)} today">
            <span class="live-obar-rank">${c+1}</span>
            ${d}
            <span class="live-obar-name">${l(r.username)}</span>
          </div>`}).join(""):'<div class="live-obar-empty muted">No gifters yet today</div>',i=_a(10),a=i.length?i.map((r,c)=>{const d=rt("battle-win",{className:"gift-sticker gift-sticker--xs"});return`<div class="live-obar-cell" title="${l(r.username)} · rest of day">
            <span class="live-obar-rank">${c+1}</span>
            ${d}
            <span class="live-obar-name">${l(r.username)}</span>
          </div>`}).join(""):'<div class="live-obar-empty muted">No winners yet today</div>',n=ka(e.id).find(r=>r.status==="playing");let o="";if(n){const r=n.title||"Song";o=`
      <div class="live-obar live-obar-spotlight" id="liveRequestSpotlight" role="status" aria-live="polite">
        <span class="live-obar-label">Request Spotlight</span>
        <span class="live-obar-spotlight-name">@${l(n.username||"fan")}</span>
        <span class="muted live-obar-spotlight-song">${l(r)}</span>
        <span class="chip">TEST MODE</span>
      </div>`}return`
    <div class="live-overlay-bars" id="liveOverlayBars" aria-label="Live overlay bars">
      <div class="live-obar live-obar-gifters" id="liveTopGifters">
        <span class="live-obar-label">Top Gifters</span>
        <div class="live-obar-track">${s}</div>
        <span class="chip live-obar-chip">Day · TEST MODE</span>
      </div>
      <div class="live-obar live-obar-gb" id="liveGbWinnersBar">
        <span class="live-obar-label">Gift Battle</span>
        <div class="live-obar-track">${a}</div>
        <span class="chip live-obar-chip">1–10 · day</span>
      </div>
      ${o}
    </div>`}function Ym(e){const t=Pc();if(!t)return"";const s=rt(t.giftSlug||"rose",{className:"gift-sticker"}),a=e&&e.id===t.fromUserId?`<p class="muted" style="margin:8px 0 0;font-size:12px">You triggered this · others can Challenge you · TEST MODE</p>
       <button type="button" class="btn ghost" id="liveGbPopDismiss">Dismiss</button>`:`<div class="row wrap" style="gap:8px;margin-top:10px">
         <button type="button" class="btn primary" id="liveGbPopChallenge">Challenge @${l(t.fromUser)}</button>
         <button type="button" class="btn ghost" id="liveGbPopDismiss">Dismiss</button>
       </div>`;return`
    <div class="live-gb-pop" id="liveGbChallengePop" role="dialog" aria-label="Gift Battle challenge">
      <div class="live-gb-pop-card">
        <div class="row wrap" style="gap:10px;align-items:center">
          ${s}
          <div>
            <div class="chip">Gift Battle</div>
            <h3 style="margin:4px 0">@${l(t.fromUser)} sent ${l(t.giftName)}</h3>
            <p class="muted" style="margin:0;font-size:12px">${l(String(t.coins))} demo coins · no real payment · Challenge this gifter · 60s battle</p>
          </div>
        </div>
        ${a}
        <p class="chip" style="margin-top:8px">TEST MODE · broadcast demo · invitations respect prefs</p>
      </div>
    </div>`}function Jm(e){var a,n,o,r,c,d,p,m;Oa();const t=Ia();if(!t||!e)return"";if(t.status==="active"||t.status==="ended"){const h=Math.max(0,Number(t.scoreA)||0),f=Math.max(0,Number(t.scoreB)||0),v=h+f,k=t.status==="active"?Math.max(0,Math.ceil((Number(t.endsAt)-Date.now())/1e3)):0,b=t.winnerName?"@"+l(t.winnerName):"Tie";return`
      <section class="card live-battle-scoreboard" aria-label="Live Gift Battle scoreboard">
        <div class="row wrap" style="justify-content:space-between;align-items:center">
          <strong>⚔️ PIKK Live Battle</strong>
          <span class="chip" id="liveBattleTimer" data-ends-at="${Number(t.endsAt)||0}">${t.status==="active"?k+"s left":"Finished"}</span>
        </div>
        <div class="row" style="justify-content:space-between;gap:12px;margin:12px 0">
          <div><strong>@${l(((a=t.challenger)==null?void 0:a.name)||"Challenger")}</strong><div>${Ne(h)} demo points</div></div>
          <strong>VS</strong>
          <div style="text-align:right"><strong>@${l(((n=t.opponent)==null?void 0:n.name)||"Opponent")}</strong><div>${Ne(f)} demo points</div></div>
        </div>
        <div class="live-battle-score-track" role="progressbar" aria-label="Challenger share of battle points" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${v?Math.round(h/v*100):50}" style="height:10px;background:var(--blue);border-radius:10px;overflow:hidden">
          <div style="width:${v?Math.round(h/v*100):50}%;height:100%;background:var(--acc)"></div>
        </div>
        ${t.status==="ended"?`<p class="live-battle-winner" style="font-weight:800;margin-top:10px">🏆 ${b} · Battle complete</p>`:'<p class="muted" style="margin-top:10px">Scores update with demo gifts · no real money</p>'}
        <a href="#/giftbattles" class="btn ghost" style="margin-top:8px">Battle details</a>
      </section>`}if(t.status!=="pending")return"";const s=((o=t.opponent)==null?void 0:o.id)===e.id,i=((r=t.challenger)==null?void 0:r.id)===e.id;return!s&&!i?`
      <div class="card live-gb-pending-note">
        <span class="chip">Pending battle</span>
        <span class="muted" style="margin-left:8px;font-size:12px">${l((c=t.challenger)==null?void 0:c.name)} vs ${l((d=t.opponent)==null?void 0:d.name)} · waiting</span>
      </div>`:s?`
      <div class="card live-gb-pending" id="liveGbPending">
        <strong>@${l((p=t.challenger)==null?void 0:p.name)}</strong> challenged you to a Gift Battle
        <div class="row wrap" style="gap:8px;margin-top:8px">
          <button type="button" class="btn primary" id="liveGbAccept">Accept · 60s</button>
          <button type="button" class="btn ghost" id="liveGbDecline">Decline</button>
        </div>
        <p class="chip" style="margin-top:8px">TEST MODE · recognition only</p>
      </div>`:`
    <div class="card live-gb-pending-note">
      <span class="chip">Waiting</span>
      <span class="muted" style="margin-left:8px;font-size:12px">Challenge sent to @${l((m=t.opponent)==null?void 0:m.name)}</span>
      <a class="btn ghost" href="#/giftbattles" style="margin-left:8px">Open Gift Battles</a>
    </div>`}function Qm(){const e=_a(10);return e.length?`
    <div class="card live-gb-day" id="liveGbDayWinners">
      <h3 style="margin:0 0 6px">Gift Battle winners today</h3>
      <p class="muted" style="margin:0 0 8px;font-size:12px">Up to 10 · until end of day · TEST MODE</p>
      <ul class="live-gb-day-list">${e.map((s,i)=>`<li class="live-gb-day-row"><span class="live-gb-day-sticker">${rt("battle-win",{className:"gift-sticker gift-sticker--xs"})}</span><span class="chip">#${i+1}</span><strong>${l(s.username)}</strong></li>`).join("")}</ul>
    </div>`:""}function Xm(){var p;const{user:e,live:t}=M(),s=Jl(),i=t&&!t.endedAt,a=!!t,n=Yo(),o=((p=Fe().query)==null?void 0:p.category)||"";let c=`
    <div class="live-disc-panel" data-panel="channels">
      ${o?`<div class="card"><strong>Category: ${l(o)}</strong> <a class="btn ghost" href="#/live?tab=categories">All categories</a> <a class="btn ghost" href="#/live?tab=channels">All channels</a><p class="muted small">Only channels tagged with this category are shown below.</p></div>`:""}
      ${Bm(o)}
      ${o?"":Qm()}
      ${i?"":Hm(e)}
      ${i?"":Jo({title:"No active Live on this device — house catalog on Spotlight / Open Mic"})}
      ${zm(s)}
      <div class="card">
        <p class="muted" style="margin:0 0 8px">More Live tools</p>
        <div class="row wrap">
          <a class="btn ghost" href="#/connect#connect-multistream">Multi-platform go-live</a>
          <a class="btn ghost" href="#/multiguest">Multi-Guest</a>
          <a class="btn ghost" href="#/shorts">Shorts / Clips</a>
        </div>
        <p class="muted" style="margin:8px 0 0;font-size:12px">Open Mic + Spotlight are 24/7 categories (chips above). Clips live under Watch → Shorts / Clips. Gifts + song requests run during an active Live. Gift Battles is not promoted from this page.</p>
      </div>
    </div>`;n==="following"?c=Om(e):n==="categories"&&(c=qm());const d=`
    ${Pm(n)}
    ${Im("live")}
    ${i?Wm(t):""}
    ${i?Ym(e):""}
    ${i?Jm(e):""}
    ${a?Fm(t):""}
    ${i?Um(t,e):""}
    ${i?jm(t,e):""}
    ${i?Km(t,e):""}
    ${c}
  `;return I("PIKK Live",d,{lead:"Following · Clips · Channels · Categories → Shorts · Request Spotlight · TEST MODE.",badge:i?"LIVE":void 0})}const pa=[];let Qi=!1;function Zm(e,t){pa.push(t),Qo(e)}function Qo(e){if(Qi)return;const t=e.querySelector("#liveGiftOverlay");if(!t){pa.length=0;return}const s=pa.shift();if(!s)return;Qi=!0;const a=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches?900:s.tier==="cinematic"?4200:s.tier==="premium"?2800:1600;t.innerHTML=`
    <div class="lg-overlay-card lg-tier-${l(s.tier||"small")}" data-slug="${l(s.slug)}">
      <div class="lg-overlay-sticker">${rt(s.slug)}</div>
      <div class="lg-overlay-copy">
        <strong>${l(s.name)}</strong>
        <span>@${l(s.fromUser)} · ${l($e(s.coins))} coins</span>
        <span class="muted lg-overlay-brief">${l(s.animation||"")}</span>
      </div>
    </div>`,t.classList.add("is-on"),window.setTimeout(()=>{t.classList.remove("is-on"),t.innerHTML="",Qi=!1,Qo(e)},a)}function eh(e){e.querySelectorAll(".lg-buy").forEach(t=>{t.addEventListener("click",()=>{const s=Sr(Number(t.dataset.coins));if((s==null?void 0:s.error)==="bad_package")return g("Unknown coin pack");if(s!=null&&s.error)return g(String(s.error));g(`+${$e(s.pack.coins)} coins · ${ve(s.pack.usd)} · TEST MODE`),fe()})}),e.querySelectorAll(".lg-gift").forEach(t=>{t.addEventListener("click",()=>{var r,c,d;const s=t.dataset.slug,i=t.dataset.confirm==="1",a=Sa.find(p=>p.slug===s);if(!a)return g("Gift not found");if(i&&!window.confirm(`Send ${a.name} for ${$e(a.coins)} coins (${ve(a.usd)})?
TEST MODE · demo coins only`))return;const n=(r=M().live)==null?void 0:r.id,o=oc({liveId:n,slug:s});if((o==null?void 0:o.error)==="signin")return g("Sign in first");if((o==null?void 0:o.error)==="offline")return g("Not live");if((o==null?void 0:o.error)==="insufficient")return g(`Need ${$e(o.need)} coins — buy a pack below · TEST MODE`);if((o==null?void 0:o.error)==="bad_gift")return g("Unknown gift");if(o!=null&&o.error)return g(String(o.error));Zm(e,{slug:a.slug,name:a.name,coins:a.coins,tier:a.tier,animation:a.animation,fromUser:((c=o.entry)==null?void 0:c.fromUser)||((d=M().user)==null?void 0:d.username)||"you"}),g(`Sent ${a.name} · ${$e(a.coins)} coins · TEST MODE`),window.setTimeout(()=>fe(),200)})})}function th(e){var o,r;const t=e.querySelector("#lsrPacks"),s=e.querySelector("#lsrTitleFields");if(!t||!s)return;let i=1;const a=()=>{const c=i,d=Array.from({length:c},(p,m)=>`<div class="field"><label>Song ${m+1}</label>
        <input class="lsr-title-input" data-i="${m}" maxlength="80" placeholder="Song title…" /></div>`).join("");s.innerHTML=d},n=c=>{i=Number(c)||1,t.querySelectorAll(".lsr-pack").forEach(d=>{const p=Number(d.dataset.pack)===i;d.classList.toggle("on",p),d.setAttribute("aria-pressed",p?"true":"false")}),a()};t.querySelectorAll(".lsr-pack").forEach(c=>{c.addEventListener("click",()=>n(c.dataset.pack))}),n(1),(o=e.querySelector("#lsrSeedWallet"))==null||o.addEventListener("click",()=>{ci(50,"Song request demo credit · TEST MODE"),g("+$50 wallet demo · TEST MODE"),fe()}),(r=e.querySelector("#lsrSubmit"))==null||r.addEventListener("click",()=>{const c=Array.from(e.querySelectorAll(".lsr-title-input")).map(p=>p.value),d=Xl({pack:i,titles:c});if((d==null?void 0:d.error)==="signin")return g("Sign in first");if((d==null?void 0:d.error)==="offline")return g("Not live");if((d==null?void 0:d.error)==="bad_pack")return g("Pick a pack");if((d==null?void 0:d.error)==="title_count")return g(`Enter ${d.need} song title${d.need>1?"s":""}`);if((d==null?void 0:d.error)==="insufficient")return g(`Need ${ve(d.need)} — tap + $50 demo credit · TEST MODE`);if(d!=null&&d.error)return g(String(d.error));g(`Song request submitted · ${ve(d.entry.price)} · TEST MODE`),fe()}),e.querySelectorAll(".lsr-play").forEach(c=>{c.addEventListener("click",()=>{var v;const d=c.dataset.rid,p=Number(c.dataset.si),h=ka((v=M().live)==null?void 0:v.id).find(k=>k.requestId===d&&k.songIndex===p);let f;if((h==null?void 0:h.status)==="playing"){if(f=tc(d,p),(f==null?void 0:f.error)==="host_only")return g("Host only");if(f!=null&&f.error)return g(String(f.error));g("Marked played · TEST MODE")}else{if(f=Zl(d,p),(f==null?void 0:f.error)==="host_only")return g("Host only");if(f!=null&&f.error)return g(String(f.error));g("Now playing · TEST MODE")}fe()})}),e.querySelectorAll(".lsr-skip").forEach(c=>{c.addEventListener("click",()=>{const d=ec(c.dataset.rid,Number(c.dataset.si));if((d==null?void 0:d.error)==="host_only")return g("Host only");if(d!=null&&d.error)return g(String(d.error));g("Skipped · TEST MODE"),fe()})})}function sh(e){var s,i,a,n,o,r,c,d;Lm(e),e.querySelectorAll(".hot-live-watch").forEach(p=>{p.addEventListener("click",()=>{Ui();const m=p.dataset.host||"creator",h=p.dataset.id||"",f=e.querySelector(`.hot-live-card[data-live-id="${CSS.escape(h)}"]`);e.querySelectorAll(".hot-live-card.is-watching").forEach(v=>v.classList.remove("is-watching")),f==null||f.classList.add("is-watching"),g(`Watching @${m} · demo only`)})}),e.querySelectorAll(".hot-live-spike").forEach(p=>{p.addEventListener("click",()=>{var v;const m=p.dataset.id,h=Dp(m);if((h==null?void 0:h.error)==="missing")return g("Live not found");if(h!=null&&h.error)return g(String(h.error));const f=((v=h.live)==null?void 0:v.hostName)||"creator";g(h.deduped?`Spike @${f} · Admin alert already open`:`Spike @${f} · Admin engagement alert queued`),fe()})}),(s=e.querySelector("#liveStart"))==null||s.addEventListener("click",()=>{var v,k,b,S,$;const p=(k=(v=e.querySelector("#liveTitle"))==null?void 0:v.value)==null?void 0:k.trim(),m=pn(p);if((m==null?void 0:m.error)==="signin")return g("Sign in first");if((m==null?void 0:m.error)==="already_live")return g("Already live");const h=(S=(b=e.querySelector("#liveGoalNameGo"))==null?void 0:b.value)==null?void 0:S.trim(),f=Number(($=e.querySelector("#liveGoalAmtGo"))==null?void 0:$.value);if(h&&f>0){const A=Ar({name:h,targetAmount:f});(A==null?void 0:A.error)==="signin"?g("Sign in to set goal"):A!=null&&A.error?g("Goal not set · "+A.error):g(`Live goal set · $${f} · 24h · TEST MODE`)}Ui(),g("You are live · TEST MODE"),fe()}),(i=e.querySelector("#liveRestart"))==null||i.addEventListener("click",()=>{var h;const p="PIKK Live · "+(((h=M().user)==null?void 0:h.username)||"Demo"),m=pn(p);if(m!=null&&m.error)return g(String(m.error));Ui(),g("Back live · TEST MODE"),fe()}),(a=e.querySelector("#liveEnd"))==null||a.addEventListener("click",()=>{zl(),Po(),g("Stream ended"),fe()}),(n=e.querySelector("#liveBumpViewers"))==null||n.addEventListener("click",()=>{const p=Wl(),m=e.querySelector("#liveViewers");m&&p&&(m.textContent=Ne(p.viewers||0)),g("Viewers updated (stub)")}),(o=e.querySelector("#liveTip"))==null||o.addEventListener("click",p=>{const m=p.currentTarget,h=kr({kind:"tip",amount:Number(m.dataset.amt)||1});if((h==null?void 0:h.error)==="signin")return g("Sign in first");if((h==null?void 0:h.error)==="offline")return g("Not live");g("Tip sent · demo"),fe()});const t=()=>{var f;const p=e.querySelector("#liveChatInput"),m=(f=p==null?void 0:p.value)==null?void 0:f.trim();if(!m)return g("Type a message");const h=Yl(m);if((h==null?void 0:h.error)==="signin")return g("Sign in first");if((h==null?void 0:h.error)==="offline")return g("Not live");(h==null?void 0:h.error)!=="empty"&&(p&&(p.value=""),fe())};(r=e.querySelector("#liveChatSend"))==null||r.addEventListener("click",t),(c=e.querySelector("#liveChatInput"))==null||c.addEventListener("keydown",p=>{p.key==="Enter"&&t()}),(d=e.querySelector("#liveFocusGifts"))==null||d.addEventListener("click",()=>{var p;(p=e.querySelector("#liveGifts"))==null||p.scrollIntoView({behavior:"smooth",block:"start"})}),eh(e),th(e),ih(e)}function ih(e){var i;(i=e.querySelector("#liveGoalSave"))==null||i.addEventListener("click",()=>{var r,c,d;const a=(c=(r=e.querySelector("#liveGoalName"))==null?void 0:r.value)==null?void 0:c.trim(),n=Number((d=e.querySelector("#liveGoalAmt"))==null?void 0:d.value),o=Ar({name:a,targetAmount:n});if((o==null?void 0:o.error)==="signin")return g("Sign in first");if((o==null?void 0:o.error)==="bad_name")return g("Enter a goal name");if((o==null?void 0:o.error)==="bad_amount")return g("Enter a goal amount ($)");if(o!=null&&o.error)return g(String(o.error));g(`Goal live · $${o.goal.targetAmount} · 24h window · TEST MODE`),fe()});const t=e.querySelector("#liveGoalSupportMessage"),s=e.querySelector("#liveGoalSupportMessageCount");if(t&&s){const a=()=>{s.textContent=`${t.value.length} / 180`};t.addEventListener("input",a),a()}e.querySelectorAll(".live-goal-custom-form").forEach(a=>{a.addEventListener("submit",n=>{var c,d;n.preventDefault();const o=Number((c=a.querySelector(".live-goal-custom-coins"))==null?void 0:c.value);if(!Number.isSafeInteger(o)||o<1||o>1e6)return g("Enter 1–1,000,000 whole coins");const r=oi(a.dataset.goalId,o,{message:((d=e.querySelector("#liveGoalSupportMessage"))==null?void 0:d.value)||""});if((r==null?void 0:r.error)==="signin")return g("Sign in first");if((r==null?void 0:r.error)==="insufficient")return g("Not enough demo coins");if(r!=null&&r.error)return g("Donation unavailable · TEST MODE");g("Custom donation sent · TEST MODE"),fe()})}),e.querySelectorAll(".live-goal-donate").forEach(a=>{a.addEventListener("click",()=>{var d,p;const n=a.dataset.goalId,o=Number(a.dataset.coins),r=oi(n,o,{message:((d=e.querySelector("#liveGoalSupportMessage"))==null?void 0:d.value)||""});if((r==null?void 0:r.error)==="signin")return g("Sign in first");if((r==null?void 0:r.error)==="insufficient")return g(`Need ${$e(r.need)} coins — buy a pack in Gifts · TEST MODE`);if((r==null?void 0:r.error)==="expired")return g("Goal ended · 24h window over");if((r==null?void 0:r.error)==="unknown_goal")return g("Goal not found");if((r==null?void 0:r.error)==="invalid_amount")return g("Pick a donate amount");if(r!=null&&r.error)return g(String(r.error));const c=((p=r.donated)==null?void 0:p.usd)??o/50;g(`Donated ${$e(o)} coins ($${Number(c).toFixed(2)}) · TEST MODE`),fe()})})}const ah={BASE_URL:"/pikk-app/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_BASE:"/pikk-app/",VITE_BUILD_SHA:"291f11d05ef96fdf66e148305b5086c039e18093"};function nh(e=ah&&"/pikk-app/"||"/"){return String(e).replace(/\/?$/,"/")+"brand/pikk-official-approved.jpg"}const ti=le.filter(e=>["dirty-money","93","no-love"].includes(e.id)).map(e=>({id:e.id,title:e.title,artist:"DatBoiSkeet",url:e.youtube,thumbnail:`https://i.ytimg.com/vi/${encodeURIComponent(new URL(e.youtube).searchParams.get("v"))}/hqdefault.jpg`})),Un=[{id:"videos",label:"Videos"},{id:"clips",label:"Viral clips",browseHref:"#/shorts",browseLabel:"Browse existing PIKK Clips"},{id:"songs",label:"Songs",browseHref:"#/music",browseLabel:"Explore PIKK Music"},{id:"photos",label:"Photos",browseHref:"#/home",browseLabel:"Explore PIKK Home"}];function rh(){const e=ti[0],t=ti.map((s,i)=>`
    <button type="button" class="pikk-viral-choice${i===0?" is-selected":""}"
      data-viral-pick="${i}" aria-pressed="${i===0}">
      <span class="pikk-viral-choice-num">${String(i+1).padStart(2,"0")}</span>
      <img class="pikk-viral-choice-thumb" src="${l(s.thumbnail)}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer">
      <span class="pikk-viral-choice-copy"><strong>${l(s.title)}</strong><small>${l(s.artist)} · Original YouTube source</small></span>
      <span class="pikk-viral-choice-arrow" aria-hidden="true">↗</span>
    </button>`).join("");return I("PIKK Viral Live",`
    <div id="pikkViralPreview" class="pikk-viral-page">
      <section class="pikk-viral-hero" aria-label="PIKK Viral Live channel preview">
        <div class="pikk-viral-hero-copy">
          <span class="pikk-viral-kicker"><span aria-hidden="true" class="pikk-viral-signal"></span> PIKK 24/7 · CHANNEL PREVIEW</span>
          <h2>What's viral.<br><em>All in one place.</em></h2>
          <p>Discover clips, music, videos and creators in one nonstop destination when the licensed channel launches.</p>
          <div class="pikk-viral-hero-actions">
            <a class="btn primary" href="#/live">Explore PIKK Live</a>
            <a class="btn ghost" href="#/shorts">Explore Clips</a>
          </div>
        </div>
        <div class="pikk-viral-hero-mark" aria-hidden="true"><img class="pikk-viral-hero-logo" src="${l(nh())}" alt="" decoding="async" loading="eager"></div>
      </section>

      <div class="pikk-viral-notice" role="status">
        <strong>PREVIEW · NOT BROADCASTING</strong>
        <span>Real-time viewer counts, live chat, engagement ranking and 24/7 playback are not connected. Nothing here is represented as live.</span>
      </div>

      <nav class="pikk-viral-tabs" aria-label="Viral Live content types" role="tablist">
        ${Un.map((s,i)=>`<button type="button" role="tab" data-viral-type="${s.id}" aria-selected="${i===0}" tabindex="${i===0?0:-1}" aria-controls="viral-panel-${s.id}" id="viral-tab-${s.id}">${s.label}</button>`).join("")}
      </nav>

      <section id="viral-panel-videos" data-viral-panel="videos" role="tabpanel" tabindex="0" aria-labelledby="viral-tab-videos">
        <div class="pikk-viral-stage" aria-label="Original video discovery">
          <div class="pikk-viral-stage-art"><img id="pikkViralThumbnail" src="${l(e.thumbnail)}" alt="" decoding="async" referrerpolicy="no-referrer"><span class="pikk-viral-stage-play" aria-hidden="true">▶</span><small>ORIGINAL VIDEO · SOURCE PREVIEW</small></div>
          <div class="pikk-viral-stage-body">
            <span class="pikk-viral-stage-eyebrow">FEATURED SOURCE · NOT A LIVESTREAM</span>
            <h3 id="pikkViralTitle" aria-live="polite">${l(e.title)}</h3>
            <p id="pikkViralCreator">${l(e.artist)} · Watch from the original publisher</p>
            <a class="btn primary" id="pikkViralSource" href="${l(e.url)}" target="_blank" rel="noopener noreferrer">Watch original on YouTube</a>
            <p class="pikk-viral-caption">Opening the source does not grant PIKK rebroadcast or music licensing rights.</p>
          </div>
        </div>
        <div class="pikk-viral-section-head"><h3>Up next · source library</h3><span>Manual preview · ${ti.length} existing music videos</span></div>
        <div class="pikk-viral-queue" id="pikkViralQueue" role="group" aria-label="Choose an original video source">${t}</div>
      </section>

      ${Un.filter(s=>s.id!=="videos").map(s=>`
        <section class="pikk-viral-empty" id="viral-panel-${s.id}" data-viral-panel="${s.id}" role="tabpanel" tabindex="0" aria-labelledby="viral-tab-${s.id}" hidden>
          <span class="pikk-viral-empty-symbol" aria-hidden="true">◇</span>
          <h3>${l(s.label)} are being prepared</h3>
          <p>No approved items are queued in this category yet. Creator permission, licensing and moderation must be confirmed before content appears here.</p>
          <a class="btn ghost" href="${l(s.browseHref)}">${l(s.browseLabel)}</a>
        </section>`).join("")}

      <section class="pikk-viral-safety" aria-label="Channel launch requirements">
        <div><span class="pikk-viral-section-kicker">CREATOR FIRST</span><h3>Trending, with permission.</h3><p>Creators will be credited and linked to their profiles. The planned feed will rotate by engagement quality, velocity and freshness, not views alone.</p></div>
        <ul>
          <li>Explicit permission to rebroadcast every video, photo and song</li>
          <li>Music and third-party rights clearance before playback</li>
          <li>Moderation, creator opt-out, removal and duplicate checks</li>
          <li>Real-time chat, viewer counts and Up Next only when backed by a live service</li>
        </ul>
      </section>
    </div>
  `,{lead:"Discover the planned 24/7 viral channel · preview only"})}function oh(e){const t=e.querySelector("#pikkViralPreview");if(!t)return;t.querySelectorAll("[data-viral-pick]").forEach(n=>{n.addEventListener("click",()=>{const o=Number(n.dataset.viralPick),r=ti[o];r&&(t.querySelector("#pikkViralTitle").textContent=r.title,t.querySelector("#pikkViralCreator").textContent=r.artist+" · Watch from the original publisher",t.querySelector("#pikkViralSource").href=r.url,t.querySelector("#pikkViralThumbnail").src=r.thumbnail,t.querySelectorAll("[data-viral-pick]").forEach(c=>{const d=c===n;c.classList.toggle("is-selected",d),c.setAttribute("aria-pressed",String(d))}))})});const s=Array.from(t.querySelectorAll("[data-viral-pick]"));s.forEach((n,o)=>{n.addEventListener("keydown",r=>{if(!["ArrowRight","ArrowLeft","ArrowDown","ArrowUp","Home","End"].includes(r.key))return;r.preventDefault();const c=s.length-1,d=r.key==="Home"?0:r.key==="End"?c:(o+(["ArrowRight","ArrowDown"].includes(r.key)?1:-1)+s.length)%s.length,p=s[d];p.click(),p.focus(),p.scrollIntoView({block:"nearest",inline:"nearest"})})});const i=Array.from(t.querySelectorAll("[data-viral-type]"));function a(n,o=!1){const r=n.dataset.viralType;i.forEach(c=>{const d=c===n;c.setAttribute("aria-selected",String(d)),c.tabIndex=d?0:-1}),t.querySelectorAll("[data-viral-panel]").forEach(c=>{c.hidden=c.dataset.viralPanel!==r}),o&&(n.focus(),n.scrollIntoView({block:"nearest",inline:"nearest"}))}i.forEach((n,o)=>{n.addEventListener("click",()=>a(n)),n.addEventListener("keydown",r=>{if(!["ArrowRight","ArrowLeft","Home","End"].includes(r.key))return;r.preventDefault();const c=i.length-1,d=r.key==="Home"?0:r.key==="End"?c:(o+(r.key==="ArrowRight"?1:-1)+i.length)%i.length;a(i[d],!0)})})}function ns(){R("#/marketplace")}const lh={pending:"Pending",approved:"Approved",rejected:"Rejected"},ch=[{v:"sponsored_post",label:"Sponsored post"},{v:"livestream_promo",label:"Livestream promo"},{v:"affiliate",label:"Affiliate link"},{v:"storefront",label:"Product storefront"}];function dh(){const{brandApps:e,user:t}=M(),s=mc(),i=s.filter(r=>r.active),a=i.length?i.map(r=>`
      <article class="card market-listing" data-id="${l(r.id)}">
        <div class="row wrap">
          <span class="chip">Sponsored</span>
          <span class="chip">${l(r.disclosure||"Paid partnership")}</span>
          <span class="muted spacer" style="text-align:right;font-size:12px">${K(r.at)}</span>
        </div>
        <h3 style="margin:8px 0 4px">${l(r.title)}</h3>
        <p class="muted" style="margin:0 0 6px">${l(r.brand)}</p>
        <p style="margin:0 0 10px;font-size:14px">${l(r.blurb||"")}</p>
        <div class="row wrap">
          ${r.url?`<a class="btn" href="${l(r.url)}" target="_blank" rel="noopener">Visit offer</a>`:""}
          <button class="btn ghost listing-toggle" data-id="${l(r.id)}" data-active="0">Hide · demo</button>
        </div>
      </article>`).join(""):'<div class="card"><p class="muted" style="margin:0">No active sponsored listings yet. Apply as a brand or create a demo listing below.</p></div>',n=e.length?e.map(r=>`
      <div class="card" style="margin:0 0 10px;background:#12121a" data-app="${l(r.id)}">
        <div class="row wrap">
          <strong>${l(r.brand)}</strong>
          <span class="chip">${l(lh[r.status]||r.status)}</span>
          <span class="muted spacer" style="text-align:right">${K(r.at)}</span>
        </div>
        <p class="muted" style="margin:6px 0;font-size:12px">${l(r.email)} · ${l(r.campaign)} · budget ${l(r.budget||"—")}</p>
        <p style="font-size:13px;margin:0 0 8px">${l((r.pitch||"").slice(0,160))}</p>
        <div class="row wrap">
          <button class="btn primary brand-status" data-id="${l(r.id)}" data-status="approved">Approve</button>
          <button class="btn ghost brand-status" data-id="${l(r.id)}" data-status="rejected">Reject</button>
          ${r.status==="approved"?`<button class="btn brand-to-listing" data-id="${l(r.id)}" data-brand="${l(r.brand)}" data-url="${l(r.url||"")}" data-pitch="${l(r.pitch||"")}">Create listing</button>`:""}
        </div>
      </div>`).join(""):'<p class="muted">No brand applications yet.</p>',o=`
    <div class="card">
      <h3>Featured offers</h3>
      <p class="muted" style="margin:0 0 10px">Commission example: marketplace 85/15 · sponsored campaigns 80/20. Disclosures required.</p>
    </div>
    ${a}

    <div class="card">
      <h3>Apply as Brand · TEST MODE</h3>
      <p class="muted">Demo application — stored in localStorage (<code>dbs_v1.brandApps</code>). No real billing.</p>
      <div class="grid-2">
        <div class="field"><label>Brand / business *</label><input id="mBrand" required /></div>
        <div class="field"><label>Contact name</label><input id="mContact" /></div>
      </div>
      <div class="grid-2">
        <div class="field"><label>Email *</label><input id="mEmail" type="email" required /></div>
        <div class="field"><label>Budget (approx)</label><input id="mBudget" placeholder="e.g. $500" /></div>
      </div>
      <div class="field"><label>Campaign type</label>
        <select id="mCampaign">
          ${ch.map(r=>`<option value="${r.v}">${l(r.label)}</option>`).join("")}
        </select>
      </div>
      <div class="field"><label>Offer / product URL</label><input id="mUrl" placeholder="https://" /></div>
      <div class="field"><label>Pitch</label><textarea id="mPitch" placeholder="What should creators promote?"></textarea></div>
      <button class="btn primary block" id="mSubmit">Submit application</button>
      <p class="chip" style="margin-top:10px">Signed in as ${l((t==null?void 0:t.username)||"guest")}</p>
    </div>

    <div class="card">
      <h3>Create sponsored listing · demo</h3>
      <p class="muted">Skip the application queue — publish a listing directly for UI testing.</p>
      <div class="grid-2">
        <div class="field"><label>Title *</label><input id="lTitle" placeholder="Summer drop · 20% off" /></div>
        <div class="field"><label>Brand *</label><input id="lBrand" placeholder="Brand name" /></div>
      </div>
      <div class="field"><label>Blurb</label><textarea id="lBlurb" placeholder="Short offer copy"></textarea></div>
      <div class="field"><label>URL</label><input id="lUrl" placeholder="https://" /></div>
      <div class="field"><label>Disclosure</label><input id="lDisc" value="Paid partnership · TEST MODE" /></div>
      <button class="btn primary block" id="lCreate">Publish listing</button>
    </div>

    <div class="card">
      <h3>Applications (this device)</h3>
      ${n}
      <p class="muted" style="font-size:12px;margin-top:8px">Demo approve / reject here. Approved apps can spawn a listing.</p>
    </div>

    ${s.some(r=>!r.active)?`<div class="card">
            <h3>Hidden listings</h3>
            ${s.filter(r=>!r.active).map(r=>`<div class="row wrap" style="margin-bottom:8px">
                  <span>${l(r.title)} · ${l(r.brand)}</span>
                  <button class="btn ghost listing-toggle" data-id="${l(r.id)}" data-active="1">Show</button>
                </div>`).join("")}
          </div>`:""}
  `;return I("Marketplace",o,{lead:"Brand applications & sponsored listings · localStorage demo."})}function ph(e){var t,s;(t=e.querySelector("#mSubmit"))==null||t.addEventListener("click",()=>{var a,n,o,r,c,d,p;const i=dc({brand:(a=e.querySelector("#mBrand"))==null?void 0:a.value,contact:(n=e.querySelector("#mContact"))==null?void 0:n.value,email:(o=e.querySelector("#mEmail"))==null?void 0:o.value,budget:(r=e.querySelector("#mBudget"))==null?void 0:r.value,campaign:(c=e.querySelector("#mCampaign"))==null?void 0:c.value,url:(d=e.querySelector("#mUrl"))==null?void 0:d.value,pitch:(p=e.querySelector("#mPitch"))==null?void 0:p.value});if((i==null?void 0:i.error)==="required")return g("Brand and email required");g("Application saved"),ns()}),e.querySelectorAll(".brand-status").forEach(i=>{i.addEventListener("click",()=>{pc(i.dataset.id,i.dataset.status),g("Marked "+i.dataset.status),ns()})}),e.querySelectorAll(".brand-to-listing").forEach(i=>{i.addEventListener("click",()=>{const a=i.dataset.brand||"Brand",n=hn({title:`${a} · sponsored`,brand:a,blurb:i.dataset.pitch||"Sponsored offer from approved brand application.",url:i.dataset.url||"",disclosure:"Paid partnership · TEST MODE",brandAppId:i.dataset.id});if(n!=null&&n.error)return g("Could not create listing");g("Listing published"),ns()})}),(s=e.querySelector("#lCreate"))==null||s.addEventListener("click",()=>{var a,n,o,r,c;const i=hn({title:(a=e.querySelector("#lTitle"))==null?void 0:a.value,brand:(n=e.querySelector("#lBrand"))==null?void 0:n.value,blurb:(o=e.querySelector("#lBlurb"))==null?void 0:o.value,url:(r=e.querySelector("#lUrl"))==null?void 0:r.value,disclosure:(c=e.querySelector("#lDisc"))==null?void 0:c.value});if((i==null?void 0:i.error)==="required")return g("Title and brand required");g("Listing published"),ns()}),e.querySelectorAll(".listing-toggle").forEach(i=>{i.addEventListener("click",()=>{uc(i.dataset.id,i.dataset.active==="1"),g(i.dataset.active==="1"?"Listing shown":"Listing hidden"),ns()})})}function pe(e){R(e||"#/messages")}function uh(e){const t=e.messages||[];if(!t.length)return"No messages yet";const s=t[t.length-1];return(s.priority?"⚡ ":"")+(s.text||"").slice(0,80)}function mh(){return I("Messages",`<section class="pikk-msg-flow-hero" aria-label="PIKK messages sign-in">
      <span class="pikk-msg-flow-kicker">PIKK CONNECT · PRIVATE MESSAGES</span>
      <h2>Your conversations. <em>Your circle.</em></h2>
      <p>Try DMs, group conversations and the DatBoiSkeet team inbox with a local demo account.</p>
      <span class="chip">TEST MODE · No server messaging</span>
    </section>
    <div class="card pikk-msg-flow-panel">
      <h3>Sign in required</h3>
      <p class="muted">Private DMs, team inbox, and group chats need a local demo account.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,{lead:"Private messaging & team inbox · TEST MODE"})}function hh(e){const t=Ea(),s=t.filter(n=>li(n)>0),i=M().messagePrefs||{allowDMs:!0,allowRequests:!0},a=t.map(n=>{const o=n.kind==="group",r=!o&&n.peerId==="dbs",c=[o?'<span class="chip">Group</span>':"",r?'<span class="chip">Team</span>':"",n.request?'<span class="chip">Request</span>':"",n.muted?'<span class="chip">Muted</span>':"",n.blocked?'<span class="chip">Blocked</span>':""].filter(Boolean).join(" "),d=li(n),p=d?`<span class="chip msg-unread-chip" aria-label="${d} unread">${d}</span>`:"";return`
      <button type="button" class="msg-thread-row${d?" has-unread":""}" data-search="${l(String(n.peerName||n.peerId).toLowerCase())}" data-unread="${d>0}" data-open-thread="${l(n.id)}">
        <div class="pikk-msg-avatar" aria-hidden="true">${l(String(n.peerName||n.peerId||"?").slice(0,1).toUpperCase())}</div>
        <div class="pikk-msg-thread-body"><div class="msg-thread-top">
          <strong>${l(n.peerName||n.peerId)}</strong>
          <span class="muted">${l(K(n.updatedAt||0))}</span>
        </div>
        <div class="msg-thread-preview muted">${l(uh(n))}</div>
        <div class="msg-thread-chips">${p}${c}</div></div>
      </button>`}).join("");return`
    <section class="pikk-messages-hero" aria-label="PIKK inbox">
      <div><p class="kicker">PIKK CONNECT · MESSAGES</p><h2>Your conversations.</h2><p>Stay connected with people, groups, and the DatBoiSkeet team.</p></div>
      <span class="pikk-messages-hero-mark" aria-hidden="true">✉</span>
    </section>
    <div class="pikk-msg-tools">
      <label for="pikkMsgSearch">Search conversations</label>
      <input id="pikkMsgSearch" type="search" placeholder="Search messages..." autocomplete="off" aria-controls="msgInbox" />
      <label class="row" style="gap:8px;align-items:center;margin-top:8px" for="pikkMsgUnreadOnly"><input id="pikkMsgUnreadOnly" type="checkbox" aria-controls="msgInbox" /> Unread only (${s.length})</label>
      <div class="pikk-msg-tool-actions"><button type="button" class="btn ghost" id="pikkMsgClearFilters" aria-controls="msgInbox" hidden>Clear filters</button><button type="button" class="btn primary" id="pikkNewChatTop">+ New chat</button><button type="button" class="btn ghost" id="pikkGroupTop">Group chat</button></div>
    </div>
    <div class="card msg-team-card">
      <h3>DatBoiSkeet · Team inbox</h3>
      <p class="muted" style="margin:0 0 10px">Free inquiry or <strong>Priority $2.99 TEST MODE</strong> (not charged). Priority = faster review, not a guaranteed personal reply.</p>
      <button type="button" class="btn primary" id="msgOpenTeam">Open team chat</button>
    </div>

    <div class="card">
      <div class="row wrap" style="justify-content:space-between;gap:8px">
        <h3 style="margin:0">Inbox</h3>
        <div class="row wrap" style="gap:8px">
          <button type="button" class="btn ghost" id="msgMarkAllRead" ${s.length?"":"disabled"}>Mark all read${s.length?` (${s.length})`:""}</button>
          <button type="button" class="btn" id="msgNewChat">New chat</button>
          <button type="button" class="btn ghost" id="msgOpenGroup">DBS Fans group</button>
        </div>
      </div>
      <div class="msg-inbox" id="msgInbox">
        ${a||`<div class="msg-empty">
            <p class="muted">No conversations yet.</p>
            <button type="button" class="btn primary" id="msgEmptyNew">Start a chat</button>
          </div>`}
        <p id="pikkMsgNoResults" class="pikk-msg-no-results" role="status" hidden>No conversations match your search.</p>
      </div>
    </div>

    <div class="card">
      <h3>Privacy stubs</h3>
      <p class="muted" style="margin:0 0 10px">Demo flags only — no real moderation queue.</p>
      <div class="row wrap" style="gap:8px">
        <label class="toggle"><span>Allow DMs</span>
          <input type="checkbox" id="msgPrefDMs" ${i.allowDMs?"checked":""}/>
        </label>
        <label class="toggle"><span>Allow requests</span>
          <input type="checkbox" id="msgPrefRequests" ${i.allowRequests?"checked":""}/>
        </label>
      </div>
    </div>
  `}function gh(){return`
    <section class="pikk-msg-flow-hero" aria-label="Start a PIKK conversation">
      <span class="pikk-msg-flow-kicker">PIKK CONNECT · NEW CONVERSATION</span>
      <h2>Start a conversation. <em>Stay connected.</em></h2>
      <p>Choose a demo contact below. Mutual follows open a DM; other contacts start a message request.</p>
      <span class="chip">TEST MODE · Browser-local conversations</span>
    </section>
    <div class="card pikk-msg-flow-panel">
      <div class="row" style="justify-content:space-between">
        <h3 style="margin:0">Start chat</h3>
        <button type="button" class="btn ghost" id="msgBackInbox">← Inbox</button>
      </div>
      <p class="muted">Demo peers. Mutual follows open a DM; others create a <em>request</em> thread (still usable in TEST MODE).</p>
    </div>
    <section class="pikk-msg-contact-grid" aria-label="Available demo contacts">${Ds().map(s=>{const i=s.team||Tr(s.id),a=s.team?"Team inbox":i?"Message":"Message request";return`
      <article class="card msg-contact pikk-msg-contact-card">
        <div class="msg-contact-head">
          <span class="pikk-msg-contact-avatar" aria-hidden="true">${l(String(s.username||"?").slice(0,1).toUpperCase())}</span>
          <strong>${l(s.username)}</strong>
          ${s.team?'<span class="chip">Official</span>':i?'<span class="chip">Mutual</span>':'<span class="chip">Request</span>'}
        </div>
        <p class="muted" style="margin:6px 0 10px">${l(s.bio||"")}</p>
        <button type="button" class="btn ${s.team?"primary":""}" data-start-peer="${l(s.id)}" data-peer-name="${l(s.username)}">${l(a)}</button>
      </article>`}).join("")}</section>
  `}function fh(){return`
    <section class="pikk-msg-flow-hero" aria-label="DatBoiSkeet team inbox">
      <span class="pikk-msg-flow-kicker">PIKK CONNECT · CREATOR TEAM</span>
      <h2>Reach the team. <em>One inbox.</em></h2>
      <p>Send a local demo inquiry to the DatBoiSkeet team. Priority is a test-mode flag, never a charge.</p>
      <span class="chip">TEST MODE · No real delivery</span>
    </section>
    <div class="card msg-team-card pikk-msg-flow-panel">
      <div class="row" style="justify-content:space-between">
        <h3 style="margin:0">Team inbox</h3>
        <button type="button" class="btn ghost" id="msgBackInbox">← Inbox</button>
      </div>
      <p class="muted">Message DatBoiSkeet / authorized team. Free inquiry stays in the normal queue; Priority ($2.99 TEST MODE — not charged) flags the thread for priority review only.</p>
      <div class="row wrap" style="gap:8px;margin-top:8px">
        <button type="button" class="btn primary" id="msgTeamFree">Free inquiry</button>
        <button type="button" class="btn" id="msgTeamPriority">Priority $2.99 · TEST MODE</button>
      </div>
    </div>
  `}function vh(e,{teamPriorityHint:t=!1}={}){const s=M().user,i=e.kind==="group",a=!i&&e.peerId==="dbs",n=!!e.blocked,o=(e.messages||[]).map(d=>`
      <div class="msg-bubble ${d.from===(s==null?void 0:s.id)?"mine":""} ${d.priority?"priority":""}">
        <div class="msg-bubble-meta">
          <strong>${l(d.fromName||d.from)}</strong>
          ${d.priority?'<span class="chip priority-chip">Priority</span>':""}
          <span class="muted">${l(K(d.at))}</span>
        </div>
        <div class="msg-bubble-text">${l(d.text)}</div>
      </div>`).join(""),r=e.request?'<div class="msg-banner">Message request · recipient approval stub (demo still delivers locally)</div>':"",c=t?'<div class="msg-banner priority">Next send can use Priority $2.99 TEST MODE (wallet note only — not charged).</div>':"";return`
    <section class="pikk-msg-flow-hero pikk-msg-flow-hero-thread" aria-label="Current PIKK conversation">
      <span class="pikk-msg-flow-kicker">PIKK CONNECT · ${i?"GROUP CHAT":a?"TEAM INBOX":"DIRECT MESSAGES"}</span>
      <h2>${l(e.peerName||e.peerId)}</h2>
      <p>Browser-local conversation preview · Messages are not delivered to other accounts.</p>
      <span class="chip">TEST MODE</span>
    </section>
    <div class="card msg-thread-head pikk-msg-flow-panel">
      <div class="row wrap" style="justify-content:space-between;gap:8px">
        <div>
          <button type="button" class="btn ghost" id="msgBackInbox">← Inbox</button>
          <h3 style="margin:8px 0 0">${l(e.peerName||e.peerId)}</h3>
          <div class="row wrap" style="gap:6px;margin-top:6px">
            ${i?'<span class="chip">Group</span>':""}
            ${a?'<span class="chip">Team</span>':""}
            ${e.request?'<span class="chip">Request</span>':""}
            ${e.muted?'<span class="chip">Muted</span>':""}
            ${e.blocked?'<span class="chip">Blocked</span>':""}
          </div>
        </div>
        <div class="row wrap msg-privacy-btns" style="gap:6px">
          <button type="button" class="btn ghost" data-flag="mute">${e.muted?"Unmute":"Mute"}</button>
          <button type="button" class="btn ghost" data-flag="block">${e.blocked?"Unblock":"Block"}</button>
          <button type="button" class="btn ghost danger" data-flag="report">Report</button>
        </div>
      </div>
    </div>
    ${r}
    ${c}
    <div class="card msg-thread-card pikk-msg-flow-panel">
      <div class="msg-thread" id="msgThread">${o||'<p class="muted">No messages yet — say hi.</p>'}</div>
      ${n?'<p class="muted" style="margin-top:10px">Thread blocked · composer disabled (demo).</p>':`<div class="msg-composer">
               <input id="msgInput" placeholder="${a?"Write an inquiry…":"Message…"}" maxlength="500" />
               <button type="button" class="btn primary" id="msgSend">Send</button>
               ${a?'<button type="button" class="btn" id="msgSendPriority" title="TEST MODE — not charged">Priority $2.99</button>':""}
             </div>`}
    </div>
  `}function bh(e){var o,r,c;if(!M().user)return mh();Ds(),Aa();const s=((o=e==null?void 0:e.query)==null?void 0:o.view)||"",i=((r=e==null?void 0:e.query)==null?void 0:r.t)||"",a=((c=e==null?void 0:e.query)==null?void 0:c.priority)==="1";let n;if(i){const d=Cr(i);d?n=vh(d,{teamPriorityHint:a&&d.peerId==="dbs"}):n='<div class="card"><p class="muted">Thread not found.</p><button type="button" class="btn" id="msgBackInbox">← Inbox</button></div>'}else s==="new"?n=gh():s==="team"?n=fh():n=hh();return I("Messages",n,{lead:"DMs, group chats, and DatBoiSkeet team inbox · TEST MODE"})}function yh(e){var d,p,m,h,f,v,k,b,S,$,A,w,P,C,B,x,Y;if(!M().user)return;const s=()=>pe("#/messages");(d=e.querySelector("#msgBackInbox"))==null||d.addEventListener("click",s),(p=e.querySelector("#msgMarkAllRead"))==null||p.addEventListener("click",()=>{const D=Ea().filter(_=>li(_)>0);D.length&&(D.forEach(_=>gn(_.id)),g(`${D.length} conversation${D.length===1?"":"s"} marked read`),pe("#/messages"))}),(m=e.querySelector("#msgNewChat"))==null||m.addEventListener("click",()=>pe("#/messages?view=new")),(h=e.querySelector("#pikkNewChatTop"))==null||h.addEventListener("click",()=>pe("#/messages?view=new"));const i=()=>{var N,V;const D=String(((N=e.querySelector("#pikkMsgSearch"))==null?void 0:N.value)||"").trim().toLowerCase(),_=!!((V=e.querySelector("#pikkMsgUnreadOnly"))!=null&&V.checked);let G=0;e.querySelectorAll("#msgInbox [data-open-thread]").forEach(ce=>{const de=!D||String(ce.dataset.search||"").includes(D),U=!_||ce.dataset.unread==="true";ce.hidden=!(de&&U),ce.hidden||G++});const T=e.querySelector("#pikkMsgNoResults");T&&(T.textContent=_?D?"No unread conversations match your search.":"No unread conversations.":"No conversations match your search.",T.hidden=G>0||!D&&!_);const O=e.querySelector("#pikkMsgClearFilters");O&&(O.hidden=!D&&!_)};(f=e.querySelector("#pikkMsgClearFilters"))==null||f.addEventListener("click",()=>{const D=e.querySelector("#pikkMsgSearch"),_=e.querySelector("#pikkMsgUnreadOnly");D&&(D.value=""),_&&(_.checked=!1),i(),D==null||D.focus()});const a=e.querySelector("#pikkMsgSearch");a==null||a.addEventListener("input",i),a==null||a.addEventListener("keydown",D=>{D.key!=="Escape"||!a.value||(D.preventDefault(),D.stopPropagation(),a.value="",i())}),(v=e.querySelector("#pikkMsgUnreadOnly"))==null||v.addEventListener("change",i),(k=e.querySelector("#msgEmptyNew"))==null||k.addEventListener("click",()=>pe("#/messages?view=new")),(b=e.querySelector("#msgOpenTeam"))==null||b.addEventListener("click",()=>pe("#/messages?view=team")),(S=e.querySelector("#pikkGroupTop"))==null||S.addEventListener("click",()=>{var D;return(D=e.querySelector("#msgOpenGroup"))==null?void 0:D.click()}),($=e.querySelector("#msgOpenGroup"))==null||$.addEventListener("click",()=>{const D=vc();if(D!=null&&D.error){g("Sign in required");return}g("Opened DBS Fans"),pe("#/messages?t="+encodeURIComponent(D.id))}),(A=e.querySelector("#msgTeamFree"))==null||A.addEventListener("click",()=>{const D=vs("dbs","DatBoiSkeet");if(D.error)return g("Sign in required");pe("#/messages?t="+encodeURIComponent(D.id))}),(w=e.querySelector("#msgTeamPriority"))==null||w.addEventListener("click",()=>{const D=vs("dbs","DatBoiSkeet");if(D.error)return g("Sign in required");pe("#/messages?t="+encodeURIComponent(D.id)+"&priority=1")}),e.querySelectorAll("[data-start-peer]").forEach(D=>{D.addEventListener("click",()=>{const _=D.dataset.startPeer,G=D.dataset.peerName||_;if(_==="dbs"){pe("#/messages?view=team");return}const T=vs(_,G);if(T.error)return g("Sign in required");T.request&&g("Request thread created · demo"),pe("#/messages?t="+encodeURIComponent(T.id))})}),e.querySelectorAll("[data-open-thread]").forEach(D=>{D.addEventListener("click",()=>{pe("#/messages?t="+encodeURIComponent(D.dataset.openThread))})}),(P=e.querySelector("#msgPrefDMs"))==null||P.addEventListener("change",D=>{fn({allowDMs:!!D.target.checked}),g(D.target.checked?"DMs allowed":"DMs disabled (stub)")}),(C=e.querySelector("#msgPrefRequests"))==null||C.addEventListener("change",D=>{fn({allowRequests:!!D.target.checked}),g(D.target.checked?"Requests allowed":"Requests disabled (stub)")});const n=new URLSearchParams(location.hash.split("?")[1]||"").get("t"),o=n?Cr(n):null;o&&gn(o.id),e.querySelectorAll("[data-flag]").forEach(D=>{D.addEventListener("click",()=>{if(!o)return;const _=D.dataset.flag;if(_==="mute"){const G=Gi(o.id,{muted:!o.muted});g(G.muted?"Muted":"Unmuted"),pe("#/messages?t="+encodeURIComponent(o.id))}else if(_==="block"){const G=Gi(o.id,{blocked:!o.blocked});g(G.blocked?"Blocked":"Unblocked"),pe("#/messages?t="+encodeURIComponent(o.id))}else _==="report"&&(Gi(o.id,{report:!0}),g("Reported · stub (Guidelines §13)"),pe("#/messages?t="+encodeURIComponent(o.id)))})});const r=D=>{if(!o)return;const _=e.querySelector("#msgInput"),G=(_==null?void 0:_.value)||"";let T;if(o.kind==="group"?T=bc(o.id,G):T=gc(o.peerId,o.peerName,G,{priority:!!D}),(T==null?void 0:T.error)==="empty")return g("Type a message");if(T!=null&&T.error)return g("Could not send");g(D?"Priority sent · TEST MODE $2.99 not charged":"Sent"),pe("#/messages?t="+encodeURIComponent(o.id))};(B=e.querySelector("#msgSend"))==null||B.addEventListener("click",()=>r(!1)),(x=e.querySelector("#msgSendPriority"))==null||x.addEventListener("click",()=>r(!0)),(Y=e.querySelector("#msgInput"))==null||Y.addEventListener("keydown",D=>{D.key==="Enter"&&(D.preventDefault(),r(!1))});const c=e.querySelector("#msgThread");c&&(c.scrollTop=c.scrollHeight)}const Hn=Object.freeze({releases:!0,lives:!0,messages:!0,quietHours:!1}),xt=Object.freeze([{key:"releases",title:"New music releases",detail:"Keep track of new DatBoiSkeet music and official drops.",group:"discover"},{key:"lives",title:"Livestreams",detail:"Choose whether you want live-session updates.",group:"discover"},{key:"messages",title:"Messages",detail:"Control conversation notification preferences.",group:"social"},{key:"quietHours",title:"Quiet hours",detail:"Save your preference for a quieter experience.",group:"social"}]);function zn(e,t){const s=!!t[e.key];return`<label class="pikk-notif-row" for="pikk-notif-${e.key}">
    <span class="pikk-notif-row-copy"><strong>${e.title}</strong><small>${e.detail}</small></span>
    <input id="pikk-notif-${e.key}" type="checkbox" data-k="${e.key}" ${s?"checked":""} />
  </label>`}function kh(){const e=M().notifications||{},t=xt.filter(s=>!!e[s.key]).length;return I("Notifications",`
    <div class="pikk-notif-studio" id="notifPrefs">
      <header class="pikk-notif-hero" aria-label="PIKK notification preferences">
        <div class="pikk-notif-hero-copy">
          <span class="pikk-notif-eyebrow">PIKK · YOUR CONTROL CENTER</span>
          <h2>Stay in the loop.<br/><em>On your terms.</em></h2>
          <p>Fine-tune the alerts you want while PIKK grows. Your current settings stay on this device.</p>
          <div class="pikk-notif-hero-actions">
            <a class="btn" href="#/live">Explore Live</a>
            <a class="btn ghost" href="#/messages">Open Messages</a>
          </div>
        </div>
        <div class="pikk-notif-hero-art" aria-hidden="true">
          <span class="pikk-notif-orbit"></span>
          <span class="pikk-notif-bell">♬</span>
          <span class="pikk-notif-art-label">PIKK ALERTS</span>
        </div>
      </header>
      <div class="pikk-notif-summary" aria-label="Notification settings overview">
        <div><span>Preference controls</span><strong>04</strong></div>
        <div><span>Currently enabled</span><strong id="pikkNotifEnabled">${t} of 4</strong></div>
        <div><span>Storage</span><strong>On this device</strong></div>
      </div>
      <div class="pikk-notif-columns">
        <section class="pikk-notif-panel" aria-labelledby="pikkNotifDiscoverTitle">
          <div class="pikk-notif-panel-head"><span class="pikk-notif-panel-icon" aria-hidden="true">♫</span><div><span class="pikk-notif-kicker">DISCOVER</span><h3 id="pikkNotifDiscoverTitle">Music &amp; Live</h3></div></div>
          ${xt.filter(s=>s.group==="discover").map(s=>zn(s,e)).join("")}
        </section>
        <section class="pikk-notif-panel" aria-labelledby="pikkNotifSocialTitle">
          <div class="pikk-notif-panel-head"><span class="pikk-notif-panel-icon" aria-hidden="true">✉</span><div><span class="pikk-notif-kicker">YOUR SPACE</span><h3 id="pikkNotifSocialTitle">Social &amp; Focus</h3></div></div>
          ${xt.filter(s=>s.group==="social").map(s=>zn(s,e)).join("")}
        </section>
      </div>
      <div class="pikk-notif-tools">
        <span>Pause or resume music, live and message preferences without changing Quiet hours. Settings stay on this device.</span>
        <div class="pikk-notif-tool-actions">
          <button class="btn ghost" type="button" id="pikkNotifPause">Pause alerts</button>
          <button class="btn ghost" type="button" id="pikkNotifResume">Resume alerts</button>
          <button class="btn ghost" type="button" id="pikkNotifReset">Restore defaults</button>
        </div>
      </div>
      <p class="pikk-notif-save-status" id="pikkNotifStatus" role="status" aria-live="polite">Preferences are saved locally. Real push delivery is not connected in this demo.</p>
      <section class="pikk-notif-roadmap" aria-label="Upcoming live subscriber alerts">
        <div><span class="pikk-notif-kicker">IN DEVELOPMENT</span><h3>New Subscriber Live Alerts</h3><p>Animated username and membership-tier popups, sound controls, durations, and a streamer activity inbox are planned. Confirmed subscription event integration is not available yet.</p></div>
        <span class="pikk-notif-planned">Coming soon</span>
      </section>
    </div>`,{lead:"Music, live and social preferences · browser-local demo."})}function wh(e){var i,a,n;const t=e.querySelector("#notifPrefs");if(!t)return;const s=o=>{const r=["releases","lives","messages"];Ki(Object.fromEntries(r.map(h=>[h,o]))),t.querySelectorAll("input[data-k]").forEach(h=>{r.includes(h.dataset.k)&&(h.checked=o)});const c=M().notifications||{},d=xt.filter(h=>!!c[h.key]).length,p=t.querySelector("#pikkNotifEnabled");p&&(p.textContent=`${d} of 4`);const m=t.querySelector("#pikkNotifStatus");m&&(m.textContent=o?"Music, live and message preferences resumed on this device. Real push delivery is not connected.":"Music, live and message preferences paused on this device. Real push delivery is not connected."),g(o?"Alerts resumed":"Alerts paused")};(i=t.querySelector("#pikkNotifPause"))==null||i.addEventListener("click",()=>s(!1)),(a=t.querySelector("#pikkNotifResume"))==null||a.addEventListener("click",()=>s(!0)),(n=t.querySelector("#pikkNotifReset"))==null||n.addEventListener("click",()=>{Ki(Hn),t.querySelectorAll("input[data-k]").forEach(c=>{c.checked=Hn[c.dataset.k]});const o=t.querySelector("#pikkNotifEnabled");o&&(o.textContent="3 of 4");const r=t.querySelector("#pikkNotifStatus");r&&(r.textContent="Notification preferences restored to defaults on this device."),g("Defaults restored")}),t.querySelectorAll("input[data-k]").forEach(o=>{o.addEventListener("change",()=>{const r=o.dataset.k;if(!xt.some(h=>h.key===r))return;Ki({[r]:o.checked});const c=M().notifications||{},d=xt.filter(h=>!!c[h.key]).length,p=t.querySelector("#pikkNotifEnabled");p&&(p.textContent=`${d} of 4`);const m=t.querySelector("#pikkNotifStatus");m&&(m.textContent=`${xt.find(h=>h.key===r).title} preference saved on this device.`),g("Preference saved")})})}function vt(){R("#/wallet")}function H(e){return"$"+Number(e||0).toFixed(2)}function Hs(e){return Number(e||0).toLocaleString()}const Sh={pending:"Pending",completed:"Completed",rejected:"Rejected"};function $h(){const{wallet:e,user:t,coins:s}=M(),i=e||{balance:0,history:[]},a=xi(),n=[...(s==null?void 0:s.history)||[]].slice(0,10),o=ic(),r=$s(),c=Da().filter(x=>x.count>0),d=$r(t==null?void 0:t.id),p=[...i.history||[]].slice(-12).reverse(),m=[...r.earnings||[]].slice(0,20),h=r.payouts||[],f=h.find(x=>x.status==="pending"),v=!f&&r.available>=r.threshold,k=r.verification==="demo_verified",b=p.length>0?`<ul class="list-plain">${p.map(x=>`<li>
          <span>${l(x.note||"Entry")}<br/><span class="muted" style="font-size:12px">${K(x.at)}</span></span>
          <strong style="color:${Number(x.amount)>=0?"var(--ok,#6dffb0)":"inherit"}">${Number(x.amount)>=0?"+":""}${H(x.amount)}</strong>
        </li>`).join("")}</ul>`:'<p class="muted" style="margin:0">No fan USD credit activity yet.</p>',S=o.map(x=>{const Y=`pack_${x.coins}`;return`<button type="button" class="card coin-pack-btn" data-coins="${x.coins}" id="${l(Y)}" style="text-align:left;cursor:pointer;margin:0;padding:12px;border:1px solid rgba(255,255,255,.08);background:#12121a">
        <div style="font-size:20px;font-weight:900">${Hs(x.coins)} <span class="muted" style="font-size:13px;font-weight:600">coins</span></div>
        <div class="muted" style="font-size:13px;margin-top:4px">${H(x.usd)} · TEST MODE</div>
        <div style="margin-top:8px"><span class="chip">Buy · demo credit</span></div>
      </button>`}).join(""),$=n.length>0?`<ul class="list-plain">${n.map(x=>{const Y=Number(x.amount)||0;return`<li>
          <span>${l(x.note||"Coins")}<br/><span class="muted" style="font-size:12px">${K(x.at)}</span></span>
          <strong style="color:${Y>=0?"var(--ok,#6dffb0)":"inherit"}">${Y>=0?"+":""}${Hs(Y)}</strong>
        </li>`}).join("")}</ul>`:'<p class="muted" style="margin:0">No coin purchases or gifts yet. Buy a pack below for Live gifts.</p>',A=d.length>0?`<ul class="list-plain">${d.slice(0,8).map(x=>`<li>
          <span>
            <strong>${l(x.note||x.label||"Live gift")}</strong>
            <span class="chip">80/20 NET</span>
            ${x.giftSlug?`<span class="chip">${l(x.giftSlug)}</span>`:""}
            <br/><span class="muted" style="font-size:12px">gross ${H(x.gross)} · fees ${H(x.fees)} · net ${H(x.net)} · ${K(x.at)}</span>
          </span>
          <span style="text-align:right;font-size:13px">
            <strong>${H(x.creatorShare)}</strong><br/>
            <span class="muted">PIKK ${H(x.dbsShare)}</span>
          </span>
        </li>`).join("")}</ul>
        <p class="muted" style="font-size:12px;margin:8px 0 0">Creator-only split view. Live viewers never see 80/20.</p>`:'<p class="muted" style="margin:0">No coin-gift earnings yet. When viewers send catalog gifts on Live, your <strong>80% of NET</strong> lands here (TEST MODE: listed USD = net, 0% external fee).</p>',w=c.length>0?`<div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead>
          <tr class="muted" style="text-align:left">
            <th style="padding:6px 4px">Source</th>
            <th style="padding:6px 4px">Gross</th>
            <th style="padding:6px 4px">Fees</th>
            <th style="padding:6px 4px">Net</th>
            <th style="padding:6px 4px">You</th>
            <th style="padding:6px 4px">PIKK</th>
          </tr>
        </thead>
        <tbody>
          ${c.map(x=>`<tr style="border-top:1px solid rgba(255,255,255,.06)">
            <td style="padding:8px 4px"><strong>${l(x.label)}</strong><br/><span class="muted" style="font-size:11px">${x.creatorPct}/${x.dbsPct} · ${x.count} line${x.count===1?"":"s"}</span></td>
            <td style="padding:8px 4px">${H(x.gross)}</td>
            <td style="padding:8px 4px">${H(x.fees)}</td>
            <td style="padding:8px 4px">${H(x.net)}</td>
            <td style="padding:8px 4px"><strong>${H(x.creatorShare)}</strong></td>
            <td style="padding:8px 4px">${H(x.dbsShare)}</td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>
    <p class="muted" style="font-size:12px;margin:8px 0 0">Default fees = demo 2.9% + $0.30. <strong>Live catalog gifts (t185u)</strong> treat listed USD as NET (fees $0) then 80/20. Seeded rows labeled in ledger.</p>`:'<p class="muted" style="margin:0">No creator earnings yet. Load demo earnings or receive Live tips/gifts.</p>',P=m.length>0?`<ul class="list-plain">${m.map(x=>`<li>
          <span>
            <strong>${l(x.label)}</strong>
            ${x.payoutId?'<span class="chip">In payout</span>':'<span class="chip">Open</span>'}
            ${x.source==="seed"?'<span class="chip">Demo seed</span>':""}
            ${x.source==="live_gift"?'<span class="chip">Coin gift</span>':""}
            <br/><span class="muted" style="font-size:12px">${l(x.note)} · ${K(x.at)}</span>
          </span>
          <span style="text-align:right;font-size:13px">
            <strong>${H(x.creatorShare)}</strong><br/>
            <span class="muted">gross ${H(x.gross)}</span>
          </span>
        </li>`).join("")}</ul>`:"",C=h.length>0?h.map(x=>`<div class="card" style="margin:0 0 10px;background:#12121a" data-payout="${l(x.id)}">
        <div class="row wrap">
          <strong>${H(x.amount)}</strong>
          <span class="chip">${l(Sh[x.status]||x.status)}</span>
          <span class="muted spacer" style="text-align:right;font-size:12px">${K(x.at)}</span>
        </div>
        <p class="muted" style="margin:6px 0;font-size:12px">${l(x.note||"Payout")} · ${(x.earningIds||[]).length} earning line(s)</p>
        ${x.status==="pending"?`<div class="row wrap">
                <button class="btn primary payout-status" data-id="${l(x.id)}" data-status="completed">Mark completed · demo</button>
                <button class="btn ghost payout-status" data-id="${l(x.id)}" data-status="rejected">Reject · release hold</button>
              </div>`:x.reviewedAt?`<p class="muted" style="margin:0;font-size:12px">Reviewed ${K(x.reviewedAt)}</p>`:""}
      </div>`).join(""):'<p class="muted">No payout requests yet.</p>',B=`
    <div class="pikk-wallet-studio">
      <header class="pikk-wallet-hero" aria-label="PIKK Wallet overview">
        <div>
          <span class="pikk-wallet-eyebrow">PIKK · CREATOR & FAN WALLET</span>
          <h2>Your balance.<br/><em>Your next move.</em></h2>
          <p>Keep gift coins, fan credits and creator earnings in one clear place. All activity here is demo-only until payments and verification are connected.</p>
          <div class="pikk-wallet-hero-actions">
            <a class="btn" href="#/earnings">Creator earnings</a>
            <a class="btn ghost" href="#/live">Explore Live</a>
          </div>
        </div>
        <div class="pikk-wallet-hero-art" aria-hidden="true"><strong>◈</strong><small>PIKK WALLET</small></div>
      </header>
      <section class="pikk-wallet-metrics" aria-label="Wallet balance overview">
        <div class="pikk-wallet-metric"><span>Gift coins</span><strong>${Hs(a)}</strong><small>Live gifting · demo</small></div>
        <div class="pikk-wallet-metric"><span>Fan USD credits</span><strong>${H(i.balance)}</strong><small>Tips and requests · demo</small></div>
        <div class="pikk-wallet-metric"><span>Creator available</span><strong>${H(r.available)}</strong><small>Eligible balance · demo</small></div>
        <div class="pikk-wallet-metric"><span>Creator on hold</span><strong>${H(r.holds)}</strong><small>Payout review · demo</small></div>
      </section>
    <div class="card">
      <div class="row wrap">
        <span class="chip">TEST MODE · not real money</span>
        <span class="chip">${k?"Identity / tax · demo verified":"Identity / tax verification · demo"}</span>
        <button class="btn ghost" id="cwVerify" style="margin-left:auto">${k?"Clear demo verify":"Mark verified · demo"}</button>
      </div>
      <p class="muted" style="margin:10px 0 0;font-size:13px">Fan <strong>coins</strong> (Live gifts) stay separate from fan USD credits and creator redeemable balances. No real processors, KYC, or charges.</p>
    </div>

    <div class="card" id="wallet-coins">
      <div class="row wrap">
        <h3 style="margin:0">Gift coins</h3>
        <span class="chip">t185u · 100 coins = $2</span>
        <span class="chip">TEST MODE</span>
      </div>
      <div style="font-size:32px;font-weight:900;margin-top:8px">${Hs(a)} <span class="muted" style="font-size:16px;font-weight:600">coins</span></div>
      <p class="muted" style="margin:4px 0 12px">≈ ${H(a*.02)} · stored in <code>dbs_v1.coins</code> (not USD <code>wallet</code>). Used for Live gift tray.</p>
      <h4 style="margin:0 0 8px;font-size:14px">Buy coin pack</h4>
      <div class="grid-2" style="gap:10px">${S}</div>
      <p class="muted" style="font-size:12px;margin:10px 0 0">No discounts · packs ${Si.map(x=>`${x.coins}/$${x.usd}`).join(" · ")}. Demo credit only — no payment processor.</p>
      <h4 style="margin:16px 0 8px;font-size:14px">Recent coin activity</h4>
      ${$}
      <div class="row wrap" style="margin-top:12px">
        <a class="btn ghost" href="#/live">Go to Live · send gifts</a>
        <a class="btn ghost" href="#/earnings?cat=gifts">Gift earnings</a>
      </div>
    </div>

    <div class="card">
      <h3>Fan spendable USD credits</h3>
      <div style="font-size:32px;font-weight:900">${H(i.balance)}</div>
      <p class="muted" style="margin:4px 0 12px">Tips &amp; song requests on this device (<code>dbs_v1.wallet</code>). Separate from gift coins.</p>
      <div class="row wrap">
        <button class="btn primary" id="fanCredit5">Add $5 demo credit</button>
        <button class="btn" id="fanCredit25">Add $25</button>
        <a class="btn ghost" href="#/live">Go to Live</a>
      </div>
      <h4 style="margin:16px 0 8px;font-size:14px">Recent fan USD activity</h4>
      ${b}
    </div>

    <div class="card">
      <h3>Creator redeemable balance</h3>
      <div class="grid-2">
        <div>
          <p class="muted" style="margin:0;font-size:12px">Available to payout</p>
          <div style="font-size:28px;font-weight:900">${H(r.available)}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Holds / in review</p>
          <div style="font-size:28px;font-weight:900">${H(r.holds)}</div>
        </div>
      </div>
      <div class="row wrap" style="margin-top:10px">
        <span class="chip">Threshold ${H(r.threshold)}</span>
        <span class="chip">Holds / refunds · demo</span>
        ${f?'<span class="chip">Payout pending</span>':""}
      </div>
      <div class="row wrap" style="margin-top:12px">
        <button class="btn primary" id="cwPayout" ${v?"":"disabled"}>Request payout · TEST MODE</button>
        <button class="btn" id="cwSeed">${(r.earnings||[]).length?"Reload demo earnings":"Load demo earnings"}</button>
        <a class="btn ghost" href="#/earnings">Earnings overview</a>
      </div>
      ${v?'<p class="muted" style="margin:10px 0 0;font-size:12px">Moves available → holds and locks those earning lines until completed or rejected.</p>':`<p class="muted" style="margin:10px 0 0;font-size:12px">${f?"Finish or reject the pending payout before requesting another (anti double-payout).":`Need at least ${H(r.threshold)} available · currently ${H(r.available)}.`}</p>`}
      <p class="chip" style="margin-top:10px">Signed in as ${l((t==null?void 0:t.username)||"guest")}</p>
    </div>

    <div class="card" id="wallet-gift-earnings">
      <h3>Live gift earnings · creator view</h3>
      <p class="muted" style="margin:0 0 10px;font-size:13px">80% creator / 20% PIKK on NET catalog gifts. Not shown on Live / gift tray.</p>
      ${A}
    </div>

    <div class="card">
      <h3>Earnings breakdown</h3>
      <p class="muted" style="margin:0 0 10px">Gifts, tips, subscriptions, referrals, Clippers, sponsorships, merch/affiliate — gross → fees → net → creator% / PIKK%.</p>
      ${w}
      ${P?`<h4 style="margin:16px 0 8px;font-size:14px">Ledger (recent)</h4>${P}`:""}
    </div>

    <div class="card">
      <h3>Payout history</h3>
      <p class="muted" style="margin:0 0 10px">On-device demo approve / reject. Completed funds leave holds; rejected releases hold and untags earnings.</p>
      ${C}
    </div>
    </div>
  `;return I("Wallet & Payouts",B,{lead:"Creator Wallet & Payout Center · gift coins + fan USD · TEST MODE."})}function xh(e){var t,s,i,a,n;e.querySelectorAll(".coin-pack-btn").forEach(o=>{o.addEventListener("click",()=>{const r=Number(o.dataset.coins),c=Sr(r);if((c==null?void 0:c.error)==="bad_package")return g("Unknown pack");if(c!=null&&c.error)return g("Could not buy coins");g(`+${r.toLocaleString()} coins · TEST MODE`),vt()})}),(t=e.querySelector("#fanCredit5"))==null||t.addEventListener("click",()=>{ci(5,"Demo credit +$5"),g("+$5 fan credits"),vt()}),(s=e.querySelector("#fanCredit25"))==null||s.addEventListener("click",()=>{ci(25,"Demo credit +$25"),g("+$25 fan credits"),vt()}),(i=e.querySelector("#cwSeed"))==null||i.addEventListener("click",()=>{const o=($s().earnings||[]).length>0,r=Mr({force:!0});g(o?"Demo earnings reloaded":`Loaded ${r.seeded||0} demo lines`),vt()}),(a=e.querySelector("#cwPayout"))==null||a.addEventListener("click",()=>{const o=wc();if((o==null?void 0:o.error)==="pending_exists")return g("Payout already pending");if((o==null?void 0:o.error)==="below_threshold")return g("Below payout threshold");if(o!=null&&o.error)return g("Could not request payout");g("Payout requested · held"),vt()}),(n=e.querySelector("#cwVerify"))==null||n.addEventListener("click",()=>{const r=$s().verification!=="demo_verified";$c(r),g(r?"Demo verified":"Verification cleared"),vt()}),e.querySelectorAll(".payout-status").forEach(o=>{o.addEventListener("click",()=>{const r=Sc(o.dataset.id,o.dataset.status);if(r!=null&&r.error)return g("Could not update payout");g("Payout "+o.dataset.status),vt()})})}function Wn(e){R(e||"#/earnings")}function ae(e){return"$"+Number(e||0).toFixed(2)}const Xo=[{id:"all",label:"All"},{id:"gifts",label:"Gifts"},{id:"tips",label:"Tips"},{id:"subscriptions",label:"Subscriptions"},{id:"clippers",label:"Clippers"},{id:"referrals",label:"Referrals"},{id:"sponsorships",label:"Sponsorships"},{id:"merch",label:"Merch"}];function Zo(){var t;const e=(((t=Fe().query)==null?void 0:t.cat)||"all").toLowerCase();return Xo.some(s=>s.id===e)?e:"all"}function Eh(e){return(e||[]).reduce((t,s)=>(t.gross+=Number(s.gross)||0,t.fees+=Number(s.fees)||0,t.net+=Number(s.net)||0,t.creatorShare+=Number(s.creatorShare)||0,t.dbsShare+=Number(s.dbsShare)||0,t),{gross:0,fees:0,net:0,creatorShare:0,dbsShare:0})}function rs(e){return Math.round(Number(e)*100)/100}function Ah(){const e=$s(),t=kc(),s=Zo(),i=[...e.earnings||[]].sort((k,b)=>(b.at||0)-(k.at||0)),a=s==="all"?i:i.filter(k=>k.category===s||s==="subscriptions"&&k.category==="paid_content"),n=Eh(i),o=Da(),r=$r(),c=s==="gifts"?`<div class="card" style="margin:0 0 12px;background:#12121a">
      <div class="row wrap">
        <span class="chip">t185u · catalog gifts</span>
        <span class="chip">80% creator / 20% PIKK · NET</span>
        <span class="chip">TEST MODE · listed USD = net</span>
      </div>
      <p class="muted" style="margin:8px 0 0;font-size:13px">Coin gifts from Live use <code>sendLiveGift</code> → creator earnings here. Viewers on Live / gift tray never see this split. ${r.length?`${r.length} gift line(s) on device.`:"Send a catalog gift on an active Live to populate."}</p>
    </div>`:"",d=Xo.map(k=>{const b=k.id==="all"?"#/earnings":`#/earnings?cat=${k.id}`,S=k.id==="all"?i.length:i.filter(A=>A.category===k.id||k.id==="subscriptions"&&A.category==="paid_content").length,$=s===k.id;return`<a class="chip earn-filter${$?" active":""}" href="${b}" data-cat="${l(k.id)}" style="${$?"outline:1px solid var(--accent,#6dffb0);font-weight:700":""}">${l(k.label)}${S?` · ${S}`:""}</a>`}).join(""),p=Object.entries(t).map(([k,b])=>`<tr style="border-top:1px solid rgba(255,255,255,.06)">
        <td style="padding:8px 4px"><strong>${l(b.label)}</strong><br/><span class="muted" style="font-size:11px">${l(k)}</span></td>
        <td style="padding:8px 4px">${b.creatorPct}%</td>
        <td style="padding:8px 4px">${b.dbsPct}%</td>
      </tr>`).join(""),m=Object.entries(t).map(([k,b])=>`<option value="${l(k)}">${l(b.label)}</option>`).join(""),h=o.filter(k=>k.count>0).length>0?`<div style="overflow-x:auto;margin-top:8px">
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead>
          <tr class="muted" style="text-align:left">
            <th style="padding:6px 4px">Source</th>
            <th style="padding:6px 4px">Gross</th>
            <th style="padding:6px 4px">Fees</th>
            <th style="padding:6px 4px">Net</th>
            <th style="padding:6px 4px">You</th>
            <th style="padding:6px 4px">PIKK</th>
          </tr>
        </thead>
        <tbody>
          ${o.filter(k=>k.count>0).map(k=>`<tr style="border-top:1px solid rgba(255,255,255,.06)">
            <td style="padding:8px 4px"><strong>${l(k.label)}</strong><br/><span class="muted" style="font-size:11px">${k.creatorPct}/${k.dbsPct} · ${k.count} line${k.count===1?"":"s"}</span></td>
            <td style="padding:8px 4px">${ae(k.gross)}</td>
            <td style="padding:8px 4px">${ae(k.fees)}</td>
            <td style="padding:8px 4px">${ae(k.net)}</td>
            <td style="padding:8px 4px"><strong>${ae(k.creatorShare)}</strong></td>
            <td style="padding:8px 4px">${ae(k.dbsShare)}</td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>`:"",f=a.length>0?`<ul class="list-plain">${a.map(k=>`<li style="align-items:flex-start">
          <span style="flex:1;min-width:0">
            <strong>${l(k.label||k.category)}</strong>
            ${k.payoutId?'<span class="chip">In payout</span>':'<span class="chip">Open</span>'}
            ${k.source==="seed"?'<span class="chip">Demo seed</span>':""}
            <br/><span class="muted" style="font-size:12px">${l(k.note||"")} · ${K(k.at)}</span>
            <br/><span class="muted" style="font-size:11px">gross ${ae(k.gross)} → fees ${ae(k.fees)} → net ${ae(k.net)} · creator ${k.creatorPct}% / PIKK ${k.dbsPct}%</span>
          </span>
          <span style="text-align:right;font-size:13px;white-space:nowrap">
            <strong>${ae(k.creatorShare)}</strong><br/>
            <span class="muted">PIKK ${ae(k.dbsShare)}</span>
          </span>
        </li>`).join("")}</ul>`:i.length===0?`<p class="muted" style="margin:0 0 12px">No earnings yet. Load demo lines or record a single demo earning below.</p>
           <button class="btn primary" id="earnSeed">Load demo earnings</button>`:'<p class="muted" style="margin:0">No lines in this category. <a href="#/earnings">Show all</a></p>',v=`
    <section class="pikk-earnings-hero" aria-label="Creator earnings overview">
      <div class="pikk-earnings-hero-copy">
        <span class="pikk-earnings-eyebrow">PIKK CREATOR STUDIO · ANALYTICS PREVIEW</span>
        <h2>Your work. <em>Your earnings.</em></h2>
        <p>Track your creator share across gifts, subscriptions, tips and more in one place. Every amount shown here is browser-local demo data, not a real balance.</p>
        <div class="pikk-earnings-hero-actions">
          <a class="btn primary" href="#/wallet">Open Wallet</a>
          <a class="btn ghost" href="#/music">Explore Music</a>
        </div>
      </div>
      <div class="pikk-earnings-hero-art" aria-hidden="true">
        <span class="pikk-earnings-hero-orbit"></span>
        <span class="pikk-earnings-hero-symbol">PIKK</span>
        <span class="pikk-earnings-hero-mini">CREATOR STUDIO</span>
      </div>
    </section>
    <div class="pikk-earnings-dashboard">
    <div class="card pikk-earnings-intro">
      <div class="row wrap">
        <span class="chip">TEST MODE · not real money</span>
        <span class="chip">Analytics &amp; ledger · payouts on Wallet</span>
      </div>
      <p class="muted" style="margin:10px 0 0;font-size:13px">Transparent breakdown of clipping, referrals, merch affiliates, subscriptions, gifts, and tips — with PIKK commission splits. Request payouts on <a href="#/wallet">Wallet</a>.</p>
    </div>

    <div class="card pikk-earnings-summary">
      <h3>Summary</h3>
      <div class="grid-2">
        <div>
          <p class="muted" style="margin:0;font-size:12px">Available to payout</p>
          <div style="font-size:26px;font-weight:900">${ae(e.available)}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Holds / in review</p>
          <div style="font-size:26px;font-weight:900">${ae(e.holds)}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Lifetime creator share</p>
          <div style="font-size:22px;font-weight:800">${ae(rs(n.creatorShare))}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Lifetime PIKK share</p>
          <div style="font-size:22px;font-weight:800">${ae(rs(n.dbsShare))}</div>
        </div>
      </div>
      <div class="row wrap" style="margin-top:10px">
        <span class="chip">Lifetime gross ${ae(rs(n.gross))}</span>
        <span class="chip">Fees ${ae(rs(n.fees))}</span>
        <span class="chip">Net ${ae(rs(n.net))}</span>
        <span class="chip">Threshold ${ae(e.threshold)}</span>
      </div>
      <div class="row wrap" style="margin-top:12px">
        <a class="btn primary" href="#/wallet">Open Wallet &amp; request payout</a>
        <button class="btn" id="earnSeed">${i.length?"Reload demo earnings":"Load demo earnings"}</button>
      </div>
    </div>

    <div class="card">
      <h3>Commission rates · TEST MODE</h3>
      <p class="muted" style="margin:0 0 10px;font-size:13px">Admin-adjustable examples. Default fees (2.9% + $0.30) apply to gross first; splits apply to eligible net. <strong>Live catalog gifts</strong> (t185u): listed USD treated as net (0% external fee chip) then <strong>80/20</strong>. Optional 85/15 is not enabled.</p>
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <thead>
            <tr class="muted" style="text-align:left">
              <th style="padding:6px 4px">Category</th>
              <th style="padding:6px 4px">Creator %</th>
              <th style="padding:6px 4px">PIKK %</th>
            </tr>
          </thead>
          <tbody>${p}</tbody>
        </table>
      </div>
      ${h?`<h4 style="margin:16px 0 0;font-size:14px">Totals by source (this device)</h4>${h}`:""}
    </div>

    <div class="card">
      <h3>Earnings ledger</h3>
      ${c}
      <div class="row wrap" style="margin:0 0 12px;gap:6px">${d}</div>
      ${f}
    </div>

    <div class="card">
      <h3>Record demo earning</h3>
      <p class="muted" style="margin:0 0 10px;font-size:13px">Adds one line via <code>creditCreatorEarning</code> (same shape as Wallet / Live tips). Not a real charge.</p>
      <form id="earnDemoForm" style="display:grid;gap:10px;max-width:420px">
        <div class="field"><label>Category</label><select name="category" id="earnCat">${m}</select></div>
        <div class="field"><label>Gross amount (USD)</label><input name="gross" id="earnGross" type="number" min="0.01" step="0.01" value="10" required /></div>
        <div class="field"><label>Note (optional)</label><input name="note" id="earnNote" type="text" maxlength="120" placeholder="Manual demo earning" /></div>
        <button class="btn primary" type="submit">Record demo earning</button>
      </form>
    </div>
    </div>
  `;return I("Creator Earnings",v,{lead:"Rewards, commissions & ledger · TEST MODE · payouts on Wallet (§27)."})}function Ch(e){var t,s;(t=e.querySelector("#earnSeed"))==null||t.addEventListener("click",()=>{const i=($s().earnings||[]).length>0,a=Mr({force:!0});g(i?"Demo earnings reloaded":`Loaded ${a.seeded||0} demo lines`),Wn(Yn(Zo()))}),(s=e.querySelector("#earnDemoForm"))==null||s.addEventListener("submit",i=>{var c,d,p;i.preventDefault();const a=((c=e.querySelector("#earnCat"))==null?void 0:c.value)||"tips",n=Number((d=e.querySelector("#earnGross"))==null?void 0:d.value),o=(((p=e.querySelector("#earnNote"))==null?void 0:p.value)||"").trim()||"Manual demo earning";if(!(n>0))return g("Enter a positive gross amount");const r=Ta({category:a,gross:n,note:o,source:"manual_demo"});g(`Recorded ${ae(r.creatorShare)} creator share`),Wn(Yn(a))})}function Yn(e){return!e||e==="all"?"#/earnings":`#/earnings?cat=${e}`}function bt(){R("#/missions")}const Jn={song:"Song",album:"Album",video:"Video",live:"Livestream",app:"DBS App",interview:"Interview"};function Th(e){return"$"+Number(e||0).toFixed(0)}function Dh(e){const t=Number(e)||0;if(!t)return"No deadline";const s=t-Date.now();if(s<0)return`Ended ${Math.ceil(-s/864e5)}d ago`;const i=Math.ceil(s/864e5);return i<=1?"Due today / tomorrow":`${i}d left`}function Mh(e=14){return new Date(Date.now()+e*864e5).toISOString().slice(0,10)}function zs(){const{user:e}=M();if(e)return e;const t=zt("DemoCreator");return g("Signed in as DemoCreator · local demo"),t||M().user}function Lh(){const{user:e}=M(),t=Ci().sort((p,m)=>(m.createdAt||0)-(p.createdAt||0)),s=t.filter(p=>p.status==="active"||p.status==="paused"),i=t.filter(p=>p.status==="ended"||p.status==="draft"),a=new Set(t.flatMap(p=>(p.participants||[]).map(m=>m.userId).filter(Boolean))).size,n=t.reduce((p,m)=>p+(m.submissions||[]).length,0),o=p=>{const m=p.fundSource==="third_party"?'<span class="chip">20% management fee · disclosed</span>':'<span class="chip">DBS-funded · marketing expense</span>',h=sd(p.id),f=e&&(p.participants||[]).some($=>$.userId===e.id),v=(p.submissions||[]).filter($=>e&&$.userId===e.id),k=h.length>0?h.slice(0,8).map(($,A)=>`<tr style="border-top:1px solid rgba(255,255,255,.06)">
              <td style="padding:6px 4px">${A+1}</td>
              <td style="padding:6px 4px"><strong>${l($.username)}</strong>
                ${$.referralCode?`<br/><span class="muted" style="font-size:11px">${l($.referralCode)}</span>`:""}
              </td>
              <td style="padding:6px 4px">${$.score}</td>
              <td style="padding:6px 4px">${$.submissions}</td>
            </tr>`).join(""):'<tr><td colspan="4" class="muted" style="padding:8px 4px">No participants yet — join to appear on the board.</td></tr>',b=(p.submissions||[]).length>0?`<ul class="list-plain" style="margin-top:8px">${(p.submissions||[]).slice(0,5).map($=>`<li style="align-items:flex-start">
              <span style="flex:1;min-width:0">
                <strong>${l($.username)}</strong>
                <span class="chip">${l($.status||"pending")}</span>
                <br/><span style="font-size:13px">${l($.proof)}</span>
                <br/><span class="muted" style="font-size:11px">${K($.at)} · Manual review</span>
              </span>
            </li>`).join("")}</ul>`:'<p class="muted" style="margin:8px 0 0;font-size:13px">No proof submissions yet.</p>',S=p.status==="active"?`<div class="row wrap" style="margin-top:10px;gap:8px">
            ${f?`<span class="chip">Joined</span>
                   <button class="btn" data-bump="${l(p.id)}">+5 demo points</button>`:`<button class="btn primary" data-join="${l(p.id)}">Join mission</button>`}
            <button class="btn ghost" data-status="${l(p.id)}" data-next="paused">Pause</button>
            <button class="btn ghost" data-status="${l(p.id)}" data-next="ended">End mission</button>
          </div>
          ${f?`<form class="msn-proof" data-id="${l(p.id)}" style="display:grid;gap:8px;margin-top:12px;max-width:480px">
                  <div class="field"><label>Submit proof (URL or note)</label>
                    <input name="proof" placeholder="https://… or clip description" maxlength="400" required />
                  </div>
                  <button class="btn" type="submit">Submit for review · +10 pts</button>
                </form>`:""}`:p.status==="paused"?`<div class="row wrap" style="margin-top:10px;gap:8px">
              <button class="btn primary" data-status="${l(p.id)}" data-next="active">Resume</button>
              <button class="btn ghost" data-status="${l(p.id)}" data-next="ended">End mission</button>
            </div>`:`<div class="row wrap" style="margin-top:10px"><span class="chip">Archive · ${l(p.status)}</span></div>`;return`<article class="card pikk-mission-card" data-mission="${l(p.id)}">
      <div class="row wrap">
        <span class="chip">${l(Jn[p.promoteType]||p.promoteType)}</span>
        <span class="chip">${l(p.status)}</span>
        <span class="chip">Budget ${Th(p.budget)}</span>
        <span class="chip">${l(Dh(p.deadline))}</span>
        ${m}
        <span class="muted spacer" style="text-align:right;font-size:12px">${K(p.createdAt)}</span>
      </div>
      <h3 style="margin:10px 0 4px">${l(p.title)}</h3>
      <p class="muted" style="margin:0 0 6px;font-size:13px">${l(p.reward||"")}</p>
      <p class="muted" style="margin:0;font-size:12px">
        Fund: <strong>${p.fundSource==="third_party"?"Third-party":"DBS"}</strong>
        ${p.fundSource==="third_party"?" · 20% management fee (disclosed)":" · not a creator commission — marketing expense"}
        · ${(p.participants||[]).length} joined · ${(p.submissions||[]).length} submissions
        ${f?` · your proofs: ${v.length}`:""}
      </p>
      ${S}
      <h4 style="margin:16px 0 6px;font-size:14px">Rankings · demo score</h4>
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <thead>
            <tr class="muted" style="text-align:left">
              <th style="padding:6px 4px">#</th>
              <th style="padding:6px 4px">Creator</th>
              <th style="padding:6px 4px">Score</th>
              <th style="padding:6px 4px">Subs</th>
            </tr>
          </thead>
          <tbody>${k}</tbody>
        </table>
      </div>
      <h4 style="margin:14px 0 0;font-size:14px">Submissions</h4>
      ${b}
    </article>`},r=s.length?s.map(o).join(""):t.length?'<div class="card"><p class="muted" style="margin:0">No active or paused missions. Create one or resume from archive.</p></div>':"",c=i.length>0?`<div class="card"><h3>Archive</h3>${i.map(o).join("")}</div>`:"",d=`
    <div class="pikk-missions-studio">
      <section class="pikk-missions-hero" aria-label="PIKK Missions Studio overview">
        <p class="pikk-missions-kicker">PIKK CREATOR STUDIO · PROMOTIONAL CAMPAIGNS</p>
        <h2>Make your next <span>move count.</span></h2>
        <p>Explore creator missions, share your work and track demo rankings. Campaign budgets and points are examples, not real earnings.</p>
        <div class="pikk-missions-stats" aria-label="Current demo mission totals">
          <div class="pikk-missions-stat"><strong>${s.length}</strong><span>Open / paused</span></div>
          <div class="pikk-missions-stat"><strong>${a}</strong><span>Demo creators</span></div>
          <div class="pikk-missions-stat"><strong>${n}</strong><span>Proof submissions</span></div>
        </div>
        <span class="pikk-missions-mode">TEST MODE · NO REAL PAYOUTS</span>
      </section>
    <div class="card pikk-missions-intro">
      <div class="row wrap">
        <span class="chip">TEST MODE · not real money</span>
        <span class="chip">Manual review · TEST MODE — no auto fraud API</span>
        <span class="chip">Signed in as ${l((e==null?void 0:e.username)||"guest")}</span>
      </div>
      <p class="muted" style="margin:10px 0 0;font-size:13px">
        Admin-created missions promoting songs, albums, interviews, videos, livestreams, and the DBS app.
        Budgets, deadlines, creator participation, rankings, and verified payouts (demo).
        Third-party-funded campaigns disclose a <strong>20% management fee</strong>; DBS-funded campaigns are a marketing expense (not a commission).
      </p>
      <div class="row wrap" style="margin-top:12px;gap:8px">
        <button class="btn" id="msnSeed">${t.length?"Reload demo missions":"Load demo missions"}</button>
        ${e?"":'<button class="btn primary" id="msnSignIn">Sign in · demo</button>'}
      </div>
    </div>

    <section class="pikk-missions-list" aria-label="Available campaigns">${r}</section>

    <div class="card pikk-missions-create">
      <h3>Create mission · demo admin</h3>
      <p class="muted" style="margin:0 0 10px;font-size:13px">Stored in <code>dbs_v1.missions</code>. No real charges or fraud API.</p>
      <form id="msnCreate" style="display:grid;gap:10px;max-width:520px">
        <div class="field"><label>Title *</label><input name="title" id="msnTitle" required maxlength="120" placeholder="Push Long Story Short" /></div>
        <div class="grid-2">
          <div class="field"><label>Promote type</label>
            <select name="promoteType" id="msnType">
              ${Object.entries(Jn).map(([p,m])=>`<option value="${p}">${l(m)}</option>`).join("")}
            </select>
          </div>
          <div class="field"><label>Budget (USD)</label><input name="budget" id="msnBudget" type="number" min="0" step="1" value="500" /></div>
        </div>
        <div class="grid-2">
          <div class="field"><label>Deadline</label><input name="deadline" id="msnDeadline" type="date" value="${Mh(14)}" /></div>
          <div class="field"><label>Fund source</label>
            <select name="fundSource" id="msnFund">
              <option value="dbs">DBS-funded (marketing expense)</option>
              <option value="third_party">Third-party (20% mgmt fee)</option>
            </select>
          </div>
        </div>
        <div class="field"><label>Reward blurb</label><input name="reward" id="msnReward" maxlength="200" placeholder="e.g. Top 3 share demo pot" /></div>
        <button class="btn primary" type="submit">Create active mission</button>
      </form>
    </div>

    <section class="pikk-missions-archive">${c}</section>
    </div>
  `;return I("Missions",d,{lead:"Promotional campaigns · Clippers & creators · TEST MODE (§6)."})}function Ih(e){var t,s,i;(t=e.querySelector("#msnSeed"))==null||t.addEventListener("click",()=>{const a=Ci().length>0,n=id({force:!0});g(a?"Demo missions reloaded":`Loaded ${n.seeded||0} demo missions`),bt()}),(s=e.querySelector("#msnSignIn"))==null||s.addEventListener("click",()=>{zs(),bt()}),(i=e.querySelector("#msnCreate"))==null||i.addEventListener("submit",a=>{var h,f,v,k,b,S;a.preventDefault();const n=((h=e.querySelector("#msnTitle"))==null?void 0:h.value)||"",o=((f=e.querySelector("#msnType"))==null?void 0:f.value)||"app",r=Number((v=e.querySelector("#msnBudget"))==null?void 0:v.value)||0,c=((k=e.querySelector("#msnDeadline"))==null?void 0:k.value)||"",d=((b=e.querySelector("#msnFund"))==null?void 0:b.value)||"dbs",p=((S=e.querySelector("#msnReward"))==null?void 0:S.value)||"",m=Qc({title:n,promoteType:o,budget:r,deadline:c,fundSource:d,reward:p,status:"active"});if(m.error)return g("Title required");g(`Mission created · ${m.title}`),bt()}),e.querySelectorAll("[data-join]").forEach(a=>{a.addEventListener("click",()=>{zs();const n=a.getAttribute("data-join"),o=Zc(n);if(o.error==="signin")return g("Sign in required");if(o.error==="already_joined")return g("Already joined");if(o.error==="not_active")return g("Mission not active");if(o.error)return g("Could not join");g("Joined mission · referral code assigned"),bt()})}),e.querySelectorAll("[data-bump]").forEach(a=>{a.addEventListener("click",()=>{zs();const n=a.getAttribute("data-bump"),o=td(n,5);if(o.error)return g(o.error==="not_joined"?"Join first":"Bump failed");g("+5 demo points"),bt()})}),e.querySelectorAll("[data-status]").forEach(a=>{a.addEventListener("click",()=>{const n=a.getAttribute("data-status"),o=a.getAttribute("data-next");if(Xc(n,o).error)return g("Status update failed");g(`Mission → ${o}`),bt()})}),e.querySelectorAll("form.msn-proof").forEach(a=>{a.addEventListener("submit",n=>{var d;n.preventDefault(),zs();const o=a.getAttribute("data-id"),r=((d=a.querySelector('[name="proof"]'))==null?void 0:d.value)||"",c=ed(o,{proof:r});if(c.error==="required")return g("Enter a URL or note");if(c.error==="not_joined")return g("Join first");if(c.error==="not_active")return g("Mission not active");if(c.error)return g("Submit failed");g("Proof submitted · pending manual review · +10 pts"),bt()})})}const Ph=[{id:"trending",label:"Trending"},{id:"following",label:"Following"},{id:"discover",label:"Discover"}];function Oh(){return!!M().exploreDiscoverable}function Ee({href:e,title:t,meta:s,chip:i}){return`<a class="explore-hit" href="${l(e)}">
    <div>
      <strong>${l(t)}</strong>
      <div class="muted" style="font-size:12px;margin-top:2px">${l(s||"")}</div>
    </div>
    ${i?`<span class="chip">${l(i)}</span>`:""}
  </a>`}function tt(e,t,s){return t?`<div class="card explore-section">
    <h3>${l(e)}</h3>
    <div class="explore-hits">${t}</div>
  </div>`:`<div class="card explore-section">
      <h3>${l(e)}</h3>
      <p class="muted" style="margin:0">${l(s||"No matches")}</p>
    </div>`}function vi(e){if(!e||!e.query)return`<div class="card" id="exploreResults">
      <p class="muted" style="margin:0">Search creators, fans, songs, albums, videos, posts, livestreams, and products. Exact locations are never indexed.</p>
    </div>`;const t=e.posts.length+e.profiles.length+e.music.length+e.videos.length+e.lives.length+e.products.length+e.pictures.length;if(!t)return`<div class="card" id="exploreResults">
      <p style="margin:0 0 6px"><strong>No results for “${l(e.query)}”</strong></p>
      <p class="muted" style="margin:0">Try another keyword, or browse Trending / Discover below. Report spam from a result’s destination page (demo shell).</p>
    </div>`;const s=e.posts.slice(0,8).map(m=>Ee({href:"#/posts",title:(m.text||"").slice(0,90)||"Post",meta:`@${m.username||"user"} · ${K(m.at||Date.now())}`,chip:"Post"})).join(""),i=e.profiles.slice(0,8).map(m=>Ee({href:`#/profile/${m.id}`,title:`@${m.username||m.id}`,meta:(m.bio||"Creator / fan").slice(0,80),chip:m.verified?"Verified":"Profile"})).join(""),a=e.music.slice(0,8).map(m=>Ee({href:"#/music",title:m.title,meta:`${m.artist||"Artist not credited"} · ${m.type}`,chip:m.type==="album"?"Album":"Song"})).join(""),n=e.videos.slice(0,8).map(m=>Ee({href:"#/videos",title:m.title,meta:`${m.artist||"Artist not credited"} · Video catalog`,chip:"Video"})).join(""),o=e.pictures.slice(0,8).map(m=>Ee({href:"#/home",title:m.title,meta:`${m.artist||"Creator not credited"} · picture`,chip:"Picture"})).join(""),r=e.lives.slice(0,8).map(m=>Ee({href:"#/live",title:m.title||"Livestream",meta:`@${m.hostName||"host"} · ${m.status==="live"?"LIVE now":"Ended"}`,chip:m.status==="live"?"Live":"Replay"})).join(""),c=e.products.slice(0,8).map(m=>Ee({href:"#/marketplace",title:m.title,meta:`${m.brand||"Brand"} · ${m.disclosure||"Sponsored"}`,chip:"Ad"})).join(""),d=e.query.toLowerCase(),p=[...Bt.filter(m=>m.title.toLowerCase().includes(d)||m.artist.toLowerCase().includes(d)||d.includes("music")||d.includes("song")||d.includes("album")).map(m=>Ee({href:"#/music",title:m.title,meta:`${m.artist} · ${m.status}`,chip:"Cover"})),...le.filter(m=>m.title.toLowerCase().includes(d)||(m.artist||"").toLowerCase().includes(d)||d.includes("video")||d.includes("mv")).map(m=>Ee({href:"#/videos",title:m.title,meta:`${m.artist||"Artist not credited"} · Official MV`,chip:"MV"}))].join("");return`<div id="exploreResults">
    <p class="muted" style="margin:0 0 10px">${t} result${t===1?"":"s"} for “${l(e.query)}”</p>
    ${tt("People",i,"No matching creators or fans")}
    ${tt("Posts",s,"No matching posts")}
    ${tt("Music (catalog)",a,"No published songs/albums")}
    ${tt("Videos (catalog)",n,"No published videos")}
    ${tt("Pictures",o,"No published pictures")}
    ${tt("Livestreams",r,"No live or history matches")}
    ${tt("Products / ads",c,"No marketplace listings")}
    ${p?tt("Music-based picks",p):""}
  </div>`}function _h(){const e=Ec(10);return e.length?`<div class="section-swipe explore-trend">
    ${e.map(t=>`<a class="preview-card" href="${l(t.href)}">
        <strong>${l(t.title)}</strong>
        <span class="muted">${l(t.subtitle)}${t.score?` · ♥${t.score}`:""}</span>
      </a>`).join("")}
  </div>`:'<p class="muted">Nothing trending yet — like posts or publish catalog items.</p>'}function qh(){const e=M().user;if(!e)return'<div class="card"><p class="muted" style="margin:0">Sign in on <a href="#/profile">Profile</a> to see accounts you follow. Demo only — no exact locations.</p></div>';const t=e.following||[];return t.length?`<div class="card explore-section"><h3>Following</h3><div class="explore-hits">${t.map(i=>{var n;const a=((n=M().profiles)==null?void 0:n[i])||{id:i,username:i};return Ee({href:`#/profile/${encodeURIComponent(a.id)}`,title:`@${a.username||a.id}`,meta:(a.bio||"Following").slice(0,80),chip:"Following"})}).join("")}</div></div>`:`<div class="card"><p class="muted" style="margin:0">You're not following anyone yet. Discover suggested accounts below, then follow from their profile.</p></div>`}function Nh(){const t=Ac().slice(0,8).map(i=>Ee({href:`#/profile/${encodeURIComponent(i.id)}`,title:`@${i.username}`,meta:(i.bio||"Suggested").slice(0,80),chip:i.verified?"Verified":"Suggest"})).join(""),s=Bt.map(i=>Ee({href:"#/music",title:i.title,meta:`${i.artist} · music-based`,chip:"Cover"})).join("");return`
    <div class="card">
      <h3>Discoverability (opt-in)</h3>
      <p class="muted" style="margin:0 0 10px">Appear in Explore suggestions. Off by default. No exact locations stored or shown.</p>
      <label class="row" style="gap:8px;align-items:center">
        <input type="checkbox" id="exploreDiscoverable" ${Oh()?"checked":""} />
        <span>Make my profile discoverable (TEST MODE)</span>
      </label>
    </div>
    <div class="card explore-section">
      <h3>Suggested accounts</h3>
      <div class="explore-hits">${t||'<p class="muted">No profiles yet</p>'}</div>
    </div>
    <div class="card explore-section">
      <h3>Music-based recommendations</h3>
      <div class="explore-hits">${s}</div>
    </div>
    <div class="card">
      <h3>Safety</h3>
      <p class="muted" style="margin:0">Reporting / filtering shell: open a post or profile and use existing mute / guidelines flows. Explore never shows precise locations.</p>
      <a class="btn ghost" href="#/guidelines" style="margin-top:8px">Community guidelines</a>
    </div>`}function Bh(){const e=M().exploreTab||"trending",t=Ph.map(a=>`<button type="button" role="tab" id="explore-tab-${a.id}" aria-controls="explorePanel" aria-selected="${a.id===e}" tabindex="${a.id===e?0:-1}" class="shop-chip${a.id===e?" on":""}" data-explore-tab="${a.id}">${l(a.label)}</button>`).join("");let s="";e==="following"?s=qh():e==="discover"?s=Nh():s=`<div class="card">
      <h3>Trending Across PIKK</h3>
      <p class="muted" style="margin:0 0 10px">High-engagement public posts and seeded demo cards (not a full engagement pipeline).</p>
      ${_h()}
    </div>
    <div id="exploreResultsWrap">${vi(null)}</div>`;const i=`
    <div class="card explore-search">
      <div class="field" style="margin-bottom:8px">
        <label for="exploreQ">Search PIKK</label>
        <input id="exploreQ" type="search" autocomplete="off" placeholder="Creators, fans, songs, albums, videos, posts, lives, products…" />
      </div>
      <div class="row wrap" style="gap:8px">
        <button class="btn primary" type="button" id="exploreGo">Search</button>
        <button class="btn ghost" type="button" id="exploreClear">Clear</button>
      </div>
      <p class="muted" style="margin:10px 0 0;font-size:12px">Local demo index · DEMO/TEST MODE · no backend · no exact locations</p>
    </div>
    <div class="shop-chips" style="margin:0 0 12px" role="tablist" aria-label="Explore sections">${t}</div>
    <div id="explorePanel" role="tabpanel" aria-labelledby="explore-tab-${e}">${s}</div>
  `;return I("Explore",i,{lead:"Universal search & discovery across PIKK.",badge:"Phase 2 demo"})}function Qn(e,t){var n,o,r,c,d,p,m;const s=xc(t),i=e.querySelector("#exploreResultsWrap");if(i)i.innerHTML=vi(s);else{const h=e.querySelector("#explorePanel");if(h){let f=h.querySelector("#exploreLiveInsert");f||(f=document.createElement("div"),f.id="exploreLiveInsert",h.prepend(f)),f.innerHTML=vi(s)}}const a=(((n=s.posts)==null?void 0:n.length)||0)+(((o=s.profiles)==null?void 0:o.length)||0)+(((r=s.music)==null?void 0:r.length)||0)+(((c=s.videos)==null?void 0:c.length)||0)+(((d=s.lives)==null?void 0:d.length)||0)+(((p=s.products)==null?void 0:p.length)||0)+(((m=s.pictures)==null?void 0:m.length)||0);s.query&&g(a?`${a} result(s)`:"No matches")}function Rh(e){var d;const t=e.querySelector("#exploreQ"),s=e.querySelector("#exploreGo"),i=e.querySelector("#exploreClear"),a=()=>Qn(e,(t==null?void 0:t.value)||"");s==null||s.addEventListener("click",a);function n(){var m;clearTimeout(o),t&&(t.value="");const p=e.querySelector("#exploreResultsWrap");p&&(p.innerHTML=vi(null)),(m=e.querySelector("#exploreLiveInsert"))==null||m.remove(),g("Cleared")}i==null||i.addEventListener("click",n);let o;t==null||t.addEventListener("input",()=>{clearTimeout(o),o=setTimeout(a,220)}),t==null||t.addEventListener("keydown",p=>{p.key==="Escape"&&t.value?(p.preventDefault(),n(),t.focus()):p.key==="Enter"&&(p.preventDefault(),clearTimeout(o),a())});const r=[...e.querySelectorAll("[data-explore-tab]")];function c(p,m=!1){var f;const h=(t==null?void 0:t.value)||"";if(clearTimeout(o),ln({exploreTab:p}),R("/explore"),h.trim()){const v=document.getElementById("app"),k=v==null?void 0:v.querySelector("#exploreQ");k&&(k.value=h,Qn(v,h))}m&&((f=document.getElementById("explore-tab-"+p))==null||f.focus())}r.forEach((p,m)=>{p.addEventListener("click",()=>c(p.dataset.exploreTab)),p.addEventListener("keydown",h=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(h.key))return;h.preventDefault();const f=r.length-1,v=h.key==="Home"?0:h.key==="End"?f:(m+(h.key==="ArrowRight"?1:-1)+r.length)%r.length;c(r[v].dataset.exploreTab,!0)})}),(d=e.querySelector("#exploreDiscoverable"))==null||d.addEventListener("change",p=>{ln({exploreDiscoverable:!!p.target.checked}),g(p.target.checked?"Discoverable on":"Discoverable off")})}let si=null;function yt(e){R("#/giftbattles")}function Xn(){si&&(clearInterval(si),si=null)}function ee(e){return"$"+Number(e||0).toFixed(2)}function el(e){const t=Math.max(0,Math.ceil(e/1e3)),s=Math.floor(t/60),i=t%60;return`${s}:${String(i).padStart(2,"0")}`}function jh(){return I("Gift Battles",`<div class="card">
      <h3>Sign in required</h3>
      <p class="muted">Gift battles need a local demo account so scores and history persist on this device.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,{lead:"Runs during Live · not a separate stream · voluntary support · TEST MODE"})}function Kh(){return`
    <div class="card gb-rules">
      <h3>How Gift Battles work</h3>
      <p class="muted" style="margin:0 0 10px;font-size:12px">Runs <strong>during Live</strong> — not its own stream product. Deep-link demo stays here.</p>
      <ul class="gb-rules-list">
        <li><strong>60-second</strong> viewer vs viewer countdown during a live (or sandbox demo).</li>
        <li>Gifts &amp; tips are <strong>voluntary fan support</strong> to the creator — <strong>not wagers</strong>.</li>
        <li>Battle winners get <strong>recognition only</strong>. They do <em>not</em> receive the opponent's money, stakes, or cash prizes.</li>
        <li>No entry fee, minimum spend, or pay-to-enter. Equal scores = tie.</li>
        <li>Battle winners are recognized for the <strong>rest of the calendar day</strong> · up to <strong>10</strong> names on the daily board.</li>
      </ul>
      <p class="muted" style="margin:10px 0 0">TEST MODE · no real payments · no gambling.</p>
    </div>`}function Fh(e){if(!e)return`
      <div class="card">
        <h3>Champion Spotlight</h3>
        <p class="muted" style="margin:0">No active champion today. Win a battle to claim the rest-of-day banner.</p>
      </div>`;const t=Math.max(0,(e.championUntil||0)-Date.now()),s=Math.floor(t/36e5),i=Math.floor(t%36e5/6e4);return`
    <div class="card gb-champion" role="status">
      <div class="row wrap" style="gap:8px;align-items:center">
        <span class="gb-sticker-slot" aria-hidden="true">${Ja("battle-crown",{className:"gift-sticker gift-sticker--battle"}).html}</span>
        <div class="chip">Challenge Winner · rest of day</div>
      </div>
      <h3 class="gb-champion-name">${l(e.username)}</h3>
      <p class="muted" style="margin:0">
        Score ${l(ee(e.score))} · ~${s}h ${i}m left today
        · ${l(e.mode||"demo")}
      </p>
    </div>`}function Gh(e,t){return e?`
      <div class="card gb-live-banner">
        <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center">
          <div>
            <span class="chip">LIVE</span>
            <strong style="margin-left:8px">${l(t.title||"Live")}</strong>
            <p class="muted" style="margin:6px 0 0">Battles can use real live tip/gift stubs via sendLiveSupport.</p>
          </div>
          <a class="btn ghost" href="#/live">Open Live</a>
        </div>
      </div>`:`
    <div class="card">
      <h3>Go live or use sandbox</h3>
      <p class="muted">No active livestream. Start a demo stream on Live, or run a <strong>Demo battle sandbox</strong> with fake opponents (scores local + optional wallet debit).</p>
      <div class="row wrap" style="gap:8px;margin-top:10px">
        <a class="btn primary" href="#/live">Go live first</a>
        <span class="chip">Sandbox available below</span>
      </div>
    </div>`}function Vh(e){return`
    <div class="card gb-battle" data-gb-status="pending">
      <h3>Challenge pending</h3>
      <p><strong>${l(e.challenger.name)}</strong> challenged <strong>${l(e.opponent.name)}</strong></p>
      <p class="muted">Mode: ${l(e.mode)} · opponent must Accept or Decline (demo controls below).</p>
      <div class="row wrap" style="gap:8px;margin-top:12px">
        <button type="button" class="btn primary" id="gbAccept">Accept</button>
        <button type="button" class="btn ghost" id="gbDecline">Decline</button>
      </div>
    </div>`}function Uh(e){const t=Math.max(0,(e.endsAt||0)-Date.now()),s=el(t);return`
    <div class="card gb-battle" data-gb-status="active">
      <div class="gb-countdown" aria-live="polite" aria-atomic="true">
        <span class="gb-countdown-label">Time left</span>
        <span class="gb-countdown-clock" id="gbClock">${l(s)}</span>
      </div>
      <div class="gb-scoreboard" role="group" aria-label="Live battle scores">
        <div class="gb-side">
          <div class="muted">Challenger</div>
          <strong>${l(e.challenger.name)}</strong>
          <div class="gb-score" id="gbScoreA" aria-label="Challenger score ${l(ee(e.scoreA))}">${l(ee(e.scoreA))}</div>
        </div>
        <div class="gb-vs" aria-hidden="true">VS</div>
        <div class="gb-side">
          <div class="muted">Opponent</div>
          <strong>${l(e.opponent.name)}</strong>
          <div class="gb-score" id="gbScoreB" aria-label="Opponent score ${l(ee(e.scoreB))}">${l(ee(e.scoreB))}</div>
        </div>
      </div>
      <p class="muted gb-score-text" id="gbScoreText">
        Live score: ${l(e.challenger.name)} ${l(ee(e.scoreA))} —
        ${l(e.opponent.name)} ${l(ee(e.scoreB))}
      </p>

      <h3 style="margin-top:16px">Send support (counts for you)</h3>
      <p class="muted" style="margin:0 0 8px">Voluntary gifts/tips to the creator. ${e.mode==="live"?"Uses Live tip/gift stubs when wallet has credits.":"Sandbox: scores local; wallet debited if balance allows."}</p>
      <div class="row wrap" style="gap:8px">
        <button type="button" class="btn" data-gb-gift="challenger" data-kind="tip" data-amt="1">Tip $1 (you)</button>
        <button type="button" class="btn primary" data-gb-gift="challenger" data-kind="gift" data-amt="2" data-label="🔥 Fire">Gift $2 (you)</button>
        <button type="button" class="btn" data-gb-gift="challenger" data-kind="gift" data-amt="5" data-label="💎 Diamond">Gift $5 (you)</button>
      </div>

      <h3 style="margin-top:16px">Demo · simulate opponent</h3>
      <p class="muted" style="margin:0 0 8px">Checker / sandbox: credit the opponent's score without switching accounts.</p>
      <div class="row wrap" style="gap:8px">
        <button type="button" class="btn ghost" data-gb-gift="opponent" data-kind="tip" data-amt="1">Opp tip $1</button>
        <button type="button" class="btn ghost" data-gb-gift="opponent" data-kind="gift" data-amt="2" data-label="🔥 Fire">Opp gift $2</button>
      </div>
    </div>`}function Hh(e){var a,n;let t="Tie",s="Equal voluntary support · recognition for both";e.result==="win"&&e.winnerName?(t=`Winner · ${e.winnerName}`,s="Recognition only — no opponent funds transferred"):e.result==="declined"&&(t="Declined",s="Challenge was declined");const i=e.result==="win"?Ja("battle-win",{className:"gift-sticker gift-sticker--battle"}).html:"";return`
    <div class="card gb-battle gb-ended" data-gb-status="ended">
      <div class="row wrap" style="gap:8px;align-items:center">
        ${i?`<span class="gb-sticker-slot" aria-hidden="true">${i}</span>`:""}
        <div class="chip">${e.result==="win"?"Winner":e.result==="tie"?"Tie":"Ended"}</div>
      </div>
      <h3 class="gb-winner-banner">${l(t)}</h3>
      <p class="muted">${l(s)}</p>
      <p class="gb-score-text" style="margin:12px 0">
        Final: ${l(((a=e.challenger)==null?void 0:a.name)||"?")} ${l(ee(e.scoreA))} —
        ${l(((n=e.opponent)==null?void 0:n.name)||"?")} ${l(ee(e.scoreB))}
      </p>
      <button type="button" class="btn primary" id="gbClear">New challenge</button>
    </div>`}function zh(e,t){var a;const i=_r().map(n=>`<option value="${l(n.id)}">${l(n.name)} — ${l(n.bio)}</option>`).join("");return`
    <div class="card">
      <h3>Start a challenge</h3>
      <p class="muted">You are the challenger. Pick a demo opponent. ${e?"Live mode will record your gifts through Live support stubs.":"No live session — sandbox mode."}</p>
      ${t.invitationsEnabled?"":'<p class="gb-warn">Invitations are disabled in prefs — enable below to challenge.</p>'}
      <label class="field">
        <span>Opponent</span>
        <select id="gbOpponent">${i}</select>
      </label>
      <div class="row wrap" style="gap:8px;margin-top:12px">
        ${e?`<button type="button" class="btn primary" id="gbStartLive" ${t.invitationsEnabled?"":"disabled"}>Challenge (Live mode)</button>`:""}
        <button type="button" class="btn ${e?"ghost":"primary"}" id="gbStartSandbox" ${t.invitationsEnabled?"":"disabled"}>
          Demo battle sandbox
        </button>
        <button type="button" class="btn ghost" id="gbTopUp">Add $10 demo wallet</button>
      </div>
      <p class="muted" style="margin:10px 0 0">Wallet: <strong id="gbWalletBal">${l(ee(((a=M().wallet)==null?void 0:a.balance)||0))}</strong> · TEST MODE</p>
    </div>`}function Wh(){const e=_a(10),t=e.length?e.map((s,i)=>`<li class="gb-day-row">${rt("battle-win",{className:"gift-sticker gift-sticker--xs"})}<span class="chip">#${i+1}</span><strong>${l(s.username)}</strong></li>`).join(""):'<li class="muted">No winners yet today · win a 60s battle</li>';return`
    <div class="card gb-day-board" id="gbDayWinners">
      <div class="row wrap" style="justify-content:space-between;gap:8px">
        <h3 style="margin:0">Today&apos;s winners</h3>
        <span class="chip">${e.length}/10 · end of day</span>
      </div>
      <p class="muted" style="margin:6px 0 8px;font-size:12px">Sticker board · recognition only · TEST MODE</p>
      <ol class="gb-list gb-day-list">${t}</ol>
    </div>`}function Yh(){const e=_c(12),t=Nc(15),s=e.length?e.map(a=>{var o,r;const n=a.result==="win"?`Winner ${a.winnerName}`:a.result==="tie"?"Tie":a.result||a.status;return`<li>
            <strong>${l(n)}</strong>
            <span class="muted"> · ${l(((o=a.challenger)==null?void 0:o.name)||"?")} ${l(ee(a.scoreA))} vs ${l(((r=a.opponent)==null?void 0:r.name)||"?")} ${l(ee(a.scoreB))} · ${l(K(a.endedAt||a.createdAt||0))} · ${l(a.mode||"")}</span>
          </li>`}).join(""):'<li class="muted">No battles yet.</li>';return`
    <div class="card">
      <h3>Top winners (local)</h3>
      <ol class="gb-list">${t.length?t.map((a,n)=>`<li><span class="chip">#${n+1}</span> <strong>${l(a.username)}</strong> <span class="muted">${a.wins} win${a.wins===1?"":"s"} · ${l(ee(a.points))} battle pts</span></li>`).join(""):'<li class="muted">Win a battle to appear here.</li>'}</ol>
    </div>
    <div class="card">
      <h3>Battle history</h3>
      <ul class="gb-list">${s}</ul>
    </div>`}function Jh(e){return`
    <div class="card">
      <h3>Battle prefs</h3>
      <label class="toggle"><span>Allow battle invitations</span>
        <input type="checkbox" id="gbPrefInvites" ${e.invitationsEnabled?"checked":""}/>
      </label>
      <p class="muted" style="margin:8px 0 0">When off, new challenges are blocked. Existing active battles can still finish.</p>
    </div>`}function Qh(){const{user:e,live:t}=M();if(!e)return jh();Oa();const s=Ia(),i=La(),a=qc(),n=!!(t&&!t.endedAt);let o="";(s==null?void 0:s.status)==="pending"?o=Vh(s):(s==null?void 0:s.status)==="active"?o=Uh(s):(s==null?void 0:s.status)==="ended"?o=Hh(s):o=zh(n,i);const r=`
    ${Kh()}
    ${Fh(a)}
    ${Wh()}
    ${Gh(n,t)}
    ${o}
    ${Yh()}
    ${Jh(i)}
  `;return I("Gift Battles",r,{lead:"Runs during Live · not a separate stream · 60s voluntary gift battles · not wagers · TEST MODE",badge:(s==null?void 0:s.status)==="active"?"BATTLE":a?"CHAMP":void 0})}function Xh(e){var i,a,n,o,r,c,d;Xn(),(i=e.querySelector("#gbPrefInvites"))==null||i.addEventListener("change",p=>{Tc({invitationsEnabled:p.target.checked}),g(p.target.checked?"Invitations on":"Invitations off")}),(a=e.querySelector("#gbTopUp"))==null||a.addEventListener("click",()=>{var m;ci(10,"Gift battle demo top-up · TEST MODE"),g("+$10 demo wallet");const p=e.querySelector("#gbWalletBal");p&&(p.textContent=ee(((m=M().wallet)==null?void 0:m.balance)||0))});const t=p=>{const m=e.querySelector("#gbOpponent"),h=m==null?void 0:m.value,f=_r().find(k=>k.id===h),v=Dc({opponentId:h,opponentName:f==null?void 0:f.name,mode:p});if((v==null?void 0:v.error)==="signin")return g("Sign in first");if((v==null?void 0:v.error)==="invites_disabled")return g("Invitations disabled");if((v==null?void 0:v.error)==="not_live")return g("Not live — use sandbox");if((v==null?void 0:v.error)==="battle_in_progress")return g("Battle already in progress");if((v==null?void 0:v.error)==="self")return g("Pick another fan");g("Challenge sent · waiting for accept"),yt()};(n=e.querySelector("#gbStartLive"))==null||n.addEventListener("click",()=>t("live")),(o=e.querySelector("#gbStartSandbox"))==null||o.addEventListener("click",()=>t("sandbox")),(r=e.querySelector("#gbAccept"))==null||r.addEventListener("click",()=>{const p=Mc();if((p==null?void 0:p.error)==="no_pending")return g("No pending challenge");if((p==null?void 0:p.error)==="invites_disabled")return g("Invitations disabled");g("Battle started · 1:00"),yt()}),(c=e.querySelector("#gbDecline"))==null||c.addEventListener("click",()=>{const p=Lc();if(p!=null&&p.error)return g(String(p.error));g("Challenge declined"),yt()}),(d=e.querySelector("#gbClear"))==null||d.addEventListener("click",()=>{const p=Ic();if(p!=null&&p.error)return g("Battle still running");yt()}),e.querySelectorAll("[data-gb-gift]").forEach(p=>{p.addEventListener("click",()=>{var b;const m=Oc({side:p.dataset.gbGift,kind:p.dataset.kind||"gift",amount:Number(p.dataset.amt)||2,label:p.dataset.label||""});if((m==null?void 0:m.error)==="signin")return g("Sign in first");if((m==null?void 0:m.error)==="no_active"||(m==null?void 0:m.error)==="ended")return g("No active battle");if((m==null?void 0:m.error)==="offline")return g("Live offline — use sandbox");if((m==null?void 0:m.error)==="insufficient")return g("Need wallet credits");if(g(p.dataset.gbGift==="opponent"?"Opponent support (demo)":"Support sent · demo"),((b=m.battle)==null?void 0:b.status)==="ended"){g(m.battle.result==="win"?`Winner · ${m.battle.winnerName}`:"Tie!"),yt();return}const h=e.querySelector("#gbScoreA"),f=e.querySelector("#gbScoreB"),v=e.querySelector("#gbScoreText"),k=m.battle;h&&f&&k?(h.textContent=ee(k.scoreA),h.setAttribute("aria-label",`Challenger score ${ee(k.scoreA)}`),f.textContent=ee(k.scoreB),f.setAttribute("aria-label",`Opponent score ${ee(k.scoreB)}`),v&&(v.textContent=`Live score: ${k.challenger.name} ${ee(k.scoreA)} — ${k.opponent.name} ${ee(k.scoreB)}`)):yt()})});const s=e.querySelector("#gbClock");s&&(si=setInterval(()=>{const p=Oa();if(!p||p.status==="ended"){Xn(),(p==null?void 0:p.status)==="ended"&&g(p.result==="win"?`Winner · ${p.winnerName}`:"Tie!"),yt();return}const m=Math.max(0,(p.endsAt||0)-Date.now());s.textContent=el(m)},250))}function ke(){R("#/multiguest")}function Zh(e){return(String(e||"?").trim().slice(0,2)||"?").toUpperCase()}function eg(e){const t=M().user;return!t||!e?!1:(t.following||[]).includes(e)}function Qa(e){return((e==null?void 0:e.guests)||[]).filter(t=>t.status==="joined")}function tg(e){return((e==null?void 0:e.guests)||[]).filter(t=>t.status==="invited")}function ua(e,t){var i,a;return`${Number(((a=(i=e==null?void 0:e.giftSplit)==null?void 0:i.shares)==null?void 0:a[t])||0).toFixed(0)}%`}function sg(){return I("Multi-Guest Live",`<div class="card">
      <h3>Sign in required</h3>
      <p class="muted">Start a multi-guest demo session as host. No camera / WebRTC — fake stage tiles only.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,{lead:"Invite 2–4 co-hosts · disclosed gift splits · TEST MODE"})}function ig(){return`
    <div class="card mg-intro">
      <h3>Multi-Guest Livestreams</h3>
      <ul class="mg-rules">
        <li>Host invites <strong>2–4 guests</strong> with separate profiles &amp; Follow.</li>
        <li>Fake stage tiles only — <strong>no camera / WebRTC</strong> in TEST MODE.</li>
        <li>Join / leave, host mute &amp; remove, shared chat stub.</li>
        <li>Before “broadcast”, disclose <strong>gift split</strong> (equal or custom % totaling 100%).</li>
        <li>Display-only split intent — no real payouts.</li>
      </ul>
      <div class="row wrap" style="gap:8px;margin-top:10px">
        <a class="btn ghost" href="#/live">Solo Live</a>
        <a class="btn ghost" href="#/music">Music / Coming Soon</a>
        <a class="btn ghost" href="#/giftbattles">Gift Battles</a>
      </div>
      <p class="muted" style="margin:10px 0 0">TEST MODE · PIKK branding required on every collab stage.</p>
    </div>`}function Xi({role:e,name:t,sub:s,muted:i,empty:a,followId:n}){if(a)return`
      <div class="mg-tile mg-tile-empty" aria-label="Empty guest slot">
        <div class="mg-avatar mg-avatar-empty">+</div>
        <div class="mg-tile-name muted">Open slot</div>
        <div class="mg-tile-sub muted">Invite a guest</div>
      </div>`;const o=i?'<span class="chip">Muted</span>':"",r=n&&n!=="dbs"?eg(n)?`<button class="btn ghost mg-follow" data-follow="${l(n)}" data-on="1">Following</button>`:`<button class="btn ghost mg-follow" data-follow="${l(n)}" data-on="0">Follow</button>`:n==="dbs"?'<a class="btn ghost" href="#/profile">Follow PIKK</a>':"";return`
    <div class="mg-tile ${e==="host"?"mg-tile-host":""} ${i?"mg-muted":""}">
      <div class="mg-avatar" aria-hidden="true">${l(Zh(t))}</div>
      <div class="mg-tile-name">${l(t)}</div>
      <div class="mg-tile-sub">${l(s||"")} ${o}</div>
      <div class="mg-tile-actions">${r}</div>
    </div>`}function ag(e){var n,o;const t=Qa(e),s=[];s.push(Xi({role:"host",name:e.hostName,sub:"Host",followId:e.hostId===((n=M().user)==null?void 0:n.id)?"dbs":e.hostId}));for(let r=0;r<(e.maxGuests||4);r++){const c=t[r];c?s.push(Xi({role:"guest",name:c.username,sub:"Guest",muted:c.muted,followId:c.id})):s.push(Xi({empty:!0}))}const i=(o=e.giftSplit)!=null&&o.disclosed?'<span class="chip">Split disclosed</span>':'<span class="chip">Split pending</span>',a=e.broadcastReady?'<span class="chip">Broadcast ready</span>':'<span class="chip">Setup</span>';return`
    <div class="card mg-stage">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center">
        <div>
          <div class="row wrap" style="gap:8px;align-items:center">
            <img class="mg-brand-logo" src="/brand/pikk-official-approved.jpg" alt="PIKK" />
            <div>
              <strong>${l(e.title)}</strong>
              <div class="muted" style="font-size:12px">@${l(e.hostName)} · Multi-Guest · Follow DatBoiSkeet</div>
            </div>
          </div>
        </div>
        <div class="row wrap" style="gap:6px">
          <span class="chip"><span class="dot" aria-hidden="true"></span> DEMO</span>
          ${a}
          ${i}
        </div>
      </div>
      <p class="muted mg-stage-note">TEST MODE · placeholder tiles · no camera / bandwidth stream</p>
      <div class="mg-grid" role="list">${s.join("")}</div>
      <div class="row wrap" style="gap:8px;margin-top:12px">
        <a class="btn ghost" href="#/music">PIKK Music</a>
        <a class="btn ghost" href="#/live">Solo Live</a>
        <button class="btn ghost danger" id="mgEnd">End session</button>
      </div>
    </div>`}function ng(e){const t=Bc(),s=new Set((e.guests||[]).filter(p=>p.status==="invited"||p.status==="joined").map(p=>p.id)),i=t.filter(p=>p.id!==e.hostId&&!s.has(p.id)),a=tg(e),n=Qa(e),o=i.length?i.map(p=>`<option value="${l(p.id)}">${l(p.username)} — ${l(p.bio||"demo")}</option>`).join(""):'<option value="">No more demo guests</option>',r=a.length?a.map(p=>`
        <li class="mg-guest-row">
          <span><strong>@${l(p.username)}</strong> <span class="chip">Invited</span></span>
          <span class="row wrap" style="gap:6px">
            <button class="btn primary mg-accept" data-id="${l(p.id)}">Accept (sim)</button>
            <button class="btn ghost mg-decline" data-id="${l(p.id)}">Decline</button>
          </span>
        </li>`).join(""):'<li class="muted">No pending invites.</li>',c=n.length?n.map(p=>`
        <li class="mg-guest-row">
          <span>
            <strong>@${l(p.username)}</strong>
            ${p.muted?'<span class="chip">Muted</span>':'<span class="chip">On stage</span>'}
            <span class="muted" style="font-size:12px"> · gift ${l(ua(e,p.id))}</span>
          </span>
          <span class="row wrap" style="gap:6px">
            <button class="btn ghost mg-mute" data-id="${l(p.id)}" data-muted="${p.muted?"1":"0"}">
              ${p.muted?"Unmute":"Mute"}
            </button>
            <button class="btn ghost mg-leave" data-id="${l(p.id)}">Leave (sim)</button>
            <button class="btn ghost danger mg-remove" data-id="${l(p.id)}">Remove</button>
          </span>
        </li>`).join(""):'<li class="muted">No guests on stage yet — invite below.</li>',d=n.length+a.length>=(e.maxGuests||4);return`
    <div class="card">
      <h3>Guests &amp; moderation</h3>
      <p class="muted" style="margin:0 0 8px">Host simulates Accept/Decline. Up to ${l(String(e.maxGuests||4))} guests.</p>
      <ul class="mg-list">${c}</ul>
      <h4 style="margin:14px 0 6px">Pending invites</h4>
      <ul class="mg-list">${r}</ul>
      <div class="field" style="margin-top:12px">
        <span>Invite demo guest</span>
        <div class="row wrap" style="gap:8px;margin-top:6px">
          <select id="mgInviteSelect" ${d||!i.length?"disabled":""}>${o}</select>
          <button class="btn primary" id="mgInviteBtn" ${d||!i.length?"disabled":""}>Invite</button>
        </div>
      </div>
      ${d?'<p class="muted" style="margin:8px 0 0">Guest slots full (joined + pending).</p>':""}
    </div>`}function rg(e){var o,r;const t=Qa(e),s=[{id:e.hostId,username:e.hostName,role:"Host"},...t.map(c=>({id:c.id,username:c.username,role:"Guest"}))],i=((o=e.giftSplit)==null?void 0:o.mode)||"equal",a=!!((r=e.giftSplit)!=null&&r.disclosed),n=s.map(c=>{var p,m;const d=Number(((m=(p=e.giftSplit)==null?void 0:p.shares)==null?void 0:m[c.id])||0);return`
        <li class="mg-split-row">
          <span><strong>@${l(c.username)}</strong> <span class="chip">${l(c.role)}</span></span>
          ${i==="custom"&&!a?`<label class="mg-pct"><input type="number" min="0" max="100" step="1" class="mg-share-input" data-id="${l(c.id)}" value="${l(String(d))}" /> %</label>`:`<span class="chip">${l(String(Math.round(d)))}%</span>`}
        </li>`}).join("");return`
    <div class="card mg-split">
      <h3>Gift split disclosure</h3>
      <p class="muted">Required before broadcast when multiple hosts/guests share gifts. Display-only · TEST MODE · not a real payout.</p>
      <div class="row wrap" style="gap:8px;margin:10px 0">
        <button class="btn ${i==="equal"?"primary":"ghost"}" id="mgSplitEqual">Equal split</button>
        <button class="btn ${i==="custom"?"primary":"ghost"}" id="mgSplitCustom">Custom %</button>
      </div>
      <ul class="mg-list">${n}</ul>
      <p class="muted" style="margin:8px 0 0">Host share: <strong>${l(ua(e,e.hostId))}</strong>
        · Guests: ${t.length?t.map(c=>`@${l(c.username)} ${l(ua(e,c.id))}`).join(" · "):"none yet"}</p>
      ${a?`<p class="mg-ok" style="margin:10px 0 0">✓ Split disclosed ${e.giftSplit.disclosedAt?"· "+K(e.giftSplit.disclosedAt):""}. Broadcast ready (demo).</p>`:`<div class="row wrap" style="gap:8px;margin-top:12px">
               ${i==="custom"?'<button class="btn" id="mgSplitApply">Apply custom %</button>':""}
               <button class="btn primary" id="mgDisclose">Disclose &amp; ready broadcast</button>
             </div>
             <p class="muted" style="margin:8px 0 0">Custom % must total 100 among host + joined guests.</p>`}
    </div>`}function og(e){return`
    <div class="card">
      <h3>Shared chat</h3>
      <div class="mg-chat" id="mgChat">${(e.chat||[]).slice(-40).map(s=>`
      <div class="mg-chat-row ${s.system?"system":""}">
        <strong>${l(s.username)}</strong>
        <span>${l(s.text)}</span>
      </div>`).join("")||'<p class="muted">No messages yet.</p>'}</div>
      <div class="row" style="gap:8px;margin-top:10px">
        <input id="mgChatInput" placeholder="Say something on the collab…" maxlength="280" style="flex:1" />
        <button class="btn primary" id="mgChatSend">Send</button>
      </div>
    </div>`}function Zn(e){return e.length?`
    <div class="card">
      <h3>Recent multi-guest sessions</h3>
      <ul class="mg-list">${e.slice(0,8).map(s=>{var a;const i=(s.guests||[]).filter(n=>n.status==="joined"||n.joinedAt).length;return`<li><strong>${l(s.title)}</strong> · ${l(String(i))} guests · ${K(s.endedAt||s.startedAt)}
        ${(a=s.giftSplit)!=null&&a.disclosed?" · split disclosed":""}</li>`}).join("")}</ul>
    </div>`:`
      <div class="card">
        <h3>Recent multi-guest sessions</h3>
        <p class="muted" style="margin:0">No ended sessions yet.</p>
      </div>`}function lg(e){return`
    <div class="card">
      <h3>Start multi-guest session</h3>
      <p class="muted">You host as <strong>@${l(e.username)}</strong>. Invite demo contacts next — no real stream.</p>
      <div class="field" style="margin-top:10px">
        <span>Session title</span>
        <input id="mgTitle" maxlength="80" placeholder="e.g. Friday collab freestyle" value="PIKK Multi-Guest Demo" />
      </div>
      <button class="btn primary" id="mgStart" style="margin-top:12px">Start as host</button>
    </div>`}function cg(){const t=M().user;if(!t)return sg();Ai();const s=xs(),i=Rc();return!s||s.endedAt?I("Multi-Guest Live",`${ig()}${lg(t)}${Zn(i)}`,{lead:"2–4 co-hosts · gift split disclosure · TEST MODE"}):I("Multi-Guest Live",`${ag(s)}${ng(s)}${rg(s)}${og(s)}${Zn(i)}`,{lead:"Active collab session · fake stage · TEST MODE"})}function dg(e){var s,i,a,n,o,r,c,d,p;if(!e)return;(s=e.querySelector("#mgStart"))==null||s.addEventListener("click",()=>{var f;const m=((f=e.querySelector("#mgTitle"))==null?void 0:f.value)||"",h=jc(m);if(h.error==="signin")return g("Sign in first");if(h.error==="session_in_progress")return g("Session already active");g("Multi-guest session started"),ke()}),(i=e.querySelector("#mgEnd"))==null||i.addEventListener("click",()=>{const m=Yc();if(m.error)return g(m.error==="host_only"?"Host only":"No session");g("Session ended"),ke()}),(a=e.querySelector("#mgInviteBtn"))==null||a.addEventListener("click",()=>{var f,v;const m=(f=e.querySelector("#mgInviteSelect"))==null?void 0:f.value;if(!m)return g("Pick a guest");const h=Kc(m);if(h.error==="full")return g("Guest slots full");if(h.error==="already_invited")return g("Already invited");if(h.error)return g("Invite failed: "+h.error);g("Invited @"+(((v=h.guest)==null?void 0:v.username)||m)),ke()}),e.querySelectorAll(".mg-accept").forEach(m=>{m.addEventListener("click",()=>{var f;const h=Fc(m.getAttribute("data-id"));if(h.error==="full")return g("Stage full");if(h.error)return g("Accept failed");g("@"+(((f=h.guest)==null?void 0:f.username)||"")+" joined"),ke()})}),e.querySelectorAll(".mg-decline").forEach(m=>{m.addEventListener("click",()=>{if(Gc(m.getAttribute("data-id")).error)return g("Decline failed");g("Invite declined"),ke()})}),e.querySelectorAll(".mg-mute").forEach(m=>{m.addEventListener("click",()=>{const h=m.getAttribute("data-id"),f=m.getAttribute("data-muted")==="1";if(Hc(h,!f).error)return g("Mute failed");g(f?"Unmuted":"Muted"),ke()})}),e.querySelectorAll(".mg-leave").forEach(m=>{m.addEventListener("click",()=>{if(Vc(m.getAttribute("data-id")).error)return g("Leave failed");g("Guest left"),ke()})}),e.querySelectorAll(".mg-remove").forEach(m=>{m.addEventListener("click",()=>{if(Uc(m.getAttribute("data-id")).error)return g("Remove failed");g("Guest removed"),ke()})}),e.querySelectorAll(".mg-follow").forEach(m=>{m.addEventListener("click",()=>{const h=m.getAttribute("data-follow");m.getAttribute("data-on")==="1"?(wi(h),g("Unfollowed")):(ki(h),g("Following")),ke()})}),(n=e.querySelector("#mgSplitEqual"))==null||n.addEventListener("click",()=>{if(ps({mode:"equal",disclose:!1}).error)return g("Split failed");g("Equal split applied"),ke()}),(o=e.querySelector("#mgSplitCustom"))==null||o.addEventListener("click",()=>{var f;const m=xs();if(ps({mode:"custom",shares:((f=m==null?void 0:m.giftSplit)==null?void 0:f.shares)||{},disclose:!1}).error)return g("Could not switch to custom");g("Custom split — edit % then Apply"),ke()}),(r=e.querySelector("#mgSplitApply"))==null||r.addEventListener("click",()=>{const m={};e.querySelectorAll(".mg-share-input").forEach(f=>{m[f.getAttribute("data-id")]=Number(f.value)||0});const h=ps({mode:"custom",shares:m,disclose:!1});if(h.error==="split_total")return g(`Percents total ${h.total}% — need 100%`);if(h.error)return g("Apply failed");g("Custom split saved"),ke()}),(c=e.querySelector("#mgDisclose"))==null||c.addEventListener("click",()=>{var f;const m=xs();if(((f=m==null?void 0:m.giftSplit)==null?void 0:f.mode)==="custom"){const v={},k=e.querySelectorAll(".mg-share-input");if(k.length){k.forEach(S=>{v[S.getAttribute("data-id")]=Number(S.value)||0});const b=ps({mode:"custom",shares:v,disclose:!1});if(b.error==="split_total")return g(`Percents total ${b.total}% — need 100%`)}}const h=Wc();if(h.error==="split_total")return g(`Percents total ${h.total}% — need 100%`);if(h.error)return g("Disclose failed");g("Gift split disclosed · broadcast ready (demo)"),ke()});const t=()=>{const m=e.querySelector("#mgChatInput"),h=(m==null?void 0:m.value)||"",f=zc(h);if(f.error==="empty")return g("Type a message");if(f.error)return g("Chat failed");m&&(m.value=""),ke()};(d=e.querySelector("#mgChatSend"))==null||d.addEventListener("click",t),(p=e.querySelector("#mgChatInput"))==null||p.addEventListener("keydown",m=>{m.key==="Enter"&&(m.preventDefault(),t())})}function we(e){R(e?`#/fanclubs?club=${encodeURIComponent(e)}`:"#/fanclubs")}function Ye(e="DemoFan"){const{user:t}=M();if(t)return t;const s=zt(e);return g(`Signed in as ${e} · local demo`),s||M().user}function tl(e){return e==="paid"?"Paid / Skeet+":e==="members"?"Members only":"Public"}function pg(e,t){const s=t===e.id,i=[e.official?'<span class="chip">Official DBS</span>':"",`<span class="chip">${l(tl(e.privacy))}</span>`,`<span class="chip">${e.memberCount||0} members</span>`].filter(Boolean).join(" ");return`<button type="button" class="fanclub-card${s?" on":""}" data-open-club="${l(e.id)}" data-search="${l(`${e.name||""} ${e.hostName||""} ${e.description||""}`)}" aria-label="Open ${l(e.name)} club">
    <div class="row" style="gap:10px;align-items:center">
      <img src="${l(e.graphic||"/brand/logo-dbs-v3@2x.webp")}" alt="" width="48" height="48" style="border-radius:12px;object-fit:cover;background:#111" />
      <div style="flex:1;min-width:0">
        <strong>${l(e.name)}</strong>
        <div class="muted" style="font-size:12px;margin-top:2px">Host @${l(e.hostName)} · Discover DatBoiSkeet</div>
        <div class="row wrap" style="gap:6px;margin-top:6px">${i}</div>
      </div>
    </div>
  </button>`}function ug(e){const t=Is(e);if(!t)return'<div class="card"><p class="muted" style="margin:0">Club not found.</p><button class="btn" data-back-list>Back to clubs</button></div>';const s=M().user,i=Hr(t.id),a=$d(t.id),n=As(t.id),o=zr(t.id),r=Tt(),c=o.ok?"":`<div class="card" style="border-color:rgba(245,158,11,.35)">
          <h3 style="margin:0 0 6px">${t.privacy==="paid"?"Skeet+ room":"Members only"}</h3>
          <p class="muted" style="margin:0 0 10px">${t.privacy==="paid"?"This room uses membership permissions (Skeet+ or higher). TEST MODE unlock below — no real charge.":"Join the club to enter the discussion room."}</p>
          ${t.privacy==="paid"?`<button class="btn primary" id="fcUnlockSkeet">Unlock Skeet+ · TEST MODE</button>
                 <a class="btn" href="#/pricing">Pricing</a>
                 <p class="chip" style="margin-top:8px">Current membership: ${l(r||"none")}</p>`:`<button class="btn primary" data-join="${l(t.id)}">Join club</button>`}
        </div>`,d=o.ok?xd(t.id):[],p=o.ok?d.length?d.map(h=>{const f=n?`<div class="row wrap" style="gap:6px;margin-top:6px">
                   <button class="btn ghost" data-pin="${l(h.id)}" data-club="${l(t.id)}">${h.pinned?"Unpin":"Pin"} · mod</button>
                   <button class="btn ghost" data-remove="${l(h.id)}" data-club="${l(t.id)}">Remove · mod</button>
                 </div>`:"";return`<li style="padding:10px 0;border-top:1px solid rgba(255,255,255,.06)">
              <div class="row" style="justify-content:space-between;gap:8px">
                <strong>@${l(h.username)}</strong>
                <span class="muted" style="font-size:12px">${l(K(h.at))}${h.pinned?" · pinned":""}</span>
              </div>
              <p style="margin:6px 0 0">${l(h.text)}</p>
              ${f}
            </li>`}).join(""):'<li class="muted" style="padding:8px 0">No posts yet — start the discussion.</li>':"",m=o.ok?`<form id="fcPostForm" class="card" style="margin-top:10px">
         <label class="muted" style="font-size:12px">Public discussion · local posts</label>
         <textarea id="fcPostText" rows="3" maxlength="500" placeholder="Share with the club…" style="width:100%;margin:8px 0;background:#0e0e14;border:1px solid var(--line);border-radius:12px;padding:10px;color:inherit;resize:vertical"></textarea>
         <button class="btn primary" type="submit">Post</button>
         <span class="chip">TEST MODE · localStorage</span>
       </form>`:"";return`
    <div class="card fanclubs-detail">
      <button class="btn ghost" data-back-list style="margin-bottom:8px">← All clubs</button>
      <div class="row" style="gap:12px;align-items:flex-start">
        <img src="${l(t.graphic||"/brand/logo-dbs-v3@2x.webp")}" alt="" width="72" height="72" style="border-radius:16px;object-fit:cover" />
        <div style="flex:1">
          <h2 style="margin:0 0 4px">${l(t.name)}</h2>
          <p class="muted" style="margin:0 0 8px">${l(t.description)}</p>
          <div class="row wrap" style="gap:6px">
            ${t.official?'<span class="chip">Official DatBoiSkeet</span>':""}
            <span class="chip">${l(tl(t.privacy))}</span>
            <span class="chip">${t.memberCount||0} members</span>
            <span class="chip">${(t.followers||[]).length} following</span>
          </div>
        </div>
      </div>
      <div class="row wrap" style="gap:8px;margin-top:14px">
        ${i?`<button class="btn" data-leave="${l(t.id)}">Leave club</button>`:`<button class="btn primary" data-join="${l(t.id)}">Join club</button>`}
        ${a?`<button class="btn" data-unfollow="${l(t.id)}">Unfollow</button>`:`<button class="btn" data-follow="${l(t.id)}">Follow · optional</button>`}
        <a class="btn" href="#/community">Lounge</a>
        <a class="btn" href="#/music">Music</a>
        <a class="btn" href="#/explore">Explore</a>
      </div>
      <p class="muted" style="font-size:12px;margin:10px 0 0">Follows are optional — DBS never forces a follow. Channel-style Lounge (Discord-inspired UX) — music-first, DatBoiSkeet branded.</p>
      ${s?"":'<p class="chip" style="margin-top:8px">Sign in to join · local demo</p>'}
      ${n?'<p class="chip" style="margin-top:8px">Mod tools · TEST MODE</p>':""}
    </div>
    ${c}
    ${o.ok?`<div class="card">
             <h3 style="margin:0 0 4px">Discussion</h3>
             <p class="muted" style="margin:0 0 8px;font-size:12px">Local posts in dbs_v1 · mods can pin/remove</p>
             <ul class="list-plain" id="fcPosts">${p}</ul>
           </div>
           ${m}`:""}
  `}function mg(e){var d;Ke();const t=Vr(),s=((d=e==null?void 0:e.query)==null?void 0:d.club)||"",{user:i}=M(),a=t.map(p=>pg(p,s)).join(""),n=t.filter(p=>p.privacy==="public").length,o=t.length-n,r=`
    <div class="card" id="fcCreateCard">
      <h3 style="margin:0 0 6px">Create club · TEST MODE</h3>
      <p class="muted" style="margin:0 0 10px;font-size:12px">Approved creators / demo admin. Custom name + graphic URL. Optional paid/private room using membership permissions.</p>
      <form id="fcCreateForm">
        <label class="muted" style="font-size:12px">Name</label>
        <input id="fcName" maxlength="48" required placeholder="My Fan Club" style="width:100%;margin:4px 0 10px;background:#0e0e14;border:1px solid var(--line);border-radius:12px;padding:10px;color:inherit" />
        <label class="muted" style="font-size:12px">Description</label>
        <textarea id="fcDesc" maxlength="280" rows="2" placeholder="What this club is about…" style="width:100%;margin:4px 0 10px;background:#0e0e14;border:1px solid var(--line);border-radius:12px;padding:10px;color:inherit;resize:vertical"></textarea>
        <label class="muted" style="font-size:12px">Graphic URL</label>
        <input id="fcGraphic" placeholder="/brand/logo-dbs-v3@2x.webp" style="width:100%;margin:4px 0 10px;background:#0e0e14;border:1px solid var(--line);border-radius:12px;padding:10px;color:inherit" />
        <label class="muted" style="font-size:12px">Room privacy</label>
        <select id="fcPrivacy" style="width:100%;margin:4px 0 12px;background:#0e0e14;border:1px solid var(--line);border-radius:12px;padding:10px;color:inherit">
          <option value="public">Public discussion</option>
          <option value="members">Members only</option>
          <option value="paid">Paid / Skeet+ gate</option>
        </select>
        <button class="btn primary" type="submit">Create club</button>
        <button class="btn ghost" type="button" id="fcSeedBtn">Reseed demos</button>
        ${i?"":'<button class="btn" type="button" id="fcSignIn">Sign in demo</button>'}
        <button class="btn ghost" type="button" id="fcAdmin">Toggle demo admin</button>
        <p class="chip" style="margin-top:10px">TEST MODE · no real payments · DBS branding stays prominent</p>
      </form>
    </div>`,c=s?ug(s):`
      <section class="fanclubs-hero" aria-labelledby="fanclubs-heading">
        <div class="fanclubs-eyebrow">PIKK CONNECT <span aria-hidden="true">◆</span> CREATOR COMMUNITIES</div>
        <h2 id="fanclubs-heading">Find your people. Build your club.</h2>
        <p>Explore creator-led communities, join conversations, and follow the artists you love. Your existing clubs and local demo activity stay right here.</p>
        <div class="fanclubs-hero-actions">
          <button class="btn primary" type="button" data-fc-jump="fcDiscover">Discover clubs</button>
          <button class="btn ghost" type="button" data-fc-jump="fcCreateCard">Create a club</button>
        </div>
        <div class="fanclubs-hero-note">TEST MODE · Clubs, memberships and posts are browser-local demo data</div>
      </section>
      <section class="fanclubs-stats" aria-label="Club directory overview">
        <div><span>Available clubs</span><strong>${t.length}</strong><small>In this demo</small></div>
        <div><span>Public rooms</span><strong>${n}</strong><small>Open discussions</small></div>
        <div><span>Private / gated</span><strong>${o}</strong><small>Demo access controls</small></div>
      </section>
      <section class="card fanclubs-discover" id="fcDiscover" aria-labelledby="fcDiscoverTitle">
        <div class="fanclubs-discover-head">
          <div><h3 id="fcDiscoverTitle">Discover clubs</h3><p class="muted">Find communities by club, host or topic.</p></div>
          <a class="btn ghost" href="#/community">Community Lounge</a>
        </div>
        <label for="fcSearch">Search clubs</label>
        <input id="fcSearch" type="search" autocomplete="off" placeholder="Search clubs, creators or interests" />
        <p id="fcSearchStatus" class="muted" role="status" aria-live="polite">Showing ${t.length} of ${t.length} clubs</p>
        <div class="fanclubs-grid">${a||'<p class="muted">No clubs yet.</p>'}</div>
        <p id="fcNoResults" class="muted" hidden>No clubs match your search. Try a different name or topic.</p>
      </section>
      ${r}
    `;return I("Fan Clubs",`<div class="fanclubs-studio">${c}</div>`,{lead:"Creator communities inside DBS Lounge · DEMO.",badge:"Phase 2 demo"})}function hg(e){var i,a,n,o,r,c,d;e.querySelectorAll("[data-fc-jump]").forEach(p=>p.addEventListener("click",()=>{var h;const m=p.getAttribute("data-fc-jump");(h=e.querySelector(`#${m}`))==null||h.scrollIntoView({behavior:"smooth",block:"start"})}));const t=e.querySelector("#fcSearch"),s=()=>{const p=String((t==null?void 0:t.value)||"").trim().toLocaleLowerCase(),m=[...e.querySelectorAll(".fanclub-card[data-search]")];let h=0;m.forEach(k=>{const b=(k.dataset.search||"").toLocaleLowerCase().includes(p);k.hidden=!b,b&&(h+=1)});const f=e.querySelector("#fcSearchStatus");f&&(f.textContent=`Showing ${h} of ${m.length} clubs`);const v=e.querySelector("#fcNoResults");v&&(v.hidden=h>0||!p)};t==null||t.addEventListener("input",s),t==null||t.addEventListener("keydown",p=>{p.key!=="Escape"||!t.value||(p.preventDefault(),p.stopPropagation(),t.value="",s())}),e.querySelectorAll("[data-open-club]").forEach(p=>{p.addEventListener("click",()=>we(p.getAttribute("data-open-club")))}),(i=e.querySelector("[data-back-list]"))==null||i.addEventListener("click",()=>we()),(a=e.querySelector("#fcSignIn"))==null||a.addEventListener("click",()=>{Ye("DemoFan"),we()}),(n=e.querySelector("#fcAdmin"))==null||n.addEventListener("click",()=>{var m,h;Ye("DemoAdmin");const p=!se();Ts(p),g(p?"Demo admin on":"Demo admin off"),we(((m=e.querySelector("[data-leave],[data-join]"))==null?void 0:m.getAttribute("data-leave"))||((h=e.querySelector("[data-join]"))==null?void 0:h.getAttribute("data-join"))||void 0)}),(o=e.querySelector("#fcSeedBtn"))==null||o.addEventListener("click",()=>{Ke({force:!0}),g("Demo clubs reseeded"),we()}),(r=e.querySelector("#fcCreateForm"))==null||r.addEventListener("submit",p=>{var b,S,$,A,w;p.preventDefault(),Ye("DemoCreator");const m=(b=e.querySelector("#fcName"))==null?void 0:b.value,h=(S=e.querySelector("#fcDesc"))==null?void 0:S.value,f=(($=e.querySelector("#fcGraphic"))==null?void 0:$.value)||"/brand/logo-dbs-v3@2x.webp",v=((A=e.querySelector("#fcPrivacy"))==null?void 0:A.value)||"public",k=yd({name:m,description:h,graphic:f,privacy:v});if(k.error==="signin")return g("Sign in required");if(k.error==="name")return g("Name required");g("Club created · TEST MODE"),we((w=k.club)==null?void 0:w.id)}),e.querySelectorAll("[data-join]").forEach(p=>{p.addEventListener("click",()=>{Ye();const m=p.getAttribute("data-join");if(Ur(m).error)return g("Could not join");g("Joined club"),we(m)})}),e.querySelectorAll("[data-leave]").forEach(p=>{p.addEventListener("click",()=>{Ye();const m=p.getAttribute("data-leave"),h=kd(m);if(h.error==="host")return g("Host cannot leave — transfer later");if(h.error)return g("Could not leave");g("Left club"),we(m)})}),e.querySelectorAll("[data-follow]").forEach(p=>{p.addEventListener("click",()=>{Ye();const m=p.getAttribute("data-follow");wd(m),g("Following · optional"),we(m)})}),e.querySelectorAll("[data-unfollow]").forEach(p=>{p.addEventListener("click",()=>{Ye();const m=p.getAttribute("data-unfollow");Sd(m),g("Unfollowed"),we(m)})}),(c=e.querySelector("#fcUnlockSkeet"))==null||c.addEventListener("click",()=>{Ye(),yi("skeet+",!0),g("Skeet+ unlocked · TEST MODE");const p=new URLSearchParams(location.hash.split("?")[1]||"");we(p.get("club")||void 0)}),(d=e.querySelector("#fcPostForm"))==null||d.addEventListener("submit",p=>{var k;p.preventDefault(),Ye();const h=new URLSearchParams(location.hash.split("?")[1]||"").get("club"),f=(k=e.querySelector("#fcPostText"))==null?void 0:k.value,v=Ed(h,f);if(v.error==="gated")return g("Room gated");if(v.error==="empty")return g("Write something");if(v.error)return g("Could not post");g("Posted"),we(h)}),e.querySelectorAll("[data-pin]").forEach(p=>{p.addEventListener("click",()=>{const m=p.getAttribute("data-club");if(Ad(m,p.getAttribute("data-pin")).error==="mod")return g("Mods only");g("Pin toggled · TEST MODE"),we(m)})}),e.querySelectorAll("[data-remove]").forEach(p=>{p.addEventListener("click",()=>{const m=p.getAttribute("data-club");if(Cd(m,p.getAttribute("data-remove")).error==="mod")return g("Mods only");g("Post removed · TEST MODE"),we(m)})})}function ma(){R("#/loyalty")}function ha(){const{user:e}=M();if(e)return e;const t=zt("LoyalFan");return g("Signed in as LoyalFan · local demo"),t||M().user}function Ws(e,t,s){var a;ha();const i=ap(e,{points:t,note:s});if(i.error==="signin")return g("Sign in required");if(i.error==="cooldown")return g("Anti-farming · wait a few seconds");if(i.error==="daily_cap")return g("Daily cap hit · come back tomorrow (demo)");if(i.error)return g("Could not record");(i.newBadges||[]).filter(n=>n!=="day_one"||(i.loyalty.badges||[]).includes("day_one")),(a=i.newBadges)!=null&&a.length?g(`+${t} pts · badge: ${i.newBadges.join(", ")}`):g(`+${t} pts · ${s}`),ma()}function gg(){const{user:e}=M(),t=Os(),i=ho().map(o=>{const r=o.unlocked;return`<div class="card" style="opacity:${r?1:.55};margin:0">
        <div class="row" style="justify-content:space-between;gap:8px">
          <strong>${l(o.name)}</strong>
          <span class="chip">${r?"Unlocked":"Locked"}</span>
        </div>
        <p class="muted" style="margin:6px 0 0;font-size:12px">${l(o.blurb)}</p>
      </div>`}).join(""),a=(t.history||[]).length===0?'<p class="muted" style="margin:0">No actions yet — try a listen tick or join a club.</p>':`<ul class="list-plain">${(t.history||[]).slice(0,12).map(o=>`<li style="padding:8px 0;border-top:1px solid rgba(255,255,255,.06)">
            <div class="row" style="justify-content:space-between">
              <span><strong>+${o.points}</strong> · ${l(o.note||o.kind)}</span>
              <span class="muted" style="font-size:12px">${l(K(o.at))}</span>
            </div>
          </li>`).join("")}</ul>`,n=t.publicVisible?"Your badges & points can appear on your profile (demo flag).":"History & achievements are private — only you see them here.";return I("Loyalty Club",`
    <div class="pikk-loyalty-studio">
    <section class="pikk-loyalty-hero" aria-label="PIKK Loyalty rewards overview">
      <p class="kicker">PIKK REWARDS · RECOGNITION BEYOND SPENDING</p>
      <h2>Earn your place. <span>Get recognized.</span></h2>
      <p class="muted" style="margin:0 0 10px">Badges for listening, attending lives, and Fan Club participation — <strong>not purchase-only</strong>. Paid gifts are never the only loyalty signal. Anti-farming cooldowns + daily caps apply (TEST MODE).</p>
      <div class="pikk-loyalty-stats" aria-label="Your demo loyalty totals">
        <span class="pikk-loyalty-points">${t.points}</span>
        <span class="muted">points</span>
        <span class="chip">${(t.badges||[]).length} badges</span>
        <span class="chip">TEST MODE</span>
      </div>
      ${e?"":'<p class="chip" style="margin-top:10px">Sign in to earn · local demo</p>'}
      <div class="pikk-loyalty-hero-mark" aria-hidden="true">★</div>
    </section>

    <div class="card pikk-loyalty-panel pikk-loyalty-actions">
      <h3 style="margin:0 0 8px">Demo actions</h3>
      <p class="muted" style="margin:0 0 10px;font-size:12px">Healthy participation stubs — not a spend ladder.</p>
      <div class="row wrap" style="gap:8px">
        <button class="btn primary" id="loyListen">Listen tick · +5</button>
        <button class="btn" id="loyLive">Attend live stub · +8</button>
        <button class="btn" id="loyClub">Join a Fan Club · +10</button>
        <button class="btn" id="loyHelp">Helper tip · +6</button>
        <button class="btn ghost" id="loyReset">Reset demo</button>
      </div>
      <div class="row wrap" style="gap:8px;margin-top:12px">
        <a class="btn" href="#/music">Music</a>
        <a class="btn" href="#/live">Live</a>
        <a class="btn" href="#/fanclubs">Fan Clubs</a>
        <a class="btn" href="#/openmic">Open Mic</a>
      </div>
    </div>

    <div class="card pikk-loyalty-panel pikk-loyalty-privacy">
      <h3 style="margin:0 0 6px">Visibility</h3>
      <p class="muted" style="margin:0 0 10px;font-size:12px">${l(n)}</p>
      <label class="row" style="gap:8px;align-items:center;cursor:pointer">
        <input type="checkbox" id="loyPublic" ${t.publicVisible?"checked":""} />
        <span>Show badges publicly (demo)</span>
      </label>
    </div>

    <div class="card pikk-loyalty-panel pikk-loyalty-badges">
      <h3 style="margin:0 0 10px">Badges</h3>
      <div class="pikk-loyalty-badge-grid">${i}</div>
    </div>

    <div class="card pikk-loyalty-panel pikk-loyalty-activity">
      <h3 style="margin:0 0 8px">Recent activity</h3>
      ${a}
    </div>

    <div class="card pikk-loyalty-panel pikk-loyalty-roadmap">
      <h3 style="margin:0 0 6px">Admin-ish rollup · optional</h3>
      <p class="muted" style="margin:0;font-size:12px">Future Admin Fan Loyalty dashboard (plan § Live Gift Effects) can list tenure, attendance, and opted-in history. This page stays fan-facing; no purchase-only ranking.</p>
    </div>
    </div>
    `,{lead:"Recognition for healthy participation · DEMO.",badge:"Phase 2 demo"})}function fg(e){var t,s,i,a,n,o;(t=e.querySelector("#loyListen"))==null||t.addEventListener("click",()=>Ws("listen",5,"Authorized listening tick")),(s=e.querySelector("#loyLive"))==null||s.addEventListener("click",()=>Ws("live",8,"Attended live (stub)")),(i=e.querySelector("#loyHelp"))==null||i.addEventListener("click",()=>Ws("help",6,"Shared community helper tip")),(a=e.querySelector("#loyClub"))==null||a.addEventListener("click",()=>{ha(),Ke();const r=Vr(),c=r.find(d=>d.privacy==="public")||r[0];c&&Ur(c.id),Ws("club",10,c?`Joined ${c.name}`:"Joined Fan Club")}),(n=e.querySelector("#loyPublic"))==null||n.addEventListener("change",r=>{ha(),ip(r.target.checked),g(r.target.checked?"Public visibility on":"Achievements private"),ma()}),(o=e.querySelector("#loyReset"))==null||o.addEventListener("click",()=>{np(),g("Loyalty demo reset"),ma()})}function kt(){R("#/openmic")}function Zi(e="MicHopeful"){const{user:t}=M();if(t)return t;const s=zt(e);return g(`Signed in as ${e} · local demo`),s||M().user}function er(e){return`<span class="chip">${l(e==="approved"?"Approved":e==="rejected"?"Rejected":"Pending")}</span>`}function vg(){const e=lp(),t=e.chipLabel||"House rotation",s=e.embed?Xe(e.embed,"rel=0"):"";return`
    <div class="card sp-stage sp-house" id="omHouse" role="status">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center">
        <div class="chip">${l(t)}</div>
        <span class="chip">TEST MODE</span>
      </div>
      <p class="muted" style="margin:8px 0 0;font-size:12px">
        24/7 idle filler · DatBoiSkeet catalog when no live Open Mic performer · <strong>not a fake live act</strong> · original YouTube only
      </p>
      ${s?`<div class="sp-house-embed hero-video" style="margin-top:12px">
               <iframe src="${l(s)}" title="${l(e.title)}" allowfullscreen loading="lazy"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
             </div>`:""}
      <div class="sp-now">
        <div>
          <div class="sp-now-title">${l(e.title)}</div>
          <div class="sp-now-meta">${l(e.artist||"DatBoiSkeet")} · house catalog</div>
          <p class="muted sp-note">${l(e.note||"")}</p>
          ${e.youtube?`<p style="margin:8px 0 0"><a class="btn ghost" href="${l(e.youtube)}" target="_blank" rel="noopener">Open on YouTube</a></p>`:""}
        </div>
      </div>
      <div class="row wrap" style="gap:8px;margin-top:12px">
        <button class="btn" type="button" id="omNextHouse">Next house</button>
        <a class="btn ghost" href="#/spotlight">24/7 Spotlight</a>
      </div>
    </div>`}function bg(){Xt();const{user:e}=M(),t=se(),s=op(),i=e?oa().filter(d=>d.userId===e.id):[],a=t?oa({status:"pending"}):[],n=i.filter(d=>d.status==="pending").length,o=s.length===0?'<p class="muted" style="margin:0">No approved performers yet.</p>':s.map(d=>`<article class="card" style="margin:0 0 10px">
              <div class="row" style="justify-content:space-between;gap:8px">
                <div>
                  <strong>${l(d.trackTitle)}</strong>
                  <div class="muted" style="font-size:12px">@${l(d.username)} · ${l(d.talent)}</div>
                </div>
                ${er("approved")}
              </div>
              <p style="margin:8px 0 0">${l(d.profileNote||"Featured in PIKK Open Mic showcase.")}</p>
              <p class="muted" style="font-size:11px;margin:8px 0 0">Not a paid ranking · discovery showcase</p>
            </article>`).join(""),r=i.length===0?'<p class="muted" style="margin:0">You have no applications yet.</p>':`<ul class="list-plain">${i.map(d=>`<li style="padding:10px 0;border-top:1px solid rgba(255,255,255,.06)">
              <div class="row" style="justify-content:space-between">
                <strong>${l(d.trackTitle)}</strong>
                ${er(d.status)}
              </div>
              <div class="muted" style="font-size:12px">${l(d.talent)} · ${l(K(d.at))}</div>
            </li>`).join("")}</ul>`,c=t?`<div class="card">
         <h3 style="margin:0 0 8px">Admin review · TEST MODE</h3>
         <p class="muted" style="margin:0 0 10px;font-size:12px">Approve for showcase or reject. Distinct from pay-to-win.</p>
         ${a.length===0?'<p class="muted" style="margin:0">No pending applications.</p>':a.map(d=>`<div style="padding:10px 0;border-top:1px solid rgba(255,255,255,.06)">
                     <strong>${l(d.trackTitle)}</strong> · @${l(d.username)} · ${l(d.talent)}
                     <p class="muted" style="margin:4px 0;font-size:12px">${l(d.profileNote)}</p>
                     <p class="chip">Rights certified: ${d.rightsCertified?"yes":"no"}</p>
                     <div class="row wrap" style="gap:8px;margin-top:8px">
                       <button class="btn primary" data-om-approve="${l(d.id)}">Approve</button>
                       <button class="btn" data-om-reject="${l(d.id)}">Reject</button>
                     </div>
                   </div>`).join("")}
       </div>`:"";return I("Open Mic",`
    <div class="openmic-studio">
      <header class="openmic-hero">
        <p class="openmic-eyebrow">PIKK LIVE <span aria-hidden="true">◆</span> TALENT DISCOVERY</p>
        <h2>Your sound. <span>Your stage.</span></h2>
        <p>Apply for the Open Mic showcase, hear the original DatBoiSkeet house rotation and discover emerging performers.</p>
        <div class="openmic-hero-actions">
          <button type="button" class="btn primary" data-om-jump="omApplyCard">Apply to perform</button>
          <button type="button" class="btn ghost" data-om-jump="omShowcaseCard">Discover talent</button>
        </div>
        <p class="openmic-hero-note">TEST MODE · Local applications and review · No real live stream, uploads or paid placements</p>
      </header>
      <section class="openmic-stats" aria-label="Open Mic local demo overview">
        <div><span>Approved showcase</span><strong>${s.length}</strong><small>Demo performers</small></div>
        <div><span>Your applications</span><strong>${i.length}</strong><small>On this device</small></div>
        <div><span>Awaiting review</span><strong>${n}</strong><small>Your pending submissions</small></div>
      </section>
    ${vg()}

    <div class="card openmic-panel">
      <p class="kicker">§30 · 24/7 Live category · Talent Discovery</p>
      <h2 style="margin:0 0 6px">Open Mic &amp; Talent Discovery</h2>
      <p class="muted" style="margin:0 0 10px"><strong>24/7 Live category</strong> (like Spotlight) — not Social. Opt-in showcase for rappers, singers, DJs, producers. Submit music + profile, certify rights, apply for approval. Approved artists appear in the PIKK discovery showcase — <strong>not a paid ranking</strong>.</p>
      <nav class="live-cat-chips" aria-label="Live categories" style="margin:0 0 12px">
        <a class="live-cat-chip" href="#/live">Live</a>
        <a class="live-cat-chip on" href="#/openmic" aria-current="page">Open Mic / Talent Discovery (24/7)</a>
        <a class="live-cat-chip" href="#/spotlight">Spotlight (24/7)</a>
      </nav>
      <div class="row wrap" style="gap:8px">
        <a class="btn" href="#/spotlight">24/7 Spotlight</a>
        <a class="btn" href="#/live">Live</a>
        <a class="btn" href="#/music">Music</a>
        <a class="btn" href="#/fanclubs">Fan Clubs</a>
        <button class="btn ghost" id="omSeed">Reseed demos</button>
        <button class="btn ghost" id="omAdmin">${t?"Admin on":"Toggle demo admin"}</button>
      </div>
      <p class="chip" style="margin-top:10px">TEST MODE · no pay-to-win</p>
    </div>

    <div class="card openmic-panel" id="omApplyCard">
      <h3 style="margin:0 0 8px">Apply</h3>
      <form id="omForm">
        <label class="muted" style="font-size:12px">Talent</label>
        <select id="omTalent" style="width:100%;margin:4px 0 10px;background:#0e0e14;border:1px solid var(--line);border-radius:12px;padding:10px;color:inherit">
          <option value="rapper">Rapper</option>
          <option value="singer">Singer</option>
          <option value="dj">DJ</option>
          <option value="producer">Producer</option>
          <option value="other">Other</option>
        </select>
        <label class="muted" style="font-size:12px">Track / piece title</label>
        <input id="omTitle" required maxlength="80" placeholder="Song or freestyle title" style="width:100%;margin:4px 0 10px;background:#0e0e14;border:1px solid var(--line);border-radius:12px;padding:10px;color:inherit" />
        <label class="muted" style="font-size:12px">Profile note</label>
        <textarea id="omNote" maxlength="240" rows="2" placeholder="Who you are · what you want to share" style="width:100%;margin:4px 0 10px;background:#0e0e14;border:1px solid var(--line);border-radius:12px;padding:10px;color:inherit;resize:vertical"></textarea>
        <label class="row" style="gap:8px;align-items:flex-start;margin:0 0 12px;cursor:pointer">
          <input type="checkbox" id="omRights" required style="margin-top:3px" />
          <span style="font-size:13px">I certify I have the rights to submit this material and understand PIKK may moderate / feature approved work under promotional terms (demo).</span>
        </label>
        <button class="btn primary" type="submit">Submit application</button>
        ${e?"":'<button class="btn" type="button" id="omSignIn">Sign in demo</button>'}
      </form>
    </div>

    <div class="card openmic-panel">
      <h3 style="margin:0 0 8px">Your applications</h3>
      ${r}
    </div>

    ${c}

    <div class="card openmic-panel" id="omShowcaseCard">
      <h3 style="margin:0 0 8px">Approved showcase</h3>
      <p class="muted" style="margin:0 0 10px;font-size:12px">Featured performers · discovery, not spend rank</p>
      ${o}
    </div>
    </div>
    `,{lead:"24/7 house catalog when idle · opt-in talent showcase · DEMO.",badge:"Phase 2 demo"})}function yg(e){var t,s,i,a,n;e.querySelectorAll("[data-om-jump]").forEach(o=>{o.addEventListener("click",()=>{const r=o.getAttribute("data-om-jump"),c=r==="omApplyCard"||r==="omShowcaseCard"?e.querySelector("#"+r):null;c==null||c.scrollIntoView({behavior:"smooth",block:"start"})})}),(t=e.querySelector("#omSignIn"))==null||t.addEventListener("click",()=>{Zi(),kt()}),(s=e.querySelector("#omAdmin"))==null||s.addEventListener("click",()=>{Zi("DemoAdmin");const o=!se();Ts(o),g(o?"Demo admin on":"Demo admin off"),kt()}),(i=e.querySelector("#omSeed"))==null||i.addEventListener("click",()=>{Xt({force:!0}),g("Open Mic demos reseeded"),kt()}),(a=e.querySelector("#omForm"))==null||a.addEventListener("submit",o=>{var d,p,m,h;o.preventDefault(),Zi();const r=(d=e.querySelector("#omRights"))==null?void 0:d.checked,c=dp({talent:(p=e.querySelector("#omTalent"))==null?void 0:p.value,trackTitle:(m=e.querySelector("#omTitle"))==null?void 0:m.value,profileNote:(h=e.querySelector("#omNote"))==null?void 0:h.value,rightsCertified:!!r});if(c.error==="rights")return g("Rights certification required");if(c.error==="title")return g("Title required");if(c.error==="pending")return g("You already have a pending application");if(c.error)return g("Could not submit");g("Application submitted · pending review"),kt()}),e.querySelectorAll("[data-om-approve]").forEach(o=>{o.addEventListener("click",()=>{if(la(o.getAttribute("data-om-approve"),"approved").error==="admin")return g("Admin only");g("Approved · showcase"),kt()})}),e.querySelectorAll("[data-om-reject]").forEach(o=>{o.addEventListener("click",()=>{if(la(o.getAttribute("data-om-reject"),"rejected","Demo reject").error==="admin")return g("Admin only");g("Rejected"),kt()})}),(n=e.querySelector("#omNextHouse"))==null||n.addEventListener("click",()=>{const o=cp();g("Next house · "+(o.chipLabel||"House")),kt()})}let Me=null,Nt="all";try{const e=sessionStorage.getItem("dbs_shop_cat");e&&(Nt=e,sessionStorage.removeItem("dbs_shop_cat"));const t=sessionStorage.getItem("dbs_shop_preview");t&&(Me=t,sessionStorage.removeItem("dbs_shop_preview"))}catch{}function st(){R("#/profile-shop")}function at(e){return Qs.find(t=>t.id===e)||null}function sl(e){return go(e)}function kg(e){const t={...e.equipped},s=Me?at(Me):null;if(s){const i=sl(s);i&&(t[i]=s.id)}return t}function wg(e){return`rarity-${l(e||"rare")}`}function Sg(e){return`$${Number(e).toFixed(2)}`}function $g(e){const{user:t}=M(),s=kg(e),i=s.frame?at(s.frame):null,a=s.effect?at(s.effect):null,n=s.banner?at(s.banner):null,o=s.nameStyle?at(s.nameStyle):null,r=s.badge?at(s.badge):null,c=(t==null?void 0:t.username)||"DemoFan",d=e.reduceMotion,p=a?`shop-fx shop-fx--${l(a.id.replace(/^fx-/,""))}${d?" shop-fx--still":""}`:"",m=o?`shop-name shop-name--${l(o.id.replace(/^name-/,""))}`:"shop-name",h=i?`shop-avatar-frame shop-frame--${l(i.id.replace(/^frame-/,""))}`:"shop-avatar-frame";return`
    <div class="shop-preview card" id="shopPreview">
      <div class="row wrap" style="justify-content:space-between;gap:8px;margin-bottom:10px">
        <h3 style="margin:0">Live preview</h3>
        <span class="chip">CONCEPT</span>
      </div>
      <div class="${n?`shop-preview-banner shop-banner--${l(n.id.replace(/^ban-/,""))}`:"shop-preview-banner shop-banner--default"}" aria-hidden="true">
        <span class="shop-banner-emoji">${n?l(n.emoji):"🎧"}</span>
      </div>
      <div class="shop-preview-body ${p}">
        <div class="${h}">
          <div class="shop-avatar-inner">${l(c.slice(0,1).toUpperCase())}</div>
          ${i?`<span class="shop-frame-emoji" aria-hidden="true">${l(i.emoji)}</span>`:""}
        </div>
        <div class="shop-preview-meta">
          <div class="${m}">${l(c)}</div>
          <p class="muted small" style="margin:4px 0 0">Cosmetic preview only · not a status grant</p>
          ${r?`<span class="shop-cosmetic-badge" title="Cosmetic style — not Verified/Founder">${l(r.emoji)} ${l(r.name)}</span>`:'<span class="muted small">No cosmetic badge equipped</span>'}
        </div>
      </div>
      <div class="shop-equipped-row">
        ${["frame","effect","banner","nameStyle","badge"].map(v=>{const k=s[v],b=k?at(k):null,S=v==="nameStyle"?"Name":v.charAt(0).toUpperCase()+v.slice(1);return`<span class="shop-eq-chip ${b?"on":""}">${l(S)}: ${b?l(b.emoji+" "+b.name):"—"}</span>`}).join("")}
      </div>
    </div>`}function xg(e,t){const s=t.owned.includes(e.id),i=sl(e),a=i&&t.equipped[i]===e.id,n=Me===e.id;return`
    <article class="cosmetic-card ${wg(e.rarity)} ${n?"is-selected":""} ${s?"is-owned":""} ${a?"is-equipped":""}" data-id="${l(e.id)}">
      <div class="cosmetic-art" role="button" tabindex="0" data-preview="${l(e.id)}" aria-label="Preview ${l(e.name)}">
        <span class="cosmetic-emoji">${l(e.emoji)}</span>
        <span class="concept-flag">CONCEPT</span>
        ${s?'<span class="owned-flag">Owned</span>':""}
        ${a?'<span class="equipped-flag">Equipped</span>':""}
      </div>
      <div class="body">
        <div class="name">${l(e.name)}</div>
        <div class="meta">${l(e.category)} · ${l(e.rarity)}</div>
        <div class="price">${Sg(e.price)} <span class="chip" style="margin-left:4px">TEST MODE</span></div>
        <div class="cosmetic-actions row wrap" style="gap:6px;margin-top:8px">
          <button type="button" class="btn ghost shop-act" data-act="preview" data-id="${l(e.id)}">Preview</button>
          ${s?a?`<button type="button" class="btn shop-act" data-act="unequip" data-slot="${l(i)}" data-id="${l(e.id)}">Unequip</button>`:`<button type="button" class="btn primary shop-act" data-act="equip" data-id="${l(e.id)}">Equip</button>`:`<button type="button" class="btn primary shop-act" data-act="unlock" data-id="${l(e.id)}">Unlock · TEST MODE</button>`}
        </div>
      </div>
    </article>`}function Eg(){const e=nt(),t=Nt==="all"?Qs:Qs.filter(n=>n.category===Nt),s=bl.map(n=>`<button type="button" class="shop-chip ${Nt===n.id?"on":""}" data-cat="${l(n.id)}" aria-pressed="${Nt===n.id?"true":"false"}">${l(n.label)}</button>`).join(""),i=t.length===0?'<p class="muted">No cosmetics in this category.</p>':`<div class="cosmetic-grid">${t.map(n=>xg(n,e)).join("")}</div>`,a=`
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

    ${$g(e)}

    <div class="card">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center;margin-bottom:10px">
        <h3 style="margin:0">Catalog · ${Qs.length} items</h3>
        <div class="row wrap" style="gap:8px">
          <span class="chip">${e.owned.length} owned</span>
          <span class="chip">CONCEPT</span>
          <span class="chip">TEST MODE</span>
        </div>
      </div>
      <div class="shop-chips" role="tablist" aria-label="Cosmetic categories">${s}</div>
      <label class="shop-reduce row" style="gap:8px;align-items:center;margin:0 0 12px;cursor:pointer">
        <input type="checkbox" id="shopReduceMotion" ${e.reduceMotion?"checked":""} />
        <span>Reduce motion (effects)</span>
      </label>
      <div class="row wrap" style="gap:8px;margin-bottom:14px">
        <button type="button" class="btn" id="shopBundle">Unlock starter bundle · TEST MODE</button>
        <button type="button" class="btn ghost" id="shopReset">Reset demo inventory</button>
        <a class="btn" href="#/merch">Physical merch</a>
        <a class="btn" href="#/profile">Profile</a>
      </div>
      ${i}
    </div>
  `;return I("Profile Shop",a,{lead:"PIKK digital cosmetics · live preview · CONCEPT / TEST MODE.",badge:"Phase 2 · CONCEPT"})}function Ag(e){var s,i,a;e.querySelectorAll(".shop-chip").forEach(n=>{n.addEventListener("click",()=>{Nt=n.dataset.cat||"all",st()})}),(s=e.querySelector("#shopReduceMotion"))==null||s.addEventListener("change",n=>{yp(n.target.checked),g(n.target.checked?"Motion reduced":"Motion on"),st()}),(i=e.querySelector("#shopBundle"))==null||i.addEventListener("click",()=>{var o;const n=gp();g(`Starter bundle unlocked · ${((o=n.unlocked)==null?void 0:o.length)||0} items · no charge`),st()}),(a=e.querySelector("#shopReset"))==null||a.addEventListener("click",()=>{kp(),Me=null,g("Demo inventory reset"),st()});const t=n=>{Me=n,g("Preview updated"),st()};e.querySelectorAll("[data-preview]").forEach(n=>{n.addEventListener("click",()=>t(n.dataset.preview)),n.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),t(n.dataset.preview))})}),e.querySelectorAll(".shop-act").forEach(n=>{n.addEventListener("click",()=>{const o=n.dataset.act,r=n.dataset.id;if(o==="preview")return t(r);if(o==="unlock"){const c=hp(r);return c.error?g("Could not unlock"):(Me=r,g(c.already?"Already owned · TEST MODE":"Unlocked · TEST MODE · no charge"),st())}if(o==="equip"){const c=vp(r);return c.error==="not_owned"?g("Unlock first · TEST MODE"):c.error?g("Could not equip"):(Me=r,g("Equipped"),st())}if(o==="unequip"){const c=n.dataset.slot;if(bp(c).error)return g("Could not unequip");const p=Me?at(Me):null;return p&&go(p)===c&&(Me=null),g("Unequipped"),st()}})})}const Cg=["All","Hats","Shirts","Jackets"],Tg=["Ladies Shop","Men's Shop","Beauty & Hair","Fashion & Accessories","Lifestyle & Home","Creator Brands","Live Shopping","Deals"];function Dg(e,t="All",s=""){const i=String(s||"").trim().toLocaleLowerCase();return e.filter(a=>(t==="All"||a.category===t)&&(!i||`${a.name} ${a.category}`.toLocaleLowerCase().includes(i)))}function Mg(e,t="featured"){const s=[...e];return t==="price-asc"?s.sort((i,a)=>Number(i.price)-Number(a.price)):t==="price-desc"?s.sort((i,a)=>Number(a.price)-Number(i.price)):t==="name-asc"?s.sort((i,a)=>String(i.name).localeCompare(String(a.name))):s}function Lg(e){return`
    <article class="merch-card pikk-shop-product" data-product-id="${l(e.id)}">
      <div class="img-wrap">
        <img src="${l(e.image)}" alt="${l(e.name)}" loading="lazy" />
      </div>
      <div class="body">
        <span class="chip">${l(e.category)}</span>
        <h3 class="name">${l(e.name)}</h3>
        <p class="price">$ ${Number(e.price).toFixed(2)}</p>
        <a class="btn primary block" href="${l(e.shopUrl)}" target="_blank" rel="noopener noreferrer">
          Shop on Foreign X-Change ↗
        </a>
        <p class="merch-note">External merchant checkout. Confirm sizes, stock, shipping, taxes and returns on the merchant site.</p>
      </div>
    </article>`}function Ig(){const e=Cg.map(a=>`<button type="button" class="btn ${a==="All"?"primary":"ghost"} pikk-shop-filter"
      data-category="${l(a)}" aria-pressed="${a==="All"?"true":"false"}">${l(a)}</button>`).join(""),t=Tg.map(a=>`<li><span>${l(a)}</span><span class="chip">Coming Soon</span></li>`).join(""),i=[Ae.find(a=>a.id==="jacket-black")||Ae.find(a=>a.category==="Jackets"),Ae.find(a=>a.id==="hat-716-orange")||Ae.find(a=>a.category==="Hats"),Ae.find(a=>a.id==="tee-ptsd")||Ae.find(a=>a.category==="Shirts")].filter(Boolean).map(a=>'<a class="pikk-shop-featured-product" href="'+l(a.shopUrl)+'" target="_blank" rel="noopener noreferrer" aria-label="View '+l(a.name)+' on Foreign X-Change"><img src="'+l(a.image)+'" alt="'+l(a.name)+'" loading="eager" decoding="async" /><span>'+l(a.category)+"</span></a>").join("");return I("PIKK Shop",`
    <section class="pikk-shop-showcase pikk-shop-real-hero" aria-label="Featured Foreign X-Change merchandise">
      <div class="pikk-shop-showcase-copy">
        <p class="kicker">PIKK SHOP · FOREIGN X-CHANGE</p>
        <h2>Wear your story.<br/><span>Shop the culture.</span></h2>
        <p>Explore real Foreign X-Change jackets, hats and shirts. Your style, your PIKK.</p>
        <button type="button" class="btn primary" data-shop-scroll>Shop the collection</button>
        <small>External merchant checkout · No PIKK in-app payments</small>
      </div>
      <div class="pikk-shop-hero-gallery" aria-label="Featured product photography">${i}</div>
    </section>
    <nav class="pikk-shop-departments pikk-shop-category-nav" aria-label="Browse shopping categories">
      <button type="button" class="pikk-shop-category on" data-category="All" aria-pressed="true">Featured</button>
      <button type="button" class="pikk-shop-category" data-category="Jackets" aria-pressed="false">Jackets</button>
      <button type="button" class="pikk-shop-category" data-category="Shirts" aria-pressed="false">Shirts</button>
      <button type="button" class="pikk-shop-category" data-category="Hats" aria-pressed="false">Hats</button>
      <a href="#/profile-shop">Accessories · Preview</a>
    </nav>
    <section class="card pikk-shop-catalog" id="pikkShopCatalog" aria-label="Browse merchandise" style="scroll-margin-top:190px">
      <div class="pikk-shop-catalog-heading"><div><p class="kicker">THE COLLECTION</p><h3>Popular items</h3></div><span class="chip">Authentic Foreign X-Change</span></div>
      <label for="pikkShopSearch">Search merchandise</label>
      <input id="pikkShopSearch" type="search" placeholder="Search hats, shirts, jackets…" autocomplete="off" />
      <div class="row wrap" role="group" aria-label="Product category" style="gap:8px;margin-top:12px">
        ${e}
        <button type="button" class="btn ghost" id="pikkShopReset" style="display:none" hidden>Reset view</button>
      </div>
      <div class="pikk-shop-sort-row" style="display:flex;justify-content:flex-end;align-items:center;gap:10px;flex-wrap:wrap;margin-top:12px">
        <label for="pikkShopSort">Sort by</label>
        <select id="pikkShopSort" style="width:auto;min-width:190px;max-width:100%">
          <option value="featured">Featured order</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="name-asc">Name: A to Z</option>
        </select>
      </div>
      <p class="muted small" id="pikkShopCount" aria-live="polite">${Ae.length} items</p>
      <div class="merch-grid pikk-shop-premium-grid pikk-shop-real-grid" id="pikkShopProducts">${Ae.map(Lg).join("")}</div>
      <p class="muted" id="pikkShopEmpty" hidden>No matching merchandise. Try another search or category.</p>
    </section>
    <section class="card" aria-label="PIKK Shop information">
      <span class="chip">PIKK Shop · Phase 1 preview</span>
      <h2>Discover real merchandise</h2>
      <p>Browse existing Foreign X-Change items below. PIKK does not take payments, verify sellers or fulfill orders in this preview.</p>
      <p class="muted small">All purchases open Foreign X-Change. External orders are not subject to an automated PIKK commission.</p>
      <div class="row wrap" style="gap:8px">
        <a class="btn ghost" href="#/merch">Full Foreign X-Change showcase</a>
        <a class="btn ghost" href="#/marketplace">Sponsored offers · TEST MODE</a>
        <a class="btn ghost" href="#/profile-shop">Profile Shop · cosmetic preview</a>
      </div>
    </section>
    <section class="card" aria-label="Future PIKK Shop departments">
      <h3>More PIKK Shop departments</h3>
      <p class="muted small">These sections are planned, not active storefronts. No in-app checkout or seller verification is available yet.</p>
      <ul class="list-plain">${t}</ul>
    </section>
    <section class="card" aria-label="Shop safety and fees">
      <h3>Seller safety &amp; checkout</h3>
      <p class="muted">Future PIKK checkout requires verified seller onboarding, inventory checks, refunds, disputes and payment reconciliation before activation. The planned physical-goods platform fee is 7% of the applicable item subtotal, subject to final payment/legal review; it does not apply to Foreign X-Change offsite orders.</p>
      <p class="muted small">Affiliate enrollment, payable links, commissions and payouts remain disabled · Coming Soon.</p>
    </section>
  `,{lead:"Physical merchandise · external checkout · future verified storefronts"})}function Pg(e){var h;const t=e.querySelector("#pikkShopSearch"),s=[...e.querySelectorAll(".pikk-shop-product")],i=[...e.querySelectorAll(".pikk-shop-filter, .pikk-shop-category")],a=e.querySelector("#pikkShopCount"),n=e.querySelector("#pikkShopEmpty"),o=e.querySelector("#pikkShopReset"),r=e.querySelector("#pikkShopSort"),c=e.querySelector("#pikkShopProducts"),d=new Map(s.map(f=>[f.dataset.productId,f]));let p="All";function m(){const f=new Set(Dg(Ae,p,(t==null?void 0:t.value)||"").map(v=>v.id));for(const v of Mg(Ae,(r==null?void 0:r.value)||"featured")){const k=d.get(v.id);k&&(c==null||c.appendChild(k))}for(const v of s){const k=f.has(v.dataset.productId);v.hidden=!k,v.style.display=k?"":"none"}if(a&&(a.textContent=`${f.size} ${f.size===1?"item":"items"}`),n&&(n.hidden=f.size>0),o){const v=p!=="All"||!!(t!=null&&t.value.trim())||((r==null?void 0:r.value)||"featured")!=="featured";o.hidden=!v,o.style.display=v?"":"none"}for(const v of i){const k=v.dataset.category===p;v.setAttribute("aria-pressed",String(k)),v.classList.contains("pikk-shop-filter")&&(v.classList.toggle("primary",k),v.classList.toggle("ghost",!k)),v.classList.toggle("on",k)}}t==null||t.addEventListener("input",m),t==null||t.addEventListener("keydown",f=>{f.key!=="Escape"||!t.value||(f.preventDefault(),f.stopPropagation(),t.value="",m())}),r==null||r.addEventListener("change",m),o==null||o.addEventListener("click",()=>{p="All",t&&(t.value=""),r&&(r.value="featured"),m(),t==null||t.focus()}),(h=e.querySelector("[data-shop-scroll]"))==null||h.addEventListener("click",()=>{var f,v,k;t==null||t.focus({preventScroll:!0}),(k=e.querySelector("#pikkShopCatalog"))==null||k.scrollIntoView({behavior:(v=(f=window.matchMedia)==null?void 0:f.call(window,"(prefers-reduced-motion: reduce)"))!=null&&v.matches?"instant":"smooth",block:"start"})});for(const f of i)f.addEventListener("click",()=>{var v;p=f.dataset.category||"All",m(),f.classList.contains("pikk-shop-category")&&((v=e.querySelector("#pikkShopCatalog"))==null||v.scrollIntoView({behavior:"auto",block:"start"}))})}let ii=null;function oe(){R("#/spotlight")}function ea(){ii&&(clearInterval(ii),ii=null)}function il(e){const t=Math.max(0,Math.ceil(e/1e3)),s=Math.floor(t/60),i=t%60;return`${s}:${String(i).padStart(2,"0")}`}function Xa(e){return e==="freestyle"?"Live Freestyle":e==="beat"?"Beat":e==="music_video"?"Music Video":"Song"}function Og(e){const t=M().user;return!t||!e?!1:(t.following||[]).includes(e)}function Za(){return!!M().user}function _g(){return I("24/7 Spotlight",`<div class="card">
      <h3>Sign in required</h3>
      <p class="muted">Join the FIFO Spotlight queue, vote Keep Going / Play Another, and chat from a local demo account.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,{lead:"Continuous music showcase · votes ≠ paid advantage · TEST MODE"})}function qg(e){return`
    <div class="card sp-rules">
      <h3>How 24/7 Spotlight works</h3>
      <ul class="sp-rules-list">
        <li><strong>Always-on stage</strong> — FIFO queue. Current performer, next-up, and estimated wait are visible.</li>
        <li><strong>Join once</strong> — Song, Beat, Music Video, or Live Freestyle. One active queue spot per user.</li>
        <li><strong>Live Freestyle</strong> — ${Math.round((e.freestyleMs||6e4)/1e3)}s timer. Fans press <strong>Keep Going</strong> (threshold ${e.keepGoing}). Max ${e.maxExtensions} extensions · <strong>3 min total</strong>.</li>
        <li><strong>Uploaded Music</strong> — After End set, audience votes <strong>Play Another?</strong> (threshold ${e.playAnother}). Max <strong>${e.maxUploadStreak}</strong> in a row, then next in queue.</li>
        <li><strong>Votes extend stage time or pick the next track</strong> — they are <em>not</em> wagers, cash prizes, or paid voting advantage. Distinct from Gift Battles.</li>
        <li><strong>House catalog</strong> plays when the queue is empty — real DatBoiSkeet YouTube (Music Videos · Interviews · BTS/vlogs). Labeled <em>House · …</em> · never a fake live act · original source only.</li>
      </ul>
      <p class="muted" style="margin:10px 0 0">TEST MODE · no real uploads / WebRTC · background music pause wiring later.</p>
      <div class="row wrap" style="gap:8px;margin-top:10px">
        <a class="btn ghost" href="#/music">Music / Coming Soon</a>
        <a class="btn ghost" href="#/live">Live</a>
        <a class="btn ghost" href="#/giftbattles">Gift Battles</a>
        <a class="btn ghost" href="#/openmic">Open Mic</a>
      </div>
    </div>`}function Ng(e,{showSkip:t=!0}={}){const s=e.chipLabel||e.status||"House rotation",i=e.embed?Xe(e.embed,"rel=0"):"";return`
    <div class="card sp-stage sp-house" role="status">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center">
        <div class="chip">${l(s)}</div>
        <span class="chip">TEST MODE</span>
      </div>
      ${i?`<div class="sp-house-embed hero-video" style="margin-top:12px">
               <iframe src="${l(i)}" title="${l(e.title)}" allowfullscreen loading="lazy"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
             </div>`:""}
      <div class="sp-now">
        ${e.cover?`<img class="sp-cover" src="${l($t(e.cover))}" alt="" />`:""}
        <div>
          <div class="sp-now-title">${l(e.title)}</div>
          <div class="sp-now-meta">${l(e.artist||"DatBoiSkeet")} · house catalog</div>
          <p class="muted sp-note">${l(e.note||"Approved catalog filler · not a live act")}</p>
          ${e.youtube?`<p style="margin:8px 0 0"><a class="btn ghost" href="${l(e.youtube)}" target="_blank" rel="noopener">Open on YouTube</a></p>`:""}
        </div>
      </div>
      ${t&&Za()?`<div class="row wrap" style="gap:8px;margin-top:12px">
               <button class="btn" id="spSkipHouse">Skip house · next</button>
               <span class="muted" style="font-size:12px;align-self:center">Join queue takes the stage over house · Skip advances catalog</span>
             </div>`:""}
    </div>`}function Bg(e,t){if(!e||e.house){const v=e&&e.house?{id:e.id,title:e.title,artist:e.artist,embed:e.embed,youtube:e.youtube,chipLabel:e.chipLabel||"House · Music Video",note:e.note,cover:e.cover,kind:e.houseKind}:Kr();return Ng(v)}const s=M().user,i=e.type==="freestyle",a=i&&e.endsAt?Math.max(0,e.endsAt-Date.now()):null,n=Object.keys(e.keepGoingVotes||{}).length,o=Object.keys(e.playAnotherVotes||{}).length,r=e.userId,c=Og(r),d=s&&s.id===e.userId,p=e.reactions||{fire:0,heart:0,clap:0},m=i?`<div class="sp-timer" aria-live="polite">
         <div class="sp-timer-label">Freestyle timer · ext ${e.extensions||0}/${t.maxExtensions}</div>
         <div class="sp-timer-clock" id="spClock">${il(a||0)}</div>
         <div class="muted" style="font-size:12px">Keep Going ${n}/${t.keepGoing} · refresh recovers endsAt</div>
       </div>`:`<div class="sp-timer">
         <div class="sp-timer-label">Uploaded · play ${e.playCount||1}/${t.maxUploadStreak}</div>
         <div class="muted" style="font-size:12px">No real audio in TEST MODE · use End set when finished</div>
       </div>`,h=e.awaitingPlayAnother?`<div class="card sp-vote">
         <h3>Play Another?</h3>
         <p class="muted">Audience vote · ${o}/${t.playAnother} · window ends ${e.playAnotherDeadline?K(e.playAnotherDeadline):"soon"} (deadline-based)</p>
         <div class="row wrap" style="gap:8px">
           <button class="btn primary" id="spPlayAnother">Play Another</button>
           <button class="btn ghost" id="spSimPlayAnother">+2 fan votes (demo)</button>
         </div>
       </div>`:i?`<div class="card sp-vote">
           <h3>Keep Going</h3>
           <p class="muted">Votes extend stage time only — not paid advantage · ${n}/${t.keepGoing}</p>
           <div class="row wrap" style="gap:8px">
             <button class="btn primary" id="spKeepGoing" ${(e.extensions||0)>=t.maxExtensions?"disabled":""}>Keep Going</button>
             <button class="btn ghost" id="spSimKeepGoing" ${(e.extensions||0)>=t.maxExtensions?"disabled":""}>+2 fan votes (demo)</button>
           </div>
         </div>`:"",f=d?"":c?`<button class="btn ghost sp-follow" data-follow="${l(r)}" data-on="1">Following</button>`:`<button class="btn ghost sp-follow" data-follow="${l(r)}" data-on="0">Follow</button>`;return`
    <div class="card sp-stage">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center">
        <div class="chip">On stage · ${l(Xa(e.type))}</div>
        <span class="chip">TEST MODE</span>
      </div>
      <div class="sp-now">
        <div class="sp-avatar" aria-hidden="true">${l((e.username||"?").slice(0,2).toUpperCase())}</div>
        <div>
          <div class="sp-now-title">${l(e.title)}</div>
          <div class="sp-now-meta">${l(e.artist||e.username)} · ${l(e.username)}</div>
          <div class="row wrap sp-perf-actions" style="gap:8px;margin-top:8px">
            ${f}
            <a class="btn ghost" href="#/profile">Profile</a>
            <a class="btn ghost" href="#/music">Music</a>
            <a class="btn ghost" href="#/giftbattles">Gifts</a>
            <a class="btn ghost" href="#/live">Live</a>
          </div>
        </div>
      </div>
      ${m}
      <div class="row wrap sp-reacts" style="gap:8px;margin-top:10px">
        <button class="btn ghost sp-react" data-kind="fire">🔥 ${p.fire||0}</button>
        <button class="btn ghost sp-react" data-kind="heart">❤️ ${p.heart||0}</button>
        <button class="btn ghost sp-react" data-kind="clap">👏 ${p.clap||0}</button>
      </div>
    </div>
    ${h}`}function Rg(e,t,s){const i=r=>Math.max(1,(r+(t?1:0))*2),a=(e||[]).map((r,c)=>`
      <li class="sp-q-row">
        <div>
          <strong>${l(r.username)}</strong>
          <span class="muted"> · ${l(Xa(r.type))} · ${l(r.title)}</span>
          <div class="muted" style="font-size:12px">${c===0?"Next up":`#${c+1}`} · ~${i(c)} min wait (stub)</div>
        </div>
        <div class="row wrap" style="gap:6px">
          ${s&&r.userId===s.id?'<button class="btn ghost sp-leave-q">Leave</button>':""}
          ${Za()?`<button class="btn ghost sp-remove-q" data-qid="${l(r.id)}" title="Demo moderator">Remove</button>`:""}
        </div>
      </li>`).join(""),n=s&&(e||[]).some(r=>r.userId===s.id),o=s&&t&&!t.house&&t.userId===s.id;return`
    <div class="card sp-queue">
      <h3>FIFO queue</h3>
      <p class="muted" style="margin-top:0">${e.length?e.length+" waiting":"Queue empty — house catalog on stage"}${t&&!t.house?" · now: "+l(t.username):t&&t.house?" · house: "+l(t.chipLabel||"House"):""}</p>
      <ul class="sp-list">${a||'<li class="muted">No one waiting</li>'}</ul>
      ${n||o?`<p class="muted">You already have a spot (${o?"on stage":"in queue"}). One active spot per user.</p>
             ${n?'<button class="btn ghost" id="spLeaveQueue">Leave queue</button>':""}`:`<form id="spJoinForm" class="sp-join">
               <label class="field"><span>Type</span>
                 <select name="type" id="spType">
                   <option value="song">Song</option>
                   <option value="beat">Beat</option>
                   <option value="music_video">Music Video</option>
                   <option value="freestyle">Live Freestyle</option>
                 </select>
               </label>
               <label class="field"><span>Title</span>
                 <input name="title" id="spTitle" maxlength="80" placeholder="Track or freestyle label" />
               </label>
               <label class="field"><span>Artist</span>
                 <input name="artist" id="spArtist" maxlength="60" placeholder="${l((s==null?void 0:s.username)||"You")}" />
               </label>
               <p class="muted" style="font-size:12px">Upload processing is out of scope — demo joins with metadata only. Rights confirmation implied (TEST MODE).</p>
               <button class="btn primary" type="submit">Join queue</button>
             </form>`}
    </div>`}function jg(e){if(!Za())return"";const t=se()?"Admin":"Demo moderator · TEST MODE",s=e&&!e.house;return`
    <div class="card sp-mod">
      <h3>Moderator controls</h3>
      <p class="muted" style="margin-top:0"><span class="chip">${l(t)}</span> Skip / remove for safety · fair order otherwise. House Skip → next queue or next house.</p>
      <div class="row wrap" style="gap:8px">
        <button class="btn" id="spSkip" ${e?"":"disabled"}>Skip current</button>
        ${s&&e.type!=="freestyle"&&!e.awaitingPlayAnother?'<button class="btn ghost" id="spEndSet">End set</button>':""}
      </div>
    </div>`}function Kg(e){const t=M().user;return!e||e.house||e.type==="freestyle"||e.awaitingPlayAnother||!t||t.id!==e.userId?"":`
    <div class="card">
      <h3>Your set</h3>
      <p class="muted">No real audio file — tap End set when your demo track “finishes”.</p>
      <button class="btn primary" id="spEndSetSelf">End set</button>
    </div>`}function Fg(e){return!e||e.house?"":`
    <div class="card sp-chat-card">
      <h3>Stage chat</h3>
      <div class="sp-chat" id="spChat">${(e.chat||[]).slice(-20).map(s=>`<div class="sp-chat-row ${s.system?"system":""}"><strong>${l(s.username)}</strong>${l(s.text)}</div>`).join("")||'<div class="muted">No messages yet</div>'}</div>
      <form id="spChatForm" class="row" style="gap:8px;margin-top:8px">
        <input id="spChatInput" maxlength="200" placeholder="Say something…" style="flex:1" />
        <button class="btn primary" type="submit">Send</button>
      </form>
    </div>`}function Gg(e){return e.length?`
    <div class="card">
      <h3>Recent stage</h3>
      <ul class="sp-list">${e.slice(0,12).map(s=>`<li><strong>${l(s.username)}</strong> · ${l(Xa(s.type))} · ${l(s.title)}
         <span class="muted"> · ${l(s.reason||"ended")} · ${K(s.endedAt)}</span></li>`).join("")}</ul>
    </div>`:`
      <div class="card">
        <h3>Recent stage</h3>
        <p class="muted" style="margin:0">No completed turns yet.</p>
      </div>`}function Vg(){re();const e=M().user;if(!e)return _g();const t=ne(),s=bd(12);return I("24/7 Spotlight",`${qg(t.thresholds)}
     ${Bg(t.nowPlaying,t.thresholds)}
     ${Kg(t.nowPlaying)}
     ${jg(t.nowPlaying)}
     ${Rg(t.queue,t.nowPlaying,e)}
     ${Fg(t.nowPlaying)}
     ${Gg(s)}`,{lead:"Always-on music showcase · FIFO queue · votes ≠ wagers · TEST MODE"})}function Ug(e){var n,o,r,c,d,p,m,h,f,v,k;ea(),re();const s=ne().nowPlaying;if(s&&s.type==="freestyle"&&s.endsAt){const b=e.querySelector("#spClock");ii=setInterval(()=>{re();const S=ne().nowPlaying;if(!S||S.type!=="freestyle"||!S.endsAt){ea(),oe();return}const $=Math.max(0,S.endsAt-Date.now());b&&(b.textContent=il($)),$<=0&&(ea(),re(),oe())},250)}if(s&&s.awaitingPlayAnother&&s.playAnotherDeadline){const b=Math.max(0,s.playAnotherDeadline-Date.now())+50;setTimeout(()=>{re(),oe()},Math.min(b,35e3))}(n=e.querySelector("#spJoinForm"))==null||n.addEventListener("submit",b=>{var P,C,B;b.preventDefault();const S=((P=e.querySelector("#spType"))==null?void 0:P.value)||"song",$=((C=e.querySelector("#spTitle"))==null?void 0:C.value)||"",A=((B=e.querySelector("#spArtist"))==null?void 0:B.value)||"",w=ld({type:S,title:$,artist:A});if(w.error==="signin")return g("Sign in first");if(w.error==="already_queued")return g("You already have a queue/stage spot");g(S==="freestyle"?"Freestyle — you're up or in queue":"Joined Spotlight queue"),oe()}),(o=e.querySelector("#spLeaveQueue"))==null||o.addEventListener("click",()=>{if(vn().error)return g("Not in queue");g("Left queue"),oe()}),e.querySelectorAll(".sp-leave-q").forEach(b=>{b.addEventListener("click",()=>{vn(),g("Left queue"),oe()})}),e.querySelectorAll(".sp-remove-q").forEach(b=>{b.addEventListener("click",()=>{cd(b.getAttribute("data-qid")),g("Removed from queue (demo mod)"),oe()})});const i=()=>{ne().nowPlaying,dd();const b=ne().nowPlaying;b&&b.house?g("Next house · "+(b.chipLabel||"House")):g(b?"Skipped · "+(b.username||"next")+" on stage":"Skipped"),oe()};(r=e.querySelector("#spSkip"))==null||r.addEventListener("click",i),(c=e.querySelector("#spSkipHouse"))==null||c.addEventListener("click",i);const a=()=>{const b=pd();if(b.error==="max_streak"||b.ok){g(b.error==="max_streak"?"Max 3 in a row — advancing":"Play Another? vote open"),oe();return}b.error?g("Cannot end set: "+b.error):oe()};(d=e.querySelector("#spEndSet"))==null||d.addEventListener("click",a),(p=e.querySelector("#spEndSetSelf"))==null||p.addEventListener("click",a),(m=e.querySelector("#spKeepGoing"))==null||m.addEventListener("click",()=>{const b=ud();if(b.error==="already_voted")return g("Already voted");if(b.error==="max_extensions")return g("Max extensions reached");if(b.error)return g(b.error);g("Keep Going counted"),oe()}),(h=e.querySelector("#spSimKeepGoing"))==null||h.addEventListener("click",()=>{md(2),g("+2 simulated fan votes"),oe()}),(f=e.querySelector("#spPlayAnother"))==null||f.addEventListener("click",()=>{const b=hd();if(b.error==="already_voted")return g("Already voted");if(b.error)return g(b.error);g("Play Another vote counted"),oe()}),(v=e.querySelector("#spSimPlayAnother"))==null||v.addEventListener("click",()=>{gd(2),g("+2 simulated fan votes"),oe()}),e.querySelectorAll(".sp-follow").forEach(b=>{b.addEventListener("click",()=>{const S=b.getAttribute("data-follow");b.getAttribute("data-on")==="1"?(wi(S),g("Unfollowed")):(ki(S),g("Following")),oe()})}),e.querySelectorAll(".sp-react").forEach(b=>{b.addEventListener("click",()=>{fd(b.getAttribute("data-kind")||"fire"),oe()})}),(k=e.querySelector("#spChatForm"))==null||k.addEventListener("submit",b=>{b.preventDefault();const S=e.querySelector("#spChatInput"),$=vd((S==null?void 0:S.value)||"");if($.error!=="empty"){if($.error)return g($.error);S&&(S.value=""),oe()}})}const al="Not available — WebRTC + age assurance required before launch";function os(){R("#/connect")}function Hg(){var p;const e=ro(),s=dt().selected||[],i=Zd(),a=co(),n=Number(a==null?void 0:a.max)||0,o=!!i,r=e.map(m=>{const h=s.includes(m.id),f=m.connected?`<span class="chip">Linked${m.handle?" · "+l(m.handle):""}</span>`:'<span class="chip muted-chip">Not linked</span>';return`
      <div class="connect-mp-plat ${m.connected?"on":""}" data-plat="${l(m.id)}">
        <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center">
          <div>
            <strong>${l(m.label)}</strong>
            <div class="muted" style="font-size:12px">${l(m.hint||"")}</div>
          </div>
          ${f}
        </div>
        <div class="row wrap" style="gap:6px;margin-top:8px;align-items:center">
          ${m.connected?`<button type="button" class="btn ghost connect-mp-disconnect" data-id="${l(m.id)}">Unlink</button>
                 <label class="connect-mp-select">
                   <input type="checkbox" class="connect-mp-dest" data-id="${l(m.id)}" ${h?"checked":""} ${o?"disabled":""} />
                   Include
                 </label>`:`<button type="button" class="btn primary connect-mp-connect" data-id="${l(m.id)}">Link</button>`}
        </div>
      </div>`}).join(""),c=s.length,d=o?`<button type="button" class="btn danger" id="connectMpEnd">End multi-platform session</button>
       <span class="chip">LIVE · ${l(String(((p=i==null?void 0:i.destinations)==null?void 0:p.length)||c))} dest · TEST MODE</span>`:`<button type="button" class="btn primary" id="connectMpGoLive" ${c?"":"disabled"}>Go live to selected</button>
       <span class="chip">${c}/${n} selected · cap ${n}</span>`;return`
    <div class="card connect-multistream" id="connect-multistream">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:flex-start">
        <div>
          <h3 style="margin:0 0 6px">Multi-platform go-live</h3>
          <p class="muted" style="margin:0;max-width:40rem;font-size:13px">
            Link destinations and go live to more than one platform from PIKK.
            DEMO · TEST MODE · no real RTMP / OAuth relay yet. Platform account policies still apply.
          </p>
        </div>
        <span class="chip">TEST MODE</span>
      </div>
      <div class="connect-mp-grid" style="margin-top:12px">${r}</div>
      <div class="row wrap" style="margin-top:12px;gap:8px;align-items:center">
        ${d}
        <a class="btn ghost" href="#/live">Solo Live stage</a>
      </div>
      <p class="muted" style="margin:10px 0 0;font-size:12px">
        PIKK Connect combines random video discovery and multi-platform live controls in one place.
      </p>
    </div>`}function ga(){const e=po(),t=e.ageConfirmed&&e.rulesAccepted;return I("PIKK Connect",`<div class="connect-monkey" id="connectMonkey">
      <section class="pikk-connect-hero" aria-label="Find your community on PIKK">
        <div class="pikk-connect-hero-copy">
          <p class="kicker">PIKK CONNECT · PEOPLE &amp; COMMUNITIES</p>
          <h2>Real connections start here.</h2>
          <p>Find your people, join conversations, and explore the PIKK community. Real-time video matching remains unavailable until safety and infrastructure are ready.</p>
          <div class="pikk-connect-hero-actions">
            <a class="btn primary" href="#/communities">Explore communities</a>
            <a class="btn ghost" href="#/community">PIKK Lounge</a>
            <a class="btn ghost" href="#/messages">Messages</a>
          </div>
        </div>
        <div class="pikk-connect-hero-art" aria-hidden="true">
          <span class="pikk-connect-hero-person">♧</span>
          <span class="pikk-connect-hero-orbit orbit-one">✦</span>
          <span class="pikk-connect-hero-orbit orbit-two">◉</span>
          <span class="pikk-connect-hero-orbit orbit-three">✧</span>
        </div>
      </section>
      <nav class="pikk-connect-discover-nav" aria-label="Connect sections">
        <a href="#/communities"><span aria-hidden="true">♧</span> Communities</a>
        <a href="#/messages"><span aria-hidden="true">✉</span> Messages</a>
        <a href="#/connect#connect-random-chat"><span aria-hidden="true">◉</span> Random Chat</a>
        <a href="#/connect#connect-multistream"><span aria-hidden="true">▹</span> Broadcasting</a>
        <a href="#/dating"><span aria-hidden="true">♡</span> Dating</a>
      </nav>
      <section class="pikk-connect-feature-grid" aria-label="Discover ways to connect">
        <a class="pikk-connect-feature pikk-connect-feature-community" href="#/community">
          <span class="pikk-connect-feature-icon" aria-hidden="true">♧</span>
          <span class="pikk-connect-feature-copy"><strong>Communities</strong><small>Find groups and discussions</small></span>
          <span class="pikk-connect-feature-arrow" aria-hidden="true">↗</span>
        </a>
        <a class="pikk-connect-feature pikk-connect-feature-messages" href="#/messages">
          <span class="pikk-connect-feature-icon" aria-hidden="true">✉</span>
          <span class="pikk-connect-feature-copy"><strong>Messages</strong><small>Open your conversations</small></span>
          <span class="pikk-connect-feature-arrow" aria-hidden="true">↗</span>
        </a>
        <a class="pikk-connect-feature pikk-connect-feature-live" href="#/live">
          <span class="pikk-connect-feature-icon" aria-hidden="true">●</span>
          <span class="pikk-connect-feature-copy"><strong>PIKK Live</strong><small>Explore live creators · TEST MODE</small></span>
          <span class="pikk-connect-feature-arrow" aria-hidden="true">↗</span>
        </a>
      </section>
      <section class="card" aria-label="PIKK Connect experiences">
        <h2 style="margin:0 0 8px">Choose your connection</h2>
        <p class="muted small">One PIKK account, two separate experiences. Neither starts your camera automatically.</p>
        <div class="row wrap" style="gap:10px">
          <a class="btn primary" href="#/dating">♥ Dating · Swipe &amp; Match</a>
          <a class="btn ghost" href="#/connect#connect-random-chat">◉ Random Chat · 18+ TEST MODE</a>
        </div>
        <p class="muted small" style="margin:8px 0 0">Dating requires mutual interest. Random Chat is for spontaneous conversations, not automatic dating matches.</p>
      </section>
      <div id="connect-random-chat" class="connect-flag card">
        <p><span class="chip">TEST MODE</span> <span class="chip">Opt-in shell · no WebRTC</span> <span class="chip">18+</span></p>
        <p class="muted small" style="margin:6px 0 0">Monkey-style dual video discovery — PIKK branded. Admin can disable Connect anytime. Launch blocked until age assurance + moderation + WebRTC safety review.</p>
      </div>

      <div class="card connect-gates ${t?"ready":""}">
        <div class="connect-gates-row">
          <label class="connect-check"><input type="checkbox" id="connect-age" ${e.ageConfirmed?"checked":""}/> I confirm I am 18+</label>
          <label class="connect-check ${e.ageConfirmed?"":"connect-locked"}"><input type="checkbox" id="connect-rules" ${e.rulesAccepted?"checked":""} ${e.ageConfirmed?"":"disabled"}/> Consent &amp; community rules</label>
        </div>
        <ul class="connect-rules muted small">
          <li>Opt-in only — both people must consent to every connection.</li>
          <li>No nudity, sexual content, harassment, hate, or minors. Zero tolerance.</li>
          <li>Never share personal info; End, Report, or Block instantly.</li>
          <li>Sessions may be moderated; violations lead to bans.</li>
        </ul>
        <p class="muted small" style="margin:6px 0 0">Self-attestation is not enough for launch; real age assurance is required.</p>
      </div>

      <div class="connect-stage card">
        <div class="connect-tiles" aria-label="Match stage">
          <div class="connect-tile connect-tile-you">
            <div class="connect-tile-art" aria-hidden="true">
              <div class="connect-silhouette"></div>
            </div>
            <div class="connect-tile-label"><span class="chip">You</span> <span class="muted small">Camera off · demo</span></div>
          </div>
          <div class="connect-tile connect-tile-them" id="connectThem">
            <div class="connect-tile-art" aria-hidden="true">
              <div class="connect-silhouette them"></div>
              <div class="connect-pulse-ring" hidden id="connectPulse"></div>
            </div>
            <div class="connect-tile-label">
              <span class="chip">Them</span>
              <span class="muted small" id="connectThemStatus">No matching service · TEST MODE</span>
            </div>
          </div>
        </div>

        <div class="connect-actions">
          ${t?'<button class="btn primary connect-btn-start" id="connect-start">View launch requirements</button>':'<button class="btn primary connect-btn-start" disabled>Unavailable · review 18+ &amp; rules</button>'}
          <button class="btn primary connect-btn-next" disabled aria-label="Next (disabled)">Next</button>
          <button class="btn connect-btn-end" disabled aria-label="End (disabled)">End</button>
        </div>
        <div class="connect-controls" role="group" aria-label="Secondary controls (disabled)">
          <button class="btn ghost" disabled aria-label="Mute (disabled)">Mute</button>
          <button class="btn ghost" disabled aria-label="Camera (disabled)">Camera</button>
          <button class="btn ghost" disabled aria-label="Report (disabled)">Report</button>
          <button class="btn ghost" disabled aria-label="Block (disabled)">Block</button>
        </div>

        <div id="connect-blocked" class="connect-panel" hidden>
          <strong>${al}</strong>
          <p class="muted small">TEST MODE — this is a preview, not a real matching request. No match was created, no camera was requested, and no WebRTC connection was attempted.</p>
        </div>
        <p class="muted small" style="margin-top:10px">Controls are mockups until launch. Prefs save on this device.</p>
      </div>

      ${Hg()}

      <div class="card">
        <p class="muted" style="margin:0 0 8px">PIKK Connect <strong>does not replace</strong> Live, Messages, or Spotlight. Meanwhile:</p>
        <a class="btn" href="#/live">Live</a> <a class="btn" href="#/messages">Messages</a> <a class="btn" href="#/spotlight">Spotlight</a> <a class="btn ghost" href="#/shorts">Shorts / Clips</a>
      </div>
    </div>`,{lead:"1:1 discovery shell · multi-platform go-live · TEST MODE",badge:"Shell · no WebRTC"})}function zg(e){var t,s;e.querySelectorAll(".connect-mp-connect").forEach(i=>{i.addEventListener("click",()=>{const a=i.dataset.id,n=Hd(a,"");if(n!=null&&n.error)return g(String(n.error));g(`Linked ${a} · TEST MODE`),os()})}),e.querySelectorAll(".connect-mp-disconnect").forEach(i=>{i.addEventListener("click",()=>{zd(i.dataset.id),g("Unlinked · TEST MODE"),os()})}),e.querySelectorAll(".connect-mp-dest").forEach(i=>{i.addEventListener("change",()=>{Yd(i.dataset.id),os()})}),(t=e.querySelector("#connectMpGoLive"))==null||t.addEventListener("click",()=>{const i=Qd();if((i==null?void 0:i.error)==="signin")return g("Sign in first");if((i==null?void 0:i.error)==="none_selected")return g("Select at least one destination");if(i!=null&&i.error)return g(String(i.error));g("Multi-platform session started · TEST MODE"),os()}),(s=e.querySelector("#connectMpEnd"))==null||s.addEventListener("click",()=>{Xd(),g("Session ended"),os()})}function fa(e=document,t){var a,n,o;const s=()=>{if(typeof t=="function")return t();e.innerHTML=ga(),fa(e)};(a=e.querySelector("#connect-age"))==null||a.addEventListener("change",r=>{const c=r.target.checked;wn(c?{ageConfirmed:!0}:{ageConfirmed:!1,rulesAccepted:!1}),s()}),(n=e.querySelector("#connect-rules"))==null||n.addEventListener("change",r=>{wn({rulesAccepted:r.target.checked}),s()}),(o=e.querySelector("#connect-start"))==null||o.addEventListener("click",()=>{const r=e.querySelector("#connect-blocked");r==null||r.removeAttribute("hidden"),g(al)}),zg(e);const i=Fe().elementId;(i==="connect-random-chat"||i==="connect-multistream")&&requestAnimationFrame(()=>{var r,c,d,p;(p=e.querySelector(`#${i}`))==null||p.scrollIntoView({behavior:(d=(c=(r=globalThis.window)==null?void 0:r.matchMedia)==null?void 0:c.call(r,"(prefers-reduced-motion: reduce)"))!=null&&d.matches?"instant":"smooth",block:"start"})})}const nl="pikk_forum_local_v1",bs=[["music","Music & Artists","♫"],["business","Business & Money","$"],["relationships","Relationships","♡"],["gaming","Gaming","♜"],["sports","Sports","★"],["entertainment","Entertainment","▶"],["lifestyle","Lifestyle","✦"],["general","General Discussion","#"]],va=new Set(bs.map(e=>e[0])),ls=e=>String(e||"").trim();function cs(){try{const e=JSON.parse(localStorage.getItem(nl)||"{}");return{posts:Array.isArray(e.posts)?e.posts.filter(t=>t&&va.has(t.topic)).slice(-150):[],votes:e.votes&&typeof e.votes=="object"?e.votes:{},hidden:Array.isArray(e.hidden)?e.hidden:[]}}catch{return{posts:[],votes:{},hidden:[]}}}function Ys(e){try{return localStorage.setItem(nl,JSON.stringify(e)),!0}catch{return g("Local storage unavailable"),!1}}function Wg(e,t,s,i){let a=e.posts.filter(o=>!e.hidden.includes(o.id)&&(s==="all"||o.topic===s));const n=o=>Object.entries(e.votes).reduce((r,c)=>r+(c[0].startsWith(o.id+":")&&Number(c[1])||0),0);return a.sort((o,r)=>{var c,d;return i==="top"?n(r)-n(o):i==="discussed"?(((c=r.replies)==null?void 0:c.length)||0)-(((d=o.replies)==null?void 0:d.length)||0):r.when-o.when}),a.length?a.map(o=>{var p;const r=((p=bs.find(m=>m[0]===o.topic))==null?void 0:p[1])||"Community",c=Array.isArray(o.replies)?o.replies:[],d=Number(e.votes[o.id+":"+((t==null?void 0:t.id)||"guest")])||0;return'<article class="pikk-forum-post"><div class="pikk-forum-votes"><button data-fvote="1" data-id="'+l(o.id)+'" aria-label="Upvote" aria-pressed="'+(d===1)+'" '+(t?"":"disabled")+">▲</button><b>"+n(o)+'</b><button data-fvote="-1" data-id="'+l(o.id)+'" aria-label="Downvote" aria-pressed="'+(d===-1)+'" '+(t?"":"disabled")+'>▼</button></div><div class="pikk-forum-post-content"><p class="pikk-forum-meta">'+l(r)+" · u/"+l(o.author)+" · local preview</p><h3>"+l(o.title)+'</h3><p class="pikk-forum-text">'+l(o.body)+'</p><button class="pikk-forum-reply-button" data-fopen="'+l(o.id)+'" aria-expanded="false" aria-controls="pikk-forum-thread-'+l(o.id)+'">▤ '+c.length+" replies</button> "+(t&&t.id!==o.owner?'<button class="pikk-forum-reply-button" data-freport="'+l(o.id)+'">◇ Hide / report locally</button>':"")+'<div class="pikk-forum-thread" id="pikk-forum-thread-'+l(o.id)+'" data-thread="'+l(o.id)+'" hidden>'+c.map(m=>'<p class="pikk-forum-comment"><strong>'+l(m.author)+"</strong> "+l(m.body)+"</p>").join("")+(t?'<form data-freply="'+l(o.id)+'"><label>Reply</label><textarea maxlength="1000" required rows="2" placeholder="Join the discussion"></textarea><button class="btn primary" type="submit">Reply · local</button></form>':'<a href="#/profile" class="btn ghost">Sign in to reply</a>')+"</div></div></article>"}).join(""):'<div class="pikk-forum-empty">No discussions yet. Start the first conversation on this browser.</div>'}function Yg(){const e=M().user,t=bs.map(s=>'<button data-ftopic="'+s[0]+'" type="button" aria-pressed="false"><span>'+s[2]+"</span>"+l(s[1])+"</button>").join("");return I("PIKK Communities",'<section class="pikk-forum-hero"><p class="kicker">PIKK CONNECT · TOPICS & DISCUSSIONS</p><h2>Find your people. <span>Start the conversation.</span></h2><p>Explore communities around what matters to you. Discuss, upvote, reply and discover new ideas.</p><a class="btn ghost" href="#/community">PIKK Lounge</a> <a class="btn ghost" href="#/posts">Social Posts</a></section><p class="pikk-forum-warning"><b>TEST MODE:</b> These conversations and votes are saved only in this browser. No public posting, account verification or server-side moderation is active.</p><div id="pikkForum" class="pikk-forum-layout"><aside class="pikk-forum-sidebar"><h3>Explore topics</h3><button class="on" data-ftopic="all" aria-pressed="true">✦ All discussions</button>'+t+'</aside><main class="pikk-forum-center"><nav class="pikk-forum-sort" aria-label="Sort posts"><button class="on" data-fsort="new" aria-pressed="true">✦ New</button><button data-fsort="top" aria-pressed="false">▲ Top</button><button data-fsort="discussed" aria-pressed="false">▤ Discussed</button></nav><div class="pikk-forum-topic-board"><h3>Discover communities</h3><div class="pikk-forum-topic-cards">'+bs.map(s=>'<button data-ftopic="'+s[0]+'" aria-pressed="false"><span>'+s[2]+"</span><strong>"+l(s[1])+"</strong></button>").join("")+'</div></div><section class="pikk-forum-compose"><h3>Start a discussion</h3>'+(e?'<form id="pikkForumForm"><label for="pikkForumTopic">Community</label><select id="pikkForumTopic">'+bs.map(s=>'<option value="'+s[0]+'">'+l(s[1])+"</option>").join("")+'</select><label for="pikkForumTitle">Title</label><input id="pikkForumTitle" required maxlength="110" placeholder="What is on your mind?" /><label for="pikkForumBody">Discussion</label><textarea id="pikkForumBody" required maxlength="4000" rows="3" placeholder="Ask a question or share a thought..."></textarea><button class="btn primary" type="submit">Publish locally · TEST MODE</button></form>':'<p class="muted">Sign in with a PIKK demo account to write discussions and vote.</p><a href="#/profile" class="btn primary">Sign in</a>')+'</section><section><h3 class="pikk-forum-feed-title">Community discussions</h3><div id="pikkForumFeed"></div></section></main><aside class="pikk-forum-info"><h3>About PIKK Communities</h3><p>Topic-based discussion with an original PIKK look, separate from the live Lounge and social feed.</p><h3>Community safety</h3><p>Respect others. No harassment, hate, scams or personal information. Reports on this preview only hide posts on your device.</p><a href="#/guidelines">Community Guidelines</a></aside></div>',{lead:"Topic communities · discussions · voting · replies · local preview"})}function Jg(e){const t=e.querySelector("#pikkForum");if(!t)return;let s="all",i="new";const a=()=>M().user,n=t.querySelector("#pikkForumFeed"),o=()=>{n.innerHTML=Wg(cs(),a(),s,i)},r=new URLSearchParams(location.hash.split("?")[1]||"").get("topic");va.has(r)&&(s=r);function c(d,p,m){t.querySelectorAll(d).forEach(h=>{let f=h.dataset[p]===m;h.classList.toggle("on",f),h.setAttribute("aria-pressed",String(f))})}c("[data-ftopic]","ftopic",s),t.addEventListener("click",d=>{const p=d.target.closest("[data-ftopic]");if(p){s=p.dataset.ftopic,c("[data-ftopic]","ftopic",s);const k=t.querySelector("#pikkForumTopic");k&&s!=="all"&&(k.value=s),o();return}const m=d.target.closest("[data-fsort]");if(m){i=m.dataset.fsort,c("[data-fsort]","fsort",i),o();return}const h=d.target.closest("[data-fopen]");if(h){const k=t.querySelector('[data-thread="'+h.dataset.fopen+'"]');k&&(k.hidden=!k.hidden,h.setAttribute("aria-expanded",String(!k.hidden)));return}const f=d.target.closest("[data-fvote]");if(f&&a()){const k=cs(),b=f.dataset.id+":"+a().id,S=Number(f.dataset.fvote);k.votes[b]=k.votes[b]===S?0:S,Ys(k)&&o();return}const v=d.target.closest("[data-freport]");if(v&&a()){if(!confirm("Hide this post on this browser? This will NOT submit a report to a server."))return;const k=cs();k.hidden.push(v.dataset.freport),Ys(k)&&o(),g("Hidden locally only — no server report submitted")}}),t.addEventListener("submit",d=>{var m,h,f,v;const p=d.target;if(!(!(p instanceof HTMLFormElement)||!a())){if(d.preventDefault(),p.id==="pikkForumForm"){const k=ls((m=p.querySelector("input"))==null?void 0:m.value),b=ls((h=p.querySelector("textarea"))==null?void 0:h.value),S=(f=p.querySelector("select"))==null?void 0:f.value;if(!k||!b||!va.has(S))return;const $=cs();$.posts.push({id:"local-"+Date.now()+"-"+Math.random().toString(36).slice(2,8),owner:a().id,author:ls(a().username).slice(0,30)||"Member",title:k,body:b,topic:S,when:Date.now(),replies:[]}),Ys($)&&(s=S,c("[data-ftopic]","ftopic",s),p.reset(),o(),g("Saved only on this browser · TEST MODE"))}else if(p.dataset.freply){const k=ls((v=p.querySelector("textarea"))==null?void 0:v.value);if(!k)return;const b=cs(),S=b.posts.find($=>$.id===p.dataset.freply);if(!S)return;if(S.replies||(S.replies=[]),S.replies.push({author:ls(a().username).slice(0,30)||"Member",body:k}),Ys(b)){o();const $=t.querySelector('[data-thread="'+S.id+'"]');$&&($.hidden=!1),g("Reply saved locally")}}}}),o()}function Qg(){const e=le.filter(s=>(s.category||"")==="Music Videos"&&s.embed);return(e.length?e:le.filter(s=>s.embed)).slice(0,10).map((s,i)=>({id:`clip_${s.id}`,videoId:s.id,title:s.title,artist:s.artist||"DatBoiSkeet",embed:s.embed,youtube:s.youtube,blurb:i%3===0?"Clip cut · DEMO":i%3===1?"Highlight · DEMO":"Short · DEMO"}))}function Xg(e,t){return`
    <article class="shorts-card" data-clip-id="${l(e.id)}" id="shorts-card-${t}">
      <div class="shorts-stage">
        <div class="shorts-embed hero-video">
          <iframe
            src="${l(Xe(e.embed))}"
            title="${l(e.title)}"
            allowfullscreen
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
        <div class="shorts-meta">
          <span class="chip">${l(e.blurb)}</span>
          <span class="chip">TEST MODE</span>
          <h3 class="shorts-title">${l(e.title)}</h3>
          <p class="muted shorts-artist">@${l(e.artist)}</p>
          <div class="row wrap shorts-actions">
            <a class="btn ghost" href="${l(e.youtube)}" target="_blank" rel="noopener">Open on YouTube</a>
            <a class="btn ghost" href="#/videos">Full Videos</a>
            <a class="btn ghost" href="#/live">Live channels</a>
          </div>
        </div>
      </div>
    </article>`}function tr(){const e=Qg(),s=`
    <div class="card shorts-intro">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:flex-start">
        <div>
          <p class="muted" style="margin:0;max-width:40rem">
            Vertical short-form clips for people who do not want a full Live.
            Demo cards reuse official Music Video embeds from the catalog — not a separate clip CDN yet.
          </p>
        </div>
        <span class="chip">TEST MODE</span>
      </div>
      <div class="row wrap" style="margin-top:10px;gap:8px">
        <a class="btn primary" href="#/posts?compose=1&type=short">Post a Short</a>
        <a class="btn ghost" href="#/posts">← Posts</a>
        <a class="btn ghost" href="#/videos">Videos</a>
      </div>
    </div>
    <div class="shorts-feed" id="shortsFeed" aria-label="Shorts feed">
      ${e.map(Xg).join("")||'<p class="muted">No demo clips seeded.</p>'}
    </div>
    <p class="muted" style="margin:12px 0 0;font-size:12px;text-align:center">
      End of DEMO feed · ${e.length} clips · Scroll for more when real clip uploads ship
    </p>`;return I("Shorts / Clips",s,{lead:"Posts · short-form feed · Picture / Short / Video create on Posts · TEST MODE"})}function sr(e){qi(e),e.querySelectorAll(".shorts-card").forEach(t=>{t.addEventListener("focusin",()=>{t.classList.add("is-focus")})}),e.querySelector(".shorts-card")||g("No demo clips · add MVs in data.js")}const bi=[{id:"ny",name:"NY",tag:"East coast",still:"/blockwars-preview/preview-ny-still.jpg",fighter:"Brooklyn Brawler",blurb:"Street-pressured power from the five boroughs. Heavy combos, tight corners — TEST MODE teaser only."},{id:"la",name:"LA",tag:"West coast",still:"/blockwars-preview/preview-la-still.jpg",fighter:"Sunset Striker",blurb:"Flashy footwork under neon skies. Style meets speed — Coming Soon, not a real match engine."},{id:"chi",name:"Chicago",tag:"Midwest",still:"/blockwars-preview/preview-chi-still.jpg",fighter:"Windy City Wall",blurb:"Defense-first grit from the lakefront. Hold the block — lobby demo only, no live fights yet."}];function Zg(e){return bi.map(t=>{const s=t.id===e?" is-active":"",i=t.id===e?"true":"false";return`<button type="button" class="bw-city-card${s}" data-city="${l(t.id)}" aria-pressed="${i}" aria-label="${l(t.name)} fighter"><img src="${l(t.still)}" alt="" width="120" height="160" loading="lazy" decoding="async" /><span class="bw-city-meta"><span class="bw-city-name">${l(t.name)}</span><span class="bw-city-tag">${l(t.tag)}</span></span></button>`}).join("")}function ef(e){return`<div class="bw-focus" id="bwFocus" data-city="${l(e.id)}"><div class="bw-focus-still"><img id="bwFocusImg" src="${l(e.still)}" alt="${l(e.fighter)}" width="110" height="140" /></div><div class="bw-focus-copy"><p class="bw-focus-city">${l(e.name)} · ${l(e.tag)}</p><h3 id="bwFocusName">${l(e.fighter)}</h3><p id="bwFocusBlurb">${l(e.blurb)}</p></div></div>`}function tf(){const e=bi[0],t=`
    <div class="card bw-preview bw-lobby" id="bw-coming-soon">
      <div class="bw-lobby-head bw-preview-head">
        <div>
          <p class="kicker" style="margin:0">Games · Lobby demo</p>
          <h2 class="bw-lobby-title bw-preview-title" style="margin:4px 0 0">Block Wars</h2>
        </div>
        <span class="badge-cs" id="bw-coming-soon-badge">Coming Soon</span>
      </div>
      <p class="muted bw-preview-lead">Pick a city fighter below — teaser lobby only. Full gameplay is <strong>not</strong> shipping yet.</p>

      <div class="bw-city-grid" id="bwCityGrid" role="group" aria-label="City fighters">
        ${Zg(e.id)}
      </div>

      ${ef(e)}

      <button type="button" class="btn primary bw-arena-cta" id="bwEnterArena">
        Enter arena · Coming Soon
      </button>
      <p class="chip" style="margin-top:10px">TEST MODE · lobby select only · not a playable game</p>
    </div>

    <div class="card bw-preview" id="bw-preview-video-card">
      <div class="bw-preview-head">
        <div>
          <p class="kicker" style="margin:0">Fighter preview</p>
          <h3 class="bw-preview-title" style="margin:4px 0 0;font-size:18px">Watch the teaser</h3>
        </div>
        <span class="chip bw-preview-chip">~12s</span>
      </div>
      <div class="bw-preview-frame">
        <video
          id="bwCsVideo"
          class="bw-preview-video"
          poster="/blockwars-preview/frames/01.jpg"
          src="/blockwars-preview/blockwars-fighters-preview.mp4"
          playsinline
          webkit-playsinline
          preload="metadata"
          controls
          controlslist="nodownload noplaybackrate"
          aria-label="Block Wars fighter preview"></video>
        <button type="button" class="bw-preview-play" id="bwCsPlay" aria-label="Play Block Wars preview">
          <span class="bw-preview-play-icon" aria-hidden="true">▶</span>
          <span class="bw-preview-play-label">Watch preview</span>
        </button>
      </div>
      <div class="bw-preview-foot muted">NY · LA · Chicago slideshow · tap play · Coming soon on DBS</div>
    </div>

    <div class="card">
      <h3 style="margin:0 0 8px">What’s coming</h3>
      <ul class="muted" style="margin:0;padding-left:1.2em;line-height:1.55">
        <li>City fighter matchups (NY · LA · Chicago)</li>
        <li>DatBoiSkeet-branded Block Wars arena</li>
        <li>Full gameplay &amp; character art — <strong>paused</strong> (lobby + preview assets only for now)</li>
      </ul>
      <div class="row wrap" style="gap:8px;margin-top:12px">
        <a class="btn ghost" href="#/home">Back to Home</a>
      </div>
    </div>`;return I("Block Wars",t,{lead:"Coming Soon · lobby fighter select · preview video · not playable yet."})}function sf(e,t){const s=bi.find(c=>c.id===t)||bi[0];e.querySelectorAll(".bw-city-card").forEach(c=>{const d=c.getAttribute("data-city")===s.id;c.classList.toggle("is-active",d),c.setAttribute("aria-pressed",d?"true":"false")});const i=e.querySelector("#bwFocus"),a=e.querySelector("#bwFocusImg"),n=e.querySelector("#bwFocusName"),o=e.querySelector("#bwFocusBlurb"),r=e.querySelector(".bw-focus-city");i&&i.setAttribute("data-city",s.id),a&&(a.src=s.still,a.alt=s.fighter),n&&(n.textContent=s.fighter),o&&(o.textContent=s.blurb),r&&(r.textContent=`${s.name} · ${s.tag}`)}function af(e){var a,n;(a=e.querySelector("#bwCityGrid"))==null||a.addEventListener("click",o=>{const r=o.target.closest(".bw-city-card");r&&(o.preventDefault(),sf(e,r.getAttribute("data-city")))}),(n=e.querySelector("#bwEnterArena"))==null||n.addEventListener("click",o=>{o.preventDefault(),g("Block Wars arena is Coming Soon — lobby demo only. No match engine yet.")});const t=e.querySelector("#bwCsVideo"),s=e.querySelector("#bwCsPlay");if(!t)return;const i=()=>{if(!s)return;const o=t.paused||t.ended;s.hidden=!o,s.setAttribute("aria-hidden",o?"false":"true")};s==null||s.addEventListener("click",o=>{o.preventDefault(),t.play().catch(()=>{})}),t.addEventListener("play",()=>{Vt(),i()}),t.addEventListener("pause",()=>{Ze(),i()}),t.addEventListener("ended",()=>{Ze(),i()}),t.addEventListener("pointerdown",()=>{t.paused||Vt()}),i()}function nf(){return I("PIKK Arcade",`
    <section class="pikk-arcade-intro card" aria-label="PIKK Arcade">
      <div class="pikk-arcade-heading">
        <div>
          <p class="kicker">Play · Compete · Hang out</p>
          <div class="pikk-arcade-brand"><img src="${l(ys({artwork:"/brand/pikk-official-approved.jpg"}))}" alt="PIKK" loading="eager" decoding="async"/><span>ARCADE</span></div>
          <p>15 original game concepts. Find your favorites, see the art, and follow their development.</p>
        </div>
        <span class="pikk-arcade-icon" aria-hidden="true">🎮</span>
      </div>
      <p class="pikk-arcade-disclosure">ALL GAMES COMING SOON · Gallery previews, not playable releases. Play Chips have no cash value or cash-out.</p>
    </section>
    <div class="pikk-arcade-toolbar"><strong>15 upcoming games</strong><span>PLAY • COMPETE • HANG OUT</span></div>
    <div class="pikk-arcade-grid">
      ${Ft.map((e,t)=>`
        <article class="pikk-arcade-card pikk-game-${l(e.theme)}">
          <div class="pikk-arcade-card-header"><span class="pikk-arcade-number">${t+1}</span><h3>${l(e.name)}</h3></div>
          <div class="pikk-arcade-art" aria-label="${l(e.name)} preview artwork">
            ${e.artwork?`<img src="${l(ys(e))}" alt="${l(e.name)} concept artwork" loading="lazy" decoding="async"/>`:`<span class="pikk-arcade-symbol" aria-hidden="true">${e.icon}</span>`}
          </div>
          <div class="pikk-arcade-copy">
            <span class="pikk-arcade-players">♙ ${l(e.players)} ${e.players==="1"?"Player":"Players"}</span>
            <p>${l(e.description)}</p>
            <button type="button" class="pikk-arcade-view" data-game-preview="${t}" aria-label="View ${l(e.name)} concept artwork full size">View artwork <span aria-hidden="true">↗</span></button>
            ${e.href?`<a class="pikk-arcade-action" href="${l(e.href)}">View preview →</a>`:`<span class="pikk-arcade-action" aria-label="${l(e.name)} coming soon">Coming Soon</span>`}
          </div>
        </article>`).join("")}
    </div>
    <dialog id="pikkArcadeLightbox" class="pikk-arcade-lightbox" aria-labelledby="pikkArcadePreviewTitle" aria-describedby="pikkArcadePreviewDescription">
      <div class="pikk-arcade-lightbox-panel">
        <div class="pikk-arcade-lightbox-top">
          <span class="pikk-arcade-lightbox-kicker">PIKK ARCADE <span aria-hidden="true">·</span> CONCEPT ART <span data-arcade-counter>01 / 15</span></span>
          <button type="button" class="pikk-arcade-lightbox-close" data-arcade-close aria-label="Close artwork preview">×</button>
        </div>
        <div class="pikk-arcade-lightbox-art"><img data-arcade-full-image alt="" decoding="async"/></div>
        <div class="pikk-arcade-lightbox-bottom">
          <div class="pikk-arcade-lightbox-description">
            <h2 id="pikkArcadePreviewTitle" data-arcade-title>Block Wars</h2>
            <p id="pikkArcadePreviewDescription" data-arcade-description>City-based fighters, combos and special moves.</p>
            <span data-arcade-players>1–2 Players · Preview only</span>
          </div>
          <div class="pikk-arcade-lightbox-controls" aria-label="Browse game artwork">
            <button type="button" data-arcade-prev aria-label="Previous game artwork">←</button>
            <button type="button" data-arcade-next aria-label="Next game artwork">→</button>
          </div>
        </div>
        <p class="pikk-arcade-lightbox-note">Original concept artwork · Games are not playable yet</p>
      </div>
    </dialog>
    <p class="muted pikk-arcade-footnote">All 15 owner-supplied concept images are now displayed. Select View artwork to see each one full size. Game concepts and final artwork may evolve; no gambling or real-money prizes are available.</p>
  `,{lead:"Fifteen upcoming games · mobile-first catalog · previews only"})}function rf(e){const t=Ft.length,s=(Math.trunc(Number(e)||0)%t+t)%t,i=Ft[s];return{index:s,total:t,title:i.name,description:i.description,players:i.players,image:ys(i)}}function of(e){const t=e.querySelector(".pikk-arcade-grid"),s=e.querySelector("#pikkArcadeLightbox");if(!t||!s||typeof s.showModal!="function")return;let i=0,a=null;const n=s.querySelector("[data-arcade-full-image]"),o=s.querySelector("[data-arcade-title]"),r=s.querySelector("[data-arcade-description]"),c=s.querySelector("[data-arcade-players]"),d=s.querySelector("[data-arcade-counter]"),p=m=>{const h=rf(m);i=h.index,n.src=h.image,n.alt=h.title+" concept artwork",o.textContent=h.title,r.textContent=h.description,c.textContent=h.players+(h.players==="1"?" Player · Preview only":" Players · Preview only"),d.textContent=String(i+1).padStart(2,"0")+" / "+h.total};t.addEventListener("click",m=>{const h=m.target.closest("[data-game-preview]");h&&(a=h,p(h.dataset.gamePreview),s.showModal())}),s.addEventListener("click",m=>{m.target===s||m.target.closest("[data-arcade-close]")?s.close():m.target.closest("[data-arcade-prev]")?p(i-1):m.target.closest("[data-arcade-next]")&&p(i+1)}),s.addEventListener("keydown",m=>{(m.key==="ArrowLeft"||m.key==="ArrowRight")&&(m.preventDefault(),p(i+(m.key==="ArrowRight"?1:-1)))}),s.addEventListener("close",()=>{a!=null&&a.isConnected&&a.focus()})}function lf(){return I("PIKK Dating & Connections",`
    <section class="pikk-dating-hero" id="dating-discover" tabindex="-1" aria-label="PIKK Dating prelaunch">
      <div class="pikk-dating-hero-copy">
        <span class="chip">18+ · Pre-launch</span>
        <p class="kicker">PIKK DATING · FIND YOUR CONNECTION</p>
        <h2>Find your vibe. <span>Make it mutual.</span></h2>
        <p>Explore connections through mutual interest, shared communities and conversations when our real adult eligibility and safety services are ready.</p>
        <div class="pikk-dating-hero-actions">
          <a class="btn primary" href="#/community">Explore communities</a>
          <a class="btn ghost" href="#/profile">Your profile</a>
        </div>
        <small>No real matches are being created here · TEST MODE</small>
      </div>
      <div class="pikk-dating-symbol" aria-hidden="true">♡</div>
    </section>
    <nav class="pikk-dating-tabs" aria-label="Dating experience sections">
      <button type="button" data-dating-jump="dating-discover" class="is-active" aria-pressed="true">Discover</button>
      <button type="button" data-dating-jump="dating-experiences" aria-pressed="false">Experiences</button>
      <button type="button" data-dating-jump="dating-live" aria-pressed="false">Dating Live</button>
      <button type="button" data-dating-jump="dating-safety" aria-pressed="false">Safety</button>
    </nav>
    <section class="pikk-dating-experience-grid" id="dating-experiences" tabindex="-1" aria-label="Ways to connect">
      <a class="pikk-dating-experience" href="#/community"><span aria-hidden="true">♧</span><strong>Meet through interests</strong><small>Community discovery</small></a>
      <a class="pikk-dating-experience" href="#/connect#connect-random-chat"><span aria-hidden="true">◉</span><strong>Random Chat</strong><small>Separate from dating · Preview</small></a>
      <a class="pikk-dating-experience" href="#/messages"><span aria-hidden="true">✉</span><strong>Messages</strong><small>Your existing inbox</small></a>
    </section>
    <div class="card pikk-dating-panel pikk-dating-match">
      <span class="pikk-dating-panel-tag">MATCHMAKING · PLANNED</span>
      <span class="chip">18+ · Pre-launch</span>
      <h2>PIKK Match</h2>
      <p>Meet people through opt-in dating, mutual matches, dating live rooms and speed introductions when verified safety systems are ready.</p>
      <p class="muted">Swipe & Match, private dating profiles, mutual-match chat and speed dating are in development. No real matches are being created here.</p>
    </div>
    <div class="card pikk-dating-panel pikk-dating-choices">
      <span class="pikk-dating-panel-tag">YOUR CONNECTIONS</span>
      <h3>Choose your experience</h3>
      <p class="muted">Dating is for romantic mutual matches. Random Chat is for spontaneous conversations and friendships. These are separate opt-in experiences.</p>
      <div class="row wrap" style="gap:8px">
        <a class="btn primary" href="#/dating" aria-current="page">Dating · current section</a>
        <a class="btn ghost" href="#/connect#connect-random-chat">Random Chat · 18+ TEST MODE</a>
      </div>
      <p class="muted small">Random Chat never automatically creates a dating match. No camera is started when you open either page.</p>
    </div>
    <div class="card pikk-dating-panel pikk-dating-live" id="dating-live" tabindex="-1">
      <span class="pikk-dating-panel-tag">LIVE CONNECTIONS · PREVIEW</span>
      <h3>Dating Live & Connections</h3>
      <p class="muted">Browse the existing Live area. Live sessions are currently a test-mode experience; gifts never buy consent or a match.</p>
      <a class="btn primary" href="#/live">Open Live</a>
      <a class="btn ghost" href="#/connect">PIKK Connect · test mode</a>
    </div>
    <div class="card pikk-dating-panel pikk-dating-safety" id="dating-safety" tabindex="-1">
      <span class="pikk-dating-panel-tag">YOUR SAFETY FIRST</span>
      <h3>Privacy & safety</h3>
      <p class="muted">Dating will require verified adult eligibility, explicit profile opt-in, private mutual consent, blocking, reporting and account deletion before launch. Camera and microphone permissions are never requested on this page.</p>
    </div>
  `,{lead:"Dating · mutual matches · live connections"})}function cf(e){const t=new Set(["dating-discover","dating-experiences","dating-live","dating-safety"]),s=[...e.querySelectorAll("[data-dating-jump]")];function i(n,o=!1){if(!t.has(n))return;const r=e.querySelector("#"+n);if(r&&(s.forEach(c=>{const d=c.dataset.datingJump===n;c.classList.toggle("is-active",d),c.setAttribute("aria-pressed",String(d))}),o)){const c=window.matchMedia("(prefers-reduced-motion: reduce)").matches;r.scrollIntoView({behavior:c?"auto":"smooth",block:"start"}),r.focus({preventScroll:!0})}}s.forEach(n=>n.addEventListener("click",()=>i(n.dataset.datingJump,!0)));const a=Fe().elementId;t.has(a)&&window.setTimeout(()=>{e.querySelector("#"+a)&&i(a,!0)},80)}const rl=60,df=10,pf=10,ir=3;function uf(){return{phase:"round",round:1,seconds:rl,votes:[0,0],scores:[0,0],roundWinners:[],gifts:[0,0],rematchVotes:[0,0],winner:null,tieBreaker:!1}}function mf(e,t){if(e.phase!=="vote"||![0,1].includes(t))return e;const s=[...e.votes];return s[t]+=1,{...e,votes:s}}function hf(e,t){if(e.phase!=="rematch")return e;const s=[...e.rematchVotes];return s[t?0:1]+=1,{...e,rematchVotes:s}}function gf(e){if(!["round","vote","rematch"].includes(e.phase))return e;if(e.seconds>1)return{...e,seconds:e.seconds-1};if(e.phase==="round")return{...e,phase:"vote",seconds:df,votes:[0,0],voted:!1};if(e.phase==="vote"){const t=e.votes[0]===e.votes[1]?null:e.votes[0]>e.votes[1]?0:1,s=[...e.scores];t!==null&&(s[t]+=1);const i=[...e.roundWinners,t];return e.round>=ir&&s[0]!==s[1]?{...e,scores:s,roundWinners:i,winner:s[0]>s[1]?0:1,phase:"rematch",seconds:pf,rematchVoted:!1}:{...e,scores:s,roundWinners:i,phase:"round",round:e.round+1,seconds:rl,votes:[0,0],voted:!1,tieBreaker:e.round>=ir}}return{...e,phase:"finished",seconds:0}}let z=null,De=null;function Js(){const e=document.getElementById("roast-demo");if(!e||!z){De&&clearInterval(De),De=null;return}const t=z.phase,s=t==="round"?`Round ${z.round}${z.tieBreaker?" · Final tiebreaker":""}`:t==="vote"?"Vote for the round winner":t==="rematch"?"Run It Back?":"Match finished";e.innerHTML=`<h3>${s}</h3><p><strong>${String(Math.floor(z.seconds/60)).padStart(2,"0")}:${String(z.seconds%60).padStart(2,"0")}</strong></p><p>Contestant A: ${z.scores[0]} rounds · Contestant B: ${z.scores[1]} rounds</p>${t==="vote"?'<button type="button" data-roast-vote="0">Vote A</button> <button type="button" data-roast-vote="1">Vote B</button>':""}${t==="rematch"?`<p>Winner: Contestant ${z.winner===0?"A":"B"}</p><button type="button" data-roast-rematch="yes">Run It Back? Yes</button> <button type="button" data-roast-rematch="no">No</button>`:""}<p class="muted">Local interactive simulation only. Votes are not shared between viewers. No live video or gifts are connected.</p>`}function ff(){De&&clearInterval(De),De=null,z=null;const e=document.getElementById("roast-start");e&&(e.addEventListener("click",()=>{z=uf(),Js(),De&&clearInterval(De),De=setInterval(()=>{z=gf(z),Js(),z.phase==="finished"&&(clearInterval(De),De=null)},1e3)}),document.getElementById("roast-demo").addEventListener("click",t=>{const s=t.target.closest("[data-roast-vote]"),i=t.target.closest("[data-roast-rematch]");s&&z&&z.phase==="vote"&&!z.voted&&(z={...mf(z,Number(s.dataset.roastVote)),voted:!0},Js()),i&&z&&z.phase==="rematch"&&!z.rematchVoted&&(z={...hf(z,i.dataset.roastRematch==="yes"),rematchVoted:!0},Js())}))}function vf(){return I("PIKK Roast Arena",`
    <div class="card">
      <span class="chip">Comedy & Roast Battles · Coming Soon</span>
      <h2>PIKK Roast Arena</h2>
      <p>Step into live roast battles, trade jokes, and watch comedians go head-to-head. Join the audience, vote for your favorite, or request your turn on the mic.</p>
      <p class="muted">Live battles, voting, gifts and matchmaking are in development. No active battle or vote is represented on this page.</p>
      <a class="btn primary" href="#/live?tab=categories">Explore Live Categories</a>
    </div>
    <div class="card">
      <h3>Battle formats</h3>
      <div class="row wrap"><span class="chip">1 vs. 1</span><span class="chip">Tag Team</span><span class="chip">Open Mic</span><span class="chip">Tournament</span></div>
      <p class="muted">Automated format: split-screen contestants, on-screen rules, automatic round countdown, timed voting buttons for viewers, gifts and requests to battle. No host is required.</p>
    </div>
    <div class="card">
      <h3>How an automated round works</h3>
      <ol>
        <li>Both contestants opt in and see the rules before the round begins.</li>
        <li>The system starts a visible countdown and displays the current round and time remaining to everyone.</li>
        <li>When the round ends, both microphones pause and viewers see <strong>Vote: Contestant A</strong> or <strong>Vote: Contestant B</strong> buttons.</li>
        <li>Each eligible viewer gets one vote per round within the timed voting window; the system locks voting when time expires.</li>
        <li>Results display the round winner, cumulative score and a separate gifts leaderboard. The <strong>10-second audience voting window is the only break</strong> between rounds. The next round starts immediately after voting closes. If the final match vote is tied, an automatic <strong>tiebreaker final round</strong> begins after voting closes. At the end of a decided match, viewers can vote <strong>Rematch: Yes</strong> or <strong>Rematch: No</strong>; a rematch proceeds only if both contestants agree.</li>
      </ol>
      <p class="muted">Voting windows, tiebreakers, rematch polls with no additional inter-round break are planned behavior, not yet a working real-time match.</p>
    </div>
    <div class="card">
      <h3>Discovery</h3>
      <p class="muted">Upcoming Battles · Live Now · Top Roasters · Funniest Clips</p>
      <p>Comedy winner (audience votes) and most-supported performer (gifts) will be displayed as <strong>separate results</strong>. Gifts cannot change the audience vote winner.</p>
    </div>
    <div class="card">
      <h3>Consent & safety</h3>
      <p>Everyone competing must explicitly opt in to being roasted. Automated safety controls must enforce the rules, provide mute and removal actions, and let participants and viewers report threats, hate speech, harassment or sharing private information. Escalation to human review remains available for serious reports.</p>
      <p class="muted">18+ eligibility, reporting, moderation and consent controls must be implemented and tested before live competition launches.</p>
    </div>
  `,{lead:"Live comedy competitions · audience votes and gifts tracked separately"})}const ms={instagram:"Instagram",tiktok:"TikTok",facebook:"Facebook",youtube:"YouTube",x:"X",snapchat:"Snapchat",other:"Other"};function bf(e){return((e==null?void 0:e.path)||"")==="/refer"?"refer":"share"}function ie(e){R(e==="refer"?"#/refer":"#/share")}function _e(){const{user:e}=M();if(e)return e;const t=zt("DemoCreator");return g("Signed in as DemoCreator · local demo"),t||M().user}function yf(e){const t=Number(e)-Date.now();if(t<=0)return"24h window ended (demo)";const s=Math.floor(t/36e5),i=Math.floor(t%36e5/6e4);return`${s}h ${i}m left`}function kf(e){return`<div class="admin-type-tabs rewards-tabs" style="grid-template-columns:repeat(2,minmax(0,1fr));margin-bottom:14px" role="tablist">
    <a class="admin-type-tab ${e==="share"?"on":""}" href="#/share" role="tab" aria-selected="${e==="share"}">Share &amp; Earn</a>
    <a class="admin-type-tab ${e==="refer"?"on":""}" href="#/refer" role="tab" aria-selected="${e==="refer"}">Refer &amp; Earn</a>
  </div>`}function wf(){const{user:e}=M(),t=Q(),s=t.platformsLinked||[],i=t.challenge,a=t.submissions||[],n=t.rewardsClaimed||[],o=to(),r=so(),c=Td(),d=s.length>0?`<ul class="list-plain">${s.map(b=>`<li>
          <span><strong>${l(ms[b.platform]||b.platform)}</strong>
            ${b.handle?`<br/><span class="muted" style="font-size:12px">@${l(String(b.handle).replace(/^@+/,""))}</span>`:""}
            ${b.url?`<br/><span class="muted" style="font-size:11px">${l(b.url)}</span>`:""}
          </span>
          <button class="btn ghost" type="button" data-unlink="${l(b.id)}">Remove</button>
        </li>`).join("")}</ul>`:'<p class="muted" style="margin:0;font-size:13px">No platforms linked yet — optional. Never asked for social passwords.</p>',p=bn().filter(b=>!s.some(S=>S.platform===b)).map(b=>`<option value="${b}">${l(ms[b]||b)}</option>`).join("");let m="";if(!i)m=`<div class="card">
      <h3>24-hour social challenge</h3>
      <p class="muted" style="margin:0 0 10px;font-size:13px">Optional promo · separate from paid Clippers. Post official DBS ad + tracked link · keep live 24h · manual/demo verification (not guaranteed auto-check).</p>
      <button class="btn primary" id="shStart" >Start challenge · TEST MODE</button>
    </div>`;else{const b=i.status==="active",S=Date.now()>=Number(i.endsAt);m=`<div class="card">
      <div class="row wrap" style="gap:8px;margin-bottom:8px">
        <span class="chip">${b?S?"Window ended · demo":"Active":"Ended"}</span>
        <span class="chip">TEST MODE</span>
        <span class="chip">${l(yf(i.endsAt))}</span>
        ${i.simulatedElapsed?'<span class="chip">Simulated 24h elapsed</span>':""}
      </div>
      <h3>${l(i.adTitle)}</h3>
      <p style="margin:8px 0;font-size:14px;white-space:pre-wrap">${l(i.caption)}</p>
      <div class="field"><label>Tracked link</label>
        <input id="shTracked" readonly value="${l(i.trackedLink)}" />
      </div>
      <p class="chip" style="margin:8px 0">#ad · Paid partnership · incentivized promotion disclosure required</p>
      <div class="row wrap" style="gap:8px;margin-top:10px">
        <button class="btn" type="button" id="shCopyLink">Copy tracked link</button>
        <button class="btn" type="button" id="shCopyCaption">Copy caption</button>
        ${b?`<button class="btn ghost" type="button" id="shSim24">Simulate 24h elapsed</button>
               <button class="btn ghost" type="button" id="shEnd">End challenge</button>`:""}
      </div>
      <p class="muted" style="margin:10px 0 0;font-size:12px">Honest scope: stories/API may not prove continuous 24h visibility — admin/demo verify only.</p>
    </div>`}const h=bn().map(b=>`<option value="${b}">${l(ms[b]||b)}</option>`).join(""),f=a.length>0?`<ul class="list-plain">${a.map(b=>`<li style="align-items:flex-start">
          <span style="flex:1;min-width:0">
            <strong>${l(ms[b.platform]||b.platform)}</strong>
            <span class="chip">${l(b.status)}</span>
            <br/><a href="${l(b.postUrl)}" target="_blank" rel="noopener" style="font-size:13px;word-break:break-all">${l(b.postUrl)}</a>
            <br/><span class="muted" style="font-size:11px">${K(b.submittedAt)} · ${l(b.note||"")}</span>
          </span>
          ${b.status==="pending"?`<span class="row wrap" style="gap:4px">
                  <button class="btn" type="button" data-verify="${l(b.id)}">Verify · demo</button>
                  <button class="btn ghost" type="button" data-reject="${l(b.id)}">Reject</button>
                </span>`:""}
        </li>`).join("")}</ul>`:'<p class="muted" style="margin:0;font-size:13px">No post URLs submitted yet.</p>',v=c.map(b=>{const S=n.some(A=>A.tierId===b.id),$=r.some(A=>A.id===b.id);return`<tr style="border-top:1px solid rgba(255,255,255,.06)">
        <td style="padding:8px 4px"><strong>${l(b.label)}</strong><br/><span class="muted" style="font-size:11px">≥${b.minVerified} verified platform${b.minVerified===1?"":"s"}${b.requireAllLinked?" · all linked (≥3)":""}</span></td>
        <td style="padding:8px 4px">${S?'<span class="chip">Claimed</span>':$?`<button class="btn primary" type="button" data-claim-share="${l(b.id)}">Claim</button>`:`<span class="muted" style="font-size:12px">Locked (${o}/${b.minVerified})</span>`}</td>
      </tr>`}).join(""),k=n.length>0?`<ul class="list-plain">${n.map(b=>`<li>
          <span>${l(b.label)}<br/><span class="muted" style="font-size:11px">${K(b.at)} · TEST MODE</span></span>
          <span class="chip">${l(b.kind)}</span>
        </li>`).join("")}</ul>`:'<p class="muted" style="margin:0;font-size:13px">No rewards claimed yet.</p>';return`
    <div class="card">
      <p class="muted" style="margin:0;font-size:13px">
        Optional 24h social promo for registered users. Link platforms by <strong>name + handle/URL only</strong> — never passwords.
        Verification is <strong>manual/demo</strong> (not guaranteed auto-check of continuous 24h visibility).
      </p>
      <div class="row wrap" style="margin-top:10px;gap:8px">
        <span class="chip">Verified platforms: ${o}</span>
        <span class="chip">Linked: ${s.length}</span>
        ${e?`<span class="chip">@${l(e.username)}</span>`:'<button class="btn primary" type="button" id="rwSignIn">Sign in · demo</button>'}
        <button class="btn ghost" type="button" id="shReset">Reset Share demo</button>
      </div>
    </div>

    <div class="card">
      <h3>Linked social platforms</h3>
      ${d}
      <form id="shLinkForm" style="display:grid;gap:10px;max-width:520px;margin-top:12px">
        <div class="grid-2">
          <div class="field"><label>Platform</label>
            <select name="platform" id="shPlat" ${p?"":"disabled"}>
              ${p||'<option value="">All linked</option>'}
            </select>
          </div>
          <div class="field"><label>Handle (no password)</label><input name="handle" id="shHandle" maxlength="64" placeholder="you (no @ needed)" /></div>
        </div>
        <div class="field"><label>Profile URL (optional)</label><input name="url" id="shUrl" maxlength="240" placeholder="https://…" /></div>
        <button class="btn" type="submit" ${p?"":"disabled"}>Link platform</button>
        <p class="muted" style="margin:0;font-size:12px">Skip anytime — do not create fake accounts for rewards.</p>
      </form>
    </div>

    ${m}

    ${i?`<div class="card">
      <h3>Submit post URLs</h3>
      <p class="muted" style="margin:0 0 10px;font-size:13px">Paste the public post link for each platform. Admin Verify/Reject below (demo).</p>
      <form id="shSubmitForm" class="row wrap" style="gap:8px;align-items:flex-end">
        <div class="field" style="margin:0;min-width:140px"><label>Platform</label><select id="shSubPlat">${h}</select></div>
        <div class="field" style="margin:0;flex:1;min-width:180px"><label>Post URL</label><input id="shSubUrl" type="url" placeholder="https://…" required /></div>
        <button class="btn primary" type="submit">Submit</button>
      </form>
      <div style="margin-top:12px">${f}</div>
    </div>`:""}

    <div class="card">
      <h3>Rewards</h3>
      <p class="muted" style="margin:0 0 8px;font-size:13px">1 → badge · 2 → decoration · 3 → 7d Skeet+ · all linked (≥3) → 30d Skeet+. No auto paid billing.</p>
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <tbody>${v}</tbody>
        </table>
      </div>
      <h4 style="margin:16px 0 8px;font-size:14px">Claim history</h4>
      ${k}
    </div>
  `}function Sf(){const{user:e}=M(),t=Jt(),s=io(),i=t.invitees||[],a=ao(),n=no(),o=Nd(),r=t.milestonesClaimed||[],c=Tt(),d=o.find(v=>a<v.n),p=d?`${a} / ${d.n} verified active → ${d.label}`:a>=100?"All milestones unlocked":`${a} verified active`,m=i.length>0?`<ul class="list-plain">${i.map(v=>{const k=(v.activeDays||[]).length;return`<li style="align-items:flex-start">
            <span style="flex:1;min-width:0">
              <strong>${l(v.username)}</strong>
              <span class="chip">${l(v.status)}</span>
              ${v.flaggedFraud?'<span class="chip">Fraud flag</span>':""}
              ${v.welcomeClaimed?'<span class="chip">Welcome claimed</span>':""}
              <br/><span class="muted" style="font-size:12px">Active days: ${k}/3 · ${l((v.activeDays||[]).join(", ")||"none")} · signed ${K(v.signedUpAt)}</span>
            </span>
            <span class="row wrap" style="gap:4px;justify-content:flex-end">
              ${!v.welcomeClaimed&&!v.flaggedFraud?`<button class="btn ghost" type="button" data-welcome="${l(v.id)}">Welcome perk</button>`:""}
              ${!v.flaggedFraud&&v.status!=="active"?`<button class="btn" type="button" data-activeday="${l(v.id)}">Mark active day</button>`:""}
              ${v.flaggedFraud?`<button class="btn ghost" type="button" data-unfraud="${l(v.id)}">Clear fraud</button>`:`<button class="btn ghost" type="button" data-fraud="${l(v.id)}">Flag fraud</button>`}
            </span>
          </li>`}).join("")}</ul>`:'<p class="muted" style="margin:0;font-size:13px">No invitees yet — simulate a signup or load demo referrals.</p>',h=o.map(v=>{const k=r.some(S=>S.milestoneId===v.id),b=n.some(S=>S.id===v.id);return`<tr style="border-top:1px solid rgba(255,255,255,.06)">
        <td style="padding:8px 4px"><strong>${v.n}</strong> verified active</td>
        <td style="padding:8px 4px">${l(v.label)}</td>
        <td style="padding:8px 4px">${k?'<span class="chip">Claimed</span>':b?`<button class="btn primary" type="button" data-claim-ref="${l(v.id)}">Claim</button>`:`<span class="muted" style="font-size:12px">${a}/${v.n}</span>`}</td>
      </tr>`}).join(""),f=r.length>0?`<ul class="list-plain">${r.map(v=>`<li>
          <span>${l(v.label)}<br/><span class="muted" style="font-size:11px">${K(v.at)} · not Clippers pay</span></span>
          <span class="chip">${v.n}</span>
        </li>`).join("")}</ul>`:'<p class="muted" style="margin:0;font-size:13px">No milestone claims yet.</p>';return`
    <div class="card">
      <p class="muted" style="margin:0;font-size:13px">
        Personal referral link. Invitee welcome perks; inviter milestones only after <strong>verified active</strong>
        (meaningful participation on <strong>3 distinct days in the first 7 days</strong>). Distinct from Clippers commissions. No purchase required · no auto billing.
      </p>
      <div class="row wrap" style="margin-top:10px;gap:8px">
        <span class="chip">Verified active: ${a}</span>
        ${c?`<span class="chip">Membership: ${l(c)}</span>`:'<span class="chip">Membership: none</span>'}
        ${e?`<span class="chip">@${l(e.username)}</span>`:'<button class="btn primary" type="button" id="rwSignIn">Sign in · demo</button>'}
      </div>
    </div>

    <div class="card">
      <h3>Your referral link</h3>
      <div class="field"><label>Code</label><input readonly value="${l(t.code)}" /></div>
      <div class="field"><label>Link</label><input id="refLink" readonly value="${l(s)}" /></div>
      <div class="row wrap" style="gap:8px">
        <button class="btn primary" type="button" id="refCopy">Copy link</button>
        <button class="btn" type="button" id="refSeed">Load demo invitees</button>
        <button class="btn ghost" type="button" id="refReset">Reset Refer demo</button>
      </div>
      <p class="muted" style="margin:10px 0 0;font-size:12px">Progress: ${l(p)}</p>
    </div>

    <div class="card">
      <h3>Simulate invitee</h3>
      <p class="muted" style="margin:0 0 10px;font-size:13px">Demo controls · fraud-resistant toggles (self-referral blocked · flag bots).</p>
      <form id="refInviteForm" class="row wrap" style="gap:8px;align-items:flex-end">
        <div class="field" style="margin:0;flex:1;min-width:160px"><label>Invitee username</label><input id="refInviteName" maxlength="24" placeholder="NewFriend" /></div>
        <button class="btn primary" type="submit">Simulate signup</button>
      </form>
      <div style="margin-top:12px">${m}</div>
    </div>

    <div class="card">
      <h3>Inviter milestones</h3>
      <p class="muted" style="margin:0 0 8px;font-size:13px">1 / 3 / 5 / 10 / 25 / 50 / 100 verified active referrals. Memberships are TEST MODE chips — not real billing.</p>
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <thead><tr class="muted" style="text-align:left">
            <th style="padding:6px 4px">At</th>
            <th style="padding:6px 4px">Reward</th>
            <th style="padding:6px 4px"></th>
          </tr></thead>
          <tbody>${h}</tbody>
        </table>
      </div>
      <h4 style="margin:16px 0 8px;font-size:14px">Claim history</h4>
      ${f}
    </div>

    <div class="card">
      <h3>Invitee welcome path</h3>
      <ul class="list-plain">
        <li><span>Welcome badge / decoration</span><span class="chip">on signup perk</span></li>
        <li><span>3 days Skeet+</span><span class="chip">after 3 active days</span></li>
        <li><span>Extra 7 days Skeet+</span><span class="chip">7-day first-week streak</span></li>
      </ul>
      <p class="muted" style="margin:8px 0 0;font-size:12px">Invitee membership grants are illustrative chips in this demo; use Welcome perk + active days on each invitee card.</p>
    </div>
  `}function $f(e){return ol(e||{path:"/share"})}function xf(e){return ol(e||{path:"/refer"})}function ol(e){const t=bf(e),s=`
    ${kf(t)}
    ${t==="refer"?Sf():wf()}
  `;return I("DBS Rewards",s,{lead:t==="refer"?"Refer & Earn · verified active friends · TEST MODE (§33).":"Share & Earn · 24h social promo · TEST MODE (§32)."})}function Ef(e){ll(e,"share")}function Af(e){ll(e,"refer")}function ll(e,t){var i,a,n,o,r,c,d,p,m,h,f,v,k;const s=t||(location.hash.includes("/refer")?"refer":"share");(i=e.querySelector("#rwSignIn"))==null||i.addEventListener("click",()=>{_e(),ie(s)}),(a=e.querySelector("#shLinkForm"))==null||a.addEventListener("submit",b=>{var P,C,B;b.preventDefault(),_e();const S=(P=e.querySelector("#shPlat"))==null?void 0:P.value,$=((C=e.querySelector("#shHandle"))==null?void 0:C.value)||"",A=((B=e.querySelector("#shUrl"))==null?void 0:B.value)||"",w=Dd({platform:S,handle:$,url:A});if(w.error==="signin")return g("Sign in required");if(w.error==="already_linked")return g("Already linked");if(w.error==="required")return g("Handle or URL required");if(w.error)return g("Could not link");g(`Linked ${ms[S]||S}`),ie("share")}),e.querySelectorAll("[data-unlink]").forEach(b=>{b.addEventListener("click",()=>{Md(b.getAttribute("data-unlink")),g("Platform removed"),ie("share")})}),(n=e.querySelector("#shStart"))==null||n.addEventListener("click",()=>{_e();const b=Ld();if(b.error==="signin")return g("Sign in required");if(b.error==="already_active")return g("Challenge already active");if(b.error)return g("Could not start");g("Challenge started · 24h window"),ie("share")}),(o=e.querySelector("#shCopyLink"))==null||o.addEventListener("click",async()=>{var S;const b=((S=e.querySelector("#shTracked"))==null?void 0:S.value)||"";try{await navigator.clipboard.writeText(b),g("Tracked link copied")}catch{g("Copy manually")}}),(r=e.querySelector("#shCopyCaption"))==null||r.addEventListener("click",async()=>{var $;const S=(($=Q().challenge)==null?void 0:$.caption)||"";try{await navigator.clipboard.writeText(S),g("Caption copied")}catch{g("Copy manually")}}),(c=e.querySelector("#shSim24"))==null||c.addEventListener("click",()=>{if(Id().error)return g("No active challenge");g("Simulated 24h elapsed"),ie("share")}),(d=e.querySelector("#shEnd"))==null||d.addEventListener("click",()=>{Pd(),g("Challenge ended"),ie("share")}),(p=e.querySelector("#shSubmitForm"))==null||p.addEventListener("submit",b=>{var w,P;b.preventDefault(),_e();const S=(w=e.querySelector("#shSubPlat"))==null?void 0:w.value,$=((P=e.querySelector("#shSubUrl"))==null?void 0:P.value)||"",A=Od({platform:S,postUrl:$});if(A.error==="required")return g("Post URL required");if(A.error==="duplicate")return g("Already submitted for this platform");if(A.error==="no_challenge")return g("Start a challenge first");if(A.error)return g("Submit failed");g("Submitted · pending demo verification"),ie("share")}),e.querySelectorAll("[data-verify]").forEach(b=>{b.addEventListener("click",()=>{yn(b.getAttribute("data-verify"),"verified"),g("Verified · demo (manual)"),ie("share")})}),e.querySelectorAll("[data-reject]").forEach(b=>{b.addEventListener("click",()=>{yn(b.getAttribute("data-reject"),"rejected"),g("Rejected"),ie("share")})}),e.querySelectorAll("[data-claim-share]").forEach(b=>{b.addEventListener("click",()=>{_e();const S=_d(b.getAttribute("data-claim-share"));if(S.error==="not_claimable")return g("Not claimable yet");if(S.error)return g("Claim failed");g(`Claimed · ${S.claim.label}`),ie("share")})}),(m=e.querySelector("#shReset"))==null||m.addEventListener("click",()=>{qd(),g("Share demo reset"),ie("share")}),(h=e.querySelector("#refCopy"))==null||h.addEventListener("click",async()=>{var S;_e(),Jt();const b=((S=e.querySelector("#refLink"))==null?void 0:S.value)||io();try{await navigator.clipboard.writeText(b),g("Referral link copied")}catch{g("Copy manually")}}),(f=e.querySelector("#refInviteForm"))==null||f.addEventListener("submit",b=>{var A;b.preventDefault(),_e();const S=((A=e.querySelector("#refInviteName"))==null?void 0:A.value)||"",$=Bd({username:S});if($.error==="self_referral")return g("Self-referral blocked");if($.error==="signin")return g("Sign in required");if($.error)return g("Could not add invitee");g(`Invitee ${$.invitee.username} signed up`),ie("refer")}),e.querySelectorAll("[data-welcome]").forEach(b=>{b.addEventListener("click",()=>{const S=Rd(b.getAttribute("data-welcome"));if(S.error==="fraud")return g("Flagged fraud");if(S.error)return g("Welcome claim failed");g(S.perk||"Welcome perk claimed"),ie("refer")})}),e.querySelectorAll("[data-activeday]").forEach(b=>{b.addEventListener("click",()=>{const S=jd(b.getAttribute("data-activeday"));if(S.error==="fraud")return g("Flagged fraud");if(S.error==="outside_window")return g("Outside first-7-day window");if(S.error==="window_full")return g("All 7 demo days already marked");if(S.error)return g("Could not mark day");const $=(S.invitee.activeDays||[]).length;g($>=3?`${S.invitee.username} → verified active (${$} days)`:`Active day ${$}/3 for ${S.invitee.username}`),ie("refer")})}),e.querySelectorAll("[data-fraud]").forEach(b=>{b.addEventListener("click",()=>{kn(b.getAttribute("data-fraud"),!0),g("Flagged as fraud · demo"),ie("refer")})}),e.querySelectorAll("[data-unfraud]").forEach(b=>{b.addEventListener("click",()=>{kn(b.getAttribute("data-unfraud"),!1),g("Fraud flag cleared"),ie("refer")})}),e.querySelectorAll("[data-claim-ref]").forEach(b=>{b.addEventListener("click",()=>{_e();const S=Kd(b.getAttribute("data-claim-ref"));if(S.error==="not_claimable")return g("Not claimable yet");if(S.error)return g("Claim failed");g(`Milestone claimed · ${S.claim.label}`),ie("refer")})}),(v=e.querySelector("#refSeed"))==null||v.addEventListener("click",()=>{_e();const b=Gd({force:!0});if(b.error==="signin")return g("Sign in required");g(`Loaded ${b.seeded||0} demo invitees`),ie("refer")}),(k=e.querySelector("#refReset"))==null||k.addEventListener("click",()=>{_e(),Fd(),g("Refer demo reset"),ie("refer")})}function Cf(e){return{badge:`Phase ${e} shell`}}function ar(e){return`
    <article class="card pikk-video-tile">
      <div class="hero-video" style="margin:0 0 10px">
        <iframe src="${l(Xe(e.embed))}" title="${l(e.title)}" allowfullscreen loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </div>
      <span class="chip">${l(e.category||"Music Videos")}</span>
      <h3 style="margin:8px 0 4px">${l(e.title)}</h3>
      <p class="muted" style="margin:0 0 8px">${l(e.artist||"DatBoiSkeet")}</p>
      <div class="row wrap">
        <a class="btn" href="${l(e.youtube)}" target="_blank" rel="noopener">Open on YouTube</a>
        <button class="btn ghost video-share" data-url="${l(e.youtube)}" data-title="${l(e.title)}">Share link</button>
      </div>
    </article>`}function Tf(){var c;const e=["Music Videos","Mixes","Interviews"],t={};le.forEach(d=>{const p=d.category||"Music Videos";(t[p]||(t[p]=[])).push(d)});const s=e.filter(d=>{var p;return(p=t[d])==null?void 0:p.length}).map(d=>{const p=t[d].map(ar).join("");return`<section class="pikk-video-section" data-video-category="${l(d)}"><h3>${l(d)}</h3><div class="pikk-video-grid">${p}</div></section>`}).join(""),i=Object.keys(t).filter(d=>!e.includes(d)).map(d=>`<section class="pikk-video-section" data-video-category="${l(d)}"><h3>${l(d)}</h3><div class="pikk-video-grid">${t[d].map(ar).join("")}</div></section>`).join(""),a=Et({publishedOnly:!0,types:["video"]}),n=a.map(d=>{const p=d.youtube||"",m=d.embed||"";if(m||p){const h=m||"";return`<article class="card catalog-admin-video" data-id="${l(d.id)}">
          ${h?`<div class="hero-video" style="margin:0 0 10px"><iframe src="${l(Xe(h))}" title="${l(d.title)}" allowfullscreen loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>`:""}
          <span class="chip">Admin</span>
          <h3 style="margin:8px 0 4px">${l(d.title)}</h3>
          <p class="muted">${l(d.artist)}</p>
          ${p?`<a class="btn" href="${l(p)}" target="_blank" rel="noopener">Open on YouTube</a>`:""}
        </article>`}return`<article class="card catalog-admin-video" data-id="${l(d.id)}">
        <span class="chip">Admin · uploaded</span>
        <h3 style="margin:8px 0 4px">${l(d.title)}</h3>
        <p class="muted">${l(d.artist)}</p>
        ${d.coverRef?`<img data-idb-src="${l(d.coverRef.startsWith("idb:")?d.coverRef:"")}" src="${l(d.coverRef.startsWith("idb:")?"":d.coverRef)}" alt="" class="catalog-cover" style="width:100%;max-height:220px;object-fit:cover;border-radius:12px;margin:8px 0" />`:""}
        ${d.mediaRef?`<video class="catalog-video" data-idb-src="${l(d.mediaRef.startsWith("idb:")?d.mediaRef:"")}" src="${l(d.mediaRef.startsWith("idb:")?"":d.mediaRef)}" controls playsinline webkit-playsinline preload="metadata" style="width:100%;border-radius:12px;background:#000"></video>`:'<p class="muted">No media file</p>'}
      </article>`}).join(""),o={};fl.forEach(d=>{var p;(o[p=d.category]||(o[p]=[])).push(d)});const r=Object.entries(o).map(([d,p])=>`
      <div class="card pikk-video-coming-card" data-video-coming-category="${l(d)}">
        <h3>${l(d)}</h3>
        <p class="muted" style="margin:0 0 8px">No verified URLs in repo yet — titles from plan §9 only. No invented view counts.</p>
        <ul class="list-plain">${p.map(m=>`<li><span>${l(m.title)}</span><span class="chip">Coming Soon</span></li>`).join("")}</ul>
      </div>`).join("");return I("Videos & Interviews",`${Ko("videos")}
    <section class="pikk-video-hero card">
      <div class="pikk-video-hero-copy">
        <p class="kicker">PIKK VIDEOS · OFFICIAL RELEASES</p>
        <h2>Watch. Discover. Repeat.</h2>
        <p class="muted">Verified DatBoiSkeet music videos, mixes and interviews. Original YouTube playback, with no invented view counts.</p>
        <a class="btn primary" href="#/explore">Explore creators</a>
      </div>
      ${(c=le[0])!=null&&c.youtube?`<a class="pikk-video-hero-preview" href="${l(le[0].youtube)}" target="_blank" rel="noopener" aria-label="Watch ${l(le[0].title)}">
        <img src="https://i.ytimg.com/vi/${l(new URL(le[0].youtube).searchParams.get("v")||"")}/hqdefault.jpg" alt="" loading="eager" decoding="async" />
        <span class="pikk-video-hero-label">▶ ${l(le[0].title)}</span>
      </a>`:""}
    </section>
    <nav class="pikk-video-filters" aria-label="Video categories">
      <button type="button" class="on" data-videos-filter="All" aria-pressed="true">All</button>
      <button type="button" data-videos-filter="Music Videos" aria-pressed="false">Music Videos</button>
      <button type="button" data-videos-filter="Mixes" aria-pressed="false">Mixes</button>
      <button type="button" data-videos-filter="Interviews" aria-pressed="false">Interviews</button>
      ${a.length?'<button type="button" data-videos-filter="Admin" aria-pressed="false">Admin</button>':""}
    </nav>
    <p class="card pikk-video-source-info pikk-video-filter-status muted" role="status" aria-live="polite" data-video-filter-status>Showing all video categories and upcoming titles.</p>
    <div class="card pikk-video-source-info"><p class="muted" style="margin:0">Official DatBoiSkeet music videos, mixes, and interviews — YouTube embeds from the original source. No rehosted files.</p>
      <div class="row wrap" style="margin-top:8px;gap:8px">
        <a class="btn" href="https://www.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA" target="_blank" rel="noopener">Official YouTube channel</a>
        <a class="btn ghost" href="https://www.youtube.com/@DatBoiSkeet1" target="_blank" rel="noopener">@DatBoiSkeet1</a>
        <a class="btn ghost" href="https://www.youtube.com/playlist?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t" target="_blank" rel="noopener">Music Videos playlist</a>
      </div>
    </div>
    ${s}${i}
    ${n?`<section class="pikk-video-section" data-video-category="Admin"><h3>From Admin</h3><div class="pikk-video-grid">${n}</div></section>`:""}
    <section class="pikk-video-section pikk-video-coming-list" aria-label="Upcoming videos">
      <h3>Upcoming on PIKK</h3>
      ${r}
    </section>`,{lead:"Official MVs · Mixes · Interviews · admin uploads."})}function Df(e){var o;const t=[...e.querySelectorAll("[data-videos-filter]")],s=[...e.querySelectorAll(".pikk-video-section[data-video-category]")],i=[...e.querySelectorAll("[data-video-coming-category]")],a=e.querySelector(".pikk-video-coming-list"),n=e.querySelector("[data-video-filter-status]");t.forEach(r=>r.addEventListener("click",()=>{const c=r.dataset.videosFilter||"All";t.forEach(p=>{const m=p===r;p.classList.toggle("on",m),p.setAttribute("aria-pressed",m?"true":"false")}),s.forEach(p=>{const m=c==="All"||p.dataset.videoCategory===c;p.hidden=!m}),i.forEach(p=>{p.hidden=c!=="All"&&p.dataset.videoComingCategory!==c});const d=i.some(p=>!p.hidden);if(a&&(a.hidden=!d),n){const p=s.some(m=>!m.hidden);n.textContent=c==="All"?"Showing all video categories and upcoming titles.":p?`Showing ${c}${d?" and upcoming titles":""}.`:d?`No published ${c} videos yet. Upcoming titles are listed below.`:`No published ${c} videos yet.`}})),(o=e.querySelector(".pikk-video-filters"))==null||o.addEventListener("keydown",r=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(r.key))return;const c=t.indexOf(r.target);if(c<0||!t.length)return;r.preventDefault();const d=r.key==="Home"?0:r.key==="End"?t.length-1:(c+(r.key==="ArrowRight"?1:-1)+t.length)%t.length;t[d].focus(),t[d].click()}),qi(e),e.querySelectorAll("video.catalog-video").forEach(r=>{r.addEventListener("play",()=>Vt()),r.addEventListener("pause",()=>Ze()),r.addEventListener("ended",()=>Ze())}),e.querySelectorAll(".video-share").forEach(r=>{r.addEventListener("click",async()=>{const c=r.dataset.url||"";try{await navigator.clipboard.writeText(c),g("Link copied")}catch{g(c||"Copy failed")}})}),e.querySelectorAll("[data-idb-src]").forEach(async r=>{const c=(r.getAttribute("data-idb-src")||"").trim();if(c)try{const d=await Ni(c);if(!d){r.tagName==="VIDEO"&&r.insertAdjacentHTML("afterend",'<p class="muted" style="font-size:12px">Media blob missing — re-upload from Admin.</p>');return}if((r.tagName==="IMG"||r.tagName==="VIDEO"||r.tagName==="AUDIO")&&(r.setAttribute("src",d),r.src=d,r.tagName==="VIDEO"||r.tagName==="AUDIO")){r.setAttribute("playsinline",""),r.setAttribute("webkit-playsinline",""),r.controls=!0;try{r.load()}catch{}}}catch(d){console.warn("idb media hydrate failed",c,d)}})}function Mf(){const e=dr.map(i=>`<li><span>${l(i.name)}</span><strong>$${i.price}/mo</strong></li>`).join(""),t=M().creatorSellApps||[],s=t.length?`<ul class="list-plain" style="margin-top:10px">${t.slice(0,8).map(i=>`<li><span>${l(i.name)} · ${l(i.contact)} · ${l(i.sells)}</span><span class="chip">${l(i.status||"pending")}</span></li>`).join("")}</ul>`:'<p class="muted" style="margin:8px 0 0;font-size:12px">No applications on this device yet.</p>';return I("Pricing",`<div class="card">
      <p class="kicker">Creators &amp; producers</p>
      <h2 style="margin:0 0 8px">Upload &amp; sell your music on PIKK</h2>
      <p>Artists and producers can upload tracks and sell them directly on the PIKK Network. Our demo platform cut is <strong>lower than typical stores</strong> — creators keep <strong>much more</strong> of each sale.</p>
      <p class="muted" style="margin:8px 0 0">TEST MODE only — no real charges, no live contracts. Numbers below are illustrative DEMO rates for the SPA.</p>
      <p class="chip" style="margin-top:10px">TEST MODE · no charges</p>
    </div>

    <div class="card" id="creator-sell-fees">
      <p class="kicker">Fair cut · DEMO</p>
      <h3 style="margin:0 0 8px">Who keeps what</h3>
      <p class="muted" style="margin:0 0 10px">Illustrative comparison — not a live contract. Labelled DEMO for Checker &amp; Design. Fee numbers live here — not on Home.</p>
      <ul class="list-plain">
        <li><span>Typical digital store<br/><span class="muted" style="font-size:12px">Platform cut ~30%</span></span><strong>Creator ~70%</strong></li>
        <li><span>Major streaming / storefront<br/><span class="muted" style="font-size:12px">Effective cut ~30–50%+</span></span><strong>Creator ~50–70%</strong></li>
        <li><span><strong>PIKK music / videos / beats (demo)</strong><br/><span class="muted" style="font-size:12px">Platform cut <strong>10%</strong></span></span><strong style="color:var(--acc)">Creator 90%</strong></li>
      </ul>
      <p class="chip chip-partial" style="margin-top:10px">DEMO rates · illustrative only</p>
    </div>

    <div class="card">
      <p class="kicker">Creator merch</p>
      <h3 style="margin:0 0 8px">Your storefront · your payments</h3>
      <p>Creators may add a merch section on their profile or shop area, but <strong>must use their own payment methods</strong> (Stripe, PayPal, or other external checkout). PIKK lists and links — it is <strong>not</strong> the merchant of record for creator merch.</p>
      <ul class="list-plain" style="margin-top:10px">
        <li><span>Payment processing</span><span class="chip">Creator’s Stripe / PayPal</span></li>
        <li><span>Merchant of record</span><span class="chip">Not PIKK</span></li>
        <li><span>Foreign X-Change official merch</span><span><a href="#/merch" style="color:var(--sk)">External shop →</a></span></li>
      </ul>
      <p class="chip" style="margin-top:10px">TEST MODE · no merch charges inside PIKK</p>
    </div>

    <div class="card">
      <p class="kicker">Buyer ↔ seller</p>
      <h3 style="margin:0 0 8px">Transactions are final between parties</h3>
      <p>Buyer↔seller music and creator-merch transactions are <strong>not reversed or disputed through PIKK</strong>. Chargebacks, refunds, and product disputes stay between the buyer and the seller (or their payment provider). Disputes do <strong>not</strong> fall on PIKK as merchant of record for those sales.</p>
      <p class="muted" style="margin:8px 0 0">This is demo legal-style notice for the SPA. Final Terms ship before public launch. Membership billing rules remain separate (see Community Guidelines).</p>
      <p class="chip" style="margin-top:10px">TEST MODE · disclosure copy · not live MoR</p>
    </div>

    <div class="card" id="creator-sell">
      <p class="kicker">Apply · TEST MODE</p>
      <h3 style="margin:0 0 8px">Creator apply</h3>
      <p class="muted" style="margin:0 0 10px">Tell us who you are and what you sell. Saved on this device only — no real backend. Review rules &amp; fees above before submitting.</p>
      <div class="grid-2">
        <div class="field"><label for="csName">Name *</label><input id="csName" autocomplete="name" required /></div>
        <div class="field"><label for="csContact">Email or handle *</label><input id="csContact" placeholder="you@email or @handle" required /></div>
      </div>
      <div class="field">
        <label for="csSells">What do you sell?</label>
        <select id="csSells">
          <option value="music">Music</option>
          <option value="videos">Videos</option>
          <option value="beats">Beats</option>
          <option value="merch">Merch</option>
          <option value="music-videos-beats">Music · videos · beats</option>
          <option value="all" selected>All (music, videos, beats, merch)</option>
        </select>
      </div>
      <label class="row" style="gap:8px;align-items:flex-start;margin:8px 0 12px;cursor:pointer">
        <input type="checkbox" id="csAgree" style="margin-top:3px" />
        <span style="font-size:13px">I agree to the DEMO rules, fee schedule, merch MoR, and final-transaction notice on this page.</span>
      </label>
      <button type="button" class="btn primary block" id="csSubmit">Submit application</button>
      <p class="chip" style="margin-top:10px">TEST MODE · localStorage <code>creatorSellApps</code></p>
      ${s}
    </div>

    <div class="card"><h3>Memberships</h3><ul class="list-plain">${e}</ul></div>
     <div class="card"><h3>Music price ranges</h3>
       <ul class="list-plain">
         <li><span>Song</span><span>$0.99–$1.29</span></li>
         <li><span>EP</span><span>$4.99–$6.99</span></li>
         <li><span>Album</span><span>$9.99–$12.99</span></li>
       </ul>
       <p class="chip">TEST MODE · no charges</p>
     </div>`,{lead:"Sell music, videos, beats &amp; merch · rules &amp; fees · apply form · memberships &amp; gifts — admin-adjustable."})}function Lf(e){var s;typeof location<"u"&&(location.hash.includes("focus=sell")||location.hash.includes("creator-sell"))&&setTimeout(()=>{var i;return(i=document.getElementById("creator-sell"))==null?void 0:i.scrollIntoView({behavior:"smooth",block:"start"})},60),(s=e.querySelector("#csSubmit"))==null||s.addEventListener("click",()=>{var c,d,p,m,h,f;const i=(d=(c=e.querySelector("#csName"))==null?void 0:c.value)==null?void 0:d.trim(),a=(m=(p=e.querySelector("#csContact"))==null?void 0:p.value)==null?void 0:m.trim(),n=((h=e.querySelector("#csSells"))==null?void 0:h.value)||"both",o=!!((f=e.querySelector("#csAgree"))!=null&&f.checked);if(!i||!a)return g("Name and email/handle required");if(!o)return g("Agree to rules & fees to continue");const r=Kl({name:i,contact:a,sells:n,agreed:o});if(r!=null&&r.error)return g(r.error==="rules"?"Agree to rules & fees to continue":"Name and email/handle required");g("Application saved · TEST MODE"),R("#/pricing?focus=sell")})}function If(){return I("Community Guidelines",`<div class="card">
      <p class="kicker">PIKK Network</p>
      <h2 style="margin:0 0 8px">Respect the house</h2>
      <p>All users follow DatBoiSkeet Community Guidelines when posting, commenting, chatting, livestreaming, or joining PIKK Lounge rooms. This is a premium, music-first entertainment network — keep it safe for fans, creators, and the artist.</p>
      <p class="muted" style="margin:8px 0 0">Enforcement UI in this demo is illustrative. Warnings, suspensions, and appeals will run through Admin review before public launch.</p>
    </div>

    <div class="card">
      <h3>Violations</h3>
      <p class="muted" style="margin:0 0 8px">Actions that break PIKK rules include:</p>
      <ul class="list-plain">
        <li><span>Harassment, bullying, or threats</span><span class="chip">Ban-risk</span></li>
        <li><span>Hate speech or targeted abuse</span><span class="chip">Ban-risk</span></li>
        <li><span>Scams, phishing, or fraud</span><span class="chip">Ban-risk</span></li>
        <li><span>Spam or deceptive promotion</span><span class="chip">Warn</span></li>
        <li><span>Prohibited / illegal content</span><span class="chip">Ban-risk</span></li>
      </ul>
    </div>

    <div class="card">
      <h3>Penalties</h3>
      <ul class="list-plain">
        <li><span>1st violation</span><span>First warning</span></li>
        <li><span>2nd violation</span><span>Second warning</span></li>
        <li><span>3rd violation</span><span>Final warning</span></li>
        <li><span>4th violation</span><span>30-day suspension</span></li>
        <li><span>5th violation</span><span>60-day suspension</span></li>
        <li><span>6th violation</span><span>One-year account ban</span></li>
      </ul>
      <p class="muted" style="margin:10px 0 0">Serious violations may skip steps — immediate suspension or permanent removal when needed.</p>
    </div>

    <div class="card">
      <h3>Subscriptions while suspended</h3>
      <p>PIKK does <strong>not</strong> keep charging for paid access you cannot use. Eligible direct-billed recurring charges pause while access is blocked. Where an app store cannot pause billing, cancellation and appropriate credit/refund handling apply. <strong>Cancellation is never obstructed.</strong></p>
      <p class="muted" style="margin:8px 0 0">Billing disclosures belong in Terms + these Guidelines before launch. This page is demo copy only — no real charges in TEST MODE.</p>
    </div>

    <div class="card">
      <h3>Appeals &amp; admin review</h3>
      <p class="muted" style="margin:0">Admins can track warnings, issue penalties, review appeals, override actions, record suspension dates, and restore eligible accounts. Report tools and a full appeals inbox ship with Phase 2 safety work — until then, treat this as published policy copy for the demo SPA.</p>
      <p class="chip" style="margin-top:10px">Demo enforcement · not live moderation</p>
    </div>`,{lead:"Rules for posts, chat, Live & Lounge — plan §13."})}const ta=[{id:"dbs-lounge",cat:"NETWORK",hash:"#dbs-lounge",name:"PIKK Lounge",blurb:"Main hub · official announcements & network news",chip:"Hub"},{id:"conversation",cat:"NETWORK",hash:"#the-conversation",name:"The Conversation",blurb:"Public music & fan discussion threads",chip:"Public"},{id:"listening",cat:"VOICE / LISTENING",hash:"#listening-rooms",name:"Listening Rooms",blurb:"Listening parties & reactions to new releases",chip:"Parties"},{id:"backstage",cat:"MEMBERS",hash:"#backstage-rooms",name:"Backstage Rooms",blurb:"Tier-restricted spaces for Skeet+ / Backstage / Inner Circle",chip:"Members"},{id:"live-rooms",cat:"NETWORK",hash:"#live-rooms",name:"Live Rooms",blurb:"Scheduled community events & discussions",chip:"Events"},{id:"spotlight",cat:"NETWORK",hash:"#the-spotlight",name:"The Spotlight",blurb:"Featured fan conversations & creator posts",chip:"Featured"}],nr={"dbs-lounge":[{who:"PIKK · System",text:"Welcome to PIKK Lounge — DatBoiSkeet’s channel-style community hub.",tag:"DEMO"},{who:"TEST MODE",text:"Live chat isn’t connected yet. These rows are placeholders so the room pane feels real.",tag:"DEMO"}],conversation:[{who:"DEMO",text:"Drop takes on new releases here once Phase 2 chat ships.",tag:"DEMO"}],listening:[{who:"DEMO",text:"Listening parties will sync reactions here — preview only.",tag:"DEMO"}],backstage:[{who:"DEMO",text:"Member-tier rooms unlock with Skeet+ / Backstage / Inner Circle.",tag:"DEMO"}],"live-rooms":[{who:"DEMO",text:"Scheduled community events will list here — no live presence yet.",tag:"DEMO"}],spotlight:[{who:"DEMO",text:"Featured fan conversations land here in Phase 2.",tag:"DEMO"}]},Pf=[{name:"DatBoiSkeet",role:"Owner"},{name:"SkeetMod",role:"Mod · DEMO"},{name:"FanDemo01",role:"DEMO"},{name:"ListenerX",role:"DEMO"}];function Of(e){const s=(nr[e.id]||nr["dbs-lounge"]).map(i=>`<div class="lounge-msg">
        <div class="lounge-msg-avatar" aria-hidden="true">${l(i.who.slice(0,1))}</div>
        <div class="lounge-msg-body">
          <div class="lounge-msg-meta"><strong>${l(i.who)}</strong> <span class="chip">${l(i.tag)}</span></div>
          <p>${l(i.text)}</p>
        </div>
      </div>`).join("");return`<div class="lounge-pane" data-pane="${l(e.id)}" ${e.id==="dbs-lounge"?"":"hidden"}>
    <header class="lounge-pane-head">
      <div>
        <h2><span class="lounge-hash">#</span> ${l(e.name)}</h2>
        <p class="muted">${l(e.blurb)}</p>
      </div>
      <span class="chip">${l(e.chip)}</span>
    </header>
    <div class="lounge-honesty">
      <span class="chip">Phase 2</span>
      <span class="chip">TEST MODE</span>
      <p>Live chat, presence, and real member lists aren’t online yet — this is Discord-inspired chrome for PIKK Lounge only.</p>
    </div>
    <div class="lounge-msgs" aria-label="Demo messages">${s}</div>
    <div class="lounge-compose">
      <input type="text" disabled placeholder="Message #${l(e.name.toLowerCase().replace(/\s+/g,"-"))} · Phase 2" aria-label="Message composer disabled"/>
      <button class="btn" disabled>Send</button>
    </div>
  </div>`}function _f(){const e=[],t=new Set;ta.forEach(n=>{t.has(n.cat)||(t.add(n.cat),e.push(n.cat))});const s=e.map(n=>{const o=ta.filter(r=>r.cat===n).map(r=>`<button type="button" class="lounge-channel${r.id==="dbs-lounge"?" on":""}" data-channel="${l(r.id)}" aria-pressed="${r.id==="dbs-lounge"?"true":"false"}">
            <span class="lounge-hash">#</span>
            <span class="lounge-channel-label">${l(r.name)}</span>
            <span class="chip lounge-channel-chip">${l(r.chip)}</span>
          </button>`).join("");return`<div class="lounge-cat-block">
        <p class="lounge-cat-label">${l(n)}</p>
        ${o}
      </div>`}).join(""),i=ta.map(Of).join(""),a=Pf.map(n=>`<li><span class="lounge-member-dot" aria-hidden="true"></span><span><strong>${l(n.name)}</strong><br/><span class="muted" style="font-size:11px">${l(n.role)}</span></span></li>`).join("");return I("PIKK Lounge",`<div class="card lounge-intro">
      <p class="kicker">Artist-owned network</p>
      <h2 style="margin:0 0 8px">Channel-style Lounge</h2>
      <p>PIKK Lounge is DatBoiSkeet’s premium community — Discord-type channel UX (sidebar + room panes) under silver/dark PIKK branding. Announcements, listening parties, and fan conversations in one place.</p>
      <p class="muted" style="margin:8px 0 0">Not affiliated with Discord. Channels below are the same rooms as before; live chat unlocks in Phase 2.</p>
      <a class="btn ghost" href="#/communities">Open PIKK Communities · local discussion preview</a>
    </div>

    <div class="lounge-discord" id="loungeDiscord">
      <aside class="lounge-channels" aria-label="Lounge channels">
        <div class="lounge-server">
          <div class="lounge-server-mark" aria-hidden="true">PIKK</div>
          <div>
            <strong>DatBoiSkeet</strong>
            <p class="muted" style="margin:0;font-size:11px">Lounge · silver/dark</p>
          </div>
        </div>
        ${s}
        <p class="chip" style="margin:12px 8px 4px">Moderation · §13 Guidelines</p>
      </aside>
      <section class="lounge-main" aria-label="Room pane">
        ${i}
      </section>
      <aside class="lounge-members" aria-label="Demo members">
        <p class="lounge-cat-label">MEMBERS · DEMO</p>
        <ul class="lounge-member-list">${a}</ul>
        <p class="muted" style="font-size:11px;margin:8px 4px 0">Placeholder names — not live presence.</p>
      </aside>
    </div>`,{lead:"Discord-inspired channels · DatBoiSkeet branded.",...Cf(2)})}function qf(e=document){const t=e.querySelector("#loungeDiscord")||e,s=[...t.querySelectorAll(".lounge-channel")],i=[...t.querySelectorAll(".lounge-pane")];s.length&&s.forEach(a=>{a.addEventListener("click",()=>{const n=a.dataset.channel;s.forEach(o=>{const r=o===a;o.classList.toggle("on",r),o.setAttribute("aria-pressed",r?"true":"false")}),i.forEach(o=>{o.dataset.pane===n?o.removeAttribute("hidden"):o.setAttribute("hidden","")})})})}function Nf(){return I("Signup & Creator Apps",`<div class="card">
      <p class="kicker">Join PIKK</p>
      <h2 style="margin:0 0 8px">Fan account first</h2>
      <p>Everyone creates a PIKK account to participate — follow, comment, save, join Lounge rooms, buy memberships, message the team, or apply to earn. Visitors can browse public promo pages; signing up unlocks the network.</p>
      <p class="muted" style="margin:8px 0 12px"><strong>Basic fan signup is free</strong> — no manual approval. This demo uses local Profile sign-in (TEST MODE · no real email/auth yet).</p>
      <a class="btn primary" href="#/profile">Sign in / create demo user</a>
      <a class="btn ghost" href="#/guidelines" style="margin-left:8px">Read Guidelines</a>
    </div>

    <div class="card">
      <h3>Apply for a role</h3>
      <p class="muted" style="margin:0 0 10px">From Profile → Become a Creator, request one or more roles. Each has its own application — no automatic access to earning tools.</p>
      <ul class="list-plain">
        <li><span><strong>Creator / Streamer</strong><br/><span class="muted" style="font-size:12px">Profile, socials, livestream plan · PIKK branding &amp; moderation</span></span><a href="#/live">Live</a></li>
        <li><span><strong>Clipper</strong><br/><span class="muted" style="font-size:12px">Work samples &amp; analytics · paid promo campaigns</span></span><a href="#/clippers">Apply</a></li>
        <li><span><strong>Brand / Advertiser</strong><br/><span class="muted" style="font-size:12px">Business identity, campaigns &amp; disclosures</span></span><a href="#/marketplace">Marketplace</a></li>
        <li><span><strong>Affiliate / Promoter</strong><br/><span class="muted" style="font-size:12px">Referral &amp; campaign promotion plan</span></span><a href="#/refer">Refer</a></li>
        <li><span><strong>Seller</strong><br/><span class="muted" style="font-size:12px">Storefront details, fulfillment &amp; verification</span></span><a href="#/marketplace">Storefront</a></li>
      </ul>
    </div>

    <div class="card">
      <h3>Approval flow</h3>
      <p class="muted" style="margin:0">Register → select role → submit → admin reviews → approve / reject / waitlist → notify → unlock role tools. Earnings need identity/tax/payout checks before payouts. All roles stay under Community Guidelines.</p>
      <p class="chip" style="margin-top:10px">TEST MODE · local demo user on Profile</p>
    </div>`,{lead:"Free fan signup + creator role applications · §16."})}function Bf(){const t=[{label:"Registration & role approval",status:"Demo",note:"Profile/signup local demo · real auth later"},{label:"Moderation / reporting / appeals",status:"TODO",note:"Guidelines copy ready · enforcement UI Phase 2"},{label:"Payments & refunds",status:"TEST",note:"TEST MODE only · no real charges"},{label:"Creator payouts verification",status:"SHELL",note:"Wallet / KYC stubs · not launch-ready"},{label:"Music & video rights",status:"Partial",note:"3 official MVs · streaming links still SHELL"},{label:"Gift-battle fraud prevention",status:"SHELL",note:"Gift Battles not wired for launch"},{label:"Livestream safety",status:"Demo",note:"Go-live demo PASS · age/safety stack incomplete"},{label:"Background audio pause/resume",status:"PARTIAL",note:"§17 sticky top YT player + pauseDbsPlayer hooks"},{label:"Account recovery / optional 2FA",status:"TODO",note:"Local demo sign-in only"},{label:"Loyalty analytics consent",status:"SHELL",note:"Privacy/consent controls before launch"},{label:"PIKK Connect safety (age + WebRTC)",status:"Blocked",note:"Must not launch without assurance"}].map(s=>`<li><span><strong>${l(s.label)}</strong><br/><span class="muted" style="font-size:12px">${l(s.note)}</span></span><span class="chip">${l(s.status)}</span></li>`).join("");return I("Launch Readiness",`<div class="card">
      <p class="kicker">Before public launch</p>
      <h2 style="margin:0 0 8px">Checklist · plan §31</h2>
      <p class="muted" style="margin:0 0 12px">Statuses mirror current STATUS.md — Content Polish owns copy here; Progress Checker owns any DONE claim. This page stays a SHELL until Checker PASSes.</p>
      <ul class="list-plain">${t}</ul>
    </div>

    <div class="card">
      <h3>Fan onboarding</h3>
      <p class="muted" style="margin:0">Show new fans how to discover DatBoiSkeet music &amp; MVs, follow the official profile, post respectfully, listen via Music/Vault Coming Soon covers, shop Foreign X-Change externally, and join PIKK Lounge when rooms go live. Keep TEST MODE honesty until real auth ships.</p>
    </div>

    <div class="card">
      <h3>Creator onboarding</h3>
      <p class="muted" style="margin:0">Separate path: apply for Creator / Clipper / Brand / Affiliate / Seller → admin review → unlock tools → complete identity, age, tax, and payout verification before earnings. Tie every role to Community Guidelines and suspension policy.</p>
      <p class="chip" style="margin-top:10px">Phased rollout · measure cost &amp; performance</p>
    </div>`,{lead:"Pre-launch checklist with honest demo status · §31."})}function Rf(){const e=[{n:1,title:"Foundation",summary:"Videos, Music/Vault, Posts, profiles, followers, engagement alerts, Clippers applications.",status:"DONE",items:[{label:"§1 Posts",status:"DONE",href:"#/posts"},{label:"§2 Clippers apply",status:"DONE",href:"#/clippers"},{label:"§7 Profiles",status:"DONE",href:"#/profile"},{label:"§8 Music & Vault",status:"DONE",href:"#/music"},{label:"§9 Videos & Interviews",status:"DONE",href:"#/videos"},{label:"§14 Streaming links",status:"DONE",href:"#/music"},{label:"§19 Loading splash",status:"DONE",href:"#/home"},{label:"§20 Home dashboard",status:"DONE",href:"#/home"},{label:"§21 Merch showcase",status:"DONE",href:"#/merch"},{label:"§34 Coming Soon covers",status:"DONE",href:"#/music"},{label:"§17 Home MV + continuous play",status:"PARTIAL",href:"#/home",note:"Sticky top YT player · Stream Everywhere open links · PENDING AUDIT"}]},{n:2,title:"Growth & Creator Economy",summary:"Clipper campaigns, missions, referrals, creator earnings, and payouts.",status:"DONE",items:[{label:"§5 Creator Earnings",status:"DONE",href:"#/earnings"},{label:"§6 Missions",status:"DONE",href:"#/missions"},{label:"§27 Wallet & Payouts",status:"DONE",href:"#/wallet"},{label:"§32 Share & Earn",status:"DONE",href:"#/share"},{label:"§33 Refer & Earn",status:"DONE",href:"#/refer"},{label:"§10 Pricing",status:"DONE",href:"#/pricing"},{label:"§11 Admin dashboard",status:"DONE",href:"#/admin"},{label:"§16 Signup / Creator apps",status:"DONE",href:"#/signup"},{label:"§24 Explore",status:"DONE",href:"#/explore"},{label:"§25 Notifications",status:"DONE",href:"#/notifications"},{label:"§26 Fan Clubs",status:"DONE",href:"#/fanclubs"},{label:"§28 Loyalty Club",status:"DONE",href:"#/loyalty"},{label:"§22 Profile Shop cosmetics",status:"DONE",href:"#/shop",note:"Checker PASS · cosmetics demo"}]},{n:3,title:"Live & Marketplace",summary:"Creator livestreaming, gifts, donations, advertising, creator subscriptions, and Marketplace.",status:"DONE",items:[{label:"§3 Live",status:"DONE",href:"#/live"},{label:"§4 Marketplace ads",status:"DONE",href:"#/marketplace"},{label:"§18 Messages",status:"DONE",href:"#/messages"},{label:"§23 Gift Battles",status:"DONE",href:"#/giftbattles"},{label:"§29 Multi-Guest Live",status:"DONE",href:"#/multiguest"},{label:"§30 Open Mic",status:"DONE",href:"#/openmic"},{label:"§35 24/7 Spotlight",status:"DONE",href:"#/spotlight"},{label:"§36 Connect (opt-in shell)",status:"DONE",href:"#/connect"},{label:"§37 Restream + streamer tiers",status:"DONE",href:"#/restream"},{label:"§13 Guidelines",status:"DONE",href:"#/guidelines"},{label:"§15 Community / Lounge",status:"DONE",href:"#/community"},{label:"§31 Launch readiness",status:"DONE",href:"#/launch"}]}],t=i=>i==="DONE"?"chip chip-ok":i==="PARTIAL"?"chip chip-partial":i==="PENDING AUDIT"?"chip chip-audit":"chip",s=e.map(i=>{const a=i.items.map(n=>{const o=n.note?`<br/><span class="muted" style="font-size:12px">${l(n.note)}</span>`:"";return`<li><span>${n.href?`<a href="${l(n.href)}" style="color:inherit;text-decoration:none"><strong>${l(n.label)}</strong></a>`:`<strong>${l(n.label)}</strong>`}${o}</span><span class="${t(n.status)}">${l(n.status)}</span></li>`}).join("");return`<div class="card">
      <div class="row wrap" style="gap:8px;align-items:center;margin-bottom:8px">
        <span class="chip">Phase ${i.n}</span>
        <span class="${t(i.status)}">${l(i.status)}</span>
      </div>
      <h2 style="margin:0 0 6px">${l(i.title)}</h2>
      <p class="muted" style="margin:0 0 12px">${l(i.summary)}</p>
      <ul class="list-plain">${a}</ul>
    </div>`}).join(`

    `);return I("Development Phases",`<div class="card">
      <p class="kicker">Plan §12</p>
      <h2 style="margin:0 0 8px">Roadmap · what shipped vs remaining</h2>
      <p class="muted" style="margin:0">Phase 1–3 from the DatBoiSkeet developer plan. Chips mirror STATUS.md — <strong>DONE</strong> needs Checker PASS; <strong>PARTIAL</strong> and <strong>PENDING AUDIT</strong> are not launch-complete.</p>
      <p class="muted" style="margin:10px 0 0">Still open: <a href="#/home">§17 sticky player</a> (YT embed · no PIKK-hosted audio yet) · <a href="#/shop">§22 Profile Shop</a> (awaiting Checker) · identity/payout verification &amp; fraud controls before activating real money features.</p>
    </div>

    ${s}

    <div class="card">
      <h3>Before activating paid features</h3>
      <p class="muted" style="margin:0">Implement identity and payout verification, payment security, copyright controls, moderation, and fraud prevention before turning on real charges, gifts, or payouts. See <a href="#/launch">Launch Readiness</a>.</p>
    </div>`,{lead:"Phase 1 · Phase 2 · Phase 3 roadmap with live status chips · §12."})}function jf(e){return I("Not found",`<div class="card"><p>No page for <code>${l(e)}</code>.</p><a class="btn" href="#/home">Home</a></div>`)}function Kf(){return I("Create on PIKK",`<div class="pikk-create-page">${cl()}
    <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · uploads depend on available prototype tools</p></div>`)}const Ff={"/home":{render:wu,bind:Su},"/create":{render:Kf},"/promote":{render:Wu,bind:Yu},"/donate":{render:Ju,bind:Qu},"/payments":{render:Zu,bind:em},"/updates":{render:Eu,bind:Au},"/posts":{render:Vu,bind:Uu},"/music":{render:jn,bind:Kn},"/ai-artists":{render:lm,bind:cm},"/shield":{render:fm,bind:vm},"/vault":{render:jn,bind:Kn},"/merch":{render:bm,bind:ym},"/profile":{render:km,bind:wm},"/clippers":{render:$m,bind:xm},"/videos":{render:Tf,bind:Df},"/live":{render:Xm,bind:sh},"/viral-live":{render:rh,bind:oh},"/explore":{render:Bh,bind:Rh},"/marketplace":{render:dh,bind:ph},"/earnings":{render:Ah,bind:Ch},"/missions":{render:Lh,bind:Ih},"/pricing":{render:Mf,bind:Lf},"/admin":{render:Ku,bind:Fu},"/guidelines":{render:If},"/community":{render:_f,bind:qf},"/communities":{render:Yg,bind:Jg},"/signup":{render:Nf},"/messages":{render:bh,bind:yh},"/shop":{render:Ig,bind:Pg},"/profile-shop":{render:Eg,bind:Ag},"/giftbattles":{render:Qh,bind:Xh},"/notifications":{render:kh,bind:wh},"/fanclubs":{render:mg,bind:hg},"/wallet":{render:$h,bind:xh},"/loyalty":{render:gg,bind:fg},"/multiguest":{render:cg,bind:dg},"/openmic":{render:bg,bind:yg},"/launch":{render:Bf},"/phases":{render:Rf},"/share":{render:$f,bind:Ef},"/refer":{render:xf,bind:Af},"/spotlight":{render:Vg,bind:Ug},"/restream":{render:()=>(queueMicrotask(()=>{location.hash="/connect#connect-multistream"}),ga()),bind:fa},"/shorts":{render:tr,bind:sr},"/clips":{render:tr,bind:sr},"/connect":{render:ga,bind:fa},"/blockwars":{render:tf,bind:af},"/games":{render:nf,bind:of},"/dating":{render:lf,bind:cf},"/roast-arena":{render:vf,bind:ff}};function en(){var t,s,i;const e=document.getElementById("tabbar");if(M().user)try{Aa()}catch{}e.innerHTML=ya.map(a=>{const o="/"+a.href.replace(/^#/,"").replace(/^\//,"").split(/[?#]/)[0],r=l(a.label);return`<a${a.primary?' class="tab-primary"':""} href="${a.href}" data-path="${o}" aria-label="${r}"${a.href==="#/create"?' aria-haspopup="dialog" aria-controls="pikkCreateMenu" aria-expanded="false"':a.href==="#/music"?' aria-haspopup="dialog" aria-controls="pikkMusicMenu" aria-expanded="false"':ws[o.slice(1)]?` aria-haspopup="dialog" aria-controls="pikk${r}Menu" aria-expanded="false"`:""}><span class="tab-ico">${a.href==="#/create"?`<img class="pikk-create-logo-icon" src="${$t("/brand/pikk-create-play-cursor-blue.png")}" alt="" width="40" height="29" decoding="async" />`:ks[a.icon]||""}</span><span>${r}</span></a>`}).join("");for(const a of Object.keys(ws))(t=e.querySelector(`a[href="#/${a}"]`))==null||t.addEventListener("click",n=>{n.preventDefault(),hl(a,n.currentTarget)});(s=e.querySelector('a[href="#/music"]'))==null||s.addEventListener("click",a=>{a.preventDefault(),wt(),$l(a.currentTarget)}),(i=e.querySelector('a[href="#/create"]'))==null||i.addEventListener("click",a=>{var o;ds(),wt(),a.preventDefault();const n=Gf();n.hidden=!n.hidden,a.currentTarget.setAttribute("aria-expanded",String(!n.hidden)),n.hidden||(o=n.querySelector("[data-create-close]"))==null||o.focus()}),e.style.gridTemplateColumns="",e.classList.remove("tabbar-scroll"),e.classList.add("tabbar-reshaped","tabbar-fit7")}function cl(){return cr.map(e=>{const t=e.items.map(s=>{const i=`<span class="pikk-menu-icon" aria-hidden="true">${ks[s.icon]||ks.explore}</span><strong class="pikk-menu-title">${l(s.title)}</strong><small>${l(s.detail)}</small>`;return s.href?`<a href="${l(s.href)}" class="pikk-create-tile">${i}</a>`:`<div class="pikk-create-tile pikk-create-tile-planned" aria-disabled="true">${i}</div>`}).join("");return`<section class="pikk-create-menu-group" aria-label="${l(e.title)}"><h3>${l(e.title)}</h3><div class="pikk-create-options pikk-create-grid">${t}</div></section>`}).join("")}function Gf(){let e=document.getElementById("pikkCreateMenu");if(e)return e;e=document.createElement("div"),e.id="pikkCreateMenu",e.className="pikk-create-overlay",e.hidden=!0,e.innerHTML=`<div class="pikk-create-sheet" role="dialog" aria-modal="true" aria-label="Create on PIKK">
    <div class="pikk-create-head"><strong>Create on PIKK</strong><button type="button" class="btn ghost" data-create-close aria-label="Close create menu">✕</button></div>
    ${cl()}
    <button type="button" class="pikk-menu-cancel" data-create-close>Cancel</button>
    <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · uploads depend on available prototype tools</p>
  </div>`,document.body.appendChild(e);const t=(s=!1)=>{e.hidden=!0;const i=document.querySelector('#tabbar a[href="#/create"]');i==null||i.setAttribute("aria-expanded","false"),s&&(i==null||i.focus())};return window.addEventListener("hashchange",()=>t()),e.addEventListener("click",s=>{s.target===e||s.target.closest("[data-create-close]")?t(!0):s.target.closest(".pikk-create-options a")&&t()}),document.addEventListener("keydown",s=>{if(!e.hidden&&(s.key==="Escape"&&(s.preventDefault(),t(!0)),s.key==="Tab")){const i=[...e.querySelectorAll("a[href], button:not([disabled])")],a=i[0],n=i[i.length-1];if(!a){s.preventDefault();return}e.contains(document.activeElement)?s.shiftKey&&document.activeElement===a?(s.preventDefault(),n.focus()):!s.shiftKey&&document.activeElement===n&&(s.preventDefault(),a.focus()):(s.preventDefault(),(s.shiftKey?n:a).focus())}}),e}function Vf(){const e=document.getElementById("tabbar");if(!e)return;en();const t=Fe();Bo(e,t.path);try{dl()}catch{}}function Uf(){const e=document.getElementById("sideNav"),t=Fe(),s="#"+(t.raw||t.path),i="#"+t.path,a=Il().map(n=>{if(n.href)return`<a class="drawer-direct${n.href===i||n.href===s?" on":""}" href="${n.href}">${l(n.label)}</a>`;const o=n.links||[],r=o.some(m=>m.href===i||m.href===s),c=r?" open":"",d=r?" has-active":"",p=o.map(m=>m.href?`<a class="drawer-link${m.href===i||m.href===s?" on":""}" href="${m.href}">${l(m.label)}</a>`:`<span class="drawer-link drawer-soon" aria-disabled="true">${l(m.label)} <small>· ${l(/planned/i.test(m.detail||"")?"Planned":"Coming Soon")}</small></span>`).join("");return`<div class="drawer-group${c}${d}" data-group="${l(n.id)}"><button type="button" class="drawer-cat" aria-expanded="${r?"true":"false"}"><span>${l(n.label)}</span><span class="drawer-caret" aria-hidden="true"></span></button><div class="drawer-children" role="group">${p}</div></div>`}).join("");e.innerHTML=`<h2>PIKK Network</h2>${a}`}function hs(e,t=!1){Xp({drawer:document.getElementById("sideNav"),scrim:document.getElementById("scrim"),trigger:document.getElementById("menuBtn")},e,t)}function Hf(e){const t=e.path;en(),Bo(document.getElementById("tabbar"),t),document.querySelectorAll("#sideNav a").forEach(n=>{const o=n.getAttribute("href")||"";n.classList.toggle("on",o==="#"+t||o==="#"+e.raw)});const s="#"+t,i="#"+e.raw;document.querySelectorAll("#sideNav .drawer-group").forEach(n=>{const o=[...n.querySelectorAll("a")].some(c=>c.getAttribute("href")===s||c.getAttribute("href")===i);n.classList.toggle("open",o),n.classList.toggle("has-active",o);const r=n.querySelector(".drawer-cat");r&&r.setAttribute("aria-expanded",o?"true":"false")});const a=document.getElementById("headerMsg");if(a&&(a.hidden=!1),M().user)try{Aa()}catch{}dl()}function dl(){const e=document.getElementById("headerMsgBadge"),t=document.getElementById("headerMsg");if(!e||!t)return;let s=0;try{s=it()}catch{s=0}if(s>0){const i=s>99?"99+":String(s);e.textContent=i,e.hidden=!1,t.setAttribute("aria-label",`Messages, ${s} unread`)}else e.textContent="",e.hidden=!0,t.setAttribute("aria-label","Messages")}function zf(e){var a;hs(!1);const t=document.getElementById("app"),s=Ff[e.path],i=s?s.render(e):jf(e.path);t.innerHTML=i,No(t),(a=s==null?void 0:s.bind)==null||a.call(s,t),Co(t),Hf(e),Qp(e,t,document.getElementById("pikkRouteAnnouncer")),Fp(e.path),window.scrollTo(0,0),(e.path==="/music"||e.path==="/vault")&&(location.hash.includes("vault")||e.path==="/vault")&&setTimeout(()=>{var n;return(n=document.getElementById("vault"))==null?void 0:n.scrollIntoView({behavior:"smooth"})},50),e.path==="/pricing"&&(location.hash.includes("focus=sell")||location.hash.includes("creator-sell"))&&setTimeout(()=>{var n;return(n=document.getElementById("creator-sell"))==null?void 0:n.scrollIntoView({behavior:"smooth",block:"start"})},50),e.path==="/wallet"&&(e.elementId==="wallet-coins"||e.query.section==="coins"||location.hash.includes("wallet-coins"))&&setTimeout(()=>{var n;return(n=document.getElementById("wallet-coins"))==null?void 0:n.scrollIntoView({behavior:"smooth",block:"start"})},50),e.path==="/live"&&(e.query.go==="1"||e.elementId==="live-go"||location.hash.includes("go=1"))&&setTimeout(()=>{var n;return(n=document.getElementById("live-go"))==null?void 0:n.scrollIntoView({behavior:"smooth",block:"start"})},50)}function Wf(){if(new URLSearchParams(location.search).has("holdSplash"))return;const e=document.getElementById("splash");!e||e.classList.contains("hide")||(e.classList.add("hide"),Fl(),setTimeout(()=>e.remove(),500))}function Yf(){const e=document.getElementById("splashChime");if(!e)return;const t=()=>{const i=e.play();i&&typeof i.catch=="function"&&i.catch(()=>{})};t();const s=()=>{t(),window.removeEventListener("pointerdown",s),window.removeEventListener("keydown",s)};window.addEventListener("pointerdown",s,{once:!0}),window.addEventListener("keydown",s,{once:!0})}function Jf(){window.addEventListener("dbs:interrupt-music",e=>{var s;const t=((s=e==null?void 0:e.detail)==null?void 0:s.reason)||"route";qs(t)}),window.addEventListener("dbs:resume-music",e=>{var s;const t=(s=e==null?void 0:e.detail)==null?void 0:s.reason;t==="live"?Po():t==="video"?Ze():Io(t)})}function Qf(){window.addEventListener("dbs:messages-unread",()=>{try{Vf()}catch{}})}function Xf(){var e;if((e=document.getElementById("pikkSkipContent"))==null||e.addEventListener("click",()=>{var t;(t=document.getElementById("app"))==null||t.focus()}),gr(),No(document),en(),Uf(),Kp(),Jf(),Qf(),document.getElementById("menuBtn").addEventListener("click",()=>hs(!0)),document.getElementById("scrim").addEventListener("click",()=>hs(!1,!0)),document.addEventListener("keydown",t=>{var s;t.key!=="Escape"||!((s=document.getElementById("sideNav"))!=null&&s.classList.contains("open"))||(t.preventDefault(),hs(!1,!0))}),document.getElementById("sideNav").addEventListener("click",t=>{const s=t.target.closest(".drawer-cat");if(s){t.preventDefault();const i=s.closest(".drawer-group"),a=!i.classList.contains("open");document.querySelectorAll("#sideNav .drawer-group").forEach(n=>{const o=a&&n===i;n.classList.toggle("open",o);const r=n.querySelector(".drawer-cat");r&&r.setAttribute("aria-expanded",o?"true":"false")});return}t.target.closest("a")&&hs(!1)}),document.getElementById("notifBtn").addEventListener("click",()=>{location.hash="/notifications"}),Wp(zf),Yp(),!Gl()&&!new URLSearchParams(location.search).has("holdSplash")){const t=document.getElementById("splash");t&&t.remove()}else{Yf();let t=!1;setTimeout(()=>{t||(t=!0,Wf())},3e3)}}Xf();const tn=".pikk-menu-planned, .pikk-create-tile-planned, .drawer-soon, .pikk-notif-planned, [data-coming-soon]";function pl(e){var s,i;const t=(((s=e.querySelector(".pikk-menu-title, strong"))==null?void 0:s.textContent)||((i=e.firstChild)==null?void 0:i.textContent)||"").trim();g(t?`${t} · Coming Soon`:"Coming Soon")}document.addEventListener("click",e=>{var s,i;const t=(i=(s=e.target).closest)==null?void 0:i.call(s,tn);t&&(e.preventDefault(),pl(t))});document.addEventListener("keydown",e=>{var s,i;if(e.key!=="Enter"&&e.key!==" ")return;const t=(i=(s=e.target).closest)==null?void 0:i.call(s,tn);t&&(e.preventDefault(),pl(t))});new MutationObserver(()=>{document.querySelectorAll(tn).forEach(e=>{e.hasAttribute("tabindex")||(e.setAttribute("tabindex","0"),e.setAttribute("role","button"))})}).observe(document.body,{childList:!0,subtree:!0});document.addEventListener("click",e=>{var s,i;const t=(i=(s=e.target).closest)==null?void 0:i.call(s,".pikk-home-circle-strip .pikk-home-circle");t&&Ga("story:"+(t.getAttribute("href")||t.textContent.trim()),{kind:"story",opened:!0,source:t.closest("[data-promoted]")?"promote":"organic"})});
