(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function s(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(a){if(a.ep)return;a.ep=!0;const n=s(a);fetch(a.href,n)}})();function Yn(e,t=Date.now()){const s=new URL(e);return s.searchParams.set("refresh",String(t)),s.toString()}var Wn;(Wn=document.getElementById("pikk-refresh-link"))==null||Wn.addEventListener("click",function(e){e.preventDefault(),window.location.assign(Yn(window.location.href))});const Vo={BASE_URL:"/pikk-app/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_BASE:"/pikk-app/",VITE_BUILD_SHA:"e3289fe14c167c284a1b3e6600334d78b63ba589"},us=Object.freeze([{name:"Block Wars",players:"1–2",icon:"🥊",theme:"fighters",artwork:"/games/approved/01_block_wars.jpg",description:"City-based fighters, combos and special moves.",href:"#/blockwars"},{name:"PIKK Playground",players:"1–8",icon:"🎈",theme:"playground",artwork:"/games/approved/02_pikk_playground.jpg",description:"Create your character, race, jump and explore with friends."},{name:"PIKK Clash",players:"1",icon:"💎",theme:"clash",artwork:"/games/approved/03_pikk_clash.jpg",description:"Original neighborhood-themed match puzzles and venue upgrades."},{name:"PIKK Knockout",players:"1",icon:"💥",theme:"knockout",artwork:"/games/approved/04_pikk_knockout.jpg",description:"Stylized physics challenges: launch, bounce and knock targets off moving platforms."},{name:"PIKK Bowling",players:"1–4",icon:"🎳",theme:"bowling",artwork:"/games/approved/05_pikk_bowling.jpg",description:"Compete for strikes, spares and high scores."},{name:"PIKK Pickleball",players:"2–4",icon:"🏓",theme:"pickleball",artwork:"/games/approved/06_pikk_pickleball.jpg",description:"Play singles or doubles on colorful courts."},{name:"PIKK Pool",players:"1–2",icon:"🎱",theme:"pool",artwork:"/games/approved/07_pikk_pool.jpg",description:"Play 8-ball pool against friends or the computer."},{name:"PIKK Cup Pong",players:"2–4",icon:"🥤",theme:"pong",artwork:"/games/approved/08_pikk_cup_pong.jpg",description:"Aim, throw and eliminate opponents’ cups."},{name:"PIKK Poker",players:"2–8",icon:"♠️",theme:"poker",artwork:"/games/approved/09_pikk_poker.jpg",description:"Social Texas Hold’em with nonredeemable Play Chips."},{name:"PIKK Blackjack",players:"1–5",icon:"🃏",theme:"blackjack",artwork:"/games/approved/10_pikk_blackjack.jpg",description:"Try for 21 against the dealer using Play Chips."},{name:"PIKK Slots",players:"1",icon:"🎰",theme:"slots",artwork:"/games/approved/11_pikk_slots.jpg",description:"Entertainment-only reels and virtual Play Chips."},{name:"PIKK Speed",players:"2",icon:"⚡",theme:"speed",artwork:"/games/approved/12_pikk_speed.jpg",description:"Race to play your cards before your opponent."},{name:"PIKK Spades",players:"4",icon:"♠",theme:"spades",artwork:"/games/approved/13_pikk_spades.jpg",description:"Partner strategy and card battles."},{name:"PIKK Dominoes",players:"2–4",icon:"🁢",theme:"dominoes",artwork:"/games/approved/14_pikk_dominoes.jpg",description:"Match tiles and outplay opponents."},{name:"PIKK Chess",players:"2",icon:"♟",theme:"chess",artwork:"/games/approved/15_pikk_chess.jpg",description:"Challenge opponents in a classic strategy game."}]);function Ys(e){return e!=null&&e.artwork?(Vo&&"/pikk-app/"||"/").replace(/\/?$/,"/")+String(e.artwork).replace(/^\/+/,""):""}let Ya;function h(e){const t=document.getElementById("toast");t&&(t.textContent=e,t.classList.add("show"),clearTimeout(Ya),Ya=setTimeout(()=>t.classList.remove("show"),2400))}function l(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function F(e){const t=Math.max(0,Math.floor((Date.now()-e)/1e3));if(t<60)return t+"s";const s=Math.floor(t/60);if(s<60)return s+"m";const i=Math.floor(s/60);return i<24?i+"h":Math.floor(i/24)+"d"}function _(e,t,s={}){let i="";if(s.badgeHtml)i=s.badgeHtml;else if(s.badge){const n=l(s.badge),o=s.badgeAria?` aria-label="${l(s.badgeAria)}"`:"",r=s.badgeTitle||s.badgeAria?` title="${l(s.badgeTitle||s.badgeAria)}"`:"";s.badgeHref?i=`<a class="badge-phase"${o}${r} href="${l(s.badgeHref)}">${n}</a>`:i=`<span class="badge-phase"${o}${r}>${n}</span>`}const a=s.lead?`<p class="lead">${s.lead}</p>`:"";return`
    <section class="page">
      <header class="page-head">
        <h1>${l(e)} ${i}</h1>
        ${a}
      </header>
      ${t}
    </section>
  `}const ms={heart:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.5c0 4.6-8.8 10.4-8.8 10.4S3.2 13.1 3.2 8.5a4.5 4.5 0 0 1 8.8-1.2 4.5 4.5 0 0 1 8.8 1.2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',home:'<svg viewBox="0 0 24 24"><path d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5z" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',posts:'<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 10h8M8 14h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',camera:'<svg viewBox="0 0 24 24"><path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h2.1l1.2-1.8A1.5 1.5 0 0 1 11 3.5h2a1.5 1.5 0 0 1 1.2.7L15.4 6h2.1A2.5 2.5 0 0 1 20 8.5v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-8z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="12.5" r="3.2" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',music:'<svg viewBox="0 0 24 24"><path d="M9 18V6l10-2v12" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="7" cy="18" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="16" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',merch:'<svg viewBox="0 0 24 24"><path d="M6 8h12l1 12H5L6 8zm3-3a3 3 0 0 1 6 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',explore:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m20 20-3.5-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',live:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" fill="currentColor"/><circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.2" opacity=".5"/></svg>',profile:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 19a7 7 0 0 1 14 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',videos:'<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10 9.5v5l5-2.5-5-2.5z" fill="currentColor"/></svg>',chat:'<svg viewBox="0 0 24 24"><path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v5A2.5 2.5 0 0 1 16.5 14H11l-3.5 3v-3H7.5A2.5 2.5 0 0 1 5 11.5v-5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 17.5V19a1 1 0 0 0 1.5.85L14 17h2.5" fill="none" stroke="currentColor" stroke-width="1.6" opacity=".55"/></svg>',msg:'<svg viewBox="0 0 24 24"><rect x="3.5" y="6" width="17" height="12" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m4.5 7.5 7.5 5.2L19.5 7.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',game:'<svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="11" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 13h2.5M9.25 11.5v3M15.2 12.2h.01M17.3 14.2h.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M9 8V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V8" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>'};function We(e,t="rel=0"){const s=String(e||"").trim();if(!s)return"";const i=s.includes("?")?"&":"?";return`${s}${i}${t}`}const hs=Object.freeze({videos:[{title:"Video Feed",href:"#/videos",detail:"Watch and discover videos",icon:"▶"},{title:"Shorts & Reels",href:"#/shorts",detail:"Browse short-form clips",icon:"▣"},{title:"Posts",href:"#/posts",detail:"View the community feed",icon:"▤"},{title:"Upload Video",href:"#/posts?type=video",detail:"Available prototype publishing tools · TEST MODE",icon:"⇧"},{title:"24/7 Viral Live",href:"#/viral-live",detail:"Rotating viral clips · preview",icon:"◉"},{title:"Spotlight",href:"#/spotlight",detail:"Featured creators · preview",icon:"✦"},{title:"Clippers",href:"#/clippers",detail:"Clip creators · TEST MODE",icon:"✂"},{title:"Stories",detail:"24-hour stories · Coming Soon",icon:"◌"},{title:"Premieres",detail:"Video premieres · Coming Soon",icon:"▶"}],connect:[{title:"Connect",href:"#/connect",detail:"Discover people and communities",icon:"♧"},{title:"PIKK Communities",href:"#/communities",detail:"Topic discussions, votes and replies · TEST MODE",icon:"#"},{title:"Communities",href:"#/community",detail:"Explore PIKK Lounge channel rooms",icon:"☷"},{title:"Messages",href:"#/messages",detail:"Open your messages",icon:"✉"},{title:"Random Chat",href:"#/connect#connect-random-chat",detail:"Preview only · real matching unavailable",icon:"◉"},{title:"Multistream",href:"#/connect#connect-multistream",detail:"Broadcast connection preview · TEST MODE",icon:"▹"},{title:"Explore",href:"#/explore",detail:"Search people, music, videos, live",icon:"⌕"},{title:"Live Rooms",href:"#/live",detail:"Live room directory · TEST MODE",icon:"●"},{title:"Fan Clubs",href:"#/fanclubs",detail:"Creator fan clubs · TEST MODE",icon:"♛"},{title:"Party Line",href:"#/multiguest",detail:"Multi-guest rooms · preview",icon:"☎"},{title:"Notifications",href:"#/notifications",detail:"Your activity",icon:"🔔"},{title:"City Connect",detail:"City-based rooms · Coming Soon",icon:"⌂"},{title:"Events",detail:"Community events · Coming Soon",icon:"◷"}],dating:[{title:"Discover Dating",href:"#/dating",detail:"Explore dating features · TEST MODE",icon:"♡"},{title:"Messages",href:"#/messages",detail:"Open private messages",icon:"✉"},{title:"My Profile",href:"#/profile",detail:"Review your profile settings",icon:"◉"},{title:"Safety Guidelines",href:"#/guidelines",detail:"Review community safety rules",icon:"◇"},{title:"Matches",detail:"Mutual matches · Coming Soon",icon:"♥"},{title:"Liked You",detail:"Who liked you · Coming Soon",icon:"♡"},{title:"Age & ID Verification",detail:"18+ identity checks · Coming Soon",icon:"✓"},{title:"Report & Block",href:"#/shield",detail:"PIKK Shield safety tools · TEST MODE",icon:"⚑"}],games:[{title:"PIKK Arcade",href:"#/games",detail:"View the full game collection · preview",icon:"♜"},...us.map(e=>({title:e.name,...e.href?{href:e.href}:{},detail:e.href?"Fighting game · development preview":e.description+" · planned",icon:e.name==="Block Wars"?"▣":"♜"})),{title:"Roast Arena",href:"#/roast-arena",detail:"Roast battles · preview",icon:"🔥"},{title:"Gift Battles",href:"#/giftbattles",detail:"Live gift battles · TEST MODE",icon:"⚔"},{title:"Missions",href:"#/missions",detail:"Daily missions · TEST MODE",icon:"★"},{title:"Loyalty Rewards",href:"#/loyalty",detail:"Play Chips & rewards · no cash value",icon:"◆"}],shop:[{title:"PIKK Shop",href:"#/shop",detail:"Browse available products",icon:"▤"},{title:"Marketplace",href:"#/marketplace",detail:"Community listings · TEST MODE",icon:"◇"},{title:"Foreign X-Change",href:"#/merch",detail:"Official merchandise",icon:"✦"},{title:"Creator Pricing",href:"#/pricing",detail:"Explore creator selling information",icon:"$"},{title:"Profile Shop",href:"#/profile-shop",detail:"Creator storefront · preview",icon:"▦"},{title:"Wallet",href:"#/wallet",detail:"Balance & activity · TEST MODE",icon:"◎"},{title:"Sell on PIKK",href:"#/pricing?focus=sell",detail:"Seller rules & apply · TEST MODE",icon:"⇧"},{title:"Orders & Shipping",detail:"Order tracking · Coming Soon",icon:"⛟"},{title:"Refunds",detail:"Returns & disputes · Coming Soon",icon:"↺"}]}),Uo=Object.freeze({"Video Feed":"videos","Shorts & Reels":"videos",Posts:"posts","Upload Video":"videos",Connect:"profile","PIKK Communities":"chat",Communities:"chat",Messages:"msg","Random Chat":"camera",Multistream:"live","Discover Dating":"heart","My Profile":"profile","Safety Guidelines":"heart","PIKK Arcade":"game","PIKK Speed":"game","PIKK Blackjack":"game","PIKK Slots":"game","PIKK Poker":"game","PIKK Spades":"game","PIKK Dominoes":"game","PIKK Chess":"game","PIKK Clash":"game","PIKK Knockout":"game","PIKK Playground":"game","PIKK Bowling":"game","PIKK Pickleball":"game","PIKK Pool":"game","PIKK Cup Pong":"game","Block Wars":"game","24/7 Viral Live":"live",Spotlight:"videos",Clippers:"videos",Stories:"camera",Premieres:"videos",Explore:"explore","Live Rooms":"live","Fan Clubs":"heart","Party Line":"chat",Notifications:"msg","City Connect":"explore",Events:"explore",Matches:"heart","Liked You":"heart","Age & ID Verification":"profile","Report & Block":"heart","Roast Arena":"game","Gift Battles":"live",Missions:"game","Loyalty Rewards":"game","Profile Shop":"merch",Wallet:"merch","Sell on PIKK":"merch","Orders & Shipping":"merch",Refunds:"merch","PIKK Shop":"merch",Marketplace:"merch","Foreign X-Change":"merch","Creator Pricing":"posts"}),Jn={videos:"pikkVideosMenu",connect:"pikkConnectMenu",dating:"pikkDatingMenu",games:"pikkGamesMenu",shop:"pikkShopMenu"};function vt(e=!1){for(const[t,s]of Object.entries(Jn)){const i=document.getElementById(s);if(!i||i.hidden)continue;i.hidden=!0;const a=document.querySelector(`#tabbar a[href="#/${t}"]`);a==null||a.setAttribute("aria-expanded","false"),e&&(a==null||a.focus())}}function Ho(e,t){var r,d,c;if(!Object.hasOwn(hs,e))return;const s=Jn[e];let i=document.getElementById(s);i||(i=document.createElement("div"),i.id=s,i.className="pikk-create-overlay",i.hidden=!0,i.innerHTML=`<div class="pikk-create-sheet" role="dialog" aria-modal="true" aria-labelledby="${s}Title">
      <div class="pikk-create-head"><strong id="${s}Title">${e[0].toUpperCase()+e.slice(1)} on PIKK</strong><button type="button" class="btn ghost" data-section-close aria-label="Close ${e} menu">✕</button></div>
      <div class="pikk-create-options pikk-create-grid">${hs[e].map(p=>{const m=`<span class="pikk-menu-icon" aria-hidden="true">${ms[Uo[p.title]||"explore"]}</span><strong class="pikk-menu-title">${p.title}</strong><small>${p.detail}</small>`;return p.href?`<a class="pikk-create-tile" href="${p.href}">${m}</a>`:`<div class="pikk-create-tile pikk-menu-planned" aria-disabled="true">${m}</div>`}).join("")}</div>
      <button type="button" class="pikk-menu-cancel" data-section-close>Cancel</button>
      <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · Production features are not enabled until secure services are available.</p>
    </div>`,document.body.appendChild(i),i.addEventListener("click",p=>{p.target===i||p.target.closest("[data-section-close]")?vt(!0):p.target.closest(".pikk-create-options a")&&vt()}),document.addEventListener("keydown",p=>{if(i.hidden)return;if(p.key==="Escape"){p.preventDefault(),vt(!0);return}if(p.key!=="Tab")return;const m=[...i.querySelectorAll("button:not([disabled]), a[href]")],g=m[0],f=m[m.length-1];if(!g){p.preventDefault();return}i.contains(document.activeElement)?p.shiftKey&&document.activeElement===g?(p.preventDefault(),f.focus()):!p.shiftKey&&document.activeElement===f&&(p.preventDefault(),g.focus()):(p.preventDefault(),(p.shiftKey?f:g).focus())}),window.addEventListener("hashchange",()=>vt()));const a=i.hidden;vt();const n=document.getElementById("pikkMusicMenu");n&&!n.hidden&&(n.hidden=!0,(r=document.querySelector('#tabbar a[href="#/music"]'))==null||r.setAttribute("aria-expanded","false"));const o=document.getElementById("pikkCreateMenu");o&&!o.hidden&&(o.hidden=!0,(d=document.querySelector('#tabbar a[href="#/create"]'))==null||d.setAttribute("aria-expanded","false")),i.hidden=!a,t==null||t.setAttribute("aria-expanded",String(a)),a?(c=i.querySelector("[data-section-close]"))==null||c.focus():t==null||t.focus()}const Qn=Object.freeze([{title:"Create on PIKK",items:[{title:"Post Photos",href:"#/posts?type=picture",detail:"Add photos · TEST MODE",icon:"camera"},{title:"Story",detail:"24-hour stories · Planned",icon:"camera"},{title:"Shorts / Reels",href:"#/posts?type=short",detail:"Short video · TEST MODE",icon:"videos"},{title:"Upload Video",href:"#/posts?type=video",detail:"Long video · TEST MODE",icon:"videos"},{title:"Create Post",href:"#/posts?type=text",detail:"Text / poll / link · TEST MODE",icon:"posts"},{title:"Go Live",href:"#/live?go=1",detail:"Start a stream · TEST MODE",icon:"live"},{title:"Upload Music",href:"#/music?view=upload",detail:"Beat / song · planned",icon:"music"},{title:"Sell Something",href:"#/marketplace",detail:"List a product · TEST MODE",icon:"merch"},{title:"Paid Content",href:"#/pricing",detail:"Premium creator content · planned",icon:"merch"}]},{title:"Social & Community",items:[{title:"Community Post",href:"#/community",detail:"Open community · preview",icon:"chat"},{title:"Reels",href:"#/posts?type=short",detail:"Short video · TEST MODE",icon:"videos"},{title:"Photo Post",href:"#/posts?type=picture",detail:"Photos · TEST MODE",icon:"camera"},{title:"Create Poll",detail:"Interactive polls · Planned",icon:"posts"},{title:"Create Community",href:"#/community",detail:"Community area · preview",icon:"chat"},{title:"Create Chatroom",detail:"Room creation · Planned",icon:"msg"},{title:"Create Event",detail:"Events · Planned",icon:"explore"}]},{title:"Videos & Music",items:[{title:"Music Video",href:"#/posts?type=video",detail:"Video composer · TEST MODE",icon:"videos"},{title:"Short Video",href:"#/posts?type=short",detail:"Short composer · TEST MODE",icon:"videos"},{title:"Upload Song",detail:"Song publishing · Planned",icon:"music"},{title:"Upload Album",detail:"Album publishing · Planned",icon:"music"},{title:"Upload EP",detail:"EP publishing · Planned",icon:"music"},{title:"Upload Beats",detail:"Beat publishing · Planned",icon:"music"},{title:"Create Playlist",href:"#/music",detail:"Open music area · preview",icon:"music"},{title:"Add to Vault",href:"#/vault",detail:"Open Vault · preview",icon:"music"}]},{title:"Live & Commerce",items:[{title:"Schedule Live",detail:"Live scheduling · Planned",icon:"live"},{title:"Live Battle",href:"#/giftbattles",detail:"Battle area · preview",icon:"live"},{title:"List Product",href:"#/marketplace",detail:"Marketplace · TEST MODE",icon:"merch"},{title:"Seller Store",detail:"Store creation · Planned",icon:"merch"},{title:"Exclusive Content",detail:"Exclusive publishing · Planned",icon:"heart"}]},{title:"Creator Tools & Protection",items:[{title:"Creator Dashboard",href:"#/profile",detail:"Creator profile",icon:"profile"},{title:"Manage Content",href:"#/posts",detail:"Posts and content",icon:"posts"},{title:"Drafts",detail:"Draft management · Planned",icon:"posts"},{title:"Artist Protection",href:"#/shield",detail:"PIKK Shield local rights drafts · TEST MODE",icon:"music"},{title:"AI Support",detail:"Support assistant · Planned",icon:"chat"}]}]),zo=Object.freeze(Qn.flatMap(e=>e.items)),ge=[{id:"dirty-money",title:"Dirty Money ft. Lil Baby",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=-rHDLWfiuDI",embed:"https://www.youtube.com/embed/-rHDLWfiuDI"},{id:"93",title:"93 ft. DaBaby",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=zC0BYFxs5W0",embed:"https://www.youtube.com/embed/zC0BYFxs5W0"},{id:"no-love",title:"No Love ft. YFN Lucci",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=6pCVEIE9pB8",embed:"https://www.youtube.com/embed/6pCVEIE9pB8"},{id:"bouquet",title:"Bouquet",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=DTe4OiX2otg",embed:"https://www.youtube.com/embed/DTe4OiX2otg"},{id:"where-im-from",title:"Where I'm From ft. Tee Grizzley",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=BH7_Ttk86eQ",embed:"https://www.youtube.com/embed/BH7_Ttk86eQ"},{id:"gang-ties",title:"Gang Ties",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=0ikbrk901Kc",embed:"https://www.youtube.com/embed/0ikbrk901Kc"},{id:"go-2-work",title:"Go 2 Work",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=gRq8c2i4ESM",embed:"https://www.youtube.com/embed/gRq8c2i4ESM"},{id:"ramen-noodles",title:"Ramen Noodles",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=YNCdtAC273M",embed:"https://www.youtube.com/embed/YNCdtAC273M"},{id:"men-in-blacc",title:"Men In Blacc",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=MKyw-hzxQWY",embed:"https://www.youtube.com/embed/MKyw-hzxQWY"},{id:"king-city",title:"King City",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=wyNJYUqpRFM",embed:"https://www.youtube.com/embed/wyNJYUqpRFM"},{id:"in-her-bag",title:"In Her Bag",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=Dux8rm-pzRg",embed:"https://www.youtube.com/embed/Dux8rm-pzRg"},{id:"lonely",title:"Lonely",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=IVnDjPJ8dRg",embed:"https://www.youtube.com/embed/IVnDjPJ8dRg"},{id:"they-aint-coming-home",title:"They Ain't Coming Home",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=Yi4uBFkn0-o",embed:"https://www.youtube.com/embed/Yi4uBFkn0-o"},{id:"mind-on-a-licc",title:"Mind On A Licc",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=sADinuRcRr4",embed:"https://www.youtube.com/embed/sADinuRcRr4"},{id:"dbs-mix",title:"DatBoiSkeet Mix",artist:"DatBoiSkeet",category:"Mixes",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t",embed:"https://www.youtube.com/embed/videoseries?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t",openLink:"https://www.youtube.com/playlist?list=RDEMDYIvPhQWVGU3Zf3gcxT_4w"},{id:"on-the-radar",title:"On The Radar Interview — Talk of The Town",artist:"DatBoiSkeet",category:"Interviews",youtube:"https://www.youtube.com/watch?v=6IFiHo5HrdE",embed:"https://www.youtube.com/embed/6IFiHo5HrdE"}],ca=[{id:"dbs-mix",title:"DatBoiSkeet Mix",blurb:"Official channel Music Videos playlist embed (stable). YouTube Radio Mix link kept as Play on YouTube — RD mixes often fail to embed.",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t",embed:"https://www.youtube.com/embed/videoseries?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t",openLink:"https://www.youtube.com/playlist?list=RDEMDYIvPhQWVGU3Zf3gcxT_4w",source:"channel-pl-music-videos + user-t96u openLink"}],Hi=[{id:"pl-music-videos",title:"DatBoiSkeet Music Videos",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t"},{id:"pl-interviews",title:"DatBoiSkeet Interviews",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQHoRjRTD58TpLGqm0XMsa7U"},{id:"pl-vlogs",title:"DatBoiSkeet Vlogs",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQEqroQ8LYGLgpDfzK3pyutQ"}],Wo=[{category:"Interviews",title:"Off The Porch (no verified DatBoiSkeet YouTube URL yet — add via Admin)"},{category:"Behind the Scenes",title:"BTS clips (coming soon)"},{category:"Exclusive Videos",title:"Vault / member exclusives (coming soon)"}],ue={youtube:"https://www.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA",youtubeHandle:"https://www.youtube.com/@DatBoiSkeet1",youtubeMusic:"https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA",spotify:"https://open.spotify.com/artist/0Po64h8VleQOR97okM68zh",apple:"https://music.apple.com/us/artist/datboiskeet/1270542870"},tt=[{id:"stream-dirty-money",title:"Dirty Money (feat. Lil Baby)",artist:"DatBoiSkeet",type:"single",year:2018,albumNote:"From Broke Is the Root of All Evil",cover:"https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2a/7a/67/2a7a676e-af85-489e-55fd-2bae2793948b/datboiskeet-bitroae-cover-3000px.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/track/17Pw88uBIWpgOVCfhEyszG",apple:"https://music.apple.com/us/song/dirty-money-feat-lil-baby/1395681218",youtubeMusic:"https://music.youtube.com/watch?v=-rHDLWfiuDI",youtube:"https://www.youtube.com/watch?v=-rHDLWfiuDI"}},{id:"stream-93",title:"93 (feat. DaBaby)",artist:"DatBoiSkeet",type:"single",year:2019,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/19/60/5f/19605f4c-7014-6dbc-ca18-baa2a672c697/194923194110.png/600x600bb.jpg",links:{spotify:"https://open.spotify.com/track/3gKwZybDOkUoz2wXquDHVZ",apple:"https://music.apple.com/us/album/93-feat-da-baby-single/1493456214",youtubeMusic:"https://music.youtube.com/watch?v=zC0BYFxs5W0",youtube:"https://www.youtube.com/watch?v=zC0BYFxs5W0"}},{id:"stream-no-love",title:"No Love (feat. YFN Lucci)",artist:"DatBoiSkeet",type:"single",year:2017,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/49/e5/62/49e56292-e427-3992-84bd-ead0b06fb06a/artwork.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/track/2KqnCXMM0lAMlEv1fDN63o",apple:"https://music.apple.com/us/album/no-love-feat-yfn-lucci-single/1317778810",youtubeMusic:"https://music.youtube.com/watch?v=6pCVEIE9pB8",youtube:"https://www.youtube.com/watch?v=6pCVEIE9pB8"}},{id:"stream-broke",title:"Broke Is the Root of All Evil",artist:"DatBoiSkeet",type:"album",year:2018,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2a/7a/67/2a7a676e-af85-489e-55fd-2bae2793948b/datboiskeet-bitroae-cover-3000px.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/album/51j6ReXYreCDV0ZwtPdj1Q",apple:"https://music.apple.com/us/album/broke-is-the-root-of-all-evil/1395680910",youtubeMusic:"https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA"}},{id:"stream-talk",title:"Talk of the Town",artist:"DatBoiSkeet",type:"album",year:2020,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/f6/0d/a0/f60da0bf-c3de-8b12-5cd8-e8c1d3c2053b/artwork.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/album/4OY5rM0TBPDsC4n8Dka4Gr",apple:"https://music.apple.com/us/album/talk-of-the-town/1541180619",youtubeMusic:"https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA"}},{id:"stream-said-you-love-me",title:"Said You Love Me",artist:"DatBoiSkeet",type:"single",year:2025,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/f4/4f/6b/f44f6b18-dff9-0486-e6e6-a615724e02fe/artwork.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/album/7FhoRIzhuGgmt2pZlWMc5c",apple:"https://music.apple.com/us/album/said-you-love-me-single/1835164001",youtubeMusic:"https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA"}}],It=[{id:"long-story-short",title:"Long Story Short",artist:"DatBoiSkeet",cover:"/music/01_Long_Story_Short_Coming_Soon.jpg",status:"Coming Soon",order:1},{id:"ladies-only",title:"Ladies Only",artist:"DatBoiSkeet",cover:"/music/02_Ladies_Only_Coming_Soon.jpg",status:"Coming Soon",order:2}],Yo=[{id:"vault-long-story-short",title:"Long Story Short (Vault Preview)",artist:"DatBoiSkeet",cover:"/music/01_Long_Story_Short_Coming_Soon.jpg",tier:"skeet+",status:"Coming Soon"},{id:"vault-ladies-only",title:"Ladies Only (Vault Exclusive)",artist:"DatBoiSkeet",cover:"/music/02_Ladies_Only_Coming_Soon.jpg",tier:"backstage",status:"Coming Soon"}],Ja=[{id:"long-story-short",title:"Long Story Short",artist:"DatBoiSkeet",cover:"/music/01_Long_Story_Short_Coming_Soon.jpg",price:1.29,status:"Coming Soon"},{id:"ladies-only",title:"Ladies Only",artist:"DatBoiSkeet",cover:"/music/02_Ladies_Only_Coming_Soon.jpg",price:1.29,status:"Coming Soon"}],Te=[{id:"hat-716-orange",name:"716 Buffalo Braves Snapback (Black/Orange)",price:30,category:"Hats",image:"/merch/01_black_orange_716_hat.jpeg",shopUrl:"https://foreignx-change.com"},{id:"hat-716-blue",name:"716 Buffalo Hat (Blue/Red)",price:30,category:"Hats",image:"/merch/02_blue_red_716_hat.jpeg",shopUrl:"https://foreignx-change.com"},{id:"jacket-blue",name:"Buffalo Sports Varsity Jacket (Blue/White)",price:200,category:"Jackets",image:"/merch/03_blue_buffalo_jacket.jpeg",shopUrl:"https://foreignx-change.com"},{id:"jacket-black",name:"Foreign X-Change Buffalo Varsity (Black/White)",price:200,category:"Jackets",image:"/merch/07_black_buffalo_jacket.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-fx-back",name:"Foreign X-Change Graphic Tee (Back)",price:65,category:"Shirts",image:"/merch/04_black_fx_tee_back_screenshot.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-fx-front",name:"Foreign X-Change Text Tee (Front)",price:65,category:"Shirts",image:"/merch/05_black_fx_tee_front_screenshot.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-ptsd",name:"PTSD Tee (Black)",price:65,category:"Shirts",image:"/merch/06_black_ptsd_tee.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-abstract",name:"Abstract FX Tee (White)",price:65,category:"Shirts",image:"/merch/08_white_abstract_fx_tee.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-dealer",name:"Support Your Local Dealer Tee (Navy)",price:65,category:"Shirts",image:"/merch/09_navy_dealer_tee.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-skulls",name:"Skulls FX Tee (White)",price:65,category:"Shirts",image:"/merch/10_white_skulls_tee.jpeg",shopUrl:"https://foreignx-change.com"}],Gs=[{id:"frame-chrome-crown",name:"Chrome Crown",category:"frames",rarity:"legendary",price:12.99,emoji:"👑"},{id:"frame-iced-out",name:"Iced Out",category:"frames",rarity:"epic",price:9.99,emoji:"💎"},{id:"frame-trap-flame",name:"Trap Flame",category:"frames",rarity:"epic",price:7.99,emoji:"🔥"},{id:"frame-rodeo-gold",name:"Rodeo Gold",category:"frames",rarity:"rare",price:5.99,emoji:"🤠"},{id:"frame-rose-petals",name:"Rose Petals",category:"frames",rarity:"rare",price:4.99,emoji:"🌹"},{id:"fx-bass-pulse",name:"Bass Pulse",category:"effects",rarity:"epic",price:8.99,emoji:"🎵"},{id:"fx-snowfall",name:"Snowfall",category:"effects",rarity:"rare",price:5.99,emoji:"❄️"},{id:"fx-city-lights",name:"City Lights",category:"effects",rarity:"epic",price:7.99,emoji:"🌃"},{id:"fx-holo-glitch",name:"Holographic Glitch",category:"effects",rarity:"legendary",price:14.99,emoji:"✨"},{id:"ban-skyline",name:"City Skyline",category:"banners",rarity:"rare",price:4.99,emoji:"🏙️"},{id:"ban-studio",name:"Studio Booth",category:"banners",rarity:"rare",price:4.99,emoji:"🎙️"},{id:"ban-arena",name:"Arena Lights",category:"banners",rarity:"epic",price:6.99,emoji:"🏟️"},{id:"ban-chrome",name:"Luxury Chrome",category:"banners",rarity:"legendary",price:11.99,emoji:"🪞"},{id:"name-chrome",name:"Chrome Name",category:"name styles",rarity:"epic",price:6.99,emoji:"🅰️"},{id:"name-neon",name:"Neon Name",category:"name styles",rarity:"rare",price:3.99,emoji:"💜"},{id:"name-varsity",name:"Bold Varsity",category:"name styles",rarity:"rare",price:3.99,emoji:"🏟️"},{id:"name-western",name:"Western Script",category:"name styles",rarity:"epic",price:5.99,emoji:"🏜️"},{id:"badge-dayone",name:"Day One (cosmetic style)",category:"badges",rarity:"rare",price:2.99,emoji:"1️⃣"},{id:"badge-topfan",name:"Top Fan (cosmetic style)",category:"badges",rarity:"epic",price:4.99,emoji:"⭐"},{id:"badge-backstage",name:"Backstage Glow",category:"badges",rarity:"epic",price:5.99,emoji:"🎫"}],Jo=[{id:"all",label:"All"},{id:"frames",label:"Frames"},{id:"effects",label:"Effects"},{id:"banners",label:"Banners"},{id:"name styles",label:"Name styles"},{id:"badges",label:"Badges"}],Xn=[{id:"skeet",name:"Skeet+",price:3.99,blurb:"Early DatBoiSkeet releases · basic Vault"},{id:"backstage",name:"Backstage",price:7.99,blurb:"Deeper Vault · studio lives · listening rooms"},{id:"inner",name:"Inner Circle",price:14.99,blurb:"VIP drops · private Q&As · Inner Circle rooms"}],Qo=[{label:"Long Story Short",src:"/music/01_Long_Story_Short_Coming_Soon.jpg"},{label:"Ladies Only",src:"/music/02_Ladies_Only_Coming_Soon.jpg"},{label:"716 Orange Hat",src:"/merch/01_black_orange_716_hat.jpeg"},{label:"716 Blue Hat",src:"/merch/02_blue_red_716_hat.jpeg"},{label:"Blue Jacket",src:"/merch/03_blue_buffalo_jacket.jpeg"},{label:"PTSD Tee",src:"/merch/06_black_ptsd_tee.jpeg"}],Xo=[{route:"/explore",title:"Explore",blurb:"Discover DatBoiSkeet · creators · drops"},{route:"/music",title:"Music",blurb:"Long Story Short · Ladies Only · Vault"},{route:"/videos",title:"Videos",blurb:"Official DatBoiSkeet MVs"},{route:"/posts",title:"Posts",blurb:"Text · Picture · Short · Video"},{route:"/shorts",title:"Shorts",blurb:"Under Posts · quick clips"},{route:"/live",title:"Live",blurb:"Go live · TEST MODE demo"},{route:"/shop",title:"PIKK Shop",blurb:"Foreign X-Change merch · external checkout"},{route:"/community",title:"PIKK Lounge",blurb:"Artist-owned rooms · Phase 2"},{route:"/music",title:"Vault",blurb:"Member exclusives · Coming Soon",hash:"vault"},{route:"/marketplace",title:"Marketplace",blurb:"Brand ads & sponsored offers"},{route:"/missions",title:"Missions",blurb:"Clipper promo campaigns"},{route:"/clippers",title:"Clippers",blurb:"Apply · cut clips · earn"}],Zn=[{id:"home",label:"Home",href:"#/home"},{id:"explore",label:"Explore",href:"#/explore"},{id:"profile",label:"Profile / Sign in",href:"#/profile"},{id:"watch",label:"Watch",links:[{href:"#/videos",label:"Videos"},{href:"#/live",label:"Live"},{href:"#/openmic",label:"Open Mic / Talent Discovery (24/7)"},{href:"#/spotlight",label:"Spotlight (24/7)"},{href:"#/multiguest",label:"Multi-Guest Live"}]},{id:"music",label:"Music",links:[{href:"#/music",label:"Music & Vault"}]},{id:"social",label:"Social",links:[{href:"#/posts",label:"Posts"},{href:"#/posts?compose=1",label:"Post · Text / Picture / Short / Video"},{href:"#/shorts",label:"Shorts (in Posts)"},{href:"#/notifications",label:"Notifications"},{href:"#/connect",label:"Connect"},{href:"#/dating",label:"Dating & Connections"},{href:"#/community",label:"Community / Lounge"}]},{id:"messages",label:"Messages",href:"#/messages"},{id:"games",label:"Games",links:[{href:"#/games",label:"PIKK Arcade · 15 Games Coming Soon"},{href:"#/blockwars",label:"Block Wars · Coming Soon"}]},{id:"shop",label:"Shop",links:[{href:"#/merch",label:"Foreign X-Change Merch"},{href:"#/marketplace",label:"Marketplace"},{href:"#/shop",label:"PIKK Shop"},{href:"#/profile-shop",label:"Profile Shop · cosmetics"}]},{id:"earn",label:"Creators & Earnings",links:[{href:"#/wallet",label:"Wallet"},{href:"#/earnings",label:"Creator Earnings"},{href:"#/missions",label:"Missions"},{href:"#/clippers",label:"Clippers Apply"},{href:"#/share",label:"Share & Earn"},{href:"#/refer",label:"Refer & Earn"},{href:"#/pricing",label:"Pricing (rules & fees)"}]},{id:"account",label:"Account",links:[{href:"#/profile",label:"Profile"},{href:"#/signup",label:"Signup / Creator Apps"},{href:"#/loyalty",label:"Loyalty Club"},{href:"#/fanclubs",label:"Fan Clubs"},{href:"#/guidelines",label:"Community Guidelines"}]},{id:"studio",label:"Studio / Owner",links:[{href:"#/admin",label:"Admin"},{href:"#/phases",label:"Development Phases"},{href:"#/launch",label:"Launch Readiness"}]}];Zn.flatMap(e=>e.href?[{href:e.href,label:e.label}]:e.links||[]);const da=[{href:"#/music",label:"Music",icon:"music"},{href:"#/videos",label:"Videos",icon:"videos"},{href:"#/connect",label:"Connect",icon:"profile"},{href:"#/create",label:"Create",icon:"live",primary:!0},{href:"#/dating",label:"Dating",icon:"heart"},{href:"#/games",label:"Games",icon:"game"},{href:"#/shop",label:"Shop",icon:"merch"}],er=Object.freeze([{label:"Songs",href:"#/music?view=songs",detail:"Browse released singles",icon:"♫"},{label:"Albums",href:"#/music?view=albums",detail:"Browse released albums",icon:"▣"},{label:"Beats",href:"#/music?view=beats",detail:"Beat marketplace not yet available",icon:"◉"},{label:"Playlists",href:"#/music?view=playlists",detail:"Verified YouTube playlists",icon:"▤"},{label:"Upload Music",href:"#/music?view=upload",detail:"Creator uploads coming later",icon:"⇧"},{label:"Trending",href:"#/music?view=songs",detail:"Most-played released songs",icon:"↗"},{label:"Music Vault",href:"#/vault",detail:"Vault · preview",icon:"◈"},{label:"AI Artists",href:"#/ai-artists",detail:"AI artist area · labelled AI",icon:"✦"},{label:"Open Mic",href:"#/openmic",detail:"Open mic sessions · TEST MODE",icon:"🎤"},{label:"Artist Earnings",href:"#/earnings",detail:"Creator earnings · TEST MODE",icon:"$"}]),Zo=Object.freeze({Songs:"music",Albums:"music",Beats:"music",Playlists:"videos","Upload Music":"music"});function is(e=!1){const t=document.getElementById("pikkMusicMenu");if(!t||t.hidden)return;t.hidden=!0;const s=document.querySelector('#tabbar a[href="#/music"]');s==null||s.setAttribute("aria-expanded","false"),e&&(s==null||s.focus())}function el(){let e=document.getElementById("pikkMusicMenu");return e||(e=document.createElement("div"),e.id="pikkMusicMenu",e.className="pikk-create-overlay",e.hidden=!0,e.innerHTML=`<div class="pikk-create-sheet" role="dialog" aria-modal="true" aria-labelledby="pikkMusicMenuTitle">
    <div class="pikk-create-head"><strong id="pikkMusicMenuTitle">Music on PIKK</strong><button type="button" class="btn ghost" data-music-close aria-label="Close music menu">✕</button></div>
    <div class="pikk-create-options pikk-create-grid">
      ${er.map(t=>`<a class="pikk-create-tile" href="${t.href}"><span class="pikk-menu-icon" aria-hidden="true">${ms[Zo[t.label]||"music"]}</span><strong class="pikk-menu-title">${t.label}</strong><small>${t.detail}</small></a>`).join("")}
    </div>
    <button type="button" class="pikk-menu-cancel" data-music-close>Cancel</button>
    <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · Beat selling and music uploads are not available yet</p>
  </div>`,document.body.appendChild(e),window.addEventListener("hashchange",()=>is()),e.addEventListener("click",t=>{t.target===e||t.target.closest("[data-music-close]")?is(!0):t.target.closest(".pikk-create-options a")&&is()}),document.addEventListener("keydown",t=>{if(e.hidden||(t.key==="Escape"&&(t.preventDefault(),is(!0)),t.key!=="Tab"))return;const s=[...e.querySelectorAll("a[href], button:not([disabled])")],i=s[0],a=s[s.length-1];if(!i){t.preventDefault();return}e.contains(document.activeElement)?t.shiftKey&&document.activeElement===i?(t.preventDefault(),a.focus()):!t.shiftKey&&document.activeElement===a&&(t.preventDefault(),i.focus()):(t.preventDefault(),(t.shiftKey?a:i).focus())}),e)}function tl(e){var a,n;const t=el(),s=t.hidden,i=document.getElementById("pikkCreateMenu");s&&i&&!i.hidden&&(i.hidden=!0,(a=document.querySelector('#tabbar a[href="#/create"]'))==null||a.setAttribute("aria-expanded","false")),t.hidden=!s,e==null||e.setAttribute("aria-expanded",String(s)),s?(n=t.querySelector("[data-music-close]"))==null||n.focus():e==null||e.focus()}const Ti=e=>({title:e.title||e.label,href:e.href||"",detail:e.detail||""});function sl(e){return e==="music"?er.map(Ti):e==="create"?zo.map(Ti):(hs[e]||[]).map(Ti)}const il=da.map(e=>e.href.replace("#/","")),Qa=[{id:"explore",label:"Explore",href:"#/explore"},{id:"profile",label:"Profile / Sign in",href:"#/profile"},{id:"messages",label:"Messages",href:"#/messages"},{id:"notifications",label:"Notifications",href:"#/notifications"},{id:"settings",label:"Settings",href:"#/profile?tab=settings"}],Di=e=>"/"+String(e).replace(/^#\/?/,"").split(/[?#]/)[0];function al(){const e=il.map(n=>{const o=da.find(r=>r.href==="#/"+n);return{id:n,label:o.label,links:sl(n).map(r=>({href:r.href,label:r.title,soon:!r.href,detail:r.detail}))}}),t=new Set(["/home",...e.flatMap(n=>n.links.filter(o=>o.href).map(o=>Di(o.href))),...Qa.map(n=>Di(n.href))]),s=Zn.flatMap(n=>n.href?[{href:n.href,label:n.label}]:n.links||[]),i=new Set,a=s.filter(n=>{const o=Di(n.href);return t.has(o)||i.has(o)?!1:(i.add(o),!0)});return[{id:"home",label:"Home",href:"#/home"},...e,...Qa,{id:"more",label:"More",links:a},{id:"updates",label:"What's New · App Updates",href:"#/updates"}]}const tr="dbs_v1",ls=()=>({user:null,profiles:{dbs:{id:"dbs",username:"DatBoiSkeet",bio:"Official DatBoiSkeet · Long Story Short & Ladies Only Coming Soon · Vault · Foreign X-Change",avatar:"/brand/logo-dbs-v3@2x.webp",followers:[],following:[],verified:!0}},posts:[],comments:{},likes:{},clipperApps:[],creatorSellApps:[],brandApps:[],listings:[],live:null,liveHistory:[],liveSongRequests:[],coins:{balance:0,history:[]},liveGiftLedger:[],liveGbChallengePop:null,threads:{},demoUnreadSeeded:!1,messagePrefs:{allowDMs:!0,allowRequests:!0},notifications:{releases:!0,lives:!0,messages:!0,quietHours:!1},wallet:{balance:0,history:[]},creatorWallet:{available:0,holds:0,threshold:25,verification:"demo_unverified",earnings:[],payouts:[]},catalog:[],missions:[],giftBattles:{active:null,history:[],champions:[],prefs:{invitationsEnabled:!0}},multiGuest:{active:null,history:[]},spotlight:{nowPlaying:null,queue:[],history:[],houseIndex:0},fanClubs:{clubs:[],posts:{},seeded:!1},shareEarn:{platformsLinked:[],challenge:null,submissions:[],rewardsClaimed:[]},referEarn:{code:"",invitees:[],milestonesClaimed:[]},restream:{platforms:{},selected:[],session:null,history:[],ingest:null,campaign:{tier:null,status:"none",enrolledAt:null,cancelledAt:null},campaignConfig:null},loyalty:{points:0,history:[],badges:[],publicVisible:!0,lastActionAt:{},dayCounts:{}},openMic:{applications:[],seeded:!1,houseIndex:0},profileShop:{owned:[],equipped:{},reduceMotion:!1},hotFeed:{lives:[],posts:[],seededLives:!1,seededPosts:!1,seededPostsVer:0},engagementAlerts:[],postShares:{},splashSeenAt:0,dailyGoals:{app:null,liveByHost:{},history:[]}});function nl(){var e,t,s,i,a,n,o,r,d,c,p,m,g,f,b,k,v,S,$,A,w,P,C,B,x,Q,T,O,H,K,M,I,q,V,Y,G,z,Se,Ee,Ge,Ve,ct,dt,pt,ut,te,ye,Pe,Ms,Ci,Ls;try{const Yt=localStorage.getItem(tr);if(!Yt)return ls();const y=JSON.parse(Yt),j=ls();return{...j,...y,profiles:{...j.profiles,...y.profiles||{}},notifications:{...j.notifications,...y.notifications||{}},wallet:{...j.wallet,...y.wallet||{}},creatorWallet:{...j.creatorWallet,...y.creatorWallet||{},earnings:Array.isArray((e=y.creatorWallet)==null?void 0:e.earnings)?y.creatorWallet.earnings:[],payouts:Array.isArray((t=y.creatorWallet)==null?void 0:t.payouts)?y.creatorWallet.payouts:[],available:Number((s=y.creatorWallet)==null?void 0:s.available)||0,holds:Number((i=y.creatorWallet)==null?void 0:i.holds)||0,threshold:Number((a=y.creatorWallet)==null?void 0:a.threshold)>0?Number(y.creatorWallet.threshold):25,verification:((n=y.creatorWallet)==null?void 0:n.verification)==="demo_verified"?"demo_verified":"demo_unverified"},brandApps:y.brandApps||[],listings:Array.isArray(y.listings)?y.listings:[],live:y.live??null,liveHistory:Array.isArray(y.liveHistory)?y.liveHistory:[],liveSongRequests:Array.isArray(y.liveSongRequests)?y.liveSongRequests:[],coins:{balance:Number((o=y.coins)==null?void 0:o.balance)||0,history:Array.isArray((r=y.coins)==null?void 0:r.history)?y.coins.history:[]},liveGiftLedger:Array.isArray(y.liveGiftLedger)?y.liveGiftLedger:[],liveGbChallengePop:y.liveGbChallengePop||null,threads:{...y.threads||{}},demoUnreadSeeded:!!y.demoUnreadSeeded,messagePrefs:{...j.messagePrefs,...y.messagePrefs||{}},catalog:Array.isArray(y.catalog)?y.catalog:[],missions:Array.isArray(y.missions)?y.missions:[],giftBattles:{...j.giftBattles,...y.giftBattles||{},history:Array.isArray((d=y.giftBattles)==null?void 0:d.history)?y.giftBattles.history:[],champions:Array.isArray((c=y.giftBattles)==null?void 0:c.champions)?y.giftBattles.champions:[],prefs:{...j.giftBattles.prefs,...((p=y.giftBattles)==null?void 0:p.prefs)||{}},active:((m=y.giftBattles)==null?void 0:m.active)??null},multiGuest:{...j.multiGuest,...y.multiGuest||{},history:Array.isArray((g=y.multiGuest)==null?void 0:g.history)?y.multiGuest.history:[],active:((f=y.multiGuest)==null?void 0:f.active)??null},fanClubs:{...j.fanClubs,...y.fanClubs||{},clubs:Array.isArray((b=y.fanClubs)==null?void 0:b.clubs)?y.fanClubs.clubs:[],posts:(k=y.fanClubs)!=null&&k.posts&&typeof y.fanClubs.posts=="object"?y.fanClubs.posts:{},seeded:!!((v=y.fanClubs)!=null&&v.seeded)},shareEarn:{...j.shareEarn,...y.shareEarn||{},platformsLinked:Array.isArray((S=y.shareEarn)==null?void 0:S.platformsLinked)?y.shareEarn.platformsLinked:[],challenge:(($=y.shareEarn)==null?void 0:$.challenge)??null,submissions:Array.isArray((A=y.shareEarn)==null?void 0:A.submissions)?y.shareEarn.submissions:[],rewardsClaimed:Array.isArray((w=y.shareEarn)==null?void 0:w.rewardsClaimed)?y.shareEarn.rewardsClaimed:[]},referEarn:{...j.referEarn,...y.referEarn||{},code:typeof((P=y.referEarn)==null?void 0:P.code)=="string"?y.referEarn.code:"",invitees:Array.isArray((C=y.referEarn)==null?void 0:C.invitees)?y.referEarn.invitees:[],milestonesClaimed:Array.isArray((B=y.referEarn)==null?void 0:B.milestonesClaimed)?y.referEarn.milestonesClaimed:[]},restream:{...j.restream,...y.restream||{},platforms:(x=y.restream)!=null&&x.platforms&&typeof y.restream.platforms=="object"?y.restream.platforms:{},selected:Array.isArray((Q=y.restream)==null?void 0:Q.selected)?y.restream.selected:[],session:((T=y.restream)==null?void 0:T.session)??null,history:Array.isArray((O=y.restream)==null?void 0:O.history)?y.restream.history:[],ingest:((H=y.restream)==null?void 0:H.ingest)??null,campaign:{...j.restream.campaign,...((K=y.restream)==null?void 0:K.campaign)||{}},campaignConfig:((M=y.restream)==null?void 0:M.campaignConfig)??null},loyalty:{...j.loyalty,...y.loyalty||{},points:Number((I=y.loyalty)==null?void 0:I.points)||0,history:Array.isArray((q=y.loyalty)==null?void 0:q.history)?y.loyalty.history:[],badges:Array.isArray((V=y.loyalty)==null?void 0:V.badges)?y.loyalty.badges:[],publicVisible:((Y=y.loyalty)==null?void 0:Y.publicVisible)===void 0?!0:!!y.loyalty.publicVisible,lastActionAt:(G=y.loyalty)!=null&&G.lastActionAt&&typeof y.loyalty.lastActionAt=="object"?y.loyalty.lastActionAt:{},dayCounts:(z=y.loyalty)!=null&&z.dayCounts&&typeof y.loyalty.dayCounts=="object"?y.loyalty.dayCounts:{}},openMic:{...j.openMic,...y.openMic||{},applications:Array.isArray((Se=y.openMic)==null?void 0:Se.applications)?y.openMic.applications:[],seeded:!!((Ee=y.openMic)!=null&&Ee.seeded),houseIndex:typeof((Ge=y.openMic)==null?void 0:Ge.houseIndex)=="number"?y.openMic.houseIndex:0},profileShop:{...j.profileShop,...y.profileShop||{},owned:Array.isArray((Ve=y.profileShop)==null?void 0:Ve.owned)?y.profileShop.owned:[],equipped:(ct=y.profileShop)!=null&&ct.equipped&&typeof y.profileShop.equipped=="object"?y.profileShop.equipped:{},reduceMotion:!!((dt=y.profileShop)!=null&&dt.reduceMotion)},hotFeed:{...j.hotFeed,...y.hotFeed||{},lives:Array.isArray((pt=y.hotFeed)==null?void 0:pt.lives)?y.hotFeed.lives:[],posts:Array.isArray((ut=y.hotFeed)==null?void 0:ut.posts)?y.hotFeed.posts:[],seededLives:!!((te=y.hotFeed)!=null&&te.seededLives),seededPosts:!!((ye=y.hotFeed)!=null&&ye.seededPosts),seededPostsVer:Number((Pe=y.hotFeed)==null?void 0:Pe.seededPostsVer)||0},engagementAlerts:Array.isArray(y.engagementAlerts)?y.engagementAlerts:[],postShares:y.postShares&&typeof y.postShares=="object"?y.postShares:{},creatorSellApps:Array.isArray(y.creatorSellApps)?y.creatorSellApps:[],dailyGoals:{...j.dailyGoals,...y.dailyGoals||{},app:((Ms=y.dailyGoals)==null?void 0:Ms.app)??null,liveByHost:(Ci=y.dailyGoals)!=null&&Ci.liveByHost&&typeof y.dailyGoals.liveByHost=="object"?y.dailyGoals.liveByHost:{},history:Array.isArray((Ls=y.dailyGoals)==null?void 0:Ls.history)?y.dailyGoals.history:[]}}}catch{return ls()}}function E(e){localStorage.setItem(tr,JSON.stringify(e))}let u=nl();function D(){return u}function Xa(e){return u={...u,...e},E(u),u}function rl(e){return u=e(u)||u,E(u),u}function at(e){e&&(u={...u,profiles:{...u.profiles,[e.id]:{id:e.id,username:e.username,bio:e.bio||"",avatar:e.avatar||"",followers:e.followers||[],following:e.following||[],memberships:e.memberships||{},verified:!!e.verified}}})}function St(e){return e?u.user&&u.user.id===e?u.user:u.profiles[e]||null:null}function Za(e){const t=St(e);return t?(t.followers||[]).map(s=>St(s)||{id:s,username:s}).filter(Boolean):[]}function zi(e){const t=St(e);return t?(t.following||[]).map(s=>St(s)||{id:s,username:s}).filter(Boolean):[]}function sr(){if(u.posts.length)return;const e=[{id:"p1",userId:"dbs",username:"DatBoiSkeet",text:"Long Story Short — cover is up. Coming Soon on DBS Music. Stay ready.",image:"/music/01_Long_Story_Short_Coming_Soon.jpg",at:Date.now()-864e5*2},{id:"p2",userId:"dbs",username:"DatBoiSkeet",text:"Foreign X-Change — hats, tees & jackets. Checkout on ForeignX-Change.com (not inside DBS).",image:"/merch/01_black_orange_716_hat.jpeg",at:Date.now()-864e5},{id:"p3",userId:"dbs",username:"DatBoiSkeet",text:"Ladies Only — cover art live. Official playback unlocks when the single drops.",image:"/music/02_Ladies_Only_Coming_Soon.jpg",at:Date.now()-864e5*3},{id:"p4",userId:"dbs",username:"DatBoiSkeet",text:"716 Buffalo Braves snapback on Foreign X-Change — shop the external store.",image:"/merch/02_blue_red_716_hat.jpeg",at:Date.now()-864e5*4}];u={...u,posts:e,likes:{p1:[],p2:[],p3:[],p4:[]},comments:{p1:[],p2:[],p3:[],p4:[]}},E(u)}function jt(e){const t=(e||"Fan").trim().slice(0,24)||"Fan",s="u_"+t.toLowerCase().replace(/\W+/g,"_")+"_"+Date.now().toString(36),i={id:s,username:t,bio:"DBS fan · local demo account (TEST MODE)",avatar:"",followers:[],following:["dbs"],membership:null,memberships:{skeetPlus:!1,backstage:!1,innerCircle:!1},purchasedTracks:[],createdAt:Date.now()},a=u.profiles.dbs||ls().profiles.dbs,n=new Set(a.followers||[]);return n.add(s),u={...u,user:i,profiles:{...u.profiles,dbs:{...a,followers:[...n]}}},at(i),E(u),i}function ol(){u={...u,user:null},E(u)}function ll({bio:e,avatar:t,username:s}){const i=u.user;if(!i)return{error:"signin"};const a={...i,bio:e!==void 0?String(e).slice(0,280):i.bio,avatar:t!==void 0?String(t).trim():i.avatar,username:s!==void 0&&String(s).trim().slice(0,24)||i.username};return u={...u,user:a},at(a),E(u),a}function li(e,t=!0){const s=u.user;if(!s)return{error:"signin"};let i=s.membership??null;const a=c=>c==="skeet"||c==="skeetPlus"||c==="skeet+"?"skeet+":c==="backstage"?"backstage":c==="inner"||c==="innerCircle"?"inner":null,n={null:0,"skeet+":1,backstage:2,inner:3},o=a(e);t?o&&(i=o):i=null;const r={skeetPlus:n[i||"null"]>=1,backstage:n[i||"null"]>=2,innerCircle:n[i||"null"]>=3},d={...s,membership:i,memberships:r};return u={...u,user:d},at(d),E(u),d}function xt(){const e=u.user;if(!e)return null;if(e.membership)return e.membership;const t=e.memberships||{};return t.innerCircle?"inner":t.backstage?"backstage":t.skeetPlus?"skeet+":null}function Wi(e="skeet"){const t=xt(),s={null:0,"skeet+":1,backstage:2,inner:3},i=e==="backstage"?2:e==="inner"?3:1;return(s[t||"null"]||0)>=i}function cl(e){const t=u.user;if(!t)return{error:"signin"};const s=new Set(t.purchasedTracks||[]);s.add(e);const i={...t,purchasedTracks:[...s]};return u={...u,user:i},at(i),E(u),i}function en({text:e,image:t,mediaType:s,mediaUrl:i}){const a=u.user;if(!a)throw new Error("Sign in required");const n="p_"+Date.now().toString(36),o=["picture","short","video","image","text"].includes(s)?s==="image"?"picture":s:t?"picture":"text",r={id:n,userId:a.id,username:a.username,text:(e||"").trim(),image:(t||"").trim(),mediaType:o==="text"&&!(t||"").trim()?"text":o,mediaUrl:(i||"").trim(),at:Date.now()};return u={...u,posts:[r,...u.posts],likes:{...u.likes,[n]:[]},comments:{...u.comments,[n]:[]}},E(u),r}function dl(e){const t=u.user;if(!t)return{error:"signin"};const s=new Set(u.likes[e]||[]);s.has(t.id)?s.delete(t.id):s.add(t.id),u={...u,likes:{...u.likes,[e]:[...s]}},E(u);try{Be()}catch{}return{count:s.size,liked:s.has(t.id)}}function pl(e,t){const s=u.user;if(!s)return{error:"signin"};const i={id:"c_"+Date.now().toString(36),userId:s.id,username:s.username,text:t.trim(),at:Date.now()},a=u.comments[e]||[];u={...u,comments:{...u.comments,[e]:[...a,i]}},E(u);try{Be()}catch{}return i}function ci(e){const t=u.user;if(!t)return{error:"signin"};if(e===t.id)return{error:"self"};if(t.following.includes(e))return t;const s={...t,following:[...t.following,e]},i={...u.profiles},a=i[e]||St(e);if(a){const n=new Set(a.followers||[]);n.add(t.id),i[e]={...a,followers:[...n]}}return u={...u,user:s,profiles:i},at(s),E(u),s}function di(e){const t=u.user;if(!t)return{error:"signin"};const s={...t,following:(t.following||[]).filter(n=>n!==e)},i={...u.profiles},a=i[e]||St(e);return a&&(i[e]={...a,followers:(a.followers||[]).filter(n=>n!==t.id)}),u={...u,user:s,profiles:i},at(s),E(u),s}function ul(e){const t={id:"clip_"+Date.now().toString(36),...e,status:"pending",at:Date.now()};return u={...u,clipperApps:[t,...u.clipperApps]},E(u),t}function ml(e){const t=e||{},s=String(t.name||"").trim().slice(0,80),i=String(t.contact||t.email||t.handle||"").trim().slice(0,120),a=String(t.sells||"both").trim().slice(0,40),n=!!t.agreed;if(!s||!i)return{error:"missing"};if(!n)return{error:"rules"};const o={id:"csa_"+Date.now().toString(36),name:s,contact:i,sells:["music","merch","both"].includes(a)?a:"both",agreed:!0,status:"pending",at:Date.now()},r=[o,...u.creatorSellApps||[]].slice(0,40);return u={...u,creatorSellApps:r},E(u),{ok:!0,app:o}}function ir(e,t){if(!["pending","approved","rejected","waitlisted"].includes(t))return{error:"bad_status"};const i=u.clipperApps.map(a=>a.id===e?{...a,status:t,reviewedAt:Date.now()}:a);return u={...u,clipperApps:i},E(u),i.find(a=>a.id===e)}function Mi(e){u={...u,notifications:{...u.notifications,...e}},E(u)}function hl(){u={...u,splashSeenAt:Date.now()},E(u)}function gl(){return!u.splashSeenAt}function ie(){return!!(u.user&&u.user.role==="admin")}function ws(e=!0){const t=u.user;if(!t)return{error:"signin"};const s={...t,role:e?"admin":"fan"};return u={...u,user:s},at(s),E(u),s}function ar(){var r;const e=u.posts||[],t=u.clipperApps||[],s={pending:0,approved:0,rejected:0,waitlisted:0};t.forEach(d=>{const c=d.status||"pending";s[c]!==void 0?s[c]+=1:s.pending+=1});let i=0;Object.values(u.likes||{}).forEach(d=>{i+=(d||[]).length});let a=0;Object.values(u.comments||{}).forEach(d=>{a+=(d||[]).length});let n=0;u.user&&(u.user.membership||(r=u.user.memberships)!=null&&r.skeetPlus)&&(n+=1),Object.values(u.profiles||{}).forEach(d=>{var c,p;d.id!==((c=u.user)==null?void 0:c.id)&&(d.membership||(p=d.memberships)!=null&&p.skeetPlus)&&(n+=1)});const o=u.catalog||[];return{posts:e.length,likes:i,comments:a,clippers:t.length,clipperByStatus:s,members:n,profiles:Object.keys(u.profiles||{}).length,catalogTotal:o.length,catalogPublished:o.filter(d=>d.published).length}}function nr(e){const t=["spotify","apple","youtubeMusic","youtube","tidal","amazon"],s={};if(!e||typeof e!="object")return s;for(const i of t){const a=String(e[i]||"").trim();(a.startsWith("http://")||a.startsWith("https://"))&&(s[i]=a.slice(0,500))}return s}function wt({publishedOnly:e=!1,types:t=null,includeUnpublishedForAdmin:s=!1}={}){let i=u.catalog||[];if(e?i=i.filter(a=>a.published):s||(i=i.filter(a=>a.published)),t&&t.length){const a=new Set(t);i=i.filter(n=>a.has(n.type))}return[...i].sort((a,n)=>(n.createdAt||0)-(a.createdAt||0))}function fl(e){var i;if(!ie())return{error:"forbidden"};const s={id:e.id||"cat_"+Date.now().toString(36),type:e.type,title:String(e.title||"").trim().slice(0,120),artist:String(e.artist).trim().slice(0,80),coverRef:e.coverRef||"",mediaRef:e.mediaRef||"",youtube:String(e.youtube||"").trim(),embed:String(e.embed||"").trim(),streamingLinks:nr(e.streamingLinks),published:!!e.published,createdAt:Date.now(),updatedAt:Date.now(),createdBy:((i=u.user)==null?void 0:i.id)||null};return s.title?["song","album","video","picture"].includes(s.type)?(u={...u,catalog:[s,...u.catalog||[]]},E(u),s):{error:"type"}:{error:"title"}}function rr(e,t){if(!ie())return{error:"forbidden"};let s=null;const i=(u.catalog||[]).map(a=>{if(a.id!==e)return a;const n={...a,...t,id:a.id,updatedAt:Date.now()};return t&&Object.prototype.hasOwnProperty.call(t,"streamingLinks")&&(n.streamingLinks=nr(t.streamingLinks)),s=n,s});return s?(u={...u,catalog:i},E(u),s):{error:"missing"}}function vl(e,t){return rr(e,{published:!!t})}function bl(e){if(!ie())return{error:"forbidden"};const t=(u.catalog||[]).filter(s=>s.id!==e);return u={...u,catalog:t},E(u),!0}function tn(e){const t=u.user;if(!t)return{error:"signin"};if(u.live&&!u.live.endedAt)return{error:"already_live",live:u.live};const s={id:"live_"+Date.now().toString(36),hostId:t.id,hostName:t.username,title:(e||"DBS Live · TEST MODE").trim().slice(0,80),startedAt:Date.now(),viewers:3+Math.floor(Math.random()*18),giftsTotal:0,tipsTotal:0,giftLog:[],chat:[{id:"sys1",userId:"system",username:"DBS",text:"Welcome · Follow DatBoiSkeet · TEST MODE (no real stream)",at:Date.now()}],endedAt:null};return u={...u,live:s},E(u),s}function yl(){if(!u.live||u.live.endedAt)return u.live;const e={...u.live,endedAt:Date.now()},t=[e,...u.liveHistory||[]].slice(0,20);return u={...u,live:e,liveHistory:t},E(u),e}function kl(){if(!u.live||u.live.endedAt)return u.live;const e=Math.floor(Math.random()*5)-1,t=Math.max(1,(u.live.viewers||1)+e),s={...u.live,viewers:t};return u={...u,live:s},E(u),s}function wl(e){const t=u.user;if(!t)return{error:"signin"};if(!u.live||u.live.endedAt)return{error:"offline"};const s={id:"lc_"+Date.now().toString(36),userId:t.id,username:t.username,text:String(e||"").trim().slice(0,280),at:Date.now()};if(!s.text)return{error:"empty"};const i={...u.live,chat:[...u.live.chat||[],s]};return u={...u,live:i},E(u),s}function or({kind:e="tip",amount:t=1,label:s=""}={}){var m;const i=u.user;if(!i)return{error:"signin"};if(!u.live||u.live.endedAt)return{error:"offline"};const a=Math.max(.5,Number(t)||1),n=e==="gift"?"gift":"tip",o=((m=u.wallet)==null?void 0:m.balance)||0;let r=u.wallet||{balance:0,history:[]};o>=a&&(r={balance:+(o-a).toFixed(2),history:[...r.history||[],{at:Date.now(),amount:-a,note:`Live ${n} · ${u.live.title}`}]});const d={id:"lg_"+Date.now().toString(36),userId:i.id,username:i.username,kind:n,amount:a,label:(s||(n==="gift"?"🔥 Fire":"Tip")).slice(0,40),at:Date.now()},c={id:"lc_"+Date.now().toString(36)+"g",userId:i.id,username:i.username,text:n==="gift"?`sent ${d.label} ($${a.toFixed(2)}) · TEST MODE`:`tipped $${a.toFixed(2)} · TEST MODE`,at:Date.now(),support:!0},p={...u.live,giftsTotal:(u.live.giftsTotal||0)+(n==="gift"?a:0),tipsTotal:(u.live.tipsTotal||0)+(n==="tip"?a:0),giftLog:[...u.live.giftLog||[],d],chat:[...u.live.chat||[],c]};return u={...u,live:p,wallet:r},E(u),o>=a&&ya({category:n==="gift"?"gifts":"tips",gross:a,note:`Live ${n} from @${i.username} · ${u.live.title}`,source:"live"}),{live:p,entry:d,wallet:u.wallet,creatorWallet:u.creatorWallet}}function Sl(){return u.liveHistory||[]}const lr=[{pack:1,price:10,label:"1 song",save:0},{pack:2,price:25,label:"2 songs",save:0},{pack:3,price:45,label:"3 songs",save:5}];function cs(){return Array.isArray(u.liveSongRequests)?u.liveSongRequests:[]}function $l(e){var s;const t=e||((s=u.live)==null?void 0:s.id);return t?cs().filter(i=>i.liveId===t):[]}function pa(e){const t=[];for(const s of $l(e))(s.titles||[]).forEach((i,a)=>{t.push({requestId:s.id,songIndex:a,title:i,status:s.songStatuses&&s.songStatuses[a]||"queued",username:s.username,userId:s.userId,pack:s.pack,price:s.price,at:s.at})});return t}function xl({pack:e,titles:t}={}){var p;const s=u.user;if(!s)return{error:"signin"};if(!u.live||u.live.endedAt)return{error:"offline"};const i=lr.find(m=>m.pack===Number(e));if(!i)return{error:"bad_pack"};const a=(Array.isArray(t)?t:[]).map(m=>String(m||"").trim().slice(0,80)).filter(Boolean);if(a.length!==i.pack)return{error:"title_count",need:i.pack,got:a.length};const n=br(i.price,`Song request ×${i.pack} · ${u.live.title} · TEST MODE`);if((n==null?void 0:n.error)==="insufficient")return{error:"insufficient",need:i.price,balance:Number(((p=u.wallet)==null?void 0:p.balance)||0)};const o={id:"lsr_"+Date.now().toString(36),liveId:u.live.id,hostId:u.live.hostId,userId:s.id,username:s.username,pack:i.pack,price:i.price,titles:a,songStatuses:a.map(()=>"queued"),status:"open",at:Date.now(),charged:i.price},r=[o,...cs()].slice(0,200),d={id:"lc_"+Date.now().toString(36)+"sr",userId:s.id,username:s.username,text:`requested ${i.pack} song${i.pack>1?"s":""} ($${i.price}) · TEST MODE`,at:Date.now(),support:!0},c={...u.live,chat:[...u.live.chat||[],d]};return u={...u,liveSongRequests:r,live:c},E(u),ya({category:"tips",gross:i.price,note:`Song request ×${i.pack} from @${s.username} · ${u.live.title}`,source:"live_song_request"}),{ok:!0,entry:o,wallet:u.wallet,live:u.live}}function ua(e,t,s){var b;const i=u.user;if(!i)return{error:"signin"};if(!["playing","played","skipped","queued"].includes(s))return{error:"bad_status"};const n=cs().findIndex(k=>k.id===e);if(n<0)return{error:"missing"};const o=cs()[n],r=u.live;if(!(r&&r.hostId===i.id&&r.id===o.liveId||i.id===o.hostId)&&!ie())return{error:"host_only"};const c=Number(t);if(!Number.isInteger(c)||c<0||c>=(o.titles||[]).length)return{error:"bad_index"};let p=[...o.songStatuses||o.titles.map(()=>"queued")];if(s==="playing"){const k=cs().map(v=>{if(v.liveId!==o.liveId)return v;const S=[...v.songStatuses||(v.titles||[]).map(()=>"queued")];let $=!1;for(let w=0;w<S.length;w++)S[w]==="playing"&&(S[w]="played",$=!0);if(!$)return v;const A=S.every(w=>w==="played"||w==="skipped");return{...v,songStatuses:S,status:A?"done":"open"}});u={...u,liveSongRequests:k},p=[...((b=u.liveSongRequests[n])==null?void 0:b.songStatuses)||p]}p[c]=s;const m=p.every(k=>k==="played"||k==="skipped"),g={...u.liveSongRequests[n],songStatuses:p,status:m?"done":"open"},f=[...u.liveSongRequests];return f[n]=g,u={...u,liveSongRequests:f},E(u),{ok:!0,entry:g}}function El(e,t){return ua(e,t,"playing")}function Al(e,t){return ua(e,t,"skipped")}function Cl(e,t){return ua(e,t,"played")}const ma=[{slug:"rose",name:"DBS Rose",coins:5,usd:.1,animation:"Rotating glossy rose and petals",tier:"small"},{slug:"big-love",name:"Big Love",coins:25,usd:.5,animation:"Pulsing luminous heart",tier:"small"},{slug:"turn-up",name:"Turn Up",coins:50,usd:1,animation:"Flame burst and DBS sparks",tier:"small"},{slug:"cash-rain",name:"Cash Rain",coins:150,usd:3,animation:"Stylized bills and confetti",tier:"mid"},{slug:"bottle-pop",name:"Bottle Pop",coins:300,usd:6,animation:"Bottle pop and confetti",tier:"mid"},{slug:"money-gun",name:"Money Gun",coins:750,usd:15,animation:"Stylized cash launcher",tier:"premium"},{slug:"diamond-drip",name:"Diamond Drip",coins:1500,usd:30,animation:"Rotating diamond",tier:"premium"},{slug:"foreign-whip",name:"Foreign Whip",coins:3e3,usd:60,animation:"Original luxury vehicle drives across screen",tier:"premium"},{slug:"helicopter",name:"Helicopter",coins:5e3,usd:100,animation:"Helicopter spotlight flyover",tier:"cinematic"},{slug:"private-jet",name:"Private Jet",coins:1e4,usd:200,animation:"Jet cinematic flyover",tier:"cinematic"},{slug:"dbs-crown",name:"DBS Crown",coins:25e3,usd:500,animation:"Gold diamond crown",tier:"cinematic"},{slug:"dbs-universe",name:"DBS Universe",coins:5e4,usd:1e3,animation:"Galaxy DBS logo reveal",tier:"cinematic"}],pi=[{coins:100,usd:2},{coins:500,usd:10},{coins:1e3,usd:20},{coins:2500,usd:50},{coins:5e3,usd:100},{coins:1e4,usd:200}],Tl=750,Li=80,sn=20;function ui(e){return{balance:Math.max(0,Number(e==null?void 0:e.balance)||0),history:Array.isArray(e==null?void 0:e.history)?e.history:[]}}function mi(){return ui(u.coins).balance}function Dl(){return pi.map(e=>({...e}))}function Ml(){return ma.map(e=>({...e}))}function cr(e){const t=pi.find(n=>n.coins===Number(e));if(!t)return{error:"bad_package"};const s=ui(u.coins),i={at:Date.now(),amount:t.coins,note:`Bought ${t.coins} coins ($${t.usd}) · TEST MODE`,kind:"buy",packageCoins:t.coins,usd:t.usd},a={balance:s.balance+t.coins,history:[i,...s.history].slice(0,200)};return u={...u,coins:a},E(u),{ok:!0,coins:a,pack:t,entry:i}}function ha(){return Array.isArray(u.liveGiftLedger)?u.liveGiftLedger:[]}function Ll(e){var s;const t=e||((s=u.live)==null?void 0:s.id);return t?ha().filter(i=>i.liveId===t).map(i=>({id:i.id,liveId:i.liveId,giftSlug:i.giftSlug,giftName:i.giftName,coins:i.coins,usd:i.usd,fromUserId:i.fromUserId,fromUser:i.fromUser,at:i.at,animation:i.animation,tier:i.tier})):[]}function Il(e=10,t=Date.now()){const s=Math.min(Math.max(1,Number(e)||10),10),i=new Date(t);i.setHours(0,0,0,0);const a=i.getTime(),n=new Date(t);n.setHours(23,59,59,999);const o=n.getTime(),r={};for(const d of ha()){const c=Number(d.at||0);if(c<a||c>o)continue;const p=d.fromUserId||d.fromUser||"anon",m=r[p]||{userId:p,username:d.fromUser||p,usd:0,coins:0,gifts:0,lastSlug:d.giftSlug||"rose"};m.usd=+(m.usd+Number(d.usd||0)).toFixed(2),m.coins+=Number(d.coins||0),m.gifts+=1,m.username=d.fromUser||m.username,m.lastSlug=d.giftSlug||m.lastSlug,r[p]=m}return Object.values(r).sort((d,c)=>c.usd-d.usd||c.coins-d.coins||d.username.localeCompare(c.username)).slice(0,s)}function dr(e){let s=(ba(u.creatorWallet).earnings||[]).filter(i=>i.category==="gifts");return e&&(s=s.filter(i=>!i.hostId||i.hostId===e)),s.map(i=>({...i}))}function Pl({liveId:e,slug:t}={}){const s=u.user;if(!s)return{error:"signin"};const i=u.live;if(!i||i.endedAt)return{error:"offline"};if(e&&e!==i.id)return{error:"live_mismatch"};const a=ma.find(x=>x.slug===t);if(!a)return{error:"bad_gift"};const n=ui(u.coins);if(n.balance<a.coins)return{error:"insufficient",need:a.coins,balance:n.balance};const o=N(a.usd),r=0,d=o,c=N(d*Li/100),p=N(d-c),m=Date.now(),g="lgift_"+m.toString(36)+"_"+Math.random().toString(36).slice(2,6),f={at:m,amount:-a.coins,note:`Gift ${a.name} · ${i.title} · TEST MODE`,kind:"gift",giftSlug:a.slug,liveId:i.id,usd:o},b={balance:n.balance-a.coins,history:[f,...n.history].slice(0,200)},k={id:g,liveId:i.id,hostId:i.hostId,giftSlug:a.slug,giftName:a.name,coins:a.coins,usd:o,fees:r,net:d,creatorShare:c,platformShare:p,dbsShare:p,creatorPct:Li,dbsPct:sn,fromUserId:s.id,fromUser:s.username,at:m,animation:a.animation,tier:a.tier,testModeNetAsListed:!0},v={id:g,userId:s.id,username:s.username,kind:"gift",giftSlug:a.slug,label:a.name,amount:o,coins:a.coins,at:m},S={id:"lc_"+m.toString(36)+"gf",userId:s.id,username:s.username,text:`sent ${a.name} (${a.coins} coins) · TEST MODE`,at:m,support:!0,giftSlug:a.slug},$={...i,giftsTotal:N((i.giftsTotal||0)+o),giftLog:[...i.giftLog||[],v],chat:[...i.chat||[],S]},A=[k,...ha()].slice(0,500),w=ba(u.creatorWallet),P={id:"earn_"+m.toString(36)+"_"+Math.random().toString(36).slice(2,6),category:"gifts",label:"Live gifts",note:`Live gift ${a.name} from @${s.username} · ${i.title}`,gross:o,fees:r,net:d,creatorPct:Li,dbsPct:sn,creatorShare:c,dbsShare:p,source:"live_gift",giftSlug:a.slug,giftId:g,liveId:i.id,hostId:i.hostId,fromUserId:s.id,at:m,payoutId:null},C={...w,available:N(w.available+c),earnings:[P,...w.earnings||[]]},B={id:"gbpop_"+m.toString(36),liveId:i.id,fromUserId:s.id,fromUser:s.username,giftSlug:a.slug,giftName:a.name,coins:a.coins,usd:o,at:m,expiresAt:m+6e4};return u={...u,coins:b,live:$,liveGiftLedger:A,creatorWallet:C,liveGbChallengePop:B},E(u),{ok:!0,entry:k,viewerEntry:v,coins:b,live:$,earning:P,creatorWallet:C,challengePop:B}}const pr=24*60*60*1e3,an=50;function hi(e){return{app:e!=null&&e.app&&typeof e.app=="object"?e.app:null,liveByHost:e!=null&&e.liveByHost&&typeof e.liveByHost=="object"?{...e.liveByHost}:{},history:Array.isArray(e==null?void 0:e.history)?e.history:[]}}function gs(e,t=Date.now()){return!e||typeof e!="object"?!1:(Number(e.endsAt)||0)>t}function Pt(e){return e?{...e}:null}function ur(e){return"goal_"+e+"_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,6)}function ga(e,t){if(!t)return e;const s=[{...t,archivedAt:Date.now()},...e.history||[]].slice(0,40);return{...e,history:s}}function _l(e=Date.now()){return{id:ur("app"),scope:"app",name:"PIKK daily community goal",targetAmount:50,raised:0,endsAt:e+pr,createdAt:e}}function Js(e){return u={...u,dailyGoals:e},E(u),e}function Yi(e=Date.now()){let t=hi(u.dailyGoals),s=!1;return t.app&&!gs(t.app,e)&&(t={...ga(t,t.app),app:null},s=!0),gs(t.app,e)||(t={...t,app:_l(e)},s=!0),s&&Js(t),t.app&&t.app.name==="DBS daily community goal"&&(t={...t,app:{...t.app,name:"PIKK daily community goal"}},Js(t)),Pt(t.app)}function Ol(e,t=Date.now()){var n,o;const s=e||((n=u.live)==null?void 0:n.hostId)||((o=u.user)==null?void 0:o.id)||null;if(!s)return null;let i=hi(u.dailyGoals);const a=i.liveByHost[s]||null;if(a&&!gs(a,t)){const r={...i.liveByHost};return delete r[s],i={...ga(i,a),liveByHost:r},Js(i),null}return Pt(gs(a,t)?a:null)}function mr({name:e,targetAmount:t}={}){const s=u.user;if(!s)return{error:"signin"};const i=String(e||"").trim().slice(0,80),a=Number(t);if(!i)return{error:"bad_name"};if(!Number.isFinite(a)||a<=0)return{error:"bad_amount"};const n=Date.now();let o=hi(u.dailyGoals);const r=o.liveByHost[s.id];r&&(o=ga(o,r));const d={id:ur("live"),scope:"live",hostId:s.id,hostName:s.username,name:i,targetAmount:N(a),raised:0,endsAt:n+pr,createdAt:n};return o={...o,liveByHost:{...o.liveByHost,[s.id]:d}},Js(o),{ok:!0,goal:Pt(d)}}function Qs(e,t,s={}){if(!u.user)return{error:"signin"};const a=Math.floor(Number(t));if(!Number.isFinite(a)||a<=0)return{error:"invalid_amount"};const n=String(e||"");if(!n)return{error:"unknown_goal"};const o=Date.now();let r=hi(u.dailyGoals),d=null,c=null,p=null;if(r.app&&r.app.id===n)d="app",p=r.app;else for(const[C,B]of Object.entries(r.liveByHost))if(B&&B.id===n){d="live",c=C,p=B;break}if(!p)return{error:"unknown_goal"};if(!gs(p,o))return{error:"expired"};const m=Number(p.targetAmount)||0,g=Number(p.raised)||0;if(p.completedAt||m>0&&g>=m)return{error:"completed",goal:Pt(p)};let f=a;if(m>0){const C=Math.max(0,N(m-g)),B=Math.ceil(C*an);if(B<=0)return{error:"completed",goal:Pt(p)};f>B&&(f=B)}const b=ui(u.coins);if(b.balance<f)return{error:"insufficient",need:f,balance:b.balance};const k=N(f/an),v=N(g+k),S=m>0&&v>=m?o:p.completedAt,$={...p,raised:m>0?Math.min(v,N(m)):v,...S?{completedAt:S}:{}},A=String((s==null?void 0:s.message)||"").trim().slice(0,180),w={at:o,amount:-f,note:`Goal donate · ${p.name} · $${k.toFixed(2)} · TEST MODE`,kind:"goal",goalId:p.id,...A?{message:A}:{},usd:k},P={balance:b.balance-f,history:[w,...b.history].slice(0,200)};return d==="app"?r={...r,app:$}:r={...r,liveByHost:{...r.liveByHost,[c]:$}},u={...u,dailyGoals:r,coins:P},E(u),{ok:!0,goal:Pt($),coins:P,donated:{coins:f,usd:k,requested:a,message:A}}}function ql(e){const t=u.user,s={id:"brand_"+Date.now().toString(36),brand:String(e.brand||"").trim().slice(0,80),contact:String(e.contact||"").trim().slice(0,120),email:String(e.email||"").trim().slice(0,120),campaign:String(e.campaign||"sponsored_post").trim().slice(0,40),budget:String(e.budget||"").trim().slice(0,40),pitch:String(e.pitch||"").trim().slice(0,500),url:String(e.url||"").trim().slice(0,300),applicantUserId:(t==null?void 0:t.id)||null,status:"pending",at:Date.now()};return!s.brand||!s.email?{error:"required"}:(u={...u,brandApps:[s,...u.brandApps]},E(u),s)}function Nl(e,t){if(!["pending","approved","rejected"].includes(t))return{error:"bad_status"};const i=u.brandApps.map(a=>a.id===e?{...a,status:t,reviewedAt:Date.now()}:a);return u={...u,brandApps:i},E(u),i.find(a=>a.id===e)}function nn(e){const t=u.user,s={id:"list_"+Date.now().toString(36),title:String(e.title||"").trim().slice(0,80),brand:String(e.brand||"").trim().slice(0,80),blurb:String(e.blurb||"").trim().slice(0,280),url:String(e.url||"").trim().slice(0,300),disclosure:String(e.disclosure||"Paid partnership · TEST MODE").trim().slice(0,120),brandAppId:e.brandAppId||null,createdBy:(t==null?void 0:t.id)||null,active:!0,at:Date.now()};return!s.title||!s.brand?{error:"required"}:(u={...u,listings:[s,...u.listings||[]]},E(u),s)}function Bl(e,t){const s=(u.listings||[]).map(i=>i.id===e?{...i,active:!!t}:i);return u={...u,listings:s},E(u),s.find(i=>i.id===e)}function Rl({activeOnly:e=!1}={}){const t=u.listings||[];return e?t.filter(s=>s.active):t}function jl(e){var s;return[((s=u.user)==null?void 0:s.id)||"guest",e].sort().join("__")}function fa(){const e=u.user;return e?Object.values(u.threads||{}).filter(t=>{var s;return(s=t.participants)==null?void 0:s.includes(e.id)}).sort((t,s)=>(s.updatedAt||0)-(t.updatedAt||0)):[]}function Xs(e){const t=u.user;if(!t||!e||e.muted||e.blocked)return 0;const s=e.lastReadAt||0;return(e.messages||[]).filter(i=>i.from!==t.id&&(i.at||0)>s).length}function Ze(){return fa().reduce((e,t)=>e+Xs(t),0)}function rn(e){const t=u.user;if(!t||!e)return null;const s=u.threads[e];if(!s||!(s.participants||[]).includes(t.id))return null;const i={...s,lastReadAt:Date.now()};u={...u,threads:{...u.threads,[i.id]:i},demoUnreadSeeded:!0},E(u);try{typeof window<"u"&&window.dispatchEvent&&window.dispatchEvent(new CustomEvent("dbs:messages-unread",{detail:{count:Ze()}}))}catch{}return u.threads[i.id]}function va(){var c;const e=u.user;if(!e)return{seeded:!1};if(Ss(),u.demoUnreadSeeded)return{seeded:!1,count:Ze(),once:!0};if(Ze()>0)return u={...u,demoUnreadSeeded:!0},E(u),{seeded:!1,count:Ze()};const t="maya",s=(((c=u.profiles)==null?void 0:c.maya)||{}).username||"MayaBeats",i=ds(t,s);if(i.error)return i;const a=u.threads[i.id];if((a.messages||[]).some(p=>p.from!==e.id)){const p=(a.messages||[]).filter(k=>k.from!==e.id).map(k=>k.at||0),m=a.lastReadAt||0;if(m>=Math.max(...p,0)||m>0)return u={...u,demoUnreadSeeded:!0},E(u),{seeded:!1,count:Ze()};const f=Math.min(...p),b={...a,lastReadAt:Math.max(0,f-1)};return u={...u,threads:{...u.threads,[b.id]:b},demoUnreadSeeded:!0},E(u),{seeded:!0,count:Ze()}}const o=Date.now(),r=[{id:"m_demo_unread_1",from:t,fromName:s,text:"Yo — drop coming Friday. You in for the listening party?",at:o-1e3*60*12},{id:"m_demo_unread_2",from:t,fromName:s,text:"Also sent a beat pack in the vault 🔥",at:o-1e3*60*5}],d={...a,messages:[...a.messages||[],...r],updatedAt:o-1e3*60*5,lastReadAt:0,request:!1};return u={...u,threads:{...u.threads,[d.id]:d},demoUnreadSeeded:!0},E(u),{seeded:!0,count:Ze()}}function hr(e){return(u.threads||{})[e]||null}function gr(e){var i;const t=u.user;if(!t||!e)return!1;const s=(i=u.profiles)==null?void 0:i[e];return s?(t.following||[]).includes(e)&&(s.following||[]).includes(t.id):!1}function ds(e,t){const s=u.user;if(!s)return{error:"signin"};const i=jl(e);let a=u.threads[i];if(!a){const n=e==="dbs"||gr(e);a={id:i,kind:"dm",participants:[s.id,e],peerId:e,peerName:t||e,messages:[],updatedAt:Date.now(),request:!n,muted:!1,blocked:!1},u={...u,threads:{...u.threads,[i]:a}},E(u)}return a}function Fl(e,t,s,{priority:i=!1}={}){const a=u.user;if(!a)return{error:"signin"};const n=String(s||"").trim().slice(0,500);if(!n)return{error:"empty"};const o=ds(e,t);if(o.error)return o;const r={id:"m_"+Date.now().toString(36),from:a.id,fromName:a.username,text:n,at:Date.now(),priority:!!i},d={...u.threads[o.id],messages:[...u.threads[o.id].messages||[],r],updatedAt:Date.now(),peerName:t||u.threads[o.id].peerName};if(u={...u,threads:{...u.threads,[d.id]:d}},i){const c=u.wallet||{balance:0,history:[]};u={...u,wallet:{balance:c.balance,history:[...c.history||[],{at:Date.now(),amount:0,note:"Priority message · TEST MODE $2.99 (not charged)"}]}}}return E(u),{thread:u.threads[d.id],message:r}}function Ss(){const e={...u.profiles||{}};let t=!1;e.maya||(e.maya={id:"maya",username:"MayaBeats",bio:"Creator · beats & live demos",avatar:"",followers:[],following:["dbs"],verified:!1},t=!0),e.fanjay||(e.fanjay={id:"fanjay",username:"FanJay",bio:"Day-one fan · playlist curator",avatar:"",followers:[],following:["dbs"],verified:!1},t=!0);const s=u.user;if(s){const i={...e.maya},a=new Set(i.following||[]),n=new Set(i.followers||[]);a.has(s.id)||(a.add(s.id),t=!0),n.has(s.id)||(n.add(s.id),t=!0),i.following=[...a],i.followers=[...n],e.maya=i;let o=s;(s.following||[]).includes("maya")||(o={...s,following:[...s.following||[],"maya"]},t=!0),t&&(u={...u,user:o,profiles:e},at(o),E(u))}else t&&(u={...u,profiles:e},E(u));return[{id:"dbs",username:"DatBoiSkeet",team:!0,bio:(u.profiles.dbs||{}).bio||""},{id:"maya",username:u.profiles.maya.username,team:!1,bio:u.profiles.maya.bio},{id:"fanjay",username:u.profiles.fanjay.username,team:!1,bio:u.profiles.fanjay.bio}]}function Kl(e,t=[]){const s=u.user;if(!s)return{error:"signin"};const i=String(e).trim().slice(0,60)||"Group",a=[...new Set([s.id,...t.filter(Boolean)])],n=i.toLowerCase().replace(/\W+/g,"_").slice(0,24)||"group",o=n==="dbs_fans"?"group_dbs_fans":"group_"+n+"_"+String(s.id).slice(-4);let r=u.threads[o];if(!r)r={id:o,kind:"group",peerId:o,peerName:i,participants:a,memberIds:a,messages:[],updatedAt:Date.now(),muted:!1,blocked:!1},u={...u,threads:{...u.threads,[o]:r}},E(u);else if(s&&!(r.participants||[]).includes(s.id)){const d=[...new Set([...r.participants||[],s.id])],c=[...new Set([...r.memberIds||d,s.id])];r={...r,participants:d,memberIds:c},u={...u,threads:{...u.threads,[o]:r}},E(u)}return u.threads[o]}function Gl(){return u.user?(Ss(),Kl("DBS Fans",["dbs","maya","fanjay"])):{error:"signin"}}function Vl(e,t){const s=u.user;if(!s)return{error:"signin"};const i=u.threads[e];if(!i||i.kind!=="group")return{error:"not_group"};if(!(i.participants||[]).includes(s.id))return{error:"forbidden"};const a=String(t||"").trim().slice(0,500);if(!a)return{error:"empty"};const n={id:"m_"+Date.now().toString(36),from:s.id,fromName:s.username,text:a,at:Date.now(),priority:!1},o={...i,messages:[...i.messages||[],n],updatedAt:Date.now()};return u={...u,threads:{...u.threads,[o.id]:o}},E(u),{thread:u.threads[o.id],message:n}}function Ii(e,t={}){const s=u.threads[e];if(!s)return{error:"missing"};const i={...s,muted:t.muted!==void 0?!!t.muted:!!s.muted,blocked:t.blocked!==void 0?!!t.blocked:!!s.blocked,reportedAt:t.report?Date.now():s.reportedAt||null};return u={...u,threads:{...u.threads,[i.id]:i}},E(u),i}function on(e={}){const t={...u.messagePrefs||{allowDMs:!0,allowRequests:!0},...e};return u={...u,messagePrefs:t},E(u),t}const bt={gifts:{creatorPct:80,dbsPct:20,label:"Live gifts"},tips:{creatorPct:90,dbsPct:10,label:"Tips"},subscriptions:{creatorPct:85,dbsPct:15,label:"Subscriptions"},paid_content:{creatorPct:85,dbsPct:15,label:"Paid content"},referrals:{creatorPct:85,dbsPct:15,label:"Referrals"},clippers:{creatorPct:80,dbsPct:20,label:"Clippers"},sponsorships:{creatorPct:80,dbsPct:20,label:"Sponsorships"},merch:{creatorPct:85,dbsPct:15,label:"Merch / affiliate"}},Ul=[{category:"gifts",gross:40,note:"Live gifts · demo week"},{category:"tips",gross:22.5,note:"Live tips · demo week"},{category:"subscriptions",gross:29.99,note:"Skeet+ fan sub · demo"},{category:"referrals",gross:15,note:"Refer & Earn milestone · demo"},{category:"clippers",gross:50,note:"Clippers campaign payout · demo"},{category:"sponsorships",gross:100,note:"Sponsored livestream · demo"},{category:"merch",gross:35,note:"Foreign X-Change affiliate · demo"}];function N(e){return Math.round(Number(e)*100)/100}function ba(e){const t=ls().creatorWallet;return!e||typeof e!="object"?{...t}:{...t,...e,available:N(e.available??0),holds:N(e.holds??0),threshold:Number(e.threshold)>0?Number(e.threshold):25,verification:e.verification==="demo_verified"?"demo_verified":"demo_unverified",earnings:Array.isArray(e.earnings)?e.earnings:[],payouts:Array.isArray(e.payouts)?e.payouts:[]}}function nt(){const e=ba(u.creatorWallet);return u.creatorWallet!==e&&(u={...u,creatorWallet:e}),e}function fr({category:e,gross:t,note:s,source:i="demo",at:a=Date.now()}){const n=bt[e]||bt.tips,o=N(Math.max(0,Number(t)||0)),r=N(o*.029+(o>0?.3:0)),d=N(Math.max(0,o-r)),c=N(d*n.creatorPct/100),p=N(d-c);return{id:"earn_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,6),category:e,label:n.label,note:String(s||n.label).slice(0,120),gross:o,fees:r,net:d,creatorPct:n.creatorPct,dbsPct:n.dbsPct,creatorShare:c,dbsShare:p,source:i,at:a,payoutId:null}}function Hl(){return{...bt}}function fs(){return nt()}function ya(e){const t=fr(e),s=nt(),i={...s,available:N(s.available+t.creatorShare),earnings:[t,...s.earnings||[]]};return u={...u,creatorWallet:i},E(u),t}function vr({force:e=!1}={}){const t=nt();if(!e&&(t.earnings||[]).length>0)return{skipped:!0,creatorWallet:t};const s=Date.now()-6*864e5,a=Ul.map((r,d)=>fr({category:r.category,gross:r.gross,note:r.note,source:"seed",at:s+d*36e5})).map((r,d)=>({...r,id:"earn_seed_"+d+"_"+r.category})),n=N(a.reduce((r,d)=>r+d.creatorShare,0)),o={...t,available:e?n:N(t.available+n),earnings:e?a:[...a,...t.earnings||[]],holds:e?0:t.holds,payouts:e?[]:t.payouts};return e&&(o.available=n,o.holds=0,o.payouts=[],o.earnings=a),u={...u,creatorWallet:o},E(u),{seeded:a.length,creatorWallet:o}}function zl({amount:e}={}){const t=nt(),s=(t.payouts||[]).find(g=>g.status==="pending");if(s)return{error:"pending_exists",pending:s};const i=N(t.available);if(i<t.threshold)return{error:"below_threshold",available:i,threshold:t.threshold};const a=e!=null?N(e):i;if(a<=0||a>i)return{error:"bad_amount"};const n=(t.earnings||[]).filter(g=>!g.payoutId).sort((g,f)=>g.at-f.at),o=[];let r=0;for(const g of n){const f=N(g.creatorShare);if(!(f<=0)&&!(N(r+f)>a)&&(o.push(g.id),r=N(r+f),r>=a))break}if(!o.length){const g=n.find(f=>N(f.creatorShare)>0);if(!g)return{error:"no_earnings"};if(N(g.creatorShare)>i)return{error:"bad_amount"};o.push(g.id),r=N(g.creatorShare)}const d=r,c={id:"po_"+Date.now().toString(36),amount:d,status:"pending",at:Date.now(),earningIds:o,note:"TEST MODE payout request · not real money"},p=(t.earnings||[]).map(g=>o.includes(g.id)?{...g,payoutId:c.id}:g),m={...t,available:N(i-d),holds:N(t.holds+d),earnings:p,payouts:[c,...t.payouts||[]]};return u={...u,creatorWallet:m},E(u),c}function Wl(e,t){if(!["pending","completed","rejected"].includes(t))return{error:"bad_status"};const i=nt(),a=(i.payouts||[]).find(p=>p.id===e);if(!a)return{error:"missing"};if(a.status!=="pending"&&t!=="pending")return{error:"already_final",payout:a};let n=i.available,o=i.holds,r=i.earnings||[];if(a.status==="pending"&&t==="completed")o=N(Math.max(0,o-a.amount));else if(a.status==="pending"&&t==="rejected"){o=N(Math.max(0,o-a.amount)),n=N(n+a.amount);const p=new Set(a.earningIds||[]);r=r.map(m=>p.has(m.id)?{...m,payoutId:null}:m)}const d=i.payouts.map(p=>p.id===e?{...p,status:t,reviewedAt:Date.now()}:p),c={...i,available:n,holds:o,earnings:r,payouts:d};return u={...u,creatorWallet:c},E(u),d.find(p=>p.id===e)}function Yl(e){const s={...nt(),verification:e?"demo_verified":"demo_unverified"};return u={...u,creatorWallet:s},E(u),s}function ka(){const e=nt(),t={};for(const s of Object.keys(bt))t[s]={category:s,label:bt[s].label,creatorPct:bt[s].creatorPct,dbsPct:bt[s].dbsPct,gross:0,fees:0,net:0,creatorShare:0,dbsShare:0,count:0};for(const s of e.earnings||[]){const i=t[s.category]||(t[s.category]={category:s.category,label:s.label||s.category,creatorPct:s.creatorPct,dbsPct:s.dbsPct,gross:0,fees:0,net:0,creatorShare:0,dbsShare:0,count:0});i.gross=N(i.gross+s.gross),i.fees=N(i.fees+s.fees),i.net=N(i.net+s.net),i.creatorShare=N(i.creatorShare+s.creatorShare),i.dbsShare=N(i.dbsShare+s.dbsShare),i.count+=1}return Object.values(t)}function Zs(e=5,t="Demo credit"){const s=u.wallet||{balance:0,history:[]},i=Number(s.balance||0)+Number(e),a=[...s.history||[],{at:Date.now(),amount:Number(e),note:t}];return u={...u,wallet:{balance:i,history:a}},E(u),u.wallet}function br(e,t="Demo spend"){const s=u.wallet||{balance:0,history:[]},i=Number(e);if(Number(s.balance||0)<i)return{error:"insufficient"};const a=Number(s.balance||0)-i,n=[...s.history||[],{at:Date.now(),amount:-i,note:t}];return u={...u,wallet:{balance:a,history:n}},E(u),u.wallet}function U(e,t){return String(e||"").toLowerCase().includes(t)}function Jl(e){const t=String(e||"").trim().toLowerCase(),s={query:String(e||"").trim(),posts:[],profiles:[],music:[],videos:[],lives:[],products:[],pictures:[]};if(!t)return s;const i=(u.posts||[]).filter(g=>U(g.text,t)||U(g.username,t)),a=Object.values(u.profiles||{}).filter(g=>U(g.username,t)||U(g.bio,t));if(u.user){const g=u.user;(U(g.username,t)||U(g.bio,t))&&(a.find(f=>f.id===g.id)||a.push(g))}const n=(u.catalog||[]).filter(g=>g.published),o=n.filter(g=>(g.type==="song"||g.type==="album")&&(U(g.title,t)||U(g.artist,t)||U(g.type,t))),r=n.filter(g=>g.type==="video"&&(U(g.title,t)||U(g.artist,t)||U("video",t))),d=n.filter(g=>g.type==="picture"&&(U(g.title,t)||U(g.artist,t)||U("picture",t))),c=[],p=u.live;p&&!p.endedAt&&(U(p.title,t)||U(p.hostName,t)||U("live",t))&&c.push({...p,status:"live"}),(u.liveHistory||[]).forEach(g=>{(U(g.title,t)||U(g.hostName,t)||U("live",t))&&c.push({...g,status:"ended"})});const m=(u.listings||[]).filter(g=>g.active!==!1&&(U(g.title,t)||U(g.brand,t)||U(g.blurb,t)||U("marketplace",t)||U("product",t)));return{query:String(e||"").trim(),posts:i,profiles:a,music:o,videos:r,lives:c,products:m,pictures:d}}function Ql(e=8){const t=u.likes||{},s=(u.posts||[]).map(r=>({kind:"post",id:r.id,title:(r.text||"").slice(0,72)||"Post",subtitle:"@"+(r.username||"creator"),href:"#/posts",score:(t[r.id]||[]).length,image:r.image||""})).sort((r,d)=>d.score-r.score||(d.id>r.id?1:-1)),i=[{kind:"music",id:"trend_music",title:"Long Story Short",subtitle:"Coming Soon · Music",href:"#/music",score:3,image:"/music/01_Long_Story_Short_Coming_Soon.jpg"},{kind:"video",id:"trend_video",title:"Dirty Money ft. Lil Baby",subtitle:"Official MV",href:"#/videos",score:3,image:""},{kind:"live",id:"trend_live",title:"Go live on DBS",subtitle:"Creators · Live",href:"#/live",score:2,image:""},{kind:"market",id:"trend_mkt",title:"Sponsored Marketplace",subtitle:"Brand ads · demo",href:"#/marketplace",score:2,image:""},{kind:"spotlight",id:"trend_spot",title:"24/7 Spotlight",subtitle:"Stage · Discover",href:"#/spotlight",score:1,image:""}],a=u.live;return a&&!a.endedAt&&i.unshift({kind:"live",id:"trend_live_now",title:a.title||"Live now",subtitle:"@"+(a.hostName||"creator")+" · LIVE",href:"#/live",score:99,image:""}),(u.catalog||[]).filter(r=>r.published).slice(0,3).forEach(r=>{const d=r.type==="video"?"#/videos":r.type==="picture"?"#/home":"#/music";i.push({kind:r.type,id:"trend_cat_"+r.id,title:r.title,subtitle:(r.artist||"Admin")+" · From Admin",href:d,score:4,image:r.coverRef&&!String(r.coverRef).startsWith("idb:")?r.coverRef:""})}),[...s,...i].sort((r,d)=>d.score-r.score).slice(0,e)}function Xl(){const e=Object.values(u.profiles||{}).map(t=>({id:t.id,username:t.username,bio:t.bio||"",avatar:t.avatar||"",verified:!!t.verified,followers:(t.followers||[]).length}));return u.user&&!e.find(t=>t.id===u.user.id)&&e.push({id:u.user.id,username:u.user.username,bio:u.user.bio||"",avatar:u.user.avatar||"",verified:!!u.user.verified,followers:(u.user.followers||[]).length}),e.sort((t,s)=>s.followers-t.followers||t.username.localeCompare(s.username))}const yr=6e4,Pi=10;function kr(e=Date.now()){const t=new Date(e);return t.setHours(23,59,59,999),t.getTime()}function Zl(e=Date.now()){const t=new Date(e);return t.setHours(0,0,0,0),t.getTime()}const wr=[{id:"fan_maya",name:"MayaBeats",bio:"Demo fan · mutual"},{id:"fan_jay",name:"FanJay",bio:"Demo fan · sandbox opponent"}];function he(){return u.giftBattles||{active:null,history:[],champions:[],prefs:{invitationsEnabled:!0}}}function Et(e){return u={...u,giftBattles:e},E(u),e}function wa(e,t=Date.now()){if(!e||e.status!=="active"||t<(e.endsAt||0))return e;const s=Number(e.scoreA||0),i=Number(e.scoreB||0);let a="tie",n=null,o=null;return s>i?(a="win",n=e.challenger.id,o=e.challenger.name):i>s&&(a="win",n=e.opponent.id,o=e.opponent.name),{...e,status:"ended",endedAt:t,result:a,winnerId:n,winnerName:o,scoreA:s,scoreB:i,championUntil:n?kr(t):null}}function Sr(){return wr.map(e=>({...e}))}function Sa(){return{invitationsEnabled:!0,...he().prefs||{}}}function ec(e={}){const t=he(),s={...t.prefs,...e};return Et({...t,prefs:s})}function $a(){let t=he().active;if(!t)return null;if(t.status==="active"){const s=wa(t);if(s!==t&&s.status==="ended")return xa(s);t=s}return t}function xa(e){const t=he(),s=[e,...(t.history||[]).filter(a=>a.id!==e.id)].slice(0,40);let i=t.champions||[];return e.winnerId&&(i=[{battleId:e.id,userId:e.winnerId,username:e.winnerName,score:e.winnerId===e.challenger.id?e.scoreA:e.scoreB,opponentScore:e.winnerId===e.challenger.id?e.scoreB:e.scoreA,endedAt:e.endedAt,championUntil:e.championUntil,mode:e.mode},...i.filter(n=>n.battleId!==e.id)].slice(0,30)),Et({...t,active:e,history:s,champions:i}),e}function tc({opponentId:e,opponentName:t,mode:s}={}){const i=u.user;if(!i)return{error:"signin"};if(!Sa().invitationsEnabled)return{error:"invites_disabled"};const n=u.live&&!u.live.endedAt,o=s||(n?"live":"sandbox");if(o==="live"&&!n)return{error:"not_live"};const r=he(),d=r.active;if(d&&(d.status==="pending"||d.status==="active"))return{error:"battle_in_progress",battle:d};const c=wr.find(g=>g.id===e),p={id:e||(c==null?void 0:c.id)||"fan_maya",name:t||(c==null?void 0:c.name)||"MayaBeats"};if(p.id===i.id)return{error:"self"};const m={id:"gb_"+Date.now().toString(36),status:"pending",mode:o,liveId:n?u.live.id:null,liveTitle:n?u.live.title:null,challenger:{id:i.id,name:i.username},opponent:p,createdAt:Date.now(),startedAt:null,endsAt:null,durationMs:yr,scoreA:0,scoreB:0,giftLog:[],result:null,winnerId:null,winnerName:null,endedAt:null,championUntil:null};return Et({...r,active:m}),{battle:m}}function sc(){const e=he(),t=e.active;if(!t||t.status!=="pending")return{error:"no_pending"};if(!Sa().invitationsEnabled)return{error:"invites_disabled"};const s=Date.now(),i={...t,status:"active",startedAt:s,endsAt:s+(t.durationMs||yr),scoreA:0,scoreB:0};return Et({...e,active:i}),{battle:i}}function ic(){const e=he(),t=e.active;if(!t||t.status!=="pending")return{error:"no_pending"};const s={...t,status:"declined",endedAt:Date.now(),result:"declined"},i=[s,...e.history||[]].slice(0,40);return Et({...e,active:null,history:i}),{battle:s}}function ac(){const e=he(),t=e.active;return t&&(t.status==="pending"||t.status==="active")?{error:"still_running",battle:t}:(Et({...e,active:null}),{ok:!0})}function nc(e=Date.now()){const t=u.liveGbChallengePop;return t?t.expiresAt&&e>t.expiresAt?(u={...u,liveGbChallengePop:null},E(u),null):!u.live||u.live.endedAt||t.liveId&&t.liveId!==u.live.id?null:{...t}:null}function rc({side:e="challenger",kind:t="gift",amount:s=2,label:i=""}={}){var k;if(!u.user)return{error:"signin"};let n=$a();if(!n||n.status!=="active")return{error:"no_active"};if(n=he().active,!n||n.status!=="active")return{error:"ended"};const o=Math.max(.5,Number(s)||1),r=t==="tip"?"tip":"gift",d=e==="opponent",c=d?n.opponent:n.challenger;let p=null;if(n.mode==="live"&&!d){if(p=or({kind:r,amount:o,label:i||(r==="gift"?"🔥 Fire":"Tip")}),p!=null&&p.error)return p}else(((k=u.wallet)==null?void 0:k.balance)||0)>=o&&br(o,`Gift battle ${r} · ${c.name} · TEST MODE`);const m={id:"gbg_"+Date.now().toString(36),side:d?"opponent":"challenger",userId:c.id,username:c.name,kind:r,amount:o,label:(i||(r==="gift"?"🔥 Fire":"Tip")).slice(0,40),at:Date.now()},g=Number(n.scoreA||0)+(d?0:o),f=Number(n.scoreB||0)+(d?o:0);let b={...n,scoreA:+g.toFixed(2),scoreB:+f.toFixed(2),giftLog:[...n.giftLog||[],m]};return b=wa(b),b.status==="ended"?xa(b):Et({...he(),active:b}),{battle:b,entry:m,live:(p==null?void 0:p.live)||null,wallet:u.wallet}}function Ea(){const t=he().active;if(!t||t.status!=="active")return t;const s=wa(t);return s.status==="ended"&&t.status!=="ended"?xa(s):s}function oc(e=20){return(he().history||[]).slice(0,e)}function lc(e=Date.now()){const t=he(),s=t.active;return s&&s.status==="ended"&&s.winnerId&&s.championUntil&&e<s.championUntil?{battleId:s.id,userId:s.winnerId,username:s.winnerName,score:s.winnerId===s.challenger.id?s.scoreA:s.scoreB,endedAt:s.endedAt,championUntil:s.championUntil,mode:s.mode}:(t.champions||[]).find(a=>a.championUntil&&e<a.championUntil)||null}function cc(e=15){var s;const t={};for(const i of he().history||[]){if(i.result!=="win"||!i.winnerId)continue;const a=t[i.winnerId]||{userId:i.winnerId,username:i.winnerName,wins:0,points:0};a.wins+=1;const n=i.winnerId===((s=i.challenger)==null?void 0:s.id)?Number(i.scoreA||0):Number(i.scoreB||0);a.points=+(a.points+n).toFixed(2),a.username=i.winnerName||a.username,t[i.winnerId]=a}return Object.values(t).sort((i,a)=>a.wins-i.wins||a.points-i.points||i.username.localeCompare(a.username)).slice(0,e)}function Aa(e=Pi,t=Date.now()){var d;const s=Math.min(Math.max(1,Number(e)||Pi),Pi),i=Zl(t),a=kr(t),n=new Set,o=[],r=c=>{if(!(c!=null&&c.userId)||!(c!=null&&c.username)||n.has(c.userId))return;const p=Number(c.endedAt||0);p<i||p>a||c.championUntil&&t>c.championUntil||(n.add(c.userId),o.push({userId:c.userId,username:c.username,score:Number(c.score||0),endedAt:p,championUntil:c.championUntil||a,battleId:c.battleId||c.id||null,mode:c.mode||"demo"}))};for(const c of he().champions||[])if(r(c),o.length>=s)return o;for(const c of he().history||[])if(!(c.result!=="win"||!c.winnerId)&&(r({userId:c.winnerId,username:c.winnerName,score:c.winnerId===((d=c.challenger)==null?void 0:d.id)?c.scoreA:c.scoreB,endedAt:c.endedAt,championUntil:c.championUntil||a,battleId:c.id,mode:c.mode}),o.length>=s))break;return o}const Ca=4,Ji=[{id:"maya",username:"MayaBeats",bio:"Creator · beats & live demos"},{id:"fanjay",username:"FanJay",bio:"Day-one fan · playlist curator"},{id:"ria",username:"RiaLoops",bio:"Demo co-host · loops & hooks"},{id:"dez",username:"DezOnMic",bio:"Demo guest · freestyle nights"}];function Ce(){return u.multiGuest||{active:null,history:[]}}function Re(e){return u={...u,multiGuest:e},E(u),e}function $s(e,t){const s=[e,...t],i=s.length||1,a=Math.floor(100/i*100)/100,n={};let o=0;return s.forEach((r,d)=>{d===s.length-1?n[r]=+(100-o).toFixed(2):(n[r]=a,o=+(o+a).toFixed(2))}),n}function gi(){Ss();const e={...u.profiles||{}};let t=!1;for(const s of Ji)e[s.id]||(e[s.id]={id:s.id,username:s.username,bio:s.bio,avatar:"",followers:[],following:["dbs"],verified:!1},t=!0);return t&&(u={...u,profiles:e},E(u)),Ji.map(s=>{const i=u.profiles[s.id]||s;return{id:s.id,username:i.username||s.username,bio:i.bio||s.bio,followers:(i.followers||[]).length}})}function dc(){return gi()}function vs(){return Ce().active||null}function pc(e=20){return(Ce().history||[]).slice(0,e)}function uc(e){const t=u.user;if(!t)return{error:"signin"};const s=Ce();if(s.active&&!s.active.endedAt)return{error:"session_in_progress",session:s.active};const i=String(e||"").trim().slice(0,80)||"Multi-Guest Live";gi();const a={id:"mg_"+Date.now().toString(36),title:i,hostId:t.id,hostName:t.username,startedAt:Date.now(),endedAt:null,maxGuests:Ca,guests:[],chat:[{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:"Multi-guest session started · TEST MODE · no camera / WebRTC",at:Date.now(),system:!0}],giftSplit:{mode:"equal",shares:{[t.id]:100},disclosed:!1,disclosedAt:null},broadcastReady:!1};return Re({...s,active:a}),{session:a}}function mc(e){var g;const t=u.user;if(!t)return{error:"signin"};const s=Ce(),i=s.active;if(!i||i.endedAt)return{error:"no_session"};if(i.hostId!==t.id)return{error:"host_only"};gi();const a=Ji.find(f=>f.id===e),n=(g=u.profiles)==null?void 0:g[e];if(!a&&!n)return{error:"unknown_guest"};if(e===t.id||e===i.hostId)return{error:"self"};const o=(i.guests||[]).find(f=>f.id===e);if(o&&(o.status==="invited"||o.status==="joined"))return{error:"already_invited",session:i};if((i.guests||[]).filter(f=>f.status==="joined"||f.status==="invited").length>=(i.maxGuests||Ca))return{error:"full"};const d={id:e,username:(n==null?void 0:n.username)||(a==null?void 0:a.username)||e,status:"invited",muted:!1,invitedAt:Date.now(),joinedAt:null},c=[...(i.guests||[]).filter(f=>f.id!==e),d],p=[...i.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`Invited @${d.username} to the stage`,at:Date.now(),system:!0}].slice(-80),m={...i,guests:c,chat:p,broadcastReady:!1};return m.giftSplit={...m.giftSplit,disclosed:!1,disclosedAt:null,shares:$s(i.hostId,c.filter(f=>f.status==="joined").map(f=>f.id))},Re({...s,active:m}),{session:m,guest:d}}function hc(e){var p;const t=u.user;if(!t)return{error:"signin"};const s=Ce(),i=s.active;if(!i||i.endedAt)return{error:"no_session"};if(i.hostId!==t.id)return{error:"host_only"};const a=(i.guests||[]).map(m=>({...m})),n=a.findIndex(m=>m.id===e);if(n<0)return{error:"not_found"};if(a[n].status==="joined")return{session:i,guest:a[n]};if(a.filter(m=>m.status==="joined").length>=(i.maxGuests||Ca))return{error:"full"};a[n]={...a[n],status:"joined",joinedAt:Date.now(),muted:!1};const r=a.filter(m=>m.status==="joined").map(m=>m.id),d=[...i.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`@${a[n].username} joined the stage`,at:Date.now(),system:!0}].slice(-80),c={...i,guests:a,chat:d,broadcastReady:!1,giftSplit:{mode:((p=i.giftSplit)==null?void 0:p.mode)||"equal",shares:$s(i.hostId,r),disclosed:!1,disclosedAt:null}};return Re({...s,active:c}),{session:c,guest:a[n]}}function gc(e){var d;const t=u.user;if(!t)return{error:"signin"};const s=Ce(),i=s.active;if(!i||i.endedAt)return{error:"no_session"};if(i.hostId!==t.id)return{error:"host_only"};const a=(i.guests||[]).map(c=>c.id===e?{...c,status:"declined"}:c);if(!(i.guests||[]).some(c=>c.id===e))return{error:"not_found"};const n=((d=(i.guests||[]).find(c=>c.id===e))==null?void 0:d.username)||e,o=[...i.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`@${n} declined the invite`,at:Date.now(),system:!0}].slice(-80),r={...i,guests:a,chat:o};return Re({...s,active:r}),{session:r}}function fc(e){var c,p;const t=u.user;if(!t)return{error:"signin"};const s=Ce(),i=s.active;if(!i||i.endedAt)return{error:"no_session"};if(i.hostId!==t.id&&t.id!==e)return{error:"forbidden"};const a=(i.guests||[]).map(m=>m.id===e?{...m,status:"left",muted:!1}:m);if(!(i.guests||[]).some(m=>m.id===e))return{error:"not_found"};const n=((c=(i.guests||[]).find(m=>m.id===e))==null?void 0:c.username)||e,o=a.filter(m=>m.status==="joined").map(m=>m.id),r=[...i.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`@${n} left the stage`,at:Date.now(),system:!0}].slice(-80),d={...i,guests:a,chat:r,broadcastReady:!1,giftSplit:{mode:((p=i.giftSplit)==null?void 0:p.mode)||"equal",shares:$s(i.hostId,o),disclosed:!1,disclosedAt:null}};return Re({...s,active:d}),{session:d}}function vc(e){var c,p;const t=u.user;if(!t)return{error:"signin"};const s=Ce(),i=s.active;if(!i||i.endedAt)return{error:"no_session"};if(i.hostId!==t.id)return{error:"host_only"};const a=(i.guests||[]).map(m=>m.id===e?{...m,status:"removed",muted:!1}:m);if(!(i.guests||[]).some(m=>m.id===e))return{error:"not_found"};const n=((c=(i.guests||[]).find(m=>m.id===e))==null?void 0:c.username)||e,o=a.filter(m=>m.status==="joined").map(m=>m.id),r=[...i.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`Host removed @${n} from the stage`,at:Date.now(),system:!0}].slice(-80),d={...i,guests:a,chat:r,broadcastReady:!1,giftSplit:{mode:((p=i.giftSplit)==null?void 0:p.mode)||"equal",shares:$s(i.hostId,o),disclosed:!1,disclosedAt:null}};return Re({...s,active:d}),{session:d}}function bc(e,t=!0){var c;const s=u.user;if(!s)return{error:"signin"};const i=Ce(),a=i.active;if(!a||a.endedAt)return{error:"no_session"};if(a.hostId!==s.id)return{error:"host_only"};const n=(a.guests||[]).map(p=>p.id===e&&p.status==="joined"?{...p,muted:!!t}:p);if(!(a.guests||[]).some(p=>p.id===e&&p.status==="joined"))return{error:"not_joined"};const o=((c=(a.guests||[]).find(p=>p.id===e))==null?void 0:c.username)||e,r=[...a.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:t?`Host muted @${o}`:`Host unmuted @${o}`,at:Date.now(),system:!0}].slice(-80),d={...a,guests:n,chat:r};return Re({...i,active:d}),{session:d}}function yc(e){const t=u.user;if(!t)return{error:"signin"};const s=Ce(),i=s.active;if(!i||i.endedAt)return{error:"no_session"};const a=String(e||"").trim().slice(0,280);if(!a)return{error:"empty"};const n={id:"c_"+Date.now().toString(36),userId:t.id,username:t.username,text:a,at:Date.now()},o=[...i.chat||[],n].slice(-80),r={...i,chat:o};return Re({...s,active:r}),{session:r,message:n}}function as({mode:e="equal",shares:t=null,disclose:s=!1}={}){var g,f;const i=u.user;if(!i)return{error:"signin"};const a=Ce(),n=a.active;if(!n||n.endedAt)return{error:"no_session"};if(n.hostId!==i.id)return{error:"host_only"};const o=(n.guests||[]).filter(b=>b.status==="joined").map(b=>b.id),r=[n.hostId,...o];let d,c=e==="custom"?"custom":"equal";if(c==="equal")d=$s(n.hostId,o);else{d={};let b=0;for(const k of r){const v=Math.max(0,Number(t==null?void 0:t[k])||0);d[k]=+v.toFixed(2),b+=d[k]}if(b=+b.toFixed(2),Math.abs(b-100)>.05)return{error:"split_total",total:b,expected:100}}const p={mode:c,shares:d,disclosed:!!s||!!((g=n.giftSplit)!=null&&g.disclosed),disclosedAt:s?Date.now():((f=n.giftSplit)==null?void 0:f.disclosedAt)||null};s&&(p.disclosed=!0),s&&(p.disclosedAt=Date.now());const m={...n,giftSplit:p,broadcastReady:!!p.disclosed};return Re({...a,active:m}),{session:m}}function kc(){var e,t,s,i;return as({mode:((t=(e=vs())==null?void 0:e.giftSplit)==null?void 0:t.mode)||"equal",shares:((i=(s=vs())==null?void 0:s.giftSplit)==null?void 0:i.shares)||null,disclose:!0})}function wc(){const e=u.user;if(!e)return{error:"signin"};const t=Ce(),s=t.active;if(!s||s.endedAt)return{error:"no_session"};if(s.hostId!==e.id)return{error:"host_only"};const i={...s,endedAt:Date.now(),broadcastReady:!1},a=[i,...(t.history||[]).filter(n=>n.id!==i.id)].slice(0,20);return Re({active:null,history:a}),{session:i}}const $r=["song","album","video","live","app","interview"],Ta=["draft","active","paused","ended"];function At(e){if(!e||typeof e!="object")return null;const t=e.fundSource==="third_party"?"third_party":"dbs",s=$r.includes(e.promoteType)?e.promoteType:"app",i=Ta.includes(e.status)?e.status:"draft",a=Number(e.deadline)||0;return{id:String(e.id||""),title:String(e.title||"").slice(0,120),promoteType:s,budget:Math.max(0,Number(e.budget)||0),deadline:a,fundSource:t,managementFeePct:t==="third_party"?20:0,reward:String(e.reward||"").slice(0,200),status:i,participants:Array.isArray(e.participants)?e.participants:[],submissions:Array.isArray(e.submissions)?e.submissions:[],createdAt:Number(e.createdAt)||Date.now(),createdBy:e.createdBy||null}}function Ft(e){u={...u,missions:e},E(u)}function fi({status:e=null}={}){const t=(u.missions||[]).map(At).filter(Boolean);if(!e)return t;const s=Array.isArray(e)?e:[e];return t.filter(i=>s.includes(i.status))}function Sc(e){return fi().find(t=>t.id===e)||null}function $c(e={}){var r;const t=String(e.title||"").trim().slice(0,120);if(!t)return{error:"required"};const s=$r.includes(e.promoteType)?e.promoteType:"app",i=e.fundSource==="third_party"?"third_party":"dbs";let a=e.deadline;if(typeof a=="string"&&a){const d=Date.parse(a);a=Number.isFinite(d)?d:Date.now()+7*864e5}else a=Number(a)||Date.now()+7*864e5;const n=Ta.includes(e.status)?e.status:"active",o=At({id:"msn_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),title:t,promoteType:s,budget:Number(e.budget)||0,deadline:a,fundSource:i,reward:String(e.reward||"").trim().slice(0,200)||"Demo reward · TEST MODE",status:n,participants:[],submissions:[],createdAt:Date.now(),createdBy:((r=u.user)==null?void 0:r.id)||"demo_admin"});return Ft([o,...u.missions||[]]),o}function xc(e,t){if(!Ta.includes(t))return{error:"bad_status"};let s=null;const i=(u.missions||[]).map(a=>{const n=At(a);return!n||n.id!==e?a:(s={...n,status:t},s)});return s?(Ft(i),s):{error:"not_found"}}function Ec(e){const t=u.user;if(!t)return{error:"signin"};let s=null;const i=(u.missions||[]).map(a=>{const n=At(a);if(!n||n.id!==e)return a;if(n.status!=="active")return s={error:"not_active",mission:n},a;if((n.participants||[]).some(d=>d.userId===t.id))return s={error:"already_joined",mission:n},a;const r={userId:t.id,username:t.username||"creator",joinedAt:Date.now(),score:0,referralCode:"REF-"+t.id.slice(0,6).toUpperCase()+"-"+Math.random().toString(36).slice(2,5).toUpperCase()};return s={...n,participants:[...n.participants||[],r]},s});return s?(s.error||Ft(i),s):{error:"not_found"}}function Ac(e,{proof:t=""}={}){const s=u.user;if(!s)return{error:"signin"};const i=String(t||"").trim().slice(0,400);if(!i)return{error:"required"};let a=null;const n=(u.missions||[]).map(o=>{const r=At(o);if(!r||r.id!==e)return o;if(r.status!=="active")return a={error:"not_active",mission:r},o;if(!(r.participants||[]).some(m=>m.userId===s.id))return a={error:"not_joined",mission:r},o;const c={id:"sub_"+Date.now().toString(36)+Math.random().toString(36).slice(2,5),userId:s.id,username:s.username||"creator",proof:i,at:Date.now(),status:"pending"},p=(r.participants||[]).map(m=>m.userId===s.id?{...m,score:(Number(m.score)||0)+10}:m);return a={...r,participants:p,submissions:[c,...r.submissions||[]]},a});return a?(a.error||Ft(n),a):{error:"not_found"}}function Cc(e,t=5){const s=u.user;if(!s)return{error:"signin"};const i=Math.max(1,Math.min(50,Number(t)||5));let a=null;const n=(u.missions||[]).map(o=>{const r=At(o);if(!r||r.id!==e)return o;if(!(r.participants||[]).some(p=>p.userId===s.id))return a={error:"not_joined",mission:r},o;const c=(r.participants||[]).map(p=>p.userId===s.id?{...p,score:(Number(p.score)||0)+i}:p);return a={...r,participants:c},a});return a?(a.error||Ft(n),a):{error:"not_found"}}function Tc(e){const t=Sc(e);return t?[...t.participants||[]].map(s=>({userId:s.userId,username:s.username,score:Number(s.score)||0,referralCode:s.referralCode||"",joinedAt:s.joinedAt,submissions:(t.submissions||[]).filter(i=>i.userId===s.userId).length})).sort((s,i)=>i.score-s.score||(s.joinedAt||0)-(i.joinedAt||0)):[]}function Dc({force:e=!1}={}){if((u.missions||[]).length&&!e)return{skipped:!0,missions:fi()};const s=Date.now(),i=864e5,a=[{id:"msn_demo_song",title:"Push Long Story Short (clip challenge)",promoteType:"song",budget:2500,deadline:s+14*i,fundSource:"dbs",reward:"$50–$200 demo credits by rank · DBS-funded marketing",status:"active",participants:[{userId:"clipper_demo",username:"ClipQueen",joinedAt:s-2*i,score:42,referralCode:"REF-CLIP-AAA"},{userId:"dbs",username:"DatBoiSkeet",joinedAt:s-i,score:28,referralCode:"REF-DBS-001"}],submissions:[{id:"sub_demo1",userId:"clipper_demo",username:"ClipQueen",proof:"https://example.com/tiktok/lss-clip-1 · 12k views",at:s-i,status:"pending"}],createdAt:s-3*i,createdBy:"demo_admin"},{id:"msn_demo_live",title:"Boost Friday Night Live",promoteType:"live",budget:800,deadline:s+5*i,fundSource:"third_party",reward:"Share of $800 pot after 20% management fee",status:"active",participants:[],submissions:[],createdAt:s-i,createdBy:"demo_admin"},{id:"msn_demo_app",title:"Download DBS · invite 3 friends",promoteType:"app",budget:1200,deadline:s+30*i,fundSource:"dbs",reward:"Referral bonus stack · verified installs only",status:"active",participants:[],submissions:[],createdAt:s-5*i,createdBy:"demo_admin"},{id:"msn_demo_ended",title:"Ladies Only teaser push (ended)",promoteType:"video",budget:500,deadline:s-2*i,fundSource:"third_party",reward:"Completed · demo archive",status:"ended",participants:[{userId:"clipper_demo",username:"ClipQueen",joinedAt:s-10*i,score:90,referralCode:"REF-CLIP-OLD"}],submissions:[],createdAt:s-20*i,createdBy:"demo_admin"}].map(At);return Ft(a),{seeded:a.length,missions:a}}const xr=60*1e3,Da=60*1e3,bs=2,vi=3,bi=3,xs=3,Mc=["song","beat","music_video"],Lc=[...Mc,"freestyle"];function Er(){const e=u.spotlight||{};return{nowPlaying:e.nowPlaying||null,queue:Array.isArray(e.queue)?e.queue:[],history:Array.isArray(e.history)?e.history:[],houseIndex:typeof e.houseIndex=="number"?e.houseIndex:0}}function me(e){return u={...u,spotlight:e},E(u),e}function Ic(e){return e==="freestyle"?"Live Freestyle":e==="beat"?"Beat":e==="music_video"?"Music Video":"Song"}function Qi(e,t="ended"){return e?{id:e.id,userId:e.userId,username:e.username,type:e.type,title:e.title,artist:e.artist,startedAt:e.startedAt,endedAt:Date.now(),extensions:e.extensions||0,playCount:e.playCount||1,reason:t}:null}function ce(e=Date.now()){let t=Er(),s=t.nowPlaying;if(!s)return Pc(t,e);if(s.house)return t;if(s.type==="freestyle"&&s.endsAt&&e>=s.endsAt&&!s.awaitingPlayAnother){if(Object.keys(s.keepGoingVotes||{}).length>=vi&&(s.extensions||0)<bs&&!s.extensionApplied){s={...s,extensions:(s.extensions||0)+1,endsAt:e+Da,keepGoingVotes:{},extensionApplied:!1,voteWindowOpen:!0};const p={...t,nowPlaying:s};return me(p),p}const n=[Qi(s,"timer"),...t.history||[]].slice(0,30),o=[...t.queue||[]];let r=null,d=typeof t.houseIndex=="number"?t.houseIndex:0;if(o.length){const p=o.shift();r=ei(p,e)}else r=ti($t(d),e);const c={nowPlaying:r,queue:o,history:n,houseIndex:d};return me(c),c}if(s.awaitingPlayAnother&&s.playAnotherDeadline&&e>=s.playAnotherDeadline){const i=Object.keys(s.playAnotherVotes||{}).length,a=s.playCount||1;if(i>=bi&&a<xs){s={...s,awaitingPlayAnother:!1,playAnotherVotes:{},playAnotherDeadline:null,playCount:a+1,title:s.nextTitle||s.title,startedAt:e,endsAt:null,nextTitle:null};const p={...t,nowPlaying:s};return me(p),p}const n=[Qi(s,"play_another_fail"),...t.history||[]].slice(0,30),o=[...t.queue||[]];let r=null,d=typeof t.houseIndex=="number"?t.houseIndex:0;o.length?r=ei(o.shift(),e):r=ti($t(d),e);const c={nowPlaying:r,queue:o,history:n,houseIndex:d};return me(c),c}return t}function ei(e,t=Date.now()){const s=e.type==="freestyle";return{id:"sp_"+t.toString(36)+"_"+Math.random().toString(36).slice(2,6),userId:e.userId,username:e.username,type:e.type,title:e.title||(s?"Live Freestyle":"Untitled"),artist:e.artist||e.username,cover:e.cover||"",startedAt:t,endsAt:s?t+xr:null,extensions:0,playCount:1,keepGoingVotes:{},playAnotherVotes:{},voteWindowOpen:s,awaitingPlayAnother:!1,playAnotherDeadline:null,reactions:{fire:0,heart:0,clap:0},chat:[{id:"c_"+t.toString(36),userId:"system",username:"DBS",text:`${e.username} took the Spotlight · ${Ic(e.type)} · TEST MODE`,at:t,system:!0}]}}function oe(){const e=ce();return{nowPlaying:e.nowPlaying||null,queue:[...e.queue||[]],history:[...e.history||[]],houseIndex:typeof e.houseIndex=="number"?e.houseIndex:0,thresholds:{keepGoing:vi,playAnother:bi,maxExtensions:bs,maxUploadStreak:xs,freestyleMs:xr}}}function Ar(){const e=[];for(const s of ge||[])!s||!s.embed||(s.category==="Music Videos"?e.push({id:s.id,title:s.title,artist:s.artist||"DatBoiSkeet",embed:s.embed,youtube:s.youtube||"",kind:"music_video",chipLabel:"House · Music Video",note:"DatBoiSkeet catalog · original YouTube · not a live act",cover:s.cover||""}):s.category==="Interviews"&&e.push({id:s.id,title:s.title,artist:s.artist||"DatBoiSkeet",embed:s.embed,youtube:s.youtube||"",kind:"interview",chipLabel:"House · Interview",note:"DatBoiSkeet interview · original YouTube · not a live act",cover:s.cover||""}));const t=(Hi||[]).find(s=>s.id==="pl-vlogs");if(t&&t.youtube){const s=String(t.youtube).match(/[?&]list=([^&]+)/),i=s&&s[1];i&&e.push({id:"house-bts-vlogs",title:t.title||"DatBoiSkeet Vlogs",artist:"DatBoiSkeet",embed:"https://www.youtube.com/embed/videoseries?list="+i,youtube:t.youtube,kind:"bts",chipLabel:"House · BTS",note:"Channel vlogs · dedicated BTS clips thin · original YouTube · not a live act",cover:""})}return e}function Cr(){const e=Ar().length;return e>0?e:1}function $t(e){const t=Ar();if(!t.length)return{id:"house_empty",title:"DatBoiSkeet catalog",artist:"DatBoiSkeet",embed:"",youtube:"https://www.youtube.com/@DatBoiSkeet1",kind:"music_video",chipLabel:"House · Music Video",note:"Catalog loading · not a live act",cover:"",status:"House rotation"};const s=(e%t.length+t.length)%t.length;return{...t[s],status:t[s].chipLabel}}function ti(e,t=Date.now()){return{id:"house_"+(e.id||"x")+"_"+t.toString(36),userId:"dbs",username:"DatBoiSkeet",type:"music_video",house:!0,houseKind:e.kind||"music_video",chipLabel:e.chipLabel||"House · Music Video",title:e.title,artist:e.artist||"DatBoiSkeet",embed:e.embed||"",youtube:e.youtube||"",note:e.note||"House catalog · not a live act",cover:e.cover||"",startedAt:t,endsAt:null,extensions:0,playCount:1,keepGoingVotes:{},playAnotherVotes:{},voteWindowOpen:!1,awaitingPlayAnother:!1,playAnotherDeadline:null,reactions:{fire:0,heart:0,clap:0},chat:[{id:"c_house_"+t.toString(36),userId:"system",username:"DBS",text:`House catalog · ${e.chipLabel||"House"} · ${e.title} · not a live act · TEST MODE`,at:t,system:!0}]}}function Pc(e,t=Date.now()){if(e.nowPlaying)return e;const s=typeof e.houseIndex=="number"?e.houseIndex:0,i=$t(s),a=ti(i,t),n={...e,nowPlaying:a,houseIndex:s};return me(n),n}function Tr(){const e=Er();return $t(typeof e.houseIndex=="number"?e.houseIndex:0)}function _c({type:e="song",title:t="",artist:s=""}={}){const i=u.user;if(!i)return{error:"signin"};const a=Lc.includes(e)?e:"song",n=ce(),o=i.id,r=(n.queue||[]).some(k=>k.userId===o),d=n.nowPlaying&&!n.nowPlaying.house&&n.nowPlaying.userId===o&&!n.nowPlaying.awaitingPlayAnother;if(r||d)return{error:"already_queued",state:oe()};const c=String(t||"").trim().slice(0,80)||(a==="freestyle"?"Live Freestyle":a==="beat"?"Untitled Beat":a==="music_video"?"Untitled MV":"Untitled Song"),p=String(s||i.username||"").trim().slice(0,60),m={id:"q_"+Date.now().toString(36),userId:o,username:i.username,type:a,title:c,artist:p,cover:"",joinedAt:Date.now()};let g=n.nowPlaying,f=[...n.queue||[]],b=typeof n.houseIndex=="number"?n.houseIndex:0;return g?(g.house,f.push(m)):(g=ei(m),f=[]),me({...n,nowPlaying:g,queue:f,houseIndex:b}),{ok:!0,state:oe()}}function ln(){const e=u.user;if(!e)return{error:"signin"};const t=ce(),s=(t.queue||[]).length,i=(t.queue||[]).filter(a=>a.userId!==e.id);return i.length===s?{error:"not_in_queue"}:(me({...t,queue:i}),{ok:!0,state:oe()})}function Oc(e){if(!u.user)return{error:"signin"};const s=ce(),i=(s.queue||[]).filter(a=>a.id!==e);return me({...s,queue:i}),{ok:!0,state:oe()}}function Dr(e="advance"){if(!u.user)return{error:"signin"};const s=ce(),i=s.nowPlaying,a=!!(i&&i.house),n=i&&!a?[Qi(i,e),...s.history||[]].slice(0,30):[...s.history||[]],o=[...s.queue||[]];let r=typeof s.houseIndex=="number"?s.houseIndex:0;a&&(r=(r+1)%Cr());let d=null;return o.length?d=ei(o.shift()):d=ti($t(r)),me({nowPlaying:d,queue:o,history:n,houseIndex:r}),{ok:!0,state:oe()}}function qc(){return Dr("skip")}function Nc(){const e=u.user;if(!e)return{error:"signin"};const t=ce(),s=t.nowPlaying;if(!s)return{error:"empty_stage"};if(s.house)return{error:"house_use_skip"};if(s.type==="freestyle")return{error:"freestyle_use_timer"};if(s.awaitingPlayAnother)return{error:"already_voting"};!(s.userId===e.id)&&ie();const a=s.playCount||1;if(a>=xs)return Dr("max_streak");const n={...s,awaitingPlayAnother:!0,playAnotherVotes:{},playAnotherDeadline:Date.now()+30*1e3,nextTitle:s.title+" (take "+(a+1)+")"};return me({...t,nowPlaying:n}),{ok:!0,state:oe()}}function Bc(){const e=u.user;if(!e)return{error:"signin"};const t=ce(),s=t.nowPlaying;if(!s||s.type!=="freestyle")return{error:"no_freestyle"};if(!s.voteWindowOpen)return{error:"window_closed"};if(s.awaitingPlayAnother)return{error:"wrong_mode"};if((s.extensions||0)>=bs)return{error:"max_extensions"};const i={...s.keepGoingVotes||{}};if(i[e.id])return{error:"already_voted",state:oe()};i[e.id]=Date.now();let a={...s,keepGoingVotes:i};const n=Object.keys(i).length;return n>=vi&&(s.extensions||0)<bs&&(a={...a,extensions:(s.extensions||0)+1,endsAt:Date.now()+Da,keepGoingVotes:{},voteWindowOpen:!0}),me({...t,nowPlaying:a}),{ok:!0,state:oe(),votes:Object.keys(a.keepGoingVotes||{}).length||n}}function Rc(e=2){const t=ce(),s=t.nowPlaying;if(!s||s.type!=="freestyle")return{error:"no_freestyle"};const i={...s.keepGoingVotes||{}},a=Object.keys(i).length;for(let r=0;r<e;r++){const d="fan_sim_"+(a+r)+"_"+Date.now().toString(36);i[d]=Date.now()}let n={...s,keepGoingVotes:i};return Object.keys(i).length>=vi&&(s.extensions||0)<bs&&(n={...n,extensions:(s.extensions||0)+1,endsAt:Date.now()+Da,keepGoingVotes:{},voteWindowOpen:!0}),me({...t,nowPlaying:n}),{ok:!0,state:oe()}}function jc(){const e=u.user;if(!e)return{error:"signin"};const t=ce(),s=t.nowPlaying;if(!s||!s.awaitingPlayAnother)return{error:"no_vote"};const i={...s.playAnotherVotes||{}};if(i[e.id])return{error:"already_voted",state:oe()};i[e.id]=Date.now();let a={...s,playAnotherVotes:i};const n=Object.keys(i).length,o=s.playCount||1;return n>=bi&&o<xs&&(a={...a,awaitingPlayAnother:!1,playAnotherVotes:{},playAnotherDeadline:null,playCount:o+1,title:s.nextTitle||s.title,startedAt:Date.now(),endsAt:null,nextTitle:null}),me({...t,nowPlaying:a}),{ok:!0,state:oe()}}function Fc(e=2){const t=ce(),s=t.nowPlaying;if(!s||!s.awaitingPlayAnother)return{error:"no_vote"};const i={...s.playAnotherVotes||{}},a=Object.keys(i).length;for(let d=0;d<e;d++)i["fan_pa_"+(a+d)+"_"+Date.now().toString(36)]=Date.now();let n={...s,playAnotherVotes:i};const o=Object.keys(i).length,r=s.playCount||1;return o>=bi&&r<xs&&(n={...n,awaitingPlayAnother:!1,playAnotherVotes:{},playAnotherDeadline:null,playCount:r+1,title:s.nextTitle||s.title,startedAt:Date.now(),endsAt:null,nextTitle:null}),me({...t,nowPlaying:n}),{ok:!0,state:oe()}}function Kc(e="fire"){const t=ce(),s=t.nowPlaying;if(!s)return{error:"empty_stage"};const i=["fire","heart","clap"].includes(e)?e:"fire",a={...s.reactions||{fire:0,heart:0,clap:0}};return a[i]=(a[i]||0)+1,me({...t,nowPlaying:{...s,reactions:a}}),{ok:!0,state:oe()}}function Gc(e){const t=u.user;if(!t)return{error:"signin"};const s=String(e||"").trim().slice(0,200);if(!s)return{error:"empty"};const i=ce(),a=i.nowPlaying;if(!a)return{error:"empty_stage"};const n=[...a.chat||[],{id:"c_"+Date.now().toString(36),userId:t.id,username:t.username,text:s,at:Date.now()}].slice(-40);return me({...i,nowPlaying:{...a,chat:n}}),{ok:!0,state:oe()}}function Vc(e=20){return(ce().history||[]).slice(0,e)}function je(){const e=u.fanClubs||{clubs:[],posts:{},seeded:!1};return{clubs:Array.isArray(e.clubs)?e.clubs:[],posts:e.posts&&typeof e.posts=="object"?e.posts:{},seeded:!!e.seeded}}function Kt(e){u={...u,fanClubs:e},E(u)}function Mr(e){return e+"_"+Date.now().toString(36)+Math.random().toString(36).slice(2,7)}function Lr(){return Fe(),je().clubs.slice().sort((e,t)=>e.official&&!t.official?-1:!e.official&&t.official?1:(t.memberCount||0)-(e.memberCount||0))}function Es(e){return Fe(),je().clubs.find(t=>t.id===e)||null}function Fe({force:e=!1}={}){const t=je();if(t.seeded&&!e&&t.clubs.length>0)return{skipped:!0,clubs:t.clubs};const s=Date.now(),i=864e5,a=[{id:"fc_official_dbs",name:"DatBoiSkeet Official",description:"Official DatBoiSkeet fan club inside DBS Lounge. Music drops, Vault tips, Foreign X-Change, and community rules — DBS branding first. Follow optional.",graphic:"/brand/logo-dbs-v3@2x.webp",hostId:"dbs",hostName:"DatBoiSkeet",privacy:"public",official:!0,members:["dbs"],followers:["dbs"],mods:["dbs"],memberCount:1,createdAt:s-14*i},{id:"fc_lss_crew",name:"Long Story Short Crew",description:"Creator club for LSS listeners. Public lounge chat + Skeet+ members-only drop room.",graphic:"/music/01_Long_Story_Short_Coming_Soon.jpg",hostId:"dbs",hostName:"DatBoiSkeet",privacy:"members",official:!1,members:["dbs"],followers:["dbs"],mods:["dbs"],memberCount:1,createdAt:s-7*i},{id:"fc_ladies_only",name:"Ladies Only Circle",description:"Paid / Skeet+ gated room demo for Ladies Only supporters. Unlock via membership TEST MODE.",graphic:"/music/02_Ladies_Only_Coming_Soon.jpg",hostId:"dbs",hostName:"DatBoiSkeet",privacy:"paid",official:!1,members:["dbs"],followers:[],mods:["dbs"],memberCount:1,createdAt:s-3*i}],n={fc_official_dbs:[{id:"fcp_welcome",userId:"dbs",username:"DatBoiSkeet",text:"Welcome to the official club. Discover music on #/music · explore more on #/explore. No forced follows.",at:s-2*i,pinned:!0,removed:!1},{id:"fcp_lounge",userId:"dbs",username:"DatBoiSkeet",text:"DBS Lounge rooms stay music-first. Keep it respectful — see Community Guidelines.",at:s-i,pinned:!1,removed:!1}],fc_lss_crew:[{id:"fcp_lss1",userId:"dbs",username:"DatBoiSkeet",text:"LSS cover art is live in Coming Soon. Members can discuss theories here.",at:s-i,pinned:!1,removed:!1}],fc_ladies_only:[{id:"fcp_lo1",userId:"dbs",username:"DatBoiSkeet",text:"Skeet+ members-only preview chat. Join Skeet+ on Pricing (TEST MODE) to unlock.",at:s-12*36e5,pinned:!0,removed:!1}]};return Kt({clubs:a,posts:n,seeded:!0}),{seeded:a.length,clubs:a}}function Uc({name:e,description:t,graphic:s,privacy:i="public"}={}){const a=u.user;if(!a)return{error:"signin"};ie()||a.role==="creator"||a.id;const n=String(e||"").trim().slice(0,48);if(!n)return{error:"name"};const o=["public","members","paid"].includes(i)?i:"public";Fe();const r=je(),d={id:Mr("fc"),name:n,description:String(t||"").trim().slice(0,280),graphic:String(s||"/brand/logo-dbs-v3@2x.webp").slice(0,200),hostId:a.id,hostName:a.username,privacy:o,official:!1,members:[a.id],followers:[a.id],mods:[a.id],memberCount:1,createdAt:Date.now()};return Kt({...r,clubs:[d,...r.clubs],posts:{...r.posts,[d.id]:[]},seeded:!0}),{ok:!0,club:d}}function yi(e,t){Fe();const s=je(),i=s.clubs.findIndex(o=>o.id===e);if(i<0)return{error:"missing"};const a=t({...s.clubs[i]});if(a&&a.error)return a;const n=s.clubs.slice();return n[i]=a,Kt({...s,clubs:n}),{ok:!0,club:a}}function Ir(e){const t=u.user;return t?yi(e,s=>{const i=new Set(s.members||[]);return i.add(t.id),{...s,members:[...i],memberCount:i.size}}):{error:"signin"}}function Hc(e){const t=u.user;return t?yi(e,s=>{if(s.hostId===t.id)return{error:"host"};const i=(s.members||[]).filter(a=>a!==t.id);return{...s,members:i,memberCount:i.length}}):{error:"signin"}}function zc(e){const t=u.user;return t?yi(e,s=>{const i=new Set(s.followers||[]);return i.add(t.id),{...s,followers:[...i]}}):{error:"signin"}}function Wc(e){const t=u.user;return t?yi(e,s=>{const i=(s.followers||[]).filter(a=>a!==t.id);return{...s,followers:i}}):{error:"signin"}}function Pr(e){const t=u.user;if(!t)return!1;const s=Es(e);return!!(s&&(s.members||[]).includes(t.id))}function Yc(e){const t=u.user;if(!t)return!1;const s=Es(e);return!!(s&&(s.followers||[]).includes(t.id))}function ys(e){const t=u.user;if(!t)return!1;const s=Es(e);return s?ie()||s.hostId===t.id||(s.mods||[]).includes(t.id):!1}function _r(e){const t=Es(e);if(!t)return{ok:!1,reason:"missing"};if(t.privacy==="public")return{ok:!0,reason:"public"};if(t.privacy==="members")return Pr(e)||ys(e)?{ok:!0,reason:"member"}:{ok:!1,reason:"members"};if(t.privacy==="paid"){const s=xt();return({null:0,"skeet+":1,backstage:2,inner:3}[s||"null"]||0)>=1||ys(e)?{ok:!0,reason:"paid"}:{ok:!1,reason:"paid"}}return{ok:!0,reason:"public"}}function Jc(e){return Fe(),(je().posts[e]||[]).filter(s=>!s.removed).slice().sort((s,i)=>s.pinned&&!i.pinned?-1:!s.pinned&&i.pinned?1:(i.at||0)-(s.at||0))}function Qc(e,t){const s=u.user;if(!s)return{error:"signin"};const i=_r(e);if(!i.ok)return{error:"gated",reason:i.reason};const a=String(t||"").trim().slice(0,500);if(!a)return{error:"empty"};const n=je();if(!n.clubs.some(d=>d.id===e))return{error:"missing"};const o={id:Mr("fcp"),userId:s.id,username:s.username,text:a,at:Date.now(),pinned:!1,removed:!1},r=[o,...n.posts[e]||[]].slice(0,100);return Kt({...n,posts:{...n.posts,[e]:r}}),{ok:!0,post:o}}function Xc(e,t){if(!ys(e))return{error:"mod"};const s=je(),i=(s.posts[e]||[]).map(a=>a.id===t?{...a,pinned:!a.pinned}:a);return Kt({...s,posts:{...s.posts,[e]:i}}),{ok:!0}}function Zc(e,t){if(!ys(e))return{error:"mod"};const s=je(),i=(s.posts[e]||[]).map(a=>a.id===t?{...a,removed:!0}:a);return Kt({...s,posts:{...s.posts,[e]:i}}),{ok:!0}}const Ma=["instagram","tiktok","facebook","youtube","x","snapchat","other"],Or=[{id:"badge",minVerified:1,label:"Exclusive DBS badge",kind:"badge"},{id:"decoration",minVerified:2,label:"Premium avatar decoration",kind:"decoration"},{id:"skeet7",minVerified:3,label:"7 days Skeet+ (TEST MODE)",kind:"membership_trial",membership:"skeet+",days:7},{id:"skeet30",minVerified:3,requireAllLinked:!0,label:"30 days Skeet+ (all linked · min 3)",kind:"membership_trial",membership:"skeet+",days:30}],qr=[{n:1,id:"m1",label:"Profile decoration",kind:"decoration"},{n:3,id:"m3",label:"7 days Skeet+ (TEST MODE)",kind:"membership_trial",membership:"skeet+",days:7},{n:5,id:"m5",label:"30 days Skeet+ (TEST MODE)",kind:"membership_trial",membership:"skeet+",days:30},{n:10,id:"m10",label:"Premium profile bundle",kind:"bundle"},{n:25,id:"m25",label:"30 days Backstage (TEST MODE)",kind:"membership_trial",membership:"backstage",days:30},{n:50,id:"m50",label:"30 days Inner Circle (TEST MODE)",kind:"membership_trial",membership:"inner",days:30},{n:100,id:"m100",label:"Founder Promoter badge / VIP",kind:"badge"}];function Nr(){return{platformsLinked:[],challenge:null,submissions:[],rewardsClaimed:[]}}function Br(){return{code:"",invitees:[],milestonesClaimed:[]}}function Rr(e){const t=Nr();return!e||typeof e!="object"?t:{platformsLinked:Array.isArray(e.platformsLinked)?e.platformsLinked:[],challenge:e.challenge&&typeof e.challenge=="object"?e.challenge:null,submissions:Array.isArray(e.submissions)?e.submissions:[],rewardsClaimed:Array.isArray(e.rewardsClaimed)?e.rewardsClaimed:[]}}function jr(e){const t=Br();return!e||typeof e!="object"?t:{code:typeof e.code=="string"?e.code:"",invitees:Array.isArray(e.invitees)?e.invitees:[],milestonesClaimed:Array.isArray(e.milestonesClaimed)?e.milestonesClaimed:[]}}function Je(e){return u={...u,shareEarn:Rr(e)},E(u),u.shareEarn}function rt(e){return u={...u,referEarn:jr(e)},E(u),u.referEarn}function Fr(e){if(!e)return"DBS-GUEST";const t=String(e.username||"fan").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,8)||"FAN",s=String(e.id||"").replace(/^u_/,"").slice(-4).toUpperCase()||"DEMO";return`DBS-${t}-${s}`}function Ct(e){return e+"_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function ns(e=Date.now()){return new Date(e).toISOString().slice(0,10)}function ee(){return Rr(u.shareEarn)}function cn(){return Ma.slice()}function ed(){return Or.map(e=>({...e}))}function td({platform:e,handle:t="",url:s="",followers:i=""}={}){if(!u.user)return{error:"signin"};const n=String(e||"").toLowerCase().trim();if(!Ma.includes(n))return{error:"bad_platform"};const o=String(t||"").trim().replace(/^@+/,"").slice(0,64),r=String(s||"").trim().slice(0,240);if(!o&&!r)return{error:"required"};const d=ee();if((d.platformsLinked||[]).some(m=>m.platform===n))return{error:"already_linked",shareEarn:d};const c={id:Ct("plat"),platform:n,handle:o,url:r,followers:String(i||"").trim().slice(0,32),linkedAt:Date.now()},p={...d,platformsLinked:[...d.platformsLinked||[],c]};return Je(p),{ok:!0,platform:c,shareEarn:ee()}}function sd(e){const t=ee(),s={...t,platformsLinked:(t.platformsLinked||[]).filter(i=>i.id!==e)};return Je(s),ee()}function id(){if(!u.user)return{error:"signin"};const t=ee();if(t.challenge&&t.challenge.status==="active")return{error:"already_active",shareEarn:t};const s=Gt().code,i=Date.now(),a={id:Ct("ch"),startedAt:i,endsAt:i+24*60*60*1e3,adTitle:"DatBoiSkeet · Long Story Short & Ladies Only",caption:"🔥 Join me on DBS — music, live, vault & more. Long Story Short + Ladies Only Coming Soon. #DBS #PaidPartnership #ad",trackedLink:`https://dbs.app/s/${s}?utm=share24`,status:"active",disclosure:"Incentivized promotion · disclose #ad / Paid partnership"};return Je({...t,challenge:a,submissions:[],rewardsClaimed:(t.rewardsClaimed||[]).filter(n=>n.challengeId!==a.id)}),{ok:!0,challenge:a,shareEarn:ee()}}function ad(){const e=ee();if(!e.challenge||e.challenge.status!=="active")return{error:"no_active"};const t={...e.challenge,startedAt:Date.now()-25*60*60*1e3,endsAt:Date.now()-1*60*60*1e3,simulatedElapsed:!0};return Je({...e,challenge:t}),{ok:!0,challenge:t,shareEarn:ee()}}function nd(){const e=ee();if(!e.challenge)return{error:"none"};const t={...e.challenge,status:"ended",endedAt:Date.now()};return Je({...e,challenge:t}),{ok:!0,challenge:t,shareEarn:ee()}}function rd({platform:e,postUrl:t=""}={}){if(!u.user)return{error:"signin"};const i=ee();if(!i.challenge||i.challenge.status!=="active")return{error:"no_challenge"};const a=String(e||"").toLowerCase().trim();if(!Ma.includes(a))return{error:"bad_platform"};const n=String(t||"").trim().slice(0,400);if(!n)return{error:"required"};if((i.submissions||[]).some(d=>d.platform===a&&(d.status==="pending"||d.status==="verified")))return{error:"duplicate",shareEarn:i};const r={id:Ct("sub"),platform:a,postUrl:n,submittedAt:Date.now(),status:"pending",note:"Awaiting 24h continuous visibility check (manual/demo)"};return Je({...i,submissions:[r,...i.submissions||[]]}),{ok:!0,submission:r,shareEarn:ee()}}function dn(e,t,{note:s=""}={}){if(!["pending","verified","rejected"].includes(t))return{error:"bad_status"};const i=ee();let a=null;const n=(i.submissions||[]).map(o=>o.id!==e?o:(a={...o,status:t,verifiedAt:t==="verified"?Date.now():o.verifiedAt||null,note:s||(t==="verified"?"Demo verified · 24h visibility assumed (manual)":t==="rejected"?"Rejected · ineligible / deleted / unverified":o.note)},a));return a?(Je({...i,submissions:n}),{ok:!0,submission:a,shareEarn:ee()}):{error:"not_found"}}function Kr(){const e=ee();return new Set((e.submissions||[]).filter(s=>s.status==="verified").map(s=>s.platform)).size}function Gr(){const e=ee(),t=Kr(),s=(e.platformsLinked||[]).length,i=new Set((e.rewardsClaimed||[]).map(a=>a.tierId));return Or.filter(a=>{if(i.has(a.id)||t<a.minVerified)return!1;if(a.requireAllLinked){if(s<3)return!1;const n=new Set((e.platformsLinked||[]).map(r=>r.platform)),o=new Set((e.submissions||[]).filter(r=>r.status==="verified").map(r=>r.platform));for(const r of n)if(!o.has(r))return!1}return!0}).map(a=>({...a,verifiedCount:t,linkedCount:s}))}function od(e){var o;if(!u.user)return{error:"signin"};const i=Gr().find(r=>r.id===e);if(!i)return{error:"not_claimable"};const a=ee(),n={id:Ct("srw"),tierId:i.id,label:i.label,kind:i.kind,at:Date.now(),challengeId:((o=a.challenge)==null?void 0:o.id)||null,testMode:!0};return i.membership&&li(i.membership,!0),Je({...a,rewardsClaimed:[n,...a.rewardsClaimed||[]]}),{ok:!0,claim:n,shareEarn:ee(),membership:xt()}}function ld(){return Je(Nr()),ee()}function xe(){return jr(u.referEarn)}function cd(){return qr.map(e=>({...e}))}function Gt(){const e=u.user,t=xe();if(t.code)return t;const s=Fr(e);return rt({...t,code:s})}function Vr(){return`https://dbs.app/r/${Gt().code}`}function dd({username:e=""}={}){const t=u.user;if(!t)return{error:"signin"};const s=Gt(),i=String(e||"").trim().slice(0,24)||"Invitee"+(s.invitees.length+1);if(i.toLowerCase()===String(t.username||"").toLowerCase())return{error:"self_referral"};const a={id:Ct("inv"),username:i,signedUpAt:Date.now(),activeDays:[],status:"pending",welcomeClaimed:!1,flaggedFraud:!1};return rt({...s,invitees:[a,...s.invitees||[]]}),{ok:!0,invitee:a,referEarn:xe()}}function pd(e){const t=xe();let s=null;const i=(t.invitees||[]).map(a=>a.id!==e?a:a.flaggedFraud?(s={error:"fraud",invitee:a},a):(s={...a,welcomeClaimed:!0,welcomeAt:Date.now()},s));return s?s.error?s:(rt({...t,invitees:i}),{ok:!0,invitee:s,perk:"Welcome badge / profile decoration (TEST MODE)"}):{error:"not_found"}}function ud(e,{day:t=null}={}){const s=xe();let i=null;const a=(s.invitees||[]).map(n=>{if(n.id!==e)return n;if(n.flaggedFraud)return i={error:"fraud",invitee:n},n;const o=Number(n.signedUpAt)||Date.now(),r=o+7*864e5;let d=t;if(!d){const g=new Set(n.activeDays||[]);let f=null;for(let b=0;b<7;b++){const k=ns(o+b*864e5);if(!g.has(k)){f=k;break}}if(!f)return i={error:"window_full",invitee:n},n;d=f}const c=Date.parse(d+"T12:00:00Z");if(!Number.isFinite(c)||c<o-864e5||c>r)return i={error:"outside_window",invitee:n},n;const p=Array.from(new Set([...n.activeDays||[],d])).sort();let m=n.status;return p.length>=3&&(m="active"),i={...n,activeDays:p,status:m},i});return i?i.error?i:(rt({...s,invitees:a}),{ok:!0,invitee:i,referEarn:xe()}):{error:"not_found"}}function pn(e,t=!0){const s=xe();let i=null;const a=(s.invitees||[]).map(n=>{var o;return n.id!==e?n:(i={...n,flaggedFraud:!!t,status:t?"fraud":((o=n.activeDays)==null?void 0:o.length)>=3?"active":"pending"},i)});return i?(rt({...s,invitees:a}),{ok:!0,invitee:i,referEarn:xe()}):{error:"not_found"}}function Ur(){return(xe().invitees||[]).filter(t=>t.status==="active"&&!t.flaggedFraud).length}function Hr(){const e=xe(),t=Ur(),s=new Set((e.milestonesClaimed||[]).map(i=>i.milestoneId));return qr.filter(i=>t>=i.n&&!s.has(i.id)).map(i=>({...i,activeCount:t}))}function md(e){if(!u.user)return{error:"signin"};const i=Hr().find(o=>o.id===e);if(!i)return{error:"not_claimable"};const a=xe(),n={id:Ct("rmw"),milestoneId:i.id,n:i.n,label:i.label,kind:i.kind,at:Date.now(),testMode:!0,note:"Distinct from Clippers commissions · TEST MODE · no real billing"};return i.membership&&li(i.membership,!0),rt({...a,milestonesClaimed:[n,...a.milestonesClaimed||[]]}),{ok:!0,claim:n,referEarn:xe(),membership:xt()}}function hd(){const e=u.user;return rt({...Br(),code:Fr(e)}),xe()}function gd({force:e=!1}={}){if(!u.user)return{error:"signin"};const s=Gt();if(!e&&(s.invitees||[]).length>0)return{error:"already_seeded",referEarn:s};const i=Date.now(),a=864e5,n=[{id:"inv_demo_a",username:"NovaFan",signedUpAt:i-5*a,activeDays:[ns(i-5*a),ns(i-4*a),ns(i-3*a)],status:"active",welcomeClaimed:!0,flaggedFraud:!1},{id:"inv_demo_b",username:"ClipCurious",signedUpAt:i-2*a,activeDays:[ns(i-2*a)],status:"pending",welcomeClaimed:!0,flaggedFraud:!1},{id:"inv_demo_c",username:"BottyMcBot",signedUpAt:i-6*a,activeDays:[],status:"fraud",welcomeClaimed:!1,flaggedFraud:!0}];return rt({...s,invitees:n,milestonesClaimed:s.milestonesClaimed||[]}),{ok:!0,seeded:n.length,referEarn:xe()}}const ki=[{id:"youtube",label:"YouTube",color:"#ff4444",hint:"YouTube Live / Studio"},{id:"tiktok",label:"TikTok",color:"#69c9d0",hint:"TikTok LIVE"},{id:"twitch",label:"Twitch",color:"#9146ff",hint:"Twitch Dashboard"},{id:"facebook",label:"Facebook",color:"#1877f2",hint:"Facebook Live"},{id:"instagram",label:"Instagram",color:"#e1306c",hint:"IG Live (demo)"},{id:"kick",label:"Kick",color:"#53fc18",hint:"Kick Studio"},{id:"custom_rtmp",label:"Custom RTMP",color:"#ffb020",hint:"Any RTMP endpoint"}],fd=()=>({freeMaxDestinations:2,houseUnlimited:!0,houseUserIds:["dbs"],tiers:{bronze:{id:"bronze",label:"Bronze",price:4.99,maxDestinations:3,placement:!1,badge:"Bronze Streamer",perks:["3 destination slots","Campaign badge on Go Live"]},silver:{id:"silver",label:"Silver",price:9.99,maxDestinations:5,placement:!0,badge:"Silver Streamer",perks:["5 destination slots","Campaign badge","Explore / Live placement flag"]},gold:{id:"gold",label:"Gold",price:19.99,maxDestinations:7,placement:!0,badge:"Gold Streamer",perks:["All 7 destinations","Campaign badge","Priority Explore / Live placement"]}}});function Vs(){return{platforms:{},selected:[],session:null,history:[],ingest:null,campaign:{tier:null,status:"none",enrolledAt:null,cancelledAt:null},campaignConfig:null}}function wi(){const e=u.restream||Vs();return{...Vs(),...e,platforms:e.platforms&&typeof e.platforms=="object"?e.platforms:{},selected:Array.isArray(e.selected)?e.selected:[],history:Array.isArray(e.history)?e.history:[],campaign:{...Vs().campaign,...e.campaign||{}}}}function Vt(e){return u={...u,restream:e},E(u),u.restream}function vd(e){var s,i;if((s=e.ingest)!=null&&s.rtmpUrl&&((i=e.ingest)!=null&&i.streamKey))return e;const t="dbs_demo_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,10);return{...e,ingest:{rtmpUrl:"rtmp://ingest.dbs.local/live",streamKey:t,rotatedAt:Date.now(),note:"TEST MODE demo key · not a real media server"}}}function ot(){let e=wi();const t=e.ingest;return e=vd(e),e.ingest!==t&&Vt(e),e}function zr(){const e=ot();return ki.map(t=>{const s=e.platforms[t.id]||{};return{...t,connected:!!s.connected,connectedAt:s.connectedAt||null,handle:s.handle||"",lastError:s.lastError||null,enabled:s.enabled!==!1}})}function bd(e,t=""){const s=ki.find(n=>n.id===e);if(!s)return{error:"unknown_platform"};const i=ot(),a={...i.platforms,[e]:{id:e,connected:!0,connectedAt:Date.now(),handle:String(t||s.label+" Demo").slice(0,40),lastError:null,enabled:!0}};return Vt({...i,platforms:a}),{ok:!0,platform:zr().find(n=>n.id===e)}}function yd(e){var n;const t=ot();if(!((n=t.platforms[e])!=null&&n.connected))return{error:"not_connected"};const s={...t.platforms,[e]:{...t.platforms[e],connected:!1,disconnectedAt:Date.now(),lastError:null}},i=(t.selected||[]).filter(o=>o!==e);let a=t.session;return a&&!a.endedAt&&(a={...a,destinations:(a.destinations||[]).map(o=>o.id===e?{...o,status:"disconnected",health:"error"}:o)}),Vt({...t,platforms:s,selected:i,session:a}),{ok:!0}}function kd(e){const t=ot(),s=new Set(Object.values(t.platforms).filter(a=>a.connected).map(a=>a.id)),i=(Array.isArray(e)?e:[]).filter(a=>s.has(a)).slice(0,7);return Vt({...t,selected:i}),{ok:!0,selected:i}}function wd(e){var i;const t=ot();if(!((i=t.platforms[e])!=null&&i.connected))return{error:"not_connected"};const s=new Set(t.selected||[]);return s.has(e)?s.delete(e):s.add(e),kd([...s])}function Wr(){var i,a,n;const e=wi(),t=fd(),s=e.campaignConfig||{};return{...t,...s,tiers:{...t.tiers,...s.tiers||{},bronze:{...t.tiers.bronze,...((i=s.tiers)==null?void 0:i.bronze)||{}},silver:{...t.tiers.silver,...((a=s.tiers)==null?void 0:a.silver)||{}},gold:{...t.tiers.gold,...((n=s.tiers)==null?void 0:n.gold)||{}}},freeMaxDestinations:Number(s.freeMaxDestinations)>0?Number(s.freeMaxDestinations):t.freeMaxDestinations,houseUnlimited:s.houseUnlimited!==!1,houseUserIds:Array.isArray(s.houseUserIds)?s.houseUserIds:t.houseUserIds}}function Yr(){return{...Vs().campaign,...wi().campaign||{}}}function Sd(){const e=u.user;if(!e)return!1;const t=Wr();return e.id==="dbs"||e.username==="DatBoiSkeet"?!0:(t.houseUserIds||[]).includes(e.id)}function Jr(){const e=Wr();if(Sd()&&e.houseUnlimited)return{max:ki.length,source:"house_free",tier:null};const t=Yr();if(t.status==="active"&&t.tier&&e.tiers[t.tier]){const s=e.tiers[t.tier];return{max:s.maxDestinations,source:"campaign",tier:t.tier,badge:s.badge,placement:!!s.placement}}return{max:e.freeMaxDestinations,source:"free_baseline",tier:null,badge:null,placement:!1}}function $d(){const e=u.user;if(!e)return{error:"signin"};const t=ot();if(t.session&&!t.session.endedAt)return{error:"already_live"};const s=Object.values(t.platforms).filter(d=>d.connected).map(d=>d.id);if(!s.length)return{error:"no_platforms"};let i=(t.selected||[]).filter(d=>s.includes(d));if(!i.length)return{error:"none_selected"};const a=Jr();if(i.length>a.max)return{error:"over_cap",max:a.max,selected:i.length,source:a.source};const n=i.map((d,c)=>{const p=ki.find(g=>g.id===d),m=c===i.length-1&&i.length>2?"connecting":"streaming";return{id:d,label:(p==null?void 0:p.label)||d,status:m==="connecting"?"connecting":"streaming",health:m,startedAt:Date.now()}}),o=Yr(),r={id:Ct("rs"),hostId:e.id,hostName:e.username,startedAt:Date.now(),destinations:n,selected:i.slice(),campaignTier:o.status==="active"?o.tier:null,campaignBadge:a.badge||null,placement:!!a.placement,testMode:!0,endedAt:null};return Vt({...t,session:r,selected:i}),{ok:!0,session:r}}function xd(){const e=ot();if(!e.session||e.session.endedAt)return{error:"offline"};const t={...e.session,endedAt:Date.now(),destinations:(e.session.destinations||[]).map(i=>({...i,status:i.health==="error"?"error":"ended",health:i.health==="error"?"error":"ended"}))},s=[t,...e.history||[]].slice(0,20);return Vt({...e,session:null,history:s}),{ok:!0,session:t,history:s}}function Ed(){const e=wi().session;return e&&!e.endedAt?e:null}function Qr(){const e=D().connectPrefs||{};return{ageConfirmed:!!e.ageConfirmed,rulesAccepted:!!e.rulesAccepted}}function un(e={}){const t={...Qr(),...e};return t.ageConfirmed||(t.rulesAccepted=!1),rl(s=>({...s,connectPrefs:t})),t}const Xr=[{id:"day_one",name:"Day One",blurb:"Joined the Loyalty Club — recognition starts with showing up, not spending.",need:0,kind:"join"},{id:"listener",name:"Listener",blurb:"Logged authorized listening (demo tick). Not purchase-only.",need:1,kind:"listen"},{id:"live_attendee",name:"Live Regular",blurb:"Attended a livestream (demo stub). Healthy participation.",need:1,kind:"live"},{id:"club_member",name:"Club Member",blurb:"Joined a Fan Club discussion community.",need:1,kind:"club"},{id:"helper",name:"Helper",blurb:"Community-helper milestone (welcome tip / guidelines share demo).",need:1,kind:"help"},{id:"top_fan",name:"Top Fan",blurb:"Earned 50+ loyalty points from mixed healthy actions — gifts alone do not unlock this.",needPoints:50}];function Zr(e=Date.now()){return new Date(e).toISOString().slice(0,10)}function As(){const e=u.loyalty||{};return{points:Number(e.points)||0,history:Array.isArray(e.history)?e.history:[],badges:Array.isArray(e.badges)?e.badges:[],publicVisible:e.publicVisible!==!1,lastActionAt:e.lastActionAt&&typeof e.lastActionAt=="object"?e.lastActionAt:{},dayCounts:e.dayCounts&&typeof e.dayCounts=="object"?e.dayCounts:{}}}function La(e){u={...u,loyalty:e},E(u)}function Ad(){return"loy_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function Cd(e,{cooldownMs:t=8e3,dailyCap:s=8}={}){const i=As(),a=Date.now(),n=Number(i.lastActionAt[e])||0;if(a-n<t)return{ok:!1,reason:"cooldown"};const o=Zr(a);return((i.dayCounts[o]||{})[e]||0)>=s?{ok:!1,reason:"daily_cap"}:{ok:!0}}function Td(e){const t=new Set(e.badges||[]),s={};return(e.history||[]).forEach(i=>{s[i.kind]=(s[i.kind]||0)+1}),Xr.forEach(i=>{if(!t.has(i.id)){if(i.needPoints!=null){e.points>=i.needPoints&&t.add(i.id);return}if(i.id==="day_one"){((e.history||[]).length>0||e.points>0)&&t.add(i.id);return}(s[i.kind]||0)>=(i.need||1)&&t.add(i.id)}}),[...t]}function Cs(){return As()}function Dd(e){const t=As();return La({...t,publicVisible:!!e}),Cs()}function Md(e,{points:t=5,note:s=""}={}){if(!u.user)return{error:"signin"};const a=Cd(e);if(!a.ok)return{error:a.reason};const n=As(),o=Date.now(),r=Zr(o),d={...n.dayCounts,[r]:{...n.dayCounts[r]||{},[e]:((n.dayCounts[r]||{})[e]||0)+1}},c={id:Ad(),at:o,kind:e,points:t,note:String(s||e).slice(0,120)},p={...n,points:n.points+t,history:[c,...n.history].slice(0,80),lastActionAt:{...n.lastActionAt,[e]:o},dayCounts:d};return p.badges.includes("day_one")||(p.history=p.history),p.badges=Td(p),p.badges.includes("day_one")||(p.badges=["day_one",...p.badges]),La(p),{ok:!0,loyalty:Cs(),entry:c,newBadges:p.badges.filter(m=>!(n.badges||[]).includes(m))}}function eo(){const e=Cs(),t=new Set(e.badges||[]);return Xr.map(s=>({...s,unlocked:t.has(s.id)}))}function Ld(){return La({points:0,history:[],badges:[],publicVisible:!0,lastActionAt:{},dayCounts:{}}),Cs()}function Tt(){const e=u.openMic||{};return{applications:Array.isArray(e.applications)?e.applications:[],seeded:!!e.seeded,houseIndex:typeof e.houseIndex=="number"?e.houseIndex:0}}function Si(e){u={...u,openMic:e},E(u)}function Id(){return"om_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function Ut({force:e=!1}={}){const t=Tt();if(t.seeded&&!e&&t.applications.length>0)return{skipped:!0,applications:t.applications};const s=Date.now(),i=864e5,a=[{id:"om_demo_approved",userId:"u_ria",username:"RiaLoops",talent:"producer",trackTitle:"Midnight Pads (demo)",profileNote:"Beatmaker · looking to collab on LSS energy",rightsCertified:!0,status:"approved",at:s-10*i,reviewedAt:s-9*i},{id:"om_demo_pending",userId:"u_dez",username:"DezOnMic",talent:"rapper",trackTitle:"Porch Light Freestyle",profileNote:"Opt-in showcase · not pay-to-win",rightsCertified:!0,status:"pending",at:s-2*i},{id:"om_demo_rejected",userId:"u_spam",username:"SpamBeats",talent:"dj",trackTitle:"Untitled drop",profileNote:"No rights cert honesty",rightsCertified:!1,status:"rejected",at:s-5*i,reviewedAt:s-4*i,reviewNote:"Rights certification required"}],n=typeof t.houseIndex=="number"?t.houseIndex:0;return Si({applications:a,seeded:!0,houseIndex:n}),{seeded:a.length,applications:a}}function Xi({status:e=null}={}){Ut();let t=Tt().applications.slice();return e&&(t=t.filter(s=>s.status===e)),t.sort((s,i)=>(i.at||0)-(s.at||0))}function Pd(){return Xi({status:"approved"})}function _d(){const e=Tt();return $t(typeof e.houseIndex=="number"?e.houseIndex:0)}function Od(){const e=Tt(),t=((typeof e.houseIndex=="number"?e.houseIndex:0)+1)%Cr();return Si({...e,houseIndex:t}),$t(t)}function qd({talent:e="rapper",trackTitle:t="",profileNote:s="",rightsCertified:i=!1}={}){const a=u.user;if(!a)return{error:"signin"};if(!i)return{error:"rights"};const n=String(t||"").trim().slice(0,80);if(!n)return{error:"title"};Ut();const o=Tt();if(o.applications.some(d=>d.userId===a.id&&d.status==="pending"))return{error:"pending"};const r={id:Id(),userId:a.id,username:a.username,talent:String(e||"other").slice(0,32),trackTitle:n,profileNote:String(s||"").trim().slice(0,240),rightsCertified:!0,status:"pending",at:Date.now()};return Si({...o,applications:[r,...o.applications],seeded:!0}),{ok:!0,application:r}}function Zi(e,t,s=""){if(!ie())return{error:"admin"};if(!["pending","approved","rejected"].includes(t))return{error:"status"};const a=Tt();let n=null;const o=a.applications.map(r=>r.id!==e?r:(n={...r,status:t,reviewedAt:Date.now(),reviewNote:String(s||"").slice(0,160)},n));return n?(Si({...a,applications:o}),{ok:!0,application:n}):{error:"missing"}}function Nd(){var $,A;Ut(),Fe();try{Ts(),Be()}catch{}const e=Tt().applications||[],t={pending:0,approved:0,rejected:0};e.forEach(w=>{const P=w.status||"pending";t[P]!==void 0?t[P]+=1:t.pending+=1});const s=e.filter(w=>w.status==="pending").sort((w,P)=>(P.at||0)-(w.at||0)),i=je().clubs.slice().sort((w,P)=>(P.createdAt||0)-(w.createdAt||0)),a=i.slice(0,5).map(w=>({id:w.id,name:w.name,privacy:w.privacy,official:!!w.official,memberCount:w.memberCount||(w.members||[]).length||0,createdAt:w.createdAt||0})),n=As(),r=eo().filter(w=>w.unlocked),d=nt(),c=ka();let p=0,m=0,g=0,f=0,b=0;c.forEach(w=>{p=N(p+(w.gross||0)),m=N(m+(w.fees||0)),g=N(g+(w.creatorShare||0)),f=N(f+(w.dbsShare||0)),b+=w.count||0});const k=u.wallet||{balance:0},v=u.catalog||[],S=ar();return{openMic:{total:e.length,byStatus:t,pending:s},fanClubs:{total:i.length,recent:a},loyalty:{points:n.points||0,badgeCount:r.length,badges:r.map(w=>w.name||w.id),publicVisible:n.publicVisible!==!1,historyCount:(n.history||[]).length,note:"Device-local loyalty for signed-in user · not a multi-fan leaderboard"},revenue:{demo:!0,chip:"demo figures · not production",gross:p,fees:m,creatorShare:g,dbsShare:f,earnCount:b,creatorAvailable:N(d.available||0),creatorHolds:N(d.holds||0),fanWalletBalance:Number(k.balance)||0,byCategory:c.filter(w=>w.count>0),catalogPublished:v.filter(w=>w.published).length,catalogTotal:v.length},moderation:{warnings:[],suspensions:[],note:"Stub · Content Polish owns Guidelines copy"},hotFeed:{openAlerts:(u.engagementAlerts||[]).filter(w=>!w.handledAt).length,totalAlerts:(u.engagementAlerts||[]).length,hotPosts:Array.isArray(($=u.hotFeed)==null?void 0:$.posts)?u.hotFeed.posts.length:0,hotLives:Array.isArray((A=u.hotFeed)==null?void 0:A.lives)?u.hotFeed.lives.length:0,note:"§38 · Build posts + Live Social lives"},stats:S}}const Bd={frames:"frame",effects:"effect",banners:"banner","name styles":"nameStyle",badges:"badge"},mn=["frame-rodeo-gold","fx-snowfall","ban-skyline","name-neon","badge-dayone"];function Rd(e){const t=e&&typeof e=="object"?e:{},s={};return["frame","effect","banner","nameStyle","badge"].forEach(i=>{typeof t[i]=="string"&&t[i]&&(s[i]=t[i])}),s}function Ht(){const e=u.profileShop||{};return{owned:Array.isArray(e.owned)?[...new Set(e.owned.map(String))]:[],equipped:Rd(e.equipped),reduceMotion:!!e.reduceMotion}}function zt(e){u={...u,profileShop:e},E(u)}function st(){return Ht()}function to(e){return e&&Bd[e.category]||null}function jd(e){const t=String(e||"");if(!t)return{error:"missing"};const s=Ht();return s.owned.includes(t)?{ok:!0,already:!0,shop:st()}:(zt({...s,owned:[...s.owned,t]}),{ok:!0,shop:st()})}function Fd(){const e=Ht(),t=new Set(e.owned);return mn.forEach(s=>t.add(s)),zt({...e,owned:[...t]}),{ok:!0,unlocked:mn,shop:st()}}function Kd(e){const t=String(e||"");return t.startsWith("frame-")?"frame":t.startsWith("fx-")?"effect":t.startsWith("ban-")?"banner":t.startsWith("name-")?"nameStyle":t.startsWith("badge-")?"badge":null}function Gd(e){const t=String(e||""),s=Ht();if(!s.owned.includes(t))return{error:"not_owned"};const i=Kd(t);if(!i)return{error:"unknown_item"};const a={...s.equipped,[i]:t};return zt({...s,equipped:a}),{ok:!0,slot:i,shop:st()}}function Vd(e){const t=String(e||"");if(!["frame","effect","banner","nameStyle","badge"].includes(t))return{error:"bad_slot"};const s=Ht(),i={...s.equipped};return delete i[t],zt({...s,equipped:i}),{ok:!0,shop:st()}}function Ud(e){const t=Ht();return zt({...t,reduceMotion:!!e}),st()}function Hd(){return zt({owned:[],equipped:{},reduceMotion:!1}),st()}const zd=5,Wd=8,Yd=[{id:"hp_maya_1",userId:"maya",username:"MayaBeats",text:"Studio loop dropping later — who wants the stem pack? 🔥",image:"/music/01_Long_Story_Short_Coming_Soon.jpg",mediaType:"image",atOffset:36e5*5,likeUsers:["dbs","fanjay","u_seed_a","u_seed_b","u_seed_c","u_seed_d","clipqueen"],comments:[{id:"hc_m1",userId:"fanjay",username:"FanJay",text:"Send it 🙌"},{id:"hc_m2",userId:"dbs",username:"DatBoiSkeet",text:"Pull up on Spotlight"},{id:"hc_m3",userId:"clipqueen",username:"ClipQueen",text:"Stem pack please"}],shares:5},{id:"hp_jay_1",userId:"fanjay",username:"FanJay",text:"Foreign X-Change fit check from the community — buffalo energy.",image:"/merch/03_blue_buffalo_jacket.jpeg",mediaType:"image",atOffset:36e5*8,likeUsers:["maya","dbs","u_seed_a","u_seed_c","u_seed_d","clipqueen","u_seed_b"],comments:[{id:"hc_j1",userId:"maya",username:"MayaBeats",text:"Jacket hits"},{id:"hc_j2",userId:"clipqueen",username:"ClipQueen",text:"Need this"}],shares:6},{id:"hp_clip_1",userId:"clipqueen",username:"ClipQueen",text:"New clip cut from last Live — tag @DatBoiSkeet if you remix 🎬",image:"/merch/06_black_ptsd_tee.jpeg",mediaType:"video",atOffset:36e5*12,likeUsers:["dbs","maya","fanjay","u_seed_a","u_seed_b","u_seed_c"],comments:[{id:"hc_c1",userId:"dbs",username:"DatBoiSkeet",text:"Clean edit"},{id:"hc_c2",userId:"maya",username:"MayaBeats",text:"Clipping goals"},{id:"hc_c3",userId:"fanjay",username:"FanJay",text:"Saved"},{id:"hc_c4",userId:"u_seed_a",username:"FanA",text:"Fire"}],shares:4},{id:"hp_dbs_boost",userId:"dbs",username:"DatBoiSkeet",text:"Community shoutout — Maya + Jay keeping the feed hot. Keep posting.",image:"/music/02_Ladies_Only_Coming_Soon.jpg",mediaType:"image",atOffset:36e5*3,likeUsers:["maya","fanjay","u_seed_a"],comments:[{id:"hc_d1",userId:"maya",username:"MayaBeats",text:"Grateful 💛"},{id:"hc_d2",userId:"fanjay",username:"FanJay",text:"Lets go"}],shares:2}];function Le(){const e=u.hotFeed||{};return{lives:Array.isArray(e.lives)?e.lives:[],posts:Array.isArray(e.posts)?e.posts:[],seededLives:!!e.seededLives,seededPosts:!!e.seededPosts,seededPostsVer:Number(e.seededPostsVer)||0}}function so(e){u={...u,hotFeed:e},E(u)}function Jd(){const e={...u.profiles};let t=!1;const s=(i,a,n)=>{e[i]||(e[i]={id:i,username:a,bio:n,avatar:"",followers:[],following:["dbs"],verified:!1},t=!0)};s("maya","MayaBeats","Creator · beats & live demos"),s("fanjay","FanJay","Day-one fan · playlist curator"),s("clipqueen","ClipQueen","Clipper · community edits"),t&&(u={...u,profiles:e})}function Ts(){sr(),Jd();const e=Le(),t=Number(e.seededPostsVer)||0;if(e.seededPosts&&t>=2)return Le();if(e.seededPosts&&t<2){const d={...u.likes||{}},c={...u.comments||{}},p={...u.postShares||{}},m=(g,f,b,k)=>{d[g]=[...new Set([...d[g]||[],...f])];const v=new Set((c[g]||[]).map($=>$.id)),S=[...c[g]||[]];(b||[]).forEach($=>{v.has($.id)||S.push({...$,at:$.at||Date.now()})}),c[g]=S,p[g]=Math.max(Number(p[g]||0),k)};return m("hp_maya_1",["dbs","fanjay","u_seed_a","u_seed_b","u_seed_c","u_seed_d","clipqueen"],[{id:"hc_m3",userId:"clipqueen",username:"ClipQueen",text:"Stem pack please"}],5),m("hp_jay_1",["maya","dbs","u_seed_a","u_seed_c","u_seed_d","clipqueen","u_seed_b"],[{id:"hc_j2",userId:"clipqueen",username:"ClipQueen",text:"Need this"}],6),m("hp_clip_1",["dbs","maya","fanjay","u_seed_a","u_seed_b","u_seed_c"],[{id:"hc_c4",userId:"u_seed_a",username:"FanA",text:"Fire"}],4),d.hp_dbs_boost&&(d.hp_dbs_boost=(d.hp_dbs_boost||[]).slice(0,3),p.hp_dbs_boost=Math.min(Number(p.hp_dbs_boost||0),2)),u={...u,likes:d,comments:c,postShares:p,hotFeed:{...e,seededPosts:!0,seededPostsVer:2}},E(u),Be(),Le()}const s=new Set((u.posts||[]).map(d=>d.id)),i=[...u.posts||[]],a={...u.likes||{}},n={...u.comments||{}},o={...u.postShares||{}},r=Date.now();return Yd.forEach(d=>{s.has(d.id)||(i.unshift({id:d.id,userId:d.userId,username:d.username,text:d.text,image:d.image||"",mediaType:d.mediaType||(d.image?"image":"text"),at:r-(d.atOffset||0),house:d.userId==="dbs"}),a[d.id]=[...d.likeUsers||[]],n[d.id]=(d.comments||[]).map(c=>({...c,text:c.text,at:r-(d.atOffset||0)+6e4})),d.shares&&(o[d.id]=d.shares))}),a.p1&&a.p1.length<3&&(a.p1=[...new Set([...a.p1||[],"maya","fanjay","u_seed_a"])]),a.p2&&a.p2.length<2&&(a.p2=[...new Set([...a.p2||[],"maya","fanjay"])]),(!n.p1||n.p1.length<2)&&(n.p1=[...n.p1||[],{id:"hc_p1a",userId:"maya",username:"MayaBeats",text:"Cover art goes crazy",at:r-8e7},{id:"hc_p1b",userId:"fanjay",username:"FanJay",text:"Been waiting on this",at:r-7e7}]),o.p1=Math.max(o.p1||0,2),o.p2=Math.max(o.p2||0,1),u={...u,posts:i,likes:a,comments:n,postShares:o,hotFeed:{...e,seededPosts:!0,seededPostsVer:2}},E(u),Be(),Le()}function $i(e){const t=u.likes&&u.likes[e]||[],s=u.comments&&u.comments[e]||[],i=u.postShares&&u.postShares[e]||0;return t.length+s.length+Number(i||0)}function Be(){const e=Le(),s=(u.posts||[]).map(r=>{const d=(u.likes&&u.likes[r.id]||[]).length,c=(u.comments&&u.comments[r.id]||[]).length,p=Number(u.postShares&&u.postShares[r.id]||0),m=d+c+p;return{id:r.id,postId:r.id,score:m,likes:d,comments:c,shares:p,username:r.username,userId:r.userId,preview:(r.text||"").slice(0,120),text:r.text||"",image:r.image||"",mediaType:r.mediaType||(r.image?"image":"text"),at:r.at||0,house:r.userId==="dbs"||!!r.house}}).filter(r=>r.score>=zd).sort((r,d)=>d.score-r.score||d.at-r.at).slice(0,Wd),i=new Set((e.posts||[]).map(r=>r.postId||r.id)),a=Array.isArray(u.engagementAlerts)?[...u.engagementAlerts]:[],n=new Set(a.filter(r=>r.kind==="post").map(r=>r.refId));s.forEach(r=>{n.has(r.id)||i.has(r.id)&&e.posts.length||(a.unshift({id:"ea_post_"+r.id+"_"+Date.now().toString(36),kind:"post",refId:r.id,title:(r.preview||r.text||"Hot post").slice(0,80),username:r.username,score:r.score,mediaType:r.mediaType||"text",at:Date.now(),handledAt:null,handledNote:null}),n.add(r.id))});const o=a.slice(0,60);return u={...u,hotFeed:{lives:e.lives,seededLives:e.seededLives,posts:s,seededPosts:e.seededPosts||s.length>0,seededPostsVer:Number(e.seededPostsVer)||0},engagementAlerts:o},E(u),Le()}function io(e=8){return Ts(),Le().posts.length||Be(),(Le().posts||[]).slice(0,Math.max(1,Number(e)||8))}function ao(e){const t=String(e||"");if(!t)return{error:"missing"};if(!(u.posts||[]).find(a=>a.id===t))return{error:"missing"};const i={...u.postShares||{}};return i[t]=Number(i[t]||0)+1,u={...u,postShares:i},E(u),Be(),{ok:!0,shares:i[t],score:$i(t)}}function Qd(e){const t=e||{},s=t.kind==="live"?"live":"post",i=String(t.refId||t.id||"");if(!i)return{error:"missing"};const a=Array.isArray(u.engagementAlerts)?[...u.engagementAlerts]:[],n=a.find(r=>r.kind===s&&r.refId===i&&!r.handledAt);if(n)return{ok:!0,alert:n,deduped:!0};const o={id:t.id||"ea_"+s+"_"+i+"_"+Date.now().toString(36),kind:s,refId:i,title:String(t.title||"Hot item").slice(0,120),username:String(t.username||""),score:Number(t.score)||0,viewers:t.viewers!=null?Number(t.viewers):void 0,gifts:t.gifts!=null?Number(t.gifts):void 0,mediaType:t.mediaType||(s==="live"?"live":"text"),at:t.at||Date.now(),handledAt:t.handledAt||null,handledNote:t.handledNote||null};return u={...u,engagementAlerts:[o,...a].slice(0,60)},E(u),{ok:!0,alert:o}}function hn({openOnly:e=!0}={}){const t=Array.isArray(u.engagementAlerts)?u.engagementAlerts:[];return(e?t.filter(i=>!i.handledAt):t.slice()).sort((i,a)=>(a.at||0)-(i.at||0))}function Is(e,t){const s=String(e||"");if(!s)return{error:"missing"};const i=Array.isArray(u.engagementAlerts)?u.engagementAlerts:[];let a=null;const n=i.map(o=>o.id!==s?o:(a={...o,handledAt:Date.now(),handledNote:t!=null?String(t):o.handledNote||"handled"},a));return a?(u={...u,engagementAlerts:n},E(u),{ok:!0,alert:a}):{error:"missing"}}function Xd(e){if(!ie())return{error:"admin"};const t=u.user;if(!t)return{error:"signin"};const s=String(e||""),i=new Set(u.likes&&u.likes[s]||[]);return i.add(t.id),u={...u,likes:{...u.likes,[s]:[...i]}},E(u),Be(),{ok:!0,count:i.size,score:$i(s)}}function Zd(e,t){if(!ie())return{error:"admin"};const s=u.user;if(!s)return{error:"signin"};const i=String(e||""),a=t.trim();if(!a)return{error:"empty"};const n={id:"c_admin_"+Date.now().toString(36),userId:s.id,username:s.username,text:a,at:Date.now(),admin:!0},o=u.comments&&u.comments[i]||[];return u={...u,comments:{...u.comments,[i]:[...o,n]}},E(u),Be(),{ok:!0,comment:n,score:$i(i)}}function ep(e){if(!ie())return{error:"admin"};const t=ao(e);return t.error?t:{ok:!0,shares:t.shares,link:"#/posts",score:t.score}}function Ia(e,t){return Math.max(0,Number(e)||0)+Math.max(0,Number(t)||0)*20}function Pa(e){if(!e||typeof e!="object")return null;const t=String(e.id||e.liveId||"");if(!t)return null;const s=String(e.hostId||e.userId||""),i=String(e.hostName||e.username||e.handle||"Creator"),a=Math.max(0,Number(e.viewers)||0),n=Math.max(0,Number(e.giftsTotal??e.gifts)||0),o=e.score!=null&&Number.isFinite(Number(e.score))?Number(e.score):Ia(a,n);return{id:t,hostId:s,hostName:i,title:String(e.title||"Live"),viewers:a,giftsTotal:n,house:!!e.house,spikedAt:e.spikedAt||null,score:o}}function no({force:e=!1}={}){const t=Le();if(t.seededLives&&!e&&(t.lives||[]).length>0)return{skipped:!0,lives:t.lives.map(Pa).filter(Boolean)};const s=[{id:"hl_dbs_house",hostId:"dbs",hostName:"DatBoiSkeet",title:"DBS Live · Listening Session",viewers:8420,giftsTotal:186,house:!0},{id:"hl_dbs_vault",hostId:"dbs",hostName:"DatBoiSkeet",title:"Vault Drop Afterparty · House",viewers:3210,giftsTotal:94,house:!0},{id:"hl_skeetfan",hostId:"u_skeetfanatl",hostName:"SkeetFanATL",title:"ATL reacts · Long Story Short",viewers:1540,giftsTotal:42,house:!1},{id:"hl_vaultwatch",hostId:"u_vaultwatcher",hostName:"VaultWatcher",title:"Vault deep cut night",viewers:980,giftsTotal:61,house:!1},{id:"hl_fxclip",hostId:"u_fxclipper",hostName:"FXClipper",title:"Foreign X-Change clips live",viewers:2210,giftsTotal:28,house:!1},{id:"hl_nightowl",hostId:"u_nightowldbs",hostName:"NightOwlDBS",title:"Late night lounge · chill",viewers:412,giftsTotal:15,house:!1},{id:"hl_longstory",hostId:"u_longstorylistener",hostName:"LongStoryListener",title:"LSS theory hour",viewers:128,giftsTotal:7,house:!1},{id:"hl_ladies",hostId:"u_ladiesonlyfan",hostName:"LadiesOnlyFan",title:"Ladies Only countdown",viewers:67,giftsTotal:3,house:!1}].map(i=>({...i,spikedAt:null,score:Ia(i.viewers,i.giftsTotal)}));return so({...t,lives:s,seededLives:!0}),{ok:!0,lives:s}}function Wt(){return no(),(Le().lives||[]).map(Pa).filter(Boolean).sort((t,s)=>(s.score||0)-(t.score||0)||(s.viewers||0)-(t.viewers||0))}function tp(e){const t=String(e||"");if(!t)return{error:"missing"};no();const s=Le();let i=null;const a=(s.lives||[]).map(o=>{const r=Pa(o);if(!r||r.id!==t)return o;const d=180+Math.floor(Math.random()*920),c=4+Math.floor(Math.random()*28),p=r.viewers+d,m=r.giftsTotal+c,g=Ia(p,m);return i={...r,viewers:p,giftsTotal:m,score:g,spikedAt:Date.now()},i});if(!i)return{error:"missing"};so({...s,lives:a,seededLives:!0});const n=Qd({kind:"live",refId:i.id,title:i.title,username:i.hostName,score:i.score,viewers:i.viewers,gifts:i.giftsTotal});return{ok:!0,live:i,alert:(n==null?void 0:n.alert)||null,deduped:!!(n!=null&&n.deduped)}}function sp(){return Wt().filter(s=>s&&!s.house).sort((s,i)=>(i.score||0)-(s.score||0)||(i.viewers||0)-(s.viewers||0)).slice(0,6).map(s=>({id:s.id,hostId:s.hostId,hostName:s.hostName,title:s.title,viewers:s.viewers,giftsTotal:s.giftsTotal,house:!!s.house,score:s.score,spikedAt:s.spikedAt||null,playbacksToday:s.playbacksToday!=null?s.playbacksToday:Math.max(1,Math.round((s.viewers||0)/40))}))}function ro(){const e=new Date().toISOString().slice(0,10),s=(wt({publishedOnly:!0,types:["song"]})||[]).map(a=>{const n=Number(a.playsToday)||Number(a.playCount)||Number(a.plays)||0;let o="";return a.coverRef&&!String(a.coverRef).startsWith("idb:")&&(o=a.coverRef),{id:a.id,title:a.title||"Untitled",artist:a.artist||"DatBoiSkeet",cover:o,playsToday:n,href:"#/music",demo:!1,day:e,status:a.status||(a.published?"Published":"Catalog")}}).filter(a=>a.playsToday>0).sort((a,n)=>n.playsToday-a.playsToday||String(a.title).localeCompare(String(n.title)));return s[0]?s[0]:{id:"demo_most_played_lss",title:"Long Story Short",artist:"DatBoiSkeet",cover:"/music/01_Long_Story_Short_Coming_Soon.jpg",playsToday:900+e.split("-").reduce((a,n)=>a+Number(n),0)%400,href:"#/music",demo:!0,day:e,status:"Coming Soon"}}const gn="https://www.youtube.com/iframe_api";let X=[],le=0,L=null,Ps=!1,Ie=!1,lt=!1;const Z=new Set;let fn=!1;function ze(e){if(!e)return"";try{const t=new URL(e);if(t.hostname.includes("youtu.be"))return t.pathname.slice(1).split("/")[0]||"";const s=t.searchParams.get("v");if(s)return s;const i=t.pathname.match(/\/embed\/([^/?]+)/);if(i)return i[1]==="videoseries"?"":i[1]}catch{}return""}function vn(e){if(!e)return"";try{return new URL(e).searchParams.get("list")||""}catch{return""}}function _t(e){return e?`https://i.ytimg.com/vi/${e}/hqdefault.jpg`:""}function ip(){var n,o;const e=[],t=new Set,s=new Set,i=r=>{if(r.playlistId){if(s.has(r.playlistId))return;s.add(r.playlistId)}else if(r.youtubeId){if(t.has(r.youtubeId))return;t.add(r.youtubeId)}else return;e.push(r)};for(const r of tt){const d=((n=r.links)==null?void 0:n.youtube)||"",c=ze(d)||ze(((o=r.links)==null?void 0:o.youtubeMusic)||"");c&&i({id:r.id,title:r.title,artist:r.artist||"DatBoiSkeet",cover:r.cover||_t(c),youtubeId:c,youtube:d||`https://www.youtube.com/watch?v=${c}`,embed:`https://www.youtube.com/embed/${c}`,links:{...r.links||{},youtube:d||`https://www.youtube.com/watch?v=${c}`},kind:"track"})}for(const r of ca){const d=vn(r.youtube)||vn(r.embed);d&&i({id:r.id,title:r.title,artist:"DatBoiSkeet",cover:_t("DTe4OiX2otg")||"/brand/logo-dbs-v3@2x.webp",playlistId:d,youtube:r.youtube,embed:r.embed||`https://www.youtube.com/embed/videoseries?list=${d}`,links:{youtube:r.youtube,youtubeMusic:ue.youtubeMusic,spotify:ue.spotify,apple:ue.apple},kind:"mix"})}const a=new Set(["Music Videos"]);for(const r of ge){if(!a.has(r.category||"Music Videos")||!r.featured&&!["dirty-money","93","no-love","bouquet","where-im-from","go-2-work"].includes(r.id)&&!r.featured)continue;const d=ze(r.youtube)||ze(r.embed);if(!d||t.has(d))continue;const c=tt.find(p=>{var m;return ze(((m=p.links)==null?void 0:m.youtube)||"")===d});i({id:r.id,title:r.title,artist:r.artist||"DatBoiSkeet",cover:(c==null?void 0:c.cover)||_t(d),youtubeId:d,youtube:r.youtube,embed:r.embed||`https://www.youtube.com/embed/${d}`,links:{youtube:r.youtube,youtubeMusic:`https://music.youtube.com/watch?v=${d}`,...(c==null?void 0:c.links)||{}},kind:"mv"})}return X=e,le>=X.length&&(le=0),X}function Ue(e){return String(e||"").toLowerCase().replace(/\(.*?\)/g,"").replace(/[^a-z0-9]+/g," ").trim()}function oo(){var i,a;const e=ro();if(!e)return{item:null,meta:null,playable:!1};const t=Ue(e.title),s=X.find(n=>Ue(n.title)===t||Ue(n.title).includes(t)||t.includes(Ue(n.title)));if(s&&(s.youtubeId||s.playlistId))return{item:{...s},meta:e,playable:!0};for(const n of tt){if(Ue(n.title)!==t&&!Ue(n.title).startsWith(t)&&!t.startsWith(Ue(n.title)))continue;const o=((i=n.links)==null?void 0:i.youtube)||"",r=ze(o)||ze(((a=n.links)==null?void 0:a.youtubeMusic)||"");return r?{item:{id:n.id,title:n.title,artist:n.artist||"DatBoiSkeet",cover:n.cover||_t(r),youtubeId:r,youtube:o||`https://www.youtube.com/watch?v=${r}`,embed:`https://www.youtube.com/embed/${r}`,links:{...n.links||{},youtube:o||`https://www.youtube.com/watch?v=${r}`},kind:"track"},meta:e,playable:!0}:{item:{id:n.id,title:n.title,artist:n.artist||"DatBoiSkeet",cover:n.cover||e.cover||"",youtube:o||ue.youtube,embed:"",links:{...n.links||{}},kind:"track"},meta:e,playable:!1}}for(const n of ge){if(Ue(n.title)!==t&&!Ue(n.title).includes(t))continue;const o=ze(n.youtube)||ze(n.embed);if(o)return{item:{id:n.id,title:n.title,artist:n.artist||"DatBoiSkeet",cover:_t(o),youtubeId:o,youtube:n.youtube,embed:n.embed||`https://www.youtube.com/embed/${o}`,links:{youtube:n.youtube,youtubeMusic:`https://music.youtube.com/watch?v=${o}`},kind:"mv"},meta:e,playable:!0}}return{item:{id:e.id||"most-played",title:e.title||"Most played",artist:e.artist||"DatBoiSkeet",cover:e.cover||"",youtube:"",embed:"",links:{spotify:ue.spotify,apple:ue.apple,youtubeMusic:ue.youtubeMusic,youtube:ue.youtube},kind:"track"},meta:e,playable:!1}}function lo(){const e=document.getElementById("spPlayNextMost"),t=document.getElementById("spPlayNextSub"),{meta:s,playable:i}=oo();if(e){if(!s){e.hidden=!0;return}if(e.hidden=!1,e.dataset.playable=i?"1":"0",e.dataset.demo=s.demo?"1":"0",e.title=i?`Most played today · ${s.title} → Play next`:`Most played today · ${s.title} (Coming Soon / open platform)`,e.setAttribute("aria-label",`Play next — ${s.title}`),t){const a=s.demo?"DEMO · ":"";t.textContent=`${a}Most played today · ${s.title}`}}}function bn(e){if(!e)return-1;if(!X.length)return X.push(e),le=0,0;let t=X.findIndex(i=>e.youtubeId&&i.youtubeId===e.youtubeId||e.playlistId&&i.playlistId===e.playlistId||i.id===e.id);if(t===le)return le;if(t>=0){const[i]=X.splice(t,1);t<le&&(le-=1),e=i}const s=Math.min(le+1,X.length);return X.splice(s,0,e),s}function ap(){var n,o,r,d;const{item:e,meta:t,playable:s}=oo();if(!t||!e){h("No most-played track yet");return}if(!s){const c=document.getElementById("spOpen"),p=((n=e.links)==null?void 0:n.apple)||((o=e.links)==null?void 0:o.youtubeMusic)||((r=e.links)==null?void 0:r.spotify)||((d=e.links)==null?void 0:d.youtube)||ue.apple;c&&p&&(c.href=p),h(t.demo||t.status==="Coming Soon"?`${t.title} · Coming Soon — no in-app master. Open Music / Stream Everywhere when it drops.`:`${t.title} — open official platform (not in-app audio)`),lo();return}if(_a()||!!lt&&Ie&&Z.size===0||Z.size>0){const c=bn(e);h(c===le?`Already playing · ${e.title}`:`Queued next · ${e.title}`),ve();return}let a=X.findIndex(c=>e.youtubeId&&c.youtubeId===e.youtubeId||e.playlistId&&c.playlistId===e.playlistId||c.id===e.id);a<0&&(a=bn(e)),go(a),h(`Playing · ${e.title}`)}const Jt=[];function co(){var e;return(e=window.YT)!=null&&e.Player?Promise.resolve(window.YT):new Promise(t=>{var i;if(Jt.push(t),Ps)return;Ps=!0;const s=window.onYouTubeIframeAPIReady;if(window.onYouTubeIframeAPIReady=()=>{Ps=!1;try{s==null||s()}catch{}const a=window.YT;for(;Jt.length;)try{Jt.shift()(a)}catch{}qt()},document.querySelector(`script[src="${gn}"]`)){if((i=window.YT)!=null&&i.Player){Ps=!1;const a=window.YT;for(;Jt.length;)try{Jt.shift()(a)}catch{}qt()}}else{const a=document.createElement("script");a.src=gn,a.async=!0,document.head.appendChild(a)}})}function po(){co().then(()=>qt()).catch(()=>{})}function qt(){var n;if(!(document.getElementById("dbsStickyFrame")||document.getElementById("dbsYtHost"))||!((n=window.YT)!=null&&n.Player)||L)return;const t=X[le],s={autoplay:0,controls:0,rel:0,modestbranding:1,playsinline:1,enablejsapi:1,origin:location.origin},i={height:"1",width:"1",playerVars:s,events:{onReady:()=>{ve()},onStateChange:o=>{o.data===0&&ho({auto:!0}),ve()},onError:()=>{h("YouTube embed error — Open on YouTube"),ve()}}};t!=null&&t.playlistId?i.playerVars={...s,listType:"playlist",list:t.playlistId}:t!=null&&t.youtubeId?i.videoId=t.youtubeId:i.videoId="DTe4OiX2otg";const a=document.getElementById("dbsStickyFrame")?"dbsStickyFrame":"dbsYtHost";L=new window.YT.Player(a,i)}function ks({autoplay:e}={autoplay:!1}){const t=X[le];if(!t||!(L!=null&&L.cueVideoById)){qt();return}try{t.playlistId?(typeof L.loadPlaylist=="function"?L.loadPlaylist({list:t.playlistId,listType:"playlist",index:0}):typeof L.cuePlaylist=="function"&&L.cuePlaylist({list:t.playlistId,listType:"playlist",index:0}),e&&Ie&&Z.size===0&&setTimeout(()=>{try{L.playVideo()}catch{}},250)):t.youtubeId&&(e&&Ie&&Z.size===0?L.loadVideoById(t.youtubeId):L.cueVideoById(t.youtubeId))}catch{}ve()}function _a(){var e;try{return((e=L==null?void 0:L.getPlayerState)==null?void 0:e.call(L))===1}catch{return!1}}function ve(){var p,m,g;const e=X[le],t=document.getElementById("spArt"),s=document.getElementById("spTitle"),i=document.getElementById("spSub"),a=document.getElementById("spPlay"),n=document.getElementById("spOpen"),o=document.getElementById("spSource"),r=Z.size>0,d=!r&&(lt||_a());if(t&&e&&(t.src=e.cover||_t(e.youtubeId||"")||"/brand/logo-dbs-v3@2x.webp",t.alt=e.title||""),s&&(s.textContent=(e==null?void 0:e.title)||"PIKK Music"),i&&(Ie?r?i.textContent=`Paused · ${[...Z][0]} interrupt`:i.textContent=`${(e==null?void 0:e.artist)||"DatBoiSkeet"} · via YouTube (not Spotify in-app)`:i.textContent="Tap Play · YouTube embed · Stream Everywhere"),a&&(a.textContent=d?"❚❚":"▶",a.setAttribute("aria-label",d?"Pause":"Play PIKK Music"),a.dataset.playing=d?"1":"0"),n&&e){const f=((p=e.links)==null?void 0:p.apple)||((m=e.links)==null?void 0:m.youtubeMusic)||((g=e.links)==null?void 0:g.spotify)||e.youtube||ue.apple;n.href=f,n.title="Open on official platform"}o&&(o.textContent=(e==null?void 0:e.kind)==="mix"?"YT Mix":(e==null?void 0:e.kind)==="mv"?"YT MV":"YouTube");const c=document.getElementById("spBadge");c&&(c.textContent=r?"INTERRUPTED":Ie&&d?"PLAYING · YT":"TEST · YT EMBED"),lo()}function np(){var e;if(Z.size>0){h("Paused for "+[...Z][0]+" — resume when done"),ve();return}Ie=!0,lt=!0,po(),qt();try{if(L!=null&&L.playVideo){const t=(e=L.getPlayerState)==null?void 0:e.call(L);t===-1||t===5||t===void 0?ks({autoplay:!0}):L.playVideo()}else{const t=setInterval(()=>{L!=null&&L.playVideo&&(clearInterval(t),ks({autoplay:!0}))},120);setTimeout(()=>clearInterval(t),8e3)}}catch{h("Tap Play PIKK Music again if autoplay blocked")}ve()}function rp({clearDesire:e}={}){var t;e&&(lt=!1);try{(t=L==null?void 0:L.pauseVideo)==null||t.call(L)}catch{}ve()}function Ds(e="user"){e&&e!=="user"&&Z.add(e),rp({clearDesire:e==="user"}),ve()}function uo(e){var t;if(e?Z.delete(e):Z.clear(),Z.size===0&&Ie&&lt)try{(t=L==null?void 0:L.playVideo)==null||t.call(L)}catch{}ve()}function si(e){return uo(e)}function Nt(){Ds("video")}function _i(){Ds("live")}function mo(){si("live")}function Ye(){si("video")}function ho({auto:e}={}){X.length&&(le=(le+1)%X.length,lt=!0,e||(Ie=!0),ks({autoplay:Ie&&Z.size===0}),ve())}function op(){X.length&&(le=(le-1+X.length)%X.length,Ie=!0,lt=!0,ks({autoplay:Z.size===0}),ve())}function go(e){e<0||e>=X.length||(le=e,Ie=!0,Z.clear(),lt=!0,ks({autoplay:!0}),ve())}function lp(){var e,t,s,i,a,n;fn||(fn=!0,(e=document.getElementById("spPlay"))==null||e.addEventListener("click",()=>{Z.size>0&&Z.clear(),_a()?Ds("user"):np()}),(t=document.getElementById("spPrev"))==null||t.addEventListener("click",()=>{Z.clear(),op()}),(s=document.getElementById("spNext"))==null||s.addEventListener("click",()=>{Z.clear(),ho()}),fp(),(i=document.getElementById("spOpen"))==null||i.addEventListener("click",o=>{h("Opening external music service (playback depends on provider)")}),(a=document.getElementById("spPlayNextMost"))==null||a.addEventListener("click",()=>{ap()}),(n=document.getElementById("spQueueBtn"))==null||n.addEventListener("click",()=>{const o=document.getElementById("spQueuePanel");if(!o)return;o.hasAttribute("hidden")?(o.removeAttribute("hidden"),o.innerHTML=X.map((d,c)=>`<button type="button" class="sp-q-item${c===le?" on":""}" data-i="${c}">
              <img src="${d.cover||""}" alt="" width="36" height="36" />
              <span><b>${yn(d.title)}</b><small>${yn(d.artist)} · ${d.kind}</small></span>
            </button>`).join(""),o.querySelectorAll(".sp-q-item").forEach(d=>{d.addEventListener("click",()=>{go(Number(d.dataset.i)),o.setAttribute("hidden","")})})):o.setAttribute("hidden","")}),document.addEventListener("click",o=>{const r=document.getElementById("spQueuePanel");!r||r.hasAttribute("hidden")||!o.target.closest("#spQueuePanel")&&!o.target.closest("#spQueueBtn")&&r.setAttribute("hidden","")}))}function yn(e){return String(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}let kn=!1;function cp(){kn||(kn=!0,window.addEventListener("dbs:interrupt-music",e=>{var s;const t=((s=e==null?void 0:e.detail)==null?void 0:s.reason)||"user";Ds(t)}))}function dp(){ip(),lp(),cp(),ve(),po(),setTimeout(()=>qt(),400)}function pp(e){var i,a;const t=e==="/live",s=e==="/videos"||e==="/home"||e==="/music"||e==="/vault";!t&&Z.has("live")&&si("live");for(const[n,o]of[...re.entries()])if(!document.getElementById(n)){o.playing&&(qe=Math.max(0,qe-1));try{(a=(i=o.player)==null?void 0:i.destroy)==null||a.call(i)}catch{}re.delete(n)}qe===0&&!s&&Z.has("video")&&si("video"),ve()}const re=new Map;let qe=0,wn=0;function ea(e){var s;if(!e||!(e instanceof Element))return!0;const t=e.id||"";return!!(t==="dbsStickyFrame"||t==="dbsYtHost"||(s=e.closest)!=null&&s.call(e,"#dbs-sticky-player, #stickyPlayer, #dbsStickyFrame, #dbsYtHost"))}function Oa(e){return e?/youtube\.com\/embed|youtube-nocookie\.com\/embed|youtu\.be\//.test(e):!1}function up(e){let t=e.getAttribute("src")||e.src||"";if(!Oa(t))return!1;let s=!1;return/[?&]enablejsapi=1(?:&|$)/.test(t)||(t+=(t.includes("?")?"&":"?")+"enablejsapi=1",s=!0),/[?&]origin=/.test(t)||(t+=(t.includes("?")?"&":"?")+"origin="+encodeURIComponent(location.origin),s=!0),s&&(e.setAttribute("src",t),e.src=t),!0}function mp(e){if(e.id&&!re.has(e.id)&&e.id!=="dbsStickyFrame"&&e.id!=="dbsYtHost"||e.id&&re.has(e.id))return e.id;wn+=1;const t=`dbs-page-yt-${wn}`;return e.id=t,t}function hp(e,t){const s=re.get(e);s&&(t.data===1?(s.playing||(s.playing=!0,qe+=1),Nt()):(t.data===0||t.data===2)&&(s.playing&&(s.playing=!1,qe=Math.max(0,qe-1)),qe===0&&Ye()))}function fo(e){var n,o;const t=typeof e=="string"?document.getElementById(e):e;if(!t||ea(t))return Promise.resolve(null);let s=t;if(t.tagName!=="IFRAME"&&(s=((n=t.querySelector)==null?void 0:n.call(t,"iframe"))||t),!s||s.tagName!=="IFRAME"||ea(s))return Promise.resolve(null);const i=s.getAttribute("src")||s.src||"";if(!Oa(i)||!up(s))return Promise.resolve(null);const a=mp(s);return re.has(a)&&((o=re.get(a))!=null&&o.player)?Promise.resolve(re.get(a).player):co().then(()=>new Promise(r=>{var m;if(re.has(a)&&((m=re.get(a))!=null&&m.player)){r(re.get(a).player);return}const d=()=>{var g;if(!document.getElementById(a)){r(null);return}if(re.has(a)&&((g=re.get(a))!=null&&g.player)){r(re.get(a).player);return}try{const f=new window.YT.Player(a,{events:{onReady:()=>{},onStateChange:b=>hp(a,b),onError:()=>{}}});re.set(a,{player:f,el:s,playing:!1}),s.dataset.dbsYtBound="1",r(f)}catch(f){console.warn("[dbs] bindYoutubeInterrupt failed",a,f),r(null)}};if(s.dataset.dbsYtBound==="1"&&re.has(a)){r(re.get(a).player);return}let c=!1;const p=()=>{c||(c=!0,d())};s.addEventListener("load",p,{once:!0}),setTimeout(p,400)}))}function xi(e){const s=[...(e&&e.querySelectorAll?e:document).querySelectorAll("iframe")].filter(i=>{if(ea(i))return!1;const a=i.getAttribute("src")||i.src||"";return Oa(a)});return Promise.all(s.map(i=>fo(i)))}function gp(e){var a,n;const t=typeof e=="string"?document.getElementById(e):e,s=typeof e=="string"?e:t==null?void 0:t.id;if(!s||s==="dbsStickyFrame"||s==="dbsYtHost")return;const i=re.get(s);if(i){i.playing&&(i.playing=!1,qe=Math.max(0,qe-1),qe===0&&Ye());try{(n=(a=i.player)==null?void 0:a.destroy)==null||n.call(a)}catch{}re.delete(s)}}function _s(e){if(!Number.isFinite(e)||e<=0)return"--:--";const t=Math.floor(e);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}let Oi=!1;function fp(){var a;const e=document.getElementById("spSeek"),t=document.getElementById("spTimeCur"),s=document.getElementById("spTimeDur"),i=document.getElementById("spVol");!e||!t||!s||(e.addEventListener("input",()=>{Oi=!0}),e.addEventListener("change",()=>{var o,r;const n=((o=L==null?void 0:L.getDuration)==null?void 0:o.call(L))||0;n>0&&((r=L.seekTo)==null||r.call(L,Number(e.value)/1e3*n,!0)),Oi=!1}),i==null||i.addEventListener("input",()=>{var n;return(n=L==null?void 0:L.setVolume)==null?void 0:n.call(L,Number(i.value))}),(a=document.getElementById("spCast"))==null||a.addEventListener("click",()=>h("Cast is not available yet")),setInterval(()=>{var r,d;const n=((r=L==null?void 0:L.getDuration)==null?void 0:r.call(L))||0,o=((d=L==null?void 0:L.getCurrentTime)==null?void 0:d.call(L))||0;n>0?(e.disabled=!1,Oi||(e.value=String(Math.round(o/n*1e3))),t.textContent=o>0?_s(o):"0:00",s.textContent=_s(n),e.setAttribute("aria-valuetext",`${_s(o)} of ${_s(n)}`),e.style.setProperty("--sp-pct",`${o/n*100}%`)):(e.disabled=!0,t.textContent="--:--",s.textContent="--:--")},500))}const ii=new Set;function Ke(){const e=(location.hash||"").replace(/^#/,"")||"/home";let t="",s=e;const i=e.indexOf("#");i>=0&&(t=e.slice(i+1).split("?")[0],s=e.slice(0,i));const a=s.startsWith("/")?s:"/"+s,n=a.indexOf("?"),o=n===-1?a:a.slice(0,n),r=n===-1?"":a.slice(n+1),d=o.split("/").filter(Boolean);return{path:"/"+(d[0]||"home"),parts:d,query:Object.fromEntries(new URLSearchParams(r)),elementId:t,raw:a}}function R(e){const s=(e.startsWith("#")?e:"#"+(e.startsWith("/")?e:"/"+e)).replace(/^#/,"");if((location.hash||"").replace(/^#/,"")===s){ii.forEach(a=>a(Ke()));return}location.hash=s}function vp(e){return ii.add(e),()=>ii.delete(e)}function bp(){const e=()=>ii.forEach(t=>t(Ke()));window.addEventListener("hashchange",e),location.hash?e():location.hash="/home"}const qi="/pikk-app/",Mt=qi.endsWith("/")?qi.slice(0,-1):qi;function yt(e){if(e==null||e==="")return e;const t=String(e);return/^(https?:|data:|blob:|idb:|#|\/\/)/i.test(t)||Mt&&(t===Mt||t.startsWith(Mt+"/"))?t:t.startsWith("/")?Mt+t:(Mt||"")+"/"+t}function vo(e=document){Mt&&(e.querySelectorAll("[src]").forEach(t=>{const s=t.getAttribute("src");if(!s)return;const i=yt(s);i!==s&&t.setAttribute("src",i)}),e.querySelectorAll("[srcset]").forEach(t=>{const s=t.getAttribute("srcset");if(!s||!s.includes("/"))return;const i=s.replace(/(^|,\s*)(\/(?!\/)[^\s,]+)/g,(a,n,o)=>n+yt(o));i!==s&&t.setAttribute("srcset",i)}),e.querySelectorAll("[data-zoom]").forEach(t=>{const s=t.getAttribute("data-zoom");if(!s)return;const i=yt(s);i!==s&&t.setAttribute("data-zoom",i)}),e.querySelectorAll("[poster]").forEach(t=>{const s=t.getAttribute("poster");if(!s)return;const i=yt(s);i!==s&&t.setAttribute("poster",i)}))}function bo(e,t){e&&e.querySelectorAll("a[data-path]").forEach(s=>{const i=s.getAttribute("data-path")===t;s.classList.toggle("on",i),i?s.setAttribute("aria-current","page"):s.removeAttribute("aria-current")})}function yp(e,t){var a,n,o;const s=(o=(n=(a=t==null?void 0:t.querySelector)==null?void 0:a.call(t,"h1"))==null?void 0:n.textContent)==null?void 0:o.replace(/\s+/g," ").trim();return s?s.slice(0,80):(String((e==null?void 0:e.path)||"/home").split("/").filter(Boolean).pop()||"home").replace(/[-_]+/g," ").replace(/\b\w/g,r=>r.toUpperCase())}function kp(e,t,s,i=document){const a=yp(e,t);return i.title=`${a} | PIKK`,s&&(s.textContent=`${a} page loaded`),a}function wp({drawer:e,scrim:t,trigger:s},i,a=!1){var o;if(!e||!t||!s)return;const n=!!i;e.classList.toggle("open",n),e.setAttribute("aria-hidden",String(!n)),e.inert=!n,t.classList.toggle("show",n),s.setAttribute("aria-expanded",String(n)),s.setAttribute("aria-label",n?"Close navigation menu":"Open navigation menu"),n?(o=e.querySelector("button, a[href]"))==null||o.focus():a&&s.focus()}const Sp="dbs_media_v1",Bt="blobs",$p=1;function yo(){return new Promise((e,t)=>{const s=indexedDB.open(Sp,$p);s.onupgradeneeded=()=>{const i=s.result;i.objectStoreNames.contains(Bt)||i.createObjectStore(Bt,{keyPath:"id"})},s.onsuccess=()=>e(s.result),s.onerror=()=>t(s.error||new Error("idb open failed"))})}async function xp(e,t,s={}){const i=await yo();return new Promise((a,n)=>{const o=i.transaction(Bt,"readwrite");o.objectStore(Bt).put({id:e,blob:t,mime:t.type||s.mime||"application/octet-stream",name:s.name||"",size:t.size||0,at:Date.now()}),o.oncomplete=()=>a(e),o.onerror=()=>n(o.error)})}async function Ep(e){const t=await yo();return new Promise((s,i)=>{const n=t.transaction(Bt,"readonly").objectStore(Bt).get(e);n.onsuccess=()=>s(n.result||null),n.onerror=()=>i(n.error)})}const Ni=new Map;async function Ei(e){if(!e)return"";if(e.startsWith("idb:")){const t=e.slice(4);if(Ni.has(t))return Ni.get(t);const s=await Ep(t);if(!(s!=null&&s.blob))return"";const i=URL.createObjectURL(s.blob);return Ni.set(t,i),i}return e}function Ap(e="blob"){return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}const Bi=Object.freeze([{tier:"spotlight",name:"Premium Spotlight",slots:1,day:199,week:999},{tier:"featured",name:"Featured Box",slots:2,day:99,week:499},{tier:"promo",name:"Promo Box",slots:3,day:49,week:249}]);function Ri(e,t){return`<article class="pikk-ad-slot pikk-ad-${e.tier}" data-promo-tier="${e.tier}" aria-label="${e.name} slot ${t}, pricing preview">
    <span class="pikk-ad-slot-top"><span class="pikk-ad-slot-icon" aria-hidden="true">▶</span><span class="pikk-ad-slot-number">0${t}</span></span>
    <strong>${e.name}</strong>
    <span class="pikk-ad-slot-description">Available placement · booking coming soon</span>
    <span class="pikk-ad-slot-prices"><b>$${e.day}</b><small>/ 24 hours</small></span>
    <span class="pikk-ad-slot-week">$${e.week} / 7 days</span>
  </article>`}function ko(e){return`<div class="pikk-stories-promotions" data-featured-context="${e==="videos"?"videos":"home"}">
    <section class="pikk-stories-strip" aria-label="PIKK Stories preview">
      <div class="pikk-featured-heading"><div><p class="kicker">Connect in 24 hours</p><h2>PIKK Stories</h2></div><span class="pikk-featured-state">Coming soon</span></div>
      <div class="pikk-stories-preview">
        <div class="pikk-story-preview"><span class="pikk-story-ring"><span aria-hidden="true">＋</span></span><strong>Your Story</strong></div>
        <p>Share moments with your followers. Stories will disappear after 24 hours once publishing launches.</p>
      </div>
    </section>
    <section class="pikk-featured-inventory" aria-label="Featured on PIKK sponsored placement pricing">
      <div class="pikk-featured-heading"><div><p class="kicker">Creator &amp; brand visibility</p><h2>Featured on PIKK</h2></div><span class="pikk-featured-sponsored">Sponsored placements</span></div>
      <p class="pikk-featured-intro">Six premium advertising positions on each page. Preview pricing below; booking and checkout are not active yet.</p>
      <div class="pikk-featured-rows">
        <div class="pikk-featured-row pikk-featured-row-hero">${Ri(Bi[0],1)}</div>
        <div class="pikk-featured-row pikk-featured-row-two">${[1,2].map(s=>Ri(Bi[1],s)).join("")}</div>
        <div class="pikk-featured-row pikk-featured-row-three">${[1,2,3].map(s=>Ri(Bi[2],s)).join("")}</div>
      </div>
      <p class="pikk-featured-footnote">Home and Videos placements are priced separately. Rates are introductory proposals; no paid placement or guaranteed views are currently offered.</p>
    </section>
  </div>`}const Cp={Explore:"🧭","Shorts / Clips":"▶",Music:"🎵",Videos:"🎬",Posts:"📸",Live:"🔴","PIKK Lounge":"💬",Vault:"🔐",Marketplace:"🛍️",Missions:"🎯"},ai=[{id:"toplive",label:"Top live"},{id:"videos",label:"Videos"},{id:"rising",label:"Rising"},{id:"hot",label:"Hot lives"},{id:"songs",label:"Songs"}],Tp=8e3,qa="dbs_home_stage_v2",Dp=["dbs_home_stage"];function Na(e){const t=Number(e)||0;return t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)}k`:String(t)}function Os(e){return e?!!(e.house||e.hostId==="dbs"||e.hostName==="DatBoiSkeet"):!1}function Sn(e){return e?!!(e.house||e.userId==="dbs"||e.username==="DatBoiSkeet"):!1}function Mp(e=3){const t=Wt(),s=t.filter(n=>!Os(n)),i=t.filter(n=>Os(n)),a=s.slice(0,Math.max(2,e-1));for(i[0]&&a.push(i[0]);a.length<e&&s[a.filter(n=>!Os(n)).length];){const n=s[a.filter(o=>!Os(o)).length];if(!n||a.includes(n))break;a.push(n)}return a.slice(0,e)}function Lp(e=4){const t=io(Math.max(8,e+4)),s=t.filter(n=>!Sn(n)),i=t.filter(n=>Sn(n)),a=[...s.slice(0,3)];i[0]&&a.push(i[0]);for(const n of s.slice(3)){if(a.length>=e)break;a.includes(n)||a.push(n)}for(const n of i.slice(1)){if(a.length>=e)break;a.includes(n)||a.push(n)}return a.slice(0,e)}function wo(){const e=D().live,t=Wt().map(s=>({...s}));if(e&&!e.endedAt){const s=Math.max(0,Number(e.viewers)||0),i=Math.max(0,Number(e.giftsTotal)||0);t.push({id:e.id||"session",hostId:e.hostId,hostName:e.hostName||"Creator",title:e.title||"Live now",viewers:s,giftsTotal:i,score:s+i*20,house:e.hostId==="dbs"||e.hostName==="DatBoiSkeet"})}return t.sort((s,i)=>(Number(i.viewers)||0)-(Number(s.viewers)||0)||(Number(i.score)||0)-(Number(s.score)||0)),t[0]||null}function Us(e,{rising:t=!1}={}){const s=e.house?"House":t?"Rising":"Hot",i=Number(e.viewers)||0,a=Na(i),n=t&&e.playbacksToday!=null?` · ~${l(String(e.playbacksToday))} playbacks today`:"";return`
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
    </a>`}function Ip(e){return e.mediaType==="video"?"Video":e.image||e.mediaType==="image"?"Pic":"Post"}function Pp(e){if(!e)return"";const t=Number(e.playsToday)||0,s=t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)}k`:String(t),i=e.cover?`<img class="la-thumb" src="${l(e.cover)}" alt="" loading="lazy" />`:'<span class="la-thumb la-thumb-empty" aria-hidden="true">♪</span>',a=e.demo?" · DEMO seed":"";return`
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
    </li>`}function _p(e){const t=Number(e.viewers)||0,s=Na(t),i=e.house?"House":"Hot";return`
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
    </li>`}function Op(e){const t=e.postId||e.id,s=Ip(e),i=e.image?`<img class="la-thumb" src="${l(e.image)}" alt="" loading="lazy" />`:`<span class="la-thumb la-thumb-empty" aria-hidden="true">${l(((e.username||"?")[0]||"?").toUpperCase())}</span>`,a=e.house?" · house":"";return`
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
    </li>`}function qp(e){const t=e.coverRef&&!String(e.coverRef).startsWith("idb:")?e.coverRef:"";return`
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
    </li>`}function Np(){for(const e of Dp){try{sessionStorage.removeItem(e)}catch{}try{localStorage.removeItem(e)}catch{}}try{localStorage.removeItem(qa)}catch{}}function So(){Np();try{const e=sessionStorage.getItem(qa);if(ai.some(t=>t.id===e))return e}catch{}return"toplive"}function Bp(e){try{sessionStorage.setItem(qa,e)}catch{}}function $n(e){return"$"+Number(e||0).toLocaleString(void 0,{maximumFractionDigits:2})}function Rp(e){const t=Math.max(0,e-Date.now()),s=Math.floor(t/36e5),i=Math.floor(t%36e5/6e4);return t<=0?"Ended":`${s}h ${i}m left`}function $o(e){if(!e)return'<p class="muted" style="margin:0">No daily app goal right now.</p>';const t=Math.min(100,Math.round(e.raised/(e.targetAmount||1)*100));return`
    <div class="home-goal-head"><strong class="home-goal-name">${l(e.name)}</strong>
      <span class="chip home-goal-time" id="homeGoalTimeLeft">${Rp(e.endsAt)}</span></div>
    <div class="home-goal-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${t}">
      <div class="home-goal-fill" style="width:${t}%"></div></div>
    <p class="muted home-goal-amounts" style="margin:6px 0 10px">${$n(e.raised)} raised of ${$n(e.targetAmount)} · ${t}%</p>
    <div class="row wrap" style="gap:8px">
      ${[50,100,250].map(s=>`<button type="button" class="btn ghost home-goal-donate" data-goal-id="${l(e.id)}" data-coins="${s}">Donate ${s} coins</button>`).join("")}
      <form class="home-goal-custom-form" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;align-items:end">
        <label style="flex:1;min-width:125px">Custom coins
          <input class="home-goal-custom-coins" type="number" inputmode="numeric" min="1" max="1000000" step="1" required placeholder="Enter coins" style="width:100%" />
        </label>
        <button type="submit" class="btn primary">Donate custom</button>
      </form>
    </div>`}function jp(){var Yt;const e=Xo.map(y=>`
    <a class="preview-card" href="#${y.route}${y.hash?"#"+y.hash:""}">
      <span class="pc-icon" aria-hidden="true">${Cp[y.title]||"◆"}</span>
      <strong>${l(y.title)}</strong>
      <span class="muted">${l(y.blurb)}</span>
    </a>`).join(""),t=It.map(y=>`
    <a class="cover-card" href="#/music">
      <div class="cover-frame">
        <span class="badge-cs">${l(y.status)}</span>
        <img src="${l(y.cover)}" alt="${l(y.title)}" loading="lazy" />
      </div>
      <div class="t">${l(y.title)}</div>
      <div class="sub">${l(y.artist)}</div>
    </a>`).join(""),s=ge.filter(y=>(y.category||"Music Videos")==="Music Videos"),i=s.filter(y=>y.featured),a=i.length?i:s.slice(0,6),n=a[0]||s[0]||ge[0],o=ca[0],r=a.map(y=>`
    <div class="vid">
      <a class="thumb" href="${l(y.youtube)}" target="_blank" rel="noopener" aria-label="Play ${l(y.title)}"><span>▶</span></a>
      <div>
        <strong>${l(y.title)}</strong>
        <div class="muted" style="font-size:12px;margin-top:4px">
          <a href="${l(y.youtube)}" target="_blank" rel="noopener">Watch on YouTube</a>
          · <a href="#/videos">Embed on Videos</a>
        </div>
      </div>
    </div>`).join(""),d=a.map((y,j)=>`
    <button type="button" class="mv-pick${j===0?" on":""}" data-embed="${l(y.embed)}" data-title="${l(y.title)}" data-yt="${l(y.youtube)}">
      <span class="mv-pick-play" aria-hidden="true">▶</span>
      <span class="mv-pick-t">${l(y.title)}</span>
    </button>`).join(""),c=o?`<div class="card home-mix" id="home-dbs-mix">
        <h3>DatBoiSkeet Mix</h3>
        <p class="muted" style="margin:0 0 10px">Stream from the original YouTube Mix playlist — not rehosted.</p>
        <div class="hero-video" style="margin:0 0 10px">
          <iframe src="${l(We(o.embed))}" title="${l(o.title)}" allowfullscreen loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
        </div>
        <div class="row wrap" style="gap:8px">
          <a class="btn" href="${l(o.youtube)}" target="_blank" rel="noopener">Play on YouTube</a>
          <a class="btn ghost" href="#/music#youtube-mixes">Music · Mixes</a>
          <a class="btn ghost" href="#/videos">All videos</a>
        </div>
      </div>`:"",m=wt({publishedOnly:!0,types:["picture"]}).map(y=>`
    <div class="cover-card catalog-admin-home" data-id="${l(y.id)}">
      <div class="cover-frame">
        <span class="badge-cs">From Admin</span>
        <img data-idb-src="${l(y.coverRef&&y.coverRef.startsWith("idb:")?y.coverRef:"")}" src="${l(y.coverRef&&!y.coverRef.startsWith("idb:")?y.coverRef:"")}" alt="${l(y.title)}" loading="lazy" />
      </div>
      <div class="t">${l(y.title)}</div>
      <div class="sub">${l(y.artist)}</div>
    </div>`).join(""),f=wt({publishedOnly:!0,types:["video"]}).slice(0,3).map(y=>`
    <div class="vid catalog-admin-home" data-id="${l(y.id)}">
      <a class="thumb" href="${l(y.youtube||"#/videos")}" ${y.youtube?'target="_blank" rel="noopener"':""}><span>▶</span></a>
      <div>
        <strong>${l(y.title)}</strong>
        <div class="muted" style="font-size:12px;margin-top:4px">${l(y.artist)} · Admin</div>
      </div>
    </div>`).join(""),b=D().live,k=b&&!b.endedAt?`<li class="la-row la-session"><a class="la-main" href="#/live"><span class="la-hoodie" aria-label="Live now"><span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span><span class="live-hoodie-viewers">${l(Na(b.viewers||0))}</span></span><span class="la-body"><strong>@${l(b.hostName)}</strong><span class="la-preview">${l(b.title||"Live now")}</span><span class="la-stats muted">${l(String(b.viewers||0))} watching · your session</span></span></a><span class="chip">Live</span></li>`:"",v=ro(),S=Pp(v),$=Mp(3),A=Lp(4),w=wt({publishedOnly:!0,types:["picture"]}).slice(0,2),P=$.map(_p).join(""),C=A.map(Op).join(""),B=w.map(qp).join(""),T=`${S}${k}${P}${C}${B}
        <li class="la-row la-kicker"><span class="la-main la-kicker-main"><span class="la-body"><strong>Ladies Only</strong><span class="la-preview">Art live on Music · playback when it drops</span></span></span><span class="chip">Music</span></li>
        <li class="la-row la-kicker"><a class="la-main" href="#/restream"><span class="la-body"><strong>PIKK Restream</strong><span class="la-preview">Stream to YouTube, TikTok, Twitch &amp; more — free inside PIKK</span></span></a><span class="chip">Restream</span></li>${!S&&!P&&!C&&!B&&!k?'<li class="la-row"><span class="la-main la-kicker-main"><span class="la-body"><span class="la-preview muted">No hot activity yet — engage on Posts / go Live to spike the feed.</span></span></span><span class="chip">TEST</span></li>':""}`,O=So(),H=ai.map(y=>`
    <button type="button" class="home-stage-tab${y.id===O?" on":""}" role="tab"
      aria-selected="${y.id===O?"true":"false"}" data-stage="${y.id}" id="stage-tab-${y.id}">
      ${l(y.label)}
    </button>`).join(""),K=Wt().slice(0,5),M=sp().slice(0,5),I=K.map(y=>Us(y)).join("")||'<p class="muted">No hot lives yet — seed from Live / Hot Feed.</p>',q=M.map(y=>Us(y,{rising:!0})).join("")||'<p class="muted">No rising streamers yet.</p>',V=It.map(y=>`
    <a class="home-song-card" href="#/music">
      <img src="${l(y.cover)}" alt="" loading="lazy" />
      <div>
        <strong>${l(y.title)}</strong>
        <div class="muted" style="font-size:12px">${l(y.artist)} · ${l(y.status)}</div>
        <span class="chip" style="margin-top:6px">Enhancement · Coming Soon</span>
      </div>
    </a>`).join(""),Y=wo(),G=Y?Us(Y):'<p class="muted">No live streams right now — go Live or check Hot Feed.</p>',z=`
    <div class="home-stage-panel${O==="toplive"?" on":""}" data-panel="toplive" role="tabpanel" id="homeTopLivePanel" ${O==="toplive"?"":"hidden"}>
      <p class="muted home-stage-lead">Top live · highest viewers right now. Red LIVE hoodie on the card · updates as rankings change.</p>
      <div class="home-live-grid" id="homeTopLiveGrid">${G}</div>
      <a class="btn ghost block" href="#/live" style="margin-top:10px">Open Live</a>
    </div>`,Se=`
    <div class="home-stage-panel${O==="videos"?" on":""}" data-panel="videos" role="tabpanel" ${O==="videos"?"":"hidden"}>
      <div class="hero-video" id="homeFeaturedVideo">
        <iframe
          id="homeFeaturedIframe"
          src="${l(We(n.embed))}"
          title="${l(n.title)}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          loading="lazy"></iframe>
      </div>
      <div class="hero-caption">
        <strong id="homeFeaturedTitle">${l(n.title)}</strong>
        <a href="#/videos">All videos →</a>
      </div>
      <div class="mv-carousel" role="tablist" aria-label="Official music videos">${d}</div>
    </div>`,Ee=`
    <div class="home-stage-panel${O==="rising"?" on":""}" data-panel="rising" role="tabpanel" ${O==="rising"?"":"hidden"}>
      <p class="muted home-stage-lead">Rising streamers · mid-tier creators from §38 Hot Feed signals (non-house). TEST MODE seeds.</p>
      <div class="home-live-grid">${q}</div>
      <a class="btn ghost block" href="#/live" style="margin-top:10px">Open Live</a>
    </div>`,Ge=`
    <div class="home-stage-panel${O==="hot"?" on":""}" data-panel="hot" role="tabpanel" ${O==="hot"?"":"hidden"}>
      <p class="muted home-stage-lead">Hot lives · ranked by viewers + gifts score (house OK). Strong playbacks / spikes from earlier today count.</p>
      <div class="home-live-grid">${I}</div>
      <a class="btn ghost block" href="#/live" style="margin-top:10px">Open Live</a>
    </div>`,Ve=`
    <div class="home-stage-panel${O==="songs"?" on":""}" data-panel="songs" role="tabpanel" ${O==="songs"?"":"hidden"}>
      <p class="muted home-stage-lead">Enhancements &amp; songs · Coming Soon covers + featured tracks. Upload &amp; sell on Music when Commerce lands.</p>
      <div class="home-song-grid">${V}
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
    </div>`,ct=`
    <div class="home-stage card" id="homeFeaturedStage" data-active="${l(O)}">
      <div class="home-stage-head">
        <div>
          <p class="kicker" style="margin:0">Featured stage</p>
          <h2 class="home-stage-title">Top live · Videos · Rising · Hot · Songs</h2>
        </div>
        <span class="chip chip-audit">TEST MODE · auto-cycle</span>
      </div>
      <div class="home-stage-tabs" role="tablist" aria-label="Featured stage">${H}</div>
      <div class="home-stage-panels">
        ${z}
        ${Se}
        ${Ee}
        ${Ge}
        ${Ve}
      </div>
    </div>`,dt=`
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
    </div>`,pt=`
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
    </div>`,ut=`
    <div class="card home-sell-promo home-app-goal" id="home-app-goal">
      <p class="kicker">Daily app goal · 24h</p>
      <div id="homeAppGoalBody">${$o(Yi())}</div>
      <p class="chip" style="margin-top:10px">TEST MODE · no real payments</p>
    </div>`,te=a.slice(0,6).map((y,j)=>{const za=new URL(y.youtube).searchParams.get("v")||"",Wa=za?`https://i.ytimg.com/vi/${encodeURIComponent(za)}/hqdefault.jpg`:"";return`<a class="pikk-home-media-card ${j<2?"is-featured":""}" href="${l(y.youtube)}" target="_blank" rel="noopener noreferrer"
       aria-label="Watch ${l(y.title)} on YouTube">
       ${Wa?`<img src="${l(Wa)}" alt="" loading="${j<2?"eager":"lazy"}" decoding="async" referrerpolicy="no-referrer"/>`:'<span class="pikk-home-media-fallback" aria-hidden="true">♫</span>'}
       <span class="pikk-home-media-shadow"></span>
       <span class="pikk-home-media-badge">▶ OFFICIAL VIDEO</span>
       <span class="pikk-home-media-title">${l(y.title)}</span>
     </a>`}).join(""),ye=[...tt.map(y=>y.cover),...It.slice(0,4).map(y=>y.cover)].filter(Boolean),Ms=[{label:"For You",href:"#/explore"},{label:"Following",href:"#/posts"},{label:"Music",href:"#/music"},{label:"Nearby",href:"#/connect"},{label:"Live",href:"#/live"}].map((y,j)=>`
    <a class="pikk-home-circle" href="${y.href}" aria-label="Open ${l(y.label)}">
      <span class="pikk-home-circle-ring">${ye[j]?`<img src="${l(ye[j])}" alt="" loading="lazy" decoding="async"/>`:'<span aria-hidden="true">●</span>'}</span>
      <span>${l(y.label)}</span>
    </a>`).join(""),Ls=`
    ${`
    <section class="pikk-home-visual" id="pikkHomeVisual" aria-labelledby="pikkHomeVisualTitle">
      <div class="pikk-home-visual-top">
        <div><p class="kicker">PIKK DISCOVER</p><h2 id="pikkHomeVisualTitle">Your music. Your world.</h2></div>
        <a href="#/explore" class="pikk-home-visual-more">Explore ↗</a>
      </div>
      <nav class="pikk-home-circle-strip" aria-label="Browse PIKK features">
        <a class="pikk-home-circle pikk-home-circle-me" href="#/posts?compose=1" aria-label="Create a post on PIKK">
          <span class="pikk-home-circle-ring">${(Yt=D().user)!=null&&Yt.avatar?`<img src="${l(D().user.avatar)}" alt="" loading="lazy" decoding="async"/>`:'<span class="pikk-home-circle-avatar" aria-hidden="true"><svg viewBox="0 0 24 24" width="40" height="40"><circle cx="12" cy="8.5" r="4" fill="currentColor"/><path d="M4 21c1.4-4.2 4.6-6.3 8-6.3s6.6 2.1 8 6.3" fill="currentColor"/></svg></span>'}</span>
          <span class="pikk-home-circle-plus" aria-hidden="true">+</span><span>Create</span>
        </a>
        ${Ms}
      </nav>
      <nav class="pikk-home-filterbar" aria-label="Discover categories">
        <a class="is-current" href="#/explore">All</a>
        <a href="#/videos">Videos</a>
        <a href="#/music">Music</a>
        <a href="#/posts">Photos</a>
        <a href="#/live">Live</a>
        <a href="#/shop">Shop</a>
        <a href="#/dating">Dating</a>
      </nav>
      <div class="pikk-home-media-grid" aria-label="Official DatBoiSkeet video selections">
        ${te}
      </div>
      <div class="pikk-home-media-footer">
        <p class="muted">Real official releases · Video thumbnails from YouTube · No fabricated views or live counts</p>
        <a href="#/videos">View all videos →</a>
      </div>
    </section>`}
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


    ${ct}

    ${ko("home")}

    ${dt}

    <section class="home-arcade card" id="homeArcade" aria-label="PIKK Games featured slideshow">
      <div class="home-arcade-top">
        <div><p class="kicker">Discover the arcade</p><h2>15 GAMES. ONE PIKK.</h2></div>
        <a href="#/games" class="btn ghost">All games →</a>
      </div>
      <div class="home-arcade-stage" aria-live="off">
        ${us.map((y,j)=>`<article class="home-arcade-slide pikk-game-${l(y.theme)}" data-game-slide="${j}" ${j?"hidden":""}>
          <div class="home-arcade-image">${y.artwork?`<img src="${l(Ys(y))}" alt="" loading="lazy" decoding="async" />`:`<span class="home-arcade-symbol" aria-hidden="true">${y.icon}</span>`}</div>
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


    ${ut}

    ${pt}

    ${c}

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
        ${T}
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
  `;return _("Home",Ls,{lead:"Featured stage · Top live · Block Wars preview · Live activity (hot lives · high-engagement posts from creators &amp; community · house updates) · Mix · Coming Soon · creator sell DEMO."})}function Fp(e){var x,Q,T,O,H,K;const t=e.querySelector("#homeArcade");if(t){const M=[...t.querySelectorAll("[data-game-slide]")],I=t.querySelector("#homeArcadePosition");let q=0,V=null;const Y=(Q=(x=window.matchMedia)==null?void 0:x.call(window,"(prefers-reduced-motion: reduce)"))==null?void 0:Q.matches,G=Ee=>{q=(Ee+M.length)%M.length,M.forEach((Ge,Ve)=>{Ge.hidden=Ve!==q}),I&&(I.textContent=`${q+1} / ${M.length}`)},z=()=>{V!==null&&clearInterval(V),V=null};(T=t.querySelector("[data-arcade-prev]"))==null||T.addEventListener("click",()=>{z(),G(q-1)}),(O=t.querySelector("[data-arcade-next]"))==null||O.addEventListener("click",()=>{z(),G(q+1)}),Y||(V=setInterval(()=>{if(!document.body.contains(t)){z();return}document.visibilityState==="visible"&&G(q+1)},6500));const Se=new MutationObserver(()=>{document.body.contains(t)||(z(),Se.disconnect())});Se.observe(document.body,{childList:!0,subtree:!0})}const s=e.querySelector("#homeAppGoalBody");if(s){const M=()=>{document.body.contains(s)?s.innerHTML=$o(Yi()):(clearInterval(q),document.removeEventListener("visibilitychange",I))},I=()=>{document.visibilityState==="visible"&&M()},q=setInterval(M,3e4);document.addEventListener("visibilitychange",I),s.addEventListener("submit",V=>{var Se,Ee;if(!V.target.matches(".home-goal-custom-form"))return;V.preventDefault();const Y=Number((Se=V.target.querySelector(".home-goal-custom-coins"))==null?void 0:Se.value);if(!Number.isSafeInteger(Y)||Y<1||Y>1e6)return h("Enter 1–1,000,000 whole coins");const G=(Ee=Yi())==null?void 0:Ee.id,z=Qs(G,Y);h(z!=null&&z.ok?"Custom donation sent · TEST MODE":(z==null?void 0:z.error)==="insufficient"?"Not enough demo coins":(z==null?void 0:z.error)==="signin"?"Sign in first":"Donation unavailable · TEST MODE"),M()}),s.addEventListener("click",V=>{const Y=V.target.closest(".home-goal-donate");if(!Y)return;const G=Qs(Y.dataset.goalId,Number(Y.dataset.coins));h(G&&G.ok?`TEST MODE · ${Y.dataset.coins} coins donated (no real payment)`:"TEST MODE · donate unavailable"),M()})}const i=e.querySelector(".page-head");if(i){i.querySelectorAll(".badge-phase, a.badge-phase, .live-hoodie-pill, .live-hoodie").forEach(I=>{I.remove()}),i.querySelectorAll("a, span, button").forEach(I=>{const q=(I.textContent||"").replace(/\s+/g," ").trim();(/^●?\s*LIVE$/i.test(q)||q==="LIVE")&&I.remove()});const M=i.querySelector("h1");M&&[...M.children].forEach(I=>{const q=(I.textContent||"").replace(/\s+/g," ").trim();(/LIVE/i.test(q)||I.classList.contains("badge-phase")||I.classList.contains("live-hoodie-pill"))&&I.remove()})}e.querySelectorAll("[data-idb-src]").forEach(async M=>{const I=M.getAttribute("data-idb-src");if(!I)return;const q=await Ei(I);q&&(M.tagName==="IMG"||M.tagName==="VIDEO"||M.tagName==="AUDIO")&&(M.src=q)});const a=e.querySelector("#homeFeaturedIframe"),n=e.querySelector("#homeFeaturedTitle");e.querySelectorAll(".mv-pick").forEach(M=>{M.addEventListener("click",()=>{e.querySelectorAll(".mv-pick").forEach(q=>q.classList.remove("on")),M.classList.add("on");const I=M.dataset.embed||"";a&&I&&(gp(a),a.removeAttribute("data-dbs-yt-bound"),a.src=I+(I.includes("?")?"&":"?")+"rel=0",a.title=M.dataset.title||"",fo(a)),n&&(n.textContent=M.dataset.title||"")})}),xi(e);const o=e.querySelector("#bwPreviewVideo"),r=e.querySelector("#bwPreviewPlay");if(o){const M=()=>{if(!r)return;const I=o.paused||o.ended;r.hidden=!I,r.setAttribute("aria-hidden",I?"false":"true")};r==null||r.addEventListener("click",I=>{I.preventDefault(),o.play().catch(()=>{})}),o.addEventListener("play",()=>{Nt(),M()}),o.addEventListener("pause",()=>{Ye(),M()}),o.addEventListener("ended",()=>{Ye(),M()}),o.addEventListener("pointerdown",()=>{o.paused||Nt()}),M()}const d=2e4;function c(){const M=e.querySelector("#homeTopLiveGrid");if(!M||!document.body.contains(M))return!1;const I=wo();return M.innerHTML=I?Us(I):'<p class="muted">No live streams right now — go Live or check Hot Feed.</p>',!0}let p=setInterval(()=>{c()||(clearInterval(p),p=null)},d);const m=()=>{document.visibilityState==="visible"&&c()};document.addEventListener("visibilitychange",m),window.addEventListener("focus",c);const g=e.querySelector("#homeFeaturedStage");if(!g){const M=new MutationObserver(()=>{document.body.contains(e)||(p&&clearInterval(p),document.removeEventListener("visibilitychange",m),window.removeEventListener("focus",c),M.disconnect())});M.observe(document.body,{childList:!0,subtree:!0});return}const f=[...e.querySelectorAll(".home-stage-tab")],b=[...e.querySelectorAll(".home-stage-panel")];let k=!1,v=null;const S=typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||document.documentElement.classList.contains("reduce-motion")||((K=(H=document.body)==null?void 0:H.classList)==null?void 0:K.contains("reduce-motion"));function $(M){ai.some(I=>I.id===M)||(M="toplive"),g.dataset.active=M,Bp(M),f.forEach(I=>{const q=I.dataset.stage===M;I.classList.toggle("on",q),I.setAttribute("aria-selected",q?"true":"false")}),b.forEach(I=>{const q=I.dataset.panel===M;I.classList.toggle("on",q),q?I.removeAttribute("hidden"):I.setAttribute("hidden","")})}function A(){const M=ai.map(V=>V.id),I=g.dataset.active||"toplive",q=M.indexOf(I);$(M[(q+1)%M.length])}function w(){P(),!(k||S)&&(v=setInterval(A,Tp))}function P(){v&&(clearInterval(v),v=null)}f.forEach(M=>{M.addEventListener("click",()=>{k=!0,P(),$(M.dataset.stage)})});const C=So()||"toplive";$(C),S||setTimeout(()=>{!document.body.contains(g)||k||w()},1e4);const B=new MutationObserver(()=>{document.body.contains(g)||(P(),p&&(clearInterval(p),p=null),document.removeEventListener("visibilitychange",m),window.removeEventListener("focus",c),B.disconnect())});B.observe(document.body,{childList:!0,subtree:!0})}const Kp="e3289fe14c167c284a1b3e6600334d78b63ba589",Gp=Object.freeze([{title:"Viral Live: Correct Category Destinations",detail:"Viral Clips opens Clips, Songs opens Music, and Photos opens Home. These are links to existing PIKK sections; the 24/7 channel is still a preview, not broadcasting.",route:"#/viral-live",pr:197,kind:"VIRAL LIVE · PREVIEW"},{title:"Viral Live: Mobile Category Visibility",detail:"On narrow phones, keyboard-selected Videos, Viral Clips, Songs and Photos tabs scroll into view without changing the existing swipeable design. Continuous broadcasting is not live.",route:"#/viral-live",pr:196,kind:"VIRAL LIVE · PREVIEW"},{title:"Viral Live: Source Queue Keyboard Browsing",detail:"Use arrow keys or Home/End to select among three original music-video sources. The preview updates its artwork and YouTube source link; this is not a livestream.",route:"#/viral-live",pr:195,kind:"VIRAL LIVE · PREVIEW"},{title:"Explore: Escape Clears Search",detail:"Press Escape in Explore search to clear the query and results while keeping focus in the search field. Existing discovery and profiles remain available.",route:"#/explore",pr:194,kind:"EXPLORE · NAVIGATION"},{title:"Explore: Search Survives Tab Changes",detail:"Keep an Explore search when switching between Trending, Following and Discover; Clear resets the query and results. This improves browsing, not backend search coverage.",route:"#/explore",pr:193,kind:"EXPLORE · NAVIGATION"}]);function Vp(){const e=Kp.slice(0,8),t=Gp.map((s,i)=>`
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
    </article>`).join("");return _("PIKK Updates",`
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
      <div class="pikk-updates-hero-mark"><img src="${l(yt("brand/pikk-official-approved.jpg"))}" alt="PIKK official chrome logo" loading="eager"></div>
    </section>
    <section class="pikk-updates-list" aria-label="Recent published updates">
      <h2>Latest verified improvements</h2>
      ${t}
    </section>
    <p class="pikk-updates-note">A refresh reloads this browser's app bundle; it does not clear your account or local demo data. If a change still does not appear, compare the version above with the published source commit.</p>
  `,{lead:"A clear record of recent PIKK improvements."})}function Up(e){var t;(t=e.querySelector("#pikkUpdatesRefresh"))==null||t.addEventListener("click",()=>{window.location.assign(Yn(window.location.href))})}const Hp=20*60,zp=250*1024*1024;function Wp({duration:e,size:t,type:s}){return s!=null&&s.startsWith("video/")?!Number.isFinite(t)||t<=0||t>zp?"Video must be under 250 MB for this device-local preview.":!Number.isFinite(e)||e<=0?"Unable to read video duration. Try another file.":e>Hp?"PIKKUP Phase 1 videos must be 20 minutes or shorter.":"":"Select a supported video file."}function Yp(e){return new Promise((t,s)=>{const i=URL.createObjectURL(e),a=document.createElement("video");let n=!1;const o=setTimeout(()=>r(new Error("Video metadata timed out")),12e3);function r(d,c){n||(n=!0,clearTimeout(o),a.removeAttribute("src"),a.load(),URL.revokeObjectURL(i),d?s(d):t(c))}a.preload="metadata",a.onloadedmetadata=()=>r(null,a.duration),a.onerror=()=>r(new Error("Cannot read this video file")),a.src=i})}const xo=[{id:"song",label:"Song",acceptCover:"image/*",acceptMedia:"audio/*,.mp3,.m4a,.wav,.aac"},{id:"album",label:"Album",acceptCover:"image/*",acceptMedia:"audio/*,.mp3,.m4a,.wav,.aac"},{id:"video",label:"Video",acceptCover:"image/*",acceptMedia:"video/*,.mp4,.mov,.webm"},{id:"picture",label:"Picture",acceptCover:"image/*",acceptMedia:"image/*"}];function Jp(e){return _("Admin",`<div class="card admin-gate">
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
    <div class="card muted">Full team roles, revenue, and moderation ship later phases.</div>`,{lead:"Gated demo dashboard."})}function Qp(){return`
  <section class="card admin-add" id="adminAdd">
    <h3>Add Content</h3>
    <p class="muted admin-add-note">PIKKUP preview: video uploads must be 20 minutes or shorter and at most 250 MB. Device-local only, not public hosting. TEST MODE · no backend. Metadata → <code>localStorage dbs_v1.catalog</code>. Files → IndexedDB <code>dbs_media_v1</code>. Works on iPhone Safari &amp; desktop. Large files stay on this device only.</p>

    <div class="admin-type-tabs" role="tablist" aria-label="Content type">${xo.map((t,s)=>`<button type="button" class="admin-type-tab${s===0?" on":""}" data-type="${l(t.id)}" role="tab">${l(t.label)}</button>`).join("")}</div>

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
  </section>`}function Xp(e){if(!e.length)return'<div class="card admin-catalog"><h3>Catalog</h3><p class="muted">No admin-added items yet.</p></div>';const t=e.map(s=>{const i=s.coverRef&&!s.coverRef.startsWith("idb:")?l(s.coverRef):"";return`<div class="admin-catalog-row" data-id="${l(s.id)}">
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
    <div class="admin-catalog-list">${t}</div></div>`}function _e(e){return"$"+(Number(e)||0).toFixed(2)}function Zp(e){var a,n,o;const t=((a=e.openMic)==null?void 0:a.pending)||[],s=((n=e.openMic)==null?void 0:n.byStatus)||{},i=t.length?t.map(r=>`<div class="row wrap admin-om-row" data-om-id="${l(r.id)}">
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
  </section>`}function eu(e){const t=e.fanClubs||{total:0,recent:[]},s=t.recent.length?`<ul class="list-plain">${t.recent.map(i=>`<li><span><strong>${l(i.name)}</strong> · ${l(i.privacy)}${i.official?" · official":""}</span><span class="muted">${i.memberCount} members</span></li>`).join("")}</ul>`:'<p class="muted">No clubs yet.</p>';return`<section class="card admin-fanclubs" id="adminFanClubs">
    <h3>Fan Clubs glance</h3>
    <div class="stats">
      <div><strong>${t.total}</strong><span>Clubs</span></div>
    </div>
    ${s}
    <p class="admin-panel-links"><a class="btn" href="#/fanclubs">Open Fan Clubs</a></p>
  </section>`}function tu(e){const t=e.loyalty||{},s=(t.badges||[]).slice(0,6).map(i=>`<span class="chip">${l(i)}</span>`).join(" ")||'<span class="muted">None unlocked</span>';return`<section class="card admin-loyalty" id="adminLoyalty">
    <h3>Loyalty glance</h3>
    <p class="muted">${l(t.note||"Device-local loyalty")}</p>
    <div class="stats">
      <div><strong>${t.points||0}</strong><span>Points</span></div>
      <div><strong>${t.badgeCount||0}</strong><span>Badges</span></div>
      <div><strong>${t.historyCount||0}</strong><span>Actions</span></div>
    </div>
    <p class="admin-badge-row">${s}</p>
    <p class="admin-panel-links"><a class="btn" href="#/loyalty">Open Loyalty Club</a></p>
  </section>`}function su(){return`<section class="card admin-quicklinks" id="adminQuickLinks">
    <h3>Quick links</h3>
    <p class="muted">Deep-links only · page ownership stays with Live Social / Commerce / Build.</p>
    ${[{owner:"Live Social",links:[["#/live","Live"],["#/messages","Messages"],["#/giftbattles","Gift battles"],["#/multiguest","Multi-guest"],["#/spotlight","Spotlight"],["#/restream","Restream"],["#/connect","Connect"]]},{owner:"Commerce",links:[["#/marketplace","Marketplace"],["#/wallet","Wallet"],["#/earnings","Earnings"],["#/missions","Missions"],["#/share","Share & Earn"],["#/refer","Refer & Earn"]]},{owner:"Build",links:[["#/explore","Explore"],["#/notifications","Notifications"],["#/fanclubs","Fan Clubs"],["#/loyalty","Loyalty"],["#/openmic","Open Mic"]]}].map(s=>{const i=s.links.map(([a,n])=>`<a class="btn ghost admin-qlink" href="${a}">${l(n)}</a>`).join("");return`<div class="admin-ql-group"><span class="chip">${l(s.owner)}</span><div class="admin-ql-row">${i}</div></div>`}).join("")}
  </section>`}function iu(e){const t=e.revenue||{},s=(t.byCategory||[]).map(i=>`<li><span>${l(i.label||i.category)} ×${i.count}</span><span class="muted">gross ${_e(i.gross)} · creator ${_e(i.creatorShare)} · PIKK ${_e(i.dbsShare)}</span></li>`).join("");return`<section class="card admin-revenue" id="adminRevenue">
    <h3>Revenue / analytics shell</h3>
    <div class="row wrap" style="gap:8px;margin-bottom:8px">
      <span class="chip">TEST MODE</span>
      <span class="chip">${l(t.chip||"demo figures · not production")}</span>
    </div>
    <div class="stats">
      <div><strong>${_e(t.gross)}</strong><span>Gross</span></div>
      <div><strong>${_e(t.fees)}</strong><span>Fees</span></div>
      <div><strong>${_e(t.creatorShare)}</strong><span>Creator net</span></div>
      <div><strong>${_e(t.dbsShare)}</strong><span>PIKK net</span></div>
    </div>
    <p class="muted">Creator available ${_e(t.creatorAvailable)} · holds ${_e(t.creatorHolds)} · fan wallet ${_e(t.fanWalletBalance)} · catalog ${t.catalogPublished||0}/${t.catalogTotal||0} published · earning lines ${t.earnCount||0}</p>
    ${s?`<ul class="list-plain">${s}</ul>`:'<p class="muted">No creator earnings in store yet — open Wallet / Earnings (Commerce) to seed demos.</p>'}
    <p class="admin-panel-links">
      <a class="btn" href="#/wallet">Wallet</a>
      <a class="btn" href="#/earnings">Earnings</a>
    </p>
  </section>`}function au(e){Ts(),Be();const t=hn({openOnly:!0}),s=hn({openOnly:!1}).length,i=e.hotFeed||{},a=t.length?t.slice(0,12).map(n=>{const o=n.kind==="live"?'<span class="chip">live</span>':'<span class="chip">post</span>',r=n.kind==="live"?` · viewers ${n.viewers??"—"} · gifts ${n.gifts??"—"}`:` · score ${n.score??0}`,d=n.kind==="post"?`<button type="button" class="btn primary admin-ea-like" data-ref="${l(n.refId)}" data-alert="${l(n.id)}">Like</button>
                 <button type="button" class="btn ghost admin-ea-comment" data-ref="${l(n.refId)}" data-alert="${l(n.id)}">Comment</button>
                 <button type="button" class="btn ghost admin-ea-share" data-ref="${l(n.refId)}" data-alert="${l(n.id)}">Share</button>`:'<a class="btn ghost" href="#/live">Open Live</a>';return`<div class="admin-ea-row" data-alert-id="${l(n.id)}">
            <div class="admin-ea-main">
              <strong>${l(n.username||"creator")}</strong> ${o}
              <div class="muted">${l(n.title||"")}${r}</div>
            </div>
            <div class="admin-ea-actions row wrap">
              ${d}
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
  </section>`}function nu(e){const t=e.moderation||{};return`<section class="card admin-moderation" id="adminModeration">
    <h3>Moderation stub</h3>
    <p class="muted">${l(t.note||"Stub")}</p>
    <div class="stats">
      <div><strong>${(t.warnings||[]).length}</strong><span>Warnings</span></div>
      <div><strong>${(t.suspensions||[]).length}</strong><span>Suspensions</span></div>
    </div>
    <p class="muted">Empty-state · no enforcement actions stored yet.</p>
    <p class="admin-panel-links"><a class="btn" href="#/guidelines">Community Guidelines</a></p>
  </section>`}function ru(){var d;const e=Ke(),{posts:t,clipperApps:s,user:i}=D();if(((d=e.query)==null?void 0:d.admin)==="1"&&i&&i.role!=="admin"&&ws(!0),!ie())return Jp(i);Ut(),Fe(),Ts();const a=ar(),n=Nd(),o=a.clipperByStatus,r=wt({includeUnpublishedForAdmin:!0});return _("Admin",`<div class="card admin-header">
      <div class="row wrap">
        <span class="chip">TEST MODE</span>
        <span class="chip">role=admin</span>
        <span class="spacer muted">Signed in as <strong>${l(i.username)}</strong></span>
        <button class="btn ghost" id="adminRevoke">Revoke admin</button>
      </div>
      <p class="muted admin-gate-hint">Gate: Profile toggle or <code>?admin=1</code> → <code>user.role='admin'</code> in <code>dbs_v1</code>. Phase 2 panels deep-link to owner pages.</p>
    </div>

    ${su()}
    ${au(n)}
    ${Zp(n)}
    ${eu(n)}
    ${tu(n)}
    ${iu(n)}
    ${nu(n)}

    ${Qp()}
    ${Xp(r)}

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
      <ul class="list-plain">${t.slice(0,20).map(c=>`<li><span>${l(c.username)}: ${l((c.text||"").slice(0,48))}</span><span class="muted">${new Date(c.at).toLocaleDateString()}</span></li>`).join("")||'<li class="muted">None</li>'}</ul>
      <a class="btn" href="#/posts">Open Posts</a>
    </div>

    <div class="card admin-clippers"><h3>Clipper applications (${s.length})</h3>
      ${s.length?s.map(c=>`<div class="row wrap admin-clip-row">
                     <span class="spacer">${l(c.name)} · ${l(c.email)} <span class="chip">${l(c.status)}</span></span>
                     <button class="btn primary admin-clip" data-id="${l(c.id)}" data-status="approved">Approve</button>
                     <button class="btn ghost admin-clip" data-id="${l(c.id)}" data-status="waitlisted">Waitlist</button>
                     <button class="btn ghost admin-clip" data-id="${l(c.id)}" data-status="rejected">Reject</button>
                   </div>`).join(""):'<p class="muted">None yet — submit via <a href="#/clippers">Clippers</a>.</p>'}</div>`,{lead:"Phase 2 controls · Add Content · Clippers · catalog."})}async function xn(e){if(!e)return"";const t=Ap("media");return await xp(t,e,{name:e.name,mime:e.type}),"idb:"+t}function En(e){if(!e)return"";try{const t=new URL(e);let s=t.searchParams.get("v");return!s&&t.hostname.includes("youtu.be")&&(s=t.pathname.slice(1)),!s&&t.pathname.startsWith("/embed/")&&(s=t.pathname.split("/")[2]),s?`https://www.youtube.com/embed/${s}`:""}catch{return""}}function ou(e){var a,n;(a=e.querySelector("#adminRevoke"))==null||a.addEventListener("click",()=>{ws(!1),h("Admin revoked"),R("#/admin")}),e.querySelectorAll(".admin-clip").forEach(o=>{o.addEventListener("click",()=>{ir(o.dataset.id,o.dataset.status),h("Clipper "+o.dataset.status),R("#/admin")})}),e.querySelectorAll(".admin-om").forEach(o=>{o.addEventListener("click",()=>{const r=Zi(o.dataset.id,o.dataset.status,o.dataset.status==="rejected"?"Admin reject":"");if(r!=null&&r.error){h(r.error==="admin"?"Admin required":"Open Mic update failed");return}h(o.dataset.status==="approved"?"Open Mic approved":"Open Mic rejected"),R("#/admin")})}),e.querySelectorAll(".admin-ea-like").forEach(o=>{o.addEventListener("click",()=>{const r=Xd(o.dataset.ref);if(r!=null&&r.error)return h(r.error==="admin"?"Admin required":"Like failed");o.dataset.alert&&Is(o.dataset.alert,"liked"),h("Liked · TEST MODE"),R("#/admin")})}),e.querySelectorAll(".admin-ea-comment").forEach(o=>{o.addEventListener("click",()=>{const r=Zd(o.dataset.ref,"🔥 PIKK team — keep it up! (TEST MODE)");if(r!=null&&r.error)return h(r.error==="admin"?"Admin required":"Comment failed");o.dataset.alert&&Is(o.dataset.alert,"commented"),h("Comment posted · TEST MODE"),R("#/admin")})}),e.querySelectorAll(".admin-ea-share").forEach(o=>{o.addEventListener("click",async()=>{var c;const r=ep(o.dataset.ref);if(r!=null&&r.error)return h(r.error==="admin"?"Admin required":"Share failed");const d=`${location.origin}${location.pathname}#/posts?focus=${encodeURIComponent(o.dataset.ref)}`;try{(c=navigator.clipboard)!=null&&c.writeText&&await navigator.clipboard.writeText(d),h("Link copied · share +1 (TEST MODE)")}catch{h("Share +1 (TEST MODE)")}o.dataset.alert&&Is(o.dataset.alert,"shared"),R("#/admin")})}),e.querySelectorAll(".admin-ea-handle").forEach(o=>{o.addEventListener("click",()=>{const r=Is(o.dataset.alert,"handled");if(r!=null&&r.error)return h("Could not mark handled");h("Alert handled"),R("#/admin")})}),e.querySelectorAll("img[data-idb-src]").forEach(async o=>{const r=o.getAttribute("data-idb-src");if(!r)return;const d=await Ei(r);d&&(o.src=d,o.classList.remove("idb-pending"))});const t=e.querySelector("#adminType"),s=e.querySelector("#adminMediaFile"),i=e.querySelector("#adminCoverFile");e.querySelectorAll(".admin-type-tab").forEach(o=>{o.addEventListener("click",()=>{e.querySelectorAll(".admin-type-tab").forEach(m=>m.classList.remove("on")),o.classList.add("on");const r=o.dataset.type;t&&(t.value=r);const d=xo.find(m=>m.id===r);d&&s&&(s.accept=d.acceptMedia),d&&i&&(i.accept=d.acceptCover);const c=e.querySelector("#adminMediaLabel");c&&(c.textContent=r==="picture"?"Picture file (or use cover only)":r==="video"?"Video file (optional if YouTube link set)":"Audio / media file (optional)");const p=e.querySelector("#adminStreamingFields");p&&(p.style.display=r==="song"||r==="album"?"":"none")})}),e.querySelectorAll(".admin-dropzone").forEach(o=>{const r=o.querySelector(".admin-file-input"),d=o.querySelector(".admin-file-name");o.addEventListener("click",c=>{c.target!==r&&(r==null||r.click())}),o.addEventListener("keydown",c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),r==null||r.click())}),r==null||r.addEventListener("change",()=>{var p;const c=(p=r.files)==null?void 0:p[0];d&&(d.textContent=c?`${c.name} · ${(c.size/1024/1024).toFixed(2)} MB`:"")}),o.addEventListener("dragover",c=>{c.preventDefault(),o.classList.add("drag")}),o.addEventListener("dragleave",()=>o.classList.remove("drag")),o.addEventListener("drop",c=>{var g,f;c.preventDefault(),o.classList.remove("drag");const p=(f=(g=c.dataTransfer)==null?void 0:g.files)==null?void 0:f[0];if(!p||!r)return;const m=new DataTransfer;m.items.add(p),r.files=m.files,r.dispatchEvent(new Event("change"))})}),(n=e.querySelector("#adminAddForm"))==null||n.addEventListener("submit",async o=>{var A,w,P,C,B,x,Q,T,O,H,K,M,I,q,V,Y,G,z,Se,Ee,Ge,Ve,ct,dt,pt,ut;o.preventDefault();const r=e.querySelector("#adminAddStatus"),d=e.querySelector("#adminSave"),c=(w=(A=e.querySelector("#adminTitle"))==null?void 0:A.value)==null?void 0:w.trim(),p=((C=(P=e.querySelector("#adminArtist"))==null?void 0:P.value)==null?void 0:C.trim())||"DatBoiSkeet",m=((B=e.querySelector("#adminType"))==null?void 0:B.value)||"song",g=((Q=(x=e.querySelector("#adminCoverUrl"))==null?void 0:x.value)==null?void 0:Q.trim())||"",f=((O=(T=e.querySelector("#adminMediaUrl"))==null?void 0:T.value)==null?void 0:O.trim())||"",b=((K=(H=e.querySelector("#adminYoutube"))==null?void 0:H.value)==null?void 0:K.trim())||"",k={spotify:((I=(M=e.querySelector("#adminSpotify"))==null?void 0:M.value)==null?void 0:I.trim())||"",apple:((V=(q=e.querySelector("#adminApple"))==null?void 0:q.value)==null?void 0:V.trim())||"",youtubeMusic:((G=(Y=e.querySelector("#adminYtm"))==null?void 0:Y.value)==null?void 0:G.trim())||"",tidal:((Se=(z=e.querySelector("#adminTidal"))==null?void 0:z.value)==null?void 0:Se.trim())||"",amazon:((Ge=(Ee=e.querySelector("#adminAmazon"))==null?void 0:Ee.value)==null?void 0:Ge.trim())||"",youtube:b||""},v=!!((Ve=e.querySelector("#adminPublished"))!=null&&Ve.checked),S=(dt=(ct=e.querySelector("#adminCoverFile"))==null?void 0:ct.files)==null?void 0:dt[0],$=(ut=(pt=e.querySelector("#adminMediaFile"))==null?void 0:pt.files)==null?void 0:ut[0];if(!c){h("Title required");return}if(m==="video"&&$)try{const te=await Yp($),ye=Wp({duration:te,size:$.size,type:$.type});if(ye){h(ye),r&&(r.textContent=ye);return}}catch{const te="Could not verify video duration. Upload canceled.";h(te),r&&(r.textContent=te);return}d&&(d.disabled=!0),r&&(r.textContent="Saving… (large files may take a moment on iPhone)");try{let te=g,ye=f;S&&(te=await xn(S)),$&&(ye=await xn($)),m==="picture"&&!te&&ye&&(te=ye);const Pe=fl({type:m,title:c,artist:p,coverRef:te,mediaRef:ye,youtube:b,streamingLinks:m==="song"||m==="album"?k:{},published:v,embed:En(b)});if(Pe!=null&&Pe.error){h(Pe.error==="forbidden"?"Admin required":"Could not save"),r&&(r.textContent=""),d&&(d.disabled=!1);return}b&&Pe.id&&rr(Pe.id,{embed:En(b)}),h(v?"Published to catalog":"Saved as draft"),R("#/admin")}catch(te){console.error(te),h("Save failed — file may be too large for this browser"),r&&(r.textContent=String((te==null?void 0:te.message)||te)),d&&(d.disabled=!1)}}),e.querySelectorAll(".admin-cat-pub").forEach(o=>{o.addEventListener("click",()=>{vl(o.dataset.id,o.dataset.on==="1"),h(o.dataset.on==="1"?"Published":"Unpublished"),R("#/admin")})}),e.querySelectorAll(".admin-cat-del").forEach(o=>{o.addEventListener("click",()=>{confirm("Delete this catalog item?")&&(bl(o.dataset.id),h("Deleted"),R("#/admin"))})})}function Dt(){R("#/posts")}function lu(){Ts();const e=io(8);return e.length?`<section class="card hot-strip" id="hotStrip">
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
    </section>`}function cu(e){var S,$,A,w,P;const{posts:t,likes:s,comments:i,user:a,postShares:n}=D(),o=((S=e==null?void 0:e.query)==null?void 0:S.tab)==="following"?"following":"discover",r=(($=e==null?void 0:e.query)==null?void 0:$.focus)||"",d=new Set((a==null?void 0:a.following)||[]),c=o==="following"&&a?t.filter(C=>d.has(C.userId)||C.userId===a.id):t,p=Qo.map(C=>`<button type="button" class="chip preset-img" data-src="${l(C.src)}" title="${l(C.label)}">${l(C.label)}</button>`).join(""),m=((A=e==null?void 0:e.query)==null?void 0:A.compose)==="1"||((w=e==null?void 0:e.query)==null?void 0:w.type),g=["text","picture","short","video"].includes((P=e==null?void 0:e.query)==null?void 0:P.type)?e.query.type:"",f=a?`
    <div class="card post-create" id="composer">
      <h3>Create</h3>
      <p class="muted" style="margin:0 0 10px">Pick what you’re posting — not separate tabs.</p>
      <div class="post-type-picker" role="group" aria-label="Post type">
        <button type="button" class="post-type-btn${g==="text"?" on":""}" data-type="text">
          <span class="post-type-ico" aria-hidden="true">Aa</span>
          <strong>Text</strong>
          <span class="muted">Words only</span>
        </button>
        <button type="button" class="post-type-btn${g==="picture"?" on":""}" data-type="picture">
          <span class="post-type-ico" aria-hidden="true">🖼</span>
          <strong>Picture</strong>
          <span class="muted">Photo / still</span>
        </button>
        <button type="button" class="post-type-btn${g==="short"?" on":""}" data-type="short">
          <span class="post-type-ico" aria-hidden="true">▶</span>
          <strong>Short</strong>
          <span class="muted">Vertical clip</span>
        </button>
        <button type="button" class="post-type-btn${g==="video"?" on":""}" data-type="video">
          <span class="post-type-ico" aria-hidden="true">🎬</span>
          <strong>Video</strong>
          <span class="muted">Full video</span>
        </button>
      </div>
      <div class="post-compose-body${g||m?"":" is-collapsed"}" id="postComposeBody" ${g?"":"hidden"}>
        <input type="hidden" id="postType" value="${l(g||"picture")}" />
        <p class="chip" id="postTypeChip">${l((g||"picture").charAt(0).toUpperCase()+(g||"picture").slice(1))} post</p>
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
       <a class="btn primary" href="#/profile">Sign in</a></div>`,b=`
    <div class="row wrap" style="margin-bottom:12px;gap:8px">
      <a class="btn ${o==="discover"?"primary":"ghost"}" href="#/posts">Discover</a>
      <a class="btn ${o==="following"?"primary":"ghost"}" href="#/posts?tab=following">Following</a>
      <a class="btn ghost" href="#/profile/dbs">@DatBoiSkeet</a>
    </div>`,k=c.map(C=>{const B=s[C.id]||[],x=a&&B.includes(a.id),Q=i[C.id]||[],T=n&&n[C.id]||0,O=$i(C.id),H=a&&d.has(C.userId),K=r&&r===C.id?" post-focus":"",M=a&&C.userId!==a.id?`<button class="btn ghost follow-btn" data-uid="${l(C.userId)}" data-on="${H?"1":"0"}">${H?"Following":"Follow"}</button>`:"",I=C.userId==="dbs"?'<span class="chip">house</span>':'<span class="chip">community</span>',q=C.mediaType||(C.image?"picture":"text"),V=q==="short"?'<span class="chip">Short</span>':q==="video"?'<span class="chip">Video</span>':q==="picture"||q==="image"?'<span class="chip">Picture</span>':q==="text"?'<span class="chip">Text</span>':"",Y=(()=>{const G=(C.mediaUrl||C.image||"").trim();if(!G)return"";if(q==="short"||q==="video"){const z=/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{6,})/i.exec(G);if(z)return`<div class="media media-video"><iframe src="https://www.youtube.com/embed/${z[1]}?rel=0" title="post video" allowfullscreen loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>`;if(G.startsWith("http")||G.endsWith(".mp4")||G.endsWith(".webm"))return`<video class="media" src="${l(G)}" controls playsinline preload="metadata"></video>`}return`<img class="media" src="${l(G)}" alt="" loading="lazy" />`})();return`
      <article class="post${K}" data-id="${l(C.id)}" id="post-${l(C.id)}">
        <div class="meta">
          <a class="avatar" href="#/profile/${l(C.userId)}">${l((C.username||"?")[0].toUpperCase())}</a>
          <div class="spacer">
            <div class="who"><a href="#/profile/${l(C.userId)}">${l(C.username)}</a> ${I}${V}</div>
            <div class="when">${F(C.at)}${O>=5?` · <span class="hot-inline">🔥 ${O}</span>`:""}</div>
          </div>
          ${M}
        </div>
        <p class="body-text">${l(C.text)}</p>
        ${Y}
        <div class="post-actions">
          <button class="btn like-btn ${x?"primary":""}" data-id="${l(C.id)}">
            ♥ ${B.length}
          </button>
          <button class="btn ghost comment-toggle" data-id="${l(C.id)}">💬 ${Q.length}</button>
          <button class="btn ghost share-btn" data-id="${l(C.id)}" title="Share (demo count)">↗ ${T}</button>
        </div>
        <div class="comments" id="c-${l(C.id)}" hidden>
          ${Q.map(G=>`<div class="comment"><b>${l(G.username)}</b> ${l(G.text)}</div>`).join("")||'<div class="muted">No comments yet</div>'}
          ${a?`<div class="row" style="margin-top:8px">
                  <input class="c-input" data-id="${l(C.id)}" placeholder="Add a comment…" style="flex:1;background:#0e0e14;border:1px solid var(--line);border-radius:12px;padding:8px 10px" />
                  <button class="btn primary c-send" data-id="${l(C.id)}">Send</button>
                </div>`:""}
        </div>
      </article>`}).join(""),v=o==="following"?'<div class="card muted">No posts from people you follow yet. Discover feed has official drops.</div>':'<div class="card muted">No posts yet.</div>';return _("Posts",lu()+f+b+(k||v),{lead:"Post Text, a Picture, Short, or Video · Shorts live here (not separate tabs) · Hot strip ranks engagement."})}function du(e){var d;const t=e.querySelector(".post-focus");if(t)try{t.scrollIntoView({behavior:"smooth",block:"center"})}catch{}else typeof location<"u"&&(location.hash.includes("compose=1")||location.hash.includes("type="))&&setTimeout(()=>{var c;return(c=e.querySelector("#composer"))==null?void 0:c.scrollIntoView({behavior:"smooth",block:"start"})},50);const s=e.querySelector("#postComposeBody"),i=e.querySelector("#postType"),a=e.querySelector("#postTypeChip"),n=e.querySelector("#postMediaLabel"),o=e.querySelector("#postPresets");function r(c){const p=c||"picture";e.querySelectorAll(".post-type-btn").forEach(b=>b.classList.toggle("on",b.dataset.type===p)),i&&(i.value=p),a&&(a.textContent=p.charAt(0).toUpperCase()+p.slice(1)+" post");const m=e.querySelector("#postMediaField"),g=e.querySelector("#postMediaNote"),f=p==="text";m&&(m.hidden=f),g&&(g.hidden=f),n&&!f&&(n.textContent=p==="short"?"Short clip link (YouTube / demo path)":p==="video"?"Video link (YouTube / demo path)":"Picture link (demo path)"),o&&(o.hidden=p!=="picture"),s&&(s.hidden=!1,s.classList.remove("is-collapsed"))}e.querySelectorAll(".post-type-btn").forEach(c=>{c.addEventListener("click",()=>r(c.dataset.type))}),i!=null&&i.value&&r(i.value),e.querySelectorAll(".preset-img").forEach(c=>{c.addEventListener("click",()=>{const p=e.querySelector("#postImg");p&&(p.value=c.dataset.src||""),h("Picture selected")})}),(d=e.querySelector("#postSubmit"))==null||d.addEventListener("click",()=>{var c,p;try{const m=(c=e.querySelector("#postText"))==null?void 0:c.value,g=(i==null?void 0:i.value)||"picture",f=(((p=e.querySelector("#postImg"))==null?void 0:p.value)||"").trim();if(g==="text"){if(!(m!=null&&m.trim()))return h("Write some words for a Text post");en({text:m.trim(),mediaType:"text"}),h("Text posted"),Dt();return}if(!(m!=null&&m.trim())&&!f)return h("Add a caption or media");if((g==="short"||g==="video")&&!f)return h("Add a "+g+" link (TEST MODE)");en({text:m||(g==="picture"?"Photo":g==="short"?"Short":"Video"),image:g==="picture"?f:"",mediaType:g,mediaUrl:f}),h(g.charAt(0).toUpperCase()+g.slice(1)+" posted"),Dt()}catch(m){h(m.message||"Could not post")}}),e.querySelectorAll(".like-btn").forEach(c=>{c.addEventListener("click",()=>{if(dl(c.dataset.id).error)return h("Sign in to like");Dt()})}),e.querySelectorAll(".comment-toggle").forEach(c=>{c.addEventListener("click",()=>{const p=e.querySelector("#c-"+c.dataset.id);p&&(p.hidden=!p.hidden)})}),e.querySelectorAll(".c-send").forEach(c=>{c.addEventListener("click",()=>{var b;const p=c.dataset.id,m=e.querySelector(`.c-input[data-id="${p}"]`),g=(b=m==null?void 0:m.value)==null?void 0:b.trim();if(!g)return;if(pl(p,g).error)return h("Sign in to comment");h("Comment added"),Dt()})}),e.querySelectorAll(".share-btn").forEach(c=>{c.addEventListener("click",async()=>{var f;const p=c.dataset.id;if(ao(p).error)return h("Could not share");const g=`${location.origin}${location.pathname}#/posts?focus=${encodeURIComponent(p)}`;try{(f=navigator.clipboard)!=null&&f.writeText&&await navigator.clipboard.writeText(g),h("Shared · link copied (TEST MODE)")}catch{h("Shared · count +1 (TEST MODE)")}Dt()})}),e.querySelectorAll(".follow-btn").forEach(c=>{c.addEventListener("click",()=>{const p=c.dataset.uid,m=c.dataset.on==="1";if((m?di(p):ci(p)).error)return h("Sign in to follow");h(m?"Unfollowed":"Following"),Dt()})})}function An(e){R(e)}const ta={apple:"Apple Music",spotify:"Spotify",youtubeMusic:"YouTube Music",youtube:"YouTube",tidal:"Tidal",amazon:"Amazon Music"};function Eo(e){if(!e||typeof e!="object")return{};const t={};for(const s of Object.keys(ta)){const i=String(e[s]||"").trim();(i.startsWith("http://")||i.startsWith("https://"))&&(t[s]=i)}return t}function pu(e){const t=Eo(e),s=Object.keys(ta).filter(i=>t[i]);return s.length?s.map(i=>`<a class="btn stream-plat stream-plat-${l(i)}" href="${l(t[i])}" target="_blank" rel="noopener">${l(ta[i])}</a>`).join(""):'<span class="muted" style="font-size:12px">No platform links yet</span>'}function uu(e){try{const t=new URL(e);return t.protocol!=="https:"||t.hostname!=="music.apple.com"||!/^\/[a-z]{2}(?:-[a-z]{2})?\/(?:song|album)\//i.test(t.pathname)?"":"https://embed.music.apple.com"+t.pathname+t.search}catch{return""}}function ji(e){var o;const t=e.cover?`<img class="stream-cover" src="${l(e.cover)}" alt="${l(e.title)}" loading="lazy" referrerpolicy="no-referrer" />`:'<div class="stream-cover stream-cover-empty" aria-hidden="true">♪</div>',s=e.albumNote?`<div class="muted" style="font-size:11px">${l(e.albumNote)}</div>`:"",i=e.year?` · ${l(String(e.year))}`:"",a=uu((o=e.links)==null?void 0:o.apple),n=a?`<details class="apple-music-embed"><summary>▶ Play in PIKK · Apple Music</summary><iframe title="Apple Music player for ${l(e.title)}" src="${l(a)}" loading="lazy" allow="autoplay *; encrypted-media *; fullscreen *" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation" style="width:100%;height:175px;border:0;border-radius:12px"></iframe><small class="muted">Apple controls playback availability. Full listening may require Apple Music.</small></details>`:"";return`
    <article class="stream-release">
      ${t}
      <div class="stream-meta">
        <span class="chip">${l(e.type||"release")}</span>
        <strong>${l(e.title)}</strong>
        <div class="muted" style="font-size:12px">${l(e.artist||"DatBoiSkeet")}${i}</div>
        ${s}
        ${n}
        <div class="stream-plats">${pu(e.links)}</div>
      </div>
    </article>`}function Cn(e){return e==="inner"?"Inner Circle":e==="backstage"?"Backstage":e==="skeet+"?"Skeet+":"None"}function mu(e){return Yo.map(t=>{const s=t.tier==="backstage"||t.tier==="inner";return e&&Wi(s?"backstage":"skeet")?`
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
      </article>`}).join("")}function Tn(e={}){var A;const t=["songs","albums","beats","playlists","upload"].includes((A=e.query)==null?void 0:A.view)?e.query.view:"",{user:s}=D(),i=xt(),a=Wi("skeet"),n=new Set((s==null?void 0:s.purchasedTracks)||[]),o=It.map(w=>`
    <div class="cover-card" style="flex:0 0 160px">
      <span class="badge-cs">${l(w.status)}</span>
      <img src="${l(w.cover)}" alt="${l(w.title)}" style="width:160px;height:160px" />
      <div class="t">${l(w.title)}</div>
      <div class="muted" style="font-size:11px">${l(w.artist)}</div>
    </div>`).join(""),r=Xn.map(w=>{const P=w.id==="skeet"?"skeet+":w.id==="inner"?"inner":w.id,C=i===P;return`
    <div class="card" style="margin:0">
      <h3>${l(w.name)}</h3>
      <div class="price" style="font-size:22px;font-weight:900">$${w.price}<span class="muted" style="font-size:13px">/mo</span></div>
      <p class="muted">${l(w.blurb)}</p>
      ${s?C?`<button type="button" class="btn ghost block mem-toggle" data-tier="${l(w.id)}" data-on="1">Active · tap to cancel (demo)</button>`:`<button type="button" class="btn primary block mem-toggle" data-tier="${l(w.id)}" data-on="0">Join · TEST MODE</button>`:'<a class="btn primary block" href="#/profile">Sign in to join</a>'}
    </div>`}).join(""),d=Ja.filter(w=>n.has(w.id)),c=Ja.map(w=>{const P=n.has(w.id);return`
      <div class="card" style="margin:0;display:flex;gap:12px;align-items:center">
        <img src="${l(w.cover)}" alt="" style="width:72px;height:72px;border-radius:10px;object-fit:cover;flex:0 0 72px" />
        <div class="spacer">
          <strong>${l(w.title)}</strong>
          <div class="muted" style="font-size:12px">${l(w.artist)} · ${l(w.status)}</div>
          <div style="font-weight:800;margin-top:4px">$${w.price.toFixed(2)}</div>
        </div>
        ${s?P?'<span class="chip">In My Music</span>':`<button type="button" class="btn primary buy-track" data-id="${l(w.id)}">Buy · demo</button>`:'<a class="btn" href="#/profile">Sign in</a>'}
      </div>`}).join(""),p=wt({publishedOnly:!0,types:["song","album"]}),m=p.map(w=>{const P=Eo(w.streamingLinks||{});return Object.keys(P).length?{id:w.id,title:w.title,artist:w.artist,type:w.type||"song",cover:w.coverRef&&!String(w.coverRef).startsWith("idb:")?w.coverRef:"",links:P,fromAdmin:!0}:null}).filter(Boolean),g=[...tt,...m];let f="";if(t==="songs"||t==="albums"){const w=t==="albums",P=g.filter(C=>w?C.type==="album":C.type==="single"||C.type==="song");f=`<div class="card" id="music-focused-view">
      <h2>${w?"Albums":"Songs"}</h2>
      <p class="muted">Verified releases and available official listening links.</p>
      <div class="stream-grid">${P.map(ji).join("")||'<p class="muted">No releases listed in this category yet.</p>'}</div>
      <a class="btn ghost" href="#/music">Music overview</a>
    </div>`}else if(t==="playlists")f=`<div class="card" id="music-focused-view">
      <h2>Playlists</h2>
      <p class="muted">Official YouTube playlists open on YouTube. No rehosted audio.</p>
      <div class="row wrap" style="gap:8px">
        ${Hi.map(w=>`<a class="btn ghost" href="${l(w.youtube)}" target="_blank" rel="noopener">${l(w.title)}</a>`).join("")}
      </div>
      <a class="btn ghost" href="#/music">Music overview</a>
    </div>`;else if(t==="beats"||t==="upload"){const w=t==="upload";f=`<div class="card" id="music-focused-view">
      <h2>${w?"Upload Music":"Beats"}</h2>
      <p class="muted">Not available yet · TEST MODE. ${w?"Creator music uploads require secure storage, ownership verification and publishing tools.":"The producer beat marketplace and licensing checkout are still in development."}</p>
      <a class="btn ghost" href="#/music">Music overview</a>
    </div>`}const b=p.length?`<div class="card catalog-admin-music">
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
      </div>`:"",k=tt.find(w=>w.cover)||null,v=tt.filter(w=>w.cover).slice(0,5),$=`
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
        ${v.map(w=>`<a class="pikk-music-release-tile" href="#/music#stream-everywhere">
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
    ${b}


    <div class="card" id="youtube-mixes">
      <h2>YouTube Mixes · Channel</h2>
      <p class="muted">Dogs &amp; mixes stream from the <strong>original YouTube source</strong> (embeds / Play on YouTube). Not rehosted. Released catalog still uses Stream Everywhere below.</p>
      <div class="row wrap" style="gap:8px;margin:10px 0 14px">
        <a class="btn" href="${l(ue.youtube)}" target="_blank" rel="noopener">Official channel</a>
        <a class="btn ghost" href="${l(ue.youtubeHandle)}" target="_blank" rel="noopener">@DatBoiSkeet1</a>
        ${Hi.map(w=>`<a class="btn ghost" href="${l(w.youtube)}" target="_blank" rel="noopener">${l(w.title)}</a>`).join("")}
      </div>
      <div class="yt-mix-grid">
        ${ca.map(w=>`
          <article class="yt-mix-card">
            <div class="hero-video" style="margin:0 0 10px">
              <iframe src="${l(We(w.embed))}" title="${l(w.title)}" allowfullscreen loading="lazy"
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
        ${tt.map(ji).join("")}
        ${m.map(ji).join("")}
      </div>
      <p class="muted" style="margin-top:12px;font-size:12px">Tidal / Amazon Music omitted until official links are verified. Admin can add more via streaming link fields.</p>
    </div>

    <div class="card">
      <h2>My Music</h2>
      <p class="muted">Purchases stay here even if membership ends.</p>
      ${d.length?`<div class="cover-row">${d.map(w=>`
            <div class="cover-card" style="flex:0 0 120px">
              <img src="${l(w.cover)}" alt="${l(w.title)}" style="width:120px;height:120px" />
              <div class="t">${l(w.title)}</div>
              <div class="muted" style="font-size:11px">Owned · Coming Soon</div>
            </div>`).join("")}</div>`:'<p class="muted">Nothing purchased yet. Buy a Coming Soon cover below (demo · no charge).</p>'}
    </div>

    <div class="card">
      <h2>Buy (demo)</h2>
      <p class="muted">TEST MODE — no charges. Marks the cover as owned in My Music. Audio not available until release.</p>
      <div style="display:flex;flex-direction:column;gap:10px">${c}</div>
    </div>

    <div class="card" id="vault">
      <h2>Vault ${a?'<span class="chip" style="border-color:#2a4a3a;color:#8dffb0">Unlocked · '+l(Cn(i))+"</span>":'<span class="chip">Locked</span>'}</h2>
      <p class="muted">Exclusive unreleased tracks &amp; previews for members. Nested under Music — not a bottom-nav tab.</p>

      <div class="vault-grid" style="margin:12px 0">
        ${mu(a)}
      </div>

      ${a?`<div class="vault-lock" style="border-style:solid;border-color:#2a4a3a;color:var(--tx)">
              ✅ Membership active: <strong>${l(Cn(i))}</strong>. Exclusive cards above are unlocked.
              Cancel anytime with the tier button below (demo). Purchased My Music items are kept.
            </div>`:`<div class="vault-lock">
              🔒 Vault locked. Sign in, then tap <strong>Join · TEST MODE</strong> on Skeet+ or Backstage below.
              Locked cards show title/cover only — no exclusive content until you join.
            </div>`}

      <h3 style="margin:16px 0 8px">Membership (TEST MODE)</h3>
      <div class="grid-2">${r}</div>
    </div>

  `;return _("Music & Vault",$,{lead:"Singles, albums, Coming Soon, and member Vault."})}function Dn(e){const t=e.querySelector("#youtube-mixes")||e;xi(t),e.querySelectorAll(".mem-toggle").forEach(s=>{s.addEventListener("click",i=>{i.preventDefault();const a=s.dataset.on==="1",n=li(s.dataset.tier,!a);if(n!=null&&n.error)return h("Sign in required — open Profile first");h(a?"Membership cancelled (demo) · My Music purchases kept":`Joined ${s.dataset.tier} (TEST MODE) · Vault unlocked`),An("#/music"),setTimeout(()=>{var o;return(o=document.getElementById("vault"))==null?void 0:o.scrollIntoView({behavior:"smooth",block:"start"})},40)})}),e.querySelectorAll(".buy-track").forEach(s=>{s.addEventListener("click",i=>{i.preventDefault();const a=cl(s.dataset.id);if(a!=null&&a.error)return h("Sign in required");h("Added to My Music (demo · no charge)"),An("#/music")})}),e.querySelectorAll("[data-idb-src]").forEach(async s=>{const i=s.getAttribute("data-idb-src");if(!i)return;const a=await Ei(i);a&&(s.tagName==="IMG"||s.tagName==="AUDIO"||s.tagName==="VIDEO")&&(s.src=a)})}const Ba="pikk_ai_artists_local_drafts_v1",Ao=Object.freeze(["Fully AI-generated music","AI-assisted music with human performance","Human-made music with AI artwork only"]),hu="AI-generated or AI-assisted";function gu(e,t=Date.now()){const s=String(e.artist||"").trim().slice(0,80),i=String(e.track||"").trim().slice(0,120),a=String(e.creation||""),n=String(e.description||"").trim().slice(0,600),o=Number(e.price);if(!s||!i||!Ao.includes(a)||!e.confirmed)throw Error("Artist, title, creation type and honest AI disclosure are required.");if(!Number.isFinite(o)||o<0||o>100)throw Error("Preview price must be between $0 and $100.");return{id:"ai-draft-"+t+"-"+Math.random().toString(36).slice(2,8),artist:s,track:i,creation:a,description:n,price:o,createdAt:t,status:"Private local draft · not published",disclosure:hu}}function Ra(e){try{const t=JSON.parse(e.getItem(Ba)||"[]");return Array.isArray(t)?t.filter(s=>s&&typeof s.id=="string").slice(0,40):[]}catch{return[]}}function fu(e,t){const s=[t,...Ra(e)].slice(0,40);return e.setItem(Ba,JSON.stringify(s)),s}function vu(e,t){const s=Ra(e).filter(i=>i.id!==t);return e.setItem(Ba,JSON.stringify(s)),s}function bu(){const e=Ra(window.localStorage),t=e.length?e.map(s=>`<article class="card ai-artist-draft"><div class="row wrap"><strong>${l(s.track)}</strong><span class="chip">AI · ${l(s.creation)}</span></div><p class="muted">by ${l(s.artist)} · Preview price $${s.price.toFixed(2)}</p><p class="muted">${l(s.status)}</p><button type="button" class="btn ghost ai-artist-delete" data-id="${l(s.id)}">Delete draft</button></article>`).join(""):'<p class="muted">No AI music drafts saved on this device. This is not a public music catalog.</p>';return _("PIKK AI Artists",`
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
       <div class="field"><label for="aiCreationType">How was this made? *</label><select id="aiCreationType" name="creation">${Ao.map(s=>`<option value="${l(s)}">${l(s)}</option>`).join("")}</select></div>
       <div class="field"><label for="aiPreviewPrice">Planned purchase price in USD (preview only)</label><input id="aiPreviewPrice" name="price" type="number" min="0" max="100" step=".01" value="1.00" required /></div>
       <div class="field"><label for="aiDescription">Description (optional)</label><textarea id="aiDescription" name="description" maxlength="600"></textarea></div>
       <label class="ai-artist-certify"><input type="checkbox" id="aiArtistCertify" required /> I accurately disclosed the use of AI and confirm I hold or can obtain the necessary commercial rights, including voice and likeness permissions.</label>
       <button type="submit" class="btn primary">Save private AI music draft</button>
     </form>
    </section>
    <section class="card ai-artist-panel"><h3>My private drafts (${e.length})</h3><div class="ai-artist-drafts">${t}</div><p class="muted">A real AI Artist storefront, public discovery feed and licensed downloadable sales require backend, payments and rights verification.</p></section>
   </div>
  </div>`,{lead:"Dedicated AI music category · Disclosure first"})}function yu(e){var t;(t=e.querySelector("#aiArtistForm"))==null||t.addEventListener("submit",s=>{s.preventDefault();const i=s.currentTarget;try{const a=gu({artist:i.elements.artist.value,track:i.elements.track.value,creation:i.elements.creation.value,price:i.elements.price.value,description:i.elements.description.value,confirmed:e.querySelector("#aiArtistCertify").checked});fu(window.localStorage,a),h("Private AI artist draft saved · not published"),location.hash==="#/ai-artists"&&(location.hash="#/ai-artists?updated=1"),window.dispatchEvent(new HashChangeEvent("hashchange"))}catch(a){h(a.message)}}),e.querySelectorAll(".ai-artist-delete").forEach(s=>s.addEventListener("click",()=>{vu(window.localStorage,s.dataset.id),window.dispatchEvent(new HashChangeEvent("hashchange"))}))}const Ai="pikk_shield_intake_v1",ni=30,ja=Object.freeze(["Original creator","Licensed with permission","Authorized representative"]);function Ot(e){const t=String(e||"").trim();if(!t)return"";try{const s=new URL(t);return["https:","http:"].includes(s.protocol)?s.href:""}catch{return""}}function ku(e,t=Date.now()){const s=String(e.title||"").trim().slice(0,120),i=String(e.owner||"").trim().slice(0,100),a=String(e.rights||""),n=String(e.contact||"").trim().slice(0,180),o=String(e.notes||"").trim().slice(0,800),r=Ot(e.source);if(!s||!i||!n||!ja.includes(a)||!e.certified)throw new Error("Complete title, rights holder, contact, ownership basis and certification.");if(String(e.source||"").trim()&&!r)throw new Error("Use a valid http or https link.");return{id:"shield-"+t+"-"+Math.random().toString(36).slice(2,8),type:"rights-declaration",title:s,owner:i,rights:a,contact:n,notes:o,source:r,at:t,status:"Local draft — not submitted"}}function Rt(e){try{const t=JSON.parse(e.getItem(Ai)||"[]");return Array.isArray(t)?t.filter(s=>s&&s.type==="rights-declaration").slice(0,ni):[]}catch{return[]}}function wu(e,t){const s=[t,...Rt(e)].slice(0,ni);return e.setItem(Ai,JSON.stringify(s)),s}function Su(e,t){const s=Rt(e).filter(i=>i.id!==t);return e.setItem(Ai,JSON.stringify(s)),s}function $u(e){const t=Rt(e).map(s=>({id:String(s.id||""),type:"rights-declaration",title:String(s.title||""),owner:String(s.owner||""),rights:String(s.rights||""),contact:String(s.contact||""),notes:String(s.notes||""),source:Ot(s.source),at:Number.isFinite(s.at)?s.at:null,status:"Local draft — not submitted"}));return JSON.stringify({format:"PIKK Shield local rights drafts",version:1,drafts:t},null,2)}function xu(e,t){if(typeof t!="string"||t.length>65536)throw new Error("Backup file must be under 64 KB.");let s;try{s=JSON.parse(t)}catch{throw new Error("Invalid JSON backup file.")}if(!s||s.format!=="PIKK Shield local rights drafts"||s.version!==1||!Array.isArray(s.drafts)||s.drafts.length>ni)throw new Error("Not a supported PIKK Shield backup (maximum 30 drafts).");const i=s.drafts.map((d,c)=>{if(!d||typeof d!="object"||Array.isArray(d))throw new Error("Invalid draft in backup.");for(const p of["id","title","owner","rights","contact","notes","source"])if(typeof d[p]!="string")throw new Error("Invalid draft field: "+p);if(!/^shield-[a-zA-Z0-9-]{1,80}$/.test(d.id)||!d.title.trim()||d.title.length>120||!d.owner.trim()||d.owner.length>100||!ja.includes(d.rights)||!d.contact.trim()||d.contact.length>180||d.notes.length>800||d.source&&(!Ot(d.source)||Ot(d.source)!==d.source)||d.at!==null&&(!Number.isFinite(d.at)||d.at<0))throw new Error("Backup draft "+(c+1)+" contains invalid fields.");return{id:d.id,type:"rights-declaration",title:d.title.trim(),owner:d.owner.trim(),rights:d.rights,contact:d.contact.trim(),notes:d.notes,source:Ot(d.source),at:d.at??Date.now(),status:"Local draft — not submitted"}}),a=Rt(e),n=new Set(a.map(d=>d.id)),o=[];for(const d of i)n.has(d.id)||(n.add(d.id),o.push(d));const r=o.slice(0,Math.max(0,ni-a.length));return r.length&&e.setItem(Ai,JSON.stringify([...r,...a])),{added:r.length,duplicates:i.length-o.length,total:Rt(e).length}}const Eu=()=>Rt(window.localStorage);function Au(){const e=Eu(),t=e.length?e.map(s=>{const i=Ot(s.source);return`
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
    </article>`}).join(""):'<p class="muted">No rights declarations saved on this device.</p>';return _("PIKK Shield",`
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
            <div class="field"><label for="shieldRights">Rights basis *</label><select id="shieldRights" name="rights" required>${ja.map(s=>`<option value="${l(s)}">${l(s)}</option>`).join("")}</select></div>
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
    </div>`,{lead:"Rights declaration preview · No official copyright protection is active yet"})}function Cu(e){var a,n,o;(a=e.querySelector("#shieldForm"))==null||a.addEventListener("submit",r=>{r.preventDefault();const d=r.currentTarget;try{const c=ku({title:d.elements.title.value,owner:d.elements.owner.value,rights:d.elements.rights.value,contact:d.elements.contact.value,source:d.elements.source.value,notes:d.elements.notes.value,certified:e.querySelector("#shieldCertify").checked});wu(window.localStorage,c),h("Local rights draft saved — not submitted"),location.hash="#/shield?updated=1",window.dispatchEvent(new HashChangeEvent("hashchange"))}catch(c){h(c.message)}});const t=e.querySelector("#shieldImportFile");(n=e.querySelector("#shieldImportDrafts"))==null||n.addEventListener("click",()=>t==null?void 0:t.click()),t==null||t.addEventListener("change",async()=>{var d;const r=(d=t.files)==null?void 0:d[0];if(r)try{if(r.size>65536)throw new Error("Backup file must be under 64 KB.");const c=await r.text();if(!window.confirm("Restore PIKK Shield drafts from this file? Valid drafts will be merged into this browser, without replacing existing drafts."))return;const p=xu(window.localStorage,c);h(`Restored ${p.added} local draft(s); ${p.duplicates} already saved`),window.dispatchEvent(new HashChangeEvent("hashchange"))}catch(c){h(c.message||"Unable to restore backup")}finally{t.value=""}}),(o=e.querySelector("#shieldExportDrafts"))==null||o.addEventListener("click",()=>{const r=$u(window.localStorage),d=URL.createObjectURL(new Blob([r],{type:"application/json"})),c=document.createElement("a");c.href=d,c.download="pikk-shield-local-drafts.json",document.body.appendChild(c),c.click(),c.remove(),setTimeout(()=>URL.revokeObjectURL(d),1e3),h("Local backup downloaded — store it privately")});const s=e.querySelector("#shieldDraftSearch"),i=[...e.querySelectorAll(".shield-entry")];s==null||s.addEventListener("input",()=>{const r=s.value.trim().toLocaleLowerCase();let d=0;i.forEach(m=>{const g=m.dataset.shieldSearch.includes(r);m.hidden=!g,g&&d++});const c=e.querySelector("#shieldSearchCount");c&&(c.textContent=`Showing ${d} of ${i.length} drafts`);const p=e.querySelector("#shieldSearchEmpty");p&&(p.hidden=d!==0)}),e.querySelectorAll(".shield-delete").forEach(r=>r.addEventListener("click",()=>{var c,p;const d=((p=(c=r.closest(".shield-entry"))==null?void 0:c.querySelector("strong"))==null?void 0:p.textContent)||"this rights draft";window.confirm(`Delete local rights draft "${d}"? This cannot be undone.`)&&(Su(window.localStorage,r.dataset.id),h("Local draft deleted"),window.dispatchEvent(new HashChangeEvent("hashchange")))}))}function Tu(){const t=`
    <div class="card merch-hero">
      <p class="kicker">Physical merch</p>
      <h2 style="margin:0 0 8px">Foreign X-Change</h2>
      <p class="muted">All orders, sizes, shipping, and payment happen on
        <a class="fx-link" href="https://foreignx-change.com" target="_blank" rel="noopener">foreignx-change.com</a>
        — not inside PIKK. Product links open the shop homepage until verified per-item URLs are provided.</p>
      <a class="btn primary" href="https://foreignx-change.com" target="_blank" rel="noopener">Visit Foreign X-Change</a>
      <p class="merch-note" style="margin-top:10px">Hats $30 · Tees $65 · Jackets $200 · prices exclude shipping</p>
    </div>
    <div class="merch-grid">${Te.map(s=>`
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
  `;return _("Merch",t,{lead:"Foreign X-Change showcase · 10 products · external checkout only"})}function Du(e){e.querySelectorAll(".shop-link").forEach(r=>{r.addEventListener("click",()=>{h("TEST MODE — opening Foreign X-Change")})});const t=e.querySelector("#merchLightbox"),s=t==null?void 0:t.querySelector("img"),i=t==null?void 0:t.querySelector(".merch-lightbox-close");let a=null;const n=r=>{var d,c;!t||!s||!i||(a=r,s.src=((d=r.querySelector("img"))==null?void 0:d.currentSrc)||r.dataset.zoom,s.alt=((c=r.querySelector("img"))==null?void 0:c.alt)||"Product preview",t.classList.add("show"),t.setAttribute("aria-hidden","false"),i.focus())},o=()=>{t!=null&&t.classList.contains("show")&&(t.classList.remove("show"),t.setAttribute("aria-hidden","true"),s==null||s.removeAttribute("src"),a!=null&&a.isConnected&&a.focus(),a=null)};e.querySelectorAll(".img-wrap").forEach(r=>{const d=()=>n(r);r.addEventListener("click",d),r.addEventListener("keydown",c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),d())})}),t==null||t.addEventListener("click",o),t==null||t.addEventListener("keydown",r=>{r.key==="Escape"?(r.preventDefault(),o()):r.key==="Tab"&&(r.preventDefault(),i==null||i.focus())})}function Qt(e){R(e||"#/profile")}function Mn(e){return e.avatar?`<img class="avatar" src="${l(e.avatar)}" alt="" style="object-fit:cover" />`:`<div class="avatar">${l((e.username||"?")[0].toUpperCase())}</div>`}function qs(e,t){return t.length?`<div class="card"><h3>${l(e)}</h3>
    <ul class="list-plain">${t.map(s=>`<li><a href="#/profile/${l(s.id)}"><span>${l(s.username)}</span></a>
           <a class="chip" href="#/profile/${l(s.id)}">View</a></li>`).join("")}</ul></div>`:`<div class="card"><h3>${l(e)}</h3><p class="muted">None yet.</p></div>`}function Mu(e){var m,g;const t=((m=e==null?void 0:e.parts)==null?void 0:m[1])||null,{user:s,posts:i}=D(),a=!!(t&&s&&t===s.id&&((g=e==null?void 0:e.query)==null?void 0:g.view)==="public");if(!!t&&(!s||t!==s.id)||a){const f=St(t);if(!f)return _("Profile",`<div class="card muted">User not found.</div>
         <a class="btn" href="#/profile">Back</a>`);const b=i.filter(A=>A.userId===f.id),k=s&&!a&&(s.following||[]).includes(f.id),v=Za(f.id),S=zi(f.id),$=`
      <section class="pikk-profile-cover" aria-label="Public PIKK profile">
        <div class="pikk-profile-cover-inner">
          <span class="pikk-profile-cover-kicker">PIKK · CREATOR PROFILE</span>
          ${Mn(f)}
          <div>
            <h2 style="margin:0">${l(f.username)}${f.verified?" ✓":""}</h2>
            <p class="muted" style="margin:4px 0 0">${l(f.bio||"")}</p>
            ${f.verified?'<span class="chip">Verified</span>':""}
          </div>
        </div>
        <div class="stats pikk-profile-stats">
          <div><strong>${b.length}</strong><span>Posts</span></div>
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
        ${b.length?b.map(A=>`<div style="padding:8px 0;border-bottom:1px solid var(--line)">
                      <div class="muted" style="font-size:11px">${new Date(A.at).toLocaleString()}</div>
                      ${l(A.text)}
                      ${A.image?`<img src="${l(A.image)}" alt="" style="margin-top:8px;border-radius:12px;max-height:200px;object-fit:cover;width:100%" />`:""}
                    </div>`).join(""):'<p class="muted">No posts yet.</p>'}
      </div>
      ${qs("Followers",v)}
      ${qs("Following",S)}
    `;return _(f.username,$)}if(!s)return _("Profile",`
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
      </div>`,{lead:"Free PIKK fan profile · follow · posts · role apps · TEST MODE."});const o=i.filter(f=>f.userId===s.id),r=Za(s.id),d=zi(s.id),c=s.memberships||{},p=`
    <section class="pikk-profile-cover" aria-label="Your PIKK profile">
      <div class="pikk-profile-cover-inner">
        <span class="pikk-profile-cover-kicker">PIKK · MY PROFILE</span>
        ${Mn(s)}
        <div>
          <h2 style="margin:0">${l(s.username)}</h2>
          <p class="muted" style="margin:4px 0 0">${l(s.bio)}</p>
          <span class="chip">TEST MODE · demo</span>
          ${c.skeetPlus||c.backstage||c.innerCircle?`<span class="chip">${c.innerCircle?"Inner Circle":c.backstage?"Backstage":"Skeet+"}</span>`:""}
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

    ${qs("Followers",r)}
    ${qs("Following",d)}

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
        <span class="chip">${ie()?"role=admin":"role=fan"}</span>
        <button class="btn ${ie()?"ghost":"primary"}" id="toggleAdmin">${ie()?"Revoke admin":"Enable Demo Admin"}</button>
        <a class="btn" href="#/admin">Open Admin</a>
      </div>
    </div>
  `;return _("Profile",p)}function Lu(e){var t,s,i,a,n,o;(t=e.querySelector("#signinBtn"))==null||t.addEventListener("click",()=>{var d;const r=(d=e.querySelector("#signinName"))==null?void 0:d.value;jt(r),h("Signed in"),Qt("#/profile")}),(s=e.querySelector("#signinName"))==null||s.addEventListener("keydown",r=>{var d;r.key==="Enter"&&((d=e.querySelector("#signinBtn"))==null||d.click())}),(i=e.querySelector("#signoutBtn"))==null||i.addEventListener("click",()=>{ol(),h("Signed out"),Qt("#/profile")}),(a=e.querySelector("#saveProfile"))==null||a.addEventListener("click",()=>{var d,c;if(ll({bio:(d=e.querySelector("#editBio"))==null?void 0:d.value,avatar:(c=e.querySelector("#editAvatar"))==null?void 0:c.value}).error)return h("Sign in required");h("Profile saved"),Qt("#/profile")}),(n=e.querySelector("#pubFollow"))==null||n.addEventListener("click",r=>{const d=r.currentTarget,c=d.dataset.uid,p=d.dataset.on==="1";if((p?di(c):ci(c)).error)return h("Sign in to follow");h(p?"Unfollowed":"Following"),Qt("#/profile/"+c)}),(o=e.querySelector("#toggleAdmin"))==null||o.addEventListener("click",()=>{const r=!ie();if(ws(r).error)return h("Sign in required");h(r?"Demo Admin enabled":"Admin revoked"),Qt("#/profile")})}function Ln(){R("#/clippers")}const Iu={pending:"Pending",approved:"Approved",rejected:"Rejected",waitlisted:"Waitlisted"};function Pu(){const{clipperApps:e,user:t}=D(),s=e.length,i=e.filter(o=>o.status==="approved").length,a=e.filter(o=>o.status==="pending").length,n=`
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
                <span class="chip">${l(Iu[o.status]||o.status)}</span>
                <span class="muted spacer" style="text-align:right">${F(o.at)}</span>
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
  `;return _("Clippers",n,{lead:"Apply → admin approve → paid campaigns & tracked links."})}function _u(e){var t;(t=e.querySelector("#cSubmit"))==null||t.addEventListener("click",()=>{var a,n,o,r,d,c,p,m,g,f,b,k,v,S,$,A,w,P,C;const s=(n=(a=e.querySelector("#cName"))==null?void 0:a.value)==null?void 0:n.trim(),i=(r=(o=e.querySelector("#cEmail"))==null?void 0:o.value)==null?void 0:r.trim();if(!s||!i)return h("Name and email required");ul({name:s,email:i,age:(d=e.querySelector("#cAge"))==null?void 0:d.value,tiktok:(c=e.querySelector("#cTiktok"))==null?void 0:c.value,instagram:(p=e.querySelector("#cIg"))==null?void 0:p.value,youtube:(m=e.querySelector("#cYt"))==null?void 0:m.value,x:(g=e.querySelector("#cX"))==null?void 0:g.value,facebook:(f=e.querySelector("#cFb"))==null?void 0:f.value,followers:(b=e.querySelector("#cFollowers"))==null?void 0:b.value,views:(k=e.querySelector("#cViews"))==null?void 0:k.value,avgViews:(v=e.querySelector("#cAvgViews"))==null?void 0:v.value,engagement:(S=e.querySelector("#cEngage"))==null?void 0:S.value,frequency:($=e.querySelector("#cFreq"))==null?void 0:$.value,niche:(A=e.querySelector("#cNiche"))==null?void 0:A.value,samples:(w=e.querySelector("#cSamples"))==null?void 0:w.value,analyticsNotes:(P=e.querySelector("#cAnalytics"))==null?void 0:P.value,applicantUserId:((C=D().user)==null?void 0:C.id)||null}),h("Application saved for admin review"),Ln()}),e.querySelectorAll(".clip-status").forEach(s=>{s.addEventListener("click",()=>{ir(s.dataset.id,s.dataset.status),h("Marked "+s.dataset.status),Ln()})})}const Ou={rose:"🌹","big-love":"💖","turn-up":"🔥","cash-rain":"💵","bottle-pop":"🍾","money-gun":"💸","diamond-drip":"💎","foreign-whip":"🚗",helicopter:"🚁","private-jet":"✈️","dbs-crown":"👑","dbs-universe":"🌌","battle-win":"✅","battle-crown":"👑","battle-vs":"⚔️","battle-fire":"🔥"},qu={rose:"/gifts/rose.svg","big-love":"/gifts/big-love.svg","turn-up":"/gifts/turn-up.svg","cash-rain":"/gifts/cash-rain.svg","bottle-pop":"/gifts/bottle-pop.svg","money-gun":"/gifts/money-gun.svg","diamond-drip":"/gifts/diamond-drip.svg","foreign-whip":"/gifts/foreign-whip.svg",helicopter:"/gifts/helicopter.svg","private-jet":"/gifts/private-jet.svg","dbs-crown":"/gifts/dbs-crown.svg","dbs-universe":"/gifts/dbs-universe.svg","battle-win":"/gifts/battle-win.svg","battle-crown":"/gifts/battle-crown.svg","battle-vs":"/gifts/battle-vs.svg","battle-fire":"/gifts/battle-fire.svg"},In="gift-sticker";function Ns(e){return String(e??"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function Nu(e,t){return t&&typeof t=="object"&&t.className?t.className:`${In} ${In}--${e}`}function Fa(e,t={}){const s=String(e||""),i=Nu(s||"unknown",t),a=Ou[s]||"🎁",n=qu[s]||null;return n?{src:n,className:i,emoji:a,html:`<img class="${Ns(i)}" src="${Ns(n)}" alt="" width="48" height="48" decoding="async" draggable="false" data-gift-slug="${Ns(s)}" />`}:{src:null,className:i,emoji:a,html:`<span class="${Ns(i)} gift-sticker--emoji" aria-hidden="true">${a}</span>`}}function it(e,t){return Fa(e,t&&typeof t=="object"&&typeof t!="function"?t:{}).html}const Bu=Object.freeze([{id:"women",title:"Women's Rooms",icon:"💗",description:"Conversations, style, wellness, business and community",names:["Ladies Lounge","Girl Talk","Tea Time","What's the Word?","Who Did What?","Beauty Bar","Girls' Night In","Love & Standards","Boss Ladies","Fashion & Fits","Ladies Only Live","Women in Business","Women's Mental Wellness","Dating From Her Side","The Hustle Room: Women"]},{id:"men",title:"Men's Rooms",icon:"🫱🏻‍🫲🏿",description:"Brotherhood, relationships, business, wellness and hobbies",names:["The Man Cave","The Barbershop","Fellas' Night","Men's Corner","Men in Business","Cars & Motors","Fitness & Brotherhood","Fatherhood","Men's Mental Wellness","Dating From His Side","Sports Debate","Gaming Brotherhood","Men's Style","The Hustle Room","Brotherhood & Mentorship"]},{id:"coed",title:"Coed Communities",icon:"🌐",description:"Shared conversations, learning and networking for everyone",names:["Let's Talk","The Hangout","Business Connect & Wealth Academy","Couples Corner","Conspiracy Room","Game Room","Why Are You Single?","What Are You Looking For?","Single & Ready to Mingle","City Connect"]},{id:"dating",title:"Singles & Dating",icon:"💘",description:"Opt-in conversations, introductions and relationship topics",names:["Looking for My Match","The Flirt Zone","Speed Connections","Poly Connections","Date Night Live","Love & Advice"]},{id:"sports",title:"Sports",icon:"🏆",description:"A separate place for every major sport",names:["Sports Central","Basketball","Football","Soccer","Baseball","Hockey"]},{id:"talent",title:"Music & Talent",icon:"🎙️",description:"Rappers, singers, bands, producers and city competitions",names:["The Booth","Producer Room","The Stage","City Takeover"]},{id:"news",title:"News & Innovation",icon:"📰",description:"World events, markets and new ideas",names:["World News","Economy & Markets","Startups & Innovation","Tech Talk","Money Talk"]},{id:"general",title:"General Live",icon:"📡",description:"IRL, gaming, shows, comedy, food, fitness and more",names:["Just Chatting","Gaming","Music","IRL","Sports","Creative","Podcasts & Talk Shows","Food & Cooking","Fitness","Beauty & Fashion","Business & Money Talk","Dating & Connections","Education","News & Commentary","Comedy & Entertainment","Comedy & Roast Battles","Creator Spotlight"]}]);function Ru(e,t){const s=new Map(e.map(r=>[r[0],r])),i=new Set,a=([r,d,c])=>'<a class="live-cat-card pikk-live-room-card" href="'+(r==="Comedy & Roast Battles"?"#/roast-arena":"#/live?tab=channels&category="+encodeURIComponent(r))+'" aria-label="'+t(r)+': browse channels"><span class="pikk-live-room-emoji" aria-hidden="true">'+t(c)+"</span><strong>"+t(r)+'</strong><p class="muted">'+t(d)+'</p><span class="pikk-live-room-action">Browse channels <span aria-hidden="true">›</span></span></a>',n=Bu.map(r=>{const d=r.names.map(c=>s.get(c)).filter(Boolean);return d.forEach(c=>i.add(c[0])),'<details class="pikk-live-directory-group" id="pikk-live-group-'+r.id+'"'+(r.id==="coed"?" open":"")+'><summary class="pikk-live-directory-summary"><span class="pikk-live-directory-icon" aria-hidden="true">'+r.icon+'</span><span class="pikk-live-directory-label"><strong>'+t(r.title)+"</strong><small>"+t(r.description)+'</small></span><span class="pikk-live-directory-count">'+d.length+' rooms</span><span class="pikk-live-directory-chevron" aria-hidden="true">⌄</span></summary><div class="live-cat-cards pikk-live-directory-cards">'+d.map(a).join("")+"</div></details>"}),o=e.filter(r=>!i.has(r[0]));return o.length&&n.push('<details class="pikk-live-directory-group" open><summary class="pikk-live-directory-summary"><span class="pikk-live-directory-icon" aria-hidden="true">✨</span><span class="pikk-live-directory-label"><strong>More Live</strong><small>Additional topics</small></span><span class="pikk-live-directory-count">'+o.length+' rooms</span><span class="pikk-live-directory-chevron" aria-hidden="true">⌄</span></summary><div class="live-cat-cards pikk-live-directory-cards">'+o.map(a).join("")+"</div></details>"),'<div class="pikk-live-directory" role="region" aria-label="Live category groups">'+n.join("")+"</div>"}function Co(){const e=(Ke().query||{}).tab;return e==="live"||e==="channels"?"channels":e==="following"||e==="categories"?e:"channels"}function fe(){const e=Co();R(e==="channels"?"#/live":`#/live?tab=${e}`)}function be(e){return"$"+Number(e||0).toFixed(2)}function Ne(e){const t=Number(e)||0;return t>=1e3?(t/1e3).toFixed(t>=1e4?0:1).replace(/\.0$/,"")+"K":String(t)}function ju(e="live"){return`
    <nav class="live-cat-chips" aria-label="Live categories">
      ${[{id:"live",href:"#/live?tab=channels",label:"Live"},{id:"openmic",href:"#/openmic",label:"Open Mic / Talent Discovery (24/7)"},{id:"spotlight",href:"#/spotlight",label:"Spotlight (24/7)"},{id:"viral",href:"#/viral-live",label:"Viral Live · Preview"}].map(i=>{const a=i.id===e?" on":"",n=i.id===e?' aria-current="page"':"";return`<a class="live-cat-chip${a}" href="${i.href}"${n}>${l(i.label)}</a>`}).join("")}
    </nav>`}function Fu(e="channels"){return`
    <nav class="live-disc-tabs" aria-label="Live discovery">
      ${[{id:"following",href:"#/live?tab=following",label:"Following"},{id:"clips",href:"#/shorts",label:"Clips"},{id:"channels",href:"#/live?tab=channels",label:"Channels"},{id:"categories",href:"#/live?tab=categories",label:"Categories"}].map(i=>{const a=i.id===e?" on":"",n=i.id===e?' aria-current="page"':"";return`<a class="live-disc-tab${a}" href="${i.href}" data-tab="${i.id}"${n}>${l(i.label)}</a>`}).join("")}
    </nav>`}function To(e={}){const t=Tr(),s=t.chipLabel||"House · Music Video",i=t.embed?We(t.embed,"rel=0"):"",a=e.title||"House catalog · while stages are quiet";return`
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
    </div>`}function Ku(e){const t=e?zi(e.id):[],s=new Set(t.map(o=>o.id)),i=Wt().filter(o=>s.has(o.hostId)),a=t.length?t.slice(0,12).map(o=>`<a class="chip" href="#/profile">${l("@"+(o.username||o.id))}</a>`).join(""):'<span class="muted">Nobody followed yet · DEMO</span>';let n;if(!e)n=`
      <p class="muted">Sign in to see lives from accounts you follow.</p>
      <a class="btn primary" href="#/profile">Demo profile</a>
      <p class="chip" style="margin-top:10px">TEST MODE · Following is local demo graph</p>`;else if(!i.length)n=`
      <p class="muted" style="margin:0 0 8px">
        None of the people you follow are live right now (demo filter on seeded Hot lives).
      </p>
      <div class="row wrap" style="gap:6px;margin-bottom:10px">${a}</div>
      <a class="btn ghost" href="#/live?tab=channels">Browse Live channels</a>
      <p class="chip" style="margin-top:10px">TEST MODE · not a scrape</p>
      ${To({title:"Meanwhile — DatBoiSkeet house catalog on 24/7 stages"})}`;else{const o=i.map(r=>`
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
    </div>`}const Gu=[["The Booth","Rappers, freestyles, hip-hop performances and song previews","🎙️"],["The Stage","Singers, bands, vocalists and instrumental performances","🎤"],["City Takeover","City-versus-city showcases, performances and local pride challenges","🌆"],["Producer Room","Beat showcases, producer collaborations and beat competitions","🎹"],["Ladies Lounge","Women-centered girl talk, beauty, fashion, relationships and community","💅"],["Girl Talk","Everyday conversations, friendships and women’s discussions","💬"],["Tea Time","Celebrity gossip, trending stories and entertainment drama","🫖"],["Who Did What?","Viral moments, celebrity controversies and debates","👀"],["Boss Ladies","Women entrepreneurs, business networking and financial growth","👑"],["Fashion & Fits","Fashion, outfits and personal style","👗"],["Ladies Only Live","Women-centered livestreams and hosted events","🎥"],["What's the Word?","Entertainment news, celebrity conversations, viral moments and trending discussions","🗣️"],["Women in Business","Women entrepreneurs, founders, business networking and mentorship","👩‍💼"],["The Man Cave","Men’s social conversations, sports and community","🤝"],["Men in Business","Men’s entrepreneurship, networking, mentorship and partnerships","👔"],["Girls' Night In","Women-centered social nights, games and discussions","🌙"],["Beauty Bar","Beauty, hair, makeup and skincare conversations","💄"],["Love & Standards","Dating, relationships and boundaries","💗"],["Women's Mental Wellness","Women-centered stress, confidence, emotional wellbeing and peer support","🧠"],["Dating From Her Side","Women-centered dating experiences, relationships and personal standards","💞"],["The Hustle Room: Women","Women-centered side hustles, extra income ideas and building businesses","📈"],["The Barbershop","Men-centered everyday debates, conversation and community","💈"],["Fellas' Night","Men-centered social events and games","🌃"],["Men's Corner","Men-centered life, relationships and personal development","🧢"],["Cars & Motors","Cars, motorcycles, customization and auto culture","🚘"],["Fitness & Brotherhood","Fitness, wellbeing and peer support","💪"],["Fatherhood","Parenting, family responsibilities and raising children","👨‍👧"],["Men's Mental Wellness","Men-centered stress, wellbeing and peer support","🧠"],["Dating From His Side","Men-centered dating experiences and relationship advice","💬"],["Sports Debate","Sports arguments, player comparisons and predictions","🏅"],["Gaming Brotherhood","Gaming, tournaments and player communities","🎮"],["Men's Style","Fashion, grooming, watches and fragrances","⌚"],["The Hustle Room","Careers, side businesses and professional growth","📈"],["Brotherhood & Mentorship","Intergenerational mentoring and peer support","🤝"],["Sports Central","All-sports discussion, fan talk and analysis","🏆"],["Basketball","Basketball discussion and fan streams","🏀"],["Football","American football discussion and fan streams","🏈"],["Soccer","Soccer discussion and fan streams","⚽"],["Baseball","Baseball discussion and fan streams","⚾"],["Hockey","Hockey discussion and fan streams","🏒"],["Tech Talk","AI, gadgets, apps and technology","💻"],["Startups & Innovation","Building businesses, technology and new ideas","🚀"],["World News","International events and global news discussions","🌍"],["Economy & Markets","Inflation, housing, jobs, interest rates and markets","📈"],["Let's Talk","Open conversations, questions and community discussion","🗣️"],["The Hangout","Conversations and social live streams","💬"],["Creator Spotlight","Featured creators and emerging talent","🌟"],["Game Room","Gameplay, tournaments and community games","🎮"],["Why Are You Single?","Coed conversations about single life, dating experiences and relationship challenges","❓"],["What Are You Looking For?","Coed conversations about dating intentions, values and ideal partners","💭"],["Single & Ready to Mingle","Opt-in coed social conversations and introductions for singles","💘"],["Looking for My Match","Opt-in dating live conversations","❤️"],["The Flirt Zone","Dating and connection conversations","💕"],["Speed Connections","Fast-paced introductions and connections","⏱️"],["Poly Connections","Consensual nonmonogamy discussions and connections","🔗"],["Couples Corner","Couples-versus-couples games, trivia, partner challenges, friendly competitions and rematches","💞"],["Date Night Live","Live dating conversations and activities","🌹"],["Love & Advice","Relationship conversations and advice","💌"],["Business Connect & Wealth Academy","Coed business networking and beginner education in entrepreneurship, credit, stocks, crypto, real estate and Roth IRAs","💼"],["City Connect","Meet people by city for friendship, dating, business networking and local conversations","📍"],["Conspiracy Room","Open discussion of theories and claims","🧩"],["Money Talk","Stocks, housing, crypto and financial discussions","💰"],["Just Chatting","Conversations, Q&A and hanging out","💬"],["Gaming","Gameplay, tournaments and community games","🎮"],["Music","Artists, DJs, producers and listening sessions","🎵"],["IRL","Everyday life, travel and outdoor streams","🌎"],["Sports","Sports talk and watch-along discussions","🏀"],["Creative","Art, design, production and making things","🎨"],["Podcasts & Talk Shows","Interviews, panels and conversations","🎙️"],["Food & Cooking","Recipes, kitchens and food reviews","🍳"],["Fitness","Training, wellness and movement","💪"],["Beauty & Fashion","Style, hair, makeup and fashion","✨"],["Business & Money Talk","Entrepreneurs, careers and money discussions","💼"],["Dating & Connections","Opt-in conversations and dating live rooms","❤️"],["Education","Tutorials, learning and study sessions","📚"],["News & Commentary","Current events and opinions","📰"],["Comedy & Entertainment","Comedy, variety and entertainment","🎭"],["Comedy & Roast Battles","1v1, tag team, open mic and tournaments","🎤"]];function Vu(){return`
    <div class="card live-disc-panel" id="liveTabCategories" data-panel="categories">
      <div class="pikk-live-directory-hero">
        <span class="pikk-live-directory-kicker">PIKK LIVE · DISCOVER</span>
        <h3>Find your room.</h3>
        <p>Choose a community, explore a sport or find a conversation. Open a section to browse its topics.</p>
        <span class="pikk-live-directory-note">Discovery categories filter channels; a category is not a hosted room or a live stream. No active stream? You'll see an empty result.</span>
      </div>
      ${Ru(Gu,l)}
      <h3 style="margin:20px 0 8px">PIKK 24/7 Stages</h3>
      <div class="live-cat-cards">
        <a class="live-cat-card" href="#/openmic"><strong>Open Mic / Talent Discovery</strong><span class="chip">24/7 stage</span><p class="muted">Join the performance queue</p></a>
        <a class="live-cat-card" href="#/spotlight"><strong>Spotlight Live</strong><span class="chip">24/7 stage</span><p class="muted">Keep Going votes and creator performances</p></a>
        <a class="live-cat-card" href="#/shorts"><strong>Clips / Shorts</strong><span class="chip">Watch</span><p class="muted">Watch short videos</p></a>
        <a class="live-cat-card" href="#/viral-live"><strong>PIKK Viral Live</strong><span class="chip">Preview · not broadcasting</span><p class="muted">Explore the future 24/7 trending channel and original video sources</p></a>
      </div>
    </div>`}function Uu(e){return e!=null&&e.spikedAt?Date.now()-Number(e.spikedAt)<15*60*1e3:!1}function Hu(e=""){const t=Wt();return`
    <div class="card hot-lives-rail" id="hotLivesRail">
      <div class="row wrap" style="justify-content:space-between;align-items:baseline;gap:8px">
        <h3 style="margin:0">Hot lives · Top streamers</h3>
        <span class="chip">score · viewers + engagement</span>
      </div>
      <p class="muted" style="margin:6px 0 10px;font-size:12px">TEST MODE · seeded demo · not third-party scrape · house + community</p>
      <div class="hot-lives-track">
        ${(e?t.filter(a=>String(a.category||"").toLowerCase()===e.toLowerCase()):t).map(a=>{const n=Uu(a);return`
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
    </div>`}function zu(e){const t=String(e||"queued");return t==="playing"?'<span class="chip live-chip">Playing</span>':t==="played"?'<span class="chip chip-ok">Played</span>':t==="skipped"?'<span class="chip">Skipped</span>':'<span class="chip">Queued</span>'}function $e(e){const t=Number(e)||0;return t>=1e3?(t/1e3).toFixed(t%1e3===0?0:1).replace(/\.0$/,"")+"K":String(t)}function Wu(e,t){if(!e||e.endedAt)return"";const s=mi(),i=Ml(),a=Ll(e.id).slice(0,12),n=i.map(c=>{const p=c.coins>=Tl,m=s>=c.coins;return`
      <button type="button" class="lg-gift" data-slug="${l(c.slug)}" data-coins="${c.coins}" data-confirm="${p?"1":"0"}" title="${l(c.animation)}">
        <span class="lg-gift-emoji">${it(c.slug)}</span>
        <span class="lg-gift-name">${l(c.name)}</span>
        <span class="lg-gift-price">${l($e(c.coins))} · ${be(c.usd)}</span>
        ${m?'<span class="chip">Ready</span>':'<span class="chip">Need demo coins</span>'}
        ${p?'<span class="chip lg-confirm-chip">Confirm</span>':""}
      </button>`}).join(""),o=pi.map(c=>`<button type="button" class="btn ghost lg-buy" data-coins="${c.coins}">${l($e(c.coins))} · ${be(c.usd)}</button>`).join(""),r=a.length?a.map(c=>`<li class="lg-hist-row">
            <span class="lg-hist-emoji">${it(c.giftSlug)}</span>
            <span><strong>${l(c.giftName)}</strong> · @${l(c.fromUser)} · ${l($e(c.coins))} coins</span>
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
    </div>`}function Yu(e,t){var d;if(!e||e.endedAt)return"";const s=!!(t&&e.hostId===t.id),i=Number(((d=D().wallet)==null?void 0:d.balance)||0),a=pa(e.id),n=lr.map(c=>{const p=c.save>0?`<span class="chip chip-ok lsr-save">Save $${c.save}</span>`:"";return`
      <button type="button" class="lsr-pack" data-pack="${c.pack}" data-price="${c.price}" aria-pressed="false">
        <strong>${l(c.label)}</strong>
        <span class="lsr-pack-price">${be(c.price)}</span>
        ${p}
      </button>`}).join(""),o=a.length?a.map(c=>{const p=s?`<div class="row wrap lsr-host-acts" style="gap:6px">
                 ${c.status==="queued"||c.status==="playing"?`<button type="button" class="btn primary lsr-play" data-rid="${l(c.requestId)}" data-si="${c.songIndex}">${c.status==="playing"?"Mark played":"Play"}</button>
                        <button type="button" class="btn ghost lsr-skip" data-rid="${l(c.requestId)}" data-si="${c.songIndex}">Skip</button>`:""}
               </div>`:"";return`
          <li class="lsr-queue-row" data-status="${l(c.status)}">
            <div class="lsr-queue-main">
              <strong>${l(c.title)}</strong>
              <span class="muted" style="font-size:12px">@${l(c.username)} · ${l(String(c.pack))}‑pack</span>
            </div>
            ${zu(c.status)}
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
          <span class="chip">Wallet ${be(i)}</span>
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
    </div>`}function Ju(e){var r;const t=e.endedAt?Math.max(0,Math.floor((e.endedAt-e.startedAt)/1e3)):Math.max(0,Math.floor((Date.now()-e.startedAt)/1e3)),s=String(Math.floor(t/60)).padStart(2,"0"),i=String(t%60).padStart(2,"0"),a=Ne(e.viewers||0),n=e.endedAt?`<div class="live-stage-meta"><span class="chip">Ended · ${F(e.endedAt)}</span></div>`:`<div class="live-hoodie live-hoodie--stage" aria-label="Live · ${l(a)} watching">
          <span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span>
          <span class="live-hoodie-viewers" id="liveViewers" title="${l(a)} watching">${l(a)}</span>
        </div>
        <div class="live-stage-meta">
          <span class="chip">${s}:${i}</span>
        </div>`,o=(e.chat||[]).slice(-40).map(d=>`
      <div class="live-chat-row ${d.support?"support":""}">
        <strong>${l(d.username)}</strong>
        <span>${l(d.text)}</span>
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
        <span class="chip">Tips ${be(e.tipsTotal)}</span>
        <span class="chip">Gifts ${be(e.giftsTotal||0)}</span>
        <span class="chip">Song reqs (see queue)</span>
        <span class="chip">Coins ${$e(mi())}</span>
        <span class="chip">Wallet ${be(((r=D().wallet)==null?void 0:r.balance)||0)}</span>
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
  `}function Qu(e){const t=Number(e==null?void 0:e.targetAmount)||0;return t<=0?0:Math.min(100,Math.round((Number(e.raised)||0)/t*100))}function Xu(e){const t=Math.max(0,Number(e)-Date.now());if(t<=0)return"Ended · 24h window over";const s=Math.floor(t/36e5),i=Math.floor(t%36e5/6e4);return s>=1?`Resets in ${s}h ${i}m`:`Resets in ${i}m`}function Zu(e,t){if(!e||e.endedAt)return"";const s=e.hostId,i=Ol(s),a=!!(t&&s&&t.id===s),n=mi();if(!i)return a?`
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
      </div>`;const o=Qu(i),r=!!(i.completedAt||o>=100),d=o>=100?"Complete":o>=70?"Close":o>=30?"On the way":"Far",c=[50,100,250].map(m=>`<button type="button" class="btn ghost live-goal-donate" data-goal-id="${l(i.id)}" data-coins="${m}" title="≈ $${(m/50).toFixed(0)}">Donate ${m} coins</button>`).join(""),p=a?`<details class="live-goal-edit" style="margin-top:10px">
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
        <span class="chip${r?" chip-ok":""}">${r?"Goal met":l(d)}</span>
      </div>
      <p class="muted" style="margin:4px 0 8px;font-size:12px">${l(Xu(i.endsAt))} · @${l(i.hostName||e.hostName)} · TEST MODE</p>
      <div class="live-goal-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${o}" aria-label="Goal progress">
        <div class="live-goal-fill" style="width:${o}%"></div>
      </div>
      <p class="live-goal-amounts" style="margin:8px 0 10px">
        <strong>${be(i.raised)}</strong> / ${be(i.targetAmount)}
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
        ${c}
      </div>
      <form class="live-goal-custom-form" data-goal-id="${l(i.id)}" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;align-items:end">
        <label style="flex:1;min-width:125px">Custom coins<input type="number" class="live-goal-custom-coins" inputmode="numeric" min="1" max="1000000" step="1" required placeholder="Enter coins" style="width:100%" /></label>
        <button class="btn primary" type="submit">Donate custom</button>
      </form>
      <p class="muted" style="margin:8px 0 0;font-size:11px">50 / 100 / 250 coins ≈ $1 / $2 / $5 · 100 coins = $2 · TEST MODE</p>
      ${p}
    </div>`}function em(e){return e?`
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
      </div>`}function tm(e){return e.length?`
    <div class="card">
      <h3>Recent streams (this device)</h3>
      <ul class="list-plain">
        ${e.slice(0,8).map(t=>`<li>
              <span><strong>${l(t.title)}</strong><br/><span class="muted" style="font-size:12px">@${l(t.hostName)} · ${F(t.endedAt||t.startedAt)} · tips ${be(t.tipsTotal)}</span></span>
              <span class="chip">${t.endedAt?"Ended":"Live"}</span>
            </li>`).join("")}
      </ul>
    </div>`:""}function sm(e){if(!e||e.endedAt)return"";const t=Il(10),s=t.length?t.map((r,d)=>{const c=it(r.lastSlug||"rose",{className:"gift-sticker gift-sticker--xs"});return`<div class="live-obar-cell" title="${l(r.username)} · ${be(r.usd)} today">
            <span class="live-obar-rank">${d+1}</span>
            ${c}
            <span class="live-obar-name">${l(r.username)}</span>
          </div>`}).join(""):'<div class="live-obar-empty muted">No gifters yet today</div>',i=Aa(10),a=i.length?i.map((r,d)=>{const c=it("battle-win",{className:"gift-sticker gift-sticker--xs"});return`<div class="live-obar-cell" title="${l(r.username)} · rest of day">
            <span class="live-obar-rank">${d+1}</span>
            ${c}
            <span class="live-obar-name">${l(r.username)}</span>
          </div>`}).join(""):'<div class="live-obar-empty muted">No winners yet today</div>',n=pa(e.id).find(r=>r.status==="playing");let o="";if(n){const r=n.title||"Song";o=`
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
    </div>`}function im(e){const t=nc();if(!t)return"";const s=it(t.giftSlug||"rose",{className:"gift-sticker"}),a=e&&e.id===t.fromUserId?`<p class="muted" style="margin:8px 0 0;font-size:12px">You triggered this · others can Challenge you · TEST MODE</p>
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
    </div>`}function am(e){var a,n,o,r,d,c,p,m;Ea();const t=$a();if(!t||!e)return"";if(t.status==="active"||t.status==="ended"){const g=Math.max(0,Number(t.scoreA)||0),f=Math.max(0,Number(t.scoreB)||0),b=g+f,k=t.status==="active"?Math.max(0,Math.ceil((Number(t.endsAt)-Date.now())/1e3)):0,v=t.winnerName?"@"+l(t.winnerName):"Tie";return`
      <section class="card live-battle-scoreboard" aria-label="Live Gift Battle scoreboard">
        <div class="row wrap" style="justify-content:space-between;align-items:center">
          <strong>⚔️ PIKK Live Battle</strong>
          <span class="chip" id="liveBattleTimer" data-ends-at="${Number(t.endsAt)||0}">${t.status==="active"?k+"s left":"Finished"}</span>
        </div>
        <div class="row" style="justify-content:space-between;gap:12px;margin:12px 0">
          <div><strong>@${l(((a=t.challenger)==null?void 0:a.name)||"Challenger")}</strong><div>${Ne(g)} demo points</div></div>
          <strong>VS</strong>
          <div style="text-align:right"><strong>@${l(((n=t.opponent)==null?void 0:n.name)||"Opponent")}</strong><div>${Ne(f)} demo points</div></div>
        </div>
        <div class="live-battle-score-track" role="progressbar" aria-label="Challenger share of battle points" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${b?Math.round(g/b*100):50}" style="height:10px;background:var(--blue);border-radius:10px;overflow:hidden">
          <div style="width:${b?Math.round(g/b*100):50}%;height:100%;background:var(--acc)"></div>
        </div>
        ${t.status==="ended"?`<p class="live-battle-winner" style="font-weight:800;margin-top:10px">🏆 ${v} · Battle complete</p>`:'<p class="muted" style="margin-top:10px">Scores update with demo gifts · no real money</p>'}
        <a href="#/giftbattles" class="btn ghost" style="margin-top:8px">Battle details</a>
      </section>`}if(t.status!=="pending")return"";const s=((o=t.opponent)==null?void 0:o.id)===e.id,i=((r=t.challenger)==null?void 0:r.id)===e.id;return!s&&!i?`
      <div class="card live-gb-pending-note">
        <span class="chip">Pending battle</span>
        <span class="muted" style="margin-left:8px;font-size:12px">${l((d=t.challenger)==null?void 0:d.name)} vs ${l((c=t.opponent)==null?void 0:c.name)} · waiting</span>
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
    </div>`}function nm(){const e=Aa(10);return e.length?`
    <div class="card live-gb-day" id="liveGbDayWinners">
      <h3 style="margin:0 0 6px">Gift Battle winners today</h3>
      <p class="muted" style="margin:0 0 8px;font-size:12px">Up to 10 · until end of day · TEST MODE</p>
      <ul class="live-gb-day-list">${e.map((s,i)=>`<li class="live-gb-day-row"><span class="live-gb-day-sticker">${it("battle-win",{className:"gift-sticker gift-sticker--xs"})}</span><span class="chip">#${i+1}</span><strong>${l(s.username)}</strong></li>`).join("")}</ul>
    </div>`:""}function rm(){var p;const{user:e,live:t}=D(),s=Sl(),i=t&&!t.endedAt,a=!!t,n=Co(),o=((p=Ke().query)==null?void 0:p.category)||"";let d=`
    <div class="live-disc-panel" data-panel="channels">
      ${o?`<div class="card"><strong>Category: ${l(o)}</strong> <a class="btn ghost" href="#/live?tab=categories">All categories</a> <a class="btn ghost" href="#/live?tab=channels">All channels</a><p class="muted small">Only channels tagged with this category are shown below.</p></div>`:""}
      ${Hu(o)}
      ${o?"":nm()}
      ${i?"":em(e)}
      ${i?"":To({title:"No active Live on this device — house catalog on Spotlight / Open Mic"})}
      ${tm(s)}
      <div class="card">
        <p class="muted" style="margin:0 0 8px">More Live tools</p>
        <div class="row wrap">
          <a class="btn ghost" href="#/connect#connect-multistream">Multi-platform go-live</a>
          <a class="btn ghost" href="#/multiguest">Multi-Guest</a>
          <a class="btn ghost" href="#/shorts">Shorts / Clips</a>
        </div>
        <p class="muted" style="margin:8px 0 0;font-size:12px">Open Mic + Spotlight are 24/7 categories (chips above). Clips live under Watch → Shorts / Clips. Gifts + song requests run during an active Live. Gift Battles is not promoted from this page.</p>
      </div>
    </div>`;n==="following"?d=Ku(e):n==="categories"&&(d=Vu());const c=`
    ${Fu(n)}
    ${ju("live")}
    ${i?sm(t):""}
    ${i?im(e):""}
    ${i?am(e):""}
    ${a?Ju(t):""}
    ${i?Zu(t,e):""}
    ${i?Wu(t,e):""}
    ${i?Yu(t,e):""}
    ${d}
  `;return _("PIKK Live",c,{lead:"Following · Clips · Channels · Categories → Shorts · Request Spotlight · TEST MODE.",badge:i?"LIVE":void 0})}const sa=[];let Fi=!1;function om(e,t){sa.push(t),Do(e)}function Do(e){if(Fi)return;const t=e.querySelector("#liveGiftOverlay");if(!t){sa.length=0;return}const s=sa.shift();if(!s)return;Fi=!0;const a=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches?900:s.tier==="cinematic"?4200:s.tier==="premium"?2800:1600;t.innerHTML=`
    <div class="lg-overlay-card lg-tier-${l(s.tier||"small")}" data-slug="${l(s.slug)}">
      <div class="lg-overlay-sticker">${it(s.slug)}</div>
      <div class="lg-overlay-copy">
        <strong>${l(s.name)}</strong>
        <span>@${l(s.fromUser)} · ${l($e(s.coins))} coins</span>
        <span class="muted lg-overlay-brief">${l(s.animation||"")}</span>
      </div>
    </div>`,t.classList.add("is-on"),window.setTimeout(()=>{t.classList.remove("is-on"),t.innerHTML="",Fi=!1,Do(e)},a)}function lm(e){e.querySelectorAll(".lg-buy").forEach(t=>{t.addEventListener("click",()=>{const s=cr(Number(t.dataset.coins));if((s==null?void 0:s.error)==="bad_package")return h("Unknown coin pack");if(s!=null&&s.error)return h(String(s.error));h(`+${$e(s.pack.coins)} coins · ${be(s.pack.usd)} · TEST MODE`),fe()})}),e.querySelectorAll(".lg-gift").forEach(t=>{t.addEventListener("click",()=>{var r,d,c;const s=t.dataset.slug,i=t.dataset.confirm==="1",a=ma.find(p=>p.slug===s);if(!a)return h("Gift not found");if(i&&!window.confirm(`Send ${a.name} for ${$e(a.coins)} coins (${be(a.usd)})?
TEST MODE · demo coins only`))return;const n=(r=D().live)==null?void 0:r.id,o=Pl({liveId:n,slug:s});if((o==null?void 0:o.error)==="signin")return h("Sign in first");if((o==null?void 0:o.error)==="offline")return h("Not live");if((o==null?void 0:o.error)==="insufficient")return h(`Need ${$e(o.need)} coins — buy a pack below · TEST MODE`);if((o==null?void 0:o.error)==="bad_gift")return h("Unknown gift");if(o!=null&&o.error)return h(String(o.error));om(e,{slug:a.slug,name:a.name,coins:a.coins,tier:a.tier,animation:a.animation,fromUser:((d=o.entry)==null?void 0:d.fromUser)||((c=D().user)==null?void 0:c.username)||"you"}),h(`Sent ${a.name} · ${$e(a.coins)} coins · TEST MODE`),window.setTimeout(()=>fe(),200)})})}function cm(e){var o,r;const t=e.querySelector("#lsrPacks"),s=e.querySelector("#lsrTitleFields");if(!t||!s)return;let i=1;const a=()=>{const d=i,c=Array.from({length:d},(p,m)=>`<div class="field"><label>Song ${m+1}</label>
        <input class="lsr-title-input" data-i="${m}" maxlength="80" placeholder="Song title…" /></div>`).join("");s.innerHTML=c},n=d=>{i=Number(d)||1,t.querySelectorAll(".lsr-pack").forEach(c=>{const p=Number(c.dataset.pack)===i;c.classList.toggle("on",p),c.setAttribute("aria-pressed",p?"true":"false")}),a()};t.querySelectorAll(".lsr-pack").forEach(d=>{d.addEventListener("click",()=>n(d.dataset.pack))}),n(1),(o=e.querySelector("#lsrSeedWallet"))==null||o.addEventListener("click",()=>{Zs(50,"Song request demo credit · TEST MODE"),h("+$50 wallet demo · TEST MODE"),fe()}),(r=e.querySelector("#lsrSubmit"))==null||r.addEventListener("click",()=>{const d=Array.from(e.querySelectorAll(".lsr-title-input")).map(p=>p.value),c=xl({pack:i,titles:d});if((c==null?void 0:c.error)==="signin")return h("Sign in first");if((c==null?void 0:c.error)==="offline")return h("Not live");if((c==null?void 0:c.error)==="bad_pack")return h("Pick a pack");if((c==null?void 0:c.error)==="title_count")return h(`Enter ${c.need} song title${c.need>1?"s":""}`);if((c==null?void 0:c.error)==="insufficient")return h(`Need ${be(c.need)} — tap + $50 demo credit · TEST MODE`);if(c!=null&&c.error)return h(String(c.error));h(`Song request submitted · ${be(c.entry.price)} · TEST MODE`),fe()}),e.querySelectorAll(".lsr-play").forEach(d=>{d.addEventListener("click",()=>{var b;const c=d.dataset.rid,p=Number(d.dataset.si),g=pa((b=D().live)==null?void 0:b.id).find(k=>k.requestId===c&&k.songIndex===p);let f;if((g==null?void 0:g.status)==="playing"){if(f=Cl(c,p),(f==null?void 0:f.error)==="host_only")return h("Host only");if(f!=null&&f.error)return h(String(f.error));h("Marked played · TEST MODE")}else{if(f=El(c,p),(f==null?void 0:f.error)==="host_only")return h("Host only");if(f!=null&&f.error)return h(String(f.error));h("Now playing · TEST MODE")}fe()})}),e.querySelectorAll(".lsr-skip").forEach(d=>{d.addEventListener("click",()=>{const c=Al(d.dataset.rid,Number(d.dataset.si));if((c==null?void 0:c.error)==="host_only")return h("Host only");if(c!=null&&c.error)return h(String(c.error));h("Skipped · TEST MODE"),fe()})})}function dm(e){var s,i,a,n,o,r,d,c;e.querySelectorAll(".hot-live-watch").forEach(p=>{p.addEventListener("click",()=>{_i();const m=p.dataset.host||"creator",g=p.dataset.id||"",f=e.querySelector(`.hot-live-card[data-live-id="${CSS.escape(g)}"]`);e.querySelectorAll(".hot-live-card.is-watching").forEach(b=>b.classList.remove("is-watching")),f==null||f.classList.add("is-watching"),h(`Watching @${m} · demo only`)})}),e.querySelectorAll(".hot-live-spike").forEach(p=>{p.addEventListener("click",()=>{var b;const m=p.dataset.id,g=tp(m);if((g==null?void 0:g.error)==="missing")return h("Live not found");if(g!=null&&g.error)return h(String(g.error));const f=((b=g.live)==null?void 0:b.hostName)||"creator";h(g.deduped?`Spike @${f} · Admin alert already open`:`Spike @${f} · Admin engagement alert queued`),fe()})}),(s=e.querySelector("#liveStart"))==null||s.addEventListener("click",()=>{var b,k,v,S,$;const p=(k=(b=e.querySelector("#liveTitle"))==null?void 0:b.value)==null?void 0:k.trim(),m=tn(p);if((m==null?void 0:m.error)==="signin")return h("Sign in first");if((m==null?void 0:m.error)==="already_live")return h("Already live");const g=(S=(v=e.querySelector("#liveGoalNameGo"))==null?void 0:v.value)==null?void 0:S.trim(),f=Number(($=e.querySelector("#liveGoalAmtGo"))==null?void 0:$.value);if(g&&f>0){const A=mr({name:g,targetAmount:f});(A==null?void 0:A.error)==="signin"?h("Sign in to set goal"):A!=null&&A.error?h("Goal not set · "+A.error):h(`Live goal set · $${f} · 24h · TEST MODE`)}_i(),h("You are live · TEST MODE"),fe()}),(i=e.querySelector("#liveRestart"))==null||i.addEventListener("click",()=>{var g;const p="PIKK Live · "+(((g=D().user)==null?void 0:g.username)||"Demo"),m=tn(p);if(m!=null&&m.error)return h(String(m.error));_i(),h("Back live · TEST MODE"),fe()}),(a=e.querySelector("#liveEnd"))==null||a.addEventListener("click",()=>{yl(),mo(),h("Stream ended"),fe()}),(n=e.querySelector("#liveBumpViewers"))==null||n.addEventListener("click",()=>{const p=kl(),m=e.querySelector("#liveViewers");m&&p&&(m.textContent=Ne(p.viewers||0)),h("Viewers updated (stub)")}),(o=e.querySelector("#liveTip"))==null||o.addEventListener("click",p=>{const m=p.currentTarget,g=or({kind:"tip",amount:Number(m.dataset.amt)||1});if((g==null?void 0:g.error)==="signin")return h("Sign in first");if((g==null?void 0:g.error)==="offline")return h("Not live");h("Tip sent · demo"),fe()});const t=()=>{var f;const p=e.querySelector("#liveChatInput"),m=(f=p==null?void 0:p.value)==null?void 0:f.trim();if(!m)return h("Type a message");const g=wl(m);if((g==null?void 0:g.error)==="signin")return h("Sign in first");if((g==null?void 0:g.error)==="offline")return h("Not live");(g==null?void 0:g.error)!=="empty"&&(p&&(p.value=""),fe())};(r=e.querySelector("#liveChatSend"))==null||r.addEventListener("click",t),(d=e.querySelector("#liveChatInput"))==null||d.addEventListener("keydown",p=>{p.key==="Enter"&&t()}),(c=e.querySelector("#liveFocusGifts"))==null||c.addEventListener("click",()=>{var p;(p=e.querySelector("#liveGifts"))==null||p.scrollIntoView({behavior:"smooth",block:"start"})}),lm(e),cm(e),pm(e)}function pm(e){var i;(i=e.querySelector("#liveGoalSave"))==null||i.addEventListener("click",()=>{var r,d,c;const a=(d=(r=e.querySelector("#liveGoalName"))==null?void 0:r.value)==null?void 0:d.trim(),n=Number((c=e.querySelector("#liveGoalAmt"))==null?void 0:c.value),o=mr({name:a,targetAmount:n});if((o==null?void 0:o.error)==="signin")return h("Sign in first");if((o==null?void 0:o.error)==="bad_name")return h("Enter a goal name");if((o==null?void 0:o.error)==="bad_amount")return h("Enter a goal amount ($)");if(o!=null&&o.error)return h(String(o.error));h(`Goal live · $${o.goal.targetAmount} · 24h window · TEST MODE`),fe()});const t=e.querySelector("#liveGoalSupportMessage"),s=e.querySelector("#liveGoalSupportMessageCount");if(t&&s){const a=()=>{s.textContent=`${t.value.length} / 180`};t.addEventListener("input",a),a()}e.querySelectorAll(".live-goal-custom-form").forEach(a=>{a.addEventListener("submit",n=>{var d,c;n.preventDefault();const o=Number((d=a.querySelector(".live-goal-custom-coins"))==null?void 0:d.value);if(!Number.isSafeInteger(o)||o<1||o>1e6)return h("Enter 1–1,000,000 whole coins");const r=Qs(a.dataset.goalId,o,{message:((c=e.querySelector("#liveGoalSupportMessage"))==null?void 0:c.value)||""});if((r==null?void 0:r.error)==="signin")return h("Sign in first");if((r==null?void 0:r.error)==="insufficient")return h("Not enough demo coins");if(r!=null&&r.error)return h("Donation unavailable · TEST MODE");h("Custom donation sent · TEST MODE"),fe()})}),e.querySelectorAll(".live-goal-donate").forEach(a=>{a.addEventListener("click",()=>{var c,p;const n=a.dataset.goalId,o=Number(a.dataset.coins),r=Qs(n,o,{message:((c=e.querySelector("#liveGoalSupportMessage"))==null?void 0:c.value)||""});if((r==null?void 0:r.error)==="signin")return h("Sign in first");if((r==null?void 0:r.error)==="insufficient")return h(`Need ${$e(r.need)} coins — buy a pack in Gifts · TEST MODE`);if((r==null?void 0:r.error)==="expired")return h("Goal ended · 24h window over");if((r==null?void 0:r.error)==="unknown_goal")return h("Goal not found");if((r==null?void 0:r.error)==="invalid_amount")return h("Pick a donate amount");if(r!=null&&r.error)return h(String(r.error));const d=((p=r.donated)==null?void 0:p.usd)??o/50;h(`Donated ${$e(o)} coins ($${Number(d).toFixed(2)}) · TEST MODE`),fe()})})}const um={BASE_URL:"/pikk-app/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_BASE:"/pikk-app/",VITE_BUILD_SHA:"e3289fe14c167c284a1b3e6600334d78b63ba589"};function mm(e=um&&"/pikk-app/"||"/"){return String(e).replace(/\/?$/,"/")+"brand/pikk-official-approved.jpg"}const Hs=ge.filter(e=>["dirty-money","93","no-love"].includes(e.id)).map(e=>({id:e.id,title:e.title,artist:"DatBoiSkeet",url:e.youtube,thumbnail:`https://i.ytimg.com/vi/${encodeURIComponent(new URL(e.youtube).searchParams.get("v"))}/hqdefault.jpg`})),Pn=[{id:"videos",label:"Videos"},{id:"clips",label:"Viral clips",browseHref:"#/shorts",browseLabel:"Browse existing PIKK Clips"},{id:"songs",label:"Songs",browseHref:"#/music",browseLabel:"Explore PIKK Music"},{id:"photos",label:"Photos",browseHref:"#/home",browseLabel:"Explore PIKK Home"}];function hm(){const e=Hs[0],t=Hs.map((s,i)=>`
    <button type="button" class="pikk-viral-choice${i===0?" is-selected":""}"
      data-viral-pick="${i}" aria-pressed="${i===0}">
      <span class="pikk-viral-choice-num">${String(i+1).padStart(2,"0")}</span>
      <img class="pikk-viral-choice-thumb" src="${l(s.thumbnail)}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer">
      <span class="pikk-viral-choice-copy"><strong>${l(s.title)}</strong><small>${l(s.artist)} · Original YouTube source</small></span>
      <span class="pikk-viral-choice-arrow" aria-hidden="true">↗</span>
    </button>`).join("");return _("PIKK Viral Live",`
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
        <div class="pikk-viral-hero-mark" aria-hidden="true"><img class="pikk-viral-hero-logo" src="${l(mm())}" alt="" decoding="async" loading="eager"></div>
      </section>

      <div class="pikk-viral-notice" role="status">
        <strong>PREVIEW · NOT BROADCASTING</strong>
        <span>Real-time viewer counts, live chat, engagement ranking and 24/7 playback are not connected. Nothing here is represented as live.</span>
      </div>

      <nav class="pikk-viral-tabs" aria-label="Viral Live content types" role="tablist">
        ${Pn.map((s,i)=>`<button type="button" role="tab" data-viral-type="${s.id}" aria-selected="${i===0}" tabindex="${i===0?0:-1}" aria-controls="viral-panel-${s.id}" id="viral-tab-${s.id}">${s.label}</button>`).join("")}
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
        <div class="pikk-viral-section-head"><h3>Up next · source library</h3><span>Manual preview · ${Hs.length} existing music videos</span></div>
        <div class="pikk-viral-queue" id="pikkViralQueue" role="group" aria-label="Choose an original video source">${t}</div>
      </section>

      ${Pn.filter(s=>s.id!=="videos").map(s=>`
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
  `,{lead:"Discover the planned 24/7 viral channel · preview only"})}function gm(e){const t=e.querySelector("#pikkViralPreview");if(!t)return;t.querySelectorAll("[data-viral-pick]").forEach(n=>{n.addEventListener("click",()=>{const o=Number(n.dataset.viralPick),r=Hs[o];r&&(t.querySelector("#pikkViralTitle").textContent=r.title,t.querySelector("#pikkViralCreator").textContent=r.artist+" · Watch from the original publisher",t.querySelector("#pikkViralSource").href=r.url,t.querySelector("#pikkViralThumbnail").src=r.thumbnail,t.querySelectorAll("[data-viral-pick]").forEach(d=>{const c=d===n;d.classList.toggle("is-selected",c),d.setAttribute("aria-pressed",String(c))}))})});const s=Array.from(t.querySelectorAll("[data-viral-pick]"));s.forEach((n,o)=>{n.addEventListener("keydown",r=>{if(!["ArrowRight","ArrowLeft","ArrowDown","ArrowUp","Home","End"].includes(r.key))return;r.preventDefault();const d=s.length-1,c=r.key==="Home"?0:r.key==="End"?d:(o+(["ArrowRight","ArrowDown"].includes(r.key)?1:-1)+s.length)%s.length,p=s[c];p.click(),p.focus(),p.scrollIntoView({block:"nearest",inline:"nearest"})})});const i=Array.from(t.querySelectorAll("[data-viral-type]"));function a(n,o=!1){const r=n.dataset.viralType;i.forEach(d=>{const c=d===n;d.setAttribute("aria-selected",String(c)),d.tabIndex=c?0:-1}),t.querySelectorAll("[data-viral-panel]").forEach(d=>{d.hidden=d.dataset.viralPanel!==r}),o&&(n.focus(),n.scrollIntoView({block:"nearest",inline:"nearest"}))}i.forEach((n,o)=>{n.addEventListener("click",()=>a(n)),n.addEventListener("keydown",r=>{if(!["ArrowRight","ArrowLeft","Home","End"].includes(r.key))return;r.preventDefault();const d=i.length-1,c=r.key==="Home"?0:r.key==="End"?d:(o+(r.key==="ArrowRight"?1:-1)+i.length)%i.length;a(i[c],!0)})})}function Xt(){R("#/marketplace")}const fm={pending:"Pending",approved:"Approved",rejected:"Rejected"},vm=[{v:"sponsored_post",label:"Sponsored post"},{v:"livestream_promo",label:"Livestream promo"},{v:"affiliate",label:"Affiliate link"},{v:"storefront",label:"Product storefront"}];function bm(){const{brandApps:e,user:t}=D(),s=Rl(),i=s.filter(r=>r.active),a=i.length?i.map(r=>`
      <article class="card market-listing" data-id="${l(r.id)}">
        <div class="row wrap">
          <span class="chip">Sponsored</span>
          <span class="chip">${l(r.disclosure||"Paid partnership")}</span>
          <span class="muted spacer" style="text-align:right;font-size:12px">${F(r.at)}</span>
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
          <span class="chip">${l(fm[r.status]||r.status)}</span>
          <span class="muted spacer" style="text-align:right">${F(r.at)}</span>
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
          ${vm.map(r=>`<option value="${r.v}">${l(r.label)}</option>`).join("")}
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
  `;return _("Marketplace",o,{lead:"Brand applications & sponsored listings · localStorage demo."})}function ym(e){var t,s;(t=e.querySelector("#mSubmit"))==null||t.addEventListener("click",()=>{var a,n,o,r,d,c,p;const i=ql({brand:(a=e.querySelector("#mBrand"))==null?void 0:a.value,contact:(n=e.querySelector("#mContact"))==null?void 0:n.value,email:(o=e.querySelector("#mEmail"))==null?void 0:o.value,budget:(r=e.querySelector("#mBudget"))==null?void 0:r.value,campaign:(d=e.querySelector("#mCampaign"))==null?void 0:d.value,url:(c=e.querySelector("#mUrl"))==null?void 0:c.value,pitch:(p=e.querySelector("#mPitch"))==null?void 0:p.value});if((i==null?void 0:i.error)==="required")return h("Brand and email required");h("Application saved"),Xt()}),e.querySelectorAll(".brand-status").forEach(i=>{i.addEventListener("click",()=>{Nl(i.dataset.id,i.dataset.status),h("Marked "+i.dataset.status),Xt()})}),e.querySelectorAll(".brand-to-listing").forEach(i=>{i.addEventListener("click",()=>{const a=i.dataset.brand||"Brand",n=nn({title:`${a} · sponsored`,brand:a,blurb:i.dataset.pitch||"Sponsored offer from approved brand application.",url:i.dataset.url||"",disclosure:"Paid partnership · TEST MODE",brandAppId:i.dataset.id});if(n!=null&&n.error)return h("Could not create listing");h("Listing published"),Xt()})}),(s=e.querySelector("#lCreate"))==null||s.addEventListener("click",()=>{var a,n,o,r,d;const i=nn({title:(a=e.querySelector("#lTitle"))==null?void 0:a.value,brand:(n=e.querySelector("#lBrand"))==null?void 0:n.value,blurb:(o=e.querySelector("#lBlurb"))==null?void 0:o.value,url:(r=e.querySelector("#lUrl"))==null?void 0:r.value,disclosure:(d=e.querySelector("#lDisc"))==null?void 0:d.value});if((i==null?void 0:i.error)==="required")return h("Title and brand required");h("Listing published"),Xt()}),e.querySelectorAll(".listing-toggle").forEach(i=>{i.addEventListener("click",()=>{Bl(i.dataset.id,i.dataset.active==="1"),h(i.dataset.active==="1"?"Listing shown":"Listing hidden"),Xt()})})}function pe(e){R(e||"#/messages")}function km(e){const t=e.messages||[];if(!t.length)return"No messages yet";const s=t[t.length-1];return(s.priority?"⚡ ":"")+(s.text||"").slice(0,80)}function wm(){return _("Messages",`<section class="pikk-msg-flow-hero" aria-label="PIKK messages sign-in">
      <span class="pikk-msg-flow-kicker">PIKK CONNECT · PRIVATE MESSAGES</span>
      <h2>Your conversations. <em>Your circle.</em></h2>
      <p>Try DMs, group conversations and the DatBoiSkeet team inbox with a local demo account.</p>
      <span class="chip">TEST MODE · No server messaging</span>
    </section>
    <div class="card pikk-msg-flow-panel">
      <h3>Sign in required</h3>
      <p class="muted">Private DMs, team inbox, and group chats need a local demo account.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,{lead:"Private messaging & team inbox · TEST MODE"})}function Sm(e){const t=fa(),s=t.filter(n=>Xs(n)>0),i=D().messagePrefs||{allowDMs:!0,allowRequests:!0},a=t.map(n=>{const o=n.kind==="group",r=!o&&n.peerId==="dbs",d=[o?'<span class="chip">Group</span>':"",r?'<span class="chip">Team</span>':"",n.request?'<span class="chip">Request</span>':"",n.muted?'<span class="chip">Muted</span>':"",n.blocked?'<span class="chip">Blocked</span>':""].filter(Boolean).join(" "),c=Xs(n),p=c?`<span class="chip msg-unread-chip" aria-label="${c} unread">${c}</span>`:"";return`
      <button type="button" class="msg-thread-row${c?" has-unread":""}" data-search="${l(String(n.peerName||n.peerId).toLowerCase())}" data-unread="${c>0}" data-open-thread="${l(n.id)}">
        <div class="pikk-msg-avatar" aria-hidden="true">${l(String(n.peerName||n.peerId||"?").slice(0,1).toUpperCase())}</div>
        <div class="pikk-msg-thread-body"><div class="msg-thread-top">
          <strong>${l(n.peerName||n.peerId)}</strong>
          <span class="muted">${l(F(n.updatedAt||0))}</span>
        </div>
        <div class="msg-thread-preview muted">${l(km(n))}</div>
        <div class="msg-thread-chips">${p}${d}</div></div>
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
  `}function $m(){return`
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
    <section class="pikk-msg-contact-grid" aria-label="Available demo contacts">${Ss().map(s=>{const i=s.team||gr(s.id),a=s.team?"Team inbox":i?"Message":"Message request";return`
      <article class="card msg-contact pikk-msg-contact-card">
        <div class="msg-contact-head">
          <span class="pikk-msg-contact-avatar" aria-hidden="true">${l(String(s.username||"?").slice(0,1).toUpperCase())}</span>
          <strong>${l(s.username)}</strong>
          ${s.team?'<span class="chip">Official</span>':i?'<span class="chip">Mutual</span>':'<span class="chip">Request</span>'}
        </div>
        <p class="muted" style="margin:6px 0 10px">${l(s.bio||"")}</p>
        <button type="button" class="btn ${s.team?"primary":""}" data-start-peer="${l(s.id)}" data-peer-name="${l(s.username)}">${l(a)}</button>
      </article>`}).join("")}</section>
  `}function xm(){return`
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
  `}function Em(e,{teamPriorityHint:t=!1}={}){const s=D().user,i=e.kind==="group",a=!i&&e.peerId==="dbs",n=!!e.blocked,o=(e.messages||[]).map(c=>`
      <div class="msg-bubble ${c.from===(s==null?void 0:s.id)?"mine":""} ${c.priority?"priority":""}">
        <div class="msg-bubble-meta">
          <strong>${l(c.fromName||c.from)}</strong>
          ${c.priority?'<span class="chip priority-chip">Priority</span>':""}
          <span class="muted">${l(F(c.at))}</span>
        </div>
        <div class="msg-bubble-text">${l(c.text)}</div>
      </div>`).join(""),r=e.request?'<div class="msg-banner">Message request · recipient approval stub (demo still delivers locally)</div>':"",d=t?'<div class="msg-banner priority">Next send can use Priority $2.99 TEST MODE (wallet note only — not charged).</div>':"";return`
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
    ${d}
    <div class="card msg-thread-card pikk-msg-flow-panel">
      <div class="msg-thread" id="msgThread">${o||'<p class="muted">No messages yet — say hi.</p>'}</div>
      ${n?'<p class="muted" style="margin-top:10px">Thread blocked · composer disabled (demo).</p>':`<div class="msg-composer">
               <input id="msgInput" placeholder="${a?"Write an inquiry…":"Message…"}" maxlength="500" />
               <button type="button" class="btn primary" id="msgSend">Send</button>
               ${a?'<button type="button" class="btn" id="msgSendPriority" title="TEST MODE — not charged">Priority $2.99</button>':""}
             </div>`}
    </div>
  `}function Am(e){var o,r,d;if(!D().user)return wm();Ss(),va();const s=((o=e==null?void 0:e.query)==null?void 0:o.view)||"",i=((r=e==null?void 0:e.query)==null?void 0:r.t)||"",a=((d=e==null?void 0:e.query)==null?void 0:d.priority)==="1";let n;if(i){const c=hr(i);c?n=Em(c,{teamPriorityHint:a&&c.peerId==="dbs"}):n='<div class="card"><p class="muted">Thread not found.</p><button type="button" class="btn" id="msgBackInbox">← Inbox</button></div>'}else s==="new"?n=$m():s==="team"?n=xm():n=Sm();return _("Messages",n,{lead:"DMs, group chats, and DatBoiSkeet team inbox · TEST MODE"})}function Cm(e){var c,p,m,g,f,b,k,v,S,$,A,w,P,C,B,x,Q;if(!D().user)return;const s=()=>pe("#/messages");(c=e.querySelector("#msgBackInbox"))==null||c.addEventListener("click",s),(p=e.querySelector("#msgMarkAllRead"))==null||p.addEventListener("click",()=>{const T=fa().filter(O=>Xs(O)>0);T.length&&(T.forEach(O=>rn(O.id)),h(`${T.length} conversation${T.length===1?"":"s"} marked read`),pe("#/messages"))}),(m=e.querySelector("#msgNewChat"))==null||m.addEventListener("click",()=>pe("#/messages?view=new")),(g=e.querySelector("#pikkNewChatTop"))==null||g.addEventListener("click",()=>pe("#/messages?view=new"));const i=()=>{var I,q;const T=String(((I=e.querySelector("#pikkMsgSearch"))==null?void 0:I.value)||"").trim().toLowerCase(),O=!!((q=e.querySelector("#pikkMsgUnreadOnly"))!=null&&q.checked);let H=0;e.querySelectorAll("#msgInbox [data-open-thread]").forEach(V=>{const Y=!T||String(V.dataset.search||"").includes(T),G=!O||V.dataset.unread==="true";V.hidden=!(Y&&G),V.hidden||H++});const K=e.querySelector("#pikkMsgNoResults");K&&(K.textContent=O?T?"No unread conversations match your search.":"No unread conversations.":"No conversations match your search.",K.hidden=H>0||!T&&!O);const M=e.querySelector("#pikkMsgClearFilters");M&&(M.hidden=!T&&!O)};(f=e.querySelector("#pikkMsgClearFilters"))==null||f.addEventListener("click",()=>{const T=e.querySelector("#pikkMsgSearch"),O=e.querySelector("#pikkMsgUnreadOnly");T&&(T.value=""),O&&(O.checked=!1),i(),T==null||T.focus()});const a=e.querySelector("#pikkMsgSearch");a==null||a.addEventListener("input",i),a==null||a.addEventListener("keydown",T=>{T.key!=="Escape"||!a.value||(T.preventDefault(),T.stopPropagation(),a.value="",i())}),(b=e.querySelector("#pikkMsgUnreadOnly"))==null||b.addEventListener("change",i),(k=e.querySelector("#msgEmptyNew"))==null||k.addEventListener("click",()=>pe("#/messages?view=new")),(v=e.querySelector("#msgOpenTeam"))==null||v.addEventListener("click",()=>pe("#/messages?view=team")),(S=e.querySelector("#pikkGroupTop"))==null||S.addEventListener("click",()=>{var T;return(T=e.querySelector("#msgOpenGroup"))==null?void 0:T.click()}),($=e.querySelector("#msgOpenGroup"))==null||$.addEventListener("click",()=>{const T=Gl();if(T!=null&&T.error){h("Sign in required");return}h("Opened DBS Fans"),pe("#/messages?t="+encodeURIComponent(T.id))}),(A=e.querySelector("#msgTeamFree"))==null||A.addEventListener("click",()=>{const T=ds("dbs","DatBoiSkeet");if(T.error)return h("Sign in required");pe("#/messages?t="+encodeURIComponent(T.id))}),(w=e.querySelector("#msgTeamPriority"))==null||w.addEventListener("click",()=>{const T=ds("dbs","DatBoiSkeet");if(T.error)return h("Sign in required");pe("#/messages?t="+encodeURIComponent(T.id)+"&priority=1")}),e.querySelectorAll("[data-start-peer]").forEach(T=>{T.addEventListener("click",()=>{const O=T.dataset.startPeer,H=T.dataset.peerName||O;if(O==="dbs"){pe("#/messages?view=team");return}const K=ds(O,H);if(K.error)return h("Sign in required");K.request&&h("Request thread created · demo"),pe("#/messages?t="+encodeURIComponent(K.id))})}),e.querySelectorAll("[data-open-thread]").forEach(T=>{T.addEventListener("click",()=>{pe("#/messages?t="+encodeURIComponent(T.dataset.openThread))})}),(P=e.querySelector("#msgPrefDMs"))==null||P.addEventListener("change",T=>{on({allowDMs:!!T.target.checked}),h(T.target.checked?"DMs allowed":"DMs disabled (stub)")}),(C=e.querySelector("#msgPrefRequests"))==null||C.addEventListener("change",T=>{on({allowRequests:!!T.target.checked}),h(T.target.checked?"Requests allowed":"Requests disabled (stub)")});const n=new URLSearchParams(location.hash.split("?")[1]||"").get("t"),o=n?hr(n):null;o&&rn(o.id),e.querySelectorAll("[data-flag]").forEach(T=>{T.addEventListener("click",()=>{if(!o)return;const O=T.dataset.flag;if(O==="mute"){const H=Ii(o.id,{muted:!o.muted});h(H.muted?"Muted":"Unmuted"),pe("#/messages?t="+encodeURIComponent(o.id))}else if(O==="block"){const H=Ii(o.id,{blocked:!o.blocked});h(H.blocked?"Blocked":"Unblocked"),pe("#/messages?t="+encodeURIComponent(o.id))}else O==="report"&&(Ii(o.id,{report:!0}),h("Reported · stub (Guidelines §13)"),pe("#/messages?t="+encodeURIComponent(o.id)))})});const r=T=>{if(!o)return;const O=e.querySelector("#msgInput"),H=(O==null?void 0:O.value)||"";let K;if(o.kind==="group"?K=Vl(o.id,H):K=Fl(o.peerId,o.peerName,H,{priority:!!T}),(K==null?void 0:K.error)==="empty")return h("Type a message");if(K!=null&&K.error)return h("Could not send");h(T?"Priority sent · TEST MODE $2.99 not charged":"Sent"),pe("#/messages?t="+encodeURIComponent(o.id))};(B=e.querySelector("#msgSend"))==null||B.addEventListener("click",()=>r(!1)),(x=e.querySelector("#msgSendPriority"))==null||x.addEventListener("click",()=>r(!0)),(Q=e.querySelector("#msgInput"))==null||Q.addEventListener("keydown",T=>{T.key==="Enter"&&(T.preventDefault(),r(!1))});const d=e.querySelector("#msgThread");d&&(d.scrollTop=d.scrollHeight)}const _n=Object.freeze({releases:!0,lives:!0,messages:!0,quietHours:!1}),kt=Object.freeze([{key:"releases",title:"New music releases",detail:"Keep track of new DatBoiSkeet music and official drops.",group:"discover"},{key:"lives",title:"Livestreams",detail:"Choose whether you want live-session updates.",group:"discover"},{key:"messages",title:"Messages",detail:"Control conversation notification preferences.",group:"social"},{key:"quietHours",title:"Quiet hours",detail:"Save your preference for a quieter experience.",group:"social"}]);function On(e,t){const s=!!t[e.key];return`<label class="pikk-notif-row" for="pikk-notif-${e.key}">
    <span class="pikk-notif-row-copy"><strong>${e.title}</strong><small>${e.detail}</small></span>
    <input id="pikk-notif-${e.key}" type="checkbox" data-k="${e.key}" ${s?"checked":""} />
  </label>`}function Tm(){const e=D().notifications||{},t=kt.filter(s=>!!e[s.key]).length;return _("Notifications",`
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
          ${kt.filter(s=>s.group==="discover").map(s=>On(s,e)).join("")}
        </section>
        <section class="pikk-notif-panel" aria-labelledby="pikkNotifSocialTitle">
          <div class="pikk-notif-panel-head"><span class="pikk-notif-panel-icon" aria-hidden="true">✉</span><div><span class="pikk-notif-kicker">YOUR SPACE</span><h3 id="pikkNotifSocialTitle">Social &amp; Focus</h3></div></div>
          ${kt.filter(s=>s.group==="social").map(s=>On(s,e)).join("")}
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
    </div>`,{lead:"Music, live and social preferences · browser-local demo."})}function Dm(e){var i,a,n;const t=e.querySelector("#notifPrefs");if(!t)return;const s=o=>{const r=["releases","lives","messages"];Mi(Object.fromEntries(r.map(g=>[g,o]))),t.querySelectorAll("input[data-k]").forEach(g=>{r.includes(g.dataset.k)&&(g.checked=o)});const d=D().notifications||{},c=kt.filter(g=>!!d[g.key]).length,p=t.querySelector("#pikkNotifEnabled");p&&(p.textContent=`${c} of 4`);const m=t.querySelector("#pikkNotifStatus");m&&(m.textContent=o?"Music, live and message preferences resumed on this device. Real push delivery is not connected.":"Music, live and message preferences paused on this device. Real push delivery is not connected."),h(o?"Alerts resumed":"Alerts paused")};(i=t.querySelector("#pikkNotifPause"))==null||i.addEventListener("click",()=>s(!1)),(a=t.querySelector("#pikkNotifResume"))==null||a.addEventListener("click",()=>s(!0)),(n=t.querySelector("#pikkNotifReset"))==null||n.addEventListener("click",()=>{Mi(_n),t.querySelectorAll("input[data-k]").forEach(d=>{d.checked=_n[d.dataset.k]});const o=t.querySelector("#pikkNotifEnabled");o&&(o.textContent="3 of 4");const r=t.querySelector("#pikkNotifStatus");r&&(r.textContent="Notification preferences restored to defaults on this device."),h("Defaults restored")}),t.querySelectorAll("input[data-k]").forEach(o=>{o.addEventListener("change",()=>{const r=o.dataset.k;if(!kt.some(g=>g.key===r))return;Mi({[r]:o.checked});const d=D().notifications||{},c=kt.filter(g=>!!d[g.key]).length,p=t.querySelector("#pikkNotifEnabled");p&&(p.textContent=`${c} of 4`);const m=t.querySelector("#pikkNotifStatus");m&&(m.textContent=`${kt.find(g=>g.key===r).title} preference saved on this device.`),h("Preference saved")})})}function mt(){R("#/wallet")}function W(e){return"$"+Number(e||0).toFixed(2)}function Bs(e){return Number(e||0).toLocaleString()}const Mm={pending:"Pending",completed:"Completed",rejected:"Rejected"};function Lm(){const{wallet:e,user:t,coins:s}=D(),i=e||{balance:0,history:[]},a=mi(),n=[...(s==null?void 0:s.history)||[]].slice(0,10),o=Dl(),r=fs(),d=ka().filter(x=>x.count>0),c=dr(t==null?void 0:t.id),p=[...i.history||[]].slice(-12).reverse(),m=[...r.earnings||[]].slice(0,20),g=r.payouts||[],f=g.find(x=>x.status==="pending"),b=!f&&r.available>=r.threshold,k=r.verification==="demo_verified",v=p.length>0?`<ul class="list-plain">${p.map(x=>`<li>
          <span>${l(x.note||"Entry")}<br/><span class="muted" style="font-size:12px">${F(x.at)}</span></span>
          <strong style="color:${Number(x.amount)>=0?"var(--ok,#6dffb0)":"inherit"}">${Number(x.amount)>=0?"+":""}${W(x.amount)}</strong>
        </li>`).join("")}</ul>`:'<p class="muted" style="margin:0">No fan USD credit activity yet.</p>',S=o.map(x=>{const Q=`pack_${x.coins}`;return`<button type="button" class="card coin-pack-btn" data-coins="${x.coins}" id="${l(Q)}" style="text-align:left;cursor:pointer;margin:0;padding:12px;border:1px solid rgba(255,255,255,.08);background:#12121a">
        <div style="font-size:20px;font-weight:900">${Bs(x.coins)} <span class="muted" style="font-size:13px;font-weight:600">coins</span></div>
        <div class="muted" style="font-size:13px;margin-top:4px">${W(x.usd)} · TEST MODE</div>
        <div style="margin-top:8px"><span class="chip">Buy · demo credit</span></div>
      </button>`}).join(""),$=n.length>0?`<ul class="list-plain">${n.map(x=>{const Q=Number(x.amount)||0;return`<li>
          <span>${l(x.note||"Coins")}<br/><span class="muted" style="font-size:12px">${F(x.at)}</span></span>
          <strong style="color:${Q>=0?"var(--ok,#6dffb0)":"inherit"}">${Q>=0?"+":""}${Bs(Q)}</strong>
        </li>`}).join("")}</ul>`:'<p class="muted" style="margin:0">No coin purchases or gifts yet. Buy a pack below for Live gifts.</p>',A=c.length>0?`<ul class="list-plain">${c.slice(0,8).map(x=>`<li>
          <span>
            <strong>${l(x.note||x.label||"Live gift")}</strong>
            <span class="chip">80/20 NET</span>
            ${x.giftSlug?`<span class="chip">${l(x.giftSlug)}</span>`:""}
            <br/><span class="muted" style="font-size:12px">gross ${W(x.gross)} · fees ${W(x.fees)} · net ${W(x.net)} · ${F(x.at)}</span>
          </span>
          <span style="text-align:right;font-size:13px">
            <strong>${W(x.creatorShare)}</strong><br/>
            <span class="muted">PIKK ${W(x.dbsShare)}</span>
          </span>
        </li>`).join("")}</ul>
        <p class="muted" style="font-size:12px;margin:8px 0 0">Creator-only split view. Live viewers never see 80/20.</p>`:'<p class="muted" style="margin:0">No coin-gift earnings yet. When viewers send catalog gifts on Live, your <strong>80% of NET</strong> lands here (TEST MODE: listed USD = net, 0% external fee).</p>',w=d.length>0?`<div style="overflow-x:auto">
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
          ${d.map(x=>`<tr style="border-top:1px solid rgba(255,255,255,.06)">
            <td style="padding:8px 4px"><strong>${l(x.label)}</strong><br/><span class="muted" style="font-size:11px">${x.creatorPct}/${x.dbsPct} · ${x.count} line${x.count===1?"":"s"}</span></td>
            <td style="padding:8px 4px">${W(x.gross)}</td>
            <td style="padding:8px 4px">${W(x.fees)}</td>
            <td style="padding:8px 4px">${W(x.net)}</td>
            <td style="padding:8px 4px"><strong>${W(x.creatorShare)}</strong></td>
            <td style="padding:8px 4px">${W(x.dbsShare)}</td>
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
            <br/><span class="muted" style="font-size:12px">${l(x.note)} · ${F(x.at)}</span>
          </span>
          <span style="text-align:right;font-size:13px">
            <strong>${W(x.creatorShare)}</strong><br/>
            <span class="muted">gross ${W(x.gross)}</span>
          </span>
        </li>`).join("")}</ul>`:"",C=g.length>0?g.map(x=>`<div class="card" style="margin:0 0 10px;background:#12121a" data-payout="${l(x.id)}">
        <div class="row wrap">
          <strong>${W(x.amount)}</strong>
          <span class="chip">${l(Mm[x.status]||x.status)}</span>
          <span class="muted spacer" style="text-align:right;font-size:12px">${F(x.at)}</span>
        </div>
        <p class="muted" style="margin:6px 0;font-size:12px">${l(x.note||"Payout")} · ${(x.earningIds||[]).length} earning line(s)</p>
        ${x.status==="pending"?`<div class="row wrap">
                <button class="btn primary payout-status" data-id="${l(x.id)}" data-status="completed">Mark completed · demo</button>
                <button class="btn ghost payout-status" data-id="${l(x.id)}" data-status="rejected">Reject · release hold</button>
              </div>`:x.reviewedAt?`<p class="muted" style="margin:0;font-size:12px">Reviewed ${F(x.reviewedAt)}</p>`:""}
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
        <div class="pikk-wallet-metric"><span>Gift coins</span><strong>${Bs(a)}</strong><small>Live gifting · demo</small></div>
        <div class="pikk-wallet-metric"><span>Fan USD credits</span><strong>${W(i.balance)}</strong><small>Tips and requests · demo</small></div>
        <div class="pikk-wallet-metric"><span>Creator available</span><strong>${W(r.available)}</strong><small>Eligible balance · demo</small></div>
        <div class="pikk-wallet-metric"><span>Creator on hold</span><strong>${W(r.holds)}</strong><small>Payout review · demo</small></div>
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
      <div style="font-size:32px;font-weight:900;margin-top:8px">${Bs(a)} <span class="muted" style="font-size:16px;font-weight:600">coins</span></div>
      <p class="muted" style="margin:4px 0 12px">≈ ${W(a*.02)} · stored in <code>dbs_v1.coins</code> (not USD <code>wallet</code>). Used for Live gift tray.</p>
      <h4 style="margin:0 0 8px;font-size:14px">Buy coin pack</h4>
      <div class="grid-2" style="gap:10px">${S}</div>
      <p class="muted" style="font-size:12px;margin:10px 0 0">No discounts · packs ${pi.map(x=>`${x.coins}/$${x.usd}`).join(" · ")}. Demo credit only — no payment processor.</p>
      <h4 style="margin:16px 0 8px;font-size:14px">Recent coin activity</h4>
      ${$}
      <div class="row wrap" style="margin-top:12px">
        <a class="btn ghost" href="#/live">Go to Live · send gifts</a>
        <a class="btn ghost" href="#/earnings?cat=gifts">Gift earnings</a>
      </div>
    </div>

    <div class="card">
      <h3>Fan spendable USD credits</h3>
      <div style="font-size:32px;font-weight:900">${W(i.balance)}</div>
      <p class="muted" style="margin:4px 0 12px">Tips &amp; song requests on this device (<code>dbs_v1.wallet</code>). Separate from gift coins.</p>
      <div class="row wrap">
        <button class="btn primary" id="fanCredit5">Add $5 demo credit</button>
        <button class="btn" id="fanCredit25">Add $25</button>
        <a class="btn ghost" href="#/live">Go to Live</a>
      </div>
      <h4 style="margin:16px 0 8px;font-size:14px">Recent fan USD activity</h4>
      ${v}
    </div>

    <div class="card">
      <h3>Creator redeemable balance</h3>
      <div class="grid-2">
        <div>
          <p class="muted" style="margin:0;font-size:12px">Available to payout</p>
          <div style="font-size:28px;font-weight:900">${W(r.available)}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Holds / in review</p>
          <div style="font-size:28px;font-weight:900">${W(r.holds)}</div>
        </div>
      </div>
      <div class="row wrap" style="margin-top:10px">
        <span class="chip">Threshold ${W(r.threshold)}</span>
        <span class="chip">Holds / refunds · demo</span>
        ${f?'<span class="chip">Payout pending</span>':""}
      </div>
      <div class="row wrap" style="margin-top:12px">
        <button class="btn primary" id="cwPayout" ${b?"":"disabled"}>Request payout · TEST MODE</button>
        <button class="btn" id="cwSeed">${(r.earnings||[]).length?"Reload demo earnings":"Load demo earnings"}</button>
        <a class="btn ghost" href="#/earnings">Earnings overview</a>
      </div>
      ${b?'<p class="muted" style="margin:10px 0 0;font-size:12px">Moves available → holds and locks those earning lines until completed or rejected.</p>':`<p class="muted" style="margin:10px 0 0;font-size:12px">${f?"Finish or reject the pending payout before requesting another (anti double-payout).":`Need at least ${W(r.threshold)} available · currently ${W(r.available)}.`}</p>`}
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
  `;return _("Wallet & Payouts",B,{lead:"Creator Wallet & Payout Center · gift coins + fan USD · TEST MODE."})}function Im(e){var t,s,i,a,n;e.querySelectorAll(".coin-pack-btn").forEach(o=>{o.addEventListener("click",()=>{const r=Number(o.dataset.coins),d=cr(r);if((d==null?void 0:d.error)==="bad_package")return h("Unknown pack");if(d!=null&&d.error)return h("Could not buy coins");h(`+${r.toLocaleString()} coins · TEST MODE`),mt()})}),(t=e.querySelector("#fanCredit5"))==null||t.addEventListener("click",()=>{Zs(5,"Demo credit +$5"),h("+$5 fan credits"),mt()}),(s=e.querySelector("#fanCredit25"))==null||s.addEventListener("click",()=>{Zs(25,"Demo credit +$25"),h("+$25 fan credits"),mt()}),(i=e.querySelector("#cwSeed"))==null||i.addEventListener("click",()=>{const o=(fs().earnings||[]).length>0,r=vr({force:!0});h(o?"Demo earnings reloaded":`Loaded ${r.seeded||0} demo lines`),mt()}),(a=e.querySelector("#cwPayout"))==null||a.addEventListener("click",()=>{const o=zl();if((o==null?void 0:o.error)==="pending_exists")return h("Payout already pending");if((o==null?void 0:o.error)==="below_threshold")return h("Below payout threshold");if(o!=null&&o.error)return h("Could not request payout");h("Payout requested · held"),mt()}),(n=e.querySelector("#cwVerify"))==null||n.addEventListener("click",()=>{const r=fs().verification!=="demo_verified";Yl(r),h(r?"Demo verified":"Verification cleared"),mt()}),e.querySelectorAll(".payout-status").forEach(o=>{o.addEventListener("click",()=>{const r=Wl(o.dataset.id,o.dataset.status);if(r!=null&&r.error)return h("Could not update payout");h("Payout "+o.dataset.status),mt()})})}function qn(e){R(e||"#/earnings")}function ne(e){return"$"+Number(e||0).toFixed(2)}const Mo=[{id:"all",label:"All"},{id:"gifts",label:"Gifts"},{id:"tips",label:"Tips"},{id:"subscriptions",label:"Subscriptions"},{id:"clippers",label:"Clippers"},{id:"referrals",label:"Referrals"},{id:"sponsorships",label:"Sponsorships"},{id:"merch",label:"Merch"}];function Lo(){var t;const e=(((t=Ke().query)==null?void 0:t.cat)||"all").toLowerCase();return Mo.some(s=>s.id===e)?e:"all"}function Pm(e){return(e||[]).reduce((t,s)=>(t.gross+=Number(s.gross)||0,t.fees+=Number(s.fees)||0,t.net+=Number(s.net)||0,t.creatorShare+=Number(s.creatorShare)||0,t.dbsShare+=Number(s.dbsShare)||0,t),{gross:0,fees:0,net:0,creatorShare:0,dbsShare:0})}function Zt(e){return Math.round(Number(e)*100)/100}function _m(){const e=fs(),t=Hl(),s=Lo(),i=[...e.earnings||[]].sort((k,v)=>(v.at||0)-(k.at||0)),a=s==="all"?i:i.filter(k=>k.category===s||s==="subscriptions"&&k.category==="paid_content"),n=Pm(i),o=ka(),r=dr(),d=s==="gifts"?`<div class="card" style="margin:0 0 12px;background:#12121a">
      <div class="row wrap">
        <span class="chip">t185u · catalog gifts</span>
        <span class="chip">80% creator / 20% PIKK · NET</span>
        <span class="chip">TEST MODE · listed USD = net</span>
      </div>
      <p class="muted" style="margin:8px 0 0;font-size:13px">Coin gifts from Live use <code>sendLiveGift</code> → creator earnings here. Viewers on Live / gift tray never see this split. ${r.length?`${r.length} gift line(s) on device.`:"Send a catalog gift on an active Live to populate."}</p>
    </div>`:"",c=Mo.map(k=>{const v=k.id==="all"?"#/earnings":`#/earnings?cat=${k.id}`,S=k.id==="all"?i.length:i.filter(A=>A.category===k.id||k.id==="subscriptions"&&A.category==="paid_content").length,$=s===k.id;return`<a class="chip earn-filter${$?" active":""}" href="${v}" data-cat="${l(k.id)}" style="${$?"outline:1px solid var(--accent,#6dffb0);font-weight:700":""}">${l(k.label)}${S?` · ${S}`:""}</a>`}).join(""),p=Object.entries(t).map(([k,v])=>`<tr style="border-top:1px solid rgba(255,255,255,.06)">
        <td style="padding:8px 4px"><strong>${l(v.label)}</strong><br/><span class="muted" style="font-size:11px">${l(k)}</span></td>
        <td style="padding:8px 4px">${v.creatorPct}%</td>
        <td style="padding:8px 4px">${v.dbsPct}%</td>
      </tr>`).join(""),m=Object.entries(t).map(([k,v])=>`<option value="${l(k)}">${l(v.label)}</option>`).join(""),g=o.filter(k=>k.count>0).length>0?`<div style="overflow-x:auto;margin-top:8px">
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
            <td style="padding:8px 4px">${ne(k.gross)}</td>
            <td style="padding:8px 4px">${ne(k.fees)}</td>
            <td style="padding:8px 4px">${ne(k.net)}</td>
            <td style="padding:8px 4px"><strong>${ne(k.creatorShare)}</strong></td>
            <td style="padding:8px 4px">${ne(k.dbsShare)}</td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>`:"",f=a.length>0?`<ul class="list-plain">${a.map(k=>`<li style="align-items:flex-start">
          <span style="flex:1;min-width:0">
            <strong>${l(k.label||k.category)}</strong>
            ${k.payoutId?'<span class="chip">In payout</span>':'<span class="chip">Open</span>'}
            ${k.source==="seed"?'<span class="chip">Demo seed</span>':""}
            <br/><span class="muted" style="font-size:12px">${l(k.note||"")} · ${F(k.at)}</span>
            <br/><span class="muted" style="font-size:11px">gross ${ne(k.gross)} → fees ${ne(k.fees)} → net ${ne(k.net)} · creator ${k.creatorPct}% / PIKK ${k.dbsPct}%</span>
          </span>
          <span style="text-align:right;font-size:13px;white-space:nowrap">
            <strong>${ne(k.creatorShare)}</strong><br/>
            <span class="muted">PIKK ${ne(k.dbsShare)}</span>
          </span>
        </li>`).join("")}</ul>`:i.length===0?`<p class="muted" style="margin:0 0 12px">No earnings yet. Load demo lines or record a single demo earning below.</p>
           <button class="btn primary" id="earnSeed">Load demo earnings</button>`:'<p class="muted" style="margin:0">No lines in this category. <a href="#/earnings">Show all</a></p>',b=`
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
          <div style="font-size:26px;font-weight:900">${ne(e.available)}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Holds / in review</p>
          <div style="font-size:26px;font-weight:900">${ne(e.holds)}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Lifetime creator share</p>
          <div style="font-size:22px;font-weight:800">${ne(Zt(n.creatorShare))}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Lifetime PIKK share</p>
          <div style="font-size:22px;font-weight:800">${ne(Zt(n.dbsShare))}</div>
        </div>
      </div>
      <div class="row wrap" style="margin-top:10px">
        <span class="chip">Lifetime gross ${ne(Zt(n.gross))}</span>
        <span class="chip">Fees ${ne(Zt(n.fees))}</span>
        <span class="chip">Net ${ne(Zt(n.net))}</span>
        <span class="chip">Threshold ${ne(e.threshold)}</span>
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
      ${g?`<h4 style="margin:16px 0 0;font-size:14px">Totals by source (this device)</h4>${g}`:""}
    </div>

    <div class="card">
      <h3>Earnings ledger</h3>
      ${d}
      <div class="row wrap" style="margin:0 0 12px;gap:6px">${c}</div>
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
  `;return _("Creator Earnings",b,{lead:"Rewards, commissions & ledger · TEST MODE · payouts on Wallet (§27)."})}function Om(e){var t,s;(t=e.querySelector("#earnSeed"))==null||t.addEventListener("click",()=>{const i=(fs().earnings||[]).length>0,a=vr({force:!0});h(i?"Demo earnings reloaded":`Loaded ${a.seeded||0} demo lines`),qn(Nn(Lo()))}),(s=e.querySelector("#earnDemoForm"))==null||s.addEventListener("submit",i=>{var d,c,p;i.preventDefault();const a=((d=e.querySelector("#earnCat"))==null?void 0:d.value)||"tips",n=Number((c=e.querySelector("#earnGross"))==null?void 0:c.value),o=(((p=e.querySelector("#earnNote"))==null?void 0:p.value)||"").trim()||"Manual demo earning";if(!(n>0))return h("Enter a positive gross amount");const r=ya({category:a,gross:n,note:o,source:"manual_demo"});h(`Recorded ${ne(r.creatorShare)} creator share`),qn(Nn(a))})}function Nn(e){return!e||e==="all"?"#/earnings":`#/earnings?cat=${e}`}function ht(){R("#/missions")}const Bn={song:"Song",album:"Album",video:"Video",live:"Livestream",app:"DBS App",interview:"Interview"};function qm(e){return"$"+Number(e||0).toFixed(0)}function Nm(e){const t=Number(e)||0;if(!t)return"No deadline";const s=t-Date.now();if(s<0)return`Ended ${Math.ceil(-s/864e5)}d ago`;const i=Math.ceil(s/864e5);return i<=1?"Due today / tomorrow":`${i}d left`}function Bm(e=14){return new Date(Date.now()+e*864e5).toISOString().slice(0,10)}function Rs(){const{user:e}=D();if(e)return e;const t=jt("DemoCreator");return h("Signed in as DemoCreator · local demo"),t||D().user}function Rm(){const{user:e}=D(),t=fi().sort((p,m)=>(m.createdAt||0)-(p.createdAt||0)),s=t.filter(p=>p.status==="active"||p.status==="paused"),i=t.filter(p=>p.status==="ended"||p.status==="draft"),a=new Set(t.flatMap(p=>(p.participants||[]).map(m=>m.userId).filter(Boolean))).size,n=t.reduce((p,m)=>p+(m.submissions||[]).length,0),o=p=>{const m=p.fundSource==="third_party"?'<span class="chip">20% management fee · disclosed</span>':'<span class="chip">DBS-funded · marketing expense</span>',g=Tc(p.id),f=e&&(p.participants||[]).some($=>$.userId===e.id),b=(p.submissions||[]).filter($=>e&&$.userId===e.id),k=g.length>0?g.slice(0,8).map(($,A)=>`<tr style="border-top:1px solid rgba(255,255,255,.06)">
              <td style="padding:6px 4px">${A+1}</td>
              <td style="padding:6px 4px"><strong>${l($.username)}</strong>
                ${$.referralCode?`<br/><span class="muted" style="font-size:11px">${l($.referralCode)}</span>`:""}
              </td>
              <td style="padding:6px 4px">${$.score}</td>
              <td style="padding:6px 4px">${$.submissions}</td>
            </tr>`).join(""):'<tr><td colspan="4" class="muted" style="padding:8px 4px">No participants yet — join to appear on the board.</td></tr>',v=(p.submissions||[]).length>0?`<ul class="list-plain" style="margin-top:8px">${(p.submissions||[]).slice(0,5).map($=>`<li style="align-items:flex-start">
              <span style="flex:1;min-width:0">
                <strong>${l($.username)}</strong>
                <span class="chip">${l($.status||"pending")}</span>
                <br/><span style="font-size:13px">${l($.proof)}</span>
                <br/><span class="muted" style="font-size:11px">${F($.at)} · Manual review</span>
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
        <span class="chip">${l(Bn[p.promoteType]||p.promoteType)}</span>
        <span class="chip">${l(p.status)}</span>
        <span class="chip">Budget ${qm(p.budget)}</span>
        <span class="chip">${l(Nm(p.deadline))}</span>
        ${m}
        <span class="muted spacer" style="text-align:right;font-size:12px">${F(p.createdAt)}</span>
      </div>
      <h3 style="margin:10px 0 4px">${l(p.title)}</h3>
      <p class="muted" style="margin:0 0 6px;font-size:13px">${l(p.reward||"")}</p>
      <p class="muted" style="margin:0;font-size:12px">
        Fund: <strong>${p.fundSource==="third_party"?"Third-party":"DBS"}</strong>
        ${p.fundSource==="third_party"?" · 20% management fee (disclosed)":" · not a creator commission — marketing expense"}
        · ${(p.participants||[]).length} joined · ${(p.submissions||[]).length} submissions
        ${f?` · your proofs: ${b.length}`:""}
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
      ${v}
    </article>`},r=s.length?s.map(o).join(""):t.length?'<div class="card"><p class="muted" style="margin:0">No active or paused missions. Create one or resume from archive.</p></div>':"",d=i.length>0?`<div class="card"><h3>Archive</h3>${i.map(o).join("")}</div>`:"",c=`
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
              ${Object.entries(Bn).map(([p,m])=>`<option value="${p}">${l(m)}</option>`).join("")}
            </select>
          </div>
          <div class="field"><label>Budget (USD)</label><input name="budget" id="msnBudget" type="number" min="0" step="1" value="500" /></div>
        </div>
        <div class="grid-2">
          <div class="field"><label>Deadline</label><input name="deadline" id="msnDeadline" type="date" value="${Bm(14)}" /></div>
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

    <section class="pikk-missions-archive">${d}</section>
    </div>
  `;return _("Missions",c,{lead:"Promotional campaigns · Clippers & creators · TEST MODE (§6)."})}function jm(e){var t,s,i;(t=e.querySelector("#msnSeed"))==null||t.addEventListener("click",()=>{const a=fi().length>0,n=Dc({force:!0});h(a?"Demo missions reloaded":`Loaded ${n.seeded||0} demo missions`),ht()}),(s=e.querySelector("#msnSignIn"))==null||s.addEventListener("click",()=>{Rs(),ht()}),(i=e.querySelector("#msnCreate"))==null||i.addEventListener("submit",a=>{var g,f,b,k,v,S;a.preventDefault();const n=((g=e.querySelector("#msnTitle"))==null?void 0:g.value)||"",o=((f=e.querySelector("#msnType"))==null?void 0:f.value)||"app",r=Number((b=e.querySelector("#msnBudget"))==null?void 0:b.value)||0,d=((k=e.querySelector("#msnDeadline"))==null?void 0:k.value)||"",c=((v=e.querySelector("#msnFund"))==null?void 0:v.value)||"dbs",p=((S=e.querySelector("#msnReward"))==null?void 0:S.value)||"",m=$c({title:n,promoteType:o,budget:r,deadline:d,fundSource:c,reward:p,status:"active"});if(m.error)return h("Title required");h(`Mission created · ${m.title}`),ht()}),e.querySelectorAll("[data-join]").forEach(a=>{a.addEventListener("click",()=>{Rs();const n=a.getAttribute("data-join"),o=Ec(n);if(o.error==="signin")return h("Sign in required");if(o.error==="already_joined")return h("Already joined");if(o.error==="not_active")return h("Mission not active");if(o.error)return h("Could not join");h("Joined mission · referral code assigned"),ht()})}),e.querySelectorAll("[data-bump]").forEach(a=>{a.addEventListener("click",()=>{Rs();const n=a.getAttribute("data-bump"),o=Cc(n,5);if(o.error)return h(o.error==="not_joined"?"Join first":"Bump failed");h("+5 demo points"),ht()})}),e.querySelectorAll("[data-status]").forEach(a=>{a.addEventListener("click",()=>{const n=a.getAttribute("data-status"),o=a.getAttribute("data-next");if(xc(n,o).error)return h("Status update failed");h(`Mission → ${o}`),ht()})}),e.querySelectorAll("form.msn-proof").forEach(a=>{a.addEventListener("submit",n=>{var c;n.preventDefault(),Rs();const o=a.getAttribute("data-id"),r=((c=a.querySelector('[name="proof"]'))==null?void 0:c.value)||"",d=Ac(o,{proof:r});if(d.error==="required")return h("Enter a URL or note");if(d.error==="not_joined")return h("Join first");if(d.error==="not_active")return h("Mission not active");if(d.error)return h("Submit failed");h("Proof submitted · pending manual review · +10 pts"),ht()})})}const Fm=[{id:"trending",label:"Trending"},{id:"following",label:"Following"},{id:"discover",label:"Discover"}];function Km(){return!!D().exploreDiscoverable}function Ae({href:e,title:t,meta:s,chip:i}){return`<a class="explore-hit" href="${l(e)}">
    <div>
      <strong>${l(t)}</strong>
      <div class="muted" style="font-size:12px;margin-top:2px">${l(s||"")}</div>
    </div>
    ${i?`<span class="chip">${l(i)}</span>`:""}
  </a>`}function Qe(e,t,s){return t?`<div class="card explore-section">
    <h3>${l(e)}</h3>
    <div class="explore-hits">${t}</div>
  </div>`:`<div class="card explore-section">
      <h3>${l(e)}</h3>
      <p class="muted" style="margin:0">${l(s||"No matches")}</p>
    </div>`}function ri(e){if(!e||!e.query)return`<div class="card" id="exploreResults">
      <p class="muted" style="margin:0">Search creators, fans, songs, albums, videos, posts, livestreams, and products. Exact locations are never indexed.</p>
    </div>`;const t=e.posts.length+e.profiles.length+e.music.length+e.videos.length+e.lives.length+e.products.length+e.pictures.length;if(!t)return`<div class="card" id="exploreResults">
      <p style="margin:0 0 6px"><strong>No results for “${l(e.query)}”</strong></p>
      <p class="muted" style="margin:0">Try another keyword, or browse Trending / Discover below. Report spam from a result’s destination page (demo shell).</p>
    </div>`;const s=e.posts.slice(0,8).map(m=>Ae({href:"#/posts",title:(m.text||"").slice(0,90)||"Post",meta:`@${m.username||"user"} · ${F(m.at||Date.now())}`,chip:"Post"})).join(""),i=e.profiles.slice(0,8).map(m=>Ae({href:`#/profile/${m.id}`,title:`@${m.username||m.id}`,meta:(m.bio||"Creator / fan").slice(0,80),chip:m.verified?"Verified":"Profile"})).join(""),a=e.music.slice(0,8).map(m=>Ae({href:"#/music",title:m.title,meta:`${m.artist||"Artist not credited"} · ${m.type}`,chip:m.type==="album"?"Album":"Song"})).join(""),n=e.videos.slice(0,8).map(m=>Ae({href:"#/videos",title:m.title,meta:`${m.artist||"Artist not credited"} · Video catalog`,chip:"Video"})).join(""),o=e.pictures.slice(0,8).map(m=>Ae({href:"#/home",title:m.title,meta:`${m.artist||"Creator not credited"} · picture`,chip:"Picture"})).join(""),r=e.lives.slice(0,8).map(m=>Ae({href:"#/live",title:m.title||"Livestream",meta:`@${m.hostName||"host"} · ${m.status==="live"?"LIVE now":"Ended"}`,chip:m.status==="live"?"Live":"Replay"})).join(""),d=e.products.slice(0,8).map(m=>Ae({href:"#/marketplace",title:m.title,meta:`${m.brand||"Brand"} · ${m.disclosure||"Sponsored"}`,chip:"Ad"})).join(""),c=e.query.toLowerCase(),p=[...It.filter(m=>m.title.toLowerCase().includes(c)||m.artist.toLowerCase().includes(c)||c.includes("music")||c.includes("song")||c.includes("album")).map(m=>Ae({href:"#/music",title:m.title,meta:`${m.artist} · ${m.status}`,chip:"Cover"})),...ge.filter(m=>m.title.toLowerCase().includes(c)||(m.artist||"").toLowerCase().includes(c)||c.includes("video")||c.includes("mv")).map(m=>Ae({href:"#/videos",title:m.title,meta:`${m.artist||"Artist not credited"} · Official MV`,chip:"MV"}))].join("");return`<div id="exploreResults">
    <p class="muted" style="margin:0 0 10px">${t} result${t===1?"":"s"} for “${l(e.query)}”</p>
    ${Qe("People",i,"No matching creators or fans")}
    ${Qe("Posts",s,"No matching posts")}
    ${Qe("Music (catalog)",a,"No published songs/albums")}
    ${Qe("Videos (catalog)",n,"No published videos")}
    ${Qe("Pictures",o,"No published pictures")}
    ${Qe("Livestreams",r,"No live or history matches")}
    ${Qe("Products / ads",d,"No marketplace listings")}
    ${p?Qe("Music-based picks",p):""}
  </div>`}function Gm(){const e=Ql(10);return e.length?`<div class="section-swipe explore-trend">
    ${e.map(t=>`<a class="preview-card" href="${l(t.href)}">
        <strong>${l(t.title)}</strong>
        <span class="muted">${l(t.subtitle)}${t.score?` · ♥${t.score}`:""}</span>
      </a>`).join("")}
  </div>`:'<p class="muted">Nothing trending yet — like posts or publish catalog items.</p>'}function Vm(){const e=D().user;if(!e)return'<div class="card"><p class="muted" style="margin:0">Sign in on <a href="#/profile">Profile</a> to see accounts you follow. Demo only — no exact locations.</p></div>';const t=e.following||[];return t.length?`<div class="card explore-section"><h3>Following</h3><div class="explore-hits">${t.map(i=>{var n;const a=((n=D().profiles)==null?void 0:n[i])||{id:i,username:i};return Ae({href:`#/profile/${encodeURIComponent(a.id)}`,title:`@${a.username||a.id}`,meta:(a.bio||"Following").slice(0,80),chip:"Following"})}).join("")}</div></div>`:`<div class="card"><p class="muted" style="margin:0">You're not following anyone yet. Discover suggested accounts below, then follow from their profile.</p></div>`}function Um(){const t=Xl().slice(0,8).map(i=>Ae({href:`#/profile/${encodeURIComponent(i.id)}`,title:`@${i.username}`,meta:(i.bio||"Suggested").slice(0,80),chip:i.verified?"Verified":"Suggest"})).join(""),s=It.map(i=>Ae({href:"#/music",title:i.title,meta:`${i.artist} · music-based`,chip:"Cover"})).join("");return`
    <div class="card">
      <h3>Discoverability (opt-in)</h3>
      <p class="muted" style="margin:0 0 10px">Appear in Explore suggestions. Off by default. No exact locations stored or shown.</p>
      <label class="row" style="gap:8px;align-items:center">
        <input type="checkbox" id="exploreDiscoverable" ${Km()?"checked":""} />
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
    </div>`}function Hm(){const e=D().exploreTab||"trending",t=Fm.map(a=>`<button type="button" role="tab" id="explore-tab-${a.id}" aria-controls="explorePanel" aria-selected="${a.id===e}" tabindex="${a.id===e?0:-1}" class="shop-chip${a.id===e?" on":""}" data-explore-tab="${a.id}">${l(a.label)}</button>`).join("");let s="";e==="following"?s=Vm():e==="discover"?s=Um():s=`<div class="card">
      <h3>Trending Across PIKK</h3>
      <p class="muted" style="margin:0 0 10px">High-engagement public posts and seeded demo cards (not a full engagement pipeline).</p>
      ${Gm()}
    </div>
    <div id="exploreResultsWrap">${ri(null)}</div>`;const i=`
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
  `;return _("Explore",i,{lead:"Universal search & discovery across PIKK.",badge:"Phase 2 demo"})}function Rn(e,t){var n,o,r,d,c,p,m;const s=Jl(t),i=e.querySelector("#exploreResultsWrap");if(i)i.innerHTML=ri(s);else{const g=e.querySelector("#explorePanel");if(g){let f=g.querySelector("#exploreLiveInsert");f||(f=document.createElement("div"),f.id="exploreLiveInsert",g.prepend(f)),f.innerHTML=ri(s)}}const a=(((n=s.posts)==null?void 0:n.length)||0)+(((o=s.profiles)==null?void 0:o.length)||0)+(((r=s.music)==null?void 0:r.length)||0)+(((d=s.videos)==null?void 0:d.length)||0)+(((c=s.lives)==null?void 0:c.length)||0)+(((p=s.products)==null?void 0:p.length)||0)+(((m=s.pictures)==null?void 0:m.length)||0);s.query&&h(a?`${a} result(s)`:"No matches")}function zm(e){var c;const t=e.querySelector("#exploreQ"),s=e.querySelector("#exploreGo"),i=e.querySelector("#exploreClear"),a=()=>Rn(e,(t==null?void 0:t.value)||"");s==null||s.addEventListener("click",a);function n(){var m;clearTimeout(o),t&&(t.value="");const p=e.querySelector("#exploreResultsWrap");p&&(p.innerHTML=ri(null)),(m=e.querySelector("#exploreLiveInsert"))==null||m.remove(),h("Cleared")}i==null||i.addEventListener("click",n);let o;t==null||t.addEventListener("input",()=>{clearTimeout(o),o=setTimeout(a,220)}),t==null||t.addEventListener("keydown",p=>{p.key==="Escape"&&t.value?(p.preventDefault(),n(),t.focus()):p.key==="Enter"&&(p.preventDefault(),clearTimeout(o),a())});const r=[...e.querySelectorAll("[data-explore-tab]")];function d(p,m=!1){var f;const g=(t==null?void 0:t.value)||"";if(clearTimeout(o),Xa({exploreTab:p}),R("/explore"),g.trim()){const b=document.getElementById("app"),k=b==null?void 0:b.querySelector("#exploreQ");k&&(k.value=g,Rn(b,g))}m&&((f=document.getElementById("explore-tab-"+p))==null||f.focus())}r.forEach((p,m)=>{p.addEventListener("click",()=>d(p.dataset.exploreTab)),p.addEventListener("keydown",g=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(g.key))return;g.preventDefault();const f=r.length-1,b=g.key==="Home"?0:g.key==="End"?f:(m+(g.key==="ArrowRight"?1:-1)+r.length)%r.length;d(r[b].dataset.exploreTab,!0)})}),(c=e.querySelector("#exploreDiscoverable"))==null||c.addEventListener("change",p=>{Xa({exploreDiscoverable:!!p.target.checked}),h(p.target.checked?"Discoverable on":"Discoverable off")})}let zs=null;function gt(e){R("#/giftbattles")}function jn(){zs&&(clearInterval(zs),zs=null)}function se(e){return"$"+Number(e||0).toFixed(2)}function Io(e){const t=Math.max(0,Math.ceil(e/1e3)),s=Math.floor(t/60),i=t%60;return`${s}:${String(i).padStart(2,"0")}`}function Wm(){return _("Gift Battles",`<div class="card">
      <h3>Sign in required</h3>
      <p class="muted">Gift battles need a local demo account so scores and history persist on this device.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,{lead:"Runs during Live · not a separate stream · voluntary support · TEST MODE"})}function Ym(){return`
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
    </div>`}function Jm(e){if(!e)return`
      <div class="card">
        <h3>Champion Spotlight</h3>
        <p class="muted" style="margin:0">No active champion today. Win a battle to claim the rest-of-day banner.</p>
      </div>`;const t=Math.max(0,(e.championUntil||0)-Date.now()),s=Math.floor(t/36e5),i=Math.floor(t%36e5/6e4);return`
    <div class="card gb-champion" role="status">
      <div class="row wrap" style="gap:8px;align-items:center">
        <span class="gb-sticker-slot" aria-hidden="true">${Fa("battle-crown",{className:"gift-sticker gift-sticker--battle"}).html}</span>
        <div class="chip">Challenge Winner · rest of day</div>
      </div>
      <h3 class="gb-champion-name">${l(e.username)}</h3>
      <p class="muted" style="margin:0">
        Score ${l(se(e.score))} · ~${s}h ${i}m left today
        · ${l(e.mode||"demo")}
      </p>
    </div>`}function Qm(e,t){return e?`
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
    </div>`}function Xm(e){return`
    <div class="card gb-battle" data-gb-status="pending">
      <h3>Challenge pending</h3>
      <p><strong>${l(e.challenger.name)}</strong> challenged <strong>${l(e.opponent.name)}</strong></p>
      <p class="muted">Mode: ${l(e.mode)} · opponent must Accept or Decline (demo controls below).</p>
      <div class="row wrap" style="gap:8px;margin-top:12px">
        <button type="button" class="btn primary" id="gbAccept">Accept</button>
        <button type="button" class="btn ghost" id="gbDecline">Decline</button>
      </div>
    </div>`}function Zm(e){const t=Math.max(0,(e.endsAt||0)-Date.now()),s=Io(t);return`
    <div class="card gb-battle" data-gb-status="active">
      <div class="gb-countdown" aria-live="polite" aria-atomic="true">
        <span class="gb-countdown-label">Time left</span>
        <span class="gb-countdown-clock" id="gbClock">${l(s)}</span>
      </div>
      <div class="gb-scoreboard" role="group" aria-label="Live battle scores">
        <div class="gb-side">
          <div class="muted">Challenger</div>
          <strong>${l(e.challenger.name)}</strong>
          <div class="gb-score" id="gbScoreA" aria-label="Challenger score ${l(se(e.scoreA))}">${l(se(e.scoreA))}</div>
        </div>
        <div class="gb-vs" aria-hidden="true">VS</div>
        <div class="gb-side">
          <div class="muted">Opponent</div>
          <strong>${l(e.opponent.name)}</strong>
          <div class="gb-score" id="gbScoreB" aria-label="Opponent score ${l(se(e.scoreB))}">${l(se(e.scoreB))}</div>
        </div>
      </div>
      <p class="muted gb-score-text" id="gbScoreText">
        Live score: ${l(e.challenger.name)} ${l(se(e.scoreA))} —
        ${l(e.opponent.name)} ${l(se(e.scoreB))}
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
    </div>`}function eh(e){var a,n;let t="Tie",s="Equal voluntary support · recognition for both";e.result==="win"&&e.winnerName?(t=`Winner · ${e.winnerName}`,s="Recognition only — no opponent funds transferred"):e.result==="declined"&&(t="Declined",s="Challenge was declined");const i=e.result==="win"?Fa("battle-win",{className:"gift-sticker gift-sticker--battle"}).html:"";return`
    <div class="card gb-battle gb-ended" data-gb-status="ended">
      <div class="row wrap" style="gap:8px;align-items:center">
        ${i?`<span class="gb-sticker-slot" aria-hidden="true">${i}</span>`:""}
        <div class="chip">${e.result==="win"?"Winner":e.result==="tie"?"Tie":"Ended"}</div>
      </div>
      <h3 class="gb-winner-banner">${l(t)}</h3>
      <p class="muted">${l(s)}</p>
      <p class="gb-score-text" style="margin:12px 0">
        Final: ${l(((a=e.challenger)==null?void 0:a.name)||"?")} ${l(se(e.scoreA))} —
        ${l(((n=e.opponent)==null?void 0:n.name)||"?")} ${l(se(e.scoreB))}
      </p>
      <button type="button" class="btn primary" id="gbClear">New challenge</button>
    </div>`}function th(e,t){var a;const i=Sr().map(n=>`<option value="${l(n.id)}">${l(n.name)} — ${l(n.bio)}</option>`).join("");return`
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
      <p class="muted" style="margin:10px 0 0">Wallet: <strong id="gbWalletBal">${l(se(((a=D().wallet)==null?void 0:a.balance)||0))}</strong> · TEST MODE</p>
    </div>`}function sh(){const e=Aa(10),t=e.length?e.map((s,i)=>`<li class="gb-day-row">${it("battle-win",{className:"gift-sticker gift-sticker--xs"})}<span class="chip">#${i+1}</span><strong>${l(s.username)}</strong></li>`).join(""):'<li class="muted">No winners yet today · win a 60s battle</li>';return`
    <div class="card gb-day-board" id="gbDayWinners">
      <div class="row wrap" style="justify-content:space-between;gap:8px">
        <h3 style="margin:0">Today&apos;s winners</h3>
        <span class="chip">${e.length}/10 · end of day</span>
      </div>
      <p class="muted" style="margin:6px 0 8px;font-size:12px">Sticker board · recognition only · TEST MODE</p>
      <ol class="gb-list gb-day-list">${t}</ol>
    </div>`}function ih(){const e=oc(12),t=cc(15),s=e.length?e.map(a=>{var o,r;const n=a.result==="win"?`Winner ${a.winnerName}`:a.result==="tie"?"Tie":a.result||a.status;return`<li>
            <strong>${l(n)}</strong>
            <span class="muted"> · ${l(((o=a.challenger)==null?void 0:o.name)||"?")} ${l(se(a.scoreA))} vs ${l(((r=a.opponent)==null?void 0:r.name)||"?")} ${l(se(a.scoreB))} · ${l(F(a.endedAt||a.createdAt||0))} · ${l(a.mode||"")}</span>
          </li>`}).join(""):'<li class="muted">No battles yet.</li>';return`
    <div class="card">
      <h3>Top winners (local)</h3>
      <ol class="gb-list">${t.length?t.map((a,n)=>`<li><span class="chip">#${n+1}</span> <strong>${l(a.username)}</strong> <span class="muted">${a.wins} win${a.wins===1?"":"s"} · ${l(se(a.points))} battle pts</span></li>`).join(""):'<li class="muted">Win a battle to appear here.</li>'}</ol>
    </div>
    <div class="card">
      <h3>Battle history</h3>
      <ul class="gb-list">${s}</ul>
    </div>`}function ah(e){return`
    <div class="card">
      <h3>Battle prefs</h3>
      <label class="toggle"><span>Allow battle invitations</span>
        <input type="checkbox" id="gbPrefInvites" ${e.invitationsEnabled?"checked":""}/>
      </label>
      <p class="muted" style="margin:8px 0 0">When off, new challenges are blocked. Existing active battles can still finish.</p>
    </div>`}function nh(){const{user:e,live:t}=D();if(!e)return Wm();Ea();const s=$a(),i=Sa(),a=lc(),n=!!(t&&!t.endedAt);let o="";(s==null?void 0:s.status)==="pending"?o=Xm(s):(s==null?void 0:s.status)==="active"?o=Zm(s):(s==null?void 0:s.status)==="ended"?o=eh(s):o=th(n,i);const r=`
    ${Ym()}
    ${Jm(a)}
    ${sh()}
    ${Qm(n,t)}
    ${o}
    ${ih()}
    ${ah(i)}
  `;return _("Gift Battles",r,{lead:"Runs during Live · not a separate stream · 60s voluntary gift battles · not wagers · TEST MODE",badge:(s==null?void 0:s.status)==="active"?"BATTLE":a?"CHAMP":void 0})}function rh(e){var i,a,n,o,r,d,c;jn(),(i=e.querySelector("#gbPrefInvites"))==null||i.addEventListener("change",p=>{ec({invitationsEnabled:p.target.checked}),h(p.target.checked?"Invitations on":"Invitations off")}),(a=e.querySelector("#gbTopUp"))==null||a.addEventListener("click",()=>{var m;Zs(10,"Gift battle demo top-up · TEST MODE"),h("+$10 demo wallet");const p=e.querySelector("#gbWalletBal");p&&(p.textContent=se(((m=D().wallet)==null?void 0:m.balance)||0))});const t=p=>{const m=e.querySelector("#gbOpponent"),g=m==null?void 0:m.value,f=Sr().find(k=>k.id===g),b=tc({opponentId:g,opponentName:f==null?void 0:f.name,mode:p});if((b==null?void 0:b.error)==="signin")return h("Sign in first");if((b==null?void 0:b.error)==="invites_disabled")return h("Invitations disabled");if((b==null?void 0:b.error)==="not_live")return h("Not live — use sandbox");if((b==null?void 0:b.error)==="battle_in_progress")return h("Battle already in progress");if((b==null?void 0:b.error)==="self")return h("Pick another fan");h("Challenge sent · waiting for accept"),gt()};(n=e.querySelector("#gbStartLive"))==null||n.addEventListener("click",()=>t("live")),(o=e.querySelector("#gbStartSandbox"))==null||o.addEventListener("click",()=>t("sandbox")),(r=e.querySelector("#gbAccept"))==null||r.addEventListener("click",()=>{const p=sc();if((p==null?void 0:p.error)==="no_pending")return h("No pending challenge");if((p==null?void 0:p.error)==="invites_disabled")return h("Invitations disabled");h("Battle started · 1:00"),gt()}),(d=e.querySelector("#gbDecline"))==null||d.addEventListener("click",()=>{const p=ic();if(p!=null&&p.error)return h(String(p.error));h("Challenge declined"),gt()}),(c=e.querySelector("#gbClear"))==null||c.addEventListener("click",()=>{const p=ac();if(p!=null&&p.error)return h("Battle still running");gt()}),e.querySelectorAll("[data-gb-gift]").forEach(p=>{p.addEventListener("click",()=>{var v;const m=rc({side:p.dataset.gbGift,kind:p.dataset.kind||"gift",amount:Number(p.dataset.amt)||2,label:p.dataset.label||""});if((m==null?void 0:m.error)==="signin")return h("Sign in first");if((m==null?void 0:m.error)==="no_active"||(m==null?void 0:m.error)==="ended")return h("No active battle");if((m==null?void 0:m.error)==="offline")return h("Live offline — use sandbox");if((m==null?void 0:m.error)==="insufficient")return h("Need wallet credits");if(h(p.dataset.gbGift==="opponent"?"Opponent support (demo)":"Support sent · demo"),((v=m.battle)==null?void 0:v.status)==="ended"){h(m.battle.result==="win"?`Winner · ${m.battle.winnerName}`:"Tie!"),gt();return}const g=e.querySelector("#gbScoreA"),f=e.querySelector("#gbScoreB"),b=e.querySelector("#gbScoreText"),k=m.battle;g&&f&&k?(g.textContent=se(k.scoreA),g.setAttribute("aria-label",`Challenger score ${se(k.scoreA)}`),f.textContent=se(k.scoreB),f.setAttribute("aria-label",`Opponent score ${se(k.scoreB)}`),b&&(b.textContent=`Live score: ${k.challenger.name} ${se(k.scoreA)} — ${k.opponent.name} ${se(k.scoreB)}`)):gt()})});const s=e.querySelector("#gbClock");s&&(zs=setInterval(()=>{const p=Ea();if(!p||p.status==="ended"){jn(),(p==null?void 0:p.status)==="ended"&&h(p.result==="win"?`Winner · ${p.winnerName}`:"Tie!"),gt();return}const m=Math.max(0,(p.endsAt||0)-Date.now());s.textContent=Io(m)},250))}function ke(){R("#/multiguest")}function oh(e){return(String(e||"?").trim().slice(0,2)||"?").toUpperCase()}function lh(e){const t=D().user;return!t||!e?!1:(t.following||[]).includes(e)}function Ka(e){return((e==null?void 0:e.guests)||[]).filter(t=>t.status==="joined")}function ch(e){return((e==null?void 0:e.guests)||[]).filter(t=>t.status==="invited")}function ia(e,t){var i,a;return`${Number(((a=(i=e==null?void 0:e.giftSplit)==null?void 0:i.shares)==null?void 0:a[t])||0).toFixed(0)}%`}function dh(){return _("Multi-Guest Live",`<div class="card">
      <h3>Sign in required</h3>
      <p class="muted">Start a multi-guest demo session as host. No camera / WebRTC — fake stage tiles only.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,{lead:"Invite 2–4 co-hosts · disclosed gift splits · TEST MODE"})}function ph(){return`
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
    </div>`}function Ki({role:e,name:t,sub:s,muted:i,empty:a,followId:n}){if(a)return`
      <div class="mg-tile mg-tile-empty" aria-label="Empty guest slot">
        <div class="mg-avatar mg-avatar-empty">+</div>
        <div class="mg-tile-name muted">Open slot</div>
        <div class="mg-tile-sub muted">Invite a guest</div>
      </div>`;const o=i?'<span class="chip">Muted</span>':"",r=n&&n!=="dbs"?lh(n)?`<button class="btn ghost mg-follow" data-follow="${l(n)}" data-on="1">Following</button>`:`<button class="btn ghost mg-follow" data-follow="${l(n)}" data-on="0">Follow</button>`:n==="dbs"?'<a class="btn ghost" href="#/profile">Follow PIKK</a>':"";return`
    <div class="mg-tile ${e==="host"?"mg-tile-host":""} ${i?"mg-muted":""}">
      <div class="mg-avatar" aria-hidden="true">${l(oh(t))}</div>
      <div class="mg-tile-name">${l(t)}</div>
      <div class="mg-tile-sub">${l(s||"")} ${o}</div>
      <div class="mg-tile-actions">${r}</div>
    </div>`}function uh(e){var n,o;const t=Ka(e),s=[];s.push(Ki({role:"host",name:e.hostName,sub:"Host",followId:e.hostId===((n=D().user)==null?void 0:n.id)?"dbs":e.hostId}));for(let r=0;r<(e.maxGuests||4);r++){const d=t[r];d?s.push(Ki({role:"guest",name:d.username,sub:"Guest",muted:d.muted,followId:d.id})):s.push(Ki({empty:!0}))}const i=(o=e.giftSplit)!=null&&o.disclosed?'<span class="chip">Split disclosed</span>':'<span class="chip">Split pending</span>',a=e.broadcastReady?'<span class="chip">Broadcast ready</span>':'<span class="chip">Setup</span>';return`
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
    </div>`}function mh(e){const t=dc(),s=new Set((e.guests||[]).filter(p=>p.status==="invited"||p.status==="joined").map(p=>p.id)),i=t.filter(p=>p.id!==e.hostId&&!s.has(p.id)),a=ch(e),n=Ka(e),o=i.length?i.map(p=>`<option value="${l(p.id)}">${l(p.username)} — ${l(p.bio||"demo")}</option>`).join(""):'<option value="">No more demo guests</option>',r=a.length?a.map(p=>`
        <li class="mg-guest-row">
          <span><strong>@${l(p.username)}</strong> <span class="chip">Invited</span></span>
          <span class="row wrap" style="gap:6px">
            <button class="btn primary mg-accept" data-id="${l(p.id)}">Accept (sim)</button>
            <button class="btn ghost mg-decline" data-id="${l(p.id)}">Decline</button>
          </span>
        </li>`).join(""):'<li class="muted">No pending invites.</li>',d=n.length?n.map(p=>`
        <li class="mg-guest-row">
          <span>
            <strong>@${l(p.username)}</strong>
            ${p.muted?'<span class="chip">Muted</span>':'<span class="chip">On stage</span>'}
            <span class="muted" style="font-size:12px"> · gift ${l(ia(e,p.id))}</span>
          </span>
          <span class="row wrap" style="gap:6px">
            <button class="btn ghost mg-mute" data-id="${l(p.id)}" data-muted="${p.muted?"1":"0"}">
              ${p.muted?"Unmute":"Mute"}
            </button>
            <button class="btn ghost mg-leave" data-id="${l(p.id)}">Leave (sim)</button>
            <button class="btn ghost danger mg-remove" data-id="${l(p.id)}">Remove</button>
          </span>
        </li>`).join(""):'<li class="muted">No guests on stage yet — invite below.</li>',c=n.length+a.length>=(e.maxGuests||4);return`
    <div class="card">
      <h3>Guests &amp; moderation</h3>
      <p class="muted" style="margin:0 0 8px">Host simulates Accept/Decline. Up to ${l(String(e.maxGuests||4))} guests.</p>
      <ul class="mg-list">${d}</ul>
      <h4 style="margin:14px 0 6px">Pending invites</h4>
      <ul class="mg-list">${r}</ul>
      <div class="field" style="margin-top:12px">
        <span>Invite demo guest</span>
        <div class="row wrap" style="gap:8px;margin-top:6px">
          <select id="mgInviteSelect" ${c||!i.length?"disabled":""}>${o}</select>
          <button class="btn primary" id="mgInviteBtn" ${c||!i.length?"disabled":""}>Invite</button>
        </div>
      </div>
      ${c?'<p class="muted" style="margin:8px 0 0">Guest slots full (joined + pending).</p>':""}
    </div>`}function hh(e){var o,r;const t=Ka(e),s=[{id:e.hostId,username:e.hostName,role:"Host"},...t.map(d=>({id:d.id,username:d.username,role:"Guest"}))],i=((o=e.giftSplit)==null?void 0:o.mode)||"equal",a=!!((r=e.giftSplit)!=null&&r.disclosed),n=s.map(d=>{var p,m;const c=Number(((m=(p=e.giftSplit)==null?void 0:p.shares)==null?void 0:m[d.id])||0);return`
        <li class="mg-split-row">
          <span><strong>@${l(d.username)}</strong> <span class="chip">${l(d.role)}</span></span>
          ${i==="custom"&&!a?`<label class="mg-pct"><input type="number" min="0" max="100" step="1" class="mg-share-input" data-id="${l(d.id)}" value="${l(String(c))}" /> %</label>`:`<span class="chip">${l(String(Math.round(c)))}%</span>`}
        </li>`}).join("");return`
    <div class="card mg-split">
      <h3>Gift split disclosure</h3>
      <p class="muted">Required before broadcast when multiple hosts/guests share gifts. Display-only · TEST MODE · not a real payout.</p>
      <div class="row wrap" style="gap:8px;margin:10px 0">
        <button class="btn ${i==="equal"?"primary":"ghost"}" id="mgSplitEqual">Equal split</button>
        <button class="btn ${i==="custom"?"primary":"ghost"}" id="mgSplitCustom">Custom %</button>
      </div>
      <ul class="mg-list">${n}</ul>
      <p class="muted" style="margin:8px 0 0">Host share: <strong>${l(ia(e,e.hostId))}</strong>
        · Guests: ${t.length?t.map(d=>`@${l(d.username)} ${l(ia(e,d.id))}`).join(" · "):"none yet"}</p>
      ${a?`<p class="mg-ok" style="margin:10px 0 0">✓ Split disclosed ${e.giftSplit.disclosedAt?"· "+F(e.giftSplit.disclosedAt):""}. Broadcast ready (demo).</p>`:`<div class="row wrap" style="gap:8px;margin-top:12px">
               ${i==="custom"?'<button class="btn" id="mgSplitApply">Apply custom %</button>':""}
               <button class="btn primary" id="mgDisclose">Disclose &amp; ready broadcast</button>
             </div>
             <p class="muted" style="margin:8px 0 0">Custom % must total 100 among host + joined guests.</p>`}
    </div>`}function gh(e){return`
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
    </div>`}function Fn(e){return e.length?`
    <div class="card">
      <h3>Recent multi-guest sessions</h3>
      <ul class="mg-list">${e.slice(0,8).map(s=>{var a;const i=(s.guests||[]).filter(n=>n.status==="joined"||n.joinedAt).length;return`<li><strong>${l(s.title)}</strong> · ${l(String(i))} guests · ${F(s.endedAt||s.startedAt)}
        ${(a=s.giftSplit)!=null&&a.disclosed?" · split disclosed":""}</li>`}).join("")}</ul>
    </div>`:`
      <div class="card">
        <h3>Recent multi-guest sessions</h3>
        <p class="muted" style="margin:0">No ended sessions yet.</p>
      </div>`}function fh(e){return`
    <div class="card">
      <h3>Start multi-guest session</h3>
      <p class="muted">You host as <strong>@${l(e.username)}</strong>. Invite demo contacts next — no real stream.</p>
      <div class="field" style="margin-top:10px">
        <span>Session title</span>
        <input id="mgTitle" maxlength="80" placeholder="e.g. Friday collab freestyle" value="PIKK Multi-Guest Demo" />
      </div>
      <button class="btn primary" id="mgStart" style="margin-top:12px">Start as host</button>
    </div>`}function vh(){const t=D().user;if(!t)return dh();gi();const s=vs(),i=pc();return!s||s.endedAt?_("Multi-Guest Live",`${ph()}${fh(t)}${Fn(i)}`,{lead:"2–4 co-hosts · gift split disclosure · TEST MODE"}):_("Multi-Guest Live",`${uh(s)}${mh(s)}${hh(s)}${gh(s)}${Fn(i)}`,{lead:"Active collab session · fake stage · TEST MODE"})}function bh(e){var s,i,a,n,o,r,d,c,p;if(!e)return;(s=e.querySelector("#mgStart"))==null||s.addEventListener("click",()=>{var f;const m=((f=e.querySelector("#mgTitle"))==null?void 0:f.value)||"",g=uc(m);if(g.error==="signin")return h("Sign in first");if(g.error==="session_in_progress")return h("Session already active");h("Multi-guest session started"),ke()}),(i=e.querySelector("#mgEnd"))==null||i.addEventListener("click",()=>{const m=wc();if(m.error)return h(m.error==="host_only"?"Host only":"No session");h("Session ended"),ke()}),(a=e.querySelector("#mgInviteBtn"))==null||a.addEventListener("click",()=>{var f,b;const m=(f=e.querySelector("#mgInviteSelect"))==null?void 0:f.value;if(!m)return h("Pick a guest");const g=mc(m);if(g.error==="full")return h("Guest slots full");if(g.error==="already_invited")return h("Already invited");if(g.error)return h("Invite failed: "+g.error);h("Invited @"+(((b=g.guest)==null?void 0:b.username)||m)),ke()}),e.querySelectorAll(".mg-accept").forEach(m=>{m.addEventListener("click",()=>{var f;const g=hc(m.getAttribute("data-id"));if(g.error==="full")return h("Stage full");if(g.error)return h("Accept failed");h("@"+(((f=g.guest)==null?void 0:f.username)||"")+" joined"),ke()})}),e.querySelectorAll(".mg-decline").forEach(m=>{m.addEventListener("click",()=>{if(gc(m.getAttribute("data-id")).error)return h("Decline failed");h("Invite declined"),ke()})}),e.querySelectorAll(".mg-mute").forEach(m=>{m.addEventListener("click",()=>{const g=m.getAttribute("data-id"),f=m.getAttribute("data-muted")==="1";if(bc(g,!f).error)return h("Mute failed");h(f?"Unmuted":"Muted"),ke()})}),e.querySelectorAll(".mg-leave").forEach(m=>{m.addEventListener("click",()=>{if(fc(m.getAttribute("data-id")).error)return h("Leave failed");h("Guest left"),ke()})}),e.querySelectorAll(".mg-remove").forEach(m=>{m.addEventListener("click",()=>{if(vc(m.getAttribute("data-id")).error)return h("Remove failed");h("Guest removed"),ke()})}),e.querySelectorAll(".mg-follow").forEach(m=>{m.addEventListener("click",()=>{const g=m.getAttribute("data-follow");m.getAttribute("data-on")==="1"?(di(g),h("Unfollowed")):(ci(g),h("Following")),ke()})}),(n=e.querySelector("#mgSplitEqual"))==null||n.addEventListener("click",()=>{if(as({mode:"equal",disclose:!1}).error)return h("Split failed");h("Equal split applied"),ke()}),(o=e.querySelector("#mgSplitCustom"))==null||o.addEventListener("click",()=>{var f;const m=vs();if(as({mode:"custom",shares:((f=m==null?void 0:m.giftSplit)==null?void 0:f.shares)||{},disclose:!1}).error)return h("Could not switch to custom");h("Custom split — edit % then Apply"),ke()}),(r=e.querySelector("#mgSplitApply"))==null||r.addEventListener("click",()=>{const m={};e.querySelectorAll(".mg-share-input").forEach(f=>{m[f.getAttribute("data-id")]=Number(f.value)||0});const g=as({mode:"custom",shares:m,disclose:!1});if(g.error==="split_total")return h(`Percents total ${g.total}% — need 100%`);if(g.error)return h("Apply failed");h("Custom split saved"),ke()}),(d=e.querySelector("#mgDisclose"))==null||d.addEventListener("click",()=>{var f;const m=vs();if(((f=m==null?void 0:m.giftSplit)==null?void 0:f.mode)==="custom"){const b={},k=e.querySelectorAll(".mg-share-input");if(k.length){k.forEach(S=>{b[S.getAttribute("data-id")]=Number(S.value)||0});const v=as({mode:"custom",shares:b,disclose:!1});if(v.error==="split_total")return h(`Percents total ${v.total}% — need 100%`)}}const g=kc();if(g.error==="split_total")return h(`Percents total ${g.total}% — need 100%`);if(g.error)return h("Disclose failed");h("Gift split disclosed · broadcast ready (demo)"),ke()});const t=()=>{const m=e.querySelector("#mgChatInput"),g=(m==null?void 0:m.value)||"",f=yc(g);if(f.error==="empty")return h("Type a message");if(f.error)return h("Chat failed");m&&(m.value=""),ke()};(c=e.querySelector("#mgChatSend"))==null||c.addEventListener("click",t),(p=e.querySelector("#mgChatInput"))==null||p.addEventListener("keydown",m=>{m.key==="Enter"&&(m.preventDefault(),t())})}function we(e){R(e?`#/fanclubs?club=${encodeURIComponent(e)}`:"#/fanclubs")}function He(e="DemoFan"){const{user:t}=D();if(t)return t;const s=jt(e);return h(`Signed in as ${e} · local demo`),s||D().user}function Po(e){return e==="paid"?"Paid / Skeet+":e==="members"?"Members only":"Public"}function yh(e,t){const s=t===e.id,i=[e.official?'<span class="chip">Official DBS</span>':"",`<span class="chip">${l(Po(e.privacy))}</span>`,`<span class="chip">${e.memberCount||0} members</span>`].filter(Boolean).join(" ");return`<button type="button" class="fanclub-card${s?" on":""}" data-open-club="${l(e.id)}" data-search="${l(`${e.name||""} ${e.hostName||""} ${e.description||""}`)}" aria-label="Open ${l(e.name)} club">
    <div class="row" style="gap:10px;align-items:center">
      <img src="${l(e.graphic||"/brand/logo-dbs-v3@2x.webp")}" alt="" width="48" height="48" style="border-radius:12px;object-fit:cover;background:#111" />
      <div style="flex:1;min-width:0">
        <strong>${l(e.name)}</strong>
        <div class="muted" style="font-size:12px;margin-top:2px">Host @${l(e.hostName)} · Discover DatBoiSkeet</div>
        <div class="row wrap" style="gap:6px;margin-top:6px">${i}</div>
      </div>
    </div>
  </button>`}function kh(e){const t=Es(e);if(!t)return'<div class="card"><p class="muted" style="margin:0">Club not found.</p><button class="btn" data-back-list>Back to clubs</button></div>';const s=D().user,i=Pr(t.id),a=Yc(t.id),n=ys(t.id),o=_r(t.id),r=xt(),d=o.ok?"":`<div class="card" style="border-color:rgba(245,158,11,.35)">
          <h3 style="margin:0 0 6px">${t.privacy==="paid"?"Skeet+ room":"Members only"}</h3>
          <p class="muted" style="margin:0 0 10px">${t.privacy==="paid"?"This room uses membership permissions (Skeet+ or higher). TEST MODE unlock below — no real charge.":"Join the club to enter the discussion room."}</p>
          ${t.privacy==="paid"?`<button class="btn primary" id="fcUnlockSkeet">Unlock Skeet+ · TEST MODE</button>
                 <a class="btn" href="#/pricing">Pricing</a>
                 <p class="chip" style="margin-top:8px">Current membership: ${l(r||"none")}</p>`:`<button class="btn primary" data-join="${l(t.id)}">Join club</button>`}
        </div>`,c=o.ok?Jc(t.id):[],p=o.ok?c.length?c.map(g=>{const f=n?`<div class="row wrap" style="gap:6px;margin-top:6px">
                   <button class="btn ghost" data-pin="${l(g.id)}" data-club="${l(t.id)}">${g.pinned?"Unpin":"Pin"} · mod</button>
                   <button class="btn ghost" data-remove="${l(g.id)}" data-club="${l(t.id)}">Remove · mod</button>
                 </div>`:"";return`<li style="padding:10px 0;border-top:1px solid rgba(255,255,255,.06)">
              <div class="row" style="justify-content:space-between;gap:8px">
                <strong>@${l(g.username)}</strong>
                <span class="muted" style="font-size:12px">${l(F(g.at))}${g.pinned?" · pinned":""}</span>
              </div>
              <p style="margin:6px 0 0">${l(g.text)}</p>
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
            <span class="chip">${l(Po(t.privacy))}</span>
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
    ${d}
    ${o.ok?`<div class="card">
             <h3 style="margin:0 0 4px">Discussion</h3>
             <p class="muted" style="margin:0 0 8px;font-size:12px">Local posts in dbs_v1 · mods can pin/remove</p>
             <ul class="list-plain" id="fcPosts">${p}</ul>
           </div>
           ${m}`:""}
  `}function wh(e){var c;Fe();const t=Lr(),s=((c=e==null?void 0:e.query)==null?void 0:c.club)||"",{user:i}=D(),a=t.map(p=>yh(p,s)).join(""),n=t.filter(p=>p.privacy==="public").length,o=t.length-n,r=`
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
    </div>`,d=s?kh(s):`
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
    `;return _("Fan Clubs",`<div class="fanclubs-studio">${d}</div>`,{lead:"Creator communities inside DBS Lounge · DEMO.",badge:"Phase 2 demo"})}function Sh(e){var i,a,n,o,r,d,c;e.querySelectorAll("[data-fc-jump]").forEach(p=>p.addEventListener("click",()=>{var g;const m=p.getAttribute("data-fc-jump");(g=e.querySelector(`#${m}`))==null||g.scrollIntoView({behavior:"smooth",block:"start"})}));const t=e.querySelector("#fcSearch"),s=()=>{const p=String((t==null?void 0:t.value)||"").trim().toLocaleLowerCase(),m=[...e.querySelectorAll(".fanclub-card[data-search]")];let g=0;m.forEach(k=>{const v=(k.dataset.search||"").toLocaleLowerCase().includes(p);k.hidden=!v,v&&(g+=1)});const f=e.querySelector("#fcSearchStatus");f&&(f.textContent=`Showing ${g} of ${m.length} clubs`);const b=e.querySelector("#fcNoResults");b&&(b.hidden=g>0||!p)};t==null||t.addEventListener("input",s),t==null||t.addEventListener("keydown",p=>{p.key!=="Escape"||!t.value||(p.preventDefault(),p.stopPropagation(),t.value="",s())}),e.querySelectorAll("[data-open-club]").forEach(p=>{p.addEventListener("click",()=>we(p.getAttribute("data-open-club")))}),(i=e.querySelector("[data-back-list]"))==null||i.addEventListener("click",()=>we()),(a=e.querySelector("#fcSignIn"))==null||a.addEventListener("click",()=>{He("DemoFan"),we()}),(n=e.querySelector("#fcAdmin"))==null||n.addEventListener("click",()=>{var m,g;He("DemoAdmin");const p=!ie();ws(p),h(p?"Demo admin on":"Demo admin off"),we(((m=e.querySelector("[data-leave],[data-join]"))==null?void 0:m.getAttribute("data-leave"))||((g=e.querySelector("[data-join]"))==null?void 0:g.getAttribute("data-join"))||void 0)}),(o=e.querySelector("#fcSeedBtn"))==null||o.addEventListener("click",()=>{Fe({force:!0}),h("Demo clubs reseeded"),we()}),(r=e.querySelector("#fcCreateForm"))==null||r.addEventListener("submit",p=>{var v,S,$,A,w;p.preventDefault(),He("DemoCreator");const m=(v=e.querySelector("#fcName"))==null?void 0:v.value,g=(S=e.querySelector("#fcDesc"))==null?void 0:S.value,f=(($=e.querySelector("#fcGraphic"))==null?void 0:$.value)||"/brand/logo-dbs-v3@2x.webp",b=((A=e.querySelector("#fcPrivacy"))==null?void 0:A.value)||"public",k=Uc({name:m,description:g,graphic:f,privacy:b});if(k.error==="signin")return h("Sign in required");if(k.error==="name")return h("Name required");h("Club created · TEST MODE"),we((w=k.club)==null?void 0:w.id)}),e.querySelectorAll("[data-join]").forEach(p=>{p.addEventListener("click",()=>{He();const m=p.getAttribute("data-join");if(Ir(m).error)return h("Could not join");h("Joined club"),we(m)})}),e.querySelectorAll("[data-leave]").forEach(p=>{p.addEventListener("click",()=>{He();const m=p.getAttribute("data-leave"),g=Hc(m);if(g.error==="host")return h("Host cannot leave — transfer later");if(g.error)return h("Could not leave");h("Left club"),we(m)})}),e.querySelectorAll("[data-follow]").forEach(p=>{p.addEventListener("click",()=>{He();const m=p.getAttribute("data-follow");zc(m),h("Following · optional"),we(m)})}),e.querySelectorAll("[data-unfollow]").forEach(p=>{p.addEventListener("click",()=>{He();const m=p.getAttribute("data-unfollow");Wc(m),h("Unfollowed"),we(m)})}),(d=e.querySelector("#fcUnlockSkeet"))==null||d.addEventListener("click",()=>{He(),li("skeet+",!0),h("Skeet+ unlocked · TEST MODE");const p=new URLSearchParams(location.hash.split("?")[1]||"");we(p.get("club")||void 0)}),(c=e.querySelector("#fcPostForm"))==null||c.addEventListener("submit",p=>{var k;p.preventDefault(),He();const g=new URLSearchParams(location.hash.split("?")[1]||"").get("club"),f=(k=e.querySelector("#fcPostText"))==null?void 0:k.value,b=Qc(g,f);if(b.error==="gated")return h("Room gated");if(b.error==="empty")return h("Write something");if(b.error)return h("Could not post");h("Posted"),we(g)}),e.querySelectorAll("[data-pin]").forEach(p=>{p.addEventListener("click",()=>{const m=p.getAttribute("data-club");if(Xc(m,p.getAttribute("data-pin")).error==="mod")return h("Mods only");h("Pin toggled · TEST MODE"),we(m)})}),e.querySelectorAll("[data-remove]").forEach(p=>{p.addEventListener("click",()=>{const m=p.getAttribute("data-club");if(Zc(m,p.getAttribute("data-remove")).error==="mod")return h("Mods only");h("Post removed · TEST MODE"),we(m)})})}function aa(){R("#/loyalty")}function na(){const{user:e}=D();if(e)return e;const t=jt("LoyalFan");return h("Signed in as LoyalFan · local demo"),t||D().user}function js(e,t,s){var a;na();const i=Md(e,{points:t,note:s});if(i.error==="signin")return h("Sign in required");if(i.error==="cooldown")return h("Anti-farming · wait a few seconds");if(i.error==="daily_cap")return h("Daily cap hit · come back tomorrow (demo)");if(i.error)return h("Could not record");(i.newBadges||[]).filter(n=>n!=="day_one"||(i.loyalty.badges||[]).includes("day_one")),(a=i.newBadges)!=null&&a.length?h(`+${t} pts · badge: ${i.newBadges.join(", ")}`):h(`+${t} pts · ${s}`),aa()}function $h(){const{user:e}=D(),t=Cs(),i=eo().map(o=>{const r=o.unlocked;return`<div class="card" style="opacity:${r?1:.55};margin:0">
        <div class="row" style="justify-content:space-between;gap:8px">
          <strong>${l(o.name)}</strong>
          <span class="chip">${r?"Unlocked":"Locked"}</span>
        </div>
        <p class="muted" style="margin:6px 0 0;font-size:12px">${l(o.blurb)}</p>
      </div>`}).join(""),a=(t.history||[]).length===0?'<p class="muted" style="margin:0">No actions yet — try a listen tick or join a club.</p>':`<ul class="list-plain">${(t.history||[]).slice(0,12).map(o=>`<li style="padding:8px 0;border-top:1px solid rgba(255,255,255,.06)">
            <div class="row" style="justify-content:space-between">
              <span><strong>+${o.points}</strong> · ${l(o.note||o.kind)}</span>
              <span class="muted" style="font-size:12px">${l(F(o.at))}</span>
            </div>
          </li>`).join("")}</ul>`,n=t.publicVisible?"Your badges & points can appear on your profile (demo flag).":"History & achievements are private — only you see them here.";return _("Loyalty Club",`
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
    `,{lead:"Recognition for healthy participation · DEMO.",badge:"Phase 2 demo"})}function xh(e){var t,s,i,a,n,o;(t=e.querySelector("#loyListen"))==null||t.addEventListener("click",()=>js("listen",5,"Authorized listening tick")),(s=e.querySelector("#loyLive"))==null||s.addEventListener("click",()=>js("live",8,"Attended live (stub)")),(i=e.querySelector("#loyHelp"))==null||i.addEventListener("click",()=>js("help",6,"Shared community helper tip")),(a=e.querySelector("#loyClub"))==null||a.addEventListener("click",()=>{na(),Fe();const r=Lr(),d=r.find(c=>c.privacy==="public")||r[0];d&&Ir(d.id),js("club",10,d?`Joined ${d.name}`:"Joined Fan Club")}),(n=e.querySelector("#loyPublic"))==null||n.addEventListener("change",r=>{na(),Dd(r.target.checked),h(r.target.checked?"Public visibility on":"Achievements private"),aa()}),(o=e.querySelector("#loyReset"))==null||o.addEventListener("click",()=>{Ld(),h("Loyalty demo reset"),aa()})}function ft(){R("#/openmic")}function Gi(e="MicHopeful"){const{user:t}=D();if(t)return t;const s=jt(e);return h(`Signed in as ${e} · local demo`),s||D().user}function Kn(e){return`<span class="chip">${l(e==="approved"?"Approved":e==="rejected"?"Rejected":"Pending")}</span>`}function Eh(){const e=_d(),t=e.chipLabel||"House rotation",s=e.embed?We(e.embed,"rel=0"):"";return`
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
    </div>`}function Ah(){Ut();const{user:e}=D(),t=ie(),s=Pd(),i=e?Xi().filter(c=>c.userId===e.id):[],a=t?Xi({status:"pending"}):[],n=i.filter(c=>c.status==="pending").length,o=s.length===0?'<p class="muted" style="margin:0">No approved performers yet.</p>':s.map(c=>`<article class="card" style="margin:0 0 10px">
              <div class="row" style="justify-content:space-between;gap:8px">
                <div>
                  <strong>${l(c.trackTitle)}</strong>
                  <div class="muted" style="font-size:12px">@${l(c.username)} · ${l(c.talent)}</div>
                </div>
                ${Kn("approved")}
              </div>
              <p style="margin:8px 0 0">${l(c.profileNote||"Featured in PIKK Open Mic showcase.")}</p>
              <p class="muted" style="font-size:11px;margin:8px 0 0">Not a paid ranking · discovery showcase</p>
            </article>`).join(""),r=i.length===0?'<p class="muted" style="margin:0">You have no applications yet.</p>':`<ul class="list-plain">${i.map(c=>`<li style="padding:10px 0;border-top:1px solid rgba(255,255,255,.06)">
              <div class="row" style="justify-content:space-between">
                <strong>${l(c.trackTitle)}</strong>
                ${Kn(c.status)}
              </div>
              <div class="muted" style="font-size:12px">${l(c.talent)} · ${l(F(c.at))}</div>
            </li>`).join("")}</ul>`,d=t?`<div class="card">
         <h3 style="margin:0 0 8px">Admin review · TEST MODE</h3>
         <p class="muted" style="margin:0 0 10px;font-size:12px">Approve for showcase or reject. Distinct from pay-to-win.</p>
         ${a.length===0?'<p class="muted" style="margin:0">No pending applications.</p>':a.map(c=>`<div style="padding:10px 0;border-top:1px solid rgba(255,255,255,.06)">
                     <strong>${l(c.trackTitle)}</strong> · @${l(c.username)} · ${l(c.talent)}
                     <p class="muted" style="margin:4px 0;font-size:12px">${l(c.profileNote)}</p>
                     <p class="chip">Rights certified: ${c.rightsCertified?"yes":"no"}</p>
                     <div class="row wrap" style="gap:8px;margin-top:8px">
                       <button class="btn primary" data-om-approve="${l(c.id)}">Approve</button>
                       <button class="btn" data-om-reject="${l(c.id)}">Reject</button>
                     </div>
                   </div>`).join("")}
       </div>`:"";return _("Open Mic",`
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
    ${Eh()}

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

    ${d}

    <div class="card openmic-panel" id="omShowcaseCard">
      <h3 style="margin:0 0 8px">Approved showcase</h3>
      <p class="muted" style="margin:0 0 10px;font-size:12px">Featured performers · discovery, not spend rank</p>
      ${o}
    </div>
    </div>
    `,{lead:"24/7 house catalog when idle · opt-in talent showcase · DEMO.",badge:"Phase 2 demo"})}function Ch(e){var t,s,i,a,n;e.querySelectorAll("[data-om-jump]").forEach(o=>{o.addEventListener("click",()=>{const r=o.getAttribute("data-om-jump"),d=r==="omApplyCard"||r==="omShowcaseCard"?e.querySelector("#"+r):null;d==null||d.scrollIntoView({behavior:"smooth",block:"start"})})}),(t=e.querySelector("#omSignIn"))==null||t.addEventListener("click",()=>{Gi(),ft()}),(s=e.querySelector("#omAdmin"))==null||s.addEventListener("click",()=>{Gi("DemoAdmin");const o=!ie();ws(o),h(o?"Demo admin on":"Demo admin off"),ft()}),(i=e.querySelector("#omSeed"))==null||i.addEventListener("click",()=>{Ut({force:!0}),h("Open Mic demos reseeded"),ft()}),(a=e.querySelector("#omForm"))==null||a.addEventListener("submit",o=>{var c,p,m,g;o.preventDefault(),Gi();const r=(c=e.querySelector("#omRights"))==null?void 0:c.checked,d=qd({talent:(p=e.querySelector("#omTalent"))==null?void 0:p.value,trackTitle:(m=e.querySelector("#omTitle"))==null?void 0:m.value,profileNote:(g=e.querySelector("#omNote"))==null?void 0:g.value,rightsCertified:!!r});if(d.error==="rights")return h("Rights certification required");if(d.error==="title")return h("Title required");if(d.error==="pending")return h("You already have a pending application");if(d.error)return h("Could not submit");h("Application submitted · pending review"),ft()}),e.querySelectorAll("[data-om-approve]").forEach(o=>{o.addEventListener("click",()=>{if(Zi(o.getAttribute("data-om-approve"),"approved").error==="admin")return h("Admin only");h("Approved · showcase"),ft()})}),e.querySelectorAll("[data-om-reject]").forEach(o=>{o.addEventListener("click",()=>{if(Zi(o.getAttribute("data-om-reject"),"rejected","Demo reject").error==="admin")return h("Admin only");h("Rejected"),ft()})}),(n=e.querySelector("#omNextHouse"))==null||n.addEventListener("click",()=>{const o=Od();h("Next house · "+(o.chipLabel||"House")),ft()})}let Me=null,Lt="all";try{const e=sessionStorage.getItem("dbs_shop_cat");e&&(Lt=e,sessionStorage.removeItem("dbs_shop_cat"));const t=sessionStorage.getItem("dbs_shop_preview");t&&(Me=t,sessionStorage.removeItem("dbs_shop_preview"))}catch{}function Xe(){R("#/profile-shop")}function et(e){return Gs.find(t=>t.id===e)||null}function _o(e){return to(e)}function Th(e){const t={...e.equipped},s=Me?et(Me):null;if(s){const i=_o(s);i&&(t[i]=s.id)}return t}function Dh(e){return`rarity-${l(e||"rare")}`}function Mh(e){return`$${Number(e).toFixed(2)}`}function Lh(e){const{user:t}=D(),s=Th(e),i=s.frame?et(s.frame):null,a=s.effect?et(s.effect):null,n=s.banner?et(s.banner):null,o=s.nameStyle?et(s.nameStyle):null,r=s.badge?et(s.badge):null,d=(t==null?void 0:t.username)||"DemoFan",c=e.reduceMotion,p=a?`shop-fx shop-fx--${l(a.id.replace(/^fx-/,""))}${c?" shop-fx--still":""}`:"",m=o?`shop-name shop-name--${l(o.id.replace(/^name-/,""))}`:"shop-name",g=i?`shop-avatar-frame shop-frame--${l(i.id.replace(/^frame-/,""))}`:"shop-avatar-frame";return`
    <div class="shop-preview card" id="shopPreview">
      <div class="row wrap" style="justify-content:space-between;gap:8px;margin-bottom:10px">
        <h3 style="margin:0">Live preview</h3>
        <span class="chip">CONCEPT</span>
      </div>
      <div class="${n?`shop-preview-banner shop-banner--${l(n.id.replace(/^ban-/,""))}`:"shop-preview-banner shop-banner--default"}" aria-hidden="true">
        <span class="shop-banner-emoji">${n?l(n.emoji):"🎧"}</span>
      </div>
      <div class="shop-preview-body ${p}">
        <div class="${g}">
          <div class="shop-avatar-inner">${l(d.slice(0,1).toUpperCase())}</div>
          ${i?`<span class="shop-frame-emoji" aria-hidden="true">${l(i.emoji)}</span>`:""}
        </div>
        <div class="shop-preview-meta">
          <div class="${m}">${l(d)}</div>
          <p class="muted small" style="margin:4px 0 0">Cosmetic preview only · not a status grant</p>
          ${r?`<span class="shop-cosmetic-badge" title="Cosmetic style — not Verified/Founder">${l(r.emoji)} ${l(r.name)}</span>`:'<span class="muted small">No cosmetic badge equipped</span>'}
        </div>
      </div>
      <div class="shop-equipped-row">
        ${["frame","effect","banner","nameStyle","badge"].map(b=>{const k=s[b],v=k?et(k):null,S=b==="nameStyle"?"Name":b.charAt(0).toUpperCase()+b.slice(1);return`<span class="shop-eq-chip ${v?"on":""}">${l(S)}: ${v?l(v.emoji+" "+v.name):"—"}</span>`}).join("")}
      </div>
    </div>`}function Ih(e,t){const s=t.owned.includes(e.id),i=_o(e),a=i&&t.equipped[i]===e.id,n=Me===e.id;return`
    <article class="cosmetic-card ${Dh(e.rarity)} ${n?"is-selected":""} ${s?"is-owned":""} ${a?"is-equipped":""}" data-id="${l(e.id)}">
      <div class="cosmetic-art" role="button" tabindex="0" data-preview="${l(e.id)}" aria-label="Preview ${l(e.name)}">
        <span class="cosmetic-emoji">${l(e.emoji)}</span>
        <span class="concept-flag">CONCEPT</span>
        ${s?'<span class="owned-flag">Owned</span>':""}
        ${a?'<span class="equipped-flag">Equipped</span>':""}
      </div>
      <div class="body">
        <div class="name">${l(e.name)}</div>
        <div class="meta">${l(e.category)} · ${l(e.rarity)}</div>
        <div class="price">${Mh(e.price)} <span class="chip" style="margin-left:4px">TEST MODE</span></div>
        <div class="cosmetic-actions row wrap" style="gap:6px;margin-top:8px">
          <button type="button" class="btn ghost shop-act" data-act="preview" data-id="${l(e.id)}">Preview</button>
          ${s?a?`<button type="button" class="btn shop-act" data-act="unequip" data-slot="${l(i)}" data-id="${l(e.id)}">Unequip</button>`:`<button type="button" class="btn primary shop-act" data-act="equip" data-id="${l(e.id)}">Equip</button>`:`<button type="button" class="btn primary shop-act" data-act="unlock" data-id="${l(e.id)}">Unlock · TEST MODE</button>`}
        </div>
      </div>
    </article>`}function Ph(){const e=st(),t=Lt==="all"?Gs:Gs.filter(n=>n.category===Lt),s=Jo.map(n=>`<button type="button" class="shop-chip ${Lt===n.id?"on":""}" data-cat="${l(n.id)}" aria-pressed="${Lt===n.id?"true":"false"}">${l(n.label)}</button>`).join(""),i=t.length===0?'<p class="muted">No cosmetics in this category.</p>':`<div class="cosmetic-grid">${t.map(n=>Ih(n,e)).join("")}</div>`,a=`
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

    ${Lh(e)}

    <div class="card">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center;margin-bottom:10px">
        <h3 style="margin:0">Catalog · ${Gs.length} items</h3>
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
  `;return _("Profile Shop",a,{lead:"PIKK digital cosmetics · live preview · CONCEPT / TEST MODE.",badge:"Phase 2 · CONCEPT"})}function _h(e){var s,i,a;e.querySelectorAll(".shop-chip").forEach(n=>{n.addEventListener("click",()=>{Lt=n.dataset.cat||"all",Xe()})}),(s=e.querySelector("#shopReduceMotion"))==null||s.addEventListener("change",n=>{Ud(n.target.checked),h(n.target.checked?"Motion reduced":"Motion on"),Xe()}),(i=e.querySelector("#shopBundle"))==null||i.addEventListener("click",()=>{var o;const n=Fd();h(`Starter bundle unlocked · ${((o=n.unlocked)==null?void 0:o.length)||0} items · no charge`),Xe()}),(a=e.querySelector("#shopReset"))==null||a.addEventListener("click",()=>{Hd(),Me=null,h("Demo inventory reset"),Xe()});const t=n=>{Me=n,h("Preview updated"),Xe()};e.querySelectorAll("[data-preview]").forEach(n=>{n.addEventListener("click",()=>t(n.dataset.preview)),n.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),t(n.dataset.preview))})}),e.querySelectorAll(".shop-act").forEach(n=>{n.addEventListener("click",()=>{const o=n.dataset.act,r=n.dataset.id;if(o==="preview")return t(r);if(o==="unlock"){const d=jd(r);return d.error?h("Could not unlock"):(Me=r,h(d.already?"Already owned · TEST MODE":"Unlocked · TEST MODE · no charge"),Xe())}if(o==="equip"){const d=Gd(r);return d.error==="not_owned"?h("Unlock first · TEST MODE"):d.error?h("Could not equip"):(Me=r,h("Equipped"),Xe())}if(o==="unequip"){const d=n.dataset.slot;if(Vd(d).error)return h("Could not unequip");const p=Me?et(Me):null;return p&&to(p)===d&&(Me=null),h("Unequipped"),Xe()}})})}const Oh=["All","Hats","Shirts","Jackets"],qh=["Ladies Shop","Men's Shop","Beauty & Hair","Fashion & Accessories","Lifestyle & Home","Creator Brands","Live Shopping","Deals"];function Nh(e,t="All",s=""){const i=String(s||"").trim().toLocaleLowerCase();return e.filter(a=>(t==="All"||a.category===t)&&(!i||`${a.name} ${a.category}`.toLocaleLowerCase().includes(i)))}function Bh(e,t="featured"){const s=[...e];return t==="price-asc"?s.sort((i,a)=>Number(i.price)-Number(a.price)):t==="price-desc"?s.sort((i,a)=>Number(a.price)-Number(i.price)):t==="name-asc"?s.sort((i,a)=>String(i.name).localeCompare(String(a.name))):s}function Rh(e){return`
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
    </article>`}function jh(){const e=Oh.map(a=>`<button type="button" class="btn ${a==="All"?"primary":"ghost"} pikk-shop-filter"
      data-category="${l(a)}" aria-pressed="${a==="All"?"true":"false"}">${l(a)}</button>`).join(""),t=qh.map(a=>`<li><span>${l(a)}</span><span class="chip">Coming Soon</span></li>`).join(""),i=[Te.find(a=>a.id==="jacket-black")||Te.find(a=>a.category==="Jackets"),Te.find(a=>a.id==="hat-716-orange")||Te.find(a=>a.category==="Hats"),Te.find(a=>a.id==="tee-ptsd")||Te.find(a=>a.category==="Shirts")].filter(Boolean).map(a=>'<a class="pikk-shop-featured-product" href="'+l(a.shopUrl)+'" target="_blank" rel="noopener noreferrer" aria-label="View '+l(a.name)+' on Foreign X-Change"><img src="'+l(a.image)+'" alt="'+l(a.name)+'" loading="eager" decoding="async" /><span>'+l(a.category)+"</span></a>").join("");return _("PIKK Shop",`
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
      <p class="muted small" id="pikkShopCount" aria-live="polite">${Te.length} items</p>
      <div class="merch-grid pikk-shop-premium-grid pikk-shop-real-grid" id="pikkShopProducts">${Te.map(Rh).join("")}</div>
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
  `,{lead:"Physical merchandise · external checkout · future verified storefronts"})}function Fh(e){var g;const t=e.querySelector("#pikkShopSearch"),s=[...e.querySelectorAll(".pikk-shop-product")],i=[...e.querySelectorAll(".pikk-shop-filter, .pikk-shop-category")],a=e.querySelector("#pikkShopCount"),n=e.querySelector("#pikkShopEmpty"),o=e.querySelector("#pikkShopReset"),r=e.querySelector("#pikkShopSort"),d=e.querySelector("#pikkShopProducts"),c=new Map(s.map(f=>[f.dataset.productId,f]));let p="All";function m(){const f=new Set(Nh(Te,p,(t==null?void 0:t.value)||"").map(b=>b.id));for(const b of Bh(Te,(r==null?void 0:r.value)||"featured")){const k=c.get(b.id);k&&(d==null||d.appendChild(k))}for(const b of s){const k=f.has(b.dataset.productId);b.hidden=!k,b.style.display=k?"":"none"}if(a&&(a.textContent=`${f.size} ${f.size===1?"item":"items"}`),n&&(n.hidden=f.size>0),o){const b=p!=="All"||!!(t!=null&&t.value.trim())||((r==null?void 0:r.value)||"featured")!=="featured";o.hidden=!b,o.style.display=b?"":"none"}for(const b of i){const k=b.dataset.category===p;b.setAttribute("aria-pressed",String(k)),b.classList.contains("pikk-shop-filter")&&(b.classList.toggle("primary",k),b.classList.toggle("ghost",!k)),b.classList.toggle("on",k)}}t==null||t.addEventListener("input",m),t==null||t.addEventListener("keydown",f=>{f.key!=="Escape"||!t.value||(f.preventDefault(),f.stopPropagation(),t.value="",m())}),r==null||r.addEventListener("change",m),o==null||o.addEventListener("click",()=>{p="All",t&&(t.value=""),r&&(r.value="featured"),m(),t==null||t.focus()}),(g=e.querySelector("[data-shop-scroll]"))==null||g.addEventListener("click",()=>{var f,b,k;t==null||t.focus({preventScroll:!0}),(k=e.querySelector("#pikkShopCatalog"))==null||k.scrollIntoView({behavior:(b=(f=window.matchMedia)==null?void 0:f.call(window,"(prefers-reduced-motion: reduce)"))!=null&&b.matches?"instant":"smooth",block:"start"})});for(const f of i)f.addEventListener("click",()=>{var b;p=f.dataset.category||"All",m(),f.classList.contains("pikk-shop-category")&&((b=e.querySelector("#pikkShopCatalog"))==null||b.scrollIntoView({behavior:"auto",block:"start"}))})}let Ws=null;function de(){R("#/spotlight")}function Vi(){Ws&&(clearInterval(Ws),Ws=null)}function Oo(e){const t=Math.max(0,Math.ceil(e/1e3)),s=Math.floor(t/60),i=t%60;return`${s}:${String(i).padStart(2,"0")}`}function Ga(e){return e==="freestyle"?"Live Freestyle":e==="beat"?"Beat":e==="music_video"?"Music Video":"Song"}function Kh(e){const t=D().user;return!t||!e?!1:(t.following||[]).includes(e)}function Va(){return!!D().user}function Gh(){return _("24/7 Spotlight",`<div class="card">
      <h3>Sign in required</h3>
      <p class="muted">Join the FIFO Spotlight queue, vote Keep Going / Play Another, and chat from a local demo account.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,{lead:"Continuous music showcase · votes ≠ paid advantage · TEST MODE"})}function Vh(e){return`
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
    </div>`}function Uh(e,{showSkip:t=!0}={}){const s=e.chipLabel||e.status||"House rotation",i=e.embed?We(e.embed,"rel=0"):"";return`
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
        ${e.cover?`<img class="sp-cover" src="${l(yt(e.cover))}" alt="" />`:""}
        <div>
          <div class="sp-now-title">${l(e.title)}</div>
          <div class="sp-now-meta">${l(e.artist||"DatBoiSkeet")} · house catalog</div>
          <p class="muted sp-note">${l(e.note||"Approved catalog filler · not a live act")}</p>
          ${e.youtube?`<p style="margin:8px 0 0"><a class="btn ghost" href="${l(e.youtube)}" target="_blank" rel="noopener">Open on YouTube</a></p>`:""}
        </div>
      </div>
      ${t&&Va()?`<div class="row wrap" style="gap:8px;margin-top:12px">
               <button class="btn" id="spSkipHouse">Skip house · next</button>
               <span class="muted" style="font-size:12px;align-self:center">Join queue takes the stage over house · Skip advances catalog</span>
             </div>`:""}
    </div>`}function Hh(e,t){if(!e||e.house){const b=e&&e.house?{id:e.id,title:e.title,artist:e.artist,embed:e.embed,youtube:e.youtube,chipLabel:e.chipLabel||"House · Music Video",note:e.note,cover:e.cover,kind:e.houseKind}:Tr();return Uh(b)}const s=D().user,i=e.type==="freestyle",a=i&&e.endsAt?Math.max(0,e.endsAt-Date.now()):null,n=Object.keys(e.keepGoingVotes||{}).length,o=Object.keys(e.playAnotherVotes||{}).length,r=e.userId,d=Kh(r),c=s&&s.id===e.userId,p=e.reactions||{fire:0,heart:0,clap:0},m=i?`<div class="sp-timer" aria-live="polite">
         <div class="sp-timer-label">Freestyle timer · ext ${e.extensions||0}/${t.maxExtensions}</div>
         <div class="sp-timer-clock" id="spClock">${Oo(a||0)}</div>
         <div class="muted" style="font-size:12px">Keep Going ${n}/${t.keepGoing} · refresh recovers endsAt</div>
       </div>`:`<div class="sp-timer">
         <div class="sp-timer-label">Uploaded · play ${e.playCount||1}/${t.maxUploadStreak}</div>
         <div class="muted" style="font-size:12px">No real audio in TEST MODE · use End set when finished</div>
       </div>`,g=e.awaitingPlayAnother?`<div class="card sp-vote">
         <h3>Play Another?</h3>
         <p class="muted">Audience vote · ${o}/${t.playAnother} · window ends ${e.playAnotherDeadline?F(e.playAnotherDeadline):"soon"} (deadline-based)</p>
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
         </div>`:"",f=c?"":d?`<button class="btn ghost sp-follow" data-follow="${l(r)}" data-on="1">Following</button>`:`<button class="btn ghost sp-follow" data-follow="${l(r)}" data-on="0">Follow</button>`;return`
    <div class="card sp-stage">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center">
        <div class="chip">On stage · ${l(Ga(e.type))}</div>
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
    ${g}`}function zh(e,t,s){const i=r=>Math.max(1,(r+(t?1:0))*2),a=(e||[]).map((r,d)=>`
      <li class="sp-q-row">
        <div>
          <strong>${l(r.username)}</strong>
          <span class="muted"> · ${l(Ga(r.type))} · ${l(r.title)}</span>
          <div class="muted" style="font-size:12px">${d===0?"Next up":`#${d+1}`} · ~${i(d)} min wait (stub)</div>
        </div>
        <div class="row wrap" style="gap:6px">
          ${s&&r.userId===s.id?'<button class="btn ghost sp-leave-q">Leave</button>':""}
          ${Va()?`<button class="btn ghost sp-remove-q" data-qid="${l(r.id)}" title="Demo moderator">Remove</button>`:""}
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
    </div>`}function Wh(e){if(!Va())return"";const t=ie()?"Admin":"Demo moderator · TEST MODE",s=e&&!e.house;return`
    <div class="card sp-mod">
      <h3>Moderator controls</h3>
      <p class="muted" style="margin-top:0"><span class="chip">${l(t)}</span> Skip / remove for safety · fair order otherwise. House Skip → next queue or next house.</p>
      <div class="row wrap" style="gap:8px">
        <button class="btn" id="spSkip" ${e?"":"disabled"}>Skip current</button>
        ${s&&e.type!=="freestyle"&&!e.awaitingPlayAnother?'<button class="btn ghost" id="spEndSet">End set</button>':""}
      </div>
    </div>`}function Yh(e){const t=D().user;return!e||e.house||e.type==="freestyle"||e.awaitingPlayAnother||!t||t.id!==e.userId?"":`
    <div class="card">
      <h3>Your set</h3>
      <p class="muted">No real audio file — tap End set when your demo track “finishes”.</p>
      <button class="btn primary" id="spEndSetSelf">End set</button>
    </div>`}function Jh(e){return!e||e.house?"":`
    <div class="card sp-chat-card">
      <h3>Stage chat</h3>
      <div class="sp-chat" id="spChat">${(e.chat||[]).slice(-20).map(s=>`<div class="sp-chat-row ${s.system?"system":""}"><strong>${l(s.username)}</strong>${l(s.text)}</div>`).join("")||'<div class="muted">No messages yet</div>'}</div>
      <form id="spChatForm" class="row" style="gap:8px;margin-top:8px">
        <input id="spChatInput" maxlength="200" placeholder="Say something…" style="flex:1" />
        <button class="btn primary" type="submit">Send</button>
      </form>
    </div>`}function Qh(e){return e.length?`
    <div class="card">
      <h3>Recent stage</h3>
      <ul class="sp-list">${e.slice(0,12).map(s=>`<li><strong>${l(s.username)}</strong> · ${l(Ga(s.type))} · ${l(s.title)}
         <span class="muted"> · ${l(s.reason||"ended")} · ${F(s.endedAt)}</span></li>`).join("")}</ul>
    </div>`:`
      <div class="card">
        <h3>Recent stage</h3>
        <p class="muted" style="margin:0">No completed turns yet.</p>
      </div>`}function Xh(){ce();const e=D().user;if(!e)return Gh();const t=oe(),s=Vc(12);return _("24/7 Spotlight",`${Vh(t.thresholds)}
     ${Hh(t.nowPlaying,t.thresholds)}
     ${Yh(t.nowPlaying)}
     ${Wh(t.nowPlaying)}
     ${zh(t.queue,t.nowPlaying,e)}
     ${Jh(t.nowPlaying)}
     ${Qh(s)}`,{lead:"Always-on music showcase · FIFO queue · votes ≠ wagers · TEST MODE"})}function Zh(e){var n,o,r,d,c,p,m,g,f,b,k;Vi(),ce();const s=oe().nowPlaying;if(s&&s.type==="freestyle"&&s.endsAt){const v=e.querySelector("#spClock");Ws=setInterval(()=>{ce();const S=oe().nowPlaying;if(!S||S.type!=="freestyle"||!S.endsAt){Vi(),de();return}const $=Math.max(0,S.endsAt-Date.now());v&&(v.textContent=Oo($)),$<=0&&(Vi(),ce(),de())},250)}if(s&&s.awaitingPlayAnother&&s.playAnotherDeadline){const v=Math.max(0,s.playAnotherDeadline-Date.now())+50;setTimeout(()=>{ce(),de()},Math.min(v,35e3))}(n=e.querySelector("#spJoinForm"))==null||n.addEventListener("submit",v=>{var P,C,B;v.preventDefault();const S=((P=e.querySelector("#spType"))==null?void 0:P.value)||"song",$=((C=e.querySelector("#spTitle"))==null?void 0:C.value)||"",A=((B=e.querySelector("#spArtist"))==null?void 0:B.value)||"",w=_c({type:S,title:$,artist:A});if(w.error==="signin")return h("Sign in first");if(w.error==="already_queued")return h("You already have a queue/stage spot");h(S==="freestyle"?"Freestyle — you're up or in queue":"Joined Spotlight queue"),de()}),(o=e.querySelector("#spLeaveQueue"))==null||o.addEventListener("click",()=>{if(ln().error)return h("Not in queue");h("Left queue"),de()}),e.querySelectorAll(".sp-leave-q").forEach(v=>{v.addEventListener("click",()=>{ln(),h("Left queue"),de()})}),e.querySelectorAll(".sp-remove-q").forEach(v=>{v.addEventListener("click",()=>{Oc(v.getAttribute("data-qid")),h("Removed from queue (demo mod)"),de()})});const i=()=>{oe().nowPlaying,qc();const v=oe().nowPlaying;v&&v.house?h("Next house · "+(v.chipLabel||"House")):h(v?"Skipped · "+(v.username||"next")+" on stage":"Skipped"),de()};(r=e.querySelector("#spSkip"))==null||r.addEventListener("click",i),(d=e.querySelector("#spSkipHouse"))==null||d.addEventListener("click",i);const a=()=>{const v=Nc();if(v.error==="max_streak"||v.ok){h(v.error==="max_streak"?"Max 3 in a row — advancing":"Play Another? vote open"),de();return}v.error?h("Cannot end set: "+v.error):de()};(c=e.querySelector("#spEndSet"))==null||c.addEventListener("click",a),(p=e.querySelector("#spEndSetSelf"))==null||p.addEventListener("click",a),(m=e.querySelector("#spKeepGoing"))==null||m.addEventListener("click",()=>{const v=Bc();if(v.error==="already_voted")return h("Already voted");if(v.error==="max_extensions")return h("Max extensions reached");if(v.error)return h(v.error);h("Keep Going counted"),de()}),(g=e.querySelector("#spSimKeepGoing"))==null||g.addEventListener("click",()=>{Rc(2),h("+2 simulated fan votes"),de()}),(f=e.querySelector("#spPlayAnother"))==null||f.addEventListener("click",()=>{const v=jc();if(v.error==="already_voted")return h("Already voted");if(v.error)return h(v.error);h("Play Another vote counted"),de()}),(b=e.querySelector("#spSimPlayAnother"))==null||b.addEventListener("click",()=>{Fc(2),h("+2 simulated fan votes"),de()}),e.querySelectorAll(".sp-follow").forEach(v=>{v.addEventListener("click",()=>{const S=v.getAttribute("data-follow");v.getAttribute("data-on")==="1"?(di(S),h("Unfollowed")):(ci(S),h("Following")),de()})}),e.querySelectorAll(".sp-react").forEach(v=>{v.addEventListener("click",()=>{Kc(v.getAttribute("data-kind")||"fire"),de()})}),(k=e.querySelector("#spChatForm"))==null||k.addEventListener("submit",v=>{v.preventDefault();const S=e.querySelector("#spChatInput"),$=Gc((S==null?void 0:S.value)||"");if($.error!=="empty"){if($.error)return h($.error);S&&(S.value=""),de()}})}const qo="Not available — WebRTC + age assurance required before launch";function es(){R("#/connect")}function eg(){var p;const e=zr(),s=ot().selected||[],i=Ed(),a=Jr(),n=Number(a==null?void 0:a.max)||0,o=!!i,r=e.map(m=>{const g=s.includes(m.id),f=m.connected?`<span class="chip">Linked${m.handle?" · "+l(m.handle):""}</span>`:'<span class="chip muted-chip">Not linked</span>';return`
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
                   <input type="checkbox" class="connect-mp-dest" data-id="${l(m.id)}" ${g?"checked":""} ${o?"disabled":""} />
                   Include
                 </label>`:`<button type="button" class="btn primary connect-mp-connect" data-id="${l(m.id)}">Link</button>`}
        </div>
      </div>`}).join(""),d=s.length,c=o?`<button type="button" class="btn danger" id="connectMpEnd">End multi-platform session</button>
       <span class="chip">LIVE · ${l(String(((p=i==null?void 0:i.destinations)==null?void 0:p.length)||d))} dest · TEST MODE</span>`:`<button type="button" class="btn primary" id="connectMpGoLive" ${d?"":"disabled"}>Go live to selected</button>
       <span class="chip">${d}/${n} selected · cap ${n}</span>`;return`
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
        ${c}
        <a class="btn ghost" href="#/live">Solo Live stage</a>
      </div>
      <p class="muted" style="margin:10px 0 0;font-size:12px">
        PIKK Connect combines random video discovery and multi-platform live controls in one place.
      </p>
    </div>`}function ra(){const e=Qr(),t=e.ageConfirmed&&e.rulesAccepted;return _("PIKK Connect",`<div class="connect-monkey" id="connectMonkey">
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
          <strong>${qo}</strong>
          <p class="muted small">TEST MODE — this is a preview, not a real matching request. No match was created, no camera was requested, and no WebRTC connection was attempted.</p>
        </div>
        <p class="muted small" style="margin-top:10px">Controls are mockups until launch. Prefs save on this device.</p>
      </div>

      ${eg()}

      <div class="card">
        <p class="muted" style="margin:0 0 8px">PIKK Connect <strong>does not replace</strong> Live, Messages, or Spotlight. Meanwhile:</p>
        <a class="btn" href="#/live">Live</a> <a class="btn" href="#/messages">Messages</a> <a class="btn" href="#/spotlight">Spotlight</a> <a class="btn ghost" href="#/shorts">Shorts / Clips</a>
      </div>
    </div>`,{lead:"1:1 discovery shell · multi-platform go-live · TEST MODE",badge:"Shell · no WebRTC"})}function tg(e){var t,s;e.querySelectorAll(".connect-mp-connect").forEach(i=>{i.addEventListener("click",()=>{const a=i.dataset.id,n=bd(a,"");if(n!=null&&n.error)return h(String(n.error));h(`Linked ${a} · TEST MODE`),es()})}),e.querySelectorAll(".connect-mp-disconnect").forEach(i=>{i.addEventListener("click",()=>{yd(i.dataset.id),h("Unlinked · TEST MODE"),es()})}),e.querySelectorAll(".connect-mp-dest").forEach(i=>{i.addEventListener("change",()=>{wd(i.dataset.id),es()})}),(t=e.querySelector("#connectMpGoLive"))==null||t.addEventListener("click",()=>{const i=$d();if((i==null?void 0:i.error)==="signin")return h("Sign in first");if((i==null?void 0:i.error)==="none_selected")return h("Select at least one destination");if(i!=null&&i.error)return h(String(i.error));h("Multi-platform session started · TEST MODE"),es()}),(s=e.querySelector("#connectMpEnd"))==null||s.addEventListener("click",()=>{xd(),h("Session ended"),es()})}function oa(e=document,t){var a,n,o;const s=()=>{if(typeof t=="function")return t();e.innerHTML=ra(),oa(e)};(a=e.querySelector("#connect-age"))==null||a.addEventListener("change",r=>{const d=r.target.checked;un(d?{ageConfirmed:!0}:{ageConfirmed:!1,rulesAccepted:!1}),s()}),(n=e.querySelector("#connect-rules"))==null||n.addEventListener("change",r=>{un({rulesAccepted:r.target.checked}),s()}),(o=e.querySelector("#connect-start"))==null||o.addEventListener("click",()=>{const r=e.querySelector("#connect-blocked");r==null||r.removeAttribute("hidden"),h(qo)}),tg(e);const i=Ke().elementId;(i==="connect-random-chat"||i==="connect-multistream")&&requestAnimationFrame(()=>{var r,d,c,p;(p=e.querySelector(`#${i}`))==null||p.scrollIntoView({behavior:(c=(d=(r=globalThis.window)==null?void 0:r.matchMedia)==null?void 0:d.call(r,"(prefers-reduced-motion: reduce)"))!=null&&c.matches?"instant":"smooth",block:"start"})})}const No="pikk_forum_local_v1",ps=[["music","Music & Artists","♫"],["business","Business & Money","$"],["relationships","Relationships","♡"],["gaming","Gaming","♜"],["sports","Sports","★"],["entertainment","Entertainment","▶"],["lifestyle","Lifestyle","✦"],["general","General Discussion","#"]],la=new Set(ps.map(e=>e[0])),ts=e=>String(e||"").trim();function ss(){try{const e=JSON.parse(localStorage.getItem(No)||"{}");return{posts:Array.isArray(e.posts)?e.posts.filter(t=>t&&la.has(t.topic)).slice(-150):[],votes:e.votes&&typeof e.votes=="object"?e.votes:{},hidden:Array.isArray(e.hidden)?e.hidden:[]}}catch{return{posts:[],votes:{},hidden:[]}}}function Fs(e){try{return localStorage.setItem(No,JSON.stringify(e)),!0}catch{return h("Local storage unavailable"),!1}}function sg(e,t,s,i){let a=e.posts.filter(o=>!e.hidden.includes(o.id)&&(s==="all"||o.topic===s));const n=o=>Object.entries(e.votes).reduce((r,d)=>r+(d[0].startsWith(o.id+":")&&Number(d[1])||0),0);return a.sort((o,r)=>{var d,c;return i==="top"?n(r)-n(o):i==="discussed"?(((d=r.replies)==null?void 0:d.length)||0)-(((c=o.replies)==null?void 0:c.length)||0):r.when-o.when}),a.length?a.map(o=>{var p;const r=((p=ps.find(m=>m[0]===o.topic))==null?void 0:p[1])||"Community",d=Array.isArray(o.replies)?o.replies:[],c=Number(e.votes[o.id+":"+((t==null?void 0:t.id)||"guest")])||0;return'<article class="pikk-forum-post"><div class="pikk-forum-votes"><button data-fvote="1" data-id="'+l(o.id)+'" aria-label="Upvote" aria-pressed="'+(c===1)+'" '+(t?"":"disabled")+">▲</button><b>"+n(o)+'</b><button data-fvote="-1" data-id="'+l(o.id)+'" aria-label="Downvote" aria-pressed="'+(c===-1)+'" '+(t?"":"disabled")+'>▼</button></div><div class="pikk-forum-post-content"><p class="pikk-forum-meta">'+l(r)+" · u/"+l(o.author)+" · local preview</p><h3>"+l(o.title)+'</h3><p class="pikk-forum-text">'+l(o.body)+'</p><button class="pikk-forum-reply-button" data-fopen="'+l(o.id)+'" aria-expanded="false" aria-controls="pikk-forum-thread-'+l(o.id)+'">▤ '+d.length+" replies</button> "+(t&&t.id!==o.owner?'<button class="pikk-forum-reply-button" data-freport="'+l(o.id)+'">◇ Hide / report locally</button>':"")+'<div class="pikk-forum-thread" id="pikk-forum-thread-'+l(o.id)+'" data-thread="'+l(o.id)+'" hidden>'+d.map(m=>'<p class="pikk-forum-comment"><strong>'+l(m.author)+"</strong> "+l(m.body)+"</p>").join("")+(t?'<form data-freply="'+l(o.id)+'"><label>Reply</label><textarea maxlength="1000" required rows="2" placeholder="Join the discussion"></textarea><button class="btn primary" type="submit">Reply · local</button></form>':'<a href="#/profile" class="btn ghost">Sign in to reply</a>')+"</div></div></article>"}).join(""):'<div class="pikk-forum-empty">No discussions yet. Start the first conversation on this browser.</div>'}function ig(){const e=D().user,t=ps.map(s=>'<button data-ftopic="'+s[0]+'" type="button" aria-pressed="false"><span>'+s[2]+"</span>"+l(s[1])+"</button>").join("");return _("PIKK Communities",'<section class="pikk-forum-hero"><p class="kicker">PIKK CONNECT · TOPICS & DISCUSSIONS</p><h2>Find your people. <span>Start the conversation.</span></h2><p>Explore communities around what matters to you. Discuss, upvote, reply and discover new ideas.</p><a class="btn ghost" href="#/community">PIKK Lounge</a> <a class="btn ghost" href="#/posts">Social Posts</a></section><p class="pikk-forum-warning"><b>TEST MODE:</b> These conversations and votes are saved only in this browser. No public posting, account verification or server-side moderation is active.</p><div id="pikkForum" class="pikk-forum-layout"><aside class="pikk-forum-sidebar"><h3>Explore topics</h3><button class="on" data-ftopic="all" aria-pressed="true">✦ All discussions</button>'+t+'</aside><main class="pikk-forum-center"><nav class="pikk-forum-sort" aria-label="Sort posts"><button class="on" data-fsort="new" aria-pressed="true">✦ New</button><button data-fsort="top" aria-pressed="false">▲ Top</button><button data-fsort="discussed" aria-pressed="false">▤ Discussed</button></nav><div class="pikk-forum-topic-board"><h3>Discover communities</h3><div class="pikk-forum-topic-cards">'+ps.map(s=>'<button data-ftopic="'+s[0]+'" aria-pressed="false"><span>'+s[2]+"</span><strong>"+l(s[1])+"</strong></button>").join("")+'</div></div><section class="pikk-forum-compose"><h3>Start a discussion</h3>'+(e?'<form id="pikkForumForm"><label for="pikkForumTopic">Community</label><select id="pikkForumTopic">'+ps.map(s=>'<option value="'+s[0]+'">'+l(s[1])+"</option>").join("")+'</select><label for="pikkForumTitle">Title</label><input id="pikkForumTitle" required maxlength="110" placeholder="What is on your mind?" /><label for="pikkForumBody">Discussion</label><textarea id="pikkForumBody" required maxlength="4000" rows="3" placeholder="Ask a question or share a thought..."></textarea><button class="btn primary" type="submit">Publish locally · TEST MODE</button></form>':'<p class="muted">Sign in with a PIKK demo account to write discussions and vote.</p><a href="#/profile" class="btn primary">Sign in</a>')+'</section><section><h3 class="pikk-forum-feed-title">Community discussions</h3><div id="pikkForumFeed"></div></section></main><aside class="pikk-forum-info"><h3>About PIKK Communities</h3><p>Topic-based discussion with an original PIKK look, separate from the live Lounge and social feed.</p><h3>Community safety</h3><p>Respect others. No harassment, hate, scams or personal information. Reports on this preview only hide posts on your device.</p><a href="#/guidelines">Community Guidelines</a></aside></div>',{lead:"Topic communities · discussions · voting · replies · local preview"})}function ag(e){const t=e.querySelector("#pikkForum");if(!t)return;let s="all",i="new";const a=()=>D().user,n=t.querySelector("#pikkForumFeed"),o=()=>{n.innerHTML=sg(ss(),a(),s,i)},r=new URLSearchParams(location.hash.split("?")[1]||"").get("topic");la.has(r)&&(s=r);function d(c,p,m){t.querySelectorAll(c).forEach(g=>{let f=g.dataset[p]===m;g.classList.toggle("on",f),g.setAttribute("aria-pressed",String(f))})}d("[data-ftopic]","ftopic",s),t.addEventListener("click",c=>{const p=c.target.closest("[data-ftopic]");if(p){s=p.dataset.ftopic,d("[data-ftopic]","ftopic",s);const k=t.querySelector("#pikkForumTopic");k&&s!=="all"&&(k.value=s),o();return}const m=c.target.closest("[data-fsort]");if(m){i=m.dataset.fsort,d("[data-fsort]","fsort",i),o();return}const g=c.target.closest("[data-fopen]");if(g){const k=t.querySelector('[data-thread="'+g.dataset.fopen+'"]');k&&(k.hidden=!k.hidden,g.setAttribute("aria-expanded",String(!k.hidden)));return}const f=c.target.closest("[data-fvote]");if(f&&a()){const k=ss(),v=f.dataset.id+":"+a().id,S=Number(f.dataset.fvote);k.votes[v]=k.votes[v]===S?0:S,Fs(k)&&o();return}const b=c.target.closest("[data-freport]");if(b&&a()){if(!confirm("Hide this post on this browser? This will NOT submit a report to a server."))return;const k=ss();k.hidden.push(b.dataset.freport),Fs(k)&&o(),h("Hidden locally only — no server report submitted")}}),t.addEventListener("submit",c=>{var m,g,f,b;const p=c.target;if(!(!(p instanceof HTMLFormElement)||!a())){if(c.preventDefault(),p.id==="pikkForumForm"){const k=ts((m=p.querySelector("input"))==null?void 0:m.value),v=ts((g=p.querySelector("textarea"))==null?void 0:g.value),S=(f=p.querySelector("select"))==null?void 0:f.value;if(!k||!v||!la.has(S))return;const $=ss();$.posts.push({id:"local-"+Date.now()+"-"+Math.random().toString(36).slice(2,8),owner:a().id,author:ts(a().username).slice(0,30)||"Member",title:k,body:v,topic:S,when:Date.now(),replies:[]}),Fs($)&&(s=S,d("[data-ftopic]","ftopic",s),p.reset(),o(),h("Saved only on this browser · TEST MODE"))}else if(p.dataset.freply){const k=ts((b=p.querySelector("textarea"))==null?void 0:b.value);if(!k)return;const v=ss(),S=v.posts.find($=>$.id===p.dataset.freply);if(!S)return;if(S.replies||(S.replies=[]),S.replies.push({author:ts(a().username).slice(0,30)||"Member",body:k}),Fs(v)){o();const $=t.querySelector('[data-thread="'+S.id+'"]');$&&($.hidden=!1),h("Reply saved locally")}}}}),o()}function ng(){const e=ge.filter(s=>(s.category||"")==="Music Videos"&&s.embed);return(e.length?e:ge.filter(s=>s.embed)).slice(0,10).map((s,i)=>({id:`clip_${s.id}`,videoId:s.id,title:s.title,artist:s.artist||"DatBoiSkeet",embed:s.embed,youtube:s.youtube,blurb:i%3===0?"Clip cut · DEMO":i%3===1?"Highlight · DEMO":"Short · DEMO"}))}function rg(e,t){return`
    <article class="shorts-card" data-clip-id="${l(e.id)}" id="shorts-card-${t}">
      <div class="shorts-stage">
        <div class="shorts-embed hero-video">
          <iframe
            src="${l(We(e.embed))}"
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
    </article>`}function Gn(){const e=ng(),s=`
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
      ${e.map(rg).join("")||'<p class="muted">No demo clips seeded.</p>'}
    </div>
    <p class="muted" style="margin:12px 0 0;font-size:12px;text-align:center">
      End of DEMO feed · ${e.length} clips · Scroll for more when real clip uploads ship
    </p>`;return _("Shorts / Clips",s,{lead:"Posts · short-form feed · Picture / Short / Video create on Posts · TEST MODE"})}function Vn(e){xi(e),e.querySelectorAll(".shorts-card").forEach(t=>{t.addEventListener("focusin",()=>{t.classList.add("is-focus")})}),e.querySelector(".shorts-card")||h("No demo clips · add MVs in data.js")}const oi=[{id:"ny",name:"NY",tag:"East coast",still:"/blockwars-preview/preview-ny-still.jpg",fighter:"Brooklyn Brawler",blurb:"Street-pressured power from the five boroughs. Heavy combos, tight corners — TEST MODE teaser only."},{id:"la",name:"LA",tag:"West coast",still:"/blockwars-preview/preview-la-still.jpg",fighter:"Sunset Striker",blurb:"Flashy footwork under neon skies. Style meets speed — Coming Soon, not a real match engine."},{id:"chi",name:"Chicago",tag:"Midwest",still:"/blockwars-preview/preview-chi-still.jpg",fighter:"Windy City Wall",blurb:"Defense-first grit from the lakefront. Hold the block — lobby demo only, no live fights yet."}];function og(e){return oi.map(t=>{const s=t.id===e?" is-active":"",i=t.id===e?"true":"false";return`<button type="button" class="bw-city-card${s}" data-city="${l(t.id)}" aria-pressed="${i}" aria-label="${l(t.name)} fighter"><img src="${l(t.still)}" alt="" width="120" height="160" loading="lazy" decoding="async" /><span class="bw-city-meta"><span class="bw-city-name">${l(t.name)}</span><span class="bw-city-tag">${l(t.tag)}</span></span></button>`}).join("")}function lg(e){return`<div class="bw-focus" id="bwFocus" data-city="${l(e.id)}"><div class="bw-focus-still"><img id="bwFocusImg" src="${l(e.still)}" alt="${l(e.fighter)}" width="110" height="140" /></div><div class="bw-focus-copy"><p class="bw-focus-city">${l(e.name)} · ${l(e.tag)}</p><h3 id="bwFocusName">${l(e.fighter)}</h3><p id="bwFocusBlurb">${l(e.blurb)}</p></div></div>`}function cg(){const e=oi[0],t=`
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
        ${og(e.id)}
      </div>

      ${lg(e)}

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
    </div>`;return _("Block Wars",t,{lead:"Coming Soon · lobby fighter select · preview video · not playable yet."})}function dg(e,t){const s=oi.find(d=>d.id===t)||oi[0];e.querySelectorAll(".bw-city-card").forEach(d=>{const c=d.getAttribute("data-city")===s.id;d.classList.toggle("is-active",c),d.setAttribute("aria-pressed",c?"true":"false")});const i=e.querySelector("#bwFocus"),a=e.querySelector("#bwFocusImg"),n=e.querySelector("#bwFocusName"),o=e.querySelector("#bwFocusBlurb"),r=e.querySelector(".bw-focus-city");i&&i.setAttribute("data-city",s.id),a&&(a.src=s.still,a.alt=s.fighter),n&&(n.textContent=s.fighter),o&&(o.textContent=s.blurb),r&&(r.textContent=`${s.name} · ${s.tag}`)}function pg(e){var a,n;(a=e.querySelector("#bwCityGrid"))==null||a.addEventListener("click",o=>{const r=o.target.closest(".bw-city-card");r&&(o.preventDefault(),dg(e,r.getAttribute("data-city")))}),(n=e.querySelector("#bwEnterArena"))==null||n.addEventListener("click",o=>{o.preventDefault(),h("Block Wars arena is Coming Soon — lobby demo only. No match engine yet.")});const t=e.querySelector("#bwCsVideo"),s=e.querySelector("#bwCsPlay");if(!t)return;const i=()=>{if(!s)return;const o=t.paused||t.ended;s.hidden=!o,s.setAttribute("aria-hidden",o?"false":"true")};s==null||s.addEventListener("click",o=>{o.preventDefault(),t.play().catch(()=>{})}),t.addEventListener("play",()=>{Nt(),i()}),t.addEventListener("pause",()=>{Ye(),i()}),t.addEventListener("ended",()=>{Ye(),i()}),t.addEventListener("pointerdown",()=>{t.paused||Nt()}),i()}function ug(){return _("PIKK Arcade",`
    <section class="pikk-arcade-intro card" aria-label="PIKK Arcade">
      <div class="pikk-arcade-heading">
        <div>
          <p class="kicker">Play · Compete · Hang out</p>
          <div class="pikk-arcade-brand"><img src="${l(Ys({artwork:"/brand/pikk-official-approved.jpg"}))}" alt="PIKK" loading="eager" decoding="async"/><span>ARCADE</span></div>
          <p>15 original game concepts. Find your favorites, see the art, and follow their development.</p>
        </div>
        <span class="pikk-arcade-icon" aria-hidden="true">🎮</span>
      </div>
      <p class="pikk-arcade-disclosure">ALL GAMES COMING SOON · Gallery previews, not playable releases. Play Chips have no cash value or cash-out.</p>
    </section>
    <div class="pikk-arcade-toolbar"><strong>15 upcoming games</strong><span>PLAY • COMPETE • HANG OUT</span></div>
    <div class="pikk-arcade-grid">
      ${us.map((e,t)=>`
        <article class="pikk-arcade-card pikk-game-${l(e.theme)}">
          <div class="pikk-arcade-card-header"><span class="pikk-arcade-number">${t+1}</span><h3>${l(e.name)}</h3></div>
          <div class="pikk-arcade-art" aria-label="${l(e.name)} preview artwork">
            ${e.artwork?`<img src="${l(Ys(e))}" alt="${l(e.name)} concept artwork" loading="lazy" decoding="async"/>`:`<span class="pikk-arcade-symbol" aria-hidden="true">${e.icon}</span>`}
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
  `,{lead:"Fifteen upcoming games · mobile-first catalog · previews only"})}function mg(e){const t=us.length,s=(Math.trunc(Number(e)||0)%t+t)%t,i=us[s];return{index:s,total:t,title:i.name,description:i.description,players:i.players,image:Ys(i)}}function hg(e){const t=e.querySelector(".pikk-arcade-grid"),s=e.querySelector("#pikkArcadeLightbox");if(!t||!s||typeof s.showModal!="function")return;let i=0,a=null;const n=s.querySelector("[data-arcade-full-image]"),o=s.querySelector("[data-arcade-title]"),r=s.querySelector("[data-arcade-description]"),d=s.querySelector("[data-arcade-players]"),c=s.querySelector("[data-arcade-counter]"),p=m=>{const g=mg(m);i=g.index,n.src=g.image,n.alt=g.title+" concept artwork",o.textContent=g.title,r.textContent=g.description,d.textContent=g.players+(g.players==="1"?" Player · Preview only":" Players · Preview only"),c.textContent=String(i+1).padStart(2,"0")+" / "+g.total};t.addEventListener("click",m=>{const g=m.target.closest("[data-game-preview]");g&&(a=g,p(g.dataset.gamePreview),s.showModal())}),s.addEventListener("click",m=>{m.target===s||m.target.closest("[data-arcade-close]")?s.close():m.target.closest("[data-arcade-prev]")?p(i-1):m.target.closest("[data-arcade-next]")&&p(i+1)}),s.addEventListener("keydown",m=>{(m.key==="ArrowLeft"||m.key==="ArrowRight")&&(m.preventDefault(),p(i+(m.key==="ArrowRight"?1:-1)))}),s.addEventListener("close",()=>{a!=null&&a.isConnected&&a.focus()})}function gg(){return _("PIKK Dating & Connections",`
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
  `,{lead:"Dating · mutual matches · live connections"})}function fg(e){const t=new Set(["dating-discover","dating-experiences","dating-live","dating-safety"]),s=[...e.querySelectorAll("[data-dating-jump]")];function i(n,o=!1){if(!t.has(n))return;const r=e.querySelector("#"+n);if(r&&(s.forEach(d=>{const c=d.dataset.datingJump===n;d.classList.toggle("is-active",c),d.setAttribute("aria-pressed",String(c))}),o)){const d=window.matchMedia("(prefers-reduced-motion: reduce)").matches;r.scrollIntoView({behavior:d?"auto":"smooth",block:"start"}),r.focus({preventScroll:!0})}}s.forEach(n=>n.addEventListener("click",()=>i(n.dataset.datingJump,!0)));const a=Ke().elementId;t.has(a)&&window.setTimeout(()=>{e.querySelector("#"+a)&&i(a,!0)},80)}const Bo=60,vg=10,bg=10,Un=3;function yg(){return{phase:"round",round:1,seconds:Bo,votes:[0,0],scores:[0,0],roundWinners:[],gifts:[0,0],rematchVotes:[0,0],winner:null,tieBreaker:!1}}function kg(e,t){if(e.phase!=="vote"||![0,1].includes(t))return e;const s=[...e.votes];return s[t]+=1,{...e,votes:s}}function wg(e,t){if(e.phase!=="rematch")return e;const s=[...e.rematchVotes];return s[t?0:1]+=1,{...e,rematchVotes:s}}function Sg(e){if(!["round","vote","rematch"].includes(e.phase))return e;if(e.seconds>1)return{...e,seconds:e.seconds-1};if(e.phase==="round")return{...e,phase:"vote",seconds:vg,votes:[0,0],voted:!1};if(e.phase==="vote"){const t=e.votes[0]===e.votes[1]?null:e.votes[0]>e.votes[1]?0:1,s=[...e.scores];t!==null&&(s[t]+=1);const i=[...e.roundWinners,t];return e.round>=Un&&s[0]!==s[1]?{...e,scores:s,roundWinners:i,winner:s[0]>s[1]?0:1,phase:"rematch",seconds:bg,rematchVoted:!1}:{...e,scores:s,roundWinners:i,phase:"round",round:e.round+1,seconds:Bo,votes:[0,0],voted:!1,tieBreaker:e.round>=Un}}return{...e,phase:"finished",seconds:0}}let J=null,De=null;function Ks(){const e=document.getElementById("roast-demo");if(!e||!J){De&&clearInterval(De),De=null;return}const t=J.phase,s=t==="round"?`Round ${J.round}${J.tieBreaker?" · Final tiebreaker":""}`:t==="vote"?"Vote for the round winner":t==="rematch"?"Run It Back?":"Match finished";e.innerHTML=`<h3>${s}</h3><p><strong>${String(Math.floor(J.seconds/60)).padStart(2,"0")}:${String(J.seconds%60).padStart(2,"0")}</strong></p><p>Contestant A: ${J.scores[0]} rounds · Contestant B: ${J.scores[1]} rounds</p>${t==="vote"?'<button type="button" data-roast-vote="0">Vote A</button> <button type="button" data-roast-vote="1">Vote B</button>':""}${t==="rematch"?`<p>Winner: Contestant ${J.winner===0?"A":"B"}</p><button type="button" data-roast-rematch="yes">Run It Back? Yes</button> <button type="button" data-roast-rematch="no">No</button>`:""}<p class="muted">Local interactive simulation only. Votes are not shared between viewers. No live video or gifts are connected.</p>`}function $g(){De&&clearInterval(De),De=null,J=null;const e=document.getElementById("roast-start");e&&(e.addEventListener("click",()=>{J=yg(),Ks(),De&&clearInterval(De),De=setInterval(()=>{J=Sg(J),Ks(),J.phase==="finished"&&(clearInterval(De),De=null)},1e3)}),document.getElementById("roast-demo").addEventListener("click",t=>{const s=t.target.closest("[data-roast-vote]"),i=t.target.closest("[data-roast-rematch]");s&&J&&J.phase==="vote"&&!J.voted&&(J={...kg(J,Number(s.dataset.roastVote)),voted:!0},Ks()),i&&J&&J.phase==="rematch"&&!J.rematchVoted&&(J={...wg(J,i.dataset.roastRematch==="yes"),rematchVoted:!0},Ks())}))}function xg(){return _("PIKK Roast Arena",`
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
  `,{lead:"Live comedy competitions · audience votes and gifts tracked separately"})}const rs={instagram:"Instagram",tiktok:"TikTok",facebook:"Facebook",youtube:"YouTube",x:"X",snapchat:"Snapchat",other:"Other"};function Eg(e){return((e==null?void 0:e.path)||"")==="/refer"?"refer":"share"}function ae(e){R(e==="refer"?"#/refer":"#/share")}function Oe(){const{user:e}=D();if(e)return e;const t=jt("DemoCreator");return h("Signed in as DemoCreator · local demo"),t||D().user}function Ag(e){const t=Number(e)-Date.now();if(t<=0)return"24h window ended (demo)";const s=Math.floor(t/36e5),i=Math.floor(t%36e5/6e4);return`${s}h ${i}m left`}function Cg(e){return`<div class="admin-type-tabs rewards-tabs" style="grid-template-columns:repeat(2,minmax(0,1fr));margin-bottom:14px" role="tablist">
    <a class="admin-type-tab ${e==="share"?"on":""}" href="#/share" role="tab" aria-selected="${e==="share"}">Share &amp; Earn</a>
    <a class="admin-type-tab ${e==="refer"?"on":""}" href="#/refer" role="tab" aria-selected="${e==="refer"}">Refer &amp; Earn</a>
  </div>`}function Tg(){const{user:e}=D(),t=ee(),s=t.platformsLinked||[],i=t.challenge,a=t.submissions||[],n=t.rewardsClaimed||[],o=Kr(),r=Gr(),d=ed(),c=s.length>0?`<ul class="list-plain">${s.map(v=>`<li>
          <span><strong>${l(rs[v.platform]||v.platform)}</strong>
            ${v.handle?`<br/><span class="muted" style="font-size:12px">@${l(String(v.handle).replace(/^@+/,""))}</span>`:""}
            ${v.url?`<br/><span class="muted" style="font-size:11px">${l(v.url)}</span>`:""}
          </span>
          <button class="btn ghost" type="button" data-unlink="${l(v.id)}">Remove</button>
        </li>`).join("")}</ul>`:'<p class="muted" style="margin:0;font-size:13px">No platforms linked yet — optional. Never asked for social passwords.</p>',p=cn().filter(v=>!s.some(S=>S.platform===v)).map(v=>`<option value="${v}">${l(rs[v]||v)}</option>`).join("");let m="";if(!i)m=`<div class="card">
      <h3>24-hour social challenge</h3>
      <p class="muted" style="margin:0 0 10px;font-size:13px">Optional promo · separate from paid Clippers. Post official DBS ad + tracked link · keep live 24h · manual/demo verification (not guaranteed auto-check).</p>
      <button class="btn primary" id="shStart" >Start challenge · TEST MODE</button>
    </div>`;else{const v=i.status==="active",S=Date.now()>=Number(i.endsAt);m=`<div class="card">
      <div class="row wrap" style="gap:8px;margin-bottom:8px">
        <span class="chip">${v?S?"Window ended · demo":"Active":"Ended"}</span>
        <span class="chip">TEST MODE</span>
        <span class="chip">${l(Ag(i.endsAt))}</span>
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
        ${v?`<button class="btn ghost" type="button" id="shSim24">Simulate 24h elapsed</button>
               <button class="btn ghost" type="button" id="shEnd">End challenge</button>`:""}
      </div>
      <p class="muted" style="margin:10px 0 0;font-size:12px">Honest scope: stories/API may not prove continuous 24h visibility — admin/demo verify only.</p>
    </div>`}const g=cn().map(v=>`<option value="${v}">${l(rs[v]||v)}</option>`).join(""),f=a.length>0?`<ul class="list-plain">${a.map(v=>`<li style="align-items:flex-start">
          <span style="flex:1;min-width:0">
            <strong>${l(rs[v.platform]||v.platform)}</strong>
            <span class="chip">${l(v.status)}</span>
            <br/><a href="${l(v.postUrl)}" target="_blank" rel="noopener" style="font-size:13px;word-break:break-all">${l(v.postUrl)}</a>
            <br/><span class="muted" style="font-size:11px">${F(v.submittedAt)} · ${l(v.note||"")}</span>
          </span>
          ${v.status==="pending"?`<span class="row wrap" style="gap:4px">
                  <button class="btn" type="button" data-verify="${l(v.id)}">Verify · demo</button>
                  <button class="btn ghost" type="button" data-reject="${l(v.id)}">Reject</button>
                </span>`:""}
        </li>`).join("")}</ul>`:'<p class="muted" style="margin:0;font-size:13px">No post URLs submitted yet.</p>',b=d.map(v=>{const S=n.some(A=>A.tierId===v.id),$=r.some(A=>A.id===v.id);return`<tr style="border-top:1px solid rgba(255,255,255,.06)">
        <td style="padding:8px 4px"><strong>${l(v.label)}</strong><br/><span class="muted" style="font-size:11px">≥${v.minVerified} verified platform${v.minVerified===1?"":"s"}${v.requireAllLinked?" · all linked (≥3)":""}</span></td>
        <td style="padding:8px 4px">${S?'<span class="chip">Claimed</span>':$?`<button class="btn primary" type="button" data-claim-share="${l(v.id)}">Claim</button>`:`<span class="muted" style="font-size:12px">Locked (${o}/${v.minVerified})</span>`}</td>
      </tr>`}).join(""),k=n.length>0?`<ul class="list-plain">${n.map(v=>`<li>
          <span>${l(v.label)}<br/><span class="muted" style="font-size:11px">${F(v.at)} · TEST MODE</span></span>
          <span class="chip">${l(v.kind)}</span>
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
      ${c}
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
        <div class="field" style="margin:0;min-width:140px"><label>Platform</label><select id="shSubPlat">${g}</select></div>
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
          <tbody>${b}</tbody>
        </table>
      </div>
      <h4 style="margin:16px 0 8px;font-size:14px">Claim history</h4>
      ${k}
    </div>
  `}function Dg(){const{user:e}=D(),t=Gt(),s=Vr(),i=t.invitees||[],a=Ur(),n=Hr(),o=cd(),r=t.milestonesClaimed||[],d=xt(),c=o.find(b=>a<b.n),p=c?`${a} / ${c.n} verified active → ${c.label}`:a>=100?"All milestones unlocked":`${a} verified active`,m=i.length>0?`<ul class="list-plain">${i.map(b=>{const k=(b.activeDays||[]).length;return`<li style="align-items:flex-start">
            <span style="flex:1;min-width:0">
              <strong>${l(b.username)}</strong>
              <span class="chip">${l(b.status)}</span>
              ${b.flaggedFraud?'<span class="chip">Fraud flag</span>':""}
              ${b.welcomeClaimed?'<span class="chip">Welcome claimed</span>':""}
              <br/><span class="muted" style="font-size:12px">Active days: ${k}/3 · ${l((b.activeDays||[]).join(", ")||"none")} · signed ${F(b.signedUpAt)}</span>
            </span>
            <span class="row wrap" style="gap:4px;justify-content:flex-end">
              ${!b.welcomeClaimed&&!b.flaggedFraud?`<button class="btn ghost" type="button" data-welcome="${l(b.id)}">Welcome perk</button>`:""}
              ${!b.flaggedFraud&&b.status!=="active"?`<button class="btn" type="button" data-activeday="${l(b.id)}">Mark active day</button>`:""}
              ${b.flaggedFraud?`<button class="btn ghost" type="button" data-unfraud="${l(b.id)}">Clear fraud</button>`:`<button class="btn ghost" type="button" data-fraud="${l(b.id)}">Flag fraud</button>`}
            </span>
          </li>`}).join("")}</ul>`:'<p class="muted" style="margin:0;font-size:13px">No invitees yet — simulate a signup or load demo referrals.</p>',g=o.map(b=>{const k=r.some(S=>S.milestoneId===b.id),v=n.some(S=>S.id===b.id);return`<tr style="border-top:1px solid rgba(255,255,255,.06)">
        <td style="padding:8px 4px"><strong>${b.n}</strong> verified active</td>
        <td style="padding:8px 4px">${l(b.label)}</td>
        <td style="padding:8px 4px">${k?'<span class="chip">Claimed</span>':v?`<button class="btn primary" type="button" data-claim-ref="${l(b.id)}">Claim</button>`:`<span class="muted" style="font-size:12px">${a}/${b.n}</span>`}</td>
      </tr>`}).join(""),f=r.length>0?`<ul class="list-plain">${r.map(b=>`<li>
          <span>${l(b.label)}<br/><span class="muted" style="font-size:11px">${F(b.at)} · not Clippers pay</span></span>
          <span class="chip">${b.n}</span>
        </li>`).join("")}</ul>`:'<p class="muted" style="margin:0;font-size:13px">No milestone claims yet.</p>';return`
    <div class="card">
      <p class="muted" style="margin:0;font-size:13px">
        Personal referral link. Invitee welcome perks; inviter milestones only after <strong>verified active</strong>
        (meaningful participation on <strong>3 distinct days in the first 7 days</strong>). Distinct from Clippers commissions. No purchase required · no auto billing.
      </p>
      <div class="row wrap" style="margin-top:10px;gap:8px">
        <span class="chip">Verified active: ${a}</span>
        ${d?`<span class="chip">Membership: ${l(d)}</span>`:'<span class="chip">Membership: none</span>'}
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
          <tbody>${g}</tbody>
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
  `}function Mg(e){return Ro(e||{path:"/share"})}function Lg(e){return Ro(e||{path:"/refer"})}function Ro(e){const t=Eg(e),s=`
    ${Cg(t)}
    ${t==="refer"?Dg():Tg()}
  `;return _("DBS Rewards",s,{lead:t==="refer"?"Refer & Earn · verified active friends · TEST MODE (§33).":"Share & Earn · 24h social promo · TEST MODE (§32)."})}function Ig(e){jo(e,"share")}function Pg(e){jo(e,"refer")}function jo(e,t){var i,a,n,o,r,d,c,p,m,g,f,b,k;const s=t||(location.hash.includes("/refer")?"refer":"share");(i=e.querySelector("#rwSignIn"))==null||i.addEventListener("click",()=>{Oe(),ae(s)}),(a=e.querySelector("#shLinkForm"))==null||a.addEventListener("submit",v=>{var P,C,B;v.preventDefault(),Oe();const S=(P=e.querySelector("#shPlat"))==null?void 0:P.value,$=((C=e.querySelector("#shHandle"))==null?void 0:C.value)||"",A=((B=e.querySelector("#shUrl"))==null?void 0:B.value)||"",w=td({platform:S,handle:$,url:A});if(w.error==="signin")return h("Sign in required");if(w.error==="already_linked")return h("Already linked");if(w.error==="required")return h("Handle or URL required");if(w.error)return h("Could not link");h(`Linked ${rs[S]||S}`),ae("share")}),e.querySelectorAll("[data-unlink]").forEach(v=>{v.addEventListener("click",()=>{sd(v.getAttribute("data-unlink")),h("Platform removed"),ae("share")})}),(n=e.querySelector("#shStart"))==null||n.addEventListener("click",()=>{Oe();const v=id();if(v.error==="signin")return h("Sign in required");if(v.error==="already_active")return h("Challenge already active");if(v.error)return h("Could not start");h("Challenge started · 24h window"),ae("share")}),(o=e.querySelector("#shCopyLink"))==null||o.addEventListener("click",async()=>{var S;const v=((S=e.querySelector("#shTracked"))==null?void 0:S.value)||"";try{await navigator.clipboard.writeText(v),h("Tracked link copied")}catch{h("Copy manually")}}),(r=e.querySelector("#shCopyCaption"))==null||r.addEventListener("click",async()=>{var $;const S=(($=ee().challenge)==null?void 0:$.caption)||"";try{await navigator.clipboard.writeText(S),h("Caption copied")}catch{h("Copy manually")}}),(d=e.querySelector("#shSim24"))==null||d.addEventListener("click",()=>{if(ad().error)return h("No active challenge");h("Simulated 24h elapsed"),ae("share")}),(c=e.querySelector("#shEnd"))==null||c.addEventListener("click",()=>{nd(),h("Challenge ended"),ae("share")}),(p=e.querySelector("#shSubmitForm"))==null||p.addEventListener("submit",v=>{var w,P;v.preventDefault(),Oe();const S=(w=e.querySelector("#shSubPlat"))==null?void 0:w.value,$=((P=e.querySelector("#shSubUrl"))==null?void 0:P.value)||"",A=rd({platform:S,postUrl:$});if(A.error==="required")return h("Post URL required");if(A.error==="duplicate")return h("Already submitted for this platform");if(A.error==="no_challenge")return h("Start a challenge first");if(A.error)return h("Submit failed");h("Submitted · pending demo verification"),ae("share")}),e.querySelectorAll("[data-verify]").forEach(v=>{v.addEventListener("click",()=>{dn(v.getAttribute("data-verify"),"verified"),h("Verified · demo (manual)"),ae("share")})}),e.querySelectorAll("[data-reject]").forEach(v=>{v.addEventListener("click",()=>{dn(v.getAttribute("data-reject"),"rejected"),h("Rejected"),ae("share")})}),e.querySelectorAll("[data-claim-share]").forEach(v=>{v.addEventListener("click",()=>{Oe();const S=od(v.getAttribute("data-claim-share"));if(S.error==="not_claimable")return h("Not claimable yet");if(S.error)return h("Claim failed");h(`Claimed · ${S.claim.label}`),ae("share")})}),(m=e.querySelector("#shReset"))==null||m.addEventListener("click",()=>{ld(),h("Share demo reset"),ae("share")}),(g=e.querySelector("#refCopy"))==null||g.addEventListener("click",async()=>{var S;Oe(),Gt();const v=((S=e.querySelector("#refLink"))==null?void 0:S.value)||Vr();try{await navigator.clipboard.writeText(v),h("Referral link copied")}catch{h("Copy manually")}}),(f=e.querySelector("#refInviteForm"))==null||f.addEventListener("submit",v=>{var A;v.preventDefault(),Oe();const S=((A=e.querySelector("#refInviteName"))==null?void 0:A.value)||"",$=dd({username:S});if($.error==="self_referral")return h("Self-referral blocked");if($.error==="signin")return h("Sign in required");if($.error)return h("Could not add invitee");h(`Invitee ${$.invitee.username} signed up`),ae("refer")}),e.querySelectorAll("[data-welcome]").forEach(v=>{v.addEventListener("click",()=>{const S=pd(v.getAttribute("data-welcome"));if(S.error==="fraud")return h("Flagged fraud");if(S.error)return h("Welcome claim failed");h(S.perk||"Welcome perk claimed"),ae("refer")})}),e.querySelectorAll("[data-activeday]").forEach(v=>{v.addEventListener("click",()=>{const S=ud(v.getAttribute("data-activeday"));if(S.error==="fraud")return h("Flagged fraud");if(S.error==="outside_window")return h("Outside first-7-day window");if(S.error==="window_full")return h("All 7 demo days already marked");if(S.error)return h("Could not mark day");const $=(S.invitee.activeDays||[]).length;h($>=3?`${S.invitee.username} → verified active (${$} days)`:`Active day ${$}/3 for ${S.invitee.username}`),ae("refer")})}),e.querySelectorAll("[data-fraud]").forEach(v=>{v.addEventListener("click",()=>{pn(v.getAttribute("data-fraud"),!0),h("Flagged as fraud · demo"),ae("refer")})}),e.querySelectorAll("[data-unfraud]").forEach(v=>{v.addEventListener("click",()=>{pn(v.getAttribute("data-unfraud"),!1),h("Fraud flag cleared"),ae("refer")})}),e.querySelectorAll("[data-claim-ref]").forEach(v=>{v.addEventListener("click",()=>{Oe();const S=md(v.getAttribute("data-claim-ref"));if(S.error==="not_claimable")return h("Not claimable yet");if(S.error)return h("Claim failed");h(`Milestone claimed · ${S.claim.label}`),ae("refer")})}),(b=e.querySelector("#refSeed"))==null||b.addEventListener("click",()=>{Oe();const v=gd({force:!0});if(v.error==="signin")return h("Sign in required");h(`Loaded ${v.seeded||0} demo invitees`),ae("refer")}),(k=e.querySelector("#refReset"))==null||k.addEventListener("click",()=>{Oe(),hd(),h("Refer demo reset"),ae("refer")})}function _g(e){return{badge:`Phase ${e} shell`}}function Hn(e){return`
    <article class="card pikk-video-tile">
      <div class="hero-video" style="margin:0 0 10px">
        <iframe src="${l(We(e.embed))}" title="${l(e.title)}" allowfullscreen loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </div>
      <span class="chip">${l(e.category||"Music Videos")}</span>
      <h3 style="margin:8px 0 4px">${l(e.title)}</h3>
      <p class="muted" style="margin:0 0 8px">${l(e.artist||"DatBoiSkeet")}</p>
      <div class="row wrap">
        <a class="btn" href="${l(e.youtube)}" target="_blank" rel="noopener">Open on YouTube</a>
        <button class="btn ghost video-share" data-url="${l(e.youtube)}" data-title="${l(e.title)}">Share link</button>
      </div>
    </article>`}function Og(){var d;const e=["Music Videos","Mixes","Interviews"],t={};ge.forEach(c=>{const p=c.category||"Music Videos";(t[p]||(t[p]=[])).push(c)});const s=e.filter(c=>{var p;return(p=t[c])==null?void 0:p.length}).map(c=>{const p=t[c].map(Hn).join("");return`<section class="pikk-video-section" data-video-category="${l(c)}"><h3>${l(c)}</h3><div class="pikk-video-grid">${p}</div></section>`}).join(""),i=Object.keys(t).filter(c=>!e.includes(c)).map(c=>`<section class="pikk-video-section" data-video-category="${l(c)}"><h3>${l(c)}</h3><div class="pikk-video-grid">${t[c].map(Hn).join("")}</div></section>`).join(""),a=wt({publishedOnly:!0,types:["video"]}),n=a.map(c=>{const p=c.youtube||"",m=c.embed||"";if(m||p){const g=m||"";return`<article class="card catalog-admin-video" data-id="${l(c.id)}">
          ${g?`<div class="hero-video" style="margin:0 0 10px"><iframe src="${l(We(g))}" title="${l(c.title)}" allowfullscreen loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>`:""}
          <span class="chip">Admin</span>
          <h3 style="margin:8px 0 4px">${l(c.title)}</h3>
          <p class="muted">${l(c.artist)}</p>
          ${p?`<a class="btn" href="${l(p)}" target="_blank" rel="noopener">Open on YouTube</a>`:""}
        </article>`}return`<article class="card catalog-admin-video" data-id="${l(c.id)}">
        <span class="chip">Admin · uploaded</span>
        <h3 style="margin:8px 0 4px">${l(c.title)}</h3>
        <p class="muted">${l(c.artist)}</p>
        ${c.coverRef?`<img data-idb-src="${l(c.coverRef.startsWith("idb:")?c.coverRef:"")}" src="${l(c.coverRef.startsWith("idb:")?"":c.coverRef)}" alt="" class="catalog-cover" style="width:100%;max-height:220px;object-fit:cover;border-radius:12px;margin:8px 0" />`:""}
        ${c.mediaRef?`<video class="catalog-video" data-idb-src="${l(c.mediaRef.startsWith("idb:")?c.mediaRef:"")}" src="${l(c.mediaRef.startsWith("idb:")?"":c.mediaRef)}" controls playsinline webkit-playsinline preload="metadata" style="width:100%;border-radius:12px;background:#000"></video>`:'<p class="muted">No media file</p>'}
      </article>`}).join(""),o={};Wo.forEach(c=>{var p;(o[p=c.category]||(o[p]=[])).push(c)});const r=Object.entries(o).map(([c,p])=>`
      <div class="card pikk-video-coming-card" data-video-coming-category="${l(c)}">
        <h3>${l(c)}</h3>
        <p class="muted" style="margin:0 0 8px">No verified URLs in repo yet — titles from plan §9 only. No invented view counts.</p>
        <ul class="list-plain">${p.map(m=>`<li><span>${l(m.title)}</span><span class="chip">Coming Soon</span></li>`).join("")}</ul>
      </div>`).join("");return _("Videos & Interviews",`${ko("videos")}
    <section class="pikk-video-hero card">
      <div class="pikk-video-hero-copy">
        <p class="kicker">PIKK VIDEOS · OFFICIAL RELEASES</p>
        <h2>Watch. Discover. Repeat.</h2>
        <p class="muted">Verified DatBoiSkeet music videos, mixes and interviews. Original YouTube playback, with no invented view counts.</p>
        <a class="btn primary" href="#/explore">Explore creators</a>
      </div>
      ${(d=ge[0])!=null&&d.youtube?`<a class="pikk-video-hero-preview" href="${l(ge[0].youtube)}" target="_blank" rel="noopener" aria-label="Watch ${l(ge[0].title)}">
        <img src="https://i.ytimg.com/vi/${l(new URL(ge[0].youtube).searchParams.get("v")||"")}/hqdefault.jpg" alt="" loading="eager" decoding="async" />
        <span class="pikk-video-hero-label">▶ ${l(ge[0].title)}</span>
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
    </section>`,{lead:"Official MVs · Mixes · Interviews · admin uploads."})}function qg(e){var o;const t=[...e.querySelectorAll("[data-videos-filter]")],s=[...e.querySelectorAll(".pikk-video-section[data-video-category]")],i=[...e.querySelectorAll("[data-video-coming-category]")],a=e.querySelector(".pikk-video-coming-list"),n=e.querySelector("[data-video-filter-status]");t.forEach(r=>r.addEventListener("click",()=>{const d=r.dataset.videosFilter||"All";t.forEach(p=>{const m=p===r;p.classList.toggle("on",m),p.setAttribute("aria-pressed",m?"true":"false")}),s.forEach(p=>{const m=d==="All"||p.dataset.videoCategory===d;p.hidden=!m}),i.forEach(p=>{p.hidden=d!=="All"&&p.dataset.videoComingCategory!==d});const c=i.some(p=>!p.hidden);if(a&&(a.hidden=!c),n){const p=s.some(m=>!m.hidden);n.textContent=d==="All"?"Showing all video categories and upcoming titles.":p?`Showing ${d}${c?" and upcoming titles":""}.`:c?`No published ${d} videos yet. Upcoming titles are listed below.`:`No published ${d} videos yet.`}})),(o=e.querySelector(".pikk-video-filters"))==null||o.addEventListener("keydown",r=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(r.key))return;const d=t.indexOf(r.target);if(d<0||!t.length)return;r.preventDefault();const c=r.key==="Home"?0:r.key==="End"?t.length-1:(d+(r.key==="ArrowRight"?1:-1)+t.length)%t.length;t[c].focus(),t[c].click()}),xi(e),e.querySelectorAll("video.catalog-video").forEach(r=>{r.addEventListener("play",()=>Nt()),r.addEventListener("pause",()=>Ye()),r.addEventListener("ended",()=>Ye())}),e.querySelectorAll(".video-share").forEach(r=>{r.addEventListener("click",async()=>{const d=r.dataset.url||"";try{await navigator.clipboard.writeText(d),h("Link copied")}catch{h(d||"Copy failed")}})}),e.querySelectorAll("[data-idb-src]").forEach(async r=>{const d=(r.getAttribute("data-idb-src")||"").trim();if(d)try{const c=await Ei(d);if(!c){r.tagName==="VIDEO"&&r.insertAdjacentHTML("afterend",'<p class="muted" style="font-size:12px">Media blob missing — re-upload from Admin.</p>');return}if((r.tagName==="IMG"||r.tagName==="VIDEO"||r.tagName==="AUDIO")&&(r.setAttribute("src",c),r.src=c,r.tagName==="VIDEO"||r.tagName==="AUDIO")){r.setAttribute("playsinline",""),r.setAttribute("webkit-playsinline",""),r.controls=!0;try{r.load()}catch{}}}catch(c){console.warn("idb media hydrate failed",d,c)}})}function Ng(){const e=Xn.map(i=>`<li><span>${l(i.name)}</span><strong>$${i.price}/mo</strong></li>`).join(""),t=D().creatorSellApps||[],s=t.length?`<ul class="list-plain" style="margin-top:10px">${t.slice(0,8).map(i=>`<li><span>${l(i.name)} · ${l(i.contact)} · ${l(i.sells)}</span><span class="chip">${l(i.status||"pending")}</span></li>`).join("")}</ul>`:'<p class="muted" style="margin:8px 0 0;font-size:12px">No applications on this device yet.</p>';return _("Pricing",`<div class="card">
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
     </div>`,{lead:"Sell music, videos, beats &amp; merch · rules &amp; fees · apply form · memberships &amp; gifts — admin-adjustable."})}function Bg(e){var s;typeof location<"u"&&(location.hash.includes("focus=sell")||location.hash.includes("creator-sell"))&&setTimeout(()=>{var i;return(i=document.getElementById("creator-sell"))==null?void 0:i.scrollIntoView({behavior:"smooth",block:"start"})},60),(s=e.querySelector("#csSubmit"))==null||s.addEventListener("click",()=>{var d,c,p,m,g,f;const i=(c=(d=e.querySelector("#csName"))==null?void 0:d.value)==null?void 0:c.trim(),a=(m=(p=e.querySelector("#csContact"))==null?void 0:p.value)==null?void 0:m.trim(),n=((g=e.querySelector("#csSells"))==null?void 0:g.value)||"both",o=!!((f=e.querySelector("#csAgree"))!=null&&f.checked);if(!i||!a)return h("Name and email/handle required");if(!o)return h("Agree to rules & fees to continue");const r=ml({name:i,contact:a,sells:n,agreed:o});if(r!=null&&r.error)return h(r.error==="rules"?"Agree to rules & fees to continue":"Name and email/handle required");h("Application saved · TEST MODE"),R("#/pricing?focus=sell")})}function Rg(){return _("Community Guidelines",`<div class="card">
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
    </div>`,{lead:"Rules for posts, chat, Live & Lounge — plan §13."})}const Ui=[{id:"dbs-lounge",cat:"NETWORK",hash:"#dbs-lounge",name:"PIKK Lounge",blurb:"Main hub · official announcements & network news",chip:"Hub"},{id:"conversation",cat:"NETWORK",hash:"#the-conversation",name:"The Conversation",blurb:"Public music & fan discussion threads",chip:"Public"},{id:"listening",cat:"VOICE / LISTENING",hash:"#listening-rooms",name:"Listening Rooms",blurb:"Listening parties & reactions to new releases",chip:"Parties"},{id:"backstage",cat:"MEMBERS",hash:"#backstage-rooms",name:"Backstage Rooms",blurb:"Tier-restricted spaces for Skeet+ / Backstage / Inner Circle",chip:"Members"},{id:"live-rooms",cat:"NETWORK",hash:"#live-rooms",name:"Live Rooms",blurb:"Scheduled community events & discussions",chip:"Events"},{id:"spotlight",cat:"NETWORK",hash:"#the-spotlight",name:"The Spotlight",blurb:"Featured fan conversations & creator posts",chip:"Featured"}],zn={"dbs-lounge":[{who:"PIKK · System",text:"Welcome to PIKK Lounge — DatBoiSkeet’s channel-style community hub.",tag:"DEMO"},{who:"TEST MODE",text:"Live chat isn’t connected yet. These rows are placeholders so the room pane feels real.",tag:"DEMO"}],conversation:[{who:"DEMO",text:"Drop takes on new releases here once Phase 2 chat ships.",tag:"DEMO"}],listening:[{who:"DEMO",text:"Listening parties will sync reactions here — preview only.",tag:"DEMO"}],backstage:[{who:"DEMO",text:"Member-tier rooms unlock with Skeet+ / Backstage / Inner Circle.",tag:"DEMO"}],"live-rooms":[{who:"DEMO",text:"Scheduled community events will list here — no live presence yet.",tag:"DEMO"}],spotlight:[{who:"DEMO",text:"Featured fan conversations land here in Phase 2.",tag:"DEMO"}]},jg=[{name:"DatBoiSkeet",role:"Owner"},{name:"SkeetMod",role:"Mod · DEMO"},{name:"FanDemo01",role:"DEMO"},{name:"ListenerX",role:"DEMO"}];function Fg(e){const s=(zn[e.id]||zn["dbs-lounge"]).map(i=>`<div class="lounge-msg">
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
  </div>`}function Kg(){const e=[],t=new Set;Ui.forEach(n=>{t.has(n.cat)||(t.add(n.cat),e.push(n.cat))});const s=e.map(n=>{const o=Ui.filter(r=>r.cat===n).map(r=>`<button type="button" class="lounge-channel${r.id==="dbs-lounge"?" on":""}" data-channel="${l(r.id)}" aria-pressed="${r.id==="dbs-lounge"?"true":"false"}">
            <span class="lounge-hash">#</span>
            <span class="lounge-channel-label">${l(r.name)}</span>
            <span class="chip lounge-channel-chip">${l(r.chip)}</span>
          </button>`).join("");return`<div class="lounge-cat-block">
        <p class="lounge-cat-label">${l(n)}</p>
        ${o}
      </div>`}).join(""),i=Ui.map(Fg).join(""),a=jg.map(n=>`<li><span class="lounge-member-dot" aria-hidden="true"></span><span><strong>${l(n.name)}</strong><br/><span class="muted" style="font-size:11px">${l(n.role)}</span></span></li>`).join("");return _("PIKK Lounge",`<div class="card lounge-intro">
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
    </div>`,{lead:"Discord-inspired channels · DatBoiSkeet branded.",..._g(2)})}function Gg(e=document){const t=e.querySelector("#loungeDiscord")||e,s=[...t.querySelectorAll(".lounge-channel")],i=[...t.querySelectorAll(".lounge-pane")];s.length&&s.forEach(a=>{a.addEventListener("click",()=>{const n=a.dataset.channel;s.forEach(o=>{const r=o===a;o.classList.toggle("on",r),o.setAttribute("aria-pressed",r?"true":"false")}),i.forEach(o=>{o.dataset.pane===n?o.removeAttribute("hidden"):o.setAttribute("hidden","")})})})}function Vg(){return _("Signup & Creator Apps",`<div class="card">
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
    </div>`,{lead:"Free fan signup + creator role applications · §16."})}function Ug(){const t=[{label:"Registration & role approval",status:"Demo",note:"Profile/signup local demo · real auth later"},{label:"Moderation / reporting / appeals",status:"TODO",note:"Guidelines copy ready · enforcement UI Phase 2"},{label:"Payments & refunds",status:"TEST",note:"TEST MODE only · no real charges"},{label:"Creator payouts verification",status:"SHELL",note:"Wallet / KYC stubs · not launch-ready"},{label:"Music & video rights",status:"Partial",note:"3 official MVs · streaming links still SHELL"},{label:"Gift-battle fraud prevention",status:"SHELL",note:"Gift Battles not wired for launch"},{label:"Livestream safety",status:"Demo",note:"Go-live demo PASS · age/safety stack incomplete"},{label:"Background audio pause/resume",status:"PARTIAL",note:"§17 sticky top YT player + pauseDbsPlayer hooks"},{label:"Account recovery / optional 2FA",status:"TODO",note:"Local demo sign-in only"},{label:"Loyalty analytics consent",status:"SHELL",note:"Privacy/consent controls before launch"},{label:"PIKK Connect safety (age + WebRTC)",status:"Blocked",note:"Must not launch without assurance"}].map(s=>`<li><span><strong>${l(s.label)}</strong><br/><span class="muted" style="font-size:12px">${l(s.note)}</span></span><span class="chip">${l(s.status)}</span></li>`).join("");return _("Launch Readiness",`<div class="card">
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
    </div>`,{lead:"Pre-launch checklist with honest demo status · §31."})}function Hg(){const e=[{n:1,title:"Foundation",summary:"Videos, Music/Vault, Posts, profiles, followers, engagement alerts, Clippers applications.",status:"DONE",items:[{label:"§1 Posts",status:"DONE",href:"#/posts"},{label:"§2 Clippers apply",status:"DONE",href:"#/clippers"},{label:"§7 Profiles",status:"DONE",href:"#/profile"},{label:"§8 Music & Vault",status:"DONE",href:"#/music"},{label:"§9 Videos & Interviews",status:"DONE",href:"#/videos"},{label:"§14 Streaming links",status:"DONE",href:"#/music"},{label:"§19 Loading splash",status:"DONE",href:"#/home"},{label:"§20 Home dashboard",status:"DONE",href:"#/home"},{label:"§21 Merch showcase",status:"DONE",href:"#/merch"},{label:"§34 Coming Soon covers",status:"DONE",href:"#/music"},{label:"§17 Home MV + continuous play",status:"PARTIAL",href:"#/home",note:"Sticky top YT player · Stream Everywhere open links · PENDING AUDIT"}]},{n:2,title:"Growth & Creator Economy",summary:"Clipper campaigns, missions, referrals, creator earnings, and payouts.",status:"DONE",items:[{label:"§5 Creator Earnings",status:"DONE",href:"#/earnings"},{label:"§6 Missions",status:"DONE",href:"#/missions"},{label:"§27 Wallet & Payouts",status:"DONE",href:"#/wallet"},{label:"§32 Share & Earn",status:"DONE",href:"#/share"},{label:"§33 Refer & Earn",status:"DONE",href:"#/refer"},{label:"§10 Pricing",status:"DONE",href:"#/pricing"},{label:"§11 Admin dashboard",status:"DONE",href:"#/admin"},{label:"§16 Signup / Creator apps",status:"DONE",href:"#/signup"},{label:"§24 Explore",status:"DONE",href:"#/explore"},{label:"§25 Notifications",status:"DONE",href:"#/notifications"},{label:"§26 Fan Clubs",status:"DONE",href:"#/fanclubs"},{label:"§28 Loyalty Club",status:"DONE",href:"#/loyalty"},{label:"§22 Profile Shop cosmetics",status:"DONE",href:"#/shop",note:"Checker PASS · cosmetics demo"}]},{n:3,title:"Live & Marketplace",summary:"Creator livestreaming, gifts, donations, advertising, creator subscriptions, and Marketplace.",status:"DONE",items:[{label:"§3 Live",status:"DONE",href:"#/live"},{label:"§4 Marketplace ads",status:"DONE",href:"#/marketplace"},{label:"§18 Messages",status:"DONE",href:"#/messages"},{label:"§23 Gift Battles",status:"DONE",href:"#/giftbattles"},{label:"§29 Multi-Guest Live",status:"DONE",href:"#/multiguest"},{label:"§30 Open Mic",status:"DONE",href:"#/openmic"},{label:"§35 24/7 Spotlight",status:"DONE",href:"#/spotlight"},{label:"§36 Connect (opt-in shell)",status:"DONE",href:"#/connect"},{label:"§37 Restream + streamer tiers",status:"DONE",href:"#/restream"},{label:"§13 Guidelines",status:"DONE",href:"#/guidelines"},{label:"§15 Community / Lounge",status:"DONE",href:"#/community"},{label:"§31 Launch readiness",status:"DONE",href:"#/launch"}]}],t=i=>i==="DONE"?"chip chip-ok":i==="PARTIAL"?"chip chip-partial":i==="PENDING AUDIT"?"chip chip-audit":"chip",s=e.map(i=>{const a=i.items.map(n=>{const o=n.note?`<br/><span class="muted" style="font-size:12px">${l(n.note)}</span>`:"";return`<li><span>${n.href?`<a href="${l(n.href)}" style="color:inherit;text-decoration:none"><strong>${l(n.label)}</strong></a>`:`<strong>${l(n.label)}</strong>`}${o}</span><span class="${t(n.status)}">${l(n.status)}</span></li>`}).join("");return`<div class="card">
      <div class="row wrap" style="gap:8px;align-items:center;margin-bottom:8px">
        <span class="chip">Phase ${i.n}</span>
        <span class="${t(i.status)}">${l(i.status)}</span>
      </div>
      <h2 style="margin:0 0 6px">${l(i.title)}</h2>
      <p class="muted" style="margin:0 0 12px">${l(i.summary)}</p>
      <ul class="list-plain">${a}</ul>
    </div>`}).join(`

    `);return _("Development Phases",`<div class="card">
      <p class="kicker">Plan §12</p>
      <h2 style="margin:0 0 8px">Roadmap · what shipped vs remaining</h2>
      <p class="muted" style="margin:0">Phase 1–3 from the DatBoiSkeet developer plan. Chips mirror STATUS.md — <strong>DONE</strong> needs Checker PASS; <strong>PARTIAL</strong> and <strong>PENDING AUDIT</strong> are not launch-complete.</p>
      <p class="muted" style="margin:10px 0 0">Still open: <a href="#/home">§17 sticky player</a> (YT embed · no PIKK-hosted audio yet) · <a href="#/shop">§22 Profile Shop</a> (awaiting Checker) · identity/payout verification &amp; fraud controls before activating real money features.</p>
    </div>

    ${s}

    <div class="card">
      <h3>Before activating paid features</h3>
      <p class="muted" style="margin:0">Implement identity and payout verification, payment security, copyright controls, moderation, and fraud prevention before turning on real charges, gifts, or payouts. See <a href="#/launch">Launch Readiness</a>.</p>
    </div>`,{lead:"Phase 1 · Phase 2 · Phase 3 roadmap with live status chips · §12."})}function zg(e){return _("Not found",`<div class="card"><p>No page for <code>${l(e)}</code>.</p><a class="btn" href="#/home">Home</a></div>`)}function Wg(){return _("Create on PIKK",`<div class="pikk-create-page">${Fo()}
    <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · uploads depend on available prototype tools</p></div>`)}const Yg={"/home":{render:jp,bind:Fp},"/create":{render:Wg},"/updates":{render:Vp,bind:Up},"/posts":{render:cu,bind:du},"/music":{render:Tn,bind:Dn},"/ai-artists":{render:bu,bind:yu},"/shield":{render:Au,bind:Cu},"/vault":{render:Tn,bind:Dn},"/merch":{render:Tu,bind:Du},"/profile":{render:Mu,bind:Lu},"/clippers":{render:Pu,bind:_u},"/videos":{render:Og,bind:qg},"/live":{render:rm,bind:dm},"/viral-live":{render:hm,bind:gm},"/explore":{render:Hm,bind:zm},"/marketplace":{render:bm,bind:ym},"/earnings":{render:_m,bind:Om},"/missions":{render:Rm,bind:jm},"/pricing":{render:Ng,bind:Bg},"/admin":{render:ru,bind:ou},"/guidelines":{render:Rg},"/community":{render:Kg,bind:Gg},"/communities":{render:ig,bind:ag},"/signup":{render:Vg},"/messages":{render:Am,bind:Cm},"/shop":{render:jh,bind:Fh},"/profile-shop":{render:Ph,bind:_h},"/giftbattles":{render:nh,bind:rh},"/notifications":{render:Tm,bind:Dm},"/fanclubs":{render:wh,bind:Sh},"/wallet":{render:Lm,bind:Im},"/loyalty":{render:$h,bind:xh},"/multiguest":{render:vh,bind:bh},"/openmic":{render:Ah,bind:Ch},"/launch":{render:Ug},"/phases":{render:Hg},"/share":{render:Mg,bind:Ig},"/refer":{render:Lg,bind:Pg},"/spotlight":{render:Xh,bind:Zh},"/restream":{render:()=>(queueMicrotask(()=>{location.hash="/connect#connect-multistream"}),ra()),bind:oa},"/shorts":{render:Gn,bind:Vn},"/clips":{render:Gn,bind:Vn},"/connect":{render:ra,bind:oa},"/blockwars":{render:cg,bind:pg},"/games":{render:ug,bind:hg},"/dating":{render:gg,bind:fg},"/roast-arena":{render:xg,bind:$g}};function Ua(){var t,s,i;const e=document.getElementById("tabbar");if(D().user)try{va()}catch{}e.innerHTML=da.map(a=>{const o="/"+a.href.replace(/^#/,"").replace(/^\//,"").split(/[?#]/)[0],r=l(a.label);return`<a${a.primary?' class="tab-primary"':""} href="${a.href}" data-path="${o}" aria-label="${r}"${a.href==="#/create"?' aria-haspopup="dialog" aria-controls="pikkCreateMenu" aria-expanded="false"':a.href==="#/music"?' aria-haspopup="dialog" aria-controls="pikkMusicMenu" aria-expanded="false"':hs[o.slice(1)]?` aria-haspopup="dialog" aria-controls="pikk${r}Menu" aria-expanded="false"`:""}><span class="tab-ico">${a.href==="#/create"?`<img class="pikk-create-logo-icon" src="${yt("/brand/pikk-create-play-cursor-blue.png")}" alt="" width="40" height="29" decoding="async" />`:ms[a.icon]||""}</span><span>${r}</span></a>`}).join("");for(const a of Object.keys(hs))(t=e.querySelector(`a[href="#/${a}"]`))==null||t.addEventListener("click",n=>{n.preventDefault(),Ho(a,n.currentTarget)});(s=e.querySelector('a[href="#/music"]'))==null||s.addEventListener("click",a=>{a.preventDefault(),vt(),tl(a.currentTarget)}),(i=e.querySelector('a[href="#/create"]'))==null||i.addEventListener("click",a=>{var o;is(),vt(),a.preventDefault();const n=Jg();n.hidden=!n.hidden,a.currentTarget.setAttribute("aria-expanded",String(!n.hidden)),n.hidden||(o=n.querySelector("[data-create-close]"))==null||o.focus()}),e.style.gridTemplateColumns="",e.classList.remove("tabbar-scroll"),e.classList.add("tabbar-reshaped","tabbar-fit7")}function Fo(){return Qn.map(e=>{const t=e.items.map(s=>{const i=`<span class="pikk-menu-icon" aria-hidden="true">${ms[s.icon]||ms.explore}</span><strong class="pikk-menu-title">${l(s.title)}</strong><small>${l(s.detail)}</small>`;return s.href?`<a href="${l(s.href)}" class="pikk-create-tile">${i}</a>`:`<div class="pikk-create-tile pikk-create-tile-planned" aria-disabled="true">${i}</div>`}).join("");return`<section class="pikk-create-menu-group" aria-label="${l(e.title)}"><h3>${l(e.title)}</h3><div class="pikk-create-options pikk-create-grid">${t}</div></section>`}).join("")}function Jg(){let e=document.getElementById("pikkCreateMenu");if(e)return e;e=document.createElement("div"),e.id="pikkCreateMenu",e.className="pikk-create-overlay",e.hidden=!0,e.innerHTML=`<div class="pikk-create-sheet" role="dialog" aria-modal="true" aria-label="Create on PIKK">
    <div class="pikk-create-head"><strong>Create on PIKK</strong><button type="button" class="btn ghost" data-create-close aria-label="Close create menu">✕</button></div>
    ${Fo()}
    <button type="button" class="pikk-menu-cancel" data-create-close>Cancel</button>
    <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · uploads depend on available prototype tools</p>
  </div>`,document.body.appendChild(e);const t=(s=!1)=>{e.hidden=!0;const i=document.querySelector('#tabbar a[href="#/create"]');i==null||i.setAttribute("aria-expanded","false"),s&&(i==null||i.focus())};return window.addEventListener("hashchange",()=>t()),e.addEventListener("click",s=>{s.target===e||s.target.closest("[data-create-close]")?t(!0):s.target.closest(".pikk-create-options a")&&t()}),document.addEventListener("keydown",s=>{if(!e.hidden&&(s.key==="Escape"&&(s.preventDefault(),t(!0)),s.key==="Tab")){const i=[...e.querySelectorAll("a[href], button:not([disabled])")],a=i[0],n=i[i.length-1];if(!a){s.preventDefault();return}e.contains(document.activeElement)?s.shiftKey&&document.activeElement===a?(s.preventDefault(),n.focus()):!s.shiftKey&&document.activeElement===n&&(s.preventDefault(),a.focus()):(s.preventDefault(),(s.shiftKey?n:a).focus())}}),e}function Qg(){const e=document.getElementById("tabbar");if(!e)return;Ua();const t=Ke();bo(e,t.path);try{Ko()}catch{}}function Xg(){const e=document.getElementById("sideNav"),t=Ke(),s="#"+(t.raw||t.path),i="#"+t.path,a=al().map(n=>{if(n.href)return`<a class="drawer-direct${n.href===i||n.href===s?" on":""}" href="${n.href}">${l(n.label)}</a>`;const o=n.links||[],r=o.some(m=>m.href===i||m.href===s),d=r?" open":"",c=r?" has-active":"",p=o.map(m=>m.href?`<a class="drawer-link${m.href===i||m.href===s?" on":""}" href="${m.href}">${l(m.label)}</a>`:`<span class="drawer-link drawer-soon" aria-disabled="true">${l(m.label)} <small>· ${l(/planned/i.test(m.detail||"")?"Planned":"Coming Soon")}</small></span>`).join("");return`<div class="drawer-group${d}${c}" data-group="${l(n.id)}"><button type="button" class="drawer-cat" aria-expanded="${r?"true":"false"}"><span>${l(n.label)}</span><span class="drawer-caret" aria-hidden="true"></span></button><div class="drawer-children" role="group">${p}</div></div>`}).join("");e.innerHTML=`<h2>PIKK Network</h2>${a}`}function os(e,t=!1){wp({drawer:document.getElementById("sideNav"),scrim:document.getElementById("scrim"),trigger:document.getElementById("menuBtn")},e,t)}function Zg(e){const t=e.path;Ua(),bo(document.getElementById("tabbar"),t),document.querySelectorAll("#sideNav a").forEach(n=>{const o=n.getAttribute("href")||"";n.classList.toggle("on",o==="#"+t||o==="#"+e.raw)});const s="#"+t,i="#"+e.raw;document.querySelectorAll("#sideNav .drawer-group").forEach(n=>{const o=[...n.querySelectorAll("a")].some(d=>d.getAttribute("href")===s||d.getAttribute("href")===i);n.classList.toggle("open",o),n.classList.toggle("has-active",o);const r=n.querySelector(".drawer-cat");r&&r.setAttribute("aria-expanded",o?"true":"false")});const a=document.getElementById("headerMsg");if(a&&(a.hidden=!1),D().user)try{va()}catch{}Ko()}function Ko(){const e=document.getElementById("headerMsgBadge"),t=document.getElementById("headerMsg");if(!e||!t)return;let s=0;try{s=Ze()}catch{s=0}if(s>0){const i=s>99?"99+":String(s);e.textContent=i,e.hidden=!1,t.setAttribute("aria-label",`Messages, ${s} unread`)}else e.textContent="",e.hidden=!0,t.setAttribute("aria-label","Messages")}function ef(e){var a;os(!1);const t=document.getElementById("app"),s=Yg[e.path],i=s?s.render(e):zg(e.path);t.innerHTML=i,vo(t),(a=s==null?void 0:s.bind)==null||a.call(s,t),Zg(e),kp(e,t,document.getElementById("pikkRouteAnnouncer")),pp(e.path),window.scrollTo(0,0),(e.path==="/music"||e.path==="/vault")&&(location.hash.includes("vault")||e.path==="/vault")&&setTimeout(()=>{var n;return(n=document.getElementById("vault"))==null?void 0:n.scrollIntoView({behavior:"smooth"})},50),e.path==="/pricing"&&(location.hash.includes("focus=sell")||location.hash.includes("creator-sell"))&&setTimeout(()=>{var n;return(n=document.getElementById("creator-sell"))==null?void 0:n.scrollIntoView({behavior:"smooth",block:"start"})},50),e.path==="/wallet"&&(e.elementId==="wallet-coins"||e.query.section==="coins"||location.hash.includes("wallet-coins"))&&setTimeout(()=>{var n;return(n=document.getElementById("wallet-coins"))==null?void 0:n.scrollIntoView({behavior:"smooth",block:"start"})},50),e.path==="/live"&&(e.query.go==="1"||e.elementId==="live-go"||location.hash.includes("go=1"))&&setTimeout(()=>{var n;return(n=document.getElementById("live-go"))==null?void 0:n.scrollIntoView({behavior:"smooth",block:"start"})},50)}function tf(){if(new URLSearchParams(location.search).has("holdSplash"))return;const e=document.getElementById("splash");!e||e.classList.contains("hide")||(e.classList.add("hide"),hl(),setTimeout(()=>e.remove(),500))}function sf(){const e=document.getElementById("splashChime");if(!e)return;const t=()=>{const i=e.play();i&&typeof i.catch=="function"&&i.catch(()=>{})};t();const s=()=>{t(),window.removeEventListener("pointerdown",s),window.removeEventListener("keydown",s)};window.addEventListener("pointerdown",s,{once:!0}),window.addEventListener("keydown",s,{once:!0})}function af(){window.addEventListener("dbs:interrupt-music",e=>{var s;const t=((s=e==null?void 0:e.detail)==null?void 0:s.reason)||"route";Ds(t)}),window.addEventListener("dbs:resume-music",e=>{var s;const t=(s=e==null?void 0:e.detail)==null?void 0:s.reason;t==="live"?mo():t==="video"?Ye():uo(t)})}function nf(){window.addEventListener("dbs:messages-unread",()=>{try{Qg()}catch{}})}function rf(){var e;if((e=document.getElementById("pikkSkipContent"))==null||e.addEventListener("click",()=>{var t;(t=document.getElementById("app"))==null||t.focus()}),sr(),vo(document),Ua(),Xg(),dp(),af(),nf(),document.getElementById("menuBtn").addEventListener("click",()=>os(!0)),document.getElementById("scrim").addEventListener("click",()=>os(!1,!0)),document.addEventListener("keydown",t=>{var s;t.key!=="Escape"||!((s=document.getElementById("sideNav"))!=null&&s.classList.contains("open"))||(t.preventDefault(),os(!1,!0))}),document.getElementById("sideNav").addEventListener("click",t=>{const s=t.target.closest(".drawer-cat");if(s){t.preventDefault();const i=s.closest(".drawer-group"),a=!i.classList.contains("open");document.querySelectorAll("#sideNav .drawer-group").forEach(n=>{const o=a&&n===i;n.classList.toggle("open",o);const r=n.querySelector(".drawer-cat");r&&r.setAttribute("aria-expanded",o?"true":"false")});return}t.target.closest("a")&&os(!1)}),document.getElementById("notifBtn").addEventListener("click",()=>{location.hash="/notifications"}),vp(ef),bp(),!gl()&&!new URLSearchParams(location.search).has("holdSplash")){const t=document.getElementById("splash");t&&t.remove()}else{sf();let t=!1;setTimeout(()=>{t||(t=!0,tf())},3e3)}}rf();const Ha=".pikk-menu-planned, .pikk-create-tile-planned, .drawer-soon, .pikk-notif-planned, [data-coming-soon]";function Go(e){var s,i;const t=(((s=e.querySelector(".pikk-menu-title, strong"))==null?void 0:s.textContent)||((i=e.firstChild)==null?void 0:i.textContent)||"").trim();h(t?`${t} · Coming Soon`:"Coming Soon")}document.addEventListener("click",e=>{var s,i;const t=(i=(s=e.target).closest)==null?void 0:i.call(s,Ha);t&&(e.preventDefault(),Go(t))});document.addEventListener("keydown",e=>{var s,i;if(e.key!=="Enter"&&e.key!==" ")return;const t=(i=(s=e.target).closest)==null?void 0:i.call(s,Ha);t&&(e.preventDefault(),Go(t))});new MutationObserver(()=>{document.querySelectorAll(Ha).forEach(e=>{e.hasAttribute("tabindex")||(e.setAttribute("tabindex","0"),e.setAttribute("role","button"))})}).observe(document.body,{childList:!0,subtree:!0});
