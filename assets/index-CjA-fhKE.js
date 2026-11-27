(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function s(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(a){if(a.ep)return;a.ep=!0;const r=s(a);fetch(a.href,r)}})();function Ln(e,t=Date.now()){const s=new URL(e);return s.searchParams.set("refresh",String(t)),s.toString()}var Mn;(Mn=document.getElementById("pikk-refresh-link"))==null||Mn.addEventListener("click",function(e){e.preventDefault(),window.location.assign(Ln(window.location.href))});const go={BASE_URL:"/pikk-app/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_BASE:"/pikk-app/",VITE_BUILD_SHA:"68e82409a20de28fe560bfed35950a24a0e64c9d"},Ns=Object.freeze([{name:"Block Wars",players:"1–2",icon:"🥊",theme:"fighters",artwork:"/games/approved/01_block_wars.jpg",description:"City-based fighters, combos and special moves.",href:"#/blockwars"},{name:"PIKK Playground",players:"1–8",icon:"🎈",theme:"playground",artwork:"/games/approved/02_pikk_playground.jpg",description:"Create your character, race, jump and explore with friends."},{name:"PIKK Clash",players:"1",icon:"💎",theme:"clash",artwork:"/games/approved/03_pikk_clash.jpg",description:"Original neighborhood-themed match puzzles and venue upgrades."},{name:"PIKK Knockout",players:"1",icon:"💥",theme:"knockout",artwork:"/games/approved/04_pikk_knockout.jpg",description:"Stylized physics challenges: launch, bounce and knock targets off moving platforms."},{name:"PIKK Bowling",players:"1–4",icon:"🎳",theme:"bowling",artwork:"/games/approved/05_pikk_bowling.jpg",description:"Compete for strikes, spares and high scores."},{name:"PIKK Pickleball",players:"2–4",icon:"🏓",theme:"pickleball",artwork:"/games/approved/06_pikk_pickleball.jpg",description:"Play singles or doubles on colorful courts."},{name:"PIKK Pool",players:"1–2",icon:"🎱",theme:"pool",artwork:"/games/approved/07_pikk_pool.jpg",description:"Play 8-ball pool against friends or the computer."},{name:"PIKK Cup Pong",players:"2–4",icon:"🥤",theme:"pong",artwork:"/games/approved/08_pikk_cup_pong.jpg",description:"Aim, throw and eliminate opponents’ cups."},{name:"PIKK Poker",players:"2–8",icon:"♠️",theme:"poker",artwork:"/games/approved/09_pikk_poker.jpg",description:"Social Texas Hold’em with nonredeemable Play Chips."},{name:"PIKK Blackjack",players:"1–5",icon:"🃏",theme:"blackjack",artwork:"/games/approved/10_pikk_blackjack.jpg",description:"Try for 21 against the dealer using Play Chips."},{name:"PIKK Slots",players:"1",icon:"🎰",theme:"slots",artwork:"/games/approved/11_pikk_slots.jpg",description:"Entertainment-only reels and virtual Play Chips."},{name:"PIKK Speed",players:"2",icon:"⚡",theme:"speed",artwork:"/games/approved/12_pikk_speed.jpg",description:"Race to play your cards before your opponent."},{name:"PIKK Spades",players:"4",icon:"♠",theme:"spades",artwork:"/games/approved/13_pikk_spades.jpg",description:"Partner strategy and card battles."},{name:"PIKK Dominoes",players:"2–4",icon:"🁢",theme:"dominoes",artwork:"/games/approved/14_pikk_dominoes.jpg",description:"Match tiles and outplay opponents."},{name:"PIKK Chess",players:"2",icon:"♟",theme:"chess",artwork:"/games/approved/15_pikk_chess.jpg",description:"Challenge opponents in a classic strategy game."}]);function Mi(e){return e!=null&&e.artwork?(go&&"/pikk-app/"||"/").replace(/\/?$/,"/")+String(e.artwork).replace(/^\/+/,""):""}let Ia;function h(e){const t=document.getElementById("toast");t&&(t.textContent=e,t.classList.add("show"),clearTimeout(Ia),Ia=setTimeout(()=>t.classList.remove("show"),2400))}function l(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function N(e){const t=Math.max(0,Math.floor((Date.now()-e)/1e3));if(t<60)return t+"s";const s=Math.floor(t/60);if(s<60)return s+"m";const i=Math.floor(s/60);return i<24?i+"h":Math.floor(i/24)+"d"}function M(e,t,s={}){let i="";if(s.badgeHtml)i=s.badgeHtml;else if(s.badge){const r=l(s.badge),o=s.badgeAria?` aria-label="${l(s.badgeAria)}"`:"",n=s.badgeTitle||s.badgeAria?` title="${l(s.badgeTitle||s.badgeAria)}"`:"";s.badgeHref?i=`<a class="badge-phase"${o}${n} href="${l(s.badgeHref)}">${r}</a>`:i=`<span class="badge-phase"${o}${n}>${r}</span>`}const a=s.lead?`<p class="lead">${s.lead}</p>`:"";return`
    <section class="page">
      <header class="page-head">
        <h1>${l(e)} ${i}</h1>
        ${a}
      </header>
      ${t}
    </section>
  `}const ns={heart:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.5c0 4.6-8.8 10.4-8.8 10.4S3.2 13.1 3.2 8.5a4.5 4.5 0 0 1 8.8-1.2 4.5 4.5 0 0 1 8.8 1.2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',home:'<svg viewBox="0 0 24 24"><path d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5z" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',posts:'<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 10h8M8 14h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',camera:'<svg viewBox="0 0 24 24"><path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h2.1l1.2-1.8A1.5 1.5 0 0 1 11 3.5h2a1.5 1.5 0 0 1 1.2.7L15.4 6h2.1A2.5 2.5 0 0 1 20 8.5v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-8z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="12.5" r="3.2" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',music:'<svg viewBox="0 0 24 24"><path d="M9 18V6l10-2v12" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="7" cy="18" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="16" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',merch:'<svg viewBox="0 0 24 24"><path d="M6 8h12l1 12H5L6 8zm3-3a3 3 0 0 1 6 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',explore:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m20 20-3.5-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',live:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" fill="currentColor"/><circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.2" opacity=".5"/></svg>',profile:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 19a7 7 0 0 1 14 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',videos:'<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10 9.5v5l5-2.5-5-2.5z" fill="currentColor"/></svg>',chat:'<svg viewBox="0 0 24 24"><path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v5A2.5 2.5 0 0 1 16.5 14H11l-3.5 3v-3H7.5A2.5 2.5 0 0 1 5 11.5v-5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 17.5V19a1 1 0 0 0 1.5.85L14 17h2.5" fill="none" stroke="currentColor" stroke-width="1.6" opacity=".55"/></svg>',msg:'<svg viewBox="0 0 24 24"><rect x="3.5" y="6" width="17" height="12" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m4.5 7.5 7.5 5.2L19.5 7.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',game:'<svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="11" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 13h2.5M9.25 11.5v3M15.2 12.2h.01M17.3 14.2h.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M9 8V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V8" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>'};function ut(e,t="rel=0"){const s=String(e||"").trim();if(!s)return"";const i=s.includes("?")?"&":"?";return`${s}${i}${t}`}const Bs=Object.freeze({videos:[{title:"Video Feed",href:"#/videos",detail:"Watch and discover videos",icon:"▶"},{title:"Shorts & Reels",href:"#/shorts",detail:"Browse short-form clips",icon:"▣"},{title:"Posts",href:"#/posts",detail:"View the community feed",icon:"▤"},{title:"Upload Video",href:"#/posts?type=video",detail:"Available prototype publishing tools · TEST MODE",icon:"⇧"}],connect:[{title:"Connect",href:"#/connect",detail:"Discover people and communities",icon:"♧"},{title:"PIKK Communities",href:"#/communities",detail:"Topic discussions, votes and replies · TEST MODE",icon:"#"},{title:"Communities",href:"#/community",detail:"Explore PIKK Lounge channel rooms",icon:"☷"},{title:"Messages",href:"#/messages",detail:"Open your messages",icon:"✉"},{title:"Random Chat",href:"#/connect#connect-random-chat",detail:"Preview only · real matching unavailable",icon:"◉"},{title:"Multistream",href:"#/connect#connect-multistream",detail:"Broadcast connection preview · TEST MODE",icon:"▹"}],dating:[{title:"Discover Dating",href:"#/dating",detail:"Explore dating features · TEST MODE",icon:"♡"},{title:"Messages",href:"#/messages",detail:"Open private messages",icon:"✉"},{title:"My Profile",href:"#/profile",detail:"Review your profile settings",icon:"◉"},{title:"Safety Guidelines",href:"#/guidelines",detail:"Review community safety rules",icon:"◇"}],games:[{title:"PIKK Arcade",href:"#/games",detail:"View the full game collection · preview",icon:"♜"},...Ns.map(e=>({title:e.name,...e.href?{href:e.href}:{},detail:e.href?"Fighting game · development preview":e.description+" · planned",icon:e.name==="Block Wars"?"▣":"♜"}))],shop:[{title:"PIKK Shop",href:"#/shop",detail:"Browse available products",icon:"▤"},{title:"Marketplace",href:"#/marketplace",detail:"Community listings · TEST MODE",icon:"◇"},{title:"Foreign X-Change",href:"#/merch",detail:"Official merchandise",icon:"✦"},{title:"Creator Pricing",href:"#/pricing",detail:"Explore creator selling information",icon:"$"}]}),fo=Object.freeze({"Video Feed":"videos","Shorts & Reels":"videos",Posts:"posts","Upload Video":"videos",Connect:"profile","PIKK Communities":"chat",Communities:"chat",Messages:"msg","Random Chat":"camera",Multistream:"live","Discover Dating":"heart","My Profile":"profile","Safety Guidelines":"heart","PIKK Arcade":"game","PIKK Speed":"game","PIKK Blackjack":"game","PIKK Slots":"game","PIKK Poker":"game","PIKK Spades":"game","PIKK Dominoes":"game","PIKK Chess":"game","PIKK Clash":"game","PIKK Knockout":"game","PIKK Playground":"game","PIKK Bowling":"game","PIKK Pickleball":"game","PIKK Pool":"game","PIKK Cup Pong":"game","Block Wars":"game","PIKK Shop":"merch",Marketplace:"merch","Foreign X-Change":"merch","Creator Pricing":"posts"}),In={videos:"pikkVideosMenu",connect:"pikkConnectMenu",dating:"pikkDatingMenu",games:"pikkGamesMenu",shop:"pikkShopMenu"};function nt(e=!1){for(const[t,s]of Object.entries(In)){const i=document.getElementById(s);if(!i||i.hidden)continue;i.hidden=!0;const a=document.querySelector(`#tabbar a[href="#/${t}"]`);a==null||a.setAttribute("aria-expanded","false"),e&&(a==null||a.focus())}}function vo(e,t){var n,d,c;if(!Object.hasOwn(Bs,e))return;const s=In[e];let i=document.getElementById(s);i||(i=document.createElement("div"),i.id=s,i.className="pikk-create-overlay",i.hidden=!0,i.innerHTML=`<div class="pikk-create-sheet" role="dialog" aria-modal="true" aria-labelledby="${s}Title">
      <div class="pikk-create-head"><strong id="${s}Title">${e[0].toUpperCase()+e.slice(1)} on PIKK</strong><button type="button" class="btn ghost" data-section-close aria-label="Close ${e} menu">✕</button></div>
      <div class="pikk-create-options pikk-create-grid">${Bs[e].map(p=>{const m=`<span class="pikk-menu-icon" aria-hidden="true">${ns[fo[p.title]||"explore"]}</span><strong class="pikk-menu-title">${p.title}</strong><small>${p.detail}</small>`;return p.href?`<a class="pikk-create-tile" href="${p.href}">${m}</a>`:`<div class="pikk-create-tile pikk-menu-planned" aria-disabled="true">${m}</div>`}).join("")}</div>
      <button type="button" class="pikk-menu-cancel" data-section-close>Cancel</button>
      <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · Production features are not enabled until secure services are available.</p>
    </div>`,document.body.appendChild(i),i.addEventListener("click",p=>{p.target===i||p.target.closest("[data-section-close]")?nt(!0):p.target.closest(".pikk-create-options a")&&nt()}),document.addEventListener("keydown",p=>{if(i.hidden)return;if(p.key==="Escape"){p.preventDefault(),nt(!0);return}if(p.key!=="Tab")return;const m=[...i.querySelectorAll("button:not([disabled]), a[href]")],g=m[0],f=m[m.length-1];if(!g){p.preventDefault();return}i.contains(document.activeElement)?p.shiftKey&&document.activeElement===g?(p.preventDefault(),f.focus()):!p.shiftKey&&document.activeElement===f&&(p.preventDefault(),g.focus()):(p.preventDefault(),(p.shiftKey?f:g).focus())}),window.addEventListener("hashchange",()=>nt()));const a=i.hidden;nt();const r=document.getElementById("pikkMusicMenu");r&&!r.hidden&&(r.hidden=!0,(n=document.querySelector('#tabbar a[href="#/music"]'))==null||n.setAttribute("aria-expanded","false"));const o=document.getElementById("pikkCreateMenu");o&&!o.hidden&&(o.hidden=!0,(d=document.querySelector('#tabbar a[href="#/create"]'))==null||d.setAttribute("aria-expanded","false")),i.hidden=!a,t==null||t.setAttribute("aria-expanded",String(a)),a?(c=i.querySelector("[data-section-close]"))==null||c.focus():t==null||t.focus()}const Pn=Object.freeze([{title:"Social & Community",items:[{title:"Create Post",href:"#/posts?type=text",detail:"Text post · TEST MODE",icon:"posts"},{title:"Community Post",href:"#/community",detail:"Open community · preview",icon:"chat"},{title:"Story",detail:"24-hour stories · Planned",icon:"camera"},{title:"Reels",href:"#/posts?type=short",detail:"Short video · TEST MODE",icon:"videos"},{title:"Photo Post",href:"#/posts?type=picture",detail:"Photos · TEST MODE",icon:"camera"},{title:"Create Poll",detail:"Interactive polls · Planned",icon:"posts"},{title:"Create Community",href:"#/community",detail:"Community area · preview",icon:"chat"},{title:"Create Chatroom",detail:"Room creation · Planned",icon:"msg"},{title:"Create Event",detail:"Events · Planned",icon:"explore"}]},{title:"Videos & Music",items:[{title:"Upload Video",href:"#/posts?type=video",detail:"Video upload · TEST MODE",icon:"videos"},{title:"Music Video",href:"#/posts?type=video",detail:"Video composer · TEST MODE",icon:"videos"},{title:"Short Video",href:"#/posts?type=short",detail:"Short composer · TEST MODE",icon:"videos"},{title:"Upload Song",detail:"Song publishing · Planned",icon:"music"},{title:"Upload Album",detail:"Album publishing · Planned",icon:"music"},{title:"Upload EP",detail:"EP publishing · Planned",icon:"music"},{title:"Upload Beats",detail:"Beat publishing · Planned",icon:"music"},{title:"Create Playlist",href:"#/music",detail:"Open music area · preview",icon:"music"},{title:"Add to Vault",href:"#/vault",detail:"Open Vault · preview",icon:"music"}]},{title:"Live & Commerce",items:[{title:"Go Live",href:"#/live?go=1",detail:"Livestream · TEST MODE",icon:"live"},{title:"Schedule Live",detail:"Live scheduling · Planned",icon:"live"},{title:"Live Battle",href:"#/giftbattles",detail:"Battle area · preview",icon:"live"},{title:"List Product",href:"#/marketplace",detail:"Marketplace · TEST MODE",icon:"merch"},{title:"Seller Store",detail:"Store creation · Planned",icon:"merch"},{title:"Paid Content",href:"#/pricing",detail:"Creator pricing · preview",icon:"merch"},{title:"Exclusive Content",detail:"Exclusive publishing · Planned",icon:"heart"}]},{title:"Creator Tools & Protection",items:[{title:"Creator Dashboard",href:"#/profile",detail:"Creator profile",icon:"profile"},{title:"Manage Content",href:"#/posts",detail:"Posts and content",icon:"posts"},{title:"Drafts",detail:"Draft management · Planned",icon:"posts"},{title:"Artist Protection",href:"#/shield",detail:"PIKK Shield local rights drafts · TEST MODE",icon:"music"},{title:"AI Support",detail:"Support assistant · Planned",icon:"chat"}]}]);Object.freeze(Pn.flatMap(e=>e.items));const ge=[{id:"dirty-money",title:"Dirty Money ft. Lil Baby",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=-rHDLWfiuDI",embed:"https://www.youtube.com/embed/-rHDLWfiuDI"},{id:"93",title:"93 ft. DaBaby",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=zC0BYFxs5W0",embed:"https://www.youtube.com/embed/zC0BYFxs5W0"},{id:"no-love",title:"No Love ft. YFN Lucci",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=6pCVEIE9pB8",embed:"https://www.youtube.com/embed/6pCVEIE9pB8"},{id:"bouquet",title:"Bouquet",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=DTe4OiX2otg",embed:"https://www.youtube.com/embed/DTe4OiX2otg"},{id:"where-im-from",title:"Where I'm From ft. Tee Grizzley",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=BH7_Ttk86eQ",embed:"https://www.youtube.com/embed/BH7_Ttk86eQ"},{id:"gang-ties",title:"Gang Ties",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=0ikbrk901Kc",embed:"https://www.youtube.com/embed/0ikbrk901Kc"},{id:"go-2-work",title:"Go 2 Work",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=gRq8c2i4ESM",embed:"https://www.youtube.com/embed/gRq8c2i4ESM"},{id:"ramen-noodles",title:"Ramen Noodles",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=YNCdtAC273M",embed:"https://www.youtube.com/embed/YNCdtAC273M"},{id:"men-in-blacc",title:"Men In Blacc",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=MKyw-hzxQWY",embed:"https://www.youtube.com/embed/MKyw-hzxQWY"},{id:"king-city",title:"King City",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=wyNJYUqpRFM",embed:"https://www.youtube.com/embed/wyNJYUqpRFM"},{id:"in-her-bag",title:"In Her Bag",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=Dux8rm-pzRg",embed:"https://www.youtube.com/embed/Dux8rm-pzRg"},{id:"lonely",title:"Lonely",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=IVnDjPJ8dRg",embed:"https://www.youtube.com/embed/IVnDjPJ8dRg"},{id:"they-aint-coming-home",title:"They Ain't Coming Home",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=Yi4uBFkn0-o",embed:"https://www.youtube.com/embed/Yi4uBFkn0-o"},{id:"mind-on-a-licc",title:"Mind On A Licc",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=sADinuRcRr4",embed:"https://www.youtube.com/embed/sADinuRcRr4"},{id:"dbs-mix",title:"DatBoiSkeet Mix",artist:"DatBoiSkeet",category:"Mixes",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t",embed:"https://www.youtube.com/embed/videoseries?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t",openLink:"https://www.youtube.com/playlist?list=RDEMDYIvPhQWVGU3Zf3gcxT_4w"},{id:"on-the-radar",title:"On The Radar Interview — Talk of The Town",artist:"DatBoiSkeet",category:"Interviews",youtube:"https://www.youtube.com/watch?v=6IFiHo5HrdE",embed:"https://www.youtube.com/embed/6IFiHo5HrdE"}],_n=[{id:"dbs-mix",title:"DatBoiSkeet Mix",blurb:"Official channel Music Videos playlist embed (stable). YouTube Radio Mix link kept as Play on YouTube — RD mixes often fail to embed.",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t",embed:"https://www.youtube.com/embed/videoseries?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t",openLink:"https://www.youtube.com/playlist?list=RDEMDYIvPhQWVGU3Zf3gcxT_4w",source:"channel-pl-music-videos + user-t96u openLink"}],Li=[{id:"pl-music-videos",title:"DatBoiSkeet Music Videos",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t"},{id:"pl-interviews",title:"DatBoiSkeet Interviews",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQHoRjRTD58TpLGqm0XMsa7U"},{id:"pl-vlogs",title:"DatBoiSkeet Vlogs",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQEqroQ8LYGLgpDfzK3pyutQ"}],bo=[{category:"Interviews",title:"Off The Porch (no verified DatBoiSkeet YouTube URL yet — add via Admin)"},{category:"Behind the Scenes",title:"BTS clips (coming soon)"},{category:"Exclusive Videos",title:"Vault / member exclusives (coming soon)"}],oe={youtube:"https://www.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA",youtubeHandle:"https://www.youtube.com/@DatBoiSkeet1",youtubeMusic:"https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA",spotify:"https://open.spotify.com/artist/0Po64h8VleQOR97okM68zh",apple:"https://music.apple.com/us/artist/datboiskeet/1270542870"},rt=[{id:"stream-dirty-money",title:"Dirty Money (feat. Lil Baby)",artist:"DatBoiSkeet",type:"single",year:2018,albumNote:"From Broke Is the Root of All Evil",cover:"https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2a/7a/67/2a7a676e-af85-489e-55fd-2bae2793948b/datboiskeet-bitroae-cover-3000px.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/track/17Pw88uBIWpgOVCfhEyszG",apple:"https://music.apple.com/us/song/dirty-money-feat-lil-baby/1395681218",youtubeMusic:"https://music.youtube.com/watch?v=-rHDLWfiuDI",youtube:"https://www.youtube.com/watch?v=-rHDLWfiuDI"}},{id:"stream-93",title:"93 (feat. DaBaby)",artist:"DatBoiSkeet",type:"single",year:2019,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/19/60/5f/19605f4c-7014-6dbc-ca18-baa2a672c697/194923194110.png/600x600bb.jpg",links:{spotify:"https://open.spotify.com/track/3gKwZybDOkUoz2wXquDHVZ",apple:"https://music.apple.com/us/album/93-feat-da-baby-single/1493456214",youtubeMusic:"https://music.youtube.com/watch?v=zC0BYFxs5W0",youtube:"https://www.youtube.com/watch?v=zC0BYFxs5W0"}},{id:"stream-no-love",title:"No Love (feat. YFN Lucci)",artist:"DatBoiSkeet",type:"single",year:2017,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/49/e5/62/49e56292-e427-3992-84bd-ead0b06fb06a/artwork.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/track/2KqnCXMM0lAMlEv1fDN63o",apple:"https://music.apple.com/us/album/no-love-feat-yfn-lucci-single/1317778810",youtubeMusic:"https://music.youtube.com/watch?v=6pCVEIE9pB8",youtube:"https://www.youtube.com/watch?v=6pCVEIE9pB8"}},{id:"stream-broke",title:"Broke Is the Root of All Evil",artist:"DatBoiSkeet",type:"album",year:2018,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2a/7a/67/2a7a676e-af85-489e-55fd-2bae2793948b/datboiskeet-bitroae-cover-3000px.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/album/51j6ReXYreCDV0ZwtPdj1Q",apple:"https://music.apple.com/us/album/broke-is-the-root-of-all-evil/1395680910",youtubeMusic:"https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA"}},{id:"stream-talk",title:"Talk of the Town",artist:"DatBoiSkeet",type:"album",year:2020,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/f6/0d/a0/f60da0bf-c3de-8b12-5cd8-e8c1d3c2053b/artwork.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/album/4OY5rM0TBPDsC4n8Dka4Gr",apple:"https://music.apple.com/us/album/talk-of-the-town/1541180619",youtubeMusic:"https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA"}},{id:"stream-said-you-love-me",title:"Said You Love Me",artist:"DatBoiSkeet",type:"single",year:2025,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/f4/4f/6b/f44f6b18-dff9-0486-e6e6-a615724e02fe/artwork.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/album/7FhoRIzhuGgmt2pZlWMc5c",apple:"https://music.apple.com/us/album/said-you-love-me-single/1835164001",youtubeMusic:"https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA"}}],rs=[{id:"long-story-short",title:"Long Story Short",artist:"DatBoiSkeet",cover:"/music/01_Long_Story_Short_Coming_Soon.jpg",status:"Coming Soon",order:1},{id:"ladies-only",title:"Ladies Only",artist:"DatBoiSkeet",cover:"/music/02_Ladies_Only_Coming_Soon.jpg",status:"Coming Soon",order:2}],yo=[{id:"vault-long-story-short",title:"Long Story Short (Vault Preview)",artist:"DatBoiSkeet",cover:"/music/01_Long_Story_Short_Coming_Soon.jpg",tier:"skeet+",status:"Coming Soon"},{id:"vault-ladies-only",title:"Ladies Only (Vault Exclusive)",artist:"DatBoiSkeet",cover:"/music/02_Ladies_Only_Coming_Soon.jpg",tier:"backstage",status:"Coming Soon"}],Pa=[{id:"long-story-short",title:"Long Story Short",artist:"DatBoiSkeet",cover:"/music/01_Long_Story_Short_Coming_Soon.jpg",price:1.29,status:"Coming Soon"},{id:"ladies-only",title:"Ladies Only",artist:"DatBoiSkeet",cover:"/music/02_Ladies_Only_Coming_Soon.jpg",price:1.29,status:"Coming Soon"}],Se=[{id:"hat-716-orange",name:"716 Buffalo Braves Snapback (Black/Orange)",price:30,category:"Hats",image:"/merch/01_black_orange_716_hat.jpeg",shopUrl:"https://foreignx-change.com"},{id:"hat-716-blue",name:"716 Buffalo Hat (Blue/Red)",price:30,category:"Hats",image:"/merch/02_blue_red_716_hat.jpeg",shopUrl:"https://foreignx-change.com"},{id:"jacket-blue",name:"Buffalo Sports Varsity Jacket (Blue/White)",price:200,category:"Jackets",image:"/merch/03_blue_buffalo_jacket.jpeg",shopUrl:"https://foreignx-change.com"},{id:"jacket-black",name:"Foreign X-Change Buffalo Varsity (Black/White)",price:200,category:"Jackets",image:"/merch/07_black_buffalo_jacket.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-fx-back",name:"Foreign X-Change Graphic Tee (Back)",price:65,category:"Shirts",image:"/merch/04_black_fx_tee_back_screenshot.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-fx-front",name:"Foreign X-Change Text Tee (Front)",price:65,category:"Shirts",image:"/merch/05_black_fx_tee_front_screenshot.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-ptsd",name:"PTSD Tee (Black)",price:65,category:"Shirts",image:"/merch/06_black_ptsd_tee.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-abstract",name:"Abstract FX Tee (White)",price:65,category:"Shirts",image:"/merch/08_white_abstract_fx_tee.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-dealer",name:"Support Your Local Dealer Tee (Navy)",price:65,category:"Shirts",image:"/merch/09_navy_dealer_tee.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-skulls",name:"Skulls FX Tee (White)",price:65,category:"Shirts",image:"/merch/10_white_skulls_tee.jpeg",shopUrl:"https://foreignx-change.com"}],Ls=[{id:"frame-chrome-crown",name:"Chrome Crown",category:"frames",rarity:"legendary",price:12.99,emoji:"👑"},{id:"frame-iced-out",name:"Iced Out",category:"frames",rarity:"epic",price:9.99,emoji:"💎"},{id:"frame-trap-flame",name:"Trap Flame",category:"frames",rarity:"epic",price:7.99,emoji:"🔥"},{id:"frame-rodeo-gold",name:"Rodeo Gold",category:"frames",rarity:"rare",price:5.99,emoji:"🤠"},{id:"frame-rose-petals",name:"Rose Petals",category:"frames",rarity:"rare",price:4.99,emoji:"🌹"},{id:"fx-bass-pulse",name:"Bass Pulse",category:"effects",rarity:"epic",price:8.99,emoji:"🎵"},{id:"fx-snowfall",name:"Snowfall",category:"effects",rarity:"rare",price:5.99,emoji:"❄️"},{id:"fx-city-lights",name:"City Lights",category:"effects",rarity:"epic",price:7.99,emoji:"🌃"},{id:"fx-holo-glitch",name:"Holographic Glitch",category:"effects",rarity:"legendary",price:14.99,emoji:"✨"},{id:"ban-skyline",name:"City Skyline",category:"banners",rarity:"rare",price:4.99,emoji:"🏙️"},{id:"ban-studio",name:"Studio Booth",category:"banners",rarity:"rare",price:4.99,emoji:"🎙️"},{id:"ban-arena",name:"Arena Lights",category:"banners",rarity:"epic",price:6.99,emoji:"🏟️"},{id:"ban-chrome",name:"Luxury Chrome",category:"banners",rarity:"legendary",price:11.99,emoji:"🪞"},{id:"name-chrome",name:"Chrome Name",category:"name styles",rarity:"epic",price:6.99,emoji:"🅰️"},{id:"name-neon",name:"Neon Name",category:"name styles",rarity:"rare",price:3.99,emoji:"💜"},{id:"name-varsity",name:"Bold Varsity",category:"name styles",rarity:"rare",price:3.99,emoji:"🏟️"},{id:"name-western",name:"Western Script",category:"name styles",rarity:"epic",price:5.99,emoji:"🏜️"},{id:"badge-dayone",name:"Day One (cosmetic style)",category:"badges",rarity:"rare",price:2.99,emoji:"1️⃣"},{id:"badge-topfan",name:"Top Fan (cosmetic style)",category:"badges",rarity:"epic",price:4.99,emoji:"⭐"},{id:"badge-backstage",name:"Backstage Glow",category:"badges",rarity:"epic",price:5.99,emoji:"🎫"}],ko=[{id:"all",label:"All"},{id:"frames",label:"Frames"},{id:"effects",label:"Effects"},{id:"banners",label:"Banners"},{id:"name styles",label:"Name styles"},{id:"badges",label:"Badges"}],qn=[{id:"skeet",name:"Skeet+",price:3.99,blurb:"Early DatBoiSkeet releases · basic Vault"},{id:"backstage",name:"Backstage",price:7.99,blurb:"Deeper Vault · studio lives · listening rooms"},{id:"inner",name:"Inner Circle",price:14.99,blurb:"VIP drops · private Q&As · Inner Circle rooms"}],wo=[{label:"Long Story Short",src:"/music/01_Long_Story_Short_Coming_Soon.jpg"},{label:"Ladies Only",src:"/music/02_Ladies_Only_Coming_Soon.jpg"},{label:"716 Orange Hat",src:"/merch/01_black_orange_716_hat.jpeg"},{label:"716 Blue Hat",src:"/merch/02_blue_red_716_hat.jpeg"},{label:"Blue Jacket",src:"/merch/03_blue_buffalo_jacket.jpeg"},{label:"PTSD Tee",src:"/merch/06_black_ptsd_tee.jpeg"}],On=[{id:"home",label:"Home",href:"#/home"},{id:"explore",label:"Explore",href:"#/explore"},{id:"profile",label:"Profile / Sign in",href:"#/profile"},{id:"watch",label:"Watch",links:[{href:"#/videos",label:"Videos"},{href:"#/live",label:"Live"},{href:"#/openmic",label:"Open Mic / Talent Discovery (24/7)"},{href:"#/spotlight",label:"Spotlight (24/7)"},{href:"#/multiguest",label:"Multi-Guest Live"}]},{id:"music",label:"Music",links:[{href:"#/music",label:"Music & Vault"}]},{id:"social",label:"Social",links:[{href:"#/posts",label:"Posts"},{href:"#/posts?compose=1",label:"Post · Text / Picture / Short / Video"},{href:"#/shorts",label:"Shorts (in Posts)"},{href:"#/notifications",label:"Notifications"},{href:"#/connect",label:"Connect"},{href:"#/dating",label:"Dating & Connections"},{href:"#/community",label:"Community / Lounge"}]},{id:"messages",label:"Messages",href:"#/messages"},{id:"games",label:"Games",links:[{href:"#/games",label:"PIKK Arcade · 15 Games Coming Soon"},{href:"#/blockwars",label:"Block Wars · Coming Soon"}]},{id:"shop",label:"Shop",links:[{href:"#/merch",label:"Foreign X-Change Merch"},{href:"#/marketplace",label:"Marketplace"},{href:"#/shop",label:"PIKK Shop"},{href:"#/profile-shop",label:"Profile Shop · cosmetics"}]},{id:"earn",label:"Creators & Earnings",links:[{href:"#/wallet",label:"Wallet"},{href:"#/earnings",label:"Creator Earnings"},{href:"#/missions",label:"Missions"},{href:"#/clippers",label:"Clippers Apply"},{href:"#/share",label:"Share & Earn"},{href:"#/refer",label:"Refer & Earn"},{href:"#/pricing",label:"Pricing (rules & fees)"}]},{id:"account",label:"Account",links:[{href:"#/profile",label:"Profile"},{href:"#/signup",label:"Signup / Creator Apps"},{href:"#/loyalty",label:"Loyalty Club"},{href:"#/fanclubs",label:"Fan Clubs"},{href:"#/guidelines",label:"Community Guidelines"}]},{id:"studio",label:"Studio / Owner",links:[{href:"#/admin",label:"Admin"},{href:"#/phases",label:"Development Phases"},{href:"#/launch",label:"Launch Readiness"}]}];On.flatMap(e=>e.href?[{href:e.href,label:e.label}]:e.links||[]);const So=[{href:"#/music",label:"Music",icon:"music"},{href:"#/videos",label:"Videos",icon:"videos"},{href:"#/connect",label:"Connect",icon:"profile"},{href:"#/create",label:"Create",icon:"live",primary:!0},{href:"#/dating",label:"Dating",icon:"heart"},{href:"#/games",label:"Games",icon:"game"},{href:"#/shop",label:"Shop",icon:"merch"}],Nn="dbs_v1",ts=()=>({user:null,profiles:{dbs:{id:"dbs",username:"DatBoiSkeet",bio:"Official DatBoiSkeet · Long Story Short & Ladies Only Coming Soon · Vault · Foreign X-Change",avatar:"/brand/logo-dbs-v3@2x.webp",followers:[],following:[],verified:!0}},posts:[],comments:{},likes:{},clipperApps:[],creatorSellApps:[],brandApps:[],listings:[],live:null,liveHistory:[],liveSongRequests:[],coins:{balance:0,history:[]},liveGiftLedger:[],liveGbChallengePop:null,threads:{},demoUnreadSeeded:!1,messagePrefs:{allowDMs:!0,allowRequests:!0},notifications:{releases:!0,lives:!0,messages:!0,quietHours:!1},wallet:{balance:0,history:[]},creatorWallet:{available:0,holds:0,threshold:25,verification:"demo_unverified",earnings:[],payouts:[]},catalog:[],missions:[],giftBattles:{active:null,history:[],champions:[],prefs:{invitationsEnabled:!0}},multiGuest:{active:null,history:[]},spotlight:{nowPlaying:null,queue:[],history:[],houseIndex:0},fanClubs:{clubs:[],posts:{},seeded:!1},shareEarn:{platformsLinked:[],challenge:null,submissions:[],rewardsClaimed:[]},referEarn:{code:"",invitees:[],milestonesClaimed:[]},restream:{platforms:{},selected:[],session:null,history:[],ingest:null,campaign:{tier:null,status:"none",enrolledAt:null,cancelledAt:null},campaignConfig:null},loyalty:{points:0,history:[],badges:[],publicVisible:!0,lastActionAt:{},dayCounts:{}},openMic:{applications:[],seeded:!1,houseIndex:0},profileShop:{owned:[],equipped:{},reduceMotion:!1},hotFeed:{lives:[],posts:[],seededLives:!1,seededPosts:!1,seededPostsVer:0},engagementAlerts:[],postShares:{},splashSeenAt:0,dailyGoals:{app:null,liveByHost:{},history:[]}});function $o(){var e,t,s,i,a,r,o,n,d,c,p,m,g,f,b,y,v,w,$,A,k,L,C,O,E,se,T,_,V,j,Ce,Te,ne,be,Ne,X,Ge,Ot,Nt,Bt,Rt,jt,Ft,Kt,Gt,Z,we,Be,Ta,Da,Ma;try{const La=localStorage.getItem(Nn);if(!La)return ts();const S=JSON.parse(La),W=ts();return{...W,...S,profiles:{...W.profiles,...S.profiles||{}},notifications:{...W.notifications,...S.notifications||{}},wallet:{...W.wallet,...S.wallet||{}},creatorWallet:{...W.creatorWallet,...S.creatorWallet||{},earnings:Array.isArray((e=S.creatorWallet)==null?void 0:e.earnings)?S.creatorWallet.earnings:[],payouts:Array.isArray((t=S.creatorWallet)==null?void 0:t.payouts)?S.creatorWallet.payouts:[],available:Number((s=S.creatorWallet)==null?void 0:s.available)||0,holds:Number((i=S.creatorWallet)==null?void 0:i.holds)||0,threshold:Number((a=S.creatorWallet)==null?void 0:a.threshold)>0?Number(S.creatorWallet.threshold):25,verification:((r=S.creatorWallet)==null?void 0:r.verification)==="demo_verified"?"demo_verified":"demo_unverified"},brandApps:S.brandApps||[],listings:Array.isArray(S.listings)?S.listings:[],live:S.live??null,liveHistory:Array.isArray(S.liveHistory)?S.liveHistory:[],liveSongRequests:Array.isArray(S.liveSongRequests)?S.liveSongRequests:[],coins:{balance:Number((o=S.coins)==null?void 0:o.balance)||0,history:Array.isArray((n=S.coins)==null?void 0:n.history)?S.coins.history:[]},liveGiftLedger:Array.isArray(S.liveGiftLedger)?S.liveGiftLedger:[],liveGbChallengePop:S.liveGbChallengePop||null,threads:{...S.threads||{}},demoUnreadSeeded:!!S.demoUnreadSeeded,messagePrefs:{...W.messagePrefs,...S.messagePrefs||{}},catalog:Array.isArray(S.catalog)?S.catalog:[],missions:Array.isArray(S.missions)?S.missions:[],giftBattles:{...W.giftBattles,...S.giftBattles||{},history:Array.isArray((d=S.giftBattles)==null?void 0:d.history)?S.giftBattles.history:[],champions:Array.isArray((c=S.giftBattles)==null?void 0:c.champions)?S.giftBattles.champions:[],prefs:{...W.giftBattles.prefs,...((p=S.giftBattles)==null?void 0:p.prefs)||{}},active:((m=S.giftBattles)==null?void 0:m.active)??null},multiGuest:{...W.multiGuest,...S.multiGuest||{},history:Array.isArray((g=S.multiGuest)==null?void 0:g.history)?S.multiGuest.history:[],active:((f=S.multiGuest)==null?void 0:f.active)??null},fanClubs:{...W.fanClubs,...S.fanClubs||{},clubs:Array.isArray((b=S.fanClubs)==null?void 0:b.clubs)?S.fanClubs.clubs:[],posts:(y=S.fanClubs)!=null&&y.posts&&typeof S.fanClubs.posts=="object"?S.fanClubs.posts:{},seeded:!!((v=S.fanClubs)!=null&&v.seeded)},shareEarn:{...W.shareEarn,...S.shareEarn||{},platformsLinked:Array.isArray((w=S.shareEarn)==null?void 0:w.platformsLinked)?S.shareEarn.platformsLinked:[],challenge:(($=S.shareEarn)==null?void 0:$.challenge)??null,submissions:Array.isArray((A=S.shareEarn)==null?void 0:A.submissions)?S.shareEarn.submissions:[],rewardsClaimed:Array.isArray((k=S.shareEarn)==null?void 0:k.rewardsClaimed)?S.shareEarn.rewardsClaimed:[]},referEarn:{...W.referEarn,...S.referEarn||{},code:typeof((L=S.referEarn)==null?void 0:L.code)=="string"?S.referEarn.code:"",invitees:Array.isArray((C=S.referEarn)==null?void 0:C.invitees)?S.referEarn.invitees:[],milestonesClaimed:Array.isArray((O=S.referEarn)==null?void 0:O.milestonesClaimed)?S.referEarn.milestonesClaimed:[]},restream:{...W.restream,...S.restream||{},platforms:(E=S.restream)!=null&&E.platforms&&typeof S.restream.platforms=="object"?S.restream.platforms:{},selected:Array.isArray((se=S.restream)==null?void 0:se.selected)?S.restream.selected:[],session:((T=S.restream)==null?void 0:T.session)??null,history:Array.isArray((_=S.restream)==null?void 0:_.history)?S.restream.history:[],ingest:((V=S.restream)==null?void 0:V.ingest)??null,campaign:{...W.restream.campaign,...((j=S.restream)==null?void 0:j.campaign)||{}},campaignConfig:((Ce=S.restream)==null?void 0:Ce.campaignConfig)??null},loyalty:{...W.loyalty,...S.loyalty||{},points:Number((Te=S.loyalty)==null?void 0:Te.points)||0,history:Array.isArray((ne=S.loyalty)==null?void 0:ne.history)?S.loyalty.history:[],badges:Array.isArray((be=S.loyalty)==null?void 0:be.badges)?S.loyalty.badges:[],publicVisible:((Ne=S.loyalty)==null?void 0:Ne.publicVisible)===void 0?!0:!!S.loyalty.publicVisible,lastActionAt:(X=S.loyalty)!=null&&X.lastActionAt&&typeof S.loyalty.lastActionAt=="object"?S.loyalty.lastActionAt:{},dayCounts:(Ge=S.loyalty)!=null&&Ge.dayCounts&&typeof S.loyalty.dayCounts=="object"?S.loyalty.dayCounts:{}},openMic:{...W.openMic,...S.openMic||{},applications:Array.isArray((Ot=S.openMic)==null?void 0:Ot.applications)?S.openMic.applications:[],seeded:!!((Nt=S.openMic)!=null&&Nt.seeded),houseIndex:typeof((Bt=S.openMic)==null?void 0:Bt.houseIndex)=="number"?S.openMic.houseIndex:0},profileShop:{...W.profileShop,...S.profileShop||{},owned:Array.isArray((Rt=S.profileShop)==null?void 0:Rt.owned)?S.profileShop.owned:[],equipped:(jt=S.profileShop)!=null&&jt.equipped&&typeof S.profileShop.equipped=="object"?S.profileShop.equipped:{},reduceMotion:!!((Ft=S.profileShop)!=null&&Ft.reduceMotion)},hotFeed:{...W.hotFeed,...S.hotFeed||{},lives:Array.isArray((Kt=S.hotFeed)==null?void 0:Kt.lives)?S.hotFeed.lives:[],posts:Array.isArray((Gt=S.hotFeed)==null?void 0:Gt.posts)?S.hotFeed.posts:[],seededLives:!!((Z=S.hotFeed)!=null&&Z.seededLives),seededPosts:!!((we=S.hotFeed)!=null&&we.seededPosts),seededPostsVer:Number((Be=S.hotFeed)==null?void 0:Be.seededPostsVer)||0},engagementAlerts:Array.isArray(S.engagementAlerts)?S.engagementAlerts:[],postShares:S.postShares&&typeof S.postShares=="object"?S.postShares:{},creatorSellApps:Array.isArray(S.creatorSellApps)?S.creatorSellApps:[],dailyGoals:{...W.dailyGoals,...S.dailyGoals||{},app:((Ta=S.dailyGoals)==null?void 0:Ta.app)??null,liveByHost:(Da=S.dailyGoals)!=null&&Da.liveByHost&&typeof S.dailyGoals.liveByHost=="object"?S.dailyGoals.liveByHost:{},history:Array.isArray((Ma=S.dailyGoals)==null?void 0:Ma.history)?S.dailyGoals.history:[]}}}catch{return ts()}}function x(e){localStorage.setItem(Nn,JSON.stringify(e))}let u=$o();function D(){return u}function _a(e){return u={...u,...e},x(u),u}function xo(e){return u=e(u)||u,x(u),u}function Je(e){e&&(u={...u,profiles:{...u.profiles,[e.id]:{id:e.id,username:e.username,bio:e.bio||"",avatar:e.avatar||"",followers:e.followers||[],following:e.following||[],memberships:e.memberships||{},verified:!!e.verified}}})}function dt(e){return e?u.user&&u.user.id===e?u.user:u.profiles[e]||null:null}function qa(e){const t=dt(e);return t?(t.followers||[]).map(s=>dt(s)||{id:s,username:s}).filter(Boolean):[]}function Ii(e){const t=dt(e);return t?(t.following||[]).map(s=>dt(s)||{id:s,username:s}).filter(Boolean):[]}function Bn(){if(u.posts.length)return;const e=[{id:"p1",userId:"dbs",username:"DatBoiSkeet",text:"Long Story Short — cover is up. Coming Soon on DBS Music. Stay ready.",image:"/music/01_Long_Story_Short_Coming_Soon.jpg",at:Date.now()-864e5*2},{id:"p2",userId:"dbs",username:"DatBoiSkeet",text:"Foreign X-Change — hats, tees & jackets. Checkout on ForeignX-Change.com (not inside DBS).",image:"/merch/01_black_orange_716_hat.jpeg",at:Date.now()-864e5},{id:"p3",userId:"dbs",username:"DatBoiSkeet",text:"Ladies Only — cover art live. Official playback unlocks when the single drops.",image:"/music/02_Ladies_Only_Coming_Soon.jpg",at:Date.now()-864e5*3},{id:"p4",userId:"dbs",username:"DatBoiSkeet",text:"716 Buffalo Braves snapback on Foreign X-Change — shop the external store.",image:"/merch/02_blue_red_716_hat.jpeg",at:Date.now()-864e5*4}];u={...u,posts:e,likes:{p1:[],p2:[],p3:[],p4:[]},comments:{p1:[],p2:[],p3:[],p4:[]}},x(u)}function Tt(e){const t=(e||"Fan").trim().slice(0,24)||"Fan",s="u_"+t.toLowerCase().replace(/\W+/g,"_")+"_"+Date.now().toString(36),i={id:s,username:t,bio:"DBS fan · local demo account (TEST MODE)",avatar:"",followers:[],following:["dbs"],membership:null,memberships:{skeetPlus:!1,backstage:!1,innerCircle:!1},purchasedTracks:[],createdAt:Date.now()},a=u.profiles.dbs||ts().profiles.dbs,r=new Set(a.followers||[]);return r.add(s),u={...u,user:i,profiles:{...u.profiles,dbs:{...a,followers:[...r]}}},Je(i),x(u),i}function Eo(){u={...u,user:null},x(u)}function Ao({bio:e,avatar:t,username:s}){const i=u.user;if(!i)return{error:"signin"};const a={...i,bio:e!==void 0?String(e).slice(0,280):i.bio,avatar:t!==void 0?String(t).trim():i.avatar,username:s!==void 0&&String(s).trim().slice(0,24)||i.username};return u={...u,user:a},Je(a),x(u),a}function Js(e,t=!0){const s=u.user;if(!s)return{error:"signin"};let i=s.membership??null;const a=c=>c==="skeet"||c==="skeetPlus"||c==="skeet+"?"skeet+":c==="backstage"?"backstage":c==="inner"||c==="innerCircle"?"inner":null,r={null:0,"skeet+":1,backstage:2,inner:3},o=a(e);t?o&&(i=o):i=null;const n={skeetPlus:r[i||"null"]>=1,backstage:r[i||"null"]>=2,innerCircle:r[i||"null"]>=3},d={...s,membership:i,memberships:n};return u={...u,user:d},Je(d),x(u),d}function mt(){const e=u.user;if(!e)return null;if(e.membership)return e.membership;const t=e.memberships||{};return t.innerCircle?"inner":t.backstage?"backstage":t.skeetPlus?"skeet+":null}function Pi(e="skeet"){const t=mt(),s={null:0,"skeet+":1,backstage:2,inner:3},i=e==="backstage"?2:e==="inner"?3:1;return(s[t||"null"]||0)>=i}function Co(e){const t=u.user;if(!t)return{error:"signin"};const s=new Set(t.purchasedTracks||[]);s.add(e);const i={...t,purchasedTracks:[...s]};return u={...u,user:i},Je(i),x(u),i}function Oa({text:e,image:t,mediaType:s,mediaUrl:i}){const a=u.user;if(!a)throw new Error("Sign in required");const r="p_"+Date.now().toString(36),o=["picture","short","video","image","text"].includes(s)?s==="image"?"picture":s:t?"picture":"text",n={id:r,userId:a.id,username:a.username,text:(e||"").trim(),image:(t||"").trim(),mediaType:o==="text"&&!(t||"").trim()?"text":o,mediaUrl:(i||"").trim(),at:Date.now()};return u={...u,posts:[n,...u.posts],likes:{...u.likes,[r]:[]},comments:{...u.comments,[r]:[]}},x(u),n}function To(e){const t=u.user;if(!t)return{error:"signin"};const s=new Set(u.likes[e]||[]);s.has(t.id)?s.delete(t.id):s.add(t.id),u={...u,likes:{...u.likes,[e]:[...s]}},x(u);try{Ie()}catch{}return{count:s.size,liked:s.has(t.id)}}function Do(e,t){const s=u.user;if(!s)return{error:"signin"};const i={id:"c_"+Date.now().toString(36),userId:s.id,username:s.username,text:t.trim(),at:Date.now()},a=u.comments[e]||[];u={...u,comments:{...u.comments,[e]:[...a,i]}},x(u);try{Ie()}catch{}return i}function Qs(e){const t=u.user;if(!t)return{error:"signin"};if(e===t.id)return{error:"self"};if(t.following.includes(e))return t;const s={...t,following:[...t.following,e]},i={...u.profiles},a=i[e]||dt(e);if(a){const r=new Set(a.followers||[]);r.add(t.id),i[e]={...a,followers:[...r]}}return u={...u,user:s,profiles:i},Je(s),x(u),s}function Xs(e){const t=u.user;if(!t)return{error:"signin"};const s={...t,following:(t.following||[]).filter(r=>r!==e)},i={...u.profiles},a=i[e]||dt(e);return a&&(i[e]={...a,followers:(a.followers||[]).filter(r=>r!==t.id)}),u={...u,user:s,profiles:i},Je(s),x(u),s}function Mo(e){const t={id:"clip_"+Date.now().toString(36),...e,status:"pending",at:Date.now()};return u={...u,clipperApps:[t,...u.clipperApps]},x(u),t}function Lo(e){const t=e||{},s=String(t.name||"").trim().slice(0,80),i=String(t.contact||t.email||t.handle||"").trim().slice(0,120),a=String(t.sells||"both").trim().slice(0,40),r=!!t.agreed;if(!s||!i)return{error:"missing"};if(!r)return{error:"rules"};const o={id:"csa_"+Date.now().toString(36),name:s,contact:i,sells:["music","merch","both"].includes(a)?a:"both",agreed:!0,status:"pending",at:Date.now()},n=[o,...u.creatorSellApps||[]].slice(0,40);return u={...u,creatorSellApps:n},x(u),{ok:!0,app:o}}function Rn(e,t){if(!["pending","approved","rejected","waitlisted"].includes(t))return{error:"bad_status"};const i=u.clipperApps.map(a=>a.id===e?{...a,status:t,reviewedAt:Date.now()}:a);return u={...u,clipperApps:i},x(u),i.find(a=>a.id===e)}function gi(e){u={...u,notifications:{...u.notifications,...e}},x(u)}function Io(){u={...u,splashSeenAt:Date.now()},x(u)}function Po(){return!u.splashSeenAt}function H(){return!!(u.user&&u.user.role==="admin")}function hs(e=!0){const t=u.user;if(!t)return{error:"signin"};const s={...t,role:e?"admin":"fan"};return u={...u,user:s},Je(s),x(u),s}function jn(){var n;const e=u.posts||[],t=u.clipperApps||[],s={pending:0,approved:0,rejected:0,waitlisted:0};t.forEach(d=>{const c=d.status||"pending";s[c]!==void 0?s[c]+=1:s.pending+=1});let i=0;Object.values(u.likes||{}).forEach(d=>{i+=(d||[]).length});let a=0;Object.values(u.comments||{}).forEach(d=>{a+=(d||[]).length});let r=0;u.user&&(u.user.membership||(n=u.user.memberships)!=null&&n.skeetPlus)&&(r+=1),Object.values(u.profiles||{}).forEach(d=>{var c,p;d.id!==((c=u.user)==null?void 0:c.id)&&(d.membership||(p=d.memberships)!=null&&p.skeetPlus)&&(r+=1)});const o=u.catalog||[];return{posts:e.length,likes:i,comments:a,clippers:t.length,clipperByStatus:s,members:r,profiles:Object.keys(u.profiles||{}).length,catalogTotal:o.length,catalogPublished:o.filter(d=>d.published).length}}function Fn(e){const t=["spotify","apple","youtubeMusic","youtube","tidal","amazon"],s={};if(!e||typeof e!="object")return s;for(const i of t){const a=String(e[i]||"").trim();(a.startsWith("http://")||a.startsWith("https://"))&&(s[i]=a.slice(0,500))}return s}function Zs({publishedOnly:e=!1,types:t=null,includeUnpublishedForAdmin:s=!1}={}){let i=u.catalog||[];if(e?i=i.filter(a=>a.published):s||(i=i.filter(a=>a.published)),t&&t.length){const a=new Set(t);i=i.filter(r=>a.has(r.type))}return[...i].sort((a,r)=>(r.createdAt||0)-(a.createdAt||0))}function _o(e){var i;if(!H())return{error:"forbidden"};const s={id:e.id||"cat_"+Date.now().toString(36),type:e.type,title:String(e.title||"").trim().slice(0,120),artist:String(e.artist).trim().slice(0,80),coverRef:e.coverRef||"",mediaRef:e.mediaRef||"",youtube:String(e.youtube||"").trim(),embed:String(e.embed||"").trim(),streamingLinks:Fn(e.streamingLinks),published:!!e.published,createdAt:Date.now(),updatedAt:Date.now(),createdBy:((i=u.user)==null?void 0:i.id)||null};return s.title?["song","album","video","picture"].includes(s.type)?(u={...u,catalog:[s,...u.catalog||[]]},x(u),s):{error:"type"}:{error:"title"}}function Kn(e,t){if(!H())return{error:"forbidden"};let s=null;const i=(u.catalog||[]).map(a=>{if(a.id!==e)return a;const r={...a,...t,id:a.id,updatedAt:Date.now()};return t&&Object.prototype.hasOwnProperty.call(t,"streamingLinks")&&(r.streamingLinks=Fn(t.streamingLinks)),s=r,s});return s?(u={...u,catalog:i},x(u),s):{error:"missing"}}function qo(e,t){return Kn(e,{published:!!t})}function Oo(e){if(!H())return{error:"forbidden"};const t=(u.catalog||[]).filter(s=>s.id!==e);return u={...u,catalog:t},x(u),!0}function Na(e){const t=u.user;if(!t)return{error:"signin"};if(u.live&&!u.live.endedAt)return{error:"already_live",live:u.live};const s={id:"live_"+Date.now().toString(36),hostId:t.id,hostName:t.username,title:(e||"DBS Live · TEST MODE").trim().slice(0,80),startedAt:Date.now(),viewers:3+Math.floor(Math.random()*18),giftsTotal:0,tipsTotal:0,giftLog:[],chat:[{id:"sys1",userId:"system",username:"DBS",text:"Welcome · Follow DatBoiSkeet · TEST MODE (no real stream)",at:Date.now()}],endedAt:null};return u={...u,live:s},x(u),s}function No(){if(!u.live||u.live.endedAt)return u.live;const e={...u.live,endedAt:Date.now()},t=[e,...u.liveHistory||[]].slice(0,20);return u={...u,live:e,liveHistory:t},x(u),e}function Bo(){if(!u.live||u.live.endedAt)return u.live;const e=Math.floor(Math.random()*5)-1,t=Math.max(1,(u.live.viewers||1)+e),s={...u.live,viewers:t};return u={...u,live:s},x(u),s}function Ro(e){const t=u.user;if(!t)return{error:"signin"};if(!u.live||u.live.endedAt)return{error:"offline"};const s={id:"lc_"+Date.now().toString(36),userId:t.id,username:t.username,text:String(e||"").trim().slice(0,280),at:Date.now()};if(!s.text)return{error:"empty"};const i={...u.live,chat:[...u.live.chat||[],s]};return u={...u,live:i},x(u),s}function Gn({kind:e="tip",amount:t=1,label:s=""}={}){var m;const i=u.user;if(!i)return{error:"signin"};if(!u.live||u.live.endedAt)return{error:"offline"};const a=Math.max(.5,Number(t)||1),r=e==="gift"?"gift":"tip",o=((m=u.wallet)==null?void 0:m.balance)||0;let n=u.wallet||{balance:0,history:[]};o>=a&&(n={balance:+(o-a).toFixed(2),history:[...n.history||[],{at:Date.now(),amount:-a,note:`Live ${r} · ${u.live.title}`}]});const d={id:"lg_"+Date.now().toString(36),userId:i.id,username:i.username,kind:r,amount:a,label:(s||(r==="gift"?"🔥 Fire":"Tip")).slice(0,40),at:Date.now()},c={id:"lc_"+Date.now().toString(36)+"g",userId:i.id,username:i.username,text:r==="gift"?`sent ${d.label} ($${a.toFixed(2)}) · TEST MODE`:`tipped $${a.toFixed(2)} · TEST MODE`,at:Date.now(),support:!0},p={...u.live,giftsTotal:(u.live.giftsTotal||0)+(r==="gift"?a:0),tipsTotal:(u.live.tipsTotal||0)+(r==="tip"?a:0),giftLog:[...u.live.giftLog||[],d],chat:[...u.live.chat||[],c]};return u={...u,live:p,wallet:n},x(u),o>=a&&sa({category:r==="gift"?"gifts":"tips",gross:a,note:`Live ${r} from @${i.username} · ${u.live.title}`,source:"live"}),{live:p,entry:d,wallet:u.wallet,creatorWallet:u.creatorWallet}}function jo(){return u.liveHistory||[]}const Un=[{pack:1,price:10,label:"1 song",save:0},{pack:2,price:25,label:"2 songs",save:0},{pack:3,price:45,label:"3 songs",save:5}];function ss(){return Array.isArray(u.liveSongRequests)?u.liveSongRequests:[]}function Fo(e){var s;const t=e||((s=u.live)==null?void 0:s.id);return t?ss().filter(i=>i.liveId===t):[]}function Wi(e){const t=[];for(const s of Fo(e))(s.titles||[]).forEach((i,a)=>{t.push({requestId:s.id,songIndex:a,title:i,status:s.songStatuses&&s.songStatuses[a]||"queued",username:s.username,userId:s.userId,pack:s.pack,price:s.price,at:s.at})});return t}function Ko({pack:e,titles:t}={}){var p;const s=u.user;if(!s)return{error:"signin"};if(!u.live||u.live.endedAt)return{error:"offline"};const i=Un.find(m=>m.pack===Number(e));if(!i)return{error:"bad_pack"};const a=(Array.isArray(t)?t:[]).map(m=>String(m||"").trim().slice(0,80)).filter(Boolean);if(a.length!==i.pack)return{error:"title_count",need:i.pack,got:a.length};const r=tr(i.price,`Song request ×${i.pack} · ${u.live.title} · TEST MODE`);if((r==null?void 0:r.error)==="insufficient")return{error:"insufficient",need:i.price,balance:Number(((p=u.wallet)==null?void 0:p.balance)||0)};const o={id:"lsr_"+Date.now().toString(36),liveId:u.live.id,hostId:u.live.hostId,userId:s.id,username:s.username,pack:i.pack,price:i.price,titles:a,songStatuses:a.map(()=>"queued"),status:"open",at:Date.now(),charged:i.price},n=[o,...ss()].slice(0,200),d={id:"lc_"+Date.now().toString(36)+"sr",userId:s.id,username:s.username,text:`requested ${i.pack} song${i.pack>1?"s":""} ($${i.price}) · TEST MODE`,at:Date.now(),support:!0},c={...u.live,chat:[...u.live.chat||[],d]};return u={...u,liveSongRequests:n,live:c},x(u),sa({category:"tips",gross:i.price,note:`Song request ×${i.pack} from @${s.username} · ${u.live.title}`,source:"live_song_request"}),{ok:!0,entry:o,wallet:u.wallet,live:u.live}}function Yi(e,t,s){var b;const i=u.user;if(!i)return{error:"signin"};if(!["playing","played","skipped","queued"].includes(s))return{error:"bad_status"};const r=ss().findIndex(y=>y.id===e);if(r<0)return{error:"missing"};const o=ss()[r],n=u.live;if(!(n&&n.hostId===i.id&&n.id===o.liveId||i.id===o.hostId)&&!H())return{error:"host_only"};const c=Number(t);if(!Number.isInteger(c)||c<0||c>=(o.titles||[]).length)return{error:"bad_index"};let p=[...o.songStatuses||o.titles.map(()=>"queued")];if(s==="playing"){const y=ss().map(v=>{if(v.liveId!==o.liveId)return v;const w=[...v.songStatuses||(v.titles||[]).map(()=>"queued")];let $=!1;for(let k=0;k<w.length;k++)w[k]==="playing"&&(w[k]="played",$=!0);if(!$)return v;const A=w.every(k=>k==="played"||k==="skipped");return{...v,songStatuses:w,status:A?"done":"open"}});u={...u,liveSongRequests:y},p=[...((b=u.liveSongRequests[r])==null?void 0:b.songStatuses)||p]}p[c]=s;const m=p.every(y=>y==="played"||y==="skipped"),g={...u.liveSongRequests[r],songStatuses:p,status:m?"done":"open"},f=[...u.liveSongRequests];return f[r]=g,u={...u,liveSongRequests:f},x(u),{ok:!0,entry:g}}function Go(e,t){return Yi(e,t,"playing")}function Uo(e,t){return Yi(e,t,"skipped")}function Vo(e,t){return Yi(e,t,"played")}const Ji=[{slug:"rose",name:"DBS Rose",coins:5,usd:.1,animation:"Rotating glossy rose and petals",tier:"small"},{slug:"big-love",name:"Big Love",coins:25,usd:.5,animation:"Pulsing luminous heart",tier:"small"},{slug:"turn-up",name:"Turn Up",coins:50,usd:1,animation:"Flame burst and DBS sparks",tier:"small"},{slug:"cash-rain",name:"Cash Rain",coins:150,usd:3,animation:"Stylized bills and confetti",tier:"mid"},{slug:"bottle-pop",name:"Bottle Pop",coins:300,usd:6,animation:"Bottle pop and confetti",tier:"mid"},{slug:"money-gun",name:"Money Gun",coins:750,usd:15,animation:"Stylized cash launcher",tier:"premium"},{slug:"diamond-drip",name:"Diamond Drip",coins:1500,usd:30,animation:"Rotating diamond",tier:"premium"},{slug:"foreign-whip",name:"Foreign Whip",coins:3e3,usd:60,animation:"Original luxury vehicle drives across screen",tier:"premium"},{slug:"helicopter",name:"Helicopter",coins:5e3,usd:100,animation:"Helicopter spotlight flyover",tier:"cinematic"},{slug:"private-jet",name:"Private Jet",coins:1e4,usd:200,animation:"Jet cinematic flyover",tier:"cinematic"},{slug:"dbs-crown",name:"DBS Crown",coins:25e3,usd:500,animation:"Gold diamond crown",tier:"cinematic"},{slug:"dbs-universe",name:"DBS Universe",coins:5e4,usd:1e3,animation:"Galaxy DBS logo reveal",tier:"cinematic"}],ei=[{coins:100,usd:2},{coins:500,usd:10},{coins:1e3,usd:20},{coins:2500,usd:50},{coins:5e3,usd:100},{coins:1e4,usd:200}],zo=750,fi=80,Ba=20;function ti(e){return{balance:Math.max(0,Number(e==null?void 0:e.balance)||0),history:Array.isArray(e==null?void 0:e.history)?e.history:[]}}function si(){return ti(u.coins).balance}function Ho(){return ei.map(e=>({...e}))}function Wo(){return Ji.map(e=>({...e}))}function Vn(e){const t=ei.find(r=>r.coins===Number(e));if(!t)return{error:"bad_package"};const s=ti(u.coins),i={at:Date.now(),amount:t.coins,note:`Bought ${t.coins} coins ($${t.usd}) · TEST MODE`,kind:"buy",packageCoins:t.coins,usd:t.usd},a={balance:s.balance+t.coins,history:[i,...s.history].slice(0,200)};return u={...u,coins:a},x(u),{ok:!0,coins:a,pack:t,entry:i}}function Qi(){return Array.isArray(u.liveGiftLedger)?u.liveGiftLedger:[]}function Yo(e){var s;const t=e||((s=u.live)==null?void 0:s.id);return t?Qi().filter(i=>i.liveId===t).map(i=>({id:i.id,liveId:i.liveId,giftSlug:i.giftSlug,giftName:i.giftName,coins:i.coins,usd:i.usd,fromUserId:i.fromUserId,fromUser:i.fromUser,at:i.at,animation:i.animation,tier:i.tier})):[]}function Jo(e=10,t=Date.now()){const s=Math.min(Math.max(1,Number(e)||10),10),i=new Date(t);i.setHours(0,0,0,0);const a=i.getTime(),r=new Date(t);r.setHours(23,59,59,999);const o=r.getTime(),n={};for(const d of Qi()){const c=Number(d.at||0);if(c<a||c>o)continue;const p=d.fromUserId||d.fromUser||"anon",m=n[p]||{userId:p,username:d.fromUser||p,usd:0,coins:0,gifts:0,lastSlug:d.giftSlug||"rose"};m.usd=+(m.usd+Number(d.usd||0)).toFixed(2),m.coins+=Number(d.coins||0),m.gifts+=1,m.username=d.fromUser||m.username,m.lastSlug=d.giftSlug||m.lastSlug,n[p]=m}return Object.values(n).sort((d,c)=>c.usd-d.usd||c.coins-d.coins||d.username.localeCompare(c.username)).slice(0,s)}function zn(e){let s=(ta(u.creatorWallet).earnings||[]).filter(i=>i.category==="gifts");return e&&(s=s.filter(i=>!i.hostId||i.hostId===e)),s.map(i=>({...i}))}function Qo({liveId:e,slug:t}={}){const s=u.user;if(!s)return{error:"signin"};const i=u.live;if(!i||i.endedAt)return{error:"offline"};if(e&&e!==i.id)return{error:"live_mismatch"};const a=Ji.find(E=>E.slug===t);if(!a)return{error:"bad_gift"};const r=ti(u.coins);if(r.balance<a.coins)return{error:"insufficient",need:a.coins,balance:r.balance};const o=I(a.usd),n=0,d=o,c=I(d*fi/100),p=I(d-c),m=Date.now(),g="lgift_"+m.toString(36)+"_"+Math.random().toString(36).slice(2,6),f={at:m,amount:-a.coins,note:`Gift ${a.name} · ${i.title} · TEST MODE`,kind:"gift",giftSlug:a.slug,liveId:i.id,usd:o},b={balance:r.balance-a.coins,history:[f,...r.history].slice(0,200)},y={id:g,liveId:i.id,hostId:i.hostId,giftSlug:a.slug,giftName:a.name,coins:a.coins,usd:o,fees:n,net:d,creatorShare:c,platformShare:p,dbsShare:p,creatorPct:fi,dbsPct:Ba,fromUserId:s.id,fromUser:s.username,at:m,animation:a.animation,tier:a.tier,testModeNetAsListed:!0},v={id:g,userId:s.id,username:s.username,kind:"gift",giftSlug:a.slug,label:a.name,amount:o,coins:a.coins,at:m},w={id:"lc_"+m.toString(36)+"gf",userId:s.id,username:s.username,text:`sent ${a.name} (${a.coins} coins) · TEST MODE`,at:m,support:!0,giftSlug:a.slug},$={...i,giftsTotal:I((i.giftsTotal||0)+o),giftLog:[...i.giftLog||[],v],chat:[...i.chat||[],w]},A=[y,...Qi()].slice(0,500),k=ta(u.creatorWallet),L={id:"earn_"+m.toString(36)+"_"+Math.random().toString(36).slice(2,6),category:"gifts",label:"Live gifts",note:`Live gift ${a.name} from @${s.username} · ${i.title}`,gross:o,fees:n,net:d,creatorPct:fi,dbsPct:Ba,creatorShare:c,dbsShare:p,source:"live_gift",giftSlug:a.slug,giftId:g,liveId:i.id,hostId:i.hostId,fromUserId:s.id,at:m,payoutId:null},C={...k,available:I(k.available+c),earnings:[L,...k.earnings||[]]},O={id:"gbpop_"+m.toString(36),liveId:i.id,fromUserId:s.id,fromUser:s.username,giftSlug:a.slug,giftName:a.name,coins:a.coins,usd:o,at:m,expiresAt:m+6e4};return u={...u,coins:b,live:$,liveGiftLedger:A,creatorWallet:C,liveGbChallengePop:O},x(u),{ok:!0,entry:y,viewerEntry:v,coins:b,live:$,earning:L,creatorWallet:C,challengePop:O}}const Hn=24*60*60*1e3,Ra=50;function ii(e){return{app:e!=null&&e.app&&typeof e.app=="object"?e.app:null,liveByHost:e!=null&&e.liveByHost&&typeof e.liveByHost=="object"?{...e.liveByHost}:{},history:Array.isArray(e==null?void 0:e.history)?e.history:[]}}function os(e,t=Date.now()){return!e||typeof e!="object"?!1:(Number(e.endsAt)||0)>t}function St(e){return e?{...e}:null}function Wn(e){return"goal_"+e+"_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,6)}function Xi(e,t){if(!t)return e;const s=[{...t,archivedAt:Date.now()},...e.history||[]].slice(0,40);return{...e,history:s}}function Xo(e=Date.now()){return{id:Wn("app"),scope:"app",name:"PIKK daily community goal",targetAmount:50,raised:0,endsAt:e+Hn,createdAt:e}}function Rs(e){return u={...u,dailyGoals:e},x(u),e}function Yn(e=Date.now()){let t=ii(u.dailyGoals),s=!1;return t.app&&!os(t.app,e)&&(t={...Xi(t,t.app),app:null},s=!0),os(t.app,e)||(t={...t,app:Xo(e)},s=!0),s&&Rs(t),t.app&&t.app.name==="DBS daily community goal"&&(t={...t,app:{...t.app,name:"PIKK daily community goal"}},Rs(t)),St(t.app)}function Zo(e,t=Date.now()){var r,o;const s=e||((r=u.live)==null?void 0:r.hostId)||((o=u.user)==null?void 0:o.id)||null;if(!s)return null;let i=ii(u.dailyGoals);const a=i.liveByHost[s]||null;if(a&&!os(a,t)){const n={...i.liveByHost};return delete n[s],i={...Xi(i,a),liveByHost:n},Rs(i),null}return St(os(a,t)?a:null)}function Jn({name:e,targetAmount:t}={}){const s=u.user;if(!s)return{error:"signin"};const i=String(e||"").trim().slice(0,80),a=Number(t);if(!i)return{error:"bad_name"};if(!Number.isFinite(a)||a<=0)return{error:"bad_amount"};const r=Date.now();let o=ii(u.dailyGoals);const n=o.liveByHost[s.id];n&&(o=Xi(o,n));const d={id:Wn("live"),scope:"live",hostId:s.id,hostName:s.username,name:i,targetAmount:I(a),raised:0,endsAt:r+Hn,createdAt:r};return o={...o,liveByHost:{...o.liveByHost,[s.id]:d}},Rs(o),{ok:!0,goal:St(d)}}function _i(e,t,s={}){if(!u.user)return{error:"signin"};const a=Math.floor(Number(t));if(!Number.isFinite(a)||a<=0)return{error:"invalid_amount"};const r=String(e||"");if(!r)return{error:"unknown_goal"};const o=Date.now();let n=ii(u.dailyGoals),d=null,c=null,p=null;if(n.app&&n.app.id===r)d="app",p=n.app;else for(const[C,O]of Object.entries(n.liveByHost))if(O&&O.id===r){d="live",c=C,p=O;break}if(!p)return{error:"unknown_goal"};if(!os(p,o))return{error:"expired"};const m=Number(p.targetAmount)||0,g=Number(p.raised)||0;if(p.completedAt||m>0&&g>=m)return{error:"completed",goal:St(p)};let f=a;if(m>0){const C=Math.max(0,I(m-g)),O=Math.ceil(C*Ra);if(O<=0)return{error:"completed",goal:St(p)};f>O&&(f=O)}const b=ti(u.coins);if(b.balance<f)return{error:"insufficient",need:f,balance:b.balance};const y=I(f/Ra),v=I(g+y),w=m>0&&v>=m?o:p.completedAt,$={...p,raised:m>0?Math.min(v,I(m)):v,...w?{completedAt:w}:{}},A=String((s==null?void 0:s.message)||"").trim().slice(0,180),k={at:o,amount:-f,note:`Goal donate · ${p.name} · $${y.toFixed(2)} · TEST MODE`,kind:"goal",goalId:p.id,...A?{message:A}:{},usd:y},L={balance:b.balance-f,history:[k,...b.history].slice(0,200)};return d==="app"?n={...n,app:$}:n={...n,liveByHost:{...n.liveByHost,[c]:$}},u={...u,dailyGoals:n,coins:L},x(u),{ok:!0,goal:St($),coins:L,donated:{coins:f,usd:y,requested:a,message:A}}}function el(e){const t=u.user,s={id:"brand_"+Date.now().toString(36),brand:String(e.brand||"").trim().slice(0,80),contact:String(e.contact||"").trim().slice(0,120),email:String(e.email||"").trim().slice(0,120),campaign:String(e.campaign||"sponsored_post").trim().slice(0,40),budget:String(e.budget||"").trim().slice(0,40),pitch:String(e.pitch||"").trim().slice(0,500),url:String(e.url||"").trim().slice(0,300),applicantUserId:(t==null?void 0:t.id)||null,status:"pending",at:Date.now()};return!s.brand||!s.email?{error:"required"}:(u={...u,brandApps:[s,...u.brandApps]},x(u),s)}function tl(e,t){if(!["pending","approved","rejected"].includes(t))return{error:"bad_status"};const i=u.brandApps.map(a=>a.id===e?{...a,status:t,reviewedAt:Date.now()}:a);return u={...u,brandApps:i},x(u),i.find(a=>a.id===e)}function ja(e){const t=u.user,s={id:"list_"+Date.now().toString(36),title:String(e.title||"").trim().slice(0,80),brand:String(e.brand||"").trim().slice(0,80),blurb:String(e.blurb||"").trim().slice(0,280),url:String(e.url||"").trim().slice(0,300),disclosure:String(e.disclosure||"Paid partnership · TEST MODE").trim().slice(0,120),brandAppId:e.brandAppId||null,createdBy:(t==null?void 0:t.id)||null,active:!0,at:Date.now()};return!s.title||!s.brand?{error:"required"}:(u={...u,listings:[s,...u.listings||[]]},x(u),s)}function sl(e,t){const s=(u.listings||[]).map(i=>i.id===e?{...i,active:!!t}:i);return u={...u,listings:s},x(u),s.find(i=>i.id===e)}function il({activeOnly:e=!1}={}){const t=u.listings||[];return e?t.filter(s=>s.active):t}function al(e){var s;return[((s=u.user)==null?void 0:s.id)||"guest",e].sort().join("__")}function Zi(){const e=u.user;return e?Object.values(u.threads||{}).filter(t=>{var s;return(s=t.participants)==null?void 0:s.includes(e.id)}).sort((t,s)=>(s.updatedAt||0)-(t.updatedAt||0)):[]}function js(e){const t=u.user;if(!t||!e||e.muted||e.blocked)return 0;const s=e.lastReadAt||0;return(e.messages||[]).filter(i=>i.from!==t.id&&(i.at||0)>s).length}function ze(){return Zi().reduce((e,t)=>e+js(t),0)}function Fa(e){const t=u.user;if(!t||!e)return null;const s=u.threads[e];if(!s||!(s.participants||[]).includes(t.id))return null;const i={...s,lastReadAt:Date.now()};u={...u,threads:{...u.threads,[i.id]:i},demoUnreadSeeded:!0},x(u);try{typeof window<"u"&&window.dispatchEvent&&window.dispatchEvent(new CustomEvent("dbs:messages-unread",{detail:{count:ze()}}))}catch{}return u.threads[i.id]}function ea(){var c;const e=u.user;if(!e)return{seeded:!1};if(gs(),u.demoUnreadSeeded)return{seeded:!1,count:ze(),once:!0};if(ze()>0)return u={...u,demoUnreadSeeded:!0},x(u),{seeded:!1,count:ze()};const t="maya",s=(((c=u.profiles)==null?void 0:c.maya)||{}).username||"MayaBeats",i=is(t,s);if(i.error)return i;const a=u.threads[i.id];if((a.messages||[]).some(p=>p.from!==e.id)){const p=(a.messages||[]).filter(y=>y.from!==e.id).map(y=>y.at||0),m=a.lastReadAt||0;if(m>=Math.max(...p,0)||m>0)return u={...u,demoUnreadSeeded:!0},x(u),{seeded:!1,count:ze()};const f=Math.min(...p),b={...a,lastReadAt:Math.max(0,f-1)};return u={...u,threads:{...u.threads,[b.id]:b},demoUnreadSeeded:!0},x(u),{seeded:!0,count:ze()}}const o=Date.now(),n=[{id:"m_demo_unread_1",from:t,fromName:s,text:"Yo — drop coming Friday. You in for the listening party?",at:o-1e3*60*12},{id:"m_demo_unread_2",from:t,fromName:s,text:"Also sent a beat pack in the vault 🔥",at:o-1e3*60*5}],d={...a,messages:[...a.messages||[],...n],updatedAt:o-1e3*60*5,lastReadAt:0,request:!1};return u={...u,threads:{...u.threads,[d.id]:d},demoUnreadSeeded:!0},x(u),{seeded:!0,count:ze()}}function Qn(e){return(u.threads||{})[e]||null}function Xn(e){var i;const t=u.user;if(!t||!e)return!1;const s=(i=u.profiles)==null?void 0:i[e];return s?(t.following||[]).includes(e)&&(s.following||[]).includes(t.id):!1}function is(e,t){const s=u.user;if(!s)return{error:"signin"};const i=al(e);let a=u.threads[i];if(!a){const r=e==="dbs"||Xn(e);a={id:i,kind:"dm",participants:[s.id,e],peerId:e,peerName:t||e,messages:[],updatedAt:Date.now(),request:!r,muted:!1,blocked:!1},u={...u,threads:{...u.threads,[i]:a}},x(u)}return a}function nl(e,t,s,{priority:i=!1}={}){const a=u.user;if(!a)return{error:"signin"};const r=String(s||"").trim().slice(0,500);if(!r)return{error:"empty"};const o=is(e,t);if(o.error)return o;const n={id:"m_"+Date.now().toString(36),from:a.id,fromName:a.username,text:r,at:Date.now(),priority:!!i},d={...u.threads[o.id],messages:[...u.threads[o.id].messages||[],n],updatedAt:Date.now(),peerName:t||u.threads[o.id].peerName};if(u={...u,threads:{...u.threads,[d.id]:d}},i){const c=u.wallet||{balance:0,history:[]};u={...u,wallet:{balance:c.balance,history:[...c.history||[],{at:Date.now(),amount:0,note:"Priority message · TEST MODE $2.99 (not charged)"}]}}}return x(u),{thread:u.threads[d.id],message:n}}function gs(){const e={...u.profiles||{}};let t=!1;e.maya||(e.maya={id:"maya",username:"MayaBeats",bio:"Creator · beats & live demos",avatar:"",followers:[],following:["dbs"],verified:!1},t=!0),e.fanjay||(e.fanjay={id:"fanjay",username:"FanJay",bio:"Day-one fan · playlist curator",avatar:"",followers:[],following:["dbs"],verified:!1},t=!0);const s=u.user;if(s){const i={...e.maya},a=new Set(i.following||[]),r=new Set(i.followers||[]);a.has(s.id)||(a.add(s.id),t=!0),r.has(s.id)||(r.add(s.id),t=!0),i.following=[...a],i.followers=[...r],e.maya=i;let o=s;(s.following||[]).includes("maya")||(o={...s,following:[...s.following||[],"maya"]},t=!0),t&&(u={...u,user:o,profiles:e},Je(o),x(u))}else t&&(u={...u,profiles:e},x(u));return[{id:"dbs",username:"DatBoiSkeet",team:!0,bio:(u.profiles.dbs||{}).bio||""},{id:"maya",username:u.profiles.maya.username,team:!1,bio:u.profiles.maya.bio},{id:"fanjay",username:u.profiles.fanjay.username,team:!1,bio:u.profiles.fanjay.bio}]}function rl(e,t=[]){const s=u.user;if(!s)return{error:"signin"};const i=String(e).trim().slice(0,60)||"Group",a=[...new Set([s.id,...t.filter(Boolean)])],r=i.toLowerCase().replace(/\W+/g,"_").slice(0,24)||"group",o=r==="dbs_fans"?"group_dbs_fans":"group_"+r+"_"+String(s.id).slice(-4);let n=u.threads[o];if(!n)n={id:o,kind:"group",peerId:o,peerName:i,participants:a,memberIds:a,messages:[],updatedAt:Date.now(),muted:!1,blocked:!1},u={...u,threads:{...u.threads,[o]:n}},x(u);else if(s&&!(n.participants||[]).includes(s.id)){const d=[...new Set([...n.participants||[],s.id])],c=[...new Set([...n.memberIds||d,s.id])];n={...n,participants:d,memberIds:c},u={...u,threads:{...u.threads,[o]:n}},x(u)}return u.threads[o]}function ol(){return u.user?(gs(),rl("DBS Fans",["dbs","maya","fanjay"])):{error:"signin"}}function ll(e,t){const s=u.user;if(!s)return{error:"signin"};const i=u.threads[e];if(!i||i.kind!=="group")return{error:"not_group"};if(!(i.participants||[]).includes(s.id))return{error:"forbidden"};const a=String(t||"").trim().slice(0,500);if(!a)return{error:"empty"};const r={id:"m_"+Date.now().toString(36),from:s.id,fromName:s.username,text:a,at:Date.now(),priority:!1},o={...i,messages:[...i.messages||[],r],updatedAt:Date.now()};return u={...u,threads:{...u.threads,[o.id]:o}},x(u),{thread:u.threads[o.id],message:r}}function vi(e,t={}){const s=u.threads[e];if(!s)return{error:"missing"};const i={...s,muted:t.muted!==void 0?!!t.muted:!!s.muted,blocked:t.blocked!==void 0?!!t.blocked:!!s.blocked,reportedAt:t.report?Date.now():s.reportedAt||null};return u={...u,threads:{...u.threads,[i.id]:i}},x(u),i}function Ka(e={}){const t={...u.messagePrefs||{allowDMs:!0,allowRequests:!0},...e};return u={...u,messagePrefs:t},x(u),t}const ot={gifts:{creatorPct:80,dbsPct:20,label:"Live gifts"},tips:{creatorPct:90,dbsPct:10,label:"Tips"},subscriptions:{creatorPct:85,dbsPct:15,label:"Subscriptions"},paid_content:{creatorPct:85,dbsPct:15,label:"Paid content"},referrals:{creatorPct:85,dbsPct:15,label:"Referrals"},clippers:{creatorPct:80,dbsPct:20,label:"Clippers"},sponsorships:{creatorPct:80,dbsPct:20,label:"Sponsorships"},merch:{creatorPct:85,dbsPct:15,label:"Merch / affiliate"}},cl=[{category:"gifts",gross:40,note:"Live gifts · demo week"},{category:"tips",gross:22.5,note:"Live tips · demo week"},{category:"subscriptions",gross:29.99,note:"Skeet+ fan sub · demo"},{category:"referrals",gross:15,note:"Refer & Earn milestone · demo"},{category:"clippers",gross:50,note:"Clippers campaign payout · demo"},{category:"sponsorships",gross:100,note:"Sponsored livestream · demo"},{category:"merch",gross:35,note:"Foreign X-Change affiliate · demo"}];function I(e){return Math.round(Number(e)*100)/100}function ta(e){const t=ts().creatorWallet;return!e||typeof e!="object"?{...t}:{...t,...e,available:I(e.available??0),holds:I(e.holds??0),threshold:Number(e.threshold)>0?Number(e.threshold):25,verification:e.verification==="demo_verified"?"demo_verified":"demo_unverified",earnings:Array.isArray(e.earnings)?e.earnings:[],payouts:Array.isArray(e.payouts)?e.payouts:[]}}function Qe(){const e=ta(u.creatorWallet);return u.creatorWallet!==e&&(u={...u,creatorWallet:e}),e}function Zn({category:e,gross:t,note:s,source:i="demo",at:a=Date.now()}){const r=ot[e]||ot.tips,o=I(Math.max(0,Number(t)||0)),n=I(o*.029+(o>0?.3:0)),d=I(Math.max(0,o-n)),c=I(d*r.creatorPct/100),p=I(d-c);return{id:"earn_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,6),category:e,label:r.label,note:String(s||r.label).slice(0,120),gross:o,fees:n,net:d,creatorPct:r.creatorPct,dbsPct:r.dbsPct,creatorShare:c,dbsShare:p,source:i,at:a,payoutId:null}}function dl(){return{...ot}}function ls(){return Qe()}function sa(e){const t=Zn(e),s=Qe(),i={...s,available:I(s.available+t.creatorShare),earnings:[t,...s.earnings||[]]};return u={...u,creatorWallet:i},x(u),t}function er({force:e=!1}={}){const t=Qe();if(!e&&(t.earnings||[]).length>0)return{skipped:!0,creatorWallet:t};const s=Date.now()-6*864e5,a=cl.map((n,d)=>Zn({category:n.category,gross:n.gross,note:n.note,source:"seed",at:s+d*36e5})).map((n,d)=>({...n,id:"earn_seed_"+d+"_"+n.category})),r=I(a.reduce((n,d)=>n+d.creatorShare,0)),o={...t,available:e?r:I(t.available+r),earnings:e?a:[...a,...t.earnings||[]],holds:e?0:t.holds,payouts:e?[]:t.payouts};return e&&(o.available=r,o.holds=0,o.payouts=[],o.earnings=a),u={...u,creatorWallet:o},x(u),{seeded:a.length,creatorWallet:o}}function pl({amount:e}={}){const t=Qe(),s=(t.payouts||[]).find(g=>g.status==="pending");if(s)return{error:"pending_exists",pending:s};const i=I(t.available);if(i<t.threshold)return{error:"below_threshold",available:i,threshold:t.threshold};const a=e!=null?I(e):i;if(a<=0||a>i)return{error:"bad_amount"};const r=(t.earnings||[]).filter(g=>!g.payoutId).sort((g,f)=>g.at-f.at),o=[];let n=0;for(const g of r){const f=I(g.creatorShare);if(!(f<=0)&&!(I(n+f)>a)&&(o.push(g.id),n=I(n+f),n>=a))break}if(!o.length){const g=r.find(f=>I(f.creatorShare)>0);if(!g)return{error:"no_earnings"};if(I(g.creatorShare)>i)return{error:"bad_amount"};o.push(g.id),n=I(g.creatorShare)}const d=n,c={id:"po_"+Date.now().toString(36),amount:d,status:"pending",at:Date.now(),earningIds:o,note:"TEST MODE payout request · not real money"},p=(t.earnings||[]).map(g=>o.includes(g.id)?{...g,payoutId:c.id}:g),m={...t,available:I(i-d),holds:I(t.holds+d),earnings:p,payouts:[c,...t.payouts||[]]};return u={...u,creatorWallet:m},x(u),c}function ul(e,t){if(!["pending","completed","rejected"].includes(t))return{error:"bad_status"};const i=Qe(),a=(i.payouts||[]).find(p=>p.id===e);if(!a)return{error:"missing"};if(a.status!=="pending"&&t!=="pending")return{error:"already_final",payout:a};let r=i.available,o=i.holds,n=i.earnings||[];if(a.status==="pending"&&t==="completed")o=I(Math.max(0,o-a.amount));else if(a.status==="pending"&&t==="rejected"){o=I(Math.max(0,o-a.amount)),r=I(r+a.amount);const p=new Set(a.earningIds||[]);n=n.map(m=>p.has(m.id)?{...m,payoutId:null}:m)}const d=i.payouts.map(p=>p.id===e?{...p,status:t,reviewedAt:Date.now()}:p),c={...i,available:r,holds:o,earnings:n,payouts:d};return u={...u,creatorWallet:c},x(u),d.find(p=>p.id===e)}function ml(e){const s={...Qe(),verification:e?"demo_verified":"demo_unverified"};return u={...u,creatorWallet:s},x(u),s}function ia(){const e=Qe(),t={};for(const s of Object.keys(ot))t[s]={category:s,label:ot[s].label,creatorPct:ot[s].creatorPct,dbsPct:ot[s].dbsPct,gross:0,fees:0,net:0,creatorShare:0,dbsShare:0,count:0};for(const s of e.earnings||[]){const i=t[s.category]||(t[s.category]={category:s.category,label:s.label||s.category,creatorPct:s.creatorPct,dbsPct:s.dbsPct,gross:0,fees:0,net:0,creatorShare:0,dbsShare:0,count:0});i.gross=I(i.gross+s.gross),i.fees=I(i.fees+s.fees),i.net=I(i.net+s.net),i.creatorShare=I(i.creatorShare+s.creatorShare),i.dbsShare=I(i.dbsShare+s.dbsShare),i.count+=1}return Object.values(t)}function Fs(e=5,t="Demo credit"){const s=u.wallet||{balance:0,history:[]},i=Number(s.balance||0)+Number(e),a=[...s.history||[],{at:Date.now(),amount:Number(e),note:t}];return u={...u,wallet:{balance:i,history:a}},x(u),u.wallet}function tr(e,t="Demo spend"){const s=u.wallet||{balance:0,history:[]},i=Number(e);if(Number(s.balance||0)<i)return{error:"insufficient"};const a=Number(s.balance||0)-i,r=[...s.history||[],{at:Date.now(),amount:-i,note:t}];return u={...u,wallet:{balance:a,history:r}},x(u),u.wallet}function B(e,t){return String(e||"").toLowerCase().includes(t)}function hl(e){const t=String(e||"").trim().toLowerCase(),s={query:String(e||"").trim(),posts:[],profiles:[],music:[],videos:[],lives:[],products:[],pictures:[]};if(!t)return s;const i=(u.posts||[]).filter(g=>B(g.text,t)||B(g.username,t)),a=Object.values(u.profiles||{}).filter(g=>B(g.username,t)||B(g.bio,t));if(u.user){const g=u.user;(B(g.username,t)||B(g.bio,t))&&(a.find(f=>f.id===g.id)||a.push(g))}const r=(u.catalog||[]).filter(g=>g.published),o=r.filter(g=>(g.type==="song"||g.type==="album")&&(B(g.title,t)||B(g.artist,t)||B(g.type,t))),n=r.filter(g=>g.type==="video"&&(B(g.title,t)||B(g.artist,t)||B("video",t))),d=r.filter(g=>g.type==="picture"&&(B(g.title,t)||B(g.artist,t)||B("picture",t))),c=[],p=u.live;p&&!p.endedAt&&(B(p.title,t)||B(p.hostName,t)||B("live",t))&&c.push({...p,status:"live"}),(u.liveHistory||[]).forEach(g=>{(B(g.title,t)||B(g.hostName,t)||B("live",t))&&c.push({...g,status:"ended"})});const m=(u.listings||[]).filter(g=>g.active!==!1&&(B(g.title,t)||B(g.brand,t)||B(g.blurb,t)||B("marketplace",t)||B("product",t)));return{query:String(e||"").trim(),posts:i,profiles:a,music:o,videos:n,lives:c,products:m,pictures:d}}function gl(e=8){const t=u.likes||{},s=(u.posts||[]).map(n=>({kind:"post",id:n.id,title:(n.text||"").slice(0,72)||"Post",subtitle:"@"+(n.username||"creator"),href:"#/posts",score:(t[n.id]||[]).length,image:n.image||""})).sort((n,d)=>d.score-n.score||(d.id>n.id?1:-1)),i=[{kind:"music",id:"trend_music",title:"Long Story Short",subtitle:"Coming Soon · Music",href:"#/music",score:3,image:"/music/01_Long_Story_Short_Coming_Soon.jpg"},{kind:"video",id:"trend_video",title:"Dirty Money ft. Lil Baby",subtitle:"Official MV",href:"#/videos",score:3,image:""},{kind:"live",id:"trend_live",title:"Go live on DBS",subtitle:"Creators · Live",href:"#/live",score:2,image:""},{kind:"market",id:"trend_mkt",title:"Sponsored Marketplace",subtitle:"Brand ads · demo",href:"#/marketplace",score:2,image:""},{kind:"spotlight",id:"trend_spot",title:"24/7 Spotlight",subtitle:"Stage · Discover",href:"#/spotlight",score:1,image:""}],a=u.live;return a&&!a.endedAt&&i.unshift({kind:"live",id:"trend_live_now",title:a.title||"Live now",subtitle:"@"+(a.hostName||"creator")+" · LIVE",href:"#/live",score:99,image:""}),(u.catalog||[]).filter(n=>n.published).slice(0,3).forEach(n=>{const d=n.type==="video"?"#/videos":n.type==="picture"?"#/home":"#/music";i.push({kind:n.type,id:"trend_cat_"+n.id,title:n.title,subtitle:(n.artist||"Admin")+" · From Admin",href:d,score:4,image:n.coverRef&&!String(n.coverRef).startsWith("idb:")?n.coverRef:""})}),[...s,...i].sort((n,d)=>d.score-n.score).slice(0,e)}function fl(){const e=Object.values(u.profiles||{}).map(t=>({id:t.id,username:t.username,bio:t.bio||"",avatar:t.avatar||"",verified:!!t.verified,followers:(t.followers||[]).length}));return u.user&&!e.find(t=>t.id===u.user.id)&&e.push({id:u.user.id,username:u.user.username,bio:u.user.bio||"",avatar:u.user.avatar||"",verified:!!u.user.verified,followers:(u.user.followers||[]).length}),e.sort((t,s)=>s.followers-t.followers||t.username.localeCompare(s.username))}const sr=6e4,bi=10;function ir(e=Date.now()){const t=new Date(e);return t.setHours(23,59,59,999),t.getTime()}function vl(e=Date.now()){const t=new Date(e);return t.setHours(0,0,0,0),t.getTime()}const ar=[{id:"fan_maya",name:"MayaBeats",bio:"Demo fan · mutual"},{id:"fan_jay",name:"FanJay",bio:"Demo fan · sandbox opponent"}];function ce(){return u.giftBattles||{active:null,history:[],champions:[],prefs:{invitationsEnabled:!0}}}function ht(e){return u={...u,giftBattles:e},x(u),e}function aa(e,t=Date.now()){if(!e||e.status!=="active"||t<(e.endsAt||0))return e;const s=Number(e.scoreA||0),i=Number(e.scoreB||0);let a="tie",r=null,o=null;return s>i?(a="win",r=e.challenger.id,o=e.challenger.name):i>s&&(a="win",r=e.opponent.id,o=e.opponent.name),{...e,status:"ended",endedAt:t,result:a,winnerId:r,winnerName:o,scoreA:s,scoreB:i,championUntil:r?ir(t):null}}function nr(){return ar.map(e=>({...e}))}function na(){return{invitationsEnabled:!0,...ce().prefs||{}}}function bl(e={}){const t=ce(),s={...t.prefs,...e};return ht({...t,prefs:s})}function ra(){let t=ce().active;if(!t)return null;if(t.status==="active"){const s=aa(t);if(s!==t&&s.status==="ended")return oa(s);t=s}return t}function oa(e){const t=ce(),s=[e,...(t.history||[]).filter(a=>a.id!==e.id)].slice(0,40);let i=t.champions||[];return e.winnerId&&(i=[{battleId:e.id,userId:e.winnerId,username:e.winnerName,score:e.winnerId===e.challenger.id?e.scoreA:e.scoreB,opponentScore:e.winnerId===e.challenger.id?e.scoreB:e.scoreA,endedAt:e.endedAt,championUntil:e.championUntil,mode:e.mode},...i.filter(r=>r.battleId!==e.id)].slice(0,30)),ht({...t,active:e,history:s,champions:i}),e}function yl({opponentId:e,opponentName:t,mode:s}={}){const i=u.user;if(!i)return{error:"signin"};if(!na().invitationsEnabled)return{error:"invites_disabled"};const r=u.live&&!u.live.endedAt,o=s||(r?"live":"sandbox");if(o==="live"&&!r)return{error:"not_live"};const n=ce(),d=n.active;if(d&&(d.status==="pending"||d.status==="active"))return{error:"battle_in_progress",battle:d};const c=ar.find(g=>g.id===e),p={id:e||(c==null?void 0:c.id)||"fan_maya",name:t||(c==null?void 0:c.name)||"MayaBeats"};if(p.id===i.id)return{error:"self"};const m={id:"gb_"+Date.now().toString(36),status:"pending",mode:o,liveId:r?u.live.id:null,liveTitle:r?u.live.title:null,challenger:{id:i.id,name:i.username},opponent:p,createdAt:Date.now(),startedAt:null,endsAt:null,durationMs:sr,scoreA:0,scoreB:0,giftLog:[],result:null,winnerId:null,winnerName:null,endedAt:null,championUntil:null};return ht({...n,active:m}),{battle:m}}function kl(){const e=ce(),t=e.active;if(!t||t.status!=="pending")return{error:"no_pending"};if(!na().invitationsEnabled)return{error:"invites_disabled"};const s=Date.now(),i={...t,status:"active",startedAt:s,endsAt:s+(t.durationMs||sr),scoreA:0,scoreB:0};return ht({...e,active:i}),{battle:i}}function wl(){const e=ce(),t=e.active;if(!t||t.status!=="pending")return{error:"no_pending"};const s={...t,status:"declined",endedAt:Date.now(),result:"declined"},i=[s,...e.history||[]].slice(0,40);return ht({...e,active:null,history:i}),{battle:s}}function Sl(){const e=ce(),t=e.active;return t&&(t.status==="pending"||t.status==="active")?{error:"still_running",battle:t}:(ht({...e,active:null}),{ok:!0})}function $l(e=Date.now()){const t=u.liveGbChallengePop;return t?t.expiresAt&&e>t.expiresAt?(u={...u,liveGbChallengePop:null},x(u),null):!u.live||u.live.endedAt||t.liveId&&t.liveId!==u.live.id?null:{...t}:null}function xl({side:e="challenger",kind:t="gift",amount:s=2,label:i=""}={}){var y;if(!u.user)return{error:"signin"};let r=ra();if(!r||r.status!=="active")return{error:"no_active"};if(r=ce().active,!r||r.status!=="active")return{error:"ended"};const o=Math.max(.5,Number(s)||1),n=t==="tip"?"tip":"gift",d=e==="opponent",c=d?r.opponent:r.challenger;let p=null;if(r.mode==="live"&&!d){if(p=Gn({kind:n,amount:o,label:i||(n==="gift"?"🔥 Fire":"Tip")}),p!=null&&p.error)return p}else(((y=u.wallet)==null?void 0:y.balance)||0)>=o&&tr(o,`Gift battle ${n} · ${c.name} · TEST MODE`);const m={id:"gbg_"+Date.now().toString(36),side:d?"opponent":"challenger",userId:c.id,username:c.name,kind:n,amount:o,label:(i||(n==="gift"?"🔥 Fire":"Tip")).slice(0,40),at:Date.now()},g=Number(r.scoreA||0)+(d?0:o),f=Number(r.scoreB||0)+(d?o:0);let b={...r,scoreA:+g.toFixed(2),scoreB:+f.toFixed(2),giftLog:[...r.giftLog||[],m]};return b=aa(b),b.status==="ended"?oa(b):ht({...ce(),active:b}),{battle:b,entry:m,live:(p==null?void 0:p.live)||null,wallet:u.wallet}}function la(){const t=ce().active;if(!t||t.status!=="active")return t;const s=aa(t);return s.status==="ended"&&t.status!=="ended"?oa(s):s}function El(e=20){return(ce().history||[]).slice(0,e)}function Al(e=Date.now()){const t=ce(),s=t.active;return s&&s.status==="ended"&&s.winnerId&&s.championUntil&&e<s.championUntil?{battleId:s.id,userId:s.winnerId,username:s.winnerName,score:s.winnerId===s.challenger.id?s.scoreA:s.scoreB,endedAt:s.endedAt,championUntil:s.championUntil,mode:s.mode}:(t.champions||[]).find(a=>a.championUntil&&e<a.championUntil)||null}function Cl(e=15){var s;const t={};for(const i of ce().history||[]){if(i.result!=="win"||!i.winnerId)continue;const a=t[i.winnerId]||{userId:i.winnerId,username:i.winnerName,wins:0,points:0};a.wins+=1;const r=i.winnerId===((s=i.challenger)==null?void 0:s.id)?Number(i.scoreA||0):Number(i.scoreB||0);a.points=+(a.points+r).toFixed(2),a.username=i.winnerName||a.username,t[i.winnerId]=a}return Object.values(t).sort((i,a)=>a.wins-i.wins||a.points-i.points||i.username.localeCompare(a.username)).slice(0,e)}function ca(e=bi,t=Date.now()){var d;const s=Math.min(Math.max(1,Number(e)||bi),bi),i=vl(t),a=ir(t),r=new Set,o=[],n=c=>{if(!(c!=null&&c.userId)||!(c!=null&&c.username)||r.has(c.userId))return;const p=Number(c.endedAt||0);p<i||p>a||c.championUntil&&t>c.championUntil||(r.add(c.userId),o.push({userId:c.userId,username:c.username,score:Number(c.score||0),endedAt:p,championUntil:c.championUntil||a,battleId:c.battleId||c.id||null,mode:c.mode||"demo"}))};for(const c of ce().champions||[])if(n(c),o.length>=s)return o;for(const c of ce().history||[])if(!(c.result!=="win"||!c.winnerId)&&(n({userId:c.winnerId,username:c.winnerName,score:c.winnerId===((d=c.challenger)==null?void 0:d.id)?c.scoreA:c.scoreB,endedAt:c.endedAt,championUntil:c.championUntil||a,battleId:c.id,mode:c.mode}),o.length>=s))break;return o}const da=4,qi=[{id:"maya",username:"MayaBeats",bio:"Creator · beats & live demos"},{id:"fanjay",username:"FanJay",bio:"Day-one fan · playlist curator"},{id:"ria",username:"RiaLoops",bio:"Demo co-host · loops & hooks"},{id:"dez",username:"DezOnMic",bio:"Demo guest · freestyle nights"}];function ke(){return u.multiGuest||{active:null,history:[]}}function Pe(e){return u={...u,multiGuest:e},x(u),e}function fs(e,t){const s=[e,...t],i=s.length||1,a=Math.floor(100/i*100)/100,r={};let o=0;return s.forEach((n,d)=>{d===s.length-1?r[n]=+(100-o).toFixed(2):(r[n]=a,o=+(o+a).toFixed(2))}),r}function ai(){gs();const e={...u.profiles||{}};let t=!1;for(const s of qi)e[s.id]||(e[s.id]={id:s.id,username:s.username,bio:s.bio,avatar:"",followers:[],following:["dbs"],verified:!1},t=!0);return t&&(u={...u,profiles:e},x(u)),qi.map(s=>{const i=u.profiles[s.id]||s;return{id:s.id,username:i.username||s.username,bio:i.bio||s.bio,followers:(i.followers||[]).length}})}function Tl(){return ai()}function cs(){return ke().active||null}function Dl(e=20){return(ke().history||[]).slice(0,e)}function Ml(e){const t=u.user;if(!t)return{error:"signin"};const s=ke();if(s.active&&!s.active.endedAt)return{error:"session_in_progress",session:s.active};const i=String(e||"").trim().slice(0,80)||"Multi-Guest Live";ai();const a={id:"mg_"+Date.now().toString(36),title:i,hostId:t.id,hostName:t.username,startedAt:Date.now(),endedAt:null,maxGuests:da,guests:[],chat:[{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:"Multi-guest session started · TEST MODE · no camera / WebRTC",at:Date.now(),system:!0}],giftSplit:{mode:"equal",shares:{[t.id]:100},disclosed:!1,disclosedAt:null},broadcastReady:!1};return Pe({...s,active:a}),{session:a}}function Ll(e){var g;const t=u.user;if(!t)return{error:"signin"};const s=ke(),i=s.active;if(!i||i.endedAt)return{error:"no_session"};if(i.hostId!==t.id)return{error:"host_only"};ai();const a=qi.find(f=>f.id===e),r=(g=u.profiles)==null?void 0:g[e];if(!a&&!r)return{error:"unknown_guest"};if(e===t.id||e===i.hostId)return{error:"self"};const o=(i.guests||[]).find(f=>f.id===e);if(o&&(o.status==="invited"||o.status==="joined"))return{error:"already_invited",session:i};if((i.guests||[]).filter(f=>f.status==="joined"||f.status==="invited").length>=(i.maxGuests||da))return{error:"full"};const d={id:e,username:(r==null?void 0:r.username)||(a==null?void 0:a.username)||e,status:"invited",muted:!1,invitedAt:Date.now(),joinedAt:null},c=[...(i.guests||[]).filter(f=>f.id!==e),d],p=[...i.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`Invited @${d.username} to the stage`,at:Date.now(),system:!0}].slice(-80),m={...i,guests:c,chat:p,broadcastReady:!1};return m.giftSplit={...m.giftSplit,disclosed:!1,disclosedAt:null,shares:fs(i.hostId,c.filter(f=>f.status==="joined").map(f=>f.id))},Pe({...s,active:m}),{session:m,guest:d}}function Il(e){var p;const t=u.user;if(!t)return{error:"signin"};const s=ke(),i=s.active;if(!i||i.endedAt)return{error:"no_session"};if(i.hostId!==t.id)return{error:"host_only"};const a=(i.guests||[]).map(m=>({...m})),r=a.findIndex(m=>m.id===e);if(r<0)return{error:"not_found"};if(a[r].status==="joined")return{session:i,guest:a[r]};if(a.filter(m=>m.status==="joined").length>=(i.maxGuests||da))return{error:"full"};a[r]={...a[r],status:"joined",joinedAt:Date.now(),muted:!1};const n=a.filter(m=>m.status==="joined").map(m=>m.id),d=[...i.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`@${a[r].username} joined the stage`,at:Date.now(),system:!0}].slice(-80),c={...i,guests:a,chat:d,broadcastReady:!1,giftSplit:{mode:((p=i.giftSplit)==null?void 0:p.mode)||"equal",shares:fs(i.hostId,n),disclosed:!1,disclosedAt:null}};return Pe({...s,active:c}),{session:c,guest:a[r]}}function Pl(e){var d;const t=u.user;if(!t)return{error:"signin"};const s=ke(),i=s.active;if(!i||i.endedAt)return{error:"no_session"};if(i.hostId!==t.id)return{error:"host_only"};const a=(i.guests||[]).map(c=>c.id===e?{...c,status:"declined"}:c);if(!(i.guests||[]).some(c=>c.id===e))return{error:"not_found"};const r=((d=(i.guests||[]).find(c=>c.id===e))==null?void 0:d.username)||e,o=[...i.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`@${r} declined the invite`,at:Date.now(),system:!0}].slice(-80),n={...i,guests:a,chat:o};return Pe({...s,active:n}),{session:n}}function _l(e){var c,p;const t=u.user;if(!t)return{error:"signin"};const s=ke(),i=s.active;if(!i||i.endedAt)return{error:"no_session"};if(i.hostId!==t.id&&t.id!==e)return{error:"forbidden"};const a=(i.guests||[]).map(m=>m.id===e?{...m,status:"left",muted:!1}:m);if(!(i.guests||[]).some(m=>m.id===e))return{error:"not_found"};const r=((c=(i.guests||[]).find(m=>m.id===e))==null?void 0:c.username)||e,o=a.filter(m=>m.status==="joined").map(m=>m.id),n=[...i.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`@${r} left the stage`,at:Date.now(),system:!0}].slice(-80),d={...i,guests:a,chat:n,broadcastReady:!1,giftSplit:{mode:((p=i.giftSplit)==null?void 0:p.mode)||"equal",shares:fs(i.hostId,o),disclosed:!1,disclosedAt:null}};return Pe({...s,active:d}),{session:d}}function ql(e){var c,p;const t=u.user;if(!t)return{error:"signin"};const s=ke(),i=s.active;if(!i||i.endedAt)return{error:"no_session"};if(i.hostId!==t.id)return{error:"host_only"};const a=(i.guests||[]).map(m=>m.id===e?{...m,status:"removed",muted:!1}:m);if(!(i.guests||[]).some(m=>m.id===e))return{error:"not_found"};const r=((c=(i.guests||[]).find(m=>m.id===e))==null?void 0:c.username)||e,o=a.filter(m=>m.status==="joined").map(m=>m.id),n=[...i.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`Host removed @${r} from the stage`,at:Date.now(),system:!0}].slice(-80),d={...i,guests:a,chat:n,broadcastReady:!1,giftSplit:{mode:((p=i.giftSplit)==null?void 0:p.mode)||"equal",shares:fs(i.hostId,o),disclosed:!1,disclosedAt:null}};return Pe({...s,active:d}),{session:d}}function Ol(e,t=!0){var c;const s=u.user;if(!s)return{error:"signin"};const i=ke(),a=i.active;if(!a||a.endedAt)return{error:"no_session"};if(a.hostId!==s.id)return{error:"host_only"};const r=(a.guests||[]).map(p=>p.id===e&&p.status==="joined"?{...p,muted:!!t}:p);if(!(a.guests||[]).some(p=>p.id===e&&p.status==="joined"))return{error:"not_joined"};const o=((c=(a.guests||[]).find(p=>p.id===e))==null?void 0:c.username)||e,n=[...a.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:t?`Host muted @${o}`:`Host unmuted @${o}`,at:Date.now(),system:!0}].slice(-80),d={...a,guests:r,chat:n};return Pe({...i,active:d}),{session:d}}function Nl(e){const t=u.user;if(!t)return{error:"signin"};const s=ke(),i=s.active;if(!i||i.endedAt)return{error:"no_session"};const a=String(e||"").trim().slice(0,280);if(!a)return{error:"empty"};const r={id:"c_"+Date.now().toString(36),userId:t.id,username:t.username,text:a,at:Date.now()},o=[...i.chat||[],r].slice(-80),n={...i,chat:o};return Pe({...s,active:n}),{session:n,message:r}}function Qt({mode:e="equal",shares:t=null,disclose:s=!1}={}){var g,f;const i=u.user;if(!i)return{error:"signin"};const a=ke(),r=a.active;if(!r||r.endedAt)return{error:"no_session"};if(r.hostId!==i.id)return{error:"host_only"};const o=(r.guests||[]).filter(b=>b.status==="joined").map(b=>b.id),n=[r.hostId,...o];let d,c=e==="custom"?"custom":"equal";if(c==="equal")d=fs(r.hostId,o);else{d={};let b=0;for(const y of n){const v=Math.max(0,Number(t==null?void 0:t[y])||0);d[y]=+v.toFixed(2),b+=d[y]}if(b=+b.toFixed(2),Math.abs(b-100)>.05)return{error:"split_total",total:b,expected:100}}const p={mode:c,shares:d,disclosed:!!s||!!((g=r.giftSplit)!=null&&g.disclosed),disclosedAt:s?Date.now():((f=r.giftSplit)==null?void 0:f.disclosedAt)||null};s&&(p.disclosed=!0),s&&(p.disclosedAt=Date.now());const m={...r,giftSplit:p,broadcastReady:!!p.disclosed};return Pe({...a,active:m}),{session:m}}function Bl(){var e,t,s,i;return Qt({mode:((t=(e=cs())==null?void 0:e.giftSplit)==null?void 0:t.mode)||"equal",shares:((i=(s=cs())==null?void 0:s.giftSplit)==null?void 0:i.shares)||null,disclose:!0})}function Rl(){const e=u.user;if(!e)return{error:"signin"};const t=ke(),s=t.active;if(!s||s.endedAt)return{error:"no_session"};if(s.hostId!==e.id)return{error:"host_only"};const i={...s,endedAt:Date.now(),broadcastReady:!1},a=[i,...(t.history||[]).filter(r=>r.id!==i.id)].slice(0,20);return Pe({active:null,history:a}),{session:i}}const rr=["song","album","video","live","app","interview"],pa=["draft","active","paused","ended"];function gt(e){if(!e||typeof e!="object")return null;const t=e.fundSource==="third_party"?"third_party":"dbs",s=rr.includes(e.promoteType)?e.promoteType:"app",i=pa.includes(e.status)?e.status:"draft",a=Number(e.deadline)||0;return{id:String(e.id||""),title:String(e.title||"").slice(0,120),promoteType:s,budget:Math.max(0,Number(e.budget)||0),deadline:a,fundSource:t,managementFeePct:t==="third_party"?20:0,reward:String(e.reward||"").slice(0,200),status:i,participants:Array.isArray(e.participants)?e.participants:[],submissions:Array.isArray(e.submissions)?e.submissions:[],createdAt:Number(e.createdAt)||Date.now(),createdBy:e.createdBy||null}}function Dt(e){u={...u,missions:e},x(u)}function ni({status:e=null}={}){const t=(u.missions||[]).map(gt).filter(Boolean);if(!e)return t;const s=Array.isArray(e)?e:[e];return t.filter(i=>s.includes(i.status))}function jl(e){return ni().find(t=>t.id===e)||null}function Fl(e={}){var n;const t=String(e.title||"").trim().slice(0,120);if(!t)return{error:"required"};const s=rr.includes(e.promoteType)?e.promoteType:"app",i=e.fundSource==="third_party"?"third_party":"dbs";let a=e.deadline;if(typeof a=="string"&&a){const d=Date.parse(a);a=Number.isFinite(d)?d:Date.now()+7*864e5}else a=Number(a)||Date.now()+7*864e5;const r=pa.includes(e.status)?e.status:"active",o=gt({id:"msn_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),title:t,promoteType:s,budget:Number(e.budget)||0,deadline:a,fundSource:i,reward:String(e.reward||"").trim().slice(0,200)||"Demo reward · TEST MODE",status:r,participants:[],submissions:[],createdAt:Date.now(),createdBy:((n=u.user)==null?void 0:n.id)||"demo_admin"});return Dt([o,...u.missions||[]]),o}function Kl(e,t){if(!pa.includes(t))return{error:"bad_status"};let s=null;const i=(u.missions||[]).map(a=>{const r=gt(a);return!r||r.id!==e?a:(s={...r,status:t},s)});return s?(Dt(i),s):{error:"not_found"}}function Gl(e){const t=u.user;if(!t)return{error:"signin"};let s=null;const i=(u.missions||[]).map(a=>{const r=gt(a);if(!r||r.id!==e)return a;if(r.status!=="active")return s={error:"not_active",mission:r},a;if((r.participants||[]).some(d=>d.userId===t.id))return s={error:"already_joined",mission:r},a;const n={userId:t.id,username:t.username||"creator",joinedAt:Date.now(),score:0,referralCode:"REF-"+t.id.slice(0,6).toUpperCase()+"-"+Math.random().toString(36).slice(2,5).toUpperCase()};return s={...r,participants:[...r.participants||[],n]},s});return s?(s.error||Dt(i),s):{error:"not_found"}}function Ul(e,{proof:t=""}={}){const s=u.user;if(!s)return{error:"signin"};const i=String(t||"").trim().slice(0,400);if(!i)return{error:"required"};let a=null;const r=(u.missions||[]).map(o=>{const n=gt(o);if(!n||n.id!==e)return o;if(n.status!=="active")return a={error:"not_active",mission:n},o;if(!(n.participants||[]).some(m=>m.userId===s.id))return a={error:"not_joined",mission:n},o;const c={id:"sub_"+Date.now().toString(36)+Math.random().toString(36).slice(2,5),userId:s.id,username:s.username||"creator",proof:i,at:Date.now(),status:"pending"},p=(n.participants||[]).map(m=>m.userId===s.id?{...m,score:(Number(m.score)||0)+10}:m);return a={...n,participants:p,submissions:[c,...n.submissions||[]]},a});return a?(a.error||Dt(r),a):{error:"not_found"}}function Vl(e,t=5){const s=u.user;if(!s)return{error:"signin"};const i=Math.max(1,Math.min(50,Number(t)||5));let a=null;const r=(u.missions||[]).map(o=>{const n=gt(o);if(!n||n.id!==e)return o;if(!(n.participants||[]).some(p=>p.userId===s.id))return a={error:"not_joined",mission:n},o;const c=(n.participants||[]).map(p=>p.userId===s.id?{...p,score:(Number(p.score)||0)+i}:p);return a={...n,participants:c},a});return a?(a.error||Dt(r),a):{error:"not_found"}}function zl(e){const t=jl(e);return t?[...t.participants||[]].map(s=>({userId:s.userId,username:s.username,score:Number(s.score)||0,referralCode:s.referralCode||"",joinedAt:s.joinedAt,submissions:(t.submissions||[]).filter(i=>i.userId===s.userId).length})).sort((s,i)=>i.score-s.score||(s.joinedAt||0)-(i.joinedAt||0)):[]}function Hl({force:e=!1}={}){if((u.missions||[]).length&&!e)return{skipped:!0,missions:ni()};const s=Date.now(),i=864e5,a=[{id:"msn_demo_song",title:"Push Long Story Short (clip challenge)",promoteType:"song",budget:2500,deadline:s+14*i,fundSource:"dbs",reward:"$50–$200 demo credits by rank · DBS-funded marketing",status:"active",participants:[{userId:"clipper_demo",username:"ClipQueen",joinedAt:s-2*i,score:42,referralCode:"REF-CLIP-AAA"},{userId:"dbs",username:"DatBoiSkeet",joinedAt:s-i,score:28,referralCode:"REF-DBS-001"}],submissions:[{id:"sub_demo1",userId:"clipper_demo",username:"ClipQueen",proof:"https://example.com/tiktok/lss-clip-1 · 12k views",at:s-i,status:"pending"}],createdAt:s-3*i,createdBy:"demo_admin"},{id:"msn_demo_live",title:"Boost Friday Night Live",promoteType:"live",budget:800,deadline:s+5*i,fundSource:"third_party",reward:"Share of $800 pot after 20% management fee",status:"active",participants:[],submissions:[],createdAt:s-i,createdBy:"demo_admin"},{id:"msn_demo_app",title:"Download DBS · invite 3 friends",promoteType:"app",budget:1200,deadline:s+30*i,fundSource:"dbs",reward:"Referral bonus stack · verified installs only",status:"active",participants:[],submissions:[],createdAt:s-5*i,createdBy:"demo_admin"},{id:"msn_demo_ended",title:"Ladies Only teaser push (ended)",promoteType:"video",budget:500,deadline:s-2*i,fundSource:"third_party",reward:"Completed · demo archive",status:"ended",participants:[{userId:"clipper_demo",username:"ClipQueen",joinedAt:s-10*i,score:90,referralCode:"REF-CLIP-OLD"}],submissions:[],createdAt:s-20*i,createdBy:"demo_admin"}].map(gt);return Dt(a),{seeded:a.length,missions:a}}const or=60*1e3,ua=60*1e3,ds=2,ri=3,oi=3,vs=3,Wl=["song","beat","music_video"],Yl=[...Wl,"freestyle"];function lr(){const e=u.spotlight||{};return{nowPlaying:e.nowPlaying||null,queue:Array.isArray(e.queue)?e.queue:[],history:Array.isArray(e.history)?e.history:[],houseIndex:typeof e.houseIndex=="number"?e.houseIndex:0}}function le(e){return u={...u,spotlight:e},x(u),e}function Jl(e){return e==="freestyle"?"Live Freestyle":e==="beat"?"Beat":e==="music_video"?"Music Video":"Song"}function Oi(e,t="ended"){return e?{id:e.id,userId:e.userId,username:e.username,type:e.type,title:e.title,artist:e.artist,startedAt:e.startedAt,endedAt:Date.now(),extensions:e.extensions||0,playCount:e.playCount||1,reason:t}:null}function te(e=Date.now()){let t=lr(),s=t.nowPlaying;if(!s)return Ql(t,e);if(s.house)return t;if(s.type==="freestyle"&&s.endsAt&&e>=s.endsAt&&!s.awaitingPlayAnother){if(Object.keys(s.keepGoingVotes||{}).length>=ri&&(s.extensions||0)<ds&&!s.extensionApplied){s={...s,extensions:(s.extensions||0)+1,endsAt:e+ua,keepGoingVotes:{},extensionApplied:!1,voteWindowOpen:!0};const p={...t,nowPlaying:s};return le(p),p}const r=[Oi(s,"timer"),...t.history||[]].slice(0,30),o=[...t.queue||[]];let n=null,d=typeof t.houseIndex=="number"?t.houseIndex:0;if(o.length){const p=o.shift();n=Ks(p,e)}else n=Gs(pt(d),e);const c={nowPlaying:n,queue:o,history:r,houseIndex:d};return le(c),c}if(s.awaitingPlayAnother&&s.playAnotherDeadline&&e>=s.playAnotherDeadline){const i=Object.keys(s.playAnotherVotes||{}).length,a=s.playCount||1;if(i>=oi&&a<vs){s={...s,awaitingPlayAnother:!1,playAnotherVotes:{},playAnotherDeadline:null,playCount:a+1,title:s.nextTitle||s.title,startedAt:e,endsAt:null,nextTitle:null};const p={...t,nowPlaying:s};return le(p),p}const r=[Oi(s,"play_another_fail"),...t.history||[]].slice(0,30),o=[...t.queue||[]];let n=null,d=typeof t.houseIndex=="number"?t.houseIndex:0;o.length?n=Ks(o.shift(),e):n=Gs(pt(d),e);const c={nowPlaying:n,queue:o,history:r,houseIndex:d};return le(c),c}return t}function Ks(e,t=Date.now()){const s=e.type==="freestyle";return{id:"sp_"+t.toString(36)+"_"+Math.random().toString(36).slice(2,6),userId:e.userId,username:e.username,type:e.type,title:e.title||(s?"Live Freestyle":"Untitled"),artist:e.artist||e.username,cover:e.cover||"",startedAt:t,endsAt:s?t+or:null,extensions:0,playCount:1,keepGoingVotes:{},playAnotherVotes:{},voteWindowOpen:s,awaitingPlayAnother:!1,playAnotherDeadline:null,reactions:{fire:0,heart:0,clap:0},chat:[{id:"c_"+t.toString(36),userId:"system",username:"DBS",text:`${e.username} took the Spotlight · ${Jl(e.type)} · TEST MODE`,at:t,system:!0}]}}function Q(){const e=te();return{nowPlaying:e.nowPlaying||null,queue:[...e.queue||[]],history:[...e.history||[]],houseIndex:typeof e.houseIndex=="number"?e.houseIndex:0,thresholds:{keepGoing:ri,playAnother:oi,maxExtensions:ds,maxUploadStreak:vs,freestyleMs:or}}}function cr(){const e=[];for(const s of ge||[])!s||!s.embed||(s.category==="Music Videos"?e.push({id:s.id,title:s.title,artist:s.artist||"DatBoiSkeet",embed:s.embed,youtube:s.youtube||"",kind:"music_video",chipLabel:"House · Music Video",note:"DatBoiSkeet catalog · original YouTube · not a live act",cover:s.cover||""}):s.category==="Interviews"&&e.push({id:s.id,title:s.title,artist:s.artist||"DatBoiSkeet",embed:s.embed,youtube:s.youtube||"",kind:"interview",chipLabel:"House · Interview",note:"DatBoiSkeet interview · original YouTube · not a live act",cover:s.cover||""}));const t=(Li||[]).find(s=>s.id==="pl-vlogs");if(t&&t.youtube){const s=String(t.youtube).match(/[?&]list=([^&]+)/),i=s&&s[1];i&&e.push({id:"house-bts-vlogs",title:t.title||"DatBoiSkeet Vlogs",artist:"DatBoiSkeet",embed:"https://www.youtube.com/embed/videoseries?list="+i,youtube:t.youtube,kind:"bts",chipLabel:"House · BTS",note:"Channel vlogs · dedicated BTS clips thin · original YouTube · not a live act",cover:""})}return e}function dr(){const e=cr().length;return e>0?e:1}function pt(e){const t=cr();if(!t.length)return{id:"house_empty",title:"DatBoiSkeet catalog",artist:"DatBoiSkeet",embed:"",youtube:"https://www.youtube.com/@DatBoiSkeet1",kind:"music_video",chipLabel:"House · Music Video",note:"Catalog loading · not a live act",cover:"",status:"House rotation"};const s=(e%t.length+t.length)%t.length;return{...t[s],status:t[s].chipLabel}}function Gs(e,t=Date.now()){return{id:"house_"+(e.id||"x")+"_"+t.toString(36),userId:"dbs",username:"DatBoiSkeet",type:"music_video",house:!0,houseKind:e.kind||"music_video",chipLabel:e.chipLabel||"House · Music Video",title:e.title,artist:e.artist||"DatBoiSkeet",embed:e.embed||"",youtube:e.youtube||"",note:e.note||"House catalog · not a live act",cover:e.cover||"",startedAt:t,endsAt:null,extensions:0,playCount:1,keepGoingVotes:{},playAnotherVotes:{},voteWindowOpen:!1,awaitingPlayAnother:!1,playAnotherDeadline:null,reactions:{fire:0,heart:0,clap:0},chat:[{id:"c_house_"+t.toString(36),userId:"system",username:"DBS",text:`House catalog · ${e.chipLabel||"House"} · ${e.title} · not a live act · TEST MODE`,at:t,system:!0}]}}function Ql(e,t=Date.now()){if(e.nowPlaying)return e;const s=typeof e.houseIndex=="number"?e.houseIndex:0,i=pt(s),a=Gs(i,t),r={...e,nowPlaying:a,houseIndex:s};return le(r),r}function pr(){const e=lr();return pt(typeof e.houseIndex=="number"?e.houseIndex:0)}function Xl({type:e="song",title:t="",artist:s=""}={}){const i=u.user;if(!i)return{error:"signin"};const a=Yl.includes(e)?e:"song",r=te(),o=i.id,n=(r.queue||[]).some(y=>y.userId===o),d=r.nowPlaying&&!r.nowPlaying.house&&r.nowPlaying.userId===o&&!r.nowPlaying.awaitingPlayAnother;if(n||d)return{error:"already_queued",state:Q()};const c=String(t||"").trim().slice(0,80)||(a==="freestyle"?"Live Freestyle":a==="beat"?"Untitled Beat":a==="music_video"?"Untitled MV":"Untitled Song"),p=String(s||i.username||"").trim().slice(0,60),m={id:"q_"+Date.now().toString(36),userId:o,username:i.username,type:a,title:c,artist:p,cover:"",joinedAt:Date.now()};let g=r.nowPlaying,f=[...r.queue||[]],b=typeof r.houseIndex=="number"?r.houseIndex:0;return g?(g.house,f.push(m)):(g=Ks(m),f=[]),le({...r,nowPlaying:g,queue:f,houseIndex:b}),{ok:!0,state:Q()}}function Ga(){const e=u.user;if(!e)return{error:"signin"};const t=te(),s=(t.queue||[]).length,i=(t.queue||[]).filter(a=>a.userId!==e.id);return i.length===s?{error:"not_in_queue"}:(le({...t,queue:i}),{ok:!0,state:Q()})}function Zl(e){if(!u.user)return{error:"signin"};const s=te(),i=(s.queue||[]).filter(a=>a.id!==e);return le({...s,queue:i}),{ok:!0,state:Q()}}function ur(e="advance"){if(!u.user)return{error:"signin"};const s=te(),i=s.nowPlaying,a=!!(i&&i.house),r=i&&!a?[Oi(i,e),...s.history||[]].slice(0,30):[...s.history||[]],o=[...s.queue||[]];let n=typeof s.houseIndex=="number"?s.houseIndex:0;a&&(n=(n+1)%dr());let d=null;return o.length?d=Ks(o.shift()):d=Gs(pt(n)),le({nowPlaying:d,queue:o,history:r,houseIndex:n}),{ok:!0,state:Q()}}function ec(){return ur("skip")}function tc(){const e=u.user;if(!e)return{error:"signin"};const t=te(),s=t.nowPlaying;if(!s)return{error:"empty_stage"};if(s.house)return{error:"house_use_skip"};if(s.type==="freestyle")return{error:"freestyle_use_timer"};if(s.awaitingPlayAnother)return{error:"already_voting"};!(s.userId===e.id)&&H();const a=s.playCount||1;if(a>=vs)return ur("max_streak");const r={...s,awaitingPlayAnother:!0,playAnotherVotes:{},playAnotherDeadline:Date.now()+30*1e3,nextTitle:s.title+" (take "+(a+1)+")"};return le({...t,nowPlaying:r}),{ok:!0,state:Q()}}function sc(){const e=u.user;if(!e)return{error:"signin"};const t=te(),s=t.nowPlaying;if(!s||s.type!=="freestyle")return{error:"no_freestyle"};if(!s.voteWindowOpen)return{error:"window_closed"};if(s.awaitingPlayAnother)return{error:"wrong_mode"};if((s.extensions||0)>=ds)return{error:"max_extensions"};const i={...s.keepGoingVotes||{}};if(i[e.id])return{error:"already_voted",state:Q()};i[e.id]=Date.now();let a={...s,keepGoingVotes:i};const r=Object.keys(i).length;return r>=ri&&(s.extensions||0)<ds&&(a={...a,extensions:(s.extensions||0)+1,endsAt:Date.now()+ua,keepGoingVotes:{},voteWindowOpen:!0}),le({...t,nowPlaying:a}),{ok:!0,state:Q(),votes:Object.keys(a.keepGoingVotes||{}).length||r}}function ic(e=2){const t=te(),s=t.nowPlaying;if(!s||s.type!=="freestyle")return{error:"no_freestyle"};const i={...s.keepGoingVotes||{}},a=Object.keys(i).length;for(let n=0;n<e;n++){const d="fan_sim_"+(a+n)+"_"+Date.now().toString(36);i[d]=Date.now()}let r={...s,keepGoingVotes:i};return Object.keys(i).length>=ri&&(s.extensions||0)<ds&&(r={...r,extensions:(s.extensions||0)+1,endsAt:Date.now()+ua,keepGoingVotes:{},voteWindowOpen:!0}),le({...t,nowPlaying:r}),{ok:!0,state:Q()}}function ac(){const e=u.user;if(!e)return{error:"signin"};const t=te(),s=t.nowPlaying;if(!s||!s.awaitingPlayAnother)return{error:"no_vote"};const i={...s.playAnotherVotes||{}};if(i[e.id])return{error:"already_voted",state:Q()};i[e.id]=Date.now();let a={...s,playAnotherVotes:i};const r=Object.keys(i).length,o=s.playCount||1;return r>=oi&&o<vs&&(a={...a,awaitingPlayAnother:!1,playAnotherVotes:{},playAnotherDeadline:null,playCount:o+1,title:s.nextTitle||s.title,startedAt:Date.now(),endsAt:null,nextTitle:null}),le({...t,nowPlaying:a}),{ok:!0,state:Q()}}function nc(e=2){const t=te(),s=t.nowPlaying;if(!s||!s.awaitingPlayAnother)return{error:"no_vote"};const i={...s.playAnotherVotes||{}},a=Object.keys(i).length;for(let d=0;d<e;d++)i["fan_pa_"+(a+d)+"_"+Date.now().toString(36)]=Date.now();let r={...s,playAnotherVotes:i};const o=Object.keys(i).length,n=s.playCount||1;return o>=oi&&n<vs&&(r={...r,awaitingPlayAnother:!1,playAnotherVotes:{},playAnotherDeadline:null,playCount:n+1,title:s.nextTitle||s.title,startedAt:Date.now(),endsAt:null,nextTitle:null}),le({...t,nowPlaying:r}),{ok:!0,state:Q()}}function rc(e="fire"){const t=te(),s=t.nowPlaying;if(!s)return{error:"empty_stage"};const i=["fire","heart","clap"].includes(e)?e:"fire",a={...s.reactions||{fire:0,heart:0,clap:0}};return a[i]=(a[i]||0)+1,le({...t,nowPlaying:{...s,reactions:a}}),{ok:!0,state:Q()}}function oc(e){const t=u.user;if(!t)return{error:"signin"};const s=String(e||"").trim().slice(0,200);if(!s)return{error:"empty"};const i=te(),a=i.nowPlaying;if(!a)return{error:"empty_stage"};const r=[...a.chat||[],{id:"c_"+Date.now().toString(36),userId:t.id,username:t.username,text:s,at:Date.now()}].slice(-40);return le({...i,nowPlaying:{...a,chat:r}}),{ok:!0,state:Q()}}function lc(e=20){return(te().history||[]).slice(0,e)}function _e(){const e=u.fanClubs||{clubs:[],posts:{},seeded:!1};return{clubs:Array.isArray(e.clubs)?e.clubs:[],posts:e.posts&&typeof e.posts=="object"?e.posts:{},seeded:!!e.seeded}}function Mt(e){u={...u,fanClubs:e},x(u)}function mr(e){return e+"_"+Date.now().toString(36)+Math.random().toString(36).slice(2,7)}function hr(){return qe(),_e().clubs.slice().sort((e,t)=>e.official&&!t.official?-1:!e.official&&t.official?1:(t.memberCount||0)-(e.memberCount||0))}function bs(e){return qe(),_e().clubs.find(t=>t.id===e)||null}function qe({force:e=!1}={}){const t=_e();if(t.seeded&&!e&&t.clubs.length>0)return{skipped:!0,clubs:t.clubs};const s=Date.now(),i=864e5,a=[{id:"fc_official_dbs",name:"DatBoiSkeet Official",description:"Official DatBoiSkeet fan club inside DBS Lounge. Music drops, Vault tips, Foreign X-Change, and community rules — DBS branding first. Follow optional.",graphic:"/brand/logo-dbs-v3@2x.webp",hostId:"dbs",hostName:"DatBoiSkeet",privacy:"public",official:!0,members:["dbs"],followers:["dbs"],mods:["dbs"],memberCount:1,createdAt:s-14*i},{id:"fc_lss_crew",name:"Long Story Short Crew",description:"Creator club for LSS listeners. Public lounge chat + Skeet+ members-only drop room.",graphic:"/music/01_Long_Story_Short_Coming_Soon.jpg",hostId:"dbs",hostName:"DatBoiSkeet",privacy:"members",official:!1,members:["dbs"],followers:["dbs"],mods:["dbs"],memberCount:1,createdAt:s-7*i},{id:"fc_ladies_only",name:"Ladies Only Circle",description:"Paid / Skeet+ gated room demo for Ladies Only supporters. Unlock via membership TEST MODE.",graphic:"/music/02_Ladies_Only_Coming_Soon.jpg",hostId:"dbs",hostName:"DatBoiSkeet",privacy:"paid",official:!1,members:["dbs"],followers:[],mods:["dbs"],memberCount:1,createdAt:s-3*i}],r={fc_official_dbs:[{id:"fcp_welcome",userId:"dbs",username:"DatBoiSkeet",text:"Welcome to the official club. Discover music on #/music · explore more on #/explore. No forced follows.",at:s-2*i,pinned:!0,removed:!1},{id:"fcp_lounge",userId:"dbs",username:"DatBoiSkeet",text:"DBS Lounge rooms stay music-first. Keep it respectful — see Community Guidelines.",at:s-i,pinned:!1,removed:!1}],fc_lss_crew:[{id:"fcp_lss1",userId:"dbs",username:"DatBoiSkeet",text:"LSS cover art is live in Coming Soon. Members can discuss theories here.",at:s-i,pinned:!1,removed:!1}],fc_ladies_only:[{id:"fcp_lo1",userId:"dbs",username:"DatBoiSkeet",text:"Skeet+ members-only preview chat. Join Skeet+ on Pricing (TEST MODE) to unlock.",at:s-12*36e5,pinned:!0,removed:!1}]};return Mt({clubs:a,posts:r,seeded:!0}),{seeded:a.length,clubs:a}}function cc({name:e,description:t,graphic:s,privacy:i="public"}={}){const a=u.user;if(!a)return{error:"signin"};H()||a.role==="creator"||a.id;const r=String(e||"").trim().slice(0,48);if(!r)return{error:"name"};const o=["public","members","paid"].includes(i)?i:"public";qe();const n=_e(),d={id:mr("fc"),name:r,description:String(t||"").trim().slice(0,280),graphic:String(s||"/brand/logo-dbs-v3@2x.webp").slice(0,200),hostId:a.id,hostName:a.username,privacy:o,official:!1,members:[a.id],followers:[a.id],mods:[a.id],memberCount:1,createdAt:Date.now()};return Mt({...n,clubs:[d,...n.clubs],posts:{...n.posts,[d.id]:[]},seeded:!0}),{ok:!0,club:d}}function li(e,t){qe();const s=_e(),i=s.clubs.findIndex(o=>o.id===e);if(i<0)return{error:"missing"};const a=t({...s.clubs[i]});if(a&&a.error)return a;const r=s.clubs.slice();return r[i]=a,Mt({...s,clubs:r}),{ok:!0,club:a}}function gr(e){const t=u.user;return t?li(e,s=>{const i=new Set(s.members||[]);return i.add(t.id),{...s,members:[...i],memberCount:i.size}}):{error:"signin"}}function dc(e){const t=u.user;return t?li(e,s=>{if(s.hostId===t.id)return{error:"host"};const i=(s.members||[]).filter(a=>a!==t.id);return{...s,members:i,memberCount:i.length}}):{error:"signin"}}function pc(e){const t=u.user;return t?li(e,s=>{const i=new Set(s.followers||[]);return i.add(t.id),{...s,followers:[...i]}}):{error:"signin"}}function uc(e){const t=u.user;return t?li(e,s=>{const i=(s.followers||[]).filter(a=>a!==t.id);return{...s,followers:i}}):{error:"signin"}}function fr(e){const t=u.user;if(!t)return!1;const s=bs(e);return!!(s&&(s.members||[]).includes(t.id))}function mc(e){const t=u.user;if(!t)return!1;const s=bs(e);return!!(s&&(s.followers||[]).includes(t.id))}function ps(e){const t=u.user;if(!t)return!1;const s=bs(e);return s?H()||s.hostId===t.id||(s.mods||[]).includes(t.id):!1}function vr(e){const t=bs(e);if(!t)return{ok:!1,reason:"missing"};if(t.privacy==="public")return{ok:!0,reason:"public"};if(t.privacy==="members")return fr(e)||ps(e)?{ok:!0,reason:"member"}:{ok:!1,reason:"members"};if(t.privacy==="paid"){const s=mt();return({null:0,"skeet+":1,backstage:2,inner:3}[s||"null"]||0)>=1||ps(e)?{ok:!0,reason:"paid"}:{ok:!1,reason:"paid"}}return{ok:!0,reason:"public"}}function hc(e){return qe(),(_e().posts[e]||[]).filter(s=>!s.removed).slice().sort((s,i)=>s.pinned&&!i.pinned?-1:!s.pinned&&i.pinned?1:(i.at||0)-(s.at||0))}function gc(e,t){const s=u.user;if(!s)return{error:"signin"};const i=vr(e);if(!i.ok)return{error:"gated",reason:i.reason};const a=String(t||"").trim().slice(0,500);if(!a)return{error:"empty"};const r=_e();if(!r.clubs.some(d=>d.id===e))return{error:"missing"};const o={id:mr("fcp"),userId:s.id,username:s.username,text:a,at:Date.now(),pinned:!1,removed:!1},n=[o,...r.posts[e]||[]].slice(0,100);return Mt({...r,posts:{...r.posts,[e]:n}}),{ok:!0,post:o}}function fc(e,t){if(!ps(e))return{error:"mod"};const s=_e(),i=(s.posts[e]||[]).map(a=>a.id===t?{...a,pinned:!a.pinned}:a);return Mt({...s,posts:{...s.posts,[e]:i}}),{ok:!0}}function vc(e,t){if(!ps(e))return{error:"mod"};const s=_e(),i=(s.posts[e]||[]).map(a=>a.id===t?{...a,removed:!0}:a);return Mt({...s,posts:{...s.posts,[e]:i}}),{ok:!0}}const ma=["instagram","tiktok","facebook","youtube","x","snapchat","other"],br=[{id:"badge",minVerified:1,label:"Exclusive DBS badge",kind:"badge"},{id:"decoration",minVerified:2,label:"Premium avatar decoration",kind:"decoration"},{id:"skeet7",minVerified:3,label:"7 days Skeet+ (TEST MODE)",kind:"membership_trial",membership:"skeet+",days:7},{id:"skeet30",minVerified:3,requireAllLinked:!0,label:"30 days Skeet+ (all linked · min 3)",kind:"membership_trial",membership:"skeet+",days:30}],yr=[{n:1,id:"m1",label:"Profile decoration",kind:"decoration"},{n:3,id:"m3",label:"7 days Skeet+ (TEST MODE)",kind:"membership_trial",membership:"skeet+",days:7},{n:5,id:"m5",label:"30 days Skeet+ (TEST MODE)",kind:"membership_trial",membership:"skeet+",days:30},{n:10,id:"m10",label:"Premium profile bundle",kind:"bundle"},{n:25,id:"m25",label:"30 days Backstage (TEST MODE)",kind:"membership_trial",membership:"backstage",days:30},{n:50,id:"m50",label:"30 days Inner Circle (TEST MODE)",kind:"membership_trial",membership:"inner",days:30},{n:100,id:"m100",label:"Founder Promoter badge / VIP",kind:"badge"}];function kr(){return{platformsLinked:[],challenge:null,submissions:[],rewardsClaimed:[]}}function wr(){return{code:"",invitees:[],milestonesClaimed:[]}}function Sr(e){const t=kr();return!e||typeof e!="object"?t:{platformsLinked:Array.isArray(e.platformsLinked)?e.platformsLinked:[],challenge:e.challenge&&typeof e.challenge=="object"?e.challenge:null,submissions:Array.isArray(e.submissions)?e.submissions:[],rewardsClaimed:Array.isArray(e.rewardsClaimed)?e.rewardsClaimed:[]}}function $r(e){const t=wr();return!e||typeof e!="object"?t:{code:typeof e.code=="string"?e.code:"",invitees:Array.isArray(e.invitees)?e.invitees:[],milestonesClaimed:Array.isArray(e.milestonesClaimed)?e.milestonesClaimed:[]}}function Ke(e){return u={...u,shareEarn:Sr(e)},x(u),u.shareEarn}function Xe(e){return u={...u,referEarn:$r(e)},x(u),u.referEarn}function xr(e){if(!e)return"DBS-GUEST";const t=String(e.username||"fan").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,8)||"FAN",s=String(e.id||"").replace(/^u_/,"").slice(-4).toUpperCase()||"DEMO";return`DBS-${t}-${s}`}function ft(e){return e+"_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function Xt(e=Date.now()){return new Date(e).toISOString().slice(0,10)}function U(){return Sr(u.shareEarn)}function Ua(){return ma.slice()}function bc(){return br.map(e=>({...e}))}function yc({platform:e,handle:t="",url:s="",followers:i=""}={}){if(!u.user)return{error:"signin"};const r=String(e||"").toLowerCase().trim();if(!ma.includes(r))return{error:"bad_platform"};const o=String(t||"").trim().replace(/^@+/,"").slice(0,64),n=String(s||"").trim().slice(0,240);if(!o&&!n)return{error:"required"};const d=U();if((d.platformsLinked||[]).some(m=>m.platform===r))return{error:"already_linked",shareEarn:d};const c={id:ft("plat"),platform:r,handle:o,url:n,followers:String(i||"").trim().slice(0,32),linkedAt:Date.now()},p={...d,platformsLinked:[...d.platformsLinked||[],c]};return Ke(p),{ok:!0,platform:c,shareEarn:U()}}function kc(e){const t=U(),s={...t,platformsLinked:(t.platformsLinked||[]).filter(i=>i.id!==e)};return Ke(s),U()}function wc(){if(!u.user)return{error:"signin"};const t=U();if(t.challenge&&t.challenge.status==="active")return{error:"already_active",shareEarn:t};const s=Lt().code,i=Date.now(),a={id:ft("ch"),startedAt:i,endsAt:i+24*60*60*1e3,adTitle:"DatBoiSkeet · Long Story Short & Ladies Only",caption:"🔥 Join me on DBS — music, live, vault & more. Long Story Short + Ladies Only Coming Soon. #DBS #PaidPartnership #ad",trackedLink:`https://dbs.app/s/${s}?utm=share24`,status:"active",disclosure:"Incentivized promotion · disclose #ad / Paid partnership"};return Ke({...t,challenge:a,submissions:[],rewardsClaimed:(t.rewardsClaimed||[]).filter(r=>r.challengeId!==a.id)}),{ok:!0,challenge:a,shareEarn:U()}}function Sc(){const e=U();if(!e.challenge||e.challenge.status!=="active")return{error:"no_active"};const t={...e.challenge,startedAt:Date.now()-25*60*60*1e3,endsAt:Date.now()-1*60*60*1e3,simulatedElapsed:!0};return Ke({...e,challenge:t}),{ok:!0,challenge:t,shareEarn:U()}}function $c(){const e=U();if(!e.challenge)return{error:"none"};const t={...e.challenge,status:"ended",endedAt:Date.now()};return Ke({...e,challenge:t}),{ok:!0,challenge:t,shareEarn:U()}}function xc({platform:e,postUrl:t=""}={}){if(!u.user)return{error:"signin"};const i=U();if(!i.challenge||i.challenge.status!=="active")return{error:"no_challenge"};const a=String(e||"").toLowerCase().trim();if(!ma.includes(a))return{error:"bad_platform"};const r=String(t||"").trim().slice(0,400);if(!r)return{error:"required"};if((i.submissions||[]).some(d=>d.platform===a&&(d.status==="pending"||d.status==="verified")))return{error:"duplicate",shareEarn:i};const n={id:ft("sub"),platform:a,postUrl:r,submittedAt:Date.now(),status:"pending",note:"Awaiting 24h continuous visibility check (manual/demo)"};return Ke({...i,submissions:[n,...i.submissions||[]]}),{ok:!0,submission:n,shareEarn:U()}}function Va(e,t,{note:s=""}={}){if(!["pending","verified","rejected"].includes(t))return{error:"bad_status"};const i=U();let a=null;const r=(i.submissions||[]).map(o=>o.id!==e?o:(a={...o,status:t,verifiedAt:t==="verified"?Date.now():o.verifiedAt||null,note:s||(t==="verified"?"Demo verified · 24h visibility assumed (manual)":t==="rejected"?"Rejected · ineligible / deleted / unverified":o.note)},a));return a?(Ke({...i,submissions:r}),{ok:!0,submission:a,shareEarn:U()}):{error:"not_found"}}function Er(){const e=U();return new Set((e.submissions||[]).filter(s=>s.status==="verified").map(s=>s.platform)).size}function Ar(){const e=U(),t=Er(),s=(e.platformsLinked||[]).length,i=new Set((e.rewardsClaimed||[]).map(a=>a.tierId));return br.filter(a=>{if(i.has(a.id)||t<a.minVerified)return!1;if(a.requireAllLinked){if(s<3)return!1;const r=new Set((e.platformsLinked||[]).map(n=>n.platform)),o=new Set((e.submissions||[]).filter(n=>n.status==="verified").map(n=>n.platform));for(const n of r)if(!o.has(n))return!1}return!0}).map(a=>({...a,verifiedCount:t,linkedCount:s}))}function Ec(e){var o;if(!u.user)return{error:"signin"};const i=Ar().find(n=>n.id===e);if(!i)return{error:"not_claimable"};const a=U(),r={id:ft("srw"),tierId:i.id,label:i.label,kind:i.kind,at:Date.now(),challengeId:((o=a.challenge)==null?void 0:o.id)||null,testMode:!0};return i.membership&&Js(i.membership,!0),Ke({...a,rewardsClaimed:[r,...a.rewardsClaimed||[]]}),{ok:!0,claim:r,shareEarn:U(),membership:mt()}}function Ac(){return Ke(kr()),U()}function ve(){return $r(u.referEarn)}function Cc(){return yr.map(e=>({...e}))}function Lt(){const e=u.user,t=ve();if(t.code)return t;const s=xr(e);return Xe({...t,code:s})}function Cr(){return`https://dbs.app/r/${Lt().code}`}function Tc({username:e=""}={}){const t=u.user;if(!t)return{error:"signin"};const s=Lt(),i=String(e||"").trim().slice(0,24)||"Invitee"+(s.invitees.length+1);if(i.toLowerCase()===String(t.username||"").toLowerCase())return{error:"self_referral"};const a={id:ft("inv"),username:i,signedUpAt:Date.now(),activeDays:[],status:"pending",welcomeClaimed:!1,flaggedFraud:!1};return Xe({...s,invitees:[a,...s.invitees||[]]}),{ok:!0,invitee:a,referEarn:ve()}}function Dc(e){const t=ve();let s=null;const i=(t.invitees||[]).map(a=>a.id!==e?a:a.flaggedFraud?(s={error:"fraud",invitee:a},a):(s={...a,welcomeClaimed:!0,welcomeAt:Date.now()},s));return s?s.error?s:(Xe({...t,invitees:i}),{ok:!0,invitee:s,perk:"Welcome badge / profile decoration (TEST MODE)"}):{error:"not_found"}}function Mc(e,{day:t=null}={}){const s=ve();let i=null;const a=(s.invitees||[]).map(r=>{if(r.id!==e)return r;if(r.flaggedFraud)return i={error:"fraud",invitee:r},r;const o=Number(r.signedUpAt)||Date.now(),n=o+7*864e5;let d=t;if(!d){const g=new Set(r.activeDays||[]);let f=null;for(let b=0;b<7;b++){const y=Xt(o+b*864e5);if(!g.has(y)){f=y;break}}if(!f)return i={error:"window_full",invitee:r},r;d=f}const c=Date.parse(d+"T12:00:00Z");if(!Number.isFinite(c)||c<o-864e5||c>n)return i={error:"outside_window",invitee:r},r;const p=Array.from(new Set([...r.activeDays||[],d])).sort();let m=r.status;return p.length>=3&&(m="active"),i={...r,activeDays:p,status:m},i});return i?i.error?i:(Xe({...s,invitees:a}),{ok:!0,invitee:i,referEarn:ve()}):{error:"not_found"}}function za(e,t=!0){const s=ve();let i=null;const a=(s.invitees||[]).map(r=>{var o;return r.id!==e?r:(i={...r,flaggedFraud:!!t,status:t?"fraud":((o=r.activeDays)==null?void 0:o.length)>=3?"active":"pending"},i)});return i?(Xe({...s,invitees:a}),{ok:!0,invitee:i,referEarn:ve()}):{error:"not_found"}}function Tr(){return(ve().invitees||[]).filter(t=>t.status==="active"&&!t.flaggedFraud).length}function Dr(){const e=ve(),t=Tr(),s=new Set((e.milestonesClaimed||[]).map(i=>i.milestoneId));return yr.filter(i=>t>=i.n&&!s.has(i.id)).map(i=>({...i,activeCount:t}))}function Lc(e){if(!u.user)return{error:"signin"};const i=Dr().find(o=>o.id===e);if(!i)return{error:"not_claimable"};const a=ve(),r={id:ft("rmw"),milestoneId:i.id,n:i.n,label:i.label,kind:i.kind,at:Date.now(),testMode:!0,note:"Distinct from Clippers commissions · TEST MODE · no real billing"};return i.membership&&Js(i.membership,!0),Xe({...a,milestonesClaimed:[r,...a.milestonesClaimed||[]]}),{ok:!0,claim:r,referEarn:ve(),membership:mt()}}function Ic(){const e=u.user;return Xe({...wr(),code:xr(e)}),ve()}function Pc({force:e=!1}={}){if(!u.user)return{error:"signin"};const s=Lt();if(!e&&(s.invitees||[]).length>0)return{error:"already_seeded",referEarn:s};const i=Date.now(),a=864e5,r=[{id:"inv_demo_a",username:"NovaFan",signedUpAt:i-5*a,activeDays:[Xt(i-5*a),Xt(i-4*a),Xt(i-3*a)],status:"active",welcomeClaimed:!0,flaggedFraud:!1},{id:"inv_demo_b",username:"ClipCurious",signedUpAt:i-2*a,activeDays:[Xt(i-2*a)],status:"pending",welcomeClaimed:!0,flaggedFraud:!1},{id:"inv_demo_c",username:"BottyMcBot",signedUpAt:i-6*a,activeDays:[],status:"fraud",welcomeClaimed:!1,flaggedFraud:!0}];return Xe({...s,invitees:r,milestonesClaimed:s.milestonesClaimed||[]}),{ok:!0,seeded:r.length,referEarn:ve()}}const ci=[{id:"youtube",label:"YouTube",color:"#ff4444",hint:"YouTube Live / Studio"},{id:"tiktok",label:"TikTok",color:"#69c9d0",hint:"TikTok LIVE"},{id:"twitch",label:"Twitch",color:"#9146ff",hint:"Twitch Dashboard"},{id:"facebook",label:"Facebook",color:"#1877f2",hint:"Facebook Live"},{id:"instagram",label:"Instagram",color:"#e1306c",hint:"IG Live (demo)"},{id:"kick",label:"Kick",color:"#53fc18",hint:"Kick Studio"},{id:"custom_rtmp",label:"Custom RTMP",color:"#ffb020",hint:"Any RTMP endpoint"}],_c=()=>({freeMaxDestinations:2,houseUnlimited:!0,houseUserIds:["dbs"],tiers:{bronze:{id:"bronze",label:"Bronze",price:4.99,maxDestinations:3,placement:!1,badge:"Bronze Streamer",perks:["3 destination slots","Campaign badge on Go Live"]},silver:{id:"silver",label:"Silver",price:9.99,maxDestinations:5,placement:!0,badge:"Silver Streamer",perks:["5 destination slots","Campaign badge","Explore / Live placement flag"]},gold:{id:"gold",label:"Gold",price:19.99,maxDestinations:7,placement:!0,badge:"Gold Streamer",perks:["All 7 destinations","Campaign badge","Priority Explore / Live placement"]}}});function Is(){return{platforms:{},selected:[],session:null,history:[],ingest:null,campaign:{tier:null,status:"none",enrolledAt:null,cancelledAt:null},campaignConfig:null}}function di(){const e=u.restream||Is();return{...Is(),...e,platforms:e.platforms&&typeof e.platforms=="object"?e.platforms:{},selected:Array.isArray(e.selected)?e.selected:[],history:Array.isArray(e.history)?e.history:[],campaign:{...Is().campaign,...e.campaign||{}}}}function It(e){return u={...u,restream:e},x(u),u.restream}function qc(e){var s,i;if((s=e.ingest)!=null&&s.rtmpUrl&&((i=e.ingest)!=null&&i.streamKey))return e;const t="dbs_demo_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,10);return{...e,ingest:{rtmpUrl:"rtmp://ingest.dbs.local/live",streamKey:t,rotatedAt:Date.now(),note:"TEST MODE demo key · not a real media server"}}}function Ze(){let e=di();const t=e.ingest;return e=qc(e),e.ingest!==t&&It(e),e}function Mr(){const e=Ze();return ci.map(t=>{const s=e.platforms[t.id]||{};return{...t,connected:!!s.connected,connectedAt:s.connectedAt||null,handle:s.handle||"",lastError:s.lastError||null,enabled:s.enabled!==!1}})}function Oc(e,t=""){const s=ci.find(r=>r.id===e);if(!s)return{error:"unknown_platform"};const i=Ze(),a={...i.platforms,[e]:{id:e,connected:!0,connectedAt:Date.now(),handle:String(t||s.label+" Demo").slice(0,40),lastError:null,enabled:!0}};return It({...i,platforms:a}),{ok:!0,platform:Mr().find(r=>r.id===e)}}function Nc(e){var r;const t=Ze();if(!((r=t.platforms[e])!=null&&r.connected))return{error:"not_connected"};const s={...t.platforms,[e]:{...t.platforms[e],connected:!1,disconnectedAt:Date.now(),lastError:null}},i=(t.selected||[]).filter(o=>o!==e);let a=t.session;return a&&!a.endedAt&&(a={...a,destinations:(a.destinations||[]).map(o=>o.id===e?{...o,status:"disconnected",health:"error"}:o)}),It({...t,platforms:s,selected:i,session:a}),{ok:!0}}function Bc(e){const t=Ze(),s=new Set(Object.values(t.platforms).filter(a=>a.connected).map(a=>a.id)),i=(Array.isArray(e)?e:[]).filter(a=>s.has(a)).slice(0,7);return It({...t,selected:i}),{ok:!0,selected:i}}function Rc(e){var i;const t=Ze();if(!((i=t.platforms[e])!=null&&i.connected))return{error:"not_connected"};const s=new Set(t.selected||[]);return s.has(e)?s.delete(e):s.add(e),Bc([...s])}function Lr(){var i,a,r;const e=di(),t=_c(),s=e.campaignConfig||{};return{...t,...s,tiers:{...t.tiers,...s.tiers||{},bronze:{...t.tiers.bronze,...((i=s.tiers)==null?void 0:i.bronze)||{}},silver:{...t.tiers.silver,...((a=s.tiers)==null?void 0:a.silver)||{}},gold:{...t.tiers.gold,...((r=s.tiers)==null?void 0:r.gold)||{}}},freeMaxDestinations:Number(s.freeMaxDestinations)>0?Number(s.freeMaxDestinations):t.freeMaxDestinations,houseUnlimited:s.houseUnlimited!==!1,houseUserIds:Array.isArray(s.houseUserIds)?s.houseUserIds:t.houseUserIds}}function Ir(){return{...Is().campaign,...di().campaign||{}}}function jc(){const e=u.user;if(!e)return!1;const t=Lr();return e.id==="dbs"||e.username==="DatBoiSkeet"?!0:(t.houseUserIds||[]).includes(e.id)}function Pr(){const e=Lr();if(jc()&&e.houseUnlimited)return{max:ci.length,source:"house_free",tier:null};const t=Ir();if(t.status==="active"&&t.tier&&e.tiers[t.tier]){const s=e.tiers[t.tier];return{max:s.maxDestinations,source:"campaign",tier:t.tier,badge:s.badge,placement:!!s.placement}}return{max:e.freeMaxDestinations,source:"free_baseline",tier:null,badge:null,placement:!1}}function Fc(){const e=u.user;if(!e)return{error:"signin"};const t=Ze();if(t.session&&!t.session.endedAt)return{error:"already_live"};const s=Object.values(t.platforms).filter(d=>d.connected).map(d=>d.id);if(!s.length)return{error:"no_platforms"};let i=(t.selected||[]).filter(d=>s.includes(d));if(!i.length)return{error:"none_selected"};const a=Pr();if(i.length>a.max)return{error:"over_cap",max:a.max,selected:i.length,source:a.source};const r=i.map((d,c)=>{const p=ci.find(g=>g.id===d),m=c===i.length-1&&i.length>2?"connecting":"streaming";return{id:d,label:(p==null?void 0:p.label)||d,status:m==="connecting"?"connecting":"streaming",health:m,startedAt:Date.now()}}),o=Ir(),n={id:ft("rs"),hostId:e.id,hostName:e.username,startedAt:Date.now(),destinations:r,selected:i.slice(),campaignTier:o.status==="active"?o.tier:null,campaignBadge:a.badge||null,placement:!!a.placement,testMode:!0,endedAt:null};return It({...t,session:n,selected:i}),{ok:!0,session:n}}function Kc(){const e=Ze();if(!e.session||e.session.endedAt)return{error:"offline"};const t={...e.session,endedAt:Date.now(),destinations:(e.session.destinations||[]).map(i=>({...i,status:i.health==="error"?"error":"ended",health:i.health==="error"?"error":"ended"}))},s=[t,...e.history||[]].slice(0,20);return It({...e,session:null,history:s}),{ok:!0,session:t,history:s}}function Gc(){const e=di().session;return e&&!e.endedAt?e:null}function _r(){const e=D().connectPrefs||{};return{ageConfirmed:!!e.ageConfirmed,rulesAccepted:!!e.rulesAccepted}}function Ha(e={}){const t={..._r(),...e};return t.ageConfirmed||(t.rulesAccepted=!1),xo(s=>({...s,connectPrefs:t})),t}const qr=[{id:"day_one",name:"Day One",blurb:"Joined the Loyalty Club — recognition starts with showing up, not spending.",need:0,kind:"join"},{id:"listener",name:"Listener",blurb:"Logged authorized listening (demo tick). Not purchase-only.",need:1,kind:"listen"},{id:"live_attendee",name:"Live Regular",blurb:"Attended a livestream (demo stub). Healthy participation.",need:1,kind:"live"},{id:"club_member",name:"Club Member",blurb:"Joined a Fan Club discussion community.",need:1,kind:"club"},{id:"helper",name:"Helper",blurb:"Community-helper milestone (welcome tip / guidelines share demo).",need:1,kind:"help"},{id:"top_fan",name:"Top Fan",blurb:"Earned 50+ loyalty points from mixed healthy actions — gifts alone do not unlock this.",needPoints:50}];function Or(e=Date.now()){return new Date(e).toISOString().slice(0,10)}function ys(){const e=u.loyalty||{};return{points:Number(e.points)||0,history:Array.isArray(e.history)?e.history:[],badges:Array.isArray(e.badges)?e.badges:[],publicVisible:e.publicVisible!==!1,lastActionAt:e.lastActionAt&&typeof e.lastActionAt=="object"?e.lastActionAt:{},dayCounts:e.dayCounts&&typeof e.dayCounts=="object"?e.dayCounts:{}}}function ha(e){u={...u,loyalty:e},x(u)}function Uc(){return"loy_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function Vc(e,{cooldownMs:t=8e3,dailyCap:s=8}={}){const i=ys(),a=Date.now(),r=Number(i.lastActionAt[e])||0;if(a-r<t)return{ok:!1,reason:"cooldown"};const o=Or(a);return((i.dayCounts[o]||{})[e]||0)>=s?{ok:!1,reason:"daily_cap"}:{ok:!0}}function zc(e){const t=new Set(e.badges||[]),s={};return(e.history||[]).forEach(i=>{s[i.kind]=(s[i.kind]||0)+1}),qr.forEach(i=>{if(!t.has(i.id)){if(i.needPoints!=null){e.points>=i.needPoints&&t.add(i.id);return}if(i.id==="day_one"){((e.history||[]).length>0||e.points>0)&&t.add(i.id);return}(s[i.kind]||0)>=(i.need||1)&&t.add(i.id)}}),[...t]}function ks(){return ys()}function Hc(e){const t=ys();return ha({...t,publicVisible:!!e}),ks()}function Wc(e,{points:t=5,note:s=""}={}){if(!u.user)return{error:"signin"};const a=Vc(e);if(!a.ok)return{error:a.reason};const r=ys(),o=Date.now(),n=Or(o),d={...r.dayCounts,[n]:{...r.dayCounts[n]||{},[e]:((r.dayCounts[n]||{})[e]||0)+1}},c={id:Uc(),at:o,kind:e,points:t,note:String(s||e).slice(0,120)},p={...r,points:r.points+t,history:[c,...r.history].slice(0,80),lastActionAt:{...r.lastActionAt,[e]:o},dayCounts:d};return p.badges.includes("day_one")||(p.history=p.history),p.badges=zc(p),p.badges.includes("day_one")||(p.badges=["day_one",...p.badges]),ha(p),{ok:!0,loyalty:ks(),entry:c,newBadges:p.badges.filter(m=>!(r.badges||[]).includes(m))}}function Nr(){const e=ks(),t=new Set(e.badges||[]);return qr.map(s=>({...s,unlocked:t.has(s.id)}))}function Yc(){return ha({points:0,history:[],badges:[],publicVisible:!0,lastActionAt:{},dayCounts:{}}),ks()}function vt(){const e=u.openMic||{};return{applications:Array.isArray(e.applications)?e.applications:[],seeded:!!e.seeded,houseIndex:typeof e.houseIndex=="number"?e.houseIndex:0}}function pi(e){u={...u,openMic:e},x(u)}function Jc(){return"om_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function Pt({force:e=!1}={}){const t=vt();if(t.seeded&&!e&&t.applications.length>0)return{skipped:!0,applications:t.applications};const s=Date.now(),i=864e5,a=[{id:"om_demo_approved",userId:"u_ria",username:"RiaLoops",talent:"producer",trackTitle:"Midnight Pads (demo)",profileNote:"Beatmaker · looking to collab on LSS energy",rightsCertified:!0,status:"approved",at:s-10*i,reviewedAt:s-9*i},{id:"om_demo_pending",userId:"u_dez",username:"DezOnMic",talent:"rapper",trackTitle:"Porch Light Freestyle",profileNote:"Opt-in showcase · not pay-to-win",rightsCertified:!0,status:"pending",at:s-2*i},{id:"om_demo_rejected",userId:"u_spam",username:"SpamBeats",talent:"dj",trackTitle:"Untitled drop",profileNote:"No rights cert honesty",rightsCertified:!1,status:"rejected",at:s-5*i,reviewedAt:s-4*i,reviewNote:"Rights certification required"}],r=typeof t.houseIndex=="number"?t.houseIndex:0;return pi({applications:a,seeded:!0,houseIndex:r}),{seeded:a.length,applications:a}}function Ni({status:e=null}={}){Pt();let t=vt().applications.slice();return e&&(t=t.filter(s=>s.status===e)),t.sort((s,i)=>(i.at||0)-(s.at||0))}function Qc(){return Ni({status:"approved"})}function Xc(){const e=vt();return pt(typeof e.houseIndex=="number"?e.houseIndex:0)}function Zc(){const e=vt(),t=((typeof e.houseIndex=="number"?e.houseIndex:0)+1)%dr();return pi({...e,houseIndex:t}),pt(t)}function ed({talent:e="rapper",trackTitle:t="",profileNote:s="",rightsCertified:i=!1}={}){const a=u.user;if(!a)return{error:"signin"};if(!i)return{error:"rights"};const r=String(t||"").trim().slice(0,80);if(!r)return{error:"title"};Pt();const o=vt();if(o.applications.some(d=>d.userId===a.id&&d.status==="pending"))return{error:"pending"};const n={id:Jc(),userId:a.id,username:a.username,talent:String(e||"other").slice(0,32),trackTitle:r,profileNote:String(s||"").trim().slice(0,240),rightsCertified:!0,status:"pending",at:Date.now()};return pi({...o,applications:[n,...o.applications],seeded:!0}),{ok:!0,application:n}}function Bi(e,t,s=""){if(!H())return{error:"admin"};if(!["pending","approved","rejected"].includes(t))return{error:"status"};const a=vt();let r=null;const o=a.applications.map(n=>n.id!==e?n:(r={...n,status:t,reviewedAt:Date.now(),reviewNote:String(s||"").slice(0,160)},r));return r?(pi({...a,applications:o}),{ok:!0,application:r}):{error:"missing"}}function td(){var $,A;Pt(),qe();try{ws(),Ie()}catch{}const e=vt().applications||[],t={pending:0,approved:0,rejected:0};e.forEach(k=>{const L=k.status||"pending";t[L]!==void 0?t[L]+=1:t.pending+=1});const s=e.filter(k=>k.status==="pending").sort((k,L)=>(L.at||0)-(k.at||0)),i=_e().clubs.slice().sort((k,L)=>(L.createdAt||0)-(k.createdAt||0)),a=i.slice(0,5).map(k=>({id:k.id,name:k.name,privacy:k.privacy,official:!!k.official,memberCount:k.memberCount||(k.members||[]).length||0,createdAt:k.createdAt||0})),r=ys(),n=Nr().filter(k=>k.unlocked),d=Qe(),c=ia();let p=0,m=0,g=0,f=0,b=0;c.forEach(k=>{p=I(p+(k.gross||0)),m=I(m+(k.fees||0)),g=I(g+(k.creatorShare||0)),f=I(f+(k.dbsShare||0)),b+=k.count||0});const y=u.wallet||{balance:0},v=u.catalog||[],w=jn();return{openMic:{total:e.length,byStatus:t,pending:s},fanClubs:{total:i.length,recent:a},loyalty:{points:r.points||0,badgeCount:n.length,badges:n.map(k=>k.name||k.id),publicVisible:r.publicVisible!==!1,historyCount:(r.history||[]).length,note:"Device-local loyalty for signed-in user · not a multi-fan leaderboard"},revenue:{demo:!0,chip:"demo figures · not production",gross:p,fees:m,creatorShare:g,dbsShare:f,earnCount:b,creatorAvailable:I(d.available||0),creatorHolds:I(d.holds||0),fanWalletBalance:Number(y.balance)||0,byCategory:c.filter(k=>k.count>0),catalogPublished:v.filter(k=>k.published).length,catalogTotal:v.length},moderation:{warnings:[],suspensions:[],note:"Stub · Content Polish owns Guidelines copy"},hotFeed:{openAlerts:(u.engagementAlerts||[]).filter(k=>!k.handledAt).length,totalAlerts:(u.engagementAlerts||[]).length,hotPosts:Array.isArray(($=u.hotFeed)==null?void 0:$.posts)?u.hotFeed.posts.length:0,hotLives:Array.isArray((A=u.hotFeed)==null?void 0:A.lives)?u.hotFeed.lives.length:0,note:"§38 · Build posts + Live Social lives"},stats:w}}const sd={frames:"frame",effects:"effect",banners:"banner","name styles":"nameStyle",badges:"badge"},Wa=["frame-rodeo-gold","fx-snowfall","ban-skyline","name-neon","badge-dayone"];function id(e){const t=e&&typeof e=="object"?e:{},s={};return["frame","effect","banner","nameStyle","badge"].forEach(i=>{typeof t[i]=="string"&&t[i]&&(s[i]=t[i])}),s}function _t(){const e=u.profileShop||{};return{owned:Array.isArray(e.owned)?[...new Set(e.owned.map(String))]:[],equipped:id(e.equipped),reduceMotion:!!e.reduceMotion}}function qt(e){u={...u,profileShop:e},x(u)}function We(){return _t()}function Br(e){return e&&sd[e.category]||null}function ad(e){const t=String(e||"");if(!t)return{error:"missing"};const s=_t();return s.owned.includes(t)?{ok:!0,already:!0,shop:We()}:(qt({...s,owned:[...s.owned,t]}),{ok:!0,shop:We()})}function nd(){const e=_t(),t=new Set(e.owned);return Wa.forEach(s=>t.add(s)),qt({...e,owned:[...t]}),{ok:!0,unlocked:Wa,shop:We()}}function rd(e){const t=String(e||"");return t.startsWith("frame-")?"frame":t.startsWith("fx-")?"effect":t.startsWith("ban-")?"banner":t.startsWith("name-")?"nameStyle":t.startsWith("badge-")?"badge":null}function od(e){const t=String(e||""),s=_t();if(!s.owned.includes(t))return{error:"not_owned"};const i=rd(t);if(!i)return{error:"unknown_item"};const a={...s.equipped,[i]:t};return qt({...s,equipped:a}),{ok:!0,slot:i,shop:We()}}function ld(e){const t=String(e||"");if(!["frame","effect","banner","nameStyle","badge"].includes(t))return{error:"bad_slot"};const s=_t(),i={...s.equipped};return delete i[t],qt({...s,equipped:i}),{ok:!0,shop:We()}}function cd(e){const t=_t();return qt({...t,reduceMotion:!!e}),We()}function dd(){return qt({owned:[],equipped:{},reduceMotion:!1}),We()}const pd=5,ud=8,md=[{id:"hp_maya_1",userId:"maya",username:"MayaBeats",text:"Studio loop dropping later — who wants the stem pack? 🔥",image:"/music/01_Long_Story_Short_Coming_Soon.jpg",mediaType:"image",atOffset:36e5*5,likeUsers:["dbs","fanjay","u_seed_a","u_seed_b","u_seed_c","u_seed_d","clipqueen"],comments:[{id:"hc_m1",userId:"fanjay",username:"FanJay",text:"Send it 🙌"},{id:"hc_m2",userId:"dbs",username:"DatBoiSkeet",text:"Pull up on Spotlight"},{id:"hc_m3",userId:"clipqueen",username:"ClipQueen",text:"Stem pack please"}],shares:5},{id:"hp_jay_1",userId:"fanjay",username:"FanJay",text:"Foreign X-Change fit check from the community — buffalo energy.",image:"/merch/03_blue_buffalo_jacket.jpeg",mediaType:"image",atOffset:36e5*8,likeUsers:["maya","dbs","u_seed_a","u_seed_c","u_seed_d","clipqueen","u_seed_b"],comments:[{id:"hc_j1",userId:"maya",username:"MayaBeats",text:"Jacket hits"},{id:"hc_j2",userId:"clipqueen",username:"ClipQueen",text:"Need this"}],shares:6},{id:"hp_clip_1",userId:"clipqueen",username:"ClipQueen",text:"New clip cut from last Live — tag @DatBoiSkeet if you remix 🎬",image:"/merch/06_black_ptsd_tee.jpeg",mediaType:"video",atOffset:36e5*12,likeUsers:["dbs","maya","fanjay","u_seed_a","u_seed_b","u_seed_c"],comments:[{id:"hc_c1",userId:"dbs",username:"DatBoiSkeet",text:"Clean edit"},{id:"hc_c2",userId:"maya",username:"MayaBeats",text:"Clipping goals"},{id:"hc_c3",userId:"fanjay",username:"FanJay",text:"Saved"},{id:"hc_c4",userId:"u_seed_a",username:"FanA",text:"Fire"}],shares:4},{id:"hp_dbs_boost",userId:"dbs",username:"DatBoiSkeet",text:"Community shoutout — Maya + Jay keeping the feed hot. Keep posting.",image:"/music/02_Ladies_Only_Coming_Soon.jpg",mediaType:"image",atOffset:36e5*3,likeUsers:["maya","fanjay","u_seed_a"],comments:[{id:"hc_d1",userId:"maya",username:"MayaBeats",text:"Grateful 💛"},{id:"hc_d2",userId:"fanjay",username:"FanJay",text:"Lets go"}],shares:2}];function Ee(){const e=u.hotFeed||{};return{lives:Array.isArray(e.lives)?e.lives:[],posts:Array.isArray(e.posts)?e.posts:[],seededLives:!!e.seededLives,seededPosts:!!e.seededPosts,seededPostsVer:Number(e.seededPostsVer)||0}}function Rr(e){u={...u,hotFeed:e},x(u)}function hd(){const e={...u.profiles};let t=!1;const s=(i,a,r)=>{e[i]||(e[i]={id:i,username:a,bio:r,avatar:"",followers:[],following:["dbs"],verified:!1},t=!0)};s("maya","MayaBeats","Creator · beats & live demos"),s("fanjay","FanJay","Day-one fan · playlist curator"),s("clipqueen","ClipQueen","Clipper · community edits"),t&&(u={...u,profiles:e})}function ws(){Bn(),hd();const e=Ee(),t=Number(e.seededPostsVer)||0;if(e.seededPosts&&t>=2)return Ee();if(e.seededPosts&&t<2){const d={...u.likes||{}},c={...u.comments||{}},p={...u.postShares||{}},m=(g,f,b,y)=>{d[g]=[...new Set([...d[g]||[],...f])];const v=new Set((c[g]||[]).map($=>$.id)),w=[...c[g]||[]];(b||[]).forEach($=>{v.has($.id)||w.push({...$,at:$.at||Date.now()})}),c[g]=w,p[g]=Math.max(Number(p[g]||0),y)};return m("hp_maya_1",["dbs","fanjay","u_seed_a","u_seed_b","u_seed_c","u_seed_d","clipqueen"],[{id:"hc_m3",userId:"clipqueen",username:"ClipQueen",text:"Stem pack please"}],5),m("hp_jay_1",["maya","dbs","u_seed_a","u_seed_c","u_seed_d","clipqueen","u_seed_b"],[{id:"hc_j2",userId:"clipqueen",username:"ClipQueen",text:"Need this"}],6),m("hp_clip_1",["dbs","maya","fanjay","u_seed_a","u_seed_b","u_seed_c"],[{id:"hc_c4",userId:"u_seed_a",username:"FanA",text:"Fire"}],4),d.hp_dbs_boost&&(d.hp_dbs_boost=(d.hp_dbs_boost||[]).slice(0,3),p.hp_dbs_boost=Math.min(Number(p.hp_dbs_boost||0),2)),u={...u,likes:d,comments:c,postShares:p,hotFeed:{...e,seededPosts:!0,seededPostsVer:2}},x(u),Ie(),Ee()}const s=new Set((u.posts||[]).map(d=>d.id)),i=[...u.posts||[]],a={...u.likes||{}},r={...u.comments||{}},o={...u.postShares||{}},n=Date.now();return md.forEach(d=>{s.has(d.id)||(i.unshift({id:d.id,userId:d.userId,username:d.username,text:d.text,image:d.image||"",mediaType:d.mediaType||(d.image?"image":"text"),at:n-(d.atOffset||0),house:d.userId==="dbs"}),a[d.id]=[...d.likeUsers||[]],r[d.id]=(d.comments||[]).map(c=>({...c,text:c.text,at:n-(d.atOffset||0)+6e4})),d.shares&&(o[d.id]=d.shares))}),a.p1&&a.p1.length<3&&(a.p1=[...new Set([...a.p1||[],"maya","fanjay","u_seed_a"])]),a.p2&&a.p2.length<2&&(a.p2=[...new Set([...a.p2||[],"maya","fanjay"])]),(!r.p1||r.p1.length<2)&&(r.p1=[...r.p1||[],{id:"hc_p1a",userId:"maya",username:"MayaBeats",text:"Cover art goes crazy",at:n-8e7},{id:"hc_p1b",userId:"fanjay",username:"FanJay",text:"Been waiting on this",at:n-7e7}]),o.p1=Math.max(o.p1||0,2),o.p2=Math.max(o.p2||0,1),u={...u,posts:i,likes:a,comments:r,postShares:o,hotFeed:{...e,seededPosts:!0,seededPostsVer:2}},x(u),Ie(),Ee()}function ui(e){const t=u.likes&&u.likes[e]||[],s=u.comments&&u.comments[e]||[],i=u.postShares&&u.postShares[e]||0;return t.length+s.length+Number(i||0)}function Ie(){const e=Ee(),s=(u.posts||[]).map(n=>{const d=(u.likes&&u.likes[n.id]||[]).length,c=(u.comments&&u.comments[n.id]||[]).length,p=Number(u.postShares&&u.postShares[n.id]||0),m=d+c+p;return{id:n.id,postId:n.id,score:m,likes:d,comments:c,shares:p,username:n.username,userId:n.userId,preview:(n.text||"").slice(0,120),text:n.text||"",image:n.image||"",mediaType:n.mediaType||(n.image?"image":"text"),at:n.at||0,house:n.userId==="dbs"||!!n.house}}).filter(n=>n.score>=pd).sort((n,d)=>d.score-n.score||d.at-n.at).slice(0,ud),i=new Set((e.posts||[]).map(n=>n.postId||n.id)),a=Array.isArray(u.engagementAlerts)?[...u.engagementAlerts]:[],r=new Set(a.filter(n=>n.kind==="post").map(n=>n.refId));s.forEach(n=>{r.has(n.id)||i.has(n.id)&&e.posts.length||(a.unshift({id:"ea_post_"+n.id+"_"+Date.now().toString(36),kind:"post",refId:n.id,title:(n.preview||n.text||"Hot post").slice(0,80),username:n.username,score:n.score,mediaType:n.mediaType||"text",at:Date.now(),handledAt:null,handledNote:null}),r.add(n.id))});const o=a.slice(0,60);return u={...u,hotFeed:{lives:e.lives,seededLives:e.seededLives,posts:s,seededPosts:e.seededPosts||s.length>0,seededPostsVer:Number(e.seededPostsVer)||0},engagementAlerts:o},x(u),Ee()}function gd(e=8){return ws(),Ee().posts.length||Ie(),(Ee().posts||[]).slice(0,Math.max(1,Number(e)||8))}function jr(e){const t=String(e||"");if(!t)return{error:"missing"};if(!(u.posts||[]).find(a=>a.id===t))return{error:"missing"};const i={...u.postShares||{}};return i[t]=Number(i[t]||0)+1,u={...u,postShares:i},x(u),Ie(),{ok:!0,shares:i[t],score:ui(t)}}function fd(e){const t=e||{},s=t.kind==="live"?"live":"post",i=String(t.refId||t.id||"");if(!i)return{error:"missing"};const a=Array.isArray(u.engagementAlerts)?[...u.engagementAlerts]:[],r=a.find(n=>n.kind===s&&n.refId===i&&!n.handledAt);if(r)return{ok:!0,alert:r,deduped:!0};const o={id:t.id||"ea_"+s+"_"+i+"_"+Date.now().toString(36),kind:s,refId:i,title:String(t.title||"Hot item").slice(0,120),username:String(t.username||""),score:Number(t.score)||0,viewers:t.viewers!=null?Number(t.viewers):void 0,gifts:t.gifts!=null?Number(t.gifts):void 0,mediaType:t.mediaType||(s==="live"?"live":"text"),at:t.at||Date.now(),handledAt:t.handledAt||null,handledNote:t.handledNote||null};return u={...u,engagementAlerts:[o,...a].slice(0,60)},x(u),{ok:!0,alert:o}}function Ya({openOnly:e=!0}={}){const t=Array.isArray(u.engagementAlerts)?u.engagementAlerts:[];return(e?t.filter(i=>!i.handledAt):t.slice()).sort((i,a)=>(a.at||0)-(i.at||0))}function Ss(e,t){const s=String(e||"");if(!s)return{error:"missing"};const i=Array.isArray(u.engagementAlerts)?u.engagementAlerts:[];let a=null;const r=i.map(o=>o.id!==s?o:(a={...o,handledAt:Date.now(),handledNote:t!=null?String(t):o.handledNote||"handled"},a));return a?(u={...u,engagementAlerts:r},x(u),{ok:!0,alert:a}):{error:"missing"}}function vd(e){if(!H())return{error:"admin"};const t=u.user;if(!t)return{error:"signin"};const s=String(e||""),i=new Set(u.likes&&u.likes[s]||[]);return i.add(t.id),u={...u,likes:{...u.likes,[s]:[...i]}},x(u),Ie(),{ok:!0,count:i.size,score:ui(s)}}function bd(e,t){if(!H())return{error:"admin"};const s=u.user;if(!s)return{error:"signin"};const i=String(e||""),a=t.trim();if(!a)return{error:"empty"};const r={id:"c_admin_"+Date.now().toString(36),userId:s.id,username:s.username,text:a,at:Date.now(),admin:!0},o=u.comments&&u.comments[i]||[];return u={...u,comments:{...u.comments,[i]:[...o,r]}},x(u),Ie(),{ok:!0,comment:r,score:ui(i)}}function yd(e){if(!H())return{error:"admin"};const t=jr(e);return t.error?t:{ok:!0,shares:t.shares,link:"#/posts",score:t.score}}function ga(e,t){return Math.max(0,Number(e)||0)+Math.max(0,Number(t)||0)*20}function fa(e){if(!e||typeof e!="object")return null;const t=String(e.id||e.liveId||"");if(!t)return null;const s=String(e.hostId||e.userId||""),i=String(e.hostName||e.username||e.handle||"Creator"),a=Math.max(0,Number(e.viewers)||0),r=Math.max(0,Number(e.giftsTotal??e.gifts)||0),o=e.score!=null&&Number.isFinite(Number(e.score))?Number(e.score):ga(a,r);return{id:t,hostId:s,hostName:i,title:String(e.title||"Live"),viewers:a,giftsTotal:r,house:!!e.house,spikedAt:e.spikedAt||null,score:o}}function Fr({force:e=!1}={}){const t=Ee();if(t.seededLives&&!e&&(t.lives||[]).length>0)return{skipped:!0,lives:t.lives.map(fa).filter(Boolean)};const s=[{id:"hl_dbs_house",hostId:"dbs",hostName:"DatBoiSkeet",title:"DBS Live · Listening Session",viewers:8420,giftsTotal:186,house:!0},{id:"hl_dbs_vault",hostId:"dbs",hostName:"DatBoiSkeet",title:"Vault Drop Afterparty · House",viewers:3210,giftsTotal:94,house:!0},{id:"hl_skeetfan",hostId:"u_skeetfanatl",hostName:"SkeetFanATL",title:"ATL reacts · Long Story Short",viewers:1540,giftsTotal:42,house:!1},{id:"hl_vaultwatch",hostId:"u_vaultwatcher",hostName:"VaultWatcher",title:"Vault deep cut night",viewers:980,giftsTotal:61,house:!1},{id:"hl_fxclip",hostId:"u_fxclipper",hostName:"FXClipper",title:"Foreign X-Change clips live",viewers:2210,giftsTotal:28,house:!1},{id:"hl_nightowl",hostId:"u_nightowldbs",hostName:"NightOwlDBS",title:"Late night lounge · chill",viewers:412,giftsTotal:15,house:!1},{id:"hl_longstory",hostId:"u_longstorylistener",hostName:"LongStoryListener",title:"LSS theory hour",viewers:128,giftsTotal:7,house:!1},{id:"hl_ladies",hostId:"u_ladiesonlyfan",hostName:"LadiesOnlyFan",title:"Ladies Only countdown",viewers:67,giftsTotal:3,house:!1}].map(i=>({...i,spikedAt:null,score:ga(i.viewers,i.giftsTotal)}));return Rr({...t,lives:s,seededLives:!0}),{ok:!0,lives:s}}function Kr(){return Fr(),(Ee().lives||[]).map(fa).filter(Boolean).sort((t,s)=>(s.score||0)-(t.score||0)||(s.viewers||0)-(t.viewers||0))}function kd(e){const t=String(e||"");if(!t)return{error:"missing"};Fr();const s=Ee();let i=null;const a=(s.lives||[]).map(o=>{const n=fa(o);if(!n||n.id!==t)return o;const d=180+Math.floor(Math.random()*920),c=4+Math.floor(Math.random()*28),p=n.viewers+d,m=n.giftsTotal+c,g=ga(p,m);return i={...n,viewers:p,giftsTotal:m,score:g,spikedAt:Date.now()},i});if(!i)return{error:"missing"};Rr({...s,lives:a,seededLives:!0});const r=fd({kind:"live",refId:i.id,title:i.title,username:i.hostName,score:i.score,viewers:i.viewers,gifts:i.giftsTotal});return{ok:!0,live:i,alert:(r==null?void 0:r.alert)||null,deduped:!!(r!=null&&r.deduped)}}function wd(){const e=new Date().toISOString().slice(0,10),s=(Zs({publishedOnly:!0,types:["song"]})||[]).map(a=>{const r=Number(a.playsToday)||Number(a.playCount)||Number(a.plays)||0;let o="";return a.coverRef&&!String(a.coverRef).startsWith("idb:")&&(o=a.coverRef),{id:a.id,title:a.title||"Untitled",artist:a.artist||"DatBoiSkeet",cover:o,playsToday:r,href:"#/music",demo:!1,day:e,status:a.status||(a.published?"Published":"Catalog")}}).filter(a=>a.playsToday>0).sort((a,r)=>r.playsToday-a.playsToday||String(a.title).localeCompare(String(r.title)));return s[0]?s[0]:{id:"demo_most_played_lss",title:"Long Story Short",artist:"DatBoiSkeet",cover:"/music/01_Long_Story_Short_Coming_Soon.jpg",playsToday:900+e.split("-").reduce((a,r)=>a+Number(r),0)%400,href:"#/music",demo:!0,day:e,status:"Coming Soon"}}const Ja="https://www.youtube.com/iframe_api";let K=[],ee=0,P=null,$s=!1,Ae=!1,et=!1;const G=new Set;let Qa=!1;function Fe(e){if(!e)return"";try{const t=new URL(e);if(t.hostname.includes("youtu.be"))return t.pathname.slice(1).split("/")[0]||"";const s=t.searchParams.get("v");if(s)return s;const i=t.pathname.match(/\/embed\/([^/?]+)/);if(i)return i[1]==="videoseries"?"":i[1]}catch{}return""}function Xa(e){if(!e)return"";try{return new URL(e).searchParams.get("list")||""}catch{return""}}function $t(e){return e?`https://i.ytimg.com/vi/${e}/hqdefault.jpg`:""}function Sd(){var r,o;const e=[],t=new Set,s=new Set,i=n=>{if(n.playlistId){if(s.has(n.playlistId))return;s.add(n.playlistId)}else if(n.youtubeId){if(t.has(n.youtubeId))return;t.add(n.youtubeId)}else return;e.push(n)};for(const n of rt){const d=((r=n.links)==null?void 0:r.youtube)||"",c=Fe(d)||Fe(((o=n.links)==null?void 0:o.youtubeMusic)||"");c&&i({id:n.id,title:n.title,artist:n.artist||"DatBoiSkeet",cover:n.cover||$t(c),youtubeId:c,youtube:d||`https://www.youtube.com/watch?v=${c}`,embed:`https://www.youtube.com/embed/${c}`,links:{...n.links||{},youtube:d||`https://www.youtube.com/watch?v=${c}`},kind:"track"})}for(const n of _n){const d=Xa(n.youtube)||Xa(n.embed);d&&i({id:n.id,title:n.title,artist:"DatBoiSkeet",cover:$t("DTe4OiX2otg")||"/brand/logo-dbs-v3@2x.webp",playlistId:d,youtube:n.youtube,embed:n.embed||`https://www.youtube.com/embed/videoseries?list=${d}`,links:{youtube:n.youtube,youtubeMusic:oe.youtubeMusic,spotify:oe.spotify,apple:oe.apple},kind:"mix"})}const a=new Set(["Music Videos"]);for(const n of ge){if(!a.has(n.category||"Music Videos")||!n.featured&&!["dirty-money","93","no-love","bouquet","where-im-from","go-2-work"].includes(n.id)&&!n.featured)continue;const d=Fe(n.youtube)||Fe(n.embed);if(!d||t.has(d))continue;const c=rt.find(p=>{var m;return Fe(((m=p.links)==null?void 0:m.youtube)||"")===d});i({id:n.id,title:n.title,artist:n.artist||"DatBoiSkeet",cover:(c==null?void 0:c.cover)||$t(d),youtubeId:d,youtube:n.youtube,embed:n.embed||`https://www.youtube.com/embed/${d}`,links:{youtube:n.youtube,youtubeMusic:`https://music.youtube.com/watch?v=${d}`,...(c==null?void 0:c.links)||{}},kind:"mv"})}return K=e,ee>=K.length&&(ee=0),K}function Re(e){return String(e||"").toLowerCase().replace(/\(.*?\)/g,"").replace(/[^a-z0-9]+/g," ").trim()}function Gr(){var i,a;const e=wd();if(!e)return{item:null,meta:null,playable:!1};const t=Re(e.title),s=K.find(r=>Re(r.title)===t||Re(r.title).includes(t)||t.includes(Re(r.title)));if(s&&(s.youtubeId||s.playlistId))return{item:{...s},meta:e,playable:!0};for(const r of rt){if(Re(r.title)!==t&&!Re(r.title).startsWith(t)&&!t.startsWith(Re(r.title)))continue;const o=((i=r.links)==null?void 0:i.youtube)||"",n=Fe(o)||Fe(((a=r.links)==null?void 0:a.youtubeMusic)||"");return n?{item:{id:r.id,title:r.title,artist:r.artist||"DatBoiSkeet",cover:r.cover||$t(n),youtubeId:n,youtube:o||`https://www.youtube.com/watch?v=${n}`,embed:`https://www.youtube.com/embed/${n}`,links:{...r.links||{},youtube:o||`https://www.youtube.com/watch?v=${n}`},kind:"track"},meta:e,playable:!0}:{item:{id:r.id,title:r.title,artist:r.artist||"DatBoiSkeet",cover:r.cover||e.cover||"",youtube:o||oe.youtube,embed:"",links:{...r.links||{}},kind:"track"},meta:e,playable:!1}}for(const r of ge){if(Re(r.title)!==t&&!Re(r.title).includes(t))continue;const o=Fe(r.youtube)||Fe(r.embed);if(o)return{item:{id:r.id,title:r.title,artist:r.artist||"DatBoiSkeet",cover:$t(o),youtubeId:o,youtube:r.youtube,embed:r.embed||`https://www.youtube.com/embed/${o}`,links:{youtube:r.youtube,youtubeMusic:`https://music.youtube.com/watch?v=${o}`},kind:"mv"},meta:e,playable:!0}}return{item:{id:e.id||"most-played",title:e.title||"Most played",artist:e.artist||"DatBoiSkeet",cover:e.cover||"",youtube:"",embed:"",links:{spotify:oe.spotify,apple:oe.apple,youtubeMusic:oe.youtubeMusic,youtube:oe.youtube},kind:"track"},meta:e,playable:!1}}function Ur(){const e=document.getElementById("spPlayNextMost"),t=document.getElementById("spPlayNextSub"),{meta:s,playable:i}=Gr();if(e){if(!s){e.hidden=!0;return}if(e.hidden=!1,e.dataset.playable=i?"1":"0",e.dataset.demo=s.demo?"1":"0",e.title=i?`Most played today · ${s.title} → Play next`:`Most played today · ${s.title} (Coming Soon / open platform)`,e.setAttribute("aria-label",`Play next — ${s.title}`),t){const a=s.demo?"DEMO · ":"";t.textContent=`${a}Most played today · ${s.title}`}}}function Za(e){if(!e)return-1;if(!K.length)return K.push(e),ee=0,0;let t=K.findIndex(i=>e.youtubeId&&i.youtubeId===e.youtubeId||e.playlistId&&i.playlistId===e.playlistId||i.id===e.id);if(t===ee)return ee;if(t>=0){const[i]=K.splice(t,1);t<ee&&(ee-=1),e=i}const s=Math.min(ee+1,K.length);return K.splice(s,0,e),s}function $d(){var r,o,n,d;const{item:e,meta:t,playable:s}=Gr();if(!t||!e){h("No most-played track yet");return}if(!s){const c=document.getElementById("spOpen"),p=((r=e.links)==null?void 0:r.apple)||((o=e.links)==null?void 0:o.youtubeMusic)||((n=e.links)==null?void 0:n.spotify)||((d=e.links)==null?void 0:d.youtube)||oe.apple;c&&p&&(c.href=p),h(t.demo||t.status==="Coming Soon"?`${t.title} · Coming Soon — no in-app master. Open Music / Stream Everywhere when it drops.`:`${t.title} — open official platform (not in-app audio)`),Ur();return}if(va()||!!et&&Ae&&G.size===0||G.size>0){const c=Za(e);h(c===ee?`Already playing · ${e.title}`:`Queued next · ${e.title}`),pe();return}let a=K.findIndex(c=>e.youtubeId&&c.youtubeId===e.youtubeId||e.playlistId&&c.playlistId===e.playlistId||c.id===e.id);a<0&&(a=Za(e)),Wr(a),h(`Playing · ${e.title}`)}const Ut=[];function Vr(){var e;return(e=window.YT)!=null&&e.Player?Promise.resolve(window.YT):new Promise(t=>{var i;if(Ut.push(t),$s)return;$s=!0;const s=window.onYouTubeIframeAPIReady;if(window.onYouTubeIframeAPIReady=()=>{$s=!1;try{s==null||s()}catch{}const a=window.YT;for(;Ut.length;)try{Ut.shift()(a)}catch{}Et()},document.querySelector(`script[src="${Ja}"]`)){if((i=window.YT)!=null&&i.Player){$s=!1;const a=window.YT;for(;Ut.length;)try{Ut.shift()(a)}catch{}Et()}}else{const a=document.createElement("script");a.src=Ja,a.async=!0,document.head.appendChild(a)}})}function zr(){Vr().then(()=>Et()).catch(()=>{})}function Et(){var r;if(!(document.getElementById("dbsStickyFrame")||document.getElementById("dbsYtHost"))||!((r=window.YT)!=null&&r.Player)||P)return;const t=K[ee],s={autoplay:0,controls:0,rel:0,modestbranding:1,playsinline:1,enablejsapi:1,origin:location.origin},i={height:"1",width:"1",playerVars:s,events:{onReady:()=>{pe()},onStateChange:o=>{o.data===0&&Hr({auto:!0}),pe()},onError:()=>{h("YouTube embed error — Open on YouTube"),pe()}}};t!=null&&t.playlistId?i.playerVars={...s,listType:"playlist",list:t.playlistId}:t!=null&&t.youtubeId?i.videoId=t.youtubeId:i.videoId="DTe4OiX2otg";const a=document.getElementById("dbsStickyFrame")?"dbsStickyFrame":"dbsYtHost";P=new window.YT.Player(a,i)}function us({autoplay:e}={autoplay:!1}){const t=K[ee];if(!t||!(P!=null&&P.cueVideoById)){Et();return}try{t.playlistId?(typeof P.loadPlaylist=="function"?P.loadPlaylist({list:t.playlistId,listType:"playlist",index:0}):typeof P.cuePlaylist=="function"&&P.cuePlaylist({list:t.playlistId,listType:"playlist",index:0}),e&&Ae&&G.size===0&&setTimeout(()=>{try{P.playVideo()}catch{}},250)):t.youtubeId&&(e&&Ae&&G.size===0?P.loadVideoById(t.youtubeId):P.cueVideoById(t.youtubeId))}catch{}pe()}function va(){var e;try{return((e=P==null?void 0:P.getPlayerState)==null?void 0:e.call(P))===1}catch{return!1}}function pe(){var p,m,g;const e=K[ee],t=document.getElementById("spArt"),s=document.getElementById("spTitle"),i=document.getElementById("spSub"),a=document.getElementById("spPlay"),r=document.getElementById("spOpen"),o=document.getElementById("spSource"),n=G.size>0,d=!n&&(et||va());if(t&&e&&(t.src=e.cover||$t(e.youtubeId||"")||"/brand/logo-dbs-v3@2x.webp",t.alt=e.title||""),s&&(s.textContent=(e==null?void 0:e.title)||"PIKK Music"),i&&(Ae?n?i.textContent=`Paused · ${[...G][0]} interrupt`:i.textContent=`${(e==null?void 0:e.artist)||"DatBoiSkeet"} · via YouTube (not Spotify in-app)`:i.textContent="Tap Play · YouTube embed · Stream Everywhere"),a&&(a.textContent=d?"❚❚":"▶",a.setAttribute("aria-label",d?"Pause":"Play PIKK Music"),a.dataset.playing=d?"1":"0"),r&&e){const f=((p=e.links)==null?void 0:p.apple)||((m=e.links)==null?void 0:m.youtubeMusic)||((g=e.links)==null?void 0:g.spotify)||e.youtube||oe.apple;r.href=f,r.title="Open on official platform"}o&&(o.textContent=(e==null?void 0:e.kind)==="mix"?"YT Mix":(e==null?void 0:e.kind)==="mv"?"YT MV":"YouTube");const c=document.getElementById("spBadge");c&&(c.textContent=n?"INTERRUPTED":Ae&&d?"PLAYING · YT":"TEST · YT EMBED"),Ur()}function xd(){var e;if(G.size>0){h("Paused for "+[...G][0]+" — resume when done"),pe();return}Ae=!0,et=!0,zr(),Et();try{if(P!=null&&P.playVideo){const t=(e=P.getPlayerState)==null?void 0:e.call(P);t===-1||t===5||t===void 0?us({autoplay:!0}):P.playVideo()}else{const t=setInterval(()=>{P!=null&&P.playVideo&&(clearInterval(t),us({autoplay:!0}))},120);setTimeout(()=>clearInterval(t),8e3)}}catch{h("Tap Play PIKK Music again if autoplay blocked")}pe()}function Ed({clearDesire:e}={}){var t;e&&(et=!1);try{(t=P==null?void 0:P.pauseVideo)==null||t.call(P)}catch{}pe()}function mi(e="user"){e&&e!=="user"&&G.add(e),Ed({clearDesire:e==="user"}),pe()}function Ad(e){var t;if(e?G.delete(e):G.clear(),G.size===0&&Ae&&et)try{(t=P==null?void 0:P.playVideo)==null||t.call(P)}catch{}pe()}function Us(e){return Ad(e)}function Vs(){mi("video")}function yi(){mi("live")}function Cd(){Us("live")}function ms(){Us("video")}function Hr({auto:e}={}){K.length&&(ee=(ee+1)%K.length,et=!0,e||(Ae=!0),us({autoplay:Ae&&G.size===0}),pe())}function Td(){K.length&&(ee=(ee-1+K.length)%K.length,Ae=!0,et=!0,us({autoplay:G.size===0}),pe())}function Wr(e){e<0||e>=K.length||(ee=e,Ae=!0,G.clear(),et=!0,us({autoplay:!0}),pe())}function Dd(){var e,t,s,i,a,r;Qa||(Qa=!0,(e=document.getElementById("spPlay"))==null||e.addEventListener("click",()=>{G.size>0&&G.clear(),va()?mi("user"):xd()}),(t=document.getElementById("spPrev"))==null||t.addEventListener("click",()=>{G.clear(),Td()}),(s=document.getElementById("spNext"))==null||s.addEventListener("click",()=>{G.clear(),Hr()}),(i=document.getElementById("spOpen"))==null||i.addEventListener("click",o=>{h("Opening external music service (playback depends on provider)")}),(a=document.getElementById("spPlayNextMost"))==null||a.addEventListener("click",()=>{$d()}),(r=document.getElementById("spQueueBtn"))==null||r.addEventListener("click",()=>{const o=document.getElementById("spQueuePanel");if(!o)return;o.hasAttribute("hidden")?(o.removeAttribute("hidden"),o.innerHTML=K.map((d,c)=>`<button type="button" class="sp-q-item${c===ee?" on":""}" data-i="${c}">
              <img src="${d.cover||""}" alt="" width="36" height="36" />
              <span><b>${en(d.title)}</b><small>${en(d.artist)} · ${d.kind}</small></span>
            </button>`).join(""),o.querySelectorAll(".sp-q-item").forEach(d=>{d.addEventListener("click",()=>{Wr(Number(d.dataset.i)),o.setAttribute("hidden","")})})):o.setAttribute("hidden","")}),document.addEventListener("click",o=>{const n=document.getElementById("spQueuePanel");!n||n.hasAttribute("hidden")||!o.target.closest("#spQueuePanel")&&!o.target.closest("#spQueueBtn")&&n.setAttribute("hidden","")}))}function en(e){return String(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}let tn=!1;function Md(){tn||(tn=!0,window.addEventListener("dbs:interrupt-music",e=>{var s;const t=((s=e==null?void 0:e.detail)==null?void 0:s.reason)||"user";mi(t)}))}function Ld(){Sd(),Dd(),Md(),pe(),zr(),setTimeout(()=>Et(),400)}function Id(e){var i,a;const t=e==="/live",s=e==="/videos"||e==="/home"||e==="/music"||e==="/vault";!t&&G.has("live")&&Us("live");for(const[r,o]of[...ae.entries()])if(!document.getElementById(r)){o.playing&&(lt=Math.max(0,lt-1));try{(a=(i=o.player)==null?void 0:i.destroy)==null||a.call(i)}catch{}ae.delete(r)}lt===0&&!s&&G.has("video")&&Us("video"),pe()}const ae=new Map;let lt=0,sn=0;function Ri(e){var s;if(!e||!(e instanceof Element))return!0;const t=e.id||"";return!!(t==="dbsStickyFrame"||t==="dbsYtHost"||(s=e.closest)!=null&&s.call(e,"#dbs-sticky-player, #stickyPlayer, #dbsStickyFrame, #dbsYtHost"))}function ba(e){return e?/youtube\.com\/embed|youtube-nocookie\.com\/embed|youtu\.be\//.test(e):!1}function Pd(e){let t=e.getAttribute("src")||e.src||"";if(!ba(t))return!1;let s=!1;return/[?&]enablejsapi=1(?:&|$)/.test(t)||(t+=(t.includes("?")?"&":"?")+"enablejsapi=1",s=!0),/[?&]origin=/.test(t)||(t+=(t.includes("?")?"&":"?")+"origin="+encodeURIComponent(location.origin),s=!0),s&&(e.setAttribute("src",t),e.src=t),!0}function _d(e){if(e.id&&!ae.has(e.id)&&e.id!=="dbsStickyFrame"&&e.id!=="dbsYtHost"||e.id&&ae.has(e.id))return e.id;sn+=1;const t=`dbs-page-yt-${sn}`;return e.id=t,t}function qd(e,t){const s=ae.get(e);s&&(t.data===1?(s.playing||(s.playing=!0,lt+=1),Vs()):(t.data===0||t.data===2)&&(s.playing&&(s.playing=!1,lt=Math.max(0,lt-1)),lt===0&&ms()))}function Od(e){var r,o;const t=typeof e=="string"?document.getElementById(e):e;if(!t||Ri(t))return Promise.resolve(null);let s=t;if(t.tagName!=="IFRAME"&&(s=((r=t.querySelector)==null?void 0:r.call(t,"iframe"))||t),!s||s.tagName!=="IFRAME"||Ri(s))return Promise.resolve(null);const i=s.getAttribute("src")||s.src||"";if(!ba(i)||!Pd(s))return Promise.resolve(null);const a=_d(s);return ae.has(a)&&((o=ae.get(a))!=null&&o.player)?Promise.resolve(ae.get(a).player):Vr().then(()=>new Promise(n=>{var m;if(ae.has(a)&&((m=ae.get(a))!=null&&m.player)){n(ae.get(a).player);return}const d=()=>{var g;if(!document.getElementById(a)){n(null);return}if(ae.has(a)&&((g=ae.get(a))!=null&&g.player)){n(ae.get(a).player);return}try{const f=new window.YT.Player(a,{events:{onReady:()=>{},onStateChange:b=>qd(a,b),onError:()=>{}}});ae.set(a,{player:f,el:s,playing:!1}),s.dataset.dbsYtBound="1",n(f)}catch(f){console.warn("[dbs] bindYoutubeInterrupt failed",a,f),n(null)}};if(s.dataset.dbsYtBound==="1"&&ae.has(a)){n(ae.get(a).player);return}let c=!1;const p=()=>{c||(c=!0,d())};s.addEventListener("load",p,{once:!0}),setTimeout(p,400)}))}function ya(e){const s=[...(e&&e.querySelectorAll?e:document).querySelectorAll("iframe")].filter(i=>{if(Ri(i))return!1;const a=i.getAttribute("src")||i.src||"";return ba(a)});return Promise.all(s.map(i=>Od(i)))}const zs=new Set;function Oe(){const e=(location.hash||"").replace(/^#/,"")||"/home";let t="",s=e;const i=e.indexOf("#");i>=0&&(t=e.slice(i+1).split("?")[0],s=e.slice(0,i));const a=s.startsWith("/")?s:"/"+s,r=a.indexOf("?"),o=r===-1?a:a.slice(0,r),n=r===-1?"":a.slice(r+1),d=o.split("/").filter(Boolean);return{path:"/"+(d[0]||"home"),parts:d,query:Object.fromEntries(new URLSearchParams(n)),elementId:t,raw:a}}function q(e){const s=(e.startsWith("#")?e:"#"+(e.startsWith("/")?e:"/"+e)).replace(/^#/,"");if((location.hash||"").replace(/^#/,"")===s){zs.forEach(a=>a(Oe()));return}location.hash=s}function Nd(e){return zs.add(e),()=>zs.delete(e)}function Bd(){const e=()=>zs.forEach(t=>t(Oe()));window.addEventListener("hashchange",e),location.hash?e():location.hash="/home"}const ki="/pikk-app/",yt=ki.endsWith("/")?ki.slice(0,-1):ki;function kt(e){if(e==null||e==="")return e;const t=String(e);return/^(https?:|data:|blob:|idb:|#|\/\/)/i.test(t)||yt&&(t===yt||t.startsWith(yt+"/"))?t:t.startsWith("/")?yt+t:(yt||"")+"/"+t}function Rd(e=document){yt&&(e.querySelectorAll("[src]").forEach(t=>{const s=t.getAttribute("src");if(!s)return;const i=kt(s);i!==s&&t.setAttribute("src",i)}),e.querySelectorAll("[srcset]").forEach(t=>{const s=t.getAttribute("srcset");if(!s||!s.includes("/"))return;const i=s.replace(/(^|,\s*)(\/(?!\/)[^\s,]+)/g,(a,r,o)=>r+kt(o));i!==s&&t.setAttribute("srcset",i)}),e.querySelectorAll("[data-zoom]").forEach(t=>{const s=t.getAttribute("data-zoom");if(!s)return;const i=kt(s);i!==s&&t.setAttribute("data-zoom",i)}),e.querySelectorAll("[poster]").forEach(t=>{const s=t.getAttribute("poster");if(!s)return;const i=kt(s);i!==s&&t.setAttribute("poster",i)}))}function jd(e,t){e&&e.querySelectorAll("a[data-path]").forEach(s=>{const i=s.getAttribute("data-path")===t;s.classList.toggle("on",i),i?s.setAttribute("aria-current","page"):s.removeAttribute("aria-current")})}function Fd(e,t){var a,r,o;const s=(o=(r=(a=t==null?void 0:t.querySelector)==null?void 0:a.call(t,"h1"))==null?void 0:r.textContent)==null?void 0:o.replace(/\s+/g," ").trim();return s?s.slice(0,80):(String((e==null?void 0:e.path)||"/home").split("/").filter(Boolean).pop()||"home").replace(/[-_]+/g," ").replace(/\b\w/g,n=>n.toUpperCase())}function Kd(e,t,s,i=document){const a=Fd(e,t);return i.title=`${a} | PIKK`,s&&(s.textContent=`${a} page loaded`),a}function Gd({drawer:e,scrim:t,trigger:s},i,a=!1){var o;if(!e||!t||!s)return;const r=!!i;e.classList.toggle("open",r),e.setAttribute("aria-hidden",String(!r)),e.inert=!r,t.classList.toggle("show",r),s.setAttribute("aria-expanded",String(r)),s.setAttribute("aria-label",r?"Close navigation menu":"Open navigation menu"),r?(o=e.querySelector("button, a[href]"))==null||o.focus():a&&s.focus()}const Ud=Object.freeze([{label:"Songs",href:"#/music?view=songs",detail:"Browse released singles",icon:"♫"},{label:"Albums",href:"#/music?view=albums",detail:"Browse released albums",icon:"▣"},{label:"Beats",href:"#/music?view=beats",detail:"Beat marketplace not yet available",icon:"◉"},{label:"Playlists",href:"#/music?view=playlists",detail:"Verified YouTube playlists",icon:"▤"},{label:"Upload Music",href:"#/music?view=upload",detail:"Creator uploads coming later",icon:"⇧"}]),Vd=Object.freeze({Songs:"music",Albums:"music",Beats:"music",Playlists:"videos","Upload Music":"music"});function Zt(e=!1){const t=document.getElementById("pikkMusicMenu");if(!t||t.hidden)return;t.hidden=!0;const s=document.querySelector('#tabbar a[href="#/music"]');s==null||s.setAttribute("aria-expanded","false"),e&&(s==null||s.focus())}function zd(){let e=document.getElementById("pikkMusicMenu");return e||(e=document.createElement("div"),e.id="pikkMusicMenu",e.className="pikk-create-overlay",e.hidden=!0,e.innerHTML=`<div class="pikk-create-sheet" role="dialog" aria-modal="true" aria-labelledby="pikkMusicMenuTitle">
    <div class="pikk-create-head"><strong id="pikkMusicMenuTitle">Music on PIKK</strong><button type="button" class="btn ghost" data-music-close aria-label="Close music menu">✕</button></div>
    <div class="pikk-create-options pikk-create-grid">
      ${Ud.map(t=>`<a class="pikk-create-tile" href="${t.href}"><span class="pikk-menu-icon" aria-hidden="true">${ns[Vd[t.label]||"music"]}</span><strong class="pikk-menu-title">${t.label}</strong><small>${t.detail}</small></a>`).join("")}
    </div>
    <button type="button" class="pikk-menu-cancel" data-music-close>Cancel</button>
    <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · Beat selling and music uploads are not available yet</p>
  </div>`,document.body.appendChild(e),window.addEventListener("hashchange",()=>Zt()),e.addEventListener("click",t=>{t.target===e||t.target.closest("[data-music-close]")?Zt(!0):t.target.closest(".pikk-create-options a")&&Zt()}),document.addEventListener("keydown",t=>{if(e.hidden||(t.key==="Escape"&&(t.preventDefault(),Zt(!0)),t.key!=="Tab"))return;const s=[...e.querySelectorAll("a[href], button:not([disabled])")],i=s[0],a=s[s.length-1];if(!i){t.preventDefault();return}e.contains(document.activeElement)?t.shiftKey&&document.activeElement===i?(t.preventDefault(),a.focus()):!t.shiftKey&&document.activeElement===a&&(t.preventDefault(),i.focus()):(t.preventDefault(),(t.shiftKey?a:i).focus())}),e)}function Hd(e){var a,r;const t=zd(),s=t.hidden,i=document.getElementById("pikkCreateMenu");s&&i&&!i.hidden&&(i.hidden=!0,(a=document.querySelector('#tabbar a[href="#/create"]'))==null||a.setAttribute("aria-expanded","false")),t.hidden=!s,e==null||e.setAttribute("aria-expanded",String(s)),s?(r=t.querySelector("[data-music-close]"))==null||r.focus():e==null||e.focus()}function Wd(){const e=ge.filter(p=>(p.category||"Music Videos")==="Music Videos"),t=e.filter(p=>p.featured),i=(t.length?t:e.slice(0,6)).slice(0,6).map((p,m)=>{let g="";try{g=new URL(p.youtube).searchParams.get("v")||""}catch{}const f=g?`https://i.ytimg.com/vi/${encodeURIComponent(g)}/hqdefault.jpg`:"";return`<a class="pikk-home-media-card ${m<2?"is-featured":""}" href="${l(p.youtube)}" target="_blank" rel="noopener noreferrer" aria-label="Watch ${l(p.title)} on YouTube">
       ${f?`<img src="${l(f)}" alt="" loading="${m<2?"eager":"lazy"}" decoding="async" referrerpolicy="no-referrer"/>`:'<span class="pikk-home-media-fallback" aria-hidden="true">♫</span>'}
       <span class="pikk-home-media-shadow"></span>
       <span class="pikk-home-media-badge">▶ OFFICIAL VIDEO</span>
       <span class="pikk-home-media-title">${l(p.title)}</span>
     </a>`}).join(""),a=Yn(),r=a?Math.min(100,Math.round(a.raised/(a.targetAmount||1)*100)):0,o=a?Number(a.raised||0):0,n=a?Number(a.targetAmount||50):50,d=`<div class="card home-sell-promo home-app-goal" id="home-app-goal">
      <div class="row" style="justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
        <div>
          <strong style="letter-spacing:.04em">PIKK GOAL</strong>
          <div class="muted" style="font-size:12px;margin-top:2px">$${o} of $${n} · TEST MODE</div>
        </div>
        <button type="button" class="btn primary" id="homeGoalDonate">Donate</button>
      </div>
      <div class="home-goal-bar" style="margin-top:10px" role="progressbar" aria-valuenow="${r}" aria-valuemin="0" aria-valuemax="100">
        <div class="home-goal-fill" style="width:${r}%"></div>
      </div>
    </div>`,c=p=>rs[p]?`<img src="${l(rs[p].cover)}" alt="" loading="lazy" decoding="async"/>`:'<span class="pikk-home-circle-symbol" aria-hidden="true">◆</span>';return`
    <section class="page pikk-home-approved" style="padding-top:8px">
      ${d}

      <section class="pikk-home-visual" id="pikkHomeVisual" style="margin-top:12px">
        <nav class="pikk-home-circle-strip" aria-label="House Pick stories">
          <a class="pikk-home-circle" href="#/posts?compose=1" aria-label="Create">
            <span class="pikk-home-circle-ring pikk-home-circle-symbol" aria-hidden="true">＋</span>
            <span>Create</span>
          </a>
          <a class="pikk-home-circle" href="#/home" aria-label="For You">
            <span class="pikk-home-circle-ring">${c(0)}</span>
            <span>For You</span>
            <small class="pikk-home-circle-tag">HOUSE PICK</small>
          </a>
          <a class="pikk-home-circle" href="#/connect" aria-label="Following">
            <span class="pikk-home-circle-ring">${c(1)}</span>
            <span>Following</span>
            <small class="pikk-home-circle-tag">HOUSE PICK</small>
          </a>
          <a class="pikk-home-circle" href="#/music" aria-label="Music">
            <span class="pikk-home-circle-ring">${c(2)}</span>
            <span>Music</span>
            <small class="pikk-home-circle-tag">HOUSE PICK</small>
          </a>
        </nav>

        <nav class="pikk-home-filterbar" aria-label="Filters">
          <a class="is-current" href="#/explore">All</a>
          <a href="#/videos">Videos</a>
          <a href="#/music">Music</a>
          <a href="#/posts">Photos</a>
          <a href="#/live">Live</a>
        </nav>

        <div class="pikk-home-media-grid" aria-label="Official videos">
          ${i}
        </div>
      </section>
    </section>`}function Yd(){var e;(e=document.getElementById("homeGoalDonate"))==null||e.addEventListener("click",()=>{const t=Yn();if(!t){h("No goal right now");return}try{_i(t.id,50),h("Donated 50 coins (TEST MODE)"),location.hash="#/home"}catch(s){h((s==null?void 0:s.message)||"Donate failed")}})}const Jd="68e82409a20de28fe560bfed35950a24a0e64c9d",Qd=Object.freeze([{title:"Viral Live: Correct Category Destinations",detail:"Viral Clips opens Clips, Songs opens Music, and Photos opens Home. These are links to existing PIKK sections; the 24/7 channel is still a preview, not broadcasting.",route:"#/viral-live",pr:197,kind:"VIRAL LIVE · PREVIEW"},{title:"Viral Live: Mobile Category Visibility",detail:"On narrow phones, keyboard-selected Videos, Viral Clips, Songs and Photos tabs scroll into view without changing the existing swipeable design. Continuous broadcasting is not live.",route:"#/viral-live",pr:196,kind:"VIRAL LIVE · PREVIEW"},{title:"Viral Live: Source Queue Keyboard Browsing",detail:"Use arrow keys or Home/End to select among three original music-video sources. The preview updates its artwork and YouTube source link; this is not a livestream.",route:"#/viral-live",pr:195,kind:"VIRAL LIVE · PREVIEW"},{title:"Explore: Escape Clears Search",detail:"Press Escape in Explore search to clear the query and results while keeping focus in the search field. Existing discovery and profiles remain available.",route:"#/explore",pr:194,kind:"EXPLORE · NAVIGATION"},{title:"Explore: Search Survives Tab Changes",detail:"Keep an Explore search when switching between Trending, Following and Discover; Clear resets the query and results. This improves browsing, not backend search coverage.",route:"#/explore",pr:193,kind:"EXPLORE · NAVIGATION"}]);function Xd(){const e=Jd.slice(0,8),t=Qd.map((s,i)=>`
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
    </article>`).join("");return M("PIKK Updates",`
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
      <div class="pikk-updates-hero-mark"><img src="${l(kt("brand/pikk-official-approved.jpg"))}" alt="PIKK official chrome logo" loading="eager"></div>
    </section>
    <section class="pikk-updates-list" aria-label="Recent published updates">
      <h2>Latest verified improvements</h2>
      ${t}
    </section>
    <p class="pikk-updates-note">A refresh reloads this browser's app bundle; it does not clear your account or local demo data. If a change still does not appear, compare the version above with the published source commit.</p>
  `,{lead:"A clear record of recent PIKK improvements."})}function Zd(e){var t;(t=e.querySelector("#pikkUpdatesRefresh"))==null||t.addEventListener("click",()=>{window.location.assign(Ln(window.location.href))})}const ep="dbs_media_v1",At="blobs",tp=1;function Yr(){return new Promise((e,t)=>{const s=indexedDB.open(ep,tp);s.onupgradeneeded=()=>{const i=s.result;i.objectStoreNames.contains(At)||i.createObjectStore(At,{keyPath:"id"})},s.onsuccess=()=>e(s.result),s.onerror=()=>t(s.error||new Error("idb open failed"))})}async function sp(e,t,s={}){const i=await Yr();return new Promise((a,r)=>{const o=i.transaction(At,"readwrite");o.objectStore(At).put({id:e,blob:t,mime:t.type||s.mime||"application/octet-stream",name:s.name||"",size:t.size||0,at:Date.now()}),o.oncomplete=()=>a(e),o.onerror=()=>r(o.error)})}async function ip(e){const t=await Yr();return new Promise((s,i)=>{const r=t.transaction(At,"readonly").objectStore(At).get(e);r.onsuccess=()=>s(r.result||null),r.onerror=()=>i(r.error)})}const wi=new Map;async function ka(e){if(!e)return"";if(e.startsWith("idb:")){const t=e.slice(4);if(wi.has(t))return wi.get(t);const s=await ip(t);if(!(s!=null&&s.blob))return"";const i=URL.createObjectURL(s.blob);return wi.set(t,i),i}return e}function ap(e="blob"){return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}const np=20*60,rp=250*1024*1024;function op({duration:e,size:t,type:s}){return s!=null&&s.startsWith("video/")?!Number.isFinite(t)||t<=0||t>rp?"Video must be under 250 MB for this device-local preview.":!Number.isFinite(e)||e<=0?"Unable to read video duration. Try another file.":e>np?"PIKKUP Phase 1 videos must be 20 minutes or shorter.":"":"Select a supported video file."}function lp(e){return new Promise((t,s)=>{const i=URL.createObjectURL(e),a=document.createElement("video");let r=!1;const o=setTimeout(()=>n(new Error("Video metadata timed out")),12e3);function n(d,c){r||(r=!0,clearTimeout(o),a.removeAttribute("src"),a.load(),URL.revokeObjectURL(i),d?s(d):t(c))}a.preload="metadata",a.onloadedmetadata=()=>n(null,a.duration),a.onerror=()=>n(new Error("Cannot read this video file")),a.src=i})}const Jr=[{id:"song",label:"Song",acceptCover:"image/*",acceptMedia:"audio/*,.mp3,.m4a,.wav,.aac"},{id:"album",label:"Album",acceptCover:"image/*",acceptMedia:"audio/*,.mp3,.m4a,.wav,.aac"},{id:"video",label:"Video",acceptCover:"image/*",acceptMedia:"video/*,.mp4,.mov,.webm"},{id:"picture",label:"Picture",acceptCover:"image/*",acceptMedia:"image/*"}];function cp(e){return M("Admin",`<div class="card admin-gate">
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
    <div class="card muted">Full team roles, revenue, and moderation ship later phases.</div>`,{lead:"Gated demo dashboard."})}function dp(){return`
  <section class="card admin-add" id="adminAdd">
    <h3>Add Content</h3>
    <p class="muted admin-add-note">PIKKUP preview: video uploads must be 20 minutes or shorter and at most 250 MB. Device-local only, not public hosting. TEST MODE · no backend. Metadata → <code>localStorage dbs_v1.catalog</code>. Files → IndexedDB <code>dbs_media_v1</code>. Works on iPhone Safari &amp; desktop. Large files stay on this device only.</p>

    <div class="admin-type-tabs" role="tablist" aria-label="Content type">${Jr.map((t,s)=>`<button type="button" class="admin-type-tab${s===0?" on":""}" data-type="${l(t.id)}" role="tab">${l(t.label)}</button>`).join("")}</div>

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
  </section>`}function pp(e){if(!e.length)return'<div class="card admin-catalog"><h3>Catalog</h3><p class="muted">No admin-added items yet.</p></div>';const t=e.map(s=>{const i=s.coverRef&&!s.coverRef.startsWith("idb:")?l(s.coverRef):"";return`<div class="admin-catalog-row" data-id="${l(s.id)}">
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
    <div class="admin-catalog-list">${t}</div></div>`}function De(e){return"$"+(Number(e)||0).toFixed(2)}function up(e){var a,r,o;const t=((a=e.openMic)==null?void 0:a.pending)||[],s=((r=e.openMic)==null?void 0:r.byStatus)||{},i=t.length?t.map(n=>`<div class="row wrap admin-om-row" data-om-id="${l(n.id)}">
            <span class="spacer"><strong>${l(n.username)}</strong> · ${l(n.talent)} · ${l(n.trackTitle)}
              <span class="chip">pending</span>
              ${n.rightsCertified?'<span class="chip">rights</span>':'<span class="chip">no rights</span>'}
            </span>
            <button type="button" class="btn primary admin-om" data-id="${l(n.id)}" data-status="approved">Approve</button>
            <button type="button" class="btn ghost admin-om" data-id="${l(n.id)}" data-status="rejected">Reject</button>
          </div>`).join(""):'<p class="muted">No pending applications. Seeded demos may already be approved/rejected — open <a href="#/openmic">Open Mic</a>.</p>';return`<section class="card admin-openmic" id="adminOpenMic">
    <h3>Open Mic queue</h3>
    <p class="muted">TEST MODE · reuse store Approve/Reject. Pending ${s.pending||0} · approved ${s.approved||0} · rejected ${s.rejected||0} · total ${((o=e.openMic)==null?void 0:o.total)||0}</p>
    ${i}
    <p class="admin-panel-links"><a class="btn" href="#/openmic">Full Open Mic page</a></p>
  </section>`}function mp(e){const t=e.fanClubs||{total:0,recent:[]},s=t.recent.length?`<ul class="list-plain">${t.recent.map(i=>`<li><span><strong>${l(i.name)}</strong> · ${l(i.privacy)}${i.official?" · official":""}</span><span class="muted">${i.memberCount} members</span></li>`).join("")}</ul>`:'<p class="muted">No clubs yet.</p>';return`<section class="card admin-fanclubs" id="adminFanClubs">
    <h3>Fan Clubs glance</h3>
    <div class="stats">
      <div><strong>${t.total}</strong><span>Clubs</span></div>
    </div>
    ${s}
    <p class="admin-panel-links"><a class="btn" href="#/fanclubs">Open Fan Clubs</a></p>
  </section>`}function hp(e){const t=e.loyalty||{},s=(t.badges||[]).slice(0,6).map(i=>`<span class="chip">${l(i)}</span>`).join(" ")||'<span class="muted">None unlocked</span>';return`<section class="card admin-loyalty" id="adminLoyalty">
    <h3>Loyalty glance</h3>
    <p class="muted">${l(t.note||"Device-local loyalty")}</p>
    <div class="stats">
      <div><strong>${t.points||0}</strong><span>Points</span></div>
      <div><strong>${t.badgeCount||0}</strong><span>Badges</span></div>
      <div><strong>${t.historyCount||0}</strong><span>Actions</span></div>
    </div>
    <p class="admin-badge-row">${s}</p>
    <p class="admin-panel-links"><a class="btn" href="#/loyalty">Open Loyalty Club</a></p>
  </section>`}function gp(){return`<section class="card admin-quicklinks" id="adminQuickLinks">
    <h3>Quick links</h3>
    <p class="muted">Deep-links only · page ownership stays with Live Social / Commerce / Build.</p>
    ${[{owner:"Live Social",links:[["#/live","Live"],["#/messages","Messages"],["#/giftbattles","Gift battles"],["#/multiguest","Multi-guest"],["#/spotlight","Spotlight"],["#/restream","Restream"],["#/connect","Connect"]]},{owner:"Commerce",links:[["#/marketplace","Marketplace"],["#/wallet","Wallet"],["#/earnings","Earnings"],["#/missions","Missions"],["#/share","Share & Earn"],["#/refer","Refer & Earn"]]},{owner:"Build",links:[["#/explore","Explore"],["#/notifications","Notifications"],["#/fanclubs","Fan Clubs"],["#/loyalty","Loyalty"],["#/openmic","Open Mic"]]}].map(s=>{const i=s.links.map(([a,r])=>`<a class="btn ghost admin-qlink" href="${a}">${l(r)}</a>`).join("");return`<div class="admin-ql-group"><span class="chip">${l(s.owner)}</span><div class="admin-ql-row">${i}</div></div>`}).join("")}
  </section>`}function fp(e){const t=e.revenue||{},s=(t.byCategory||[]).map(i=>`<li><span>${l(i.label||i.category)} ×${i.count}</span><span class="muted">gross ${De(i.gross)} · creator ${De(i.creatorShare)} · PIKK ${De(i.dbsShare)}</span></li>`).join("");return`<section class="card admin-revenue" id="adminRevenue">
    <h3>Revenue / analytics shell</h3>
    <div class="row wrap" style="gap:8px;margin-bottom:8px">
      <span class="chip">TEST MODE</span>
      <span class="chip">${l(t.chip||"demo figures · not production")}</span>
    </div>
    <div class="stats">
      <div><strong>${De(t.gross)}</strong><span>Gross</span></div>
      <div><strong>${De(t.fees)}</strong><span>Fees</span></div>
      <div><strong>${De(t.creatorShare)}</strong><span>Creator net</span></div>
      <div><strong>${De(t.dbsShare)}</strong><span>PIKK net</span></div>
    </div>
    <p class="muted">Creator available ${De(t.creatorAvailable)} · holds ${De(t.creatorHolds)} · fan wallet ${De(t.fanWalletBalance)} · catalog ${t.catalogPublished||0}/${t.catalogTotal||0} published · earning lines ${t.earnCount||0}</p>
    ${s?`<ul class="list-plain">${s}</ul>`:'<p class="muted">No creator earnings in store yet — open Wallet / Earnings (Commerce) to seed demos.</p>'}
    <p class="admin-panel-links">
      <a class="btn" href="#/wallet">Wallet</a>
      <a class="btn" href="#/earnings">Earnings</a>
    </p>
  </section>`}function vp(e){ws(),Ie();const t=Ya({openOnly:!0}),s=Ya({openOnly:!1}).length,i=e.hotFeed||{},a=t.length?t.slice(0,12).map(r=>{const o=r.kind==="live"?'<span class="chip">live</span>':'<span class="chip">post</span>',n=r.kind==="live"?` · viewers ${r.viewers??"—"} · gifts ${r.gifts??"—"}`:` · score ${r.score??0}`,d=r.kind==="post"?`<button type="button" class="btn primary admin-ea-like" data-ref="${l(r.refId)}" data-alert="${l(r.id)}">Like</button>
                 <button type="button" class="btn ghost admin-ea-comment" data-ref="${l(r.refId)}" data-alert="${l(r.id)}">Comment</button>
                 <button type="button" class="btn ghost admin-ea-share" data-ref="${l(r.refId)}" data-alert="${l(r.id)}">Share</button>`:'<a class="btn ghost" href="#/live">Open Live</a>';return`<div class="admin-ea-row" data-alert-id="${l(r.id)}">
            <div class="admin-ea-main">
              <strong>${l(r.username||"creator")}</strong> ${o}
              <div class="muted">${l(r.title||"")}${n}</div>
            </div>
            <div class="admin-ea-actions row wrap">
              ${d}
              <button type="button" class="btn ghost admin-ea-handle" data-alert="${l(r.id)}">Mark handled</button>
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
  </section>`}function bp(e){const t=e.moderation||{};return`<section class="card admin-moderation" id="adminModeration">
    <h3>Moderation stub</h3>
    <p class="muted">${l(t.note||"Stub")}</p>
    <div class="stats">
      <div><strong>${(t.warnings||[]).length}</strong><span>Warnings</span></div>
      <div><strong>${(t.suspensions||[]).length}</strong><span>Suspensions</span></div>
    </div>
    <p class="muted">Empty-state · no enforcement actions stored yet.</p>
    <p class="admin-panel-links"><a class="btn" href="#/guidelines">Community Guidelines</a></p>
  </section>`}function yp(){var d;const e=Oe(),{posts:t,clipperApps:s,user:i}=D();if(((d=e.query)==null?void 0:d.admin)==="1"&&i&&i.role!=="admin"&&hs(!0),!H())return cp(i);Pt(),qe(),ws();const a=jn(),r=td(),o=a.clipperByStatus,n=Zs({includeUnpublishedForAdmin:!0});return M("Admin",`<div class="card admin-header">
      <div class="row wrap">
        <span class="chip">TEST MODE</span>
        <span class="chip">role=admin</span>
        <span class="spacer muted">Signed in as <strong>${l(i.username)}</strong></span>
        <button class="btn ghost" id="adminRevoke">Revoke admin</button>
      </div>
      <p class="muted admin-gate-hint">Gate: Profile toggle or <code>?admin=1</code> → <code>user.role='admin'</code> in <code>dbs_v1</code>. Phase 2 panels deep-link to owner pages.</p>
    </div>

    ${gp()}
    ${vp(r)}
    ${up(r)}
    ${mp(r)}
    ${hp(r)}
    ${fp(r)}
    ${bp(r)}

    ${dp()}
    ${pp(n)}

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
                   </div>`).join(""):'<p class="muted">None yet — submit via <a href="#/clippers">Clippers</a>.</p>'}</div>`,{lead:"Phase 2 controls · Add Content · Clippers · catalog."})}async function an(e){if(!e)return"";const t=ap("media");return await sp(t,e,{name:e.name,mime:e.type}),"idb:"+t}function nn(e){if(!e)return"";try{const t=new URL(e);let s=t.searchParams.get("v");return!s&&t.hostname.includes("youtu.be")&&(s=t.pathname.slice(1)),!s&&t.pathname.startsWith("/embed/")&&(s=t.pathname.split("/")[2]),s?`https://www.youtube.com/embed/${s}`:""}catch{return""}}function kp(e){var a,r;(a=e.querySelector("#adminRevoke"))==null||a.addEventListener("click",()=>{hs(!1),h("Admin revoked"),q("#/admin")}),e.querySelectorAll(".admin-clip").forEach(o=>{o.addEventListener("click",()=>{Rn(o.dataset.id,o.dataset.status),h("Clipper "+o.dataset.status),q("#/admin")})}),e.querySelectorAll(".admin-om").forEach(o=>{o.addEventListener("click",()=>{const n=Bi(o.dataset.id,o.dataset.status,o.dataset.status==="rejected"?"Admin reject":"");if(n!=null&&n.error){h(n.error==="admin"?"Admin required":"Open Mic update failed");return}h(o.dataset.status==="approved"?"Open Mic approved":"Open Mic rejected"),q("#/admin")})}),e.querySelectorAll(".admin-ea-like").forEach(o=>{o.addEventListener("click",()=>{const n=vd(o.dataset.ref);if(n!=null&&n.error)return h(n.error==="admin"?"Admin required":"Like failed");o.dataset.alert&&Ss(o.dataset.alert,"liked"),h("Liked · TEST MODE"),q("#/admin")})}),e.querySelectorAll(".admin-ea-comment").forEach(o=>{o.addEventListener("click",()=>{const n=bd(o.dataset.ref,"🔥 PIKK team — keep it up! (TEST MODE)");if(n!=null&&n.error)return h(n.error==="admin"?"Admin required":"Comment failed");o.dataset.alert&&Ss(o.dataset.alert,"commented"),h("Comment posted · TEST MODE"),q("#/admin")})}),e.querySelectorAll(".admin-ea-share").forEach(o=>{o.addEventListener("click",async()=>{var c;const n=yd(o.dataset.ref);if(n!=null&&n.error)return h(n.error==="admin"?"Admin required":"Share failed");const d=`${location.origin}${location.pathname}#/posts?focus=${encodeURIComponent(o.dataset.ref)}`;try{(c=navigator.clipboard)!=null&&c.writeText&&await navigator.clipboard.writeText(d),h("Link copied · share +1 (TEST MODE)")}catch{h("Share +1 (TEST MODE)")}o.dataset.alert&&Ss(o.dataset.alert,"shared"),q("#/admin")})}),e.querySelectorAll(".admin-ea-handle").forEach(o=>{o.addEventListener("click",()=>{const n=Ss(o.dataset.alert,"handled");if(n!=null&&n.error)return h("Could not mark handled");h("Alert handled"),q("#/admin")})}),e.querySelectorAll("img[data-idb-src]").forEach(async o=>{const n=o.getAttribute("data-idb-src");if(!n)return;const d=await ka(n);d&&(o.src=d,o.classList.remove("idb-pending"))});const t=e.querySelector("#adminType"),s=e.querySelector("#adminMediaFile"),i=e.querySelector("#adminCoverFile");e.querySelectorAll(".admin-type-tab").forEach(o=>{o.addEventListener("click",()=>{e.querySelectorAll(".admin-type-tab").forEach(m=>m.classList.remove("on")),o.classList.add("on");const n=o.dataset.type;t&&(t.value=n);const d=Jr.find(m=>m.id===n);d&&s&&(s.accept=d.acceptMedia),d&&i&&(i.accept=d.acceptCover);const c=e.querySelector("#adminMediaLabel");c&&(c.textContent=n==="picture"?"Picture file (or use cover only)":n==="video"?"Video file (optional if YouTube link set)":"Audio / media file (optional)");const p=e.querySelector("#adminStreamingFields");p&&(p.style.display=n==="song"||n==="album"?"":"none")})}),e.querySelectorAll(".admin-dropzone").forEach(o=>{const n=o.querySelector(".admin-file-input"),d=o.querySelector(".admin-file-name");o.addEventListener("click",c=>{c.target!==n&&(n==null||n.click())}),o.addEventListener("keydown",c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),n==null||n.click())}),n==null||n.addEventListener("change",()=>{var p;const c=(p=n.files)==null?void 0:p[0];d&&(d.textContent=c?`${c.name} · ${(c.size/1024/1024).toFixed(2)} MB`:"")}),o.addEventListener("dragover",c=>{c.preventDefault(),o.classList.add("drag")}),o.addEventListener("dragleave",()=>o.classList.remove("drag")),o.addEventListener("drop",c=>{var g,f;c.preventDefault(),o.classList.remove("drag");const p=(f=(g=c.dataTransfer)==null?void 0:g.files)==null?void 0:f[0];if(!p||!n)return;const m=new DataTransfer;m.items.add(p),n.files=m.files,n.dispatchEvent(new Event("change"))})}),(r=e.querySelector("#adminAddForm"))==null||r.addEventListener("submit",async o=>{var A,k,L,C,O,E,se,T,_,V,j,Ce,Te,ne,be,Ne,X,Ge,Ot,Nt,Bt,Rt,jt,Ft,Kt,Gt;o.preventDefault();const n=e.querySelector("#adminAddStatus"),d=e.querySelector("#adminSave"),c=(k=(A=e.querySelector("#adminTitle"))==null?void 0:A.value)==null?void 0:k.trim(),p=((C=(L=e.querySelector("#adminArtist"))==null?void 0:L.value)==null?void 0:C.trim())||"DatBoiSkeet",m=((O=e.querySelector("#adminType"))==null?void 0:O.value)||"song",g=((se=(E=e.querySelector("#adminCoverUrl"))==null?void 0:E.value)==null?void 0:se.trim())||"",f=((_=(T=e.querySelector("#adminMediaUrl"))==null?void 0:T.value)==null?void 0:_.trim())||"",b=((j=(V=e.querySelector("#adminYoutube"))==null?void 0:V.value)==null?void 0:j.trim())||"",y={spotify:((Te=(Ce=e.querySelector("#adminSpotify"))==null?void 0:Ce.value)==null?void 0:Te.trim())||"",apple:((be=(ne=e.querySelector("#adminApple"))==null?void 0:ne.value)==null?void 0:be.trim())||"",youtubeMusic:((X=(Ne=e.querySelector("#adminYtm"))==null?void 0:Ne.value)==null?void 0:X.trim())||"",tidal:((Ot=(Ge=e.querySelector("#adminTidal"))==null?void 0:Ge.value)==null?void 0:Ot.trim())||"",amazon:((Bt=(Nt=e.querySelector("#adminAmazon"))==null?void 0:Nt.value)==null?void 0:Bt.trim())||"",youtube:b||""},v=!!((Rt=e.querySelector("#adminPublished"))!=null&&Rt.checked),w=(Ft=(jt=e.querySelector("#adminCoverFile"))==null?void 0:jt.files)==null?void 0:Ft[0],$=(Gt=(Kt=e.querySelector("#adminMediaFile"))==null?void 0:Kt.files)==null?void 0:Gt[0];if(!c){h("Title required");return}if(m==="video"&&$)try{const Z=await lp($),we=op({duration:Z,size:$.size,type:$.type});if(we){h(we),n&&(n.textContent=we);return}}catch{const Z="Could not verify video duration. Upload canceled.";h(Z),n&&(n.textContent=Z);return}d&&(d.disabled=!0),n&&(n.textContent="Saving… (large files may take a moment on iPhone)");try{let Z=g,we=f;w&&(Z=await an(w)),$&&(we=await an($)),m==="picture"&&!Z&&we&&(Z=we);const Be=_o({type:m,title:c,artist:p,coverRef:Z,mediaRef:we,youtube:b,streamingLinks:m==="song"||m==="album"?y:{},published:v,embed:nn(b)});if(Be!=null&&Be.error){h(Be.error==="forbidden"?"Admin required":"Could not save"),n&&(n.textContent=""),d&&(d.disabled=!1);return}b&&Be.id&&Kn(Be.id,{embed:nn(b)}),h(v?"Published to catalog":"Saved as draft"),q("#/admin")}catch(Z){console.error(Z),h("Save failed — file may be too large for this browser"),n&&(n.textContent=String((Z==null?void 0:Z.message)||Z)),d&&(d.disabled=!1)}}),e.querySelectorAll(".admin-cat-pub").forEach(o=>{o.addEventListener("click",()=>{qo(o.dataset.id,o.dataset.on==="1"),h(o.dataset.on==="1"?"Published":"Unpublished"),q("#/admin")})}),e.querySelectorAll(".admin-cat-del").forEach(o=>{o.addEventListener("click",()=>{confirm("Delete this catalog item?")&&(Oo(o.dataset.id),h("Deleted"),q("#/admin"))})})}function bt(){q("#/posts")}function wp(){ws();const e=gd(8);return e.length?`<section class="card hot-strip" id="hotStrip">
    <div class="row wrap hot-strip-head">
      <h3 class="hot-strip-title">🔥 Hot / Trending</h3>
      <span class="chip">TEST MODE</span>
      <span class="muted hot-strip-note">likes + comments + shares · house + community</span>
    </div>
    <div class="hot-rail" role="list">${e.map((s,i)=>{const a=i+1,r=s.image?`<img class="hot-thumb" src="${l(s.image)}" alt="" loading="lazy" />`:`<div class="hot-thumb hot-thumb-empty">${l((s.username||"?")[0].toUpperCase())}</div>`,o=s.mediaType==="video"?'<span class="chip">video</span>':s.image?'<span class="chip">pic</span>':'<span class="chip">text</span>',n=s.house?'<span class="chip">house</span>':'<span class="chip">community</span>';return`<a class="hot-card" href="#/posts?focus=${l(s.postId||s.id)}" data-hot-id="${l(s.postId||s.id)}">
        <span class="hot-rank">#${a}</span>
        ${r}
        <span class="hot-meta">
          <span class="hot-user">@${l(s.username)}</span>
          <span class="hot-preview">${l((s.preview||s.text||"").slice(0,64))}</span>
          <span class="hot-stats">♥ ${s.likes} · 💬 ${s.comments} · ↗ ${s.shares} · score ${s.score}</span>
          <span class="hot-chips">${o}${n}</span>
        </span>
      </a>`}).join("")}</div>
  </section>`:`<section class="card hot-strip" id="hotStrip">
      <div class="row wrap hot-strip-head">
        <h3 class="hot-strip-title">🔥 Hot / Trending</h3>
        <span class="chip">TEST MODE</span>
      </div>
      <p class="muted">No hot posts yet — engage (like · comment · share) to spike the feed.</p>
    </section>`}function Sp(e){var w,$,A,k,L;const{posts:t,likes:s,comments:i,user:a,postShares:r}=D(),o=((w=e==null?void 0:e.query)==null?void 0:w.tab)==="following"?"following":"discover",n=(($=e==null?void 0:e.query)==null?void 0:$.focus)||"",d=new Set((a==null?void 0:a.following)||[]),c=o==="following"&&a?t.filter(C=>d.has(C.userId)||C.userId===a.id):t,p=wo.map(C=>`<button type="button" class="chip preset-img" data-src="${l(C.src)}" title="${l(C.label)}">${l(C.label)}</button>`).join(""),m=((A=e==null?void 0:e.query)==null?void 0:A.compose)==="1"||((k=e==null?void 0:e.query)==null?void 0:k.type),g=["text","picture","short","video"].includes((L=e==null?void 0:e.query)==null?void 0:L.type)?e.query.type:"",f=a?`
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
    </div>`,y=c.map(C=>{const O=s[C.id]||[],E=a&&O.includes(a.id),se=i[C.id]||[],T=r&&r[C.id]||0,_=ui(C.id),V=a&&d.has(C.userId),j=n&&n===C.id?" post-focus":"",Ce=a&&C.userId!==a.id?`<button class="btn ghost follow-btn" data-uid="${l(C.userId)}" data-on="${V?"1":"0"}">${V?"Following":"Follow"}</button>`:"",Te=C.userId==="dbs"?'<span class="chip">house</span>':'<span class="chip">community</span>',ne=C.mediaType||(C.image?"picture":"text"),be=ne==="short"?'<span class="chip">Short</span>':ne==="video"?'<span class="chip">Video</span>':ne==="picture"||ne==="image"?'<span class="chip">Picture</span>':ne==="text"?'<span class="chip">Text</span>':"",Ne=(()=>{const X=(C.mediaUrl||C.image||"").trim();if(!X)return"";if(ne==="short"||ne==="video"){const Ge=/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{6,})/i.exec(X);if(Ge)return`<div class="media media-video"><iframe src="https://www.youtube.com/embed/${Ge[1]}?rel=0" title="post video" allowfullscreen loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>`;if(X.startsWith("http")||X.endsWith(".mp4")||X.endsWith(".webm"))return`<video class="media" src="${l(X)}" controls playsinline preload="metadata"></video>`}return`<img class="media" src="${l(X)}" alt="" loading="lazy" />`})();return`
      <article class="post${j}" data-id="${l(C.id)}" id="post-${l(C.id)}">
        <div class="meta">
          <a class="avatar" href="#/profile/${l(C.userId)}">${l((C.username||"?")[0].toUpperCase())}</a>
          <div class="spacer">
            <div class="who"><a href="#/profile/${l(C.userId)}">${l(C.username)}</a> ${Te}${be}</div>
            <div class="when">${N(C.at)}${_>=5?` · <span class="hot-inline">🔥 ${_}</span>`:""}</div>
          </div>
          ${Ce}
        </div>
        <p class="body-text">${l(C.text)}</p>
        ${Ne}
        <div class="post-actions">
          <button class="btn like-btn ${E?"primary":""}" data-id="${l(C.id)}">
            ♥ ${O.length}
          </button>
          <button class="btn ghost comment-toggle" data-id="${l(C.id)}">💬 ${se.length}</button>
          <button class="btn ghost share-btn" data-id="${l(C.id)}" title="Share (demo count)">↗ ${T}</button>
        </div>
        <div class="comments" id="c-${l(C.id)}" hidden>
          ${se.map(X=>`<div class="comment"><b>${l(X.username)}</b> ${l(X.text)}</div>`).join("")||'<div class="muted">No comments yet</div>'}
          ${a?`<div class="row" style="margin-top:8px">
                  <input class="c-input" data-id="${l(C.id)}" placeholder="Add a comment…" style="flex:1;background:#0e0e14;border:1px solid var(--line);border-radius:12px;padding:8px 10px" />
                  <button class="btn primary c-send" data-id="${l(C.id)}">Send</button>
                </div>`:""}
        </div>
      </article>`}).join(""),v=o==="following"?'<div class="card muted">No posts from people you follow yet. Discover feed has official drops.</div>':'<div class="card muted">No posts yet.</div>';return M("Posts",wp()+f+b+(y||v),{lead:"Post Text, a Picture, Short, or Video · Shorts live here (not separate tabs) · Hot strip ranks engagement."})}function $p(e){var d;const t=e.querySelector(".post-focus");if(t)try{t.scrollIntoView({behavior:"smooth",block:"center"})}catch{}else typeof location<"u"&&(location.hash.includes("compose=1")||location.hash.includes("type="))&&setTimeout(()=>{var c;return(c=e.querySelector("#composer"))==null?void 0:c.scrollIntoView({behavior:"smooth",block:"start"})},50);const s=e.querySelector("#postComposeBody"),i=e.querySelector("#postType"),a=e.querySelector("#postTypeChip"),r=e.querySelector("#postMediaLabel"),o=e.querySelector("#postPresets");function n(c){const p=c||"picture";e.querySelectorAll(".post-type-btn").forEach(b=>b.classList.toggle("on",b.dataset.type===p)),i&&(i.value=p),a&&(a.textContent=p.charAt(0).toUpperCase()+p.slice(1)+" post");const m=e.querySelector("#postMediaField"),g=e.querySelector("#postMediaNote"),f=p==="text";m&&(m.hidden=f),g&&(g.hidden=f),r&&!f&&(r.textContent=p==="short"?"Short clip link (YouTube / demo path)":p==="video"?"Video link (YouTube / demo path)":"Picture link (demo path)"),o&&(o.hidden=p!=="picture"),s&&(s.hidden=!1,s.classList.remove("is-collapsed"))}e.querySelectorAll(".post-type-btn").forEach(c=>{c.addEventListener("click",()=>n(c.dataset.type))}),i!=null&&i.value&&n(i.value),e.querySelectorAll(".preset-img").forEach(c=>{c.addEventListener("click",()=>{const p=e.querySelector("#postImg");p&&(p.value=c.dataset.src||""),h("Picture selected")})}),(d=e.querySelector("#postSubmit"))==null||d.addEventListener("click",()=>{var c,p;try{const m=(c=e.querySelector("#postText"))==null?void 0:c.value,g=(i==null?void 0:i.value)||"picture",f=(((p=e.querySelector("#postImg"))==null?void 0:p.value)||"").trim();if(g==="text"){if(!(m!=null&&m.trim()))return h("Write some words for a Text post");Oa({text:m.trim(),mediaType:"text"}),h("Text posted"),bt();return}if(!(m!=null&&m.trim())&&!f)return h("Add a caption or media");if((g==="short"||g==="video")&&!f)return h("Add a "+g+" link (TEST MODE)");Oa({text:m||(g==="picture"?"Photo":g==="short"?"Short":"Video"),image:g==="picture"?f:"",mediaType:g,mediaUrl:f}),h(g.charAt(0).toUpperCase()+g.slice(1)+" posted"),bt()}catch(m){h(m.message||"Could not post")}}),e.querySelectorAll(".like-btn").forEach(c=>{c.addEventListener("click",()=>{if(To(c.dataset.id).error)return h("Sign in to like");bt()})}),e.querySelectorAll(".comment-toggle").forEach(c=>{c.addEventListener("click",()=>{const p=e.querySelector("#c-"+c.dataset.id);p&&(p.hidden=!p.hidden)})}),e.querySelectorAll(".c-send").forEach(c=>{c.addEventListener("click",()=>{var b;const p=c.dataset.id,m=e.querySelector(`.c-input[data-id="${p}"]`),g=(b=m==null?void 0:m.value)==null?void 0:b.trim();if(!g)return;if(Do(p,g).error)return h("Sign in to comment");h("Comment added"),bt()})}),e.querySelectorAll(".share-btn").forEach(c=>{c.addEventListener("click",async()=>{var f;const p=c.dataset.id;if(jr(p).error)return h("Could not share");const g=`${location.origin}${location.pathname}#/posts?focus=${encodeURIComponent(p)}`;try{(f=navigator.clipboard)!=null&&f.writeText&&await navigator.clipboard.writeText(g),h("Shared · link copied (TEST MODE)")}catch{h("Shared · count +1 (TEST MODE)")}bt()})}),e.querySelectorAll(".follow-btn").forEach(c=>{c.addEventListener("click",()=>{const p=c.dataset.uid,m=c.dataset.on==="1";if((m?Xs(p):Qs(p)).error)return h("Sign in to follow");h(m?"Unfollowed":"Following"),bt()})})}function rn(e){q(e)}const ji={apple:"Apple Music",spotify:"Spotify",youtubeMusic:"YouTube Music",youtube:"YouTube",tidal:"Tidal",amazon:"Amazon Music"};function Qr(e){if(!e||typeof e!="object")return{};const t={};for(const s of Object.keys(ji)){const i=String(e[s]||"").trim();(i.startsWith("http://")||i.startsWith("https://"))&&(t[s]=i)}return t}function xp(e){const t=Qr(e),s=Object.keys(ji).filter(i=>t[i]);return s.length?s.map(i=>`<a class="btn stream-plat stream-plat-${l(i)}" href="${l(t[i])}" target="_blank" rel="noopener">${l(ji[i])}</a>`).join(""):'<span class="muted" style="font-size:12px">No platform links yet</span>'}function Ep(e){try{const t=new URL(e);return t.protocol!=="https:"||t.hostname!=="music.apple.com"||!/^\/[a-z]{2}(?:-[a-z]{2})?\/(?:song|album)\//i.test(t.pathname)?"":"https://embed.music.apple.com"+t.pathname+t.search}catch{return""}}function Si(e){var o;const t=e.cover?`<img class="stream-cover" src="${l(e.cover)}" alt="${l(e.title)}" loading="lazy" referrerpolicy="no-referrer" />`:'<div class="stream-cover stream-cover-empty" aria-hidden="true">♪</div>',s=e.albumNote?`<div class="muted" style="font-size:11px">${l(e.albumNote)}</div>`:"",i=e.year?` · ${l(String(e.year))}`:"",a=Ep((o=e.links)==null?void 0:o.apple),r=a?`<details class="apple-music-embed"><summary>▶ Play in PIKK · Apple Music</summary><iframe title="Apple Music player for ${l(e.title)}" src="${l(a)}" loading="lazy" allow="autoplay *; encrypted-media *; fullscreen *" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation" style="width:100%;height:175px;border:0;border-radius:12px"></iframe><small class="muted">Apple controls playback availability. Full listening may require Apple Music.</small></details>`:"";return`
    <article class="stream-release">
      ${t}
      <div class="stream-meta">
        <span class="chip">${l(e.type||"release")}</span>
        <strong>${l(e.title)}</strong>
        <div class="muted" style="font-size:12px">${l(e.artist||"DatBoiSkeet")}${i}</div>
        ${s}
        ${r}
        <div class="stream-plats">${xp(e.links)}</div>
      </div>
    </article>`}function on(e){return e==="inner"?"Inner Circle":e==="backstage"?"Backstage":e==="skeet+"?"Skeet+":"None"}function Ap(e){return yo.map(t=>{const s=t.tier==="backstage"||t.tier==="inner";return e&&Pi(s?"backstage":"skeet")?`
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
      </article>`}).join("")}function ln(e={}){var A;const t=["songs","albums","beats","playlists","upload"].includes((A=e.query)==null?void 0:A.view)?e.query.view:"",{user:s}=D(),i=mt(),a=Pi("skeet"),r=new Set((s==null?void 0:s.purchasedTracks)||[]),o=rs.map(k=>`
    <div class="cover-card" style="flex:0 0 160px">
      <span class="badge-cs">${l(k.status)}</span>
      <img src="${l(k.cover)}" alt="${l(k.title)}" style="width:160px;height:160px" />
      <div class="t">${l(k.title)}</div>
      <div class="muted" style="font-size:11px">${l(k.artist)}</div>
    </div>`).join(""),n=qn.map(k=>{const L=k.id==="skeet"?"skeet+":k.id==="inner"?"inner":k.id,C=i===L;return`
    <div class="card" style="margin:0">
      <h3>${l(k.name)}</h3>
      <div class="price" style="font-size:22px;font-weight:900">$${k.price}<span class="muted" style="font-size:13px">/mo</span></div>
      <p class="muted">${l(k.blurb)}</p>
      ${s?C?`<button type="button" class="btn ghost block mem-toggle" data-tier="${l(k.id)}" data-on="1">Active · tap to cancel (demo)</button>`:`<button type="button" class="btn primary block mem-toggle" data-tier="${l(k.id)}" data-on="0">Join · TEST MODE</button>`:'<a class="btn primary block" href="#/profile">Sign in to join</a>'}
    </div>`}).join(""),d=Pa.filter(k=>r.has(k.id)),c=Pa.map(k=>{const L=r.has(k.id);return`
      <div class="card" style="margin:0;display:flex;gap:12px;align-items:center">
        <img src="${l(k.cover)}" alt="" style="width:72px;height:72px;border-radius:10px;object-fit:cover;flex:0 0 72px" />
        <div class="spacer">
          <strong>${l(k.title)}</strong>
          <div class="muted" style="font-size:12px">${l(k.artist)} · ${l(k.status)}</div>
          <div style="font-weight:800;margin-top:4px">$${k.price.toFixed(2)}</div>
        </div>
        ${s?L?'<span class="chip">In My Music</span>':`<button type="button" class="btn primary buy-track" data-id="${l(k.id)}">Buy · demo</button>`:'<a class="btn" href="#/profile">Sign in</a>'}
      </div>`}).join(""),p=Zs({publishedOnly:!0,types:["song","album"]}),m=p.map(k=>{const L=Qr(k.streamingLinks||{});return Object.keys(L).length?{id:k.id,title:k.title,artist:k.artist,type:k.type||"song",cover:k.coverRef&&!String(k.coverRef).startsWith("idb:")?k.coverRef:"",links:L,fromAdmin:!0}:null}).filter(Boolean),g=[...rt,...m];let f="";if(t==="songs"||t==="albums"){const k=t==="albums",L=g.filter(C=>k?C.type==="album":C.type==="single"||C.type==="song");f=`<div class="card" id="music-focused-view">
      <h2>${k?"Albums":"Songs"}</h2>
      <p class="muted">Verified releases and available official listening links.</p>
      <div class="stream-grid">${L.map(Si).join("")||'<p class="muted">No releases listed in this category yet.</p>'}</div>
      <a class="btn ghost" href="#/music">Music overview</a>
    </div>`}else if(t==="playlists")f=`<div class="card" id="music-focused-view">
      <h2>Playlists</h2>
      <p class="muted">Official YouTube playlists open on YouTube. No rehosted audio.</p>
      <div class="row wrap" style="gap:8px">
        ${Li.map(k=>`<a class="btn ghost" href="${l(k.youtube)}" target="_blank" rel="noopener">${l(k.title)}</a>`).join("")}
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
      </div>`:"",y=rt.find(k=>k.cover)||null,v=rt.filter(k=>k.cover).slice(0,5),$=`
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
        <a class="btn" href="${l(oe.youtube)}" target="_blank" rel="noopener">Official channel</a>
        <a class="btn ghost" href="${l(oe.youtubeHandle)}" target="_blank" rel="noopener">@DatBoiSkeet1</a>
        ${Li.map(k=>`<a class="btn ghost" href="${l(k.youtube)}" target="_blank" rel="noopener">${l(k.title)}</a>`).join("")}
      </div>
      <div class="yt-mix-grid">
        ${_n.map(k=>`
          <article class="yt-mix-card">
            <div class="hero-video" style="margin:0 0 10px">
              <iframe src="${l(ut(k.embed))}" title="${l(k.title)}" allowfullscreen loading="lazy"
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
        <a class="btn stream-plat stream-plat-apple" href="${l(oe.apple)}" target="_blank" rel="noopener">Apple Music · Listen</a>
        <a class="btn ghost stream-plat stream-plat-spotify" href="${l(oe.spotify)}" target="_blank" rel="noopener">Spotify · Alternative</a>
        <a class="btn stream-plat stream-plat-youtubeMusic" href="${l(oe.youtubeMusic)}" target="_blank" rel="noopener">YouTube Music</a>
        <a class="btn stream-plat stream-plat-youtube" href="${l(oe.youtube)}" target="_blank" rel="noopener">YouTube</a>
      </div>
      <div class="stream-grid">
        ${rt.map(Si).join("")}
        ${m.map(Si).join("")}
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
      <h2>Vault ${a?'<span class="chip" style="border-color:#2a4a3a;color:#8dffb0">Unlocked · '+l(on(i))+"</span>":'<span class="chip">Locked</span>'}</h2>
      <p class="muted">Exclusive unreleased tracks &amp; previews for members. Nested under Music — not a bottom-nav tab.</p>

      <div class="vault-grid" style="margin:12px 0">
        ${Ap(a)}
      </div>

      ${a?`<div class="vault-lock" style="border-style:solid;border-color:#2a4a3a;color:var(--tx)">
              ✅ Membership active: <strong>${l(on(i))}</strong>. Exclusive cards above are unlocked.
              Cancel anytime with the tier button below (demo). Purchased My Music items are kept.
            </div>`:`<div class="vault-lock">
              🔒 Vault locked. Sign in, then tap <strong>Join · TEST MODE</strong> on Skeet+ or Backstage below.
              Locked cards show title/cover only — no exclusive content until you join.
            </div>`}

      <h3 style="margin:16px 0 8px">Membership (TEST MODE)</h3>
      <div class="grid-2">${n}</div>
    </div>

  `;return M("Music & Vault",$,{lead:"Singles, albums, Coming Soon, and member Vault."})}function cn(e){const t=e.querySelector("#youtube-mixes")||e;ya(t),e.querySelectorAll(".mem-toggle").forEach(s=>{s.addEventListener("click",i=>{i.preventDefault();const a=s.dataset.on==="1",r=Js(s.dataset.tier,!a);if(r!=null&&r.error)return h("Sign in required — open Profile first");h(a?"Membership cancelled (demo) · My Music purchases kept":`Joined ${s.dataset.tier} (TEST MODE) · Vault unlocked`),rn("#/music"),setTimeout(()=>{var o;return(o=document.getElementById("vault"))==null?void 0:o.scrollIntoView({behavior:"smooth",block:"start"})},40)})}),e.querySelectorAll(".buy-track").forEach(s=>{s.addEventListener("click",i=>{i.preventDefault();const a=Co(s.dataset.id);if(a!=null&&a.error)return h("Sign in required");h("Added to My Music (demo · no charge)"),rn("#/music")})}),e.querySelectorAll("[data-idb-src]").forEach(async s=>{const i=s.getAttribute("data-idb-src");if(!i)return;const a=await ka(i);a&&(s.tagName==="IMG"||s.tagName==="AUDIO"||s.tagName==="VIDEO")&&(s.src=a)})}const wa="pikk_ai_artists_local_drafts_v1",Xr=Object.freeze(["Fully AI-generated music","AI-assisted music with human performance","Human-made music with AI artwork only"]),Cp="AI-generated or AI-assisted";function Tp(e,t=Date.now()){const s=String(e.artist||"").trim().slice(0,80),i=String(e.track||"").trim().slice(0,120),a=String(e.creation||""),r=String(e.description||"").trim().slice(0,600),o=Number(e.price);if(!s||!i||!Xr.includes(a)||!e.confirmed)throw Error("Artist, title, creation type and honest AI disclosure are required.");if(!Number.isFinite(o)||o<0||o>100)throw Error("Preview price must be between $0 and $100.");return{id:"ai-draft-"+t+"-"+Math.random().toString(36).slice(2,8),artist:s,track:i,creation:a,description:r,price:o,createdAt:t,status:"Private local draft · not published",disclosure:Cp}}function Sa(e){try{const t=JSON.parse(e.getItem(wa)||"[]");return Array.isArray(t)?t.filter(s=>s&&typeof s.id=="string").slice(0,40):[]}catch{return[]}}function Dp(e,t){const s=[t,...Sa(e)].slice(0,40);return e.setItem(wa,JSON.stringify(s)),s}function Mp(e,t){const s=Sa(e).filter(i=>i.id!==t);return e.setItem(wa,JSON.stringify(s)),s}function Lp(){const e=Sa(window.localStorage),t=e.length?e.map(s=>`<article class="card ai-artist-draft"><div class="row wrap"><strong>${l(s.track)}</strong><span class="chip">AI · ${l(s.creation)}</span></div><p class="muted">by ${l(s.artist)} · Preview price $${s.price.toFixed(2)}</p><p class="muted">${l(s.status)}</p><button type="button" class="btn ghost ai-artist-delete" data-id="${l(s.id)}">Delete draft</button></article>`).join(""):'<p class="muted">No AI music drafts saved on this device. This is not a public music catalog.</p>';return M("PIKK AI Artists",`
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
       <div class="field"><label for="aiCreationType">How was this made? *</label><select id="aiCreationType" name="creation">${Xr.map(s=>`<option value="${l(s)}">${l(s)}</option>`).join("")}</select></div>
       <div class="field"><label for="aiPreviewPrice">Planned purchase price in USD (preview only)</label><input id="aiPreviewPrice" name="price" type="number" min="0" max="100" step=".01" value="1.00" required /></div>
       <div class="field"><label for="aiDescription">Description (optional)</label><textarea id="aiDescription" name="description" maxlength="600"></textarea></div>
       <label class="ai-artist-certify"><input type="checkbox" id="aiArtistCertify" required /> I accurately disclosed the use of AI and confirm I hold or can obtain the necessary commercial rights, including voice and likeness permissions.</label>
       <button type="submit" class="btn primary">Save private AI music draft</button>
     </form>
    </section>
    <section class="card ai-artist-panel"><h3>My private drafts (${e.length})</h3><div class="ai-artist-drafts">${t}</div><p class="muted">A real AI Artist storefront, public discovery feed and licensed downloadable sales require backend, payments and rights verification.</p></section>
   </div>
  </div>`,{lead:"Dedicated AI music category · Disclosure first"})}function Ip(e){var t;(t=e.querySelector("#aiArtistForm"))==null||t.addEventListener("submit",s=>{s.preventDefault();const i=s.currentTarget;try{const a=Tp({artist:i.elements.artist.value,track:i.elements.track.value,creation:i.elements.creation.value,price:i.elements.price.value,description:i.elements.description.value,confirmed:e.querySelector("#aiArtistCertify").checked});Dp(window.localStorage,a),h("Private AI artist draft saved · not published"),location.hash==="#/ai-artists"&&(location.hash="#/ai-artists?updated=1"),window.dispatchEvent(new HashChangeEvent("hashchange"))}catch(a){h(a.message)}}),e.querySelectorAll(".ai-artist-delete").forEach(s=>s.addEventListener("click",()=>{Mp(window.localStorage,s.dataset.id),window.dispatchEvent(new HashChangeEvent("hashchange"))}))}const hi="pikk_shield_intake_v1",Hs=30,$a=Object.freeze(["Original creator","Licensed with permission","Authorized representative"]);function xt(e){const t=String(e||"").trim();if(!t)return"";try{const s=new URL(t);return["https:","http:"].includes(s.protocol)?s.href:""}catch{return""}}function Pp(e,t=Date.now()){const s=String(e.title||"").trim().slice(0,120),i=String(e.owner||"").trim().slice(0,100),a=String(e.rights||""),r=String(e.contact||"").trim().slice(0,180),o=String(e.notes||"").trim().slice(0,800),n=xt(e.source);if(!s||!i||!r||!$a.includes(a)||!e.certified)throw new Error("Complete title, rights holder, contact, ownership basis and certification.");if(String(e.source||"").trim()&&!n)throw new Error("Use a valid http or https link.");return{id:"shield-"+t+"-"+Math.random().toString(36).slice(2,8),type:"rights-declaration",title:s,owner:i,rights:a,contact:r,notes:o,source:n,at:t,status:"Local draft — not submitted"}}function Ct(e){try{const t=JSON.parse(e.getItem(hi)||"[]");return Array.isArray(t)?t.filter(s=>s&&s.type==="rights-declaration").slice(0,Hs):[]}catch{return[]}}function _p(e,t){const s=[t,...Ct(e)].slice(0,Hs);return e.setItem(hi,JSON.stringify(s)),s}function qp(e,t){const s=Ct(e).filter(i=>i.id!==t);return e.setItem(hi,JSON.stringify(s)),s}function Op(e){const t=Ct(e).map(s=>({id:String(s.id||""),type:"rights-declaration",title:String(s.title||""),owner:String(s.owner||""),rights:String(s.rights||""),contact:String(s.contact||""),notes:String(s.notes||""),source:xt(s.source),at:Number.isFinite(s.at)?s.at:null,status:"Local draft — not submitted"}));return JSON.stringify({format:"PIKK Shield local rights drafts",version:1,drafts:t},null,2)}function Np(e,t){if(typeof t!="string"||t.length>65536)throw new Error("Backup file must be under 64 KB.");let s;try{s=JSON.parse(t)}catch{throw new Error("Invalid JSON backup file.")}if(!s||s.format!=="PIKK Shield local rights drafts"||s.version!==1||!Array.isArray(s.drafts)||s.drafts.length>Hs)throw new Error("Not a supported PIKK Shield backup (maximum 30 drafts).");const i=s.drafts.map((d,c)=>{if(!d||typeof d!="object"||Array.isArray(d))throw new Error("Invalid draft in backup.");for(const p of["id","title","owner","rights","contact","notes","source"])if(typeof d[p]!="string")throw new Error("Invalid draft field: "+p);if(!/^shield-[a-zA-Z0-9-]{1,80}$/.test(d.id)||!d.title.trim()||d.title.length>120||!d.owner.trim()||d.owner.length>100||!$a.includes(d.rights)||!d.contact.trim()||d.contact.length>180||d.notes.length>800||d.source&&(!xt(d.source)||xt(d.source)!==d.source)||d.at!==null&&(!Number.isFinite(d.at)||d.at<0))throw new Error("Backup draft "+(c+1)+" contains invalid fields.");return{id:d.id,type:"rights-declaration",title:d.title.trim(),owner:d.owner.trim(),rights:d.rights,contact:d.contact.trim(),notes:d.notes,source:xt(d.source),at:d.at??Date.now(),status:"Local draft — not submitted"}}),a=Ct(e),r=new Set(a.map(d=>d.id)),o=[];for(const d of i)r.has(d.id)||(r.add(d.id),o.push(d));const n=o.slice(0,Math.max(0,Hs-a.length));return n.length&&e.setItem(hi,JSON.stringify([...n,...a])),{added:n.length,duplicates:i.length-o.length,total:Ct(e).length}}const Bp=()=>Ct(window.localStorage);function Rp(){const e=Bp(),t=e.length?e.map(s=>{const i=xt(s.source);return`
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
    </article>`}).join(""):'<p class="muted">No rights declarations saved on this device.</p>';return M("PIKK Shield",`
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
            <div class="field"><label for="shieldRights">Rights basis *</label><select id="shieldRights" name="rights" required>${$a.map(s=>`<option value="${l(s)}">${l(s)}</option>`).join("")}</select></div>
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
    </div>`,{lead:"Rights declaration preview · No official copyright protection is active yet"})}function jp(e){var a,r,o;(a=e.querySelector("#shieldForm"))==null||a.addEventListener("submit",n=>{n.preventDefault();const d=n.currentTarget;try{const c=Pp({title:d.elements.title.value,owner:d.elements.owner.value,rights:d.elements.rights.value,contact:d.elements.contact.value,source:d.elements.source.value,notes:d.elements.notes.value,certified:e.querySelector("#shieldCertify").checked});_p(window.localStorage,c),h("Local rights draft saved — not submitted"),location.hash="#/shield?updated=1",window.dispatchEvent(new HashChangeEvent("hashchange"))}catch(c){h(c.message)}});const t=e.querySelector("#shieldImportFile");(r=e.querySelector("#shieldImportDrafts"))==null||r.addEventListener("click",()=>t==null?void 0:t.click()),t==null||t.addEventListener("change",async()=>{var d;const n=(d=t.files)==null?void 0:d[0];if(n)try{if(n.size>65536)throw new Error("Backup file must be under 64 KB.");const c=await n.text();if(!window.confirm("Restore PIKK Shield drafts from this file? Valid drafts will be merged into this browser, without replacing existing drafts."))return;const p=Np(window.localStorage,c);h(`Restored ${p.added} local draft(s); ${p.duplicates} already saved`),window.dispatchEvent(new HashChangeEvent("hashchange"))}catch(c){h(c.message||"Unable to restore backup")}finally{t.value=""}}),(o=e.querySelector("#shieldExportDrafts"))==null||o.addEventListener("click",()=>{const n=Op(window.localStorage),d=URL.createObjectURL(new Blob([n],{type:"application/json"})),c=document.createElement("a");c.href=d,c.download="pikk-shield-local-drafts.json",document.body.appendChild(c),c.click(),c.remove(),setTimeout(()=>URL.revokeObjectURL(d),1e3),h("Local backup downloaded — store it privately")});const s=e.querySelector("#shieldDraftSearch"),i=[...e.querySelectorAll(".shield-entry")];s==null||s.addEventListener("input",()=>{const n=s.value.trim().toLocaleLowerCase();let d=0;i.forEach(m=>{const g=m.dataset.shieldSearch.includes(n);m.hidden=!g,g&&d++});const c=e.querySelector("#shieldSearchCount");c&&(c.textContent=`Showing ${d} of ${i.length} drafts`);const p=e.querySelector("#shieldSearchEmpty");p&&(p.hidden=d!==0)}),e.querySelectorAll(".shield-delete").forEach(n=>n.addEventListener("click",()=>{var c,p;const d=((p=(c=n.closest(".shield-entry"))==null?void 0:c.querySelector("strong"))==null?void 0:p.textContent)||"this rights draft";window.confirm(`Delete local rights draft "${d}"? This cannot be undone.`)&&(qp(window.localStorage,n.dataset.id),h("Local draft deleted"),window.dispatchEvent(new HashChangeEvent("hashchange")))}))}function Fp(){const t=`
    <div class="card merch-hero">
      <p class="kicker">Physical merch</p>
      <h2 style="margin:0 0 8px">Foreign X-Change</h2>
      <p class="muted">All orders, sizes, shipping, and payment happen on
        <a class="fx-link" href="https://foreignx-change.com" target="_blank" rel="noopener">foreignx-change.com</a>
        — not inside PIKK. Product links open the shop homepage until verified per-item URLs are provided.</p>
      <a class="btn primary" href="https://foreignx-change.com" target="_blank" rel="noopener">Visit Foreign X-Change</a>
      <p class="merch-note" style="margin-top:10px">Hats $30 · Tees $65 · Jackets $200 · prices exclude shipping</p>
    </div>
    <div class="merch-grid">${Se.map(s=>`
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
  `;return M("Merch",t,{lead:"Foreign X-Change showcase · 10 products · external checkout only"})}function Kp(e){e.querySelectorAll(".shop-link").forEach(n=>{n.addEventListener("click",()=>{h("TEST MODE — opening Foreign X-Change")})});const t=e.querySelector("#merchLightbox"),s=t==null?void 0:t.querySelector("img"),i=t==null?void 0:t.querySelector(".merch-lightbox-close");let a=null;const r=n=>{var d,c;!t||!s||!i||(a=n,s.src=((d=n.querySelector("img"))==null?void 0:d.currentSrc)||n.dataset.zoom,s.alt=((c=n.querySelector("img"))==null?void 0:c.alt)||"Product preview",t.classList.add("show"),t.setAttribute("aria-hidden","false"),i.focus())},o=()=>{t!=null&&t.classList.contains("show")&&(t.classList.remove("show"),t.setAttribute("aria-hidden","true"),s==null||s.removeAttribute("src"),a!=null&&a.isConnected&&a.focus(),a=null)};e.querySelectorAll(".img-wrap").forEach(n=>{const d=()=>r(n);n.addEventListener("click",d),n.addEventListener("keydown",c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),d())})}),t==null||t.addEventListener("click",o),t==null||t.addEventListener("keydown",n=>{n.key==="Escape"?(n.preventDefault(),o()):n.key==="Tab"&&(n.preventDefault(),i==null||i.focus())})}function Vt(e){q(e||"#/profile")}function dn(e){return e.avatar?`<img class="avatar" src="${l(e.avatar)}" alt="" style="object-fit:cover" />`:`<div class="avatar">${l((e.username||"?")[0].toUpperCase())}</div>`}function xs(e,t){return t.length?`<div class="card"><h3>${l(e)}</h3>
    <ul class="list-plain">${t.map(s=>`<li><a href="#/profile/${l(s.id)}"><span>${l(s.username)}</span></a>
           <a class="chip" href="#/profile/${l(s.id)}">View</a></li>`).join("")}</ul></div>`:`<div class="card"><h3>${l(e)}</h3><p class="muted">None yet.</p></div>`}function Gp(e){var m,g;const t=((m=e==null?void 0:e.parts)==null?void 0:m[1])||null,{user:s,posts:i}=D(),a=!!(t&&s&&t===s.id&&((g=e==null?void 0:e.query)==null?void 0:g.view)==="public");if(!!t&&(!s||t!==s.id)||a){const f=dt(t);if(!f)return M("Profile",`<div class="card muted">User not found.</div>
         <a class="btn" href="#/profile">Back</a>`);const b=i.filter(A=>A.userId===f.id),y=s&&!a&&(s.following||[]).includes(f.id),v=qa(f.id),w=Ii(f.id),$=`
      <section class="pikk-profile-cover" aria-label="Public PIKK profile">
        <div class="pikk-profile-cover-inner">
          <span class="pikk-profile-cover-kicker">PIKK · CREATOR PROFILE</span>
          ${dn(f)}
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
          ${a?'<a class="btn primary" href="#/profile">Edit profile</a>':s?`<button class="btn ${y?"ghost":"primary"}" id="pubFollow" data-uid="${l(f.id)}" data-on="${y?"1":"0"}">${y?"Unfollow":"Follow"}</button>`:'<a class="btn primary" href="#/profile">Sign in to follow</a>'}
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
      ${xs("Followers",v)}
      ${xs("Following",w)}
    `;return M(f.username,$)}if(!s)return M("Profile",`
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
      </div>`,{lead:"Free PIKK fan profile · follow · posts · role apps · TEST MODE."});const o=i.filter(f=>f.userId===s.id),n=qa(s.id),d=Ii(s.id),c=s.memberships||{},p=`
    <section class="pikk-profile-cover" aria-label="Your PIKK profile">
      <div class="pikk-profile-cover-inner">
        <span class="pikk-profile-cover-kicker">PIKK · MY PROFILE</span>
        ${dn(s)}
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

    ${xs("Followers",n)}
    ${xs("Following",d)}

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
        <span class="chip">${H()?"role=admin":"role=fan"}</span>
        <button class="btn ${H()?"ghost":"primary"}" id="toggleAdmin">${H()?"Revoke admin":"Enable Demo Admin"}</button>
        <a class="btn" href="#/admin">Open Admin</a>
      </div>
    </div>
  `;return M("Profile",p)}function Up(e){var t,s,i,a,r,o;(t=e.querySelector("#signinBtn"))==null||t.addEventListener("click",()=>{var d;const n=(d=e.querySelector("#signinName"))==null?void 0:d.value;Tt(n),h("Signed in"),Vt("#/profile")}),(s=e.querySelector("#signinName"))==null||s.addEventListener("keydown",n=>{var d;n.key==="Enter"&&((d=e.querySelector("#signinBtn"))==null||d.click())}),(i=e.querySelector("#signoutBtn"))==null||i.addEventListener("click",()=>{Eo(),h("Signed out"),Vt("#/profile")}),(a=e.querySelector("#saveProfile"))==null||a.addEventListener("click",()=>{var d,c;if(Ao({bio:(d=e.querySelector("#editBio"))==null?void 0:d.value,avatar:(c=e.querySelector("#editAvatar"))==null?void 0:c.value}).error)return h("Sign in required");h("Profile saved"),Vt("#/profile")}),(r=e.querySelector("#pubFollow"))==null||r.addEventListener("click",n=>{const d=n.currentTarget,c=d.dataset.uid,p=d.dataset.on==="1";if((p?Xs(c):Qs(c)).error)return h("Sign in to follow");h(p?"Unfollowed":"Following"),Vt("#/profile/"+c)}),(o=e.querySelector("#toggleAdmin"))==null||o.addEventListener("click",()=>{const n=!H();if(hs(n).error)return h("Sign in required");h(n?"Demo Admin enabled":"Admin revoked"),Vt("#/profile")})}function pn(){q("#/clippers")}const Vp={pending:"Pending",approved:"Approved",rejected:"Rejected",waitlisted:"Waitlisted"};function zp(){const{clipperApps:e,user:t}=D(),s=e.length,i=e.filter(o=>o.status==="approved").length,a=e.filter(o=>o.status==="pending").length,r=`
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
                <span class="chip">${l(Vp[o.status]||o.status)}</span>
                <span class="muted spacer" style="text-align:right">${N(o.at)}</span>
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
  `;return M("Clippers",r,{lead:"Apply → admin approve → paid campaigns & tracked links."})}function Hp(e){var t;(t=e.querySelector("#cSubmit"))==null||t.addEventListener("click",()=>{var a,r,o,n,d,c,p,m,g,f,b,y,v,w,$,A,k,L,C;const s=(r=(a=e.querySelector("#cName"))==null?void 0:a.value)==null?void 0:r.trim(),i=(n=(o=e.querySelector("#cEmail"))==null?void 0:o.value)==null?void 0:n.trim();if(!s||!i)return h("Name and email required");Mo({name:s,email:i,age:(d=e.querySelector("#cAge"))==null?void 0:d.value,tiktok:(c=e.querySelector("#cTiktok"))==null?void 0:c.value,instagram:(p=e.querySelector("#cIg"))==null?void 0:p.value,youtube:(m=e.querySelector("#cYt"))==null?void 0:m.value,x:(g=e.querySelector("#cX"))==null?void 0:g.value,facebook:(f=e.querySelector("#cFb"))==null?void 0:f.value,followers:(b=e.querySelector("#cFollowers"))==null?void 0:b.value,views:(y=e.querySelector("#cViews"))==null?void 0:y.value,avgViews:(v=e.querySelector("#cAvgViews"))==null?void 0:v.value,engagement:(w=e.querySelector("#cEngage"))==null?void 0:w.value,frequency:($=e.querySelector("#cFreq"))==null?void 0:$.value,niche:(A=e.querySelector("#cNiche"))==null?void 0:A.value,samples:(k=e.querySelector("#cSamples"))==null?void 0:k.value,analyticsNotes:(L=e.querySelector("#cAnalytics"))==null?void 0:L.value,applicantUserId:((C=D().user)==null?void 0:C.id)||null}),h("Application saved for admin review"),pn()}),e.querySelectorAll(".clip-status").forEach(s=>{s.addEventListener("click",()=>{Rn(s.dataset.id,s.dataset.status),h("Marked "+s.dataset.status),pn()})})}const Wp={rose:"🌹","big-love":"💖","turn-up":"🔥","cash-rain":"💵","bottle-pop":"🍾","money-gun":"💸","diamond-drip":"💎","foreign-whip":"🚗",helicopter:"🚁","private-jet":"✈️","dbs-crown":"👑","dbs-universe":"🌌","battle-win":"✅","battle-crown":"👑","battle-vs":"⚔️","battle-fire":"🔥"},Yp={rose:"/gifts/rose.svg","big-love":"/gifts/big-love.svg","turn-up":"/gifts/turn-up.svg","cash-rain":"/gifts/cash-rain.svg","bottle-pop":"/gifts/bottle-pop.svg","money-gun":"/gifts/money-gun.svg","diamond-drip":"/gifts/diamond-drip.svg","foreign-whip":"/gifts/foreign-whip.svg",helicopter:"/gifts/helicopter.svg","private-jet":"/gifts/private-jet.svg","dbs-crown":"/gifts/dbs-crown.svg","dbs-universe":"/gifts/dbs-universe.svg","battle-win":"/gifts/battle-win.svg","battle-crown":"/gifts/battle-crown.svg","battle-vs":"/gifts/battle-vs.svg","battle-fire":"/gifts/battle-fire.svg"},un="gift-sticker";function Es(e){return String(e??"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function Jp(e,t){return t&&typeof t=="object"&&t.className?t.className:`${un} ${un}--${e}`}function xa(e,t={}){const s=String(e||""),i=Jp(s||"unknown",t),a=Wp[s]||"🎁",r=Yp[s]||null;return r?{src:r,className:i,emoji:a,html:`<img class="${Es(i)}" src="${Es(r)}" alt="" width="48" height="48" decoding="async" draggable="false" data-gift-slug="${Es(s)}" />`}:{src:null,className:i,emoji:a,html:`<span class="${Es(i)} gift-sticker--emoji" aria-hidden="true">${a}</span>`}}function Ye(e,t){return xa(e,t&&typeof t=="object"&&typeof t!="function"?t:{}).html}const Qp=Object.freeze([{id:"women",title:"Women's Rooms",icon:"💗",description:"Conversations, style, wellness, business and community",names:["Ladies Lounge","Girl Talk","Tea Time","What's the Word?","Who Did What?","Beauty Bar","Girls' Night In","Love & Standards","Boss Ladies","Fashion & Fits","Ladies Only Live","Women in Business","Women's Mental Wellness","Dating From Her Side","The Hustle Room: Women"]},{id:"men",title:"Men's Rooms",icon:"🫱🏻‍🫲🏿",description:"Brotherhood, relationships, business, wellness and hobbies",names:["The Man Cave","The Barbershop","Fellas' Night","Men's Corner","Men in Business","Cars & Motors","Fitness & Brotherhood","Fatherhood","Men's Mental Wellness","Dating From His Side","Sports Debate","Gaming Brotherhood","Men's Style","The Hustle Room","Brotherhood & Mentorship"]},{id:"coed",title:"Coed Communities",icon:"🌐",description:"Shared conversations, learning and networking for everyone",names:["Let's Talk","The Hangout","Business Connect & Wealth Academy","Couples Corner","Conspiracy Room","Game Room","Why Are You Single?","What Are You Looking For?","Single & Ready to Mingle","City Connect"]},{id:"dating",title:"Singles & Dating",icon:"💘",description:"Opt-in conversations, introductions and relationship topics",names:["Looking for My Match","The Flirt Zone","Speed Connections","Poly Connections","Date Night Live","Love & Advice"]},{id:"sports",title:"Sports",icon:"🏆",description:"A separate place for every major sport",names:["Sports Central","Basketball","Football","Soccer","Baseball","Hockey"]},{id:"talent",title:"Music & Talent",icon:"🎙️",description:"Rappers, singers, bands, producers and city competitions",names:["The Booth","Producer Room","The Stage","City Takeover"]},{id:"news",title:"News & Innovation",icon:"📰",description:"World events, markets and new ideas",names:["World News","Economy & Markets","Startups & Innovation","Tech Talk","Money Talk"]},{id:"general",title:"General Live",icon:"📡",description:"IRL, gaming, shows, comedy, food, fitness and more",names:["Just Chatting","Gaming","Music","IRL","Sports","Creative","Podcasts & Talk Shows","Food & Cooking","Fitness","Beauty & Fashion","Business & Money Talk","Dating & Connections","Education","News & Commentary","Comedy & Entertainment","Comedy & Roast Battles","Creator Spotlight"]}]);function Xp(e,t){const s=new Map(e.map(n=>[n[0],n])),i=new Set,a=([n,d,c])=>'<a class="live-cat-card pikk-live-room-card" href="'+(n==="Comedy & Roast Battles"?"#/roast-arena":"#/live?tab=channels&category="+encodeURIComponent(n))+'" aria-label="'+t(n)+': browse channels"><span class="pikk-live-room-emoji" aria-hidden="true">'+t(c)+"</span><strong>"+t(n)+'</strong><p class="muted">'+t(d)+'</p><span class="pikk-live-room-action">Browse channels <span aria-hidden="true">›</span></span></a>',r=Qp.map(n=>{const d=n.names.map(c=>s.get(c)).filter(Boolean);return d.forEach(c=>i.add(c[0])),'<details class="pikk-live-directory-group" id="pikk-live-group-'+n.id+'"'+(n.id==="coed"?" open":"")+'><summary class="pikk-live-directory-summary"><span class="pikk-live-directory-icon" aria-hidden="true">'+n.icon+'</span><span class="pikk-live-directory-label"><strong>'+t(n.title)+"</strong><small>"+t(n.description)+'</small></span><span class="pikk-live-directory-count">'+d.length+' rooms</span><span class="pikk-live-directory-chevron" aria-hidden="true">⌄</span></summary><div class="live-cat-cards pikk-live-directory-cards">'+d.map(a).join("")+"</div></details>"}),o=e.filter(n=>!i.has(n[0]));return o.length&&r.push('<details class="pikk-live-directory-group" open><summary class="pikk-live-directory-summary"><span class="pikk-live-directory-icon" aria-hidden="true">✨</span><span class="pikk-live-directory-label"><strong>More Live</strong><small>Additional topics</small></span><span class="pikk-live-directory-count">'+o.length+' rooms</span><span class="pikk-live-directory-chevron" aria-hidden="true">⌄</span></summary><div class="live-cat-cards pikk-live-directory-cards">'+o.map(a).join("")+"</div></details>"),'<div class="pikk-live-directory" aria-label="Live category groups">'+r.join("")+"</div>"}function Zr(){const e=(Oe().query||{}).tab;return e==="live"||e==="channels"?"channels":e==="following"||e==="categories"?e:"channels"}function de(){const e=Zr();q(e==="channels"?"#/live":`#/live?tab=${e}`)}function ue(e){return"$"+Number(e||0).toFixed(2)}function Le(e){const t=Number(e)||0;return t>=1e3?(t/1e3).toFixed(t>=1e4?0:1).replace(/\.0$/,"")+"K":String(t)}function Zp(e="live"){return`
    <nav class="live-cat-chips" aria-label="Live categories">
      ${[{id:"live",href:"#/live?tab=channels",label:"Live"},{id:"openmic",href:"#/openmic",label:"Open Mic / Talent Discovery (24/7)"},{id:"spotlight",href:"#/spotlight",label:"Spotlight (24/7)"},{id:"viral",href:"#/viral-live",label:"Viral Live · Preview"}].map(i=>{const a=i.id===e?" on":"",r=i.id===e?' aria-current="page"':"";return`<a class="live-cat-chip${a}" href="${i.href}"${r}>${l(i.label)}</a>`}).join("")}
    </nav>`}function eu(e="channels"){return`
    <nav class="live-disc-tabs" aria-label="Live discovery">
      ${[{id:"following",href:"#/live?tab=following",label:"Following"},{id:"clips",href:"#/shorts",label:"Clips"},{id:"channels",href:"#/live?tab=channels",label:"Channels"},{id:"categories",href:"#/live?tab=categories",label:"Categories"}].map(i=>{const a=i.id===e?" on":"",r=i.id===e?' aria-current="page"':"";return`<a class="live-disc-tab${a}" href="${i.href}" data-tab="${i.id}"${r}>${l(i.label)}</a>`}).join("")}
    </nav>`}function eo(e={}){const t=pr(),s=t.chipLabel||"House · Music Video",i=t.embed?ut(t.embed,"rel=0"):"",a=e.title||"House catalog · while stages are quiet";return`
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
    </div>`}function tu(e){const t=e?Ii(e.id):[],s=new Set(t.map(o=>o.id)),i=Kr().filter(o=>s.has(o.hostId)),a=t.length?t.slice(0,12).map(o=>`<a class="chip" href="#/profile">${l("@"+(o.username||o.id))}</a>`).join(""):'<span class="muted">Nobody followed yet · DEMO</span>';let r;if(!e)r=`
      <p class="muted">Sign in to see lives from accounts you follow.</p>
      <a class="btn primary" href="#/profile">Demo profile</a>
      <p class="chip" style="margin-top:10px">TEST MODE · Following is local demo graph</p>`;else if(!i.length)r=`
      <p class="muted" style="margin:0 0 8px">
        None of the people you follow are live right now (demo filter on seeded Hot lives).
      </p>
      <div class="row wrap" style="gap:6px;margin-bottom:10px">${a}</div>
      <a class="btn ghost" href="#/live?tab=channels">Browse Live channels</a>
      <p class="chip" style="margin-top:10px">TEST MODE · not a scrape</p>
      ${eo({title:"Meanwhile — DatBoiSkeet house catalog on 24/7 stages"})}`;else{const o=i.map(n=>`
        <article class="hot-live-card${n.house?" is-house":""}" data-live-id="${l(n.id)}">
          <div class="live-hoodie" aria-label="Live · ${l(Le(n.viewers))} watching">
            <span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span>
            <span class="live-hoodie-viewers">${l(Le(n.viewers))}</span>
          </div>
          <div class="hot-live-body">
            <div class="hot-live-host">@${l(n.hostName)}</div>
            <div class="hot-live-title">${l(n.title)}</div>
            <div class="hot-live-actions row wrap">
              <button type="button" class="btn ghost hot-live-watch" data-id="${l(n.id)}" data-host="${l(n.hostName)}">Watch demo</button>
            </div>
          </div>
        </article>`).join("");r=`
      <p class="muted" style="margin:0 0 8px;font-size:12px">Lives from accounts you follow · ${t.length} following · TEST MODE</p>
      <div class="row wrap" style="gap:6px;margin-bottom:10px">${a}</div>
      <div class="hot-lives-track">${o}</div>`}return`
    <div class="card live-disc-panel" id="liveTabFollowing" data-panel="following">
      <h3 style="margin:0 0 8px">Following</h3>
      ${r}
    </div>`}const su=[["The Booth","Rappers, freestyles, hip-hop performances and song previews","🎙️"],["The Stage","Singers, bands, vocalists and instrumental performances","🎤"],["City Takeover","City-versus-city showcases, performances and local pride challenges","🌆"],["Producer Room","Beat showcases, producer collaborations and beat competitions","🎹"],["Ladies Lounge","Women-centered girl talk, beauty, fashion, relationships and community","💅"],["Girl Talk","Everyday conversations, friendships and women’s discussions","💬"],["Tea Time","Celebrity gossip, trending stories and entertainment drama","🫖"],["Who Did What?","Viral moments, celebrity controversies and debates","👀"],["Boss Ladies","Women entrepreneurs, business networking and financial growth","👑"],["Fashion & Fits","Fashion, outfits and personal style","👗"],["Ladies Only Live","Women-centered livestreams and hosted events","🎥"],["What's the Word?","Entertainment news, celebrity conversations, viral moments and trending discussions","🗣️"],["Women in Business","Women entrepreneurs, founders, business networking and mentorship","👩‍💼"],["The Man Cave","Men’s social conversations, sports and community","🤝"],["Men in Business","Men’s entrepreneurship, networking, mentorship and partnerships","👔"],["Girls' Night In","Women-centered social nights, games and discussions","🌙"],["Beauty Bar","Beauty, hair, makeup and skincare conversations","💄"],["Love & Standards","Dating, relationships and boundaries","💗"],["Women's Mental Wellness","Women-centered stress, confidence, emotional wellbeing and peer support","🧠"],["Dating From Her Side","Women-centered dating experiences, relationships and personal standards","💞"],["The Hustle Room: Women","Women-centered side hustles, extra income ideas and building businesses","📈"],["The Barbershop","Men-centered everyday debates, conversation and community","💈"],["Fellas' Night","Men-centered social events and games","🌃"],["Men's Corner","Men-centered life, relationships and personal development","🧢"],["Cars & Motors","Cars, motorcycles, customization and auto culture","🚘"],["Fitness & Brotherhood","Fitness, wellbeing and peer support","💪"],["Fatherhood","Parenting, family responsibilities and raising children","👨‍👧"],["Men's Mental Wellness","Men-centered stress, wellbeing and peer support","🧠"],["Dating From His Side","Men-centered dating experiences and relationship advice","💬"],["Sports Debate","Sports arguments, player comparisons and predictions","🏅"],["Gaming Brotherhood","Gaming, tournaments and player communities","🎮"],["Men's Style","Fashion, grooming, watches and fragrances","⌚"],["The Hustle Room","Careers, side businesses and professional growth","📈"],["Brotherhood & Mentorship","Intergenerational mentoring and peer support","🤝"],["Sports Central","All-sports discussion, fan talk and analysis","🏆"],["Basketball","Basketball discussion and fan streams","🏀"],["Football","American football discussion and fan streams","🏈"],["Soccer","Soccer discussion and fan streams","⚽"],["Baseball","Baseball discussion and fan streams","⚾"],["Hockey","Hockey discussion and fan streams","🏒"],["Tech Talk","AI, gadgets, apps and technology","💻"],["Startups & Innovation","Building businesses, technology and new ideas","🚀"],["World News","International events and global news discussions","🌍"],["Economy & Markets","Inflation, housing, jobs, interest rates and markets","📈"],["Let's Talk","Open conversations, questions and community discussion","🗣️"],["The Hangout","Conversations and social live streams","💬"],["Creator Spotlight","Featured creators and emerging talent","🌟"],["Game Room","Gameplay, tournaments and community games","🎮"],["Why Are You Single?","Coed conversations about single life, dating experiences and relationship challenges","❓"],["What Are You Looking For?","Coed conversations about dating intentions, values and ideal partners","💭"],["Single & Ready to Mingle","Opt-in coed social conversations and introductions for singles","💘"],["Looking for My Match","Opt-in dating live conversations","❤️"],["The Flirt Zone","Dating and connection conversations","💕"],["Speed Connections","Fast-paced introductions and connections","⏱️"],["Poly Connections","Consensual nonmonogamy discussions and connections","🔗"],["Couples Corner","Couples-versus-couples games, trivia, partner challenges, friendly competitions and rematches","💞"],["Date Night Live","Live dating conversations and activities","🌹"],["Love & Advice","Relationship conversations and advice","💌"],["Business Connect & Wealth Academy","Coed business networking and beginner education in entrepreneurship, credit, stocks, crypto, real estate and Roth IRAs","💼"],["City Connect","Meet people by city for friendship, dating, business networking and local conversations","📍"],["Conspiracy Room","Open discussion of theories and claims","🧩"],["Money Talk","Stocks, housing, crypto and financial discussions","💰"],["Just Chatting","Conversations, Q&A and hanging out","💬"],["Gaming","Gameplay, tournaments and community games","🎮"],["Music","Artists, DJs, producers and listening sessions","🎵"],["IRL","Everyday life, travel and outdoor streams","🌎"],["Sports","Sports talk and watch-along discussions","🏀"],["Creative","Art, design, production and making things","🎨"],["Podcasts & Talk Shows","Interviews, panels and conversations","🎙️"],["Food & Cooking","Recipes, kitchens and food reviews","🍳"],["Fitness","Training, wellness and movement","💪"],["Beauty & Fashion","Style, hair, makeup and fashion","✨"],["Business & Money Talk","Entrepreneurs, careers and money discussions","💼"],["Dating & Connections","Opt-in conversations and dating live rooms","❤️"],["Education","Tutorials, learning and study sessions","📚"],["News & Commentary","Current events and opinions","📰"],["Comedy & Entertainment","Comedy, variety and entertainment","🎭"],["Comedy & Roast Battles","1v1, tag team, open mic and tournaments","🎤"]];function iu(){return`
    <div class="card live-disc-panel" id="liveTabCategories" data-panel="categories">
      <div class="pikk-live-directory-hero">
        <span class="pikk-live-directory-kicker">PIKK LIVE · DISCOVER</span>
        <h3>Find your room.</h3>
        <p>Choose a community, explore a sport or find a conversation. Open a section to browse its topics.</p>
        <span class="pikk-live-directory-note">Discovery categories filter channels; a category is not a hosted room or a live stream. No active stream? You'll see an empty result.</span>
      </div>
      ${Xp(su,l)}
      <h3 style="margin:20px 0 8px">PIKK 24/7 Stages</h3>
      <div class="live-cat-cards">
        <a class="live-cat-card" href="#/openmic"><strong>Open Mic / Talent Discovery</strong><span class="chip">24/7 stage</span><p class="muted">Join the performance queue</p></a>
        <a class="live-cat-card" href="#/spotlight"><strong>Spotlight Live</strong><span class="chip">24/7 stage</span><p class="muted">Keep Going votes and creator performances</p></a>
        <a class="live-cat-card" href="#/shorts"><strong>Clips / Shorts</strong><span class="chip">Watch</span><p class="muted">Watch short videos</p></a>
        <a class="live-cat-card" href="#/viral-live"><strong>PIKK Viral Live</strong><span class="chip">Preview · not broadcasting</span><p class="muted">Explore the future 24/7 trending channel and original video sources</p></a>
      </div>
    </div>`}function au(e){return e!=null&&e.spikedAt?Date.now()-Number(e.spikedAt)<15*60*1e3:!1}function nu(e=""){const t=Kr();return`
    <div class="card hot-lives-rail" id="hotLivesRail">
      <div class="row wrap" style="justify-content:space-between;align-items:baseline;gap:8px">
        <h3 style="margin:0">Hot lives · Top streamers</h3>
        <span class="chip">score · viewers + engagement</span>
      </div>
      <p class="muted" style="margin:6px 0 10px;font-size:12px">TEST MODE · seeded demo · not third-party scrape · house + community</p>
      <div class="hot-lives-track">
        ${(e?t.filter(a=>String(a.category||"").toLowerCase()===e.toLowerCase()):t).map(a=>{const r=au(a);return`
      <article class="hot-live-card${r?" is-hot":""}${a.house?" is-house":""}" data-live-id="${l(a.id)}">
        <div class="live-hoodie" aria-label="Live · ${l(Le(a.viewers))} watching">
          <span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span>
          <span class="live-hoodie-viewers" title="${l(Le(a.viewers))} watching">${l(Le(a.viewers))}</span>
        </div>
        <div class="hot-live-body">
          <div class="hot-live-host">@${l(a.hostName)}</div>
          <div class="hot-live-title">${l(a.title)}</div>
          <div class="hot-live-chips">
            <span class="chip">${l(Le(a.viewers))} watching</span>
            ${a.house?'<span class="chip chip-ok">House</span>':""}
            ${r?'<span class="chip live-chip"><span class="dot" aria-hidden="true"></span> HOT</span>':""}
          </div>
          <div class="hot-live-actions row wrap">
            <button type="button" class="btn ghost hot-live-watch" data-id="${l(a.id)}" data-host="${l(a.hostName)}">Watch demo</button>
            <button type="button" class="btn hot-live-spike" data-id="${l(a.id)}">Simulate spike</button>
          </div>
        </div>
      </article>`}).join("")||'<p class="muted">No matching live channels in this category yet.</p>'}
      </div>
    </div>`}function ru(e){const t=String(e||"queued");return t==="playing"?'<span class="chip live-chip">Playing</span>':t==="played"?'<span class="chip chip-ok">Played</span>':t==="skipped"?'<span class="chip">Skipped</span>':'<span class="chip">Queued</span>'}function fe(e){const t=Number(e)||0;return t>=1e3?(t/1e3).toFixed(t%1e3===0?0:1).replace(/\.0$/,"")+"K":String(t)}function ou(e,t){if(!e||e.endedAt)return"";const s=si(),i=Wo(),a=Yo(e.id).slice(0,12),r=i.map(c=>{const p=c.coins>=zo,m=s>=c.coins;return`
      <button type="button" class="lg-gift" data-slug="${l(c.slug)}" data-coins="${c.coins}" data-confirm="${p?"1":"0"}" title="${l(c.animation)}">
        <span class="lg-gift-emoji">${Ye(c.slug)}</span>
        <span class="lg-gift-name">${l(c.name)}</span>
        <span class="lg-gift-price">${l(fe(c.coins))} · ${ue(c.usd)}</span>
        ${m?'<span class="chip">Ready</span>':'<span class="chip">Need demo coins</span>'}
        ${p?'<span class="chip lg-confirm-chip">Confirm</span>':""}
      </button>`}).join(""),o=ei.map(c=>`<button type="button" class="btn ghost lg-buy" data-coins="${c.coins}">${l(fe(c.coins))} · ${ue(c.usd)}</button>`).join(""),n=a.length?a.map(c=>`<li class="lg-hist-row">
            <span class="lg-hist-emoji">${Ye(c.giftSlug)}</span>
            <span><strong>${l(c.giftName)}</strong> · @${l(c.fromUser)} · ${l(fe(c.coins))} coins</span>
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
        ${r}
      </div>
      <div class="row wrap" style="gap:8px;margin-top:12px;align-items:center">
        <span class="chip">Coins ${l(fe(s))} · TEST MODE</span>
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
      <ul class="list-plain lg-hist" id="lgHist">${n}</ul>
    </div>`}function lu(e,t){var d;if(!e||e.endedAt)return"";const s=!!(t&&e.hostId===t.id),i=Number(((d=D().wallet)==null?void 0:d.balance)||0),a=Wi(e.id),r=Un.map(c=>{const p=c.save>0?`<span class="chip chip-ok lsr-save">Save $${c.save}</span>`:"";return`
      <button type="button" class="lsr-pack" data-pack="${c.pack}" data-price="${c.price}" aria-pressed="false">
        <strong>${l(c.label)}</strong>
        <span class="lsr-pack-price">${ue(c.price)}</span>
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
            ${ru(c.status)}
            ${p}
          </li>`}).join(""):'<li class="muted" style="padding:8px 0">No song requests yet · fans can buy a pack below.</li>',n=t?`
      <div class="lsr-form" id="lsrForm">
        <p class="muted" style="margin:0 0 8px;font-size:12px">Pick a pack, enter song title(s), then pay from demo Wallet · <span class="chip">TEST MODE</span></p>
        <div class="lsr-packs" id="lsrPacks" role="group" aria-label="Song request packs">
          ${r}
        </div>
        <div id="lsrTitleFields" class="lsr-titles"></div>
        <div class="row wrap" style="gap:8px;margin-top:10px;align-items:center">
          <button type="button" class="btn primary" id="lsrSubmit">Request songs · pay</button>
          <button type="button" class="btn ghost" id="lsrSeedWallet">+ $50 demo credit</button>
          <span class="chip">Wallet ${ue(i)}</span>
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
      ${n}
    </div>`}function cu(e){var n;const t=e.endedAt?Math.max(0,Math.floor((e.endedAt-e.startedAt)/1e3)):Math.max(0,Math.floor((Date.now()-e.startedAt)/1e3)),s=String(Math.floor(t/60)).padStart(2,"0"),i=String(t%60).padStart(2,"0"),a=Le(e.viewers||0),r=e.endedAt?`<div class="live-stage-meta"><span class="chip">Ended · ${N(e.endedAt)}</span></div>`:`<div class="live-hoodie live-hoodie--stage" aria-label="Live · ${l(a)} watching">
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
        ${r}
        <p class="live-stage-note">TEST MODE · no camera / no real stream · branding + chat demo only</p>
      </div>

      <div class="row wrap live-earn" style="margin-top:10px">
        <span class="chip">Tips ${ue(e.tipsTotal)}</span>
        <span class="chip">Gifts ${ue(e.giftsTotal||0)}</span>
        <span class="chip">Song reqs (see queue)</span>
        <span class="chip">Coins ${fe(si())}</span>
        <span class="chip">Wallet ${ue(((n=D().wallet)==null?void 0:n.balance)||0)}</span>
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
  `}function du(e){const t=Number(e==null?void 0:e.targetAmount)||0;return t<=0?0:Math.min(100,Math.round((Number(e.raised)||0)/t*100))}function pu(e){const t=Math.max(0,Number(e)-Date.now());if(t<=0)return"Ended · 24h window over";const s=Math.floor(t/36e5),i=Math.floor(t%36e5/6e4);return s>=1?`Resets in ${s}h ${i}m`:`Resets in ${i}m`}function uu(e,t){if(!e||e.endedAt)return"";const s=e.hostId,i=Zo(s),a=!!(t&&s&&t.id===s),r=si();if(!i)return a?`
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
      </div>`;const o=du(i),n=!!(i.completedAt||o>=100),d=o>=100?"Complete":o>=70?"Close":o>=30?"On the way":"Far",c=[50,100,250].map(m=>`<button type="button" class="btn ghost live-goal-donate" data-goal-id="${l(i.id)}" data-coins="${m}" title="≈ $${(m/50).toFixed(0)}">Donate ${m} coins</button>`).join(""),p=a?`<details class="live-goal-edit" style="margin-top:10px">
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
        <span class="chip${n?" chip-ok":""}">${n?"Goal met":l(d)}</span>
      </div>
      <p class="muted" style="margin:4px 0 8px;font-size:12px">${l(pu(i.endsAt))} · @${l(i.hostName||e.hostName)} · TEST MODE</p>
      <div class="live-goal-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${o}" aria-label="Goal progress">
        <div class="live-goal-fill" style="width:${o}%"></div>
      </div>
      <p class="live-goal-amounts" style="margin:8px 0 10px">
        <strong>${ue(i.raised)}</strong> / ${ue(i.targetAmount)}
        <span class="muted"> · ${o}%</span>
        <span class="chip" style="margin-left:8px">Coins ${l(fe(r))}</span>
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
    </div>`}function mu(e){return e?`
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
      </div>`}function hu(e){return e.length?`
    <div class="card">
      <h3>Recent streams (this device)</h3>
      <ul class="list-plain">
        ${e.slice(0,8).map(t=>`<li>
              <span><strong>${l(t.title)}</strong><br/><span class="muted" style="font-size:12px">@${l(t.hostName)} · ${N(t.endedAt||t.startedAt)} · tips ${ue(t.tipsTotal)}</span></span>
              <span class="chip">${t.endedAt?"Ended":"Live"}</span>
            </li>`).join("")}
      </ul>
    </div>`:""}function gu(e){if(!e||e.endedAt)return"";const t=Jo(10),s=t.length?t.map((n,d)=>{const c=Ye(n.lastSlug||"rose",{className:"gift-sticker gift-sticker--xs"});return`<div class="live-obar-cell" title="${l(n.username)} · ${ue(n.usd)} today">
            <span class="live-obar-rank">${d+1}</span>
            ${c}
            <span class="live-obar-name">${l(n.username)}</span>
          </div>`}).join(""):'<div class="live-obar-empty muted">No gifters yet today</div>',i=ca(10),a=i.length?i.map((n,d)=>{const c=Ye("battle-win",{className:"gift-sticker gift-sticker--xs"});return`<div class="live-obar-cell" title="${l(n.username)} · rest of day">
            <span class="live-obar-rank">${d+1}</span>
            ${c}
            <span class="live-obar-name">${l(n.username)}</span>
          </div>`}).join(""):'<div class="live-obar-empty muted">No winners yet today</div>',r=Wi(e.id).find(n=>n.status==="playing");let o="";if(r){const n=r.title||"Song";o=`
      <div class="live-obar live-obar-spotlight" id="liveRequestSpotlight" role="status" aria-live="polite">
        <span class="live-obar-label">Request Spotlight</span>
        <span class="live-obar-spotlight-name">@${l(r.username||"fan")}</span>
        <span class="muted live-obar-spotlight-song">${l(n)}</span>
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
    </div>`}function fu(e){const t=$l();if(!t)return"";const s=Ye(t.giftSlug||"rose",{className:"gift-sticker"}),a=e&&e.id===t.fromUserId?`<p class="muted" style="margin:8px 0 0;font-size:12px">You triggered this · others can Challenge you · TEST MODE</p>
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
    </div>`}function vu(e){var a,r,o,n,d,c,p,m;la();const t=ra();if(!t||!e)return"";if(t.status==="active"||t.status==="ended"){const g=Math.max(0,Number(t.scoreA)||0),f=Math.max(0,Number(t.scoreB)||0),b=g+f,y=t.status==="active"?Math.max(0,Math.ceil((Number(t.endsAt)-Date.now())/1e3)):0,v=t.winnerName?"@"+l(t.winnerName):"Tie";return`
      <section class="card live-battle-scoreboard" aria-label="Live Gift Battle scoreboard">
        <div class="row wrap" style="justify-content:space-between;align-items:center">
          <strong>⚔️ PIKK Live Battle</strong>
          <span class="chip" id="liveBattleTimer" data-ends-at="${Number(t.endsAt)||0}">${t.status==="active"?y+"s left":"Finished"}</span>
        </div>
        <div class="row" style="justify-content:space-between;gap:12px;margin:12px 0">
          <div><strong>@${l(((a=t.challenger)==null?void 0:a.name)||"Challenger")}</strong><div>${Le(g)} demo points</div></div>
          <strong>VS</strong>
          <div style="text-align:right"><strong>@${l(((r=t.opponent)==null?void 0:r.name)||"Opponent")}</strong><div>${Le(f)} demo points</div></div>
        </div>
        <div class="live-battle-score-track" role="progressbar" aria-label="Challenger share of battle points" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${b?Math.round(g/b*100):50}" style="height:10px;background:var(--blue);border-radius:10px;overflow:hidden">
          <div style="width:${b?Math.round(g/b*100):50}%;height:100%;background:var(--acc)"></div>
        </div>
        ${t.status==="ended"?`<p class="live-battle-winner" style="font-weight:800;margin-top:10px">🏆 ${v} · Battle complete</p>`:'<p class="muted" style="margin-top:10px">Scores update with demo gifts · no real money</p>'}
        <a href="#/giftbattles" class="btn ghost" style="margin-top:8px">Battle details</a>
      </section>`}if(t.status!=="pending")return"";const s=((o=t.opponent)==null?void 0:o.id)===e.id,i=((n=t.challenger)==null?void 0:n.id)===e.id;return!s&&!i?`
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
    </div>`}function bu(){const e=ca(10);return e.length?`
    <div class="card live-gb-day" id="liveGbDayWinners">
      <h3 style="margin:0 0 6px">Gift Battle winners today</h3>
      <p class="muted" style="margin:0 0 8px;font-size:12px">Up to 10 · until end of day · TEST MODE</p>
      <ul class="live-gb-day-list">${e.map((s,i)=>`<li class="live-gb-day-row"><span class="live-gb-day-sticker">${Ye("battle-win",{className:"gift-sticker gift-sticker--xs"})}</span><span class="chip">#${i+1}</span><strong>${l(s.username)}</strong></li>`).join("")}</ul>
    </div>`:""}function yu(){var p;const{user:e,live:t}=D(),s=jo(),i=t&&!t.endedAt,a=!!t,r=Zr(),o=((p=Oe().query)==null?void 0:p.category)||"";let d=`
    <div class="live-disc-panel" data-panel="channels">
      ${o?`<div class="card"><strong>Category: ${l(o)}</strong> <a class="btn ghost" href="#/live?tab=categories">All categories</a> <a class="btn ghost" href="#/live?tab=channels">All channels</a><p class="muted small">Only channels tagged with this category are shown below.</p></div>`:""}
      ${nu(o)}
      ${o?"":bu()}
      ${i?"":mu(e)}
      ${i?"":eo({title:"No active Live on this device — house catalog on Spotlight / Open Mic"})}
      ${hu(s)}
      <div class="card">
        <p class="muted" style="margin:0 0 8px">More Live tools</p>
        <div class="row wrap">
          <a class="btn ghost" href="#/connect#connect-multistream">Multi-platform go-live</a>
          <a class="btn ghost" href="#/multiguest">Multi-Guest</a>
          <a class="btn ghost" href="#/shorts">Shorts / Clips</a>
        </div>
        <p class="muted" style="margin:8px 0 0;font-size:12px">Open Mic + Spotlight are 24/7 categories (chips above). Clips live under Watch → Shorts / Clips. Gifts + song requests run during an active Live. Gift Battles is not promoted from this page.</p>
      </div>
    </div>`;r==="following"?d=tu(e):r==="categories"&&(d=iu());const c=`
    ${eu(r)}
    ${Zp("live")}
    ${i?gu(t):""}
    ${i?fu(e):""}
    ${i?vu(e):""}
    ${a?cu(t):""}
    ${i?uu(t,e):""}
    ${i?ou(t,e):""}
    ${i?lu(t,e):""}
    ${d}
  `;return M("PIKK Live",c,{lead:"Following · Clips · Channels · Categories → Shorts · Request Spotlight · TEST MODE.",badge:i?"LIVE":void 0})}const Fi=[];let $i=!1;function ku(e,t){Fi.push(t),to(e)}function to(e){if($i)return;const t=e.querySelector("#liveGiftOverlay");if(!t){Fi.length=0;return}const s=Fi.shift();if(!s)return;$i=!0;const a=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches?900:s.tier==="cinematic"?4200:s.tier==="premium"?2800:1600;t.innerHTML=`
    <div class="lg-overlay-card lg-tier-${l(s.tier||"small")}" data-slug="${l(s.slug)}">
      <div class="lg-overlay-sticker">${Ye(s.slug)}</div>
      <div class="lg-overlay-copy">
        <strong>${l(s.name)}</strong>
        <span>@${l(s.fromUser)} · ${l(fe(s.coins))} coins</span>
        <span class="muted lg-overlay-brief">${l(s.animation||"")}</span>
      </div>
    </div>`,t.classList.add("is-on"),window.setTimeout(()=>{t.classList.remove("is-on"),t.innerHTML="",$i=!1,to(e)},a)}function wu(e){e.querySelectorAll(".lg-buy").forEach(t=>{t.addEventListener("click",()=>{const s=Vn(Number(t.dataset.coins));if((s==null?void 0:s.error)==="bad_package")return h("Unknown coin pack");if(s!=null&&s.error)return h(String(s.error));h(`+${fe(s.pack.coins)} coins · ${ue(s.pack.usd)} · TEST MODE`),de()})}),e.querySelectorAll(".lg-gift").forEach(t=>{t.addEventListener("click",()=>{var n,d,c;const s=t.dataset.slug,i=t.dataset.confirm==="1",a=Ji.find(p=>p.slug===s);if(!a)return h("Gift not found");if(i&&!window.confirm(`Send ${a.name} for ${fe(a.coins)} coins (${ue(a.usd)})?
TEST MODE · demo coins only`))return;const r=(n=D().live)==null?void 0:n.id,o=Qo({liveId:r,slug:s});if((o==null?void 0:o.error)==="signin")return h("Sign in first");if((o==null?void 0:o.error)==="offline")return h("Not live");if((o==null?void 0:o.error)==="insufficient")return h(`Need ${fe(o.need)} coins — buy a pack below · TEST MODE`);if((o==null?void 0:o.error)==="bad_gift")return h("Unknown gift");if(o!=null&&o.error)return h(String(o.error));ku(e,{slug:a.slug,name:a.name,coins:a.coins,tier:a.tier,animation:a.animation,fromUser:((d=o.entry)==null?void 0:d.fromUser)||((c=D().user)==null?void 0:c.username)||"you"}),h(`Sent ${a.name} · ${fe(a.coins)} coins · TEST MODE`),window.setTimeout(()=>de(),200)})})}function Su(e){var o,n;const t=e.querySelector("#lsrPacks"),s=e.querySelector("#lsrTitleFields");if(!t||!s)return;let i=1;const a=()=>{const d=i,c=Array.from({length:d},(p,m)=>`<div class="field"><label>Song ${m+1}</label>
        <input class="lsr-title-input" data-i="${m}" maxlength="80" placeholder="Song title…" /></div>`).join("");s.innerHTML=c},r=d=>{i=Number(d)||1,t.querySelectorAll(".lsr-pack").forEach(c=>{const p=Number(c.dataset.pack)===i;c.classList.toggle("on",p),c.setAttribute("aria-pressed",p?"true":"false")}),a()};t.querySelectorAll(".lsr-pack").forEach(d=>{d.addEventListener("click",()=>r(d.dataset.pack))}),r(1),(o=e.querySelector("#lsrSeedWallet"))==null||o.addEventListener("click",()=>{Fs(50,"Song request demo credit · TEST MODE"),h("+$50 wallet demo · TEST MODE"),de()}),(n=e.querySelector("#lsrSubmit"))==null||n.addEventListener("click",()=>{const d=Array.from(e.querySelectorAll(".lsr-title-input")).map(p=>p.value),c=Ko({pack:i,titles:d});if((c==null?void 0:c.error)==="signin")return h("Sign in first");if((c==null?void 0:c.error)==="offline")return h("Not live");if((c==null?void 0:c.error)==="bad_pack")return h("Pick a pack");if((c==null?void 0:c.error)==="title_count")return h(`Enter ${c.need} song title${c.need>1?"s":""}`);if((c==null?void 0:c.error)==="insufficient")return h(`Need ${ue(c.need)} — tap + $50 demo credit · TEST MODE`);if(c!=null&&c.error)return h(String(c.error));h(`Song request submitted · ${ue(c.entry.price)} · TEST MODE`),de()}),e.querySelectorAll(".lsr-play").forEach(d=>{d.addEventListener("click",()=>{var b;const c=d.dataset.rid,p=Number(d.dataset.si),g=Wi((b=D().live)==null?void 0:b.id).find(y=>y.requestId===c&&y.songIndex===p);let f;if((g==null?void 0:g.status)==="playing"){if(f=Vo(c,p),(f==null?void 0:f.error)==="host_only")return h("Host only");if(f!=null&&f.error)return h(String(f.error));h("Marked played · TEST MODE")}else{if(f=Go(c,p),(f==null?void 0:f.error)==="host_only")return h("Host only");if(f!=null&&f.error)return h(String(f.error));h("Now playing · TEST MODE")}de()})}),e.querySelectorAll(".lsr-skip").forEach(d=>{d.addEventListener("click",()=>{const c=Uo(d.dataset.rid,Number(d.dataset.si));if((c==null?void 0:c.error)==="host_only")return h("Host only");if(c!=null&&c.error)return h(String(c.error));h("Skipped · TEST MODE"),de()})})}function $u(e){var s,i,a,r,o,n,d,c;e.querySelectorAll(".hot-live-watch").forEach(p=>{p.addEventListener("click",()=>{yi();const m=p.dataset.host||"creator",g=p.dataset.id||"",f=e.querySelector(`.hot-live-card[data-live-id="${CSS.escape(g)}"]`);e.querySelectorAll(".hot-live-card.is-watching").forEach(b=>b.classList.remove("is-watching")),f==null||f.classList.add("is-watching"),h(`Watching @${m} · demo only`)})}),e.querySelectorAll(".hot-live-spike").forEach(p=>{p.addEventListener("click",()=>{var b;const m=p.dataset.id,g=kd(m);if((g==null?void 0:g.error)==="missing")return h("Live not found");if(g!=null&&g.error)return h(String(g.error));const f=((b=g.live)==null?void 0:b.hostName)||"creator";h(g.deduped?`Spike @${f} · Admin alert already open`:`Spike @${f} · Admin engagement alert queued`),de()})}),(s=e.querySelector("#liveStart"))==null||s.addEventListener("click",()=>{var b,y,v,w,$;const p=(y=(b=e.querySelector("#liveTitle"))==null?void 0:b.value)==null?void 0:y.trim(),m=Na(p);if((m==null?void 0:m.error)==="signin")return h("Sign in first");if((m==null?void 0:m.error)==="already_live")return h("Already live");const g=(w=(v=e.querySelector("#liveGoalNameGo"))==null?void 0:v.value)==null?void 0:w.trim(),f=Number(($=e.querySelector("#liveGoalAmtGo"))==null?void 0:$.value);if(g&&f>0){const A=Jn({name:g,targetAmount:f});(A==null?void 0:A.error)==="signin"?h("Sign in to set goal"):A!=null&&A.error?h("Goal not set · "+A.error):h(`Live goal set · $${f} · 24h · TEST MODE`)}yi(),h("You are live · TEST MODE"),de()}),(i=e.querySelector("#liveRestart"))==null||i.addEventListener("click",()=>{var g;const p="PIKK Live · "+(((g=D().user)==null?void 0:g.username)||"Demo"),m=Na(p);if(m!=null&&m.error)return h(String(m.error));yi(),h("Back live · TEST MODE"),de()}),(a=e.querySelector("#liveEnd"))==null||a.addEventListener("click",()=>{No(),Cd(),h("Stream ended"),de()}),(r=e.querySelector("#liveBumpViewers"))==null||r.addEventListener("click",()=>{const p=Bo(),m=e.querySelector("#liveViewers");m&&p&&(m.textContent=Le(p.viewers||0)),h("Viewers updated (stub)")}),(o=e.querySelector("#liveTip"))==null||o.addEventListener("click",p=>{const m=p.currentTarget,g=Gn({kind:"tip",amount:Number(m.dataset.amt)||1});if((g==null?void 0:g.error)==="signin")return h("Sign in first");if((g==null?void 0:g.error)==="offline")return h("Not live");h("Tip sent · demo"),de()});const t=()=>{var f;const p=e.querySelector("#liveChatInput"),m=(f=p==null?void 0:p.value)==null?void 0:f.trim();if(!m)return h("Type a message");const g=Ro(m);if((g==null?void 0:g.error)==="signin")return h("Sign in first");if((g==null?void 0:g.error)==="offline")return h("Not live");(g==null?void 0:g.error)!=="empty"&&(p&&(p.value=""),de())};(n=e.querySelector("#liveChatSend"))==null||n.addEventListener("click",t),(d=e.querySelector("#liveChatInput"))==null||d.addEventListener("keydown",p=>{p.key==="Enter"&&t()}),(c=e.querySelector("#liveFocusGifts"))==null||c.addEventListener("click",()=>{var p;(p=e.querySelector("#liveGifts"))==null||p.scrollIntoView({behavior:"smooth",block:"start"})}),wu(e),Su(e),xu(e)}function xu(e){var i;(i=e.querySelector("#liveGoalSave"))==null||i.addEventListener("click",()=>{var n,d,c;const a=(d=(n=e.querySelector("#liveGoalName"))==null?void 0:n.value)==null?void 0:d.trim(),r=Number((c=e.querySelector("#liveGoalAmt"))==null?void 0:c.value),o=Jn({name:a,targetAmount:r});if((o==null?void 0:o.error)==="signin")return h("Sign in first");if((o==null?void 0:o.error)==="bad_name")return h("Enter a goal name");if((o==null?void 0:o.error)==="bad_amount")return h("Enter a goal amount ($)");if(o!=null&&o.error)return h(String(o.error));h(`Goal live · $${o.goal.targetAmount} · 24h window · TEST MODE`),de()});const t=e.querySelector("#liveGoalSupportMessage"),s=e.querySelector("#liveGoalSupportMessageCount");if(t&&s){const a=()=>{s.textContent=`${t.value.length} / 180`};t.addEventListener("input",a),a()}e.querySelectorAll(".live-goal-custom-form").forEach(a=>{a.addEventListener("submit",r=>{var d,c;r.preventDefault();const o=Number((d=a.querySelector(".live-goal-custom-coins"))==null?void 0:d.value);if(!Number.isSafeInteger(o)||o<1||o>1e6)return h("Enter 1–1,000,000 whole coins");const n=_i(a.dataset.goalId,o,{message:((c=e.querySelector("#liveGoalSupportMessage"))==null?void 0:c.value)||""});if((n==null?void 0:n.error)==="signin")return h("Sign in first");if((n==null?void 0:n.error)==="insufficient")return h("Not enough demo coins");if(n!=null&&n.error)return h("Donation unavailable · TEST MODE");h("Custom donation sent · TEST MODE"),de()})}),e.querySelectorAll(".live-goal-donate").forEach(a=>{a.addEventListener("click",()=>{var c,p;const r=a.dataset.goalId,o=Number(a.dataset.coins),n=_i(r,o,{message:((c=e.querySelector("#liveGoalSupportMessage"))==null?void 0:c.value)||""});if((n==null?void 0:n.error)==="signin")return h("Sign in first");if((n==null?void 0:n.error)==="insufficient")return h(`Need ${fe(n.need)} coins — buy a pack in Gifts · TEST MODE`);if((n==null?void 0:n.error)==="expired")return h("Goal ended · 24h window over");if((n==null?void 0:n.error)==="unknown_goal")return h("Goal not found");if((n==null?void 0:n.error)==="invalid_amount")return h("Pick a donate amount");if(n!=null&&n.error)return h(String(n.error));const d=((p=n.donated)==null?void 0:p.usd)??o/50;h(`Donated ${fe(o)} coins ($${Number(d).toFixed(2)}) · TEST MODE`),de()})})}const Eu={BASE_URL:"/pikk-app/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_BASE:"/pikk-app/",VITE_BUILD_SHA:"68e82409a20de28fe560bfed35950a24a0e64c9d"};function Au(e=Eu&&"/pikk-app/"||"/"){return String(e).replace(/\/?$/,"/")+"brand/pikk-official-approved.jpg"}const Ps=ge.filter(e=>["dirty-money","93","no-love"].includes(e.id)).map(e=>({id:e.id,title:e.title,artist:"DatBoiSkeet",url:e.youtube,thumbnail:`https://i.ytimg.com/vi/${encodeURIComponent(new URL(e.youtube).searchParams.get("v"))}/hqdefault.jpg`})),mn=[{id:"videos",label:"Videos"},{id:"clips",label:"Viral clips",browseHref:"#/shorts",browseLabel:"Browse existing PIKK Clips"},{id:"songs",label:"Songs",browseHref:"#/music",browseLabel:"Explore PIKK Music"},{id:"photos",label:"Photos",browseHref:"#/home",browseLabel:"Explore PIKK Home"}];function Cu(){const e=Ps[0],t=Ps.map((s,i)=>`
    <button type="button" class="pikk-viral-choice${i===0?" is-selected":""}"
      data-viral-pick="${i}" aria-pressed="${i===0}">
      <span class="pikk-viral-choice-num">${String(i+1).padStart(2,"0")}</span>
      <img class="pikk-viral-choice-thumb" src="${l(s.thumbnail)}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer">
      <span class="pikk-viral-choice-copy"><strong>${l(s.title)}</strong><small>${l(s.artist)} · Original YouTube source</small></span>
      <span class="pikk-viral-choice-arrow" aria-hidden="true">↗</span>
    </button>`).join("");return M("PIKK Viral Live",`
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
        <div class="pikk-viral-hero-mark" aria-hidden="true"><img class="pikk-viral-hero-logo" src="${l(Au())}" alt="" decoding="async" loading="eager"></div>
      </section>

      <div class="pikk-viral-notice" role="status">
        <strong>PREVIEW · NOT BROADCASTING</strong>
        <span>Real-time viewer counts, live chat, engagement ranking and 24/7 playback are not connected. Nothing here is represented as live.</span>
      </div>

      <nav class="pikk-viral-tabs" aria-label="Viral Live content types" role="tablist">
        ${mn.map((s,i)=>`<button type="button" role="tab" data-viral-type="${s.id}" aria-selected="${i===0}" tabindex="${i===0?0:-1}" aria-controls="viral-panel-${s.id}" id="viral-tab-${s.id}">${s.label}</button>`).join("")}
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
        <div class="pikk-viral-section-head"><h3>Up next · source library</h3><span>Manual preview · ${Ps.length} existing music videos</span></div>
        <div class="pikk-viral-queue" id="pikkViralQueue" role="group" aria-label="Choose an original video source">${t}</div>
      </section>

      ${mn.filter(s=>s.id!=="videos").map(s=>`
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
  `,{lead:"Discover the planned 24/7 viral channel · preview only"})}function Tu(e){const t=e.querySelector("#pikkViralPreview");if(!t)return;t.querySelectorAll("[data-viral-pick]").forEach(r=>{r.addEventListener("click",()=>{const o=Number(r.dataset.viralPick),n=Ps[o];n&&(t.querySelector("#pikkViralTitle").textContent=n.title,t.querySelector("#pikkViralCreator").textContent=n.artist+" · Watch from the original publisher",t.querySelector("#pikkViralSource").href=n.url,t.querySelector("#pikkViralThumbnail").src=n.thumbnail,t.querySelectorAll("[data-viral-pick]").forEach(d=>{const c=d===r;d.classList.toggle("is-selected",c),d.setAttribute("aria-pressed",String(c))}))})});const s=Array.from(t.querySelectorAll("[data-viral-pick]"));s.forEach((r,o)=>{r.addEventListener("keydown",n=>{if(!["ArrowRight","ArrowLeft","ArrowDown","ArrowUp","Home","End"].includes(n.key))return;n.preventDefault();const d=s.length-1,c=n.key==="Home"?0:n.key==="End"?d:(o+(["ArrowRight","ArrowDown"].includes(n.key)?1:-1)+s.length)%s.length,p=s[c];p.click(),p.focus(),p.scrollIntoView({block:"nearest",inline:"nearest"})})});const i=Array.from(t.querySelectorAll("[data-viral-type]"));function a(r,o=!1){const n=r.dataset.viralType;i.forEach(d=>{const c=d===r;d.setAttribute("aria-selected",String(c)),d.tabIndex=c?0:-1}),t.querySelectorAll("[data-viral-panel]").forEach(d=>{d.hidden=d.dataset.viralPanel!==n}),o&&(r.focus(),r.scrollIntoView({block:"nearest",inline:"nearest"}))}i.forEach((r,o)=>{r.addEventListener("click",()=>a(r)),r.addEventListener("keydown",n=>{if(!["ArrowRight","ArrowLeft","Home","End"].includes(n.key))return;n.preventDefault();const d=i.length-1,c=n.key==="Home"?0:n.key==="End"?d:(o+(n.key==="ArrowRight"?1:-1)+i.length)%i.length;a(i[c],!0)})})}function zt(){q("#/marketplace")}const Du={pending:"Pending",approved:"Approved",rejected:"Rejected"},Mu=[{v:"sponsored_post",label:"Sponsored post"},{v:"livestream_promo",label:"Livestream promo"},{v:"affiliate",label:"Affiliate link"},{v:"storefront",label:"Product storefront"}];function Lu(){const{brandApps:e,user:t}=D(),s=il(),i=s.filter(n=>n.active),a=i.length?i.map(n=>`
      <article class="card market-listing" data-id="${l(n.id)}">
        <div class="row wrap">
          <span class="chip">Sponsored</span>
          <span class="chip">${l(n.disclosure||"Paid partnership")}</span>
          <span class="muted spacer" style="text-align:right;font-size:12px">${N(n.at)}</span>
        </div>
        <h3 style="margin:8px 0 4px">${l(n.title)}</h3>
        <p class="muted" style="margin:0 0 6px">${l(n.brand)}</p>
        <p style="margin:0 0 10px;font-size:14px">${l(n.blurb||"")}</p>
        <div class="row wrap">
          ${n.url?`<a class="btn" href="${l(n.url)}" target="_blank" rel="noopener">Visit offer</a>`:""}
          <button class="btn ghost listing-toggle" data-id="${l(n.id)}" data-active="0">Hide · demo</button>
        </div>
      </article>`).join(""):'<div class="card"><p class="muted" style="margin:0">No active sponsored listings yet. Apply as a brand or create a demo listing below.</p></div>',r=e.length?e.map(n=>`
      <div class="card" style="margin:0 0 10px;background:#12121a" data-app="${l(n.id)}">
        <div class="row wrap">
          <strong>${l(n.brand)}</strong>
          <span class="chip">${l(Du[n.status]||n.status)}</span>
          <span class="muted spacer" style="text-align:right">${N(n.at)}</span>
        </div>
        <p class="muted" style="margin:6px 0;font-size:12px">${l(n.email)} · ${l(n.campaign)} · budget ${l(n.budget||"—")}</p>
        <p style="font-size:13px;margin:0 0 8px">${l((n.pitch||"").slice(0,160))}</p>
        <div class="row wrap">
          <button class="btn primary brand-status" data-id="${l(n.id)}" data-status="approved">Approve</button>
          <button class="btn ghost brand-status" data-id="${l(n.id)}" data-status="rejected">Reject</button>
          ${n.status==="approved"?`<button class="btn brand-to-listing" data-id="${l(n.id)}" data-brand="${l(n.brand)}" data-url="${l(n.url||"")}" data-pitch="${l(n.pitch||"")}">Create listing</button>`:""}
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
          ${Mu.map(n=>`<option value="${n.v}">${l(n.label)}</option>`).join("")}
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
      ${r}
      <p class="muted" style="font-size:12px;margin-top:8px">Demo approve / reject here. Approved apps can spawn a listing.</p>
    </div>

    ${s.some(n=>!n.active)?`<div class="card">
            <h3>Hidden listings</h3>
            ${s.filter(n=>!n.active).map(n=>`<div class="row wrap" style="margin-bottom:8px">
                  <span>${l(n.title)} · ${l(n.brand)}</span>
                  <button class="btn ghost listing-toggle" data-id="${l(n.id)}" data-active="1">Show</button>
                </div>`).join("")}
          </div>`:""}
  `;return M("Marketplace",o,{lead:"Brand applications & sponsored listings · localStorage demo."})}function Iu(e){var t,s;(t=e.querySelector("#mSubmit"))==null||t.addEventListener("click",()=>{var a,r,o,n,d,c,p;const i=el({brand:(a=e.querySelector("#mBrand"))==null?void 0:a.value,contact:(r=e.querySelector("#mContact"))==null?void 0:r.value,email:(o=e.querySelector("#mEmail"))==null?void 0:o.value,budget:(n=e.querySelector("#mBudget"))==null?void 0:n.value,campaign:(d=e.querySelector("#mCampaign"))==null?void 0:d.value,url:(c=e.querySelector("#mUrl"))==null?void 0:c.value,pitch:(p=e.querySelector("#mPitch"))==null?void 0:p.value});if((i==null?void 0:i.error)==="required")return h("Brand and email required");h("Application saved"),zt()}),e.querySelectorAll(".brand-status").forEach(i=>{i.addEventListener("click",()=>{tl(i.dataset.id,i.dataset.status),h("Marked "+i.dataset.status),zt()})}),e.querySelectorAll(".brand-to-listing").forEach(i=>{i.addEventListener("click",()=>{const a=i.dataset.brand||"Brand",r=ja({title:`${a} · sponsored`,brand:a,blurb:i.dataset.pitch||"Sponsored offer from approved brand application.",url:i.dataset.url||"",disclosure:"Paid partnership · TEST MODE",brandAppId:i.dataset.id});if(r!=null&&r.error)return h("Could not create listing");h("Listing published"),zt()})}),(s=e.querySelector("#lCreate"))==null||s.addEventListener("click",()=>{var a,r,o,n,d;const i=ja({title:(a=e.querySelector("#lTitle"))==null?void 0:a.value,brand:(r=e.querySelector("#lBrand"))==null?void 0:r.value,blurb:(o=e.querySelector("#lBlurb"))==null?void 0:o.value,url:(n=e.querySelector("#lUrl"))==null?void 0:n.value,disclosure:(d=e.querySelector("#lDisc"))==null?void 0:d.value});if((i==null?void 0:i.error)==="required")return h("Title and brand required");h("Listing published"),zt()}),e.querySelectorAll(".listing-toggle").forEach(i=>{i.addEventListener("click",()=>{sl(i.dataset.id,i.dataset.active==="1"),h(i.dataset.active==="1"?"Listing shown":"Listing hidden"),zt()})})}function re(e){q(e||"#/messages")}function Pu(e){const t=e.messages||[];if(!t.length)return"No messages yet";const s=t[t.length-1];return(s.priority?"⚡ ":"")+(s.text||"").slice(0,80)}function _u(){return M("Messages",`<section class="pikk-msg-flow-hero" aria-label="PIKK messages sign-in">
      <span class="pikk-msg-flow-kicker">PIKK CONNECT · PRIVATE MESSAGES</span>
      <h2>Your conversations. <em>Your circle.</em></h2>
      <p>Try DMs, group conversations and the DatBoiSkeet team inbox with a local demo account.</p>
      <span class="chip">TEST MODE · No server messaging</span>
    </section>
    <div class="card pikk-msg-flow-panel">
      <h3>Sign in required</h3>
      <p class="muted">Private DMs, team inbox, and group chats need a local demo account.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,{lead:"Private messaging & team inbox · TEST MODE"})}function qu(e){const t=Zi(),s=t.filter(r=>js(r)>0),i=D().messagePrefs||{allowDMs:!0,allowRequests:!0},a=t.map(r=>{const o=r.kind==="group",n=!o&&r.peerId==="dbs",d=[o?'<span class="chip">Group</span>':"",n?'<span class="chip">Team</span>':"",r.request?'<span class="chip">Request</span>':"",r.muted?'<span class="chip">Muted</span>':"",r.blocked?'<span class="chip">Blocked</span>':""].filter(Boolean).join(" "),c=js(r),p=c?`<span class="chip msg-unread-chip" aria-label="${c} unread">${c}</span>`:"";return`
      <button type="button" class="msg-thread-row${c?" has-unread":""}" data-search="${l(String(r.peerName||r.peerId).toLowerCase())}" data-unread="${c>0}" data-open-thread="${l(r.id)}">
        <div class="pikk-msg-avatar" aria-hidden="true">${l(String(r.peerName||r.peerId||"?").slice(0,1).toUpperCase())}</div>
        <div class="pikk-msg-thread-body"><div class="msg-thread-top">
          <strong>${l(r.peerName||r.peerId)}</strong>
          <span class="muted">${l(N(r.updatedAt||0))}</span>
        </div>
        <div class="msg-thread-preview muted">${l(Pu(r))}</div>
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
  `}function Ou(){return`
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
    <section class="pikk-msg-contact-grid" aria-label="Available demo contacts">${gs().map(s=>{const i=s.team||Xn(s.id),a=s.team?"Team inbox":i?"Message":"Message request";return`
      <article class="card msg-contact pikk-msg-contact-card">
        <div class="msg-contact-head">
          <span class="pikk-msg-contact-avatar" aria-hidden="true">${l(String(s.username||"?").slice(0,1).toUpperCase())}</span>
          <strong>${l(s.username)}</strong>
          ${s.team?'<span class="chip">Official</span>':i?'<span class="chip">Mutual</span>':'<span class="chip">Request</span>'}
        </div>
        <p class="muted" style="margin:6px 0 10px">${l(s.bio||"")}</p>
        <button type="button" class="btn ${s.team?"primary":""}" data-start-peer="${l(s.id)}" data-peer-name="${l(s.username)}">${l(a)}</button>
      </article>`}).join("")}</section>
  `}function Nu(){return`
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
  `}function Bu(e,{teamPriorityHint:t=!1}={}){const s=D().user,i=e.kind==="group",a=!i&&e.peerId==="dbs",r=!!e.blocked,o=(e.messages||[]).map(c=>`
      <div class="msg-bubble ${c.from===(s==null?void 0:s.id)?"mine":""} ${c.priority?"priority":""}">
        <div class="msg-bubble-meta">
          <strong>${l(c.fromName||c.from)}</strong>
          ${c.priority?'<span class="chip priority-chip">Priority</span>':""}
          <span class="muted">${l(N(c.at))}</span>
        </div>
        <div class="msg-bubble-text">${l(c.text)}</div>
      </div>`).join(""),n=e.request?'<div class="msg-banner">Message request · recipient approval stub (demo still delivers locally)</div>':"",d=t?'<div class="msg-banner priority">Next send can use Priority $2.99 TEST MODE (wallet note only — not charged).</div>':"";return`
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
    ${n}
    ${d}
    <div class="card msg-thread-card pikk-msg-flow-panel">
      <div class="msg-thread" id="msgThread">${o||'<p class="muted">No messages yet — say hi.</p>'}</div>
      ${r?'<p class="muted" style="margin-top:10px">Thread blocked · composer disabled (demo).</p>':`<div class="msg-composer">
               <input id="msgInput" placeholder="${a?"Write an inquiry…":"Message…"}" maxlength="500" />
               <button type="button" class="btn primary" id="msgSend">Send</button>
               ${a?'<button type="button" class="btn" id="msgSendPriority" title="TEST MODE — not charged">Priority $2.99</button>':""}
             </div>`}
    </div>
  `}function Ru(e){var o,n,d;if(!D().user)return _u();gs(),ea();const s=((o=e==null?void 0:e.query)==null?void 0:o.view)||"",i=((n=e==null?void 0:e.query)==null?void 0:n.t)||"",a=((d=e==null?void 0:e.query)==null?void 0:d.priority)==="1";let r;if(i){const c=Qn(i);c?r=Bu(c,{teamPriorityHint:a&&c.peerId==="dbs"}):r='<div class="card"><p class="muted">Thread not found.</p><button type="button" class="btn" id="msgBackInbox">← Inbox</button></div>'}else s==="new"?r=Ou():s==="team"?r=Nu():r=qu();return M("Messages",r,{lead:"DMs, group chats, and DatBoiSkeet team inbox · TEST MODE"})}function ju(e){var c,p,m,g,f,b,y,v,w,$,A,k,L,C,O,E,se;if(!D().user)return;const s=()=>re("#/messages");(c=e.querySelector("#msgBackInbox"))==null||c.addEventListener("click",s),(p=e.querySelector("#msgMarkAllRead"))==null||p.addEventListener("click",()=>{const T=Zi().filter(_=>js(_)>0);T.length&&(T.forEach(_=>Fa(_.id)),h(`${T.length} conversation${T.length===1?"":"s"} marked read`),re("#/messages"))}),(m=e.querySelector("#msgNewChat"))==null||m.addEventListener("click",()=>re("#/messages?view=new")),(g=e.querySelector("#pikkNewChatTop"))==null||g.addEventListener("click",()=>re("#/messages?view=new"));const i=()=>{var Te,ne;const T=String(((Te=e.querySelector("#pikkMsgSearch"))==null?void 0:Te.value)||"").trim().toLowerCase(),_=!!((ne=e.querySelector("#pikkMsgUnreadOnly"))!=null&&ne.checked);let V=0;e.querySelectorAll("#msgInbox [data-open-thread]").forEach(be=>{const Ne=!T||String(be.dataset.search||"").includes(T),X=!_||be.dataset.unread==="true";be.hidden=!(Ne&&X),be.hidden||V++});const j=e.querySelector("#pikkMsgNoResults");j&&(j.textContent=_?T?"No unread conversations match your search.":"No unread conversations.":"No conversations match your search.",j.hidden=V>0||!T&&!_);const Ce=e.querySelector("#pikkMsgClearFilters");Ce&&(Ce.hidden=!T&&!_)};(f=e.querySelector("#pikkMsgClearFilters"))==null||f.addEventListener("click",()=>{const T=e.querySelector("#pikkMsgSearch"),_=e.querySelector("#pikkMsgUnreadOnly");T&&(T.value=""),_&&(_.checked=!1),i(),T==null||T.focus()});const a=e.querySelector("#pikkMsgSearch");a==null||a.addEventListener("input",i),a==null||a.addEventListener("keydown",T=>{T.key!=="Escape"||!a.value||(T.preventDefault(),T.stopPropagation(),a.value="",i())}),(b=e.querySelector("#pikkMsgUnreadOnly"))==null||b.addEventListener("change",i),(y=e.querySelector("#msgEmptyNew"))==null||y.addEventListener("click",()=>re("#/messages?view=new")),(v=e.querySelector("#msgOpenTeam"))==null||v.addEventListener("click",()=>re("#/messages?view=team")),(w=e.querySelector("#pikkGroupTop"))==null||w.addEventListener("click",()=>{var T;return(T=e.querySelector("#msgOpenGroup"))==null?void 0:T.click()}),($=e.querySelector("#msgOpenGroup"))==null||$.addEventListener("click",()=>{const T=ol();if(T!=null&&T.error){h("Sign in required");return}h("Opened DBS Fans"),re("#/messages?t="+encodeURIComponent(T.id))}),(A=e.querySelector("#msgTeamFree"))==null||A.addEventListener("click",()=>{const T=is("dbs","DatBoiSkeet");if(T.error)return h("Sign in required");re("#/messages?t="+encodeURIComponent(T.id))}),(k=e.querySelector("#msgTeamPriority"))==null||k.addEventListener("click",()=>{const T=is("dbs","DatBoiSkeet");if(T.error)return h("Sign in required");re("#/messages?t="+encodeURIComponent(T.id)+"&priority=1")}),e.querySelectorAll("[data-start-peer]").forEach(T=>{T.addEventListener("click",()=>{const _=T.dataset.startPeer,V=T.dataset.peerName||_;if(_==="dbs"){re("#/messages?view=team");return}const j=is(_,V);if(j.error)return h("Sign in required");j.request&&h("Request thread created · demo"),re("#/messages?t="+encodeURIComponent(j.id))})}),e.querySelectorAll("[data-open-thread]").forEach(T=>{T.addEventListener("click",()=>{re("#/messages?t="+encodeURIComponent(T.dataset.openThread))})}),(L=e.querySelector("#msgPrefDMs"))==null||L.addEventListener("change",T=>{Ka({allowDMs:!!T.target.checked}),h(T.target.checked?"DMs allowed":"DMs disabled (stub)")}),(C=e.querySelector("#msgPrefRequests"))==null||C.addEventListener("change",T=>{Ka({allowRequests:!!T.target.checked}),h(T.target.checked?"Requests allowed":"Requests disabled (stub)")});const r=new URLSearchParams(location.hash.split("?")[1]||"").get("t"),o=r?Qn(r):null;o&&Fa(o.id),e.querySelectorAll("[data-flag]").forEach(T=>{T.addEventListener("click",()=>{if(!o)return;const _=T.dataset.flag;if(_==="mute"){const V=vi(o.id,{muted:!o.muted});h(V.muted?"Muted":"Unmuted"),re("#/messages?t="+encodeURIComponent(o.id))}else if(_==="block"){const V=vi(o.id,{blocked:!o.blocked});h(V.blocked?"Blocked":"Unblocked"),re("#/messages?t="+encodeURIComponent(o.id))}else _==="report"&&(vi(o.id,{report:!0}),h("Reported · stub (Guidelines §13)"),re("#/messages?t="+encodeURIComponent(o.id)))})});const n=T=>{if(!o)return;const _=e.querySelector("#msgInput"),V=(_==null?void 0:_.value)||"";let j;if(o.kind==="group"?j=ll(o.id,V):j=nl(o.peerId,o.peerName,V,{priority:!!T}),(j==null?void 0:j.error)==="empty")return h("Type a message");if(j!=null&&j.error)return h("Could not send");h(T?"Priority sent · TEST MODE $2.99 not charged":"Sent"),re("#/messages?t="+encodeURIComponent(o.id))};(O=e.querySelector("#msgSend"))==null||O.addEventListener("click",()=>n(!1)),(E=e.querySelector("#msgSendPriority"))==null||E.addEventListener("click",()=>n(!0)),(se=e.querySelector("#msgInput"))==null||se.addEventListener("keydown",T=>{T.key==="Enter"&&(T.preventDefault(),n(!1))});const d=e.querySelector("#msgThread");d&&(d.scrollTop=d.scrollHeight)}const hn=Object.freeze({releases:!0,lives:!0,messages:!0,quietHours:!1}),ct=Object.freeze([{key:"releases",title:"New music releases",detail:"Keep track of new DatBoiSkeet music and official drops.",group:"discover"},{key:"lives",title:"Livestreams",detail:"Choose whether you want live-session updates.",group:"discover"},{key:"messages",title:"Messages",detail:"Control conversation notification preferences.",group:"social"},{key:"quietHours",title:"Quiet hours",detail:"Save your preference for a quieter experience.",group:"social"}]);function gn(e,t){const s=!!t[e.key];return`<label class="pikk-notif-row" for="pikk-notif-${e.key}">
    <span class="pikk-notif-row-copy"><strong>${e.title}</strong><small>${e.detail}</small></span>
    <input id="pikk-notif-${e.key}" type="checkbox" data-k="${e.key}" ${s?"checked":""} />
  </label>`}function Fu(){const e=D().notifications||{},t=ct.filter(s=>!!e[s.key]).length;return M("Notifications",`
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
          ${ct.filter(s=>s.group==="discover").map(s=>gn(s,e)).join("")}
        </section>
        <section class="pikk-notif-panel" aria-labelledby="pikkNotifSocialTitle">
          <div class="pikk-notif-panel-head"><span class="pikk-notif-panel-icon" aria-hidden="true">✉</span><div><span class="pikk-notif-kicker">YOUR SPACE</span><h3 id="pikkNotifSocialTitle">Social &amp; Focus</h3></div></div>
          ${ct.filter(s=>s.group==="social").map(s=>gn(s,e)).join("")}
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
    </div>`,{lead:"Music, live and social preferences · browser-local demo."})}function Ku(e){var i,a,r;const t=e.querySelector("#notifPrefs");if(!t)return;const s=o=>{const n=["releases","lives","messages"];gi(Object.fromEntries(n.map(g=>[g,o]))),t.querySelectorAll("input[data-k]").forEach(g=>{n.includes(g.dataset.k)&&(g.checked=o)});const d=D().notifications||{},c=ct.filter(g=>!!d[g.key]).length,p=t.querySelector("#pikkNotifEnabled");p&&(p.textContent=`${c} of 4`);const m=t.querySelector("#pikkNotifStatus");m&&(m.textContent=o?"Music, live and message preferences resumed on this device. Real push delivery is not connected.":"Music, live and message preferences paused on this device. Real push delivery is not connected."),h(o?"Alerts resumed":"Alerts paused")};(i=t.querySelector("#pikkNotifPause"))==null||i.addEventListener("click",()=>s(!1)),(a=t.querySelector("#pikkNotifResume"))==null||a.addEventListener("click",()=>s(!0)),(r=t.querySelector("#pikkNotifReset"))==null||r.addEventListener("click",()=>{gi(hn),t.querySelectorAll("input[data-k]").forEach(d=>{d.checked=hn[d.dataset.k]});const o=t.querySelector("#pikkNotifEnabled");o&&(o.textContent="3 of 4");const n=t.querySelector("#pikkNotifStatus");n&&(n.textContent="Notification preferences restored to defaults on this device."),h("Defaults restored")}),t.querySelectorAll("input[data-k]").forEach(o=>{o.addEventListener("change",()=>{const n=o.dataset.k;if(!ct.some(g=>g.key===n))return;gi({[n]:o.checked});const d=D().notifications||{},c=ct.filter(g=>!!d[g.key]).length,p=t.querySelector("#pikkNotifEnabled");p&&(p.textContent=`${c} of 4`);const m=t.querySelector("#pikkNotifStatus");m&&(m.textContent=`${ct.find(g=>g.key===n).title} preference saved on this device.`),h("Preference saved")})})}function tt(){q("#/wallet")}function R(e){return"$"+Number(e||0).toFixed(2)}function As(e){return Number(e||0).toLocaleString()}const Gu={pending:"Pending",completed:"Completed",rejected:"Rejected"};function Uu(){const{wallet:e,user:t,coins:s}=D(),i=e||{balance:0,history:[]},a=si(),r=[...(s==null?void 0:s.history)||[]].slice(0,10),o=Ho(),n=ls(),d=ia().filter(E=>E.count>0),c=zn(t==null?void 0:t.id),p=[...i.history||[]].slice(-12).reverse(),m=[...n.earnings||[]].slice(0,20),g=n.payouts||[],f=g.find(E=>E.status==="pending"),b=!f&&n.available>=n.threshold,y=n.verification==="demo_verified",v=p.length>0?`<ul class="list-plain">${p.map(E=>`<li>
          <span>${l(E.note||"Entry")}<br/><span class="muted" style="font-size:12px">${N(E.at)}</span></span>
          <strong style="color:${Number(E.amount)>=0?"var(--ok,#6dffb0)":"inherit"}">${Number(E.amount)>=0?"+":""}${R(E.amount)}</strong>
        </li>`).join("")}</ul>`:'<p class="muted" style="margin:0">No fan USD credit activity yet.</p>',w=o.map(E=>{const se=`pack_${E.coins}`;return`<button type="button" class="card coin-pack-btn" data-coins="${E.coins}" id="${l(se)}" style="text-align:left;cursor:pointer;margin:0;padding:12px;border:1px solid rgba(255,255,255,.08);background:#12121a">
        <div style="font-size:20px;font-weight:900">${As(E.coins)} <span class="muted" style="font-size:13px;font-weight:600">coins</span></div>
        <div class="muted" style="font-size:13px;margin-top:4px">${R(E.usd)} · TEST MODE</div>
        <div style="margin-top:8px"><span class="chip">Buy · demo credit</span></div>
      </button>`}).join(""),$=r.length>0?`<ul class="list-plain">${r.map(E=>{const se=Number(E.amount)||0;return`<li>
          <span>${l(E.note||"Coins")}<br/><span class="muted" style="font-size:12px">${N(E.at)}</span></span>
          <strong style="color:${se>=0?"var(--ok,#6dffb0)":"inherit"}">${se>=0?"+":""}${As(se)}</strong>
        </li>`}).join("")}</ul>`:'<p class="muted" style="margin:0">No coin purchases or gifts yet. Buy a pack below for Live gifts.</p>',A=c.length>0?`<ul class="list-plain">${c.slice(0,8).map(E=>`<li>
          <span>
            <strong>${l(E.note||E.label||"Live gift")}</strong>
            <span class="chip">80/20 NET</span>
            ${E.giftSlug?`<span class="chip">${l(E.giftSlug)}</span>`:""}
            <br/><span class="muted" style="font-size:12px">gross ${R(E.gross)} · fees ${R(E.fees)} · net ${R(E.net)} · ${N(E.at)}</span>
          </span>
          <span style="text-align:right;font-size:13px">
            <strong>${R(E.creatorShare)}</strong><br/>
            <span class="muted">PIKK ${R(E.dbsShare)}</span>
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
          ${d.map(E=>`<tr style="border-top:1px solid rgba(255,255,255,.06)">
            <td style="padding:8px 4px"><strong>${l(E.label)}</strong><br/><span class="muted" style="font-size:11px">${E.creatorPct}/${E.dbsPct} · ${E.count} line${E.count===1?"":"s"}</span></td>
            <td style="padding:8px 4px">${R(E.gross)}</td>
            <td style="padding:8px 4px">${R(E.fees)}</td>
            <td style="padding:8px 4px">${R(E.net)}</td>
            <td style="padding:8px 4px"><strong>${R(E.creatorShare)}</strong></td>
            <td style="padding:8px 4px">${R(E.dbsShare)}</td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>
    <p class="muted" style="font-size:12px;margin:8px 0 0">Default fees = demo 2.9% + $0.30. <strong>Live catalog gifts (t185u)</strong> treat listed USD as NET (fees $0) then 80/20. Seeded rows labeled in ledger.</p>`:'<p class="muted" style="margin:0">No creator earnings yet. Load demo earnings or receive Live tips/gifts.</p>',L=m.length>0?`<ul class="list-plain">${m.map(E=>`<li>
          <span>
            <strong>${l(E.label)}</strong>
            ${E.payoutId?'<span class="chip">In payout</span>':'<span class="chip">Open</span>'}
            ${E.source==="seed"?'<span class="chip">Demo seed</span>':""}
            ${E.source==="live_gift"?'<span class="chip">Coin gift</span>':""}
            <br/><span class="muted" style="font-size:12px">${l(E.note)} · ${N(E.at)}</span>
          </span>
          <span style="text-align:right;font-size:13px">
            <strong>${R(E.creatorShare)}</strong><br/>
            <span class="muted">gross ${R(E.gross)}</span>
          </span>
        </li>`).join("")}</ul>`:"",C=g.length>0?g.map(E=>`<div class="card" style="margin:0 0 10px;background:#12121a" data-payout="${l(E.id)}">
        <div class="row wrap">
          <strong>${R(E.amount)}</strong>
          <span class="chip">${l(Gu[E.status]||E.status)}</span>
          <span class="muted spacer" style="text-align:right;font-size:12px">${N(E.at)}</span>
        </div>
        <p class="muted" style="margin:6px 0;font-size:12px">${l(E.note||"Payout")} · ${(E.earningIds||[]).length} earning line(s)</p>
        ${E.status==="pending"?`<div class="row wrap">
                <button class="btn primary payout-status" data-id="${l(E.id)}" data-status="completed">Mark completed · demo</button>
                <button class="btn ghost payout-status" data-id="${l(E.id)}" data-status="rejected">Reject · release hold</button>
              </div>`:E.reviewedAt?`<p class="muted" style="margin:0;font-size:12px">Reviewed ${N(E.reviewedAt)}</p>`:""}
      </div>`).join(""):'<p class="muted">No payout requests yet.</p>',O=`
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
        <div class="pikk-wallet-metric"><span>Gift coins</span><strong>${As(a)}</strong><small>Live gifting · demo</small></div>
        <div class="pikk-wallet-metric"><span>Fan USD credits</span><strong>${R(i.balance)}</strong><small>Tips and requests · demo</small></div>
        <div class="pikk-wallet-metric"><span>Creator available</span><strong>${R(n.available)}</strong><small>Eligible balance · demo</small></div>
        <div class="pikk-wallet-metric"><span>Creator on hold</span><strong>${R(n.holds)}</strong><small>Payout review · demo</small></div>
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
      <div style="font-size:32px;font-weight:900;margin-top:8px">${As(a)} <span class="muted" style="font-size:16px;font-weight:600">coins</span></div>
      <p class="muted" style="margin:4px 0 12px">≈ ${R(a*.02)} · stored in <code>dbs_v1.coins</code> (not USD <code>wallet</code>). Used for Live gift tray.</p>
      <h4 style="margin:0 0 8px;font-size:14px">Buy coin pack</h4>
      <div class="grid-2" style="gap:10px">${w}</div>
      <p class="muted" style="font-size:12px;margin:10px 0 0">No discounts · packs ${ei.map(E=>`${E.coins}/$${E.usd}`).join(" · ")}. Demo credit only — no payment processor.</p>
      <h4 style="margin:16px 0 8px;font-size:14px">Recent coin activity</h4>
      ${$}
      <div class="row wrap" style="margin-top:12px">
        <a class="btn ghost" href="#/live">Go to Live · send gifts</a>
        <a class="btn ghost" href="#/earnings?cat=gifts">Gift earnings</a>
      </div>
    </div>

    <div class="card">
      <h3>Fan spendable USD credits</h3>
      <div style="font-size:32px;font-weight:900">${R(i.balance)}</div>
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
          <div style="font-size:28px;font-weight:900">${R(n.available)}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Holds / in review</p>
          <div style="font-size:28px;font-weight:900">${R(n.holds)}</div>
        </div>
      </div>
      <div class="row wrap" style="margin-top:10px">
        <span class="chip">Threshold ${R(n.threshold)}</span>
        <span class="chip">Holds / refunds · demo</span>
        ${f?'<span class="chip">Payout pending</span>':""}
      </div>
      <div class="row wrap" style="margin-top:12px">
        <button class="btn primary" id="cwPayout" ${b?"":"disabled"}>Request payout · TEST MODE</button>
        <button class="btn" id="cwSeed">${(n.earnings||[]).length?"Reload demo earnings":"Load demo earnings"}</button>
        <a class="btn ghost" href="#/earnings">Earnings overview</a>
      </div>
      ${b?'<p class="muted" style="margin:10px 0 0;font-size:12px">Moves available → holds and locks those earning lines until completed or rejected.</p>':`<p class="muted" style="margin:10px 0 0;font-size:12px">${f?"Finish or reject the pending payout before requesting another (anti double-payout).":`Need at least ${R(n.threshold)} available · currently ${R(n.available)}.`}</p>`}
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
      ${k}
      ${L?`<h4 style="margin:16px 0 8px;font-size:14px">Ledger (recent)</h4>${L}`:""}
    </div>

    <div class="card">
      <h3>Payout history</h3>
      <p class="muted" style="margin:0 0 10px">On-device demo approve / reject. Completed funds leave holds; rejected releases hold and untags earnings.</p>
      ${C}
    </div>
    </div>
  `;return M("Wallet & Payouts",O,{lead:"Creator Wallet & Payout Center · gift coins + fan USD · TEST MODE."})}function Vu(e){var t,s,i,a,r;e.querySelectorAll(".coin-pack-btn").forEach(o=>{o.addEventListener("click",()=>{const n=Number(o.dataset.coins),d=Vn(n);if((d==null?void 0:d.error)==="bad_package")return h("Unknown pack");if(d!=null&&d.error)return h("Could not buy coins");h(`+${n.toLocaleString()} coins · TEST MODE`),tt()})}),(t=e.querySelector("#fanCredit5"))==null||t.addEventListener("click",()=>{Fs(5,"Demo credit +$5"),h("+$5 fan credits"),tt()}),(s=e.querySelector("#fanCredit25"))==null||s.addEventListener("click",()=>{Fs(25,"Demo credit +$25"),h("+$25 fan credits"),tt()}),(i=e.querySelector("#cwSeed"))==null||i.addEventListener("click",()=>{const o=(ls().earnings||[]).length>0,n=er({force:!0});h(o?"Demo earnings reloaded":`Loaded ${n.seeded||0} demo lines`),tt()}),(a=e.querySelector("#cwPayout"))==null||a.addEventListener("click",()=>{const o=pl();if((o==null?void 0:o.error)==="pending_exists")return h("Payout already pending");if((o==null?void 0:o.error)==="below_threshold")return h("Below payout threshold");if(o!=null&&o.error)return h("Could not request payout");h("Payout requested · held"),tt()}),(r=e.querySelector("#cwVerify"))==null||r.addEventListener("click",()=>{const n=ls().verification!=="demo_verified";ml(n),h(n?"Demo verified":"Verification cleared"),tt()}),e.querySelectorAll(".payout-status").forEach(o=>{o.addEventListener("click",()=>{const n=ul(o.dataset.id,o.dataset.status);if(n!=null&&n.error)return h("Could not update payout");h("Payout "+o.dataset.status),tt()})})}function fn(e){q(e||"#/earnings")}function J(e){return"$"+Number(e||0).toFixed(2)}const so=[{id:"all",label:"All"},{id:"gifts",label:"Gifts"},{id:"tips",label:"Tips"},{id:"subscriptions",label:"Subscriptions"},{id:"clippers",label:"Clippers"},{id:"referrals",label:"Referrals"},{id:"sponsorships",label:"Sponsorships"},{id:"merch",label:"Merch"}];function io(){var t;const e=(((t=Oe().query)==null?void 0:t.cat)||"all").toLowerCase();return so.some(s=>s.id===e)?e:"all"}function zu(e){return(e||[]).reduce((t,s)=>(t.gross+=Number(s.gross)||0,t.fees+=Number(s.fees)||0,t.net+=Number(s.net)||0,t.creatorShare+=Number(s.creatorShare)||0,t.dbsShare+=Number(s.dbsShare)||0,t),{gross:0,fees:0,net:0,creatorShare:0,dbsShare:0})}function Ht(e){return Math.round(Number(e)*100)/100}function Hu(){const e=ls(),t=dl(),s=io(),i=[...e.earnings||[]].sort((y,v)=>(v.at||0)-(y.at||0)),a=s==="all"?i:i.filter(y=>y.category===s||s==="subscriptions"&&y.category==="paid_content"),r=zu(i),o=ia(),n=zn(),d=s==="gifts"?`<div class="card" style="margin:0 0 12px;background:#12121a">
      <div class="row wrap">
        <span class="chip">t185u · catalog gifts</span>
        <span class="chip">80% creator / 20% PIKK · NET</span>
        <span class="chip">TEST MODE · listed USD = net</span>
      </div>
      <p class="muted" style="margin:8px 0 0;font-size:13px">Coin gifts from Live use <code>sendLiveGift</code> → creator earnings here. Viewers on Live / gift tray never see this split. ${n.length?`${n.length} gift line(s) on device.`:"Send a catalog gift on an active Live to populate."}</p>
    </div>`:"",c=so.map(y=>{const v=y.id==="all"?"#/earnings":`#/earnings?cat=${y.id}`,w=y.id==="all"?i.length:i.filter(A=>A.category===y.id||y.id==="subscriptions"&&A.category==="paid_content").length,$=s===y.id;return`<a class="chip earn-filter${$?" active":""}" href="${v}" data-cat="${l(y.id)}" style="${$?"outline:1px solid var(--accent,#6dffb0);font-weight:700":""}">${l(y.label)}${w?` · ${w}`:""}</a>`}).join(""),p=Object.entries(t).map(([y,v])=>`<tr style="border-top:1px solid rgba(255,255,255,.06)">
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
            <td style="padding:8px 4px">${J(y.gross)}</td>
            <td style="padding:8px 4px">${J(y.fees)}</td>
            <td style="padding:8px 4px">${J(y.net)}</td>
            <td style="padding:8px 4px"><strong>${J(y.creatorShare)}</strong></td>
            <td style="padding:8px 4px">${J(y.dbsShare)}</td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>`:"",f=a.length>0?`<ul class="list-plain">${a.map(y=>`<li style="align-items:flex-start">
          <span style="flex:1;min-width:0">
            <strong>${l(y.label||y.category)}</strong>
            ${y.payoutId?'<span class="chip">In payout</span>':'<span class="chip">Open</span>'}
            ${y.source==="seed"?'<span class="chip">Demo seed</span>':""}
            <br/><span class="muted" style="font-size:12px">${l(y.note||"")} · ${N(y.at)}</span>
            <br/><span class="muted" style="font-size:11px">gross ${J(y.gross)} → fees ${J(y.fees)} → net ${J(y.net)} · creator ${y.creatorPct}% / PIKK ${y.dbsPct}%</span>
          </span>
          <span style="text-align:right;font-size:13px;white-space:nowrap">
            <strong>${J(y.creatorShare)}</strong><br/>
            <span class="muted">PIKK ${J(y.dbsShare)}</span>
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
          <div style="font-size:26px;font-weight:900">${J(e.available)}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Holds / in review</p>
          <div style="font-size:26px;font-weight:900">${J(e.holds)}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Lifetime creator share</p>
          <div style="font-size:22px;font-weight:800">${J(Ht(r.creatorShare))}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Lifetime PIKK share</p>
          <div style="font-size:22px;font-weight:800">${J(Ht(r.dbsShare))}</div>
        </div>
      </div>
      <div class="row wrap" style="margin-top:10px">
        <span class="chip">Lifetime gross ${J(Ht(r.gross))}</span>
        <span class="chip">Fees ${J(Ht(r.fees))}</span>
        <span class="chip">Net ${J(Ht(r.net))}</span>
        <span class="chip">Threshold ${J(e.threshold)}</span>
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
  `;return M("Creator Earnings",b,{lead:"Rewards, commissions & ledger · TEST MODE · payouts on Wallet (§27)."})}function Wu(e){var t,s;(t=e.querySelector("#earnSeed"))==null||t.addEventListener("click",()=>{const i=(ls().earnings||[]).length>0,a=er({force:!0});h(i?"Demo earnings reloaded":`Loaded ${a.seeded||0} demo lines`),fn(vn(io()))}),(s=e.querySelector("#earnDemoForm"))==null||s.addEventListener("submit",i=>{var d,c,p;i.preventDefault();const a=((d=e.querySelector("#earnCat"))==null?void 0:d.value)||"tips",r=Number((c=e.querySelector("#earnGross"))==null?void 0:c.value),o=(((p=e.querySelector("#earnNote"))==null?void 0:p.value)||"").trim()||"Manual demo earning";if(!(r>0))return h("Enter a positive gross amount");const n=sa({category:a,gross:r,note:o,source:"manual_demo"});h(`Recorded ${J(n.creatorShare)} creator share`),fn(vn(a))})}function vn(e){return!e||e==="all"?"#/earnings":`#/earnings?cat=${e}`}function st(){q("#/missions")}const bn={song:"Song",album:"Album",video:"Video",live:"Livestream",app:"DBS App",interview:"Interview"};function Yu(e){return"$"+Number(e||0).toFixed(0)}function Ju(e){const t=Number(e)||0;if(!t)return"No deadline";const s=t-Date.now();if(s<0)return`Ended ${Math.ceil(-s/864e5)}d ago`;const i=Math.ceil(s/864e5);return i<=1?"Due today / tomorrow":`${i}d left`}function Qu(e=14){return new Date(Date.now()+e*864e5).toISOString().slice(0,10)}function Cs(){const{user:e}=D();if(e)return e;const t=Tt("DemoCreator");return h("Signed in as DemoCreator · local demo"),t||D().user}function Xu(){const{user:e}=D(),t=ni().sort((p,m)=>(m.createdAt||0)-(p.createdAt||0)),s=t.filter(p=>p.status==="active"||p.status==="paused"),i=t.filter(p=>p.status==="ended"||p.status==="draft"),a=new Set(t.flatMap(p=>(p.participants||[]).map(m=>m.userId).filter(Boolean))).size,r=t.reduce((p,m)=>p+(m.submissions||[]).length,0),o=p=>{const m=p.fundSource==="third_party"?'<span class="chip">20% management fee · disclosed</span>':'<span class="chip">DBS-funded · marketing expense</span>',g=zl(p.id),f=e&&(p.participants||[]).some($=>$.userId===e.id),b=(p.submissions||[]).filter($=>e&&$.userId===e.id),y=g.length>0?g.slice(0,8).map(($,A)=>`<tr style="border-top:1px solid rgba(255,255,255,.06)">
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
                <br/><span class="muted" style="font-size:11px">${N($.at)} · Manual review</span>
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
        <span class="chip">${l(bn[p.promoteType]||p.promoteType)}</span>
        <span class="chip">${l(p.status)}</span>
        <span class="chip">Budget ${Yu(p.budget)}</span>
        <span class="chip">${l(Ju(p.deadline))}</span>
        ${m}
        <span class="muted spacer" style="text-align:right;font-size:12px">${N(p.createdAt)}</span>
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
    </article>`},n=s.length?s.map(o).join(""):t.length?'<div class="card"><p class="muted" style="margin:0">No active or paused missions. Create one or resume from archive.</p></div>':"",d=i.length>0?`<div class="card"><h3>Archive</h3>${i.map(o).join("")}</div>`:"",c=`
    <div class="pikk-missions-studio">
      <section class="pikk-missions-hero" aria-label="PIKK Missions Studio overview">
        <p class="pikk-missions-kicker">PIKK CREATOR STUDIO · PROMOTIONAL CAMPAIGNS</p>
        <h2>Make your next <span>move count.</span></h2>
        <p>Explore creator missions, share your work and track demo rankings. Campaign budgets and points are examples, not real earnings.</p>
        <div class="pikk-missions-stats" aria-label="Current demo mission totals">
          <div class="pikk-missions-stat"><strong>${s.length}</strong><span>Open / paused</span></div>
          <div class="pikk-missions-stat"><strong>${a}</strong><span>Demo creators</span></div>
          <div class="pikk-missions-stat"><strong>${r}</strong><span>Proof submissions</span></div>
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

    <section class="pikk-missions-list" aria-label="Available campaigns">${n}</section>

    <div class="card pikk-missions-create">
      <h3>Create mission · demo admin</h3>
      <p class="muted" style="margin:0 0 10px;font-size:13px">Stored in <code>dbs_v1.missions</code>. No real charges or fraud API.</p>
      <form id="msnCreate" style="display:grid;gap:10px;max-width:520px">
        <div class="field"><label>Title *</label><input name="title" id="msnTitle" required maxlength="120" placeholder="Push Long Story Short" /></div>
        <div class="grid-2">
          <div class="field"><label>Promote type</label>
            <select name="promoteType" id="msnType">
              ${Object.entries(bn).map(([p,m])=>`<option value="${p}">${l(m)}</option>`).join("")}
            </select>
          </div>
          <div class="field"><label>Budget (USD)</label><input name="budget" id="msnBudget" type="number" min="0" step="1" value="500" /></div>
        </div>
        <div class="grid-2">
          <div class="field"><label>Deadline</label><input name="deadline" id="msnDeadline" type="date" value="${Qu(14)}" /></div>
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
  `;return M("Missions",c,{lead:"Promotional campaigns · Clippers & creators · TEST MODE (§6)."})}function Zu(e){var t,s,i;(t=e.querySelector("#msnSeed"))==null||t.addEventListener("click",()=>{const a=ni().length>0,r=Hl({force:!0});h(a?"Demo missions reloaded":`Loaded ${r.seeded||0} demo missions`),st()}),(s=e.querySelector("#msnSignIn"))==null||s.addEventListener("click",()=>{Cs(),st()}),(i=e.querySelector("#msnCreate"))==null||i.addEventListener("submit",a=>{var g,f,b,y,v,w;a.preventDefault();const r=((g=e.querySelector("#msnTitle"))==null?void 0:g.value)||"",o=((f=e.querySelector("#msnType"))==null?void 0:f.value)||"app",n=Number((b=e.querySelector("#msnBudget"))==null?void 0:b.value)||0,d=((y=e.querySelector("#msnDeadline"))==null?void 0:y.value)||"",c=((v=e.querySelector("#msnFund"))==null?void 0:v.value)||"dbs",p=((w=e.querySelector("#msnReward"))==null?void 0:w.value)||"",m=Fl({title:r,promoteType:o,budget:n,deadline:d,fundSource:c,reward:p,status:"active"});if(m.error)return h("Title required");h(`Mission created · ${m.title}`),st()}),e.querySelectorAll("[data-join]").forEach(a=>{a.addEventListener("click",()=>{Cs();const r=a.getAttribute("data-join"),o=Gl(r);if(o.error==="signin")return h("Sign in required");if(o.error==="already_joined")return h("Already joined");if(o.error==="not_active")return h("Mission not active");if(o.error)return h("Could not join");h("Joined mission · referral code assigned"),st()})}),e.querySelectorAll("[data-bump]").forEach(a=>{a.addEventListener("click",()=>{Cs();const r=a.getAttribute("data-bump"),o=Vl(r,5);if(o.error)return h(o.error==="not_joined"?"Join first":"Bump failed");h("+5 demo points"),st()})}),e.querySelectorAll("[data-status]").forEach(a=>{a.addEventListener("click",()=>{const r=a.getAttribute("data-status"),o=a.getAttribute("data-next");if(Kl(r,o).error)return h("Status update failed");h(`Mission → ${o}`),st()})}),e.querySelectorAll("form.msn-proof").forEach(a=>{a.addEventListener("submit",r=>{var c;r.preventDefault(),Cs();const o=a.getAttribute("data-id"),n=((c=a.querySelector('[name="proof"]'))==null?void 0:c.value)||"",d=Ul(o,{proof:n});if(d.error==="required")return h("Enter a URL or note");if(d.error==="not_joined")return h("Join first");if(d.error==="not_active")return h("Mission not active");if(d.error)return h("Submit failed");h("Proof submitted · pending manual review · +10 pts"),st()})})}const em=[{id:"trending",label:"Trending"},{id:"following",label:"Following"},{id:"discover",label:"Discover"}];function tm(){return!!D().exploreDiscoverable}function ye({href:e,title:t,meta:s,chip:i}){return`<a class="explore-hit" href="${l(e)}">
    <div>
      <strong>${l(t)}</strong>
      <div class="muted" style="font-size:12px;margin-top:2px">${l(s||"")}</div>
    </div>
    ${i?`<span class="chip">${l(i)}</span>`:""}
  </a>`}function Ue(e,t,s){return t?`<div class="card explore-section">
    <h3>${l(e)}</h3>
    <div class="explore-hits">${t}</div>
  </div>`:`<div class="card explore-section">
      <h3>${l(e)}</h3>
      <p class="muted" style="margin:0">${l(s||"No matches")}</p>
    </div>`}function Ws(e){if(!e||!e.query)return`<div class="card" id="exploreResults">
      <p class="muted" style="margin:0">Search creators, fans, songs, albums, videos, posts, livestreams, and products. Exact locations are never indexed.</p>
    </div>`;const t=e.posts.length+e.profiles.length+e.music.length+e.videos.length+e.lives.length+e.products.length+e.pictures.length;if(!t)return`<div class="card" id="exploreResults">
      <p style="margin:0 0 6px"><strong>No results for “${l(e.query)}”</strong></p>
      <p class="muted" style="margin:0">Try another keyword, or browse Trending / Discover below. Report spam from a result’s destination page (demo shell).</p>
    </div>`;const s=e.posts.slice(0,8).map(m=>ye({href:"#/posts",title:(m.text||"").slice(0,90)||"Post",meta:`@${m.username||"user"} · ${N(m.at||Date.now())}`,chip:"Post"})).join(""),i=e.profiles.slice(0,8).map(m=>ye({href:`#/profile/${m.id}`,title:`@${m.username||m.id}`,meta:(m.bio||"Creator / fan").slice(0,80),chip:m.verified?"Verified":"Profile"})).join(""),a=e.music.slice(0,8).map(m=>ye({href:"#/music",title:m.title,meta:`${m.artist||"Artist not credited"} · ${m.type}`,chip:m.type==="album"?"Album":"Song"})).join(""),r=e.videos.slice(0,8).map(m=>ye({href:"#/videos",title:m.title,meta:`${m.artist||"Artist not credited"} · Video catalog`,chip:"Video"})).join(""),o=e.pictures.slice(0,8).map(m=>ye({href:"#/home",title:m.title,meta:`${m.artist||"Creator not credited"} · picture`,chip:"Picture"})).join(""),n=e.lives.slice(0,8).map(m=>ye({href:"#/live",title:m.title||"Livestream",meta:`@${m.hostName||"host"} · ${m.status==="live"?"LIVE now":"Ended"}`,chip:m.status==="live"?"Live":"Replay"})).join(""),d=e.products.slice(0,8).map(m=>ye({href:"#/marketplace",title:m.title,meta:`${m.brand||"Brand"} · ${m.disclosure||"Sponsored"}`,chip:"Ad"})).join(""),c=e.query.toLowerCase(),p=[...rs.filter(m=>m.title.toLowerCase().includes(c)||m.artist.toLowerCase().includes(c)||c.includes("music")||c.includes("song")||c.includes("album")).map(m=>ye({href:"#/music",title:m.title,meta:`${m.artist} · ${m.status}`,chip:"Cover"})),...ge.filter(m=>m.title.toLowerCase().includes(c)||(m.artist||"").toLowerCase().includes(c)||c.includes("video")||c.includes("mv")).map(m=>ye({href:"#/videos",title:m.title,meta:`${m.artist||"Artist not credited"} · Official MV`,chip:"MV"}))].join("");return`<div id="exploreResults">
    <p class="muted" style="margin:0 0 10px">${t} result${t===1?"":"s"} for “${l(e.query)}”</p>
    ${Ue("People",i,"No matching creators or fans")}
    ${Ue("Posts",s,"No matching posts")}
    ${Ue("Music (catalog)",a,"No published songs/albums")}
    ${Ue("Videos (catalog)",r,"No published videos")}
    ${Ue("Pictures",o,"No published pictures")}
    ${Ue("Livestreams",n,"No live or history matches")}
    ${Ue("Products / ads",d,"No marketplace listings")}
    ${p?Ue("Music-based picks",p):""}
  </div>`}function sm(){const e=gl(10);return e.length?`<div class="section-swipe explore-trend">
    ${e.map(t=>`<a class="preview-card" href="${l(t.href)}">
        <strong>${l(t.title)}</strong>
        <span class="muted">${l(t.subtitle)}${t.score?` · ♥${t.score}`:""}</span>
      </a>`).join("")}
  </div>`:'<p class="muted">Nothing trending yet — like posts or publish catalog items.</p>'}function im(){const e=D().user;if(!e)return'<div class="card"><p class="muted" style="margin:0">Sign in on <a href="#/profile">Profile</a> to see accounts you follow. Demo only — no exact locations.</p></div>';const t=e.following||[];return t.length?`<div class="card explore-section"><h3>Following</h3><div class="explore-hits">${t.map(i=>{var r;const a=((r=D().profiles)==null?void 0:r[i])||{id:i,username:i};return ye({href:`#/profile/${encodeURIComponent(a.id)}`,title:`@${a.username||a.id}`,meta:(a.bio||"Following").slice(0,80),chip:"Following"})}).join("")}</div></div>`:`<div class="card"><p class="muted" style="margin:0">You're not following anyone yet. Discover suggested accounts below, then follow from their profile.</p></div>`}function am(){const t=fl().slice(0,8).map(i=>ye({href:`#/profile/${encodeURIComponent(i.id)}`,title:`@${i.username}`,meta:(i.bio||"Suggested").slice(0,80),chip:i.verified?"Verified":"Suggest"})).join(""),s=rs.map(i=>ye({href:"#/music",title:i.title,meta:`${i.artist} · music-based`,chip:"Cover"})).join("");return`
    <div class="card">
      <h3>Discoverability (opt-in)</h3>
      <p class="muted" style="margin:0 0 10px">Appear in Explore suggestions. Off by default. No exact locations stored or shown.</p>
      <label class="row" style="gap:8px;align-items:center">
        <input type="checkbox" id="exploreDiscoverable" ${tm()?"checked":""} />
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
    </div>`}function nm(){const e=D().exploreTab||"trending",t=em.map(a=>`<button type="button" role="tab" id="explore-tab-${a.id}" aria-controls="explorePanel" aria-selected="${a.id===e}" tabindex="${a.id===e?0:-1}" class="shop-chip${a.id===e?" on":""}" data-explore-tab="${a.id}">${l(a.label)}</button>`).join("");let s="";e==="following"?s=im():e==="discover"?s=am():s=`<div class="card">
      <h3>Trending Across PIKK</h3>
      <p class="muted" style="margin:0 0 10px">High-engagement public posts and seeded demo cards (not a full engagement pipeline).</p>
      ${sm()}
    </div>
    <div id="exploreResultsWrap">${Ws(null)}</div>`;const i=`
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
  `;return M("Explore",i,{lead:"Universal search & discovery across PIKK.",badge:"Phase 2 demo"})}function yn(e,t){var r,o,n,d,c,p,m;const s=hl(t),i=e.querySelector("#exploreResultsWrap");if(i)i.innerHTML=Ws(s);else{const g=e.querySelector("#explorePanel");if(g){let f=g.querySelector("#exploreLiveInsert");f||(f=document.createElement("div"),f.id="exploreLiveInsert",g.prepend(f)),f.innerHTML=Ws(s)}}const a=(((r=s.posts)==null?void 0:r.length)||0)+(((o=s.profiles)==null?void 0:o.length)||0)+(((n=s.music)==null?void 0:n.length)||0)+(((d=s.videos)==null?void 0:d.length)||0)+(((c=s.lives)==null?void 0:c.length)||0)+(((p=s.products)==null?void 0:p.length)||0)+(((m=s.pictures)==null?void 0:m.length)||0);s.query&&h(a?`${a} result(s)`:"No matches")}function rm(e){var c;const t=e.querySelector("#exploreQ"),s=e.querySelector("#exploreGo"),i=e.querySelector("#exploreClear"),a=()=>yn(e,(t==null?void 0:t.value)||"");s==null||s.addEventListener("click",a);function r(){var m;clearTimeout(o),t&&(t.value="");const p=e.querySelector("#exploreResultsWrap");p&&(p.innerHTML=Ws(null)),(m=e.querySelector("#exploreLiveInsert"))==null||m.remove(),h("Cleared")}i==null||i.addEventListener("click",r);let o;t==null||t.addEventListener("input",()=>{clearTimeout(o),o=setTimeout(a,220)}),t==null||t.addEventListener("keydown",p=>{p.key==="Escape"&&t.value?(p.preventDefault(),r(),t.focus()):p.key==="Enter"&&(p.preventDefault(),clearTimeout(o),a())});const n=[...e.querySelectorAll("[data-explore-tab]")];function d(p,m=!1){var f;const g=(t==null?void 0:t.value)||"";if(clearTimeout(o),_a({exploreTab:p}),q("/explore"),g.trim()){const b=document.getElementById("app"),y=b==null?void 0:b.querySelector("#exploreQ");y&&(y.value=g,yn(b,g))}m&&((f=document.getElementById("explore-tab-"+p))==null||f.focus())}n.forEach((p,m)=>{p.addEventListener("click",()=>d(p.dataset.exploreTab)),p.addEventListener("keydown",g=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(g.key))return;g.preventDefault();const f=n.length-1,b=g.key==="Home"?0:g.key==="End"?f:(m+(g.key==="ArrowRight"?1:-1)+n.length)%n.length;d(n[b].dataset.exploreTab,!0)})}),(c=e.querySelector("#exploreDiscoverable"))==null||c.addEventListener("change",p=>{_a({exploreDiscoverable:!!p.target.checked}),h(p.target.checked?"Discoverable on":"Discoverable off")})}let _s=null;function it(e){q("#/giftbattles")}function kn(){_s&&(clearInterval(_s),_s=null)}function z(e){return"$"+Number(e||0).toFixed(2)}function ao(e){const t=Math.max(0,Math.ceil(e/1e3)),s=Math.floor(t/60),i=t%60;return`${s}:${String(i).padStart(2,"0")}`}function om(){return M("Gift Battles",`<div class="card">
      <h3>Sign in required</h3>
      <p class="muted">Gift battles need a local demo account so scores and history persist on this device.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,{lead:"Runs during Live · not a separate stream · voluntary support · TEST MODE"})}function lm(){return`
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
    </div>`}function cm(e){if(!e)return`
      <div class="card">
        <h3>Champion Spotlight</h3>
        <p class="muted" style="margin:0">No active champion today. Win a battle to claim the rest-of-day banner.</p>
      </div>`;const t=Math.max(0,(e.championUntil||0)-Date.now()),s=Math.floor(t/36e5),i=Math.floor(t%36e5/6e4);return`
    <div class="card gb-champion" role="status">
      <div class="row wrap" style="gap:8px;align-items:center">
        <span class="gb-sticker-slot" aria-hidden="true">${xa("battle-crown",{className:"gift-sticker gift-sticker--battle"}).html}</span>
        <div class="chip">Challenge Winner · rest of day</div>
      </div>
      <h3 class="gb-champion-name">${l(e.username)}</h3>
      <p class="muted" style="margin:0">
        Score ${l(z(e.score))} · ~${s}h ${i}m left today
        · ${l(e.mode||"demo")}
      </p>
    </div>`}function dm(e,t){return e?`
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
    </div>`}function pm(e){return`
    <div class="card gb-battle" data-gb-status="pending">
      <h3>Challenge pending</h3>
      <p><strong>${l(e.challenger.name)}</strong> challenged <strong>${l(e.opponent.name)}</strong></p>
      <p class="muted">Mode: ${l(e.mode)} · opponent must Accept or Decline (demo controls below).</p>
      <div class="row wrap" style="gap:8px;margin-top:12px">
        <button type="button" class="btn primary" id="gbAccept">Accept</button>
        <button type="button" class="btn ghost" id="gbDecline">Decline</button>
      </div>
    </div>`}function um(e){const t=Math.max(0,(e.endsAt||0)-Date.now()),s=ao(t);return`
    <div class="card gb-battle" data-gb-status="active">
      <div class="gb-countdown" aria-live="polite" aria-atomic="true">
        <span class="gb-countdown-label">Time left</span>
        <span class="gb-countdown-clock" id="gbClock">${l(s)}</span>
      </div>
      <div class="gb-scoreboard" role="group" aria-label="Live battle scores">
        <div class="gb-side">
          <div class="muted">Challenger</div>
          <strong>${l(e.challenger.name)}</strong>
          <div class="gb-score" id="gbScoreA" aria-label="Challenger score ${l(z(e.scoreA))}">${l(z(e.scoreA))}</div>
        </div>
        <div class="gb-vs" aria-hidden="true">VS</div>
        <div class="gb-side">
          <div class="muted">Opponent</div>
          <strong>${l(e.opponent.name)}</strong>
          <div class="gb-score" id="gbScoreB" aria-label="Opponent score ${l(z(e.scoreB))}">${l(z(e.scoreB))}</div>
        </div>
      </div>
      <p class="muted gb-score-text" id="gbScoreText">
        Live score: ${l(e.challenger.name)} ${l(z(e.scoreA))} —
        ${l(e.opponent.name)} ${l(z(e.scoreB))}
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
    </div>`}function mm(e){var a,r;let t="Tie",s="Equal voluntary support · recognition for both";e.result==="win"&&e.winnerName?(t=`Winner · ${e.winnerName}`,s="Recognition only — no opponent funds transferred"):e.result==="declined"&&(t="Declined",s="Challenge was declined");const i=e.result==="win"?xa("battle-win",{className:"gift-sticker gift-sticker--battle"}).html:"";return`
    <div class="card gb-battle gb-ended" data-gb-status="ended">
      <div class="row wrap" style="gap:8px;align-items:center">
        ${i?`<span class="gb-sticker-slot" aria-hidden="true">${i}</span>`:""}
        <div class="chip">${e.result==="win"?"Winner":e.result==="tie"?"Tie":"Ended"}</div>
      </div>
      <h3 class="gb-winner-banner">${l(t)}</h3>
      <p class="muted">${l(s)}</p>
      <p class="gb-score-text" style="margin:12px 0">
        Final: ${l(((a=e.challenger)==null?void 0:a.name)||"?")} ${l(z(e.scoreA))} —
        ${l(((r=e.opponent)==null?void 0:r.name)||"?")} ${l(z(e.scoreB))}
      </p>
      <button type="button" class="btn primary" id="gbClear">New challenge</button>
    </div>`}function hm(e,t){var a;const i=nr().map(r=>`<option value="${l(r.id)}">${l(r.name)} — ${l(r.bio)}</option>`).join("");return`
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
      <p class="muted" style="margin:10px 0 0">Wallet: <strong id="gbWalletBal">${l(z(((a=D().wallet)==null?void 0:a.balance)||0))}</strong> · TEST MODE</p>
    </div>`}function gm(){const e=ca(10),t=e.length?e.map((s,i)=>`<li class="gb-day-row">${Ye("battle-win",{className:"gift-sticker gift-sticker--xs"})}<span class="chip">#${i+1}</span><strong>${l(s.username)}</strong></li>`).join(""):'<li class="muted">No winners yet today · win a 60s battle</li>';return`
    <div class="card gb-day-board" id="gbDayWinners">
      <div class="row wrap" style="justify-content:space-between;gap:8px">
        <h3 style="margin:0">Today&apos;s winners</h3>
        <span class="chip">${e.length}/10 · end of day</span>
      </div>
      <p class="muted" style="margin:6px 0 8px;font-size:12px">Sticker board · recognition only · TEST MODE</p>
      <ol class="gb-list gb-day-list">${t}</ol>
    </div>`}function fm(){const e=El(12),t=Cl(15),s=e.length?e.map(a=>{var o,n;const r=a.result==="win"?`Winner ${a.winnerName}`:a.result==="tie"?"Tie":a.result||a.status;return`<li>
            <strong>${l(r)}</strong>
            <span class="muted"> · ${l(((o=a.challenger)==null?void 0:o.name)||"?")} ${l(z(a.scoreA))} vs ${l(((n=a.opponent)==null?void 0:n.name)||"?")} ${l(z(a.scoreB))} · ${l(N(a.endedAt||a.createdAt||0))} · ${l(a.mode||"")}</span>
          </li>`}).join(""):'<li class="muted">No battles yet.</li>';return`
    <div class="card">
      <h3>Top winners (local)</h3>
      <ol class="gb-list">${t.length?t.map((a,r)=>`<li><span class="chip">#${r+1}</span> <strong>${l(a.username)}</strong> <span class="muted">${a.wins} win${a.wins===1?"":"s"} · ${l(z(a.points))} battle pts</span></li>`).join(""):'<li class="muted">Win a battle to appear here.</li>'}</ol>
    </div>
    <div class="card">
      <h3>Battle history</h3>
      <ul class="gb-list">${s}</ul>
    </div>`}function vm(e){return`
    <div class="card">
      <h3>Battle prefs</h3>
      <label class="toggle"><span>Allow battle invitations</span>
        <input type="checkbox" id="gbPrefInvites" ${e.invitationsEnabled?"checked":""}/>
      </label>
      <p class="muted" style="margin:8px 0 0">When off, new challenges are blocked. Existing active battles can still finish.</p>
    </div>`}function bm(){const{user:e,live:t}=D();if(!e)return om();la();const s=ra(),i=na(),a=Al(),r=!!(t&&!t.endedAt);let o="";(s==null?void 0:s.status)==="pending"?o=pm(s):(s==null?void 0:s.status)==="active"?o=um(s):(s==null?void 0:s.status)==="ended"?o=mm(s):o=hm(r,i);const n=`
    ${lm()}
    ${cm(a)}
    ${gm()}
    ${dm(r,t)}
    ${o}
    ${fm()}
    ${vm(i)}
  `;return M("Gift Battles",n,{lead:"Runs during Live · not a separate stream · 60s voluntary gift battles · not wagers · TEST MODE",badge:(s==null?void 0:s.status)==="active"?"BATTLE":a?"CHAMP":void 0})}function ym(e){var i,a,r,o,n,d,c;kn(),(i=e.querySelector("#gbPrefInvites"))==null||i.addEventListener("change",p=>{bl({invitationsEnabled:p.target.checked}),h(p.target.checked?"Invitations on":"Invitations off")}),(a=e.querySelector("#gbTopUp"))==null||a.addEventListener("click",()=>{var m;Fs(10,"Gift battle demo top-up · TEST MODE"),h("+$10 demo wallet");const p=e.querySelector("#gbWalletBal");p&&(p.textContent=z(((m=D().wallet)==null?void 0:m.balance)||0))});const t=p=>{const m=e.querySelector("#gbOpponent"),g=m==null?void 0:m.value,f=nr().find(y=>y.id===g),b=yl({opponentId:g,opponentName:f==null?void 0:f.name,mode:p});if((b==null?void 0:b.error)==="signin")return h("Sign in first");if((b==null?void 0:b.error)==="invites_disabled")return h("Invitations disabled");if((b==null?void 0:b.error)==="not_live")return h("Not live — use sandbox");if((b==null?void 0:b.error)==="battle_in_progress")return h("Battle already in progress");if((b==null?void 0:b.error)==="self")return h("Pick another fan");h("Challenge sent · waiting for accept"),it()};(r=e.querySelector("#gbStartLive"))==null||r.addEventListener("click",()=>t("live")),(o=e.querySelector("#gbStartSandbox"))==null||o.addEventListener("click",()=>t("sandbox")),(n=e.querySelector("#gbAccept"))==null||n.addEventListener("click",()=>{const p=kl();if((p==null?void 0:p.error)==="no_pending")return h("No pending challenge");if((p==null?void 0:p.error)==="invites_disabled")return h("Invitations disabled");h("Battle started · 1:00"),it()}),(d=e.querySelector("#gbDecline"))==null||d.addEventListener("click",()=>{const p=wl();if(p!=null&&p.error)return h(String(p.error));h("Challenge declined"),it()}),(c=e.querySelector("#gbClear"))==null||c.addEventListener("click",()=>{const p=Sl();if(p!=null&&p.error)return h("Battle still running");it()}),e.querySelectorAll("[data-gb-gift]").forEach(p=>{p.addEventListener("click",()=>{var v;const m=xl({side:p.dataset.gbGift,kind:p.dataset.kind||"gift",amount:Number(p.dataset.amt)||2,label:p.dataset.label||""});if((m==null?void 0:m.error)==="signin")return h("Sign in first");if((m==null?void 0:m.error)==="no_active"||(m==null?void 0:m.error)==="ended")return h("No active battle");if((m==null?void 0:m.error)==="offline")return h("Live offline — use sandbox");if((m==null?void 0:m.error)==="insufficient")return h("Need wallet credits");if(h(p.dataset.gbGift==="opponent"?"Opponent support (demo)":"Support sent · demo"),((v=m.battle)==null?void 0:v.status)==="ended"){h(m.battle.result==="win"?`Winner · ${m.battle.winnerName}`:"Tie!"),it();return}const g=e.querySelector("#gbScoreA"),f=e.querySelector("#gbScoreB"),b=e.querySelector("#gbScoreText"),y=m.battle;g&&f&&y?(g.textContent=z(y.scoreA),g.setAttribute("aria-label",`Challenger score ${z(y.scoreA)}`),f.textContent=z(y.scoreB),f.setAttribute("aria-label",`Opponent score ${z(y.scoreB)}`),b&&(b.textContent=`Live score: ${y.challenger.name} ${z(y.scoreA)} — ${y.opponent.name} ${z(y.scoreB)}`)):it()})});const s=e.querySelector("#gbClock");s&&(_s=setInterval(()=>{const p=la();if(!p||p.status==="ended"){kn(),(p==null?void 0:p.status)==="ended"&&h(p.result==="win"?`Winner · ${p.winnerName}`:"Tie!"),it();return}const m=Math.max(0,(p.endsAt||0)-Date.now());s.textContent=ao(m)},250))}function me(){q("#/multiguest")}function km(e){return(String(e||"?").trim().slice(0,2)||"?").toUpperCase()}function wm(e){const t=D().user;return!t||!e?!1:(t.following||[]).includes(e)}function Ea(e){return((e==null?void 0:e.guests)||[]).filter(t=>t.status==="joined")}function Sm(e){return((e==null?void 0:e.guests)||[]).filter(t=>t.status==="invited")}function Ki(e,t){var i,a;return`${Number(((a=(i=e==null?void 0:e.giftSplit)==null?void 0:i.shares)==null?void 0:a[t])||0).toFixed(0)}%`}function $m(){return M("Multi-Guest Live",`<div class="card">
      <h3>Sign in required</h3>
      <p class="muted">Start a multi-guest demo session as host. No camera / WebRTC — fake stage tiles only.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,{lead:"Invite 2–4 co-hosts · disclosed gift splits · TEST MODE"})}function xm(){return`
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
    </div>`}function xi({role:e,name:t,sub:s,muted:i,empty:a,followId:r}){if(a)return`
      <div class="mg-tile mg-tile-empty" aria-label="Empty guest slot">
        <div class="mg-avatar mg-avatar-empty">+</div>
        <div class="mg-tile-name muted">Open slot</div>
        <div class="mg-tile-sub muted">Invite a guest</div>
      </div>`;const o=i?'<span class="chip">Muted</span>':"",n=r&&r!=="dbs"?wm(r)?`<button class="btn ghost mg-follow" data-follow="${l(r)}" data-on="1">Following</button>`:`<button class="btn ghost mg-follow" data-follow="${l(r)}" data-on="0">Follow</button>`:r==="dbs"?'<a class="btn ghost" href="#/profile">Follow PIKK</a>':"";return`
    <div class="mg-tile ${e==="host"?"mg-tile-host":""} ${i?"mg-muted":""}">
      <div class="mg-avatar" aria-hidden="true">${l(km(t))}</div>
      <div class="mg-tile-name">${l(t)}</div>
      <div class="mg-tile-sub">${l(s||"")} ${o}</div>
      <div class="mg-tile-actions">${n}</div>
    </div>`}function Em(e){var r,o;const t=Ea(e),s=[];s.push(xi({role:"host",name:e.hostName,sub:"Host",followId:e.hostId===((r=D().user)==null?void 0:r.id)?"dbs":e.hostId}));for(let n=0;n<(e.maxGuests||4);n++){const d=t[n];d?s.push(xi({role:"guest",name:d.username,sub:"Guest",muted:d.muted,followId:d.id})):s.push(xi({empty:!0}))}const i=(o=e.giftSplit)!=null&&o.disclosed?'<span class="chip">Split disclosed</span>':'<span class="chip">Split pending</span>',a=e.broadcastReady?'<span class="chip">Broadcast ready</span>':'<span class="chip">Setup</span>';return`
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
    </div>`}function Am(e){const t=Tl(),s=new Set((e.guests||[]).filter(p=>p.status==="invited"||p.status==="joined").map(p=>p.id)),i=t.filter(p=>p.id!==e.hostId&&!s.has(p.id)),a=Sm(e),r=Ea(e),o=i.length?i.map(p=>`<option value="${l(p.id)}">${l(p.username)} — ${l(p.bio||"demo")}</option>`).join(""):'<option value="">No more demo guests</option>',n=a.length?a.map(p=>`
        <li class="mg-guest-row">
          <span><strong>@${l(p.username)}</strong> <span class="chip">Invited</span></span>
          <span class="row wrap" style="gap:6px">
            <button class="btn primary mg-accept" data-id="${l(p.id)}">Accept (sim)</button>
            <button class="btn ghost mg-decline" data-id="${l(p.id)}">Decline</button>
          </span>
        </li>`).join(""):'<li class="muted">No pending invites.</li>',d=r.length?r.map(p=>`
        <li class="mg-guest-row">
          <span>
            <strong>@${l(p.username)}</strong>
            ${p.muted?'<span class="chip">Muted</span>':'<span class="chip">On stage</span>'}
            <span class="muted" style="font-size:12px"> · gift ${l(Ki(e,p.id))}</span>
          </span>
          <span class="row wrap" style="gap:6px">
            <button class="btn ghost mg-mute" data-id="${l(p.id)}" data-muted="${p.muted?"1":"0"}">
              ${p.muted?"Unmute":"Mute"}
            </button>
            <button class="btn ghost mg-leave" data-id="${l(p.id)}">Leave (sim)</button>
            <button class="btn ghost danger mg-remove" data-id="${l(p.id)}">Remove</button>
          </span>
        </li>`).join(""):'<li class="muted">No guests on stage yet — invite below.</li>',c=r.length+a.length>=(e.maxGuests||4);return`
    <div class="card">
      <h3>Guests &amp; moderation</h3>
      <p class="muted" style="margin:0 0 8px">Host simulates Accept/Decline. Up to ${l(String(e.maxGuests||4))} guests.</p>
      <ul class="mg-list">${d}</ul>
      <h4 style="margin:14px 0 6px">Pending invites</h4>
      <ul class="mg-list">${n}</ul>
      <div class="field" style="margin-top:12px">
        <span>Invite demo guest</span>
        <div class="row wrap" style="gap:8px;margin-top:6px">
          <select id="mgInviteSelect" ${c||!i.length?"disabled":""}>${o}</select>
          <button class="btn primary" id="mgInviteBtn" ${c||!i.length?"disabled":""}>Invite</button>
        </div>
      </div>
      ${c?'<p class="muted" style="margin:8px 0 0">Guest slots full (joined + pending).</p>':""}
    </div>`}function Cm(e){var o,n;const t=Ea(e),s=[{id:e.hostId,username:e.hostName,role:"Host"},...t.map(d=>({id:d.id,username:d.username,role:"Guest"}))],i=((o=e.giftSplit)==null?void 0:o.mode)||"equal",a=!!((n=e.giftSplit)!=null&&n.disclosed),r=s.map(d=>{var p,m;const c=Number(((m=(p=e.giftSplit)==null?void 0:p.shares)==null?void 0:m[d.id])||0);return`
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
      <ul class="mg-list">${r}</ul>
      <p class="muted" style="margin:8px 0 0">Host share: <strong>${l(Ki(e,e.hostId))}</strong>
        · Guests: ${t.length?t.map(d=>`@${l(d.username)} ${l(Ki(e,d.id))}`).join(" · "):"none yet"}</p>
      ${a?`<p class="mg-ok" style="margin:10px 0 0">✓ Split disclosed ${e.giftSplit.disclosedAt?"· "+N(e.giftSplit.disclosedAt):""}. Broadcast ready (demo).</p>`:`<div class="row wrap" style="gap:8px;margin-top:12px">
               ${i==="custom"?'<button class="btn" id="mgSplitApply">Apply custom %</button>':""}
               <button class="btn primary" id="mgDisclose">Disclose &amp; ready broadcast</button>
             </div>
             <p class="muted" style="margin:8px 0 0">Custom % must total 100 among host + joined guests.</p>`}
    </div>`}function Tm(e){return`
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
    </div>`}function wn(e){return e.length?`
    <div class="card">
      <h3>Recent multi-guest sessions</h3>
      <ul class="mg-list">${e.slice(0,8).map(s=>{var a;const i=(s.guests||[]).filter(r=>r.status==="joined"||r.joinedAt).length;return`<li><strong>${l(s.title)}</strong> · ${l(String(i))} guests · ${N(s.endedAt||s.startedAt)}
        ${(a=s.giftSplit)!=null&&a.disclosed?" · split disclosed":""}</li>`}).join("")}</ul>
    </div>`:`
      <div class="card">
        <h3>Recent multi-guest sessions</h3>
        <p class="muted" style="margin:0">No ended sessions yet.</p>
      </div>`}function Dm(e){return`
    <div class="card">
      <h3>Start multi-guest session</h3>
      <p class="muted">You host as <strong>@${l(e.username)}</strong>. Invite demo contacts next — no real stream.</p>
      <div class="field" style="margin-top:10px">
        <span>Session title</span>
        <input id="mgTitle" maxlength="80" placeholder="e.g. Friday collab freestyle" value="PIKK Multi-Guest Demo" />
      </div>
      <button class="btn primary" id="mgStart" style="margin-top:12px">Start as host</button>
    </div>`}function Mm(){const t=D().user;if(!t)return $m();ai();const s=cs(),i=Dl();return!s||s.endedAt?M("Multi-Guest Live",`${xm()}${Dm(t)}${wn(i)}`,{lead:"2–4 co-hosts · gift split disclosure · TEST MODE"}):M("Multi-Guest Live",`${Em(s)}${Am(s)}${Cm(s)}${Tm(s)}${wn(i)}`,{lead:"Active collab session · fake stage · TEST MODE"})}function Lm(e){var s,i,a,r,o,n,d,c,p;if(!e)return;(s=e.querySelector("#mgStart"))==null||s.addEventListener("click",()=>{var f;const m=((f=e.querySelector("#mgTitle"))==null?void 0:f.value)||"",g=Ml(m);if(g.error==="signin")return h("Sign in first");if(g.error==="session_in_progress")return h("Session already active");h("Multi-guest session started"),me()}),(i=e.querySelector("#mgEnd"))==null||i.addEventListener("click",()=>{const m=Rl();if(m.error)return h(m.error==="host_only"?"Host only":"No session");h("Session ended"),me()}),(a=e.querySelector("#mgInviteBtn"))==null||a.addEventListener("click",()=>{var f,b;const m=(f=e.querySelector("#mgInviteSelect"))==null?void 0:f.value;if(!m)return h("Pick a guest");const g=Ll(m);if(g.error==="full")return h("Guest slots full");if(g.error==="already_invited")return h("Already invited");if(g.error)return h("Invite failed: "+g.error);h("Invited @"+(((b=g.guest)==null?void 0:b.username)||m)),me()}),e.querySelectorAll(".mg-accept").forEach(m=>{m.addEventListener("click",()=>{var f;const g=Il(m.getAttribute("data-id"));if(g.error==="full")return h("Stage full");if(g.error)return h("Accept failed");h("@"+(((f=g.guest)==null?void 0:f.username)||"")+" joined"),me()})}),e.querySelectorAll(".mg-decline").forEach(m=>{m.addEventListener("click",()=>{if(Pl(m.getAttribute("data-id")).error)return h("Decline failed");h("Invite declined"),me()})}),e.querySelectorAll(".mg-mute").forEach(m=>{m.addEventListener("click",()=>{const g=m.getAttribute("data-id"),f=m.getAttribute("data-muted")==="1";if(Ol(g,!f).error)return h("Mute failed");h(f?"Unmuted":"Muted"),me()})}),e.querySelectorAll(".mg-leave").forEach(m=>{m.addEventListener("click",()=>{if(_l(m.getAttribute("data-id")).error)return h("Leave failed");h("Guest left"),me()})}),e.querySelectorAll(".mg-remove").forEach(m=>{m.addEventListener("click",()=>{if(ql(m.getAttribute("data-id")).error)return h("Remove failed");h("Guest removed"),me()})}),e.querySelectorAll(".mg-follow").forEach(m=>{m.addEventListener("click",()=>{const g=m.getAttribute("data-follow");m.getAttribute("data-on")==="1"?(Xs(g),h("Unfollowed")):(Qs(g),h("Following")),me()})}),(r=e.querySelector("#mgSplitEqual"))==null||r.addEventListener("click",()=>{if(Qt({mode:"equal",disclose:!1}).error)return h("Split failed");h("Equal split applied"),me()}),(o=e.querySelector("#mgSplitCustom"))==null||o.addEventListener("click",()=>{var f;const m=cs();if(Qt({mode:"custom",shares:((f=m==null?void 0:m.giftSplit)==null?void 0:f.shares)||{},disclose:!1}).error)return h("Could not switch to custom");h("Custom split — edit % then Apply"),me()}),(n=e.querySelector("#mgSplitApply"))==null||n.addEventListener("click",()=>{const m={};e.querySelectorAll(".mg-share-input").forEach(f=>{m[f.getAttribute("data-id")]=Number(f.value)||0});const g=Qt({mode:"custom",shares:m,disclose:!1});if(g.error==="split_total")return h(`Percents total ${g.total}% — need 100%`);if(g.error)return h("Apply failed");h("Custom split saved"),me()}),(d=e.querySelector("#mgDisclose"))==null||d.addEventListener("click",()=>{var f;const m=cs();if(((f=m==null?void 0:m.giftSplit)==null?void 0:f.mode)==="custom"){const b={},y=e.querySelectorAll(".mg-share-input");if(y.length){y.forEach(w=>{b[w.getAttribute("data-id")]=Number(w.value)||0});const v=Qt({mode:"custom",shares:b,disclose:!1});if(v.error==="split_total")return h(`Percents total ${v.total}% — need 100%`)}}const g=Bl();if(g.error==="split_total")return h(`Percents total ${g.total}% — need 100%`);if(g.error)return h("Disclose failed");h("Gift split disclosed · broadcast ready (demo)"),me()});const t=()=>{const m=e.querySelector("#mgChatInput"),g=(m==null?void 0:m.value)||"",f=Nl(g);if(f.error==="empty")return h("Type a message");if(f.error)return h("Chat failed");m&&(m.value=""),me()};(c=e.querySelector("#mgChatSend"))==null||c.addEventListener("click",t),(p=e.querySelector("#mgChatInput"))==null||p.addEventListener("keydown",m=>{m.key==="Enter"&&(m.preventDefault(),t())})}function he(e){q(e?`#/fanclubs?club=${encodeURIComponent(e)}`:"#/fanclubs")}function je(e="DemoFan"){const{user:t}=D();if(t)return t;const s=Tt(e);return h(`Signed in as ${e} · local demo`),s||D().user}function no(e){return e==="paid"?"Paid / Skeet+":e==="members"?"Members only":"Public"}function Im(e,t){const s=t===e.id,i=[e.official?'<span class="chip">Official DBS</span>':"",`<span class="chip">${l(no(e.privacy))}</span>`,`<span class="chip">${e.memberCount||0} members</span>`].filter(Boolean).join(" ");return`<button type="button" class="fanclub-card${s?" on":""}" data-open-club="${l(e.id)}" data-search="${l(`${e.name||""} ${e.hostName||""} ${e.description||""}`)}" aria-label="Open ${l(e.name)} club">
    <div class="row" style="gap:10px;align-items:center">
      <img src="${l(e.graphic||"/brand/logo-dbs-v3@2x.webp")}" alt="" width="48" height="48" style="border-radius:12px;object-fit:cover;background:#111" />
      <div style="flex:1;min-width:0">
        <strong>${l(e.name)}</strong>
        <div class="muted" style="font-size:12px;margin-top:2px">Host @${l(e.hostName)} · Discover DatBoiSkeet</div>
        <div class="row wrap" style="gap:6px;margin-top:6px">${i}</div>
      </div>
    </div>
  </button>`}function Pm(e){const t=bs(e);if(!t)return'<div class="card"><p class="muted" style="margin:0">Club not found.</p><button class="btn" data-back-list>Back to clubs</button></div>';const s=D().user,i=fr(t.id),a=mc(t.id),r=ps(t.id),o=vr(t.id),n=mt(),d=o.ok?"":`<div class="card" style="border-color:rgba(245,158,11,.35)">
          <h3 style="margin:0 0 6px">${t.privacy==="paid"?"Skeet+ room":"Members only"}</h3>
          <p class="muted" style="margin:0 0 10px">${t.privacy==="paid"?"This room uses membership permissions (Skeet+ or higher). TEST MODE unlock below — no real charge.":"Join the club to enter the discussion room."}</p>
          ${t.privacy==="paid"?`<button class="btn primary" id="fcUnlockSkeet">Unlock Skeet+ · TEST MODE</button>
                 <a class="btn" href="#/pricing">Pricing</a>
                 <p class="chip" style="margin-top:8px">Current membership: ${l(n||"none")}</p>`:`<button class="btn primary" data-join="${l(t.id)}">Join club</button>`}
        </div>`,c=o.ok?hc(t.id):[],p=o.ok?c.length?c.map(g=>{const f=r?`<div class="row wrap" style="gap:6px;margin-top:6px">
                   <button class="btn ghost" data-pin="${l(g.id)}" data-club="${l(t.id)}">${g.pinned?"Unpin":"Pin"} · mod</button>
                   <button class="btn ghost" data-remove="${l(g.id)}" data-club="${l(t.id)}">Remove · mod</button>
                 </div>`:"";return`<li style="padding:10px 0;border-top:1px solid rgba(255,255,255,.06)">
              <div class="row" style="justify-content:space-between;gap:8px">
                <strong>@${l(g.username)}</strong>
                <span class="muted" style="font-size:12px">${l(N(g.at))}${g.pinned?" · pinned":""}</span>
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
            <span class="chip">${l(no(t.privacy))}</span>
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
      ${r?'<p class="chip" style="margin-top:8px">Mod tools · TEST MODE</p>':""}
    </div>
    ${d}
    ${o.ok?`<div class="card">
             <h3 style="margin:0 0 4px">Discussion</h3>
             <p class="muted" style="margin:0 0 8px;font-size:12px">Local posts in dbs_v1 · mods can pin/remove</p>
             <ul class="list-plain" id="fcPosts">${p}</ul>
           </div>
           ${m}`:""}
  `}function _m(e){var c;qe();const t=hr(),s=((c=e==null?void 0:e.query)==null?void 0:c.club)||"",{user:i}=D(),a=t.map(p=>Im(p,s)).join(""),r=t.filter(p=>p.privacy==="public").length,o=t.length-r,n=`
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
    </div>`,d=s?Pm(s):`
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
        <div><span>Public rooms</span><strong>${r}</strong><small>Open discussions</small></div>
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
      ${n}
    `;return M("Fan Clubs",`<div class="fanclubs-studio">${d}</div>`,{lead:"Creator communities inside DBS Lounge · DEMO.",badge:"Phase 2 demo"})}function qm(e){var t,s,i,a,r,o,n,d;e.querySelectorAll("[data-fc-jump]").forEach(c=>c.addEventListener("click",()=>{var m;const p=c.getAttribute("data-fc-jump");(m=e.querySelector(`#${p}`))==null||m.scrollIntoView({behavior:"smooth",block:"start"})})),(t=e.querySelector("#fcSearch"))==null||t.addEventListener("input",c=>{const p=String(c.currentTarget.value||"").trim().toLocaleLowerCase(),m=[...e.querySelectorAll(".fanclub-card[data-search]")];let g=0;m.forEach(y=>{const v=(y.dataset.search||"").toLocaleLowerCase().includes(p);y.hidden=!v,v&&(g+=1)});const f=e.querySelector("#fcSearchStatus");f&&(f.textContent=`Showing ${g} of ${m.length} clubs`);const b=e.querySelector("#fcNoResults");b&&(b.hidden=g>0||!p)}),e.querySelectorAll("[data-open-club]").forEach(c=>{c.addEventListener("click",()=>he(c.getAttribute("data-open-club")))}),(s=e.querySelector("[data-back-list]"))==null||s.addEventListener("click",()=>he()),(i=e.querySelector("#fcSignIn"))==null||i.addEventListener("click",()=>{je("DemoFan"),he()}),(a=e.querySelector("#fcAdmin"))==null||a.addEventListener("click",()=>{var p,m;je("DemoAdmin");const c=!H();hs(c),h(c?"Demo admin on":"Demo admin off"),he(((p=e.querySelector("[data-leave],[data-join]"))==null?void 0:p.getAttribute("data-leave"))||((m=e.querySelector("[data-join]"))==null?void 0:m.getAttribute("data-join"))||void 0)}),(r=e.querySelector("#fcSeedBtn"))==null||r.addEventListener("click",()=>{qe({force:!0}),h("Demo clubs reseeded"),he()}),(o=e.querySelector("#fcCreateForm"))==null||o.addEventListener("submit",c=>{var y,v,w,$,A;c.preventDefault(),je("DemoCreator");const p=(y=e.querySelector("#fcName"))==null?void 0:y.value,m=(v=e.querySelector("#fcDesc"))==null?void 0:v.value,g=((w=e.querySelector("#fcGraphic"))==null?void 0:w.value)||"/brand/logo-dbs-v3@2x.webp",f=(($=e.querySelector("#fcPrivacy"))==null?void 0:$.value)||"public",b=cc({name:p,description:m,graphic:g,privacy:f});if(b.error==="signin")return h("Sign in required");if(b.error==="name")return h("Name required");h("Club created · TEST MODE"),he((A=b.club)==null?void 0:A.id)}),e.querySelectorAll("[data-join]").forEach(c=>{c.addEventListener("click",()=>{je();const p=c.getAttribute("data-join");if(gr(p).error)return h("Could not join");h("Joined club"),he(p)})}),e.querySelectorAll("[data-leave]").forEach(c=>{c.addEventListener("click",()=>{je();const p=c.getAttribute("data-leave"),m=dc(p);if(m.error==="host")return h("Host cannot leave — transfer later");if(m.error)return h("Could not leave");h("Left club"),he(p)})}),e.querySelectorAll("[data-follow]").forEach(c=>{c.addEventListener("click",()=>{je();const p=c.getAttribute("data-follow");pc(p),h("Following · optional"),he(p)})}),e.querySelectorAll("[data-unfollow]").forEach(c=>{c.addEventListener("click",()=>{je();const p=c.getAttribute("data-unfollow");uc(p),h("Unfollowed"),he(p)})}),(n=e.querySelector("#fcUnlockSkeet"))==null||n.addEventListener("click",()=>{je(),Js("skeet+",!0),h("Skeet+ unlocked · TEST MODE");const c=new URLSearchParams(location.hash.split("?")[1]||"");he(c.get("club")||void 0)}),(d=e.querySelector("#fcPostForm"))==null||d.addEventListener("submit",c=>{var b;c.preventDefault(),je();const m=new URLSearchParams(location.hash.split("?")[1]||"").get("club"),g=(b=e.querySelector("#fcPostText"))==null?void 0:b.value,f=gc(m,g);if(f.error==="gated")return h("Room gated");if(f.error==="empty")return h("Write something");if(f.error)return h("Could not post");h("Posted"),he(m)}),e.querySelectorAll("[data-pin]").forEach(c=>{c.addEventListener("click",()=>{const p=c.getAttribute("data-club");if(fc(p,c.getAttribute("data-pin")).error==="mod")return h("Mods only");h("Pin toggled · TEST MODE"),he(p)})}),e.querySelectorAll("[data-remove]").forEach(c=>{c.addEventListener("click",()=>{const p=c.getAttribute("data-club");if(vc(p,c.getAttribute("data-remove")).error==="mod")return h("Mods only");h("Post removed · TEST MODE"),he(p)})})}function Gi(){q("#/loyalty")}function Ui(){const{user:e}=D();if(e)return e;const t=Tt("LoyalFan");return h("Signed in as LoyalFan · local demo"),t||D().user}function Ts(e,t,s){var a;Ui();const i=Wc(e,{points:t,note:s});if(i.error==="signin")return h("Sign in required");if(i.error==="cooldown")return h("Anti-farming · wait a few seconds");if(i.error==="daily_cap")return h("Daily cap hit · come back tomorrow (demo)");if(i.error)return h("Could not record");(i.newBadges||[]).filter(r=>r!=="day_one"||(i.loyalty.badges||[]).includes("day_one")),(a=i.newBadges)!=null&&a.length?h(`+${t} pts · badge: ${i.newBadges.join(", ")}`):h(`+${t} pts · ${s}`),Gi()}function Om(){const{user:e}=D(),t=ks(),i=Nr().map(o=>{const n=o.unlocked;return`<div class="card" style="opacity:${n?1:.55};margin:0">
        <div class="row" style="justify-content:space-between;gap:8px">
          <strong>${l(o.name)}</strong>
          <span class="chip">${n?"Unlocked":"Locked"}</span>
        </div>
        <p class="muted" style="margin:6px 0 0;font-size:12px">${l(o.blurb)}</p>
      </div>`}).join(""),a=(t.history||[]).length===0?'<p class="muted" style="margin:0">No actions yet — try a listen tick or join a club.</p>':`<ul class="list-plain">${(t.history||[]).slice(0,12).map(o=>`<li style="padding:8px 0;border-top:1px solid rgba(255,255,255,.06)">
            <div class="row" style="justify-content:space-between">
              <span><strong>+${o.points}</strong> · ${l(o.note||o.kind)}</span>
              <span class="muted" style="font-size:12px">${l(N(o.at))}</span>
            </div>
          </li>`).join("")}</ul>`,r=t.publicVisible?"Your badges & points can appear on your profile (demo flag).":"History & achievements are private — only you see them here.";return M("Loyalty Club",`
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
      <p class="muted" style="margin:0 0 10px;font-size:12px">${l(r)}</p>
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
    `,{lead:"Recognition for healthy participation · DEMO.",badge:"Phase 2 demo"})}function Nm(e){var t,s,i,a,r,o;(t=e.querySelector("#loyListen"))==null||t.addEventListener("click",()=>Ts("listen",5,"Authorized listening tick")),(s=e.querySelector("#loyLive"))==null||s.addEventListener("click",()=>Ts("live",8,"Attended live (stub)")),(i=e.querySelector("#loyHelp"))==null||i.addEventListener("click",()=>Ts("help",6,"Shared community helper tip")),(a=e.querySelector("#loyClub"))==null||a.addEventListener("click",()=>{Ui(),qe();const n=hr(),d=n.find(c=>c.privacy==="public")||n[0];d&&gr(d.id),Ts("club",10,d?`Joined ${d.name}`:"Joined Fan Club")}),(r=e.querySelector("#loyPublic"))==null||r.addEventListener("change",n=>{Ui(),Hc(n.target.checked),h(n.target.checked?"Public visibility on":"Achievements private"),Gi()}),(o=e.querySelector("#loyReset"))==null||o.addEventListener("click",()=>{Yc(),h("Loyalty demo reset"),Gi()})}function at(){q("#/openmic")}function Ei(e="MicHopeful"){const{user:t}=D();if(t)return t;const s=Tt(e);return h(`Signed in as ${e} · local demo`),s||D().user}function Sn(e){return`<span class="chip">${l(e==="approved"?"Approved":e==="rejected"?"Rejected":"Pending")}</span>`}function Bm(){const e=Xc(),t=e.chipLabel||"House rotation",s=e.embed?ut(e.embed,"rel=0"):"";return`
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
    </div>`}function Rm(){Pt();const{user:e}=D(),t=H(),s=Qc(),i=e?Ni().filter(c=>c.userId===e.id):[],a=t?Ni({status:"pending"}):[],r=i.filter(c=>c.status==="pending").length,o=s.length===0?'<p class="muted" style="margin:0">No approved performers yet.</p>':s.map(c=>`<article class="card" style="margin:0 0 10px">
              <div class="row" style="justify-content:space-between;gap:8px">
                <div>
                  <strong>${l(c.trackTitle)}</strong>
                  <div class="muted" style="font-size:12px">@${l(c.username)} · ${l(c.talent)}</div>
                </div>
                ${Sn("approved")}
              </div>
              <p style="margin:8px 0 0">${l(c.profileNote||"Featured in PIKK Open Mic showcase.")}</p>
              <p class="muted" style="font-size:11px;margin:8px 0 0">Not a paid ranking · discovery showcase</p>
            </article>`).join(""),n=i.length===0?'<p class="muted" style="margin:0">You have no applications yet.</p>':`<ul class="list-plain">${i.map(c=>`<li style="padding:10px 0;border-top:1px solid rgba(255,255,255,.06)">
              <div class="row" style="justify-content:space-between">
                <strong>${l(c.trackTitle)}</strong>
                ${Sn(c.status)}
              </div>
              <div class="muted" style="font-size:12px">${l(c.talent)} · ${l(N(c.at))}</div>
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
       </div>`:"";return M("Open Mic",`
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
        <div><span>Awaiting review</span><strong>${r}</strong><small>Your pending submissions</small></div>
      </section>
    ${Bm()}

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
      ${n}
    </div>

    ${d}

    <div class="card openmic-panel" id="omShowcaseCard">
      <h3 style="margin:0 0 8px">Approved showcase</h3>
      <p class="muted" style="margin:0 0 10px;font-size:12px">Featured performers · discovery, not spend rank</p>
      ${o}
    </div>
    </div>
    `,{lead:"24/7 house catalog when idle · opt-in talent showcase · DEMO.",badge:"Phase 2 demo"})}function jm(e){var t,s,i,a,r;e.querySelectorAll("[data-om-jump]").forEach(o=>{o.addEventListener("click",()=>{const n=o.getAttribute("data-om-jump"),d=n==="omApplyCard"||n==="omShowcaseCard"?e.querySelector("#"+n):null;d==null||d.scrollIntoView({behavior:"smooth",block:"start"})})}),(t=e.querySelector("#omSignIn"))==null||t.addEventListener("click",()=>{Ei(),at()}),(s=e.querySelector("#omAdmin"))==null||s.addEventListener("click",()=>{Ei("DemoAdmin");const o=!H();hs(o),h(o?"Demo admin on":"Demo admin off"),at()}),(i=e.querySelector("#omSeed"))==null||i.addEventListener("click",()=>{Pt({force:!0}),h("Open Mic demos reseeded"),at()}),(a=e.querySelector("#omForm"))==null||a.addEventListener("submit",o=>{var c,p,m,g;o.preventDefault(),Ei();const n=(c=e.querySelector("#omRights"))==null?void 0:c.checked,d=ed({talent:(p=e.querySelector("#omTalent"))==null?void 0:p.value,trackTitle:(m=e.querySelector("#omTitle"))==null?void 0:m.value,profileNote:(g=e.querySelector("#omNote"))==null?void 0:g.value,rightsCertified:!!n});if(d.error==="rights")return h("Rights certification required");if(d.error==="title")return h("Title required");if(d.error==="pending")return h("You already have a pending application");if(d.error)return h("Could not submit");h("Application submitted · pending review"),at()}),e.querySelectorAll("[data-om-approve]").forEach(o=>{o.addEventListener("click",()=>{if(Bi(o.getAttribute("data-om-approve"),"approved").error==="admin")return h("Admin only");h("Approved · showcase"),at()})}),e.querySelectorAll("[data-om-reject]").forEach(o=>{o.addEventListener("click",()=>{if(Bi(o.getAttribute("data-om-reject"),"rejected","Demo reject").error==="admin")return h("Admin only");h("Rejected"),at()})}),(r=e.querySelector("#omNextHouse"))==null||r.addEventListener("click",()=>{const o=Zc();h("Next house · "+(o.chipLabel||"House")),at()})}let xe=null,wt="all";try{const e=sessionStorage.getItem("dbs_shop_cat");e&&(wt=e,sessionStorage.removeItem("dbs_shop_cat"));const t=sessionStorage.getItem("dbs_shop_preview");t&&(xe=t,sessionStorage.removeItem("dbs_shop_preview"))}catch{}function Ve(){q("#/profile-shop")}function He(e){return Ls.find(t=>t.id===e)||null}function ro(e){return Br(e)}function Fm(e){const t={...e.equipped},s=xe?He(xe):null;if(s){const i=ro(s);i&&(t[i]=s.id)}return t}function Km(e){return`rarity-${l(e||"rare")}`}function Gm(e){return`$${Number(e).toFixed(2)}`}function Um(e){const{user:t}=D(),s=Fm(e),i=s.frame?He(s.frame):null,a=s.effect?He(s.effect):null,r=s.banner?He(s.banner):null,o=s.nameStyle?He(s.nameStyle):null,n=s.badge?He(s.badge):null,d=(t==null?void 0:t.username)||"DemoFan",c=e.reduceMotion,p=a?`shop-fx shop-fx--${l(a.id.replace(/^fx-/,""))}${c?" shop-fx--still":""}`:"",m=o?`shop-name shop-name--${l(o.id.replace(/^name-/,""))}`:"shop-name",g=i?`shop-avatar-frame shop-frame--${l(i.id.replace(/^frame-/,""))}`:"shop-avatar-frame";return`
    <div class="shop-preview card" id="shopPreview">
      <div class="row wrap" style="justify-content:space-between;gap:8px;margin-bottom:10px">
        <h3 style="margin:0">Live preview</h3>
        <span class="chip">CONCEPT</span>
      </div>
      <div class="${r?`shop-preview-banner shop-banner--${l(r.id.replace(/^ban-/,""))}`:"shop-preview-banner shop-banner--default"}" aria-hidden="true">
        <span class="shop-banner-emoji">${r?l(r.emoji):"🎧"}</span>
      </div>
      <div class="shop-preview-body ${p}">
        <div class="${g}">
          <div class="shop-avatar-inner">${l(d.slice(0,1).toUpperCase())}</div>
          ${i?`<span class="shop-frame-emoji" aria-hidden="true">${l(i.emoji)}</span>`:""}
        </div>
        <div class="shop-preview-meta">
          <div class="${m}">${l(d)}</div>
          <p class="muted small" style="margin:4px 0 0">Cosmetic preview only · not a status grant</p>
          ${n?`<span class="shop-cosmetic-badge" title="Cosmetic style — not Verified/Founder">${l(n.emoji)} ${l(n.name)}</span>`:'<span class="muted small">No cosmetic badge equipped</span>'}
        </div>
      </div>
      <div class="shop-equipped-row">
        ${["frame","effect","banner","nameStyle","badge"].map(b=>{const y=s[b],v=y?He(y):null,w=b==="nameStyle"?"Name":b.charAt(0).toUpperCase()+b.slice(1);return`<span class="shop-eq-chip ${v?"on":""}">${l(w)}: ${v?l(v.emoji+" "+v.name):"—"}</span>`}).join("")}
      </div>
    </div>`}function Vm(e,t){const s=t.owned.includes(e.id),i=ro(e),a=i&&t.equipped[i]===e.id,r=xe===e.id;return`
    <article class="cosmetic-card ${Km(e.rarity)} ${r?"is-selected":""} ${s?"is-owned":""} ${a?"is-equipped":""}" data-id="${l(e.id)}">
      <div class="cosmetic-art" role="button" tabindex="0" data-preview="${l(e.id)}" aria-label="Preview ${l(e.name)}">
        <span class="cosmetic-emoji">${l(e.emoji)}</span>
        <span class="concept-flag">CONCEPT</span>
        ${s?'<span class="owned-flag">Owned</span>':""}
        ${a?'<span class="equipped-flag">Equipped</span>':""}
      </div>
      <div class="body">
        <div class="name">${l(e.name)}</div>
        <div class="meta">${l(e.category)} · ${l(e.rarity)}</div>
        <div class="price">${Gm(e.price)} <span class="chip" style="margin-left:4px">TEST MODE</span></div>
        <div class="cosmetic-actions row wrap" style="gap:6px;margin-top:8px">
          <button type="button" class="btn ghost shop-act" data-act="preview" data-id="${l(e.id)}">Preview</button>
          ${s?a?`<button type="button" class="btn shop-act" data-act="unequip" data-slot="${l(i)}" data-id="${l(e.id)}">Unequip</button>`:`<button type="button" class="btn primary shop-act" data-act="equip" data-id="${l(e.id)}">Equip</button>`:`<button type="button" class="btn primary shop-act" data-act="unlock" data-id="${l(e.id)}">Unlock · TEST MODE</button>`}
        </div>
      </div>
    </article>`}function zm(){const e=We(),t=wt==="all"?Ls:Ls.filter(r=>r.category===wt),s=ko.map(r=>`<button type="button" class="shop-chip ${wt===r.id?"on":""}" data-cat="${l(r.id)}" aria-pressed="${wt===r.id?"true":"false"}">${l(r.label)}</button>`).join(""),i=t.length===0?'<p class="muted">No cosmetics in this category.</p>':`<div class="cosmetic-grid">${t.map(r=>Vm(r,e)).join("")}</div>`,a=`
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

    ${Um(e)}

    <div class="card">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center;margin-bottom:10px">
        <h3 style="margin:0">Catalog · ${Ls.length} items</h3>
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
  `;return M("Profile Shop",a,{lead:"PIKK digital cosmetics · live preview · CONCEPT / TEST MODE.",badge:"Phase 2 · CONCEPT"})}function Hm(e){var s,i,a;e.querySelectorAll(".shop-chip").forEach(r=>{r.addEventListener("click",()=>{wt=r.dataset.cat||"all",Ve()})}),(s=e.querySelector("#shopReduceMotion"))==null||s.addEventListener("change",r=>{cd(r.target.checked),h(r.target.checked?"Motion reduced":"Motion on"),Ve()}),(i=e.querySelector("#shopBundle"))==null||i.addEventListener("click",()=>{var o;const r=nd();h(`Starter bundle unlocked · ${((o=r.unlocked)==null?void 0:o.length)||0} items · no charge`),Ve()}),(a=e.querySelector("#shopReset"))==null||a.addEventListener("click",()=>{dd(),xe=null,h("Demo inventory reset"),Ve()});const t=r=>{xe=r,h("Preview updated"),Ve()};e.querySelectorAll("[data-preview]").forEach(r=>{r.addEventListener("click",()=>t(r.dataset.preview)),r.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),t(r.dataset.preview))})}),e.querySelectorAll(".shop-act").forEach(r=>{r.addEventListener("click",()=>{const o=r.dataset.act,n=r.dataset.id;if(o==="preview")return t(n);if(o==="unlock"){const d=ad(n);return d.error?h("Could not unlock"):(xe=n,h(d.already?"Already owned · TEST MODE":"Unlocked · TEST MODE · no charge"),Ve())}if(o==="equip"){const d=od(n);return d.error==="not_owned"?h("Unlock first · TEST MODE"):d.error?h("Could not equip"):(xe=n,h("Equipped"),Ve())}if(o==="unequip"){const d=r.dataset.slot;if(ld(d).error)return h("Could not unequip");const p=xe?He(xe):null;return p&&Br(p)===d&&(xe=null),h("Unequipped"),Ve()}})})}const Wm=["All","Hats","Shirts","Jackets"],Ym=["Ladies Shop","Men's Shop","Beauty & Hair","Fashion & Accessories","Lifestyle & Home","Creator Brands","Live Shopping","Deals"];function Jm(e,t="All",s=""){const i=String(s||"").trim().toLocaleLowerCase();return e.filter(a=>(t==="All"||a.category===t)&&(!i||`${a.name} ${a.category}`.toLocaleLowerCase().includes(i)))}function Qm(e,t="featured"){const s=[...e];return t==="price-asc"?s.sort((i,a)=>Number(i.price)-Number(a.price)):t==="price-desc"?s.sort((i,a)=>Number(a.price)-Number(i.price)):t==="name-asc"?s.sort((i,a)=>String(i.name).localeCompare(String(a.name))):s}function Xm(e){return`
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
    </article>`}function Zm(){const e=Wm.map(a=>`<button type="button" class="btn ${a==="All"?"primary":"ghost"} pikk-shop-filter"
      data-category="${l(a)}" aria-pressed="${a==="All"?"true":"false"}">${l(a)}</button>`).join(""),t=Ym.map(a=>`<li><span>${l(a)}</span><span class="chip">Coming Soon</span></li>`).join(""),i=[Se.find(a=>a.id==="jacket-black")||Se.find(a=>a.category==="Jackets"),Se.find(a=>a.id==="hat-716-orange")||Se.find(a=>a.category==="Hats"),Se.find(a=>a.id==="tee-ptsd")||Se.find(a=>a.category==="Shirts")].filter(Boolean).map(a=>'<a class="pikk-shop-featured-product" href="'+l(a.shopUrl)+'" target="_blank" rel="noopener noreferrer" aria-label="View '+l(a.name)+' on Foreign X-Change"><img src="'+l(a.image)+'" alt="'+l(a.name)+'" loading="eager" decoding="async" /><span>'+l(a.category)+"</span></a>").join("");return M("PIKK Shop",`
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
      <p class="muted small" id="pikkShopCount" aria-live="polite">${Se.length} items</p>
      <div class="merch-grid pikk-shop-premium-grid pikk-shop-real-grid" id="pikkShopProducts">${Se.map(Xm).join("")}</div>
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
  `,{lead:"Physical merchandise · external checkout · future verified storefronts"})}function eh(e){var g;const t=e.querySelector("#pikkShopSearch"),s=[...e.querySelectorAll(".pikk-shop-product")],i=[...e.querySelectorAll(".pikk-shop-filter, .pikk-shop-category")],a=e.querySelector("#pikkShopCount"),r=e.querySelector("#pikkShopEmpty"),o=e.querySelector("#pikkShopReset"),n=e.querySelector("#pikkShopSort"),d=e.querySelector("#pikkShopProducts"),c=new Map(s.map(f=>[f.dataset.productId,f]));let p="All";function m(){const f=new Set(Jm(Se,p,(t==null?void 0:t.value)||"").map(b=>b.id));for(const b of Qm(Se,(n==null?void 0:n.value)||"featured")){const y=c.get(b.id);y&&(d==null||d.appendChild(y))}for(const b of s){const y=f.has(b.dataset.productId);b.hidden=!y,b.style.display=y?"":"none"}if(a&&(a.textContent=`${f.size} ${f.size===1?"item":"items"}`),r&&(r.hidden=f.size>0),o){const b=p!=="All"||!!(t!=null&&t.value.trim())||((n==null?void 0:n.value)||"featured")!=="featured";o.hidden=!b,o.style.display=b?"":"none"}for(const b of i){const y=b.dataset.category===p;b.setAttribute("aria-pressed",String(y)),b.classList.contains("pikk-shop-filter")&&(b.classList.toggle("primary",y),b.classList.toggle("ghost",!y)),b.classList.toggle("on",y)}}t==null||t.addEventListener("input",m),t==null||t.addEventListener("keydown",f=>{f.key!=="Escape"||!t.value||(f.preventDefault(),f.stopPropagation(),t.value="",m())}),n==null||n.addEventListener("change",m),o==null||o.addEventListener("click",()=>{p="All",t&&(t.value=""),n&&(n.value="featured"),m(),t==null||t.focus()}),(g=e.querySelector("[data-shop-scroll]"))==null||g.addEventListener("click",()=>{var f,b,y;t==null||t.focus({preventScroll:!0}),(y=e.querySelector("#pikkShopCatalog"))==null||y.scrollIntoView({behavior:(b=(f=window.matchMedia)==null?void 0:f.call(window,"(prefers-reduced-motion: reduce)"))!=null&&b.matches?"instant":"smooth",block:"start"})});for(const f of i)f.addEventListener("click",()=>{var b;p=f.dataset.category||"All",m(),f.classList.contains("pikk-shop-category")&&((b=e.querySelector("#pikkShopCatalog"))==null||b.scrollIntoView({behavior:"auto",block:"start"}))})}let qs=null;function ie(){q("#/spotlight")}function Ai(){qs&&(clearInterval(qs),qs=null)}function oo(e){const t=Math.max(0,Math.ceil(e/1e3)),s=Math.floor(t/60),i=t%60;return`${s}:${String(i).padStart(2,"0")}`}function Aa(e){return e==="freestyle"?"Live Freestyle":e==="beat"?"Beat":e==="music_video"?"Music Video":"Song"}function th(e){const t=D().user;return!t||!e?!1:(t.following||[]).includes(e)}function Ca(){return!!D().user}function sh(){return M("24/7 Spotlight",`<div class="card">
      <h3>Sign in required</h3>
      <p class="muted">Join the FIFO Spotlight queue, vote Keep Going / Play Another, and chat from a local demo account.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,{lead:"Continuous music showcase · votes ≠ paid advantage · TEST MODE"})}function ih(e){return`
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
    </div>`}function ah(e,{showSkip:t=!0}={}){const s=e.chipLabel||e.status||"House rotation",i=e.embed?ut(e.embed,"rel=0"):"";return`
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
        ${e.cover?`<img class="sp-cover" src="${l(kt(e.cover))}" alt="" />`:""}
        <div>
          <div class="sp-now-title">${l(e.title)}</div>
          <div class="sp-now-meta">${l(e.artist||"DatBoiSkeet")} · house catalog</div>
          <p class="muted sp-note">${l(e.note||"Approved catalog filler · not a live act")}</p>
          ${e.youtube?`<p style="margin:8px 0 0"><a class="btn ghost" href="${l(e.youtube)}" target="_blank" rel="noopener">Open on YouTube</a></p>`:""}
        </div>
      </div>
      ${t&&Ca()?`<div class="row wrap" style="gap:8px;margin-top:12px">
               <button class="btn" id="spSkipHouse">Skip house · next</button>
               <span class="muted" style="font-size:12px;align-self:center">Join queue takes the stage over house · Skip advances catalog</span>
             </div>`:""}
    </div>`}function nh(e,t){if(!e||e.house){const b=e&&e.house?{id:e.id,title:e.title,artist:e.artist,embed:e.embed,youtube:e.youtube,chipLabel:e.chipLabel||"House · Music Video",note:e.note,cover:e.cover,kind:e.houseKind}:pr();return ah(b)}const s=D().user,i=e.type==="freestyle",a=i&&e.endsAt?Math.max(0,e.endsAt-Date.now()):null,r=Object.keys(e.keepGoingVotes||{}).length,o=Object.keys(e.playAnotherVotes||{}).length,n=e.userId,d=th(n),c=s&&s.id===e.userId,p=e.reactions||{fire:0,heart:0,clap:0},m=i?`<div class="sp-timer" aria-live="polite">
         <div class="sp-timer-label">Freestyle timer · ext ${e.extensions||0}/${t.maxExtensions}</div>
         <div class="sp-timer-clock" id="spClock">${oo(a||0)}</div>
         <div class="muted" style="font-size:12px">Keep Going ${r}/${t.keepGoing} · refresh recovers endsAt</div>
       </div>`:`<div class="sp-timer">
         <div class="sp-timer-label">Uploaded · play ${e.playCount||1}/${t.maxUploadStreak}</div>
         <div class="muted" style="font-size:12px">No real audio in TEST MODE · use End set when finished</div>
       </div>`,g=e.awaitingPlayAnother?`<div class="card sp-vote">
         <h3>Play Another?</h3>
         <p class="muted">Audience vote · ${o}/${t.playAnother} · window ends ${e.playAnotherDeadline?N(e.playAnotherDeadline):"soon"} (deadline-based)</p>
         <div class="row wrap" style="gap:8px">
           <button class="btn primary" id="spPlayAnother">Play Another</button>
           <button class="btn ghost" id="spSimPlayAnother">+2 fan votes (demo)</button>
         </div>
       </div>`:i?`<div class="card sp-vote">
           <h3>Keep Going</h3>
           <p class="muted">Votes extend stage time only — not paid advantage · ${r}/${t.keepGoing}</p>
           <div class="row wrap" style="gap:8px">
             <button class="btn primary" id="spKeepGoing" ${(e.extensions||0)>=t.maxExtensions?"disabled":""}>Keep Going</button>
             <button class="btn ghost" id="spSimKeepGoing" ${(e.extensions||0)>=t.maxExtensions?"disabled":""}>+2 fan votes (demo)</button>
           </div>
         </div>`:"",f=c?"":d?`<button class="btn ghost sp-follow" data-follow="${l(n)}" data-on="1">Following</button>`:`<button class="btn ghost sp-follow" data-follow="${l(n)}" data-on="0">Follow</button>`;return`
    <div class="card sp-stage">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center">
        <div class="chip">On stage · ${l(Aa(e.type))}</div>
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
    ${g}`}function rh(e,t,s){const i=n=>Math.max(1,(n+(t?1:0))*2),a=(e||[]).map((n,d)=>`
      <li class="sp-q-row">
        <div>
          <strong>${l(n.username)}</strong>
          <span class="muted"> · ${l(Aa(n.type))} · ${l(n.title)}</span>
          <div class="muted" style="font-size:12px">${d===0?"Next up":`#${d+1}`} · ~${i(d)} min wait (stub)</div>
        </div>
        <div class="row wrap" style="gap:6px">
          ${s&&n.userId===s.id?'<button class="btn ghost sp-leave-q">Leave</button>':""}
          ${Ca()?`<button class="btn ghost sp-remove-q" data-qid="${l(n.id)}" title="Demo moderator">Remove</button>`:""}
        </div>
      </li>`).join(""),r=s&&(e||[]).some(n=>n.userId===s.id),o=s&&t&&!t.house&&t.userId===s.id;return`
    <div class="card sp-queue">
      <h3>FIFO queue</h3>
      <p class="muted" style="margin-top:0">${e.length?e.length+" waiting":"Queue empty — house catalog on stage"}${t&&!t.house?" · now: "+l(t.username):t&&t.house?" · house: "+l(t.chipLabel||"House"):""}</p>
      <ul class="sp-list">${a||'<li class="muted">No one waiting</li>'}</ul>
      ${r||o?`<p class="muted">You already have a spot (${o?"on stage":"in queue"}). One active spot per user.</p>
             ${r?'<button class="btn ghost" id="spLeaveQueue">Leave queue</button>':""}`:`<form id="spJoinForm" class="sp-join">
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
    </div>`}function oh(e){if(!Ca())return"";const t=H()?"Admin":"Demo moderator · TEST MODE",s=e&&!e.house;return`
    <div class="card sp-mod">
      <h3>Moderator controls</h3>
      <p class="muted" style="margin-top:0"><span class="chip">${l(t)}</span> Skip / remove for safety · fair order otherwise. House Skip → next queue or next house.</p>
      <div class="row wrap" style="gap:8px">
        <button class="btn" id="spSkip" ${e?"":"disabled"}>Skip current</button>
        ${s&&e.type!=="freestyle"&&!e.awaitingPlayAnother?'<button class="btn ghost" id="spEndSet">End set</button>':""}
      </div>
    </div>`}function lh(e){const t=D().user;return!e||e.house||e.type==="freestyle"||e.awaitingPlayAnother||!t||t.id!==e.userId?"":`
    <div class="card">
      <h3>Your set</h3>
      <p class="muted">No real audio file — tap End set when your demo track “finishes”.</p>
      <button class="btn primary" id="spEndSetSelf">End set</button>
    </div>`}function ch(e){return!e||e.house?"":`
    <div class="card sp-chat-card">
      <h3>Stage chat</h3>
      <div class="sp-chat" id="spChat">${(e.chat||[]).slice(-20).map(s=>`<div class="sp-chat-row ${s.system?"system":""}"><strong>${l(s.username)}</strong>${l(s.text)}</div>`).join("")||'<div class="muted">No messages yet</div>'}</div>
      <form id="spChatForm" class="row" style="gap:8px;margin-top:8px">
        <input id="spChatInput" maxlength="200" placeholder="Say something…" style="flex:1" />
        <button class="btn primary" type="submit">Send</button>
      </form>
    </div>`}function dh(e){return e.length?`
    <div class="card">
      <h3>Recent stage</h3>
      <ul class="sp-list">${e.slice(0,12).map(s=>`<li><strong>${l(s.username)}</strong> · ${l(Aa(s.type))} · ${l(s.title)}
         <span class="muted"> · ${l(s.reason||"ended")} · ${N(s.endedAt)}</span></li>`).join("")}</ul>
    </div>`:`
      <div class="card">
        <h3>Recent stage</h3>
        <p class="muted" style="margin:0">No completed turns yet.</p>
      </div>`}function ph(){te();const e=D().user;if(!e)return sh();const t=Q(),s=lc(12);return M("24/7 Spotlight",`${ih(t.thresholds)}
     ${nh(t.nowPlaying,t.thresholds)}
     ${lh(t.nowPlaying)}
     ${oh(t.nowPlaying)}
     ${rh(t.queue,t.nowPlaying,e)}
     ${ch(t.nowPlaying)}
     ${dh(s)}`,{lead:"Always-on music showcase · FIFO queue · votes ≠ wagers · TEST MODE"})}function uh(e){var r,o,n,d,c,p,m,g,f,b,y;Ai(),te();const s=Q().nowPlaying;if(s&&s.type==="freestyle"&&s.endsAt){const v=e.querySelector("#spClock");qs=setInterval(()=>{te();const w=Q().nowPlaying;if(!w||w.type!=="freestyle"||!w.endsAt){Ai(),ie();return}const $=Math.max(0,w.endsAt-Date.now());v&&(v.textContent=oo($)),$<=0&&(Ai(),te(),ie())},250)}if(s&&s.awaitingPlayAnother&&s.playAnotherDeadline){const v=Math.max(0,s.playAnotherDeadline-Date.now())+50;setTimeout(()=>{te(),ie()},Math.min(v,35e3))}(r=e.querySelector("#spJoinForm"))==null||r.addEventListener("submit",v=>{var L,C,O;v.preventDefault();const w=((L=e.querySelector("#spType"))==null?void 0:L.value)||"song",$=((C=e.querySelector("#spTitle"))==null?void 0:C.value)||"",A=((O=e.querySelector("#spArtist"))==null?void 0:O.value)||"",k=Xl({type:w,title:$,artist:A});if(k.error==="signin")return h("Sign in first");if(k.error==="already_queued")return h("You already have a queue/stage spot");h(w==="freestyle"?"Freestyle — you're up or in queue":"Joined Spotlight queue"),ie()}),(o=e.querySelector("#spLeaveQueue"))==null||o.addEventListener("click",()=>{if(Ga().error)return h("Not in queue");h("Left queue"),ie()}),e.querySelectorAll(".sp-leave-q").forEach(v=>{v.addEventListener("click",()=>{Ga(),h("Left queue"),ie()})}),e.querySelectorAll(".sp-remove-q").forEach(v=>{v.addEventListener("click",()=>{Zl(v.getAttribute("data-qid")),h("Removed from queue (demo mod)"),ie()})});const i=()=>{Q().nowPlaying,ec();const v=Q().nowPlaying;v&&v.house?h("Next house · "+(v.chipLabel||"House")):h(v?"Skipped · "+(v.username||"next")+" on stage":"Skipped"),ie()};(n=e.querySelector("#spSkip"))==null||n.addEventListener("click",i),(d=e.querySelector("#spSkipHouse"))==null||d.addEventListener("click",i);const a=()=>{const v=tc();if(v.error==="max_streak"||v.ok){h(v.error==="max_streak"?"Max 3 in a row — advancing":"Play Another? vote open"),ie();return}v.error?h("Cannot end set: "+v.error):ie()};(c=e.querySelector("#spEndSet"))==null||c.addEventListener("click",a),(p=e.querySelector("#spEndSetSelf"))==null||p.addEventListener("click",a),(m=e.querySelector("#spKeepGoing"))==null||m.addEventListener("click",()=>{const v=sc();if(v.error==="already_voted")return h("Already voted");if(v.error==="max_extensions")return h("Max extensions reached");if(v.error)return h(v.error);h("Keep Going counted"),ie()}),(g=e.querySelector("#spSimKeepGoing"))==null||g.addEventListener("click",()=>{ic(2),h("+2 simulated fan votes"),ie()}),(f=e.querySelector("#spPlayAnother"))==null||f.addEventListener("click",()=>{const v=ac();if(v.error==="already_voted")return h("Already voted");if(v.error)return h(v.error);h("Play Another vote counted"),ie()}),(b=e.querySelector("#spSimPlayAnother"))==null||b.addEventListener("click",()=>{nc(2),h("+2 simulated fan votes"),ie()}),e.querySelectorAll(".sp-follow").forEach(v=>{v.addEventListener("click",()=>{const w=v.getAttribute("data-follow");v.getAttribute("data-on")==="1"?(Xs(w),h("Unfollowed")):(Qs(w),h("Following")),ie()})}),e.querySelectorAll(".sp-react").forEach(v=>{v.addEventListener("click",()=>{rc(v.getAttribute("data-kind")||"fire"),ie()})}),(y=e.querySelector("#spChatForm"))==null||y.addEventListener("submit",v=>{v.preventDefault();const w=e.querySelector("#spChatInput"),$=oc((w==null?void 0:w.value)||"");if($.error!=="empty"){if($.error)return h($.error);w&&(w.value=""),ie()}})}const lo="Not available — WebRTC + age assurance required before launch";function Wt(){q("#/connect")}function mh(){var p;const e=Mr(),s=Ze().selected||[],i=Gc(),a=Pr(),r=Number(a==null?void 0:a.max)||0,o=!!i,n=e.map(m=>{const g=s.includes(m.id),f=m.connected?`<span class="chip">Linked${m.handle?" · "+l(m.handle):""}</span>`:'<span class="chip muted-chip">Not linked</span>';return`
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
       <span class="chip">${d}/${r} selected · cap ${r}</span>`;return`
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
      <div class="connect-mp-grid" style="margin-top:12px">${n}</div>
      <div class="row wrap" style="margin-top:12px;gap:8px;align-items:center">
        ${c}
        <a class="btn ghost" href="#/live">Solo Live stage</a>
      </div>
      <p class="muted" style="margin:10px 0 0;font-size:12px">
        PIKK Connect combines random video discovery and multi-platform live controls in one place.
      </p>
    </div>`}function Vi(){const e=_r(),t=e.ageConfirmed&&e.rulesAccepted;return M("PIKK Connect",`<div class="connect-monkey" id="connectMonkey">
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
          <strong>${lo}</strong>
          <p class="muted small">TEST MODE — this is a preview, not a real matching request. No match was created, no camera was requested, and no WebRTC connection was attempted.</p>
        </div>
        <p class="muted small" style="margin-top:10px">Controls are mockups until launch. Prefs save on this device.</p>
      </div>

      ${mh()}

      <div class="card">
        <p class="muted" style="margin:0 0 8px">PIKK Connect <strong>does not replace</strong> Live, Messages, or Spotlight. Meanwhile:</p>
        <a class="btn" href="#/live">Live</a> <a class="btn" href="#/messages">Messages</a> <a class="btn" href="#/spotlight">Spotlight</a> <a class="btn ghost" href="#/shorts">Shorts / Clips</a>
      </div>
    </div>`,{lead:"1:1 discovery shell · multi-platform go-live · TEST MODE",badge:"Shell · no WebRTC"})}function hh(e){var t,s;e.querySelectorAll(".connect-mp-connect").forEach(i=>{i.addEventListener("click",()=>{const a=i.dataset.id,r=Oc(a,"");if(r!=null&&r.error)return h(String(r.error));h(`Linked ${a} · TEST MODE`),Wt()})}),e.querySelectorAll(".connect-mp-disconnect").forEach(i=>{i.addEventListener("click",()=>{Nc(i.dataset.id),h("Unlinked · TEST MODE"),Wt()})}),e.querySelectorAll(".connect-mp-dest").forEach(i=>{i.addEventListener("change",()=>{Rc(i.dataset.id),Wt()})}),(t=e.querySelector("#connectMpGoLive"))==null||t.addEventListener("click",()=>{const i=Fc();if((i==null?void 0:i.error)==="signin")return h("Sign in first");if((i==null?void 0:i.error)==="none_selected")return h("Select at least one destination");if(i!=null&&i.error)return h(String(i.error));h("Multi-platform session started · TEST MODE"),Wt()}),(s=e.querySelector("#connectMpEnd"))==null||s.addEventListener("click",()=>{Kc(),h("Session ended"),Wt()})}function zi(e=document,t){var a,r,o;const s=()=>{if(typeof t=="function")return t();e.innerHTML=Vi(),zi(e)};(a=e.querySelector("#connect-age"))==null||a.addEventListener("change",n=>{const d=n.target.checked;Ha(d?{ageConfirmed:!0}:{ageConfirmed:!1,rulesAccepted:!1}),s()}),(r=e.querySelector("#connect-rules"))==null||r.addEventListener("change",n=>{Ha({rulesAccepted:n.target.checked}),s()}),(o=e.querySelector("#connect-start"))==null||o.addEventListener("click",()=>{const n=e.querySelector("#connect-blocked");n==null||n.removeAttribute("hidden"),h(lo)}),hh(e);const i=Oe().elementId;(i==="connect-random-chat"||i==="connect-multistream")&&requestAnimationFrame(()=>{var n,d,c,p;(p=e.querySelector(`#${i}`))==null||p.scrollIntoView({behavior:(c=(d=(n=globalThis.window)==null?void 0:n.matchMedia)==null?void 0:d.call(n,"(prefers-reduced-motion: reduce)"))!=null&&c.matches?"instant":"smooth",block:"start"})})}const co="pikk_forum_local_v1",as=[["music","Music & Artists","♫"],["business","Business & Money","$"],["relationships","Relationships","♡"],["gaming","Gaming","♜"],["sports","Sports","★"],["entertainment","Entertainment","▶"],["lifestyle","Lifestyle","✦"],["general","General Discussion","#"]],Hi=new Set(as.map(e=>e[0])),Yt=e=>String(e||"").trim();function Jt(){try{const e=JSON.parse(localStorage.getItem(co)||"{}");return{posts:Array.isArray(e.posts)?e.posts.filter(t=>t&&Hi.has(t.topic)).slice(-150):[],votes:e.votes&&typeof e.votes=="object"?e.votes:{},hidden:Array.isArray(e.hidden)?e.hidden:[]}}catch{return{posts:[],votes:{},hidden:[]}}}function Ds(e){try{return localStorage.setItem(co,JSON.stringify(e)),!0}catch{return h("Local storage unavailable"),!1}}function gh(e,t,s,i){let a=e.posts.filter(o=>!e.hidden.includes(o.id)&&(s==="all"||o.topic===s));const r=o=>Object.entries(e.votes).reduce((n,d)=>n+(d[0].startsWith(o.id+":")&&Number(d[1])||0),0);return a.sort((o,n)=>{var d,c;return i==="top"?r(n)-r(o):i==="discussed"?(((d=n.replies)==null?void 0:d.length)||0)-(((c=o.replies)==null?void 0:c.length)||0):n.when-o.when}),a.length?a.map(o=>{var p;const n=((p=as.find(m=>m[0]===o.topic))==null?void 0:p[1])||"Community",d=Array.isArray(o.replies)?o.replies:[],c=Number(e.votes[o.id+":"+((t==null?void 0:t.id)||"guest")])||0;return'<article class="pikk-forum-post"><div class="pikk-forum-votes"><button data-fvote="1" data-id="'+l(o.id)+'" aria-label="Upvote" aria-pressed="'+(c===1)+'" '+(t?"":"disabled")+">▲</button><b>"+r(o)+'</b><button data-fvote="-1" data-id="'+l(o.id)+'" aria-label="Downvote" aria-pressed="'+(c===-1)+'" '+(t?"":"disabled")+'>▼</button></div><div class="pikk-forum-post-content"><p class="pikk-forum-meta">'+l(n)+" · u/"+l(o.author)+" · local preview</p><h3>"+l(o.title)+'</h3><p class="pikk-forum-text">'+l(o.body)+'</p><button class="pikk-forum-reply-button" data-fopen="'+l(o.id)+'">▤ '+d.length+" replies</button> "+(t&&t.id!==o.owner?'<button class="pikk-forum-reply-button" data-freport="'+l(o.id)+'">◇ Hide / report locally</button>':"")+'<div class="pikk-forum-thread" data-thread="'+l(o.id)+'" hidden>'+d.map(m=>'<p class="pikk-forum-comment"><strong>'+l(m.author)+"</strong> "+l(m.body)+"</p>").join("")+(t?'<form data-freply="'+l(o.id)+'"><label>Reply</label><textarea maxlength="1000" required rows="2" placeholder="Join the discussion"></textarea><button class="btn primary" type="submit">Reply · local</button></form>':'<a href="#/profile" class="btn ghost">Sign in to reply</a>')+"</div></div></article>"}).join(""):'<div class="pikk-forum-empty">No discussions yet. Start the first conversation on this browser.</div>'}function fh(){const e=D().user,t=as.map(s=>'<button data-ftopic="'+s[0]+'" type="button" aria-pressed="false"><span>'+s[2]+"</span>"+l(s[1])+"</button>").join("");return M("PIKK Communities",'<section class="pikk-forum-hero"><p class="kicker">PIKK CONNECT · TOPICS & DISCUSSIONS</p><h2>Find your people. <span>Start the conversation.</span></h2><p>Explore communities around what matters to you. Discuss, upvote, reply and discover new ideas.</p><a class="btn ghost" href="#/community">PIKK Lounge</a> <a class="btn ghost" href="#/posts">Social Posts</a></section><p class="pikk-forum-warning"><b>TEST MODE:</b> These conversations and votes are saved only in this browser. No public posting, account verification or server-side moderation is active.</p><div id="pikkForum" class="pikk-forum-layout"><aside class="pikk-forum-sidebar"><h3>Explore topics</h3><button class="on" data-ftopic="all" aria-pressed="true">✦ All discussions</button>'+t+'</aside><main class="pikk-forum-center"><nav class="pikk-forum-sort" aria-label="Sort posts"><button class="on" data-fsort="new" aria-pressed="true">✦ New</button><button data-fsort="top" aria-pressed="false">▲ Top</button><button data-fsort="discussed" aria-pressed="false">▤ Discussed</button></nav><div class="pikk-forum-topic-board"><h3>Discover communities</h3><div class="pikk-forum-topic-cards">'+as.map(s=>'<button data-ftopic="'+s[0]+'" aria-pressed="false"><span>'+s[2]+"</span><strong>"+l(s[1])+"</strong></button>").join("")+'</div></div><section class="pikk-forum-compose"><h3>Start a discussion</h3>'+(e?'<form id="pikkForumForm"><label for="pikkForumTopic">Community</label><select id="pikkForumTopic">'+as.map(s=>'<option value="'+s[0]+'">'+l(s[1])+"</option>").join("")+'</select><label for="pikkForumTitle">Title</label><input id="pikkForumTitle" required maxlength="110" placeholder="What is on your mind?" /><label for="pikkForumBody">Discussion</label><textarea id="pikkForumBody" required maxlength="4000" rows="3" placeholder="Ask a question or share a thought..."></textarea><button class="btn primary" type="submit">Publish locally · TEST MODE</button></form>':'<p class="muted">Sign in with a PIKK demo account to write discussions and vote.</p><a href="#/profile" class="btn primary">Sign in</a>')+'</section><section><h3 class="pikk-forum-feed-title">Community discussions</h3><div id="pikkForumFeed"></div></section></main><aside class="pikk-forum-info"><h3>About PIKK Communities</h3><p>Topic-based discussion with an original PIKK look, separate from the live Lounge and social feed.</p><h3>Community safety</h3><p>Respect others. No harassment, hate, scams or personal information. Reports on this preview only hide posts on your device.</p><a href="#/guidelines">Community Guidelines</a></aside></div>',{lead:"Topic communities · discussions · voting · replies · local preview"})}function vh(e){const t=e.querySelector("#pikkForum");if(!t)return;let s="all",i="new";const a=()=>D().user,r=t.querySelector("#pikkForumFeed"),o=()=>{r.innerHTML=gh(Jt(),a(),s,i)},n=new URLSearchParams(location.hash.split("?")[1]||"").get("topic");Hi.has(n)&&(s=n);function d(c,p,m){t.querySelectorAll(c).forEach(g=>{let f=g.dataset[p]===m;g.classList.toggle("on",f),g.setAttribute("aria-pressed",String(f))})}d("[data-ftopic]","ftopic",s),t.addEventListener("click",c=>{const p=c.target.closest("[data-ftopic]");if(p){s=p.dataset.ftopic,d("[data-ftopic]","ftopic",s);const y=t.querySelector("#pikkForumTopic");y&&s!=="all"&&(y.value=s),o();return}const m=c.target.closest("[data-fsort]");if(m){i=m.dataset.fsort,d("[data-fsort]","fsort",i),o();return}const g=c.target.closest("[data-fopen]");if(g){const y=t.querySelector('[data-thread="'+g.dataset.fopen+'"]');y&&(y.hidden=!y.hidden);return}const f=c.target.closest("[data-fvote]");if(f&&a()){const y=Jt(),v=f.dataset.id+":"+a().id,w=Number(f.dataset.fvote);y.votes[v]=y.votes[v]===w?0:w,Ds(y)&&o();return}const b=c.target.closest("[data-freport]");if(b&&a()){if(!confirm("Hide this post on this browser? This will NOT submit a report to a server."))return;const y=Jt();y.hidden.push(b.dataset.freport),Ds(y)&&o(),h("Hidden locally only — no server report submitted")}}),t.addEventListener("submit",c=>{var m,g,f,b;const p=c.target;if(!(!(p instanceof HTMLFormElement)||!a())){if(c.preventDefault(),p.id==="pikkForumForm"){const y=Yt((m=p.querySelector("input"))==null?void 0:m.value),v=Yt((g=p.querySelector("textarea"))==null?void 0:g.value),w=(f=p.querySelector("select"))==null?void 0:f.value;if(!y||!v||!Hi.has(w))return;const $=Jt();$.posts.push({id:"local-"+Date.now()+"-"+Math.random().toString(36).slice(2,8),owner:a().id,author:Yt(a().username).slice(0,30)||"Member",title:y,body:v,topic:w,when:Date.now(),replies:[]}),Ds($)&&(s=w,d("[data-ftopic]","ftopic",s),p.reset(),o(),h("Saved only on this browser · TEST MODE"))}else if(p.dataset.freply){const y=Yt((b=p.querySelector("textarea"))==null?void 0:b.value);if(!y)return;const v=Jt(),w=v.posts.find($=>$.id===p.dataset.freply);if(!w)return;if(w.replies||(w.replies=[]),w.replies.push({author:Yt(a().username).slice(0,30)||"Member",body:y}),Ds(v)){o();const $=t.querySelector('[data-thread="'+w.id+'"]');$&&($.hidden=!1),h("Reply saved locally")}}}}),o()}function bh(){const e=ge.filter(s=>(s.category||"")==="Music Videos"&&s.embed);return(e.length?e:ge.filter(s=>s.embed)).slice(0,10).map((s,i)=>({id:`clip_${s.id}`,videoId:s.id,title:s.title,artist:s.artist||"DatBoiSkeet",embed:s.embed,youtube:s.youtube,blurb:i%3===0?"Clip cut · DEMO":i%3===1?"Highlight · DEMO":"Short · DEMO"}))}function yh(e,t){return`
    <article class="shorts-card" data-clip-id="${l(e.id)}" id="shorts-card-${t}">
      <div class="shorts-stage">
        <div class="shorts-embed hero-video">
          <iframe
            src="${l(ut(e.embed))}"
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
    </article>`}function $n(){const e=bh(),s=`
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
      ${e.map(yh).join("")||'<p class="muted">No demo clips seeded.</p>'}
    </div>
    <p class="muted" style="margin:12px 0 0;font-size:12px;text-align:center">
      End of DEMO feed · ${e.length} clips · Scroll for more when real clip uploads ship
    </p>`;return M("Shorts / Clips",s,{lead:"Posts · short-form feed · Picture / Short / Video create on Posts · TEST MODE"})}function xn(e){ya(e),e.querySelectorAll(".shorts-card").forEach(t=>{t.addEventListener("focusin",()=>{t.classList.add("is-focus")})}),e.querySelector(".shorts-card")||h("No demo clips · add MVs in data.js")}const Ys=[{id:"ny",name:"NY",tag:"East coast",still:"/blockwars-preview/preview-ny-still.jpg",fighter:"Brooklyn Brawler",blurb:"Street-pressured power from the five boroughs. Heavy combos, tight corners — TEST MODE teaser only."},{id:"la",name:"LA",tag:"West coast",still:"/blockwars-preview/preview-la-still.jpg",fighter:"Sunset Striker",blurb:"Flashy footwork under neon skies. Style meets speed — Coming Soon, not a real match engine."},{id:"chi",name:"Chicago",tag:"Midwest",still:"/blockwars-preview/preview-chi-still.jpg",fighter:"Windy City Wall",blurb:"Defense-first grit from the lakefront. Hold the block — lobby demo only, no live fights yet."}];function kh(e){return Ys.map(t=>{const s=t.id===e?" is-active":"",i=t.id===e?"true":"false";return`<button type="button" class="bw-city-card${s}" data-city="${l(t.id)}" aria-pressed="${i}" aria-label="${l(t.name)} fighter"><img src="${l(t.still)}" alt="" width="120" height="160" loading="lazy" decoding="async" /><span class="bw-city-meta"><span class="bw-city-name">${l(t.name)}</span><span class="bw-city-tag">${l(t.tag)}</span></span></button>`}).join("")}function wh(e){return`<div class="bw-focus" id="bwFocus" data-city="${l(e.id)}"><div class="bw-focus-still"><img id="bwFocusImg" src="${l(e.still)}" alt="${l(e.fighter)}" width="110" height="140" /></div><div class="bw-focus-copy"><p class="bw-focus-city">${l(e.name)} · ${l(e.tag)}</p><h3 id="bwFocusName">${l(e.fighter)}</h3><p id="bwFocusBlurb">${l(e.blurb)}</p></div></div>`}function Sh(){const e=Ys[0],t=`
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
        ${kh(e.id)}
      </div>

      ${wh(e)}

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
    </div>`;return M("Block Wars",t,{lead:"Coming Soon · lobby fighter select · preview video · not playable yet."})}function $h(e,t){const s=Ys.find(d=>d.id===t)||Ys[0];e.querySelectorAll(".bw-city-card").forEach(d=>{const c=d.getAttribute("data-city")===s.id;d.classList.toggle("is-active",c),d.setAttribute("aria-pressed",c?"true":"false")});const i=e.querySelector("#bwFocus"),a=e.querySelector("#bwFocusImg"),r=e.querySelector("#bwFocusName"),o=e.querySelector("#bwFocusBlurb"),n=e.querySelector(".bw-focus-city");i&&i.setAttribute("data-city",s.id),a&&(a.src=s.still,a.alt=s.fighter),r&&(r.textContent=s.fighter),o&&(o.textContent=s.blurb),n&&(n.textContent=`${s.name} · ${s.tag}`)}function xh(e){var a,r;(a=e.querySelector("#bwCityGrid"))==null||a.addEventListener("click",o=>{const n=o.target.closest(".bw-city-card");n&&(o.preventDefault(),$h(e,n.getAttribute("data-city")))}),(r=e.querySelector("#bwEnterArena"))==null||r.addEventListener("click",o=>{o.preventDefault(),h("Block Wars arena is Coming Soon — lobby demo only. No match engine yet.")});const t=e.querySelector("#bwCsVideo"),s=e.querySelector("#bwCsPlay");if(!t)return;const i=()=>{if(!s)return;const o=t.paused||t.ended;s.hidden=!o,s.setAttribute("aria-hidden",o?"false":"true")};s==null||s.addEventListener("click",o=>{o.preventDefault(),t.play().catch(()=>{})}),t.addEventListener("play",()=>{Vs(),i()}),t.addEventListener("pause",()=>{ms(),i()}),t.addEventListener("ended",()=>{ms(),i()}),t.addEventListener("pointerdown",()=>{t.paused||Vs()}),i()}function Eh(){return M("PIKK Arcade",`
    <section class="pikk-arcade-intro card" aria-label="PIKK Arcade">
      <div class="pikk-arcade-heading">
        <div>
          <p class="kicker">Play · Compete · Hang out</p>
          <div class="pikk-arcade-brand"><img src="${l(Mi({artwork:"/brand/pikk-official-approved.jpg"}))}" alt="PIKK" loading="eager" decoding="async"/><span>ARCADE</span></div>
          <p>15 original game concepts. Find your favorites, see the art, and follow their development.</p>
        </div>
        <span class="pikk-arcade-icon" aria-hidden="true">🎮</span>
      </div>
      <p class="pikk-arcade-disclosure">ALL GAMES COMING SOON · Gallery previews, not playable releases. Play Chips have no cash value or cash-out.</p>
    </section>
    <div class="pikk-arcade-toolbar"><strong>15 upcoming games</strong><span>PLAY • COMPETE • HANG OUT</span></div>
    <div class="pikk-arcade-grid">
      ${Ns.map((e,t)=>`
        <article class="pikk-arcade-card pikk-game-${l(e.theme)}">
          <div class="pikk-arcade-card-header"><span class="pikk-arcade-number">${t+1}</span><h3>${l(e.name)}</h3></div>
          <div class="pikk-arcade-art" aria-label="${l(e.name)} preview artwork">
            ${e.artwork?`<img src="${l(Mi(e))}" alt="${l(e.name)} concept artwork" loading="lazy" decoding="async"/>`:`<span class="pikk-arcade-symbol" aria-hidden="true">${e.icon}</span>`}
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
  `,{lead:"Fifteen upcoming games · mobile-first catalog · previews only"})}function Ah(e){const t=Ns.length,s=(Math.trunc(Number(e)||0)%t+t)%t,i=Ns[s];return{index:s,total:t,title:i.name,description:i.description,players:i.players,image:Mi(i)}}function Ch(e){const t=e.querySelector(".pikk-arcade-grid"),s=e.querySelector("#pikkArcadeLightbox");if(!t||!s||typeof s.showModal!="function")return;let i=0,a=null;const r=s.querySelector("[data-arcade-full-image]"),o=s.querySelector("[data-arcade-title]"),n=s.querySelector("[data-arcade-description]"),d=s.querySelector("[data-arcade-players]"),c=s.querySelector("[data-arcade-counter]"),p=m=>{const g=Ah(m);i=g.index,r.src=g.image,r.alt=g.title+" concept artwork",o.textContent=g.title,n.textContent=g.description,d.textContent=g.players+(g.players==="1"?" Player · Preview only":" Players · Preview only"),c.textContent=String(i+1).padStart(2,"0")+" / "+g.total};t.addEventListener("click",m=>{const g=m.target.closest("[data-game-preview]");g&&(a=g,p(g.dataset.gamePreview),s.showModal())}),s.addEventListener("click",m=>{m.target===s||m.target.closest("[data-arcade-close]")?s.close():m.target.closest("[data-arcade-prev]")?p(i-1):m.target.closest("[data-arcade-next]")&&p(i+1)}),s.addEventListener("keydown",m=>{(m.key==="ArrowLeft"||m.key==="ArrowRight")&&(m.preventDefault(),p(i+(m.key==="ArrowRight"?1:-1)))}),s.addEventListener("close",()=>{a!=null&&a.isConnected&&a.focus()})}function Th(){return M("PIKK Dating & Connections",`
    <section class="pikk-dating-hero" id="dating-discover" tabindex="-1" aria-label="PIKK Dating">
      <div class="pikk-dating-hero-copy">
        <span class="chip">18+ · Rooms live (demo)</span>
        <p class="kicker">PIKK DATING · FIND YOUR CONNECTION</p>
        <h2>Find your vibe. <span>Make it mutual.</span></h2>
        <p>Dating rooms are open in demo mode. Real matchmaking, age verification and safety systems still required before launch.</p>
        <div class="pikk-dating-hero-actions">
          <a class="btn primary" href="#/rooms">Open Dating Rooms</a>
          <a class="btn ghost" href="#/community-rooms">Community Lounge</a>
        </div>
        <small>TEST MODE · Local rooms · No real matches yet</small>
      </div>
      <div class="pikk-dating-symbol" aria-hidden="true">♡</div>
    </section>

    <nav class="pikk-dating-tabs" aria-label="Dating sections">
      <button type="button" data-dating-jump="dating-discover" class="is-active" aria-pressed="true">Discover</button>
      <button type="button" data-dating-jump="dating-rooms" aria-pressed="false">Rooms</button>
      <button type="button" data-dating-jump="dating-live" aria-pressed="false">Live</button>
      <button type="button" data-dating-jump="dating-safety" aria-pressed="false">Safety</button>
    </nav>

    <section class="pikk-dating-experience-grid" id="dating-rooms" tabindex="-1">
      <a class="pikk-dating-experience" href="#/rooms/dating-lounge"><span aria-hidden="true">♡</span><strong>Dating Lounge</strong><small>Open conversation</small></a>
      <a class="pikk-dating-experience" href="#/rooms/dating-speed"><span aria-hidden="true">⚡</span><strong>Speed Dating</strong><small>Preview</small></a>
      <a class="pikk-dating-experience" href="#/rooms/dating-live"><span aria-hidden="true">●</span><strong>Dating Live Room</strong><small>Preview</small></a>
      <a class="pikk-dating-experience" href="#/rooms"><span aria-hidden="true">▣</span><strong>All Rooms</strong><small>Men's · Ladies · Dating</small></a>
    </section>

    <div class="card pikk-dating-panel" id="dating-live" tabindex="-1">
      <span class="pikk-dating-panel-tag">LIVE CONNECTIONS</span>
      <h3>Dating Live & Broadcast</h3>
      <p class="muted">Live dating energy and the broader Live system. Broadcast Studio is separate under Create / Go Live.</p>
      <a class="btn primary" href="#/live">Open Live</a>
      <a class="btn ghost" href="#/broadcast">Broadcast Studio</a>
    </div>

    <div class="card pikk-dating-panel" id="dating-safety" tabindex="-1">
      <span class="pikk-dating-panel-tag">YOUR SAFETY FIRST</span>
      <h3>Privacy & safety</h3>
      <p class="muted">Dating will require verified adult eligibility, explicit opt-in, mutual consent, blocking, reporting and account deletion before full launch. Rooms today are local demo only.</p>
    </div>
  `,{lead:"Dating · rooms · live connections"})}function Dh(e){const t=new Set(["dating-discover","dating-rooms","dating-live","dating-safety"]),s=[...e.querySelectorAll("[data-dating-jump]")];function i(r,o=!1){if(!t.has(r))return;const n=e.querySelector("#"+r);if(n&&(s.forEach(d=>{const c=d.dataset.datingJump===r;d.classList.toggle("is-active",c),d.setAttribute("aria-pressed",String(c))}),o)){const d=window.matchMedia("(prefers-reduced-motion: reduce)").matches;n.scrollIntoView({behavior:d?"auto":"smooth",block:"start"}),n.focus({preventScroll:!0})}}s.forEach(r=>r.addEventListener("click",()=>i(r.dataset.datingJump,!0)));const a=Oe().elementId;t.has(a)&&window.setTimeout(()=>{e.querySelector("#"+a)&&i(a,!0)},80)}const po=60,Mh=10,Lh=10,En=3;function Ih(){return{phase:"round",round:1,seconds:po,votes:[0,0],scores:[0,0],roundWinners:[],gifts:[0,0],rematchVotes:[0,0],winner:null,tieBreaker:!1}}function Ph(e,t){if(e.phase!=="vote"||![0,1].includes(t))return e;const s=[...e.votes];return s[t]+=1,{...e,votes:s}}function _h(e,t){if(e.phase!=="rematch")return e;const s=[...e.rematchVotes];return s[t?0:1]+=1,{...e,rematchVotes:s}}function qh(e){if(!["round","vote","rematch"].includes(e.phase))return e;if(e.seconds>1)return{...e,seconds:e.seconds-1};if(e.phase==="round")return{...e,phase:"vote",seconds:Mh,votes:[0,0],voted:!1};if(e.phase==="vote"){const t=e.votes[0]===e.votes[1]?null:e.votes[0]>e.votes[1]?0:1,s=[...e.scores];t!==null&&(s[t]+=1);const i=[...e.roundWinners,t];return e.round>=En&&s[0]!==s[1]?{...e,scores:s,roundWinners:i,winner:s[0]>s[1]?0:1,phase:"rematch",seconds:Lh,rematchVoted:!1}:{...e,scores:s,roundWinners:i,phase:"round",round:e.round+1,seconds:po,votes:[0,0],voted:!1,tieBreaker:e.round>=En}}return{...e,phase:"finished",seconds:0}}let F=null,$e=null;function Ms(){const e=document.getElementById("roast-demo");if(!e||!F){$e&&clearInterval($e),$e=null;return}const t=F.phase,s=t==="round"?`Round ${F.round}${F.tieBreaker?" · Final tiebreaker":""}`:t==="vote"?"Vote for the round winner":t==="rematch"?"Run It Back?":"Match finished";e.innerHTML=`<h3>${s}</h3><p><strong>${String(Math.floor(F.seconds/60)).padStart(2,"0")}:${String(F.seconds%60).padStart(2,"0")}</strong></p><p>Contestant A: ${F.scores[0]} rounds · Contestant B: ${F.scores[1]} rounds</p>${t==="vote"?'<button type="button" data-roast-vote="0">Vote A</button> <button type="button" data-roast-vote="1">Vote B</button>':""}${t==="rematch"?`<p>Winner: Contestant ${F.winner===0?"A":"B"}</p><button type="button" data-roast-rematch="yes">Run It Back? Yes</button> <button type="button" data-roast-rematch="no">No</button>`:""}<p class="muted">Local interactive simulation only. Votes are not shared between viewers. No live video or gifts are connected.</p>`}function Oh(){$e&&clearInterval($e),$e=null,F=null;const e=document.getElementById("roast-start");e&&(e.addEventListener("click",()=>{F=Ih(),Ms(),$e&&clearInterval($e),$e=setInterval(()=>{F=qh(F),Ms(),F.phase==="finished"&&(clearInterval($e),$e=null)},1e3)}),document.getElementById("roast-demo").addEventListener("click",t=>{const s=t.target.closest("[data-roast-vote]"),i=t.target.closest("[data-roast-rematch]");s&&F&&F.phase==="vote"&&!F.voted&&(F={...Ph(F,Number(s.dataset.roastVote)),voted:!0},Ms()),i&&F&&F.phase==="rematch"&&!F.rematchVoted&&(F={..._h(F,i.dataset.roastRematch==="yes"),rematchVoted:!0},Ms())}))}function Nh(){return M("PIKK Roast Arena",`
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
  `,{lead:"Live comedy competitions · audience votes and gifts tracked separately"})}const Ci=Object.freeze([{tier:"spotlight",name:"Premium Spotlight",slots:1,day:199,week:999},{tier:"featured",name:"Featured Box",slots:2,day:99,week:499},{tier:"promo",name:"Promo Box",slots:3,day:49,week:249}]);function Ti(e,t){return`<article class="pikk-ad-slot pikk-ad-${e.tier}" data-promo-tier="${e.tier}" aria-label="${e.name} slot ${t}, pricing preview">
    <span class="pikk-ad-slot-top"><span class="pikk-ad-slot-icon" aria-hidden="true">▶</span><span class="pikk-ad-slot-number">0${t}</span></span>
    <strong>${e.name}</strong>
    <span class="pikk-ad-slot-description">Available placement · booking coming soon</span>
    <span class="pikk-ad-slot-prices"><b>$${e.day}</b><small>/ 24 hours</small></span>
    <span class="pikk-ad-slot-week">$${e.week} / 7 days</span>
  </article>`}function Bh(e){return`<div class="pikk-stories-promotions" data-featured-context="videos">
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
        <div class="pikk-featured-row pikk-featured-row-hero">${Ti(Ci[0],1)}</div>
        <div class="pikk-featured-row pikk-featured-row-two">${[1,2].map(s=>Ti(Ci[1],s)).join("")}</div>
        <div class="pikk-featured-row pikk-featured-row-three">${[1,2,3].map(s=>Ti(Ci[2],s)).join("")}</div>
      </div>
      <p class="pikk-featured-footnote">Home and Videos placements are priced separately. Rates are introductory proposals; no paid placement or guaranteed views are currently offered.</p>
    </section>
  </div>`}const es={instagram:"Instagram",tiktok:"TikTok",facebook:"Facebook",youtube:"YouTube",x:"X",snapchat:"Snapchat",other:"Other"};function Rh(e){return((e==null?void 0:e.path)||"")==="/refer"?"refer":"share"}function Y(e){q(e==="refer"?"#/refer":"#/share")}function Me(){const{user:e}=D();if(e)return e;const t=Tt("DemoCreator");return h("Signed in as DemoCreator · local demo"),t||D().user}function jh(e){const t=Number(e)-Date.now();if(t<=0)return"24h window ended (demo)";const s=Math.floor(t/36e5),i=Math.floor(t%36e5/6e4);return`${s}h ${i}m left`}function Fh(e){return`<div class="admin-type-tabs rewards-tabs" style="grid-template-columns:repeat(2,minmax(0,1fr));margin-bottom:14px" role="tablist">
    <a class="admin-type-tab ${e==="share"?"on":""}" href="#/share" role="tab" aria-selected="${e==="share"}">Share &amp; Earn</a>
    <a class="admin-type-tab ${e==="refer"?"on":""}" href="#/refer" role="tab" aria-selected="${e==="refer"}">Refer &amp; Earn</a>
  </div>`}function Kh(){const{user:e}=D(),t=U(),s=t.platformsLinked||[],i=t.challenge,a=t.submissions||[],r=t.rewardsClaimed||[],o=Er(),n=Ar(),d=bc(),c=s.length>0?`<ul class="list-plain">${s.map(v=>`<li>
          <span><strong>${l(es[v.platform]||v.platform)}</strong>
            ${v.handle?`<br/><span class="muted" style="font-size:12px">@${l(String(v.handle).replace(/^@+/,""))}</span>`:""}
            ${v.url?`<br/><span class="muted" style="font-size:11px">${l(v.url)}</span>`:""}
          </span>
          <button class="btn ghost" type="button" data-unlink="${l(v.id)}">Remove</button>
        </li>`).join("")}</ul>`:'<p class="muted" style="margin:0;font-size:13px">No platforms linked yet — optional. Never asked for social passwords.</p>',p=Ua().filter(v=>!s.some(w=>w.platform===v)).map(v=>`<option value="${v}">${l(es[v]||v)}</option>`).join("");let m="";if(!i)m=`<div class="card">
      <h3>24-hour social challenge</h3>
      <p class="muted" style="margin:0 0 10px;font-size:13px">Optional promo · separate from paid Clippers. Post official DBS ad + tracked link · keep live 24h · manual/demo verification (not guaranteed auto-check).</p>
      <button class="btn primary" id="shStart" >Start challenge · TEST MODE</button>
    </div>`;else{const v=i.status==="active",w=Date.now()>=Number(i.endsAt);m=`<div class="card">
      <div class="row wrap" style="gap:8px;margin-bottom:8px">
        <span class="chip">${v?w?"Window ended · demo":"Active":"Ended"}</span>
        <span class="chip">TEST MODE</span>
        <span class="chip">${l(jh(i.endsAt))}</span>
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
    </div>`}const g=Ua().map(v=>`<option value="${v}">${l(es[v]||v)}</option>`).join(""),f=a.length>0?`<ul class="list-plain">${a.map(v=>`<li style="align-items:flex-start">
          <span style="flex:1;min-width:0">
            <strong>${l(es[v.platform]||v.platform)}</strong>
            <span class="chip">${l(v.status)}</span>
            <br/><a href="${l(v.postUrl)}" target="_blank" rel="noopener" style="font-size:13px;word-break:break-all">${l(v.postUrl)}</a>
            <br/><span class="muted" style="font-size:11px">${N(v.submittedAt)} · ${l(v.note||"")}</span>
          </span>
          ${v.status==="pending"?`<span class="row wrap" style="gap:4px">
                  <button class="btn" type="button" data-verify="${l(v.id)}">Verify · demo</button>
                  <button class="btn ghost" type="button" data-reject="${l(v.id)}">Reject</button>
                </span>`:""}
        </li>`).join("")}</ul>`:'<p class="muted" style="margin:0;font-size:13px">No post URLs submitted yet.</p>',b=d.map(v=>{const w=r.some(A=>A.tierId===v.id),$=n.some(A=>A.id===v.id);return`<tr style="border-top:1px solid rgba(255,255,255,.06)">
        <td style="padding:8px 4px"><strong>${l(v.label)}</strong><br/><span class="muted" style="font-size:11px">≥${v.minVerified} verified platform${v.minVerified===1?"":"s"}${v.requireAllLinked?" · all linked (≥3)":""}</span></td>
        <td style="padding:8px 4px">${w?'<span class="chip">Claimed</span>':$?`<button class="btn primary" type="button" data-claim-share="${l(v.id)}">Claim</button>`:`<span class="muted" style="font-size:12px">Locked (${o}/${v.minVerified})</span>`}</td>
      </tr>`}).join(""),y=r.length>0?`<ul class="list-plain">${r.map(v=>`<li>
          <span>${l(v.label)}<br/><span class="muted" style="font-size:11px">${N(v.at)} · TEST MODE</span></span>
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
      ${y}
    </div>
  `}function Gh(){const{user:e}=D(),t=Lt(),s=Cr(),i=t.invitees||[],a=Tr(),r=Dr(),o=Cc(),n=t.milestonesClaimed||[],d=mt(),c=o.find(b=>a<b.n),p=c?`${a} / ${c.n} verified active → ${c.label}`:a>=100?"All milestones unlocked":`${a} verified active`,m=i.length>0?`<ul class="list-plain">${i.map(b=>{const y=(b.activeDays||[]).length;return`<li style="align-items:flex-start">
            <span style="flex:1;min-width:0">
              <strong>${l(b.username)}</strong>
              <span class="chip">${l(b.status)}</span>
              ${b.flaggedFraud?'<span class="chip">Fraud flag</span>':""}
              ${b.welcomeClaimed?'<span class="chip">Welcome claimed</span>':""}
              <br/><span class="muted" style="font-size:12px">Active days: ${y}/3 · ${l((b.activeDays||[]).join(", ")||"none")} · signed ${N(b.signedUpAt)}</span>
            </span>
            <span class="row wrap" style="gap:4px;justify-content:flex-end">
              ${!b.welcomeClaimed&&!b.flaggedFraud?`<button class="btn ghost" type="button" data-welcome="${l(b.id)}">Welcome perk</button>`:""}
              ${!b.flaggedFraud&&b.status!=="active"?`<button class="btn" type="button" data-activeday="${l(b.id)}">Mark active day</button>`:""}
              ${b.flaggedFraud?`<button class="btn ghost" type="button" data-unfraud="${l(b.id)}">Clear fraud</button>`:`<button class="btn ghost" type="button" data-fraud="${l(b.id)}">Flag fraud</button>`}
            </span>
          </li>`}).join("")}</ul>`:'<p class="muted" style="margin:0;font-size:13px">No invitees yet — simulate a signup or load demo referrals.</p>',g=o.map(b=>{const y=n.some(w=>w.milestoneId===b.id),v=r.some(w=>w.id===b.id);return`<tr style="border-top:1px solid rgba(255,255,255,.06)">
        <td style="padding:8px 4px"><strong>${b.n}</strong> verified active</td>
        <td style="padding:8px 4px">${l(b.label)}</td>
        <td style="padding:8px 4px">${y?'<span class="chip">Claimed</span>':v?`<button class="btn primary" type="button" data-claim-ref="${l(b.id)}">Claim</button>`:`<span class="muted" style="font-size:12px">${a}/${b.n}</span>`}</td>
      </tr>`}).join(""),f=n.length>0?`<ul class="list-plain">${n.map(b=>`<li>
          <span>${l(b.label)}<br/><span class="muted" style="font-size:11px">${N(b.at)} · not Clippers pay</span></span>
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
  `}function Uh(e){return uo(e||{path:"/share"})}function Vh(e){return uo(e||{path:"/refer"})}function uo(e){const t=Rh(e),s=`
    ${Fh(t)}
    ${t==="refer"?Gh():Kh()}
  `;return M("DBS Rewards",s,{lead:t==="refer"?"Refer & Earn · verified active friends · TEST MODE (§33).":"Share & Earn · 24h social promo · TEST MODE (§32)."})}function zh(e){mo(e,"share")}function Hh(e){mo(e,"refer")}function mo(e,t){var i,a,r,o,n,d,c,p,m,g,f,b,y;const s=t||(location.hash.includes("/refer")?"refer":"share");(i=e.querySelector("#rwSignIn"))==null||i.addEventListener("click",()=>{Me(),Y(s)}),(a=e.querySelector("#shLinkForm"))==null||a.addEventListener("submit",v=>{var L,C,O;v.preventDefault(),Me();const w=(L=e.querySelector("#shPlat"))==null?void 0:L.value,$=((C=e.querySelector("#shHandle"))==null?void 0:C.value)||"",A=((O=e.querySelector("#shUrl"))==null?void 0:O.value)||"",k=yc({platform:w,handle:$,url:A});if(k.error==="signin")return h("Sign in required");if(k.error==="already_linked")return h("Already linked");if(k.error==="required")return h("Handle or URL required");if(k.error)return h("Could not link");h(`Linked ${es[w]||w}`),Y("share")}),e.querySelectorAll("[data-unlink]").forEach(v=>{v.addEventListener("click",()=>{kc(v.getAttribute("data-unlink")),h("Platform removed"),Y("share")})}),(r=e.querySelector("#shStart"))==null||r.addEventListener("click",()=>{Me();const v=wc();if(v.error==="signin")return h("Sign in required");if(v.error==="already_active")return h("Challenge already active");if(v.error)return h("Could not start");h("Challenge started · 24h window"),Y("share")}),(o=e.querySelector("#shCopyLink"))==null||o.addEventListener("click",async()=>{var w;const v=((w=e.querySelector("#shTracked"))==null?void 0:w.value)||"";try{await navigator.clipboard.writeText(v),h("Tracked link copied")}catch{h("Copy manually")}}),(n=e.querySelector("#shCopyCaption"))==null||n.addEventListener("click",async()=>{var $;const w=(($=U().challenge)==null?void 0:$.caption)||"";try{await navigator.clipboard.writeText(w),h("Caption copied")}catch{h("Copy manually")}}),(d=e.querySelector("#shSim24"))==null||d.addEventListener("click",()=>{if(Sc().error)return h("No active challenge");h("Simulated 24h elapsed"),Y("share")}),(c=e.querySelector("#shEnd"))==null||c.addEventListener("click",()=>{$c(),h("Challenge ended"),Y("share")}),(p=e.querySelector("#shSubmitForm"))==null||p.addEventListener("submit",v=>{var k,L;v.preventDefault(),Me();const w=(k=e.querySelector("#shSubPlat"))==null?void 0:k.value,$=((L=e.querySelector("#shSubUrl"))==null?void 0:L.value)||"",A=xc({platform:w,postUrl:$});if(A.error==="required")return h("Post URL required");if(A.error==="duplicate")return h("Already submitted for this platform");if(A.error==="no_challenge")return h("Start a challenge first");if(A.error)return h("Submit failed");h("Submitted · pending demo verification"),Y("share")}),e.querySelectorAll("[data-verify]").forEach(v=>{v.addEventListener("click",()=>{Va(v.getAttribute("data-verify"),"verified"),h("Verified · demo (manual)"),Y("share")})}),e.querySelectorAll("[data-reject]").forEach(v=>{v.addEventListener("click",()=>{Va(v.getAttribute("data-reject"),"rejected"),h("Rejected"),Y("share")})}),e.querySelectorAll("[data-claim-share]").forEach(v=>{v.addEventListener("click",()=>{Me();const w=Ec(v.getAttribute("data-claim-share"));if(w.error==="not_claimable")return h("Not claimable yet");if(w.error)return h("Claim failed");h(`Claimed · ${w.claim.label}`),Y("share")})}),(m=e.querySelector("#shReset"))==null||m.addEventListener("click",()=>{Ac(),h("Share demo reset"),Y("share")}),(g=e.querySelector("#refCopy"))==null||g.addEventListener("click",async()=>{var w;Me(),Lt();const v=((w=e.querySelector("#refLink"))==null?void 0:w.value)||Cr();try{await navigator.clipboard.writeText(v),h("Referral link copied")}catch{h("Copy manually")}}),(f=e.querySelector("#refInviteForm"))==null||f.addEventListener("submit",v=>{var A;v.preventDefault(),Me();const w=((A=e.querySelector("#refInviteName"))==null?void 0:A.value)||"",$=Tc({username:w});if($.error==="self_referral")return h("Self-referral blocked");if($.error==="signin")return h("Sign in required");if($.error)return h("Could not add invitee");h(`Invitee ${$.invitee.username} signed up`),Y("refer")}),e.querySelectorAll("[data-welcome]").forEach(v=>{v.addEventListener("click",()=>{const w=Dc(v.getAttribute("data-welcome"));if(w.error==="fraud")return h("Flagged fraud");if(w.error)return h("Welcome claim failed");h(w.perk||"Welcome perk claimed"),Y("refer")})}),e.querySelectorAll("[data-activeday]").forEach(v=>{v.addEventListener("click",()=>{const w=Mc(v.getAttribute("data-activeday"));if(w.error==="fraud")return h("Flagged fraud");if(w.error==="outside_window")return h("Outside first-7-day window");if(w.error==="window_full")return h("All 7 demo days already marked");if(w.error)return h("Could not mark day");const $=(w.invitee.activeDays||[]).length;h($>=3?`${w.invitee.username} → verified active (${$} days)`:`Active day ${$}/3 for ${w.invitee.username}`),Y("refer")})}),e.querySelectorAll("[data-fraud]").forEach(v=>{v.addEventListener("click",()=>{za(v.getAttribute("data-fraud"),!0),h("Flagged as fraud · demo"),Y("refer")})}),e.querySelectorAll("[data-unfraud]").forEach(v=>{v.addEventListener("click",()=>{za(v.getAttribute("data-unfraud"),!1),h("Fraud flag cleared"),Y("refer")})}),e.querySelectorAll("[data-claim-ref]").forEach(v=>{v.addEventListener("click",()=>{Me();const w=Lc(v.getAttribute("data-claim-ref"));if(w.error==="not_claimable")return h("Not claimable yet");if(w.error)return h("Claim failed");h(`Milestone claimed · ${w.claim.label}`),Y("refer")})}),(b=e.querySelector("#refSeed"))==null||b.addEventListener("click",()=>{Me();const v=Pc({force:!0});if(v.error==="signin")return h("Sign in required");h(`Loaded ${v.seeded||0} demo invitees`),Y("refer")}),(y=e.querySelector("#refReset"))==null||y.addEventListener("click",()=>{Me(),Ic(),h("Refer demo reset"),Y("refer")})}function Wh(e){return{badge:`Phase ${e} shell`}}function An(e){return`
    <article class="card pikk-video-tile">
      <div class="hero-video" style="margin:0 0 10px">
        <iframe src="${l(ut(e.embed))}" title="${l(e.title)}" allowfullscreen loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </div>
      <span class="chip">${l(e.category||"Music Videos")}</span>
      <h3 style="margin:8px 0 4px">${l(e.title)}</h3>
      <p class="muted" style="margin:0 0 8px">${l(e.artist||"DatBoiSkeet")}</p>
      <div class="row wrap">
        <a class="btn" href="${l(e.youtube)}" target="_blank" rel="noopener">Open on YouTube</a>
        <button class="btn ghost video-share" data-url="${l(e.youtube)}" data-title="${l(e.title)}">Share link</button>
      </div>
    </article>`}function Yh(){var d;const e=["Music Videos","Mixes","Interviews"],t={};ge.forEach(c=>{const p=c.category||"Music Videos";(t[p]||(t[p]=[])).push(c)});const s=e.filter(c=>{var p;return(p=t[c])==null?void 0:p.length}).map(c=>{const p=t[c].map(An).join("");return`<section class="pikk-video-section" data-video-category="${l(c)}"><h3>${l(c)}</h3><div class="pikk-video-grid">${p}</div></section>`}).join(""),i=Object.keys(t).filter(c=>!e.includes(c)).map(c=>`<section class="pikk-video-section" data-video-category="${l(c)}"><h3>${l(c)}</h3><div class="pikk-video-grid">${t[c].map(An).join("")}</div></section>`).join(""),a=Zs({publishedOnly:!0,types:["video"]}),r=a.map(c=>{const p=c.youtube||"",m=c.embed||"";if(m||p){const g=m||"";return`<article class="card catalog-admin-video" data-id="${l(c.id)}">
          ${g?`<div class="hero-video" style="margin:0 0 10px"><iframe src="${l(ut(g))}" title="${l(c.title)}" allowfullscreen loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>`:""}
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
      </article>`}).join(""),o={};bo.forEach(c=>{var p;(o[p=c.category]||(o[p]=[])).push(c)});const n=Object.entries(o).map(([c,p])=>`
      <div class="card pikk-video-coming-card" data-video-coming-category="${l(c)}">
        <h3>${l(c)}</h3>
        <p class="muted" style="margin:0 0 8px">No verified URLs in repo yet — titles from plan §9 only. No invented view counts.</p>
        <ul class="list-plain">${p.map(m=>`<li><span>${l(m.title)}</span><span class="chip">Coming Soon</span></li>`).join("")}</ul>
      </div>`).join("");return M("Videos & Interviews",`${Bh()}
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
    ${r?`<section class="pikk-video-section" data-video-category="Admin"><h3>From Admin</h3><div class="pikk-video-grid">${r}</div></section>`:""}
    <section class="pikk-video-section pikk-video-coming-list" aria-label="Upcoming videos">
      <h3>Upcoming on PIKK</h3>
      ${n}
    </section>`,{lead:"Official MVs · Mixes · Interviews · admin uploads."})}function Jh(e){var o;const t=[...e.querySelectorAll("[data-videos-filter]")],s=[...e.querySelectorAll(".pikk-video-section[data-video-category]")],i=[...e.querySelectorAll("[data-video-coming-category]")],a=e.querySelector(".pikk-video-coming-list"),r=e.querySelector("[data-video-filter-status]");t.forEach(n=>n.addEventListener("click",()=>{const d=n.dataset.videosFilter||"All";t.forEach(p=>{const m=p===n;p.classList.toggle("on",m),p.setAttribute("aria-pressed",m?"true":"false")}),s.forEach(p=>{const m=d==="All"||p.dataset.videoCategory===d;p.hidden=!m}),i.forEach(p=>{p.hidden=d!=="All"&&p.dataset.videoComingCategory!==d});const c=i.some(p=>!p.hidden);if(a&&(a.hidden=!c),r){const p=s.some(m=>!m.hidden);r.textContent=d==="All"?"Showing all video categories and upcoming titles.":p?`Showing ${d}${c?" and upcoming titles":""}.`:c?`No published ${d} videos yet. Upcoming titles are listed below.`:`No published ${d} videos yet.`}})),(o=e.querySelector(".pikk-video-filters"))==null||o.addEventListener("keydown",n=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(n.key))return;const d=t.indexOf(n.target);if(d<0||!t.length)return;n.preventDefault();const c=n.key==="Home"?0:n.key==="End"?t.length-1:(d+(n.key==="ArrowRight"?1:-1)+t.length)%t.length;t[c].focus(),t[c].click()}),ya(e),e.querySelectorAll("video.catalog-video").forEach(n=>{n.addEventListener("play",()=>Vs()),n.addEventListener("pause",()=>ms()),n.addEventListener("ended",()=>ms())}),e.querySelectorAll(".video-share").forEach(n=>{n.addEventListener("click",async()=>{const d=n.dataset.url||"";try{await navigator.clipboard.writeText(d),h("Link copied")}catch{h(d||"Copy failed")}})}),e.querySelectorAll("[data-idb-src]").forEach(async n=>{const d=(n.getAttribute("data-idb-src")||"").trim();if(d)try{const c=await ka(d);if(!c){n.tagName==="VIDEO"&&n.insertAdjacentHTML("afterend",'<p class="muted" style="font-size:12px">Media blob missing — re-upload from Admin.</p>');return}if((n.tagName==="IMG"||n.tagName==="VIDEO"||n.tagName==="AUDIO")&&(n.setAttribute("src",c),n.src=c,n.tagName==="VIDEO"||n.tagName==="AUDIO")){n.setAttribute("playsinline",""),n.setAttribute("webkit-playsinline",""),n.controls=!0;try{n.load()}catch{}}}catch(c){console.warn("idb media hydrate failed",d,c)}})}function Qh(){const e=qn.map(i=>`<li><span>${l(i.name)}</span><strong>$${i.price}/mo</strong></li>`).join(""),t=D().creatorSellApps||[],s=t.length?`<ul class="list-plain" style="margin-top:10px">${t.slice(0,8).map(i=>`<li><span>${l(i.name)} · ${l(i.contact)} · ${l(i.sells)}</span><span class="chip">${l(i.status||"pending")}</span></li>`).join("")}</ul>`:'<p class="muted" style="margin:8px 0 0;font-size:12px">No applications on this device yet.</p>';return M("Pricing",`<div class="card">
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
     </div>`,{lead:"Sell music, videos, beats &amp; merch · rules &amp; fees · apply form · memberships &amp; gifts — admin-adjustable."})}function Xh(e){var s;typeof location<"u"&&(location.hash.includes("focus=sell")||location.hash.includes("creator-sell"))&&setTimeout(()=>{var i;return(i=document.getElementById("creator-sell"))==null?void 0:i.scrollIntoView({behavior:"smooth",block:"start"})},60),(s=e.querySelector("#csSubmit"))==null||s.addEventListener("click",()=>{var d,c,p,m,g,f;const i=(c=(d=e.querySelector("#csName"))==null?void 0:d.value)==null?void 0:c.trim(),a=(m=(p=e.querySelector("#csContact"))==null?void 0:p.value)==null?void 0:m.trim(),r=((g=e.querySelector("#csSells"))==null?void 0:g.value)||"both",o=!!((f=e.querySelector("#csAgree"))!=null&&f.checked);if(!i||!a)return h("Name and email/handle required");if(!o)return h("Agree to rules & fees to continue");const n=Lo({name:i,contact:a,sells:r,agreed:o});if(n!=null&&n.error)return h(n.error==="rules"?"Agree to rules & fees to continue":"Name and email/handle required");h("Application saved · TEST MODE"),q("#/pricing?focus=sell")})}function Zh(){return M("Community Guidelines",`<div class="card">
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
    </div>`,{lead:"Rules for posts, chat, Live & Lounge — plan §13."})}const Di=[{id:"dbs-lounge",cat:"NETWORK",hash:"#dbs-lounge",name:"PIKK Lounge",blurb:"Main hub · official announcements & network news",chip:"Hub"},{id:"conversation",cat:"NETWORK",hash:"#the-conversation",name:"The Conversation",blurb:"Public music & fan discussion threads",chip:"Public"},{id:"listening",cat:"VOICE / LISTENING",hash:"#listening-rooms",name:"Listening Rooms",blurb:"Listening parties & reactions to new releases",chip:"Parties"},{id:"backstage",cat:"MEMBERS",hash:"#backstage-rooms",name:"Backstage Rooms",blurb:"Tier-restricted spaces for Skeet+ / Backstage / Inner Circle",chip:"Members"},{id:"live-rooms",cat:"NETWORK",hash:"#live-rooms",name:"Live Rooms",blurb:"Scheduled community events & discussions",chip:"Events"},{id:"spotlight",cat:"NETWORK",hash:"#the-spotlight",name:"The Spotlight",blurb:"Featured fan conversations & creator posts",chip:"Featured"}],Cn={"dbs-lounge":[{who:"PIKK · System",text:"Welcome to PIKK Lounge — DatBoiSkeet’s channel-style community hub.",tag:"DEMO"},{who:"TEST MODE",text:"Live chat isn’t connected yet. These rows are placeholders so the room pane feels real.",tag:"DEMO"}],conversation:[{who:"DEMO",text:"Drop takes on new releases here once Phase 2 chat ships.",tag:"DEMO"}],listening:[{who:"DEMO",text:"Listening parties will sync reactions here — preview only.",tag:"DEMO"}],backstage:[{who:"DEMO",text:"Member-tier rooms unlock with Skeet+ / Backstage / Inner Circle.",tag:"DEMO"}],"live-rooms":[{who:"DEMO",text:"Scheduled community events will list here — no live presence yet.",tag:"DEMO"}],spotlight:[{who:"DEMO",text:"Featured fan conversations land here in Phase 2.",tag:"DEMO"}]},eg=[{name:"DatBoiSkeet",role:"Owner"},{name:"SkeetMod",role:"Mod · DEMO"},{name:"FanDemo01",role:"DEMO"},{name:"ListenerX",role:"DEMO"}];function tg(e){const s=(Cn[e.id]||Cn["dbs-lounge"]).map(i=>`<div class="lounge-msg">
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
  </div>`}function sg(){const e=[],t=new Set;Di.forEach(r=>{t.has(r.cat)||(t.add(r.cat),e.push(r.cat))});const s=e.map(r=>{const o=Di.filter(n=>n.cat===r).map(n=>`<button type="button" class="lounge-channel${n.id==="dbs-lounge"?" on":""}" data-channel="${l(n.id)}" aria-pressed="${n.id==="dbs-lounge"?"true":"false"}">
            <span class="lounge-hash">#</span>
            <span class="lounge-channel-label">${l(n.name)}</span>
            <span class="chip lounge-channel-chip">${l(n.chip)}</span>
          </button>`).join("");return`<div class="lounge-cat-block">
        <p class="lounge-cat-label">${l(r)}</p>
        ${o}
      </div>`}).join(""),i=Di.map(tg).join(""),a=eg.map(r=>`<li><span class="lounge-member-dot" aria-hidden="true"></span><span><strong>${l(r.name)}</strong><br/><span class="muted" style="font-size:11px">${l(r.role)}</span></span></li>`).join("");return M("PIKK Lounge",`<div class="card lounge-intro">
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
    </div>`,{lead:"Discord-inspired channels · DatBoiSkeet branded.",...Wh(2)})}function ig(e=document){const t=e.querySelector("#loungeDiscord")||e,s=[...t.querySelectorAll(".lounge-channel")],i=[...t.querySelectorAll(".lounge-pane")];s.length&&s.forEach(a=>{a.addEventListener("click",()=>{const r=a.dataset.channel;s.forEach(o=>{const n=o===a;o.classList.toggle("on",n),o.setAttribute("aria-pressed",n?"true":"false")}),i.forEach(o=>{o.dataset.pane===r?o.removeAttribute("hidden"):o.setAttribute("hidden","")})})})}function ag(){return M("Signup & Creator Apps",`<div class="card">
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
    </div>`,{lead:"Free fan signup + creator role applications · §16."})}function ng(){const t=[{label:"Registration & role approval",status:"Demo",note:"Profile/signup local demo · real auth later"},{label:"Moderation / reporting / appeals",status:"TODO",note:"Guidelines copy ready · enforcement UI Phase 2"},{label:"Payments & refunds",status:"TEST",note:"TEST MODE only · no real charges"},{label:"Creator payouts verification",status:"SHELL",note:"Wallet / KYC stubs · not launch-ready"},{label:"Music & video rights",status:"Partial",note:"3 official MVs · streaming links still SHELL"},{label:"Gift-battle fraud prevention",status:"SHELL",note:"Gift Battles not wired for launch"},{label:"Livestream safety",status:"Demo",note:"Go-live demo PASS · age/safety stack incomplete"},{label:"Background audio pause/resume",status:"PARTIAL",note:"§17 sticky top YT player + pauseDbsPlayer hooks"},{label:"Account recovery / optional 2FA",status:"TODO",note:"Local demo sign-in only"},{label:"Loyalty analytics consent",status:"SHELL",note:"Privacy/consent controls before launch"},{label:"PIKK Connect safety (age + WebRTC)",status:"Blocked",note:"Must not launch without assurance"}].map(s=>`<li><span><strong>${l(s.label)}</strong><br/><span class="muted" style="font-size:12px">${l(s.note)}</span></span><span class="chip">${l(s.status)}</span></li>`).join("");return M("Launch Readiness",`<div class="card">
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
    </div>`,{lead:"Pre-launch checklist with honest demo status · §31."})}function rg(){const e=[{n:1,title:"Foundation",summary:"Videos, Music/Vault, Posts, profiles, followers, engagement alerts, Clippers applications.",status:"DONE",items:[{label:"§1 Posts",status:"DONE",href:"#/posts"},{label:"§2 Clippers apply",status:"DONE",href:"#/clippers"},{label:"§7 Profiles",status:"DONE",href:"#/profile"},{label:"§8 Music & Vault",status:"DONE",href:"#/music"},{label:"§9 Videos & Interviews",status:"DONE",href:"#/videos"},{label:"§14 Streaming links",status:"DONE",href:"#/music"},{label:"§19 Loading splash",status:"DONE",href:"#/home"},{label:"§20 Home dashboard",status:"DONE",href:"#/home"},{label:"§21 Merch showcase",status:"DONE",href:"#/merch"},{label:"§34 Coming Soon covers",status:"DONE",href:"#/music"},{label:"§17 Home MV + continuous play",status:"PARTIAL",href:"#/home",note:"Sticky top YT player · Stream Everywhere open links · PENDING AUDIT"}]},{n:2,title:"Growth & Creator Economy",summary:"Clipper campaigns, missions, referrals, creator earnings, and payouts.",status:"DONE",items:[{label:"§5 Creator Earnings",status:"DONE",href:"#/earnings"},{label:"§6 Missions",status:"DONE",href:"#/missions"},{label:"§27 Wallet & Payouts",status:"DONE",href:"#/wallet"},{label:"§32 Share & Earn",status:"DONE",href:"#/share"},{label:"§33 Refer & Earn",status:"DONE",href:"#/refer"},{label:"§10 Pricing",status:"DONE",href:"#/pricing"},{label:"§11 Admin dashboard",status:"DONE",href:"#/admin"},{label:"§16 Signup / Creator apps",status:"DONE",href:"#/signup"},{label:"§24 Explore",status:"DONE",href:"#/explore"},{label:"§25 Notifications",status:"DONE",href:"#/notifications"},{label:"§26 Fan Clubs",status:"DONE",href:"#/fanclubs"},{label:"§28 Loyalty Club",status:"DONE",href:"#/loyalty"},{label:"§22 Profile Shop cosmetics",status:"DONE",href:"#/shop",note:"Checker PASS · cosmetics demo"}]},{n:3,title:"Live & Marketplace",summary:"Creator livestreaming, gifts, donations, advertising, creator subscriptions, and Marketplace.",status:"DONE",items:[{label:"§3 Live",status:"DONE",href:"#/live"},{label:"§4 Marketplace ads",status:"DONE",href:"#/marketplace"},{label:"§18 Messages",status:"DONE",href:"#/messages"},{label:"§23 Gift Battles",status:"DONE",href:"#/giftbattles"},{label:"§29 Multi-Guest Live",status:"DONE",href:"#/multiguest"},{label:"§30 Open Mic",status:"DONE",href:"#/openmic"},{label:"§35 24/7 Spotlight",status:"DONE",href:"#/spotlight"},{label:"§36 Connect (opt-in shell)",status:"DONE",href:"#/connect"},{label:"§37 Restream + streamer tiers",status:"DONE",href:"#/restream"},{label:"§13 Guidelines",status:"DONE",href:"#/guidelines"},{label:"§15 Community / Lounge",status:"DONE",href:"#/community"},{label:"§31 Launch readiness",status:"DONE",href:"#/launch"}]}],t=i=>i==="DONE"?"chip chip-ok":i==="PARTIAL"?"chip chip-partial":i==="PENDING AUDIT"?"chip chip-audit":"chip",s=e.map(i=>{const a=i.items.map(r=>{const o=r.note?`<br/><span class="muted" style="font-size:12px">${l(r.note)}</span>`:"";return`<li><span>${r.href?`<a href="${l(r.href)}" style="color:inherit;text-decoration:none"><strong>${l(r.label)}</strong></a>`:`<strong>${l(r.label)}</strong>`}${o}</span><span class="${t(r.status)}">${l(r.status)}</span></li>`}).join("");return`<div class="card">
      <div class="row wrap" style="gap:8px;align-items:center;margin-bottom:8px">
        <span class="chip">Phase ${i.n}</span>
        <span class="${t(i.status)}">${l(i.status)}</span>
      </div>
      <h2 style="margin:0 0 6px">${l(i.title)}</h2>
      <p class="muted" style="margin:0 0 12px">${l(i.summary)}</p>
      <ul class="list-plain">${a}</ul>
    </div>`}).join(`

    `);return M("Development Phases",`<div class="card">
      <p class="kicker">Plan §12</p>
      <h2 style="margin:0 0 8px">Roadmap · what shipped vs remaining</h2>
      <p class="muted" style="margin:0">Phase 1–3 from the DatBoiSkeet developer plan. Chips mirror STATUS.md — <strong>DONE</strong> needs Checker PASS; <strong>PARTIAL</strong> and <strong>PENDING AUDIT</strong> are not launch-complete.</p>
      <p class="muted" style="margin:10px 0 0">Still open: <a href="#/home">§17 sticky player</a> (YT embed · no PIKK-hosted audio yet) · <a href="#/shop">§22 Profile Shop</a> (awaiting Checker) · identity/payout verification &amp; fraud controls before activating real money features.</p>
    </div>

    ${s}

    <div class="card">
      <h3>Before activating paid features</h3>
      <p class="muted" style="margin:0">Implement identity and payout verification, payment security, copyright controls, moderation, and fraud prevention before turning on real charges, gifts, or payouts. See <a href="#/launch">Launch Readiness</a>.</p>
    </div>`,{lead:"Phase 1 · Phase 2 · Phase 3 roadmap with live status chips · §12."})}function og(e){return M("Not found",`<div class="card"><p>No page for <code>${l(e)}</code>.</p><a class="btn" href="#/home">Home</a></div>`)}const lg={"/home":{render:Wd,bind:Yd},"/updates":{render:Xd,bind:Zd},"/posts":{render:Sp,bind:$p},"/music":{render:ln,bind:cn},"/ai-artists":{render:Lp,bind:Ip},"/shield":{render:Rp,bind:jp},"/vault":{render:ln,bind:cn},"/merch":{render:Fp,bind:Kp},"/profile":{render:Gp,bind:Up},"/clippers":{render:zp,bind:Hp},"/videos":{render:Yh,bind:Jh},"/live":{render:yu,bind:$u},"/viral-live":{render:Cu,bind:Tu},"/explore":{render:nm,bind:rm},"/marketplace":{render:Lu,bind:Iu},"/earnings":{render:Hu,bind:Wu},"/missions":{render:Xu,bind:Zu},"/pricing":{render:Qh,bind:Xh},"/admin":{render:yp,bind:kp},"/guidelines":{render:Zh},"/community":{render:sg,bind:ig},"/communities":{render:fh,bind:vh},"/signup":{render:ag},"/messages":{render:Ru,bind:ju},"/shop":{render:Zm,bind:eh},"/profile-shop":{render:zm,bind:Hm},"/giftbattles":{render:bm,bind:ym},"/notifications":{render:Fu,bind:Ku},"/fanclubs":{render:_m,bind:qm},"/wallet":{render:Uu,bind:Vu},"/loyalty":{render:Om,bind:Nm},"/multiguest":{render:Mm,bind:Lm},"/openmic":{render:Rm,bind:jm},"/launch":{render:ng},"/phases":{render:rg},"/share":{render:Uh,bind:zh},"/refer":{render:Vh,bind:Hh},"/spotlight":{render:ph,bind:uh},"/restream":{render:()=>(queueMicrotask(()=>{location.hash="/connect#connect-multistream"}),Vi()),bind:zi},"/shorts":{render:$n,bind:xn},"/clips":{render:$n,bind:xn},"/connect":{render:Vi,bind:zi},"/blockwars":{render:Sh,bind:xh},"/games":{render:Eh,bind:Ch},"/dating":{render:Th,bind:Dh},"/roast-arena":{render:Nh,bind:Oh}};function ho(){var t,s,i;const e=document.getElementById("tabbar");if(D().user)try{ea()}catch{}e.innerHTML=So.map(a=>{const o="/"+a.href.replace(/^#/,"").replace(/^\//,"").split(/[?#]/)[0],n=l(a.label);return`<a${a.primary?' class="tab-primary"':""} href="${a.href}" data-path="${o}" aria-label="${n}"${a.href==="#/create"?' aria-haspopup="dialog" aria-controls="pikkCreateMenu" aria-expanded="false"':a.href==="#/music"?' aria-haspopup="dialog" aria-controls="pikkMusicMenu" aria-expanded="false"':Bs[o.slice(1)]?` aria-haspopup="dialog" aria-controls="pikk${n}Menu" aria-expanded="false"`:""}><span class="tab-ico">${a.href==="#/create"?'<svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true"><path d="M9 5 L25 16 L9 27 Z" fill="currentColor"/><path d="M24 5v11m0 0-4-4m4 4 4-4" stroke="white" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>':ns[a.icon]||""}</span><span>${n}</span></a>`}).join("");for(const a of Object.keys(Bs))(t=e.querySelector(`a[href="#/${a}"]`))==null||t.addEventListener("click",r=>{r.preventDefault(),vo(a,r.currentTarget)});(s=e.querySelector('a[href="#/music"]'))==null||s.addEventListener("click",a=>{a.preventDefault(),nt(),Hd(a.currentTarget)}),(i=e.querySelector('a[href="#/create"]'))==null||i.addEventListener("click",a=>{var o;Zt(),nt(),a.preventDefault();const r=dg();r.hidden=!r.hidden,a.currentTarget.setAttribute("aria-expanded",String(!r.hidden)),r.hidden||(o=r.querySelector("[data-create-close]"))==null||o.focus()}),e.style.gridTemplateColumns="",e.classList.remove("tabbar-scroll"),e.classList.add("tabbar-reshaped","tabbar-fit7")}function cg(){return Pn.map(e=>{const t=e.items.map(s=>{const i=`<span class="pikk-menu-icon" aria-hidden="true">${ns[s.icon]||ns.explore}</span><strong class="pikk-menu-title">${l(s.title)}</strong><small>${l(s.detail)}</small>`;return s.href?`<a href="${l(s.href)}" class="pikk-create-tile">${i}</a>`:`<div class="pikk-create-tile pikk-create-tile-planned" aria-disabled="true">${i}</div>`}).join("");return`<section class="pikk-create-menu-group" aria-label="${l(e.title)}"><h3>${l(e.title)}</h3><div class="pikk-create-options pikk-create-grid">${t}</div></section>`}).join("")}function dg(){let e=document.getElementById("pikkCreateMenu");if(e)return e;e=document.createElement("div"),e.id="pikkCreateMenu",e.className="pikk-create-overlay",e.hidden=!0,e.innerHTML=`<div class="pikk-create-sheet" role="dialog" aria-modal="true" aria-label="Create on PIKK">
    <div class="pikk-create-head"><strong>Create on PIKK</strong><button type="button" class="btn ghost" data-create-close aria-label="Close create menu">✕</button></div>
    ${cg()}
    <button type="button" class="pikk-menu-cancel" data-create-close>Cancel</button>
    <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · uploads depend on available prototype tools</p>
  </div>`,document.body.appendChild(e);const t=(s=!1)=>{e.hidden=!0;const i=document.querySelector('#tabbar a[href="#/create"]');i==null||i.setAttribute("aria-expanded","false"),s&&(i==null||i.focus())};return window.addEventListener("hashchange",()=>t()),e.addEventListener("click",s=>{s.target===e||s.target.closest("[data-create-close]")?t(!0):s.target.closest(".pikk-create-options a")&&t()}),document.addEventListener("keydown",s=>{if(!e.hidden&&(s.key==="Escape"&&(s.preventDefault(),t(!0)),s.key==="Tab")){const i=[...e.querySelectorAll("a[href], button:not([disabled])")],a=i[0],r=i[i.length-1];if(!a){s.preventDefault();return}e.contains(document.activeElement)?s.shiftKey&&document.activeElement===a?(s.preventDefault(),r.focus()):!s.shiftKey&&document.activeElement===r&&(s.preventDefault(),a.focus()):(s.preventDefault(),(s.shiftKey?r:a).focus())}}),e}function pg(){const e=document.getElementById("sideNav"),t=Oe(),s="#"+(t.raw||t.path),i="#"+t.path,a=On.map(r=>{if(r.href)return`<a class="drawer-direct${r.href===i||r.href===s?" on":""}" href="${r.href}">${l(r.label)}</a>`;const o=r.links||[],n=o.some(m=>m.href===i||m.href===s),d=n?" open":"",c=n?" has-active":"",p=o.map(m=>`<a class="drawer-link${m.href===i||m.href===s?" on":""}" href="${m.href}">${l(m.label)}</a>`).join("");return`<div class="drawer-group${d}${c}" data-group="${l(r.id)}"><button type="button" class="drawer-cat" aria-expanded="${n?"true":"false"}"><span>${l(r.label)}</span><span class="drawer-caret" aria-hidden="true"></span></button><div class="drawer-children" role="group">${p}</div></div>`}).join("");e.innerHTML=`<h2>PIKK Network</h2>${a}<a class="drawer-direct" href="#/updates">What's New · App Updates</a>`}function Os(e,t=!1){Gd({drawer:document.getElementById("sideNav"),scrim:document.getElementById("scrim"),trigger:document.getElementById("menuBtn")},e,t)}function ug(e){const t=e.path;ho(),jd(document.getElementById("tabbar"),t),document.querySelectorAll("#sideNav a").forEach(r=>{const o=r.getAttribute("href")||"";r.classList.toggle("on",o==="#"+t||o==="#"+e.raw)});const s="#"+t,i="#"+e.raw;document.querySelectorAll("#sideNav .drawer-group").forEach(r=>{const o=[...r.querySelectorAll("a")].some(d=>d.getAttribute("href")===s||d.getAttribute("href")===i);r.classList.toggle("open",o),r.classList.toggle("has-active",o);const n=r.querySelector(".drawer-cat");n&&n.setAttribute("aria-expanded",o?"true":"false")});const a=document.getElementById("headerMsg");if(a&&(a.hidden=!1),D().user)try{ea()}catch{}mg()}function mg(){const e=document.getElementById("headerMsgBadge"),t=document.getElementById("headerMsg");if(!e||!t)return;let s=0;try{s=ze()}catch{s=0}if(s>0){const i=s>99?"99+":String(s);e.textContent=i,e.hidden=!1,t.setAttribute("aria-label",`Messages, ${s} unread`)}else e.textContent="",e.hidden=!0,t.setAttribute("aria-label","Messages")}function Tn(e){var a;Os(!1);const t=document.getElementById("app"),s=lg[e.path],i=s?s.render(e):og(e.path);t.innerHTML=i,Rd(t),(a=s==null?void 0:s.bind)==null||a.call(s,t),ug(e),Kd(e,t,document.getElementById("pikkRouteAnnouncer")),Id(e.path),window.scrollTo(0,0),(e.path==="/music"||e.path==="/vault")&&(location.hash.includes("vault")||e.path==="/vault")&&setTimeout(()=>{var r;return(r=document.getElementById("vault"))==null?void 0:r.scrollIntoView({behavior:"smooth"})},50),e.path==="/pricing"&&(location.hash.includes("focus=sell")||location.hash.includes("creator-sell"))&&setTimeout(()=>{var r;return(r=document.getElementById("creator-sell"))==null?void 0:r.scrollIntoView({behavior:"smooth",block:"start"})},50),e.path==="/wallet"&&(e.elementId==="wallet-coins"||e.query.section==="coins"||location.hash.includes("wallet-coins"))&&setTimeout(()=>{var r;return(r=document.getElementById("wallet-coins"))==null?void 0:r.scrollIntoView({behavior:"smooth",block:"start"})},50),e.path==="/live"&&(e.query.go==="1"||e.elementId==="live-go"||location.hash.includes("go=1"))&&setTimeout(()=>{var r;return(r=document.getElementById("live-go"))==null?void 0:r.scrollIntoView({behavior:"smooth",block:"start"})},50)}function Dn(){if(new URLSearchParams(location.search).has("holdSplash"))return;const e=document.getElementById("splash");!e||e.classList.contains("hide")||(e.classList.add("hide"),Io(),setTimeout(()=>e.remove(),500))}function hg(){const e=document.getElementById("splashChime");if(!e)return;const t=()=>{const i=e.play();i&&typeof i.catch=="function"&&i.catch(()=>{})};t();const s=()=>{t(),window.removeEventListener("pointerdown",s),window.removeEventListener("keydown",s)};window.addEventListener("pointerdown",s,{once:!0}),window.addEventListener("keydown",s,{once:!0})}function gg(){var t,s,i;Bn(),pg(),ho(),(t=document.getElementById("menuBtn"))==null||t.addEventListener("click",()=>Os(!0)),(s=document.getElementById("scrim"))==null||s.addEventListener("click",()=>Os(!1,!0)),(i=document.getElementById("sideNav"))==null||i.addEventListener("click",a=>{const r=a.target.closest(".drawer-cat");if(r){const o=r.closest(".drawer-group");if(o){const n=!o.classList.contains("open");document.querySelectorAll("#sideNav .drawer-group.open").forEach(d=>{var c;d!==o&&(d.classList.remove("open"),(c=d.querySelector(".drawer-cat"))==null||c.setAttribute("aria-expanded","false"))}),o.classList.toggle("open",n),r.setAttribute("aria-expanded",n?"true":"false")}return}a.target.closest("a")&&Os(!1)}),Ld(),Bd(),Nd(Tn);const e=Oe();if(Tn(e),Po()){hg();const a=()=>Dn();window.addEventListener("load",a,{once:!0}),setTimeout(a,3e3)}else Dn()}gg();
