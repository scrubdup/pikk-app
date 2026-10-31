(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(i){if(i.ep)return;i.ep=!0;const n=s(i);fetch(i.href,n)}})();function jn(e,t=Date.now()){const s=new URL(e);return s.searchParams.set("refresh",String(t)),s.toString()}var Rn;(Rn=document.getElementById("pikk-refresh-link"))==null||Rn.addEventListener("click",function(e){e.preventDefault(),window.location.assign(jn(window.location.href))});const Io={BASE_URL:"/pikk-app/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_BASE:"/pikk-app/",VITE_BUILD_SHA:"5f92e6c36034711e2fc2391fe4ee4c59dd5102a6"},hs=Object.freeze([{name:"Block Wars",players:"1–2",icon:"🥊",theme:"fighters",artwork:"/games/approved/01_block_wars.jpg",description:"City-based fighters, combos and special moves.",href:"#/blockwars"},{name:"PIKK Playground",players:"1–8",icon:"🎈",theme:"playground",artwork:"/games/approved/02_pikk_playground.jpg",description:"Create your character, race, jump and explore with friends."},{name:"PIKK Clash",players:"1",icon:"💎",theme:"clash",artwork:"/games/approved/03_pikk_clash.jpg",description:"Original neighborhood-themed match puzzles and venue upgrades."},{name:"PIKK Knockout",players:"1",icon:"💥",theme:"knockout",artwork:"/games/approved/04_pikk_knockout.jpg",description:"Stylized physics challenges: launch, bounce and knock targets off moving platforms."},{name:"PIKK Bowling",players:"1–4",icon:"🎳",theme:"bowling",artwork:"/games/approved/05_pikk_bowling.jpg",description:"Compete for strikes, spares and high scores."},{name:"PIKK Pickleball",players:"2–4",icon:"🏓",theme:"pickleball",artwork:"/games/approved/06_pikk_pickleball.jpg",description:"Play singles or doubles on colorful courts."},{name:"PIKK Pool",players:"1–2",icon:"🎱",theme:"pool",artwork:"/games/approved/07_pikk_pool.jpg",description:"Play 8-ball pool against friends or the computer."},{name:"PIKK Cup Pong",players:"2–4",icon:"🥤",theme:"pong",artwork:"/games/approved/08_pikk_cup_pong.jpg",description:"Aim, throw and eliminate opponents’ cups."},{name:"PIKK Poker",players:"2–8",icon:"♠️",theme:"poker",artwork:"/games/approved/09_pikk_poker.jpg",description:"Social Texas Hold’em with nonredeemable Play Chips."},{name:"PIKK Blackjack",players:"1–5",icon:"🃏",theme:"blackjack",artwork:"/games/approved/10_pikk_blackjack.jpg",description:"Try for 21 against the dealer using Play Chips."},{name:"PIKK Slots",players:"1",icon:"🎰",theme:"slots",artwork:"/games/approved/11_pikk_slots.jpg",description:"Entertainment-only reels and virtual Play Chips."},{name:"PIKK Speed",players:"2",icon:"⚡",theme:"speed",artwork:"/games/approved/12_pikk_speed.jpg",description:"Race to play your cards before your opponent."},{name:"PIKK Spades",players:"4",icon:"♠",theme:"spades",artwork:"/games/approved/13_pikk_spades.jpg",description:"Partner strategy and card battles."},{name:"PIKK Dominoes",players:"2–4",icon:"🁢",theme:"dominoes",artwork:"/games/approved/14_pikk_dominoes.jpg",description:"Match tiles and outplay opponents."},{name:"PIKK Chess",players:"2",icon:"♟",theme:"chess",artwork:"/games/approved/15_pikk_chess.jpg",description:"Challenge opponents in a classic strategy game."}]);function Ws(e){return e!=null&&e.artwork?(Io&&"/pikk-app/"||"/").replace(/\/?$/,"/")+String(e.artwork).replace(/^\/+/,""):""}let Fi;function h(e){const t=document.getElementById("toast");t&&(t.textContent=e,t.classList.add("show"),clearTimeout(Fi),Fi=setTimeout(()=>t.classList.remove("show"),2400))}function l(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function F(e){const t=Math.max(0,Math.floor((Date.now()-e)/1e3));if(t<60)return t+"s";const s=Math.floor(t/60);if(s<60)return s+"m";const a=Math.floor(s/60);return a<24?a+"h":Math.floor(a/24)+"d"}function _(e,t,s={}){let a="";if(s.badgeHtml)a=s.badgeHtml;else if(s.badge){const n=l(s.badge),o=s.badgeAria?` aria-label="${l(s.badgeAria)}"`:"",r=s.badgeTitle||s.badgeAria?` title="${l(s.badgeTitle||s.badgeAria)}"`:"";s.badgeHref?a=`<a class="badge-phase"${o}${r} href="${l(s.badgeHref)}">${n}</a>`:a=`<span class="badge-phase"${o}${r}>${n}</span>`}const i=s.lead?`<p class="lead">${s.lead}</p>`:"";return`
    <section class="page">
      <header class="page-head">
        <h1>${l(e)} ${a}</h1>
        ${i}
      </header>
      ${t}
    </section>
  `}const gs={heart:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.5c0 4.6-8.8 10.4-8.8 10.4S3.2 13.1 3.2 8.5a4.5 4.5 0 0 1 8.8-1.2 4.5 4.5 0 0 1 8.8 1.2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',home:'<svg viewBox="0 0 24 24"><path d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5z" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',posts:'<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 10h8M8 14h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',camera:'<svg viewBox="0 0 24 24"><path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h2.1l1.2-1.8A1.5 1.5 0 0 1 11 3.5h2a1.5 1.5 0 0 1 1.2.7L15.4 6h2.1A2.5 2.5 0 0 1 20 8.5v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-8z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="12.5" r="3.2" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',music:'<svg viewBox="0 0 24 24"><path d="M9 18V6l10-2v12" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="7" cy="18" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="16" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',merch:'<svg viewBox="0 0 24 24"><path d="M6 8h12l1 12H5L6 8zm3-3a3 3 0 0 1 6 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',explore:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m20 20-3.5-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',live:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" fill="currentColor"/><circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.2" opacity=".5"/></svg>',profile:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 19a7 7 0 0 1 14 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',videos:'<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10 9.5v5l5-2.5-5-2.5z" fill="currentColor"/></svg>',chat:'<svg viewBox="0 0 24 24"><path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v5A2.5 2.5 0 0 1 16.5 14H11l-3.5 3v-3H7.5A2.5 2.5 0 0 1 5 11.5v-5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 17.5V19a1 1 0 0 0 1.5.85L14 17h2.5" fill="none" stroke="currentColor" stroke-width="1.6" opacity=".55"/></svg>',msg:'<svg viewBox="0 0 24 24"><rect x="3.5" y="6" width="17" height="12" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m4.5 7.5 7.5 5.2L19.5 7.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',game:'<svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="11" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 13h2.5M9.25 11.5v3M15.2 12.2h.01M17.3 14.2h.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M9 8V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V8" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>'};function Je(e,t="rel=0"){const s=String(e||"").trim();if(!s)return"";const a=s.includes("?")?"&":"?";return`${s}${a}${t}`}const Ys=Object.freeze({videos:[{title:"Video Feed",href:"#/videos",detail:"Watch and discover videos",icon:"▶"},{title:"Shorts & Reels",href:"#/shorts",detail:"Browse short-form clips",icon:"▣"},{title:"Posts",href:"#/posts",detail:"View the community feed",icon:"▤"},{title:"Upload Video",href:"#/posts?type=video",detail:"Available prototype publishing tools · TEST MODE",icon:"⇧"}],connect:[{title:"Connect",href:"#/connect",detail:"Discover people and communities",icon:"♧"},{title:"PIKK Communities",href:"#/communities",detail:"Topic discussions, votes and replies · TEST MODE",icon:"#"},{title:"Communities",href:"#/community",detail:"Explore PIKK Lounge channel rooms",icon:"☷"},{title:"Messages",href:"#/messages",detail:"Open your messages",icon:"✉"},{title:"Random Chat",href:"#/connect#connect-random-chat",detail:"Preview only · real matching unavailable",icon:"◉"},{title:"Multistream",href:"#/connect#connect-multistream",detail:"Broadcast connection preview · TEST MODE",icon:"▹"}],dating:[{title:"Discover Dating",href:"#/dating",detail:"Explore dating features · TEST MODE",icon:"♡"},{title:"Messages",href:"#/messages",detail:"Open private messages",icon:"✉"},{title:"My Profile",href:"#/profile",detail:"Review your profile settings",icon:"◉"},{title:"Safety Guidelines",href:"#/guidelines",detail:"Review community safety rules",icon:"◇"}],games:[{title:"PIKK Arcade",href:"#/games",detail:"View the full game collection · preview",icon:"♜"},...hs.map(e=>({title:e.name,...e.href?{href:e.href}:{},detail:e.href?"Fighting game · development preview":e.description+" · planned",icon:e.name==="Block Wars"?"▣":"♜"}))],shop:[{title:"PIKK Shop",href:"#/shop",detail:"Browse available products",icon:"▤"},{title:"Marketplace",href:"#/marketplace",detail:"Community listings · TEST MODE",icon:"◇"},{title:"Foreign X-Change",href:"#/merch",detail:"Official merchandise",icon:"✦"},{title:"Creator Pricing",href:"#/pricing",detail:"Explore creator selling information",icon:"$"}]}),Po=Object.freeze({"Video Feed":"videos","Shorts & Reels":"videos",Posts:"posts","Upload Video":"videos",Connect:"profile","PIKK Communities":"chat",Communities:"chat",Messages:"msg","Random Chat":"camera",Multistream:"live","Discover Dating":"heart","My Profile":"profile","Safety Guidelines":"heart","PIKK Arcade":"game","PIKK Speed":"game","PIKK Blackjack":"game","PIKK Slots":"game","PIKK Poker":"game","PIKK Spades":"game","PIKK Dominoes":"game","PIKK Chess":"game","PIKK Clash":"game","PIKK Knockout":"game","PIKK Playground":"game","PIKK Bowling":"game","PIKK Pickleball":"game","PIKK Pool":"game","PIKK Cup Pong":"game","Block Wars":"game","PIKK Shop":"merch",Marketplace:"merch","Foreign X-Change":"merch","Creator Pricing":"posts"}),Fn={videos:"pikkVideosMenu",connect:"pikkConnectMenu",dating:"pikkDatingMenu",games:"pikkGamesMenu",shop:"pikkShopMenu"};function bt(e=!1){for(const[t,s]of Object.entries(Fn)){const a=document.getElementById(s);if(!a||a.hidden)continue;a.hidden=!0;const i=document.querySelector(`#tabbar a[href="#/${t}"]`);i==null||i.setAttribute("aria-expanded","false"),e&&(i==null||i.focus())}}function _o(e,t){var r,d,c;if(!Object.hasOwn(Ys,e))return;const s=Fn[e];let a=document.getElementById(s);a||(a=document.createElement("div"),a.id=s,a.className="pikk-create-overlay",a.hidden=!0,a.innerHTML=`<div class="pikk-create-sheet" role="dialog" aria-modal="true" aria-labelledby="${s}Title">
      <div class="pikk-create-head"><strong id="${s}Title">${e[0].toUpperCase()+e.slice(1)} on PIKK</strong><button type="button" class="btn ghost" data-section-close aria-label="Close ${e} menu">✕</button></div>
      <div class="pikk-create-options pikk-create-grid">${Ys[e].map(p=>{const m=`<span class="pikk-menu-icon" aria-hidden="true">${gs[Po[p.title]||"explore"]}</span><strong class="pikk-menu-title">${p.title}</strong><small>${p.detail}</small>`;return p.href?`<a class="pikk-create-tile" href="${p.href}">${m}</a>`:`<div class="pikk-create-tile pikk-menu-planned" aria-disabled="true">${m}</div>`}).join("")}</div>
      <button type="button" class="pikk-menu-cancel" data-section-close>Cancel</button>
      <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · Production features are not enabled until secure services are available.</p>
    </div>`,document.body.appendChild(a),a.addEventListener("click",p=>{p.target===a||p.target.closest("[data-section-close]")?bt(!0):p.target.closest(".pikk-create-options a")&&bt()}),document.addEventListener("keydown",p=>{if(a.hidden)return;if(p.key==="Escape"){p.preventDefault(),bt(!0);return}if(p.key!=="Tab")return;const m=[...a.querySelectorAll("button:not([disabled]), a[href]")],g=m[0],f=m[m.length-1];if(!g){p.preventDefault();return}a.contains(document.activeElement)?p.shiftKey&&document.activeElement===g?(p.preventDefault(),f.focus()):!p.shiftKey&&document.activeElement===f&&(p.preventDefault(),g.focus()):(p.preventDefault(),(p.shiftKey?f:g).focus())}),window.addEventListener("hashchange",()=>bt()));const i=a.hidden;bt();const n=document.getElementById("pikkMusicMenu");n&&!n.hidden&&(n.hidden=!0,(r=document.querySelector('#tabbar a[href="#/music"]'))==null||r.setAttribute("aria-expanded","false"));const o=document.getElementById("pikkCreateMenu");o&&!o.hidden&&(o.hidden=!0,(d=document.querySelector('#tabbar a[href="#/create"]'))==null||d.setAttribute("aria-expanded","false")),a.hidden=!i,t==null||t.setAttribute("aria-expanded",String(i)),i?(c=a.querySelector("[data-section-close]"))==null||c.focus():t==null||t.focus()}const Kn=Object.freeze([{title:"Social & Community",items:[{title:"Create Post",href:"#/posts?type=text",detail:"Text post · TEST MODE",icon:"posts"},{title:"Community Post",href:"#/community",detail:"Open community · preview",icon:"chat"},{title:"Story",detail:"24-hour stories · Planned",icon:"camera"},{title:"Reels",href:"#/posts?type=short",detail:"Short video · TEST MODE",icon:"videos"},{title:"Photo Post",href:"#/posts?type=picture",detail:"Photos · TEST MODE",icon:"camera"},{title:"Create Poll",detail:"Interactive polls · Planned",icon:"posts"},{title:"Create Community",href:"#/community",detail:"Community area · preview",icon:"chat"},{title:"Create Chatroom",detail:"Room creation · Planned",icon:"msg"},{title:"Create Event",detail:"Events · Planned",icon:"explore"}]},{title:"Videos & Music",items:[{title:"Upload Video",href:"#/posts?type=video",detail:"Video upload · TEST MODE",icon:"videos"},{title:"Music Video",href:"#/posts?type=video",detail:"Video composer · TEST MODE",icon:"videos"},{title:"Short Video",href:"#/posts?type=short",detail:"Short composer · TEST MODE",icon:"videos"},{title:"Upload Song",detail:"Song publishing · Planned",icon:"music"},{title:"Upload Album",detail:"Album publishing · Planned",icon:"music"},{title:"Upload EP",detail:"EP publishing · Planned",icon:"music"},{title:"Upload Beats",detail:"Beat publishing · Planned",icon:"music"},{title:"Create Playlist",href:"#/music",detail:"Open music area · preview",icon:"music"},{title:"Add to Vault",href:"#/vault",detail:"Open Vault · preview",icon:"music"}]},{title:"Live & Commerce",items:[{title:"Go Live",href:"#/live?go=1",detail:"Livestream · TEST MODE",icon:"live"},{title:"Schedule Live",detail:"Live scheduling · Planned",icon:"live"},{title:"Live Battle",href:"#/giftbattles",detail:"Battle area · preview",icon:"live"},{title:"List Product",href:"#/marketplace",detail:"Marketplace · TEST MODE",icon:"merch"},{title:"Seller Store",detail:"Store creation · Planned",icon:"merch"},{title:"Paid Content",href:"#/pricing",detail:"Creator pricing · preview",icon:"merch"},{title:"Exclusive Content",detail:"Exclusive publishing · Planned",icon:"heart"}]},{title:"Creator Tools & Protection",items:[{title:"Creator Dashboard",href:"#/profile",detail:"Creator profile",icon:"profile"},{title:"Manage Content",href:"#/posts",detail:"Posts and content",icon:"posts"},{title:"Drafts",detail:"Draft management · Planned",icon:"posts"},{title:"Artist Protection",href:"#/shield",detail:"PIKK Shield local rights drafts · TEST MODE",icon:"music"},{title:"AI Support",detail:"Support assistant · Planned",icon:"chat"}]}]);Object.freeze(Kn.flatMap(e=>e.items));const fe=[{id:"dirty-money",title:"Dirty Money ft. Lil Baby",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=-rHDLWfiuDI",embed:"https://www.youtube.com/embed/-rHDLWfiuDI"},{id:"93",title:"93 ft. DaBaby",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=zC0BYFxs5W0",embed:"https://www.youtube.com/embed/zC0BYFxs5W0"},{id:"no-love",title:"No Love ft. YFN Lucci",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=6pCVEIE9pB8",embed:"https://www.youtube.com/embed/6pCVEIE9pB8"},{id:"bouquet",title:"Bouquet",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=DTe4OiX2otg",embed:"https://www.youtube.com/embed/DTe4OiX2otg"},{id:"where-im-from",title:"Where I'm From ft. Tee Grizzley",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=BH7_Ttk86eQ",embed:"https://www.youtube.com/embed/BH7_Ttk86eQ"},{id:"gang-ties",title:"Gang Ties",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=0ikbrk901Kc",embed:"https://www.youtube.com/embed/0ikbrk901Kc"},{id:"go-2-work",title:"Go 2 Work",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=gRq8c2i4ESM",embed:"https://www.youtube.com/embed/gRq8c2i4ESM"},{id:"ramen-noodles",title:"Ramen Noodles",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=YNCdtAC273M",embed:"https://www.youtube.com/embed/YNCdtAC273M"},{id:"men-in-blacc",title:"Men In Blacc",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=MKyw-hzxQWY",embed:"https://www.youtube.com/embed/MKyw-hzxQWY"},{id:"king-city",title:"King City",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=wyNJYUqpRFM",embed:"https://www.youtube.com/embed/wyNJYUqpRFM"},{id:"in-her-bag",title:"In Her Bag",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=Dux8rm-pzRg",embed:"https://www.youtube.com/embed/Dux8rm-pzRg"},{id:"lonely",title:"Lonely",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=IVnDjPJ8dRg",embed:"https://www.youtube.com/embed/IVnDjPJ8dRg"},{id:"they-aint-coming-home",title:"They Ain't Coming Home",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=Yi4uBFkn0-o",embed:"https://www.youtube.com/embed/Yi4uBFkn0-o"},{id:"mind-on-a-licc",title:"Mind On A Licc",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=sADinuRcRr4",embed:"https://www.youtube.com/embed/sADinuRcRr4"},{id:"dbs-mix",title:"DatBoiSkeet Mix",artist:"DatBoiSkeet",category:"Mixes",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t",embed:"https://www.youtube.com/embed/videoseries?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t",openLink:"https://www.youtube.com/playlist?list=RDEMDYIvPhQWVGU3Zf3gcxT_4w"},{id:"on-the-radar",title:"On The Radar Interview — Talk of The Town",artist:"DatBoiSkeet",category:"Interviews",youtube:"https://www.youtube.com/watch?v=6IFiHo5HrdE",embed:"https://www.youtube.com/embed/6IFiHo5HrdE"}],ni=[{id:"dbs-mix",title:"DatBoiSkeet Mix",blurb:"Official channel Music Videos playlist embed (stable). YouTube Radio Mix link kept as Play on YouTube — RD mixes often fail to embed.",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t",embed:"https://www.youtube.com/embed/videoseries?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t",openLink:"https://www.youtube.com/playlist?list=RDEMDYIvPhQWVGU3Zf3gcxT_4w",source:"channel-pl-music-videos + user-t96u openLink"}],Ka=[{id:"pl-music-videos",title:"DatBoiSkeet Music Videos",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t"},{id:"pl-interviews",title:"DatBoiSkeet Interviews",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQHoRjRTD58TpLGqm0XMsa7U"},{id:"pl-vlogs",title:"DatBoiSkeet Vlogs",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQEqroQ8LYGLgpDfzK3pyutQ"}],Oo=[{category:"Interviews",title:"Off The Porch (no verified DatBoiSkeet YouTube URL yet — add via Admin)"},{category:"Behind the Scenes",title:"BTS clips (coming soon)"},{category:"Exclusive Videos",title:"Vault / member exclusives (coming soon)"}],me={youtube:"https://www.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA",youtubeHandle:"https://www.youtube.com/@DatBoiSkeet1",youtubeMusic:"https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA",spotify:"https://open.spotify.com/artist/0Po64h8VleQOR97okM68zh",apple:"https://music.apple.com/us/artist/datboiskeet/1270542870"},yt=[{id:"stream-dirty-money",title:"Dirty Money (feat. Lil Baby)",artist:"DatBoiSkeet",type:"single",year:2018,albumNote:"From Broke Is the Root of All Evil",cover:"https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2a/7a/67/2a7a676e-af85-489e-55fd-2bae2793948b/datboiskeet-bitroae-cover-3000px.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/track/17Pw88uBIWpgOVCfhEyszG",apple:"https://music.apple.com/us/song/dirty-money-feat-lil-baby/1395681218",youtubeMusic:"https://music.youtube.com/watch?v=-rHDLWfiuDI",youtube:"https://www.youtube.com/watch?v=-rHDLWfiuDI"}},{id:"stream-93",title:"93 (feat. DaBaby)",artist:"DatBoiSkeet",type:"single",year:2019,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/19/60/5f/19605f4c-7014-6dbc-ca18-baa2a672c697/194923194110.png/600x600bb.jpg",links:{spotify:"https://open.spotify.com/track/3gKwZybDOkUoz2wXquDHVZ",apple:"https://music.apple.com/us/album/93-feat-da-baby-single/1493456214",youtubeMusic:"https://music.youtube.com/watch?v=zC0BYFxs5W0",youtube:"https://www.youtube.com/watch?v=zC0BYFxs5W0"}},{id:"stream-no-love",title:"No Love (feat. YFN Lucci)",artist:"DatBoiSkeet",type:"single",year:2017,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/49/e5/62/49e56292-e427-3992-84bd-ead0b06fb06a/artwork.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/track/2KqnCXMM0lAMlEv1fDN63o",apple:"https://music.apple.com/us/album/no-love-feat-yfn-lucci-single/1317778810",youtubeMusic:"https://music.youtube.com/watch?v=6pCVEIE9pB8",youtube:"https://www.youtube.com/watch?v=6pCVEIE9pB8"}},{id:"stream-broke",title:"Broke Is the Root of All Evil",artist:"DatBoiSkeet",type:"album",year:2018,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2a/7a/67/2a7a676e-af85-489e-55fd-2bae2793948b/datboiskeet-bitroae-cover-3000px.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/album/51j6ReXYreCDV0ZwtPdj1Q",apple:"https://music.apple.com/us/album/broke-is-the-root-of-all-evil/1395680910",youtubeMusic:"https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA"}},{id:"stream-talk",title:"Talk of the Town",artist:"DatBoiSkeet",type:"album",year:2020,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/f6/0d/a0/f60da0bf-c3de-8b12-5cd8-e8c1d3c2053b/artwork.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/album/4OY5rM0TBPDsC4n8Dka4Gr",apple:"https://music.apple.com/us/album/talk-of-the-town/1541180619",youtubeMusic:"https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA"}},{id:"stream-said-you-love-me",title:"Said You Love Me",artist:"DatBoiSkeet",type:"single",year:2025,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/f4/4f/6b/f44f6b18-dff9-0486-e6e6-a615724e02fe/artwork.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/album/7FhoRIzhuGgmt2pZlWMc5c",apple:"https://music.apple.com/us/album/said-you-love-me-single/1835164001",youtubeMusic:"https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA"}}],_t=[{id:"long-story-short",title:"Long Story Short",artist:"DatBoiSkeet",cover:"/music/01_Long_Story_Short_Coming_Soon.jpg",status:"Coming Soon",order:1},{id:"ladies-only",title:"Ladies Only",artist:"DatBoiSkeet",cover:"/music/02_Ladies_Only_Coming_Soon.jpg",status:"Coming Soon",order:2}],qo=[{id:"vault-long-story-short",title:"Long Story Short (Vault Preview)",artist:"DatBoiSkeet",cover:"/music/01_Long_Story_Short_Coming_Soon.jpg",tier:"skeet+",status:"Coming Soon"},{id:"vault-ladies-only",title:"Ladies Only (Vault Exclusive)",artist:"DatBoiSkeet",cover:"/music/02_Ladies_Only_Coming_Soon.jpg",tier:"backstage",status:"Coming Soon"}],Ki=[{id:"long-story-short",title:"Long Story Short",artist:"DatBoiSkeet",cover:"/music/01_Long_Story_Short_Coming_Soon.jpg",price:1.29,status:"Coming Soon"},{id:"ladies-only",title:"Ladies Only",artist:"DatBoiSkeet",cover:"/music/02_Ladies_Only_Coming_Soon.jpg",price:1.29,status:"Coming Soon"}],Le=[{id:"hat-716-orange",name:"716 Buffalo Braves Snapback (Black/Orange)",price:30,category:"Hats",image:"/merch/01_black_orange_716_hat.jpeg",shopUrl:"https://foreignx-change.com"},{id:"hat-716-blue",name:"716 Buffalo Hat (Blue/Red)",price:30,category:"Hats",image:"/merch/02_blue_red_716_hat.jpeg",shopUrl:"https://foreignx-change.com"},{id:"jacket-blue",name:"Buffalo Sports Varsity Jacket (Blue/White)",price:200,category:"Jackets",image:"/merch/03_blue_buffalo_jacket.jpeg",shopUrl:"https://foreignx-change.com"},{id:"jacket-black",name:"Foreign X-Change Buffalo Varsity (Black/White)",price:200,category:"Jackets",image:"/merch/07_black_buffalo_jacket.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-fx-back",name:"Foreign X-Change Graphic Tee (Back)",price:65,category:"Shirts",image:"/merch/04_black_fx_tee_back_screenshot.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-fx-front",name:"Foreign X-Change Text Tee (Front)",price:65,category:"Shirts",image:"/merch/05_black_fx_tee_front_screenshot.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-ptsd",name:"PTSD Tee (Black)",price:65,category:"Shirts",image:"/merch/06_black_ptsd_tee.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-abstract",name:"Abstract FX Tee (White)",price:65,category:"Shirts",image:"/merch/08_white_abstract_fx_tee.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-dealer",name:"Support Your Local Dealer Tee (Navy)",price:65,category:"Shirts",image:"/merch/09_navy_dealer_tee.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-skulls",name:"Skulls FX Tee (White)",price:65,category:"Shirts",image:"/merch/10_white_skulls_tee.jpeg",shopUrl:"https://foreignx-change.com"}],Ks=[{id:"frame-chrome-crown",name:"Chrome Crown",category:"frames",rarity:"legendary",price:12.99,emoji:"👑"},{id:"frame-iced-out",name:"Iced Out",category:"frames",rarity:"epic",price:9.99,emoji:"💎"},{id:"frame-trap-flame",name:"Trap Flame",category:"frames",rarity:"epic",price:7.99,emoji:"🔥"},{id:"frame-rodeo-gold",name:"Rodeo Gold",category:"frames",rarity:"rare",price:5.99,emoji:"🤠"},{id:"frame-rose-petals",name:"Rose Petals",category:"frames",rarity:"rare",price:4.99,emoji:"🌹"},{id:"fx-bass-pulse",name:"Bass Pulse",category:"effects",rarity:"epic",price:8.99,emoji:"🎵"},{id:"fx-snowfall",name:"Snowfall",category:"effects",rarity:"rare",price:5.99,emoji:"❄️"},{id:"fx-city-lights",name:"City Lights",category:"effects",rarity:"epic",price:7.99,emoji:"🌃"},{id:"fx-holo-glitch",name:"Holographic Glitch",category:"effects",rarity:"legendary",price:14.99,emoji:"✨"},{id:"ban-skyline",name:"City Skyline",category:"banners",rarity:"rare",price:4.99,emoji:"🏙️"},{id:"ban-studio",name:"Studio Booth",category:"banners",rarity:"rare",price:4.99,emoji:"🎙️"},{id:"ban-arena",name:"Arena Lights",category:"banners",rarity:"epic",price:6.99,emoji:"🏟️"},{id:"ban-chrome",name:"Luxury Chrome",category:"banners",rarity:"legendary",price:11.99,emoji:"🪞"},{id:"name-chrome",name:"Chrome Name",category:"name styles",rarity:"epic",price:6.99,emoji:"🅰️"},{id:"name-neon",name:"Neon Name",category:"name styles",rarity:"rare",price:3.99,emoji:"💜"},{id:"name-varsity",name:"Bold Varsity",category:"name styles",rarity:"rare",price:3.99,emoji:"🏟️"},{id:"name-western",name:"Western Script",category:"name styles",rarity:"epic",price:5.99,emoji:"🏜️"},{id:"badge-dayone",name:"Day One (cosmetic style)",category:"badges",rarity:"rare",price:2.99,emoji:"1️⃣"},{id:"badge-topfan",name:"Top Fan (cosmetic style)",category:"badges",rarity:"epic",price:4.99,emoji:"⭐"},{id:"badge-backstage",name:"Backstage Glow",category:"badges",rarity:"epic",price:5.99,emoji:"🎫"}],No=[{id:"all",label:"All"},{id:"frames",label:"Frames"},{id:"effects",label:"Effects"},{id:"banners",label:"Banners"},{id:"name styles",label:"Name styles"},{id:"badges",label:"Badges"}],Gn=[{id:"skeet",name:"Skeet+",price:3.99,blurb:"Early DatBoiSkeet releases · basic Vault"},{id:"backstage",name:"Backstage",price:7.99,blurb:"Deeper Vault · studio lives · listening rooms"},{id:"inner",name:"Inner Circle",price:14.99,blurb:"VIP drops · private Q&As · Inner Circle rooms"}],Bo=[{label:"Long Story Short",src:"/music/01_Long_Story_Short_Coming_Soon.jpg"},{label:"Ladies Only",src:"/music/02_Ladies_Only_Coming_Soon.jpg"},{label:"716 Orange Hat",src:"/merch/01_black_orange_716_hat.jpeg"},{label:"716 Blue Hat",src:"/merch/02_blue_red_716_hat.jpeg"},{label:"Blue Jacket",src:"/merch/03_blue_buffalo_jacket.jpeg"},{label:"PTSD Tee",src:"/merch/06_black_ptsd_tee.jpeg"}],Ro=[{route:"/explore",title:"Explore",blurb:"Discover DatBoiSkeet · creators · drops"},{route:"/music",title:"Music",blurb:"Long Story Short · Ladies Only · Vault"},{route:"/videos",title:"Videos",blurb:"Official DatBoiSkeet MVs"},{route:"/posts",title:"Posts",blurb:"Text · Picture · Short · Video"},{route:"/shorts",title:"Shorts",blurb:"Under Posts · quick clips"},{route:"/live",title:"Live",blurb:"Go live · TEST MODE demo"},{route:"/shop",title:"PIKK Shop",blurb:"Foreign X-Change merch · external checkout"},{route:"/community",title:"PIKK Lounge",blurb:"Artist-owned rooms · Phase 2"},{route:"/music",title:"Vault",blurb:"Member exclusives · Coming Soon",hash:"vault"},{route:"/marketplace",title:"Marketplace",blurb:"Brand ads & sponsored offers"},{route:"/missions",title:"Missions",blurb:"Clipper promo campaigns"},{route:"/clippers",title:"Clippers",blurb:"Apply · cut clips · earn"}],Vn=[{id:"home",label:"Home",href:"#/home"},{id:"explore",label:"Explore",href:"#/explore"},{id:"profile",label:"Profile / Sign in",href:"#/profile"},{id:"watch",label:"Watch",links:[{href:"#/videos",label:"Videos"},{href:"#/live",label:"Live"},{href:"#/openmic",label:"Open Mic / Talent Discovery (24/7)"},{href:"#/spotlight",label:"Spotlight (24/7)"},{href:"#/multiguest",label:"Multi-Guest Live"}]},{id:"music",label:"Music",links:[{href:"#/music",label:"Music & Vault"}]},{id:"social",label:"Social",links:[{href:"#/posts",label:"Posts"},{href:"#/posts?compose=1",label:"Post · Text / Picture / Short / Video"},{href:"#/shorts",label:"Shorts (in Posts)"},{href:"#/notifications",label:"Notifications"},{href:"#/connect",label:"Connect"},{href:"#/dating",label:"Dating & Connections"},{href:"#/community",label:"Community / Lounge"}]},{id:"messages",label:"Messages",href:"#/messages"},{id:"games",label:"Games",links:[{href:"#/games",label:"PIKK Arcade · 15 Games Coming Soon"},{href:"#/blockwars",label:"Block Wars · Coming Soon"}]},{id:"shop",label:"Shop",links:[{href:"#/merch",label:"Foreign X-Change Merch"},{href:"#/marketplace",label:"Marketplace"},{href:"#/shop",label:"PIKK Shop"},{href:"#/profile-shop",label:"Profile Shop · cosmetics"}]},{id:"earn",label:"Creators & Earnings",links:[{href:"#/wallet",label:"Wallet"},{href:"#/earnings",label:"Creator Earnings"},{href:"#/missions",label:"Missions"},{href:"#/clippers",label:"Clippers Apply"},{href:"#/share",label:"Share & Earn"},{href:"#/refer",label:"Refer & Earn"},{href:"#/pricing",label:"Pricing (rules & fees)"}]},{id:"account",label:"Account",links:[{href:"#/profile",label:"Profile"},{href:"#/signup",label:"Signup / Creator Apps"},{href:"#/loyalty",label:"Loyalty Club"},{href:"#/fanclubs",label:"Fan Clubs"},{href:"#/guidelines",label:"Community Guidelines"}]},{id:"studio",label:"Studio / Owner",links:[{href:"#/admin",label:"Admin"},{href:"#/phases",label:"Development Phases"},{href:"#/launch",label:"Launch Readiness"}]}];Vn.flatMap(e=>e.href?[{href:e.href,label:e.label}]:e.links||[]);const jo=[{href:"#/music",label:"Music",icon:"music"},{href:"#/videos",label:"Videos",icon:"videos"},{href:"#/connect",label:"Connect",icon:"profile"},{href:"#/create",label:"Create",icon:"live",primary:!0},{href:"#/dating",label:"Dating",icon:"heart"},{href:"#/games",label:"Games",icon:"game"},{href:"#/shop",label:"Shop",icon:"merch"}],Un="dbs_v1",ds=()=>({user:null,profiles:{dbs:{id:"dbs",username:"DatBoiSkeet",bio:"Official DatBoiSkeet · Long Story Short & Ladies Only Coming Soon · Vault · Foreign X-Change",avatar:"/brand/logo-dbs-v3@2x.webp",followers:[],following:[],verified:!0}},posts:[],comments:{},likes:{},clipperApps:[],creatorSellApps:[],brandApps:[],listings:[],live:null,liveHistory:[],liveSongRequests:[],coins:{balance:0,history:[]},liveGiftLedger:[],liveGbChallengePop:null,threads:{},demoUnreadSeeded:!1,messagePrefs:{allowDMs:!0,allowRequests:!0},notifications:{releases:!0,lives:!0,messages:!0,quietHours:!1},wallet:{balance:0,history:[]},creatorWallet:{available:0,holds:0,threshold:25,verification:"demo_unverified",earnings:[],payouts:[]},catalog:[],missions:[],giftBattles:{active:null,history:[],champions:[],prefs:{invitationsEnabled:!0}},multiGuest:{active:null,history:[]},spotlight:{nowPlaying:null,queue:[],history:[],houseIndex:0},fanClubs:{clubs:[],posts:{},seeded:!1},shareEarn:{platformsLinked:[],challenge:null,submissions:[],rewardsClaimed:[]},referEarn:{code:"",invitees:[],milestonesClaimed:[]},restream:{platforms:{},selected:[],session:null,history:[],ingest:null,campaign:{tier:null,status:"none",enrolledAt:null,cancelledAt:null},campaignConfig:null},loyalty:{points:0,history:[],badges:[],publicVisible:!0,lastActionAt:{},dayCounts:{}},openMic:{applications:[],seeded:!1,houseIndex:0},profileShop:{owned:[],equipped:{},reduceMotion:!1},hotFeed:{lives:[],posts:[],seededLives:!1,seededPosts:!1,seededPostsVer:0},engagementAlerts:[],postShares:{},splashSeenAt:0,dailyGoals:{app:null,liveByHost:{},history:[]}});function Fo(){var e,t,s,a,i,n,o,r,d,c,p,m,g,f,b,y,v,w,$,C,k,P,T,R,x,Q,D,O,H,K,L,I,q,V,Y,G,z,Se,Ee,Ue,He,dt,pt,ut,mt,te,Ae,Oe,Ms,E,De;try{const Qt=localStorage.getItem(Un);if(!Qt)return ds();const S=JSON.parse(Qt),ie=ds();return{...ie,...S,profiles:{...ie.profiles,...S.profiles||{}},notifications:{...ie.notifications,...S.notifications||{}},wallet:{...ie.wallet,...S.wallet||{}},creatorWallet:{...ie.creatorWallet,...S.creatorWallet||{},earnings:Array.isArray((e=S.creatorWallet)==null?void 0:e.earnings)?S.creatorWallet.earnings:[],payouts:Array.isArray((t=S.creatorWallet)==null?void 0:t.payouts)?S.creatorWallet.payouts:[],available:Number((s=S.creatorWallet)==null?void 0:s.available)||0,holds:Number((a=S.creatorWallet)==null?void 0:a.holds)||0,threshold:Number((i=S.creatorWallet)==null?void 0:i.threshold)>0?Number(S.creatorWallet.threshold):25,verification:((n=S.creatorWallet)==null?void 0:n.verification)==="demo_verified"?"demo_verified":"demo_unverified"},brandApps:S.brandApps||[],listings:Array.isArray(S.listings)?S.listings:[],live:S.live??null,liveHistory:Array.isArray(S.liveHistory)?S.liveHistory:[],liveSongRequests:Array.isArray(S.liveSongRequests)?S.liveSongRequests:[],coins:{balance:Number((o=S.coins)==null?void 0:o.balance)||0,history:Array.isArray((r=S.coins)==null?void 0:r.history)?S.coins.history:[]},liveGiftLedger:Array.isArray(S.liveGiftLedger)?S.liveGiftLedger:[],liveGbChallengePop:S.liveGbChallengePop||null,threads:{...S.threads||{}},demoUnreadSeeded:!!S.demoUnreadSeeded,messagePrefs:{...ie.messagePrefs,...S.messagePrefs||{}},catalog:Array.isArray(S.catalog)?S.catalog:[],missions:Array.isArray(S.missions)?S.missions:[],giftBattles:{...ie.giftBattles,...S.giftBattles||{},history:Array.isArray((d=S.giftBattles)==null?void 0:d.history)?S.giftBattles.history:[],champions:Array.isArray((c=S.giftBattles)==null?void 0:c.champions)?S.giftBattles.champions:[],prefs:{...ie.giftBattles.prefs,...((p=S.giftBattles)==null?void 0:p.prefs)||{}},active:((m=S.giftBattles)==null?void 0:m.active)??null},multiGuest:{...ie.multiGuest,...S.multiGuest||{},history:Array.isArray((g=S.multiGuest)==null?void 0:g.history)?S.multiGuest.history:[],active:((f=S.multiGuest)==null?void 0:f.active)??null},fanClubs:{...ie.fanClubs,...S.fanClubs||{},clubs:Array.isArray((b=S.fanClubs)==null?void 0:b.clubs)?S.fanClubs.clubs:[],posts:(y=S.fanClubs)!=null&&y.posts&&typeof S.fanClubs.posts=="object"?S.fanClubs.posts:{},seeded:!!((v=S.fanClubs)!=null&&v.seeded)},shareEarn:{...ie.shareEarn,...S.shareEarn||{},platformsLinked:Array.isArray((w=S.shareEarn)==null?void 0:w.platformsLinked)?S.shareEarn.platformsLinked:[],challenge:(($=S.shareEarn)==null?void 0:$.challenge)??null,submissions:Array.isArray((C=S.shareEarn)==null?void 0:C.submissions)?S.shareEarn.submissions:[],rewardsClaimed:Array.isArray((k=S.shareEarn)==null?void 0:k.rewardsClaimed)?S.shareEarn.rewardsClaimed:[]},referEarn:{...ie.referEarn,...S.referEarn||{},code:typeof((P=S.referEarn)==null?void 0:P.code)=="string"?S.referEarn.code:"",invitees:Array.isArray((T=S.referEarn)==null?void 0:T.invitees)?S.referEarn.invitees:[],milestonesClaimed:Array.isArray((R=S.referEarn)==null?void 0:R.milestonesClaimed)?S.referEarn.milestonesClaimed:[]},restream:{...ie.restream,...S.restream||{},platforms:(x=S.restream)!=null&&x.platforms&&typeof S.restream.platforms=="object"?S.restream.platforms:{},selected:Array.isArray((Q=S.restream)==null?void 0:Q.selected)?S.restream.selected:[],session:((D=S.restream)==null?void 0:D.session)??null,history:Array.isArray((O=S.restream)==null?void 0:O.history)?S.restream.history:[],ingest:((H=S.restream)==null?void 0:H.ingest)??null,campaign:{...ie.restream.campaign,...((K=S.restream)==null?void 0:K.campaign)||{}},campaignConfig:((L=S.restream)==null?void 0:L.campaignConfig)??null},loyalty:{...ie.loyalty,...S.loyalty||{},points:Number((I=S.loyalty)==null?void 0:I.points)||0,history:Array.isArray((q=S.loyalty)==null?void 0:q.history)?S.loyalty.history:[],badges:Array.isArray((V=S.loyalty)==null?void 0:V.badges)?S.loyalty.badges:[],publicVisible:((Y=S.loyalty)==null?void 0:Y.publicVisible)===void 0?!0:!!S.loyalty.publicVisible,lastActionAt:(G=S.loyalty)!=null&&G.lastActionAt&&typeof S.loyalty.lastActionAt=="object"?S.loyalty.lastActionAt:{},dayCounts:(z=S.loyalty)!=null&&z.dayCounts&&typeof S.loyalty.dayCounts=="object"?S.loyalty.dayCounts:{}},openMic:{...ie.openMic,...S.openMic||{},applications:Array.isArray((Se=S.openMic)==null?void 0:Se.applications)?S.openMic.applications:[],seeded:!!((Ee=S.openMic)!=null&&Ee.seeded),houseIndex:typeof((Ue=S.openMic)==null?void 0:Ue.houseIndex)=="number"?S.openMic.houseIndex:0},profileShop:{...ie.profileShop,...S.profileShop||{},owned:Array.isArray((He=S.profileShop)==null?void 0:He.owned)?S.profileShop.owned:[],equipped:(dt=S.profileShop)!=null&&dt.equipped&&typeof S.profileShop.equipped=="object"?S.profileShop.equipped:{},reduceMotion:!!((pt=S.profileShop)!=null&&pt.reduceMotion)},hotFeed:{...ie.hotFeed,...S.hotFeed||{},lives:Array.isArray((ut=S.hotFeed)==null?void 0:ut.lives)?S.hotFeed.lives:[],posts:Array.isArray((mt=S.hotFeed)==null?void 0:mt.posts)?S.hotFeed.posts:[],seededLives:!!((te=S.hotFeed)!=null&&te.seededLives),seededPosts:!!((Ae=S.hotFeed)!=null&&Ae.seededPosts),seededPostsVer:Number((Oe=S.hotFeed)==null?void 0:Oe.seededPostsVer)||0},engagementAlerts:Array.isArray(S.engagementAlerts)?S.engagementAlerts:[],postShares:S.postShares&&typeof S.postShares=="object"?S.postShares:{},creatorSellApps:Array.isArray(S.creatorSellApps)?S.creatorSellApps:[],dailyGoals:{...ie.dailyGoals,...S.dailyGoals||{},app:((Ms=S.dailyGoals)==null?void 0:Ms.app)??null,liveByHost:(E=S.dailyGoals)!=null&&E.liveByHost&&typeof S.dailyGoals.liveByHost=="object"?S.dailyGoals.liveByHost:{},history:Array.isArray((De=S.dailyGoals)==null?void 0:De.history)?S.dailyGoals.history:[]}}}catch{return ds()}}function A(e){localStorage.setItem(Un,JSON.stringify(e))}let u=Fo();function M(){return u}function Gi(e){return u={...u,...e},A(u),u}function Ko(e){return u=e(u)||u,A(u),u}function nt(e){e&&(u={...u,profiles:{...u.profiles,[e.id]:{id:e.id,username:e.username,bio:e.bio||"",avatar:e.avatar||"",followers:e.followers||[],following:e.following||[],memberships:e.memberships||{},verified:!!e.verified}}})}function $t(e){return e?u.user&&u.user.id===e?u.user:u.profiles[e]||null:null}function Vi(e){const t=$t(e);return t?(t.followers||[]).map(s=>$t(s)||{id:s,username:s}).filter(Boolean):[]}function Ga(e){const t=$t(e);return t?(t.following||[]).map(s=>$t(s)||{id:s,username:s}).filter(Boolean):[]}function Hn(){if(u.posts.length)return;const e=[{id:"p1",userId:"dbs",username:"DatBoiSkeet",text:"Long Story Short — cover is up. Coming Soon on DBS Music. Stay ready.",image:"/music/01_Long_Story_Short_Coming_Soon.jpg",at:Date.now()-864e5*2},{id:"p2",userId:"dbs",username:"DatBoiSkeet",text:"Foreign X-Change — hats, tees & jackets. Checkout on ForeignX-Change.com (not inside DBS).",image:"/merch/01_black_orange_716_hat.jpeg",at:Date.now()-864e5},{id:"p3",userId:"dbs",username:"DatBoiSkeet",text:"Ladies Only — cover art live. Official playback unlocks when the single drops.",image:"/music/02_Ladies_Only_Coming_Soon.jpg",at:Date.now()-864e5*3},{id:"p4",userId:"dbs",username:"DatBoiSkeet",text:"716 Buffalo Braves snapback on Foreign X-Change — shop the external store.",image:"/merch/02_blue_red_716_hat.jpeg",at:Date.now()-864e5*4}];u={...u,posts:e,likes:{p1:[],p2:[],p3:[],p4:[]},comments:{p1:[],p2:[],p3:[],p4:[]}},A(u)}function Kt(e){const t=(e||"Fan").trim().slice(0,24)||"Fan",s="u_"+t.toLowerCase().replace(/\W+/g,"_")+"_"+Date.now().toString(36),a={id:s,username:t,bio:"DBS fan · local demo account (TEST MODE)",avatar:"",followers:[],following:["dbs"],membership:null,memberships:{skeetPlus:!1,backstage:!1,innerCircle:!1},purchasedTracks:[],createdAt:Date.now()},i=u.profiles.dbs||ds().profiles.dbs,n=new Set(i.followers||[]);return n.add(s),u={...u,user:a,profiles:{...u.profiles,dbs:{...i,followers:[...n]}}},nt(a),A(u),a}function Go(){u={...u,user:null},A(u)}function Vo({bio:e,avatar:t,username:s}){const a=u.user;if(!a)return{error:"signin"};const i={...a,bio:e!==void 0?String(e).slice(0,280):a.bio,avatar:t!==void 0?String(t).trim():a.avatar,username:s!==void 0&&String(s).trim().slice(0,24)||a.username};return u={...u,user:i},nt(i),A(u),i}function la(e,t=!0){const s=u.user;if(!s)return{error:"signin"};let a=s.membership??null;const i=c=>c==="skeet"||c==="skeetPlus"||c==="skeet+"?"skeet+":c==="backstage"?"backstage":c==="inner"||c==="innerCircle"?"inner":null,n={null:0,"skeet+":1,backstage:2,inner:3},o=i(e);t?o&&(a=o):a=null;const r={skeetPlus:n[a||"null"]>=1,backstage:n[a||"null"]>=2,innerCircle:n[a||"null"]>=3},d={...s,membership:a,memberships:r};return u={...u,user:d},nt(d),A(u),d}function Et(){const e=u.user;if(!e)return null;if(e.membership)return e.membership;const t=e.memberships||{};return t.innerCircle?"inner":t.backstage?"backstage":t.skeetPlus?"skeet+":null}function Va(e="skeet"){const t=Et(),s={null:0,"skeet+":1,backstage:2,inner:3},a=e==="backstage"?2:e==="inner"?3:1;return(s[t||"null"]||0)>=a}function Uo(e){const t=u.user;if(!t)return{error:"signin"};const s=new Set(t.purchasedTracks||[]);s.add(e);const a={...t,purchasedTracks:[...s]};return u={...u,user:a},nt(a),A(u),a}function Ui({text:e,image:t,mediaType:s,mediaUrl:a}){const i=u.user;if(!i)throw new Error("Sign in required");const n="p_"+Date.now().toString(36),o=["picture","short","video","image","text"].includes(s)?s==="image"?"picture":s:t?"picture":"text",r={id:n,userId:i.id,username:i.username,text:(e||"").trim(),image:(t||"").trim(),mediaType:o==="text"&&!(t||"").trim()?"text":o,mediaUrl:(a||"").trim(),at:Date.now()};return u={...u,posts:[r,...u.posts],likes:{...u.likes,[n]:[]},comments:{...u.comments,[n]:[]}},A(u),r}function Ho(e){const t=u.user;if(!t)return{error:"signin"};const s=new Set(u.likes[e]||[]);s.has(t.id)?s.delete(t.id):s.add(t.id),u={...u,likes:{...u.likes,[e]:[...s]}},A(u);try{je()}catch{}return{count:s.size,liked:s.has(t.id)}}function zo(e,t){const s=u.user;if(!s)return{error:"signin"};const a={id:"c_"+Date.now().toString(36),userId:s.id,username:s.username,text:t.trim(),at:Date.now()},i=u.comments[e]||[];u={...u,comments:{...u.comments,[e]:[...i,a]}},A(u);try{je()}catch{}return a}function ca(e){const t=u.user;if(!t)return{error:"signin"};if(e===t.id)return{error:"self"};if(t.following.includes(e))return t;const s={...t,following:[...t.following,e]},a={...u.profiles},i=a[e]||$t(e);if(i){const n=new Set(i.followers||[]);n.add(t.id),a[e]={...i,followers:[...n]}}return u={...u,user:s,profiles:a},nt(s),A(u),s}function da(e){const t=u.user;if(!t)return{error:"signin"};const s={...t,following:(t.following||[]).filter(n=>n!==e)},a={...u.profiles},i=a[e]||$t(e);return i&&(a[e]={...i,followers:(i.followers||[]).filter(n=>n!==t.id)}),u={...u,user:s,profiles:a},nt(s),A(u),s}function Wo(e){const t={id:"clip_"+Date.now().toString(36),...e,status:"pending",at:Date.now()};return u={...u,clipperApps:[t,...u.clipperApps]},A(u),t}function Yo(e){const t=e||{},s=String(t.name||"").trim().slice(0,80),a=String(t.contact||t.email||t.handle||"").trim().slice(0,120),i=String(t.sells||"both").trim().slice(0,40),n=!!t.agreed;if(!s||!a)return{error:"missing"};if(!n)return{error:"rules"};const o={id:"csa_"+Date.now().toString(36),name:s,contact:a,sells:["music","merch","both"].includes(i)?i:"both",agreed:!0,status:"pending",at:Date.now()},r=[o,...u.creatorSellApps||[]].slice(0,40);return u={...u,creatorSellApps:r},A(u),{ok:!0,app:o}}function zn(e,t){if(!["pending","approved","rejected","waitlisted"].includes(t))return{error:"bad_status"};const a=u.clipperApps.map(i=>i.id===e?{...i,status:t,reviewedAt:Date.now()}:i);return u={...u,clipperApps:a},A(u),a.find(i=>i.id===e)}function Ca(e){u={...u,notifications:{...u.notifications,...e}},A(u)}function Jo(){u={...u,splashSeenAt:Date.now()},A(u)}function Qo(){return!u.splashSeenAt}function ae(){return!!(u.user&&u.user.role==="admin")}function Ss(e=!0){const t=u.user;if(!t)return{error:"signin"};const s={...t,role:e?"admin":"fan"};return u={...u,user:s},nt(s),A(u),s}function Wn(){var r;const e=u.posts||[],t=u.clipperApps||[],s={pending:0,approved:0,rejected:0,waitlisted:0};t.forEach(d=>{const c=d.status||"pending";s[c]!==void 0?s[c]+=1:s.pending+=1});let a=0;Object.values(u.likes||{}).forEach(d=>{a+=(d||[]).length});let i=0;Object.values(u.comments||{}).forEach(d=>{i+=(d||[]).length});let n=0;u.user&&(u.user.membership||(r=u.user.memberships)!=null&&r.skeetPlus)&&(n+=1),Object.values(u.profiles||{}).forEach(d=>{var c,p;d.id!==((c=u.user)==null?void 0:c.id)&&(d.membership||(p=d.memberships)!=null&&p.skeetPlus)&&(n+=1)});const o=u.catalog||[];return{posts:e.length,likes:a,comments:i,clippers:t.length,clipperByStatus:s,members:n,profiles:Object.keys(u.profiles||{}).length,catalogTotal:o.length,catalogPublished:o.filter(d=>d.published).length}}function Yn(e){const t=["spotify","apple","youtubeMusic","youtube","tidal","amazon"],s={};if(!e||typeof e!="object")return s;for(const a of t){const i=String(e[a]||"").trim();(i.startsWith("http://")||i.startsWith("https://"))&&(s[a]=i.slice(0,500))}return s}function St({publishedOnly:e=!1,types:t=null,includeUnpublishedForAdmin:s=!1}={}){let a=u.catalog||[];if(e?a=a.filter(i=>i.published):s||(a=a.filter(i=>i.published)),t&&t.length){const i=new Set(t);a=a.filter(n=>i.has(n.type))}return[...a].sort((i,n)=>(n.createdAt||0)-(i.createdAt||0))}function Xo(e){var a;if(!ae())return{error:"forbidden"};const s={id:e.id||"cat_"+Date.now().toString(36),type:e.type,title:String(e.title||"").trim().slice(0,120),artist:String(e.artist).trim().slice(0,80),coverRef:e.coverRef||"",mediaRef:e.mediaRef||"",youtube:String(e.youtube||"").trim(),embed:String(e.embed||"").trim(),streamingLinks:Yn(e.streamingLinks),published:!!e.published,createdAt:Date.now(),updatedAt:Date.now(),createdBy:((a=u.user)==null?void 0:a.id)||null};return s.title?["song","album","video","picture"].includes(s.type)?(u={...u,catalog:[s,...u.catalog||[]]},A(u),s):{error:"type"}:{error:"title"}}function Jn(e,t){if(!ae())return{error:"forbidden"};let s=null;const a=(u.catalog||[]).map(i=>{if(i.id!==e)return i;const n={...i,...t,id:i.id,updatedAt:Date.now()};return t&&Object.prototype.hasOwnProperty.call(t,"streamingLinks")&&(n.streamingLinks=Yn(t.streamingLinks)),s=n,s});return s?(u={...u,catalog:a},A(u),s):{error:"missing"}}function Zo(e,t){return Jn(e,{published:!!t})}function el(e){if(!ae())return{error:"forbidden"};const t=(u.catalog||[]).filter(s=>s.id!==e);return u={...u,catalog:t},A(u),!0}function Hi(e){const t=u.user;if(!t)return{error:"signin"};if(u.live&&!u.live.endedAt)return{error:"already_live",live:u.live};const s={id:"live_"+Date.now().toString(36),hostId:t.id,hostName:t.username,title:(e||"DBS Live · TEST MODE").trim().slice(0,80),startedAt:Date.now(),viewers:3+Math.floor(Math.random()*18),giftsTotal:0,tipsTotal:0,giftLog:[],chat:[{id:"sys1",userId:"system",username:"DBS",text:"Welcome · Follow DatBoiSkeet · TEST MODE (no real stream)",at:Date.now()}],endedAt:null};return u={...u,live:s},A(u),s}function tl(){if(!u.live||u.live.endedAt)return u.live;const e={...u.live,endedAt:Date.now()},t=[e,...u.liveHistory||[]].slice(0,20);return u={...u,live:e,liveHistory:t},A(u),e}function sl(){if(!u.live||u.live.endedAt)return u.live;const e=Math.floor(Math.random()*5)-1,t=Math.max(1,(u.live.viewers||1)+e),s={...u.live,viewers:t};return u={...u,live:s},A(u),s}function al(e){const t=u.user;if(!t)return{error:"signin"};if(!u.live||u.live.endedAt)return{error:"offline"};const s={id:"lc_"+Date.now().toString(36),userId:t.id,username:t.username,text:String(e||"").trim().slice(0,280),at:Date.now()};if(!s.text)return{error:"empty"};const a={...u.live,chat:[...u.live.chat||[],s]};return u={...u,live:a},A(u),s}function Qn({kind:e="tip",amount:t=1,label:s=""}={}){var m;const a=u.user;if(!a)return{error:"signin"};if(!u.live||u.live.endedAt)return{error:"offline"};const i=Math.max(.5,Number(t)||1),n=e==="gift"?"gift":"tip",o=((m=u.wallet)==null?void 0:m.balance)||0;let r=u.wallet||{balance:0,history:[]};o>=i&&(r={balance:+(o-i).toFixed(2),history:[...r.history||[],{at:Date.now(),amount:-i,note:`Live ${n} · ${u.live.title}`}]});const d={id:"lg_"+Date.now().toString(36),userId:a.id,username:a.username,kind:n,amount:i,label:(s||(n==="gift"?"🔥 Fire":"Tip")).slice(0,40),at:Date.now()},c={id:"lc_"+Date.now().toString(36)+"g",userId:a.id,username:a.username,text:n==="gift"?`sent ${d.label} ($${i.toFixed(2)}) · TEST MODE`:`tipped $${i.toFixed(2)} · TEST MODE`,at:Date.now(),support:!0},p={...u.live,giftsTotal:(u.live.giftsTotal||0)+(n==="gift"?i:0),tipsTotal:(u.live.tipsTotal||0)+(n==="tip"?i:0),giftLog:[...u.live.giftLog||[],d],chat:[...u.live.chat||[],c]};return u={...u,live:p,wallet:r},A(u),o>=i&&hi({category:n==="gift"?"gifts":"tips",gross:i,note:`Live ${n} from @${a.username} · ${u.live.title}`,source:"live"}),{live:p,entry:d,wallet:u.wallet,creatorWallet:u.creatorWallet}}function il(){return u.liveHistory||[]}const Xn=[{pack:1,price:10,label:"1 song",save:0},{pack:2,price:25,label:"2 songs",save:0},{pack:3,price:45,label:"3 songs",save:5}];function ps(){return Array.isArray(u.liveSongRequests)?u.liveSongRequests:[]}function nl(e){var s;const t=e||((s=u.live)==null?void 0:s.id);return t?ps().filter(a=>a.liveId===t):[]}function ri(e){const t=[];for(const s of nl(e))(s.titles||[]).forEach((a,i)=>{t.push({requestId:s.id,songIndex:i,title:a,status:s.songStatuses&&s.songStatuses[i]||"queued",username:s.username,userId:s.userId,pack:s.pack,price:s.price,at:s.at})});return t}function rl({pack:e,titles:t}={}){var p;const s=u.user;if(!s)return{error:"signin"};if(!u.live||u.live.endedAt)return{error:"offline"};const a=Xn.find(m=>m.pack===Number(e));if(!a)return{error:"bad_pack"};const i=(Array.isArray(t)?t:[]).map(m=>String(m||"").trim().slice(0,80)).filter(Boolean);if(i.length!==a.pack)return{error:"title_count",need:a.pack,got:i.length};const n=lr(a.price,`Song request ×${a.pack} · ${u.live.title} · TEST MODE`);if((n==null?void 0:n.error)==="insufficient")return{error:"insufficient",need:a.price,balance:Number(((p=u.wallet)==null?void 0:p.balance)||0)};const o={id:"lsr_"+Date.now().toString(36),liveId:u.live.id,hostId:u.live.hostId,userId:s.id,username:s.username,pack:a.pack,price:a.price,titles:i,songStatuses:i.map(()=>"queued"),status:"open",at:Date.now(),charged:a.price},r=[o,...ps()].slice(0,200),d={id:"lc_"+Date.now().toString(36)+"sr",userId:s.id,username:s.username,text:`requested ${a.pack} song${a.pack>1?"s":""} ($${a.price}) · TEST MODE`,at:Date.now(),support:!0},c={...u.live,chat:[...u.live.chat||[],d]};return u={...u,liveSongRequests:r,live:c},A(u),hi({category:"tips",gross:a.price,note:`Song request ×${a.pack} from @${s.username} · ${u.live.title}`,source:"live_song_request"}),{ok:!0,entry:o,wallet:u.wallet,live:u.live}}function oi(e,t,s){var b;const a=u.user;if(!a)return{error:"signin"};if(!["playing","played","skipped","queued"].includes(s))return{error:"bad_status"};const n=ps().findIndex(y=>y.id===e);if(n<0)return{error:"missing"};const o=ps()[n],r=u.live;if(!(r&&r.hostId===a.id&&r.id===o.liveId||a.id===o.hostId)&&!ae())return{error:"host_only"};const c=Number(t);if(!Number.isInteger(c)||c<0||c>=(o.titles||[]).length)return{error:"bad_index"};let p=[...o.songStatuses||o.titles.map(()=>"queued")];if(s==="playing"){const y=ps().map(v=>{if(v.liveId!==o.liveId)return v;const w=[...v.songStatuses||(v.titles||[]).map(()=>"queued")];let $=!1;for(let k=0;k<w.length;k++)w[k]==="playing"&&(w[k]="played",$=!0);if(!$)return v;const C=w.every(k=>k==="played"||k==="skipped");return{...v,songStatuses:w,status:C?"done":"open"}});u={...u,liveSongRequests:y},p=[...((b=u.liveSongRequests[n])==null?void 0:b.songStatuses)||p]}p[c]=s;const m=p.every(y=>y==="played"||y==="skipped"),g={...u.liveSongRequests[n],songStatuses:p,status:m?"done":"open"},f=[...u.liveSongRequests];return f[n]=g,u={...u,liveSongRequests:f},A(u),{ok:!0,entry:g}}function ol(e,t){return oi(e,t,"playing")}function ll(e,t){return oi(e,t,"skipped")}function cl(e,t){return oi(e,t,"played")}const li=[{slug:"rose",name:"DBS Rose",coins:5,usd:.1,animation:"Rotating glossy rose and petals",tier:"small"},{slug:"big-love",name:"Big Love",coins:25,usd:.5,animation:"Pulsing luminous heart",tier:"small"},{slug:"turn-up",name:"Turn Up",coins:50,usd:1,animation:"Flame burst and DBS sparks",tier:"small"},{slug:"cash-rain",name:"Cash Rain",coins:150,usd:3,animation:"Stylized bills and confetti",tier:"mid"},{slug:"bottle-pop",name:"Bottle Pop",coins:300,usd:6,animation:"Bottle pop and confetti",tier:"mid"},{slug:"money-gun",name:"Money Gun",coins:750,usd:15,animation:"Stylized cash launcher",tier:"premium"},{slug:"diamond-drip",name:"Diamond Drip",coins:1500,usd:30,animation:"Rotating diamond",tier:"premium"},{slug:"foreign-whip",name:"Foreign Whip",coins:3e3,usd:60,animation:"Original luxury vehicle drives across screen",tier:"premium"},{slug:"helicopter",name:"Helicopter",coins:5e3,usd:100,animation:"Helicopter spotlight flyover",tier:"cinematic"},{slug:"private-jet",name:"Private Jet",coins:1e4,usd:200,animation:"Jet cinematic flyover",tier:"cinematic"},{slug:"dbs-crown",name:"DBS Crown",coins:25e3,usd:500,animation:"Gold diamond crown",tier:"cinematic"},{slug:"dbs-universe",name:"DBS Universe",coins:5e4,usd:1e3,animation:"Galaxy DBS logo reveal",tier:"cinematic"}],pa=[{coins:100,usd:2},{coins:500,usd:10},{coins:1e3,usd:20},{coins:2500,usd:50},{coins:5e3,usd:100},{coins:1e4,usd:200}],dl=750,Ta=80,zi=20;function ua(e){return{balance:Math.max(0,Number(e==null?void 0:e.balance)||0),history:Array.isArray(e==null?void 0:e.history)?e.history:[]}}function ma(){return ua(u.coins).balance}function pl(){return pa.map(e=>({...e}))}function ul(){return li.map(e=>({...e}))}function Zn(e){const t=pa.find(n=>n.coins===Number(e));if(!t)return{error:"bad_package"};const s=ua(u.coins),a={at:Date.now(),amount:t.coins,note:`Bought ${t.coins} coins ($${t.usd}) · TEST MODE`,kind:"buy",packageCoins:t.coins,usd:t.usd},i={balance:s.balance+t.coins,history:[a,...s.history].slice(0,200)};return u={...u,coins:i},A(u),{ok:!0,coins:i,pack:t,entry:a}}function ci(){return Array.isArray(u.liveGiftLedger)?u.liveGiftLedger:[]}function ml(e){var s;const t=e||((s=u.live)==null?void 0:s.id);return t?ci().filter(a=>a.liveId===t).map(a=>({id:a.id,liveId:a.liveId,giftSlug:a.giftSlug,giftName:a.giftName,coins:a.coins,usd:a.usd,fromUserId:a.fromUserId,fromUser:a.fromUser,at:a.at,animation:a.animation,tier:a.tier})):[]}function hl(e=10,t=Date.now()){const s=Math.min(Math.max(1,Number(e)||10),10),a=new Date(t);a.setHours(0,0,0,0);const i=a.getTime(),n=new Date(t);n.setHours(23,59,59,999);const o=n.getTime(),r={};for(const d of ci()){const c=Number(d.at||0);if(c<i||c>o)continue;const p=d.fromUserId||d.fromUser||"anon",m=r[p]||{userId:p,username:d.fromUser||p,usd:0,coins:0,gifts:0,lastSlug:d.giftSlug||"rose"};m.usd=+(m.usd+Number(d.usd||0)).toFixed(2),m.coins+=Number(d.coins||0),m.gifts+=1,m.username=d.fromUser||m.username,m.lastSlug=d.giftSlug||m.lastSlug,r[p]=m}return Object.values(r).sort((d,c)=>c.usd-d.usd||c.coins-d.coins||d.username.localeCompare(c.username)).slice(0,s)}function er(e){let s=(mi(u.creatorWallet).earnings||[]).filter(a=>a.category==="gifts");return e&&(s=s.filter(a=>!a.hostId||a.hostId===e)),s.map(a=>({...a}))}function gl({liveId:e,slug:t}={}){const s=u.user;if(!s)return{error:"signin"};const a=u.live;if(!a||a.endedAt)return{error:"offline"};if(e&&e!==a.id)return{error:"live_mismatch"};const i=li.find(x=>x.slug===t);if(!i)return{error:"bad_gift"};const n=ua(u.coins);if(n.balance<i.coins)return{error:"insufficient",need:i.coins,balance:n.balance};const o=N(i.usd),r=0,d=o,c=N(d*Ta/100),p=N(d-c),m=Date.now(),g="lgift_"+m.toString(36)+"_"+Math.random().toString(36).slice(2,6),f={at:m,amount:-i.coins,note:`Gift ${i.name} · ${a.title} · TEST MODE`,kind:"gift",giftSlug:i.slug,liveId:a.id,usd:o},b={balance:n.balance-i.coins,history:[f,...n.history].slice(0,200)},y={id:g,liveId:a.id,hostId:a.hostId,giftSlug:i.slug,giftName:i.name,coins:i.coins,usd:o,fees:r,net:d,creatorShare:c,platformShare:p,dbsShare:p,creatorPct:Ta,dbsPct:zi,fromUserId:s.id,fromUser:s.username,at:m,animation:i.animation,tier:i.tier,testModeNetAsListed:!0},v={id:g,userId:s.id,username:s.username,kind:"gift",giftSlug:i.slug,label:i.name,amount:o,coins:i.coins,at:m},w={id:"lc_"+m.toString(36)+"gf",userId:s.id,username:s.username,text:`sent ${i.name} (${i.coins} coins) · TEST MODE`,at:m,support:!0,giftSlug:i.slug},$={...a,giftsTotal:N((a.giftsTotal||0)+o),giftLog:[...a.giftLog||[],v],chat:[...a.chat||[],w]},C=[y,...ci()].slice(0,500),k=mi(u.creatorWallet),P={id:"earn_"+m.toString(36)+"_"+Math.random().toString(36).slice(2,6),category:"gifts",label:"Live gifts",note:`Live gift ${i.name} from @${s.username} · ${a.title}`,gross:o,fees:r,net:d,creatorPct:Ta,dbsPct:zi,creatorShare:c,dbsShare:p,source:"live_gift",giftSlug:i.slug,giftId:g,liveId:a.id,hostId:a.hostId,fromUserId:s.id,at:m,payoutId:null},T={...k,available:N(k.available+c),earnings:[P,...k.earnings||[]]},R={id:"gbpop_"+m.toString(36),liveId:a.id,fromUserId:s.id,fromUser:s.username,giftSlug:i.slug,giftName:i.name,coins:i.coins,usd:o,at:m,expiresAt:m+6e4};return u={...u,coins:b,live:$,liveGiftLedger:C,creatorWallet:T,liveGbChallengePop:R},A(u),{ok:!0,entry:y,viewerEntry:v,coins:b,live:$,earning:P,creatorWallet:T,challengePop:R}}const tr=24*60*60*1e3,Wi=50;function ha(e){return{app:e!=null&&e.app&&typeof e.app=="object"?e.app:null,liveByHost:e!=null&&e.liveByHost&&typeof e.liveByHost=="object"?{...e.liveByHost}:{},history:Array.isArray(e==null?void 0:e.history)?e.history:[]}}function fs(e,t=Date.now()){return!e||typeof e!="object"?!1:(Number(e.endsAt)||0)>t}function Ot(e){return e?{...e}:null}function sr(e){return"goal_"+e+"_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,6)}function di(e,t){if(!t)return e;const s=[{...t,archivedAt:Date.now()},...e.history||[]].slice(0,40);return{...e,history:s}}function fl(e=Date.now()){return{id:sr("app"),scope:"app",name:"PIKK daily community goal",targetAmount:50,raised:0,endsAt:e+tr,createdAt:e}}function Js(e){return u={...u,dailyGoals:e},A(u),e}function Ua(e=Date.now()){let t=ha(u.dailyGoals),s=!1;return t.app&&!fs(t.app,e)&&(t={...di(t,t.app),app:null},s=!0),fs(t.app,e)||(t={...t,app:fl(e)},s=!0),s&&Js(t),t.app&&t.app.name==="DBS daily community goal"&&(t={...t,app:{...t.app,name:"PIKK daily community goal"}},Js(t)),Ot(t.app)}function vl(e,t=Date.now()){var n,o;const s=e||((n=u.live)==null?void 0:n.hostId)||((o=u.user)==null?void 0:o.id)||null;if(!s)return null;let a=ha(u.dailyGoals);const i=a.liveByHost[s]||null;if(i&&!fs(i,t)){const r={...a.liveByHost};return delete r[s],a={...di(a,i),liveByHost:r},Js(a),null}return Ot(fs(i,t)?i:null)}function ar({name:e,targetAmount:t}={}){const s=u.user;if(!s)return{error:"signin"};const a=String(e||"").trim().slice(0,80),i=Number(t);if(!a)return{error:"bad_name"};if(!Number.isFinite(i)||i<=0)return{error:"bad_amount"};const n=Date.now();let o=ha(u.dailyGoals);const r=o.liveByHost[s.id];r&&(o=di(o,r));const d={id:sr("live"),scope:"live",hostId:s.id,hostName:s.username,name:a,targetAmount:N(i),raised:0,endsAt:n+tr,createdAt:n};return o={...o,liveByHost:{...o.liveByHost,[s.id]:d}},Js(o),{ok:!0,goal:Ot(d)}}function Qs(e,t,s={}){if(!u.user)return{error:"signin"};const i=Math.floor(Number(t));if(!Number.isFinite(i)||i<=0)return{error:"invalid_amount"};const n=String(e||"");if(!n)return{error:"unknown_goal"};const o=Date.now();let r=ha(u.dailyGoals),d=null,c=null,p=null;if(r.app&&r.app.id===n)d="app",p=r.app;else for(const[T,R]of Object.entries(r.liveByHost))if(R&&R.id===n){d="live",c=T,p=R;break}if(!p)return{error:"unknown_goal"};if(!fs(p,o))return{error:"expired"};const m=Number(p.targetAmount)||0,g=Number(p.raised)||0;if(p.completedAt||m>0&&g>=m)return{error:"completed",goal:Ot(p)};let f=i;if(m>0){const T=Math.max(0,N(m-g)),R=Math.ceil(T*Wi);if(R<=0)return{error:"completed",goal:Ot(p)};f>R&&(f=R)}const b=ua(u.coins);if(b.balance<f)return{error:"insufficient",need:f,balance:b.balance};const y=N(f/Wi),v=N(g+y),w=m>0&&v>=m?o:p.completedAt,$={...p,raised:m>0?Math.min(v,N(m)):v,...w?{completedAt:w}:{}},C=String((s==null?void 0:s.message)||"").trim().slice(0,180),k={at:o,amount:-f,note:`Goal donate · ${p.name} · $${y.toFixed(2)} · TEST MODE`,kind:"goal",goalId:p.id,...C?{message:C}:{},usd:y},P={balance:b.balance-f,history:[k,...b.history].slice(0,200)};return d==="app"?r={...r,app:$}:r={...r,liveByHost:{...r.liveByHost,[c]:$}},u={...u,dailyGoals:r,coins:P},A(u),{ok:!0,goal:Ot($),coins:P,donated:{coins:f,usd:y,requested:i,message:C}}}function bl(e){const t=u.user,s={id:"brand_"+Date.now().toString(36),brand:String(e.brand||"").trim().slice(0,80),contact:String(e.contact||"").trim().slice(0,120),email:String(e.email||"").trim().slice(0,120),campaign:String(e.campaign||"sponsored_post").trim().slice(0,40),budget:String(e.budget||"").trim().slice(0,40),pitch:String(e.pitch||"").trim().slice(0,500),url:String(e.url||"").trim().slice(0,300),applicantUserId:(t==null?void 0:t.id)||null,status:"pending",at:Date.now()};return!s.brand||!s.email?{error:"required"}:(u={...u,brandApps:[s,...u.brandApps]},A(u),s)}function yl(e,t){if(!["pending","approved","rejected"].includes(t))return{error:"bad_status"};const a=u.brandApps.map(i=>i.id===e?{...i,status:t,reviewedAt:Date.now()}:i);return u={...u,brandApps:a},A(u),a.find(i=>i.id===e)}function Yi(e){const t=u.user,s={id:"list_"+Date.now().toString(36),title:String(e.title||"").trim().slice(0,80),brand:String(e.brand||"").trim().slice(0,80),blurb:String(e.blurb||"").trim().slice(0,280),url:String(e.url||"").trim().slice(0,300),disclosure:String(e.disclosure||"Paid partnership · TEST MODE").trim().slice(0,120),brandAppId:e.brandAppId||null,createdBy:(t==null?void 0:t.id)||null,active:!0,at:Date.now()};return!s.title||!s.brand?{error:"required"}:(u={...u,listings:[s,...u.listings||[]]},A(u),s)}function kl(e,t){const s=(u.listings||[]).map(a=>a.id===e?{...a,active:!!t}:a);return u={...u,listings:s},A(u),s.find(a=>a.id===e)}function wl({activeOnly:e=!1}={}){const t=u.listings||[];return e?t.filter(s=>s.active):t}function Sl(e){var s;return[((s=u.user)==null?void 0:s.id)||"guest",e].sort().join("__")}function pi(){const e=u.user;return e?Object.values(u.threads||{}).filter(t=>{var s;return(s=t.participants)==null?void 0:s.includes(e.id)}).sort((t,s)=>(s.updatedAt||0)-(t.updatedAt||0)):[]}function Xs(e){const t=u.user;if(!t||!e||e.muted||e.blocked)return 0;const s=e.lastReadAt||0;return(e.messages||[]).filter(a=>a.from!==t.id&&(a.at||0)>s).length}function tt(){return pi().reduce((e,t)=>e+Xs(t),0)}function Ji(e){const t=u.user;if(!t||!e)return null;const s=u.threads[e];if(!s||!(s.participants||[]).includes(t.id))return null;const a={...s,lastReadAt:Date.now()};u={...u,threads:{...u.threads,[a.id]:a},demoUnreadSeeded:!0},A(u);try{typeof window<"u"&&window.dispatchEvent&&window.dispatchEvent(new CustomEvent("dbs:messages-unread",{detail:{count:tt()}}))}catch{}return u.threads[a.id]}function ui(){var c;const e=u.user;if(!e)return{seeded:!1};if($s(),u.demoUnreadSeeded)return{seeded:!1,count:tt(),once:!0};if(tt()>0)return u={...u,demoUnreadSeeded:!0},A(u),{seeded:!1,count:tt()};const t="maya",s=(((c=u.profiles)==null?void 0:c.maya)||{}).username||"MayaBeats",a=us(t,s);if(a.error)return a;const i=u.threads[a.id];if((i.messages||[]).some(p=>p.from!==e.id)){const p=(i.messages||[]).filter(y=>y.from!==e.id).map(y=>y.at||0),m=i.lastReadAt||0;if(m>=Math.max(...p,0)||m>0)return u={...u,demoUnreadSeeded:!0},A(u),{seeded:!1,count:tt()};const f=Math.min(...p),b={...i,lastReadAt:Math.max(0,f-1)};return u={...u,threads:{...u.threads,[b.id]:b},demoUnreadSeeded:!0},A(u),{seeded:!0,count:tt()}}const o=Date.now(),r=[{id:"m_demo_unread_1",from:t,fromName:s,text:"Yo — drop coming Friday. You in for the listening party?",at:o-1e3*60*12},{id:"m_demo_unread_2",from:t,fromName:s,text:"Also sent a beat pack in the vault 🔥",at:o-1e3*60*5}],d={...i,messages:[...i.messages||[],...r],updatedAt:o-1e3*60*5,lastReadAt:0,request:!1};return u={...u,threads:{...u.threads,[d.id]:d},demoUnreadSeeded:!0},A(u),{seeded:!0,count:tt()}}function ir(e){return(u.threads||{})[e]||null}function nr(e){var a;const t=u.user;if(!t||!e)return!1;const s=(a=u.profiles)==null?void 0:a[e];return s?(t.following||[]).includes(e)&&(s.following||[]).includes(t.id):!1}function us(e,t){const s=u.user;if(!s)return{error:"signin"};const a=Sl(e);let i=u.threads[a];if(!i){const n=e==="dbs"||nr(e);i={id:a,kind:"dm",participants:[s.id,e],peerId:e,peerName:t||e,messages:[],updatedAt:Date.now(),request:!n,muted:!1,blocked:!1},u={...u,threads:{...u.threads,[a]:i}},A(u)}return i}function $l(e,t,s,{priority:a=!1}={}){const i=u.user;if(!i)return{error:"signin"};const n=String(s||"").trim().slice(0,500);if(!n)return{error:"empty"};const o=us(e,t);if(o.error)return o;const r={id:"m_"+Date.now().toString(36),from:i.id,fromName:i.username,text:n,at:Date.now(),priority:!!a},d={...u.threads[o.id],messages:[...u.threads[o.id].messages||[],r],updatedAt:Date.now(),peerName:t||u.threads[o.id].peerName};if(u={...u,threads:{...u.threads,[d.id]:d}},a){const c=u.wallet||{balance:0,history:[]};u={...u,wallet:{balance:c.balance,history:[...c.history||[],{at:Date.now(),amount:0,note:"Priority message · TEST MODE $2.99 (not charged)"}]}}}return A(u),{thread:u.threads[d.id],message:r}}function $s(){const e={...u.profiles||{}};let t=!1;e.maya||(e.maya={id:"maya",username:"MayaBeats",bio:"Creator · beats & live demos",avatar:"",followers:[],following:["dbs"],verified:!1},t=!0),e.fanjay||(e.fanjay={id:"fanjay",username:"FanJay",bio:"Day-one fan · playlist curator",avatar:"",followers:[],following:["dbs"],verified:!1},t=!0);const s=u.user;if(s){const a={...e.maya},i=new Set(a.following||[]),n=new Set(a.followers||[]);i.has(s.id)||(i.add(s.id),t=!0),n.has(s.id)||(n.add(s.id),t=!0),a.following=[...i],a.followers=[...n],e.maya=a;let o=s;(s.following||[]).includes("maya")||(o={...s,following:[...s.following||[],"maya"]},t=!0),t&&(u={...u,user:o,profiles:e},nt(o),A(u))}else t&&(u={...u,profiles:e},A(u));return[{id:"dbs",username:"DatBoiSkeet",team:!0,bio:(u.profiles.dbs||{}).bio||""},{id:"maya",username:u.profiles.maya.username,team:!1,bio:u.profiles.maya.bio},{id:"fanjay",username:u.profiles.fanjay.username,team:!1,bio:u.profiles.fanjay.bio}]}function xl(e,t=[]){const s=u.user;if(!s)return{error:"signin"};const a=String(e).trim().slice(0,60)||"Group",i=[...new Set([s.id,...t.filter(Boolean)])],n=a.toLowerCase().replace(/\W+/g,"_").slice(0,24)||"group",o=n==="dbs_fans"?"group_dbs_fans":"group_"+n+"_"+String(s.id).slice(-4);let r=u.threads[o];if(!r)r={id:o,kind:"group",peerId:o,peerName:a,participants:i,memberIds:i,messages:[],updatedAt:Date.now(),muted:!1,blocked:!1},u={...u,threads:{...u.threads,[o]:r}},A(u);else if(s&&!(r.participants||[]).includes(s.id)){const d=[...new Set([...r.participants||[],s.id])],c=[...new Set([...r.memberIds||d,s.id])];r={...r,participants:d,memberIds:c},u={...u,threads:{...u.threads,[o]:r}},A(u)}return u.threads[o]}function El(){return u.user?($s(),xl("DBS Fans",["dbs","maya","fanjay"])):{error:"signin"}}function Al(e,t){const s=u.user;if(!s)return{error:"signin"};const a=u.threads[e];if(!a||a.kind!=="group")return{error:"not_group"};if(!(a.participants||[]).includes(s.id))return{error:"forbidden"};const i=String(t||"").trim().slice(0,500);if(!i)return{error:"empty"};const n={id:"m_"+Date.now().toString(36),from:s.id,fromName:s.username,text:i,at:Date.now(),priority:!1},o={...a,messages:[...a.messages||[],n],updatedAt:Date.now()};return u={...u,threads:{...u.threads,[o.id]:o}},A(u),{thread:u.threads[o.id],message:n}}function Da(e,t={}){const s=u.threads[e];if(!s)return{error:"missing"};const a={...s,muted:t.muted!==void 0?!!t.muted:!!s.muted,blocked:t.blocked!==void 0?!!t.blocked:!!s.blocked,reportedAt:t.report?Date.now():s.reportedAt||null};return u={...u,threads:{...u.threads,[a.id]:a}},A(u),a}function Qi(e={}){const t={...u.messagePrefs||{allowDMs:!0,allowRequests:!0},...e};return u={...u,messagePrefs:t},A(u),t}const kt={gifts:{creatorPct:80,dbsPct:20,label:"Live gifts"},tips:{creatorPct:90,dbsPct:10,label:"Tips"},subscriptions:{creatorPct:85,dbsPct:15,label:"Subscriptions"},paid_content:{creatorPct:85,dbsPct:15,label:"Paid content"},referrals:{creatorPct:85,dbsPct:15,label:"Referrals"},clippers:{creatorPct:80,dbsPct:20,label:"Clippers"},sponsorships:{creatorPct:80,dbsPct:20,label:"Sponsorships"},merch:{creatorPct:85,dbsPct:15,label:"Merch / affiliate"}},Cl=[{category:"gifts",gross:40,note:"Live gifts · demo week"},{category:"tips",gross:22.5,note:"Live tips · demo week"},{category:"subscriptions",gross:29.99,note:"Skeet+ fan sub · demo"},{category:"referrals",gross:15,note:"Refer & Earn milestone · demo"},{category:"clippers",gross:50,note:"Clippers campaign payout · demo"},{category:"sponsorships",gross:100,note:"Sponsored livestream · demo"},{category:"merch",gross:35,note:"Foreign X-Change affiliate · demo"}];function N(e){return Math.round(Number(e)*100)/100}function mi(e){const t=ds().creatorWallet;return!e||typeof e!="object"?{...t}:{...t,...e,available:N(e.available??0),holds:N(e.holds??0),threshold:Number(e.threshold)>0?Number(e.threshold):25,verification:e.verification==="demo_verified"?"demo_verified":"demo_unverified",earnings:Array.isArray(e.earnings)?e.earnings:[],payouts:Array.isArray(e.payouts)?e.payouts:[]}}function rt(){const e=mi(u.creatorWallet);return u.creatorWallet!==e&&(u={...u,creatorWallet:e}),e}function rr({category:e,gross:t,note:s,source:a="demo",at:i=Date.now()}){const n=kt[e]||kt.tips,o=N(Math.max(0,Number(t)||0)),r=N(o*.029+(o>0?.3:0)),d=N(Math.max(0,o-r)),c=N(d*n.creatorPct/100),p=N(d-c);return{id:"earn_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,6),category:e,label:n.label,note:String(s||n.label).slice(0,120),gross:o,fees:r,net:d,creatorPct:n.creatorPct,dbsPct:n.dbsPct,creatorShare:c,dbsShare:p,source:a,at:i,payoutId:null}}function Tl(){return{...kt}}function vs(){return rt()}function hi(e){const t=rr(e),s=rt(),a={...s,available:N(s.available+t.creatorShare),earnings:[t,...s.earnings||[]]};return u={...u,creatorWallet:a},A(u),t}function or({force:e=!1}={}){const t=rt();if(!e&&(t.earnings||[]).length>0)return{skipped:!0,creatorWallet:t};const s=Date.now()-6*864e5,i=Cl.map((r,d)=>rr({category:r.category,gross:r.gross,note:r.note,source:"seed",at:s+d*36e5})).map((r,d)=>({...r,id:"earn_seed_"+d+"_"+r.category})),n=N(i.reduce((r,d)=>r+d.creatorShare,0)),o={...t,available:e?n:N(t.available+n),earnings:e?i:[...i,...t.earnings||[]],holds:e?0:t.holds,payouts:e?[]:t.payouts};return e&&(o.available=n,o.holds=0,o.payouts=[],o.earnings=i),u={...u,creatorWallet:o},A(u),{seeded:i.length,creatorWallet:o}}function Dl({amount:e}={}){const t=rt(),s=(t.payouts||[]).find(g=>g.status==="pending");if(s)return{error:"pending_exists",pending:s};const a=N(t.available);if(a<t.threshold)return{error:"below_threshold",available:a,threshold:t.threshold};const i=e!=null?N(e):a;if(i<=0||i>a)return{error:"bad_amount"};const n=(t.earnings||[]).filter(g=>!g.payoutId).sort((g,f)=>g.at-f.at),o=[];let r=0;for(const g of n){const f=N(g.creatorShare);if(!(f<=0)&&!(N(r+f)>i)&&(o.push(g.id),r=N(r+f),r>=i))break}if(!o.length){const g=n.find(f=>N(f.creatorShare)>0);if(!g)return{error:"no_earnings"};if(N(g.creatorShare)>a)return{error:"bad_amount"};o.push(g.id),r=N(g.creatorShare)}const d=r,c={id:"po_"+Date.now().toString(36),amount:d,status:"pending",at:Date.now(),earningIds:o,note:"TEST MODE payout request · not real money"},p=(t.earnings||[]).map(g=>o.includes(g.id)?{...g,payoutId:c.id}:g),m={...t,available:N(a-d),holds:N(t.holds+d),earnings:p,payouts:[c,...t.payouts||[]]};return u={...u,creatorWallet:m},A(u),c}function Ll(e,t){if(!["pending","completed","rejected"].includes(t))return{error:"bad_status"};const a=rt(),i=(a.payouts||[]).find(p=>p.id===e);if(!i)return{error:"missing"};if(i.status!=="pending"&&t!=="pending")return{error:"already_final",payout:i};let n=a.available,o=a.holds,r=a.earnings||[];if(i.status==="pending"&&t==="completed")o=N(Math.max(0,o-i.amount));else if(i.status==="pending"&&t==="rejected"){o=N(Math.max(0,o-i.amount)),n=N(n+i.amount);const p=new Set(i.earningIds||[]);r=r.map(m=>p.has(m.id)?{...m,payoutId:null}:m)}const d=a.payouts.map(p=>p.id===e?{...p,status:t,reviewedAt:Date.now()}:p),c={...a,available:n,holds:o,earnings:r,payouts:d};return u={...u,creatorWallet:c},A(u),d.find(p=>p.id===e)}function Ml(e){const s={...rt(),verification:e?"demo_verified":"demo_unverified"};return u={...u,creatorWallet:s},A(u),s}function gi(){const e=rt(),t={};for(const s of Object.keys(kt))t[s]={category:s,label:kt[s].label,creatorPct:kt[s].creatorPct,dbsPct:kt[s].dbsPct,gross:0,fees:0,net:0,creatorShare:0,dbsShare:0,count:0};for(const s of e.earnings||[]){const a=t[s.category]||(t[s.category]={category:s.category,label:s.label||s.category,creatorPct:s.creatorPct,dbsPct:s.dbsPct,gross:0,fees:0,net:0,creatorShare:0,dbsShare:0,count:0});a.gross=N(a.gross+s.gross),a.fees=N(a.fees+s.fees),a.net=N(a.net+s.net),a.creatorShare=N(a.creatorShare+s.creatorShare),a.dbsShare=N(a.dbsShare+s.dbsShare),a.count+=1}return Object.values(t)}function Zs(e=5,t="Demo credit"){const s=u.wallet||{balance:0,history:[]},a=Number(s.balance||0)+Number(e),i=[...s.history||[],{at:Date.now(),amount:Number(e),note:t}];return u={...u,wallet:{balance:a,history:i}},A(u),u.wallet}function lr(e,t="Demo spend"){const s=u.wallet||{balance:0,history:[]},a=Number(e);if(Number(s.balance||0)<a)return{error:"insufficient"};const i=Number(s.balance||0)-a,n=[...s.history||[],{at:Date.now(),amount:-a,note:t}];return u={...u,wallet:{balance:i,history:n}},A(u),u.wallet}function U(e,t){return String(e||"").toLowerCase().includes(t)}function Il(e){const t=String(e||"").trim().toLowerCase(),s={query:String(e||"").trim(),posts:[],profiles:[],music:[],videos:[],lives:[],products:[],pictures:[]};if(!t)return s;const a=(u.posts||[]).filter(g=>U(g.text,t)||U(g.username,t)),i=Object.values(u.profiles||{}).filter(g=>U(g.username,t)||U(g.bio,t));if(u.user){const g=u.user;(U(g.username,t)||U(g.bio,t))&&(i.find(f=>f.id===g.id)||i.push(g))}const n=(u.catalog||[]).filter(g=>g.published),o=n.filter(g=>(g.type==="song"||g.type==="album")&&(U(g.title,t)||U(g.artist,t)||U(g.type,t))),r=n.filter(g=>g.type==="video"&&(U(g.title,t)||U(g.artist,t)||U("video",t))),d=n.filter(g=>g.type==="picture"&&(U(g.title,t)||U(g.artist,t)||U("picture",t))),c=[],p=u.live;p&&!p.endedAt&&(U(p.title,t)||U(p.hostName,t)||U("live",t))&&c.push({...p,status:"live"}),(u.liveHistory||[]).forEach(g=>{(U(g.title,t)||U(g.hostName,t)||U("live",t))&&c.push({...g,status:"ended"})});const m=(u.listings||[]).filter(g=>g.active!==!1&&(U(g.title,t)||U(g.brand,t)||U(g.blurb,t)||U("marketplace",t)||U("product",t)));return{query:String(e||"").trim(),posts:a,profiles:i,music:o,videos:r,lives:c,products:m,pictures:d}}function Pl(e=8){const t=u.likes||{},s=(u.posts||[]).map(r=>({kind:"post",id:r.id,title:(r.text||"").slice(0,72)||"Post",subtitle:"@"+(r.username||"creator"),href:"#/posts",score:(t[r.id]||[]).length,image:r.image||""})).sort((r,d)=>d.score-r.score||(d.id>r.id?1:-1)),a=[{kind:"music",id:"trend_music",title:"Long Story Short",subtitle:"Coming Soon · Music",href:"#/music",score:3,image:"/music/01_Long_Story_Short_Coming_Soon.jpg"},{kind:"video",id:"trend_video",title:"Dirty Money ft. Lil Baby",subtitle:"Official MV",href:"#/videos",score:3,image:""},{kind:"live",id:"trend_live",title:"Go live on DBS",subtitle:"Creators · Live",href:"#/live",score:2,image:""},{kind:"market",id:"trend_mkt",title:"Sponsored Marketplace",subtitle:"Brand ads · demo",href:"#/marketplace",score:2,image:""},{kind:"spotlight",id:"trend_spot",title:"24/7 Spotlight",subtitle:"Stage · Discover",href:"#/spotlight",score:1,image:""}],i=u.live;return i&&!i.endedAt&&a.unshift({kind:"live",id:"trend_live_now",title:i.title||"Live now",subtitle:"@"+(i.hostName||"creator")+" · LIVE",href:"#/live",score:99,image:""}),(u.catalog||[]).filter(r=>r.published).slice(0,3).forEach(r=>{const d=r.type==="video"?"#/videos":r.type==="picture"?"#/home":"#/music";a.push({kind:r.type,id:"trend_cat_"+r.id,title:r.title,subtitle:(r.artist||"Admin")+" · From Admin",href:d,score:4,image:r.coverRef&&!String(r.coverRef).startsWith("idb:")?r.coverRef:""})}),[...s,...a].sort((r,d)=>d.score-r.score).slice(0,e)}function _l(){const e=Object.values(u.profiles||{}).map(t=>({id:t.id,username:t.username,bio:t.bio||"",avatar:t.avatar||"",verified:!!t.verified,followers:(t.followers||[]).length}));return u.user&&!e.find(t=>t.id===u.user.id)&&e.push({id:u.user.id,username:u.user.username,bio:u.user.bio||"",avatar:u.user.avatar||"",verified:!!u.user.verified,followers:(u.user.followers||[]).length}),e.sort((t,s)=>s.followers-t.followers||t.username.localeCompare(s.username))}const cr=6e4,La=10;function dr(e=Date.now()){const t=new Date(e);return t.setHours(23,59,59,999),t.getTime()}function Ol(e=Date.now()){const t=new Date(e);return t.setHours(0,0,0,0),t.getTime()}const pr=[{id:"fan_maya",name:"MayaBeats",bio:"Demo fan · mutual"},{id:"fan_jay",name:"FanJay",bio:"Demo fan · sandbox opponent"}];function ge(){return u.giftBattles||{active:null,history:[],champions:[],prefs:{invitationsEnabled:!0}}}function At(e){return u={...u,giftBattles:e},A(u),e}function fi(e,t=Date.now()){if(!e||e.status!=="active"||t<(e.endsAt||0))return e;const s=Number(e.scoreA||0),a=Number(e.scoreB||0);let i="tie",n=null,o=null;return s>a?(i="win",n=e.challenger.id,o=e.challenger.name):a>s&&(i="win",n=e.opponent.id,o=e.opponent.name),{...e,status:"ended",endedAt:t,result:i,winnerId:n,winnerName:o,scoreA:s,scoreB:a,championUntil:n?dr(t):null}}function ur(){return pr.map(e=>({...e}))}function vi(){return{invitationsEnabled:!0,...ge().prefs||{}}}function ql(e={}){const t=ge(),s={...t.prefs,...e};return At({...t,prefs:s})}function bi(){let t=ge().active;if(!t)return null;if(t.status==="active"){const s=fi(t);if(s!==t&&s.status==="ended")return yi(s);t=s}return t}function yi(e){const t=ge(),s=[e,...(t.history||[]).filter(i=>i.id!==e.id)].slice(0,40);let a=t.champions||[];return e.winnerId&&(a=[{battleId:e.id,userId:e.winnerId,username:e.winnerName,score:e.winnerId===e.challenger.id?e.scoreA:e.scoreB,opponentScore:e.winnerId===e.challenger.id?e.scoreB:e.scoreA,endedAt:e.endedAt,championUntil:e.championUntil,mode:e.mode},...a.filter(n=>n.battleId!==e.id)].slice(0,30)),At({...t,active:e,history:s,champions:a}),e}function Nl({opponentId:e,opponentName:t,mode:s}={}){const a=u.user;if(!a)return{error:"signin"};if(!vi().invitationsEnabled)return{error:"invites_disabled"};const n=u.live&&!u.live.endedAt,o=s||(n?"live":"sandbox");if(o==="live"&&!n)return{error:"not_live"};const r=ge(),d=r.active;if(d&&(d.status==="pending"||d.status==="active"))return{error:"battle_in_progress",battle:d};const c=pr.find(g=>g.id===e),p={id:e||(c==null?void 0:c.id)||"fan_maya",name:t||(c==null?void 0:c.name)||"MayaBeats"};if(p.id===a.id)return{error:"self"};const m={id:"gb_"+Date.now().toString(36),status:"pending",mode:o,liveId:n?u.live.id:null,liveTitle:n?u.live.title:null,challenger:{id:a.id,name:a.username},opponent:p,createdAt:Date.now(),startedAt:null,endsAt:null,durationMs:cr,scoreA:0,scoreB:0,giftLog:[],result:null,winnerId:null,winnerName:null,endedAt:null,championUntil:null};return At({...r,active:m}),{battle:m}}function Bl(){const e=ge(),t=e.active;if(!t||t.status!=="pending")return{error:"no_pending"};if(!vi().invitationsEnabled)return{error:"invites_disabled"};const s=Date.now(),a={...t,status:"active",startedAt:s,endsAt:s+(t.durationMs||cr),scoreA:0,scoreB:0};return At({...e,active:a}),{battle:a}}function Rl(){const e=ge(),t=e.active;if(!t||t.status!=="pending")return{error:"no_pending"};const s={...t,status:"declined",endedAt:Date.now(),result:"declined"},a=[s,...e.history||[]].slice(0,40);return At({...e,active:null,history:a}),{battle:s}}function jl(){const e=ge(),t=e.active;return t&&(t.status==="pending"||t.status==="active")?{error:"still_running",battle:t}:(At({...e,active:null}),{ok:!0})}function Fl(e=Date.now()){const t=u.liveGbChallengePop;return t?t.expiresAt&&e>t.expiresAt?(u={...u,liveGbChallengePop:null},A(u),null):!u.live||u.live.endedAt||t.liveId&&t.liveId!==u.live.id?null:{...t}:null}function Kl({side:e="challenger",kind:t="gift",amount:s=2,label:a=""}={}){var y;if(!u.user)return{error:"signin"};let n=bi();if(!n||n.status!=="active")return{error:"no_active"};if(n=ge().active,!n||n.status!=="active")return{error:"ended"};const o=Math.max(.5,Number(s)||1),r=t==="tip"?"tip":"gift",d=e==="opponent",c=d?n.opponent:n.challenger;let p=null;if(n.mode==="live"&&!d){if(p=Qn({kind:r,amount:o,label:a||(r==="gift"?"🔥 Fire":"Tip")}),p!=null&&p.error)return p}else(((y=u.wallet)==null?void 0:y.balance)||0)>=o&&lr(o,`Gift battle ${r} · ${c.name} · TEST MODE`);const m={id:"gbg_"+Date.now().toString(36),side:d?"opponent":"challenger",userId:c.id,username:c.name,kind:r,amount:o,label:(a||(r==="gift"?"🔥 Fire":"Tip")).slice(0,40),at:Date.now()},g=Number(n.scoreA||0)+(d?0:o),f=Number(n.scoreB||0)+(d?o:0);let b={...n,scoreA:+g.toFixed(2),scoreB:+f.toFixed(2),giftLog:[...n.giftLog||[],m]};return b=fi(b),b.status==="ended"?yi(b):At({...ge(),active:b}),{battle:b,entry:m,live:(p==null?void 0:p.live)||null,wallet:u.wallet}}function ki(){const t=ge().active;if(!t||t.status!=="active")return t;const s=fi(t);return s.status==="ended"&&t.status!=="ended"?yi(s):s}function Gl(e=20){return(ge().history||[]).slice(0,e)}function Vl(e=Date.now()){const t=ge(),s=t.active;return s&&s.status==="ended"&&s.winnerId&&s.championUntil&&e<s.championUntil?{battleId:s.id,userId:s.winnerId,username:s.winnerName,score:s.winnerId===s.challenger.id?s.scoreA:s.scoreB,endedAt:s.endedAt,championUntil:s.championUntil,mode:s.mode}:(t.champions||[]).find(i=>i.championUntil&&e<i.championUntil)||null}function Ul(e=15){var s;const t={};for(const a of ge().history||[]){if(a.result!=="win"||!a.winnerId)continue;const i=t[a.winnerId]||{userId:a.winnerId,username:a.winnerName,wins:0,points:0};i.wins+=1;const n=a.winnerId===((s=a.challenger)==null?void 0:s.id)?Number(a.scoreA||0):Number(a.scoreB||0);i.points=+(i.points+n).toFixed(2),i.username=a.winnerName||i.username,t[a.winnerId]=i}return Object.values(t).sort((a,i)=>i.wins-a.wins||i.points-a.points||a.username.localeCompare(i.username)).slice(0,e)}function wi(e=La,t=Date.now()){var d;const s=Math.min(Math.max(1,Number(e)||La),La),a=Ol(t),i=dr(t),n=new Set,o=[],r=c=>{if(!(c!=null&&c.userId)||!(c!=null&&c.username)||n.has(c.userId))return;const p=Number(c.endedAt||0);p<a||p>i||c.championUntil&&t>c.championUntil||(n.add(c.userId),o.push({userId:c.userId,username:c.username,score:Number(c.score||0),endedAt:p,championUntil:c.championUntil||i,battleId:c.battleId||c.id||null,mode:c.mode||"demo"}))};for(const c of ge().champions||[])if(r(c),o.length>=s)return o;for(const c of ge().history||[])if(!(c.result!=="win"||!c.winnerId)&&(r({userId:c.winnerId,username:c.winnerName,score:c.winnerId===((d=c.challenger)==null?void 0:d.id)?c.scoreA:c.scoreB,endedAt:c.endedAt,championUntil:c.championUntil||i,battleId:c.id,mode:c.mode}),o.length>=s))break;return o}const Si=4,Ha=[{id:"maya",username:"MayaBeats",bio:"Creator · beats & live demos"},{id:"fanjay",username:"FanJay",bio:"Day-one fan · playlist curator"},{id:"ria",username:"RiaLoops",bio:"Demo co-host · loops & hooks"},{id:"dez",username:"DezOnMic",bio:"Demo guest · freestyle nights"}];function Te(){return u.multiGuest||{active:null,history:[]}}function Fe(e){return u={...u,multiGuest:e},A(u),e}function xs(e,t){const s=[e,...t],a=s.length||1,i=Math.floor(100/a*100)/100,n={};let o=0;return s.forEach((r,d)=>{d===s.length-1?n[r]=+(100-o).toFixed(2):(n[r]=i,o=+(o+i).toFixed(2))}),n}function ga(){$s();const e={...u.profiles||{}};let t=!1;for(const s of Ha)e[s.id]||(e[s.id]={id:s.id,username:s.username,bio:s.bio,avatar:"",followers:[],following:["dbs"],verified:!1},t=!0);return t&&(u={...u,profiles:e},A(u)),Ha.map(s=>{const a=u.profiles[s.id]||s;return{id:s.id,username:a.username||s.username,bio:a.bio||s.bio,followers:(a.followers||[]).length}})}function Hl(){return ga()}function bs(){return Te().active||null}function zl(e=20){return(Te().history||[]).slice(0,e)}function Wl(e){const t=u.user;if(!t)return{error:"signin"};const s=Te();if(s.active&&!s.active.endedAt)return{error:"session_in_progress",session:s.active};const a=String(e||"").trim().slice(0,80)||"Multi-Guest Live";ga();const i={id:"mg_"+Date.now().toString(36),title:a,hostId:t.id,hostName:t.username,startedAt:Date.now(),endedAt:null,maxGuests:Si,guests:[],chat:[{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:"Multi-guest session started · TEST MODE · no camera / WebRTC",at:Date.now(),system:!0}],giftSplit:{mode:"equal",shares:{[t.id]:100},disclosed:!1,disclosedAt:null},broadcastReady:!1};return Fe({...s,active:i}),{session:i}}function Yl(e){var g;const t=u.user;if(!t)return{error:"signin"};const s=Te(),a=s.active;if(!a||a.endedAt)return{error:"no_session"};if(a.hostId!==t.id)return{error:"host_only"};ga();const i=Ha.find(f=>f.id===e),n=(g=u.profiles)==null?void 0:g[e];if(!i&&!n)return{error:"unknown_guest"};if(e===t.id||e===a.hostId)return{error:"self"};const o=(a.guests||[]).find(f=>f.id===e);if(o&&(o.status==="invited"||o.status==="joined"))return{error:"already_invited",session:a};if((a.guests||[]).filter(f=>f.status==="joined"||f.status==="invited").length>=(a.maxGuests||Si))return{error:"full"};const d={id:e,username:(n==null?void 0:n.username)||(i==null?void 0:i.username)||e,status:"invited",muted:!1,invitedAt:Date.now(),joinedAt:null},c=[...(a.guests||[]).filter(f=>f.id!==e),d],p=[...a.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`Invited @${d.username} to the stage`,at:Date.now(),system:!0}].slice(-80),m={...a,guests:c,chat:p,broadcastReady:!1};return m.giftSplit={...m.giftSplit,disclosed:!1,disclosedAt:null,shares:xs(a.hostId,c.filter(f=>f.status==="joined").map(f=>f.id))},Fe({...s,active:m}),{session:m,guest:d}}function Jl(e){var p;const t=u.user;if(!t)return{error:"signin"};const s=Te(),a=s.active;if(!a||a.endedAt)return{error:"no_session"};if(a.hostId!==t.id)return{error:"host_only"};const i=(a.guests||[]).map(m=>({...m})),n=i.findIndex(m=>m.id===e);if(n<0)return{error:"not_found"};if(i[n].status==="joined")return{session:a,guest:i[n]};if(i.filter(m=>m.status==="joined").length>=(a.maxGuests||Si))return{error:"full"};i[n]={...i[n],status:"joined",joinedAt:Date.now(),muted:!1};const r=i.filter(m=>m.status==="joined").map(m=>m.id),d=[...a.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`@${i[n].username} joined the stage`,at:Date.now(),system:!0}].slice(-80),c={...a,guests:i,chat:d,broadcastReady:!1,giftSplit:{mode:((p=a.giftSplit)==null?void 0:p.mode)||"equal",shares:xs(a.hostId,r),disclosed:!1,disclosedAt:null}};return Fe({...s,active:c}),{session:c,guest:i[n]}}function Ql(e){var d;const t=u.user;if(!t)return{error:"signin"};const s=Te(),a=s.active;if(!a||a.endedAt)return{error:"no_session"};if(a.hostId!==t.id)return{error:"host_only"};const i=(a.guests||[]).map(c=>c.id===e?{...c,status:"declined"}:c);if(!(a.guests||[]).some(c=>c.id===e))return{error:"not_found"};const n=((d=(a.guests||[]).find(c=>c.id===e))==null?void 0:d.username)||e,o=[...a.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`@${n} declined the invite`,at:Date.now(),system:!0}].slice(-80),r={...a,guests:i,chat:o};return Fe({...s,active:r}),{session:r}}function Xl(e){var c,p;const t=u.user;if(!t)return{error:"signin"};const s=Te(),a=s.active;if(!a||a.endedAt)return{error:"no_session"};if(a.hostId!==t.id&&t.id!==e)return{error:"forbidden"};const i=(a.guests||[]).map(m=>m.id===e?{...m,status:"left",muted:!1}:m);if(!(a.guests||[]).some(m=>m.id===e))return{error:"not_found"};const n=((c=(a.guests||[]).find(m=>m.id===e))==null?void 0:c.username)||e,o=i.filter(m=>m.status==="joined").map(m=>m.id),r=[...a.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`@${n} left the stage`,at:Date.now(),system:!0}].slice(-80),d={...a,guests:i,chat:r,broadcastReady:!1,giftSplit:{mode:((p=a.giftSplit)==null?void 0:p.mode)||"equal",shares:xs(a.hostId,o),disclosed:!1,disclosedAt:null}};return Fe({...s,active:d}),{session:d}}function Zl(e){var c,p;const t=u.user;if(!t)return{error:"signin"};const s=Te(),a=s.active;if(!a||a.endedAt)return{error:"no_session"};if(a.hostId!==t.id)return{error:"host_only"};const i=(a.guests||[]).map(m=>m.id===e?{...m,status:"removed",muted:!1}:m);if(!(a.guests||[]).some(m=>m.id===e))return{error:"not_found"};const n=((c=(a.guests||[]).find(m=>m.id===e))==null?void 0:c.username)||e,o=i.filter(m=>m.status==="joined").map(m=>m.id),r=[...a.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`Host removed @${n} from the stage`,at:Date.now(),system:!0}].slice(-80),d={...a,guests:i,chat:r,broadcastReady:!1,giftSplit:{mode:((p=a.giftSplit)==null?void 0:p.mode)||"equal",shares:xs(a.hostId,o),disclosed:!1,disclosedAt:null}};return Fe({...s,active:d}),{session:d}}function ec(e,t=!0){var c;const s=u.user;if(!s)return{error:"signin"};const a=Te(),i=a.active;if(!i||i.endedAt)return{error:"no_session"};if(i.hostId!==s.id)return{error:"host_only"};const n=(i.guests||[]).map(p=>p.id===e&&p.status==="joined"?{...p,muted:!!t}:p);if(!(i.guests||[]).some(p=>p.id===e&&p.status==="joined"))return{error:"not_joined"};const o=((c=(i.guests||[]).find(p=>p.id===e))==null?void 0:c.username)||e,r=[...i.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:t?`Host muted @${o}`:`Host unmuted @${o}`,at:Date.now(),system:!0}].slice(-80),d={...i,guests:n,chat:r};return Fe({...a,active:d}),{session:d}}function tc(e){const t=u.user;if(!t)return{error:"signin"};const s=Te(),a=s.active;if(!a||a.endedAt)return{error:"no_session"};const i=String(e||"").trim().slice(0,280);if(!i)return{error:"empty"};const n={id:"c_"+Date.now().toString(36),userId:t.id,username:t.username,text:i,at:Date.now()},o=[...a.chat||[],n].slice(-80),r={...a,chat:o};return Fe({...s,active:r}),{session:r,message:n}}function ns({mode:e="equal",shares:t=null,disclose:s=!1}={}){var g,f;const a=u.user;if(!a)return{error:"signin"};const i=Te(),n=i.active;if(!n||n.endedAt)return{error:"no_session"};if(n.hostId!==a.id)return{error:"host_only"};const o=(n.guests||[]).filter(b=>b.status==="joined").map(b=>b.id),r=[n.hostId,...o];let d,c=e==="custom"?"custom":"equal";if(c==="equal")d=xs(n.hostId,o);else{d={};let b=0;for(const y of r){const v=Math.max(0,Number(t==null?void 0:t[y])||0);d[y]=+v.toFixed(2),b+=d[y]}if(b=+b.toFixed(2),Math.abs(b-100)>.05)return{error:"split_total",total:b,expected:100}}const p={mode:c,shares:d,disclosed:!!s||!!((g=n.giftSplit)!=null&&g.disclosed),disclosedAt:s?Date.now():((f=n.giftSplit)==null?void 0:f.disclosedAt)||null};s&&(p.disclosed=!0),s&&(p.disclosedAt=Date.now());const m={...n,giftSplit:p,broadcastReady:!!p.disclosed};return Fe({...i,active:m}),{session:m}}function sc(){var e,t,s,a;return ns({mode:((t=(e=bs())==null?void 0:e.giftSplit)==null?void 0:t.mode)||"equal",shares:((a=(s=bs())==null?void 0:s.giftSplit)==null?void 0:a.shares)||null,disclose:!0})}function ac(){const e=u.user;if(!e)return{error:"signin"};const t=Te(),s=t.active;if(!s||s.endedAt)return{error:"no_session"};if(s.hostId!==e.id)return{error:"host_only"};const a={...s,endedAt:Date.now(),broadcastReady:!1},i=[a,...(t.history||[]).filter(n=>n.id!==a.id)].slice(0,20);return Fe({active:null,history:i}),{session:a}}const mr=["song","album","video","live","app","interview"],$i=["draft","active","paused","ended"];function Ct(e){if(!e||typeof e!="object")return null;const t=e.fundSource==="third_party"?"third_party":"dbs",s=mr.includes(e.promoteType)?e.promoteType:"app",a=$i.includes(e.status)?e.status:"draft",i=Number(e.deadline)||0;return{id:String(e.id||""),title:String(e.title||"").slice(0,120),promoteType:s,budget:Math.max(0,Number(e.budget)||0),deadline:i,fundSource:t,managementFeePct:t==="third_party"?20:0,reward:String(e.reward||"").slice(0,200),status:a,participants:Array.isArray(e.participants)?e.participants:[],submissions:Array.isArray(e.submissions)?e.submissions:[],createdAt:Number(e.createdAt)||Date.now(),createdBy:e.createdBy||null}}function Gt(e){u={...u,missions:e},A(u)}function fa({status:e=null}={}){const t=(u.missions||[]).map(Ct).filter(Boolean);if(!e)return t;const s=Array.isArray(e)?e:[e];return t.filter(a=>s.includes(a.status))}function ic(e){return fa().find(t=>t.id===e)||null}function nc(e={}){var r;const t=String(e.title||"").trim().slice(0,120);if(!t)return{error:"required"};const s=mr.includes(e.promoteType)?e.promoteType:"app",a=e.fundSource==="third_party"?"third_party":"dbs";let i=e.deadline;if(typeof i=="string"&&i){const d=Date.parse(i);i=Number.isFinite(d)?d:Date.now()+7*864e5}else i=Number(i)||Date.now()+7*864e5;const n=$i.includes(e.status)?e.status:"active",o=Ct({id:"msn_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),title:t,promoteType:s,budget:Number(e.budget)||0,deadline:i,fundSource:a,reward:String(e.reward||"").trim().slice(0,200)||"Demo reward · TEST MODE",status:n,participants:[],submissions:[],createdAt:Date.now(),createdBy:((r=u.user)==null?void 0:r.id)||"demo_admin"});return Gt([o,...u.missions||[]]),o}function rc(e,t){if(!$i.includes(t))return{error:"bad_status"};let s=null;const a=(u.missions||[]).map(i=>{const n=Ct(i);return!n||n.id!==e?i:(s={...n,status:t},s)});return s?(Gt(a),s):{error:"not_found"}}function oc(e){const t=u.user;if(!t)return{error:"signin"};let s=null;const a=(u.missions||[]).map(i=>{const n=Ct(i);if(!n||n.id!==e)return i;if(n.status!=="active")return s={error:"not_active",mission:n},i;if((n.participants||[]).some(d=>d.userId===t.id))return s={error:"already_joined",mission:n},i;const r={userId:t.id,username:t.username||"creator",joinedAt:Date.now(),score:0,referralCode:"REF-"+t.id.slice(0,6).toUpperCase()+"-"+Math.random().toString(36).slice(2,5).toUpperCase()};return s={...n,participants:[...n.participants||[],r]},s});return s?(s.error||Gt(a),s):{error:"not_found"}}function lc(e,{proof:t=""}={}){const s=u.user;if(!s)return{error:"signin"};const a=String(t||"").trim().slice(0,400);if(!a)return{error:"required"};let i=null;const n=(u.missions||[]).map(o=>{const r=Ct(o);if(!r||r.id!==e)return o;if(r.status!=="active")return i={error:"not_active",mission:r},o;if(!(r.participants||[]).some(m=>m.userId===s.id))return i={error:"not_joined",mission:r},o;const c={id:"sub_"+Date.now().toString(36)+Math.random().toString(36).slice(2,5),userId:s.id,username:s.username||"creator",proof:a,at:Date.now(),status:"pending"},p=(r.participants||[]).map(m=>m.userId===s.id?{...m,score:(Number(m.score)||0)+10}:m);return i={...r,participants:p,submissions:[c,...r.submissions||[]]},i});return i?(i.error||Gt(n),i):{error:"not_found"}}function cc(e,t=5){const s=u.user;if(!s)return{error:"signin"};const a=Math.max(1,Math.min(50,Number(t)||5));let i=null;const n=(u.missions||[]).map(o=>{const r=Ct(o);if(!r||r.id!==e)return o;if(!(r.participants||[]).some(p=>p.userId===s.id))return i={error:"not_joined",mission:r},o;const c=(r.participants||[]).map(p=>p.userId===s.id?{...p,score:(Number(p.score)||0)+a}:p);return i={...r,participants:c},i});return i?(i.error||Gt(n),i):{error:"not_found"}}function dc(e){const t=ic(e);return t?[...t.participants||[]].map(s=>({userId:s.userId,username:s.username,score:Number(s.score)||0,referralCode:s.referralCode||"",joinedAt:s.joinedAt,submissions:(t.submissions||[]).filter(a=>a.userId===s.userId).length})).sort((s,a)=>a.score-s.score||(s.joinedAt||0)-(a.joinedAt||0)):[]}function pc({force:e=!1}={}){if((u.missions||[]).length&&!e)return{skipped:!0,missions:fa()};const s=Date.now(),a=864e5,i=[{id:"msn_demo_song",title:"Push Long Story Short (clip challenge)",promoteType:"song",budget:2500,deadline:s+14*a,fundSource:"dbs",reward:"$50–$200 demo credits by rank · DBS-funded marketing",status:"active",participants:[{userId:"clipper_demo",username:"ClipQueen",joinedAt:s-2*a,score:42,referralCode:"REF-CLIP-AAA"},{userId:"dbs",username:"DatBoiSkeet",joinedAt:s-a,score:28,referralCode:"REF-DBS-001"}],submissions:[{id:"sub_demo1",userId:"clipper_demo",username:"ClipQueen",proof:"https://example.com/tiktok/lss-clip-1 · 12k views",at:s-a,status:"pending"}],createdAt:s-3*a,createdBy:"demo_admin"},{id:"msn_demo_live",title:"Boost Friday Night Live",promoteType:"live",budget:800,deadline:s+5*a,fundSource:"third_party",reward:"Share of $800 pot after 20% management fee",status:"active",participants:[],submissions:[],createdAt:s-a,createdBy:"demo_admin"},{id:"msn_demo_app",title:"Download DBS · invite 3 friends",promoteType:"app",budget:1200,deadline:s+30*a,fundSource:"dbs",reward:"Referral bonus stack · verified installs only",status:"active",participants:[],submissions:[],createdAt:s-5*a,createdBy:"demo_admin"},{id:"msn_demo_ended",title:"Ladies Only teaser push (ended)",promoteType:"video",budget:500,deadline:s-2*a,fundSource:"third_party",reward:"Completed · demo archive",status:"ended",participants:[{userId:"clipper_demo",username:"ClipQueen",joinedAt:s-10*a,score:90,referralCode:"REF-CLIP-OLD"}],submissions:[],createdAt:s-20*a,createdBy:"demo_admin"}].map(Ct);return Gt(i),{seeded:i.length,missions:i}}const hr=60*1e3,xi=60*1e3,ys=2,va=3,ba=3,Es=3,uc=["song","beat","music_video"],mc=[...uc,"freestyle"];function gr(){const e=u.spotlight||{};return{nowPlaying:e.nowPlaying||null,queue:Array.isArray(e.queue)?e.queue:[],history:Array.isArray(e.history)?e.history:[],houseIndex:typeof e.houseIndex=="number"?e.houseIndex:0}}function he(e){return u={...u,spotlight:e},A(u),e}function hc(e){return e==="freestyle"?"Live Freestyle":e==="beat"?"Beat":e==="music_video"?"Music Video":"Song"}function za(e,t="ended"){return e?{id:e.id,userId:e.userId,username:e.username,type:e.type,title:e.title,artist:e.artist,startedAt:e.startedAt,endedAt:Date.now(),extensions:e.extensions||0,playCount:e.playCount||1,reason:t}:null}function de(e=Date.now()){let t=gr(),s=t.nowPlaying;if(!s)return gc(t,e);if(s.house)return t;if(s.type==="freestyle"&&s.endsAt&&e>=s.endsAt&&!s.awaitingPlayAnother){if(Object.keys(s.keepGoingVotes||{}).length>=va&&(s.extensions||0)<ys&&!s.extensionApplied){s={...s,extensions:(s.extensions||0)+1,endsAt:e+xi,keepGoingVotes:{},extensionApplied:!1,voteWindowOpen:!0};const p={...t,nowPlaying:s};return he(p),p}const n=[za(s,"timer"),...t.history||[]].slice(0,30),o=[...t.queue||[]];let r=null,d=typeof t.houseIndex=="number"?t.houseIndex:0;if(o.length){const p=o.shift();r=ea(p,e)}else r=ta(xt(d),e);const c={nowPlaying:r,queue:o,history:n,houseIndex:d};return he(c),c}if(s.awaitingPlayAnother&&s.playAnotherDeadline&&e>=s.playAnotherDeadline){const a=Object.keys(s.playAnotherVotes||{}).length,i=s.playCount||1;if(a>=ba&&i<Es){s={...s,awaitingPlayAnother:!1,playAnotherVotes:{},playAnotherDeadline:null,playCount:i+1,title:s.nextTitle||s.title,startedAt:e,endsAt:null,nextTitle:null};const p={...t,nowPlaying:s};return he(p),p}const n=[za(s,"play_another_fail"),...t.history||[]].slice(0,30),o=[...t.queue||[]];let r=null,d=typeof t.houseIndex=="number"?t.houseIndex:0;o.length?r=ea(o.shift(),e):r=ta(xt(d),e);const c={nowPlaying:r,queue:o,history:n,houseIndex:d};return he(c),c}return t}function ea(e,t=Date.now()){const s=e.type==="freestyle";return{id:"sp_"+t.toString(36)+"_"+Math.random().toString(36).slice(2,6),userId:e.userId,username:e.username,type:e.type,title:e.title||(s?"Live Freestyle":"Untitled"),artist:e.artist||e.username,cover:e.cover||"",startedAt:t,endsAt:s?t+hr:null,extensions:0,playCount:1,keepGoingVotes:{},playAnotherVotes:{},voteWindowOpen:s,awaitingPlayAnother:!1,playAnotherDeadline:null,reactions:{fire:0,heart:0,clap:0},chat:[{id:"c_"+t.toString(36),userId:"system",username:"DBS",text:`${e.username} took the Spotlight · ${hc(e.type)} · TEST MODE`,at:t,system:!0}]}}function le(){const e=de();return{nowPlaying:e.nowPlaying||null,queue:[...e.queue||[]],history:[...e.history||[]],houseIndex:typeof e.houseIndex=="number"?e.houseIndex:0,thresholds:{keepGoing:va,playAnother:ba,maxExtensions:ys,maxUploadStreak:Es,freestyleMs:hr}}}function fr(){const e=[];for(const s of fe||[])!s||!s.embed||(s.category==="Music Videos"?e.push({id:s.id,title:s.title,artist:s.artist||"DatBoiSkeet",embed:s.embed,youtube:s.youtube||"",kind:"music_video",chipLabel:"House · Music Video",note:"DatBoiSkeet catalog · original YouTube · not a live act",cover:s.cover||""}):s.category==="Interviews"&&e.push({id:s.id,title:s.title,artist:s.artist||"DatBoiSkeet",embed:s.embed,youtube:s.youtube||"",kind:"interview",chipLabel:"House · Interview",note:"DatBoiSkeet interview · original YouTube · not a live act",cover:s.cover||""}));const t=(Ka||[]).find(s=>s.id==="pl-vlogs");if(t&&t.youtube){const s=String(t.youtube).match(/[?&]list=([^&]+)/),a=s&&s[1];a&&e.push({id:"house-bts-vlogs",title:t.title||"DatBoiSkeet Vlogs",artist:"DatBoiSkeet",embed:"https://www.youtube.com/embed/videoseries?list="+a,youtube:t.youtube,kind:"bts",chipLabel:"House · BTS",note:"Channel vlogs · dedicated BTS clips thin · original YouTube · not a live act",cover:""})}return e}function vr(){const e=fr().length;return e>0?e:1}function xt(e){const t=fr();if(!t.length)return{id:"house_empty",title:"DatBoiSkeet catalog",artist:"DatBoiSkeet",embed:"",youtube:"https://www.youtube.com/@DatBoiSkeet1",kind:"music_video",chipLabel:"House · Music Video",note:"Catalog loading · not a live act",cover:"",status:"House rotation"};const s=(e%t.length+t.length)%t.length;return{...t[s],status:t[s].chipLabel}}function ta(e,t=Date.now()){return{id:"house_"+(e.id||"x")+"_"+t.toString(36),userId:"dbs",username:"DatBoiSkeet",type:"music_video",house:!0,houseKind:e.kind||"music_video",chipLabel:e.chipLabel||"House · Music Video",title:e.title,artist:e.artist||"DatBoiSkeet",embed:e.embed||"",youtube:e.youtube||"",note:e.note||"House catalog · not a live act",cover:e.cover||"",startedAt:t,endsAt:null,extensions:0,playCount:1,keepGoingVotes:{},playAnotherVotes:{},voteWindowOpen:!1,awaitingPlayAnother:!1,playAnotherDeadline:null,reactions:{fire:0,heart:0,clap:0},chat:[{id:"c_house_"+t.toString(36),userId:"system",username:"DBS",text:`House catalog · ${e.chipLabel||"House"} · ${e.title} · not a live act · TEST MODE`,at:t,system:!0}]}}function gc(e,t=Date.now()){if(e.nowPlaying)return e;const s=typeof e.houseIndex=="number"?e.houseIndex:0,a=xt(s),i=ta(a,t),n={...e,nowPlaying:i,houseIndex:s};return he(n),n}function br(){const e=gr();return xt(typeof e.houseIndex=="number"?e.houseIndex:0)}function fc({type:e="song",title:t="",artist:s=""}={}){const a=u.user;if(!a)return{error:"signin"};const i=mc.includes(e)?e:"song",n=de(),o=a.id,r=(n.queue||[]).some(y=>y.userId===o),d=n.nowPlaying&&!n.nowPlaying.house&&n.nowPlaying.userId===o&&!n.nowPlaying.awaitingPlayAnother;if(r||d)return{error:"already_queued",state:le()};const c=String(t||"").trim().slice(0,80)||(i==="freestyle"?"Live Freestyle":i==="beat"?"Untitled Beat":i==="music_video"?"Untitled MV":"Untitled Song"),p=String(s||a.username||"").trim().slice(0,60),m={id:"q_"+Date.now().toString(36),userId:o,username:a.username,type:i,title:c,artist:p,cover:"",joinedAt:Date.now()};let g=n.nowPlaying,f=[...n.queue||[]],b=typeof n.houseIndex=="number"?n.houseIndex:0;return g?(g.house,f.push(m)):(g=ea(m),f=[]),he({...n,nowPlaying:g,queue:f,houseIndex:b}),{ok:!0,state:le()}}function Xi(){const e=u.user;if(!e)return{error:"signin"};const t=de(),s=(t.queue||[]).length,a=(t.queue||[]).filter(i=>i.userId!==e.id);return a.length===s?{error:"not_in_queue"}:(he({...t,queue:a}),{ok:!0,state:le()})}function vc(e){if(!u.user)return{error:"signin"};const s=de(),a=(s.queue||[]).filter(i=>i.id!==e);return he({...s,queue:a}),{ok:!0,state:le()}}function yr(e="advance"){if(!u.user)return{error:"signin"};const s=de(),a=s.nowPlaying,i=!!(a&&a.house),n=a&&!i?[za(a,e),...s.history||[]].slice(0,30):[...s.history||[]],o=[...s.queue||[]];let r=typeof s.houseIndex=="number"?s.houseIndex:0;i&&(r=(r+1)%vr());let d=null;return o.length?d=ea(o.shift()):d=ta(xt(r)),he({nowPlaying:d,queue:o,history:n,houseIndex:r}),{ok:!0,state:le()}}function bc(){return yr("skip")}function yc(){const e=u.user;if(!e)return{error:"signin"};const t=de(),s=t.nowPlaying;if(!s)return{error:"empty_stage"};if(s.house)return{error:"house_use_skip"};if(s.type==="freestyle")return{error:"freestyle_use_timer"};if(s.awaitingPlayAnother)return{error:"already_voting"};!(s.userId===e.id)&&ae();const i=s.playCount||1;if(i>=Es)return yr("max_streak");const n={...s,awaitingPlayAnother:!0,playAnotherVotes:{},playAnotherDeadline:Date.now()+30*1e3,nextTitle:s.title+" (take "+(i+1)+")"};return he({...t,nowPlaying:n}),{ok:!0,state:le()}}function kc(){const e=u.user;if(!e)return{error:"signin"};const t=de(),s=t.nowPlaying;if(!s||s.type!=="freestyle")return{error:"no_freestyle"};if(!s.voteWindowOpen)return{error:"window_closed"};if(s.awaitingPlayAnother)return{error:"wrong_mode"};if((s.extensions||0)>=ys)return{error:"max_extensions"};const a={...s.keepGoingVotes||{}};if(a[e.id])return{error:"already_voted",state:le()};a[e.id]=Date.now();let i={...s,keepGoingVotes:a};const n=Object.keys(a).length;return n>=va&&(s.extensions||0)<ys&&(i={...i,extensions:(s.extensions||0)+1,endsAt:Date.now()+xi,keepGoingVotes:{},voteWindowOpen:!0}),he({...t,nowPlaying:i}),{ok:!0,state:le(),votes:Object.keys(i.keepGoingVotes||{}).length||n}}function wc(e=2){const t=de(),s=t.nowPlaying;if(!s||s.type!=="freestyle")return{error:"no_freestyle"};const a={...s.keepGoingVotes||{}},i=Object.keys(a).length;for(let r=0;r<e;r++){const d="fan_sim_"+(i+r)+"_"+Date.now().toString(36);a[d]=Date.now()}let n={...s,keepGoingVotes:a};return Object.keys(a).length>=va&&(s.extensions||0)<ys&&(n={...n,extensions:(s.extensions||0)+1,endsAt:Date.now()+xi,keepGoingVotes:{},voteWindowOpen:!0}),he({...t,nowPlaying:n}),{ok:!0,state:le()}}function Sc(){const e=u.user;if(!e)return{error:"signin"};const t=de(),s=t.nowPlaying;if(!s||!s.awaitingPlayAnother)return{error:"no_vote"};const a={...s.playAnotherVotes||{}};if(a[e.id])return{error:"already_voted",state:le()};a[e.id]=Date.now();let i={...s,playAnotherVotes:a};const n=Object.keys(a).length,o=s.playCount||1;return n>=ba&&o<Es&&(i={...i,awaitingPlayAnother:!1,playAnotherVotes:{},playAnotherDeadline:null,playCount:o+1,title:s.nextTitle||s.title,startedAt:Date.now(),endsAt:null,nextTitle:null}),he({...t,nowPlaying:i}),{ok:!0,state:le()}}function $c(e=2){const t=de(),s=t.nowPlaying;if(!s||!s.awaitingPlayAnother)return{error:"no_vote"};const a={...s.playAnotherVotes||{}},i=Object.keys(a).length;for(let d=0;d<e;d++)a["fan_pa_"+(i+d)+"_"+Date.now().toString(36)]=Date.now();let n={...s,playAnotherVotes:a};const o=Object.keys(a).length,r=s.playCount||1;return o>=ba&&r<Es&&(n={...n,awaitingPlayAnother:!1,playAnotherVotes:{},playAnotherDeadline:null,playCount:r+1,title:s.nextTitle||s.title,startedAt:Date.now(),endsAt:null,nextTitle:null}),he({...t,nowPlaying:n}),{ok:!0,state:le()}}function xc(e="fire"){const t=de(),s=t.nowPlaying;if(!s)return{error:"empty_stage"};const a=["fire","heart","clap"].includes(e)?e:"fire",i={...s.reactions||{fire:0,heart:0,clap:0}};return i[a]=(i[a]||0)+1,he({...t,nowPlaying:{...s,reactions:i}}),{ok:!0,state:le()}}function Ec(e){const t=u.user;if(!t)return{error:"signin"};const s=String(e||"").trim().slice(0,200);if(!s)return{error:"empty"};const a=de(),i=a.nowPlaying;if(!i)return{error:"empty_stage"};const n=[...i.chat||[],{id:"c_"+Date.now().toString(36),userId:t.id,username:t.username,text:s,at:Date.now()}].slice(-40);return he({...a,nowPlaying:{...i,chat:n}}),{ok:!0,state:le()}}function Ac(e=20){return(de().history||[]).slice(0,e)}function Ke(){const e=u.fanClubs||{clubs:[],posts:{},seeded:!1};return{clubs:Array.isArray(e.clubs)?e.clubs:[],posts:e.posts&&typeof e.posts=="object"?e.posts:{},seeded:!!e.seeded}}function Vt(e){u={...u,fanClubs:e},A(u)}function kr(e){return e+"_"+Date.now().toString(36)+Math.random().toString(36).slice(2,7)}function wr(){return Ge(),Ke().clubs.slice().sort((e,t)=>e.official&&!t.official?-1:!e.official&&t.official?1:(t.memberCount||0)-(e.memberCount||0))}function As(e){return Ge(),Ke().clubs.find(t=>t.id===e)||null}function Ge({force:e=!1}={}){const t=Ke();if(t.seeded&&!e&&t.clubs.length>0)return{skipped:!0,clubs:t.clubs};const s=Date.now(),a=864e5,i=[{id:"fc_official_dbs",name:"DatBoiSkeet Official",description:"Official DatBoiSkeet fan club inside DBS Lounge. Music drops, Vault tips, Foreign X-Change, and community rules — DBS branding first. Follow optional.",graphic:"/brand/logo-dbs-v3@2x.webp",hostId:"dbs",hostName:"DatBoiSkeet",privacy:"public",official:!0,members:["dbs"],followers:["dbs"],mods:["dbs"],memberCount:1,createdAt:s-14*a},{id:"fc_lss_crew",name:"Long Story Short Crew",description:"Creator club for LSS listeners. Public lounge chat + Skeet+ members-only drop room.",graphic:"/music/01_Long_Story_Short_Coming_Soon.jpg",hostId:"dbs",hostName:"DatBoiSkeet",privacy:"members",official:!1,members:["dbs"],followers:["dbs"],mods:["dbs"],memberCount:1,createdAt:s-7*a},{id:"fc_ladies_only",name:"Ladies Only Circle",description:"Paid / Skeet+ gated room demo for Ladies Only supporters. Unlock via membership TEST MODE.",graphic:"/music/02_Ladies_Only_Coming_Soon.jpg",hostId:"dbs",hostName:"DatBoiSkeet",privacy:"paid",official:!1,members:["dbs"],followers:[],mods:["dbs"],memberCount:1,createdAt:s-3*a}],n={fc_official_dbs:[{id:"fcp_welcome",userId:"dbs",username:"DatBoiSkeet",text:"Welcome to the official club. Discover music on #/music · explore more on #/explore. No forced follows.",at:s-2*a,pinned:!0,removed:!1},{id:"fcp_lounge",userId:"dbs",username:"DatBoiSkeet",text:"DBS Lounge rooms stay music-first. Keep it respectful — see Community Guidelines.",at:s-a,pinned:!1,removed:!1}],fc_lss_crew:[{id:"fcp_lss1",userId:"dbs",username:"DatBoiSkeet",text:"LSS cover art is live in Coming Soon. Members can discuss theories here.",at:s-a,pinned:!1,removed:!1}],fc_ladies_only:[{id:"fcp_lo1",userId:"dbs",username:"DatBoiSkeet",text:"Skeet+ members-only preview chat. Join Skeet+ on Pricing (TEST MODE) to unlock.",at:s-12*36e5,pinned:!0,removed:!1}]};return Vt({clubs:i,posts:n,seeded:!0}),{seeded:i.length,clubs:i}}function Cc({name:e,description:t,graphic:s,privacy:a="public"}={}){const i=u.user;if(!i)return{error:"signin"};ae()||i.role==="creator"||i.id;const n=String(e||"").trim().slice(0,48);if(!n)return{error:"name"};const o=["public","members","paid"].includes(a)?a:"public";Ge();const r=Ke(),d={id:kr("fc"),name:n,description:String(t||"").trim().slice(0,280),graphic:String(s||"/brand/logo-dbs-v3@2x.webp").slice(0,200),hostId:i.id,hostName:i.username,privacy:o,official:!1,members:[i.id],followers:[i.id],mods:[i.id],memberCount:1,createdAt:Date.now()};return Vt({...r,clubs:[d,...r.clubs],posts:{...r.posts,[d.id]:[]},seeded:!0}),{ok:!0,club:d}}function ya(e,t){Ge();const s=Ke(),a=s.clubs.findIndex(o=>o.id===e);if(a<0)return{error:"missing"};const i=t({...s.clubs[a]});if(i&&i.error)return i;const n=s.clubs.slice();return n[a]=i,Vt({...s,clubs:n}),{ok:!0,club:i}}function Sr(e){const t=u.user;return t?ya(e,s=>{const a=new Set(s.members||[]);return a.add(t.id),{...s,members:[...a],memberCount:a.size}}):{error:"signin"}}function Tc(e){const t=u.user;return t?ya(e,s=>{if(s.hostId===t.id)return{error:"host"};const a=(s.members||[]).filter(i=>i!==t.id);return{...s,members:a,memberCount:a.length}}):{error:"signin"}}function Dc(e){const t=u.user;return t?ya(e,s=>{const a=new Set(s.followers||[]);return a.add(t.id),{...s,followers:[...a]}}):{error:"signin"}}function Lc(e){const t=u.user;return t?ya(e,s=>{const a=(s.followers||[]).filter(i=>i!==t.id);return{...s,followers:a}}):{error:"signin"}}function $r(e){const t=u.user;if(!t)return!1;const s=As(e);return!!(s&&(s.members||[]).includes(t.id))}function Mc(e){const t=u.user;if(!t)return!1;const s=As(e);return!!(s&&(s.followers||[]).includes(t.id))}function ks(e){const t=u.user;if(!t)return!1;const s=As(e);return s?ae()||s.hostId===t.id||(s.mods||[]).includes(t.id):!1}function xr(e){const t=As(e);if(!t)return{ok:!1,reason:"missing"};if(t.privacy==="public")return{ok:!0,reason:"public"};if(t.privacy==="members")return $r(e)||ks(e)?{ok:!0,reason:"member"}:{ok:!1,reason:"members"};if(t.privacy==="paid"){const s=Et();return({null:0,"skeet+":1,backstage:2,inner:3}[s||"null"]||0)>=1||ks(e)?{ok:!0,reason:"paid"}:{ok:!1,reason:"paid"}}return{ok:!0,reason:"public"}}function Ic(e){return Ge(),(Ke().posts[e]||[]).filter(s=>!s.removed).slice().sort((s,a)=>s.pinned&&!a.pinned?-1:!s.pinned&&a.pinned?1:(a.at||0)-(s.at||0))}function Pc(e,t){const s=u.user;if(!s)return{error:"signin"};const a=xr(e);if(!a.ok)return{error:"gated",reason:a.reason};const i=String(t||"").trim().slice(0,500);if(!i)return{error:"empty"};const n=Ke();if(!n.clubs.some(d=>d.id===e))return{error:"missing"};const o={id:kr("fcp"),userId:s.id,username:s.username,text:i,at:Date.now(),pinned:!1,removed:!1},r=[o,...n.posts[e]||[]].slice(0,100);return Vt({...n,posts:{...n.posts,[e]:r}}),{ok:!0,post:o}}function _c(e,t){if(!ks(e))return{error:"mod"};const s=Ke(),a=(s.posts[e]||[]).map(i=>i.id===t?{...i,pinned:!i.pinned}:i);return Vt({...s,posts:{...s.posts,[e]:a}}),{ok:!0}}function Oc(e,t){if(!ks(e))return{error:"mod"};const s=Ke(),a=(s.posts[e]||[]).map(i=>i.id===t?{...i,removed:!0}:i);return Vt({...s,posts:{...s.posts,[e]:a}}),{ok:!0}}const Ei=["instagram","tiktok","facebook","youtube","x","snapchat","other"],Er=[{id:"badge",minVerified:1,label:"Exclusive DBS badge",kind:"badge"},{id:"decoration",minVerified:2,label:"Premium avatar decoration",kind:"decoration"},{id:"skeet7",minVerified:3,label:"7 days Skeet+ (TEST MODE)",kind:"membership_trial",membership:"skeet+",days:7},{id:"skeet30",minVerified:3,requireAllLinked:!0,label:"30 days Skeet+ (all linked · min 3)",kind:"membership_trial",membership:"skeet+",days:30}],Ar=[{n:1,id:"m1",label:"Profile decoration",kind:"decoration"},{n:3,id:"m3",label:"7 days Skeet+ (TEST MODE)",kind:"membership_trial",membership:"skeet+",days:7},{n:5,id:"m5",label:"30 days Skeet+ (TEST MODE)",kind:"membership_trial",membership:"skeet+",days:30},{n:10,id:"m10",label:"Premium profile bundle",kind:"bundle"},{n:25,id:"m25",label:"30 days Backstage (TEST MODE)",kind:"membership_trial",membership:"backstage",days:30},{n:50,id:"m50",label:"30 days Inner Circle (TEST MODE)",kind:"membership_trial",membership:"inner",days:30},{n:100,id:"m100",label:"Founder Promoter badge / VIP",kind:"badge"}];function Cr(){return{platformsLinked:[],challenge:null,submissions:[],rewardsClaimed:[]}}function Tr(){return{code:"",invitees:[],milestonesClaimed:[]}}function Dr(e){const t=Cr();return!e||typeof e!="object"?t:{platformsLinked:Array.isArray(e.platformsLinked)?e.platformsLinked:[],challenge:e.challenge&&typeof e.challenge=="object"?e.challenge:null,submissions:Array.isArray(e.submissions)?e.submissions:[],rewardsClaimed:Array.isArray(e.rewardsClaimed)?e.rewardsClaimed:[]}}function Lr(e){const t=Tr();return!e||typeof e!="object"?t:{code:typeof e.code=="string"?e.code:"",invitees:Array.isArray(e.invitees)?e.invitees:[],milestonesClaimed:Array.isArray(e.milestonesClaimed)?e.milestonesClaimed:[]}}function Xe(e){return u={...u,shareEarn:Dr(e)},A(u),u.shareEarn}function ot(e){return u={...u,referEarn:Lr(e)},A(u),u.referEarn}function Mr(e){if(!e)return"DBS-GUEST";const t=String(e.username||"fan").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,8)||"FAN",s=String(e.id||"").replace(/^u_/,"").slice(-4).toUpperCase()||"DEMO";return`DBS-${t}-${s}`}function Tt(e){return e+"_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function rs(e=Date.now()){return new Date(e).toISOString().slice(0,10)}function ee(){return Dr(u.shareEarn)}function Zi(){return Ei.slice()}function qc(){return Er.map(e=>({...e}))}function Nc({platform:e,handle:t="",url:s="",followers:a=""}={}){if(!u.user)return{error:"signin"};const n=String(e||"").toLowerCase().trim();if(!Ei.includes(n))return{error:"bad_platform"};const o=String(t||"").trim().replace(/^@+/,"").slice(0,64),r=String(s||"").trim().slice(0,240);if(!o&&!r)return{error:"required"};const d=ee();if((d.platformsLinked||[]).some(m=>m.platform===n))return{error:"already_linked",shareEarn:d};const c={id:Tt("plat"),platform:n,handle:o,url:r,followers:String(a||"").trim().slice(0,32),linkedAt:Date.now()},p={...d,platformsLinked:[...d.platformsLinked||[],c]};return Xe(p),{ok:!0,platform:c,shareEarn:ee()}}function Bc(e){const t=ee(),s={...t,platformsLinked:(t.platformsLinked||[]).filter(a=>a.id!==e)};return Xe(s),ee()}function Rc(){if(!u.user)return{error:"signin"};const t=ee();if(t.challenge&&t.challenge.status==="active")return{error:"already_active",shareEarn:t};const s=Ut().code,a=Date.now(),i={id:Tt("ch"),startedAt:a,endsAt:a+24*60*60*1e3,adTitle:"DatBoiSkeet · Long Story Short & Ladies Only",caption:"🔥 Join me on DBS — music, live, vault & more. Long Story Short + Ladies Only Coming Soon. #DBS #PaidPartnership #ad",trackedLink:`https://dbs.app/s/${s}?utm=share24`,status:"active",disclosure:"Incentivized promotion · disclose #ad / Paid partnership"};return Xe({...t,challenge:i,submissions:[],rewardsClaimed:(t.rewardsClaimed||[]).filter(n=>n.challengeId!==i.id)}),{ok:!0,challenge:i,shareEarn:ee()}}function jc(){const e=ee();if(!e.challenge||e.challenge.status!=="active")return{error:"no_active"};const t={...e.challenge,startedAt:Date.now()-25*60*60*1e3,endsAt:Date.now()-1*60*60*1e3,simulatedElapsed:!0};return Xe({...e,challenge:t}),{ok:!0,challenge:t,shareEarn:ee()}}function Fc(){const e=ee();if(!e.challenge)return{error:"none"};const t={...e.challenge,status:"ended",endedAt:Date.now()};return Xe({...e,challenge:t}),{ok:!0,challenge:t,shareEarn:ee()}}function Kc({platform:e,postUrl:t=""}={}){if(!u.user)return{error:"signin"};const a=ee();if(!a.challenge||a.challenge.status!=="active")return{error:"no_challenge"};const i=String(e||"").toLowerCase().trim();if(!Ei.includes(i))return{error:"bad_platform"};const n=String(t||"").trim().slice(0,400);if(!n)return{error:"required"};if((a.submissions||[]).some(d=>d.platform===i&&(d.status==="pending"||d.status==="verified")))return{error:"duplicate",shareEarn:a};const r={id:Tt("sub"),platform:i,postUrl:n,submittedAt:Date.now(),status:"pending",note:"Awaiting 24h continuous visibility check (manual/demo)"};return Xe({...a,submissions:[r,...a.submissions||[]]}),{ok:!0,submission:r,shareEarn:ee()}}function en(e,t,{note:s=""}={}){if(!["pending","verified","rejected"].includes(t))return{error:"bad_status"};const a=ee();let i=null;const n=(a.submissions||[]).map(o=>o.id!==e?o:(i={...o,status:t,verifiedAt:t==="verified"?Date.now():o.verifiedAt||null,note:s||(t==="verified"?"Demo verified · 24h visibility assumed (manual)":t==="rejected"?"Rejected · ineligible / deleted / unverified":o.note)},i));return i?(Xe({...a,submissions:n}),{ok:!0,submission:i,shareEarn:ee()}):{error:"not_found"}}function Ir(){const e=ee();return new Set((e.submissions||[]).filter(s=>s.status==="verified").map(s=>s.platform)).size}function Pr(){const e=ee(),t=Ir(),s=(e.platformsLinked||[]).length,a=new Set((e.rewardsClaimed||[]).map(i=>i.tierId));return Er.filter(i=>{if(a.has(i.id)||t<i.minVerified)return!1;if(i.requireAllLinked){if(s<3)return!1;const n=new Set((e.platformsLinked||[]).map(r=>r.platform)),o=new Set((e.submissions||[]).filter(r=>r.status==="verified").map(r=>r.platform));for(const r of n)if(!o.has(r))return!1}return!0}).map(i=>({...i,verifiedCount:t,linkedCount:s}))}function Gc(e){var o;if(!u.user)return{error:"signin"};const a=Pr().find(r=>r.id===e);if(!a)return{error:"not_claimable"};const i=ee(),n={id:Tt("srw"),tierId:a.id,label:a.label,kind:a.kind,at:Date.now(),challengeId:((o=i.challenge)==null?void 0:o.id)||null,testMode:!0};return a.membership&&la(a.membership,!0),Xe({...i,rewardsClaimed:[n,...i.rewardsClaimed||[]]}),{ok:!0,claim:n,shareEarn:ee(),membership:Et()}}function Vc(){return Xe(Cr()),ee()}function xe(){return Lr(u.referEarn)}function Uc(){return Ar.map(e=>({...e}))}function Ut(){const e=u.user,t=xe();if(t.code)return t;const s=Mr(e);return ot({...t,code:s})}function _r(){return`https://dbs.app/r/${Ut().code}`}function Hc({username:e=""}={}){const t=u.user;if(!t)return{error:"signin"};const s=Ut(),a=String(e||"").trim().slice(0,24)||"Invitee"+(s.invitees.length+1);if(a.toLowerCase()===String(t.username||"").toLowerCase())return{error:"self_referral"};const i={id:Tt("inv"),username:a,signedUpAt:Date.now(),activeDays:[],status:"pending",welcomeClaimed:!1,flaggedFraud:!1};return ot({...s,invitees:[i,...s.invitees||[]]}),{ok:!0,invitee:i,referEarn:xe()}}function zc(e){const t=xe();let s=null;const a=(t.invitees||[]).map(i=>i.id!==e?i:i.flaggedFraud?(s={error:"fraud",invitee:i},i):(s={...i,welcomeClaimed:!0,welcomeAt:Date.now()},s));return s?s.error?s:(ot({...t,invitees:a}),{ok:!0,invitee:s,perk:"Welcome badge / profile decoration (TEST MODE)"}):{error:"not_found"}}function Wc(e,{day:t=null}={}){const s=xe();let a=null;const i=(s.invitees||[]).map(n=>{if(n.id!==e)return n;if(n.flaggedFraud)return a={error:"fraud",invitee:n},n;const o=Number(n.signedUpAt)||Date.now(),r=o+7*864e5;let d=t;if(!d){const g=new Set(n.activeDays||[]);let f=null;for(let b=0;b<7;b++){const y=rs(o+b*864e5);if(!g.has(y)){f=y;break}}if(!f)return a={error:"window_full",invitee:n},n;d=f}const c=Date.parse(d+"T12:00:00Z");if(!Number.isFinite(c)||c<o-864e5||c>r)return a={error:"outside_window",invitee:n},n;const p=Array.from(new Set([...n.activeDays||[],d])).sort();let m=n.status;return p.length>=3&&(m="active"),a={...n,activeDays:p,status:m},a});return a?a.error?a:(ot({...s,invitees:i}),{ok:!0,invitee:a,referEarn:xe()}):{error:"not_found"}}function tn(e,t=!0){const s=xe();let a=null;const i=(s.invitees||[]).map(n=>{var o;return n.id!==e?n:(a={...n,flaggedFraud:!!t,status:t?"fraud":((o=n.activeDays)==null?void 0:o.length)>=3?"active":"pending"},a)});return a?(ot({...s,invitees:i}),{ok:!0,invitee:a,referEarn:xe()}):{error:"not_found"}}function Or(){return(xe().invitees||[]).filter(t=>t.status==="active"&&!t.flaggedFraud).length}function qr(){const e=xe(),t=Or(),s=new Set((e.milestonesClaimed||[]).map(a=>a.milestoneId));return Ar.filter(a=>t>=a.n&&!s.has(a.id)).map(a=>({...a,activeCount:t}))}function Yc(e){if(!u.user)return{error:"signin"};const a=qr().find(o=>o.id===e);if(!a)return{error:"not_claimable"};const i=xe(),n={id:Tt("rmw"),milestoneId:a.id,n:a.n,label:a.label,kind:a.kind,at:Date.now(),testMode:!0,note:"Distinct from Clippers commissions · TEST MODE · no real billing"};return a.membership&&la(a.membership,!0),ot({...i,milestonesClaimed:[n,...i.milestonesClaimed||[]]}),{ok:!0,claim:n,referEarn:xe(),membership:Et()}}function Jc(){const e=u.user;return ot({...Tr(),code:Mr(e)}),xe()}function Qc({force:e=!1}={}){if(!u.user)return{error:"signin"};const s=Ut();if(!e&&(s.invitees||[]).length>0)return{error:"already_seeded",referEarn:s};const a=Date.now(),i=864e5,n=[{id:"inv_demo_a",username:"NovaFan",signedUpAt:a-5*i,activeDays:[rs(a-5*i),rs(a-4*i),rs(a-3*i)],status:"active",welcomeClaimed:!0,flaggedFraud:!1},{id:"inv_demo_b",username:"ClipCurious",signedUpAt:a-2*i,activeDays:[rs(a-2*i)],status:"pending",welcomeClaimed:!0,flaggedFraud:!1},{id:"inv_demo_c",username:"BottyMcBot",signedUpAt:a-6*i,activeDays:[],status:"fraud",welcomeClaimed:!1,flaggedFraud:!0}];return ot({...s,invitees:n,milestonesClaimed:s.milestonesClaimed||[]}),{ok:!0,seeded:n.length,referEarn:xe()}}const ka=[{id:"youtube",label:"YouTube",color:"#ff4444",hint:"YouTube Live / Studio"},{id:"tiktok",label:"TikTok",color:"#69c9d0",hint:"TikTok LIVE"},{id:"twitch",label:"Twitch",color:"#9146ff",hint:"Twitch Dashboard"},{id:"facebook",label:"Facebook",color:"#1877f2",hint:"Facebook Live"},{id:"instagram",label:"Instagram",color:"#e1306c",hint:"IG Live (demo)"},{id:"kick",label:"Kick",color:"#53fc18",hint:"Kick Studio"},{id:"custom_rtmp",label:"Custom RTMP",color:"#ffb020",hint:"Any RTMP endpoint"}],Xc=()=>({freeMaxDestinations:2,houseUnlimited:!0,houseUserIds:["dbs"],tiers:{bronze:{id:"bronze",label:"Bronze",price:4.99,maxDestinations:3,placement:!1,badge:"Bronze Streamer",perks:["3 destination slots","Campaign badge on Go Live"]},silver:{id:"silver",label:"Silver",price:9.99,maxDestinations:5,placement:!0,badge:"Silver Streamer",perks:["5 destination slots","Campaign badge","Explore / Live placement flag"]},gold:{id:"gold",label:"Gold",price:19.99,maxDestinations:7,placement:!0,badge:"Gold Streamer",perks:["All 7 destinations","Campaign badge","Priority Explore / Live placement"]}}});function Gs(){return{platforms:{},selected:[],session:null,history:[],ingest:null,campaign:{tier:null,status:"none",enrolledAt:null,cancelledAt:null},campaignConfig:null}}function wa(){const e=u.restream||Gs();return{...Gs(),...e,platforms:e.platforms&&typeof e.platforms=="object"?e.platforms:{},selected:Array.isArray(e.selected)?e.selected:[],history:Array.isArray(e.history)?e.history:[],campaign:{...Gs().campaign,...e.campaign||{}}}}function Ht(e){return u={...u,restream:e},A(u),u.restream}function Zc(e){var s,a;if((s=e.ingest)!=null&&s.rtmpUrl&&((a=e.ingest)!=null&&a.streamKey))return e;const t="dbs_demo_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,10);return{...e,ingest:{rtmpUrl:"rtmp://ingest.dbs.local/live",streamKey:t,rotatedAt:Date.now(),note:"TEST MODE demo key · not a real media server"}}}function lt(){let e=wa();const t=e.ingest;return e=Zc(e),e.ingest!==t&&Ht(e),e}function Nr(){const e=lt();return ka.map(t=>{const s=e.platforms[t.id]||{};return{...t,connected:!!s.connected,connectedAt:s.connectedAt||null,handle:s.handle||"",lastError:s.lastError||null,enabled:s.enabled!==!1}})}function ed(e,t=""){const s=ka.find(n=>n.id===e);if(!s)return{error:"unknown_platform"};const a=lt(),i={...a.platforms,[e]:{id:e,connected:!0,connectedAt:Date.now(),handle:String(t||s.label+" Demo").slice(0,40),lastError:null,enabled:!0}};return Ht({...a,platforms:i}),{ok:!0,platform:Nr().find(n=>n.id===e)}}function td(e){var n;const t=lt();if(!((n=t.platforms[e])!=null&&n.connected))return{error:"not_connected"};const s={...t.platforms,[e]:{...t.platforms[e],connected:!1,disconnectedAt:Date.now(),lastError:null}},a=(t.selected||[]).filter(o=>o!==e);let i=t.session;return i&&!i.endedAt&&(i={...i,destinations:(i.destinations||[]).map(o=>o.id===e?{...o,status:"disconnected",health:"error"}:o)}),Ht({...t,platforms:s,selected:a,session:i}),{ok:!0}}function sd(e){const t=lt(),s=new Set(Object.values(t.platforms).filter(i=>i.connected).map(i=>i.id)),a=(Array.isArray(e)?e:[]).filter(i=>s.has(i)).slice(0,7);return Ht({...t,selected:a}),{ok:!0,selected:a}}function ad(e){var a;const t=lt();if(!((a=t.platforms[e])!=null&&a.connected))return{error:"not_connected"};const s=new Set(t.selected||[]);return s.has(e)?s.delete(e):s.add(e),sd([...s])}function Br(){var a,i,n;const e=wa(),t=Xc(),s=e.campaignConfig||{};return{...t,...s,tiers:{...t.tiers,...s.tiers||{},bronze:{...t.tiers.bronze,...((a=s.tiers)==null?void 0:a.bronze)||{}},silver:{...t.tiers.silver,...((i=s.tiers)==null?void 0:i.silver)||{}},gold:{...t.tiers.gold,...((n=s.tiers)==null?void 0:n.gold)||{}}},freeMaxDestinations:Number(s.freeMaxDestinations)>0?Number(s.freeMaxDestinations):t.freeMaxDestinations,houseUnlimited:s.houseUnlimited!==!1,houseUserIds:Array.isArray(s.houseUserIds)?s.houseUserIds:t.houseUserIds}}function Rr(){return{...Gs().campaign,...wa().campaign||{}}}function id(){const e=u.user;if(!e)return!1;const t=Br();return e.id==="dbs"||e.username==="DatBoiSkeet"?!0:(t.houseUserIds||[]).includes(e.id)}function jr(){const e=Br();if(id()&&e.houseUnlimited)return{max:ka.length,source:"house_free",tier:null};const t=Rr();if(t.status==="active"&&t.tier&&e.tiers[t.tier]){const s=e.tiers[t.tier];return{max:s.maxDestinations,source:"campaign",tier:t.tier,badge:s.badge,placement:!!s.placement}}return{max:e.freeMaxDestinations,source:"free_baseline",tier:null,badge:null,placement:!1}}function nd(){const e=u.user;if(!e)return{error:"signin"};const t=lt();if(t.session&&!t.session.endedAt)return{error:"already_live"};const s=Object.values(t.platforms).filter(d=>d.connected).map(d=>d.id);if(!s.length)return{error:"no_platforms"};let a=(t.selected||[]).filter(d=>s.includes(d));if(!a.length)return{error:"none_selected"};const i=jr();if(a.length>i.max)return{error:"over_cap",max:i.max,selected:a.length,source:i.source};const n=a.map((d,c)=>{const p=ka.find(g=>g.id===d),m=c===a.length-1&&a.length>2?"connecting":"streaming";return{id:d,label:(p==null?void 0:p.label)||d,status:m==="connecting"?"connecting":"streaming",health:m,startedAt:Date.now()}}),o=Rr(),r={id:Tt("rs"),hostId:e.id,hostName:e.username,startedAt:Date.now(),destinations:n,selected:a.slice(),campaignTier:o.status==="active"?o.tier:null,campaignBadge:i.badge||null,placement:!!i.placement,testMode:!0,endedAt:null};return Ht({...t,session:r,selected:a}),{ok:!0,session:r}}function rd(){const e=lt();if(!e.session||e.session.endedAt)return{error:"offline"};const t={...e.session,endedAt:Date.now(),destinations:(e.session.destinations||[]).map(a=>({...a,status:a.health==="error"?"error":"ended",health:a.health==="error"?"error":"ended"}))},s=[t,...e.history||[]].slice(0,20);return Ht({...e,session:null,history:s}),{ok:!0,session:t,history:s}}function od(){const e=wa().session;return e&&!e.endedAt?e:null}function Fr(){const e=M().connectPrefs||{};return{ageConfirmed:!!e.ageConfirmed,rulesAccepted:!!e.rulesAccepted}}function sn(e={}){const t={...Fr(),...e};return t.ageConfirmed||(t.rulesAccepted=!1),Ko(s=>({...s,connectPrefs:t})),t}const Kr=[{id:"day_one",name:"Day One",blurb:"Joined the Loyalty Club — recognition starts with showing up, not spending.",need:0,kind:"join"},{id:"listener",name:"Listener",blurb:"Logged authorized listening (demo tick). Not purchase-only.",need:1,kind:"listen"},{id:"live_attendee",name:"Live Regular",blurb:"Attended a livestream (demo stub). Healthy participation.",need:1,kind:"live"},{id:"club_member",name:"Club Member",blurb:"Joined a Fan Club discussion community.",need:1,kind:"club"},{id:"helper",name:"Helper",blurb:"Community-helper milestone (welcome tip / guidelines share demo).",need:1,kind:"help"},{id:"top_fan",name:"Top Fan",blurb:"Earned 50+ loyalty points from mixed healthy actions — gifts alone do not unlock this.",needPoints:50}];function Gr(e=Date.now()){return new Date(e).toISOString().slice(0,10)}function Cs(){const e=u.loyalty||{};return{points:Number(e.points)||0,history:Array.isArray(e.history)?e.history:[],badges:Array.isArray(e.badges)?e.badges:[],publicVisible:e.publicVisible!==!1,lastActionAt:e.lastActionAt&&typeof e.lastActionAt=="object"?e.lastActionAt:{},dayCounts:e.dayCounts&&typeof e.dayCounts=="object"?e.dayCounts:{}}}function Ai(e){u={...u,loyalty:e},A(u)}function ld(){return"loy_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function cd(e,{cooldownMs:t=8e3,dailyCap:s=8}={}){const a=Cs(),i=Date.now(),n=Number(a.lastActionAt[e])||0;if(i-n<t)return{ok:!1,reason:"cooldown"};const o=Gr(i);return((a.dayCounts[o]||{})[e]||0)>=s?{ok:!1,reason:"daily_cap"}:{ok:!0}}function dd(e){const t=new Set(e.badges||[]),s={};return(e.history||[]).forEach(a=>{s[a.kind]=(s[a.kind]||0)+1}),Kr.forEach(a=>{if(!t.has(a.id)){if(a.needPoints!=null){e.points>=a.needPoints&&t.add(a.id);return}if(a.id==="day_one"){((e.history||[]).length>0||e.points>0)&&t.add(a.id);return}(s[a.kind]||0)>=(a.need||1)&&t.add(a.id)}}),[...t]}function Ts(){return Cs()}function pd(e){const t=Cs();return Ai({...t,publicVisible:!!e}),Ts()}function ud(e,{points:t=5,note:s=""}={}){if(!u.user)return{error:"signin"};const i=cd(e);if(!i.ok)return{error:i.reason};const n=Cs(),o=Date.now(),r=Gr(o),d={...n.dayCounts,[r]:{...n.dayCounts[r]||{},[e]:((n.dayCounts[r]||{})[e]||0)+1}},c={id:ld(),at:o,kind:e,points:t,note:String(s||e).slice(0,120)},p={...n,points:n.points+t,history:[c,...n.history].slice(0,80),lastActionAt:{...n.lastActionAt,[e]:o},dayCounts:d};return p.badges.includes("day_one")||(p.history=p.history),p.badges=dd(p),p.badges.includes("day_one")||(p.badges=["day_one",...p.badges]),Ai(p),{ok:!0,loyalty:Ts(),entry:c,newBadges:p.badges.filter(m=>!(n.badges||[]).includes(m))}}function Vr(){const e=Ts(),t=new Set(e.badges||[]);return Kr.map(s=>({...s,unlocked:t.has(s.id)}))}function md(){return Ai({points:0,history:[],badges:[],publicVisible:!0,lastActionAt:{},dayCounts:{}}),Ts()}function Dt(){const e=u.openMic||{};return{applications:Array.isArray(e.applications)?e.applications:[],seeded:!!e.seeded,houseIndex:typeof e.houseIndex=="number"?e.houseIndex:0}}function Sa(e){u={...u,openMic:e},A(u)}function hd(){return"om_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function zt({force:e=!1}={}){const t=Dt();if(t.seeded&&!e&&t.applications.length>0)return{skipped:!0,applications:t.applications};const s=Date.now(),a=864e5,i=[{id:"om_demo_approved",userId:"u_ria",username:"RiaLoops",talent:"producer",trackTitle:"Midnight Pads (demo)",profileNote:"Beatmaker · looking to collab on LSS energy",rightsCertified:!0,status:"approved",at:s-10*a,reviewedAt:s-9*a},{id:"om_demo_pending",userId:"u_dez",username:"DezOnMic",talent:"rapper",trackTitle:"Porch Light Freestyle",profileNote:"Opt-in showcase · not pay-to-win",rightsCertified:!0,status:"pending",at:s-2*a},{id:"om_demo_rejected",userId:"u_spam",username:"SpamBeats",talent:"dj",trackTitle:"Untitled drop",profileNote:"No rights cert honesty",rightsCertified:!1,status:"rejected",at:s-5*a,reviewedAt:s-4*a,reviewNote:"Rights certification required"}],n=typeof t.houseIndex=="number"?t.houseIndex:0;return Sa({applications:i,seeded:!0,houseIndex:n}),{seeded:i.length,applications:i}}function Wa({status:e=null}={}){zt();let t=Dt().applications.slice();return e&&(t=t.filter(s=>s.status===e)),t.sort((s,a)=>(a.at||0)-(s.at||0))}function gd(){return Wa({status:"approved"})}function fd(){const e=Dt();return xt(typeof e.houseIndex=="number"?e.houseIndex:0)}function vd(){const e=Dt(),t=((typeof e.houseIndex=="number"?e.houseIndex:0)+1)%vr();return Sa({...e,houseIndex:t}),xt(t)}function bd({talent:e="rapper",trackTitle:t="",profileNote:s="",rightsCertified:a=!1}={}){const i=u.user;if(!i)return{error:"signin"};if(!a)return{error:"rights"};const n=String(t||"").trim().slice(0,80);if(!n)return{error:"title"};zt();const o=Dt();if(o.applications.some(d=>d.userId===i.id&&d.status==="pending"))return{error:"pending"};const r={id:hd(),userId:i.id,username:i.username,talent:String(e||"other").slice(0,32),trackTitle:n,profileNote:String(s||"").trim().slice(0,240),rightsCertified:!0,status:"pending",at:Date.now()};return Sa({...o,applications:[r,...o.applications],seeded:!0}),{ok:!0,application:r}}function Ya(e,t,s=""){if(!ae())return{error:"admin"};if(!["pending","approved","rejected"].includes(t))return{error:"status"};const i=Dt();let n=null;const o=i.applications.map(r=>r.id!==e?r:(n={...r,status:t,reviewedAt:Date.now(),reviewNote:String(s||"").slice(0,160)},n));return n?(Sa({...i,applications:o}),{ok:!0,application:n}):{error:"missing"}}function yd(){var $,C;zt(),Ge();try{Ds(),je()}catch{}const e=Dt().applications||[],t={pending:0,approved:0,rejected:0};e.forEach(k=>{const P=k.status||"pending";t[P]!==void 0?t[P]+=1:t.pending+=1});const s=e.filter(k=>k.status==="pending").sort((k,P)=>(P.at||0)-(k.at||0)),a=Ke().clubs.slice().sort((k,P)=>(P.createdAt||0)-(k.createdAt||0)),i=a.slice(0,5).map(k=>({id:k.id,name:k.name,privacy:k.privacy,official:!!k.official,memberCount:k.memberCount||(k.members||[]).length||0,createdAt:k.createdAt||0})),n=Cs(),r=Vr().filter(k=>k.unlocked),d=rt(),c=gi();let p=0,m=0,g=0,f=0,b=0;c.forEach(k=>{p=N(p+(k.gross||0)),m=N(m+(k.fees||0)),g=N(g+(k.creatorShare||0)),f=N(f+(k.dbsShare||0)),b+=k.count||0});const y=u.wallet||{balance:0},v=u.catalog||[],w=Wn();return{openMic:{total:e.length,byStatus:t,pending:s},fanClubs:{total:a.length,recent:i},loyalty:{points:n.points||0,badgeCount:r.length,badges:r.map(k=>k.name||k.id),publicVisible:n.publicVisible!==!1,historyCount:(n.history||[]).length,note:"Device-local loyalty for signed-in user · not a multi-fan leaderboard"},revenue:{demo:!0,chip:"demo figures · not production",gross:p,fees:m,creatorShare:g,dbsShare:f,earnCount:b,creatorAvailable:N(d.available||0),creatorHolds:N(d.holds||0),fanWalletBalance:Number(y.balance)||0,byCategory:c.filter(k=>k.count>0),catalogPublished:v.filter(k=>k.published).length,catalogTotal:v.length},moderation:{warnings:[],suspensions:[],note:"Stub · Content Polish owns Guidelines copy"},hotFeed:{openAlerts:(u.engagementAlerts||[]).filter(k=>!k.handledAt).length,totalAlerts:(u.engagementAlerts||[]).length,hotPosts:Array.isArray(($=u.hotFeed)==null?void 0:$.posts)?u.hotFeed.posts.length:0,hotLives:Array.isArray((C=u.hotFeed)==null?void 0:C.lives)?u.hotFeed.lives.length:0,note:"§38 · Build posts + Live Social lives"},stats:w}}const kd={frames:"frame",effects:"effect",banners:"banner","name styles":"nameStyle",badges:"badge"},an=["frame-rodeo-gold","fx-snowfall","ban-skyline","name-neon","badge-dayone"];function wd(e){const t=e&&typeof e=="object"?e:{},s={};return["frame","effect","banner","nameStyle","badge"].forEach(a=>{typeof t[a]=="string"&&t[a]&&(s[a]=t[a])}),s}function Wt(){const e=u.profileShop||{};return{owned:Array.isArray(e.owned)?[...new Set(e.owned.map(String))]:[],equipped:wd(e.equipped),reduceMotion:!!e.reduceMotion}}function Yt(e){u={...u,profileShop:e},A(u)}function at(){return Wt()}function Ur(e){return e&&kd[e.category]||null}function Sd(e){const t=String(e||"");if(!t)return{error:"missing"};const s=Wt();return s.owned.includes(t)?{ok:!0,already:!0,shop:at()}:(Yt({...s,owned:[...s.owned,t]}),{ok:!0,shop:at()})}function $d(){const e=Wt(),t=new Set(e.owned);return an.forEach(s=>t.add(s)),Yt({...e,owned:[...t]}),{ok:!0,unlocked:an,shop:at()}}function xd(e){const t=String(e||"");return t.startsWith("frame-")?"frame":t.startsWith("fx-")?"effect":t.startsWith("ban-")?"banner":t.startsWith("name-")?"nameStyle":t.startsWith("badge-")?"badge":null}function Ed(e){const t=String(e||""),s=Wt();if(!s.owned.includes(t))return{error:"not_owned"};const a=xd(t);if(!a)return{error:"unknown_item"};const i={...s.equipped,[a]:t};return Yt({...s,equipped:i}),{ok:!0,slot:a,shop:at()}}function Ad(e){const t=String(e||"");if(!["frame","effect","banner","nameStyle","badge"].includes(t))return{error:"bad_slot"};const s=Wt(),a={...s.equipped};return delete a[t],Yt({...s,equipped:a}),{ok:!0,shop:at()}}function Cd(e){const t=Wt();return Yt({...t,reduceMotion:!!e}),at()}function Td(){return Yt({owned:[],equipped:{},reduceMotion:!1}),at()}const Dd=5,Ld=8,Md=[{id:"hp_maya_1",userId:"maya",username:"MayaBeats",text:"Studio loop dropping later — who wants the stem pack? 🔥",image:"/music/01_Long_Story_Short_Coming_Soon.jpg",mediaType:"image",atOffset:36e5*5,likeUsers:["dbs","fanjay","u_seed_a","u_seed_b","u_seed_c","u_seed_d","clipqueen"],comments:[{id:"hc_m1",userId:"fanjay",username:"FanJay",text:"Send it 🙌"},{id:"hc_m2",userId:"dbs",username:"DatBoiSkeet",text:"Pull up on Spotlight"},{id:"hc_m3",userId:"clipqueen",username:"ClipQueen",text:"Stem pack please"}],shares:5},{id:"hp_jay_1",userId:"fanjay",username:"FanJay",text:"Foreign X-Change fit check from the community — buffalo energy.",image:"/merch/03_blue_buffalo_jacket.jpeg",mediaType:"image",atOffset:36e5*8,likeUsers:["maya","dbs","u_seed_a","u_seed_c","u_seed_d","clipqueen","u_seed_b"],comments:[{id:"hc_j1",userId:"maya",username:"MayaBeats",text:"Jacket hits"},{id:"hc_j2",userId:"clipqueen",username:"ClipQueen",text:"Need this"}],shares:6},{id:"hp_clip_1",userId:"clipqueen",username:"ClipQueen",text:"New clip cut from last Live — tag @DatBoiSkeet if you remix 🎬",image:"/merch/06_black_ptsd_tee.jpeg",mediaType:"video",atOffset:36e5*12,likeUsers:["dbs","maya","fanjay","u_seed_a","u_seed_b","u_seed_c"],comments:[{id:"hc_c1",userId:"dbs",username:"DatBoiSkeet",text:"Clean edit"},{id:"hc_c2",userId:"maya",username:"MayaBeats",text:"Clipping goals"},{id:"hc_c3",userId:"fanjay",username:"FanJay",text:"Saved"},{id:"hc_c4",userId:"u_seed_a",username:"FanA",text:"Fire"}],shares:4},{id:"hp_dbs_boost",userId:"dbs",username:"DatBoiSkeet",text:"Community shoutout — Maya + Jay keeping the feed hot. Keep posting.",image:"/music/02_Ladies_Only_Coming_Soon.jpg",mediaType:"image",atOffset:36e5*3,likeUsers:["maya","fanjay","u_seed_a"],comments:[{id:"hc_d1",userId:"maya",username:"MayaBeats",text:"Grateful 💛"},{id:"hc_d2",userId:"fanjay",username:"FanJay",text:"Lets go"}],shares:2}];function Pe(){const e=u.hotFeed||{};return{lives:Array.isArray(e.lives)?e.lives:[],posts:Array.isArray(e.posts)?e.posts:[],seededLives:!!e.seededLives,seededPosts:!!e.seededPosts,seededPostsVer:Number(e.seededPostsVer)||0}}function Hr(e){u={...u,hotFeed:e},A(u)}function Id(){const e={...u.profiles};let t=!1;const s=(a,i,n)=>{e[a]||(e[a]={id:a,username:i,bio:n,avatar:"",followers:[],following:["dbs"],verified:!1},t=!0)};s("maya","MayaBeats","Creator · beats & live demos"),s("fanjay","FanJay","Day-one fan · playlist curator"),s("clipqueen","ClipQueen","Clipper · community edits"),t&&(u={...u,profiles:e})}function Ds(){Hn(),Id();const e=Pe(),t=Number(e.seededPostsVer)||0;if(e.seededPosts&&t>=2)return Pe();if(e.seededPosts&&t<2){const d={...u.likes||{}},c={...u.comments||{}},p={...u.postShares||{}},m=(g,f,b,y)=>{d[g]=[...new Set([...d[g]||[],...f])];const v=new Set((c[g]||[]).map($=>$.id)),w=[...c[g]||[]];(b||[]).forEach($=>{v.has($.id)||w.push({...$,at:$.at||Date.now()})}),c[g]=w,p[g]=Math.max(Number(p[g]||0),y)};return m("hp_maya_1",["dbs","fanjay","u_seed_a","u_seed_b","u_seed_c","u_seed_d","clipqueen"],[{id:"hc_m3",userId:"clipqueen",username:"ClipQueen",text:"Stem pack please"}],5),m("hp_jay_1",["maya","dbs","u_seed_a","u_seed_c","u_seed_d","clipqueen","u_seed_b"],[{id:"hc_j2",userId:"clipqueen",username:"ClipQueen",text:"Need this"}],6),m("hp_clip_1",["dbs","maya","fanjay","u_seed_a","u_seed_b","u_seed_c"],[{id:"hc_c4",userId:"u_seed_a",username:"FanA",text:"Fire"}],4),d.hp_dbs_boost&&(d.hp_dbs_boost=(d.hp_dbs_boost||[]).slice(0,3),p.hp_dbs_boost=Math.min(Number(p.hp_dbs_boost||0),2)),u={...u,likes:d,comments:c,postShares:p,hotFeed:{...e,seededPosts:!0,seededPostsVer:2}},A(u),je(),Pe()}const s=new Set((u.posts||[]).map(d=>d.id)),a=[...u.posts||[]],i={...u.likes||{}},n={...u.comments||{}},o={...u.postShares||{}},r=Date.now();return Md.forEach(d=>{s.has(d.id)||(a.unshift({id:d.id,userId:d.userId,username:d.username,text:d.text,image:d.image||"",mediaType:d.mediaType||(d.image?"image":"text"),at:r-(d.atOffset||0),house:d.userId==="dbs"}),i[d.id]=[...d.likeUsers||[]],n[d.id]=(d.comments||[]).map(c=>({...c,text:c.text,at:r-(d.atOffset||0)+6e4})),d.shares&&(o[d.id]=d.shares))}),i.p1&&i.p1.length<3&&(i.p1=[...new Set([...i.p1||[],"maya","fanjay","u_seed_a"])]),i.p2&&i.p2.length<2&&(i.p2=[...new Set([...i.p2||[],"maya","fanjay"])]),(!n.p1||n.p1.length<2)&&(n.p1=[...n.p1||[],{id:"hc_p1a",userId:"maya",username:"MayaBeats",text:"Cover art goes crazy",at:r-8e7},{id:"hc_p1b",userId:"fanjay",username:"FanJay",text:"Been waiting on this",at:r-7e7}]),o.p1=Math.max(o.p1||0,2),o.p2=Math.max(o.p2||0,1),u={...u,posts:a,likes:i,comments:n,postShares:o,hotFeed:{...e,seededPosts:!0,seededPostsVer:2}},A(u),je(),Pe()}function $a(e){const t=u.likes&&u.likes[e]||[],s=u.comments&&u.comments[e]||[],a=u.postShares&&u.postShares[e]||0;return t.length+s.length+Number(a||0)}function je(){const e=Pe(),s=(u.posts||[]).map(r=>{const d=(u.likes&&u.likes[r.id]||[]).length,c=(u.comments&&u.comments[r.id]||[]).length,p=Number(u.postShares&&u.postShares[r.id]||0),m=d+c+p;return{id:r.id,postId:r.id,score:m,likes:d,comments:c,shares:p,username:r.username,userId:r.userId,preview:(r.text||"").slice(0,120),text:r.text||"",image:r.image||"",mediaType:r.mediaType||(r.image?"image":"text"),at:r.at||0,house:r.userId==="dbs"||!!r.house}}).filter(r=>r.score>=Dd).sort((r,d)=>d.score-r.score||d.at-r.at).slice(0,Ld),a=new Set((e.posts||[]).map(r=>r.postId||r.id)),i=Array.isArray(u.engagementAlerts)?[...u.engagementAlerts]:[],n=new Set(i.filter(r=>r.kind==="post").map(r=>r.refId));s.forEach(r=>{n.has(r.id)||a.has(r.id)&&e.posts.length||(i.unshift({id:"ea_post_"+r.id+"_"+Date.now().toString(36),kind:"post",refId:r.id,title:(r.preview||r.text||"Hot post").slice(0,80),username:r.username,score:r.score,mediaType:r.mediaType||"text",at:Date.now(),handledAt:null,handledNote:null}),n.add(r.id))});const o=i.slice(0,60);return u={...u,hotFeed:{lives:e.lives,seededLives:e.seededLives,posts:s,seededPosts:e.seededPosts||s.length>0,seededPostsVer:Number(e.seededPostsVer)||0},engagementAlerts:o},A(u),Pe()}function zr(e=8){return Ds(),Pe().posts.length||je(),(Pe().posts||[]).slice(0,Math.max(1,Number(e)||8))}function Wr(e){const t=String(e||"");if(!t)return{error:"missing"};if(!(u.posts||[]).find(i=>i.id===t))return{error:"missing"};const a={...u.postShares||{}};return a[t]=Number(a[t]||0)+1,u={...u,postShares:a},A(u),je(),{ok:!0,shares:a[t],score:$a(t)}}function Pd(e){const t=e||{},s=t.kind==="live"?"live":"post",a=String(t.refId||t.id||"");if(!a)return{error:"missing"};const i=Array.isArray(u.engagementAlerts)?[...u.engagementAlerts]:[],n=i.find(r=>r.kind===s&&r.refId===a&&!r.handledAt);if(n)return{ok:!0,alert:n,deduped:!0};const o={id:t.id||"ea_"+s+"_"+a+"_"+Date.now().toString(36),kind:s,refId:a,title:String(t.title||"Hot item").slice(0,120),username:String(t.username||""),score:Number(t.score)||0,viewers:t.viewers!=null?Number(t.viewers):void 0,gifts:t.gifts!=null?Number(t.gifts):void 0,mediaType:t.mediaType||(s==="live"?"live":"text"),at:t.at||Date.now(),handledAt:t.handledAt||null,handledNote:t.handledNote||null};return u={...u,engagementAlerts:[o,...i].slice(0,60)},A(u),{ok:!0,alert:o}}function nn({openOnly:e=!0}={}){const t=Array.isArray(u.engagementAlerts)?u.engagementAlerts:[];return(e?t.filter(a=>!a.handledAt):t.slice()).sort((a,i)=>(i.at||0)-(a.at||0))}function Is(e,t){const s=String(e||"");if(!s)return{error:"missing"};const a=Array.isArray(u.engagementAlerts)?u.engagementAlerts:[];let i=null;const n=a.map(o=>o.id!==s?o:(i={...o,handledAt:Date.now(),handledNote:t!=null?String(t):o.handledNote||"handled"},i));return i?(u={...u,engagementAlerts:n},A(u),{ok:!0,alert:i}):{error:"missing"}}function _d(e){if(!ae())return{error:"admin"};const t=u.user;if(!t)return{error:"signin"};const s=String(e||""),a=new Set(u.likes&&u.likes[s]||[]);return a.add(t.id),u={...u,likes:{...u.likes,[s]:[...a]}},A(u),je(),{ok:!0,count:a.size,score:$a(s)}}function Od(e,t){if(!ae())return{error:"admin"};const s=u.user;if(!s)return{error:"signin"};const a=String(e||""),i=t.trim();if(!i)return{error:"empty"};const n={id:"c_admin_"+Date.now().toString(36),userId:s.id,username:s.username,text:i,at:Date.now(),admin:!0},o=u.comments&&u.comments[a]||[];return u={...u,comments:{...u.comments,[a]:[...o,n]}},A(u),je(),{ok:!0,comment:n,score:$a(a)}}function qd(e){if(!ae())return{error:"admin"};const t=Wr(e);return t.error?t:{ok:!0,shares:t.shares,link:"#/posts",score:t.score}}function Ci(e,t){return Math.max(0,Number(e)||0)+Math.max(0,Number(t)||0)*20}function Ti(e){if(!e||typeof e!="object")return null;const t=String(e.id||e.liveId||"");if(!t)return null;const s=String(e.hostId||e.userId||""),a=String(e.hostName||e.username||e.handle||"Creator"),i=Math.max(0,Number(e.viewers)||0),n=Math.max(0,Number(e.giftsTotal??e.gifts)||0),o=e.score!=null&&Number.isFinite(Number(e.score))?Number(e.score):Ci(i,n);return{id:t,hostId:s,hostName:a,title:String(e.title||"Live"),viewers:i,giftsTotal:n,house:!!e.house,spikedAt:e.spikedAt||null,score:o}}function Yr({force:e=!1}={}){const t=Pe();if(t.seededLives&&!e&&(t.lives||[]).length>0)return{skipped:!0,lives:t.lives.map(Ti).filter(Boolean)};const s=[{id:"hl_dbs_house",hostId:"dbs",hostName:"DatBoiSkeet",title:"DBS Live · Listening Session",viewers:8420,giftsTotal:186,house:!0},{id:"hl_dbs_vault",hostId:"dbs",hostName:"DatBoiSkeet",title:"Vault Drop Afterparty · House",viewers:3210,giftsTotal:94,house:!0},{id:"hl_skeetfan",hostId:"u_skeetfanatl",hostName:"SkeetFanATL",title:"ATL reacts · Long Story Short",viewers:1540,giftsTotal:42,house:!1},{id:"hl_vaultwatch",hostId:"u_vaultwatcher",hostName:"VaultWatcher",title:"Vault deep cut night",viewers:980,giftsTotal:61,house:!1},{id:"hl_fxclip",hostId:"u_fxclipper",hostName:"FXClipper",title:"Foreign X-Change clips live",viewers:2210,giftsTotal:28,house:!1},{id:"hl_nightowl",hostId:"u_nightowldbs",hostName:"NightOwlDBS",title:"Late night lounge · chill",viewers:412,giftsTotal:15,house:!1},{id:"hl_longstory",hostId:"u_longstorylistener",hostName:"LongStoryListener",title:"LSS theory hour",viewers:128,giftsTotal:7,house:!1},{id:"hl_ladies",hostId:"u_ladiesonlyfan",hostName:"LadiesOnlyFan",title:"Ladies Only countdown",viewers:67,giftsTotal:3,house:!1}].map(a=>({...a,spikedAt:null,score:Ci(a.viewers,a.giftsTotal)}));return Hr({...t,lives:s,seededLives:!0}),{ok:!0,lives:s}}function Jt(){return Yr(),(Pe().lives||[]).map(Ti).filter(Boolean).sort((t,s)=>(s.score||0)-(t.score||0)||(s.viewers||0)-(t.viewers||0))}function Nd(e){const t=String(e||"");if(!t)return{error:"missing"};Yr();const s=Pe();let a=null;const i=(s.lives||[]).map(o=>{const r=Ti(o);if(!r||r.id!==t)return o;const d=180+Math.floor(Math.random()*920),c=4+Math.floor(Math.random()*28),p=r.viewers+d,m=r.giftsTotal+c,g=Ci(p,m);return a={...r,viewers:p,giftsTotal:m,score:g,spikedAt:Date.now()},a});if(!a)return{error:"missing"};Hr({...s,lives:i,seededLives:!0});const n=Pd({kind:"live",refId:a.id,title:a.title,username:a.hostName,score:a.score,viewers:a.viewers,gifts:a.giftsTotal});return{ok:!0,live:a,alert:(n==null?void 0:n.alert)||null,deduped:!!(n!=null&&n.deduped)}}function Bd(){return Jt().filter(s=>s&&!s.house).sort((s,a)=>(a.score||0)-(s.score||0)||(a.viewers||0)-(s.viewers||0)).slice(0,6).map(s=>({id:s.id,hostId:s.hostId,hostName:s.hostName,title:s.title,viewers:s.viewers,giftsTotal:s.giftsTotal,house:!!s.house,score:s.score,spikedAt:s.spikedAt||null,playbacksToday:s.playbacksToday!=null?s.playbacksToday:Math.max(1,Math.round((s.viewers||0)/40))}))}function Jr(){const e=new Date().toISOString().slice(0,10),s=(St({publishedOnly:!0,types:["song"]})||[]).map(i=>{const n=Number(i.playsToday)||Number(i.playCount)||Number(i.plays)||0;let o="";return i.coverRef&&!String(i.coverRef).startsWith("idb:")&&(o=i.coverRef),{id:i.id,title:i.title||"Untitled",artist:i.artist||"DatBoiSkeet",cover:o,playsToday:n,href:"#/music",demo:!1,day:e,status:i.status||(i.published?"Published":"Catalog")}}).filter(i=>i.playsToday>0).sort((i,n)=>n.playsToday-i.playsToday||String(i.title).localeCompare(String(n.title)));return s[0]?s[0]:{id:"demo_most_played_lss",title:"Long Story Short",artist:"DatBoiSkeet",cover:"/music/01_Long_Story_Short_Coming_Soon.jpg",playsToday:900+e.split("-").reduce((i,n)=>i+Number(n),0)%400,href:"#/music",demo:!0,day:e,status:"Coming Soon"}}const rn="https://www.youtube.com/iframe_api";let X=[],ce=0,B=null,Ps=!1,_e=!1,ct=!1;const Z=new Set;let on=!1;function Ye(e){if(!e)return"";try{const t=new URL(e);if(t.hostname.includes("youtu.be"))return t.pathname.slice(1).split("/")[0]||"";const s=t.searchParams.get("v");if(s)return s;const a=t.pathname.match(/\/embed\/([^/?]+)/);if(a)return a[1]==="videoseries"?"":a[1]}catch{}return""}function ln(e){if(!e)return"";try{return new URL(e).searchParams.get("list")||""}catch{return""}}function qt(e){return e?`https://i.ytimg.com/vi/${e}/hqdefault.jpg`:""}function Rd(){var n,o;const e=[],t=new Set,s=new Set,a=r=>{if(r.playlistId){if(s.has(r.playlistId))return;s.add(r.playlistId)}else if(r.youtubeId){if(t.has(r.youtubeId))return;t.add(r.youtubeId)}else return;e.push(r)};for(const r of yt){const d=((n=r.links)==null?void 0:n.youtube)||"",c=Ye(d)||Ye(((o=r.links)==null?void 0:o.youtubeMusic)||"");c&&a({id:r.id,title:r.title,artist:r.artist||"DatBoiSkeet",cover:r.cover||qt(c),youtubeId:c,youtube:d||`https://www.youtube.com/watch?v=${c}`,embed:`https://www.youtube.com/embed/${c}`,links:{...r.links||{},youtube:d||`https://www.youtube.com/watch?v=${c}`},kind:"track"})}for(const r of ni){const d=ln(r.youtube)||ln(r.embed);d&&a({id:r.id,title:r.title,artist:"DatBoiSkeet",cover:qt("DTe4OiX2otg")||"/brand/logo-dbs-v3@2x.webp",playlistId:d,youtube:r.youtube,embed:r.embed||`https://www.youtube.com/embed/videoseries?list=${d}`,links:{youtube:r.youtube,youtubeMusic:me.youtubeMusic,spotify:me.spotify,apple:me.apple},kind:"mix"})}const i=new Set(["Music Videos"]);for(const r of fe){if(!i.has(r.category||"Music Videos")||!r.featured&&!["dirty-money","93","no-love","bouquet","where-im-from","go-2-work"].includes(r.id)&&!r.featured)continue;const d=Ye(r.youtube)||Ye(r.embed);if(!d||t.has(d))continue;const c=yt.find(p=>{var m;return Ye(((m=p.links)==null?void 0:m.youtube)||"")===d});a({id:r.id,title:r.title,artist:r.artist||"DatBoiSkeet",cover:(c==null?void 0:c.cover)||qt(d),youtubeId:d,youtube:r.youtube,embed:r.embed||`https://www.youtube.com/embed/${d}`,links:{youtube:r.youtube,youtubeMusic:`https://music.youtube.com/watch?v=${d}`,...(c==null?void 0:c.links)||{}},kind:"mv"})}return X=e,ce>=X.length&&(ce=0),X}function ze(e){return String(e||"").toLowerCase().replace(/\(.*?\)/g,"").replace(/[^a-z0-9]+/g," ").trim()}function Qr(){var a,i;const e=Jr();if(!e)return{item:null,meta:null,playable:!1};const t=ze(e.title),s=X.find(n=>ze(n.title)===t||ze(n.title).includes(t)||t.includes(ze(n.title)));if(s&&(s.youtubeId||s.playlistId))return{item:{...s},meta:e,playable:!0};for(const n of yt){if(ze(n.title)!==t&&!ze(n.title).startsWith(t)&&!t.startsWith(ze(n.title)))continue;const o=((a=n.links)==null?void 0:a.youtube)||"",r=Ye(o)||Ye(((i=n.links)==null?void 0:i.youtubeMusic)||"");return r?{item:{id:n.id,title:n.title,artist:n.artist||"DatBoiSkeet",cover:n.cover||qt(r),youtubeId:r,youtube:o||`https://www.youtube.com/watch?v=${r}`,embed:`https://www.youtube.com/embed/${r}`,links:{...n.links||{},youtube:o||`https://www.youtube.com/watch?v=${r}`},kind:"track"},meta:e,playable:!0}:{item:{id:n.id,title:n.title,artist:n.artist||"DatBoiSkeet",cover:n.cover||e.cover||"",youtube:o||me.youtube,embed:"",links:{...n.links||{}},kind:"track"},meta:e,playable:!1}}for(const n of fe){if(ze(n.title)!==t&&!ze(n.title).includes(t))continue;const o=Ye(n.youtube)||Ye(n.embed);if(o)return{item:{id:n.id,title:n.title,artist:n.artist||"DatBoiSkeet",cover:qt(o),youtubeId:o,youtube:n.youtube,embed:n.embed||`https://www.youtube.com/embed/${o}`,links:{youtube:n.youtube,youtubeMusic:`https://music.youtube.com/watch?v=${o}`},kind:"mv"},meta:e,playable:!0}}return{item:{id:e.id||"most-played",title:e.title||"Most played",artist:e.artist||"DatBoiSkeet",cover:e.cover||"",youtube:"",embed:"",links:{spotify:me.spotify,apple:me.apple,youtubeMusic:me.youtubeMusic,youtube:me.youtube},kind:"track"},meta:e,playable:!1}}function Xr(){const e=document.getElementById("spPlayNextMost"),t=document.getElementById("spPlayNextSub"),{meta:s,playable:a}=Qr();if(e){if(!s){e.hidden=!0;return}if(e.hidden=!1,e.dataset.playable=a?"1":"0",e.dataset.demo=s.demo?"1":"0",e.title=a?`Most played today · ${s.title} → Play next`:`Most played today · ${s.title} (Coming Soon / open platform)`,e.setAttribute("aria-label",`Play next — ${s.title}`),t){const i=s.demo?"DEMO · ":"";t.textContent=`${i}Most played today · ${s.title}`}}}function cn(e){if(!e)return-1;if(!X.length)return X.push(e),ce=0,0;let t=X.findIndex(a=>e.youtubeId&&a.youtubeId===e.youtubeId||e.playlistId&&a.playlistId===e.playlistId||a.id===e.id);if(t===ce)return ce;if(t>=0){const[a]=X.splice(t,1);t<ce&&(ce-=1),e=a}const s=Math.min(ce+1,X.length);return X.splice(s,0,e),s}function jd(){var n,o,r,d;const{item:e,meta:t,playable:s}=Qr();if(!t||!e){h("No most-played track yet");return}if(!s){const c=document.getElementById("spOpen"),p=((n=e.links)==null?void 0:n.apple)||((o=e.links)==null?void 0:o.youtubeMusic)||((r=e.links)==null?void 0:r.spotify)||((d=e.links)==null?void 0:d.youtube)||me.apple;c&&p&&(c.href=p),h(t.demo||t.status==="Coming Soon"?`${t.title} · Coming Soon — no in-app master. Open Music / Stream Everywhere when it drops.`:`${t.title} — open official platform (not in-app audio)`),Xr();return}if(Di()||!!ct&&_e&&Z.size===0||Z.size>0){const c=cn(e);h(c===ce?`Already playing · ${e.title}`:`Queued next · ${e.title}`),be();return}let i=X.findIndex(c=>e.youtubeId&&c.youtubeId===e.youtubeId||e.playlistId&&c.playlistId===e.playlistId||c.id===e.id);i<0&&(i=cn(e)),io(i),h(`Playing · ${e.title}`)}const Xt=[];function Zr(){var e;return(e=window.YT)!=null&&e.Player?Promise.resolve(window.YT):new Promise(t=>{var a;if(Xt.push(t),Ps)return;Ps=!0;const s=window.onYouTubeIframeAPIReady;if(window.onYouTubeIframeAPIReady=()=>{Ps=!1;try{s==null||s()}catch{}const i=window.YT;for(;Xt.length;)try{Xt.shift()(i)}catch{}Bt()},document.querySelector(`script[src="${rn}"]`)){if((a=window.YT)!=null&&a.Player){Ps=!1;const i=window.YT;for(;Xt.length;)try{Xt.shift()(i)}catch{}Bt()}}else{const i=document.createElement("script");i.src=rn,i.async=!0,document.head.appendChild(i)}})}function eo(){Zr().then(()=>Bt()).catch(()=>{})}function Bt(){var n;if(!(document.getElementById("dbsStickyFrame")||document.getElementById("dbsYtHost"))||!((n=window.YT)!=null&&n.Player)||B)return;const t=X[ce],s={autoplay:0,controls:0,rel:0,modestbranding:1,playsinline:1,enablejsapi:1,origin:location.origin},a={height:"1",width:"1",playerVars:s,events:{onReady:()=>{be()},onStateChange:o=>{o.data===0&&ao({auto:!0}),be()},onError:()=>{h("YouTube embed error — Open on YouTube"),be()}}};t!=null&&t.playlistId?a.playerVars={...s,listType:"playlist",list:t.playlistId}:t!=null&&t.youtubeId?a.videoId=t.youtubeId:a.videoId="DTe4OiX2otg";const i=document.getElementById("dbsStickyFrame")?"dbsStickyFrame":"dbsYtHost";B=new window.YT.Player(i,a)}function ws({autoplay:e}={autoplay:!1}){const t=X[ce];if(!t||!(B!=null&&B.cueVideoById)){Bt();return}try{t.playlistId?(typeof B.loadPlaylist=="function"?B.loadPlaylist({list:t.playlistId,listType:"playlist",index:0}):typeof B.cuePlaylist=="function"&&B.cuePlaylist({list:t.playlistId,listType:"playlist",index:0}),e&&_e&&Z.size===0&&setTimeout(()=>{try{B.playVideo()}catch{}},250)):t.youtubeId&&(e&&_e&&Z.size===0?B.loadVideoById(t.youtubeId):B.cueVideoById(t.youtubeId))}catch{}be()}function Di(){var e;try{return((e=B==null?void 0:B.getPlayerState)==null?void 0:e.call(B))===1}catch{return!1}}function be(){var p,m,g;const e=X[ce],t=document.getElementById("spArt"),s=document.getElementById("spTitle"),a=document.getElementById("spSub"),i=document.getElementById("spPlay"),n=document.getElementById("spOpen"),o=document.getElementById("spSource"),r=Z.size>0,d=!r&&(ct||Di());if(t&&e&&(t.src=e.cover||qt(e.youtubeId||"")||"/brand/logo-dbs-v3@2x.webp",t.alt=e.title||""),s&&(s.textContent=(e==null?void 0:e.title)||"PIKK Music"),a&&(_e?r?a.textContent=`Paused · ${[...Z][0]} interrupt`:a.textContent=`${(e==null?void 0:e.artist)||"DatBoiSkeet"} · via YouTube (not Spotify in-app)`:a.textContent="Tap Play · YouTube embed · Stream Everywhere"),i&&(i.textContent=d?"❚❚":"▶",i.setAttribute("aria-label",d?"Pause":"Play PIKK Music"),i.dataset.playing=d?"1":"0"),n&&e){const f=((p=e.links)==null?void 0:p.apple)||((m=e.links)==null?void 0:m.youtubeMusic)||((g=e.links)==null?void 0:g.spotify)||e.youtube||me.apple;n.href=f,n.title="Open on official platform"}o&&(o.textContent=(e==null?void 0:e.kind)==="mix"?"YT Mix":(e==null?void 0:e.kind)==="mv"?"YT MV":"YouTube");const c=document.getElementById("spBadge");c&&(c.textContent=r?"INTERRUPTED":_e&&d?"PLAYING · YT":"TEST · YT EMBED"),Xr()}function Fd(){var e;if(Z.size>0){h("Paused for "+[...Z][0]+" — resume when done"),be();return}_e=!0,ct=!0,eo(),Bt();try{if(B!=null&&B.playVideo){const t=(e=B.getPlayerState)==null?void 0:e.call(B);t===-1||t===5||t===void 0?ws({autoplay:!0}):B.playVideo()}else{const t=setInterval(()=>{B!=null&&B.playVideo&&(clearInterval(t),ws({autoplay:!0}))},120);setTimeout(()=>clearInterval(t),8e3)}}catch{h("Tap Play PIKK Music again if autoplay blocked")}be()}function Kd({clearDesire:e}={}){var t;e&&(ct=!1);try{(t=B==null?void 0:B.pauseVideo)==null||t.call(B)}catch{}be()}function Ls(e="user"){e&&e!=="user"&&Z.add(e),Kd({clearDesire:e==="user"}),be()}function to(e){var t;if(e?Z.delete(e):Z.clear(),Z.size===0&&_e&&ct)try{(t=B==null?void 0:B.playVideo)==null||t.call(B)}catch{}be()}function sa(e){return to(e)}function Rt(){Ls("video")}function Ma(){Ls("live")}function so(){sa("live")}function Qe(){sa("video")}function ao({auto:e}={}){X.length&&(ce=(ce+1)%X.length,ct=!0,e||(_e=!0),ws({autoplay:_e&&Z.size===0}),be())}function Gd(){X.length&&(ce=(ce-1+X.length)%X.length,_e=!0,ct=!0,ws({autoplay:Z.size===0}),be())}function io(e){e<0||e>=X.length||(ce=e,_e=!0,Z.clear(),ct=!0,ws({autoplay:!0}),be())}function Vd(){var e,t,s,a,i,n;on||(on=!0,(e=document.getElementById("spPlay"))==null||e.addEventListener("click",()=>{Z.size>0&&Z.clear(),Di()?Ls("user"):Fd()}),(t=document.getElementById("spPrev"))==null||t.addEventListener("click",()=>{Z.clear(),Gd()}),(s=document.getElementById("spNext"))==null||s.addEventListener("click",()=>{Z.clear(),ao()}),(a=document.getElementById("spOpen"))==null||a.addEventListener("click",o=>{h("Opening external music service (playback depends on provider)")}),(i=document.getElementById("spPlayNextMost"))==null||i.addEventListener("click",()=>{jd()}),(n=document.getElementById("spQueueBtn"))==null||n.addEventListener("click",()=>{const o=document.getElementById("spQueuePanel");if(!o)return;o.hasAttribute("hidden")?(o.removeAttribute("hidden"),o.innerHTML=X.map((d,c)=>`<button type="button" class="sp-q-item${c===ce?" on":""}" data-i="${c}">
              <img src="${d.cover||""}" alt="" width="36" height="36" />
              <span><b>${dn(d.title)}</b><small>${dn(d.artist)} · ${d.kind}</small></span>
            </button>`).join(""),o.querySelectorAll(".sp-q-item").forEach(d=>{d.addEventListener("click",()=>{io(Number(d.dataset.i)),o.setAttribute("hidden","")})})):o.setAttribute("hidden","")}),document.addEventListener("click",o=>{const r=document.getElementById("spQueuePanel");!r||r.hasAttribute("hidden")||!o.target.closest("#spQueuePanel")&&!o.target.closest("#spQueueBtn")&&r.setAttribute("hidden","")}))}function dn(e){return String(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}let pn=!1;function Ud(){pn||(pn=!0,window.addEventListener("dbs:interrupt-music",e=>{var s;const t=((s=e==null?void 0:e.detail)==null?void 0:s.reason)||"user";Ls(t)}))}function Hd(){Rd(),Vd(),Ud(),be(),eo(),setTimeout(()=>Bt(),400)}function zd(e){var a,i;const t=e==="/live",s=e==="/videos"||e==="/home"||e==="/music"||e==="/vault";!t&&Z.has("live")&&sa("live");for(const[n,o]of[...oe.entries()])if(!document.getElementById(n)){o.playing&&(Be=Math.max(0,Be-1));try{(i=(a=o.player)==null?void 0:a.destroy)==null||i.call(a)}catch{}oe.delete(n)}Be===0&&!s&&Z.has("video")&&sa("video"),be()}const oe=new Map;let Be=0,un=0;function Ja(e){var s;if(!e||!(e instanceof Element))return!0;const t=e.id||"";return!!(t==="dbsStickyFrame"||t==="dbsYtHost"||(s=e.closest)!=null&&s.call(e,"#dbs-sticky-player, #stickyPlayer, #dbsStickyFrame, #dbsYtHost"))}function Li(e){return e?/youtube\.com\/embed|youtube-nocookie\.com\/embed|youtu\.be\//.test(e):!1}function Wd(e){let t=e.getAttribute("src")||e.src||"";if(!Li(t))return!1;let s=!1;return/[?&]enablejsapi=1(?:&|$)/.test(t)||(t+=(t.includes("?")?"&":"?")+"enablejsapi=1",s=!0),/[?&]origin=/.test(t)||(t+=(t.includes("?")?"&":"?")+"origin="+encodeURIComponent(location.origin),s=!0),s&&(e.setAttribute("src",t),e.src=t),!0}function Yd(e){if(e.id&&!oe.has(e.id)&&e.id!=="dbsStickyFrame"&&e.id!=="dbsYtHost"||e.id&&oe.has(e.id))return e.id;un+=1;const t=`dbs-page-yt-${un}`;return e.id=t,t}function Jd(e,t){const s=oe.get(e);s&&(t.data===1?(s.playing||(s.playing=!0,Be+=1),Rt()):(t.data===0||t.data===2)&&(s.playing&&(s.playing=!1,Be=Math.max(0,Be-1)),Be===0&&Qe()))}function no(e){var n,o;const t=typeof e=="string"?document.getElementById(e):e;if(!t||Ja(t))return Promise.resolve(null);let s=t;if(t.tagName!=="IFRAME"&&(s=((n=t.querySelector)==null?void 0:n.call(t,"iframe"))||t),!s||s.tagName!=="IFRAME"||Ja(s))return Promise.resolve(null);const a=s.getAttribute("src")||s.src||"";if(!Li(a)||!Wd(s))return Promise.resolve(null);const i=Yd(s);return oe.has(i)&&((o=oe.get(i))!=null&&o.player)?Promise.resolve(oe.get(i).player):Zr().then(()=>new Promise(r=>{var m;if(oe.has(i)&&((m=oe.get(i))!=null&&m.player)){r(oe.get(i).player);return}const d=()=>{var g;if(!document.getElementById(i)){r(null);return}if(oe.has(i)&&((g=oe.get(i))!=null&&g.player)){r(oe.get(i).player);return}try{const f=new window.YT.Player(i,{events:{onReady:()=>{},onStateChange:b=>Jd(i,b),onError:()=>{}}});oe.set(i,{player:f,el:s,playing:!1}),s.dataset.dbsYtBound="1",r(f)}catch(f){console.warn("[dbs] bindYoutubeInterrupt failed",i,f),r(null)}};if(s.dataset.dbsYtBound==="1"&&oe.has(i)){r(oe.get(i).player);return}let c=!1;const p=()=>{c||(c=!0,d())};s.addEventListener("load",p,{once:!0}),setTimeout(p,400)}))}function xa(e){const s=[...(e&&e.querySelectorAll?e:document).querySelectorAll("iframe")].filter(a=>{if(Ja(a))return!1;const i=a.getAttribute("src")||a.src||"";return Li(i)});return Promise.all(s.map(a=>no(a)))}function Qd(e){var i,n;const t=typeof e=="string"?document.getElementById(e):e,s=typeof e=="string"?e:t==null?void 0:t.id;if(!s||s==="dbsStickyFrame"||s==="dbsYtHost")return;const a=oe.get(s);if(a){a.playing&&(a.playing=!1,Be=Math.max(0,Be-1),Be===0&&Qe());try{(n=(i=a.player)==null?void 0:i.destroy)==null||n.call(i)}catch{}oe.delete(s)}}const aa=new Set;function Ve(){const e=(location.hash||"").replace(/^#/,"")||"/home";let t="",s=e;const a=e.indexOf("#");a>=0&&(t=e.slice(a+1).split("?")[0],s=e.slice(0,a));const i=s.startsWith("/")?s:"/"+s,n=i.indexOf("?"),o=n===-1?i:i.slice(0,n),r=n===-1?"":i.slice(n+1),d=o.split("/").filter(Boolean);return{path:"/"+(d[0]||"home"),parts:d,query:Object.fromEntries(new URLSearchParams(r)),elementId:t,raw:i}}function j(e){const s=(e.startsWith("#")?e:"#"+(e.startsWith("/")?e:"/"+e)).replace(/^#/,"");if((location.hash||"").replace(/^#/,"")===s){aa.forEach(i=>i(Ve()));return}location.hash=s}function Xd(e){return aa.add(e),()=>aa.delete(e)}function Zd(){const e=()=>aa.forEach(t=>t(Ve()));window.addEventListener("hashchange",e),location.hash?e():location.hash="/home"}const Ia="/pikk-app/",Mt=Ia.endsWith("/")?Ia.slice(0,-1):Ia;function It(e){if(e==null||e==="")return e;const t=String(e);return/^(https?:|data:|blob:|idb:|#|\/\/)/i.test(t)||Mt&&(t===Mt||t.startsWith(Mt+"/"))?t:t.startsWith("/")?Mt+t:(Mt||"")+"/"+t}function ro(e=document){Mt&&(e.querySelectorAll("[src]").forEach(t=>{const s=t.getAttribute("src");if(!s)return;const a=It(s);a!==s&&t.setAttribute("src",a)}),e.querySelectorAll("[srcset]").forEach(t=>{const s=t.getAttribute("srcset");if(!s||!s.includes("/"))return;const a=s.replace(/(^|,\s*)(\/(?!\/)[^\s,]+)/g,(i,n,o)=>n+It(o));a!==s&&t.setAttribute("srcset",a)}),e.querySelectorAll("[data-zoom]").forEach(t=>{const s=t.getAttribute("data-zoom");if(!s)return;const a=It(s);a!==s&&t.setAttribute("data-zoom",a)}),e.querySelectorAll("[poster]").forEach(t=>{const s=t.getAttribute("poster");if(!s)return;const a=It(s);a!==s&&t.setAttribute("poster",a)}))}function oo(e,t){e&&e.querySelectorAll("a[data-path]").forEach(s=>{const a=s.getAttribute("data-path")===t;s.classList.toggle("on",a),a?s.setAttribute("aria-current","page"):s.removeAttribute("aria-current")})}function ep(e,t){var i,n,o;const s=(o=(n=(i=t==null?void 0:t.querySelector)==null?void 0:i.call(t,"h1"))==null?void 0:n.textContent)==null?void 0:o.replace(/\s+/g," ").trim();return s?s.slice(0,80):(String((e==null?void 0:e.path)||"/home").split("/").filter(Boolean).pop()||"home").replace(/[-_]+/g," ").replace(/\b\w/g,r=>r.toUpperCase())}function tp(e,t,s,a=document){const i=ep(e,t);return a.title=`${i} | PIKK`,s&&(s.textContent=`${i} page loaded`),i}function sp({drawer:e,scrim:t,trigger:s},a,i=!1){var o;if(!e||!t||!s)return;const n=!!a;e.classList.toggle("open",n),e.setAttribute("aria-hidden",String(!n)),e.inert=!n,t.classList.toggle("show",n),s.setAttribute("aria-expanded",String(n)),s.setAttribute("aria-label",n?"Close navigation menu":"Open navigation menu"),n?(o=e.querySelector("button, a[href]"))==null||o.focus():i&&s.focus()}const ap=Object.freeze([{label:"Songs",href:"#/music?view=songs",detail:"Browse released singles",icon:"♫"},{label:"Albums",href:"#/music?view=albums",detail:"Browse released albums",icon:"▣"},{label:"Beats",href:"#/music?view=beats",detail:"Beat marketplace not yet available",icon:"◉"},{label:"Playlists",href:"#/music?view=playlists",detail:"Verified YouTube playlists",icon:"▤"},{label:"Upload Music",href:"#/music?view=upload",detail:"Creator uploads coming later",icon:"⇧"}]),ip=Object.freeze({Songs:"music",Albums:"music",Beats:"music",Playlists:"videos","Upload Music":"music"});function os(e=!1){const t=document.getElementById("pikkMusicMenu");if(!t||t.hidden)return;t.hidden=!0;const s=document.querySelector('#tabbar a[href="#/music"]');s==null||s.setAttribute("aria-expanded","false"),e&&(s==null||s.focus())}function np(){let e=document.getElementById("pikkMusicMenu");return e||(e=document.createElement("div"),e.id="pikkMusicMenu",e.className="pikk-create-overlay",e.hidden=!0,e.innerHTML=`<div class="pikk-create-sheet" role="dialog" aria-modal="true" aria-labelledby="pikkMusicMenuTitle">
    <div class="pikk-create-head"><strong id="pikkMusicMenuTitle">Music on PIKK</strong><button type="button" class="btn ghost" data-music-close aria-label="Close music menu">✕</button></div>
    <div class="pikk-create-options pikk-create-grid">
      ${ap.map(t=>`<a class="pikk-create-tile" href="${t.href}"><span class="pikk-menu-icon" aria-hidden="true">${gs[ip[t.label]||"music"]}</span><strong class="pikk-menu-title">${t.label}</strong><small>${t.detail}</small></a>`).join("")}
    </div>
    <button type="button" class="pikk-menu-cancel" data-music-close>Cancel</button>
    <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · Beat selling and music uploads are not available yet</p>
  </div>`,document.body.appendChild(e),window.addEventListener("hashchange",()=>os()),e.addEventListener("click",t=>{t.target===e||t.target.closest("[data-music-close]")?os(!0):t.target.closest(".pikk-create-options a")&&os()}),document.addEventListener("keydown",t=>{if(e.hidden||(t.key==="Escape"&&(t.preventDefault(),os(!0)),t.key!=="Tab"))return;const s=[...e.querySelectorAll("a[href], button:not([disabled])")],a=s[0],i=s[s.length-1];if(!a){t.preventDefault();return}e.contains(document.activeElement)?t.shiftKey&&document.activeElement===a?(t.preventDefault(),i.focus()):!t.shiftKey&&document.activeElement===i&&(t.preventDefault(),a.focus()):(t.preventDefault(),(t.shiftKey?i:a).focus())}),e)}function rp(e){var i,n;const t=np(),s=t.hidden,a=document.getElementById("pikkCreateMenu");s&&a&&!a.hidden&&(a.hidden=!0,(i=document.querySelector('#tabbar a[href="#/create"]'))==null||i.setAttribute("aria-expanded","false")),t.hidden=!s,e==null||e.setAttribute("aria-expanded",String(s)),s?(n=t.querySelector("[data-music-close]"))==null||n.focus():e==null||e.focus()}const op="dbs_media_v1",jt="blobs",lp=1;function lo(){return new Promise((e,t)=>{const s=indexedDB.open(op,lp);s.onupgradeneeded=()=>{const a=s.result;a.objectStoreNames.contains(jt)||a.createObjectStore(jt,{keyPath:"id"})},s.onsuccess=()=>e(s.result),s.onerror=()=>t(s.error||new Error("idb open failed"))})}async function cp(e,t,s={}){const a=await lo();return new Promise((i,n)=>{const o=a.transaction(jt,"readwrite");o.objectStore(jt).put({id:e,blob:t,mime:t.type||s.mime||"application/octet-stream",name:s.name||"",size:t.size||0,at:Date.now()}),o.oncomplete=()=>i(e),o.onerror=()=>n(o.error)})}async function dp(e){const t=await lo();return new Promise((s,a)=>{const n=t.transaction(jt,"readonly").objectStore(jt).get(e);n.onsuccess=()=>s(n.result||null),n.onerror=()=>a(n.error)})}const Pa=new Map;async function Ea(e){if(!e)return"";if(e.startsWith("idb:")){const t=e.slice(4);if(Pa.has(t))return Pa.get(t);const s=await dp(t);if(!(s!=null&&s.blob))return"";const a=URL.createObjectURL(s.blob);return Pa.set(t,a),a}return e}function pp(e="blob"){return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}const _a=Object.freeze([{tier:"spotlight",name:"Premium Spotlight",slots:1,day:199,week:999},{tier:"featured",name:"Featured Box",slots:2,day:99,week:499},{tier:"promo",name:"Promo Box",slots:3,day:49,week:249}]);function Oa(e,t){return`<article class="pikk-ad-slot pikk-ad-${e.tier}" data-promo-tier="${e.tier}" aria-label="${e.name} slot ${t}, pricing preview">
    <span class="pikk-ad-slot-top"><span class="pikk-ad-slot-icon" aria-hidden="true">▶</span><span class="pikk-ad-slot-number">0${t}</span></span>
    <strong>${e.name}</strong>
    <span class="pikk-ad-slot-description">Available placement · booking coming soon</span>
    <span class="pikk-ad-slot-prices"><b>$${e.day}</b><small>/ 24 hours</small></span>
    <span class="pikk-ad-slot-week">$${e.week} / 7 days</span>
  </article>`}function co(e){return`<div class="pikk-stories-promotions" data-featured-context="${e==="videos"?"videos":"home"}">
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
        <div class="pikk-featured-row pikk-featured-row-hero">${Oa(_a[0],1)}</div>
        <div class="pikk-featured-row pikk-featured-row-two">${[1,2].map(s=>Oa(_a[1],s)).join("")}</div>
        <div class="pikk-featured-row pikk-featured-row-three">${[1,2,3].map(s=>Oa(_a[2],s)).join("")}</div>
      </div>
      <p class="pikk-featured-footnote">Home and Videos placements are priced separately. Rates are introductory proposals; no paid placement or guaranteed views are currently offered.</p>
    </section>
  </div>`}const up={Explore:"🧭","Shorts / Clips":"▶",Music:"🎵",Videos:"🎬",Posts:"📸",Live:"🔴","PIKK Lounge":"💬",Vault:"🔐",Marketplace:"🛍️",Missions:"🎯"},ia=[{id:"toplive",label:"Top live"},{id:"videos",label:"Videos"},{id:"rising",label:"Rising"},{id:"hot",label:"Hot lives"},{id:"songs",label:"Songs"}],mp=8e3,Mi="dbs_home_stage_v2",hp=["dbs_home_stage"];function Ii(e){const t=Number(e)||0;return t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)}k`:String(t)}function _s(e){return e?!!(e.house||e.hostId==="dbs"||e.hostName==="DatBoiSkeet"):!1}function mn(e){return e?!!(e.house||e.userId==="dbs"||e.username==="DatBoiSkeet"):!1}function gp(e=3){const t=Jt(),s=t.filter(n=>!_s(n)),a=t.filter(n=>_s(n)),i=s.slice(0,Math.max(2,e-1));for(a[0]&&i.push(a[0]);i.length<e&&s[i.filter(n=>!_s(n)).length];){const n=s[i.filter(o=>!_s(o)).length];if(!n||i.includes(n))break;i.push(n)}return i.slice(0,e)}function fp(e=4){const t=zr(Math.max(8,e+4)),s=t.filter(n=>!mn(n)),a=t.filter(n=>mn(n)),i=[...s.slice(0,3)];a[0]&&i.push(a[0]);for(const n of s.slice(3)){if(i.length>=e)break;i.includes(n)||i.push(n)}for(const n of a.slice(1)){if(i.length>=e)break;i.includes(n)||i.push(n)}return i.slice(0,e)}function po(){const e=M().live,t=Jt().map(s=>({...s}));if(e&&!e.endedAt){const s=Math.max(0,Number(e.viewers)||0),a=Math.max(0,Number(e.giftsTotal)||0);t.push({id:e.id||"session",hostId:e.hostId,hostName:e.hostName||"Creator",title:e.title||"Live now",viewers:s,giftsTotal:a,score:s+a*20,house:e.hostId==="dbs"||e.hostName==="DatBoiSkeet"})}return t.sort((s,a)=>(Number(a.viewers)||0)-(Number(s.viewers)||0)||(Number(a.score)||0)-(Number(s.score)||0)),t[0]||null}function Vs(e,{rising:t=!1}={}){const s=e.house?"House":t?"Rising":"Hot",a=Number(e.viewers)||0,i=Ii(a),n=t&&e.playbacksToday!=null?` · ~${l(String(e.playbacksToday))} playbacks today`:"";return`
    <a class="home-live-card" href="#/live">
      <div class="live-hoodie" aria-hidden="false">
        <span class="live-hoodie-pill">LIVE</span>
        <span class="live-hoodie-viewers" title="${l(i)} watching">${l(i)}</span>
      </div>
      <div class="home-live-top">
        <span class="home-live-dot" aria-hidden="true"></span>
        <strong>@${l(e.hostName)}</strong>
        <span class="chip home-live-chip">${l(s)}</span>
      </div>
      <div class="home-live-title">${l(e.title||"Live now")}</div>
      <div class="home-live-stats muted">
        ${l(i)} watching · ${l(String(e.giftsTotal||0))} gifts
        ${n}
      </div>
      <div class="home-live-score muted">Score ${l(String(e.score||0))} · TEST MODE seed</div>
    </a>`}function vp(e){return e.mediaType==="video"?"Video":e.image||e.mediaType==="image"?"Pic":"Post"}function bp(e){if(!e)return"";const t=Number(e.playsToday)||0,s=t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)}k`:String(t),a=e.cover?`<img class="la-thumb" src="${l(e.cover)}" alt="" loading="lazy" />`:'<span class="la-thumb la-thumb-empty" aria-hidden="true">♪</span>',i=e.demo?" · DEMO seed":"";return`
    <li class="la-row la-song">
      <a class="la-main" href="#/music">
        ${a}
        <span class="la-body">
          <strong>${l(e.title||"Track")}</strong>
          <span class="la-preview">${l(e.artist||"DatBoiSkeet")} · ${l(s)} plays today${l(i)}</span>
          <span class="la-stats muted">${l(e.status||"Music")} · ${l(e.day||"today")}</span>
        </span>
      </a>
      <span class="chip la-chip-played">Most played · today</span>
    </li>`}function yp(e){const t=Number(e.viewers)||0,s=Ii(t),a=e.house?"House":"Hot";return`
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
      <span class="chip">${l(a)}</span>
    </li>`}function kp(e){const t=e.postId||e.id,s=vp(e),a=e.image?`<img class="la-thumb" src="${l(e.image)}" alt="" loading="lazy" />`:`<span class="la-thumb la-thumb-empty" aria-hidden="true">${l(((e.username||"?")[0]||"?").toUpperCase())}</span>`,i=e.house?" · house":"";return`
    <li class="la-row la-post">
      <a class="la-main" href="#/posts?focus=${l(t)}">
        ${a}
        <span class="la-body">
          <strong>@${l(e.username||"creator")}</strong>
          <span class="la-preview">${l((e.preview||e.text||"Hot post").slice(0,72))}</span>
          <span class="la-stats muted">♥ ${l(String(e.likes||0))} · 💬 ${l(String(e.comments||0))} · ↗ ${l(String(e.shares||0))} · score ${l(String(e.score||0))}${l(i)}</span>
        </span>
      </a>
      <span class="chip">${l(s)}</span>
    </li>`}function wp(e){const t=e.coverRef&&!String(e.coverRef).startsWith("idb:")?e.coverRef:"";return`
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
    </li>`}function Sp(){for(const e of hp){try{sessionStorage.removeItem(e)}catch{}try{localStorage.removeItem(e)}catch{}}try{localStorage.removeItem(Mi)}catch{}}function uo(){Sp();try{const e=sessionStorage.getItem(Mi);if(ia.some(t=>t.id===e))return e}catch{}return"toplive"}function $p(e){try{sessionStorage.setItem(Mi,e)}catch{}}function hn(e){return"$"+Number(e||0).toLocaleString(void 0,{maximumFractionDigits:2})}function xp(e){const t=Math.max(0,e-Date.now()),s=Math.floor(t/36e5),a=Math.floor(t%36e5/6e4);return t<=0?"Ended":`${s}h ${a}m left`}function mo(e){if(!e)return'<p class="muted" style="margin:0">No daily app goal right now.</p>';const t=Math.min(100,Math.round(e.raised/(e.targetAmount||1)*100));return`
    <div class="home-goal-head"><strong class="home-goal-name">${l(e.name)}</strong>
      <span class="chip home-goal-time" id="homeGoalTimeLeft">${xp(e.endsAt)}</span></div>
    <div class="home-goal-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${t}">
      <div class="home-goal-fill" style="width:${t}%"></div></div>
    <p class="muted home-goal-amounts" style="margin:6px 0 10px">${hn(e.raised)} raised of ${hn(e.targetAmount)} · ${t}%</p>
    <div class="row wrap" style="gap:8px">
      ${[50,100,250].map(s=>`<button type="button" class="btn ghost home-goal-donate" data-goal-id="${l(e.id)}" data-coins="${s}">Donate ${s} coins</button>`).join("")}
      <form class="home-goal-custom-form" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;align-items:end">
        <label style="flex:1;min-width:125px">Custom coins
          <input class="home-goal-custom-coins" type="number" inputmode="numeric" min="1" max="1000000" step="1" required placeholder="Enter coins" style="width:100%" />
        </label>
        <button type="submit" class="btn primary">Donate custom</button>
      </form>
    </div>`}function Ep(){const e=Ro.map(E=>`
    <a class="preview-card" href="#${E.route}${E.hash?"#"+E.hash:""}">
      <span class="pc-icon" aria-hidden="true">${up[E.title]||"◆"}</span>
      <strong>${l(E.title)}</strong>
      <span class="muted">${l(E.blurb)}</span>
    </a>`).join(""),t=_t.map(E=>`
    <a class="cover-card" href="#/music">
      <div class="cover-frame">
        <span class="badge-cs">${l(E.status)}</span>
        <img src="${l(E.cover)}" alt="${l(E.title)}" loading="lazy" />
      </div>
      <div class="t">${l(E.title)}</div>
      <div class="sub">${l(E.artist)}</div>
    </a>`).join(""),s=fe.filter(E=>(E.category||"Music Videos")==="Music Videos"),a=s.filter(E=>E.featured),i=a.length?a:s.slice(0,6),n=i[0]||s[0]||fe[0],o=ni[0],r=i.map(E=>`
    <div class="vid">
      <a class="thumb" href="${l(E.youtube)}" target="_blank" rel="noopener" aria-label="Play ${l(E.title)}"><span>▶</span></a>
      <div>
        <strong>${l(E.title)}</strong>
        <div class="muted" style="font-size:12px;margin-top:4px">
          <a href="${l(E.youtube)}" target="_blank" rel="noopener">Watch on YouTube</a>
          · <a href="#/videos">Embed on Videos</a>
        </div>
      </div>
    </div>`).join(""),d=i.map((E,De)=>`
    <button type="button" class="mv-pick${De===0?" on":""}" data-embed="${l(E.embed)}" data-title="${l(E.title)}" data-yt="${l(E.youtube)}">
      <span class="mv-pick-play" aria-hidden="true">▶</span>
      <span class="mv-pick-t">${l(E.title)}</span>
    </button>`).join(""),c=o?`<div class="card home-mix" id="home-dbs-mix">
        <h3>DatBoiSkeet Mix</h3>
        <p class="muted" style="margin:0 0 10px">Stream from the original YouTube Mix playlist — not rehosted.</p>
        <div class="hero-video" style="margin:0 0 10px">
          <iframe src="${l(Je(o.embed))}" title="${l(o.title)}" allowfullscreen loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
        </div>
        <div class="row wrap" style="gap:8px">
          <a class="btn" href="${l(o.youtube)}" target="_blank" rel="noopener">Play on YouTube</a>
          <a class="btn ghost" href="#/music#youtube-mixes">Music · Mixes</a>
          <a class="btn ghost" href="#/videos">All videos</a>
        </div>
      </div>`:"",m=St({publishedOnly:!0,types:["picture"]}).map(E=>`
    <div class="cover-card catalog-admin-home" data-id="${l(E.id)}">
      <div class="cover-frame">
        <span class="badge-cs">From Admin</span>
        <img data-idb-src="${l(E.coverRef&&E.coverRef.startsWith("idb:")?E.coverRef:"")}" src="${l(E.coverRef&&!E.coverRef.startsWith("idb:")?E.coverRef:"")}" alt="${l(E.title)}" loading="lazy" />
      </div>
      <div class="t">${l(E.title)}</div>
      <div class="sub">${l(E.artist)}</div>
    </div>`).join(""),f=St({publishedOnly:!0,types:["video"]}).slice(0,3).map(E=>`
    <div class="vid catalog-admin-home" data-id="${l(E.id)}">
      <a class="thumb" href="${l(E.youtube||"#/videos")}" ${E.youtube?'target="_blank" rel="noopener"':""}><span>▶</span></a>
      <div>
        <strong>${l(E.title)}</strong>
        <div class="muted" style="font-size:12px;margin-top:4px">${l(E.artist)} · Admin</div>
      </div>
    </div>`).join(""),b=M().live,y=b&&!b.endedAt?`<li class="la-row la-session"><a class="la-main" href="#/live"><span class="la-hoodie" aria-label="Live now"><span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span><span class="live-hoodie-viewers">${l(Ii(b.viewers||0))}</span></span><span class="la-body"><strong>@${l(b.hostName)}</strong><span class="la-preview">${l(b.title||"Live now")}</span><span class="la-stats muted">${l(String(b.viewers||0))} watching · your session</span></span></a><span class="chip">Live</span></li>`:"",v=Jr(),w=bp(v),$=gp(3),C=fp(4),k=St({publishedOnly:!0,types:["picture"]}).slice(0,2),P=$.map(yp).join(""),T=C.map(kp).join(""),R=k.map(wp).join(""),D=`${w}${y}${P}${T}${R}
        <li class="la-row la-kicker"><span class="la-main la-kicker-main"><span class="la-body"><strong>Ladies Only</strong><span class="la-preview">Art live on Music · playback when it drops</span></span></span><span class="chip">Music</span></li>
        <li class="la-row la-kicker"><a class="la-main" href="#/restream"><span class="la-body"><strong>PIKK Restream</strong><span class="la-preview">Stream to YouTube, TikTok, Twitch &amp; more — free inside PIKK</span></span></a><span class="chip">Restream</span></li>${!w&&!P&&!T&&!R&&!y?'<li class="la-row"><span class="la-main la-kicker-main"><span class="la-body"><span class="la-preview muted">No hot activity yet — engage on Posts / go Live to spike the feed.</span></span></span><span class="chip">TEST</span></li>':""}`,O=uo(),H=ia.map(E=>`
    <button type="button" class="home-stage-tab${E.id===O?" on":""}" role="tab"
      aria-selected="${E.id===O?"true":"false"}" data-stage="${E.id}" id="stage-tab-${E.id}">
      ${l(E.label)}
    </button>`).join(""),K=Jt().slice(0,5),L=Bd().slice(0,5),I=K.map(E=>Vs(E)).join("")||'<p class="muted">No hot lives yet — seed from Live / Hot Feed.</p>',q=L.map(E=>Vs(E,{rising:!0})).join("")||'<p class="muted">No rising streamers yet.</p>',V=_t.map(E=>`
    <a class="home-song-card" href="#/music">
      <img src="${l(E.cover)}" alt="" loading="lazy" />
      <div>
        <strong>${l(E.title)}</strong>
        <div class="muted" style="font-size:12px">${l(E.artist)} · ${l(E.status)}</div>
        <span class="chip" style="margin-top:6px">Enhancement · Coming Soon</span>
      </div>
    </a>`).join(""),Y=po(),G=Y?Vs(Y):'<p class="muted">No live streams right now — go Live or check Hot Feed.</p>',z=`
    <div class="home-stage-panel${O==="toplive"?" on":""}" data-panel="toplive" role="tabpanel" id="homeTopLivePanel" ${O==="toplive"?"":"hidden"}>
      <p class="muted home-stage-lead">Top live · highest viewers right now. Red LIVE hoodie on the card · updates as rankings change.</p>
      <div class="home-live-grid" id="homeTopLiveGrid">${G}</div>
      <a class="btn ghost block" href="#/live" style="margin-top:10px">Open Live</a>
    </div>`,Se=`
    <div class="home-stage-panel${O==="videos"?" on":""}" data-panel="videos" role="tabpanel" ${O==="videos"?"":"hidden"}>
      <div class="hero-video" id="homeFeaturedVideo">
        <iframe
          id="homeFeaturedIframe"
          src="${l(Je(n.embed))}"
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
    </div>`,Ue=`
    <div class="home-stage-panel${O==="hot"?" on":""}" data-panel="hot" role="tabpanel" ${O==="hot"?"":"hidden"}>
      <p class="muted home-stage-lead">Hot lives · ranked by viewers + gifts score (house OK). Strong playbacks / spikes from earlier today count.</p>
      <div class="home-live-grid">${I}</div>
      <a class="btn ghost block" href="#/live" style="margin-top:10px">Open Live</a>
    </div>`,He=`
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
    </div>`,dt=`
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
        ${Ue}
        ${He}
      </div>
    </div>`,pt=`
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
    </div>`,ut=`
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
    </div>`,mt=`
    <div class="card home-sell-promo home-app-goal" id="home-app-goal">
      <p class="kicker">Daily app goal · 24h</p>
      <div id="homeAppGoalBody">${mo(Ua())}</div>
      <p class="chip" style="margin-top:10px">TEST MODE · no real payments</p>
    </div>`,te=i.slice(0,6).map((E,De)=>{const Qt=new URL(E.youtube).searchParams.get("v")||"",S=Qt?`https://i.ytimg.com/vi/${encodeURIComponent(Qt)}/hqdefault.jpg`:"";return`<a class="pikk-home-media-card ${De<2?"is-featured":""}" href="${l(E.youtube)}" target="_blank" rel="noopener noreferrer"
       aria-label="Watch ${l(E.title)} on YouTube">
       ${S?`<img src="${l(S)}" alt="" loading="${De<2?"eager":"lazy"}" decoding="async" referrerpolicy="no-referrer"/>`:'<span class="pikk-home-media-fallback" aria-hidden="true">♫</span>'}
       <span class="pikk-home-media-shadow"></span>
       <span class="pikk-home-media-badge">▶ OFFICIAL VIDEO</span>
       <span class="pikk-home-media-title">${l(E.title)}</span>
     </a>`}).join(""),Ms=`
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

    ${`
    <section class="pikk-home-visual" id="pikkHomeVisual" aria-labelledby="pikkHomeVisualTitle">
      <div class="pikk-home-visual-top">
        <div><p class="kicker">PIKK DISCOVER</p><h2 id="pikkHomeVisualTitle">Your music. Your world.</h2></div>
        <a href="#/explore" class="pikk-home-visual-more">Explore ↗</a>
      </div>
      <nav class="pikk-home-circle-strip" aria-label="Browse PIKK features">
        <a class="pikk-home-circle" href="#/posts?compose=1" aria-label="Create a post on PIKK">
          <span class="pikk-home-circle-ring pikk-home-circle-symbol" aria-hidden="true">＋</span><span>Create</span>
        </a>
        ${_t.slice(0,4).map(E=>`
    <a class="pikk-home-circle" href="#/music" aria-label="Explore music: ${l(E.title)}">
      <span class="pikk-home-circle-ring"><img src="${l(E.cover)}" alt="" loading="lazy" decoding="async"/></span>
      <span>${l(E.title)}</span>
    </a>`).join("")}
        <a class="pikk-home-circle" href="#/live" aria-label="Explore Live">
          <span class="pikk-home-circle-ring pikk-home-circle-symbol" aria-hidden="true">●</span><span>Live</span>
        </a>
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

    ${dt}

    ${co("home")}

    ${pt}

    <section class="home-arcade card" id="homeArcade" aria-label="PIKK Games featured slideshow">
      <div class="home-arcade-top">
        <div><p class="kicker">Discover the arcade</p><h2>15 GAMES. ONE PIKK.</h2></div>
        <a href="#/games" class="btn ghost">All games →</a>
      </div>
      <div class="home-arcade-stage" aria-live="off">
        ${hs.map((E,De)=>`<article class="home-arcade-slide pikk-game-${l(E.theme)}" data-game-slide="${De}" ${De?"hidden":""}>
          <div class="home-arcade-image">${E.artwork?`<img src="${l(Ws(E))}" alt="" loading="lazy" decoding="async" />`:`<span class="home-arcade-symbol" aria-hidden="true">${E.icon}</span>`}</div>
          <div class="home-arcade-info">
            <span class="chip">GAME ${De+1} OF 15 · COMING SOON</span>
            <h3>${l(E.name)}</h3>
            <p>${l(E.description)}</p>
            <small>${l(E.players)} ${E.players==="1"?"Player":"Players"} · Preview only</small>
            <a class="btn primary" href="${l(E.href||"#/games")}">View in Arcade</a>
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


    ${mt}

    ${ut}

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
  `;return _("Home",Ms,{lead:"Featured stage · Top live · Block Wars preview · Live activity (hot lives · high-engagement posts from creators &amp; community · house updates) · Mix · Coming Soon · creator sell DEMO."})}function Ap(e){var x,Q,D,O,H,K;const t=e.querySelector("#homeArcade");if(t){const L=[...t.querySelectorAll("[data-game-slide]")],I=t.querySelector("#homeArcadePosition");let q=0,V=null;const Y=(Q=(x=window.matchMedia)==null?void 0:x.call(window,"(prefers-reduced-motion: reduce)"))==null?void 0:Q.matches,G=Ee=>{q=(Ee+L.length)%L.length,L.forEach((Ue,He)=>{Ue.hidden=He!==q}),I&&(I.textContent=`${q+1} / ${L.length}`)},z=()=>{V!==null&&clearInterval(V),V=null};(D=t.querySelector("[data-arcade-prev]"))==null||D.addEventListener("click",()=>{z(),G(q-1)}),(O=t.querySelector("[data-arcade-next]"))==null||O.addEventListener("click",()=>{z(),G(q+1)}),Y||(V=setInterval(()=>{if(!document.body.contains(t)){z();return}document.visibilityState==="visible"&&G(q+1)},6500));const Se=new MutationObserver(()=>{document.body.contains(t)||(z(),Se.disconnect())});Se.observe(document.body,{childList:!0,subtree:!0})}const s=e.querySelector("#homeAppGoalBody");if(s){const L=()=>{document.body.contains(s)?s.innerHTML=mo(Ua()):(clearInterval(q),document.removeEventListener("visibilitychange",I))},I=()=>{document.visibilityState==="visible"&&L()},q=setInterval(L,3e4);document.addEventListener("visibilitychange",I),s.addEventListener("submit",V=>{var Se,Ee;if(!V.target.matches(".home-goal-custom-form"))return;V.preventDefault();const Y=Number((Se=V.target.querySelector(".home-goal-custom-coins"))==null?void 0:Se.value);if(!Number.isSafeInteger(Y)||Y<1||Y>1e6)return h("Enter 1–1,000,000 whole coins");const G=(Ee=Ua())==null?void 0:Ee.id,z=Qs(G,Y);h(z!=null&&z.ok?"Custom donation sent · TEST MODE":(z==null?void 0:z.error)==="insufficient"?"Not enough demo coins":(z==null?void 0:z.error)==="signin"?"Sign in first":"Donation unavailable · TEST MODE"),L()}),s.addEventListener("click",V=>{const Y=V.target.closest(".home-goal-donate");if(!Y)return;const G=Qs(Y.dataset.goalId,Number(Y.dataset.coins));h(G&&G.ok?`TEST MODE · ${Y.dataset.coins} coins donated (no real payment)`:"TEST MODE · donate unavailable"),L()})}const a=e.querySelector(".page-head");if(a){a.querySelectorAll(".badge-phase, a.badge-phase, .live-hoodie-pill, .live-hoodie").forEach(I=>{I.remove()}),a.querySelectorAll("a, span, button").forEach(I=>{const q=(I.textContent||"").replace(/\s+/g," ").trim();(/^●?\s*LIVE$/i.test(q)||q==="LIVE")&&I.remove()});const L=a.querySelector("h1");L&&[...L.children].forEach(I=>{const q=(I.textContent||"").replace(/\s+/g," ").trim();(/LIVE/i.test(q)||I.classList.contains("badge-phase")||I.classList.contains("live-hoodie-pill"))&&I.remove()})}e.querySelectorAll("[data-idb-src]").forEach(async L=>{const I=L.getAttribute("data-idb-src");if(!I)return;const q=await Ea(I);q&&(L.tagName==="IMG"||L.tagName==="VIDEO"||L.tagName==="AUDIO")&&(L.src=q)});const i=e.querySelector("#homeFeaturedIframe"),n=e.querySelector("#homeFeaturedTitle");e.querySelectorAll(".mv-pick").forEach(L=>{L.addEventListener("click",()=>{e.querySelectorAll(".mv-pick").forEach(q=>q.classList.remove("on")),L.classList.add("on");const I=L.dataset.embed||"";i&&I&&(Qd(i),i.removeAttribute("data-dbs-yt-bound"),i.src=I+(I.includes("?")?"&":"?")+"rel=0",i.title=L.dataset.title||"",no(i)),n&&(n.textContent=L.dataset.title||"")})}),xa(e);const o=e.querySelector("#bwPreviewVideo"),r=e.querySelector("#bwPreviewPlay");if(o){const L=()=>{if(!r)return;const I=o.paused||o.ended;r.hidden=!I,r.setAttribute("aria-hidden",I?"false":"true")};r==null||r.addEventListener("click",I=>{I.preventDefault(),o.play().catch(()=>{})}),o.addEventListener("play",()=>{Rt(),L()}),o.addEventListener("pause",()=>{Qe(),L()}),o.addEventListener("ended",()=>{Qe(),L()}),o.addEventListener("pointerdown",()=>{o.paused||Rt()}),L()}const d=2e4;function c(){const L=e.querySelector("#homeTopLiveGrid");if(!L||!document.body.contains(L))return!1;const I=po();return L.innerHTML=I?Vs(I):'<p class="muted">No live streams right now — go Live or check Hot Feed.</p>',!0}let p=setInterval(()=>{c()||(clearInterval(p),p=null)},d);const m=()=>{document.visibilityState==="visible"&&c()};document.addEventListener("visibilitychange",m),window.addEventListener("focus",c);const g=e.querySelector("#homeFeaturedStage");if(!g){const L=new MutationObserver(()=>{document.body.contains(e)||(p&&clearInterval(p),document.removeEventListener("visibilitychange",m),window.removeEventListener("focus",c),L.disconnect())});L.observe(document.body,{childList:!0,subtree:!0});return}const f=[...e.querySelectorAll(".home-stage-tab")],b=[...e.querySelectorAll(".home-stage-panel")];let y=!1,v=null;const w=typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||document.documentElement.classList.contains("reduce-motion")||((K=(H=document.body)==null?void 0:H.classList)==null?void 0:K.contains("reduce-motion"));function $(L){ia.some(I=>I.id===L)||(L="toplive"),g.dataset.active=L,$p(L),f.forEach(I=>{const q=I.dataset.stage===L;I.classList.toggle("on",q),I.setAttribute("aria-selected",q?"true":"false")}),b.forEach(I=>{const q=I.dataset.panel===L;I.classList.toggle("on",q),q?I.removeAttribute("hidden"):I.setAttribute("hidden","")})}function C(){const L=ia.map(V=>V.id),I=g.dataset.active||"toplive",q=L.indexOf(I);$(L[(q+1)%L.length])}function k(){P(),!(y||w)&&(v=setInterval(C,mp))}function P(){v&&(clearInterval(v),v=null)}f.forEach(L=>{L.addEventListener("click",()=>{y=!0,P(),$(L.dataset.stage)})});const T=uo()||"toplive";$(T),w||setTimeout(()=>{!document.body.contains(g)||y||k()},1e4);const R=new MutationObserver(()=>{document.body.contains(g)||(P(),p&&(clearInterval(p),p=null),document.removeEventListener("visibilitychange",m),window.removeEventListener("focus",c),R.disconnect())});R.observe(document.body,{childList:!0,subtree:!0})}const Cp="5f92e6c36034711e2fc2391fe4ee4c59dd5102a6",Tp=Object.freeze([{title:"Viral Live: Correct Category Destinations",detail:"Viral Clips opens Clips, Songs opens Music, and Photos opens Home. These are links to existing PIKK sections; the 24/7 channel is still a preview, not broadcasting.",route:"#/viral-live",pr:197,kind:"VIRAL LIVE · PREVIEW"},{title:"Viral Live: Mobile Category Visibility",detail:"On narrow phones, keyboard-selected Videos, Viral Clips, Songs and Photos tabs scroll into view without changing the existing swipeable design. Continuous broadcasting is not live.",route:"#/viral-live",pr:196,kind:"VIRAL LIVE · PREVIEW"},{title:"Viral Live: Source Queue Keyboard Browsing",detail:"Use arrow keys or Home/End to select among three original music-video sources. The preview updates its artwork and YouTube source link; this is not a livestream.",route:"#/viral-live",pr:195,kind:"VIRAL LIVE · PREVIEW"},{title:"Explore: Escape Clears Search",detail:"Press Escape in Explore search to clear the query and results while keeping focus in the search field. Existing discovery and profiles remain available.",route:"#/explore",pr:194,kind:"EXPLORE · NAVIGATION"},{title:"Explore: Search Survives Tab Changes",detail:"Keep an Explore search when switching between Trending, Following and Discover; Clear resets the query and results. This improves browsing, not backend search coverage.",route:"#/explore",pr:193,kind:"EXPLORE · NAVIGATION"}]);function Dp(){const e=Cp.slice(0,8),t=Tp.map((s,a)=>`
    <article class="pikk-update-card">
      <span class="pikk-update-number" aria-hidden="true">${String(a+1).padStart(2,"0")}</span>
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
      <div class="pikk-updates-hero-mark"><img src="${l(It("brand/pikk-official-approved.jpg"))}" alt="PIKK official chrome logo" loading="eager"></div>
    </section>
    <section class="pikk-updates-list" aria-label="Recent published updates">
      <h2>Latest verified improvements</h2>
      ${t}
    </section>
    <p class="pikk-updates-note">A refresh reloads this browser's app bundle; it does not clear your account or local demo data. If a change still does not appear, compare the version above with the published source commit.</p>
  `,{lead:"A clear record of recent PIKK improvements."})}function Lp(e){var t;(t=e.querySelector("#pikkUpdatesRefresh"))==null||t.addEventListener("click",()=>{window.location.assign(jn(window.location.href))})}const Mp=20*60,Ip=250*1024*1024;function Pp({duration:e,size:t,type:s}){return s!=null&&s.startsWith("video/")?!Number.isFinite(t)||t<=0||t>Ip?"Video must be under 250 MB for this device-local preview.":!Number.isFinite(e)||e<=0?"Unable to read video duration. Try another file.":e>Mp?"PIKKUP Phase 1 videos must be 20 minutes or shorter.":"":"Select a supported video file."}function _p(e){return new Promise((t,s)=>{const a=URL.createObjectURL(e),i=document.createElement("video");let n=!1;const o=setTimeout(()=>r(new Error("Video metadata timed out")),12e3);function r(d,c){n||(n=!0,clearTimeout(o),i.removeAttribute("src"),i.load(),URL.revokeObjectURL(a),d?s(d):t(c))}i.preload="metadata",i.onloadedmetadata=()=>r(null,i.duration),i.onerror=()=>r(new Error("Cannot read this video file")),i.src=a})}const ho=[{id:"song",label:"Song",acceptCover:"image/*",acceptMedia:"audio/*,.mp3,.m4a,.wav,.aac"},{id:"album",label:"Album",acceptCover:"image/*",acceptMedia:"audio/*,.mp3,.m4a,.wav,.aac"},{id:"video",label:"Video",acceptCover:"image/*",acceptMedia:"video/*,.mp4,.mov,.webm"},{id:"picture",label:"Picture",acceptCover:"image/*",acceptMedia:"image/*"}];function Op(e){return _("Admin",`<div class="card admin-gate">
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
    <div class="card muted">Full team roles, revenue, and moderation ship later phases.</div>`,{lead:"Gated demo dashboard."})}function qp(){return`
  <section class="card admin-add" id="adminAdd">
    <h3>Add Content</h3>
    <p class="muted admin-add-note">PIKKUP preview: video uploads must be 20 minutes or shorter and at most 250 MB. Device-local only, not public hosting. TEST MODE · no backend. Metadata → <code>localStorage dbs_v1.catalog</code>. Files → IndexedDB <code>dbs_media_v1</code>. Works on iPhone Safari &amp; desktop. Large files stay on this device only.</p>

    <div class="admin-type-tabs" role="tablist" aria-label="Content type">${ho.map((t,s)=>`<button type="button" class="admin-type-tab${s===0?" on":""}" data-type="${l(t.id)}" role="tab">${l(t.label)}</button>`).join("")}</div>

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
  </section>`}function Np(e){if(!e.length)return'<div class="card admin-catalog"><h3>Catalog</h3><p class="muted">No admin-added items yet.</p></div>';const t=e.map(s=>{const a=s.coverRef&&!s.coverRef.startsWith("idb:")?l(s.coverRef):"";return`<div class="admin-catalog-row" data-id="${l(s.id)}">
        <div class="admin-catalog-thumb">
          ${a?`<img src="${a}" alt="" />`:`<img data-idb-src="${l(s.coverRef||"")}" alt="" class="idb-pending" />`}
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
    <div class="admin-catalog-list">${t}</div></div>`}function qe(e){return"$"+(Number(e)||0).toFixed(2)}function Bp(e){var i,n,o;const t=((i=e.openMic)==null?void 0:i.pending)||[],s=((n=e.openMic)==null?void 0:n.byStatus)||{},a=t.length?t.map(r=>`<div class="row wrap admin-om-row" data-om-id="${l(r.id)}">
            <span class="spacer"><strong>${l(r.username)}</strong> · ${l(r.talent)} · ${l(r.trackTitle)}
              <span class="chip">pending</span>
              ${r.rightsCertified?'<span class="chip">rights</span>':'<span class="chip">no rights</span>'}
            </span>
            <button type="button" class="btn primary admin-om" data-id="${l(r.id)}" data-status="approved">Approve</button>
            <button type="button" class="btn ghost admin-om" data-id="${l(r.id)}" data-status="rejected">Reject</button>
          </div>`).join(""):'<p class="muted">No pending applications. Seeded demos may already be approved/rejected — open <a href="#/openmic">Open Mic</a>.</p>';return`<section class="card admin-openmic" id="adminOpenMic">
    <h3>Open Mic queue</h3>
    <p class="muted">TEST MODE · reuse store Approve/Reject. Pending ${s.pending||0} · approved ${s.approved||0} · rejected ${s.rejected||0} · total ${((o=e.openMic)==null?void 0:o.total)||0}</p>
    ${a}
    <p class="admin-panel-links"><a class="btn" href="#/openmic">Full Open Mic page</a></p>
  </section>`}function Rp(e){const t=e.fanClubs||{total:0,recent:[]},s=t.recent.length?`<ul class="list-plain">${t.recent.map(a=>`<li><span><strong>${l(a.name)}</strong> · ${l(a.privacy)}${a.official?" · official":""}</span><span class="muted">${a.memberCount} members</span></li>`).join("")}</ul>`:'<p class="muted">No clubs yet.</p>';return`<section class="card admin-fanclubs" id="adminFanClubs">
    <h3>Fan Clubs glance</h3>
    <div class="stats">
      <div><strong>${t.total}</strong><span>Clubs</span></div>
    </div>
    ${s}
    <p class="admin-panel-links"><a class="btn" href="#/fanclubs">Open Fan Clubs</a></p>
  </section>`}function jp(e){const t=e.loyalty||{},s=(t.badges||[]).slice(0,6).map(a=>`<span class="chip">${l(a)}</span>`).join(" ")||'<span class="muted">None unlocked</span>';return`<section class="card admin-loyalty" id="adminLoyalty">
    <h3>Loyalty glance</h3>
    <p class="muted">${l(t.note||"Device-local loyalty")}</p>
    <div class="stats">
      <div><strong>${t.points||0}</strong><span>Points</span></div>
      <div><strong>${t.badgeCount||0}</strong><span>Badges</span></div>
      <div><strong>${t.historyCount||0}</strong><span>Actions</span></div>
    </div>
    <p class="admin-badge-row">${s}</p>
    <p class="admin-panel-links"><a class="btn" href="#/loyalty">Open Loyalty Club</a></p>
  </section>`}function Fp(){return`<section class="card admin-quicklinks" id="adminQuickLinks">
    <h3>Quick links</h3>
    <p class="muted">Deep-links only · page ownership stays with Live Social / Commerce / Build.</p>
    ${[{owner:"Live Social",links:[["#/live","Live"],["#/messages","Messages"],["#/giftbattles","Gift battles"],["#/multiguest","Multi-guest"],["#/spotlight","Spotlight"],["#/restream","Restream"],["#/connect","Connect"]]},{owner:"Commerce",links:[["#/marketplace","Marketplace"],["#/wallet","Wallet"],["#/earnings","Earnings"],["#/missions","Missions"],["#/share","Share & Earn"],["#/refer","Refer & Earn"]]},{owner:"Build",links:[["#/explore","Explore"],["#/notifications","Notifications"],["#/fanclubs","Fan Clubs"],["#/loyalty","Loyalty"],["#/openmic","Open Mic"]]}].map(s=>{const a=s.links.map(([i,n])=>`<a class="btn ghost admin-qlink" href="${i}">${l(n)}</a>`).join("");return`<div class="admin-ql-group"><span class="chip">${l(s.owner)}</span><div class="admin-ql-row">${a}</div></div>`}).join("")}
  </section>`}function Kp(e){const t=e.revenue||{},s=(t.byCategory||[]).map(a=>`<li><span>${l(a.label||a.category)} ×${a.count}</span><span class="muted">gross ${qe(a.gross)} · creator ${qe(a.creatorShare)} · PIKK ${qe(a.dbsShare)}</span></li>`).join("");return`<section class="card admin-revenue" id="adminRevenue">
    <h3>Revenue / analytics shell</h3>
    <div class="row wrap" style="gap:8px;margin-bottom:8px">
      <span class="chip">TEST MODE</span>
      <span class="chip">${l(t.chip||"demo figures · not production")}</span>
    </div>
    <div class="stats">
      <div><strong>${qe(t.gross)}</strong><span>Gross</span></div>
      <div><strong>${qe(t.fees)}</strong><span>Fees</span></div>
      <div><strong>${qe(t.creatorShare)}</strong><span>Creator net</span></div>
      <div><strong>${qe(t.dbsShare)}</strong><span>PIKK net</span></div>
    </div>
    <p class="muted">Creator available ${qe(t.creatorAvailable)} · holds ${qe(t.creatorHolds)} · fan wallet ${qe(t.fanWalletBalance)} · catalog ${t.catalogPublished||0}/${t.catalogTotal||0} published · earning lines ${t.earnCount||0}</p>
    ${s?`<ul class="list-plain">${s}</ul>`:'<p class="muted">No creator earnings in store yet — open Wallet / Earnings (Commerce) to seed demos.</p>'}
    <p class="admin-panel-links">
      <a class="btn" href="#/wallet">Wallet</a>
      <a class="btn" href="#/earnings">Earnings</a>
    </p>
  </section>`}function Gp(e){Ds(),je();const t=nn({openOnly:!0}),s=nn({openOnly:!1}).length,a=e.hotFeed||{},i=t.length?t.slice(0,12).map(n=>{const o=n.kind==="live"?'<span class="chip">live</span>':'<span class="chip">post</span>',r=n.kind==="live"?` · viewers ${n.viewers??"—"} · gifts ${n.gifts??"—"}`:` · score ${n.score??0}`,d=n.kind==="post"?`<button type="button" class="btn primary admin-ea-like" data-ref="${l(n.refId)}" data-alert="${l(n.id)}">Like</button>
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
      <div><strong>${a.hotPosts||0}</strong><span>Hot posts</span></div>
      <div><strong>${a.hotLives||0}</strong><span>Hot lives</span></div>
    </div>
    ${i}
    <p class="admin-panel-links"><a class="btn" href="#/posts">Open Posts Hot strip</a><a class="btn" href="#/live">Open Live</a></p>
  </section>`}function Vp(e){const t=e.moderation||{};return`<section class="card admin-moderation" id="adminModeration">
    <h3>Moderation stub</h3>
    <p class="muted">${l(t.note||"Stub")}</p>
    <div class="stats">
      <div><strong>${(t.warnings||[]).length}</strong><span>Warnings</span></div>
      <div><strong>${(t.suspensions||[]).length}</strong><span>Suspensions</span></div>
    </div>
    <p class="muted">Empty-state · no enforcement actions stored yet.</p>
    <p class="admin-panel-links"><a class="btn" href="#/guidelines">Community Guidelines</a></p>
  </section>`}function Up(){var d;const e=Ve(),{posts:t,clipperApps:s,user:a}=M();if(((d=e.query)==null?void 0:d.admin)==="1"&&a&&a.role!=="admin"&&Ss(!0),!ae())return Op(a);zt(),Ge(),Ds();const i=Wn(),n=yd(),o=i.clipperByStatus,r=St({includeUnpublishedForAdmin:!0});return _("Admin",`<div class="card admin-header">
      <div class="row wrap">
        <span class="chip">TEST MODE</span>
        <span class="chip">role=admin</span>
        <span class="spacer muted">Signed in as <strong>${l(a.username)}</strong></span>
        <button class="btn ghost" id="adminRevoke">Revoke admin</button>
      </div>
      <p class="muted admin-gate-hint">Gate: Profile toggle or <code>?admin=1</code> → <code>user.role='admin'</code> in <code>dbs_v1</code>. Phase 2 panels deep-link to owner pages.</p>
    </div>

    ${Fp()}
    ${Gp(n)}
    ${Bp(n)}
    ${Rp(n)}
    ${jp(n)}
    ${Kp(n)}
    ${Vp(n)}

    ${qp()}
    ${Np(r)}

    <div class="card admin-stats">
      <h3>Phase 1 stats</h3>
      <div class="stats">
        <div><strong>${i.posts}</strong><span>Posts</span></div>
        <div><strong>${i.likes}</strong><span>Likes</span></div>
        <div><strong>${i.comments}</strong><span>Comments</span></div>
        <div><strong>${i.clippers}</strong><span>Clipper apps</span></div>
        <div><strong>${i.catalogPublished||0}</strong><span>Published</span></div>
        <div><strong>${i.catalogTotal||0}</strong><span>Catalog</span></div>
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
                   </div>`).join(""):'<p class="muted">None yet — submit via <a href="#/clippers">Clippers</a>.</p>'}</div>`,{lead:"Phase 2 controls · Add Content · Clippers · catalog."})}async function gn(e){if(!e)return"";const t=pp("media");return await cp(t,e,{name:e.name,mime:e.type}),"idb:"+t}function fn(e){if(!e)return"";try{const t=new URL(e);let s=t.searchParams.get("v");return!s&&t.hostname.includes("youtu.be")&&(s=t.pathname.slice(1)),!s&&t.pathname.startsWith("/embed/")&&(s=t.pathname.split("/")[2]),s?`https://www.youtube.com/embed/${s}`:""}catch{return""}}function Hp(e){var i,n;(i=e.querySelector("#adminRevoke"))==null||i.addEventListener("click",()=>{Ss(!1),h("Admin revoked"),j("#/admin")}),e.querySelectorAll(".admin-clip").forEach(o=>{o.addEventListener("click",()=>{zn(o.dataset.id,o.dataset.status),h("Clipper "+o.dataset.status),j("#/admin")})}),e.querySelectorAll(".admin-om").forEach(o=>{o.addEventListener("click",()=>{const r=Ya(o.dataset.id,o.dataset.status,o.dataset.status==="rejected"?"Admin reject":"");if(r!=null&&r.error){h(r.error==="admin"?"Admin required":"Open Mic update failed");return}h(o.dataset.status==="approved"?"Open Mic approved":"Open Mic rejected"),j("#/admin")})}),e.querySelectorAll(".admin-ea-like").forEach(o=>{o.addEventListener("click",()=>{const r=_d(o.dataset.ref);if(r!=null&&r.error)return h(r.error==="admin"?"Admin required":"Like failed");o.dataset.alert&&Is(o.dataset.alert,"liked"),h("Liked · TEST MODE"),j("#/admin")})}),e.querySelectorAll(".admin-ea-comment").forEach(o=>{o.addEventListener("click",()=>{const r=Od(o.dataset.ref,"🔥 PIKK team — keep it up! (TEST MODE)");if(r!=null&&r.error)return h(r.error==="admin"?"Admin required":"Comment failed");o.dataset.alert&&Is(o.dataset.alert,"commented"),h("Comment posted · TEST MODE"),j("#/admin")})}),e.querySelectorAll(".admin-ea-share").forEach(o=>{o.addEventListener("click",async()=>{var c;const r=qd(o.dataset.ref);if(r!=null&&r.error)return h(r.error==="admin"?"Admin required":"Share failed");const d=`${location.origin}${location.pathname}#/posts?focus=${encodeURIComponent(o.dataset.ref)}`;try{(c=navigator.clipboard)!=null&&c.writeText&&await navigator.clipboard.writeText(d),h("Link copied · share +1 (TEST MODE)")}catch{h("Share +1 (TEST MODE)")}o.dataset.alert&&Is(o.dataset.alert,"shared"),j("#/admin")})}),e.querySelectorAll(".admin-ea-handle").forEach(o=>{o.addEventListener("click",()=>{const r=Is(o.dataset.alert,"handled");if(r!=null&&r.error)return h("Could not mark handled");h("Alert handled"),j("#/admin")})}),e.querySelectorAll("img[data-idb-src]").forEach(async o=>{const r=o.getAttribute("data-idb-src");if(!r)return;const d=await Ea(r);d&&(o.src=d,o.classList.remove("idb-pending"))});const t=e.querySelector("#adminType"),s=e.querySelector("#adminMediaFile"),a=e.querySelector("#adminCoverFile");e.querySelectorAll(".admin-type-tab").forEach(o=>{o.addEventListener("click",()=>{e.querySelectorAll(".admin-type-tab").forEach(m=>m.classList.remove("on")),o.classList.add("on");const r=o.dataset.type;t&&(t.value=r);const d=ho.find(m=>m.id===r);d&&s&&(s.accept=d.acceptMedia),d&&a&&(a.accept=d.acceptCover);const c=e.querySelector("#adminMediaLabel");c&&(c.textContent=r==="picture"?"Picture file (or use cover only)":r==="video"?"Video file (optional if YouTube link set)":"Audio / media file (optional)");const p=e.querySelector("#adminStreamingFields");p&&(p.style.display=r==="song"||r==="album"?"":"none")})}),e.querySelectorAll(".admin-dropzone").forEach(o=>{const r=o.querySelector(".admin-file-input"),d=o.querySelector(".admin-file-name");o.addEventListener("click",c=>{c.target!==r&&(r==null||r.click())}),o.addEventListener("keydown",c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),r==null||r.click())}),r==null||r.addEventListener("change",()=>{var p;const c=(p=r.files)==null?void 0:p[0];d&&(d.textContent=c?`${c.name} · ${(c.size/1024/1024).toFixed(2)} MB`:"")}),o.addEventListener("dragover",c=>{c.preventDefault(),o.classList.add("drag")}),o.addEventListener("dragleave",()=>o.classList.remove("drag")),o.addEventListener("drop",c=>{var g,f;c.preventDefault(),o.classList.remove("drag");const p=(f=(g=c.dataTransfer)==null?void 0:g.files)==null?void 0:f[0];if(!p||!r)return;const m=new DataTransfer;m.items.add(p),r.files=m.files,r.dispatchEvent(new Event("change"))})}),(n=e.querySelector("#adminAddForm"))==null||n.addEventListener("submit",async o=>{var C,k,P,T,R,x,Q,D,O,H,K,L,I,q,V,Y,G,z,Se,Ee,Ue,He,dt,pt,ut,mt;o.preventDefault();const r=e.querySelector("#adminAddStatus"),d=e.querySelector("#adminSave"),c=(k=(C=e.querySelector("#adminTitle"))==null?void 0:C.value)==null?void 0:k.trim(),p=((T=(P=e.querySelector("#adminArtist"))==null?void 0:P.value)==null?void 0:T.trim())||"DatBoiSkeet",m=((R=e.querySelector("#adminType"))==null?void 0:R.value)||"song",g=((Q=(x=e.querySelector("#adminCoverUrl"))==null?void 0:x.value)==null?void 0:Q.trim())||"",f=((O=(D=e.querySelector("#adminMediaUrl"))==null?void 0:D.value)==null?void 0:O.trim())||"",b=((K=(H=e.querySelector("#adminYoutube"))==null?void 0:H.value)==null?void 0:K.trim())||"",y={spotify:((I=(L=e.querySelector("#adminSpotify"))==null?void 0:L.value)==null?void 0:I.trim())||"",apple:((V=(q=e.querySelector("#adminApple"))==null?void 0:q.value)==null?void 0:V.trim())||"",youtubeMusic:((G=(Y=e.querySelector("#adminYtm"))==null?void 0:Y.value)==null?void 0:G.trim())||"",tidal:((Se=(z=e.querySelector("#adminTidal"))==null?void 0:z.value)==null?void 0:Se.trim())||"",amazon:((Ue=(Ee=e.querySelector("#adminAmazon"))==null?void 0:Ee.value)==null?void 0:Ue.trim())||"",youtube:b||""},v=!!((He=e.querySelector("#adminPublished"))!=null&&He.checked),w=(pt=(dt=e.querySelector("#adminCoverFile"))==null?void 0:dt.files)==null?void 0:pt[0],$=(mt=(ut=e.querySelector("#adminMediaFile"))==null?void 0:ut.files)==null?void 0:mt[0];if(!c){h("Title required");return}if(m==="video"&&$)try{const te=await _p($),Ae=Pp({duration:te,size:$.size,type:$.type});if(Ae){h(Ae),r&&(r.textContent=Ae);return}}catch{const te="Could not verify video duration. Upload canceled.";h(te),r&&(r.textContent=te);return}d&&(d.disabled=!0),r&&(r.textContent="Saving… (large files may take a moment on iPhone)");try{let te=g,Ae=f;w&&(te=await gn(w)),$&&(Ae=await gn($)),m==="picture"&&!te&&Ae&&(te=Ae);const Oe=Xo({type:m,title:c,artist:p,coverRef:te,mediaRef:Ae,youtube:b,streamingLinks:m==="song"||m==="album"?y:{},published:v,embed:fn(b)});if(Oe!=null&&Oe.error){h(Oe.error==="forbidden"?"Admin required":"Could not save"),r&&(r.textContent=""),d&&(d.disabled=!1);return}b&&Oe.id&&Jn(Oe.id,{embed:fn(b)}),h(v?"Published to catalog":"Saved as draft"),j("#/admin")}catch(te){console.error(te),h("Save failed — file may be too large for this browser"),r&&(r.textContent=String((te==null?void 0:te.message)||te)),d&&(d.disabled=!1)}}),e.querySelectorAll(".admin-cat-pub").forEach(o=>{o.addEventListener("click",()=>{Zo(o.dataset.id,o.dataset.on==="1"),h(o.dataset.on==="1"?"Published":"Unpublished"),j("#/admin")})}),e.querySelectorAll(".admin-cat-del").forEach(o=>{o.addEventListener("click",()=>{confirm("Delete this catalog item?")&&(el(o.dataset.id),h("Deleted"),j("#/admin"))})})}function Lt(){j("#/posts")}function zp(){Ds();const e=zr(8);return e.length?`<section class="card hot-strip" id="hotStrip">
    <div class="row wrap hot-strip-head">
      <h3 class="hot-strip-title">🔥 Hot / Trending</h3>
      <span class="chip">TEST MODE</span>
      <span class="muted hot-strip-note">likes + comments + shares · house + community</span>
    </div>
    <div class="hot-rail" role="list">${e.map((s,a)=>{const i=a+1,n=s.image?`<img class="hot-thumb" src="${l(s.image)}" alt="" loading="lazy" />`:`<div class="hot-thumb hot-thumb-empty">${l((s.username||"?")[0].toUpperCase())}</div>`,o=s.mediaType==="video"?'<span class="chip">video</span>':s.image?'<span class="chip">pic</span>':'<span class="chip">text</span>',r=s.house?'<span class="chip">house</span>':'<span class="chip">community</span>';return`<a class="hot-card" href="#/posts?focus=${l(s.postId||s.id)}" data-hot-id="${l(s.postId||s.id)}">
        <span class="hot-rank">#${i}</span>
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
    </section>`}function Wp(e){var w,$,C,k,P;const{posts:t,likes:s,comments:a,user:i,postShares:n}=M(),o=((w=e==null?void 0:e.query)==null?void 0:w.tab)==="following"?"following":"discover",r=(($=e==null?void 0:e.query)==null?void 0:$.focus)||"",d=new Set((i==null?void 0:i.following)||[]),c=o==="following"&&i?t.filter(T=>d.has(T.userId)||T.userId===i.id):t,p=Bo.map(T=>`<button type="button" class="chip preset-img" data-src="${l(T.src)}" title="${l(T.label)}">${l(T.label)}</button>`).join(""),m=((C=e==null?void 0:e.query)==null?void 0:C.compose)==="1"||((k=e==null?void 0:e.query)==null?void 0:k.type),g=["text","picture","short","video"].includes((P=e==null?void 0:e.query)==null?void 0:P.type)?e.query.type:"",f=i?`
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
    </div>`,y=c.map(T=>{const R=s[T.id]||[],x=i&&R.includes(i.id),Q=a[T.id]||[],D=n&&n[T.id]||0,O=$a(T.id),H=i&&d.has(T.userId),K=r&&r===T.id?" post-focus":"",L=i&&T.userId!==i.id?`<button class="btn ghost follow-btn" data-uid="${l(T.userId)}" data-on="${H?"1":"0"}">${H?"Following":"Follow"}</button>`:"",I=T.userId==="dbs"?'<span class="chip">house</span>':'<span class="chip">community</span>',q=T.mediaType||(T.image?"picture":"text"),V=q==="short"?'<span class="chip">Short</span>':q==="video"?'<span class="chip">Video</span>':q==="picture"||q==="image"?'<span class="chip">Picture</span>':q==="text"?'<span class="chip">Text</span>':"",Y=(()=>{const G=(T.mediaUrl||T.image||"").trim();if(!G)return"";if(q==="short"||q==="video"){const z=/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{6,})/i.exec(G);if(z)return`<div class="media media-video"><iframe src="https://www.youtube.com/embed/${z[1]}?rel=0" title="post video" allowfullscreen loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>`;if(G.startsWith("http")||G.endsWith(".mp4")||G.endsWith(".webm"))return`<video class="media" src="${l(G)}" controls playsinline preload="metadata"></video>`}return`<img class="media" src="${l(G)}" alt="" loading="lazy" />`})();return`
      <article class="post${K}" data-id="${l(T.id)}" id="post-${l(T.id)}">
        <div class="meta">
          <a class="avatar" href="#/profile/${l(T.userId)}">${l((T.username||"?")[0].toUpperCase())}</a>
          <div class="spacer">
            <div class="who"><a href="#/profile/${l(T.userId)}">${l(T.username)}</a> ${I}${V}</div>
            <div class="when">${F(T.at)}${O>=5?` · <span class="hot-inline">🔥 ${O}</span>`:""}</div>
          </div>
          ${L}
        </div>
        <p class="body-text">${l(T.text)}</p>
        ${Y}
        <div class="post-actions">
          <button class="btn like-btn ${x?"primary":""}" data-id="${l(T.id)}">
            ♥ ${R.length}
          </button>
          <button class="btn ghost comment-toggle" data-id="${l(T.id)}">💬 ${Q.length}</button>
          <button class="btn ghost share-btn" data-id="${l(T.id)}" title="Share (demo count)">↗ ${D}</button>
        </div>
        <div class="comments" id="c-${l(T.id)}" hidden>
          ${Q.map(G=>`<div class="comment"><b>${l(G.username)}</b> ${l(G.text)}</div>`).join("")||'<div class="muted">No comments yet</div>'}
          ${i?`<div class="row" style="margin-top:8px">
                  <input class="c-input" data-id="${l(T.id)}" placeholder="Add a comment…" style="flex:1;background:#0e0e14;border:1px solid var(--line);border-radius:12px;padding:8px 10px" />
                  <button class="btn primary c-send" data-id="${l(T.id)}">Send</button>
                </div>`:""}
        </div>
      </article>`}).join(""),v=o==="following"?'<div class="card muted">No posts from people you follow yet. Discover feed has official drops.</div>':'<div class="card muted">No posts yet.</div>';return _("Posts",zp()+f+b+(y||v),{lead:"Post Text, a Picture, Short, or Video · Shorts live here (not separate tabs) · Hot strip ranks engagement."})}function Yp(e){var d;const t=e.querySelector(".post-focus");if(t)try{t.scrollIntoView({behavior:"smooth",block:"center"})}catch{}else typeof location<"u"&&(location.hash.includes("compose=1")||location.hash.includes("type="))&&setTimeout(()=>{var c;return(c=e.querySelector("#composer"))==null?void 0:c.scrollIntoView({behavior:"smooth",block:"start"})},50);const s=e.querySelector("#postComposeBody"),a=e.querySelector("#postType"),i=e.querySelector("#postTypeChip"),n=e.querySelector("#postMediaLabel"),o=e.querySelector("#postPresets");function r(c){const p=c||"picture";e.querySelectorAll(".post-type-btn").forEach(b=>b.classList.toggle("on",b.dataset.type===p)),a&&(a.value=p),i&&(i.textContent=p.charAt(0).toUpperCase()+p.slice(1)+" post");const m=e.querySelector("#postMediaField"),g=e.querySelector("#postMediaNote"),f=p==="text";m&&(m.hidden=f),g&&(g.hidden=f),n&&!f&&(n.textContent=p==="short"?"Short clip link (YouTube / demo path)":p==="video"?"Video link (YouTube / demo path)":"Picture link (demo path)"),o&&(o.hidden=p!=="picture"),s&&(s.hidden=!1,s.classList.remove("is-collapsed"))}e.querySelectorAll(".post-type-btn").forEach(c=>{c.addEventListener("click",()=>r(c.dataset.type))}),a!=null&&a.value&&r(a.value),e.querySelectorAll(".preset-img").forEach(c=>{c.addEventListener("click",()=>{const p=e.querySelector("#postImg");p&&(p.value=c.dataset.src||""),h("Picture selected")})}),(d=e.querySelector("#postSubmit"))==null||d.addEventListener("click",()=>{var c,p;try{const m=(c=e.querySelector("#postText"))==null?void 0:c.value,g=(a==null?void 0:a.value)||"picture",f=(((p=e.querySelector("#postImg"))==null?void 0:p.value)||"").trim();if(g==="text"){if(!(m!=null&&m.trim()))return h("Write some words for a Text post");Ui({text:m.trim(),mediaType:"text"}),h("Text posted"),Lt();return}if(!(m!=null&&m.trim())&&!f)return h("Add a caption or media");if((g==="short"||g==="video")&&!f)return h("Add a "+g+" link (TEST MODE)");Ui({text:m||(g==="picture"?"Photo":g==="short"?"Short":"Video"),image:g==="picture"?f:"",mediaType:g,mediaUrl:f}),h(g.charAt(0).toUpperCase()+g.slice(1)+" posted"),Lt()}catch(m){h(m.message||"Could not post")}}),e.querySelectorAll(".like-btn").forEach(c=>{c.addEventListener("click",()=>{if(Ho(c.dataset.id).error)return h("Sign in to like");Lt()})}),e.querySelectorAll(".comment-toggle").forEach(c=>{c.addEventListener("click",()=>{const p=e.querySelector("#c-"+c.dataset.id);p&&(p.hidden=!p.hidden)})}),e.querySelectorAll(".c-send").forEach(c=>{c.addEventListener("click",()=>{var b;const p=c.dataset.id,m=e.querySelector(`.c-input[data-id="${p}"]`),g=(b=m==null?void 0:m.value)==null?void 0:b.trim();if(!g)return;if(zo(p,g).error)return h("Sign in to comment");h("Comment added"),Lt()})}),e.querySelectorAll(".share-btn").forEach(c=>{c.addEventListener("click",async()=>{var f;const p=c.dataset.id;if(Wr(p).error)return h("Could not share");const g=`${location.origin}${location.pathname}#/posts?focus=${encodeURIComponent(p)}`;try{(f=navigator.clipboard)!=null&&f.writeText&&await navigator.clipboard.writeText(g),h("Shared · link copied (TEST MODE)")}catch{h("Shared · count +1 (TEST MODE)")}Lt()})}),e.querySelectorAll(".follow-btn").forEach(c=>{c.addEventListener("click",()=>{const p=c.dataset.uid,m=c.dataset.on==="1";if((m?da(p):ca(p)).error)return h("Sign in to follow");h(m?"Unfollowed":"Following"),Lt()})})}function vn(e){j(e)}const Qa={apple:"Apple Music",spotify:"Spotify",youtubeMusic:"YouTube Music",youtube:"YouTube",tidal:"Tidal",amazon:"Amazon Music"};function go(e){if(!e||typeof e!="object")return{};const t={};for(const s of Object.keys(Qa)){const a=String(e[s]||"").trim();(a.startsWith("http://")||a.startsWith("https://"))&&(t[s]=a)}return t}function Jp(e){const t=go(e),s=Object.keys(Qa).filter(a=>t[a]);return s.length?s.map(a=>`<a class="btn stream-plat stream-plat-${l(a)}" href="${l(t[a])}" target="_blank" rel="noopener">${l(Qa[a])}</a>`).join(""):'<span class="muted" style="font-size:12px">No platform links yet</span>'}function Qp(e){try{const t=new URL(e);return t.protocol!=="https:"||t.hostname!=="music.apple.com"||!/^\/[a-z]{2}(?:-[a-z]{2})?\/(?:song|album)\//i.test(t.pathname)?"":"https://embed.music.apple.com"+t.pathname+t.search}catch{return""}}function qa(e){var o;const t=e.cover?`<img class="stream-cover" src="${l(e.cover)}" alt="${l(e.title)}" loading="lazy" referrerpolicy="no-referrer" />`:'<div class="stream-cover stream-cover-empty" aria-hidden="true">♪</div>',s=e.albumNote?`<div class="muted" style="font-size:11px">${l(e.albumNote)}</div>`:"",a=e.year?` · ${l(String(e.year))}`:"",i=Qp((o=e.links)==null?void 0:o.apple),n=i?`<details class="apple-music-embed"><summary>▶ Play in PIKK · Apple Music</summary><iframe title="Apple Music player for ${l(e.title)}" src="${l(i)}" loading="lazy" allow="autoplay *; encrypted-media *; fullscreen *" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation" style="width:100%;height:175px;border:0;border-radius:12px"></iframe><small class="muted">Apple controls playback availability. Full listening may require Apple Music.</small></details>`:"";return`
    <article class="stream-release">
      ${t}
      <div class="stream-meta">
        <span class="chip">${l(e.type||"release")}</span>
        <strong>${l(e.title)}</strong>
        <div class="muted" style="font-size:12px">${l(e.artist||"DatBoiSkeet")}${a}</div>
        ${s}
        ${n}
        <div class="stream-plats">${Jp(e.links)}</div>
      </div>
    </article>`}function bn(e){return e==="inner"?"Inner Circle":e==="backstage"?"Backstage":e==="skeet+"?"Skeet+":"None"}function Xp(e){return qo.map(t=>{const s=t.tier==="backstage"||t.tier==="inner";return e&&Va(s?"backstage":"skeet")?`
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
      </article>`}).join("")}function yn(e={}){var C;const t=["songs","albums","beats","playlists","upload"].includes((C=e.query)==null?void 0:C.view)?e.query.view:"",{user:s}=M(),a=Et(),i=Va("skeet"),n=new Set((s==null?void 0:s.purchasedTracks)||[]),o=_t.map(k=>`
    <div class="cover-card" style="flex:0 0 160px">
      <span class="badge-cs">${l(k.status)}</span>
      <img src="${l(k.cover)}" alt="${l(k.title)}" style="width:160px;height:160px" />
      <div class="t">${l(k.title)}</div>
      <div class="muted" style="font-size:11px">${l(k.artist)}</div>
    </div>`).join(""),r=Gn.map(k=>{const P=k.id==="skeet"?"skeet+":k.id==="inner"?"inner":k.id,T=a===P;return`
    <div class="card" style="margin:0">
      <h3>${l(k.name)}</h3>
      <div class="price" style="font-size:22px;font-weight:900">$${k.price}<span class="muted" style="font-size:13px">/mo</span></div>
      <p class="muted">${l(k.blurb)}</p>
      ${s?T?`<button type="button" class="btn ghost block mem-toggle" data-tier="${l(k.id)}" data-on="1">Active · tap to cancel (demo)</button>`:`<button type="button" class="btn primary block mem-toggle" data-tier="${l(k.id)}" data-on="0">Join · TEST MODE</button>`:'<a class="btn primary block" href="#/profile">Sign in to join</a>'}
    </div>`}).join(""),d=Ki.filter(k=>n.has(k.id)),c=Ki.map(k=>{const P=n.has(k.id);return`
      <div class="card" style="margin:0;display:flex;gap:12px;align-items:center">
        <img src="${l(k.cover)}" alt="" style="width:72px;height:72px;border-radius:10px;object-fit:cover;flex:0 0 72px" />
        <div class="spacer">
          <strong>${l(k.title)}</strong>
          <div class="muted" style="font-size:12px">${l(k.artist)} · ${l(k.status)}</div>
          <div style="font-weight:800;margin-top:4px">$${k.price.toFixed(2)}</div>
        </div>
        ${s?P?'<span class="chip">In My Music</span>':`<button type="button" class="btn primary buy-track" data-id="${l(k.id)}">Buy · demo</button>`:'<a class="btn" href="#/profile">Sign in</a>'}
      </div>`}).join(""),p=St({publishedOnly:!0,types:["song","album"]}),m=p.map(k=>{const P=go(k.streamingLinks||{});return Object.keys(P).length?{id:k.id,title:k.title,artist:k.artist,type:k.type||"song",cover:k.coverRef&&!String(k.coverRef).startsWith("idb:")?k.coverRef:"",links:P,fromAdmin:!0}:null}).filter(Boolean),g=[...yt,...m];let f="";if(t==="songs"||t==="albums"){const k=t==="albums",P=g.filter(T=>k?T.type==="album":T.type==="single"||T.type==="song");f=`<div class="card" id="music-focused-view">
      <h2>${k?"Albums":"Songs"}</h2>
      <p class="muted">Verified releases and available official listening links.</p>
      <div class="stream-grid">${P.map(qa).join("")||'<p class="muted">No releases listed in this category yet.</p>'}</div>
      <a class="btn ghost" href="#/music">Music overview</a>
    </div>`}else if(t==="playlists")f=`<div class="card" id="music-focused-view">
      <h2>Playlists</h2>
      <p class="muted">Official YouTube playlists open on YouTube. No rehosted audio.</p>
      <div class="row wrap" style="gap:8px">
        ${Ka.map(k=>`<a class="btn ghost" href="${l(k.youtube)}" target="_blank" rel="noopener">${l(k.title)}</a>`).join("")}
      </div>
      <a class="btn ghost" href="#/music">Music overview</a>
    </div>`;else if(t==="beats"||t==="upload"){const k=t==="upload";f=`<div class="card" id="music-focused-view">
      <h2>${k?"Upload Music":"Beats"}</h2>
      <p class="muted">Not available yet · TEST MODE. ${k?"Creator music uploads require secure storage, ownership verification and publishing tools.":"The producer beat marketplace and licensing checkout are still in development."}</p>
      <a class="btn ghost" href="#/music">Music overview</a>
    </div>`}const b=p.length?`<div class="card catalog-admin-music">
        <h2>From Admin</h2>
        <p class="muted">Published songs &amp; albums added in Admin · TEST MODE (device-local).</p>
        <div class="cover-row">${p.map(k=>`
          <div class="cover-card catalog-item" data-id="${l(k.id)}" style="flex:0 0 160px">
            <span class="badge-cs">${l(k.type)}</span>
            <img data-idb-src="${l(k.coverRef||"")}" src="${l(k.coverRef&&!k.coverRef.startsWith("idb:")?k.coverRef:"")}" alt="${l(k.title)}" style="width:160px;height:160px;object-fit:cover;background:#111" />
            <div class="t">${l(k.title)}</div>
            <div class="muted" style="font-size:11px">${l(k.artist)}</div>
            ${k.mediaRef?`<audio class="catalog-audio" data-idb-src="${l(k.mediaRef)}" controls preload="none" style="width:100%;margin-top:6px"></audio>`:""}
          </div>`).join("")}</div>
      </div>`:"",y=yt.find(k=>k.cover)||null,v=yt.filter(k=>k.cover).slice(0,5),$=`
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
      ${y?`<div class="pikk-music-showcase-art"><img src="${l(y.cover)}" alt="${l(y.title)} official cover" decoding="async" loading="eager"/><span>${l(y.title)}</span></div>`:""}
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
        ${v.map(k=>`<a class="pikk-music-release-tile" href="#/music#stream-everywhere">
          <img src="${l(k.cover)}" alt="${l(k.title)} cover" loading="lazy" decoding="async"/>
          <strong>${l(k.title)}</strong>
          <small>${l(k.artist||"DatBoiSkeet")}</small>
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
        <a class="btn" href="${l(me.youtube)}" target="_blank" rel="noopener">Official channel</a>
        <a class="btn ghost" href="${l(me.youtubeHandle)}" target="_blank" rel="noopener">@DatBoiSkeet1</a>
        ${Ka.map(k=>`<a class="btn ghost" href="${l(k.youtube)}" target="_blank" rel="noopener">${l(k.title)}</a>`).join("")}
      </div>
      <div class="yt-mix-grid">
        ${ni.map(k=>`
          <article class="yt-mix-card">
            <div class="hero-video" style="margin:0 0 10px">
              <iframe src="${l(Je(k.embed))}" title="${l(k.title)}" allowfullscreen loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            </div>
            <h3 style="margin:0 0 6px">${l(k.title)}</h3>
            <p class="muted" style="margin:0 0 10px;font-size:13px">${l(k.blurb||"")}</p>
            <a class="btn" href="${l(k.youtube)}" target="_blank" rel="noopener">Play on YouTube</a>
          </article>`).join("")}
      </div>
    </div>

    <div class="card" id="stream-everywhere">
      <h2>Featured · Stream Everywhere</h2>
      <p class="muted">Official DatBoiSkeet releases — Apple Music is the primary listening destination: use the Apple-hosted player on supported releases or open the song in Apple Music. Other verified platforms are optional. Full Apple Music playback may require a subscription. External streams are not rehosted in-app. Separate from Vault &amp; purchases.</p>
      <div class="stream-artist row wrap" style="gap:8px;margin:10px 0 14px">
        <span class="chip">Artist</span>
        <a class="btn stream-plat stream-plat-apple" href="${l(me.apple)}" target="_blank" rel="noopener">Apple Music · Listen</a>
        <a class="btn ghost stream-plat stream-plat-spotify" href="${l(me.spotify)}" target="_blank" rel="noopener">Spotify · Alternative</a>
        <a class="btn stream-plat stream-plat-youtubeMusic" href="${l(me.youtubeMusic)}" target="_blank" rel="noopener">YouTube Music</a>
        <a class="btn stream-plat stream-plat-youtube" href="${l(me.youtube)}" target="_blank" rel="noopener">YouTube</a>
      </div>
      <div class="stream-grid">
        ${yt.map(qa).join("")}
        ${m.map(qa).join("")}
      </div>
      <p class="muted" style="margin-top:12px;font-size:12px">Tidal / Amazon Music omitted until official links are verified. Admin can add more via streaming link fields.</p>
    </div>

    <div class="card">
      <h2>My Music</h2>
      <p class="muted">Purchases stay here even if membership ends.</p>
      ${d.length?`<div class="cover-row">${d.map(k=>`
            <div class="cover-card" style="flex:0 0 120px">
              <img src="${l(k.cover)}" alt="${l(k.title)}" style="width:120px;height:120px" />
              <div class="t">${l(k.title)}</div>
              <div class="muted" style="font-size:11px">Owned · Coming Soon</div>
            </div>`).join("")}</div>`:'<p class="muted">Nothing purchased yet. Buy a Coming Soon cover below (demo · no charge).</p>'}
    </div>

    <div class="card">
      <h2>Buy (demo)</h2>
      <p class="muted">TEST MODE — no charges. Marks the cover as owned in My Music. Audio not available until release.</p>
      <div style="display:flex;flex-direction:column;gap:10px">${c}</div>
    </div>

    <div class="card" id="vault">
      <h2>Vault ${i?'<span class="chip" style="border-color:#2a4a3a;color:#8dffb0">Unlocked · '+l(bn(a))+"</span>":'<span class="chip">Locked</span>'}</h2>
      <p class="muted">Exclusive unreleased tracks &amp; previews for members. Nested under Music — not a bottom-nav tab.</p>

      <div class="vault-grid" style="margin:12px 0">
        ${Xp(i)}
      </div>

      ${i?`<div class="vault-lock" style="border-style:solid;border-color:#2a4a3a;color:var(--tx)">
              ✅ Membership active: <strong>${l(bn(a))}</strong>. Exclusive cards above are unlocked.
              Cancel anytime with the tier button below (demo). Purchased My Music items are kept.
            </div>`:`<div class="vault-lock">
              🔒 Vault locked. Sign in, then tap <strong>Join · TEST MODE</strong> on Skeet+ or Backstage below.
              Locked cards show title/cover only — no exclusive content until you join.
            </div>`}

      <h3 style="margin:16px 0 8px">Membership (TEST MODE)</h3>
      <div class="grid-2">${r}</div>
    </div>

  `;return _("Music & Vault",$,{lead:"Singles, albums, Coming Soon, and member Vault."})}function kn(e){const t=e.querySelector("#youtube-mixes")||e;xa(t),e.querySelectorAll(".mem-toggle").forEach(s=>{s.addEventListener("click",a=>{a.preventDefault();const i=s.dataset.on==="1",n=la(s.dataset.tier,!i);if(n!=null&&n.error)return h("Sign in required — open Profile first");h(i?"Membership cancelled (demo) · My Music purchases kept":`Joined ${s.dataset.tier} (TEST MODE) · Vault unlocked`),vn("#/music"),setTimeout(()=>{var o;return(o=document.getElementById("vault"))==null?void 0:o.scrollIntoView({behavior:"smooth",block:"start"})},40)})}),e.querySelectorAll(".buy-track").forEach(s=>{s.addEventListener("click",a=>{a.preventDefault();const i=Uo(s.dataset.id);if(i!=null&&i.error)return h("Sign in required");h("Added to My Music (demo · no charge)"),vn("#/music")})}),e.querySelectorAll("[data-idb-src]").forEach(async s=>{const a=s.getAttribute("data-idb-src");if(!a)return;const i=await Ea(a);i&&(s.tagName==="IMG"||s.tagName==="AUDIO"||s.tagName==="VIDEO")&&(s.src=i)})}const Pi="pikk_ai_artists_local_drafts_v1",fo=Object.freeze(["Fully AI-generated music","AI-assisted music with human performance","Human-made music with AI artwork only"]),Zp="AI-generated or AI-assisted";function eu(e,t=Date.now()){const s=String(e.artist||"").trim().slice(0,80),a=String(e.track||"").trim().slice(0,120),i=String(e.creation||""),n=String(e.description||"").trim().slice(0,600),o=Number(e.price);if(!s||!a||!fo.includes(i)||!e.confirmed)throw Error("Artist, title, creation type and honest AI disclosure are required.");if(!Number.isFinite(o)||o<0||o>100)throw Error("Preview price must be between $0 and $100.");return{id:"ai-draft-"+t+"-"+Math.random().toString(36).slice(2,8),artist:s,track:a,creation:i,description:n,price:o,createdAt:t,status:"Private local draft · not published",disclosure:Zp}}function _i(e){try{const t=JSON.parse(e.getItem(Pi)||"[]");return Array.isArray(t)?t.filter(s=>s&&typeof s.id=="string").slice(0,40):[]}catch{return[]}}function tu(e,t){const s=[t,..._i(e)].slice(0,40);return e.setItem(Pi,JSON.stringify(s)),s}function su(e,t){const s=_i(e).filter(a=>a.id!==t);return e.setItem(Pi,JSON.stringify(s)),s}function au(){const e=_i(window.localStorage),t=e.length?e.map(s=>`<article class="card ai-artist-draft"><div class="row wrap"><strong>${l(s.track)}</strong><span class="chip">AI · ${l(s.creation)}</span></div><p class="muted">by ${l(s.artist)} · Preview price $${s.price.toFixed(2)}</p><p class="muted">${l(s.status)}</p><button type="button" class="btn ghost ai-artist-delete" data-id="${l(s.id)}">Delete draft</button></article>`).join(""):'<p class="muted">No AI music drafts saved on this device. This is not a public music catalog.</p>';return _("PIKK AI Artists",`
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
       <div class="field"><label for="aiCreationType">How was this made? *</label><select id="aiCreationType" name="creation">${fo.map(s=>`<option value="${l(s)}">${l(s)}</option>`).join("")}</select></div>
       <div class="field"><label for="aiPreviewPrice">Planned purchase price in USD (preview only)</label><input id="aiPreviewPrice" name="price" type="number" min="0" max="100" step=".01" value="1.00" required /></div>
       <div class="field"><label for="aiDescription">Description (optional)</label><textarea id="aiDescription" name="description" maxlength="600"></textarea></div>
       <label class="ai-artist-certify"><input type="checkbox" id="aiArtistCertify" required /> I accurately disclosed the use of AI and confirm I hold or can obtain the necessary commercial rights, including voice and likeness permissions.</label>
       <button type="submit" class="btn primary">Save private AI music draft</button>
     </form>
    </section>
    <section class="card ai-artist-panel"><h3>My private drafts (${e.length})</h3><div class="ai-artist-drafts">${t}</div><p class="muted">A real AI Artist storefront, public discovery feed and licensed downloadable sales require backend, payments and rights verification.</p></section>
   </div>
  </div>`,{lead:"Dedicated AI music category · Disclosure first"})}function iu(e){var t;(t=e.querySelector("#aiArtistForm"))==null||t.addEventListener("submit",s=>{s.preventDefault();const a=s.currentTarget;try{const i=eu({artist:a.elements.artist.value,track:a.elements.track.value,creation:a.elements.creation.value,price:a.elements.price.value,description:a.elements.description.value,confirmed:e.querySelector("#aiArtistCertify").checked});tu(window.localStorage,i),h("Private AI artist draft saved · not published"),location.hash==="#/ai-artists"&&(location.hash="#/ai-artists?updated=1"),window.dispatchEvent(new HashChangeEvent("hashchange"))}catch(i){h(i.message)}}),e.querySelectorAll(".ai-artist-delete").forEach(s=>s.addEventListener("click",()=>{su(window.localStorage,s.dataset.id),window.dispatchEvent(new HashChangeEvent("hashchange"))}))}const Aa="pikk_shield_intake_v1",na=30,Oi=Object.freeze(["Original creator","Licensed with permission","Authorized representative"]);function Nt(e){const t=String(e||"").trim();if(!t)return"";try{const s=new URL(t);return["https:","http:"].includes(s.protocol)?s.href:""}catch{return""}}function nu(e,t=Date.now()){const s=String(e.title||"").trim().slice(0,120),a=String(e.owner||"").trim().slice(0,100),i=String(e.rights||""),n=String(e.contact||"").trim().slice(0,180),o=String(e.notes||"").trim().slice(0,800),r=Nt(e.source);if(!s||!a||!n||!Oi.includes(i)||!e.certified)throw new Error("Complete title, rights holder, contact, ownership basis and certification.");if(String(e.source||"").trim()&&!r)throw new Error("Use a valid http or https link.");return{id:"shield-"+t+"-"+Math.random().toString(36).slice(2,8),type:"rights-declaration",title:s,owner:a,rights:i,contact:n,notes:o,source:r,at:t,status:"Local draft — not submitted"}}function Ft(e){try{const t=JSON.parse(e.getItem(Aa)||"[]");return Array.isArray(t)?t.filter(s=>s&&s.type==="rights-declaration").slice(0,na):[]}catch{return[]}}function ru(e,t){const s=[t,...Ft(e)].slice(0,na);return e.setItem(Aa,JSON.stringify(s)),s}function ou(e,t){const s=Ft(e).filter(a=>a.id!==t);return e.setItem(Aa,JSON.stringify(s)),s}function lu(e){const t=Ft(e).map(s=>({id:String(s.id||""),type:"rights-declaration",title:String(s.title||""),owner:String(s.owner||""),rights:String(s.rights||""),contact:String(s.contact||""),notes:String(s.notes||""),source:Nt(s.source),at:Number.isFinite(s.at)?s.at:null,status:"Local draft — not submitted"}));return JSON.stringify({format:"PIKK Shield local rights drafts",version:1,drafts:t},null,2)}function cu(e,t){if(typeof t!="string"||t.length>65536)throw new Error("Backup file must be under 64 KB.");let s;try{s=JSON.parse(t)}catch{throw new Error("Invalid JSON backup file.")}if(!s||s.format!=="PIKK Shield local rights drafts"||s.version!==1||!Array.isArray(s.drafts)||s.drafts.length>na)throw new Error("Not a supported PIKK Shield backup (maximum 30 drafts).");const a=s.drafts.map((d,c)=>{if(!d||typeof d!="object"||Array.isArray(d))throw new Error("Invalid draft in backup.");for(const p of["id","title","owner","rights","contact","notes","source"])if(typeof d[p]!="string")throw new Error("Invalid draft field: "+p);if(!/^shield-[a-zA-Z0-9-]{1,80}$/.test(d.id)||!d.title.trim()||d.title.length>120||!d.owner.trim()||d.owner.length>100||!Oi.includes(d.rights)||!d.contact.trim()||d.contact.length>180||d.notes.length>800||d.source&&(!Nt(d.source)||Nt(d.source)!==d.source)||d.at!==null&&(!Number.isFinite(d.at)||d.at<0))throw new Error("Backup draft "+(c+1)+" contains invalid fields.");return{id:d.id,type:"rights-declaration",title:d.title.trim(),owner:d.owner.trim(),rights:d.rights,contact:d.contact.trim(),notes:d.notes,source:Nt(d.source),at:d.at??Date.now(),status:"Local draft — not submitted"}}),i=Ft(e),n=new Set(i.map(d=>d.id)),o=[];for(const d of a)n.has(d.id)||(n.add(d.id),o.push(d));const r=o.slice(0,Math.max(0,na-i.length));return r.length&&e.setItem(Aa,JSON.stringify([...r,...i])),{added:r.length,duplicates:a.length-o.length,total:Ft(e).length}}const du=()=>Ft(window.localStorage);function pu(){const e=du(),t=e.length?e.map(s=>{const a=Nt(s.source);return`
    <article class="card shield-entry" data-shield-id="${l(s.id)}" data-shield-search="${l(`${s.title||""} ${s.owner||""}`.toLocaleLowerCase())}">
      <div class="row wrap"><strong>${l(s.title)}</strong><span class="chip">${l(s.status)}</span></div>
      <p class="muted">${l(s.owner)} · ${l(s.rights)}</p>
      <details class="shield-draft-details">
        <summary>Review saved draft details</summary>
        <p class="muted"><strong>Contact:</strong> ${l(s.contact||"Not provided")}</p>
        ${a?`<p class="muted"><strong>Source:</strong> <a href="${l(a)}" target="_blank" rel="noopener noreferrer">Open official source</a></p>`:""}
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
            <div class="field"><label for="shieldRights">Rights basis *</label><select id="shieldRights" name="rights" required>${Oi.map(s=>`<option value="${l(s)}">${l(s)}</option>`).join("")}</select></div>
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
    </div>`,{lead:"Rights declaration preview · No official copyright protection is active yet"})}function uu(e){var i,n,o;(i=e.querySelector("#shieldForm"))==null||i.addEventListener("submit",r=>{r.preventDefault();const d=r.currentTarget;try{const c=nu({title:d.elements.title.value,owner:d.elements.owner.value,rights:d.elements.rights.value,contact:d.elements.contact.value,source:d.elements.source.value,notes:d.elements.notes.value,certified:e.querySelector("#shieldCertify").checked});ru(window.localStorage,c),h("Local rights draft saved — not submitted"),location.hash="#/shield?updated=1",window.dispatchEvent(new HashChangeEvent("hashchange"))}catch(c){h(c.message)}});const t=e.querySelector("#shieldImportFile");(n=e.querySelector("#shieldImportDrafts"))==null||n.addEventListener("click",()=>t==null?void 0:t.click()),t==null||t.addEventListener("change",async()=>{var d;const r=(d=t.files)==null?void 0:d[0];if(r)try{if(r.size>65536)throw new Error("Backup file must be under 64 KB.");const c=await r.text();if(!window.confirm("Restore PIKK Shield drafts from this file? Valid drafts will be merged into this browser, without replacing existing drafts."))return;const p=cu(window.localStorage,c);h(`Restored ${p.added} local draft(s); ${p.duplicates} already saved`),window.dispatchEvent(new HashChangeEvent("hashchange"))}catch(c){h(c.message||"Unable to restore backup")}finally{t.value=""}}),(o=e.querySelector("#shieldExportDrafts"))==null||o.addEventListener("click",()=>{const r=lu(window.localStorage),d=URL.createObjectURL(new Blob([r],{type:"application/json"})),c=document.createElement("a");c.href=d,c.download="pikk-shield-local-drafts.json",document.body.appendChild(c),c.click(),c.remove(),setTimeout(()=>URL.revokeObjectURL(d),1e3),h("Local backup downloaded — store it privately")});const s=e.querySelector("#shieldDraftSearch"),a=[...e.querySelectorAll(".shield-entry")];s==null||s.addEventListener("input",()=>{const r=s.value.trim().toLocaleLowerCase();let d=0;a.forEach(m=>{const g=m.dataset.shieldSearch.includes(r);m.hidden=!g,g&&d++});const c=e.querySelector("#shieldSearchCount");c&&(c.textContent=`Showing ${d} of ${a.length} drafts`);const p=e.querySelector("#shieldSearchEmpty");p&&(p.hidden=d!==0)}),e.querySelectorAll(".shield-delete").forEach(r=>r.addEventListener("click",()=>{var c,p;const d=((p=(c=r.closest(".shield-entry"))==null?void 0:c.querySelector("strong"))==null?void 0:p.textContent)||"this rights draft";window.confirm(`Delete local rights draft "${d}"? This cannot be undone.`)&&(ou(window.localStorage,r.dataset.id),h("Local draft deleted"),window.dispatchEvent(new HashChangeEvent("hashchange")))}))}function mu(){const t=`
    <div class="card merch-hero">
      <p class="kicker">Physical merch</p>
      <h2 style="margin:0 0 8px">Foreign X-Change</h2>
      <p class="muted">All orders, sizes, shipping, and payment happen on
        <a class="fx-link" href="https://foreignx-change.com" target="_blank" rel="noopener">foreignx-change.com</a>
        — not inside PIKK. Product links open the shop homepage until verified per-item URLs are provided.</p>
      <a class="btn primary" href="https://foreignx-change.com" target="_blank" rel="noopener">Visit Foreign X-Change</a>
      <p class="merch-note" style="margin-top:10px">Hats $30 · Tees $65 · Jackets $200 · prices exclude shipping</p>
    </div>
    <div class="merch-grid">${Le.map(s=>`
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
  `;return _("Merch",t,{lead:"Foreign X-Change showcase · 10 products · external checkout only"})}function hu(e){e.querySelectorAll(".shop-link").forEach(r=>{r.addEventListener("click",()=>{h("TEST MODE — opening Foreign X-Change")})});const t=e.querySelector("#merchLightbox"),s=t==null?void 0:t.querySelector("img"),a=t==null?void 0:t.querySelector(".merch-lightbox-close");let i=null;const n=r=>{var d,c;!t||!s||!a||(i=r,s.src=((d=r.querySelector("img"))==null?void 0:d.currentSrc)||r.dataset.zoom,s.alt=((c=r.querySelector("img"))==null?void 0:c.alt)||"Product preview",t.classList.add("show"),t.setAttribute("aria-hidden","false"),a.focus())},o=()=>{t!=null&&t.classList.contains("show")&&(t.classList.remove("show"),t.setAttribute("aria-hidden","true"),s==null||s.removeAttribute("src"),i!=null&&i.isConnected&&i.focus(),i=null)};e.querySelectorAll(".img-wrap").forEach(r=>{const d=()=>n(r);r.addEventListener("click",d),r.addEventListener("keydown",c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),d())})}),t==null||t.addEventListener("click",o),t==null||t.addEventListener("keydown",r=>{r.key==="Escape"?(r.preventDefault(),o()):r.key==="Tab"&&(r.preventDefault(),a==null||a.focus())})}function Zt(e){j(e||"#/profile")}function wn(e){return e.avatar?`<img class="avatar" src="${l(e.avatar)}" alt="" style="object-fit:cover" />`:`<div class="avatar">${l((e.username||"?")[0].toUpperCase())}</div>`}function Os(e,t){return t.length?`<div class="card"><h3>${l(e)}</h3>
    <ul class="list-plain">${t.map(s=>`<li><a href="#/profile/${l(s.id)}"><span>${l(s.username)}</span></a>
           <a class="chip" href="#/profile/${l(s.id)}">View</a></li>`).join("")}</ul></div>`:`<div class="card"><h3>${l(e)}</h3><p class="muted">None yet.</p></div>`}function gu(e){var m,g;const t=((m=e==null?void 0:e.parts)==null?void 0:m[1])||null,{user:s,posts:a}=M(),i=!!(t&&s&&t===s.id&&((g=e==null?void 0:e.query)==null?void 0:g.view)==="public");if(!!t&&(!s||t!==s.id)||i){const f=$t(t);if(!f)return _("Profile",`<div class="card muted">User not found.</div>
         <a class="btn" href="#/profile">Back</a>`);const b=a.filter(C=>C.userId===f.id),y=s&&!i&&(s.following||[]).includes(f.id),v=Vi(f.id),w=Ga(f.id),$=`
      <section class="pikk-profile-cover" aria-label="Public PIKK profile">
        <div class="pikk-profile-cover-inner">
          <span class="pikk-profile-cover-kicker">PIKK · CREATOR PROFILE</span>
          ${wn(f)}
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
          ${i?'<a class="btn primary" href="#/profile">Edit profile</a>':s?`<button class="btn ${y?"ghost":"primary"}" id="pubFollow" data-uid="${l(f.id)}" data-on="${y?"1":"0"}">${y?"Unfollow":"Follow"}</button>`:'<a class="btn primary" href="#/profile">Sign in to follow</a>'}
          <a class="btn ghost" href="#/posts">Posts feed</a>
          ${i?"":'<a class="btn ghost" href="#/profile">My profile</a>'}
        </div>
      </section>
      <div class="card">
        <h3>Posts</h3>
        ${b.length?b.map(C=>`<div style="padding:8px 0;border-bottom:1px solid var(--line)">
                      <div class="muted" style="font-size:11px">${new Date(C.at).toLocaleString()}</div>
                      ${l(C.text)}
                      ${C.image?`<img src="${l(C.image)}" alt="" style="margin-top:8px;border-radius:12px;max-height:200px;object-fit:cover;width:100%" />`:""}
                    </div>`).join(""):'<p class="muted">No posts yet.</p>'}
      </div>
      ${Os("Followers",v)}
      ${Os("Following",w)}
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
      </div>`,{lead:"Free PIKK fan profile · follow · posts · role apps · TEST MODE."});const o=a.filter(f=>f.userId===s.id),r=Vi(s.id),d=Ga(s.id),c=s.memberships||{},p=`
    <section class="pikk-profile-cover" aria-label="Your PIKK profile">
      <div class="pikk-profile-cover-inner">
        <span class="pikk-profile-cover-kicker">PIKK · MY PROFILE</span>
        ${wn(s)}
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

    ${Os("Followers",r)}
    ${Os("Following",d)}

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
        <span class="chip">${ae()?"role=admin":"role=fan"}</span>
        <button class="btn ${ae()?"ghost":"primary"}" id="toggleAdmin">${ae()?"Revoke admin":"Enable Demo Admin"}</button>
        <a class="btn" href="#/admin">Open Admin</a>
      </div>
    </div>
  `;return _("Profile",p)}function fu(e){var t,s,a,i,n,o;(t=e.querySelector("#signinBtn"))==null||t.addEventListener("click",()=>{var d;const r=(d=e.querySelector("#signinName"))==null?void 0:d.value;Kt(r),h("Signed in"),Zt("#/profile")}),(s=e.querySelector("#signinName"))==null||s.addEventListener("keydown",r=>{var d;r.key==="Enter"&&((d=e.querySelector("#signinBtn"))==null||d.click())}),(a=e.querySelector("#signoutBtn"))==null||a.addEventListener("click",()=>{Go(),h("Signed out"),Zt("#/profile")}),(i=e.querySelector("#saveProfile"))==null||i.addEventListener("click",()=>{var d,c;if(Vo({bio:(d=e.querySelector("#editBio"))==null?void 0:d.value,avatar:(c=e.querySelector("#editAvatar"))==null?void 0:c.value}).error)return h("Sign in required");h("Profile saved"),Zt("#/profile")}),(n=e.querySelector("#pubFollow"))==null||n.addEventListener("click",r=>{const d=r.currentTarget,c=d.dataset.uid,p=d.dataset.on==="1";if((p?da(c):ca(c)).error)return h("Sign in to follow");h(p?"Unfollowed":"Following"),Zt("#/profile/"+c)}),(o=e.querySelector("#toggleAdmin"))==null||o.addEventListener("click",()=>{const r=!ae();if(Ss(r).error)return h("Sign in required");h(r?"Demo Admin enabled":"Admin revoked"),Zt("#/profile")})}function Sn(){j("#/clippers")}const vu={pending:"Pending",approved:"Approved",rejected:"Rejected",waitlisted:"Waitlisted"};function bu(){const{clipperApps:e,user:t}=M(),s=e.length,a=e.filter(o=>o.status==="approved").length,i=e.filter(o=>o.status==="pending").length,n=`
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
        <div><span>Pending review</span><strong>${i}</strong><small>Demo review queue</small></div>
        <div><span>Approved</span><strong>${a}</strong><small>Demo status only</small></div>
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
                <span class="chip">${l(vu[o.status]||o.status)}</span>
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
  `;return _("Clippers",n,{lead:"Apply → admin approve → paid campaigns & tracked links."})}function yu(e){var t;(t=e.querySelector("#cSubmit"))==null||t.addEventListener("click",()=>{var i,n,o,r,d,c,p,m,g,f,b,y,v,w,$,C,k,P,T;const s=(n=(i=e.querySelector("#cName"))==null?void 0:i.value)==null?void 0:n.trim(),a=(r=(o=e.querySelector("#cEmail"))==null?void 0:o.value)==null?void 0:r.trim();if(!s||!a)return h("Name and email required");Wo({name:s,email:a,age:(d=e.querySelector("#cAge"))==null?void 0:d.value,tiktok:(c=e.querySelector("#cTiktok"))==null?void 0:c.value,instagram:(p=e.querySelector("#cIg"))==null?void 0:p.value,youtube:(m=e.querySelector("#cYt"))==null?void 0:m.value,x:(g=e.querySelector("#cX"))==null?void 0:g.value,facebook:(f=e.querySelector("#cFb"))==null?void 0:f.value,followers:(b=e.querySelector("#cFollowers"))==null?void 0:b.value,views:(y=e.querySelector("#cViews"))==null?void 0:y.value,avgViews:(v=e.querySelector("#cAvgViews"))==null?void 0:v.value,engagement:(w=e.querySelector("#cEngage"))==null?void 0:w.value,frequency:($=e.querySelector("#cFreq"))==null?void 0:$.value,niche:(C=e.querySelector("#cNiche"))==null?void 0:C.value,samples:(k=e.querySelector("#cSamples"))==null?void 0:k.value,analyticsNotes:(P=e.querySelector("#cAnalytics"))==null?void 0:P.value,applicantUserId:((T=M().user)==null?void 0:T.id)||null}),h("Application saved for admin review"),Sn()}),e.querySelectorAll(".clip-status").forEach(s=>{s.addEventListener("click",()=>{zn(s.dataset.id,s.dataset.status),h("Marked "+s.dataset.status),Sn()})})}const ku={rose:"🌹","big-love":"💖","turn-up":"🔥","cash-rain":"💵","bottle-pop":"🍾","money-gun":"💸","diamond-drip":"💎","foreign-whip":"🚗",helicopter:"🚁","private-jet":"✈️","dbs-crown":"👑","dbs-universe":"🌌","battle-win":"✅","battle-crown":"👑","battle-vs":"⚔️","battle-fire":"🔥"},wu={rose:"/gifts/rose.svg","big-love":"/gifts/big-love.svg","turn-up":"/gifts/turn-up.svg","cash-rain":"/gifts/cash-rain.svg","bottle-pop":"/gifts/bottle-pop.svg","money-gun":"/gifts/money-gun.svg","diamond-drip":"/gifts/diamond-drip.svg","foreign-whip":"/gifts/foreign-whip.svg",helicopter:"/gifts/helicopter.svg","private-jet":"/gifts/private-jet.svg","dbs-crown":"/gifts/dbs-crown.svg","dbs-universe":"/gifts/dbs-universe.svg","battle-win":"/gifts/battle-win.svg","battle-crown":"/gifts/battle-crown.svg","battle-vs":"/gifts/battle-vs.svg","battle-fire":"/gifts/battle-fire.svg"},$n="gift-sticker";function qs(e){return String(e??"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function Su(e,t){return t&&typeof t=="object"&&t.className?t.className:`${$n} ${$n}--${e}`}function qi(e,t={}){const s=String(e||""),a=Su(s||"unknown",t),i=ku[s]||"🎁",n=wu[s]||null;return n?{src:n,className:a,emoji:i,html:`<img class="${qs(a)}" src="${qs(n)}" alt="" width="48" height="48" decoding="async" draggable="false" data-gift-slug="${qs(s)}" />`}:{src:null,className:a,emoji:i,html:`<span class="${qs(a)} gift-sticker--emoji" aria-hidden="true">${i}</span>`}}function it(e,t){return qi(e,t&&typeof t=="object"&&typeof t!="function"?t:{}).html}const $u=Object.freeze([{id:"women",title:"Women's Rooms",icon:"💗",description:"Conversations, style, wellness, business and community",names:["Ladies Lounge","Girl Talk","Tea Time","What's the Word?","Who Did What?","Beauty Bar","Girls' Night In","Love & Standards","Boss Ladies","Fashion & Fits","Ladies Only Live","Women in Business","Women's Mental Wellness","Dating From Her Side","The Hustle Room: Women"]},{id:"men",title:"Men's Rooms",icon:"🫱🏻‍🫲🏿",description:"Brotherhood, relationships, business, wellness and hobbies",names:["The Man Cave","The Barbershop","Fellas' Night","Men's Corner","Men in Business","Cars & Motors","Fitness & Brotherhood","Fatherhood","Men's Mental Wellness","Dating From His Side","Sports Debate","Gaming Brotherhood","Men's Style","The Hustle Room","Brotherhood & Mentorship"]},{id:"coed",title:"Coed Communities",icon:"🌐",description:"Shared conversations, learning and networking for everyone",names:["Let's Talk","The Hangout","Business Connect & Wealth Academy","Couples Corner","Conspiracy Room","Game Room","Why Are You Single?","What Are You Looking For?","Single & Ready to Mingle","City Connect"]},{id:"dating",title:"Singles & Dating",icon:"💘",description:"Opt-in conversations, introductions and relationship topics",names:["Looking for My Match","The Flirt Zone","Speed Connections","Poly Connections","Date Night Live","Love & Advice"]},{id:"sports",title:"Sports",icon:"🏆",description:"A separate place for every major sport",names:["Sports Central","Basketball","Football","Soccer","Baseball","Hockey"]},{id:"talent",title:"Music & Talent",icon:"🎙️",description:"Rappers, singers, bands, producers and city competitions",names:["The Booth","Producer Room","The Stage","City Takeover"]},{id:"news",title:"News & Innovation",icon:"📰",description:"World events, markets and new ideas",names:["World News","Economy & Markets","Startups & Innovation","Tech Talk","Money Talk"]},{id:"general",title:"General Live",icon:"📡",description:"IRL, gaming, shows, comedy, food, fitness and more",names:["Just Chatting","Gaming","Music","IRL","Sports","Creative","Podcasts & Talk Shows","Food & Cooking","Fitness","Beauty & Fashion","Business & Money Talk","Dating & Connections","Education","News & Commentary","Comedy & Entertainment","Comedy & Roast Battles","Creator Spotlight"]}]);function xu(e,t){const s=new Map(e.map(r=>[r[0],r])),a=new Set,i=([r,d,c])=>'<a class="live-cat-card pikk-live-room-card" href="'+(r==="Comedy & Roast Battles"?"#/roast-arena":"#/live?tab=channels&category="+encodeURIComponent(r))+'" aria-label="'+t(r)+': browse channels"><span class="pikk-live-room-emoji" aria-hidden="true">'+t(c)+"</span><strong>"+t(r)+'</strong><p class="muted">'+t(d)+'</p><span class="pikk-live-room-action">Browse channels <span aria-hidden="true">›</span></span></a>',n=$u.map(r=>{const d=r.names.map(c=>s.get(c)).filter(Boolean);return d.forEach(c=>a.add(c[0])),'<details class="pikk-live-directory-group" id="pikk-live-group-'+r.id+'"'+(r.id==="coed"?" open":"")+'><summary class="pikk-live-directory-summary"><span class="pikk-live-directory-icon" aria-hidden="true">'+r.icon+'</span><span class="pikk-live-directory-label"><strong>'+t(r.title)+"</strong><small>"+t(r.description)+'</small></span><span class="pikk-live-directory-count">'+d.length+' rooms</span><span class="pikk-live-directory-chevron" aria-hidden="true">⌄</span></summary><div class="live-cat-cards pikk-live-directory-cards">'+d.map(i).join("")+"</div></details>"}),o=e.filter(r=>!a.has(r[0]));return o.length&&n.push('<details class="pikk-live-directory-group" open><summary class="pikk-live-directory-summary"><span class="pikk-live-directory-icon" aria-hidden="true">✨</span><span class="pikk-live-directory-label"><strong>More Live</strong><small>Additional topics</small></span><span class="pikk-live-directory-count">'+o.length+' rooms</span><span class="pikk-live-directory-chevron" aria-hidden="true">⌄</span></summary><div class="live-cat-cards pikk-live-directory-cards">'+o.map(i).join("")+"</div></details>"),'<div class="pikk-live-directory" aria-label="Live category groups">'+n.join("")+"</div>"}function vo(){const e=(Ve().query||{}).tab;return e==="live"||e==="channels"?"channels":e==="following"||e==="categories"?e:"channels"}function ve(){const e=vo();j(e==="channels"?"#/live":`#/live?tab=${e}`)}function ye(e){return"$"+Number(e||0).toFixed(2)}function Re(e){const t=Number(e)||0;return t>=1e3?(t/1e3).toFixed(t>=1e4?0:1).replace(/\.0$/,"")+"K":String(t)}function Eu(e="live"){return`
    <nav class="live-cat-chips" aria-label="Live categories">
      ${[{id:"live",href:"#/live?tab=channels",label:"Live"},{id:"openmic",href:"#/openmic",label:"Open Mic / Talent Discovery (24/7)"},{id:"spotlight",href:"#/spotlight",label:"Spotlight (24/7)"},{id:"viral",href:"#/viral-live",label:"Viral Live · Preview"}].map(a=>{const i=a.id===e?" on":"",n=a.id===e?' aria-current="page"':"";return`<a class="live-cat-chip${i}" href="${a.href}"${n}>${l(a.label)}</a>`}).join("")}
    </nav>`}function Au(e="channels"){return`
    <nav class="live-disc-tabs" aria-label="Live discovery">
      ${[{id:"following",href:"#/live?tab=following",label:"Following"},{id:"clips",href:"#/shorts",label:"Clips"},{id:"channels",href:"#/live?tab=channels",label:"Channels"},{id:"categories",href:"#/live?tab=categories",label:"Categories"}].map(a=>{const i=a.id===e?" on":"",n=a.id===e?' aria-current="page"':"";return`<a class="live-disc-tab${i}" href="${a.href}" data-tab="${a.id}"${n}>${l(a.label)}</a>`}).join("")}
    </nav>`}function bo(e={}){const t=br(),s=t.chipLabel||"House · Music Video",a=t.embed?Je(t.embed,"rel=0"):"",i=e.title||"House catalog · while stages are quiet";return`
    <div class="card sp-house live-house-teaser" style="margin-top:12px">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center">
        <div class="chip">${l(s)}</div>
        <span class="chip">TEST MODE</span>
      </div>
      <p class="muted" style="margin:8px 0 0;font-size:12px">${l(i)} · original YouTube · not a fake live act</p>
      ${a?`<div class="sp-house-embed hero-video" style="margin-top:10px">
               <iframe src="${l(a)}" title="${l(t.title)}" allowfullscreen loading="lazy"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
             </div>`:""}
      <div class="sp-now-title" style="margin-top:10px">${l(t.title)}</div>
      <div class="muted" style="font-size:12px">${l(t.artist||"DatBoiSkeet")} · ${l(t.note||"")}</div>
      <div class="row wrap" style="gap:8px;margin-top:10px">
        <a class="btn ghost" href="#/spotlight">24/7 Spotlight</a>
        <a class="btn ghost" href="#/openmic">Open Mic</a>
        ${t.youtube?`<a class="btn ghost" href="${l(t.youtube)}" target="_blank" rel="noopener">YouTube</a>`:""}
      </div>
    </div>`}function Cu(e){const t=e?Ga(e.id):[],s=new Set(t.map(o=>o.id)),a=Jt().filter(o=>s.has(o.hostId)),i=t.length?t.slice(0,12).map(o=>`<a class="chip" href="#/profile">${l("@"+(o.username||o.id))}</a>`).join(""):'<span class="muted">Nobody followed yet · DEMO</span>';let n;if(!e)n=`
      <p class="muted">Sign in to see lives from accounts you follow.</p>
      <a class="btn primary" href="#/profile">Demo profile</a>
      <p class="chip" style="margin-top:10px">TEST MODE · Following is local demo graph</p>`;else if(!a.length)n=`
      <p class="muted" style="margin:0 0 8px">
        None of the people you follow are live right now (demo filter on seeded Hot lives).
      </p>
      <div class="row wrap" style="gap:6px;margin-bottom:10px">${i}</div>
      <a class="btn ghost" href="#/live?tab=channels">Browse Live channels</a>
      <p class="chip" style="margin-top:10px">TEST MODE · not a scrape</p>
      ${bo({title:"Meanwhile — DatBoiSkeet house catalog on 24/7 stages"})}`;else{const o=a.map(r=>`
        <article class="hot-live-card${r.house?" is-house":""}" data-live-id="${l(r.id)}">
          <div class="live-hoodie" aria-label="Live · ${l(Re(r.viewers))} watching">
            <span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span>
            <span class="live-hoodie-viewers">${l(Re(r.viewers))}</span>
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
      <div class="row wrap" style="gap:6px;margin-bottom:10px">${i}</div>
      <div class="hot-lives-track">${o}</div>`}return`
    <div class="card live-disc-panel" id="liveTabFollowing" data-panel="following">
      <h3 style="margin:0 0 8px">Following</h3>
      ${n}
    </div>`}const Tu=[["The Booth","Rappers, freestyles, hip-hop performances and song previews","🎙️"],["The Stage","Singers, bands, vocalists and instrumental performances","🎤"],["City Takeover","City-versus-city showcases, performances and local pride challenges","🌆"],["Producer Room","Beat showcases, producer collaborations and beat competitions","🎹"],["Ladies Lounge","Women-centered girl talk, beauty, fashion, relationships and community","💅"],["Girl Talk","Everyday conversations, friendships and women’s discussions","💬"],["Tea Time","Celebrity gossip, trending stories and entertainment drama","🫖"],["Who Did What?","Viral moments, celebrity controversies and debates","👀"],["Boss Ladies","Women entrepreneurs, business networking and financial growth","👑"],["Fashion & Fits","Fashion, outfits and personal style","👗"],["Ladies Only Live","Women-centered livestreams and hosted events","🎥"],["What's the Word?","Entertainment news, celebrity conversations, viral moments and trending discussions","🗣️"],["Women in Business","Women entrepreneurs, founders, business networking and mentorship","👩‍💼"],["The Man Cave","Men’s social conversations, sports and community","🤝"],["Men in Business","Men’s entrepreneurship, networking, mentorship and partnerships","👔"],["Girls' Night In","Women-centered social nights, games and discussions","🌙"],["Beauty Bar","Beauty, hair, makeup and skincare conversations","💄"],["Love & Standards","Dating, relationships and boundaries","💗"],["Women's Mental Wellness","Women-centered stress, confidence, emotional wellbeing and peer support","🧠"],["Dating From Her Side","Women-centered dating experiences, relationships and personal standards","💞"],["The Hustle Room: Women","Women-centered side hustles, extra income ideas and building businesses","📈"],["The Barbershop","Men-centered everyday debates, conversation and community","💈"],["Fellas' Night","Men-centered social events and games","🌃"],["Men's Corner","Men-centered life, relationships and personal development","🧢"],["Cars & Motors","Cars, motorcycles, customization and auto culture","🚘"],["Fitness & Brotherhood","Fitness, wellbeing and peer support","💪"],["Fatherhood","Parenting, family responsibilities and raising children","👨‍👧"],["Men's Mental Wellness","Men-centered stress, wellbeing and peer support","🧠"],["Dating From His Side","Men-centered dating experiences and relationship advice","💬"],["Sports Debate","Sports arguments, player comparisons and predictions","🏅"],["Gaming Brotherhood","Gaming, tournaments and player communities","🎮"],["Men's Style","Fashion, grooming, watches and fragrances","⌚"],["The Hustle Room","Careers, side businesses and professional growth","📈"],["Brotherhood & Mentorship","Intergenerational mentoring and peer support","🤝"],["Sports Central","All-sports discussion, fan talk and analysis","🏆"],["Basketball","Basketball discussion and fan streams","🏀"],["Football","American football discussion and fan streams","🏈"],["Soccer","Soccer discussion and fan streams","⚽"],["Baseball","Baseball discussion and fan streams","⚾"],["Hockey","Hockey discussion and fan streams","🏒"],["Tech Talk","AI, gadgets, apps and technology","💻"],["Startups & Innovation","Building businesses, technology and new ideas","🚀"],["World News","International events and global news discussions","🌍"],["Economy & Markets","Inflation, housing, jobs, interest rates and markets","📈"],["Let's Talk","Open conversations, questions and community discussion","🗣️"],["The Hangout","Conversations and social live streams","💬"],["Creator Spotlight","Featured creators and emerging talent","🌟"],["Game Room","Gameplay, tournaments and community games","🎮"],["Why Are You Single?","Coed conversations about single life, dating experiences and relationship challenges","❓"],["What Are You Looking For?","Coed conversations about dating intentions, values and ideal partners","💭"],["Single & Ready to Mingle","Opt-in coed social conversations and introductions for singles","💘"],["Looking for My Match","Opt-in dating live conversations","❤️"],["The Flirt Zone","Dating and connection conversations","💕"],["Speed Connections","Fast-paced introductions and connections","⏱️"],["Poly Connections","Consensual nonmonogamy discussions and connections","🔗"],["Couples Corner","Couples-versus-couples games, trivia, partner challenges, friendly competitions and rematches","💞"],["Date Night Live","Live dating conversations and activities","🌹"],["Love & Advice","Relationship conversations and advice","💌"],["Business Connect & Wealth Academy","Coed business networking and beginner education in entrepreneurship, credit, stocks, crypto, real estate and Roth IRAs","💼"],["City Connect","Meet people by city for friendship, dating, business networking and local conversations","📍"],["Conspiracy Room","Open discussion of theories and claims","🧩"],["Money Talk","Stocks, housing, crypto and financial discussions","💰"],["Just Chatting","Conversations, Q&A and hanging out","💬"],["Gaming","Gameplay, tournaments and community games","🎮"],["Music","Artists, DJs, producers and listening sessions","🎵"],["IRL","Everyday life, travel and outdoor streams","🌎"],["Sports","Sports talk and watch-along discussions","🏀"],["Creative","Art, design, production and making things","🎨"],["Podcasts & Talk Shows","Interviews, panels and conversations","🎙️"],["Food & Cooking","Recipes, kitchens and food reviews","🍳"],["Fitness","Training, wellness and movement","💪"],["Beauty & Fashion","Style, hair, makeup and fashion","✨"],["Business & Money Talk","Entrepreneurs, careers and money discussions","💼"],["Dating & Connections","Opt-in conversations and dating live rooms","❤️"],["Education","Tutorials, learning and study sessions","📚"],["News & Commentary","Current events and opinions","📰"],["Comedy & Entertainment","Comedy, variety and entertainment","🎭"],["Comedy & Roast Battles","1v1, tag team, open mic and tournaments","🎤"]];function Du(){return`
    <div class="card live-disc-panel" id="liveTabCategories" data-panel="categories">
      <div class="pikk-live-directory-hero">
        <span class="pikk-live-directory-kicker">PIKK LIVE · DISCOVER</span>
        <h3>Find your room.</h3>
        <p>Choose a community, explore a sport or find a conversation. Open a section to browse its topics.</p>
        <span class="pikk-live-directory-note">Discovery categories filter channels; a category is not a hosted room or a live stream. No active stream? You'll see an empty result.</span>
      </div>
      ${xu(Tu,l)}
      <h3 style="margin:20px 0 8px">PIKK 24/7 Stages</h3>
      <div class="live-cat-cards">
        <a class="live-cat-card" href="#/openmic"><strong>Open Mic / Talent Discovery</strong><span class="chip">24/7 stage</span><p class="muted">Join the performance queue</p></a>
        <a class="live-cat-card" href="#/spotlight"><strong>Spotlight Live</strong><span class="chip">24/7 stage</span><p class="muted">Keep Going votes and creator performances</p></a>
        <a class="live-cat-card" href="#/shorts"><strong>Clips / Shorts</strong><span class="chip">Watch</span><p class="muted">Watch short videos</p></a>
        <a class="live-cat-card" href="#/viral-live"><strong>PIKK Viral Live</strong><span class="chip">Preview · not broadcasting</span><p class="muted">Explore the future 24/7 trending channel and original video sources</p></a>
      </div>
    </div>`}function Lu(e){return e!=null&&e.spikedAt?Date.now()-Number(e.spikedAt)<15*60*1e3:!1}function Mu(e=""){const t=Jt();return`
    <div class="card hot-lives-rail" id="hotLivesRail">
      <div class="row wrap" style="justify-content:space-between;align-items:baseline;gap:8px">
        <h3 style="margin:0">Hot lives · Top streamers</h3>
        <span class="chip">score · viewers + engagement</span>
      </div>
      <p class="muted" style="margin:6px 0 10px;font-size:12px">TEST MODE · seeded demo · not third-party scrape · house + community</p>
      <div class="hot-lives-track">
        ${(e?t.filter(i=>String(i.category||"").toLowerCase()===e.toLowerCase()):t).map(i=>{const n=Lu(i);return`
      <article class="hot-live-card${n?" is-hot":""}${i.house?" is-house":""}" data-live-id="${l(i.id)}">
        <div class="live-hoodie" aria-label="Live · ${l(Re(i.viewers))} watching">
          <span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span>
          <span class="live-hoodie-viewers" title="${l(Re(i.viewers))} watching">${l(Re(i.viewers))}</span>
        </div>
        <div class="hot-live-body">
          <div class="hot-live-host">@${l(i.hostName)}</div>
          <div class="hot-live-title">${l(i.title)}</div>
          <div class="hot-live-chips">
            <span class="chip">${l(Re(i.viewers))} watching</span>
            ${i.house?'<span class="chip chip-ok">House</span>':""}
            ${n?'<span class="chip live-chip"><span class="dot" aria-hidden="true"></span> HOT</span>':""}
          </div>
          <div class="hot-live-actions row wrap">
            <button type="button" class="btn ghost hot-live-watch" data-id="${l(i.id)}" data-host="${l(i.hostName)}">Watch demo</button>
            <button type="button" class="btn hot-live-spike" data-id="${l(i.id)}">Simulate spike</button>
          </div>
        </div>
      </article>`}).join("")||'<p class="muted">No matching live channels in this category yet.</p>'}
      </div>
    </div>`}function Iu(e){const t=String(e||"queued");return t==="playing"?'<span class="chip live-chip">Playing</span>':t==="played"?'<span class="chip chip-ok">Played</span>':t==="skipped"?'<span class="chip">Skipped</span>':'<span class="chip">Queued</span>'}function $e(e){const t=Number(e)||0;return t>=1e3?(t/1e3).toFixed(t%1e3===0?0:1).replace(/\.0$/,"")+"K":String(t)}function Pu(e,t){if(!e||e.endedAt)return"";const s=ma(),a=ul(),i=ml(e.id).slice(0,12),n=a.map(c=>{const p=c.coins>=dl,m=s>=c.coins;return`
      <button type="button" class="lg-gift" data-slug="${l(c.slug)}" data-coins="${c.coins}" data-confirm="${p?"1":"0"}" title="${l(c.animation)}">
        <span class="lg-gift-emoji">${it(c.slug)}</span>
        <span class="lg-gift-name">${l(c.name)}</span>
        <span class="lg-gift-price">${l($e(c.coins))} · ${ye(c.usd)}</span>
        ${m?'<span class="chip">Ready</span>':'<span class="chip">Need demo coins</span>'}
        ${p?'<span class="chip lg-confirm-chip">Confirm</span>':""}
      </button>`}).join(""),o=pa.map(c=>`<button type="button" class="btn ghost lg-buy" data-coins="${c.coins}">${l($e(c.coins))} · ${ye(c.usd)}</button>`).join(""),r=i.length?i.map(c=>`<li class="lg-hist-row">
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
    </div>`}function _u(e,t){var d;if(!e||e.endedAt)return"";const s=!!(t&&e.hostId===t.id),a=Number(((d=M().wallet)==null?void 0:d.balance)||0),i=ri(e.id),n=Xn.map(c=>{const p=c.save>0?`<span class="chip chip-ok lsr-save">Save $${c.save}</span>`:"";return`
      <button type="button" class="lsr-pack" data-pack="${c.pack}" data-price="${c.price}" aria-pressed="false">
        <strong>${l(c.label)}</strong>
        <span class="lsr-pack-price">${ye(c.price)}</span>
        ${p}
      </button>`}).join(""),o=i.length?i.map(c=>{const p=s?`<div class="row wrap lsr-host-acts" style="gap:6px">
                 ${c.status==="queued"||c.status==="playing"?`<button type="button" class="btn primary lsr-play" data-rid="${l(c.requestId)}" data-si="${c.songIndex}">${c.status==="playing"?"Mark played":"Play"}</button>
                        <button type="button" class="btn ghost lsr-skip" data-rid="${l(c.requestId)}" data-si="${c.songIndex}">Skip</button>`:""}
               </div>`:"";return`
          <li class="lsr-queue-row" data-status="${l(c.status)}">
            <div class="lsr-queue-main">
              <strong>${l(c.title)}</strong>
              <span class="muted" style="font-size:12px">@${l(c.username)} · ${l(String(c.pack))}‑pack</span>
            </div>
            ${Iu(c.status)}
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
          <span class="chip">Wallet ${ye(a)}</span>
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
    </div>`}function Ou(e){var r;const t=e.endedAt?Math.max(0,Math.floor((e.endedAt-e.startedAt)/1e3)):Math.max(0,Math.floor((Date.now()-e.startedAt)/1e3)),s=String(Math.floor(t/60)).padStart(2,"0"),a=String(t%60).padStart(2,"0"),i=Re(e.viewers||0),n=e.endedAt?`<div class="live-stage-meta"><span class="chip">Ended · ${F(e.endedAt)}</span></div>`:`<div class="live-hoodie live-hoodie--stage" aria-label="Live · ${l(i)} watching">
          <span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span>
          <span class="live-hoodie-viewers" id="liveViewers" title="${l(i)} watching">${l(i)}</span>
        </div>
        <div class="live-stage-meta">
          <span class="chip">${s}:${a}</span>
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
        <span class="chip">Tips ${ye(e.tipsTotal)}</span>
        <span class="chip">Gifts ${ye(e.giftsTotal||0)}</span>
        <span class="chip">Song reqs (see queue)</span>
        <span class="chip">Coins ${$e(ma())}</span>
        <span class="chip">Wallet ${ye(((r=M().wallet)==null?void 0:r.balance)||0)}</span>
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
  `}function qu(e){const t=Number(e==null?void 0:e.targetAmount)||0;return t<=0?0:Math.min(100,Math.round((Number(e.raised)||0)/t*100))}function Nu(e){const t=Math.max(0,Number(e)-Date.now());if(t<=0)return"Ended · 24h window over";const s=Math.floor(t/36e5),a=Math.floor(t%36e5/6e4);return s>=1?`Resets in ${s}h ${a}m`:`Resets in ${a}m`}function Bu(e,t){if(!e||e.endedAt)return"";const s=e.hostId,a=vl(s),i=!!(t&&s&&t.id===s),n=ma();if(!a)return i?`
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
      </div>`;const o=qu(a),r=!!(a.completedAt||o>=100),d=o>=100?"Complete":o>=70?"Close":o>=30?"On the way":"Far",c=[50,100,250].map(m=>`<button type="button" class="btn ghost live-goal-donate" data-goal-id="${l(a.id)}" data-coins="${m}" title="≈ $${(m/50).toFixed(0)}">Donate ${m} coins</button>`).join(""),p=i?`<details class="live-goal-edit" style="margin-top:10px">
        <summary class="muted" style="cursor:pointer;font-size:12px">Edit goal (new 24h window)</summary>
        <div class="field" style="margin-top:8px"><label>Goal name</label>
          <input id="liveGoalName" maxlength="80" value="${l(a.name)}" /></div>
        <div class="field"><label>Goal amount ($)</label>
          <input id="liveGoalAmt" type="number" min="1" step="1" value="${l(String(a.targetAmount))}" /></div>
        <button type="button" class="btn" id="liveGoalSave">Save · reset 24h</button>
      </details>`:"";return`
    <div class="card live-daily-goal" id="liveDailyGoal">
      <div class="live-goal-head">
        <h3 style="margin:0">Daily goal · ${l(a.name)}</h3>
        <span class="chip${r?" chip-ok":""}">${r?"Goal met":l(d)}</span>
      </div>
      <p class="muted" style="margin:4px 0 8px;font-size:12px">${l(Nu(a.endsAt))} · @${l(a.hostName||e.hostName)} · TEST MODE</p>
      <div class="live-goal-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${o}" aria-label="Goal progress">
        <div class="live-goal-fill" style="width:${o}%"></div>
      </div>
      <p class="live-goal-amounts" style="margin:8px 0 10px">
        <strong>${ye(a.raised)}</strong> / ${ye(a.targetAmount)}
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
      <form class="live-goal-custom-form" data-goal-id="${l(a.id)}" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;align-items:end">
        <label style="flex:1;min-width:125px">Custom coins<input type="number" class="live-goal-custom-coins" inputmode="numeric" min="1" max="1000000" step="1" required placeholder="Enter coins" style="width:100%" /></label>
        <button class="btn primary" type="submit">Donate custom</button>
      </form>
      <p class="muted" style="margin:8px 0 0;font-size:11px">50 / 100 / 250 coins ≈ $1 / $2 / $5 · 100 coins = $2 · TEST MODE</p>
      ${p}
    </div>`}function Ru(e){return e?`
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
      </div>`}function ju(e){return e.length?`
    <div class="card">
      <h3>Recent streams (this device)</h3>
      <ul class="list-plain">
        ${e.slice(0,8).map(t=>`<li>
              <span><strong>${l(t.title)}</strong><br/><span class="muted" style="font-size:12px">@${l(t.hostName)} · ${F(t.endedAt||t.startedAt)} · tips ${ye(t.tipsTotal)}</span></span>
              <span class="chip">${t.endedAt?"Ended":"Live"}</span>
            </li>`).join("")}
      </ul>
    </div>`:""}function Fu(e){if(!e||e.endedAt)return"";const t=hl(10),s=t.length?t.map((r,d)=>{const c=it(r.lastSlug||"rose",{className:"gift-sticker gift-sticker--xs"});return`<div class="live-obar-cell" title="${l(r.username)} · ${ye(r.usd)} today">
            <span class="live-obar-rank">${d+1}</span>
            ${c}
            <span class="live-obar-name">${l(r.username)}</span>
          </div>`}).join(""):'<div class="live-obar-empty muted">No gifters yet today</div>',a=wi(10),i=a.length?a.map((r,d)=>{const c=it("battle-win",{className:"gift-sticker gift-sticker--xs"});return`<div class="live-obar-cell" title="${l(r.username)} · rest of day">
            <span class="live-obar-rank">${d+1}</span>
            ${c}
            <span class="live-obar-name">${l(r.username)}</span>
          </div>`}).join(""):'<div class="live-obar-empty muted">No winners yet today</div>',n=ri(e.id).find(r=>r.status==="playing");let o="";if(n){const r=n.title||"Song";o=`
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
        <div class="live-obar-track">${i}</div>
        <span class="chip live-obar-chip">1–10 · day</span>
      </div>
      ${o}
    </div>`}function Ku(e){const t=Fl();if(!t)return"";const s=it(t.giftSlug||"rose",{className:"gift-sticker"}),i=e&&e.id===t.fromUserId?`<p class="muted" style="margin:8px 0 0;font-size:12px">You triggered this · others can Challenge you · TEST MODE</p>
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
        ${i}
        <p class="chip" style="margin-top:8px">TEST MODE · broadcast demo · invitations respect prefs</p>
      </div>
    </div>`}function Gu(e){var i,n,o,r,d,c,p,m;ki();const t=bi();if(!t||!e)return"";if(t.status==="active"||t.status==="ended"){const g=Math.max(0,Number(t.scoreA)||0),f=Math.max(0,Number(t.scoreB)||0),b=g+f,y=t.status==="active"?Math.max(0,Math.ceil((Number(t.endsAt)-Date.now())/1e3)):0,v=t.winnerName?"@"+l(t.winnerName):"Tie";return`
      <section class="card live-battle-scoreboard" aria-label="Live Gift Battle scoreboard">
        <div class="row wrap" style="justify-content:space-between;align-items:center">
          <strong>⚔️ PIKK Live Battle</strong>
          <span class="chip" id="liveBattleTimer" data-ends-at="${Number(t.endsAt)||0}">${t.status==="active"?y+"s left":"Finished"}</span>
        </div>
        <div class="row" style="justify-content:space-between;gap:12px;margin:12px 0">
          <div><strong>@${l(((i=t.challenger)==null?void 0:i.name)||"Challenger")}</strong><div>${Re(g)} demo points</div></div>
          <strong>VS</strong>
          <div style="text-align:right"><strong>@${l(((n=t.opponent)==null?void 0:n.name)||"Opponent")}</strong><div>${Re(f)} demo points</div></div>
        </div>
        <div class="live-battle-score-track" role="progressbar" aria-label="Challenger share of battle points" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${b?Math.round(g/b*100):50}" style="height:10px;background:var(--blue);border-radius:10px;overflow:hidden">
          <div style="width:${b?Math.round(g/b*100):50}%;height:100%;background:var(--acc)"></div>
        </div>
        ${t.status==="ended"?`<p class="live-battle-winner" style="font-weight:800;margin-top:10px">🏆 ${v} · Battle complete</p>`:'<p class="muted" style="margin-top:10px">Scores update with demo gifts · no real money</p>'}
        <a href="#/giftbattles" class="btn ghost" style="margin-top:8px">Battle details</a>
      </section>`}if(t.status!=="pending")return"";const s=((o=t.opponent)==null?void 0:o.id)===e.id,a=((r=t.challenger)==null?void 0:r.id)===e.id;return!s&&!a?`
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
    </div>`}function Vu(){const e=wi(10);return e.length?`
    <div class="card live-gb-day" id="liveGbDayWinners">
      <h3 style="margin:0 0 6px">Gift Battle winners today</h3>
      <p class="muted" style="margin:0 0 8px;font-size:12px">Up to 10 · until end of day · TEST MODE</p>
      <ul class="live-gb-day-list">${e.map((s,a)=>`<li class="live-gb-day-row"><span class="live-gb-day-sticker">${it("battle-win",{className:"gift-sticker gift-sticker--xs"})}</span><span class="chip">#${a+1}</span><strong>${l(s.username)}</strong></li>`).join("")}</ul>
    </div>`:""}function Uu(){var p;const{user:e,live:t}=M(),s=il(),a=t&&!t.endedAt,i=!!t,n=vo(),o=((p=Ve().query)==null?void 0:p.category)||"";let d=`
    <div class="live-disc-panel" data-panel="channels">
      ${o?`<div class="card"><strong>Category: ${l(o)}</strong> <a class="btn ghost" href="#/live?tab=categories">All categories</a> <a class="btn ghost" href="#/live?tab=channels">All channels</a><p class="muted small">Only channels tagged with this category are shown below.</p></div>`:""}
      ${Mu(o)}
      ${o?"":Vu()}
      ${a?"":Ru(e)}
      ${a?"":bo({title:"No active Live on this device — house catalog on Spotlight / Open Mic"})}
      ${ju(s)}
      <div class="card">
        <p class="muted" style="margin:0 0 8px">More Live tools</p>
        <div class="row wrap">
          <a class="btn ghost" href="#/connect#connect-multistream">Multi-platform go-live</a>
          <a class="btn ghost" href="#/multiguest">Multi-Guest</a>
          <a class="btn ghost" href="#/shorts">Shorts / Clips</a>
        </div>
        <p class="muted" style="margin:8px 0 0;font-size:12px">Open Mic + Spotlight are 24/7 categories (chips above). Clips live under Watch → Shorts / Clips. Gifts + song requests run during an active Live. Gift Battles is not promoted from this page.</p>
      </div>
    </div>`;n==="following"?d=Cu(e):n==="categories"&&(d=Du());const c=`
    ${Au(n)}
    ${Eu("live")}
    ${a?Fu(t):""}
    ${a?Ku(e):""}
    ${a?Gu(e):""}
    ${i?Ou(t):""}
    ${a?Bu(t,e):""}
    ${a?Pu(t,e):""}
    ${a?_u(t,e):""}
    ${d}
  `;return _("PIKK Live",c,{lead:"Following · Clips · Channels · Categories → Shorts · Request Spotlight · TEST MODE.",badge:a?"LIVE":void 0})}const Xa=[];let Na=!1;function Hu(e,t){Xa.push(t),yo(e)}function yo(e){if(Na)return;const t=e.querySelector("#liveGiftOverlay");if(!t){Xa.length=0;return}const s=Xa.shift();if(!s)return;Na=!0;const i=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches?900:s.tier==="cinematic"?4200:s.tier==="premium"?2800:1600;t.innerHTML=`
    <div class="lg-overlay-card lg-tier-${l(s.tier||"small")}" data-slug="${l(s.slug)}">
      <div class="lg-overlay-sticker">${it(s.slug)}</div>
      <div class="lg-overlay-copy">
        <strong>${l(s.name)}</strong>
        <span>@${l(s.fromUser)} · ${l($e(s.coins))} coins</span>
        <span class="muted lg-overlay-brief">${l(s.animation||"")}</span>
      </div>
    </div>`,t.classList.add("is-on"),window.setTimeout(()=>{t.classList.remove("is-on"),t.innerHTML="",Na=!1,yo(e)},i)}function zu(e){e.querySelectorAll(".lg-buy").forEach(t=>{t.addEventListener("click",()=>{const s=Zn(Number(t.dataset.coins));if((s==null?void 0:s.error)==="bad_package")return h("Unknown coin pack");if(s!=null&&s.error)return h(String(s.error));h(`+${$e(s.pack.coins)} coins · ${ye(s.pack.usd)} · TEST MODE`),ve()})}),e.querySelectorAll(".lg-gift").forEach(t=>{t.addEventListener("click",()=>{var r,d,c;const s=t.dataset.slug,a=t.dataset.confirm==="1",i=li.find(p=>p.slug===s);if(!i)return h("Gift not found");if(a&&!window.confirm(`Send ${i.name} for ${$e(i.coins)} coins (${ye(i.usd)})?
TEST MODE · demo coins only`))return;const n=(r=M().live)==null?void 0:r.id,o=gl({liveId:n,slug:s});if((o==null?void 0:o.error)==="signin")return h("Sign in first");if((o==null?void 0:o.error)==="offline")return h("Not live");if((o==null?void 0:o.error)==="insufficient")return h(`Need ${$e(o.need)} coins — buy a pack below · TEST MODE`);if((o==null?void 0:o.error)==="bad_gift")return h("Unknown gift");if(o!=null&&o.error)return h(String(o.error));Hu(e,{slug:i.slug,name:i.name,coins:i.coins,tier:i.tier,animation:i.animation,fromUser:((d=o.entry)==null?void 0:d.fromUser)||((c=M().user)==null?void 0:c.username)||"you"}),h(`Sent ${i.name} · ${$e(i.coins)} coins · TEST MODE`),window.setTimeout(()=>ve(),200)})})}function Wu(e){var o,r;const t=e.querySelector("#lsrPacks"),s=e.querySelector("#lsrTitleFields");if(!t||!s)return;let a=1;const i=()=>{const d=a,c=Array.from({length:d},(p,m)=>`<div class="field"><label>Song ${m+1}</label>
        <input class="lsr-title-input" data-i="${m}" maxlength="80" placeholder="Song title…" /></div>`).join("");s.innerHTML=c},n=d=>{a=Number(d)||1,t.querySelectorAll(".lsr-pack").forEach(c=>{const p=Number(c.dataset.pack)===a;c.classList.toggle("on",p),c.setAttribute("aria-pressed",p?"true":"false")}),i()};t.querySelectorAll(".lsr-pack").forEach(d=>{d.addEventListener("click",()=>n(d.dataset.pack))}),n(1),(o=e.querySelector("#lsrSeedWallet"))==null||o.addEventListener("click",()=>{Zs(50,"Song request demo credit · TEST MODE"),h("+$50 wallet demo · TEST MODE"),ve()}),(r=e.querySelector("#lsrSubmit"))==null||r.addEventListener("click",()=>{const d=Array.from(e.querySelectorAll(".lsr-title-input")).map(p=>p.value),c=rl({pack:a,titles:d});if((c==null?void 0:c.error)==="signin")return h("Sign in first");if((c==null?void 0:c.error)==="offline")return h("Not live");if((c==null?void 0:c.error)==="bad_pack")return h("Pick a pack");if((c==null?void 0:c.error)==="title_count")return h(`Enter ${c.need} song title${c.need>1?"s":""}`);if((c==null?void 0:c.error)==="insufficient")return h(`Need ${ye(c.need)} — tap + $50 demo credit · TEST MODE`);if(c!=null&&c.error)return h(String(c.error));h(`Song request submitted · ${ye(c.entry.price)} · TEST MODE`),ve()}),e.querySelectorAll(".lsr-play").forEach(d=>{d.addEventListener("click",()=>{var b;const c=d.dataset.rid,p=Number(d.dataset.si),g=ri((b=M().live)==null?void 0:b.id).find(y=>y.requestId===c&&y.songIndex===p);let f;if((g==null?void 0:g.status)==="playing"){if(f=cl(c,p),(f==null?void 0:f.error)==="host_only")return h("Host only");if(f!=null&&f.error)return h(String(f.error));h("Marked played · TEST MODE")}else{if(f=ol(c,p),(f==null?void 0:f.error)==="host_only")return h("Host only");if(f!=null&&f.error)return h(String(f.error));h("Now playing · TEST MODE")}ve()})}),e.querySelectorAll(".lsr-skip").forEach(d=>{d.addEventListener("click",()=>{const c=ll(d.dataset.rid,Number(d.dataset.si));if((c==null?void 0:c.error)==="host_only")return h("Host only");if(c!=null&&c.error)return h(String(c.error));h("Skipped · TEST MODE"),ve()})})}function Yu(e){var s,a,i,n,o,r,d,c;e.querySelectorAll(".hot-live-watch").forEach(p=>{p.addEventListener("click",()=>{Ma();const m=p.dataset.host||"creator",g=p.dataset.id||"",f=e.querySelector(`.hot-live-card[data-live-id="${CSS.escape(g)}"]`);e.querySelectorAll(".hot-live-card.is-watching").forEach(b=>b.classList.remove("is-watching")),f==null||f.classList.add("is-watching"),h(`Watching @${m} · demo only`)})}),e.querySelectorAll(".hot-live-spike").forEach(p=>{p.addEventListener("click",()=>{var b;const m=p.dataset.id,g=Nd(m);if((g==null?void 0:g.error)==="missing")return h("Live not found");if(g!=null&&g.error)return h(String(g.error));const f=((b=g.live)==null?void 0:b.hostName)||"creator";h(g.deduped?`Spike @${f} · Admin alert already open`:`Spike @${f} · Admin engagement alert queued`),ve()})}),(s=e.querySelector("#liveStart"))==null||s.addEventListener("click",()=>{var b,y,v,w,$;const p=(y=(b=e.querySelector("#liveTitle"))==null?void 0:b.value)==null?void 0:y.trim(),m=Hi(p);if((m==null?void 0:m.error)==="signin")return h("Sign in first");if((m==null?void 0:m.error)==="already_live")return h("Already live");const g=(w=(v=e.querySelector("#liveGoalNameGo"))==null?void 0:v.value)==null?void 0:w.trim(),f=Number(($=e.querySelector("#liveGoalAmtGo"))==null?void 0:$.value);if(g&&f>0){const C=ar({name:g,targetAmount:f});(C==null?void 0:C.error)==="signin"?h("Sign in to set goal"):C!=null&&C.error?h("Goal not set · "+C.error):h(`Live goal set · $${f} · 24h · TEST MODE`)}Ma(),h("You are live · TEST MODE"),ve()}),(a=e.querySelector("#liveRestart"))==null||a.addEventListener("click",()=>{var g;const p="PIKK Live · "+(((g=M().user)==null?void 0:g.username)||"Demo"),m=Hi(p);if(m!=null&&m.error)return h(String(m.error));Ma(),h("Back live · TEST MODE"),ve()}),(i=e.querySelector("#liveEnd"))==null||i.addEventListener("click",()=>{tl(),so(),h("Stream ended"),ve()}),(n=e.querySelector("#liveBumpViewers"))==null||n.addEventListener("click",()=>{const p=sl(),m=e.querySelector("#liveViewers");m&&p&&(m.textContent=Re(p.viewers||0)),h("Viewers updated (stub)")}),(o=e.querySelector("#liveTip"))==null||o.addEventListener("click",p=>{const m=p.currentTarget,g=Qn({kind:"tip",amount:Number(m.dataset.amt)||1});if((g==null?void 0:g.error)==="signin")return h("Sign in first");if((g==null?void 0:g.error)==="offline")return h("Not live");h("Tip sent · demo"),ve()});const t=()=>{var f;const p=e.querySelector("#liveChatInput"),m=(f=p==null?void 0:p.value)==null?void 0:f.trim();if(!m)return h("Type a message");const g=al(m);if((g==null?void 0:g.error)==="signin")return h("Sign in first");if((g==null?void 0:g.error)==="offline")return h("Not live");(g==null?void 0:g.error)!=="empty"&&(p&&(p.value=""),ve())};(r=e.querySelector("#liveChatSend"))==null||r.addEventListener("click",t),(d=e.querySelector("#liveChatInput"))==null||d.addEventListener("keydown",p=>{p.key==="Enter"&&t()}),(c=e.querySelector("#liveFocusGifts"))==null||c.addEventListener("click",()=>{var p;(p=e.querySelector("#liveGifts"))==null||p.scrollIntoView({behavior:"smooth",block:"start"})}),zu(e),Wu(e),Ju(e)}function Ju(e){var a;(a=e.querySelector("#liveGoalSave"))==null||a.addEventListener("click",()=>{var r,d,c;const i=(d=(r=e.querySelector("#liveGoalName"))==null?void 0:r.value)==null?void 0:d.trim(),n=Number((c=e.querySelector("#liveGoalAmt"))==null?void 0:c.value),o=ar({name:i,targetAmount:n});if((o==null?void 0:o.error)==="signin")return h("Sign in first");if((o==null?void 0:o.error)==="bad_name")return h("Enter a goal name");if((o==null?void 0:o.error)==="bad_amount")return h("Enter a goal amount ($)");if(o!=null&&o.error)return h(String(o.error));h(`Goal live · $${o.goal.targetAmount} · 24h window · TEST MODE`),ve()});const t=e.querySelector("#liveGoalSupportMessage"),s=e.querySelector("#liveGoalSupportMessageCount");if(t&&s){const i=()=>{s.textContent=`${t.value.length} / 180`};t.addEventListener("input",i),i()}e.querySelectorAll(".live-goal-custom-form").forEach(i=>{i.addEventListener("submit",n=>{var d,c;n.preventDefault();const o=Number((d=i.querySelector(".live-goal-custom-coins"))==null?void 0:d.value);if(!Number.isSafeInteger(o)||o<1||o>1e6)return h("Enter 1–1,000,000 whole coins");const r=Qs(i.dataset.goalId,o,{message:((c=e.querySelector("#liveGoalSupportMessage"))==null?void 0:c.value)||""});if((r==null?void 0:r.error)==="signin")return h("Sign in first");if((r==null?void 0:r.error)==="insufficient")return h("Not enough demo coins");if(r!=null&&r.error)return h("Donation unavailable · TEST MODE");h("Custom donation sent · TEST MODE"),ve()})}),e.querySelectorAll(".live-goal-donate").forEach(i=>{i.addEventListener("click",()=>{var c,p;const n=i.dataset.goalId,o=Number(i.dataset.coins),r=Qs(n,o,{message:((c=e.querySelector("#liveGoalSupportMessage"))==null?void 0:c.value)||""});if((r==null?void 0:r.error)==="signin")return h("Sign in first");if((r==null?void 0:r.error)==="insufficient")return h(`Need ${$e(r.need)} coins — buy a pack in Gifts · TEST MODE`);if((r==null?void 0:r.error)==="expired")return h("Goal ended · 24h window over");if((r==null?void 0:r.error)==="unknown_goal")return h("Goal not found");if((r==null?void 0:r.error)==="invalid_amount")return h("Pick a donate amount");if(r!=null&&r.error)return h(String(r.error));const d=((p=r.donated)==null?void 0:p.usd)??o/50;h(`Donated ${$e(o)} coins ($${Number(d).toFixed(2)}) · TEST MODE`),ve()})})}const Qu={BASE_URL:"/pikk-app/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_BASE:"/pikk-app/",VITE_BUILD_SHA:"5f92e6c36034711e2fc2391fe4ee4c59dd5102a6"};function Xu(e=Qu&&"/pikk-app/"||"/"){return String(e).replace(/\/?$/,"/")+"brand/pikk-official-approved.jpg"}const Us=fe.filter(e=>["dirty-money","93","no-love"].includes(e.id)).map(e=>({id:e.id,title:e.title,artist:"DatBoiSkeet",url:e.youtube,thumbnail:`https://i.ytimg.com/vi/${encodeURIComponent(new URL(e.youtube).searchParams.get("v"))}/hqdefault.jpg`})),xn=[{id:"videos",label:"Videos"},{id:"clips",label:"Viral clips",browseHref:"#/shorts",browseLabel:"Browse existing PIKK Clips"},{id:"songs",label:"Songs",browseHref:"#/music",browseLabel:"Explore PIKK Music"},{id:"photos",label:"Photos",browseHref:"#/home",browseLabel:"Explore PIKK Home"}];function Zu(){const e=Us[0],t=Us.map((s,a)=>`
    <button type="button" class="pikk-viral-choice${a===0?" is-selected":""}"
      data-viral-pick="${a}" aria-pressed="${a===0}">
      <span class="pikk-viral-choice-num">${String(a+1).padStart(2,"0")}</span>
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
        <div class="pikk-viral-hero-mark" aria-hidden="true"><img class="pikk-viral-hero-logo" src="${l(Xu())}" alt="" decoding="async" loading="eager"></div>
      </section>

      <div class="pikk-viral-notice" role="status">
        <strong>PREVIEW · NOT BROADCASTING</strong>
        <span>Real-time viewer counts, live chat, engagement ranking and 24/7 playback are not connected. Nothing here is represented as live.</span>
      </div>

      <nav class="pikk-viral-tabs" aria-label="Viral Live content types" role="tablist">
        ${xn.map((s,a)=>`<button type="button" role="tab" data-viral-type="${s.id}" aria-selected="${a===0}" tabindex="${a===0?0:-1}" aria-controls="viral-panel-${s.id}" id="viral-tab-${s.id}">${s.label}</button>`).join("")}
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
        <div class="pikk-viral-section-head"><h3>Up next · source library</h3><span>Manual preview · ${Us.length} existing music videos</span></div>
        <div class="pikk-viral-queue" id="pikkViralQueue" role="group" aria-label="Choose an original video source">${t}</div>
      </section>

      ${xn.filter(s=>s.id!=="videos").map(s=>`
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
  `,{lead:"Discover the planned 24/7 viral channel · preview only"})}function em(e){const t=e.querySelector("#pikkViralPreview");if(!t)return;t.querySelectorAll("[data-viral-pick]").forEach(n=>{n.addEventListener("click",()=>{const o=Number(n.dataset.viralPick),r=Us[o];r&&(t.querySelector("#pikkViralTitle").textContent=r.title,t.querySelector("#pikkViralCreator").textContent=r.artist+" · Watch from the original publisher",t.querySelector("#pikkViralSource").href=r.url,t.querySelector("#pikkViralThumbnail").src=r.thumbnail,t.querySelectorAll("[data-viral-pick]").forEach(d=>{const c=d===n;d.classList.toggle("is-selected",c),d.setAttribute("aria-pressed",String(c))}))})});const s=Array.from(t.querySelectorAll("[data-viral-pick]"));s.forEach((n,o)=>{n.addEventListener("keydown",r=>{if(!["ArrowRight","ArrowLeft","ArrowDown","ArrowUp","Home","End"].includes(r.key))return;r.preventDefault();const d=s.length-1,c=r.key==="Home"?0:r.key==="End"?d:(o+(["ArrowRight","ArrowDown"].includes(r.key)?1:-1)+s.length)%s.length,p=s[c];p.click(),p.focus(),p.scrollIntoView({block:"nearest",inline:"nearest"})})});const a=Array.from(t.querySelectorAll("[data-viral-type]"));function i(n,o=!1){const r=n.dataset.viralType;a.forEach(d=>{const c=d===n;d.setAttribute("aria-selected",String(c)),d.tabIndex=c?0:-1}),t.querySelectorAll("[data-viral-panel]").forEach(d=>{d.hidden=d.dataset.viralPanel!==r}),o&&(n.focus(),n.scrollIntoView({block:"nearest",inline:"nearest"}))}a.forEach((n,o)=>{n.addEventListener("click",()=>i(n)),n.addEventListener("keydown",r=>{if(!["ArrowRight","ArrowLeft","Home","End"].includes(r.key))return;r.preventDefault();const d=a.length-1,c=r.key==="Home"?0:r.key==="End"?d:(o+(r.key==="ArrowRight"?1:-1)+a.length)%a.length;i(a[c],!0)})})}function es(){j("#/marketplace")}const tm={pending:"Pending",approved:"Approved",rejected:"Rejected"},sm=[{v:"sponsored_post",label:"Sponsored post"},{v:"livestream_promo",label:"Livestream promo"},{v:"affiliate",label:"Affiliate link"},{v:"storefront",label:"Product storefront"}];function am(){const{brandApps:e,user:t}=M(),s=wl(),a=s.filter(r=>r.active),i=a.length?a.map(r=>`
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
          <span class="chip">${l(tm[r.status]||r.status)}</span>
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
    ${i}

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
          ${sm.map(r=>`<option value="${r.v}">${l(r.label)}</option>`).join("")}
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
  `;return _("Marketplace",o,{lead:"Brand applications & sponsored listings · localStorage demo."})}function im(e){var t,s;(t=e.querySelector("#mSubmit"))==null||t.addEventListener("click",()=>{var i,n,o,r,d,c,p;const a=bl({brand:(i=e.querySelector("#mBrand"))==null?void 0:i.value,contact:(n=e.querySelector("#mContact"))==null?void 0:n.value,email:(o=e.querySelector("#mEmail"))==null?void 0:o.value,budget:(r=e.querySelector("#mBudget"))==null?void 0:r.value,campaign:(d=e.querySelector("#mCampaign"))==null?void 0:d.value,url:(c=e.querySelector("#mUrl"))==null?void 0:c.value,pitch:(p=e.querySelector("#mPitch"))==null?void 0:p.value});if((a==null?void 0:a.error)==="required")return h("Brand and email required");h("Application saved"),es()}),e.querySelectorAll(".brand-status").forEach(a=>{a.addEventListener("click",()=>{yl(a.dataset.id,a.dataset.status),h("Marked "+a.dataset.status),es()})}),e.querySelectorAll(".brand-to-listing").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.brand||"Brand",n=Yi({title:`${i} · sponsored`,brand:i,blurb:a.dataset.pitch||"Sponsored offer from approved brand application.",url:a.dataset.url||"",disclosure:"Paid partnership · TEST MODE",brandAppId:a.dataset.id});if(n!=null&&n.error)return h("Could not create listing");h("Listing published"),es()})}),(s=e.querySelector("#lCreate"))==null||s.addEventListener("click",()=>{var i,n,o,r,d;const a=Yi({title:(i=e.querySelector("#lTitle"))==null?void 0:i.value,brand:(n=e.querySelector("#lBrand"))==null?void 0:n.value,blurb:(o=e.querySelector("#lBlurb"))==null?void 0:o.value,url:(r=e.querySelector("#lUrl"))==null?void 0:r.value,disclosure:(d=e.querySelector("#lDisc"))==null?void 0:d.value});if((a==null?void 0:a.error)==="required")return h("Title and brand required");h("Listing published"),es()}),e.querySelectorAll(".listing-toggle").forEach(a=>{a.addEventListener("click",()=>{kl(a.dataset.id,a.dataset.active==="1"),h(a.dataset.active==="1"?"Listing shown":"Listing hidden"),es()})})}function ue(e){j(e||"#/messages")}function nm(e){const t=e.messages||[];if(!t.length)return"No messages yet";const s=t[t.length-1];return(s.priority?"⚡ ":"")+(s.text||"").slice(0,80)}function rm(){return _("Messages",`<section class="pikk-msg-flow-hero" aria-label="PIKK messages sign-in">
      <span class="pikk-msg-flow-kicker">PIKK CONNECT · PRIVATE MESSAGES</span>
      <h2>Your conversations. <em>Your circle.</em></h2>
      <p>Try DMs, group conversations and the DatBoiSkeet team inbox with a local demo account.</p>
      <span class="chip">TEST MODE · No server messaging</span>
    </section>
    <div class="card pikk-msg-flow-panel">
      <h3>Sign in required</h3>
      <p class="muted">Private DMs, team inbox, and group chats need a local demo account.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,{lead:"Private messaging & team inbox · TEST MODE"})}function om(e){const t=pi(),s=t.filter(n=>Xs(n)>0),a=M().messagePrefs||{allowDMs:!0,allowRequests:!0},i=t.map(n=>{const o=n.kind==="group",r=!o&&n.peerId==="dbs",d=[o?'<span class="chip">Group</span>':"",r?'<span class="chip">Team</span>':"",n.request?'<span class="chip">Request</span>':"",n.muted?'<span class="chip">Muted</span>':"",n.blocked?'<span class="chip">Blocked</span>':""].filter(Boolean).join(" "),c=Xs(n),p=c?`<span class="chip msg-unread-chip" aria-label="${c} unread">${c}</span>`:"";return`
      <button type="button" class="msg-thread-row${c?" has-unread":""}" data-search="${l(String(n.peerName||n.peerId).toLowerCase())}" data-unread="${c>0}" data-open-thread="${l(n.id)}">
        <div class="pikk-msg-avatar" aria-hidden="true">${l(String(n.peerName||n.peerId||"?").slice(0,1).toUpperCase())}</div>
        <div class="pikk-msg-thread-body"><div class="msg-thread-top">
          <strong>${l(n.peerName||n.peerId)}</strong>
          <span class="muted">${l(F(n.updatedAt||0))}</span>
        </div>
        <div class="msg-thread-preview muted">${l(nm(n))}</div>
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
        ${i||`<div class="msg-empty">
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
          <input type="checkbox" id="msgPrefDMs" ${a.allowDMs?"checked":""}/>
        </label>
        <label class="toggle"><span>Allow requests</span>
          <input type="checkbox" id="msgPrefRequests" ${a.allowRequests?"checked":""}/>
        </label>
      </div>
    </div>
  `}function lm(){return`
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
    <section class="pikk-msg-contact-grid" aria-label="Available demo contacts">${$s().map(s=>{const a=s.team||nr(s.id),i=s.team?"Team inbox":a?"Message":"Message request";return`
      <article class="card msg-contact pikk-msg-contact-card">
        <div class="msg-contact-head">
          <span class="pikk-msg-contact-avatar" aria-hidden="true">${l(String(s.username||"?").slice(0,1).toUpperCase())}</span>
          <strong>${l(s.username)}</strong>
          ${s.team?'<span class="chip">Official</span>':a?'<span class="chip">Mutual</span>':'<span class="chip">Request</span>'}
        </div>
        <p class="muted" style="margin:6px 0 10px">${l(s.bio||"")}</p>
        <button type="button" class="btn ${s.team?"primary":""}" data-start-peer="${l(s.id)}" data-peer-name="${l(s.username)}">${l(i)}</button>
      </article>`}).join("")}</section>
  `}function cm(){return`
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
  `}function dm(e,{teamPriorityHint:t=!1}={}){const s=M().user,a=e.kind==="group",i=!a&&e.peerId==="dbs",n=!!e.blocked,o=(e.messages||[]).map(c=>`
      <div class="msg-bubble ${c.from===(s==null?void 0:s.id)?"mine":""} ${c.priority?"priority":""}">
        <div class="msg-bubble-meta">
          <strong>${l(c.fromName||c.from)}</strong>
          ${c.priority?'<span class="chip priority-chip">Priority</span>':""}
          <span class="muted">${l(F(c.at))}</span>
        </div>
        <div class="msg-bubble-text">${l(c.text)}</div>
      </div>`).join(""),r=e.request?'<div class="msg-banner">Message request · recipient approval stub (demo still delivers locally)</div>':"",d=t?'<div class="msg-banner priority">Next send can use Priority $2.99 TEST MODE (wallet note only — not charged).</div>':"";return`
    <section class="pikk-msg-flow-hero pikk-msg-flow-hero-thread" aria-label="Current PIKK conversation">
      <span class="pikk-msg-flow-kicker">PIKK CONNECT · ${a?"GROUP CHAT":i?"TEAM INBOX":"DIRECT MESSAGES"}</span>
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
            ${a?'<span class="chip">Group</span>':""}
            ${i?'<span class="chip">Team</span>':""}
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
               <input id="msgInput" placeholder="${i?"Write an inquiry…":"Message…"}" maxlength="500" />
               <button type="button" class="btn primary" id="msgSend">Send</button>
               ${i?'<button type="button" class="btn" id="msgSendPriority" title="TEST MODE — not charged">Priority $2.99</button>':""}
             </div>`}
    </div>
  `}function pm(e){var o,r,d;if(!M().user)return rm();$s(),ui();const s=((o=e==null?void 0:e.query)==null?void 0:o.view)||"",a=((r=e==null?void 0:e.query)==null?void 0:r.t)||"",i=((d=e==null?void 0:e.query)==null?void 0:d.priority)==="1";let n;if(a){const c=ir(a);c?n=dm(c,{teamPriorityHint:i&&c.peerId==="dbs"}):n='<div class="card"><p class="muted">Thread not found.</p><button type="button" class="btn" id="msgBackInbox">← Inbox</button></div>'}else s==="new"?n=lm():s==="team"?n=cm():n=om();return _("Messages",n,{lead:"DMs, group chats, and DatBoiSkeet team inbox · TEST MODE"})}function um(e){var c,p,m,g,f,b,y,v,w,$,C,k,P,T,R,x,Q;if(!M().user)return;const s=()=>ue("#/messages");(c=e.querySelector("#msgBackInbox"))==null||c.addEventListener("click",s),(p=e.querySelector("#msgMarkAllRead"))==null||p.addEventListener("click",()=>{const D=pi().filter(O=>Xs(O)>0);D.length&&(D.forEach(O=>Ji(O.id)),h(`${D.length} conversation${D.length===1?"":"s"} marked read`),ue("#/messages"))}),(m=e.querySelector("#msgNewChat"))==null||m.addEventListener("click",()=>ue("#/messages?view=new")),(g=e.querySelector("#pikkNewChatTop"))==null||g.addEventListener("click",()=>ue("#/messages?view=new"));const a=()=>{var I,q;const D=String(((I=e.querySelector("#pikkMsgSearch"))==null?void 0:I.value)||"").trim().toLowerCase(),O=!!((q=e.querySelector("#pikkMsgUnreadOnly"))!=null&&q.checked);let H=0;e.querySelectorAll("#msgInbox [data-open-thread]").forEach(V=>{const Y=!D||String(V.dataset.search||"").includes(D),G=!O||V.dataset.unread==="true";V.hidden=!(Y&&G),V.hidden||H++});const K=e.querySelector("#pikkMsgNoResults");K&&(K.textContent=O?D?"No unread conversations match your search.":"No unread conversations.":"No conversations match your search.",K.hidden=H>0||!D&&!O);const L=e.querySelector("#pikkMsgClearFilters");L&&(L.hidden=!D&&!O)};(f=e.querySelector("#pikkMsgClearFilters"))==null||f.addEventListener("click",()=>{const D=e.querySelector("#pikkMsgSearch"),O=e.querySelector("#pikkMsgUnreadOnly");D&&(D.value=""),O&&(O.checked=!1),a(),D==null||D.focus()});const i=e.querySelector("#pikkMsgSearch");i==null||i.addEventListener("input",a),i==null||i.addEventListener("keydown",D=>{D.key!=="Escape"||!i.value||(D.preventDefault(),D.stopPropagation(),i.value="",a())}),(b=e.querySelector("#pikkMsgUnreadOnly"))==null||b.addEventListener("change",a),(y=e.querySelector("#msgEmptyNew"))==null||y.addEventListener("click",()=>ue("#/messages?view=new")),(v=e.querySelector("#msgOpenTeam"))==null||v.addEventListener("click",()=>ue("#/messages?view=team")),(w=e.querySelector("#pikkGroupTop"))==null||w.addEventListener("click",()=>{var D;return(D=e.querySelector("#msgOpenGroup"))==null?void 0:D.click()}),($=e.querySelector("#msgOpenGroup"))==null||$.addEventListener("click",()=>{const D=El();if(D!=null&&D.error){h("Sign in required");return}h("Opened DBS Fans"),ue("#/messages?t="+encodeURIComponent(D.id))}),(C=e.querySelector("#msgTeamFree"))==null||C.addEventListener("click",()=>{const D=us("dbs","DatBoiSkeet");if(D.error)return h("Sign in required");ue("#/messages?t="+encodeURIComponent(D.id))}),(k=e.querySelector("#msgTeamPriority"))==null||k.addEventListener("click",()=>{const D=us("dbs","DatBoiSkeet");if(D.error)return h("Sign in required");ue("#/messages?t="+encodeURIComponent(D.id)+"&priority=1")}),e.querySelectorAll("[data-start-peer]").forEach(D=>{D.addEventListener("click",()=>{const O=D.dataset.startPeer,H=D.dataset.peerName||O;if(O==="dbs"){ue("#/messages?view=team");return}const K=us(O,H);if(K.error)return h("Sign in required");K.request&&h("Request thread created · demo"),ue("#/messages?t="+encodeURIComponent(K.id))})}),e.querySelectorAll("[data-open-thread]").forEach(D=>{D.addEventListener("click",()=>{ue("#/messages?t="+encodeURIComponent(D.dataset.openThread))})}),(P=e.querySelector("#msgPrefDMs"))==null||P.addEventListener("change",D=>{Qi({allowDMs:!!D.target.checked}),h(D.target.checked?"DMs allowed":"DMs disabled (stub)")}),(T=e.querySelector("#msgPrefRequests"))==null||T.addEventListener("change",D=>{Qi({allowRequests:!!D.target.checked}),h(D.target.checked?"Requests allowed":"Requests disabled (stub)")});const n=new URLSearchParams(location.hash.split("?")[1]||"").get("t"),o=n?ir(n):null;o&&Ji(o.id),e.querySelectorAll("[data-flag]").forEach(D=>{D.addEventListener("click",()=>{if(!o)return;const O=D.dataset.flag;if(O==="mute"){const H=Da(o.id,{muted:!o.muted});h(H.muted?"Muted":"Unmuted"),ue("#/messages?t="+encodeURIComponent(o.id))}else if(O==="block"){const H=Da(o.id,{blocked:!o.blocked});h(H.blocked?"Blocked":"Unblocked"),ue("#/messages?t="+encodeURIComponent(o.id))}else O==="report"&&(Da(o.id,{report:!0}),h("Reported · stub (Guidelines §13)"),ue("#/messages?t="+encodeURIComponent(o.id)))})});const r=D=>{if(!o)return;const O=e.querySelector("#msgInput"),H=(O==null?void 0:O.value)||"";let K;if(o.kind==="group"?K=Al(o.id,H):K=$l(o.peerId,o.peerName,H,{priority:!!D}),(K==null?void 0:K.error)==="empty")return h("Type a message");if(K!=null&&K.error)return h("Could not send");h(D?"Priority sent · TEST MODE $2.99 not charged":"Sent"),ue("#/messages?t="+encodeURIComponent(o.id))};(R=e.querySelector("#msgSend"))==null||R.addEventListener("click",()=>r(!1)),(x=e.querySelector("#msgSendPriority"))==null||x.addEventListener("click",()=>r(!0)),(Q=e.querySelector("#msgInput"))==null||Q.addEventListener("keydown",D=>{D.key==="Enter"&&(D.preventDefault(),r(!1))});const d=e.querySelector("#msgThread");d&&(d.scrollTop=d.scrollHeight)}const En=Object.freeze({releases:!0,lives:!0,messages:!0,quietHours:!1}),wt=Object.freeze([{key:"releases",title:"New music releases",detail:"Keep track of new DatBoiSkeet music and official drops.",group:"discover"},{key:"lives",title:"Livestreams",detail:"Choose whether you want live-session updates.",group:"discover"},{key:"messages",title:"Messages",detail:"Control conversation notification preferences.",group:"social"},{key:"quietHours",title:"Quiet hours",detail:"Save your preference for a quieter experience.",group:"social"}]);function An(e,t){const s=!!t[e.key];return`<label class="pikk-notif-row" for="pikk-notif-${e.key}">
    <span class="pikk-notif-row-copy"><strong>${e.title}</strong><small>${e.detail}</small></span>
    <input id="pikk-notif-${e.key}" type="checkbox" data-k="${e.key}" ${s?"checked":""} />
  </label>`}function mm(){const e=M().notifications||{},t=wt.filter(s=>!!e[s.key]).length;return _("Notifications",`
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
          ${wt.filter(s=>s.group==="discover").map(s=>An(s,e)).join("")}
        </section>
        <section class="pikk-notif-panel" aria-labelledby="pikkNotifSocialTitle">
          <div class="pikk-notif-panel-head"><span class="pikk-notif-panel-icon" aria-hidden="true">✉</span><div><span class="pikk-notif-kicker">YOUR SPACE</span><h3 id="pikkNotifSocialTitle">Social &amp; Focus</h3></div></div>
          ${wt.filter(s=>s.group==="social").map(s=>An(s,e)).join("")}
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
    </div>`,{lead:"Music, live and social preferences · browser-local demo."})}function hm(e){var a,i,n;const t=e.querySelector("#notifPrefs");if(!t)return;const s=o=>{const r=["releases","lives","messages"];Ca(Object.fromEntries(r.map(g=>[g,o]))),t.querySelectorAll("input[data-k]").forEach(g=>{r.includes(g.dataset.k)&&(g.checked=o)});const d=M().notifications||{},c=wt.filter(g=>!!d[g.key]).length,p=t.querySelector("#pikkNotifEnabled");p&&(p.textContent=`${c} of 4`);const m=t.querySelector("#pikkNotifStatus");m&&(m.textContent=o?"Music, live and message preferences resumed on this device. Real push delivery is not connected.":"Music, live and message preferences paused on this device. Real push delivery is not connected."),h(o?"Alerts resumed":"Alerts paused")};(a=t.querySelector("#pikkNotifPause"))==null||a.addEventListener("click",()=>s(!1)),(i=t.querySelector("#pikkNotifResume"))==null||i.addEventListener("click",()=>s(!0)),(n=t.querySelector("#pikkNotifReset"))==null||n.addEventListener("click",()=>{Ca(En),t.querySelectorAll("input[data-k]").forEach(d=>{d.checked=En[d.dataset.k]});const o=t.querySelector("#pikkNotifEnabled");o&&(o.textContent="3 of 4");const r=t.querySelector("#pikkNotifStatus");r&&(r.textContent="Notification preferences restored to defaults on this device."),h("Defaults restored")}),t.querySelectorAll("input[data-k]").forEach(o=>{o.addEventListener("change",()=>{const r=o.dataset.k;if(!wt.some(g=>g.key===r))return;Ca({[r]:o.checked});const d=M().notifications||{},c=wt.filter(g=>!!d[g.key]).length,p=t.querySelector("#pikkNotifEnabled");p&&(p.textContent=`${c} of 4`);const m=t.querySelector("#pikkNotifStatus");m&&(m.textContent=`${wt.find(g=>g.key===r).title} preference saved on this device.`),h("Preference saved")})})}function ht(){j("#/wallet")}function W(e){return"$"+Number(e||0).toFixed(2)}function Ns(e){return Number(e||0).toLocaleString()}const gm={pending:"Pending",completed:"Completed",rejected:"Rejected"};function fm(){const{wallet:e,user:t,coins:s}=M(),a=e||{balance:0,history:[]},i=ma(),n=[...(s==null?void 0:s.history)||[]].slice(0,10),o=pl(),r=vs(),d=gi().filter(x=>x.count>0),c=er(t==null?void 0:t.id),p=[...a.history||[]].slice(-12).reverse(),m=[...r.earnings||[]].slice(0,20),g=r.payouts||[],f=g.find(x=>x.status==="pending"),b=!f&&r.available>=r.threshold,y=r.verification==="demo_verified",v=p.length>0?`<ul class="list-plain">${p.map(x=>`<li>
          <span>${l(x.note||"Entry")}<br/><span class="muted" style="font-size:12px">${F(x.at)}</span></span>
          <strong style="color:${Number(x.amount)>=0?"var(--ok,#6dffb0)":"inherit"}">${Number(x.amount)>=0?"+":""}${W(x.amount)}</strong>
        </li>`).join("")}</ul>`:'<p class="muted" style="margin:0">No fan USD credit activity yet.</p>',w=o.map(x=>{const Q=`pack_${x.coins}`;return`<button type="button" class="card coin-pack-btn" data-coins="${x.coins}" id="${l(Q)}" style="text-align:left;cursor:pointer;margin:0;padding:12px;border:1px solid rgba(255,255,255,.08);background:#12121a">
        <div style="font-size:20px;font-weight:900">${Ns(x.coins)} <span class="muted" style="font-size:13px;font-weight:600">coins</span></div>
        <div class="muted" style="font-size:13px;margin-top:4px">${W(x.usd)} · TEST MODE</div>
        <div style="margin-top:8px"><span class="chip">Buy · demo credit</span></div>
      </button>`}).join(""),$=n.length>0?`<ul class="list-plain">${n.map(x=>{const Q=Number(x.amount)||0;return`<li>
          <span>${l(x.note||"Coins")}<br/><span class="muted" style="font-size:12px">${F(x.at)}</span></span>
          <strong style="color:${Q>=0?"var(--ok,#6dffb0)":"inherit"}">${Q>=0?"+":""}${Ns(Q)}</strong>
        </li>`}).join("")}</ul>`:'<p class="muted" style="margin:0">No coin purchases or gifts yet. Buy a pack below for Live gifts.</p>',C=c.length>0?`<ul class="list-plain">${c.slice(0,8).map(x=>`<li>
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
        <p class="muted" style="font-size:12px;margin:8px 0 0">Creator-only split view. Live viewers never see 80/20.</p>`:'<p class="muted" style="margin:0">No coin-gift earnings yet. When viewers send catalog gifts on Live, your <strong>80% of NET</strong> lands here (TEST MODE: listed USD = net, 0% external fee).</p>',k=d.length>0?`<div style="overflow-x:auto">
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
        </li>`).join("")}</ul>`:"",T=g.length>0?g.map(x=>`<div class="card" style="margin:0 0 10px;background:#12121a" data-payout="${l(x.id)}">
        <div class="row wrap">
          <strong>${W(x.amount)}</strong>
          <span class="chip">${l(gm[x.status]||x.status)}</span>
          <span class="muted spacer" style="text-align:right;font-size:12px">${F(x.at)}</span>
        </div>
        <p class="muted" style="margin:6px 0;font-size:12px">${l(x.note||"Payout")} · ${(x.earningIds||[]).length} earning line(s)</p>
        ${x.status==="pending"?`<div class="row wrap">
                <button class="btn primary payout-status" data-id="${l(x.id)}" data-status="completed">Mark completed · demo</button>
                <button class="btn ghost payout-status" data-id="${l(x.id)}" data-status="rejected">Reject · release hold</button>
              </div>`:x.reviewedAt?`<p class="muted" style="margin:0;font-size:12px">Reviewed ${F(x.reviewedAt)}</p>`:""}
      </div>`).join(""):'<p class="muted">No payout requests yet.</p>',R=`
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
        <div class="pikk-wallet-metric"><span>Gift coins</span><strong>${Ns(i)}</strong><small>Live gifting · demo</small></div>
        <div class="pikk-wallet-metric"><span>Fan USD credits</span><strong>${W(a.balance)}</strong><small>Tips and requests · demo</small></div>
        <div class="pikk-wallet-metric"><span>Creator available</span><strong>${W(r.available)}</strong><small>Eligible balance · demo</small></div>
        <div class="pikk-wallet-metric"><span>Creator on hold</span><strong>${W(r.holds)}</strong><small>Payout review · demo</small></div>
      </section>
    <div class="card">
      <div class="row wrap">
        <span class="chip">TEST MODE · not real money</span>
        <span class="chip">${y?"Identity / tax · demo verified":"Identity / tax verification · demo"}</span>
        <button class="btn ghost" id="cwVerify" style="margin-left:auto">${y?"Clear demo verify":"Mark verified · demo"}</button>
      </div>
      <p class="muted" style="margin:10px 0 0;font-size:13px">Fan <strong>coins</strong> (Live gifts) stay separate from fan USD credits and creator redeemable balances. No real processors, KYC, or charges.</p>
    </div>

    <div class="card" id="wallet-coins">
      <div class="row wrap">
        <h3 style="margin:0">Gift coins</h3>
        <span class="chip">t185u · 100 coins = $2</span>
        <span class="chip">TEST MODE</span>
      </div>
      <div style="font-size:32px;font-weight:900;margin-top:8px">${Ns(i)} <span class="muted" style="font-size:16px;font-weight:600">coins</span></div>
      <p class="muted" style="margin:4px 0 12px">≈ ${W(i*.02)} · stored in <code>dbs_v1.coins</code> (not USD <code>wallet</code>). Used for Live gift tray.</p>
      <h4 style="margin:0 0 8px;font-size:14px">Buy coin pack</h4>
      <div class="grid-2" style="gap:10px">${w}</div>
      <p class="muted" style="font-size:12px;margin:10px 0 0">No discounts · packs ${pa.map(x=>`${x.coins}/$${x.usd}`).join(" · ")}. Demo credit only — no payment processor.</p>
      <h4 style="margin:16px 0 8px;font-size:14px">Recent coin activity</h4>
      ${$}
      <div class="row wrap" style="margin-top:12px">
        <a class="btn ghost" href="#/live">Go to Live · send gifts</a>
        <a class="btn ghost" href="#/earnings?cat=gifts">Gift earnings</a>
      </div>
    </div>

    <div class="card">
      <h3>Fan spendable USD credits</h3>
      <div style="font-size:32px;font-weight:900">${W(a.balance)}</div>
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
      ${C}
    </div>

    <div class="card">
      <h3>Earnings breakdown</h3>
      <p class="muted" style="margin:0 0 10px">Gifts, tips, subscriptions, referrals, Clippers, sponsorships, merch/affiliate — gross → fees → net → creator% / PIKK%.</p>
      ${k}
      ${P?`<h4 style="margin:16px 0 8px;font-size:14px">Ledger (recent)</h4>${P}`:""}
    </div>

    <div class="card">
      <h3>Payout history</h3>
      <p class="muted" style="margin:0 0 10px">On-device demo approve / reject. Completed funds leave holds; rejected releases hold and untags earnings.</p>
      ${T}
    </div>
    </div>
  `;return _("Wallet & Payouts",R,{lead:"Creator Wallet & Payout Center · gift coins + fan USD · TEST MODE."})}function vm(e){var t,s,a,i,n;e.querySelectorAll(".coin-pack-btn").forEach(o=>{o.addEventListener("click",()=>{const r=Number(o.dataset.coins),d=Zn(r);if((d==null?void 0:d.error)==="bad_package")return h("Unknown pack");if(d!=null&&d.error)return h("Could not buy coins");h(`+${r.toLocaleString()} coins · TEST MODE`),ht()})}),(t=e.querySelector("#fanCredit5"))==null||t.addEventListener("click",()=>{Zs(5,"Demo credit +$5"),h("+$5 fan credits"),ht()}),(s=e.querySelector("#fanCredit25"))==null||s.addEventListener("click",()=>{Zs(25,"Demo credit +$25"),h("+$25 fan credits"),ht()}),(a=e.querySelector("#cwSeed"))==null||a.addEventListener("click",()=>{const o=(vs().earnings||[]).length>0,r=or({force:!0});h(o?"Demo earnings reloaded":`Loaded ${r.seeded||0} demo lines`),ht()}),(i=e.querySelector("#cwPayout"))==null||i.addEventListener("click",()=>{const o=Dl();if((o==null?void 0:o.error)==="pending_exists")return h("Payout already pending");if((o==null?void 0:o.error)==="below_threshold")return h("Below payout threshold");if(o!=null&&o.error)return h("Could not request payout");h("Payout requested · held"),ht()}),(n=e.querySelector("#cwVerify"))==null||n.addEventListener("click",()=>{const r=vs().verification!=="demo_verified";Ml(r),h(r?"Demo verified":"Verification cleared"),ht()}),e.querySelectorAll(".payout-status").forEach(o=>{o.addEventListener("click",()=>{const r=Ll(o.dataset.id,o.dataset.status);if(r!=null&&r.error)return h("Could not update payout");h("Payout "+o.dataset.status),ht()})})}function Cn(e){j(e||"#/earnings")}function re(e){return"$"+Number(e||0).toFixed(2)}const ko=[{id:"all",label:"All"},{id:"gifts",label:"Gifts"},{id:"tips",label:"Tips"},{id:"subscriptions",label:"Subscriptions"},{id:"clippers",label:"Clippers"},{id:"referrals",label:"Referrals"},{id:"sponsorships",label:"Sponsorships"},{id:"merch",label:"Merch"}];function wo(){var t;const e=(((t=Ve().query)==null?void 0:t.cat)||"all").toLowerCase();return ko.some(s=>s.id===e)?e:"all"}function bm(e){return(e||[]).reduce((t,s)=>(t.gross+=Number(s.gross)||0,t.fees+=Number(s.fees)||0,t.net+=Number(s.net)||0,t.creatorShare+=Number(s.creatorShare)||0,t.dbsShare+=Number(s.dbsShare)||0,t),{gross:0,fees:0,net:0,creatorShare:0,dbsShare:0})}function ts(e){return Math.round(Number(e)*100)/100}function ym(){const e=vs(),t=Tl(),s=wo(),a=[...e.earnings||[]].sort((y,v)=>(v.at||0)-(y.at||0)),i=s==="all"?a:a.filter(y=>y.category===s||s==="subscriptions"&&y.category==="paid_content"),n=bm(a),o=gi(),r=er(),d=s==="gifts"?`<div class="card" style="margin:0 0 12px;background:#12121a">
      <div class="row wrap">
        <span class="chip">t185u · catalog gifts</span>
        <span class="chip">80% creator / 20% PIKK · NET</span>
        <span class="chip">TEST MODE · listed USD = net</span>
      </div>
      <p class="muted" style="margin:8px 0 0;font-size:13px">Coin gifts from Live use <code>sendLiveGift</code> → creator earnings here. Viewers on Live / gift tray never see this split. ${r.length?`${r.length} gift line(s) on device.`:"Send a catalog gift on an active Live to populate."}</p>
    </div>`:"",c=ko.map(y=>{const v=y.id==="all"?"#/earnings":`#/earnings?cat=${y.id}`,w=y.id==="all"?a.length:a.filter(C=>C.category===y.id||y.id==="subscriptions"&&C.category==="paid_content").length,$=s===y.id;return`<a class="chip earn-filter${$?" active":""}" href="${v}" data-cat="${l(y.id)}" style="${$?"outline:1px solid var(--accent,#6dffb0);font-weight:700":""}">${l(y.label)}${w?` · ${w}`:""}</a>`}).join(""),p=Object.entries(t).map(([y,v])=>`<tr style="border-top:1px solid rgba(255,255,255,.06)">
        <td style="padding:8px 4px"><strong>${l(v.label)}</strong><br/><span class="muted" style="font-size:11px">${l(y)}</span></td>
        <td style="padding:8px 4px">${v.creatorPct}%</td>
        <td style="padding:8px 4px">${v.dbsPct}%</td>
      </tr>`).join(""),m=Object.entries(t).map(([y,v])=>`<option value="${l(y)}">${l(v.label)}</option>`).join(""),g=o.filter(y=>y.count>0).length>0?`<div style="overflow-x:auto;margin-top:8px">
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
          ${o.filter(y=>y.count>0).map(y=>`<tr style="border-top:1px solid rgba(255,255,255,.06)">
            <td style="padding:8px 4px"><strong>${l(y.label)}</strong><br/><span class="muted" style="font-size:11px">${y.creatorPct}/${y.dbsPct} · ${y.count} line${y.count===1?"":"s"}</span></td>
            <td style="padding:8px 4px">${re(y.gross)}</td>
            <td style="padding:8px 4px">${re(y.fees)}</td>
            <td style="padding:8px 4px">${re(y.net)}</td>
            <td style="padding:8px 4px"><strong>${re(y.creatorShare)}</strong></td>
            <td style="padding:8px 4px">${re(y.dbsShare)}</td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>`:"",f=i.length>0?`<ul class="list-plain">${i.map(y=>`<li style="align-items:flex-start">
          <span style="flex:1;min-width:0">
            <strong>${l(y.label||y.category)}</strong>
            ${y.payoutId?'<span class="chip">In payout</span>':'<span class="chip">Open</span>'}
            ${y.source==="seed"?'<span class="chip">Demo seed</span>':""}
            <br/><span class="muted" style="font-size:12px">${l(y.note||"")} · ${F(y.at)}</span>
            <br/><span class="muted" style="font-size:11px">gross ${re(y.gross)} → fees ${re(y.fees)} → net ${re(y.net)} · creator ${y.creatorPct}% / PIKK ${y.dbsPct}%</span>
          </span>
          <span style="text-align:right;font-size:13px;white-space:nowrap">
            <strong>${re(y.creatorShare)}</strong><br/>
            <span class="muted">PIKK ${re(y.dbsShare)}</span>
          </span>
        </li>`).join("")}</ul>`:a.length===0?`<p class="muted" style="margin:0 0 12px">No earnings yet. Load demo lines or record a single demo earning below.</p>
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
          <div style="font-size:26px;font-weight:900">${re(e.available)}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Holds / in review</p>
          <div style="font-size:26px;font-weight:900">${re(e.holds)}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Lifetime creator share</p>
          <div style="font-size:22px;font-weight:800">${re(ts(n.creatorShare))}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Lifetime PIKK share</p>
          <div style="font-size:22px;font-weight:800">${re(ts(n.dbsShare))}</div>
        </div>
      </div>
      <div class="row wrap" style="margin-top:10px">
        <span class="chip">Lifetime gross ${re(ts(n.gross))}</span>
        <span class="chip">Fees ${re(ts(n.fees))}</span>
        <span class="chip">Net ${re(ts(n.net))}</span>
        <span class="chip">Threshold ${re(e.threshold)}</span>
      </div>
      <div class="row wrap" style="margin-top:12px">
        <a class="btn primary" href="#/wallet">Open Wallet &amp; request payout</a>
        <button class="btn" id="earnSeed">${a.length?"Reload demo earnings":"Load demo earnings"}</button>
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
  `;return _("Creator Earnings",b,{lead:"Rewards, commissions & ledger · TEST MODE · payouts on Wallet (§27)."})}function km(e){var t,s;(t=e.querySelector("#earnSeed"))==null||t.addEventListener("click",()=>{const a=(vs().earnings||[]).length>0,i=or({force:!0});h(a?"Demo earnings reloaded":`Loaded ${i.seeded||0} demo lines`),Cn(Tn(wo()))}),(s=e.querySelector("#earnDemoForm"))==null||s.addEventListener("submit",a=>{var d,c,p;a.preventDefault();const i=((d=e.querySelector("#earnCat"))==null?void 0:d.value)||"tips",n=Number((c=e.querySelector("#earnGross"))==null?void 0:c.value),o=(((p=e.querySelector("#earnNote"))==null?void 0:p.value)||"").trim()||"Manual demo earning";if(!(n>0))return h("Enter a positive gross amount");const r=hi({category:i,gross:n,note:o,source:"manual_demo"});h(`Recorded ${re(r.creatorShare)} creator share`),Cn(Tn(i))})}function Tn(e){return!e||e==="all"?"#/earnings":`#/earnings?cat=${e}`}function gt(){j("#/missions")}const Dn={song:"Song",album:"Album",video:"Video",live:"Livestream",app:"DBS App",interview:"Interview"};function wm(e){return"$"+Number(e||0).toFixed(0)}function Sm(e){const t=Number(e)||0;if(!t)return"No deadline";const s=t-Date.now();if(s<0)return`Ended ${Math.ceil(-s/864e5)}d ago`;const a=Math.ceil(s/864e5);return a<=1?"Due today / tomorrow":`${a}d left`}function $m(e=14){return new Date(Date.now()+e*864e5).toISOString().slice(0,10)}function Bs(){const{user:e}=M();if(e)return e;const t=Kt("DemoCreator");return h("Signed in as DemoCreator · local demo"),t||M().user}function xm(){const{user:e}=M(),t=fa().sort((p,m)=>(m.createdAt||0)-(p.createdAt||0)),s=t.filter(p=>p.status==="active"||p.status==="paused"),a=t.filter(p=>p.status==="ended"||p.status==="draft"),i=new Set(t.flatMap(p=>(p.participants||[]).map(m=>m.userId).filter(Boolean))).size,n=t.reduce((p,m)=>p+(m.submissions||[]).length,0),o=p=>{const m=p.fundSource==="third_party"?'<span class="chip">20% management fee · disclosed</span>':'<span class="chip">DBS-funded · marketing expense</span>',g=dc(p.id),f=e&&(p.participants||[]).some($=>$.userId===e.id),b=(p.submissions||[]).filter($=>e&&$.userId===e.id),y=g.length>0?g.slice(0,8).map(($,C)=>`<tr style="border-top:1px solid rgba(255,255,255,.06)">
              <td style="padding:6px 4px">${C+1}</td>
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
            </li>`).join("")}</ul>`:'<p class="muted" style="margin:8px 0 0;font-size:13px">No proof submissions yet.</p>',w=p.status==="active"?`<div class="row wrap" style="margin-top:10px;gap:8px">
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
        <span class="chip">${l(Dn[p.promoteType]||p.promoteType)}</span>
        <span class="chip">${l(p.status)}</span>
        <span class="chip">Budget ${wm(p.budget)}</span>
        <span class="chip">${l(Sm(p.deadline))}</span>
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
      ${w}
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
          <tbody>${y}</tbody>
        </table>
      </div>
      <h4 style="margin:14px 0 0;font-size:14px">Submissions</h4>
      ${v}
    </article>`},r=s.length?s.map(o).join(""):t.length?'<div class="card"><p class="muted" style="margin:0">No active or paused missions. Create one or resume from archive.</p></div>':"",d=a.length>0?`<div class="card"><h3>Archive</h3>${a.map(o).join("")}</div>`:"",c=`
    <div class="pikk-missions-studio">
      <section class="pikk-missions-hero" aria-label="PIKK Missions Studio overview">
        <p class="pikk-missions-kicker">PIKK CREATOR STUDIO · PROMOTIONAL CAMPAIGNS</p>
        <h2>Make your next <span>move count.</span></h2>
        <p>Explore creator missions, share your work and track demo rankings. Campaign budgets and points are examples, not real earnings.</p>
        <div class="pikk-missions-stats" aria-label="Current demo mission totals">
          <div class="pikk-missions-stat"><strong>${s.length}</strong><span>Open / paused</span></div>
          <div class="pikk-missions-stat"><strong>${i}</strong><span>Demo creators</span></div>
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
              ${Object.entries(Dn).map(([p,m])=>`<option value="${p}">${l(m)}</option>`).join("")}
            </select>
          </div>
          <div class="field"><label>Budget (USD)</label><input name="budget" id="msnBudget" type="number" min="0" step="1" value="500" /></div>
        </div>
        <div class="grid-2">
          <div class="field"><label>Deadline</label><input name="deadline" id="msnDeadline" type="date" value="${$m(14)}" /></div>
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
  `;return _("Missions",c,{lead:"Promotional campaigns · Clippers & creators · TEST MODE (§6)."})}function Em(e){var t,s,a;(t=e.querySelector("#msnSeed"))==null||t.addEventListener("click",()=>{const i=fa().length>0,n=pc({force:!0});h(i?"Demo missions reloaded":`Loaded ${n.seeded||0} demo missions`),gt()}),(s=e.querySelector("#msnSignIn"))==null||s.addEventListener("click",()=>{Bs(),gt()}),(a=e.querySelector("#msnCreate"))==null||a.addEventListener("submit",i=>{var g,f,b,y,v,w;i.preventDefault();const n=((g=e.querySelector("#msnTitle"))==null?void 0:g.value)||"",o=((f=e.querySelector("#msnType"))==null?void 0:f.value)||"app",r=Number((b=e.querySelector("#msnBudget"))==null?void 0:b.value)||0,d=((y=e.querySelector("#msnDeadline"))==null?void 0:y.value)||"",c=((v=e.querySelector("#msnFund"))==null?void 0:v.value)||"dbs",p=((w=e.querySelector("#msnReward"))==null?void 0:w.value)||"",m=nc({title:n,promoteType:o,budget:r,deadline:d,fundSource:c,reward:p,status:"active"});if(m.error)return h("Title required");h(`Mission created · ${m.title}`),gt()}),e.querySelectorAll("[data-join]").forEach(i=>{i.addEventListener("click",()=>{Bs();const n=i.getAttribute("data-join"),o=oc(n);if(o.error==="signin")return h("Sign in required");if(o.error==="already_joined")return h("Already joined");if(o.error==="not_active")return h("Mission not active");if(o.error)return h("Could not join");h("Joined mission · referral code assigned"),gt()})}),e.querySelectorAll("[data-bump]").forEach(i=>{i.addEventListener("click",()=>{Bs();const n=i.getAttribute("data-bump"),o=cc(n,5);if(o.error)return h(o.error==="not_joined"?"Join first":"Bump failed");h("+5 demo points"),gt()})}),e.querySelectorAll("[data-status]").forEach(i=>{i.addEventListener("click",()=>{const n=i.getAttribute("data-status"),o=i.getAttribute("data-next");if(rc(n,o).error)return h("Status update failed");h(`Mission → ${o}`),gt()})}),e.querySelectorAll("form.msn-proof").forEach(i=>{i.addEventListener("submit",n=>{var c;n.preventDefault(),Bs();const o=i.getAttribute("data-id"),r=((c=i.querySelector('[name="proof"]'))==null?void 0:c.value)||"",d=lc(o,{proof:r});if(d.error==="required")return h("Enter a URL or note");if(d.error==="not_joined")return h("Join first");if(d.error==="not_active")return h("Mission not active");if(d.error)return h("Submit failed");h("Proof submitted · pending manual review · +10 pts"),gt()})})}const Am=[{id:"trending",label:"Trending"},{id:"following",label:"Following"},{id:"discover",label:"Discover"}];function Cm(){return!!M().exploreDiscoverable}function Ce({href:e,title:t,meta:s,chip:a}){return`<a class="explore-hit" href="${l(e)}">
    <div>
      <strong>${l(t)}</strong>
      <div class="muted" style="font-size:12px;margin-top:2px">${l(s||"")}</div>
    </div>
    ${a?`<span class="chip">${l(a)}</span>`:""}
  </a>`}function Ze(e,t,s){return t?`<div class="card explore-section">
    <h3>${l(e)}</h3>
    <div class="explore-hits">${t}</div>
  </div>`:`<div class="card explore-section">
      <h3>${l(e)}</h3>
      <p class="muted" style="margin:0">${l(s||"No matches")}</p>
    </div>`}function ra(e){if(!e||!e.query)return`<div class="card" id="exploreResults">
      <p class="muted" style="margin:0">Search creators, fans, songs, albums, videos, posts, livestreams, and products. Exact locations are never indexed.</p>
    </div>`;const t=e.posts.length+e.profiles.length+e.music.length+e.videos.length+e.lives.length+e.products.length+e.pictures.length;if(!t)return`<div class="card" id="exploreResults">
      <p style="margin:0 0 6px"><strong>No results for “${l(e.query)}”</strong></p>
      <p class="muted" style="margin:0">Try another keyword, or browse Trending / Discover below. Report spam from a result’s destination page (demo shell).</p>
    </div>`;const s=e.posts.slice(0,8).map(m=>Ce({href:"#/posts",title:(m.text||"").slice(0,90)||"Post",meta:`@${m.username||"user"} · ${F(m.at||Date.now())}`,chip:"Post"})).join(""),a=e.profiles.slice(0,8).map(m=>Ce({href:`#/profile/${m.id}`,title:`@${m.username||m.id}`,meta:(m.bio||"Creator / fan").slice(0,80),chip:m.verified?"Verified":"Profile"})).join(""),i=e.music.slice(0,8).map(m=>Ce({href:"#/music",title:m.title,meta:`${m.artist||"Artist not credited"} · ${m.type}`,chip:m.type==="album"?"Album":"Song"})).join(""),n=e.videos.slice(0,8).map(m=>Ce({href:"#/videos",title:m.title,meta:`${m.artist||"Artist not credited"} · Video catalog`,chip:"Video"})).join(""),o=e.pictures.slice(0,8).map(m=>Ce({href:"#/home",title:m.title,meta:`${m.artist||"Creator not credited"} · picture`,chip:"Picture"})).join(""),r=e.lives.slice(0,8).map(m=>Ce({href:"#/live",title:m.title||"Livestream",meta:`@${m.hostName||"host"} · ${m.status==="live"?"LIVE now":"Ended"}`,chip:m.status==="live"?"Live":"Replay"})).join(""),d=e.products.slice(0,8).map(m=>Ce({href:"#/marketplace",title:m.title,meta:`${m.brand||"Brand"} · ${m.disclosure||"Sponsored"}`,chip:"Ad"})).join(""),c=e.query.toLowerCase(),p=[..._t.filter(m=>m.title.toLowerCase().includes(c)||m.artist.toLowerCase().includes(c)||c.includes("music")||c.includes("song")||c.includes("album")).map(m=>Ce({href:"#/music",title:m.title,meta:`${m.artist} · ${m.status}`,chip:"Cover"})),...fe.filter(m=>m.title.toLowerCase().includes(c)||(m.artist||"").toLowerCase().includes(c)||c.includes("video")||c.includes("mv")).map(m=>Ce({href:"#/videos",title:m.title,meta:`${m.artist||"Artist not credited"} · Official MV`,chip:"MV"}))].join("");return`<div id="exploreResults">
    <p class="muted" style="margin:0 0 10px">${t} result${t===1?"":"s"} for “${l(e.query)}”</p>
    ${Ze("People",a,"No matching creators or fans")}
    ${Ze("Posts",s,"No matching posts")}
    ${Ze("Music (catalog)",i,"No published songs/albums")}
    ${Ze("Videos (catalog)",n,"No published videos")}
    ${Ze("Pictures",o,"No published pictures")}
    ${Ze("Livestreams",r,"No live or history matches")}
    ${Ze("Products / ads",d,"No marketplace listings")}
    ${p?Ze("Music-based picks",p):""}
  </div>`}function Tm(){const e=Pl(10);return e.length?`<div class="section-swipe explore-trend">
    ${e.map(t=>`<a class="preview-card" href="${l(t.href)}">
        <strong>${l(t.title)}</strong>
        <span class="muted">${l(t.subtitle)}${t.score?` · ♥${t.score}`:""}</span>
      </a>`).join("")}
  </div>`:'<p class="muted">Nothing trending yet — like posts or publish catalog items.</p>'}function Dm(){const e=M().user;if(!e)return'<div class="card"><p class="muted" style="margin:0">Sign in on <a href="#/profile">Profile</a> to see accounts you follow. Demo only — no exact locations.</p></div>';const t=e.following||[];return t.length?`<div class="card explore-section"><h3>Following</h3><div class="explore-hits">${t.map(a=>{var n;const i=((n=M().profiles)==null?void 0:n[a])||{id:a,username:a};return Ce({href:`#/profile/${encodeURIComponent(i.id)}`,title:`@${i.username||i.id}`,meta:(i.bio||"Following").slice(0,80),chip:"Following"})}).join("")}</div></div>`:`<div class="card"><p class="muted" style="margin:0">You're not following anyone yet. Discover suggested accounts below, then follow from their profile.</p></div>`}function Lm(){const t=_l().slice(0,8).map(a=>Ce({href:`#/profile/${encodeURIComponent(a.id)}`,title:`@${a.username}`,meta:(a.bio||"Suggested").slice(0,80),chip:a.verified?"Verified":"Suggest"})).join(""),s=_t.map(a=>Ce({href:"#/music",title:a.title,meta:`${a.artist} · music-based`,chip:"Cover"})).join("");return`
    <div class="card">
      <h3>Discoverability (opt-in)</h3>
      <p class="muted" style="margin:0 0 10px">Appear in Explore suggestions. Off by default. No exact locations stored or shown.</p>
      <label class="row" style="gap:8px;align-items:center">
        <input type="checkbox" id="exploreDiscoverable" ${Cm()?"checked":""} />
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
    </div>`}function Mm(){const e=M().exploreTab||"trending",t=Am.map(i=>`<button type="button" role="tab" id="explore-tab-${i.id}" aria-controls="explorePanel" aria-selected="${i.id===e}" tabindex="${i.id===e?0:-1}" class="shop-chip${i.id===e?" on":""}" data-explore-tab="${i.id}">${l(i.label)}</button>`).join("");let s="";e==="following"?s=Dm():e==="discover"?s=Lm():s=`<div class="card">
      <h3>Trending Across PIKK</h3>
      <p class="muted" style="margin:0 0 10px">High-engagement public posts and seeded demo cards (not a full engagement pipeline).</p>
      ${Tm()}
    </div>
    <div id="exploreResultsWrap">${ra(null)}</div>`;const a=`
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
  `;return _("Explore",a,{lead:"Universal search & discovery across PIKK.",badge:"Phase 2 demo"})}function Ln(e,t){var n,o,r,d,c,p,m;const s=Il(t),a=e.querySelector("#exploreResultsWrap");if(a)a.innerHTML=ra(s);else{const g=e.querySelector("#explorePanel");if(g){let f=g.querySelector("#exploreLiveInsert");f||(f=document.createElement("div"),f.id="exploreLiveInsert",g.prepend(f)),f.innerHTML=ra(s)}}const i=(((n=s.posts)==null?void 0:n.length)||0)+(((o=s.profiles)==null?void 0:o.length)||0)+(((r=s.music)==null?void 0:r.length)||0)+(((d=s.videos)==null?void 0:d.length)||0)+(((c=s.lives)==null?void 0:c.length)||0)+(((p=s.products)==null?void 0:p.length)||0)+(((m=s.pictures)==null?void 0:m.length)||0);s.query&&h(i?`${i} result(s)`:"No matches")}function Im(e){var c;const t=e.querySelector("#exploreQ"),s=e.querySelector("#exploreGo"),a=e.querySelector("#exploreClear"),i=()=>Ln(e,(t==null?void 0:t.value)||"");s==null||s.addEventListener("click",i);function n(){var m;clearTimeout(o),t&&(t.value="");const p=e.querySelector("#exploreResultsWrap");p&&(p.innerHTML=ra(null)),(m=e.querySelector("#exploreLiveInsert"))==null||m.remove(),h("Cleared")}a==null||a.addEventListener("click",n);let o;t==null||t.addEventListener("input",()=>{clearTimeout(o),o=setTimeout(i,220)}),t==null||t.addEventListener("keydown",p=>{p.key==="Escape"&&t.value?(p.preventDefault(),n(),t.focus()):p.key==="Enter"&&(p.preventDefault(),clearTimeout(o),i())});const r=[...e.querySelectorAll("[data-explore-tab]")];function d(p,m=!1){var f;const g=(t==null?void 0:t.value)||"";if(clearTimeout(o),Gi({exploreTab:p}),j("/explore"),g.trim()){const b=document.getElementById("app"),y=b==null?void 0:b.querySelector("#exploreQ");y&&(y.value=g,Ln(b,g))}m&&((f=document.getElementById("explore-tab-"+p))==null||f.focus())}r.forEach((p,m)=>{p.addEventListener("click",()=>d(p.dataset.exploreTab)),p.addEventListener("keydown",g=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(g.key))return;g.preventDefault();const f=r.length-1,b=g.key==="Home"?0:g.key==="End"?f:(m+(g.key==="ArrowRight"?1:-1)+r.length)%r.length;d(r[b].dataset.exploreTab,!0)})}),(c=e.querySelector("#exploreDiscoverable"))==null||c.addEventListener("change",p=>{Gi({exploreDiscoverable:!!p.target.checked}),h(p.target.checked?"Discoverable on":"Discoverable off")})}let Hs=null;function ft(e){j("#/giftbattles")}function Mn(){Hs&&(clearInterval(Hs),Hs=null)}function se(e){return"$"+Number(e||0).toFixed(2)}function So(e){const t=Math.max(0,Math.ceil(e/1e3)),s=Math.floor(t/60),a=t%60;return`${s}:${String(a).padStart(2,"0")}`}function Pm(){return _("Gift Battles",`<div class="card">
      <h3>Sign in required</h3>
      <p class="muted">Gift battles need a local demo account so scores and history persist on this device.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,{lead:"Runs during Live · not a separate stream · voluntary support · TEST MODE"})}function _m(){return`
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
    </div>`}function Om(e){if(!e)return`
      <div class="card">
        <h3>Champion Spotlight</h3>
        <p class="muted" style="margin:0">No active champion today. Win a battle to claim the rest-of-day banner.</p>
      </div>`;const t=Math.max(0,(e.championUntil||0)-Date.now()),s=Math.floor(t/36e5),a=Math.floor(t%36e5/6e4);return`
    <div class="card gb-champion" role="status">
      <div class="row wrap" style="gap:8px;align-items:center">
        <span class="gb-sticker-slot" aria-hidden="true">${qi("battle-crown",{className:"gift-sticker gift-sticker--battle"}).html}</span>
        <div class="chip">Challenge Winner · rest of day</div>
      </div>
      <h3 class="gb-champion-name">${l(e.username)}</h3>
      <p class="muted" style="margin:0">
        Score ${l(se(e.score))} · ~${s}h ${a}m left today
        · ${l(e.mode||"demo")}
      </p>
    </div>`}function qm(e,t){return e?`
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
    </div>`}function Nm(e){return`
    <div class="card gb-battle" data-gb-status="pending">
      <h3>Challenge pending</h3>
      <p><strong>${l(e.challenger.name)}</strong> challenged <strong>${l(e.opponent.name)}</strong></p>
      <p class="muted">Mode: ${l(e.mode)} · opponent must Accept or Decline (demo controls below).</p>
      <div class="row wrap" style="gap:8px;margin-top:12px">
        <button type="button" class="btn primary" id="gbAccept">Accept</button>
        <button type="button" class="btn ghost" id="gbDecline">Decline</button>
      </div>
    </div>`}function Bm(e){const t=Math.max(0,(e.endsAt||0)-Date.now()),s=So(t);return`
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
    </div>`}function Rm(e){var i,n;let t="Tie",s="Equal voluntary support · recognition for both";e.result==="win"&&e.winnerName?(t=`Winner · ${e.winnerName}`,s="Recognition only — no opponent funds transferred"):e.result==="declined"&&(t="Declined",s="Challenge was declined");const a=e.result==="win"?qi("battle-win",{className:"gift-sticker gift-sticker--battle"}).html:"";return`
    <div class="card gb-battle gb-ended" data-gb-status="ended">
      <div class="row wrap" style="gap:8px;align-items:center">
        ${a?`<span class="gb-sticker-slot" aria-hidden="true">${a}</span>`:""}
        <div class="chip">${e.result==="win"?"Winner":e.result==="tie"?"Tie":"Ended"}</div>
      </div>
      <h3 class="gb-winner-banner">${l(t)}</h3>
      <p class="muted">${l(s)}</p>
      <p class="gb-score-text" style="margin:12px 0">
        Final: ${l(((i=e.challenger)==null?void 0:i.name)||"?")} ${l(se(e.scoreA))} —
        ${l(((n=e.opponent)==null?void 0:n.name)||"?")} ${l(se(e.scoreB))}
      </p>
      <button type="button" class="btn primary" id="gbClear">New challenge</button>
    </div>`}function jm(e,t){var i;const a=ur().map(n=>`<option value="${l(n.id)}">${l(n.name)} — ${l(n.bio)}</option>`).join("");return`
    <div class="card">
      <h3>Start a challenge</h3>
      <p class="muted">You are the challenger. Pick a demo opponent. ${e?"Live mode will record your gifts through Live support stubs.":"No live session — sandbox mode."}</p>
      ${t.invitationsEnabled?"":'<p class="gb-warn">Invitations are disabled in prefs — enable below to challenge.</p>'}
      <label class="field">
        <span>Opponent</span>
        <select id="gbOpponent">${a}</select>
      </label>
      <div class="row wrap" style="gap:8px;margin-top:12px">
        ${e?`<button type="button" class="btn primary" id="gbStartLive" ${t.invitationsEnabled?"":"disabled"}>Challenge (Live mode)</button>`:""}
        <button type="button" class="btn ${e?"ghost":"primary"}" id="gbStartSandbox" ${t.invitationsEnabled?"":"disabled"}>
          Demo battle sandbox
        </button>
        <button type="button" class="btn ghost" id="gbTopUp">Add $10 demo wallet</button>
      </div>
      <p class="muted" style="margin:10px 0 0">Wallet: <strong id="gbWalletBal">${l(se(((i=M().wallet)==null?void 0:i.balance)||0))}</strong> · TEST MODE</p>
    </div>`}function Fm(){const e=wi(10),t=e.length?e.map((s,a)=>`<li class="gb-day-row">${it("battle-win",{className:"gift-sticker gift-sticker--xs"})}<span class="chip">#${a+1}</span><strong>${l(s.username)}</strong></li>`).join(""):'<li class="muted">No winners yet today · win a 60s battle</li>';return`
    <div class="card gb-day-board" id="gbDayWinners">
      <div class="row wrap" style="justify-content:space-between;gap:8px">
        <h3 style="margin:0">Today&apos;s winners</h3>
        <span class="chip">${e.length}/10 · end of day</span>
      </div>
      <p class="muted" style="margin:6px 0 8px;font-size:12px">Sticker board · recognition only · TEST MODE</p>
      <ol class="gb-list gb-day-list">${t}</ol>
    </div>`}function Km(){const e=Gl(12),t=Ul(15),s=e.length?e.map(i=>{var o,r;const n=i.result==="win"?`Winner ${i.winnerName}`:i.result==="tie"?"Tie":i.result||i.status;return`<li>
            <strong>${l(n)}</strong>
            <span class="muted"> · ${l(((o=i.challenger)==null?void 0:o.name)||"?")} ${l(se(i.scoreA))} vs ${l(((r=i.opponent)==null?void 0:r.name)||"?")} ${l(se(i.scoreB))} · ${l(F(i.endedAt||i.createdAt||0))} · ${l(i.mode||"")}</span>
          </li>`}).join(""):'<li class="muted">No battles yet.</li>';return`
    <div class="card">
      <h3>Top winners (local)</h3>
      <ol class="gb-list">${t.length?t.map((i,n)=>`<li><span class="chip">#${n+1}</span> <strong>${l(i.username)}</strong> <span class="muted">${i.wins} win${i.wins===1?"":"s"} · ${l(se(i.points))} battle pts</span></li>`).join(""):'<li class="muted">Win a battle to appear here.</li>'}</ol>
    </div>
    <div class="card">
      <h3>Battle history</h3>
      <ul class="gb-list">${s}</ul>
    </div>`}function Gm(e){return`
    <div class="card">
      <h3>Battle prefs</h3>
      <label class="toggle"><span>Allow battle invitations</span>
        <input type="checkbox" id="gbPrefInvites" ${e.invitationsEnabled?"checked":""}/>
      </label>
      <p class="muted" style="margin:8px 0 0">When off, new challenges are blocked. Existing active battles can still finish.</p>
    </div>`}function Vm(){const{user:e,live:t}=M();if(!e)return Pm();ki();const s=bi(),a=vi(),i=Vl(),n=!!(t&&!t.endedAt);let o="";(s==null?void 0:s.status)==="pending"?o=Nm(s):(s==null?void 0:s.status)==="active"?o=Bm(s):(s==null?void 0:s.status)==="ended"?o=Rm(s):o=jm(n,a);const r=`
    ${_m()}
    ${Om(i)}
    ${Fm()}
    ${qm(n,t)}
    ${o}
    ${Km()}
    ${Gm(a)}
  `;return _("Gift Battles",r,{lead:"Runs during Live · not a separate stream · 60s voluntary gift battles · not wagers · TEST MODE",badge:(s==null?void 0:s.status)==="active"?"BATTLE":i?"CHAMP":void 0})}function Um(e){var a,i,n,o,r,d,c;Mn(),(a=e.querySelector("#gbPrefInvites"))==null||a.addEventListener("change",p=>{ql({invitationsEnabled:p.target.checked}),h(p.target.checked?"Invitations on":"Invitations off")}),(i=e.querySelector("#gbTopUp"))==null||i.addEventListener("click",()=>{var m;Zs(10,"Gift battle demo top-up · TEST MODE"),h("+$10 demo wallet");const p=e.querySelector("#gbWalletBal");p&&(p.textContent=se(((m=M().wallet)==null?void 0:m.balance)||0))});const t=p=>{const m=e.querySelector("#gbOpponent"),g=m==null?void 0:m.value,f=ur().find(y=>y.id===g),b=Nl({opponentId:g,opponentName:f==null?void 0:f.name,mode:p});if((b==null?void 0:b.error)==="signin")return h("Sign in first");if((b==null?void 0:b.error)==="invites_disabled")return h("Invitations disabled");if((b==null?void 0:b.error)==="not_live")return h("Not live — use sandbox");if((b==null?void 0:b.error)==="battle_in_progress")return h("Battle already in progress");if((b==null?void 0:b.error)==="self")return h("Pick another fan");h("Challenge sent · waiting for accept"),ft()};(n=e.querySelector("#gbStartLive"))==null||n.addEventListener("click",()=>t("live")),(o=e.querySelector("#gbStartSandbox"))==null||o.addEventListener("click",()=>t("sandbox")),(r=e.querySelector("#gbAccept"))==null||r.addEventListener("click",()=>{const p=Bl();if((p==null?void 0:p.error)==="no_pending")return h("No pending challenge");if((p==null?void 0:p.error)==="invites_disabled")return h("Invitations disabled");h("Battle started · 1:00"),ft()}),(d=e.querySelector("#gbDecline"))==null||d.addEventListener("click",()=>{const p=Rl();if(p!=null&&p.error)return h(String(p.error));h("Challenge declined"),ft()}),(c=e.querySelector("#gbClear"))==null||c.addEventListener("click",()=>{const p=jl();if(p!=null&&p.error)return h("Battle still running");ft()}),e.querySelectorAll("[data-gb-gift]").forEach(p=>{p.addEventListener("click",()=>{var v;const m=Kl({side:p.dataset.gbGift,kind:p.dataset.kind||"gift",amount:Number(p.dataset.amt)||2,label:p.dataset.label||""});if((m==null?void 0:m.error)==="signin")return h("Sign in first");if((m==null?void 0:m.error)==="no_active"||(m==null?void 0:m.error)==="ended")return h("No active battle");if((m==null?void 0:m.error)==="offline")return h("Live offline — use sandbox");if((m==null?void 0:m.error)==="insufficient")return h("Need wallet credits");if(h(p.dataset.gbGift==="opponent"?"Opponent support (demo)":"Support sent · demo"),((v=m.battle)==null?void 0:v.status)==="ended"){h(m.battle.result==="win"?`Winner · ${m.battle.winnerName}`:"Tie!"),ft();return}const g=e.querySelector("#gbScoreA"),f=e.querySelector("#gbScoreB"),b=e.querySelector("#gbScoreText"),y=m.battle;g&&f&&y?(g.textContent=se(y.scoreA),g.setAttribute("aria-label",`Challenger score ${se(y.scoreA)}`),f.textContent=se(y.scoreB),f.setAttribute("aria-label",`Opponent score ${se(y.scoreB)}`),b&&(b.textContent=`Live score: ${y.challenger.name} ${se(y.scoreA)} — ${y.opponent.name} ${se(y.scoreB)}`)):ft()})});const s=e.querySelector("#gbClock");s&&(Hs=setInterval(()=>{const p=ki();if(!p||p.status==="ended"){Mn(),(p==null?void 0:p.status)==="ended"&&h(p.result==="win"?`Winner · ${p.winnerName}`:"Tie!"),ft();return}const m=Math.max(0,(p.endsAt||0)-Date.now());s.textContent=So(m)},250))}function ke(){j("#/multiguest")}function Hm(e){return(String(e||"?").trim().slice(0,2)||"?").toUpperCase()}function zm(e){const t=M().user;return!t||!e?!1:(t.following||[]).includes(e)}function Ni(e){return((e==null?void 0:e.guests)||[]).filter(t=>t.status==="joined")}function Wm(e){return((e==null?void 0:e.guests)||[]).filter(t=>t.status==="invited")}function Za(e,t){var a,i;return`${Number(((i=(a=e==null?void 0:e.giftSplit)==null?void 0:a.shares)==null?void 0:i[t])||0).toFixed(0)}%`}function Ym(){return _("Multi-Guest Live",`<div class="card">
      <h3>Sign in required</h3>
      <p class="muted">Start a multi-guest demo session as host. No camera / WebRTC — fake stage tiles only.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,{lead:"Invite 2–4 co-hosts · disclosed gift splits · TEST MODE"})}function Jm(){return`
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
    </div>`}function Ba({role:e,name:t,sub:s,muted:a,empty:i,followId:n}){if(i)return`
      <div class="mg-tile mg-tile-empty" aria-label="Empty guest slot">
        <div class="mg-avatar mg-avatar-empty">+</div>
        <div class="mg-tile-name muted">Open slot</div>
        <div class="mg-tile-sub muted">Invite a guest</div>
      </div>`;const o=a?'<span class="chip">Muted</span>':"",r=n&&n!=="dbs"?zm(n)?`<button class="btn ghost mg-follow" data-follow="${l(n)}" data-on="1">Following</button>`:`<button class="btn ghost mg-follow" data-follow="${l(n)}" data-on="0">Follow</button>`:n==="dbs"?'<a class="btn ghost" href="#/profile">Follow PIKK</a>':"";return`
    <div class="mg-tile ${e==="host"?"mg-tile-host":""} ${a?"mg-muted":""}">
      <div class="mg-avatar" aria-hidden="true">${l(Hm(t))}</div>
      <div class="mg-tile-name">${l(t)}</div>
      <div class="mg-tile-sub">${l(s||"")} ${o}</div>
      <div class="mg-tile-actions">${r}</div>
    </div>`}function Qm(e){var n,o;const t=Ni(e),s=[];s.push(Ba({role:"host",name:e.hostName,sub:"Host",followId:e.hostId===((n=M().user)==null?void 0:n.id)?"dbs":e.hostId}));for(let r=0;r<(e.maxGuests||4);r++){const d=t[r];d?s.push(Ba({role:"guest",name:d.username,sub:"Guest",muted:d.muted,followId:d.id})):s.push(Ba({empty:!0}))}const a=(o=e.giftSplit)!=null&&o.disclosed?'<span class="chip">Split disclosed</span>':'<span class="chip">Split pending</span>',i=e.broadcastReady?'<span class="chip">Broadcast ready</span>':'<span class="chip">Setup</span>';return`
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
          ${i}
          ${a}
        </div>
      </div>
      <p class="muted mg-stage-note">TEST MODE · placeholder tiles · no camera / bandwidth stream</p>
      <div class="mg-grid" role="list">${s.join("")}</div>
      <div class="row wrap" style="gap:8px;margin-top:12px">
        <a class="btn ghost" href="#/music">PIKK Music</a>
        <a class="btn ghost" href="#/live">Solo Live</a>
        <button class="btn ghost danger" id="mgEnd">End session</button>
      </div>
    </div>`}function Xm(e){const t=Hl(),s=new Set((e.guests||[]).filter(p=>p.status==="invited"||p.status==="joined").map(p=>p.id)),a=t.filter(p=>p.id!==e.hostId&&!s.has(p.id)),i=Wm(e),n=Ni(e),o=a.length?a.map(p=>`<option value="${l(p.id)}">${l(p.username)} — ${l(p.bio||"demo")}</option>`).join(""):'<option value="">No more demo guests</option>',r=i.length?i.map(p=>`
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
            <span class="muted" style="font-size:12px"> · gift ${l(Za(e,p.id))}</span>
          </span>
          <span class="row wrap" style="gap:6px">
            <button class="btn ghost mg-mute" data-id="${l(p.id)}" data-muted="${p.muted?"1":"0"}">
              ${p.muted?"Unmute":"Mute"}
            </button>
            <button class="btn ghost mg-leave" data-id="${l(p.id)}">Leave (sim)</button>
            <button class="btn ghost danger mg-remove" data-id="${l(p.id)}">Remove</button>
          </span>
        </li>`).join(""):'<li class="muted">No guests on stage yet — invite below.</li>',c=n.length+i.length>=(e.maxGuests||4);return`
    <div class="card">
      <h3>Guests &amp; moderation</h3>
      <p class="muted" style="margin:0 0 8px">Host simulates Accept/Decline. Up to ${l(String(e.maxGuests||4))} guests.</p>
      <ul class="mg-list">${d}</ul>
      <h4 style="margin:14px 0 6px">Pending invites</h4>
      <ul class="mg-list">${r}</ul>
      <div class="field" style="margin-top:12px">
        <span>Invite demo guest</span>
        <div class="row wrap" style="gap:8px;margin-top:6px">
          <select id="mgInviteSelect" ${c||!a.length?"disabled":""}>${o}</select>
          <button class="btn primary" id="mgInviteBtn" ${c||!a.length?"disabled":""}>Invite</button>
        </div>
      </div>
      ${c?'<p class="muted" style="margin:8px 0 0">Guest slots full (joined + pending).</p>':""}
    </div>`}function Zm(e){var o,r;const t=Ni(e),s=[{id:e.hostId,username:e.hostName,role:"Host"},...t.map(d=>({id:d.id,username:d.username,role:"Guest"}))],a=((o=e.giftSplit)==null?void 0:o.mode)||"equal",i=!!((r=e.giftSplit)!=null&&r.disclosed),n=s.map(d=>{var p,m;const c=Number(((m=(p=e.giftSplit)==null?void 0:p.shares)==null?void 0:m[d.id])||0);return`
        <li class="mg-split-row">
          <span><strong>@${l(d.username)}</strong> <span class="chip">${l(d.role)}</span></span>
          ${a==="custom"&&!i?`<label class="mg-pct"><input type="number" min="0" max="100" step="1" class="mg-share-input" data-id="${l(d.id)}" value="${l(String(c))}" /> %</label>`:`<span class="chip">${l(String(Math.round(c)))}%</span>`}
        </li>`}).join("");return`
    <div class="card mg-split">
      <h3>Gift split disclosure</h3>
      <p class="muted">Required before broadcast when multiple hosts/guests share gifts. Display-only · TEST MODE · not a real payout.</p>
      <div class="row wrap" style="gap:8px;margin:10px 0">
        <button class="btn ${a==="equal"?"primary":"ghost"}" id="mgSplitEqual">Equal split</button>
        <button class="btn ${a==="custom"?"primary":"ghost"}" id="mgSplitCustom">Custom %</button>
      </div>
      <ul class="mg-list">${n}</ul>
      <p class="muted" style="margin:8px 0 0">Host share: <strong>${l(Za(e,e.hostId))}</strong>
        · Guests: ${t.length?t.map(d=>`@${l(d.username)} ${l(Za(e,d.id))}`).join(" · "):"none yet"}</p>
      ${i?`<p class="mg-ok" style="margin:10px 0 0">✓ Split disclosed ${e.giftSplit.disclosedAt?"· "+F(e.giftSplit.disclosedAt):""}. Broadcast ready (demo).</p>`:`<div class="row wrap" style="gap:8px;margin-top:12px">
               ${a==="custom"?'<button class="btn" id="mgSplitApply">Apply custom %</button>':""}
               <button class="btn primary" id="mgDisclose">Disclose &amp; ready broadcast</button>
             </div>
             <p class="muted" style="margin:8px 0 0">Custom % must total 100 among host + joined guests.</p>`}
    </div>`}function eh(e){return`
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
    </div>`}function In(e){return e.length?`
    <div class="card">
      <h3>Recent multi-guest sessions</h3>
      <ul class="mg-list">${e.slice(0,8).map(s=>{var i;const a=(s.guests||[]).filter(n=>n.status==="joined"||n.joinedAt).length;return`<li><strong>${l(s.title)}</strong> · ${l(String(a))} guests · ${F(s.endedAt||s.startedAt)}
        ${(i=s.giftSplit)!=null&&i.disclosed?" · split disclosed":""}</li>`}).join("")}</ul>
    </div>`:`
      <div class="card">
        <h3>Recent multi-guest sessions</h3>
        <p class="muted" style="margin:0">No ended sessions yet.</p>
      </div>`}function th(e){return`
    <div class="card">
      <h3>Start multi-guest session</h3>
      <p class="muted">You host as <strong>@${l(e.username)}</strong>. Invite demo contacts next — no real stream.</p>
      <div class="field" style="margin-top:10px">
        <span>Session title</span>
        <input id="mgTitle" maxlength="80" placeholder="e.g. Friday collab freestyle" value="PIKK Multi-Guest Demo" />
      </div>
      <button class="btn primary" id="mgStart" style="margin-top:12px">Start as host</button>
    </div>`}function sh(){const t=M().user;if(!t)return Ym();ga();const s=bs(),a=zl();return!s||s.endedAt?_("Multi-Guest Live",`${Jm()}${th(t)}${In(a)}`,{lead:"2–4 co-hosts · gift split disclosure · TEST MODE"}):_("Multi-Guest Live",`${Qm(s)}${Xm(s)}${Zm(s)}${eh(s)}${In(a)}`,{lead:"Active collab session · fake stage · TEST MODE"})}function ah(e){var s,a,i,n,o,r,d,c,p;if(!e)return;(s=e.querySelector("#mgStart"))==null||s.addEventListener("click",()=>{var f;const m=((f=e.querySelector("#mgTitle"))==null?void 0:f.value)||"",g=Wl(m);if(g.error==="signin")return h("Sign in first");if(g.error==="session_in_progress")return h("Session already active");h("Multi-guest session started"),ke()}),(a=e.querySelector("#mgEnd"))==null||a.addEventListener("click",()=>{const m=ac();if(m.error)return h(m.error==="host_only"?"Host only":"No session");h("Session ended"),ke()}),(i=e.querySelector("#mgInviteBtn"))==null||i.addEventListener("click",()=>{var f,b;const m=(f=e.querySelector("#mgInviteSelect"))==null?void 0:f.value;if(!m)return h("Pick a guest");const g=Yl(m);if(g.error==="full")return h("Guest slots full");if(g.error==="already_invited")return h("Already invited");if(g.error)return h("Invite failed: "+g.error);h("Invited @"+(((b=g.guest)==null?void 0:b.username)||m)),ke()}),e.querySelectorAll(".mg-accept").forEach(m=>{m.addEventListener("click",()=>{var f;const g=Jl(m.getAttribute("data-id"));if(g.error==="full")return h("Stage full");if(g.error)return h("Accept failed");h("@"+(((f=g.guest)==null?void 0:f.username)||"")+" joined"),ke()})}),e.querySelectorAll(".mg-decline").forEach(m=>{m.addEventListener("click",()=>{if(Ql(m.getAttribute("data-id")).error)return h("Decline failed");h("Invite declined"),ke()})}),e.querySelectorAll(".mg-mute").forEach(m=>{m.addEventListener("click",()=>{const g=m.getAttribute("data-id"),f=m.getAttribute("data-muted")==="1";if(ec(g,!f).error)return h("Mute failed");h(f?"Unmuted":"Muted"),ke()})}),e.querySelectorAll(".mg-leave").forEach(m=>{m.addEventListener("click",()=>{if(Xl(m.getAttribute("data-id")).error)return h("Leave failed");h("Guest left"),ke()})}),e.querySelectorAll(".mg-remove").forEach(m=>{m.addEventListener("click",()=>{if(Zl(m.getAttribute("data-id")).error)return h("Remove failed");h("Guest removed"),ke()})}),e.querySelectorAll(".mg-follow").forEach(m=>{m.addEventListener("click",()=>{const g=m.getAttribute("data-follow");m.getAttribute("data-on")==="1"?(da(g),h("Unfollowed")):(ca(g),h("Following")),ke()})}),(n=e.querySelector("#mgSplitEqual"))==null||n.addEventListener("click",()=>{if(ns({mode:"equal",disclose:!1}).error)return h("Split failed");h("Equal split applied"),ke()}),(o=e.querySelector("#mgSplitCustom"))==null||o.addEventListener("click",()=>{var f;const m=bs();if(ns({mode:"custom",shares:((f=m==null?void 0:m.giftSplit)==null?void 0:f.shares)||{},disclose:!1}).error)return h("Could not switch to custom");h("Custom split — edit % then Apply"),ke()}),(r=e.querySelector("#mgSplitApply"))==null||r.addEventListener("click",()=>{const m={};e.querySelectorAll(".mg-share-input").forEach(f=>{m[f.getAttribute("data-id")]=Number(f.value)||0});const g=ns({mode:"custom",shares:m,disclose:!1});if(g.error==="split_total")return h(`Percents total ${g.total}% — need 100%`);if(g.error)return h("Apply failed");h("Custom split saved"),ke()}),(d=e.querySelector("#mgDisclose"))==null||d.addEventListener("click",()=>{var f;const m=bs();if(((f=m==null?void 0:m.giftSplit)==null?void 0:f.mode)==="custom"){const b={},y=e.querySelectorAll(".mg-share-input");if(y.length){y.forEach(w=>{b[w.getAttribute("data-id")]=Number(w.value)||0});const v=ns({mode:"custom",shares:b,disclose:!1});if(v.error==="split_total")return h(`Percents total ${v.total}% — need 100%`)}}const g=sc();if(g.error==="split_total")return h(`Percents total ${g.total}% — need 100%`);if(g.error)return h("Disclose failed");h("Gift split disclosed · broadcast ready (demo)"),ke()});const t=()=>{const m=e.querySelector("#mgChatInput"),g=(m==null?void 0:m.value)||"",f=tc(g);if(f.error==="empty")return h("Type a message");if(f.error)return h("Chat failed");m&&(m.value=""),ke()};(c=e.querySelector("#mgChatSend"))==null||c.addEventListener("click",t),(p=e.querySelector("#mgChatInput"))==null||p.addEventListener("keydown",m=>{m.key==="Enter"&&(m.preventDefault(),t())})}function we(e){j(e?`#/fanclubs?club=${encodeURIComponent(e)}`:"#/fanclubs")}function We(e="DemoFan"){const{user:t}=M();if(t)return t;const s=Kt(e);return h(`Signed in as ${e} · local demo`),s||M().user}function $o(e){return e==="paid"?"Paid / Skeet+":e==="members"?"Members only":"Public"}function ih(e,t){const s=t===e.id,a=[e.official?'<span class="chip">Official DBS</span>':"",`<span class="chip">${l($o(e.privacy))}</span>`,`<span class="chip">${e.memberCount||0} members</span>`].filter(Boolean).join(" ");return`<button type="button" class="fanclub-card${s?" on":""}" data-open-club="${l(e.id)}" data-search="${l(`${e.name||""} ${e.hostName||""} ${e.description||""}`)}" aria-label="Open ${l(e.name)} club">
    <div class="row" style="gap:10px;align-items:center">
      <img src="${l(e.graphic||"/brand/logo-dbs-v3@2x.webp")}" alt="" width="48" height="48" style="border-radius:12px;object-fit:cover;background:#111" />
      <div style="flex:1;min-width:0">
        <strong>${l(e.name)}</strong>
        <div class="muted" style="font-size:12px;margin-top:2px">Host @${l(e.hostName)} · Discover DatBoiSkeet</div>
        <div class="row wrap" style="gap:6px;margin-top:6px">${a}</div>
      </div>
    </div>
  </button>`}function nh(e){const t=As(e);if(!t)return'<div class="card"><p class="muted" style="margin:0">Club not found.</p><button class="btn" data-back-list>Back to clubs</button></div>';const s=M().user,a=$r(t.id),i=Mc(t.id),n=ks(t.id),o=xr(t.id),r=Et(),d=o.ok?"":`<div class="card" style="border-color:rgba(245,158,11,.35)">
          <h3 style="margin:0 0 6px">${t.privacy==="paid"?"Skeet+ room":"Members only"}</h3>
          <p class="muted" style="margin:0 0 10px">${t.privacy==="paid"?"This room uses membership permissions (Skeet+ or higher). TEST MODE unlock below — no real charge.":"Join the club to enter the discussion room."}</p>
          ${t.privacy==="paid"?`<button class="btn primary" id="fcUnlockSkeet">Unlock Skeet+ · TEST MODE</button>
                 <a class="btn" href="#/pricing">Pricing</a>
                 <p class="chip" style="margin-top:8px">Current membership: ${l(r||"none")}</p>`:`<button class="btn primary" data-join="${l(t.id)}">Join club</button>`}
        </div>`,c=o.ok?Ic(t.id):[],p=o.ok?c.length?c.map(g=>{const f=n?`<div class="row wrap" style="gap:6px;margin-top:6px">
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
            <span class="chip">${l($o(t.privacy))}</span>
            <span class="chip">${t.memberCount||0} members</span>
            <span class="chip">${(t.followers||[]).length} following</span>
          </div>
        </div>
      </div>
      <div class="row wrap" style="gap:8px;margin-top:14px">
        ${a?`<button class="btn" data-leave="${l(t.id)}">Leave club</button>`:`<button class="btn primary" data-join="${l(t.id)}">Join club</button>`}
        ${i?`<button class="btn" data-unfollow="${l(t.id)}">Unfollow</button>`:`<button class="btn" data-follow="${l(t.id)}">Follow · optional</button>`}
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
  `}function rh(e){var c;Ge();const t=wr(),s=((c=e==null?void 0:e.query)==null?void 0:c.club)||"",{user:a}=M(),i=t.map(p=>ih(p,s)).join(""),n=t.filter(p=>p.privacy==="public").length,o=t.length-n,r=`
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
        ${a?"":'<button class="btn" type="button" id="fcSignIn">Sign in demo</button>'}
        <button class="btn ghost" type="button" id="fcAdmin">Toggle demo admin</button>
        <p class="chip" style="margin-top:10px">TEST MODE · no real payments · DBS branding stays prominent</p>
      </form>
    </div>`,d=s?nh(s):`
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
        <div class="fanclubs-grid">${i||'<p class="muted">No clubs yet.</p>'}</div>
        <p id="fcNoResults" class="muted" hidden>No clubs match your search. Try a different name or topic.</p>
      </section>
      ${r}
    `;return _("Fan Clubs",`<div class="fanclubs-studio">${d}</div>`,{lead:"Creator communities inside DBS Lounge · DEMO.",badge:"Phase 2 demo"})}function oh(e){var a,i,n,o,r,d,c;e.querySelectorAll("[data-fc-jump]").forEach(p=>p.addEventListener("click",()=>{var g;const m=p.getAttribute("data-fc-jump");(g=e.querySelector(`#${m}`))==null||g.scrollIntoView({behavior:"smooth",block:"start"})}));const t=e.querySelector("#fcSearch"),s=()=>{const p=String((t==null?void 0:t.value)||"").trim().toLocaleLowerCase(),m=[...e.querySelectorAll(".fanclub-card[data-search]")];let g=0;m.forEach(y=>{const v=(y.dataset.search||"").toLocaleLowerCase().includes(p);y.hidden=!v,v&&(g+=1)});const f=e.querySelector("#fcSearchStatus");f&&(f.textContent=`Showing ${g} of ${m.length} clubs`);const b=e.querySelector("#fcNoResults");b&&(b.hidden=g>0||!p)};t==null||t.addEventListener("input",s),t==null||t.addEventListener("keydown",p=>{p.key!=="Escape"||!t.value||(p.preventDefault(),p.stopPropagation(),t.value="",s())}),e.querySelectorAll("[data-open-club]").forEach(p=>{p.addEventListener("click",()=>we(p.getAttribute("data-open-club")))}),(a=e.querySelector("[data-back-list]"))==null||a.addEventListener("click",()=>we()),(i=e.querySelector("#fcSignIn"))==null||i.addEventListener("click",()=>{We("DemoFan"),we()}),(n=e.querySelector("#fcAdmin"))==null||n.addEventListener("click",()=>{var m,g;We("DemoAdmin");const p=!ae();Ss(p),h(p?"Demo admin on":"Demo admin off"),we(((m=e.querySelector("[data-leave],[data-join]"))==null?void 0:m.getAttribute("data-leave"))||((g=e.querySelector("[data-join]"))==null?void 0:g.getAttribute("data-join"))||void 0)}),(o=e.querySelector("#fcSeedBtn"))==null||o.addEventListener("click",()=>{Ge({force:!0}),h("Demo clubs reseeded"),we()}),(r=e.querySelector("#fcCreateForm"))==null||r.addEventListener("submit",p=>{var v,w,$,C,k;p.preventDefault(),We("DemoCreator");const m=(v=e.querySelector("#fcName"))==null?void 0:v.value,g=(w=e.querySelector("#fcDesc"))==null?void 0:w.value,f=(($=e.querySelector("#fcGraphic"))==null?void 0:$.value)||"/brand/logo-dbs-v3@2x.webp",b=((C=e.querySelector("#fcPrivacy"))==null?void 0:C.value)||"public",y=Cc({name:m,description:g,graphic:f,privacy:b});if(y.error==="signin")return h("Sign in required");if(y.error==="name")return h("Name required");h("Club created · TEST MODE"),we((k=y.club)==null?void 0:k.id)}),e.querySelectorAll("[data-join]").forEach(p=>{p.addEventListener("click",()=>{We();const m=p.getAttribute("data-join");if(Sr(m).error)return h("Could not join");h("Joined club"),we(m)})}),e.querySelectorAll("[data-leave]").forEach(p=>{p.addEventListener("click",()=>{We();const m=p.getAttribute("data-leave"),g=Tc(m);if(g.error==="host")return h("Host cannot leave — transfer later");if(g.error)return h("Could not leave");h("Left club"),we(m)})}),e.querySelectorAll("[data-follow]").forEach(p=>{p.addEventListener("click",()=>{We();const m=p.getAttribute("data-follow");Dc(m),h("Following · optional"),we(m)})}),e.querySelectorAll("[data-unfollow]").forEach(p=>{p.addEventListener("click",()=>{We();const m=p.getAttribute("data-unfollow");Lc(m),h("Unfollowed"),we(m)})}),(d=e.querySelector("#fcUnlockSkeet"))==null||d.addEventListener("click",()=>{We(),la("skeet+",!0),h("Skeet+ unlocked · TEST MODE");const p=new URLSearchParams(location.hash.split("?")[1]||"");we(p.get("club")||void 0)}),(c=e.querySelector("#fcPostForm"))==null||c.addEventListener("submit",p=>{var y;p.preventDefault(),We();const g=new URLSearchParams(location.hash.split("?")[1]||"").get("club"),f=(y=e.querySelector("#fcPostText"))==null?void 0:y.value,b=Pc(g,f);if(b.error==="gated")return h("Room gated");if(b.error==="empty")return h("Write something");if(b.error)return h("Could not post");h("Posted"),we(g)}),e.querySelectorAll("[data-pin]").forEach(p=>{p.addEventListener("click",()=>{const m=p.getAttribute("data-club");if(_c(m,p.getAttribute("data-pin")).error==="mod")return h("Mods only");h("Pin toggled · TEST MODE"),we(m)})}),e.querySelectorAll("[data-remove]").forEach(p=>{p.addEventListener("click",()=>{const m=p.getAttribute("data-club");if(Oc(m,p.getAttribute("data-remove")).error==="mod")return h("Mods only");h("Post removed · TEST MODE"),we(m)})})}function ei(){j("#/loyalty")}function ti(){const{user:e}=M();if(e)return e;const t=Kt("LoyalFan");return h("Signed in as LoyalFan · local demo"),t||M().user}function Rs(e,t,s){var i;ti();const a=ud(e,{points:t,note:s});if(a.error==="signin")return h("Sign in required");if(a.error==="cooldown")return h("Anti-farming · wait a few seconds");if(a.error==="daily_cap")return h("Daily cap hit · come back tomorrow (demo)");if(a.error)return h("Could not record");(a.newBadges||[]).filter(n=>n!=="day_one"||(a.loyalty.badges||[]).includes("day_one")),(i=a.newBadges)!=null&&i.length?h(`+${t} pts · badge: ${a.newBadges.join(", ")}`):h(`+${t} pts · ${s}`),ei()}function lh(){const{user:e}=M(),t=Ts(),a=Vr().map(o=>{const r=o.unlocked;return`<div class="card" style="opacity:${r?1:.55};margin:0">
        <div class="row" style="justify-content:space-between;gap:8px">
          <strong>${l(o.name)}</strong>
          <span class="chip">${r?"Unlocked":"Locked"}</span>
        </div>
        <p class="muted" style="margin:6px 0 0;font-size:12px">${l(o.blurb)}</p>
      </div>`}).join(""),i=(t.history||[]).length===0?'<p class="muted" style="margin:0">No actions yet — try a listen tick or join a club.</p>':`<ul class="list-plain">${(t.history||[]).slice(0,12).map(o=>`<li style="padding:8px 0;border-top:1px solid rgba(255,255,255,.06)">
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
      <div class="pikk-loyalty-badge-grid">${a}</div>
    </div>

    <div class="card pikk-loyalty-panel pikk-loyalty-activity">
      <h3 style="margin:0 0 8px">Recent activity</h3>
      ${i}
    </div>

    <div class="card pikk-loyalty-panel pikk-loyalty-roadmap">
      <h3 style="margin:0 0 6px">Admin-ish rollup · optional</h3>
      <p class="muted" style="margin:0;font-size:12px">Future Admin Fan Loyalty dashboard (plan § Live Gift Effects) can list tenure, attendance, and opted-in history. This page stays fan-facing; no purchase-only ranking.</p>
    </div>
    </div>
    `,{lead:"Recognition for healthy participation · DEMO.",badge:"Phase 2 demo"})}function ch(e){var t,s,a,i,n,o;(t=e.querySelector("#loyListen"))==null||t.addEventListener("click",()=>Rs("listen",5,"Authorized listening tick")),(s=e.querySelector("#loyLive"))==null||s.addEventListener("click",()=>Rs("live",8,"Attended live (stub)")),(a=e.querySelector("#loyHelp"))==null||a.addEventListener("click",()=>Rs("help",6,"Shared community helper tip")),(i=e.querySelector("#loyClub"))==null||i.addEventListener("click",()=>{ti(),Ge();const r=wr(),d=r.find(c=>c.privacy==="public")||r[0];d&&Sr(d.id),Rs("club",10,d?`Joined ${d.name}`:"Joined Fan Club")}),(n=e.querySelector("#loyPublic"))==null||n.addEventListener("change",r=>{ti(),pd(r.target.checked),h(r.target.checked?"Public visibility on":"Achievements private"),ei()}),(o=e.querySelector("#loyReset"))==null||o.addEventListener("click",()=>{md(),h("Loyalty demo reset"),ei()})}function vt(){j("#/openmic")}function Ra(e="MicHopeful"){const{user:t}=M();if(t)return t;const s=Kt(e);return h(`Signed in as ${e} · local demo`),s||M().user}function Pn(e){return`<span class="chip">${l(e==="approved"?"Approved":e==="rejected"?"Rejected":"Pending")}</span>`}function dh(){const e=fd(),t=e.chipLabel||"House rotation",s=e.embed?Je(e.embed,"rel=0"):"";return`
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
    </div>`}function ph(){zt();const{user:e}=M(),t=ae(),s=gd(),a=e?Wa().filter(c=>c.userId===e.id):[],i=t?Wa({status:"pending"}):[],n=a.filter(c=>c.status==="pending").length,o=s.length===0?'<p class="muted" style="margin:0">No approved performers yet.</p>':s.map(c=>`<article class="card" style="margin:0 0 10px">
              <div class="row" style="justify-content:space-between;gap:8px">
                <div>
                  <strong>${l(c.trackTitle)}</strong>
                  <div class="muted" style="font-size:12px">@${l(c.username)} · ${l(c.talent)}</div>
                </div>
                ${Pn("approved")}
              </div>
              <p style="margin:8px 0 0">${l(c.profileNote||"Featured in PIKK Open Mic showcase.")}</p>
              <p class="muted" style="font-size:11px;margin:8px 0 0">Not a paid ranking · discovery showcase</p>
            </article>`).join(""),r=a.length===0?'<p class="muted" style="margin:0">You have no applications yet.</p>':`<ul class="list-plain">${a.map(c=>`<li style="padding:10px 0;border-top:1px solid rgba(255,255,255,.06)">
              <div class="row" style="justify-content:space-between">
                <strong>${l(c.trackTitle)}</strong>
                ${Pn(c.status)}
              </div>
              <div class="muted" style="font-size:12px">${l(c.talent)} · ${l(F(c.at))}</div>
            </li>`).join("")}</ul>`,d=t?`<div class="card">
         <h3 style="margin:0 0 8px">Admin review · TEST MODE</h3>
         <p class="muted" style="margin:0 0 10px;font-size:12px">Approve for showcase or reject. Distinct from pay-to-win.</p>
         ${i.length===0?'<p class="muted" style="margin:0">No pending applications.</p>':i.map(c=>`<div style="padding:10px 0;border-top:1px solid rgba(255,255,255,.06)">
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
        <div><span>Your applications</span><strong>${a.length}</strong><small>On this device</small></div>
        <div><span>Awaiting review</span><strong>${n}</strong><small>Your pending submissions</small></div>
      </section>
    ${dh()}

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
    `,{lead:"24/7 house catalog when idle · opt-in talent showcase · DEMO.",badge:"Phase 2 demo"})}function uh(e){var t,s,a,i,n;e.querySelectorAll("[data-om-jump]").forEach(o=>{o.addEventListener("click",()=>{const r=o.getAttribute("data-om-jump"),d=r==="omApplyCard"||r==="omShowcaseCard"?e.querySelector("#"+r):null;d==null||d.scrollIntoView({behavior:"smooth",block:"start"})})}),(t=e.querySelector("#omSignIn"))==null||t.addEventListener("click",()=>{Ra(),vt()}),(s=e.querySelector("#omAdmin"))==null||s.addEventListener("click",()=>{Ra("DemoAdmin");const o=!ae();Ss(o),h(o?"Demo admin on":"Demo admin off"),vt()}),(a=e.querySelector("#omSeed"))==null||a.addEventListener("click",()=>{zt({force:!0}),h("Open Mic demos reseeded"),vt()}),(i=e.querySelector("#omForm"))==null||i.addEventListener("submit",o=>{var c,p,m,g;o.preventDefault(),Ra();const r=(c=e.querySelector("#omRights"))==null?void 0:c.checked,d=bd({talent:(p=e.querySelector("#omTalent"))==null?void 0:p.value,trackTitle:(m=e.querySelector("#omTitle"))==null?void 0:m.value,profileNote:(g=e.querySelector("#omNote"))==null?void 0:g.value,rightsCertified:!!r});if(d.error==="rights")return h("Rights certification required");if(d.error==="title")return h("Title required");if(d.error==="pending")return h("You already have a pending application");if(d.error)return h("Could not submit");h("Application submitted · pending review"),vt()}),e.querySelectorAll("[data-om-approve]").forEach(o=>{o.addEventListener("click",()=>{if(Ya(o.getAttribute("data-om-approve"),"approved").error==="admin")return h("Admin only");h("Approved · showcase"),vt()})}),e.querySelectorAll("[data-om-reject]").forEach(o=>{o.addEventListener("click",()=>{if(Ya(o.getAttribute("data-om-reject"),"rejected","Demo reject").error==="admin")return h("Admin only");h("Rejected"),vt()})}),(n=e.querySelector("#omNextHouse"))==null||n.addEventListener("click",()=>{const o=vd();h("Next house · "+(o.chipLabel||"House")),vt()})}let Ie=null,Pt="all";try{const e=sessionStorage.getItem("dbs_shop_cat");e&&(Pt=e,sessionStorage.removeItem("dbs_shop_cat"));const t=sessionStorage.getItem("dbs_shop_preview");t&&(Ie=t,sessionStorage.removeItem("dbs_shop_preview"))}catch{}function et(){j("#/profile-shop")}function st(e){return Ks.find(t=>t.id===e)||null}function xo(e){return Ur(e)}function mh(e){const t={...e.equipped},s=Ie?st(Ie):null;if(s){const a=xo(s);a&&(t[a]=s.id)}return t}function hh(e){return`rarity-${l(e||"rare")}`}function gh(e){return`$${Number(e).toFixed(2)}`}function fh(e){const{user:t}=M(),s=mh(e),a=s.frame?st(s.frame):null,i=s.effect?st(s.effect):null,n=s.banner?st(s.banner):null,o=s.nameStyle?st(s.nameStyle):null,r=s.badge?st(s.badge):null,d=(t==null?void 0:t.username)||"DemoFan",c=e.reduceMotion,p=i?`shop-fx shop-fx--${l(i.id.replace(/^fx-/,""))}${c?" shop-fx--still":""}`:"",m=o?`shop-name shop-name--${l(o.id.replace(/^name-/,""))}`:"shop-name",g=a?`shop-avatar-frame shop-frame--${l(a.id.replace(/^frame-/,""))}`:"shop-avatar-frame";return`
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
          ${a?`<span class="shop-frame-emoji" aria-hidden="true">${l(a.emoji)}</span>`:""}
        </div>
        <div class="shop-preview-meta">
          <div class="${m}">${l(d)}</div>
          <p class="muted small" style="margin:4px 0 0">Cosmetic preview only · not a status grant</p>
          ${r?`<span class="shop-cosmetic-badge" title="Cosmetic style — not Verified/Founder">${l(r.emoji)} ${l(r.name)}</span>`:'<span class="muted small">No cosmetic badge equipped</span>'}
        </div>
      </div>
      <div class="shop-equipped-row">
        ${["frame","effect","banner","nameStyle","badge"].map(b=>{const y=s[b],v=y?st(y):null,w=b==="nameStyle"?"Name":b.charAt(0).toUpperCase()+b.slice(1);return`<span class="shop-eq-chip ${v?"on":""}">${l(w)}: ${v?l(v.emoji+" "+v.name):"—"}</span>`}).join("")}
      </div>
    </div>`}function vh(e,t){const s=t.owned.includes(e.id),a=xo(e),i=a&&t.equipped[a]===e.id,n=Ie===e.id;return`
    <article class="cosmetic-card ${hh(e.rarity)} ${n?"is-selected":""} ${s?"is-owned":""} ${i?"is-equipped":""}" data-id="${l(e.id)}">
      <div class="cosmetic-art" role="button" tabindex="0" data-preview="${l(e.id)}" aria-label="Preview ${l(e.name)}">
        <span class="cosmetic-emoji">${l(e.emoji)}</span>
        <span class="concept-flag">CONCEPT</span>
        ${s?'<span class="owned-flag">Owned</span>':""}
        ${i?'<span class="equipped-flag">Equipped</span>':""}
      </div>
      <div class="body">
        <div class="name">${l(e.name)}</div>
        <div class="meta">${l(e.category)} · ${l(e.rarity)}</div>
        <div class="price">${gh(e.price)} <span class="chip" style="margin-left:4px">TEST MODE</span></div>
        <div class="cosmetic-actions row wrap" style="gap:6px;margin-top:8px">
          <button type="button" class="btn ghost shop-act" data-act="preview" data-id="${l(e.id)}">Preview</button>
          ${s?i?`<button type="button" class="btn shop-act" data-act="unequip" data-slot="${l(a)}" data-id="${l(e.id)}">Unequip</button>`:`<button type="button" class="btn primary shop-act" data-act="equip" data-id="${l(e.id)}">Equip</button>`:`<button type="button" class="btn primary shop-act" data-act="unlock" data-id="${l(e.id)}">Unlock · TEST MODE</button>`}
        </div>
      </div>
    </article>`}function bh(){const e=at(),t=Pt==="all"?Ks:Ks.filter(n=>n.category===Pt),s=No.map(n=>`<button type="button" class="shop-chip ${Pt===n.id?"on":""}" data-cat="${l(n.id)}" aria-pressed="${Pt===n.id?"true":"false"}">${l(n.label)}</button>`).join(""),a=t.length===0?'<p class="muted">No cosmetics in this category.</p>':`<div class="cosmetic-grid">${t.map(n=>vh(n,e)).join("")}</div>`,i=`
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

    ${fh(e)}

    <div class="card">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center;margin-bottom:10px">
        <h3 style="margin:0">Catalog · ${Ks.length} items</h3>
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
      ${a}
    </div>
  `;return _("Profile Shop",i,{lead:"PIKK digital cosmetics · live preview · CONCEPT / TEST MODE.",badge:"Phase 2 · CONCEPT"})}function yh(e){var s,a,i;e.querySelectorAll(".shop-chip").forEach(n=>{n.addEventListener("click",()=>{Pt=n.dataset.cat||"all",et()})}),(s=e.querySelector("#shopReduceMotion"))==null||s.addEventListener("change",n=>{Cd(n.target.checked),h(n.target.checked?"Motion reduced":"Motion on"),et()}),(a=e.querySelector("#shopBundle"))==null||a.addEventListener("click",()=>{var o;const n=$d();h(`Starter bundle unlocked · ${((o=n.unlocked)==null?void 0:o.length)||0} items · no charge`),et()}),(i=e.querySelector("#shopReset"))==null||i.addEventListener("click",()=>{Td(),Ie=null,h("Demo inventory reset"),et()});const t=n=>{Ie=n,h("Preview updated"),et()};e.querySelectorAll("[data-preview]").forEach(n=>{n.addEventListener("click",()=>t(n.dataset.preview)),n.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),t(n.dataset.preview))})}),e.querySelectorAll(".shop-act").forEach(n=>{n.addEventListener("click",()=>{const o=n.dataset.act,r=n.dataset.id;if(o==="preview")return t(r);if(o==="unlock"){const d=Sd(r);return d.error?h("Could not unlock"):(Ie=r,h(d.already?"Already owned · TEST MODE":"Unlocked · TEST MODE · no charge"),et())}if(o==="equip"){const d=Ed(r);return d.error==="not_owned"?h("Unlock first · TEST MODE"):d.error?h("Could not equip"):(Ie=r,h("Equipped"),et())}if(o==="unequip"){const d=n.dataset.slot;if(Ad(d).error)return h("Could not unequip");const p=Ie?st(Ie):null;return p&&Ur(p)===d&&(Ie=null),h("Unequipped"),et()}})})}const kh=["All","Hats","Shirts","Jackets"],wh=["Ladies Shop","Men's Shop","Beauty & Hair","Fashion & Accessories","Lifestyle & Home","Creator Brands","Live Shopping","Deals"];function Sh(e,t="All",s=""){const a=String(s||"").trim().toLocaleLowerCase();return e.filter(i=>(t==="All"||i.category===t)&&(!a||`${i.name} ${i.category}`.toLocaleLowerCase().includes(a)))}function $h(e,t="featured"){const s=[...e];return t==="price-asc"?s.sort((a,i)=>Number(a.price)-Number(i.price)):t==="price-desc"?s.sort((a,i)=>Number(i.price)-Number(a.price)):t==="name-asc"?s.sort((a,i)=>String(a.name).localeCompare(String(i.name))):s}function xh(e){return`
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
    </article>`}function Eh(){const e=kh.map(i=>`<button type="button" class="btn ${i==="All"?"primary":"ghost"} pikk-shop-filter"
      data-category="${l(i)}" aria-pressed="${i==="All"?"true":"false"}">${l(i)}</button>`).join(""),t=wh.map(i=>`<li><span>${l(i)}</span><span class="chip">Coming Soon</span></li>`).join(""),a=[Le.find(i=>i.id==="jacket-black")||Le.find(i=>i.category==="Jackets"),Le.find(i=>i.id==="hat-716-orange")||Le.find(i=>i.category==="Hats"),Le.find(i=>i.id==="tee-ptsd")||Le.find(i=>i.category==="Shirts")].filter(Boolean).map(i=>'<a class="pikk-shop-featured-product" href="'+l(i.shopUrl)+'" target="_blank" rel="noopener noreferrer" aria-label="View '+l(i.name)+' on Foreign X-Change"><img src="'+l(i.image)+'" alt="'+l(i.name)+'" loading="eager" decoding="async" /><span>'+l(i.category)+"</span></a>").join("");return _("PIKK Shop",`
    <section class="pikk-shop-showcase pikk-shop-real-hero" aria-label="Featured Foreign X-Change merchandise">
      <div class="pikk-shop-showcase-copy">
        <p class="kicker">PIKK SHOP · FOREIGN X-CHANGE</p>
        <h2>Wear your story.<br/><span>Shop the culture.</span></h2>
        <p>Explore real Foreign X-Change jackets, hats and shirts. Your style, your PIKK.</p>
        <button type="button" class="btn primary" data-shop-scroll>Shop the collection</button>
        <small>External merchant checkout · No PIKK in-app payments</small>
      </div>
      <div class="pikk-shop-hero-gallery" aria-label="Featured product photography">${a}</div>
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
      <p class="muted small" id="pikkShopCount" aria-live="polite">${Le.length} items</p>
      <div class="merch-grid pikk-shop-premium-grid pikk-shop-real-grid" id="pikkShopProducts">${Le.map(xh).join("")}</div>
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
  `,{lead:"Physical merchandise · external checkout · future verified storefronts"})}function Ah(e){var g;const t=e.querySelector("#pikkShopSearch"),s=[...e.querySelectorAll(".pikk-shop-product")],a=[...e.querySelectorAll(".pikk-shop-filter, .pikk-shop-category")],i=e.querySelector("#pikkShopCount"),n=e.querySelector("#pikkShopEmpty"),o=e.querySelector("#pikkShopReset"),r=e.querySelector("#pikkShopSort"),d=e.querySelector("#pikkShopProducts"),c=new Map(s.map(f=>[f.dataset.productId,f]));let p="All";function m(){const f=new Set(Sh(Le,p,(t==null?void 0:t.value)||"").map(b=>b.id));for(const b of $h(Le,(r==null?void 0:r.value)||"featured")){const y=c.get(b.id);y&&(d==null||d.appendChild(y))}for(const b of s){const y=f.has(b.dataset.productId);b.hidden=!y,b.style.display=y?"":"none"}if(i&&(i.textContent=`${f.size} ${f.size===1?"item":"items"}`),n&&(n.hidden=f.size>0),o){const b=p!=="All"||!!(t!=null&&t.value.trim())||((r==null?void 0:r.value)||"featured")!=="featured";o.hidden=!b,o.style.display=b?"":"none"}for(const b of a){const y=b.dataset.category===p;b.setAttribute("aria-pressed",String(y)),b.classList.contains("pikk-shop-filter")&&(b.classList.toggle("primary",y),b.classList.toggle("ghost",!y)),b.classList.toggle("on",y)}}t==null||t.addEventListener("input",m),t==null||t.addEventListener("keydown",f=>{f.key!=="Escape"||!t.value||(f.preventDefault(),f.stopPropagation(),t.value="",m())}),r==null||r.addEventListener("change",m),o==null||o.addEventListener("click",()=>{p="All",t&&(t.value=""),r&&(r.value="featured"),m(),t==null||t.focus()}),(g=e.querySelector("[data-shop-scroll]"))==null||g.addEventListener("click",()=>{var f,b,y;t==null||t.focus({preventScroll:!0}),(y=e.querySelector("#pikkShopCatalog"))==null||y.scrollIntoView({behavior:(b=(f=window.matchMedia)==null?void 0:f.call(window,"(prefers-reduced-motion: reduce)"))!=null&&b.matches?"instant":"smooth",block:"start"})});for(const f of a)f.addEventListener("click",()=>{var b;p=f.dataset.category||"All",m(),f.classList.contains("pikk-shop-category")&&((b=e.querySelector("#pikkShopCatalog"))==null||b.scrollIntoView({behavior:"auto",block:"start"}))})}let zs=null;function pe(){j("#/spotlight")}function ja(){zs&&(clearInterval(zs),zs=null)}function Eo(e){const t=Math.max(0,Math.ceil(e/1e3)),s=Math.floor(t/60),a=t%60;return`${s}:${String(a).padStart(2,"0")}`}function Bi(e){return e==="freestyle"?"Live Freestyle":e==="beat"?"Beat":e==="music_video"?"Music Video":"Song"}function Ch(e){const t=M().user;return!t||!e?!1:(t.following||[]).includes(e)}function Ri(){return!!M().user}function Th(){return _("24/7 Spotlight",`<div class="card">
      <h3>Sign in required</h3>
      <p class="muted">Join the FIFO Spotlight queue, vote Keep Going / Play Another, and chat from a local demo account.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,{lead:"Continuous music showcase · votes ≠ paid advantage · TEST MODE"})}function Dh(e){return`
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
    </div>`}function Lh(e,{showSkip:t=!0}={}){const s=e.chipLabel||e.status||"House rotation",a=e.embed?Je(e.embed,"rel=0"):"";return`
    <div class="card sp-stage sp-house" role="status">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center">
        <div class="chip">${l(s)}</div>
        <span class="chip">TEST MODE</span>
      </div>
      ${a?`<div class="sp-house-embed hero-video" style="margin-top:12px">
               <iframe src="${l(a)}" title="${l(e.title)}" allowfullscreen loading="lazy"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
             </div>`:""}
      <div class="sp-now">
        ${e.cover?`<img class="sp-cover" src="${l(It(e.cover))}" alt="" />`:""}
        <div>
          <div class="sp-now-title">${l(e.title)}</div>
          <div class="sp-now-meta">${l(e.artist||"DatBoiSkeet")} · house catalog</div>
          <p class="muted sp-note">${l(e.note||"Approved catalog filler · not a live act")}</p>
          ${e.youtube?`<p style="margin:8px 0 0"><a class="btn ghost" href="${l(e.youtube)}" target="_blank" rel="noopener">Open on YouTube</a></p>`:""}
        </div>
      </div>
      ${t&&Ri()?`<div class="row wrap" style="gap:8px;margin-top:12px">
               <button class="btn" id="spSkipHouse">Skip house · next</button>
               <span class="muted" style="font-size:12px;align-self:center">Join queue takes the stage over house · Skip advances catalog</span>
             </div>`:""}
    </div>`}function Mh(e,t){if(!e||e.house){const b=e&&e.house?{id:e.id,title:e.title,artist:e.artist,embed:e.embed,youtube:e.youtube,chipLabel:e.chipLabel||"House · Music Video",note:e.note,cover:e.cover,kind:e.houseKind}:br();return Lh(b)}const s=M().user,a=e.type==="freestyle",i=a&&e.endsAt?Math.max(0,e.endsAt-Date.now()):null,n=Object.keys(e.keepGoingVotes||{}).length,o=Object.keys(e.playAnotherVotes||{}).length,r=e.userId,d=Ch(r),c=s&&s.id===e.userId,p=e.reactions||{fire:0,heart:0,clap:0},m=a?`<div class="sp-timer" aria-live="polite">
         <div class="sp-timer-label">Freestyle timer · ext ${e.extensions||0}/${t.maxExtensions}</div>
         <div class="sp-timer-clock" id="spClock">${Eo(i||0)}</div>
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
       </div>`:a?`<div class="card sp-vote">
           <h3>Keep Going</h3>
           <p class="muted">Votes extend stage time only — not paid advantage · ${n}/${t.keepGoing}</p>
           <div class="row wrap" style="gap:8px">
             <button class="btn primary" id="spKeepGoing" ${(e.extensions||0)>=t.maxExtensions?"disabled":""}>Keep Going</button>
             <button class="btn ghost" id="spSimKeepGoing" ${(e.extensions||0)>=t.maxExtensions?"disabled":""}>+2 fan votes (demo)</button>
           </div>
         </div>`:"",f=c?"":d?`<button class="btn ghost sp-follow" data-follow="${l(r)}" data-on="1">Following</button>`:`<button class="btn ghost sp-follow" data-follow="${l(r)}" data-on="0">Follow</button>`;return`
    <div class="card sp-stage">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center">
        <div class="chip">On stage · ${l(Bi(e.type))}</div>
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
    ${g}`}function Ih(e,t,s){const a=r=>Math.max(1,(r+(t?1:0))*2),i=(e||[]).map((r,d)=>`
      <li class="sp-q-row">
        <div>
          <strong>${l(r.username)}</strong>
          <span class="muted"> · ${l(Bi(r.type))} · ${l(r.title)}</span>
          <div class="muted" style="font-size:12px">${d===0?"Next up":`#${d+1}`} · ~${a(d)} min wait (stub)</div>
        </div>
        <div class="row wrap" style="gap:6px">
          ${s&&r.userId===s.id?'<button class="btn ghost sp-leave-q">Leave</button>':""}
          ${Ri()?`<button class="btn ghost sp-remove-q" data-qid="${l(r.id)}" title="Demo moderator">Remove</button>`:""}
        </div>
      </li>`).join(""),n=s&&(e||[]).some(r=>r.userId===s.id),o=s&&t&&!t.house&&t.userId===s.id;return`
    <div class="card sp-queue">
      <h3>FIFO queue</h3>
      <p class="muted" style="margin-top:0">${e.length?e.length+" waiting":"Queue empty — house catalog on stage"}${t&&!t.house?" · now: "+l(t.username):t&&t.house?" · house: "+l(t.chipLabel||"House"):""}</p>
      <ul class="sp-list">${i||'<li class="muted">No one waiting</li>'}</ul>
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
    </div>`}function Ph(e){if(!Ri())return"";const t=ae()?"Admin":"Demo moderator · TEST MODE",s=e&&!e.house;return`
    <div class="card sp-mod">
      <h3>Moderator controls</h3>
      <p class="muted" style="margin-top:0"><span class="chip">${l(t)}</span> Skip / remove for safety · fair order otherwise. House Skip → next queue or next house.</p>
      <div class="row wrap" style="gap:8px">
        <button class="btn" id="spSkip" ${e?"":"disabled"}>Skip current</button>
        ${s&&e.type!=="freestyle"&&!e.awaitingPlayAnother?'<button class="btn ghost" id="spEndSet">End set</button>':""}
      </div>
    </div>`}function _h(e){const t=M().user;return!e||e.house||e.type==="freestyle"||e.awaitingPlayAnother||!t||t.id!==e.userId?"":`
    <div class="card">
      <h3>Your set</h3>
      <p class="muted">No real audio file — tap End set when your demo track “finishes”.</p>
      <button class="btn primary" id="spEndSetSelf">End set</button>
    </div>`}function Oh(e){return!e||e.house?"":`
    <div class="card sp-chat-card">
      <h3>Stage chat</h3>
      <div class="sp-chat" id="spChat">${(e.chat||[]).slice(-20).map(s=>`<div class="sp-chat-row ${s.system?"system":""}"><strong>${l(s.username)}</strong>${l(s.text)}</div>`).join("")||'<div class="muted">No messages yet</div>'}</div>
      <form id="spChatForm" class="row" style="gap:8px;margin-top:8px">
        <input id="spChatInput" maxlength="200" placeholder="Say something…" style="flex:1" />
        <button class="btn primary" type="submit">Send</button>
      </form>
    </div>`}function qh(e){return e.length?`
    <div class="card">
      <h3>Recent stage</h3>
      <ul class="sp-list">${e.slice(0,12).map(s=>`<li><strong>${l(s.username)}</strong> · ${l(Bi(s.type))} · ${l(s.title)}
         <span class="muted"> · ${l(s.reason||"ended")} · ${F(s.endedAt)}</span></li>`).join("")}</ul>
    </div>`:`
      <div class="card">
        <h3>Recent stage</h3>
        <p class="muted" style="margin:0">No completed turns yet.</p>
      </div>`}function Nh(){de();const e=M().user;if(!e)return Th();const t=le(),s=Ac(12);return _("24/7 Spotlight",`${Dh(t.thresholds)}
     ${Mh(t.nowPlaying,t.thresholds)}
     ${_h(t.nowPlaying)}
     ${Ph(t.nowPlaying)}
     ${Ih(t.queue,t.nowPlaying,e)}
     ${Oh(t.nowPlaying)}
     ${qh(s)}`,{lead:"Always-on music showcase · FIFO queue · votes ≠ wagers · TEST MODE"})}function Bh(e){var n,o,r,d,c,p,m,g,f,b,y;ja(),de();const s=le().nowPlaying;if(s&&s.type==="freestyle"&&s.endsAt){const v=e.querySelector("#spClock");zs=setInterval(()=>{de();const w=le().nowPlaying;if(!w||w.type!=="freestyle"||!w.endsAt){ja(),pe();return}const $=Math.max(0,w.endsAt-Date.now());v&&(v.textContent=Eo($)),$<=0&&(ja(),de(),pe())},250)}if(s&&s.awaitingPlayAnother&&s.playAnotherDeadline){const v=Math.max(0,s.playAnotherDeadline-Date.now())+50;setTimeout(()=>{de(),pe()},Math.min(v,35e3))}(n=e.querySelector("#spJoinForm"))==null||n.addEventListener("submit",v=>{var P,T,R;v.preventDefault();const w=((P=e.querySelector("#spType"))==null?void 0:P.value)||"song",$=((T=e.querySelector("#spTitle"))==null?void 0:T.value)||"",C=((R=e.querySelector("#spArtist"))==null?void 0:R.value)||"",k=fc({type:w,title:$,artist:C});if(k.error==="signin")return h("Sign in first");if(k.error==="already_queued")return h("You already have a queue/stage spot");h(w==="freestyle"?"Freestyle — you're up or in queue":"Joined Spotlight queue"),pe()}),(o=e.querySelector("#spLeaveQueue"))==null||o.addEventListener("click",()=>{if(Xi().error)return h("Not in queue");h("Left queue"),pe()}),e.querySelectorAll(".sp-leave-q").forEach(v=>{v.addEventListener("click",()=>{Xi(),h("Left queue"),pe()})}),e.querySelectorAll(".sp-remove-q").forEach(v=>{v.addEventListener("click",()=>{vc(v.getAttribute("data-qid")),h("Removed from queue (demo mod)"),pe()})});const a=()=>{le().nowPlaying,bc();const v=le().nowPlaying;v&&v.house?h("Next house · "+(v.chipLabel||"House")):h(v?"Skipped · "+(v.username||"next")+" on stage":"Skipped"),pe()};(r=e.querySelector("#spSkip"))==null||r.addEventListener("click",a),(d=e.querySelector("#spSkipHouse"))==null||d.addEventListener("click",a);const i=()=>{const v=yc();if(v.error==="max_streak"||v.ok){h(v.error==="max_streak"?"Max 3 in a row — advancing":"Play Another? vote open"),pe();return}v.error?h("Cannot end set: "+v.error):pe()};(c=e.querySelector("#spEndSet"))==null||c.addEventListener("click",i),(p=e.querySelector("#spEndSetSelf"))==null||p.addEventListener("click",i),(m=e.querySelector("#spKeepGoing"))==null||m.addEventListener("click",()=>{const v=kc();if(v.error==="already_voted")return h("Already voted");if(v.error==="max_extensions")return h("Max extensions reached");if(v.error)return h(v.error);h("Keep Going counted"),pe()}),(g=e.querySelector("#spSimKeepGoing"))==null||g.addEventListener("click",()=>{wc(2),h("+2 simulated fan votes"),pe()}),(f=e.querySelector("#spPlayAnother"))==null||f.addEventListener("click",()=>{const v=Sc();if(v.error==="already_voted")return h("Already voted");if(v.error)return h(v.error);h("Play Another vote counted"),pe()}),(b=e.querySelector("#spSimPlayAnother"))==null||b.addEventListener("click",()=>{$c(2),h("+2 simulated fan votes"),pe()}),e.querySelectorAll(".sp-follow").forEach(v=>{v.addEventListener("click",()=>{const w=v.getAttribute("data-follow");v.getAttribute("data-on")==="1"?(da(w),h("Unfollowed")):(ca(w),h("Following")),pe()})}),e.querySelectorAll(".sp-react").forEach(v=>{v.addEventListener("click",()=>{xc(v.getAttribute("data-kind")||"fire"),pe()})}),(y=e.querySelector("#spChatForm"))==null||y.addEventListener("submit",v=>{v.preventDefault();const w=e.querySelector("#spChatInput"),$=Ec((w==null?void 0:w.value)||"");if($.error!=="empty"){if($.error)return h($.error);w&&(w.value=""),pe()}})}const Ao="Not available — WebRTC + age assurance required before launch";function ss(){j("#/connect")}function Rh(){var p;const e=Nr(),s=lt().selected||[],a=od(),i=jr(),n=Number(i==null?void 0:i.max)||0,o=!!a,r=e.map(m=>{const g=s.includes(m.id),f=m.connected?`<span class="chip">Linked${m.handle?" · "+l(m.handle):""}</span>`:'<span class="chip muted-chip">Not linked</span>';return`
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
       <span class="chip">LIVE · ${l(String(((p=a==null?void 0:a.destinations)==null?void 0:p.length)||d))} dest · TEST MODE</span>`:`<button type="button" class="btn primary" id="connectMpGoLive" ${d?"":"disabled"}>Go live to selected</button>
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
    </div>`}function si(){const e=Fr(),t=e.ageConfirmed&&e.rulesAccepted;return _("PIKK Connect",`<div class="connect-monkey" id="connectMonkey">
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
          <strong>${Ao}</strong>
          <p class="muted small">TEST MODE — this is a preview, not a real matching request. No match was created, no camera was requested, and no WebRTC connection was attempted.</p>
        </div>
        <p class="muted small" style="margin-top:10px">Controls are mockups until launch. Prefs save on this device.</p>
      </div>

      ${Rh()}

      <div class="card">
        <p class="muted" style="margin:0 0 8px">PIKK Connect <strong>does not replace</strong> Live, Messages, or Spotlight. Meanwhile:</p>
        <a class="btn" href="#/live">Live</a> <a class="btn" href="#/messages">Messages</a> <a class="btn" href="#/spotlight">Spotlight</a> <a class="btn ghost" href="#/shorts">Shorts / Clips</a>
      </div>
    </div>`,{lead:"1:1 discovery shell · multi-platform go-live · TEST MODE",badge:"Shell · no WebRTC"})}function jh(e){var t,s;e.querySelectorAll(".connect-mp-connect").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.id,n=ed(i,"");if(n!=null&&n.error)return h(String(n.error));h(`Linked ${i} · TEST MODE`),ss()})}),e.querySelectorAll(".connect-mp-disconnect").forEach(a=>{a.addEventListener("click",()=>{td(a.dataset.id),h("Unlinked · TEST MODE"),ss()})}),e.querySelectorAll(".connect-mp-dest").forEach(a=>{a.addEventListener("change",()=>{ad(a.dataset.id),ss()})}),(t=e.querySelector("#connectMpGoLive"))==null||t.addEventListener("click",()=>{const a=nd();if((a==null?void 0:a.error)==="signin")return h("Sign in first");if((a==null?void 0:a.error)==="none_selected")return h("Select at least one destination");if(a!=null&&a.error)return h(String(a.error));h("Multi-platform session started · TEST MODE"),ss()}),(s=e.querySelector("#connectMpEnd"))==null||s.addEventListener("click",()=>{rd(),h("Session ended"),ss()})}function ai(e=document,t){var i,n,o;const s=()=>{if(typeof t=="function")return t();e.innerHTML=si(),ai(e)};(i=e.querySelector("#connect-age"))==null||i.addEventListener("change",r=>{const d=r.target.checked;sn(d?{ageConfirmed:!0}:{ageConfirmed:!1,rulesAccepted:!1}),s()}),(n=e.querySelector("#connect-rules"))==null||n.addEventListener("change",r=>{sn({rulesAccepted:r.target.checked}),s()}),(o=e.querySelector("#connect-start"))==null||o.addEventListener("click",()=>{const r=e.querySelector("#connect-blocked");r==null||r.removeAttribute("hidden"),h(Ao)}),jh(e);const a=Ve().elementId;(a==="connect-random-chat"||a==="connect-multistream")&&requestAnimationFrame(()=>{var r,d,c,p;(p=e.querySelector(`#${a}`))==null||p.scrollIntoView({behavior:(c=(d=(r=globalThis.window)==null?void 0:r.matchMedia)==null?void 0:d.call(r,"(prefers-reduced-motion: reduce)"))!=null&&c.matches?"instant":"smooth",block:"start"})})}const Co="pikk_forum_local_v1",ms=[["music","Music & Artists","♫"],["business","Business & Money","$"],["relationships","Relationships","♡"],["gaming","Gaming","♜"],["sports","Sports","★"],["entertainment","Entertainment","▶"],["lifestyle","Lifestyle","✦"],["general","General Discussion","#"]],ii=new Set(ms.map(e=>e[0])),as=e=>String(e||"").trim();function is(){try{const e=JSON.parse(localStorage.getItem(Co)||"{}");return{posts:Array.isArray(e.posts)?e.posts.filter(t=>t&&ii.has(t.topic)).slice(-150):[],votes:e.votes&&typeof e.votes=="object"?e.votes:{},hidden:Array.isArray(e.hidden)?e.hidden:[]}}catch{return{posts:[],votes:{},hidden:[]}}}function js(e){try{return localStorage.setItem(Co,JSON.stringify(e)),!0}catch{return h("Local storage unavailable"),!1}}function Fh(e,t,s,a){let i=e.posts.filter(o=>!e.hidden.includes(o.id)&&(s==="all"||o.topic===s));const n=o=>Object.entries(e.votes).reduce((r,d)=>r+(d[0].startsWith(o.id+":")&&Number(d[1])||0),0);return i.sort((o,r)=>{var d,c;return a==="top"?n(r)-n(o):a==="discussed"?(((d=r.replies)==null?void 0:d.length)||0)-(((c=o.replies)==null?void 0:c.length)||0):r.when-o.when}),i.length?i.map(o=>{var p;const r=((p=ms.find(m=>m[0]===o.topic))==null?void 0:p[1])||"Community",d=Array.isArray(o.replies)?o.replies:[],c=Number(e.votes[o.id+":"+((t==null?void 0:t.id)||"guest")])||0;return'<article class="pikk-forum-post"><div class="pikk-forum-votes"><button data-fvote="1" data-id="'+l(o.id)+'" aria-label="Upvote" aria-pressed="'+(c===1)+'" '+(t?"":"disabled")+">▲</button><b>"+n(o)+'</b><button data-fvote="-1" data-id="'+l(o.id)+'" aria-label="Downvote" aria-pressed="'+(c===-1)+'" '+(t?"":"disabled")+'>▼</button></div><div class="pikk-forum-post-content"><p class="pikk-forum-meta">'+l(r)+" · u/"+l(o.author)+" · local preview</p><h3>"+l(o.title)+'</h3><p class="pikk-forum-text">'+l(o.body)+'</p><button class="pikk-forum-reply-button" data-fopen="'+l(o.id)+'">▤ '+d.length+" replies</button> "+(t&&t.id!==o.owner?'<button class="pikk-forum-reply-button" data-freport="'+l(o.id)+'">◇ Hide / report locally</button>':"")+'<div class="pikk-forum-thread" data-thread="'+l(o.id)+'" hidden>'+d.map(m=>'<p class="pikk-forum-comment"><strong>'+l(m.author)+"</strong> "+l(m.body)+"</p>").join("")+(t?'<form data-freply="'+l(o.id)+'"><label>Reply</label><textarea maxlength="1000" required rows="2" placeholder="Join the discussion"></textarea><button class="btn primary" type="submit">Reply · local</button></form>':'<a href="#/profile" class="btn ghost">Sign in to reply</a>')+"</div></div></article>"}).join(""):'<div class="pikk-forum-empty">No discussions yet. Start the first conversation on this browser.</div>'}function Kh(){const e=M().user,t=ms.map(s=>'<button data-ftopic="'+s[0]+'" type="button" aria-pressed="false"><span>'+s[2]+"</span>"+l(s[1])+"</button>").join("");return _("PIKK Communities",'<section class="pikk-forum-hero"><p class="kicker">PIKK CONNECT · TOPICS & DISCUSSIONS</p><h2>Find your people. <span>Start the conversation.</span></h2><p>Explore communities around what matters to you. Discuss, upvote, reply and discover new ideas.</p><a class="btn ghost" href="#/community">PIKK Lounge</a> <a class="btn ghost" href="#/posts">Social Posts</a></section><p class="pikk-forum-warning"><b>TEST MODE:</b> These conversations and votes are saved only in this browser. No public posting, account verification or server-side moderation is active.</p><div id="pikkForum" class="pikk-forum-layout"><aside class="pikk-forum-sidebar"><h3>Explore topics</h3><button class="on" data-ftopic="all" aria-pressed="true">✦ All discussions</button>'+t+'</aside><main class="pikk-forum-center"><nav class="pikk-forum-sort" aria-label="Sort posts"><button class="on" data-fsort="new" aria-pressed="true">✦ New</button><button data-fsort="top" aria-pressed="false">▲ Top</button><button data-fsort="discussed" aria-pressed="false">▤ Discussed</button></nav><div class="pikk-forum-topic-board"><h3>Discover communities</h3><div class="pikk-forum-topic-cards">'+ms.map(s=>'<button data-ftopic="'+s[0]+'" aria-pressed="false"><span>'+s[2]+"</span><strong>"+l(s[1])+"</strong></button>").join("")+'</div></div><section class="pikk-forum-compose"><h3>Start a discussion</h3>'+(e?'<form id="pikkForumForm"><label for="pikkForumTopic">Community</label><select id="pikkForumTopic">'+ms.map(s=>'<option value="'+s[0]+'">'+l(s[1])+"</option>").join("")+'</select><label for="pikkForumTitle">Title</label><input id="pikkForumTitle" required maxlength="110" placeholder="What is on your mind?" /><label for="pikkForumBody">Discussion</label><textarea id="pikkForumBody" required maxlength="4000" rows="3" placeholder="Ask a question or share a thought..."></textarea><button class="btn primary" type="submit">Publish locally · TEST MODE</button></form>':'<p class="muted">Sign in with a PIKK demo account to write discussions and vote.</p><a href="#/profile" class="btn primary">Sign in</a>')+'</section><section><h3 class="pikk-forum-feed-title">Community discussions</h3><div id="pikkForumFeed"></div></section></main><aside class="pikk-forum-info"><h3>About PIKK Communities</h3><p>Topic-based discussion with an original PIKK look, separate from the live Lounge and social feed.</p><h3>Community safety</h3><p>Respect others. No harassment, hate, scams or personal information. Reports on this preview only hide posts on your device.</p><a href="#/guidelines">Community Guidelines</a></aside></div>',{lead:"Topic communities · discussions · voting · replies · local preview"})}function Gh(e){const t=e.querySelector("#pikkForum");if(!t)return;let s="all",a="new";const i=()=>M().user,n=t.querySelector("#pikkForumFeed"),o=()=>{n.innerHTML=Fh(is(),i(),s,a)},r=new URLSearchParams(location.hash.split("?")[1]||"").get("topic");ii.has(r)&&(s=r);function d(c,p,m){t.querySelectorAll(c).forEach(g=>{let f=g.dataset[p]===m;g.classList.toggle("on",f),g.setAttribute("aria-pressed",String(f))})}d("[data-ftopic]","ftopic",s),t.addEventListener("click",c=>{const p=c.target.closest("[data-ftopic]");if(p){s=p.dataset.ftopic,d("[data-ftopic]","ftopic",s);const y=t.querySelector("#pikkForumTopic");y&&s!=="all"&&(y.value=s),o();return}const m=c.target.closest("[data-fsort]");if(m){a=m.dataset.fsort,d("[data-fsort]","fsort",a),o();return}const g=c.target.closest("[data-fopen]");if(g){const y=t.querySelector('[data-thread="'+g.dataset.fopen+'"]');y&&(y.hidden=!y.hidden);return}const f=c.target.closest("[data-fvote]");if(f&&i()){const y=is(),v=f.dataset.id+":"+i().id,w=Number(f.dataset.fvote);y.votes[v]=y.votes[v]===w?0:w,js(y)&&o();return}const b=c.target.closest("[data-freport]");if(b&&i()){if(!confirm("Hide this post on this browser? This will NOT submit a report to a server."))return;const y=is();y.hidden.push(b.dataset.freport),js(y)&&o(),h("Hidden locally only — no server report submitted")}}),t.addEventListener("submit",c=>{var m,g,f,b;const p=c.target;if(!(!(p instanceof HTMLFormElement)||!i())){if(c.preventDefault(),p.id==="pikkForumForm"){const y=as((m=p.querySelector("input"))==null?void 0:m.value),v=as((g=p.querySelector("textarea"))==null?void 0:g.value),w=(f=p.querySelector("select"))==null?void 0:f.value;if(!y||!v||!ii.has(w))return;const $=is();$.posts.push({id:"local-"+Date.now()+"-"+Math.random().toString(36).slice(2,8),owner:i().id,author:as(i().username).slice(0,30)||"Member",title:y,body:v,topic:w,when:Date.now(),replies:[]}),js($)&&(s=w,d("[data-ftopic]","ftopic",s),p.reset(),o(),h("Saved only on this browser · TEST MODE"))}else if(p.dataset.freply){const y=as((b=p.querySelector("textarea"))==null?void 0:b.value);if(!y)return;const v=is(),w=v.posts.find($=>$.id===p.dataset.freply);if(!w)return;if(w.replies||(w.replies=[]),w.replies.push({author:as(i().username).slice(0,30)||"Member",body:y}),js(v)){o();const $=t.querySelector('[data-thread="'+w.id+'"]');$&&($.hidden=!1),h("Reply saved locally")}}}}),o()}function Vh(){const e=fe.filter(s=>(s.category||"")==="Music Videos"&&s.embed);return(e.length?e:fe.filter(s=>s.embed)).slice(0,10).map((s,a)=>({id:`clip_${s.id}`,videoId:s.id,title:s.title,artist:s.artist||"DatBoiSkeet",embed:s.embed,youtube:s.youtube,blurb:a%3===0?"Clip cut · DEMO":a%3===1?"Highlight · DEMO":"Short · DEMO"}))}function Uh(e,t){return`
    <article class="shorts-card" data-clip-id="${l(e.id)}" id="shorts-card-${t}">
      <div class="shorts-stage">
        <div class="shorts-embed hero-video">
          <iframe
            src="${l(Je(e.embed))}"
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
    </article>`}function _n(){const e=Vh(),s=`
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
      ${e.map(Uh).join("")||'<p class="muted">No demo clips seeded.</p>'}
    </div>
    <p class="muted" style="margin:12px 0 0;font-size:12px;text-align:center">
      End of DEMO feed · ${e.length} clips · Scroll for more when real clip uploads ship
    </p>`;return _("Shorts / Clips",s,{lead:"Posts · short-form feed · Picture / Short / Video create on Posts · TEST MODE"})}function On(e){xa(e),e.querySelectorAll(".shorts-card").forEach(t=>{t.addEventListener("focusin",()=>{t.classList.add("is-focus")})}),e.querySelector(".shorts-card")||h("No demo clips · add MVs in data.js")}const oa=[{id:"ny",name:"NY",tag:"East coast",still:"/blockwars-preview/preview-ny-still.jpg",fighter:"Brooklyn Brawler",blurb:"Street-pressured power from the five boroughs. Heavy combos, tight corners — TEST MODE teaser only."},{id:"la",name:"LA",tag:"West coast",still:"/blockwars-preview/preview-la-still.jpg",fighter:"Sunset Striker",blurb:"Flashy footwork under neon skies. Style meets speed — Coming Soon, not a real match engine."},{id:"chi",name:"Chicago",tag:"Midwest",still:"/blockwars-preview/preview-chi-still.jpg",fighter:"Windy City Wall",blurb:"Defense-first grit from the lakefront. Hold the block — lobby demo only, no live fights yet."}];function Hh(e){return oa.map(t=>{const s=t.id===e?" is-active":"",a=t.id===e?"true":"false";return`<button type="button" class="bw-city-card${s}" data-city="${l(t.id)}" aria-pressed="${a}" aria-label="${l(t.name)} fighter"><img src="${l(t.still)}" alt="" width="120" height="160" loading="lazy" decoding="async" /><span class="bw-city-meta"><span class="bw-city-name">${l(t.name)}</span><span class="bw-city-tag">${l(t.tag)}</span></span></button>`}).join("")}function zh(e){return`<div class="bw-focus" id="bwFocus" data-city="${l(e.id)}"><div class="bw-focus-still"><img id="bwFocusImg" src="${l(e.still)}" alt="${l(e.fighter)}" width="110" height="140" /></div><div class="bw-focus-copy"><p class="bw-focus-city">${l(e.name)} · ${l(e.tag)}</p><h3 id="bwFocusName">${l(e.fighter)}</h3><p id="bwFocusBlurb">${l(e.blurb)}</p></div></div>`}function Wh(){const e=oa[0],t=`
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
        ${Hh(e.id)}
      </div>

      ${zh(e)}

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
    </div>`;return _("Block Wars",t,{lead:"Coming Soon · lobby fighter select · preview video · not playable yet."})}function Yh(e,t){const s=oa.find(d=>d.id===t)||oa[0];e.querySelectorAll(".bw-city-card").forEach(d=>{const c=d.getAttribute("data-city")===s.id;d.classList.toggle("is-active",c),d.setAttribute("aria-pressed",c?"true":"false")});const a=e.querySelector("#bwFocus"),i=e.querySelector("#bwFocusImg"),n=e.querySelector("#bwFocusName"),o=e.querySelector("#bwFocusBlurb"),r=e.querySelector(".bw-focus-city");a&&a.setAttribute("data-city",s.id),i&&(i.src=s.still,i.alt=s.fighter),n&&(n.textContent=s.fighter),o&&(o.textContent=s.blurb),r&&(r.textContent=`${s.name} · ${s.tag}`)}function Jh(e){var i,n;(i=e.querySelector("#bwCityGrid"))==null||i.addEventListener("click",o=>{const r=o.target.closest(".bw-city-card");r&&(o.preventDefault(),Yh(e,r.getAttribute("data-city")))}),(n=e.querySelector("#bwEnterArena"))==null||n.addEventListener("click",o=>{o.preventDefault(),h("Block Wars arena is Coming Soon — lobby demo only. No match engine yet.")});const t=e.querySelector("#bwCsVideo"),s=e.querySelector("#bwCsPlay");if(!t)return;const a=()=>{if(!s)return;const o=t.paused||t.ended;s.hidden=!o,s.setAttribute("aria-hidden",o?"false":"true")};s==null||s.addEventListener("click",o=>{o.preventDefault(),t.play().catch(()=>{})}),t.addEventListener("play",()=>{Rt(),a()}),t.addEventListener("pause",()=>{Qe(),a()}),t.addEventListener("ended",()=>{Qe(),a()}),t.addEventListener("pointerdown",()=>{t.paused||Rt()}),a()}function Qh(){return _("PIKK Arcade",`
    <section class="pikk-arcade-intro card" aria-label="PIKK Arcade">
      <div class="pikk-arcade-heading">
        <div>
          <p class="kicker">Play · Compete · Hang out</p>
          <div class="pikk-arcade-brand"><img src="${l(Ws({artwork:"/brand/pikk-official-approved.jpg"}))}" alt="PIKK" loading="eager" decoding="async"/><span>ARCADE</span></div>
          <p>15 original game concepts. Find your favorites, see the art, and follow their development.</p>
        </div>
        <span class="pikk-arcade-icon" aria-hidden="true">🎮</span>
      </div>
      <p class="pikk-arcade-disclosure">ALL GAMES COMING SOON · Gallery previews, not playable releases. Play Chips have no cash value or cash-out.</p>
    </section>
    <div class="pikk-arcade-toolbar"><strong>15 upcoming games</strong><span>PLAY • COMPETE • HANG OUT</span></div>
    <div class="pikk-arcade-grid">
      ${hs.map((e,t)=>`
        <article class="pikk-arcade-card pikk-game-${l(e.theme)}">
          <div class="pikk-arcade-card-header"><span class="pikk-arcade-number">${t+1}</span><h3>${l(e.name)}</h3></div>
          <div class="pikk-arcade-art" aria-label="${l(e.name)} preview artwork">
            ${e.artwork?`<img src="${l(Ws(e))}" alt="${l(e.name)} concept artwork" loading="lazy" decoding="async"/>`:`<span class="pikk-arcade-symbol" aria-hidden="true">${e.icon}</span>`}
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
  `,{lead:"Fifteen upcoming games · mobile-first catalog · previews only"})}function Xh(e){const t=hs.length,s=(Math.trunc(Number(e)||0)%t+t)%t,a=hs[s];return{index:s,total:t,title:a.name,description:a.description,players:a.players,image:Ws(a)}}function Zh(e){const t=e.querySelector(".pikk-arcade-grid"),s=e.querySelector("#pikkArcadeLightbox");if(!t||!s||typeof s.showModal!="function")return;let a=0,i=null;const n=s.querySelector("[data-arcade-full-image]"),o=s.querySelector("[data-arcade-title]"),r=s.querySelector("[data-arcade-description]"),d=s.querySelector("[data-arcade-players]"),c=s.querySelector("[data-arcade-counter]"),p=m=>{const g=Xh(m);a=g.index,n.src=g.image,n.alt=g.title+" concept artwork",o.textContent=g.title,r.textContent=g.description,d.textContent=g.players+(g.players==="1"?" Player · Preview only":" Players · Preview only"),c.textContent=String(a+1).padStart(2,"0")+" / "+g.total};t.addEventListener("click",m=>{const g=m.target.closest("[data-game-preview]");g&&(i=g,p(g.dataset.gamePreview),s.showModal())}),s.addEventListener("click",m=>{m.target===s||m.target.closest("[data-arcade-close]")?s.close():m.target.closest("[data-arcade-prev]")?p(a-1):m.target.closest("[data-arcade-next]")&&p(a+1)}),s.addEventListener("keydown",m=>{(m.key==="ArrowLeft"||m.key==="ArrowRight")&&(m.preventDefault(),p(a+(m.key==="ArrowRight"?1:-1)))}),s.addEventListener("close",()=>{i!=null&&i.isConnected&&i.focus()})}function eg(){return _("PIKK Dating & Connections",`
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
  `,{lead:"Dating · mutual matches · live connections"})}function tg(e){const t=new Set(["dating-discover","dating-experiences","dating-live","dating-safety"]),s=[...e.querySelectorAll("[data-dating-jump]")];function a(n,o=!1){if(!t.has(n))return;const r=e.querySelector("#"+n);if(r&&(s.forEach(d=>{const c=d.dataset.datingJump===n;d.classList.toggle("is-active",c),d.setAttribute("aria-pressed",String(c))}),o)){const d=window.matchMedia("(prefers-reduced-motion: reduce)").matches;r.scrollIntoView({behavior:d?"auto":"smooth",block:"start"}),r.focus({preventScroll:!0})}}s.forEach(n=>n.addEventListener("click",()=>a(n.dataset.datingJump,!0)));const i=Ve().elementId;t.has(i)&&window.setTimeout(()=>{e.querySelector("#"+i)&&a(i,!0)},80)}const To=60,sg=10,ag=10,qn=3;function ig(){return{phase:"round",round:1,seconds:To,votes:[0,0],scores:[0,0],roundWinners:[],gifts:[0,0],rematchVotes:[0,0],winner:null,tieBreaker:!1}}function ng(e,t){if(e.phase!=="vote"||![0,1].includes(t))return e;const s=[...e.votes];return s[t]+=1,{...e,votes:s}}function rg(e,t){if(e.phase!=="rematch")return e;const s=[...e.rematchVotes];return s[t?0:1]+=1,{...e,rematchVotes:s}}function og(e){if(!["round","vote","rematch"].includes(e.phase))return e;if(e.seconds>1)return{...e,seconds:e.seconds-1};if(e.phase==="round")return{...e,phase:"vote",seconds:sg,votes:[0,0],voted:!1};if(e.phase==="vote"){const t=e.votes[0]===e.votes[1]?null:e.votes[0]>e.votes[1]?0:1,s=[...e.scores];t!==null&&(s[t]+=1);const a=[...e.roundWinners,t];return e.round>=qn&&s[0]!==s[1]?{...e,scores:s,roundWinners:a,winner:s[0]>s[1]?0:1,phase:"rematch",seconds:ag,rematchVoted:!1}:{...e,scores:s,roundWinners:a,phase:"round",round:e.round+1,seconds:To,votes:[0,0],voted:!1,tieBreaker:e.round>=qn}}return{...e,phase:"finished",seconds:0}}let J=null,Me=null;function Fs(){const e=document.getElementById("roast-demo");if(!e||!J){Me&&clearInterval(Me),Me=null;return}const t=J.phase,s=t==="round"?`Round ${J.round}${J.tieBreaker?" · Final tiebreaker":""}`:t==="vote"?"Vote for the round winner":t==="rematch"?"Run It Back?":"Match finished";e.innerHTML=`<h3>${s}</h3><p><strong>${String(Math.floor(J.seconds/60)).padStart(2,"0")}:${String(J.seconds%60).padStart(2,"0")}</strong></p><p>Contestant A: ${J.scores[0]} rounds · Contestant B: ${J.scores[1]} rounds</p>${t==="vote"?'<button type="button" data-roast-vote="0">Vote A</button> <button type="button" data-roast-vote="1">Vote B</button>':""}${t==="rematch"?`<p>Winner: Contestant ${J.winner===0?"A":"B"}</p><button type="button" data-roast-rematch="yes">Run It Back? Yes</button> <button type="button" data-roast-rematch="no">No</button>`:""}<p class="muted">Local interactive simulation only. Votes are not shared between viewers. No live video or gifts are connected.</p>`}function lg(){Me&&clearInterval(Me),Me=null,J=null;const e=document.getElementById("roast-start");e&&(e.addEventListener("click",()=>{J=ig(),Fs(),Me&&clearInterval(Me),Me=setInterval(()=>{J=og(J),Fs(),J.phase==="finished"&&(clearInterval(Me),Me=null)},1e3)}),document.getElementById("roast-demo").addEventListener("click",t=>{const s=t.target.closest("[data-roast-vote]"),a=t.target.closest("[data-roast-rematch]");s&&J&&J.phase==="vote"&&!J.voted&&(J={...ng(J,Number(s.dataset.roastVote)),voted:!0},Fs()),a&&J&&J.phase==="rematch"&&!J.rematchVoted&&(J={...rg(J,a.dataset.roastRematch==="yes"),rematchVoted:!0},Fs())}))}function cg(){return _("PIKK Roast Arena",`
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
  `,{lead:"Live comedy competitions · audience votes and gifts tracked separately"})}const ls={instagram:"Instagram",tiktok:"TikTok",facebook:"Facebook",youtube:"YouTube",x:"X",snapchat:"Snapchat",other:"Other"};function dg(e){return((e==null?void 0:e.path)||"")==="/refer"?"refer":"share"}function ne(e){j(e==="refer"?"#/refer":"#/share")}function Ne(){const{user:e}=M();if(e)return e;const t=Kt("DemoCreator");return h("Signed in as DemoCreator · local demo"),t||M().user}function pg(e){const t=Number(e)-Date.now();if(t<=0)return"24h window ended (demo)";const s=Math.floor(t/36e5),a=Math.floor(t%36e5/6e4);return`${s}h ${a}m left`}function ug(e){return`<div class="admin-type-tabs rewards-tabs" style="grid-template-columns:repeat(2,minmax(0,1fr));margin-bottom:14px" role="tablist">
    <a class="admin-type-tab ${e==="share"?"on":""}" href="#/share" role="tab" aria-selected="${e==="share"}">Share &amp; Earn</a>
    <a class="admin-type-tab ${e==="refer"?"on":""}" href="#/refer" role="tab" aria-selected="${e==="refer"}">Refer &amp; Earn</a>
  </div>`}function mg(){const{user:e}=M(),t=ee(),s=t.platformsLinked||[],a=t.challenge,i=t.submissions||[],n=t.rewardsClaimed||[],o=Ir(),r=Pr(),d=qc(),c=s.length>0?`<ul class="list-plain">${s.map(v=>`<li>
          <span><strong>${l(ls[v.platform]||v.platform)}</strong>
            ${v.handle?`<br/><span class="muted" style="font-size:12px">@${l(String(v.handle).replace(/^@+/,""))}</span>`:""}
            ${v.url?`<br/><span class="muted" style="font-size:11px">${l(v.url)}</span>`:""}
          </span>
          <button class="btn ghost" type="button" data-unlink="${l(v.id)}">Remove</button>
        </li>`).join("")}</ul>`:'<p class="muted" style="margin:0;font-size:13px">No platforms linked yet — optional. Never asked for social passwords.</p>',p=Zi().filter(v=>!s.some(w=>w.platform===v)).map(v=>`<option value="${v}">${l(ls[v]||v)}</option>`).join("");let m="";if(!a)m=`<div class="card">
      <h3>24-hour social challenge</h3>
      <p class="muted" style="margin:0 0 10px;font-size:13px">Optional promo · separate from paid Clippers. Post official DBS ad + tracked link · keep live 24h · manual/demo verification (not guaranteed auto-check).</p>
      <button class="btn primary" id="shStart" >Start challenge · TEST MODE</button>
    </div>`;else{const v=a.status==="active",w=Date.now()>=Number(a.endsAt);m=`<div class="card">
      <div class="row wrap" style="gap:8px;margin-bottom:8px">
        <span class="chip">${v?w?"Window ended · demo":"Active":"Ended"}</span>
        <span class="chip">TEST MODE</span>
        <span class="chip">${l(pg(a.endsAt))}</span>
        ${a.simulatedElapsed?'<span class="chip">Simulated 24h elapsed</span>':""}
      </div>
      <h3>${l(a.adTitle)}</h3>
      <p style="margin:8px 0;font-size:14px;white-space:pre-wrap">${l(a.caption)}</p>
      <div class="field"><label>Tracked link</label>
        <input id="shTracked" readonly value="${l(a.trackedLink)}" />
      </div>
      <p class="chip" style="margin:8px 0">#ad · Paid partnership · incentivized promotion disclosure required</p>
      <div class="row wrap" style="gap:8px;margin-top:10px">
        <button class="btn" type="button" id="shCopyLink">Copy tracked link</button>
        <button class="btn" type="button" id="shCopyCaption">Copy caption</button>
        ${v?`<button class="btn ghost" type="button" id="shSim24">Simulate 24h elapsed</button>
               <button class="btn ghost" type="button" id="shEnd">End challenge</button>`:""}
      </div>
      <p class="muted" style="margin:10px 0 0;font-size:12px">Honest scope: stories/API may not prove continuous 24h visibility — admin/demo verify only.</p>
    </div>`}const g=Zi().map(v=>`<option value="${v}">${l(ls[v]||v)}</option>`).join(""),f=i.length>0?`<ul class="list-plain">${i.map(v=>`<li style="align-items:flex-start">
          <span style="flex:1;min-width:0">
            <strong>${l(ls[v.platform]||v.platform)}</strong>
            <span class="chip">${l(v.status)}</span>
            <br/><a href="${l(v.postUrl)}" target="_blank" rel="noopener" style="font-size:13px;word-break:break-all">${l(v.postUrl)}</a>
            <br/><span class="muted" style="font-size:11px">${F(v.submittedAt)} · ${l(v.note||"")}</span>
          </span>
          ${v.status==="pending"?`<span class="row wrap" style="gap:4px">
                  <button class="btn" type="button" data-verify="${l(v.id)}">Verify · demo</button>
                  <button class="btn ghost" type="button" data-reject="${l(v.id)}">Reject</button>
                </span>`:""}
        </li>`).join("")}</ul>`:'<p class="muted" style="margin:0;font-size:13px">No post URLs submitted yet.</p>',b=d.map(v=>{const w=n.some(C=>C.tierId===v.id),$=r.some(C=>C.id===v.id);return`<tr style="border-top:1px solid rgba(255,255,255,.06)">
        <td style="padding:8px 4px"><strong>${l(v.label)}</strong><br/><span class="muted" style="font-size:11px">≥${v.minVerified} verified platform${v.minVerified===1?"":"s"}${v.requireAllLinked?" · all linked (≥3)":""}</span></td>
        <td style="padding:8px 4px">${w?'<span class="chip">Claimed</span>':$?`<button class="btn primary" type="button" data-claim-share="${l(v.id)}">Claim</button>`:`<span class="muted" style="font-size:12px">Locked (${o}/${v.minVerified})</span>`}</td>
      </tr>`}).join(""),y=n.length>0?`<ul class="list-plain">${n.map(v=>`<li>
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

    ${a?`<div class="card">
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
      ${y}
    </div>
  `}function hg(){const{user:e}=M(),t=Ut(),s=_r(),a=t.invitees||[],i=Or(),n=qr(),o=Uc(),r=t.milestonesClaimed||[],d=Et(),c=o.find(b=>i<b.n),p=c?`${i} / ${c.n} verified active → ${c.label}`:i>=100?"All milestones unlocked":`${i} verified active`,m=a.length>0?`<ul class="list-plain">${a.map(b=>{const y=(b.activeDays||[]).length;return`<li style="align-items:flex-start">
            <span style="flex:1;min-width:0">
              <strong>${l(b.username)}</strong>
              <span class="chip">${l(b.status)}</span>
              ${b.flaggedFraud?'<span class="chip">Fraud flag</span>':""}
              ${b.welcomeClaimed?'<span class="chip">Welcome claimed</span>':""}
              <br/><span class="muted" style="font-size:12px">Active days: ${y}/3 · ${l((b.activeDays||[]).join(", ")||"none")} · signed ${F(b.signedUpAt)}</span>
            </span>
            <span class="row wrap" style="gap:4px;justify-content:flex-end">
              ${!b.welcomeClaimed&&!b.flaggedFraud?`<button class="btn ghost" type="button" data-welcome="${l(b.id)}">Welcome perk</button>`:""}
              ${!b.flaggedFraud&&b.status!=="active"?`<button class="btn" type="button" data-activeday="${l(b.id)}">Mark active day</button>`:""}
              ${b.flaggedFraud?`<button class="btn ghost" type="button" data-unfraud="${l(b.id)}">Clear fraud</button>`:`<button class="btn ghost" type="button" data-fraud="${l(b.id)}">Flag fraud</button>`}
            </span>
          </li>`}).join("")}</ul>`:'<p class="muted" style="margin:0;font-size:13px">No invitees yet — simulate a signup or load demo referrals.</p>',g=o.map(b=>{const y=r.some(w=>w.milestoneId===b.id),v=n.some(w=>w.id===b.id);return`<tr style="border-top:1px solid rgba(255,255,255,.06)">
        <td style="padding:8px 4px"><strong>${b.n}</strong> verified active</td>
        <td style="padding:8px 4px">${l(b.label)}</td>
        <td style="padding:8px 4px">${y?'<span class="chip">Claimed</span>':v?`<button class="btn primary" type="button" data-claim-ref="${l(b.id)}">Claim</button>`:`<span class="muted" style="font-size:12px">${i}/${b.n}</span>`}</td>
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
        <span class="chip">Verified active: ${i}</span>
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
  `}function gg(e){return Do(e||{path:"/share"})}function fg(e){return Do(e||{path:"/refer"})}function Do(e){const t=dg(e),s=`
    ${ug(t)}
    ${t==="refer"?hg():mg()}
  `;return _("DBS Rewards",s,{lead:t==="refer"?"Refer & Earn · verified active friends · TEST MODE (§33).":"Share & Earn · 24h social promo · TEST MODE (§32)."})}function vg(e){Lo(e,"share")}function bg(e){Lo(e,"refer")}function Lo(e,t){var a,i,n,o,r,d,c,p,m,g,f,b,y;const s=t||(location.hash.includes("/refer")?"refer":"share");(a=e.querySelector("#rwSignIn"))==null||a.addEventListener("click",()=>{Ne(),ne(s)}),(i=e.querySelector("#shLinkForm"))==null||i.addEventListener("submit",v=>{var P,T,R;v.preventDefault(),Ne();const w=(P=e.querySelector("#shPlat"))==null?void 0:P.value,$=((T=e.querySelector("#shHandle"))==null?void 0:T.value)||"",C=((R=e.querySelector("#shUrl"))==null?void 0:R.value)||"",k=Nc({platform:w,handle:$,url:C});if(k.error==="signin")return h("Sign in required");if(k.error==="already_linked")return h("Already linked");if(k.error==="required")return h("Handle or URL required");if(k.error)return h("Could not link");h(`Linked ${ls[w]||w}`),ne("share")}),e.querySelectorAll("[data-unlink]").forEach(v=>{v.addEventListener("click",()=>{Bc(v.getAttribute("data-unlink")),h("Platform removed"),ne("share")})}),(n=e.querySelector("#shStart"))==null||n.addEventListener("click",()=>{Ne();const v=Rc();if(v.error==="signin")return h("Sign in required");if(v.error==="already_active")return h("Challenge already active");if(v.error)return h("Could not start");h("Challenge started · 24h window"),ne("share")}),(o=e.querySelector("#shCopyLink"))==null||o.addEventListener("click",async()=>{var w;const v=((w=e.querySelector("#shTracked"))==null?void 0:w.value)||"";try{await navigator.clipboard.writeText(v),h("Tracked link copied")}catch{h("Copy manually")}}),(r=e.querySelector("#shCopyCaption"))==null||r.addEventListener("click",async()=>{var $;const w=(($=ee().challenge)==null?void 0:$.caption)||"";try{await navigator.clipboard.writeText(w),h("Caption copied")}catch{h("Copy manually")}}),(d=e.querySelector("#shSim24"))==null||d.addEventListener("click",()=>{if(jc().error)return h("No active challenge");h("Simulated 24h elapsed"),ne("share")}),(c=e.querySelector("#shEnd"))==null||c.addEventListener("click",()=>{Fc(),h("Challenge ended"),ne("share")}),(p=e.querySelector("#shSubmitForm"))==null||p.addEventListener("submit",v=>{var k,P;v.preventDefault(),Ne();const w=(k=e.querySelector("#shSubPlat"))==null?void 0:k.value,$=((P=e.querySelector("#shSubUrl"))==null?void 0:P.value)||"",C=Kc({platform:w,postUrl:$});if(C.error==="required")return h("Post URL required");if(C.error==="duplicate")return h("Already submitted for this platform");if(C.error==="no_challenge")return h("Start a challenge first");if(C.error)return h("Submit failed");h("Submitted · pending demo verification"),ne("share")}),e.querySelectorAll("[data-verify]").forEach(v=>{v.addEventListener("click",()=>{en(v.getAttribute("data-verify"),"verified"),h("Verified · demo (manual)"),ne("share")})}),e.querySelectorAll("[data-reject]").forEach(v=>{v.addEventListener("click",()=>{en(v.getAttribute("data-reject"),"rejected"),h("Rejected"),ne("share")})}),e.querySelectorAll("[data-claim-share]").forEach(v=>{v.addEventListener("click",()=>{Ne();const w=Gc(v.getAttribute("data-claim-share"));if(w.error==="not_claimable")return h("Not claimable yet");if(w.error)return h("Claim failed");h(`Claimed · ${w.claim.label}`),ne("share")})}),(m=e.querySelector("#shReset"))==null||m.addEventListener("click",()=>{Vc(),h("Share demo reset"),ne("share")}),(g=e.querySelector("#refCopy"))==null||g.addEventListener("click",async()=>{var w;Ne(),Ut();const v=((w=e.querySelector("#refLink"))==null?void 0:w.value)||_r();try{await navigator.clipboard.writeText(v),h("Referral link copied")}catch{h("Copy manually")}}),(f=e.querySelector("#refInviteForm"))==null||f.addEventListener("submit",v=>{var C;v.preventDefault(),Ne();const w=((C=e.querySelector("#refInviteName"))==null?void 0:C.value)||"",$=Hc({username:w});if($.error==="self_referral")return h("Self-referral blocked");if($.error==="signin")return h("Sign in required");if($.error)return h("Could not add invitee");h(`Invitee ${$.invitee.username} signed up`),ne("refer")}),e.querySelectorAll("[data-welcome]").forEach(v=>{v.addEventListener("click",()=>{const w=zc(v.getAttribute("data-welcome"));if(w.error==="fraud")return h("Flagged fraud");if(w.error)return h("Welcome claim failed");h(w.perk||"Welcome perk claimed"),ne("refer")})}),e.querySelectorAll("[data-activeday]").forEach(v=>{v.addEventListener("click",()=>{const w=Wc(v.getAttribute("data-activeday"));if(w.error==="fraud")return h("Flagged fraud");if(w.error==="outside_window")return h("Outside first-7-day window");if(w.error==="window_full")return h("All 7 demo days already marked");if(w.error)return h("Could not mark day");const $=(w.invitee.activeDays||[]).length;h($>=3?`${w.invitee.username} → verified active (${$} days)`:`Active day ${$}/3 for ${w.invitee.username}`),ne("refer")})}),e.querySelectorAll("[data-fraud]").forEach(v=>{v.addEventListener("click",()=>{tn(v.getAttribute("data-fraud"),!0),h("Flagged as fraud · demo"),ne("refer")})}),e.querySelectorAll("[data-unfraud]").forEach(v=>{v.addEventListener("click",()=>{tn(v.getAttribute("data-unfraud"),!1),h("Fraud flag cleared"),ne("refer")})}),e.querySelectorAll("[data-claim-ref]").forEach(v=>{v.addEventListener("click",()=>{Ne();const w=Yc(v.getAttribute("data-claim-ref"));if(w.error==="not_claimable")return h("Not claimable yet");if(w.error)return h("Claim failed");h(`Milestone claimed · ${w.claim.label}`),ne("refer")})}),(b=e.querySelector("#refSeed"))==null||b.addEventListener("click",()=>{Ne();const v=Qc({force:!0});if(v.error==="signin")return h("Sign in required");h(`Loaded ${v.seeded||0} demo invitees`),ne("refer")}),(y=e.querySelector("#refReset"))==null||y.addEventListener("click",()=>{Ne(),Jc(),h("Refer demo reset"),ne("refer")})}function yg(e){return{badge:`Phase ${e} shell`}}function Nn(e){return`
    <article class="card pikk-video-tile">
      <div class="hero-video" style="margin:0 0 10px">
        <iframe src="${l(Je(e.embed))}" title="${l(e.title)}" allowfullscreen loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </div>
      <span class="chip">${l(e.category||"Music Videos")}</span>
      <h3 style="margin:8px 0 4px">${l(e.title)}</h3>
      <p class="muted" style="margin:0 0 8px">${l(e.artist||"DatBoiSkeet")}</p>
      <div class="row wrap">
        <a class="btn" href="${l(e.youtube)}" target="_blank" rel="noopener">Open on YouTube</a>
        <button class="btn ghost video-share" data-url="${l(e.youtube)}" data-title="${l(e.title)}">Share link</button>
      </div>
    </article>`}function kg(){var d;const e=["Music Videos","Mixes","Interviews"],t={};fe.forEach(c=>{const p=c.category||"Music Videos";(t[p]||(t[p]=[])).push(c)});const s=e.filter(c=>{var p;return(p=t[c])==null?void 0:p.length}).map(c=>{const p=t[c].map(Nn).join("");return`<section class="pikk-video-section" data-video-category="${l(c)}"><h3>${l(c)}</h3><div class="pikk-video-grid">${p}</div></section>`}).join(""),a=Object.keys(t).filter(c=>!e.includes(c)).map(c=>`<section class="pikk-video-section" data-video-category="${l(c)}"><h3>${l(c)}</h3><div class="pikk-video-grid">${t[c].map(Nn).join("")}</div></section>`).join(""),i=St({publishedOnly:!0,types:["video"]}),n=i.map(c=>{const p=c.youtube||"",m=c.embed||"";if(m||p){const g=m||"";return`<article class="card catalog-admin-video" data-id="${l(c.id)}">
          ${g?`<div class="hero-video" style="margin:0 0 10px"><iframe src="${l(Je(g))}" title="${l(c.title)}" allowfullscreen loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>`:""}
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
      </article>`}).join(""),o={};Oo.forEach(c=>{var p;(o[p=c.category]||(o[p]=[])).push(c)});const r=Object.entries(o).map(([c,p])=>`
      <div class="card pikk-video-coming-card" data-video-coming-category="${l(c)}">
        <h3>${l(c)}</h3>
        <p class="muted" style="margin:0 0 8px">No verified URLs in repo yet — titles from plan §9 only. No invented view counts.</p>
        <ul class="list-plain">${p.map(m=>`<li><span>${l(m.title)}</span><span class="chip">Coming Soon</span></li>`).join("")}</ul>
      </div>`).join("");return _("Videos & Interviews",`${co("videos")}
    <section class="pikk-video-hero card">
      <div class="pikk-video-hero-copy">
        <p class="kicker">PIKK VIDEOS · OFFICIAL RELEASES</p>
        <h2>Watch. Discover. Repeat.</h2>
        <p class="muted">Verified DatBoiSkeet music videos, mixes and interviews. Original YouTube playback, with no invented view counts.</p>
        <a class="btn primary" href="#/explore">Explore creators</a>
      </div>
      ${(d=fe[0])!=null&&d.youtube?`<a class="pikk-video-hero-preview" href="${l(fe[0].youtube)}" target="_blank" rel="noopener" aria-label="Watch ${l(fe[0].title)}">
        <img src="https://i.ytimg.com/vi/${l(new URL(fe[0].youtube).searchParams.get("v")||"")}/hqdefault.jpg" alt="" loading="eager" decoding="async" />
        <span class="pikk-video-hero-label">▶ ${l(fe[0].title)}</span>
      </a>`:""}
    </section>
    <nav class="pikk-video-filters" aria-label="Video categories">
      <button type="button" class="on" data-videos-filter="All" aria-pressed="true">All</button>
      <button type="button" data-videos-filter="Music Videos" aria-pressed="false">Music Videos</button>
      <button type="button" data-videos-filter="Mixes" aria-pressed="false">Mixes</button>
      <button type="button" data-videos-filter="Interviews" aria-pressed="false">Interviews</button>
      ${i.length?'<button type="button" data-videos-filter="Admin" aria-pressed="false">Admin</button>':""}
    </nav>
    <p class="card pikk-video-source-info pikk-video-filter-status muted" role="status" aria-live="polite" data-video-filter-status>Showing all video categories and upcoming titles.</p>
    <div class="card pikk-video-source-info"><p class="muted" style="margin:0">Official DatBoiSkeet music videos, mixes, and interviews — YouTube embeds from the original source. No rehosted files.</p>
      <div class="row wrap" style="margin-top:8px;gap:8px">
        <a class="btn" href="https://www.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA" target="_blank" rel="noopener">Official YouTube channel</a>
        <a class="btn ghost" href="https://www.youtube.com/@DatBoiSkeet1" target="_blank" rel="noopener">@DatBoiSkeet1</a>
        <a class="btn ghost" href="https://www.youtube.com/playlist?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t" target="_blank" rel="noopener">Music Videos playlist</a>
      </div>
    </div>
    ${s}${a}
    ${n?`<section class="pikk-video-section" data-video-category="Admin"><h3>From Admin</h3><div class="pikk-video-grid">${n}</div></section>`:""}
    <section class="pikk-video-section pikk-video-coming-list" aria-label="Upcoming videos">
      <h3>Upcoming on PIKK</h3>
      ${r}
    </section>`,{lead:"Official MVs · Mixes · Interviews · admin uploads."})}function wg(e){var o;const t=[...e.querySelectorAll("[data-videos-filter]")],s=[...e.querySelectorAll(".pikk-video-section[data-video-category]")],a=[...e.querySelectorAll("[data-video-coming-category]")],i=e.querySelector(".pikk-video-coming-list"),n=e.querySelector("[data-video-filter-status]");t.forEach(r=>r.addEventListener("click",()=>{const d=r.dataset.videosFilter||"All";t.forEach(p=>{const m=p===r;p.classList.toggle("on",m),p.setAttribute("aria-pressed",m?"true":"false")}),s.forEach(p=>{const m=d==="All"||p.dataset.videoCategory===d;p.hidden=!m}),a.forEach(p=>{p.hidden=d!=="All"&&p.dataset.videoComingCategory!==d});const c=a.some(p=>!p.hidden);if(i&&(i.hidden=!c),n){const p=s.some(m=>!m.hidden);n.textContent=d==="All"?"Showing all video categories and upcoming titles.":p?`Showing ${d}${c?" and upcoming titles":""}.`:c?`No published ${d} videos yet. Upcoming titles are listed below.`:`No published ${d} videos yet.`}})),(o=e.querySelector(".pikk-video-filters"))==null||o.addEventListener("keydown",r=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(r.key))return;const d=t.indexOf(r.target);if(d<0||!t.length)return;r.preventDefault();const c=r.key==="Home"?0:r.key==="End"?t.length-1:(d+(r.key==="ArrowRight"?1:-1)+t.length)%t.length;t[c].focus(),t[c].click()}),xa(e),e.querySelectorAll("video.catalog-video").forEach(r=>{r.addEventListener("play",()=>Rt()),r.addEventListener("pause",()=>Qe()),r.addEventListener("ended",()=>Qe())}),e.querySelectorAll(".video-share").forEach(r=>{r.addEventListener("click",async()=>{const d=r.dataset.url||"";try{await navigator.clipboard.writeText(d),h("Link copied")}catch{h(d||"Copy failed")}})}),e.querySelectorAll("[data-idb-src]").forEach(async r=>{const d=(r.getAttribute("data-idb-src")||"").trim();if(d)try{const c=await Ea(d);if(!c){r.tagName==="VIDEO"&&r.insertAdjacentHTML("afterend",'<p class="muted" style="font-size:12px">Media blob missing — re-upload from Admin.</p>');return}if((r.tagName==="IMG"||r.tagName==="VIDEO"||r.tagName==="AUDIO")&&(r.setAttribute("src",c),r.src=c,r.tagName==="VIDEO"||r.tagName==="AUDIO")){r.setAttribute("playsinline",""),r.setAttribute("webkit-playsinline",""),r.controls=!0;try{r.load()}catch{}}}catch(c){console.warn("idb media hydrate failed",d,c)}})}function Sg(){const e=Gn.map(a=>`<li><span>${l(a.name)}</span><strong>$${a.price}/mo</strong></li>`).join(""),t=M().creatorSellApps||[],s=t.length?`<ul class="list-plain" style="margin-top:10px">${t.slice(0,8).map(a=>`<li><span>${l(a.name)} · ${l(a.contact)} · ${l(a.sells)}</span><span class="chip">${l(a.status||"pending")}</span></li>`).join("")}</ul>`:'<p class="muted" style="margin:8px 0 0;font-size:12px">No applications on this device yet.</p>';return _("Pricing",`<div class="card">
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
     </div>`,{lead:"Sell music, videos, beats &amp; merch · rules &amp; fees · apply form · memberships &amp; gifts — admin-adjustable."})}function $g(e){var s;typeof location<"u"&&(location.hash.includes("focus=sell")||location.hash.includes("creator-sell"))&&setTimeout(()=>{var a;return(a=document.getElementById("creator-sell"))==null?void 0:a.scrollIntoView({behavior:"smooth",block:"start"})},60),(s=e.querySelector("#csSubmit"))==null||s.addEventListener("click",()=>{var d,c,p,m,g,f;const a=(c=(d=e.querySelector("#csName"))==null?void 0:d.value)==null?void 0:c.trim(),i=(m=(p=e.querySelector("#csContact"))==null?void 0:p.value)==null?void 0:m.trim(),n=((g=e.querySelector("#csSells"))==null?void 0:g.value)||"both",o=!!((f=e.querySelector("#csAgree"))!=null&&f.checked);if(!a||!i)return h("Name and email/handle required");if(!o)return h("Agree to rules & fees to continue");const r=Yo({name:a,contact:i,sells:n,agreed:o});if(r!=null&&r.error)return h(r.error==="rules"?"Agree to rules & fees to continue":"Name and email/handle required");h("Application saved · TEST MODE"),j("#/pricing?focus=sell")})}function xg(){return _("Community Guidelines",`<div class="card">
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
    </div>`,{lead:"Rules for posts, chat, Live & Lounge — plan §13."})}const Fa=[{id:"dbs-lounge",cat:"NETWORK",hash:"#dbs-lounge",name:"PIKK Lounge",blurb:"Main hub · official announcements & network news",chip:"Hub"},{id:"conversation",cat:"NETWORK",hash:"#the-conversation",name:"The Conversation",blurb:"Public music & fan discussion threads",chip:"Public"},{id:"listening",cat:"VOICE / LISTENING",hash:"#listening-rooms",name:"Listening Rooms",blurb:"Listening parties & reactions to new releases",chip:"Parties"},{id:"backstage",cat:"MEMBERS",hash:"#backstage-rooms",name:"Backstage Rooms",blurb:"Tier-restricted spaces for Skeet+ / Backstage / Inner Circle",chip:"Members"},{id:"live-rooms",cat:"NETWORK",hash:"#live-rooms",name:"Live Rooms",blurb:"Scheduled community events & discussions",chip:"Events"},{id:"spotlight",cat:"NETWORK",hash:"#the-spotlight",name:"The Spotlight",blurb:"Featured fan conversations & creator posts",chip:"Featured"}],Bn={"dbs-lounge":[{who:"PIKK · System",text:"Welcome to PIKK Lounge — DatBoiSkeet’s channel-style community hub.",tag:"DEMO"},{who:"TEST MODE",text:"Live chat isn’t connected yet. These rows are placeholders so the room pane feels real.",tag:"DEMO"}],conversation:[{who:"DEMO",text:"Drop takes on new releases here once Phase 2 chat ships.",tag:"DEMO"}],listening:[{who:"DEMO",text:"Listening parties will sync reactions here — preview only.",tag:"DEMO"}],backstage:[{who:"DEMO",text:"Member-tier rooms unlock with Skeet+ / Backstage / Inner Circle.",tag:"DEMO"}],"live-rooms":[{who:"DEMO",text:"Scheduled community events will list here — no live presence yet.",tag:"DEMO"}],spotlight:[{who:"DEMO",text:"Featured fan conversations land here in Phase 2.",tag:"DEMO"}]},Eg=[{name:"DatBoiSkeet",role:"Owner"},{name:"SkeetMod",role:"Mod · DEMO"},{name:"FanDemo01",role:"DEMO"},{name:"ListenerX",role:"DEMO"}];function Ag(e){const s=(Bn[e.id]||Bn["dbs-lounge"]).map(a=>`<div class="lounge-msg">
        <div class="lounge-msg-avatar" aria-hidden="true">${l(a.who.slice(0,1))}</div>
        <div class="lounge-msg-body">
          <div class="lounge-msg-meta"><strong>${l(a.who)}</strong> <span class="chip">${l(a.tag)}</span></div>
          <p>${l(a.text)}</p>
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
  </div>`}function Cg(){const e=[],t=new Set;Fa.forEach(n=>{t.has(n.cat)||(t.add(n.cat),e.push(n.cat))});const s=e.map(n=>{const o=Fa.filter(r=>r.cat===n).map(r=>`<button type="button" class="lounge-channel${r.id==="dbs-lounge"?" on":""}" data-channel="${l(r.id)}" aria-pressed="${r.id==="dbs-lounge"?"true":"false"}">
            <span class="lounge-hash">#</span>
            <span class="lounge-channel-label">${l(r.name)}</span>
            <span class="chip lounge-channel-chip">${l(r.chip)}</span>
          </button>`).join("");return`<div class="lounge-cat-block">
        <p class="lounge-cat-label">${l(n)}</p>
        ${o}
      </div>`}).join(""),a=Fa.map(Ag).join(""),i=Eg.map(n=>`<li><span class="lounge-member-dot" aria-hidden="true"></span><span><strong>${l(n.name)}</strong><br/><span class="muted" style="font-size:11px">${l(n.role)}</span></span></li>`).join("");return _("PIKK Lounge",`<div class="card lounge-intro">
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
        ${a}
      </section>
      <aside class="lounge-members" aria-label="Demo members">
        <p class="lounge-cat-label">MEMBERS · DEMO</p>
        <ul class="lounge-member-list">${i}</ul>
        <p class="muted" style="font-size:11px;margin:8px 4px 0">Placeholder names — not live presence.</p>
      </aside>
    </div>`,{lead:"Discord-inspired channels · DatBoiSkeet branded.",...yg(2)})}function Tg(e=document){const t=e.querySelector("#loungeDiscord")||e,s=[...t.querySelectorAll(".lounge-channel")],a=[...t.querySelectorAll(".lounge-pane")];s.length&&s.forEach(i=>{i.addEventListener("click",()=>{const n=i.dataset.channel;s.forEach(o=>{const r=o===i;o.classList.toggle("on",r),o.setAttribute("aria-pressed",r?"true":"false")}),a.forEach(o=>{o.dataset.pane===n?o.removeAttribute("hidden"):o.setAttribute("hidden","")})})})}function Dg(){return _("Signup & Creator Apps",`<div class="card">
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
    </div>`,{lead:"Free fan signup + creator role applications · §16."})}function Lg(){const t=[{label:"Registration & role approval",status:"Demo",note:"Profile/signup local demo · real auth later"},{label:"Moderation / reporting / appeals",status:"TODO",note:"Guidelines copy ready · enforcement UI Phase 2"},{label:"Payments & refunds",status:"TEST",note:"TEST MODE only · no real charges"},{label:"Creator payouts verification",status:"SHELL",note:"Wallet / KYC stubs · not launch-ready"},{label:"Music & video rights",status:"Partial",note:"3 official MVs · streaming links still SHELL"},{label:"Gift-battle fraud prevention",status:"SHELL",note:"Gift Battles not wired for launch"},{label:"Livestream safety",status:"Demo",note:"Go-live demo PASS · age/safety stack incomplete"},{label:"Background audio pause/resume",status:"PARTIAL",note:"§17 sticky top YT player + pauseDbsPlayer hooks"},{label:"Account recovery / optional 2FA",status:"TODO",note:"Local demo sign-in only"},{label:"Loyalty analytics consent",status:"SHELL",note:"Privacy/consent controls before launch"},{label:"PIKK Connect safety (age + WebRTC)",status:"Blocked",note:"Must not launch without assurance"}].map(s=>`<li><span><strong>${l(s.label)}</strong><br/><span class="muted" style="font-size:12px">${l(s.note)}</span></span><span class="chip">${l(s.status)}</span></li>`).join("");return _("Launch Readiness",`<div class="card">
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
    </div>`,{lead:"Pre-launch checklist with honest demo status · §31."})}function Mg(){const e=[{n:1,title:"Foundation",summary:"Videos, Music/Vault, Posts, profiles, followers, engagement alerts, Clippers applications.",status:"DONE",items:[{label:"§1 Posts",status:"DONE",href:"#/posts"},{label:"§2 Clippers apply",status:"DONE",href:"#/clippers"},{label:"§7 Profiles",status:"DONE",href:"#/profile"},{label:"§8 Music & Vault",status:"DONE",href:"#/music"},{label:"§9 Videos & Interviews",status:"DONE",href:"#/videos"},{label:"§14 Streaming links",status:"DONE",href:"#/music"},{label:"§19 Loading splash",status:"DONE",href:"#/home"},{label:"§20 Home dashboard",status:"DONE",href:"#/home"},{label:"§21 Merch showcase",status:"DONE",href:"#/merch"},{label:"§34 Coming Soon covers",status:"DONE",href:"#/music"},{label:"§17 Home MV + continuous play",status:"PARTIAL",href:"#/home",note:"Sticky top YT player · Stream Everywhere open links · PENDING AUDIT"}]},{n:2,title:"Growth & Creator Economy",summary:"Clipper campaigns, missions, referrals, creator earnings, and payouts.",status:"DONE",items:[{label:"§5 Creator Earnings",status:"DONE",href:"#/earnings"},{label:"§6 Missions",status:"DONE",href:"#/missions"},{label:"§27 Wallet & Payouts",status:"DONE",href:"#/wallet"},{label:"§32 Share & Earn",status:"DONE",href:"#/share"},{label:"§33 Refer & Earn",status:"DONE",href:"#/refer"},{label:"§10 Pricing",status:"DONE",href:"#/pricing"},{label:"§11 Admin dashboard",status:"DONE",href:"#/admin"},{label:"§16 Signup / Creator apps",status:"DONE",href:"#/signup"},{label:"§24 Explore",status:"DONE",href:"#/explore"},{label:"§25 Notifications",status:"DONE",href:"#/notifications"},{label:"§26 Fan Clubs",status:"DONE",href:"#/fanclubs"},{label:"§28 Loyalty Club",status:"DONE",href:"#/loyalty"},{label:"§22 Profile Shop cosmetics",status:"DONE",href:"#/shop",note:"Checker PASS · cosmetics demo"}]},{n:3,title:"Live & Marketplace",summary:"Creator livestreaming, gifts, donations, advertising, creator subscriptions, and Marketplace.",status:"DONE",items:[{label:"§3 Live",status:"DONE",href:"#/live"},{label:"§4 Marketplace ads",status:"DONE",href:"#/marketplace"},{label:"§18 Messages",status:"DONE",href:"#/messages"},{label:"§23 Gift Battles",status:"DONE",href:"#/giftbattles"},{label:"§29 Multi-Guest Live",status:"DONE",href:"#/multiguest"},{label:"§30 Open Mic",status:"DONE",href:"#/openmic"},{label:"§35 24/7 Spotlight",status:"DONE",href:"#/spotlight"},{label:"§36 Connect (opt-in shell)",status:"DONE",href:"#/connect"},{label:"§37 Restream + streamer tiers",status:"DONE",href:"#/restream"},{label:"§13 Guidelines",status:"DONE",href:"#/guidelines"},{label:"§15 Community / Lounge",status:"DONE",href:"#/community"},{label:"§31 Launch readiness",status:"DONE",href:"#/launch"}]}],t=a=>a==="DONE"?"chip chip-ok":a==="PARTIAL"?"chip chip-partial":a==="PENDING AUDIT"?"chip chip-audit":"chip",s=e.map(a=>{const i=a.items.map(n=>{const o=n.note?`<br/><span class="muted" style="font-size:12px">${l(n.note)}</span>`:"";return`<li><span>${n.href?`<a href="${l(n.href)}" style="color:inherit;text-decoration:none"><strong>${l(n.label)}</strong></a>`:`<strong>${l(n.label)}</strong>`}${o}</span><span class="${t(n.status)}">${l(n.status)}</span></li>`}).join("");return`<div class="card">
      <div class="row wrap" style="gap:8px;align-items:center;margin-bottom:8px">
        <span class="chip">Phase ${a.n}</span>
        <span class="${t(a.status)}">${l(a.status)}</span>
      </div>
      <h2 style="margin:0 0 6px">${l(a.title)}</h2>
      <p class="muted" style="margin:0 0 12px">${l(a.summary)}</p>
      <ul class="list-plain">${i}</ul>
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
    </div>`,{lead:"Phase 1 · Phase 2 · Phase 3 roadmap with live status chips · §12."})}function Ig(e){return _("Not found",`<div class="card"><p>No page for <code>${l(e)}</code>.</p><a class="btn" href="#/home">Home</a></div>`)}const Pg={"/home":{render:Ep,bind:Ap},"/updates":{render:Dp,bind:Lp},"/posts":{render:Wp,bind:Yp},"/music":{render:yn,bind:kn},"/ai-artists":{render:au,bind:iu},"/shield":{render:pu,bind:uu},"/vault":{render:yn,bind:kn},"/merch":{render:mu,bind:hu},"/profile":{render:gu,bind:fu},"/clippers":{render:bu,bind:yu},"/videos":{render:kg,bind:wg},"/live":{render:Uu,bind:Yu},"/viral-live":{render:Zu,bind:em},"/explore":{render:Mm,bind:Im},"/marketplace":{render:am,bind:im},"/earnings":{render:ym,bind:km},"/missions":{render:xm,bind:Em},"/pricing":{render:Sg,bind:$g},"/admin":{render:Up,bind:Hp},"/guidelines":{render:xg},"/community":{render:Cg,bind:Tg},"/communities":{render:Kh,bind:Gh},"/signup":{render:Dg},"/messages":{render:pm,bind:um},"/shop":{render:Eh,bind:Ah},"/profile-shop":{render:bh,bind:yh},"/giftbattles":{render:Vm,bind:Um},"/notifications":{render:mm,bind:hm},"/fanclubs":{render:rh,bind:oh},"/wallet":{render:fm,bind:vm},"/loyalty":{render:lh,bind:ch},"/multiguest":{render:sh,bind:ah},"/openmic":{render:ph,bind:uh},"/launch":{render:Lg},"/phases":{render:Mg},"/share":{render:gg,bind:vg},"/refer":{render:fg,bind:bg},"/spotlight":{render:Nh,bind:Bh},"/restream":{render:()=>(queueMicrotask(()=>{location.hash="/connect#connect-multistream"}),si()),bind:ai},"/shorts":{render:_n,bind:On},"/clips":{render:_n,bind:On},"/connect":{render:si,bind:ai},"/blockwars":{render:Wh,bind:Jh},"/games":{render:Qh,bind:Zh},"/dating":{render:eg,bind:tg},"/roast-arena":{render:cg,bind:lg}};function ji(){var t,s,a;const e=document.getElementById("tabbar");if(M().user)try{ui()}catch{}e.innerHTML=jo.map(i=>{const o="/"+i.href.replace(/^#/,"").replace(/^\//,"").split(/[?#]/)[0],r=l(i.label);return`<a${i.primary?' class="tab-primary"':""} href="${i.href}" data-path="${o}" aria-label="${r}"${i.href==="#/create"?' aria-haspopup="dialog" aria-controls="pikkCreateMenu" aria-expanded="false"':i.href==="#/music"?' aria-haspopup="dialog" aria-controls="pikkMusicMenu" aria-expanded="false"':Ys[o.slice(1)]?` aria-haspopup="dialog" aria-controls="pikk${r}Menu" aria-expanded="false"`:""}><span class="tab-ico">${i.href==="#/create"?'<svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true"><path d="M9 5 L25 16 L9 27 Z" fill="currentColor"/><path d="M24 5v11m0 0-4-4m4 4 4-4" stroke="white" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>':gs[i.icon]||""}</span><span>${r}</span></a>`}).join("");for(const i of Object.keys(Ys))(t=e.querySelector(`a[href="#/${i}"]`))==null||t.addEventListener("click",n=>{n.preventDefault(),_o(i,n.currentTarget)});(s=e.querySelector('a[href="#/music"]'))==null||s.addEventListener("click",i=>{i.preventDefault(),bt(),rp(i.currentTarget)}),(a=e.querySelector('a[href="#/create"]'))==null||a.addEventListener("click",i=>{var o;os(),bt(),i.preventDefault();const n=Og();n.hidden=!n.hidden,i.currentTarget.setAttribute("aria-expanded",String(!n.hidden)),n.hidden||(o=n.querySelector("[data-create-close]"))==null||o.focus()}),e.style.gridTemplateColumns="",e.classList.remove("tabbar-scroll"),e.classList.add("tabbar-reshaped","tabbar-fit7")}function _g(){return Kn.map(e=>{const t=e.items.map(s=>{const a=`<span class="pikk-menu-icon" aria-hidden="true">${gs[s.icon]||gs.explore}</span><strong class="pikk-menu-title">${l(s.title)}</strong><small>${l(s.detail)}</small>`;return s.href?`<a href="${l(s.href)}" class="pikk-create-tile">${a}</a>`:`<div class="pikk-create-tile pikk-create-tile-planned" aria-disabled="true">${a}</div>`}).join("");return`<section class="pikk-create-menu-group" aria-label="${l(e.title)}"><h3>${l(e.title)}</h3><div class="pikk-create-options pikk-create-grid">${t}</div></section>`}).join("")}function Og(){let e=document.getElementById("pikkCreateMenu");if(e)return e;e=document.createElement("div"),e.id="pikkCreateMenu",e.className="pikk-create-overlay",e.hidden=!0,e.innerHTML=`<div class="pikk-create-sheet" role="dialog" aria-modal="true" aria-label="Create on PIKK">
    <div class="pikk-create-head"><strong>Create on PIKK</strong><button type="button" class="btn ghost" data-create-close aria-label="Close create menu">✕</button></div>
    ${_g()}
    <button type="button" class="pikk-menu-cancel" data-create-close>Cancel</button>
    <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · uploads depend on available prototype tools</p>
  </div>`,document.body.appendChild(e);const t=(s=!1)=>{e.hidden=!0;const a=document.querySelector('#tabbar a[href="#/create"]');a==null||a.setAttribute("aria-expanded","false"),s&&(a==null||a.focus())};return window.addEventListener("hashchange",()=>t()),e.addEventListener("click",s=>{s.target===e||s.target.closest("[data-create-close]")?t(!0):s.target.closest(".pikk-create-options a")&&t()}),document.addEventListener("keydown",s=>{if(!e.hidden&&(s.key==="Escape"&&(s.preventDefault(),t(!0)),s.key==="Tab")){const a=[...e.querySelectorAll("a[href], button:not([disabled])")],i=a[0],n=a[a.length-1];if(!i){s.preventDefault();return}e.contains(document.activeElement)?s.shiftKey&&document.activeElement===i?(s.preventDefault(),n.focus()):!s.shiftKey&&document.activeElement===n&&(s.preventDefault(),i.focus()):(s.preventDefault(),(s.shiftKey?n:i).focus())}}),e}function qg(){const e=document.getElementById("tabbar");if(!e)return;ji();const t=Ve();oo(e,t.path);try{Mo()}catch{}}function Ng(){const e=document.getElementById("sideNav"),t=Ve(),s="#"+(t.raw||t.path),a="#"+t.path,i=Vn.map(n=>{if(n.href)return`<a class="drawer-direct${n.href===a||n.href===s?" on":""}" href="${n.href}">${l(n.label)}</a>`;const o=n.links||[],r=o.some(m=>m.href===a||m.href===s),d=r?" open":"",c=r?" has-active":"",p=o.map(m=>`<a class="drawer-link${m.href===a||m.href===s?" on":""}" href="${m.href}">${l(m.label)}</a>`).join("");return`<div class="drawer-group${d}${c}" data-group="${l(n.id)}"><button type="button" class="drawer-cat" aria-expanded="${r?"true":"false"}"><span>${l(n.label)}</span><span class="drawer-caret" aria-hidden="true"></span></button><div class="drawer-children" role="group">${p}</div></div>`}).join("");e.innerHTML=`<h2>PIKK Network</h2>${i}<a class="drawer-direct" href="#/updates">What's New · App Updates</a>`}function cs(e,t=!1){sp({drawer:document.getElementById("sideNav"),scrim:document.getElementById("scrim"),trigger:document.getElementById("menuBtn")},e,t)}function Bg(e){const t=e.path;ji(),oo(document.getElementById("tabbar"),t),document.querySelectorAll("#sideNav a").forEach(n=>{const o=n.getAttribute("href")||"";n.classList.toggle("on",o==="#"+t||o==="#"+e.raw)});const s="#"+t,a="#"+e.raw;document.querySelectorAll("#sideNav .drawer-group").forEach(n=>{const o=[...n.querySelectorAll("a")].some(d=>d.getAttribute("href")===s||d.getAttribute("href")===a);n.classList.toggle("open",o),n.classList.toggle("has-active",o);const r=n.querySelector(".drawer-cat");r&&r.setAttribute("aria-expanded",o?"true":"false")});const i=document.getElementById("headerMsg");if(i&&(i.hidden=!1),M().user)try{ui()}catch{}Mo()}function Mo(){const e=document.getElementById("headerMsgBadge"),t=document.getElementById("headerMsg");if(!e||!t)return;let s=0;try{s=tt()}catch{s=0}if(s>0){const a=s>99?"99+":String(s);e.textContent=a,e.hidden=!1,t.setAttribute("aria-label",`Messages, ${s} unread`)}else e.textContent="",e.hidden=!0,t.setAttribute("aria-label","Messages")}function Rg(e){var i;cs(!1);const t=document.getElementById("app"),s=Pg[e.path],a=s?s.render(e):Ig(e.path);t.innerHTML=a,ro(t),(i=s==null?void 0:s.bind)==null||i.call(s,t),Bg(e),tp(e,t,document.getElementById("pikkRouteAnnouncer")),zd(e.path),window.scrollTo(0,0),(e.path==="/music"||e.path==="/vault")&&(location.hash.includes("vault")||e.path==="/vault")&&setTimeout(()=>{var n;return(n=document.getElementById("vault"))==null?void 0:n.scrollIntoView({behavior:"smooth"})},50),e.path==="/pricing"&&(location.hash.includes("focus=sell")||location.hash.includes("creator-sell"))&&setTimeout(()=>{var n;return(n=document.getElementById("creator-sell"))==null?void 0:n.scrollIntoView({behavior:"smooth",block:"start"})},50),e.path==="/wallet"&&(e.elementId==="wallet-coins"||e.query.section==="coins"||location.hash.includes("wallet-coins"))&&setTimeout(()=>{var n;return(n=document.getElementById("wallet-coins"))==null?void 0:n.scrollIntoView({behavior:"smooth",block:"start"})},50),e.path==="/live"&&(e.query.go==="1"||e.elementId==="live-go"||location.hash.includes("go=1"))&&setTimeout(()=>{var n;return(n=document.getElementById("live-go"))==null?void 0:n.scrollIntoView({behavior:"smooth",block:"start"})},50)}function jg(){if(new URLSearchParams(location.search).has("holdSplash"))return;const e=document.getElementById("splash");!e||e.classList.contains("hide")||(e.classList.add("hide"),Jo(),setTimeout(()=>e.remove(),500))}function Fg(){const e=document.getElementById("splashChime");if(!e)return;const t=()=>{const a=e.play();a&&typeof a.catch=="function"&&a.catch(()=>{})};t();const s=()=>{t(),window.removeEventListener("pointerdown",s),window.removeEventListener("keydown",s)};window.addEventListener("pointerdown",s,{once:!0}),window.addEventListener("keydown",s,{once:!0})}function Kg(){window.addEventListener("dbs:interrupt-music",e=>{var s;const t=((s=e==null?void 0:e.detail)==null?void 0:s.reason)||"route";Ls(t)}),window.addEventListener("dbs:resume-music",e=>{var s;const t=(s=e==null?void 0:e.detail)==null?void 0:s.reason;t==="live"?so():t==="video"?Qe():to(t)})}function Gg(){window.addEventListener("dbs:messages-unread",()=>{try{qg()}catch{}})}function Vg(){var e;if((e=document.getElementById("pikkSkipContent"))==null||e.addEventListener("click",()=>{var t;(t=document.getElementById("app"))==null||t.focus()}),Hn(),ro(document),ji(),Ng(),Hd(),Kg(),Gg(),document.getElementById("menuBtn").addEventListener("click",()=>cs(!0)),document.getElementById("scrim").addEventListener("click",()=>cs(!1,!0)),document.addEventListener("keydown",t=>{var s;t.key!=="Escape"||!((s=document.getElementById("sideNav"))!=null&&s.classList.contains("open"))||(t.preventDefault(),cs(!1,!0))}),document.getElementById("sideNav").addEventListener("click",t=>{const s=t.target.closest(".drawer-cat");if(s){t.preventDefault();const a=s.closest(".drawer-group"),i=!a.classList.contains("open");document.querySelectorAll("#sideNav .drawer-group").forEach(n=>{const o=i&&n===a;n.classList.toggle("open",o);const r=n.querySelector(".drawer-cat");r&&r.setAttribute("aria-expanded",o?"true":"false")});return}t.target.closest("a")&&cs(!1)}),document.getElementById("notifBtn").addEventListener("click",()=>{location.hash="/notifications"}),Xd(Rg),Zd(),!Qo()&&!new URLSearchParams(location.search).has("holdSplash")){const t=document.getElementById("splash");t&&t.remove()}else{Fg();let t=!1;setTimeout(()=>{t||(t=!0,jg())},3e3)}}Vg();
