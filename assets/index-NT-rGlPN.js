(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(i){if(i.ep)return;i.ep=!0;const n=s(i);fetch(i.href,n)}})();function dl(e,t=Date.now()){const s=new URL(e);return s.searchParams.set("refresh",String(t)),s.toString()}var cl;(cl=document.getElementById("pikk-refresh-link"))==null||cl.addEventListener("click",function(e){e.preventDefault(),window.location.assign(dl(window.location.href))});let Mr;function f(e){const t=document.getElementById("toast");t&&(t.textContent=e,t.classList.add("show"),clearTimeout(Mr),Mr=setTimeout(()=>t.classList.remove("show"),2400))}function l(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function j(e){const t=Math.max(0,Math.floor((Date.now()-e)/1e3));if(t<60)return t+"s";const s=Math.floor(t/60);if(s<60)return s+"m";const a=Math.floor(s/60);return a<24?a+"h":Math.floor(a/24)+"d"}function P(e,t,s={}){let a="";if(s.badgeHtml)a=s.badgeHtml;else if(s.badge){const n=l(s.badge),o=s.badgeAria?` aria-label="${l(s.badgeAria)}"`:"",r=s.badgeTitle||s.badgeAria?` title="${l(s.badgeTitle||s.badgeAria)}"`:"";s.badgeHref?a=`<a class="badge-phase"${o}${r} href="${l(s.badgeHref)}">${n}</a>`:a=`<span class="badge-phase"${o}${r}>${n}</span>`}const i=s.lead?`<p class="lead">${s.lead}</p>`:"";return`
    <section class="page">
      <header class="page-head">
        <h1>${l(e)} ${a}</h1>
        ${i}
      </header>
      ${t}
    </section>
  `}const Zs={heart:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.5c0 4.6-8.8 10.4-8.8 10.4S3.2 13.1 3.2 8.5a4.5 4.5 0 0 1 8.8-1.2 4.5 4.5 0 0 1 8.8 1.2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',home:'<svg viewBox="0 0 24 24"><path d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5z" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',posts:'<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 10h8M8 14h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',camera:'<svg viewBox="0 0 24 24"><path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h2.1l1.2-1.8A1.5 1.5 0 0 1 11 3.5h2a1.5 1.5 0 0 1 1.2.7L15.4 6h2.1A2.5 2.5 0 0 1 20 8.5v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-8z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="12.5" r="3.2" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',music:'<svg viewBox="0 0 24 24"><path d="M9 18V6l10-2v12" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="7" cy="18" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="16" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',merch:'<svg viewBox="0 0 24 24"><path d="M6 8h12l1 12H5L6 8zm3-3a3 3 0 0 1 6 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',explore:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m20 20-3.5-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',live:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" fill="currentColor"/><circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.2" opacity=".5"/></svg>',profile:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 19a7 7 0 0 1 14 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',videos:'<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10 9.5v5l5-2.5-5-2.5z" fill="currentColor"/></svg>',chat:'<svg viewBox="0 0 24 24"><path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v5A2.5 2.5 0 0 1 16.5 14H11l-3.5 3v-3H7.5A2.5 2.5 0 0 1 5 11.5v-5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 17.5V19a1 1 0 0 0 1.5.85L14 17h2.5" fill="none" stroke="currentColor" stroke-width="1.6" opacity=".55"/></svg>',msg:'<svg viewBox="0 0 24 24"><rect x="3.5" y="6" width="17" height="12" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m4.5 7.5 7.5 5.2L19.5 7.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',game:'<svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="11" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 13h2.5M9.25 11.5v3M15.2 12.2h.01M17.3 14.2h.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M9 8V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V8" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>'};function ct(e,t="rel=0"){const s=String(e||"").trim();if(!s)return"";const a=s.includes("?")?"&":"?";return`${s}${a}${t}`}const cp="#/terms?s=security",dp="PIKK uses reasonable measures to protect your information, but no system is 100% secure. To the fullest extent permitted by law, PIKK and its owners are not liable for damages resulting from unauthorized access, hacking, or data breaches beyond our reasonable control. If a breach affects your data, we will notify you as required by law.",on='<span class="chip pikk-legal-draft">Draft — pending legal review</span>';function pp(){return P("Terms",`
    <div class="card"><p class="kicker">PIKK Terms of Service</p>${on}<p>Full Terms ship before public launch. See also <a href="#/guidelines">Community Guidelines</a> and <a href="#/privacy">Privacy</a>.</p></div>
    <section class="card pikk-legal-section" id="terms-security" aria-labelledby="terms-security-h">
      <h2 id="terms-security-h">Security &amp; Data Breach / Limitation of Liability</h2>${on}
      <p>${dp}</p>
    </section>`,{badge:"DRAFT"})}function up(){return P("Privacy",`
    <div class="card"><p class="kicker">PIKK Privacy</p>${on}<p>TEST MODE: most data in this demo stays on your device. The full Privacy Policy ships before public launch.</p>
    <p><a href="${cp}">Security &amp; Data Breach / Limitation of Liability</a></p></div>`,{badge:"DRAFT"})}function mp(){typeof location<"u"&&/[?&]s=security\b/.test(location.hash)&&setTimeout(()=>{var e;return(e=document.getElementById("terms-security"))==null?void 0:e.scrollIntoView({block:"start"})},50)}const ue=[{id:"dirty-money",title:"Dirty Money ft. Lil Baby",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=-rHDLWfiuDI",embed:"https://www.youtube.com/embed/-rHDLWfiuDI"},{id:"93",title:"93 ft. DaBaby",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=zC0BYFxs5W0",embed:"https://www.youtube.com/embed/zC0BYFxs5W0"},{id:"no-love",title:"No Love ft. YFN Lucci",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=6pCVEIE9pB8",embed:"https://www.youtube.com/embed/6pCVEIE9pB8"},{id:"bouquet",title:"Bouquet",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=DTe4OiX2otg",embed:"https://www.youtube.com/embed/DTe4OiX2otg"},{id:"where-im-from",title:"Where I'm From ft. Tee Grizzley",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=BH7_Ttk86eQ",embed:"https://www.youtube.com/embed/BH7_Ttk86eQ"},{id:"gang-ties",title:"Gang Ties",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=0ikbrk901Kc",embed:"https://www.youtube.com/embed/0ikbrk901Kc"},{id:"go-2-work",title:"Go 2 Work",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=gRq8c2i4ESM",embed:"https://www.youtube.com/embed/gRq8c2i4ESM"},{id:"ramen-noodles",title:"Ramen Noodles",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=YNCdtAC273M",embed:"https://www.youtube.com/embed/YNCdtAC273M"},{id:"men-in-blacc",title:"Men In Blacc",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=MKyw-hzxQWY",embed:"https://www.youtube.com/embed/MKyw-hzxQWY"},{id:"king-city",title:"King City",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=wyNJYUqpRFM",embed:"https://www.youtube.com/embed/wyNJYUqpRFM"},{id:"in-her-bag",title:"In Her Bag",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=Dux8rm-pzRg",embed:"https://www.youtube.com/embed/Dux8rm-pzRg"},{id:"lonely",title:"Lonely",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=IVnDjPJ8dRg",embed:"https://www.youtube.com/embed/IVnDjPJ8dRg"},{id:"they-aint-coming-home",title:"They Ain't Coming Home",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=Yi4uBFkn0-o",embed:"https://www.youtube.com/embed/Yi4uBFkn0-o"},{id:"mind-on-a-licc",title:"Mind On A Licc",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=sADinuRcRr4",embed:"https://www.youtube.com/embed/sADinuRcRr4"},{id:"dbs-mix",title:"DatBoiSkeet Mix",artist:"DatBoiSkeet",category:"Mixes",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t",embed:"https://www.youtube.com/embed/videoseries?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t",openLink:"https://www.youtube.com/playlist?list=RDEMDYIvPhQWVGU3Zf3gcxT_4w"},{id:"on-the-radar",title:"On The Radar Interview — Talk of The Town",artist:"DatBoiSkeet",category:"Interviews",youtube:"https://www.youtube.com/watch?v=6IFiHo5HrdE",embed:"https://www.youtube.com/embed/6IFiHo5HrdE"}],_n=[{id:"dbs-mix",title:"DatBoiSkeet Mix",blurb:"Official channel Music Videos playlist embed (stable). YouTube Radio Mix link kept as Play on YouTube — RD mixes often fail to embed.",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t",embed:"https://www.youtube.com/embed/videoseries?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t",openLink:"https://www.youtube.com/playlist?list=RDEMDYIvPhQWVGU3Zf3gcxT_4w",source:"channel-pl-music-videos + user-t96u openLink"}],ln=[{id:"pl-music-videos",title:"DatBoiSkeet Music Videos",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t"},{id:"pl-interviews",title:"DatBoiSkeet Interviews",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQHoRjRTD58TpLGqm0XMsa7U"},{id:"pl-vlogs",title:"DatBoiSkeet Vlogs",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQEqroQ8LYGLgpDfzK3pyutQ"}],hp=[{category:"Interviews",title:"Off The Porch (no verified DatBoiSkeet YouTube URL yet — add via Admin)"},{category:"Behind the Scenes",title:"BTS clips (coming soon)"},{category:"Exclusive Videos",title:"Vault / member exclusives (coming soon)"}],he={youtube:"https://www.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA",youtubeHandle:"https://www.youtube.com/@DatBoiSkeet1",youtubeMusic:"https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA",spotify:"https://open.spotify.com/artist/0Po64h8VleQOR97okM68zh",apple:"https://music.apple.com/us/artist/datboiskeet/1270542870"},ot=[{id:"stream-dirty-money",title:"Dirty Money (feat. Lil Baby)",artist:"DatBoiSkeet",type:"single",year:2018,albumNote:"From Broke Is the Root of All Evil",cover:"https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2a/7a/67/2a7a676e-af85-489e-55fd-2bae2793948b/datboiskeet-bitroae-cover-3000px.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/track/17Pw88uBIWpgOVCfhEyszG",apple:"https://music.apple.com/us/song/dirty-money-feat-lil-baby/1395681218",youtubeMusic:"https://music.youtube.com/watch?v=-rHDLWfiuDI",youtube:"https://www.youtube.com/watch?v=-rHDLWfiuDI"}},{id:"stream-93",title:"93 (feat. DaBaby)",artist:"DatBoiSkeet",type:"single",year:2019,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/19/60/5f/19605f4c-7014-6dbc-ca18-baa2a672c697/194923194110.png/600x600bb.jpg",links:{spotify:"https://open.spotify.com/track/3gKwZybDOkUoz2wXquDHVZ",apple:"https://music.apple.com/us/album/93-feat-da-baby-single/1493456214",youtubeMusic:"https://music.youtube.com/watch?v=zC0BYFxs5W0",youtube:"https://www.youtube.com/watch?v=zC0BYFxs5W0"}},{id:"stream-no-love",title:"No Love (feat. YFN Lucci)",artist:"DatBoiSkeet",type:"single",year:2017,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/49/e5/62/49e56292-e427-3992-84bd-ead0b06fb06a/artwork.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/track/2KqnCXMM0lAMlEv1fDN63o",apple:"https://music.apple.com/us/album/no-love-feat-yfn-lucci-single/1317778810",youtubeMusic:"https://music.youtube.com/watch?v=6pCVEIE9pB8",youtube:"https://www.youtube.com/watch?v=6pCVEIE9pB8"}},{id:"stream-broke",title:"Broke Is the Root of All Evil",artist:"DatBoiSkeet",type:"album",year:2018,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2a/7a/67/2a7a676e-af85-489e-55fd-2bae2793948b/datboiskeet-bitroae-cover-3000px.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/album/51j6ReXYreCDV0ZwtPdj1Q",apple:"https://music.apple.com/us/album/broke-is-the-root-of-all-evil/1395680910",youtubeMusic:"https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA"}},{id:"stream-talk",title:"Talk of the Town",artist:"DatBoiSkeet",type:"album",year:2020,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/f6/0d/a0/f60da0bf-c3de-8b12-5cd8-e8c1d3c2053b/artwork.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/album/4OY5rM0TBPDsC4n8Dka4Gr",apple:"https://music.apple.com/us/album/talk-of-the-town/1541180619",youtubeMusic:"https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA"}},{id:"stream-said-you-love-me",title:"Said You Love Me",artist:"DatBoiSkeet",type:"single",year:2025,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/f4/4f/6b/f44f6b18-dff9-0486-e6e6-a615724e02fe/artwork.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/album/7FhoRIzhuGgmt2pZlWMc5c",apple:"https://music.apple.com/us/album/said-you-love-me-single/1835164001",youtubeMusic:"https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA"}}],us=[{id:"long-story-short",title:"Long Story Short",artist:"DatBoiSkeet",cover:"/music/01_Long_Story_Short_Coming_Soon.jpg",status:"Coming Soon",order:1},{id:"ladies-only",title:"Ladies Only",artist:"DatBoiSkeet",cover:"/music/02_Ladies_Only_Coming_Soon.jpg",status:"Coming Soon",order:2}],fp=[{id:"vault-long-story-short",title:"Long Story Short (Vault Preview)",artist:"DatBoiSkeet",cover:"/music/01_Long_Story_Short_Coming_Soon.jpg",tier:"skeet+",status:"Coming Soon"},{id:"vault-ladies-only",title:"Ladies Only (Vault Exclusive)",artist:"DatBoiSkeet",cover:"/music/02_Ladies_Only_Coming_Soon.jpg",tier:"backstage",status:"Coming Soon"}],Lr=[{id:"long-story-short",title:"Long Story Short",artist:"DatBoiSkeet",cover:"/music/01_Long_Story_Short_Coming_Soon.jpg",price:1.29,status:"Coming Soon"},{id:"ladies-only",title:"Ladies Only",artist:"DatBoiSkeet",cover:"/music/02_Ladies_Only_Coming_Soon.jpg",price:1.29,status:"Coming Soon"}],_e=[{id:"hat-716-orange",name:"716 Buffalo Braves Snapback (Black/Orange)",price:30,category:"Hats",image:"/merch/01_black_orange_716_hat.jpeg",shopUrl:"https://foreignx-change.com"},{id:"hat-716-blue",name:"716 Buffalo Hat (Blue/Red)",price:30,category:"Hats",image:"/merch/02_blue_red_716_hat.jpeg",shopUrl:"https://foreignx-change.com"},{id:"jacket-blue",name:"Buffalo Sports Varsity Jacket (Blue/White)",price:200,category:"Jackets",image:"/merch/03_blue_buffalo_jacket.jpeg",shopUrl:"https://foreignx-change.com"},{id:"jacket-black",name:"Foreign X-Change Buffalo Varsity (Black/White)",price:200,category:"Jackets",image:"/merch/07_black_buffalo_jacket.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-fx-back",name:"Foreign X-Change Graphic Tee (Back)",price:65,category:"Shirts",image:"/merch/04_black_fx_tee_back_screenshot.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-fx-front",name:"Foreign X-Change Text Tee (Front)",price:65,category:"Shirts",image:"/merch/05_black_fx_tee_front_screenshot.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-ptsd",name:"PTSD Tee (Black)",price:65,category:"Shirts",image:"/merch/06_black_ptsd_tee.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-abstract",name:"Abstract FX Tee (White)",price:65,category:"Shirts",image:"/merch/08_white_abstract_fx_tee.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-dealer",name:"Support Your Local Dealer Tee (Navy)",price:65,category:"Shirts",image:"/merch/09_navy_dealer_tee.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-skulls",name:"Skulls FX Tee (White)",price:65,category:"Shirts",image:"/merch/10_white_skulls_tee.jpeg",shopUrl:"https://foreignx-change.com"}],_a=[{id:"frame-chrome-crown",name:"Chrome Crown",category:"frames",rarity:"legendary",price:12.99,emoji:"👑"},{id:"frame-iced-out",name:"Iced Out",category:"frames",rarity:"epic",price:9.99,emoji:"💎"},{id:"frame-trap-flame",name:"Trap Flame",category:"frames",rarity:"epic",price:7.99,emoji:"🔥"},{id:"frame-rodeo-gold",name:"Rodeo Gold",category:"frames",rarity:"rare",price:5.99,emoji:"🤠"},{id:"frame-rose-petals",name:"Rose Petals",category:"frames",rarity:"rare",price:4.99,emoji:"🌹"},{id:"fx-bass-pulse",name:"Bass Pulse",category:"effects",rarity:"epic",price:8.99,emoji:"🎵"},{id:"fx-snowfall",name:"Snowfall",category:"effects",rarity:"rare",price:5.99,emoji:"❄️"},{id:"fx-city-lights",name:"City Lights",category:"effects",rarity:"epic",price:7.99,emoji:"🌃"},{id:"fx-holo-glitch",name:"Holographic Glitch",category:"effects",rarity:"legendary",price:14.99,emoji:"✨"},{id:"ban-skyline",name:"City Skyline",category:"banners",rarity:"rare",price:4.99,emoji:"🏙️"},{id:"ban-studio",name:"Studio Booth",category:"banners",rarity:"rare",price:4.99,emoji:"🎙️"},{id:"ban-arena",name:"Arena Lights",category:"banners",rarity:"epic",price:6.99,emoji:"🏟️"},{id:"ban-chrome",name:"Luxury Chrome",category:"banners",rarity:"legendary",price:11.99,emoji:"🪞"},{id:"name-chrome",name:"Chrome Name",category:"name styles",rarity:"epic",price:6.99,emoji:"🅰️"},{id:"name-neon",name:"Neon Name",category:"name styles",rarity:"rare",price:3.99,emoji:"💜"},{id:"name-varsity",name:"Bold Varsity",category:"name styles",rarity:"rare",price:3.99,emoji:"🏟️"},{id:"name-western",name:"Western Script",category:"name styles",rarity:"epic",price:5.99,emoji:"🏜️"},{id:"badge-dayone",name:"Day One (cosmetic style)",category:"badges",rarity:"rare",price:2.99,emoji:"1️⃣"},{id:"badge-topfan",name:"Top Fan (cosmetic style)",category:"badges",rarity:"epic",price:4.99,emoji:"⭐"},{id:"badge-backstage",name:"Backstage Glow",category:"badges",rarity:"epic",price:5.99,emoji:"🎫"}],gp=[{id:"all",label:"All"},{id:"frames",label:"Frames"},{id:"effects",label:"Effects"},{id:"banners",label:"Banners"},{id:"name styles",label:"Name styles"},{id:"badges",label:"Badges"}],On=[{id:"skeet",name:"PIKK+",price:3.99,blurb:"Early releases · basic Vault"},{id:"backstage",name:"Backstage",price:7.99,blurb:"Deeper Vault · studio lives · listening rooms"},{id:"inner",name:"Inner Circle",price:12.99,blurb:"VIP drops · private Q&As · Inner Circle rooms"}],vp=[{label:"Long Story Short",src:"/music/01_Long_Story_Short_Coming_Soon.jpg"},{label:"Ladies Only",src:"/music/02_Ladies_Only_Coming_Soon.jpg"},{label:"716 Orange Hat",src:"/merch/01_black_orange_716_hat.jpeg"},{label:"716 Blue Hat",src:"/merch/02_blue_red_716_hat.jpeg"},{label:"Blue Jacket",src:"/merch/03_blue_buffalo_jacket.jpeg"},{label:"PTSD Tee",src:"/merch/06_black_ptsd_tee.jpeg"}],bp=[{route:"/explore",title:"Explore",blurb:"Discover DatBoiSkeet · creators · drops"},{route:"/music",title:"Music",blurb:"Long Story Short · Ladies Only · Vault"},{route:"/videos",title:"Videos",blurb:"Official music videos"},{route:"/posts",title:"Posts",blurb:"Text · Picture · Short · Video"},{route:"/shorts",title:"Shorts",blurb:"Under Posts · quick clips"},{route:"/live",title:"Live",blurb:"Go live · TEST MODE demo"},{route:"/shop",title:"PIKK Shop",blurb:"Foreign X-Change merch · external checkout"},{route:"/community",title:"PIKK Lounge",blurb:"Artist-owned rooms · Phase 2"},{route:"/music",title:"Vault",blurb:"Member exclusives · Coming Soon",hash:"vault"},{route:"/marketplace",title:"Marketplace",blurb:"Brand ads & sponsored offers"},{route:"/missions",title:"Missions",blurb:"Clipper promo campaigns"},{route:"/clippers",title:"Clippers",blurb:"Apply · cut clips · earn"}],pl=[{id:"home",label:"Home",href:"#/home"},{id:"explore",label:"Explore",href:"#/explore"},{id:"profile",label:"Profile / Sign in",href:"#/profile"},{id:"watch",label:"Watch",links:[{href:"#/videos",label:"Videos"},{href:"#/live",label:"Live"},{href:"#/openmic",label:"Open Mic / Talent Discovery (24/7)"},{href:"#/spotlight",label:"Spotlight (24/7)"},{href:"#/multiguest",label:"Multi-Guest Live"}]},{id:"music",label:"Music",links:[{href:"#/music",label:"Music & Vault"}]},{id:"social",label:"Social",links:[{href:"#/posts",label:"Posts"},{href:"#/posts?compose=1",label:"Post · Text / Picture / Short / Video"},{href:"#/shorts",label:"Shorts (in Posts)"},{href:"#/notifications",label:"Notifications"},{href:"#/connect",label:"Connect"},{href:"#/dating",label:"Dating & Connections"},{href:"#/community",label:"Community / Lounge"}]},{id:"messages",label:"Messages",href:"#/messages"},{id:"games",label:"Games",links:[{href:"#/games",label:"PIKK Arcade · 15 Games Coming Soon"},{href:"#/blockwars",label:"Block Wars · Coming Soon"}]},{id:"shop",label:"Shop",links:[{href:"#/merch",label:"Foreign X-Change Merch"},{href:"#/marketplace",label:"Marketplace"},{href:"#/shop",label:"PIKK Shop"},{href:"#/profile-shop",label:"Profile Shop · cosmetics"}]},{id:"earn",label:"Creators & Earnings",links:[{href:"#/wallet",label:"Wallet"},{href:"#/earnings",label:"Creator Earnings"},{href:"#/missions",label:"Missions"},{href:"#/clippers",label:"Clippers Apply"},{href:"#/share",label:"Share & Earn"},{href:"#/refer",label:"Refer & Earn"},{href:"#/pricing",label:"Pricing (rules & fees)"}]},{id:"account",label:"Account",links:[{href:"#/profile",label:"Profile"},{href:"#/signup",label:"Signup / Creator Apps"},{href:"#/loyalty",label:"Loyalty Club"},{href:"#/fanclubs",label:"Fan Clubs"},{href:"#/guidelines",label:"Community Guidelines"}]},{id:"studio",label:"Studio / Owner",links:[{href:"#/admin",label:"Admin"},{href:"#/phases",label:"Development Phases"},{href:"#/launch",label:"Launch Readiness"}]}];pl.flatMap(e=>e.href?[{href:e.href,label:e.label}]:e.links||[]);const qn=[{href:"#/music",label:"Music",icon:"music"},{href:"#/videos",label:"Videos",icon:"videos"},{href:"#/connect",label:"Connect",icon:"profile"},{href:"#/create",label:"Create",icon:"live",primary:!0},{href:"#/dating",label:"Dating",icon:"heart"},{href:"#/games",label:"Games",icon:"game"},{href:"#/shop",label:"Shop",icon:"merch"}],yp={DEV:!1,VITE_PIKK_API_BASE:""},ul="dbs_v1",zs=()=>({user:null,profiles:{dbs:{id:"dbs",username:"DatBoiSkeet",bio:"Official DatBoiSkeet · Long Story Short & Ladies Only Coming Soon · Vault · Foreign X-Change",avatar:"/brand/pikk-logo-square.png",followers:[],following:[],verified:!0}},posts:[],comments:{},likes:{},clipperApps:[],creatorSellApps:[],brandApps:[],listings:[],live:null,liveHistory:[],liveSongRequests:[],coins:{balance:0,history:[]},liveGiftLedger:[],liveGbChallengePop:null,threads:{},demoUnreadSeeded:!1,messagePrefs:{allowDMs:!0,allowRequests:!0},notifications:{releases:!0,lives:!0,messages:!0,quietHours:!1},wallet:{balance:0,history:[]},creatorWallet:{available:0,holds:0,threshold:25,verification:"demo_unverified",earnings:[],payouts:[]},catalog:[],missions:[],giftBattles:{active:null,history:[],champions:[],prefs:{invitationsEnabled:!0}},multiGuest:{active:null,history:[]},spotlight:{nowPlaying:null,queue:[],history:[],houseIndex:0},fanClubs:{clubs:[],posts:{},seeded:!1},shareEarn:{platformsLinked:[],challenge:null,submissions:[],rewardsClaimed:[]},referEarn:{code:"",invitees:[],milestonesClaimed:[]},restream:{platforms:{},selected:[],session:null,history:[],ingest:null,campaign:{tier:null,status:"none",enrolledAt:null,cancelledAt:null},campaignConfig:null},loyalty:{points:0,history:[],badges:[],publicVisible:!0,lastActionAt:{},dayCounts:{}},openMic:{applications:[],seeded:!1,houseIndex:0},profileShop:{owned:[],equipped:{},reduceMotion:!1},hotFeed:{lives:[],posts:[],seededLives:!1,seededPosts:!1,seededPostsVer:0},engagementAlerts:[],postShares:{},splashSeenAt:0,dailyGoals:{app:null,liveByHost:{},history:[]}});function kp(){var e,t,s,a,i,n,o,r,d,c,p,m,h,g,v,b,y,k,S,x,w,A,M,q,$,U,L,B,W,D,O,N,te,ke,H,se,we,z,Me,Xe,Dt,_t,ht,is,Ot,Q,Ae,Le,T,Se,Ms;try{const Ls=localStorage.getItem(ul);if(!Ls)return zs();const E=JSON.parse(Ls),ae=zs();return{...ae,...E,profiles:{...ae.profiles,...E.profiles||{}},notifications:{...ae.notifications,...E.notifications||{}},wallet:{...ae.wallet,...E.wallet||{}},creatorWallet:{...ae.creatorWallet,...E.creatorWallet||{},earnings:Array.isArray((e=E.creatorWallet)==null?void 0:e.earnings)?E.creatorWallet.earnings:[],payouts:Array.isArray((t=E.creatorWallet)==null?void 0:t.payouts)?E.creatorWallet.payouts:[],available:Number((s=E.creatorWallet)==null?void 0:s.available)||0,holds:Number((a=E.creatorWallet)==null?void 0:a.holds)||0,threshold:Number((i=E.creatorWallet)==null?void 0:i.threshold)>0?Number(E.creatorWallet.threshold):25,verification:((n=E.creatorWallet)==null?void 0:n.verification)==="demo_verified"?"demo_verified":"demo_unverified"},brandApps:E.brandApps||[],listings:Array.isArray(E.listings)?E.listings:[],live:E.live??null,liveHistory:Array.isArray(E.liveHistory)?E.liveHistory:[],liveSongRequests:Array.isArray(E.liveSongRequests)?E.liveSongRequests:[],coins:{balance:Number((o=E.coins)==null?void 0:o.balance)||0,history:Array.isArray((r=E.coins)==null?void 0:r.history)?E.coins.history:[]},liveGiftLedger:Array.isArray(E.liveGiftLedger)?E.liveGiftLedger:[],liveGbChallengePop:E.liveGbChallengePop||null,threads:{...E.threads||{}},demoUnreadSeeded:!!E.demoUnreadSeeded,messagePrefs:{...ae.messagePrefs,...E.messagePrefs||{}},catalog:Array.isArray(E.catalog)?E.catalog:[],missions:Array.isArray(E.missions)?E.missions:[],giftBattles:{...ae.giftBattles,...E.giftBattles||{},history:Array.isArray((d=E.giftBattles)==null?void 0:d.history)?E.giftBattles.history:[],champions:Array.isArray((c=E.giftBattles)==null?void 0:c.champions)?E.giftBattles.champions:[],prefs:{...ae.giftBattles.prefs,...((p=E.giftBattles)==null?void 0:p.prefs)||{}},active:((m=E.giftBattles)==null?void 0:m.active)??null},multiGuest:{...ae.multiGuest,...E.multiGuest||{},history:Array.isArray((h=E.multiGuest)==null?void 0:h.history)?E.multiGuest.history:[],active:((g=E.multiGuest)==null?void 0:g.active)??null},fanClubs:{...ae.fanClubs,...E.fanClubs||{},clubs:Array.isArray((v=E.fanClubs)==null?void 0:v.clubs)?E.fanClubs.clubs:[],posts:(b=E.fanClubs)!=null&&b.posts&&typeof E.fanClubs.posts=="object"?E.fanClubs.posts:{},seeded:!!((y=E.fanClubs)!=null&&y.seeded)},shareEarn:{...ae.shareEarn,...E.shareEarn||{},platformsLinked:Array.isArray((k=E.shareEarn)==null?void 0:k.platformsLinked)?E.shareEarn.platformsLinked:[],challenge:((S=E.shareEarn)==null?void 0:S.challenge)??null,submissions:Array.isArray((x=E.shareEarn)==null?void 0:x.submissions)?E.shareEarn.submissions:[],rewardsClaimed:Array.isArray((w=E.shareEarn)==null?void 0:w.rewardsClaimed)?E.shareEarn.rewardsClaimed:[]},referEarn:{...ae.referEarn,...E.referEarn||{},code:typeof((A=E.referEarn)==null?void 0:A.code)=="string"?E.referEarn.code:"",invitees:Array.isArray((M=E.referEarn)==null?void 0:M.invitees)?E.referEarn.invitees:[],milestonesClaimed:Array.isArray((q=E.referEarn)==null?void 0:q.milestonesClaimed)?E.referEarn.milestonesClaimed:[]},restream:{...ae.restream,...E.restream||{},platforms:($=E.restream)!=null&&$.platforms&&typeof E.restream.platforms=="object"?E.restream.platforms:{},selected:Array.isArray((U=E.restream)==null?void 0:U.selected)?E.restream.selected:[],session:((L=E.restream)==null?void 0:L.session)??null,history:Array.isArray((B=E.restream)==null?void 0:B.history)?E.restream.history:[],ingest:((W=E.restream)==null?void 0:W.ingest)??null,campaign:{...ae.restream.campaign,...((D=E.restream)==null?void 0:D.campaign)||{}},campaignConfig:((O=E.restream)==null?void 0:O.campaignConfig)??null},loyalty:{...ae.loyalty,...E.loyalty||{},points:Number((N=E.loyalty)==null?void 0:N.points)||0,history:Array.isArray((te=E.loyalty)==null?void 0:te.history)?E.loyalty.history:[],badges:Array.isArray((ke=E.loyalty)==null?void 0:ke.badges)?E.loyalty.badges:[],publicVisible:((H=E.loyalty)==null?void 0:H.publicVisible)===void 0?!0:!!E.loyalty.publicVisible,lastActionAt:(se=E.loyalty)!=null&&se.lastActionAt&&typeof E.loyalty.lastActionAt=="object"?E.loyalty.lastActionAt:{},dayCounts:(we=E.loyalty)!=null&&we.dayCounts&&typeof E.loyalty.dayCounts=="object"?E.loyalty.dayCounts:{}},openMic:{...ae.openMic,...E.openMic||{},applications:Array.isArray((z=E.openMic)==null?void 0:z.applications)?E.openMic.applications:[],seeded:!!((Me=E.openMic)!=null&&Me.seeded),houseIndex:typeof((Xe=E.openMic)==null?void 0:Xe.houseIndex)=="number"?E.openMic.houseIndex:0},profileShop:{...ae.profileShop,...E.profileShop||{},owned:Array.isArray((Dt=E.profileShop)==null?void 0:Dt.owned)?E.profileShop.owned:[],equipped:(_t=E.profileShop)!=null&&_t.equipped&&typeof E.profileShop.equipped=="object"?E.profileShop.equipped:{},reduceMotion:!!((ht=E.profileShop)!=null&&ht.reduceMotion)},hotFeed:{...ae.hotFeed,...E.hotFeed||{},lives:Array.isArray((is=E.hotFeed)==null?void 0:is.lives)?E.hotFeed.lives:[],posts:Array.isArray((Ot=E.hotFeed)==null?void 0:Ot.posts)?E.hotFeed.posts:[],seededLives:!!((Q=E.hotFeed)!=null&&Q.seededLives),seededPosts:!!((Ae=E.hotFeed)!=null&&Ae.seededPosts),seededPostsVer:Number((Le=E.hotFeed)==null?void 0:Le.seededPostsVer)||0},engagementAlerts:Array.isArray(E.engagementAlerts)?E.engagementAlerts:[],postShares:E.postShares&&typeof E.postShares=="object"?E.postShares:{},creatorSellApps:Array.isArray(E.creatorSellApps)?E.creatorSellApps:[],dailyGoals:{...ae.dailyGoals,...E.dailyGoals||{},app:((T=E.dailyGoals)==null?void 0:T.app)??null,liveByHost:(Se=E.dailyGoals)!=null&&Se.liveByHost&&typeof E.dailyGoals.liveByHost=="object"?E.dailyGoals.liveByHost:{},history:Array.isArray((Ms=E.dailyGoals)==null?void 0:Ms.history)?E.dailyGoals.history:[]}}}catch{return zs()}}function C(e){localStorage.setItem(ul,JSON.stringify(e))}let u=kp();function I(){return u}function Dr(e){return u={...u,...e},C(u),u}function wp(e){return u=e(u)||u,C(u),u}function ut(e){e&&(u={...u,profiles:{...u.profiles,[e.id]:{id:e.id,username:e.username,bio:e.bio||"",avatar:e.avatar||"",followers:e.followers||[],following:e.following||[],memberships:e.memberships||{},verified:!!e.verified}}})}function Jt(e){return e?u.user&&u.user.id===e?u.user:u.profiles[e]||null:null}function _r(e){const t=Jt(e);return t?(t.followers||[]).map(s=>Jt(s)||{id:s,username:s}).filter(Boolean):[]}function cn(e){const t=Jt(e);return t?(t.following||[]).map(s=>Jt(s)||{id:s,username:s}).filter(Boolean):[]}function ml(){if(u.posts.length)return;const e=[{id:"p1",userId:"dbs",username:"DatBoiSkeet",text:"Long Story Short — cover is up. Coming Soon on DBS Music. Stay ready.",image:"/music/01_Long_Story_Short_Coming_Soon.jpg",at:Date.now()-864e5*2},{id:"p2",userId:"dbs",username:"DatBoiSkeet",text:"Foreign X-Change — hats, tees & jackets. Checkout on ForeignX-Change.com (not inside DBS).",image:"/merch/01_black_orange_716_hat.jpeg",at:Date.now()-864e5},{id:"p3",userId:"dbs",username:"DatBoiSkeet",text:"Ladies Only — cover art live. Official playback unlocks when the single drops.",image:"/music/02_Ladies_Only_Coming_Soon.jpg",at:Date.now()-864e5*3},{id:"p4",userId:"dbs",username:"DatBoiSkeet",text:"716 Buffalo Braves snapback on Foreign X-Change — shop the external store.",image:"/merch/02_blue_red_716_hat.jpeg",at:Date.now()-864e5*4}];u={...u,posts:e,likes:{p1:[],p2:[],p3:[],p4:[]},comments:{p1:[],p2:[],p3:[],p4:[]}},C(u)}function pa(e){const t=(e||"Fan").trim().slice(0,24)||"Fan",s="u_"+t.toLowerCase().replace(/\W+/g,"_")+"_"+Date.now().toString(36),a={id:s,username:t,bio:"DBS fan · local demo account (TEST MODE)",avatar:"",followers:[],following:["dbs"],membership:null,memberships:{skeetPlus:!1,backstage:!1,innerCircle:!1},purchasedTracks:[],createdAt:Date.now()},i=u.profiles.dbs||zs().profiles.dbs,n=new Set(i.followers||[]);return n.add(s),u={...u,user:a,profiles:{...u.profiles,dbs:{...i,followers:[...n]}}},ut(a),C(u),a}function Sp(){u={...u,user:null},C(u)}function ds(e){if(!(e!=null&&e.id)||!(e!=null&&e.handle))return null;const t=u.user&&u.user.id===e.id?u.user:{},s={...t,id:e.id,username:e.display_name||e.handle,handle:e.handle,email:e.email||"",emailVerified:!!e.email_verified,authSource:"backend",bio:e.bio!==void 0?String(e.bio||"").slice(0,280):t.bio||"",avatar:e.avatar_url!==void 0?String(e.avatar_url||""):t.avatar||"",followers:t.followers||[],following:t.following||[],membership:t.membership??null,memberships:t.memberships||{skeetPlus:!1,backstage:!1,innerCircle:!1},purchasedTracks:t.purchasedTracks||[],createdAt:t.createdAt||Date.now()};return u={...u,user:s},ut(s),C(u),s}function Ws(){Rn=[],u={...u,user:null},C(u)}function $p({bio:e,avatar:t,username:s}){const a=u.user;if(!a)return{error:"signin"};const i={...a,bio:e!==void 0?String(e).slice(0,280):a.bio,avatar:t!==void 0?String(t).trim():a.avatar,username:s!==void 0&&String(s).trim().slice(0,24)||a.username};return u={...u,user:i},ut(i),C(u),i}function mi(e,t=!0){const s=u.user;if(!s)return{error:"signin"};let a=s.membership??null;const i=c=>c==="skeet"||c==="skeetPlus"||c==="skeet+"?"skeet+":c==="backstage"?"backstage":c==="inner"||c==="innerCircle"?"inner":null,n={null:0,"skeet+":1,backstage:2,inner:3},o=i(e);t?o&&(a=o):a=null;const r={skeetPlus:n[a||"null"]>=1,backstage:n[a||"null"]>=2,innerCircle:n[a||"null"]>=3},d={...s,membership:a,memberships:r};return u={...u,user:d},ut(d),C(u),d}function Zt(){const e=u.user;if(!e)return null;if(e.membership)return e.membership;const t=e.memberships||{};return t.innerCircle?"inner":t.backstage?"backstage":t.skeetPlus?"skeet+":null}function dn(e="skeet"){const t=Zt(),s={null:0,"skeet+":1,backstage:2,inner:3},a=e==="backstage"?2:e==="inner"?3:1;return(s[t||"null"]||0)>=a}function Ep(e){const t=u.user;if(!t)return{error:"signin"};const s=new Set(t.purchasedTracks||[]);s.add(e);const a={...t,purchasedTracks:[...s]};return u={...u,user:a},ut(a),C(u),a}function Or({text:e,image:t,mediaType:s,mediaUrl:a}){const i=u.user;if(!i)throw new Error("Sign in required");const n="p_"+Date.now().toString(36),o=["picture","short","video","image","text"].includes(s)?s==="image"?"picture":s:t?"picture":"text",r={id:n,userId:i.id,username:i.username,text:(e||"").trim(),image:(t||"").trim(),mediaType:o==="text"&&!(t||"").trim()?"text":o,mediaUrl:(a||"").trim(),at:Date.now()};return u={...u,posts:[r,...u.posts],likes:{...u.likes,[n]:[]},comments:{...u.comments,[n]:[]}},C(u),r}function xp(e){const t=u.user;if(!t)return{error:"signin"};const s=new Set(u.likes[e]||[]);s.has(t.id)?s.delete(t.id):s.add(t.id),u={...u,likes:{...u.likes,[e]:[...s]}},C(u);try{We()}catch{}return{count:s.size,liked:s.has(t.id)}}function Ap(e,t){const s=u.user;if(!s)return{error:"signin"};const a={id:"c_"+Date.now().toString(36),userId:s.id,username:s.username,text:t.trim(),at:Date.now()},i=u.comments[e]||[];u={...u,comments:{...u.comments,[e]:[...i,a]}},C(u);try{We()}catch{}return a}function hi(e){const t=u.user;if(!t)return{error:"signin"};if(e===t.id)return{error:"self"};if(t.following.includes(e))return t;const s={...t,following:[...t.following,e]},a={...u.profiles},i=a[e]||Jt(e);if(i){const n=new Set(i.followers||[]);n.add(t.id),a[e]={...i,followers:[...n]}}return u={...u,user:s,profiles:a},ut(s),C(u),s}function fi(e){const t=u.user;if(!t)return{error:"signin"};const s={...t,following:(t.following||[]).filter(n=>n!==e)},a={...u.profiles},i=a[e]||Jt(e);return i&&(a[e]={...i,followers:(i.followers||[]).filter(n=>n!==t.id)}),u={...u,user:s,profiles:a},ut(s),C(u),s}function Tp(e){const t={id:"clip_"+Date.now().toString(36),...e,status:"pending",at:Date.now()};return u={...u,clipperApps:[t,...u.clipperApps]},C(u),t}function Cp(e){const t=e||{},s=String(t.name||"").trim().slice(0,80),a=String(t.contact||t.email||t.handle||"").trim().slice(0,120),i=String(t.sells||"both").trim().slice(0,40),n=!!t.agreed;if(!s||!a)return{error:"missing"};if(!n)return{error:"rules"};const o={id:"csa_"+Date.now().toString(36),name:s,contact:a,sells:["music","merch","both"].includes(i)?i:"both",agreed:!0,status:"pending",at:Date.now()},r=[o,...u.creatorSellApps||[]].slice(0,40);return u={...u,creatorSellApps:r},C(u),{ok:!0,app:o}}function hl(e,t){if(!["pending","approved","rejected","waitlisted"].includes(t))return{error:"bad_status"};const a=u.clipperApps.map(i=>i.id===e?{...i,status:t,reviewedAt:Date.now()}:i);return u={...u,clipperApps:a},C(u),a.find(i=>i.id===e)}function ji(e){u={...u,notifications:{...u.notifications,...e}},C(u)}function Pp(){u={...u,splashSeenAt:Date.now()},C(u)}function Ip(){return!u.splashSeenAt}let Rn=[];function qr(e){Rn=Array.isArray(e)?e.map(String):[]}function ua(){const e=typeof import.meta<"u"&&yp||{},t=typeof window<"u"&&typeof window.__PIKK_API_BASE__=="string"&&window.__PIKK_API_BASE__.trim()||String(e.VITE_PIKK_API_BASE||"").trim();return e.DEV===!0&&!t}function le(){return Rn.includes("admin")?!0:ua()&&!!(u.user&&u.user.role==="admin")}function gi(e=!0){if(e&&!ua())return{error:"staff_only"};const t=u.user;if(!t)return{error:"signin"};const s={...t,role:e?"admin":"fan"};return u={...u,user:s},ut(s),C(u),s}function fl(){var r;const e=u.posts||[],t=u.clipperApps||[],s={pending:0,approved:0,rejected:0,waitlisted:0};t.forEach(d=>{const c=d.status||"pending";s[c]!==void 0?s[c]+=1:s.pending+=1});let a=0;Object.values(u.likes||{}).forEach(d=>{a+=(d||[]).length});let i=0;Object.values(u.comments||{}).forEach(d=>{i+=(d||[]).length});let n=0;u.user&&(u.user.membership||(r=u.user.memberships)!=null&&r.skeetPlus)&&(n+=1),Object.values(u.profiles||{}).forEach(d=>{var c,p;d.id!==((c=u.user)==null?void 0:c.id)&&(d.membership||(p=d.memberships)!=null&&p.skeetPlus)&&(n+=1)});const o=u.catalog||[];return{posts:e.length,likes:a,comments:i,clippers:t.length,clipperByStatus:s,members:n,profiles:Object.keys(u.profiles||{}).length,catalogTotal:o.length,catalogPublished:o.filter(d=>d.published).length}}function gl(e){const t=["spotify","apple","youtubeMusic","youtube","tidal","amazon"],s={};if(!e||typeof e!="object")return s;for(const a of t){const i=String(e[a]||"").trim();(i.startsWith("http://")||i.startsWith("https://"))&&(s[a]=i.slice(0,500))}return s}function Ht({publishedOnly:e=!1,types:t=null,includeUnpublishedForAdmin:s=!1}={}){let a=u.catalog||[];if(e?a=a.filter(i=>i.published):s||(a=a.filter(i=>i.published)),t&&t.length){const i=new Set(t);a=a.filter(n=>i.has(n.type))}return[...a].sort((i,n)=>(n.createdAt||0)-(i.createdAt||0))}function Mp(e){var a;if(!le())return{error:"forbidden"};const s={id:e.id||"cat_"+Date.now().toString(36),type:e.type,title:String(e.title||"").trim().slice(0,120),artist:String(e.artist).trim().slice(0,80),coverRef:e.coverRef||"",mediaRef:e.mediaRef||"",youtube:String(e.youtube||"").trim(),embed:String(e.embed||"").trim(),streamingLinks:gl(e.streamingLinks),published:!!e.published,createdAt:Date.now(),updatedAt:Date.now(),createdBy:((a=u.user)==null?void 0:a.id)||null};return s.title?["song","album","video","picture"].includes(s.type)?(u={...u,catalog:[s,...u.catalog||[]]},C(u),s):{error:"type"}:{error:"title"}}function vl(e,t){if(!le())return{error:"forbidden"};let s=null;const a=(u.catalog||[]).map(i=>{if(i.id!==e)return i;const n={...i,...t,id:i.id,updatedAt:Date.now()};return t&&Object.prototype.hasOwnProperty.call(t,"streamingLinks")&&(n.streamingLinks=gl(t.streamingLinks)),s=n,s});return s?(u={...u,catalog:a},C(u),s):{error:"missing"}}function Lp(e,t){return vl(e,{published:!!t})}function Dp(e){if(!le())return{error:"forbidden"};const t=(u.catalog||[]).filter(s=>s.id!==e);return u={...u,catalog:t},C(u),!0}function Rr(e,t={}){const s=u.user;if(!s)return{error:"signin"};if(u.live&&!u.live.endedAt)return{error:"already_live",live:u.live};const a={id:"live_"+Date.now().toString(36),hostId:s.id,hostName:s.username,title:(e||"DBS Live · TEST MODE").trim().slice(0,80),category:t.category||"",permissions:t.permissions||null,startedAt:Date.now(),viewers:0,giftsTotal:0,tipsTotal:0,giftLog:[],chat:[{id:"sys1",userId:"system",username:"DBS",text:"Welcome · Follow DatBoiSkeet · TEST MODE (no real stream)",at:Date.now()}],endedAt:null};return u={...u,live:a},C(u),a}function _p(){if(!u.live||u.live.endedAt)return u.live;const e={...u.live,endedAt:Date.now()},t=[e,...u.liveHistory||[]].slice(0,20);return u={...u,live:e,liveHistory:t},C(u),e}function Op(e){const t=u.user;if(!t)return{error:"signin"};if(!u.live||u.live.endedAt)return{error:"offline"};const s={id:"lc_"+Date.now().toString(36),userId:t.id,username:t.username,text:String(e||"").trim().slice(0,280),at:Date.now()};if(!s.text)return{error:"empty"};const a={...u.live,chat:[...u.live.chat||[],s]};return u={...u,live:a},C(u),s}function bl({kind:e="tip",amount:t=1,label:s=""}={}){var m;const a=u.user;if(!a)return{error:"signin"};if(!u.live||u.live.endedAt)return{error:"offline"};const i=Math.max(.5,Number(t)||1),n=e==="gift"?"gift":"tip",o=((m=u.wallet)==null?void 0:m.balance)||0;let r=u.wallet||{balance:0,history:[]};o>=i&&(r={balance:+(o-i).toFixed(2),history:[...r.history||[],{at:Date.now(),amount:-i,note:`Live ${n} · ${u.live.title}`}]});const d={id:"lg_"+Date.now().toString(36),userId:a.id,username:a.username,kind:n,amount:i,label:(s||(n==="gift"?"🔥 Fire":"Tip")).slice(0,40),at:Date.now()},c={id:"lc_"+Date.now().toString(36)+"g",userId:a.id,username:a.username,text:n==="gift"?`sent ${d.label} ($${i.toFixed(2)}) · TEST MODE`:`tipped $${i.toFixed(2)} · TEST MODE`,at:Date.now(),support:!0},p={...u.live,giftsTotal:(u.live.giftsTotal||0)+(n==="gift"?i:0),tipsTotal:(u.live.tipsTotal||0)+(n==="tip"?i:0),giftLog:[...u.live.giftLog||[],d],chat:[...u.live.chat||[],c]};return u={...u,live:p,wallet:r},C(u),o>=i&&Hn({category:n==="gift"?"gifts":"tips",gross:i,note:`Live ${n} from @${a.username} · ${u.live.title}`,source:"live"}),{live:p,entry:d,wallet:u.wallet,creatorWallet:u.creatorWallet}}function qp(){return u.liveHistory||[]}const yl=[{pack:1,price:10,label:"1 song",save:0},{pack:2,price:25,label:"2 songs",save:0},{pack:3,price:45,label:"3 songs",save:5}];function Ys(){return Array.isArray(u.liveSongRequests)?u.liveSongRequests:[]}function Rp(e){var s;const t=e||((s=u.live)==null?void 0:s.id);return t?Ys().filter(a=>a.liveId===t):[]}function Nn(e){const t=[];for(const s of Rp(e))(s.titles||[]).forEach((a,i)=>{t.push({requestId:s.id,songIndex:i,title:a,status:s.songStatuses&&s.songStatuses[i]||"queued",username:s.username,userId:s.userId,pack:s.pack,price:s.price,at:s.at})});return t}function Np({pack:e,titles:t}={}){var p;const s=u.user;if(!s)return{error:"signin"};if(!u.live||u.live.endedAt)return{error:"offline"};const a=yl.find(m=>m.pack===Number(e));if(!a)return{error:"bad_pack"};const i=(Array.isArray(t)?t:[]).map(m=>String(m||"").trim().slice(0,80)).filter(Boolean);if(i.length!==a.pack)return{error:"title_count",need:a.pack,got:i.length};const n=Pl(a.price,`Song request ×${a.pack} · ${u.live.title} · TEST MODE`);if((n==null?void 0:n.error)==="insufficient")return{error:"insufficient",need:a.price,balance:Number(((p=u.wallet)==null?void 0:p.balance)||0)};const o={id:"lsr_"+Date.now().toString(36),liveId:u.live.id,hostId:u.live.hostId,userId:s.id,username:s.username,pack:a.pack,price:a.price,titles:i,songStatuses:i.map(()=>"queued"),status:"open",at:Date.now(),charged:a.price},r=[o,...Ys()].slice(0,200),d={id:"lc_"+Date.now().toString(36)+"sr",userId:s.id,username:s.username,text:`requested ${a.pack} song${a.pack>1?"s":""} ($${a.price}) · TEST MODE`,at:Date.now(),support:!0},c={...u.live,chat:[...u.live.chat||[],d]};return u={...u,liveSongRequests:r,live:c},C(u),Hn({category:"tips",gross:a.price,note:`Song request ×${a.pack} from @${s.username} · ${u.live.title}`,source:"live_song_request"}),{ok:!0,entry:o,wallet:u.wallet,live:u.live}}function Bn(e,t,s){var v;const a=u.user;if(!a)return{error:"signin"};if(!["playing","played","skipped","queued"].includes(s))return{error:"bad_status"};const n=Ys().findIndex(b=>b.id===e);if(n<0)return{error:"missing"};const o=Ys()[n],r=u.live;if(!(r&&r.hostId===a.id&&r.id===o.liveId||a.id===o.hostId)&&!le())return{error:"host_only"};const c=Number(t);if(!Number.isInteger(c)||c<0||c>=(o.titles||[]).length)return{error:"bad_index"};let p=[...o.songStatuses||o.titles.map(()=>"queued")];if(s==="playing"){const b=Ys().map(y=>{if(y.liveId!==o.liveId)return y;const k=[...y.songStatuses||(y.titles||[]).map(()=>"queued")];let S=!1;for(let w=0;w<k.length;w++)k[w]==="playing"&&(k[w]="played",S=!0);if(!S)return y;const x=k.every(w=>w==="played"||w==="skipped");return{...y,songStatuses:k,status:x?"done":"open"}});u={...u,liveSongRequests:b},p=[...((v=u.liveSongRequests[n])==null?void 0:v.songStatuses)||p]}p[c]=s;const m=p.every(b=>b==="played"||b==="skipped"),h={...u.liveSongRequests[n],songStatuses:p,status:m?"done":"open"},g=[...u.liveSongRequests];return g[n]=h,u={...u,liveSongRequests:g},C(u),{ok:!0,entry:h}}function Bp(e,t){return Bn(e,t,"playing")}function Kp(e,t){return Bn(e,t,"skipped")}function jp(e,t){return Bn(e,t,"played")}const Kn=[{slug:"rose",name:"DBS Rose",coins:5,usd:.1,animation:"Rotating glossy rose and petals",tier:"small"},{slug:"big-love",name:"Big Love",coins:25,usd:.5,animation:"Pulsing luminous heart",tier:"small"},{slug:"turn-up",name:"Turn Up",coins:50,usd:1,animation:"Flame burst and DBS sparks",tier:"small"},{slug:"cash-rain",name:"Cash Rain",coins:150,usd:3,animation:"Stylized bills and confetti",tier:"mid"},{slug:"bottle-pop",name:"Bottle Pop",coins:300,usd:6,animation:"Bottle pop and confetti",tier:"mid"},{slug:"money-gun",name:"Money Gun",coins:750,usd:15,animation:"Stylized cash launcher",tier:"premium"},{slug:"diamond-drip",name:"Diamond Drip",coins:1500,usd:30,animation:"Rotating diamond",tier:"premium"},{slug:"foreign-whip",name:"Foreign Whip",coins:3e3,usd:60,animation:"Original luxury vehicle drives across screen",tier:"premium"},{slug:"helicopter",name:"Helicopter",coins:5e3,usd:100,animation:"Helicopter spotlight flyover",tier:"cinematic"},{slug:"private-jet",name:"Private Jet",coins:1e4,usd:200,animation:"Jet cinematic flyover",tier:"cinematic"},{slug:"dbs-crown",name:"DBS Crown",coins:25e3,usd:500,animation:"Gold diamond crown",tier:"cinematic"},{slug:"dbs-universe",name:"DBS Universe",coins:5e4,usd:1e3,animation:"Galaxy DBS logo reveal",tier:"cinematic"}],vi=[{coins:100,usd:2},{coins:500,usd:10},{coins:1e3,usd:20},{coins:2500,usd:50},{coins:5e3,usd:100},{coins:1e4,usd:200}],Fp=750,Fi=80,Nr=20;function bi(e){return{balance:Math.max(0,Number(e==null?void 0:e.balance)||0),history:Array.isArray(e==null?void 0:e.history)?e.history:[]}}function yi(){return bi(u.coins).balance}function Gp(){return vi.map(e=>({...e}))}function Up(){return Kn.map(e=>({...e}))}function kl(e){const t=vi.find(n=>n.coins===Number(e));if(!t)return{error:"bad_package"};const s=bi(u.coins),a={at:Date.now(),amount:t.coins,note:`Bought ${t.coins} coins ($${t.usd}) · TEST MODE`,kind:"buy",packageCoins:t.coins,usd:t.usd},i={balance:s.balance+t.coins,history:[a,...s.history].slice(0,200)};return u={...u,coins:i},C(u),{ok:!0,coins:i,pack:t,entry:a}}function jn(){return Array.isArray(u.liveGiftLedger)?u.liveGiftLedger:[]}function Vp(e){var s;const t=e||((s=u.live)==null?void 0:s.id);return t?jn().filter(a=>a.liveId===t).map(a=>({id:a.id,liveId:a.liveId,giftSlug:a.giftSlug,giftName:a.giftName,coins:a.coins,usd:a.usd,fromUserId:a.fromUserId,fromUser:a.fromUser,at:a.at,animation:a.animation,tier:a.tier})):[]}function Hp(e=10,t=Date.now()){const s=Math.min(Math.max(1,Number(e)||10),10),a=new Date(t);a.setHours(0,0,0,0);const i=a.getTime(),n=new Date(t);n.setHours(23,59,59,999);const o=n.getTime(),r={};for(const d of jn()){const c=Number(d.at||0);if(c<i||c>o)continue;const p=d.fromUserId||d.fromUser||"anon",m=r[p]||{userId:p,username:d.fromUser||p,usd:0,coins:0,gifts:0,lastSlug:d.giftSlug||"rose"};m.usd=+(m.usd+Number(d.usd||0)).toFixed(2),m.coins+=Number(d.coins||0),m.gifts+=1,m.username=d.fromUser||m.username,m.lastSlug=d.giftSlug||m.lastSlug,r[p]=m}return Object.values(r).sort((d,c)=>c.usd-d.usd||c.coins-d.coins||d.username.localeCompare(c.username)).slice(0,s)}function wl(e){let s=(Vn(u.creatorWallet).earnings||[]).filter(a=>a.category==="gifts");return e&&(s=s.filter(a=>!a.hostId||a.hostId===e)),s.map(a=>({...a}))}function zp({liveId:e,slug:t}={}){const s=u.user;if(!s)return{error:"signin"};const a=u.live;if(!a||a.endedAt)return{error:"offline"};if(e&&e!==a.id)return{error:"live_mismatch"};const i=Kn.find($=>$.slug===t);if(!i)return{error:"bad_gift"};const n=bi(u.coins);if(n.balance<i.coins)return{error:"insufficient",need:i.coins,balance:n.balance};const o=R(i.usd),r=0,d=o,c=R(d*Fi/100),p=R(d-c),m=Date.now(),h="lgift_"+m.toString(36)+"_"+Math.random().toString(36).slice(2,6),g={at:m,amount:-i.coins,note:`Gift ${i.name} · ${a.title} · TEST MODE`,kind:"gift",giftSlug:i.slug,liveId:a.id,usd:o},v={balance:n.balance-i.coins,history:[g,...n.history].slice(0,200)},b={id:h,liveId:a.id,hostId:a.hostId,giftSlug:i.slug,giftName:i.name,coins:i.coins,usd:o,fees:r,net:d,creatorShare:c,platformShare:p,dbsShare:p,creatorPct:Fi,dbsPct:Nr,fromUserId:s.id,fromUser:s.username,at:m,animation:i.animation,tier:i.tier,testModeNetAsListed:!0},y={id:h,userId:s.id,username:s.username,kind:"gift",giftSlug:i.slug,label:i.name,amount:o,coins:i.coins,at:m},k={id:"lc_"+m.toString(36)+"gf",userId:s.id,username:s.username,text:`sent ${i.name} (${i.coins} coins) · TEST MODE`,at:m,support:!0,giftSlug:i.slug},S={...a,giftsTotal:R((a.giftsTotal||0)+o),giftLog:[...a.giftLog||[],y],chat:[...a.chat||[],k]},x=[b,...jn()].slice(0,500),w=Vn(u.creatorWallet),A={id:"earn_"+m.toString(36)+"_"+Math.random().toString(36).slice(2,6),category:"gifts",label:"Live gifts",note:`Live gift ${i.name} from @${s.username} · ${a.title}`,gross:o,fees:r,net:d,creatorPct:Fi,dbsPct:Nr,creatorShare:c,dbsShare:p,source:"live_gift",giftSlug:i.slug,giftId:h,liveId:a.id,hostId:a.hostId,fromUserId:s.id,at:m,payoutId:null},M={...w,available:R(w.available+c),earnings:[A,...w.earnings||[]]},q={id:"gbpop_"+m.toString(36),liveId:a.id,fromUserId:s.id,fromUser:s.username,giftSlug:i.slug,giftName:i.name,coins:i.coins,usd:o,at:m,expiresAt:m+6e4};return u={...u,coins:v,live:S,liveGiftLedger:x,creatorWallet:M,liveGbChallengePop:q},C(u),{ok:!0,entry:b,viewerEntry:y,coins:v,live:S,earning:A,creatorWallet:M,challengePop:q}}const Sl=24*60*60*1e3,Br=50;function ki(e){return{app:e!=null&&e.app&&typeof e.app=="object"?e.app:null,liveByHost:e!=null&&e.liveByHost&&typeof e.liveByHost=="object"?{...e.liveByHost}:{},history:Array.isArray(e==null?void 0:e.history)?e.history:[]}}function ea(e,t=Date.now()){return!e||typeof e!="object"?!1:(Number(e.endsAt)||0)>t}function ms(e){return e?{...e}:null}function $l(e){return"goal_"+e+"_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,6)}function Fn(e,t){if(!t)return e;const s=[{...t,archivedAt:Date.now()},...e.history||[]].slice(0,40);return{...e,history:s}}function Wp(e=Date.now()){return{id:$l("app"),scope:"app",name:"PIKK daily community goal",targetAmount:50,raised:0,endsAt:e+Sl,createdAt:e}}function Fa(e){return u={...u,dailyGoals:e},C(u),e}function Ga(e=Date.now()){let t=ki(u.dailyGoals),s=!1;return t.app&&!ea(t.app,e)&&(t={...Fn(t,t.app),app:null},s=!0),ea(t.app,e)||(t={...t,app:Wp(e)},s=!0),s&&Fa(t),t.app&&t.app.name==="DBS daily community goal"&&(t={...t,app:{...t.app,name:"PIKK daily community goal"}},Fa(t)),ms(t.app)}function Yp(e,t=Date.now()){var n,o;const s=e||((n=u.live)==null?void 0:n.hostId)||((o=u.user)==null?void 0:o.id)||null;if(!s)return null;let a=ki(u.dailyGoals);const i=a.liveByHost[s]||null;if(i&&!ea(i,t)){const r={...a.liveByHost};return delete r[s],a={...Fn(a,i),liveByHost:r},Fa(a),null}return ms(ea(i,t)?i:null)}function El({name:e,targetAmount:t}={}){const s=u.user;if(!s)return{error:"signin"};const a=String(e||"").trim().slice(0,80),i=Number(t);if(!a)return{error:"bad_name"};if(!Number.isFinite(i)||i<=0)return{error:"bad_amount"};const n=Date.now();let o=ki(u.dailyGoals);const r=o.liveByHost[s.id];r&&(o=Fn(o,r));const d={id:$l("live"),scope:"live",hostId:s.id,hostName:s.username,name:a,targetAmount:R(i),raised:0,endsAt:n+Sl,createdAt:n};return o={...o,liveByHost:{...o.liveByHost,[s.id]:d}},Fa(o),{ok:!0,goal:ms(d)}}function Ua(e,t,s={}){if(!u.user)return{error:"signin"};const i=Math.floor(Number(t));if(!Number.isFinite(i)||i<=0)return{error:"invalid_amount"};const n=String(e||"");if(!n)return{error:"unknown_goal"};const o=Date.now();let r=ki(u.dailyGoals),d=null,c=null,p=null;if(r.app&&r.app.id===n)d="app",p=r.app;else for(const[M,q]of Object.entries(r.liveByHost))if(q&&q.id===n){d="live",c=M,p=q;break}if(!p)return{error:"unknown_goal"};if(!ea(p,o))return{error:"expired"};const m=Number(p.targetAmount)||0,h=Number(p.raised)||0;if(p.completedAt||m>0&&h>=m)return{error:"completed",goal:ms(p)};let g=i;if(m>0){const M=Math.max(0,R(m-h)),q=Math.ceil(M*Br);if(q<=0)return{error:"completed",goal:ms(p)};g>q&&(g=q)}const v=bi(u.coins);if(v.balance<g)return{error:"insufficient",need:g,balance:v.balance};const b=R(g/Br),y=R(h+b),k=m>0&&y>=m?o:p.completedAt,S={...p,raised:m>0?Math.min(y,R(m)):y,...k?{completedAt:k}:{}},x=String((s==null?void 0:s.message)||"").trim().slice(0,180),w={at:o,amount:-g,note:`Goal donate · ${p.name} · $${b.toFixed(2)} · TEST MODE`,kind:"goal",goalId:p.id,...x?{message:x}:{},usd:b},A={balance:v.balance-g,history:[w,...v.history].slice(0,200)};return d==="app"?r={...r,app:S}:r={...r,liveByHost:{...r.liveByHost,[c]:S}},u={...u,dailyGoals:r,coins:A},C(u),{ok:!0,goal:ms(S),coins:A,donated:{coins:g,usd:b,requested:i,message:x}}}function Jp(e){const t=u.user,s={id:"brand_"+Date.now().toString(36),brand:String(e.brand||"").trim().slice(0,80),contact:String(e.contact||"").trim().slice(0,120),email:String(e.email||"").trim().slice(0,120),campaign:String(e.campaign||"sponsored_post").trim().slice(0,40),budget:String(e.budget||"").trim().slice(0,40),pitch:String(e.pitch||"").trim().slice(0,500),url:String(e.url||"").trim().slice(0,300),applicantUserId:(t==null?void 0:t.id)||null,status:"pending",at:Date.now()};return!s.brand||!s.email?{error:"required"}:(u={...u,brandApps:[s,...u.brandApps]},C(u),s)}function Qp(e,t){if(!["pending","approved","rejected"].includes(t))return{error:"bad_status"};const a=u.brandApps.map(i=>i.id===e?{...i,status:t,reviewedAt:Date.now()}:i);return u={...u,brandApps:a},C(u),a.find(i=>i.id===e)}function Kr(e){const t=u.user,s={id:"list_"+Date.now().toString(36),title:String(e.title||"").trim().slice(0,80),brand:String(e.brand||"").trim().slice(0,80),blurb:String(e.blurb||"").trim().slice(0,280),url:String(e.url||"").trim().slice(0,300),disclosure:String(e.disclosure||"Paid partnership · TEST MODE").trim().slice(0,120),brandAppId:e.brandAppId||null,createdBy:(t==null?void 0:t.id)||null,active:!0,at:Date.now()};return!s.title||!s.brand?{error:"required"}:(u={...u,listings:[s,...u.listings||[]]},C(u),s)}function Xp(e,t){const s=(u.listings||[]).map(a=>a.id===e?{...a,active:!!t}:a);return u={...u,listings:s},C(u),s.find(a=>a.id===e)}function Zp({activeOnly:e=!1}={}){const t=u.listings||[];return e?t.filter(s=>s.active):t}function eu(e){var s;return[((s=u.user)==null?void 0:s.id)||"guest",e].sort().join("__")}function Gn(){const e=u.user;return e?Object.values(u.threads||{}).filter(t=>{var s;return(s=t.participants)==null?void 0:s.includes(e.id)}).sort((t,s)=>(s.updatedAt||0)-(t.updatedAt||0)):[]}function Va(e){const t=u.user;if(!t||!e||e.muted||e.blocked)return 0;const s=e.lastReadAt||0;return(e.messages||[]).filter(a=>a.from!==t.id&&(a.at||0)>s).length}function yt(){return Gn().reduce((e,t)=>e+Va(t),0)}function jr(e){const t=u.user;if(!t||!e)return null;const s=u.threads[e];if(!s||!(s.participants||[]).includes(t.id))return null;const a={...s,lastReadAt:Date.now()};u={...u,threads:{...u.threads,[a.id]:a},demoUnreadSeeded:!0},C(u);try{typeof window<"u"&&window.dispatchEvent&&window.dispatchEvent(new CustomEvent("dbs:messages-unread",{detail:{count:yt()}}))}catch{}return u.threads[a.id]}function Un(){var c;const e=u.user;if(!e)return{seeded:!1};if(ma(),u.demoUnreadSeeded)return{seeded:!1,count:yt(),once:!0};if(yt()>0)return u={...u,demoUnreadSeeded:!0},C(u),{seeded:!1,count:yt()};const t="maya",s=(((c=u.profiles)==null?void 0:c.maya)||{}).username||"MayaBeats",a=Js(t,s);if(a.error)return a;const i=u.threads[a.id];if((i.messages||[]).some(p=>p.from!==e.id)){const p=(i.messages||[]).filter(b=>b.from!==e.id).map(b=>b.at||0),m=i.lastReadAt||0;if(m>=Math.max(...p,0)||m>0)return u={...u,demoUnreadSeeded:!0},C(u),{seeded:!1,count:yt()};const g=Math.min(...p),v={...i,lastReadAt:Math.max(0,g-1)};return u={...u,threads:{...u.threads,[v.id]:v},demoUnreadSeeded:!0},C(u),{seeded:!0,count:yt()}}const o=Date.now(),r=[{id:"m_demo_unread_1",from:t,fromName:s,text:"Yo — drop coming Friday. You in for the listening party?",at:o-1e3*60*12},{id:"m_demo_unread_2",from:t,fromName:s,text:"Also sent a beat pack in the vault 🔥",at:o-1e3*60*5}],d={...i,messages:[...i.messages||[],...r],updatedAt:o-1e3*60*5,lastReadAt:0,request:!1};return u={...u,threads:{...u.threads,[d.id]:d},demoUnreadSeeded:!0},C(u),{seeded:!0,count:yt()}}function xl(e){return(u.threads||{})[e]||null}function Al(e){var a;const t=u.user;if(!t||!e)return!1;const s=(a=u.profiles)==null?void 0:a[e];return s?(t.following||[]).includes(e)&&(s.following||[]).includes(t.id):!1}function ta(e){var a,i;if(!e||e.kind==="group")return"";const t=e.peerHandle||((i=(a=u.profiles)==null?void 0:a[e.peerId])==null?void 0:i.handle)||"",s=String(t).trim().replace(/^@/,"");return/^[A-Za-z0-9_]{3,30}$/.test(s)?s:""}function Js(e,t,{peerHandle:s}={}){const a=u.user;if(!a)return{error:"signin"};const i=eu(e);let n=u.threads[i];if(n){if(!n.peerHandle&&n.kind!=="group"){const o=ta({...n,peerHandle:s||""});o&&(n={...n,peerHandle:o},u={...u,threads:{...u.threads,[i]:n}},C(u))}}else{const o=e==="dbs"||Al(e);n={id:i,kind:"dm",participants:[a.id,e],peerId:e,peerName:t||e,peerHandle:"",messages:[],updatedAt:Date.now(),request:!o,muted:!1,blocked:!1},n.peerHandle=ta({...n,peerHandle:s||""}),u={...u,threads:{...u.threads,[i]:n}},C(u)}return n}function tu(e,t,s,{priority:a=!1}={}){const i=u.user;if(!i)return{error:"signin"};const n=String(s||"").trim().slice(0,500);if(!n)return{error:"empty"};const o=Js(e,t);if(o.error)return o;const r={id:"m_"+Date.now().toString(36),from:i.id,fromName:i.username,text:n,at:Date.now(),priority:!!a},d={...u.threads[o.id],messages:[...u.threads[o.id].messages||[],r],updatedAt:Date.now(),peerName:t||u.threads[o.id].peerName};if(u={...u,threads:{...u.threads,[d.id]:d}},a){const c=u.wallet||{balance:0,history:[]};u={...u,wallet:{balance:c.balance,history:[...c.history||[],{at:Date.now(),amount:0,note:"Priority message · TEST MODE $2.99 (not charged)"}]}}}return C(u),{thread:u.threads[d.id],message:r}}function ma(){const e={...u.profiles||{}};let t=!1;e.maya||(e.maya={id:"maya",username:"MayaBeats",bio:"Creator · beats & live demos",avatar:"",followers:[],following:["dbs"],verified:!1},t=!0),e.fanjay||(e.fanjay={id:"fanjay",username:"FanJay",bio:"Day-one fan · playlist curator",avatar:"",followers:[],following:["dbs"],verified:!1},t=!0);const s=u.user;if(s){const a={...e.maya},i=new Set(a.following||[]),n=new Set(a.followers||[]);i.has(s.id)||(i.add(s.id),t=!0),n.has(s.id)||(n.add(s.id),t=!0),a.following=[...i],a.followers=[...n],e.maya=a;let o=s;(s.following||[]).includes("maya")||(o={...s,following:[...s.following||[],"maya"]},t=!0),t&&(u={...u,user:o,profiles:e},ut(o),C(u))}else t&&(u={...u,profiles:e},C(u));return[{id:"dbs",username:"DatBoiSkeet",team:!0,bio:(u.profiles.dbs||{}).bio||""},{id:"maya",username:u.profiles.maya.username,team:!1,bio:u.profiles.maya.bio},{id:"fanjay",username:u.profiles.fanjay.username,team:!1,bio:u.profiles.fanjay.bio}]}function su(e,t=[]){const s=u.user;if(!s)return{error:"signin"};const a=String(e).trim().slice(0,60)||"Group",i=[...new Set([s.id,...t.filter(Boolean)])],n=a.toLowerCase().replace(/\W+/g,"_").slice(0,24)||"group",o=n==="dbs_fans"?"group_dbs_fans":"group_"+n+"_"+String(s.id).slice(-4);let r=u.threads[o];if(!r)r={id:o,kind:"group",peerId:o,peerName:a,participants:i,memberIds:i,messages:[],updatedAt:Date.now(),muted:!1,blocked:!1},u={...u,threads:{...u.threads,[o]:r}},C(u);else if(s&&!(r.participants||[]).includes(s.id)){const d=[...new Set([...r.participants||[],s.id])],c=[...new Set([...r.memberIds||d,s.id])];r={...r,participants:d,memberIds:c},u={...u,threads:{...u.threads,[o]:r}},C(u)}return u.threads[o]}function au(){return u.user?(ma(),su("DBS Fans",["dbs","maya","fanjay"])):{error:"signin"}}function iu(e,t){const s=u.user;if(!s)return{error:"signin"};const a=u.threads[e];if(!a||a.kind!=="group")return{error:"not_group"};if(!(a.participants||[]).includes(s.id))return{error:"forbidden"};const i=String(t||"").trim().slice(0,500);if(!i)return{error:"empty"};const n={id:"m_"+Date.now().toString(36),from:s.id,fromName:s.username,text:i,at:Date.now(),priority:!1},o={...a,messages:[...a.messages||[],n],updatedAt:Date.now()};return u={...u,threads:{...u.threads,[o.id]:o}},C(u),{thread:u.threads[o.id],message:n}}function Gi(e,t={}){const s=u.threads[e];if(!s)return{error:"missing"};const a={...s,muted:t.muted!==void 0?!!t.muted:!!s.muted,blocked:t.blocked!==void 0?!!t.blocked:!!s.blocked,reportedAt:t.report?Date.now():s.reportedAt||null};return u={...u,threads:{...u.threads,[a.id]:a}},C(u),a}function Fr(e={}){const t={...u.messagePrefs||{allowDMs:!0,allowRequests:!0},...e};return u={...u,messagePrefs:t},C(u),t}const Gt={gifts:{creatorPct:80,dbsPct:20,label:"Live gifts"},tips:{creatorPct:90,dbsPct:10,label:"Tips"},subscriptions:{creatorPct:85,dbsPct:15,label:"Subscriptions"},paid_content:{creatorPct:85,dbsPct:15,label:"Paid content"},referrals:{creatorPct:85,dbsPct:15,label:"Referrals"},clippers:{creatorPct:80,dbsPct:20,label:"Clippers"},sponsorships:{creatorPct:80,dbsPct:20,label:"Sponsorships"},merch:{creatorPct:85,dbsPct:15,label:"Merch / affiliate"}},nu=[{category:"gifts",gross:40,note:"Live gifts · demo week"},{category:"tips",gross:22.5,note:"Live tips · demo week"},{category:"subscriptions",gross:29.99,note:"PIKK+ fan sub · demo"},{category:"referrals",gross:15,note:"Refer & Earn milestone · demo"},{category:"clippers",gross:50,note:"Clippers campaign payout · demo"},{category:"sponsorships",gross:100,note:"Sponsored livestream · demo"},{category:"merch",gross:35,note:"Foreign X-Change affiliate · demo"}];function R(e){return Math.round(Number(e)*100)/100}function Vn(e){const t=zs().creatorWallet;return!e||typeof e!="object"?{...t}:{...t,...e,available:R(e.available??0),holds:R(e.holds??0),threshold:Number(e.threshold)>0?Number(e.threshold):25,verification:e.verification==="demo_verified"?"demo_verified":"demo_unverified",earnings:Array.isArray(e.earnings)?e.earnings:[],payouts:Array.isArray(e.payouts)?e.payouts:[]}}function Pt(){const e=Vn(u.creatorWallet);return u.creatorWallet!==e&&(u={...u,creatorWallet:e}),e}function Tl({category:e,gross:t,note:s,source:a="demo",at:i=Date.now()}){const n=Gt[e]||Gt.tips,o=R(Math.max(0,Number(t)||0)),r=R(o*.029+(o>0?.3:0)),d=R(Math.max(0,o-r)),c=R(d*n.creatorPct/100),p=R(d-c);return{id:"earn_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,6),category:e,label:n.label,note:String(s||n.label).slice(0,120),gross:o,fees:r,net:d,creatorPct:n.creatorPct,dbsPct:n.dbsPct,creatorShare:c,dbsShare:p,source:a,at:i,payoutId:null}}function ru(){return{...Gt}}function sa(){return Pt()}function Hn(e){const t=Tl(e),s=Pt(),a={...s,available:R(s.available+t.creatorShare),earnings:[t,...s.earnings||[]]};return u={...u,creatorWallet:a},C(u),t}function Cl({force:e=!1}={}){const t=Pt();if(!e&&(t.earnings||[]).length>0)return{skipped:!0,creatorWallet:t};const s=Date.now()-6*864e5,i=nu.map((r,d)=>Tl({category:r.category,gross:r.gross,note:r.note,source:"seed",at:s+d*36e5})).map((r,d)=>({...r,id:"earn_seed_"+d+"_"+r.category})),n=R(i.reduce((r,d)=>r+d.creatorShare,0)),o={...t,available:e?n:R(t.available+n),earnings:e?i:[...i,...t.earnings||[]],holds:e?0:t.holds,payouts:e?[]:t.payouts};return e&&(o.available=n,o.holds=0,o.payouts=[],o.earnings=i),u={...u,creatorWallet:o},C(u),{seeded:i.length,creatorWallet:o}}function ou({amount:e}={}){const t=Pt(),s=(t.payouts||[]).find(h=>h.status==="pending");if(s)return{error:"pending_exists",pending:s};const a=R(t.available);if(a<t.threshold)return{error:"below_threshold",available:a,threshold:t.threshold};const i=e!=null?R(e):a;if(i<=0||i>a)return{error:"bad_amount"};const n=(t.earnings||[]).filter(h=>!h.payoutId).sort((h,g)=>h.at-g.at),o=[];let r=0;for(const h of n){const g=R(h.creatorShare);if(!(g<=0)&&!(R(r+g)>i)&&(o.push(h.id),r=R(r+g),r>=i))break}if(!o.length){const h=n.find(g=>R(g.creatorShare)>0);if(!h)return{error:"no_earnings"};if(R(h.creatorShare)>a)return{error:"bad_amount"};o.push(h.id),r=R(h.creatorShare)}const d=r,c={id:"po_"+Date.now().toString(36),amount:d,status:"pending",at:Date.now(),earningIds:o,note:"TEST MODE payout request · not real money"},p=(t.earnings||[]).map(h=>o.includes(h.id)?{...h,payoutId:c.id}:h),m={...t,available:R(a-d),holds:R(t.holds+d),earnings:p,payouts:[c,...t.payouts||[]]};return u={...u,creatorWallet:m},C(u),c}function lu(e,t){if(!["pending","completed","rejected"].includes(t))return{error:"bad_status"};const a=Pt(),i=(a.payouts||[]).find(p=>p.id===e);if(!i)return{error:"missing"};if(i.status!=="pending"&&t!=="pending")return{error:"already_final",payout:i};let n=a.available,o=a.holds,r=a.earnings||[];if(i.status==="pending"&&t==="completed")o=R(Math.max(0,o-i.amount));else if(i.status==="pending"&&t==="rejected"){o=R(Math.max(0,o-i.amount)),n=R(n+i.amount);const p=new Set(i.earningIds||[]);r=r.map(m=>p.has(m.id)?{...m,payoutId:null}:m)}const d=a.payouts.map(p=>p.id===e?{...p,status:t,reviewedAt:Date.now()}:p),c={...a,available:n,holds:o,earnings:r,payouts:d};return u={...u,creatorWallet:c},C(u),d.find(p=>p.id===e)}function cu(e){const s={...Pt(),verification:e?"demo_verified":"demo_unverified"};return u={...u,creatorWallet:s},C(u),s}function zn(){const e=Pt(),t={};for(const s of Object.keys(Gt))t[s]={category:s,label:Gt[s].label,creatorPct:Gt[s].creatorPct,dbsPct:Gt[s].dbsPct,gross:0,fees:0,net:0,creatorShare:0,dbsShare:0,count:0};for(const s of e.earnings||[]){const a=t[s.category]||(t[s.category]={category:s.category,label:s.label||s.category,creatorPct:s.creatorPct,dbsPct:s.dbsPct,gross:0,fees:0,net:0,creatorShare:0,dbsShare:0,count:0});a.gross=R(a.gross+s.gross),a.fees=R(a.fees+s.fees),a.net=R(a.net+s.net),a.creatorShare=R(a.creatorShare+s.creatorShare),a.dbsShare=R(a.dbsShare+s.dbsShare),a.count+=1}return Object.values(t)}function Ha(e=5,t="Demo credit"){const s=u.wallet||{balance:0,history:[]},a=Number(s.balance||0)+Number(e),i=[...s.history||[],{at:Date.now(),amount:Number(e),note:t}];return u={...u,wallet:{balance:a,history:i}},C(u),u.wallet}function Pl(e,t="Demo spend"){const s=u.wallet||{balance:0,history:[]},a=Number(e);if(Number(s.balance||0)<a)return{error:"insufficient"};const i=Number(s.balance||0)-a,n=[...s.history||[],{at:Date.now(),amount:-a,note:t}];return u={...u,wallet:{balance:i,history:n}},C(u),u.wallet}function F(e,t){return String(e||"").toLowerCase().includes(t)}function du(e){const t=String(e||"").trim().toLowerCase(),s={query:String(e||"").trim(),posts:[],profiles:[],music:[],videos:[],lives:[],products:[],pictures:[]};if(!t)return s;const a=(u.posts||[]).filter(h=>F(h.text,t)||F(h.username,t)),i=Object.values(u.profiles||{}).filter(h=>F(h.username,t)||F(h.bio,t));if(u.user){const h=u.user;(F(h.username,t)||F(h.bio,t))&&(i.find(g=>g.id===h.id)||i.push(h))}const n=(u.catalog||[]).filter(h=>h.published),o=n.filter(h=>(h.type==="song"||h.type==="album")&&(F(h.title,t)||F(h.artist,t)||F(h.type,t))),r=n.filter(h=>h.type==="video"&&(F(h.title,t)||F(h.artist,t)||F("video",t))),d=n.filter(h=>h.type==="picture"&&(F(h.title,t)||F(h.artist,t)||F("picture",t))),c=[],p=u.live;p&&!p.endedAt&&(F(p.title,t)||F(p.hostName,t)||F("live",t))&&c.push({...p,status:"live"}),(u.liveHistory||[]).forEach(h=>{(F(h.title,t)||F(h.hostName,t)||F("live",t))&&c.push({...h,status:"ended"})});const m=(u.listings||[]).filter(h=>h.active!==!1&&(F(h.title,t)||F(h.brand,t)||F(h.blurb,t)||F("marketplace",t)||F("product",t)));return{query:String(e||"").trim(),posts:a,profiles:i,music:o,videos:r,lives:c,products:m,pictures:d}}function pu(e=8){const t=u.likes||{},s=(u.posts||[]).map(r=>({kind:"post",id:r.id,title:(r.text||"").slice(0,72)||"Post",subtitle:"@"+(r.username||"creator"),href:"#/posts",score:(t[r.id]||[]).length,image:r.image||""})).sort((r,d)=>d.score-r.score||(d.id>r.id?1:-1)),a=[{kind:"music",id:"trend_music",title:"Long Story Short",subtitle:"Coming Soon · Music",href:"#/music",score:3,image:"/music/01_Long_Story_Short_Coming_Soon.jpg"},{kind:"video",id:"trend_video",title:"Dirty Money ft. Lil Baby",subtitle:"Official MV",href:"#/videos",score:3,image:""},{kind:"live",id:"trend_live",title:"Go live on DBS",subtitle:"Creators · Live",href:"#/live",score:2,image:""},{kind:"market",id:"trend_mkt",title:"Sponsored Marketplace",subtitle:"Brand ads · demo",href:"#/marketplace",score:2,image:""},{kind:"spotlight",id:"trend_spot",title:"24/7 Spotlight",subtitle:"Stage · Discover",href:"#/spotlight",score:1,image:""}],i=u.live;return i&&!i.endedAt&&a.unshift({kind:"live",id:"trend_live_now",title:i.title||"Live now",subtitle:"@"+(i.hostName||"creator")+" · LIVE",href:"#/live",score:99,image:""}),(u.catalog||[]).filter(r=>r.published).slice(0,3).forEach(r=>{const d=r.type==="video"?"#/videos":r.type==="picture"?"#/home":"#/music";a.push({kind:r.type,id:"trend_cat_"+r.id,title:r.title,subtitle:(r.artist||"Admin")+" · From Admin",href:d,score:4,image:r.coverRef&&!String(r.coverRef).startsWith("idb:")?r.coverRef:""})}),[...s,...a].sort((r,d)=>d.score-r.score).slice(0,e)}function uu(){const e=Object.values(u.profiles||{}).map(t=>({id:t.id,username:t.username,bio:t.bio||"",avatar:t.avatar||"",verified:!!t.verified,followers:(t.followers||[]).length}));return u.user&&!e.find(t=>t.id===u.user.id)&&e.push({id:u.user.id,username:u.user.username,bio:u.user.bio||"",avatar:u.user.avatar||"",verified:!!u.user.verified,followers:(u.user.followers||[]).length}),e.sort((t,s)=>s.followers-t.followers||t.username.localeCompare(s.username))}const Il=6e4,Ui=10;function Ml(e=Date.now()){const t=new Date(e);return t.setHours(23,59,59,999),t.getTime()}function mu(e=Date.now()){const t=new Date(e);return t.setHours(0,0,0,0),t.getTime()}const Ll=[{id:"fan_maya",name:"MayaBeats",bio:"Demo fan · mutual"},{id:"fan_jay",name:"FanJay",bio:"Demo fan · sandbox opponent"}];function ve(){return u.giftBattles||{active:null,history:[],champions:[],prefs:{invitationsEnabled:!0}}}function es(e){return u={...u,giftBattles:e},C(u),e}function Wn(e,t=Date.now()){if(!e||e.status!=="active"||t<(e.endsAt||0))return e;const s=Number(e.scoreA||0),a=Number(e.scoreB||0);let i="tie",n=null,o=null;return s>a?(i="win",n=e.challenger.id,o=e.challenger.name):a>s&&(i="win",n=e.opponent.id,o=e.opponent.name),{...e,status:"ended",endedAt:t,result:i,winnerId:n,winnerName:o,scoreA:s,scoreB:a,championUntil:n?Ml(t):null}}function Dl(){return Ll.map(e=>({...e}))}function Yn(){return{invitationsEnabled:!0,...ve().prefs||{}}}function hu(e={}){const t=ve(),s={...t.prefs,...e};return es({...t,prefs:s})}function Jn(){let t=ve().active;if(!t)return null;if(t.status==="active"){const s=Wn(t);if(s!==t&&s.status==="ended")return Qn(s);t=s}return t}function Qn(e){const t=ve(),s=[e,...(t.history||[]).filter(i=>i.id!==e.id)].slice(0,40);let a=t.champions||[];return e.winnerId&&(a=[{battleId:e.id,userId:e.winnerId,username:e.winnerName,score:e.winnerId===e.challenger.id?e.scoreA:e.scoreB,opponentScore:e.winnerId===e.challenger.id?e.scoreB:e.scoreA,endedAt:e.endedAt,championUntil:e.championUntil,mode:e.mode},...a.filter(n=>n.battleId!==e.id)].slice(0,30)),es({...t,active:e,history:s,champions:a}),e}function fu({opponentId:e,opponentName:t,mode:s}={}){const a=u.user;if(!a)return{error:"signin"};if(!Yn().invitationsEnabled)return{error:"invites_disabled"};const n=u.live&&!u.live.endedAt,o=s||(n?"live":"sandbox");if(o==="live"&&!n)return{error:"not_live"};const r=ve(),d=r.active;if(d&&(d.status==="pending"||d.status==="active"))return{error:"battle_in_progress",battle:d};const c=Ll.find(h=>h.id===e),p={id:e||(c==null?void 0:c.id)||"fan_maya",name:t||(c==null?void 0:c.name)||"MayaBeats"};if(p.id===a.id)return{error:"self"};const m={id:"gb_"+Date.now().toString(36),status:"pending",mode:o,liveId:n?u.live.id:null,liveTitle:n?u.live.title:null,challenger:{id:a.id,name:a.username},opponent:p,createdAt:Date.now(),startedAt:null,endsAt:null,durationMs:Il,scoreA:0,scoreB:0,giftLog:[],result:null,winnerId:null,winnerName:null,endedAt:null,championUntil:null};return es({...r,active:m}),{battle:m}}function gu(){const e=ve(),t=e.active;if(!t||t.status!=="pending")return{error:"no_pending"};if(!Yn().invitationsEnabled)return{error:"invites_disabled"};const s=Date.now(),a={...t,status:"active",startedAt:s,endsAt:s+(t.durationMs||Il),scoreA:0,scoreB:0};return es({...e,active:a}),{battle:a}}function vu(){const e=ve(),t=e.active;if(!t||t.status!=="pending")return{error:"no_pending"};const s={...t,status:"declined",endedAt:Date.now(),result:"declined"},a=[s,...e.history||[]].slice(0,40);return es({...e,active:null,history:a}),{battle:s}}function bu(){const e=ve(),t=e.active;return t&&(t.status==="pending"||t.status==="active")?{error:"still_running",battle:t}:(es({...e,active:null}),{ok:!0})}function yu(e=Date.now()){const t=u.liveGbChallengePop;return t?t.expiresAt&&e>t.expiresAt?(u={...u,liveGbChallengePop:null},C(u),null):!u.live||u.live.endedAt||t.liveId&&t.liveId!==u.live.id?null:{...t}:null}function ku({side:e="challenger",kind:t="gift",amount:s=2,label:a=""}={}){var b;if(!u.user)return{error:"signin"};let n=Jn();if(!n||n.status!=="active")return{error:"no_active"};if(n=ve().active,!n||n.status!=="active")return{error:"ended"};const o=Math.max(.5,Number(s)||1),r=t==="tip"?"tip":"gift",d=e==="opponent",c=d?n.opponent:n.challenger;let p=null;if(n.mode==="live"&&!d){if(p=bl({kind:r,amount:o,label:a||(r==="gift"?"🔥 Fire":"Tip")}),p!=null&&p.error)return p}else(((b=u.wallet)==null?void 0:b.balance)||0)>=o&&Pl(o,`Gift battle ${r} · ${c.name} · TEST MODE`);const m={id:"gbg_"+Date.now().toString(36),side:d?"opponent":"challenger",userId:c.id,username:c.name,kind:r,amount:o,label:(a||(r==="gift"?"🔥 Fire":"Tip")).slice(0,40),at:Date.now()},h=Number(n.scoreA||0)+(d?0:o),g=Number(n.scoreB||0)+(d?o:0);let v={...n,scoreA:+h.toFixed(2),scoreB:+g.toFixed(2),giftLog:[...n.giftLog||[],m]};return v=Wn(v),v.status==="ended"?Qn(v):es({...ve(),active:v}),{battle:v,entry:m,live:(p==null?void 0:p.live)||null,wallet:u.wallet}}function Xn(){const t=ve().active;if(!t||t.status!=="active")return t;const s=Wn(t);return s.status==="ended"&&t.status!=="ended"?Qn(s):s}function wu(e=20){return(ve().history||[]).slice(0,e)}function Su(e=Date.now()){const t=ve(),s=t.active;return s&&s.status==="ended"&&s.winnerId&&s.championUntil&&e<s.championUntil?{battleId:s.id,userId:s.winnerId,username:s.winnerName,score:s.winnerId===s.challenger.id?s.scoreA:s.scoreB,endedAt:s.endedAt,championUntil:s.championUntil,mode:s.mode}:(t.champions||[]).find(i=>i.championUntil&&e<i.championUntil)||null}function $u(e=15){var s;const t={};for(const a of ve().history||[]){if(a.result!=="win"||!a.winnerId)continue;const i=t[a.winnerId]||{userId:a.winnerId,username:a.winnerName,wins:0,points:0};i.wins+=1;const n=a.winnerId===((s=a.challenger)==null?void 0:s.id)?Number(a.scoreA||0):Number(a.scoreB||0);i.points=+(i.points+n).toFixed(2),i.username=a.winnerName||i.username,t[a.winnerId]=i}return Object.values(t).sort((a,i)=>i.wins-a.wins||i.points-a.points||a.username.localeCompare(i.username)).slice(0,e)}function Zn(e=Ui,t=Date.now()){var d;const s=Math.min(Math.max(1,Number(e)||Ui),Ui),a=mu(t),i=Ml(t),n=new Set,o=[],r=c=>{if(!(c!=null&&c.userId)||!(c!=null&&c.username)||n.has(c.userId))return;const p=Number(c.endedAt||0);p<a||p>i||c.championUntil&&t>c.championUntil||(n.add(c.userId),o.push({userId:c.userId,username:c.username,score:Number(c.score||0),endedAt:p,championUntil:c.championUntil||i,battleId:c.battleId||c.id||null,mode:c.mode||"demo"}))};for(const c of ve().champions||[])if(r(c),o.length>=s)return o;for(const c of ve().history||[])if(!(c.result!=="win"||!c.winnerId)&&(r({userId:c.winnerId,username:c.winnerName,score:c.winnerId===((d=c.challenger)==null?void 0:d.id)?c.scoreA:c.scoreB,endedAt:c.endedAt,championUntil:c.championUntil||i,battleId:c.id,mode:c.mode}),o.length>=s))break;return o}const er=4,pn=[{id:"maya",username:"MayaBeats",bio:"Creator · beats & live demos"},{id:"fanjay",username:"FanJay",bio:"Day-one fan · playlist curator"},{id:"ria",username:"RiaLoops",bio:"Demo co-host · loops & hooks"},{id:"dez",username:"DezOnMic",bio:"Demo guest · freestyle nights"}];function Oe(){return u.multiGuest||{active:null,history:[]}}function Ye(e){return u={...u,multiGuest:e},C(u),e}function ha(e,t){const s=[e,...t],a=s.length||1,i=Math.floor(100/a*100)/100,n={};let o=0;return s.forEach((r,d)=>{d===s.length-1?n[r]=+(100-o).toFixed(2):(n[r]=i,o=+(o+i).toFixed(2))}),n}function wi(){ma();const e={...u.profiles||{}};let t=!1;for(const s of pn)e[s.id]||(e[s.id]={id:s.id,username:s.username,bio:s.bio,avatar:"",followers:[],following:["dbs"],verified:!1},t=!0);return t&&(u={...u,profiles:e},C(u)),pn.map(s=>{const a=u.profiles[s.id]||s;return{id:s.id,username:a.username||s.username,bio:a.bio||s.bio,followers:(a.followers||[]).length}})}function Eu(){return wi()}function aa(){return Oe().active||null}function xu(e=20){return(Oe().history||[]).slice(0,e)}function Au(e){const t=u.user;if(!t)return{error:"signin"};const s=Oe();if(s.active&&!s.active.endedAt)return{error:"session_in_progress",session:s.active};const a=String(e||"").trim().slice(0,80)||"Multi-Guest Live";wi();const i={id:"mg_"+Date.now().toString(36),title:a,hostId:t.id,hostName:t.username,startedAt:Date.now(),endedAt:null,maxGuests:er,guests:[],chat:[{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:"Multi-guest session started · TEST MODE · no camera / WebRTC",at:Date.now(),system:!0}],giftSplit:{mode:"equal",shares:{[t.id]:100},disclosed:!1,disclosedAt:null},broadcastReady:!1};return Ye({...s,active:i}),{session:i}}function Tu(e){var h;const t=u.user;if(!t)return{error:"signin"};const s=Oe(),a=s.active;if(!a||a.endedAt)return{error:"no_session"};if(a.hostId!==t.id)return{error:"host_only"};wi();const i=pn.find(g=>g.id===e),n=(h=u.profiles)==null?void 0:h[e];if(!i&&!n)return{error:"unknown_guest"};if(e===t.id||e===a.hostId)return{error:"self"};const o=(a.guests||[]).find(g=>g.id===e);if(o&&(o.status==="invited"||o.status==="joined"))return{error:"already_invited",session:a};if((a.guests||[]).filter(g=>g.status==="joined"||g.status==="invited").length>=(a.maxGuests||er))return{error:"full"};const d={id:e,username:(n==null?void 0:n.username)||(i==null?void 0:i.username)||e,status:"invited",muted:!1,invitedAt:Date.now(),joinedAt:null},c=[...(a.guests||[]).filter(g=>g.id!==e),d],p=[...a.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`Invited @${d.username} to the stage`,at:Date.now(),system:!0}].slice(-80),m={...a,guests:c,chat:p,broadcastReady:!1};return m.giftSplit={...m.giftSplit,disclosed:!1,disclosedAt:null,shares:ha(a.hostId,c.filter(g=>g.status==="joined").map(g=>g.id))},Ye({...s,active:m}),{session:m,guest:d}}function Cu(e){var p;const t=u.user;if(!t)return{error:"signin"};const s=Oe(),a=s.active;if(!a||a.endedAt)return{error:"no_session"};if(a.hostId!==t.id)return{error:"host_only"};const i=(a.guests||[]).map(m=>({...m})),n=i.findIndex(m=>m.id===e);if(n<0)return{error:"not_found"};if(i[n].status==="joined")return{session:a,guest:i[n]};if(i.filter(m=>m.status==="joined").length>=(a.maxGuests||er))return{error:"full"};i[n]={...i[n],status:"joined",joinedAt:Date.now(),muted:!1};const r=i.filter(m=>m.status==="joined").map(m=>m.id),d=[...a.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`@${i[n].username} joined the stage`,at:Date.now(),system:!0}].slice(-80),c={...a,guests:i,chat:d,broadcastReady:!1,giftSplit:{mode:((p=a.giftSplit)==null?void 0:p.mode)||"equal",shares:ha(a.hostId,r),disclosed:!1,disclosedAt:null}};return Ye({...s,active:c}),{session:c,guest:i[n]}}function Pu(e){var d;const t=u.user;if(!t)return{error:"signin"};const s=Oe(),a=s.active;if(!a||a.endedAt)return{error:"no_session"};if(a.hostId!==t.id)return{error:"host_only"};const i=(a.guests||[]).map(c=>c.id===e?{...c,status:"declined"}:c);if(!(a.guests||[]).some(c=>c.id===e))return{error:"not_found"};const n=((d=(a.guests||[]).find(c=>c.id===e))==null?void 0:d.username)||e,o=[...a.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`@${n} declined the invite`,at:Date.now(),system:!0}].slice(-80),r={...a,guests:i,chat:o};return Ye({...s,active:r}),{session:r}}function Iu(e){var c,p;const t=u.user;if(!t)return{error:"signin"};const s=Oe(),a=s.active;if(!a||a.endedAt)return{error:"no_session"};if(a.hostId!==t.id&&t.id!==e)return{error:"forbidden"};const i=(a.guests||[]).map(m=>m.id===e?{...m,status:"left",muted:!1}:m);if(!(a.guests||[]).some(m=>m.id===e))return{error:"not_found"};const n=((c=(a.guests||[]).find(m=>m.id===e))==null?void 0:c.username)||e,o=i.filter(m=>m.status==="joined").map(m=>m.id),r=[...a.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`@${n} left the stage`,at:Date.now(),system:!0}].slice(-80),d={...a,guests:i,chat:r,broadcastReady:!1,giftSplit:{mode:((p=a.giftSplit)==null?void 0:p.mode)||"equal",shares:ha(a.hostId,o),disclosed:!1,disclosedAt:null}};return Ye({...s,active:d}),{session:d}}function Mu(e){var c,p;const t=u.user;if(!t)return{error:"signin"};const s=Oe(),a=s.active;if(!a||a.endedAt)return{error:"no_session"};if(a.hostId!==t.id)return{error:"host_only"};const i=(a.guests||[]).map(m=>m.id===e?{...m,status:"removed",muted:!1}:m);if(!(a.guests||[]).some(m=>m.id===e))return{error:"not_found"};const n=((c=(a.guests||[]).find(m=>m.id===e))==null?void 0:c.username)||e,o=i.filter(m=>m.status==="joined").map(m=>m.id),r=[...a.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`Host removed @${n} from the stage`,at:Date.now(),system:!0}].slice(-80),d={...a,guests:i,chat:r,broadcastReady:!1,giftSplit:{mode:((p=a.giftSplit)==null?void 0:p.mode)||"equal",shares:ha(a.hostId,o),disclosed:!1,disclosedAt:null}};return Ye({...s,active:d}),{session:d}}function Lu(e,t=!0){var c;const s=u.user;if(!s)return{error:"signin"};const a=Oe(),i=a.active;if(!i||i.endedAt)return{error:"no_session"};if(i.hostId!==s.id)return{error:"host_only"};const n=(i.guests||[]).map(p=>p.id===e&&p.status==="joined"?{...p,muted:!!t}:p);if(!(i.guests||[]).some(p=>p.id===e&&p.status==="joined"))return{error:"not_joined"};const o=((c=(i.guests||[]).find(p=>p.id===e))==null?void 0:c.username)||e,r=[...i.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:t?`Host muted @${o}`:`Host unmuted @${o}`,at:Date.now(),system:!0}].slice(-80),d={...i,guests:n,chat:r};return Ye({...a,active:d}),{session:d}}function Du(e){const t=u.user;if(!t)return{error:"signin"};const s=Oe(),a=s.active;if(!a||a.endedAt)return{error:"no_session"};const i=String(e||"").trim().slice(0,280);if(!i)return{error:"empty"};const n={id:"c_"+Date.now().toString(36),userId:t.id,username:t.username,text:i,at:Date.now()},o=[...a.chat||[],n].slice(-80),r={...a,chat:o};return Ye({...s,active:r}),{session:r,message:n}}function js({mode:e="equal",shares:t=null,disclose:s=!1}={}){var h,g;const a=u.user;if(!a)return{error:"signin"};const i=Oe(),n=i.active;if(!n||n.endedAt)return{error:"no_session"};if(n.hostId!==a.id)return{error:"host_only"};const o=(n.guests||[]).filter(v=>v.status==="joined").map(v=>v.id),r=[n.hostId,...o];let d,c=e==="custom"?"custom":"equal";if(c==="equal")d=ha(n.hostId,o);else{d={};let v=0;for(const b of r){const y=Math.max(0,Number(t==null?void 0:t[b])||0);d[b]=+y.toFixed(2),v+=d[b]}if(v=+v.toFixed(2),Math.abs(v-100)>.05)return{error:"split_total",total:v,expected:100}}const p={mode:c,shares:d,disclosed:!!s||!!((h=n.giftSplit)!=null&&h.disclosed),disclosedAt:s?Date.now():((g=n.giftSplit)==null?void 0:g.disclosedAt)||null};s&&(p.disclosed=!0),s&&(p.disclosedAt=Date.now());const m={...n,giftSplit:p,broadcastReady:!!p.disclosed};return Ye({...i,active:m}),{session:m}}function _u(){var e,t,s,a;return js({mode:((t=(e=aa())==null?void 0:e.giftSplit)==null?void 0:t.mode)||"equal",shares:((a=(s=aa())==null?void 0:s.giftSplit)==null?void 0:a.shares)||null,disclose:!0})}function Ou(){const e=u.user;if(!e)return{error:"signin"};const t=Oe(),s=t.active;if(!s||s.endedAt)return{error:"no_session"};if(s.hostId!==e.id)return{error:"host_only"};const a={...s,endedAt:Date.now(),broadcastReady:!1},i=[a,...(t.history||[]).filter(n=>n.id!==a.id)].slice(0,20);return Ye({active:null,history:i}),{session:a}}const _l=["song","album","video","live","app","interview"],tr=["draft","active","paused","ended"];function ts(e){if(!e||typeof e!="object")return null;const t=e.fundSource==="third_party"?"third_party":"dbs",s=_l.includes(e.promoteType)?e.promoteType:"app",a=tr.includes(e.status)?e.status:"draft",i=Number(e.deadline)||0;return{id:String(e.id||""),title:String(e.title||"").slice(0,120),promoteType:s,budget:Math.max(0,Number(e.budget)||0),deadline:i,fundSource:t,managementFeePct:t==="third_party"?20:0,reward:String(e.reward||"").slice(0,200),status:a,participants:Array.isArray(e.participants)?e.participants:[],submissions:Array.isArray(e.submissions)?e.submissions:[],createdAt:Number(e.createdAt)||Date.now(),createdBy:e.createdBy||null}}function Ss(e){u={...u,missions:e},C(u)}function Si({status:e=null}={}){const t=(u.missions||[]).map(ts).filter(Boolean);if(!e)return t;const s=Array.isArray(e)?e:[e];return t.filter(a=>s.includes(a.status))}function qu(e){return Si().find(t=>t.id===e)||null}function Ru(e={}){var r;const t=String(e.title||"").trim().slice(0,120);if(!t)return{error:"required"};const s=_l.includes(e.promoteType)?e.promoteType:"app",a=e.fundSource==="third_party"?"third_party":"dbs";let i=e.deadline;if(typeof i=="string"&&i){const d=Date.parse(i);i=Number.isFinite(d)?d:Date.now()+7*864e5}else i=Number(i)||Date.now()+7*864e5;const n=tr.includes(e.status)?e.status:"active",o=ts({id:"msn_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),title:t,promoteType:s,budget:Number(e.budget)||0,deadline:i,fundSource:a,reward:String(e.reward||"").trim().slice(0,200)||"Demo reward · TEST MODE",status:n,participants:[],submissions:[],createdAt:Date.now(),createdBy:((r=u.user)==null?void 0:r.id)||"demo_admin"});return Ss([o,...u.missions||[]]),o}function Nu(e,t){if(!tr.includes(t))return{error:"bad_status"};let s=null;const a=(u.missions||[]).map(i=>{const n=ts(i);return!n||n.id!==e?i:(s={...n,status:t},s)});return s?(Ss(a),s):{error:"not_found"}}function Bu(e){const t=u.user;if(!t)return{error:"signin"};let s=null;const a=(u.missions||[]).map(i=>{const n=ts(i);if(!n||n.id!==e)return i;if(n.status!=="active")return s={error:"not_active",mission:n},i;if((n.participants||[]).some(d=>d.userId===t.id))return s={error:"already_joined",mission:n},i;const r={userId:t.id,username:t.username||"creator",joinedAt:Date.now(),score:0,referralCode:"REF-"+t.id.slice(0,6).toUpperCase()+"-"+Math.random().toString(36).slice(2,5).toUpperCase()};return s={...n,participants:[...n.participants||[],r]},s});return s?(s.error||Ss(a),s):{error:"not_found"}}function Ku(e,{proof:t=""}={}){const s=u.user;if(!s)return{error:"signin"};const a=String(t||"").trim().slice(0,400);if(!a)return{error:"required"};let i=null;const n=(u.missions||[]).map(o=>{const r=ts(o);if(!r||r.id!==e)return o;if(r.status!=="active")return i={error:"not_active",mission:r},o;if(!(r.participants||[]).some(m=>m.userId===s.id))return i={error:"not_joined",mission:r},o;const c={id:"sub_"+Date.now().toString(36)+Math.random().toString(36).slice(2,5),userId:s.id,username:s.username||"creator",proof:a,at:Date.now(),status:"pending"},p=(r.participants||[]).map(m=>m.userId===s.id?{...m,score:(Number(m.score)||0)+10}:m);return i={...r,participants:p,submissions:[c,...r.submissions||[]]},i});return i?(i.error||Ss(n),i):{error:"not_found"}}function ju(e,t=5){const s=u.user;if(!s)return{error:"signin"};const a=Math.max(1,Math.min(50,Number(t)||5));let i=null;const n=(u.missions||[]).map(o=>{const r=ts(o);if(!r||r.id!==e)return o;if(!(r.participants||[]).some(p=>p.userId===s.id))return i={error:"not_joined",mission:r},o;const c=(r.participants||[]).map(p=>p.userId===s.id?{...p,score:(Number(p.score)||0)+a}:p);return i={...r,participants:c},i});return i?(i.error||Ss(n),i):{error:"not_found"}}function Fu(e){const t=qu(e);return t?[...t.participants||[]].map(s=>({userId:s.userId,username:s.username,score:Number(s.score)||0,referralCode:s.referralCode||"",joinedAt:s.joinedAt,submissions:(t.submissions||[]).filter(a=>a.userId===s.userId).length})).sort((s,a)=>a.score-s.score||(s.joinedAt||0)-(a.joinedAt||0)):[]}function Gu({force:e=!1}={}){if((u.missions||[]).length&&!e)return{skipped:!0,missions:Si()};const s=Date.now(),a=864e5,i=[{id:"msn_demo_song",title:"Push Long Story Short (clip challenge)",promoteType:"song",budget:2500,deadline:s+14*a,fundSource:"dbs",reward:"$50–$200 demo credits by rank · DBS-funded marketing",status:"active",participants:[{userId:"clipper_demo",username:"ClipQueen",joinedAt:s-2*a,score:42,referralCode:"REF-CLIP-AAA"},{userId:"dbs",username:"DatBoiSkeet",joinedAt:s-a,score:28,referralCode:"REF-DBS-001"}],submissions:[{id:"sub_demo1",userId:"clipper_demo",username:"ClipQueen",proof:"https://example.com/tiktok/lss-clip-1 · 12k views",at:s-a,status:"pending"}],createdAt:s-3*a,createdBy:"demo_admin"},{id:"msn_demo_live",title:"Boost Friday Night Live",promoteType:"live",budget:800,deadline:s+5*a,fundSource:"third_party",reward:"Share of $800 pot after 20% management fee",status:"active",participants:[],submissions:[],createdAt:s-a,createdBy:"demo_admin"},{id:"msn_demo_app",title:"Download DBS · invite 3 friends",promoteType:"app",budget:1200,deadline:s+30*a,fundSource:"dbs",reward:"Referral bonus stack · verified installs only",status:"active",participants:[],submissions:[],createdAt:s-5*a,createdBy:"demo_admin"},{id:"msn_demo_ended",title:"Ladies Only teaser push (ended)",promoteType:"video",budget:500,deadline:s-2*a,fundSource:"third_party",reward:"Completed · demo archive",status:"ended",participants:[{userId:"clipper_demo",username:"ClipQueen",joinedAt:s-10*a,score:90,referralCode:"REF-CLIP-OLD"}],submissions:[],createdAt:s-20*a,createdBy:"demo_admin"}].map(ts);return Ss(i),{seeded:i.length,missions:i}}const Ol=60*1e3,sr=60*1e3,ia=2,$i=3,Ei=3,fa=3,Uu=["song","beat","music_video"],Vu=[...Uu,"freestyle"];function ql(){const e=u.spotlight||{};return{nowPlaying:e.nowPlaying||null,queue:Array.isArray(e.queue)?e.queue:[],history:Array.isArray(e.history)?e.history:[],houseIndex:typeof e.houseIndex=="number"?e.houseIndex:0}}function fe(e){return u={...u,spotlight:e},C(u),e}function Hu(e){return e==="freestyle"?"Live Freestyle":e==="beat"?"Beat":e==="music_video"?"Music Video":"Song"}function un(e,t="ended"){return e?{id:e.id,userId:e.userId,username:e.username,type:e.type,title:e.title,artist:e.artist,startedAt:e.startedAt,endedAt:Date.now(),extensions:e.extensions||0,playCount:e.playCount||1,reason:t}:null}function de(e=Date.now()){let t=ql(),s=t.nowPlaying;if(!s)return zu(t,e);if(s.house)return t;if(s.type==="freestyle"&&s.endsAt&&e>=s.endsAt&&!s.awaitingPlayAnother){if(Object.keys(s.keepGoingVotes||{}).length>=$i&&(s.extensions||0)<ia&&!s.extensionApplied){s={...s,extensions:(s.extensions||0)+1,endsAt:e+sr,keepGoingVotes:{},extensionApplied:!1,voteWindowOpen:!0};const p={...t,nowPlaying:s};return fe(p),p}const n=[un(s,"timer"),...t.history||[]].slice(0,30),o=[...t.queue||[]];let r=null,d=typeof t.houseIndex=="number"?t.houseIndex:0;if(o.length){const p=o.shift();r=za(p,e)}else r=Wa(Qt(d),e);const c={nowPlaying:r,queue:o,history:n,houseIndex:d};return fe(c),c}if(s.awaitingPlayAnother&&s.playAnotherDeadline&&e>=s.playAnotherDeadline){const a=Object.keys(s.playAnotherVotes||{}).length,i=s.playCount||1;if(a>=Ei&&i<fa){s={...s,awaitingPlayAnother:!1,playAnotherVotes:{},playAnotherDeadline:null,playCount:i+1,title:s.nextTitle||s.title,startedAt:e,endsAt:null,nextTitle:null};const p={...t,nowPlaying:s};return fe(p),p}const n=[un(s,"play_another_fail"),...t.history||[]].slice(0,30),o=[...t.queue||[]];let r=null,d=typeof t.houseIndex=="number"?t.houseIndex:0;o.length?r=za(o.shift(),e):r=Wa(Qt(d),e);const c={nowPlaying:r,queue:o,history:n,houseIndex:d};return fe(c),c}return t}function za(e,t=Date.now()){const s=e.type==="freestyle";return{id:"sp_"+t.toString(36)+"_"+Math.random().toString(36).slice(2,6),userId:e.userId,username:e.username,type:e.type,title:e.title||(s?"Live Freestyle":"Untitled"),artist:e.artist||e.username,cover:e.cover||"",startedAt:t,endsAt:s?t+Ol:null,extensions:0,playCount:1,keepGoingVotes:{},playAnotherVotes:{},voteWindowOpen:s,awaitingPlayAnother:!1,playAnotherDeadline:null,reactions:{fire:0,heart:0,clap:0},chat:[{id:"c_"+t.toString(36),userId:"system",username:"DBS",text:`${e.username} took the Spotlight · ${Hu(e.type)} · TEST MODE`,at:t,system:!0}]}}function oe(){const e=de();return{nowPlaying:e.nowPlaying||null,queue:[...e.queue||[]],history:[...e.history||[]],houseIndex:typeof e.houseIndex=="number"?e.houseIndex:0,thresholds:{keepGoing:$i,playAnother:Ei,maxExtensions:ia,maxUploadStreak:fa,freestyleMs:Ol}}}function Rl(){const e=[];for(const s of ue||[])!s||!s.embed||(s.category==="Music Videos"?e.push({id:s.id,title:s.title,artist:s.artist||"DatBoiSkeet",embed:s.embed,youtube:s.youtube||"",kind:"music_video",chipLabel:"House · Music Video",note:"DatBoiSkeet catalog · original YouTube · not a live act",cover:s.cover||""}):s.category==="Interviews"&&e.push({id:s.id,title:s.title,artist:s.artist||"DatBoiSkeet",embed:s.embed,youtube:s.youtube||"",kind:"interview",chipLabel:"House · Interview",note:"DatBoiSkeet interview · original YouTube · not a live act",cover:s.cover||""}));const t=(ln||[]).find(s=>s.id==="pl-vlogs");if(t&&t.youtube){const s=String(t.youtube).match(/[?&]list=([^&]+)/),a=s&&s[1];a&&e.push({id:"house-bts-vlogs",title:t.title||"DatBoiSkeet Vlogs",artist:"DatBoiSkeet",embed:"https://www.youtube.com/embed/videoseries?list="+a,youtube:t.youtube,kind:"bts",chipLabel:"House · BTS",note:"Channel vlogs · dedicated BTS clips thin · original YouTube · not a live act",cover:""})}return e}function Nl(){const e=Rl().length;return e>0?e:1}function Qt(e){const t=Rl();if(!t.length)return{id:"house_empty",title:"DatBoiSkeet catalog",artist:"DatBoiSkeet",embed:"",youtube:"https://www.youtube.com/@DatBoiSkeet1",kind:"music_video",chipLabel:"House · Music Video",note:"Catalog loading · not a live act",cover:"",status:"House rotation"};const s=(e%t.length+t.length)%t.length;return{...t[s],status:t[s].chipLabel}}function Wa(e,t=Date.now()){return{id:"house_"+(e.id||"x")+"_"+t.toString(36),userId:"dbs",username:"DatBoiSkeet",type:"music_video",house:!0,houseKind:e.kind||"music_video",chipLabel:e.chipLabel||"House · Music Video",title:e.title,artist:e.artist||"DatBoiSkeet",embed:e.embed||"",youtube:e.youtube||"",note:e.note||"House catalog · not a live act",cover:e.cover||"",startedAt:t,endsAt:null,extensions:0,playCount:1,keepGoingVotes:{},playAnotherVotes:{},voteWindowOpen:!1,awaitingPlayAnother:!1,playAnotherDeadline:null,reactions:{fire:0,heart:0,clap:0},chat:[{id:"c_house_"+t.toString(36),userId:"system",username:"DBS",text:`House catalog · ${e.chipLabel||"House"} · ${e.title} · not a live act · TEST MODE`,at:t,system:!0}]}}function zu(e,t=Date.now()){if(e.nowPlaying)return e;const s=typeof e.houseIndex=="number"?e.houseIndex:0,a=Qt(s),i=Wa(a,t),n={...e,nowPlaying:i,houseIndex:s};return fe(n),n}function Bl(){const e=ql();return Qt(typeof e.houseIndex=="number"?e.houseIndex:0)}function Wu({type:e="song",title:t="",artist:s=""}={}){const a=u.user;if(!a)return{error:"signin"};const i=Vu.includes(e)?e:"song",n=de(),o=a.id,r=(n.queue||[]).some(b=>b.userId===o),d=n.nowPlaying&&!n.nowPlaying.house&&n.nowPlaying.userId===o&&!n.nowPlaying.awaitingPlayAnother;if(r||d)return{error:"already_queued",state:oe()};const c=String(t||"").trim().slice(0,80)||(i==="freestyle"?"Live Freestyle":i==="beat"?"Untitled Beat":i==="music_video"?"Untitled MV":"Untitled Song"),p=String(s||a.username||"").trim().slice(0,60),m={id:"q_"+Date.now().toString(36),userId:o,username:a.username,type:i,title:c,artist:p,cover:"",joinedAt:Date.now()};let h=n.nowPlaying,g=[...n.queue||[]],v=typeof n.houseIndex=="number"?n.houseIndex:0;return h?(h.house,g.push(m)):(h=za(m),g=[]),fe({...n,nowPlaying:h,queue:g,houseIndex:v}),{ok:!0,state:oe()}}function Gr(){const e=u.user;if(!e)return{error:"signin"};const t=de(),s=(t.queue||[]).length,a=(t.queue||[]).filter(i=>i.userId!==e.id);return a.length===s?{error:"not_in_queue"}:(fe({...t,queue:a}),{ok:!0,state:oe()})}function Yu(e){if(!u.user)return{error:"signin"};const s=de(),a=(s.queue||[]).filter(i=>i.id!==e);return fe({...s,queue:a}),{ok:!0,state:oe()}}function Kl(e="advance"){if(!u.user)return{error:"signin"};const s=de(),a=s.nowPlaying,i=!!(a&&a.house),n=a&&!i?[un(a,e),...s.history||[]].slice(0,30):[...s.history||[]],o=[...s.queue||[]];let r=typeof s.houseIndex=="number"?s.houseIndex:0;i&&(r=(r+1)%Nl());let d=null;return o.length?d=za(o.shift()):d=Wa(Qt(r)),fe({nowPlaying:d,queue:o,history:n,houseIndex:r}),{ok:!0,state:oe()}}function Ju(){return Kl("skip")}function Qu(){const e=u.user;if(!e)return{error:"signin"};const t=de(),s=t.nowPlaying;if(!s)return{error:"empty_stage"};if(s.house)return{error:"house_use_skip"};if(s.type==="freestyle")return{error:"freestyle_use_timer"};if(s.awaitingPlayAnother)return{error:"already_voting"};!(s.userId===e.id)&&le();const i=s.playCount||1;if(i>=fa)return Kl("max_streak");const n={...s,awaitingPlayAnother:!0,playAnotherVotes:{},playAnotherDeadline:Date.now()+30*1e3,nextTitle:s.title+" (take "+(i+1)+")"};return fe({...t,nowPlaying:n}),{ok:!0,state:oe()}}function Xu(){const e=u.user;if(!e)return{error:"signin"};const t=de(),s=t.nowPlaying;if(!s||s.type!=="freestyle")return{error:"no_freestyle"};if(!s.voteWindowOpen)return{error:"window_closed"};if(s.awaitingPlayAnother)return{error:"wrong_mode"};if((s.extensions||0)>=ia)return{error:"max_extensions"};const a={...s.keepGoingVotes||{}};if(a[e.id])return{error:"already_voted",state:oe()};a[e.id]=Date.now();let i={...s,keepGoingVotes:a};const n=Object.keys(a).length;return n>=$i&&(s.extensions||0)<ia&&(i={...i,extensions:(s.extensions||0)+1,endsAt:Date.now()+sr,keepGoingVotes:{},voteWindowOpen:!0}),fe({...t,nowPlaying:i}),{ok:!0,state:oe(),votes:Object.keys(i.keepGoingVotes||{}).length||n}}function Zu(e=2){const t=de(),s=t.nowPlaying;if(!s||s.type!=="freestyle")return{error:"no_freestyle"};const a={...s.keepGoingVotes||{}},i=Object.keys(a).length;for(let r=0;r<e;r++){const d="fan_sim_"+(i+r)+"_"+Date.now().toString(36);a[d]=Date.now()}let n={...s,keepGoingVotes:a};return Object.keys(a).length>=$i&&(s.extensions||0)<ia&&(n={...n,extensions:(s.extensions||0)+1,endsAt:Date.now()+sr,keepGoingVotes:{},voteWindowOpen:!0}),fe({...t,nowPlaying:n}),{ok:!0,state:oe()}}function em(){const e=u.user;if(!e)return{error:"signin"};const t=de(),s=t.nowPlaying;if(!s||!s.awaitingPlayAnother)return{error:"no_vote"};const a={...s.playAnotherVotes||{}};if(a[e.id])return{error:"already_voted",state:oe()};a[e.id]=Date.now();let i={...s,playAnotherVotes:a};const n=Object.keys(a).length,o=s.playCount||1;return n>=Ei&&o<fa&&(i={...i,awaitingPlayAnother:!1,playAnotherVotes:{},playAnotherDeadline:null,playCount:o+1,title:s.nextTitle||s.title,startedAt:Date.now(),endsAt:null,nextTitle:null}),fe({...t,nowPlaying:i}),{ok:!0,state:oe()}}function tm(e=2){const t=de(),s=t.nowPlaying;if(!s||!s.awaitingPlayAnother)return{error:"no_vote"};const a={...s.playAnotherVotes||{}},i=Object.keys(a).length;for(let d=0;d<e;d++)a["fan_pa_"+(i+d)+"_"+Date.now().toString(36)]=Date.now();let n={...s,playAnotherVotes:a};const o=Object.keys(a).length,r=s.playCount||1;return o>=Ei&&r<fa&&(n={...n,awaitingPlayAnother:!1,playAnotherVotes:{},playAnotherDeadline:null,playCount:r+1,title:s.nextTitle||s.title,startedAt:Date.now(),endsAt:null,nextTitle:null}),fe({...t,nowPlaying:n}),{ok:!0,state:oe()}}function sm(e="fire"){const t=de(),s=t.nowPlaying;if(!s)return{error:"empty_stage"};const a=["fire","heart","clap"].includes(e)?e:"fire",i={...s.reactions||{fire:0,heart:0,clap:0}};return i[a]=(i[a]||0)+1,fe({...t,nowPlaying:{...s,reactions:i}}),{ok:!0,state:oe()}}function am(e){const t=u.user;if(!t)return{error:"signin"};const s=String(e||"").trim().slice(0,200);if(!s)return{error:"empty"};const a=de(),i=a.nowPlaying;if(!i)return{error:"empty_stage"};const n=[...i.chat||[],{id:"c_"+Date.now().toString(36),userId:t.id,username:t.username,text:s,at:Date.now()}].slice(-40);return fe({...a,nowPlaying:{...i,chat:n}}),{ok:!0,state:oe()}}function im(e=20){return(de().history||[]).slice(0,e)}function Je(){const e=u.fanClubs||{clubs:[],posts:{},seeded:!1};return{clubs:Array.isArray(e.clubs)?e.clubs:[],posts:e.posts&&typeof e.posts=="object"?e.posts:{},seeded:!!e.seeded}}function $s(e){u={...u,fanClubs:e},C(u)}function jl(e){return e+"_"+Date.now().toString(36)+Math.random().toString(36).slice(2,7)}function Fl(){return Qe(),Je().clubs.slice().sort((e,t)=>e.official&&!t.official?-1:!e.official&&t.official?1:(t.memberCount||0)-(e.memberCount||0))}function ga(e){return Qe(),Je().clubs.find(t=>t.id===e)||null}function Qe({force:e=!1}={}){const t=Je();if(t.seeded&&!e&&t.clubs.length>0)return{skipped:!0,clubs:t.clubs};const s=Date.now(),a=864e5,i=[{id:"fc_official_dbs",name:"DatBoiSkeet Official",description:"Official DatBoiSkeet fan club inside DBS Lounge. Music drops, Vault tips, Foreign X-Change, and community rules — DBS branding first. Follow optional.",graphic:"/brand/pikk-logo-square.png",hostId:"dbs",hostName:"DatBoiSkeet",privacy:"public",official:!0,members:["dbs"],followers:["dbs"],mods:["dbs"],memberCount:1,createdAt:s-14*a},{id:"fc_lss_crew",name:"Long Story Short Crew",description:"Creator club for LSS listeners. Public lounge chat + PIKK+ members-only drop room.",graphic:"/music/01_Long_Story_Short_Coming_Soon.jpg",hostId:"dbs",hostName:"DatBoiSkeet",privacy:"members",official:!1,members:["dbs"],followers:["dbs"],mods:["dbs"],memberCount:1,createdAt:s-7*a},{id:"fc_ladies_only",name:"Ladies Only Circle",description:"Paid / PIKK+ gated room demo for Ladies Only supporters. Unlock via membership TEST MODE.",graphic:"/music/02_Ladies_Only_Coming_Soon.jpg",hostId:"dbs",hostName:"DatBoiSkeet",privacy:"paid",official:!1,members:["dbs"],followers:[],mods:["dbs"],memberCount:1,createdAt:s-3*a}],n={fc_official_dbs:[{id:"fcp_welcome",userId:"dbs",username:"DatBoiSkeet",text:"Welcome to the official club. Discover music on #/music · explore more on #/explore. No forced follows.",at:s-2*a,pinned:!0,removed:!1},{id:"fcp_lounge",userId:"dbs",username:"DatBoiSkeet",text:"DBS Lounge rooms stay music-first. Keep it respectful — see Community Guidelines.",at:s-a,pinned:!1,removed:!1}],fc_lss_crew:[{id:"fcp_lss1",userId:"dbs",username:"DatBoiSkeet",text:"LSS cover art is live in Coming Soon. Members can discuss theories here.",at:s-a,pinned:!1,removed:!1}],fc_ladies_only:[{id:"fcp_lo1",userId:"dbs",username:"DatBoiSkeet",text:"PIKK+ members-only preview chat. Join PIKK+ on Pricing (TEST MODE) to unlock.",at:s-12*36e5,pinned:!0,removed:!1}]};return $s({clubs:i,posts:n,seeded:!0}),{seeded:i.length,clubs:i}}function nm({name:e,description:t,graphic:s,privacy:a="public"}={}){const i=u.user;if(!i)return{error:"signin"};const n=String(e||"").trim().slice(0,48);if(!n)return{error:"name"};const o=["public","members","paid"].includes(a)?a:"public";Qe();const r=Je(),d={id:jl("fc"),name:n,description:String(t||"").trim().slice(0,280),graphic:String(s||"/brand/pikk-logo-square.png").slice(0,200),hostId:i.id,hostName:i.username,privacy:o,official:!1,members:[i.id],followers:[i.id],mods:[i.id],memberCount:1,createdAt:Date.now()};return $s({...r,clubs:[d,...r.clubs],posts:{...r.posts,[d.id]:[]},seeded:!0}),{ok:!0,club:d}}function xi(e,t){Qe();const s=Je(),a=s.clubs.findIndex(o=>o.id===e);if(a<0)return{error:"missing"};const i=t({...s.clubs[a]});if(i&&i.error)return i;const n=s.clubs.slice();return n[a]=i,$s({...s,clubs:n}),{ok:!0,club:i}}function Gl(e){const t=u.user;return t?xi(e,s=>{const a=new Set(s.members||[]);return a.add(t.id),{...s,members:[...a],memberCount:a.size}}):{error:"signin"}}function rm(e){const t=u.user;return t?xi(e,s=>{if(s.hostId===t.id)return{error:"host"};const a=(s.members||[]).filter(i=>i!==t.id);return{...s,members:a,memberCount:a.length}}):{error:"signin"}}function om(e){const t=u.user;return t?xi(e,s=>{const a=new Set(s.followers||[]);return a.add(t.id),{...s,followers:[...a]}}):{error:"signin"}}function lm(e){const t=u.user;return t?xi(e,s=>{const a=(s.followers||[]).filter(i=>i!==t.id);return{...s,followers:a}}):{error:"signin"}}function Ul(e){const t=u.user;if(!t)return!1;const s=ga(e);return!!(s&&(s.members||[]).includes(t.id))}function cm(e){const t=u.user;if(!t)return!1;const s=ga(e);return!!(s&&(s.followers||[]).includes(t.id))}function na(e){const t=u.user;if(!t)return!1;const s=ga(e);return s?le()||s.hostId===t.id||(s.mods||[]).includes(t.id):!1}function Vl(e){const t=ga(e);if(!t)return{ok:!1,reason:"missing"};if(t.privacy==="public")return{ok:!0,reason:"public"};if(t.privacy==="members")return Ul(e)||na(e)?{ok:!0,reason:"member"}:{ok:!1,reason:"members"};if(t.privacy==="paid"){const s=Zt();return({null:0,"skeet+":1,backstage:2,inner:3}[s||"null"]||0)>=1||na(e)?{ok:!0,reason:"paid"}:{ok:!1,reason:"paid"}}return{ok:!0,reason:"public"}}function dm(e){return Qe(),(Je().posts[e]||[]).filter(s=>!s.removed).slice().sort((s,a)=>s.pinned&&!a.pinned?-1:!s.pinned&&a.pinned?1:(a.at||0)-(s.at||0))}function pm(e,t){const s=u.user;if(!s)return{error:"signin"};const a=Vl(e);if(!a.ok)return{error:"gated",reason:a.reason};const i=String(t||"").trim().slice(0,500);if(!i)return{error:"empty"};const n=Je();if(!n.clubs.some(d=>d.id===e))return{error:"missing"};const o={id:jl("fcp"),userId:s.id,username:s.username,text:i,at:Date.now(),pinned:!1,removed:!1},r=[o,...n.posts[e]||[]].slice(0,100);return $s({...n,posts:{...n.posts,[e]:r}}),{ok:!0,post:o}}function um(e,t){if(!na(e))return{error:"mod"};const s=Je(),a=(s.posts[e]||[]).map(i=>i.id===t?{...i,pinned:!i.pinned}:i);return $s({...s,posts:{...s.posts,[e]:a}}),{ok:!0}}function mm(e,t){if(!na(e))return{error:"mod"};const s=Je(),a=(s.posts[e]||[]).map(i=>i.id===t?{...i,removed:!0}:i);return $s({...s,posts:{...s.posts,[e]:a}}),{ok:!0}}const ar=["instagram","tiktok","facebook","youtube","x","snapchat","other"],Hl=[{id:"badge",minVerified:1,label:"Exclusive DBS badge",kind:"badge"},{id:"decoration",minVerified:2,label:"Premium avatar decoration",kind:"decoration"},{id:"skeet7",minVerified:3,label:"7 days PIKK+ (TEST MODE)",kind:"membership_trial",membership:"skeet+",days:7},{id:"skeet30",minVerified:3,requireAllLinked:!0,label:"30 days PIKK+ (all linked · min 3)",kind:"membership_trial",membership:"skeet+",days:30}],zl=[{n:1,id:"m1",label:"Profile decoration",kind:"decoration"},{n:3,id:"m3",label:"7 days PIKK+ (TEST MODE)",kind:"membership_trial",membership:"skeet+",days:7},{n:5,id:"m5",label:"30 days PIKK+ (TEST MODE)",kind:"membership_trial",membership:"skeet+",days:30},{n:10,id:"m10",label:"Premium profile bundle",kind:"bundle"},{n:25,id:"m25",label:"30 days Backstage (TEST MODE)",kind:"membership_trial",membership:"backstage",days:30},{n:50,id:"m50",label:"30 days Inner Circle (TEST MODE)",kind:"membership_trial",membership:"inner",days:30},{n:100,id:"m100",label:"Founder Promoter badge / VIP",kind:"badge"}];function Wl(){return{platformsLinked:[],challenge:null,submissions:[],rewardsClaimed:[]}}function Yl(){return{code:"",invitees:[],milestonesClaimed:[]}}function Jl(e){const t=Wl();return!e||typeof e!="object"?t:{platformsLinked:Array.isArray(e.platformsLinked)?e.platformsLinked:[],challenge:e.challenge&&typeof e.challenge=="object"?e.challenge:null,submissions:Array.isArray(e.submissions)?e.submissions:[],rewardsClaimed:Array.isArray(e.rewardsClaimed)?e.rewardsClaimed:[]}}function Ql(e){const t=Yl();return!e||typeof e!="object"?t:{code:typeof e.code=="string"?e.code:"",invitees:Array.isArray(e.invitees)?e.invitees:[],milestonesClaimed:Array.isArray(e.milestonesClaimed)?e.milestonesClaimed:[]}}function mt(e){return u={...u,shareEarn:Jl(e)},C(u),u.shareEarn}function It(e){return u={...u,referEarn:Ql(e)},C(u),u.referEarn}function Xl(e){if(!e)return"DBS-GUEST";const t=String(e.username||"fan").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,8)||"FAN",s=String(e.id||"").replace(/^u_/,"").slice(-4).toUpperCase()||"DEMO";return`DBS-${t}-${s}`}function ss(e){return e+"_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function Fs(e=Date.now()){return new Date(e).toISOString().slice(0,10)}function J(){return Jl(u.shareEarn)}function Ur(){return ar.slice()}function hm(){return Hl.map(e=>({...e}))}function fm({platform:e,handle:t="",url:s="",followers:a=""}={}){if(!u.user)return{error:"signin"};const n=String(e||"").toLowerCase().trim();if(!ar.includes(n))return{error:"bad_platform"};const o=String(t||"").trim().replace(/^@+/,"").slice(0,64),r=String(s||"").trim().slice(0,240);if(!o&&!r)return{error:"required"};const d=J();if((d.platformsLinked||[]).some(m=>m.platform===n))return{error:"already_linked",shareEarn:d};const c={id:ss("plat"),platform:n,handle:o,url:r,followers:String(a||"").trim().slice(0,32),linkedAt:Date.now()},p={...d,platformsLinked:[...d.platformsLinked||[],c]};return mt(p),{ok:!0,platform:c,shareEarn:J()}}function gm(e){const t=J(),s={...t,platformsLinked:(t.platformsLinked||[]).filter(a=>a.id!==e)};return mt(s),J()}function vm(){if(!u.user)return{error:"signin"};const t=J();if(t.challenge&&t.challenge.status==="active")return{error:"already_active",shareEarn:t};const s=Es().code,a=Date.now(),i={id:ss("ch"),startedAt:a,endsAt:a+24*60*60*1e3,adTitle:"DatBoiSkeet · Long Story Short & Ladies Only",caption:"🔥 Join me on DBS — music, live, vault & more. Long Story Short + Ladies Only Coming Soon. #DBS #PaidPartnership #ad",trackedLink:`https://dbs.app/s/${s}?utm=share24`,status:"active",disclosure:"Incentivized promotion · disclose #ad / Paid partnership"};return mt({...t,challenge:i,submissions:[],rewardsClaimed:(t.rewardsClaimed||[]).filter(n=>n.challengeId!==i.id)}),{ok:!0,challenge:i,shareEarn:J()}}function bm(){const e=J();if(!e.challenge||e.challenge.status!=="active")return{error:"no_active"};const t={...e.challenge,startedAt:Date.now()-25*60*60*1e3,endsAt:Date.now()-1*60*60*1e3,simulatedElapsed:!0};return mt({...e,challenge:t}),{ok:!0,challenge:t,shareEarn:J()}}function ym(){const e=J();if(!e.challenge)return{error:"none"};const t={...e.challenge,status:"ended",endedAt:Date.now()};return mt({...e,challenge:t}),{ok:!0,challenge:t,shareEarn:J()}}function km({platform:e,postUrl:t=""}={}){if(!u.user)return{error:"signin"};const a=J();if(!a.challenge||a.challenge.status!=="active")return{error:"no_challenge"};const i=String(e||"").toLowerCase().trim();if(!ar.includes(i))return{error:"bad_platform"};const n=String(t||"").trim().slice(0,400);if(!n)return{error:"required"};if((a.submissions||[]).some(d=>d.platform===i&&(d.status==="pending"||d.status==="verified")))return{error:"duplicate",shareEarn:a};const r={id:ss("sub"),platform:i,postUrl:n,submittedAt:Date.now(),status:"pending",note:"Awaiting 24h continuous visibility check (manual/demo)"};return mt({...a,submissions:[r,...a.submissions||[]]}),{ok:!0,submission:r,shareEarn:J()}}function Vr(e,t,{note:s=""}={}){if(!["pending","verified","rejected"].includes(t))return{error:"bad_status"};const a=J();let i=null;const n=(a.submissions||[]).map(o=>o.id!==e?o:(i={...o,status:t,verifiedAt:t==="verified"?Date.now():o.verifiedAt||null,note:s||(t==="verified"?"Demo verified · 24h visibility assumed (manual)":t==="rejected"?"Rejected · ineligible / deleted / unverified":o.note)},i));return i?(mt({...a,submissions:n}),{ok:!0,submission:i,shareEarn:J()}):{error:"not_found"}}function Zl(){const e=J();return new Set((e.submissions||[]).filter(s=>s.status==="verified").map(s=>s.platform)).size}function ec(){const e=J(),t=Zl(),s=(e.platformsLinked||[]).length,a=new Set((e.rewardsClaimed||[]).map(i=>i.tierId));return Hl.filter(i=>{if(a.has(i.id)||t<i.minVerified)return!1;if(i.requireAllLinked){if(s<3)return!1;const n=new Set((e.platformsLinked||[]).map(r=>r.platform)),o=new Set((e.submissions||[]).filter(r=>r.status==="verified").map(r=>r.platform));for(const r of n)if(!o.has(r))return!1}return!0}).map(i=>({...i,verifiedCount:t,linkedCount:s}))}function wm(e){var o;if(!u.user)return{error:"signin"};const a=ec().find(r=>r.id===e);if(!a)return{error:"not_claimable"};const i=J(),n={id:ss("srw"),tierId:a.id,label:a.label,kind:a.kind,at:Date.now(),challengeId:((o=i.challenge)==null?void 0:o.id)||null,testMode:!0};return a.membership&&mi(a.membership,!0),mt({...i,rewardsClaimed:[n,...i.rewardsClaimed||[]]}),{ok:!0,claim:n,shareEarn:J(),membership:Zt()}}function Sm(){return mt(Wl()),J()}function Ie(){return Ql(u.referEarn)}function $m(){return zl.map(e=>({...e}))}function Es(){const e=u.user,t=Ie();if(t.code)return t;const s=Xl(e);return It({...t,code:s})}function tc(){return`https://dbs.app/r/${Es().code}`}function Em({username:e=""}={}){const t=u.user;if(!t)return{error:"signin"};const s=Es(),a=String(e||"").trim().slice(0,24)||"Invitee"+(s.invitees.length+1);if(a.toLowerCase()===String(t.username||"").toLowerCase())return{error:"self_referral"};const i={id:ss("inv"),username:a,signedUpAt:Date.now(),activeDays:[],status:"pending",welcomeClaimed:!1,flaggedFraud:!1};return It({...s,invitees:[i,...s.invitees||[]]}),{ok:!0,invitee:i,referEarn:Ie()}}function xm(e){const t=Ie();let s=null;const a=(t.invitees||[]).map(i=>i.id!==e?i:i.flaggedFraud?(s={error:"fraud",invitee:i},i):(s={...i,welcomeClaimed:!0,welcomeAt:Date.now()},s));return s?s.error?s:(It({...t,invitees:a}),{ok:!0,invitee:s,perk:"Welcome badge / profile decoration (TEST MODE)"}):{error:"not_found"}}function Am(e,{day:t=null}={}){const s=Ie();let a=null;const i=(s.invitees||[]).map(n=>{if(n.id!==e)return n;if(n.flaggedFraud)return a={error:"fraud",invitee:n},n;const o=Number(n.signedUpAt)||Date.now(),r=o+7*864e5;let d=t;if(!d){const h=new Set(n.activeDays||[]);let g=null;for(let v=0;v<7;v++){const b=Fs(o+v*864e5);if(!h.has(b)){g=b;break}}if(!g)return a={error:"window_full",invitee:n},n;d=g}const c=Date.parse(d+"T12:00:00Z");if(!Number.isFinite(c)||c<o-864e5||c>r)return a={error:"outside_window",invitee:n},n;const p=Array.from(new Set([...n.activeDays||[],d])).sort();let m=n.status;return p.length>=3&&(m="active"),a={...n,activeDays:p,status:m},a});return a?a.error?a:(It({...s,invitees:i}),{ok:!0,invitee:a,referEarn:Ie()}):{error:"not_found"}}function Hr(e,t=!0){const s=Ie();let a=null;const i=(s.invitees||[]).map(n=>{var o;return n.id!==e?n:(a={...n,flaggedFraud:!!t,status:t?"fraud":((o=n.activeDays)==null?void 0:o.length)>=3?"active":"pending"},a)});return a?(It({...s,invitees:i}),{ok:!0,invitee:a,referEarn:Ie()}):{error:"not_found"}}function sc(){return(Ie().invitees||[]).filter(t=>t.status==="active"&&!t.flaggedFraud).length}function ac(){const e=Ie(),t=sc(),s=new Set((e.milestonesClaimed||[]).map(a=>a.milestoneId));return zl.filter(a=>t>=a.n&&!s.has(a.id)).map(a=>({...a,activeCount:t}))}function Tm(e){if(!u.user)return{error:"signin"};const a=ac().find(o=>o.id===e);if(!a)return{error:"not_claimable"};const i=Ie(),n={id:ss("rmw"),milestoneId:a.id,n:a.n,label:a.label,kind:a.kind,at:Date.now(),testMode:!0,note:"Distinct from Clippers commissions · TEST MODE · no real billing"};return a.membership&&mi(a.membership,!0),It({...i,milestonesClaimed:[n,...i.milestonesClaimed||[]]}),{ok:!0,claim:n,referEarn:Ie(),membership:Zt()}}function Cm(){const e=u.user;return It({...Yl(),code:Xl(e)}),Ie()}function Pm({force:e=!1}={}){if(!u.user)return{error:"signin"};const s=Es();if(!e&&(s.invitees||[]).length>0)return{error:"already_seeded",referEarn:s};const a=Date.now(),i=864e5,n=[{id:"inv_demo_a",username:"NovaFan",signedUpAt:a-5*i,activeDays:[Fs(a-5*i),Fs(a-4*i),Fs(a-3*i)],status:"active",welcomeClaimed:!0,flaggedFraud:!1},{id:"inv_demo_b",username:"ClipCurious",signedUpAt:a-2*i,activeDays:[Fs(a-2*i)],status:"pending",welcomeClaimed:!0,flaggedFraud:!1},{id:"inv_demo_c",username:"BottyMcBot",signedUpAt:a-6*i,activeDays:[],status:"fraud",welcomeClaimed:!1,flaggedFraud:!0}];return It({...s,invitees:n,milestonesClaimed:s.milestonesClaimed||[]}),{ok:!0,seeded:n.length,referEarn:Ie()}}const Ai=[{id:"youtube",label:"YouTube",color:"#ff4444",hint:"YouTube Live / Studio"},{id:"tiktok",label:"TikTok",color:"#69c9d0",hint:"TikTok LIVE"},{id:"twitch",label:"Twitch",color:"#9146ff",hint:"Twitch Dashboard"},{id:"facebook",label:"Facebook",color:"#1877f2",hint:"Facebook Live"},{id:"instagram",label:"Instagram",color:"#e1306c",hint:"IG Live (demo)"},{id:"kick",label:"Kick",color:"#53fc18",hint:"Kick Studio"},{id:"custom_rtmp",label:"Custom RTMP",color:"#ffb020",hint:"Any RTMP endpoint"}],Im=()=>({freeMaxDestinations:2,houseUnlimited:!0,houseUserIds:["dbs"],tiers:{bronze:{id:"bronze",label:"Bronze",price:4.99,maxDestinations:3,placement:!1,badge:"Bronze Streamer",perks:["3 destination slots","Campaign badge on Go Live"]},silver:{id:"silver",label:"Silver",price:9.99,maxDestinations:5,placement:!0,badge:"Silver Streamer",perks:["5 destination slots","Campaign badge","Explore / Live placement flag"]},gold:{id:"gold",label:"Gold",price:19.99,maxDestinations:7,placement:!0,badge:"Gold Streamer",perks:["All 7 destinations","Campaign badge","Priority Explore / Live placement"]}}});function Oa(){return{platforms:{},selected:[],session:null,history:[],ingest:null,campaign:{tier:null,status:"none",enrolledAt:null,cancelledAt:null},campaignConfig:null}}function Ti(){const e=u.restream||Oa();return{...Oa(),...e,platforms:e.platforms&&typeof e.platforms=="object"?e.platforms:{},selected:Array.isArray(e.selected)?e.selected:[],history:Array.isArray(e.history)?e.history:[],campaign:{...Oa().campaign,...e.campaign||{}}}}function xs(e){return u={...u,restream:e},C(u),u.restream}function Mm(e){var s,a;if((s=e.ingest)!=null&&s.rtmpUrl&&((a=e.ingest)!=null&&a.streamKey))return e;const t="dbs_demo_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,10);return{...e,ingest:{rtmpUrl:"rtmp://ingest.dbs.local/live",streamKey:t,rotatedAt:Date.now(),note:"TEST MODE demo key · not a real media server"}}}function Mt(){let e=Ti();const t=e.ingest;return e=Mm(e),e.ingest!==t&&xs(e),e}function ic(){const e=Mt();return Ai.map(t=>{const s=e.platforms[t.id]||{};return{...t,connected:!!s.connected,connectedAt:s.connectedAt||null,handle:s.handle||"",lastError:s.lastError||null,enabled:s.enabled!==!1}})}function Lm(e,t=""){const s=Ai.find(n=>n.id===e);if(!s)return{error:"unknown_platform"};const a=Mt(),i={...a.platforms,[e]:{id:e,connected:!0,connectedAt:Date.now(),handle:String(t||s.label+" Demo").slice(0,40),lastError:null,enabled:!0}};return xs({...a,platforms:i}),{ok:!0,platform:ic().find(n=>n.id===e)}}function Dm(e){var n;const t=Mt();if(!((n=t.platforms[e])!=null&&n.connected))return{error:"not_connected"};const s={...t.platforms,[e]:{...t.platforms[e],connected:!1,disconnectedAt:Date.now(),lastError:null}},a=(t.selected||[]).filter(o=>o!==e);let i=t.session;return i&&!i.endedAt&&(i={...i,destinations:(i.destinations||[]).map(o=>o.id===e?{...o,status:"disconnected",health:"error"}:o)}),xs({...t,platforms:s,selected:a,session:i}),{ok:!0}}function _m(e){const t=Mt(),s=new Set(Object.values(t.platforms).filter(i=>i.connected).map(i=>i.id)),a=(Array.isArray(e)?e:[]).filter(i=>s.has(i)).slice(0,7);return xs({...t,selected:a}),{ok:!0,selected:a}}function Om(e){var a;const t=Mt();if(!((a=t.platforms[e])!=null&&a.connected))return{error:"not_connected"};const s=new Set(t.selected||[]);return s.has(e)?s.delete(e):s.add(e),_m([...s])}function nc(){var a,i,n;const e=Ti(),t=Im(),s=e.campaignConfig||{};return{...t,...s,tiers:{...t.tiers,...s.tiers||{},bronze:{...t.tiers.bronze,...((a=s.tiers)==null?void 0:a.bronze)||{}},silver:{...t.tiers.silver,...((i=s.tiers)==null?void 0:i.silver)||{}},gold:{...t.tiers.gold,...((n=s.tiers)==null?void 0:n.gold)||{}}},freeMaxDestinations:Number(s.freeMaxDestinations)>0?Number(s.freeMaxDestinations):t.freeMaxDestinations,houseUnlimited:s.houseUnlimited!==!1,houseUserIds:Array.isArray(s.houseUserIds)?s.houseUserIds:t.houseUserIds}}function rc(){return{...Oa().campaign,...Ti().campaign||{}}}function qm(){const e=u.user;if(!e)return!1;const t=nc();return e.id==="dbs"||e.username==="DatBoiSkeet"?!0:(t.houseUserIds||[]).includes(e.id)}function oc(){const e=nc();if(qm()&&e.houseUnlimited)return{max:Ai.length,source:"house_free",tier:null};const t=rc();if(t.status==="active"&&t.tier&&e.tiers[t.tier]){const s=e.tiers[t.tier];return{max:s.maxDestinations,source:"campaign",tier:t.tier,badge:s.badge,placement:!!s.placement}}return{max:e.freeMaxDestinations,source:"free_baseline",tier:null,badge:null,placement:!1}}function Rm(){const e=u.user;if(!e)return{error:"signin"};const t=Mt();if(t.session&&!t.session.endedAt)return{error:"already_live"};const s=Object.values(t.platforms).filter(d=>d.connected).map(d=>d.id);if(!s.length)return{error:"no_platforms"};let a=(t.selected||[]).filter(d=>s.includes(d));if(!a.length)return{error:"none_selected"};const i=oc();if(a.length>i.max)return{error:"over_cap",max:i.max,selected:a.length,source:i.source};const n=a.map((d,c)=>{const p=Ai.find(h=>h.id===d),m=c===a.length-1&&a.length>2?"connecting":"streaming";return{id:d,label:(p==null?void 0:p.label)||d,status:m==="connecting"?"connecting":"streaming",health:m,startedAt:Date.now()}}),o=rc(),r={id:ss("rs"),hostId:e.id,hostName:e.username,startedAt:Date.now(),destinations:n,selected:a.slice(),campaignTier:o.status==="active"?o.tier:null,campaignBadge:i.badge||null,placement:!!i.placement,testMode:!0,endedAt:null};return xs({...t,session:r,selected:a}),{ok:!0,session:r}}function Nm(){const e=Mt();if(!e.session||e.session.endedAt)return{error:"offline"};const t={...e.session,endedAt:Date.now(),destinations:(e.session.destinations||[]).map(a=>({...a,status:a.health==="error"?"error":"ended",health:a.health==="error"?"error":"ended"}))},s=[t,...e.history||[]].slice(0,20);return xs({...e,session:null,history:s}),{ok:!0,session:t,history:s}}function Bm(){const e=Ti().session;return e&&!e.endedAt?e:null}function lc(){const e=I().connectPrefs||{};return{ageConfirmed:!!e.ageConfirmed,rulesAccepted:!!e.rulesAccepted}}function zr(e={}){const t={...lc(),...e};return t.ageConfirmed||(t.rulesAccepted=!1),wp(s=>({...s,connectPrefs:t})),t}const cc=[{id:"day_one",name:"Day One",blurb:"Joined the Loyalty Club — recognition starts with showing up, not spending.",need:0,kind:"join"},{id:"listener",name:"Listener",blurb:"Logged authorized listening (demo tick). Not purchase-only.",need:1,kind:"listen"},{id:"live_attendee",name:"Live Regular",blurb:"Attended a livestream (demo stub). Healthy participation.",need:1,kind:"live"},{id:"club_member",name:"Club Member",blurb:"Joined a Fan Club discussion community.",need:1,kind:"club"},{id:"helper",name:"Helper",blurb:"Community-helper milestone (welcome tip / guidelines share demo).",need:1,kind:"help"},{id:"top_fan",name:"Top Fan",blurb:"Earned 50+ loyalty points from mixed healthy actions — gifts alone do not unlock this.",needPoints:50}];function dc(e=Date.now()){return new Date(e).toISOString().slice(0,10)}function va(){const e=u.loyalty||{};return{points:Number(e.points)||0,history:Array.isArray(e.history)?e.history:[],badges:Array.isArray(e.badges)?e.badges:[],publicVisible:e.publicVisible!==!1,lastActionAt:e.lastActionAt&&typeof e.lastActionAt=="object"?e.lastActionAt:{},dayCounts:e.dayCounts&&typeof e.dayCounts=="object"?e.dayCounts:{}}}function ir(e){u={...u,loyalty:e},C(u)}function Km(){return"loy_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function jm(e,{cooldownMs:t=8e3,dailyCap:s=8}={}){const a=va(),i=Date.now(),n=Number(a.lastActionAt[e])||0;if(i-n<t)return{ok:!1,reason:"cooldown"};const o=dc(i);return((a.dayCounts[o]||{})[e]||0)>=s?{ok:!1,reason:"daily_cap"}:{ok:!0}}function Fm(e){const t=new Set(e.badges||[]),s={};return(e.history||[]).forEach(a=>{s[a.kind]=(s[a.kind]||0)+1}),cc.forEach(a=>{if(!t.has(a.id)){if(a.needPoints!=null){e.points>=a.needPoints&&t.add(a.id);return}if(a.id==="day_one"){((e.history||[]).length>0||e.points>0)&&t.add(a.id);return}(s[a.kind]||0)>=(a.need||1)&&t.add(a.id)}}),[...t]}function ba(){return va()}function Gm(e){const t=va();return ir({...t,publicVisible:!!e}),ba()}function Um(e,{points:t=5,note:s=""}={}){if(!u.user)return{error:"signin"};const i=jm(e);if(!i.ok)return{error:i.reason};const n=va(),o=Date.now(),r=dc(o),d={...n.dayCounts,[r]:{...n.dayCounts[r]||{},[e]:((n.dayCounts[r]||{})[e]||0)+1}},c={id:Km(),at:o,kind:e,points:t,note:String(s||e).slice(0,120)},p={...n,points:n.points+t,history:[c,...n.history].slice(0,80),lastActionAt:{...n.lastActionAt,[e]:o},dayCounts:d};return p.badges.includes("day_one")||(p.history=p.history),p.badges=Fm(p),p.badges.includes("day_one")||(p.badges=["day_one",...p.badges]),ir(p),{ok:!0,loyalty:ba(),entry:c,newBadges:p.badges.filter(m=>!(n.badges||[]).includes(m))}}function pc(){const e=ba(),t=new Set(e.badges||[]);return cc.map(s=>({...s,unlocked:t.has(s.id)}))}function Vm(){return ir({points:0,history:[],badges:[],publicVisible:!0,lastActionAt:{},dayCounts:{}}),ba()}function as(){const e=u.openMic||{};return{applications:Array.isArray(e.applications)?e.applications:[],seeded:!!e.seeded,houseIndex:typeof e.houseIndex=="number"?e.houseIndex:0}}function Ci(e){u={...u,openMic:e},C(u)}function Hm(){return"om_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function As({force:e=!1}={}){const t=as();if(t.seeded&&!e&&t.applications.length>0)return{skipped:!0,applications:t.applications};const s=Date.now(),a=864e5,i=[{id:"om_demo_approved",userId:"u_ria",username:"RiaLoops",talent:"producer",trackTitle:"Midnight Pads (demo)",profileNote:"Beatmaker · looking to collab on LSS energy",rightsCertified:!0,status:"approved",at:s-10*a,reviewedAt:s-9*a},{id:"om_demo_pending",userId:"u_dez",username:"DezOnMic",talent:"rapper",trackTitle:"Porch Light Freestyle",profileNote:"Opt-in showcase · not pay-to-win",rightsCertified:!0,status:"pending",at:s-2*a},{id:"om_demo_rejected",userId:"u_spam",username:"SpamBeats",talent:"dj",trackTitle:"Untitled drop",profileNote:"No rights cert honesty",rightsCertified:!1,status:"rejected",at:s-5*a,reviewedAt:s-4*a,reviewNote:"Rights certification required"}],n=typeof t.houseIndex=="number"?t.houseIndex:0;return Ci({applications:i,seeded:!0,houseIndex:n}),{seeded:i.length,applications:i}}function mn({status:e=null}={}){As();let t=as().applications.slice();return e&&(t=t.filter(s=>s.status===e)),t.sort((s,a)=>(a.at||0)-(s.at||0))}function zm(){return mn({status:"approved"})}function Wm(){const e=as();return Qt(typeof e.houseIndex=="number"?e.houseIndex:0)}function Ym(){const e=as(),t=((typeof e.houseIndex=="number"?e.houseIndex:0)+1)%Nl();return Ci({...e,houseIndex:t}),Qt(t)}function Jm({talent:e="rapper",trackTitle:t="",profileNote:s="",rightsCertified:a=!1}={}){const i=u.user;if(!i)return{error:"signin"};if(!a)return{error:"rights"};const n=String(t||"").trim().slice(0,80);if(!n)return{error:"title"};As();const o=as();if(o.applications.some(d=>d.userId===i.id&&d.status==="pending"))return{error:"pending"};const r={id:Hm(),userId:i.id,username:i.username,talent:String(e||"other").slice(0,32),trackTitle:n,profileNote:String(s||"").trim().slice(0,240),rightsCertified:!0,status:"pending",at:Date.now()};return Ci({...o,applications:[r,...o.applications],seeded:!0}),{ok:!0,application:r}}function hn(e,t,s=""){if(!le())return{error:"admin"};if(!["pending","approved","rejected"].includes(t))return{error:"status"};const i=as();let n=null;const o=i.applications.map(r=>r.id!==e?r:(n={...r,status:t,reviewedAt:Date.now(),reviewNote:String(s||"").slice(0,160)},n));return n?(Ci({...i,applications:o}),{ok:!0,application:n}):{error:"missing"}}function Qm(){var S,x;As(),Qe();try{ya(),We()}catch{}const e=as().applications||[],t={pending:0,approved:0,rejected:0};e.forEach(w=>{const A=w.status||"pending";t[A]!==void 0?t[A]+=1:t.pending+=1});const s=e.filter(w=>w.status==="pending").sort((w,A)=>(A.at||0)-(w.at||0)),a=Je().clubs.slice().sort((w,A)=>(A.createdAt||0)-(w.createdAt||0)),i=a.slice(0,5).map(w=>({id:w.id,name:w.name,privacy:w.privacy,official:!!w.official,memberCount:w.memberCount||(w.members||[]).length||0,createdAt:w.createdAt||0})),n=va(),r=pc().filter(w=>w.unlocked),d=Pt(),c=zn();let p=0,m=0,h=0,g=0,v=0;c.forEach(w=>{p=R(p+(w.gross||0)),m=R(m+(w.fees||0)),h=R(h+(w.creatorShare||0)),g=R(g+(w.dbsShare||0)),v+=w.count||0});const b=u.wallet||{balance:0},y=u.catalog||[],k=fl();return{openMic:{total:e.length,byStatus:t,pending:s},fanClubs:{total:a.length,recent:i},loyalty:{points:n.points||0,badgeCount:r.length,badges:r.map(w=>w.name||w.id),publicVisible:n.publicVisible!==!1,historyCount:(n.history||[]).length,note:"Device-local loyalty for signed-in user · not a multi-fan leaderboard"},revenue:{demo:!0,chip:"demo figures · not production",gross:p,fees:m,creatorShare:h,dbsShare:g,earnCount:v,creatorAvailable:R(d.available||0),creatorHolds:R(d.holds||0),fanWalletBalance:Number(b.balance)||0,byCategory:c.filter(w=>w.count>0),catalogPublished:y.filter(w=>w.published).length,catalogTotal:y.length},moderation:{warnings:[],suspensions:[],note:"Stub · Content Polish owns Guidelines copy"},hotFeed:{openAlerts:(u.engagementAlerts||[]).filter(w=>!w.handledAt).length,totalAlerts:(u.engagementAlerts||[]).length,hotPosts:Array.isArray((S=u.hotFeed)==null?void 0:S.posts)?u.hotFeed.posts.length:0,hotLives:Array.isArray((x=u.hotFeed)==null?void 0:x.lives)?u.hotFeed.lives.length:0,note:"§38 · Build posts + Live Social lives"},stats:k}}const Xm={frames:"frame",effects:"effect",banners:"banner","name styles":"nameStyle",badges:"badge"},Wr=["frame-rodeo-gold","fx-snowfall","ban-skyline","name-neon","badge-dayone"];function Zm(e){const t=e&&typeof e=="object"?e:{},s={};return["frame","effect","banner","nameStyle","badge"].forEach(a=>{typeof t[a]=="string"&&t[a]&&(s[a]=t[a])}),s}function Ts(){const e=u.profileShop||{};return{owned:Array.isArray(e.owned)?[...new Set(e.owned.map(String))]:[],equipped:Zm(e.equipped),reduceMotion:!!e.reduceMotion}}function Cs(e){u={...u,profileShop:e},C(u)}function Tt(){return Ts()}function uc(e){return e&&Xm[e.category]||null}function eh(e){const t=String(e||"");if(!t)return{error:"missing"};const s=Ts();return s.owned.includes(t)?{ok:!0,already:!0,shop:Tt()}:(Cs({...s,owned:[...s.owned,t]}),{ok:!0,shop:Tt()})}function th(){const e=Ts(),t=new Set(e.owned);return Wr.forEach(s=>t.add(s)),Cs({...e,owned:[...t]}),{ok:!0,unlocked:Wr,shop:Tt()}}function sh(e){const t=String(e||"");return t.startsWith("frame-")?"frame":t.startsWith("fx-")?"effect":t.startsWith("ban-")?"banner":t.startsWith("name-")?"nameStyle":t.startsWith("badge-")?"badge":null}function ah(e){const t=String(e||""),s=Ts();if(!s.owned.includes(t))return{error:"not_owned"};const a=sh(t);if(!a)return{error:"unknown_item"};const i={...s.equipped,[a]:t};return Cs({...s,equipped:i}),{ok:!0,slot:a,shop:Tt()}}function ih(e){const t=String(e||"");if(!["frame","effect","banner","nameStyle","badge"].includes(t))return{error:"bad_slot"};const s=Ts(),a={...s.equipped};return delete a[t],Cs({...s,equipped:a}),{ok:!0,shop:Tt()}}function nh(e){const t=Ts();return Cs({...t,reduceMotion:!!e}),Tt()}function rh(){return Cs({owned:[],equipped:{},reduceMotion:!1}),Tt()}const oh=5,lh=8,ch=[{id:"hp_maya_1",userId:"maya",username:"MayaBeats",text:"Studio loop dropping later — who wants the stem pack? 🔥",image:"/music/01_Long_Story_Short_Coming_Soon.jpg",mediaType:"image",atOffset:36e5*5,likeUsers:["dbs","fanjay","u_seed_a","u_seed_b","u_seed_c","u_seed_d","clipqueen"],comments:[{id:"hc_m1",userId:"fanjay",username:"FanJay",text:"Send it 🙌"},{id:"hc_m2",userId:"dbs",username:"DatBoiSkeet",text:"Pull up on Spotlight"},{id:"hc_m3",userId:"clipqueen",username:"ClipQueen",text:"Stem pack please"}],shares:5},{id:"hp_jay_1",userId:"fanjay",username:"FanJay",text:"Foreign X-Change fit check from the community — buffalo energy.",image:"/merch/03_blue_buffalo_jacket.jpeg",mediaType:"image",atOffset:36e5*8,likeUsers:["maya","dbs","u_seed_a","u_seed_c","u_seed_d","clipqueen","u_seed_b"],comments:[{id:"hc_j1",userId:"maya",username:"MayaBeats",text:"Jacket hits"},{id:"hc_j2",userId:"clipqueen",username:"ClipQueen",text:"Need this"}],shares:6},{id:"hp_clip_1",userId:"clipqueen",username:"ClipQueen",text:"New clip cut from last Live — tag @DatBoiSkeet if you remix 🎬",image:"/merch/06_black_ptsd_tee.jpeg",mediaType:"video",atOffset:36e5*12,likeUsers:["dbs","maya","fanjay","u_seed_a","u_seed_b","u_seed_c"],comments:[{id:"hc_c1",userId:"dbs",username:"DatBoiSkeet",text:"Clean edit"},{id:"hc_c2",userId:"maya",username:"MayaBeats",text:"Clipping goals"},{id:"hc_c3",userId:"fanjay",username:"FanJay",text:"Saved"},{id:"hc_c4",userId:"u_seed_a",username:"FanA",text:"Fire"}],shares:4},{id:"hp_dbs_boost",userId:"dbs",username:"DatBoiSkeet",text:"Community shoutout — Maya + Jay keeping the feed hot. Keep posting.",image:"/music/02_Ladies_Only_Coming_Soon.jpg",mediaType:"image",atOffset:36e5*3,likeUsers:["maya","fanjay","u_seed_a"],comments:[{id:"hc_d1",userId:"maya",username:"MayaBeats",text:"Grateful 💛"},{id:"hc_d2",userId:"fanjay",username:"FanJay",text:"Lets go"}],shares:2}];function Ne(){const e=u.hotFeed||{};return{lives:Array.isArray(e.lives)?e.lives:[],posts:Array.isArray(e.posts)?e.posts:[],seededLives:!!e.seededLives,seededPosts:!!e.seededPosts,seededPostsVer:Number(e.seededPostsVer)||0}}function mc(e){u={...u,hotFeed:e},C(u)}function dh(){const e={...u.profiles};let t=!1;const s=(a,i,n)=>{e[a]||(e[a]={id:a,username:i,bio:n,avatar:"",followers:[],following:["dbs"],verified:!1},t=!0)};s("maya","MayaBeats","Creator · beats & live demos"),s("fanjay","FanJay","Day-one fan · playlist curator"),s("clipqueen","ClipQueen","Clipper · community edits"),t&&(u={...u,profiles:e})}function ya(){ml(),dh();const e=Ne(),t=Number(e.seededPostsVer)||0;if(e.seededPosts&&t>=2)return Ne();if(e.seededPosts&&t<2){const d={...u.likes||{}},c={...u.comments||{}},p={...u.postShares||{}},m=(h,g,v,b)=>{d[h]=[...new Set([...d[h]||[],...g])];const y=new Set((c[h]||[]).map(S=>S.id)),k=[...c[h]||[]];(v||[]).forEach(S=>{y.has(S.id)||k.push({...S,at:S.at||Date.now()})}),c[h]=k,p[h]=Math.max(Number(p[h]||0),b)};return m("hp_maya_1",["dbs","fanjay","u_seed_a","u_seed_b","u_seed_c","u_seed_d","clipqueen"],[{id:"hc_m3",userId:"clipqueen",username:"ClipQueen",text:"Stem pack please"}],5),m("hp_jay_1",["maya","dbs","u_seed_a","u_seed_c","u_seed_d","clipqueen","u_seed_b"],[{id:"hc_j2",userId:"clipqueen",username:"ClipQueen",text:"Need this"}],6),m("hp_clip_1",["dbs","maya","fanjay","u_seed_a","u_seed_b","u_seed_c"],[{id:"hc_c4",userId:"u_seed_a",username:"FanA",text:"Fire"}],4),d.hp_dbs_boost&&(d.hp_dbs_boost=(d.hp_dbs_boost||[]).slice(0,3),p.hp_dbs_boost=Math.min(Number(p.hp_dbs_boost||0),2)),u={...u,likes:d,comments:c,postShares:p,hotFeed:{...e,seededPosts:!0,seededPostsVer:2}},C(u),We(),Ne()}const s=new Set((u.posts||[]).map(d=>d.id)),a=[...u.posts||[]],i={...u.likes||{}},n={...u.comments||{}},o={...u.postShares||{}},r=Date.now();return ch.forEach(d=>{s.has(d.id)||(a.unshift({id:d.id,userId:d.userId,username:d.username,text:d.text,image:d.image||"",mediaType:d.mediaType||(d.image?"image":"text"),at:r-(d.atOffset||0),house:d.userId==="dbs"}),i[d.id]=[...d.likeUsers||[]],n[d.id]=(d.comments||[]).map(c=>({...c,text:c.text,at:r-(d.atOffset||0)+6e4})),d.shares&&(o[d.id]=d.shares))}),i.p1&&i.p1.length<3&&(i.p1=[...new Set([...i.p1||[],"maya","fanjay","u_seed_a"])]),i.p2&&i.p2.length<2&&(i.p2=[...new Set([...i.p2||[],"maya","fanjay"])]),(!n.p1||n.p1.length<2)&&(n.p1=[...n.p1||[],{id:"hc_p1a",userId:"maya",username:"MayaBeats",text:"Cover art goes crazy",at:r-8e7},{id:"hc_p1b",userId:"fanjay",username:"FanJay",text:"Been waiting on this",at:r-7e7}]),o.p1=Math.max(o.p1||0,2),o.p2=Math.max(o.p2||0,1),u={...u,posts:a,likes:i,comments:n,postShares:o,hotFeed:{...e,seededPosts:!0,seededPostsVer:2}},C(u),We(),Ne()}function Pi(e){const t=u.likes&&u.likes[e]||[],s=u.comments&&u.comments[e]||[],a=u.postShares&&u.postShares[e]||0;return t.length+s.length+Number(a||0)}function We(){const e=Ne(),s=(u.posts||[]).map(r=>{const d=(u.likes&&u.likes[r.id]||[]).length,c=(u.comments&&u.comments[r.id]||[]).length,p=Number(u.postShares&&u.postShares[r.id]||0),m=d+c+p;return{id:r.id,postId:r.id,score:m,likes:d,comments:c,shares:p,username:r.username,userId:r.userId,preview:(r.text||"").slice(0,120),text:r.text||"",image:r.image||"",mediaType:r.mediaType||(r.image?"image":"text"),at:r.at||0,house:r.userId==="dbs"||!!r.house}}).filter(r=>r.score>=oh).sort((r,d)=>d.score-r.score||d.at-r.at).slice(0,lh),a=new Set((e.posts||[]).map(r=>r.postId||r.id)),i=Array.isArray(u.engagementAlerts)?[...u.engagementAlerts]:[],n=new Set(i.filter(r=>r.kind==="post").map(r=>r.refId));s.forEach(r=>{n.has(r.id)||a.has(r.id)&&e.posts.length||(i.unshift({id:"ea_post_"+r.id+"_"+Date.now().toString(36),kind:"post",refId:r.id,title:(r.preview||r.text||"Hot post").slice(0,80),username:r.username,score:r.score,mediaType:r.mediaType||"text",at:Date.now(),handledAt:null,handledNote:null}),n.add(r.id))});const o=i.slice(0,60);return u={...u,hotFeed:{lives:e.lives,seededLives:e.seededLives,posts:s,seededPosts:e.seededPosts||s.length>0,seededPostsVer:Number(e.seededPostsVer)||0},engagementAlerts:o},C(u),Ne()}function hc(e=8){return ya(),Ne().posts.length||We(),(Ne().posts||[]).slice(0,Math.max(1,Number(e)||8))}function fc(e){const t=String(e||"");if(!t)return{error:"missing"};if(!(u.posts||[]).find(i=>i.id===t))return{error:"missing"};const a={...u.postShares||{}};return a[t]=Number(a[t]||0)+1,u={...u,postShares:a},C(u),We(),{ok:!0,shares:a[t],score:Pi(t)}}function ph(e){const t=e||{},s=t.kind==="live"?"live":"post",a=String(t.refId||t.id||"");if(!a)return{error:"missing"};const i=Array.isArray(u.engagementAlerts)?[...u.engagementAlerts]:[],n=i.find(r=>r.kind===s&&r.refId===a&&!r.handledAt);if(n)return{ok:!0,alert:n,deduped:!0};const o={id:t.id||"ea_"+s+"_"+a+"_"+Date.now().toString(36),kind:s,refId:a,title:String(t.title||"Hot item").slice(0,120),username:String(t.username||""),score:Number(t.score)||0,viewers:t.viewers!=null?Number(t.viewers):void 0,gifts:t.gifts!=null?Number(t.gifts):void 0,mediaType:t.mediaType||(s==="live"?"live":"text"),at:t.at||Date.now(),handledAt:t.handledAt||null,handledNote:t.handledNote||null};return u={...u,engagementAlerts:[o,...i].slice(0,60)},C(u),{ok:!0,alert:o}}function Yr({openOnly:e=!0}={}){const t=Array.isArray(u.engagementAlerts)?u.engagementAlerts:[];return(e?t.filter(a=>!a.handledAt):t.slice()).sort((a,i)=>(i.at||0)-(a.at||0))}function Ea(e,t){const s=String(e||"");if(!s)return{error:"missing"};const a=Array.isArray(u.engagementAlerts)?u.engagementAlerts:[];let i=null;const n=a.map(o=>o.id!==s?o:(i={...o,handledAt:Date.now(),handledNote:t!=null?String(t):o.handledNote||"handled"},i));return i?(u={...u,engagementAlerts:n},C(u),{ok:!0,alert:i}):{error:"missing"}}function uh(e){if(!le())return{error:"admin"};const t=u.user;if(!t)return{error:"signin"};const s=String(e||""),a=new Set(u.likes&&u.likes[s]||[]);return a.add(t.id),u={...u,likes:{...u.likes,[s]:[...a]}},C(u),We(),{ok:!0,count:a.size,score:Pi(s)}}function mh(e,t){if(!le())return{error:"admin"};const s=u.user;if(!s)return{error:"signin"};const a=String(e||""),i=t.trim();if(!i)return{error:"empty"};const n={id:"c_admin_"+Date.now().toString(36),userId:s.id,username:s.username,text:i,at:Date.now(),admin:!0},o=u.comments&&u.comments[a]||[];return u={...u,comments:{...u.comments,[a]:[...o,n]}},C(u),We(),{ok:!0,comment:n,score:Pi(a)}}function hh(e){if(!le())return{error:"admin"};const t=fc(e);return t.error?t:{ok:!0,shares:t.shares,link:"#/posts",score:t.score}}function nr(e,t){return Math.max(0,Number(e)||0)+Math.max(0,Number(t)||0)*20}function rr(e){if(!e||typeof e!="object")return null;const t=String(e.id||e.liveId||"");if(!t)return null;const s=String(e.hostId||e.userId||""),a=String(e.hostName||e.username||e.handle||"Creator"),i=Math.max(0,Number(e.viewers)||0),n=Math.max(0,Number(e.giftsTotal??e.gifts)||0),o=e.score!=null&&Number.isFinite(Number(e.score))?Number(e.score):nr(i,n);return{id:t,hostId:s,hostName:a,title:String(e.title||"Live"),viewers:i,giftsTotal:n,house:!!e.house,example:!0,spikedAt:e.spikedAt||null,score:o}}function gc({force:e=!1}={}){const t=Ne();if(t.seededLives&&!e&&(t.lives||[]).length>0)return{skipped:!0,lives:t.lives.map(rr).filter(Boolean)};const s=[{id:"hl_dbs_house",hostId:"dbs",hostName:"DatBoiSkeet",title:"DBS Live · Listening Session",viewers:8420,giftsTotal:186,house:!0},{id:"hl_dbs_vault",hostId:"dbs",hostName:"DatBoiSkeet",title:"Vault Drop Afterparty · House",viewers:3210,giftsTotal:94,house:!0},{id:"hl_skeetfan",hostId:"u_skeetfanatl",hostName:"SkeetFanATL",title:"ATL reacts · Long Story Short",viewers:1540,giftsTotal:42,house:!1},{id:"hl_vaultwatch",hostId:"u_vaultwatcher",hostName:"VaultWatcher",title:"Vault deep cut night",viewers:980,giftsTotal:61,house:!1},{id:"hl_fxclip",hostId:"u_fxclipper",hostName:"FXClipper",title:"Foreign X-Change clips live",viewers:2210,giftsTotal:28,house:!1},{id:"hl_nightowl",hostId:"u_nightowldbs",hostName:"NightOwlDBS",title:"Late night lounge · chill",viewers:412,giftsTotal:15,house:!1},{id:"hl_longstory",hostId:"u_longstorylistener",hostName:"LongStoryListener",title:"LSS theory hour",viewers:128,giftsTotal:7,house:!1},{id:"hl_ladies",hostId:"u_ladiesonlyfan",hostName:"LadiesOnlyFan",title:"Ladies Only countdown",viewers:67,giftsTotal:3,house:!1}].map(a=>({...a,spikedAt:null,score:nr(a.viewers,a.giftsTotal)}));return mc({...t,lives:s,seededLives:!0}),{ok:!0,lives:s}}function Ps(){return gc(),(Ne().lives||[]).map(rr).filter(Boolean).sort((t,s)=>(s.score||0)-(t.score||0)||(s.viewers||0)-(t.viewers||0))}function fh(e){const t=String(e||"");if(!t)return{error:"missing"};gc();const s=Ne();let a=null;const i=(s.lives||[]).map(o=>{const r=rr(o);if(!r||r.id!==t)return o;const d=r.viewers,c=r.giftsTotal,p=nr(d,c);return a={...r,viewers:d,giftsTotal:c,score:p,spikedAt:Date.now()},a});if(!a)return{error:"missing"};mc({...s,lives:i,seededLives:!0});const n=ph({kind:"live",refId:a.id,title:a.title,username:a.hostName,score:a.score,viewers:a.viewers,gifts:a.giftsTotal});return{ok:!0,live:a,alert:(n==null?void 0:n.alert)||null,deduped:!!(n!=null&&n.deduped)}}function gh(){return Ps().filter(s=>s&&!s.house).sort((s,a)=>(a.score||0)-(s.score||0)||(a.viewers||0)-(s.viewers||0)).slice(0,6).map(s=>({id:s.id,hostId:s.hostId,hostName:s.hostName,title:s.title,viewers:s.viewers,giftsTotal:s.giftsTotal,house:!!s.house,score:s.score,spikedAt:s.spikedAt||null,playbacksToday:s.playbacksToday!=null?s.playbacksToday:Math.max(1,Math.round((s.viewers||0)/40))}))}function vc(){const e=new Date().toISOString().slice(0,10),s=(Ht({publishedOnly:!0,types:["song"]})||[]).map(i=>{const n=Number(i.playsToday)||Number(i.playCount)||Number(i.plays)||0;let o="";return i.coverRef&&!String(i.coverRef).startsWith("idb:")&&(o=i.coverRef),{id:i.id,title:i.title||"Untitled",artist:i.artist||"DatBoiSkeet",cover:o,playsToday:n,href:"#/music",demo:!1,day:e,status:i.status||(i.published?"Published":"Catalog")}}).filter(i=>i.playsToday>0).sort((i,n)=>n.playsToday-i.playsToday||String(i.title).localeCompare(String(n.title)));return s[0]?s[0]:{id:"demo_most_played_lss",title:"Long Story Short",artist:"DatBoiSkeet",cover:"/music/01_Long_Story_Short_Coming_Soon.jpg",playsToday:900+e.split("-").reduce((i,n)=>i+Number(n),0)%400,href:"#/music",demo:!0,day:e,status:"Coming Soon"}}const bc="pikk.settings.v1",fn=Object.freeze({notifyMessages:!0,notifyLive:!0,notifyDrops:!0,notifyPromos:!1,highContrast:!1,reduceMotion:!1,splashChime:!0,showSplash:!0}),Ii=()=>{try{return globalThis.localStorage||null}catch{return null}};function gs(){var e;try{return{...fn,...JSON.parse(((e=Ii())==null?void 0:e.getItem(bc))||"{}")}}catch{return{...fn}}}function vh(e,t){var a;if(!(e in fn))return gs();const s={...gs(),[e]:!!t};return(a=Ii())==null||a.setItem(bc,JSON.stringify(s)),s}function yc(e=gs(),t=(s=>(s=globalThis.document)==null?void 0:s.documentElement)()){t&&(t.classList.toggle("pikk-high-contrast",!!e.highContrast),t.classList.toggle("pikk-reduce-motion",!!e.reduceMotion))}const kc="pikk.membership.v1";function wc(){var e;try{return JSON.parse(((e=Ii())==null?void 0:e.getItem(kc))||"null")}catch{return null}}function bh(e){var s;if(!e||!e.id)return null;const t={id:e.id,name:e.name,price:e.price,at:Date.now(),testMode:!0};return(s=Ii())==null||s.setItem(kc,JSON.stringify(t)),t}const or=e=>e?`${e.name} (test mode) — billing starts when Stripe is live`:"",yh="0.1.0",ft=(e,t,s,a)=>`<label class="pikk-set-row"><span><strong>${l(t)}</strong>${s?`<small>${l(s)}</small>`:""}</span><input type="checkbox" class="pikk-switch" data-setting="${e}"${a[e]?" checked":""} /></label>`,Ze=(e,t,s)=>`<a class="pikk-set-row pikk-set-link" href="${e}"><span><strong>${l(t)}</strong>${s?`<small>${l(s)}</small>`:""}</span><span aria-hidden="true">→</span></a>`,qt=(e,t,s)=>`<section class="card pikk-set-group" id="set-${e}" aria-labelledby="set-${e}-h"><h2 id="set-${e}-h">${l(t)}</h2>${s}</section>`;function Sc(){var i;const e=gs(),t=(i=I())==null?void 0:i.user,s=wc(),a=t?`<p class="pikk-set-who">Signed in as <strong>@${l(t.username)}</strong> · local demo account</p>${Ze("#/profile","Edit profile","Name, bio, avatar")}<button type="button" class="btn pikk-set-btn" id="setSignOut">Sign out</button>`:`<p class="pikk-set-who">You're not signed in.</p><a class="btn primary pikk-set-btn" href="#/profile" id="setSignIn">Sign in / Create account</a>`;return P("Settings",`
    ${qt("account","Account",a+(s?`<p class="pikk-set-member" data-membership>${l(or(s))}</p>`:"")+Ze("#/pricing","Memberships","PIKK+ · Backstage · Inner Circle"))}
    ${qt("notifications","Notifications",ft("notifyMessages","Messages","New messages and requests",e)+ft("notifyLive","Live","When creators you follow go live",e)+ft("notifyDrops","Music drops","New releases from DatBoiSkeet",e)+ft("notifyPromos","Promotions","Offers and PIKK news",e)+'<p class="muted pikk-set-note">Preferences only — push notifications arrive once the PIKK backend is live.</p>')}
    ${qt("privacy","Privacy",Ze("#/crew","PIKK Crew","Who sees your Crew stories")+Ze("#/favorites","Favorites","People who rank first in your feeds")+Ze("#/guidelines","Community guidelines","")+Ze("#/privacy","Privacy","Draft — pending legal review")+Ze("#/terms?s=security","Security &amp; data breach","Terms · draft"))}
    ${qt("appearance","Appearance",ft("highContrast","High contrast","Brighter text and borders",e)+ft("reduceMotion","Reduce motion","Fewer animations",e))}
    ${qt("sound","Sound & splash",ft("splashChime","Splash chime","Tuning-fork chime when PIKK opens",e)+ft("showSplash","Show opening splash","3-second PIKK logo on launch",e))}
    ${qt("more","Payments & help",Ze("#/payments","Payments","Donate, coins, wallet, memberships")+Ze("#/support","Support","Help & tickets"))}
    ${qt("about","About",`<p class="pikk-set-about">PIKK Network · version <strong data-version>${yh}</strong> · TEST MODE</p><p class="muted pikk-set-note">Settings are saved only on this device until PIKK accounts are live.</p>`)}
  `,{badge:"TEST MODE"})}function $c(e=document.getElementById("app")){var t;e==null||e.querySelectorAll("[data-setting]").forEach(s=>s.addEventListener("change",()=>{const a=vh(s.dataset.setting,s.checked);yc(a),f("Saved on this device")})),(t=e==null?void 0:e.querySelector("#setSignOut"))==null||t.addEventListener("click",()=>{Sp(),f("Signed out"),e.innerHTML=Sc(),$c(e)})}const kh=5e3,wh=500,Sh=800,$h="modulepreload",Eh=function(e){return"/pikk-app/"+e},Jr={},gn=function(t,s,a){let i=Promise.resolve();if(s&&s.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),r=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=Promise.allSettled(s.map(d=>{if(d=Eh(d),d in Jr)return;Jr[d]=!0;const c=d.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${p}`))return;const m=document.createElement("link");if(m.rel=c?"stylesheet":$h,c||(m.as="script"),m.crossOrigin="",m.href=d,r&&m.setAttribute("nonce",r),document.head.appendChild(m),c)return new Promise((h,g)=>{m.addEventListener("load",h),m.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${d}`)))})}))}function n(o){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=o,window.dispatchEvent(r),!r.defaultPrevented)throw o}return i.then(o=>{for(const r of o||[])r.status==="rejected"&&n(r.reason);return t().catch(n)})},Ec="pikk.contest.twerk.age18",xc=()=>{try{return globalThis.localStorage||null}catch{return null}},xh=()=>{var e;return((e=xc())==null?void 0:e.getItem(Ec))==="yes"};function Ah(){var e;(e=xc())==null||e.setItem(Ec,"yes")}function Th(){return`<section class="pikk-contest pikk-contest-gate" aria-labelledby="twerkGateH">
    <p class="kicker">Twerk Contest · 18+</p>
    <h1 id="twerkGateH">Are you 18 or older?</h1>
    <p>This contest is for adults only. Confirm you are 18+ to continue. Your answer is saved only on this device.</p>
    <p class="muted">TEST MODE: this is a self-confirmation. Real age verification will be required once PIKK Safety and the backend are live. <a href="#/verify-age">Verify age / ID</a></p>
    <div class="pikk-contest-actions">
      <button type="button" class="pikk-contest-enter" id="twerkGateYes">I'm 18 or older</button>
      <a class="pikk-contest-leave" href="#/home">No, take me back</a>
    </div>
  </section>`}function Ac(){return`<section class="pikk-contest pikk-contest-rules" aria-labelledby="twerkRulesH">
    <p class="kicker">Twerk Contest · 18+</p>
    <h1 id="twerkRulesH">Twerk Contest</h1>
    <h2>Rules</h2>
    <ul>
      <li>18+ only. Contestants are women 18+ whose account gender is female and who have completed ID/age verification on the server. Everyone shown in an entry must be 18 or older.</li>
      <li>Live, solo entries only. Contestants compete by going live alone. No recorded uploads, co-hosts, guests, duos or groups, and no one else on camera.</li>
      <li>Watching and voting are open to every viewer who confirms they are 18+. No ID check is needed to watch or vote.</li>
      <li>No nudity or sexual content. Keep clothing on and keep it dance-focused.</li>
      <li>Follow the <a href="#/guidelines">PIKK community guidelines</a>. No harassment, hate or minors.</li>
      <li>See something wrong? Use Report on the entry, or contact <a href="#/support">Support</a>. Reports are reviewed by moderators.</li>
    </ul>
    <div id="twerkEntry" aria-live="polite"><p class="pikk-contest-soon" role="status">Entries &amp; voting coming soon. Live, solo entries only. Contestant entries need a PIKK account checked by the server.</p></div>
  </section>`}const Qr=()=>xh()?Ac():Th();function Ch(e){return e?e.can_enter?`<form id="twerkEntryForm" class="card"><h2>Go live to compete</h2>
      <p class="muted">Live, solo entries only. Just you on camera.</p>
      <label>Title <input id="twerkEntryTitle" maxlength="120" required></label>
      <div class="pikk-contest-actions"><button type="submit" class="pikk-contest-enter" id="twerkGoLive">Go live (solo)</button></div></form>`:e.gender_ok?'<p>To enter as a contestant, complete ID/age verification first.</p><a class="pikk-contest-enter" href="#/verify-age">Verify age / ID</a>':`<p class="muted">This contest is for women contestants. You can watch and vote.</p>${e.gender_set?"":'<p class="muted">Account gender not set. <a href="#/profile">Set it on your profile</a> if you are a woman who wants to enter.</p>'}`:'<p class="muted">Sign in to see whether you can enter. Watching and voting stay open.</p>'}function vn(e=document.getElementById("app")){var s;(s=e==null?void 0:e.querySelector("#twerkGateYes"))==null||s.addEventListener("click",()=>{var a,i;Ah(),e.innerHTML=Ac(),(i=(a=e.querySelector("h1"))==null?void 0:a.focus)==null||i.call(a),vn(e)});const t=e==null?void 0:e.querySelector("#twerkEntry");t&&gn(()=>Promise.resolve().then(()=>$n),void 0).then(async a=>{var o;if(!a.isVerificationApiConfigured())return;let i=null;try{i=await a.verificationApi.contestEligibility("twerk")}catch(r){if((r==null?void 0:r.status)!==401)return}t.innerHTML=Ch(i);const n=async r=>{var c,p;const d=(p=(c=t.querySelector("#twerkEntryTitle"))==null?void 0:c.value)==null?void 0:p.trim();if(d)try{await a.verificationApi.submitEntry("twerk",d,r),t.innerHTML='<p role="status">Entry received. It will be reviewed by moderators before it appears.</p>'}catch(m){(m==null?void 0:m.code)==="age_verification_required"?location.hash="#/verify-age":t.insertAdjacentHTML("beforeend",`<p role="alert">${String((m==null?void 0:m.message)||"Could not submit").replace(/[<>&]/g,"")}</p>`)}};(o=t.querySelector("#twerkEntryForm"))==null||o.addEventListener("submit",r=>{r.preventDefault(),n(!0)})})}const Ph={BASE_URL:"/pikk-app/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_BASE:"/pikk-app/",VITE_BUILD_SHA:"b1f547a871a9a2dc042e57a129503bfb4842e709",VITE_PIKK_API_BASE:""},ze=Object.freeze([{name:"Block Wars",players:"1–2",icon:"🥊",theme:"fighters",artwork:"/games/approved/01_block_wars.jpg",description:"City-based fighters, combos and special moves.",href:"#/blockwars"},{name:"PIKK Playground",players:"1–8",icon:"🎈",theme:"playground",artwork:"/games/approved/02_pikk_playground.jpg",description:"Create your character, race, jump and explore with friends."},{name:"PIKK Clash",players:"1",icon:"💎",theme:"clash",artwork:"/games/approved/03_pikk_clash.jpg",description:"Original neighborhood-themed match puzzles and venue upgrades."},{name:"PIKK Knockout",players:"1",icon:"💥",theme:"knockout",artwork:"/games/approved/04_pikk_knockout.jpg",description:"Stylized physics challenges: launch, bounce and knock targets off moving platforms."},{name:"PIKK Bowling",players:"1–4",icon:"🎳",theme:"bowling",artwork:"/games/approved/05_pikk_bowling.jpg",description:"Compete for strikes, spares and high scores."},{name:"PIKK Pickleball",players:"2–4",icon:"🏓",theme:"pickleball",artwork:"/games/approved/06_pikk_pickleball.jpg",description:"Play singles or doubles on colorful courts."},{name:"PIKK Pool",players:"1–2",icon:"🎱",theme:"pool",artwork:"/games/approved/07_pikk_pool.jpg",description:"Play 8-ball pool against friends or the computer."},{name:"PIKK Cup Pong",players:"2–4",icon:"🥤",theme:"pong",artwork:"/games/approved/08_pikk_cup_pong.jpg",description:"Aim, throw and eliminate opponents’ cups."},{name:"PIKK Poker",players:"2–8",icon:"♠️",theme:"poker",artwork:"/games/approved/09_pikk_poker.jpg",description:"Social Texas Hold’em with nonredeemable Play Chips."},{name:"PIKK Blackjack",players:"1–5",icon:"🃏",theme:"blackjack",artwork:"/games/approved/10_pikk_blackjack.jpg",description:"Try for 21 against the dealer using Play Chips."},{name:"PIKK Slots",players:"1",icon:"🎰",theme:"slots",artwork:"/games/approved/11_pikk_slots.jpg",description:"Entertainment-only reels and virtual Play Chips."},{name:"PIKK Speed",players:"2",icon:"⚡",theme:"speed",artwork:"/games/approved/12_pikk_speed.jpg",description:"Race to play your cards before your opponent."},{name:"PIKK Spades",players:"4",icon:"♠",theme:"spades",artwork:"/games/approved/13_pikk_spades.jpg",description:"Partner strategy and card battles."},{name:"PIKK Dominoes",players:"2–4",icon:"🁢",theme:"dominoes",artwork:"/games/approved/14_pikk_dominoes.jpg",description:"Match tiles and outplay opponents."},{name:"PIKK Chess",players:"2",icon:"♟",theme:"chess",artwork:"/games/approved/15_pikk_chess.jpg",description:"Challenge opponents in a classic strategy game."}]);function ra(e){return e!=null&&e.artwork?(Ph&&"/pikk-app/"||"/").replace(/\/?$/,"/")+String(e.artwork).replace(/^\/+/,""):""}const oa=Object.freeze({videos:[{title:"Video Feed",href:"#/videos",detail:"Watch and discover videos",icon:"▶"},{title:"Shorts & Reels",href:"#/shorts",detail:"Browse short-form clips",icon:"▣"},{title:"Posts",href:"#/posts",detail:"View the community feed",icon:"▤"},{title:"Upload Video",href:"#/posts?type=video",detail:"Available prototype publishing tools · TEST MODE",icon:"⇧"},{title:"24/7 Viral Live",href:"#/viral-live",detail:"Rotating viral clips · preview",icon:"◉"},{title:"Spotlight",href:"#/spotlight",detail:"Featured creators · preview",icon:"✦"},{title:"Clippers",href:"#/clippers",detail:"Clip creators · TEST MODE",icon:"✂"},{title:"Stories",href:"#/story",detail:"Share to Everyone or Crew · TEST MODE",icon:"◌"},{title:"Premieres",detail:"Video premieres · Coming Soon",icon:"▶"}],connect:[{title:"Connect",href:"#/connect",detail:"Discover people and communities",icon:"♧"},{title:"PIKK Communities",href:"#/communities",detail:"Topic discussions, votes and replies · TEST MODE",icon:"#"},{title:"Messages",href:"#/messages",detail:"Open your messages",icon:"✉"},{title:"PIKK Crew",href:"#/crew",detail:"Private story list · TEST MODE",icon:"◎"},{title:"Favorites",href:"#/favorites",detail:"People who rank first · TEST MODE",icon:"★"},{title:"Random Chat",href:"#/connect#connect-random-chat",detail:"Preview only · real matching unavailable",icon:"◉"},{title:"Multistream",href:"#/connect#connect-multistream",detail:"Broadcast connection preview · TEST MODE",icon:"▹"},{title:"Explore",href:"#/explore",detail:"Search people, music, videos, live",icon:"⌕"},{title:"Live Rooms",href:"#/live",detail:"Live room directory · TEST MODE",icon:"●"},{title:"Fan Clubs",href:"#/fanclubs",detail:"Creator fan clubs · TEST MODE",icon:"♛"},{title:"Party Line",href:"#/multiguest",detail:"Multi-guest rooms · preview",icon:"☎"},{title:"Notifications",href:"#/notifications",detail:"Your activity",icon:"🔔"},{title:"City Connect",detail:"City-based rooms · Coming Soon",icon:"⌂"},{title:"Events",detail:"Community events · Coming Soon",icon:"◷"}],dating:[{title:"Discover Dating",href:"#/dating",detail:"Explore dating features · TEST MODE",icon:"♡"},{title:"Messages",href:"#/messages",detail:"Open private messages",icon:"✉"},{title:"My Profile",href:"#/profile",detail:"Review your profile settings",icon:"◉"},{title:"Safety Guidelines",href:"#/guidelines",detail:"Review community safety rules",icon:"◇"},{title:"Matches",detail:"Mutual matches · Coming Soon",icon:"♥"},{title:"Liked You",detail:"Who liked you · Coming Soon",icon:"♡"},{title:"Age & ID Verification",detail:"18+ identity checks · Coming Soon",icon:"✓"},{title:"Report & Block",href:"#/shield",detail:"PIKK Shield safety tools · TEST MODE",icon:"⚑"}],games:[{title:"PIKK Arcade",href:"#/games",detail:"View the full game collection · preview",icon:"♜"},...ze.map(e=>({title:e.name,...e.href?{href:e.href}:{},detail:e.href?"Fighting game · development preview":e.description+" · planned",icon:e.name==="Block Wars"?"▣":"♜"})),{title:"Roast Arena",href:"#/roast-arena",detail:"Roast battles · preview",icon:"🔥"},{title:"Gift Battles",href:"#/giftbattles",detail:"Live gift battles · TEST MODE",icon:"⚔"},{title:"Missions",href:"#/missions",detail:"Daily missions · TEST MODE",icon:"★"},{title:"Loyalty Rewards",href:"#/loyalty",detail:"Play Chips & rewards · no cash value",icon:"◆"}],shop:[{title:"PIKK Shop",href:"#/shop",detail:"Browse available products",icon:"▤"},{title:"Marketplace",href:"#/marketplace",detail:"Community listings · TEST MODE",icon:"◇"},{title:"Foreign X-Change",href:"#/merch",detail:"Official merchandise",icon:"✦"},{title:"Creator Pricing",href:"#/pricing",detail:"Explore creator selling information",icon:"$"},{title:"Profile Shop",href:"#/profile-shop",detail:"Creator storefront · preview",icon:"▦"},{title:"Wallet",href:"#/wallet",detail:"Balance & activity · TEST MODE",icon:"◎"},{title:"Sell on PIKK",href:"#/pricing?focus=sell",detail:"Seller rules & apply · TEST MODE",icon:"⇧"},{title:"Orders & Shipping",detail:"Order tracking · Coming Soon",icon:"⛟"},{title:"Refunds",detail:"Returns & disputes · Coming Soon",icon:"↺"}]}),Ih=Object.freeze({"Video Feed":"videos","Shorts & Reels":"videos",Posts:"posts","Upload Video":"videos",Connect:"profile","PIKK Communities":"chat",Communities:"chat",Messages:"msg","Random Chat":"camera",Multistream:"live","Discover Dating":"heart","My Profile":"profile","Safety Guidelines":"heart","PIKK Arcade":"game","PIKK Speed":"game","PIKK Blackjack":"game","PIKK Slots":"game","PIKK Poker":"game","PIKK Spades":"game","PIKK Dominoes":"game","PIKK Chess":"game","PIKK Clash":"game","PIKK Knockout":"game","PIKK Playground":"game","PIKK Bowling":"game","PIKK Pickleball":"game","PIKK Pool":"game","PIKK Cup Pong":"game","Block Wars":"game","24/7 Viral Live":"live",Spotlight:"videos",Clippers:"videos",Stories:"camera",Premieres:"videos",Explore:"explore","Live Rooms":"live","Fan Clubs":"heart","Party Line":"chat",Notifications:"msg","City Connect":"explore",Events:"explore",Matches:"heart","Liked You":"heart","Age & ID Verification":"profile","Report & Block":"heart","Roast Arena":"game","Gift Battles":"live",Missions:"game","Loyalty Rewards":"game","Profile Shop":"merch",Wallet:"merch","Sell on PIKK":"merch","Orders & Shipping":"merch",Refunds:"merch","PIKK Shop":"merch",Marketplace:"merch","Foreign X-Change":"merch","Creator Pricing":"posts"}),Tc={videos:"pikkVideosMenu",connect:"pikkConnectMenu",dating:"pikkDatingMenu",games:"pikkGamesMenu",shop:"pikkShopMenu"};function Ft(e=!1){for(const[t,s]of Object.entries(Tc)){const a=document.getElementById(s);if(!a||a.hidden)continue;a.hidden=!0;const i=document.querySelector(`#tabbar a[href="#/${t}"]`);i==null||i.setAttribute("aria-expanded","false"),e&&(i==null||i.focus())}}function Mh(e,t){var r,d,c;if(!Object.hasOwn(oa,e))return;const s=Tc[e];let a=document.getElementById(s);a||(a=document.createElement("div"),a.id=s,a.className="pikk-create-overlay",a.hidden=!0,a.innerHTML=`<div class="pikk-create-sheet" role="dialog" aria-modal="true" aria-labelledby="${s}Title">
      <div class="pikk-create-head"><strong id="${s}Title">${e[0].toUpperCase()+e.slice(1)} on PIKK</strong><button type="button" class="btn ghost" data-section-close aria-label="Close ${e} menu">✕</button></div>
      <div class="pikk-create-options pikk-create-grid">${oa[e].map(p=>{const m=`<span class="pikk-menu-icon" aria-hidden="true">${Zs[Ih[p.title]||"explore"]}</span><strong class="pikk-menu-title">${p.title}</strong><small>${p.detail}</small>`;return p.href?`<a class="pikk-create-tile" href="${p.href}">${m}</a>`:`<div class="pikk-create-tile pikk-menu-planned" aria-disabled="true">${m}</div>`}).join("")}</div>
      <button type="button" class="pikk-menu-cancel" data-section-close>Cancel</button>
      <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · Production features are not enabled until secure services are available.</p>
    </div>`,document.body.appendChild(a),a.addEventListener("click",p=>{p.target===a||p.target.closest("[data-section-close]")?Ft(!0):p.target.closest(".pikk-create-options a")&&Ft()}),document.addEventListener("keydown",p=>{if(a.hidden)return;if(p.key==="Escape"){p.preventDefault(),Ft(!0);return}if(p.key!=="Tab")return;const m=[...a.querySelectorAll("button:not([disabled]), a[href]")],h=m[0],g=m[m.length-1];if(!h){p.preventDefault();return}a.contains(document.activeElement)?p.shiftKey&&document.activeElement===h?(p.preventDefault(),g.focus()):!p.shiftKey&&document.activeElement===g&&(p.preventDefault(),h.focus()):(p.preventDefault(),(p.shiftKey?g:h).focus())}),window.addEventListener("hashchange",()=>Ft()));const i=a.hidden;Ft();const n=document.getElementById("pikkMusicMenu");n&&!n.hidden&&(n.hidden=!0,(r=document.querySelector('#tabbar a[href="#/music"]'))==null||r.setAttribute("aria-expanded","false"));const o=document.getElementById("pikkCreateMenu");o&&!o.hidden&&(o.hidden=!0,(d=document.querySelector('#tabbar a[href="#/create"]'))==null||d.setAttribute("aria-expanded","false")),a.hidden=!i,t==null||t.setAttribute("aria-expanded",String(i)),i?(c=a.querySelector("[data-section-close]"))==null||c.focus():t==null||t.focus()}const Cc=Object.freeze([{title:"Create on PIKK",items:[{title:"Post Photos",href:"#/posts?type=picture",detail:"Add photos · TEST MODE",icon:"camera"},{title:"Story",href:"#/story",detail:"Everyone or Crew · TEST MODE",icon:"camera"},{title:"Shorts / Reels",href:"#/posts?type=short",detail:"Short video · TEST MODE",icon:"videos"},{title:"Upload Video",href:"#/posts?type=video",detail:"Long video · TEST MODE",icon:"videos"},{title:"Create Post",href:"#/posts?type=text",detail:"Text / poll / link · TEST MODE",icon:"posts"},{title:"Go Live",href:"#/live?go=1",detail:"Start a stream · TEST MODE",icon:"live"},{title:"Upload Music",href:"#/music?view=upload",detail:"Beat / song · planned",icon:"music"},{title:"Sell Something",href:"#/marketplace",detail:"List a product · TEST MODE",icon:"merch"},{title:"Paid Content",href:"#/pricing",detail:"Premium creator content · planned",icon:"merch"}]},{title:"Social & Community",items:[{title:"Community Post",href:"#/community",detail:"Open community · preview",icon:"chat"},{title:"Reels",href:"#/posts?type=short",detail:"Short video · TEST MODE",icon:"videos"},{title:"Photo Post",href:"#/posts?type=picture",detail:"Photos · TEST MODE",icon:"camera"},{title:"PIKK Crew",href:"#/crew",detail:"Private story list · TEST MODE",icon:"heart"},{title:"Favorites",href:"#/favorites",detail:"People who rank first · TEST MODE",icon:"heart"},{title:"Create Poll",detail:"Interactive polls · Planned",icon:"posts"},{title:"Create Community",href:"#/community",detail:"Community area · preview",icon:"chat"},{title:"Create Chatroom",detail:"Room creation · Planned",icon:"msg"},{title:"Create Event",detail:"Events · Planned",icon:"explore"}]},{title:"Videos & Music",items:[{title:"Music Video",href:"#/posts?type=video",detail:"Video composer · TEST MODE",icon:"videos"},{title:"Short Video",href:"#/posts?type=short",detail:"Short composer · TEST MODE",icon:"videos"},{title:"Upload Song",detail:"Song publishing · Planned",icon:"music"},{title:"Upload Album",detail:"Album publishing · Planned",icon:"music"},{title:"Upload EP",detail:"EP publishing · Planned",icon:"music"},{title:"Upload Beats",detail:"Beat publishing · Planned",icon:"music"},{title:"Create Playlist",href:"#/music",detail:"Open music area · preview",icon:"music"},{title:"Add to Vault",href:"#/vault",detail:"Open Vault · preview",icon:"music"}]},{title:"Live & Commerce",items:[{title:"Schedule Live",detail:"Live scheduling · Planned",icon:"live"},{title:"Live Battle",href:"#/giftbattles",detail:"Battle area · preview",icon:"live"},{title:"List Product",href:"#/marketplace",detail:"Marketplace · TEST MODE",icon:"merch"},{title:"Seller Store",detail:"Store creation · Planned",icon:"merch"},{title:"Exclusive Content",detail:"Exclusive publishing · Planned",icon:"heart"}]},{title:"Creator Tools & Protection",items:[{title:"Creator Dashboard",href:"#/profile",detail:"Creator profile",icon:"profile"},{title:"Manage Content",href:"#/posts",detail:"Posts and content",icon:"posts"},{title:"Drafts",detail:"Draft management · Planned",icon:"posts"},{title:"Artist Protection",href:"#/shield",detail:"PIKK Shield local rights drafts · TEST MODE",icon:"music"},{title:"AI Support",detail:"Support assistant · Planned",icon:"chat"}]}]),Lh=Object.freeze(Cc.flatMap(e=>e.items)),Pc=Object.freeze([{label:"Songs",href:"#/music?view=songs",detail:"Browse released singles",icon:"♫"},{label:"Albums",href:"#/music?view=albums",detail:"Browse released albums",icon:"▣"},{label:"Beats",href:"#/music?view=beats",detail:"Beat marketplace not yet available",icon:"◉"},{label:"Playlists",href:"#/music?view=playlists",detail:"Verified YouTube playlists",icon:"▤"},{label:"Upload Music",href:"#/music?view=upload",detail:"Creator uploads coming later",icon:"⇧"},{label:"Trending",href:"#/music?view=songs",detail:"Most-played released songs",icon:"↗"},{label:"Music Vault",href:"#/vault",detail:"Vault · preview",icon:"◈"},{label:"AI Artists",href:"#/ai-artists",detail:"AI artist area · labelled AI",icon:"✦"},{label:"Open Mic",href:"#/openmic",detail:"Open mic sessions · TEST MODE",icon:"🎤"},{label:"Artist Earnings",href:"#/earnings",detail:"Creator earnings · TEST MODE",icon:"$"}]),Dh=Object.freeze({Songs:"music",Albums:"music",Beats:"music",Playlists:"videos","Upload Music":"music"});function Gs(e=!1){const t=document.getElementById("pikkMusicMenu");if(!t||t.hidden)return;t.hidden=!0;const s=document.querySelector('#tabbar a[href="#/music"]');s==null||s.setAttribute("aria-expanded","false"),e&&(s==null||s.focus())}function _h(){let e=document.getElementById("pikkMusicMenu");return e||(e=document.createElement("div"),e.id="pikkMusicMenu",e.className="pikk-create-overlay",e.hidden=!0,e.innerHTML=`<div class="pikk-create-sheet" role="dialog" aria-modal="true" aria-labelledby="pikkMusicMenuTitle">
    <div class="pikk-create-head"><strong id="pikkMusicMenuTitle">Music on PIKK</strong><button type="button" class="btn ghost" data-music-close aria-label="Close music menu">✕</button></div>
    <div class="pikk-create-options pikk-create-grid">
      ${Pc.map(t=>`<a class="pikk-create-tile" href="${t.href}"><span class="pikk-menu-icon" aria-hidden="true">${Zs[Dh[t.label]||"music"]}</span><strong class="pikk-menu-title">${t.label}</strong><small>${t.detail}</small></a>`).join("")}
    </div>
    <button type="button" class="pikk-menu-cancel" data-music-close>Cancel</button>
    <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · Beat selling and music uploads are not available yet</p>
  </div>`,document.body.appendChild(e),window.addEventListener("hashchange",()=>Gs()),e.addEventListener("click",t=>{t.target===e||t.target.closest("[data-music-close]")?Gs(!0):t.target.closest(".pikk-create-options a")&&Gs()}),document.addEventListener("keydown",t=>{if(e.hidden||(t.key==="Escape"&&(t.preventDefault(),Gs(!0)),t.key!=="Tab"))return;const s=[...e.querySelectorAll("a[href], button:not([disabled])")],a=s[0],i=s[s.length-1];if(!a){t.preventDefault();return}e.contains(document.activeElement)?t.shiftKey&&document.activeElement===a?(t.preventDefault(),i.focus()):!t.shiftKey&&document.activeElement===i&&(t.preventDefault(),a.focus()):(t.preventDefault(),(t.shiftKey?i:a).focus())}),e)}function Oh(e){var i,n;const t=_h(),s=t.hidden,a=document.getElementById("pikkCreateMenu");s&&a&&!a.hidden&&(a.hidden=!0,(i=document.querySelector('#tabbar a[href="#/create"]'))==null||i.setAttribute("aria-expanded","false")),t.hidden=!s,e==null||e.setAttribute("aria-expanded",String(s)),s?(n=t.querySelector("[data-music-close]"))==null||n.focus():e==null||e.focus()}const qa=Object.freeze([{tier:"spotlight",name:"Premium Spotlight",slots:1,day:199,week:999},{tier:"featured",name:"Featured Box",slots:2,day:99,week:499},{tier:"promo",name:"Promo Box",slots:3,day:49,week:249}]),$e=e=>Object.freeze(e),Ya=Object.freeze([{id:"featured",title:"Featured placements",link:"#/videos",items:qa.map(e=>$e({name:e.name,day:e.day,week:e.week,slots:e.slots}))},{id:"player",title:"Music Player placement",link:"#/home",items:[$e({name:"Top PIKK Music Player on Home (Trending / Promoted slot)",day:149,week:699,slots:20})]},{id:"storyrail",title:"Story rail placement",link:"#/home",items:[$e({name:"Home story rail (Trending / Promoted slot)",day:49,week:229,slots:20})]},{id:"music",title:"Music",link:"#/music",items:[$e({name:"Trending Music boost (tracks, albums)",day:29,week:129})]},{id:"videos",title:"Videos and Clips",link:"#/videos",items:[$e({name:"Video / Clip boost",day:19,week:89})]},{id:"live",title:"Live",link:"#/live",items:[$e({name:"Live stream boost (pre-live + during the live)",perStream:25})]},{id:"shop",title:"Shop",link:"#/shop",items:[$e({name:"Shop product boost",day:15,week:69}),$e({name:"Store spotlight",week:59})]},{id:"posts",title:"Posts and Stories",link:"#/posts",items:[$e({name:"Post / Story boost",day:9,week:39})]},{id:"profiles",title:"Profiles",link:"#/profile",items:[$e({name:"Profile / Creator boost",day:19,week:89})]},{id:"events",title:"Events",link:"#/openmic",items:[$e({name:"Event / Open Mic listing",perEvent:25})]},{id:"battles",title:"Battles and Roast",link:"#/giftbattles",items:[$e({name:"Battles / Roast Arena matchup feature",perMatch:35})]},{id:"communities",title:"Communities",link:"#/communities",items:[$e({name:"Community spotlight",week:29})]},{id:"dating",title:"Dating boost",link:"#/dating",gate:"18+ only · requires age & ID verification and safety review before launch",items:[$e({name:"Dating profile boost",hour:4.99,day:14.99})]}]),ns=e=>"$"+(Number.isInteger(e)?e:e.toFixed(2));function qh(e){return[e.hour!=null&&`${ns(e.hour)} / hour`,e.day!=null&&`${ns(e.day)} / 24h`,e.week!=null&&`${ns(e.week)} / 7 days`,e.perStream!=null&&`${ns(e.perStream)} per stream`,e.perEvent!=null&&`${ns(e.perEvent)} per event`,e.perMatch!=null&&`${ns(e.perMatch)} per match`].filter(Boolean)}const Ic=Object.freeze({player:20,storyrail:20,spotlight:1,featured:2,promo:3}),Rh=Object.freeze({player:0,storyrail:0,spotlight:0,featured:0,promo:0});function Nh(e,t){const s=Math.max(0,e|0),a=Math.min(s,Math.max(0,t|0)),i=s-a;return{cap:s,booked:a,left:i,soldOut:i===0,label:i===0?"Sold out":`${i} of ${s} slots left`}}const Bh=e=>`#/promote?s=${e}`;function Kh(e={}){return e.promoted&&e.house?"Promoted · House demo":e.trending===!0?"Trending":"House pick"}const Vi=e=>({title:e.title||e.label,href:e.href||"",detail:e.detail||""});function jh(e){return e==="music"?Pc.map(Vi):e==="create"?Lh.map(Vi):(oa[e]||[]).map(Vi)}const Fh=qn.map(e=>e.href.replace("#/","")),Gh=Object.freeze({id:"promote",label:"Promote",links:Ya.map(e=>({href:Bh(e.id),label:e.title}))}),Xr=[{id:"explore",label:"Explore",href:"#/explore"},{id:"profile",label:"Profile / Sign in",href:"#/profile"},{id:"messages",label:"Messages",href:"#/messages"},{id:"notifications",label:"Notifications",href:"#/notifications"},{id:"settings",label:"Settings",href:"#/settings"},{id:"donate",label:"Donate · PIKK goal",href:"#/donate"},{id:"support",label:"Support · Help & tickets",href:"#/support"}],Hi=e=>"/"+String(e).replace(/^#\/?/,"").split(/[?#]/)[0];function Uh(){const e=Fh.map(n=>{const o=qn.find(r=>r.href==="#/"+n);return{id:n,label:o.label,links:jh(n).map(r=>({href:r.href,label:r.title,soon:!r.href,detail:r.detail}))}}),t=new Set(["/home",...e.flatMap(n=>n.links.filter(o=>o.href).map(o=>Hi(o.href))),...Xr.map(n=>Hi(n.href)),"/promote"]),s=pl.flatMap(n=>n.href?[{href:n.href,label:n.label}]:n.links||[]),a=new Set,i=s.filter(n=>{const o=Hi(n.href);return t.has(o)||a.has(o)?!1:(a.add(o),!0)});return[{id:"home",label:"Home",href:"#/home"},...e,Gh,...Xr,{id:"more",label:"More",links:i},{id:"updates",label:"What's New · App Updates",href:"#/updates"}]}const Vh=3,Hh=3e4,Mc="pikk.playCounts.v1";let Lc={};const Dc=()=>{try{return globalThis.localStorage||null}catch{return null}};function _c(){const e=Dc();try{return JSON.parse((e?e.getItem(Mc):Lc.v)||"{}")}catch{return{}}}function zh(e){const t=JSON.stringify(e),s=Dc();s?s.setItem(Mc,t):Lc.v=t}const Zr=new Map;function lr(e,{kind:t="audio",seconds:s=0,opened:a=!1,source:i="organic",now:n=Date.now()}={}){var p;const o=String(e||"").trim();if(!o||(t==="story"?!a:!(Number(s)>=Vh)))return!1;const r=Zr.get(o);if(r!=null&&n-r<Hh)return!1;Zr.set(o,n);const d=_c(),c=d[o]||{total:0,promote:0};c.total+=1,i==="promote"&&(c.promote+=1),d[o]=c,zh(d);try{(p=globalThis.dispatchEvent)==null||p.call(globalThis,new CustomEvent("pikk:playcount",{detail:{id:o,count:c.total}}))}catch{}return!0}function Oc(e){var t;return((t=_c()[String(e||"").trim()])==null?void 0:t.total)||0}function qc(e,t="audio"){return`${e} ${t==="audio"?e===1?"play":"plays":e===1?"view":"views"} · this device`}function Rc(e=globalThis.document){var s,a;if(!(e!=null&&e.querySelectorAll))return;const t=i=>(String(i).match(/ytimg\.com\/vi(?:_webp)?\/([\w-]{6,})\//)||[])[1];for(const i of e.querySelectorAll('[data-yt], [data-video-id], img[src*="ytimg.com/vi"]')){const n=((s=i.dataset)==null?void 0:s.yt)||((a=i.dataset)==null?void 0:a.videoId)||t(i.getAttribute("src"));if(!n)continue;const o=i.tagName==="IMG"?i.parentElement:i;if(!o)continue;let r=o.querySelector(":scope > .pikk-play-count");const d=Oc(n);if(!d){r==null||r.remove();continue}r||(r=e.createElement?e.createElement("small"):globalThis.document.createElement("small"),r.className="pikk-play-count",o.appendChild(r)),r.dataset.playCountFor=n,r.textContent=qc(d,"video")}}const eo="https://www.youtube.com/iframe_api";let V=[],ee=0,_=null,xa=!1,Be=!1,Lt=!1;const Y=new Set;let to=!1,so=null;const ao=new Map;function nt(e){if(!e)return"";try{const t=new URL(e);if(t.hostname.includes("youtu.be"))return t.pathname.slice(1).split("/")[0]||"";const s=t.searchParams.get("v");if(s)return s;const a=t.pathname.match(/\/embed\/([^/?]+)/);if(a)return a[1]==="videoseries"?"":a[1]}catch{}return""}function io(e){if(!e)return"";try{return new URL(e).searchParams.get("list")||""}catch{return""}}function hs(e){return e?`https://i.ytimg.com/vi/${e}/hqdefault.jpg`:""}function Wh(){var n,o;const e=[],t=new Set,s=new Set,a=r=>{if(r.playlistId){if(s.has(r.playlistId))return;s.add(r.playlistId)}else if(r.youtubeId){if(t.has(r.youtubeId))return;t.add(r.youtubeId)}else return;e.push(r)};for(const r of ot){const d=((n=r.links)==null?void 0:n.youtube)||"",c=nt(d)||nt(((o=r.links)==null?void 0:o.youtubeMusic)||"");c&&a({id:r.id,title:r.title,artist:r.artist||"DatBoiSkeet",cover:r.cover||hs(c),youtubeId:c,youtube:d||`https://www.youtube.com/watch?v=${c}`,embed:`https://www.youtube.com/embed/${c}`,links:{...r.links||{},youtube:d||`https://www.youtube.com/watch?v=${c}`},kind:"track"})}for(const r of _n){const d=io(r.youtube)||io(r.embed);d&&a({id:r.id,title:r.title,artist:"DatBoiSkeet",cover:hs("DTe4OiX2otg")||"/brand/pikk-logo-square.png",playlistId:d,youtube:r.youtube,embed:r.embed||`https://www.youtube.com/embed/videoseries?list=${d}`,links:{youtube:r.youtube,youtubeMusic:he.youtubeMusic,spotify:he.spotify,apple:he.apple},kind:"mix"})}const i=new Set(["Music Videos"]);for(const r of ue){if(!i.has(r.category||"Music Videos")||!r.featured&&!["dirty-money","93","no-love","bouquet","where-im-from","go-2-work"].includes(r.id)&&!r.featured)continue;const d=nt(r.youtube)||nt(r.embed);if(!d||t.has(d))continue;const c=ot.find(p=>{var m;return nt(((m=p.links)==null?void 0:m.youtube)||"")===d});a({id:r.id,title:r.title,artist:r.artist||"DatBoiSkeet",cover:(c==null?void 0:c.cover)||hs(d),youtubeId:d,youtube:r.youtube,embed:r.embed||`https://www.youtube.com/embed/${d}`,links:{youtube:r.youtube,youtubeMusic:`https://music.youtube.com/watch?v=${d}`,...(c==null?void 0:c.links)||{}},kind:"mv"})}return V=e,ee>=V.length&&(ee=0),V}function et(e){return String(e||"").toLowerCase().replace(/\(.*?\)/g,"").replace(/[^a-z0-9]+/g," ").trim()}function Nc(){var a,i;const e=vc();if(!e)return{item:null,meta:null,playable:!1};const t=et(e.title),s=V.find(n=>et(n.title)===t||et(n.title).includes(t)||t.includes(et(n.title)));if(s&&(s.youtubeId||s.playlistId))return{item:{...s},meta:e,playable:!0};for(const n of ot){if(et(n.title)!==t&&!et(n.title).startsWith(t)&&!t.startsWith(et(n.title)))continue;const o=((a=n.links)==null?void 0:a.youtube)||"",r=nt(o)||nt(((i=n.links)==null?void 0:i.youtubeMusic)||"");return r?{item:{id:n.id,title:n.title,artist:n.artist||"DatBoiSkeet",cover:n.cover||hs(r),youtubeId:r,youtube:o||`https://www.youtube.com/watch?v=${r}`,embed:`https://www.youtube.com/embed/${r}`,links:{...n.links||{},youtube:o||`https://www.youtube.com/watch?v=${r}`},kind:"track"},meta:e,playable:!0}:{item:{id:n.id,title:n.title,artist:n.artist||"DatBoiSkeet",cover:n.cover||e.cover||"",youtube:o||he.youtube,embed:"",links:{...n.links||{}},kind:"track"},meta:e,playable:!1}}for(const n of ue){if(et(n.title)!==t&&!et(n.title).includes(t))continue;const o=nt(n.youtube)||nt(n.embed);if(o)return{item:{id:n.id,title:n.title,artist:n.artist||"DatBoiSkeet",cover:hs(o),youtubeId:o,youtube:n.youtube,embed:n.embed||`https://www.youtube.com/embed/${o}`,links:{youtube:n.youtube,youtubeMusic:`https://music.youtube.com/watch?v=${o}`},kind:"mv"},meta:e,playable:!0}}return{item:{id:e.id||"most-played",title:e.title||"Most played",artist:e.artist||"DatBoiSkeet",cover:e.cover||"",youtube:"",embed:"",links:{spotify:he.spotify,apple:he.apple,youtubeMusic:he.youtubeMusic,youtube:he.youtube},kind:"track"},meta:e,playable:!1}}function Bc(){const e=document.getElementById("spPlayNextMost"),t=document.getElementById("spPlayNextSub"),{meta:s,playable:a}=Nc();if(e){if(!s){e.hidden=!0;return}if(e.hidden=!1,e.dataset.playable=a?"1":"0",e.dataset.demo=s.demo?"1":"0",e.title=a?`Most played today · ${s.title} → Play next`:`Most played today · ${s.title} (Coming Soon / open platform)`,e.setAttribute("aria-label",`Play next — ${s.title}`),t){const i=s.demo?"DEMO · ":"";t.textContent=`${i}Most played today · ${s.title}`}}}function no(e){if(!e)return-1;if(!V.length)return V.push(e),ee=0,0;let t=V.findIndex(a=>e.youtubeId&&a.youtubeId===e.youtubeId||e.playlistId&&a.playlistId===e.playlistId||a.id===e.id);if(t===ee)return ee;if(t>=0){const[a]=V.splice(t,1);t<ee&&(ee-=1),e=a}const s=Math.min(ee+1,V.length);return V.splice(s,0,e),s}function Yh(){var n,o,r,d;const{item:e,meta:t,playable:s}=Nc();if(!t||!e){f("No most-played track yet");return}if(!s){const c=document.getElementById("spOpen"),p=((n=e.links)==null?void 0:n.apple)||((o=e.links)==null?void 0:o.youtubeMusic)||((r=e.links)==null?void 0:r.spotify)||((d=e.links)==null?void 0:d.youtube)||he.apple;c&&p&&(c.href=p),f(t.demo||t.status==="Coming Soon"?`${t.title} · Coming Soon — no in-app master. Open Music / Stream Everywhere when it drops.`:`${t.title} — open official platform (not in-app audio)`),Bc();return}if(Mi()||!!Lt&&Be&&Y.size===0||Y.size>0){const c=no(e);f(c===ee?`Already playing · ${e.title}`:`Queued next · ${e.title}`),ge();return}let i=V.findIndex(c=>e.youtubeId&&c.youtubeId===e.youtubeId||e.playlistId&&c.playlistId===e.playlistId||c.id===e.id);i<0&&(i=no(e)),Vc(i),f(`Playing · ${e.title}`)}const Ds=[];function Kc(){var e;return(e=window.YT)!=null&&e.Player?Promise.resolve(window.YT):new Promise(t=>{var a;if(Ds.push(t),xa)return;xa=!0;const s=window.onYouTubeIframeAPIReady;if(window.onYouTubeIframeAPIReady=()=>{xa=!1;try{s==null||s()}catch{}const i=window.YT;for(;Ds.length;)try{Ds.shift()(i)}catch{}vs()},document.querySelector(`script[src="${eo}"]`)){if((a=window.YT)!=null&&a.Player){xa=!1;const i=window.YT;for(;Ds.length;)try{Ds.shift()(i)}catch{}vs()}}else{const i=document.createElement("script");i.src=eo,i.async=!0,document.head.appendChild(i)}})}function jc(){Kc().then(()=>vs()).catch(()=>{})}function vs(){var n;if(!(document.getElementById("dbsStickyFrame")||document.getElementById("dbsYtHost"))||!((n=window.YT)!=null&&n.Player)||_)return;const t=V[ee],s={autoplay:0,controls:0,rel:0,modestbranding:1,playsinline:1,enablejsapi:1,origin:location.origin},a={height:"1",width:"1",playerVars:s,events:{onReady:()=>{ge()},onStateChange:o=>{if(clearTimeout(so),o.data===1){const r=V[ee];so=setTimeout(()=>{V[ee]===r&&Mi()&&(lr((r==null?void 0:r.youtubeId)||(r==null?void 0:r.title),{kind:"audio",seconds:3,source:r!=null&&r.promoted?"promote":"organic"}),ge())},3e3)}o.data===0&&Uc({auto:!0}),ge()},onError:()=>{f("YouTube embed error — Open on YouTube"),ge()}}};t!=null&&t.playlistId?a.playerVars={...s,listType:"playlist",list:t.playlistId}:t!=null&&t.youtubeId?a.videoId=t.youtubeId:a.videoId="DTe4OiX2otg";const i=document.getElementById("dbsStickyFrame")?"dbsStickyFrame":"dbsYtHost";_=new window.YT.Player(i,a)}function la({autoplay:e}={autoplay:!1}){const t=V[ee];if(!t||!(_!=null&&_.cueVideoById)){vs();return}try{t.playlistId?(typeof _.loadPlaylist=="function"?_.loadPlaylist({list:t.playlistId,listType:"playlist",index:0}):typeof _.cuePlaylist=="function"&&_.cuePlaylist({list:t.playlistId,listType:"playlist",index:0}),e&&Be&&Y.size===0&&setTimeout(()=>{try{_.playVideo()}catch{}},250)):t.youtubeId&&(e&&Be&&Y.size===0?_.loadVideoById(t.youtubeId):_.cueVideoById(t.youtubeId))}catch{}ge()}function Mi(){var e;try{return((e=_==null?void 0:_.getPlayerState)==null?void 0:e.call(_))===1}catch{return!1}}function ge(){var m,h,g;const e=V[ee],t=document.getElementById("spArt"),s=document.getElementById("spTitle"),a=document.getElementById("spSub"),i=document.getElementById("spPlay"),n=document.getElementById("spOpen"),o=document.getElementById("spSource"),r=Y.size>0,d=!r&&(Lt||Mi());t&&e&&(t.src=e.cover||hs(e.youtubeId||"")||"/brand/pikk-logo-square.png",t.alt=e.title||""),s&&(s.textContent=(e==null?void 0:e.title)||"PIKK Music");const c=document.getElementById("spPlays");if(c){const v=e?Oc(e.youtubeId||e.title):0;c.textContent=v?qc(v,"audio"):""}if(a&&(Be?r?a.textContent=`Paused · ${[...Y][0]} interrupt`:a.textContent=`${(e==null?void 0:e.artist)||"DatBoiSkeet"} · via YouTube (not Spotify in-app)`:a.textContent="Tap Play · YouTube embed · Stream Everywhere"),i&&(i.textContent=d?"❚❚":"▶",i.setAttribute("aria-label",d?"Pause":"Play PIKK Music"),i.dataset.playing=d?"1":"0"),n&&e){const v=((m=e.links)==null?void 0:m.apple)||((h=e.links)==null?void 0:h.youtubeMusic)||((g=e.links)==null?void 0:g.spotify)||e.youtube||he.apple;n.href=v,n.title="Open on official platform"}o&&(o.textContent=(e==null?void 0:e.kind)==="mix"?"YT Mix":(e==null?void 0:e.kind)==="mv"?"YT MV":"YouTube");const p=document.getElementById("spBadge");p&&(p.textContent=r?"INTERRUPTED":Be&&d?"PLAYING · YT":"TEST · YT EMBED"),Bc()}function Jh(){var e;if(Y.size>0){f("Paused for "+[...Y][0]+" — resume when done"),ge();return}Be=!0,Lt=!0,jc(),vs();try{if(_!=null&&_.playVideo){const t=(e=_.getPlayerState)==null?void 0:e.call(_);t===-1||t===5||t===void 0?la({autoplay:!0}):_.playVideo()}else{const t=setInterval(()=>{_!=null&&_.playVideo&&(clearInterval(t),la({autoplay:!0}))},120);setTimeout(()=>clearInterval(t),8e3)}}catch{f("Tap Play PIKK Music again if autoplay blocked")}ge()}function Qh({clearDesire:e}={}){var t;e&&(Lt=!1);try{(t=_==null?void 0:_.pauseVideo)==null||t.call(_)}catch{}ge()}function ka(e="user"){e&&e!=="user"&&Y.add(e),Qh({clearDesire:e==="user"}),ge()}function Fc(e){var t;if(e?Y.delete(e):Y.clear(),Y.size===0&&Be&&Lt)try{(t=_==null?void 0:_.playVideo)==null||t.call(_)}catch{}ge()}function Ja(e){return Fc(e)}function bs(){ka("video")}function zi(){ka("live")}function Gc(){Ja("live")}function dt(){Ja("video")}function Uc({auto:e}={}){V.length&&(ee=(ee+1)%V.length,Lt=!0,e||(Be=!0),la({autoplay:Be&&Y.size===0}),ge())}function Xh(){V.length&&(ee=(ee-1+V.length)%V.length,Be=!0,Lt=!0,la({autoplay:Y.size===0}),ge())}function Vc(e){e<0||e>=V.length||(ee=e,Be=!0,Y.clear(),Lt=!0,la({autoplay:!0}),ge())}function Zh(){var e,t,s,a,i,n;to||(to=!0,(e=document.getElementById("spPlay"))==null||e.addEventListener("click",()=>{Y.size>0&&Y.clear(),Mi()?ka("user"):Jh()}),(t=document.getElementById("spPrev"))==null||t.addEventListener("click",()=>{Y.clear(),Xh()}),(s=document.getElementById("spNext"))==null||s.addEventListener("click",()=>{Y.clear(),Uc()}),lf(),(a=document.getElementById("spOpen"))==null||a.addEventListener("click",o=>{f("Opening external music service (playback depends on provider)")}),(i=document.getElementById("spPlayNextMost"))==null||i.addEventListener("click",()=>{Yh()}),(n=document.getElementById("spQueueBtn"))==null||n.addEventListener("click",()=>{const o=document.getElementById("spQueuePanel");if(!o)return;o.hasAttribute("hidden")?(o.removeAttribute("hidden"),o.innerHTML=V.map((d,c)=>`<button type="button" class="sp-q-item${c===ee?" on":""}" data-i="${c}">
              <img src="${d.cover||""}" alt="" width="36" height="36" />
              <span><b>${ro(d.title)}</b><small>${ro(d.artist)} · ${d.kind}</small></span>
            </button>`).join(""),o.querySelectorAll(".sp-q-item").forEach(d=>{d.addEventListener("click",()=>{Vc(Number(d.dataset.i)),o.setAttribute("hidden","")})})):o.setAttribute("hidden","")}),document.addEventListener("click",o=>{const r=document.getElementById("spQueuePanel");!r||r.hasAttribute("hidden")||!o.target.closest("#spQueuePanel")&&!o.target.closest("#spQueueBtn")&&r.setAttribute("hidden","")}))}function ro(e){return String(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}let oo=!1;function ef(){oo||(oo=!0,window.addEventListener("dbs:interrupt-music",e=>{var s;const t=((s=e==null?void 0:e.detail)==null?void 0:s.reason)||"user";ka(t)}))}function tf(){Wh(),Zh(),ef(),ge(),jc(),setTimeout(()=>vs(),400)}function sf(e){var a,i;const t=e==="/live",s=e==="/videos"||e==="/home"||e==="/music"||e==="/vault";!t&&Y.has("live")&&Ja("live");for(const[n,o]of[...X.entries()])if(!document.getElementById(n)){o.playing&&(He=Math.max(0,He-1));try{(i=(a=o.player)==null?void 0:a.destroy)==null||i.call(a)}catch{}X.delete(n)}He===0&&!s&&Y.has("video")&&Ja("video"),ge()}const X=new Map;let He=0,lo=0;function bn(e){var s;if(!e||!(e instanceof Element))return!0;const t=e.id||"";return!!(t==="dbsStickyFrame"||t==="dbsYtHost"||(s=e.closest)!=null&&s.call(e,"#dbs-sticky-player, #stickyPlayer, #dbsStickyFrame, #dbsYtHost"))}function cr(e){return e?/youtube\.com\/embed|youtube-nocookie\.com\/embed|youtu\.be\//.test(e):!1}function af(e){let t=e.getAttribute("src")||e.src||"";if(!cr(t))return!1;let s=!1;return/[?&]enablejsapi=1(?:&|$)/.test(t)||(t+=(t.includes("?")?"&":"?")+"enablejsapi=1",s=!0),/[?&]origin=/.test(t)||(t+=(t.includes("?")?"&":"?")+"origin="+encodeURIComponent(location.origin),s=!0),s&&(e.setAttribute("src",t),e.src=t),!0}function nf(e){if(e.id&&!X.has(e.id)&&e.id!=="dbsStickyFrame"&&e.id!=="dbsYtHost"||e.id&&X.has(e.id))return e.id;lo+=1;const t=`dbs-page-yt-${lo}`;return e.id=t,t}function rf(e,t){var a,i,n;const s=X.get(e);if(s){if(clearTimeout(ao.get(e)),t.data===1){const o=(n=(i=(a=t.target)==null?void 0:a.getVideoData)==null?void 0:i.call(a))==null?void 0:n.video_id;o&&ao.set(e,setTimeout(()=>{var r,d;(r=X.get(e))!=null&&r.playing&&(lr(o,{kind:"video",seconds:3,source:(d=document.querySelector(`#${CSS.escape(e)}`))!=null&&d.closest("[data-promoted]")?"promote":"organic"}),Rc(document))},3e3))}t.data===1?(s.playing||(s.playing=!0,He+=1),bs()):(t.data===0||t.data===2)&&(s.playing&&(s.playing=!1,He=Math.max(0,He-1)),He===0&&dt())}}function Hc(e){var n,o;const t=typeof e=="string"?document.getElementById(e):e;if(!t||bn(t))return Promise.resolve(null);let s=t;if(t.tagName!=="IFRAME"&&(s=((n=t.querySelector)==null?void 0:n.call(t,"iframe"))||t),!s||s.tagName!=="IFRAME"||bn(s))return Promise.resolve(null);const a=s.getAttribute("src")||s.src||"";if(!cr(a)||!af(s))return Promise.resolve(null);const i=nf(s);return X.has(i)&&((o=X.get(i))!=null&&o.player)?Promise.resolve(X.get(i).player):Kc().then(()=>new Promise(r=>{var m;if(X.has(i)&&((m=X.get(i))!=null&&m.player)){r(X.get(i).player);return}const d=()=>{var h;if(!document.getElementById(i)){r(null);return}if(X.has(i)&&((h=X.get(i))!=null&&h.player)){r(X.get(i).player);return}try{const g=new window.YT.Player(i,{events:{onReady:()=>{},onStateChange:v=>rf(i,v),onError:()=>{}}});X.set(i,{player:g,el:s,playing:!1}),s.dataset.dbsYtBound="1",r(g)}catch(g){console.warn("[dbs] bindYoutubeInterrupt failed",i,g),r(null)}};if(s.dataset.dbsYtBound==="1"&&X.has(i)){r(X.get(i).player);return}let c=!1;const p=()=>{c||(c=!0,d())};s.addEventListener("load",p,{once:!0}),setTimeout(p,400)}))}function Li(e){const s=[...(e&&e.querySelectorAll?e:document).querySelectorAll("iframe")].filter(a=>{if(bn(a))return!1;const i=a.getAttribute("src")||a.src||"";return cr(i)});return Promise.all(s.map(a=>Hc(a)))}function of(e){var i,n;const t=typeof e=="string"?document.getElementById(e):e,s=typeof e=="string"?e:t==null?void 0:t.id;if(!s||s==="dbsStickyFrame"||s==="dbsYtHost")return;const a=X.get(s);if(a){a.playing&&(a.playing=!1,He=Math.max(0,He-1),He===0&&dt());try{(n=(i=a.player)==null?void 0:i.destroy)==null||n.call(i)}catch{}X.delete(s)}}function Aa(e){if(!Number.isFinite(e)||e<=0)return"--:--";const t=Math.floor(e);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}let Wi=!1;function lf(){var i;const e=document.getElementById("spSeek"),t=document.getElementById("spTimeCur"),s=document.getElementById("spTimeDur"),a=document.getElementById("spVol");!e||!t||!s||(e.addEventListener("input",()=>{Wi=!0}),e.addEventListener("change",()=>{var o,r;const n=((o=_==null?void 0:_.getDuration)==null?void 0:o.call(_))||0;n>0&&((r=_.seekTo)==null||r.call(_,Number(e.value)/1e3*n,!0)),Wi=!1}),a==null||a.addEventListener("input",()=>{var n;return(n=_==null?void 0:_.setVolume)==null?void 0:n.call(_,Number(a.value))}),(i=document.getElementById("spCast"))==null||i.addEventListener("click",()=>f("Cast is not available yet")),setInterval(()=>{var r,d;const n=((r=_==null?void 0:_.getDuration)==null?void 0:r.call(_))||0,o=((d=_==null?void 0:_.getCurrentTime)==null?void 0:d.call(_))||0;n>0?(e.disabled=!1,Wi||(e.value=String(Math.round(o/n*1e3))),t.textContent=o>0?Aa(o):"0:00",s.textContent=Aa(n),e.setAttribute("aria-valuetext",`${Aa(o)} of ${Aa(n)}`),e.style.setProperty("--sp-pct",`${o/n*100}%`)):(e.disabled=!0,t.textContent="--:--",s.textContent="--:--")},500))}const Qa=new Set;function Ke(){const e=(location.hash||"").replace(/^#/,"")||"/home";let t="",s=e;const a=e.indexOf("#");a>=0&&(t=e.slice(a+1).split("?")[0],s=e.slice(0,a));const i=s.startsWith("/")?s:"/"+s,n=i.indexOf("?"),o=n===-1?i:i.slice(0,n),r=n===-1?"":i.slice(n+1),d=o.split("/").filter(Boolean).map((c,p)=>{if(p===0)return c;try{return decodeURIComponent(c)}catch{return c}});return{path:"/"+(d[0]||"home"),parts:d,query:Object.fromEntries(new URLSearchParams(r)),elementId:t,raw:i}}function K(e){const s=(e.startsWith("#")?e:"#"+(e.startsWith("/")?e:"/"+e)).replace(/^#/,"");if((location.hash||"").replace(/^#/,"")===s){Qa.forEach(i=>i(Ke()));return}location.hash=s}function cf(e){return Qa.add(e),()=>Qa.delete(e)}function df(){const e=()=>Qa.forEach(t=>t(Ke()));window.addEventListener("hashchange",e),location.hash?e():location.hash="/home"}const Yi="/pikk-app/",cs=Yi.endsWith("/")?Yi.slice(0,-1):Yi;function lt(e){if(e==null||e==="")return e;const t=String(e);return/^(https?:|data:|blob:|idb:|#|\/\/)/i.test(t)||cs&&(t===cs||t.startsWith(cs+"/"))?t:t.startsWith("/")?cs+t:(cs||"")+"/"+t}function zc(e=document){cs&&(e.querySelectorAll("[src]").forEach(t=>{const s=t.getAttribute("src");if(!s)return;const a=lt(s);a!==s&&t.setAttribute("src",a)}),e.querySelectorAll("[srcset]").forEach(t=>{const s=t.getAttribute("srcset");if(!s||!s.includes("/"))return;const a=s.replace(/(^|,\s*)(\/(?!\/)[^\s,]+)/g,(i,n,o)=>n+lt(o));a!==s&&t.setAttribute("srcset",a)}),e.querySelectorAll("[data-zoom]").forEach(t=>{const s=t.getAttribute("data-zoom");if(!s)return;const a=lt(s);a!==s&&t.setAttribute("data-zoom",a)}),e.querySelectorAll("[poster]").forEach(t=>{const s=t.getAttribute("poster");if(!s)return;const a=lt(s);a!==s&&t.setAttribute("poster",a)}))}function Wc(e,t){e&&e.querySelectorAll("a[data-path]").forEach(s=>{const a=s.getAttribute("data-path")===t;s.classList.toggle("on",a),a?s.setAttribute("aria-current","page"):s.removeAttribute("aria-current")})}function pf(e,t){var i,n,o;const s=(o=(n=(i=t==null?void 0:t.querySelector)==null?void 0:i.call(t,"h1"))==null?void 0:n.textContent)==null?void 0:o.replace(/\s+/g," ").trim();return s?s.slice(0,80):(String((e==null?void 0:e.path)||"/home").split("/").filter(Boolean).pop()||"home").replace(/[-_]+/g," ").replace(/\b\w/g,r=>r.toUpperCase())}function uf(e,t,s,a=document){const i=pf(e,t);return a.title=`${i} | PIKK`,s&&(s.textContent=`${i} page loaded`),i}function mf({drawer:e,scrim:t,trigger:s},a,i=!1){var o;if(!e||!t||!s)return;const n=!!a;e.classList.toggle("open",n),e.setAttribute("aria-hidden",String(!n)),e.inert=!n,t.classList.toggle("show",n),s.setAttribute("aria-expanded",String(n)),s.setAttribute("aria-label",n?"Close navigation menu":"Open navigation menu"),n?(o=e.querySelector("button, a[href]"))==null||o.focus():i&&s.focus()}const hf="".trim().replace(/\/$/,"");function Yc(){return((typeof window<"u"&&typeof window.__PIKK_API_BASE__=="string"?window.__PIKK_API_BASE__.trim():"")||hf).replace(/\/$/,"")}function ys(){return!!Yc()}async function Rt(e,{method:t="GET",body:s}={}){var o,r,d;const a=Yc();if(!a){const c=new Error("PIKK API is not configured");throw c.code="api_not_configured",c}const i=await fetch(a+e,{method:t,credentials:"include",headers:s===void 0?void 0:{"Content-Type":"application/json"},body:s===void 0?void 0:JSON.stringify(s)});let n=null;try{n=await i.json()}catch{}if(!i.ok){const c=new Error(((o=n==null?void 0:n.error)==null?void 0:o.message)||`Request failed (${i.status})`);throw c.code=((r=n==null?void 0:n.error)==null?void 0:r.code)||"request_failed",c.status=i.status,c.details=((d=n==null?void 0:n.error)==null?void 0:d.details)||null,c.requestId=(n==null?void 0:n.request_id)||null,c}return n}const at={health:()=>Rt("/health"),me:()=>Rt("/auth/me"),signup:({email:e,handle:t,displayName:s,password:a,signupRoles:i=["member"],gender:n})=>Rt("/auth/signup",{method:"POST",body:{email:e,handle:t,display_name:s,password:a,signup_roles:i,...n?{gender:n}:{}}}),login:({email:e,password:t})=>Rt("/auth/login",{method:"POST",body:{email:e,password:t}}),logout:()=>Rt("/auth/logout",{method:"POST",body:{}}),verifyEmail:e=>Rt("/auth/verify",{method:"POST",body:{token:e}}),resendVerification:()=>Rt("/auth/resend-verification",{method:"POST",body:{}})},ff="".trim().replace(/\/$/,"");function Jc(){return((typeof window<"u"&&typeof window.__PIKK_API_BASE__=="string"?window.__PIKK_API_BASE__.trim():"")||ff).replace(/\/$/,"")}function Di(){return!!Jc()}async function rs(e,{method:t="GET",body:s}={}){var o,r,d;const a=Jc();if(!a){const c=new Error("PIKK API is not configured");throw c.code="api_not_configured",c}const i=await fetch(a+e,{method:t,credentials:"include",headers:s===void 0?void 0:{"Content-Type":"application/json"},body:s===void 0?void 0:JSON.stringify(s)});let n=null;try{n=await i.json()}catch{}if(!i.ok){const c=new Error(((o=n==null?void 0:n.error)==null?void 0:o.message)||`Request failed (${i.status})`);throw c.status=i.status,c.code=((r=n==null?void 0:n.error)==null?void 0:r.code)||"request_failed",c.details=((d=n==null?void 0:n.error)==null?void 0:d.details)||null,c}return n}const kt={list:()=>rs("/messages/conversations"),unreadCount:()=>rs("/messages/unread-count"),start:e=>rs("/messages/conversations",{method:"POST",body:{handle:e}}),get:e=>rs("/messages/conversations/"+encodeURIComponent(e)),send:(e,t)=>rs("/messages/conversations/"+encodeURIComponent(e)+"/messages",{method:"POST",body:{message:t}}),markRead:e=>rs("/messages/conversations/"+encodeURIComponent(e)+"/read",{method:"POST",body:{}})},gf="dbs_media_v1",ks="blobs",vf=1;function Qc(){return new Promise((e,t)=>{const s=indexedDB.open(gf,vf);s.onupgradeneeded=()=>{const a=s.result;a.objectStoreNames.contains(ks)||a.createObjectStore(ks,{keyPath:"id"})},s.onsuccess=()=>e(s.result),s.onerror=()=>t(s.error||new Error("idb open failed"))})}async function bf(e,t,s={}){const a=await Qc();return new Promise((i,n)=>{const o=a.transaction(ks,"readwrite");o.objectStore(ks).put({id:e,blob:t,mime:t.type||s.mime||"application/octet-stream",name:s.name||"",size:t.size||0,at:Date.now()}),o.oncomplete=()=>i(e),o.onerror=()=>n(o.error)})}async function yf(e){const t=await Qc();return new Promise((s,a)=>{const n=t.transaction(ks,"readonly").objectStore(ks).get(e);n.onsuccess=()=>s(n.result||null),n.onerror=()=>a(n.error)})}const Ji=new Map;async function _i(e){if(!e)return"";if(e.startsWith("idb:")){const t=e.slice(4);if(Ji.has(t))return Ji.get(t);const s=await yf(t);if(!(s!=null&&s.blob))return"";const a=URL.createObjectURL(s.blob);return Ji.set(t,a),a}return e}function kf(e="blob"){return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function Qi(e,t){return`<article class="pikk-ad-slot pikk-ad-${e.tier}" data-promo-tier="${e.tier}" aria-label="${e.name} slot ${t}, pricing preview">
    <span class="pikk-ad-slot-top"><span class="pikk-ad-slot-icon" aria-hidden="true">▶</span><span class="pikk-ad-slot-number">0${t}</span></span>
    <strong>${e.name}</strong>
    <span class="pikk-ad-slot-description">Available placement · booking coming soon</span>
    <span class="pikk-ad-slot-prices"><b>$${e.day}</b><small>/ 24 hours</small></span>
    <span class="pikk-ad-slot-week">$${e.week} / 7 days</span>
  </article>`}function Xc(){return`<section class="pikk-featured-inventory" aria-label="Featured on PIKK sponsored placement pricing">
      <div class="pikk-featured-heading"><div><p class="kicker">Creator &amp; brand visibility</p><h2>Featured on PIKK</h2></div><span class="pikk-featured-sponsored">Sponsored placements</span></div>
      <p class="pikk-featured-intro">Six premium advertising positions on each page. Preview pricing below; booking and checkout are not active yet.</p>
      <div class="pikk-featured-rows">
        <div class="pikk-featured-row pikk-featured-row-hero">${Qi(qa[0],1)}</div>
        <div class="pikk-featured-row pikk-featured-row-two">${[1,2].map(e=>Qi(qa[1],e)).join("")}</div>
        <div class="pikk-featured-row pikk-featured-row-three">${[1,2,3].map(e=>Qi(qa[2],e)).join("")}</div>
      </div>
      <p class="pikk-featured-footnote">Home and Videos placements are priced separately. Rates are introductory proposals; no paid placement or guaranteed views are currently offered.</p>
    </section>`}function wf(e){return`<div class="pikk-stories-promotions" data-featured-context="videos">
    <section class="pikk-stories-strip" aria-label="PIKK Stories preview">
      <div class="pikk-featured-heading"><div><p class="kicker">Connect in 24 hours</p><h2>PIKK Stories</h2></div><span class="pikk-featured-state">Coming soon</span></div>
      <div class="pikk-stories-preview">
        <div class="pikk-story-preview"><span class="pikk-story-ring"><span aria-hidden="true">＋</span></span><strong>Your Story</strong></div>
        <p>Share moments with your followers. Stories will disappear after 24 hours once publishing launches.</p>
      </div>
    </section>
    ${Xc()}
  </div>`}const Sf=Object.freeze(["Music","Rap","Gaming","Dance","Comedy","Sports","Art","Fashion"]),yn=15;function $f(){return`
  <section class="pikk-hs pikk-matchup" id="homeMatchUp" data-hs="matchup" data-test-mode aria-labelledby="homeMatchUpH">
    <div class="pikk-hs-head"><div><p class="kicker">Random 1-on-1 video chat</p>
      <h2 id="homeMatchUpH">PIKK Match Up <span class="pikk-badge-18" aria-label="18 plus only">18+</span> <span class="chip pikk-mu-test">TEST MODE</span></h2></div></div>
    <p class="pikk-mu-lead">Demo preview only — no camera or microphone is used and no real people are matched.</p>
    <div class="pikk-mu-tags" role="group" aria-label="Interest tags">${Sf.map(t=>`<button type="button" class="pikk-mu-tag" data-mu-tag="${l(t)}" aria-pressed="false">${l(t)}</button>`).join("")}</div>
    <div class="pikk-mu-stage">
      <div class="pikk-mu-tile pikk-mu-you" aria-label="Your tile (placeholder)"><span aria-hidden="true">◉</span><small>You · camera off (demo)</small></div>
      <div class="pikk-mu-tile pikk-mu-them" aria-label="Match tile (placeholder)"><span aria-hidden="true">?</span><small data-mu-status>Demo match placeholder</small></div>
    </div>
    <div class="pikk-mu-timer" aria-live="polite"><span data-mu-time>${yn}</span>s
      <button type="button" class="pikk-mu-btn" data-mu-add>+15s Add time</button></div>
    <div class="pikk-mu-actions">
      <button type="button" class="pikk-mu-btn pikk-mu-start" data-mu-start>Start matching</button>
      <button type="button" class="pikk-mu-btn" data-mu-next disabled>Skip / Next</button>
      <button type="button" class="pikk-mu-btn" data-mu-friend disabled>Add friend</button>
      <button type="button" class="pikk-mu-btn" data-mu-report disabled>Report</button>
      <button type="button" class="pikk-mu-btn" data-mu-block disabled>Block</button>
    </div>
    <p class="pikk-mu-safety" role="note"><strong>Safety:</strong> 18+ only. Never share personal info. Report or Block ends a chat right away. Live matching launches only after age verification and moderation are in place — this is a demo.</p>
  </section>`}function Ef(e){const t=e.querySelector("#homeMatchUp");if(!t)return;const s=g=>t.querySelector(g),a=s("[data-mu-time]"),i=s("[data-mu-status]");let n=yn,o=null,r=0;const d=()=>{o&&clearInterval(o),o=null},c=g=>["[data-mu-next]","[data-mu-friend]","[data-mu-report]","[data-mu-block]"].forEach(v=>{s(v).disabled=!g}),p=()=>[...t.querySelectorAll('.pikk-mu-tag[aria-pressed="true"]')].map(g=>g.dataset.muTag),m=()=>{d(),r+=1,n=yn,a.textContent=n,c(!0);const g=p();i.textContent=`Demo round ${r}${g.length?" · "+g.join(", "):""} · placeholder, not a real user`,o=setInterval(()=>{if(!document.body.contains(t))return d();n-=1,a.textContent=Math.max(n,0),n<=0&&(d(),c(!1),i.textContent="Time up (demo). Tap Start matching again.")},1e3)};t.querySelectorAll(".pikk-mu-tag").forEach(g=>g.addEventListener("click",()=>{const v=g.getAttribute("aria-pressed")!=="true";g.setAttribute("aria-pressed",String(v)),g.classList.toggle("is-on",v)})),s("[data-mu-start]").addEventListener("click",m),s("[data-mu-next]").addEventListener("click",m),s("[data-mu-add]").addEventListener("click",()=>{o&&(n+=15,a.textContent=n)}),s("[data-mu-friend]").addEventListener("click",()=>{i.textContent="Friend request (demo) — not sent; no real user."});const h=g=>{d(),c(!1),i.textContent=`${g} (demo) — chat ended. Real reports go to moderation at launch.`};s("[data-mu-report]").addEventListener("click",()=>h("Reported")),s("[data-mu-block]").addEventListener("click",()=>h("Blocked"))}const xf=e=>(String(e||"").match(/(?:v=|embed\/|youtu\.be\/)([\w-]{6,})/)||[])[1]||"",co=e=>{const t=xf(e);return t?`https://i.ytimg.com/vi/${t}/hqdefault.jpg`:""},os=(e,t="")=>e?`<img src="${l(e)}" alt="${l(t)}" loading="lazy" decoding="async"/>`:'<span class="hs-ph" aria-hidden="true">◆</span>',qe=(e,t,s,a,i,n="")=>`
  <section class="pikk-hs" id="hs-${e}" data-hs="${e}" aria-labelledby="hs-${e}-h">
    <div class="pikk-hs-head"><div><p class="kicker">${l(a)}</p><h2 id="hs-${e}-h">${l(t)}</h2></div><a class="pikk-hs-all" href="${s}" data-see-all>See all →</a></div>
    <div class="pikk-hs-row" role="list">${i}</div>${n?`<p class="pikk-hs-note">${l(n)}</p>`:""}
  </section>`,Te=(e,t,s,a,i="",n="")=>`<a class="pikk-hs-card ${i}" role="listitem" href="${e}"><span class="pikk-hs-media">${t}${n?`<span class="pikk-hs-badge">${l(n)}</span>`:""}</span><strong>${l(s)}</strong>${a?`<small>${l(a)}</small>`:""}</a>`,Af=["live","connect","posts","videos","music","dating","contest","matchup","battles","shop","more"],je=Object.freeze({music:"#/music",posts:"#/posts",videos:"#/videos",live:"#/live",connect:"#/connect",dating:"#/dating",games:"#/games",battles:"#/giftbattles",contest:"#/contest/twerk",shop:"#/shop"}),Tf=Object.freeze([["#/clips","Clips","Short clips feed"],["#/openmic","Open Mic","24/7 category · TEST MODE"],["#/spotlight","Spotlight","Request a feature · TEST MODE"],["#/multiguest","Multi-guest Live","Coming soon"],["#/fanclubs","Fan clubs","Coming soon"],["","Events","Coming soon · no page yet"],["#/crew","PIKK Crew","Private story list"],["#/story","Stories","Post a story"],["#/favorites","Favorites","Saved on this device"],["#/payments","$ Payments","Hub · TEST MODE · not live"],["#/wallet","Wallet","Coins · TEST MODE"],["#/earnings","Earnings","Creator payouts · TEST MODE"],["#/loyalty","Loyalty","Rewards · Coming soon"],["#/refer","Refer a friend","Invite link"],["#/ai-artists","AI Artists","Coming soon"],["#/vault","Vault","Exclusive drops · Coming soon"],["#/shield","PIKK Shield","Safety tools"],["#/support","Support","Help & contact"],["#/settings","Settings","Your preferences"],["#/updates","Updates","What’s new"],["#/notifications","Notifications","Your alerts"],["#/profile-shop","Profile shop","Creator storefront · TEST MODE"],["#/share","Share PIKK","Invite & share links"],["#/launch","Launch","Launch plan · Coming soon"],["#/phases","Roadmap phases","What ships next"],["#/guidelines","Community guidelines","Rules & safety"],["#/terms","Terms","Draft terms"],["#/privacy","Privacy","Draft privacy policy"]]);function Cf(){const e=ot.map(g=>Te("#/music",os(g.cover,g.title),g.title,`${g.artist} · ${g.type==="album"?"Album":"Single"}${g.year?" · "+g.year:""}`,"is-square",g.type==="album"?"Album":"Track")).join("")+[["#/music?view=playlists","Playlists","Curated lists"]].map(([g,v,b])=>Te(g,'<span class="hs-ph" aria-hidden="true">♪</span>',v,b,"is-chip")).join(""),s=ue.filter(g=>g.category==="Music Videos").slice(0,6).map((g,v)=>Te(v%3===1?"#/shorts":"#/posts",os(co(g.youtube),g.title),g.title,v%3===0?"Picture · house":v%3===1?"Short · house":"Video · house",v%3===1?"is-tall":"is-square",v%3===0?"Photo":v%3===1?"Short":"Video")).join(""),a=ue.slice(0,8).map(g=>Te("#/videos",os(co(g.youtube),g.title),g.title,`${g.artist||"DatBoiSkeet"} · PIKK Official`,"is-wide")).join(""),i=[["#/live","Live Rooms","Directory preview · TEST MODE"],["#/live?go=1","Go Live","Start a stream · TEST MODE"],["#/viral-live","24/7 Viral Live","Rotating clips · preview"]].map(([g,v,b])=>Te(g,'<span class="hs-ph hs-live" aria-hidden="true">●</span>',v,b,"is-chip")).join(""),n=[["#/explore","People","Discover creators"],["#/communities","Communities","Topics & votes · TEST MODE"],["#/community","PIKK Lounge","Channel rooms"],["#/live","Live connections","Rooms · TEST MODE"],["#/messages","Messages","Your inbox"],["#/connect#connect-random-chat","Random Chat","18+ · TEST MODE"],["#/connect#connect-multistream","Multi-platform go-live","TEST MODE · no real relay"]].map(([g,v,b])=>Te(g,'<span class="hs-ph" aria-hidden="true">◎</span>',v,b,"is-chip")).join(""),o=Te("#/dating",'<span class="hs-ph hs-18" aria-hidden="true">18+</span>',"PIKK Dating · pre-launch","Adults only · age & ID verification and safety review before launch. No profiles shown.","is-wide is-teaser"),d=Te("#/blockwars",os("/blockwars-preview/01-title.jpg","Block Wars"),"Block Wars","Coming Soon · gameplay paused","is-wide","Coming Soon")+ze.filter(g=>g.name!=="Block Wars").map(g=>Te("#/games",os(ra(g),g.name),g.name,"Coming Soon · concept art","is-square","Coming Soon")).join(""),c=[["#/giftbattles","Live Battles","Battle area · preview"],["#/roast-arena","Roast Arena","Matchups · preview"]].map(([g,v,b])=>Te(g,'<span class="hs-ph" aria-hidden="true">⚔</span>',v,b,"is-chip")).join(""),p=_e.slice(0,8).map(g=>Te("#/shop",os(g.image,g.name),g.name,`$${g.price} · Foreign X-Change`,"is-square")).join("")+Te("#/shop",'<span class="hs-ph" aria-hidden="true">⌂</span>',"Foreign X-Change store","Official merch store · checkout on merchant site","is-chip"),h={music:qe("music","Music",je.music,"Tracks & albums",e),posts:qe("posts","Posts",je.posts,"Pictures · shorts · videos",s,"House samples from official releases."),videos:qe("videos","Videos",je.videos,"Long-form",a),live:qe("live","Live",je.live,"Live now & go live",i,"Live streaming is TEST MODE; no viewer counts are shown."),connect:qe("connect","Connect",je.connect,"People · communities · live",n),dating:qe("dating","Dating",je.dating,"18+ · safety-gated",o),games:qe("games","Games",je.games,"PIKK Arcade · all games",d,"Concept previews · games are not playable yet."),battles:qe("battles","Battles & Roast",je.battles,"Head-to-head",c),contest:qe("contest","Contests",je.contest,"18+ · community",'<div class="pikk-hs-contest" role="listitem"><strong class="pikk-contest-title">Twerk Contest</strong><span class="pikk-badge-18" aria-label="18 plus only">18+</span><a class="pikk-contest-enter" href="#/contest/twerk">Enter</a></div>'),matchup:$f(),more:qe("more","More on PIKK","#/explore","Every feature · one tap",Tf.map(([g,v,b])=>g?Te(g,'<span class="hs-ph" aria-hidden="true">◆</span>',v,b,"is-chip"):`<div class="pikk-hs-card is-chip is-soon" role="listitem"><span class="pikk-hs-media"><span class="hs-ph" aria-hidden="true">◆</span></span><strong>${l(v)}</strong><small>${l(b)}</small></div>`).join("")),shop:qe("shop","Shop",je.shop,"Featured products & stores",p)};return`<div class="pikk-home-showcase" id="pikkHomeShowcase">${Af.map(g=>h[g]).join("")}</div>`}const Pf=Object.freeze(["partyline","board","livechat","servers"]),If={partyline:{title:"Party Line",kicker:"Voice + chat rooms",detail:"Drop-in group voice lines with chat. Coming soon — needs Safety review and the backend.",soon:!0},board:{title:"Message Board",kicker:"Public posts & replies",detail:"Short posts, replies and reposts from the community · TEST MODE",href:"#/posts"},livechat:{title:"Live Chat Room",kicker:"Chat during streams",detail:"Chat alongside live rooms · TEST MODE preview",href:"#/live"},servers:{title:"Community Servers",kicker:"Servers & channels",detail:"PIKK Lounge channel rooms and topic communities · TEST MODE",href:"#/community",extra:["#/communities","Browse communities"]}};function Mf(){return`<section class="pikk-hub" id="home-hub" aria-label="PIKK community">${Pf.map(t=>{const s=If[t],a=`<p class="kicker">${l(s.kicker)}</p><h3>${l(s.title)}</h3><p>${l(s.detail)}</p>`;return s.soon?`<div class="card pikk-hub-card is-soon" id="home-${t}" data-hub="${t}" data-coming-soon role="button" tabindex="0">${a}<span class="chip">Coming soon</span></div>`:`<div class="card pikk-hub-card" id="home-${t}" data-hub="${t}">${a}<div class="row wrap"><a class="btn primary" href="${s.href}">Open ${l(s.title)}</a>${s.extra?`<a class="btn ghost" href="${s.extra[0]}">${l(s.extra[1])}</a>`:""}</div></div>`}).join("")}</section>`}typeof document<"u"&&document.addEventListener("click",e=>{var i,n,o,r;const t=(n=(i=e.target).closest)==null?void 0:n.call(i,"[data-psv]");if(!t)return;const s=(o=t.closest(".pikk-psv"))==null?void 0:o.querySelector("[data-psv-track]");if(!s)return;const a=((r=s.querySelector(".pikk-psv-slide"))==null?void 0:r.getBoundingClientRect().width)||240;s.scrollBy({left:Number(t.dataset.psv)*(a+12),behavior:"smooth"})});const Lf={Explore:"🧭","Shorts / Clips":"▶",Music:"🎵",Videos:"🎬",Posts:"📸",Live:"🔴","PIKK Lounge":"💬",Vault:"🔐",Marketplace:"🛍️",Missions:"🎯"},Xa=[{id:"toplive",label:"Top live"},{id:"videos",label:"Videos"},{id:"rising",label:"Rising"},{id:"hot",label:"Hot lives"},{id:"songs",label:"Songs"}],Df=8e3,dr="dbs_home_stage_v2",_f=["dbs_home_stage"],Zc='<span class="chip pikk-example-tag" title="Example data · not real viewers">Example</span>';function ed(e){const t=Number(e)||0;return t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)}k`:String(t)}function Ta(e){return e?!!(e.house||e.hostId==="dbs"||e.hostName==="DatBoiSkeet"):!1}function po(e){return e?!!(e.house||e.userId==="dbs"||e.username==="DatBoiSkeet"):!1}function Of(e=3){const t=Ps(),s=t.filter(n=>!Ta(n)),a=t.filter(n=>Ta(n)),i=s.slice(0,Math.max(2,e-1));for(a[0]&&i.push(a[0]);i.length<e&&s[i.filter(n=>!Ta(n)).length];){const n=s[i.filter(o=>!Ta(o)).length];if(!n||i.includes(n))break;i.push(n)}return i.slice(0,e)}function qf(e=4){const t=hc(Math.max(8,e+4)),s=t.filter(n=>!po(n)),a=t.filter(n=>po(n)),i=[...s.slice(0,3)];a[0]&&i.push(a[0]);for(const n of s.slice(3)){if(i.length>=e)break;i.includes(n)||i.push(n)}for(const n of a.slice(1)){if(i.length>=e)break;i.includes(n)||i.push(n)}return i.slice(0,e)}function td(){const e=I().live,t=Ps().map(s=>({...s}));if(e&&!e.endedAt){const s=Math.max(0,Number(e.viewers)||0),a=Math.max(0,Number(e.giftsTotal)||0);t.push({id:e.id||"session",hostId:e.hostId,hostName:e.hostName||"Creator",title:e.title||"Live now",viewers:s,giftsTotal:a,score:s+a*20,house:e.hostId==="dbs"||e.hostName==="DatBoiSkeet"})}return t.sort((s,a)=>(Number(a.viewers)||0)-(Number(s.viewers)||0)||(Number(a.score)||0)-(Number(s.score)||0)),t[0]||null}function Ra(e,{rising:t=!1}={}){const s=e.house?"House":t?"Rising":"Hot",a=Number(e.viewers)||0,i=ed(a),n=t&&e.playbacksToday!=null?` · ~${l(String(e.playbacksToday))} playbacks today`:"";return`
    <a class="home-live-card" href="#/live">
      <div class="live-hoodie" aria-hidden="false">
        <span class="live-hoodie-pill">LIVE</span>
        <span class="live-hoodie-viewers" title="${l(i)} watching · example">${l(i)}</span>${Zc}
      </div>
      <div class="home-live-top">
        <span class="home-live-dot" aria-hidden="true"></span>
        <strong>@${l(e.hostName)}</strong>
        <span class="chip home-live-chip">${l(s)}</span>
      </div>
      <div class="home-live-title">${l(e.title||"Live now")}</div>
      <div class="home-live-stats muted">
        ${l(i)} watching (example) · ${l(String(e.giftsTotal||0))} gifts
        ${n}
      </div>
      <div class="home-live-score muted">Score ${l(String(e.score||0))} · TEST MODE seed</div>
    </a>`}function Rf(e){return e.mediaType==="video"?"Video":e.image||e.mediaType==="image"?"Pic":"Post"}function Nf(e){if(!e)return"";const t=Number(e.playsToday)||0,s=t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)}k`:String(t),a=e.cover?`<img class="la-thumb" src="${l(e.cover)}" alt="" loading="lazy" />`:'<span class="la-thumb la-thumb-empty" aria-hidden="true">♪</span>',i=e.demo?" · DEMO seed":"";return`
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
    </li>`}function Bf(e){const t=Number(e.viewers)||0,s=ed(t),a=e.house?"House":"Hot";return`
    <li class="la-row la-live">
      <a class="la-main" href="#/live">
        <span class="la-hoodie" aria-label="Live · ${l(s)} watching (example data)">
          <span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span>
          <span class="live-hoodie-viewers">${l(s)}</span>${Zc}
        </span>
        <span class="la-body">
          <strong>@${l(e.hostName)}</strong>
          <span class="la-preview">${l(e.title||"Live now")}</span>
          <span class="la-stats muted">${l(s)} watching (example) · ${l(String(e.giftsTotal||0))} gifts · score ${l(String(e.score||0))}</span>
        </span>
      </a>
      <span class="chip">${l(a)}</span>
    </li>`}function Kf(e){const t=e.postId||e.id,s=Rf(e),a=e.image?`<img class="la-thumb" src="${l(e.image)}" alt="" loading="lazy" />`:`<span class="la-thumb la-thumb-empty" aria-hidden="true">${l(((e.username||"?")[0]||"?").toUpperCase())}</span>`,i=e.house?" · house":"";return`
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
    </li>`}function jf(e){const t=e.coverRef&&!String(e.coverRef).startsWith("idb:")?e.coverRef:"";return`
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
    </li>`}function Ff(){for(const e of _f){try{sessionStorage.removeItem(e)}catch{}try{localStorage.removeItem(e)}catch{}}try{localStorage.removeItem(dr)}catch{}}function sd(){Ff();try{const e=sessionStorage.getItem(dr);if(Xa.some(t=>t.id===e))return e}catch{}return"toplive"}function Gf(e){try{sessionStorage.setItem(dr,e)}catch{}}function Za(e){return"$"+Number(e||0).toLocaleString(void 0,{maximumFractionDigits:2})}function Uf(e){const t=Math.max(0,e-Date.now()),s=Math.floor(t/36e5),a=Math.floor(t%36e5/6e4);return t<=0?"Ended":`${s}h ${a}m left`}function Vf(e){const t=e?Math.min(100,Math.round(e.raised/(e.targetAmount||1)*100)):0;return`<a class="home-goal-slim" id="home-app-goal" href="#/donate" aria-label="PIKK daily goal ${t}% funded. Open Donate">
    <span class="home-goal-slim-label"><strong>PIKK goal</strong><small>${e?`${Za(e.raised)} of ${Za(e.targetAmount)} · TEST MODE`:"No goal today"}</small></span>
    <span class="home-goal-slim-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${t}"><span style="width:${t}%"></span></span>
    <span class="btn primary home-goal-slim-btn">Donate</span>
  </a>`}function ad(e){if(!e)return'<p class="muted" style="margin:0">No daily app goal right now.</p>';const t=Math.min(100,Math.round(e.raised/(e.targetAmount||1)*100));return`
    <div class="home-goal-head"><strong class="home-goal-name">${l(e.name)}</strong>
      <span class="chip home-goal-time" id="homeGoalTimeLeft">${Uf(e.endsAt)}</span></div>
    <div class="home-goal-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${t}">
      <div class="home-goal-fill" style="width:${t}%"></div></div>
    <p class="muted home-goal-amounts" style="margin:6px 0 10px">${Za(e.raised)} raised of ${Za(e.targetAmount)} · ${t}%</p>
    <div class="row wrap" style="gap:8px">
      ${[50,100,250].map(s=>`<button type="button" class="btn ghost home-goal-donate" data-goal-id="${l(e.id)}" data-coins="${s}">Donate ${s} coins</button>`).join("")}
      <form class="home-goal-custom-form" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;align-items:end">
        <label style="flex:1;min-width:125px">Custom coins
          <input class="home-goal-custom-coins" type="number" inputmode="numeric" min="1" max="1000000" step="1" required placeholder="Enter coins" style="width:100%" />
        </label>
        <button type="submit" class="btn primary">Donate custom</button>
      </form>
    </div>`}function Hf(){var Le;const e=bp.map(T=>`
    <a class="preview-card" href="#${T.route}${T.hash?"#"+T.hash:""}">
      <span class="pc-icon" aria-hidden="true">${Lf[T.title]||"◆"}</span>
      <strong>${l(T.title)}</strong>
      <span class="muted">${l(T.blurb)}</span>
    </a>`).join(""),t=us.map(T=>`
    <a class="cover-card" href="#/music">
      <div class="cover-frame">
        <span class="badge-cs">${l(T.status)}</span>
        <img src="${l(T.cover)}" alt="${l(T.title)}" loading="lazy" />
      </div>
      <div class="t">${l(T.title)}</div>
      <div class="sub">${l(T.artist)}</div>
    </a>`).join(""),s=ue.filter(T=>(T.category||"Music Videos")==="Music Videos"),a=s.filter(T=>T.featured),i=a.length?a:s.slice(0,6),n=i[0]||s[0]||ue[0],o=_n[0];i.map(T=>`
    <div class="vid">
      <a class="thumb" href="${l(T.youtube)}" target="_blank" rel="noopener" aria-label="Play ${l(T.title)}"><span>▶</span></a>
      <div>
        <strong>${l(T.title)}</strong>
        <div class="muted" style="font-size:12px;margin-top:4px">
          <a href="${l(T.youtube)}" target="_blank" rel="noopener">Watch on YouTube</a>
          · <a href="#/videos">Embed on Videos</a>
        </div>
      </div>
    </div>`).join("");const r=i.map((T,Se)=>`
    <button type="button" class="mv-pick${Se===0?" on":""}" data-embed="${l(T.embed)}" data-title="${l(T.title)}" data-yt="${l(T.youtube)}">
      <span class="mv-pick-play" aria-hidden="true">▶</span>
      <span class="mv-pick-t">${l(T.title)}</span>
    </button>`).join("");o&&`${l(ct(o.embed))}${l(o.title)}${l(o.youtube)}`;const c=Ht({publishedOnly:!0,types:["picture"]}).map(T=>`
    <div class="cover-card catalog-admin-home" data-id="${l(T.id)}">
      <div class="cover-frame">
        <span class="badge-cs">From Admin</span>
        <img data-idb-src="${l(T.coverRef&&T.coverRef.startsWith("idb:")?T.coverRef:"")}" src="${l(T.coverRef&&!T.coverRef.startsWith("idb:")?T.coverRef:"")}" alt="${l(T.title)}" loading="lazy" />
      </div>
      <div class="t">${l(T.title)}</div>
      <div class="sub">${l(T.artist)}</div>
    </div>`).join("");Ht({publishedOnly:!0,types:["video"]}).slice(0,3).map(T=>`
    <div class="vid catalog-admin-home" data-id="${l(T.id)}">
      <a class="thumb" href="${l(T.youtube||"#/videos")}" ${T.youtube?'target="_blank" rel="noopener"':""}><span>▶</span></a>
      <div>
        <strong>${l(T.title)}</strong>
        <div class="muted" style="font-size:12px;margin-top:4px">${l(T.artist)} · Admin</div>
      </div>
    </div>`).join("");const m=I().live,h=m&&!m.endedAt?`<li class="la-row la-session"><a class="la-main" href="#/live"><span class="la-hoodie" aria-label="Live now"><span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span><span class="live-hoodie-viewers">Demo · no real viewers</span></span><span class="la-body"><strong>@${l(m.hostName)}</strong><span class="la-preview">${l(m.title||"Live now")}</span><span class="la-stats muted">${l(String(m.viewers||0))} watching · your session</span></span></a><span class="chip">Live</span></li>`:"",g=vc(),v=Nf(g),b=Of(3),y=qf(4),k=Ht({publishedOnly:!0,types:["picture"]}).slice(0,2),S=b.map(Bf).join(""),x=y.map(Kf).join(""),w=k.map(jf).join(""),q=`${v}${h}${S}${x}${w}
        <li class="la-row la-kicker"><span class="la-main la-kicker-main"><span class="la-body"><strong>Ladies Only</strong><span class="la-preview">Art live on Music · playback when it drops</span></span></span><span class="chip">Music</span></li>
        <li class="la-row la-kicker"><a class="la-main" href="#/restream"><span class="la-body"><strong>PIKK Restream</strong><span class="la-preview">Stream to YouTube, TikTok, Twitch &amp; more — free inside PIKK</span></span></a><span class="chip">Restream</span></li>${!v&&!S&&!x&&!w&&!h?'<li class="la-row"><span class="la-main la-kicker-main"><span class="la-body"><span class="la-preview muted">No hot activity yet — engage on Posts / go Live to spike the feed.</span></span></span><span class="chip">TEST</span></li>':""}`,$=sd(),U=Xa.map(T=>`
    <button type="button" class="home-stage-tab${T.id===$?" on":""}" role="tab"
      aria-selected="${T.id===$?"true":"false"}" data-stage="${T.id}" id="stage-tab-${T.id}">
      ${l(T.label)}
    </button>`).join(""),L=Ps().slice(0,5),B=gh().slice(0,5),W=L.map(T=>Ra(T)).join("")||'<p class="muted">No hot lives yet — seed from Live / Hot Feed.</p>',D=B.map(T=>Ra(T,{rising:!0})).join("")||'<p class="muted">No rising streamers yet.</p>',O=us.map(T=>`
    <a class="home-song-card" href="#/music">
      <img src="${l(T.cover)}" alt="" loading="lazy" />
      <div>
        <strong>${l(T.title)}</strong>
        <div class="muted" style="font-size:12px">${l(T.artist)} · ${l(T.status)}</div>
        <span class="chip" style="margin-top:6px">Enhancement · Coming Soon</span>
      </div>
    </a>`).join(""),N=td(),te=N?Ra(N):'<p class="muted">No live streams right now — go Live or check Hot Feed.</p>',ke=`
    <div class="home-stage-panel${$==="toplive"?" on":""}" data-panel="toplive" role="tabpanel" id="homeTopLivePanel" ${$==="toplive"?"":"hidden"}>
      <p class="muted home-stage-lead">Top live · highest viewers right now. Red LIVE hoodie on the card · updates as rankings change.</p>
      <div class="home-live-grid" id="homeTopLiveGrid">${te}</div>
      <a class="btn ghost block" href="#/live" style="margin-top:10px">Open Live</a>
    </div>`,H=`
    <div class="home-stage-panel${$==="videos"?" on":""}" data-panel="videos" role="tabpanel" ${$==="videos"?"":"hidden"}>
      <div class="hero-video" id="homeFeaturedVideo">
        <iframe
          id="homeFeaturedIframe"
          src="${l(ct(n.embed))}"
          title="${l(n.title)}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          loading="lazy"></iframe>
      </div>
      <div class="hero-caption">
        <strong id="homeFeaturedTitle">${l(n.title)}</strong>
        <a href="#/videos">All videos →</a>
      </div>
      <div class="mv-carousel" role="tablist" aria-label="Official music videos">${r}</div>
    </div>`,se=`
    <div class="home-stage-panel${$==="rising"?" on":""}" data-panel="rising" role="tabpanel" ${$==="rising"?"":"hidden"}>
      <p class="muted home-stage-lead">Rising streamers · mid-tier creators from §38 Hot Feed signals (non-house). TEST MODE seeds.</p>
      <div class="home-live-grid">${D}</div>
      <a class="btn ghost block" href="#/live" style="margin-top:10px">Open Live</a>
    </div>`,we=`
    <div class="home-stage-panel${$==="hot"?" on":""}" data-panel="hot" role="tabpanel" ${$==="hot"?"":"hidden"}>
      <p class="muted home-stage-lead">Hot lives · ranked by viewers + gifts score (house OK). Strong playbacks / spikes from earlier today count.</p>
      <div class="home-live-grid">${W}</div>
      <a class="btn ghost block" href="#/live" style="margin-top:10px">Open Live</a>
    </div>`,z=`
    <div class="home-stage-panel${$==="songs"?" on":""}" data-panel="songs" role="tabpanel" ${$==="songs"?"":"hidden"}>
      <p class="muted home-stage-lead">Enhancements &amp; songs · Coming Soon covers + featured tracks. Upload &amp; sell on Music when Commerce lands.</p>
      <div class="home-song-grid">${O}
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
    </div>`,Me=`
    <div class="home-stage card" id="homeFeaturedStage" data-active="${l($)}">
      <div class="home-stage-head">
        <div>
          <p class="kicker" style="margin:0">Featured stage</p>
          <h2 class="home-stage-title">Top live · Videos · Rising · Hot · Songs</h2>
        </div>
        <span class="chip chip-audit">TEST MODE · auto-cycle</span>
      </div>
      <div class="home-stage-tabs" role="tablist" aria-label="Featured stage">${U}</div>
      <div class="home-stage-panels">
        ${ke}
        ${H}
        ${se}
        ${we}
        ${z}
      </div>
    </div>`,Xe=`
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
    </div>`,Dt=Vf(Ga()),_t=i.slice(0,6).map((T,Se)=>{const Ms=new URL(T.youtube).searchParams.get("v")||"",Ls=Ms?`https://i.ytimg.com/vi/${encodeURIComponent(Ms)}/hqdefault.jpg`:"";return`<a class="pikk-home-media-card ${Se<2?"is-featured":""}" href="${l(T.youtube)}" target="_blank" rel="noopener noreferrer"
       aria-label="Watch ${l(T.title)} on YouTube">
       ${Ls?`<img src="${l(Ls)}" alt="" loading="${Se<2?"eager":"lazy"}" decoding="async" referrerpolicy="no-referrer"/>`:'<span class="pikk-home-media-fallback" aria-hidden="true">♫</span>'}
       <span class="pikk-home-media-shadow"></span>
       <span class="pikk-home-media-badge">▶ OFFICIAL VIDEO</span>
       <span class="pikk-home-media-title">${l(T.title)}</span>
     </a>`}).join(""),ht=[...ot.map(T=>T.cover),...us.slice(0,4).map(T=>T.cover)].filter(Boolean),Ot=[{label:"For You",href:"#/explore"},{label:"Following",href:"#/posts"},{label:"Music",href:"#/music"},{label:"Nearby",href:"#/connect"},{label:"Live",href:"#/live"}].map((T,Se)=>`
    <a class="pikk-home-circle" href="${T.href}" aria-label="Open ${l(T.label)}">
      <span class="pikk-home-circle-ring">${ht[Se]?`<img src="${l(ht[Se])}" alt="" loading="lazy" decoding="async"/>`:'<span aria-hidden="true">●</span>'}</span>
      <small class="pikk-rail-tag">${l(Kh(T))}</small>
      <span>${l(T.label)}</span>
    </a>`).join(""),Q=`
    <section class="pikk-home-visual" id="pikkHomeVisual" aria-labelledby="pikkHomeVisualTitle">
      <div class="pikk-home-visual-top">
        <div><p class="kicker">PIKK DISCOVER</p><h2 id="pikkHomeVisualTitle">Your music. Your world.</h2></div>
        <a href="#/explore" class="pikk-home-visual-more">Explore ↗</a>
      </div>
      <nav class="pikk-home-circle-strip" aria-label="Browse PIKK features">
        <a class="pikk-home-circle pikk-home-circle-me" href="#/posts?compose=1" aria-label="Create a post on PIKK">
          <span class="pikk-home-circle-ring">${(Le=I().user)!=null&&Le.avatar?`<img src="${l(I().user.avatar)}" alt="" loading="lazy" decoding="async"/>`:'<span class="pikk-home-circle-avatar" aria-hidden="true"><svg viewBox="0 0 24 24" width="40" height="40"><circle cx="12" cy="8.5" r="4" fill="currentColor"/><path d="M4 21c1.4-4.2 4.6-6.3 8-6.3s6.6 2.1 8 6.3" fill="currentColor"/></svg></span>'}</span>
          <span class="pikk-home-circle-plus" aria-hidden="true">+</span><span>Create</span>
        </a>
        ${Ot}
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
        ${_t}
      </div>
      <div class="pikk-home-media-footer">
        <p class="muted">Real official releases · Video thumbnails from YouTube · No fabricated views or live counts</p>
        <a href="#/videos">View all videos →</a>
      </div>
    </section>`,Ae=`
    ${Dt}
    ${Q}
    ${Me}
    ${Cf()}
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



    ${Xe}

    <section class="home-arcade card" id="homeArcade" aria-label="PIKK Games featured slideshow">
      <div class="home-arcade-top">
        <div><p class="kicker">Discover the arcade</p><h2>15 GAMES. ONE PIKK.</h2></div>
        <a href="#/games" class="btn ghost">All games →</a>
      </div>
      <div class="home-arcade-stage" aria-live="off">
        ${ze.map((T,Se)=>`<article class="home-arcade-slide pikk-game-${l(T.theme)}" data-game-slide="${Se}" ${Se?"hidden":""}>
          <div class="home-arcade-image">${T.artwork?`<img src="${l(ra(T))}" alt="" loading="lazy" decoding="async" />`:`<span class="home-arcade-symbol" aria-hidden="true">${T.icon}</span>`}</div>
          <div class="home-arcade-info">
            <span class="chip">GAME ${Se+1} OF 15 · COMING SOON</span>
            <h3>${l(T.name)}</h3>
            <p>${l(T.description)}</p>
            <small>${l(T.players)} ${T.players==="1"?"Player":"Players"} · Preview only</small>
            <a class="btn primary" href="${l(T.href||"#/games")}">View in Arcade</a>
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



    <p class="kicker">Coming Soon</p>
    <h2 style="margin:0 0 8px;font-size:15px;text-transform:uppercase;letter-spacing:.04em">Upcoming Releases</h2>
    <div class="cover-row" style="margin-bottom:18px">${t}${c}</div>

    <p class="kicker">DatBoiSkeet Network</p>
    <h2 style="margin:0 0 8px;font-size:15px;text-transform:uppercase;letter-spacing:.04em">Explore PIKK</h2>
    <div class="section-swipe" style="margin-bottom:18px">${e}</div>

    ${Mf()}

    <div class="card live-activity" id="home-live-activity">
      <div class="live-activity-head">
        <h3><span class="dot" aria-hidden="true"></span> Live activity</h3>
        <span class="chip">TEST MODE</span>
      </div>
      <p class="muted live-activity-lead">Most played today · hot lives · high-engagement posts from creators &amp; community · house updates.</p>
      <ul class="list-plain live-activity-list">
        ${q}
      </ul>
      <div class="row wrap live-activity-links">
        <a class="btn ghost" href="#/music">Music</a>
        <a class="btn ghost" href="#/live">Live</a>
        <a class="btn ghost" href="#/posts">Posts · Hot</a>
      </div>
    </div>
  `;return P("Home",Ae,{lead:"Featured stage · PIKK Match Up (TEST MODE) · creator sell DEMO · PIKK Arcade · Party Line · message board · live chat · community servers · live activity."})}function zf(e){var q,$,U,L,B,W;const t=e.querySelector("#homeArcade");if(t){const D=[...t.querySelectorAll("[data-game-slide]")],O=t.querySelector("#homeArcadePosition");let N=0,te=null;const ke=($=(q=window.matchMedia)==null?void 0:q.call(window,"(prefers-reduced-motion: reduce)"))==null?void 0:$.matches,H=z=>{N=(z+D.length)%D.length,D.forEach((Me,Xe)=>{Me.hidden=Xe!==N}),O&&(O.textContent=`${N+1} / ${D.length}`)},se=()=>{te!==null&&clearInterval(te),te=null};(U=t.querySelector("[data-arcade-prev]"))==null||U.addEventListener("click",()=>{se(),H(N-1)}),(L=t.querySelector("[data-arcade-next]"))==null||L.addEventListener("click",()=>{se(),H(N+1)}),ke||(te=setInterval(()=>{if(!document.body.contains(t)){se();return}document.visibilityState==="visible"&&H(N+1)},6500));const we=new MutationObserver(()=>{document.body.contains(t)||(se(),we.disconnect())});we.observe(document.body,{childList:!0,subtree:!0})}id(e),Ef(e);const s=e.querySelector(".page-head");if(s){s.querySelectorAll(".badge-phase, a.badge-phase, .live-hoodie-pill, .live-hoodie").forEach(O=>{O.remove()}),s.querySelectorAll("a, span, button").forEach(O=>{const N=(O.textContent||"").replace(/\s+/g," ").trim();(/^●?\s*LIVE$/i.test(N)||N==="LIVE")&&O.remove()});const D=s.querySelector("h1");D&&[...D.children].forEach(O=>{const N=(O.textContent||"").replace(/\s+/g," ").trim();(/LIVE/i.test(N)||O.classList.contains("badge-phase")||O.classList.contains("live-hoodie-pill"))&&O.remove()})}e.querySelectorAll("[data-idb-src]").forEach(async D=>{const O=D.getAttribute("data-idb-src");if(!O)return;const N=await _i(O);N&&(D.tagName==="IMG"||D.tagName==="VIDEO"||D.tagName==="AUDIO")&&(D.src=N)});const a=e.querySelector("#homeFeaturedIframe"),i=e.querySelector("#homeFeaturedTitle");e.querySelectorAll(".mv-pick").forEach(D=>{D.addEventListener("click",()=>{e.querySelectorAll(".mv-pick").forEach(N=>N.classList.remove("on")),D.classList.add("on");const O=D.dataset.embed||"";a&&O&&(of(a),a.removeAttribute("data-dbs-yt-bound"),a.src=O+(O.includes("?")?"&":"?")+"rel=0",a.title=D.dataset.title||"",Hc(a)),i&&(i.textContent=D.dataset.title||"")})}),Li(e);const n=e.querySelector("#bwPreviewVideo"),o=e.querySelector("#bwPreviewPlay");if(n){const D=()=>{if(!o)return;const O=n.paused||n.ended;o.hidden=!O,o.setAttribute("aria-hidden",O?"false":"true")};o==null||o.addEventListener("click",O=>{O.preventDefault(),n.play().catch(()=>{})}),n.addEventListener("play",()=>{bs(),D()}),n.addEventListener("pause",()=>{dt(),D()}),n.addEventListener("ended",()=>{dt(),D()}),n.addEventListener("pointerdown",()=>{n.paused||bs()}),D()}const r=2e4;function d(){const D=e.querySelector("#homeTopLiveGrid");if(!D||!document.body.contains(D))return!1;const O=td();return D.innerHTML=O?Ra(O):'<p class="muted">No live streams right now — go Live or check Hot Feed.</p>',!0}let c=setInterval(()=>{d()||(clearInterval(c),c=null)},r);const p=()=>{document.visibilityState==="visible"&&d()};document.addEventListener("visibilitychange",p),window.addEventListener("focus",d);const m=e.querySelector("#homeFeaturedStage");if(!m){const D=new MutationObserver(()=>{document.body.contains(e)||(c&&clearInterval(c),document.removeEventListener("visibilitychange",p),window.removeEventListener("focus",d),D.disconnect())});D.observe(document.body,{childList:!0,subtree:!0});return}const h=[...e.querySelectorAll(".home-stage-tab")],g=[...e.querySelectorAll(".home-stage-panel")];let v=!1,b=null;const y=typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||document.documentElement.classList.contains("reduce-motion")||((W=(B=document.body)==null?void 0:B.classList)==null?void 0:W.contains("reduce-motion"));function k(D){Xa.some(O=>O.id===D)||(D="toplive"),m.dataset.active=D,Gf(D),h.forEach(O=>{const N=O.dataset.stage===D;O.classList.toggle("on",N),O.setAttribute("aria-selected",N?"true":"false")}),g.forEach(O=>{const N=O.dataset.panel===D;O.classList.toggle("on",N),N?O.removeAttribute("hidden"):O.setAttribute("hidden","")})}function S(){const D=Xa.map(te=>te.id),O=m.dataset.active||"toplive",N=D.indexOf(O);k(D[(N+1)%D.length])}function x(){w(),!(v||y)&&(b=setInterval(S,Df))}function w(){b&&(clearInterval(b),b=null)}h.forEach(D=>{D.addEventListener("click",()=>{v=!0,w(),k(D.dataset.stage)})});const A=sd()||"toplive";k(A),y||setTimeout(()=>{!document.body.contains(m)||v||x()},1e4);const M=new MutationObserver(()=>{document.body.contains(m)||(w(),c&&(clearInterval(c),c=null),document.removeEventListener("visibilitychange",p),window.removeEventListener("focus",d),M.disconnect())});M.observe(document.body,{childList:!0,subtree:!0})}function id(e){const t=e.querySelector("#homeAppGoalBody");if(t){const s=()=>{document.body.contains(t)?t.innerHTML=ad(Ga()):(clearInterval(i),document.removeEventListener("visibilitychange",a))},a=()=>{document.visibilityState==="visible"&&s()},i=setInterval(s,3e4);document.addEventListener("visibilitychange",a),t.addEventListener("submit",n=>{var c,p;if(!n.target.matches(".home-goal-custom-form"))return;n.preventDefault();const o=Number((c=n.target.querySelector(".home-goal-custom-coins"))==null?void 0:c.value);if(!Number.isSafeInteger(o)||o<1||o>1e6)return f("Enter 1–1,000,000 whole coins");const r=(p=Ga())==null?void 0:p.id,d=Ua(r,o);f(d!=null&&d.ok?"Custom donation sent · TEST MODE":(d==null?void 0:d.error)==="insufficient"?"Not enough demo coins":(d==null?void 0:d.error)==="signin"?"Sign in first":"Donation unavailable · TEST MODE"),s()}),t.addEventListener("click",n=>{const o=n.target.closest(".home-goal-donate");if(!o)return;const r=Ua(o.dataset.goalId,Number(o.dataset.coins));f(r&&r.ok?`TEST MODE · ${o.dataset.coins} coins donated (no real payment)`:"TEST MODE · donate unavailable"),s()})}}const Wf="b1f547a871a9a2dc042e57a129503bfb4842e709",Yf=Object.freeze([{title:"Support: Find Answers Faster",detail:"Search help guides with live match counts, clear your search by button or Escape, and browse consistent guide links. Tickets remain saved only on this device; AI agents are not connected.",route:"#/support",pr:276,kind:"SUPPORT · HELP CENTER"},{title:"Support: Accurate Saved-Draft Feedback",detail:"Saving an identical local ticket draft now says it was already saved rather than implying a new support request was submitted. No ticket is sent to staff.",route:"#/support",pr:274,kind:"SUPPORT · LOCAL DRAFTS"},{title:"Support: No Duplicate Drafts",detail:"Repeated saves of the same support issue no longer create duplicate browser-local drafts. Distinct issues can still be saved separately.",route:"#/support",pr:272,kind:"SUPPORT · LOCAL DRAFTS"},{title:"Communities: Accessible Reply Threads",detail:"After posting a local reply, the conversation stays expanded and keyboard focus returns to the correct thread control. Public community hosting is not connected.",route:"#/communities",pr:271,kind:"COMMUNITIES · ACCESSIBILITY"},{title:"Profile: Reliable Member Links",detail:"Follower, following and public-profile links now safely handle usernames and profile IDs containing reserved characters. Account data remains browser-local.",route:"#/profile",pr:270,kind:"PROFILE · NAVIGATION"}]);function Jf(){const e=Wf.slice(0,8),t=Yf.map((s,a)=>`
    <article class="pikk-update-card">
      <span class="pikk-update-number" aria-hidden="true">${String(a+1).padStart(2,"0")}</span>
      <div class="pikk-update-card-copy">
        <span class="pikk-update-kind">${l(s.kind)}</span>${a===0?'<span class="pikk-update-latest">Latest release</span>':""}
        <h3>${l(s.title)}</h3>
        <p>${l(s.detail)}</p>
        <div class="pikk-update-links">
          <a class="btn primary" href="${l(s.route)}" aria-label="${l(`See ${s.title} in PIKK`)}">See in PIKK</a>
          <a class="pikk-update-source" href="https://github.com/scrubdup/pikk-app/pull/${s.pr}" target="_blank" rel="noopener noreferrer">Code update #${s.pr}</a>
        </div>
      </div>
    </article>`).join("");return P("PIKK Updates",`
    <section class="pikk-updates-hero" aria-label="PIKK app release information">
      <div>
        <p class="kicker">PIKK · WHAT'S NEW</p>
        <h2>See what changed. <span>Know what loaded.</span></h2>
        <p>Five recent, verified app improvements are below, newest first. Open each updated section to see what shipped. Local demos are not live backend services.</p>
        <div class="pikk-updates-build">
          <span>Version loaded on this device</span>
          <strong id="pikkLoadedBuild" data-build="${l(e)}">${l(e)}</strong>
        </div>
        <div class="pikk-updates-actions">
          <button class="btn primary" type="button" id="pikkUpdatesRefresh">Check for latest version</button>
          <a class="btn ghost" href="#/home">Return home</a>
        </div>
      </div>
      <div class="pikk-updates-hero-mark"><img src="${l(lt("brand/pikk-logo-official.png"))}" alt="PIKK official chrome logo" loading="eager"></div>
    </section>
    <section class="pikk-updates-list" aria-label="Recent published updates">
      <h2>Latest verified improvements</h2>
      ${t}
    </section>
    <p class="pikk-updates-note">A refresh reloads this browser's app bundle; it does not clear your account or local demo data. If a change still does not appear, compare the version above with the published source commit.</p>
  `,{lead:"A clear record of recent PIKK improvements."})}function Qf(e){var t;(t=e.querySelector("#pikkUpdatesRefresh"))==null||t.addEventListener("click",()=>{window.location.assign(dl(window.location.href))})}const Xf=20*60,Zf=250*1024*1024;function eg({duration:e,size:t,type:s}){return s!=null&&s.startsWith("video/")?!Number.isFinite(t)||t<=0||t>Zf?"Video must be under 250 MB for this device-local preview.":!Number.isFinite(e)||e<=0?"Unable to read video duration. Try another file.":e>Xf?"PIKKUP Phase 1 videos must be 20 minutes or shorter.":"":"Select a supported video file."}function tg(e){return new Promise((t,s)=>{const a=URL.createObjectURL(e),i=document.createElement("video");let n=!1;const o=setTimeout(()=>r(new Error("Video metadata timed out")),12e3);function r(d,c){n||(n=!0,clearTimeout(o),i.removeAttribute("src"),i.load(),URL.revokeObjectURL(a),d?s(d):t(c))}i.preload="metadata",i.onloadedmetadata=()=>r(null,i.duration),i.onerror=()=>r(new Error("Cannot read this video file")),i.src=a})}const nd=[{id:"song",label:"Song",acceptCover:"image/*",acceptMedia:"audio/*,.mp3,.m4a,.wav,.aac"},{id:"album",label:"Album",acceptCover:"image/*",acceptMedia:"audio/*,.mp3,.m4a,.wav,.aac"},{id:"video",label:"Video",acceptCover:"image/*",acceptMedia:"video/*,.mp4,.mov,.webm"},{id:"picture",label:"Picture",acceptCover:"image/*",acceptMedia:"image/*"}];function sg(e){return P("Admin",`<div class="card admin-gate">
      <h3>Staff only</h3>
      <p class="muted">The admin dashboard is for PIKK staff. Access comes from your server-verified account role; it cannot be turned on from the browser.</p>
      <p>Signed in as: <strong>${l((e==null?void 0:e.username)||"guest")}</strong>
        ${e?"":'· <a class="btn" href="#/profile">Sign in</a>'}</p>
    </div>
    <div class="card muted">Full team roles, revenue, and moderation ship later phases.</div>`,{lead:"Gated demo dashboard."})}function ag(){return`
  <section class="card admin-add" id="adminAdd">
    <h3>Add Content</h3>
    <p class="muted admin-add-note">PIKKUP preview: video uploads must be 20 minutes or shorter and at most 250 MB. Device-local only, not public hosting. TEST MODE · no backend. Metadata → <code>localStorage dbs_v1.catalog</code>. Files → IndexedDB <code>dbs_media_v1</code>. Works on iPhone Safari &amp; desktop. Large files stay on this device only.</p>

    <div class="admin-type-tabs" role="tablist" aria-label="Content type">${nd.map((t,s)=>`<button type="button" class="admin-type-tab${s===0?" on":""}" data-type="${l(t.id)}" role="tab">${l(t.label)}</button>`).join("")}</div>

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
  </section>`}function ig(e){if(!e.length)return'<div class="card admin-catalog"><h3>Catalog</h3><p class="muted">No admin-added items yet.</p></div>';const t=e.map(s=>{const a=s.coverRef&&!s.coverRef.startsWith("idb:")?l(s.coverRef):"";return`<div class="admin-catalog-row" data-id="${l(s.id)}">
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
    <div class="admin-catalog-list">${t}</div></div>`}function Fe(e){return"$"+(Number(e)||0).toFixed(2)}function ng(e){var i,n,o;const t=((i=e.openMic)==null?void 0:i.pending)||[],s=((n=e.openMic)==null?void 0:n.byStatus)||{},a=t.length?t.map(r=>`<div class="row wrap admin-om-row" data-om-id="${l(r.id)}">
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
  </section>`}function rg(e){const t=e.fanClubs||{total:0,recent:[]},s=t.recent.length?`<ul class="list-plain">${t.recent.map(a=>`<li><span><strong>${l(a.name)}</strong> · ${l(a.privacy)}${a.official?" · official":""}</span><span class="muted">${a.memberCount} members</span></li>`).join("")}</ul>`:'<p class="muted">No clubs yet.</p>';return`<section class="card admin-fanclubs" id="adminFanClubs">
    <h3>Fan Clubs glance</h3>
    <div class="stats">
      <div><strong>${t.total}</strong><span>Clubs</span></div>
    </div>
    ${s}
    <p class="admin-panel-links"><a class="btn" href="#/fanclubs">Open Fan Clubs</a></p>
  </section>`}function og(e){const t=e.loyalty||{},s=(t.badges||[]).slice(0,6).map(a=>`<span class="chip">${l(a)}</span>`).join(" ")||'<span class="muted">None unlocked</span>';return`<section class="card admin-loyalty" id="adminLoyalty">
    <h3>Loyalty glance</h3>
    <p class="muted">${l(t.note||"Device-local loyalty")}</p>
    <div class="stats">
      <div><strong>${t.points||0}</strong><span>Points</span></div>
      <div><strong>${t.badgeCount||0}</strong><span>Badges</span></div>
      <div><strong>${t.historyCount||0}</strong><span>Actions</span></div>
    </div>
    <p class="admin-badge-row">${s}</p>
    <p class="admin-panel-links"><a class="btn" href="#/loyalty">Open Loyalty Club</a></p>
  </section>`}function lg(){return`<section class="card admin-quicklinks" id="adminQuickLinks">
    <h3>Quick links</h3>
    <p class="muted">Deep-links only · page ownership stays with Live Social / Commerce / Build.</p>
    ${[{owner:"Live Social",links:[["#/live","Live"],["#/messages","Messages"],["#/giftbattles","Gift battles"],["#/multiguest","Multi-guest"],["#/spotlight","Spotlight"],["#/restream","Restream"],["#/connect","Connect"]]},{owner:"Commerce",links:[["#/marketplace","Marketplace"],["#/wallet","Wallet"],["#/earnings","Earnings"],["#/missions","Missions"],["#/share","Share & Earn"],["#/refer","Refer & Earn"]]},{owner:"Build",links:[["#/explore","Explore"],["#/notifications","Notifications"],["#/fanclubs","Fan Clubs"],["#/loyalty","Loyalty"],["#/openmic","Open Mic"]]}].map(s=>{const a=s.links.map(([i,n])=>`<a class="btn ghost admin-qlink" href="${i}">${l(n)}</a>`).join("");return`<div class="admin-ql-group"><span class="chip">${l(s.owner)}</span><div class="admin-ql-row">${a}</div></div>`}).join("")}
  </section>`}function cg(e){const t=e.revenue||{},s=(t.byCategory||[]).map(a=>`<li><span>${l(a.label||a.category)} ×${a.count}</span><span class="muted">gross ${Fe(a.gross)} · creator ${Fe(a.creatorShare)} · PIKK ${Fe(a.dbsShare)}</span></li>`).join("");return`<section class="card admin-revenue" id="adminRevenue">
    <h3>Revenue / analytics shell</h3>
    <div class="row wrap" style="gap:8px;margin-bottom:8px">
      <span class="chip">TEST MODE</span>
      <span class="chip">${l(t.chip||"demo figures · not production")}</span>
    </div>
    <div class="stats">
      <div><strong>${Fe(t.gross)}</strong><span>Gross</span></div>
      <div><strong>${Fe(t.fees)}</strong><span>Fees</span></div>
      <div><strong>${Fe(t.creatorShare)}</strong><span>Creator net</span></div>
      <div><strong>${Fe(t.dbsShare)}</strong><span>PIKK net</span></div>
    </div>
    <p class="muted">Creator available ${Fe(t.creatorAvailable)} · holds ${Fe(t.creatorHolds)} · fan wallet ${Fe(t.fanWalletBalance)} · catalog ${t.catalogPublished||0}/${t.catalogTotal||0} published · earning lines ${t.earnCount||0}</p>
    ${s?`<ul class="list-plain">${s}</ul>`:'<p class="muted">No creator earnings in store yet — open Wallet / Earnings (Commerce) to seed demos.</p>'}
    <p class="admin-panel-links">
      <a class="btn" href="#/wallet">Wallet</a>
      <a class="btn" href="#/earnings">Earnings</a>
    </p>
  </section>`}function dg(e){ya(),We();const t=Yr({openOnly:!0}),s=Yr({openOnly:!1}).length,a=e.hotFeed||{},i=t.length?t.slice(0,12).map(n=>{const o=n.kind==="live"?'<span class="chip">live</span>':'<span class="chip">post</span>',r=n.kind==="live"?` · viewers ${n.viewers??"—"} · gifts ${n.gifts??"—"}`:` · score ${n.score??0}`,d=n.kind==="post"?`<button type="button" class="btn primary admin-ea-like" data-ref="${l(n.refId)}" data-alert="${l(n.id)}">Like</button>
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
  </section>`}function pg(e){const t=e.moderation||{};return`<section class="card admin-moderation" id="adminModeration">
    <h3>Moderation stub</h3>
    <p class="muted">${l(t.note||"Stub")}</p>
    <div class="stats">
      <div><strong>${(t.warnings||[]).length}</strong><span>Warnings</span></div>
      <div><strong>${(t.suspensions||[]).length}</strong><span>Suspensions</span></div>
    </div>
    <p class="muted">Empty-state · no enforcement actions stored yet.</p>
    <p class="admin-panel-links"><a class="btn" href="#/guidelines">Community Guidelines</a></p>
  </section>`}function ug(){Ke();const{posts:e,clipperApps:t,user:s}=I();if(!le())return sg(s);As(),Qe(),ya();const a=fl(),i=Qm(),n=a.clipperByStatus,o=Ht({includeUnpublishedForAdmin:!0});return P("Admin",`<div class="card admin-header">
      <div class="row wrap">
        <span class="chip">TEST MODE</span>
        <span class="chip">role=admin</span>
        <span class="spacer muted">Signed in as <strong>${l(s.username)}</strong></span>
        <button class="btn ghost" id="adminRevoke">Revoke admin</button>
      </div>
      <p class="muted admin-gate-hint">Gate: server-verified staff role (dev demo builds may use the local toggle). Phase 2 panels deep-link to owner pages.</p>
    </div>

    ${lg()}
    ${dg(i)}
    ${ng(i)}
    ${rg(i)}
    ${og(i)}
    ${cg(i)}
    ${pg(i)}

    ${ag()}
    ${ig(o)}

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
      <p class="muted">Clippers — pending ${n.pending} · approved ${n.approved} · waitlisted ${n.waitlisted} · rejected ${n.rejected}</p>
    </div>

    <div class="card admin-posts"><h3>Posts (${e.length})</h3>
      <ul class="list-plain">${e.slice(0,20).map(r=>`<li><span>${l(r.username)}: ${l((r.text||"").slice(0,48))}</span><span class="muted">${new Date(r.at).toLocaleDateString()}</span></li>`).join("")||'<li class="muted">None</li>'}</ul>
      <a class="btn" href="#/posts">Open Posts</a>
    </div>

    <div class="card admin-clippers"><h3>Clipper applications (${t.length})</h3>
      ${t.length?t.map(r=>`<div class="row wrap admin-clip-row">
                     <span class="spacer">${l(r.name)} · ${l(r.email)} <span class="chip">${l(r.status)}</span></span>
                     <button class="btn primary admin-clip" data-id="${l(r.id)}" data-status="approved">Approve</button>
                     <button class="btn ghost admin-clip" data-id="${l(r.id)}" data-status="waitlisted">Waitlist</button>
                     <button class="btn ghost admin-clip" data-id="${l(r.id)}" data-status="rejected">Reject</button>
                   </div>`).join(""):'<p class="muted">None yet — submit via <a href="#/clippers">Clippers</a>.</p>'}</div>`,{lead:"Phase 2 controls · Add Content · Clippers · catalog."})}async function uo(e){if(!e)return"";const t=kf("media");return await bf(t,e,{name:e.name,mime:e.type}),"idb:"+t}function mo(e){if(!e)return"";try{const t=new URL(e);let s=t.searchParams.get("v");return!s&&t.hostname.includes("youtu.be")&&(s=t.pathname.slice(1)),!s&&t.pathname.startsWith("/embed/")&&(s=t.pathname.split("/")[2]),s?`https://www.youtube.com/embed/${s}`:""}catch{return""}}function mg(e){var i,n;(i=e.querySelector("#adminRevoke"))==null||i.addEventListener("click",()=>{gi(!1),f("Admin revoked"),K("#/admin")}),e.querySelectorAll(".admin-clip").forEach(o=>{o.addEventListener("click",()=>{hl(o.dataset.id,o.dataset.status),f("Clipper "+o.dataset.status),K("#/admin")})}),e.querySelectorAll(".admin-om").forEach(o=>{o.addEventListener("click",()=>{const r=hn(o.dataset.id,o.dataset.status,o.dataset.status==="rejected"?"Admin reject":"");if(r!=null&&r.error){f(r.error==="admin"?"Admin required":"Open Mic update failed");return}f(o.dataset.status==="approved"?"Open Mic approved":"Open Mic rejected"),K("#/admin")})}),e.querySelectorAll(".admin-ea-like").forEach(o=>{o.addEventListener("click",()=>{const r=uh(o.dataset.ref);if(r!=null&&r.error)return f(r.error==="admin"?"Admin required":"Like failed");o.dataset.alert&&Ea(o.dataset.alert,"liked"),f("Liked · TEST MODE"),K("#/admin")})}),e.querySelectorAll(".admin-ea-comment").forEach(o=>{o.addEventListener("click",()=>{const r=mh(o.dataset.ref,"🔥 PIKK team — keep it up! (TEST MODE)");if(r!=null&&r.error)return f(r.error==="admin"?"Admin required":"Comment failed");o.dataset.alert&&Ea(o.dataset.alert,"commented"),f("Comment posted · TEST MODE"),K("#/admin")})}),e.querySelectorAll(".admin-ea-share").forEach(o=>{o.addEventListener("click",async()=>{var c;const r=hh(o.dataset.ref);if(r!=null&&r.error)return f(r.error==="admin"?"Admin required":"Share failed");const d=`${location.origin}${location.pathname}#/posts?focus=${encodeURIComponent(o.dataset.ref)}`;try{(c=navigator.clipboard)!=null&&c.writeText&&await navigator.clipboard.writeText(d),f("Link copied · share +1 (TEST MODE)")}catch{f("Share +1 (TEST MODE)")}o.dataset.alert&&Ea(o.dataset.alert,"shared"),K("#/admin")})}),e.querySelectorAll(".admin-ea-handle").forEach(o=>{o.addEventListener("click",()=>{const r=Ea(o.dataset.alert,"handled");if(r!=null&&r.error)return f("Could not mark handled");f("Alert handled"),K("#/admin")})}),e.querySelectorAll("img[data-idb-src]").forEach(async o=>{const r=o.getAttribute("data-idb-src");if(!r)return;const d=await _i(r);d&&(o.src=d,o.classList.remove("idb-pending"))});const t=e.querySelector("#adminType"),s=e.querySelector("#adminMediaFile"),a=e.querySelector("#adminCoverFile");e.querySelectorAll(".admin-type-tab").forEach(o=>{o.addEventListener("click",()=>{e.querySelectorAll(".admin-type-tab").forEach(m=>m.classList.remove("on")),o.classList.add("on");const r=o.dataset.type;t&&(t.value=r);const d=nd.find(m=>m.id===r);d&&s&&(s.accept=d.acceptMedia),d&&a&&(a.accept=d.acceptCover);const c=e.querySelector("#adminMediaLabel");c&&(c.textContent=r==="picture"?"Picture file (or use cover only)":r==="video"?"Video file (optional if YouTube link set)":"Audio / media file (optional)");const p=e.querySelector("#adminStreamingFields");p&&(p.style.display=r==="song"||r==="album"?"":"none")})}),e.querySelectorAll(".admin-dropzone").forEach(o=>{const r=o.querySelector(".admin-file-input"),d=o.querySelector(".admin-file-name");o.addEventListener("click",c=>{c.target!==r&&(r==null||r.click())}),o.addEventListener("keydown",c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),r==null||r.click())}),r==null||r.addEventListener("change",()=>{var p;const c=(p=r.files)==null?void 0:p[0];d&&(d.textContent=c?`${c.name} · ${(c.size/1024/1024).toFixed(2)} MB`:"")}),o.addEventListener("dragover",c=>{c.preventDefault(),o.classList.add("drag")}),o.addEventListener("dragleave",()=>o.classList.remove("drag")),o.addEventListener("drop",c=>{var h,g;c.preventDefault(),o.classList.remove("drag");const p=(g=(h=c.dataTransfer)==null?void 0:h.files)==null?void 0:g[0];if(!p||!r)return;const m=new DataTransfer;m.items.add(p),r.files=m.files,r.dispatchEvent(new Event("change"))})}),(n=e.querySelector("#adminAddForm"))==null||n.addEventListener("submit",async o=>{var x,w,A,M,q,$,U,L,B,W,D,O,N,te,ke,H,se,we,z,Me,Xe,Dt,_t,ht,is,Ot;o.preventDefault();const r=e.querySelector("#adminAddStatus"),d=e.querySelector("#adminSave"),c=(w=(x=e.querySelector("#adminTitle"))==null?void 0:x.value)==null?void 0:w.trim(),p=((M=(A=e.querySelector("#adminArtist"))==null?void 0:A.value)==null?void 0:M.trim())||"DatBoiSkeet",m=((q=e.querySelector("#adminType"))==null?void 0:q.value)||"song",h=((U=($=e.querySelector("#adminCoverUrl"))==null?void 0:$.value)==null?void 0:U.trim())||"",g=((B=(L=e.querySelector("#adminMediaUrl"))==null?void 0:L.value)==null?void 0:B.trim())||"",v=((D=(W=e.querySelector("#adminYoutube"))==null?void 0:W.value)==null?void 0:D.trim())||"",b={spotify:((N=(O=e.querySelector("#adminSpotify"))==null?void 0:O.value)==null?void 0:N.trim())||"",apple:((ke=(te=e.querySelector("#adminApple"))==null?void 0:te.value)==null?void 0:ke.trim())||"",youtubeMusic:((se=(H=e.querySelector("#adminYtm"))==null?void 0:H.value)==null?void 0:se.trim())||"",tidal:((z=(we=e.querySelector("#adminTidal"))==null?void 0:we.value)==null?void 0:z.trim())||"",amazon:((Xe=(Me=e.querySelector("#adminAmazon"))==null?void 0:Me.value)==null?void 0:Xe.trim())||"",youtube:v||""},y=!!((Dt=e.querySelector("#adminPublished"))!=null&&Dt.checked),k=(ht=(_t=e.querySelector("#adminCoverFile"))==null?void 0:_t.files)==null?void 0:ht[0],S=(Ot=(is=e.querySelector("#adminMediaFile"))==null?void 0:is.files)==null?void 0:Ot[0];if(!c){f("Title required");return}if(m==="video"&&S)try{const Q=await tg(S),Ae=eg({duration:Q,size:S.size,type:S.type});if(Ae){f(Ae),r&&(r.textContent=Ae);return}}catch{const Q="Could not verify video duration. Upload canceled.";f(Q),r&&(r.textContent=Q);return}d&&(d.disabled=!0),r&&(r.textContent="Saving… (large files may take a moment on iPhone)");try{let Q=h,Ae=g;k&&(Q=await uo(k)),S&&(Ae=await uo(S)),m==="picture"&&!Q&&Ae&&(Q=Ae);const Le=Mp({type:m,title:c,artist:p,coverRef:Q,mediaRef:Ae,youtube:v,streamingLinks:m==="song"||m==="album"?b:{},published:y,embed:mo(v)});if(Le!=null&&Le.error){f(Le.error==="forbidden"?"Admin required":"Could not save"),r&&(r.textContent=""),d&&(d.disabled=!1);return}v&&Le.id&&vl(Le.id,{embed:mo(v)}),f(y?"Published to catalog":"Saved as draft"),K("#/admin")}catch(Q){console.error(Q),f("Save failed — file may be too large for this browser"),r&&(r.textContent=String((Q==null?void 0:Q.message)||Q)),d&&(d.disabled=!1)}}),e.querySelectorAll(".admin-cat-pub").forEach(o=>{o.addEventListener("click",()=>{Lp(o.dataset.id,o.dataset.on==="1"),f(o.dataset.on==="1"?"Published":"Unpublished"),K("#/admin")})}),e.querySelectorAll(".admin-cat-del").forEach(o=>{o.addEventListener("click",()=>{confirm("Delete this catalog item?")&&(Dp(o.dataset.id),f("Deleted"),K("#/admin"))})})}const hg=["healthy","degraded","down","stale","unknown","demo"],fg={api:"API",database:"Database",shield:"PIKK Shield",support:"Support",audit:"Audit log",ledger:"Ledger / Revenue",vault:"Vault media",live:"Live",broadcast:"Broadcast",costs:"Costs",backups:"Backups",workers:"Workers (heartbeats)",jobs:"Jobs"};function gg(e={}){const t=String(e.VITE_PIKK_API_BASE||"").trim();return/^https:\/\//.test(t)?t.replace(/\/+$/,""):""}async function vg(e,t=globalThis.fetch){if(!e||typeof t!="function")return{state:"not_connected"};let s;try{s=await t(`${e}/admin/ops/summary`,{credentials:"include",headers:{Accept:"application/json"}})}catch{return{state:"not_connected"}}if(s.status===401)return{state:"unauthenticated"};if(s.status===403)return{state:"forbidden"};if(!s.ok)return{state:"error",status:s.status};try{const a=await s.json();return!a||typeof a.panels!="object"?{state:"error",status:s.status}:{state:"ok",summary:a}}catch{return{state:"error",status:s.status}}}function bg(e,t=Date.now()){return!e||!hg.includes(e.status)?"unknown":e.checkedAt&&e.freshnessLimitSec&&["healthy","degraded"].includes(e.status)&&!((t-Date.parse(e.checkedAt))/1e3<=e.freshnessLimitSec)?"stale":e.status}const yg={VITE_PIKK_API_BASE:""},ho={loading:["Checking…","Contacting the PIKK API."],not_connected:["Not connected","The PIKK API is not connected to this build yet, so there is no live data to show. Nothing on this screen is simulated."],unauthenticated:["Not signed in","Sign in with the PIKK owner account to view Master Mind."],forbidden:["Not authorized","Master Mind is owner-only. The server refused this account."],error:["Unavailable","The PIKK API returned an error. No data is shown rather than guessing."]};function rd(e){const[t,s]=ho[e]||ho.error;return`<article class="card mastermind-state" data-mastermind-state="${l(e)}"><strong>${l(t)}</strong><p class="muted">${l(s)}</p></article>`}function kg(e){if(!e||typeof e!="object")return"";const t=Array.isArray(e.workers)?e.workers.map(a=>`<li><span class="muted">${l(a.worker)}</span> <strong>${l(a.status)}</strong> <span class="muted">${l(a.lastBeatAt?`last beat ${a.ageSec}s ago`:"no heartbeat recorded")}</span></li>`).join(""):"",s=Array.isArray(e.recentFailures)?e.recentFailures.map(a=>`<li><span class="muted">${l(a.kind)}</span> <strong>${l(a.state)}</strong> <span class="muted">attempts ${l(a.attempts)} · ${l(a.error_code||"")} · ${l(a.at)}</span></li>`).join(""):"";return t+s+Object.entries(e).filter(([a])=>a!=="recent"&&a!=="workers"&&a!=="recentFailures").map(([a,i])=>`<li><span class="muted">${l(a)}</span> <strong>${l(typeof i=="object"?JSON.stringify(i):i)}</strong></li>`).join("")}function wg(e,t=Date.now()){return Object.entries(e.panels).map(([s,a])=>{const i=bg(a,t);return`<article class="card mastermind-panel" data-panel="${l(s)}">
      <div class="row wrap"><strong>${l(fg[s]||s)}</strong><span class="chip mastermind-status-${l(i)}">${l(i)}</span></div>
      <p class="muted">Source: ${l((a==null?void 0:a.source)||"none")} · Checked: ${l(a!=null&&a.checkedAt?new Date(a.checkedAt).toLocaleString():"never")}</p>
      <ul class="mastermind-detail">${kg(a==null?void 0:a.detail)}</ul>
    </article>`}).join("")}function Sg(){return P("PIKK Master Mind",`
    <div class="mastermind">
      <header class="row wrap mastermind-head"><img src="${l(lt("brand/pikk-logo-official.png"))}" alt="PIKK" width="40" height="40" loading="eager"/>
        <p class="muted">Owner-only, read-only operations view. Every status comes from the server; unknown means unknown.</p></header>
      <div id="mastermindBody">${rd("loading")}</div>
    </div>`,{badge:"READ-ONLY"})}async function $g(e=document){const t=e.querySelector("#mastermindBody");if(!t)return;const s=await vg(gg(yg||{}));t.innerHTML=s.state==="ok"?wg(s.summary):rd(s.state)}const Eg="".trim().replace(/\/$/,"");function od(){return((typeof window<"u"&&typeof window.__PIKK_API_BASE__=="string"?window.__PIKK_API_BASE__.trim():"")||Eg).replace(/\/$/,"")}function pr(){return!!od()}async function tt(e,{method:t="GET",body:s}={}){var o,r,d;const a=od();if(!a){const c=new Error("PIKK API is not configured");throw c.code="api_not_configured",c}const i=await fetch(a+e,{method:t,credentials:"include",headers:s===void 0?void 0:{"Content-Type":"application/json"},body:s===void 0?void 0:JSON.stringify(s)});let n=null;try{n=await i.json()}catch{}if(!i.ok){const c=new Error(((o=n==null?void 0:n.error)==null?void 0:o.message)||`Request failed (${i.status})`);throw c.status=i.status,c.code=((r=n==null?void 0:n.error)==null?void 0:r.code)||"request_failed",c.details=((d=n==null?void 0:n.error)==null?void 0:d.details)||null,c}return n}const Ve={discover:()=>tt("/posts"),following:()=>tt("/feed"),createText:e=>tt("/posts",{method:"POST",body:{kind:"text",body:e}}),user:e=>tt("/users/"+encodeURIComponent(String(e||"").replace(/^@/,""))),follow:e=>tt("/follows",{method:"POST",body:{handle:e}}),like:e=>tt("/posts/"+encodeURIComponent(e)+"/like",{method:"POST",body:{}}),unlike:e=>tt("/posts/"+encodeURIComponent(e)+"/like",{method:"DELETE",body:{}}),comments:e=>tt("/posts/"+encodeURIComponent(e)+"/comments"),comment:(e,t)=>tt("/posts/"+encodeURIComponent(e)+"/comments",{method:"POST",body:{body:t}})};function ls(){K("#/posts")}function xg(){ya();const e=hc(8);return e.length?`<section class="card hot-strip" id="hotStrip">
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
    </section>`}function fo(e=[]){return e.length?e.map(t=>`<div class="comment"><strong>@${l(t.author||"user")}</strong> ${l(t.body)}<br/><small class="muted">${new Date(t.created_at).toLocaleString()}</small></div>`).join(""):'<p class="muted">No comments yet.</p>'}function Ag(e=[],{focusId:t="",currentHandle:s=""}={}){return e.length?e.map(a=>{const i=a.author||"creator",n=t&&t===a.id?" post-focus":"",o=s&&s.toLowerCase()!==String(i).toLowerCase();return`<article class="post persistent-post${n}" data-id="${l(a.id)}" id="post-${l(a.id)}">
      <div class="meta">
        <div class="avatar">${l((a.display_name||i)[0].toUpperCase())}</div>
        <div class="spacer">
          <div class="who"><a href="#/user?h=${encodeURIComponent(i)}" data-user-link="${l(i)}">@${l(i)}</a> <span class="chip">Persistent</span> <span class="chip">${l(a.kind||"text")}</span></div>
          <div class="when">${new Date(a.created_at).toLocaleString()}</div>
        </div>
        ${o?`<button class="btn ghost persistent-follow" data-handle="${l(i)}">Follow</button>`:""}
      </div>
      <p class="body-text">${l(a.body)}</p>
      <div class="post-actions">
        <button class="btn ghost persistent-like" type="button" data-id="${l(a.id)}" data-liked="${Number(a.liked_by_me)?"1":"0"}">${Number(a.liked_by_me)?"♥":"♡"} ${Number(a.like_count)||0}</button>
        <button class="btn ghost persistent-comments-toggle" type="button" data-id="${l(a.id)}">💬 ${Number(a.comment_count)||0}</button>
      </div>
      <div class="comments persistent-comments" data-comments-for="${l(a.id)}" hidden>
        <div class="persistent-comments-list"><p class="muted">Loading comments…</p></div>
        <form class="persistent-comment-form" data-id="${l(a.id)}">
          <div class="row"><input class="persistent-comment-input" name="body" maxlength="2000" required placeholder="Add a comment…" /><button class="btn primary" type="submit">Comment</button></div>
        </form>
      </div>
      <p class="muted" style="font-size:11px;margin:8px 0 0">Saved to PIKK backend.</p>
    </article>`}).join(""):'<div class="card muted">No persistent posts yet.</div>'}function Tg(e){var x,w,A,M,q;const t=pr(),{posts:s,likes:a,comments:i,user:n,postShares:o}=I(),r=((x=e==null?void 0:e.query)==null?void 0:x.tab)==="following"?"following":"discover",d=((w=e==null?void 0:e.query)==null?void 0:w.focus)||"",c=new Set((n==null?void 0:n.following)||[]),p=r==="following"&&n?s.filter($=>c.has($.userId)||$.userId===n.id):s,m=vp.map($=>`<button type="button" class="chip preset-img" data-src="${l($.src)}" title="${l($.label)}">${l($.label)}</button>`).join(""),h=((A=e==null?void 0:e.query)==null?void 0:A.compose)==="1"||((M=e==null?void 0:e.query)==null?void 0:M.type),g=["text","picture","short","video"].includes((q=e==null?void 0:e.query)==null?void 0:q.type)?e.query.type:"",v=n?`
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
      <div class="post-compose-body${g||h?"":" is-collapsed"}" id="postComposeBody" ${g?"":"hidden"}>
        <input type="hidden" id="postType" value="${l(g||"picture")}" />
        <p class="chip" id="postTypeChip">${l((g||"picture").charAt(0).toUpperCase()+(g||"picture").slice(1))} post</p>
        <div class="field"><label>Caption</label>
          <textarea id="postText" placeholder="Say something…" maxlength="2000"></textarea></div>
        <div class="field" id="postMediaField">
          <label id="postMediaLabel">Media link (demo)</label>
          <input id="postImg" placeholder="/music/… · YouTube URL · /merch/…" />
        </div>
        <div class="row wrap" id="postPresets" style="margin-bottom:10px">${m}</div>
        <p class="muted" id="postMediaNote" style="font-size:12px;margin:0 0 10px">${t?"Persistent text posting is live. Picture/Short/Video uploads are not connected yet.":"TEST MODE · no real upload — paste a path or YouTube link."}</p>
        <button class="btn primary" id="postSubmit">${t?"Post to PIKK":"Post"}</button>
      </div>
    </div>`:`<div class="card"><p class="muted">Sign in from Profile to post text, a picture, short, or video.</p>
       <a class="btn primary" href="#/profile">Sign in</a></div>`,b=`
    <div class="row wrap" style="margin-bottom:12px;gap:8px">
      <a class="chip pikk-chip${r==="discover"?" on":""}"${r==="discover"?' aria-current="page"':""} href="#/posts">Discover</a>
      <a class="chip pikk-chip${r==="following"?" on":""}"${r==="following"?' aria-current="page"':""} href="#/posts?tab=following">Following</a>
      <a class="btn ghost" href="#/profile/dbs">@DatBoiSkeet</a>
    </div>`,y=p.map($=>{const U=a[$.id]||[],L=n&&U.includes(n.id),B=i[$.id]||[],W=o&&o[$.id]||0,D=Pi($.id),O=n&&c.has($.userId),N=d&&d===$.id?" post-focus":"",te=n&&$.userId!==n.id?`<button class="btn ghost follow-btn" data-uid="${l($.userId)}" data-on="${O?"1":"0"}">${O?"Following":"Follow"}</button>`:"",ke=$.userId==="dbs"?'<span class="chip">house</span>':'<span class="chip">community</span>',H=$.mediaType||($.image?"picture":"text"),se=H==="short"?'<span class="chip">Short</span>':H==="video"?'<span class="chip">Video</span>':H==="picture"||H==="image"?'<span class="chip">Picture</span>':H==="text"?'<span class="chip">Text</span>':"",we=(()=>{const z=($.mediaUrl||$.image||"").trim();if(!z)return"";if(H==="short"||H==="video"){const Me=/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{6,})/i.exec(z);if(Me)return`<div class="media media-video"><iframe src="https://www.youtube.com/embed/${Me[1]}?rel=0" title="post video" allowfullscreen loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>`;if(z.startsWith("http")||z.endsWith(".mp4")||z.endsWith(".webm"))return`<video class="media" src="${l(z)}" controls playsinline preload="metadata"></video>`}return`<img class="media" src="${l(z)}" alt="" loading="lazy" />`})();return`
      <article class="post${N}" data-id="${l($.id)}" id="post-${l($.id)}">
        <div class="meta">
          <a class="avatar" href="#/profile/${l($.userId)}">${l(($.username||"?")[0].toUpperCase())}</a>
          <div class="spacer">
            <div class="who"><a href="#/profile/${l($.userId)}">${l($.username)}</a> ${ke}${se}</div>
            <div class="when">${j($.at)}${D>=5?` · <span class="hot-inline">🔥 ${D}</span>`:""}</div>
          </div>
          ${te}
        </div>
        <p class="body-text">${l($.text)}</p>
        ${we}
        <div class="post-actions">
          <button class="btn like-btn ${L?"primary":""}" data-id="${l($.id)}">
            ♥ ${U.length}
          </button>
          <button class="btn ghost comment-toggle" data-id="${l($.id)}">💬 ${B.length}</button>
          <button class="btn ghost share-btn" data-id="${l($.id)}" title="Share (demo count)">↗ ${W}</button>
        </div>
        <div class="comments" id="c-${l($.id)}" hidden>
          ${B.map(z=>`<div class="comment"><b>${l(z.username)}</b> ${l(z.text)}</div>`).join("")||'<div class="muted">No comments yet</div>'}
          ${n?`<div class="row" style="margin-top:8px">
                  <input class="c-input" data-id="${l($.id)}" placeholder="Add a comment…" style="flex:1;background:#0e0e14;border:1px solid var(--line);border-radius:12px;padding:8px 10px" />
                  <button class="btn primary c-send" data-id="${l($.id)}">Send</button>
                </div>`:""}
        </div>
      </article>`}).join(""),S=t?'<section id="pikkPersistentPosts" aria-live="polite"><div class="card muted">Loading persistent posts…</div></section>':y||(r==="following"?'<div class="card muted">No posts from people you follow yet. Discover feed has official drops.</div>':'<div class="card muted">No posts yet.</div>');return P("Posts",(t?"":xg())+v+b+S,{lead:t?"Persistent PIKK text posts · Discover and Following load from the backend. Media uploads are next.":"Post Text, a Picture, Short, or Video · Shorts live here (not separate tabs) · Hot strip ranks engagement."})}function Cg(e){var m;const t=pr(),s=e.querySelector("#pikkPersistentPosts"),a=async()=>{var h;if(!(!t||!s))try{const v=typeof location<"u"&&location.hash.includes("tab=following")?await Ve.following():await Ve.discover();s.innerHTML=Ag(v.posts||[],{focusId:new URLSearchParams((location.hash.split("?")[1]||"").split("#")[0]).get("focus")||"",currentHandle:((h=I().user)==null?void 0:h.handle)||""})}catch(g){s.innerHTML=(g==null?void 0:g.status)===401?'<div class="card muted">Sign in from <a href="#/profile">Profile</a> to load persistent PIKK posts.</div>':`<div class="card muted">Could not load persistent posts: ${l((g==null?void 0:g.message)||"Unknown error")}</div>`}};a();const i=e.querySelector(".post-focus");if(i)try{i.scrollIntoView({behavior:"smooth",block:"center"})}catch{}else typeof location<"u"&&(location.hash.includes("compose=1")||location.hash.includes("type="))&&setTimeout(()=>{var h;return(h=e.querySelector("#composer"))==null?void 0:h.scrollIntoView({behavior:"smooth",block:"start"})},50);const n=e.querySelector("#postComposeBody"),o=e.querySelector("#postType"),r=e.querySelector("#postTypeChip"),d=e.querySelector("#postMediaLabel"),c=e.querySelector("#postPresets");function p(h){const g=h||"picture";e.querySelectorAll(".post-type-btn").forEach(k=>k.classList.toggle("on",k.dataset.type===g)),o&&(o.value=g),r&&(r.textContent=g.charAt(0).toUpperCase()+g.slice(1)+" post");const v=e.querySelector("#postMediaField"),b=e.querySelector("#postMediaNote"),y=g==="text";v&&(v.hidden=y),b&&(b.hidden=y),d&&!y&&(d.textContent=g==="short"?"Short clip link (YouTube / demo path)":g==="video"?"Video link (YouTube / demo path)":"Picture link (demo path)"),c&&(c.hidden=g!=="picture"),n&&(n.hidden=!1,n.classList.remove("is-collapsed"))}e.querySelectorAll(".post-type-btn").forEach(h=>{h.addEventListener("click",()=>p(h.dataset.type))}),o!=null&&o.value&&p(o.value),e.querySelectorAll(".preset-img").forEach(h=>{h.addEventListener("click",()=>{const g=e.querySelector("#postImg");g&&(g.value=h.dataset.src||""),f("Picture selected")})}),(m=e.querySelector("#postSubmit"))==null||m.addEventListener("click",async()=>{var h,g;try{const v=(h=e.querySelector("#postText"))==null?void 0:h.value,b=(o==null?void 0:o.value)||"picture",y=(((g=e.querySelector("#postImg"))==null?void 0:g.value)||"").trim();if(t){if(b!=="text")return f("Persistent Picture/Short/Video uploads are not connected yet");if(!(v!=null&&v.trim()))return f("Write some words for a Text post");await Ve.createText(v.trim()),f("Text post saved to PIKK"),await a(),e.querySelector("#postText")&&(e.querySelector("#postText").value="");return}if(b==="text"){if(!(v!=null&&v.trim()))return f("Write some words for a Text post");Or({text:v.trim(),mediaType:"text"}),f("Text posted"),ls();return}if(!(v!=null&&v.trim())&&!y)return f("Add a caption or media");if((b==="short"||b==="video")&&!y)return f("Add a "+b+" link (TEST MODE)");Or({text:v||(b==="picture"?"Photo":b==="short"?"Short":"Video"),image:b==="picture"?y:"",mediaType:b,mediaUrl:y}),f(b.charAt(0).toUpperCase()+b.slice(1)+" posted"),ls()}catch(v){if((v==null?void 0:v.code)==="email_unverified")return f("Verify your email before posting");f(v.message||"Could not post")}}),e.querySelectorAll(".like-btn").forEach(h=>{h.addEventListener("click",()=>{if(xp(h.dataset.id).error)return f("Sign in to like");ls()})}),e.querySelectorAll(".comment-toggle").forEach(h=>{h.addEventListener("click",()=>{const g=e.querySelector("#c-"+h.dataset.id);g&&(g.hidden=!g.hidden)})}),e.querySelectorAll(".c-send").forEach(h=>{h.addEventListener("click",()=>{var k;const g=h.dataset.id,v=e.querySelector(`.c-input[data-id="${g}"]`),b=(k=v==null?void 0:v.value)==null?void 0:k.trim();if(!b)return;if(Ap(g,b).error)return f("Sign in to comment");f("Comment added"),ls()})}),e.querySelectorAll(".share-btn").forEach(h=>{h.addEventListener("click",async()=>{var y;const g=h.dataset.id;if(fc(g).error)return f("Could not share");const b=`${location.origin}${location.pathname}#/posts?focus=${encodeURIComponent(g)}`;try{(y=navigator.clipboard)!=null&&y.writeText&&await navigator.clipboard.writeText(b),f("Shared · link copied (TEST MODE)")}catch{f("Shared · count +1 (TEST MODE)")}ls()})}),e.addEventListener("click",async h=>{var y,k,S,x,w,A;if(!t)return;const g=(k=(y=h.target).closest)==null?void 0:k.call(y,".persistent-follow");if(g){try{await Ve.follow(g.dataset.handle),f("Following @"+g.dataset.handle),await a()}catch(M){f((M==null?void 0:M.code)==="email_unverified"?"Verify your email before following":(M==null?void 0:M.message)||"Could not follow")}return}const v=(x=(S=h.target).closest)==null?void 0:x.call(S,".persistent-like");if(v){try{await(v.dataset.liked==="1"?Ve.unlike(v.dataset.id):Ve.like(v.dataset.id)),await a()}catch(M){f((M==null?void 0:M.code)==="email_unverified"?"Verify your email before liking posts":(M==null?void 0:M.message)||"Could not update like")}return}const b=(A=(w=h.target).closest)==null?void 0:A.call(w,".persistent-comments-toggle");if(b){const M=s==null?void 0:s.querySelector(`[data-comments-for="${CSS.escape(b.dataset.id)}"]`);if(!M)return;if(M.hidden=!M.hidden,!M.hidden){const q=M.querySelector(".persistent-comments-list");if(q)try{const $=await Ve.comments(b.dataset.id);q.innerHTML=fo($.comments||[])}catch($){q.innerHTML=`<p class="muted">Could not load comments: ${l(($==null?void 0:$.message)||"Unknown error")}</p>`}}}}),s==null||s.addEventListener("submit",async h=>{var y,k,S,x;const g=(k=(y=h.target).closest)==null?void 0:k.call(y,".persistent-comment-form");if(!g||!t)return;h.preventDefault();const v=g.querySelector(".persistent-comment-input"),b=(S=v==null?void 0:v.value)==null?void 0:S.trim();if(b)try{await Ve.comment(g.dataset.id,b),v.value="";const w=await Ve.comments(g.dataset.id),A=(x=g.closest(".persistent-comments"))==null?void 0:x.querySelector(".persistent-comments-list");A&&(A.innerHTML=fo(w.comments||[])),await a(),f("Comment added")}catch(w){f((w==null?void 0:w.code)==="email_unverified"?"Verify your email before commenting":(w==null?void 0:w.message)||"Could not add comment")}}),e.querySelectorAll(".follow-btn").forEach(h=>{h.addEventListener("click",()=>{const g=h.dataset.uid,v=h.dataset.on==="1";if((v?fi(g):hi(g)).error)return f("Sign in to follow");f(v?"Unfollowed":"Following"),ls()})})}const Pg={"Premium Spotlight":"spotlight","Featured Box":"featured","Promo Box":"promo"},Ig=(e,t)=>Pg[t.name]||(Ic[e.id]?e.id:null);function Mg(){const e=Ya.map(t=>`
    <section class="pikk-promote-group" id="promote-${t.id}" data-promote-section="${t.id}" aria-labelledby="promote-${t.id}-h">
      <div class="pikk-promote-head"><h3 id="promote-${t.id}-h">${l(t.title)}</h3>${t.gate?`<span class="chip pikk-promote-gate">${l(t.gate)}</span>`:""}</div>
      <ul class="pikk-promote-items">${t.items.map(s=>{const a=Ig(t,s),i=a?Nh(Ic[a],Rh[a]):null;return`<li data-promote-option${i?` data-slots="${a}" data-sold-out="${i.soldOut}"`:""}><span>${l(s.name)}</span><span class="pikk-promote-tiers">${qh(s).map(n=>`<small data-price>${l(n)}</small>`).join("")}${i?`<small class="pikk-promote-slots${i.soldOut?" is-sold-out":""}" data-slot-label>${l(i.label)} · TEST MODE (no bookings yet)</small>`:""}</span><button type="button" class="btn ghost" data-promote-book="${l(s.name)}"${i&&i.soldOut?' disabled aria-disabled="true"':""} aria-label="Promote ${l(s.name)} (${i&&i.soldOut?"sold out":"coming soon"})">${i&&i.soldOut?"Sold out":"Promote"}</button></li>`}).join("")}</ul>
      <a class="pikk-promote-open" href="${t.link}">Open ${l(t.title)} →</a>
    </section>`).join("");return P("Promote on PIKK",`
    <p class="pikk-promote-intro">Choose what to promote. Prices are introductory previews. <strong>Booking and checkout are Coming soon</strong> until secure payments (Stripe) are live; nothing is charged and no views are guaranteed.</p>
    <nav class="pikk-promote-jump" aria-label="Promote sections">${Ya.map(t=>`<a class="chip" href="#/promote?s=${t.id}">${l(t.title)}</a>`).join("")}</nav>
    ${Xc()}
    <div class="pikk-promote-groups">${e}</div>`,{badge:"TEST MODE · Coming soon"})}function Lg(e=document){e.addEventListener("click",s=>{const a=s.target.closest("[data-promote-book]");if(a){if(s.preventDefault(),a.disabled||a.closest('[data-sold-out="true"]')){f(`${a.dataset.promoteBook} · Sold out for this window`);return}f(`${a.dataset.promoteBook} · Coming soon, no payment taken`)}});const t=new URLSearchParams(location.hash.split("?")[1]||"").get("s");t&&Ya.some(s=>s.id===t)&&setTimeout(()=>{var s;return(s=document.getElementById("promote-"+t))==null?void 0:s.scrollIntoView({block:"start"})},60)}function Dg(){return P("Donate",`<section class="card home-app-goal home-app-goal-full">
    <p class="kicker">PIKK daily app goal · 24h</p>
    <div id="homeAppGoalBody">${ad(Ga())}</div>
    <p class="chip" style="margin-top:10px">TEST MODE · demo coins only · no real payments</p>
  </section>`,{badge:"TEST MODE"})}const _g=e=>id(e),Og=Object.freeze([{id:"donate",title:"Donate",detail:"PIKK daily app goal · TEST MODE demo coins",href:"#/donate"},{id:"donate-live",title:"Creator & host goals",detail:"Live goals on streams · TEST MODE",href:"#/live"},{id:"coins",title:"Buy coins & gifts",detail:"Coin packs and gifts · Coming soon until Stripe",soon:!0},{id:"promote",title:"Promote bookings",detail:"Placements and boosts · booking Coming soon",href:"#/promote"},{id:"shop",title:"Shop orders & checkout",detail:"Merch checkout on the merchant site; in-app orders Coming soon",href:"#/shop"},{id:"subs",title:"Subscriptions & fan clubs",detail:"Creator fan clubs · TEST MODE",href:"#/fanclubs"},{id:"membership",title:"PIKK memberships",detail:"Plans preview · no billing yet",href:"#/pricing"},{id:"tips",title:"Tips",detail:"Tip creators · Coming soon until Stripe",soon:!0},{id:"wallet",title:"Wallet balance",detail:"Demo coin balance · TEST MODE",href:"#/wallet"},{id:"payouts",title:"Payouts & earnings",detail:"Creator earnings preview · payouts Coming soon",href:"#/earnings"},{id:"history",title:"Payment history",detail:"Receipts and refunds · Coming soon until Stripe",soon:!0}]);function qg(){const e=Og.map(t=>t.href?`<a class="pikk-pay-item" href="${t.href}" data-pay="${t.id}"><span class="pikk-pay-ico" aria-hidden="true">$</span><span><strong>${l(t.title)}</strong><small>${l(t.detail)}</small></span><span aria-hidden="true">→</span></a>`:`<div class="pikk-pay-item is-soon" data-pay="${t.id}" data-coming-soon role="button" tabindex="0"><span class="pikk-pay-ico" aria-hidden="true">$</span><span><strong class="pikk-menu-title">${l(t.title)}</strong><small>${l(t.detail)}</small></span><span class="chip">Coming soon</span></div>`).join("");return P("Payments",`<p class="pikk-pay-intro">Everything money on PIKK in one place. <strong>No real payments are processed yet</strong>; secure checkout (Stripe) is Coming soon. Balances are TEST MODE demo coins.</p><div class="pikk-pay-list">${e}</div>`,{badge:"TEST MODE"})}function Rg(){}const me={circle:"pikk.crew.v1",favorites:"pikk.favorites.v1",stories:"pikk.stories.v1"},ld={},cd=()=>{try{return globalThis.localStorage||null}catch{return null}};function Oi(e){const t=cd();try{return JSON.parse((t?t.getItem(e):ld[e])||"[]")}catch{return[]}}function wa(e,t){const s=JSON.stringify(t),a=cd();return a?a.setItem(e,s):ld[e]=s,t}function Xt(e){const t=String(e||"").trim().replace(/^@+/,"").toLowerCase();return/^[a-z0-9_.]{2,30}$/.test(t)?t:""}const St=e=>Oi(e).filter(t=>typeof t=="string");function dd(e,t){const s=Xt(t);if(!s)return!1;const a=St(e);return a.includes(s)||wa(e,[...a,s]),!0}function pd(e,t){const s=Xt(t);wa(e,St(e).filter(a=>a!==s))}const Sa={list:()=>St(me.circle),add:e=>dd(me.circle,e),remove:e=>pd(me.circle,e),has:e=>St(me.circle).includes(Xt(e))},xt={list:()=>St(me.favorites),add:e=>dd(me.favorites,e),remove:e=>pd(me.favorites,e),has:e=>St(me.favorites).includes(Xt(e)),moveUp:e=>{const t=Xt(e),s=St(me.favorites),a=s.indexOf(t);return a>0&&([s[a-1],s[a]]=[s[a],s[a-1]],wa(me.favorites,s)),St(me.favorites)},toggle:e=>xt.has(e)?(xt.remove(e),!1):xt.add(e)},go=Object.freeze({everyone:"Everyone",crew:"PIKK Crew"});function Ng({text:e,audience:t="everyone",author:s="you"}){const a=String(e||"").trim().slice(0,280);if(!a)return null;const i={id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),text:a,audience:t==="crew"?"crew":"everyone",author:Xt(s)||"you",at:Date.now()};return wa(me.stories,[i,...Oi(me.stories)].slice(0,50)),i}const Bg=24*3600*1e3;function Kg(e=Date.now()){return Oi(me.stories).filter(t=>t&&e-t.at<Bg)}function jg(e){wa(me.stories,Oi(me.stories).filter(t=>t.id!==e))}function Fg(e,t=xt.list(),s=a=>a.author){const a=i=>{const n=t.indexOf(Xt(s(i)));return n<0?1/0:n};return[...e].map((i,n)=>[i,n]).sort((i,n)=>a(i[0])-a(n[0])||(n[0].at||0)-(i[0].at||0)||i[1]-n[1]).map(i=>i[0])}const Gg=e=>`${e} ${e===1?"person":"people"}`,ur='<p class="pikk-ic-test">TEST MODE · Saved only on this device until PIKK accounts are live. No one is notified.</p>',Ug=e=>e==="crew"?'<span class="pikk-ic-badge" title="Crew only">◎ Crew</span>':'<span class="pikk-ic-everyone">Everyone</span>',ud='<span class="pikk-fav-star" aria-hidden="true">★</span>',mr=e=>`<nav class="pikk-ic-subnav" aria-label="Stories and people">${[["#/story","New Story"],["#/crew","PIKK Crew"],["#/favorites","Favorites"]].map(([t,s])=>`<a href="${t}"${t===e?' aria-current="page" class="on"':""}>${s}</a>`).join("")}</nav>`;function hr(e){const s=(e==="circle"?Sa:xt).list();return s.length?`<ul class="pikk-ic-people">${s.map(a=>`<li>${e==="fav"?ud:'<span class="pikk-ic-dot" aria-hidden="true"></span>'}<span>@${l(a)}</span>${e==="fav"?`<button type="button" class="btn ghost" data-up="${l(a)}" aria-label="Move @${l(a)} up">↑</button>`:""}<button type="button" class="btn ghost" data-remove="${l(a)}" aria-label="Remove @${l(a)}">Remove</button></li>`).join("")}</ul>`:`<p class="muted pikk-ic-empty">${e==="circle"?"Your Crew is empty. Add people by @handle.":"No favorites yet. Add people by @handle."}</p>`}function md(e){return`<form class="pikk-ic-add" data-add-form="${e}"><label class="sr-only" for="ic-add-${e}">@handle</label><input id="ic-add-${e}" name="h" placeholder="@handle" autocomplete="off" maxlength="31" /><button class="btn primary" type="submit">${e==="circle"?"Add to Crew":"Add favorite"}</button></form>`}function Vg(){return P("PIKK Crew",`${mr("#/crew")}
    <section class="pikk-ic-hero"><span class="pikk-ic-ring-demo" aria-hidden="true"></span><div><h2>PIKK Crew</h2><p>Share stories with a private list you choose. Stories set to Crew show an electric-blue/red ring and only people on this list can view them.</p></div></section>
    <section class="card pikk-ic-panel"><h3>People in your Crew (<span data-count>${Sa.list().length}</span>)</h3>${md("circle")}<div data-people="circle">${hr("circle")}</div>${ur}</section>`,{badge:"TEST MODE"})}function Hg(){return P("Favorites",`${mr("#/favorites")}
    <section class="pikk-ic-hero pikk-fav-hero"><span class="pikk-fav-star big" aria-hidden="true">★</span><div><h2>Favorites</h2><p>Posts and stories from people you favorite rank first in your feeds. Use ↑ to reorder; the first favorite ranks highest. Favorites show a ★ marker.</p></div></section>
    <section class="card pikk-ic-panel"><h3>Your favorites (<span data-count>${xt.list().length}</span>)</h3>${md("fav")}<div data-people="fav">${hr("fav")}</div>${ur}</section>`,{badge:"TEST MODE"})}function kn(){const e=Fg(Kg());return e.length?`<ul class="pikk-story-list">${e.map(t=>`<li class="pikk-story-item${t.audience==="crew"?" is-circle":""}"><span class="pikk-story-ring${t.audience==="crew"?" circle":""}" aria-hidden="true">${l(t.author.slice(0,1).toUpperCase())}</span><div><p>${l(t.text)}</p><small>${xt.has(t.author)?ud+" ":""}@${l(t.author)} · ${Ug(t.audience)}</small></div><button type="button" class="btn ghost" data-del-story="${l(t.id)}" aria-label="Delete story">Delete</button></li>`).join("")}</ul>`:'<p class="muted pikk-ic-empty">No stories in the last 24 hours on this device.</p>'}function zg(){return P("New Story",`${mr("#/story")}
    <form class="card pikk-story-form" data-story-form>
      <label for="story-text"><strong>Your story</strong></label>
      <textarea id="story-text" name="text" maxlength="280" rows="3" placeholder="What's happening?"></textarea>
      <fieldset class="pikk-audience"><legend>Who can see this?</legend>
        <label><input type="radio" name="audience" value="everyone" checked /> <span>${go.everyone}</span></label>
        <label><input type="radio" name="audience" value="crew" /> <span class="pikk-ic-badge">◎ ${go.crew}</span> <small data-circle-count>(${Gg(Sa.list().length)})</small></label>
      </fieldset>
      <p class="muted pikk-aud-hint"><a href="#/crew">Edit Crew list</a></p>
      <button class="btn primary" type="submit">Share story</button>
      ${ur}
    </form>
    <section class="card pikk-ic-panel"><h3>Your recent stories</h3><div data-stories>${kn()}</div></section>`,{badge:"TEST MODE"})}function hd(e,t){var i;const s=t==="circle"?Sa:xt,a=()=>{e.querySelector(`[data-people="${t}"]`).innerHTML=hr(t);const n=e.querySelector("[data-count]");n&&(n.textContent=s.list().length)};(i=e.querySelector(`[data-add-form="${t}"]`))==null||i.addEventListener("submit",n=>{n.preventDefault();const o=n.target.h;s.add(o.value)?(o.value="",a(),f(t==="circle"?"Added to Crew":"Added to Favorites")):f("Enter a valid @handle (2–30 letters, numbers, _ or .)")}),e.addEventListener("click",n=>{const o=n.target.closest("[data-up]");if(o&&s.moveUp){s.moveUp(o.dataset.up),a();return}const r=n.target.closest("[data-remove]");r&&(s.remove(r.dataset.remove),a())})}const Wg=(e=document)=>hd(e,"circle"),Yg=(e=document)=>hd(e,"fav");function Jg(e=document){const t=e.querySelector("[data-story-form]");t&&(t.addEventListener("submit",s=>{var i;s.preventDefault();const a=(i=t.querySelector("input[name=audience]:checked"))==null?void 0:i.value;if(a==="crew"&&!Sa.list().length){f("Add people to your Crew first");return}if(!Ng({text:t.text.value,audience:a})){f("Write something first");return}t.text.value="",e.querySelector("[data-stories]").innerHTML=kn(),f(a==="crew"?"Shared to Crew · TEST MODE":"Shared to Everyone · TEST MODE")}),e.addEventListener("click",s=>{const a=s.target.closest("[data-del-story]");a&&(jg(a.dataset.delStory),e.querySelector("[data-stories]").innerHTML=kn())}))}const Qg="".trim().replace(/\/$/,"");function wn(){return((typeof window<"u"&&typeof window.__PIKK_API_BASE__=="string"?window.__PIKK_API_BASE__.trim():"")||Qg).replace(/\/$/,"")}function Xg(){return!!wn()}async function vo(e){var s,a,i;let t=null;try{t=await e.json()}catch{}if(!e.ok){const n=new Error(((s=t==null?void 0:t.error)==null?void 0:s.message)||`Request failed (${e.status})`);throw n.status=e.status,n.code=((a=t==null?void 0:t.error)==null?void 0:a.code)||"request_failed",n.details=((i=t==null?void 0:t.error)==null?void 0:i.details)||null,n}return t}const bo={list:async()=>{const e=await fetch(wn()+"/media/music",{credentials:"include"});return vo(e)},upload:async({audio:e,title:t,artistName:s,albumTitle:a="",genre:i="",rightsCertified:n=!1,explicitContent:o=!1})=>{const r=wn();if(!r){const p=new Error("PIKK API is not configured");throw p.code="api_not_configured",p}const d=new FormData;d.set("audio",e),d.set("title",t),d.set("artist_name",s),a&&d.set("album_title",a),i&&d.set("genre",i),d.set("rights_certified",n?"true":"false"),d.set("explicit_content",o?"true":"false");const c=await fetch(r+"/media/music",{method:"POST",credentials:"include",body:d});return vo(c)}};function yo(e){K(e)}const Sn={apple:"Apple Music",spotify:"Spotify",youtubeMusic:"YouTube Music",youtube:"YouTube",tidal:"Tidal",amazon:"Amazon Music"};function fd(e){if(!e||typeof e!="object")return{};const t={};for(const s of Object.keys(Sn)){const a=String(e[s]||"").trim();(a.startsWith("http://")||a.startsWith("https://"))&&(t[s]=a)}return t}function Zg(e){const t=fd(e),s=Object.keys(Sn).filter(a=>t[a]);return s.length?s.map(a=>`<a class="btn stream-plat stream-plat-${l(a)}" href="${l(t[a])}" target="_blank" rel="noopener">${l(Sn[a])}</a>`).join(""):'<span class="muted" style="font-size:12px">No platform links yet</span>'}function ev(e){try{const t=new URL(e);return t.protocol!=="https:"||t.hostname!=="music.apple.com"||!/^\/[a-z]{2}(?:-[a-z]{2})?\/(?:song|album)\//i.test(t.pathname)?"":"https://embed.music.apple.com"+t.pathname+t.search}catch{return""}}function Xi(e){var o;const t=e.cover?`<img class="stream-cover" src="${l(e.cover)}" alt="${l(e.title)}" loading="lazy" referrerpolicy="no-referrer" />`:'<div class="stream-cover stream-cover-empty" aria-hidden="true">♪</div>',s=e.albumNote?`<div class="muted" style="font-size:11px">${l(e.albumNote)}</div>`:"",a=e.year?` · ${l(String(e.year))}`:"",i=ev((o=e.links)==null?void 0:o.apple),n=i?`<details class="apple-music-embed"><summary>Play in PIKK · Apple Music</summary><iframe title="Apple Music player for ${l(e.title)}" src="${l(i)}" loading="lazy" allow="autoplay *; encrypted-media *; fullscreen *" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation" style="width:100%;height:175px;border:0;border-radius:12px"></iframe><small class="muted">Apple controls playback availability. Full listening may require Apple Music.</small></details>`:"";return`
    <article class="stream-release">
      ${t}
      <div class="stream-meta">
        <span class="chip">${l(e.type||"release")}</span>
        <strong>${l(e.title)}</strong>
        <div class="muted" style="font-size:12px">${l(e.artist||"DatBoiSkeet")}${a}</div>
        ${s}
        ${n}
        <div class="stream-plats">${Zg(e.links)}</div>
      </div>
    </article>`}function ko(e){return e==="inner"?"Inner Circle":e==="backstage"?"Backstage":e==="skeet+"?"PIKK+":"None"}const tv={skeet:"PIKK+","skeet+":"PIKK+",backstage:"Backstage",inner:"Inner Circle"},wo=e=>tv[e]||e;function sv(e){return fp.map(t=>{const s=t.tier==="backstage"||t.tier==="inner";return e&&dn(s?"backstage":"skeet")?`
      <article class="vault-card unlocked" data-id="${l(t.id)}">
        <img src="${l(t.cover)}" alt="${l(t.title)}" />
        <div class="vault-meta">
          <span class="chip" style="border-color:#2a4a3a;color:#8dffb0">Unlocked</span>
          <strong>${l(t.title)}</strong>
          <div class="muted" style="font-size:12px">${l(t.artist)} · ${l(t.status)}</div>
          <div class="muted" style="font-size:11px">Requires ${l(wo(t.tier))} · no audio yet</div>
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
          <div class="muted" style="font-size:11px">Join ${l(wo(t.tier))} to unlock</div>
        </div>
      </article>`}).join("")}function So(e={}){var x;const t=["songs","albums","beats","playlists","upload"].includes((x=e.query)==null?void 0:x.view)?e.query.view:"",{user:s}=I(),a=Zt(),i=dn("skeet"),n=new Set((s==null?void 0:s.purchasedTracks)||[]),o=us.map(w=>`
    <div class="cover-card" style="flex:0 0 160px">
      <span class="badge-cs">${l(w.status)}</span>
      <img src="${l(w.cover)}" alt="${l(w.title)}" style="width:160px;height:160px" />
      <div class="t">${l(w.title)}</div>
      <div class="muted" style="font-size:11px">${l(w.artist)}</div>
    </div>`).join(""),r=On.map(w=>{const A=w.id==="skeet"?"skeet+":w.id==="inner"?"inner":w.id,M=a===A;return`
    <div class="card" style="margin:0">
      <h3>${l(w.name)}</h3>
      <div class="price" style="font-size:22px;font-weight:900">$${w.price}<span class="muted" style="font-size:13px">/mo</span></div>
      <p class="muted">${l(w.blurb)}</p>
      ${s?M?`<button type="button" class="btn ghost block mem-toggle" data-tier="${l(w.id)}" data-on="1">Active · tap to cancel (demo)</button>`:`<button type="button" class="btn primary block mem-toggle" data-tier="${l(w.id)}" data-on="0">Join · TEST MODE</button>`:'<a class="btn primary block" href="#/profile">Sign in to join</a>'}
    </div>`}).join(""),d=Lr.filter(w=>n.has(w.id)),c=Lr.map(w=>{const A=n.has(w.id);return`
      <div class="card" style="margin:0;display:flex;gap:12px;align-items:center">
        <img src="${l(w.cover)}" alt="" style="width:72px;height:72px;border-radius:10px;object-fit:cover;flex:0 0 72px" />
        <div class="spacer">
          <strong>${l(w.title)}</strong>
          <div class="muted" style="font-size:12px">${l(w.artist)} · ${l(w.status)}</div>
          <div style="font-weight:800;margin-top:4px">$${w.price.toFixed(2)}</div>
        </div>
        ${s?A?'<span class="chip">In My Music</span>':`<button type="button" class="btn primary buy-track" data-id="${l(w.id)}">Buy · demo</button>`:'<a class="btn" href="#/profile">Sign in</a>'}
      </div>`}).join(""),p=Ht({publishedOnly:!0,types:["song","album"]}),m=p.map(w=>{const A=fd(w.streamingLinks||{});return Object.keys(A).length?{id:w.id,title:w.title,artist:w.artist,type:w.type||"song",cover:w.coverRef&&!String(w.coverRef).startsWith("idb:")?w.coverRef:"",links:A,fromAdmin:!0}:null}).filter(Boolean),h=[...ot,...m];let g="";if(t==="songs"||t==="albums"){const w=t==="albums",A=h.filter(M=>w?M.type==="album":M.type==="single"||M.type==="song");g=`<div class="card" id="music-focused-view">
      <h2>${w?"Albums":"Songs"}</h2>
      <p class="muted">Verified releases and available official listening links.</p>
      <div class="stream-grid">${A.map(Xi).join("")||'<p class="muted">No releases listed in this category yet.</p>'}</div>
      <a class="btn ghost" href="#/music">Music overview</a>
    </div>`}else t==="playlists"?g=`<div class="card" id="music-focused-view">
      <h2>Playlists</h2>
      <p class="muted">Official YouTube playlists open on YouTube. No rehosted audio.</p>
      <div class="row wrap" style="gap:8px">
        ${ln.map(w=>`<a class="btn ghost" href="${l(w.youtube)}" target="_blank" rel="noopener">${l(w.title)}</a>`).join("")}
      </div>
      <a class="btn ghost" href="#/music">Music overview</a>
    </div>`:(t==="beats"||t==="upload")&&(t==="upload"?Xg()?g=`<section class="card" id="music-focused-view">
        <h2>Upload Music</h2>
        <p class="muted">Create a private draft in PIKK. Creator/artist/producer role, verified email and rights certification are required. Drafts are not automatically published or monetized.</p>
        <form id="pikkMusicUploadForm" enctype="multipart/form-data">
          <div class="grid-2">
            <div class="field"><label for="musicUploadTitle">Track title *</label><input id="musicUploadTitle" name="title" maxlength="160" required /></div>
            <div class="field"><label for="musicUploadArtist">Artist / credit *</label><input id="musicUploadArtist" name="artistName" maxlength="120" value="${l((s==null?void 0:s.username)||"")}" required /></div>
            <div class="field"><label for="musicUploadAlbum">Album / project</label><input id="musicUploadAlbum" name="albumTitle" maxlength="160" /></div>
            <div class="field"><label for="musicUploadGenre">Genre</label><input id="musicUploadGenre" name="genre" maxlength="80" /></div>
          </div>
          <div class="field"><label for="musicUploadFile">Audio file *</label><input id="musicUploadFile" name="audio" type="file" accept="audio/mpeg,audio/mp4,audio/x-m4a,audio/wav,audio/aac,audio/flac,audio/ogg,.mp3,.m4a,.wav,.aac,.flac,.ogg" required /><small class="muted">MP3, M4A/MP4, WAV, AAC, FLAC or OGG · maximum 50 MB.</small></div>
          <label class="toggle" style="margin:8px 0"><input id="musicUploadExplicit" type="checkbox" /><span>Explicit content</span></label>
          <label class="toggle" style="margin:8px 0 14px"><input id="musicUploadRights" type="checkbox" required /><span>I certify that I own or control the rights needed to upload this audio. *</span></label>
          <button class="btn primary" type="submit" id="musicUploadSubmit">Upload private draft</button>
          <p class="muted" id="musicUploadStatus" role="status" aria-live="polite" style="margin:10px 0 0"></p>
        </form>
        <div style="margin-top:18px"><h3>My draft uploads</h3><div id="pikkMusicUploadList"><p class="muted">Loading drafts…</p></div></div>
        <a class="btn ghost" href="#/music">Music overview</a>
      </section>`:g=`<div class="card" id="music-focused-view">
        <h2>Upload Music</h2>
        <p class="muted">The creator upload backend is being connected. This screen will not save audio locally or pretend a file was uploaded.</p>
        <a class="btn" href="#/profile">Account / creator profile</a>
        <a class="btn ghost" href="#/music">Music overview</a>
      </div>`:g=`<div class="card" id="music-focused-view">
        <h2>Beats</h2>
        <p class="muted">Not available yet · TEST MODE. The producer beat marketplace and licensing checkout are still in development.</p>
        <a class="btn ghost" href="#/music">Music overview</a>
      </div>`);const v=p.length?`<div class="card catalog-admin-music">
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
      </div>`:"",b=ot.find(w=>w.cover)||null,y=ot.filter(w=>w.cover).slice(0,5),S=`
    ${`
    <section class="pikk-music-showcase card" aria-label="Official PIKK music discovery">
      <div class="pikk-music-showcase-copy">
        <p class="kicker">PIKK MUSIC · DISCOVER</p>
        <h2>Discover the sound.</h2>
        <p>Stream verified releases, browse albums and playlists, and explore the Vault.</p>
        <div class="pikk-music-showcase-actions">
          <a class="btn primary" href="#/music?view=songs">Listen to Songs</a>
          <a class="btn ghost" href="#/music?view=albums">Browse Albums</a>
        </div>
        <span class="pikk-music-showcase-note">Official listening destinations · TEST MODE for purchases and memberships</span>
      </div>
      ${b?`<div class="pikk-music-showcase-art"><img src="${l(b.cover)}" alt="${l(b.title)} official cover" decoding="async" loading="eager"/><span>${l(b.title)}</span></div>`:""}
    </section>
    <nav class="pikk-music-categories" aria-label="Music categories">
      <a href="#/music?view=songs" class="${t==="songs"?"on":""}">Songs</a>
      <a href="#/music?view=albums" class="${t==="albums"?"on":""}">Albums</a>
      <a href="#/music?view=beats" class="${t==="beats"?"on":""}">Beats</a>
      <a href="#/music?view=playlists" class="${t==="playlists"?"on":""}">Playlists</a>
      <a href="#/music#vault">Vault</a>
      <a href="#/ai-artists">AI Artists · Clearly labeled</a>
      <a href="#/shield">PIKK Shield · Rights preview</a>
      <a href="#/support">PIKK Support · Help & tickets</a>
    </nav>
    <section class="pikk-music-release-strip" aria-label="Official music covers">
      <div class="pikk-music-release-header"><h3>Listen &amp; discover</h3><a href="#/music#stream-everywhere">See all releases →</a></div>
      <div class="pikk-music-release-row">
        ${y.map(w=>`<a class="pikk-music-release-tile" href="#/music#stream-everywhere">
          <img src="${l(w.cover)}" alt="${l(w.title)} cover" loading="lazy" decoding="async"/>
          <strong>${l(w.title)}</strong>
          <small>${l(w.artist||"DatBoiSkeet")}</small>
        </a>`).join("")}
      </div>
    </section>`}
    ${g}
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
        <a class="btn" href="${l(he.youtube)}" target="_blank" rel="noopener">Official channel</a>
        <a class="btn ghost" href="${l(he.youtubeHandle)}" target="_blank" rel="noopener">@DatBoiSkeet1</a>
        ${ln.map(w=>`<a class="btn ghost" href="${l(w.youtube)}" target="_blank" rel="noopener">${l(w.title)}</a>`).join("")}
      </div>
      <div class="yt-mix-grid">
        ${_n.map(w=>`
          <article class="yt-mix-card">
            <div class="hero-video" style="margin:0 0 10px">
              <iframe src="${l(ct(w.embed))}" title="${l(w.title)}" allowfullscreen loading="lazy"
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
        <a class="btn stream-plat stream-plat-apple" href="${l(he.apple)}" target="_blank" rel="noopener">Apple Music · Listen</a>
        <a class="btn ghost stream-plat stream-plat-spotify" href="${l(he.spotify)}" target="_blank" rel="noopener">Spotify · Alternative</a>
        <a class="btn stream-plat stream-plat-youtubeMusic" href="${l(he.youtubeMusic)}" target="_blank" rel="noopener">YouTube Music</a>
        <a class="btn stream-plat stream-plat-youtube" href="${l(he.youtube)}" target="_blank" rel="noopener">YouTube</a>
      </div>
      <div class="stream-grid">
        ${ot.map(Xi).join("")}
        ${m.map(Xi).join("")}
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
      <h2>Vault ${i?'<span class="chip" style="border-color:#2a4a3a;color:#8dffb0">Unlocked · '+l(ko(a))+"</span>":'<span class="chip">Locked</span>'}</h2>
      <p class="muted">Exclusive unreleased tracks &amp; previews for members. Nested under Music — not a bottom-nav tab.</p>

      <div class="vault-grid" style="margin:12px 0">
        ${sv(i)}
      </div>

      ${i?`<div class="vault-lock" style="border-style:solid;border-color:#2a4a3a;color:var(--tx)">
              ✅ Membership active: <strong>${l(ko(a))}</strong>. Exclusive cards above are unlocked.
              Cancel anytime with the tier button below (demo). Purchased My Music items are kept.
            </div>`:`<div class="vault-lock">
              🔒 Vault locked. Sign in, then tap <strong>Join · TEST MODE</strong> on PIKK+ or Backstage below.
              Locked cards show title/cover only — no exclusive content until you join.
            </div>`}

      <h3 style="margin:16px 0 8px">Membership (TEST MODE)</h3>
      <div class="grid-2">${r}</div>
    </div>

  `;return P("Music & Vault",S,{lead:"Singles, albums, Coming Soon, and member Vault."})}function av(e=[]){return e.length?`<div class="support-history">${e.map(t=>`<article class="card" style="margin:0 0 8px"><div class="row wrap"><strong>${l(t.title)}</strong><span class="chip">${l(t.status)}</span></div><p class="muted" style="margin:5px 0">${l(t.artist_name)}${t.album_title?" · "+l(t.album_title):""}</p><small class="muted">${l(t.original_name)} · ${Math.max(1,Math.round((Number(t.size_bytes)||0)/1024/1024*10)/10)} MB${t.explicit_content?" · Explicit":""}</small></article>`).join("")}</div>`:'<p class="muted">No backend music drafts yet.</p>'}function $o(e){const t=e.querySelector("#pikkMusicUploadForm"),s=e.querySelector("#pikkMusicUploadList"),a=e.querySelector("#musicUploadStatus"),i=async()=>{if(s)try{const o=await bo.list();s.innerHTML=av(o.uploads||[])}catch(o){s.innerHTML=(o==null?void 0:o.status)===401?'<p class="muted">Sign in from <a href="#/profile">Profile</a> to view your music drafts.</p>':`<p class="muted">Could not load drafts: ${l((o==null?void 0:o.message)||"Unknown error")}</p>`}};t==null||t.addEventListener("submit",async o=>{var c,p,m,h,g,v,b,y,k,S,x,w;o.preventDefault();const r=(p=(c=e.querySelector("#musicUploadFile"))==null?void 0:c.files)==null?void 0:p[0];if(!r)return f("Choose an audio file");const d=e.querySelector("#musicUploadSubmit");d&&(d.disabled=!0),a&&(a.textContent="Uploading private draft…");try{const A=await bo.upload({audio:r,title:((h=(m=e.querySelector("#musicUploadTitle"))==null?void 0:m.value)==null?void 0:h.trim())||"",artistName:((v=(g=e.querySelector("#musicUploadArtist"))==null?void 0:g.value)==null?void 0:v.trim())||"",albumTitle:((y=(b=e.querySelector("#musicUploadAlbum"))==null?void 0:b.value)==null?void 0:y.trim())||"",genre:((S=(k=e.querySelector("#musicUploadGenre"))==null?void 0:k.value)==null?void 0:S.trim())||"",rightsCertified:!!((x=e.querySelector("#musicUploadRights"))!=null&&x.checked),explicitContent:!!((w=e.querySelector("#musicUploadExplicit"))!=null&&w.checked)});a&&(a.textContent=`Draft uploaded: ${A.upload.title}. It is not published yet.`),f("Music draft uploaded"),t.reset(),await i()}catch(A){const q={unauthenticated:"Sign in to upload music.",email_unverified:"Verify your email before uploading music.",creator_role_required:"Add Creator, Artist or Producer to your PIKK account before uploading.",media_storage_not_configured:"PIKK media storage is not connected yet. No file was uploaded.",rights_required:"Confirm that you own or control the rights to this audio."}[A==null?void 0:A.code]||(A==null?void 0:A.message)||"Could not upload music";a&&(a.textContent=q),f(q)}finally{d&&(d.disabled=!1)}}),s&&i();const n=e.querySelector("#youtube-mixes")||e;Li(n),e.querySelectorAll(".mem-toggle").forEach(o=>{o.addEventListener("click",r=>{r.preventDefault();const d=o.dataset.on==="1",c=mi(o.dataset.tier,!d);if(c!=null&&c.error)return f("Sign in required — open Profile first");f(d?"Membership cancelled (demo) · My Music purchases kept":`Joined ${o.dataset.tier} (TEST MODE) · Vault unlocked`),yo("#/music"),setTimeout(()=>{var p;return(p=document.getElementById("vault"))==null?void 0:p.scrollIntoView({behavior:"smooth",block:"start"})},40)})}),e.querySelectorAll(".buy-track").forEach(o=>{o.addEventListener("click",r=>{r.preventDefault();const d=Ep(o.dataset.id);if(d!=null&&d.error)return f("Sign in required");f("Added to My Music (demo · no charge)"),yo("#/music")})}),e.querySelectorAll("[data-idb-src]").forEach(async o=>{const r=o.getAttribute("data-idb-src");if(!r)return;const d=await _i(r);d&&(o.tagName==="IMG"||o.tagName==="AUDIO"||o.tagName==="VIDEO")&&(o.src=d)})}const fr="pikk_ai_artists_local_drafts_v1",gd=Object.freeze(["Fully AI-generated music","AI-assisted music with human performance","Human-made music with AI artwork only"]),iv="AI-generated or AI-assisted";function nv(e,t=Date.now()){const s=String(e.artist||"").trim().slice(0,80),a=String(e.track||"").trim().slice(0,120),i=String(e.creation||""),n=String(e.description||"").trim().slice(0,600),o=Number(e.price);if(!s||!a||!gd.includes(i)||!e.confirmed)throw Error("Artist, title, creation type and honest AI disclosure are required.");if(!Number.isFinite(o)||o<0||o>100)throw Error("Preview price must be between $0 and $100.");return{id:"ai-draft-"+t+"-"+Math.random().toString(36).slice(2,8),artist:s,track:a,creation:i,description:n,price:o,createdAt:t,status:"Private local draft · not published",disclosure:iv}}function gr(e){try{const t=JSON.parse(e.getItem(fr)||"[]");return Array.isArray(t)?t.filter(s=>s&&typeof s.id=="string").slice(0,40):[]}catch{return[]}}function rv(e,t){const s=[t,...gr(e)].slice(0,40);return e.setItem(fr,JSON.stringify(s)),s}function ov(e,t){const s=gr(e).filter(a=>a.id!==t);return e.setItem(fr,JSON.stringify(s)),s}function lv(){const e=gr(window.localStorage),t=e.length?e.map(s=>`<article class="card ai-artist-draft"><div class="row wrap"><strong>${l(s.track)}</strong><span class="chip">AI · ${l(s.creation)}</span></div><p class="muted">by ${l(s.artist)} · Preview price $${s.price.toFixed(2)}</p><p class="muted">${l(s.status)}</p><button type="button" class="btn ghost ai-artist-delete" data-id="${l(s.id)}">Delete draft</button></article>`).join(""):'<p class="muted">No AI music drafts saved on this device. This is not a public music catalog.</p>';return P("PIKK AI Artists",`
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
       <div class="field"><label for="aiCreationType">How was this made? *</label><select id="aiCreationType" name="creation">${gd.map(s=>`<option value="${l(s)}">${l(s)}</option>`).join("")}</select></div>
       <div class="field"><label for="aiPreviewPrice">Planned purchase price in USD (preview only)</label><input id="aiPreviewPrice" name="price" type="number" min="0" max="100" step=".01" value="1.00" required /></div>
       <div class="field"><label for="aiDescription">Description (optional)</label><textarea id="aiDescription" name="description" maxlength="600"></textarea></div>
       <label class="ai-artist-certify"><input type="checkbox" id="aiArtistCertify" required /> I accurately disclosed the use of AI and confirm I hold or can obtain the necessary commercial rights, including voice and likeness permissions.</label>
       <button type="submit" class="btn primary">Save private AI music draft</button>
     </form>
    </section>
    <section class="card ai-artist-panel"><h3>My private drafts (${e.length})</h3><div class="ai-artist-drafts">${t}</div><p class="muted">A real AI Artist storefront, public discovery feed and licensed downloadable sales require backend, payments and rights verification.</p></section>
   </div>
  </div>`,{lead:"Dedicated AI music category · Disclosure first"})}function cv(e){var t;(t=e.querySelector("#aiArtistForm"))==null||t.addEventListener("submit",s=>{s.preventDefault();const a=s.currentTarget;try{const i=nv({artist:a.elements.artist.value,track:a.elements.track.value,creation:a.elements.creation.value,price:a.elements.price.value,description:a.elements.description.value,confirmed:e.querySelector("#aiArtistCertify").checked});rv(window.localStorage,i),f("Private AI artist draft saved · not published"),location.hash==="#/ai-artists"&&(location.hash="#/ai-artists?updated=1"),window.dispatchEvent(new HashChangeEvent("hashchange"))}catch(i){f(i.message)}}),e.querySelectorAll(".ai-artist-delete").forEach(s=>s.addEventListener("click",()=>{ov(window.localStorage,s.dataset.id),window.dispatchEvent(new HashChangeEvent("hashchange"))}))}const qi="pikk_shield_intake_v1",ei=30,vr=Object.freeze(["Original creator","Licensed with permission","Authorized representative"]);function fs(e){const t=String(e||"").trim();if(!t)return"";try{const s=new URL(t);return["https:","http:"].includes(s.protocol)?s.href:""}catch{return""}}function dv(e,t=Date.now()){const s=String(e.title||"").trim().slice(0,120),a=String(e.owner||"").trim().slice(0,100),i=String(e.rights||""),n=String(e.contact||"").trim().slice(0,180),o=String(e.notes||"").trim().slice(0,800),r=fs(e.source);if(!s||!a||!n||!vr.includes(i)||!e.certified)throw new Error("Complete title, rights holder, contact, ownership basis and certification.");if(String(e.source||"").trim()&&!r)throw new Error("Use a valid http or https link.");return{id:"shield-"+t+"-"+Math.random().toString(36).slice(2,8),type:"rights-declaration",title:s,owner:a,rights:i,contact:n,notes:o,source:r,at:t,status:"Local draft — not submitted"}}function ws(e){try{const t=JSON.parse(e.getItem(qi)||"[]");return Array.isArray(t)?t.filter(s=>s&&s.type==="rights-declaration").slice(0,ei):[]}catch{return[]}}function pv(e,t){const s=[t,...ws(e)].slice(0,ei);return e.setItem(qi,JSON.stringify(s)),s}function uv(e,t){const s=ws(e).filter(a=>a.id!==t);return e.setItem(qi,JSON.stringify(s)),s}function mv(e){const t=ws(e).map(s=>({id:String(s.id||""),type:"rights-declaration",title:String(s.title||""),owner:String(s.owner||""),rights:String(s.rights||""),contact:String(s.contact||""),notes:String(s.notes||""),source:fs(s.source),at:Number.isFinite(s.at)?s.at:null,status:"Local draft — not submitted"}));return JSON.stringify({format:"PIKK Shield local rights drafts",version:1,drafts:t},null,2)}function hv(e,t){if(typeof t!="string"||t.length>65536)throw new Error("Backup file must be under 64 KB.");let s;try{s=JSON.parse(t)}catch{throw new Error("Invalid JSON backup file.")}if(!s||s.format!=="PIKK Shield local rights drafts"||s.version!==1||!Array.isArray(s.drafts)||s.drafts.length>ei)throw new Error("Not a supported PIKK Shield backup (maximum 30 drafts).");const a=s.drafts.map((d,c)=>{if(!d||typeof d!="object"||Array.isArray(d))throw new Error("Invalid draft in backup.");for(const p of["id","title","owner","rights","contact","notes","source"])if(typeof d[p]!="string")throw new Error("Invalid draft field: "+p);if(!/^shield-[a-zA-Z0-9-]{1,80}$/.test(d.id)||!d.title.trim()||d.title.length>120||!d.owner.trim()||d.owner.length>100||!vr.includes(d.rights)||!d.contact.trim()||d.contact.length>180||d.notes.length>800||d.source&&(!fs(d.source)||fs(d.source)!==d.source)||d.at!==null&&(!Number.isFinite(d.at)||d.at<0))throw new Error("Backup draft "+(c+1)+" contains invalid fields.");return{id:d.id,type:"rights-declaration",title:d.title.trim(),owner:d.owner.trim(),rights:d.rights,contact:d.contact.trim(),notes:d.notes,source:fs(d.source),at:d.at??Date.now(),status:"Local draft — not submitted"}}),i=ws(e),n=new Set(i.map(d=>d.id)),o=[];for(const d of a)n.has(d.id)||(n.add(d.id),o.push(d));const r=o.slice(0,Math.max(0,ei-i.length));return r.length&&e.setItem(qi,JSON.stringify([...r,...i])),{added:r.length,duplicates:a.length-o.length,total:ws(e).length}}const fv=()=>ws(window.localStorage);function gv(){const e=fv(),t=e.length?e.map(s=>{const a=fs(s.source);return`
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
    </article>`}).join(""):'<p class="muted">No rights declarations saved on this device.</p>';return P("PIKK Shield",`
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
            <div class="field"><label for="shieldRights">Rights basis *</label><select id="shieldRights" name="rights" required>${vr.map(s=>`<option value="${l(s)}">${l(s)}</option>`).join("")}</select></div>
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
    </div>`,{lead:"Rights declaration preview · No official copyright protection is active yet"})}function vv(e){var i,n,o;(i=e.querySelector("#shieldForm"))==null||i.addEventListener("submit",r=>{r.preventDefault();const d=r.currentTarget;try{const c=dv({title:d.elements.title.value,owner:d.elements.owner.value,rights:d.elements.rights.value,contact:d.elements.contact.value,source:d.elements.source.value,notes:d.elements.notes.value,certified:e.querySelector("#shieldCertify").checked});pv(window.localStorage,c),f("Local rights draft saved — not submitted"),location.hash="#/shield?updated=1",window.dispatchEvent(new HashChangeEvent("hashchange"))}catch(c){f(c.message)}});const t=e.querySelector("#shieldImportFile");(n=e.querySelector("#shieldImportDrafts"))==null||n.addEventListener("click",()=>t==null?void 0:t.click()),t==null||t.addEventListener("change",async()=>{var d;const r=(d=t.files)==null?void 0:d[0];if(r)try{if(r.size>65536)throw new Error("Backup file must be under 64 KB.");const c=await r.text();if(!window.confirm("Restore PIKK Shield drafts from this file? Valid drafts will be merged into this browser, without replacing existing drafts."))return;const p=hv(window.localStorage,c);f(`Restored ${p.added} local draft(s); ${p.duplicates} already saved`),window.dispatchEvent(new HashChangeEvent("hashchange"))}catch(c){f(c.message||"Unable to restore backup")}finally{t.value=""}}),(o=e.querySelector("#shieldExportDrafts"))==null||o.addEventListener("click",()=>{const r=mv(window.localStorage),d=URL.createObjectURL(new Blob([r],{type:"application/json"})),c=document.createElement("a");c.href=d,c.download="pikk-shield-local-drafts.json",document.body.appendChild(c),c.click(),c.remove(),setTimeout(()=>URL.revokeObjectURL(d),1e3),f("Local backup downloaded — store it privately")});const s=e.querySelector("#shieldDraftSearch"),a=[...e.querySelectorAll(".shield-entry")];s==null||s.addEventListener("input",()=>{const r=s.value.trim().toLocaleLowerCase();let d=0;a.forEach(m=>{const h=m.dataset.shieldSearch.includes(r);m.hidden=!h,h&&d++});const c=e.querySelector("#shieldSearchCount");c&&(c.textContent=`Showing ${d} of ${a.length} drafts`);const p=e.querySelector("#shieldSearchEmpty");p&&(p.hidden=d!==0)}),e.querySelectorAll(".shield-delete").forEach(r=>r.addEventListener("click",()=>{var c,p;const d=((p=(c=r.closest(".shield-entry"))==null?void 0:c.querySelector("strong"))==null?void 0:p.textContent)||"this rights draft";window.confirm(`Delete local rights draft "${d}"? This cannot be undone.`)&&(uv(window.localStorage,r.dataset.id),f("Local draft deleted"),window.dispatchEvent(new HashChangeEvent("hashchange")))}))}const br="pikk_support_local_tickets_v1",vd=Object.freeze(["Account & login","Music & artist rights","Livestreams & gifts","Billing & purchases","Safety & reporting","Technical issue","Bug report","Other"]),bd=40;function bv(e,t=Date.now()){const s=String(e.category||""),a=String(e.subject||"").trim().slice(0,120),i=String(e.message||"").trim().slice(0,1500),n=String(e.contact||"").trim().slice(0,180);if(!vd.includes(s)||a.length<4||i.length<10||!n)throw Error("Select a topic and enter a subject, contact and detailed message.");return{id:"draft-"+t+"-"+Math.random().toString(36).slice(2,7),category:s,subject:a,message:i,contact:n,createdAt:t,status:"Saved on this device — support inbox coming soon · not submitted"}}function yr(e){try{const t=JSON.parse(e.getItem(br)||"[]");return Array.isArray(t)?t.filter(s=>s&&typeof s.id=="string").slice(0,bd):[]}catch{return[]}}function yv(e,t){const s=yr(e);if(s.some(n=>n.category===t.category&&n.subject===t.subject&&n.message===t.message&&n.contact===t.contact))return s;const i=[t,...s].slice(0,bd);return e.setItem(br,JSON.stringify(i)),i}function kv(e,t){const s=yr(e).filter(a=>a.id!==t);return e.setItem(br,JSON.stringify(s)),s}const ti=Object.freeze([{topic:"Music & artist rights",answer:"For copyright protection, review PIKK Shield. Fingerprinting, review and takedowns are not yet operating.",href:"#/shield"},{topic:"Livestreams & gifts",answer:"Check the Live section for available demo features. Real payouts and broadcasts require production integrations.",href:"#/live"},{topic:"Billing & purchases",answer:"Wallet and payments shown in this preview may be demonstration values. Do not assume money was charged or refunded.",href:"#/wallet"},{topic:"Payments & refunds",answer:"No real payments are processed yet, so there is nothing to refund. See the Payments hub for what is live and what is Coming soon.",href:"#/payments"},{topic:"Safety & abuse",answer:"Read the Community Guidelines and use in-app report controls where available. For emergencies contact local authorities.",href:"#/guidelines"},{topic:"Account & login",answer:"This early version does not provide verified human account recovery or password reset via Support.",href:"#/profile"}]);function wv(e){const t=String(e||"").trim().toLowerCase();return t?ti.filter(s=>(s.topic+" "+s.answer).toLowerCase().includes(t)):ti.slice()}const Sv=Object.freeze([{id:"faq",title:"Help / FAQ search",href:"#/support?s=faq"},{id:"contact",title:"Contact support",href:"#/support?s=contact"},{id:"bug",title:"Report a problem / bug",href:"#/support?s=bug"},{id:"abuse",title:"Report abuse / safety",href:"#/guidelines"},{id:"payments",title:"Payments & refunds help",href:"#/payments"},{id:"account",title:"Account & login help",href:"#/support?s=account"},{id:"tickets",title:"My tickets",href:"#/support?s=tickets"}]),$v="".trim().replace(/\/$/,"");function yd(){return((typeof window<"u"&&typeof window.__PIKK_API_BASE__=="string"?window.__PIKK_API_BASE__.trim():"")||$v).replace(/\/$/,"")}function kr(){return!!yd()}async function _s(e,{method:t="GET",body:s}={}){var o,r,d;const a=yd();if(!a){const c=new Error("PIKK API is not configured");throw c.code="api_not_configured",c}const i=await fetch(a+e,{method:t,credentials:"include",headers:s===void 0?void 0:{"Content-Type":"application/json"},body:s===void 0?void 0:JSON.stringify(s)});let n=null;try{n=await i.json()}catch{}if(!i.ok){const c=new Error(((o=n==null?void 0:n.error)==null?void 0:o.message)||`Request failed (${i.status})`);throw c.code=((r=n==null?void 0:n.error)==null?void 0:r.code)||"request_failed",c.status=i.status,c.details=((d=n==null?void 0:n.error)==null?void 0:d.details)||null,c}return n}const Ev=Object.freeze({"Account & login":"account","Music & artist rights":"other","Livestreams & gifts":"other","Billing & purchases":"payments","Safety & reporting":"safety","Technical issue":"technical","Bug report":"technical",Other:"other"});function xv(e){return Ev[e]||"other"}const rt={createTicket:({category:e,subject:t,message:s})=>_s("/support/tickets",{method:"POST",body:{category:xv(e),subject:t,message:s}}),listTickets:()=>_s("/support/tickets"),staffList:()=>_s("/support/staff/tickets"),getTicket:e=>_s("/support/tickets/"+encodeURIComponent(e)),reply:(e,t)=>_s("/support/tickets/"+encodeURIComponent(e)+"/messages",{method:"POST",body:{message:t}})};function kd(e){return e.map(t=>`<a class="support-guide" href="${l(t.href)}"><strong>${l(t.topic)}</strong><span>${l(t.answer)}</span><span class="support-guide-link">View related page →</span></a>`).join("")}function wd(e,t=""){return String(t).trim()?`${e} matching help ${e===1?"guide":"guides"}`:`Showing all ${e} help guides`}function Av(e=[]){return e.length?e.map(t=>`<article class="card support-ticket support-ticket-remote" data-id="${l(t.id)}"><strong>${l(t.subject)}</strong><span class="chip">${l(t.status)}</span><p class="muted">${l(t.category)} · ${new Date(t.created_at).toLocaleDateString()}</p><button class="btn ghost" type="button" data-open-ticket="${l(t.id)}">Open ticket</button></article>`).join(""):'<p class="muted">No submitted support tickets yet.</p>'}function Eo(e){const t=e==null?void 0:e.ticket,s=(e==null?void 0:e.messages)||[];if(!t)return"";const a=s.map(i=>`<article class="support-thread-message ${i.is_staff?"is-staff":"is-user"}"><strong>${i.is_staff?"PIKK Support":"@"+l(i.handle||"you")}</strong><p>${l(i.body)}</p><small class="muted">${new Date(i.created_at).toLocaleString()}</small></article>`).join("");return`<div class="card support-ticket-detail" data-ticket-detail="${l(t.id)}"><div class="row wrap"><h3 style="margin:0">${l(t.subject)}</h3><span class="chip">${l(t.status)}</span></div><div class="support-thread">${a||'<p class="muted">No messages yet.</p>'}</div>${t.status==="closed"?'<p class="muted">This ticket is closed.</p>':`<form id="pikkSupportReplyForm" data-ticket-id="${l(t.id)}"><div class="field"><label for="pikkSupportReply">Reply</label><textarea id="pikkSupportReply" name="message" minlength="1" maxlength="5000" required></textarea></div><button class="btn primary" type="submit">Send reply</button></form>`}</div>`}function Tv(){const e=kr(),t=yr(window.localStorage),s=kd(ti),a=t.length?t.map(r=>`<article class="card support-ticket" data-id="${l(r.id)}"><strong>${l(r.subject)}</strong><span class="chip">${l(r.status)}</span><p class="muted">${l(r.category)} · ${new Date(r.createdAt).toLocaleDateString()}</p><button class="btn ghost support-delete" type="button" data-id="${l(r.id)}">Delete local draft</button></article>`).join(""):'<p class="muted">No support drafts saved on this device.</p>',i=e?'<p>Find relevant help or submit a support ticket to the PIKK support queue. Submitted tickets are tied to your signed-in account.</p><p class="support-warning"><strong>ACCOUNT SUPPORT:</strong> Sign in before submitting. Never include passwords, payment card numbers, government IDs or confidential documents.</p>':'<p>Find relevant help and prepare a support ticket. Human agents, AI chat, account actions and backend tickets are not yet connected.</p><p class="support-warning"><strong>TEST MODE:</strong> Tickets are saved only in this browser. No request is sent to staff. For urgent safety concerns or unauthorized charges, contact the relevant service or authorities directly.</p>',n=e?"":'<div class="field"><label for="pikkSupportContact">Contact *</label><input id="pikkSupportContact" name="contact" maxlength="180" required placeholder="Email or username" /></div>',o=e?'<section class="card support-pane" id="support-tickets"><h3>My tickets</h3><div class="support-history" id="pikkSupportRemoteHistory" aria-live="polite"><p class="muted">Loading submitted tickets…</p></div><div id="pikkSupportRemoteDetail"></div></section>':`<section class="card support-pane" id="support-tickets"><h3>Saved drafts (${t.length})</h3><div class="support-history">${a}</div></section>`;return P("PIKK Support",`
  <div class="support-studio">
   <header class="support-hero"><span class="support-eyebrow">PIKK HELP CENTER · EARLY ACCESS</span><h2>Answers, guidance & support</h2>${i}</header>
   <nav class="support-jump" aria-label="Support sections">${Sv.map(r=>`<a class="chip" href="${l(r.href)}" data-support-jump="${l(r.id)}">${l(r.title)}</a>`).join("")}</nav>
   <section class="card support-pane" id="support-faq"><h3>Help / FAQ search</h3><div class="support-search-row"><input id="pikkSupportSearch" type="search" placeholder="Search help (e.g. refund, login, live)" aria-label="Search help" aria-controls="pikkSupportResults" aria-describedby="pikkSupportSearchStatus" /><button class="btn ghost support-search-clear" id="pikkSupportClear" type="button" hidden>Clear search</button></div><p class="support-search-status muted" id="pikkSupportSearchStatus" role="status" aria-live="polite" aria-atomic="true">${wd(ti.length)}</p><div class="support-guides" id="pikkSupportResults">${s}</div></section>
   <section class="card support-pane" id="support-account"><h3>Account &amp; login help</h3><p class="muted">Sign in or manage your profile from <a href="#/profile">Profile</a>. Password reset by Support is not live yet; never share your password with anyone.</p></section>
   <section class="card support-pane" id="support-links"><h3>Safety, payments &amp; bugs</h3><div class="support-guides"><a class="support-guide" href="#/guidelines"><strong>Report abuse / safety</strong><span>Community Guidelines and how reporting works.</span></a><a class="support-guide" href="#/payments"><strong>Payments &amp; refunds help</strong><span>Payments hub · real payments are Coming soon.</span></a><button type="button" class="support-guide" data-support-bug><strong>Report a problem / bug</strong><span>Prefills the ticket form with Bug report.</span></button></div></section>
   <div class="support-layout">
    <section class="card support-pane" hidden><h3>Find help</h3><div class="support-guides">${s}</div><p class="muted">These are general guides, not an automated resolution or personalized AI answer.</p></section>
    <section class="card support-pane" id="support-contact"><h3>Contact support</h3><p class="muted"><strong>${e?"Submitted to the PIKK support queue.":"Saved on this device — support inbox coming soon."}</strong></p><p class="muted">Do not include passwords, payment card numbers, government IDs or confidential documents.</p>
     <form id="pikkSupportForm">
      <div class="field"><label for="pikkSupportTopic">Issue category *</label><select id="pikkSupportTopic" name="category">${vd.map(r=>`<option value="${l(r)}">${l(r)}</option>`).join("")}</select></div>
      <div class="field"><label for="pikkSupportSubject">Subject *</label><input id="pikkSupportSubject" name="subject" maxlength="120" minlength="4" required /></div>
      ${n}
      <div class="field"><label for="pikkSupportMessage">Describe the issue *</label><textarea id="pikkSupportMessage" name="message" minlength="10" maxlength="1500" required></textarea></div>
      <button class="btn primary" type="submit">${e?"Submit ticket to PIKK Support":"Save ticket draft locally"}</button>
     </form>
    </section>
   </div>
   ${o}
  </div>`,{lead:e?"Account-linked support tickets · PIKK support queue":"Local help preview · Ticket submission and AI agents are not yet live"})}function Cv(e){var h,g;const t=kr(),s=e.querySelector("#pikkSupportResults"),a=e.querySelector("#pikkSupportSearch"),i=e.querySelector("#pikkSupportClear"),n=e.querySelector("#pikkSupportSearchStatus"),o=e.querySelector("#pikkSupportRemoteHistory"),r=e.querySelector("#pikkSupportRemoteDetail"),d=v=>{const b=wv(v);s.innerHTML=b.length?kd(b):t?'<p class="muted">No matching help yet. <a href="#/support?s=contact">Submit a support ticket</a> below.</p>':'<p class="muted">No matching help yet. <a href="#/support?s=contact">Prepare a local support draft</a> below.</p>',n&&(n.textContent=wd(b.length,v)),i&&(i.hidden=!String(v).trim())},c=async()=>{if(!(!t||!o))try{const v=await rt.listTickets();o.innerHTML=Av(v.tickets||[])}catch(v){o.innerHTML=(v==null?void 0:v.status)===401?'<p class="muted">Sign in from <a href="#/profile">Profile</a> to view submitted tickets.</p>':`<p class="muted">Could not load tickets: ${l(v.message||"Unknown error")}</p>`}};a==null||a.addEventListener("input",()=>d(a.value)),a==null||a.addEventListener("keydown",v=>{v.key==="Escape"&&a.value&&(v.preventDefault(),a.value="",d(""))}),i==null||i.addEventListener("click",()=>{a&&(a.value="",d(""),a.focus())});const p=()=>{var b,y;const v=e.querySelector("#pikkSupportTopic");v&&(v.value="Bug report"),(b=e.querySelector("#support-contact"))==null||b.scrollIntoView({block:"start"}),(y=e.querySelector("#pikkSupportSubject"))==null||y.focus()};(h=e.querySelector("[data-support-bug]"))==null||h.addEventListener("click",p);const m=new URLSearchParams(location.hash.split("?")[1]||"").get("s");m==="bug"?setTimeout(p,80):m&&setTimeout(()=>{var v;return(v=e.querySelector("#support-"+m))==null?void 0:v.scrollIntoView({block:"start"})},80),(g=e.querySelector("#pikkSupportForm"))==null||g.addEventListener("submit",async v=>{var y;v.preventDefault();const b=v.currentTarget;if(t){try{await rt.createTicket({category:b.elements.category.value,subject:b.elements.subject.value,message:b.elements.message.value}),f("Ticket submitted to PIKK Support"),b.reset(),await c(),(y=e.querySelector("#support-tickets"))==null||y.scrollIntoView({block:"start"})}catch(k){f((k==null?void 0:k.status)===401?"Sign in to submit a support ticket":k.message||"Could not submit ticket")}return}try{const k=bv({category:b.elements.category.value,subject:b.elements.subject.value,contact:b.elements.contact.value,message:b.elements.message.value}),x=yv(window.localStorage,k).some(w=>w.id===k.id);f(x?"Ticket draft saved locally · not sent":"An identical draft is already saved on this device · not sent"),location.hash==="#/support"&&(location.hash="#/support?updated=1"),window.dispatchEvent(new HashChangeEvent("hashchange"))}catch(k){f(k.message)}}),o==null||o.addEventListener("click",async v=>{const b=v.target.closest("[data-open-ticket]");if(!(!b||!r))try{const y=await rt.getTicket(b.dataset.openTicket);r.innerHTML=Eo(y),r.scrollIntoView({block:"start"})}catch(y){f(y.message||"Could not open ticket")}}),r==null||r.addEventListener("submit",async v=>{if(v.target.id!=="pikkSupportReplyForm")return;v.preventDefault();const b=v.target,y=b.elements.message.value;try{await rt.reply(b.dataset.ticketId,y);const k=await rt.getTicket(b.dataset.ticketId);r.innerHTML=Eo(k),await c(),f("Reply sent to PIKK Support")}catch(k){f(k.message||"Could not send reply")}}),e.querySelectorAll(".support-delete").forEach(v=>v.addEventListener("click",()=>{kv(window.localStorage,v.dataset.id),f("Local ticket draft deleted"),window.dispatchEvent(new HashChangeEvent("hashchange"))})),t&&c()}const Pv="".trim().replace(/\/$/,"");function Sd(){return((typeof window<"u"&&typeof window.__PIKK_API_BASE__=="string"?window.__PIKK_API_BASE__.trim():"")||Pv).replace(/\/$/,"")}const si=()=>!!Sd();async function gt(e,t="GET",s){var o,r;const a=Sd();if(!a){const d=new Error("PIKK API is not configured");throw d.code="api_not_configured",d}const i=await fetch(a+e,{method:t,credentials:"include",headers:t==="GET"?void 0:{"Content-Type":"application/json"},body:t==="GET"?void 0:JSON.stringify(s||{})});let n=null;try{n=await i.json()}catch{}if(!i.ok){const d=new Error(((o=n==null?void 0:n.error)==null?void 0:o.message)||`Request failed (${i.status})`);throw d.code=((r=n==null?void 0:n.error)==null?void 0:r.code)||"request_failed",d.status=i.status,d}return n}const ai=Object.freeze({not_connected:{label:"Not available yet",text:"ID verification provider not connected yet. Dating and 18+ contests stay locked until it is."},not_started:{label:"Not started",text:"Verify you are 18+ with a government ID and a selfie through our verification partner. PIKK keeps only the result."},pending:{label:"Pending",text:"Your verification is in progress. This page updates once the provider sends a result."},needs_review:{label:"Under review",text:"Your verification needs a manual review by the provider."},verified:{label:"Verified 18+",text:"You are verified 18+."},declined:{label:"Declined",text:"Verification was not approved. Contact Support if you think this is a mistake."},expired:{label:"Expired",text:"Your verification session expired. Start again."},signin:{label:"Sign in required",text:"Sign in with a verified email to verify your age."}}),Us={status:()=>gt("/verification/age"),start:()=>gt("/verification/age/start","POST"),consentText:()=>gt("/verification/age/consent"),consent:({version:e,sha256:t,fullName:s})=>gt("/verification/age/consent","POST",{agree:!0,version:e,sha256:t,full_name:s}),contestEligibility:e=>gt(`/contests/${encodeURIComponent(e)}/eligibility`),submitEntry:(e,t,s=!1)=>gt(`/contests/${encodeURIComponent(e)}/${s?"live":"entries"}`,"POST",{title:t}),getGender:()=>gt("/account/gender"),setGender:e=>gt("/account/gender","POST",{gender:e})};function Na(e){return(e==null?void 0:e.code)==="api_not_configured"||(e==null?void 0:e.code)==="provider_not_connected"?"not_connected":(e==null?void 0:e.status)===401||(e==null?void 0:e.code)==="email_unverified"?"signin":"not_connected"}function $d(e){try{const t=new URL(e);return t.protocol==="https:"?t.href:null}catch{return null}}function Ed(e,t){return e===!0&&/\S+\s+\S+/.test(String(t||"").trim())&&String(t).trim().length>=3}const $n=Object.freeze(Object.defineProperty({__proto__:null,STATUS_COPY:ai,isVerificationApiConfigured:si,safeHostedUrl:$d,statusFromError:Na,validConsentSignature:Ed,verificationApi:Us},Symbol.toStringTag,{value:"Module"}));function xd(e,t=""){const s=ai[e]||ai.not_connected,a=["not_started","declined","expired"].includes(e);return`<div class="card" id="verifyAgeCard" data-status="${l(e)}">
    <h3>Status: <span class="chip">${l(s.label)}</span></h3>
    <p>${l(s.text)}</p>${t}
    ${a?'<button type="button" class="btn primary" id="verifyAgeStart">Verify age / ID</button>':""}
    ${e==="signin"?'<a class="btn primary" href="#/profile">Sign in</a>':""}
    ${e==="verified"?'<a class="btn" href="#/dating">Go to Dating</a>':""}
  </div>`}function Iv(){return P("Verify age / ID",`
    <div id="verifyAgeRoot">${xd(si()?"pending":"not_connected",si()?'<p class="muted">Checking…</p>':"")}</div>
    <div class="card muted"><h3>Privacy</h3><p>Verification is done by an outside provider. PIKK stores only whether you are 18+, the method, the date and the provider reference. PIKK never stores your ID images or date of birth.</p></div>`,{lead:"Required for Dating and 18+ contests."})}async function Mv(e){const t=e.querySelector("#verifyAgeRoot");if(!t||!si())return;const s=async n=>{let o;try{o=await Us.consentText()}catch(m){return a(Na(m))}t.innerHTML=`<div class="card" id="bioConsent">
      <h3>Biometric notice &amp; written consent</h3>
      <p class="chip">Draft · lawyer review required</p>
      <pre style="white-space:pre-wrap;font:inherit">${l(o.text)}</pre>
      <p><a href="#/biometric-policy">Read the PIKK Biometric Retention Policy</a></p>
      <label><input type="checkbox" id="bioAgree"> I have read this notice and I consent.</label>
      <label style="display:block;margin-top:8px">Type your full legal name as your signature
        <input type="text" id="bioName" autocomplete="name" maxlength="120"></label>
      <div class="row wrap" style="gap:8px;margin-top:8px">
        <button type="button" class="btn primary" id="bioSign" disabled>Sign and continue</button>
        <a class="btn ghost" href="#/dating">I decline</a>
      </div></div>`;const r=t.querySelector("#bioAgree"),d=t.querySelector("#bioName"),c=t.querySelector("#bioSign"),p=()=>{c.disabled=!Ed(r.checked,d.value)};r.addEventListener("change",p),d.addEventListener("input",p),c.addEventListener("click",async()=>{c.disabled=!0;try{await Us.consent({version:o.version,sha256:o.sha256,fullName:d.value.trim()}),f("Consent recorded"),a(n,!0)}catch(m){f((m==null?void 0:m.message)||"Could not record consent"),p()}})},a=(n,o=!1)=>{var r;t.innerHTML=xd(n),(r=t.querySelector("#verifyAgeStart"))==null||r.addEventListener("click",async d=>{if(d.target.disabled=!0,i&&!o)return s(n);try{const c=await Us.start(),p=$d(c==null?void 0:c.hosted_url);if(!p)throw Object.assign(new Error("bad url"),{code:"provider_error"});window.location.assign(p)}catch(c){if((c==null?void 0:c.code)==="biometric_consent_required")return s(n);f((c==null?void 0:c.code)==="provider_not_connected"?ai.not_connected.text:"Could not start verification. Try again later."),a(Na(c)==="signin"?"signin":n)}})};let i=!0;try{const n=await Us.status();i=(n==null?void 0:n.consent_required)!==!1,a((n==null?void 0:n.status)||"not_connected")}catch(n){a(Na(n))}}const Lv="2026-11-02.draft1",Dv=`PIKK Biometric Information Notice and Written Consent (DRAFT — lawyer review required)

1. What is collected. To verify that you are 18 or older, our vendor Persona Identities, Inc. ("Persona") collects a photo of your government ID and a selfie/liveness video, and creates face geometry (a biometric identifier) from them to compare your face with your ID photo.
2. Purpose. This is used only to verify your age (18+) and identity for PIKK Dating and as a contestant in 18+ contests. It is not used for advertising, profiling or any other purpose.
3. Who processes it. Persona processes this data as PIKK's vendor. PIKK itself never receives or stores your ID images, selfie, face geometry or date of birth. PIKK stores only: whether you are verified 18+, the method, the date and Persona's reference number.
4. Retention and destruction. Persona keeps the data only under the retention policy PIKK configures and destroys it when the verification purpose is satisfied, and in all cases no later than the earlier of (a) when the purpose is satisfied or (b) 3 years after your last interaction with PIKK (Illinois), or within the time required by Texas and Washington law, whichever is sooner. See the PIKK Biometric Retention Policy at #/biometric-policy.
5. No sale. PIKK and Persona will not sell, lease, trade or otherwise profit from your biometric data.
6. Your choice. You may decline. If you decline, you can still use PIKK, view and vote in contests, but you cannot use Dating or enter 18+ contests as a contestant.

By checking the box and typing your full legal name, you give written consent (electronic signature) to the collection, storage and use of your biometric identifiers and information as described above.`,_v=Lv;function Ov(){return P("Biometric Retention Policy",`<div class="card">
    <p class="chip">Draft · lawyer review required · v${_v}</p>
    <p class="muted" style="font-size:12px">Consent text SHA-256: <code id="consentHash">computing…</code></p>
    <h3>What is collected</h3><p>For 18+ age/identity verification only, our vendor Persona collects your government ID photo and a selfie/liveness capture and derives face geometry to match them.</p>
    <h3>What PIKK keeps</h3><p>PIKK stores no biometric identifiers or information: no ID images, selfies, face geometry or date of birth. PIKK keeps only the 18+ result, method, date, Persona's reference number and your signed consent record.</p>
    <h3>Retention and destruction</h3><p>Persona retains biometric data only under the retention policy PIKK configures and must destroy it when the initial purpose (age/identity verification) is satisfied, and in any case no later than 3 years after your last interaction with PIKK (Illinois 740 ILCS 14/15(a)), or sooner where Texas (Bus. &amp; Com. Code §503.001) or Washington (RCW 19.375) law requires.</p>
    <h3>No sale</h3><p>PIKK and Persona will not sell, lease, trade or otherwise profit from biometric data, and will not disclose it except as required by law.</p>
    <h3>Your choices</h3><p>Verification is optional. You may decline and still use PIKK, including watching and voting in contests. Questions or deletion requests: <a href="#/support">Support</a>.</p>
  </div>`,{lead:"Public policy for biometric data used in age verification."})}async function qv(e){var a;const t=e==null?void 0:e.querySelector("#consentHash");if(!t||!((a=globalThis.crypto)!=null&&a.subtle))return;const s=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(Dv));t.textContent=[...new Uint8Array(s)].map(i=>i.toString(16).padStart(2,"0")).join("")}function Rv(e=[]){return e.length?e.map(t=>`<button type="button" class="card support-staff-ticket" data-staff-ticket="${l(t.id)}">
    <div class="row wrap"><strong>${l(t.subject)}</strong><span class="chip">${l(t.status)}</span></div>
    <p class="muted" style="margin:5px 0">@${l(t.handle||"user")} · ${l(t.email||"")} · ${l(t.category)}</p>
    <small class="muted">${new Date(t.created_at).toLocaleString()}</small>
  </button>`).join(""):'<p class="muted">No support tickets in the queue.</p>'}function xo(e){const t=e==null?void 0:e.ticket,s=(e==null?void 0:e.messages)||[];return t?`<section class="card"><div class="row wrap"><h3 style="margin:0">${l(t.subject)}</h3><span class="chip">${l(t.status)}</span></div>
   <div class="support-thread" style="margin:12px 0">${s.map(a=>`<article class="support-thread-message ${a.is_staff?"is-staff":"is-user"}"><strong>${a.is_staff?"PIKK Support":"@"+l(a.handle||"user")}</strong><p>${l(a.body)}</p><small class="muted">${new Date(a.created_at).toLocaleString()}</small></article>`).join("")}</div>
   <form id="supportStaffReply" data-ticket-id="${l(t.id)}"><div class="field"><label for="supportStaffMessage">Staff reply</label><textarea id="supportStaffMessage" name="message" maxlength="5000" required></textarea></div><button class="btn primary" type="submit">Send support reply</button></form>
 </section>`:""}function Nv(){return kr()?P("Support Staff Queue",'<section class="card"><p class="kicker">PIKK SUPPORT · STAFF ONLY</p><h2>Submitted ticket queue</h2><p class="muted">Requires a real backend <code>support_agent</code> or <code>admin</code> role. Unauthorized accounts cannot read this queue.</p></section><div class="grid-2 support-staff-layout"><section class="card"><h3>Queue</h3><div id="supportStaffQueue"><p class="muted">Loading queue…</p></div></section><div id="supportStaffDetail"></div></div>',{lead:"Persistent account-linked support tickets"}):P("Support Staff Queue",'<div class="card"><h3>Backend support queue unavailable</h3><p class="muted">The production PIKK API endpoint is not configured in this build.</p></div>')}function Bv(e){const t=e.querySelector("#supportStaffQueue"),s=e.querySelector("#supportStaffDetail");if(!t)return;const a=async()=>{try{const i=await rt.staffList();t.innerHTML=Rv(i.tickets||[])}catch(i){t.innerHTML=(i==null?void 0:i.status)===403?'<p class="muted">Your account is signed in but does not have Support Staff permission.</p>':(i==null?void 0:i.status)===401?'<p class="muted">Sign in with a Support Staff account from <a href="#/profile">Profile</a>.</p>':`<p class="muted">Could not load staff queue: ${l((i==null?void 0:i.message)||"Unknown error")}</p>`}};t.addEventListener("click",async i=>{const n=i.target.closest("[data-staff-ticket]");if(!(!n||!s))try{const o=await rt.getTicket(n.dataset.staffTicket);s.innerHTML=xo(o),s.scrollIntoView({block:"start"})}catch(o){f((o==null?void 0:o.message)||"Could not open ticket")}}),s==null||s.addEventListener("submit",async i=>{if(i.target.id!=="supportStaffReply")return;i.preventDefault();const n=i.target,o=n.elements.message.value.trim();if(o)try{await rt.reply(n.dataset.ticketId,o);const r=await rt.getTicket(n.dataset.ticketId);s.innerHTML=xo(r),await a(),f("Support reply sent")}catch(r){f((r==null?void 0:r.message)||"Could not send support reply")}}),a()}const Kv="".trim().replace(/\/$/,"");function Ad(){return((typeof window<"u"&&typeof window.__PIKK_API_BASE__=="string"?window.__PIKK_API_BASE__.trim():"")||Kv).replace(/\/$/,"")}function wr(){return!!Ad()}async function Os(e,{method:t="GET",body:s}={}){var o,r,d;const a=Ad();if(!a){const c=new Error("PIKK API is not configured");throw c.code="api_not_configured",c}const i=await fetch(a+e,{method:t,credentials:"include",headers:s===void 0?void 0:{"Content-Type":"application/json"},body:s===void 0?void 0:JSON.stringify(s)});let n=null;try{n=await i.json()}catch{}if(!i.ok){const c=new Error(((o=n==null?void 0:n.error)==null?void 0:o.message)||`Request failed (${i.status})`);throw c.status=i.status,c.code=((r=n==null?void 0:n.error)==null?void 0:r.code)||"request_failed",c.details=((d=n==null?void 0:n.error)==null?void 0:d.details)||null,c}return n}const ca={me:()=>Os("/auth/me"),updateSignupRoles:e=>Os("/account/signup-roles",{method:"POST",body:{signup_roles:e}}),updateProfile:({displayName:e,bio:t,avatarUrl:s})=>Os("/account/profile",{method:"POST",body:{display_name:e,bio:t,avatar_url:s}}),listRoleReviews:(e="")=>Os("/admin/signup-roles"+(e?"?status="+encodeURIComponent(e):"")),reviewRole:({handle:e,role:t,status:s,reason:a})=>Os("/admin/signup-roles/review",{method:"POST",body:{handle:e,role:t,status:s,reason:a}})},Ao=["","declared","pending_review","approved","rejected"];function jv(e=[]){return e.length?e.map(t=>`<article class="card creator-review-row" data-review-row="${l(t.handle)}:${l(t.role)}">
    <div class="row wrap"><strong>@${l(t.handle)} · ${l(t.role)}</strong><span class="chip">${l(t.status)}</span></div>
    <p class="muted" style="margin:6px 0">${l(t.display_name||"")} · ${l(t.email||"")} · declared ${new Date(t.declared_at).toLocaleString()}</p>
    <div class="field"><label>Review reason</label><input class="creator-review-reason" maxlength="500" placeholder="Required reason for status change" /></div>
    <div class="row wrap">
      <button class="btn ghost creator-review-action" data-handle="${l(t.handle)}" data-role="${l(t.role)}" data-status="pending_review">Pending review</button>
      <button class="btn primary creator-review-action" data-handle="${l(t.handle)}" data-role="${l(t.role)}" data-status="approved">Approve</button>
      <button class="btn ghost creator-review-action" data-handle="${l(t.handle)}" data-role="${l(t.role)}" data-status="rejected">Reject</button>
    </div>
  </article>`).join(""):'<p class="muted">No role declarations match this filter.</p>'}function Fv(e){var a;if(!wr())return P("Creator Role Review",'<div class="card"><h3>Backend review unavailable</h3><p class="muted">The production PIKK API endpoint is not configured in this build.</p></div>');const t=Ao.includes(((a=e==null?void 0:e.query)==null?void 0:a.status)||"")&&e.query.status||"",s=Ao.map(i=>`<a class="chip${t===i?" on":""}" href="#/creator-review${i?"?status="+i:""}">${i||"All"}</a>`).join("");return P("Creator Role Review",`
    <section class="card"><p class="kicker">PIKK ADMIN · CREATOR TOOLS</p><h2>Review declared account roles</h2>
      <p class="muted">Requires a real backend Admin role. Approval here changes the account role review status only; payout eligibility, identity/tax checks and other provider approvals remain separate.</p>
      <div class="row wrap">${s}</div>
    </section>
    <section id="creatorReviewQueue" data-filter="${l(t)}"><div class="card muted">Loading creator role declarations…</div></section>
  `,{lead:"Admin-only creator role review queue"})}function Gv(e){const t=e.querySelector("#creatorReviewQueue");if(!t)return;const s=t.dataset.filter||"",a=async()=>{try{const i=await ca.listRoleReviews(s);t.innerHTML=jv(i.roles||[])}catch(i){t.innerHTML=(i==null?void 0:i.status)===403?'<div class="card muted">Your signed-in account does not have Admin permission to review creator roles.</div>':(i==null?void 0:i.status)===401?'<div class="card muted">Sign in with an Admin account from <a href="#/profile">Profile</a>.</div>':`<div class="card muted">Could not load role reviews: ${l((i==null?void 0:i.message)||"Unknown error")}</div>`}};t.addEventListener("click",async i=>{var d,c;const n=i.target.closest(".creator-review-action");if(!n)return;const o=n.closest(".creator-review-row"),r=((c=(d=o==null?void 0:o.querySelector(".creator-review-reason"))==null?void 0:d.value)==null?void 0:c.trim())||"";if(r.length<3)return f("Enter a review reason");n.disabled=!0;try{await ca.reviewRole({handle:n.dataset.handle,role:n.dataset.role,status:n.dataset.status,reason:r}),f("Role review saved"),await a()}catch(p){f((p==null?void 0:p.message)||"Could not save role review"),n.disabled=!1}}),a()}function Uv(){const t=`
    <div class="card merch-hero">
      <p class="kicker">Physical merch</p>
      <h2 style="margin:0 0 8px">Foreign X-Change</h2>
      <p class="muted">All orders, sizes, shipping, and payment happen on
        <a class="fx-link" href="https://foreignx-change.com" target="_blank" rel="noopener">foreignx-change.com</a>
        — not inside PIKK. Product links open the shop homepage until verified per-item URLs are provided.</p>
      <a class="btn primary" href="https://foreignx-change.com" target="_blank" rel="noopener">Visit Foreign X-Change</a>
      <p class="merch-note" style="margin-top:10px">Hats $30 · Tees $65 · Jackets $200 · prices exclude shipping</p>
    </div>
    <div class="merch-grid">${_e.map(s=>`
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
  `;return P("Merch",t,{lead:"Foreign X-Change showcase · 10 products · external checkout only"})}function Vv(e){e.querySelectorAll(".shop-link").forEach(r=>{r.addEventListener("click",()=>{f("TEST MODE — opening Foreign X-Change")})});const t=e.querySelector("#merchLightbox"),s=t==null?void 0:t.querySelector("img"),a=t==null?void 0:t.querySelector(".merch-lightbox-close");let i=null;const n=r=>{var d,c;!t||!s||!a||(i=r,s.src=((d=r.querySelector("img"))==null?void 0:d.currentSrc)||r.dataset.zoom,s.alt=((c=r.querySelector("img"))==null?void 0:c.alt)||"Product preview",t.classList.add("show"),t.setAttribute("aria-hidden","false"),a.focus())},o=()=>{t!=null&&t.classList.contains("show")&&(t.classList.remove("show"),t.setAttribute("aria-hidden","true"),s==null||s.removeAttribute("src"),i!=null&&i.isConnected&&i.focus(),i=null)};e.querySelectorAll(".img-wrap").forEach(r=>{const d=()=>n(r);r.addEventListener("click",d),r.addEventListener("keydown",c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),d())})}),t==null||t.addEventListener("click",o),t==null||t.addEventListener("keydown",r=>{r.key==="Escape"?(r.preventDefault(),o()):r.key==="Tab"&&(r.preventDefault(),a==null||a.focus())})}const Hv=Object.freeze(["female","male","nonbinary","undisclosed"]),Td=Object.freeze({female:"Female",male:"Male",nonbinary:"Non-binary",undisclosed:"Prefer not to say"}),To=()=>'<option value="">Choose…</option>'+Hv.map(e=>`<option value="${e}">${Td[e]}</option>`).join("");function ii(e,t=""){const s="#/profile/"+encodeURIComponent(String(e));return t==="public"?s+"?view=public":s}function Ge(e){K(e||"#/profile")}function Co(e){return e.avatar?`<img class="avatar" src="${l(e.avatar)}" alt="" style="object-fit:cover" />`:`<div class="avatar">${l((e.username||"?")[0].toUpperCase())}</div>`}function Ca(e,t){return t.length?`<div class="card"><h3>${l(e)}</h3>
    <ul class="list-plain">${t.map(s=>`<li><a href="${l(ii(s.id))}"><span>${l(s.username)}</span></a>
           <a class="chip" href="${l(ii(s.id))}">View</a></li>`).join("")}</ul></div>`:`<div class="card"><h3>${l(e)}</h3><p class="muted">None yet.</p></div>`}function zv(e){var g,v;const t=((g=e==null?void 0:e.parts)==null?void 0:g[1])||null,s=I(),a=ys()&&s.user&&s.user.authSource!=="backend"?null:s.user,{posts:i}=s,n=!!(t&&a&&t===a.id&&((v=e==null?void 0:e.query)==null?void 0:v.view)==="public");if(!!t&&(!a||t!==a.id)||n){const b=Jt(t);if(!b)return P("Profile",`<div class="card muted">User not found.</div>
         <a class="btn" href="#/profile">Back</a>`);const y=i.filter(A=>A.userId===b.id),k=a&&!n&&(a.following||[]).includes(b.id),S=_r(b.id),x=cn(b.id),w=`
      <section class="pikk-profile-cover" aria-label="Public PIKK profile">
        <div class="pikk-profile-cover-inner">
          <span class="pikk-profile-cover-kicker">PIKK · CREATOR PROFILE</span>
          ${Co(b)}
          <div>
            <h2 style="margin:0">${l(b.username)}${b.verified?" ✓":""}</h2>
            <p class="muted" style="margin:4px 0 0">${l(b.bio||"")}</p>
            ${b.verified?'<span class="chip">Verified</span>':""}
          </div>
        </div>
        <div class="stats pikk-profile-stats">
          <div><strong>${y.length}</strong><span>Posts</span></div>
          <div><strong>${(b.followers||[]).length}</strong><span>Followers</span></div>
          <div><strong>${(b.following||[]).length}</strong><span>Following</span></div>
        </div>
        <div class="row wrap pikk-profile-shortcuts">
          ${n?'<a class="btn primary" href="#/profile">Edit profile</a>':a?`<button class="btn ${k?"ghost":"primary"}" id="pubFollow" data-uid="${l(b.id)}" data-on="${k?"1":"0"}">${k?"Unfollow":"Follow"}</button>`:'<a class="btn primary" href="#/profile">Sign in to follow</a>'}
          <a class="btn ghost" href="#/posts">Posts feed</a>
          ${n?"":'<a class="btn ghost" href="#/profile">My profile</a>'}
        </div>
      </section>
      <div class="card">
        <h3>Posts</h3>
        ${y.length?y.map(A=>`<div style="padding:8px 0;border-bottom:1px solid var(--line)">
                      <div class="muted" style="font-size:11px">${new Date(A.at).toLocaleString()}</div>
                      ${l(A.text)}
                      ${A.image?`<img src="${l(A.image)}" alt="" style="margin-top:8px;border-radius:12px;max-height:200px;object-fit:cover;width:100%" />`:""}
                    </div>`).join(""):'<p class="muted">No posts yet.</p>'}
      </div>
      ${Ca("Followers",S)}
      ${Ca("Following",x)}
    `;return P(b.username,w)}if(!a)return P("Profile",`
      <section class="pikk-profile-guest-hero" aria-label="Join PIKK">
        <p class="kicker">PIKK · YOUR PROFILE</p>
        <h2>Your space. Your people. <span>One PIKK.</span></h2>
        <p>Create your PIKK account or sign in to follow creators, post, message and use account tools.</p>
        <span class="chip">${ys()?"Backend account service connected":"Account service configuration pending"}</span>
      </section>
      <div class="card">
        <p class="kicker">PIKK account</p>
        <h3>Create account</h3>
        <div class="field"><label>Display name</label><input id="signupDisplay" autocomplete="name" maxlength="60" /></div>
        <div class="field"><label>Username</label><input id="signupHandle" autocomplete="username" maxlength="30" placeholder="3–30 letters, numbers or _" /></div>
        <div class="field"><label>Email</label><input id="signupEmail" type="email" autocomplete="email" /></div>
        <div class="field"><label>Password</label><input id="signupPassword" type="password" autocomplete="new-password" minlength="10" placeholder="10+ chars · a letter + a number" /></div>
        <div class="field"><label for="signupGender">Gender</label><select id="signupGender" required>${To()}</select><small class="muted">Chosen once at signup and cannot be changed later.</small></div>
        <button class="btn primary block" id="signupAccountBtn">Create PIKK account</button>
      </div>
      <div class="card">
        <h3>Sign in</h3>
        <div class="field"><label>Email</label><input id="loginEmail" type="email" autocomplete="email" /></div>
        <div class="field"><label>Password</label><input id="loginPassword" type="password" autocomplete="current-password" /></div>
        <button class="btn primary block" id="loginAccountBtn">Sign in</button>
        <p class="muted" style="margin:10px 0 0">PIKK uses a secure server session cookie. Your password is not stored in browser-local profile state.</p>
      </div>
      <div class="card">
        <h3>Official profile</h3>
        <p class="muted" style="margin:0 0 8px">Music, Vault Coming Soon, Foreign X-Change — start here.</p>
        <a class="btn" href="#/profile/dbs">@DatBoiSkeet</a>
      </div>
      <div class="card">
        <h3>Become a Creator</h3>
        <p class="muted">After you sign in, apply for Clipper, Creator/Streamer, Brand, Affiliate, or Seller. Admin review unlocks tools — no automatic earnings access.</p>
        <div class="pikk-profile-creator-actions">
          <a class="btn" href="#/signup">Creator applications</a>
          <a class="btn" href="#/clippers">Clippers apply</a>
          <a class="btn ghost" href="#/guidelines">Guidelines</a>
          <a class="btn ghost" href="#/support" data-profile-support>Support</a>
        </div>
      </div>`,{lead:"Free PIKK fan profile · follow · posts · role apps · TEST MODE."});const r=i.filter(b=>b.userId===a.id),d=_r(a.id),c=cn(a.id),p=a.memberships||{};let m=`
    <section class="pikk-profile-cover" aria-label="Your PIKK profile">
      <div class="pikk-profile-cover-inner">
        <span class="pikk-profile-cover-kicker">PIKK · MY PROFILE</span>
        ${Co(a)}
        <div>
          <h2 style="margin:0">${l(a.username)}</h2>
          <p class="muted" style="margin:4px 0 0">${l(a.bio)}</p>
          <span class="chip">${a.authSource==="backend"?a.emailVerified?"Backend account · email verified":"Backend account · verification pending":"Legacy demo account"}</span>
          ${p.skeetPlus||p.backstage||p.innerCircle?`<span class="chip">${p.innerCircle?"Inner Circle":p.backstage?"Backstage":"PIKK+"}</span>`:""}
        </div>
      </div>
      <div class="stats pikk-profile-stats">
        <div><strong>${r.length}</strong><span>Posts</span></div>
        <div><strong>${(a.followers||[]).length}</strong><span>Followers</span></div>
        <div><strong>${(a.following||[]).length}</strong><span>Following</span></div>
      </div>
      <div class="row wrap pikk-profile-shortcuts">
        <a class="btn" href="#/posts">New post</a>
        <a class="btn" href="${l(ii(a.id,"public"))}">Public view</a>
        <a class="btn" href="#/profile-shop">Profile Shop</a>
        <a class="btn" href="#/messages">Messages</a>
        ${a.authSource==="backend"&&!a.emailVerified?'<button class="btn ghost" id="resendVerifyBtn">Resend verification email</button>':""}
        <button class="btn ghost" id="signoutBtn">Sign out</button>
      </div>
    </section>

    <div class="card" id="editCard">
      <h3>Edit profile</h3>
      <div class="field"><label>Bio</label>
        <textarea id="editBio" maxlength="280">${l(a.bio||"")}</textarea></div>
      <div class="field"><label>Avatar URL</label>
        <input id="editAvatar" placeholder="/brand/… or https://…" value="${l(a.avatar||"")}" /></div>
      <button class="btn primary" id="saveProfile">Save</button>
    </div>

    <div class="card">
      <h3>Your posts</h3>
      ${r.length?r.map(b=>`<div style="padding:8px 0;border-bottom:1px solid var(--line)">
                    <div class="muted" style="font-size:11px">${new Date(b.at).toLocaleString()}</div>
                    ${l(b.text)}
                  </div>`).join(""):'<p class="muted">No posts yet.</p>'}
    </div>

    ${Ca("Followers",d)}
    ${Ca("Following",c)}

    <div class="card">
      <h3>Roles &amp; membership</h3>
      <p class="muted" style="margin:0 0 8px">Clipper campaigns, Live creator tools, brand ads, or PIKK+ / Backstage / Inner Circle for Vault access.</p>
      <a class="btn block" href="#/clippers">Apply as Clipper <span class="badge-cs badge-cs-inline">Coming Soon</span></a>
      <a class="btn block" href="#/signup" style="margin-top:8px">Other creator roles</a>
      <a class="btn block" href="#/music" style="margin-top:8px">Music &amp; Vault membership</a>
    </div>

    ${ua()?`<div class="card">
      <h3>Demo Admin · DEV ONLY</h3>
      <p class="muted" style="font-size:12px">Sets <code>user.role='admin'</code> in localStorage <code>dbs_v1</code>. Dev builds without a backend only; real admin is staff-only.</p>
      <div class="row wrap" style="margin-top:8px">
        <span class="chip">${le()?"role=admin":"role=fan"}</span>
        <button class="btn ${le()?"ghost":"primary"}" id="toggleAdmin">${le()?"Revoke admin":"Enable Demo Admin"}</button>
        <a class="btn" href="#/admin">Open Admin</a>
      </div>
    </div>`:""}
  `;const h=`<div class="card" id="accountGenderCard">
      <h3>Account gender</h3>
      <p id="accountGenderValue"><span class="chip">Loading…</span></p>
      <p class="muted" style="font-size:12px">Chosen at signup and saved on the PIKK server. It cannot be changed. If it was entered by mistake, contact <a href="#/support">Support</a>.</p>
      <div id="accountGenderLegacy" hidden>
        <p class="muted" style="font-size:12px">Your account was created before gender was asked at signup. You can set it once; it locks immediately.</p>
        <div class="row wrap" style="gap:8px"><select id="accountGender" aria-label="Account gender">${To()}</select><button type="button" class="btn" id="saveAccountGender">Set once</button></div>
      </div></div>`;return m+=h,P("Profile",m)}function Wv(e){var t,s,a,i,n,o,r,d;if(gn(()=>Promise.resolve().then(()=>$n),void 0).then(async c=>{const p=e.querySelector("#accountGenderValue");if(p){if(!c.isVerificationApiConfigured()){p.innerHTML='<span class="chip">Account server not connected</span>';return}try{const m=await c.verificationApi.getGender();m!=null&&m.gender?p.innerHTML=`<span class="chip">${l(Td[m.gender]||m.gender)} · locked</span>`:(p.innerHTML='<span class="chip">Not set</span>',e.querySelector("#accountGenderLegacy").hidden=!1)}catch{p.innerHTML='<span class="chip">Sign in to see</span>'}}}),(t=e.querySelector("#saveAccountGender"))==null||t.addEventListener("click",async()=>{var p;const c=(p=e.querySelector("#accountGender"))==null?void 0:p.value;if(c&&confirm("Gender can only be set once and cannot be changed. Continue?"))try{await(await gn(()=>Promise.resolve().then(()=>$n),void 0)).verificationApi.setGender(c),f("Saved · locked"),Ge("#/profile")}catch(m){f((m==null?void 0:m.code)==="gender_locked"?"Gender is locked. Contact Support if it was entered by mistake.":(m==null?void 0:m.code)==="api_not_configured"?"Account server not connected yet":(m==null?void 0:m.message)||"Could not save")}}),ys()){const c=I().user;c&&c.authSource!=="backend"&&Ws(),(!c||c.authSource==="backend")&&at.me().then(p=>{p!=null&&p.user&&(ds(p.user),(!c||c.id!==p.user.id||!c.emailVerified==!p.user.email_verified)&&Ge("#/profile"))}).catch(p=>{if((p==null?void 0:p.status)===401&&(c==null?void 0:c.authSource)==="backend"){Ws(),Ge("#/profile");return}(p==null?void 0:p.status)!==401&&console.warn("PIKK auth session check failed",p)})}(s=e.querySelector("#signupAccountBtn"))==null||s.addEventListener("click",async()=>{var p,m,h,g,v,b,y,k,S;const c=((p=e.querySelector("#signupGender"))==null?void 0:p.value)||"";if(!c){f("Choose your gender. It cannot be changed later.");return}try{const x=await at.signup({gender:c,displayName:(h=(m=e.querySelector("#signupDisplay"))==null?void 0:m.value)==null?void 0:h.trim(),handle:(v=(g=e.querySelector("#signupHandle"))==null?void 0:g.value)==null?void 0:v.trim(),email:(y=(b=e.querySelector("#signupEmail"))==null?void 0:b.value)==null?void 0:y.trim(),password:((k=e.querySelector("#signupPassword"))==null?void 0:k.value)||""});ds(x.user),f((S=x.user)!=null&&S.email_verified?"Account created":"Account created · email verification pending"),Ge("#/profile")}catch(x){f((x==null?void 0:x.message)||"Could not create account")}}),(a=e.querySelector("#loginAccountBtn"))==null||a.addEventListener("click",async()=>{var c,p,m;try{await at.login({email:(p=(c=e.querySelector("#loginEmail"))==null?void 0:c.value)==null?void 0:p.trim(),password:((m=e.querySelector("#loginPassword"))==null?void 0:m.value)||""});const h=await at.me();ds(h.user),f("Signed in"),Ge("#/profile")}catch(h){f((h==null?void 0:h.message)||"Could not sign in")}}),(i=e.querySelector("#resendVerifyBtn"))==null||i.addEventListener("click",async()=>{var c;try{const p=await at.resendVerification(),m=(c=p==null?void 0:p.verification)==null?void 0:c.delivery;f(m==="email_sent"?"Verification email sent":m==="already_verified"?"Email is already verified":m==="email_provider_not_configured"?"Verification email service is not configured yet":m==="email_send_failed"?"Verification email could not be sent":"Verification request created")}catch(p){f((p==null?void 0:p.message)||"Could not resend verification email")}}),(n=e.querySelector("#signoutBtn"))==null||n.addEventListener("click",async()=>{try{await at.logout()}catch{}Ws(),f("Signed out"),Ge("#/profile")}),(o=e.querySelector("#saveProfile"))==null||o.addEventListener("click",async()=>{var g,v;const c=I().user,p=((g=e.querySelector("#editBio"))==null?void 0:g.value)||"",m=((v=e.querySelector("#editAvatar"))==null?void 0:v.value)||"";if((c==null?void 0:c.authSource)==="backend"&&ys()){try{const b=await ca.updateProfile({displayName:c.username||c.handle,bio:p,avatarUrl:m});ds(b.user),f("Profile saved to PIKK"),Ge("#/profile")}catch(b){f((b==null?void 0:b.message)||"Could not save profile")}return}if($p({bio:p,avatar:m}).error)return f("Sign in required");f("Profile saved locally"),Ge("#/profile")}),(r=e.querySelector("#pubFollow"))==null||r.addEventListener("click",c=>{const p=c.currentTarget,m=p.dataset.uid,h=p.dataset.on==="1";if((h?fi(m):hi(m)).error)return f("Sign in to follow");f(h?"Unfollowed":"Following"),Ge(ii(m))}),(d=e.querySelector("#toggleAdmin"))==null||d.addEventListener("click",()=>{const c=!le();if(gi(c).error)return f("Sign in required");f(c?"Demo Admin enabled":"Admin revoked"),Ge("#/profile")})}const Yv="".trim().replace(/\/$/,"");function Cd(){return((typeof window<"u"&&typeof window.__PIKK_API_BASE__=="string"?window.__PIKK_API_BASE__.trim():"")||Yv).replace(/\/$/,"")}function Jv(){return!!Cd()}const Qv=Object.freeze(["user","post","message","live","room","listing","dating_profile","roast"]),Sr=Object.freeze(["csam","ncii","self_harm","threat","underage","harassment","hate","sexual","violence","impersonation","fraud","copyright","spam","other"]),Xv="Saved on this device only (demo). Not sent to PIKK moderators.",Zv="Hidden on this device only (demo). This does not block them across PIKK.";async function Zi(e,{method:t="GET",body:s}={}){var o,r;const a=Cd();if(!a){const d=new Error("PIKK API is not configured");throw d.code="api_not_configured",d}const i=await fetch(a+e,{method:t,credentials:"include",headers:s===void 0?void 0:{"Content-Type":"application/json"},body:s===void 0?void 0:JSON.stringify(s)});let n=null;try{n=await i.json()}catch{}if(!i.ok){const d=new Error(((o=n==null?void 0:n.error)==null?void 0:o.message)||`Request failed (${i.status})`);throw d.code=((r=n==null?void 0:n.error)==null?void 0:r.code)||"request_failed",d.status=i.status,d}return n}function eb({targetType:e,targetId:t,category:s,details:a}={}){return Qv.includes(e)?!t||String(t).length>64?"invalid_target_id":Sr.includes(s)?a!=null&&String(a).length>2e3?"details_too_long":null:"invalid_category":"invalid_target_type"}const Po={report:({targetType:e,targetId:t,category:s,details:a})=>{const i=eb({targetType:e,targetId:t,category:s,details:a});if(i)return Promise.reject(Object.assign(new Error(i),{code:"validation_failed"}));const n={target_type:e,target_id:String(t),category:s};return a&&(n.details=String(a)),Zi("/reports",{method:"POST",body:n})},block:e=>Zi("/blocks",{method:"POST",body:{handle:String(e||"").replace(/^@/,"")}}),listReports:()=>Zi("/reports")};function Io(e){switch(e==null?void 0:e.code){case"duplicate_report":return"You already have an open report on this.";case"rate_limited":return"Too many reports right now. Try again later.";case"email_unverified":return"Verify your email before reporting or blocking.";case"unauthenticated":return"Sign in to report or block.";default:return(e==null?void 0:e.message)||"Something went wrong."}}const tb=/^[A-Za-z0-9_]{3,30}$/;function Ri(e){const t=String(e||"").trim().replace(/^@/,"");return tb.test(t)?t:""}function sb(e){var t;return!!Ri(e)&&Jv()&&((t=I().user)==null?void 0:t.authSource)==="backend"}const ab={csam:"Child sexual abuse material",ncii:"Non-consensual intimate imagery",self_harm:"Self-harm",threat:"Threat",underage:"Underage user",harassment:"Harassment",hate:"Hate",sexual:"Sexual content",violence:"Violence",impersonation:"Impersonation",fraud:"Fraud / scam",copyright:"Copyright",spam:"Spam",other:"Other"},Mo="Choose a report category first.";function $r(e="data-report-category"){return`<select ${e} class="pikk-safety-tap" aria-label="Report category" required><option value="" selected>Report reason…</option>${Sr.map(t=>`<option value="${t}">${ab[t]||t}</option>`).join("")}</select>`}function ib(e){return Sr.includes(e)}function Qs(e,t,{notify:s=f,details:a="Reported from Messages",category:i=""}={}){const n=Ri(t);if(e==="report"&&!ib(i))return s(Mo),Promise.resolve(Mo);if(!sb(n)){const r=e==="block"?"Blocked · "+Zv:"Reported · stub (Guidelines §13) · "+Xv;return s(r),Promise.resolve(r)}return(e==="block"?Po.block(n).then(()=>"Blocked across PIKK",r=>"Hidden here only — server block failed: "+Io(r)):Po.report({targetType:"user",targetId:n,category:i,details:a}).then(()=>"Report sent to PIKK moderators",r=>"Report not sent: "+Io(r))).then(r=>(s(r),r))}function nb(e,{selfHandle:t=""}={}){const s=Ri(e==null?void 0:e.handle);if(!s)return'<div class="card muted">User not found.</div>';const a=t&&t.toLowerCase()===s.toLowerCase();return`<section class="card pikk-server-user" data-server-user="${l(s)}">
    <h2 style="margin:0">${l(e.display_name||s)}</h2>
    <p class="muted" style="margin:4px 0">@${l(s)} <span class="chip">PIKK account</span></p>
    ${e.bio?`<p>${l(e.bio)}</p>`:""}
    ${a?"":`<div class="row wrap" style="gap:6px;margin-top:8px">
      <button type="button" class="btn primary" data-user-message="${l(s)}">Message</button>
      <button type="button" class="btn ghost pikk-safety-tap" data-user-flag="block" data-peer-handle="${l(s)}">Block</button>
      ${$r("data-report-category")}
      <button type="button" class="btn ghost danger pikk-safety-tap" data-user-flag="report" data-peer-handle="${l(s)}">Report</button>
    </div>`}
  </section>`}function rb(e){var s;const t=Ri((s=e==null?void 0:e.query)==null?void 0:s.h);return pr()?I().user?t?P("Profile",`<div id="serverUserHost" data-handle="${l(t)}"><div class="card muted">Loading @${l(t)}…</div></div>`):P("Profile",'<div class="card muted">User not found.</div>'):P("Profile",'<div class="card"><a class="btn primary" href="#/profile">Sign in to view PIKK profiles</a></div>'):P("Profile",'<div class="card muted">PIKK user profiles need the PIKK server, which is not connected in this build.</div>')}function ob(e){e.querySelectorAll("[data-user-flag]").forEach(t=>t.addEventListener("click",()=>{var s;return Qs(t.dataset.userFlag==="block"?"block":"report",t.dataset.peerHandle,{details:"Reported from profile",category:((s=e.querySelector("[data-report-category]"))==null?void 0:s.value)||""})})),e.querySelectorAll("[data-user-message]").forEach(t=>t.addEventListener("click",async()=>{try{const s=await kt.start(t.dataset.userMessage);K("#/messages?t="+encodeURIComponent(s.conversation.id))}catch(s){f((s==null?void 0:s.code)==="email_unverified"?"Verify your email before starting messages":(s==null?void 0:s.message)||"Could not start conversation")}}))}async function lb(e){var s;const t=e.querySelector("#serverUserHost");if(t)try{const a=await Ve.user(t.dataset.handle);t.innerHTML=nb(a.user,{selfHandle:((s=I().user)==null?void 0:s.handle)||""}),ob(t)}catch(a){t.innerHTML=(a==null?void 0:a.status)===404?'<div class="card muted">User not found.</div>':`<div class="card muted">Could not load profile: ${l((a==null?void 0:a.message)||"Unknown error")}</div>`}}function cb(e){var s;const t=((s=e==null?void 0:e.query)==null?void 0:s.token)||"";return t?ys()?P("Verify email",`<div class="card" id="verifyEmailCard" data-token="${l(t)}"><h3>Verify your PIKK email</h3><p class="muted" id="verifyEmailStatus">Checking your verification link…</p><a class="btn" href="#/profile">Back to Profile</a></div>`):P("Verify email",'<div class="card"><h3>Account service not connected</h3><p class="muted">PIKK cannot verify this link until the production API endpoint is configured.</p><a class="btn" href="#/profile">Back to Profile</a></div>'):P("Verify email",'<div class="card"><h3>Verification link missing</h3><p class="muted">This verification link does not contain a token. Request a new verification email once email delivery is enabled.</p><a class="btn" href="#/profile">Back to Profile</a></div>')}function db(e){const t=e.querySelector("#verifyEmailCard");if(!t)return;const s=e.querySelector("#verifyEmailStatus"),a=t.dataset.token||"";at.verifyEmail(a).then(async()=>{try{const i=await at.me();i!=null&&i.user&&ds(i.user)}catch{}s&&(s.textContent="Email verified. Your PIKK account is ready.")}).catch(i=>{s&&(s.textContent=(i==null?void 0:i.message)||"This verification link is invalid or expired.")})}function Lo(){K("#/clippers")}const pb={pending:"Pending",approved:"Approved",rejected:"Rejected",waitlisted:"Waitlisted"};function ub(){const{clipperApps:e,user:t}=I(),s=e.length,a=e.filter(o=>o.status==="approved").length,i=e.filter(o=>o.status==="pending").length,n=`
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
                <span class="chip">${l(pb[o.status]||o.status)}</span>
                <span class="muted spacer" style="text-align:right">${j(o.at)}</span>
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
  `;return P("Clippers",n,{lead:"Apply → admin approve → paid campaigns & tracked links."})}function mb(e){var t;(t=e.querySelector("#cSubmit"))==null||t.addEventListener("click",()=>{var i,n,o,r,d,c,p,m,h,g,v,b,y,k,S,x,w,A,M;const s=(n=(i=e.querySelector("#cName"))==null?void 0:i.value)==null?void 0:n.trim(),a=(r=(o=e.querySelector("#cEmail"))==null?void 0:o.value)==null?void 0:r.trim();if(!s||!a)return f("Name and email required");Tp({name:s,email:a,age:(d=e.querySelector("#cAge"))==null?void 0:d.value,tiktok:(c=e.querySelector("#cTiktok"))==null?void 0:c.value,instagram:(p=e.querySelector("#cIg"))==null?void 0:p.value,youtube:(m=e.querySelector("#cYt"))==null?void 0:m.value,x:(h=e.querySelector("#cX"))==null?void 0:h.value,facebook:(g=e.querySelector("#cFb"))==null?void 0:g.value,followers:(v=e.querySelector("#cFollowers"))==null?void 0:v.value,views:(b=e.querySelector("#cViews"))==null?void 0:b.value,avgViews:(y=e.querySelector("#cAvgViews"))==null?void 0:y.value,engagement:(k=e.querySelector("#cEngage"))==null?void 0:k.value,frequency:(S=e.querySelector("#cFreq"))==null?void 0:S.value,niche:(x=e.querySelector("#cNiche"))==null?void 0:x.value,samples:(w=e.querySelector("#cSamples"))==null?void 0:w.value,analyticsNotes:(A=e.querySelector("#cAnalytics"))==null?void 0:A.value,applicantUserId:((M=I().user)==null?void 0:M.id)||null}),f("Application saved for admin review"),Lo()}),e.querySelectorAll(".clip-status").forEach(s=>{s.addEventListener("click",()=>{hl(s.dataset.id,s.dataset.status),f("Marked "+s.dataset.status),Lo()})})}const hb={rose:"🌹","big-love":"💖","turn-up":"🔥","cash-rain":"💵","bottle-pop":"🍾","money-gun":"💸","diamond-drip":"💎","foreign-whip":"🚗",helicopter:"🚁","private-jet":"✈️","dbs-crown":"👑","dbs-universe":"🌌","battle-win":"✅","battle-crown":"👑","battle-vs":"⚔️","battle-fire":"🔥"},fb={rose:"/gifts/rose.svg","big-love":"/gifts/big-love.svg","turn-up":"/gifts/turn-up.svg","cash-rain":"/gifts/cash-rain.svg","bottle-pop":"/gifts/bottle-pop.svg","money-gun":"/gifts/money-gun.svg","diamond-drip":"/gifts/diamond-drip.svg","foreign-whip":"/gifts/foreign-whip.svg",helicopter:"/gifts/helicopter.svg","private-jet":"/gifts/private-jet.svg","dbs-crown":"/gifts/dbs-crown.svg","dbs-universe":"/gifts/dbs-universe.svg","battle-win":"/gifts/battle-win.svg","battle-crown":"/gifts/battle-crown.svg","battle-vs":"/gifts/battle-vs.svg","battle-fire":"/gifts/battle-fire.svg"},Do="gift-sticker";function Pa(e){return String(e??"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function gb(e,t){return t&&typeof t=="object"&&t.className?t.className:`${Do} ${Do}--${e}`}function da(e,t={}){const s=String(e||""),a=gb(s||"unknown",t),i=hb[s]||"🎁",n=fb[s]||null;return n?{src:n,className:a,emoji:i,html:`<img class="${Pa(a)}" src="${Pa(n)}" alt="" width="48" height="48" decoding="async" draggable="false" data-gift-slug="${Pa(s)}" />`}:{src:null,className:a,emoji:i,html:`<span class="${Pa(a)} gift-sticker--emoji" aria-hidden="true">${i}</span>`}}function Ct(e,t){return da(e,t&&typeof t=="object"&&typeof t!="function"?t:{}).html}const Er=Object.freeze([{id:"women",title:"Women's Rooms",icon:"💗",description:"Conversations, style, wellness, business and community",names:["Ladies Lounge","Girl Talk","Tea Time","What's the Word?","Who Did What?","Beauty Bar","Girls' Night In","Love & Standards","Boss Ladies","Fashion & Fits","Ladies Only Live","Women in Business","Women's Mental Wellness","Dating From Her Side","The Hustle Room: Women"]},{id:"men",title:"Men's Rooms",icon:"🫱🏻‍🫲🏿",description:"Brotherhood, relationships, business, wellness and hobbies",names:["The Man Cave","The Barbershop","Fellas' Night","Men's Corner","Men in Business","Cars & Motors","Fitness & Brotherhood","Fatherhood","Men's Mental Wellness","Dating From His Side","Sports Debate","Gaming Brotherhood","Men's Style","The Hustle Room","Brotherhood & Mentorship"]},{id:"coed",title:"Coed Communities",icon:"🌐",description:"Shared conversations, learning and networking for everyone",names:["Let's Talk","The Hangout","Business Connect & Wealth Academy","Couples Corner","Conspiracy Room","Game Room","Why Are You Single?","What Are You Looking For?","Single & Ready to Mingle","City Connect"]},{id:"dating",title:"Singles & Dating",icon:"💘",description:"Opt-in conversations, introductions and relationship topics",names:["Looking for My Match","The Flirt Zone","Speed Connections","Poly Connections","Date Night Live","Love & Advice"]},{id:"sports",title:"Sports",icon:"🏆",description:"A separate place for every major sport",names:["Sports Central","Basketball","Football","Soccer","Baseball","Hockey"]},{id:"talent",title:"Music & Talent",icon:"🎙️",description:"Rappers, singers, bands, producers and city competitions",names:["The Booth","Producer Room","The Stage","City Takeover"]},{id:"news",title:"News & Innovation",icon:"📰",description:"World events, markets and new ideas",names:["World News","Economy & Markets","Startups & Innovation","Tech Talk","Money Talk"]},{id:"general",title:"General Live",icon:"📡",description:"IRL, gaming, shows, comedy, food, fitness and more",names:["Just Chatting","Gaming","Music","IRL","Sports","Creative","Podcasts & Talk Shows","Food & Cooking","Fitness","Beauty & Fashion","Business & Money Talk","Dating & Connections","Education","News & Commentary","Comedy & Entertainment","Comedy & Roast Battles","Creator Spotlight"]}]);function vb(e,t=""){if(e!=="channels")return"#/live?tab="+encodeURIComponent(e);const s=String(t||"").trim();return s?"#/live?tab=channels&category="+encodeURIComponent(s):"#/live"}function bb(e,t){const s=new Map(e.map(d=>[d[0],d])),a=new Set,i=([d,c,p])=>{const m=d==="Comedy & Roast Battles",h=m?"#/roast-arena":"#/live?tab=channels&category="+encodeURIComponent(d),g=m?"Preview Roast Arena":"Browse channels",v=m?"preview Roast Arena (coming soon)":"browse channels";return'<a class="live-cat-card pikk-live-room-card" href="'+h+'" aria-label="'+t(d)+": "+v+'"><span class="pikk-live-room-emoji" aria-hidden="true">'+t(p)+"</span><strong>"+t(d)+'</strong><p class="muted">'+t(c)+'</p><span class="pikk-live-room-action">'+g+' <span aria-hidden="true">›</span></span></a>'},n=[...Er].sort((d,c)=>+(c.id==="general")-+(d.id==="general")).map(d=>{const c=d.names.map(p=>s.get(p)).filter(Boolean);return c.forEach(p=>a.add(p[0])),'<details class="pikk-live-directory-group" id="pikk-live-group-'+d.id+'"'+(d.id==="coed"||d.id==="general"?" open":"")+'><summary class="pikk-live-directory-summary"><span class="pikk-live-directory-icon" aria-hidden="true">'+d.icon+'</span><span class="pikk-live-directory-label"><strong>'+t(d.title)+"</strong><small>"+t(d.description)+'</small></span><span class="pikk-live-directory-count">'+c.length+' topics</span><span class="pikk-live-directory-chevron" aria-hidden="true">⌄</span></summary><div class="live-cat-cards pikk-live-directory-cards">'+c.map(i).join("")+"</div></details>"}),o=e.filter(d=>!a.has(d[0]));return o.length&&n.push('<details class="pikk-live-directory-group" open><summary class="pikk-live-directory-summary"><span class="pikk-live-directory-icon" aria-hidden="true">✨</span><span class="pikk-live-directory-label"><strong>More Live</strong><small>Additional topics</small></span><span class="pikk-live-directory-count">'+o.length+' topics</span><span class="pikk-live-directory-chevron" aria-hidden="true">⌄</span></summary><div class="live-cat-cards pikk-live-directory-cards">'+o.map(i).join("")+"</div></details>"),'<div class="pikk-live-directory" role="region" aria-label="Live category groups">'+('<div class="card pikk-live-room-search" style="margin-bottom:4px"><label for="liveRoomSearch"><strong>Find a Live topic</strong></label><div class="row wrap" style="gap:8px;margin-top:8px"><input id="liveRoomSearch" type="search" autocomplete="off" placeholder="Search '+e.length+' topics" aria-describedby="liveRoomSearchStatus" style="width:auto;flex:1 1 220px;min-width:0"><button type="button" id="liveRoomSearchClear" class="btn ghost" hidden style="display:none">Clear</button></div><p class="muted small" id="liveRoomSearchStatus" role="status" aria-live="polite">Browse '+e.length+" topics · these filter channels, not hosted rooms.</p></div>")+n.join("")+"</div>"}function yb(e,t){return String(e).toLocaleLowerCase().includes(String(t).trim().toLocaleLowerCase())}function kb(e){const t=e.querySelector("#liveRoomSearch"),s=e.querySelector("#liveRoomSearchClear"),a=e.querySelector("#liveRoomSearchStatus"),i=[...e.querySelectorAll(".pikk-live-directory-group")];if(!t||!s||!a||!i.length)return;let n=null;const o=()=>{const d=t.value.trim();d&&n===null&&(n=i.map(p=>p.open));let c=0;for(const p of i){let m=0;p.querySelectorAll(".pikk-live-room-card").forEach(g=>{var k,S;const v=((k=g.querySelector("strong"))==null?void 0:k.textContent)||"",b=((S=g.querySelector("p"))==null?void 0:S.textContent)||"",y=yb(v+" "+b,d);g.style.display=y?"":"none",y&&m++}),p.style.display=!d||m?"":"none";const h=p.querySelector(".pikk-live-directory-count");if(h){const g=p.querySelectorAll(".pikk-live-room-card").length;h.textContent=d?m+" of "+g+" topics":g+" topics"}d&&m&&(p.open=!0),c+=m}!d&&n!==null&&(i.forEach((p,m)=>{p.open=n[m]}),n=null),s.hidden=!d,s.style.display=d?"":"none",a.textContent=d?c+" matching topic"+(c===1?"":"s")+" · channel discovery only.":"Browse "+c+" topics · these filter channels, not hosted rooms."},r=()=>{t.value="",o(),t.focus()};t.addEventListener("input",o),t.addEventListener("keydown",d=>{d.key==="Escape"&&t.value&&(d.preventDefault(),r())}),s.addEventListener("click",r),o()}const wb=3e4,Sb=6e4,$b=Object.freeze([["rose",1],["turn-up",5],["diamond-drip",10]]),En="Demo viewer (placeholder)";function Eb({gifter:e,giftPts:t=1,now:s=Date.now()}){return{status:"open",gifter:String(e),giftPts:t,openedAt:s,expiresAt:s+wb,challenger:null}}function xb(e,t=Date.now()){return!!e&&e.status==="open"&&t<e.expiresAt}function Ab(e,t,s=Date.now()){return e?e.status!=="open"?{ok:!1,reason:"taken",window:e}:s>=e.expiresAt?{ok:!1,reason:"expired",window:{...e,status:"expired"}}:String(t)===e.gifter?{ok:!1,reason:"self",window:e}:{ok:!0,window:{...e,status:"accepted",challenger:String(t)},battle:Tb(e.gifter,t,s,e.giftPts)}:{ok:!1,reason:"none"}}function Tb(e,t,s=Date.now(),a=0){return{a:{name:String(e),total:a},b:{name:String(t),total:0},startedAt:s,endsAt:s+Sb}}function Pd(e,t=Date.now()){return Math.max(0,e.endsAt-t)}function ni(e,t=Date.now()){return Pd(e,t)===0}function Cb(e,t,s,a=Date.now()){return ni(e,a)||!["a","b"].includes(t)||!(s>0)?e:{...e,[t]:{...e[t],total:e[t].total+s}}}function Id(e){if(e.a.total===e.b.total)return{result:"tie",name:null};const t=e.a.total>e.b.total?e.a:e.b;return{result:e.a.total>e.b.total?"a":"b",name:t.name}}const Pb=24*36e5,Ib=24*36e5,Md=10,_o=()=>({results:[]});function Mb(e,t,s=Date.now()){const a=Id(t),i={a:t.a.name,b:t.b.name,aTotal:t.a.total,bTotal:t.b.total,winner:a.name,at:s};return{results:[...(e==null?void 0:e.results)||[],i].slice(-500)}}function Ni(e,t,s=Date.now()){return((e==null?void 0:e.results)||[]).some(a=>a.winner===t&&s-a.at<Pb&&s>=a.at)}function Lb(e,t){let s=0,a=0,i=0;for(const n of(e==null?void 0:e.results)||[])n.a!==t&&n.b!==t||(n.winner?n.winner===t?s++:a++:i++);return{w:s,l:a,t:i}}const Oo=e=>Math.floor(e/Ib);function Ld(e,t=Date.now()){const s=Oo(t),a=new Map;for(const i of(e==null?void 0:e.results)||[]){if(!i.winner||Oo(i.at)!==s)continue;const n=i.winner===i.a?i.aTotal:i.bTotal,o=a.get(i.winner)||{name:i.winner,gifts:0,wins:0};o.gifts+=n,o.wins+=1,a.set(i.winner,o)}return[...a.values()].sort((i,n)=>n.gifts-i.gifts||n.wins-i.wins||i.name.localeCompare(n.name)).map((i,n)=>({rank:n+1,...i}))}const Db=(e,t=Date.now())=>Ld(e,t).slice(0,Md);function _b(e){const t=e-1;return{col:Math.floor(t/2)+1,row:t%2+1}}const Dd="pikk_gb_records_v1";function Is(){try{return JSON.parse(localStorage.getItem(Dd))||_o()}catch{return _o()}}function Ob(e){try{localStorage.setItem(Dd,JSON.stringify(e))}catch{}}const Ce=e=>String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function Bi(e,t=Is(),s=Date.now()){const a=Ni(t,e,s)?' <span class="pikk-gb-badge" title="Battle Winner · 24h · TEST MODE">🏆 Battle Winner</span>':"";return`<button type="button" class="pikk-gb-name" data-gb-name="${Ce(e)}">${Ce(e)}</button>${a}`}function _d(e){return`<div class="pikk-gb-strip" data-gb-strip="${Ce(e)}" hidden></div>`}function qb(e,t){const s=Db(e,t);if(!s.length)return"";const a=s.map(n=>{const o=_b(n.rank);return`<button type="button" class="pikk-gb-wchip" data-gb-open-list style="grid-column:${o.col};grid-row:${o.row}" aria-label="#${n.rank} ${Ce(n.name)} ${n.gifts} gifts"><b>#${n.rank}</b> ${Ce(n.name)}${Ni(e,n.name,t)?" 🏆":""} <small>${n.gifts}</small></button>`}).join(""),i=Ld(e,t).map(n=>`<li><b>#${n.rank}</b> ${Bi(n.name,e,t)} · ${n.gifts} gifts (${n.wins} win${n.wins===1?"":"s"})</li>`).join("");return`<div class="pikk-gb-strip-grid" role="list" aria-label="Today's Battle Winners · top ${Md}">${a}</div>
    <details class="pikk-gb-list"><summary>Today's Battle Winners · full list · TEST MODE (resets every 24h)</summary><ol class="list-plain">${i}</ol></details>`}function qo(e){const t=Is(),s=Date.now();e.querySelectorAll("[data-gb-strip]").forEach(a=>{const i=qb(t,s);a.innerHTML=i,a.hidden=!i})}function Rb(e,t){e._gbNames||(e._gbNames=!0,e.addEventListener("click",s=>{var i;const a=s.target.closest("[data-gb-name]");if(a){const n=Lb(Is(),a.dataset.gbName);t(`${a.dataset.gbName} · Battle record ${n.w}-${n.l}${n.t?`-${n.t}`:""} (W-L${n.t?"-T":""}) · TEST MODE`);return}if(s.target.closest("[data-gb-open-list]")){const n=(i=s.target.closest("[data-gb-strip]"))==null?void 0:i.querySelector("details");n&&(n.open=!0)}}))}const Od=e=>{const t=Math.ceil(e/1e3);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`};function qd(e){return`<div class="pikk-gb-controls row wrap" data-gb-controls="${Ce(e)}" style="gap:6px">
    <button type="button" class="chip pikk-chip" data-gb-giftall="me">🎁 Send gift for all viewers · demo</button>
    <button type="button" class="chip pikk-chip" data-gb-giftall="demo">Demo: placeholder sends gift for all</button>
  </div>
  <div class="pikk-gb" data-gb-slot="${Ce(e)}" hidden aria-live="polite"></div>`}function Nb(e,t,s){const a=e.gifter===t;return`<div class="pikk-gb-tab" role="status">
    <span>🎁 <strong>${Ce(e.gifter)}</strong> sent a gift for all viewers</span>
    <button type="button" class="chip pikk-chip on" data-gb-accept>⚔️ Challenge to Gift Battle${a?` <small>(as ${Ce(En)})</small>`:""}</button>
    <span class="pikk-gb-timer">${Od(e.expiresAt-s)}</span>
    <small class="muted">${a?"Shown to other viewers for 30s · demo: tap to accept for the placeholder":"First tap wins · 30s"} · TEST MODE</small></div>`}function Ro(e,t,s){const a=e.a.total+e.b.total,i=a?Math.round(e.a.total/a*100):50,n=ni(e,s),o=c=>Bi(e[c].name),r=c=>$b.map(([p,m])=>`<button type="button" class="chip pikk-chip pikk-gb-gift" data-gb-side="${c}" data-gb-pts="${m}" aria-label="Gift +${m} for ${Ce(e[c].name)} · TEST MODE">${da(p,{className:"gift-sticker gift-sticker--sm"}).html}<small>+${m}</small></button>`).join(""),d=n?Id(e):null;return`<div class="pikk-gb-head"><strong>⚔️ Gift Battle</strong> <span class="chip">TEST MODE · demo gifts · no charges</span><span class="pikk-gb-timer" data-gb-timer>${n?"Ended":Od(Pd(e,s))}</span></div>
    <div class="pikk-gb-bar" role="img" aria-label="${Ce(e.a.name)} ${e.a.total} vs ${Ce(e.b.name)} ${e.b.total}">
      <div class="pikk-gb-a" style="width:${i}%"><span>${o("a")} · ${e.a.total}</span></div>
      <div class="pikk-gb-b" style="width:${100-i}%"><span>${e.b.total} · ${o("b")}</span></div></div>
    ${n?`<p class="pikk-gb-winner" role="status">${da("battle-win",{className:"gift-sticker gift-sticker--sm"}).html} <strong>${d.result==="tie"?"Tie":`${Ce(d.name)} wins`}</strong> · ${e.a.total}–${e.b.total} · TEST MODE</p><button type="button" class="chip pikk-chip" data-gb-close>Close</button>`:`<div class="pikk-gb-gifts"><div>${r("a")}</div><div>${r("b")}</div></div><small class="muted">Totals change only by taps on this device · the placeholder side moves only when you tap it.</small>`}`}function Bb(e,{me:t="You",toast:s=()=>{}}={}){Rb(e,s),qo(e),e.querySelectorAll("[data-gb-slot]").forEach(a=>{const i=e.querySelector(`[data-gb-controls="${a.dataset.gbSlot}"]`);if(!i)return;const n={w:null,b:null,t:null},o=()=>{const d=Date.now();if(n.b)a.innerHTML=Ro(n.b,t,d);else if(xb(n.w,d))a.innerHTML=Nb(n.w,t,d);else{a.hidden=!0,a.innerHTML="",clearInterval(n.t);return}a.hidden=!1,n.b&&ni(n.b,d)&&(clearInterval(n.t),n.b.recorded||(n.b={...n.b,recorded:!0},Ob(Mb(Is(),n.b,d)),qo(e),a.innerHTML=Ro(n.b,t,d)))},r=()=>{clearInterval(n.t),n.t=setInterval(()=>document.body.contains(a)?o():clearInterval(n.t),1e3)};i.addEventListener("click",d=>{const c=d.target.closest("[data-gb-giftall]");if(c){if(n.b&&!ni(n.b))return s("A Gift Battle is already running");n.b=null,n.w=Eb({gifter:c.dataset.gbGiftall==="me"?t:En}),o(),r()}}),a.addEventListener("click",d=>{var p;if(d.target.closest("[data-gb-accept]")){const m=((p=n.w)==null?void 0:p.gifter)===t?En:t,h=Ab(n.w,m);if(n.w=h.window||n.w,!h.ok)return s(h.reason==="expired"?"Challenge expired":"Someone already accepted");n.b=h.battle,o(),r();return}const c=d.target.closest("[data-gb-side]");if(c&&n.b){n.b=Cb(n.b,c.dataset.gbSide,Number(c.dataset.gbPts)),o();return}d.target.closest("[data-gb-close]")&&(n.b=null,n.w=null,o())})})}function No(){return`
    <div class="card pikk-gb-explainer" id="gbExplainer">
      <h3 style="margin:0 0 6px">Gift Battles happen inside Live &amp; Group Rooms</h3>
      <ol class="gb-rules-list">
        <li>A viewer sends a gift <strong>for all viewers</strong>.</li>
        <li>Everyone else sees a <strong>Challenge to Gift Battle</strong> tab for <strong>30 seconds</strong>.</li>
        <li>The <strong>first</strong> viewer to tap it starts a <strong>60-second</strong> battle: the original gifter vs the challenger.</li>
        <li>Both send gifts — whoever sends more total wins. The compact battle bar never blocks the video, chat or reactions.</li>
      </ol>
      <p class="muted small">Gifts are voluntary support — not wagers, no prizes. TEST MODE: demo gifts only, no charges; totals count only taps on this device. Roast Battles are separate (Roast Arena).</p>
      <div class="row wrap" style="gap:8px;margin-top:10px">
        <a class="btn primary" href="#/live?tab=channels">Open Live</a>
        <a class="chip pikk-chip" href="#/live?tab=rooms">Group Rooms</a>
        <a class="chip pikk-chip" href="#/roast-arena">Roast Arena (separate)</a>
      </div>
    </div>`}const xn=Er.find(e=>e.id==="general").names,Bo=Er.filter(e=>e.id!=="general"),Kb=Object.freeze(["Video","Voice","Text"]),jb=Object.freeze([[2,"2 min"],[5,"5 min"],[15,"15 min"],[30,"30 min"],[60,"1 hour"],[120,"2 hours"]]),Fb=Object.freeze(["🔥","❤️","😂","👏","💯"]),At=e=>String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function Gb(){const e=xn.map(t=>`<button type="button" class="chip pikk-chip pikk-golive-cat" role="radio" aria-checked="false" aria-pressed="false" data-golive-cat="${At(t)}">${At(t)}</button>`).join("");return`
      <fieldset class="field pikk-golive-cats" id="liveCategoryPick">
        <legend>Category <span class="muted">(pick exactly one · ${xn.length} General Live)</span></legend>
        <div class="row wrap" role="radiogroup" aria-label="Go Live category" style="gap:6px">${e}</div>
        <input type="hidden" id="liveCategory" value="" />
      </fieldset>
      <fieldset class="field pikk-golive-perms" id="livePermissions">
        <legend>Permissions</legend>
        <label>Who can chat <select id="livePermChat"><option value="everyone">Everyone</option><option value="followers">Followers</option><option value="subscribers">Subscribers</option><option value="off">Chat off</option></select></label>
        <label>Guest requests <select id="livePermGuests"><option value="approve">Request · host approves</option><option value="off">Off</option></select></label>
        <label class="row" style="gap:6px"><input type="checkbox" id="livePermGifts" checked /> Allow gifts &amp; donations (demo coins)</label>
        <label class="row" style="gap:6px"><input type="checkbox" id="livePermReplay" /> Save replay (Coming soon)</label>
      </fieldset>`}function Ub(e){const t=e.querySelector("#liveCategory");e.querySelectorAll(".pikk-golive-cat").forEach(s=>s.addEventListener("click",()=>{e.querySelectorAll(".pikk-golive-cat").forEach(a=>{const i=a===s;a.classList.toggle("on",i),a.setAttribute("aria-pressed",String(i)),a.setAttribute("aria-checked",String(i))}),t&&(t.value=s.dataset.goliveCat)}))}function Vb(e){var s,a,i,n,o;const t=((s=e.querySelector("#liveCategory"))==null?void 0:s.value)||"";return{category:xn.includes(t)?t:"",permissions:{chat:((a=e.querySelector("#livePermChat"))==null?void 0:a.value)||"everyone",guests:((i=e.querySelector("#livePermGuests"))==null?void 0:i.value)||"approve",gifts:!!((n=e.querySelector("#livePermGifts"))!=null&&n.checked),replay:!!((o=e.querySelector("#livePermReplay"))!=null&&o.checked)}}}function Hb({user:e,goalHtml:t=""}={}){const s=Bo.map(o=>`<optgroup label="${At(o.title)} (${o.names.length})">${o.names.map(r=>`<option value="${At(r)}">${At(r)}</option>`).join("")}</optgroup>`).join(""),a=Kb.map((o,r)=>`<button type="button" class="chip pikk-chip pikk-room-mode${r?"":" on"}" aria-pressed="${r?"false":"true"}" data-room-mode="${o}">${o}</button>`).join(""),i=Fb.map(o=>`<button type="button" class="chip pikk-chip pikk-room-react" data-react="${o}" aria-label="React ${o}">${o}</button>`).join(""),n=jb.map(([o,r])=>`<option value="${o}">${r}</option>`).join("");return`
    <div class="card live-disc-panel pikk-rooms" id="liveTabRooms" data-panel="rooms" data-test-mode>
      <div class="pikk-rooms-head"><h3 style="margin:0">Group Rooms</h3><span class="chip">TEST MODE</span></div>
      <p class="muted small">Pick a topic, then start a Video, Voice or Text session. Demo shell only — no camera or microphone is used and no real people join.</p>
      <div id="roomSetup">
        <label class="field">Topic (${Bo.reduce((o,r)=>o+r.names.length,0)} rooms)
          <select id="roomTopic"><option value="">Choose a topic…</option>${s}</select></label>
        <div class="row wrap" role="group" aria-label="Session type" style="gap:6px;margin:8px 0">${a}</div>
        <button type="button" class="btn primary" id="roomStart">${e?"Start session":"Start demo session"}</button>
      </div>
      <section class="pikk-room-shell" id="roomShell" hidden aria-label="Group room (demo)">
        <div class="pikk-room-bar">
          <strong id="roomTitle">Room</strong> <span class="chip" id="roomModeChip">Video</span> <span class="chip">TEST MODE</span>
          <label class="row" style="gap:4px;margin-left:auto">View as <select id="roomRole"><option value="host">Host</option><option value="member">Member</option></select></label>
        </div>
        <div class="pikk-room-voice" id="roomVoice" hidden aria-label="Voice seats (demo)">
          <div class="pikk-room-avatar"><span aria-hidden="true">●</span><small>You · 🎙️ mic off (demo)</small></div>
          <div class="pikk-room-avatar"><span aria-hidden="true">○</span><small>Open seat · 🔇 placeholder, not a real user</small></div>
        </div>
        <div class="pikk-room-stage" id="roomStage">
          <div class="pikk-room-seat" data-seat="you"><span aria-hidden="true">◉</span><small>You · camera &amp; mic off (demo)</small></div>
          <div class="pikk-room-seat" data-seat="guest"><span aria-hidden="true">?</span><small>Open seat · placeholder, not a real user</small></div>
        </div>
        <div class="pikk-room-pinned" id="roomPinned" hidden role="status"></div>
        ${qd("room")}
        <p class="pikk-room-activity muted small" id="roomActivity" aria-live="polite">Demo-only activity (this device): 1 participant (you) · 0 messages · 0 reactions · 0 hand raises</p>
        <div class="row wrap" style="gap:6px">${i}
          <button type="button" class="chip pikk-chip" id="roomRaiseHand" aria-pressed="false">✋ Raise hand / Request to speak</button></div>
        <div class="pikk-room-host" id="roomHostTools">
          <h4 style="margin:10px 0 6px">Host tools</h4>
          <ul class="list-plain" id="roomQueue"><li class="muted small">No speaker requests yet.</li></ul>
          <div class="row wrap" style="gap:6px">
            <button type="button" class="chip pikk-chip" id="roomOpenMics" aria-pressed="false">Open microphones</button>
            <button type="button" class="chip pikk-chip" data-host-act="cohost">Make co-host</button>
            <button type="button" class="chip pikk-chip" data-host-act="mute">Mute</button>
            <button type="button" class="chip pikk-chip" data-host-act="remove">Remove</button>
            <button type="button" class="chip pikk-chip" data-host-act="block">Block / Report</button>
          </div>
          <div class="pikk-room-pin-tools row wrap" style="gap:6px;margin-top:8px">
            <input id="roomPinText" maxlength="120" placeholder="Thank a supporter (pinned acknowledgement)" style="flex:1 1 180px" />
            <select id="roomPinMins" aria-label="Pin duration">${n}</select>
            <button type="button" class="chip pikk-chip" id="roomPinBtn">Pin thank-you</button>
          </div>
        </div>
        ${t}
        ${_d("room")}
        <div class="pikk-room-chat"><ul class="list-plain" id="roomChat" aria-label="Room chat"></ul>
          <form id="roomChatForm" class="row" style="gap:6px"><input id="roomChatInput" maxlength="200" placeholder="Message the room" style="flex:1" aria-label="Chat message" /><button class="btn" type="submit">Send</button></form></div>
        <button type="button" class="btn ghost" id="roomLeave">Leave Room</button>
        <p class="muted small">Safety: be respectful; Block / Report ends contact immediately. Real rooms launch only with moderation and age checks.</p>
      </section>
    </div>`}function zb(e,{toast:t=()=>{},me:s=""}={}){const a=e.querySelector("#liveTabRooms");if(!a)return;const i=c=>a.querySelector(c),n={mode:"Video",msgs:0,reacts:0,hands:0,queue:[],open:!1,pinTimer:null},o=()=>{i("#roomActivity").textContent=`Demo-only activity (this device): 1 participant (you) · ${n.msgs} messages · ${n.reacts} reactions · ${n.hands} hand raises`},r=(c,p)=>{const m=document.createElement("li"),h=c==="You"?s||"You":c;c!=="System"&&Ni(Is(),h)&&(m.className="pikk-gb-hl"),m.innerHTML=`<strong>${c==="System"?"System":Bi(h)}:</strong> ${At(p)}`,i("#roomChat").appendChild(m)},d=()=>{i("#roomQueue").innerHTML=n.queue.length?n.queue.map((c,p)=>`<li class="row" style="gap:6px">✋ ${At(c)} <button type="button" class="chip pikk-chip" data-approve="${p}">Approve speaker</button></li>`).join(""):'<li class="muted small">No speaker requests yet.</li>',a.querySelectorAll("[data-approve]").forEach(c=>c.addEventListener("click",()=>{const p=n.queue.splice(+c.dataset.approve,1)[0];r("System",`${p} approved to speak (demo)`),d()}))};a.querySelectorAll(".pikk-room-mode").forEach(c=>c.addEventListener("click",()=>{n.mode=c.dataset.roomMode,a.querySelectorAll(".pikk-room-mode").forEach(p=>{const m=p===c;p.classList.toggle("on",m),p.setAttribute("aria-pressed",String(m))})})),i("#roomStart").addEventListener("click",()=>{const c=i("#roomTopic").value;if(!c)return t("Pick a topic first");i("#roomTitle").textContent=c,i("#roomModeChip").textContent=n.mode+(n.mode==="Text"?" chat":" (demo · no camera/mic)"),i("#roomStage").hidden=n.mode!=="Video",i("#roomVoice").hidden=n.mode!=="Voice",i("#roomSetup").hidden=!0,i("#roomShell").hidden=!1,r("System",`${n.mode} session started in ${c} · TEST MODE`)}),i("#roomRole").addEventListener("change",c=>{i("#roomHostTools").hidden=c.target.value!=="host"}),i("#roomChatForm").addEventListener("submit",c=>{c.preventDefault();const p=i("#roomChatInput").value.trim();p&&(r("You",p),n.msgs++,i("#roomChatInput").value="",o())}),a.querySelectorAll(".pikk-room-react").forEach(c=>c.addEventListener("click",()=>{n.reacts++,o()})),i("#roomRaiseHand").addEventListener("click",c=>{const p=c.currentTarget.getAttribute("aria-pressed")!=="true";c.currentTarget.setAttribute("aria-pressed",String(p)),c.currentTarget.classList.toggle("on",p),p?(n.hands++,n.queue.push("You")):n.queue=n.queue.filter(m=>m!=="You"),d(),o()}),i("#roomOpenMics").addEventListener("click",c=>{n.open=!n.open,c.currentTarget.setAttribute("aria-pressed",String(n.open)),c.currentTarget.classList.toggle("on",n.open),r("System",`Open microphones ${n.open?"on":"off"} (demo)`)}),a.querySelectorAll("[data-host-act]").forEach(c=>c.addEventListener("click",()=>{const p=c.dataset.hostAct;r("System",{cohost:"Open seat made co-host",mute:"Open seat muted",remove:"Open seat removed",block:"Open seat blocked & reported to moderation"}[p]+" (demo · no real user)")})),i("#roomPinBtn").addEventListener("click",()=>{const c=i("#roomPinText").value.trim();if(!c)return t("Write a thank-you first");const p=+i("#roomPinMins").value,m=Date.now()+p*6e4,h=i("#roomPinned");clearInterval(n.pinTimer);const g=()=>{const v=m-Date.now();if(v<=0||!document.body.contains(h)){h.hidden=!0,clearInterval(n.pinTimer);return}h.hidden=!1,h.innerHTML=`📌 <strong>Pinned thank-you</strong> · ${At(c)} <small>(${Math.ceil(v/6e4)} min left · TEST MODE)</small>`};g(),n.pinTimer=setInterval(g,15e3)}),i("#roomLeave").addEventListener("click",()=>{clearInterval(n.pinTimer),i("#roomShell").hidden=!0,i("#roomSetup").hidden=!1,i("#roomChat").innerHTML="",Object.assign(n,{msgs:0,reacts:0,hands:0,queue:[]}),d(),o(),t("You left the room")})}function Rd(){const e=(Ke().query||{}).tab;return e==="live"||e==="channels"?"channels":e==="following"||e==="categories"||e==="rooms"?e:"channels"}function be(){var s;const e=Rd(),t=((s=Ke().query)==null?void 0:s.category)||"";K(vb(e,t))}function ye(e){return"$"+Number(e||0).toFixed(2)}function $t(e){const t=Number(e)||0;return t>=1e3?(t/1e3).toFixed(t>=1e4?0:1).replace(/\.0$/,"")+"K":String(t)}function Wb(e="live"){return`
    <nav class="live-cat-chips" aria-label="Live categories">
      ${[{id:"live",href:"#/live?tab=channels",label:"Live"},{id:"openmic",href:"#/openmic",label:"Open Mic / Talent Discovery (24/7)"},{id:"spotlight",href:"#/spotlight",label:"Spotlight (24/7)"},{id:"viral",href:"#/viral-live",label:"Viral Live · Preview"}].map(a=>{const i=a.id===e?" on":"",n=a.id===e?' aria-current="page"':"";return`<a class="live-cat-chip${i}" href="${a.href}"${n}>${l(a.label)}</a>`}).join("")}
    </nav>`}function Yb(e="channels"){return`
    <nav class="live-disc-tabs" aria-label="Live discovery">
      ${[{id:"following",href:"#/live?tab=following",label:"Following"},{id:"clips",href:"#/shorts",label:"Clips"},{id:"channels",href:"#/live?tab=channels",label:"Channels"},{id:"categories",href:"#/live?tab=categories",label:"Categories"},{id:"rooms",href:"#/live?tab=rooms",label:"Group Rooms"}].map(a=>{const i=a.id===e?" on":"",n=a.id===e?' aria-current="page"':"";return`<a class="live-disc-tab${i}" href="${a.href}" data-tab="${a.id}"${n}>${l(a.label)}</a>`}).join("")}
    </nav>`}function Nd(e={}){const t=Bl(),s=t.chipLabel||"House · Music Video",a=t.embed?ct(t.embed,"rel=0"):"",i=e.title||"House catalog · while stages are quiet";return`
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
    </div>`}function Jb(e){const t=e?cn(e.id):[],s=new Set(t.map(o=>o.id)),a=Ps().filter(o=>s.has(o.hostId)),i=t.length?t.slice(0,12).map(o=>`<a class="chip" href="#/profile/${encodeURIComponent(o.id)}">${l("@"+(o.username||o.id))}</a>`).join(""):'<span class="muted">Nobody followed yet · DEMO</span>';let n;if(!e)n=`
      <p class="muted">Sign in to see lives from accounts you follow.</p>
      <a class="btn primary" href="#/profile">Demo profile</a>
      <p class="chip" style="margin-top:10px">TEST MODE · Following is local demo graph</p>`;else if(!a.length)n=`
      <p class="muted" style="margin:0 0 8px">
        None of the people you follow are live right now (demo filter on seeded Hot lives).
      </p>
      <div class="row wrap" style="gap:6px;margin-bottom:10px">${i}</div>
      <a class="btn ghost" href="#/live?tab=channels">Browse Live channels</a>
      <p class="chip" style="margin-top:10px">TEST MODE · not a scrape</p>
      ${Nd({title:"Meanwhile — DatBoiSkeet house catalog on 24/7 stages"})}`;else{const o=a.map(r=>`
        <article class="hot-live-card${r.house?" is-house":""}" data-live-id="${l(r.id)}">
          <div class="live-hoodie" aria-label="Live · ${l($t(r.viewers))} watching (example data)">
            <span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span>
            <span class="live-hoodie-viewers">${l($t(r.viewers))}</span><span class="chip pikk-example-tag" title="Example data · not real viewers">Example</span>
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
    </div>`}const Qb=[["The Booth","Rappers, freestyles, hip-hop performances and song previews","🎙️"],["The Stage","Singers, bands, vocalists and instrumental performances","🎤"],["City Takeover","City-versus-city showcases, performances and local pride challenges","🌆"],["Producer Room","Beat showcases, producer collaborations and beat competitions","🎹"],["Ladies Lounge","Women-centered girl talk, beauty, fashion, relationships and community","💅"],["Girl Talk","Everyday conversations, friendships and women’s discussions","💬"],["Tea Time","Celebrity gossip, trending stories and entertainment drama","🫖"],["Who Did What?","Viral moments, celebrity controversies and debates","👀"],["Boss Ladies","Women entrepreneurs, business networking and financial growth","👑"],["Fashion & Fits","Fashion, outfits and personal style","👗"],["Ladies Only Live","Women-centered livestreams and hosted events","🎥"],["What's the Word?","Entertainment news, celebrity conversations, viral moments and trending discussions","🗣️"],["Women in Business","Women entrepreneurs, founders, business networking and mentorship","👩‍💼"],["The Man Cave","Men’s social conversations, sports and community","🤝"],["Men in Business","Men’s entrepreneurship, networking, mentorship and partnerships","👔"],["Girls' Night In","Women-centered social nights, games and discussions","🌙"],["Beauty Bar","Beauty, hair, makeup and skincare conversations","💄"],["Love & Standards","Dating, relationships and boundaries","💗"],["Women's Mental Wellness","Women-centered stress, confidence, emotional wellbeing and peer support","🧠"],["Dating From Her Side","Women-centered dating experiences, relationships and personal standards","💞"],["The Hustle Room: Women","Women-centered side hustles, extra income ideas and building businesses","📈"],["The Barbershop","Men-centered everyday debates, conversation and community","💈"],["Fellas' Night","Men-centered social events and games","🌃"],["Men's Corner","Men-centered life, relationships and personal development","🧢"],["Cars & Motors","Cars, motorcycles, customization and auto culture","🚘"],["Fitness & Brotherhood","Fitness, wellbeing and peer support","💪"],["Fatherhood","Parenting, family responsibilities and raising children","👨‍👧"],["Men's Mental Wellness","Men-centered stress, wellbeing and peer support","🧠"],["Dating From His Side","Men-centered dating experiences and relationship advice","💬"],["Sports Debate","Sports arguments, player comparisons and predictions","🏅"],["Gaming Brotherhood","Gaming, tournaments and player communities","🎮"],["Men's Style","Fashion, grooming, watches and fragrances","⌚"],["The Hustle Room","Careers, side businesses and professional growth","📈"],["Brotherhood & Mentorship","Intergenerational mentoring and peer support","🤝"],["Sports Central","All-sports discussion, fan talk and analysis","🏆"],["Basketball","Basketball discussion and fan streams","🏀"],["Football","American football discussion and fan streams","🏈"],["Soccer","Soccer discussion and fan streams","⚽"],["Baseball","Baseball discussion and fan streams","⚾"],["Hockey","Hockey discussion and fan streams","🏒"],["Tech Talk","AI, gadgets, apps and technology","💻"],["Startups & Innovation","Building businesses, technology and new ideas","🚀"],["World News","International events and global news discussions","🌍"],["Economy & Markets","Inflation, housing, jobs, interest rates and markets","📈"],["Let's Talk","Open conversations, questions and community discussion","🗣️"],["The Hangout","Conversations and social live streams","💬"],["Creator Spotlight","Featured creators and emerging talent","🌟"],["Game Room","Gameplay, tournaments and community games","🎮"],["Why Are You Single?","Coed conversations about single life, dating experiences and relationship challenges","❓"],["What Are You Looking For?","Coed conversations about dating intentions, values and ideal partners","💭"],["Single & Ready to Mingle","Opt-in coed social conversations and introductions for singles","💘"],["Looking for My Match","Opt-in dating live conversations","❤️"],["The Flirt Zone","Dating and connection conversations","💕"],["Speed Connections","Fast-paced introductions and connections","⏱️"],["Poly Connections","Consensual nonmonogamy discussions and connections","🔗"],["Couples Corner","Couples-versus-couples games, trivia, partner challenges, friendly competitions and rematches","💞"],["Date Night Live","Live dating conversations and activities","🌹"],["Love & Advice","Relationship conversations and advice","💌"],["Business Connect & Wealth Academy","Coed business networking and beginner education in entrepreneurship, credit, stocks, crypto, real estate and Roth IRAs","💼"],["City Connect","Meet people by city for friendship, dating, business networking and local conversations","📍"],["Conspiracy Room","Open discussion of theories and claims","🧩"],["Money Talk","Stocks, housing, crypto and financial discussions","💰"],["Just Chatting","Conversations, Q&A and hanging out","💬"],["Gaming","Gameplay, tournaments and community games","🎮"],["Music","Artists, DJs, producers and listening sessions","🎵"],["IRL","Everyday life, travel and outdoor streams","🌎"],["Sports","Sports talk and watch-along discussions","🏀"],["Creative","Art, design, production and making things","🎨"],["Podcasts & Talk Shows","Interviews, panels and conversations","🎙️"],["Food & Cooking","Recipes, kitchens and food reviews","🍳"],["Fitness","Training, wellness and movement","💪"],["Beauty & Fashion","Style, hair, makeup and fashion","✨"],["Business & Money Talk","Entrepreneurs, careers and money discussions","💼"],["Dating & Connections","Opt-in conversations and dating live rooms","❤️"],["Education","Tutorials, learning and study sessions","📚"],["News & Commentary","Current events and opinions","📰"],["Comedy & Entertainment","Comedy, variety and entertainment","🎭"],["Comedy & Roast Battles","1v1, tag team, open mic and tournaments","🎤"]];function Xb(){return`
    <div class="card live-disc-panel" id="liveTabCategories" data-panel="categories">
      <div class="pikk-live-directory-hero">
        <span class="pikk-live-directory-kicker">PIKK LIVE · DISCOVER</span>
        <h3>Find your room.</h3>
        <p>Choose a community, explore a sport or find a conversation. Open a section to browse its topics.</p>
        <span class="pikk-live-directory-note">Discovery categories filter channels; a category is not a hosted room or a live stream. No active stream? You'll see an empty result.</span>
      </div>
      ${bb(Qb,l)}
      <h3 style="margin:20px 0 8px">PIKK 24/7 Stages</h3>
      <div class="live-cat-cards">
        <a class="live-cat-card" href="#/openmic"><strong>Open Mic / Talent Discovery</strong><span class="chip">24/7 stage</span><p class="muted">Join the performance queue</p></a>
        <a class="live-cat-card" href="#/spotlight"><strong>Spotlight Live</strong><span class="chip">24/7 stage</span><p class="muted">Keep Going votes and creator performances</p></a>
        <a class="live-cat-card" href="#/shorts"><strong>Clips / Shorts</strong><span class="chip">Watch</span><p class="muted">Watch short videos</p></a>
        <a class="live-cat-card" href="#/viral-live"><strong>PIKK Viral Live</strong><span class="chip">Preview · not broadcasting</span><p class="muted">Explore the future 24/7 trending channel and original video sources</p></a>
      </div>
    </div>`}function Zb(e){return e!=null&&e.spikedAt?Date.now()-Number(e.spikedAt)<15*60*1e3:!1}function ey(e=""){const t=Ps();return`
    <div class="card hot-lives-rail" id="hotLivesRail">
      <div class="row wrap" style="justify-content:space-between;align-items:baseline;gap:8px">
        <h3 style="margin:0">Hot lives · Top streamers</h3>
        <span class="chip">score · viewers + engagement</span>
      </div>
      <p class="muted" style="margin:6px 0 10px;font-size:12px">TEST MODE · seeded demo · not third-party scrape · house + community</p>
      <div class="hot-lives-track">
        ${(e?t.filter(i=>String(i.category||"").toLowerCase()===e.toLowerCase()):t).map(i=>{const n=Zb(i);return`
      <article class="hot-live-card${n?" is-hot":""}${i.house?" is-house":""}" data-live-id="${l(i.id)}">
        <div class="live-hoodie" aria-label="Live · ${l($t(i.viewers))} watching (example data)">
          <span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span>
          <span class="live-hoodie-viewers" title="${l($t(i.viewers))} watching · example">${l($t(i.viewers))}</span><span class="chip pikk-example-tag" title="Example data · not real viewers">Example</span>
        </div>
        <div class="hot-live-body">
          <div class="hot-live-host">@${l(i.hostName)}</div>
          <div class="hot-live-title">${l(i.title)}</div>
          <div class="hot-live-chips">
            <span class="chip">${l($t(i.viewers))} watching · Example</span>
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
    </div>`}function ty(e){const t=String(e||"queued");return t==="playing"?'<span class="chip live-chip">Playing</span>':t==="played"?'<span class="chip chip-ok">Played</span>':t==="skipped"?'<span class="chip">Skipped</span>':'<span class="chip">Queued</span>'}function Pe(e){const t=Number(e)||0;return t>=1e3?(t/1e3).toFixed(t%1e3===0?0:1).replace(/\.0$/,"")+"K":String(t)}function sy(e,t){if(!e||e.endedAt)return"";const s=yi(),a=Up(),i=Vp(e.id).slice(0,12),n=a.map(c=>{const p=c.coins>=Fp,m=s>=c.coins;return`
      <button type="button" class="lg-gift" data-slug="${l(c.slug)}" data-coins="${c.coins}" data-confirm="${p?"1":"0"}" title="${l(c.animation)}">
        <span class="lg-gift-emoji">${Ct(c.slug)}</span>
        <span class="lg-gift-name">${l(c.name)}</span>
        <span class="lg-gift-price">${l(Pe(c.coins))} · ${ye(c.usd)}</span>
        ${m?'<span class="chip">Ready</span>':'<span class="chip">Need demo coins</span>'}
        ${p?'<span class="chip lg-confirm-chip">Confirm</span>':""}
      </button>`}).join(""),o=vi.map(c=>`<button type="button" class="btn ghost lg-buy" data-coins="${c.coins}">${l(Pe(c.coins))} · ${ye(c.usd)}</button>`).join(""),r=i.length?i.map(c=>`<li class="lg-hist-row">
            <span class="lg-hist-emoji">${Ct(c.giftSlug)}</span>
            <span><strong>${l(c.giftName)}</strong> · @${l(c.fromUser)} · ${l(Pe(c.coins))} coins</span>
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
        <span class="chip">Coins ${l(Pe(s))} · TEST MODE</span>
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
    </div>`}function ay(e,t){var d;if(!e||e.endedAt)return"";const s=!!(t&&e.hostId===t.id),a=Number(((d=I().wallet)==null?void 0:d.balance)||0),i=Nn(e.id),n=yl.map(c=>{const p=c.save>0?`<span class="chip chip-ok lsr-save">Save $${c.save}</span>`:"";return`
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
            ${ty(c.status)}
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
    </div>`}function iy(e){var o;const t=e.endedAt?Math.max(0,Math.floor((e.endedAt-e.startedAt)/1e3)):Math.max(0,Math.floor((Date.now()-e.startedAt)/1e3)),s=String(Math.floor(t/60)).padStart(2,"0"),a=String(t%60).padStart(2,"0"),i=e.endedAt?`<div class="live-stage-meta"><span class="chip">Ended · ${j(e.endedAt)}</span></div>`:`<div class="live-hoodie live-hoodie--stage" aria-label="Live demo · no real viewers">
          <span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span>
          <span class="live-hoodie-viewers" id="liveViewers" title="TEST MODE demo stream">Demo · no real viewers</span>
        </div>
        <div class="live-stage-meta">
          <span class="chip">${s}:${a}</span>
        </div>`,n=(e.chat||[]).slice(-40).map(r=>`
      <div class="live-chat-row ${r.support?"support":""}${Ni(Is(),r.username)?" pikk-gb-hl":""}">
        <strong>${Bi(r.username)}</strong>
        <span>${l(r.text)}</span>
      </div>`).join("");return`
    <div class="card live-stage">
      <div class="live-stage-frame" role="img" aria-label="Fake stream stage · TEST MODE">
        <div class="live-stage-brand">
          <img src="/brand/pikk-logo-official.png" alt="PIKK" />
          <div>
            <div class="live-stage-title">${l(e.title)}</div>
            <div class="muted" style="font-size:12px">@${l(e.hostName)} · Follow DatBoiSkeet</div>
          </div>
        </div>
        ${i}
        <p class="live-stage-note">TEST MODE · no camera / no real stream · branding + chat demo only</p>
      </div>

      <div class="row wrap live-earn" style="margin-top:10px">
        <span class="chip">Tips ${ye(e.tipsTotal)}</span>
        <span class="chip">Gifts ${ye(e.giftsTotal||0)}</span>
        <span class="chip">Song reqs (see queue)</span>
        <span class="chip">Coins ${Pe(yi())}</span>
        <span class="chip">Wallet ${ye(((o=I().wallet)==null?void 0:o.balance)||0)}</span>
      </div>

      ${e.endedAt?`<p class="muted" style="margin:10px 0 0">Stream ended. Start another below.</p>
             <button class="btn primary" id="liveRestart">New go-live</button>`:`<div class="row wrap" style="margin-top:10px;gap:8px">
               <button class="btn" id="liveTip" data-kind="tip" data-amt="1">Tip $1 · demo</button>
               <button class="btn ghost" id="liveFocusGifts">Gifts tray</button>
               <button class="btn ghost danger" id="liveEnd">End stream</button>
             </div>
             ${qd("live")}`}
    </div>

    <div class="card live-chat-card">
      <h3>Live chat</h3>
      ${_d("live")}
      <div class="live-chat" id="liveChat">${n||'<p class="muted">No messages yet.</p>'}</div>
      ${e.endedAt?"":`<div class="row" style="gap:8px;margin-top:10px">
               <input id="liveChatInput" placeholder="Say something…" maxlength="280" style="flex:1" />
               <button class="btn primary" id="liveChatSend">Send</button>
             </div>`}
    </div>
  `}function ny(e){const t=Number(e==null?void 0:e.targetAmount)||0;return t<=0?0:Math.min(100,Math.round((Number(e.raised)||0)/t*100))}function ry(e){const t=Math.max(0,Number(e)-Date.now());if(t<=0)return"Ended · 24h window over";const s=Math.floor(t/36e5),a=Math.floor(t%36e5/6e4);return s>=1?`Resets in ${s}h ${a}m`:`Resets in ${a}m`}function Ko(e,t){if(!e||e.endedAt)return"";const s=e.hostId,a=Yp(s),i=!!(t&&s&&t.id===s),n=yi();if(!a)return i?`
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
      </div>`;const o=ny(a),r=!!(a.completedAt||o>=100),d=o>=100?"Complete":o>=70?"Close":o>=30?"On the way":"Far",c=[50,100,250].map(m=>`<button type="button" class="btn ghost live-goal-donate" data-goal-id="${l(a.id)}" data-coins="${m}" title="≈ $${(m/50).toFixed(0)}">Donate ${m} coins</button>`).join(""),p=i?`<details class="live-goal-edit" style="margin-top:10px">
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
      <p class="muted" style="margin:4px 0 8px;font-size:12px">${l(ry(a.endsAt))} · @${l(a.hostName||e.hostName)} · TEST MODE</p>
      <div class="live-goal-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${o}" aria-label="Goal progress">
        <div class="live-goal-fill" style="width:${o}%"></div>
      </div>
      <p class="live-goal-amounts" style="margin:8px 0 10px">
        <strong>${ye(a.raised)}</strong> / ${ye(a.targetAmount)}
        <span class="muted"> · ${o}%</span>
        <span class="chip" style="margin-left:8px">Coins ${l(Pe(n))}</span>
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
    </div>`}function oy(e){return e?`
    <div class="card" id="live-go">
      <h3>Go live · TEST MODE</h3>
      <p class="muted">Fake stream UI with title, viewer stub, chat, tips, gifts (coins), and paid song requests. Persisted in localStorage (<code>dbs_v1.live</code> + <code>coins</code> + <code>liveGiftLedger</code> + <code>liveSongRequests</code>).</p>
      <div class="field"><label>Stream title</label>
        <input id="liveTitle" maxlength="80" placeholder="e.g. Listening session · Long Story Short" value="PIKK Live · ${l(e.username)}" />
      </div>
      ${Gb()}
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
      </div>`}function ly(e){return e.length?`
    <div class="card">
      <h3>Recent streams (this device)</h3>
      <ul class="list-plain">
        ${e.slice(0,8).map(t=>`<li>
              <span><strong>${l(t.title)}</strong><br/><span class="muted" style="font-size:12px">@${l(t.hostName)} · ${j(t.endedAt||t.startedAt)} · tips ${ye(t.tipsTotal)}</span></span>
              <span class="chip">${t.endedAt?"Ended":"Live"}</span>
            </li>`).join("")}
      </ul>
    </div>`:""}function cy(e){if(!e||e.endedAt)return"";const t=Hp(10),s=t.length?t.map((r,d)=>{const c=Ct(r.lastSlug||"rose",{className:"gift-sticker gift-sticker--xs"});return`<div class="live-obar-cell" title="${l(r.username)} · ${ye(r.usd)} today">
            <span class="live-obar-rank">${d+1}</span>
            ${c}
            <span class="live-obar-name">${l(r.username)}</span>
          </div>`}).join(""):'<div class="live-obar-empty muted">No gifters yet today</div>',a=Zn(10),i=a.length?a.map((r,d)=>{const c=Ct("battle-win",{className:"gift-sticker gift-sticker--xs"});return`<div class="live-obar-cell" title="${l(r.username)} · rest of day">
            <span class="live-obar-rank">${d+1}</span>
            ${c}
            <span class="live-obar-name">${l(r.username)}</span>
          </div>`}).join(""):'<div class="live-obar-empty muted">No winners yet today</div>',n=Nn(e.id).find(r=>r.status==="playing");let o="";if(n){const r=n.title||"Song";o=`
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
    </div>`}function dy(e){const t=yu();if(!t)return"";const s=Ct(t.giftSlug||"rose",{className:"gift-sticker"}),i=e&&e.id===t.fromUserId?`<p class="muted" style="margin:8px 0 0;font-size:12px">You triggered this · others can Challenge you · TEST MODE</p>
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
    </div>`}function py(e){var i,n,o,r,d,c,p,m;Xn();const t=Jn();if(!t||!e)return"";if(t.status==="active"||t.status==="ended"){const h=Math.max(0,Number(t.scoreA)||0),g=Math.max(0,Number(t.scoreB)||0),v=h+g,b=t.status==="active"?Math.max(0,Math.ceil((Number(t.endsAt)-Date.now())/1e3)):0,y=t.winnerName?"@"+l(t.winnerName):"Tie";return`
      <section class="card live-battle-scoreboard" aria-label="Live Gift Battle scoreboard">
        <div class="row wrap" style="justify-content:space-between;align-items:center">
          <strong>⚔️ PIKK Live Battle</strong>
          <span class="chip" id="liveBattleTimer" data-ends-at="${Number(t.endsAt)||0}">${t.status==="active"?b+"s left":"Finished"}</span>
        </div>
        <div class="row" style="justify-content:space-between;gap:12px;margin:12px 0">
          <div><strong>@${l(((i=t.challenger)==null?void 0:i.name)||"Challenger")}</strong><div>${$t(h)} demo points</div></div>
          <strong>VS</strong>
          <div style="text-align:right"><strong>@${l(((n=t.opponent)==null?void 0:n.name)||"Opponent")}</strong><div>${$t(g)} demo points</div></div>
        </div>
        <div class="live-battle-score-track" role="progressbar" aria-label="Challenger share of battle points" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${v?Math.round(h/v*100):50}" style="height:10px;background:var(--blue);border-radius:10px;overflow:hidden">
          <div style="width:${v?Math.round(h/v*100):50}%;height:100%;background:var(--acc)"></div>
        </div>
        ${t.status==="ended"?`<p class="live-battle-winner" style="font-weight:800;margin-top:10px">🏆 ${y} · Battle complete</p>`:'<p class="muted" style="margin-top:10px">Scores update with demo gifts · no real money</p>'}
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
    </div>`}function uy(){const e=Zn(10);return e.length?`
    <div class="card live-gb-day" id="liveGbDayWinners">
      <h3 style="margin:0 0 6px">Gift Battle winners today</h3>
      <p class="muted" style="margin:0 0 8px;font-size:12px">Up to 10 · until end of day · TEST MODE</p>
      <ul class="live-gb-day-list">${e.map((s,a)=>`<li class="live-gb-day-row"><span class="live-gb-day-sticker">${Ct("battle-win",{className:"gift-sticker gift-sticker--xs"})}</span><span class="chip">#${a+1}</span><strong>${l(s.username)}</strong></li>`).join("")}</ul>
    </div>`:""}function my(){var p;const{user:e,live:t}=I(),s=qp(),a=t&&!t.endedAt,i=!!t,n=Rd(),o=((p=Ke().query)==null?void 0:p.category)||"";let d=`
    <div class="live-disc-panel" data-panel="channels">
      ${o?`<div class="card"><strong>Category: ${l(o)}</strong> <a class="btn ghost" href="#/live?tab=categories">All categories</a> <a class="btn ghost" href="#/live?tab=channels">All channels</a><p class="muted small">Only channels tagged with this category are shown below.</p></div>`:""}
      ${ey(o)}
      ${o?"":uy()}
      ${a?"":oy(e)}
      ${a?"":Nd({title:"No active Live on this device — house catalog on Spotlight / Open Mic"})}
      ${ly(s)}
      <div class="card">
        <p class="muted" style="margin:0 0 8px">More Live tools</p>
        <div class="row wrap">
          <a class="btn ghost" href="#/connect#connect-multistream">Multi-platform go-live</a>
          <a class="btn ghost" href="#/multiguest">Multi-Guest</a>
          <a class="btn ghost" href="#/shorts">Shorts / Clips</a>
        </div>
        <p class="muted" style="margin:8px 0 0;font-size:12px">Open Mic + Spotlight are 24/7 categories (chips above). Clips live under Watch → Shorts / Clips. Gifts + song requests run during an active Live. Gift Battles is not promoted from this page.</p>
      </div>
    </div>`;n==="following"?d=Jb(e):n==="categories"?d=Xb():n==="rooms"&&(d=Hb({user:e,goalHtml:e&&!a?Ko({hostId:e.id,hostName:e.username},e):e?'<p class="muted small">Your Live daily goal is shown above while you are live (TEST MODE).</p>':'<p class="muted small">Sign in to set a room donation goal (reuses the Live daily goal · TEST MODE).</p>'}));const c=`
    ${Yb(n)}
    ${Wb("live")}
    ${a?cy(t):""}
    ${a?dy(e):""}
    ${a?py(e):""}
    ${i?iy(t):""}
    ${a?Ko(t,e):""}
    ${a?sy(t,e):""}
    ${a?ay(t,e):""}
    ${d}
  `;return P("PIKK Live",c,{lead:"Following · Clips · Channels · Categories → Shorts · Request Spotlight · TEST MODE.",badge:a?"LIVE":void 0})}const An=[];let en=!1;function hy(e,t){An.push(t),Bd(e)}function Bd(e){if(en)return;const t=e.querySelector("#liveGiftOverlay");if(!t){An.length=0;return}const s=An.shift();if(!s)return;en=!0;const i=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches?900:s.tier==="cinematic"?4200:s.tier==="premium"?2800:1600;t.innerHTML=`
    <div class="lg-overlay-card lg-tier-${l(s.tier||"small")}" data-slug="${l(s.slug)}">
      <div class="lg-overlay-sticker">${Ct(s.slug)}</div>
      <div class="lg-overlay-copy">
        <strong>${l(s.name)}</strong>
        <span>@${l(s.fromUser)} · ${l(Pe(s.coins))} coins</span>
        <span class="muted lg-overlay-brief">${l(s.animation||"")}</span>
      </div>
    </div>`,t.classList.add("is-on"),window.setTimeout(()=>{t.classList.remove("is-on"),t.innerHTML="",en=!1,Bd(e)},i)}function fy(e){e.querySelectorAll(".lg-buy").forEach(t=>{t.addEventListener("click",()=>{const s=kl(Number(t.dataset.coins));if((s==null?void 0:s.error)==="bad_package")return f("Unknown coin pack");if(s!=null&&s.error)return f(String(s.error));f(`+${Pe(s.pack.coins)} coins · ${ye(s.pack.usd)} · TEST MODE`),be()})}),e.querySelectorAll(".lg-gift").forEach(t=>{t.addEventListener("click",()=>{var r,d,c;const s=t.dataset.slug,a=t.dataset.confirm==="1",i=Kn.find(p=>p.slug===s);if(!i)return f("Gift not found");if(a&&!window.confirm(`Send ${i.name} for ${Pe(i.coins)} coins (${ye(i.usd)})?
TEST MODE · demo coins only`))return;const n=(r=I().live)==null?void 0:r.id,o=zp({liveId:n,slug:s});if((o==null?void 0:o.error)==="signin")return f("Sign in first");if((o==null?void 0:o.error)==="offline")return f("Not live");if((o==null?void 0:o.error)==="insufficient")return f(`Need ${Pe(o.need)} coins — buy a pack below · TEST MODE`);if((o==null?void 0:o.error)==="bad_gift")return f("Unknown gift");if(o!=null&&o.error)return f(String(o.error));hy(e,{slug:i.slug,name:i.name,coins:i.coins,tier:i.tier,animation:i.animation,fromUser:((d=o.entry)==null?void 0:d.fromUser)||((c=I().user)==null?void 0:c.username)||"you"}),f(`Sent ${i.name} · ${Pe(i.coins)} coins · TEST MODE`),window.setTimeout(()=>be(),200)})})}function gy(e){var o,r;const t=e.querySelector("#lsrPacks"),s=e.querySelector("#lsrTitleFields");if(!t||!s)return;let a=1;const i=()=>{const d=a,c=Array.from({length:d},(p,m)=>`<div class="field"><label>Song ${m+1}</label>
        <input class="lsr-title-input" data-i="${m}" maxlength="80" placeholder="Song title…" /></div>`).join("");s.innerHTML=c},n=d=>{a=Number(d)||1,t.querySelectorAll(".lsr-pack").forEach(c=>{const p=Number(c.dataset.pack)===a;c.classList.toggle("on",p),c.setAttribute("aria-pressed",p?"true":"false")}),i()};t.querySelectorAll(".lsr-pack").forEach(d=>{d.addEventListener("click",()=>n(d.dataset.pack))}),n(1),(o=e.querySelector("#lsrSeedWallet"))==null||o.addEventListener("click",()=>{Ha(50,"Song request demo credit · TEST MODE"),f("+$50 wallet demo · TEST MODE"),be()}),(r=e.querySelector("#lsrSubmit"))==null||r.addEventListener("click",()=>{const d=Array.from(e.querySelectorAll(".lsr-title-input")).map(p=>p.value),c=Np({pack:a,titles:d});if((c==null?void 0:c.error)==="signin")return f("Sign in first");if((c==null?void 0:c.error)==="offline")return f("Not live");if((c==null?void 0:c.error)==="bad_pack")return f("Pick a pack");if((c==null?void 0:c.error)==="title_count")return f(`Enter ${c.need} song title${c.need>1?"s":""}`);if((c==null?void 0:c.error)==="insufficient")return f(`Need ${ye(c.need)} — tap + $50 demo credit · TEST MODE`);if(c!=null&&c.error)return f(String(c.error));f(`Song request submitted · ${ye(c.entry.price)} · TEST MODE`),be()}),e.querySelectorAll(".lsr-play").forEach(d=>{d.addEventListener("click",()=>{var v;const c=d.dataset.rid,p=Number(d.dataset.si),h=Nn((v=I().live)==null?void 0:v.id).find(b=>b.requestId===c&&b.songIndex===p);let g;if((h==null?void 0:h.status)==="playing"){if(g=jp(c,p),(g==null?void 0:g.error)==="host_only")return f("Host only");if(g!=null&&g.error)return f(String(g.error));f("Marked played · TEST MODE")}else{if(g=Bp(c,p),(g==null?void 0:g.error)==="host_only")return f("Host only");if(g!=null&&g.error)return f(String(g.error));f("Now playing · TEST MODE")}be()})}),e.querySelectorAll(".lsr-skip").forEach(d=>{d.addEventListener("click",()=>{const c=Kp(d.dataset.rid,Number(d.dataset.si));if((c==null?void 0:c.error)==="host_only")return f("Host only");if(c!=null&&c.error)return f(String(c.error));f("Skipped · TEST MODE"),be()})})}function vy(e){var s,a,i,n,o,r,d,c,p;kb(e),e.querySelectorAll(".hot-live-watch").forEach(m=>{m.addEventListener("click",()=>{zi();const h=m.dataset.host||"creator",g=m.dataset.id||"",v=e.querySelector(`.hot-live-card[data-live-id="${CSS.escape(g)}"]`);e.querySelectorAll(".hot-live-card.is-watching").forEach(b=>b.classList.remove("is-watching")),v==null||v.classList.add("is-watching"),f(`Watching @${h} · demo only`)})}),e.querySelectorAll(".hot-live-spike").forEach(m=>{m.addEventListener("click",()=>{var b;const h=m.dataset.id,g=fh(h);if((g==null?void 0:g.error)==="missing")return f("Live not found");if(g!=null&&g.error)return f(String(g.error));const v=((b=g.live)==null?void 0:b.hostName)||"creator";f(g.deduped?`Spike @${v} · Admin alert already open`:`Spike @${v} · Admin engagement alert queued`),be()})}),Ub(e),zb(e,{toast:f,me:((s=I().user)==null?void 0:s.username)||"You"}),Bb(e,{toast:f,me:((a=I().user)==null?void 0:a.username)||"You"}),(i=e.querySelector("#liveStart"))==null||i.addEventListener("click",()=>{var y,k,S,x,w;const m=(k=(y=e.querySelector("#liveTitle"))==null?void 0:y.value)==null?void 0:k.trim(),h=Vb(e);if(!h.category)return f("Pick one Go Live category");const g=Rr(m,h);if((g==null?void 0:g.error)==="signin")return f("Sign in first");if((g==null?void 0:g.error)==="already_live")return f("Already live");const v=(x=(S=e.querySelector("#liveGoalNameGo"))==null?void 0:S.value)==null?void 0:x.trim(),b=Number((w=e.querySelector("#liveGoalAmtGo"))==null?void 0:w.value);if(v&&b>0){const A=El({name:v,targetAmount:b});(A==null?void 0:A.error)==="signin"?f("Sign in to set goal"):A!=null&&A.error?f("Goal not set · "+A.error):f(`Live goal set · $${b} · 24h · TEST MODE`)}zi(),f("You are live · TEST MODE"),be()}),(n=e.querySelector("#liveRestart"))==null||n.addEventListener("click",()=>{var g;const m="PIKK Live · "+(((g=I().user)==null?void 0:g.username)||"Demo"),h=Rr(m);if(h!=null&&h.error)return f(String(h.error));zi(),f("Back live · TEST MODE"),be()}),(o=e.querySelector("#liveEnd"))==null||o.addEventListener("click",()=>{_p(),Gc(),f("Stream ended"),be()}),(r=e.querySelector("#liveTip"))==null||r.addEventListener("click",m=>{const h=m.currentTarget,g=bl({kind:"tip",amount:Number(h.dataset.amt)||1});if((g==null?void 0:g.error)==="signin")return f("Sign in first");if((g==null?void 0:g.error)==="offline")return f("Not live");f("Tip sent · demo"),be()});const t=()=>{var v;const m=e.querySelector("#liveChatInput"),h=(v=m==null?void 0:m.value)==null?void 0:v.trim();if(!h)return f("Type a message");const g=Op(h);if((g==null?void 0:g.error)==="signin")return f("Sign in first");if((g==null?void 0:g.error)==="offline")return f("Not live");(g==null?void 0:g.error)!=="empty"&&(m&&(m.value=""),be())};(d=e.querySelector("#liveChatSend"))==null||d.addEventListener("click",t),(c=e.querySelector("#liveChatInput"))==null||c.addEventListener("keydown",m=>{m.key==="Enter"&&t()}),(p=e.querySelector("#liveFocusGifts"))==null||p.addEventListener("click",()=>{var m;(m=e.querySelector("#liveGifts"))==null||m.scrollIntoView({behavior:"smooth",block:"start"})}),fy(e),gy(e),by(e)}function by(e){var a;(a=e.querySelector("#liveGoalSave"))==null||a.addEventListener("click",()=>{var r,d,c;const i=(d=(r=e.querySelector("#liveGoalName"))==null?void 0:r.value)==null?void 0:d.trim(),n=Number((c=e.querySelector("#liveGoalAmt"))==null?void 0:c.value),o=El({name:i,targetAmount:n});if((o==null?void 0:o.error)==="signin")return f("Sign in first");if((o==null?void 0:o.error)==="bad_name")return f("Enter a goal name");if((o==null?void 0:o.error)==="bad_amount")return f("Enter a goal amount ($)");if(o!=null&&o.error)return f(String(o.error));f(`Goal live · $${o.goal.targetAmount} · 24h window · TEST MODE`),be()});const t=e.querySelector("#liveGoalSupportMessage"),s=e.querySelector("#liveGoalSupportMessageCount");if(t&&s){const i=()=>{s.textContent=`${t.value.length} / 180`};t.addEventListener("input",i),i()}e.querySelectorAll(".live-goal-custom-form").forEach(i=>{i.addEventListener("submit",n=>{var d,c;n.preventDefault();const o=Number((d=i.querySelector(".live-goal-custom-coins"))==null?void 0:d.value);if(!Number.isSafeInteger(o)||o<1||o>1e6)return f("Enter 1–1,000,000 whole coins");const r=Ua(i.dataset.goalId,o,{message:((c=e.querySelector("#liveGoalSupportMessage"))==null?void 0:c.value)||""});if((r==null?void 0:r.error)==="signin")return f("Sign in first");if((r==null?void 0:r.error)==="insufficient")return f("Not enough demo coins");if(r!=null&&r.error)return f("Donation unavailable · TEST MODE");f("Custom donation sent · TEST MODE"),be()})}),e.querySelectorAll(".live-goal-donate").forEach(i=>{i.addEventListener("click",()=>{var c,p;const n=i.dataset.goalId,o=Number(i.dataset.coins),r=Ua(n,o,{message:((c=e.querySelector("#liveGoalSupportMessage"))==null?void 0:c.value)||""});if((r==null?void 0:r.error)==="signin")return f("Sign in first");if((r==null?void 0:r.error)==="insufficient")return f(`Need ${Pe(r.need)} coins — buy a pack in Gifts · TEST MODE`);if((r==null?void 0:r.error)==="expired")return f("Goal ended · 24h window over");if((r==null?void 0:r.error)==="unknown_goal")return f("Goal not found");if((r==null?void 0:r.error)==="invalid_amount")return f("Pick a donate amount");if(r!=null&&r.error)return f(String(r.error));const d=((p=r.donated)==null?void 0:p.usd)??o/50;f(`Donated ${Pe(o)} coins ($${Number(d).toFixed(2)}) · TEST MODE`),be()})})}const yy={BASE_URL:"/pikk-app/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_BASE:"/pikk-app/",VITE_BUILD_SHA:"b1f547a871a9a2dc042e57a129503bfb4842e709",VITE_PIKK_API_BASE:""};function ky(e=yy&&"/pikk-app/"||"/"){return String(e).replace(/\/?$/,"/")+"brand/pikk-logo-official.png"}const Ba=ue.filter(e=>["dirty-money","93","no-love"].includes(e.id)).map(e=>({id:e.id,title:e.title,artist:"DatBoiSkeet",url:e.youtube,thumbnail:`https://i.ytimg.com/vi/${encodeURIComponent(new URL(e.youtube).searchParams.get("v"))}/hqdefault.jpg`})),jo=[{id:"videos",label:"Videos"},{id:"clips",label:"Viral clips",browseHref:"#/shorts",browseLabel:"Browse existing PIKK Clips"},{id:"songs",label:"Songs",browseHref:"#/music",browseLabel:"Explore PIKK Music"},{id:"photos",label:"Photos",browseHref:"#/home",browseLabel:"Explore PIKK Home"}];function wy(){const e=Ba[0],t=Ba.map((s,a)=>`
    <button type="button" class="pikk-viral-choice${a===0?" is-selected":""}"
      data-viral-pick="${a}" aria-pressed="${a===0}">
      <span class="pikk-viral-choice-num">${String(a+1).padStart(2,"0")}</span>
      <img class="pikk-viral-choice-thumb" src="${l(s.thumbnail)}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer">
      <span class="pikk-viral-choice-copy"><strong>${l(s.title)}</strong><small>${l(s.artist)} · Original YouTube source</small></span>
      <span class="pikk-viral-choice-arrow" aria-hidden="true">↗</span>
    </button>`).join("");return P("PIKK Viral Live",`
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
        <div class="pikk-viral-hero-mark" aria-hidden="true"><img class="pikk-viral-hero-logo" src="${l(ky())}" alt="" decoding="async" loading="eager"></div>
      </section>

      <div class="pikk-viral-notice" role="status">
        <strong>PREVIEW · NOT BROADCASTING</strong>
        <span>Real-time viewer counts, live chat, engagement ranking and 24/7 playback are not connected. Nothing here is represented as live.</span>
      </div>

      <nav class="pikk-viral-tabs" aria-label="Viral Live content types" role="tablist">
        ${jo.map((s,a)=>`<button type="button" role="tab" data-viral-type="${s.id}" aria-selected="${a===0}" tabindex="${a===0?0:-1}" aria-controls="viral-panel-${s.id}" id="viral-tab-${s.id}">${s.label}</button>`).join("")}
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
        <div class="pikk-viral-section-head"><h3>Up next · source library</h3><span>Manual preview · ${Ba.length} existing music videos</span></div>
        <div class="pikk-viral-queue" id="pikkViralQueue" role="group" aria-label="Choose an original video source">${t}</div>
      </section>

      ${jo.filter(s=>s.id!=="videos").map(s=>`
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
  `,{lead:"Discover the planned 24/7 viral channel · preview only"})}function Sy(e){const t=e.querySelector("#pikkViralPreview");if(!t)return;t.querySelectorAll("[data-viral-pick]").forEach(n=>{n.addEventListener("click",()=>{const o=Number(n.dataset.viralPick),r=Ba[o];r&&(t.querySelector("#pikkViralTitle").textContent=r.title,t.querySelector("#pikkViralCreator").textContent=r.artist+" · Watch from the original publisher",t.querySelector("#pikkViralSource").href=r.url,t.querySelector("#pikkViralThumbnail").src=r.thumbnail,t.querySelectorAll("[data-viral-pick]").forEach(d=>{const c=d===n;d.classList.toggle("is-selected",c),d.setAttribute("aria-pressed",String(c))}))})});const s=Array.from(t.querySelectorAll("[data-viral-pick]"));s.forEach((n,o)=>{n.addEventListener("keydown",r=>{if(!["ArrowRight","ArrowLeft","ArrowDown","ArrowUp","Home","End"].includes(r.key))return;r.preventDefault();const d=s.length-1,c=r.key==="Home"?0:r.key==="End"?d:(o+(["ArrowRight","ArrowDown"].includes(r.key)?1:-1)+s.length)%s.length,p=s[c];p.click(),p.focus(),p.scrollIntoView({block:"nearest",inline:"nearest"})})});const a=Array.from(t.querySelectorAll("[data-viral-type]"));function i(n,o=!1){const r=n.dataset.viralType;a.forEach(d=>{const c=d===n;d.setAttribute("aria-selected",String(c)),d.tabIndex=c?0:-1}),t.querySelectorAll("[data-viral-panel]").forEach(d=>{d.hidden=d.dataset.viralPanel!==r}),o&&(n.focus(),n.scrollIntoView({block:"nearest",inline:"nearest"}))}a.forEach((n,o)=>{n.addEventListener("click",()=>i(n)),n.addEventListener("keydown",r=>{if(!["ArrowRight","ArrowLeft","Home","End"].includes(r.key))return;r.preventDefault();const d=a.length-1,c=r.key==="Home"?0:r.key==="End"?d:(o+(r.key==="ArrowRight"?1:-1)+a.length)%a.length;i(a[c],!0)})})}function qs(){K("#/marketplace")}const $y={pending:"Pending",approved:"Approved",rejected:"Rejected"},Ey=[{v:"sponsored_post",label:"Sponsored post"},{v:"livestream_promo",label:"Livestream promo"},{v:"affiliate",label:"Affiliate link"},{v:"storefront",label:"Product storefront"}];function xy(){const{brandApps:e,user:t}=I(),s=Zp(),a=s.filter(r=>r.active),i=a.length?a.map(r=>`
      <article class="card market-listing" data-id="${l(r.id)}">
        <div class="row wrap">
          <span class="chip">Sponsored</span>
          <span class="chip">${l(r.disclosure||"Paid partnership")}</span>
          <span class="muted spacer" style="text-align:right;font-size:12px">${j(r.at)}</span>
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
          <span class="chip">${l($y[r.status]||r.status)}</span>
          <span class="muted spacer" style="text-align:right">${j(r.at)}</span>
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
          ${Ey.map(r=>`<option value="${r.v}">${l(r.label)}</option>`).join("")}
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
  `;return P("Marketplace",o,{lead:"Brand applications & sponsored listings · localStorage demo."})}function Ay(e){var t,s;(t=e.querySelector("#mSubmit"))==null||t.addEventListener("click",()=>{var i,n,o,r,d,c,p;const a=Jp({brand:(i=e.querySelector("#mBrand"))==null?void 0:i.value,contact:(n=e.querySelector("#mContact"))==null?void 0:n.value,email:(o=e.querySelector("#mEmail"))==null?void 0:o.value,budget:(r=e.querySelector("#mBudget"))==null?void 0:r.value,campaign:(d=e.querySelector("#mCampaign"))==null?void 0:d.value,url:(c=e.querySelector("#mUrl"))==null?void 0:c.value,pitch:(p=e.querySelector("#mPitch"))==null?void 0:p.value});if((a==null?void 0:a.error)==="required")return f("Brand and email required");f("Application saved"),qs()}),e.querySelectorAll(".brand-status").forEach(a=>{a.addEventListener("click",()=>{Qp(a.dataset.id,a.dataset.status),f("Marked "+a.dataset.status),qs()})}),e.querySelectorAll(".brand-to-listing").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.brand||"Brand",n=Kr({title:`${i} · sponsored`,brand:i,blurb:a.dataset.pitch||"Sponsored offer from approved brand application.",url:a.dataset.url||"",disclosure:"Paid partnership · TEST MODE",brandAppId:a.dataset.id});if(n!=null&&n.error)return f("Could not create listing");f("Listing published"),qs()})}),(s=e.querySelector("#lCreate"))==null||s.addEventListener("click",()=>{var i,n,o,r,d;const a=Kr({title:(i=e.querySelector("#lTitle"))==null?void 0:i.value,brand:(n=e.querySelector("#lBrand"))==null?void 0:n.value,blurb:(o=e.querySelector("#lBlurb"))==null?void 0:o.value,url:(r=e.querySelector("#lUrl"))==null?void 0:r.value,disclosure:(d=e.querySelector("#lDisc"))==null?void 0:d.value});if((a==null?void 0:a.error)==="required")return f("Title and brand required");f("Listing published"),qs()}),e.querySelectorAll(".listing-toggle").forEach(a=>{a.addEventListener("click",()=>{Xp(a.dataset.id,a.dataset.active==="1"),f(a.dataset.active==="1"?"Listing shown":"Listing hidden"),qs()})})}function Ty(e){const t=Array.isArray(e==null?void 0:e.messages)?e.messages:[],s=t.length?t[t.length-1]:null,a=String((e==null?void 0:e.peerName)||(e==null?void 0:e.peerId)||""),i=String((s==null?void 0:s.text)||"").slice(0,80);return`${a} ${i}`.toLowerCase()}function Kd(e,t,s=!1){const a=Math.max(0,Math.trunc(Number(t)||0)),i=Math.min(a,Math.max(0,Math.trunc(Number(e)||0))),n=`conversation${a===1?"":"s"}`;return s?`Showing ${i} of ${a} ${n}`:`${a} ${n}`}function ce(e){K(e||"#/messages")}function Cy(e){const t=e.messages||[];if(!t.length)return"No messages yet";const s=t[t.length-1];return(s.priority?"⚡ ":"")+(s.text||"").slice(0,80)}function Py(){return P("Messages",`<section class="pikk-msg-flow-hero" aria-label="PIKK messages sign-in">
      <span class="pikk-msg-flow-kicker">PIKK CONNECT · PRIVATE MESSAGES</span>
      <h2>Your conversations. <em>Your circle.</em></h2>
      <p>Try DMs, group conversations and the creator messages with a local demo account.</p>
      <span class="chip">TEST MODE · No server messaging</span>
    </section>
    <div class="card pikk-msg-flow-panel">
      <h3>Sign in required</h3>
      <p class="muted">Private DMs, team inbox, and group chats need a local demo account.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,{lead:"Private messaging & team inbox · TEST MODE"})}function Iy(e){const t=Gn(),s=t.filter(n=>Va(n)>0),a=I().messagePrefs||{allowDMs:!0,allowRequests:!0},i=t.map(n=>{const o=n.kind==="group",r=!o&&n.peerId==="dbs",d=[o?'<span class="chip">Group</span>':"",r?'<span class="chip">Team</span>':"",n.request?'<span class="chip">Request</span>':"",n.muted?'<span class="chip">Muted</span>':"",n.blocked?'<span class="chip">Blocked</span>':""].filter(Boolean).join(" "),c=Va(n),p=c?`<span class="chip msg-unread-chip" aria-label="${c} unread">${c}</span>`:"";return`
      <button type="button" class="msg-thread-row${c?" has-unread":""}" data-search="${l(Ty(n))}" data-unread="${c>0}" data-open-thread="${l(n.id)}">
        <div class="pikk-msg-avatar" aria-hidden="true">${l(String(n.peerName||n.peerId||"?").slice(0,1).toUpperCase())}</div>
        <div class="pikk-msg-thread-body"><div class="msg-thread-top">
          <strong>${l(n.peerName||n.peerId)}</strong>
          <span class="muted">${l(j(n.updatedAt||0))}</span>
        </div>
        <div class="msg-thread-preview muted">${l(Cy(n))}</div>
        <div class="msg-thread-chips">${p}${d}</div></div>
      </button>`}).join("");return`
    <section class="pikk-messages-hero" aria-label="PIKK inbox">
      <div><p class="kicker">PIKK CONNECT · MESSAGES</p><h2>Your conversations.</h2><p>Stay connected with people, groups, and the PIKK community.</p></div>
      <span class="pikk-messages-hero-mark" aria-hidden="true">✉</span>
    </section>
    <div class="pikk-msg-tools">
      <label for="pikkMsgSearch">Search conversations</label>
      <input id="pikkMsgSearch" type="search" placeholder="Search names or latest messages..." autocomplete="off" aria-controls="msgInbox" aria-describedby="pikkMsgSearchHelp" />
      <p id="pikkMsgSearchHelp" class="muted" style="margin:4px 0 0;font-size:.75rem">Search covers names and the visible latest-message preview only.</p>
      <label class="row" style="gap:8px;align-items:center;margin-top:8px" for="pikkMsgUnreadOnly"><input id="pikkMsgUnreadOnly" type="checkbox" aria-controls="msgInbox" /> Unread only (${s.length})</label>
      <div class="pikk-msg-tool-actions"><button type="button" class="btn ghost" id="pikkMsgClearFilters" aria-controls="msgInbox" hidden>Clear filters</button><button type="button" class="btn primary" id="pikkNewChatTop">+ New chat</button><button type="button" class="btn ghost" id="pikkGroupTop">Group chat</button></div>
      <p id="pikkMsgResultCount" class="muted" role="status" aria-live="polite" aria-atomic="true" style="margin:8px 0 0;font-size:.875rem">${Kd(t.length,t.length)}</p>
    </div>
    <div class="card msg-team-card">
      <h3>Creator messages</h3>
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
  `}function My(){return`
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
    <section class="pikk-msg-contact-grid" aria-label="Available demo contacts">${ma().map(s=>{const a=s.team||Al(s.id),i=s.team?"Creator message":a?"Message":"Message request";return`
      <article class="card msg-contact pikk-msg-contact-card">
        <div class="msg-contact-head">
          <span class="pikk-msg-contact-avatar" aria-hidden="true">${l(String(s.username||"?").slice(0,1).toUpperCase())}</span>
          <strong>${l(s.username)}</strong>
          ${s.team?'<span class="chip">Creator</span>':a?'<span class="chip">Mutual</span>':'<span class="chip">Request</span>'}
          ${s.handle?"":'<span class="chip">Demo · device-only</span>'}
        </div>
        <p class="muted" style="margin:6px 0 10px">${l(s.bio||"")}</p>
        <button type="button" class="btn ${s.team?"primary":""}" data-start-peer="${l(s.id)}" data-peer-name="${l(s.username)}" data-peer-handle="${l(s.handle||"")}">${l(i)}</button>
      </article>`}).join("")}</section>
  `}function Ly(){return`
    <section class="pikk-msg-flow-hero" aria-label="Creator messages">
      <span class="pikk-msg-flow-kicker">PIKK CONNECT · CREATOR MESSAGES</span>
      <h2>Reach the team. <em>One inbox.</em></h2>
      <p>Send a local demo inquiry to this creator account. Priority is a test-mode flag, never a charge.</p>
      <span class="chip">TEST MODE · No real delivery</span>
    </section>
    <div class="card msg-team-card pikk-msg-flow-panel">
      <div class="row" style="justify-content:space-between">
        <h3 style="margin:0">Creator inbox</h3>
        <button type="button" class="btn ghost" id="msgBackInbox">← Inbox</button>
      </div>
      <p class="muted">Message this creator account. Free inquiry stays in the normal queue; Priority ($2.99 TEST MODE — not charged) flags the thread for priority review only.</p>
      <div class="row wrap" style="gap:8px;margin-top:8px">
        <button type="button" class="btn primary" id="msgTeamFree">Free inquiry</button>
        <button type="button" class="btn" id="msgTeamPriority">Priority $2.99 · TEST MODE</button>
      </div>
    </div>
  `}function Dy(e,{teamPriorityHint:t=!1}={}){const s=I().user,a=e.kind==="group",i=!a&&e.peerId==="dbs",n=!!e.blocked,o=(e.messages||[]).map(c=>`
      <div class="msg-bubble ${c.from===(s==null?void 0:s.id)?"mine":""} ${c.priority?"priority":""}">
        <div class="msg-bubble-meta">
          <strong>${l(c.fromName||c.from)}</strong>
          ${c.priority?'<span class="chip priority-chip">Priority</span>':""}
          <span class="muted">${l(j(c.at))}</span>
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
          <button type="button" class="btn ghost pikk-safety-tap" data-flag="block">${e.blocked?"Unblock":"Block"}</button>
          ${a?"":$r("data-report-category")}
          <button type="button" class="btn ghost danger pikk-safety-tap" data-flag="report">Report</button>
        </div>
        ${!a&&!ta(e)?'<p class="muted msg-device-only-note" style="font-size:12px;margin:6px 0 0">Demo contact · Report and Block save on this device only — not sent to PIKK moderators.</p>':""}
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
  `}function _y(e=[]){return e.length?e.map(t=>{const s=t.peer_display_name||t.peer_handle||"PIKK user",a=t.last_message||"No messages yet",i=t.last_message_at||t.created_at;return`<button type="button" class="msg-thread-row persistent-msg-row" data-open-remote-thread="${l(t.id)}">
      <div class="pikk-msg-avatar" aria-hidden="true">${l(String(s).slice(0,1).toUpperCase())}</div>
      <div class="pikk-msg-thread-body">
        <div class="msg-thread-top"><strong>${l(s)}</strong><span class="muted">${i?l(j(Date.parse(i))):""}</span></div>
        <div class="msg-thread-preview muted">${l(a.slice(0,100))}</div>
        <div class="msg-thread-chips"><span class="chip">Persistent</span><span class="muted">@${l(t.peer_handle||"user")}</span></div>
      </div>
    </button>`}).join(""):'<div class="msg-empty"><p class="muted">No persistent conversations yet.</p><a class="btn primary" href="#/messages?view=new">Start a chat</a></div>'}function Fo(e,t=""){var o,r,d;const s=e==null?void 0:e.conversation,a=(e==null?void 0:e.messages)||[];if(!s)return'<div class="card muted">Conversation not found.</div>';const i=((o=s.peer)==null?void 0:o.display_name)||((r=s.peer)==null?void 0:r.handle)||"PIKK user",n=a.map(c=>{var m;const p=c.sender_id===t;return`<div class="msg-bubble ${p?"mine":""}">
      <div class="msg-bubble-meta"><strong>${p?"You":"@"+l(c.sender_handle||((m=s.peer)==null?void 0:m.handle)||"user")}</strong><span class="muted">${l(j(Date.parse(c.created_at)))}</span></div>
      <div class="msg-bubble-text">${l(c.body)}</div>
    </div>`}).join("");return`<section class="pikk-msg-flow-hero pikk-msg-flow-hero-thread"><span class="pikk-msg-flow-kicker">PIKK CONNECT · DIRECT MESSAGES</span><h2>${l(i)}</h2><p>Persistent private conversation stored on PIKK.</p><span class="chip">Backend message thread</span></section>
    <div class="card msg-thread-head pikk-msg-flow-panel"><button type="button" class="btn ghost" data-remote-inbox>← Inbox</button><h3 style="margin:10px 0 0">${l(i)}</h3>${(d=s.peer)!=null&&d.handle?`<div class="row wrap" style="margin-top:8px"><button type="button" class="btn ghost pikk-safety-tap" data-remote-flag="block" data-peer-handle="${l(s.peer.handle)}">Block</button>${$r("data-report-category")}<button type="button" class="btn ghost danger pikk-safety-tap" data-remote-flag="report" data-peer-handle="${l(s.peer.handle)}">Report</button></div>`:""}</div>
    <div class="card msg-thread-card pikk-msg-flow-panel">
      <div class="msg-thread" id="remoteMsgThread">${n||'<p class="muted">No messages yet — say hi.</p>'}</div>
      <div class="msg-composer"><input id="remoteMsgInput" placeholder="Message…" maxlength="4000" /><button type="button" class="btn primary" id="remoteMsgSend">Send</button></div>
    </div>`}function Oy(e,t){var i,n;if(!t)return P("Messages",'<section class="pikk-msg-flow-hero"><span class="pikk-msg-flow-kicker">PIKK CONNECT · PRIVATE MESSAGES</span><h2>Your conversations.</h2><p>Sign in with your PIKK account to use persistent private messages.</p><span class="chip">Backend messaging</span></section><div class="card"><a class="btn primary" href="#/profile">Sign in</a></div>',{lead:"Persistent private messaging"});const s=((i=e==null?void 0:e.query)==null?void 0:i.view)||"",a=((n=e==null?void 0:e.query)==null?void 0:n.t)||"";return a?P("Messages",`<div id="persistentMessageThread" data-thread-id="${l(a)}"><div class="card muted">Loading conversation…</div></div>`,{lead:"Persistent private messaging"}):s==="new"?P("Messages",'<section class="pikk-msg-flow-hero"><span class="pikk-msg-flow-kicker">PIKK CONNECT · NEW CONVERSATION</span><h2>Start a private chat.</h2><p>Enter the PIKK username you want to message.</p><span class="chip">Verified accounts only</span></section><div class="card pikk-msg-flow-panel"><button type="button" class="btn ghost" data-remote-inbox>← Inbox</button><form id="remoteNewChatForm" style="margin-top:12px"><div class="field"><label for="remotePeerHandle">PIKK username</label><input id="remotePeerHandle" name="handle" maxlength="30" pattern="[A-Za-z0-9_]{3,30}" autocomplete="off" required placeholder="username" /></div><button class="btn primary" type="submit">Start conversation</button></form></div>',{lead:"Persistent private messaging"}):P("Messages",'<section class="pikk-messages-hero"><div><p class="kicker">PIKK CONNECT · MESSAGES</p><h2>Your conversations.</h2><p>Private messages tied to your PIKK account.</p></div><span class="pikk-messages-hero-mark" aria-hidden="true">✉</span></section><div class="pikk-msg-tools"><div class="pikk-msg-tool-actions"><a class="btn primary" href="#/messages?view=new">+ New chat</a></div></div><div class="card"><h3>Inbox</h3><div class="msg-inbox" id="persistentMsgInbox"><p class="muted">Loading conversations…</p></div></div>',{lead:"Persistent private messaging · backend stored"})}async function jd(e){var i,n,o,r,d,c;const t=I().user;if(!t)return;e.querySelectorAll("[data-remote-inbox]").forEach(p=>p.addEventListener("click",()=>ce("#/messages")));const s=e.querySelector("#persistentMsgInbox");if(s)try{const p=await kt.list();s.innerHTML=_y(p.conversations||[]),s.querySelectorAll("[data-open-remote-thread]").forEach(m=>m.addEventListener("click",()=>ce("#/messages?t="+encodeURIComponent(m.dataset.openRemoteThread))))}catch(p){s.innerHTML=(p==null?void 0:p.status)===401?'<p class="muted">Your session expired. <a href="#/profile">Sign in again</a>.</p>':`<p class="muted">Could not load messages: ${l((p==null?void 0:p.message)||"Unknown error")}</p>`}(i=e.querySelector("#remoteNewChatForm"))==null||i.addEventListener("submit",async p=>{p.preventDefault();const m=p.currentTarget.elements.handle.value.trim();if(m)try{const h=await kt.start(m);ce("#/messages?t="+encodeURIComponent(h.conversation.id))}catch(h){f((h==null?void 0:h.code)==="email_unverified"?"Verify your email before starting messages":(h==null?void 0:h.message)||"Could not start conversation")}});const a=e.querySelector("#persistentMessageThread");if(a){const p=a.dataset.threadId;try{const m=await kt.get(p);a.innerHTML=Fo(m,t.id),await kt.markRead(p).catch(()=>{}),(n=a.querySelector("[data-remote-inbox]"))==null||n.addEventListener("click",()=>ce("#/messages"));const h=((r=(o=m==null?void 0:m.conversation)==null?void 0:o.peer)==null?void 0:r.handle)||"";a.querySelectorAll("[data-remote-flag]").forEach(b=>b.addEventListener("click",()=>{var y;return Qs(b.dataset.remoteFlag==="block"?"block":"report",h,{category:((y=a.querySelector("[data-report-category]"))==null?void 0:y.value)||""})}));const g=async()=>{var k;const b=a.querySelector("#remoteMsgInput"),y=(k=b==null?void 0:b.value)==null?void 0:k.trim();if(!y)return f("Type a message");try{await kt.send(p,y);const S=await kt.get(p);a.innerHTML=Fo(S,t.id),jd(e),f("Sent")}catch(S){f((S==null?void 0:S.code)==="email_unverified"?"Verify your email before sending messages":(S==null?void 0:S.message)||"Could not send")}};(d=a.querySelector("#remoteMsgSend"))==null||d.addEventListener("click",g),(c=a.querySelector("#remoteMsgInput"))==null||c.addEventListener("keydown",b=>{b.key==="Enter"&&(b.preventDefault(),g())});const v=a.querySelector("#remoteMsgThread");v&&(v.scrollTop=v.scrollHeight)}catch(m){a.innerHTML=(m==null?void 0:m.status)===404?'<div class="card muted">Conversation not found or unavailable.</div>':`<div class="card muted">Could not load conversation: ${l((m==null?void 0:m.message)||"Unknown error")}</div>`}}}function qy(e){var o,r,d;const t=I().user;if(Di())return Oy(e,t);if(!t)return Py();ma(),Un();const s=((o=e==null?void 0:e.query)==null?void 0:o.view)||"",a=((r=e==null?void 0:e.query)==null?void 0:r.t)||"",i=((d=e==null?void 0:e.query)==null?void 0:d.priority)==="1";let n;if(a){const c=xl(a);c?n=Dy(c,{teamPriorityHint:i&&c.peerId==="dbs"}):n='<div class="card"><p class="muted">Thread not found.</p><button type="button" class="btn" id="msgBackInbox">← Inbox</button></div>'}else s==="new"?n=My():s==="team"?n=Ly():n=Iy();return P("Messages",n,{lead:"DMs, group chats, and creator messages · TEST MODE"})}function Ry(e,t,{go:s=ce}={}){e.querySelectorAll("[data-flag]").forEach(a=>{a.addEventListener("click",()=>{var n;if(!t)return;const i=a.dataset.flag;if(i==="mute"){const o=Gi(t.id,{muted:!t.muted});f(o.muted?"Muted":"Unmuted")}else if(i==="block")Gi(t.id,{blocked:!t.blocked}).blocked?Qs("block",ta(t)):f("Unblocked on this device");else if(i==="report"){const o=((n=e.querySelector("[data-report-category]"))==null?void 0:n.value)||"";if(!o){Qs("report","",{category:o});return}Gi(t.id,{report:!0}),Qs("report",ta(t),{category:o})}s("#/messages?t="+encodeURIComponent(t.id))})})}function Ny(e){var c,p,m,h,g,v,b,y,k,S,x,w,A,M,q,$,U;const t=I().user;if(Di()){jd(e);return}if(!t)return;const s=()=>ce("#/messages");(c=e.querySelector("#msgBackInbox"))==null||c.addEventListener("click",s),(p=e.querySelector("#msgMarkAllRead"))==null||p.addEventListener("click",()=>{const L=Gn().filter(B=>Va(B)>0);L.length&&(L.forEach(B=>jr(B.id)),f(`${L.length} conversation${L.length===1?"":"s"} marked read`),ce("#/messages"))}),(m=e.querySelector("#msgNewChat"))==null||m.addEventListener("click",()=>ce("#/messages?view=new")),(h=e.querySelector("#pikkNewChatTop"))==null||h.addEventListener("click",()=>ce("#/messages?view=new"));const a=()=>{var ke,H;const L=String(((ke=e.querySelector("#pikkMsgSearch"))==null?void 0:ke.value)||"").trim().toLowerCase(),B=!!((H=e.querySelector("#pikkMsgUnreadOnly"))!=null&&H.checked);let W=0;e.querySelectorAll("#msgInbox [data-open-thread]").forEach(se=>{const we=!L||String(se.dataset.search||"").includes(L),z=!B||se.dataset.unread==="true";se.hidden=!(we&&z),se.hidden||W++});const D=e.querySelectorAll("#msgInbox [data-open-thread]").length,O=e.querySelector("#pikkMsgResultCount");O&&(O.textContent=Kd(W,D,!!(L||B)));const N=e.querySelector("#pikkMsgNoResults");N&&(N.textContent=B?L?"No unread conversations match your search.":"No unread conversations.":"No conversations match your search.",N.hidden=W>0||!L&&!B);const te=e.querySelector("#pikkMsgClearFilters");te&&(te.hidden=!L&&!B)};(g=e.querySelector("#pikkMsgClearFilters"))==null||g.addEventListener("click",()=>{const L=e.querySelector("#pikkMsgSearch"),B=e.querySelector("#pikkMsgUnreadOnly");L&&(L.value=""),B&&(B.checked=!1),a(),L==null||L.focus()});const i=e.querySelector("#pikkMsgSearch");i==null||i.addEventListener("input",a),i==null||i.addEventListener("keydown",L=>{L.key!=="Escape"||!i.value||(L.preventDefault(),L.stopPropagation(),i.value="",a())}),(v=e.querySelector("#pikkMsgUnreadOnly"))==null||v.addEventListener("change",a),(b=e.querySelector("#msgEmptyNew"))==null||b.addEventListener("click",()=>ce("#/messages?view=new")),(y=e.querySelector("#msgOpenTeam"))==null||y.addEventListener("click",()=>ce("#/messages?view=team")),(k=e.querySelector("#pikkGroupTop"))==null||k.addEventListener("click",()=>{var L;return(L=e.querySelector("#msgOpenGroup"))==null?void 0:L.click()}),(S=e.querySelector("#msgOpenGroup"))==null||S.addEventListener("click",()=>{const L=au();if(L!=null&&L.error){f("Sign in required");return}f("Opened DBS Fans"),ce("#/messages?t="+encodeURIComponent(L.id))}),(x=e.querySelector("#msgTeamFree"))==null||x.addEventListener("click",()=>{const L=Js("dbs","DatBoiSkeet");if(L.error)return f("Sign in required");ce("#/messages?t="+encodeURIComponent(L.id))}),(w=e.querySelector("#msgTeamPriority"))==null||w.addEventListener("click",()=>{const L=Js("dbs","DatBoiSkeet");if(L.error)return f("Sign in required");ce("#/messages?t="+encodeURIComponent(L.id)+"&priority=1")}),e.querySelectorAll("[data-start-peer]").forEach(L=>{L.addEventListener("click",()=>{const B=L.dataset.startPeer,W=L.dataset.peerName||B;if(B==="dbs"){ce("#/messages?view=team");return}const D=Js(B,W,{peerHandle:L.dataset.peerHandle||""});if(D.error)return f("Sign in required");D.request&&f("Request thread created · demo"),ce("#/messages?t="+encodeURIComponent(D.id))})}),e.querySelectorAll("[data-open-thread]").forEach(L=>{L.addEventListener("click",()=>{ce("#/messages?t="+encodeURIComponent(L.dataset.openThread))})}),(A=e.querySelector("#msgPrefDMs"))==null||A.addEventListener("change",L=>{Fr({allowDMs:!!L.target.checked}),f(L.target.checked?"DMs allowed":"DMs disabled (stub)")}),(M=e.querySelector("#msgPrefRequests"))==null||M.addEventListener("change",L=>{Fr({allowRequests:!!L.target.checked}),f(L.target.checked?"Requests allowed":"Requests disabled (stub)")});const n=new URLSearchParams(location.hash.split("?")[1]||"").get("t"),o=n?xl(n):null;o&&jr(o.id),Ry(e,o);const r=L=>{if(!o)return;const B=e.querySelector("#msgInput"),W=(B==null?void 0:B.value)||"";let D;if(o.kind==="group"?D=iu(o.id,W):D=tu(o.peerId,o.peerName,W,{priority:!!L}),(D==null?void 0:D.error)==="empty")return f("Type a message");if(D!=null&&D.error)return f("Could not send");f(L?"Priority sent · TEST MODE $2.99 not charged":"Sent"),ce("#/messages?t="+encodeURIComponent(o.id))};(q=e.querySelector("#msgSend"))==null||q.addEventListener("click",()=>r(!1)),($=e.querySelector("#msgSendPriority"))==null||$.addEventListener("click",()=>r(!0)),(U=e.querySelector("#msgInput"))==null||U.addEventListener("keydown",L=>{L.key==="Enter"&&(L.preventDefault(),r(!1))});const d=e.querySelector("#msgThread");d&&(d.scrollTop=d.scrollHeight)}const Go=Object.freeze({releases:!0,lives:!0,messages:!0,quietHours:!1}),Ut=Object.freeze([{key:"releases",title:"New music releases",detail:"Keep track of new DatBoiSkeet music and official drops.",group:"discover"},{key:"lives",title:"Livestreams",detail:"Choose whether you want live-session updates.",group:"discover"},{key:"messages",title:"Messages",detail:"Control conversation notification preferences.",group:"social"},{key:"quietHours",title:"Quiet hours",detail:"Save your preference for a quieter experience.",group:"social"}]);function Uo(e,t){const s=!!t[e.key];return`<label class="pikk-notif-row" for="pikk-notif-${e.key}">
    <span class="pikk-notif-row-copy"><strong>${e.title}</strong><small>${e.detail}</small></span>
    <input id="pikk-notif-${e.key}" type="checkbox" data-k="${e.key}" ${s?"checked":""} />
  </label>`}function By(){const e=I().notifications||{},t=Ut.filter(s=>!!e[s.key]).length;return P("Notifications",`
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
          ${Ut.filter(s=>s.group==="discover").map(s=>Uo(s,e)).join("")}
        </section>
        <section class="pikk-notif-panel" aria-labelledby="pikkNotifSocialTitle">
          <div class="pikk-notif-panel-head"><span class="pikk-notif-panel-icon" aria-hidden="true">✉</span><div><span class="pikk-notif-kicker">YOUR SPACE</span><h3 id="pikkNotifSocialTitle">Social &amp; Focus</h3></div></div>
          ${Ut.filter(s=>s.group==="social").map(s=>Uo(s,e)).join("")}
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
    </div>`,{lead:"Music, live and social preferences · browser-local demo."})}function Ky(e){var a,i,n;const t=e.querySelector("#notifPrefs");if(!t)return;const s=o=>{const r=["releases","lives","messages"];ji(Object.fromEntries(r.map(h=>[h,o]))),t.querySelectorAll("input[data-k]").forEach(h=>{r.includes(h.dataset.k)&&(h.checked=o)});const d=I().notifications||{},c=Ut.filter(h=>!!d[h.key]).length,p=t.querySelector("#pikkNotifEnabled");p&&(p.textContent=`${c} of 4`);const m=t.querySelector("#pikkNotifStatus");m&&(m.textContent=o?"Music, live and message preferences resumed on this device. Real push delivery is not connected.":"Music, live and message preferences paused on this device. Real push delivery is not connected."),f(o?"Alerts resumed":"Alerts paused")};(a=t.querySelector("#pikkNotifPause"))==null||a.addEventListener("click",()=>s(!1)),(i=t.querySelector("#pikkNotifResume"))==null||i.addEventListener("click",()=>s(!0)),(n=t.querySelector("#pikkNotifReset"))==null||n.addEventListener("click",()=>{ji(Go),t.querySelectorAll("input[data-k]").forEach(d=>{d.checked=Go[d.dataset.k]});const o=t.querySelector("#pikkNotifEnabled");o&&(o.textContent="3 of 4");const r=t.querySelector("#pikkNotifStatus");r&&(r.textContent="Notification preferences restored to defaults on this device."),f("Defaults restored")}),t.querySelectorAll("input[data-k]").forEach(o=>{o.addEventListener("change",()=>{const r=o.dataset.k;if(!Ut.some(h=>h.key===r))return;ji({[r]:o.checked});const d=I().notifications||{},c=Ut.filter(h=>!!d[h.key]).length,p=t.querySelector("#pikkNotifEnabled");p&&(p.textContent=`${c} of 4`);const m=t.querySelector("#pikkNotifStatus");m&&(m.textContent=`${Ut.find(h=>h.key===r).title} preference saved on this device.`),f("Preference saved")})})}function Nt(){K("#/wallet")}function G(e){return"$"+Number(e||0).toFixed(2)}function Ia(e){return Number(e||0).toLocaleString()}const jy={pending:"Pending",completed:"Completed",rejected:"Rejected"};function Fy(){const{wallet:e,user:t,coins:s}=I(),a=e||{balance:0,history:[]},i=yi(),n=[...(s==null?void 0:s.history)||[]].slice(0,10),o=Gp(),r=sa(),d=zn().filter($=>$.count>0),c=wl(t==null?void 0:t.id),p=[...a.history||[]].slice(-12).reverse(),m=[...r.earnings||[]].slice(0,20),h=r.payouts||[],g=h.find($=>$.status==="pending"),v=!g&&r.available>=r.threshold,b=r.verification==="demo_verified",y=p.length>0?`<ul class="list-plain">${p.map($=>`<li>
          <span>${l($.note||"Entry")}<br/><span class="muted" style="font-size:12px">${j($.at)}</span></span>
          <strong style="color:${Number($.amount)>=0?"var(--ok,#6dffb0)":"inherit"}">${Number($.amount)>=0?"+":""}${G($.amount)}</strong>
        </li>`).join("")}</ul>`:'<p class="muted" style="margin:0">No fan USD credit activity yet.</p>',k=o.map($=>{const U=`pack_${$.coins}`;return`<button type="button" class="card coin-pack-btn" data-coins="${$.coins}" id="${l(U)}" style="text-align:left;cursor:pointer;margin:0;padding:12px;border:1px solid rgba(255,255,255,.08);background:#12121a">
        <div style="font-size:20px;font-weight:900">${Ia($.coins)} <span class="muted" style="font-size:13px;font-weight:600">coins</span></div>
        <div class="muted" style="font-size:13px;margin-top:4px">${G($.usd)} · TEST MODE</div>
        <div style="margin-top:8px"><span class="chip">Buy · demo credit</span></div>
      </button>`}).join(""),S=n.length>0?`<ul class="list-plain">${n.map($=>{const U=Number($.amount)||0;return`<li>
          <span>${l($.note||"Coins")}<br/><span class="muted" style="font-size:12px">${j($.at)}</span></span>
          <strong style="color:${U>=0?"var(--ok,#6dffb0)":"inherit"}">${U>=0?"+":""}${Ia(U)}</strong>
        </li>`}).join("")}</ul>`:'<p class="muted" style="margin:0">No coin purchases or gifts yet. Buy a pack below for Live gifts.</p>',x=c.length>0?`<ul class="list-plain">${c.slice(0,8).map($=>`<li>
          <span>
            <strong>${l($.note||$.label||"Live gift")}</strong>
            <span class="chip">80/20 NET</span>
            ${$.giftSlug?`<span class="chip">${l($.giftSlug)}</span>`:""}
            <br/><span class="muted" style="font-size:12px">gross ${G($.gross)} · fees ${G($.fees)} · net ${G($.net)} · ${j($.at)}</span>
          </span>
          <span style="text-align:right;font-size:13px">
            <strong>${G($.creatorShare)}</strong><br/>
            <span class="muted">PIKK ${G($.dbsShare)}</span>
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
          ${d.map($=>`<tr style="border-top:1px solid rgba(255,255,255,.06)">
            <td style="padding:8px 4px"><strong>${l($.label)}</strong><br/><span class="muted" style="font-size:11px">${$.creatorPct}/${$.dbsPct} · ${$.count} line${$.count===1?"":"s"}</span></td>
            <td style="padding:8px 4px">${G($.gross)}</td>
            <td style="padding:8px 4px">${G($.fees)}</td>
            <td style="padding:8px 4px">${G($.net)}</td>
            <td style="padding:8px 4px"><strong>${G($.creatorShare)}</strong></td>
            <td style="padding:8px 4px">${G($.dbsShare)}</td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>
    <p class="muted" style="font-size:12px;margin:8px 0 0">Default fees = demo 2.9% + $0.30. <strong>Live catalog gifts (t185u)</strong> treat listed USD as NET (fees $0) then 80/20. Seeded rows labeled in ledger.</p>`:'<p class="muted" style="margin:0">No creator earnings yet. Load demo earnings or receive Live tips/gifts.</p>',A=m.length>0?`<ul class="list-plain">${m.map($=>`<li>
          <span>
            <strong>${l($.label)}</strong>
            ${$.payoutId?'<span class="chip">In payout</span>':'<span class="chip">Open</span>'}
            ${$.source==="seed"?'<span class="chip">Demo seed</span>':""}
            ${$.source==="live_gift"?'<span class="chip">Coin gift</span>':""}
            <br/><span class="muted" style="font-size:12px">${l($.note)} · ${j($.at)}</span>
          </span>
          <span style="text-align:right;font-size:13px">
            <strong>${G($.creatorShare)}</strong><br/>
            <span class="muted">gross ${G($.gross)}</span>
          </span>
        </li>`).join("")}</ul>`:"",M=h.length>0?h.map($=>`<div class="card" style="margin:0 0 10px;background:#12121a" data-payout="${l($.id)}">
        <div class="row wrap">
          <strong>${G($.amount)}</strong>
          <span class="chip">${l(jy[$.status]||$.status)}</span>
          <span class="muted spacer" style="text-align:right;font-size:12px">${j($.at)}</span>
        </div>
        <p class="muted" style="margin:6px 0;font-size:12px">${l($.note||"Payout")} · ${($.earningIds||[]).length} earning line(s)</p>
        ${$.status==="pending"?`<div class="row wrap">
                <button class="btn primary payout-status" data-id="${l($.id)}" data-status="completed">Mark completed · demo</button>
                <button class="btn ghost payout-status" data-id="${l($.id)}" data-status="rejected">Reject · release hold</button>
              </div>`:$.reviewedAt?`<p class="muted" style="margin:0;font-size:12px">Reviewed ${j($.reviewedAt)}</p>`:""}
      </div>`).join(""):'<p class="muted">No payout requests yet.</p>',q=`
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
        <div class="pikk-wallet-metric"><span>Gift coins</span><strong>${Ia(i)}</strong><small>Live gifting · demo</small></div>
        <div class="pikk-wallet-metric"><span>Fan USD credits</span><strong>${G(a.balance)}</strong><small>Tips and requests · demo</small></div>
        <div class="pikk-wallet-metric"><span>Creator available</span><strong>${G(r.available)}</strong><small>Eligible balance · demo</small></div>
        <div class="pikk-wallet-metric"><span>Creator on hold</span><strong>${G(r.holds)}</strong><small>Payout review · demo</small></div>
      </section>
    <div class="card">
      <div class="row wrap">
        <span class="chip">TEST MODE · not real money</span>
        <span class="chip">${b?"Identity / tax · demo verified":"Identity / tax verification · demo"}</span>
        <button class="btn ghost" id="cwVerify" style="margin-left:auto">${b?"Clear demo verify":"Mark verified · demo"}</button>
      </div>
      <p class="muted" style="margin:10px 0 0;font-size:13px">Fan <strong>coins</strong> (Live gifts) stay separate from fan USD credits and creator redeemable balances. No real processors, KYC, or charges.</p>
    </div>

    <div class="card" id="wallet-coins">
      <div class="row wrap">
        <h3 style="margin:0">Gift coins</h3>
        <span class="chip">t185u · 100 coins = $2</span>
        <span class="chip">TEST MODE</span>
      </div>
      <div style="font-size:32px;font-weight:900;margin-top:8px">${Ia(i)} <span class="muted" style="font-size:16px;font-weight:600">coins</span></div>
      <p class="muted" style="margin:4px 0 12px">≈ ${G(i*.02)} · stored in <code>dbs_v1.coins</code> (not USD <code>wallet</code>). Used for Live gift tray.</p>
      <h4 style="margin:0 0 8px;font-size:14px">Buy coin pack</h4>
      <div class="grid-2" style="gap:10px">${k}</div>
      <p class="muted" style="font-size:12px;margin:10px 0 0">No discounts · packs ${vi.map($=>`${$.coins}/$${$.usd}`).join(" · ")}. Demo credit only — no payment processor.</p>
      <h4 style="margin:16px 0 8px;font-size:14px">Recent coin activity</h4>
      ${S}
      <div class="row wrap" style="margin-top:12px">
        <a class="btn ghost" href="#/live">Go to Live · send gifts</a>
        <a class="btn ghost" href="#/earnings?cat=gifts">Gift earnings</a>
      </div>
    </div>

    <div class="card">
      <h3>Fan spendable USD credits</h3>
      <div style="font-size:32px;font-weight:900">${G(a.balance)}</div>
      <p class="muted" style="margin:4px 0 12px">Tips &amp; song requests on this device (<code>dbs_v1.wallet</code>). Separate from gift coins.</p>
      <div class="row wrap">
        <button class="btn primary" id="fanCredit5">Add $5 demo credit</button>
        <button class="btn" id="fanCredit25">Add $25</button>
        <a class="btn ghost" href="#/live">Go to Live</a>
      </div>
      <h4 style="margin:16px 0 8px;font-size:14px">Recent fan USD activity</h4>
      ${y}
    </div>

    <div class="card">
      <h3>Creator redeemable balance</h3>
      <div class="grid-2">
        <div>
          <p class="muted" style="margin:0;font-size:12px">Available to payout</p>
          <div style="font-size:28px;font-weight:900">${G(r.available)}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Holds / in review</p>
          <div style="font-size:28px;font-weight:900">${G(r.holds)}</div>
        </div>
      </div>
      <div class="row wrap" style="margin-top:10px">
        <span class="chip">Threshold ${G(r.threshold)}</span>
        <span class="chip">Holds / refunds · demo</span>
        ${g?'<span class="chip">Payout pending</span>':""}
      </div>
      <div class="row wrap" style="margin-top:12px">
        <button class="btn primary" id="cwPayout" ${v?"":"disabled"}>Request payout · TEST MODE</button>
        <button class="btn" id="cwSeed">${(r.earnings||[]).length?"Reload demo earnings":"Load demo earnings"}</button>
        <a class="btn ghost" href="#/earnings">Earnings overview</a>
      </div>
      ${v?'<p class="muted" style="margin:10px 0 0;font-size:12px">Moves available → holds and locks those earning lines until completed or rejected.</p>':`<p class="muted" style="margin:10px 0 0;font-size:12px">${g?"Finish or reject the pending payout before requesting another (anti double-payout).":`Need at least ${G(r.threshold)} available · currently ${G(r.available)}.`}</p>`}
      <p class="chip" style="margin-top:10px">Signed in as ${l((t==null?void 0:t.username)||"guest")}</p>
    </div>

    <div class="card" id="wallet-gift-earnings">
      <h3>Live gift earnings · creator view</h3>
      <p class="muted" style="margin:0 0 10px;font-size:13px">80% creator / 20% PIKK on NET catalog gifts. Not shown on Live / gift tray.</p>
      ${x}
    </div>

    <div class="card">
      <h3>Earnings breakdown</h3>
      <p class="muted" style="margin:0 0 10px">Gifts, tips, subscriptions, referrals, Clippers, sponsorships, merch/affiliate — gross → fees → net → creator% / PIKK%.</p>
      ${w}
      ${A?`<h4 style="margin:16px 0 8px;font-size:14px">Ledger (recent)</h4>${A}`:""}
    </div>

    <div class="card">
      <h3>Payout history</h3>
      <p class="muted" style="margin:0 0 10px">On-device demo approve / reject. Completed funds leave holds; rejected releases hold and untags earnings.</p>
      ${M}
    </div>
    </div>
  `;return P("Wallet & Payouts",q,{lead:"Creator Wallet & Payout Center · gift coins + fan USD · TEST MODE."})}function Gy(e){var t,s,a,i,n;e.querySelectorAll(".coin-pack-btn").forEach(o=>{o.addEventListener("click",()=>{const r=Number(o.dataset.coins),d=kl(r);if((d==null?void 0:d.error)==="bad_package")return f("Unknown pack");if(d!=null&&d.error)return f("Could not buy coins");f(`+${r.toLocaleString()} coins · TEST MODE`),Nt()})}),(t=e.querySelector("#fanCredit5"))==null||t.addEventListener("click",()=>{Ha(5,"Demo credit +$5"),f("+$5 fan credits"),Nt()}),(s=e.querySelector("#fanCredit25"))==null||s.addEventListener("click",()=>{Ha(25,"Demo credit +$25"),f("+$25 fan credits"),Nt()}),(a=e.querySelector("#cwSeed"))==null||a.addEventListener("click",()=>{const o=(sa().earnings||[]).length>0,r=Cl({force:!0});f(o?"Demo earnings reloaded":`Loaded ${r.seeded||0} demo lines`),Nt()}),(i=e.querySelector("#cwPayout"))==null||i.addEventListener("click",()=>{const o=ou();if((o==null?void 0:o.error)==="pending_exists")return f("Payout already pending");if((o==null?void 0:o.error)==="below_threshold")return f("Below payout threshold");if(o!=null&&o.error)return f("Could not request payout");f("Payout requested · held"),Nt()}),(n=e.querySelector("#cwVerify"))==null||n.addEventListener("click",()=>{const r=sa().verification!=="demo_verified";cu(r),f(r?"Demo verified":"Verification cleared"),Nt()}),e.querySelectorAll(".payout-status").forEach(o=>{o.addEventListener("click",()=>{const r=lu(o.dataset.id,o.dataset.status);if(r!=null&&r.error)return f("Could not update payout");f("Payout "+o.dataset.status),Nt()})})}function Vo(e){K(e||"#/earnings")}function ne(e){return"$"+Number(e||0).toFixed(2)}const Fd=[{id:"all",label:"All"},{id:"gifts",label:"Gifts"},{id:"tips",label:"Tips"},{id:"subscriptions",label:"Subscriptions"},{id:"clippers",label:"Clippers"},{id:"referrals",label:"Referrals"},{id:"sponsorships",label:"Sponsorships"},{id:"merch",label:"Merch"}];function Gd(){var t;const e=(((t=Ke().query)==null?void 0:t.cat)||"all").toLowerCase();return Fd.some(s=>s.id===e)?e:"all"}function Uy(e){return(e||[]).reduce((t,s)=>(t.gross+=Number(s.gross)||0,t.fees+=Number(s.fees)||0,t.net+=Number(s.net)||0,t.creatorShare+=Number(s.creatorShare)||0,t.dbsShare+=Number(s.dbsShare)||0,t),{gross:0,fees:0,net:0,creatorShare:0,dbsShare:0})}function Rs(e){return Math.round(Number(e)*100)/100}function Vy(){const e=sa(),t=ru(),s=Gd(),a=[...e.earnings||[]].sort((b,y)=>(y.at||0)-(b.at||0)),i=s==="all"?a:a.filter(b=>b.category===s||s==="subscriptions"&&b.category==="paid_content"),n=Uy(a),o=zn(),r=wl(),d=s==="gifts"?`<div class="card" style="margin:0 0 12px;background:#12121a">
      <div class="row wrap">
        <span class="chip">t185u · catalog gifts</span>
        <span class="chip">80% creator / 20% PIKK · NET</span>
        <span class="chip">TEST MODE · listed USD = net</span>
      </div>
      <p class="muted" style="margin:8px 0 0;font-size:13px">Coin gifts from Live use <code>sendLiveGift</code> → creator earnings here. Viewers on Live / gift tray never see this split. ${r.length?`${r.length} gift line(s) on device.`:"Send a catalog gift on an active Live to populate."}</p>
    </div>`:"",c=Fd.map(b=>{const y=b.id==="all"?"#/earnings":`#/earnings?cat=${b.id}`,k=b.id==="all"?a.length:a.filter(x=>x.category===b.id||b.id==="subscriptions"&&x.category==="paid_content").length,S=s===b.id;return`<a class="chip earn-filter${S?" active":""}" href="${y}" data-cat="${l(b.id)}" style="${S?"outline:1px solid var(--accent,#6dffb0);font-weight:700":""}">${l(b.label)}${k?` · ${k}`:""}</a>`}).join(""),p=Object.entries(t).map(([b,y])=>`<tr style="border-top:1px solid rgba(255,255,255,.06)">
        <td style="padding:8px 4px"><strong>${l(y.label)}</strong><br/><span class="muted" style="font-size:11px">${l(b)}</span></td>
        <td style="padding:8px 4px">${y.creatorPct}%</td>
        <td style="padding:8px 4px">${y.dbsPct}%</td>
      </tr>`).join(""),m=Object.entries(t).map(([b,y])=>`<option value="${l(b)}">${l(y.label)}</option>`).join(""),h=o.filter(b=>b.count>0).length>0?`<div style="overflow-x:auto;margin-top:8px">
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
          ${o.filter(b=>b.count>0).map(b=>`<tr style="border-top:1px solid rgba(255,255,255,.06)">
            <td style="padding:8px 4px"><strong>${l(b.label)}</strong><br/><span class="muted" style="font-size:11px">${b.creatorPct}/${b.dbsPct} · ${b.count} line${b.count===1?"":"s"}</span></td>
            <td style="padding:8px 4px">${ne(b.gross)}</td>
            <td style="padding:8px 4px">${ne(b.fees)}</td>
            <td style="padding:8px 4px">${ne(b.net)}</td>
            <td style="padding:8px 4px"><strong>${ne(b.creatorShare)}</strong></td>
            <td style="padding:8px 4px">${ne(b.dbsShare)}</td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>`:"",g=i.length>0?`<ul class="list-plain">${i.map(b=>`<li style="align-items:flex-start">
          <span style="flex:1;min-width:0">
            <strong>${l(b.label||b.category)}</strong>
            ${b.payoutId?'<span class="chip">In payout</span>':'<span class="chip">Open</span>'}
            ${b.source==="seed"?'<span class="chip">Demo seed</span>':""}
            <br/><span class="muted" style="font-size:12px">${l(b.note||"")} · ${j(b.at)}</span>
            <br/><span class="muted" style="font-size:11px">gross ${ne(b.gross)} → fees ${ne(b.fees)} → net ${ne(b.net)} · creator ${b.creatorPct}% / PIKK ${b.dbsPct}%</span>
          </span>
          <span style="text-align:right;font-size:13px;white-space:nowrap">
            <strong>${ne(b.creatorShare)}</strong><br/>
            <span class="muted">PIKK ${ne(b.dbsShare)}</span>
          </span>
        </li>`).join("")}</ul>`:a.length===0?`<p class="muted" style="margin:0 0 12px">No earnings yet. Load demo lines or record a single demo earning below.</p>
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
          <div style="font-size:26px;font-weight:900">${ne(e.available)}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Holds / in review</p>
          <div style="font-size:26px;font-weight:900">${ne(e.holds)}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Lifetime creator share</p>
          <div style="font-size:22px;font-weight:800">${ne(Rs(n.creatorShare))}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Lifetime PIKK share</p>
          <div style="font-size:22px;font-weight:800">${ne(Rs(n.dbsShare))}</div>
        </div>
      </div>
      <div class="row wrap" style="margin-top:10px">
        <span class="chip">Lifetime gross ${ne(Rs(n.gross))}</span>
        <span class="chip">Fees ${ne(Rs(n.fees))}</span>
        <span class="chip">Net ${ne(Rs(n.net))}</span>
        <span class="chip">Threshold ${ne(e.threshold)}</span>
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
      ${h?`<h4 style="margin:16px 0 0;font-size:14px">Totals by source (this device)</h4>${h}`:""}
    </div>

    <div class="card">
      <h3>Earnings ledger</h3>
      ${d}
      <div class="row wrap" style="margin:0 0 12px;gap:6px">${c}</div>
      ${g}
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
  `;return P("Creator Earnings",v,{lead:"Rewards, commissions & ledger · TEST MODE · payouts on Wallet (§27)."})}function Hy(e){var t,s;(t=e.querySelector("#earnSeed"))==null||t.addEventListener("click",()=>{const a=(sa().earnings||[]).length>0,i=Cl({force:!0});f(a?"Demo earnings reloaded":`Loaded ${i.seeded||0} demo lines`),Vo(Ho(Gd()))}),(s=e.querySelector("#earnDemoForm"))==null||s.addEventListener("submit",a=>{var d,c,p;a.preventDefault();const i=((d=e.querySelector("#earnCat"))==null?void 0:d.value)||"tips",n=Number((c=e.querySelector("#earnGross"))==null?void 0:c.value),o=(((p=e.querySelector("#earnNote"))==null?void 0:p.value)||"").trim()||"Manual demo earning";if(!(n>0))return f("Enter a positive gross amount");const r=Hn({category:i,gross:n,note:o,source:"manual_demo"});f(`Recorded ${ne(r.creatorShare)} creator share`),Vo(Ho(i))})}function Ho(e){return!e||e==="all"?"#/earnings":`#/earnings?cat=${e}`}function Bt(){K("#/missions")}const zo={song:"Song",album:"Album",video:"Video",live:"Livestream",app:"DBS App",interview:"Interview"};function zy(e){return"$"+Number(e||0).toFixed(0)}function Wy(e){const t=Number(e)||0;if(!t)return"No deadline";const s=t-Date.now();if(s<0)return`Ended ${Math.ceil(-s/864e5)}d ago`;const a=Math.ceil(s/864e5);return a<=1?"Due today / tomorrow":`${a}d left`}function Yy(e=14){return new Date(Date.now()+e*864e5).toISOString().slice(0,10)}function Ma(){const{user:e}=I();if(e)return e;const t=pa("DemoCreator");return f("Signed in as DemoCreator · local demo"),t||I().user}function Jy(){const{user:e}=I(),t=Si().sort((p,m)=>(m.createdAt||0)-(p.createdAt||0)),s=t.filter(p=>p.status==="active"||p.status==="paused"),a=t.filter(p=>p.status==="ended"||p.status==="draft"),i=new Set(t.flatMap(p=>(p.participants||[]).map(m=>m.userId).filter(Boolean))).size,n=t.reduce((p,m)=>p+(m.submissions||[]).length,0),o=p=>{const m=p.fundSource==="third_party"?'<span class="chip">20% management fee · disclosed</span>':'<span class="chip">DBS-funded · marketing expense</span>',h=Fu(p.id),g=e&&(p.participants||[]).some(S=>S.userId===e.id),v=(p.submissions||[]).filter(S=>e&&S.userId===e.id),b=h.length>0?h.slice(0,8).map((S,x)=>`<tr style="border-top:1px solid rgba(255,255,255,.06)">
              <td style="padding:6px 4px">${x+1}</td>
              <td style="padding:6px 4px"><strong>${l(S.username)}</strong>
                ${S.referralCode?`<br/><span class="muted" style="font-size:11px">${l(S.referralCode)}</span>`:""}
              </td>
              <td style="padding:6px 4px">${S.score}</td>
              <td style="padding:6px 4px">${S.submissions}</td>
            </tr>`).join(""):'<tr><td colspan="4" class="muted" style="padding:8px 4px">No participants yet — join to appear on the board.</td></tr>',y=(p.submissions||[]).length>0?`<ul class="list-plain" style="margin-top:8px">${(p.submissions||[]).slice(0,5).map(S=>`<li style="align-items:flex-start">
              <span style="flex:1;min-width:0">
                <strong>${l(S.username)}</strong>
                <span class="chip">${l(S.status||"pending")}</span>
                <br/><span style="font-size:13px">${l(S.proof)}</span>
                <br/><span class="muted" style="font-size:11px">${j(S.at)} · Manual review</span>
              </span>
            </li>`).join("")}</ul>`:'<p class="muted" style="margin:8px 0 0;font-size:13px">No proof submissions yet.</p>',k=p.status==="active"?`<div class="row wrap" style="margin-top:10px;gap:8px">
            ${g?`<span class="chip">Joined</span>
                   <button class="btn" data-bump="${l(p.id)}">+5 demo points</button>`:`<button class="btn primary" data-join="${l(p.id)}">Join mission</button>`}
            <button class="btn ghost" data-status="${l(p.id)}" data-next="paused">Pause</button>
            <button class="btn ghost" data-status="${l(p.id)}" data-next="ended">End mission</button>
          </div>
          ${g?`<form class="msn-proof" data-id="${l(p.id)}" style="display:grid;gap:8px;margin-top:12px;max-width:480px">
                  <div class="field"><label>Submit proof (URL or note)</label>
                    <input name="proof" placeholder="https://… or clip description" maxlength="400" required />
                  </div>
                  <button class="btn" type="submit">Submit for review · +10 pts</button>
                </form>`:""}`:p.status==="paused"?`<div class="row wrap" style="margin-top:10px;gap:8px">
              <button class="btn primary" data-status="${l(p.id)}" data-next="active">Resume</button>
              <button class="btn ghost" data-status="${l(p.id)}" data-next="ended">End mission</button>
            </div>`:`<div class="row wrap" style="margin-top:10px"><span class="chip">Archive · ${l(p.status)}</span></div>`;return`<article class="card pikk-mission-card" data-mission="${l(p.id)}">
      <div class="row wrap">
        <span class="chip">${l(zo[p.promoteType]||p.promoteType)}</span>
        <span class="chip">${l(p.status)}</span>
        <span class="chip">Budget ${zy(p.budget)}</span>
        <span class="chip">${l(Wy(p.deadline))}</span>
        ${m}
        <span class="muted spacer" style="text-align:right;font-size:12px">${j(p.createdAt)}</span>
      </div>
      <h3 style="margin:10px 0 4px">${l(p.title)}</h3>
      <p class="muted" style="margin:0 0 6px;font-size:13px">${l(p.reward||"")}</p>
      <p class="muted" style="margin:0;font-size:12px">
        Fund: <strong>${p.fundSource==="third_party"?"Third-party":"DBS"}</strong>
        ${p.fundSource==="third_party"?" · 20% management fee (disclosed)":" · not a creator commission — marketing expense"}
        · ${(p.participants||[]).length} joined · ${(p.submissions||[]).length} submissions
        ${g?` · your proofs: ${v.length}`:""}
      </p>
      ${k}
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
          <tbody>${b}</tbody>
        </table>
      </div>
      <h4 style="margin:14px 0 0;font-size:14px">Submissions</h4>
      ${y}
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
              ${Object.entries(zo).map(([p,m])=>`<option value="${p}">${l(m)}</option>`).join("")}
            </select>
          </div>
          <div class="field"><label>Budget (USD)</label><input name="budget" id="msnBudget" type="number" min="0" step="1" value="500" /></div>
        </div>
        <div class="grid-2">
          <div class="field"><label>Deadline</label><input name="deadline" id="msnDeadline" type="date" value="${Yy(14)}" /></div>
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
  `;return P("Missions",c,{lead:"Promotional campaigns · Clippers & creators · TEST MODE (§6)."})}function Qy(e){var t,s,a;(t=e.querySelector("#msnSeed"))==null||t.addEventListener("click",()=>{const i=Si().length>0,n=Gu({force:!0});f(i?"Demo missions reloaded":`Loaded ${n.seeded||0} demo missions`),Bt()}),(s=e.querySelector("#msnSignIn"))==null||s.addEventListener("click",()=>{Ma(),Bt()}),(a=e.querySelector("#msnCreate"))==null||a.addEventListener("submit",i=>{var h,g,v,b,y,k;i.preventDefault();const n=((h=e.querySelector("#msnTitle"))==null?void 0:h.value)||"",o=((g=e.querySelector("#msnType"))==null?void 0:g.value)||"app",r=Number((v=e.querySelector("#msnBudget"))==null?void 0:v.value)||0,d=((b=e.querySelector("#msnDeadline"))==null?void 0:b.value)||"",c=((y=e.querySelector("#msnFund"))==null?void 0:y.value)||"dbs",p=((k=e.querySelector("#msnReward"))==null?void 0:k.value)||"",m=Ru({title:n,promoteType:o,budget:r,deadline:d,fundSource:c,reward:p,status:"active"});if(m.error)return f("Title required");f(`Mission created · ${m.title}`),Bt()}),e.querySelectorAll("[data-join]").forEach(i=>{i.addEventListener("click",()=>{Ma();const n=i.getAttribute("data-join"),o=Bu(n);if(o.error==="signin")return f("Sign in required");if(o.error==="already_joined")return f("Already joined");if(o.error==="not_active")return f("Mission not active");if(o.error)return f("Could not join");f("Joined mission · referral code assigned"),Bt()})}),e.querySelectorAll("[data-bump]").forEach(i=>{i.addEventListener("click",()=>{Ma();const n=i.getAttribute("data-bump"),o=ju(n,5);if(o.error)return f(o.error==="not_joined"?"Join first":"Bump failed");f("+5 demo points"),Bt()})}),e.querySelectorAll("[data-status]").forEach(i=>{i.addEventListener("click",()=>{const n=i.getAttribute("data-status"),o=i.getAttribute("data-next");if(Nu(n,o).error)return f("Status update failed");f(`Mission → ${o}`),Bt()})}),e.querySelectorAll("form.msn-proof").forEach(i=>{i.addEventListener("submit",n=>{var c;n.preventDefault(),Ma();const o=i.getAttribute("data-id"),r=((c=i.querySelector('[name="proof"]'))==null?void 0:c.value)||"",d=Ku(o,{proof:r});if(d.error==="required")return f("Enter a URL or note");if(d.error==="not_joined")return f("Join first");if(d.error==="not_active")return f("Mission not active");if(d.error)return f("Submit failed");f("Proof submitted · pending manual review · +10 pts"),Bt()})})}const Xy="AL:Alabama,AK:Alaska,AZ:Arizona,AR:Arkansas,CA:California,CO:Colorado,CT:Connecticut,DE:Delaware,FL:Florida,GA:Georgia,HI:Hawaii,ID:Idaho,IL:Illinois,IN:Indiana,IA:Iowa,KS:Kansas,KY:Kentucky,LA:Louisiana,ME:Maine,MD:Maryland,MA:Massachusetts,MI:Michigan,MN:Minnesota,MS:Mississippi,MO:Missouri,MT:Montana,NE:Nebraska,NV:Nevada,NH:New Hampshire,NJ:New Jersey,NM:New Mexico,NY:New York,NC:North Carolina,ND:North Dakota,OH:Ohio,OK:Oklahoma,OR:Oregon,PA:Pennsylvania,RI:Rhode Island,SC:South Carolina,SD:South Dakota,TN:Tennessee,TX:Texas,UT:Utah,VT:Vermont,VA:Virginia,WA:Washington,WV:West Virginia,WI:Wisconsin,WY:Wyoming,DC:District of Columbia".split(",").map(e=>e.split(":")),Zy=new Map(Xy.flatMap(([e,t])=>[[e.toLowerCase(),e],[t.toLowerCase(),e]])),Et=e=>String(e||"").trim().replace(/\s+/g," ").toLowerCase(),Wo=e=>Zy.get(Et(e))||Et(e),ek=(e,t)=>!t||[e.username,e.bio,e.title,e.text,e.hostName,e.artist,e.type].some(s=>Et(s).includes(t));function Ud({query:e="",keywordQuery:t,locationLabel:s=""}={}){const a=String(t===void 0?e:t).trim(),i=String(s||"").trim();return[a?"for “"+a+"”":"",i?"in "+i:""].filter(Boolean).join(" ")}function Yo(e,{city:t="",state:s=""}={}){if(!e||e.locationDiscoverable!==!0||e.private===!0||e.isPrivate===!0)return!1;const a=e.location&&typeof e.location=="object"?e.location:e;return!Et(a.city)||!Et(a.state)?!1:(!t||Et(a.city)===Et(t))&&(!s||Wo(a.state)===Wo(s))}function tk(e,{city:t="",state:s="",query:a=""}={}){const i=Et(a),n=h=>Yo(h,{city:t,state:s})&&ek(h,i),o=e.exploreDiscoverable===!0&&Yo(e.user,{city:t,state:s}),r=Object.values(e.profiles||{}).filter(h=>{var g;return(((g=e.user)==null?void 0:g.id)==null||h.id!==e.user.id||o)&&n(h)});e.exploreDiscoverable===!0&&n(e.user)&&!r.some(h=>h.id===e.user.id)&&r.push(e.user);const d=(e.posts||[]).filter(n),c=(e.catalog||[]).filter(h=>h.published===!0&&n(h)),p=e.live&&!e.live.endedAt&&n(e.live)?[{...e.live,status:"live"}]:[],m=(e.liveHistory||[]).filter(n).map(h=>({...h,status:"ended"}));return{query:String(a||"").trim()||"City & State",keywordQuery:String(a||"").trim(),locationLabel:[t,s].map(h=>String(h||"").trim()).filter(Boolean).join(", "),profiles:r,posts:d,music:c.filter(h=>h.type==="song"||h.type==="album"),videos:c.filter(h=>h.type==="video"),pictures:c.filter(h=>h.type==="picture"),lives:[...p,...m],products:(e.listings||[]).filter(h=>h.active!==!1&&n(h))}}const sk=[{id:"trending",label:"Trending"},{id:"following",label:"Following"},{id:"discover",label:"Discover"}];function ak(){return!!I().exploreDiscoverable}function De({href:e,title:t,meta:s,chip:a}){return`<a class="explore-hit" href="${l(e)}">
    <div>
      <strong>${l(t)}</strong>
      <div class="muted" style="font-size:12px;margin-top:2px">${l(s||"")}</div>
    </div>
    ${a?`<span class="chip">${l(a)}</span>`:""}
  </a>`}function vt(e,t,s){return t?`<div class="card explore-section">
    <h3>${l(e)}</h3>
    <div class="explore-hits">${t}</div>
  </div>`:`<div class="card explore-section">
      <h3>${l(e)}</h3>
      <p class="muted" style="margin:0">${l(s||"No matches")}</p>
    </div>`}function ri(e){if(!e||!e.query)return`<div class="card" id="exploreResults">
      <p class="muted" style="margin:0">Search creators, fans, songs, albums, videos, posts, livestreams, and products. Exact locations are never indexed.</p>
    </div>`;const t=l(Ud(e)),s=e.posts.length+e.profiles.length+e.music.length+e.videos.length+e.lives.length+e.products.length+e.pictures.length;if(!s)return`<div class="card" id="exploreResults">
      <p style="margin:0 0 6px"><strong>No results ${t}</strong></p>
      <p class="muted" style="margin:0">${e.locationLabel?"Only content explicitly opted into city/state discovery can appear here. No matching public location tags are available in this demo.":"Try another keyword, or browse Trending / Discover below. Report spam from a result’s destination page (demo shell)."}</p>
    </div>`;const a=e.posts.slice(0,8).map(h=>De({href:"#/posts",title:(h.text||"").slice(0,90)||"Post",meta:`@${h.username||"user"} · ${j(h.at||Date.now())}`,chip:"Post"})).join(""),i=e.profiles.slice(0,8).map(h=>De({href:`#/profile/${encodeURIComponent(h.id)}`,title:`@${h.username||h.id}`,meta:(h.bio||"Creator / fan").slice(0,80),chip:h.verified?"Verified":"Profile"})).join(""),n=e.music.slice(0,8).map(h=>De({href:"#/music",title:h.title,meta:`${h.artist||"Artist not credited"} · ${h.type}`,chip:h.type==="album"?"Album":"Song"})).join(""),o=e.videos.slice(0,8).map(h=>De({href:"#/videos",title:h.title,meta:`${h.artist||"Artist not credited"} · Video catalog`,chip:"Video"})).join(""),r=e.pictures.slice(0,8).map(h=>De({href:"#/home",title:h.title,meta:`${h.artist||"Creator not credited"} · picture`,chip:"Picture"})).join(""),d=e.lives.slice(0,8).map(h=>De({href:"#/live",title:h.title||"Livestream",meta:`@${h.hostName||"host"} · ${h.status==="live"?"LIVE now":"Ended"}`,chip:h.status==="live"?"Live":"Replay"})).join(""),c=e.products.slice(0,8).map(h=>De({href:"#/marketplace",title:h.title,meta:`${h.brand||"Brand"} · ${h.disclosure||"Sponsored"}`,chip:"Ad"})).join(""),p=e.query.toLowerCase(),m=e.locationLabel?"":[...us.filter(h=>h.title.toLowerCase().includes(p)||h.artist.toLowerCase().includes(p)||p.includes("music")||p.includes("song")||p.includes("album")).map(h=>De({href:"#/music",title:h.title,meta:`${h.artist} · ${h.status}`,chip:"Cover"})),...ue.filter(h=>h.title.toLowerCase().includes(p)||(h.artist||"").toLowerCase().includes(p)||p.includes("video")||p.includes("mv")).map(h=>De({href:"#/videos",title:h.title,meta:`${h.artist||"Artist not credited"} · Official MV`,chip:"MV"}))].join("");return`<div id="exploreResults">
    <p class="muted" style="margin:0 0 10px">${s} result${s===1?"":"s"} ${t}</p>
    ${vt("People",i,"No matching creators or fans")}
    ${vt("Posts",a,"No matching posts")}
    ${vt("Music (catalog)",n,"No published songs/albums")}
    ${vt("Videos (catalog)",o,"No published videos")}
    ${vt("Pictures",r,"No published pictures")}
    ${vt("Livestreams",d,"No live or history matches")}
    ${vt("Products / ads",c,"No marketplace listings")}
    ${m?vt("Music-based picks",m):""}
  </div>`}function ik(){const e=pu(10);return e.length?`<div class="section-swipe explore-trend">
    ${e.map(t=>`<a class="preview-card" href="${l(t.href)}">
        <strong>${l(t.title)}</strong>
        <span class="muted">${l(t.subtitle)}${t.score?` · ♥${t.score}`:""}</span>
      </a>`).join("")}
  </div>`:'<p class="muted">Nothing trending yet — like posts or publish catalog items.</p>'}function nk(){const e=I().user;if(!e)return'<div class="card"><p class="muted" style="margin:0">Sign in on <a href="#/profile">Profile</a> to see accounts you follow. Demo only — no exact locations.</p></div>';const t=e.following||[];return t.length?`<div class="card explore-section"><h3>Following</h3><div class="explore-hits">${t.map(a=>{var n;const i=((n=I().profiles)==null?void 0:n[a])||{id:a,username:a};return De({href:`#/profile/${encodeURIComponent(i.id)}`,title:`@${i.username||i.id}`,meta:(i.bio||"Following").slice(0,80),chip:"Following"})}).join("")}</div></div>`:`<div class="card"><p class="muted" style="margin:0">You're not following anyone yet. Discover suggested accounts below, then follow from their profile.</p></div>`}function rk(){const t=uu().slice(0,8).map(a=>De({href:`#/profile/${encodeURIComponent(a.id)}`,title:`@${a.username}`,meta:(a.bio||"Suggested").slice(0,80),chip:a.verified?"Verified":"Suggest"})).join(""),s=us.map(a=>De({href:"#/music",title:a.title,meta:`${a.artist} · music-based`,chip:"Cover"})).join("");return`
    <div class="card">
      <h3>Discoverability (opt-in)</h3>
      <p class="muted" style="margin:0 0 10px">Appear in Explore suggestions. Off by default. No exact locations stored or shown.</p>
      <label class="row" style="gap:8px;align-items:center">
        <input type="checkbox" id="exploreDiscoverable" ${ak()?"checked":""} />
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
    </div>`}function ok(){const e=I().exploreTab||"trending",t=sk.map(i=>`<button type="button" role="tab" id="explore-tab-${i.id}" aria-controls="explorePanel" aria-selected="${i.id===e}" tabindex="${i.id===e?0:-1}" class="shop-chip${i.id===e?" on":""}" data-explore-tab="${i.id}">${l(i.label)}</button>`).join("");let s="";e==="following"?s=nk():e==="discover"?s=rk():s=`<div class="card">
      <h3>Trending Across PIKK</h3>
      <p class="muted" style="margin:0 0 10px">High-engagement public posts and seeded demo cards (not a full engagement pipeline).</p>
      ${ik()}
    </div>
    <div id="exploreResultsWrap">${ri(null)}</div>`;const a=`
    <div class="card explore-search">
      <div class="field" style="margin-bottom:8px">
        <label for="exploreQ">Search PIKK</label>
        <input id="exploreQ" type="search" autocomplete="off" placeholder="Creators, fans, songs, albums, videos, posts, lives, products…" />
      </div>
      <div class="row wrap" style="gap:8px;margin-bottom:10px">
        <div class="field" style="flex:1 1 160px;min-width:0;margin:0">
          <label for="exploreCity">City (optional)</label>
          <input id="exploreCity" type="text" autocomplete="address-level2" placeholder="Houston" maxlength="80" />
        </div>
        <div class="field" style="flex:1 1 130px;min-width:0;margin:0">
          <label for="exploreState">State (optional)</label>
          <input id="exploreState" type="text" autocomplete="address-level1" placeholder="TX or Texas" maxlength="60" />
        </div>
      </div>
      <div class="row wrap" style="gap:8px">
        <button class="btn primary" type="button" id="exploreGo">Search</button>
        <button class="btn ghost" type="button" id="exploreClear">Clear</button>
      </div>
      <p class="muted" id="exploreSearchStatus" role="status" aria-live="polite" aria-atomic="true" style="margin:8px 0 0;font-size:12px">Ready to search PIKK.</p>
      <p class="muted" style="margin:10px 0 0;font-size:12px">City/state filters search only explicitly opted-in public location tags. Your own profile needs both location and Explore discoverability enabled. Demo data may have none. No GPS, precise addresses, real-time presence or backend.</p>
    </div>
    <div class="shop-chips" style="margin:0 0 12px" role="tablist" aria-label="Explore sections">${t}</div>
    <div id="explorePanel" role="tabpanel" aria-labelledby="explore-tab-${e}">${s}</div>
  `;return P("Explore",a,{lead:"Universal search & discovery across PIKK.",badge:"Phase 2 demo"})}function Jo(e,t){var d,c,p,m,h,g,v,b,y;const s=((d=e.querySelector("#exploreCity"))==null?void 0:d.value.trim())||"",a=((c=e.querySelector("#exploreState"))==null?void 0:c.value.trim())||"",i=s||a?tk(I(),{city:s,state:a,query:t}):du(t),n=e.querySelector("#exploreResultsWrap");if(n)n.innerHTML=ri(i);else{const k=e.querySelector("#explorePanel");if(k){let S=k.querySelector("#exploreLiveInsert");S||(S=document.createElement("div"),S.id="exploreLiveInsert",k.prepend(S)),S.innerHTML=ri(i)}}const o=(((p=i.posts)==null?void 0:p.length)||0)+(((m=i.profiles)==null?void 0:m.length)||0)+(((h=i.music)==null?void 0:h.length)||0)+(((g=i.videos)==null?void 0:g.length)||0)+(((v=i.lives)==null?void 0:v.length)||0)+(((b=i.products)==null?void 0:b.length)||0)+(((y=i.pictures)==null?void 0:y.length)||0),r=e.querySelector("#exploreSearchStatus");if(r){const k=Ud(i);r.textContent=i.query?`${o} result${o===1?"":"s"} ${k||"across PIKK"}.`:"Enter a keyword, city or state to search."}i.query&&f(o?`${o} result(s)`:"No matches")}function lk(e){var m;const t=e.querySelector("#exploreQ"),s=e.querySelector("#exploreGo"),a=e.querySelector("#exploreClear"),i=e.querySelector("#exploreCity"),n=e.querySelector("#exploreState"),o=()=>Jo(e,(t==null?void 0:t.value)||"");s==null||s.addEventListener("click",o);function r(){var v;clearTimeout(d),t&&(t.value=""),i&&(i.value=""),n&&(n.value="");const h=e.querySelector("#exploreResultsWrap");h&&(h.innerHTML=ri(null)),(v=e.querySelector("#exploreLiveInsert"))==null||v.remove();const g=e.querySelector("#exploreSearchStatus");g&&(g.textContent="Ready to search PIKK."),f("Cleared")}a==null||a.addEventListener("click",r);let d;t==null||t.addEventListener("input",()=>{clearTimeout(d),d=setTimeout(o,220)});for(const h of[i,n])h==null||h.addEventListener("input",()=>{clearTimeout(d),d=setTimeout(o,220)}),h==null||h.addEventListener("keydown",g=>{g.key==="Escape"&&(t!=null&&t.value||i!=null&&i.value||n!=null&&n.value)?(g.preventDefault(),r(),h.focus()):g.key==="Enter"&&(g.preventDefault(),clearTimeout(d),o())});t==null||t.addEventListener("keydown",h=>{h.key==="Escape"&&(t.value||i!=null&&i.value||n!=null&&n.value)?(h.preventDefault(),r(),t.focus()):h.key==="Enter"&&(h.preventDefault(),clearTimeout(d),o())});const c=[...e.querySelectorAll("[data-explore-tab]")];function p(h,g=!1){var k;const v=(t==null?void 0:t.value)||"",b=(i==null?void 0:i.value)||"",y=(n==null?void 0:n.value)||"";if(clearTimeout(d),Dr({exploreTab:h}),K("/explore"),v.trim()||b.trim()||y.trim()){const S=document.getElementById("app"),x=S==null?void 0:S.querySelector("#exploreQ");if(x){x.value=v;const w=S.querySelector("#exploreCity"),A=S.querySelector("#exploreState");w&&(w.value=b),A&&(A.value=y),Jo(S,v)}}g&&((k=document.getElementById("explore-tab-"+h))==null||k.focus())}c.forEach((h,g)=>{h.addEventListener("click",()=>p(h.dataset.exploreTab)),h.addEventListener("keydown",v=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(v.key))return;v.preventDefault();const b=c.length-1,y=v.key==="Home"?0:v.key==="End"?b:(g+(v.key==="ArrowRight"?1:-1)+c.length)%c.length;p(c[y].dataset.exploreTab,!0)})}),(m=e.querySelector("#exploreDiscoverable"))==null||m.addEventListener("change",h=>{Dr({exploreDiscoverable:!!h.target.checked}),f(h.target.checked?"Discoverable on":"Discoverable off")})}let Ka=null;function Kt(e){K("#/giftbattles")}function Qo(){Ka&&(clearInterval(Ka),Ka=null)}function Z(e){return"$"+Number(e||0).toFixed(2)}function Vd(e){const t=Math.max(0,Math.ceil(e/1e3)),s=Math.floor(t/60),a=t%60;return`${s}:${String(a).padStart(2,"0")}`}function ck(){return`
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
    </div>`}function dk(e){if(!e)return`
      <div class="card">
        <h3>Champion Spotlight</h3>
        <p class="muted" style="margin:0">No active champion today. Win a battle to claim the rest-of-day banner.</p>
      </div>`;const t=Math.max(0,(e.championUntil||0)-Date.now()),s=Math.floor(t/36e5),a=Math.floor(t%36e5/6e4);return`
    <div class="card gb-champion" role="status">
      <div class="row wrap" style="gap:8px;align-items:center">
        <span class="gb-sticker-slot" aria-hidden="true">${da("battle-crown",{className:"gift-sticker gift-sticker--battle"}).html}</span>
        <div class="chip">Challenge Winner · rest of day</div>
      </div>
      <h3 class="gb-champion-name">${l(e.username)}</h3>
      <p class="muted" style="margin:0">
        Score ${l(Z(e.score))} · ~${s}h ${a}m left today
        · ${l(e.mode||"demo")}
      </p>
    </div>`}function pk(e,t){return e?`
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
    </div>`}function uk(e){return`
    <div class="card gb-battle" data-gb-status="pending">
      <h3>Challenge pending</h3>
      <p><strong>${l(e.challenger.name)}</strong> challenged <strong>${l(e.opponent.name)}</strong></p>
      <p class="muted">Mode: ${l(e.mode)} · opponent must Accept or Decline (demo controls below).</p>
      <div class="row wrap" style="gap:8px;margin-top:12px">
        <button type="button" class="btn primary" id="gbAccept">Accept</button>
        <button type="button" class="btn ghost" id="gbDecline">Decline</button>
      </div>
    </div>`}function mk(e){const t=Math.max(0,(e.endsAt||0)-Date.now()),s=Vd(t);return`
    <div class="card gb-battle" data-gb-status="active">
      <div class="gb-countdown" aria-live="polite" aria-atomic="true">
        <span class="gb-countdown-label">Time left</span>
        <span class="gb-countdown-clock" id="gbClock">${l(s)}</span>
      </div>
      <div class="gb-scoreboard" role="group" aria-label="Live battle scores">
        <div class="gb-side">
          <div class="muted">Challenger</div>
          <strong>${l(e.challenger.name)}</strong>
          <div class="gb-score" id="gbScoreA" aria-label="Challenger score ${l(Z(e.scoreA))}">${l(Z(e.scoreA))}</div>
        </div>
        <div class="gb-vs" aria-hidden="true">VS</div>
        <div class="gb-side">
          <div class="muted">Opponent</div>
          <strong>${l(e.opponent.name)}</strong>
          <div class="gb-score" id="gbScoreB" aria-label="Opponent score ${l(Z(e.scoreB))}">${l(Z(e.scoreB))}</div>
        </div>
      </div>
      <p class="muted gb-score-text" id="gbScoreText">
        Live score: ${l(e.challenger.name)} ${l(Z(e.scoreA))} —
        ${l(e.opponent.name)} ${l(Z(e.scoreB))}
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
    </div>`}function hk(e){var i,n;let t="Tie",s="Equal voluntary support · recognition for both";e.result==="win"&&e.winnerName?(t=`Winner · ${e.winnerName}`,s="Recognition only — no opponent funds transferred"):e.result==="declined"&&(t="Declined",s="Challenge was declined");const a=e.result==="win"?da("battle-win",{className:"gift-sticker gift-sticker--battle"}).html:"";return`
    <div class="card gb-battle gb-ended" data-gb-status="ended">
      <div class="row wrap" style="gap:8px;align-items:center">
        ${a?`<span class="gb-sticker-slot" aria-hidden="true">${a}</span>`:""}
        <div class="chip">${e.result==="win"?"Winner":e.result==="tie"?"Tie":"Ended"}</div>
      </div>
      <h3 class="gb-winner-banner">${l(t)}</h3>
      <p class="muted">${l(s)}</p>
      <p class="gb-score-text" style="margin:12px 0">
        Final: ${l(((i=e.challenger)==null?void 0:i.name)||"?")} ${l(Z(e.scoreA))} —
        ${l(((n=e.opponent)==null?void 0:n.name)||"?")} ${l(Z(e.scoreB))}
      </p>
      <button type="button" class="btn primary" id="gbClear">New challenge</button>
    </div>`}function fk(e,t){var i;const a=Dl().map(n=>`<option value="${l(n.id)}">${l(n.name)} — ${l(n.bio)}</option>`).join("");return`
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
      <p class="muted" style="margin:10px 0 0">Wallet: <strong id="gbWalletBal">${l(Z(((i=I().wallet)==null?void 0:i.balance)||0))}</strong> · TEST MODE</p>
    </div>`}function gk(){const e=Zn(10),t=e.length?e.map((s,a)=>`<li class="gb-day-row">${Ct("battle-win",{className:"gift-sticker gift-sticker--xs"})}<span class="chip">#${a+1}</span><strong>${l(s.username)}</strong></li>`).join(""):'<li class="muted">No winners yet today · win a 60s battle</li>';return`
    <div class="card gb-day-board" id="gbDayWinners">
      <div class="row wrap" style="justify-content:space-between;gap:8px">
        <h3 style="margin:0">Today&apos;s winners</h3>
        <span class="chip">${e.length}/10 · end of day</span>
      </div>
      <p class="muted" style="margin:6px 0 8px;font-size:12px">Sticker board · recognition only · TEST MODE</p>
      <ol class="gb-list gb-day-list">${t}</ol>
    </div>`}function vk(){const e=wu(12),t=$u(15),s=e.length?e.map(i=>{var o,r;const n=i.result==="win"?`Winner ${i.winnerName}`:i.result==="tie"?"Tie":i.result||i.status;return`<li>
            <strong>${l(n)}</strong>
            <span class="muted"> · ${l(((o=i.challenger)==null?void 0:o.name)||"?")} ${l(Z(i.scoreA))} vs ${l(((r=i.opponent)==null?void 0:r.name)||"?")} ${l(Z(i.scoreB))} · ${l(j(i.endedAt||i.createdAt||0))} · ${l(i.mode||"")}</span>
          </li>`}).join(""):'<li class="muted">No battles yet.</li>';return`
    <div class="card">
      <h3>Top winners (local)</h3>
      <ol class="gb-list">${t.length?t.map((i,n)=>`<li><span class="chip">#${n+1}</span> <strong>${l(i.username)}</strong> <span class="muted">${i.wins} win${i.wins===1?"":"s"} · ${l(Z(i.points))} battle pts</span></li>`).join(""):'<li class="muted">Win a battle to appear here.</li>'}</ol>
    </div>
    <div class="card">
      <h3>Battle history</h3>
      <ul class="gb-list">${s}</ul>
    </div>`}function bk(e){return`
    <div class="card">
      <h3>Battle prefs</h3>
      <label class="toggle"><span>Allow battle invitations</span>
        <input type="checkbox" id="gbPrefInvites" ${e.invitationsEnabled?"checked":""}/>
      </label>
      <p class="muted" style="margin:8px 0 0">When off, new challenges are blocked. Existing active battles can still finish.</p>
    </div>`}function yk(){const{user:e,live:t}=I();if(!e)return P("Gift Battles",No(),{lead:"Runs inside Live & Group Rooms · voluntary support · TEST MODE"});Xn();const s=Jn(),a=Yn(),i=Su(),n=!!(t&&!t.endedAt);let o="";(s==null?void 0:s.status)==="pending"?o=uk(s):(s==null?void 0:s.status)==="active"?o=mk(s):(s==null?void 0:s.status)==="ended"?o=hk(s):o=fk(n,a);const r=`
    ${No()}
    ${ck()}
    ${dk(i)}
    ${gk()}
    ${pk(n,t)}
    ${o}
    ${vk()}
    ${bk(a)}
  `;return P("Gift Battles",r,{lead:"Runs during Live · not a separate stream · 60s voluntary gift battles · not wagers · TEST MODE",badge:(s==null?void 0:s.status)==="active"?"BATTLE":i?"CHAMP":void 0})}function kk(e){var a,i,n,o,r,d,c;Qo(),(a=e.querySelector("#gbPrefInvites"))==null||a.addEventListener("change",p=>{hu({invitationsEnabled:p.target.checked}),f(p.target.checked?"Invitations on":"Invitations off")}),(i=e.querySelector("#gbTopUp"))==null||i.addEventListener("click",()=>{var m;Ha(10,"Gift battle demo top-up · TEST MODE"),f("+$10 demo wallet");const p=e.querySelector("#gbWalletBal");p&&(p.textContent=Z(((m=I().wallet)==null?void 0:m.balance)||0))});const t=p=>{const m=e.querySelector("#gbOpponent"),h=m==null?void 0:m.value,g=Dl().find(b=>b.id===h),v=fu({opponentId:h,opponentName:g==null?void 0:g.name,mode:p});if((v==null?void 0:v.error)==="signin")return f("Sign in first");if((v==null?void 0:v.error)==="invites_disabled")return f("Invitations disabled");if((v==null?void 0:v.error)==="not_live")return f("Not live — use sandbox");if((v==null?void 0:v.error)==="battle_in_progress")return f("Battle already in progress");if((v==null?void 0:v.error)==="self")return f("Pick another fan");f("Challenge sent · waiting for accept"),Kt()};(n=e.querySelector("#gbStartLive"))==null||n.addEventListener("click",()=>t("live")),(o=e.querySelector("#gbStartSandbox"))==null||o.addEventListener("click",()=>t("sandbox")),(r=e.querySelector("#gbAccept"))==null||r.addEventListener("click",()=>{const p=gu();if((p==null?void 0:p.error)==="no_pending")return f("No pending challenge");if((p==null?void 0:p.error)==="invites_disabled")return f("Invitations disabled");f("Battle started · 1:00"),Kt()}),(d=e.querySelector("#gbDecline"))==null||d.addEventListener("click",()=>{const p=vu();if(p!=null&&p.error)return f(String(p.error));f("Challenge declined"),Kt()}),(c=e.querySelector("#gbClear"))==null||c.addEventListener("click",()=>{const p=bu();if(p!=null&&p.error)return f("Battle still running");Kt()}),e.querySelectorAll("[data-gb-gift]").forEach(p=>{p.addEventListener("click",()=>{var y;const m=ku({side:p.dataset.gbGift,kind:p.dataset.kind||"gift",amount:Number(p.dataset.amt)||2,label:p.dataset.label||""});if((m==null?void 0:m.error)==="signin")return f("Sign in first");if((m==null?void 0:m.error)==="no_active"||(m==null?void 0:m.error)==="ended")return f("No active battle");if((m==null?void 0:m.error)==="offline")return f("Live offline — use sandbox");if((m==null?void 0:m.error)==="insufficient")return f("Need wallet credits");if(f(p.dataset.gbGift==="opponent"?"Opponent support (demo)":"Support sent · demo"),((y=m.battle)==null?void 0:y.status)==="ended"){f(m.battle.result==="win"?`Winner · ${m.battle.winnerName}`:"Tie!"),Kt();return}const h=e.querySelector("#gbScoreA"),g=e.querySelector("#gbScoreB"),v=e.querySelector("#gbScoreText"),b=m.battle;h&&g&&b?(h.textContent=Z(b.scoreA),h.setAttribute("aria-label",`Challenger score ${Z(b.scoreA)}`),g.textContent=Z(b.scoreB),g.setAttribute("aria-label",`Opponent score ${Z(b.scoreB)}`),v&&(v.textContent=`Live score: ${b.challenger.name} ${Z(b.scoreA)} — ${b.opponent.name} ${Z(b.scoreB)}`)):Kt()})});const s=e.querySelector("#gbClock");s&&(Ka=setInterval(()=>{const p=Xn();if(!p||p.status==="ended"){Qo(),(p==null?void 0:p.status)==="ended"&&f(p.result==="win"?`Winner · ${p.winnerName}`:"Tie!"),Kt();return}const m=Math.max(0,(p.endsAt||0)-Date.now());s.textContent=Vd(m)},250))}function Ee(){K("#/multiguest")}function wk(e){return(String(e||"?").trim().slice(0,2)||"?").toUpperCase()}function Sk(e){const t=I().user;return!t||!e?!1:(t.following||[]).includes(e)}function xr(e){return((e==null?void 0:e.guests)||[]).filter(t=>t.status==="joined")}function $k(e){return((e==null?void 0:e.guests)||[]).filter(t=>t.status==="invited")}function Tn(e,t){var a,i;return`${Number(((i=(a=e==null?void 0:e.giftSplit)==null?void 0:a.shares)==null?void 0:i[t])||0).toFixed(0)}%`}function Ek(){return P("Multi-Guest Live",`<div class="card">
      <h3>Sign in required</h3>
      <p class="muted">Start a multi-guest demo session as host. No camera / WebRTC — fake stage tiles only.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,{lead:"Invite 2–4 co-hosts · disclosed gift splits · TEST MODE"})}function xk(){return`
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
    </div>`}function tn({role:e,name:t,sub:s,muted:a,empty:i,followId:n}){if(i)return`
      <div class="mg-tile mg-tile-empty" aria-label="Empty guest slot">
        <div class="mg-avatar mg-avatar-empty">+</div>
        <div class="mg-tile-name muted">Open slot</div>
        <div class="mg-tile-sub muted">Invite a guest</div>
      </div>`;const o=a?'<span class="chip">Muted</span>':"",r=n&&n!=="dbs"?Sk(n)?`<button class="btn ghost mg-follow" data-follow="${l(n)}" data-on="1">Following</button>`:`<button class="btn ghost mg-follow" data-follow="${l(n)}" data-on="0">Follow</button>`:n==="dbs"?'<a class="btn ghost" href="#/profile">Follow PIKK</a>':"";return`
    <div class="mg-tile ${e==="host"?"mg-tile-host":""} ${a?"mg-muted":""}">
      <div class="mg-avatar" aria-hidden="true">${l(wk(t))}</div>
      <div class="mg-tile-name">${l(t)}</div>
      <div class="mg-tile-sub">${l(s||"")} ${o}</div>
      <div class="mg-tile-actions">${r}</div>
    </div>`}function Ak(e){var n,o;const t=xr(e),s=[];s.push(tn({role:"host",name:e.hostName,sub:"Host",followId:e.hostId===((n=I().user)==null?void 0:n.id)?"dbs":e.hostId}));for(let r=0;r<(e.maxGuests||4);r++){const d=t[r];d?s.push(tn({role:"guest",name:d.username,sub:"Guest",muted:d.muted,followId:d.id})):s.push(tn({empty:!0}))}const a=(o=e.giftSplit)!=null&&o.disclosed?'<span class="chip">Split disclosed</span>':'<span class="chip">Split pending</span>',i=e.broadcastReady?'<span class="chip">Broadcast ready</span>':'<span class="chip">Setup</span>';return`
    <div class="card mg-stage">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center">
        <div>
          <div class="row wrap" style="gap:8px;align-items:center">
            <img class="mg-brand-logo" src="/brand/pikk-logo-official.png" alt="PIKK" />
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
    </div>`}function Tk(e){const t=Eu(),s=new Set((e.guests||[]).filter(p=>p.status==="invited"||p.status==="joined").map(p=>p.id)),a=t.filter(p=>p.id!==e.hostId&&!s.has(p.id)),i=$k(e),n=xr(e),o=a.length?a.map(p=>`<option value="${l(p.id)}">${l(p.username)} — ${l(p.bio||"demo")}</option>`).join(""):'<option value="">No more demo guests</option>',r=i.length?i.map(p=>`
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
            <span class="muted" style="font-size:12px"> · gift ${l(Tn(e,p.id))}</span>
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
    </div>`}function Ck(e){var o,r;const t=xr(e),s=[{id:e.hostId,username:e.hostName,role:"Host"},...t.map(d=>({id:d.id,username:d.username,role:"Guest"}))],a=((o=e.giftSplit)==null?void 0:o.mode)||"equal",i=!!((r=e.giftSplit)!=null&&r.disclosed),n=s.map(d=>{var p,m;const c=Number(((m=(p=e.giftSplit)==null?void 0:p.shares)==null?void 0:m[d.id])||0);return`
        <li class="mg-split-row">
          <span><strong>@${l(d.username)}</strong> <span class="chip">${l(d.role)}</span></span>
          ${a==="custom"&&!i?`<label class="mg-pct"><input type="number" min="0" max="100" step="1" class="mg-share-input" data-id="${l(d.id)}" value="${l(String(c))}" /> %</label>`:`<span class="chip">${l(String(Math.round(c)))}%</span>`}
        </li>`}).join("");return`
    <div class="card mg-split">
      <h3>Gift split disclosure</h3>
      <p class="muted">Required before broadcast when multiple hosts/guests share gifts. Display-only · TEST MODE · not a real payout.</p>
      <div class="row wrap" style="gap:8px;margin:10px 0">
        <button type="button" class="chip pikk-chip${a==="equal"?" on":""}" aria-pressed="${a==="equal"}" id="mgSplitEqual">Equal split</button>
        <button type="button" class="chip pikk-chip${a==="custom"?" on":""}" aria-pressed="${a==="custom"}" id="mgSplitCustom">Custom %</button>
      </div>
      <ul class="mg-list">${n}</ul>
      <p class="muted" style="margin:8px 0 0">Host share: <strong>${l(Tn(e,e.hostId))}</strong>
        · Guests: ${t.length?t.map(d=>`@${l(d.username)} ${l(Tn(e,d.id))}`).join(" · "):"none yet"}</p>
      ${i?`<p class="mg-ok" style="margin:10px 0 0">✓ Split disclosed ${e.giftSplit.disclosedAt?"· "+j(e.giftSplit.disclosedAt):""}. Broadcast ready (demo).</p>`:`<div class="row wrap" style="gap:8px;margin-top:12px">
               ${a==="custom"?'<button class="btn" id="mgSplitApply">Apply custom %</button>':""}
               <button class="btn primary" id="mgDisclose">Disclose &amp; ready broadcast</button>
             </div>
             <p class="muted" style="margin:8px 0 0">Custom % must total 100 among host + joined guests.</p>`}
    </div>`}function Pk(e){return`
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
    </div>`}function Xo(e){return e.length?`
    <div class="card">
      <h3>Recent multi-guest sessions</h3>
      <ul class="mg-list">${e.slice(0,8).map(s=>{var i;const a=(s.guests||[]).filter(n=>n.status==="joined"||n.joinedAt).length;return`<li><strong>${l(s.title)}</strong> · ${l(String(a))} guests · ${j(s.endedAt||s.startedAt)}
        ${(i=s.giftSplit)!=null&&i.disclosed?" · split disclosed":""}</li>`}).join("")}</ul>
    </div>`:`
      <div class="card">
        <h3>Recent multi-guest sessions</h3>
        <p class="muted" style="margin:0">No ended sessions yet.</p>
      </div>`}function Ik(e){return`
    <div class="card">
      <h3>Start multi-guest session</h3>
      <p class="muted">You host as <strong>@${l(e.username)}</strong>. Invite demo contacts next — no real stream.</p>
      <div class="field" style="margin-top:10px">
        <span>Session title</span>
        <input id="mgTitle" maxlength="80" placeholder="e.g. Friday collab freestyle" value="PIKK Multi-Guest Demo" />
      </div>
      <button class="btn primary" id="mgStart" style="margin-top:12px">Start as host</button>
    </div>`}function Mk(){const t=I().user;if(!t)return Ek();wi();const s=aa(),a=xu();return!s||s.endedAt?P("Multi-Guest Live",`${xk()}${Ik(t)}${Xo(a)}`,{lead:"2–4 co-hosts · gift split disclosure · TEST MODE"}):P("Multi-Guest Live",`${Ak(s)}${Tk(s)}${Ck(s)}${Pk(s)}${Xo(a)}`,{lead:"Active collab session · fake stage · TEST MODE"})}function Lk(e){var s,a,i,n,o,r,d,c,p;if(!e)return;(s=e.querySelector("#mgStart"))==null||s.addEventListener("click",()=>{var g;const m=((g=e.querySelector("#mgTitle"))==null?void 0:g.value)||"",h=Au(m);if(h.error==="signin")return f("Sign in first");if(h.error==="session_in_progress")return f("Session already active");f("Multi-guest session started"),Ee()}),(a=e.querySelector("#mgEnd"))==null||a.addEventListener("click",()=>{const m=Ou();if(m.error)return f(m.error==="host_only"?"Host only":"No session");f("Session ended"),Ee()}),(i=e.querySelector("#mgInviteBtn"))==null||i.addEventListener("click",()=>{var g,v;const m=(g=e.querySelector("#mgInviteSelect"))==null?void 0:g.value;if(!m)return f("Pick a guest");const h=Tu(m);if(h.error==="full")return f("Guest slots full");if(h.error==="already_invited")return f("Already invited");if(h.error)return f("Invite failed: "+h.error);f("Invited @"+(((v=h.guest)==null?void 0:v.username)||m)),Ee()}),e.querySelectorAll(".mg-accept").forEach(m=>{m.addEventListener("click",()=>{var g;const h=Cu(m.getAttribute("data-id"));if(h.error==="full")return f("Stage full");if(h.error)return f("Accept failed");f("@"+(((g=h.guest)==null?void 0:g.username)||"")+" joined"),Ee()})}),e.querySelectorAll(".mg-decline").forEach(m=>{m.addEventListener("click",()=>{if(Pu(m.getAttribute("data-id")).error)return f("Decline failed");f("Invite declined"),Ee()})}),e.querySelectorAll(".mg-mute").forEach(m=>{m.addEventListener("click",()=>{const h=m.getAttribute("data-id"),g=m.getAttribute("data-muted")==="1";if(Lu(h,!g).error)return f("Mute failed");f(g?"Unmuted":"Muted"),Ee()})}),e.querySelectorAll(".mg-leave").forEach(m=>{m.addEventListener("click",()=>{if(Iu(m.getAttribute("data-id")).error)return f("Leave failed");f("Guest left"),Ee()})}),e.querySelectorAll(".mg-remove").forEach(m=>{m.addEventListener("click",()=>{if(Mu(m.getAttribute("data-id")).error)return f("Remove failed");f("Guest removed"),Ee()})}),e.querySelectorAll(".mg-follow").forEach(m=>{m.addEventListener("click",()=>{const h=m.getAttribute("data-follow");m.getAttribute("data-on")==="1"?(fi(h),f("Unfollowed")):(hi(h),f("Following")),Ee()})}),(n=e.querySelector("#mgSplitEqual"))==null||n.addEventListener("click",()=>{if(js({mode:"equal",disclose:!1}).error)return f("Split failed");f("Equal split applied"),Ee()}),(o=e.querySelector("#mgSplitCustom"))==null||o.addEventListener("click",()=>{var g;const m=aa();if(js({mode:"custom",shares:((g=m==null?void 0:m.giftSplit)==null?void 0:g.shares)||{},disclose:!1}).error)return f("Could not switch to custom");f("Custom split — edit % then Apply"),Ee()}),(r=e.querySelector("#mgSplitApply"))==null||r.addEventListener("click",()=>{const m={};e.querySelectorAll(".mg-share-input").forEach(g=>{m[g.getAttribute("data-id")]=Number(g.value)||0});const h=js({mode:"custom",shares:m,disclose:!1});if(h.error==="split_total")return f(`Percents total ${h.total}% — need 100%`);if(h.error)return f("Apply failed");f("Custom split saved"),Ee()}),(d=e.querySelector("#mgDisclose"))==null||d.addEventListener("click",()=>{var g;const m=aa();if(((g=m==null?void 0:m.giftSplit)==null?void 0:g.mode)==="custom"){const v={},b=e.querySelectorAll(".mg-share-input");if(b.length){b.forEach(k=>{v[k.getAttribute("data-id")]=Number(k.value)||0});const y=js({mode:"custom",shares:v,disclose:!1});if(y.error==="split_total")return f(`Percents total ${y.total}% — need 100%`)}}const h=_u();if(h.error==="split_total")return f(`Percents total ${h.total}% — need 100%`);if(h.error)return f("Disclose failed");f("Gift split disclosed · broadcast ready (demo)"),Ee()});const t=()=>{const m=e.querySelector("#mgChatInput"),h=(m==null?void 0:m.value)||"",g=Du(h);if(g.error==="empty")return f("Type a message");if(g.error)return f("Chat failed");m&&(m.value=""),Ee()};(c=e.querySelector("#mgChatSend"))==null||c.addEventListener("click",t),(p=e.querySelector("#mgChatInput"))==null||p.addEventListener("keydown",m=>{m.key==="Enter"&&(m.preventDefault(),t())})}function xe(e){K(e?`#/fanclubs?club=${encodeURIComponent(e)}`:"#/fanclubs")}function st(e="DemoFan"){const{user:t}=I();if(t)return t;const s=pa(e);return f(`Signed in as ${e} · local demo`),s||I().user}function Hd(e){return e==="paid"?"Paid / PIKK+":e==="members"?"Members only":"Public"}function Dk(e,t){const s=t===e.id,a=[e.official?'<span class="chip">Official DBS</span>':"",`<span class="chip">${l(Hd(e.privacy))}</span>`,`<span class="chip">${e.memberCount||0} members</span>`].filter(Boolean).join(" ");return`<button type="button" class="fanclub-card${s?" on":""}" data-open-club="${l(e.id)}" data-search="${l(`${e.name||""} ${e.hostName||""} ${e.description||""}`)}" aria-label="Open ${l(e.name)} club">
    <div class="row" style="gap:10px;align-items:center">
      <img src="${l(e.graphic||"/brand/pikk-logo-square.png")}" alt="" width="48" height="48" style="border-radius:12px;object-fit:cover;background:#111" />
      <div style="flex:1;min-width:0">
        <strong>${l(e.name)}</strong>
        <div class="muted" style="font-size:12px;margin-top:2px">Host @${l(e.hostName)} · Discover DatBoiSkeet</div>
        <div class="row wrap" style="gap:6px;margin-top:6px">${a}</div>
      </div>
    </div>
  </button>`}function _k(e){const t=ga(e);if(!t)return'<div class="card"><p class="muted" style="margin:0">Club not found.</p><button class="btn" data-back-list>Back to clubs</button></div>';const s=I().user,a=Ul(t.id),i=cm(t.id),n=na(t.id),o=Vl(t.id),r=Zt(),d=o.ok?"":`<div class="card" style="border-color:rgba(245,158,11,.35)">
          <h3 style="margin:0 0 6px">${t.privacy==="paid"?"PIKK+ room":"Members only"}</h3>
          <p class="muted" style="margin:0 0 10px">${t.privacy==="paid"?"This room uses membership permissions (PIKK+ or higher). TEST MODE unlock below — no real charge.":"Join the club to enter the discussion room."}</p>
          ${t.privacy==="paid"?`<button class="btn primary" id="fcUnlockSkeet">Unlock PIKK+ · TEST MODE</button>
                 <a class="btn" href="#/pricing">Pricing</a>
                 <p class="chip" style="margin-top:8px">Current membership: ${l(r||"none")}</p>`:`<button class="btn primary" data-join="${l(t.id)}">Join club</button>`}
        </div>`,c=o.ok?dm(t.id):[],p=o.ok?c.length?c.map(h=>{const g=n?`<div class="row wrap" style="gap:6px;margin-top:6px">
                   <button class="btn ghost" data-pin="${l(h.id)}" data-club="${l(t.id)}">${h.pinned?"Unpin":"Pin"} · mod</button>
                   <button class="btn ghost" data-remove="${l(h.id)}" data-club="${l(t.id)}">Remove · mod</button>
                 </div>`:"";return`<li style="padding:10px 0;border-top:1px solid rgba(255,255,255,.06)">
              <div class="row" style="justify-content:space-between;gap:8px">
                <strong>@${l(h.username)}</strong>
                <span class="muted" style="font-size:12px">${l(j(h.at))}${h.pinned?" · pinned":""}</span>
              </div>
              <p style="margin:6px 0 0">${l(h.text)}</p>
              ${g}
            </li>`}).join(""):'<li class="muted" style="padding:8px 0">No posts yet — start the discussion.</li>':"",m=o.ok?`<form id="fcPostForm" class="card" style="margin-top:10px">
         <label class="muted" style="font-size:12px">Public discussion · local posts</label>
         <textarea id="fcPostText" rows="3" maxlength="500" placeholder="Share with the club…" style="width:100%;margin:8px 0;background:#0e0e14;border:1px solid var(--line);border-radius:12px;padding:10px;color:inherit;resize:vertical"></textarea>
         <button class="btn primary" type="submit">Post</button>
         <span class="chip">TEST MODE · localStorage</span>
       </form>`:"";return`
    <div class="card fanclubs-detail">
      <button class="btn ghost" data-back-list style="margin-bottom:8px">← All clubs</button>
      <div class="row" style="gap:12px;align-items:flex-start">
        <img src="${l(t.graphic||"/brand/pikk-logo-square.png")}" alt="" width="72" height="72" style="border-radius:16px;object-fit:cover" />
        <div style="flex:1">
          <h2 style="margin:0 0 4px">${l(t.name)}</h2>
          <p class="muted" style="margin:0 0 8px">${l(t.description)}</p>
          <div class="row wrap" style="gap:6px">
            ${t.official?'<span class="chip">Official DatBoiSkeet</span>':""}
            <span class="chip">${l(Hd(t.privacy))}</span>
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
  `}function Ok(e){var c;Qe();const t=Fl(),s=((c=e==null?void 0:e.query)==null?void 0:c.club)||"",{user:a}=I(),i=t.map(p=>Dk(p,s)).join(""),n=t.filter(p=>p.privacy==="public").length,o=t.length-n,r=`
    <div class="card" id="fcCreateCard">
      <h3 style="margin:0 0 6px">Create club · TEST MODE</h3>
      <p class="muted" style="margin:0 0 10px;font-size:12px">Approved creators / demo admin. Custom name + graphic URL. Optional paid/private room using membership permissions.</p>
      <form id="fcCreateForm">
        <label class="muted" style="font-size:12px">Name</label>
        <input id="fcName" maxlength="48" required placeholder="My Fan Club" style="width:100%;margin:4px 0 10px;background:#0e0e14;border:1px solid var(--line);border-radius:12px;padding:10px;color:inherit" />
        <label class="muted" style="font-size:12px">Description</label>
        <textarea id="fcDesc" maxlength="280" rows="2" placeholder="What this club is about…" style="width:100%;margin:4px 0 10px;background:#0e0e14;border:1px solid var(--line);border-radius:12px;padding:10px;color:inherit;resize:vertical"></textarea>
        <label class="muted" style="font-size:12px">Graphic URL</label>
        <input id="fcGraphic" placeholder="/brand/pikk-logo-square.png" style="width:100%;margin:4px 0 10px;background:#0e0e14;border:1px solid var(--line);border-radius:12px;padding:10px;color:inherit" />
        <label class="muted" style="font-size:12px">Room privacy</label>
        <select id="fcPrivacy" style="width:100%;margin:4px 0 12px;background:#0e0e14;border:1px solid var(--line);border-radius:12px;padding:10px;color:inherit">
          <option value="public">Public discussion</option>
          <option value="members">Members only</option>
          <option value="paid">Paid / PIKK+ gate</option>
        </select>
        <button class="btn primary" type="submit">Create club</button>
        <button class="btn ghost" type="button" id="fcSeedBtn">Reseed demos</button>
        ${a?"":'<button class="btn" type="button" id="fcSignIn">Sign in demo</button>'}
        ${ua()?'<button class="btn ghost" type="button" id="fcAdmin">Toggle demo admin</button>':""}
        <p class="chip" style="margin-top:10px">TEST MODE · no real payments · DBS branding stays prominent</p>
      </form>
    </div>`,d=s?_k(s):`
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
    `;return P("Fan Clubs",`<div class="fanclubs-studio">${d}</div>`,{lead:"Creator communities inside DBS Lounge · DEMO.",badge:"Phase 2 demo"})}function qk(e){var a,i,n,o,r,d,c;e.querySelectorAll("[data-fc-jump]").forEach(p=>p.addEventListener("click",()=>{var h;const m=p.getAttribute("data-fc-jump");(h=e.querySelector(`#${m}`))==null||h.scrollIntoView({behavior:"smooth",block:"start"})}));const t=e.querySelector("#fcSearch"),s=()=>{const p=String((t==null?void 0:t.value)||"").trim().toLocaleLowerCase(),m=[...e.querySelectorAll(".fanclub-card[data-search]")];let h=0;m.forEach(b=>{const y=(b.dataset.search||"").toLocaleLowerCase().includes(p);b.hidden=!y,y&&(h+=1)});const g=e.querySelector("#fcSearchStatus");g&&(g.textContent=`Showing ${h} of ${m.length} clubs`);const v=e.querySelector("#fcNoResults");v&&(v.hidden=h>0||!p)};t==null||t.addEventListener("input",s),t==null||t.addEventListener("keydown",p=>{p.key!=="Escape"||!t.value||(p.preventDefault(),p.stopPropagation(),t.value="",s())}),e.querySelectorAll("[data-open-club]").forEach(p=>{p.addEventListener("click",()=>xe(p.getAttribute("data-open-club")))}),(a=e.querySelector("[data-back-list]"))==null||a.addEventListener("click",()=>xe()),(i=e.querySelector("#fcSignIn"))==null||i.addEventListener("click",()=>{st("DemoFan"),xe()}),(n=e.querySelector("#fcAdmin"))==null||n.addEventListener("click",()=>{var m,h;st("DemoAdmin");const p=!le();gi(p),f(p?"Demo admin on":"Demo admin off"),xe(((m=e.querySelector("[data-leave],[data-join]"))==null?void 0:m.getAttribute("data-leave"))||((h=e.querySelector("[data-join]"))==null?void 0:h.getAttribute("data-join"))||void 0)}),(o=e.querySelector("#fcSeedBtn"))==null||o.addEventListener("click",()=>{Qe({force:!0}),f("Demo clubs reseeded"),xe()}),(r=e.querySelector("#fcCreateForm"))==null||r.addEventListener("submit",p=>{var y,k,S,x,w;p.preventDefault(),st("DemoCreator");const m=(y=e.querySelector("#fcName"))==null?void 0:y.value,h=(k=e.querySelector("#fcDesc"))==null?void 0:k.value,g=((S=e.querySelector("#fcGraphic"))==null?void 0:S.value)||"/brand/pikk-logo-square.png",v=((x=e.querySelector("#fcPrivacy"))==null?void 0:x.value)||"public",b=nm({name:m,description:h,graphic:g,privacy:v});if(b.error==="signin")return f("Sign in required");if(b.error==="name")return f("Name required");f("Club created · TEST MODE"),xe((w=b.club)==null?void 0:w.id)}),e.querySelectorAll("[data-join]").forEach(p=>{p.addEventListener("click",()=>{st();const m=p.getAttribute("data-join");if(Gl(m).error)return f("Could not join");f("Joined club"),xe(m)})}),e.querySelectorAll("[data-leave]").forEach(p=>{p.addEventListener("click",()=>{st();const m=p.getAttribute("data-leave"),h=rm(m);if(h.error==="host")return f("Host cannot leave — transfer later");if(h.error)return f("Could not leave");f("Left club"),xe(m)})}),e.querySelectorAll("[data-follow]").forEach(p=>{p.addEventListener("click",()=>{st();const m=p.getAttribute("data-follow");om(m),f("Following · optional"),xe(m)})}),e.querySelectorAll("[data-unfollow]").forEach(p=>{p.addEventListener("click",()=>{st();const m=p.getAttribute("data-unfollow");lm(m),f("Unfollowed"),xe(m)})}),(d=e.querySelector("#fcUnlockSkeet"))==null||d.addEventListener("click",()=>{st(),mi("skeet+",!0),f("PIKK+ unlocked · TEST MODE");const p=new URLSearchParams(location.hash.split("?")[1]||"");xe(p.get("club")||void 0)}),(c=e.querySelector("#fcPostForm"))==null||c.addEventListener("submit",p=>{var b;p.preventDefault(),st();const h=new URLSearchParams(location.hash.split("?")[1]||"").get("club"),g=(b=e.querySelector("#fcPostText"))==null?void 0:b.value,v=pm(h,g);if(v.error==="gated")return f("Room gated");if(v.error==="empty")return f("Write something");if(v.error)return f("Could not post");f("Posted"),xe(h)}),e.querySelectorAll("[data-pin]").forEach(p=>{p.addEventListener("click",()=>{const m=p.getAttribute("data-club");if(um(m,p.getAttribute("data-pin")).error==="mod")return f("Mods only");f("Pin toggled · TEST MODE"),xe(m)})}),e.querySelectorAll("[data-remove]").forEach(p=>{p.addEventListener("click",()=>{const m=p.getAttribute("data-club");if(mm(m,p.getAttribute("data-remove")).error==="mod")return f("Mods only");f("Post removed · TEST MODE"),xe(m)})})}function Cn(){K("#/loyalty")}function Pn(){const{user:e}=I();if(e)return e;const t=pa("LoyalFan");return f("Signed in as LoyalFan · local demo"),t||I().user}function La(e,t,s){var i;Pn();const a=Um(e,{points:t,note:s});if(a.error==="signin")return f("Sign in required");if(a.error==="cooldown")return f("Anti-farming · wait a few seconds");if(a.error==="daily_cap")return f("Daily cap hit · come back tomorrow (demo)");if(a.error)return f("Could not record");(a.newBadges||[]).filter(n=>n!=="day_one"||(a.loyalty.badges||[]).includes("day_one")),(i=a.newBadges)!=null&&i.length?f(`+${t} pts · badge: ${a.newBadges.join(", ")}`):f(`+${t} pts · ${s}`),Cn()}function Rk(){const{user:e}=I(),t=ba(),a=pc().map(o=>{const r=o.unlocked;return`<div class="card" style="opacity:${r?1:.55};margin:0">
        <div class="row" style="justify-content:space-between;gap:8px">
          <strong>${l(o.name)}</strong>
          <span class="chip">${r?"Unlocked":"Locked"}</span>
        </div>
        <p class="muted" style="margin:6px 0 0;font-size:12px">${l(o.blurb)}</p>
      </div>`}).join(""),i=(t.history||[]).length===0?'<p class="muted" style="margin:0">No actions yet — try a listen tick or join a club.</p>':`<ul class="list-plain">${(t.history||[]).slice(0,12).map(o=>`<li style="padding:8px 0;border-top:1px solid rgba(255,255,255,.06)">
            <div class="row" style="justify-content:space-between">
              <span><strong>+${o.points}</strong> · ${l(o.note||o.kind)}</span>
              <span class="muted" style="font-size:12px">${l(j(o.at))}</span>
            </div>
          </li>`).join("")}</ul>`,n=t.publicVisible?"Your badges & points can appear on your profile (demo flag).":"History & achievements are private — only you see them here.";return P("Loyalty Club",`
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
    `,{lead:"Recognition for healthy participation · DEMO.",badge:"Phase 2 demo"})}function Nk(e){var t,s,a,i,n,o;(t=e.querySelector("#loyListen"))==null||t.addEventListener("click",()=>La("listen",5,"Authorized listening tick")),(s=e.querySelector("#loyLive"))==null||s.addEventListener("click",()=>La("live",8,"Attended live (stub)")),(a=e.querySelector("#loyHelp"))==null||a.addEventListener("click",()=>La("help",6,"Shared community helper tip")),(i=e.querySelector("#loyClub"))==null||i.addEventListener("click",()=>{Pn(),Qe();const r=Fl(),d=r.find(c=>c.privacy==="public")||r[0];d&&Gl(d.id),La("club",10,d?`Joined ${d.name}`:"Joined Fan Club")}),(n=e.querySelector("#loyPublic"))==null||n.addEventListener("change",r=>{Pn(),Gm(r.target.checked),f(r.target.checked?"Public visibility on":"Achievements private"),Cn()}),(o=e.querySelector("#loyReset"))==null||o.addEventListener("click",()=>{Vm(),f("Loyalty demo reset"),Cn()})}function jt(){K("#/openmic")}function sn(e="MicHopeful"){const{user:t}=I();if(t)return t;const s=pa(e);return f(`Signed in as ${e} · local demo`),s||I().user}function Zo(e){return`<span class="chip">${l(e==="approved"?"Approved":e==="rejected"?"Rejected":"Pending")}</span>`}function Bk(){const e=Wm(),t=e.chipLabel||"House rotation",s=e.embed?ct(e.embed,"rel=0"):"";return`
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
    </div>`}function Kk(){As();const{user:e}=I(),t=le(),s=zm(),a=e?mn().filter(c=>c.userId===e.id):[],i=t?mn({status:"pending"}):[],n=a.filter(c=>c.status==="pending").length,o=s.length===0?'<p class="muted" style="margin:0">No approved performers yet.</p>':s.map(c=>`<article class="card" style="margin:0 0 10px">
              <div class="row" style="justify-content:space-between;gap:8px">
                <div>
                  <strong>${l(c.trackTitle)}</strong>
                  <div class="muted" style="font-size:12px">@${l(c.username)} · ${l(c.talent)}</div>
                </div>
                ${Zo("approved")}
              </div>
              <p style="margin:8px 0 0">${l(c.profileNote||"Featured in PIKK Open Mic showcase.")}</p>
              <p class="muted" style="font-size:11px;margin:8px 0 0">Not a paid ranking · discovery showcase</p>
            </article>`).join(""),r=a.length===0?'<p class="muted" style="margin:0">You have no applications yet.</p>':`<ul class="list-plain">${a.map(c=>`<li style="padding:10px 0;border-top:1px solid rgba(255,255,255,.06)">
              <div class="row" style="justify-content:space-between">
                <strong>${l(c.trackTitle)}</strong>
                ${Zo(c.status)}
              </div>
              <div class="muted" style="font-size:12px">${l(c.talent)} · ${l(j(c.at))}</div>
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
       </div>`:"";return P("Open Mic",`
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
    ${Bk()}

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
        ${ua()?`<button class="btn ghost" id="omAdmin">${t?"Admin on":"Toggle demo admin"}</button>`:""}
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
    `,{lead:"24/7 house catalog when idle · opt-in talent showcase · DEMO.",badge:"Phase 2 demo"})}function jk(e){var t,s,a,i,n;e.querySelectorAll("[data-om-jump]").forEach(o=>{o.addEventListener("click",()=>{const r=o.getAttribute("data-om-jump"),d=r==="omApplyCard"||r==="omShowcaseCard"?e.querySelector("#"+r):null;d==null||d.scrollIntoView({behavior:"smooth",block:"start"})})}),(t=e.querySelector("#omSignIn"))==null||t.addEventListener("click",()=>{sn(),jt()}),(s=e.querySelector("#omAdmin"))==null||s.addEventListener("click",()=>{sn("DemoAdmin");const o=!le();gi(o),f(o?"Demo admin on":"Demo admin off"),jt()}),(a=e.querySelector("#omSeed"))==null||a.addEventListener("click",()=>{As({force:!0}),f("Open Mic demos reseeded"),jt()}),(i=e.querySelector("#omForm"))==null||i.addEventListener("submit",o=>{var c,p,m,h;o.preventDefault(),sn();const r=(c=e.querySelector("#omRights"))==null?void 0:c.checked,d=Jm({talent:(p=e.querySelector("#omTalent"))==null?void 0:p.value,trackTitle:(m=e.querySelector("#omTitle"))==null?void 0:m.value,profileNote:(h=e.querySelector("#omNote"))==null?void 0:h.value,rightsCertified:!!r});if(d.error==="rights")return f("Rights certification required");if(d.error==="title")return f("Title required");if(d.error==="pending")return f("You already have a pending application");if(d.error)return f("Could not submit");f("Application submitted · pending review"),jt()}),e.querySelectorAll("[data-om-approve]").forEach(o=>{o.addEventListener("click",()=>{if(hn(o.getAttribute("data-om-approve"),"approved").error==="admin")return f("Admin only");f("Approved · showcase"),jt()})}),e.querySelectorAll("[data-om-reject]").forEach(o=>{o.addEventListener("click",()=>{if(hn(o.getAttribute("data-om-reject"),"rejected","Demo reject").error==="admin")return f("Admin only");f("Rejected"),jt()})}),(n=e.querySelector("#omNextHouse"))==null||n.addEventListener("click",()=>{const o=Ym();f("Next house · "+(o.chipLabel||"House")),jt()})}let Re=null,Vt="all";try{const e=sessionStorage.getItem("dbs_shop_cat");e&&(Vt=e,sessionStorage.removeItem("dbs_shop_cat"));const t=sessionStorage.getItem("dbs_shop_preview");t&&(Re=t,sessionStorage.removeItem("dbs_shop_preview"))}catch{}function bt(){K("#/profile-shop")}function wt(e){return _a.find(t=>t.id===e)||null}function zd(e){return uc(e)}function Fk(e){const t={...e.equipped},s=Re?wt(Re):null;if(s){const a=zd(s);a&&(t[a]=s.id)}return t}function Gk(e){return`rarity-${l(e||"rare")}`}function Uk(e){return`$${Number(e).toFixed(2)}`}function Vk(e){const{user:t}=I(),s=Fk(e),a=s.frame?wt(s.frame):null,i=s.effect?wt(s.effect):null,n=s.banner?wt(s.banner):null,o=s.nameStyle?wt(s.nameStyle):null,r=s.badge?wt(s.badge):null,d=(t==null?void 0:t.username)||"DemoFan",c=e.reduceMotion,p=i?`shop-fx shop-fx--${l(i.id.replace(/^fx-/,""))}${c?" shop-fx--still":""}`:"",m=o?`shop-name shop-name--${l(o.id.replace(/^name-/,""))}`:"shop-name",h=a?`shop-avatar-frame shop-frame--${l(a.id.replace(/^frame-/,""))}`:"shop-avatar-frame";return`
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
        ${["frame","effect","banner","nameStyle","badge"].map(v=>{const b=s[v],y=b?wt(b):null,k=v==="nameStyle"?"Name":v.charAt(0).toUpperCase()+v.slice(1);return`<span class="shop-eq-chip ${y?"on":""}">${l(k)}: ${y?l(y.emoji+" "+y.name):"—"}</span>`}).join("")}
      </div>
    </div>`}function Hk(e,t){const s=t.owned.includes(e.id),a=zd(e),i=a&&t.equipped[a]===e.id,n=Re===e.id;return`
    <article class="cosmetic-card ${Gk(e.rarity)} ${n?"is-selected":""} ${s?"is-owned":""} ${i?"is-equipped":""}" data-id="${l(e.id)}">
      <div class="cosmetic-art" role="button" tabindex="0" data-preview="${l(e.id)}" aria-label="Preview ${l(e.name)}">
        <span class="cosmetic-emoji">${l(e.emoji)}</span>
        <span class="concept-flag">CONCEPT</span>
        ${s?'<span class="owned-flag">Owned</span>':""}
        ${i?'<span class="equipped-flag">Equipped</span>':""}
      </div>
      <div class="body">
        <div class="name">${l(e.name)}</div>
        <div class="meta">${l(e.category)} · ${l(e.rarity)}</div>
        <div class="price">${Uk(e.price)} <span class="chip" style="margin-left:4px">TEST MODE</span></div>
        <div class="cosmetic-actions row wrap" style="gap:6px;margin-top:8px">
          <button type="button" class="btn ghost shop-act" data-act="preview" data-id="${l(e.id)}">Preview</button>
          ${s?i?`<button type="button" class="btn shop-act" data-act="unequip" data-slot="${l(a)}" data-id="${l(e.id)}">Unequip</button>`:`<button type="button" class="btn primary shop-act" data-act="equip" data-id="${l(e.id)}">Equip</button>`:`<button type="button" class="btn primary shop-act" data-act="unlock" data-id="${l(e.id)}">Unlock · TEST MODE</button>`}
        </div>
      </div>
    </article>`}function zk(){const e=Tt(),t=Vt==="all"?_a:_a.filter(n=>n.category===Vt),s=gp.map(n=>`<button type="button" class="shop-chip ${Vt===n.id?"on":""}" data-cat="${l(n.id)}" aria-pressed="${Vt===n.id?"true":"false"}">${l(n.label)}</button>`).join(""),a=t.length===0?'<p class="muted">No cosmetics in this category.</p>':`<div class="cosmetic-grid">${t.map(n=>Hk(n,e)).join("")}</div>`,i=`
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

    ${Vk(e)}

    <div class="card">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center;margin-bottom:10px">
        <h3 style="margin:0">Catalog · ${_a.length} items</h3>
        <div class="row wrap" style="gap:8px">
          <span class="chip">${e.owned.length} owned</span>
          <span class="chip">CONCEPT</span>
          <span class="chip">TEST MODE</span>
        </div>
      </div>
      <div class="shop-chips" role="group" aria-label="Cosmetic categories">${s}</div>
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
  `;return P("Profile Shop",i,{lead:"PIKK digital cosmetics · live preview · CONCEPT / TEST MODE.",badge:"Phase 2 · CONCEPT"})}function Wk(e){var s,a,i;e.querySelectorAll(".shop-chip").forEach(n=>{n.addEventListener("click",()=>{Vt=n.dataset.cat||"all",bt();const o=[...document.querySelectorAll(".shop-chip")].find(r=>r.dataset.cat===Vt);o==null||o.focus()})}),(s=e.querySelector("#shopReduceMotion"))==null||s.addEventListener("change",n=>{nh(n.target.checked),f(n.target.checked?"Motion reduced":"Motion on"),bt()}),(a=e.querySelector("#shopBundle"))==null||a.addEventListener("click",()=>{var o;const n=th();f(`Starter bundle unlocked · ${((o=n.unlocked)==null?void 0:o.length)||0} items · no charge`),bt()}),(i=e.querySelector("#shopReset"))==null||i.addEventListener("click",()=>{rh(),Re=null,f("Demo inventory reset"),bt()});const t=n=>{Re=n,f("Preview updated"),bt()};e.querySelectorAll("[data-preview]").forEach(n=>{n.addEventListener("click",()=>t(n.dataset.preview)),n.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),t(n.dataset.preview))})}),e.querySelectorAll(".shop-act").forEach(n=>{n.addEventListener("click",()=>{const o=n.dataset.act,r=n.dataset.id;if(o==="preview")return t(r);if(o==="unlock"){const d=eh(r);return d.error?f("Could not unlock"):(Re=r,f(d.already?"Already owned · TEST MODE":"Unlocked · TEST MODE · no charge"),bt())}if(o==="equip"){const d=ah(r);return d.error==="not_owned"?f("Unlock first · TEST MODE"):d.error?f("Could not equip"):(Re=r,f("Equipped"),bt())}if(o==="unequip"){const d=n.dataset.slot;if(ih(d).error)return f("Could not unequip");const p=Re?wt(Re):null;return p&&uc(p)===d&&(Re=null),f("Unequipped"),bt()}})})}const Yk=["All","Hats","Shirts","Jackets"],Jk=["Ladies Shop","Men's Shop","Beauty & Hair","Fashion & Accessories","Lifestyle & Home","Creator Brands","Live Shopping","Deals"];function Qk(e,t="All",s=""){const a=String(s||"").trim().toLocaleLowerCase();return e.filter(i=>(t==="All"||i.category===t)&&(!a||`${i.name} ${i.category}`.toLocaleLowerCase().includes(a)))}function Xk(e,t="featured"){const s=[...e];return t==="price-asc"?s.sort((a,i)=>Number(a.price)-Number(i.price)):t==="price-desc"?s.sort((a,i)=>Number(i.price)-Number(a.price)):t==="name-asc"?s.sort((a,i)=>String(a.name).localeCompare(String(i.name))):s}function Zk(e){return`
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
    </article>`}function ew(){const e=Yk.map(i=>`<button type="button" class="chip pikk-chip pikk-shop-filter${i==="All"?" on":""}"
      data-category="${l(i)}" aria-pressed="${i==="All"?"true":"false"}">${l(i)}</button>`).join(""),t=Jk.map(i=>`<li><span>${l(i)}</span><span class="chip">Coming Soon</span></li>`).join(""),a=[_e.find(i=>i.id==="jacket-black")||_e.find(i=>i.category==="Jackets"),_e.find(i=>i.id==="hat-716-orange")||_e.find(i=>i.category==="Hats"),_e.find(i=>i.id==="tee-ptsd")||_e.find(i=>i.category==="Shirts")].filter(Boolean).map(i=>'<a class="pikk-shop-featured-product" href="'+l(i.shopUrl)+'" target="_blank" rel="noopener noreferrer" aria-label="View '+l(i.name)+' on Foreign X-Change"><img src="'+l(i.image)+'" alt="'+l(i.name)+'" loading="eager" decoding="async" /><span>'+l(i.category)+"</span></a>").join("");return P("PIKK Shop",`
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
      <input id="pikkShopSearch" type="search" placeholder="Search hats, shirts, jackets…" autocomplete="off" aria-controls="pikkShopProducts" aria-describedby="pikkShopCount" />
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
      <p class="muted small" id="pikkShopCount" aria-live="polite">${_e.length} items</p>
      <div class="merch-grid pikk-shop-premium-grid pikk-shop-real-grid" id="pikkShopProducts">${_e.map(Zk).join("")}</div>
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
  `,{lead:"Physical merchandise · external checkout · future verified storefronts"})}function tw(e){var h;const t=e.querySelector("#pikkShopSearch"),s=[...e.querySelectorAll(".pikk-shop-product")],a=[...e.querySelectorAll(".pikk-shop-filter, .pikk-shop-category")],i=e.querySelector("#pikkShopCount"),n=e.querySelector("#pikkShopEmpty"),o=e.querySelector("#pikkShopReset"),r=e.querySelector("#pikkShopSort"),d=e.querySelector("#pikkShopProducts"),c=new Map(s.map(g=>[g.dataset.productId,g]));let p="All";function m(){const g=new Set(Qk(_e,p,(t==null?void 0:t.value)||"").map(v=>v.id));for(const v of Xk(_e,(r==null?void 0:r.value)||"featured")){const b=c.get(v.id);b&&(d==null||d.appendChild(b))}for(const v of s){const b=g.has(v.dataset.productId);v.hidden=!b,v.style.display=b?"":"none"}if(i&&(i.textContent=`${g.size} ${g.size===1?"item":"items"}`),n&&(n.hidden=g.size>0),o){const v=p!=="All"||!!(t!=null&&t.value.trim())||((r==null?void 0:r.value)||"featured")!=="featured";o.hidden=!v,o.style.display=v?"":"none"}for(const v of a){const b=v.dataset.category===p;v.setAttribute("aria-pressed",String(b)),v.classList.toggle("on",b)}}t==null||t.addEventListener("input",m),t==null||t.addEventListener("keydown",g=>{g.key!=="Escape"||!t.value||g.isComposing||(g.preventDefault(),g.stopPropagation(),t.value="",m())}),r==null||r.addEventListener("change",m),o==null||o.addEventListener("click",()=>{p="All",t&&(t.value=""),r&&(r.value="featured"),m(),t==null||t.focus()}),(h=e.querySelector("[data-shop-scroll]"))==null||h.addEventListener("click",()=>{var g,v,b;t==null||t.focus({preventScroll:!0}),(b=e.querySelector("#pikkShopCatalog"))==null||b.scrollIntoView({behavior:(v=(g=window.matchMedia)==null?void 0:g.call(window,"(prefers-reduced-motion: reduce)"))!=null&&v.matches?"instant":"smooth",block:"start"})});for(const g of a)g.addEventListener("click",()=>{var v;p=g.dataset.category||"All",m(),g.classList.contains("pikk-shop-category")&&((v=e.querySelector("#pikkShopCatalog"))==null||v.scrollIntoView({behavior:"auto",block:"start"}))})}let ja=null;function pe(){K("#/spotlight")}function an(){ja&&(clearInterval(ja),ja=null)}function Wd(e){const t=Math.max(0,Math.ceil(e/1e3)),s=Math.floor(t/60),a=t%60;return`${s}:${String(a).padStart(2,"0")}`}function Ar(e){return e==="freestyle"?"Live Freestyle":e==="beat"?"Beat":e==="music_video"?"Music Video":"Song"}function sw(e){const t=I().user;return!t||!e?!1:(t.following||[]).includes(e)}function Tr(){return!!I().user}function aw(){return P("24/7 Spotlight",`<div class="card">
      <h3>Sign in required</h3>
      <p class="muted">Join the FIFO Spotlight queue, vote Keep Going / Play Another, and chat from a local demo account.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,{lead:"Continuous music showcase · votes ≠ paid advantage · TEST MODE"})}function iw(e){return`
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
    </div>`}function nw(e,{showSkip:t=!0}={}){const s=e.chipLabel||e.status||"House rotation",a=e.embed?ct(e.embed,"rel=0"):"";return`
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
        ${e.cover?`<img class="sp-cover" src="${l(lt(e.cover))}" alt="" />`:""}
        <div>
          <div class="sp-now-title">${l(e.title)}</div>
          <div class="sp-now-meta">${l(e.artist||"DatBoiSkeet")} · house catalog</div>
          <p class="muted sp-note">${l(e.note||"Approved catalog filler · not a live act")}</p>
          ${e.youtube?`<p style="margin:8px 0 0"><a class="btn ghost" href="${l(e.youtube)}" target="_blank" rel="noopener">Open on YouTube</a></p>`:""}
        </div>
      </div>
      ${t&&Tr()?`<div class="row wrap" style="gap:8px;margin-top:12px">
               <button class="btn" id="spSkipHouse">Skip house · next</button>
               <span class="muted" style="font-size:12px;align-self:center">Join queue takes the stage over house · Skip advances catalog</span>
             </div>`:""}
    </div>`}function rw(e,t){if(!e||e.house){const v=e&&e.house?{id:e.id,title:e.title,artist:e.artist,embed:e.embed,youtube:e.youtube,chipLabel:e.chipLabel||"House · Music Video",note:e.note,cover:e.cover,kind:e.houseKind}:Bl();return nw(v)}const s=I().user,a=e.type==="freestyle",i=a&&e.endsAt?Math.max(0,e.endsAt-Date.now()):null,n=Object.keys(e.keepGoingVotes||{}).length,o=Object.keys(e.playAnotherVotes||{}).length,r=e.userId,d=sw(r),c=s&&s.id===e.userId,p=e.reactions||{fire:0,heart:0,clap:0},m=a?`<div class="sp-timer" aria-live="polite">
         <div class="sp-timer-label">Freestyle timer · ext ${e.extensions||0}/${t.maxExtensions}</div>
         <div class="sp-timer-clock" id="spClock">${Wd(i||0)}</div>
         <div class="muted" style="font-size:12px">Keep Going ${n}/${t.keepGoing} · refresh recovers endsAt</div>
       </div>`:`<div class="sp-timer">
         <div class="sp-timer-label">Uploaded · play ${e.playCount||1}/${t.maxUploadStreak}</div>
         <div class="muted" style="font-size:12px">No real audio in TEST MODE · use End set when finished</div>
       </div>`,h=e.awaitingPlayAnother?`<div class="card sp-vote">
         <h3>Play Another?</h3>
         <p class="muted">Audience vote · ${o}/${t.playAnother} · window ends ${e.playAnotherDeadline?j(e.playAnotherDeadline):"soon"} (deadline-based)</p>
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
         </div>`:"",g=c?"":d?`<button class="btn ghost sp-follow" data-follow="${l(r)}" data-on="1">Following</button>`:`<button class="btn ghost sp-follow" data-follow="${l(r)}" data-on="0">Follow</button>`;return`
    <div class="card sp-stage">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center">
        <div class="chip">On stage · ${l(Ar(e.type))}</div>
        <span class="chip">TEST MODE</span>
      </div>
      <div class="sp-now">
        <div class="sp-avatar" aria-hidden="true">${l((e.username||"?").slice(0,2).toUpperCase())}</div>
        <div>
          <div class="sp-now-title">${l(e.title)}</div>
          <div class="sp-now-meta">${l(e.artist||e.username)} · ${l(e.username)}</div>
          <div class="row wrap sp-perf-actions" style="gap:8px;margin-top:8px">
            ${g}
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
    ${h}`}function ow(e,t,s){const a=r=>Math.max(1,(r+(t?1:0))*2),i=(e||[]).map((r,d)=>`
      <li class="sp-q-row">
        <div>
          <strong>${l(r.username)}</strong>
          <span class="muted"> · ${l(Ar(r.type))} · ${l(r.title)}</span>
          <div class="muted" style="font-size:12px">${d===0?"Next up":`#${d+1}`} · ~${a(d)} min wait (stub)</div>
        </div>
        <div class="row wrap" style="gap:6px">
          ${s&&r.userId===s.id?'<button class="btn ghost sp-leave-q">Leave</button>':""}
          ${Tr()?`<button class="btn ghost sp-remove-q" data-qid="${l(r.id)}" title="Demo moderator">Remove</button>`:""}
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
    </div>`}function lw(e){if(!Tr())return"";const t=le()?"Admin":"Demo moderator · TEST MODE",s=e&&!e.house;return`
    <div class="card sp-mod">
      <h3>Moderator controls</h3>
      <p class="muted" style="margin-top:0"><span class="chip">${l(t)}</span> Skip / remove for safety · fair order otherwise. House Skip → next queue or next house.</p>
      <div class="row wrap" style="gap:8px">
        <button class="btn" id="spSkip" ${e?"":"disabled"}>Skip current</button>
        ${s&&e.type!=="freestyle"&&!e.awaitingPlayAnother?'<button class="btn ghost" id="spEndSet">End set</button>':""}
      </div>
    </div>`}function cw(e){const t=I().user;return!e||e.house||e.type==="freestyle"||e.awaitingPlayAnother||!t||t.id!==e.userId?"":`
    <div class="card">
      <h3>Your set</h3>
      <p class="muted">No real audio file — tap End set when your demo track “finishes”.</p>
      <button class="btn primary" id="spEndSetSelf">End set</button>
    </div>`}function dw(e){return!e||e.house?"":`
    <div class="card sp-chat-card">
      <h3>Stage chat</h3>
      <div class="sp-chat" id="spChat">${(e.chat||[]).slice(-20).map(s=>`<div class="sp-chat-row ${s.system?"system":""}"><strong>${l(s.username)}</strong>${l(s.text)}</div>`).join("")||'<div class="muted">No messages yet</div>'}</div>
      <form id="spChatForm" class="row" style="gap:8px;margin-top:8px">
        <input id="spChatInput" maxlength="200" placeholder="Say something…" style="flex:1" />
        <button class="btn primary" type="submit">Send</button>
      </form>
    </div>`}function pw(e){return e.length?`
    <div class="card">
      <h3>Recent stage</h3>
      <ul class="sp-list">${e.slice(0,12).map(s=>`<li><strong>${l(s.username)}</strong> · ${l(Ar(s.type))} · ${l(s.title)}
         <span class="muted"> · ${l(s.reason||"ended")} · ${j(s.endedAt)}</span></li>`).join("")}</ul>
    </div>`:`
      <div class="card">
        <h3>Recent stage</h3>
        <p class="muted" style="margin:0">No completed turns yet.</p>
      </div>`}function uw(){de();const e=I().user;if(!e)return aw();const t=oe(),s=im(12);return P("24/7 Spotlight",`${iw(t.thresholds)}
     ${rw(t.nowPlaying,t.thresholds)}
     ${cw(t.nowPlaying)}
     ${lw(t.nowPlaying)}
     ${ow(t.queue,t.nowPlaying,e)}
     ${dw(t.nowPlaying)}
     ${pw(s)}`,{lead:"Always-on music showcase · FIFO queue · votes ≠ wagers · TEST MODE"})}function mw(e){var n,o,r,d,c,p,m,h,g,v,b;an(),de();const s=oe().nowPlaying;if(s&&s.type==="freestyle"&&s.endsAt){const y=e.querySelector("#spClock");ja=setInterval(()=>{de();const k=oe().nowPlaying;if(!k||k.type!=="freestyle"||!k.endsAt){an(),pe();return}const S=Math.max(0,k.endsAt-Date.now());y&&(y.textContent=Wd(S)),S<=0&&(an(),de(),pe())},250)}if(s&&s.awaitingPlayAnother&&s.playAnotherDeadline){const y=Math.max(0,s.playAnotherDeadline-Date.now())+50;setTimeout(()=>{de(),pe()},Math.min(y,35e3))}(n=e.querySelector("#spJoinForm"))==null||n.addEventListener("submit",y=>{var A,M,q;y.preventDefault();const k=((A=e.querySelector("#spType"))==null?void 0:A.value)||"song",S=((M=e.querySelector("#spTitle"))==null?void 0:M.value)||"",x=((q=e.querySelector("#spArtist"))==null?void 0:q.value)||"",w=Wu({type:k,title:S,artist:x});if(w.error==="signin")return f("Sign in first");if(w.error==="already_queued")return f("You already have a queue/stage spot");f(k==="freestyle"?"Freestyle — you're up or in queue":"Joined Spotlight queue"),pe()}),(o=e.querySelector("#spLeaveQueue"))==null||o.addEventListener("click",()=>{if(Gr().error)return f("Not in queue");f("Left queue"),pe()}),e.querySelectorAll(".sp-leave-q").forEach(y=>{y.addEventListener("click",()=>{Gr(),f("Left queue"),pe()})}),e.querySelectorAll(".sp-remove-q").forEach(y=>{y.addEventListener("click",()=>{Yu(y.getAttribute("data-qid")),f("Removed from queue (demo mod)"),pe()})});const a=()=>{oe().nowPlaying,Ju();const y=oe().nowPlaying;y&&y.house?f("Next house · "+(y.chipLabel||"House")):f(y?"Skipped · "+(y.username||"next")+" on stage":"Skipped"),pe()};(r=e.querySelector("#spSkip"))==null||r.addEventListener("click",a),(d=e.querySelector("#spSkipHouse"))==null||d.addEventListener("click",a);const i=()=>{const y=Qu();if(y.error==="max_streak"||y.ok){f(y.error==="max_streak"?"Max 3 in a row — advancing":"Play Another? vote open"),pe();return}y.error?f("Cannot end set: "+y.error):pe()};(c=e.querySelector("#spEndSet"))==null||c.addEventListener("click",i),(p=e.querySelector("#spEndSetSelf"))==null||p.addEventListener("click",i),(m=e.querySelector("#spKeepGoing"))==null||m.addEventListener("click",()=>{const y=Xu();if(y.error==="already_voted")return f("Already voted");if(y.error==="max_extensions")return f("Max extensions reached");if(y.error)return f(y.error);f("Keep Going counted"),pe()}),(h=e.querySelector("#spSimKeepGoing"))==null||h.addEventListener("click",()=>{Zu(2),f("+2 simulated fan votes"),pe()}),(g=e.querySelector("#spPlayAnother"))==null||g.addEventListener("click",()=>{const y=em();if(y.error==="already_voted")return f("Already voted");if(y.error)return f(y.error);f("Play Another vote counted"),pe()}),(v=e.querySelector("#spSimPlayAnother"))==null||v.addEventListener("click",()=>{tm(2),f("+2 simulated fan votes"),pe()}),e.querySelectorAll(".sp-follow").forEach(y=>{y.addEventListener("click",()=>{const k=y.getAttribute("data-follow");y.getAttribute("data-on")==="1"?(fi(k),f("Unfollowed")):(hi(k),f("Following")),pe()})}),e.querySelectorAll(".sp-react").forEach(y=>{y.addEventListener("click",()=>{sm(y.getAttribute("data-kind")||"fire"),pe()})}),(b=e.querySelector("#spChatForm"))==null||b.addEventListener("submit",y=>{y.preventDefault();const k=e.querySelector("#spChatInput"),S=am((k==null?void 0:k.value)||"");if(S.error!=="empty"){if(S.error)return f(S.error);k&&(k.value=""),pe()}})}const Yd="Not available — WebRTC + age assurance required before launch";function Ns(){K("#/connect")}function hw(){var p;const e=ic(),s=Mt().selected||[],a=Bm(),i=oc(),n=Number(i==null?void 0:i.max)||0,o=!!a,r=e.map(m=>{const h=s.includes(m.id),g=m.connected?`<span class="chip">Linked${m.handle?" · "+l(m.handle):""}</span>`:'<span class="chip muted-chip">Not linked</span>';return`
      <div class="connect-mp-plat ${m.connected?"on":""}" data-plat="${l(m.id)}">
        <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center">
          <div>
            <strong>${l(m.label)}</strong>
            <div class="muted" style="font-size:12px">${l(m.hint||"")}</div>
          </div>
          ${g}
        </div>
        <div class="row wrap" style="gap:6px;margin-top:8px;align-items:center">
          ${m.connected?`<button type="button" class="btn ghost connect-mp-disconnect" data-id="${l(m.id)}">Unlink</button>
                 <label class="connect-mp-select">
                   <input type="checkbox" class="connect-mp-dest" data-id="${l(m.id)}" ${h?"checked":""} ${o?"disabled":""} />
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
    </div>`}function In(){const e=lc(),t=e.ageConfirmed&&e.rulesAccepted;return P("PIKK Connect",`<div class="connect-monkey" id="connectMonkey">
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
        <a class="pikk-connect-feature pikk-connect-feature-community" href="#/communities">
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
          <strong>${Yd}</strong>
          <p class="muted small">TEST MODE — this is a preview, not a real matching request. No match was created, no camera was requested, and no WebRTC connection was attempted.</p>
        </div>
        <p class="muted small" style="margin-top:10px">Controls are mockups until launch. Prefs save on this device.</p>
      </div>

      ${hw()}

      <div class="card">
        <p class="muted" style="margin:0 0 8px">PIKK Connect <strong>does not replace</strong> Live, Messages, or Spotlight. Meanwhile:</p>
        <a class="btn" href="#/live">Live</a> <a class="btn" href="#/messages">Messages</a> <a class="btn" href="#/spotlight">Spotlight</a> <a class="btn ghost" href="#/shorts">Shorts / Clips</a>
      </div>
    </div>`,{lead:"1:1 discovery shell · multi-platform go-live · TEST MODE",badge:"Shell · no WebRTC"})}function fw(e){var t,s;e.querySelectorAll(".connect-mp-connect").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.id,n=Lm(i,"");if(n!=null&&n.error)return f(String(n.error));f(`Linked ${i} · TEST MODE`),Ns()})}),e.querySelectorAll(".connect-mp-disconnect").forEach(a=>{a.addEventListener("click",()=>{Dm(a.dataset.id),f("Unlinked · TEST MODE"),Ns()})}),e.querySelectorAll(".connect-mp-dest").forEach(a=>{a.addEventListener("change",()=>{Om(a.dataset.id),Ns()})}),(t=e.querySelector("#connectMpGoLive"))==null||t.addEventListener("click",()=>{const a=Rm();if((a==null?void 0:a.error)==="signin")return f("Sign in first");if((a==null?void 0:a.error)==="none_selected")return f("Select at least one destination");if(a!=null&&a.error)return f(String(a.error));f("Multi-platform session started · TEST MODE"),Ns()}),(s=e.querySelector("#connectMpEnd"))==null||s.addEventListener("click",()=>{Nm(),f("Session ended"),Ns()})}function Mn(e=document,t){var i,n,o;const s=()=>{if(typeof t=="function")return t();e.innerHTML=In(),Mn(e)};(i=e.querySelector("#connect-age"))==null||i.addEventListener("change",r=>{const d=r.target.checked;zr(d?{ageConfirmed:!0}:{ageConfirmed:!1,rulesAccepted:!1}),s()}),(n=e.querySelector("#connect-rules"))==null||n.addEventListener("change",r=>{zr({rulesAccepted:r.target.checked}),s()}),(o=e.querySelector("#connect-start"))==null||o.addEventListener("click",()=>{const r=e.querySelector("#connect-blocked");r==null||r.removeAttribute("hidden"),f(Yd)}),fw(e);const a=Ke().elementId;(a==="connect-random-chat"||a==="connect-multistream")&&requestAnimationFrame(()=>{var r,d,c,p;(p=e.querySelector(`#${a}`))==null||p.scrollIntoView({behavior:(c=(d=(r=globalThis.window)==null?void 0:r.matchMedia)==null?void 0:d.call(r,"(prefers-reduced-motion: reduce)"))!=null&&c.matches?"instant":"smooth",block:"start"})})}const Jd="pikk_forum_local_v1",zt=[["music","Music & Artists","♫"],["business","Business & Money","$"],["relationships","Relationships","♡"],["gaming","Gaming","♜"],["sports","Sports","★"],["entertainment","Entertainment","▶"],["lifestyle","Lifestyle","✦"],["general","General Discussion","#"]],Ln=new Set(zt.map(e=>e[0])),Bs=e=>String(e||"").trim();function Ks(){try{const e=JSON.parse(localStorage.getItem(Jd)||"{}");return{posts:Array.isArray(e.posts)?e.posts.filter(t=>t&&Ln.has(t.topic)).slice(-150):[],votes:e.votes&&typeof e.votes=="object"?e.votes:{},hidden:Array.isArray(e.hidden)?e.hidden:[]}}catch{return{posts:[],votes:{},hidden:[]}}}function Da(e){try{return localStorage.setItem(Jd,JSON.stringify(e)),!0}catch{return f("Local storage unavailable"),!1}}function gw(e,t,s,a){var o;let i=e.posts.filter(r=>!e.hidden.includes(r.id)&&(s==="all"||r.topic===s));const n=r=>Object.entries(e.votes).reduce((d,c)=>d+(c[0].startsWith(r.id+":")&&Number(c[1])||0),0);if(i.sort((r,d)=>{var c,p;return a==="top"?n(d)-n(r):a==="discussed"?(((c=d.replies)==null?void 0:c.length)||0)-(((p=r.replies)==null?void 0:p.length)||0):d.when-r.when}),!i.length){const r=((o=zt.find(c=>c[0]===s))==null?void 0:o[1])||"this community";return'<div class="pikk-forum-empty" role="status">'+(s==="all"?"No discussions yet. Start the first conversation on this browser.":"No discussions in "+l(r)+" yet. Choose All discussions to browse other topics, or start a conversation here.")+"</div>"}return i.map(r=>{var m;const d=((m=zt.find(h=>h[0]===r.topic))==null?void 0:m[1])||"Community",c=Array.isArray(r.replies)?r.replies:[],p=Number(e.votes[r.id+":"+((t==null?void 0:t.id)||"guest")])||0;return'<article class="pikk-forum-post"><div class="pikk-forum-votes"><button data-fvote="1" data-id="'+l(r.id)+'" aria-label="Upvote '+l(r.title)+'" aria-pressed="'+(p===1)+'" '+(t?"":"disabled")+">▲</button><b>"+n(r)+'</b><button data-fvote="-1" data-id="'+l(r.id)+'" aria-label="Downvote '+l(r.title)+'" aria-pressed="'+(p===-1)+'" '+(t?"":"disabled")+'>▼</button></div><div class="pikk-forum-post-content"><p class="pikk-forum-meta">'+l(d)+" · u/"+l(r.author)+" · local preview</p><h3>"+l(r.title)+'</h3><p class="pikk-forum-text">'+l(r.body)+'</p><button class="pikk-forum-reply-button" data-fopen="'+l(r.id)+'" aria-expanded="false" aria-controls="pikk-forum-thread-'+l(r.id)+'">▤ '+c.length+" replies</button> "+(t&&t.id!==r.owner?'<button class="pikk-forum-reply-button" data-freport="'+l(r.id)+'">◇ Hide / report locally</button>':"")+'<div class="pikk-forum-thread" id="pikk-forum-thread-'+l(r.id)+'" data-thread="'+l(r.id)+'" hidden>'+c.map(h=>'<p class="pikk-forum-comment"><strong>'+l(h.author)+"</strong> "+l(h.body)+"</p>").join("")+(t?'<form data-freply="'+l(r.id)+'"><label for="pikk-forum-reply-'+l(r.id)+'">Reply</label><textarea id="pikk-forum-reply-'+l(r.id)+'" maxlength="1000" required rows="2" placeholder="Join the discussion"></textarea><button class="btn primary" type="submit">Reply · local</button></form>':'<a href="#/profile" class="btn ghost">Sign in to reply</a>')+"</div></div></article>"}).join("")}function vw(){const e=I().user,t=zt.map(s=>'<button data-ftopic="'+s[0]+'" type="button" aria-pressed="false"><span>'+s[2]+"</span>"+l(s[1])+"</button>").join("");return P("PIKK Communities",'<section class="pikk-forum-hero"><p class="kicker">PIKK CONNECT · TOPICS & DISCUSSIONS</p><h2>Find your people. <span>Start the conversation.</span></h2><p>Explore communities around what matters to you. Discuss, upvote, reply and discover new ideas.</p><a class="btn ghost" href="#/community">PIKK Lounge</a> <a class="btn ghost" href="#/posts">Social Posts</a></section><p class="pikk-forum-warning"><b>TEST MODE:</b> These conversations and votes are saved only in this browser. No public posting, account verification or server-side moderation is active.</p><div id="pikkForum" class="pikk-forum-layout"><aside class="pikk-forum-sidebar"><h3>Explore topics</h3><button class="on" data-ftopic="all" aria-pressed="true">✦ All discussions</button>'+t+'</aside><main class="pikk-forum-center"><nav class="pikk-forum-sort" aria-label="Sort posts"><button class="on" data-fsort="new" aria-pressed="true">✦ New</button><button data-fsort="top" aria-pressed="false">▲ Top</button><button data-fsort="discussed" aria-pressed="false">▤ Discussed</button></nav><div class="pikk-forum-topic-board"><h3>Discover communities</h3><div class="pikk-forum-topic-cards">'+zt.map(s=>'<button data-ftopic="'+s[0]+'" aria-pressed="false"><span>'+s[2]+"</span><strong>"+l(s[1])+"</strong></button>").join("")+'</div></div><section class="pikk-forum-compose"><h3>Start a discussion</h3>'+(e?'<form id="pikkForumForm"><label for="pikkForumTopic">Community</label><select id="pikkForumTopic">'+zt.map(s=>'<option value="'+s[0]+'">'+l(s[1])+"</option>").join("")+'</select><label for="pikkForumTitle">Title</label><input id="pikkForumTitle" required maxlength="110" placeholder="What is on your mind?" /><label for="pikkForumBody">Discussion</label><textarea id="pikkForumBody" required maxlength="4000" rows="3" placeholder="Ask a question or share a thought..."></textarea><button class="btn primary" type="submit">Publish locally · TEST MODE</button></form>':'<p class="muted">Sign in with a PIKK demo account to write discussions and vote.</p><a href="#/profile" class="btn primary">Sign in</a>')+'</section><section><h3 class="pikk-forum-feed-title">Community discussions</h3><p id="pikkForumFilterStatus" class="muted" role="status" aria-live="polite"></p><div id="pikkForumFeed"></div></section></main><aside class="pikk-forum-info"><h3>About PIKK Communities</h3><p>Topic-based discussion with an original PIKK look, separate from the live Lounge and social feed.</p><h3>Community safety</h3><p>Respect others. No harassment, hate, scams or personal information. Reports on this preview only hide posts on your device.</p><a href="#/guidelines">Community Guidelines</a></aside></div>',{lead:"Topic communities · discussions · voting · replies · local preview"})}function bw(e){const t=e.querySelector("#pikkForum");if(!t)return;let s="all",a="new";const i=()=>I().user,n=t.querySelector("#pikkForumFeed"),o=t.querySelector("#pikkForumFilterStatus"),r=()=>{var v;const p=Ks();n.innerHTML=gw(p,i(),s,a);const m=p.posts.filter(b=>!p.hidden.includes(b.id)&&(s==="all"||b.topic===s)).length,h=s==="all"?"All discussions":((v=zt.find(b=>b[0]===s))==null?void 0:v[1])||"Community",g={new:"Newest first",top:"Top voted",discussed:"Most discussed"}[a];o.textContent=`${h} · ${m} ${m===1?"discussion":"discussions"} · ${g}`},d=new URLSearchParams(location.hash.split("?")[1]||"").get("topic");Ln.has(d)&&(s=d);function c(p,m,h){t.querySelectorAll(p).forEach(g=>{let v=g.dataset[m]===h;g.classList.toggle("on",v),g.setAttribute("aria-pressed",String(v))})}c("[data-ftopic]","ftopic",s),t.addEventListener("click",p=>{var y;const m=p.target.closest("[data-ftopic]");if(m){s=m.dataset.ftopic,c("[data-ftopic]","ftopic",s);const k=t.querySelector("#pikkForumTopic");k&&s!=="all"&&(k.value=s),r();return}const h=p.target.closest("[data-fsort]");if(h){a=h.dataset.fsort,c("[data-fsort]","fsort",a),r();return}const g=p.target.closest("[data-fopen]");if(g){const k=t.querySelector('[data-thread="'+g.dataset.fopen+'"]');k&&(k.hidden=!k.hidden,g.setAttribute("aria-expanded",String(!k.hidden)));return}const v=p.target.closest("[data-fvote]");if(v&&i()){const k=Ks(),S=v.dataset.id+":"+i().id,x=Number(v.dataset.fvote);if(k.votes[S]=k.votes[S]===x?0:x,Da(k)){const w=v.dataset.id,A=v.dataset.fvote;r(),(y=[...n.querySelectorAll("[data-fvote]")].find(M=>M.dataset.id===w&&M.dataset.fvote===A))==null||y.focus()}return}const b=p.target.closest("[data-freport]");if(b&&i()){if(!confirm("Hide this post on this browser? This will NOT submit a report to a server."))return;const k=Ks();k.hidden.push(b.dataset.freport),Da(k)&&r(),f("Hidden locally only — no server report submitted")}}),t.addEventListener("submit",p=>{var h,g,v,b;const m=p.target;if(!(!(m instanceof HTMLFormElement)||!i())){if(p.preventDefault(),m.id==="pikkForumForm"){const y=Bs((h=m.querySelector("input"))==null?void 0:h.value),k=Bs((g=m.querySelector("textarea"))==null?void 0:g.value),S=(v=m.querySelector("select"))==null?void 0:v.value;if(!y||!k||!Ln.has(S))return;const x=Ks();x.posts.push({id:"local-"+Date.now()+"-"+Math.random().toString(36).slice(2,8),owner:i().id,author:Bs(i().username).slice(0,30)||"Member",title:y,body:k,topic:S,when:Date.now(),replies:[]}),Da(x)&&(s=S,c("[data-ftopic]","ftopic",s),m.reset(),r(),f("Saved only on this browser · TEST MODE"))}else if(m.dataset.freply){const y=Bs((b=m.querySelector("textarea"))==null?void 0:b.value);if(!y)return;const k=Ks(),S=k.posts.find(x=>x.id===m.dataset.freply);if(!S)return;if(S.replies||(S.replies=[]),S.replies.push({author:Bs(i().username).slice(0,30)||"Member",body:y}),Da(k)){r();const x=t.querySelector('[data-thread="'+S.id+'"]'),w=t.querySelector('[data-fopen="'+S.id+'"]');x&&w&&(x.hidden=!1,w.setAttribute("aria-expanded","true"),w.focus()),f("Reply saved locally")}}}}),r()}function yw(){const e=ue.filter(s=>(s.category||"")==="Music Videos"&&s.embed);return(e.length?e:ue.filter(s=>s.embed)).slice(0,10).map((s,a)=>({id:`clip_${s.id}`,videoId:s.id,title:s.title,artist:s.artist||"DatBoiSkeet",embed:s.embed,youtube:s.youtube,blurb:a%3===0?"Clip cut · DEMO":a%3===1?"Highlight · DEMO":"Short · DEMO"}))}function kw(e,t){return`
    <article class="shorts-card" data-clip-id="${l(e.id)}" id="shorts-card-${t}">
      <div class="shorts-stage">
        <div class="shorts-embed hero-video">
          <iframe
            src="${l(ct(e.embed))}"
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
    </article>`}function el(){const e=yw(),s=`
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
      ${e.map(kw).join("")||'<p class="muted">No demo clips seeded.</p>'}
    </div>
    <p class="muted" style="margin:12px 0 0;font-size:12px;text-align:center">
      End of DEMO feed · ${e.length} clips · Scroll for more when real clip uploads ship
    </p>`;return P("Shorts / Clips",s,{lead:"Posts · short-form feed · Picture / Short / Video create on Posts · TEST MODE"})}function tl(e){Li(e),e.querySelectorAll(".shorts-card").forEach(t=>{t.addEventListener("focusin",()=>{t.classList.add("is-focus")})}),e.querySelector(".shorts-card")||f("No demo clips · add MVs in data.js")}const oi=[{id:"ny",name:"NY",tag:"East coast",still:"/blockwars-preview/preview-ny-still.jpg",fighter:"Brooklyn Brawler",blurb:"Street-pressured power from the five boroughs. Heavy combos, tight corners — TEST MODE teaser only."},{id:"la",name:"LA",tag:"West coast",still:"/blockwars-preview/preview-la-still.jpg",fighter:"Sunset Striker",blurb:"Flashy footwork under neon skies. Style meets speed — Coming Soon, not a real match engine."},{id:"chi",name:"Chicago",tag:"Midwest",still:"/blockwars-preview/preview-chi-still.jpg",fighter:"Windy City Wall",blurb:"Defense-first grit from the lakefront. Hold the block — lobby demo only, no live fights yet."}];function ww(e){return oi.map(t=>{const s=t.id===e?" is-active":"",a=t.id===e?"true":"false";return`<button type="button" class="bw-city-card${s}" data-city="${l(t.id)}" aria-pressed="${a}" aria-label="${l(t.name)} fighter"><img src="${l(t.still)}" alt="" width="120" height="160" loading="lazy" decoding="async" /><span class="bw-city-meta"><span class="bw-city-name">${l(t.name)}</span><span class="bw-city-tag">${l(t.tag)}</span></span></button>`}).join("")}function Sw(e){return`<div class="bw-focus" id="bwFocus" data-city="${l(e.id)}"><div class="bw-focus-still"><img id="bwFocusImg" src="${l(e.still)}" alt="${l(e.fighter)}" width="110" height="140" /></div><div class="bw-focus-copy"><p class="bw-focus-city">${l(e.name)} · ${l(e.tag)}</p><h3 id="bwFocusName">${l(e.fighter)}</h3><p id="bwFocusBlurb">${l(e.blurb)}</p></div></div>`}function $w(){const e=oi[0],t=`
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
        ${ww(e.id)}
      </div>

      ${Sw(e)}

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
    </div>`;return P("Block Wars",t,{lead:"Coming Soon · lobby fighter select · preview video · not playable yet."})}function Ew(e,t){const s=oi.find(d=>d.id===t)||oi[0];e.querySelectorAll(".bw-city-card").forEach(d=>{const c=d.getAttribute("data-city")===s.id;d.classList.toggle("is-active",c),d.setAttribute("aria-pressed",c?"true":"false")});const a=e.querySelector("#bwFocus"),i=e.querySelector("#bwFocusImg"),n=e.querySelector("#bwFocusName"),o=e.querySelector("#bwFocusBlurb"),r=e.querySelector(".bw-focus-city");a&&a.setAttribute("data-city",s.id),i&&(i.src=s.still,i.alt=s.fighter),n&&(n.textContent=s.fighter),o&&(o.textContent=s.blurb),r&&(r.textContent=`${s.name} · ${s.tag}`)}function xw(e){var i,n;(i=e.querySelector("#bwCityGrid"))==null||i.addEventListener("click",o=>{const r=o.target.closest(".bw-city-card");r&&(o.preventDefault(),Ew(e,r.getAttribute("data-city")))}),(n=e.querySelector("#bwEnterArena"))==null||n.addEventListener("click",o=>{o.preventDefault(),f("Block Wars arena is Coming Soon — lobby demo only. No match engine yet.")});const t=e.querySelector("#bwCsVideo"),s=e.querySelector("#bwCsPlay");if(!t)return;const a=()=>{if(!s)return;const o=t.paused||t.ended;s.hidden=!o,s.setAttribute("aria-hidden",o?"false":"true")};s==null||s.addEventListener("click",o=>{o.preventDefault(),t.play().catch(()=>{})}),t.addEventListener("play",()=>{bs(),a()}),t.addEventListener("pause",()=>{dt(),a()}),t.addEventListener("ended",()=>{dt(),a()}),t.addEventListener("pointerdown",()=>{t.paused||bs()}),a()}function Aw(){return P("PIKK Arcade",`
    <section class="pikk-arcade-intro card" aria-label="PIKK Arcade">
      <div class="pikk-arcade-heading">
        <div>
          <p class="kicker">Play · Compete · Hang out</p>
          <div class="pikk-arcade-brand"><img src="${l(ra({artwork:"/brand/pikk-logo-official.png"}))}" alt="PIKK" loading="eager" decoding="async"/><span>ARCADE</span></div>
          <p>15 original game concepts. Find your favorites, see the art, and follow their development.</p>
        </div>
        <span class="pikk-arcade-icon" aria-hidden="true">🎮</span>
      </div>
      <p class="pikk-arcade-disclosure">ALL GAMES COMING SOON · Gallery previews, not playable releases. Play Chips have no cash value or cash-out.</p>
    </section>
    <div class="pikk-arcade-toolbar"><strong>15 upcoming games</strong><span>PLAY • COMPETE • HANG OUT</span></div>
    <div class="pikk-arcade-search">
      <label for="pikkArcadeSearch">Find a game</label>
      <div class="pikk-arcade-search-row">
        <input id="pikkArcadeSearch" type="search" placeholder="Search all 15 games..." autocomplete="off" aria-controls="pikkArcadeGrid" aria-describedby="pikkArcadeSearchHint" />
        <button type="button" class="btn ghost" id="pikkArcadeSearchClear" hidden>Clear</button>
      </div>
      <p id="pikkArcadeSearchHint" class="muted">Search names and descriptions. All games are previews.</p>
      <p id="pikkArcadeSearchStatus" class="muted" role="status" aria-live="polite">Showing all 15 games</p>
    </div>
    <div class="pikk-arcade-grid" id="pikkArcadeGrid">
      ${ze.map((e,t)=>`
        <article class="pikk-arcade-card pikk-game-${l(e.theme)}">
          <div class="pikk-arcade-card-header"><span class="pikk-arcade-number">${t+1}</span><h3>${l(e.name)}</h3></div>
          <div class="pikk-arcade-art" aria-label="${l(e.name)} preview artwork">
            ${e.artwork?`<img src="${l(ra(e))}" alt="${l(e.name)} concept artwork" loading="lazy" decoding="async"/>`:`<span class="pikk-arcade-symbol" aria-hidden="true">${e.icon}</span>`}
          </div>
          <div class="pikk-arcade-copy">
            <span class="pikk-arcade-players">♙ ${l(e.players)} ${e.players==="1"?"Player":"Players"}</span>
            <p>${l(e.description)}</p>
            <button type="button" class="pikk-arcade-view" data-game-preview="${t}" aria-label="View ${l(e.name)} concept artwork full size">View artwork <span aria-hidden="true">↗</span></button>
            ${e.href?`<a class="pikk-arcade-action" href="${l(e.href)}">View preview →</a>`:`<span class="pikk-arcade-action" aria-label="${l(e.name)} coming soon">Coming Soon</span>`}
          </div>
        </article>`).join("")}
    </div>
    <p id="pikkArcadeNoMatches" class="pikk-arcade-no-matches muted" hidden>No games match your search. Try another name or description.</p>
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
  `,{lead:"Fifteen upcoming games · mobile-first catalog · previews only"})}function Tw(e){const t=ze.length,s=(Math.trunc(Number(e)||0)%t+t)%t,a=ze[s];return{index:s,total:t,title:a.name,description:a.description,players:a.players,image:ra(a)}}function Qd(e,t){const s=String(t||"").trim().toLowerCase();return!s||[e.name,e.description].join(" ").toLowerCase().includes(s)}function sl(e){return ze.flatMap((t,s)=>Qd(t,e)?[s]:[])}function Cw(e){var y;const t=e.querySelector(".pikk-arcade-grid");if(!t)return;const s=e.querySelector("#pikkArcadeSearch");if(s){const k=[...((y=t.querySelectorAll)==null?void 0:y.call(t,".pikk-arcade-card"))||[]],S=e.querySelector("#pikkArcadeSearchClear"),x=e.querySelector("#pikkArcadeSearchStatus"),w=e.querySelector("#pikkArcadeNoMatches"),A=()=>{const M=s.value;let q=0;k.forEach(($,U)=>{const L=Qd(ze[U],M);$.hidden=!L,L&&q++}),S&&(S.hidden=!M),w&&(w.hidden=q!==0),x&&(x.textContent=M.trim()?"Showing "+q+" of "+ze.length+" games":"Showing all "+ze.length+" games")};s.addEventListener("input",A),s.addEventListener("keydown",M=>{M.key!=="Escape"||!s.value||M.isComposing||(M.preventDefault(),s.value="",A())}),S==null||S.addEventListener("click",()=>{s.value="",A(),s.focus()}),A()}const a=e.querySelector("#pikkArcadeLightbox");if(!a||typeof a.showModal!="function")return;let i=0,n=null,o=sl("");const r=a.querySelector("[data-arcade-prev]"),d=a.querySelector("[data-arcade-next]"),c=a.querySelector("[data-arcade-full-image]"),p=a.querySelector("[data-arcade-title]"),m=a.querySelector("[data-arcade-description]"),h=a.querySelector("[data-arcade-players]"),g=a.querySelector("[data-arcade-counter]"),v=k=>{const S=Tw(k);i=S.index,c.src=S.image,c.alt=S.title+" concept artwork",p.textContent=S.title,m.textContent=S.description,h.textContent=S.players+(S.players==="1"?" Player · Preview only":" Players · Preview only"),g.textContent=String(o.indexOf(i)+1).padStart(2,"0")+" / "+String(o.length).padStart(2,"0")},b=k=>{const S=o.indexOf(i);if(S===-1||o.length<2)return;const x=(S+k+o.length)%o.length;v(o[x])};t.addEventListener("click",k=>{const S=k.target.closest("[data-game-preview]");if(!S)return;n=S;const x=Number(S.dataset.gamePreview);o=sl(s==null?void 0:s.value),o.includes(x)||(o=[x]),r&&(r.disabled=o.length<2),d&&(d.disabled=o.length<2),v(x),a.showModal()}),a.addEventListener("click",k=>{k.target===a||k.target.closest("[data-arcade-close]")?a.close():k.target.closest("[data-arcade-prev]")?b(-1):k.target.closest("[data-arcade-next]")&&b(1)}),a.addEventListener("keydown",k=>{(k.key==="ArrowLeft"||k.key==="ArrowRight")&&(k.preventDefault(),b(k.key==="ArrowRight"?1:-1))}),a.addEventListener("close",()=>{n!=null&&n.isConnected&&n.focus()})}function Pw(){return P("PIKK Dating & Connections",`
    <section class="pikk-dating-hero" id="dating-discover" tabindex="-1" aria-label="PIKK Dating prelaunch">
      <div class="pikk-dating-hero-copy">
        <span class="chip">18+ · Pre-launch</span>
        <p class="kicker">PIKK DATING · FIND YOUR CONNECTION</p>
        <h2>Find your vibe. <span>Make it mutual.</span></h2>
        <p>Explore connections through mutual interest, shared communities and conversations when our real adult eligibility and safety services are ready.</p>
        <div class="pikk-dating-hero-actions">
          <a class="btn primary" href="#/communities">Explore communities</a>
          <a class="btn ghost" href="#/profile">Your profile</a>
          <a class="btn ghost" href="#/verify-age" id="datingVerifyAge">Verify age / ID (18+)</a>
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
      <a class="pikk-dating-experience" href="#/communities"><span aria-hidden="true">♧</span><strong>Meet through interests</strong><small>Community discovery</small></a>
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
        <a class="chip pikk-chip on" href="#/dating" aria-current="page">Dating · current section</a>
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
  `,{lead:"Dating · mutual matches · live connections"})}function Iw(e){const t=new Set(["dating-discover","dating-experiences","dating-live","dating-safety"]),s=[...e.querySelectorAll("[data-dating-jump]")];function a(n,o=!1){if(!t.has(n))return;const r=e.querySelector("#"+n);if(r&&(s.forEach(d=>{const c=d.dataset.datingJump===n;d.classList.toggle("is-active",c),d.setAttribute("aria-pressed",String(c))}),o)){const d=window.matchMedia("(prefers-reduced-motion: reduce)").matches;r.scrollIntoView({behavior:d?"auto":"smooth",block:"start"}),r.focus({preventScroll:!0})}}s.forEach(n=>n.addEventListener("click",()=>a(n.dataset.datingJump,!0)));const i=Ke().elementId;t.has(i)&&window.setTimeout(()=>{e.querySelector("#"+i)&&a(i,!0)},80)}const Ki=Object.freeze({roundSeconds:60,baseRounds:3,voteSeconds:10,rematchSeconds:5}),Mw=Object.freeze({tiebreakerRounds:1,contestantsMayVote:!1,rematchRequiresAllContestants:!0}),li=Ki.roundSeconds,Cr=Ki.voteSeconds,ci=Ki.rematchSeconds,Xs=Ki.baseRounds;let Xd=0;const $a=()=>new Date().toISOString();function Lw({inviterId:e,inviteeId:t,consentAccepted:s,blocked:a=!1}){if(s!==!0)return{error:"consent_required"};if(a)return{error:"blocked"};const i=$a();return{id:`test-rvi-${++Xd}`,inviter_id:e,invitee_id:t,mode:"roast_1v1",status:"pending",inviter_consent_at:i,invitee_consent_at:null,created_at:i,testMode:!0}}function al(e,{accept:t,consentAccepted:s}){return!e||e.status!=="pending"?{error:"not_found"}:t?s!==!0?{error:"consent_required"}:{...e,status:"accepted",invitee_consent_at:$a()}:{...e,status:"declined"}}const Dn=Object.freeze({teamSize:2,turnOrder:"teams-alternate"}),Zd=Dn;function Dw(e){const t=[];for(let s=0;s<Zd.teamSize;s++)for(const a of[0,1])t.push({team:a,memberId:e[a][s]});return t}function _w({teams:e,inviterId:t,consentAccepted:s,blocked:a=!1}){const i=(e||[]).flat();if(!Array.isArray(e)||e.length!==2||e.some(r=>!Array.isArray(r)||r.length!==Zd.teamSize)||i.some(r=>!r)||new Set(i).size!==i.length)return{error:"validation_failed"};if(!i.includes(t))return{error:"validation_failed"};if(s!==!0)return{error:"consent_required"};if(a)return{error:"blocked"};const n=$a(),o=Object.fromEntries(i.map(r=>[r,r===t?n:null]));return{id:`test-rvi-${++Xd}`,inviter_id:t,mode:"roast_tag_team",teams:e.map(r=>[...r]),consents:o,status:"pending",created_at:n,testMode:!0}}function il(e,t,{accept:s,consentAccepted:a}){if(!e||e.status!=="pending"||!(t in e.consents))return{error:"not_found"};if(!s)return{...e,status:"declined",declined_by:t};if(a!==!0)return{error:"consent_required"};const i={...e.consents,[t]:e.consents[t]||$a()},n=Object.values(i).every(Boolean);return{...e,consents:i,status:n?"accepted":"pending"}}function Ow(e){return!e||e.status!=="accepted"?!1:e.mode==="roast_tag_team"?Object.values(e.consents).every(Boolean):ep(e)}function ep(e){return!!e&&e.status==="accepted"&&!!e.inviter_consent_at&&!!e.invitee_consent_at}function tp(e,{eligibleViewerIds:t=[],rules:s=Mw}={}){if((e==null?void 0:e.mode)==="roast_tag_team"){if(!Ow(e))throw new Error("consent_required: every team member must accept before a match starts")}else if(!ep(e))throw new Error("consent_required: both contestants must accept before a match starts");const a=e.mode==="roast_tag_team"?e.teams.map(o=>[...o]):null,i=a?a.flat():[e.inviter_id,e.invitee_id],n=a?{mode:"roast_tag_team",teams:a,turnOrder:Dw(a)}:{mode:"roast_1v1"};return{testMode:!0,inviteId:e.id,contestants:i,...n,rules:s,eligibleViewerIds:[...new Set(t)].filter(o=>s.contestantsMayVote||!i.includes(o)),phase:"round",round:1,seconds:li,votes:[0,0],votersThisRound:[],scores:[0,0],roundWinners:[],gifts:[0,0],rematchAgreement:{},rematch:null,reports:[],winner:null,result:null,tieBreaker:!1,tiebreakersPlayed:0}}function qw(e,t,s){if(e.phase!=="vote"||![0,1].includes(t)||!e.eligibleViewerIds.includes(s)||e.votersThisRound.includes(s)||!e.rules.contestantsMayVote&&e.contestants.includes(s))return e;const a=[...e.votes];return a[t]+=1,{...e,votes:a,votersThisRound:[...e.votersThisRound,s]}}function Rw(e){return{voted:e.votersThisRound.length,eligible:e.eligibleViewerIds.length}}function Nw(e,t,s=1){if(!["round","vote"].includes(e.phase)||![0,1].includes(t)||!(s>0))return e;const a=[...e.gifts];return a[t]+=s,{...e,gifts:a}}function Bw(e,t,s){var o;if(e.phase!=="rematch"||!e.contestants.includes(s)||s in e.rematchAgreement)return e;const a={...e.rematchAgreement,[s]:!!t};return t?(((o=e.rules)==null?void 0:o.rematchRequiresAllContestants)!==!1?e.contestants.every(r=>a[r]===!0):!0)?{...e,rematchAgreement:a,rematch:"agreed",phase:"finished",seconds:0}:{...e,rematchAgreement:a}:{...e,rematchAgreement:a,rematch:"declined",phase:"finished",seconds:0}}function Kw(e,t){if(e.rematch!=="agreed"||(t==null?void 0:t.id)!==e.inviteId)throw new Error("rematch_not_agreed");return tp(t,{eligibleViewerIds:e.eligibleViewerIds})}function jw(e,{reporterId:t,targetId:s,reason:a}){return!t||!a?e:{...e,reports:[...e.reports,{reporterId:t,targetId:s||null,reason:a,at:$a(),localOnly:!0}]}}function sp(e){if(!["round","vote","rematch"].includes(e.phase))return e;if(e.seconds>1)return{...e,seconds:e.seconds-1};if(e.phase==="round")return{...e,phase:"vote",seconds:Cr,votes:[0,0],votersThisRound:[]};if(e.phase==="vote"){const t=e.votes[0]===e.votes[1]?null:e.votes[0]>e.votes[1]?0:1,s=[...e.scores];t!==null&&(s[t]+=1);const a=[...e.roundWinners,t];if(e.round>=Xs&&s[0]!==s[1]){const n=s[0]>s[1]?0:1;return{...e,scores:s,roundWinners:a,winner:n,result:"winner",phase:"rematch",seconds:ci}}if(e.round>=Xs&&e.tiebreakersPlayed>=e.rules.tiebreakerRounds)return{...e,scores:s,roundWinners:a,winner:null,result:"tie",phase:"finished",seconds:0};const i=e.round>=Xs;return{...e,scores:s,roundWinners:a,phase:"round",round:e.round+1,seconds:li,votes:[0,0],votersThisRound:[],tieBreaker:i,tiebreakersPlayed:e.tiebreakersPlayed+(i?1:0)}}return{...e,phase:"finished",seconds:0,rematch:e.rematch||"expired"}}const di=["test-viewer-1","test-viewer-2","test-viewer-3"],ps=[["test-a1","test-a2"],["test-b1","test-b2"]],pt={"1v1":{root:"roast-1v1",names:["Challenger (test)","Opponent (test)"]},tag:{root:"roast-tagteam",names:["Team A (test)","Team B (test)"]}},Fw=(e,t,s)=>t.teams?it(s):pt[e].names[t.contestants.indexOf(s)],it=e=>e.replace("test-","").toUpperCase()+" (test)",Wt={},re=e=>String(e).replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),Gw=e=>`${String(Math.floor(e/60)).padStart(2,"0")}:${String(e%60).padStart(2,"0")}`;function Yt(e){e!=null&&e.timer&&clearInterval(e.timer),e&&(e.timer=null)}function nl(e){const t=Wt[e];Yt(t),t.timer=setInterval(()=>{if(!document.getElementById(pt[e].root))return Yt(t);t.match=sp(t.match),t.match.phase==="finished"&&Yt(t),ui(e)},1e3)}const pi=e=>e.error?`<p class="muted" role="alert">${re(e.error)}</p>`:"";function Uw(e){const t=pt["1v1"].names,s=e.invite;return s?s.status==="declined"?`<h3>Invite declined</h3><p>${re(t[1])} declined. No match was started.</p><button type="button" class="btn" data-roast="reset">Start over</button>`:`<h3>Step 2 · Opponent responds</h3><p>Pending TEST invite <code>${re(s.id)}</code> from ${re(t[0])} (challenger consent recorded).</p>
    <label><input type="checkbox" data-consent="opponent"> I (opponent) accept the Roast Arena rules and consent to being roasted.</label>
    <p><button type="button" class="btn primary" data-roast="accept">Accept</button> <button type="button" class="btn" data-roast="decline">Decline</button></p>${pi(e)}`:`<h3>Step 1 · Challenger sends invite</h3>
      <label><input type="checkbox" data-consent="challenger"> I (challenger) accept the Roast Arena rules and consent to being roasted.</label>
      <p><button type="button" class="btn primary" data-roast="invite">Send TEST invite to ${re(t[1])}</button></p>${pi(e)}`}function Vw(e){const t=e.invite,s=`<p class="muted">Format: ${Dn.teamSize}v${Dn.teamSize}, teams alternate turns <em>(test values · owner verification needed)</em></p>`;if(!t)return`<h3>Step 1 · ${re(it(ps[0][0]))} sends Tag-Team invite</h3>${s}
      <p>Team A: ${ps[0].map(it).join(", ")} · Team B: ${ps[1].map(it).join(", ")}</p>
      <label><input type="checkbox" data-consent="inviter"> I (${re(it(ps[0][0]))}) accept the rules and consent to being roasted.</label>
      <p><button type="button" class="btn primary" data-roast="invite">Send TEST Tag-Team invite</button></p>${pi(e)}`;if(t.status==="declined")return`<h3>Invite declined</h3><p>${re(it(t.declined_by))} declined. No match was started.</p><button type="button" class="btn" data-roast="reset">Start over</button>`;const a=Object.entries(t.consents).map(([i,n])=>`<li data-member="${i}">${re(it(i))}: ${n?"<strong>consented</strong>":`<label><input type="checkbox" data-consent="${i}"> accept rules &amp; consent</label> <button type="button" class="btn" data-roast="accept" data-member-id="${i}">Accept</button> <button type="button" class="btn" data-roast="decline" data-member-id="${i}">Decline</button>`}</li>`).join("");return`<h3>Step 2 · Every member must consent</h3>${s}<p>Pending TEST invite <code>${re(t.id)}</code>. The match starts only when all ${Object.keys(t.consents).length} members accept.</p><ul>${a}</ul>${pi(e)}`}function rl(e,t,s){const a=pt[e].names,i=s.teams?s.teams[t]:[null];return`<div class="card roast-panel" data-roast-panel="${t}" style="flex:1;min-width:140px;text-align:center">
    ${i.map(n=>`<div style="aspect-ratio:${s.teams?"4/3":"3/4"};margin-bottom:6px;display:flex;align-items:center;justify-content:center;border:2px dashed currentColor;border-radius:12px;opacity:.8">
      <div><strong>TEST MODE</strong><br>${n?re(it(n))+"<br>":""}<span class="muted">Placeholder tile · no camera connected</span></div></div>`).join("")}
    <h4>${re(a[t])}</h4>
    <p>Rounds won: <strong>${s.scores[t]}</strong></p>
    <p class="muted">Test gifts: ${s.gifts[t]} (not counted for winner)</p>
    ${["round","vote"].includes(s.phase)?`<button type="button" class="btn" data-roast-gift="${t}">Send TEST gift</button>`:""}
  </div>`}function Hw(e,t){const s=t.match,a=pt[e].names,i=s.tieBreaker?"Tie Breaker":`Round ${s.round}`,n=s.phase==="round"?i:s.phase==="vote"?`${i} · Vote: who won?`:s.phase==="rematch"?"Result · Run It Back?":"Match finished",o=s.result==="winner"?`<p data-roast-result="winner"><strong>Winner (audience votes): ${re(a[s.winner])}</strong></p>`:s.result==="tie"?'<p data-roast-result="tie"><strong>Result: Tie</strong> (tiebreaker round was also tied)</p>':"",r=s.votersThisRound.includes(t.viewer),d=s.turnOrder?`<p>Turn order (teams alternate): ${s.turnOrder.map(c=>re(it(c.memberId))).join(" → ")} <em>(test values · owner verification needed)</em></p>`:"";return`<p class="chip">TEST MODE · local only · no server, video or real payments</p>
    <div class="card"><strong>On-screen rules (automated, no host):</strong> ${Xs} rounds of ${li}s, then a vote after each round (vote window ${Cr}s). One vote per viewer per round${s.teams?" for a team":""}. Winner is decided by votes only; gifts are tallied separately. If tied after ${Xs} rounds, one tiebreaker round is played, then it ends as a tie. Contestants cannot vote. A rematch needs every contestant to agree (decision window ${ci}s, rematch rounds are also ${li}s).</div>
    ${d}
    <h3 aria-live="polite">${n} · <span data-roast-clock>${Gw(s.seconds)}</span></h3>
    <div class="row" style="display:flex;gap:12px">${rl(e,0,s)}${rl(e,1,s)}</div>
    <p>Round votes so far: ${s.votes[0]} – ${s.votes[1]} · Round winners: ${s.roundWinners.map(c=>c===null?"tie":a[c].split(" ")[0]+(s.teams?" "+a[c].split(" ")[1]:"")).join(", ")||"—"}</p>
    <label>Acting as test viewer: <select data-roast-viewer>${di.map(c=>`<option ${c===t.viewer?"selected":""}>${c}</option>`).join("")}</select></label>
    ${s.phase==="vote"?(({voted:c,eligible:p})=>`<p data-roast-turnout><strong>${c} of ${p} eligible viewers voted</strong> <span class="chip">TEST MODE · test viewer list</span></p>`)(Rw(s)):""}
    ${s.phase==="vote"?r?'<p class="muted">This viewer already voted this round.</p>':`<p data-roast-vote-screen><strong data-roast-vote-round>${i}</strong> · Tap a name to vote who won:</p><p><button type="button" class="btn primary roast-tap" data-roast-vote="0" aria-label="Vote for ${re(a[0])}">${re(a[0])}</button> <button type="button" class="btn primary roast-tap" data-roast-vote="1" aria-label="Vote for ${re(a[1])}">${re(a[1])}</button></p>`:""}
    ${o}
    ${s.phase==="rematch"?`<p><strong>Rematch? Every contestant must agree within ${ci}s.</strong> Viewers do not vote on rematches.</p><ul data-roast-rematch-list>${s.contestants.map(c=>`<li>${re(Fw(e,s,c))}: ${c in s.rematchAgreement?s.rematchAgreement[c]?"<strong>Yes</strong>":"No":`<button type="button" class="btn roast-tap" data-roast-rematch="yes" data-contestant="${c}">Rematch: Yes</button> <button type="button" class="btn roast-tap" data-roast-rematch="no" data-contestant="${c}">Rematch: No</button>`}</li>`).join("")}</ul>`:""}
    ${s.rematch==="agreed"?'<p data-roast-rematch-status="agreed">All contestants agreed. <button type="button" class="btn primary" data-roast="rematch">Start rematch</button></p>':s.rematch==="declined"?'<p data-roast-rematch-status="declined">Rematch declined by a contestant. Match over.</p>':s.rematch==="expired"?'<p data-roast-rematch-status="expired">Rematch window closed without agreement. Match over.</p>':""}
    <p><button type="button" class="btn" data-roast="report">Report (stub)</button> <button type="button" class="btn" data-roast="skip">Skip to next phase (test control)</button></p>
    ${s.reports.length?`<p class="muted" data-roast-reports>${s.reports.length} report(s) recorded locally only. Not sent to moderators.</p>`:""}`}function ui(e){const t=document.getElementById(pt[e].root),s=Wt[e];!t||!s||(t.innerHTML=s.match?Hw(e,s):e==="tag"?Vw(s):Uw(s))}function zw(e,t){const s=t.target.closest("[data-roast],[data-roast-vote],[data-roast-gift],[data-roast-rematch]");if(!s)return;const a=Wt[e],i=document.getElementById(pt[e].root),n=r=>{var d;return((d=i.querySelector(`[data-consent="${r}"]`))==null?void 0:d.checked)===!0};a.error="";const o=s.dataset.roast;if(o==="invite"){const r=e==="tag"?_w({teams:ps,inviterId:ps[0][0],consentAccepted:n("inviter")}):Lw({inviterId:"test-challenger",inviteeId:"test-opponent",consentAccepted:n("challenger")});r.error?a.error="You must accept the rules and consent before inviting.":a.invite=r}else if(o==="accept"){const r=e==="tag"?il(a.invite,s.dataset.memberId,{accept:!0,consentAccepted:n(s.dataset.memberId)}):al(a.invite,{accept:!0,consentAccepted:n("opponent")});r.error?a.error="That member must accept the rules and consent first.":(a.invite=r,r.status==="accepted"&&(a.match=tp(r,{eligibleViewerIds:di}),nl(e)))}else o==="decline"?a.invite=e==="tag"?il(a.invite,s.dataset.memberId,{accept:!1}):al(a.invite,{accept:!1}):o==="reset"?(Yt(a),Wt[e]={viewer:di[0]}):o==="rematch"?(a.match=Kw(a.match,a.invite),nl(e)):o==="report"?a.match=jw(a.match,{reporterId:a.viewer,reason:"test report"}):o==="skip"?(a.match=sp({...a.match,seconds:1}),a.match.phase==="finished"&&Yt(a)):s.dataset.roastVote!==void 0?a.match=qw(a.match,Number(s.dataset.roastVote),a.viewer):s.dataset.roastGift!==void 0?a.match=Nw(a.match,Number(s.dataset.roastGift),1):s.dataset.roastRematch!==void 0&&(a.match=Bw(a.match,s.dataset.roastRematch==="yes",s.dataset.contestant),a.match.phase==="finished"&&Yt(a));ui(e)}function Ww(){for(const e of Object.keys(pt)){Yt(Wt[e]);const t=document.getElementById(pt[e].root);t&&(Wt[e]={viewer:di[0]},t.addEventListener("click",s=>zw(e,s)),t.addEventListener("change",s=>{s.target.matches("[data-roast-viewer]")&&(Wt[e].viewer=s.target.value,ui(e))}),ui(e))}}function Yw(){return P("PIKK Roast Arena",`
    <div class="card">
      <span class="chip">Comedy & Roast Battles · Coming Soon</span>
      <h2>PIKK Roast Arena</h2>
      <p>Step into live roast battles, trade jokes, and watch comedians go head-to-head. Join the audience, vote for your favorite, or request your turn on the mic.</p>
      <p class="muted">Live battles, voting, gifts and matchmaking are in development. No active battle or vote is represented on this page.</p>
      <a class="btn primary" href="#/live?tab=categories">Explore Live Categories</a>
    </div>
    <div class="card">
      <h3>1 vs. 1 · TEST MODE preview</h3>
      <p class="muted">Try the 1v1 flow locally: invite, consent from both sides, timed rounds, one vote per test viewer per round. Test-mode data only; nothing is shared or sent to a server.</p>
      <div id="roast-1v1"></div>
    </div>
    <div class="card">
      <h3>Tag Team · TEST MODE preview</h3>
      <p class="muted">Local Tag-Team flow: every member must consent, teams alternate turns, one vote per test viewer per round for a team. Tag-Team format is a test value; round timings are owner-approved; nothing is shared or sent to a server.</p>
      <div id="roast-tagteam"></div>
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
        <li>Results display the round winner, cumulative score and a separate gifts leaderboard. The <strong>audience voting window is the only break</strong> (${Cr} seconds, owner-approved) between rounds. The next round starts immediately after voting closes. If the final match vote is tied, an automatic <strong>tiebreaker final round</strong> begins after voting closes. At the end of a decided match, each contestant has ${ci} seconds to choose <strong>Rematch: Yes</strong> or <strong>Rematch: No</strong>; a rematch proceeds only if both contestants agree (in Tag-Team, every member). Viewers do not vote on rematches.</li>
      </ol>
      <p class="muted">Voting windows, tiebreakers, rematch agreement with no additional inter-round break are planned behavior, not yet a working real-time match.</p>
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
  `,{lead:"Live comedy competitions · audience votes and gifts tracked separately"})}const Vs={instagram:"Instagram",tiktok:"TikTok",facebook:"Facebook",youtube:"YouTube",x:"X",snapchat:"Snapchat",other:"Other"};function Jw(e){return((e==null?void 0:e.path)||"")==="/refer"?"refer":"share"}function ie(e){K(e==="refer"?"#/refer":"#/share")}function Ue(){const{user:e}=I();if(e)return e;const t=pa("DemoCreator");return f("Signed in as DemoCreator · local demo"),t||I().user}function Qw(e){const t=Number(e)-Date.now();if(t<=0)return"24h window ended (demo)";const s=Math.floor(t/36e5),a=Math.floor(t%36e5/6e4);return`${s}h ${a}m left`}function Xw(e){return`<div class="admin-type-tabs rewards-tabs" style="grid-template-columns:repeat(2,minmax(0,1fr));margin-bottom:14px" role="tablist">
    <a class="admin-type-tab ${e==="share"?"on":""}" href="#/share" role="tab" aria-selected="${e==="share"}">Share &amp; Earn</a>
    <a class="admin-type-tab ${e==="refer"?"on":""}" href="#/refer" role="tab" aria-selected="${e==="refer"}">Refer &amp; Earn</a>
  </div>`}function Zw(){const{user:e}=I(),t=J(),s=t.platformsLinked||[],a=t.challenge,i=t.submissions||[],n=t.rewardsClaimed||[],o=Zl(),r=ec(),d=hm(),c=s.length>0?`<ul class="list-plain">${s.map(y=>`<li>
          <span><strong>${l(Vs[y.platform]||y.platform)}</strong>
            ${y.handle?`<br/><span class="muted" style="font-size:12px">@${l(String(y.handle).replace(/^@+/,""))}</span>`:""}
            ${y.url?`<br/><span class="muted" style="font-size:11px">${l(y.url)}</span>`:""}
          </span>
          <button class="btn ghost" type="button" data-unlink="${l(y.id)}">Remove</button>
        </li>`).join("")}</ul>`:'<p class="muted" style="margin:0;font-size:13px">No platforms linked yet — optional. Never asked for social passwords.</p>',p=Ur().filter(y=>!s.some(k=>k.platform===y)).map(y=>`<option value="${y}">${l(Vs[y]||y)}</option>`).join("");let m="";if(!a)m=`<div class="card">
      <h3>24-hour social challenge</h3>
      <p class="muted" style="margin:0 0 10px;font-size:13px">Optional promo · separate from paid Clippers. Post official DBS ad + tracked link · keep live 24h · manual/demo verification (not guaranteed auto-check).</p>
      <button class="btn primary" id="shStart" >Start challenge · TEST MODE</button>
    </div>`;else{const y=a.status==="active",k=Date.now()>=Number(a.endsAt);m=`<div class="card">
      <div class="row wrap" style="gap:8px;margin-bottom:8px">
        <span class="chip">${y?k?"Window ended · demo":"Active":"Ended"}</span>
        <span class="chip">TEST MODE</span>
        <span class="chip">${l(Qw(a.endsAt))}</span>
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
        ${y?`<button class="btn ghost" type="button" id="shSim24">Simulate 24h elapsed</button>
               <button class="btn ghost" type="button" id="shEnd">End challenge</button>`:""}
      </div>
      <p class="muted" style="margin:10px 0 0;font-size:12px">Honest scope: stories/API may not prove continuous 24h visibility — admin/demo verify only.</p>
    </div>`}const h=Ur().map(y=>`<option value="${y}">${l(Vs[y]||y)}</option>`).join(""),g=i.length>0?`<ul class="list-plain">${i.map(y=>`<li style="align-items:flex-start">
          <span style="flex:1;min-width:0">
            <strong>${l(Vs[y.platform]||y.platform)}</strong>
            <span class="chip">${l(y.status)}</span>
            <br/><a href="${l(y.postUrl)}" target="_blank" rel="noopener" style="font-size:13px;word-break:break-all">${l(y.postUrl)}</a>
            <br/><span class="muted" style="font-size:11px">${j(y.submittedAt)} · ${l(y.note||"")}</span>
          </span>
          ${y.status==="pending"?`<span class="row wrap" style="gap:4px">
                  <button class="btn" type="button" data-verify="${l(y.id)}">Verify · demo</button>
                  <button class="btn ghost" type="button" data-reject="${l(y.id)}">Reject</button>
                </span>`:""}
        </li>`).join("")}</ul>`:'<p class="muted" style="margin:0;font-size:13px">No post URLs submitted yet.</p>',v=d.map(y=>{const k=n.some(x=>x.tierId===y.id),S=r.some(x=>x.id===y.id);return`<tr style="border-top:1px solid rgba(255,255,255,.06)">
        <td style="padding:8px 4px"><strong>${l(y.label)}</strong><br/><span class="muted" style="font-size:11px">≥${y.minVerified} verified platform${y.minVerified===1?"":"s"}${y.requireAllLinked?" · all linked (≥3)":""}</span></td>
        <td style="padding:8px 4px">${k?'<span class="chip">Claimed</span>':S?`<button class="btn primary" type="button" data-claim-share="${l(y.id)}">Claim</button>`:`<span class="muted" style="font-size:12px">Locked (${o}/${y.minVerified})</span>`}</td>
      </tr>`}).join(""),b=n.length>0?`<ul class="list-plain">${n.map(y=>`<li>
          <span>${l(y.label)}<br/><span class="muted" style="font-size:11px">${j(y.at)} · TEST MODE</span></span>
          <span class="chip">${l(y.kind)}</span>
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
        <div class="field" style="margin:0;min-width:140px"><label>Platform</label><select id="shSubPlat">${h}</select></div>
        <div class="field" style="margin:0;flex:1;min-width:180px"><label>Post URL</label><input id="shSubUrl" type="url" placeholder="https://…" required /></div>
        <button class="btn primary" type="submit">Submit</button>
      </form>
      <div style="margin-top:12px">${g}</div>
    </div>`:""}

    <div class="card">
      <h3>Rewards</h3>
      <p class="muted" style="margin:0 0 8px;font-size:13px">1 → badge · 2 → decoration · 3 → 7d PIKK+ · all linked (≥3) → 30d PIKK+. No auto paid billing.</p>
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <tbody>${v}</tbody>
        </table>
      </div>
      <h4 style="margin:16px 0 8px;font-size:14px">Claim history</h4>
      ${b}
    </div>
  `}function eS(){const{user:e}=I(),t=Es(),s=tc(),a=t.invitees||[],i=sc(),n=ac(),o=$m(),r=t.milestonesClaimed||[],d=Zt(),c=o.find(v=>i<v.n),p=c?`${i} / ${c.n} verified active → ${c.label}`:i>=100?"All milestones unlocked":`${i} verified active`,m=a.length>0?`<ul class="list-plain">${a.map(v=>{const b=(v.activeDays||[]).length;return`<li style="align-items:flex-start">
            <span style="flex:1;min-width:0">
              <strong>${l(v.username)}</strong>
              <span class="chip">${l(v.status)}</span>
              ${v.flaggedFraud?'<span class="chip">Fraud flag</span>':""}
              ${v.welcomeClaimed?'<span class="chip">Welcome claimed</span>':""}
              <br/><span class="muted" style="font-size:12px">Active days: ${b}/3 · ${l((v.activeDays||[]).join(", ")||"none")} · signed ${j(v.signedUpAt)}</span>
            </span>
            <span class="row wrap" style="gap:4px;justify-content:flex-end">
              ${!v.welcomeClaimed&&!v.flaggedFraud?`<button class="btn ghost" type="button" data-welcome="${l(v.id)}">Welcome perk</button>`:""}
              ${!v.flaggedFraud&&v.status!=="active"?`<button class="btn" type="button" data-activeday="${l(v.id)}">Mark active day</button>`:""}
              ${v.flaggedFraud?`<button class="btn ghost" type="button" data-unfraud="${l(v.id)}">Clear fraud</button>`:`<button class="btn ghost" type="button" data-fraud="${l(v.id)}">Flag fraud</button>`}
            </span>
          </li>`}).join("")}</ul>`:'<p class="muted" style="margin:0;font-size:13px">No invitees yet — simulate a signup or load demo referrals.</p>',h=o.map(v=>{const b=r.some(k=>k.milestoneId===v.id),y=n.some(k=>k.id===v.id);return`<tr style="border-top:1px solid rgba(255,255,255,.06)">
        <td style="padding:8px 4px"><strong>${v.n}</strong> verified active</td>
        <td style="padding:8px 4px">${l(v.label)}</td>
        <td style="padding:8px 4px">${b?'<span class="chip">Claimed</span>':y?`<button class="btn primary" type="button" data-claim-ref="${l(v.id)}">Claim</button>`:`<span class="muted" style="font-size:12px">${i}/${v.n}</span>`}</td>
      </tr>`}).join(""),g=r.length>0?`<ul class="list-plain">${r.map(v=>`<li>
          <span>${l(v.label)}<br/><span class="muted" style="font-size:11px">${j(v.at)} · not Clippers pay</span></span>
          <span class="chip">${v.n}</span>
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
          <tbody>${h}</tbody>
        </table>
      </div>
      <h4 style="margin:16px 0 8px;font-size:14px">Claim history</h4>
      ${g}
    </div>

    <div class="card">
      <h3>Invitee welcome path</h3>
      <ul class="list-plain">
        <li><span>Welcome badge / decoration</span><span class="chip">on signup perk</span></li>
        <li><span>3 days PIKK+</span><span class="chip">after 3 active days</span></li>
        <li><span>Extra 7 days PIKK+</span><span class="chip">7-day first-week streak</span></li>
      </ul>
      <p class="muted" style="margin:8px 0 0;font-size:12px">Invitee membership grants are illustrative chips in this demo; use Welcome perk + active days on each invitee card.</p>
    </div>
  `}function tS(e){return ap(e||{path:"/share"})}function sS(e){return ap(e||{path:"/refer"})}function ap(e){const t=Jw(e),s=`
    ${Xw(t)}
    ${t==="refer"?eS():Zw()}
  `;return P("DBS Rewards",s,{lead:t==="refer"?"Refer & Earn · verified active friends · TEST MODE (§33).":"Share & Earn · 24h social promo · TEST MODE (§32)."})}function aS(e){ip(e,"share")}function iS(e){ip(e,"refer")}function ip(e,t){var a,i,n,o,r,d,c,p,m,h,g,v,b;const s=t||(location.hash.includes("/refer")?"refer":"share");(a=e.querySelector("#rwSignIn"))==null||a.addEventListener("click",()=>{Ue(),ie(s)}),(i=e.querySelector("#shLinkForm"))==null||i.addEventListener("submit",y=>{var A,M,q;y.preventDefault(),Ue();const k=(A=e.querySelector("#shPlat"))==null?void 0:A.value,S=((M=e.querySelector("#shHandle"))==null?void 0:M.value)||"",x=((q=e.querySelector("#shUrl"))==null?void 0:q.value)||"",w=fm({platform:k,handle:S,url:x});if(w.error==="signin")return f("Sign in required");if(w.error==="already_linked")return f("Already linked");if(w.error==="required")return f("Handle or URL required");if(w.error)return f("Could not link");f(`Linked ${Vs[k]||k}`),ie("share")}),e.querySelectorAll("[data-unlink]").forEach(y=>{y.addEventListener("click",()=>{gm(y.getAttribute("data-unlink")),f("Platform removed"),ie("share")})}),(n=e.querySelector("#shStart"))==null||n.addEventListener("click",()=>{Ue();const y=vm();if(y.error==="signin")return f("Sign in required");if(y.error==="already_active")return f("Challenge already active");if(y.error)return f("Could not start");f("Challenge started · 24h window"),ie("share")}),(o=e.querySelector("#shCopyLink"))==null||o.addEventListener("click",async()=>{var k;const y=((k=e.querySelector("#shTracked"))==null?void 0:k.value)||"";try{await navigator.clipboard.writeText(y),f("Tracked link copied")}catch{f("Copy manually")}}),(r=e.querySelector("#shCopyCaption"))==null||r.addEventListener("click",async()=>{var S;const k=((S=J().challenge)==null?void 0:S.caption)||"";try{await navigator.clipboard.writeText(k),f("Caption copied")}catch{f("Copy manually")}}),(d=e.querySelector("#shSim24"))==null||d.addEventListener("click",()=>{if(bm().error)return f("No active challenge");f("Simulated 24h elapsed"),ie("share")}),(c=e.querySelector("#shEnd"))==null||c.addEventListener("click",()=>{ym(),f("Challenge ended"),ie("share")}),(p=e.querySelector("#shSubmitForm"))==null||p.addEventListener("submit",y=>{var w,A;y.preventDefault(),Ue();const k=(w=e.querySelector("#shSubPlat"))==null?void 0:w.value,S=((A=e.querySelector("#shSubUrl"))==null?void 0:A.value)||"",x=km({platform:k,postUrl:S});if(x.error==="required")return f("Post URL required");if(x.error==="duplicate")return f("Already submitted for this platform");if(x.error==="no_challenge")return f("Start a challenge first");if(x.error)return f("Submit failed");f("Submitted · pending demo verification"),ie("share")}),e.querySelectorAll("[data-verify]").forEach(y=>{y.addEventListener("click",()=>{Vr(y.getAttribute("data-verify"),"verified"),f("Verified · demo (manual)"),ie("share")})}),e.querySelectorAll("[data-reject]").forEach(y=>{y.addEventListener("click",()=>{Vr(y.getAttribute("data-reject"),"rejected"),f("Rejected"),ie("share")})}),e.querySelectorAll("[data-claim-share]").forEach(y=>{y.addEventListener("click",()=>{Ue();const k=wm(y.getAttribute("data-claim-share"));if(k.error==="not_claimable")return f("Not claimable yet");if(k.error)return f("Claim failed");f(`Claimed · ${k.claim.label}`),ie("share")})}),(m=e.querySelector("#shReset"))==null||m.addEventListener("click",()=>{Sm(),f("Share demo reset"),ie("share")}),(h=e.querySelector("#refCopy"))==null||h.addEventListener("click",async()=>{var k;Ue(),Es();const y=((k=e.querySelector("#refLink"))==null?void 0:k.value)||tc();try{await navigator.clipboard.writeText(y),f("Referral link copied")}catch{f("Copy manually")}}),(g=e.querySelector("#refInviteForm"))==null||g.addEventListener("submit",y=>{var x;y.preventDefault(),Ue();const k=((x=e.querySelector("#refInviteName"))==null?void 0:x.value)||"",S=Em({username:k});if(S.error==="self_referral")return f("Self-referral blocked");if(S.error==="signin")return f("Sign in required");if(S.error)return f("Could not add invitee");f(`Invitee ${S.invitee.username} signed up`),ie("refer")}),e.querySelectorAll("[data-welcome]").forEach(y=>{y.addEventListener("click",()=>{const k=xm(y.getAttribute("data-welcome"));if(k.error==="fraud")return f("Flagged fraud");if(k.error)return f("Welcome claim failed");f(k.perk||"Welcome perk claimed"),ie("refer")})}),e.querySelectorAll("[data-activeday]").forEach(y=>{y.addEventListener("click",()=>{const k=Am(y.getAttribute("data-activeday"));if(k.error==="fraud")return f("Flagged fraud");if(k.error==="outside_window")return f("Outside first-7-day window");if(k.error==="window_full")return f("All 7 demo days already marked");if(k.error)return f("Could not mark day");const S=(k.invitee.activeDays||[]).length;f(S>=3?`${k.invitee.username} → verified active (${S} days)`:`Active day ${S}/3 for ${k.invitee.username}`),ie("refer")})}),e.querySelectorAll("[data-fraud]").forEach(y=>{y.addEventListener("click",()=>{Hr(y.getAttribute("data-fraud"),!0),f("Flagged as fraud · demo"),ie("refer")})}),e.querySelectorAll("[data-unfraud]").forEach(y=>{y.addEventListener("click",()=>{Hr(y.getAttribute("data-unfraud"),!1),f("Fraud flag cleared"),ie("refer")})}),e.querySelectorAll("[data-claim-ref]").forEach(y=>{y.addEventListener("click",()=>{Ue();const k=Tm(y.getAttribute("data-claim-ref"));if(k.error==="not_claimable")return f("Not claimable yet");if(k.error)return f("Claim failed");f(`Milestone claimed · ${k.claim.label}`),ie("refer")})}),(v=e.querySelector("#refSeed"))==null||v.addEventListener("click",()=>{Ue();const y=Pm({force:!0});if(y.error==="signin")return f("Sign in required");f(`Loaded ${y.seeded||0} demo invitees`),ie("refer")}),(b=e.querySelector("#refReset"))==null||b.addEventListener("click",()=>{Ue(),Cm(),f("Refer demo reset"),ie("refer")})}function nS(e){return{badge:`Phase ${e} shell`}}function ol(e){return`
    <article class="card pikk-video-tile">
      <div class="hero-video" style="margin:0 0 10px">
        <iframe src="${l(ct(e.embed))}" title="${l(e.title)}" allowfullscreen loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </div>
      <span class="chip">${l(e.category||"Music Videos")}</span>
      <h3 style="margin:8px 0 4px">${l(e.title)}</h3>
      <p class="muted" style="margin:0 0 8px">${l(e.artist||"DatBoiSkeet")}</p>
      <div class="row wrap">
        <a class="btn" href="${l(e.youtube)}" target="_blank" rel="noopener">Open on YouTube</a>
        <button class="btn ghost video-share" data-url="${l(e.youtube)}" data-title="${l(e.title)}">Share link</button>
      </div>
    </article>`}function rS(){var d;const e=["Music Videos","Mixes","Interviews"],t={};ue.forEach(c=>{const p=c.category||"Music Videos";(t[p]||(t[p]=[])).push(c)});const s=e.filter(c=>{var p;return(p=t[c])==null?void 0:p.length}).map(c=>{const p=t[c].map(ol).join("");return`<section class="pikk-video-section" data-video-category="${l(c)}"><h3>${l(c)}</h3><div class="pikk-video-grid">${p}</div></section>`}).join(""),a=Object.keys(t).filter(c=>!e.includes(c)).map(c=>`<section class="pikk-video-section" data-video-category="${l(c)}"><h3>${l(c)}</h3><div class="pikk-video-grid">${t[c].map(ol).join("")}</div></section>`).join(""),i=Ht({publishedOnly:!0,types:["video"]}),n=i.map(c=>{const p=c.youtube||"",m=c.embed||"";if(m||p){const h=m||"";return`<article class="card catalog-admin-video" data-id="${l(c.id)}">
          ${h?`<div class="hero-video" style="margin:0 0 10px"><iframe src="${l(ct(h))}" title="${l(c.title)}" allowfullscreen loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>`:""}
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
      </article>`}).join(""),o={};hp.forEach(c=>{var p;(o[p=c.category]||(o[p]=[])).push(c)});const r=Object.entries(o).map(([c,p])=>`
      <div class="card pikk-video-coming-card" data-video-coming-category="${l(c)}">
        <h3>${l(c)}</h3>
        <p class="muted" style="margin:0 0 8px">No verified URLs in repo yet — titles from plan §9 only. No invented view counts.</p>
        <ul class="list-plain">${p.map(m=>`<li><span>${l(m.title)}</span><span class="chip">Coming Soon</span></li>`).join("")}</ul>
      </div>`).join("");return P("Videos & Interviews",`${wf()}
    <section class="pikk-video-hero card">
      <div class="pikk-video-hero-copy">
        <p class="kicker">PIKK VIDEOS · OFFICIAL RELEASES</p>
        <h2>Watch. Discover. Repeat.</h2>
        <p class="muted">Verified DatBoiSkeet music videos, mixes and interviews. Original YouTube playback, with no invented view counts.</p>
        <a class="btn primary" href="#/explore">Explore creators</a>
      </div>
      ${(d=ue[0])!=null&&d.youtube?`<a class="pikk-video-hero-preview" href="${l(ue[0].youtube)}" target="_blank" rel="noopener" aria-label="Watch ${l(ue[0].title)}">
        <img src="https://i.ytimg.com/vi/${l(new URL(ue[0].youtube).searchParams.get("v")||"")}/hqdefault.jpg" alt="" loading="eager" decoding="async" />
        <span class="pikk-video-hero-label">▶ ${l(ue[0].title)}</span>
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
    </section>`,{lead:"Official MVs · Mixes · Interviews · admin uploads."})}function oS(e){var o;const t=[...e.querySelectorAll("[data-videos-filter]")],s=[...e.querySelectorAll(".pikk-video-section[data-video-category]")],a=[...e.querySelectorAll("[data-video-coming-category]")],i=e.querySelector(".pikk-video-coming-list"),n=e.querySelector("[data-video-filter-status]");t.forEach(r=>r.addEventListener("click",()=>{const d=r.dataset.videosFilter||"All";t.forEach(p=>{const m=p===r;p.classList.toggle("on",m),p.setAttribute("aria-pressed",m?"true":"false")}),s.forEach(p=>{const m=d==="All"||p.dataset.videoCategory===d;p.hidden=!m}),a.forEach(p=>{p.hidden=d!=="All"&&p.dataset.videoComingCategory!==d});const c=a.some(p=>!p.hidden);if(i&&(i.hidden=!c),n){const p=s.some(m=>!m.hidden);n.textContent=d==="All"?"Showing all video categories and upcoming titles.":p?`Showing ${d}${c?" and upcoming titles":""}.`:c?`No published ${d} videos yet. Upcoming titles are listed below.`:`No published ${d} videos yet.`}})),(o=e.querySelector(".pikk-video-filters"))==null||o.addEventListener("keydown",r=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(r.key))return;const d=t.indexOf(r.target);if(d<0||!t.length)return;r.preventDefault();const c=r.key==="Home"?0:r.key==="End"?t.length-1:(d+(r.key==="ArrowRight"?1:-1)+t.length)%t.length;t[c].focus(),t[c].click()}),Li(e),e.querySelectorAll("video.catalog-video").forEach(r=>{r.addEventListener("play",()=>bs()),r.addEventListener("pause",()=>dt()),r.addEventListener("ended",()=>dt())}),e.querySelectorAll(".video-share").forEach(r=>{r.addEventListener("click",async()=>{const d=r.dataset.url||"";try{await navigator.clipboard.writeText(d),f("Link copied")}catch{f(d||"Copy failed")}})}),e.querySelectorAll("[data-idb-src]").forEach(async r=>{const d=(r.getAttribute("data-idb-src")||"").trim();if(d)try{const c=await _i(d);if(!c){r.tagName==="VIDEO"&&r.insertAdjacentHTML("afterend",'<p class="muted" style="font-size:12px">Media blob missing — re-upload from Admin.</p>');return}if((r.tagName==="IMG"||r.tagName==="VIDEO"||r.tagName==="AUDIO")&&(r.setAttribute("src",c),r.src=c,r.tagName==="VIDEO"||r.tagName==="AUDIO")){r.setAttribute("playsinline",""),r.setAttribute("webkit-playsinline",""),r.controls=!0;try{r.load()}catch{}}}catch(c){console.warn("idb media hydrate failed",d,c)}})}function lS(){const e=On.map(a=>`<li class="pikk-tier" data-tier="${l(a.id)}"><span><strong>${l(a.name)}</strong><br/><small class="muted">${l(a.blurb||"")}</small></span><strong>$${a.price}/mo</strong><button type="button" class="btn primary pikk-join" data-join="${l(a.id)}">${a.id==="inner"?"Join":"Subscribe"}</button></li>`).join(""),t=I().creatorSellApps||[],s=t.length?`<ul class="list-plain" style="margin-top:10px">${t.slice(0,8).map(a=>`<li><span>${l(a.name)} · ${l(a.contact)} · ${l(a.sells)}</span><span class="chip">${l(a.status||"pending")}</span></li>`).join("")}</ul>`:'<p class="muted" style="margin:8px 0 0;font-size:12px">No applications on this device yet.</p>';return P("Pricing",`<div class="card">
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

    <div class="card" id="memberships"><h3>Memberships</h3><p class="pikk-member-status" data-member-status role="status">${l(or(wc()))}</p><ul class="list-plain">${e}</ul><div class="pikk-join-confirm" data-join-confirm hidden></div><p class="muted" style="font-size:12px">TEST MODE · no real charge. Billing starts when Stripe is live.</p></div>
     <div class="card"><h3>Music price ranges</h3>
       <ul class="list-plain">
         <li><span>Song</span><span>$0.99–$1.29</span></li>
         <li><span>EP</span><span>$4.99–$6.99</span></li>
         <li><span>Album</span><span>$9.99–$12.99</span></li>
       </ul>
       <p class="chip">TEST MODE · no charges</p>
     </div>`,{lead:"Sell music, videos, beats &amp; merch · rules &amp; fees · apply form · memberships &amp; gifts — admin-adjustable."})}function cS(e){var s;wS(e||document),typeof location<"u"&&(location.hash.includes("focus=sell")||location.hash.includes("creator-sell"))&&setTimeout(()=>{var a;return(a=document.getElementById("creator-sell"))==null?void 0:a.scrollIntoView({behavior:"smooth",block:"start"})},60),(s=e.querySelector("#csSubmit"))==null||s.addEventListener("click",()=>{var d,c,p,m,h,g;const a=(c=(d=e.querySelector("#csName"))==null?void 0:d.value)==null?void 0:c.trim(),i=(m=(p=e.querySelector("#csContact"))==null?void 0:p.value)==null?void 0:m.trim(),n=((h=e.querySelector("#csSells"))==null?void 0:h.value)||"both",o=!!((g=e.querySelector("#csAgree"))!=null&&g.checked);if(!a||!i)return f("Name and email/handle required");if(!o)return f("Agree to rules & fees to continue");const r=Cp({name:a,contact:i,sells:n,agreed:o});if(r!=null&&r.error)return f(r.error==="rules"?"Agree to rules & fees to continue":"Name and email/handle required");f("Application saved · TEST MODE"),K("#/pricing?focus=sell")})}function dS(){return P("Community Guidelines",`<div class="card">
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
    </div>`,{lead:"Rules for posts, chat, Live & Lounge — plan §13."})}const nn=[{id:"dbs-lounge",cat:"NETWORK",hash:"#dbs-lounge",name:"PIKK Lounge",blurb:"Main hub · official announcements & network news",chip:"Hub"},{id:"conversation",cat:"NETWORK",hash:"#the-conversation",name:"The Conversation",blurb:"Public music & fan discussion threads",chip:"Public"},{id:"listening",cat:"VOICE / LISTENING",hash:"#listening-rooms",name:"Listening Rooms",blurb:"Listening parties & reactions to new releases",chip:"Parties"},{id:"backstage",cat:"MEMBERS",hash:"#backstage-rooms",name:"Backstage Rooms",blurb:"Tier-restricted spaces for PIKK+ / Backstage / Inner Circle",chip:"Members"},{id:"live-rooms",cat:"NETWORK",hash:"#live-rooms",name:"Live Rooms",blurb:"Scheduled community events & discussions",chip:"Events"},{id:"spotlight",cat:"NETWORK",hash:"#the-spotlight",name:"The Spotlight",blurb:"Featured fan conversations & creator posts",chip:"Featured"}],ll={"dbs-lounge":[{who:"PIKK · System",text:"Welcome to PIKK Lounge — DatBoiSkeet’s channel-style community hub.",tag:"DEMO"},{who:"TEST MODE",text:"Live chat isn’t connected yet. These rows are placeholders so the room pane feels real.",tag:"DEMO"}],conversation:[{who:"DEMO",text:"Drop takes on new releases here once Phase 2 chat ships.",tag:"DEMO"}],listening:[{who:"DEMO",text:"Listening parties will sync reactions here — preview only.",tag:"DEMO"}],backstage:[{who:"DEMO",text:"Member-tier rooms unlock with PIKK+ / Backstage / Inner Circle.",tag:"DEMO"}],"live-rooms":[{who:"DEMO",text:"Scheduled community events will list here — no live presence yet.",tag:"DEMO"}],spotlight:[{who:"DEMO",text:"Featured fan conversations land here in Phase 2.",tag:"DEMO"}]},pS=[{name:"DatBoiSkeet",role:"Owner"},{name:"SkeetMod",role:"Mod · DEMO"},{name:"FanDemo01",role:"DEMO"},{name:"ListenerX",role:"DEMO"}];function uS(e){const s=(ll[e.id]||ll["dbs-lounge"]).map(a=>`<div class="lounge-msg">
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
  </div>`}function mS(){const e=[],t=new Set;nn.forEach(n=>{t.has(n.cat)||(t.add(n.cat),e.push(n.cat))});const s=e.map(n=>{const o=nn.filter(r=>r.cat===n).map(r=>`<button type="button" class="lounge-channel${r.id==="dbs-lounge"?" on":""}" data-channel="${l(r.id)}" aria-pressed="${r.id==="dbs-lounge"?"true":"false"}">
            <span class="lounge-hash">#</span>
            <span class="lounge-channel-label">${l(r.name)}</span>
            <span class="chip lounge-channel-chip">${l(r.chip)}</span>
          </button>`).join("");return`<div class="lounge-cat-block">
        <p class="lounge-cat-label">${l(n)}</p>
        ${o}
      </div>`}).join(""),a=nn.map(uS).join(""),i=pS.map(n=>`<li><span class="lounge-member-dot" aria-hidden="true"></span><span><strong>${l(n.name)}</strong><br/><span class="muted" style="font-size:11px">${l(n.role)}</span></span></li>`).join("");return P("PIKK Lounge",`<div class="card lounge-intro">
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
    </div>`,{lead:"Discord-inspired channels · DatBoiSkeet branded.",...nS(2)})}function hS(e=document){const t=e.querySelector("#loungeDiscord")||e,s=[...t.querySelectorAll(".lounge-channel")],a=[...t.querySelectorAll(".lounge-pane")];s.length&&s.forEach(i=>{i.addEventListener("click",()=>{const n=i.dataset.channel;s.forEach(o=>{const r=o===i;o.classList.toggle("on",r),o.setAttribute("aria-pressed",r?"true":"false")}),a.forEach(o=>{o.dataset.pane===n?o.removeAttribute("hidden"):o.setAttribute("hidden","")})})})}const fS=Object.freeze([{id:"creator",label:"Creator",note:"General creator tools and profile publishing."},{id:"artist",label:"Artist",note:"Music uploads and artist tools."},{id:"streamer",label:"Streamer",note:"Livestream creator tools."},{id:"producer",label:"Producer",note:"Beat/music creator tools."},{id:"publisher",label:"Publisher",note:"Publishing/rights workflow declaration."},{id:"seller",label:"Seller",note:"Marketplace/storefront tools."},{id:"advertiser",label:"Advertiser",note:"Business advertising tools."},{id:"clipper",label:"Clipper",note:"Clipper campaigns and submissions."}]);function gS(){const e=wr(),t=fS.map(s=>`<label class="card creator-role-choice" style="margin:0" data-role-card="${l(s.id)}"><span class="row" style="align-items:flex-start"><input type="checkbox" name="creatorRole" value="${l(s.id)}" /><span class="spacer"><strong>${l(s.label)}</strong><br/><small class="muted">${l(s.note)}</small></span><span class="chip creator-role-state" data-role-state="${l(s.id)}">not selected</span></span></label>`).join("");return P("Signup & Creator Apps",`<div class="card">
      <p class="kicker">Join PIKK</p>
      <h2 style="margin:0 0 8px">Your PIKK account</h2>
      <p>Everyone uses one PIKK account. Creator roles are declarations on that account—not separate accounts.</p>
      <p class="muted" style="margin:8px 0 12px">${e?"<strong>Backend account roles are connected.</strong> Sign in, then select the roles that describe how you plan to use PIKK.":"<strong>Account role service is not connected in this build.</strong> Role changes will not be saved until the production API endpoint is configured."}</p>
      <a class="btn primary" href="#/profile">Open Profile / Sign in</a>
      <a class="btn ghost" href="#/guidelines" style="margin-left:8px">Read Guidelines</a>
      <p class="muted" style="margin:10px 0 0;font-size:12px">By using PIKK you agree to the <a href="#/terms">Terms</a> (draft), including <a href="#/terms?s=security">Security &amp; Data Breach / Limitation of Liability</a>, and the <a href="#/privacy">Privacy</a> notice.</p>
    </div>

    <section class="card" id="creator-role-manager">
      <h3>Account roles</h3>
      <p class="muted">Member is always included. Selecting Creator, Artist, Streamer, Producer, Publisher, Seller, Advertiser or Clipper declares your intended use. <strong>It does not grant admin privileges, payout eligibility, verification, or monetization approval.</strong></p>
      ${e?`<form id="creatorRoleForm">
        <label class="card creator-role-choice" style="margin:0 0 10px"><span class="row"><input type="checkbox" checked disabled /><span><strong>Member</strong><br/><small class="muted">Every PIKK account.</small></span></span></label>
        <div class="grid-2" id="creatorRoleChoices">${t}</div>
        <p id="creatorRoleStatus" class="muted" role="status" aria-live="polite" style="margin:12px 0"></p>
        <button class="btn primary" type="submit">Save account roles</button>
      </form>`:'<p class="chip">Role manager waiting for backend API configuration</p>'}
    </section>

    <div class="card">
      <h3>Specialized applications &amp; tools</h3>
      <p class="muted" style="margin:0 0 10px">Some tools still require additional review beyond the role declaration above.</p>
      <ul class="list-plain">
        <li><span><strong>Creator / Streamer</strong><br/><span class="muted" style="font-size:12px">Livestream plan, safety and creator tools</span></span><a href="#/live">Live</a></li>
        <li><span><strong>Artist / Producer</strong><br/><span class="muted" style="font-size:12px">Private draft music uploads with rights certification</span></span><a href="#/music?view=upload">Upload Music</a></li>
        <li><span><strong>Clipper</strong><br/><span class="muted" style="font-size:12px">Work samples &amp; campaign workflow</span></span><a href="#/clippers">Apply</a></li>
        <li><span><strong>Brand / Advertiser</strong><br/><span class="muted" style="font-size:12px">Business campaigns &amp; disclosures</span></span><a href="#/marketplace">Marketplace</a></li>
        <li><span><strong>Seller</strong><br/><span class="muted" style="font-size:12px">Storefront, fulfillment &amp; verification</span></span><a href="#/marketplace">Storefront</a></li>
      </ul>
    </div>

    <div class="card">
      <h3>Approval flow</h3>
      <p class="muted" style="margin:0">Account → declare role(s) → complete any role-specific application/verification → admin/provider review where required → unlock restricted tools. Earnings still require identity/tax/payout checks before real payouts.</p>
    </div>`,{lead:e?"Real account role declarations + specialized creator applications":"Creator role manager waiting for production API configuration"})}function vS(e){if(!wr())return;const t=e.querySelector("#creatorRoleForm"),s=e.querySelector("#creatorRoleStatus");if(!t)return;const a=i=>{s&&(s.textContent=i)};ca.me().then(i=>{const n=(i.signup_roles||[]).map(r=>typeof r=="string"?{role:r,status:"declared"}:r),o=new Map(n.map(r=>[r.role,r.status||"declared"]));e.querySelectorAll('input[name="creatorRole"]').forEach(r=>{r.checked=o.has(r.value);const d=e.querySelector(`[data-role-state="${CSS.escape(r.value)}"]`);d&&(d.textContent=o.get(r.value)||"not selected")}),a("Current account roles and review statuses loaded.")}).catch(i=>{a((i==null?void 0:i.status)===401?"Sign in from Profile to manage creator roles.":(i==null?void 0:i.message)||"Could not load account roles.")}),t.addEventListener("submit",async i=>{i.preventDefault();const n=[...e.querySelectorAll('input[name="creatorRole"]:checked')].map(r=>r.value),o=t.querySelector('button[type="submit"]');o&&(o.disabled=!0),a("Saving account roles…");try{const d=((await ca.updateSignupRoles(n)).signup_roles||[]).filter(c=>c!=="member");e.querySelectorAll('input[name="creatorRole"]').forEach(c=>{const p=e.querySelector(`[data-role-state="${CSS.escape(c.value)}"]`);p&&(p.textContent=d.includes(c.value)?"declared":"not selected")}),a(d.length?"Saved role declarations: "+d.join(", ")+". Review status may be updated separately where required.":"Saved as Member only."),f("Account roles saved")}catch(r){a((r==null?void 0:r.status)===401?"Sign in to save account roles.":(r==null?void 0:r.message)||"Could not save account roles.")}finally{o&&(o.disabled=!1)}})}function bS(){const t=[{label:"Registration & role approval",status:"Demo",note:"Profile/signup local demo · real auth later"},{label:"Moderation / reporting / appeals",status:"TODO",note:"Guidelines copy ready · enforcement UI Phase 2"},{label:"Payments & refunds",status:"TEST",note:"TEST MODE only · no real charges"},{label:"Creator payouts verification",status:"SHELL",note:"Wallet / KYC stubs · not launch-ready"},{label:"Music & video rights",status:"Partial",note:"3 official MVs · streaming links still SHELL"},{label:"Gift-battle fraud prevention",status:"SHELL",note:"Gift Battles not wired for launch"},{label:"Livestream safety",status:"Demo",note:"Go-live demo PASS · age/safety stack incomplete"},{label:"Background audio pause/resume",status:"PARTIAL",note:"§17 sticky top YT player + pauseDbsPlayer hooks"},{label:"Account recovery / optional 2FA",status:"TODO",note:"Local demo sign-in only"},{label:"Loyalty analytics consent",status:"SHELL",note:"Privacy/consent controls before launch"},{label:"PIKK Connect safety (age + WebRTC)",status:"Blocked",note:"Must not launch without assurance"}].map(s=>`<li><span><strong>${l(s.label)}</strong><br/><span class="muted" style="font-size:12px">${l(s.note)}</span></span><span class="chip">${l(s.status)}</span></li>`).join("");return P("Launch Readiness",`<div class="card">
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
    </div>`,{lead:"Pre-launch checklist with honest demo status · §31."})}function yS(){const e=[{n:1,title:"Foundation",summary:"Videos, Music/Vault, Posts, profiles, followers, engagement alerts, Clippers applications.",status:"DONE",items:[{label:"§1 Posts",status:"DONE",href:"#/posts"},{label:"§2 Clippers apply",status:"DONE",href:"#/clippers"},{label:"§7 Profiles",status:"DONE",href:"#/profile"},{label:"§8 Music & Vault",status:"DONE",href:"#/music"},{label:"§9 Videos & Interviews",status:"DONE",href:"#/videos"},{label:"§14 Streaming links",status:"DONE",href:"#/music"},{label:"§19 Loading splash",status:"DONE",href:"#/home"},{label:"§20 Home dashboard",status:"DONE",href:"#/home"},{label:"§21 Merch showcase",status:"DONE",href:"#/merch"},{label:"§34 Coming Soon covers",status:"DONE",href:"#/music"},{label:"§17 Home MV + continuous play",status:"PARTIAL",href:"#/home",note:"Sticky top YT player · Stream Everywhere open links · PENDING AUDIT"}]},{n:2,title:"Growth & Creator Economy",summary:"Clipper campaigns, missions, referrals, creator earnings, and payouts.",status:"DONE",items:[{label:"§5 Creator Earnings",status:"DONE",href:"#/earnings"},{label:"§6 Missions",status:"DONE",href:"#/missions"},{label:"§27 Wallet & Payouts",status:"DONE",href:"#/wallet"},{label:"§32 Share & Earn",status:"DONE",href:"#/share"},{label:"§33 Refer & Earn",status:"DONE",href:"#/refer"},{label:"§10 Pricing",status:"DONE",href:"#/pricing"},{label:"§11 Admin dashboard",status:"DONE",href:"#/admin"},{label:"§16 Signup / Creator apps",status:"DONE",href:"#/signup"},{label:"§24 Explore",status:"DONE",href:"#/explore"},{label:"§25 Notifications",status:"DONE",href:"#/notifications"},{label:"§26 Fan Clubs",status:"DONE",href:"#/fanclubs"},{label:"§28 Loyalty Club",status:"DONE",href:"#/loyalty"},{label:"§22 Profile Shop cosmetics",status:"DONE",href:"#/shop",note:"Checker PASS · cosmetics demo"}]},{n:3,title:"Live & Marketplace",summary:"Creator livestreaming, gifts, donations, advertising, creator subscriptions, and Marketplace.",status:"DONE",items:[{label:"§3 Live",status:"DONE",href:"#/live"},{label:"§4 Marketplace ads",status:"DONE",href:"#/marketplace"},{label:"§18 Messages",status:"DONE",href:"#/messages"},{label:"§23 Gift Battles",status:"DONE",href:"#/giftbattles"},{label:"§29 Multi-Guest Live",status:"DONE",href:"#/multiguest"},{label:"§30 Open Mic",status:"DONE",href:"#/openmic"},{label:"§35 24/7 Spotlight",status:"DONE",href:"#/spotlight"},{label:"§36 Connect (opt-in shell)",status:"DONE",href:"#/connect"},{label:"§37 Restream + streamer tiers",status:"DONE",href:"#/restream"},{label:"§13 Guidelines",status:"DONE",href:"#/guidelines"},{label:"§15 Community / Lounge",status:"DONE",href:"#/community"},{label:"§31 Launch readiness",status:"DONE",href:"#/launch"}]}],t=a=>a==="DONE"?"chip chip-ok":a==="PARTIAL"?"chip chip-partial":a==="PENDING AUDIT"?"chip chip-audit":"chip",s=e.map(a=>{const i=a.items.map(n=>{const o=n.note?`<br/><span class="muted" style="font-size:12px">${l(n.note)}</span>`:"";return`<li><span>${n.href?`<a href="${l(n.href)}" style="color:inherit;text-decoration:none"><strong>${l(n.label)}</strong></a>`:`<strong>${l(n.label)}</strong>`}${o}</span><span class="${t(n.status)}">${l(n.status)}</span></li>`}).join("");return`<div class="card">
      <div class="row wrap" style="gap:8px;align-items:center;margin-bottom:8px">
        <span class="chip">Phase ${a.n}</span>
        <span class="${t(a.status)}">${l(a.status)}</span>
      </div>
      <h2 style="margin:0 0 6px">${l(a.title)}</h2>
      <p class="muted" style="margin:0 0 12px">${l(a.summary)}</p>
      <ul class="list-plain">${i}</ul>
    </div>`}).join(`

    `);return P("Development Phases",`<div class="card">
      <p class="kicker">Plan §12</p>
      <h2 style="margin:0 0 8px">Roadmap · what shipped vs remaining</h2>
      <p class="muted" style="margin:0">Phase 1–3 from the DatBoiSkeet developer plan. Chips mirror STATUS.md — <strong>DONE</strong> needs Checker PASS; <strong>PARTIAL</strong> and <strong>PENDING AUDIT</strong> are not launch-complete.</p>
      <p class="muted" style="margin:10px 0 0">Still open: <a href="#/home">§17 sticky player</a> (YT embed · no PIKK-hosted audio yet) · <a href="#/shop">§22 Profile Shop</a> (awaiting Checker) · identity/payout verification &amp; fraud controls before activating real money features.</p>
    </div>

    ${s}

    <div class="card">
      <h3>Before activating paid features</h3>
      <p class="muted" style="margin:0">Implement identity and payout verification, payment security, copyright controls, moderation, and fraud prevention before turning on real charges, gifts, or payouts. See <a href="#/launch">Launch Readiness</a>.</p>
    </div>`,{lead:"Phase 1 · Phase 2 · Phase 3 roadmap with live status chips · §12."})}function kS(e){return P("Not found",`<div class="card"><p>No page for <code>${l(e)}</code>.</p><a class="btn" href="#/home">Home</a></div>`)}function wS(e){const t=e.querySelector("[data-join-confirm]");t&&e.querySelectorAll("[data-join]").forEach(s=>s.addEventListener("click",()=>{const a=On.find(i=>i.id===s.dataset.join);a&&(t.hidden=!1,t.innerHTML=`<div role="dialog" aria-modal="false" aria-labelledby="joinH" class="pikk-join-dialog"><h4 id="joinH">Join ${l(a.name)} · $${a.price}/mo</h4><p>TEST MODE: no card is charged. Your choice is saved on this device; billing starts when Stripe is live.</p><button type="button" class="btn primary" data-join-ok="${l(a.id)}">Confirm ${l(a.name)}</button> <button type="button" class="btn ghost" data-join-cancel>Cancel</button></div>`,t.querySelector("[data-join-ok]").addEventListener("click",()=>{const i=bh(a);e.querySelector("[data-member-status]").textContent=or(i),t.hidden=!0,t.innerHTML=""}),t.querySelector("[data-join-cancel]").addEventListener("click",()=>{t.hidden=!0,t.innerHTML=""}))}))}function SS(){return P("Create on PIKK",`<div class="pikk-create-page">${np()}
    <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · uploads depend on available prototype tools</p></div>`)}const $S={"/home":{render:Hf,bind:zf},"/create":{render:SS},"/promote":{render:Mg,bind:Lg},"/donate":{render:Dg,bind:_g},"/payments":{render:qg,bind:Rg},"/story":{render:zg,bind:Jg},"/crew":{render:Vg,bind:Wg},"/favorites":{render:Hg,bind:Yg},"/updates":{render:Jf,bind:Qf},"/posts":{render:Tg,bind:Cg},"/music":{render:So,bind:$o},"/ai-artists":{render:lv,bind:cv},"/shield":{render:gv,bind:vv},"/support":{render:Tv,bind:Cv},"/verify-age":{render:Iv,bind:Mv},"/biometric-policy":{render:Ov,bind:qv},"/support-staff":{render:Nv,bind:Bv},"/creator-review":{render:Fv,bind:Gv},"/vault":{render:So,bind:$o},"/merch":{render:Uv,bind:Vv},"/profile":{render:zv,bind:Wv},"/user":{render:rb,bind:lb},"/verify-email":{render:cb,bind:db},"/clippers":{render:ub,bind:mb},"/videos":{render:rS,bind:oS},"/live":{render:my,bind:vy},"/viral-live":{render:wy,bind:Sy},"/explore":{render:ok,bind:lk},"/marketplace":{render:xy,bind:Ay},"/earnings":{render:Vy,bind:Hy},"/missions":{render:Jy,bind:Qy},"/pricing":{render:lS,bind:cS},"/admin":{render:ug,bind:mg},"/mastermind":{render:Sg,bind:$g},"/guidelines":{render:dS},"/settings":{render:Sc,bind:$c},"/contest":{render:Qr,bind:vn},"/contest/twerk":{render:Qr,bind:vn},"/community":{render:mS,bind:hS},"/communities":{render:vw,bind:bw},"/signup":{render:gS,bind:vS},"/terms":{render:pp,bind:mp},"/privacy":{render:up},"/messages":{render:qy,bind:Ny},"/shop":{render:ew,bind:tw},"/profile-shop":{render:zk,bind:Wk},"/giftbattles":{render:yk,bind:kk},"/notifications":{render:By,bind:Ky},"/fanclubs":{render:Ok,bind:qk},"/wallet":{render:Fy,bind:Gy},"/loyalty":{render:Rk,bind:Nk},"/multiguest":{render:Mk,bind:Lk},"/openmic":{render:Kk,bind:jk},"/launch":{render:bS},"/phases":{render:yS},"/share":{render:tS,bind:aS},"/refer":{render:sS,bind:iS},"/spotlight":{render:uw,bind:mw},"/restream":{render:()=>(queueMicrotask(()=>{location.hash="/connect#connect-multistream"}),In()),bind:Mn},"/shorts":{render:el,bind:tl},"/clips":{render:el,bind:tl},"/connect":{render:In,bind:Mn},"/blockwars":{render:$w,bind:xw},"/games":{render:Aw,bind:Cw},"/dating":{render:Pw,bind:Iw},"/roast-arena":{render:Yw,bind:Ww}};function Pr(){var t,s,a;const e=document.getElementById("tabbar");if(I().user)try{Un()}catch{}e.innerHTML=qn.map(i=>{const o="/"+i.href.replace(/^#/,"").replace(/^\//,"").split(/[?#]/)[0],r=l(i.label);return`<a${i.primary?' class="tab-primary"':""} href="${i.href}" data-path="${o}" aria-label="${r}"${i.href==="#/create"?' aria-haspopup="dialog" aria-controls="pikkCreateMenu" aria-expanded="false"':i.href==="#/music"?' aria-haspopup="dialog" aria-controls="pikkMusicMenu" aria-expanded="false"':oa[o.slice(1)]?` aria-haspopup="dialog" aria-controls="pikk${r}Menu" aria-expanded="false"`:""}><span class="tab-ico">${i.href==="#/create"?`<img class="pikk-create-logo-icon" src="${lt("/brand/pikk-logo-badge.png")}" alt="" width="40" height="29" decoding="async" />`:Zs[i.icon]||""}</span><span>${r}</span></a>`}).join("");for(const i of Object.keys(oa))(t=e.querySelector(`a[href="#/${i}"]`))==null||t.addEventListener("click",n=>{n.preventDefault(),Mh(i,n.currentTarget)});(s=e.querySelector('a[href="#/music"]'))==null||s.addEventListener("click",i=>{i.preventDefault(),Ft(),Oh(i.currentTarget)}),(a=e.querySelector('a[href="#/create"]'))==null||a.addEventListener("click",i=>{var o;Gs(),Ft(),i.preventDefault();const n=ES();n.hidden=!n.hidden,i.currentTarget.setAttribute("aria-expanded",String(!n.hidden)),n.hidden||(o=n.querySelector("[data-create-close]"))==null||o.focus()}),e.style.gridTemplateColumns="",e.classList.remove("tabbar-scroll"),e.classList.add("tabbar-reshaped","tabbar-fit7")}function np(){return Cc.map(e=>{const t=e.items.map(s=>{const a=`<span class="pikk-menu-icon" aria-hidden="true">${Zs[s.icon]||Zs.explore}</span><strong class="pikk-menu-title">${l(s.title)}</strong><small>${l(s.detail)}</small>`;return s.href?`<a href="${l(s.href)}" class="pikk-create-tile">${a}</a>`:`<div class="pikk-create-tile pikk-create-tile-planned" aria-disabled="true">${a}</div>`}).join("");return`<section class="pikk-create-menu-group" aria-label="${l(e.title)}"><h3>${l(e.title)}</h3><div class="pikk-create-options pikk-create-grid">${t}</div></section>`}).join("")}const rp=()=>{const e=(location.hash.replace(/^#/,"")||"/home").split(/[?#]/)[0];document.querySelectorAll(".pikk-explore-rail a").forEach(t=>{t.getAttribute("href").slice(1)===e?t.setAttribute("aria-current","page"):t.removeAttribute("aria-current")})};window.addEventListener("hashchange",rp);rp();function ES(){let e=document.getElementById("pikkCreateMenu");if(e)return e;e=document.createElement("div"),e.id="pikkCreateMenu",e.className="pikk-create-overlay",e.hidden=!0,e.innerHTML=`<div class="pikk-create-sheet" role="dialog" aria-modal="true" aria-label="Create on PIKK">
    <div class="pikk-create-head"><strong>Create on PIKK</strong><button type="button" class="btn ghost" data-create-close aria-label="Close create menu">✕</button></div>
    ${np()}
    <button type="button" class="pikk-menu-cancel" data-create-close>Cancel</button>
    <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · uploads depend on available prototype tools</p>
  </div>`,document.body.appendChild(e);const t=(s=!1)=>{e.hidden=!0;const a=document.querySelector('#tabbar a[href="#/create"]');a==null||a.setAttribute("aria-expanded","false"),s&&(a==null||a.focus())};return window.addEventListener("hashchange",()=>t()),e.addEventListener("click",s=>{s.target===e||s.target.closest("[data-create-close]")?t(!0):s.target.closest(".pikk-create-options a")&&t()}),document.addEventListener("keydown",s=>{if(!e.hidden&&(s.key==="Escape"&&(s.preventDefault(),t(!0)),s.key==="Tab")){const a=[...e.querySelectorAll("a[href], button:not([disabled])")],i=a[0],n=a[a.length-1];if(!i){s.preventDefault();return}e.contains(document.activeElement)?s.shiftKey&&document.activeElement===i?(s.preventDefault(),n.focus()):!s.shiftKey&&document.activeElement===n&&(s.preventDefault(),i.focus()):(s.preventDefault(),(s.shiftKey?n:i).focus())}}),e}function xS(){const e=document.getElementById("tabbar");if(!e)return;Pr();const t=Ke();Wc(e,t.path);try{op()}catch{}}function AS(){const e=document.getElementById("sideNav"),t=Ke(),s="#"+(t.raw||t.path),a="#"+t.path,i=Uh().map(n=>{if(n.href)return`<a class="drawer-direct${n.href===a||n.href===s?" on":""}" href="${n.href}">${l(n.label)}</a>`;const o=n.links||[],r=o.some(m=>m.href===a||m.href===s),d=r?" open":"",c=r?" has-active":"",p=o.map(m=>m.href?`<a class="drawer-link${m.href===a||m.href===s?" on":""}" href="${m.href}">${l(m.label)}</a>`:`<span class="drawer-link drawer-soon" aria-disabled="true">${l(m.label)} <small>· ${l(/planned/i.test(m.detail||"")?"Planned":"Coming Soon")}</small></span>`).join("");return`<div class="drawer-group${d}${c}" data-group="${l(n.id)}"><button type="button" class="drawer-cat" aria-expanded="${r?"true":"false"}"><span>${l(n.label)}</span><span class="drawer-caret" aria-hidden="true"></span></button><div class="drawer-children" role="group">${p}</div></div>`}).join("");e.innerHTML=`<h2 class="drawer-brand"><img src="${lt("/brand/pikk-logo-official.png")}" alt="" width="140" height="33" decoding="async" /><span>PIKK Network</span></h2>${i}`}function Hs(e,t=!1){mf({drawer:document.getElementById("sideNav"),scrim:document.getElementById("scrim"),trigger:document.getElementById("menuBtn")},e,t)}function TS(e){const t=e.path;Pr(),Wc(document.getElementById("tabbar"),t),document.querySelectorAll("#sideNav a").forEach(n=>{const o=n.getAttribute("href")||"";n.classList.toggle("on",o==="#"+t||o==="#"+e.raw)});const s="#"+t,a="#"+e.raw;document.querySelectorAll("#sideNav .drawer-group").forEach(n=>{const o=[...n.querySelectorAll("a")].some(d=>d.getAttribute("href")===s||d.getAttribute("href")===a);n.classList.toggle("open",o),n.classList.toggle("has-active",o);const r=n.querySelector(".drawer-cat");r&&r.setAttribute("aria-expanded",o?"true":"false")});const i=document.getElementById("headerMsg");if(i&&(i.hidden=!1),I().user&&!Di())try{Un()}catch{}op()}function rn(e){const t=document.getElementById("headerMsgBadge"),s=document.getElementById("headerMsg");if(!(!t||!s))if(e>0){const a=e>99?"99+":String(e);t.textContent=a,t.hidden=!1,s.setAttribute("aria-label",`Messages, ${e} unread`)}else t.textContent="",t.hidden=!0,s.setAttribute("aria-label","Messages")}function op(){var t;if(Di()&&((t=I().user)==null?void 0:t.authSource)==="backend"){kt.unreadCount().then(s=>rn(Number((s==null?void 0:s.unread)||0))).catch(()=>rn(0));return}let e=0;try{e=yt()}catch{e=0}rn(e)}function CS(e){var i;Hs(!1);const t=document.getElementById("app"),s=$S[e.path],a=s?s.render(e):kS(e.path);t.innerHTML=a,zc(t),(i=s==null?void 0:s.bind)==null||i.call(s,t),Rc(t),TS(e),uf(e,t,document.getElementById("pikkRouteAnnouncer")),sf(e.path),window.scrollTo(0,0),(e.path==="/music"||e.path==="/vault")&&(location.hash.includes("vault")||e.path==="/vault")&&setTimeout(()=>{var n;return(n=document.getElementById("vault"))==null?void 0:n.scrollIntoView({behavior:"smooth"})},50),e.path==="/pricing"&&(location.hash.includes("focus=sell")||location.hash.includes("creator-sell"))&&setTimeout(()=>{var n;return(n=document.getElementById("creator-sell"))==null?void 0:n.scrollIntoView({behavior:"smooth",block:"start"})},50),e.path==="/wallet"&&(e.elementId==="wallet-coins"||e.query.section==="coins"||location.hash.includes("wallet-coins"))&&setTimeout(()=>{var n;return(n=document.getElementById("wallet-coins"))==null?void 0:n.scrollIntoView({behavior:"smooth",block:"start"})},50),e.path==="/live"&&(e.query.go==="1"||e.elementId==="live-go"||location.hash.includes("go=1"))&&setTimeout(()=>{var n;return(n=document.getElementById("live-go"))==null?void 0:n.scrollIntoView({behavior:"smooth",block:"start"})},50)}function PS(){if(new URLSearchParams(location.search).has("holdSplash"))return;const e=document.getElementById("splash");!e||e.classList.contains("hide")||(e.classList.add("hide"),Pp(),setTimeout(()=>e.remove(),wh))}function IS(){if(!gs().splashChime)return;const e=document.getElementById("splashChime");if(!e)return;const t=()=>{const a=e.play();a&&typeof a.catch=="function"&&a.catch(()=>{})};t();const s=()=>{t(),window.removeEventListener("pointerdown",s),window.removeEventListener("keydown",s)};window.addEventListener("pointerdown",s,{once:!0}),window.addEventListener("keydown",s,{once:!0})}function MS(){window.addEventListener("dbs:interrupt-music",e=>{var s;const t=((s=e==null?void 0:e.detail)==null?void 0:s.reason)||"route";ka(t)}),window.addEventListener("dbs:resume-music",e=>{var s;const t=(s=e==null?void 0:e.detail)==null?void 0:s.reason;t==="live"?Gc():t==="video"?dt():Fc(t)})}function LS(){window.addEventListener("dbs:messages-unread",()=>{try{xS()}catch{}})}async function DS(){var t;if(!ys())return;const e=I().user;e&&e.authSource!=="backend"&&Ws();try{const s=await at.me();s!=null&&s.user&&ds(s.user),qr((s==null?void 0:s.roles)||[])}catch(s){if((s==null?void 0:s.status)===401){qr([]),((t=I().user)==null?void 0:t.authSource)==="backend"&&Ws();return}console.warn("PIKK startup session check failed",s)}}async function _S(){var e;if((e=document.getElementById("pikkSkipContent"))==null||e.addEventListener("click",()=>{var t;(t=document.getElementById("app"))==null||t.focus()}),ml(),zc(document),Pr(),AS(),tf(),MS(),LS(),document.getElementById("menuBtn").addEventListener("click",()=>Hs(!0)),document.getElementById("scrim").addEventListener("click",()=>Hs(!1,!0)),document.addEventListener("keydown",t=>{var s;t.key!=="Escape"||!((s=document.getElementById("sideNav"))!=null&&s.classList.contains("open"))||(t.preventDefault(),Hs(!1,!0))}),document.getElementById("sideNav").addEventListener("click",t=>{const s=t.target.closest(".drawer-cat");if(s){t.preventDefault();const a=s.closest(".drawer-group"),i=!a.classList.contains("open");document.querySelectorAll("#sideNav .drawer-group").forEach(n=>{const o=i&&n===a;n.classList.toggle("open",o);const r=n.querySelector(".drawer-cat");r&&r.setAttribute("aria-expanded",o?"true":"false")});return}t.target.closest("a")&&Hs(!1)}),document.getElementById("notifBtn").addEventListener("click",()=>{location.hash="/notifications"}),await DS(),cf(CS),df(),yc(),(!Ip()||!gs().showSplash)&&!new URLSearchParams(location.search).has("holdSplash")){const t=document.getElementById("splash");t&&t.remove()}else{setTimeout(()=>IS(),Sh);let t=!1;setTimeout(()=>{t||(t=!0,PS())},kh)}}_S();const Ir=".pikk-menu-planned, .pikk-create-tile-planned, .drawer-soon, .pikk-notif-planned, [data-coming-soon]";function lp(e){var s,a;const t=(((s=e.querySelector(".pikk-menu-title, strong"))==null?void 0:s.textContent)||((a=e.firstChild)==null?void 0:a.textContent)||"").trim();f(t?`${t} · Coming Soon`:"Coming Soon")}document.addEventListener("click",e=>{var s,a;const t=(a=(s=e.target).closest)==null?void 0:a.call(s,Ir);t&&(e.preventDefault(),lp(t))});document.addEventListener("keydown",e=>{var s,a;if(e.key!=="Enter"&&e.key!==" ")return;const t=(a=(s=e.target).closest)==null?void 0:a.call(s,Ir);t&&(e.preventDefault(),lp(t))});new MutationObserver(()=>{document.querySelectorAll(Ir).forEach(e=>{e.hasAttribute("tabindex")||(e.setAttribute("tabindex","0"),e.setAttribute("role","button"))})}).observe(document.body,{childList:!0,subtree:!0});document.addEventListener("click",e=>{var s,a;const t=(a=(s=e.target).closest)==null?void 0:a.call(s,".pikk-home-circle-strip .pikk-home-circle");t&&lr("story:"+(t.getAttribute("href")||t.textContent.trim()),{kind:"story",opened:!0,source:t.closest("[data-promoted]")?"promote":"organic"})});
