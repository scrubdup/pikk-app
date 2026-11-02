(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function s(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(i){if(i.ep)return;i.ep=!0;const n=s(i);fetch(i.href,n)}})();function ho(e,t=Date.now()){const s=new URL(e);return s.searchParams.set("refresh",String(t)),s.toString()}var mo;(mo=document.getElementById("pikk-refresh-link"))==null||mo.addEventListener("click",function(e){e.preventDefault(),window.location.assign(ho(window.location.href))});let Wn;function g(e){const t=document.getElementById("toast");t&&(t.textContent=e,t.classList.add("show"),clearTimeout(Wn),Wn=setTimeout(()=>t.classList.remove("show"),2400))}function l(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function j(e){const t=Math.max(0,Math.floor((Date.now()-e)/1e3));if(t<60)return t+"s";const s=Math.floor(t/60);if(s<60)return s+"m";const a=Math.floor(s/60);return a<24?a+"h":Math.floor(a/24)+"d"}function L(e,t,s={}){let a="";if(s.badgeHtml)a=s.badgeHtml;else if(s.badge){const n=l(s.badge),r=s.badgeAria?` aria-label="${l(s.badgeAria)}"`:"",o=s.badgeTitle||s.badgeAria?` title="${l(s.badgeTitle||s.badgeAria)}"`:"";s.badgeHref?a=`<a class="badge-phase"${r}${o} href="${l(s.badgeHref)}">${n}</a>`:a=`<span class="badge-phase"${r}${o}>${n}</span>`}const i=s.lead?`<p class="lead">${s.lead}</p>`:"";return`
    <section class="page">
      <header class="page-head">
        <h1>${l(e)} ${a}</h1>
        ${i}
      </header>
      ${t}
    </section>
  `}const Ns={heart:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.5c0 4.6-8.8 10.4-8.8 10.4S3.2 13.1 3.2 8.5a4.5 4.5 0 0 1 8.8-1.2 4.5 4.5 0 0 1 8.8 1.2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',home:'<svg viewBox="0 0 24 24"><path d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5z" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',posts:'<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 10h8M8 14h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',camera:'<svg viewBox="0 0 24 24"><path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h2.1l1.2-1.8A1.5 1.5 0 0 1 11 3.5h2a1.5 1.5 0 0 1 1.2.7L15.4 6h2.1A2.5 2.5 0 0 1 20 8.5v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-8z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="12.5" r="3.2" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',music:'<svg viewBox="0 0 24 24"><path d="M9 18V6l10-2v12" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="7" cy="18" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="16" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',merch:'<svg viewBox="0 0 24 24"><path d="M6 8h12l1 12H5L6 8zm3-3a3 3 0 0 1 6 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',explore:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m20 20-3.5-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',live:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" fill="currentColor"/><circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.2" opacity=".5"/></svg>',profile:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 19a7 7 0 0 1 14 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',videos:'<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10 9.5v5l5-2.5-5-2.5z" fill="currentColor"/></svg>',chat:'<svg viewBox="0 0 24 24"><path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v5A2.5 2.5 0 0 1 16.5 14H11l-3.5 3v-3H7.5A2.5 2.5 0 0 1 5 11.5v-5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 17.5V19a1 1 0 0 0 1.5.85L14 17h2.5" fill="none" stroke="currentColor" stroke-width="1.6" opacity=".55"/></svg>',msg:'<svg viewBox="0 0 24 24"><rect x="3.5" y="6" width="17" height="12" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m4.5 7.5 7.5 5.2L19.5 7.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',game:'<svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="11" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 13h2.5M9.25 11.5v3M15.2 12.2h.01M17.3 14.2h.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M9 8V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V8" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>'};function at(e,t="rel=0"){const s=String(e||"").trim();if(!s)return"";const a=s.includes("?")?"&":"?";return`${s}${a}${t}`}const id="#/terms?s=security",nd="PIKK uses reasonable measures to protect your information, but no system is 100% secure. To the fullest extent permitted by law, PIKK and its owners are not liable for damages resulting from unauthorized access, hacking, or data breaches beyond our reasonable control. If a breach affects your data, we will notify you as required by law.",Oi='<span class="chip pikk-legal-draft">Draft — pending legal review</span>';function rd(){return L("Terms",`
    <div class="card"><p class="kicker">PIKK Terms of Service</p>${Oi}<p>Full Terms ship before public launch. See also <a href="#/guidelines">Community Guidelines</a> and <a href="#/privacy">Privacy</a>.</p></div>
    <section class="card pikk-legal-section" id="terms-security" aria-labelledby="terms-security-h">
      <h2 id="terms-security-h">Security &amp; Data Breach / Limitation of Liability</h2>${Oi}
      <p>${nd}</p>
    </section>`,{badge:"DRAFT"})}function od(){return L("Privacy",`
    <div class="card"><p class="kicker">PIKK Privacy</p>${Oi}<p>TEST MODE: most data in this demo stays on your device. The full Privacy Policy ships before public launch.</p>
    <p><a href="${id}">Security &amp; Data Breach / Limitation of Liability</a></p></div>`,{badge:"DRAFT"})}function ld(){typeof location<"u"&&/[?&]s=security\b/.test(location.hash)&&setTimeout(()=>{var e;return(e=document.getElementById("terms-security"))==null?void 0:e.scrollIntoView({block:"start"})},50)}const ue=[{id:"dirty-money",title:"Dirty Money ft. Lil Baby",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=-rHDLWfiuDI",embed:"https://www.youtube.com/embed/-rHDLWfiuDI"},{id:"93",title:"93 ft. DaBaby",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=zC0BYFxs5W0",embed:"https://www.youtube.com/embed/zC0BYFxs5W0"},{id:"no-love",title:"No Love ft. YFN Lucci",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=6pCVEIE9pB8",embed:"https://www.youtube.com/embed/6pCVEIE9pB8"},{id:"bouquet",title:"Bouquet",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=DTe4OiX2otg",embed:"https://www.youtube.com/embed/DTe4OiX2otg"},{id:"where-im-from",title:"Where I'm From ft. Tee Grizzley",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=BH7_Ttk86eQ",embed:"https://www.youtube.com/embed/BH7_Ttk86eQ"},{id:"gang-ties",title:"Gang Ties",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=0ikbrk901Kc",embed:"https://www.youtube.com/embed/0ikbrk901Kc"},{id:"go-2-work",title:"Go 2 Work",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=gRq8c2i4ESM",embed:"https://www.youtube.com/embed/gRq8c2i4ESM"},{id:"ramen-noodles",title:"Ramen Noodles",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=YNCdtAC273M",embed:"https://www.youtube.com/embed/YNCdtAC273M"},{id:"men-in-blacc",title:"Men In Blacc",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=MKyw-hzxQWY",embed:"https://www.youtube.com/embed/MKyw-hzxQWY"},{id:"king-city",title:"King City",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=wyNJYUqpRFM",embed:"https://www.youtube.com/embed/wyNJYUqpRFM"},{id:"in-her-bag",title:"In Her Bag",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=Dux8rm-pzRg",embed:"https://www.youtube.com/embed/Dux8rm-pzRg"},{id:"lonely",title:"Lonely",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=IVnDjPJ8dRg",embed:"https://www.youtube.com/embed/IVnDjPJ8dRg"},{id:"they-aint-coming-home",title:"They Ain't Coming Home",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=Yi4uBFkn0-o",embed:"https://www.youtube.com/embed/Yi4uBFkn0-o"},{id:"mind-on-a-licc",title:"Mind On A Licc",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=sADinuRcRr4",embed:"https://www.youtube.com/embed/sADinuRcRr4"},{id:"dbs-mix",title:"DatBoiSkeet Mix",artist:"DatBoiSkeet",category:"Mixes",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t",embed:"https://www.youtube.com/embed/videoseries?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t",openLink:"https://www.youtube.com/playlist?list=RDEMDYIvPhQWVGU3Zf3gcxT_4w"},{id:"on-the-radar",title:"On The Radar Interview — Talk of The Town",artist:"DatBoiSkeet",category:"Interviews",youtube:"https://www.youtube.com/watch?v=6IFiHo5HrdE",embed:"https://www.youtube.com/embed/6IFiHo5HrdE"}],an=[{id:"dbs-mix",title:"DatBoiSkeet Mix",blurb:"Official channel Music Videos playlist embed (stable). YouTube Radio Mix link kept as Play on YouTube — RD mixes often fail to embed.",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t",embed:"https://www.youtube.com/embed/videoseries?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t",openLink:"https://www.youtube.com/playlist?list=RDEMDYIvPhQWVGU3Zf3gcxT_4w",source:"channel-pl-music-videos + user-t96u openLink"}],_i=[{id:"pl-music-videos",title:"DatBoiSkeet Music Videos",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t"},{id:"pl-interviews",title:"DatBoiSkeet Interviews",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQHoRjRTD58TpLGqm0XMsa7U"},{id:"pl-vlogs",title:"DatBoiSkeet Vlogs",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQEqroQ8LYGLgpDfzK3pyutQ"}],cd=[{category:"Interviews",title:"Off The Porch (no verified DatBoiSkeet YouTube URL yet — add via Admin)"},{category:"Behind the Scenes",title:"BTS clips (coming soon)"},{category:"Exclusive Videos",title:"Vault / member exclusives (coming soon)"}],he={youtube:"https://www.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA",youtubeHandle:"https://www.youtube.com/@DatBoiSkeet1",youtubeMusic:"https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA",spotify:"https://open.spotify.com/artist/0Po64h8VleQOR97okM68zh",apple:"https://music.apple.com/us/artist/datboiskeet/1270542870"},st=[{id:"stream-dirty-money",title:"Dirty Money (feat. Lil Baby)",artist:"DatBoiSkeet",type:"single",year:2018,albumNote:"From Broke Is the Root of All Evil",cover:"https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2a/7a/67/2a7a676e-af85-489e-55fd-2bae2793948b/datboiskeet-bitroae-cover-3000px.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/track/17Pw88uBIWpgOVCfhEyszG",apple:"https://music.apple.com/us/song/dirty-money-feat-lil-baby/1395681218",youtubeMusic:"https://music.youtube.com/watch?v=-rHDLWfiuDI",youtube:"https://www.youtube.com/watch?v=-rHDLWfiuDI"}},{id:"stream-93",title:"93 (feat. DaBaby)",artist:"DatBoiSkeet",type:"single",year:2019,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/19/60/5f/19605f4c-7014-6dbc-ca18-baa2a672c697/194923194110.png/600x600bb.jpg",links:{spotify:"https://open.spotify.com/track/3gKwZybDOkUoz2wXquDHVZ",apple:"https://music.apple.com/us/album/93-feat-da-baby-single/1493456214",youtubeMusic:"https://music.youtube.com/watch?v=zC0BYFxs5W0",youtube:"https://www.youtube.com/watch?v=zC0BYFxs5W0"}},{id:"stream-no-love",title:"No Love (feat. YFN Lucci)",artist:"DatBoiSkeet",type:"single",year:2017,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/49/e5/62/49e56292-e427-3992-84bd-ead0b06fb06a/artwork.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/track/2KqnCXMM0lAMlEv1fDN63o",apple:"https://music.apple.com/us/album/no-love-feat-yfn-lucci-single/1317778810",youtubeMusic:"https://music.youtube.com/watch?v=6pCVEIE9pB8",youtube:"https://www.youtube.com/watch?v=6pCVEIE9pB8"}},{id:"stream-broke",title:"Broke Is the Root of All Evil",artist:"DatBoiSkeet",type:"album",year:2018,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2a/7a/67/2a7a676e-af85-489e-55fd-2bae2793948b/datboiskeet-bitroae-cover-3000px.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/album/51j6ReXYreCDV0ZwtPdj1Q",apple:"https://music.apple.com/us/album/broke-is-the-root-of-all-evil/1395680910",youtubeMusic:"https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA"}},{id:"stream-talk",title:"Talk of the Town",artist:"DatBoiSkeet",type:"album",year:2020,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/f6/0d/a0/f60da0bf-c3de-8b12-5cd8-e8c1d3c2053b/artwork.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/album/4OY5rM0TBPDsC4n8Dka4Gr",apple:"https://music.apple.com/us/album/talk-of-the-town/1541180619",youtubeMusic:"https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA"}},{id:"stream-said-you-love-me",title:"Said You Love Me",artist:"DatBoiSkeet",type:"single",year:2025,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/f4/4f/6b/f44f6b18-dff9-0486-e6e6-a615724e02fe/artwork.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/album/7FhoRIzhuGgmt2pZlWMc5c",apple:"https://music.apple.com/us/album/said-you-love-me-single/1835164001",youtubeMusic:"https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA"}}],Xt=[{id:"long-story-short",title:"Long Story Short",artist:"DatBoiSkeet",cover:"/music/01_Long_Story_Short_Coming_Soon.jpg",status:"Coming Soon",order:1},{id:"ladies-only",title:"Ladies Only",artist:"DatBoiSkeet",cover:"/music/02_Ladies_Only_Coming_Soon.jpg",status:"Coming Soon",order:2}],dd=[{id:"vault-long-story-short",title:"Long Story Short (Vault Preview)",artist:"DatBoiSkeet",cover:"/music/01_Long_Story_Short_Coming_Soon.jpg",tier:"skeet+",status:"Coming Soon"},{id:"vault-ladies-only",title:"Ladies Only (Vault Exclusive)",artist:"DatBoiSkeet",cover:"/music/02_Ladies_Only_Coming_Soon.jpg",tier:"backstage",status:"Coming Soon"}],Yn=[{id:"long-story-short",title:"Long Story Short",artist:"DatBoiSkeet",cover:"/music/01_Long_Story_Short_Coming_Soon.jpg",price:1.29,status:"Coming Soon"},{id:"ladies-only",title:"Ladies Only",artist:"DatBoiSkeet",cover:"/music/02_Ladies_Only_Coming_Soon.jpg",price:1.29,status:"Coming Soon"}],Oe=[{id:"hat-716-orange",name:"716 Buffalo Braves Snapback (Black/Orange)",price:30,category:"Hats",image:"/merch/01_black_orange_716_hat.jpeg",shopUrl:"https://foreignx-change.com"},{id:"hat-716-blue",name:"716 Buffalo Hat (Blue/Red)",price:30,category:"Hats",image:"/merch/02_blue_red_716_hat.jpeg",shopUrl:"https://foreignx-change.com"},{id:"jacket-blue",name:"Buffalo Sports Varsity Jacket (Blue/White)",price:200,category:"Jackets",image:"/merch/03_blue_buffalo_jacket.jpeg",shopUrl:"https://foreignx-change.com"},{id:"jacket-black",name:"Foreign X-Change Buffalo Varsity (Black/White)",price:200,category:"Jackets",image:"/merch/07_black_buffalo_jacket.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-fx-back",name:"Foreign X-Change Graphic Tee (Back)",price:65,category:"Shirts",image:"/merch/04_black_fx_tee_back_screenshot.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-fx-front",name:"Foreign X-Change Text Tee (Front)",price:65,category:"Shirts",image:"/merch/05_black_fx_tee_front_screenshot.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-ptsd",name:"PTSD Tee (Black)",price:65,category:"Shirts",image:"/merch/06_black_ptsd_tee.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-abstract",name:"Abstract FX Tee (White)",price:65,category:"Shirts",image:"/merch/08_white_abstract_fx_tee.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-dealer",name:"Support Your Local Dealer Tee (Navy)",price:65,category:"Shirts",image:"/merch/09_navy_dealer_tee.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-skulls",name:"Skulls FX Tee (White)",price:65,category:"Shirts",image:"/merch/10_white_skulls_tee.jpeg",shopUrl:"https://foreignx-change.com"}],ba=[{id:"frame-chrome-crown",name:"Chrome Crown",category:"frames",rarity:"legendary",price:12.99,emoji:"👑"},{id:"frame-iced-out",name:"Iced Out",category:"frames",rarity:"epic",price:9.99,emoji:"💎"},{id:"frame-trap-flame",name:"Trap Flame",category:"frames",rarity:"epic",price:7.99,emoji:"🔥"},{id:"frame-rodeo-gold",name:"Rodeo Gold",category:"frames",rarity:"rare",price:5.99,emoji:"🤠"},{id:"frame-rose-petals",name:"Rose Petals",category:"frames",rarity:"rare",price:4.99,emoji:"🌹"},{id:"fx-bass-pulse",name:"Bass Pulse",category:"effects",rarity:"epic",price:8.99,emoji:"🎵"},{id:"fx-snowfall",name:"Snowfall",category:"effects",rarity:"rare",price:5.99,emoji:"❄️"},{id:"fx-city-lights",name:"City Lights",category:"effects",rarity:"epic",price:7.99,emoji:"🌃"},{id:"fx-holo-glitch",name:"Holographic Glitch",category:"effects",rarity:"legendary",price:14.99,emoji:"✨"},{id:"ban-skyline",name:"City Skyline",category:"banners",rarity:"rare",price:4.99,emoji:"🏙️"},{id:"ban-studio",name:"Studio Booth",category:"banners",rarity:"rare",price:4.99,emoji:"🎙️"},{id:"ban-arena",name:"Arena Lights",category:"banners",rarity:"epic",price:6.99,emoji:"🏟️"},{id:"ban-chrome",name:"Luxury Chrome",category:"banners",rarity:"legendary",price:11.99,emoji:"🪞"},{id:"name-chrome",name:"Chrome Name",category:"name styles",rarity:"epic",price:6.99,emoji:"🅰️"},{id:"name-neon",name:"Neon Name",category:"name styles",rarity:"rare",price:3.99,emoji:"💜"},{id:"name-varsity",name:"Bold Varsity",category:"name styles",rarity:"rare",price:3.99,emoji:"🏟️"},{id:"name-western",name:"Western Script",category:"name styles",rarity:"epic",price:5.99,emoji:"🏜️"},{id:"badge-dayone",name:"Day One (cosmetic style)",category:"badges",rarity:"rare",price:2.99,emoji:"1️⃣"},{id:"badge-topfan",name:"Top Fan (cosmetic style)",category:"badges",rarity:"epic",price:4.99,emoji:"⭐"},{id:"badge-backstage",name:"Backstage Glow",category:"badges",rarity:"epic",price:5.99,emoji:"🎫"}],pd=[{id:"all",label:"All"},{id:"frames",label:"Frames"},{id:"effects",label:"Effects"},{id:"banners",label:"Banners"},{id:"name styles",label:"Name styles"},{id:"badges",label:"Badges"}],nn=[{id:"skeet",name:"PIKK+",price:3.99,blurb:"Early releases · basic Vault"},{id:"backstage",name:"Backstage",price:7.99,blurb:"Deeper Vault · studio lives · listening rooms"},{id:"inner",name:"Inner Circle",price:12.99,blurb:"VIP drops · private Q&As · Inner Circle rooms"}],ud=[{label:"Long Story Short",src:"/music/01_Long_Story_Short_Coming_Soon.jpg"},{label:"Ladies Only",src:"/music/02_Ladies_Only_Coming_Soon.jpg"},{label:"716 Orange Hat",src:"/merch/01_black_orange_716_hat.jpeg"},{label:"716 Blue Hat",src:"/merch/02_blue_red_716_hat.jpeg"},{label:"Blue Jacket",src:"/merch/03_blue_buffalo_jacket.jpeg"},{label:"PTSD Tee",src:"/merch/06_black_ptsd_tee.jpeg"}],md=[{route:"/explore",title:"Explore",blurb:"Discover DatBoiSkeet · creators · drops"},{route:"/music",title:"Music",blurb:"Long Story Short · Ladies Only · Vault"},{route:"/videos",title:"Videos",blurb:"Official music videos"},{route:"/posts",title:"Posts",blurb:"Text · Picture · Short · Video"},{route:"/shorts",title:"Shorts",blurb:"Under Posts · quick clips"},{route:"/live",title:"Live",blurb:"Go live · TEST MODE demo"},{route:"/shop",title:"PIKK Shop",blurb:"Foreign X-Change merch · external checkout"},{route:"/community",title:"PIKK Lounge",blurb:"Artist-owned rooms · Phase 2"},{route:"/music",title:"Vault",blurb:"Member exclusives · Coming Soon",hash:"vault"},{route:"/marketplace",title:"Marketplace",blurb:"Brand ads & sponsored offers"},{route:"/missions",title:"Missions",blurb:"Clipper promo campaigns"},{route:"/clippers",title:"Clippers",blurb:"Apply · cut clips · earn"}],go=[{id:"home",label:"Home",href:"#/home"},{id:"explore",label:"Explore",href:"#/explore"},{id:"profile",label:"Profile / Sign in",href:"#/profile"},{id:"watch",label:"Watch",links:[{href:"#/videos",label:"Videos"},{href:"#/live",label:"Live"},{href:"#/openmic",label:"Open Mic / Talent Discovery (24/7)"},{href:"#/spotlight",label:"Spotlight (24/7)"},{href:"#/multiguest",label:"Multi-Guest Live"}]},{id:"music",label:"Music",links:[{href:"#/music",label:"Music & Vault"}]},{id:"social",label:"Social",links:[{href:"#/posts",label:"Posts"},{href:"#/posts?compose=1",label:"Post · Text / Picture / Short / Video"},{href:"#/shorts",label:"Shorts (in Posts)"},{href:"#/notifications",label:"Notifications"},{href:"#/connect",label:"Connect"},{href:"#/dating",label:"Dating & Connections"},{href:"#/community",label:"Community / Lounge"}]},{id:"messages",label:"Messages",href:"#/messages"},{id:"games",label:"Games",links:[{href:"#/games",label:"PIKK Arcade · 15 Games Coming Soon"},{href:"#/blockwars",label:"Block Wars · Coming Soon"}]},{id:"shop",label:"Shop",links:[{href:"#/merch",label:"Foreign X-Change Merch"},{href:"#/marketplace",label:"Marketplace"},{href:"#/shop",label:"PIKK Shop"},{href:"#/profile-shop",label:"Profile Shop · cosmetics"}]},{id:"earn",label:"Creators & Earnings",links:[{href:"#/wallet",label:"Wallet"},{href:"#/earnings",label:"Creator Earnings"},{href:"#/missions",label:"Missions"},{href:"#/clippers",label:"Clippers Apply"},{href:"#/share",label:"Share & Earn"},{href:"#/refer",label:"Refer & Earn"},{href:"#/pricing",label:"Pricing (rules & fees)"}]},{id:"account",label:"Account",links:[{href:"#/profile",label:"Profile"},{href:"#/signup",label:"Signup / Creator Apps"},{href:"#/loyalty",label:"Loyalty Club"},{href:"#/fanclubs",label:"Fan Clubs"},{href:"#/guidelines",label:"Community Guidelines"}]},{id:"studio",label:"Studio / Owner",links:[{href:"#/admin",label:"Admin"},{href:"#/phases",label:"Development Phases"},{href:"#/launch",label:"Launch Readiness"}]}];go.flatMap(e=>e.href?[{href:e.href,label:e.label}]:e.links||[]);const rn=[{href:"#/music",label:"Music",icon:"music"},{href:"#/videos",label:"Videos",icon:"videos"},{href:"#/connect",label:"Connect",icon:"profile"},{href:"#/create",label:"Create",icon:"live",primary:!0},{href:"#/dating",label:"Dating",icon:"heart"},{href:"#/games",label:"Games",icon:"game"},{href:"#/shop",label:"Shop",icon:"merch"}],fo="dbs_v1",Is=()=>({user:null,profiles:{dbs:{id:"dbs",username:"DatBoiSkeet",bio:"Official DatBoiSkeet · Long Story Short & Ladies Only Coming Soon · Vault · Foreign X-Change",avatar:"/brand/pikk-logo-square.png",followers:[],following:[],verified:!0}},posts:[],comments:{},likes:{},clipperApps:[],creatorSellApps:[],brandApps:[],listings:[],live:null,liveHistory:[],liveSongRequests:[],coins:{balance:0,history:[]},liveGiftLedger:[],liveGbChallengePop:null,threads:{},demoUnreadSeeded:!1,messagePrefs:{allowDMs:!0,allowRequests:!0},notifications:{releases:!0,lives:!0,messages:!0,quietHours:!1},wallet:{balance:0,history:[]},creatorWallet:{available:0,holds:0,threshold:25,verification:"demo_unverified",earnings:[],payouts:[]},catalog:[],missions:[],giftBattles:{active:null,history:[],champions:[],prefs:{invitationsEnabled:!0}},multiGuest:{active:null,history:[]},spotlight:{nowPlaying:null,queue:[],history:[],houseIndex:0},fanClubs:{clubs:[],posts:{},seeded:!1},shareEarn:{platformsLinked:[],challenge:null,submissions:[],rewardsClaimed:[]},referEarn:{code:"",invitees:[],milestonesClaimed:[]},restream:{platforms:{},selected:[],session:null,history:[],ingest:null,campaign:{tier:null,status:"none",enrolledAt:null,cancelledAt:null},campaignConfig:null},loyalty:{points:0,history:[],badges:[],publicVisible:!0,lastActionAt:{},dayCounts:{}},openMic:{applications:[],seeded:!1,houseIndex:0},profileShop:{owned:[],equipped:{},reduceMotion:!1},hotFeed:{lives:[],posts:[],seededLives:!1,seededPosts:!1,seededPostsVer:0},engagementAlerts:[],postShares:{},splashSeenAt:0,dailyGoals:{app:null,liveByHost:{},history:[]}});function hd(){var e,t,s,a,i,n,r,o,c,d,p,m,h,f,v,b,y,k,w,x,S,T,_,N,$,H,M,B,G,D,O,R,ie,ke,W,ne,Se,Y,De,Qe,xt,At,rt,Ht,Ct,X,Ae,Pe,A,we,vs;try{const bs=localStorage.getItem(fo);if(!bs)return Is();const E=JSON.parse(bs),re=Is();return{...re,...E,profiles:{...re.profiles,...E.profiles||{}},notifications:{...re.notifications,...E.notifications||{}},wallet:{...re.wallet,...E.wallet||{}},creatorWallet:{...re.creatorWallet,...E.creatorWallet||{},earnings:Array.isArray((e=E.creatorWallet)==null?void 0:e.earnings)?E.creatorWallet.earnings:[],payouts:Array.isArray((t=E.creatorWallet)==null?void 0:t.payouts)?E.creatorWallet.payouts:[],available:Number((s=E.creatorWallet)==null?void 0:s.available)||0,holds:Number((a=E.creatorWallet)==null?void 0:a.holds)||0,threshold:Number((i=E.creatorWallet)==null?void 0:i.threshold)>0?Number(E.creatorWallet.threshold):25,verification:((n=E.creatorWallet)==null?void 0:n.verification)==="demo_verified"?"demo_verified":"demo_unverified"},brandApps:E.brandApps||[],listings:Array.isArray(E.listings)?E.listings:[],live:E.live??null,liveHistory:Array.isArray(E.liveHistory)?E.liveHistory:[],liveSongRequests:Array.isArray(E.liveSongRequests)?E.liveSongRequests:[],coins:{balance:Number((r=E.coins)==null?void 0:r.balance)||0,history:Array.isArray((o=E.coins)==null?void 0:o.history)?E.coins.history:[]},liveGiftLedger:Array.isArray(E.liveGiftLedger)?E.liveGiftLedger:[],liveGbChallengePop:E.liveGbChallengePop||null,threads:{...E.threads||{}},demoUnreadSeeded:!!E.demoUnreadSeeded,messagePrefs:{...re.messagePrefs,...E.messagePrefs||{}},catalog:Array.isArray(E.catalog)?E.catalog:[],missions:Array.isArray(E.missions)?E.missions:[],giftBattles:{...re.giftBattles,...E.giftBattles||{},history:Array.isArray((c=E.giftBattles)==null?void 0:c.history)?E.giftBattles.history:[],champions:Array.isArray((d=E.giftBattles)==null?void 0:d.champions)?E.giftBattles.champions:[],prefs:{...re.giftBattles.prefs,...((p=E.giftBattles)==null?void 0:p.prefs)||{}},active:((m=E.giftBattles)==null?void 0:m.active)??null},multiGuest:{...re.multiGuest,...E.multiGuest||{},history:Array.isArray((h=E.multiGuest)==null?void 0:h.history)?E.multiGuest.history:[],active:((f=E.multiGuest)==null?void 0:f.active)??null},fanClubs:{...re.fanClubs,...E.fanClubs||{},clubs:Array.isArray((v=E.fanClubs)==null?void 0:v.clubs)?E.fanClubs.clubs:[],posts:(b=E.fanClubs)!=null&&b.posts&&typeof E.fanClubs.posts=="object"?E.fanClubs.posts:{},seeded:!!((y=E.fanClubs)!=null&&y.seeded)},shareEarn:{...re.shareEarn,...E.shareEarn||{},platformsLinked:Array.isArray((k=E.shareEarn)==null?void 0:k.platformsLinked)?E.shareEarn.platformsLinked:[],challenge:((w=E.shareEarn)==null?void 0:w.challenge)??null,submissions:Array.isArray((x=E.shareEarn)==null?void 0:x.submissions)?E.shareEarn.submissions:[],rewardsClaimed:Array.isArray((S=E.shareEarn)==null?void 0:S.rewardsClaimed)?E.shareEarn.rewardsClaimed:[]},referEarn:{...re.referEarn,...E.referEarn||{},code:typeof((T=E.referEarn)==null?void 0:T.code)=="string"?E.referEarn.code:"",invitees:Array.isArray((_=E.referEarn)==null?void 0:_.invitees)?E.referEarn.invitees:[],milestonesClaimed:Array.isArray((N=E.referEarn)==null?void 0:N.milestonesClaimed)?E.referEarn.milestonesClaimed:[]},restream:{...re.restream,...E.restream||{},platforms:($=E.restream)!=null&&$.platforms&&typeof E.restream.platforms=="object"?E.restream.platforms:{},selected:Array.isArray((H=E.restream)==null?void 0:H.selected)?E.restream.selected:[],session:((M=E.restream)==null?void 0:M.session)??null,history:Array.isArray((B=E.restream)==null?void 0:B.history)?E.restream.history:[],ingest:((G=E.restream)==null?void 0:G.ingest)??null,campaign:{...re.restream.campaign,...((D=E.restream)==null?void 0:D.campaign)||{}},campaignConfig:((O=E.restream)==null?void 0:O.campaignConfig)??null},loyalty:{...re.loyalty,...E.loyalty||{},points:Number((R=E.loyalty)==null?void 0:R.points)||0,history:Array.isArray((ie=E.loyalty)==null?void 0:ie.history)?E.loyalty.history:[],badges:Array.isArray((ke=E.loyalty)==null?void 0:ke.badges)?E.loyalty.badges:[],publicVisible:((W=E.loyalty)==null?void 0:W.publicVisible)===void 0?!0:!!E.loyalty.publicVisible,lastActionAt:(ne=E.loyalty)!=null&&ne.lastActionAt&&typeof E.loyalty.lastActionAt=="object"?E.loyalty.lastActionAt:{},dayCounts:(Se=E.loyalty)!=null&&Se.dayCounts&&typeof E.loyalty.dayCounts=="object"?E.loyalty.dayCounts:{}},openMic:{...re.openMic,...E.openMic||{},applications:Array.isArray((Y=E.openMic)==null?void 0:Y.applications)?E.openMic.applications:[],seeded:!!((De=E.openMic)!=null&&De.seeded),houseIndex:typeof((Qe=E.openMic)==null?void 0:Qe.houseIndex)=="number"?E.openMic.houseIndex:0},profileShop:{...re.profileShop,...E.profileShop||{},owned:Array.isArray((xt=E.profileShop)==null?void 0:xt.owned)?E.profileShop.owned:[],equipped:(At=E.profileShop)!=null&&At.equipped&&typeof E.profileShop.equipped=="object"?E.profileShop.equipped:{},reduceMotion:!!((rt=E.profileShop)!=null&&rt.reduceMotion)},hotFeed:{...re.hotFeed,...E.hotFeed||{},lives:Array.isArray((Ht=E.hotFeed)==null?void 0:Ht.lives)?E.hotFeed.lives:[],posts:Array.isArray((Ct=E.hotFeed)==null?void 0:Ct.posts)?E.hotFeed.posts:[],seededLives:!!((X=E.hotFeed)!=null&&X.seededLives),seededPosts:!!((Ae=E.hotFeed)!=null&&Ae.seededPosts),seededPostsVer:Number((Pe=E.hotFeed)==null?void 0:Pe.seededPostsVer)||0},engagementAlerts:Array.isArray(E.engagementAlerts)?E.engagementAlerts:[],postShares:E.postShares&&typeof E.postShares=="object"?E.postShares:{},creatorSellApps:Array.isArray(E.creatorSellApps)?E.creatorSellApps:[],dailyGoals:{...re.dailyGoals,...E.dailyGoals||{},app:((A=E.dailyGoals)==null?void 0:A.app)??null,liveByHost:(we=E.dailyGoals)!=null&&we.liveByHost&&typeof E.dailyGoals.liveByHost=="object"?E.dailyGoals.liveByHost:{},history:Array.isArray((vs=E.dailyGoals)==null?void 0:vs.history)?E.dailyGoals.history:[]}}}catch{return Is()}}function C(e){localStorage.setItem(fo,JSON.stringify(e))}let u=hd();function P(){return u}function Jn(e){return u={...u,...e},C(u),u}function gd(e){return u=e(u)||u,C(u),u}function kt(e){e&&(u={...u,profiles:{...u.profiles,[e.id]:{id:e.id,username:e.username,bio:e.bio||"",avatar:e.avatar||"",followers:e.followers||[],following:e.following||[],memberships:e.memberships||{},verified:!!e.verified}}})}function Nt(e){return e?u.user&&u.user.id===e?u.user:u.profiles[e]||null:null}function Qn(e){const t=Nt(e);return t?(t.followers||[]).map(s=>Nt(s)||{id:s,username:s}).filter(Boolean):[]}function qi(e){const t=Nt(e);return t?(t.following||[]).map(s=>Nt(s)||{id:s,username:s}).filter(Boolean):[]}function vo(){if(u.posts.length)return;const e=[{id:"p1",userId:"dbs",username:"DatBoiSkeet",text:"Long Story Short — cover is up. Coming Soon on DBS Music. Stay ready.",image:"/music/01_Long_Story_Short_Coming_Soon.jpg",at:Date.now()-864e5*2},{id:"p2",userId:"dbs",username:"DatBoiSkeet",text:"Foreign X-Change — hats, tees & jackets. Checkout on ForeignX-Change.com (not inside DBS).",image:"/merch/01_black_orange_716_hat.jpeg",at:Date.now()-864e5},{id:"p3",userId:"dbs",username:"DatBoiSkeet",text:"Ladies Only — cover art live. Official playback unlocks when the single drops.",image:"/music/02_Ladies_Only_Coming_Soon.jpg",at:Date.now()-864e5*3},{id:"p4",userId:"dbs",username:"DatBoiSkeet",text:"716 Buffalo Braves snapback on Foreign X-Change — shop the external store.",image:"/merch/02_blue_red_716_hat.jpeg",at:Date.now()-864e5*4}];u={...u,posts:e,likes:{p1:[],p2:[],p3:[],p4:[]},comments:{p1:[],p2:[],p3:[],p4:[]}},C(u)}function os(e){const t=(e||"Fan").trim().slice(0,24)||"Fan",s="u_"+t.toLowerCase().replace(/\W+/g,"_")+"_"+Date.now().toString(36),a={id:s,username:t,bio:"DBS fan · local demo account (TEST MODE)",avatar:"",followers:[],following:["dbs"],membership:null,memberships:{skeetPlus:!1,backstage:!1,innerCircle:!1},purchasedTracks:[],createdAt:Date.now()},i=u.profiles.dbs||Is().profiles.dbs,n=new Set(i.followers||[]);return n.add(s),u={...u,user:a,profiles:{...u.profiles,dbs:{...i,followers:[...n]}}},kt(a),C(u),a}function bo(){u={...u,user:null},C(u)}function fd({bio:e,avatar:t,username:s}){const a=u.user;if(!a)return{error:"signin"};const i={...a,bio:e!==void 0?String(e).slice(0,280):a.bio,avatar:t!==void 0?String(t).trim():a.avatar,username:s!==void 0&&String(s).trim().slice(0,24)||a.username};return u={...u,user:i},kt(i),C(u),i}function Ga(e,t=!0){const s=u.user;if(!s)return{error:"signin"};let a=s.membership??null;const i=d=>d==="skeet"||d==="skeetPlus"||d==="skeet+"?"skeet+":d==="backstage"?"backstage":d==="inner"||d==="innerCircle"?"inner":null,n={null:0,"skeet+":1,backstage:2,inner:3},r=i(e);t?r&&(a=r):a=null;const o={skeetPlus:n[a||"null"]>=1,backstage:n[a||"null"]>=2,innerCircle:n[a||"null"]>=3},c={...s,membership:a,memberships:o};return u={...u,user:c},kt(c),C(u),c}function Kt(){const e=u.user;if(!e)return null;if(e.membership)return e.membership;const t=e.memberships||{};return t.innerCircle?"inner":t.backstage?"backstage":t.skeetPlus?"skeet+":null}function Ni(e="skeet"){const t=Kt(),s={null:0,"skeet+":1,backstage:2,inner:3},a=e==="backstage"?2:e==="inner"?3:1;return(s[t||"null"]||0)>=a}function vd(e){const t=u.user;if(!t)return{error:"signin"};const s=new Set(t.purchasedTracks||[]);s.add(e);const a={...t,purchasedTracks:[...s]};return u={...u,user:a},kt(a),C(u),a}function Xn({text:e,image:t,mediaType:s,mediaUrl:a}){const i=u.user;if(!i)throw new Error("Sign in required");const n="p_"+Date.now().toString(36),r=["picture","short","video","image","text"].includes(s)?s==="image"?"picture":s:t?"picture":"text",o={id:n,userId:i.id,username:i.username,text:(e||"").trim(),image:(t||"").trim(),mediaType:r==="text"&&!(t||"").trim()?"text":r,mediaUrl:(a||"").trim(),at:Date.now()};return u={...u,posts:[o,...u.posts],likes:{...u.likes,[n]:[]},comments:{...u.comments,[n]:[]}},C(u),o}function bd(e){const t=u.user;if(!t)return{error:"signin"};const s=new Set(u.likes[e]||[]);s.has(t.id)?s.delete(t.id):s.add(t.id),u={...u,likes:{...u.likes,[e]:[...s]}},C(u);try{ze()}catch{}return{count:s.size,liked:s.has(t.id)}}function yd(e,t){const s=u.user;if(!s)return{error:"signin"};const a={id:"c_"+Date.now().toString(36),userId:s.id,username:s.username,text:t.trim(),at:Date.now()},i=u.comments[e]||[];u={...u,comments:{...u.comments,[e]:[...i,a]}},C(u);try{ze()}catch{}return a}function Ua(e){const t=u.user;if(!t)return{error:"signin"};if(e===t.id)return{error:"self"};if(t.following.includes(e))return t;const s={...t,following:[...t.following,e]},a={...u.profiles},i=a[e]||Nt(e);if(i){const n=new Set(i.followers||[]);n.add(t.id),a[e]={...i,followers:[...n]}}return u={...u,user:s,profiles:a},kt(s),C(u),s}function Ha(e){const t=u.user;if(!t)return{error:"signin"};const s={...t,following:(t.following||[]).filter(n=>n!==e)},a={...u.profiles},i=a[e]||Nt(e);return i&&(a[e]={...i,followers:(i.followers||[]).filter(n=>n!==t.id)}),u={...u,user:s,profiles:a},kt(s),C(u),s}function kd(e){const t={id:"clip_"+Date.now().toString(36),...e,status:"pending",at:Date.now()};return u={...u,clipperApps:[t,...u.clipperApps]},C(u),t}function Sd(e){const t=e||{},s=String(t.name||"").trim().slice(0,80),a=String(t.contact||t.email||t.handle||"").trim().slice(0,120),i=String(t.sells||"both").trim().slice(0,40),n=!!t.agreed;if(!s||!a)return{error:"missing"};if(!n)return{error:"rules"};const r={id:"csa_"+Date.now().toString(36),name:s,contact:a,sells:["music","merch","both"].includes(i)?i:"both",agreed:!0,status:"pending",at:Date.now()},o=[r,...u.creatorSellApps||[]].slice(0,40);return u={...u,creatorSellApps:o},C(u),{ok:!0,app:r}}function yo(e,t){if(!["pending","approved","rejected","waitlisted"].includes(t))return{error:"bad_status"};const a=u.clipperApps.map(i=>i.id===e?{...i,status:t,reviewedAt:Date.now()}:i);return u={...u,clipperApps:a},C(u),a.find(i=>i.id===e)}function mi(e){u={...u,notifications:{...u.notifications,...e}},C(u)}function wd(){u={...u,splashSeenAt:Date.now()},C(u)}function $d(){return!u.splashSeenAt}function ae(){return!!(u.user&&u.user.role==="admin")}function zs(e=!0){const t=u.user;if(!t)return{error:"signin"};const s={...t,role:e?"admin":"fan"};return u={...u,user:s},kt(s),C(u),s}function ko(){var o;const e=u.posts||[],t=u.clipperApps||[],s={pending:0,approved:0,rejected:0,waitlisted:0};t.forEach(c=>{const d=c.status||"pending";s[d]!==void 0?s[d]+=1:s.pending+=1});let a=0;Object.values(u.likes||{}).forEach(c=>{a+=(c||[]).length});let i=0;Object.values(u.comments||{}).forEach(c=>{i+=(c||[]).length});let n=0;u.user&&(u.user.membership||(o=u.user.memberships)!=null&&o.skeetPlus)&&(n+=1),Object.values(u.profiles||{}).forEach(c=>{var d,p;c.id!==((d=u.user)==null?void 0:d.id)&&(c.membership||(p=c.memberships)!=null&&p.skeetPlus)&&(n+=1)});const r=u.catalog||[];return{posts:e.length,likes:a,comments:i,clippers:t.length,clipperByStatus:s,members:n,profiles:Object.keys(u.profiles||{}).length,catalogTotal:r.length,catalogPublished:r.filter(c=>c.published).length}}function So(e){const t=["spotify","apple","youtubeMusic","youtube","tidal","amazon"],s={};if(!e||typeof e!="object")return s;for(const a of t){const i=String(e[a]||"").trim();(i.startsWith("http://")||i.startsWith("https://"))&&(s[a]=i.slice(0,500))}return s}function qt({publishedOnly:e=!1,types:t=null,includeUnpublishedForAdmin:s=!1}={}){let a=u.catalog||[];if(e?a=a.filter(i=>i.published):s||(a=a.filter(i=>i.published)),t&&t.length){const i=new Set(t);a=a.filter(n=>i.has(n.type))}return[...a].sort((i,n)=>(n.createdAt||0)-(i.createdAt||0))}function Ed(e){var a;if(!ae())return{error:"forbidden"};const s={id:e.id||"cat_"+Date.now().toString(36),type:e.type,title:String(e.title||"").trim().slice(0,120),artist:String(e.artist).trim().slice(0,80),coverRef:e.coverRef||"",mediaRef:e.mediaRef||"",youtube:String(e.youtube||"").trim(),embed:String(e.embed||"").trim(),streamingLinks:So(e.streamingLinks),published:!!e.published,createdAt:Date.now(),updatedAt:Date.now(),createdBy:((a=u.user)==null?void 0:a.id)||null};return s.title?["song","album","video","picture"].includes(s.type)?(u={...u,catalog:[s,...u.catalog||[]]},C(u),s):{error:"type"}:{error:"title"}}function wo(e,t){if(!ae())return{error:"forbidden"};let s=null;const a=(u.catalog||[]).map(i=>{if(i.id!==e)return i;const n={...i,...t,id:i.id,updatedAt:Date.now()};return t&&Object.prototype.hasOwnProperty.call(t,"streamingLinks")&&(n.streamingLinks=So(t.streamingLinks)),s=n,s});return s?(u={...u,catalog:a},C(u),s):{error:"missing"}}function xd(e,t){return wo(e,{published:!!t})}function Ad(e){if(!ae())return{error:"forbidden"};const t=(u.catalog||[]).filter(s=>s.id!==e);return u={...u,catalog:t},C(u),!0}function Zn(e,t={}){const s=u.user;if(!s)return{error:"signin"};if(u.live&&!u.live.endedAt)return{error:"already_live",live:u.live};const a={id:"live_"+Date.now().toString(36),hostId:s.id,hostName:s.username,title:(e||"DBS Live · TEST MODE").trim().slice(0,80),category:t.category||"",permissions:t.permissions||null,startedAt:Date.now(),viewers:0,giftsTotal:0,tipsTotal:0,giftLog:[],chat:[{id:"sys1",userId:"system",username:"DBS",text:"Welcome · Follow DatBoiSkeet · TEST MODE (no real stream)",at:Date.now()}],endedAt:null};return u={...u,live:a},C(u),a}function Cd(){if(!u.live||u.live.endedAt)return u.live;const e={...u.live,endedAt:Date.now()},t=[e,...u.liveHistory||[]].slice(0,20);return u={...u,live:e,liveHistory:t},C(u),e}function Td(e){const t=u.user;if(!t)return{error:"signin"};if(!u.live||u.live.endedAt)return{error:"offline"};const s={id:"lc_"+Date.now().toString(36),userId:t.id,username:t.username,text:String(e||"").trim().slice(0,280),at:Date.now()};if(!s.text)return{error:"empty"};const a={...u.live,chat:[...u.live.chat||[],s]};return u={...u,live:a},C(u),s}function $o({kind:e="tip",amount:t=1,label:s=""}={}){var m;const a=u.user;if(!a)return{error:"signin"};if(!u.live||u.live.endedAt)return{error:"offline"};const i=Math.max(.5,Number(t)||1),n=e==="gift"?"gift":"tip",r=((m=u.wallet)==null?void 0:m.balance)||0;let o=u.wallet||{balance:0,history:[]};r>=i&&(o={balance:+(r-i).toFixed(2),history:[...o.history||[],{at:Date.now(),amount:-i,note:`Live ${n} · ${u.live.title}`}]});const c={id:"lg_"+Date.now().toString(36),userId:a.id,username:a.username,kind:n,amount:i,label:(s||(n==="gift"?"🔥 Fire":"Tip")).slice(0,40),at:Date.now()},d={id:"lc_"+Date.now().toString(36)+"g",userId:a.id,username:a.username,text:n==="gift"?`sent ${c.label} ($${i.toFixed(2)}) · TEST MODE`:`tipped $${i.toFixed(2)} · TEST MODE`,at:Date.now(),support:!0},p={...u.live,giftsTotal:(u.live.giftsTotal||0)+(n==="gift"?i:0),tipsTotal:(u.live.tipsTotal||0)+(n==="tip"?i:0),giftLog:[...u.live.giftLog||[],c],chat:[...u.live.chat||[],d]};return u={...u,live:p,wallet:o},C(u),r>=i&&gn({category:n==="gift"?"gifts":"tips",gross:i,note:`Live ${n} from @${a.username} · ${u.live.title}`,source:"live"}),{live:p,entry:c,wallet:u.wallet,creatorWallet:u.creatorWallet}}function Md(){return u.liveHistory||[]}const Eo=[{pack:1,price:10,label:"1 song",save:0},{pack:2,price:25,label:"2 songs",save:0},{pack:3,price:45,label:"3 songs",save:5}];function Os(){return Array.isArray(u.liveSongRequests)?u.liveSongRequests:[]}function Dd(e){var s;const t=e||((s=u.live)==null?void 0:s.id);return t?Os().filter(a=>a.liveId===t):[]}function on(e){const t=[];for(const s of Dd(e))(s.titles||[]).forEach((a,i)=>{t.push({requestId:s.id,songIndex:i,title:a,status:s.songStatuses&&s.songStatuses[i]||"queued",username:s.username,userId:s.userId,pack:s.pack,price:s.price,at:s.at})});return t}function Pd({pack:e,titles:t}={}){var p;const s=u.user;if(!s)return{error:"signin"};if(!u.live||u.live.endedAt)return{error:"offline"};const a=Eo.find(m=>m.pack===Number(e));if(!a)return{error:"bad_pack"};const i=(Array.isArray(t)?t:[]).map(m=>String(m||"").trim().slice(0,80)).filter(Boolean);if(i.length!==a.pack)return{error:"title_count",need:a.pack,got:i.length};const n=Oo(a.price,`Song request ×${a.pack} · ${u.live.title} · TEST MODE`);if((n==null?void 0:n.error)==="insufficient")return{error:"insufficient",need:a.price,balance:Number(((p=u.wallet)==null?void 0:p.balance)||0)};const r={id:"lsr_"+Date.now().toString(36),liveId:u.live.id,hostId:u.live.hostId,userId:s.id,username:s.username,pack:a.pack,price:a.price,titles:i,songStatuses:i.map(()=>"queued"),status:"open",at:Date.now(),charged:a.price},o=[r,...Os()].slice(0,200),c={id:"lc_"+Date.now().toString(36)+"sr",userId:s.id,username:s.username,text:`requested ${a.pack} song${a.pack>1?"s":""} ($${a.price}) · TEST MODE`,at:Date.now(),support:!0},d={...u.live,chat:[...u.live.chat||[],c]};return u={...u,liveSongRequests:o,live:d},C(u),gn({category:"tips",gross:a.price,note:`Song request ×${a.pack} from @${s.username} · ${u.live.title}`,source:"live_song_request"}),{ok:!0,entry:r,wallet:u.wallet,live:u.live}}function ln(e,t,s){var v;const a=u.user;if(!a)return{error:"signin"};if(!["playing","played","skipped","queued"].includes(s))return{error:"bad_status"};const n=Os().findIndex(b=>b.id===e);if(n<0)return{error:"missing"};const r=Os()[n],o=u.live;if(!(o&&o.hostId===a.id&&o.id===r.liveId||a.id===r.hostId)&&!ae())return{error:"host_only"};const d=Number(t);if(!Number.isInteger(d)||d<0||d>=(r.titles||[]).length)return{error:"bad_index"};let p=[...r.songStatuses||r.titles.map(()=>"queued")];if(s==="playing"){const b=Os().map(y=>{if(y.liveId!==r.liveId)return y;const k=[...y.songStatuses||(y.titles||[]).map(()=>"queued")];let w=!1;for(let S=0;S<k.length;S++)k[S]==="playing"&&(k[S]="played",w=!0);if(!w)return y;const x=k.every(S=>S==="played"||S==="skipped");return{...y,songStatuses:k,status:x?"done":"open"}});u={...u,liveSongRequests:b},p=[...((v=u.liveSongRequests[n])==null?void 0:v.songStatuses)||p]}p[d]=s;const m=p.every(b=>b==="played"||b==="skipped"),h={...u.liveSongRequests[n],songStatuses:p,status:m?"done":"open"},f=[...u.liveSongRequests];return f[n]=h,u={...u,liveSongRequests:f},C(u),{ok:!0,entry:h}}function Ld(e,t){return ln(e,t,"playing")}function Id(e,t){return ln(e,t,"skipped")}function Od(e,t){return ln(e,t,"played")}const cn=[{slug:"rose",name:"DBS Rose",coins:5,usd:.1,animation:"Rotating glossy rose and petals",tier:"small"},{slug:"big-love",name:"Big Love",coins:25,usd:.5,animation:"Pulsing luminous heart",tier:"small"},{slug:"turn-up",name:"Turn Up",coins:50,usd:1,animation:"Flame burst and DBS sparks",tier:"small"},{slug:"cash-rain",name:"Cash Rain",coins:150,usd:3,animation:"Stylized bills and confetti",tier:"mid"},{slug:"bottle-pop",name:"Bottle Pop",coins:300,usd:6,animation:"Bottle pop and confetti",tier:"mid"},{slug:"money-gun",name:"Money Gun",coins:750,usd:15,animation:"Stylized cash launcher",tier:"premium"},{slug:"diamond-drip",name:"Diamond Drip",coins:1500,usd:30,animation:"Rotating diamond",tier:"premium"},{slug:"foreign-whip",name:"Foreign Whip",coins:3e3,usd:60,animation:"Original luxury vehicle drives across screen",tier:"premium"},{slug:"helicopter",name:"Helicopter",coins:5e3,usd:100,animation:"Helicopter spotlight flyover",tier:"cinematic"},{slug:"private-jet",name:"Private Jet",coins:1e4,usd:200,animation:"Jet cinematic flyover",tier:"cinematic"},{slug:"dbs-crown",name:"DBS Crown",coins:25e3,usd:500,animation:"Gold diamond crown",tier:"cinematic"},{slug:"dbs-universe",name:"DBS Universe",coins:5e4,usd:1e3,animation:"Galaxy DBS logo reveal",tier:"cinematic"}],Va=[{coins:100,usd:2},{coins:500,usd:10},{coins:1e3,usd:20},{coins:2500,usd:50},{coins:5e3,usd:100},{coins:1e4,usd:200}],_d=750,hi=80,er=20;function za(e){return{balance:Math.max(0,Number(e==null?void 0:e.balance)||0),history:Array.isArray(e==null?void 0:e.history)?e.history:[]}}function Wa(){return za(u.coins).balance}function qd(){return Va.map(e=>({...e}))}function Nd(){return cn.map(e=>({...e}))}function xo(e){const t=Va.find(n=>n.coins===Number(e));if(!t)return{error:"bad_package"};const s=za(u.coins),a={at:Date.now(),amount:t.coins,note:`Bought ${t.coins} coins ($${t.usd}) · TEST MODE`,kind:"buy",packageCoins:t.coins,usd:t.usd},i={balance:s.balance+t.coins,history:[a,...s.history].slice(0,200)};return u={...u,coins:i},C(u),{ok:!0,coins:i,pack:t,entry:a}}function dn(){return Array.isArray(u.liveGiftLedger)?u.liveGiftLedger:[]}function Rd(e){var s;const t=e||((s=u.live)==null?void 0:s.id);return t?dn().filter(a=>a.liveId===t).map(a=>({id:a.id,liveId:a.liveId,giftSlug:a.giftSlug,giftName:a.giftName,coins:a.coins,usd:a.usd,fromUserId:a.fromUserId,fromUser:a.fromUser,at:a.at,animation:a.animation,tier:a.tier})):[]}function Bd(e=10,t=Date.now()){const s=Math.min(Math.max(1,Number(e)||10),10),a=new Date(t);a.setHours(0,0,0,0);const i=a.getTime(),n=new Date(t);n.setHours(23,59,59,999);const r=n.getTime(),o={};for(const c of dn()){const d=Number(c.at||0);if(d<i||d>r)continue;const p=c.fromUserId||c.fromUser||"anon",m=o[p]||{userId:p,username:c.fromUser||p,usd:0,coins:0,gifts:0,lastSlug:c.giftSlug||"rose"};m.usd=+(m.usd+Number(c.usd||0)).toFixed(2),m.coins+=Number(c.coins||0),m.gifts+=1,m.username=c.fromUser||m.username,m.lastSlug=c.giftSlug||m.lastSlug,o[p]=m}return Object.values(o).sort((c,d)=>d.usd-c.usd||d.coins-c.coins||c.username.localeCompare(d.username)).slice(0,s)}function Ao(e){let s=(hn(u.creatorWallet).earnings||[]).filter(a=>a.category==="gifts");return e&&(s=s.filter(a=>!a.hostId||a.hostId===e)),s.map(a=>({...a}))}function Kd({liveId:e,slug:t}={}){const s=u.user;if(!s)return{error:"signin"};const a=u.live;if(!a||a.endedAt)return{error:"offline"};if(e&&e!==a.id)return{error:"live_mismatch"};const i=cn.find($=>$.slug===t);if(!i)return{error:"bad_gift"};const n=za(u.coins);if(n.balance<i.coins)return{error:"insufficient",need:i.coins,balance:n.balance};const r=q(i.usd),o=0,c=r,d=q(c*hi/100),p=q(c-d),m=Date.now(),h="lgift_"+m.toString(36)+"_"+Math.random().toString(36).slice(2,6),f={at:m,amount:-i.coins,note:`Gift ${i.name} · ${a.title} · TEST MODE`,kind:"gift",giftSlug:i.slug,liveId:a.id,usd:r},v={balance:n.balance-i.coins,history:[f,...n.history].slice(0,200)},b={id:h,liveId:a.id,hostId:a.hostId,giftSlug:i.slug,giftName:i.name,coins:i.coins,usd:r,fees:o,net:c,creatorShare:d,platformShare:p,dbsShare:p,creatorPct:hi,dbsPct:er,fromUserId:s.id,fromUser:s.username,at:m,animation:i.animation,tier:i.tier,testModeNetAsListed:!0},y={id:h,userId:s.id,username:s.username,kind:"gift",giftSlug:i.slug,label:i.name,amount:r,coins:i.coins,at:m},k={id:"lc_"+m.toString(36)+"gf",userId:s.id,username:s.username,text:`sent ${i.name} (${i.coins} coins) · TEST MODE`,at:m,support:!0,giftSlug:i.slug},w={...a,giftsTotal:q((a.giftsTotal||0)+r),giftLog:[...a.giftLog||[],y],chat:[...a.chat||[],k]},x=[b,...dn()].slice(0,500),S=hn(u.creatorWallet),T={id:"earn_"+m.toString(36)+"_"+Math.random().toString(36).slice(2,6),category:"gifts",label:"Live gifts",note:`Live gift ${i.name} from @${s.username} · ${a.title}`,gross:r,fees:o,net:c,creatorPct:hi,dbsPct:er,creatorShare:d,dbsShare:p,source:"live_gift",giftSlug:i.slug,giftId:h,liveId:a.id,hostId:a.hostId,fromUserId:s.id,at:m,payoutId:null},_={...S,available:q(S.available+d),earnings:[T,...S.earnings||[]]},N={id:"gbpop_"+m.toString(36),liveId:a.id,fromUserId:s.id,fromUser:s.username,giftSlug:i.slug,giftName:i.name,coins:i.coins,usd:r,at:m,expiresAt:m+6e4};return u={...u,coins:v,live:w,liveGiftLedger:x,creatorWallet:_,liveGbChallengePop:N},C(u),{ok:!0,entry:b,viewerEntry:y,coins:v,live:w,earning:T,creatorWallet:_,challengePop:N}}const Co=24*60*60*1e3,tr=50;function Ya(e){return{app:e!=null&&e.app&&typeof e.app=="object"?e.app:null,liveByHost:e!=null&&e.liveByHost&&typeof e.liveByHost=="object"?{...e.liveByHost}:{},history:Array.isArray(e==null?void 0:e.history)?e.history:[]}}function Rs(e,t=Date.now()){return!e||typeof e!="object"?!1:(Number(e.endsAt)||0)>t}function Zt(e){return e?{...e}:null}function To(e){return"goal_"+e+"_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,6)}function pn(e,t){if(!t)return e;const s=[{...t,archivedAt:Date.now()},...e.history||[]].slice(0,40);return{...e,history:s}}function jd(e=Date.now()){return{id:To("app"),scope:"app",name:"PIKK daily community goal",targetAmount:50,raised:0,endsAt:e+Co,createdAt:e}}function xa(e){return u={...u,dailyGoals:e},C(u),e}function Aa(e=Date.now()){let t=Ya(u.dailyGoals),s=!1;return t.app&&!Rs(t.app,e)&&(t={...pn(t,t.app),app:null},s=!0),Rs(t.app,e)||(t={...t,app:jd(e)},s=!0),s&&xa(t),t.app&&t.app.name==="DBS daily community goal"&&(t={...t,app:{...t.app,name:"PIKK daily community goal"}},xa(t)),Zt(t.app)}function Fd(e,t=Date.now()){var n,r;const s=e||((n=u.live)==null?void 0:n.hostId)||((r=u.user)==null?void 0:r.id)||null;if(!s)return null;let a=Ya(u.dailyGoals);const i=a.liveByHost[s]||null;if(i&&!Rs(i,t)){const o={...a.liveByHost};return delete o[s],a={...pn(a,i),liveByHost:o},xa(a),null}return Zt(Rs(i,t)?i:null)}function Mo({name:e,targetAmount:t}={}){const s=u.user;if(!s)return{error:"signin"};const a=String(e||"").trim().slice(0,80),i=Number(t);if(!a)return{error:"bad_name"};if(!Number.isFinite(i)||i<=0)return{error:"bad_amount"};const n=Date.now();let r=Ya(u.dailyGoals);const o=r.liveByHost[s.id];o&&(r=pn(r,o));const c={id:To("live"),scope:"live",hostId:s.id,hostName:s.username,name:a,targetAmount:q(i),raised:0,endsAt:n+Co,createdAt:n};return r={...r,liveByHost:{...r.liveByHost,[s.id]:c}},xa(r),{ok:!0,goal:Zt(c)}}function Ca(e,t,s={}){if(!u.user)return{error:"signin"};const i=Math.floor(Number(t));if(!Number.isFinite(i)||i<=0)return{error:"invalid_amount"};const n=String(e||"");if(!n)return{error:"unknown_goal"};const r=Date.now();let o=Ya(u.dailyGoals),c=null,d=null,p=null;if(o.app&&o.app.id===n)c="app",p=o.app;else for(const[_,N]of Object.entries(o.liveByHost))if(N&&N.id===n){c="live",d=_,p=N;break}if(!p)return{error:"unknown_goal"};if(!Rs(p,r))return{error:"expired"};const m=Number(p.targetAmount)||0,h=Number(p.raised)||0;if(p.completedAt||m>0&&h>=m)return{error:"completed",goal:Zt(p)};let f=i;if(m>0){const _=Math.max(0,q(m-h)),N=Math.ceil(_*tr);if(N<=0)return{error:"completed",goal:Zt(p)};f>N&&(f=N)}const v=za(u.coins);if(v.balance<f)return{error:"insufficient",need:f,balance:v.balance};const b=q(f/tr),y=q(h+b),k=m>0&&y>=m?r:p.completedAt,w={...p,raised:m>0?Math.min(y,q(m)):y,...k?{completedAt:k}:{}},x=String((s==null?void 0:s.message)||"").trim().slice(0,180),S={at:r,amount:-f,note:`Goal donate · ${p.name} · $${b.toFixed(2)} · TEST MODE`,kind:"goal",goalId:p.id,...x?{message:x}:{},usd:b},T={balance:v.balance-f,history:[S,...v.history].slice(0,200)};return c==="app"?o={...o,app:w}:o={...o,liveByHost:{...o.liveByHost,[d]:w}},u={...u,dailyGoals:o,coins:T},C(u),{ok:!0,goal:Zt(w),coins:T,donated:{coins:f,usd:b,requested:i,message:x}}}function Gd(e){const t=u.user,s={id:"brand_"+Date.now().toString(36),brand:String(e.brand||"").trim().slice(0,80),contact:String(e.contact||"").trim().slice(0,120),email:String(e.email||"").trim().slice(0,120),campaign:String(e.campaign||"sponsored_post").trim().slice(0,40),budget:String(e.budget||"").trim().slice(0,40),pitch:String(e.pitch||"").trim().slice(0,500),url:String(e.url||"").trim().slice(0,300),applicantUserId:(t==null?void 0:t.id)||null,status:"pending",at:Date.now()};return!s.brand||!s.email?{error:"required"}:(u={...u,brandApps:[s,...u.brandApps]},C(u),s)}function Ud(e,t){if(!["pending","approved","rejected"].includes(t))return{error:"bad_status"};const a=u.brandApps.map(i=>i.id===e?{...i,status:t,reviewedAt:Date.now()}:i);return u={...u,brandApps:a},C(u),a.find(i=>i.id===e)}function sr(e){const t=u.user,s={id:"list_"+Date.now().toString(36),title:String(e.title||"").trim().slice(0,80),brand:String(e.brand||"").trim().slice(0,80),blurb:String(e.blurb||"").trim().slice(0,280),url:String(e.url||"").trim().slice(0,300),disclosure:String(e.disclosure||"Paid partnership · TEST MODE").trim().slice(0,120),brandAppId:e.brandAppId||null,createdBy:(t==null?void 0:t.id)||null,active:!0,at:Date.now()};return!s.title||!s.brand?{error:"required"}:(u={...u,listings:[s,...u.listings||[]]},C(u),s)}function Hd(e,t){const s=(u.listings||[]).map(a=>a.id===e?{...a,active:!!t}:a);return u={...u,listings:s},C(u),s.find(a=>a.id===e)}function Vd({activeOnly:e=!1}={}){const t=u.listings||[];return e?t.filter(s=>s.active):t}function zd(e){var s;return[((s=u.user)==null?void 0:s.id)||"guest",e].sort().join("__")}function un(){const e=u.user;return e?Object.values(u.threads||{}).filter(t=>{var s;return(s=t.participants)==null?void 0:s.includes(e.id)}).sort((t,s)=>(s.updatedAt||0)-(t.updatedAt||0)):[]}function Ta(e){const t=u.user;if(!t||!e||e.muted||e.blocked)return 0;const s=e.lastReadAt||0;return(e.messages||[]).filter(a=>a.from!==t.id&&(a.at||0)>s).length}function dt(){return un().reduce((e,t)=>e+Ta(t),0)}function ar(e){const t=u.user;if(!t||!e)return null;const s=u.threads[e];if(!s||!(s.participants||[]).includes(t.id))return null;const a={...s,lastReadAt:Date.now()};u={...u,threads:{...u.threads,[a.id]:a},demoUnreadSeeded:!0},C(u);try{typeof window<"u"&&window.dispatchEvent&&window.dispatchEvent(new CustomEvent("dbs:messages-unread",{detail:{count:dt()}}))}catch{}return u.threads[a.id]}function mn(){var d;const e=u.user;if(!e)return{seeded:!1};if(Ws(),u.demoUnreadSeeded)return{seeded:!1,count:dt(),once:!0};if(dt()>0)return u={...u,demoUnreadSeeded:!0},C(u),{seeded:!1,count:dt()};const t="maya",s=(((d=u.profiles)==null?void 0:d.maya)||{}).username||"MayaBeats",a=_s(t,s);if(a.error)return a;const i=u.threads[a.id];if((i.messages||[]).some(p=>p.from!==e.id)){const p=(i.messages||[]).filter(b=>b.from!==e.id).map(b=>b.at||0),m=i.lastReadAt||0;if(m>=Math.max(...p,0)||m>0)return u={...u,demoUnreadSeeded:!0},C(u),{seeded:!1,count:dt()};const f=Math.min(...p),v={...i,lastReadAt:Math.max(0,f-1)};return u={...u,threads:{...u.threads,[v.id]:v},demoUnreadSeeded:!0},C(u),{seeded:!0,count:dt()}}const r=Date.now(),o=[{id:"m_demo_unread_1",from:t,fromName:s,text:"Yo — drop coming Friday. You in for the listening party?",at:r-1e3*60*12},{id:"m_demo_unread_2",from:t,fromName:s,text:"Also sent a beat pack in the vault 🔥",at:r-1e3*60*5}],c={...i,messages:[...i.messages||[],...o],updatedAt:r-1e3*60*5,lastReadAt:0,request:!1};return u={...u,threads:{...u.threads,[c.id]:c},demoUnreadSeeded:!0},C(u),{seeded:!0,count:dt()}}function Do(e){return(u.threads||{})[e]||null}function Po(e){var a;const t=u.user;if(!t||!e)return!1;const s=(a=u.profiles)==null?void 0:a[e];return s?(t.following||[]).includes(e)&&(s.following||[]).includes(t.id):!1}function _s(e,t){const s=u.user;if(!s)return{error:"signin"};const a=zd(e);let i=u.threads[a];if(!i){const n=e==="dbs"||Po(e);i={id:a,kind:"dm",participants:[s.id,e],peerId:e,peerName:t||e,messages:[],updatedAt:Date.now(),request:!n,muted:!1,blocked:!1},u={...u,threads:{...u.threads,[a]:i}},C(u)}return i}function Wd(e,t,s,{priority:a=!1}={}){const i=u.user;if(!i)return{error:"signin"};const n=String(s||"").trim().slice(0,500);if(!n)return{error:"empty"};const r=_s(e,t);if(r.error)return r;const o={id:"m_"+Date.now().toString(36),from:i.id,fromName:i.username,text:n,at:Date.now(),priority:!!a},c={...u.threads[r.id],messages:[...u.threads[r.id].messages||[],o],updatedAt:Date.now(),peerName:t||u.threads[r.id].peerName};if(u={...u,threads:{...u.threads,[c.id]:c}},a){const d=u.wallet||{balance:0,history:[]};u={...u,wallet:{balance:d.balance,history:[...d.history||[],{at:Date.now(),amount:0,note:"Priority message · TEST MODE $2.99 (not charged)"}]}}}return C(u),{thread:u.threads[c.id],message:o}}function Ws(){const e={...u.profiles||{}};let t=!1;e.maya||(e.maya={id:"maya",username:"MayaBeats",bio:"Creator · beats & live demos",avatar:"",followers:[],following:["dbs"],verified:!1},t=!0),e.fanjay||(e.fanjay={id:"fanjay",username:"FanJay",bio:"Day-one fan · playlist curator",avatar:"",followers:[],following:["dbs"],verified:!1},t=!0);const s=u.user;if(s){const a={...e.maya},i=new Set(a.following||[]),n=new Set(a.followers||[]);i.has(s.id)||(i.add(s.id),t=!0),n.has(s.id)||(n.add(s.id),t=!0),a.following=[...i],a.followers=[...n],e.maya=a;let r=s;(s.following||[]).includes("maya")||(r={...s,following:[...s.following||[],"maya"]},t=!0),t&&(u={...u,user:r,profiles:e},kt(r),C(u))}else t&&(u={...u,profiles:e},C(u));return[{id:"dbs",username:"DatBoiSkeet",team:!0,bio:(u.profiles.dbs||{}).bio||""},{id:"maya",username:u.profiles.maya.username,team:!1,bio:u.profiles.maya.bio},{id:"fanjay",username:u.profiles.fanjay.username,team:!1,bio:u.profiles.fanjay.bio}]}function Yd(e,t=[]){const s=u.user;if(!s)return{error:"signin"};const a=String(e).trim().slice(0,60)||"Group",i=[...new Set([s.id,...t.filter(Boolean)])],n=a.toLowerCase().replace(/\W+/g,"_").slice(0,24)||"group",r=n==="dbs_fans"?"group_dbs_fans":"group_"+n+"_"+String(s.id).slice(-4);let o=u.threads[r];if(!o)o={id:r,kind:"group",peerId:r,peerName:a,participants:i,memberIds:i,messages:[],updatedAt:Date.now(),muted:!1,blocked:!1},u={...u,threads:{...u.threads,[r]:o}},C(u);else if(s&&!(o.participants||[]).includes(s.id)){const c=[...new Set([...o.participants||[],s.id])],d=[...new Set([...o.memberIds||c,s.id])];o={...o,participants:c,memberIds:d},u={...u,threads:{...u.threads,[r]:o}},C(u)}return u.threads[r]}function Jd(){return u.user?(Ws(),Yd("DBS Fans",["dbs","maya","fanjay"])):{error:"signin"}}function Qd(e,t){const s=u.user;if(!s)return{error:"signin"};const a=u.threads[e];if(!a||a.kind!=="group")return{error:"not_group"};if(!(a.participants||[]).includes(s.id))return{error:"forbidden"};const i=String(t||"").trim().slice(0,500);if(!i)return{error:"empty"};const n={id:"m_"+Date.now().toString(36),from:s.id,fromName:s.username,text:i,at:Date.now(),priority:!1},r={...a,messages:[...a.messages||[],n],updatedAt:Date.now()};return u={...u,threads:{...u.threads,[r.id]:r}},C(u),{thread:u.threads[r.id],message:n}}function gi(e,t={}){const s=u.threads[e];if(!s)return{error:"missing"};const a={...s,muted:t.muted!==void 0?!!t.muted:!!s.muted,blocked:t.blocked!==void 0?!!t.blocked:!!s.blocked,reportedAt:t.report?Date.now():s.reportedAt||null};return u={...u,threads:{...u.threads,[a.id]:a}},C(u),a}function ir(e={}){const t={...u.messagePrefs||{allowDMs:!0,allowRequests:!0},...e};return u={...u,messagePrefs:t},C(u),t}const Ot={gifts:{creatorPct:80,dbsPct:20,label:"Live gifts"},tips:{creatorPct:90,dbsPct:10,label:"Tips"},subscriptions:{creatorPct:85,dbsPct:15,label:"Subscriptions"},paid_content:{creatorPct:85,dbsPct:15,label:"Paid content"},referrals:{creatorPct:85,dbsPct:15,label:"Referrals"},clippers:{creatorPct:80,dbsPct:20,label:"Clippers"},sponsorships:{creatorPct:80,dbsPct:20,label:"Sponsorships"},merch:{creatorPct:85,dbsPct:15,label:"Merch / affiliate"}},Xd=[{category:"gifts",gross:40,note:"Live gifts · demo week"},{category:"tips",gross:22.5,note:"Live tips · demo week"},{category:"subscriptions",gross:29.99,note:"PIKK+ fan sub · demo"},{category:"referrals",gross:15,note:"Refer & Earn milestone · demo"},{category:"clippers",gross:50,note:"Clippers campaign payout · demo"},{category:"sponsorships",gross:100,note:"Sponsored livestream · demo"},{category:"merch",gross:35,note:"Foreign X-Change affiliate · demo"}];function q(e){return Math.round(Number(e)*100)/100}function hn(e){const t=Is().creatorWallet;return!e||typeof e!="object"?{...t}:{...t,...e,available:q(e.available??0),holds:q(e.holds??0),threshold:Number(e.threshold)>0?Number(e.threshold):25,verification:e.verification==="demo_verified"?"demo_verified":"demo_unverified",earnings:Array.isArray(e.earnings)?e.earnings:[],payouts:Array.isArray(e.payouts)?e.payouts:[]}}function St(){const e=hn(u.creatorWallet);return u.creatorWallet!==e&&(u={...u,creatorWallet:e}),e}function Lo({category:e,gross:t,note:s,source:a="demo",at:i=Date.now()}){const n=Ot[e]||Ot.tips,r=q(Math.max(0,Number(t)||0)),o=q(r*.029+(r>0?.3:0)),c=q(Math.max(0,r-o)),d=q(c*n.creatorPct/100),p=q(c-d);return{id:"earn_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,6),category:e,label:n.label,note:String(s||n.label).slice(0,120),gross:r,fees:o,net:c,creatorPct:n.creatorPct,dbsPct:n.dbsPct,creatorShare:d,dbsShare:p,source:a,at:i,payoutId:null}}function Zd(){return{...Ot}}function Bs(){return St()}function gn(e){const t=Lo(e),s=St(),a={...s,available:q(s.available+t.creatorShare),earnings:[t,...s.earnings||[]]};return u={...u,creatorWallet:a},C(u),t}function Io({force:e=!1}={}){const t=St();if(!e&&(t.earnings||[]).length>0)return{skipped:!0,creatorWallet:t};const s=Date.now()-6*864e5,i=Xd.map((o,c)=>Lo({category:o.category,gross:o.gross,note:o.note,source:"seed",at:s+c*36e5})).map((o,c)=>({...o,id:"earn_seed_"+c+"_"+o.category})),n=q(i.reduce((o,c)=>o+c.creatorShare,0)),r={...t,available:e?n:q(t.available+n),earnings:e?i:[...i,...t.earnings||[]],holds:e?0:t.holds,payouts:e?[]:t.payouts};return e&&(r.available=n,r.holds=0,r.payouts=[],r.earnings=i),u={...u,creatorWallet:r},C(u),{seeded:i.length,creatorWallet:r}}function ep({amount:e}={}){const t=St(),s=(t.payouts||[]).find(h=>h.status==="pending");if(s)return{error:"pending_exists",pending:s};const a=q(t.available);if(a<t.threshold)return{error:"below_threshold",available:a,threshold:t.threshold};const i=e!=null?q(e):a;if(i<=0||i>a)return{error:"bad_amount"};const n=(t.earnings||[]).filter(h=>!h.payoutId).sort((h,f)=>h.at-f.at),r=[];let o=0;for(const h of n){const f=q(h.creatorShare);if(!(f<=0)&&!(q(o+f)>i)&&(r.push(h.id),o=q(o+f),o>=i))break}if(!r.length){const h=n.find(f=>q(f.creatorShare)>0);if(!h)return{error:"no_earnings"};if(q(h.creatorShare)>a)return{error:"bad_amount"};r.push(h.id),o=q(h.creatorShare)}const c=o,d={id:"po_"+Date.now().toString(36),amount:c,status:"pending",at:Date.now(),earningIds:r,note:"TEST MODE payout request · not real money"},p=(t.earnings||[]).map(h=>r.includes(h.id)?{...h,payoutId:d.id}:h),m={...t,available:q(a-c),holds:q(t.holds+c),earnings:p,payouts:[d,...t.payouts||[]]};return u={...u,creatorWallet:m},C(u),d}function tp(e,t){if(!["pending","completed","rejected"].includes(t))return{error:"bad_status"};const a=St(),i=(a.payouts||[]).find(p=>p.id===e);if(!i)return{error:"missing"};if(i.status!=="pending"&&t!=="pending")return{error:"already_final",payout:i};let n=a.available,r=a.holds,o=a.earnings||[];if(i.status==="pending"&&t==="completed")r=q(Math.max(0,r-i.amount));else if(i.status==="pending"&&t==="rejected"){r=q(Math.max(0,r-i.amount)),n=q(n+i.amount);const p=new Set(i.earningIds||[]);o=o.map(m=>p.has(m.id)?{...m,payoutId:null}:m)}const c=a.payouts.map(p=>p.id===e?{...p,status:t,reviewedAt:Date.now()}:p),d={...a,available:n,holds:r,earnings:o,payouts:c};return u={...u,creatorWallet:d},C(u),c.find(p=>p.id===e)}function sp(e){const s={...St(),verification:e?"demo_verified":"demo_unverified"};return u={...u,creatorWallet:s},C(u),s}function fn(){const e=St(),t={};for(const s of Object.keys(Ot))t[s]={category:s,label:Ot[s].label,creatorPct:Ot[s].creatorPct,dbsPct:Ot[s].dbsPct,gross:0,fees:0,net:0,creatorShare:0,dbsShare:0,count:0};for(const s of e.earnings||[]){const a=t[s.category]||(t[s.category]={category:s.category,label:s.label||s.category,creatorPct:s.creatorPct,dbsPct:s.dbsPct,gross:0,fees:0,net:0,creatorShare:0,dbsShare:0,count:0});a.gross=q(a.gross+s.gross),a.fees=q(a.fees+s.fees),a.net=q(a.net+s.net),a.creatorShare=q(a.creatorShare+s.creatorShare),a.dbsShare=q(a.dbsShare+s.dbsShare),a.count+=1}return Object.values(t)}function Ma(e=5,t="Demo credit"){const s=u.wallet||{balance:0,history:[]},a=Number(s.balance||0)+Number(e),i=[...s.history||[],{at:Date.now(),amount:Number(e),note:t}];return u={...u,wallet:{balance:a,history:i}},C(u),u.wallet}function Oo(e,t="Demo spend"){const s=u.wallet||{balance:0,history:[]},a=Number(e);if(Number(s.balance||0)<a)return{error:"insufficient"};const i=Number(s.balance||0)-a,n=[...s.history||[],{at:Date.now(),amount:-a,note:t}];return u={...u,wallet:{balance:i,history:n}},C(u),u.wallet}function F(e,t){return String(e||"").toLowerCase().includes(t)}function ap(e){const t=String(e||"").trim().toLowerCase(),s={query:String(e||"").trim(),posts:[],profiles:[],music:[],videos:[],lives:[],products:[],pictures:[]};if(!t)return s;const a=(u.posts||[]).filter(h=>F(h.text,t)||F(h.username,t)),i=Object.values(u.profiles||{}).filter(h=>F(h.username,t)||F(h.bio,t));if(u.user){const h=u.user;(F(h.username,t)||F(h.bio,t))&&(i.find(f=>f.id===h.id)||i.push(h))}const n=(u.catalog||[]).filter(h=>h.published),r=n.filter(h=>(h.type==="song"||h.type==="album")&&(F(h.title,t)||F(h.artist,t)||F(h.type,t))),o=n.filter(h=>h.type==="video"&&(F(h.title,t)||F(h.artist,t)||F("video",t))),c=n.filter(h=>h.type==="picture"&&(F(h.title,t)||F(h.artist,t)||F("picture",t))),d=[],p=u.live;p&&!p.endedAt&&(F(p.title,t)||F(p.hostName,t)||F("live",t))&&d.push({...p,status:"live"}),(u.liveHistory||[]).forEach(h=>{(F(h.title,t)||F(h.hostName,t)||F("live",t))&&d.push({...h,status:"ended"})});const m=(u.listings||[]).filter(h=>h.active!==!1&&(F(h.title,t)||F(h.brand,t)||F(h.blurb,t)||F("marketplace",t)||F("product",t)));return{query:String(e||"").trim(),posts:a,profiles:i,music:r,videos:o,lives:d,products:m,pictures:c}}function ip(e=8){const t=u.likes||{},s=(u.posts||[]).map(o=>({kind:"post",id:o.id,title:(o.text||"").slice(0,72)||"Post",subtitle:"@"+(o.username||"creator"),href:"#/posts",score:(t[o.id]||[]).length,image:o.image||""})).sort((o,c)=>c.score-o.score||(c.id>o.id?1:-1)),a=[{kind:"music",id:"trend_music",title:"Long Story Short",subtitle:"Coming Soon · Music",href:"#/music",score:3,image:"/music/01_Long_Story_Short_Coming_Soon.jpg"},{kind:"video",id:"trend_video",title:"Dirty Money ft. Lil Baby",subtitle:"Official MV",href:"#/videos",score:3,image:""},{kind:"live",id:"trend_live",title:"Go live on DBS",subtitle:"Creators · Live",href:"#/live",score:2,image:""},{kind:"market",id:"trend_mkt",title:"Sponsored Marketplace",subtitle:"Brand ads · demo",href:"#/marketplace",score:2,image:""},{kind:"spotlight",id:"trend_spot",title:"24/7 Spotlight",subtitle:"Stage · Discover",href:"#/spotlight",score:1,image:""}],i=u.live;return i&&!i.endedAt&&a.unshift({kind:"live",id:"trend_live_now",title:i.title||"Live now",subtitle:"@"+(i.hostName||"creator")+" · LIVE",href:"#/live",score:99,image:""}),(u.catalog||[]).filter(o=>o.published).slice(0,3).forEach(o=>{const c=o.type==="video"?"#/videos":o.type==="picture"?"#/home":"#/music";a.push({kind:o.type,id:"trend_cat_"+o.id,title:o.title,subtitle:(o.artist||"Admin")+" · From Admin",href:c,score:4,image:o.coverRef&&!String(o.coverRef).startsWith("idb:")?o.coverRef:""})}),[...s,...a].sort((o,c)=>c.score-o.score).slice(0,e)}function np(){const e=Object.values(u.profiles||{}).map(t=>({id:t.id,username:t.username,bio:t.bio||"",avatar:t.avatar||"",verified:!!t.verified,followers:(t.followers||[]).length}));return u.user&&!e.find(t=>t.id===u.user.id)&&e.push({id:u.user.id,username:u.user.username,bio:u.user.bio||"",avatar:u.user.avatar||"",verified:!!u.user.verified,followers:(u.user.followers||[]).length}),e.sort((t,s)=>s.followers-t.followers||t.username.localeCompare(s.username))}const _o=6e4,fi=10;function qo(e=Date.now()){const t=new Date(e);return t.setHours(23,59,59,999),t.getTime()}function rp(e=Date.now()){const t=new Date(e);return t.setHours(0,0,0,0),t.getTime()}const No=[{id:"fan_maya",name:"MayaBeats",bio:"Demo fan · mutual"},{id:"fan_jay",name:"FanJay",bio:"Demo fan · sandbox opponent"}];function ve(){return u.giftBattles||{active:null,history:[],champions:[],prefs:{invitationsEnabled:!0}}}function jt(e){return u={...u,giftBattles:e},C(u),e}function vn(e,t=Date.now()){if(!e||e.status!=="active"||t<(e.endsAt||0))return e;const s=Number(e.scoreA||0),a=Number(e.scoreB||0);let i="tie",n=null,r=null;return s>a?(i="win",n=e.challenger.id,r=e.challenger.name):a>s&&(i="win",n=e.opponent.id,r=e.opponent.name),{...e,status:"ended",endedAt:t,result:i,winnerId:n,winnerName:r,scoreA:s,scoreB:a,championUntil:n?qo(t):null}}function Ro(){return No.map(e=>({...e}))}function bn(){return{invitationsEnabled:!0,...ve().prefs||{}}}function op(e={}){const t=ve(),s={...t.prefs,...e};return jt({...t,prefs:s})}function yn(){let t=ve().active;if(!t)return null;if(t.status==="active"){const s=vn(t);if(s!==t&&s.status==="ended")return kn(s);t=s}return t}function kn(e){const t=ve(),s=[e,...(t.history||[]).filter(i=>i.id!==e.id)].slice(0,40);let a=t.champions||[];return e.winnerId&&(a=[{battleId:e.id,userId:e.winnerId,username:e.winnerName,score:e.winnerId===e.challenger.id?e.scoreA:e.scoreB,opponentScore:e.winnerId===e.challenger.id?e.scoreB:e.scoreA,endedAt:e.endedAt,championUntil:e.championUntil,mode:e.mode},...a.filter(n=>n.battleId!==e.id)].slice(0,30)),jt({...t,active:e,history:s,champions:a}),e}function lp({opponentId:e,opponentName:t,mode:s}={}){const a=u.user;if(!a)return{error:"signin"};if(!bn().invitationsEnabled)return{error:"invites_disabled"};const n=u.live&&!u.live.endedAt,r=s||(n?"live":"sandbox");if(r==="live"&&!n)return{error:"not_live"};const o=ve(),c=o.active;if(c&&(c.status==="pending"||c.status==="active"))return{error:"battle_in_progress",battle:c};const d=No.find(h=>h.id===e),p={id:e||(d==null?void 0:d.id)||"fan_maya",name:t||(d==null?void 0:d.name)||"MayaBeats"};if(p.id===a.id)return{error:"self"};const m={id:"gb_"+Date.now().toString(36),status:"pending",mode:r,liveId:n?u.live.id:null,liveTitle:n?u.live.title:null,challenger:{id:a.id,name:a.username},opponent:p,createdAt:Date.now(),startedAt:null,endsAt:null,durationMs:_o,scoreA:0,scoreB:0,giftLog:[],result:null,winnerId:null,winnerName:null,endedAt:null,championUntil:null};return jt({...o,active:m}),{battle:m}}function cp(){const e=ve(),t=e.active;if(!t||t.status!=="pending")return{error:"no_pending"};if(!bn().invitationsEnabled)return{error:"invites_disabled"};const s=Date.now(),a={...t,status:"active",startedAt:s,endsAt:s+(t.durationMs||_o),scoreA:0,scoreB:0};return jt({...e,active:a}),{battle:a}}function dp(){const e=ve(),t=e.active;if(!t||t.status!=="pending")return{error:"no_pending"};const s={...t,status:"declined",endedAt:Date.now(),result:"declined"},a=[s,...e.history||[]].slice(0,40);return jt({...e,active:null,history:a}),{battle:s}}function pp(){const e=ve(),t=e.active;return t&&(t.status==="pending"||t.status==="active")?{error:"still_running",battle:t}:(jt({...e,active:null}),{ok:!0})}function up(e=Date.now()){const t=u.liveGbChallengePop;return t?t.expiresAt&&e>t.expiresAt?(u={...u,liveGbChallengePop:null},C(u),null):!u.live||u.live.endedAt||t.liveId&&t.liveId!==u.live.id?null:{...t}:null}function mp({side:e="challenger",kind:t="gift",amount:s=2,label:a=""}={}){var b;if(!u.user)return{error:"signin"};let n=yn();if(!n||n.status!=="active")return{error:"no_active"};if(n=ve().active,!n||n.status!=="active")return{error:"ended"};const r=Math.max(.5,Number(s)||1),o=t==="tip"?"tip":"gift",c=e==="opponent",d=c?n.opponent:n.challenger;let p=null;if(n.mode==="live"&&!c){if(p=$o({kind:o,amount:r,label:a||(o==="gift"?"🔥 Fire":"Tip")}),p!=null&&p.error)return p}else(((b=u.wallet)==null?void 0:b.balance)||0)>=r&&Oo(r,`Gift battle ${o} · ${d.name} · TEST MODE`);const m={id:"gbg_"+Date.now().toString(36),side:c?"opponent":"challenger",userId:d.id,username:d.name,kind:o,amount:r,label:(a||(o==="gift"?"🔥 Fire":"Tip")).slice(0,40),at:Date.now()},h=Number(n.scoreA||0)+(c?0:r),f=Number(n.scoreB||0)+(c?r:0);let v={...n,scoreA:+h.toFixed(2),scoreB:+f.toFixed(2),giftLog:[...n.giftLog||[],m]};return v=vn(v),v.status==="ended"?kn(v):jt({...ve(),active:v}),{battle:v,entry:m,live:(p==null?void 0:p.live)||null,wallet:u.wallet}}function Sn(){const t=ve().active;if(!t||t.status!=="active")return t;const s=vn(t);return s.status==="ended"&&t.status!=="ended"?kn(s):s}function hp(e=20){return(ve().history||[]).slice(0,e)}function gp(e=Date.now()){const t=ve(),s=t.active;return s&&s.status==="ended"&&s.winnerId&&s.championUntil&&e<s.championUntil?{battleId:s.id,userId:s.winnerId,username:s.winnerName,score:s.winnerId===s.challenger.id?s.scoreA:s.scoreB,endedAt:s.endedAt,championUntil:s.championUntil,mode:s.mode}:(t.champions||[]).find(i=>i.championUntil&&e<i.championUntil)||null}function fp(e=15){var s;const t={};for(const a of ve().history||[]){if(a.result!=="win"||!a.winnerId)continue;const i=t[a.winnerId]||{userId:a.winnerId,username:a.winnerName,wins:0,points:0};i.wins+=1;const n=a.winnerId===((s=a.challenger)==null?void 0:s.id)?Number(a.scoreA||0):Number(a.scoreB||0);i.points=+(i.points+n).toFixed(2),i.username=a.winnerName||i.username,t[a.winnerId]=i}return Object.values(t).sort((a,i)=>i.wins-a.wins||i.points-a.points||a.username.localeCompare(i.username)).slice(0,e)}function wn(e=fi,t=Date.now()){var c;const s=Math.min(Math.max(1,Number(e)||fi),fi),a=rp(t),i=qo(t),n=new Set,r=[],o=d=>{if(!(d!=null&&d.userId)||!(d!=null&&d.username)||n.has(d.userId))return;const p=Number(d.endedAt||0);p<a||p>i||d.championUntil&&t>d.championUntil||(n.add(d.userId),r.push({userId:d.userId,username:d.username,score:Number(d.score||0),endedAt:p,championUntil:d.championUntil||i,battleId:d.battleId||d.id||null,mode:d.mode||"demo"}))};for(const d of ve().champions||[])if(o(d),r.length>=s)return r;for(const d of ve().history||[])if(!(d.result!=="win"||!d.winnerId)&&(o({userId:d.winnerId,username:d.winnerName,score:d.winnerId===((c=d.challenger)==null?void 0:c.id)?d.scoreA:d.scoreB,endedAt:d.endedAt,championUntil:d.championUntil||i,battleId:d.id,mode:d.mode}),r.length>=s))break;return r}const $n=4,Ri=[{id:"maya",username:"MayaBeats",bio:"Creator · beats & live demos"},{id:"fanjay",username:"FanJay",bio:"Day-one fan · playlist curator"},{id:"ria",username:"RiaLoops",bio:"Demo co-host · loops & hooks"},{id:"dez",username:"DezOnMic",bio:"Demo guest · freestyle nights"}];function _e(){return u.multiGuest||{active:null,history:[]}}function We(e){return u={...u,multiGuest:e},C(u),e}function Ys(e,t){const s=[e,...t],a=s.length||1,i=Math.floor(100/a*100)/100,n={};let r=0;return s.forEach((o,c)=>{c===s.length-1?n[o]=+(100-r).toFixed(2):(n[o]=i,r=+(r+i).toFixed(2))}),n}function Ja(){Ws();const e={...u.profiles||{}};let t=!1;for(const s of Ri)e[s.id]||(e[s.id]={id:s.id,username:s.username,bio:s.bio,avatar:"",followers:[],following:["dbs"],verified:!1},t=!0);return t&&(u={...u,profiles:e},C(u)),Ri.map(s=>{const a=u.profiles[s.id]||s;return{id:s.id,username:a.username||s.username,bio:a.bio||s.bio,followers:(a.followers||[]).length}})}function vp(){return Ja()}function Ks(){return _e().active||null}function bp(e=20){return(_e().history||[]).slice(0,e)}function yp(e){const t=u.user;if(!t)return{error:"signin"};const s=_e();if(s.active&&!s.active.endedAt)return{error:"session_in_progress",session:s.active};const a=String(e||"").trim().slice(0,80)||"Multi-Guest Live";Ja();const i={id:"mg_"+Date.now().toString(36),title:a,hostId:t.id,hostName:t.username,startedAt:Date.now(),endedAt:null,maxGuests:$n,guests:[],chat:[{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:"Multi-guest session started · TEST MODE · no camera / WebRTC",at:Date.now(),system:!0}],giftSplit:{mode:"equal",shares:{[t.id]:100},disclosed:!1,disclosedAt:null},broadcastReady:!1};return We({...s,active:i}),{session:i}}function kp(e){var h;const t=u.user;if(!t)return{error:"signin"};const s=_e(),a=s.active;if(!a||a.endedAt)return{error:"no_session"};if(a.hostId!==t.id)return{error:"host_only"};Ja();const i=Ri.find(f=>f.id===e),n=(h=u.profiles)==null?void 0:h[e];if(!i&&!n)return{error:"unknown_guest"};if(e===t.id||e===a.hostId)return{error:"self"};const r=(a.guests||[]).find(f=>f.id===e);if(r&&(r.status==="invited"||r.status==="joined"))return{error:"already_invited",session:a};if((a.guests||[]).filter(f=>f.status==="joined"||f.status==="invited").length>=(a.maxGuests||$n))return{error:"full"};const c={id:e,username:(n==null?void 0:n.username)||(i==null?void 0:i.username)||e,status:"invited",muted:!1,invitedAt:Date.now(),joinedAt:null},d=[...(a.guests||[]).filter(f=>f.id!==e),c],p=[...a.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`Invited @${c.username} to the stage`,at:Date.now(),system:!0}].slice(-80),m={...a,guests:d,chat:p,broadcastReady:!1};return m.giftSplit={...m.giftSplit,disclosed:!1,disclosedAt:null,shares:Ys(a.hostId,d.filter(f=>f.status==="joined").map(f=>f.id))},We({...s,active:m}),{session:m,guest:c}}function Sp(e){var p;const t=u.user;if(!t)return{error:"signin"};const s=_e(),a=s.active;if(!a||a.endedAt)return{error:"no_session"};if(a.hostId!==t.id)return{error:"host_only"};const i=(a.guests||[]).map(m=>({...m})),n=i.findIndex(m=>m.id===e);if(n<0)return{error:"not_found"};if(i[n].status==="joined")return{session:a,guest:i[n]};if(i.filter(m=>m.status==="joined").length>=(a.maxGuests||$n))return{error:"full"};i[n]={...i[n],status:"joined",joinedAt:Date.now(),muted:!1};const o=i.filter(m=>m.status==="joined").map(m=>m.id),c=[...a.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`@${i[n].username} joined the stage`,at:Date.now(),system:!0}].slice(-80),d={...a,guests:i,chat:c,broadcastReady:!1,giftSplit:{mode:((p=a.giftSplit)==null?void 0:p.mode)||"equal",shares:Ys(a.hostId,o),disclosed:!1,disclosedAt:null}};return We({...s,active:d}),{session:d,guest:i[n]}}function wp(e){var c;const t=u.user;if(!t)return{error:"signin"};const s=_e(),a=s.active;if(!a||a.endedAt)return{error:"no_session"};if(a.hostId!==t.id)return{error:"host_only"};const i=(a.guests||[]).map(d=>d.id===e?{...d,status:"declined"}:d);if(!(a.guests||[]).some(d=>d.id===e))return{error:"not_found"};const n=((c=(a.guests||[]).find(d=>d.id===e))==null?void 0:c.username)||e,r=[...a.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`@${n} declined the invite`,at:Date.now(),system:!0}].slice(-80),o={...a,guests:i,chat:r};return We({...s,active:o}),{session:o}}function $p(e){var d,p;const t=u.user;if(!t)return{error:"signin"};const s=_e(),a=s.active;if(!a||a.endedAt)return{error:"no_session"};if(a.hostId!==t.id&&t.id!==e)return{error:"forbidden"};const i=(a.guests||[]).map(m=>m.id===e?{...m,status:"left",muted:!1}:m);if(!(a.guests||[]).some(m=>m.id===e))return{error:"not_found"};const n=((d=(a.guests||[]).find(m=>m.id===e))==null?void 0:d.username)||e,r=i.filter(m=>m.status==="joined").map(m=>m.id),o=[...a.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`@${n} left the stage`,at:Date.now(),system:!0}].slice(-80),c={...a,guests:i,chat:o,broadcastReady:!1,giftSplit:{mode:((p=a.giftSplit)==null?void 0:p.mode)||"equal",shares:Ys(a.hostId,r),disclosed:!1,disclosedAt:null}};return We({...s,active:c}),{session:c}}function Ep(e){var d,p;const t=u.user;if(!t)return{error:"signin"};const s=_e(),a=s.active;if(!a||a.endedAt)return{error:"no_session"};if(a.hostId!==t.id)return{error:"host_only"};const i=(a.guests||[]).map(m=>m.id===e?{...m,status:"removed",muted:!1}:m);if(!(a.guests||[]).some(m=>m.id===e))return{error:"not_found"};const n=((d=(a.guests||[]).find(m=>m.id===e))==null?void 0:d.username)||e,r=i.filter(m=>m.status==="joined").map(m=>m.id),o=[...a.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`Host removed @${n} from the stage`,at:Date.now(),system:!0}].slice(-80),c={...a,guests:i,chat:o,broadcastReady:!1,giftSplit:{mode:((p=a.giftSplit)==null?void 0:p.mode)||"equal",shares:Ys(a.hostId,r),disclosed:!1,disclosedAt:null}};return We({...s,active:c}),{session:c}}function xp(e,t=!0){var d;const s=u.user;if(!s)return{error:"signin"};const a=_e(),i=a.active;if(!i||i.endedAt)return{error:"no_session"};if(i.hostId!==s.id)return{error:"host_only"};const n=(i.guests||[]).map(p=>p.id===e&&p.status==="joined"?{...p,muted:!!t}:p);if(!(i.guests||[]).some(p=>p.id===e&&p.status==="joined"))return{error:"not_joined"};const r=((d=(i.guests||[]).find(p=>p.id===e))==null?void 0:d.username)||e,o=[...i.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:t?`Host muted @${r}`:`Host unmuted @${r}`,at:Date.now(),system:!0}].slice(-80),c={...i,guests:n,chat:o};return We({...a,active:c}),{session:c}}function Ap(e){const t=u.user;if(!t)return{error:"signin"};const s=_e(),a=s.active;if(!a||a.endedAt)return{error:"no_session"};const i=String(e||"").trim().slice(0,280);if(!i)return{error:"empty"};const n={id:"c_"+Date.now().toString(36),userId:t.id,username:t.username,text:i,at:Date.now()},r=[...a.chat||[],n].slice(-80),o={...a,chat:r};return We({...s,active:o}),{session:o,message:n}}function Ts({mode:e="equal",shares:t=null,disclose:s=!1}={}){var h,f;const a=u.user;if(!a)return{error:"signin"};const i=_e(),n=i.active;if(!n||n.endedAt)return{error:"no_session"};if(n.hostId!==a.id)return{error:"host_only"};const r=(n.guests||[]).filter(v=>v.status==="joined").map(v=>v.id),o=[n.hostId,...r];let c,d=e==="custom"?"custom":"equal";if(d==="equal")c=Ys(n.hostId,r);else{c={};let v=0;for(const b of o){const y=Math.max(0,Number(t==null?void 0:t[b])||0);c[b]=+y.toFixed(2),v+=c[b]}if(v=+v.toFixed(2),Math.abs(v-100)>.05)return{error:"split_total",total:v,expected:100}}const p={mode:d,shares:c,disclosed:!!s||!!((h=n.giftSplit)!=null&&h.disclosed),disclosedAt:s?Date.now():((f=n.giftSplit)==null?void 0:f.disclosedAt)||null};s&&(p.disclosed=!0),s&&(p.disclosedAt=Date.now());const m={...n,giftSplit:p,broadcastReady:!!p.disclosed};return We({...i,active:m}),{session:m}}function Cp(){var e,t,s,a;return Ts({mode:((t=(e=Ks())==null?void 0:e.giftSplit)==null?void 0:t.mode)||"equal",shares:((a=(s=Ks())==null?void 0:s.giftSplit)==null?void 0:a.shares)||null,disclose:!0})}function Tp(){const e=u.user;if(!e)return{error:"signin"};const t=_e(),s=t.active;if(!s||s.endedAt)return{error:"no_session"};if(s.hostId!==e.id)return{error:"host_only"};const a={...s,endedAt:Date.now(),broadcastReady:!1},i=[a,...(t.history||[]).filter(n=>n.id!==a.id)].slice(0,20);return We({active:null,history:i}),{session:a}}const Bo=["song","album","video","live","app","interview"],En=["draft","active","paused","ended"];function Ft(e){if(!e||typeof e!="object")return null;const t=e.fundSource==="third_party"?"third_party":"dbs",s=Bo.includes(e.promoteType)?e.promoteType:"app",a=En.includes(e.status)?e.status:"draft",i=Number(e.deadline)||0;return{id:String(e.id||""),title:String(e.title||"").slice(0,120),promoteType:s,budget:Math.max(0,Number(e.budget)||0),deadline:i,fundSource:t,managementFeePct:t==="third_party"?20:0,reward:String(e.reward||"").slice(0,200),status:a,participants:Array.isArray(e.participants)?e.participants:[],submissions:Array.isArray(e.submissions)?e.submissions:[],createdAt:Number(e.createdAt)||Date.now(),createdBy:e.createdBy||null}}function ls(e){u={...u,missions:e},C(u)}function Qa({status:e=null}={}){const t=(u.missions||[]).map(Ft).filter(Boolean);if(!e)return t;const s=Array.isArray(e)?e:[e];return t.filter(a=>s.includes(a.status))}function Mp(e){return Qa().find(t=>t.id===e)||null}function Dp(e={}){var o;const t=String(e.title||"").trim().slice(0,120);if(!t)return{error:"required"};const s=Bo.includes(e.promoteType)?e.promoteType:"app",a=e.fundSource==="third_party"?"third_party":"dbs";let i=e.deadline;if(typeof i=="string"&&i){const c=Date.parse(i);i=Number.isFinite(c)?c:Date.now()+7*864e5}else i=Number(i)||Date.now()+7*864e5;const n=En.includes(e.status)?e.status:"active",r=Ft({id:"msn_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),title:t,promoteType:s,budget:Number(e.budget)||0,deadline:i,fundSource:a,reward:String(e.reward||"").trim().slice(0,200)||"Demo reward · TEST MODE",status:n,participants:[],submissions:[],createdAt:Date.now(),createdBy:((o=u.user)==null?void 0:o.id)||"demo_admin"});return ls([r,...u.missions||[]]),r}function Pp(e,t){if(!En.includes(t))return{error:"bad_status"};let s=null;const a=(u.missions||[]).map(i=>{const n=Ft(i);return!n||n.id!==e?i:(s={...n,status:t},s)});return s?(ls(a),s):{error:"not_found"}}function Lp(e){const t=u.user;if(!t)return{error:"signin"};let s=null;const a=(u.missions||[]).map(i=>{const n=Ft(i);if(!n||n.id!==e)return i;if(n.status!=="active")return s={error:"not_active",mission:n},i;if((n.participants||[]).some(c=>c.userId===t.id))return s={error:"already_joined",mission:n},i;const o={userId:t.id,username:t.username||"creator",joinedAt:Date.now(),score:0,referralCode:"REF-"+t.id.slice(0,6).toUpperCase()+"-"+Math.random().toString(36).slice(2,5).toUpperCase()};return s={...n,participants:[...n.participants||[],o]},s});return s?(s.error||ls(a),s):{error:"not_found"}}function Ip(e,{proof:t=""}={}){const s=u.user;if(!s)return{error:"signin"};const a=String(t||"").trim().slice(0,400);if(!a)return{error:"required"};let i=null;const n=(u.missions||[]).map(r=>{const o=Ft(r);if(!o||o.id!==e)return r;if(o.status!=="active")return i={error:"not_active",mission:o},r;if(!(o.participants||[]).some(m=>m.userId===s.id))return i={error:"not_joined",mission:o},r;const d={id:"sub_"+Date.now().toString(36)+Math.random().toString(36).slice(2,5),userId:s.id,username:s.username||"creator",proof:a,at:Date.now(),status:"pending"},p=(o.participants||[]).map(m=>m.userId===s.id?{...m,score:(Number(m.score)||0)+10}:m);return i={...o,participants:p,submissions:[d,...o.submissions||[]]},i});return i?(i.error||ls(n),i):{error:"not_found"}}function Op(e,t=5){const s=u.user;if(!s)return{error:"signin"};const a=Math.max(1,Math.min(50,Number(t)||5));let i=null;const n=(u.missions||[]).map(r=>{const o=Ft(r);if(!o||o.id!==e)return r;if(!(o.participants||[]).some(p=>p.userId===s.id))return i={error:"not_joined",mission:o},r;const d=(o.participants||[]).map(p=>p.userId===s.id?{...p,score:(Number(p.score)||0)+a}:p);return i={...o,participants:d},i});return i?(i.error||ls(n),i):{error:"not_found"}}function _p(e){const t=Mp(e);return t?[...t.participants||[]].map(s=>({userId:s.userId,username:s.username,score:Number(s.score)||0,referralCode:s.referralCode||"",joinedAt:s.joinedAt,submissions:(t.submissions||[]).filter(a=>a.userId===s.userId).length})).sort((s,a)=>a.score-s.score||(s.joinedAt||0)-(a.joinedAt||0)):[]}function qp({force:e=!1}={}){if((u.missions||[]).length&&!e)return{skipped:!0,missions:Qa()};const s=Date.now(),a=864e5,i=[{id:"msn_demo_song",title:"Push Long Story Short (clip challenge)",promoteType:"song",budget:2500,deadline:s+14*a,fundSource:"dbs",reward:"$50–$200 demo credits by rank · DBS-funded marketing",status:"active",participants:[{userId:"clipper_demo",username:"ClipQueen",joinedAt:s-2*a,score:42,referralCode:"REF-CLIP-AAA"},{userId:"dbs",username:"DatBoiSkeet",joinedAt:s-a,score:28,referralCode:"REF-DBS-001"}],submissions:[{id:"sub_demo1",userId:"clipper_demo",username:"ClipQueen",proof:"https://example.com/tiktok/lss-clip-1 · 12k views",at:s-a,status:"pending"}],createdAt:s-3*a,createdBy:"demo_admin"},{id:"msn_demo_live",title:"Boost Friday Night Live",promoteType:"live",budget:800,deadline:s+5*a,fundSource:"third_party",reward:"Share of $800 pot after 20% management fee",status:"active",participants:[],submissions:[],createdAt:s-a,createdBy:"demo_admin"},{id:"msn_demo_app",title:"Download DBS · invite 3 friends",promoteType:"app",budget:1200,deadline:s+30*a,fundSource:"dbs",reward:"Referral bonus stack · verified installs only",status:"active",participants:[],submissions:[],createdAt:s-5*a,createdBy:"demo_admin"},{id:"msn_demo_ended",title:"Ladies Only teaser push (ended)",promoteType:"video",budget:500,deadline:s-2*a,fundSource:"third_party",reward:"Completed · demo archive",status:"ended",participants:[{userId:"clipper_demo",username:"ClipQueen",joinedAt:s-10*a,score:90,referralCode:"REF-CLIP-OLD"}],submissions:[],createdAt:s-20*a,createdBy:"demo_admin"}].map(Ft);return ls(i),{seeded:i.length,missions:i}}const Ko=60*1e3,xn=60*1e3,js=2,Xa=3,Za=3,Js=3,Np=["song","beat","music_video"],Rp=[...Np,"freestyle"];function jo(){const e=u.spotlight||{};return{nowPlaying:e.nowPlaying||null,queue:Array.isArray(e.queue)?e.queue:[],history:Array.isArray(e.history)?e.history:[],houseIndex:typeof e.houseIndex=="number"?e.houseIndex:0}}function ge(e){return u={...u,spotlight:e},C(u),e}function Bp(e){return e==="freestyle"?"Live Freestyle":e==="beat"?"Beat":e==="music_video"?"Music Video":"Song"}function Bi(e,t="ended"){return e?{id:e.id,userId:e.userId,username:e.username,type:e.type,title:e.title,artist:e.artist,startedAt:e.startedAt,endedAt:Date.now(),extensions:e.extensions||0,playCount:e.playCount||1,reason:t}:null}function de(e=Date.now()){let t=jo(),s=t.nowPlaying;if(!s)return Kp(t,e);if(s.house)return t;if(s.type==="freestyle"&&s.endsAt&&e>=s.endsAt&&!s.awaitingPlayAnother){if(Object.keys(s.keepGoingVotes||{}).length>=Xa&&(s.extensions||0)<js&&!s.extensionApplied){s={...s,extensions:(s.extensions||0)+1,endsAt:e+xn,keepGoingVotes:{},extensionApplied:!1,voteWindowOpen:!0};const p={...t,nowPlaying:s};return ge(p),p}const n=[Bi(s,"timer"),...t.history||[]].slice(0,30),r=[...t.queue||[]];let o=null,c=typeof t.houseIndex=="number"?t.houseIndex:0;if(r.length){const p=r.shift();o=Da(p,e)}else o=Pa(Rt(c),e);const d={nowPlaying:o,queue:r,history:n,houseIndex:c};return ge(d),d}if(s.awaitingPlayAnother&&s.playAnotherDeadline&&e>=s.playAnotherDeadline){const a=Object.keys(s.playAnotherVotes||{}).length,i=s.playCount||1;if(a>=Za&&i<Js){s={...s,awaitingPlayAnother:!1,playAnotherVotes:{},playAnotherDeadline:null,playCount:i+1,title:s.nextTitle||s.title,startedAt:e,endsAt:null,nextTitle:null};const p={...t,nowPlaying:s};return ge(p),p}const n=[Bi(s,"play_another_fail"),...t.history||[]].slice(0,30),r=[...t.queue||[]];let o=null,c=typeof t.houseIndex=="number"?t.houseIndex:0;r.length?o=Da(r.shift(),e):o=Pa(Rt(c),e);const d={nowPlaying:o,queue:r,history:n,houseIndex:c};return ge(d),d}return t}function Da(e,t=Date.now()){const s=e.type==="freestyle";return{id:"sp_"+t.toString(36)+"_"+Math.random().toString(36).slice(2,6),userId:e.userId,username:e.username,type:e.type,title:e.title||(s?"Live Freestyle":"Untitled"),artist:e.artist||e.username,cover:e.cover||"",startedAt:t,endsAt:s?t+Ko:null,extensions:0,playCount:1,keepGoingVotes:{},playAnotherVotes:{},voteWindowOpen:s,awaitingPlayAnother:!1,playAnotherDeadline:null,reactions:{fire:0,heart:0,clap:0},chat:[{id:"c_"+t.toString(36),userId:"system",username:"DBS",text:`${e.username} took the Spotlight · ${Bp(e.type)} · TEST MODE`,at:t,system:!0}]}}function ce(){const e=de();return{nowPlaying:e.nowPlaying||null,queue:[...e.queue||[]],history:[...e.history||[]],houseIndex:typeof e.houseIndex=="number"?e.houseIndex:0,thresholds:{keepGoing:Xa,playAnother:Za,maxExtensions:js,maxUploadStreak:Js,freestyleMs:Ko}}}function Fo(){const e=[];for(const s of ue||[])!s||!s.embed||(s.category==="Music Videos"?e.push({id:s.id,title:s.title,artist:s.artist||"DatBoiSkeet",embed:s.embed,youtube:s.youtube||"",kind:"music_video",chipLabel:"House · Music Video",note:"DatBoiSkeet catalog · original YouTube · not a live act",cover:s.cover||""}):s.category==="Interviews"&&e.push({id:s.id,title:s.title,artist:s.artist||"DatBoiSkeet",embed:s.embed,youtube:s.youtube||"",kind:"interview",chipLabel:"House · Interview",note:"DatBoiSkeet interview · original YouTube · not a live act",cover:s.cover||""}));const t=(_i||[]).find(s=>s.id==="pl-vlogs");if(t&&t.youtube){const s=String(t.youtube).match(/[?&]list=([^&]+)/),a=s&&s[1];a&&e.push({id:"house-bts-vlogs",title:t.title||"DatBoiSkeet Vlogs",artist:"DatBoiSkeet",embed:"https://www.youtube.com/embed/videoseries?list="+a,youtube:t.youtube,kind:"bts",chipLabel:"House · BTS",note:"Channel vlogs · dedicated BTS clips thin · original YouTube · not a live act",cover:""})}return e}function Go(){const e=Fo().length;return e>0?e:1}function Rt(e){const t=Fo();if(!t.length)return{id:"house_empty",title:"DatBoiSkeet catalog",artist:"DatBoiSkeet",embed:"",youtube:"https://www.youtube.com/@DatBoiSkeet1",kind:"music_video",chipLabel:"House · Music Video",note:"Catalog loading · not a live act",cover:"",status:"House rotation"};const s=(e%t.length+t.length)%t.length;return{...t[s],status:t[s].chipLabel}}function Pa(e,t=Date.now()){return{id:"house_"+(e.id||"x")+"_"+t.toString(36),userId:"dbs",username:"DatBoiSkeet",type:"music_video",house:!0,houseKind:e.kind||"music_video",chipLabel:e.chipLabel||"House · Music Video",title:e.title,artist:e.artist||"DatBoiSkeet",embed:e.embed||"",youtube:e.youtube||"",note:e.note||"House catalog · not a live act",cover:e.cover||"",startedAt:t,endsAt:null,extensions:0,playCount:1,keepGoingVotes:{},playAnotherVotes:{},voteWindowOpen:!1,awaitingPlayAnother:!1,playAnotherDeadline:null,reactions:{fire:0,heart:0,clap:0},chat:[{id:"c_house_"+t.toString(36),userId:"system",username:"DBS",text:`House catalog · ${e.chipLabel||"House"} · ${e.title} · not a live act · TEST MODE`,at:t,system:!0}]}}function Kp(e,t=Date.now()){if(e.nowPlaying)return e;const s=typeof e.houseIndex=="number"?e.houseIndex:0,a=Rt(s),i=Pa(a,t),n={...e,nowPlaying:i,houseIndex:s};return ge(n),n}function Uo(){const e=jo();return Rt(typeof e.houseIndex=="number"?e.houseIndex:0)}function jp({type:e="song",title:t="",artist:s=""}={}){const a=u.user;if(!a)return{error:"signin"};const i=Rp.includes(e)?e:"song",n=de(),r=a.id,o=(n.queue||[]).some(b=>b.userId===r),c=n.nowPlaying&&!n.nowPlaying.house&&n.nowPlaying.userId===r&&!n.nowPlaying.awaitingPlayAnother;if(o||c)return{error:"already_queued",state:ce()};const d=String(t||"").trim().slice(0,80)||(i==="freestyle"?"Live Freestyle":i==="beat"?"Untitled Beat":i==="music_video"?"Untitled MV":"Untitled Song"),p=String(s||a.username||"").trim().slice(0,60),m={id:"q_"+Date.now().toString(36),userId:r,username:a.username,type:i,title:d,artist:p,cover:"",joinedAt:Date.now()};let h=n.nowPlaying,f=[...n.queue||[]],v=typeof n.houseIndex=="number"?n.houseIndex:0;return h?(h.house,f.push(m)):(h=Da(m),f=[]),ge({...n,nowPlaying:h,queue:f,houseIndex:v}),{ok:!0,state:ce()}}function nr(){const e=u.user;if(!e)return{error:"signin"};const t=de(),s=(t.queue||[]).length,a=(t.queue||[]).filter(i=>i.userId!==e.id);return a.length===s?{error:"not_in_queue"}:(ge({...t,queue:a}),{ok:!0,state:ce()})}function Fp(e){if(!u.user)return{error:"signin"};const s=de(),a=(s.queue||[]).filter(i=>i.id!==e);return ge({...s,queue:a}),{ok:!0,state:ce()}}function Ho(e="advance"){if(!u.user)return{error:"signin"};const s=de(),a=s.nowPlaying,i=!!(a&&a.house),n=a&&!i?[Bi(a,e),...s.history||[]].slice(0,30):[...s.history||[]],r=[...s.queue||[]];let o=typeof s.houseIndex=="number"?s.houseIndex:0;i&&(o=(o+1)%Go());let c=null;return r.length?c=Da(r.shift()):c=Pa(Rt(o)),ge({nowPlaying:c,queue:r,history:n,houseIndex:o}),{ok:!0,state:ce()}}function Gp(){return Ho("skip")}function Up(){const e=u.user;if(!e)return{error:"signin"};const t=de(),s=t.nowPlaying;if(!s)return{error:"empty_stage"};if(s.house)return{error:"house_use_skip"};if(s.type==="freestyle")return{error:"freestyle_use_timer"};if(s.awaitingPlayAnother)return{error:"already_voting"};!(s.userId===e.id)&&ae();const i=s.playCount||1;if(i>=Js)return Ho("max_streak");const n={...s,awaitingPlayAnother:!0,playAnotherVotes:{},playAnotherDeadline:Date.now()+30*1e3,nextTitle:s.title+" (take "+(i+1)+")"};return ge({...t,nowPlaying:n}),{ok:!0,state:ce()}}function Hp(){const e=u.user;if(!e)return{error:"signin"};const t=de(),s=t.nowPlaying;if(!s||s.type!=="freestyle")return{error:"no_freestyle"};if(!s.voteWindowOpen)return{error:"window_closed"};if(s.awaitingPlayAnother)return{error:"wrong_mode"};if((s.extensions||0)>=js)return{error:"max_extensions"};const a={...s.keepGoingVotes||{}};if(a[e.id])return{error:"already_voted",state:ce()};a[e.id]=Date.now();let i={...s,keepGoingVotes:a};const n=Object.keys(a).length;return n>=Xa&&(s.extensions||0)<js&&(i={...i,extensions:(s.extensions||0)+1,endsAt:Date.now()+xn,keepGoingVotes:{},voteWindowOpen:!0}),ge({...t,nowPlaying:i}),{ok:!0,state:ce(),votes:Object.keys(i.keepGoingVotes||{}).length||n}}function Vp(e=2){const t=de(),s=t.nowPlaying;if(!s||s.type!=="freestyle")return{error:"no_freestyle"};const a={...s.keepGoingVotes||{}},i=Object.keys(a).length;for(let o=0;o<e;o++){const c="fan_sim_"+(i+o)+"_"+Date.now().toString(36);a[c]=Date.now()}let n={...s,keepGoingVotes:a};return Object.keys(a).length>=Xa&&(s.extensions||0)<js&&(n={...n,extensions:(s.extensions||0)+1,endsAt:Date.now()+xn,keepGoingVotes:{},voteWindowOpen:!0}),ge({...t,nowPlaying:n}),{ok:!0,state:ce()}}function zp(){const e=u.user;if(!e)return{error:"signin"};const t=de(),s=t.nowPlaying;if(!s||!s.awaitingPlayAnother)return{error:"no_vote"};const a={...s.playAnotherVotes||{}};if(a[e.id])return{error:"already_voted",state:ce()};a[e.id]=Date.now();let i={...s,playAnotherVotes:a};const n=Object.keys(a).length,r=s.playCount||1;return n>=Za&&r<Js&&(i={...i,awaitingPlayAnother:!1,playAnotherVotes:{},playAnotherDeadline:null,playCount:r+1,title:s.nextTitle||s.title,startedAt:Date.now(),endsAt:null,nextTitle:null}),ge({...t,nowPlaying:i}),{ok:!0,state:ce()}}function Wp(e=2){const t=de(),s=t.nowPlaying;if(!s||!s.awaitingPlayAnother)return{error:"no_vote"};const a={...s.playAnotherVotes||{}},i=Object.keys(a).length;for(let c=0;c<e;c++)a["fan_pa_"+(i+c)+"_"+Date.now().toString(36)]=Date.now();let n={...s,playAnotherVotes:a};const r=Object.keys(a).length,o=s.playCount||1;return r>=Za&&o<Js&&(n={...n,awaitingPlayAnother:!1,playAnotherVotes:{},playAnotherDeadline:null,playCount:o+1,title:s.nextTitle||s.title,startedAt:Date.now(),endsAt:null,nextTitle:null}),ge({...t,nowPlaying:n}),{ok:!0,state:ce()}}function Yp(e="fire"){const t=de(),s=t.nowPlaying;if(!s)return{error:"empty_stage"};const a=["fire","heart","clap"].includes(e)?e:"fire",i={...s.reactions||{fire:0,heart:0,clap:0}};return i[a]=(i[a]||0)+1,ge({...t,nowPlaying:{...s,reactions:i}}),{ok:!0,state:ce()}}function Jp(e){const t=u.user;if(!t)return{error:"signin"};const s=String(e||"").trim().slice(0,200);if(!s)return{error:"empty"};const a=de(),i=a.nowPlaying;if(!i)return{error:"empty_stage"};const n=[...i.chat||[],{id:"c_"+Date.now().toString(36),userId:t.id,username:t.username,text:s,at:Date.now()}].slice(-40);return ge({...a,nowPlaying:{...i,chat:n}}),{ok:!0,state:ce()}}function Qp(e=20){return(de().history||[]).slice(0,e)}function Ye(){const e=u.fanClubs||{clubs:[],posts:{},seeded:!1};return{clubs:Array.isArray(e.clubs)?e.clubs:[],posts:e.posts&&typeof e.posts=="object"?e.posts:{},seeded:!!e.seeded}}function cs(e){u={...u,fanClubs:e},C(u)}function Vo(e){return e+"_"+Date.now().toString(36)+Math.random().toString(36).slice(2,7)}function zo(){return Je(),Ye().clubs.slice().sort((e,t)=>e.official&&!t.official?-1:!e.official&&t.official?1:(t.memberCount||0)-(e.memberCount||0))}function Qs(e){return Je(),Ye().clubs.find(t=>t.id===e)||null}function Je({force:e=!1}={}){const t=Ye();if(t.seeded&&!e&&t.clubs.length>0)return{skipped:!0,clubs:t.clubs};const s=Date.now(),a=864e5,i=[{id:"fc_official_dbs",name:"DatBoiSkeet Official",description:"Official DatBoiSkeet fan club inside DBS Lounge. Music drops, Vault tips, Foreign X-Change, and community rules — DBS branding first. Follow optional.",graphic:"/brand/pikk-logo-square.png",hostId:"dbs",hostName:"DatBoiSkeet",privacy:"public",official:!0,members:["dbs"],followers:["dbs"],mods:["dbs"],memberCount:1,createdAt:s-14*a},{id:"fc_lss_crew",name:"Long Story Short Crew",description:"Creator club for LSS listeners. Public lounge chat + PIKK+ members-only drop room.",graphic:"/music/01_Long_Story_Short_Coming_Soon.jpg",hostId:"dbs",hostName:"DatBoiSkeet",privacy:"members",official:!1,members:["dbs"],followers:["dbs"],mods:["dbs"],memberCount:1,createdAt:s-7*a},{id:"fc_ladies_only",name:"Ladies Only Circle",description:"Paid / PIKK+ gated room demo for Ladies Only supporters. Unlock via membership TEST MODE.",graphic:"/music/02_Ladies_Only_Coming_Soon.jpg",hostId:"dbs",hostName:"DatBoiSkeet",privacy:"paid",official:!1,members:["dbs"],followers:[],mods:["dbs"],memberCount:1,createdAt:s-3*a}],n={fc_official_dbs:[{id:"fcp_welcome",userId:"dbs",username:"DatBoiSkeet",text:"Welcome to the official club. Discover music on #/music · explore more on #/explore. No forced follows.",at:s-2*a,pinned:!0,removed:!1},{id:"fcp_lounge",userId:"dbs",username:"DatBoiSkeet",text:"DBS Lounge rooms stay music-first. Keep it respectful — see Community Guidelines.",at:s-a,pinned:!1,removed:!1}],fc_lss_crew:[{id:"fcp_lss1",userId:"dbs",username:"DatBoiSkeet",text:"LSS cover art is live in Coming Soon. Members can discuss theories here.",at:s-a,pinned:!1,removed:!1}],fc_ladies_only:[{id:"fcp_lo1",userId:"dbs",username:"DatBoiSkeet",text:"PIKK+ members-only preview chat. Join PIKK+ on Pricing (TEST MODE) to unlock.",at:s-12*36e5,pinned:!0,removed:!1}]};return cs({clubs:i,posts:n,seeded:!0}),{seeded:i.length,clubs:i}}function Xp({name:e,description:t,graphic:s,privacy:a="public"}={}){const i=u.user;if(!i)return{error:"signin"};ae()||i.role==="creator"||i.id;const n=String(e||"").trim().slice(0,48);if(!n)return{error:"name"};const r=["public","members","paid"].includes(a)?a:"public";Je();const o=Ye(),c={id:Vo("fc"),name:n,description:String(t||"").trim().slice(0,280),graphic:String(s||"/brand/pikk-logo-square.png").slice(0,200),hostId:i.id,hostName:i.username,privacy:r,official:!1,members:[i.id],followers:[i.id],mods:[i.id],memberCount:1,createdAt:Date.now()};return cs({...o,clubs:[c,...o.clubs],posts:{...o.posts,[c.id]:[]},seeded:!0}),{ok:!0,club:c}}function ei(e,t){Je();const s=Ye(),a=s.clubs.findIndex(r=>r.id===e);if(a<0)return{error:"missing"};const i=t({...s.clubs[a]});if(i&&i.error)return i;const n=s.clubs.slice();return n[a]=i,cs({...s,clubs:n}),{ok:!0,club:i}}function Wo(e){const t=u.user;return t?ei(e,s=>{const a=new Set(s.members||[]);return a.add(t.id),{...s,members:[...a],memberCount:a.size}}):{error:"signin"}}function Zp(e){const t=u.user;return t?ei(e,s=>{if(s.hostId===t.id)return{error:"host"};const a=(s.members||[]).filter(i=>i!==t.id);return{...s,members:a,memberCount:a.length}}):{error:"signin"}}function eu(e){const t=u.user;return t?ei(e,s=>{const a=new Set(s.followers||[]);return a.add(t.id),{...s,followers:[...a]}}):{error:"signin"}}function tu(e){const t=u.user;return t?ei(e,s=>{const a=(s.followers||[]).filter(i=>i!==t.id);return{...s,followers:a}}):{error:"signin"}}function Yo(e){const t=u.user;if(!t)return!1;const s=Qs(e);return!!(s&&(s.members||[]).includes(t.id))}function su(e){const t=u.user;if(!t)return!1;const s=Qs(e);return!!(s&&(s.followers||[]).includes(t.id))}function Fs(e){const t=u.user;if(!t)return!1;const s=Qs(e);return s?ae()||s.hostId===t.id||(s.mods||[]).includes(t.id):!1}function Jo(e){const t=Qs(e);if(!t)return{ok:!1,reason:"missing"};if(t.privacy==="public")return{ok:!0,reason:"public"};if(t.privacy==="members")return Yo(e)||Fs(e)?{ok:!0,reason:"member"}:{ok:!1,reason:"members"};if(t.privacy==="paid"){const s=Kt();return({null:0,"skeet+":1,backstage:2,inner:3}[s||"null"]||0)>=1||Fs(e)?{ok:!0,reason:"paid"}:{ok:!1,reason:"paid"}}return{ok:!0,reason:"public"}}function au(e){return Je(),(Ye().posts[e]||[]).filter(s=>!s.removed).slice().sort((s,a)=>s.pinned&&!a.pinned?-1:!s.pinned&&a.pinned?1:(a.at||0)-(s.at||0))}function iu(e,t){const s=u.user;if(!s)return{error:"signin"};const a=Jo(e);if(!a.ok)return{error:"gated",reason:a.reason};const i=String(t||"").trim().slice(0,500);if(!i)return{error:"empty"};const n=Ye();if(!n.clubs.some(c=>c.id===e))return{error:"missing"};const r={id:Vo("fcp"),userId:s.id,username:s.username,text:i,at:Date.now(),pinned:!1,removed:!1},o=[r,...n.posts[e]||[]].slice(0,100);return cs({...n,posts:{...n.posts,[e]:o}}),{ok:!0,post:r}}function nu(e,t){if(!Fs(e))return{error:"mod"};const s=Ye(),a=(s.posts[e]||[]).map(i=>i.id===t?{...i,pinned:!i.pinned}:i);return cs({...s,posts:{...s.posts,[e]:a}}),{ok:!0}}function ru(e,t){if(!Fs(e))return{error:"mod"};const s=Ye(),a=(s.posts[e]||[]).map(i=>i.id===t?{...i,removed:!0}:i);return cs({...s,posts:{...s.posts,[e]:a}}),{ok:!0}}const An=["instagram","tiktok","facebook","youtube","x","snapchat","other"],Qo=[{id:"badge",minVerified:1,label:"Exclusive DBS badge",kind:"badge"},{id:"decoration",minVerified:2,label:"Premium avatar decoration",kind:"decoration"},{id:"skeet7",minVerified:3,label:"7 days PIKK+ (TEST MODE)",kind:"membership_trial",membership:"skeet+",days:7},{id:"skeet30",minVerified:3,requireAllLinked:!0,label:"30 days PIKK+ (all linked · min 3)",kind:"membership_trial",membership:"skeet+",days:30}],Xo=[{n:1,id:"m1",label:"Profile decoration",kind:"decoration"},{n:3,id:"m3",label:"7 days PIKK+ (TEST MODE)",kind:"membership_trial",membership:"skeet+",days:7},{n:5,id:"m5",label:"30 days PIKK+ (TEST MODE)",kind:"membership_trial",membership:"skeet+",days:30},{n:10,id:"m10",label:"Premium profile bundle",kind:"bundle"},{n:25,id:"m25",label:"30 days Backstage (TEST MODE)",kind:"membership_trial",membership:"backstage",days:30},{n:50,id:"m50",label:"30 days Inner Circle (TEST MODE)",kind:"membership_trial",membership:"inner",days:30},{n:100,id:"m100",label:"Founder Promoter badge / VIP",kind:"badge"}];function Zo(){return{platformsLinked:[],challenge:null,submissions:[],rewardsClaimed:[]}}function el(){return{code:"",invitees:[],milestonesClaimed:[]}}function tl(e){const t=Zo();return!e||typeof e!="object"?t:{platformsLinked:Array.isArray(e.platformsLinked)?e.platformsLinked:[],challenge:e.challenge&&typeof e.challenge=="object"?e.challenge:null,submissions:Array.isArray(e.submissions)?e.submissions:[],rewardsClaimed:Array.isArray(e.rewardsClaimed)?e.rewardsClaimed:[]}}function sl(e){const t=el();return!e||typeof e!="object"?t:{code:typeof e.code=="string"?e.code:"",invitees:Array.isArray(e.invitees)?e.invitees:[],milestonesClaimed:Array.isArray(e.milestonesClaimed)?e.milestonesClaimed:[]}}function nt(e){return u={...u,shareEarn:tl(e)},C(u),u.shareEarn}function wt(e){return u={...u,referEarn:sl(e)},C(u),u.referEarn}function al(e){if(!e)return"DBS-GUEST";const t=String(e.username||"fan").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,8)||"FAN",s=String(e.id||"").replace(/^u_/,"").slice(-4).toUpperCase()||"DEMO";return`DBS-${t}-${s}`}function Gt(e){return e+"_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function Ms(e=Date.now()){return new Date(e).toISOString().slice(0,10)}function Q(){return tl(u.shareEarn)}function rr(){return An.slice()}function ou(){return Qo.map(e=>({...e}))}function lu({platform:e,handle:t="",url:s="",followers:a=""}={}){if(!u.user)return{error:"signin"};const n=String(e||"").toLowerCase().trim();if(!An.includes(n))return{error:"bad_platform"};const r=String(t||"").trim().replace(/^@+/,"").slice(0,64),o=String(s||"").trim().slice(0,240);if(!r&&!o)return{error:"required"};const c=Q();if((c.platformsLinked||[]).some(m=>m.platform===n))return{error:"already_linked",shareEarn:c};const d={id:Gt("plat"),platform:n,handle:r,url:o,followers:String(a||"").trim().slice(0,32),linkedAt:Date.now()},p={...c,platformsLinked:[...c.platformsLinked||[],d]};return nt(p),{ok:!0,platform:d,shareEarn:Q()}}function cu(e){const t=Q(),s={...t,platformsLinked:(t.platformsLinked||[]).filter(a=>a.id!==e)};return nt(s),Q()}function du(){if(!u.user)return{error:"signin"};const t=Q();if(t.challenge&&t.challenge.status==="active")return{error:"already_active",shareEarn:t};const s=ds().code,a=Date.now(),i={id:Gt("ch"),startedAt:a,endsAt:a+24*60*60*1e3,adTitle:"DatBoiSkeet · Long Story Short & Ladies Only",caption:"🔥 Join me on DBS — music, live, vault & more. Long Story Short + Ladies Only Coming Soon. #DBS #PaidPartnership #ad",trackedLink:`https://dbs.app/s/${s}?utm=share24`,status:"active",disclosure:"Incentivized promotion · disclose #ad / Paid partnership"};return nt({...t,challenge:i,submissions:[],rewardsClaimed:(t.rewardsClaimed||[]).filter(n=>n.challengeId!==i.id)}),{ok:!0,challenge:i,shareEarn:Q()}}function pu(){const e=Q();if(!e.challenge||e.challenge.status!=="active")return{error:"no_active"};const t={...e.challenge,startedAt:Date.now()-25*60*60*1e3,endsAt:Date.now()-1*60*60*1e3,simulatedElapsed:!0};return nt({...e,challenge:t}),{ok:!0,challenge:t,shareEarn:Q()}}function uu(){const e=Q();if(!e.challenge)return{error:"none"};const t={...e.challenge,status:"ended",endedAt:Date.now()};return nt({...e,challenge:t}),{ok:!0,challenge:t,shareEarn:Q()}}function mu({platform:e,postUrl:t=""}={}){if(!u.user)return{error:"signin"};const a=Q();if(!a.challenge||a.challenge.status!=="active")return{error:"no_challenge"};const i=String(e||"").toLowerCase().trim();if(!An.includes(i))return{error:"bad_platform"};const n=String(t||"").trim().slice(0,400);if(!n)return{error:"required"};if((a.submissions||[]).some(c=>c.platform===i&&(c.status==="pending"||c.status==="verified")))return{error:"duplicate",shareEarn:a};const o={id:Gt("sub"),platform:i,postUrl:n,submittedAt:Date.now(),status:"pending",note:"Awaiting 24h continuous visibility check (manual/demo)"};return nt({...a,submissions:[o,...a.submissions||[]]}),{ok:!0,submission:o,shareEarn:Q()}}function or(e,t,{note:s=""}={}){if(!["pending","verified","rejected"].includes(t))return{error:"bad_status"};const a=Q();let i=null;const n=(a.submissions||[]).map(r=>r.id!==e?r:(i={...r,status:t,verifiedAt:t==="verified"?Date.now():r.verifiedAt||null,note:s||(t==="verified"?"Demo verified · 24h visibility assumed (manual)":t==="rejected"?"Rejected · ineligible / deleted / unverified":r.note)},i));return i?(nt({...a,submissions:n}),{ok:!0,submission:i,shareEarn:Q()}):{error:"not_found"}}function il(){const e=Q();return new Set((e.submissions||[]).filter(s=>s.status==="verified").map(s=>s.platform)).size}function nl(){const e=Q(),t=il(),s=(e.platformsLinked||[]).length,a=new Set((e.rewardsClaimed||[]).map(i=>i.tierId));return Qo.filter(i=>{if(a.has(i.id)||t<i.minVerified)return!1;if(i.requireAllLinked){if(s<3)return!1;const n=new Set((e.platformsLinked||[]).map(o=>o.platform)),r=new Set((e.submissions||[]).filter(o=>o.status==="verified").map(o=>o.platform));for(const o of n)if(!r.has(o))return!1}return!0}).map(i=>({...i,verifiedCount:t,linkedCount:s}))}function hu(e){var r;if(!u.user)return{error:"signin"};const a=nl().find(o=>o.id===e);if(!a)return{error:"not_claimable"};const i=Q(),n={id:Gt("srw"),tierId:a.id,label:a.label,kind:a.kind,at:Date.now(),challengeId:((r=i.challenge)==null?void 0:r.id)||null,testMode:!0};return a.membership&&Ga(a.membership,!0),nt({...i,rewardsClaimed:[n,...i.rewardsClaimed||[]]}),{ok:!0,claim:n,shareEarn:Q(),membership:Kt()}}function gu(){return nt(Zo()),Q()}function Me(){return sl(u.referEarn)}function fu(){return Xo.map(e=>({...e}))}function ds(){const e=u.user,t=Me();if(t.code)return t;const s=al(e);return wt({...t,code:s})}function rl(){return`https://dbs.app/r/${ds().code}`}function vu({username:e=""}={}){const t=u.user;if(!t)return{error:"signin"};const s=ds(),a=String(e||"").trim().slice(0,24)||"Invitee"+(s.invitees.length+1);if(a.toLowerCase()===String(t.username||"").toLowerCase())return{error:"self_referral"};const i={id:Gt("inv"),username:a,signedUpAt:Date.now(),activeDays:[],status:"pending",welcomeClaimed:!1,flaggedFraud:!1};return wt({...s,invitees:[i,...s.invitees||[]]}),{ok:!0,invitee:i,referEarn:Me()}}function bu(e){const t=Me();let s=null;const a=(t.invitees||[]).map(i=>i.id!==e?i:i.flaggedFraud?(s={error:"fraud",invitee:i},i):(s={...i,welcomeClaimed:!0,welcomeAt:Date.now()},s));return s?s.error?s:(wt({...t,invitees:a}),{ok:!0,invitee:s,perk:"Welcome badge / profile decoration (TEST MODE)"}):{error:"not_found"}}function yu(e,{day:t=null}={}){const s=Me();let a=null;const i=(s.invitees||[]).map(n=>{if(n.id!==e)return n;if(n.flaggedFraud)return a={error:"fraud",invitee:n},n;const r=Number(n.signedUpAt)||Date.now(),o=r+7*864e5;let c=t;if(!c){const h=new Set(n.activeDays||[]);let f=null;for(let v=0;v<7;v++){const b=Ms(r+v*864e5);if(!h.has(b)){f=b;break}}if(!f)return a={error:"window_full",invitee:n},n;c=f}const d=Date.parse(c+"T12:00:00Z");if(!Number.isFinite(d)||d<r-864e5||d>o)return a={error:"outside_window",invitee:n},n;const p=Array.from(new Set([...n.activeDays||[],c])).sort();let m=n.status;return p.length>=3&&(m="active"),a={...n,activeDays:p,status:m},a});return a?a.error?a:(wt({...s,invitees:i}),{ok:!0,invitee:a,referEarn:Me()}):{error:"not_found"}}function lr(e,t=!0){const s=Me();let a=null;const i=(s.invitees||[]).map(n=>{var r;return n.id!==e?n:(a={...n,flaggedFraud:!!t,status:t?"fraud":((r=n.activeDays)==null?void 0:r.length)>=3?"active":"pending"},a)});return a?(wt({...s,invitees:i}),{ok:!0,invitee:a,referEarn:Me()}):{error:"not_found"}}function ol(){return(Me().invitees||[]).filter(t=>t.status==="active"&&!t.flaggedFraud).length}function ll(){const e=Me(),t=ol(),s=new Set((e.milestonesClaimed||[]).map(a=>a.milestoneId));return Xo.filter(a=>t>=a.n&&!s.has(a.id)).map(a=>({...a,activeCount:t}))}function ku(e){if(!u.user)return{error:"signin"};const a=ll().find(r=>r.id===e);if(!a)return{error:"not_claimable"};const i=Me(),n={id:Gt("rmw"),milestoneId:a.id,n:a.n,label:a.label,kind:a.kind,at:Date.now(),testMode:!0,note:"Distinct from Clippers commissions · TEST MODE · no real billing"};return a.membership&&Ga(a.membership,!0),wt({...i,milestonesClaimed:[n,...i.milestonesClaimed||[]]}),{ok:!0,claim:n,referEarn:Me(),membership:Kt()}}function Su(){const e=u.user;return wt({...el(),code:al(e)}),Me()}function wu({force:e=!1}={}){if(!u.user)return{error:"signin"};const s=ds();if(!e&&(s.invitees||[]).length>0)return{error:"already_seeded",referEarn:s};const a=Date.now(),i=864e5,n=[{id:"inv_demo_a",username:"NovaFan",signedUpAt:a-5*i,activeDays:[Ms(a-5*i),Ms(a-4*i),Ms(a-3*i)],status:"active",welcomeClaimed:!0,flaggedFraud:!1},{id:"inv_demo_b",username:"ClipCurious",signedUpAt:a-2*i,activeDays:[Ms(a-2*i)],status:"pending",welcomeClaimed:!0,flaggedFraud:!1},{id:"inv_demo_c",username:"BottyMcBot",signedUpAt:a-6*i,activeDays:[],status:"fraud",welcomeClaimed:!1,flaggedFraud:!0}];return wt({...s,invitees:n,milestonesClaimed:s.milestonesClaimed||[]}),{ok:!0,seeded:n.length,referEarn:Me()}}const ti=[{id:"youtube",label:"YouTube",color:"#ff4444",hint:"YouTube Live / Studio"},{id:"tiktok",label:"TikTok",color:"#69c9d0",hint:"TikTok LIVE"},{id:"twitch",label:"Twitch",color:"#9146ff",hint:"Twitch Dashboard"},{id:"facebook",label:"Facebook",color:"#1877f2",hint:"Facebook Live"},{id:"instagram",label:"Instagram",color:"#e1306c",hint:"IG Live (demo)"},{id:"kick",label:"Kick",color:"#53fc18",hint:"Kick Studio"},{id:"custom_rtmp",label:"Custom RTMP",color:"#ffb020",hint:"Any RTMP endpoint"}],$u=()=>({freeMaxDestinations:2,houseUnlimited:!0,houseUserIds:["dbs"],tiers:{bronze:{id:"bronze",label:"Bronze",price:4.99,maxDestinations:3,placement:!1,badge:"Bronze Streamer",perks:["3 destination slots","Campaign badge on Go Live"]},silver:{id:"silver",label:"Silver",price:9.99,maxDestinations:5,placement:!0,badge:"Silver Streamer",perks:["5 destination slots","Campaign badge","Explore / Live placement flag"]},gold:{id:"gold",label:"Gold",price:19.99,maxDestinations:7,placement:!0,badge:"Gold Streamer",perks:["All 7 destinations","Campaign badge","Priority Explore / Live placement"]}}});function ya(){return{platforms:{},selected:[],session:null,history:[],ingest:null,campaign:{tier:null,status:"none",enrolledAt:null,cancelledAt:null},campaignConfig:null}}function si(){const e=u.restream||ya();return{...ya(),...e,platforms:e.platforms&&typeof e.platforms=="object"?e.platforms:{},selected:Array.isArray(e.selected)?e.selected:[],history:Array.isArray(e.history)?e.history:[],campaign:{...ya().campaign,...e.campaign||{}}}}function ps(e){return u={...u,restream:e},C(u),u.restream}function Eu(e){var s,a;if((s=e.ingest)!=null&&s.rtmpUrl&&((a=e.ingest)!=null&&a.streamKey))return e;const t="dbs_demo_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,10);return{...e,ingest:{rtmpUrl:"rtmp://ingest.dbs.local/live",streamKey:t,rotatedAt:Date.now(),note:"TEST MODE demo key · not a real media server"}}}function $t(){let e=si();const t=e.ingest;return e=Eu(e),e.ingest!==t&&ps(e),e}function cl(){const e=$t();return ti.map(t=>{const s=e.platforms[t.id]||{};return{...t,connected:!!s.connected,connectedAt:s.connectedAt||null,handle:s.handle||"",lastError:s.lastError||null,enabled:s.enabled!==!1}})}function xu(e,t=""){const s=ti.find(n=>n.id===e);if(!s)return{error:"unknown_platform"};const a=$t(),i={...a.platforms,[e]:{id:e,connected:!0,connectedAt:Date.now(),handle:String(t||s.label+" Demo").slice(0,40),lastError:null,enabled:!0}};return ps({...a,platforms:i}),{ok:!0,platform:cl().find(n=>n.id===e)}}function Au(e){var n;const t=$t();if(!((n=t.platforms[e])!=null&&n.connected))return{error:"not_connected"};const s={...t.platforms,[e]:{...t.platforms[e],connected:!1,disconnectedAt:Date.now(),lastError:null}},a=(t.selected||[]).filter(r=>r!==e);let i=t.session;return i&&!i.endedAt&&(i={...i,destinations:(i.destinations||[]).map(r=>r.id===e?{...r,status:"disconnected",health:"error"}:r)}),ps({...t,platforms:s,selected:a,session:i}),{ok:!0}}function Cu(e){const t=$t(),s=new Set(Object.values(t.platforms).filter(i=>i.connected).map(i=>i.id)),a=(Array.isArray(e)?e:[]).filter(i=>s.has(i)).slice(0,7);return ps({...t,selected:a}),{ok:!0,selected:a}}function Tu(e){var a;const t=$t();if(!((a=t.platforms[e])!=null&&a.connected))return{error:"not_connected"};const s=new Set(t.selected||[]);return s.has(e)?s.delete(e):s.add(e),Cu([...s])}function dl(){var a,i,n;const e=si(),t=$u(),s=e.campaignConfig||{};return{...t,...s,tiers:{...t.tiers,...s.tiers||{},bronze:{...t.tiers.bronze,...((a=s.tiers)==null?void 0:a.bronze)||{}},silver:{...t.tiers.silver,...((i=s.tiers)==null?void 0:i.silver)||{}},gold:{...t.tiers.gold,...((n=s.tiers)==null?void 0:n.gold)||{}}},freeMaxDestinations:Number(s.freeMaxDestinations)>0?Number(s.freeMaxDestinations):t.freeMaxDestinations,houseUnlimited:s.houseUnlimited!==!1,houseUserIds:Array.isArray(s.houseUserIds)?s.houseUserIds:t.houseUserIds}}function pl(){return{...ya().campaign,...si().campaign||{}}}function Mu(){const e=u.user;if(!e)return!1;const t=dl();return e.id==="dbs"||e.username==="DatBoiSkeet"?!0:(t.houseUserIds||[]).includes(e.id)}function ul(){const e=dl();if(Mu()&&e.houseUnlimited)return{max:ti.length,source:"house_free",tier:null};const t=pl();if(t.status==="active"&&t.tier&&e.tiers[t.tier]){const s=e.tiers[t.tier];return{max:s.maxDestinations,source:"campaign",tier:t.tier,badge:s.badge,placement:!!s.placement}}return{max:e.freeMaxDestinations,source:"free_baseline",tier:null,badge:null,placement:!1}}function Du(){const e=u.user;if(!e)return{error:"signin"};const t=$t();if(t.session&&!t.session.endedAt)return{error:"already_live"};const s=Object.values(t.platforms).filter(c=>c.connected).map(c=>c.id);if(!s.length)return{error:"no_platforms"};let a=(t.selected||[]).filter(c=>s.includes(c));if(!a.length)return{error:"none_selected"};const i=ul();if(a.length>i.max)return{error:"over_cap",max:i.max,selected:a.length,source:i.source};const n=a.map((c,d)=>{const p=ti.find(h=>h.id===c),m=d===a.length-1&&a.length>2?"connecting":"streaming";return{id:c,label:(p==null?void 0:p.label)||c,status:m==="connecting"?"connecting":"streaming",health:m,startedAt:Date.now()}}),r=pl(),o={id:Gt("rs"),hostId:e.id,hostName:e.username,startedAt:Date.now(),destinations:n,selected:a.slice(),campaignTier:r.status==="active"?r.tier:null,campaignBadge:i.badge||null,placement:!!i.placement,testMode:!0,endedAt:null};return ps({...t,session:o,selected:a}),{ok:!0,session:o}}function Pu(){const e=$t();if(!e.session||e.session.endedAt)return{error:"offline"};const t={...e.session,endedAt:Date.now(),destinations:(e.session.destinations||[]).map(a=>({...a,status:a.health==="error"?"error":"ended",health:a.health==="error"?"error":"ended"}))},s=[t,...e.history||[]].slice(0,20);return ps({...e,session:null,history:s}),{ok:!0,session:t,history:s}}function Lu(){const e=si().session;return e&&!e.endedAt?e:null}function ml(){const e=P().connectPrefs||{};return{ageConfirmed:!!e.ageConfirmed,rulesAccepted:!!e.rulesAccepted}}function cr(e={}){const t={...ml(),...e};return t.ageConfirmed||(t.rulesAccepted=!1),gd(s=>({...s,connectPrefs:t})),t}const hl=[{id:"day_one",name:"Day One",blurb:"Joined the Loyalty Club — recognition starts with showing up, not spending.",need:0,kind:"join"},{id:"listener",name:"Listener",blurb:"Logged authorized listening (demo tick). Not purchase-only.",need:1,kind:"listen"},{id:"live_attendee",name:"Live Regular",blurb:"Attended a livestream (demo stub). Healthy participation.",need:1,kind:"live"},{id:"club_member",name:"Club Member",blurb:"Joined a Fan Club discussion community.",need:1,kind:"club"},{id:"helper",name:"Helper",blurb:"Community-helper milestone (welcome tip / guidelines share demo).",need:1,kind:"help"},{id:"top_fan",name:"Top Fan",blurb:"Earned 50+ loyalty points from mixed healthy actions — gifts alone do not unlock this.",needPoints:50}];function gl(e=Date.now()){return new Date(e).toISOString().slice(0,10)}function Xs(){const e=u.loyalty||{};return{points:Number(e.points)||0,history:Array.isArray(e.history)?e.history:[],badges:Array.isArray(e.badges)?e.badges:[],publicVisible:e.publicVisible!==!1,lastActionAt:e.lastActionAt&&typeof e.lastActionAt=="object"?e.lastActionAt:{},dayCounts:e.dayCounts&&typeof e.dayCounts=="object"?e.dayCounts:{}}}function Cn(e){u={...u,loyalty:e},C(u)}function Iu(){return"loy_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function Ou(e,{cooldownMs:t=8e3,dailyCap:s=8}={}){const a=Xs(),i=Date.now(),n=Number(a.lastActionAt[e])||0;if(i-n<t)return{ok:!1,reason:"cooldown"};const r=gl(i);return((a.dayCounts[r]||{})[e]||0)>=s?{ok:!1,reason:"daily_cap"}:{ok:!0}}function _u(e){const t=new Set(e.badges||[]),s={};return(e.history||[]).forEach(a=>{s[a.kind]=(s[a.kind]||0)+1}),hl.forEach(a=>{if(!t.has(a.id)){if(a.needPoints!=null){e.points>=a.needPoints&&t.add(a.id);return}if(a.id==="day_one"){((e.history||[]).length>0||e.points>0)&&t.add(a.id);return}(s[a.kind]||0)>=(a.need||1)&&t.add(a.id)}}),[...t]}function Zs(){return Xs()}function qu(e){const t=Xs();return Cn({...t,publicVisible:!!e}),Zs()}function Nu(e,{points:t=5,note:s=""}={}){if(!u.user)return{error:"signin"};const i=Ou(e);if(!i.ok)return{error:i.reason};const n=Xs(),r=Date.now(),o=gl(r),c={...n.dayCounts,[o]:{...n.dayCounts[o]||{},[e]:((n.dayCounts[o]||{})[e]||0)+1}},d={id:Iu(),at:r,kind:e,points:t,note:String(s||e).slice(0,120)},p={...n,points:n.points+t,history:[d,...n.history].slice(0,80),lastActionAt:{...n.lastActionAt,[e]:r},dayCounts:c};return p.badges.includes("day_one")||(p.history=p.history),p.badges=_u(p),p.badges.includes("day_one")||(p.badges=["day_one",...p.badges]),Cn(p),{ok:!0,loyalty:Zs(),entry:d,newBadges:p.badges.filter(m=>!(n.badges||[]).includes(m))}}function fl(){const e=Zs(),t=new Set(e.badges||[]);return hl.map(s=>({...s,unlocked:t.has(s.id)}))}function Ru(){return Cn({points:0,history:[],badges:[],publicVisible:!0,lastActionAt:{},dayCounts:{}}),Zs()}function Ut(){const e=u.openMic||{};return{applications:Array.isArray(e.applications)?e.applications:[],seeded:!!e.seeded,houseIndex:typeof e.houseIndex=="number"?e.houseIndex:0}}function ai(e){u={...u,openMic:e},C(u)}function Bu(){return"om_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function us({force:e=!1}={}){const t=Ut();if(t.seeded&&!e&&t.applications.length>0)return{skipped:!0,applications:t.applications};const s=Date.now(),a=864e5,i=[{id:"om_demo_approved",userId:"u_ria",username:"RiaLoops",talent:"producer",trackTitle:"Midnight Pads (demo)",profileNote:"Beatmaker · looking to collab on LSS energy",rightsCertified:!0,status:"approved",at:s-10*a,reviewedAt:s-9*a},{id:"om_demo_pending",userId:"u_dez",username:"DezOnMic",talent:"rapper",trackTitle:"Porch Light Freestyle",profileNote:"Opt-in showcase · not pay-to-win",rightsCertified:!0,status:"pending",at:s-2*a},{id:"om_demo_rejected",userId:"u_spam",username:"SpamBeats",talent:"dj",trackTitle:"Untitled drop",profileNote:"No rights cert honesty",rightsCertified:!1,status:"rejected",at:s-5*a,reviewedAt:s-4*a,reviewNote:"Rights certification required"}],n=typeof t.houseIndex=="number"?t.houseIndex:0;return ai({applications:i,seeded:!0,houseIndex:n}),{seeded:i.length,applications:i}}function Ki({status:e=null}={}){us();let t=Ut().applications.slice();return e&&(t=t.filter(s=>s.status===e)),t.sort((s,a)=>(a.at||0)-(s.at||0))}function Ku(){return Ki({status:"approved"})}function ju(){const e=Ut();return Rt(typeof e.houseIndex=="number"?e.houseIndex:0)}function Fu(){const e=Ut(),t=((typeof e.houseIndex=="number"?e.houseIndex:0)+1)%Go();return ai({...e,houseIndex:t}),Rt(t)}function Gu({talent:e="rapper",trackTitle:t="",profileNote:s="",rightsCertified:a=!1}={}){const i=u.user;if(!i)return{error:"signin"};if(!a)return{error:"rights"};const n=String(t||"").trim().slice(0,80);if(!n)return{error:"title"};us();const r=Ut();if(r.applications.some(c=>c.userId===i.id&&c.status==="pending"))return{error:"pending"};const o={id:Bu(),userId:i.id,username:i.username,talent:String(e||"other").slice(0,32),trackTitle:n,profileNote:String(s||"").trim().slice(0,240),rightsCertified:!0,status:"pending",at:Date.now()};return ai({...r,applications:[o,...r.applications],seeded:!0}),{ok:!0,application:o}}function ji(e,t,s=""){if(!ae())return{error:"admin"};if(!["pending","approved","rejected"].includes(t))return{error:"status"};const i=Ut();let n=null;const r=i.applications.map(o=>o.id!==e?o:(n={...o,status:t,reviewedAt:Date.now(),reviewNote:String(s||"").slice(0,160)},n));return n?(ai({...i,applications:r}),{ok:!0,application:n}):{error:"missing"}}function Uu(){var w,x;us(),Je();try{ea(),ze()}catch{}const e=Ut().applications||[],t={pending:0,approved:0,rejected:0};e.forEach(S=>{const T=S.status||"pending";t[T]!==void 0?t[T]+=1:t.pending+=1});const s=e.filter(S=>S.status==="pending").sort((S,T)=>(T.at||0)-(S.at||0)),a=Ye().clubs.slice().sort((S,T)=>(T.createdAt||0)-(S.createdAt||0)),i=a.slice(0,5).map(S=>({id:S.id,name:S.name,privacy:S.privacy,official:!!S.official,memberCount:S.memberCount||(S.members||[]).length||0,createdAt:S.createdAt||0})),n=Xs(),o=fl().filter(S=>S.unlocked),c=St(),d=fn();let p=0,m=0,h=0,f=0,v=0;d.forEach(S=>{p=q(p+(S.gross||0)),m=q(m+(S.fees||0)),h=q(h+(S.creatorShare||0)),f=q(f+(S.dbsShare||0)),v+=S.count||0});const b=u.wallet||{balance:0},y=u.catalog||[],k=ko();return{openMic:{total:e.length,byStatus:t,pending:s},fanClubs:{total:a.length,recent:i},loyalty:{points:n.points||0,badgeCount:o.length,badges:o.map(S=>S.name||S.id),publicVisible:n.publicVisible!==!1,historyCount:(n.history||[]).length,note:"Device-local loyalty for signed-in user · not a multi-fan leaderboard"},revenue:{demo:!0,chip:"demo figures · not production",gross:p,fees:m,creatorShare:h,dbsShare:f,earnCount:v,creatorAvailable:q(c.available||0),creatorHolds:q(c.holds||0),fanWalletBalance:Number(b.balance)||0,byCategory:d.filter(S=>S.count>0),catalogPublished:y.filter(S=>S.published).length,catalogTotal:y.length},moderation:{warnings:[],suspensions:[],note:"Stub · Content Polish owns Guidelines copy"},hotFeed:{openAlerts:(u.engagementAlerts||[]).filter(S=>!S.handledAt).length,totalAlerts:(u.engagementAlerts||[]).length,hotPosts:Array.isArray((w=u.hotFeed)==null?void 0:w.posts)?u.hotFeed.posts.length:0,hotLives:Array.isArray((x=u.hotFeed)==null?void 0:x.lives)?u.hotFeed.lives.length:0,note:"§38 · Build posts + Live Social lives"},stats:k}}const Hu={frames:"frame",effects:"effect",banners:"banner","name styles":"nameStyle",badges:"badge"},dr=["frame-rodeo-gold","fx-snowfall","ban-skyline","name-neon","badge-dayone"];function Vu(e){const t=e&&typeof e=="object"?e:{},s={};return["frame","effect","banner","nameStyle","badge"].forEach(a=>{typeof t[a]=="string"&&t[a]&&(s[a]=t[a])}),s}function ms(){const e=u.profileShop||{};return{owned:Array.isArray(e.owned)?[...new Set(e.owned.map(String))]:[],equipped:Vu(e.equipped),reduceMotion:!!e.reduceMotion}}function hs(e){u={...u,profileShop:e},C(u)}function bt(){return ms()}function vl(e){return e&&Hu[e.category]||null}function zu(e){const t=String(e||"");if(!t)return{error:"missing"};const s=ms();return s.owned.includes(t)?{ok:!0,already:!0,shop:bt()}:(hs({...s,owned:[...s.owned,t]}),{ok:!0,shop:bt()})}function Wu(){const e=ms(),t=new Set(e.owned);return dr.forEach(s=>t.add(s)),hs({...e,owned:[...t]}),{ok:!0,unlocked:dr,shop:bt()}}function Yu(e){const t=String(e||"");return t.startsWith("frame-")?"frame":t.startsWith("fx-")?"effect":t.startsWith("ban-")?"banner":t.startsWith("name-")?"nameStyle":t.startsWith("badge-")?"badge":null}function Ju(e){const t=String(e||""),s=ms();if(!s.owned.includes(t))return{error:"not_owned"};const a=Yu(t);if(!a)return{error:"unknown_item"};const i={...s.equipped,[a]:t};return hs({...s,equipped:i}),{ok:!0,slot:a,shop:bt()}}function Qu(e){const t=String(e||"");if(!["frame","effect","banner","nameStyle","badge"].includes(t))return{error:"bad_slot"};const s=ms(),a={...s.equipped};return delete a[t],hs({...s,equipped:a}),{ok:!0,shop:bt()}}function Xu(e){const t=ms();return hs({...t,reduceMotion:!!e}),bt()}function Zu(){return hs({owned:[],equipped:{},reduceMotion:!1}),bt()}const em=5,tm=8,sm=[{id:"hp_maya_1",userId:"maya",username:"MayaBeats",text:"Studio loop dropping later — who wants the stem pack? 🔥",image:"/music/01_Long_Story_Short_Coming_Soon.jpg",mediaType:"image",atOffset:36e5*5,likeUsers:["dbs","fanjay","u_seed_a","u_seed_b","u_seed_c","u_seed_d","clipqueen"],comments:[{id:"hc_m1",userId:"fanjay",username:"FanJay",text:"Send it 🙌"},{id:"hc_m2",userId:"dbs",username:"DatBoiSkeet",text:"Pull up on Spotlight"},{id:"hc_m3",userId:"clipqueen",username:"ClipQueen",text:"Stem pack please"}],shares:5},{id:"hp_jay_1",userId:"fanjay",username:"FanJay",text:"Foreign X-Change fit check from the community — buffalo energy.",image:"/merch/03_blue_buffalo_jacket.jpeg",mediaType:"image",atOffset:36e5*8,likeUsers:["maya","dbs","u_seed_a","u_seed_c","u_seed_d","clipqueen","u_seed_b"],comments:[{id:"hc_j1",userId:"maya",username:"MayaBeats",text:"Jacket hits"},{id:"hc_j2",userId:"clipqueen",username:"ClipQueen",text:"Need this"}],shares:6},{id:"hp_clip_1",userId:"clipqueen",username:"ClipQueen",text:"New clip cut from last Live — tag @DatBoiSkeet if you remix 🎬",image:"/merch/06_black_ptsd_tee.jpeg",mediaType:"video",atOffset:36e5*12,likeUsers:["dbs","maya","fanjay","u_seed_a","u_seed_b","u_seed_c"],comments:[{id:"hc_c1",userId:"dbs",username:"DatBoiSkeet",text:"Clean edit"},{id:"hc_c2",userId:"maya",username:"MayaBeats",text:"Clipping goals"},{id:"hc_c3",userId:"fanjay",username:"FanJay",text:"Saved"},{id:"hc_c4",userId:"u_seed_a",username:"FanA",text:"Fire"}],shares:4},{id:"hp_dbs_boost",userId:"dbs",username:"DatBoiSkeet",text:"Community shoutout — Maya + Jay keeping the feed hot. Keep posting.",image:"/music/02_Ladies_Only_Coming_Soon.jpg",mediaType:"image",atOffset:36e5*3,likeUsers:["maya","fanjay","u_seed_a"],comments:[{id:"hc_d1",userId:"maya",username:"MayaBeats",text:"Grateful 💛"},{id:"hc_d2",userId:"fanjay",username:"FanJay",text:"Lets go"}],shares:2}];function Be(){const e=u.hotFeed||{};return{lives:Array.isArray(e.lives)?e.lives:[],posts:Array.isArray(e.posts)?e.posts:[],seededLives:!!e.seededLives,seededPosts:!!e.seededPosts,seededPostsVer:Number(e.seededPostsVer)||0}}function bl(e){u={...u,hotFeed:e},C(u)}function am(){const e={...u.profiles};let t=!1;const s=(a,i,n)=>{e[a]||(e[a]={id:a,username:i,bio:n,avatar:"",followers:[],following:["dbs"],verified:!1},t=!0)};s("maya","MayaBeats","Creator · beats & live demos"),s("fanjay","FanJay","Day-one fan · playlist curator"),s("clipqueen","ClipQueen","Clipper · community edits"),t&&(u={...u,profiles:e})}function ea(){vo(),am();const e=Be(),t=Number(e.seededPostsVer)||0;if(e.seededPosts&&t>=2)return Be();if(e.seededPosts&&t<2){const c={...u.likes||{}},d={...u.comments||{}},p={...u.postShares||{}},m=(h,f,v,b)=>{c[h]=[...new Set([...c[h]||[],...f])];const y=new Set((d[h]||[]).map(w=>w.id)),k=[...d[h]||[]];(v||[]).forEach(w=>{y.has(w.id)||k.push({...w,at:w.at||Date.now()})}),d[h]=k,p[h]=Math.max(Number(p[h]||0),b)};return m("hp_maya_1",["dbs","fanjay","u_seed_a","u_seed_b","u_seed_c","u_seed_d","clipqueen"],[{id:"hc_m3",userId:"clipqueen",username:"ClipQueen",text:"Stem pack please"}],5),m("hp_jay_1",["maya","dbs","u_seed_a","u_seed_c","u_seed_d","clipqueen","u_seed_b"],[{id:"hc_j2",userId:"clipqueen",username:"ClipQueen",text:"Need this"}],6),m("hp_clip_1",["dbs","maya","fanjay","u_seed_a","u_seed_b","u_seed_c"],[{id:"hc_c4",userId:"u_seed_a",username:"FanA",text:"Fire"}],4),c.hp_dbs_boost&&(c.hp_dbs_boost=(c.hp_dbs_boost||[]).slice(0,3),p.hp_dbs_boost=Math.min(Number(p.hp_dbs_boost||0),2)),u={...u,likes:c,comments:d,postShares:p,hotFeed:{...e,seededPosts:!0,seededPostsVer:2}},C(u),ze(),Be()}const s=new Set((u.posts||[]).map(c=>c.id)),a=[...u.posts||[]],i={...u.likes||{}},n={...u.comments||{}},r={...u.postShares||{}},o=Date.now();return sm.forEach(c=>{s.has(c.id)||(a.unshift({id:c.id,userId:c.userId,username:c.username,text:c.text,image:c.image||"",mediaType:c.mediaType||(c.image?"image":"text"),at:o-(c.atOffset||0),house:c.userId==="dbs"}),i[c.id]=[...c.likeUsers||[]],n[c.id]=(c.comments||[]).map(d=>({...d,text:d.text,at:o-(c.atOffset||0)+6e4})),c.shares&&(r[c.id]=c.shares))}),i.p1&&i.p1.length<3&&(i.p1=[...new Set([...i.p1||[],"maya","fanjay","u_seed_a"])]),i.p2&&i.p2.length<2&&(i.p2=[...new Set([...i.p2||[],"maya","fanjay"])]),(!n.p1||n.p1.length<2)&&(n.p1=[...n.p1||[],{id:"hc_p1a",userId:"maya",username:"MayaBeats",text:"Cover art goes crazy",at:o-8e7},{id:"hc_p1b",userId:"fanjay",username:"FanJay",text:"Been waiting on this",at:o-7e7}]),r.p1=Math.max(r.p1||0,2),r.p2=Math.max(r.p2||0,1),u={...u,posts:a,likes:i,comments:n,postShares:r,hotFeed:{...e,seededPosts:!0,seededPostsVer:2}},C(u),ze(),Be()}function ii(e){const t=u.likes&&u.likes[e]||[],s=u.comments&&u.comments[e]||[],a=u.postShares&&u.postShares[e]||0;return t.length+s.length+Number(a||0)}function ze(){const e=Be(),s=(u.posts||[]).map(o=>{const c=(u.likes&&u.likes[o.id]||[]).length,d=(u.comments&&u.comments[o.id]||[]).length,p=Number(u.postShares&&u.postShares[o.id]||0),m=c+d+p;return{id:o.id,postId:o.id,score:m,likes:c,comments:d,shares:p,username:o.username,userId:o.userId,preview:(o.text||"").slice(0,120),text:o.text||"",image:o.image||"",mediaType:o.mediaType||(o.image?"image":"text"),at:o.at||0,house:o.userId==="dbs"||!!o.house}}).filter(o=>o.score>=em).sort((o,c)=>c.score-o.score||c.at-o.at).slice(0,tm),a=new Set((e.posts||[]).map(o=>o.postId||o.id)),i=Array.isArray(u.engagementAlerts)?[...u.engagementAlerts]:[],n=new Set(i.filter(o=>o.kind==="post").map(o=>o.refId));s.forEach(o=>{n.has(o.id)||a.has(o.id)&&e.posts.length||(i.unshift({id:"ea_post_"+o.id+"_"+Date.now().toString(36),kind:"post",refId:o.id,title:(o.preview||o.text||"Hot post").slice(0,80),username:o.username,score:o.score,mediaType:o.mediaType||"text",at:Date.now(),handledAt:null,handledNote:null}),n.add(o.id))});const r=i.slice(0,60);return u={...u,hotFeed:{lives:e.lives,seededLives:e.seededLives,posts:s,seededPosts:e.seededPosts||s.length>0,seededPostsVer:Number(e.seededPostsVer)||0},engagementAlerts:r},C(u),Be()}function yl(e=8){return ea(),Be().posts.length||ze(),(Be().posts||[]).slice(0,Math.max(1,Number(e)||8))}function kl(e){const t=String(e||"");if(!t)return{error:"missing"};if(!(u.posts||[]).find(i=>i.id===t))return{error:"missing"};const a={...u.postShares||{}};return a[t]=Number(a[t]||0)+1,u={...u,postShares:a},C(u),ze(),{ok:!0,shares:a[t],score:ii(t)}}function im(e){const t=e||{},s=t.kind==="live"?"live":"post",a=String(t.refId||t.id||"");if(!a)return{error:"missing"};const i=Array.isArray(u.engagementAlerts)?[...u.engagementAlerts]:[],n=i.find(o=>o.kind===s&&o.refId===a&&!o.handledAt);if(n)return{ok:!0,alert:n,deduped:!0};const r={id:t.id||"ea_"+s+"_"+a+"_"+Date.now().toString(36),kind:s,refId:a,title:String(t.title||"Hot item").slice(0,120),username:String(t.username||""),score:Number(t.score)||0,viewers:t.viewers!=null?Number(t.viewers):void 0,gifts:t.gifts!=null?Number(t.gifts):void 0,mediaType:t.mediaType||(s==="live"?"live":"text"),at:t.at||Date.now(),handledAt:t.handledAt||null,handledNote:t.handledNote||null};return u={...u,engagementAlerts:[r,...i].slice(0,60)},C(u),{ok:!0,alert:r}}function pr({openOnly:e=!0}={}){const t=Array.isArray(u.engagementAlerts)?u.engagementAlerts:[];return(e?t.filter(a=>!a.handledAt):t.slice()).sort((a,i)=>(i.at||0)-(a.at||0))}function ia(e,t){const s=String(e||"");if(!s)return{error:"missing"};const a=Array.isArray(u.engagementAlerts)?u.engagementAlerts:[];let i=null;const n=a.map(r=>r.id!==s?r:(i={...r,handledAt:Date.now(),handledNote:t!=null?String(t):r.handledNote||"handled"},i));return i?(u={...u,engagementAlerts:n},C(u),{ok:!0,alert:i}):{error:"missing"}}function nm(e){if(!ae())return{error:"admin"};const t=u.user;if(!t)return{error:"signin"};const s=String(e||""),a=new Set(u.likes&&u.likes[s]||[]);return a.add(t.id),u={...u,likes:{...u.likes,[s]:[...a]}},C(u),ze(),{ok:!0,count:a.size,score:ii(s)}}function rm(e,t){if(!ae())return{error:"admin"};const s=u.user;if(!s)return{error:"signin"};const a=String(e||""),i=t.trim();if(!i)return{error:"empty"};const n={id:"c_admin_"+Date.now().toString(36),userId:s.id,username:s.username,text:i,at:Date.now(),admin:!0},r=u.comments&&u.comments[a]||[];return u={...u,comments:{...u.comments,[a]:[...r,n]}},C(u),ze(),{ok:!0,comment:n,score:ii(a)}}function om(e){if(!ae())return{error:"admin"};const t=kl(e);return t.error?t:{ok:!0,shares:t.shares,link:"#/posts",score:t.score}}function Tn(e,t){return Math.max(0,Number(e)||0)+Math.max(0,Number(t)||0)*20}function Mn(e){if(!e||typeof e!="object")return null;const t=String(e.id||e.liveId||"");if(!t)return null;const s=String(e.hostId||e.userId||""),a=String(e.hostName||e.username||e.handle||"Creator"),i=Math.max(0,Number(e.viewers)||0),n=Math.max(0,Number(e.giftsTotal??e.gifts)||0),r=e.score!=null&&Number.isFinite(Number(e.score))?Number(e.score):Tn(i,n);return{id:t,hostId:s,hostName:a,title:String(e.title||"Live"),viewers:i,giftsTotal:n,house:!!e.house,example:!0,spikedAt:e.spikedAt||null,score:r}}function Sl({force:e=!1}={}){const t=Be();if(t.seededLives&&!e&&(t.lives||[]).length>0)return{skipped:!0,lives:t.lives.map(Mn).filter(Boolean)};const s=[{id:"hl_dbs_house",hostId:"dbs",hostName:"DatBoiSkeet",title:"DBS Live · Listening Session",viewers:8420,giftsTotal:186,house:!0},{id:"hl_dbs_vault",hostId:"dbs",hostName:"DatBoiSkeet",title:"Vault Drop Afterparty · House",viewers:3210,giftsTotal:94,house:!0},{id:"hl_skeetfan",hostId:"u_skeetfanatl",hostName:"SkeetFanATL",title:"ATL reacts · Long Story Short",viewers:1540,giftsTotal:42,house:!1},{id:"hl_vaultwatch",hostId:"u_vaultwatcher",hostName:"VaultWatcher",title:"Vault deep cut night",viewers:980,giftsTotal:61,house:!1},{id:"hl_fxclip",hostId:"u_fxclipper",hostName:"FXClipper",title:"Foreign X-Change clips live",viewers:2210,giftsTotal:28,house:!1},{id:"hl_nightowl",hostId:"u_nightowldbs",hostName:"NightOwlDBS",title:"Late night lounge · chill",viewers:412,giftsTotal:15,house:!1},{id:"hl_longstory",hostId:"u_longstorylistener",hostName:"LongStoryListener",title:"LSS theory hour",viewers:128,giftsTotal:7,house:!1},{id:"hl_ladies",hostId:"u_ladiesonlyfan",hostName:"LadiesOnlyFan",title:"Ladies Only countdown",viewers:67,giftsTotal:3,house:!1}].map(a=>({...a,spikedAt:null,score:Tn(a.viewers,a.giftsTotal)}));return bl({...t,lives:s,seededLives:!0}),{ok:!0,lives:s}}function gs(){return Sl(),(Be().lives||[]).map(Mn).filter(Boolean).sort((t,s)=>(s.score||0)-(t.score||0)||(s.viewers||0)-(t.viewers||0))}function lm(e){const t=String(e||"");if(!t)return{error:"missing"};Sl();const s=Be();let a=null;const i=(s.lives||[]).map(r=>{const o=Mn(r);if(!o||o.id!==t)return r;const c=o.viewers,d=o.giftsTotal,p=Tn(c,d);return a={...o,viewers:c,giftsTotal:d,score:p,spikedAt:Date.now()},a});if(!a)return{error:"missing"};bl({...s,lives:i,seededLives:!0});const n=im({kind:"live",refId:a.id,title:a.title,username:a.hostName,score:a.score,viewers:a.viewers,gifts:a.giftsTotal});return{ok:!0,live:a,alert:(n==null?void 0:n.alert)||null,deduped:!!(n!=null&&n.deduped)}}function cm(){return gs().filter(s=>s&&!s.house).sort((s,a)=>(a.score||0)-(s.score||0)||(a.viewers||0)-(s.viewers||0)).slice(0,6).map(s=>({id:s.id,hostId:s.hostId,hostName:s.hostName,title:s.title,viewers:s.viewers,giftsTotal:s.giftsTotal,house:!!s.house,score:s.score,spikedAt:s.spikedAt||null,playbacksToday:s.playbacksToday!=null?s.playbacksToday:Math.max(1,Math.round((s.viewers||0)/40))}))}function wl(){const e=new Date().toISOString().slice(0,10),s=(qt({publishedOnly:!0,types:["song"]})||[]).map(i=>{const n=Number(i.playsToday)||Number(i.playCount)||Number(i.plays)||0;let r="";return i.coverRef&&!String(i.coverRef).startsWith("idb:")&&(r=i.coverRef),{id:i.id,title:i.title||"Untitled",artist:i.artist||"DatBoiSkeet",cover:r,playsToday:n,href:"#/music",demo:!1,day:e,status:i.status||(i.published?"Published":"Catalog")}}).filter(i=>i.playsToday>0).sort((i,n)=>n.playsToday-i.playsToday||String(i.title).localeCompare(String(n.title)));return s[0]?s[0]:{id:"demo_most_played_lss",title:"Long Story Short",artist:"DatBoiSkeet",cover:"/music/01_Long_Story_Short_Coming_Soon.jpg",playsToday:900+e.split("-").reduce((i,n)=>i+Number(n),0)%400,href:"#/music",demo:!0,day:e,status:"Coming Soon"}}const $l="pikk.settings.v1",Fi=Object.freeze({notifyMessages:!0,notifyLive:!0,notifyDrops:!0,notifyPromos:!1,highContrast:!1,reduceMotion:!1,splashChime:!0,showSplash:!0}),ni=()=>{try{return globalThis.localStorage||null}catch{return null}};function ss(){var e;try{return{...Fi,...JSON.parse(((e=ni())==null?void 0:e.getItem($l))||"{}")}}catch{return{...Fi}}}function dm(e,t){var a;if(!(e in Fi))return ss();const s={...ss(),[e]:!!t};return(a=ni())==null||a.setItem($l,JSON.stringify(s)),s}function El(e=ss(),t=(s=>(s=globalThis.document)==null?void 0:s.documentElement)()){t&&(t.classList.toggle("pikk-high-contrast",!!e.highContrast),t.classList.toggle("pikk-reduce-motion",!!e.reduceMotion))}const xl="pikk.membership.v1";function Al(){var e;try{return JSON.parse(((e=ni())==null?void 0:e.getItem(xl))||"null")}catch{return null}}function pm(e){var s;if(!e||!e.id)return null;const t={id:e.id,name:e.name,price:e.price,at:Date.now(),testMode:!0};return(s=ni())==null||s.setItem(xl,JSON.stringify(t)),t}const Dn=e=>e?`${e.name} (test mode) — billing starts when Stripe is live`:"",um="0.1.0",ot=(e,t,s,a)=>`<label class="pikk-set-row"><span><strong>${l(t)}</strong>${s?`<small>${l(s)}</small>`:""}</span><input type="checkbox" class="pikk-switch" data-setting="${e}"${a[e]?" checked":""} /></label>`,Xe=(e,t,s)=>`<a class="pikk-set-row pikk-set-link" href="${e}"><span><strong>${l(t)}</strong>${s?`<small>${l(s)}</small>`:""}</span><span aria-hidden="true">→</span></a>`,Tt=(e,t,s)=>`<section class="card pikk-set-group" id="set-${e}" aria-labelledby="set-${e}-h"><h2 id="set-${e}-h">${l(t)}</h2>${s}</section>`;function Cl(){var i;const e=ss(),t=(i=P())==null?void 0:i.user,s=Al(),a=t?`<p class="pikk-set-who">Signed in as <strong>@${l(t.username)}</strong> · local demo account</p>${Xe("#/profile","Edit profile","Name, bio, avatar")}<button type="button" class="btn pikk-set-btn" id="setSignOut">Sign out</button>`:`<p class="pikk-set-who">You're not signed in.</p><a class="btn primary pikk-set-btn" href="#/profile" id="setSignIn">Sign in / Create account</a>`;return L("Settings",`
    ${Tt("account","Account",a+(s?`<p class="pikk-set-member" data-membership>${l(Dn(s))}</p>`:"")+Xe("#/pricing","Memberships","PIKK+ · Backstage · Inner Circle"))}
    ${Tt("notifications","Notifications",ot("notifyMessages","Messages","New messages and requests",e)+ot("notifyLive","Live","When creators you follow go live",e)+ot("notifyDrops","Music drops","New releases from DatBoiSkeet",e)+ot("notifyPromos","Promotions","Offers and PIKK news",e)+'<p class="muted pikk-set-note">Preferences only — push notifications arrive once the PIKK backend is live.</p>')}
    ${Tt("privacy","Privacy",Xe("#/crew","PIKK Crew","Who sees your Crew stories")+Xe("#/favorites","Favorites","People who rank first in your feeds")+Xe("#/guidelines","Community guidelines","")+Xe("#/privacy","Privacy","Draft — pending legal review")+Xe("#/terms?s=security","Security &amp; data breach","Terms · draft"))}
    ${Tt("appearance","Appearance",ot("highContrast","High contrast","Brighter text and borders",e)+ot("reduceMotion","Reduce motion","Fewer animations",e))}
    ${Tt("sound","Sound & splash",ot("splashChime","Splash chime","Tuning-fork chime when PIKK opens",e)+ot("showSplash","Show opening splash","3-second PIKK logo on launch",e))}
    ${Tt("more","Payments & help",Xe("#/payments","Payments","Donate, coins, wallet, memberships")+Xe("#/support","Support","Help & tickets"))}
    ${Tt("about","About",`<p class="pikk-set-about">PIKK Network · version <strong data-version>${um}</strong> · TEST MODE</p><p class="muted pikk-set-note">Settings are saved only on this device until PIKK accounts are live.</p>`)}
  `,{badge:"TEST MODE"})}function Tl(e=document.getElementById("app")){var t;e==null||e.querySelectorAll("[data-setting]").forEach(s=>s.addEventListener("change",()=>{const a=dm(s.dataset.setting,s.checked);El(a),g("Saved on this device")})),(t=e==null?void 0:e.querySelector("#setSignOut"))==null||t.addEventListener("click",()=>{bo(),g("Signed out"),e.innerHTML=Cl(),Tl(e)})}const mm=5e3,hm=500,gm=800,Ml="pikk.contest.twerk.age18",Dl=()=>{try{return globalThis.localStorage||null}catch{return null}},fm=()=>{var e;return((e=Dl())==null?void 0:e.getItem(Ml))==="yes"};function vm(){var e;(e=Dl())==null||e.setItem(Ml,"yes")}function bm(){return`<section class="pikk-contest pikk-contest-gate" aria-labelledby="twerkGateH">
    <p class="kicker">Twerk Contest · 18+</p>
    <h1 id="twerkGateH">Are you 18 or older?</h1>
    <p>This contest is for adults only. Confirm you are 18+ to continue. Your answer is saved only on this device.</p>
    <p class="muted">TEST MODE: this is a self-confirmation. Real age verification will be required once PIKK Safety and the backend are live.</p>
    <div class="pikk-contest-actions">
      <button type="button" class="pikk-contest-enter" id="twerkGateYes">I'm 18 or older</button>
      <a class="pikk-contest-leave" href="#/home">No, take me back</a>
    </div>
  </section>`}function Pl(){return`<section class="pikk-contest pikk-contest-rules" aria-labelledby="twerkRulesH">
    <p class="kicker">Twerk Contest · 18+</p>
    <h1 id="twerkRulesH">Twerk Contest</h1>
    <h2>Rules</h2>
    <ul>
      <li>18+ only. Every entrant and everyone shown in an entry must be 18 or older.</li>
      <li>No nudity or sexual content. Keep clothing on and keep it dance-focused.</li>
      <li>Follow the <a href="#/guidelines">PIKK community guidelines</a>. No harassment, hate or minors.</li>
      <li>See something wrong? Use Report on the entry, or contact <a href="#/support">Support</a>. Reports are reviewed by moderators.</li>
    </ul>
    <p class="pikk-contest-soon" role="status">Entries &amp; voting coming soon. Nothing can be submitted yet.</p>
  </section>`}const ur=()=>fm()?Pl():bm();function mr(e=document.getElementById("app")){var t;(t=e==null?void 0:e.querySelector("#twerkGateYes"))==null||t.addEventListener("click",()=>{var s,a;vm(),e.innerHTML=Pl(),(a=(s=e.querySelector("h1"))==null?void 0:s.focus)==null||a.call(s)})}const ym={BASE_URL:"/pikk-app/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_BASE:"/pikk-app/",VITE_BUILD_SHA:"172e64b82e524337dcb24cf3d0d6a5c8bd787825"},Ve=Object.freeze([{name:"Block Wars",players:"1–2",icon:"🥊",theme:"fighters",artwork:"/games/approved/01_block_wars.jpg",description:"City-based fighters, combos and special moves.",href:"#/blockwars"},{name:"PIKK Playground",players:"1–8",icon:"🎈",theme:"playground",artwork:"/games/approved/02_pikk_playground.jpg",description:"Create your character, race, jump and explore with friends."},{name:"PIKK Clash",players:"1",icon:"💎",theme:"clash",artwork:"/games/approved/03_pikk_clash.jpg",description:"Original neighborhood-themed match puzzles and venue upgrades."},{name:"PIKK Knockout",players:"1",icon:"💥",theme:"knockout",artwork:"/games/approved/04_pikk_knockout.jpg",description:"Stylized physics challenges: launch, bounce and knock targets off moving platforms."},{name:"PIKK Bowling",players:"1–4",icon:"🎳",theme:"bowling",artwork:"/games/approved/05_pikk_bowling.jpg",description:"Compete for strikes, spares and high scores."},{name:"PIKK Pickleball",players:"2–4",icon:"🏓",theme:"pickleball",artwork:"/games/approved/06_pikk_pickleball.jpg",description:"Play singles or doubles on colorful courts."},{name:"PIKK Pool",players:"1–2",icon:"🎱",theme:"pool",artwork:"/games/approved/07_pikk_pool.jpg",description:"Play 8-ball pool against friends or the computer."},{name:"PIKK Cup Pong",players:"2–4",icon:"🥤",theme:"pong",artwork:"/games/approved/08_pikk_cup_pong.jpg",description:"Aim, throw and eliminate opponents’ cups."},{name:"PIKK Poker",players:"2–8",icon:"♠️",theme:"poker",artwork:"/games/approved/09_pikk_poker.jpg",description:"Social Texas Hold’em with nonredeemable Play Chips."},{name:"PIKK Blackjack",players:"1–5",icon:"🃏",theme:"blackjack",artwork:"/games/approved/10_pikk_blackjack.jpg",description:"Try for 21 against the dealer using Play Chips."},{name:"PIKK Slots",players:"1",icon:"🎰",theme:"slots",artwork:"/games/approved/11_pikk_slots.jpg",description:"Entertainment-only reels and virtual Play Chips."},{name:"PIKK Speed",players:"2",icon:"⚡",theme:"speed",artwork:"/games/approved/12_pikk_speed.jpg",description:"Race to play your cards before your opponent."},{name:"PIKK Spades",players:"4",icon:"♠",theme:"spades",artwork:"/games/approved/13_pikk_spades.jpg",description:"Partner strategy and card battles."},{name:"PIKK Dominoes",players:"2–4",icon:"🁢",theme:"dominoes",artwork:"/games/approved/14_pikk_dominoes.jpg",description:"Match tiles and outplay opponents."},{name:"PIKK Chess",players:"2",icon:"♟",theme:"chess",artwork:"/games/approved/15_pikk_chess.jpg",description:"Challenge opponents in a classic strategy game."}]);function Gs(e){return e!=null&&e.artwork?(ym&&"/pikk-app/"||"/").replace(/\/?$/,"/")+String(e.artwork).replace(/^\/+/,""):""}const Us=Object.freeze({videos:[{title:"Video Feed",href:"#/videos",detail:"Watch and discover videos",icon:"▶"},{title:"Shorts & Reels",href:"#/shorts",detail:"Browse short-form clips",icon:"▣"},{title:"Posts",href:"#/posts",detail:"View the community feed",icon:"▤"},{title:"Upload Video",href:"#/posts?type=video",detail:"Available prototype publishing tools · TEST MODE",icon:"⇧"},{title:"24/7 Viral Live",href:"#/viral-live",detail:"Rotating viral clips · preview",icon:"◉"},{title:"Spotlight",href:"#/spotlight",detail:"Featured creators · preview",icon:"✦"},{title:"Clippers",href:"#/clippers",detail:"Clip creators · TEST MODE",icon:"✂"},{title:"Stories",href:"#/story",detail:"Share to Everyone or Crew · TEST MODE",icon:"◌"},{title:"Premieres",detail:"Video premieres · Coming Soon",icon:"▶"}],connect:[{title:"Connect",href:"#/connect",detail:"Discover people and communities",icon:"♧"},{title:"PIKK Communities",href:"#/communities",detail:"Topic discussions, votes and replies · TEST MODE",icon:"#"},{title:"Communities",href:"#/communities",detail:"Topics, votes & community spaces",icon:"☷"},{title:"Messages",href:"#/messages",detail:"Open your messages",icon:"✉"},{title:"PIKK Crew",href:"#/crew",detail:"Private story list · TEST MODE",icon:"◎"},{title:"Favorites",href:"#/favorites",detail:"People who rank first · TEST MODE",icon:"★"},{title:"Random Chat",href:"#/connect#connect-random-chat",detail:"Preview only · real matching unavailable",icon:"◉"},{title:"Multistream",href:"#/connect#connect-multistream",detail:"Broadcast connection preview · TEST MODE",icon:"▹"},{title:"Explore",href:"#/explore",detail:"Search people, music, videos, live",icon:"⌕"},{title:"Live Rooms",href:"#/live",detail:"Live room directory · TEST MODE",icon:"●"},{title:"Fan Clubs",href:"#/fanclubs",detail:"Creator fan clubs · TEST MODE",icon:"♛"},{title:"Party Line",href:"#/multiguest",detail:"Multi-guest rooms · preview",icon:"☎"},{title:"Notifications",href:"#/notifications",detail:"Your activity",icon:"🔔"},{title:"City Connect",detail:"City-based rooms · Coming Soon",icon:"⌂"},{title:"Events",detail:"Community events · Coming Soon",icon:"◷"}],dating:[{title:"Discover Dating",href:"#/dating",detail:"Explore dating features · TEST MODE",icon:"♡"},{title:"Messages",href:"#/messages",detail:"Open private messages",icon:"✉"},{title:"My Profile",href:"#/profile",detail:"Review your profile settings",icon:"◉"},{title:"Safety Guidelines",href:"#/guidelines",detail:"Review community safety rules",icon:"◇"},{title:"Matches",detail:"Mutual matches · Coming Soon",icon:"♥"},{title:"Liked You",detail:"Who liked you · Coming Soon",icon:"♡"},{title:"Age & ID Verification",detail:"18+ identity checks · Coming Soon",icon:"✓"},{title:"Report & Block",href:"#/shield",detail:"PIKK Shield safety tools · TEST MODE",icon:"⚑"}],games:[{title:"PIKK Arcade",href:"#/games",detail:"View the full game collection · preview",icon:"♜"},...Ve.map(e=>({title:e.name,...e.href?{href:e.href}:{},detail:e.href?"Fighting game · development preview":e.description+" · planned",icon:e.name==="Block Wars"?"▣":"♜"})),{title:"Roast Arena",href:"#/roast-arena",detail:"Roast battles · preview",icon:"🔥"},{title:"Gift Battles",href:"#/giftbattles",detail:"Live gift battles · TEST MODE",icon:"⚔"},{title:"Missions",href:"#/missions",detail:"Daily missions · TEST MODE",icon:"★"},{title:"Loyalty Rewards",href:"#/loyalty",detail:"Play Chips & rewards · no cash value",icon:"◆"}],shop:[{title:"PIKK Shop",href:"#/shop",detail:"Browse available products",icon:"▤"},{title:"Marketplace",href:"#/marketplace",detail:"Community listings · TEST MODE",icon:"◇"},{title:"Foreign X-Change",href:"#/merch",detail:"Official merchandise",icon:"✦"},{title:"Creator Pricing",href:"#/pricing",detail:"Explore creator selling information",icon:"$"},{title:"Profile Shop",href:"#/profile-shop",detail:"Creator storefront · preview",icon:"▦"},{title:"Wallet",href:"#/wallet",detail:"Balance & activity · TEST MODE",icon:"◎"},{title:"Sell on PIKK",href:"#/pricing?focus=sell",detail:"Seller rules & apply · TEST MODE",icon:"⇧"},{title:"Orders & Shipping",detail:"Order tracking · Coming Soon",icon:"⛟"},{title:"Refunds",detail:"Returns & disputes · Coming Soon",icon:"↺"}]}),km=Object.freeze({"Video Feed":"videos","Shorts & Reels":"videos",Posts:"posts","Upload Video":"videos",Connect:"profile","PIKK Communities":"chat",Communities:"chat",Messages:"msg","Random Chat":"camera",Multistream:"live","Discover Dating":"heart","My Profile":"profile","Safety Guidelines":"heart","PIKK Arcade":"game","PIKK Speed":"game","PIKK Blackjack":"game","PIKK Slots":"game","PIKK Poker":"game","PIKK Spades":"game","PIKK Dominoes":"game","PIKK Chess":"game","PIKK Clash":"game","PIKK Knockout":"game","PIKK Playground":"game","PIKK Bowling":"game","PIKK Pickleball":"game","PIKK Pool":"game","PIKK Cup Pong":"game","Block Wars":"game","24/7 Viral Live":"live",Spotlight:"videos",Clippers:"videos",Stories:"camera",Premieres:"videos",Explore:"explore","Live Rooms":"live","Fan Clubs":"heart","Party Line":"chat",Notifications:"msg","City Connect":"explore",Events:"explore",Matches:"heart","Liked You":"heart","Age & ID Verification":"profile","Report & Block":"heart","Roast Arena":"game","Gift Battles":"live",Missions:"game","Loyalty Rewards":"game","Profile Shop":"merch",Wallet:"merch","Sell on PIKK":"merch","Orders & Shipping":"merch",Refunds:"merch","PIKK Shop":"merch",Marketplace:"merch","Foreign X-Change":"merch","Creator Pricing":"posts"}),Ll={videos:"pikkVideosMenu",connect:"pikkConnectMenu",dating:"pikkDatingMenu",games:"pikkGamesMenu",shop:"pikkShopMenu"};function It(e=!1){for(const[t,s]of Object.entries(Ll)){const a=document.getElementById(s);if(!a||a.hidden)continue;a.hidden=!0;const i=document.querySelector(`#tabbar a[href="#/${t}"]`);i==null||i.setAttribute("aria-expanded","false"),e&&(i==null||i.focus())}}function Sm(e,t){var o,c,d;if(!Object.hasOwn(Us,e))return;const s=Ll[e];let a=document.getElementById(s);a||(a=document.createElement("div"),a.id=s,a.className="pikk-create-overlay",a.hidden=!0,a.innerHTML=`<div class="pikk-create-sheet" role="dialog" aria-modal="true" aria-labelledby="${s}Title">
      <div class="pikk-create-head"><strong id="${s}Title">${e[0].toUpperCase()+e.slice(1)} on PIKK</strong><button type="button" class="btn ghost" data-section-close aria-label="Close ${e} menu">✕</button></div>
      <div class="pikk-create-options pikk-create-grid">${Us[e].map(p=>{const m=`<span class="pikk-menu-icon" aria-hidden="true">${Ns[km[p.title]||"explore"]}</span><strong class="pikk-menu-title">${p.title}</strong><small>${p.detail}</small>`;return p.href?`<a class="pikk-create-tile" href="${p.href}">${m}</a>`:`<div class="pikk-create-tile pikk-menu-planned" aria-disabled="true">${m}</div>`}).join("")}</div>
      <button type="button" class="pikk-menu-cancel" data-section-close>Cancel</button>
      <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · Production features are not enabled until secure services are available.</p>
    </div>`,document.body.appendChild(a),a.addEventListener("click",p=>{p.target===a||p.target.closest("[data-section-close]")?It(!0):p.target.closest(".pikk-create-options a")&&It()}),document.addEventListener("keydown",p=>{if(a.hidden)return;if(p.key==="Escape"){p.preventDefault(),It(!0);return}if(p.key!=="Tab")return;const m=[...a.querySelectorAll("button:not([disabled]), a[href]")],h=m[0],f=m[m.length-1];if(!h){p.preventDefault();return}a.contains(document.activeElement)?p.shiftKey&&document.activeElement===h?(p.preventDefault(),f.focus()):!p.shiftKey&&document.activeElement===f&&(p.preventDefault(),h.focus()):(p.preventDefault(),(p.shiftKey?f:h).focus())}),window.addEventListener("hashchange",()=>It()));const i=a.hidden;It();const n=document.getElementById("pikkMusicMenu");n&&!n.hidden&&(n.hidden=!0,(o=document.querySelector('#tabbar a[href="#/music"]'))==null||o.setAttribute("aria-expanded","false"));const r=document.getElementById("pikkCreateMenu");r&&!r.hidden&&(r.hidden=!0,(c=document.querySelector('#tabbar a[href="#/create"]'))==null||c.setAttribute("aria-expanded","false")),a.hidden=!i,t==null||t.setAttribute("aria-expanded",String(i)),i?(d=a.querySelector("[data-section-close]"))==null||d.focus():t==null||t.focus()}const Il=Object.freeze([{title:"Create on PIKK",items:[{title:"Post Photos",href:"#/posts?type=picture",detail:"Add photos · TEST MODE",icon:"camera"},{title:"Story",href:"#/story",detail:"Everyone or Crew · TEST MODE",icon:"camera"},{title:"Shorts / Reels",href:"#/posts?type=short",detail:"Short video · TEST MODE",icon:"videos"},{title:"Upload Video",href:"#/posts?type=video",detail:"Long video · TEST MODE",icon:"videos"},{title:"Create Post",href:"#/posts?type=text",detail:"Text / poll / link · TEST MODE",icon:"posts"},{title:"Go Live",href:"#/live?go=1",detail:"Start a stream · TEST MODE",icon:"live"},{title:"Upload Music",href:"#/music?view=upload",detail:"Beat / song · planned",icon:"music"},{title:"Sell Something",href:"#/marketplace",detail:"List a product · TEST MODE",icon:"merch"},{title:"Paid Content",href:"#/pricing",detail:"Premium creator content · planned",icon:"merch"}]},{title:"Social & Community",items:[{title:"Community Post",href:"#/community",detail:"Open community · preview",icon:"chat"},{title:"Reels",href:"#/posts?type=short",detail:"Short video · TEST MODE",icon:"videos"},{title:"Photo Post",href:"#/posts?type=picture",detail:"Photos · TEST MODE",icon:"camera"},{title:"PIKK Crew",href:"#/crew",detail:"Private story list · TEST MODE",icon:"heart"},{title:"Favorites",href:"#/favorites",detail:"People who rank first · TEST MODE",icon:"heart"},{title:"Create Poll",detail:"Interactive polls · Planned",icon:"posts"},{title:"Create Community",href:"#/community",detail:"Community area · preview",icon:"chat"},{title:"Create Chatroom",detail:"Room creation · Planned",icon:"msg"},{title:"Create Event",detail:"Events · Planned",icon:"explore"}]},{title:"Videos & Music",items:[{title:"Music Video",href:"#/posts?type=video",detail:"Video composer · TEST MODE",icon:"videos"},{title:"Short Video",href:"#/posts?type=short",detail:"Short composer · TEST MODE",icon:"videos"},{title:"Upload Song",detail:"Song publishing · Planned",icon:"music"},{title:"Upload Album",detail:"Album publishing · Planned",icon:"music"},{title:"Upload EP",detail:"EP publishing · Planned",icon:"music"},{title:"Upload Beats",detail:"Beat publishing · Planned",icon:"music"},{title:"Create Playlist",href:"#/music",detail:"Open music area · preview",icon:"music"},{title:"Add to Vault",href:"#/vault",detail:"Open Vault · preview",icon:"music"}]},{title:"Live & Commerce",items:[{title:"Schedule Live",detail:"Live scheduling · Planned",icon:"live"},{title:"Live Battle",href:"#/giftbattles",detail:"Battle area · preview",icon:"live"},{title:"List Product",href:"#/marketplace",detail:"Marketplace · TEST MODE",icon:"merch"},{title:"Seller Store",detail:"Store creation · Planned",icon:"merch"},{title:"Exclusive Content",detail:"Exclusive publishing · Planned",icon:"heart"}]},{title:"Creator Tools & Protection",items:[{title:"Creator Dashboard",href:"#/profile",detail:"Creator profile",icon:"profile"},{title:"Manage Content",href:"#/posts",detail:"Posts and content",icon:"posts"},{title:"Drafts",detail:"Draft management · Planned",icon:"posts"},{title:"Artist Protection",href:"#/shield",detail:"PIKK Shield local rights drafts · TEST MODE",icon:"music"},{title:"AI Support",detail:"Support assistant · Planned",icon:"chat"}]}]),wm=Object.freeze(Il.flatMap(e=>e.items)),Ol=Object.freeze([{label:"Songs",href:"#/music?view=songs",detail:"Browse released singles",icon:"♫"},{label:"Albums",href:"#/music?view=albums",detail:"Browse released albums",icon:"▣"},{label:"Beats",href:"#/music?view=beats",detail:"Beat marketplace not yet available",icon:"◉"},{label:"Playlists",href:"#/music?view=playlists",detail:"Verified YouTube playlists",icon:"▤"},{label:"Upload Music",href:"#/music?view=upload",detail:"Creator uploads coming later",icon:"⇧"},{label:"Trending",href:"#/music?view=songs",detail:"Most-played released songs",icon:"↗"},{label:"Music Vault",href:"#/vault",detail:"Vault · preview",icon:"◈"},{label:"AI Artists",href:"#/ai-artists",detail:"AI artist area · labelled AI",icon:"✦"},{label:"Open Mic",href:"#/openmic",detail:"Open mic sessions · TEST MODE",icon:"🎤"},{label:"Artist Earnings",href:"#/earnings",detail:"Creator earnings · TEST MODE",icon:"$"}]),$m=Object.freeze({Songs:"music",Albums:"music",Beats:"music",Playlists:"videos","Upload Music":"music"});function Ds(e=!1){const t=document.getElementById("pikkMusicMenu");if(!t||t.hidden)return;t.hidden=!0;const s=document.querySelector('#tabbar a[href="#/music"]');s==null||s.setAttribute("aria-expanded","false"),e&&(s==null||s.focus())}function Em(){let e=document.getElementById("pikkMusicMenu");return e||(e=document.createElement("div"),e.id="pikkMusicMenu",e.className="pikk-create-overlay",e.hidden=!0,e.innerHTML=`<div class="pikk-create-sheet" role="dialog" aria-modal="true" aria-labelledby="pikkMusicMenuTitle">
    <div class="pikk-create-head"><strong id="pikkMusicMenuTitle">Music on PIKK</strong><button type="button" class="btn ghost" data-music-close aria-label="Close music menu">✕</button></div>
    <div class="pikk-create-options pikk-create-grid">
      ${Ol.map(t=>`<a class="pikk-create-tile" href="${t.href}"><span class="pikk-menu-icon" aria-hidden="true">${Ns[$m[t.label]||"music"]}</span><strong class="pikk-menu-title">${t.label}</strong><small>${t.detail}</small></a>`).join("")}
    </div>
    <button type="button" class="pikk-menu-cancel" data-music-close>Cancel</button>
    <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · Beat selling and music uploads are not available yet</p>
  </div>`,document.body.appendChild(e),window.addEventListener("hashchange",()=>Ds()),e.addEventListener("click",t=>{t.target===e||t.target.closest("[data-music-close]")?Ds(!0):t.target.closest(".pikk-create-options a")&&Ds()}),document.addEventListener("keydown",t=>{if(e.hidden||(t.key==="Escape"&&(t.preventDefault(),Ds(!0)),t.key!=="Tab"))return;const s=[...e.querySelectorAll("a[href], button:not([disabled])")],a=s[0],i=s[s.length-1];if(!a){t.preventDefault();return}e.contains(document.activeElement)?t.shiftKey&&document.activeElement===a?(t.preventDefault(),i.focus()):!t.shiftKey&&document.activeElement===i&&(t.preventDefault(),a.focus()):(t.preventDefault(),(t.shiftKey?i:a).focus())}),e)}function xm(e){var i,n;const t=Em(),s=t.hidden,a=document.getElementById("pikkCreateMenu");s&&a&&!a.hidden&&(a.hidden=!0,(i=document.querySelector('#tabbar a[href="#/create"]'))==null||i.setAttribute("aria-expanded","false")),t.hidden=!s,e==null||e.setAttribute("aria-expanded",String(s)),s?(n=t.querySelector("[data-music-close]"))==null||n.focus():e==null||e.focus()}const ka=Object.freeze([{tier:"spotlight",name:"Premium Spotlight",slots:1,day:199,week:999},{tier:"featured",name:"Featured Box",slots:2,day:99,week:499},{tier:"promo",name:"Promo Box",slots:3,day:49,week:249}]),$e=e=>Object.freeze(e),La=Object.freeze([{id:"featured",title:"Featured placements",link:"#/videos",items:ka.map(e=>$e({name:e.name,day:e.day,week:e.week,slots:e.slots}))},{id:"player",title:"Music Player placement",link:"#/home",items:[$e({name:"Top PIKK Music Player on Home (Trending / Promoted slot)",day:149,week:699,slots:20})]},{id:"storyrail",title:"Story rail placement",link:"#/home",items:[$e({name:"Home story rail (Trending / Promoted slot)",day:49,week:229,slots:20})]},{id:"music",title:"Music",link:"#/music",items:[$e({name:"Trending Music boost (tracks, albums)",day:29,week:129})]},{id:"videos",title:"Videos and Clips",link:"#/videos",items:[$e({name:"Video / Clip boost",day:19,week:89})]},{id:"live",title:"Live",link:"#/live",items:[$e({name:"Live stream boost (pre-live + during the live)",perStream:25})]},{id:"shop",title:"Shop",link:"#/shop",items:[$e({name:"Shop product boost",day:15,week:69}),$e({name:"Store spotlight",week:59})]},{id:"posts",title:"Posts and Stories",link:"#/posts",items:[$e({name:"Post / Story boost",day:9,week:39})]},{id:"profiles",title:"Profiles",link:"#/profile",items:[$e({name:"Profile / Creator boost",day:19,week:89})]},{id:"events",title:"Events",link:"#/openmic",items:[$e({name:"Event / Open Mic listing",perEvent:25})]},{id:"battles",title:"Battles and Roast",link:"#/giftbattles",items:[$e({name:"Battles / Roast Arena matchup feature",perMatch:35})]},{id:"communities",title:"Communities",link:"#/communities",items:[$e({name:"Community spotlight",week:29})]},{id:"dating",title:"Dating boost",link:"#/dating",gate:"18+ only · requires age & ID verification and safety review before launch",items:[$e({name:"Dating profile boost",hour:4.99,day:14.99})]}]),Vt=e=>"$"+(Number.isInteger(e)?e:e.toFixed(2));function Am(e){return[e.hour!=null&&`${Vt(e.hour)} / hour`,e.day!=null&&`${Vt(e.day)} / 24h`,e.week!=null&&`${Vt(e.week)} / 7 days`,e.perStream!=null&&`${Vt(e.perStream)} per stream`,e.perEvent!=null&&`${Vt(e.perEvent)} per event`,e.perMatch!=null&&`${Vt(e.perMatch)} per match`].filter(Boolean)}const _l=Object.freeze({player:20,storyrail:20,spotlight:1,featured:2,promo:3}),Cm=Object.freeze({player:0,storyrail:0,spotlight:0,featured:0,promo:0});function Tm(e,t){const s=Math.max(0,e|0),a=Math.min(s,Math.max(0,t|0)),i=s-a;return{cap:s,booked:a,left:i,soldOut:i===0,label:i===0?"Sold out":`${i} of ${s} slots left`}}const Mm=e=>`#/promote?s=${e}`;function Dm(e={}){return e.promoted&&e.house?"Promoted · House demo":e.trending===!0?"Trending":"House pick"}const vi=e=>({title:e.title||e.label,href:e.href||"",detail:e.detail||""});function Pm(e){return e==="music"?Ol.map(vi):e==="create"?wm.map(vi):(Us[e]||[]).map(vi)}const Lm=rn.map(e=>e.href.replace("#/","")),Im=Object.freeze({id:"promote",label:"Promote",links:La.map(e=>({href:Mm(e.id),label:e.title}))}),hr=[{id:"explore",label:"Explore",href:"#/explore"},{id:"profile",label:"Profile / Sign in",href:"#/profile"},{id:"messages",label:"Messages",href:"#/messages"},{id:"notifications",label:"Notifications",href:"#/notifications"},{id:"settings",label:"Settings",href:"#/settings"},{id:"donate",label:"Donate · PIKK goal",href:"#/donate"},{id:"support",label:"Support · Help & tickets",href:"#/support"}],bi=e=>"/"+String(e).replace(/^#\/?/,"").split(/[?#]/)[0];function Om(){const e=Lm.map(n=>{const r=rn.find(o=>o.href==="#/"+n);return{id:n,label:r.label,links:Pm(n).map(o=>({href:o.href,label:o.title,soon:!o.href,detail:o.detail}))}}),t=new Set(["/home",...e.flatMap(n=>n.links.filter(r=>r.href).map(r=>bi(r.href))),...hr.map(n=>bi(n.href)),"/promote"]),s=go.flatMap(n=>n.href?[{href:n.href,label:n.label}]:n.links||[]),a=new Set,i=s.filter(n=>{const r=bi(n.href);return t.has(r)||a.has(r)?!1:(a.add(r),!0)});return[{id:"home",label:"Home",href:"#/home"},...e,Im,...hr,{id:"more",label:"More",links:i},{id:"updates",label:"What's New · App Updates",href:"#/updates"}]}const _m=3,qm=3e4,ql="pikk.playCounts.v1";let Nl={};const Rl=()=>{try{return globalThis.localStorage||null}catch{return null}};function Bl(){const e=Rl();try{return JSON.parse((e?e.getItem(ql):Nl.v)||"{}")}catch{return{}}}function Nm(e){const t=JSON.stringify(e),s=Rl();s?s.setItem(ql,t):Nl.v=t}const gr=new Map;function Pn(e,{kind:t="audio",seconds:s=0,opened:a=!1,source:i="organic",now:n=Date.now()}={}){var p;const r=String(e||"").trim();if(!r||(t==="story"?!a:!(Number(s)>=_m)))return!1;const o=gr.get(r);if(o!=null&&n-o<qm)return!1;gr.set(r,n);const c=Bl(),d=c[r]||{total:0,promote:0};d.total+=1,i==="promote"&&(d.promote+=1),c[r]=d,Nm(c);try{(p=globalThis.dispatchEvent)==null||p.call(globalThis,new CustomEvent("pikk:playcount",{detail:{id:r,count:d.total}}))}catch{}return!0}function Kl(e){var t;return((t=Bl()[String(e||"").trim()])==null?void 0:t.total)||0}function jl(e,t="audio"){return`${e} ${t==="audio"?e===1?"play":"plays":e===1?"view":"views"} · this device`}function Fl(e=globalThis.document){var s,a;if(!(e!=null&&e.querySelectorAll))return;const t=i=>(String(i).match(/ytimg\.com\/vi(?:_webp)?\/([\w-]{6,})\//)||[])[1];for(const i of e.querySelectorAll('[data-yt], [data-video-id], img[src*="ytimg.com/vi"]')){const n=((s=i.dataset)==null?void 0:s.yt)||((a=i.dataset)==null?void 0:a.videoId)||t(i.getAttribute("src"));if(!n)continue;const r=i.tagName==="IMG"?i.parentElement:i;if(!r)continue;let o=r.querySelector(":scope > .pikk-play-count");const c=Kl(n);if(!c){o==null||o.remove();continue}o||(o=e.createElement?e.createElement("small"):globalThis.document.createElement("small"),o.className="pikk-play-count",r.appendChild(o)),o.dataset.playCountFor=n,o.textContent=jl(c,"video")}}const fr="https://www.youtube.com/iframe_api";let z=[],se=0,I=null,na=!1,Ke=!1,Et=!1;const J=new Set;let vr=!1,br=null;const yr=new Map;function tt(e){if(!e)return"";try{const t=new URL(e);if(t.hostname.includes("youtu.be"))return t.pathname.slice(1).split("/")[0]||"";const s=t.searchParams.get("v");if(s)return s;const a=t.pathname.match(/\/embed\/([^/?]+)/);if(a)return a[1]==="videoseries"?"":a[1]}catch{}return""}function kr(e){if(!e)return"";try{return new URL(e).searchParams.get("list")||""}catch{return""}}function es(e){return e?`https://i.ytimg.com/vi/${e}/hqdefault.jpg`:""}function Rm(){var n,r;const e=[],t=new Set,s=new Set,a=o=>{if(o.playlistId){if(s.has(o.playlistId))return;s.add(o.playlistId)}else if(o.youtubeId){if(t.has(o.youtubeId))return;t.add(o.youtubeId)}else return;e.push(o)};for(const o of st){const c=((n=o.links)==null?void 0:n.youtube)||"",d=tt(c)||tt(((r=o.links)==null?void 0:r.youtubeMusic)||"");d&&a({id:o.id,title:o.title,artist:o.artist||"DatBoiSkeet",cover:o.cover||es(d),youtubeId:d,youtube:c||`https://www.youtube.com/watch?v=${d}`,embed:`https://www.youtube.com/embed/${d}`,links:{...o.links||{},youtube:c||`https://www.youtube.com/watch?v=${d}`},kind:"track"})}for(const o of an){const c=kr(o.youtube)||kr(o.embed);c&&a({id:o.id,title:o.title,artist:"DatBoiSkeet",cover:es("DTe4OiX2otg")||"/brand/pikk-logo-square.png",playlistId:c,youtube:o.youtube,embed:o.embed||`https://www.youtube.com/embed/videoseries?list=${c}`,links:{youtube:o.youtube,youtubeMusic:he.youtubeMusic,spotify:he.spotify,apple:he.apple},kind:"mix"})}const i=new Set(["Music Videos"]);for(const o of ue){if(!i.has(o.category||"Music Videos")||!o.featured&&!["dirty-money","93","no-love","bouquet","where-im-from","go-2-work"].includes(o.id)&&!o.featured)continue;const c=tt(o.youtube)||tt(o.embed);if(!c||t.has(c))continue;const d=st.find(p=>{var m;return tt(((m=p.links)==null?void 0:m.youtube)||"")===c});a({id:o.id,title:o.title,artist:o.artist||"DatBoiSkeet",cover:(d==null?void 0:d.cover)||es(c),youtubeId:c,youtube:o.youtube,embed:o.embed||`https://www.youtube.com/embed/${c}`,links:{youtube:o.youtube,youtubeMusic:`https://music.youtube.com/watch?v=${c}`,...(d==null?void 0:d.links)||{}},kind:"mv"})}return z=e,se>=z.length&&(se=0),z}function Ze(e){return String(e||"").toLowerCase().replace(/\(.*?\)/g,"").replace(/[^a-z0-9]+/g," ").trim()}function Gl(){var a,i;const e=wl();if(!e)return{item:null,meta:null,playable:!1};const t=Ze(e.title),s=z.find(n=>Ze(n.title)===t||Ze(n.title).includes(t)||t.includes(Ze(n.title)));if(s&&(s.youtubeId||s.playlistId))return{item:{...s},meta:e,playable:!0};for(const n of st){if(Ze(n.title)!==t&&!Ze(n.title).startsWith(t)&&!t.startsWith(Ze(n.title)))continue;const r=((a=n.links)==null?void 0:a.youtube)||"",o=tt(r)||tt(((i=n.links)==null?void 0:i.youtubeMusic)||"");return o?{item:{id:n.id,title:n.title,artist:n.artist||"DatBoiSkeet",cover:n.cover||es(o),youtubeId:o,youtube:r||`https://www.youtube.com/watch?v=${o}`,embed:`https://www.youtube.com/embed/${o}`,links:{...n.links||{},youtube:r||`https://www.youtube.com/watch?v=${o}`},kind:"track"},meta:e,playable:!0}:{item:{id:n.id,title:n.title,artist:n.artist||"DatBoiSkeet",cover:n.cover||e.cover||"",youtube:r||he.youtube,embed:"",links:{...n.links||{}},kind:"track"},meta:e,playable:!1}}for(const n of ue){if(Ze(n.title)!==t&&!Ze(n.title).includes(t))continue;const r=tt(n.youtube)||tt(n.embed);if(r)return{item:{id:n.id,title:n.title,artist:n.artist||"DatBoiSkeet",cover:es(r),youtubeId:r,youtube:n.youtube,embed:n.embed||`https://www.youtube.com/embed/${r}`,links:{youtube:n.youtube,youtubeMusic:`https://music.youtube.com/watch?v=${r}`},kind:"mv"},meta:e,playable:!0}}return{item:{id:e.id||"most-played",title:e.title||"Most played",artist:e.artist||"DatBoiSkeet",cover:e.cover||"",youtube:"",embed:"",links:{spotify:he.spotify,apple:he.apple,youtubeMusic:he.youtubeMusic,youtube:he.youtube},kind:"track"},meta:e,playable:!1}}function Ul(){const e=document.getElementById("spPlayNextMost"),t=document.getElementById("spPlayNextSub"),{meta:s,playable:a}=Gl();if(e){if(!s){e.hidden=!0;return}if(e.hidden=!1,e.dataset.playable=a?"1":"0",e.dataset.demo=s.demo?"1":"0",e.title=a?`Most played today · ${s.title} → Play next`:`Most played today · ${s.title} (Coming Soon / open platform)`,e.setAttribute("aria-label",`Play next — ${s.title}`),t){const i=s.demo?"DEMO · ":"";t.textContent=`${i}Most played today · ${s.title}`}}}function Sr(e){if(!e)return-1;if(!z.length)return z.push(e),se=0,0;let t=z.findIndex(a=>e.youtubeId&&a.youtubeId===e.youtubeId||e.playlistId&&a.playlistId===e.playlistId||a.id===e.id);if(t===se)return se;if(t>=0){const[a]=z.splice(t,1);t<se&&(se-=1),e=a}const s=Math.min(se+1,z.length);return z.splice(s,0,e),s}function Bm(){var n,r,o,c;const{item:e,meta:t,playable:s}=Gl();if(!t||!e){g("No most-played track yet");return}if(!s){const d=document.getElementById("spOpen"),p=((n=e.links)==null?void 0:n.apple)||((r=e.links)==null?void 0:r.youtubeMusic)||((o=e.links)==null?void 0:o.spotify)||((c=e.links)==null?void 0:c.youtube)||he.apple;d&&p&&(d.href=p),g(t.demo||t.status==="Coming Soon"?`${t.title} · Coming Soon — no in-app master. Open Music / Stream Everywhere when it drops.`:`${t.title} — open official platform (not in-app audio)`),Ul();return}if(ri()||!!Et&&Ke&&J.size===0||J.size>0){const d=Sr(e);g(d===se?`Already playing · ${e.title}`:`Queued next · ${e.title}`),fe();return}let i=z.findIndex(d=>e.youtubeId&&d.youtubeId===e.youtubeId||e.playlistId&&d.playlistId===e.playlistId||d.id===e.id);i<0&&(i=Sr(e)),Jl(i),g(`Playing · ${e.title}`)}const ys=[];function Hl(){var e;return(e=window.YT)!=null&&e.Player?Promise.resolve(window.YT):new Promise(t=>{var a;if(ys.push(t),na)return;na=!0;const s=window.onYouTubeIframeAPIReady;if(window.onYouTubeIframeAPIReady=()=>{na=!1;try{s==null||s()}catch{}const i=window.YT;for(;ys.length;)try{ys.shift()(i)}catch{}as()},document.querySelector(`script[src="${fr}"]`)){if((a=window.YT)!=null&&a.Player){na=!1;const i=window.YT;for(;ys.length;)try{ys.shift()(i)}catch{}as()}}else{const i=document.createElement("script");i.src=fr,i.async=!0,document.head.appendChild(i)}})}function Vl(){Hl().then(()=>as()).catch(()=>{})}function as(){var n;if(!(document.getElementById("dbsStickyFrame")||document.getElementById("dbsYtHost"))||!((n=window.YT)!=null&&n.Player)||I)return;const t=z[se],s={autoplay:0,controls:0,rel:0,modestbranding:1,playsinline:1,enablejsapi:1,origin:location.origin},a={height:"1",width:"1",playerVars:s,events:{onReady:()=>{fe()},onStateChange:r=>{if(clearTimeout(br),r.data===1){const o=z[se];br=setTimeout(()=>{z[se]===o&&ri()&&(Pn((o==null?void 0:o.youtubeId)||(o==null?void 0:o.title),{kind:"audio",seconds:3,source:o!=null&&o.promoted?"promote":"organic"}),fe())},3e3)}r.data===0&&Yl({auto:!0}),fe()},onError:()=>{g("YouTube embed error — Open on YouTube"),fe()}}};t!=null&&t.playlistId?a.playerVars={...s,listType:"playlist",list:t.playlistId}:t!=null&&t.youtubeId?a.videoId=t.youtubeId:a.videoId="DTe4OiX2otg";const i=document.getElementById("dbsStickyFrame")?"dbsStickyFrame":"dbsYtHost";I=new window.YT.Player(i,a)}function Hs({autoplay:e}={autoplay:!1}){const t=z[se];if(!t||!(I!=null&&I.cueVideoById)){as();return}try{t.playlistId?(typeof I.loadPlaylist=="function"?I.loadPlaylist({list:t.playlistId,listType:"playlist",index:0}):typeof I.cuePlaylist=="function"&&I.cuePlaylist({list:t.playlistId,listType:"playlist",index:0}),e&&Ke&&J.size===0&&setTimeout(()=>{try{I.playVideo()}catch{}},250)):t.youtubeId&&(e&&Ke&&J.size===0?I.loadVideoById(t.youtubeId):I.cueVideoById(t.youtubeId))}catch{}fe()}function ri(){var e;try{return((e=I==null?void 0:I.getPlayerState)==null?void 0:e.call(I))===1}catch{return!1}}function fe(){var m,h,f;const e=z[se],t=document.getElementById("spArt"),s=document.getElementById("spTitle"),a=document.getElementById("spSub"),i=document.getElementById("spPlay"),n=document.getElementById("spOpen"),r=document.getElementById("spSource"),o=J.size>0,c=!o&&(Et||ri());t&&e&&(t.src=e.cover||es(e.youtubeId||"")||"/brand/pikk-logo-square.png",t.alt=e.title||""),s&&(s.textContent=(e==null?void 0:e.title)||"PIKK Music");const d=document.getElementById("spPlays");if(d){const v=e?Kl(e.youtubeId||e.title):0;d.textContent=v?jl(v,"audio"):""}if(a&&(Ke?o?a.textContent=`Paused · ${[...J][0]} interrupt`:a.textContent=`${(e==null?void 0:e.artist)||"DatBoiSkeet"} · via YouTube (not Spotify in-app)`:a.textContent="Tap Play · YouTube embed · Stream Everywhere"),i&&(i.textContent=c?"❚❚":"▶",i.setAttribute("aria-label",c?"Pause":"Play PIKK Music"),i.dataset.playing=c?"1":"0"),n&&e){const v=((m=e.links)==null?void 0:m.apple)||((h=e.links)==null?void 0:h.youtubeMusic)||((f=e.links)==null?void 0:f.spotify)||e.youtube||he.apple;n.href=v,n.title="Open on official platform"}r&&(r.textContent=(e==null?void 0:e.kind)==="mix"?"YT Mix":(e==null?void 0:e.kind)==="mv"?"YT MV":"YouTube");const p=document.getElementById("spBadge");p&&(p.textContent=o?"INTERRUPTED":Ke&&c?"PLAYING · YT":"TEST · YT EMBED"),Ul()}function Km(){var e;if(J.size>0){g("Paused for "+[...J][0]+" — resume when done"),fe();return}Ke=!0,Et=!0,Vl(),as();try{if(I!=null&&I.playVideo){const t=(e=I.getPlayerState)==null?void 0:e.call(I);t===-1||t===5||t===void 0?Hs({autoplay:!0}):I.playVideo()}else{const t=setInterval(()=>{I!=null&&I.playVideo&&(clearInterval(t),Hs({autoplay:!0}))},120);setTimeout(()=>clearInterval(t),8e3)}}catch{g("Tap Play PIKK Music again if autoplay blocked")}fe()}function jm({clearDesire:e}={}){var t;e&&(Et=!1);try{(t=I==null?void 0:I.pauseVideo)==null||t.call(I)}catch{}fe()}function ta(e="user"){e&&e!=="user"&&J.add(e),jm({clearDesire:e==="user"}),fe()}function zl(e){var t;if(e?J.delete(e):J.clear(),J.size===0&&Ke&&Et)try{(t=I==null?void 0:I.playVideo)==null||t.call(I)}catch{}fe()}function Ia(e){return zl(e)}function is(){ta("video")}function yi(){ta("live")}function Wl(){Ia("live")}function it(){Ia("video")}function Yl({auto:e}={}){z.length&&(se=(se+1)%z.length,Et=!0,e||(Ke=!0),Hs({autoplay:Ke&&J.size===0}),fe())}function Fm(){z.length&&(se=(se-1+z.length)%z.length,Ke=!0,Et=!0,Hs({autoplay:J.size===0}),fe())}function Jl(e){e<0||e>=z.length||(se=e,Ke=!0,J.clear(),Et=!0,Hs({autoplay:!0}),fe())}function Gm(){var e,t,s,a,i,n;vr||(vr=!0,(e=document.getElementById("spPlay"))==null||e.addEventListener("click",()=>{J.size>0&&J.clear(),ri()?ta("user"):Km()}),(t=document.getElementById("spPrev"))==null||t.addEventListener("click",()=>{J.clear(),Fm()}),(s=document.getElementById("spNext"))==null||s.addEventListener("click",()=>{J.clear(),Yl()}),Qm(),(a=document.getElementById("spOpen"))==null||a.addEventListener("click",r=>{g("Opening external music service (playback depends on provider)")}),(i=document.getElementById("spPlayNextMost"))==null||i.addEventListener("click",()=>{Bm()}),(n=document.getElementById("spQueueBtn"))==null||n.addEventListener("click",()=>{const r=document.getElementById("spQueuePanel");if(!r)return;r.hasAttribute("hidden")?(r.removeAttribute("hidden"),r.innerHTML=z.map((c,d)=>`<button type="button" class="sp-q-item${d===se?" on":""}" data-i="${d}">
              <img src="${c.cover||""}" alt="" width="36" height="36" />
              <span><b>${wr(c.title)}</b><small>${wr(c.artist)} · ${c.kind}</small></span>
            </button>`).join(""),r.querySelectorAll(".sp-q-item").forEach(c=>{c.addEventListener("click",()=>{Jl(Number(c.dataset.i)),r.setAttribute("hidden","")})})):r.setAttribute("hidden","")}),document.addEventListener("click",r=>{const o=document.getElementById("spQueuePanel");!o||o.hasAttribute("hidden")||!r.target.closest("#spQueuePanel")&&!r.target.closest("#spQueueBtn")&&o.setAttribute("hidden","")}))}function wr(e){return String(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}let $r=!1;function Um(){$r||($r=!0,window.addEventListener("dbs:interrupt-music",e=>{var s;const t=((s=e==null?void 0:e.detail)==null?void 0:s.reason)||"user";ta(t)}))}function Hm(){Rm(),Gm(),Um(),fe(),Vl(),setTimeout(()=>as(),400)}function Vm(e){var a,i;const t=e==="/live",s=e==="/videos"||e==="/home"||e==="/music"||e==="/vault";!t&&J.has("live")&&Ia("live");for(const[n,r]of[...ee.entries()])if(!document.getElementById(n)){r.playing&&(He=Math.max(0,He-1));try{(i=(a=r.player)==null?void 0:a.destroy)==null||i.call(a)}catch{}ee.delete(n)}He===0&&!s&&J.has("video")&&Ia("video"),fe()}const ee=new Map;let He=0,Er=0;function Gi(e){var s;if(!e||!(e instanceof Element))return!0;const t=e.id||"";return!!(t==="dbsStickyFrame"||t==="dbsYtHost"||(s=e.closest)!=null&&s.call(e,"#dbs-sticky-player, #stickyPlayer, #dbsStickyFrame, #dbsYtHost"))}function Ln(e){return e?/youtube\.com\/embed|youtube-nocookie\.com\/embed|youtu\.be\//.test(e):!1}function zm(e){let t=e.getAttribute("src")||e.src||"";if(!Ln(t))return!1;let s=!1;return/[?&]enablejsapi=1(?:&|$)/.test(t)||(t+=(t.includes("?")?"&":"?")+"enablejsapi=1",s=!0),/[?&]origin=/.test(t)||(t+=(t.includes("?")?"&":"?")+"origin="+encodeURIComponent(location.origin),s=!0),s&&(e.setAttribute("src",t),e.src=t),!0}function Wm(e){if(e.id&&!ee.has(e.id)&&e.id!=="dbsStickyFrame"&&e.id!=="dbsYtHost"||e.id&&ee.has(e.id))return e.id;Er+=1;const t=`dbs-page-yt-${Er}`;return e.id=t,t}function Ym(e,t){var a,i,n;const s=ee.get(e);if(s){if(clearTimeout(yr.get(e)),t.data===1){const r=(n=(i=(a=t.target)==null?void 0:a.getVideoData)==null?void 0:i.call(a))==null?void 0:n.video_id;r&&yr.set(e,setTimeout(()=>{var o,c;(o=ee.get(e))!=null&&o.playing&&(Pn(r,{kind:"video",seconds:3,source:(c=document.querySelector(`#${CSS.escape(e)}`))!=null&&c.closest("[data-promoted]")?"promote":"organic"}),Fl(document))},3e3))}t.data===1?(s.playing||(s.playing=!0,He+=1),is()):(t.data===0||t.data===2)&&(s.playing&&(s.playing=!1,He=Math.max(0,He-1)),He===0&&it())}}function Ql(e){var n,r;const t=typeof e=="string"?document.getElementById(e):e;if(!t||Gi(t))return Promise.resolve(null);let s=t;if(t.tagName!=="IFRAME"&&(s=((n=t.querySelector)==null?void 0:n.call(t,"iframe"))||t),!s||s.tagName!=="IFRAME"||Gi(s))return Promise.resolve(null);const a=s.getAttribute("src")||s.src||"";if(!Ln(a)||!zm(s))return Promise.resolve(null);const i=Wm(s);return ee.has(i)&&((r=ee.get(i))!=null&&r.player)?Promise.resolve(ee.get(i).player):Hl().then(()=>new Promise(o=>{var m;if(ee.has(i)&&((m=ee.get(i))!=null&&m.player)){o(ee.get(i).player);return}const c=()=>{var h;if(!document.getElementById(i)){o(null);return}if(ee.has(i)&&((h=ee.get(i))!=null&&h.player)){o(ee.get(i).player);return}try{const f=new window.YT.Player(i,{events:{onReady:()=>{},onStateChange:v=>Ym(i,v),onError:()=>{}}});ee.set(i,{player:f,el:s,playing:!1}),s.dataset.dbsYtBound="1",o(f)}catch(f){console.warn("[dbs] bindYoutubeInterrupt failed",i,f),o(null)}};if(s.dataset.dbsYtBound==="1"&&ee.has(i)){o(ee.get(i).player);return}let d=!1;const p=()=>{d||(d=!0,c())};s.addEventListener("load",p,{once:!0}),setTimeout(p,400)}))}function oi(e){const s=[...(e&&e.querySelectorAll?e:document).querySelectorAll("iframe")].filter(a=>{if(Gi(a))return!1;const i=a.getAttribute("src")||a.src||"";return Ln(i)});return Promise.all(s.map(a=>Ql(a)))}function Jm(e){var i,n;const t=typeof e=="string"?document.getElementById(e):e,s=typeof e=="string"?e:t==null?void 0:t.id;if(!s||s==="dbsStickyFrame"||s==="dbsYtHost")return;const a=ee.get(s);if(a){a.playing&&(a.playing=!1,He=Math.max(0,He-1),He===0&&it());try{(n=(i=a.player)==null?void 0:i.destroy)==null||n.call(i)}catch{}ee.delete(s)}}function ra(e){if(!Number.isFinite(e)||e<=0)return"--:--";const t=Math.floor(e);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}let ki=!1;function Qm(){var i;const e=document.getElementById("spSeek"),t=document.getElementById("spTimeCur"),s=document.getElementById("spTimeDur"),a=document.getElementById("spVol");!e||!t||!s||(e.addEventListener("input",()=>{ki=!0}),e.addEventListener("change",()=>{var r,o;const n=((r=I==null?void 0:I.getDuration)==null?void 0:r.call(I))||0;n>0&&((o=I.seekTo)==null||o.call(I,Number(e.value)/1e3*n,!0)),ki=!1}),a==null||a.addEventListener("input",()=>{var n;return(n=I==null?void 0:I.setVolume)==null?void 0:n.call(I,Number(a.value))}),(i=document.getElementById("spCast"))==null||i.addEventListener("click",()=>g("Cast is not available yet")),setInterval(()=>{var o,c;const n=((o=I==null?void 0:I.getDuration)==null?void 0:o.call(I))||0,r=((c=I==null?void 0:I.getCurrentTime)==null?void 0:c.call(I))||0;n>0?(e.disabled=!1,ki||(e.value=String(Math.round(r/n*1e3))),t.textContent=r>0?ra(r):"0:00",s.textContent=ra(n),e.setAttribute("aria-valuetext",`${ra(r)} of ${ra(n)}`),e.style.setProperty("--sp-pct",`${r/n*100}%`)):(e.disabled=!0,t.textContent="--:--",s.textContent="--:--")},500))}const Oa=new Set;function je(){const e=(location.hash||"").replace(/^#/,"")||"/home";let t="",s=e;const a=e.indexOf("#");a>=0&&(t=e.slice(a+1).split("?")[0],s=e.slice(0,a));const i=s.startsWith("/")?s:"/"+s,n=i.indexOf("?"),r=n===-1?i:i.slice(0,n),o=n===-1?"":i.slice(n+1),c=r.split("/").filter(Boolean).map((d,p)=>{if(p===0)return d;try{return decodeURIComponent(d)}catch{return d}});return{path:"/"+(c[0]||"home"),parts:c,query:Object.fromEntries(new URLSearchParams(o)),elementId:t,raw:i}}function K(e){const s=(e.startsWith("#")?e:"#"+(e.startsWith("/")?e:"/"+e)).replace(/^#/,"");if((location.hash||"").replace(/^#/,"")===s){Oa.forEach(i=>i(je()));return}location.hash=s}function Xm(e){return Oa.add(e),()=>Oa.delete(e)}function Zm(){const e=()=>Oa.forEach(t=>t(je()));window.addEventListener("hashchange",e),location.hash?e():location.hash="/home"}const Si="/pikk-app/",Jt=Si.endsWith("/")?Si.slice(0,-1):Si;function ut(e){if(e==null||e==="")return e;const t=String(e);return/^(https?:|data:|blob:|idb:|#|\/\/)/i.test(t)||Jt&&(t===Jt||t.startsWith(Jt+"/"))?t:t.startsWith("/")?Jt+t:(Jt||"")+"/"+t}function Xl(e=document){Jt&&(e.querySelectorAll("[src]").forEach(t=>{const s=t.getAttribute("src");if(!s)return;const a=ut(s);a!==s&&t.setAttribute("src",a)}),e.querySelectorAll("[srcset]").forEach(t=>{const s=t.getAttribute("srcset");if(!s||!s.includes("/"))return;const a=s.replace(/(^|,\s*)(\/(?!\/)[^\s,]+)/g,(i,n,r)=>n+ut(r));a!==s&&t.setAttribute("srcset",a)}),e.querySelectorAll("[data-zoom]").forEach(t=>{const s=t.getAttribute("data-zoom");if(!s)return;const a=ut(s);a!==s&&t.setAttribute("data-zoom",a)}),e.querySelectorAll("[poster]").forEach(t=>{const s=t.getAttribute("poster");if(!s)return;const a=ut(s);a!==s&&t.setAttribute("poster",a)}))}function Zl(e,t){e&&e.querySelectorAll("a[data-path]").forEach(s=>{const a=s.getAttribute("data-path")===t;s.classList.toggle("on",a),a?s.setAttribute("aria-current","page"):s.removeAttribute("aria-current")})}function eh(e,t){var i,n,r;const s=(r=(n=(i=t==null?void 0:t.querySelector)==null?void 0:i.call(t,"h1"))==null?void 0:n.textContent)==null?void 0:r.replace(/\s+/g," ").trim();return s?s.slice(0,80):(String((e==null?void 0:e.path)||"/home").split("/").filter(Boolean).pop()||"home").replace(/[-_]+/g," ").replace(/\b\w/g,o=>o.toUpperCase())}function th(e,t,s,a=document){const i=eh(e,t);return a.title=`${i} | PIKK`,s&&(s.textContent=`${i} page loaded`),i}function sh({drawer:e,scrim:t,trigger:s},a,i=!1){var r;if(!e||!t||!s)return;const n=!!a;e.classList.toggle("open",n),e.setAttribute("aria-hidden",String(!n)),e.inert=!n,t.classList.toggle("show",n),s.setAttribute("aria-expanded",String(n)),s.setAttribute("aria-label",n?"Close navigation menu":"Open navigation menu"),n?(r=e.querySelector("button, a[href]"))==null||r.focus():i&&s.focus()}const ah="dbs_media_v1",ns="blobs",ih=1;function ec(){return new Promise((e,t)=>{const s=indexedDB.open(ah,ih);s.onupgradeneeded=()=>{const a=s.result;a.objectStoreNames.contains(ns)||a.createObjectStore(ns,{keyPath:"id"})},s.onsuccess=()=>e(s.result),s.onerror=()=>t(s.error||new Error("idb open failed"))})}async function nh(e,t,s={}){const a=await ec();return new Promise((i,n)=>{const r=a.transaction(ns,"readwrite");r.objectStore(ns).put({id:e,blob:t,mime:t.type||s.mime||"application/octet-stream",name:s.name||"",size:t.size||0,at:Date.now()}),r.oncomplete=()=>i(e),r.onerror=()=>n(r.error)})}async function rh(e){const t=await ec();return new Promise((s,a)=>{const n=t.transaction(ns,"readonly").objectStore(ns).get(e);n.onsuccess=()=>s(n.result||null),n.onerror=()=>a(n.error)})}const wi=new Map;async function li(e){if(!e)return"";if(e.startsWith("idb:")){const t=e.slice(4);if(wi.has(t))return wi.get(t);const s=await rh(t);if(!(s!=null&&s.blob))return"";const a=URL.createObjectURL(s.blob);return wi.set(t,a),a}return e}function oh(e="blob"){return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function $i(e,t){return`<article class="pikk-ad-slot pikk-ad-${e.tier}" data-promo-tier="${e.tier}" aria-label="${e.name} slot ${t}, pricing preview">
    <span class="pikk-ad-slot-top"><span class="pikk-ad-slot-icon" aria-hidden="true">▶</span><span class="pikk-ad-slot-number">0${t}</span></span>
    <strong>${e.name}</strong>
    <span class="pikk-ad-slot-description">Available placement · booking coming soon</span>
    <span class="pikk-ad-slot-prices"><b>$${e.day}</b><small>/ 24 hours</small></span>
    <span class="pikk-ad-slot-week">$${e.week} / 7 days</span>
  </article>`}function tc(){return`<section class="pikk-featured-inventory" aria-label="Featured on PIKK sponsored placement pricing">
      <div class="pikk-featured-heading"><div><p class="kicker">Creator &amp; brand visibility</p><h2>Featured on PIKK</h2></div><span class="pikk-featured-sponsored">Sponsored placements</span></div>
      <p class="pikk-featured-intro">Six premium advertising positions on each page. Preview pricing below; booking and checkout are not active yet.</p>
      <div class="pikk-featured-rows">
        <div class="pikk-featured-row pikk-featured-row-hero">${$i(ka[0],1)}</div>
        <div class="pikk-featured-row pikk-featured-row-two">${[1,2].map(e=>$i(ka[1],e)).join("")}</div>
        <div class="pikk-featured-row pikk-featured-row-three">${[1,2,3].map(e=>$i(ka[2],e)).join("")}</div>
      </div>
      <p class="pikk-featured-footnote">Home and Videos placements are priced separately. Rates are introductory proposals; no paid placement or guaranteed views are currently offered.</p>
    </section>`}function lh(e){return`<div class="pikk-stories-promotions" data-featured-context="videos">
    <section class="pikk-stories-strip" aria-label="PIKK Stories preview">
      <div class="pikk-featured-heading"><div><p class="kicker">Connect in 24 hours</p><h2>PIKK Stories</h2></div><span class="pikk-featured-state">Coming soon</span></div>
      <div class="pikk-stories-preview">
        <div class="pikk-story-preview"><span class="pikk-story-ring"><span aria-hidden="true">＋</span></span><strong>Your Story</strong></div>
        <p>Share moments with your followers. Stories will disappear after 24 hours once publishing launches.</p>
      </div>
    </section>
    ${tc()}
  </div>`}const ch=Object.freeze(["Music","Rap","Gaming","Dance","Comedy","Sports","Art","Fashion"]),Ui=15;function dh(){return`
  <section class="pikk-hs pikk-matchup" id="homeMatchUp" data-hs="matchup" data-test-mode aria-labelledby="homeMatchUpH">
    <div class="pikk-hs-head"><div><p class="kicker">Random 1-on-1 video chat</p>
      <h2 id="homeMatchUpH">PIKK Match Up <span class="pikk-badge-18" aria-label="18 plus only">18+</span> <span class="chip pikk-mu-test">TEST MODE</span></h2></div></div>
    <p class="pikk-mu-lead">Demo preview only — no camera or microphone is used and no real people are matched.</p>
    <div class="pikk-mu-tags" role="group" aria-label="Interest tags">${ch.map(t=>`<button type="button" class="pikk-mu-tag" data-mu-tag="${l(t)}" aria-pressed="false">${l(t)}</button>`).join("")}</div>
    <div class="pikk-mu-stage">
      <div class="pikk-mu-tile pikk-mu-you" aria-label="Your tile (placeholder)"><span aria-hidden="true">◉</span><small>You · camera off (demo)</small></div>
      <div class="pikk-mu-tile pikk-mu-them" aria-label="Match tile (placeholder)"><span aria-hidden="true">?</span><small data-mu-status>Demo match placeholder</small></div>
    </div>
    <div class="pikk-mu-timer" aria-live="polite"><span data-mu-time>${Ui}</span>s
      <button type="button" class="pikk-mu-btn" data-mu-add>+15s Add time</button></div>
    <div class="pikk-mu-actions">
      <button type="button" class="pikk-mu-btn pikk-mu-start" data-mu-start>Start matching</button>
      <button type="button" class="pikk-mu-btn" data-mu-next disabled>Skip / Next</button>
      <button type="button" class="pikk-mu-btn" data-mu-friend disabled>Add friend</button>
      <button type="button" class="pikk-mu-btn" data-mu-report disabled>Report</button>
      <button type="button" class="pikk-mu-btn" data-mu-block disabled>Block</button>
    </div>
    <p class="pikk-mu-safety" role="note"><strong>Safety:</strong> 18+ only. Never share personal info. Report or Block ends a chat right away. Live matching launches only after age verification and moderation are in place — this is a demo.</p>
  </section>`}function ph(e){const t=e.querySelector("#homeMatchUp");if(!t)return;const s=f=>t.querySelector(f),a=s("[data-mu-time]"),i=s("[data-mu-status]");let n=Ui,r=null,o=0;const c=()=>{r&&clearInterval(r),r=null},d=f=>["[data-mu-next]","[data-mu-friend]","[data-mu-report]","[data-mu-block]"].forEach(v=>{s(v).disabled=!f}),p=()=>[...t.querySelectorAll('.pikk-mu-tag[aria-pressed="true"]')].map(f=>f.dataset.muTag),m=()=>{c(),o+=1,n=Ui,a.textContent=n,d(!0);const f=p();i.textContent=`Demo round ${o}${f.length?" · "+f.join(", "):""} · placeholder, not a real user`,r=setInterval(()=>{if(!document.body.contains(t))return c();n-=1,a.textContent=Math.max(n,0),n<=0&&(c(),d(!1),i.textContent="Time up (demo). Tap Start matching again.")},1e3)};t.querySelectorAll(".pikk-mu-tag").forEach(f=>f.addEventListener("click",()=>{const v=f.getAttribute("aria-pressed")!=="true";f.setAttribute("aria-pressed",String(v)),f.classList.toggle("is-on",v)})),s("[data-mu-start]").addEventListener("click",m),s("[data-mu-next]").addEventListener("click",m),s("[data-mu-add]").addEventListener("click",()=>{r&&(n+=15,a.textContent=n)}),s("[data-mu-friend]").addEventListener("click",()=>{i.textContent="Friend request (demo) — not sent; no real user."});const h=f=>{c(),d(!1),i.textContent=`${f} (demo) — chat ended. Real reports go to moderation at launch.`};s("[data-mu-report]").addEventListener("click",()=>h("Reported")),s("[data-mu-block]").addEventListener("click",()=>h("Blocked"))}const uh=e=>(String(e||"").match(/(?:v=|embed\/|youtu\.be\/)([\w-]{6,})/)||[])[1]||"",xr=e=>{const t=uh(e);return t?`https://i.ytimg.com/vi/${t}/hqdefault.jpg`:""},zt=(e,t="")=>e?`<img src="${l(e)}" alt="${l(t)}" loading="lazy" decoding="async"/>`:'<span class="hs-ph" aria-hidden="true">◆</span>',qe=(e,t,s,a,i,n="")=>`
  <section class="pikk-hs" id="hs-${e}" data-hs="${e}" aria-labelledby="hs-${e}-h">
    <div class="pikk-hs-head"><div><p class="kicker">${l(a)}</p><h2 id="hs-${e}-h">${l(t)}</h2></div><a class="pikk-hs-all" href="${s}" data-see-all>See all →</a></div>
    <div class="pikk-hs-row" role="list">${i}</div>${n?`<p class="pikk-hs-note">${l(n)}</p>`:""}
  </section>`,Le=(e,t,s,a,i="",n="")=>`<a class="pikk-hs-card ${i}" role="listitem" href="${e}"><span class="pikk-hs-media">${t}${n?`<span class="pikk-hs-badge">${l(n)}</span>`:""}</span><strong>${l(s)}</strong>${a?`<small>${l(a)}</small>`:""}</a>`,mh=["live","connect","posts","videos","music","dating","contest","matchup","battles","shop","more"],Fe=Object.freeze({music:"#/music",posts:"#/posts",videos:"#/videos",live:"#/live",connect:"#/connect",dating:"#/dating",games:"#/games",battles:"#/giftbattles",contest:"#/contest/twerk",shop:"#/shop"}),hh=Object.freeze([["#/clips","Clips","Short clips feed"],["#/openmic","Open Mic","24/7 category · TEST MODE"],["#/spotlight","Spotlight","Request a feature · TEST MODE"],["#/multiguest","Multi-guest Live","Coming soon"],["#/fanclubs","Fan clubs","Coming soon"],["","Events","Coming soon · no page yet"],["#/crew","PIKK Crew","Private story list"],["#/story","Stories","Post a story"],["#/favorites","Favorites","Saved on this device"],["#/payments","$ Payments","Hub · TEST MODE · not live"],["#/wallet","Wallet","Coins · TEST MODE"],["#/earnings","Earnings","Creator payouts · TEST MODE"],["#/loyalty","Loyalty","Rewards · Coming soon"],["#/refer","Refer a friend","Invite link"],["#/ai-artists","AI Artists","Coming soon"],["#/vault","Vault","Exclusive drops · Coming soon"],["#/shield","PIKK Shield","Safety tools"],["#/support","Support","Help & contact"],["#/settings","Settings","Your preferences"],["#/updates","Updates","What’s new"],["#/notifications","Notifications","Your alerts"],["#/profile-shop","Profile shop","Creator storefront · TEST MODE"],["#/share","Share PIKK","Invite & share links"],["#/launch","Launch","Launch plan · Coming soon"],["#/phases","Roadmap phases","What ships next"],["#/guidelines","Community guidelines","Rules & safety"],["#/terms","Terms","Draft terms"],["#/privacy","Privacy","Draft privacy policy"]]);function gh(){const e=st.map(f=>Le("#/music",zt(f.cover,f.title),f.title,`${f.artist} · ${f.type==="album"?"Album":"Single"}${f.year?" · "+f.year:""}`,"is-square",f.type==="album"?"Album":"Track")).join(""),s=ue.filter(f=>f.category==="Music Videos").slice(0,6).map((f,v)=>Le(v%3===1?"#/shorts":"#/posts",zt(xr(f.youtube),f.title),f.title,v%3===0?"Picture · house":v%3===1?"Short · house":"Video · house",v%3===1?"is-tall":"is-square",v%3===0?"Photo":v%3===1?"Short":"Video")).join(""),a=ue.slice(0,8).map(f=>Le("#/videos",zt(xr(f.youtube),f.title),f.title,`${f.artist||"DatBoiSkeet"} · PIKK Official`,"is-wide")).join(""),i=[["#/live","Live Rooms","Directory preview · TEST MODE"],["#/live?go=1","Go Live","Start a stream · TEST MODE"],["#/viral-live","24/7 Viral Live","Rotating clips · preview"]].map(([f,v,b])=>Le(f,'<span class="hs-ph hs-live" aria-hidden="true">●</span>',v,b,"is-chip")).join(""),n=[["#/explore","People","Discover creators"],["#/communities","Communities","Topics & votes · TEST MODE"],["#/community","PIKK Lounge","Channel rooms"],["#/live","Live connections","Rooms · TEST MODE"],["#/messages","Messages","Your inbox"]].map(([f,v,b])=>Le(f,'<span class="hs-ph" aria-hidden="true">◎</span>',v,b,"is-chip")).join(""),r=Le("#/dating",'<span class="hs-ph hs-18" aria-hidden="true">18+</span>',"PIKK Dating · pre-launch","Adults only · age & ID verification and safety review before launch. No profiles shown.","is-wide is-teaser"),c=Le("#/blockwars",zt("/blockwars-preview/01-title.jpg","Block Wars"),"Block Wars","Coming Soon · gameplay paused","is-wide","Coming Soon")+Ve.filter(f=>f.name!=="Block Wars").map(f=>Le("#/games",zt(Gs(f),f.name),f.name,"Coming Soon · concept art","is-square","Coming Soon")).join(""),d=[["#/giftbattles","Live Battles","Battle area · preview"],["#/roast-arena","Roast Arena","Matchups · preview"]].map(([f,v,b])=>Le(f,'<span class="hs-ph" aria-hidden="true">⚔</span>',v,b,"is-chip")).join(""),p=Oe.slice(0,8).map(f=>Le("#/shop",zt(f.image,f.name),f.name,`$${f.price} · Foreign X-Change`,"is-square")).join("")+Le("#/shop",'<span class="hs-ph" aria-hidden="true">⌂</span>',"Foreign X-Change store","Official merch store · checkout on merchant site","is-chip"),h={music:qe("music","Music",Fe.music,"Tracks & albums",e),posts:qe("posts","Posts",Fe.posts,"Pictures · shorts · videos",s,"House samples from official releases."),videos:qe("videos","Videos",Fe.videos,"Long-form",a),live:qe("live","Live",Fe.live,"Live now & go live",i,"Live streaming is TEST MODE; no viewer counts are shown."),connect:qe("connect","Connect",Fe.connect,"People · communities · live",n),dating:qe("dating","Dating",Fe.dating,"18+ · safety-gated",r),games:qe("games","Games",Fe.games,"PIKK Arcade · all games",c,"Concept previews · games are not playable yet."),battles:qe("battles","Battles & Roast",Fe.battles,"Head-to-head",d),contest:qe("contest","Contests",Fe.contest,"18+ · community",'<div class="pikk-hs-contest" role="listitem"><strong class="pikk-contest-title">Twerk Contest</strong><span class="pikk-badge-18" aria-label="18 plus only">18+</span><a class="pikk-contest-enter" href="#/contest/twerk">Enter</a></div>'),matchup:dh(),more:qe("more","More on PIKK","#/explore","Every feature · one tap",hh.map(([f,v,b])=>f?Le(f,'<span class="hs-ph" aria-hidden="true">◆</span>',v,b,"is-chip"):`<div class="pikk-hs-card is-chip is-soon" role="listitem"><span class="pikk-hs-media"><span class="hs-ph" aria-hidden="true">◆</span></span><strong>${l(v)}</strong><small>${l(b)}</small></div>`).join("")),shop:qe("shop","Shop",Fe.shop,"Featured products & stores",p)};return`<div class="pikk-home-showcase" id="pikkHomeShowcase">${mh.map(f=>h[f]).join("")}</div>`}const fh=Object.freeze(["partyline","board","livechat","servers"]),vh={partyline:{title:"Party Line",kicker:"Voice + chat rooms",detail:"Drop-in group voice lines with chat. Coming soon — needs Safety review and the backend.",soon:!0},board:{title:"Message Board",kicker:"Public posts & replies",detail:"Short posts, replies and reposts from the community · TEST MODE",href:"#/posts"},livechat:{title:"Live Chat Room",kicker:"Chat during streams",detail:"Chat alongside live rooms · TEST MODE preview",href:"#/live"},servers:{title:"Community Servers",kicker:"Servers & channels",detail:"PIKK Lounge channel rooms and topic communities · TEST MODE",href:"#/community",extra:["#/communities","Browse communities"]}};function bh(){return`<section class="pikk-hub" id="home-hub" aria-label="PIKK community">${fh.map(t=>{const s=vh[t],a=`<p class="kicker">${l(s.kicker)}</p><h3>${l(s.title)}</h3><p>${l(s.detail)}</p>`;return s.soon?`<div class="card pikk-hub-card is-soon" id="home-${t}" data-hub="${t}" data-coming-soon role="button" tabindex="0">${a}<span class="chip">Coming soon</span></div>`:`<div class="card pikk-hub-card" id="home-${t}" data-hub="${t}">${a}<div class="row wrap"><a class="btn primary" href="${s.href}">Open ${l(s.title)}</a>${s.extra?`<a class="btn ghost" href="${s.extra[0]}">${l(s.extra[1])}</a>`:""}</div></div>`}).join("")}</section>`}typeof document<"u"&&document.addEventListener("click",e=>{var i,n,r,o;const t=(n=(i=e.target).closest)==null?void 0:n.call(i,"[data-psv]");if(!t)return;const s=(r=t.closest(".pikk-psv"))==null?void 0:r.querySelector("[data-psv-track]");if(!s)return;const a=((o=s.querySelector(".pikk-psv-slide"))==null?void 0:o.getBoundingClientRect().width)||240;s.scrollBy({left:Number(t.dataset.psv)*(a+12),behavior:"smooth"})});const yh={Explore:"🧭","Shorts / Clips":"▶",Music:"🎵",Videos:"🎬",Posts:"📸",Live:"🔴","PIKK Lounge":"💬",Vault:"🔐",Marketplace:"🛍️",Missions:"🎯"},_a=[{id:"toplive",label:"Top live"},{id:"videos",label:"Videos"},{id:"rising",label:"Rising"},{id:"hot",label:"Hot lives"},{id:"songs",label:"Songs"}],kh=8e3,In="dbs_home_stage_v2",Sh=["dbs_home_stage"],sc='<span class="chip pikk-example-tag" title="Example data · not real viewers">Example</span>';function ac(e){const t=Number(e)||0;return t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)}k`:String(t)}function oa(e){return e?!!(e.house||e.hostId==="dbs"||e.hostName==="DatBoiSkeet"):!1}function Ar(e){return e?!!(e.house||e.userId==="dbs"||e.username==="DatBoiSkeet"):!1}function wh(e=3){const t=gs(),s=t.filter(n=>!oa(n)),a=t.filter(n=>oa(n)),i=s.slice(0,Math.max(2,e-1));for(a[0]&&i.push(a[0]);i.length<e&&s[i.filter(n=>!oa(n)).length];){const n=s[i.filter(r=>!oa(r)).length];if(!n||i.includes(n))break;i.push(n)}return i.slice(0,e)}function $h(e=4){const t=yl(Math.max(8,e+4)),s=t.filter(n=>!Ar(n)),a=t.filter(n=>Ar(n)),i=[...s.slice(0,3)];a[0]&&i.push(a[0]);for(const n of s.slice(3)){if(i.length>=e)break;i.includes(n)||i.push(n)}for(const n of a.slice(1)){if(i.length>=e)break;i.includes(n)||i.push(n)}return i.slice(0,e)}function ic(){const e=P().live,t=gs().map(s=>({...s}));if(e&&!e.endedAt){const s=Math.max(0,Number(e.viewers)||0),a=Math.max(0,Number(e.giftsTotal)||0);t.push({id:e.id||"session",hostId:e.hostId,hostName:e.hostName||"Creator",title:e.title||"Live now",viewers:s,giftsTotal:a,score:s+a*20,house:e.hostId==="dbs"||e.hostName==="DatBoiSkeet"})}return t.sort((s,a)=>(Number(a.viewers)||0)-(Number(s.viewers)||0)||(Number(a.score)||0)-(Number(s.score)||0)),t[0]||null}function Sa(e,{rising:t=!1}={}){const s=e.house?"House":t?"Rising":"Hot",a=Number(e.viewers)||0,i=ac(a),n=t&&e.playbacksToday!=null?` · ~${l(String(e.playbacksToday))} playbacks today`:"";return`
    <a class="home-live-card" href="#/live">
      <div class="live-hoodie" aria-hidden="false">
        <span class="live-hoodie-pill">LIVE</span>
        <span class="live-hoodie-viewers" title="${l(i)} watching · example">${l(i)}</span>${sc}
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
    </a>`}function Eh(e){return e.mediaType==="video"?"Video":e.image||e.mediaType==="image"?"Pic":"Post"}function xh(e){if(!e)return"";const t=Number(e.playsToday)||0,s=t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)}k`:String(t),a=e.cover?`<img class="la-thumb" src="${l(e.cover)}" alt="" loading="lazy" />`:'<span class="la-thumb la-thumb-empty" aria-hidden="true">♪</span>',i=e.demo?" · DEMO seed":"";return`
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
    </li>`}function Ah(e){const t=Number(e.viewers)||0,s=ac(t),a=e.house?"House":"Hot";return`
    <li class="la-row la-live">
      <a class="la-main" href="#/live">
        <span class="la-hoodie" aria-label="Live · ${l(s)} watching (example data)">
          <span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span>
          <span class="live-hoodie-viewers">${l(s)}</span>${sc}
        </span>
        <span class="la-body">
          <strong>@${l(e.hostName)}</strong>
          <span class="la-preview">${l(e.title||"Live now")}</span>
          <span class="la-stats muted">${l(s)} watching (example) · ${l(String(e.giftsTotal||0))} gifts · score ${l(String(e.score||0))}</span>
        </span>
      </a>
      <span class="chip">${l(a)}</span>
    </li>`}function Ch(e){const t=e.postId||e.id,s=Eh(e),a=e.image?`<img class="la-thumb" src="${l(e.image)}" alt="" loading="lazy" />`:`<span class="la-thumb la-thumb-empty" aria-hidden="true">${l(((e.username||"?")[0]||"?").toUpperCase())}</span>`,i=e.house?" · house":"";return`
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
    </li>`}function Th(e){const t=e.coverRef&&!String(e.coverRef).startsWith("idb:")?e.coverRef:"";return`
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
    </li>`}function Mh(){for(const e of Sh){try{sessionStorage.removeItem(e)}catch{}try{localStorage.removeItem(e)}catch{}}try{localStorage.removeItem(In)}catch{}}function nc(){Mh();try{const e=sessionStorage.getItem(In);if(_a.some(t=>t.id===e))return e}catch{}return"toplive"}function Dh(e){try{sessionStorage.setItem(In,e)}catch{}}function qa(e){return"$"+Number(e||0).toLocaleString(void 0,{maximumFractionDigits:2})}function Ph(e){const t=Math.max(0,e-Date.now()),s=Math.floor(t/36e5),a=Math.floor(t%36e5/6e4);return t<=0?"Ended":`${s}h ${a}m left`}function Lh(e){const t=e?Math.min(100,Math.round(e.raised/(e.targetAmount||1)*100)):0;return`<a class="home-goal-slim" id="home-app-goal" href="#/donate" aria-label="PIKK daily goal ${t}% funded. Open Donate">
    <span class="home-goal-slim-label"><strong>PIKK goal</strong><small>${e?`${qa(e.raised)} of ${qa(e.targetAmount)} · TEST MODE`:"No goal today"}</small></span>
    <span class="home-goal-slim-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${t}"><span style="width:${t}%"></span></span>
    <span class="btn primary home-goal-slim-btn">Donate</span>
  </a>`}function rc(e){if(!e)return'<p class="muted" style="margin:0">No daily app goal right now.</p>';const t=Math.min(100,Math.round(e.raised/(e.targetAmount||1)*100));return`
    <div class="home-goal-head"><strong class="home-goal-name">${l(e.name)}</strong>
      <span class="chip home-goal-time" id="homeGoalTimeLeft">${Ph(e.endsAt)}</span></div>
    <div class="home-goal-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${t}">
      <div class="home-goal-fill" style="width:${t}%"></div></div>
    <p class="muted home-goal-amounts" style="margin:6px 0 10px">${qa(e.raised)} raised of ${qa(e.targetAmount)} · ${t}%</p>
    <div class="row wrap" style="gap:8px">
      ${[50,100,250].map(s=>`<button type="button" class="btn ghost home-goal-donate" data-goal-id="${l(e.id)}" data-coins="${s}">Donate ${s} coins</button>`).join("")}
      <form class="home-goal-custom-form" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;align-items:end">
        <label style="flex:1;min-width:125px">Custom coins
          <input class="home-goal-custom-coins" type="number" inputmode="numeric" min="1" max="1000000" step="1" required placeholder="Enter coins" style="width:100%" />
        </label>
        <button type="submit" class="btn primary">Donate custom</button>
      </form>
    </div>`}function Ih(){var Pe;const e=md.map(A=>`
    <a class="preview-card" href="#${A.route}${A.hash?"#"+A.hash:""}">
      <span class="pc-icon" aria-hidden="true">${yh[A.title]||"◆"}</span>
      <strong>${l(A.title)}</strong>
      <span class="muted">${l(A.blurb)}</span>
    </a>`).join(""),t=Xt.map(A=>`
    <a class="cover-card" href="#/music">
      <div class="cover-frame">
        <span class="badge-cs">${l(A.status)}</span>
        <img src="${l(A.cover)}" alt="${l(A.title)}" loading="lazy" />
      </div>
      <div class="t">${l(A.title)}</div>
      <div class="sub">${l(A.artist)}</div>
    </a>`).join(""),s=ue.filter(A=>(A.category||"Music Videos")==="Music Videos"),a=s.filter(A=>A.featured),i=a.length?a:s.slice(0,6),n=i[0]||s[0]||ue[0],r=an[0];i.map(A=>`
    <div class="vid">
      <a class="thumb" href="${l(A.youtube)}" target="_blank" rel="noopener" aria-label="Play ${l(A.title)}"><span>▶</span></a>
      <div>
        <strong>${l(A.title)}</strong>
        <div class="muted" style="font-size:12px;margin-top:4px">
          <a href="${l(A.youtube)}" target="_blank" rel="noopener">Watch on YouTube</a>
          · <a href="#/videos">Embed on Videos</a>
        </div>
      </div>
    </div>`).join("");const o=i.map((A,we)=>`
    <button type="button" class="mv-pick${we===0?" on":""}" data-embed="${l(A.embed)}" data-title="${l(A.title)}" data-yt="${l(A.youtube)}">
      <span class="mv-pick-play" aria-hidden="true">▶</span>
      <span class="mv-pick-t">${l(A.title)}</span>
    </button>`).join("");r&&`${l(at(r.embed))}${l(r.title)}${l(r.youtube)}`;const d=qt({publishedOnly:!0,types:["picture"]}).map(A=>`
    <div class="cover-card catalog-admin-home" data-id="${l(A.id)}">
      <div class="cover-frame">
        <span class="badge-cs">From Admin</span>
        <img data-idb-src="${l(A.coverRef&&A.coverRef.startsWith("idb:")?A.coverRef:"")}" src="${l(A.coverRef&&!A.coverRef.startsWith("idb:")?A.coverRef:"")}" alt="${l(A.title)}" loading="lazy" />
      </div>
      <div class="t">${l(A.title)}</div>
      <div class="sub">${l(A.artist)}</div>
    </div>`).join("");qt({publishedOnly:!0,types:["video"]}).slice(0,3).map(A=>`
    <div class="vid catalog-admin-home" data-id="${l(A.id)}">
      <a class="thumb" href="${l(A.youtube||"#/videos")}" ${A.youtube?'target="_blank" rel="noopener"':""}><span>▶</span></a>
      <div>
        <strong>${l(A.title)}</strong>
        <div class="muted" style="font-size:12px;margin-top:4px">${l(A.artist)} · Admin</div>
      </div>
    </div>`).join("");const m=P().live,h=m&&!m.endedAt?`<li class="la-row la-session"><a class="la-main" href="#/live"><span class="la-hoodie" aria-label="Live now"><span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span><span class="live-hoodie-viewers">Demo · no real viewers</span></span><span class="la-body"><strong>@${l(m.hostName)}</strong><span class="la-preview">${l(m.title||"Live now")}</span><span class="la-stats muted">${l(String(m.viewers||0))} watching · your session</span></span></a><span class="chip">Live</span></li>`:"",f=wl(),v=xh(f),b=wh(3),y=$h(4),k=qt({publishedOnly:!0,types:["picture"]}).slice(0,2),w=b.map(Ah).join(""),x=y.map(Ch).join(""),S=k.map(Th).join(""),N=`${v}${h}${w}${x}${S}
        <li class="la-row la-kicker"><span class="la-main la-kicker-main"><span class="la-body"><strong>Ladies Only</strong><span class="la-preview">Art live on Music · playback when it drops</span></span></span><span class="chip">Music</span></li>
        <li class="la-row la-kicker"><a class="la-main" href="#/restream"><span class="la-body"><strong>PIKK Restream</strong><span class="la-preview">Stream to YouTube, TikTok, Twitch &amp; more — free inside PIKK</span></span></a><span class="chip">Restream</span></li>${!v&&!w&&!x&&!S&&!h?'<li class="la-row"><span class="la-main la-kicker-main"><span class="la-body"><span class="la-preview muted">No hot activity yet — engage on Posts / go Live to spike the feed.</span></span></span><span class="chip">TEST</span></li>':""}`,$=nc(),H=_a.map(A=>`
    <button type="button" class="home-stage-tab${A.id===$?" on":""}" role="tab"
      aria-selected="${A.id===$?"true":"false"}" data-stage="${A.id}" id="stage-tab-${A.id}">
      ${l(A.label)}
    </button>`).join(""),M=gs().slice(0,5),B=cm().slice(0,5),G=M.map(A=>Sa(A)).join("")||'<p class="muted">No hot lives yet — seed from Live / Hot Feed.</p>',D=B.map(A=>Sa(A,{rising:!0})).join("")||'<p class="muted">No rising streamers yet.</p>',O=Xt.map(A=>`
    <a class="home-song-card" href="#/music">
      <img src="${l(A.cover)}" alt="" loading="lazy" />
      <div>
        <strong>${l(A.title)}</strong>
        <div class="muted" style="font-size:12px">${l(A.artist)} · ${l(A.status)}</div>
        <span class="chip" style="margin-top:6px">Enhancement · Coming Soon</span>
      </div>
    </a>`).join(""),R=ic(),ie=R?Sa(R):'<p class="muted">No live streams right now — go Live or check Hot Feed.</p>',ke=`
    <div class="home-stage-panel${$==="toplive"?" on":""}" data-panel="toplive" role="tabpanel" id="homeTopLivePanel" ${$==="toplive"?"":"hidden"}>
      <p class="muted home-stage-lead">Top live · highest viewers right now. Red LIVE hoodie on the card · updates as rankings change.</p>
      <div class="home-live-grid" id="homeTopLiveGrid">${ie}</div>
      <a class="btn ghost block" href="#/live" style="margin-top:10px">Open Live</a>
    </div>`,W=`
    <div class="home-stage-panel${$==="videos"?" on":""}" data-panel="videos" role="tabpanel" ${$==="videos"?"":"hidden"}>
      <div class="hero-video" id="homeFeaturedVideo">
        <iframe
          id="homeFeaturedIframe"
          src="${l(at(n.embed))}"
          title="${l(n.title)}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          loading="lazy"></iframe>
      </div>
      <div class="hero-caption">
        <strong id="homeFeaturedTitle">${l(n.title)}</strong>
        <a href="#/videos">All videos →</a>
      </div>
      <div class="mv-carousel" role="tablist" aria-label="Official music videos">${o}</div>
    </div>`,ne=`
    <div class="home-stage-panel${$==="rising"?" on":""}" data-panel="rising" role="tabpanel" ${$==="rising"?"":"hidden"}>
      <p class="muted home-stage-lead">Rising streamers · mid-tier creators from §38 Hot Feed signals (non-house). TEST MODE seeds.</p>
      <div class="home-live-grid">${D}</div>
      <a class="btn ghost block" href="#/live" style="margin-top:10px">Open Live</a>
    </div>`,Se=`
    <div class="home-stage-panel${$==="hot"?" on":""}" data-panel="hot" role="tabpanel" ${$==="hot"?"":"hidden"}>
      <p class="muted home-stage-lead">Hot lives · ranked by viewers + gifts score (house OK). Strong playbacks / spikes from earlier today count.</p>
      <div class="home-live-grid">${G}</div>
      <a class="btn ghost block" href="#/live" style="margin-top:10px">Open Live</a>
    </div>`,Y=`
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
    </div>`,De=`
    <div class="home-stage card" id="homeFeaturedStage" data-active="${l($)}">
      <div class="home-stage-head">
        <div>
          <p class="kicker" style="margin:0">Featured stage</p>
          <h2 class="home-stage-title">Top live · Videos · Rising · Hot · Songs</h2>
        </div>
        <span class="chip chip-audit">TEST MODE · auto-cycle</span>
      </div>
      <div class="home-stage-tabs" role="tablist" aria-label="Featured stage">${H}</div>
      <div class="home-stage-panels">
        ${ke}
        ${W}
        ${ne}
        ${Se}
        ${Y}
      </div>
    </div>`,Qe=`
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
    </div>`,xt=Lh(Aa()),At=i.slice(0,6).map((A,we)=>{const vs=new URL(A.youtube).searchParams.get("v")||"",bs=vs?`https://i.ytimg.com/vi/${encodeURIComponent(vs)}/hqdefault.jpg`:"";return`<a class="pikk-home-media-card ${we<2?"is-featured":""}" href="${l(A.youtube)}" target="_blank" rel="noopener noreferrer"
       aria-label="Watch ${l(A.title)} on YouTube">
       ${bs?`<img src="${l(bs)}" alt="" loading="${we<2?"eager":"lazy"}" decoding="async" referrerpolicy="no-referrer"/>`:'<span class="pikk-home-media-fallback" aria-hidden="true">♫</span>'}
       <span class="pikk-home-media-shadow"></span>
       <span class="pikk-home-media-badge">▶ OFFICIAL VIDEO</span>
       <span class="pikk-home-media-title">${l(A.title)}</span>
     </a>`}).join(""),rt=[...st.map(A=>A.cover),...Xt.slice(0,4).map(A=>A.cover)].filter(Boolean),Ct=[{label:"For You",href:"#/explore"},{label:"Following",href:"#/posts"},{label:"Music",href:"#/music"},{label:"Nearby",href:"#/connect"},{label:"Live",href:"#/live"}].map((A,we)=>`
    <a class="pikk-home-circle" href="${A.href}" aria-label="Open ${l(A.label)}">
      <span class="pikk-home-circle-ring">${rt[we]?`<img src="${l(rt[we])}" alt="" loading="lazy" decoding="async"/>`:'<span aria-hidden="true">●</span>'}</span>
      <small class="pikk-rail-tag">${l(Dm(A))}</small>
      <span>${l(A.label)}</span>
    </a>`).join(""),X=`
    <section class="pikk-home-visual" id="pikkHomeVisual" aria-labelledby="pikkHomeVisualTitle">
      <div class="pikk-home-visual-top">
        <div><p class="kicker">PIKK DISCOVER</p><h2 id="pikkHomeVisualTitle">Your music. Your world.</h2></div>
        <a href="#/explore" class="pikk-home-visual-more">Explore ↗</a>
      </div>
      <nav class="pikk-home-circle-strip" aria-label="Browse PIKK features">
        <a class="pikk-home-circle pikk-home-circle-me" href="#/posts?compose=1" aria-label="Create a post on PIKK">
          <span class="pikk-home-circle-ring">${(Pe=P().user)!=null&&Pe.avatar?`<img src="${l(P().user.avatar)}" alt="" loading="lazy" decoding="async"/>`:'<span class="pikk-home-circle-avatar" aria-hidden="true"><svg viewBox="0 0 24 24" width="40" height="40"><circle cx="12" cy="8.5" r="4" fill="currentColor"/><path d="M4 21c1.4-4.2 4.6-6.3 8-6.3s6.6 2.1 8 6.3" fill="currentColor"/></svg></span>'}</span>
          <span class="pikk-home-circle-plus" aria-hidden="true">+</span><span>Create</span>
        </a>
        ${Ct}
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
        ${At}
      </div>
      <div class="pikk-home-media-footer">
        <p class="muted">Real official releases · Video thumbnails from YouTube · No fabricated views or live counts</p>
        <a href="#/videos">View all videos →</a>
      </div>
    </section>`,Ae=`
    ${xt}
    ${X}
    ${De}
    ${gh()}
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



    ${Qe}

    <section class="home-arcade card" id="homeArcade" aria-label="PIKK Games featured slideshow">
      <div class="home-arcade-top">
        <div><p class="kicker">Discover the arcade</p><h2>15 GAMES. ONE PIKK.</h2></div>
        <a href="#/games" class="btn ghost">All games →</a>
      </div>
      <div class="home-arcade-stage" aria-live="off">
        ${Ve.map((A,we)=>`<article class="home-arcade-slide pikk-game-${l(A.theme)}" data-game-slide="${we}" ${we?"hidden":""}>
          <div class="home-arcade-image">${A.artwork?`<img src="${l(Gs(A))}" alt="" loading="lazy" decoding="async" />`:`<span class="home-arcade-symbol" aria-hidden="true">${A.icon}</span>`}</div>
          <div class="home-arcade-info">
            <span class="chip">GAME ${we+1} OF 15 · COMING SOON</span>
            <h3>${l(A.name)}</h3>
            <p>${l(A.description)}</p>
            <small>${l(A.players)} ${A.players==="1"?"Player":"Players"} · Preview only</small>
            <a class="btn primary" href="${l(A.href||"#/games")}">View in Arcade</a>
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
    <div class="cover-row" style="margin-bottom:18px">${t}${d}</div>

    <p class="kicker">DatBoiSkeet Network</p>
    <h2 style="margin:0 0 8px;font-size:15px;text-transform:uppercase;letter-spacing:.04em">Explore PIKK</h2>
    <div class="section-swipe" style="margin-bottom:18px">${e}</div>

    ${bh()}

    <div class="card live-activity" id="home-live-activity">
      <div class="live-activity-head">
        <h3><span class="dot" aria-hidden="true"></span> Live activity</h3>
        <span class="chip">TEST MODE</span>
      </div>
      <p class="muted live-activity-lead">Most played today · hot lives · high-engagement posts from creators &amp; community · house updates.</p>
      <ul class="list-plain live-activity-list">
        ${N}
      </ul>
      <div class="row wrap live-activity-links">
        <a class="btn ghost" href="#/music">Music</a>
        <a class="btn ghost" href="#/live">Live</a>
        <a class="btn ghost" href="#/posts">Posts · Hot</a>
      </div>
    </div>
  `;return L("Home",Ae,{lead:"Featured stage · PIKK Match Up (TEST MODE) · creator sell DEMO · PIKK Arcade · Party Line · message board · live chat · community servers · live activity."})}function Oh(e){var N,$,H,M,B,G;const t=e.querySelector("#homeArcade");if(t){const D=[...t.querySelectorAll("[data-game-slide]")],O=t.querySelector("#homeArcadePosition");let R=0,ie=null;const ke=($=(N=window.matchMedia)==null?void 0:N.call(window,"(prefers-reduced-motion: reduce)"))==null?void 0:$.matches,W=Y=>{R=(Y+D.length)%D.length,D.forEach((De,Qe)=>{De.hidden=Qe!==R}),O&&(O.textContent=`${R+1} / ${D.length}`)},ne=()=>{ie!==null&&clearInterval(ie),ie=null};(H=t.querySelector("[data-arcade-prev]"))==null||H.addEventListener("click",()=>{ne(),W(R-1)}),(M=t.querySelector("[data-arcade-next]"))==null||M.addEventListener("click",()=>{ne(),W(R+1)}),ke||(ie=setInterval(()=>{if(!document.body.contains(t)){ne();return}document.visibilityState==="visible"&&W(R+1)},6500));const Se=new MutationObserver(()=>{document.body.contains(t)||(ne(),Se.disconnect())});Se.observe(document.body,{childList:!0,subtree:!0})}oc(e),ph(e);const s=e.querySelector(".page-head");if(s){s.querySelectorAll(".badge-phase, a.badge-phase, .live-hoodie-pill, .live-hoodie").forEach(O=>{O.remove()}),s.querySelectorAll("a, span, button").forEach(O=>{const R=(O.textContent||"").replace(/\s+/g," ").trim();(/^●?\s*LIVE$/i.test(R)||R==="LIVE")&&O.remove()});const D=s.querySelector("h1");D&&[...D.children].forEach(O=>{const R=(O.textContent||"").replace(/\s+/g," ").trim();(/LIVE/i.test(R)||O.classList.contains("badge-phase")||O.classList.contains("live-hoodie-pill"))&&O.remove()})}e.querySelectorAll("[data-idb-src]").forEach(async D=>{const O=D.getAttribute("data-idb-src");if(!O)return;const R=await li(O);R&&(D.tagName==="IMG"||D.tagName==="VIDEO"||D.tagName==="AUDIO")&&(D.src=R)});const a=e.querySelector("#homeFeaturedIframe"),i=e.querySelector("#homeFeaturedTitle");e.querySelectorAll(".mv-pick").forEach(D=>{D.addEventListener("click",()=>{e.querySelectorAll(".mv-pick").forEach(R=>R.classList.remove("on")),D.classList.add("on");const O=D.dataset.embed||"";a&&O&&(Jm(a),a.removeAttribute("data-dbs-yt-bound"),a.src=O+(O.includes("?")?"&":"?")+"rel=0",a.title=D.dataset.title||"",Ql(a)),i&&(i.textContent=D.dataset.title||"")})}),oi(e);const n=e.querySelector("#bwPreviewVideo"),r=e.querySelector("#bwPreviewPlay");if(n){const D=()=>{if(!r)return;const O=n.paused||n.ended;r.hidden=!O,r.setAttribute("aria-hidden",O?"false":"true")};r==null||r.addEventListener("click",O=>{O.preventDefault(),n.play().catch(()=>{})}),n.addEventListener("play",()=>{is(),D()}),n.addEventListener("pause",()=>{it(),D()}),n.addEventListener("ended",()=>{it(),D()}),n.addEventListener("pointerdown",()=>{n.paused||is()}),D()}const o=2e4;function c(){const D=e.querySelector("#homeTopLiveGrid");if(!D||!document.body.contains(D))return!1;const O=ic();return D.innerHTML=O?Sa(O):'<p class="muted">No live streams right now — go Live or check Hot Feed.</p>',!0}let d=setInterval(()=>{c()||(clearInterval(d),d=null)},o);const p=()=>{document.visibilityState==="visible"&&c()};document.addEventListener("visibilitychange",p),window.addEventListener("focus",c);const m=e.querySelector("#homeFeaturedStage");if(!m){const D=new MutationObserver(()=>{document.body.contains(e)||(d&&clearInterval(d),document.removeEventListener("visibilitychange",p),window.removeEventListener("focus",c),D.disconnect())});D.observe(document.body,{childList:!0,subtree:!0});return}const h=[...e.querySelectorAll(".home-stage-tab")],f=[...e.querySelectorAll(".home-stage-panel")];let v=!1,b=null;const y=typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||document.documentElement.classList.contains("reduce-motion")||((G=(B=document.body)==null?void 0:B.classList)==null?void 0:G.contains("reduce-motion"));function k(D){_a.some(O=>O.id===D)||(D="toplive"),m.dataset.active=D,Dh(D),h.forEach(O=>{const R=O.dataset.stage===D;O.classList.toggle("on",R),O.setAttribute("aria-selected",R?"true":"false")}),f.forEach(O=>{const R=O.dataset.panel===D;O.classList.toggle("on",R),R?O.removeAttribute("hidden"):O.setAttribute("hidden","")})}function w(){const D=_a.map(ie=>ie.id),O=m.dataset.active||"toplive",R=D.indexOf(O);k(D[(R+1)%D.length])}function x(){S(),!(v||y)&&(b=setInterval(w,kh))}function S(){b&&(clearInterval(b),b=null)}h.forEach(D=>{D.addEventListener("click",()=>{v=!0,S(),k(D.dataset.stage)})});const T=nc()||"toplive";k(T),y||setTimeout(()=>{!document.body.contains(m)||v||x()},1e4);const _=new MutationObserver(()=>{document.body.contains(m)||(S(),d&&(clearInterval(d),d=null),document.removeEventListener("visibilitychange",p),window.removeEventListener("focus",c),_.disconnect())});_.observe(document.body,{childList:!0,subtree:!0})}function oc(e){const t=e.querySelector("#homeAppGoalBody");if(t){const s=()=>{document.body.contains(t)?t.innerHTML=rc(Aa()):(clearInterval(i),document.removeEventListener("visibilitychange",a))},a=()=>{document.visibilityState==="visible"&&s()},i=setInterval(s,3e4);document.addEventListener("visibilitychange",a),t.addEventListener("submit",n=>{var d,p;if(!n.target.matches(".home-goal-custom-form"))return;n.preventDefault();const r=Number((d=n.target.querySelector(".home-goal-custom-coins"))==null?void 0:d.value);if(!Number.isSafeInteger(r)||r<1||r>1e6)return g("Enter 1–1,000,000 whole coins");const o=(p=Aa())==null?void 0:p.id,c=Ca(o,r);g(c!=null&&c.ok?"Custom donation sent · TEST MODE":(c==null?void 0:c.error)==="insufficient"?"Not enough demo coins":(c==null?void 0:c.error)==="signin"?"Sign in first":"Donation unavailable · TEST MODE"),s()}),t.addEventListener("click",n=>{const r=n.target.closest(".home-goal-donate");if(!r)return;const o=Ca(r.dataset.goalId,Number(r.dataset.coins));g(o&&o.ok?`TEST MODE · ${r.dataset.coins} coins donated (no real payment)`:"TEST MODE · donate unavailable"),s()})}}const _h="172e64b82e524337dcb24cf3d0d6a5c8bd787825",qh=Object.freeze([{title:"Support: Find Answers Faster",detail:"Search help guides with live match counts, clear your search by button or Escape, and browse consistent guide links. Tickets remain saved only on this device; AI agents are not connected.",route:"#/support",pr:276,kind:"SUPPORT · HELP CENTER"},{title:"Support: Accurate Saved-Draft Feedback",detail:"Saving an identical local ticket draft now says it was already saved rather than implying a new support request was submitted. No ticket is sent to staff.",route:"#/support",pr:274,kind:"SUPPORT · LOCAL DRAFTS"},{title:"Support: No Duplicate Drafts",detail:"Repeated saves of the same support issue no longer create duplicate browser-local drafts. Distinct issues can still be saved separately.",route:"#/support",pr:272,kind:"SUPPORT · LOCAL DRAFTS"},{title:"Communities: Accessible Reply Threads",detail:"After posting a local reply, the conversation stays expanded and keyboard focus returns to the correct thread control. Public community hosting is not connected.",route:"#/communities",pr:271,kind:"COMMUNITIES · ACCESSIBILITY"},{title:"Profile: Reliable Member Links",detail:"Follower, following and public-profile links now safely handle usernames and profile IDs containing reserved characters. Account data remains browser-local.",route:"#/profile",pr:270,kind:"PROFILE · NAVIGATION"}]);function Nh(){const e=_h.slice(0,8),t=qh.map((s,a)=>`
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
    </article>`).join("");return L("PIKK Updates",`
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
      <div class="pikk-updates-hero-mark"><img src="${l(ut("brand/pikk-logo-official.png"))}" alt="PIKK official chrome logo" loading="eager"></div>
    </section>
    <section class="pikk-updates-list" aria-label="Recent published updates">
      <h2>Latest verified improvements</h2>
      ${t}
    </section>
    <p class="pikk-updates-note">A refresh reloads this browser's app bundle; it does not clear your account or local demo data. If a change still does not appear, compare the version above with the published source commit.</p>
  `,{lead:"A clear record of recent PIKK improvements."})}function Rh(e){var t;(t=e.querySelector("#pikkUpdatesRefresh"))==null||t.addEventListener("click",()=>{window.location.assign(ho(window.location.href))})}const Bh=20*60,Kh=250*1024*1024;function jh({duration:e,size:t,type:s}){return s!=null&&s.startsWith("video/")?!Number.isFinite(t)||t<=0||t>Kh?"Video must be under 250 MB for this device-local preview.":!Number.isFinite(e)||e<=0?"Unable to read video duration. Try another file.":e>Bh?"PIKKUP Phase 1 videos must be 20 minutes or shorter.":"":"Select a supported video file."}function Fh(e){return new Promise((t,s)=>{const a=URL.createObjectURL(e),i=document.createElement("video");let n=!1;const r=setTimeout(()=>o(new Error("Video metadata timed out")),12e3);function o(c,d){n||(n=!0,clearTimeout(r),i.removeAttribute("src"),i.load(),URL.revokeObjectURL(a),c?s(c):t(d))}i.preload="metadata",i.onloadedmetadata=()=>o(null,i.duration),i.onerror=()=>o(new Error("Cannot read this video file")),i.src=a})}const lc=[{id:"song",label:"Song",acceptCover:"image/*",acceptMedia:"audio/*,.mp3,.m4a,.wav,.aac"},{id:"album",label:"Album",acceptCover:"image/*",acceptMedia:"audio/*,.mp3,.m4a,.wav,.aac"},{id:"video",label:"Video",acceptCover:"image/*",acceptMedia:"video/*,.mp4,.mov,.webm"},{id:"picture",label:"Picture",acceptCover:"image/*",acceptMedia:"image/*"}];function Gh(e){return L("Admin",`<div class="card admin-gate">
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
    <div class="card muted">Full team roles, revenue, and moderation ship later phases.</div>`,{lead:"Gated demo dashboard."})}function Uh(){return`
  <section class="card admin-add" id="adminAdd">
    <h3>Add Content</h3>
    <p class="muted admin-add-note">PIKKUP preview: video uploads must be 20 minutes or shorter and at most 250 MB. Device-local only, not public hosting. TEST MODE · no backend. Metadata → <code>localStorage dbs_v1.catalog</code>. Files → IndexedDB <code>dbs_media_v1</code>. Works on iPhone Safari &amp; desktop. Large files stay on this device only.</p>

    <div class="admin-type-tabs" role="tablist" aria-label="Content type">${lc.map((t,s)=>`<button type="button" class="admin-type-tab${s===0?" on":""}" data-type="${l(t.id)}" role="tab">${l(t.label)}</button>`).join("")}</div>

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
  </section>`}function Hh(e){if(!e.length)return'<div class="card admin-catalog"><h3>Catalog</h3><p class="muted">No admin-added items yet.</p></div>';const t=e.map(s=>{const a=s.coverRef&&!s.coverRef.startsWith("idb:")?l(s.coverRef):"";return`<div class="admin-catalog-row" data-id="${l(s.id)}">
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
    <div class="admin-catalog-list">${t}</div></div>`}function Ge(e){return"$"+(Number(e)||0).toFixed(2)}function Vh(e){var i,n,r;const t=((i=e.openMic)==null?void 0:i.pending)||[],s=((n=e.openMic)==null?void 0:n.byStatus)||{},a=t.length?t.map(o=>`<div class="row wrap admin-om-row" data-om-id="${l(o.id)}">
            <span class="spacer"><strong>${l(o.username)}</strong> · ${l(o.talent)} · ${l(o.trackTitle)}
              <span class="chip">pending</span>
              ${o.rightsCertified?'<span class="chip">rights</span>':'<span class="chip">no rights</span>'}
            </span>
            <button type="button" class="btn primary admin-om" data-id="${l(o.id)}" data-status="approved">Approve</button>
            <button type="button" class="btn ghost admin-om" data-id="${l(o.id)}" data-status="rejected">Reject</button>
          </div>`).join(""):'<p class="muted">No pending applications. Seeded demos may already be approved/rejected — open <a href="#/openmic">Open Mic</a>.</p>';return`<section class="card admin-openmic" id="adminOpenMic">
    <h3>Open Mic queue</h3>
    <p class="muted">TEST MODE · reuse store Approve/Reject. Pending ${s.pending||0} · approved ${s.approved||0} · rejected ${s.rejected||0} · total ${((r=e.openMic)==null?void 0:r.total)||0}</p>
    ${a}
    <p class="admin-panel-links"><a class="btn" href="#/openmic">Full Open Mic page</a></p>
  </section>`}function zh(e){const t=e.fanClubs||{total:0,recent:[]},s=t.recent.length?`<ul class="list-plain">${t.recent.map(a=>`<li><span><strong>${l(a.name)}</strong> · ${l(a.privacy)}${a.official?" · official":""}</span><span class="muted">${a.memberCount} members</span></li>`).join("")}</ul>`:'<p class="muted">No clubs yet.</p>';return`<section class="card admin-fanclubs" id="adminFanClubs">
    <h3>Fan Clubs glance</h3>
    <div class="stats">
      <div><strong>${t.total}</strong><span>Clubs</span></div>
    </div>
    ${s}
    <p class="admin-panel-links"><a class="btn" href="#/fanclubs">Open Fan Clubs</a></p>
  </section>`}function Wh(e){const t=e.loyalty||{},s=(t.badges||[]).slice(0,6).map(a=>`<span class="chip">${l(a)}</span>`).join(" ")||'<span class="muted">None unlocked</span>';return`<section class="card admin-loyalty" id="adminLoyalty">
    <h3>Loyalty glance</h3>
    <p class="muted">${l(t.note||"Device-local loyalty")}</p>
    <div class="stats">
      <div><strong>${t.points||0}</strong><span>Points</span></div>
      <div><strong>${t.badgeCount||0}</strong><span>Badges</span></div>
      <div><strong>${t.historyCount||0}</strong><span>Actions</span></div>
    </div>
    <p class="admin-badge-row">${s}</p>
    <p class="admin-panel-links"><a class="btn" href="#/loyalty">Open Loyalty Club</a></p>
  </section>`}function Yh(){return`<section class="card admin-quicklinks" id="adminQuickLinks">
    <h3>Quick links</h3>
    <p class="muted">Deep-links only · page ownership stays with Live Social / Commerce / Build.</p>
    ${[{owner:"Live Social",links:[["#/live","Live"],["#/messages","Messages"],["#/giftbattles","Gift battles"],["#/multiguest","Multi-guest"],["#/spotlight","Spotlight"],["#/restream","Restream"],["#/connect","Connect"]]},{owner:"Commerce",links:[["#/marketplace","Marketplace"],["#/wallet","Wallet"],["#/earnings","Earnings"],["#/missions","Missions"],["#/share","Share & Earn"],["#/refer","Refer & Earn"]]},{owner:"Build",links:[["#/explore","Explore"],["#/notifications","Notifications"],["#/fanclubs","Fan Clubs"],["#/loyalty","Loyalty"],["#/openmic","Open Mic"]]}].map(s=>{const a=s.links.map(([i,n])=>`<a class="btn ghost admin-qlink" href="${i}">${l(n)}</a>`).join("");return`<div class="admin-ql-group"><span class="chip">${l(s.owner)}</span><div class="admin-ql-row">${a}</div></div>`}).join("")}
  </section>`}function Jh(e){const t=e.revenue||{},s=(t.byCategory||[]).map(a=>`<li><span>${l(a.label||a.category)} ×${a.count}</span><span class="muted">gross ${Ge(a.gross)} · creator ${Ge(a.creatorShare)} · PIKK ${Ge(a.dbsShare)}</span></li>`).join("");return`<section class="card admin-revenue" id="adminRevenue">
    <h3>Revenue / analytics shell</h3>
    <div class="row wrap" style="gap:8px;margin-bottom:8px">
      <span class="chip">TEST MODE</span>
      <span class="chip">${l(t.chip||"demo figures · not production")}</span>
    </div>
    <div class="stats">
      <div><strong>${Ge(t.gross)}</strong><span>Gross</span></div>
      <div><strong>${Ge(t.fees)}</strong><span>Fees</span></div>
      <div><strong>${Ge(t.creatorShare)}</strong><span>Creator net</span></div>
      <div><strong>${Ge(t.dbsShare)}</strong><span>PIKK net</span></div>
    </div>
    <p class="muted">Creator available ${Ge(t.creatorAvailable)} · holds ${Ge(t.creatorHolds)} · fan wallet ${Ge(t.fanWalletBalance)} · catalog ${t.catalogPublished||0}/${t.catalogTotal||0} published · earning lines ${t.earnCount||0}</p>
    ${s?`<ul class="list-plain">${s}</ul>`:'<p class="muted">No creator earnings in store yet — open Wallet / Earnings (Commerce) to seed demos.</p>'}
    <p class="admin-panel-links">
      <a class="btn" href="#/wallet">Wallet</a>
      <a class="btn" href="#/earnings">Earnings</a>
    </p>
  </section>`}function Qh(e){ea(),ze();const t=pr({openOnly:!0}),s=pr({openOnly:!1}).length,a=e.hotFeed||{},i=t.length?t.slice(0,12).map(n=>{const r=n.kind==="live"?'<span class="chip">live</span>':'<span class="chip">post</span>',o=n.kind==="live"?` · viewers ${n.viewers??"—"} · gifts ${n.gifts??"—"}`:` · score ${n.score??0}`,c=n.kind==="post"?`<button type="button" class="btn primary admin-ea-like" data-ref="${l(n.refId)}" data-alert="${l(n.id)}">Like</button>
                 <button type="button" class="btn ghost admin-ea-comment" data-ref="${l(n.refId)}" data-alert="${l(n.id)}">Comment</button>
                 <button type="button" class="btn ghost admin-ea-share" data-ref="${l(n.refId)}" data-alert="${l(n.id)}">Share</button>`:'<a class="btn ghost" href="#/live">Open Live</a>';return`<div class="admin-ea-row" data-alert-id="${l(n.id)}">
            <div class="admin-ea-main">
              <strong>${l(n.username||"creator")}</strong> ${r}
              <div class="muted">${l(n.title||"")}${o}</div>
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
      <div><strong>${a.hotPosts||0}</strong><span>Hot posts</span></div>
      <div><strong>${a.hotLives||0}</strong><span>Hot lives</span></div>
    </div>
    ${i}
    <p class="admin-panel-links"><a class="btn" href="#/posts">Open Posts Hot strip</a><a class="btn" href="#/live">Open Live</a></p>
  </section>`}function Xh(e){const t=e.moderation||{};return`<section class="card admin-moderation" id="adminModeration">
    <h3>Moderation stub</h3>
    <p class="muted">${l(t.note||"Stub")}</p>
    <div class="stats">
      <div><strong>${(t.warnings||[]).length}</strong><span>Warnings</span></div>
      <div><strong>${(t.suspensions||[]).length}</strong><span>Suspensions</span></div>
    </div>
    <p class="muted">Empty-state · no enforcement actions stored yet.</p>
    <p class="admin-panel-links"><a class="btn" href="#/guidelines">Community Guidelines</a></p>
  </section>`}function Zh(){var c;const e=je(),{posts:t,clipperApps:s,user:a}=P();if(((c=e.query)==null?void 0:c.admin)==="1"&&a&&a.role!=="admin"&&zs(!0),!ae())return Gh(a);us(),Je(),ea();const i=ko(),n=Uu(),r=i.clipperByStatus,o=qt({includeUnpublishedForAdmin:!0});return L("Admin",`<div class="card admin-header">
      <div class="row wrap">
        <span class="chip">TEST MODE</span>
        <span class="chip">role=admin</span>
        <span class="spacer muted">Signed in as <strong>${l(a.username)}</strong></span>
        <button class="btn ghost" id="adminRevoke">Revoke admin</button>
      </div>
      <p class="muted admin-gate-hint">Gate: Profile toggle or <code>?admin=1</code> → <code>user.role='admin'</code> in <code>dbs_v1</code>. Phase 2 panels deep-link to owner pages.</p>
    </div>

    ${Yh()}
    ${Qh(n)}
    ${Vh(n)}
    ${zh(n)}
    ${Wh(n)}
    ${Jh(n)}
    ${Xh(n)}

    ${Uh()}
    ${Hh(o)}

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
      <p class="muted">Clippers — pending ${r.pending} · approved ${r.approved} · waitlisted ${r.waitlisted} · rejected ${r.rejected}</p>
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
                   </div>`).join(""):'<p class="muted">None yet — submit via <a href="#/clippers">Clippers</a>.</p>'}</div>`,{lead:"Phase 2 controls · Add Content · Clippers · catalog."})}async function Cr(e){if(!e)return"";const t=oh("media");return await nh(t,e,{name:e.name,mime:e.type}),"idb:"+t}function Tr(e){if(!e)return"";try{const t=new URL(e);let s=t.searchParams.get("v");return!s&&t.hostname.includes("youtu.be")&&(s=t.pathname.slice(1)),!s&&t.pathname.startsWith("/embed/")&&(s=t.pathname.split("/")[2]),s?`https://www.youtube.com/embed/${s}`:""}catch{return""}}function eg(e){var i,n;(i=e.querySelector("#adminRevoke"))==null||i.addEventListener("click",()=>{zs(!1),g("Admin revoked"),K("#/admin")}),e.querySelectorAll(".admin-clip").forEach(r=>{r.addEventListener("click",()=>{yo(r.dataset.id,r.dataset.status),g("Clipper "+r.dataset.status),K("#/admin")})}),e.querySelectorAll(".admin-om").forEach(r=>{r.addEventListener("click",()=>{const o=ji(r.dataset.id,r.dataset.status,r.dataset.status==="rejected"?"Admin reject":"");if(o!=null&&o.error){g(o.error==="admin"?"Admin required":"Open Mic update failed");return}g(r.dataset.status==="approved"?"Open Mic approved":"Open Mic rejected"),K("#/admin")})}),e.querySelectorAll(".admin-ea-like").forEach(r=>{r.addEventListener("click",()=>{const o=nm(r.dataset.ref);if(o!=null&&o.error)return g(o.error==="admin"?"Admin required":"Like failed");r.dataset.alert&&ia(r.dataset.alert,"liked"),g("Liked · TEST MODE"),K("#/admin")})}),e.querySelectorAll(".admin-ea-comment").forEach(r=>{r.addEventListener("click",()=>{const o=rm(r.dataset.ref,"🔥 PIKK team — keep it up! (TEST MODE)");if(o!=null&&o.error)return g(o.error==="admin"?"Admin required":"Comment failed");r.dataset.alert&&ia(r.dataset.alert,"commented"),g("Comment posted · TEST MODE"),K("#/admin")})}),e.querySelectorAll(".admin-ea-share").forEach(r=>{r.addEventListener("click",async()=>{var d;const o=om(r.dataset.ref);if(o!=null&&o.error)return g(o.error==="admin"?"Admin required":"Share failed");const c=`${location.origin}${location.pathname}#/posts?focus=${encodeURIComponent(r.dataset.ref)}`;try{(d=navigator.clipboard)!=null&&d.writeText&&await navigator.clipboard.writeText(c),g("Link copied · share +1 (TEST MODE)")}catch{g("Share +1 (TEST MODE)")}r.dataset.alert&&ia(r.dataset.alert,"shared"),K("#/admin")})}),e.querySelectorAll(".admin-ea-handle").forEach(r=>{r.addEventListener("click",()=>{const o=ia(r.dataset.alert,"handled");if(o!=null&&o.error)return g("Could not mark handled");g("Alert handled"),K("#/admin")})}),e.querySelectorAll("img[data-idb-src]").forEach(async r=>{const o=r.getAttribute("data-idb-src");if(!o)return;const c=await li(o);c&&(r.src=c,r.classList.remove("idb-pending"))});const t=e.querySelector("#adminType"),s=e.querySelector("#adminMediaFile"),a=e.querySelector("#adminCoverFile");e.querySelectorAll(".admin-type-tab").forEach(r=>{r.addEventListener("click",()=>{e.querySelectorAll(".admin-type-tab").forEach(m=>m.classList.remove("on")),r.classList.add("on");const o=r.dataset.type;t&&(t.value=o);const c=lc.find(m=>m.id===o);c&&s&&(s.accept=c.acceptMedia),c&&a&&(a.accept=c.acceptCover);const d=e.querySelector("#adminMediaLabel");d&&(d.textContent=o==="picture"?"Picture file (or use cover only)":o==="video"?"Video file (optional if YouTube link set)":"Audio / media file (optional)");const p=e.querySelector("#adminStreamingFields");p&&(p.style.display=o==="song"||o==="album"?"":"none")})}),e.querySelectorAll(".admin-dropzone").forEach(r=>{const o=r.querySelector(".admin-file-input"),c=r.querySelector(".admin-file-name");r.addEventListener("click",d=>{d.target!==o&&(o==null||o.click())}),r.addEventListener("keydown",d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),o==null||o.click())}),o==null||o.addEventListener("change",()=>{var p;const d=(p=o.files)==null?void 0:p[0];c&&(c.textContent=d?`${d.name} · ${(d.size/1024/1024).toFixed(2)} MB`:"")}),r.addEventListener("dragover",d=>{d.preventDefault(),r.classList.add("drag")}),r.addEventListener("dragleave",()=>r.classList.remove("drag")),r.addEventListener("drop",d=>{var h,f;d.preventDefault(),r.classList.remove("drag");const p=(f=(h=d.dataTransfer)==null?void 0:h.files)==null?void 0:f[0];if(!p||!o)return;const m=new DataTransfer;m.items.add(p),o.files=m.files,o.dispatchEvent(new Event("change"))})}),(n=e.querySelector("#adminAddForm"))==null||n.addEventListener("submit",async r=>{var x,S,T,_,N,$,H,M,B,G,D,O,R,ie,ke,W,ne,Se,Y,De,Qe,xt,At,rt,Ht,Ct;r.preventDefault();const o=e.querySelector("#adminAddStatus"),c=e.querySelector("#adminSave"),d=(S=(x=e.querySelector("#adminTitle"))==null?void 0:x.value)==null?void 0:S.trim(),p=((_=(T=e.querySelector("#adminArtist"))==null?void 0:T.value)==null?void 0:_.trim())||"DatBoiSkeet",m=((N=e.querySelector("#adminType"))==null?void 0:N.value)||"song",h=((H=($=e.querySelector("#adminCoverUrl"))==null?void 0:$.value)==null?void 0:H.trim())||"",f=((B=(M=e.querySelector("#adminMediaUrl"))==null?void 0:M.value)==null?void 0:B.trim())||"",v=((D=(G=e.querySelector("#adminYoutube"))==null?void 0:G.value)==null?void 0:D.trim())||"",b={spotify:((R=(O=e.querySelector("#adminSpotify"))==null?void 0:O.value)==null?void 0:R.trim())||"",apple:((ke=(ie=e.querySelector("#adminApple"))==null?void 0:ie.value)==null?void 0:ke.trim())||"",youtubeMusic:((ne=(W=e.querySelector("#adminYtm"))==null?void 0:W.value)==null?void 0:ne.trim())||"",tidal:((Y=(Se=e.querySelector("#adminTidal"))==null?void 0:Se.value)==null?void 0:Y.trim())||"",amazon:((Qe=(De=e.querySelector("#adminAmazon"))==null?void 0:De.value)==null?void 0:Qe.trim())||"",youtube:v||""},y=!!((xt=e.querySelector("#adminPublished"))!=null&&xt.checked),k=(rt=(At=e.querySelector("#adminCoverFile"))==null?void 0:At.files)==null?void 0:rt[0],w=(Ct=(Ht=e.querySelector("#adminMediaFile"))==null?void 0:Ht.files)==null?void 0:Ct[0];if(!d){g("Title required");return}if(m==="video"&&w)try{const X=await Fh(w),Ae=jh({duration:X,size:w.size,type:w.type});if(Ae){g(Ae),o&&(o.textContent=Ae);return}}catch{const X="Could not verify video duration. Upload canceled.";g(X),o&&(o.textContent=X);return}c&&(c.disabled=!0),o&&(o.textContent="Saving… (large files may take a moment on iPhone)");try{let X=h,Ae=f;k&&(X=await Cr(k)),w&&(Ae=await Cr(w)),m==="picture"&&!X&&Ae&&(X=Ae);const Pe=Ed({type:m,title:d,artist:p,coverRef:X,mediaRef:Ae,youtube:v,streamingLinks:m==="song"||m==="album"?b:{},published:y,embed:Tr(v)});if(Pe!=null&&Pe.error){g(Pe.error==="forbidden"?"Admin required":"Could not save"),o&&(o.textContent=""),c&&(c.disabled=!1);return}v&&Pe.id&&wo(Pe.id,{embed:Tr(v)}),g(y?"Published to catalog":"Saved as draft"),K("#/admin")}catch(X){console.error(X),g("Save failed — file may be too large for this browser"),o&&(o.textContent=String((X==null?void 0:X.message)||X)),c&&(c.disabled=!1)}}),e.querySelectorAll(".admin-cat-pub").forEach(r=>{r.addEventListener("click",()=>{xd(r.dataset.id,r.dataset.on==="1"),g(r.dataset.on==="1"?"Published":"Unpublished"),K("#/admin")})}),e.querySelectorAll(".admin-cat-del").forEach(r=>{r.addEventListener("click",()=>{confirm("Delete this catalog item?")&&(Ad(r.dataset.id),g("Deleted"),K("#/admin"))})})}const Ei={},tg=String((Ei==null?void 0:Ei.VITE_PIKK_API_BASE)||"").trim().replace(/\/$/,"");function cc(){return((typeof window<"u"&&typeof window.__PIKK_API_BASE__=="string"?window.__PIKK_API_BASE__.trim():"")||tg).replace(/\/$/,"")}function dc(){return!!cc()}async function la(e,{method:t="GET",body:s}={}){var r,o,c;const a=cc();if(!a){const d=new Error("PIKK API is not configured");throw d.code="api_not_configured",d}const i=await fetch(a+e,{method:t,credentials:"include",headers:s===void 0?void 0:{"Content-Type":"application/json"},body:s===void 0?void 0:JSON.stringify(s)});let n=null;try{n=await i.json()}catch{}if(!i.ok){const d=new Error(((r=n==null?void 0:n.error)==null?void 0:r.message)||`Request failed (${i.status})`);throw d.status=i.status,d.code=((o=n==null?void 0:n.error)==null?void 0:o.code)||"request_failed",d.details=((c=n==null?void 0:n.error)==null?void 0:c.details)||null,d}return n}const ca={discover:()=>la("/posts"),following:()=>la("/feed"),createText:e=>la("/posts",{method:"POST",body:{kind:"text",body:e}}),follow:e=>la("/follows",{method:"POST",body:{handle:e}})};function Wt(){K("#/posts")}function sg(){ea();const e=yl(8);return e.length?`<section class="card hot-strip" id="hotStrip">
    <div class="row wrap hot-strip-head">
      <h3 class="hot-strip-title">🔥 Hot / Trending</h3>
      <span class="chip">TEST MODE</span>
      <span class="muted hot-strip-note">likes + comments + shares · house + community</span>
    </div>
    <div class="hot-rail" role="list">${e.map((s,a)=>{const i=a+1,n=s.image?`<img class="hot-thumb" src="${l(s.image)}" alt="" loading="lazy" />`:`<div class="hot-thumb hot-thumb-empty">${l((s.username||"?")[0].toUpperCase())}</div>`,r=s.mediaType==="video"?'<span class="chip">video</span>':s.image?'<span class="chip">pic</span>':'<span class="chip">text</span>',o=s.house?'<span class="chip">house</span>':'<span class="chip">community</span>';return`<a class="hot-card" href="#/posts?focus=${l(s.postId||s.id)}" data-hot-id="${l(s.postId||s.id)}">
        <span class="hot-rank">#${i}</span>
        ${n}
        <span class="hot-meta">
          <span class="hot-user">@${l(s.username)}</span>
          <span class="hot-preview">${l((s.preview||s.text||"").slice(0,64))}</span>
          <span class="hot-stats">♥ ${s.likes} · 💬 ${s.comments} · ↗ ${s.shares} · score ${s.score}</span>
          <span class="hot-chips">${r}${o}</span>
        </span>
      </a>`}).join("")}</div>
  </section>`:`<section class="card hot-strip" id="hotStrip">
      <div class="row wrap hot-strip-head">
        <h3 class="hot-strip-title">🔥 Hot / Trending</h3>
        <span class="chip">TEST MODE</span>
      </div>
      <p class="muted">No hot posts yet — engage (like · comment · share) to spike the feed.</p>
    </section>`}function ag(e=[],{focusId:t="",currentHandle:s=""}={}){return e.length?e.map(a=>{const i=a.author||"creator",n=t&&t===a.id?" post-focus":"",r=s&&s.toLowerCase()!==String(i).toLowerCase();return`<article class="post persistent-post${n}" data-id="${l(a.id)}" id="post-${l(a.id)}">
      <div class="meta">
        <div class="avatar">${l((a.display_name||i)[0].toUpperCase())}</div>
        <div class="spacer">
          <div class="who">@${l(i)} <span class="chip">Persistent</span> <span class="chip">${l(a.kind||"text")}</span></div>
          <div class="when">${new Date(a.created_at).toLocaleString()}</div>
        </div>
        ${r?`<button class="btn ghost persistent-follow" data-handle="${l(i)}">Follow</button>`:""}
      </div>
      <p class="body-text">${l(a.body)}</p>
      <p class="muted" style="font-size:11px;margin:8px 0 0">Saved to PIKK backend · likes/comments persistence is coming next.</p>
    </article>`}).join(""):'<div class="card muted">No persistent posts yet.</div>'}function ig(e){var x,S,T,_,N;const t=dc(),{posts:s,likes:a,comments:i,user:n,postShares:r}=P(),o=((x=e==null?void 0:e.query)==null?void 0:x.tab)==="following"?"following":"discover",c=((S=e==null?void 0:e.query)==null?void 0:S.focus)||"",d=new Set((n==null?void 0:n.following)||[]),p=o==="following"&&n?s.filter($=>d.has($.userId)||$.userId===n.id):s,m=ud.map($=>`<button type="button" class="chip preset-img" data-src="${l($.src)}" title="${l($.label)}">${l($.label)}</button>`).join(""),h=((T=e==null?void 0:e.query)==null?void 0:T.compose)==="1"||((_=e==null?void 0:e.query)==null?void 0:_.type),f=["text","picture","short","video"].includes((N=e==null?void 0:e.query)==null?void 0:N.type)?e.query.type:"",v=n?`
    <div class="card post-create" id="composer">
      <h3>Create</h3>
      <p class="muted" style="margin:0 0 10px">Pick what you’re posting — not separate tabs.</p>
      <div class="post-type-picker" role="group" aria-label="Post type">
        <button type="button" class="post-type-btn${f==="text"?" on":""}" data-type="text">
          <span class="post-type-ico" aria-hidden="true">Aa</span>
          <strong>Text</strong>
          <span class="muted">Words only</span>
        </button>
        <button type="button" class="post-type-btn${f==="picture"?" on":""}" data-type="picture">
          <span class="post-type-ico" aria-hidden="true">🖼</span>
          <strong>Picture</strong>
          <span class="muted">Photo / still</span>
        </button>
        <button type="button" class="post-type-btn${f==="short"?" on":""}" data-type="short">
          <span class="post-type-ico" aria-hidden="true">▶</span>
          <strong>Short</strong>
          <span class="muted">Vertical clip</span>
        </button>
        <button type="button" class="post-type-btn${f==="video"?" on":""}" data-type="video">
          <span class="post-type-ico" aria-hidden="true">🎬</span>
          <strong>Video</strong>
          <span class="muted">Full video</span>
        </button>
      </div>
      <div class="post-compose-body${f||h?"":" is-collapsed"}" id="postComposeBody" ${f?"":"hidden"}>
        <input type="hidden" id="postType" value="${l(f||"picture")}" />
        <p class="chip" id="postTypeChip">${l((f||"picture").charAt(0).toUpperCase()+(f||"picture").slice(1))} post</p>
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
      <a class="chip pikk-chip${o==="discover"?" on":""}"${o==="discover"?' aria-current="page"':""} href="#/posts">Discover</a>
      <a class="chip pikk-chip${o==="following"?" on":""}"${o==="following"?' aria-current="page"':""} href="#/posts?tab=following">Following</a>
      <a class="btn ghost" href="#/profile/dbs">@DatBoiSkeet</a>
    </div>`,y=p.map($=>{const H=a[$.id]||[],M=n&&H.includes(n.id),B=i[$.id]||[],G=r&&r[$.id]||0,D=ii($.id),O=n&&d.has($.userId),R=c&&c===$.id?" post-focus":"",ie=n&&$.userId!==n.id?`<button class="btn ghost follow-btn" data-uid="${l($.userId)}" data-on="${O?"1":"0"}">${O?"Following":"Follow"}</button>`:"",ke=$.userId==="dbs"?'<span class="chip">house</span>':'<span class="chip">community</span>',W=$.mediaType||($.image?"picture":"text"),ne=W==="short"?'<span class="chip">Short</span>':W==="video"?'<span class="chip">Video</span>':W==="picture"||W==="image"?'<span class="chip">Picture</span>':W==="text"?'<span class="chip">Text</span>':"",Se=(()=>{const Y=($.mediaUrl||$.image||"").trim();if(!Y)return"";if(W==="short"||W==="video"){const De=/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{6,})/i.exec(Y);if(De)return`<div class="media media-video"><iframe src="https://www.youtube.com/embed/${De[1]}?rel=0" title="post video" allowfullscreen loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>`;if(Y.startsWith("http")||Y.endsWith(".mp4")||Y.endsWith(".webm"))return`<video class="media" src="${l(Y)}" controls playsinline preload="metadata"></video>`}return`<img class="media" src="${l(Y)}" alt="" loading="lazy" />`})();return`
      <article class="post${R}" data-id="${l($.id)}" id="post-${l($.id)}">
        <div class="meta">
          <a class="avatar" href="#/profile/${l($.userId)}">${l(($.username||"?")[0].toUpperCase())}</a>
          <div class="spacer">
            <div class="who"><a href="#/profile/${l($.userId)}">${l($.username)}</a> ${ke}${ne}</div>
            <div class="when">${j($.at)}${D>=5?` · <span class="hot-inline">🔥 ${D}</span>`:""}</div>
          </div>
          ${ie}
        </div>
        <p class="body-text">${l($.text)}</p>
        ${Se}
        <div class="post-actions">
          <button class="btn like-btn ${M?"primary":""}" data-id="${l($.id)}">
            ♥ ${H.length}
          </button>
          <button class="btn ghost comment-toggle" data-id="${l($.id)}">💬 ${B.length}</button>
          <button class="btn ghost share-btn" data-id="${l($.id)}" title="Share (demo count)">↗ ${G}</button>
        </div>
        <div class="comments" id="c-${l($.id)}" hidden>
          ${B.map(Y=>`<div class="comment"><b>${l(Y.username)}</b> ${l(Y.text)}</div>`).join("")||'<div class="muted">No comments yet</div>'}
          ${n?`<div class="row" style="margin-top:8px">
                  <input class="c-input" data-id="${l($.id)}" placeholder="Add a comment…" style="flex:1;background:#0e0e14;border:1px solid var(--line);border-radius:12px;padding:8px 10px" />
                  <button class="btn primary c-send" data-id="${l($.id)}">Send</button>
                </div>`:""}
        </div>
      </article>`}).join(""),w=t?'<section id="pikkPersistentPosts" aria-live="polite"><div class="card muted">Loading persistent posts…</div></section>':y||(o==="following"?'<div class="card muted">No posts from people you follow yet. Discover feed has official drops.</div>':'<div class="card muted">No posts yet.</div>');return L("Posts",(t?"":sg())+v+b+w,{lead:t?"Persistent PIKK text posts · Discover and Following load from the backend. Media uploads are next.":"Post Text, a Picture, Short, or Video · Shorts live here (not separate tabs) · Hot strip ranks engagement."})}function ng(e){var m;const t=dc(),s=e.querySelector("#pikkPersistentPosts"),a=async()=>{var h;if(!(!t||!s))try{const v=typeof location<"u"&&location.hash.includes("tab=following")?await ca.following():await ca.discover();s.innerHTML=ag(v.posts||[],{focusId:new URLSearchParams((location.hash.split("?")[1]||"").split("#")[0]).get("focus")||"",currentHandle:((h=P().user)==null?void 0:h.handle)||""})}catch(f){s.innerHTML=(f==null?void 0:f.status)===401?'<div class="card muted">Sign in from <a href="#/profile">Profile</a> to load persistent PIKK posts.</div>':`<div class="card muted">Could not load persistent posts: ${l((f==null?void 0:f.message)||"Unknown error")}</div>`}};a();const i=e.querySelector(".post-focus");if(i)try{i.scrollIntoView({behavior:"smooth",block:"center"})}catch{}else typeof location<"u"&&(location.hash.includes("compose=1")||location.hash.includes("type="))&&setTimeout(()=>{var h;return(h=e.querySelector("#composer"))==null?void 0:h.scrollIntoView({behavior:"smooth",block:"start"})},50);const n=e.querySelector("#postComposeBody"),r=e.querySelector("#postType"),o=e.querySelector("#postTypeChip"),c=e.querySelector("#postMediaLabel"),d=e.querySelector("#postPresets");function p(h){const f=h||"picture";e.querySelectorAll(".post-type-btn").forEach(k=>k.classList.toggle("on",k.dataset.type===f)),r&&(r.value=f),o&&(o.textContent=f.charAt(0).toUpperCase()+f.slice(1)+" post");const v=e.querySelector("#postMediaField"),b=e.querySelector("#postMediaNote"),y=f==="text";v&&(v.hidden=y),b&&(b.hidden=y),c&&!y&&(c.textContent=f==="short"?"Short clip link (YouTube / demo path)":f==="video"?"Video link (YouTube / demo path)":"Picture link (demo path)"),d&&(d.hidden=f!=="picture"),n&&(n.hidden=!1,n.classList.remove("is-collapsed"))}e.querySelectorAll(".post-type-btn").forEach(h=>{h.addEventListener("click",()=>p(h.dataset.type))}),r!=null&&r.value&&p(r.value),e.querySelectorAll(".preset-img").forEach(h=>{h.addEventListener("click",()=>{const f=e.querySelector("#postImg");f&&(f.value=h.dataset.src||""),g("Picture selected")})}),(m=e.querySelector("#postSubmit"))==null||m.addEventListener("click",async()=>{var h,f;try{const v=(h=e.querySelector("#postText"))==null?void 0:h.value,b=(r==null?void 0:r.value)||"picture",y=(((f=e.querySelector("#postImg"))==null?void 0:f.value)||"").trim();if(t){if(b!=="text")return g("Persistent Picture/Short/Video uploads are not connected yet");if(!(v!=null&&v.trim()))return g("Write some words for a Text post");await ca.createText(v.trim()),g("Text post saved to PIKK"),await a(),e.querySelector("#postText")&&(e.querySelector("#postText").value="");return}if(b==="text"){if(!(v!=null&&v.trim()))return g("Write some words for a Text post");Xn({text:v.trim(),mediaType:"text"}),g("Text posted"),Wt();return}if(!(v!=null&&v.trim())&&!y)return g("Add a caption or media");if((b==="short"||b==="video")&&!y)return g("Add a "+b+" link (TEST MODE)");Xn({text:v||(b==="picture"?"Photo":b==="short"?"Short":"Video"),image:b==="picture"?y:"",mediaType:b,mediaUrl:y}),g(b.charAt(0).toUpperCase()+b.slice(1)+" posted"),Wt()}catch(v){if((v==null?void 0:v.code)==="email_unverified")return g("Verify your email before posting");g(v.message||"Could not post")}}),e.querySelectorAll(".like-btn").forEach(h=>{h.addEventListener("click",()=>{if(bd(h.dataset.id).error)return g("Sign in to like");Wt()})}),e.querySelectorAll(".comment-toggle").forEach(h=>{h.addEventListener("click",()=>{const f=e.querySelector("#c-"+h.dataset.id);f&&(f.hidden=!f.hidden)})}),e.querySelectorAll(".c-send").forEach(h=>{h.addEventListener("click",()=>{var k;const f=h.dataset.id,v=e.querySelector(`.c-input[data-id="${f}"]`),b=(k=v==null?void 0:v.value)==null?void 0:k.trim();if(!b)return;if(yd(f,b).error)return g("Sign in to comment");g("Comment added"),Wt()})}),e.querySelectorAll(".share-btn").forEach(h=>{h.addEventListener("click",async()=>{var y;const f=h.dataset.id;if(kl(f).error)return g("Could not share");const b=`${location.origin}${location.pathname}#/posts?focus=${encodeURIComponent(f)}`;try{(y=navigator.clipboard)!=null&&y.writeText&&await navigator.clipboard.writeText(b),g("Shared · link copied (TEST MODE)")}catch{g("Shared · count +1 (TEST MODE)")}Wt()})}),e.addEventListener("click",async h=>{var v,b;const f=(b=(v=h.target).closest)==null?void 0:b.call(v,".persistent-follow");if(!(!f||!t))try{await ca.follow(f.dataset.handle),g("Following @"+f.dataset.handle),await a()}catch(y){g((y==null?void 0:y.code)==="email_unverified"?"Verify your email before following":(y==null?void 0:y.message)||"Could not follow")}}),e.querySelectorAll(".follow-btn").forEach(h=>{h.addEventListener("click",()=>{const f=h.dataset.uid,v=h.dataset.on==="1";if((v?Ha(f):Ua(f)).error)return g("Sign in to follow");g(v?"Unfollowed":"Following"),Wt()})})}const rg={"Premium Spotlight":"spotlight","Featured Box":"featured","Promo Box":"promo"},og=(e,t)=>rg[t.name]||(_l[e.id]?e.id:null);function lg(){const e=La.map(t=>`
    <section class="pikk-promote-group" id="promote-${t.id}" data-promote-section="${t.id}" aria-labelledby="promote-${t.id}-h">
      <div class="pikk-promote-head"><h3 id="promote-${t.id}-h">${l(t.title)}</h3>${t.gate?`<span class="chip pikk-promote-gate">${l(t.gate)}</span>`:""}</div>
      <ul class="pikk-promote-items">${t.items.map(s=>{const a=og(t,s),i=a?Tm(_l[a],Cm[a]):null;return`<li data-promote-option${i?` data-slots="${a}" data-sold-out="${i.soldOut}"`:""}><span>${l(s.name)}</span><span class="pikk-promote-tiers">${Am(s).map(n=>`<small data-price>${l(n)}</small>`).join("")}${i?`<small class="pikk-promote-slots${i.soldOut?" is-sold-out":""}" data-slot-label>${l(i.label)} · TEST MODE (no bookings yet)</small>`:""}</span><button type="button" class="btn ghost" data-promote-book="${l(s.name)}"${i&&i.soldOut?' disabled aria-disabled="true"':""} aria-label="Promote ${l(s.name)} (${i&&i.soldOut?"sold out":"coming soon"})">${i&&i.soldOut?"Sold out":"Promote"}</button></li>`}).join("")}</ul>
      <a class="pikk-promote-open" href="${t.link}">Open ${l(t.title)} →</a>
    </section>`).join("");return L("Promote on PIKK",`
    <p class="pikk-promote-intro">Choose what to promote. Prices are introductory previews. <strong>Booking and checkout are Coming soon</strong> until secure payments (Stripe) are live; nothing is charged and no views are guaranteed.</p>
    <nav class="pikk-promote-jump" aria-label="Promote sections">${La.map(t=>`<a class="chip" href="#/promote?s=${t.id}">${l(t.title)}</a>`).join("")}</nav>
    ${tc()}
    <div class="pikk-promote-groups">${e}</div>`,{badge:"TEST MODE · Coming soon"})}function cg(e=document){e.addEventListener("click",s=>{const a=s.target.closest("[data-promote-book]");if(a){if(s.preventDefault(),a.disabled||a.closest('[data-sold-out="true"]')){g(`${a.dataset.promoteBook} · Sold out for this window`);return}g(`${a.dataset.promoteBook} · Coming soon, no payment taken`)}});const t=new URLSearchParams(location.hash.split("?")[1]||"").get("s");t&&La.some(s=>s.id===t)&&setTimeout(()=>{var s;return(s=document.getElementById("promote-"+t))==null?void 0:s.scrollIntoView({block:"start"})},60)}function dg(){return L("Donate",`<section class="card home-app-goal home-app-goal-full">
    <p class="kicker">PIKK daily app goal · 24h</p>
    <div id="homeAppGoalBody">${rc(Aa())}</div>
    <p class="chip" style="margin-top:10px">TEST MODE · demo coins only · no real payments</p>
  </section>`,{badge:"TEST MODE"})}const pg=e=>oc(e),ug=Object.freeze([{id:"donate",title:"Donate",detail:"PIKK daily app goal · TEST MODE demo coins",href:"#/donate"},{id:"donate-live",title:"Creator & host goals",detail:"Live goals on streams · TEST MODE",href:"#/live"},{id:"coins",title:"Buy coins & gifts",detail:"Coin packs and gifts · Coming soon until Stripe",soon:!0},{id:"promote",title:"Promote bookings",detail:"Placements and boosts · booking Coming soon",href:"#/promote"},{id:"shop",title:"Shop orders & checkout",detail:"Merch checkout on the merchant site; in-app orders Coming soon",href:"#/shop"},{id:"subs",title:"Subscriptions & fan clubs",detail:"Creator fan clubs · TEST MODE",href:"#/fanclubs"},{id:"membership",title:"PIKK memberships",detail:"Plans preview · no billing yet",href:"#/pricing"},{id:"tips",title:"Tips",detail:"Tip creators · Coming soon until Stripe",soon:!0},{id:"wallet",title:"Wallet balance",detail:"Demo coin balance · TEST MODE",href:"#/wallet"},{id:"payouts",title:"Payouts & earnings",detail:"Creator earnings preview · payouts Coming soon",href:"#/earnings"},{id:"history",title:"Payment history",detail:"Receipts and refunds · Coming soon until Stripe",soon:!0}]);function mg(){const e=ug.map(t=>t.href?`<a class="pikk-pay-item" href="${t.href}" data-pay="${t.id}"><span class="pikk-pay-ico" aria-hidden="true">$</span><span><strong>${l(t.title)}</strong><small>${l(t.detail)}</small></span><span aria-hidden="true">→</span></a>`:`<div class="pikk-pay-item is-soon" data-pay="${t.id}" data-coming-soon role="button" tabindex="0"><span class="pikk-pay-ico" aria-hidden="true">$</span><span><strong class="pikk-menu-title">${l(t.title)}</strong><small>${l(t.detail)}</small></span><span class="chip">Coming soon</span></div>`).join("");return L("Payments",`<p class="pikk-pay-intro">Everything money on PIKK in one place. <strong>No real payments are processed yet</strong>; secure checkout (Stripe) is Coming soon. Balances are TEST MODE demo coins.</p><div class="pikk-pay-list">${e}</div>`,{badge:"TEST MODE"})}function hg(){}const me={circle:"pikk.crew.v1",favorites:"pikk.favorites.v1",stories:"pikk.stories.v1"},pc={},uc=()=>{try{return globalThis.localStorage||null}catch{return null}};function ci(e){const t=uc();try{return JSON.parse((t?t.getItem(e):pc[e])||"[]")}catch{return[]}}function sa(e,t){const s=JSON.stringify(t),a=uc();return a?a.setItem(e,s):pc[e]=s,t}function Bt(e){const t=String(e||"").trim().replace(/^@+/,"").toLowerCase();return/^[a-z0-9_.]{2,30}$/.test(t)?t:""}const mt=e=>ci(e).filter(t=>typeof t=="string");function mc(e,t){const s=Bt(t);if(!s)return!1;const a=mt(e);return a.includes(s)||sa(e,[...a,s]),!0}function hc(e,t){const s=Bt(t);sa(e,mt(e).filter(a=>a!==s))}const aa={list:()=>mt(me.circle),add:e=>mc(me.circle,e),remove:e=>hc(me.circle,e),has:e=>mt(me.circle).includes(Bt(e))},ft={list:()=>mt(me.favorites),add:e=>mc(me.favorites,e),remove:e=>hc(me.favorites,e),has:e=>mt(me.favorites).includes(Bt(e)),moveUp:e=>{const t=Bt(e),s=mt(me.favorites),a=s.indexOf(t);return a>0&&([s[a-1],s[a]]=[s[a],s[a-1]],sa(me.favorites,s)),mt(me.favorites)},toggle:e=>ft.has(e)?(ft.remove(e),!1):ft.add(e)},Mr=Object.freeze({everyone:"Everyone",crew:"PIKK Crew"});function gg({text:e,audience:t="everyone",author:s="you"}){const a=String(e||"").trim().slice(0,280);if(!a)return null;const i={id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),text:a,audience:t==="crew"?"crew":"everyone",author:Bt(s)||"you",at:Date.now()};return sa(me.stories,[i,...ci(me.stories)].slice(0,50)),i}const fg=24*3600*1e3;function vg(e=Date.now()){return ci(me.stories).filter(t=>t&&e-t.at<fg)}function bg(e){sa(me.stories,ci(me.stories).filter(t=>t.id!==e))}function yg(e,t=ft.list(),s=a=>a.author){const a=i=>{const n=t.indexOf(Bt(s(i)));return n<0?1/0:n};return[...e].map((i,n)=>[i,n]).sort((i,n)=>a(i[0])-a(n[0])||(n[0].at||0)-(i[0].at||0)||i[1]-n[1]).map(i=>i[0])}const kg=e=>`${e} ${e===1?"person":"people"}`,On='<p class="pikk-ic-test">TEST MODE · Saved only on this device until PIKK accounts are live. No one is notified.</p>',Sg=e=>e==="crew"?'<span class="pikk-ic-badge" title="Crew only">◎ Crew</span>':'<span class="pikk-ic-everyone">Everyone</span>',gc='<span class="pikk-fav-star" aria-hidden="true">★</span>',_n=e=>`<nav class="pikk-ic-subnav" aria-label="Stories and people">${[["#/story","New Story"],["#/crew","PIKK Crew"],["#/favorites","Favorites"]].map(([t,s])=>`<a href="${t}"${t===e?' aria-current="page" class="on"':""}>${s}</a>`).join("")}</nav>`;function qn(e){const s=(e==="circle"?aa:ft).list();return s.length?`<ul class="pikk-ic-people">${s.map(a=>`<li>${e==="fav"?gc:'<span class="pikk-ic-dot" aria-hidden="true"></span>'}<span>@${l(a)}</span>${e==="fav"?`<button type="button" class="btn ghost" data-up="${l(a)}" aria-label="Move @${l(a)} up">↑</button>`:""}<button type="button" class="btn ghost" data-remove="${l(a)}" aria-label="Remove @${l(a)}">Remove</button></li>`).join("")}</ul>`:`<p class="muted pikk-ic-empty">${e==="circle"?"Your Crew is empty. Add people by @handle.":"No favorites yet. Add people by @handle."}</p>`}function fc(e){return`<form class="pikk-ic-add" data-add-form="${e}"><label class="sr-only" for="ic-add-${e}">@handle</label><input id="ic-add-${e}" name="h" placeholder="@handle" autocomplete="off" maxlength="31" /><button class="btn primary" type="submit">${e==="circle"?"Add to Crew":"Add favorite"}</button></form>`}function wg(){return L("PIKK Crew",`${_n("#/crew")}
    <section class="pikk-ic-hero"><span class="pikk-ic-ring-demo" aria-hidden="true"></span><div><h2>PIKK Crew</h2><p>Share stories with a private list you choose. Stories set to Crew show an electric-blue/red ring and only people on this list can view them.</p></div></section>
    <section class="card pikk-ic-panel"><h3>People in your Crew (<span data-count>${aa.list().length}</span>)</h3>${fc("circle")}<div data-people="circle">${qn("circle")}</div>${On}</section>`,{badge:"TEST MODE"})}function $g(){return L("Favorites",`${_n("#/favorites")}
    <section class="pikk-ic-hero pikk-fav-hero"><span class="pikk-fav-star big" aria-hidden="true">★</span><div><h2>Favorites</h2><p>Posts and stories from people you favorite rank first in your feeds. Use ↑ to reorder; the first favorite ranks highest. Favorites show a ★ marker.</p></div></section>
    <section class="card pikk-ic-panel"><h3>Your favorites (<span data-count>${ft.list().length}</span>)</h3>${fc("fav")}<div data-people="fav">${qn("fav")}</div>${On}</section>`,{badge:"TEST MODE"})}function Hi(){const e=yg(vg());return e.length?`<ul class="pikk-story-list">${e.map(t=>`<li class="pikk-story-item${t.audience==="crew"?" is-circle":""}"><span class="pikk-story-ring${t.audience==="crew"?" circle":""}" aria-hidden="true">${l(t.author.slice(0,1).toUpperCase())}</span><div><p>${l(t.text)}</p><small>${ft.has(t.author)?gc+" ":""}@${l(t.author)} · ${Sg(t.audience)}</small></div><button type="button" class="btn ghost" data-del-story="${l(t.id)}" aria-label="Delete story">Delete</button></li>`).join("")}</ul>`:'<p class="muted pikk-ic-empty">No stories in the last 24 hours on this device.</p>'}function Eg(){return L("New Story",`${_n("#/story")}
    <form class="card pikk-story-form" data-story-form>
      <label for="story-text"><strong>Your story</strong></label>
      <textarea id="story-text" name="text" maxlength="280" rows="3" placeholder="What's happening?"></textarea>
      <fieldset class="pikk-audience"><legend>Who can see this?</legend>
        <label><input type="radio" name="audience" value="everyone" checked /> <span>${Mr.everyone}</span></label>
        <label><input type="radio" name="audience" value="crew" /> <span class="pikk-ic-badge">◎ ${Mr.crew}</span> <small data-circle-count>(${kg(aa.list().length)})</small></label>
      </fieldset>
      <p class="muted pikk-aud-hint"><a href="#/crew">Edit Crew list</a></p>
      <button class="btn primary" type="submit">Share story</button>
      ${On}
    </form>
    <section class="card pikk-ic-panel"><h3>Your recent stories</h3><div data-stories>${Hi()}</div></section>`,{badge:"TEST MODE"})}function vc(e,t){var i;const s=t==="circle"?aa:ft,a=()=>{e.querySelector(`[data-people="${t}"]`).innerHTML=qn(t);const n=e.querySelector("[data-count]");n&&(n.textContent=s.list().length)};(i=e.querySelector(`[data-add-form="${t}"]`))==null||i.addEventListener("submit",n=>{n.preventDefault();const r=n.target.h;s.add(r.value)?(r.value="",a(),g(t==="circle"?"Added to Crew":"Added to Favorites")):g("Enter a valid @handle (2–30 letters, numbers, _ or .)")}),e.addEventListener("click",n=>{const r=n.target.closest("[data-up]");if(r&&s.moveUp){s.moveUp(r.dataset.up),a();return}const o=n.target.closest("[data-remove]");o&&(s.remove(o.dataset.remove),a())})}const xg=(e=document)=>vc(e,"circle"),Ag=(e=document)=>vc(e,"fav");function Cg(e=document){const t=e.querySelector("[data-story-form]");t&&(t.addEventListener("submit",s=>{var i;s.preventDefault();const a=(i=t.querySelector("input[name=audience]:checked"))==null?void 0:i.value;if(a==="crew"&&!aa.list().length){g("Add people to your Crew first");return}if(!gg({text:t.text.value,audience:a})){g("Write something first");return}t.text.value="",e.querySelector("[data-stories]").innerHTML=Hi(),g(a==="crew"?"Shared to Crew · TEST MODE":"Shared to Everyone · TEST MODE")}),e.addEventListener("click",s=>{const a=s.target.closest("[data-del-story]");a&&(bg(a.dataset.delStory),e.querySelector("[data-stories]").innerHTML=Hi())}))}const xi={},Tg=String((xi==null?void 0:xi.VITE_PIKK_API_BASE)||"").trim().replace(/\/$/,"");function Vi(){return((typeof window<"u"&&typeof window.__PIKK_API_BASE__=="string"?window.__PIKK_API_BASE__.trim():"")||Tg).replace(/\/$/,"")}function Mg(){return!!Vi()}async function Dr(e){var s,a,i;let t=null;try{t=await e.json()}catch{}if(!e.ok){const n=new Error(((s=t==null?void 0:t.error)==null?void 0:s.message)||`Request failed (${e.status})`);throw n.status=e.status,n.code=((a=t==null?void 0:t.error)==null?void 0:a.code)||"request_failed",n.details=((i=t==null?void 0:t.error)==null?void 0:i.details)||null,n}return t}const Pr={list:async()=>{const e=await fetch(Vi()+"/media/music",{credentials:"include"});return Dr(e)},upload:async({audio:e,title:t,artistName:s,albumTitle:a="",genre:i="",rightsCertified:n=!1,explicitContent:r=!1})=>{const o=Vi();if(!o){const p=new Error("PIKK API is not configured");throw p.code="api_not_configured",p}const c=new FormData;c.set("audio",e),c.set("title",t),c.set("artist_name",s),a&&c.set("album_title",a),i&&c.set("genre",i),c.set("rights_certified",n?"true":"false"),c.set("explicit_content",r?"true":"false");const d=await fetch(o+"/media/music",{method:"POST",credentials:"include",body:c});return Dr(d)}};function Lr(e){K(e)}const zi={apple:"Apple Music",spotify:"Spotify",youtubeMusic:"YouTube Music",youtube:"YouTube",tidal:"Tidal",amazon:"Amazon Music"};function bc(e){if(!e||typeof e!="object")return{};const t={};for(const s of Object.keys(zi)){const a=String(e[s]||"").trim();(a.startsWith("http://")||a.startsWith("https://"))&&(t[s]=a)}return t}function Dg(e){const t=bc(e),s=Object.keys(zi).filter(a=>t[a]);return s.length?s.map(a=>`<a class="btn stream-plat stream-plat-${l(a)}" href="${l(t[a])}" target="_blank" rel="noopener">${l(zi[a])}</a>`).join(""):'<span class="muted" style="font-size:12px">No platform links yet</span>'}function Pg(e){try{const t=new URL(e);return t.protocol!=="https:"||t.hostname!=="music.apple.com"||!/^\/[a-z]{2}(?:-[a-z]{2})?\/(?:song|album)\//i.test(t.pathname)?"":"https://embed.music.apple.com"+t.pathname+t.search}catch{return""}}function Ai(e){var r;const t=e.cover?`<img class="stream-cover" src="${l(e.cover)}" alt="${l(e.title)}" loading="lazy" referrerpolicy="no-referrer" />`:'<div class="stream-cover stream-cover-empty" aria-hidden="true">♪</div>',s=e.albumNote?`<div class="muted" style="font-size:11px">${l(e.albumNote)}</div>`:"",a=e.year?` · ${l(String(e.year))}`:"",i=Pg((r=e.links)==null?void 0:r.apple),n=i?`<details class="apple-music-embed"><summary>▶ Play in PIKK · Apple Music</summary><iframe title="Apple Music player for ${l(e.title)}" src="${l(i)}" loading="lazy" allow="autoplay *; encrypted-media *; fullscreen *" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation" style="width:100%;height:175px;border:0;border-radius:12px"></iframe><small class="muted">Apple controls playback availability. Full listening may require Apple Music.</small></details>`:"";return`
    <article class="stream-release">
      ${t}
      <div class="stream-meta">
        <span class="chip">${l(e.type||"release")}</span>
        <strong>${l(e.title)}</strong>
        <div class="muted" style="font-size:12px">${l(e.artist||"DatBoiSkeet")}${a}</div>
        ${s}
        ${n}
        <div class="stream-plats">${Dg(e.links)}</div>
      </div>
    </article>`}function Ir(e){return e==="inner"?"Inner Circle":e==="backstage"?"Backstage":e==="skeet+"?"PIKK+":"None"}function Lg(e){return dd.map(t=>{const s=t.tier==="backstage"||t.tier==="inner";return e&&Ni(s?"backstage":"skeet")?`
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
      </article>`}).join("")}function Or(e={}){var x;const t=["songs","albums","beats","playlists","upload"].includes((x=e.query)==null?void 0:x.view)?e.query.view:"",{user:s}=P(),a=Kt(),i=Ni("skeet"),n=new Set((s==null?void 0:s.purchasedTracks)||[]),r=Xt.map(S=>`
    <div class="cover-card" style="flex:0 0 160px">
      <span class="badge-cs">${l(S.status)}</span>
      <img src="${l(S.cover)}" alt="${l(S.title)}" style="width:160px;height:160px" />
      <div class="t">${l(S.title)}</div>
      <div class="muted" style="font-size:11px">${l(S.artist)}</div>
    </div>`).join(""),o=nn.map(S=>{const T=S.id==="skeet"?"skeet+":S.id==="inner"?"inner":S.id,_=a===T;return`
    <div class="card" style="margin:0">
      <h3>${l(S.name)}</h3>
      <div class="price" style="font-size:22px;font-weight:900">$${S.price}<span class="muted" style="font-size:13px">/mo</span></div>
      <p class="muted">${l(S.blurb)}</p>
      ${s?_?`<button type="button" class="btn ghost block mem-toggle" data-tier="${l(S.id)}" data-on="1">Active · tap to cancel (demo)</button>`:`<button type="button" class="btn primary block mem-toggle" data-tier="${l(S.id)}" data-on="0">Join · TEST MODE</button>`:'<a class="btn primary block" href="#/profile">Sign in to join</a>'}
    </div>`}).join(""),c=Yn.filter(S=>n.has(S.id)),d=Yn.map(S=>{const T=n.has(S.id);return`
      <div class="card" style="margin:0;display:flex;gap:12px;align-items:center">
        <img src="${l(S.cover)}" alt="" style="width:72px;height:72px;border-radius:10px;object-fit:cover;flex:0 0 72px" />
        <div class="spacer">
          <strong>${l(S.title)}</strong>
          <div class="muted" style="font-size:12px">${l(S.artist)} · ${l(S.status)}</div>
          <div style="font-weight:800;margin-top:4px">$${S.price.toFixed(2)}</div>
        </div>
        ${s?T?'<span class="chip">In My Music</span>':`<button type="button" class="btn primary buy-track" data-id="${l(S.id)}">Buy · demo</button>`:'<a class="btn" href="#/profile">Sign in</a>'}
      </div>`}).join(""),p=qt({publishedOnly:!0,types:["song","album"]}),m=p.map(S=>{const T=bc(S.streamingLinks||{});return Object.keys(T).length?{id:S.id,title:S.title,artist:S.artist,type:S.type||"song",cover:S.coverRef&&!String(S.coverRef).startsWith("idb:")?S.coverRef:"",links:T,fromAdmin:!0}:null}).filter(Boolean),h=[...st,...m];let f="";if(t==="songs"||t==="albums"){const S=t==="albums",T=h.filter(_=>S?_.type==="album":_.type==="single"||_.type==="song");f=`<div class="card" id="music-focused-view">
      <h2>${S?"Albums":"Songs"}</h2>
      <p class="muted">Verified releases and available official listening links.</p>
      <div class="stream-grid">${T.map(Ai).join("")||'<p class="muted">No releases listed in this category yet.</p>'}</div>
      <a class="btn ghost" href="#/music">Music overview</a>
    </div>`}else t==="playlists"?f=`<div class="card" id="music-focused-view">
      <h2>Playlists</h2>
      <p class="muted">Official YouTube playlists open on YouTube. No rehosted audio.</p>
      <div class="row wrap" style="gap:8px">
        ${_i.map(S=>`<a class="btn ghost" href="${l(S.youtube)}" target="_blank" rel="noopener">${l(S.title)}</a>`).join("")}
      </div>
      <a class="btn ghost" href="#/music">Music overview</a>
    </div>`:(t==="beats"||t==="upload")&&(t==="upload"?Mg()?f=`<section class="card" id="music-focused-view">
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
      </section>`:f=`<div class="card" id="music-focused-view">
        <h2>Upload Music</h2>
        <p class="muted">The creator upload backend is being connected. This screen will not save audio locally or pretend a file was uploaded.</p>
        <a class="btn" href="#/profile">Account / creator profile</a>
        <a class="btn ghost" href="#/music">Music overview</a>
      </div>`:f=`<div class="card" id="music-focused-view">
        <h2>Beats</h2>
        <p class="muted">Not available yet · TEST MODE. The producer beat marketplace and licensing checkout are still in development.</p>
        <a class="btn ghost" href="#/music">Music overview</a>
      </div>`);const v=p.length?`<div class="card catalog-admin-music">
        <h2>From Admin</h2>
        <p class="muted">Published songs &amp; albums added in Admin · TEST MODE (device-local).</p>
        <div class="cover-row">${p.map(S=>`
          <div class="cover-card catalog-item" data-id="${l(S.id)}" style="flex:0 0 160px">
            <span class="badge-cs">${l(S.type)}</span>
            <img data-idb-src="${l(S.coverRef||"")}" src="${l(S.coverRef&&!S.coverRef.startsWith("idb:")?S.coverRef:"")}" alt="${l(S.title)}" style="width:160px;height:160px;object-fit:cover;background:#111" />
            <div class="t">${l(S.title)}</div>
            <div class="muted" style="font-size:11px">${l(S.artist)}</div>
            ${S.mediaRef?`<audio class="catalog-audio" data-idb-src="${l(S.mediaRef)}" controls preload="none" style="width:100%;margin-top:6px"></audio>`:""}
          </div>`).join("")}</div>
      </div>`:"",b=st.find(S=>S.cover)||null,y=st.filter(S=>S.cover).slice(0,5),w=`
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
        ${y.map(S=>`<a class="pikk-music-release-tile" href="#/music#stream-everywhere">
          <img src="${l(S.cover)}" alt="${l(S.title)} cover" loading="lazy" decoding="async"/>
          <strong>${l(S.title)}</strong>
          <small>${l(S.artist||"DatBoiSkeet")}</small>
        </a>`).join("")}
      </div>
    </section>`}
    ${f}
    <div class="card">
      <h2>Upcoming Releases</h2>
      <p class="muted">Real DatBoiSkeet cover art · playback unlocks when released. No fake tracks.</p>
      <div class="cover-row">${r}</div>
    </div>
    ${v}


    <div class="card" id="youtube-mixes">
      <h2>YouTube Mixes · Channel</h2>
      <p class="muted">Dogs &amp; mixes stream from the <strong>original YouTube source</strong> (embeds / Play on YouTube). Not rehosted. Released catalog still uses Stream Everywhere below.</p>
      <div class="row wrap" style="gap:8px;margin:10px 0 14px">
        <a class="btn" href="${l(he.youtube)}" target="_blank" rel="noopener">Official channel</a>
        <a class="btn ghost" href="${l(he.youtubeHandle)}" target="_blank" rel="noopener">@DatBoiSkeet1</a>
        ${_i.map(S=>`<a class="btn ghost" href="${l(S.youtube)}" target="_blank" rel="noopener">${l(S.title)}</a>`).join("")}
      </div>
      <div class="yt-mix-grid">
        ${an.map(S=>`
          <article class="yt-mix-card">
            <div class="hero-video" style="margin:0 0 10px">
              <iframe src="${l(at(S.embed))}" title="${l(S.title)}" allowfullscreen loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            </div>
            <h3 style="margin:0 0 6px">${l(S.title)}</h3>
            <p class="muted" style="margin:0 0 10px;font-size:13px">${l(S.blurb||"")}</p>
            <a class="btn" href="${l(S.youtube)}" target="_blank" rel="noopener">Play on YouTube</a>
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
        ${st.map(Ai).join("")}
        ${m.map(Ai).join("")}
      </div>
      <p class="muted" style="margin-top:12px;font-size:12px">Tidal / Amazon Music omitted until official links are verified. Admin can add more via streaming link fields.</p>
    </div>

    <div class="card">
      <h2>My Music</h2>
      <p class="muted">Purchases stay here even if membership ends.</p>
      ${c.length?`<div class="cover-row">${c.map(S=>`
            <div class="cover-card" style="flex:0 0 120px">
              <img src="${l(S.cover)}" alt="${l(S.title)}" style="width:120px;height:120px" />
              <div class="t">${l(S.title)}</div>
              <div class="muted" style="font-size:11px">Owned · Coming Soon</div>
            </div>`).join("")}</div>`:'<p class="muted">Nothing purchased yet. Buy a Coming Soon cover below (demo · no charge).</p>'}
    </div>

    <div class="card">
      <h2>Buy (demo)</h2>
      <p class="muted">TEST MODE — no charges. Marks the cover as owned in My Music. Audio not available until release.</p>
      <div style="display:flex;flex-direction:column;gap:10px">${d}</div>
    </div>

    <div class="card" id="vault">
      <h2>Vault ${i?'<span class="chip" style="border-color:#2a4a3a;color:#8dffb0">Unlocked · '+l(Ir(a))+"</span>":'<span class="chip">Locked</span>'}</h2>
      <p class="muted">Exclusive unreleased tracks &amp; previews for members. Nested under Music — not a bottom-nav tab.</p>

      <div class="vault-grid" style="margin:12px 0">
        ${Lg(i)}
      </div>

      ${i?`<div class="vault-lock" style="border-style:solid;border-color:#2a4a3a;color:var(--tx)">
              ✅ Membership active: <strong>${l(Ir(a))}</strong>. Exclusive cards above are unlocked.
              Cancel anytime with the tier button below (demo). Purchased My Music items are kept.
            </div>`:`<div class="vault-lock">
              🔒 Vault locked. Sign in, then tap <strong>Join · TEST MODE</strong> on PIKK+ or Backstage below.
              Locked cards show title/cover only — no exclusive content until you join.
            </div>`}

      <h3 style="margin:16px 0 8px">Membership (TEST MODE)</h3>
      <div class="grid-2">${o}</div>
    </div>

  `;return L("Music & Vault",w,{lead:"Singles, albums, Coming Soon, and member Vault."})}function Ig(e=[]){return e.length?`<div class="support-history">${e.map(t=>`<article class="card" style="margin:0 0 8px"><div class="row wrap"><strong>${l(t.title)}</strong><span class="chip">${l(t.status)}</span></div><p class="muted" style="margin:5px 0">${l(t.artist_name)}${t.album_title?" · "+l(t.album_title):""}</p><small class="muted">${l(t.original_name)} · ${Math.max(1,Math.round((Number(t.size_bytes)||0)/1024/1024*10)/10)} MB${t.explicit_content?" · Explicit":""}</small></article>`).join("")}</div>`:'<p class="muted">No backend music drafts yet.</p>'}function _r(e){const t=e.querySelector("#pikkMusicUploadForm"),s=e.querySelector("#pikkMusicUploadList"),a=e.querySelector("#musicUploadStatus"),i=async()=>{if(s)try{const r=await Pr.list();s.innerHTML=Ig(r.uploads||[])}catch(r){s.innerHTML=(r==null?void 0:r.status)===401?'<p class="muted">Sign in from <a href="#/profile">Profile</a> to view your music drafts.</p>':`<p class="muted">Could not load drafts: ${l((r==null?void 0:r.message)||"Unknown error")}</p>`}};t==null||t.addEventListener("submit",async r=>{var d,p,m,h,f,v,b,y,k,w,x,S;r.preventDefault();const o=(p=(d=e.querySelector("#musicUploadFile"))==null?void 0:d.files)==null?void 0:p[0];if(!o)return g("Choose an audio file");const c=e.querySelector("#musicUploadSubmit");c&&(c.disabled=!0),a&&(a.textContent="Uploading private draft…");try{const T=await Pr.upload({audio:o,title:((h=(m=e.querySelector("#musicUploadTitle"))==null?void 0:m.value)==null?void 0:h.trim())||"",artistName:((v=(f=e.querySelector("#musicUploadArtist"))==null?void 0:f.value)==null?void 0:v.trim())||"",albumTitle:((y=(b=e.querySelector("#musicUploadAlbum"))==null?void 0:b.value)==null?void 0:y.trim())||"",genre:((w=(k=e.querySelector("#musicUploadGenre"))==null?void 0:k.value)==null?void 0:w.trim())||"",rightsCertified:!!((x=e.querySelector("#musicUploadRights"))!=null&&x.checked),explicitContent:!!((S=e.querySelector("#musicUploadExplicit"))!=null&&S.checked)});a&&(a.textContent=`Draft uploaded: ${T.upload.title}. It is not published yet.`),g("Music draft uploaded"),t.reset(),await i()}catch(T){const N={unauthenticated:"Sign in to upload music.",email_unverified:"Verify your email before uploading music.",creator_role_required:"Add Creator, Artist or Producer to your PIKK account before uploading.",media_storage_not_configured:"PIKK media storage is not connected yet. No file was uploaded.",rights_required:"Confirm that you own or control the rights to this audio."}[T==null?void 0:T.code]||(T==null?void 0:T.message)||"Could not upload music";a&&(a.textContent=N),g(N)}finally{c&&(c.disabled=!1)}}),s&&i();const n=e.querySelector("#youtube-mixes")||e;oi(n),e.querySelectorAll(".mem-toggle").forEach(r=>{r.addEventListener("click",o=>{o.preventDefault();const c=r.dataset.on==="1",d=Ga(r.dataset.tier,!c);if(d!=null&&d.error)return g("Sign in required — open Profile first");g(c?"Membership cancelled (demo) · My Music purchases kept":`Joined ${r.dataset.tier} (TEST MODE) · Vault unlocked`),Lr("#/music"),setTimeout(()=>{var p;return(p=document.getElementById("vault"))==null?void 0:p.scrollIntoView({behavior:"smooth",block:"start"})},40)})}),e.querySelectorAll(".buy-track").forEach(r=>{r.addEventListener("click",o=>{o.preventDefault();const c=vd(r.dataset.id);if(c!=null&&c.error)return g("Sign in required");g("Added to My Music (demo · no charge)"),Lr("#/music")})}),e.querySelectorAll("[data-idb-src]").forEach(async r=>{const o=r.getAttribute("data-idb-src");if(!o)return;const c=await li(o);c&&(r.tagName==="IMG"||r.tagName==="AUDIO"||r.tagName==="VIDEO")&&(r.src=c)})}const Nn="pikk_ai_artists_local_drafts_v1",yc=Object.freeze(["Fully AI-generated music","AI-assisted music with human performance","Human-made music with AI artwork only"]),Og="AI-generated or AI-assisted";function _g(e,t=Date.now()){const s=String(e.artist||"").trim().slice(0,80),a=String(e.track||"").trim().slice(0,120),i=String(e.creation||""),n=String(e.description||"").trim().slice(0,600),r=Number(e.price);if(!s||!a||!yc.includes(i)||!e.confirmed)throw Error("Artist, title, creation type and honest AI disclosure are required.");if(!Number.isFinite(r)||r<0||r>100)throw Error("Preview price must be between $0 and $100.");return{id:"ai-draft-"+t+"-"+Math.random().toString(36).slice(2,8),artist:s,track:a,creation:i,description:n,price:r,createdAt:t,status:"Private local draft · not published",disclosure:Og}}function Rn(e){try{const t=JSON.parse(e.getItem(Nn)||"[]");return Array.isArray(t)?t.filter(s=>s&&typeof s.id=="string").slice(0,40):[]}catch{return[]}}function qg(e,t){const s=[t,...Rn(e)].slice(0,40);return e.setItem(Nn,JSON.stringify(s)),s}function Ng(e,t){const s=Rn(e).filter(a=>a.id!==t);return e.setItem(Nn,JSON.stringify(s)),s}function Rg(){const e=Rn(window.localStorage),t=e.length?e.map(s=>`<article class="card ai-artist-draft"><div class="row wrap"><strong>${l(s.track)}</strong><span class="chip">AI · ${l(s.creation)}</span></div><p class="muted">by ${l(s.artist)} · Preview price $${s.price.toFixed(2)}</p><p class="muted">${l(s.status)}</p><button type="button" class="btn ghost ai-artist-delete" data-id="${l(s.id)}">Delete draft</button></article>`).join(""):'<p class="muted">No AI music drafts saved on this device. This is not a public music catalog.</p>';return L("PIKK AI Artists",`
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
       <div class="field"><label for="aiCreationType">How was this made? *</label><select id="aiCreationType" name="creation">${yc.map(s=>`<option value="${l(s)}">${l(s)}</option>`).join("")}</select></div>
       <div class="field"><label for="aiPreviewPrice">Planned purchase price in USD (preview only)</label><input id="aiPreviewPrice" name="price" type="number" min="0" max="100" step=".01" value="1.00" required /></div>
       <div class="field"><label for="aiDescription">Description (optional)</label><textarea id="aiDescription" name="description" maxlength="600"></textarea></div>
       <label class="ai-artist-certify"><input type="checkbox" id="aiArtistCertify" required /> I accurately disclosed the use of AI and confirm I hold or can obtain the necessary commercial rights, including voice and likeness permissions.</label>
       <button type="submit" class="btn primary">Save private AI music draft</button>
     </form>
    </section>
    <section class="card ai-artist-panel"><h3>My private drafts (${e.length})</h3><div class="ai-artist-drafts">${t}</div><p class="muted">A real AI Artist storefront, public discovery feed and licensed downloadable sales require backend, payments and rights verification.</p></section>
   </div>
  </div>`,{lead:"Dedicated AI music category · Disclosure first"})}function Bg(e){var t;(t=e.querySelector("#aiArtistForm"))==null||t.addEventListener("submit",s=>{s.preventDefault();const a=s.currentTarget;try{const i=_g({artist:a.elements.artist.value,track:a.elements.track.value,creation:a.elements.creation.value,price:a.elements.price.value,description:a.elements.description.value,confirmed:e.querySelector("#aiArtistCertify").checked});qg(window.localStorage,i),g("Private AI artist draft saved · not published"),location.hash==="#/ai-artists"&&(location.hash="#/ai-artists?updated=1"),window.dispatchEvent(new HashChangeEvent("hashchange"))}catch(i){g(i.message)}}),e.querySelectorAll(".ai-artist-delete").forEach(s=>s.addEventListener("click",()=>{Ng(window.localStorage,s.dataset.id),window.dispatchEvent(new HashChangeEvent("hashchange"))}))}const di="pikk_shield_intake_v1",Na=30,Bn=Object.freeze(["Original creator","Licensed with permission","Authorized representative"]);function ts(e){const t=String(e||"").trim();if(!t)return"";try{const s=new URL(t);return["https:","http:"].includes(s.protocol)?s.href:""}catch{return""}}function Kg(e,t=Date.now()){const s=String(e.title||"").trim().slice(0,120),a=String(e.owner||"").trim().slice(0,100),i=String(e.rights||""),n=String(e.contact||"").trim().slice(0,180),r=String(e.notes||"").trim().slice(0,800),o=ts(e.source);if(!s||!a||!n||!Bn.includes(i)||!e.certified)throw new Error("Complete title, rights holder, contact, ownership basis and certification.");if(String(e.source||"").trim()&&!o)throw new Error("Use a valid http or https link.");return{id:"shield-"+t+"-"+Math.random().toString(36).slice(2,8),type:"rights-declaration",title:s,owner:a,rights:i,contact:n,notes:r,source:o,at:t,status:"Local draft — not submitted"}}function rs(e){try{const t=JSON.parse(e.getItem(di)||"[]");return Array.isArray(t)?t.filter(s=>s&&s.type==="rights-declaration").slice(0,Na):[]}catch{return[]}}function jg(e,t){const s=[t,...rs(e)].slice(0,Na);return e.setItem(di,JSON.stringify(s)),s}function Fg(e,t){const s=rs(e).filter(a=>a.id!==t);return e.setItem(di,JSON.stringify(s)),s}function Gg(e){const t=rs(e).map(s=>({id:String(s.id||""),type:"rights-declaration",title:String(s.title||""),owner:String(s.owner||""),rights:String(s.rights||""),contact:String(s.contact||""),notes:String(s.notes||""),source:ts(s.source),at:Number.isFinite(s.at)?s.at:null,status:"Local draft — not submitted"}));return JSON.stringify({format:"PIKK Shield local rights drafts",version:1,drafts:t},null,2)}function Ug(e,t){if(typeof t!="string"||t.length>65536)throw new Error("Backup file must be under 64 KB.");let s;try{s=JSON.parse(t)}catch{throw new Error("Invalid JSON backup file.")}if(!s||s.format!=="PIKK Shield local rights drafts"||s.version!==1||!Array.isArray(s.drafts)||s.drafts.length>Na)throw new Error("Not a supported PIKK Shield backup (maximum 30 drafts).");const a=s.drafts.map((c,d)=>{if(!c||typeof c!="object"||Array.isArray(c))throw new Error("Invalid draft in backup.");for(const p of["id","title","owner","rights","contact","notes","source"])if(typeof c[p]!="string")throw new Error("Invalid draft field: "+p);if(!/^shield-[a-zA-Z0-9-]{1,80}$/.test(c.id)||!c.title.trim()||c.title.length>120||!c.owner.trim()||c.owner.length>100||!Bn.includes(c.rights)||!c.contact.trim()||c.contact.length>180||c.notes.length>800||c.source&&(!ts(c.source)||ts(c.source)!==c.source)||c.at!==null&&(!Number.isFinite(c.at)||c.at<0))throw new Error("Backup draft "+(d+1)+" contains invalid fields.");return{id:c.id,type:"rights-declaration",title:c.title.trim(),owner:c.owner.trim(),rights:c.rights,contact:c.contact.trim(),notes:c.notes,source:ts(c.source),at:c.at??Date.now(),status:"Local draft — not submitted"}}),i=rs(e),n=new Set(i.map(c=>c.id)),r=[];for(const c of a)n.has(c.id)||(n.add(c.id),r.push(c));const o=r.slice(0,Math.max(0,Na-i.length));return o.length&&e.setItem(di,JSON.stringify([...o,...i])),{added:o.length,duplicates:a.length-r.length,total:rs(e).length}}const Hg=()=>rs(window.localStorage);function Vg(){const e=Hg(),t=e.length?e.map(s=>{const a=ts(s.source);return`
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
    </article>`}).join(""):'<p class="muted">No rights declarations saved on this device.</p>';return L("PIKK Shield",`
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
            <div class="field"><label for="shieldRights">Rights basis *</label><select id="shieldRights" name="rights" required>${Bn.map(s=>`<option value="${l(s)}">${l(s)}</option>`).join("")}</select></div>
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
    </div>`,{lead:"Rights declaration preview · No official copyright protection is active yet"})}function zg(e){var i,n,r;(i=e.querySelector("#shieldForm"))==null||i.addEventListener("submit",o=>{o.preventDefault();const c=o.currentTarget;try{const d=Kg({title:c.elements.title.value,owner:c.elements.owner.value,rights:c.elements.rights.value,contact:c.elements.contact.value,source:c.elements.source.value,notes:c.elements.notes.value,certified:e.querySelector("#shieldCertify").checked});jg(window.localStorage,d),g("Local rights draft saved — not submitted"),location.hash="#/shield?updated=1",window.dispatchEvent(new HashChangeEvent("hashchange"))}catch(d){g(d.message)}});const t=e.querySelector("#shieldImportFile");(n=e.querySelector("#shieldImportDrafts"))==null||n.addEventListener("click",()=>t==null?void 0:t.click()),t==null||t.addEventListener("change",async()=>{var c;const o=(c=t.files)==null?void 0:c[0];if(o)try{if(o.size>65536)throw new Error("Backup file must be under 64 KB.");const d=await o.text();if(!window.confirm("Restore PIKK Shield drafts from this file? Valid drafts will be merged into this browser, without replacing existing drafts."))return;const p=Ug(window.localStorage,d);g(`Restored ${p.added} local draft(s); ${p.duplicates} already saved`),window.dispatchEvent(new HashChangeEvent("hashchange"))}catch(d){g(d.message||"Unable to restore backup")}finally{t.value=""}}),(r=e.querySelector("#shieldExportDrafts"))==null||r.addEventListener("click",()=>{const o=Gg(window.localStorage),c=URL.createObjectURL(new Blob([o],{type:"application/json"})),d=document.createElement("a");d.href=c,d.download="pikk-shield-local-drafts.json",document.body.appendChild(d),d.click(),d.remove(),setTimeout(()=>URL.revokeObjectURL(c),1e3),g("Local backup downloaded — store it privately")});const s=e.querySelector("#shieldDraftSearch"),a=[...e.querySelectorAll(".shield-entry")];s==null||s.addEventListener("input",()=>{const o=s.value.trim().toLocaleLowerCase();let c=0;a.forEach(m=>{const h=m.dataset.shieldSearch.includes(o);m.hidden=!h,h&&c++});const d=e.querySelector("#shieldSearchCount");d&&(d.textContent=`Showing ${c} of ${a.length} drafts`);const p=e.querySelector("#shieldSearchEmpty");p&&(p.hidden=c!==0)}),e.querySelectorAll(".shield-delete").forEach(o=>o.addEventListener("click",()=>{var d,p;const c=((p=(d=o.closest(".shield-entry"))==null?void 0:d.querySelector("strong"))==null?void 0:p.textContent)||"this rights draft";window.confirm(`Delete local rights draft "${c}"? This cannot be undone.`)&&(Fg(window.localStorage,o.dataset.id),g("Local draft deleted"),window.dispatchEvent(new HashChangeEvent("hashchange")))}))}const Kn="pikk_support_local_tickets_v1",kc=Object.freeze(["Account & login","Music & artist rights","Livestreams & gifts","Billing & purchases","Safety & reporting","Technical issue","Bug report","Other"]),Sc=40;function Wg(e,t=Date.now()){const s=String(e.category||""),a=String(e.subject||"").trim().slice(0,120),i=String(e.message||"").trim().slice(0,1500),n=String(e.contact||"").trim().slice(0,180);if(!kc.includes(s)||a.length<4||i.length<10||!n)throw Error("Select a topic and enter a subject, contact and detailed message.");return{id:"draft-"+t+"-"+Math.random().toString(36).slice(2,7),category:s,subject:a,message:i,contact:n,createdAt:t,status:"Saved on this device — support inbox coming soon · not submitted"}}function jn(e){try{const t=JSON.parse(e.getItem(Kn)||"[]");return Array.isArray(t)?t.filter(s=>s&&typeof s.id=="string").slice(0,Sc):[]}catch{return[]}}function Yg(e,t){const s=jn(e);if(s.some(n=>n.category===t.category&&n.subject===t.subject&&n.message===t.message&&n.contact===t.contact))return s;const i=[t,...s].slice(0,Sc);return e.setItem(Kn,JSON.stringify(i)),i}function Jg(e,t){const s=jn(e).filter(a=>a.id!==t);return e.setItem(Kn,JSON.stringify(s)),s}const Ra=Object.freeze([{topic:"Music & artist rights",answer:"For copyright protection, review PIKK Shield. Fingerprinting, review and takedowns are not yet operating.",href:"#/shield"},{topic:"Livestreams & gifts",answer:"Check the Live section for available demo features. Real payouts and broadcasts require production integrations.",href:"#/live"},{topic:"Billing & purchases",answer:"Wallet and payments shown in this preview may be demonstration values. Do not assume money was charged or refunded.",href:"#/wallet"},{topic:"Payments & refunds",answer:"No real payments are processed yet, so there is nothing to refund. See the Payments hub for what is live and what is Coming soon.",href:"#/payments"},{topic:"Safety & abuse",answer:"Read the Community Guidelines and use in-app report controls where available. For emergencies contact local authorities.",href:"#/guidelines"},{topic:"Account & login",answer:"This early version does not provide verified human account recovery or password reset via Support.",href:"#/profile"}]);function Qg(e){const t=String(e||"").trim().toLowerCase();return t?Ra.filter(s=>(s.topic+" "+s.answer).toLowerCase().includes(t)):Ra.slice()}const Xg=Object.freeze([{id:"faq",title:"Help / FAQ search",href:"#/support?s=faq"},{id:"contact",title:"Contact support",href:"#/support?s=contact"},{id:"bug",title:"Report a problem / bug",href:"#/support?s=bug"},{id:"abuse",title:"Report abuse / safety",href:"#/guidelines"},{id:"payments",title:"Payments & refunds help",href:"#/payments"},{id:"account",title:"Account & login help",href:"#/support?s=account"},{id:"tickets",title:"My tickets",href:"#/support?s=tickets"}]),Ci={},Zg=String((Ci==null?void 0:Ci.VITE_PIKK_API_BASE)||"").trim().replace(/\/$/,"");function wc(){return((typeof window<"u"&&typeof window.__PIKK_API_BASE__=="string"?window.__PIKK_API_BASE__.trim():"")||Zg).replace(/\/$/,"")}function $c(){return!!wc()}async function da(e,{method:t="GET",body:s}={}){var r,o,c;const a=wc();if(!a){const d=new Error("PIKK API is not configured");throw d.code="api_not_configured",d}const i=await fetch(a+e,{method:t,credentials:"include",headers:s===void 0?void 0:{"Content-Type":"application/json"},body:s===void 0?void 0:JSON.stringify(s)});let n=null;try{n=await i.json()}catch{}if(!i.ok){const d=new Error(((r=n==null?void 0:n.error)==null?void 0:r.message)||`Request failed (${i.status})`);throw d.code=((o=n==null?void 0:n.error)==null?void 0:o.code)||"request_failed",d.status=i.status,d.details=((c=n==null?void 0:n.error)==null?void 0:c.details)||null,d}return n}const ef=Object.freeze({"Account & login":"account","Music & artist rights":"other","Livestreams & gifts":"other","Billing & purchases":"payments","Safety & reporting":"safety","Technical issue":"technical","Bug report":"technical",Other:"other"});function tf(e){return ef[e]||"other"}const ks={createTicket:({category:e,subject:t,message:s})=>da("/support/tickets",{method:"POST",body:{category:tf(e),subject:t,message:s}}),listTickets:()=>da("/support/tickets"),getTicket:e=>da("/support/tickets/"+encodeURIComponent(e)),reply:(e,t)=>da("/support/tickets/"+encodeURIComponent(e)+"/messages",{method:"POST",body:{message:t}})};function Ec(e){return e.map(t=>`<a class="support-guide" href="${l(t.href)}"><strong>${l(t.topic)}</strong><span>${l(t.answer)}</span><span class="support-guide-link">View related page →</span></a>`).join("")}function xc(e,t=""){return String(t).trim()?`${e} matching help ${e===1?"guide":"guides"}`:`Showing all ${e} help guides`}function sf(e=[]){return e.length?e.map(t=>`<article class="card support-ticket support-ticket-remote" data-id="${l(t.id)}"><strong>${l(t.subject)}</strong><span class="chip">${l(t.status)}</span><p class="muted">${l(t.category)} · ${new Date(t.created_at).toLocaleDateString()}</p><button class="btn ghost" type="button" data-open-ticket="${l(t.id)}">Open ticket</button></article>`).join(""):'<p class="muted">No submitted support tickets yet.</p>'}function qr(e){const t=e==null?void 0:e.ticket,s=(e==null?void 0:e.messages)||[];if(!t)return"";const a=s.map(i=>`<article class="support-thread-message ${i.is_staff?"is-staff":"is-user"}"><strong>${i.is_staff?"PIKK Support":"@"+l(i.handle||"you")}</strong><p>${l(i.body)}</p><small class="muted">${new Date(i.created_at).toLocaleString()}</small></article>`).join("");return`<div class="card support-ticket-detail" data-ticket-detail="${l(t.id)}"><div class="row wrap"><h3 style="margin:0">${l(t.subject)}</h3><span class="chip">${l(t.status)}</span></div><div class="support-thread">${a||'<p class="muted">No messages yet.</p>'}</div>${t.status==="closed"?'<p class="muted">This ticket is closed.</p>':`<form id="pikkSupportReplyForm" data-ticket-id="${l(t.id)}"><div class="field"><label for="pikkSupportReply">Reply</label><textarea id="pikkSupportReply" name="message" minlength="1" maxlength="5000" required></textarea></div><button class="btn primary" type="submit">Send reply</button></form>`}</div>`}function af(){const e=$c(),t=jn(window.localStorage),s=Ec(Ra),a=t.length?t.map(o=>`<article class="card support-ticket" data-id="${l(o.id)}"><strong>${l(o.subject)}</strong><span class="chip">${l(o.status)}</span><p class="muted">${l(o.category)} · ${new Date(o.createdAt).toLocaleDateString()}</p><button class="btn ghost support-delete" type="button" data-id="${l(o.id)}">Delete local draft</button></article>`).join(""):'<p class="muted">No support drafts saved on this device.</p>',i=e?'<p>Find relevant help or submit a support ticket to the PIKK support queue. Submitted tickets are tied to your signed-in account.</p><p class="support-warning"><strong>ACCOUNT SUPPORT:</strong> Sign in before submitting. Never include passwords, payment card numbers, government IDs or confidential documents.</p>':'<p>Find relevant help and prepare a support ticket. Human agents, AI chat, account actions and backend tickets are not yet connected.</p><p class="support-warning"><strong>TEST MODE:</strong> Tickets are saved only in this browser. No request is sent to staff. For urgent safety concerns or unauthorized charges, contact the relevant service or authorities directly.</p>',n=e?"":'<div class="field"><label for="pikkSupportContact">Contact *</label><input id="pikkSupportContact" name="contact" maxlength="180" required placeholder="Email or username" /></div>',r=e?'<section class="card support-pane" id="support-tickets"><h3>My tickets</h3><div class="support-history" id="pikkSupportRemoteHistory" aria-live="polite"><p class="muted">Loading submitted tickets…</p></div><div id="pikkSupportRemoteDetail"></div></section>':`<section class="card support-pane" id="support-tickets"><h3>Saved drafts (${t.length})</h3><div class="support-history">${a}</div></section>`;return L("PIKK Support",`
  <div class="support-studio">
   <header class="support-hero"><span class="support-eyebrow">PIKK HELP CENTER · EARLY ACCESS</span><h2>Answers, guidance & support</h2>${i}</header>
   <nav class="support-jump" aria-label="Support sections">${Xg.map(o=>`<a class="chip" href="${l(o.href)}" data-support-jump="${l(o.id)}">${l(o.title)}</a>`).join("")}</nav>
   <section class="card support-pane" id="support-faq"><h3>Help / FAQ search</h3><div class="support-search-row"><input id="pikkSupportSearch" type="search" placeholder="Search help (e.g. refund, login, live)" aria-label="Search help" aria-controls="pikkSupportResults" aria-describedby="pikkSupportSearchStatus" /><button class="btn ghost support-search-clear" id="pikkSupportClear" type="button" hidden>Clear search</button></div><p class="support-search-status muted" id="pikkSupportSearchStatus" role="status" aria-live="polite" aria-atomic="true">${xc(Ra.length)}</p><div class="support-guides" id="pikkSupportResults">${s}</div></section>
   <section class="card support-pane" id="support-account"><h3>Account &amp; login help</h3><p class="muted">Sign in or manage your profile from <a href="#/profile">Profile</a>. Password reset by Support is not live yet; never share your password with anyone.</p></section>
   <section class="card support-pane" id="support-links"><h3>Safety, payments &amp; bugs</h3><div class="support-guides"><a class="support-guide" href="#/guidelines"><strong>Report abuse / safety</strong><span>Community Guidelines and how reporting works.</span></a><a class="support-guide" href="#/payments"><strong>Payments &amp; refunds help</strong><span>Payments hub · real payments are Coming soon.</span></a><button type="button" class="support-guide" data-support-bug><strong>Report a problem / bug</strong><span>Prefills the ticket form with Bug report.</span></button></div></section>
   <div class="support-layout">
    <section class="card support-pane" hidden><h3>Find help</h3><div class="support-guides">${s}</div><p class="muted">These are general guides, not an automated resolution or personalized AI answer.</p></section>
    <section class="card support-pane" id="support-contact"><h3>Contact support</h3><p class="muted"><strong>${e?"Submitted to the PIKK support queue.":"Saved on this device — support inbox coming soon."}</strong></p><p class="muted">Do not include passwords, payment card numbers, government IDs or confidential documents.</p>
     <form id="pikkSupportForm">
      <div class="field"><label for="pikkSupportTopic">Issue category *</label><select id="pikkSupportTopic" name="category">${kc.map(o=>`<option value="${l(o)}">${l(o)}</option>`).join("")}</select></div>
      <div class="field"><label for="pikkSupportSubject">Subject *</label><input id="pikkSupportSubject" name="subject" maxlength="120" minlength="4" required /></div>
      ${n}
      <div class="field"><label for="pikkSupportMessage">Describe the issue *</label><textarea id="pikkSupportMessage" name="message" minlength="10" maxlength="1500" required></textarea></div>
      <button class="btn primary" type="submit">${e?"Submit ticket to PIKK Support":"Save ticket draft locally"}</button>
     </form>
    </section>
   </div>
   ${r}
  </div>`,{lead:e?"Account-linked support tickets · PIKK support queue":"Local help preview · Ticket submission and AI agents are not yet live"})}function nf(e){var h,f;const t=$c(),s=e.querySelector("#pikkSupportResults"),a=e.querySelector("#pikkSupportSearch"),i=e.querySelector("#pikkSupportClear"),n=e.querySelector("#pikkSupportSearchStatus"),r=e.querySelector("#pikkSupportRemoteHistory"),o=e.querySelector("#pikkSupportRemoteDetail"),c=v=>{const b=Qg(v);s.innerHTML=b.length?Ec(b):t?'<p class="muted">No matching help yet. <a href="#/support?s=contact">Submit a support ticket</a> below.</p>':'<p class="muted">No matching help yet. <a href="#/support?s=contact">Prepare a local support draft</a> below.</p>',n&&(n.textContent=xc(b.length,v)),i&&(i.hidden=!String(v).trim())},d=async()=>{if(!(!t||!r))try{const v=await ks.listTickets();r.innerHTML=sf(v.tickets||[])}catch(v){r.innerHTML=(v==null?void 0:v.status)===401?'<p class="muted">Sign in from <a href="#/profile">Profile</a> to view submitted tickets.</p>':`<p class="muted">Could not load tickets: ${l(v.message||"Unknown error")}</p>`}};a==null||a.addEventListener("input",()=>c(a.value)),a==null||a.addEventListener("keydown",v=>{v.key==="Escape"&&a.value&&(v.preventDefault(),a.value="",c(""))}),i==null||i.addEventListener("click",()=>{a&&(a.value="",c(""),a.focus())});const p=()=>{var b,y;const v=e.querySelector("#pikkSupportTopic");v&&(v.value="Bug report"),(b=e.querySelector("#support-contact"))==null||b.scrollIntoView({block:"start"}),(y=e.querySelector("#pikkSupportSubject"))==null||y.focus()};(h=e.querySelector("[data-support-bug]"))==null||h.addEventListener("click",p);const m=new URLSearchParams(location.hash.split("?")[1]||"").get("s");m==="bug"?setTimeout(p,80):m&&setTimeout(()=>{var v;return(v=e.querySelector("#support-"+m))==null?void 0:v.scrollIntoView({block:"start"})},80),(f=e.querySelector("#pikkSupportForm"))==null||f.addEventListener("submit",async v=>{var y;v.preventDefault();const b=v.currentTarget;if(t){try{await ks.createTicket({category:b.elements.category.value,subject:b.elements.subject.value,message:b.elements.message.value}),g("Ticket submitted to PIKK Support"),b.reset(),await d(),(y=e.querySelector("#support-tickets"))==null||y.scrollIntoView({block:"start"})}catch(k){g((k==null?void 0:k.status)===401?"Sign in to submit a support ticket":k.message||"Could not submit ticket")}return}try{const k=Wg({category:b.elements.category.value,subject:b.elements.subject.value,contact:b.elements.contact.value,message:b.elements.message.value}),x=Yg(window.localStorage,k).some(S=>S.id===k.id);g(x?"Ticket draft saved locally · not sent":"An identical draft is already saved on this device · not sent"),location.hash==="#/support"&&(location.hash="#/support?updated=1"),window.dispatchEvent(new HashChangeEvent("hashchange"))}catch(k){g(k.message)}}),r==null||r.addEventListener("click",async v=>{const b=v.target.closest("[data-open-ticket]");if(!(!b||!o))try{const y=await ks.getTicket(b.dataset.openTicket);o.innerHTML=qr(y),o.scrollIntoView({block:"start"})}catch(y){g(y.message||"Could not open ticket")}}),o==null||o.addEventListener("submit",async v=>{if(v.target.id!=="pikkSupportReplyForm")return;v.preventDefault();const b=v.target,y=b.elements.message.value;try{await ks.reply(b.dataset.ticketId,y);const k=await ks.getTicket(b.dataset.ticketId);o.innerHTML=qr(k),await d(),g("Reply sent to PIKK Support")}catch(k){g(k.message||"Could not send reply")}}),e.querySelectorAll(".support-delete").forEach(v=>v.addEventListener("click",()=>{Jg(window.localStorage,v.dataset.id),g("Local ticket draft deleted"),window.dispatchEvent(new HashChangeEvent("hashchange"))})),t&&d()}function rf(){const t=`
    <div class="card merch-hero">
      <p class="kicker">Physical merch</p>
      <h2 style="margin:0 0 8px">Foreign X-Change</h2>
      <p class="muted">All orders, sizes, shipping, and payment happen on
        <a class="fx-link" href="https://foreignx-change.com" target="_blank" rel="noopener">foreignx-change.com</a>
        — not inside PIKK. Product links open the shop homepage until verified per-item URLs are provided.</p>
      <a class="btn primary" href="https://foreignx-change.com" target="_blank" rel="noopener">Visit Foreign X-Change</a>
      <p class="merch-note" style="margin-top:10px">Hats $30 · Tees $65 · Jackets $200 · prices exclude shipping</p>
    </div>
    <div class="merch-grid">${Oe.map(s=>`
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
  `;return L("Merch",t,{lead:"Foreign X-Change showcase · 10 products · external checkout only"})}function of(e){e.querySelectorAll(".shop-link").forEach(o=>{o.addEventListener("click",()=>{g("TEST MODE — opening Foreign X-Change")})});const t=e.querySelector("#merchLightbox"),s=t==null?void 0:t.querySelector("img"),a=t==null?void 0:t.querySelector(".merch-lightbox-close");let i=null;const n=o=>{var c,d;!t||!s||!a||(i=o,s.src=((c=o.querySelector("img"))==null?void 0:c.currentSrc)||o.dataset.zoom,s.alt=((d=o.querySelector("img"))==null?void 0:d.alt)||"Product preview",t.classList.add("show"),t.setAttribute("aria-hidden","false"),a.focus())},r=()=>{t!=null&&t.classList.contains("show")&&(t.classList.remove("show"),t.setAttribute("aria-hidden","true"),s==null||s.removeAttribute("src"),i!=null&&i.isConnected&&i.focus(),i=null)};e.querySelectorAll(".img-wrap").forEach(o=>{const c=()=>n(o);o.addEventListener("click",c),o.addEventListener("keydown",d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),c())})}),t==null||t.addEventListener("click",r),t==null||t.addEventListener("keydown",o=>{o.key==="Escape"?(o.preventDefault(),r()):o.key==="Tab"&&(o.preventDefault(),a==null||a.focus())})}function Ba(e,t=""){const s="#/profile/"+encodeURIComponent(String(e));return t==="public"?s+"?view=public":s}function Ss(e){K(e||"#/profile")}function Nr(e){return e.avatar?`<img class="avatar" src="${l(e.avatar)}" alt="" style="object-fit:cover" />`:`<div class="avatar">${l((e.username||"?")[0].toUpperCase())}</div>`}function pa(e,t){return t.length?`<div class="card"><h3>${l(e)}</h3>
    <ul class="list-plain">${t.map(s=>`<li><a href="${l(Ba(s.id))}"><span>${l(s.username)}</span></a>
           <a class="chip" href="${l(Ba(s.id))}">View</a></li>`).join("")}</ul></div>`:`<div class="card"><h3>${l(e)}</h3><p class="muted">None yet.</p></div>`}function lf(e){var m,h;const t=((m=e==null?void 0:e.parts)==null?void 0:m[1])||null,{user:s,posts:a}=P(),i=!!(t&&s&&t===s.id&&((h=e==null?void 0:e.query)==null?void 0:h.view)==="public");if(!!t&&(!s||t!==s.id)||i){const f=Nt(t);if(!f)return L("Profile",`<div class="card muted">User not found.</div>
         <a class="btn" href="#/profile">Back</a>`);const v=a.filter(x=>x.userId===f.id),b=s&&!i&&(s.following||[]).includes(f.id),y=Qn(f.id),k=qi(f.id),w=`
      <section class="pikk-profile-cover" aria-label="Public PIKK profile">
        <div class="pikk-profile-cover-inner">
          <span class="pikk-profile-cover-kicker">PIKK · CREATOR PROFILE</span>
          ${Nr(f)}
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
          ${i?'<a class="btn primary" href="#/profile">Edit profile</a>':s?`<button class="btn ${b?"ghost":"primary"}" id="pubFollow" data-uid="${l(f.id)}" data-on="${b?"1":"0"}">${b?"Unfollow":"Follow"}</button>`:'<a class="btn primary" href="#/profile">Sign in to follow</a>'}
          <a class="btn ghost" href="#/posts">Posts feed</a>
          ${i?"":'<a class="btn ghost" href="#/profile">My profile</a>'}
        </div>
      </section>
      <div class="card">
        <h3>Posts</h3>
        ${v.length?v.map(x=>`<div style="padding:8px 0;border-bottom:1px solid var(--line)">
                      <div class="muted" style="font-size:11px">${new Date(x.at).toLocaleString()}</div>
                      ${l(x.text)}
                      ${x.image?`<img src="${l(x.image)}" alt="" style="margin-top:8px;border-radius:12px;max-height:200px;object-fit:cover;width:100%" />`:""}
                    </div>`).join(""):'<p class="muted">No posts yet.</p>'}
      </div>
      ${pa("Followers",y)}
      ${pa("Following",k)}
    `;return L(f.username,w)}if(!s)return L("Profile",`
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
        <a class="btn ghost" href="#/support" data-profile-support>Support</a>
      </div>`,{lead:"Free PIKK fan profile · follow · posts · role apps · TEST MODE."});const r=a.filter(f=>f.userId===s.id),o=Qn(s.id),c=qi(s.id),d=s.memberships||{},p=`
    <section class="pikk-profile-cover" aria-label="Your PIKK profile">
      <div class="pikk-profile-cover-inner">
        <span class="pikk-profile-cover-kicker">PIKK · MY PROFILE</span>
        ${Nr(s)}
        <div>
          <h2 style="margin:0">${l(s.username)}</h2>
          <p class="muted" style="margin:4px 0 0">${l(s.bio)}</p>
          <span class="chip">TEST MODE · demo</span>
          ${d.skeetPlus||d.backstage||d.innerCircle?`<span class="chip">${d.innerCircle?"Inner Circle":d.backstage?"Backstage":"PIKK+"}</span>`:""}
        </div>
      </div>
      <div class="stats pikk-profile-stats">
        <div><strong>${r.length}</strong><span>Posts</span></div>
        <div><strong>${(s.followers||[]).length}</strong><span>Followers</span></div>
        <div><strong>${(s.following||[]).length}</strong><span>Following</span></div>
      </div>
      <div class="row wrap pikk-profile-shortcuts">
        <a class="btn" href="#/posts">New post</a>
        <a class="btn" href="${l(Ba(s.id,"public"))}">Public view</a>
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
      ${r.length?r.map(f=>`<div style="padding:8px 0;border-bottom:1px solid var(--line)">
                    <div class="muted" style="font-size:11px">${new Date(f.at).toLocaleString()}</div>
                    ${l(f.text)}
                  </div>`).join(""):'<p class="muted">No posts yet.</p>'}
    </div>

    ${pa("Followers",o)}
    ${pa("Following",c)}

    <div class="card">
      <h3>Roles &amp; membership</h3>
      <p class="muted" style="margin:0 0 8px">Clipper campaigns, Live creator tools, brand ads, or PIKK+ / Backstage / Inner Circle for Vault access.</p>
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
  `;return L("Profile",p)}function cf(e){var t,s,a,i,n,r;(t=e.querySelector("#signinBtn"))==null||t.addEventListener("click",()=>{var c;const o=(c=e.querySelector("#signinName"))==null?void 0:c.value;os(o),g("Signed in"),Ss("#/profile")}),(s=e.querySelector("#signinName"))==null||s.addEventListener("keydown",o=>{var c;o.key==="Enter"&&((c=e.querySelector("#signinBtn"))==null||c.click())}),(a=e.querySelector("#signoutBtn"))==null||a.addEventListener("click",()=>{bo(),g("Signed out"),Ss("#/profile")}),(i=e.querySelector("#saveProfile"))==null||i.addEventListener("click",()=>{var c,d;if(fd({bio:(c=e.querySelector("#editBio"))==null?void 0:c.value,avatar:(d=e.querySelector("#editAvatar"))==null?void 0:d.value}).error)return g("Sign in required");g("Profile saved"),Ss("#/profile")}),(n=e.querySelector("#pubFollow"))==null||n.addEventListener("click",o=>{const c=o.currentTarget,d=c.dataset.uid,p=c.dataset.on==="1";if((p?Ha(d):Ua(d)).error)return g("Sign in to follow");g(p?"Unfollowed":"Following"),Ss(Ba(d))}),(r=e.querySelector("#toggleAdmin"))==null||r.addEventListener("click",()=>{const o=!ae();if(zs(o).error)return g("Sign in required");g(o?"Demo Admin enabled":"Admin revoked"),Ss("#/profile")})}function Rr(){K("#/clippers")}const df={pending:"Pending",approved:"Approved",rejected:"Rejected",waitlisted:"Waitlisted"};function pf(){const{clipperApps:e,user:t}=P(),s=e.length,a=e.filter(r=>r.status==="approved").length,i=e.filter(r=>r.status==="pending").length,n=`
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
      ${e.length?e.map(r=>`
            <div class="card" style="margin:0 0 10px;background:#12121a" data-app="${l(r.id)}">
              <div class="row wrap">
                <strong>${l(r.name)}</strong>
                <span class="chip">${l(df[r.status]||r.status)}</span>
                <span class="muted spacer" style="text-align:right">${j(r.at)}</span>
              </div>
              <p class="muted" style="margin:6px 0;font-size:12px">${l(r.email)} · ${l(r.niche||"—")}</p>
              <p style="font-size:12px;margin:0 0 8px">${l((r.samples||"").slice(0,120))}</p>
              <div class="row wrap admin-actions">
                <button class="btn primary clip-status" data-id="${l(r.id)}" data-status="approved">Approve</button>
                <button class="btn ghost clip-status" data-id="${l(r.id)}" data-status="waitlisted">Waitlist</button>
                <button class="btn ghost clip-status" data-id="${l(r.id)}" data-status="rejected">Reject</button>
              </div>
            </div>`).join(""):'<p class="muted">None yet.</p>'}
      <p class="muted" style="font-size:12px;margin-top:8px">Demo admin: approve / reject here or on <a href="#/admin" style="color:var(--sk)">Admin</a>. Signed in as ${l((t==null?void 0:t.username)||"guest")}.</p>
    </div>
    </div>
  `;return L("Clippers",n,{lead:"Apply → admin approve → paid campaigns & tracked links."})}function uf(e){var t;(t=e.querySelector("#cSubmit"))==null||t.addEventListener("click",()=>{var i,n,r,o,c,d,p,m,h,f,v,b,y,k,w,x,S,T,_;const s=(n=(i=e.querySelector("#cName"))==null?void 0:i.value)==null?void 0:n.trim(),a=(o=(r=e.querySelector("#cEmail"))==null?void 0:r.value)==null?void 0:o.trim();if(!s||!a)return g("Name and email required");kd({name:s,email:a,age:(c=e.querySelector("#cAge"))==null?void 0:c.value,tiktok:(d=e.querySelector("#cTiktok"))==null?void 0:d.value,instagram:(p=e.querySelector("#cIg"))==null?void 0:p.value,youtube:(m=e.querySelector("#cYt"))==null?void 0:m.value,x:(h=e.querySelector("#cX"))==null?void 0:h.value,facebook:(f=e.querySelector("#cFb"))==null?void 0:f.value,followers:(v=e.querySelector("#cFollowers"))==null?void 0:v.value,views:(b=e.querySelector("#cViews"))==null?void 0:b.value,avgViews:(y=e.querySelector("#cAvgViews"))==null?void 0:y.value,engagement:(k=e.querySelector("#cEngage"))==null?void 0:k.value,frequency:(w=e.querySelector("#cFreq"))==null?void 0:w.value,niche:(x=e.querySelector("#cNiche"))==null?void 0:x.value,samples:(S=e.querySelector("#cSamples"))==null?void 0:S.value,analyticsNotes:(T=e.querySelector("#cAnalytics"))==null?void 0:T.value,applicantUserId:((_=P().user)==null?void 0:_.id)||null}),g("Application saved for admin review"),Rr()}),e.querySelectorAll(".clip-status").forEach(s=>{s.addEventListener("click",()=>{yo(s.dataset.id,s.dataset.status),g("Marked "+s.dataset.status),Rr()})})}const mf={rose:"🌹","big-love":"💖","turn-up":"🔥","cash-rain":"💵","bottle-pop":"🍾","money-gun":"💸","diamond-drip":"💎","foreign-whip":"🚗",helicopter:"🚁","private-jet":"✈️","dbs-crown":"👑","dbs-universe":"🌌","battle-win":"✅","battle-crown":"👑","battle-vs":"⚔️","battle-fire":"🔥"},hf={rose:"/gifts/rose.svg","big-love":"/gifts/big-love.svg","turn-up":"/gifts/turn-up.svg","cash-rain":"/gifts/cash-rain.svg","bottle-pop":"/gifts/bottle-pop.svg","money-gun":"/gifts/money-gun.svg","diamond-drip":"/gifts/diamond-drip.svg","foreign-whip":"/gifts/foreign-whip.svg",helicopter:"/gifts/helicopter.svg","private-jet":"/gifts/private-jet.svg","dbs-crown":"/gifts/dbs-crown.svg","dbs-universe":"/gifts/dbs-universe.svg","battle-win":"/gifts/battle-win.svg","battle-crown":"/gifts/battle-crown.svg","battle-vs":"/gifts/battle-vs.svg","battle-fire":"/gifts/battle-fire.svg"},Br="gift-sticker";function ua(e){return String(e??"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function gf(e,t){return t&&typeof t=="object"&&t.className?t.className:`${Br} ${Br}--${e}`}function Vs(e,t={}){const s=String(e||""),a=gf(s||"unknown",t),i=mf[s]||"🎁",n=hf[s]||null;return n?{src:n,className:a,emoji:i,html:`<img class="${ua(a)}" src="${ua(n)}" alt="" width="48" height="48" decoding="async" draggable="false" data-gift-slug="${ua(s)}" />`}:{src:null,className:a,emoji:i,html:`<span class="${ua(a)} gift-sticker--emoji" aria-hidden="true">${i}</span>`}}function yt(e,t){return Vs(e,t&&typeof t=="object"&&typeof t!="function"?t:{}).html}const Fn=Object.freeze([{id:"women",title:"Women's Rooms",icon:"💗",description:"Conversations, style, wellness, business and community",names:["Ladies Lounge","Girl Talk","Tea Time","What's the Word?","Who Did What?","Beauty Bar","Girls' Night In","Love & Standards","Boss Ladies","Fashion & Fits","Ladies Only Live","Women in Business","Women's Mental Wellness","Dating From Her Side","The Hustle Room: Women"]},{id:"men",title:"Men's Rooms",icon:"🫱🏻‍🫲🏿",description:"Brotherhood, relationships, business, wellness and hobbies",names:["The Man Cave","The Barbershop","Fellas' Night","Men's Corner","Men in Business","Cars & Motors","Fitness & Brotherhood","Fatherhood","Men's Mental Wellness","Dating From His Side","Sports Debate","Gaming Brotherhood","Men's Style","The Hustle Room","Brotherhood & Mentorship"]},{id:"coed",title:"Coed Communities",icon:"🌐",description:"Shared conversations, learning and networking for everyone",names:["Let's Talk","The Hangout","Business Connect & Wealth Academy","Couples Corner","Conspiracy Room","Game Room","Why Are You Single?","What Are You Looking For?","Single & Ready to Mingle","City Connect"]},{id:"dating",title:"Singles & Dating",icon:"💘",description:"Opt-in conversations, introductions and relationship topics",names:["Looking for My Match","The Flirt Zone","Speed Connections","Poly Connections","Date Night Live","Love & Advice"]},{id:"sports",title:"Sports",icon:"🏆",description:"A separate place for every major sport",names:["Sports Central","Basketball","Football","Soccer","Baseball","Hockey"]},{id:"talent",title:"Music & Talent",icon:"🎙️",description:"Rappers, singers, bands, producers and city competitions",names:["The Booth","Producer Room","The Stage","City Takeover"]},{id:"news",title:"News & Innovation",icon:"📰",description:"World events, markets and new ideas",names:["World News","Economy & Markets","Startups & Innovation","Tech Talk","Money Talk"]},{id:"general",title:"General Live",icon:"📡",description:"IRL, gaming, shows, comedy, food, fitness and more",names:["Just Chatting","Gaming","Music","IRL","Sports","Creative","Podcasts & Talk Shows","Food & Cooking","Fitness","Beauty & Fashion","Business & Money Talk","Dating & Connections","Education","News & Commentary","Comedy & Entertainment","Comedy & Roast Battles","Creator Spotlight"]}]);function ff(e,t=""){if(e!=="channels")return"#/live?tab="+encodeURIComponent(e);const s=String(t||"").trim();return s?"#/live?tab=channels&category="+encodeURIComponent(s):"#/live"}function vf(e,t){const s=new Map(e.map(c=>[c[0],c])),a=new Set,i=([c,d,p])=>{const m=c==="Comedy & Roast Battles",h=m?"#/roast-arena":"#/live?tab=channels&category="+encodeURIComponent(c),f=m?"Preview Roast Arena":"Browse channels",v=m?"preview Roast Arena (coming soon)":"browse channels";return'<a class="live-cat-card pikk-live-room-card" href="'+h+'" aria-label="'+t(c)+": "+v+'"><span class="pikk-live-room-emoji" aria-hidden="true">'+t(p)+"</span><strong>"+t(c)+'</strong><p class="muted">'+t(d)+'</p><span class="pikk-live-room-action">'+f+' <span aria-hidden="true">›</span></span></a>'},n=[...Fn].sort((c,d)=>+(d.id==="general")-+(c.id==="general")).map(c=>{const d=c.names.map(p=>s.get(p)).filter(Boolean);return d.forEach(p=>a.add(p[0])),'<details class="pikk-live-directory-group" id="pikk-live-group-'+c.id+'"'+(c.id==="coed"||c.id==="general"?" open":"")+'><summary class="pikk-live-directory-summary"><span class="pikk-live-directory-icon" aria-hidden="true">'+c.icon+'</span><span class="pikk-live-directory-label"><strong>'+t(c.title)+"</strong><small>"+t(c.description)+'</small></span><span class="pikk-live-directory-count">'+d.length+' topics</span><span class="pikk-live-directory-chevron" aria-hidden="true">⌄</span></summary><div class="live-cat-cards pikk-live-directory-cards">'+d.map(i).join("")+"</div></details>"}),r=e.filter(c=>!a.has(c[0]));return r.length&&n.push('<details class="pikk-live-directory-group" open><summary class="pikk-live-directory-summary"><span class="pikk-live-directory-icon" aria-hidden="true">✨</span><span class="pikk-live-directory-label"><strong>More Live</strong><small>Additional topics</small></span><span class="pikk-live-directory-count">'+r.length+' topics</span><span class="pikk-live-directory-chevron" aria-hidden="true">⌄</span></summary><div class="live-cat-cards pikk-live-directory-cards">'+r.map(i).join("")+"</div></details>"),'<div class="pikk-live-directory" role="region" aria-label="Live category groups">'+('<div class="card pikk-live-room-search" style="margin-bottom:4px"><label for="liveRoomSearch"><strong>Find a Live topic</strong></label><div class="row wrap" style="gap:8px;margin-top:8px"><input id="liveRoomSearch" type="search" autocomplete="off" placeholder="Search '+e.length+' topics" aria-describedby="liveRoomSearchStatus" style="width:auto;flex:1 1 220px;min-width:0"><button type="button" id="liveRoomSearchClear" class="btn ghost" hidden style="display:none">Clear</button></div><p class="muted small" id="liveRoomSearchStatus" role="status" aria-live="polite">Browse '+e.length+" topics · these filter channels, not hosted rooms.</p></div>")+n.join("")+"</div>"}function bf(e,t){return String(e).toLocaleLowerCase().includes(String(t).trim().toLocaleLowerCase())}function yf(e){const t=e.querySelector("#liveRoomSearch"),s=e.querySelector("#liveRoomSearchClear"),a=e.querySelector("#liveRoomSearchStatus"),i=[...e.querySelectorAll(".pikk-live-directory-group")];if(!t||!s||!a||!i.length)return;let n=null;const r=()=>{const c=t.value.trim();c&&n===null&&(n=i.map(p=>p.open));let d=0;for(const p of i){let m=0;p.querySelectorAll(".pikk-live-room-card").forEach(f=>{var k,w;const v=((k=f.querySelector("strong"))==null?void 0:k.textContent)||"",b=((w=f.querySelector("p"))==null?void 0:w.textContent)||"",y=bf(v+" "+b,c);f.style.display=y?"":"none",y&&m++}),p.style.display=!c||m?"":"none";const h=p.querySelector(".pikk-live-directory-count");if(h){const f=p.querySelectorAll(".pikk-live-room-card").length;h.textContent=c?m+" of "+f+" topics":f+" topics"}c&&m&&(p.open=!0),d+=m}!c&&n!==null&&(i.forEach((p,m)=>{p.open=n[m]}),n=null),s.hidden=!c,s.style.display=c?"":"none",a.textContent=c?d+" matching topic"+(d===1?"":"s")+" · channel discovery only.":"Browse "+d+" topics · these filter channels, not hosted rooms."},o=()=>{t.value="",r(),t.focus()};t.addEventListener("input",r),t.addEventListener("keydown",c=>{c.key==="Escape"&&t.value&&(c.preventDefault(),o())}),s.addEventListener("click",o),r()}const kf=3e4,Sf=6e4,wf=Object.freeze([["rose",1],["turn-up",5],["diamond-drip",10]]),Wi="Demo viewer (placeholder)";function $f({gifter:e,giftPts:t=1,now:s=Date.now()}){return{status:"open",gifter:String(e),giftPts:t,openedAt:s,expiresAt:s+kf,challenger:null}}function Ef(e,t=Date.now()){return!!e&&e.status==="open"&&t<e.expiresAt}function xf(e,t,s=Date.now()){return e?e.status!=="open"?{ok:!1,reason:"taken",window:e}:s>=e.expiresAt?{ok:!1,reason:"expired",window:{...e,status:"expired"}}:String(t)===e.gifter?{ok:!1,reason:"self",window:e}:{ok:!0,window:{...e,status:"accepted",challenger:String(t)},battle:Af(e.gifter,t,s,e.giftPts)}:{ok:!1,reason:"none"}}function Af(e,t,s=Date.now(),a=0){return{a:{name:String(e),total:a},b:{name:String(t),total:0},startedAt:s,endsAt:s+Sf}}function Ac(e,t=Date.now()){return Math.max(0,e.endsAt-t)}function Ka(e,t=Date.now()){return Ac(e,t)===0}function Cf(e,t,s,a=Date.now()){return Ka(e,a)||!["a","b"].includes(t)||!(s>0)?e:{...e,[t]:{...e[t],total:e[t].total+s}}}function Cc(e){if(e.a.total===e.b.total)return{result:"tie",name:null};const t=e.a.total>e.b.total?e.a:e.b;return{result:e.a.total>e.b.total?"a":"b",name:t.name}}const Tf=24*36e5,Mf=24*36e5,Tc=10,Kr=()=>({results:[]});function Df(e,t,s=Date.now()){const a=Cc(t),i={a:t.a.name,b:t.b.name,aTotal:t.a.total,bTotal:t.b.total,winner:a.name,at:s};return{results:[...(e==null?void 0:e.results)||[],i].slice(-500)}}function pi(e,t,s=Date.now()){return((e==null?void 0:e.results)||[]).some(a=>a.winner===t&&s-a.at<Tf&&s>=a.at)}function Pf(e,t){let s=0,a=0,i=0;for(const n of(e==null?void 0:e.results)||[])n.a!==t&&n.b!==t||(n.winner?n.winner===t?s++:a++:i++);return{w:s,l:a,t:i}}const jr=e=>Math.floor(e/Mf);function Mc(e,t=Date.now()){const s=jr(t),a=new Map;for(const i of(e==null?void 0:e.results)||[]){if(!i.winner||jr(i.at)!==s)continue;const n=i.winner===i.a?i.aTotal:i.bTotal,r=a.get(i.winner)||{name:i.winner,gifts:0,wins:0};r.gifts+=n,r.wins+=1,a.set(i.winner,r)}return[...a.values()].sort((i,n)=>n.gifts-i.gifts||n.wins-i.wins||i.name.localeCompare(n.name)).map((i,n)=>({rank:n+1,...i}))}const Lf=(e,t=Date.now())=>Mc(e,t).slice(0,Tc);function If(e){const t=e-1;return{col:Math.floor(t/2)+1,row:t%2+1}}const Dc="pikk_gb_records_v1";function fs(){try{return JSON.parse(localStorage.getItem(Dc))||Kr()}catch{return Kr()}}function Of(e){try{localStorage.setItem(Dc,JSON.stringify(e))}catch{}}const Ce=e=>String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function ui(e,t=fs(),s=Date.now()){const a=pi(t,e,s)?' <span class="pikk-gb-badge" title="Battle Winner · 24h · TEST MODE">🏆 Battle Winner</span>':"";return`<button type="button" class="pikk-gb-name" data-gb-name="${Ce(e)}">${Ce(e)}</button>${a}`}function Pc(e){return`<div class="pikk-gb-strip" data-gb-strip="${Ce(e)}" hidden></div>`}function _f(e,t){const s=Lf(e,t);if(!s.length)return"";const a=s.map(n=>{const r=If(n.rank);return`<button type="button" class="pikk-gb-wchip" data-gb-open-list style="grid-column:${r.col};grid-row:${r.row}" aria-label="#${n.rank} ${Ce(n.name)} ${n.gifts} gifts"><b>#${n.rank}</b> ${Ce(n.name)}${pi(e,n.name,t)?" 🏆":""} <small>${n.gifts}</small></button>`}).join(""),i=Mc(e,t).map(n=>`<li><b>#${n.rank}</b> ${ui(n.name,e,t)} · ${n.gifts} gifts (${n.wins} win${n.wins===1?"":"s"})</li>`).join("");return`<div class="pikk-gb-strip-grid" role="list" aria-label="Today's Battle Winners · top ${Tc}">${a}</div>
    <details class="pikk-gb-list"><summary>Today's Battle Winners · full list · TEST MODE (resets every 24h)</summary><ol class="list-plain">${i}</ol></details>`}function Fr(e){const t=fs(),s=Date.now();e.querySelectorAll("[data-gb-strip]").forEach(a=>{const i=_f(t,s);a.innerHTML=i,a.hidden=!i})}function qf(e,t){e._gbNames||(e._gbNames=!0,e.addEventListener("click",s=>{var i;const a=s.target.closest("[data-gb-name]");if(a){const n=Pf(fs(),a.dataset.gbName);t(`${a.dataset.gbName} · Battle record ${n.w}-${n.l}${n.t?`-${n.t}`:""} (W-L${n.t?"-T":""}) · TEST MODE`);return}if(s.target.closest("[data-gb-open-list]")){const n=(i=s.target.closest("[data-gb-strip]"))==null?void 0:i.querySelector("details");n&&(n.open=!0)}}))}const Lc=e=>{const t=Math.ceil(e/1e3);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`};function Ic(e){return`<div class="pikk-gb-controls row wrap" data-gb-controls="${Ce(e)}" style="gap:6px">
    <button type="button" class="chip pikk-chip" data-gb-giftall="me">🎁 Send gift for all viewers · demo</button>
    <button type="button" class="chip pikk-chip" data-gb-giftall="demo">Demo: placeholder sends gift for all</button>
  </div>
  <div class="pikk-gb" data-gb-slot="${Ce(e)}" hidden aria-live="polite"></div>`}function Nf(e,t,s){const a=e.gifter===t;return`<div class="pikk-gb-tab" role="status">
    <span>🎁 <strong>${Ce(e.gifter)}</strong> sent a gift for all viewers</span>
    <button type="button" class="chip pikk-chip on" data-gb-accept>⚔️ Challenge to Gift Battle${a?` <small>(as ${Ce(Wi)})</small>`:""}</button>
    <span class="pikk-gb-timer">${Lc(e.expiresAt-s)}</span>
    <small class="muted">${a?"Shown to other viewers for 30s · demo: tap to accept for the placeholder":"First tap wins · 30s"} · TEST MODE</small></div>`}function Gr(e,t,s){const a=e.a.total+e.b.total,i=a?Math.round(e.a.total/a*100):50,n=Ka(e,s),r=d=>ui(e[d].name),o=d=>wf.map(([p,m])=>`<button type="button" class="chip pikk-chip pikk-gb-gift" data-gb-side="${d}" data-gb-pts="${m}" aria-label="Gift +${m} for ${Ce(e[d].name)} · TEST MODE">${Vs(p,{className:"gift-sticker gift-sticker--sm"}).html}<small>+${m}</small></button>`).join(""),c=n?Cc(e):null;return`<div class="pikk-gb-head"><strong>⚔️ Gift Battle</strong> <span class="chip">TEST MODE · demo gifts · no charges</span><span class="pikk-gb-timer" data-gb-timer>${n?"Ended":Lc(Ac(e,s))}</span></div>
    <div class="pikk-gb-bar" role="img" aria-label="${Ce(e.a.name)} ${e.a.total} vs ${Ce(e.b.name)} ${e.b.total}">
      <div class="pikk-gb-a" style="width:${i}%"><span>${r("a")} · ${e.a.total}</span></div>
      <div class="pikk-gb-b" style="width:${100-i}%"><span>${e.b.total} · ${r("b")}</span></div></div>
    ${n?`<p class="pikk-gb-winner" role="status">${Vs("battle-win",{className:"gift-sticker gift-sticker--sm"}).html} <strong>${c.result==="tie"?"Tie":`${Ce(c.name)} wins`}</strong> · ${e.a.total}–${e.b.total} · TEST MODE</p><button type="button" class="chip pikk-chip" data-gb-close>Close</button>`:`<div class="pikk-gb-gifts"><div>${o("a")}</div><div>${o("b")}</div></div><small class="muted">Totals change only by taps on this device · the placeholder side moves only when you tap it.</small>`}`}function Rf(e,{me:t="You",toast:s=()=>{}}={}){qf(e,s),Fr(e),e.querySelectorAll("[data-gb-slot]").forEach(a=>{const i=e.querySelector(`[data-gb-controls="${a.dataset.gbSlot}"]`);if(!i)return;const n={w:null,b:null,t:null},r=()=>{const c=Date.now();if(n.b)a.innerHTML=Gr(n.b,t,c);else if(Ef(n.w,c))a.innerHTML=Nf(n.w,t,c);else{a.hidden=!0,a.innerHTML="",clearInterval(n.t);return}a.hidden=!1,n.b&&Ka(n.b,c)&&(clearInterval(n.t),n.b.recorded||(n.b={...n.b,recorded:!0},Of(Df(fs(),n.b,c)),Fr(e),a.innerHTML=Gr(n.b,t,c)))},o=()=>{clearInterval(n.t),n.t=setInterval(()=>document.body.contains(a)?r():clearInterval(n.t),1e3)};i.addEventListener("click",c=>{const d=c.target.closest("[data-gb-giftall]");if(d){if(n.b&&!Ka(n.b))return s("A Gift Battle is already running");n.b=null,n.w=$f({gifter:d.dataset.gbGiftall==="me"?t:Wi}),r(),o()}}),a.addEventListener("click",c=>{var p;if(c.target.closest("[data-gb-accept]")){const m=((p=n.w)==null?void 0:p.gifter)===t?Wi:t,h=xf(n.w,m);if(n.w=h.window||n.w,!h.ok)return s(h.reason==="expired"?"Challenge expired":"Someone already accepted");n.b=h.battle,r(),o();return}const d=c.target.closest("[data-gb-side]");if(d&&n.b){n.b=Cf(n.b,d.dataset.gbSide,Number(d.dataset.gbPts)),r();return}c.target.closest("[data-gb-close]")&&(n.b=null,n.w=null,r())})})}function Ur(){return`
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
    </div>`}const Yi=Fn.find(e=>e.id==="general").names,Hr=Fn.filter(e=>e.id!=="general"),Bf=Object.freeze(["Video","Voice","Text"]),Kf=Object.freeze([[2,"2 min"],[5,"5 min"],[15,"15 min"],[30,"30 min"],[60,"1 hour"],[120,"2 hours"]]),jf=Object.freeze(["🔥","❤️","😂","👏","💯"]),vt=e=>String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function Ff(){const e=Yi.map(t=>`<button type="button" class="chip pikk-chip pikk-golive-cat" role="radio" aria-checked="false" aria-pressed="false" data-golive-cat="${vt(t)}">${vt(t)}</button>`).join("");return`
      <fieldset class="field pikk-golive-cats" id="liveCategoryPick">
        <legend>Category <span class="muted">(pick exactly one · ${Yi.length} General Live)</span></legend>
        <div class="row wrap" role="radiogroup" aria-label="Go Live category" style="gap:6px">${e}</div>
        <input type="hidden" id="liveCategory" value="" />
      </fieldset>
      <fieldset class="field pikk-golive-perms" id="livePermissions">
        <legend>Permissions</legend>
        <label>Who can chat <select id="livePermChat"><option value="everyone">Everyone</option><option value="followers">Followers</option><option value="subscribers">Subscribers</option><option value="off">Chat off</option></select></label>
        <label>Guest requests <select id="livePermGuests"><option value="approve">Request · host approves</option><option value="off">Off</option></select></label>
        <label class="row" style="gap:6px"><input type="checkbox" id="livePermGifts" checked /> Allow gifts &amp; donations (demo coins)</label>
        <label class="row" style="gap:6px"><input type="checkbox" id="livePermReplay" /> Save replay (Coming soon)</label>
      </fieldset>`}function Gf(e){const t=e.querySelector("#liveCategory");e.querySelectorAll(".pikk-golive-cat").forEach(s=>s.addEventListener("click",()=>{e.querySelectorAll(".pikk-golive-cat").forEach(a=>{const i=a===s;a.classList.toggle("on",i),a.setAttribute("aria-pressed",String(i)),a.setAttribute("aria-checked",String(i))}),t&&(t.value=s.dataset.goliveCat)}))}function Uf(e){var s,a,i,n,r;const t=((s=e.querySelector("#liveCategory"))==null?void 0:s.value)||"";return{category:Yi.includes(t)?t:"",permissions:{chat:((a=e.querySelector("#livePermChat"))==null?void 0:a.value)||"everyone",guests:((i=e.querySelector("#livePermGuests"))==null?void 0:i.value)||"approve",gifts:!!((n=e.querySelector("#livePermGifts"))!=null&&n.checked),replay:!!((r=e.querySelector("#livePermReplay"))!=null&&r.checked)}}}function Hf({user:e,goalHtml:t=""}={}){const s=Hr.map(r=>`<optgroup label="${vt(r.title)} (${r.names.length})">${r.names.map(o=>`<option value="${vt(o)}">${vt(o)}</option>`).join("")}</optgroup>`).join(""),a=Bf.map((r,o)=>`<button type="button" class="chip pikk-chip pikk-room-mode${o?"":" on"}" aria-pressed="${o?"false":"true"}" data-room-mode="${r}">${r}</button>`).join(""),i=jf.map(r=>`<button type="button" class="chip pikk-chip pikk-room-react" data-react="${r}" aria-label="React ${r}">${r}</button>`).join(""),n=Kf.map(([r,o])=>`<option value="${r}">${o}</option>`).join("");return`
    <div class="card live-disc-panel pikk-rooms" id="liveTabRooms" data-panel="rooms" data-test-mode>
      <div class="pikk-rooms-head"><h3 style="margin:0">Group Rooms</h3><span class="chip">TEST MODE</span></div>
      <p class="muted small">Pick a topic, then start a Video, Voice or Text session. Demo shell only — no camera or microphone is used and no real people join.</p>
      <div id="roomSetup">
        <label class="field">Topic (${Hr.reduce((r,o)=>r+o.names.length,0)} rooms)
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
        ${Ic("room")}
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
        ${Pc("room")}
        <div class="pikk-room-chat"><ul class="list-plain" id="roomChat" aria-label="Room chat"></ul>
          <form id="roomChatForm" class="row" style="gap:6px"><input id="roomChatInput" maxlength="200" placeholder="Message the room" style="flex:1" aria-label="Chat message" /><button class="btn" type="submit">Send</button></form></div>
        <button type="button" class="btn ghost" id="roomLeave">Leave Room</button>
        <p class="muted small">Safety: be respectful; Block / Report ends contact immediately. Real rooms launch only with moderation and age checks.</p>
      </section>
    </div>`}function Vf(e,{toast:t=()=>{},me:s=""}={}){const a=e.querySelector("#liveTabRooms");if(!a)return;const i=d=>a.querySelector(d),n={mode:"Video",msgs:0,reacts:0,hands:0,queue:[],open:!1,pinTimer:null},r=()=>{i("#roomActivity").textContent=`Demo-only activity (this device): 1 participant (you) · ${n.msgs} messages · ${n.reacts} reactions · ${n.hands} hand raises`},o=(d,p)=>{const m=document.createElement("li"),h=d==="You"?s||"You":d;d!=="System"&&pi(fs(),h)&&(m.className="pikk-gb-hl"),m.innerHTML=`<strong>${d==="System"?"System":ui(h)}:</strong> ${vt(p)}`,i("#roomChat").appendChild(m)},c=()=>{i("#roomQueue").innerHTML=n.queue.length?n.queue.map((d,p)=>`<li class="row" style="gap:6px">✋ ${vt(d)} <button type="button" class="chip pikk-chip" data-approve="${p}">Approve speaker</button></li>`).join(""):'<li class="muted small">No speaker requests yet.</li>',a.querySelectorAll("[data-approve]").forEach(d=>d.addEventListener("click",()=>{const p=n.queue.splice(+d.dataset.approve,1)[0];o("System",`${p} approved to speak (demo)`),c()}))};a.querySelectorAll(".pikk-room-mode").forEach(d=>d.addEventListener("click",()=>{n.mode=d.dataset.roomMode,a.querySelectorAll(".pikk-room-mode").forEach(p=>{const m=p===d;p.classList.toggle("on",m),p.setAttribute("aria-pressed",String(m))})})),i("#roomStart").addEventListener("click",()=>{const d=i("#roomTopic").value;if(!d)return t("Pick a topic first");i("#roomTitle").textContent=d,i("#roomModeChip").textContent=n.mode+(n.mode==="Text"?" chat":" (demo · no camera/mic)"),i("#roomStage").hidden=n.mode!=="Video",i("#roomVoice").hidden=n.mode!=="Voice",i("#roomSetup").hidden=!0,i("#roomShell").hidden=!1,o("System",`${n.mode} session started in ${d} · TEST MODE`)}),i("#roomRole").addEventListener("change",d=>{i("#roomHostTools").hidden=d.target.value!=="host"}),i("#roomChatForm").addEventListener("submit",d=>{d.preventDefault();const p=i("#roomChatInput").value.trim();p&&(o("You",p),n.msgs++,i("#roomChatInput").value="",r())}),a.querySelectorAll(".pikk-room-react").forEach(d=>d.addEventListener("click",()=>{n.reacts++,r()})),i("#roomRaiseHand").addEventListener("click",d=>{const p=d.currentTarget.getAttribute("aria-pressed")!=="true";d.currentTarget.setAttribute("aria-pressed",String(p)),d.currentTarget.classList.toggle("on",p),p?(n.hands++,n.queue.push("You")):n.queue=n.queue.filter(m=>m!=="You"),c(),r()}),i("#roomOpenMics").addEventListener("click",d=>{n.open=!n.open,d.currentTarget.setAttribute("aria-pressed",String(n.open)),d.currentTarget.classList.toggle("on",n.open),o("System",`Open microphones ${n.open?"on":"off"} (demo)`)}),a.querySelectorAll("[data-host-act]").forEach(d=>d.addEventListener("click",()=>{const p=d.dataset.hostAct;o("System",{cohost:"Open seat made co-host",mute:"Open seat muted",remove:"Open seat removed",block:"Open seat blocked & reported to moderation"}[p]+" (demo · no real user)")})),i("#roomPinBtn").addEventListener("click",()=>{const d=i("#roomPinText").value.trim();if(!d)return t("Write a thank-you first");const p=+i("#roomPinMins").value,m=Date.now()+p*6e4,h=i("#roomPinned");clearInterval(n.pinTimer);const f=()=>{const v=m-Date.now();if(v<=0||!document.body.contains(h)){h.hidden=!0,clearInterval(n.pinTimer);return}h.hidden=!1,h.innerHTML=`📌 <strong>Pinned thank-you</strong> · ${vt(d)} <small>(${Math.ceil(v/6e4)} min left · TEST MODE)</small>`};f(),n.pinTimer=setInterval(f,15e3)}),i("#roomLeave").addEventListener("click",()=>{clearInterval(n.pinTimer),i("#roomShell").hidden=!0,i("#roomSetup").hidden=!1,i("#roomChat").innerHTML="",Object.assign(n,{msgs:0,reacts:0,hands:0,queue:[]}),c(),r(),t("You left the room")})}function Oc(){const e=(je().query||{}).tab;return e==="live"||e==="channels"?"channels":e==="following"||e==="categories"||e==="rooms"?e:"channels"}function be(){var s;const e=Oc(),t=((s=je().query)==null?void 0:s.category)||"";K(ff(e,t))}function ye(e){return"$"+Number(e||0).toFixed(2)}function ht(e){const t=Number(e)||0;return t>=1e3?(t/1e3).toFixed(t>=1e4?0:1).replace(/\.0$/,"")+"K":String(t)}function zf(e="live"){return`
    <nav class="live-cat-chips" aria-label="Live categories">
      ${[{id:"live",href:"#/live?tab=channels",label:"Live"},{id:"openmic",href:"#/openmic",label:"Open Mic / Talent Discovery (24/7)"},{id:"spotlight",href:"#/spotlight",label:"Spotlight (24/7)"},{id:"viral",href:"#/viral-live",label:"Viral Live · Preview"}].map(a=>{const i=a.id===e?" on":"",n=a.id===e?' aria-current="page"':"";return`<a class="live-cat-chip${i}" href="${a.href}"${n}>${l(a.label)}</a>`}).join("")}
    </nav>`}function Wf(e="channels"){return`
    <nav class="live-disc-tabs" aria-label="Live discovery">
      ${[{id:"following",href:"#/live?tab=following",label:"Following"},{id:"clips",href:"#/shorts",label:"Clips"},{id:"channels",href:"#/live?tab=channels",label:"Channels"},{id:"categories",href:"#/live?tab=categories",label:"Categories"},{id:"rooms",href:"#/live?tab=rooms",label:"Group Rooms"}].map(a=>{const i=a.id===e?" on":"",n=a.id===e?' aria-current="page"':"";return`<a class="live-disc-tab${i}" href="${a.href}" data-tab="${a.id}"${n}>${l(a.label)}</a>`}).join("")}
    </nav>`}function _c(e={}){const t=Uo(),s=t.chipLabel||"House · Music Video",a=t.embed?at(t.embed,"rel=0"):"",i=e.title||"House catalog · while stages are quiet";return`
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
    </div>`}function Yf(e){const t=e?qi(e.id):[],s=new Set(t.map(r=>r.id)),a=gs().filter(r=>s.has(r.hostId)),i=t.length?t.slice(0,12).map(r=>`<a class="chip" href="#/profile/${encodeURIComponent(r.id)}">${l("@"+(r.username||r.id))}</a>`).join(""):'<span class="muted">Nobody followed yet · DEMO</span>';let n;if(!e)n=`
      <p class="muted">Sign in to see lives from accounts you follow.</p>
      <a class="btn primary" href="#/profile">Demo profile</a>
      <p class="chip" style="margin-top:10px">TEST MODE · Following is local demo graph</p>`;else if(!a.length)n=`
      <p class="muted" style="margin:0 0 8px">
        None of the people you follow are live right now (demo filter on seeded Hot lives).
      </p>
      <div class="row wrap" style="gap:6px;margin-bottom:10px">${i}</div>
      <a class="btn ghost" href="#/live?tab=channels">Browse Live channels</a>
      <p class="chip" style="margin-top:10px">TEST MODE · not a scrape</p>
      ${_c({title:"Meanwhile — DatBoiSkeet house catalog on 24/7 stages"})}`;else{const r=a.map(o=>`
        <article class="hot-live-card${o.house?" is-house":""}" data-live-id="${l(o.id)}">
          <div class="live-hoodie" aria-label="Live · ${l(ht(o.viewers))} watching (example data)">
            <span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span>
            <span class="live-hoodie-viewers">${l(ht(o.viewers))}</span><span class="chip pikk-example-tag" title="Example data · not real viewers">Example</span>
          </div>
          <div class="hot-live-body">
            <div class="hot-live-host">@${l(o.hostName)}</div>
            <div class="hot-live-title">${l(o.title)}</div>
            <div class="hot-live-actions row wrap">
              <button type="button" class="btn ghost hot-live-watch" data-id="${l(o.id)}" data-host="${l(o.hostName)}">Watch demo</button>
            </div>
          </div>
        </article>`).join("");n=`
      <p class="muted" style="margin:0 0 8px;font-size:12px">Lives from accounts you follow · ${t.length} following · TEST MODE</p>
      <div class="row wrap" style="gap:6px;margin-bottom:10px">${i}</div>
      <div class="hot-lives-track">${r}</div>`}return`
    <div class="card live-disc-panel" id="liveTabFollowing" data-panel="following">
      <h3 style="margin:0 0 8px">Following</h3>
      ${n}
    </div>`}const Jf=[["The Booth","Rappers, freestyles, hip-hop performances and song previews","🎙️"],["The Stage","Singers, bands, vocalists and instrumental performances","🎤"],["City Takeover","City-versus-city showcases, performances and local pride challenges","🌆"],["Producer Room","Beat showcases, producer collaborations and beat competitions","🎹"],["Ladies Lounge","Women-centered girl talk, beauty, fashion, relationships and community","💅"],["Girl Talk","Everyday conversations, friendships and women’s discussions","💬"],["Tea Time","Celebrity gossip, trending stories and entertainment drama","🫖"],["Who Did What?","Viral moments, celebrity controversies and debates","👀"],["Boss Ladies","Women entrepreneurs, business networking and financial growth","👑"],["Fashion & Fits","Fashion, outfits and personal style","👗"],["Ladies Only Live","Women-centered livestreams and hosted events","🎥"],["What's the Word?","Entertainment news, celebrity conversations, viral moments and trending discussions","🗣️"],["Women in Business","Women entrepreneurs, founders, business networking and mentorship","👩‍💼"],["The Man Cave","Men’s social conversations, sports and community","🤝"],["Men in Business","Men’s entrepreneurship, networking, mentorship and partnerships","👔"],["Girls' Night In","Women-centered social nights, games and discussions","🌙"],["Beauty Bar","Beauty, hair, makeup and skincare conversations","💄"],["Love & Standards","Dating, relationships and boundaries","💗"],["Women's Mental Wellness","Women-centered stress, confidence, emotional wellbeing and peer support","🧠"],["Dating From Her Side","Women-centered dating experiences, relationships and personal standards","💞"],["The Hustle Room: Women","Women-centered side hustles, extra income ideas and building businesses","📈"],["The Barbershop","Men-centered everyday debates, conversation and community","💈"],["Fellas' Night","Men-centered social events and games","🌃"],["Men's Corner","Men-centered life, relationships and personal development","🧢"],["Cars & Motors","Cars, motorcycles, customization and auto culture","🚘"],["Fitness & Brotherhood","Fitness, wellbeing and peer support","💪"],["Fatherhood","Parenting, family responsibilities and raising children","👨‍👧"],["Men's Mental Wellness","Men-centered stress, wellbeing and peer support","🧠"],["Dating From His Side","Men-centered dating experiences and relationship advice","💬"],["Sports Debate","Sports arguments, player comparisons and predictions","🏅"],["Gaming Brotherhood","Gaming, tournaments and player communities","🎮"],["Men's Style","Fashion, grooming, watches and fragrances","⌚"],["The Hustle Room","Careers, side businesses and professional growth","📈"],["Brotherhood & Mentorship","Intergenerational mentoring and peer support","🤝"],["Sports Central","All-sports discussion, fan talk and analysis","🏆"],["Basketball","Basketball discussion and fan streams","🏀"],["Football","American football discussion and fan streams","🏈"],["Soccer","Soccer discussion and fan streams","⚽"],["Baseball","Baseball discussion and fan streams","⚾"],["Hockey","Hockey discussion and fan streams","🏒"],["Tech Talk","AI, gadgets, apps and technology","💻"],["Startups & Innovation","Building businesses, technology and new ideas","🚀"],["World News","International events and global news discussions","🌍"],["Economy & Markets","Inflation, housing, jobs, interest rates and markets","📈"],["Let's Talk","Open conversations, questions and community discussion","🗣️"],["The Hangout","Conversations and social live streams","💬"],["Creator Spotlight","Featured creators and emerging talent","🌟"],["Game Room","Gameplay, tournaments and community games","🎮"],["Why Are You Single?","Coed conversations about single life, dating experiences and relationship challenges","❓"],["What Are You Looking For?","Coed conversations about dating intentions, values and ideal partners","💭"],["Single & Ready to Mingle","Opt-in coed social conversations and introductions for singles","💘"],["Looking for My Match","Opt-in dating live conversations","❤️"],["The Flirt Zone","Dating and connection conversations","💕"],["Speed Connections","Fast-paced introductions and connections","⏱️"],["Poly Connections","Consensual nonmonogamy discussions and connections","🔗"],["Couples Corner","Couples-versus-couples games, trivia, partner challenges, friendly competitions and rematches","💞"],["Date Night Live","Live dating conversations and activities","🌹"],["Love & Advice","Relationship conversations and advice","💌"],["Business Connect & Wealth Academy","Coed business networking and beginner education in entrepreneurship, credit, stocks, crypto, real estate and Roth IRAs","💼"],["City Connect","Meet people by city for friendship, dating, business networking and local conversations","📍"],["Conspiracy Room","Open discussion of theories and claims","🧩"],["Money Talk","Stocks, housing, crypto and financial discussions","💰"],["Just Chatting","Conversations, Q&A and hanging out","💬"],["Gaming","Gameplay, tournaments and community games","🎮"],["Music","Artists, DJs, producers and listening sessions","🎵"],["IRL","Everyday life, travel and outdoor streams","🌎"],["Sports","Sports talk and watch-along discussions","🏀"],["Creative","Art, design, production and making things","🎨"],["Podcasts & Talk Shows","Interviews, panels and conversations","🎙️"],["Food & Cooking","Recipes, kitchens and food reviews","🍳"],["Fitness","Training, wellness and movement","💪"],["Beauty & Fashion","Style, hair, makeup and fashion","✨"],["Business & Money Talk","Entrepreneurs, careers and money discussions","💼"],["Dating & Connections","Opt-in conversations and dating live rooms","❤️"],["Education","Tutorials, learning and study sessions","📚"],["News & Commentary","Current events and opinions","📰"],["Comedy & Entertainment","Comedy, variety and entertainment","🎭"],["Comedy & Roast Battles","1v1, tag team, open mic and tournaments","🎤"]];function Qf(){return`
    <div class="card live-disc-panel" id="liveTabCategories" data-panel="categories">
      <div class="pikk-live-directory-hero">
        <span class="pikk-live-directory-kicker">PIKK LIVE · DISCOVER</span>
        <h3>Find your room.</h3>
        <p>Choose a community, explore a sport or find a conversation. Open a section to browse its topics.</p>
        <span class="pikk-live-directory-note">Discovery categories filter channels; a category is not a hosted room or a live stream. No active stream? You'll see an empty result.</span>
      </div>
      ${vf(Jf,l)}
      <h3 style="margin:20px 0 8px">PIKK 24/7 Stages</h3>
      <div class="live-cat-cards">
        <a class="live-cat-card" href="#/openmic"><strong>Open Mic / Talent Discovery</strong><span class="chip">24/7 stage</span><p class="muted">Join the performance queue</p></a>
        <a class="live-cat-card" href="#/spotlight"><strong>Spotlight Live</strong><span class="chip">24/7 stage</span><p class="muted">Keep Going votes and creator performances</p></a>
        <a class="live-cat-card" href="#/shorts"><strong>Clips / Shorts</strong><span class="chip">Watch</span><p class="muted">Watch short videos</p></a>
        <a class="live-cat-card" href="#/viral-live"><strong>PIKK Viral Live</strong><span class="chip">Preview · not broadcasting</span><p class="muted">Explore the future 24/7 trending channel and original video sources</p></a>
      </div>
    </div>`}function Xf(e){return e!=null&&e.spikedAt?Date.now()-Number(e.spikedAt)<15*60*1e3:!1}function Zf(e=""){const t=gs();return`
    <div class="card hot-lives-rail" id="hotLivesRail">
      <div class="row wrap" style="justify-content:space-between;align-items:baseline;gap:8px">
        <h3 style="margin:0">Hot lives · Top streamers</h3>
        <span class="chip">score · viewers + engagement</span>
      </div>
      <p class="muted" style="margin:6px 0 10px;font-size:12px">TEST MODE · seeded demo · not third-party scrape · house + community</p>
      <div class="hot-lives-track">
        ${(e?t.filter(i=>String(i.category||"").toLowerCase()===e.toLowerCase()):t).map(i=>{const n=Xf(i);return`
      <article class="hot-live-card${n?" is-hot":""}${i.house?" is-house":""}" data-live-id="${l(i.id)}">
        <div class="live-hoodie" aria-label="Live · ${l(ht(i.viewers))} watching (example data)">
          <span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span>
          <span class="live-hoodie-viewers" title="${l(ht(i.viewers))} watching · example">${l(ht(i.viewers))}</span><span class="chip pikk-example-tag" title="Example data · not real viewers">Example</span>
        </div>
        <div class="hot-live-body">
          <div class="hot-live-host">@${l(i.hostName)}</div>
          <div class="hot-live-title">${l(i.title)}</div>
          <div class="hot-live-chips">
            <span class="chip">${l(ht(i.viewers))} watching · Example</span>
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
    </div>`}function ev(e){const t=String(e||"queued");return t==="playing"?'<span class="chip live-chip">Playing</span>':t==="played"?'<span class="chip chip-ok">Played</span>':t==="skipped"?'<span class="chip">Skipped</span>':'<span class="chip">Queued</span>'}function Te(e){const t=Number(e)||0;return t>=1e3?(t/1e3).toFixed(t%1e3===0?0:1).replace(/\.0$/,"")+"K":String(t)}function tv(e,t){if(!e||e.endedAt)return"";const s=Wa(),a=Nd(),i=Rd(e.id).slice(0,12),n=a.map(d=>{const p=d.coins>=_d,m=s>=d.coins;return`
      <button type="button" class="lg-gift" data-slug="${l(d.slug)}" data-coins="${d.coins}" data-confirm="${p?"1":"0"}" title="${l(d.animation)}">
        <span class="lg-gift-emoji">${yt(d.slug)}</span>
        <span class="lg-gift-name">${l(d.name)}</span>
        <span class="lg-gift-price">${l(Te(d.coins))} · ${ye(d.usd)}</span>
        ${m?'<span class="chip">Ready</span>':'<span class="chip">Need demo coins</span>'}
        ${p?'<span class="chip lg-confirm-chip">Confirm</span>':""}
      </button>`}).join(""),r=Va.map(d=>`<button type="button" class="btn ghost lg-buy" data-coins="${d.coins}">${l(Te(d.coins))} · ${ye(d.usd)}</button>`).join(""),o=i.length?i.map(d=>`<li class="lg-hist-row">
            <span class="lg-hist-emoji">${yt(d.giftSlug)}</span>
            <span><strong>${l(d.giftName)}</strong> · @${l(d.fromUser)} · ${l(Te(d.coins))} coins</span>
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
        <span class="chip">Coins ${l(Te(s))} · TEST MODE</span>
        <a class="btn ghost" href="#/wallet" style="font-size:12px">Wallet</a>
      </div>
      <details class="lg-buy-details" style="margin-top:10px">
        <summary class="muted" style="cursor:pointer;font-size:13px">Add demo coins · no payment</summary>
        <div class="row wrap lg-buy-row" style="gap:6px;margin-top:8px">${r}</div>
        <p class="muted" style="margin:8px 0 0;font-size:12px">Demo coin values only. No charge, cash value, or withdrawal.</p>
      </details>`:`
      <div class="card" style="margin-top:8px;padding:12px">
        <p class="muted" style="margin:0">Create a local demo profile to try gifts during this Live. No real account required.</p>
        <a class="btn primary" href="#/profile" style="margin-top:8px">Sign in</a>
      </div>`}
      <h4 style="margin:14px 0 8px;font-size:13px">Recent gifts</h4>
      <ul class="list-plain lg-hist" id="lgHist">${o}</ul>
    </div>`}function sv(e,t){var c;if(!e||e.endedAt)return"";const s=!!(t&&e.hostId===t.id),a=Number(((c=P().wallet)==null?void 0:c.balance)||0),i=on(e.id),n=Eo.map(d=>{const p=d.save>0?`<span class="chip chip-ok lsr-save">Save $${d.save}</span>`:"";return`
      <button type="button" class="lsr-pack" data-pack="${d.pack}" data-price="${d.price}" aria-pressed="false">
        <strong>${l(d.label)}</strong>
        <span class="lsr-pack-price">${ye(d.price)}</span>
        ${p}
      </button>`}).join(""),r=i.length?i.map(d=>{const p=s?`<div class="row wrap lsr-host-acts" style="gap:6px">
                 ${d.status==="queued"||d.status==="playing"?`<button type="button" class="btn primary lsr-play" data-rid="${l(d.requestId)}" data-si="${d.songIndex}">${d.status==="playing"?"Mark played":"Play"}</button>
                        <button type="button" class="btn ghost lsr-skip" data-rid="${l(d.requestId)}" data-si="${d.songIndex}">Skip</button>`:""}
               </div>`:"";return`
          <li class="lsr-queue-row" data-status="${l(d.status)}">
            <div class="lsr-queue-main">
              <strong>${l(d.title)}</strong>
              <span class="muted" style="font-size:12px">@${l(d.username)} · ${l(String(d.pack))}‑pack</span>
            </div>
            ${ev(d.status)}
            ${p}
          </li>`}).join(""):'<li class="muted" style="padding:8px 0">No song requests yet · fans can buy a pack below.</li>',o=t?`
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
      <ul class="list-plain lsr-queue" id="lsrQueue">${r}</ul>
      <h4 style="margin:14px 0 8px;font-size:13px">Request a pack</h4>
      ${o}
    </div>`}function av(e){var r;const t=e.endedAt?Math.max(0,Math.floor((e.endedAt-e.startedAt)/1e3)):Math.max(0,Math.floor((Date.now()-e.startedAt)/1e3)),s=String(Math.floor(t/60)).padStart(2,"0"),a=String(t%60).padStart(2,"0"),i=e.endedAt?`<div class="live-stage-meta"><span class="chip">Ended · ${j(e.endedAt)}</span></div>`:`<div class="live-hoodie live-hoodie--stage" aria-label="Live demo · no real viewers">
          <span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span>
          <span class="live-hoodie-viewers" id="liveViewers" title="TEST MODE demo stream">Demo · no real viewers</span>
        </div>
        <div class="live-stage-meta">
          <span class="chip">${s}:${a}</span>
        </div>`,n=(e.chat||[]).slice(-40).map(o=>`
      <div class="live-chat-row ${o.support?"support":""}${pi(fs(),o.username)?" pikk-gb-hl":""}">
        <strong>${ui(o.username)}</strong>
        <span>${l(o.text)}</span>
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
        <span class="chip">Coins ${Te(Wa())}</span>
        <span class="chip">Wallet ${ye(((r=P().wallet)==null?void 0:r.balance)||0)}</span>
      </div>

      ${e.endedAt?`<p class="muted" style="margin:10px 0 0">Stream ended. Start another below.</p>
             <button class="btn primary" id="liveRestart">New go-live</button>`:`<div class="row wrap" style="margin-top:10px;gap:8px">
               <button class="btn" id="liveTip" data-kind="tip" data-amt="1">Tip $1 · demo</button>
               <button class="btn ghost" id="liveFocusGifts">Gifts tray</button>
               <button class="btn ghost danger" id="liveEnd">End stream</button>
             </div>
             ${Ic("live")}`}
    </div>

    <div class="card live-chat-card">
      <h3>Live chat</h3>
      ${Pc("live")}
      <div class="live-chat" id="liveChat">${n||'<p class="muted">No messages yet.</p>'}</div>
      ${e.endedAt?"":`<div class="row" style="gap:8px;margin-top:10px">
               <input id="liveChatInput" placeholder="Say something…" maxlength="280" style="flex:1" />
               <button class="btn primary" id="liveChatSend">Send</button>
             </div>`}
    </div>
  `}function iv(e){const t=Number(e==null?void 0:e.targetAmount)||0;return t<=0?0:Math.min(100,Math.round((Number(e.raised)||0)/t*100))}function nv(e){const t=Math.max(0,Number(e)-Date.now());if(t<=0)return"Ended · 24h window over";const s=Math.floor(t/36e5),a=Math.floor(t%36e5/6e4);return s>=1?`Resets in ${s}h ${a}m`:`Resets in ${a}m`}function Vr(e,t){if(!e||e.endedAt)return"";const s=e.hostId,a=Fd(s),i=!!(t&&s&&t.id===s),n=Wa();if(!a)return i?`
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
      </div>`;const r=iv(a),o=!!(a.completedAt||r>=100),c=r>=100?"Complete":r>=70?"Close":r>=30?"On the way":"Far",d=[50,100,250].map(m=>`<button type="button" class="btn ghost live-goal-donate" data-goal-id="${l(a.id)}" data-coins="${m}" title="≈ $${(m/50).toFixed(0)}">Donate ${m} coins</button>`).join(""),p=i?`<details class="live-goal-edit" style="margin-top:10px">
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
        <span class="chip${o?" chip-ok":""}">${o?"Goal met":l(c)}</span>
      </div>
      <p class="muted" style="margin:4px 0 8px;font-size:12px">${l(nv(a.endsAt))} · @${l(a.hostName||e.hostName)} · TEST MODE</p>
      <div class="live-goal-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${r}" aria-label="Goal progress">
        <div class="live-goal-fill" style="width:${r}%"></div>
      </div>
      <p class="live-goal-amounts" style="margin:8px 0 10px">
        <strong>${ye(a.raised)}</strong> / ${ye(a.targetAmount)}
        <span class="muted"> · ${r}%</span>
        <span class="chip" style="margin-left:8px">Coins ${l(Te(n))}</span>
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
      <form class="live-goal-custom-form" data-goal-id="${l(a.id)}" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;align-items:end">
        <label style="flex:1;min-width:125px">Custom coins<input type="number" class="live-goal-custom-coins" inputmode="numeric" min="1" max="1000000" step="1" required placeholder="Enter coins" style="width:100%" /></label>
        <button class="btn primary" type="submit">Donate custom</button>
      </form>
      <p class="muted" style="margin:8px 0 0;font-size:11px">50 / 100 / 250 coins ≈ $1 / $2 / $5 · 100 coins = $2 · TEST MODE</p>
      ${p}
    </div>`}function rv(e){return e?`
    <div class="card" id="live-go">
      <h3>Go live · TEST MODE</h3>
      <p class="muted">Fake stream UI with title, viewer stub, chat, tips, gifts (coins), and paid song requests. Persisted in localStorage (<code>dbs_v1.live</code> + <code>coins</code> + <code>liveGiftLedger</code> + <code>liveSongRequests</code>).</p>
      <div class="field"><label>Stream title</label>
        <input id="liveTitle" maxlength="80" placeholder="e.g. Listening session · Long Story Short" value="PIKK Live · ${l(e.username)}" />
      </div>
      ${Ff()}
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
      </div>`}function ov(e){return e.length?`
    <div class="card">
      <h3>Recent streams (this device)</h3>
      <ul class="list-plain">
        ${e.slice(0,8).map(t=>`<li>
              <span><strong>${l(t.title)}</strong><br/><span class="muted" style="font-size:12px">@${l(t.hostName)} · ${j(t.endedAt||t.startedAt)} · tips ${ye(t.tipsTotal)}</span></span>
              <span class="chip">${t.endedAt?"Ended":"Live"}</span>
            </li>`).join("")}
      </ul>
    </div>`:""}function lv(e){if(!e||e.endedAt)return"";const t=Bd(10),s=t.length?t.map((o,c)=>{const d=yt(o.lastSlug||"rose",{className:"gift-sticker gift-sticker--xs"});return`<div class="live-obar-cell" title="${l(o.username)} · ${ye(o.usd)} today">
            <span class="live-obar-rank">${c+1}</span>
            ${d}
            <span class="live-obar-name">${l(o.username)}</span>
          </div>`}).join(""):'<div class="live-obar-empty muted">No gifters yet today</div>',a=wn(10),i=a.length?a.map((o,c)=>{const d=yt("battle-win",{className:"gift-sticker gift-sticker--xs"});return`<div class="live-obar-cell" title="${l(o.username)} · rest of day">
            <span class="live-obar-rank">${c+1}</span>
            ${d}
            <span class="live-obar-name">${l(o.username)}</span>
          </div>`}).join(""):'<div class="live-obar-empty muted">No winners yet today</div>',n=on(e.id).find(o=>o.status==="playing");let r="";if(n){const o=n.title||"Song";r=`
      <div class="live-obar live-obar-spotlight" id="liveRequestSpotlight" role="status" aria-live="polite">
        <span class="live-obar-label">Request Spotlight</span>
        <span class="live-obar-spotlight-name">@${l(n.username||"fan")}</span>
        <span class="muted live-obar-spotlight-song">${l(o)}</span>
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
      ${r}
    </div>`}function cv(e){const t=up();if(!t)return"";const s=yt(t.giftSlug||"rose",{className:"gift-sticker"}),i=e&&e.id===t.fromUserId?`<p class="muted" style="margin:8px 0 0;font-size:12px">You triggered this · others can Challenge you · TEST MODE</p>
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
    </div>`}function dv(e){var i,n,r,o,c,d,p,m;Sn();const t=yn();if(!t||!e)return"";if(t.status==="active"||t.status==="ended"){const h=Math.max(0,Number(t.scoreA)||0),f=Math.max(0,Number(t.scoreB)||0),v=h+f,b=t.status==="active"?Math.max(0,Math.ceil((Number(t.endsAt)-Date.now())/1e3)):0,y=t.winnerName?"@"+l(t.winnerName):"Tie";return`
      <section class="card live-battle-scoreboard" aria-label="Live Gift Battle scoreboard">
        <div class="row wrap" style="justify-content:space-between;align-items:center">
          <strong>⚔️ PIKK Live Battle</strong>
          <span class="chip" id="liveBattleTimer" data-ends-at="${Number(t.endsAt)||0}">${t.status==="active"?b+"s left":"Finished"}</span>
        </div>
        <div class="row" style="justify-content:space-between;gap:12px;margin:12px 0">
          <div><strong>@${l(((i=t.challenger)==null?void 0:i.name)||"Challenger")}</strong><div>${ht(h)} demo points</div></div>
          <strong>VS</strong>
          <div style="text-align:right"><strong>@${l(((n=t.opponent)==null?void 0:n.name)||"Opponent")}</strong><div>${ht(f)} demo points</div></div>
        </div>
        <div class="live-battle-score-track" role="progressbar" aria-label="Challenger share of battle points" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${v?Math.round(h/v*100):50}" style="height:10px;background:var(--blue);border-radius:10px;overflow:hidden">
          <div style="width:${v?Math.round(h/v*100):50}%;height:100%;background:var(--acc)"></div>
        </div>
        ${t.status==="ended"?`<p class="live-battle-winner" style="font-weight:800;margin-top:10px">🏆 ${y} · Battle complete</p>`:'<p class="muted" style="margin-top:10px">Scores update with demo gifts · no real money</p>'}
        <a href="#/giftbattles" class="btn ghost" style="margin-top:8px">Battle details</a>
      </section>`}if(t.status!=="pending")return"";const s=((r=t.opponent)==null?void 0:r.id)===e.id,a=((o=t.challenger)==null?void 0:o.id)===e.id;return!s&&!a?`
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
    </div>`}function pv(){const e=wn(10);return e.length?`
    <div class="card live-gb-day" id="liveGbDayWinners">
      <h3 style="margin:0 0 6px">Gift Battle winners today</h3>
      <p class="muted" style="margin:0 0 8px;font-size:12px">Up to 10 · until end of day · TEST MODE</p>
      <ul class="live-gb-day-list">${e.map((s,a)=>`<li class="live-gb-day-row"><span class="live-gb-day-sticker">${yt("battle-win",{className:"gift-sticker gift-sticker--xs"})}</span><span class="chip">#${a+1}</span><strong>${l(s.username)}</strong></li>`).join("")}</ul>
    </div>`:""}function uv(){var p;const{user:e,live:t}=P(),s=Md(),a=t&&!t.endedAt,i=!!t,n=Oc(),r=((p=je().query)==null?void 0:p.category)||"";let c=`
    <div class="live-disc-panel" data-panel="channels">
      ${r?`<div class="card"><strong>Category: ${l(r)}</strong> <a class="btn ghost" href="#/live?tab=categories">All categories</a> <a class="btn ghost" href="#/live?tab=channels">All channels</a><p class="muted small">Only channels tagged with this category are shown below.</p></div>`:""}
      ${Zf(r)}
      ${r?"":pv()}
      ${a?"":rv(e)}
      ${a?"":_c({title:"No active Live on this device — house catalog on Spotlight / Open Mic"})}
      ${ov(s)}
      <div class="card">
        <p class="muted" style="margin:0 0 8px">More Live tools</p>
        <div class="row wrap">
          <a class="btn ghost" href="#/connect#connect-multistream">Multi-platform go-live</a>
          <a class="btn ghost" href="#/multiguest">Multi-Guest</a>
          <a class="btn ghost" href="#/shorts">Shorts / Clips</a>
        </div>
        <p class="muted" style="margin:8px 0 0;font-size:12px">Open Mic + Spotlight are 24/7 categories (chips above). Clips live under Watch → Shorts / Clips. Gifts + song requests run during an active Live. Gift Battles is not promoted from this page.</p>
      </div>
    </div>`;n==="following"?c=Yf(e):n==="categories"?c=Qf():n==="rooms"&&(c=Hf({user:e,goalHtml:e&&!a?Vr({hostId:e.id,hostName:e.username},e):e?'<p class="muted small">Your Live daily goal is shown above while you are live (TEST MODE).</p>':'<p class="muted small">Sign in to set a room donation goal (reuses the Live daily goal · TEST MODE).</p>'}));const d=`
    ${Wf(n)}
    ${zf("live")}
    ${a?lv(t):""}
    ${a?cv(e):""}
    ${a?dv(e):""}
    ${i?av(t):""}
    ${a?Vr(t,e):""}
    ${a?tv(t,e):""}
    ${a?sv(t,e):""}
    ${c}
  `;return L("PIKK Live",d,{lead:"Following · Clips · Channels · Categories → Shorts · Request Spotlight · TEST MODE.",badge:a?"LIVE":void 0})}const Ji=[];let Ti=!1;function mv(e,t){Ji.push(t),qc(e)}function qc(e){if(Ti)return;const t=e.querySelector("#liveGiftOverlay");if(!t){Ji.length=0;return}const s=Ji.shift();if(!s)return;Ti=!0;const i=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches?900:s.tier==="cinematic"?4200:s.tier==="premium"?2800:1600;t.innerHTML=`
    <div class="lg-overlay-card lg-tier-${l(s.tier||"small")}" data-slug="${l(s.slug)}">
      <div class="lg-overlay-sticker">${yt(s.slug)}</div>
      <div class="lg-overlay-copy">
        <strong>${l(s.name)}</strong>
        <span>@${l(s.fromUser)} · ${l(Te(s.coins))} coins</span>
        <span class="muted lg-overlay-brief">${l(s.animation||"")}</span>
      </div>
    </div>`,t.classList.add("is-on"),window.setTimeout(()=>{t.classList.remove("is-on"),t.innerHTML="",Ti=!1,qc(e)},i)}function hv(e){e.querySelectorAll(".lg-buy").forEach(t=>{t.addEventListener("click",()=>{const s=xo(Number(t.dataset.coins));if((s==null?void 0:s.error)==="bad_package")return g("Unknown coin pack");if(s!=null&&s.error)return g(String(s.error));g(`+${Te(s.pack.coins)} coins · ${ye(s.pack.usd)} · TEST MODE`),be()})}),e.querySelectorAll(".lg-gift").forEach(t=>{t.addEventListener("click",()=>{var o,c,d;const s=t.dataset.slug,a=t.dataset.confirm==="1",i=cn.find(p=>p.slug===s);if(!i)return g("Gift not found");if(a&&!window.confirm(`Send ${i.name} for ${Te(i.coins)} coins (${ye(i.usd)})?
TEST MODE · demo coins only`))return;const n=(o=P().live)==null?void 0:o.id,r=Kd({liveId:n,slug:s});if((r==null?void 0:r.error)==="signin")return g("Sign in first");if((r==null?void 0:r.error)==="offline")return g("Not live");if((r==null?void 0:r.error)==="insufficient")return g(`Need ${Te(r.need)} coins — buy a pack below · TEST MODE`);if((r==null?void 0:r.error)==="bad_gift")return g("Unknown gift");if(r!=null&&r.error)return g(String(r.error));mv(e,{slug:i.slug,name:i.name,coins:i.coins,tier:i.tier,animation:i.animation,fromUser:((c=r.entry)==null?void 0:c.fromUser)||((d=P().user)==null?void 0:d.username)||"you"}),g(`Sent ${i.name} · ${Te(i.coins)} coins · TEST MODE`),window.setTimeout(()=>be(),200)})})}function gv(e){var r,o;const t=e.querySelector("#lsrPacks"),s=e.querySelector("#lsrTitleFields");if(!t||!s)return;let a=1;const i=()=>{const c=a,d=Array.from({length:c},(p,m)=>`<div class="field"><label>Song ${m+1}</label>
        <input class="lsr-title-input" data-i="${m}" maxlength="80" placeholder="Song title…" /></div>`).join("");s.innerHTML=d},n=c=>{a=Number(c)||1,t.querySelectorAll(".lsr-pack").forEach(d=>{const p=Number(d.dataset.pack)===a;d.classList.toggle("on",p),d.setAttribute("aria-pressed",p?"true":"false")}),i()};t.querySelectorAll(".lsr-pack").forEach(c=>{c.addEventListener("click",()=>n(c.dataset.pack))}),n(1),(r=e.querySelector("#lsrSeedWallet"))==null||r.addEventListener("click",()=>{Ma(50,"Song request demo credit · TEST MODE"),g("+$50 wallet demo · TEST MODE"),be()}),(o=e.querySelector("#lsrSubmit"))==null||o.addEventListener("click",()=>{const c=Array.from(e.querySelectorAll(".lsr-title-input")).map(p=>p.value),d=Pd({pack:a,titles:c});if((d==null?void 0:d.error)==="signin")return g("Sign in first");if((d==null?void 0:d.error)==="offline")return g("Not live");if((d==null?void 0:d.error)==="bad_pack")return g("Pick a pack");if((d==null?void 0:d.error)==="title_count")return g(`Enter ${d.need} song title${d.need>1?"s":""}`);if((d==null?void 0:d.error)==="insufficient")return g(`Need ${ye(d.need)} — tap + $50 demo credit · TEST MODE`);if(d!=null&&d.error)return g(String(d.error));g(`Song request submitted · ${ye(d.entry.price)} · TEST MODE`),be()}),e.querySelectorAll(".lsr-play").forEach(c=>{c.addEventListener("click",()=>{var v;const d=c.dataset.rid,p=Number(c.dataset.si),h=on((v=P().live)==null?void 0:v.id).find(b=>b.requestId===d&&b.songIndex===p);let f;if((h==null?void 0:h.status)==="playing"){if(f=Od(d,p),(f==null?void 0:f.error)==="host_only")return g("Host only");if(f!=null&&f.error)return g(String(f.error));g("Marked played · TEST MODE")}else{if(f=Ld(d,p),(f==null?void 0:f.error)==="host_only")return g("Host only");if(f!=null&&f.error)return g(String(f.error));g("Now playing · TEST MODE")}be()})}),e.querySelectorAll(".lsr-skip").forEach(c=>{c.addEventListener("click",()=>{const d=Id(c.dataset.rid,Number(c.dataset.si));if((d==null?void 0:d.error)==="host_only")return g("Host only");if(d!=null&&d.error)return g(String(d.error));g("Skipped · TEST MODE"),be()})})}function fv(e){var s,a,i,n,r,o,c,d,p;yf(e),e.querySelectorAll(".hot-live-watch").forEach(m=>{m.addEventListener("click",()=>{yi();const h=m.dataset.host||"creator",f=m.dataset.id||"",v=e.querySelector(`.hot-live-card[data-live-id="${CSS.escape(f)}"]`);e.querySelectorAll(".hot-live-card.is-watching").forEach(b=>b.classList.remove("is-watching")),v==null||v.classList.add("is-watching"),g(`Watching @${h} · demo only`)})}),e.querySelectorAll(".hot-live-spike").forEach(m=>{m.addEventListener("click",()=>{var b;const h=m.dataset.id,f=lm(h);if((f==null?void 0:f.error)==="missing")return g("Live not found");if(f!=null&&f.error)return g(String(f.error));const v=((b=f.live)==null?void 0:b.hostName)||"creator";g(f.deduped?`Spike @${v} · Admin alert already open`:`Spike @${v} · Admin engagement alert queued`),be()})}),Gf(e),Vf(e,{toast:g,me:((s=P().user)==null?void 0:s.username)||"You"}),Rf(e,{toast:g,me:((a=P().user)==null?void 0:a.username)||"You"}),(i=e.querySelector("#liveStart"))==null||i.addEventListener("click",()=>{var y,k,w,x,S;const m=(k=(y=e.querySelector("#liveTitle"))==null?void 0:y.value)==null?void 0:k.trim(),h=Uf(e);if(!h.category)return g("Pick one Go Live category");const f=Zn(m,h);if((f==null?void 0:f.error)==="signin")return g("Sign in first");if((f==null?void 0:f.error)==="already_live")return g("Already live");const v=(x=(w=e.querySelector("#liveGoalNameGo"))==null?void 0:w.value)==null?void 0:x.trim(),b=Number((S=e.querySelector("#liveGoalAmtGo"))==null?void 0:S.value);if(v&&b>0){const T=Mo({name:v,targetAmount:b});(T==null?void 0:T.error)==="signin"?g("Sign in to set goal"):T!=null&&T.error?g("Goal not set · "+T.error):g(`Live goal set · $${b} · 24h · TEST MODE`)}yi(),g("You are live · TEST MODE"),be()}),(n=e.querySelector("#liveRestart"))==null||n.addEventListener("click",()=>{var f;const m="PIKK Live · "+(((f=P().user)==null?void 0:f.username)||"Demo"),h=Zn(m);if(h!=null&&h.error)return g(String(h.error));yi(),g("Back live · TEST MODE"),be()}),(r=e.querySelector("#liveEnd"))==null||r.addEventListener("click",()=>{Cd(),Wl(),g("Stream ended"),be()}),(o=e.querySelector("#liveTip"))==null||o.addEventListener("click",m=>{const h=m.currentTarget,f=$o({kind:"tip",amount:Number(h.dataset.amt)||1});if((f==null?void 0:f.error)==="signin")return g("Sign in first");if((f==null?void 0:f.error)==="offline")return g("Not live");g("Tip sent · demo"),be()});const t=()=>{var v;const m=e.querySelector("#liveChatInput"),h=(v=m==null?void 0:m.value)==null?void 0:v.trim();if(!h)return g("Type a message");const f=Td(h);if((f==null?void 0:f.error)==="signin")return g("Sign in first");if((f==null?void 0:f.error)==="offline")return g("Not live");(f==null?void 0:f.error)!=="empty"&&(m&&(m.value=""),be())};(c=e.querySelector("#liveChatSend"))==null||c.addEventListener("click",t),(d=e.querySelector("#liveChatInput"))==null||d.addEventListener("keydown",m=>{m.key==="Enter"&&t()}),(p=e.querySelector("#liveFocusGifts"))==null||p.addEventListener("click",()=>{var m;(m=e.querySelector("#liveGifts"))==null||m.scrollIntoView({behavior:"smooth",block:"start"})}),hv(e),gv(e),vv(e)}function vv(e){var a;(a=e.querySelector("#liveGoalSave"))==null||a.addEventListener("click",()=>{var o,c,d;const i=(c=(o=e.querySelector("#liveGoalName"))==null?void 0:o.value)==null?void 0:c.trim(),n=Number((d=e.querySelector("#liveGoalAmt"))==null?void 0:d.value),r=Mo({name:i,targetAmount:n});if((r==null?void 0:r.error)==="signin")return g("Sign in first");if((r==null?void 0:r.error)==="bad_name")return g("Enter a goal name");if((r==null?void 0:r.error)==="bad_amount")return g("Enter a goal amount ($)");if(r!=null&&r.error)return g(String(r.error));g(`Goal live · $${r.goal.targetAmount} · 24h window · TEST MODE`),be()});const t=e.querySelector("#liveGoalSupportMessage"),s=e.querySelector("#liveGoalSupportMessageCount");if(t&&s){const i=()=>{s.textContent=`${t.value.length} / 180`};t.addEventListener("input",i),i()}e.querySelectorAll(".live-goal-custom-form").forEach(i=>{i.addEventListener("submit",n=>{var c,d;n.preventDefault();const r=Number((c=i.querySelector(".live-goal-custom-coins"))==null?void 0:c.value);if(!Number.isSafeInteger(r)||r<1||r>1e6)return g("Enter 1–1,000,000 whole coins");const o=Ca(i.dataset.goalId,r,{message:((d=e.querySelector("#liveGoalSupportMessage"))==null?void 0:d.value)||""});if((o==null?void 0:o.error)==="signin")return g("Sign in first");if((o==null?void 0:o.error)==="insufficient")return g("Not enough demo coins");if(o!=null&&o.error)return g("Donation unavailable · TEST MODE");g("Custom donation sent · TEST MODE"),be()})}),e.querySelectorAll(".live-goal-donate").forEach(i=>{i.addEventListener("click",()=>{var d,p;const n=i.dataset.goalId,r=Number(i.dataset.coins),o=Ca(n,r,{message:((d=e.querySelector("#liveGoalSupportMessage"))==null?void 0:d.value)||""});if((o==null?void 0:o.error)==="signin")return g("Sign in first");if((o==null?void 0:o.error)==="insufficient")return g(`Need ${Te(o.need)} coins — buy a pack in Gifts · TEST MODE`);if((o==null?void 0:o.error)==="expired")return g("Goal ended · 24h window over");if((o==null?void 0:o.error)==="unknown_goal")return g("Goal not found");if((o==null?void 0:o.error)==="invalid_amount")return g("Pick a donate amount");if(o!=null&&o.error)return g(String(o.error));const c=((p=o.donated)==null?void 0:p.usd)??r/50;g(`Donated ${Te(r)} coins ($${Number(c).toFixed(2)}) · TEST MODE`),be()})})}const bv={BASE_URL:"/pikk-app/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_BASE:"/pikk-app/",VITE_BUILD_SHA:"172e64b82e524337dcb24cf3d0d6a5c8bd787825"};function yv(e=bv&&"/pikk-app/"||"/"){return String(e).replace(/\/?$/,"/")+"brand/pikk-logo-official.png"}const wa=ue.filter(e=>["dirty-money","93","no-love"].includes(e.id)).map(e=>({id:e.id,title:e.title,artist:"DatBoiSkeet",url:e.youtube,thumbnail:`https://i.ytimg.com/vi/${encodeURIComponent(new URL(e.youtube).searchParams.get("v"))}/hqdefault.jpg`})),zr=[{id:"videos",label:"Videos"},{id:"clips",label:"Viral clips",browseHref:"#/shorts",browseLabel:"Browse existing PIKK Clips"},{id:"songs",label:"Songs",browseHref:"#/music",browseLabel:"Explore PIKK Music"},{id:"photos",label:"Photos",browseHref:"#/home",browseLabel:"Explore PIKK Home"}];function kv(){const e=wa[0],t=wa.map((s,a)=>`
    <button type="button" class="pikk-viral-choice${a===0?" is-selected":""}"
      data-viral-pick="${a}" aria-pressed="${a===0}">
      <span class="pikk-viral-choice-num">${String(a+1).padStart(2,"0")}</span>
      <img class="pikk-viral-choice-thumb" src="${l(s.thumbnail)}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer">
      <span class="pikk-viral-choice-copy"><strong>${l(s.title)}</strong><small>${l(s.artist)} · Original YouTube source</small></span>
      <span class="pikk-viral-choice-arrow" aria-hidden="true">↗</span>
    </button>`).join("");return L("PIKK Viral Live",`
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
        <div class="pikk-viral-hero-mark" aria-hidden="true"><img class="pikk-viral-hero-logo" src="${l(yv())}" alt="" decoding="async" loading="eager"></div>
      </section>

      <div class="pikk-viral-notice" role="status">
        <strong>PREVIEW · NOT BROADCASTING</strong>
        <span>Real-time viewer counts, live chat, engagement ranking and 24/7 playback are not connected. Nothing here is represented as live.</span>
      </div>

      <nav class="pikk-viral-tabs" aria-label="Viral Live content types" role="tablist">
        ${zr.map((s,a)=>`<button type="button" role="tab" data-viral-type="${s.id}" aria-selected="${a===0}" tabindex="${a===0?0:-1}" aria-controls="viral-panel-${s.id}" id="viral-tab-${s.id}">${s.label}</button>`).join("")}
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
        <div class="pikk-viral-section-head"><h3>Up next · source library</h3><span>Manual preview · ${wa.length} existing music videos</span></div>
        <div class="pikk-viral-queue" id="pikkViralQueue" role="group" aria-label="Choose an original video source">${t}</div>
      </section>

      ${zr.filter(s=>s.id!=="videos").map(s=>`
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
  `,{lead:"Discover the planned 24/7 viral channel · preview only"})}function Sv(e){const t=e.querySelector("#pikkViralPreview");if(!t)return;t.querySelectorAll("[data-viral-pick]").forEach(n=>{n.addEventListener("click",()=>{const r=Number(n.dataset.viralPick),o=wa[r];o&&(t.querySelector("#pikkViralTitle").textContent=o.title,t.querySelector("#pikkViralCreator").textContent=o.artist+" · Watch from the original publisher",t.querySelector("#pikkViralSource").href=o.url,t.querySelector("#pikkViralThumbnail").src=o.thumbnail,t.querySelectorAll("[data-viral-pick]").forEach(c=>{const d=c===n;c.classList.toggle("is-selected",d),c.setAttribute("aria-pressed",String(d))}))})});const s=Array.from(t.querySelectorAll("[data-viral-pick]"));s.forEach((n,r)=>{n.addEventListener("keydown",o=>{if(!["ArrowRight","ArrowLeft","ArrowDown","ArrowUp","Home","End"].includes(o.key))return;o.preventDefault();const c=s.length-1,d=o.key==="Home"?0:o.key==="End"?c:(r+(["ArrowRight","ArrowDown"].includes(o.key)?1:-1)+s.length)%s.length,p=s[d];p.click(),p.focus(),p.scrollIntoView({block:"nearest",inline:"nearest"})})});const a=Array.from(t.querySelectorAll("[data-viral-type]"));function i(n,r=!1){const o=n.dataset.viralType;a.forEach(c=>{const d=c===n;c.setAttribute("aria-selected",String(d)),c.tabIndex=d?0:-1}),t.querySelectorAll("[data-viral-panel]").forEach(c=>{c.hidden=c.dataset.viralPanel!==o}),r&&(n.focus(),n.scrollIntoView({block:"nearest",inline:"nearest"}))}a.forEach((n,r)=>{n.addEventListener("click",()=>i(n)),n.addEventListener("keydown",o=>{if(!["ArrowRight","ArrowLeft","Home","End"].includes(o.key))return;o.preventDefault();const c=a.length-1,d=o.key==="Home"?0:o.key==="End"?c:(r+(o.key==="ArrowRight"?1:-1)+a.length)%a.length;i(a[d],!0)})})}function ws(){K("#/marketplace")}const wv={pending:"Pending",approved:"Approved",rejected:"Rejected"},$v=[{v:"sponsored_post",label:"Sponsored post"},{v:"livestream_promo",label:"Livestream promo"},{v:"affiliate",label:"Affiliate link"},{v:"storefront",label:"Product storefront"}];function Ev(){const{brandApps:e,user:t}=P(),s=Vd(),a=s.filter(o=>o.active),i=a.length?a.map(o=>`
      <article class="card market-listing" data-id="${l(o.id)}">
        <div class="row wrap">
          <span class="chip">Sponsored</span>
          <span class="chip">${l(o.disclosure||"Paid partnership")}</span>
          <span class="muted spacer" style="text-align:right;font-size:12px">${j(o.at)}</span>
        </div>
        <h3 style="margin:8px 0 4px">${l(o.title)}</h3>
        <p class="muted" style="margin:0 0 6px">${l(o.brand)}</p>
        <p style="margin:0 0 10px;font-size:14px">${l(o.blurb||"")}</p>
        <div class="row wrap">
          ${o.url?`<a class="btn" href="${l(o.url)}" target="_blank" rel="noopener">Visit offer</a>`:""}
          <button class="btn ghost listing-toggle" data-id="${l(o.id)}" data-active="0">Hide · demo</button>
        </div>
      </article>`).join(""):'<div class="card"><p class="muted" style="margin:0">No active sponsored listings yet. Apply as a brand or create a demo listing below.</p></div>',n=e.length?e.map(o=>`
      <div class="card" style="margin:0 0 10px;background:#12121a" data-app="${l(o.id)}">
        <div class="row wrap">
          <strong>${l(o.brand)}</strong>
          <span class="chip">${l(wv[o.status]||o.status)}</span>
          <span class="muted spacer" style="text-align:right">${j(o.at)}</span>
        </div>
        <p class="muted" style="margin:6px 0;font-size:12px">${l(o.email)} · ${l(o.campaign)} · budget ${l(o.budget||"—")}</p>
        <p style="font-size:13px;margin:0 0 8px">${l((o.pitch||"").slice(0,160))}</p>
        <div class="row wrap">
          <button class="btn primary brand-status" data-id="${l(o.id)}" data-status="approved">Approve</button>
          <button class="btn ghost brand-status" data-id="${l(o.id)}" data-status="rejected">Reject</button>
          ${o.status==="approved"?`<button class="btn brand-to-listing" data-id="${l(o.id)}" data-brand="${l(o.brand)}" data-url="${l(o.url||"")}" data-pitch="${l(o.pitch||"")}">Create listing</button>`:""}
        </div>
      </div>`).join(""):'<p class="muted">No brand applications yet.</p>',r=`
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
          ${$v.map(o=>`<option value="${o.v}">${l(o.label)}</option>`).join("")}
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

    ${s.some(o=>!o.active)?`<div class="card">
            <h3>Hidden listings</h3>
            ${s.filter(o=>!o.active).map(o=>`<div class="row wrap" style="margin-bottom:8px">
                  <span>${l(o.title)} · ${l(o.brand)}</span>
                  <button class="btn ghost listing-toggle" data-id="${l(o.id)}" data-active="1">Show</button>
                </div>`).join("")}
          </div>`:""}
  `;return L("Marketplace",r,{lead:"Brand applications & sponsored listings · localStorage demo."})}function xv(e){var t,s;(t=e.querySelector("#mSubmit"))==null||t.addEventListener("click",()=>{var i,n,r,o,c,d,p;const a=Gd({brand:(i=e.querySelector("#mBrand"))==null?void 0:i.value,contact:(n=e.querySelector("#mContact"))==null?void 0:n.value,email:(r=e.querySelector("#mEmail"))==null?void 0:r.value,budget:(o=e.querySelector("#mBudget"))==null?void 0:o.value,campaign:(c=e.querySelector("#mCampaign"))==null?void 0:c.value,url:(d=e.querySelector("#mUrl"))==null?void 0:d.value,pitch:(p=e.querySelector("#mPitch"))==null?void 0:p.value});if((a==null?void 0:a.error)==="required")return g("Brand and email required");g("Application saved"),ws()}),e.querySelectorAll(".brand-status").forEach(a=>{a.addEventListener("click",()=>{Ud(a.dataset.id,a.dataset.status),g("Marked "+a.dataset.status),ws()})}),e.querySelectorAll(".brand-to-listing").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.brand||"Brand",n=sr({title:`${i} · sponsored`,brand:i,blurb:a.dataset.pitch||"Sponsored offer from approved brand application.",url:a.dataset.url||"",disclosure:"Paid partnership · TEST MODE",brandAppId:a.dataset.id});if(n!=null&&n.error)return g("Could not create listing");g("Listing published"),ws()})}),(s=e.querySelector("#lCreate"))==null||s.addEventListener("click",()=>{var i,n,r,o,c;const a=sr({title:(i=e.querySelector("#lTitle"))==null?void 0:i.value,brand:(n=e.querySelector("#lBrand"))==null?void 0:n.value,blurb:(r=e.querySelector("#lBlurb"))==null?void 0:r.value,url:(o=e.querySelector("#lUrl"))==null?void 0:o.value,disclosure:(c=e.querySelector("#lDisc"))==null?void 0:c.value});if((a==null?void 0:a.error)==="required")return g("Title and brand required");g("Listing published"),ws()}),e.querySelectorAll(".listing-toggle").forEach(a=>{a.addEventListener("click",()=>{Hd(a.dataset.id,a.dataset.active==="1"),g(a.dataset.active==="1"?"Listing shown":"Listing hidden"),ws()})})}function Av(e){const t=Array.isArray(e==null?void 0:e.messages)?e.messages:[],s=t.length?t[t.length-1]:null,a=String((e==null?void 0:e.peerName)||(e==null?void 0:e.peerId)||""),i=String((s==null?void 0:s.text)||"").slice(0,80);return`${a} ${i}`.toLowerCase()}function Nc(e,t,s=!1){const a=Math.max(0,Math.trunc(Number(t)||0)),i=Math.min(a,Math.max(0,Math.trunc(Number(e)||0))),n=`conversation${a===1?"":"s"}`;return s?`Showing ${i} of ${a} ${n}`:`${a} ${n}`}const Mi={},Cv=String((Mi==null?void 0:Mi.VITE_PIKK_API_BASE)||"").trim().replace(/\/$/,"");function Rc(){return((typeof window<"u"&&typeof window.__PIKK_API_BASE__=="string"?window.__PIKK_API_BASE__.trim():"")||Cv).replace(/\/$/,"")}function Bc(){return!!Rc()}async function $s(e,{method:t="GET",body:s}={}){var r,o,c;const a=Rc();if(!a){const d=new Error("PIKK API is not configured");throw d.code="api_not_configured",d}const i=await fetch(a+e,{method:t,credentials:"include",headers:s===void 0?void 0:{"Content-Type":"application/json"},body:s===void 0?void 0:JSON.stringify(s)});let n=null;try{n=await i.json()}catch{}if(!i.ok){const d=new Error(((r=n==null?void 0:n.error)==null?void 0:r.message)||`Request failed (${i.status})`);throw d.status=i.status,d.code=((o=n==null?void 0:n.error)==null?void 0:o.code)||"request_failed",d.details=((c=n==null?void 0:n.error)==null?void 0:c.details)||null,d}return n}const Yt={list:()=>$s("/messages/conversations"),start:e=>$s("/messages/conversations",{method:"POST",body:{handle:e}}),get:e=>$s("/messages/conversations/"+encodeURIComponent(e)),send:(e,t)=>$s("/messages/conversations/"+encodeURIComponent(e)+"/messages",{method:"POST",body:{message:t}}),markRead:e=>$s("/messages/conversations/"+encodeURIComponent(e)+"/read",{method:"POST",body:{}})};function Z(e){K(e||"#/messages")}function Tv(e){const t=e.messages||[];if(!t.length)return"No messages yet";const s=t[t.length-1];return(s.priority?"⚡ ":"")+(s.text||"").slice(0,80)}function Mv(){return L("Messages",`<section class="pikk-msg-flow-hero" aria-label="PIKK messages sign-in">
      <span class="pikk-msg-flow-kicker">PIKK CONNECT · PRIVATE MESSAGES</span>
      <h2>Your conversations. <em>Your circle.</em></h2>
      <p>Try DMs, group conversations and the creator messages with a local demo account.</p>
      <span class="chip">TEST MODE · No server messaging</span>
    </section>
    <div class="card pikk-msg-flow-panel">
      <h3>Sign in required</h3>
      <p class="muted">Private DMs, team inbox, and group chats need a local demo account.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,{lead:"Private messaging & team inbox · TEST MODE"})}function Dv(e){const t=un(),s=t.filter(n=>Ta(n)>0),a=P().messagePrefs||{allowDMs:!0,allowRequests:!0},i=t.map(n=>{const r=n.kind==="group",o=!r&&n.peerId==="dbs",c=[r?'<span class="chip">Group</span>':"",o?'<span class="chip">Team</span>':"",n.request?'<span class="chip">Request</span>':"",n.muted?'<span class="chip">Muted</span>':"",n.blocked?'<span class="chip">Blocked</span>':""].filter(Boolean).join(" "),d=Ta(n),p=d?`<span class="chip msg-unread-chip" aria-label="${d} unread">${d}</span>`:"";return`
      <button type="button" class="msg-thread-row${d?" has-unread":""}" data-search="${l(Av(n))}" data-unread="${d>0}" data-open-thread="${l(n.id)}">
        <div class="pikk-msg-avatar" aria-hidden="true">${l(String(n.peerName||n.peerId||"?").slice(0,1).toUpperCase())}</div>
        <div class="pikk-msg-thread-body"><div class="msg-thread-top">
          <strong>${l(n.peerName||n.peerId)}</strong>
          <span class="muted">${l(j(n.updatedAt||0))}</span>
        </div>
        <div class="msg-thread-preview muted">${l(Tv(n))}</div>
        <div class="msg-thread-chips">${p}${c}</div></div>
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
      <p id="pikkMsgResultCount" class="muted" role="status" aria-live="polite" aria-atomic="true" style="margin:8px 0 0;font-size:.875rem">${Nc(t.length,t.length)}</p>
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
  `}function Pv(){return`
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
    <section class="pikk-msg-contact-grid" aria-label="Available demo contacts">${Ws().map(s=>{const a=s.team||Po(s.id),i=s.team?"Creator message":a?"Message":"Message request";return`
      <article class="card msg-contact pikk-msg-contact-card">
        <div class="msg-contact-head">
          <span class="pikk-msg-contact-avatar" aria-hidden="true">${l(String(s.username||"?").slice(0,1).toUpperCase())}</span>
          <strong>${l(s.username)}</strong>
          ${s.team?'<span class="chip">Creator</span>':a?'<span class="chip">Mutual</span>':'<span class="chip">Request</span>'}
        </div>
        <p class="muted" style="margin:6px 0 10px">${l(s.bio||"")}</p>
        <button type="button" class="btn ${s.team?"primary":""}" data-start-peer="${l(s.id)}" data-peer-name="${l(s.username)}">${l(i)}</button>
      </article>`}).join("")}</section>
  `}function Lv(){return`
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
  `}function Iv(e,{teamPriorityHint:t=!1}={}){const s=P().user,a=e.kind==="group",i=!a&&e.peerId==="dbs",n=!!e.blocked,r=(e.messages||[]).map(d=>`
      <div class="msg-bubble ${d.from===(s==null?void 0:s.id)?"mine":""} ${d.priority?"priority":""}">
        <div class="msg-bubble-meta">
          <strong>${l(d.fromName||d.from)}</strong>
          ${d.priority?'<span class="chip priority-chip">Priority</span>':""}
          <span class="muted">${l(j(d.at))}</span>
        </div>
        <div class="msg-bubble-text">${l(d.text)}</div>
      </div>`).join(""),o=e.request?'<div class="msg-banner">Message request · recipient approval stub (demo still delivers locally)</div>':"",c=t?'<div class="msg-banner priority">Next send can use Priority $2.99 TEST MODE (wallet note only — not charged).</div>':"";return`
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
    ${o}
    ${c}
    <div class="card msg-thread-card pikk-msg-flow-panel">
      <div class="msg-thread" id="msgThread">${r||'<p class="muted">No messages yet — say hi.</p>'}</div>
      ${n?'<p class="muted" style="margin-top:10px">Thread blocked · composer disabled (demo).</p>':`<div class="msg-composer">
               <input id="msgInput" placeholder="${i?"Write an inquiry…":"Message…"}" maxlength="500" />
               <button type="button" class="btn primary" id="msgSend">Send</button>
               ${i?'<button type="button" class="btn" id="msgSendPriority" title="TEST MODE — not charged">Priority $2.99</button>':""}
             </div>`}
    </div>
  `}function Ov(e=[]){return e.length?e.map(t=>{const s=t.peer_display_name||t.peer_handle||"PIKK user",a=t.last_message||"No messages yet",i=t.last_message_at||t.created_at;return`<button type="button" class="msg-thread-row persistent-msg-row" data-open-remote-thread="${l(t.id)}">
      <div class="pikk-msg-avatar" aria-hidden="true">${l(String(s).slice(0,1).toUpperCase())}</div>
      <div class="pikk-msg-thread-body">
        <div class="msg-thread-top"><strong>${l(s)}</strong><span class="muted">${i?l(j(Date.parse(i))):""}</span></div>
        <div class="msg-thread-preview muted">${l(a.slice(0,100))}</div>
        <div class="msg-thread-chips"><span class="chip">Persistent</span><span class="muted">@${l(t.peer_handle||"user")}</span></div>
      </div>
    </button>`}).join(""):'<div class="msg-empty"><p class="muted">No persistent conversations yet.</p><a class="btn primary" href="#/messages?view=new">Start a chat</a></div>'}function Wr(e,t=""){var r,o;const s=e==null?void 0:e.conversation,a=(e==null?void 0:e.messages)||[];if(!s)return'<div class="card muted">Conversation not found.</div>';const i=((r=s.peer)==null?void 0:r.display_name)||((o=s.peer)==null?void 0:o.handle)||"PIKK user",n=a.map(c=>{var p;const d=c.sender_id===t;return`<div class="msg-bubble ${d?"mine":""}">
      <div class="msg-bubble-meta"><strong>${d?"You":"@"+l(c.sender_handle||((p=s.peer)==null?void 0:p.handle)||"user")}</strong><span class="muted">${l(j(Date.parse(c.created_at)))}</span></div>
      <div class="msg-bubble-text">${l(c.body)}</div>
    </div>`}).join("");return`<section class="pikk-msg-flow-hero pikk-msg-flow-hero-thread"><span class="pikk-msg-flow-kicker">PIKK CONNECT · DIRECT MESSAGES</span><h2>${l(i)}</h2><p>Persistent private conversation stored on PIKK.</p><span class="chip">Backend message thread</span></section>
    <div class="card msg-thread-head pikk-msg-flow-panel"><button type="button" class="btn ghost" data-remote-inbox>← Inbox</button><h3 style="margin:10px 0 0">${l(i)}</h3></div>
    <div class="card msg-thread-card pikk-msg-flow-panel">
      <div class="msg-thread" id="remoteMsgThread">${n||'<p class="muted">No messages yet — say hi.</p>'}</div>
      <div class="msg-composer"><input id="remoteMsgInput" placeholder="Message…" maxlength="4000" /><button type="button" class="btn primary" id="remoteMsgSend">Send</button></div>
    </div>`}function _v(e,t){var i,n;if(!t)return L("Messages",'<section class="pikk-msg-flow-hero"><span class="pikk-msg-flow-kicker">PIKK CONNECT · PRIVATE MESSAGES</span><h2>Your conversations.</h2><p>Sign in with your PIKK account to use persistent private messages.</p><span class="chip">Backend messaging</span></section><div class="card"><a class="btn primary" href="#/profile">Sign in</a></div>',{lead:"Persistent private messaging"});const s=((i=e==null?void 0:e.query)==null?void 0:i.view)||"",a=((n=e==null?void 0:e.query)==null?void 0:n.t)||"";return a?L("Messages",`<div id="persistentMessageThread" data-thread-id="${l(a)}"><div class="card muted">Loading conversation…</div></div>`,{lead:"Persistent private messaging"}):s==="new"?L("Messages",'<section class="pikk-msg-flow-hero"><span class="pikk-msg-flow-kicker">PIKK CONNECT · NEW CONVERSATION</span><h2>Start a private chat.</h2><p>Enter the PIKK username you want to message.</p><span class="chip">Verified accounts only</span></section><div class="card pikk-msg-flow-panel"><button type="button" class="btn ghost" data-remote-inbox>← Inbox</button><form id="remoteNewChatForm" style="margin-top:12px"><div class="field"><label for="remotePeerHandle">PIKK username</label><input id="remotePeerHandle" name="handle" maxlength="30" pattern="[A-Za-z0-9_]{3,30}" autocomplete="off" required placeholder="username" /></div><button class="btn primary" type="submit">Start conversation</button></form></div>',{lead:"Persistent private messaging"}):L("Messages",'<section class="pikk-messages-hero"><div><p class="kicker">PIKK CONNECT · MESSAGES</p><h2>Your conversations.</h2><p>Private messages tied to your PIKK account.</p></div><span class="pikk-messages-hero-mark" aria-hidden="true">✉</span></section><div class="pikk-msg-tools"><div class="pikk-msg-tool-actions"><a class="btn primary" href="#/messages?view=new">+ New chat</a></div></div><div class="card"><h3>Inbox</h3><div class="msg-inbox" id="persistentMsgInbox"><p class="muted">Loading conversations…</p></div></div>',{lead:"Persistent private messaging · backend stored"})}async function Kc(e){var i,n,r,o;const t=P().user;if(!t)return;e.querySelectorAll("[data-remote-inbox]").forEach(c=>c.addEventListener("click",()=>Z("#/messages")));const s=e.querySelector("#persistentMsgInbox");if(s)try{const c=await Yt.list();s.innerHTML=Ov(c.conversations||[]),s.querySelectorAll("[data-open-remote-thread]").forEach(d=>d.addEventListener("click",()=>Z("#/messages?t="+encodeURIComponent(d.dataset.openRemoteThread))))}catch(c){s.innerHTML=(c==null?void 0:c.status)===401?'<p class="muted">Your session expired. <a href="#/profile">Sign in again</a>.</p>':`<p class="muted">Could not load messages: ${l((c==null?void 0:c.message)||"Unknown error")}</p>`}(i=e.querySelector("#remoteNewChatForm"))==null||i.addEventListener("submit",async c=>{c.preventDefault();const d=c.currentTarget.elements.handle.value.trim();if(d)try{const p=await Yt.start(d);Z("#/messages?t="+encodeURIComponent(p.conversation.id))}catch(p){g((p==null?void 0:p.code)==="email_unverified"?"Verify your email before starting messages":(p==null?void 0:p.message)||"Could not start conversation")}});const a=e.querySelector("#persistentMessageThread");if(a){const c=a.dataset.threadId;try{const d=await Yt.get(c);a.innerHTML=Wr(d,t.id),await Yt.markRead(c).catch(()=>{}),(n=a.querySelector("[data-remote-inbox]"))==null||n.addEventListener("click",()=>Z("#/messages"));const p=async()=>{var v;const h=a.querySelector("#remoteMsgInput"),f=(v=h==null?void 0:h.value)==null?void 0:v.trim();if(!f)return g("Type a message");try{await Yt.send(c,f);const b=await Yt.get(c);a.innerHTML=Wr(b,t.id),Kc(e),g("Sent")}catch(b){g((b==null?void 0:b.code)==="email_unverified"?"Verify your email before sending messages":(b==null?void 0:b.message)||"Could not send")}};(r=a.querySelector("#remoteMsgSend"))==null||r.addEventListener("click",p),(o=a.querySelector("#remoteMsgInput"))==null||o.addEventListener("keydown",h=>{h.key==="Enter"&&(h.preventDefault(),p())});const m=a.querySelector("#remoteMsgThread");m&&(m.scrollTop=m.scrollHeight)}catch(d){a.innerHTML=(d==null?void 0:d.status)===404?'<div class="card muted">Conversation not found or unavailable.</div>':`<div class="card muted">Could not load conversation: ${l((d==null?void 0:d.message)||"Unknown error")}</div>`}}}function qv(e){var r,o,c;const t=P().user;if(Bc())return _v(e,t);if(!t)return Mv();Ws(),mn();const s=((r=e==null?void 0:e.query)==null?void 0:r.view)||"",a=((o=e==null?void 0:e.query)==null?void 0:o.t)||"",i=((c=e==null?void 0:e.query)==null?void 0:c.priority)==="1";let n;if(a){const d=Do(a);d?n=Iv(d,{teamPriorityHint:i&&d.peerId==="dbs"}):n='<div class="card"><p class="muted">Thread not found.</p><button type="button" class="btn" id="msgBackInbox">← Inbox</button></div>'}else s==="new"?n=Pv():s==="team"?n=Lv():n=Dv();return L("Messages",n,{lead:"DMs, group chats, and creator messages · TEST MODE"})}function Nv(e){var d,p,m,h,f,v,b,y,k,w,x,S,T,_,N,$,H;const t=P().user;if(Bc()){Kc(e);return}if(!t)return;const s=()=>Z("#/messages");(d=e.querySelector("#msgBackInbox"))==null||d.addEventListener("click",s),(p=e.querySelector("#msgMarkAllRead"))==null||p.addEventListener("click",()=>{const M=un().filter(B=>Ta(B)>0);M.length&&(M.forEach(B=>ar(B.id)),g(`${M.length} conversation${M.length===1?"":"s"} marked read`),Z("#/messages"))}),(m=e.querySelector("#msgNewChat"))==null||m.addEventListener("click",()=>Z("#/messages?view=new")),(h=e.querySelector("#pikkNewChatTop"))==null||h.addEventListener("click",()=>Z("#/messages?view=new"));const a=()=>{var ke,W;const M=String(((ke=e.querySelector("#pikkMsgSearch"))==null?void 0:ke.value)||"").trim().toLowerCase(),B=!!((W=e.querySelector("#pikkMsgUnreadOnly"))!=null&&W.checked);let G=0;e.querySelectorAll("#msgInbox [data-open-thread]").forEach(ne=>{const Se=!M||String(ne.dataset.search||"").includes(M),Y=!B||ne.dataset.unread==="true";ne.hidden=!(Se&&Y),ne.hidden||G++});const D=e.querySelectorAll("#msgInbox [data-open-thread]").length,O=e.querySelector("#pikkMsgResultCount");O&&(O.textContent=Nc(G,D,!!(M||B)));const R=e.querySelector("#pikkMsgNoResults");R&&(R.textContent=B?M?"No unread conversations match your search.":"No unread conversations.":"No conversations match your search.",R.hidden=G>0||!M&&!B);const ie=e.querySelector("#pikkMsgClearFilters");ie&&(ie.hidden=!M&&!B)};(f=e.querySelector("#pikkMsgClearFilters"))==null||f.addEventListener("click",()=>{const M=e.querySelector("#pikkMsgSearch"),B=e.querySelector("#pikkMsgUnreadOnly");M&&(M.value=""),B&&(B.checked=!1),a(),M==null||M.focus()});const i=e.querySelector("#pikkMsgSearch");i==null||i.addEventListener("input",a),i==null||i.addEventListener("keydown",M=>{M.key!=="Escape"||!i.value||(M.preventDefault(),M.stopPropagation(),i.value="",a())}),(v=e.querySelector("#pikkMsgUnreadOnly"))==null||v.addEventListener("change",a),(b=e.querySelector("#msgEmptyNew"))==null||b.addEventListener("click",()=>Z("#/messages?view=new")),(y=e.querySelector("#msgOpenTeam"))==null||y.addEventListener("click",()=>Z("#/messages?view=team")),(k=e.querySelector("#pikkGroupTop"))==null||k.addEventListener("click",()=>{var M;return(M=e.querySelector("#msgOpenGroup"))==null?void 0:M.click()}),(w=e.querySelector("#msgOpenGroup"))==null||w.addEventListener("click",()=>{const M=Jd();if(M!=null&&M.error){g("Sign in required");return}g("Opened DBS Fans"),Z("#/messages?t="+encodeURIComponent(M.id))}),(x=e.querySelector("#msgTeamFree"))==null||x.addEventListener("click",()=>{const M=_s("dbs","DatBoiSkeet");if(M.error)return g("Sign in required");Z("#/messages?t="+encodeURIComponent(M.id))}),(S=e.querySelector("#msgTeamPriority"))==null||S.addEventListener("click",()=>{const M=_s("dbs","DatBoiSkeet");if(M.error)return g("Sign in required");Z("#/messages?t="+encodeURIComponent(M.id)+"&priority=1")}),e.querySelectorAll("[data-start-peer]").forEach(M=>{M.addEventListener("click",()=>{const B=M.dataset.startPeer,G=M.dataset.peerName||B;if(B==="dbs"){Z("#/messages?view=team");return}const D=_s(B,G);if(D.error)return g("Sign in required");D.request&&g("Request thread created · demo"),Z("#/messages?t="+encodeURIComponent(D.id))})}),e.querySelectorAll("[data-open-thread]").forEach(M=>{M.addEventListener("click",()=>{Z("#/messages?t="+encodeURIComponent(M.dataset.openThread))})}),(T=e.querySelector("#msgPrefDMs"))==null||T.addEventListener("change",M=>{ir({allowDMs:!!M.target.checked}),g(M.target.checked?"DMs allowed":"DMs disabled (stub)")}),(_=e.querySelector("#msgPrefRequests"))==null||_.addEventListener("change",M=>{ir({allowRequests:!!M.target.checked}),g(M.target.checked?"Requests allowed":"Requests disabled (stub)")});const n=new URLSearchParams(location.hash.split("?")[1]||"").get("t"),r=n?Do(n):null;r&&ar(r.id),e.querySelectorAll("[data-flag]").forEach(M=>{M.addEventListener("click",()=>{if(!r)return;const B=M.dataset.flag;if(B==="mute"){const G=gi(r.id,{muted:!r.muted});g(G.muted?"Muted":"Unmuted"),Z("#/messages?t="+encodeURIComponent(r.id))}else if(B==="block"){const G=gi(r.id,{blocked:!r.blocked});g(G.blocked?"Blocked":"Unblocked"),Z("#/messages?t="+encodeURIComponent(r.id))}else B==="report"&&(gi(r.id,{report:!0}),g("Reported · stub (Guidelines §13)"),Z("#/messages?t="+encodeURIComponent(r.id)))})});const o=M=>{if(!r)return;const B=e.querySelector("#msgInput"),G=(B==null?void 0:B.value)||"";let D;if(r.kind==="group"?D=Qd(r.id,G):D=Wd(r.peerId,r.peerName,G,{priority:!!M}),(D==null?void 0:D.error)==="empty")return g("Type a message");if(D!=null&&D.error)return g("Could not send");g(M?"Priority sent · TEST MODE $2.99 not charged":"Sent"),Z("#/messages?t="+encodeURIComponent(r.id))};(N=e.querySelector("#msgSend"))==null||N.addEventListener("click",()=>o(!1)),($=e.querySelector("#msgSendPriority"))==null||$.addEventListener("click",()=>o(!0)),(H=e.querySelector("#msgInput"))==null||H.addEventListener("keydown",M=>{M.key==="Enter"&&(M.preventDefault(),o(!1))});const c=e.querySelector("#msgThread");c&&(c.scrollTop=c.scrollHeight)}const Yr=Object.freeze({releases:!0,lives:!0,messages:!0,quietHours:!1}),_t=Object.freeze([{key:"releases",title:"New music releases",detail:"Keep track of new DatBoiSkeet music and official drops.",group:"discover"},{key:"lives",title:"Livestreams",detail:"Choose whether you want live-session updates.",group:"discover"},{key:"messages",title:"Messages",detail:"Control conversation notification preferences.",group:"social"},{key:"quietHours",title:"Quiet hours",detail:"Save your preference for a quieter experience.",group:"social"}]);function Jr(e,t){const s=!!t[e.key];return`<label class="pikk-notif-row" for="pikk-notif-${e.key}">
    <span class="pikk-notif-row-copy"><strong>${e.title}</strong><small>${e.detail}</small></span>
    <input id="pikk-notif-${e.key}" type="checkbox" data-k="${e.key}" ${s?"checked":""} />
  </label>`}function Rv(){const e=P().notifications||{},t=_t.filter(s=>!!e[s.key]).length;return L("Notifications",`
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
          ${_t.filter(s=>s.group==="discover").map(s=>Jr(s,e)).join("")}
        </section>
        <section class="pikk-notif-panel" aria-labelledby="pikkNotifSocialTitle">
          <div class="pikk-notif-panel-head"><span class="pikk-notif-panel-icon" aria-hidden="true">✉</span><div><span class="pikk-notif-kicker">YOUR SPACE</span><h3 id="pikkNotifSocialTitle">Social &amp; Focus</h3></div></div>
          ${_t.filter(s=>s.group==="social").map(s=>Jr(s,e)).join("")}
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
    </div>`,{lead:"Music, live and social preferences · browser-local demo."})}function Bv(e){var a,i,n;const t=e.querySelector("#notifPrefs");if(!t)return;const s=r=>{const o=["releases","lives","messages"];mi(Object.fromEntries(o.map(h=>[h,r]))),t.querySelectorAll("input[data-k]").forEach(h=>{o.includes(h.dataset.k)&&(h.checked=r)});const c=P().notifications||{},d=_t.filter(h=>!!c[h.key]).length,p=t.querySelector("#pikkNotifEnabled");p&&(p.textContent=`${d} of 4`);const m=t.querySelector("#pikkNotifStatus");m&&(m.textContent=r?"Music, live and message preferences resumed on this device. Real push delivery is not connected.":"Music, live and message preferences paused on this device. Real push delivery is not connected."),g(r?"Alerts resumed":"Alerts paused")};(a=t.querySelector("#pikkNotifPause"))==null||a.addEventListener("click",()=>s(!1)),(i=t.querySelector("#pikkNotifResume"))==null||i.addEventListener("click",()=>s(!0)),(n=t.querySelector("#pikkNotifReset"))==null||n.addEventListener("click",()=>{mi(Yr),t.querySelectorAll("input[data-k]").forEach(c=>{c.checked=Yr[c.dataset.k]});const r=t.querySelector("#pikkNotifEnabled");r&&(r.textContent="3 of 4");const o=t.querySelector("#pikkNotifStatus");o&&(o.textContent="Notification preferences restored to defaults on this device."),g("Defaults restored")}),t.querySelectorAll("input[data-k]").forEach(r=>{r.addEventListener("change",()=>{const o=r.dataset.k;if(!_t.some(h=>h.key===o))return;mi({[o]:r.checked});const c=P().notifications||{},d=_t.filter(h=>!!c[h.key]).length,p=t.querySelector("#pikkNotifEnabled");p&&(p.textContent=`${d} of 4`);const m=t.querySelector("#pikkNotifStatus");m&&(m.textContent=`${_t.find(h=>h.key===o).title} preference saved on this device.`),g("Preference saved")})})}function Mt(){K("#/wallet")}function U(e){return"$"+Number(e||0).toFixed(2)}function ma(e){return Number(e||0).toLocaleString()}const Kv={pending:"Pending",completed:"Completed",rejected:"Rejected"};function jv(){const{wallet:e,user:t,coins:s}=P(),a=e||{balance:0,history:[]},i=Wa(),n=[...(s==null?void 0:s.history)||[]].slice(0,10),r=qd(),o=Bs(),c=fn().filter($=>$.count>0),d=Ao(t==null?void 0:t.id),p=[...a.history||[]].slice(-12).reverse(),m=[...o.earnings||[]].slice(0,20),h=o.payouts||[],f=h.find($=>$.status==="pending"),v=!f&&o.available>=o.threshold,b=o.verification==="demo_verified",y=p.length>0?`<ul class="list-plain">${p.map($=>`<li>
          <span>${l($.note||"Entry")}<br/><span class="muted" style="font-size:12px">${j($.at)}</span></span>
          <strong style="color:${Number($.amount)>=0?"var(--ok,#6dffb0)":"inherit"}">${Number($.amount)>=0?"+":""}${U($.amount)}</strong>
        </li>`).join("")}</ul>`:'<p class="muted" style="margin:0">No fan USD credit activity yet.</p>',k=r.map($=>{const H=`pack_${$.coins}`;return`<button type="button" class="card coin-pack-btn" data-coins="${$.coins}" id="${l(H)}" style="text-align:left;cursor:pointer;margin:0;padding:12px;border:1px solid rgba(255,255,255,.08);background:#12121a">
        <div style="font-size:20px;font-weight:900">${ma($.coins)} <span class="muted" style="font-size:13px;font-weight:600">coins</span></div>
        <div class="muted" style="font-size:13px;margin-top:4px">${U($.usd)} · TEST MODE</div>
        <div style="margin-top:8px"><span class="chip">Buy · demo credit</span></div>
      </button>`}).join(""),w=n.length>0?`<ul class="list-plain">${n.map($=>{const H=Number($.amount)||0;return`<li>
          <span>${l($.note||"Coins")}<br/><span class="muted" style="font-size:12px">${j($.at)}</span></span>
          <strong style="color:${H>=0?"var(--ok,#6dffb0)":"inherit"}">${H>=0?"+":""}${ma(H)}</strong>
        </li>`}).join("")}</ul>`:'<p class="muted" style="margin:0">No coin purchases or gifts yet. Buy a pack below for Live gifts.</p>',x=d.length>0?`<ul class="list-plain">${d.slice(0,8).map($=>`<li>
          <span>
            <strong>${l($.note||$.label||"Live gift")}</strong>
            <span class="chip">80/20 NET</span>
            ${$.giftSlug?`<span class="chip">${l($.giftSlug)}</span>`:""}
            <br/><span class="muted" style="font-size:12px">gross ${U($.gross)} · fees ${U($.fees)} · net ${U($.net)} · ${j($.at)}</span>
          </span>
          <span style="text-align:right;font-size:13px">
            <strong>${U($.creatorShare)}</strong><br/>
            <span class="muted">PIKK ${U($.dbsShare)}</span>
          </span>
        </li>`).join("")}</ul>
        <p class="muted" style="font-size:12px;margin:8px 0 0">Creator-only split view. Live viewers never see 80/20.</p>`:'<p class="muted" style="margin:0">No coin-gift earnings yet. When viewers send catalog gifts on Live, your <strong>80% of NET</strong> lands here (TEST MODE: listed USD = net, 0% external fee).</p>',S=c.length>0?`<div style="overflow-x:auto">
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
          ${c.map($=>`<tr style="border-top:1px solid rgba(255,255,255,.06)">
            <td style="padding:8px 4px"><strong>${l($.label)}</strong><br/><span class="muted" style="font-size:11px">${$.creatorPct}/${$.dbsPct} · ${$.count} line${$.count===1?"":"s"}</span></td>
            <td style="padding:8px 4px">${U($.gross)}</td>
            <td style="padding:8px 4px">${U($.fees)}</td>
            <td style="padding:8px 4px">${U($.net)}</td>
            <td style="padding:8px 4px"><strong>${U($.creatorShare)}</strong></td>
            <td style="padding:8px 4px">${U($.dbsShare)}</td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>
    <p class="muted" style="font-size:12px;margin:8px 0 0">Default fees = demo 2.9% + $0.30. <strong>Live catalog gifts (t185u)</strong> treat listed USD as NET (fees $0) then 80/20. Seeded rows labeled in ledger.</p>`:'<p class="muted" style="margin:0">No creator earnings yet. Load demo earnings or receive Live tips/gifts.</p>',T=m.length>0?`<ul class="list-plain">${m.map($=>`<li>
          <span>
            <strong>${l($.label)}</strong>
            ${$.payoutId?'<span class="chip">In payout</span>':'<span class="chip">Open</span>'}
            ${$.source==="seed"?'<span class="chip">Demo seed</span>':""}
            ${$.source==="live_gift"?'<span class="chip">Coin gift</span>':""}
            <br/><span class="muted" style="font-size:12px">${l($.note)} · ${j($.at)}</span>
          </span>
          <span style="text-align:right;font-size:13px">
            <strong>${U($.creatorShare)}</strong><br/>
            <span class="muted">gross ${U($.gross)}</span>
          </span>
        </li>`).join("")}</ul>`:"",_=h.length>0?h.map($=>`<div class="card" style="margin:0 0 10px;background:#12121a" data-payout="${l($.id)}">
        <div class="row wrap">
          <strong>${U($.amount)}</strong>
          <span class="chip">${l(Kv[$.status]||$.status)}</span>
          <span class="muted spacer" style="text-align:right;font-size:12px">${j($.at)}</span>
        </div>
        <p class="muted" style="margin:6px 0;font-size:12px">${l($.note||"Payout")} · ${($.earningIds||[]).length} earning line(s)</p>
        ${$.status==="pending"?`<div class="row wrap">
                <button class="btn primary payout-status" data-id="${l($.id)}" data-status="completed">Mark completed · demo</button>
                <button class="btn ghost payout-status" data-id="${l($.id)}" data-status="rejected">Reject · release hold</button>
              </div>`:$.reviewedAt?`<p class="muted" style="margin:0;font-size:12px">Reviewed ${j($.reviewedAt)}</p>`:""}
      </div>`).join(""):'<p class="muted">No payout requests yet.</p>',N=`
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
        <div class="pikk-wallet-metric"><span>Gift coins</span><strong>${ma(i)}</strong><small>Live gifting · demo</small></div>
        <div class="pikk-wallet-metric"><span>Fan USD credits</span><strong>${U(a.balance)}</strong><small>Tips and requests · demo</small></div>
        <div class="pikk-wallet-metric"><span>Creator available</span><strong>${U(o.available)}</strong><small>Eligible balance · demo</small></div>
        <div class="pikk-wallet-metric"><span>Creator on hold</span><strong>${U(o.holds)}</strong><small>Payout review · demo</small></div>
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
      <div style="font-size:32px;font-weight:900;margin-top:8px">${ma(i)} <span class="muted" style="font-size:16px;font-weight:600">coins</span></div>
      <p class="muted" style="margin:4px 0 12px">≈ ${U(i*.02)} · stored in <code>dbs_v1.coins</code> (not USD <code>wallet</code>). Used for Live gift tray.</p>
      <h4 style="margin:0 0 8px;font-size:14px">Buy coin pack</h4>
      <div class="grid-2" style="gap:10px">${k}</div>
      <p class="muted" style="font-size:12px;margin:10px 0 0">No discounts · packs ${Va.map($=>`${$.coins}/$${$.usd}`).join(" · ")}. Demo credit only — no payment processor.</p>
      <h4 style="margin:16px 0 8px;font-size:14px">Recent coin activity</h4>
      ${w}
      <div class="row wrap" style="margin-top:12px">
        <a class="btn ghost" href="#/live">Go to Live · send gifts</a>
        <a class="btn ghost" href="#/earnings?cat=gifts">Gift earnings</a>
      </div>
    </div>

    <div class="card">
      <h3>Fan spendable USD credits</h3>
      <div style="font-size:32px;font-weight:900">${U(a.balance)}</div>
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
          <div style="font-size:28px;font-weight:900">${U(o.available)}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Holds / in review</p>
          <div style="font-size:28px;font-weight:900">${U(o.holds)}</div>
        </div>
      </div>
      <div class="row wrap" style="margin-top:10px">
        <span class="chip">Threshold ${U(o.threshold)}</span>
        <span class="chip">Holds / refunds · demo</span>
        ${f?'<span class="chip">Payout pending</span>':""}
      </div>
      <div class="row wrap" style="margin-top:12px">
        <button class="btn primary" id="cwPayout" ${v?"":"disabled"}>Request payout · TEST MODE</button>
        <button class="btn" id="cwSeed">${(o.earnings||[]).length?"Reload demo earnings":"Load demo earnings"}</button>
        <a class="btn ghost" href="#/earnings">Earnings overview</a>
      </div>
      ${v?'<p class="muted" style="margin:10px 0 0;font-size:12px">Moves available → holds and locks those earning lines until completed or rejected.</p>':`<p class="muted" style="margin:10px 0 0;font-size:12px">${f?"Finish or reject the pending payout before requesting another (anti double-payout).":`Need at least ${U(o.threshold)} available · currently ${U(o.available)}.`}</p>`}
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
      ${S}
      ${T?`<h4 style="margin:16px 0 8px;font-size:14px">Ledger (recent)</h4>${T}`:""}
    </div>

    <div class="card">
      <h3>Payout history</h3>
      <p class="muted" style="margin:0 0 10px">On-device demo approve / reject. Completed funds leave holds; rejected releases hold and untags earnings.</p>
      ${_}
    </div>
    </div>
  `;return L("Wallet & Payouts",N,{lead:"Creator Wallet & Payout Center · gift coins + fan USD · TEST MODE."})}function Fv(e){var t,s,a,i,n;e.querySelectorAll(".coin-pack-btn").forEach(r=>{r.addEventListener("click",()=>{const o=Number(r.dataset.coins),c=xo(o);if((c==null?void 0:c.error)==="bad_package")return g("Unknown pack");if(c!=null&&c.error)return g("Could not buy coins");g(`+${o.toLocaleString()} coins · TEST MODE`),Mt()})}),(t=e.querySelector("#fanCredit5"))==null||t.addEventListener("click",()=>{Ma(5,"Demo credit +$5"),g("+$5 fan credits"),Mt()}),(s=e.querySelector("#fanCredit25"))==null||s.addEventListener("click",()=>{Ma(25,"Demo credit +$25"),g("+$25 fan credits"),Mt()}),(a=e.querySelector("#cwSeed"))==null||a.addEventListener("click",()=>{const r=(Bs().earnings||[]).length>0,o=Io({force:!0});g(r?"Demo earnings reloaded":`Loaded ${o.seeded||0} demo lines`),Mt()}),(i=e.querySelector("#cwPayout"))==null||i.addEventListener("click",()=>{const r=ep();if((r==null?void 0:r.error)==="pending_exists")return g("Payout already pending");if((r==null?void 0:r.error)==="below_threshold")return g("Below payout threshold");if(r!=null&&r.error)return g("Could not request payout");g("Payout requested · held"),Mt()}),(n=e.querySelector("#cwVerify"))==null||n.addEventListener("click",()=>{const o=Bs().verification!=="demo_verified";sp(o),g(o?"Demo verified":"Verification cleared"),Mt()}),e.querySelectorAll(".payout-status").forEach(r=>{r.addEventListener("click",()=>{const o=tp(r.dataset.id,r.dataset.status);if(o!=null&&o.error)return g("Could not update payout");g("Payout "+r.dataset.status),Mt()})})}function Qr(e){K(e||"#/earnings")}function le(e){return"$"+Number(e||0).toFixed(2)}const jc=[{id:"all",label:"All"},{id:"gifts",label:"Gifts"},{id:"tips",label:"Tips"},{id:"subscriptions",label:"Subscriptions"},{id:"clippers",label:"Clippers"},{id:"referrals",label:"Referrals"},{id:"sponsorships",label:"Sponsorships"},{id:"merch",label:"Merch"}];function Fc(){var t;const e=(((t=je().query)==null?void 0:t.cat)||"all").toLowerCase();return jc.some(s=>s.id===e)?e:"all"}function Gv(e){return(e||[]).reduce((t,s)=>(t.gross+=Number(s.gross)||0,t.fees+=Number(s.fees)||0,t.net+=Number(s.net)||0,t.creatorShare+=Number(s.creatorShare)||0,t.dbsShare+=Number(s.dbsShare)||0,t),{gross:0,fees:0,net:0,creatorShare:0,dbsShare:0})}function Es(e){return Math.round(Number(e)*100)/100}function Uv(){const e=Bs(),t=Zd(),s=Fc(),a=[...e.earnings||[]].sort((b,y)=>(y.at||0)-(b.at||0)),i=s==="all"?a:a.filter(b=>b.category===s||s==="subscriptions"&&b.category==="paid_content"),n=Gv(a),r=fn(),o=Ao(),c=s==="gifts"?`<div class="card" style="margin:0 0 12px;background:#12121a">
      <div class="row wrap">
        <span class="chip">t185u · catalog gifts</span>
        <span class="chip">80% creator / 20% PIKK · NET</span>
        <span class="chip">TEST MODE · listed USD = net</span>
      </div>
      <p class="muted" style="margin:8px 0 0;font-size:13px">Coin gifts from Live use <code>sendLiveGift</code> → creator earnings here. Viewers on Live / gift tray never see this split. ${o.length?`${o.length} gift line(s) on device.`:"Send a catalog gift on an active Live to populate."}</p>
    </div>`:"",d=jc.map(b=>{const y=b.id==="all"?"#/earnings":`#/earnings?cat=${b.id}`,k=b.id==="all"?a.length:a.filter(x=>x.category===b.id||b.id==="subscriptions"&&x.category==="paid_content").length,w=s===b.id;return`<a class="chip earn-filter${w?" active":""}" href="${y}" data-cat="${l(b.id)}" style="${w?"outline:1px solid var(--accent,#6dffb0);font-weight:700":""}">${l(b.label)}${k?` · ${k}`:""}</a>`}).join(""),p=Object.entries(t).map(([b,y])=>`<tr style="border-top:1px solid rgba(255,255,255,.06)">
        <td style="padding:8px 4px"><strong>${l(y.label)}</strong><br/><span class="muted" style="font-size:11px">${l(b)}</span></td>
        <td style="padding:8px 4px">${y.creatorPct}%</td>
        <td style="padding:8px 4px">${y.dbsPct}%</td>
      </tr>`).join(""),m=Object.entries(t).map(([b,y])=>`<option value="${l(b)}">${l(y.label)}</option>`).join(""),h=r.filter(b=>b.count>0).length>0?`<div style="overflow-x:auto;margin-top:8px">
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
          ${r.filter(b=>b.count>0).map(b=>`<tr style="border-top:1px solid rgba(255,255,255,.06)">
            <td style="padding:8px 4px"><strong>${l(b.label)}</strong><br/><span class="muted" style="font-size:11px">${b.creatorPct}/${b.dbsPct} · ${b.count} line${b.count===1?"":"s"}</span></td>
            <td style="padding:8px 4px">${le(b.gross)}</td>
            <td style="padding:8px 4px">${le(b.fees)}</td>
            <td style="padding:8px 4px">${le(b.net)}</td>
            <td style="padding:8px 4px"><strong>${le(b.creatorShare)}</strong></td>
            <td style="padding:8px 4px">${le(b.dbsShare)}</td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>`:"",f=i.length>0?`<ul class="list-plain">${i.map(b=>`<li style="align-items:flex-start">
          <span style="flex:1;min-width:0">
            <strong>${l(b.label||b.category)}</strong>
            ${b.payoutId?'<span class="chip">In payout</span>':'<span class="chip">Open</span>'}
            ${b.source==="seed"?'<span class="chip">Demo seed</span>':""}
            <br/><span class="muted" style="font-size:12px">${l(b.note||"")} · ${j(b.at)}</span>
            <br/><span class="muted" style="font-size:11px">gross ${le(b.gross)} → fees ${le(b.fees)} → net ${le(b.net)} · creator ${b.creatorPct}% / PIKK ${b.dbsPct}%</span>
          </span>
          <span style="text-align:right;font-size:13px;white-space:nowrap">
            <strong>${le(b.creatorShare)}</strong><br/>
            <span class="muted">PIKK ${le(b.dbsShare)}</span>
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
          <div style="font-size:26px;font-weight:900">${le(e.available)}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Holds / in review</p>
          <div style="font-size:26px;font-weight:900">${le(e.holds)}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Lifetime creator share</p>
          <div style="font-size:22px;font-weight:800">${le(Es(n.creatorShare))}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Lifetime PIKK share</p>
          <div style="font-size:22px;font-weight:800">${le(Es(n.dbsShare))}</div>
        </div>
      </div>
      <div class="row wrap" style="margin-top:10px">
        <span class="chip">Lifetime gross ${le(Es(n.gross))}</span>
        <span class="chip">Fees ${le(Es(n.fees))}</span>
        <span class="chip">Net ${le(Es(n.net))}</span>
        <span class="chip">Threshold ${le(e.threshold)}</span>
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
  `;return L("Creator Earnings",v,{lead:"Rewards, commissions & ledger · TEST MODE · payouts on Wallet (§27)."})}function Hv(e){var t,s;(t=e.querySelector("#earnSeed"))==null||t.addEventListener("click",()=>{const a=(Bs().earnings||[]).length>0,i=Io({force:!0});g(a?"Demo earnings reloaded":`Loaded ${i.seeded||0} demo lines`),Qr(Xr(Fc()))}),(s=e.querySelector("#earnDemoForm"))==null||s.addEventListener("submit",a=>{var c,d,p;a.preventDefault();const i=((c=e.querySelector("#earnCat"))==null?void 0:c.value)||"tips",n=Number((d=e.querySelector("#earnGross"))==null?void 0:d.value),r=(((p=e.querySelector("#earnNote"))==null?void 0:p.value)||"").trim()||"Manual demo earning";if(!(n>0))return g("Enter a positive gross amount");const o=gn({category:i,gross:n,note:r,source:"manual_demo"});g(`Recorded ${le(o.creatorShare)} creator share`),Qr(Xr(i))})}function Xr(e){return!e||e==="all"?"#/earnings":`#/earnings?cat=${e}`}function Dt(){K("#/missions")}const Zr={song:"Song",album:"Album",video:"Video",live:"Livestream",app:"DBS App",interview:"Interview"};function Vv(e){return"$"+Number(e||0).toFixed(0)}function zv(e){const t=Number(e)||0;if(!t)return"No deadline";const s=t-Date.now();if(s<0)return`Ended ${Math.ceil(-s/864e5)}d ago`;const a=Math.ceil(s/864e5);return a<=1?"Due today / tomorrow":`${a}d left`}function Wv(e=14){return new Date(Date.now()+e*864e5).toISOString().slice(0,10)}function ha(){const{user:e}=P();if(e)return e;const t=os("DemoCreator");return g("Signed in as DemoCreator · local demo"),t||P().user}function Yv(){const{user:e}=P(),t=Qa().sort((p,m)=>(m.createdAt||0)-(p.createdAt||0)),s=t.filter(p=>p.status==="active"||p.status==="paused"),a=t.filter(p=>p.status==="ended"||p.status==="draft"),i=new Set(t.flatMap(p=>(p.participants||[]).map(m=>m.userId).filter(Boolean))).size,n=t.reduce((p,m)=>p+(m.submissions||[]).length,0),r=p=>{const m=p.fundSource==="third_party"?'<span class="chip">20% management fee · disclosed</span>':'<span class="chip">DBS-funded · marketing expense</span>',h=_p(p.id),f=e&&(p.participants||[]).some(w=>w.userId===e.id),v=(p.submissions||[]).filter(w=>e&&w.userId===e.id),b=h.length>0?h.slice(0,8).map((w,x)=>`<tr style="border-top:1px solid rgba(255,255,255,.06)">
              <td style="padding:6px 4px">${x+1}</td>
              <td style="padding:6px 4px"><strong>${l(w.username)}</strong>
                ${w.referralCode?`<br/><span class="muted" style="font-size:11px">${l(w.referralCode)}</span>`:""}
              </td>
              <td style="padding:6px 4px">${w.score}</td>
              <td style="padding:6px 4px">${w.submissions}</td>
            </tr>`).join(""):'<tr><td colspan="4" class="muted" style="padding:8px 4px">No participants yet — join to appear on the board.</td></tr>',y=(p.submissions||[]).length>0?`<ul class="list-plain" style="margin-top:8px">${(p.submissions||[]).slice(0,5).map(w=>`<li style="align-items:flex-start">
              <span style="flex:1;min-width:0">
                <strong>${l(w.username)}</strong>
                <span class="chip">${l(w.status||"pending")}</span>
                <br/><span style="font-size:13px">${l(w.proof)}</span>
                <br/><span class="muted" style="font-size:11px">${j(w.at)} · Manual review</span>
              </span>
            </li>`).join("")}</ul>`:'<p class="muted" style="margin:8px 0 0;font-size:13px">No proof submissions yet.</p>',k=p.status==="active"?`<div class="row wrap" style="margin-top:10px;gap:8px">
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
        <span class="chip">${l(Zr[p.promoteType]||p.promoteType)}</span>
        <span class="chip">${l(p.status)}</span>
        <span class="chip">Budget ${Vv(p.budget)}</span>
        <span class="chip">${l(zv(p.deadline))}</span>
        ${m}
        <span class="muted spacer" style="text-align:right;font-size:12px">${j(p.createdAt)}</span>
      </div>
      <h3 style="margin:10px 0 4px">${l(p.title)}</h3>
      <p class="muted" style="margin:0 0 6px;font-size:13px">${l(p.reward||"")}</p>
      <p class="muted" style="margin:0;font-size:12px">
        Fund: <strong>${p.fundSource==="third_party"?"Third-party":"DBS"}</strong>
        ${p.fundSource==="third_party"?" · 20% management fee (disclosed)":" · not a creator commission — marketing expense"}
        · ${(p.participants||[]).length} joined · ${(p.submissions||[]).length} submissions
        ${f?` · your proofs: ${v.length}`:""}
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
    </article>`},o=s.length?s.map(r).join(""):t.length?'<div class="card"><p class="muted" style="margin:0">No active or paused missions. Create one or resume from archive.</p></div>':"",c=a.length>0?`<div class="card"><h3>Archive</h3>${a.map(r).join("")}</div>`:"",d=`
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

    <section class="pikk-missions-list" aria-label="Available campaigns">${o}</section>

    <div class="card pikk-missions-create">
      <h3>Create mission · demo admin</h3>
      <p class="muted" style="margin:0 0 10px;font-size:13px">Stored in <code>dbs_v1.missions</code>. No real charges or fraud API.</p>
      <form id="msnCreate" style="display:grid;gap:10px;max-width:520px">
        <div class="field"><label>Title *</label><input name="title" id="msnTitle" required maxlength="120" placeholder="Push Long Story Short" /></div>
        <div class="grid-2">
          <div class="field"><label>Promote type</label>
            <select name="promoteType" id="msnType">
              ${Object.entries(Zr).map(([p,m])=>`<option value="${p}">${l(m)}</option>`).join("")}
            </select>
          </div>
          <div class="field"><label>Budget (USD)</label><input name="budget" id="msnBudget" type="number" min="0" step="1" value="500" /></div>
        </div>
        <div class="grid-2">
          <div class="field"><label>Deadline</label><input name="deadline" id="msnDeadline" type="date" value="${Wv(14)}" /></div>
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
  `;return L("Missions",d,{lead:"Promotional campaigns · Clippers & creators · TEST MODE (§6)."})}function Jv(e){var t,s,a;(t=e.querySelector("#msnSeed"))==null||t.addEventListener("click",()=>{const i=Qa().length>0,n=qp({force:!0});g(i?"Demo missions reloaded":`Loaded ${n.seeded||0} demo missions`),Dt()}),(s=e.querySelector("#msnSignIn"))==null||s.addEventListener("click",()=>{ha(),Dt()}),(a=e.querySelector("#msnCreate"))==null||a.addEventListener("submit",i=>{var h,f,v,b,y,k;i.preventDefault();const n=((h=e.querySelector("#msnTitle"))==null?void 0:h.value)||"",r=((f=e.querySelector("#msnType"))==null?void 0:f.value)||"app",o=Number((v=e.querySelector("#msnBudget"))==null?void 0:v.value)||0,c=((b=e.querySelector("#msnDeadline"))==null?void 0:b.value)||"",d=((y=e.querySelector("#msnFund"))==null?void 0:y.value)||"dbs",p=((k=e.querySelector("#msnReward"))==null?void 0:k.value)||"",m=Dp({title:n,promoteType:r,budget:o,deadline:c,fundSource:d,reward:p,status:"active"});if(m.error)return g("Title required");g(`Mission created · ${m.title}`),Dt()}),e.querySelectorAll("[data-join]").forEach(i=>{i.addEventListener("click",()=>{ha();const n=i.getAttribute("data-join"),r=Lp(n);if(r.error==="signin")return g("Sign in required");if(r.error==="already_joined")return g("Already joined");if(r.error==="not_active")return g("Mission not active");if(r.error)return g("Could not join");g("Joined mission · referral code assigned"),Dt()})}),e.querySelectorAll("[data-bump]").forEach(i=>{i.addEventListener("click",()=>{ha();const n=i.getAttribute("data-bump"),r=Op(n,5);if(r.error)return g(r.error==="not_joined"?"Join first":"Bump failed");g("+5 demo points"),Dt()})}),e.querySelectorAll("[data-status]").forEach(i=>{i.addEventListener("click",()=>{const n=i.getAttribute("data-status"),r=i.getAttribute("data-next");if(Pp(n,r).error)return g("Status update failed");g(`Mission → ${r}`),Dt()})}),e.querySelectorAll("form.msn-proof").forEach(i=>{i.addEventListener("submit",n=>{var d;n.preventDefault(),ha();const r=i.getAttribute("data-id"),o=((d=i.querySelector('[name="proof"]'))==null?void 0:d.value)||"",c=Ip(r,{proof:o});if(c.error==="required")return g("Enter a URL or note");if(c.error==="not_joined")return g("Join first");if(c.error==="not_active")return g("Mission not active");if(c.error)return g("Submit failed");g("Proof submitted · pending manual review · +10 pts"),Dt()})})}const Qv="AL:Alabama,AK:Alaska,AZ:Arizona,AR:Arkansas,CA:California,CO:Colorado,CT:Connecticut,DE:Delaware,FL:Florida,GA:Georgia,HI:Hawaii,ID:Idaho,IL:Illinois,IN:Indiana,IA:Iowa,KS:Kansas,KY:Kentucky,LA:Louisiana,ME:Maine,MD:Maryland,MA:Massachusetts,MI:Michigan,MN:Minnesota,MS:Mississippi,MO:Missouri,MT:Montana,NE:Nebraska,NV:Nevada,NH:New Hampshire,NJ:New Jersey,NM:New Mexico,NY:New York,NC:North Carolina,ND:North Dakota,OH:Ohio,OK:Oklahoma,OR:Oregon,PA:Pennsylvania,RI:Rhode Island,SC:South Carolina,SD:South Dakota,TN:Tennessee,TX:Texas,UT:Utah,VT:Vermont,VA:Virginia,WA:Washington,WV:West Virginia,WI:Wisconsin,WY:Wyoming,DC:District of Columbia".split(",").map(e=>e.split(":")),Xv=new Map(Qv.flatMap(([e,t])=>[[e.toLowerCase(),e],[t.toLowerCase(),e]])),gt=e=>String(e||"").trim().replace(/\s+/g," ").toLowerCase(),eo=e=>Xv.get(gt(e))||gt(e),Zv=(e,t)=>!t||[e.username,e.bio,e.title,e.text,e.hostName,e.artist,e.type].some(s=>gt(s).includes(t));function Gc({query:e="",keywordQuery:t,locationLabel:s=""}={}){const a=String(t===void 0?e:t).trim(),i=String(s||"").trim();return[a?"for “"+a+"”":"",i?"in "+i:""].filter(Boolean).join(" ")}function to(e,{city:t="",state:s=""}={}){if(!e||e.locationDiscoverable!==!0||e.private===!0||e.isPrivate===!0)return!1;const a=e.location&&typeof e.location=="object"?e.location:e;return!gt(a.city)||!gt(a.state)?!1:(!t||gt(a.city)===gt(t))&&(!s||eo(a.state)===eo(s))}function eb(e,{city:t="",state:s="",query:a=""}={}){const i=gt(a),n=h=>to(h,{city:t,state:s})&&Zv(h,i),r=e.exploreDiscoverable===!0&&to(e.user,{city:t,state:s}),o=Object.values(e.profiles||{}).filter(h=>{var f;return(((f=e.user)==null?void 0:f.id)==null||h.id!==e.user.id||r)&&n(h)});e.exploreDiscoverable===!0&&n(e.user)&&!o.some(h=>h.id===e.user.id)&&o.push(e.user);const c=(e.posts||[]).filter(n),d=(e.catalog||[]).filter(h=>h.published===!0&&n(h)),p=e.live&&!e.live.endedAt&&n(e.live)?[{...e.live,status:"live"}]:[],m=(e.liveHistory||[]).filter(n).map(h=>({...h,status:"ended"}));return{query:String(a||"").trim()||"City & State",keywordQuery:String(a||"").trim(),locationLabel:[t,s].map(h=>String(h||"").trim()).filter(Boolean).join(", "),profiles:o,posts:c,music:d.filter(h=>h.type==="song"||h.type==="album"),videos:d.filter(h=>h.type==="video"),pictures:d.filter(h=>h.type==="picture"),lives:[...p,...m],products:(e.listings||[]).filter(h=>h.active!==!1&&n(h))}}const tb=[{id:"trending",label:"Trending"},{id:"following",label:"Following"},{id:"discover",label:"Discover"}];function sb(){return!!P().exploreDiscoverable}function Ie({href:e,title:t,meta:s,chip:a}){return`<a class="explore-hit" href="${l(e)}">
    <div>
      <strong>${l(t)}</strong>
      <div class="muted" style="font-size:12px;margin-top:2px">${l(s||"")}</div>
    </div>
    ${a?`<span class="chip">${l(a)}</span>`:""}
  </a>`}function lt(e,t,s){return t?`<div class="card explore-section">
    <h3>${l(e)}</h3>
    <div class="explore-hits">${t}</div>
  </div>`:`<div class="card explore-section">
      <h3>${l(e)}</h3>
      <p class="muted" style="margin:0">${l(s||"No matches")}</p>
    </div>`}function ja(e){if(!e||!e.query)return`<div class="card" id="exploreResults">
      <p class="muted" style="margin:0">Search creators, fans, songs, albums, videos, posts, livestreams, and products. Exact locations are never indexed.</p>
    </div>`;const t=l(Gc(e)),s=e.posts.length+e.profiles.length+e.music.length+e.videos.length+e.lives.length+e.products.length+e.pictures.length;if(!s)return`<div class="card" id="exploreResults">
      <p style="margin:0 0 6px"><strong>No results ${t}</strong></p>
      <p class="muted" style="margin:0">${e.locationLabel?"Only content explicitly opted into city/state discovery can appear here. No matching public location tags are available in this demo.":"Try another keyword, or browse Trending / Discover below. Report spam from a result’s destination page (demo shell)."}</p>
    </div>`;const a=e.posts.slice(0,8).map(h=>Ie({href:"#/posts",title:(h.text||"").slice(0,90)||"Post",meta:`@${h.username||"user"} · ${j(h.at||Date.now())}`,chip:"Post"})).join(""),i=e.profiles.slice(0,8).map(h=>Ie({href:`#/profile/${encodeURIComponent(h.id)}`,title:`@${h.username||h.id}`,meta:(h.bio||"Creator / fan").slice(0,80),chip:h.verified?"Verified":"Profile"})).join(""),n=e.music.slice(0,8).map(h=>Ie({href:"#/music",title:h.title,meta:`${h.artist||"Artist not credited"} · ${h.type}`,chip:h.type==="album"?"Album":"Song"})).join(""),r=e.videos.slice(0,8).map(h=>Ie({href:"#/videos",title:h.title,meta:`${h.artist||"Artist not credited"} · Video catalog`,chip:"Video"})).join(""),o=e.pictures.slice(0,8).map(h=>Ie({href:"#/home",title:h.title,meta:`${h.artist||"Creator not credited"} · picture`,chip:"Picture"})).join(""),c=e.lives.slice(0,8).map(h=>Ie({href:"#/live",title:h.title||"Livestream",meta:`@${h.hostName||"host"} · ${h.status==="live"?"LIVE now":"Ended"}`,chip:h.status==="live"?"Live":"Replay"})).join(""),d=e.products.slice(0,8).map(h=>Ie({href:"#/marketplace",title:h.title,meta:`${h.brand||"Brand"} · ${h.disclosure||"Sponsored"}`,chip:"Ad"})).join(""),p=e.query.toLowerCase(),m=e.locationLabel?"":[...Xt.filter(h=>h.title.toLowerCase().includes(p)||h.artist.toLowerCase().includes(p)||p.includes("music")||p.includes("song")||p.includes("album")).map(h=>Ie({href:"#/music",title:h.title,meta:`${h.artist} · ${h.status}`,chip:"Cover"})),...ue.filter(h=>h.title.toLowerCase().includes(p)||(h.artist||"").toLowerCase().includes(p)||p.includes("video")||p.includes("mv")).map(h=>Ie({href:"#/videos",title:h.title,meta:`${h.artist||"Artist not credited"} · Official MV`,chip:"MV"}))].join("");return`<div id="exploreResults">
    <p class="muted" style="margin:0 0 10px">${s} result${s===1?"":"s"} ${t}</p>
    ${lt("People",i,"No matching creators or fans")}
    ${lt("Posts",a,"No matching posts")}
    ${lt("Music (catalog)",n,"No published songs/albums")}
    ${lt("Videos (catalog)",r,"No published videos")}
    ${lt("Pictures",o,"No published pictures")}
    ${lt("Livestreams",c,"No live or history matches")}
    ${lt("Products / ads",d,"No marketplace listings")}
    ${m?lt("Music-based picks",m):""}
  </div>`}function ab(){const e=ip(10);return e.length?`<div class="section-swipe explore-trend">
    ${e.map(t=>`<a class="preview-card" href="${l(t.href)}">
        <strong>${l(t.title)}</strong>
        <span class="muted">${l(t.subtitle)}${t.score?` · ♥${t.score}`:""}</span>
      </a>`).join("")}
  </div>`:'<p class="muted">Nothing trending yet — like posts or publish catalog items.</p>'}function ib(){const e=P().user;if(!e)return'<div class="card"><p class="muted" style="margin:0">Sign in on <a href="#/profile">Profile</a> to see accounts you follow. Demo only — no exact locations.</p></div>';const t=e.following||[];return t.length?`<div class="card explore-section"><h3>Following</h3><div class="explore-hits">${t.map(a=>{var n;const i=((n=P().profiles)==null?void 0:n[a])||{id:a,username:a};return Ie({href:`#/profile/${encodeURIComponent(i.id)}`,title:`@${i.username||i.id}`,meta:(i.bio||"Following").slice(0,80),chip:"Following"})}).join("")}</div></div>`:`<div class="card"><p class="muted" style="margin:0">You're not following anyone yet. Discover suggested accounts below, then follow from their profile.</p></div>`}function nb(){const t=np().slice(0,8).map(a=>Ie({href:`#/profile/${encodeURIComponent(a.id)}`,title:`@${a.username}`,meta:(a.bio||"Suggested").slice(0,80),chip:a.verified?"Verified":"Suggest"})).join(""),s=Xt.map(a=>Ie({href:"#/music",title:a.title,meta:`${a.artist} · music-based`,chip:"Cover"})).join("");return`
    <div class="card">
      <h3>Discoverability (opt-in)</h3>
      <p class="muted" style="margin:0 0 10px">Appear in Explore suggestions. Off by default. No exact locations stored or shown.</p>
      <label class="row" style="gap:8px;align-items:center">
        <input type="checkbox" id="exploreDiscoverable" ${sb()?"checked":""} />
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
    </div>`}function rb(){const e=P().exploreTab||"trending",t=tb.map(i=>`<button type="button" role="tab" id="explore-tab-${i.id}" aria-controls="explorePanel" aria-selected="${i.id===e}" tabindex="${i.id===e?0:-1}" class="shop-chip${i.id===e?" on":""}" data-explore-tab="${i.id}">${l(i.label)}</button>`).join("");let s="";e==="following"?s=ib():e==="discover"?s=nb():s=`<div class="card">
      <h3>Trending Across PIKK</h3>
      <p class="muted" style="margin:0 0 10px">High-engagement public posts and seeded demo cards (not a full engagement pipeline).</p>
      ${ab()}
    </div>
    <div id="exploreResultsWrap">${ja(null)}</div>`;const a=`
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
  `;return L("Explore",a,{lead:"Universal search & discovery across PIKK.",badge:"Phase 2 demo"})}function so(e,t){var c,d,p,m,h,f,v,b,y;const s=((c=e.querySelector("#exploreCity"))==null?void 0:c.value.trim())||"",a=((d=e.querySelector("#exploreState"))==null?void 0:d.value.trim())||"",i=s||a?eb(P(),{city:s,state:a,query:t}):ap(t),n=e.querySelector("#exploreResultsWrap");if(n)n.innerHTML=ja(i);else{const k=e.querySelector("#explorePanel");if(k){let w=k.querySelector("#exploreLiveInsert");w||(w=document.createElement("div"),w.id="exploreLiveInsert",k.prepend(w)),w.innerHTML=ja(i)}}const r=(((p=i.posts)==null?void 0:p.length)||0)+(((m=i.profiles)==null?void 0:m.length)||0)+(((h=i.music)==null?void 0:h.length)||0)+(((f=i.videos)==null?void 0:f.length)||0)+(((v=i.lives)==null?void 0:v.length)||0)+(((b=i.products)==null?void 0:b.length)||0)+(((y=i.pictures)==null?void 0:y.length)||0),o=e.querySelector("#exploreSearchStatus");if(o){const k=Gc(i);o.textContent=i.query?`${r} result${r===1?"":"s"} ${k||"across PIKK"}.`:"Enter a keyword, city or state to search."}i.query&&g(r?`${r} result(s)`:"No matches")}function ob(e){var m;const t=e.querySelector("#exploreQ"),s=e.querySelector("#exploreGo"),a=e.querySelector("#exploreClear"),i=e.querySelector("#exploreCity"),n=e.querySelector("#exploreState"),r=()=>so(e,(t==null?void 0:t.value)||"");s==null||s.addEventListener("click",r);function o(){var v;clearTimeout(c),t&&(t.value=""),i&&(i.value=""),n&&(n.value="");const h=e.querySelector("#exploreResultsWrap");h&&(h.innerHTML=ja(null)),(v=e.querySelector("#exploreLiveInsert"))==null||v.remove();const f=e.querySelector("#exploreSearchStatus");f&&(f.textContent="Ready to search PIKK."),g("Cleared")}a==null||a.addEventListener("click",o);let c;t==null||t.addEventListener("input",()=>{clearTimeout(c),c=setTimeout(r,220)});for(const h of[i,n])h==null||h.addEventListener("input",()=>{clearTimeout(c),c=setTimeout(r,220)}),h==null||h.addEventListener("keydown",f=>{f.key==="Escape"&&(t!=null&&t.value||i!=null&&i.value||n!=null&&n.value)?(f.preventDefault(),o(),h.focus()):f.key==="Enter"&&(f.preventDefault(),clearTimeout(c),r())});t==null||t.addEventListener("keydown",h=>{h.key==="Escape"&&(t.value||i!=null&&i.value||n!=null&&n.value)?(h.preventDefault(),o(),t.focus()):h.key==="Enter"&&(h.preventDefault(),clearTimeout(c),r())});const d=[...e.querySelectorAll("[data-explore-tab]")];function p(h,f=!1){var k;const v=(t==null?void 0:t.value)||"",b=(i==null?void 0:i.value)||"",y=(n==null?void 0:n.value)||"";if(clearTimeout(c),Jn({exploreTab:h}),K("/explore"),v.trim()||b.trim()||y.trim()){const w=document.getElementById("app"),x=w==null?void 0:w.querySelector("#exploreQ");if(x){x.value=v;const S=w.querySelector("#exploreCity"),T=w.querySelector("#exploreState");S&&(S.value=b),T&&(T.value=y),so(w,v)}}f&&((k=document.getElementById("explore-tab-"+h))==null||k.focus())}d.forEach((h,f)=>{h.addEventListener("click",()=>p(h.dataset.exploreTab)),h.addEventListener("keydown",v=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(v.key))return;v.preventDefault();const b=d.length-1,y=v.key==="Home"?0:v.key==="End"?b:(f+(v.key==="ArrowRight"?1:-1)+d.length)%d.length;p(d[y].dataset.exploreTab,!0)})}),(m=e.querySelector("#exploreDiscoverable"))==null||m.addEventListener("change",h=>{Jn({exploreDiscoverable:!!h.target.checked}),g(h.target.checked?"Discoverable on":"Discoverable off")})}let $a=null;function Pt(e){K("#/giftbattles")}function ao(){$a&&(clearInterval($a),$a=null)}function te(e){return"$"+Number(e||0).toFixed(2)}function Uc(e){const t=Math.max(0,Math.ceil(e/1e3)),s=Math.floor(t/60),a=t%60;return`${s}:${String(a).padStart(2,"0")}`}function lb(){return`
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
    </div>`}function cb(e){if(!e)return`
      <div class="card">
        <h3>Champion Spotlight</h3>
        <p class="muted" style="margin:0">No active champion today. Win a battle to claim the rest-of-day banner.</p>
      </div>`;const t=Math.max(0,(e.championUntil||0)-Date.now()),s=Math.floor(t/36e5),a=Math.floor(t%36e5/6e4);return`
    <div class="card gb-champion" role="status">
      <div class="row wrap" style="gap:8px;align-items:center">
        <span class="gb-sticker-slot" aria-hidden="true">${Vs("battle-crown",{className:"gift-sticker gift-sticker--battle"}).html}</span>
        <div class="chip">Challenge Winner · rest of day</div>
      </div>
      <h3 class="gb-champion-name">${l(e.username)}</h3>
      <p class="muted" style="margin:0">
        Score ${l(te(e.score))} · ~${s}h ${a}m left today
        · ${l(e.mode||"demo")}
      </p>
    </div>`}function db(e,t){return e?`
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
    </div>`}function pb(e){return`
    <div class="card gb-battle" data-gb-status="pending">
      <h3>Challenge pending</h3>
      <p><strong>${l(e.challenger.name)}</strong> challenged <strong>${l(e.opponent.name)}</strong></p>
      <p class="muted">Mode: ${l(e.mode)} · opponent must Accept or Decline (demo controls below).</p>
      <div class="row wrap" style="gap:8px;margin-top:12px">
        <button type="button" class="btn primary" id="gbAccept">Accept</button>
        <button type="button" class="btn ghost" id="gbDecline">Decline</button>
      </div>
    </div>`}function ub(e){const t=Math.max(0,(e.endsAt||0)-Date.now()),s=Uc(t);return`
    <div class="card gb-battle" data-gb-status="active">
      <div class="gb-countdown" aria-live="polite" aria-atomic="true">
        <span class="gb-countdown-label">Time left</span>
        <span class="gb-countdown-clock" id="gbClock">${l(s)}</span>
      </div>
      <div class="gb-scoreboard" role="group" aria-label="Live battle scores">
        <div class="gb-side">
          <div class="muted">Challenger</div>
          <strong>${l(e.challenger.name)}</strong>
          <div class="gb-score" id="gbScoreA" aria-label="Challenger score ${l(te(e.scoreA))}">${l(te(e.scoreA))}</div>
        </div>
        <div class="gb-vs" aria-hidden="true">VS</div>
        <div class="gb-side">
          <div class="muted">Opponent</div>
          <strong>${l(e.opponent.name)}</strong>
          <div class="gb-score" id="gbScoreB" aria-label="Opponent score ${l(te(e.scoreB))}">${l(te(e.scoreB))}</div>
        </div>
      </div>
      <p class="muted gb-score-text" id="gbScoreText">
        Live score: ${l(e.challenger.name)} ${l(te(e.scoreA))} —
        ${l(e.opponent.name)} ${l(te(e.scoreB))}
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
    </div>`}function mb(e){var i,n;let t="Tie",s="Equal voluntary support · recognition for both";e.result==="win"&&e.winnerName?(t=`Winner · ${e.winnerName}`,s="Recognition only — no opponent funds transferred"):e.result==="declined"&&(t="Declined",s="Challenge was declined");const a=e.result==="win"?Vs("battle-win",{className:"gift-sticker gift-sticker--battle"}).html:"";return`
    <div class="card gb-battle gb-ended" data-gb-status="ended">
      <div class="row wrap" style="gap:8px;align-items:center">
        ${a?`<span class="gb-sticker-slot" aria-hidden="true">${a}</span>`:""}
        <div class="chip">${e.result==="win"?"Winner":e.result==="tie"?"Tie":"Ended"}</div>
      </div>
      <h3 class="gb-winner-banner">${l(t)}</h3>
      <p class="muted">${l(s)}</p>
      <p class="gb-score-text" style="margin:12px 0">
        Final: ${l(((i=e.challenger)==null?void 0:i.name)||"?")} ${l(te(e.scoreA))} —
        ${l(((n=e.opponent)==null?void 0:n.name)||"?")} ${l(te(e.scoreB))}
      </p>
      <button type="button" class="btn primary" id="gbClear">New challenge</button>
    </div>`}function hb(e,t){var i;const a=Ro().map(n=>`<option value="${l(n.id)}">${l(n.name)} — ${l(n.bio)}</option>`).join("");return`
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
      <p class="muted" style="margin:10px 0 0">Wallet: <strong id="gbWalletBal">${l(te(((i=P().wallet)==null?void 0:i.balance)||0))}</strong> · TEST MODE</p>
    </div>`}function gb(){const e=wn(10),t=e.length?e.map((s,a)=>`<li class="gb-day-row">${yt("battle-win",{className:"gift-sticker gift-sticker--xs"})}<span class="chip">#${a+1}</span><strong>${l(s.username)}</strong></li>`).join(""):'<li class="muted">No winners yet today · win a 60s battle</li>';return`
    <div class="card gb-day-board" id="gbDayWinners">
      <div class="row wrap" style="justify-content:space-between;gap:8px">
        <h3 style="margin:0">Today&apos;s winners</h3>
        <span class="chip">${e.length}/10 · end of day</span>
      </div>
      <p class="muted" style="margin:6px 0 8px;font-size:12px">Sticker board · recognition only · TEST MODE</p>
      <ol class="gb-list gb-day-list">${t}</ol>
    </div>`}function fb(){const e=hp(12),t=fp(15),s=e.length?e.map(i=>{var r,o;const n=i.result==="win"?`Winner ${i.winnerName}`:i.result==="tie"?"Tie":i.result||i.status;return`<li>
            <strong>${l(n)}</strong>
            <span class="muted"> · ${l(((r=i.challenger)==null?void 0:r.name)||"?")} ${l(te(i.scoreA))} vs ${l(((o=i.opponent)==null?void 0:o.name)||"?")} ${l(te(i.scoreB))} · ${l(j(i.endedAt||i.createdAt||0))} · ${l(i.mode||"")}</span>
          </li>`}).join(""):'<li class="muted">No battles yet.</li>';return`
    <div class="card">
      <h3>Top winners (local)</h3>
      <ol class="gb-list">${t.length?t.map((i,n)=>`<li><span class="chip">#${n+1}</span> <strong>${l(i.username)}</strong> <span class="muted">${i.wins} win${i.wins===1?"":"s"} · ${l(te(i.points))} battle pts</span></li>`).join(""):'<li class="muted">Win a battle to appear here.</li>'}</ol>
    </div>
    <div class="card">
      <h3>Battle history</h3>
      <ul class="gb-list">${s}</ul>
    </div>`}function vb(e){return`
    <div class="card">
      <h3>Battle prefs</h3>
      <label class="toggle"><span>Allow battle invitations</span>
        <input type="checkbox" id="gbPrefInvites" ${e.invitationsEnabled?"checked":""}/>
      </label>
      <p class="muted" style="margin:8px 0 0">When off, new challenges are blocked. Existing active battles can still finish.</p>
    </div>`}function bb(){const{user:e,live:t}=P();if(!e)return L("Gift Battles",Ur(),{lead:"Runs inside Live & Group Rooms · voluntary support · TEST MODE"});Sn();const s=yn(),a=bn(),i=gp(),n=!!(t&&!t.endedAt);let r="";(s==null?void 0:s.status)==="pending"?r=pb(s):(s==null?void 0:s.status)==="active"?r=ub(s):(s==null?void 0:s.status)==="ended"?r=mb(s):r=hb(n,a);const o=`
    ${Ur()}
    ${lb()}
    ${cb(i)}
    ${gb()}
    ${db(n,t)}
    ${r}
    ${fb()}
    ${vb(a)}
  `;return L("Gift Battles",o,{lead:"Runs during Live · not a separate stream · 60s voluntary gift battles · not wagers · TEST MODE",badge:(s==null?void 0:s.status)==="active"?"BATTLE":i?"CHAMP":void 0})}function yb(e){var a,i,n,r,o,c,d;ao(),(a=e.querySelector("#gbPrefInvites"))==null||a.addEventListener("change",p=>{op({invitationsEnabled:p.target.checked}),g(p.target.checked?"Invitations on":"Invitations off")}),(i=e.querySelector("#gbTopUp"))==null||i.addEventListener("click",()=>{var m;Ma(10,"Gift battle demo top-up · TEST MODE"),g("+$10 demo wallet");const p=e.querySelector("#gbWalletBal");p&&(p.textContent=te(((m=P().wallet)==null?void 0:m.balance)||0))});const t=p=>{const m=e.querySelector("#gbOpponent"),h=m==null?void 0:m.value,f=Ro().find(b=>b.id===h),v=lp({opponentId:h,opponentName:f==null?void 0:f.name,mode:p});if((v==null?void 0:v.error)==="signin")return g("Sign in first");if((v==null?void 0:v.error)==="invites_disabled")return g("Invitations disabled");if((v==null?void 0:v.error)==="not_live")return g("Not live — use sandbox");if((v==null?void 0:v.error)==="battle_in_progress")return g("Battle already in progress");if((v==null?void 0:v.error)==="self")return g("Pick another fan");g("Challenge sent · waiting for accept"),Pt()};(n=e.querySelector("#gbStartLive"))==null||n.addEventListener("click",()=>t("live")),(r=e.querySelector("#gbStartSandbox"))==null||r.addEventListener("click",()=>t("sandbox")),(o=e.querySelector("#gbAccept"))==null||o.addEventListener("click",()=>{const p=cp();if((p==null?void 0:p.error)==="no_pending")return g("No pending challenge");if((p==null?void 0:p.error)==="invites_disabled")return g("Invitations disabled");g("Battle started · 1:00"),Pt()}),(c=e.querySelector("#gbDecline"))==null||c.addEventListener("click",()=>{const p=dp();if(p!=null&&p.error)return g(String(p.error));g("Challenge declined"),Pt()}),(d=e.querySelector("#gbClear"))==null||d.addEventListener("click",()=>{const p=pp();if(p!=null&&p.error)return g("Battle still running");Pt()}),e.querySelectorAll("[data-gb-gift]").forEach(p=>{p.addEventListener("click",()=>{var y;const m=mp({side:p.dataset.gbGift,kind:p.dataset.kind||"gift",amount:Number(p.dataset.amt)||2,label:p.dataset.label||""});if((m==null?void 0:m.error)==="signin")return g("Sign in first");if((m==null?void 0:m.error)==="no_active"||(m==null?void 0:m.error)==="ended")return g("No active battle");if((m==null?void 0:m.error)==="offline")return g("Live offline — use sandbox");if((m==null?void 0:m.error)==="insufficient")return g("Need wallet credits");if(g(p.dataset.gbGift==="opponent"?"Opponent support (demo)":"Support sent · demo"),((y=m.battle)==null?void 0:y.status)==="ended"){g(m.battle.result==="win"?`Winner · ${m.battle.winnerName}`:"Tie!"),Pt();return}const h=e.querySelector("#gbScoreA"),f=e.querySelector("#gbScoreB"),v=e.querySelector("#gbScoreText"),b=m.battle;h&&f&&b?(h.textContent=te(b.scoreA),h.setAttribute("aria-label",`Challenger score ${te(b.scoreA)}`),f.textContent=te(b.scoreB),f.setAttribute("aria-label",`Opponent score ${te(b.scoreB)}`),v&&(v.textContent=`Live score: ${b.challenger.name} ${te(b.scoreA)} — ${b.opponent.name} ${te(b.scoreB)}`)):Pt()})});const s=e.querySelector("#gbClock");s&&($a=setInterval(()=>{const p=Sn();if(!p||p.status==="ended"){ao(),(p==null?void 0:p.status)==="ended"&&g(p.result==="win"?`Winner · ${p.winnerName}`:"Tie!"),Pt();return}const m=Math.max(0,(p.endsAt||0)-Date.now());s.textContent=Uc(m)},250))}function Ee(){K("#/multiguest")}function kb(e){return(String(e||"?").trim().slice(0,2)||"?").toUpperCase()}function Sb(e){const t=P().user;return!t||!e?!1:(t.following||[]).includes(e)}function Gn(e){return((e==null?void 0:e.guests)||[]).filter(t=>t.status==="joined")}function wb(e){return((e==null?void 0:e.guests)||[]).filter(t=>t.status==="invited")}function Qi(e,t){var a,i;return`${Number(((i=(a=e==null?void 0:e.giftSplit)==null?void 0:a.shares)==null?void 0:i[t])||0).toFixed(0)}%`}function $b(){return L("Multi-Guest Live",`<div class="card">
      <h3>Sign in required</h3>
      <p class="muted">Start a multi-guest demo session as host. No camera / WebRTC — fake stage tiles only.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,{lead:"Invite 2–4 co-hosts · disclosed gift splits · TEST MODE"})}function Eb(){return`
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
    </div>`}function Di({role:e,name:t,sub:s,muted:a,empty:i,followId:n}){if(i)return`
      <div class="mg-tile mg-tile-empty" aria-label="Empty guest slot">
        <div class="mg-avatar mg-avatar-empty">+</div>
        <div class="mg-tile-name muted">Open slot</div>
        <div class="mg-tile-sub muted">Invite a guest</div>
      </div>`;const r=a?'<span class="chip">Muted</span>':"",o=n&&n!=="dbs"?Sb(n)?`<button class="btn ghost mg-follow" data-follow="${l(n)}" data-on="1">Following</button>`:`<button class="btn ghost mg-follow" data-follow="${l(n)}" data-on="0">Follow</button>`:n==="dbs"?'<a class="btn ghost" href="#/profile">Follow PIKK</a>':"";return`
    <div class="mg-tile ${e==="host"?"mg-tile-host":""} ${a?"mg-muted":""}">
      <div class="mg-avatar" aria-hidden="true">${l(kb(t))}</div>
      <div class="mg-tile-name">${l(t)}</div>
      <div class="mg-tile-sub">${l(s||"")} ${r}</div>
      <div class="mg-tile-actions">${o}</div>
    </div>`}function xb(e){var n,r;const t=Gn(e),s=[];s.push(Di({role:"host",name:e.hostName,sub:"Host",followId:e.hostId===((n=P().user)==null?void 0:n.id)?"dbs":e.hostId}));for(let o=0;o<(e.maxGuests||4);o++){const c=t[o];c?s.push(Di({role:"guest",name:c.username,sub:"Guest",muted:c.muted,followId:c.id})):s.push(Di({empty:!0}))}const a=(r=e.giftSplit)!=null&&r.disclosed?'<span class="chip">Split disclosed</span>':'<span class="chip">Split pending</span>',i=e.broadcastReady?'<span class="chip">Broadcast ready</span>':'<span class="chip">Setup</span>';return`
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
    </div>`}function Ab(e){const t=vp(),s=new Set((e.guests||[]).filter(p=>p.status==="invited"||p.status==="joined").map(p=>p.id)),a=t.filter(p=>p.id!==e.hostId&&!s.has(p.id)),i=wb(e),n=Gn(e),r=a.length?a.map(p=>`<option value="${l(p.id)}">${l(p.username)} — ${l(p.bio||"demo")}</option>`).join(""):'<option value="">No more demo guests</option>',o=i.length?i.map(p=>`
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
            <span class="muted" style="font-size:12px"> · gift ${l(Qi(e,p.id))}</span>
          </span>
          <span class="row wrap" style="gap:6px">
            <button class="btn ghost mg-mute" data-id="${l(p.id)}" data-muted="${p.muted?"1":"0"}">
              ${p.muted?"Unmute":"Mute"}
            </button>
            <button class="btn ghost mg-leave" data-id="${l(p.id)}">Leave (sim)</button>
            <button class="btn ghost danger mg-remove" data-id="${l(p.id)}">Remove</button>
          </span>
        </li>`).join(""):'<li class="muted">No guests on stage yet — invite below.</li>',d=n.length+i.length>=(e.maxGuests||4);return`
    <div class="card">
      <h3>Guests &amp; moderation</h3>
      <p class="muted" style="margin:0 0 8px">Host simulates Accept/Decline. Up to ${l(String(e.maxGuests||4))} guests.</p>
      <ul class="mg-list">${c}</ul>
      <h4 style="margin:14px 0 6px">Pending invites</h4>
      <ul class="mg-list">${o}</ul>
      <div class="field" style="margin-top:12px">
        <span>Invite demo guest</span>
        <div class="row wrap" style="gap:8px;margin-top:6px">
          <select id="mgInviteSelect" ${d||!a.length?"disabled":""}>${r}</select>
          <button class="btn primary" id="mgInviteBtn" ${d||!a.length?"disabled":""}>Invite</button>
        </div>
      </div>
      ${d?'<p class="muted" style="margin:8px 0 0">Guest slots full (joined + pending).</p>':""}
    </div>`}function Cb(e){var r,o;const t=Gn(e),s=[{id:e.hostId,username:e.hostName,role:"Host"},...t.map(c=>({id:c.id,username:c.username,role:"Guest"}))],a=((r=e.giftSplit)==null?void 0:r.mode)||"equal",i=!!((o=e.giftSplit)!=null&&o.disclosed),n=s.map(c=>{var p,m;const d=Number(((m=(p=e.giftSplit)==null?void 0:p.shares)==null?void 0:m[c.id])||0);return`
        <li class="mg-split-row">
          <span><strong>@${l(c.username)}</strong> <span class="chip">${l(c.role)}</span></span>
          ${a==="custom"&&!i?`<label class="mg-pct"><input type="number" min="0" max="100" step="1" class="mg-share-input" data-id="${l(c.id)}" value="${l(String(d))}" /> %</label>`:`<span class="chip">${l(String(Math.round(d)))}%</span>`}
        </li>`}).join("");return`
    <div class="card mg-split">
      <h3>Gift split disclosure</h3>
      <p class="muted">Required before broadcast when multiple hosts/guests share gifts. Display-only · TEST MODE · not a real payout.</p>
      <div class="row wrap" style="gap:8px;margin:10px 0">
        <button type="button" class="chip pikk-chip${a==="equal"?" on":""}" aria-pressed="${a==="equal"}" id="mgSplitEqual">Equal split</button>
        <button type="button" class="chip pikk-chip${a==="custom"?" on":""}" aria-pressed="${a==="custom"}" id="mgSplitCustom">Custom %</button>
      </div>
      <ul class="mg-list">${n}</ul>
      <p class="muted" style="margin:8px 0 0">Host share: <strong>${l(Qi(e,e.hostId))}</strong>
        · Guests: ${t.length?t.map(c=>`@${l(c.username)} ${l(Qi(e,c.id))}`).join(" · "):"none yet"}</p>
      ${i?`<p class="mg-ok" style="margin:10px 0 0">✓ Split disclosed ${e.giftSplit.disclosedAt?"· "+j(e.giftSplit.disclosedAt):""}. Broadcast ready (demo).</p>`:`<div class="row wrap" style="gap:8px;margin-top:12px">
               ${a==="custom"?'<button class="btn" id="mgSplitApply">Apply custom %</button>':""}
               <button class="btn primary" id="mgDisclose">Disclose &amp; ready broadcast</button>
             </div>
             <p class="muted" style="margin:8px 0 0">Custom % must total 100 among host + joined guests.</p>`}
    </div>`}function Tb(e){return`
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
    </div>`}function io(e){return e.length?`
    <div class="card">
      <h3>Recent multi-guest sessions</h3>
      <ul class="mg-list">${e.slice(0,8).map(s=>{var i;const a=(s.guests||[]).filter(n=>n.status==="joined"||n.joinedAt).length;return`<li><strong>${l(s.title)}</strong> · ${l(String(a))} guests · ${j(s.endedAt||s.startedAt)}
        ${(i=s.giftSplit)!=null&&i.disclosed?" · split disclosed":""}</li>`}).join("")}</ul>
    </div>`:`
      <div class="card">
        <h3>Recent multi-guest sessions</h3>
        <p class="muted" style="margin:0">No ended sessions yet.</p>
      </div>`}function Mb(e){return`
    <div class="card">
      <h3>Start multi-guest session</h3>
      <p class="muted">You host as <strong>@${l(e.username)}</strong>. Invite demo contacts next — no real stream.</p>
      <div class="field" style="margin-top:10px">
        <span>Session title</span>
        <input id="mgTitle" maxlength="80" placeholder="e.g. Friday collab freestyle" value="PIKK Multi-Guest Demo" />
      </div>
      <button class="btn primary" id="mgStart" style="margin-top:12px">Start as host</button>
    </div>`}function Db(){const t=P().user;if(!t)return $b();Ja();const s=Ks(),a=bp();return!s||s.endedAt?L("Multi-Guest Live",`${Eb()}${Mb(t)}${io(a)}`,{lead:"2–4 co-hosts · gift split disclosure · TEST MODE"}):L("Multi-Guest Live",`${xb(s)}${Ab(s)}${Cb(s)}${Tb(s)}${io(a)}`,{lead:"Active collab session · fake stage · TEST MODE"})}function Pb(e){var s,a,i,n,r,o,c,d,p;if(!e)return;(s=e.querySelector("#mgStart"))==null||s.addEventListener("click",()=>{var f;const m=((f=e.querySelector("#mgTitle"))==null?void 0:f.value)||"",h=yp(m);if(h.error==="signin")return g("Sign in first");if(h.error==="session_in_progress")return g("Session already active");g("Multi-guest session started"),Ee()}),(a=e.querySelector("#mgEnd"))==null||a.addEventListener("click",()=>{const m=Tp();if(m.error)return g(m.error==="host_only"?"Host only":"No session");g("Session ended"),Ee()}),(i=e.querySelector("#mgInviteBtn"))==null||i.addEventListener("click",()=>{var f,v;const m=(f=e.querySelector("#mgInviteSelect"))==null?void 0:f.value;if(!m)return g("Pick a guest");const h=kp(m);if(h.error==="full")return g("Guest slots full");if(h.error==="already_invited")return g("Already invited");if(h.error)return g("Invite failed: "+h.error);g("Invited @"+(((v=h.guest)==null?void 0:v.username)||m)),Ee()}),e.querySelectorAll(".mg-accept").forEach(m=>{m.addEventListener("click",()=>{var f;const h=Sp(m.getAttribute("data-id"));if(h.error==="full")return g("Stage full");if(h.error)return g("Accept failed");g("@"+(((f=h.guest)==null?void 0:f.username)||"")+" joined"),Ee()})}),e.querySelectorAll(".mg-decline").forEach(m=>{m.addEventListener("click",()=>{if(wp(m.getAttribute("data-id")).error)return g("Decline failed");g("Invite declined"),Ee()})}),e.querySelectorAll(".mg-mute").forEach(m=>{m.addEventListener("click",()=>{const h=m.getAttribute("data-id"),f=m.getAttribute("data-muted")==="1";if(xp(h,!f).error)return g("Mute failed");g(f?"Unmuted":"Muted"),Ee()})}),e.querySelectorAll(".mg-leave").forEach(m=>{m.addEventListener("click",()=>{if($p(m.getAttribute("data-id")).error)return g("Leave failed");g("Guest left"),Ee()})}),e.querySelectorAll(".mg-remove").forEach(m=>{m.addEventListener("click",()=>{if(Ep(m.getAttribute("data-id")).error)return g("Remove failed");g("Guest removed"),Ee()})}),e.querySelectorAll(".mg-follow").forEach(m=>{m.addEventListener("click",()=>{const h=m.getAttribute("data-follow");m.getAttribute("data-on")==="1"?(Ha(h),g("Unfollowed")):(Ua(h),g("Following")),Ee()})}),(n=e.querySelector("#mgSplitEqual"))==null||n.addEventListener("click",()=>{if(Ts({mode:"equal",disclose:!1}).error)return g("Split failed");g("Equal split applied"),Ee()}),(r=e.querySelector("#mgSplitCustom"))==null||r.addEventListener("click",()=>{var f;const m=Ks();if(Ts({mode:"custom",shares:((f=m==null?void 0:m.giftSplit)==null?void 0:f.shares)||{},disclose:!1}).error)return g("Could not switch to custom");g("Custom split — edit % then Apply"),Ee()}),(o=e.querySelector("#mgSplitApply"))==null||o.addEventListener("click",()=>{const m={};e.querySelectorAll(".mg-share-input").forEach(f=>{m[f.getAttribute("data-id")]=Number(f.value)||0});const h=Ts({mode:"custom",shares:m,disclose:!1});if(h.error==="split_total")return g(`Percents total ${h.total}% — need 100%`);if(h.error)return g("Apply failed");g("Custom split saved"),Ee()}),(c=e.querySelector("#mgDisclose"))==null||c.addEventListener("click",()=>{var f;const m=Ks();if(((f=m==null?void 0:m.giftSplit)==null?void 0:f.mode)==="custom"){const v={},b=e.querySelectorAll(".mg-share-input");if(b.length){b.forEach(k=>{v[k.getAttribute("data-id")]=Number(k.value)||0});const y=Ts({mode:"custom",shares:v,disclose:!1});if(y.error==="split_total")return g(`Percents total ${y.total}% — need 100%`)}}const h=Cp();if(h.error==="split_total")return g(`Percents total ${h.total}% — need 100%`);if(h.error)return g("Disclose failed");g("Gift split disclosed · broadcast ready (demo)"),Ee()});const t=()=>{const m=e.querySelector("#mgChatInput"),h=(m==null?void 0:m.value)||"",f=Ap(h);if(f.error==="empty")return g("Type a message");if(f.error)return g("Chat failed");m&&(m.value=""),Ee()};(d=e.querySelector("#mgChatSend"))==null||d.addEventListener("click",t),(p=e.querySelector("#mgChatInput"))==null||p.addEventListener("keydown",m=>{m.key==="Enter"&&(m.preventDefault(),t())})}function xe(e){K(e?`#/fanclubs?club=${encodeURIComponent(e)}`:"#/fanclubs")}function et(e="DemoFan"){const{user:t}=P();if(t)return t;const s=os(e);return g(`Signed in as ${e} · local demo`),s||P().user}function Hc(e){return e==="paid"?"Paid / PIKK+":e==="members"?"Members only":"Public"}function Lb(e,t){const s=t===e.id,a=[e.official?'<span class="chip">Official DBS</span>':"",`<span class="chip">${l(Hc(e.privacy))}</span>`,`<span class="chip">${e.memberCount||0} members</span>`].filter(Boolean).join(" ");return`<button type="button" class="fanclub-card${s?" on":""}" data-open-club="${l(e.id)}" data-search="${l(`${e.name||""} ${e.hostName||""} ${e.description||""}`)}" aria-label="Open ${l(e.name)} club">
    <div class="row" style="gap:10px;align-items:center">
      <img src="${l(e.graphic||"/brand/pikk-logo-square.png")}" alt="" width="48" height="48" style="border-radius:12px;object-fit:cover;background:#111" />
      <div style="flex:1;min-width:0">
        <strong>${l(e.name)}</strong>
        <div class="muted" style="font-size:12px;margin-top:2px">Host @${l(e.hostName)} · Discover DatBoiSkeet</div>
        <div class="row wrap" style="gap:6px;margin-top:6px">${a}</div>
      </div>
    </div>
  </button>`}function Ib(e){const t=Qs(e);if(!t)return'<div class="card"><p class="muted" style="margin:0">Club not found.</p><button class="btn" data-back-list>Back to clubs</button></div>';const s=P().user,a=Yo(t.id),i=su(t.id),n=Fs(t.id),r=Jo(t.id),o=Kt(),c=r.ok?"":`<div class="card" style="border-color:rgba(245,158,11,.35)">
          <h3 style="margin:0 0 6px">${t.privacy==="paid"?"PIKK+ room":"Members only"}</h3>
          <p class="muted" style="margin:0 0 10px">${t.privacy==="paid"?"This room uses membership permissions (PIKK+ or higher). TEST MODE unlock below — no real charge.":"Join the club to enter the discussion room."}</p>
          ${t.privacy==="paid"?`<button class="btn primary" id="fcUnlockSkeet">Unlock PIKK+ · TEST MODE</button>
                 <a class="btn" href="#/pricing">Pricing</a>
                 <p class="chip" style="margin-top:8px">Current membership: ${l(o||"none")}</p>`:`<button class="btn primary" data-join="${l(t.id)}">Join club</button>`}
        </div>`,d=r.ok?au(t.id):[],p=r.ok?d.length?d.map(h=>{const f=n?`<div class="row wrap" style="gap:6px;margin-top:6px">
                   <button class="btn ghost" data-pin="${l(h.id)}" data-club="${l(t.id)}">${h.pinned?"Unpin":"Pin"} · mod</button>
                   <button class="btn ghost" data-remove="${l(h.id)}" data-club="${l(t.id)}">Remove · mod</button>
                 </div>`:"";return`<li style="padding:10px 0;border-top:1px solid rgba(255,255,255,.06)">
              <div class="row" style="justify-content:space-between;gap:8px">
                <strong>@${l(h.username)}</strong>
                <span class="muted" style="font-size:12px">${l(j(h.at))}${h.pinned?" · pinned":""}</span>
              </div>
              <p style="margin:6px 0 0">${l(h.text)}</p>
              ${f}
            </li>`}).join(""):'<li class="muted" style="padding:8px 0">No posts yet — start the discussion.</li>':"",m=r.ok?`<form id="fcPostForm" class="card" style="margin-top:10px">
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
            <span class="chip">${l(Hc(t.privacy))}</span>
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
    ${c}
    ${r.ok?`<div class="card">
             <h3 style="margin:0 0 4px">Discussion</h3>
             <p class="muted" style="margin:0 0 8px;font-size:12px">Local posts in dbs_v1 · mods can pin/remove</p>
             <ul class="list-plain" id="fcPosts">${p}</ul>
           </div>
           ${m}`:""}
  `}function Ob(e){var d;Je();const t=zo(),s=((d=e==null?void 0:e.query)==null?void 0:d.club)||"",{user:a}=P(),i=t.map(p=>Lb(p,s)).join(""),n=t.filter(p=>p.privacy==="public").length,r=t.length-n,o=`
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
        <button class="btn ghost" type="button" id="fcAdmin">Toggle demo admin</button>
        <p class="chip" style="margin-top:10px">TEST MODE · no real payments · DBS branding stays prominent</p>
      </form>
    </div>`,c=s?Ib(s):`
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
        <div><span>Private / gated</span><strong>${r}</strong><small>Demo access controls</small></div>
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
      ${o}
    `;return L("Fan Clubs",`<div class="fanclubs-studio">${c}</div>`,{lead:"Creator communities inside DBS Lounge · DEMO.",badge:"Phase 2 demo"})}function _b(e){var a,i,n,r,o,c,d;e.querySelectorAll("[data-fc-jump]").forEach(p=>p.addEventListener("click",()=>{var h;const m=p.getAttribute("data-fc-jump");(h=e.querySelector(`#${m}`))==null||h.scrollIntoView({behavior:"smooth",block:"start"})}));const t=e.querySelector("#fcSearch"),s=()=>{const p=String((t==null?void 0:t.value)||"").trim().toLocaleLowerCase(),m=[...e.querySelectorAll(".fanclub-card[data-search]")];let h=0;m.forEach(b=>{const y=(b.dataset.search||"").toLocaleLowerCase().includes(p);b.hidden=!y,y&&(h+=1)});const f=e.querySelector("#fcSearchStatus");f&&(f.textContent=`Showing ${h} of ${m.length} clubs`);const v=e.querySelector("#fcNoResults");v&&(v.hidden=h>0||!p)};t==null||t.addEventListener("input",s),t==null||t.addEventListener("keydown",p=>{p.key!=="Escape"||!t.value||(p.preventDefault(),p.stopPropagation(),t.value="",s())}),e.querySelectorAll("[data-open-club]").forEach(p=>{p.addEventListener("click",()=>xe(p.getAttribute("data-open-club")))}),(a=e.querySelector("[data-back-list]"))==null||a.addEventListener("click",()=>xe()),(i=e.querySelector("#fcSignIn"))==null||i.addEventListener("click",()=>{et("DemoFan"),xe()}),(n=e.querySelector("#fcAdmin"))==null||n.addEventListener("click",()=>{var m,h;et("DemoAdmin");const p=!ae();zs(p),g(p?"Demo admin on":"Demo admin off"),xe(((m=e.querySelector("[data-leave],[data-join]"))==null?void 0:m.getAttribute("data-leave"))||((h=e.querySelector("[data-join]"))==null?void 0:h.getAttribute("data-join"))||void 0)}),(r=e.querySelector("#fcSeedBtn"))==null||r.addEventListener("click",()=>{Je({force:!0}),g("Demo clubs reseeded"),xe()}),(o=e.querySelector("#fcCreateForm"))==null||o.addEventListener("submit",p=>{var y,k,w,x,S;p.preventDefault(),et("DemoCreator");const m=(y=e.querySelector("#fcName"))==null?void 0:y.value,h=(k=e.querySelector("#fcDesc"))==null?void 0:k.value,f=((w=e.querySelector("#fcGraphic"))==null?void 0:w.value)||"/brand/pikk-logo-square.png",v=((x=e.querySelector("#fcPrivacy"))==null?void 0:x.value)||"public",b=Xp({name:m,description:h,graphic:f,privacy:v});if(b.error==="signin")return g("Sign in required");if(b.error==="name")return g("Name required");g("Club created · TEST MODE"),xe((S=b.club)==null?void 0:S.id)}),e.querySelectorAll("[data-join]").forEach(p=>{p.addEventListener("click",()=>{et();const m=p.getAttribute("data-join");if(Wo(m).error)return g("Could not join");g("Joined club"),xe(m)})}),e.querySelectorAll("[data-leave]").forEach(p=>{p.addEventListener("click",()=>{et();const m=p.getAttribute("data-leave"),h=Zp(m);if(h.error==="host")return g("Host cannot leave — transfer later");if(h.error)return g("Could not leave");g("Left club"),xe(m)})}),e.querySelectorAll("[data-follow]").forEach(p=>{p.addEventListener("click",()=>{et();const m=p.getAttribute("data-follow");eu(m),g("Following · optional"),xe(m)})}),e.querySelectorAll("[data-unfollow]").forEach(p=>{p.addEventListener("click",()=>{et();const m=p.getAttribute("data-unfollow");tu(m),g("Unfollowed"),xe(m)})}),(c=e.querySelector("#fcUnlockSkeet"))==null||c.addEventListener("click",()=>{et(),Ga("skeet+",!0),g("PIKK+ unlocked · TEST MODE");const p=new URLSearchParams(location.hash.split("?")[1]||"");xe(p.get("club")||void 0)}),(d=e.querySelector("#fcPostForm"))==null||d.addEventListener("submit",p=>{var b;p.preventDefault(),et();const h=new URLSearchParams(location.hash.split("?")[1]||"").get("club"),f=(b=e.querySelector("#fcPostText"))==null?void 0:b.value,v=iu(h,f);if(v.error==="gated")return g("Room gated");if(v.error==="empty")return g("Write something");if(v.error)return g("Could not post");g("Posted"),xe(h)}),e.querySelectorAll("[data-pin]").forEach(p=>{p.addEventListener("click",()=>{const m=p.getAttribute("data-club");if(nu(m,p.getAttribute("data-pin")).error==="mod")return g("Mods only");g("Pin toggled · TEST MODE"),xe(m)})}),e.querySelectorAll("[data-remove]").forEach(p=>{p.addEventListener("click",()=>{const m=p.getAttribute("data-club");if(ru(m,p.getAttribute("data-remove")).error==="mod")return g("Mods only");g("Post removed · TEST MODE"),xe(m)})})}function Xi(){K("#/loyalty")}function Zi(){const{user:e}=P();if(e)return e;const t=os("LoyalFan");return g("Signed in as LoyalFan · local demo"),t||P().user}function ga(e,t,s){var i;Zi();const a=Nu(e,{points:t,note:s});if(a.error==="signin")return g("Sign in required");if(a.error==="cooldown")return g("Anti-farming · wait a few seconds");if(a.error==="daily_cap")return g("Daily cap hit · come back tomorrow (demo)");if(a.error)return g("Could not record");(a.newBadges||[]).filter(n=>n!=="day_one"||(a.loyalty.badges||[]).includes("day_one")),(i=a.newBadges)!=null&&i.length?g(`+${t} pts · badge: ${a.newBadges.join(", ")}`):g(`+${t} pts · ${s}`),Xi()}function qb(){const{user:e}=P(),t=Zs(),a=fl().map(r=>{const o=r.unlocked;return`<div class="card" style="opacity:${o?1:.55};margin:0">
        <div class="row" style="justify-content:space-between;gap:8px">
          <strong>${l(r.name)}</strong>
          <span class="chip">${o?"Unlocked":"Locked"}</span>
        </div>
        <p class="muted" style="margin:6px 0 0;font-size:12px">${l(r.blurb)}</p>
      </div>`}).join(""),i=(t.history||[]).length===0?'<p class="muted" style="margin:0">No actions yet — try a listen tick or join a club.</p>':`<ul class="list-plain">${(t.history||[]).slice(0,12).map(r=>`<li style="padding:8px 0;border-top:1px solid rgba(255,255,255,.06)">
            <div class="row" style="justify-content:space-between">
              <span><strong>+${r.points}</strong> · ${l(r.note||r.kind)}</span>
              <span class="muted" style="font-size:12px">${l(j(r.at))}</span>
            </div>
          </li>`).join("")}</ul>`,n=t.publicVisible?"Your badges & points can appear on your profile (demo flag).":"History & achievements are private — only you see them here.";return L("Loyalty Club",`
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
    `,{lead:"Recognition for healthy participation · DEMO.",badge:"Phase 2 demo"})}function Nb(e){var t,s,a,i,n,r;(t=e.querySelector("#loyListen"))==null||t.addEventListener("click",()=>ga("listen",5,"Authorized listening tick")),(s=e.querySelector("#loyLive"))==null||s.addEventListener("click",()=>ga("live",8,"Attended live (stub)")),(a=e.querySelector("#loyHelp"))==null||a.addEventListener("click",()=>ga("help",6,"Shared community helper tip")),(i=e.querySelector("#loyClub"))==null||i.addEventListener("click",()=>{Zi(),Je();const o=zo(),c=o.find(d=>d.privacy==="public")||o[0];c&&Wo(c.id),ga("club",10,c?`Joined ${c.name}`:"Joined Fan Club")}),(n=e.querySelector("#loyPublic"))==null||n.addEventListener("change",o=>{Zi(),qu(o.target.checked),g(o.target.checked?"Public visibility on":"Achievements private"),Xi()}),(r=e.querySelector("#loyReset"))==null||r.addEventListener("click",()=>{Ru(),g("Loyalty demo reset"),Xi()})}function Lt(){K("#/openmic")}function Pi(e="MicHopeful"){const{user:t}=P();if(t)return t;const s=os(e);return g(`Signed in as ${e} · local demo`),s||P().user}function no(e){return`<span class="chip">${l(e==="approved"?"Approved":e==="rejected"?"Rejected":"Pending")}</span>`}function Rb(){const e=ju(),t=e.chipLabel||"House rotation",s=e.embed?at(e.embed,"rel=0"):"";return`
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
    </div>`}function Bb(){us();const{user:e}=P(),t=ae(),s=Ku(),a=e?Ki().filter(d=>d.userId===e.id):[],i=t?Ki({status:"pending"}):[],n=a.filter(d=>d.status==="pending").length,r=s.length===0?'<p class="muted" style="margin:0">No approved performers yet.</p>':s.map(d=>`<article class="card" style="margin:0 0 10px">
              <div class="row" style="justify-content:space-between;gap:8px">
                <div>
                  <strong>${l(d.trackTitle)}</strong>
                  <div class="muted" style="font-size:12px">@${l(d.username)} · ${l(d.talent)}</div>
                </div>
                ${no("approved")}
              </div>
              <p style="margin:8px 0 0">${l(d.profileNote||"Featured in PIKK Open Mic showcase.")}</p>
              <p class="muted" style="font-size:11px;margin:8px 0 0">Not a paid ranking · discovery showcase</p>
            </article>`).join(""),o=a.length===0?'<p class="muted" style="margin:0">You have no applications yet.</p>':`<ul class="list-plain">${a.map(d=>`<li style="padding:10px 0;border-top:1px solid rgba(255,255,255,.06)">
              <div class="row" style="justify-content:space-between">
                <strong>${l(d.trackTitle)}</strong>
                ${no(d.status)}
              </div>
              <div class="muted" style="font-size:12px">${l(d.talent)} · ${l(j(d.at))}</div>
            </li>`).join("")}</ul>`,c=t?`<div class="card">
         <h3 style="margin:0 0 8px">Admin review · TEST MODE</h3>
         <p class="muted" style="margin:0 0 10px;font-size:12px">Approve for showcase or reject. Distinct from pay-to-win.</p>
         ${i.length===0?'<p class="muted" style="margin:0">No pending applications.</p>':i.map(d=>`<div style="padding:10px 0;border-top:1px solid rgba(255,255,255,.06)">
                     <strong>${l(d.trackTitle)}</strong> · @${l(d.username)} · ${l(d.talent)}
                     <p class="muted" style="margin:4px 0;font-size:12px">${l(d.profileNote)}</p>
                     <p class="chip">Rights certified: ${d.rightsCertified?"yes":"no"}</p>
                     <div class="row wrap" style="gap:8px;margin-top:8px">
                       <button class="btn primary" data-om-approve="${l(d.id)}">Approve</button>
                       <button class="btn" data-om-reject="${l(d.id)}">Reject</button>
                     </div>
                   </div>`).join("")}
       </div>`:"";return L("Open Mic",`
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
    ${Rb()}

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
      ${o}
    </div>

    ${c}

    <div class="card openmic-panel" id="omShowcaseCard">
      <h3 style="margin:0 0 8px">Approved showcase</h3>
      <p class="muted" style="margin:0 0 10px;font-size:12px">Featured performers · discovery, not spend rank</p>
      ${r}
    </div>
    </div>
    `,{lead:"24/7 house catalog when idle · opt-in talent showcase · DEMO.",badge:"Phase 2 demo"})}function Kb(e){var t,s,a,i,n;e.querySelectorAll("[data-om-jump]").forEach(r=>{r.addEventListener("click",()=>{const o=r.getAttribute("data-om-jump"),c=o==="omApplyCard"||o==="omShowcaseCard"?e.querySelector("#"+o):null;c==null||c.scrollIntoView({behavior:"smooth",block:"start"})})}),(t=e.querySelector("#omSignIn"))==null||t.addEventListener("click",()=>{Pi(),Lt()}),(s=e.querySelector("#omAdmin"))==null||s.addEventListener("click",()=>{Pi("DemoAdmin");const r=!ae();zs(r),g(r?"Demo admin on":"Demo admin off"),Lt()}),(a=e.querySelector("#omSeed"))==null||a.addEventListener("click",()=>{us({force:!0}),g("Open Mic demos reseeded"),Lt()}),(i=e.querySelector("#omForm"))==null||i.addEventListener("submit",r=>{var d,p,m,h;r.preventDefault(),Pi();const o=(d=e.querySelector("#omRights"))==null?void 0:d.checked,c=Gu({talent:(p=e.querySelector("#omTalent"))==null?void 0:p.value,trackTitle:(m=e.querySelector("#omTitle"))==null?void 0:m.value,profileNote:(h=e.querySelector("#omNote"))==null?void 0:h.value,rightsCertified:!!o});if(c.error==="rights")return g("Rights certification required");if(c.error==="title")return g("Title required");if(c.error==="pending")return g("You already have a pending application");if(c.error)return g("Could not submit");g("Application submitted · pending review"),Lt()}),e.querySelectorAll("[data-om-approve]").forEach(r=>{r.addEventListener("click",()=>{if(ji(r.getAttribute("data-om-approve"),"approved").error==="admin")return g("Admin only");g("Approved · showcase"),Lt()})}),e.querySelectorAll("[data-om-reject]").forEach(r=>{r.addEventListener("click",()=>{if(ji(r.getAttribute("data-om-reject"),"rejected","Demo reject").error==="admin")return g("Admin only");g("Rejected"),Lt()})}),(n=e.querySelector("#omNextHouse"))==null||n.addEventListener("click",()=>{const r=Fu();g("Next house · "+(r.chipLabel||"House")),Lt()})}let Re=null,Qt="all";try{const e=sessionStorage.getItem("dbs_shop_cat");e&&(Qt=e,sessionStorage.removeItem("dbs_shop_cat"));const t=sessionStorage.getItem("dbs_shop_preview");t&&(Re=t,sessionStorage.removeItem("dbs_shop_preview"))}catch{}function ct(){K("#/profile-shop")}function pt(e){return ba.find(t=>t.id===e)||null}function Vc(e){return vl(e)}function jb(e){const t={...e.equipped},s=Re?pt(Re):null;if(s){const a=Vc(s);a&&(t[a]=s.id)}return t}function Fb(e){return`rarity-${l(e||"rare")}`}function Gb(e){return`$${Number(e).toFixed(2)}`}function Ub(e){const{user:t}=P(),s=jb(e),a=s.frame?pt(s.frame):null,i=s.effect?pt(s.effect):null,n=s.banner?pt(s.banner):null,r=s.nameStyle?pt(s.nameStyle):null,o=s.badge?pt(s.badge):null,c=(t==null?void 0:t.username)||"DemoFan",d=e.reduceMotion,p=i?`shop-fx shop-fx--${l(i.id.replace(/^fx-/,""))}${d?" shop-fx--still":""}`:"",m=r?`shop-name shop-name--${l(r.id.replace(/^name-/,""))}`:"shop-name",h=a?`shop-avatar-frame shop-frame--${l(a.id.replace(/^frame-/,""))}`:"shop-avatar-frame";return`
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
          ${a?`<span class="shop-frame-emoji" aria-hidden="true">${l(a.emoji)}</span>`:""}
        </div>
        <div class="shop-preview-meta">
          <div class="${m}">${l(c)}</div>
          <p class="muted small" style="margin:4px 0 0">Cosmetic preview only · not a status grant</p>
          ${o?`<span class="shop-cosmetic-badge" title="Cosmetic style — not Verified/Founder">${l(o.emoji)} ${l(o.name)}</span>`:'<span class="muted small">No cosmetic badge equipped</span>'}
        </div>
      </div>
      <div class="shop-equipped-row">
        ${["frame","effect","banner","nameStyle","badge"].map(v=>{const b=s[v],y=b?pt(b):null,k=v==="nameStyle"?"Name":v.charAt(0).toUpperCase()+v.slice(1);return`<span class="shop-eq-chip ${y?"on":""}">${l(k)}: ${y?l(y.emoji+" "+y.name):"—"}</span>`}).join("")}
      </div>
    </div>`}function Hb(e,t){const s=t.owned.includes(e.id),a=Vc(e),i=a&&t.equipped[a]===e.id,n=Re===e.id;return`
    <article class="cosmetic-card ${Fb(e.rarity)} ${n?"is-selected":""} ${s?"is-owned":""} ${i?"is-equipped":""}" data-id="${l(e.id)}">
      <div class="cosmetic-art" role="button" tabindex="0" data-preview="${l(e.id)}" aria-label="Preview ${l(e.name)}">
        <span class="cosmetic-emoji">${l(e.emoji)}</span>
        <span class="concept-flag">CONCEPT</span>
        ${s?'<span class="owned-flag">Owned</span>':""}
        ${i?'<span class="equipped-flag">Equipped</span>':""}
      </div>
      <div class="body">
        <div class="name">${l(e.name)}</div>
        <div class="meta">${l(e.category)} · ${l(e.rarity)}</div>
        <div class="price">${Gb(e.price)} <span class="chip" style="margin-left:4px">TEST MODE</span></div>
        <div class="cosmetic-actions row wrap" style="gap:6px;margin-top:8px">
          <button type="button" class="btn ghost shop-act" data-act="preview" data-id="${l(e.id)}">Preview</button>
          ${s?i?`<button type="button" class="btn shop-act" data-act="unequip" data-slot="${l(a)}" data-id="${l(e.id)}">Unequip</button>`:`<button type="button" class="btn primary shop-act" data-act="equip" data-id="${l(e.id)}">Equip</button>`:`<button type="button" class="btn primary shop-act" data-act="unlock" data-id="${l(e.id)}">Unlock · TEST MODE</button>`}
        </div>
      </div>
    </article>`}function Vb(){const e=bt(),t=Qt==="all"?ba:ba.filter(n=>n.category===Qt),s=pd.map(n=>`<button type="button" class="shop-chip ${Qt===n.id?"on":""}" data-cat="${l(n.id)}" aria-pressed="${Qt===n.id?"true":"false"}">${l(n.label)}</button>`).join(""),a=t.length===0?'<p class="muted">No cosmetics in this category.</p>':`<div class="cosmetic-grid">${t.map(n=>Hb(n,e)).join("")}</div>`,i=`
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

    ${Ub(e)}

    <div class="card">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center;margin-bottom:10px">
        <h3 style="margin:0">Catalog · ${ba.length} items</h3>
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
  `;return L("Profile Shop",i,{lead:"PIKK digital cosmetics · live preview · CONCEPT / TEST MODE.",badge:"Phase 2 · CONCEPT"})}function zb(e){var s,a,i;e.querySelectorAll(".shop-chip").forEach(n=>{n.addEventListener("click",()=>{Qt=n.dataset.cat||"all",ct()})}),(s=e.querySelector("#shopReduceMotion"))==null||s.addEventListener("change",n=>{Xu(n.target.checked),g(n.target.checked?"Motion reduced":"Motion on"),ct()}),(a=e.querySelector("#shopBundle"))==null||a.addEventListener("click",()=>{var r;const n=Wu();g(`Starter bundle unlocked · ${((r=n.unlocked)==null?void 0:r.length)||0} items · no charge`),ct()}),(i=e.querySelector("#shopReset"))==null||i.addEventListener("click",()=>{Zu(),Re=null,g("Demo inventory reset"),ct()});const t=n=>{Re=n,g("Preview updated"),ct()};e.querySelectorAll("[data-preview]").forEach(n=>{n.addEventListener("click",()=>t(n.dataset.preview)),n.addEventListener("keydown",r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),t(n.dataset.preview))})}),e.querySelectorAll(".shop-act").forEach(n=>{n.addEventListener("click",()=>{const r=n.dataset.act,o=n.dataset.id;if(r==="preview")return t(o);if(r==="unlock"){const c=zu(o);return c.error?g("Could not unlock"):(Re=o,g(c.already?"Already owned · TEST MODE":"Unlocked · TEST MODE · no charge"),ct())}if(r==="equip"){const c=Ju(o);return c.error==="not_owned"?g("Unlock first · TEST MODE"):c.error?g("Could not equip"):(Re=o,g("Equipped"),ct())}if(r==="unequip"){const c=n.dataset.slot;if(Qu(c).error)return g("Could not unequip");const p=Re?pt(Re):null;return p&&vl(p)===c&&(Re=null),g("Unequipped"),ct()}})})}const Wb=["All","Hats","Shirts","Jackets"],Yb=["Ladies Shop","Men's Shop","Beauty & Hair","Fashion & Accessories","Lifestyle & Home","Creator Brands","Live Shopping","Deals"];function Jb(e,t="All",s=""){const a=String(s||"").trim().toLocaleLowerCase();return e.filter(i=>(t==="All"||i.category===t)&&(!a||`${i.name} ${i.category}`.toLocaleLowerCase().includes(a)))}function Qb(e,t="featured"){const s=[...e];return t==="price-asc"?s.sort((a,i)=>Number(a.price)-Number(i.price)):t==="price-desc"?s.sort((a,i)=>Number(i.price)-Number(a.price)):t==="name-asc"?s.sort((a,i)=>String(a.name).localeCompare(String(i.name))):s}function Xb(e){return`
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
    </article>`}function Zb(){const e=Wb.map(i=>`<button type="button" class="chip pikk-chip pikk-shop-filter${i==="All"?" on":""}"
      data-category="${l(i)}" aria-pressed="${i==="All"?"true":"false"}">${l(i)}</button>`).join(""),t=Yb.map(i=>`<li><span>${l(i)}</span><span class="chip">Coming Soon</span></li>`).join(""),a=[Oe.find(i=>i.id==="jacket-black")||Oe.find(i=>i.category==="Jackets"),Oe.find(i=>i.id==="hat-716-orange")||Oe.find(i=>i.category==="Hats"),Oe.find(i=>i.id==="tee-ptsd")||Oe.find(i=>i.category==="Shirts")].filter(Boolean).map(i=>'<a class="pikk-shop-featured-product" href="'+l(i.shopUrl)+'" target="_blank" rel="noopener noreferrer" aria-label="View '+l(i.name)+' on Foreign X-Change"><img src="'+l(i.image)+'" alt="'+l(i.name)+'" loading="eager" decoding="async" /><span>'+l(i.category)+"</span></a>").join("");return L("PIKK Shop",`
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
      <p class="muted small" id="pikkShopCount" aria-live="polite">${Oe.length} items</p>
      <div class="merch-grid pikk-shop-premium-grid pikk-shop-real-grid" id="pikkShopProducts">${Oe.map(Xb).join("")}</div>
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
  `,{lead:"Physical merchandise · external checkout · future verified storefronts"})}function ey(e){var h;const t=e.querySelector("#pikkShopSearch"),s=[...e.querySelectorAll(".pikk-shop-product")],a=[...e.querySelectorAll(".pikk-shop-filter, .pikk-shop-category")],i=e.querySelector("#pikkShopCount"),n=e.querySelector("#pikkShopEmpty"),r=e.querySelector("#pikkShopReset"),o=e.querySelector("#pikkShopSort"),c=e.querySelector("#pikkShopProducts"),d=new Map(s.map(f=>[f.dataset.productId,f]));let p="All";function m(){const f=new Set(Jb(Oe,p,(t==null?void 0:t.value)||"").map(v=>v.id));for(const v of Qb(Oe,(o==null?void 0:o.value)||"featured")){const b=d.get(v.id);b&&(c==null||c.appendChild(b))}for(const v of s){const b=f.has(v.dataset.productId);v.hidden=!b,v.style.display=b?"":"none"}if(i&&(i.textContent=`${f.size} ${f.size===1?"item":"items"}`),n&&(n.hidden=f.size>0),r){const v=p!=="All"||!!(t!=null&&t.value.trim())||((o==null?void 0:o.value)||"featured")!=="featured";r.hidden=!v,r.style.display=v?"":"none"}for(const v of a){const b=v.dataset.category===p;v.setAttribute("aria-pressed",String(b)),v.classList.toggle("on",b)}}t==null||t.addEventListener("input",m),t==null||t.addEventListener("keydown",f=>{f.key!=="Escape"||!t.value||(f.preventDefault(),f.stopPropagation(),t.value="",m())}),o==null||o.addEventListener("change",m),r==null||r.addEventListener("click",()=>{p="All",t&&(t.value=""),o&&(o.value="featured"),m(),t==null||t.focus()}),(h=e.querySelector("[data-shop-scroll]"))==null||h.addEventListener("click",()=>{var f,v,b;t==null||t.focus({preventScroll:!0}),(b=e.querySelector("#pikkShopCatalog"))==null||b.scrollIntoView({behavior:(v=(f=window.matchMedia)==null?void 0:f.call(window,"(prefers-reduced-motion: reduce)"))!=null&&v.matches?"instant":"smooth",block:"start"})});for(const f of a)f.addEventListener("click",()=>{var v;p=f.dataset.category||"All",m(),f.classList.contains("pikk-shop-category")&&((v=e.querySelector("#pikkShopCatalog"))==null||v.scrollIntoView({behavior:"auto",block:"start"}))})}let Ea=null;function pe(){K("#/spotlight")}function Li(){Ea&&(clearInterval(Ea),Ea=null)}function zc(e){const t=Math.max(0,Math.ceil(e/1e3)),s=Math.floor(t/60),a=t%60;return`${s}:${String(a).padStart(2,"0")}`}function Un(e){return e==="freestyle"?"Live Freestyle":e==="beat"?"Beat":e==="music_video"?"Music Video":"Song"}function ty(e){const t=P().user;return!t||!e?!1:(t.following||[]).includes(e)}function Hn(){return!!P().user}function sy(){return L("24/7 Spotlight",`<div class="card">
      <h3>Sign in required</h3>
      <p class="muted">Join the FIFO Spotlight queue, vote Keep Going / Play Another, and chat from a local demo account.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,{lead:"Continuous music showcase · votes ≠ paid advantage · TEST MODE"})}function ay(e){return`
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
    </div>`}function iy(e,{showSkip:t=!0}={}){const s=e.chipLabel||e.status||"House rotation",a=e.embed?at(e.embed,"rel=0"):"";return`
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
        ${e.cover?`<img class="sp-cover" src="${l(ut(e.cover))}" alt="" />`:""}
        <div>
          <div class="sp-now-title">${l(e.title)}</div>
          <div class="sp-now-meta">${l(e.artist||"DatBoiSkeet")} · house catalog</div>
          <p class="muted sp-note">${l(e.note||"Approved catalog filler · not a live act")}</p>
          ${e.youtube?`<p style="margin:8px 0 0"><a class="btn ghost" href="${l(e.youtube)}" target="_blank" rel="noopener">Open on YouTube</a></p>`:""}
        </div>
      </div>
      ${t&&Hn()?`<div class="row wrap" style="gap:8px;margin-top:12px">
               <button class="btn" id="spSkipHouse">Skip house · next</button>
               <span class="muted" style="font-size:12px;align-self:center">Join queue takes the stage over house · Skip advances catalog</span>
             </div>`:""}
    </div>`}function ny(e,t){if(!e||e.house){const v=e&&e.house?{id:e.id,title:e.title,artist:e.artist,embed:e.embed,youtube:e.youtube,chipLabel:e.chipLabel||"House · Music Video",note:e.note,cover:e.cover,kind:e.houseKind}:Uo();return iy(v)}const s=P().user,a=e.type==="freestyle",i=a&&e.endsAt?Math.max(0,e.endsAt-Date.now()):null,n=Object.keys(e.keepGoingVotes||{}).length,r=Object.keys(e.playAnotherVotes||{}).length,o=e.userId,c=ty(o),d=s&&s.id===e.userId,p=e.reactions||{fire:0,heart:0,clap:0},m=a?`<div class="sp-timer" aria-live="polite">
         <div class="sp-timer-label">Freestyle timer · ext ${e.extensions||0}/${t.maxExtensions}</div>
         <div class="sp-timer-clock" id="spClock">${zc(i||0)}</div>
         <div class="muted" style="font-size:12px">Keep Going ${n}/${t.keepGoing} · refresh recovers endsAt</div>
       </div>`:`<div class="sp-timer">
         <div class="sp-timer-label">Uploaded · play ${e.playCount||1}/${t.maxUploadStreak}</div>
         <div class="muted" style="font-size:12px">No real audio in TEST MODE · use End set when finished</div>
       </div>`,h=e.awaitingPlayAnother?`<div class="card sp-vote">
         <h3>Play Another?</h3>
         <p class="muted">Audience vote · ${r}/${t.playAnother} · window ends ${e.playAnotherDeadline?j(e.playAnotherDeadline):"soon"} (deadline-based)</p>
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
         </div>`:"",f=d?"":c?`<button class="btn ghost sp-follow" data-follow="${l(o)}" data-on="1">Following</button>`:`<button class="btn ghost sp-follow" data-follow="${l(o)}" data-on="0">Follow</button>`;return`
    <div class="card sp-stage">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center">
        <div class="chip">On stage · ${l(Un(e.type))}</div>
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
    ${h}`}function ry(e,t,s){const a=o=>Math.max(1,(o+(t?1:0))*2),i=(e||[]).map((o,c)=>`
      <li class="sp-q-row">
        <div>
          <strong>${l(o.username)}</strong>
          <span class="muted"> · ${l(Un(o.type))} · ${l(o.title)}</span>
          <div class="muted" style="font-size:12px">${c===0?"Next up":`#${c+1}`} · ~${a(c)} min wait (stub)</div>
        </div>
        <div class="row wrap" style="gap:6px">
          ${s&&o.userId===s.id?'<button class="btn ghost sp-leave-q">Leave</button>':""}
          ${Hn()?`<button class="btn ghost sp-remove-q" data-qid="${l(o.id)}" title="Demo moderator">Remove</button>`:""}
        </div>
      </li>`).join(""),n=s&&(e||[]).some(o=>o.userId===s.id),r=s&&t&&!t.house&&t.userId===s.id;return`
    <div class="card sp-queue">
      <h3>FIFO queue</h3>
      <p class="muted" style="margin-top:0">${e.length?e.length+" waiting":"Queue empty — house catalog on stage"}${t&&!t.house?" · now: "+l(t.username):t&&t.house?" · house: "+l(t.chipLabel||"House"):""}</p>
      <ul class="sp-list">${i||'<li class="muted">No one waiting</li>'}</ul>
      ${n||r?`<p class="muted">You already have a spot (${r?"on stage":"in queue"}). One active spot per user.</p>
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
    </div>`}function oy(e){if(!Hn())return"";const t=ae()?"Admin":"Demo moderator · TEST MODE",s=e&&!e.house;return`
    <div class="card sp-mod">
      <h3>Moderator controls</h3>
      <p class="muted" style="margin-top:0"><span class="chip">${l(t)}</span> Skip / remove for safety · fair order otherwise. House Skip → next queue or next house.</p>
      <div class="row wrap" style="gap:8px">
        <button class="btn" id="spSkip" ${e?"":"disabled"}>Skip current</button>
        ${s&&e.type!=="freestyle"&&!e.awaitingPlayAnother?'<button class="btn ghost" id="spEndSet">End set</button>':""}
      </div>
    </div>`}function ly(e){const t=P().user;return!e||e.house||e.type==="freestyle"||e.awaitingPlayAnother||!t||t.id!==e.userId?"":`
    <div class="card">
      <h3>Your set</h3>
      <p class="muted">No real audio file — tap End set when your demo track “finishes”.</p>
      <button class="btn primary" id="spEndSetSelf">End set</button>
    </div>`}function cy(e){return!e||e.house?"":`
    <div class="card sp-chat-card">
      <h3>Stage chat</h3>
      <div class="sp-chat" id="spChat">${(e.chat||[]).slice(-20).map(s=>`<div class="sp-chat-row ${s.system?"system":""}"><strong>${l(s.username)}</strong>${l(s.text)}</div>`).join("")||'<div class="muted">No messages yet</div>'}</div>
      <form id="spChatForm" class="row" style="gap:8px;margin-top:8px">
        <input id="spChatInput" maxlength="200" placeholder="Say something…" style="flex:1" />
        <button class="btn primary" type="submit">Send</button>
      </form>
    </div>`}function dy(e){return e.length?`
    <div class="card">
      <h3>Recent stage</h3>
      <ul class="sp-list">${e.slice(0,12).map(s=>`<li><strong>${l(s.username)}</strong> · ${l(Un(s.type))} · ${l(s.title)}
         <span class="muted"> · ${l(s.reason||"ended")} · ${j(s.endedAt)}</span></li>`).join("")}</ul>
    </div>`:`
      <div class="card">
        <h3>Recent stage</h3>
        <p class="muted" style="margin:0">No completed turns yet.</p>
      </div>`}function py(){de();const e=P().user;if(!e)return sy();const t=ce(),s=Qp(12);return L("24/7 Spotlight",`${ay(t.thresholds)}
     ${ny(t.nowPlaying,t.thresholds)}
     ${ly(t.nowPlaying)}
     ${oy(t.nowPlaying)}
     ${ry(t.queue,t.nowPlaying,e)}
     ${cy(t.nowPlaying)}
     ${dy(s)}`,{lead:"Always-on music showcase · FIFO queue · votes ≠ wagers · TEST MODE"})}function uy(e){var n,r,o,c,d,p,m,h,f,v,b;Li(),de();const s=ce().nowPlaying;if(s&&s.type==="freestyle"&&s.endsAt){const y=e.querySelector("#spClock");Ea=setInterval(()=>{de();const k=ce().nowPlaying;if(!k||k.type!=="freestyle"||!k.endsAt){Li(),pe();return}const w=Math.max(0,k.endsAt-Date.now());y&&(y.textContent=zc(w)),w<=0&&(Li(),de(),pe())},250)}if(s&&s.awaitingPlayAnother&&s.playAnotherDeadline){const y=Math.max(0,s.playAnotherDeadline-Date.now())+50;setTimeout(()=>{de(),pe()},Math.min(y,35e3))}(n=e.querySelector("#spJoinForm"))==null||n.addEventListener("submit",y=>{var T,_,N;y.preventDefault();const k=((T=e.querySelector("#spType"))==null?void 0:T.value)||"song",w=((_=e.querySelector("#spTitle"))==null?void 0:_.value)||"",x=((N=e.querySelector("#spArtist"))==null?void 0:N.value)||"",S=jp({type:k,title:w,artist:x});if(S.error==="signin")return g("Sign in first");if(S.error==="already_queued")return g("You already have a queue/stage spot");g(k==="freestyle"?"Freestyle — you're up or in queue":"Joined Spotlight queue"),pe()}),(r=e.querySelector("#spLeaveQueue"))==null||r.addEventListener("click",()=>{if(nr().error)return g("Not in queue");g("Left queue"),pe()}),e.querySelectorAll(".sp-leave-q").forEach(y=>{y.addEventListener("click",()=>{nr(),g("Left queue"),pe()})}),e.querySelectorAll(".sp-remove-q").forEach(y=>{y.addEventListener("click",()=>{Fp(y.getAttribute("data-qid")),g("Removed from queue (demo mod)"),pe()})});const a=()=>{ce().nowPlaying,Gp();const y=ce().nowPlaying;y&&y.house?g("Next house · "+(y.chipLabel||"House")):g(y?"Skipped · "+(y.username||"next")+" on stage":"Skipped"),pe()};(o=e.querySelector("#spSkip"))==null||o.addEventListener("click",a),(c=e.querySelector("#spSkipHouse"))==null||c.addEventListener("click",a);const i=()=>{const y=Up();if(y.error==="max_streak"||y.ok){g(y.error==="max_streak"?"Max 3 in a row — advancing":"Play Another? vote open"),pe();return}y.error?g("Cannot end set: "+y.error):pe()};(d=e.querySelector("#spEndSet"))==null||d.addEventListener("click",i),(p=e.querySelector("#spEndSetSelf"))==null||p.addEventListener("click",i),(m=e.querySelector("#spKeepGoing"))==null||m.addEventListener("click",()=>{const y=Hp();if(y.error==="already_voted")return g("Already voted");if(y.error==="max_extensions")return g("Max extensions reached");if(y.error)return g(y.error);g("Keep Going counted"),pe()}),(h=e.querySelector("#spSimKeepGoing"))==null||h.addEventListener("click",()=>{Vp(2),g("+2 simulated fan votes"),pe()}),(f=e.querySelector("#spPlayAnother"))==null||f.addEventListener("click",()=>{const y=zp();if(y.error==="already_voted")return g("Already voted");if(y.error)return g(y.error);g("Play Another vote counted"),pe()}),(v=e.querySelector("#spSimPlayAnother"))==null||v.addEventListener("click",()=>{Wp(2),g("+2 simulated fan votes"),pe()}),e.querySelectorAll(".sp-follow").forEach(y=>{y.addEventListener("click",()=>{const k=y.getAttribute("data-follow");y.getAttribute("data-on")==="1"?(Ha(k),g("Unfollowed")):(Ua(k),g("Following")),pe()})}),e.querySelectorAll(".sp-react").forEach(y=>{y.addEventListener("click",()=>{Yp(y.getAttribute("data-kind")||"fire"),pe()})}),(b=e.querySelector("#spChatForm"))==null||b.addEventListener("submit",y=>{y.preventDefault();const k=e.querySelector("#spChatInput"),w=Jp((k==null?void 0:k.value)||"");if(w.error!=="empty"){if(w.error)return g(w.error);k&&(k.value=""),pe()}})}const Wc="Not available — WebRTC + age assurance required before launch";function xs(){K("#/connect")}function my(){var p;const e=cl(),s=$t().selected||[],a=Lu(),i=ul(),n=Number(i==null?void 0:i.max)||0,r=!!a,o=e.map(m=>{const h=s.includes(m.id),f=m.connected?`<span class="chip">Linked${m.handle?" · "+l(m.handle):""}</span>`:'<span class="chip muted-chip">Not linked</span>';return`
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
                   <input type="checkbox" class="connect-mp-dest" data-id="${l(m.id)}" ${h?"checked":""} ${r?"disabled":""} />
                   Include
                 </label>`:`<button type="button" class="btn primary connect-mp-connect" data-id="${l(m.id)}">Link</button>`}
        </div>
      </div>`}).join(""),c=s.length,d=r?`<button type="button" class="btn danger" id="connectMpEnd">End multi-platform session</button>
       <span class="chip">LIVE · ${l(String(((p=a==null?void 0:a.destinations)==null?void 0:p.length)||c))} dest · TEST MODE</span>`:`<button type="button" class="btn primary" id="connectMpGoLive" ${c?"":"disabled"}>Go live to selected</button>
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
      <div class="connect-mp-grid" style="margin-top:12px">${o}</div>
      <div class="row wrap" style="margin-top:12px;gap:8px;align-items:center">
        ${d}
        <a class="btn ghost" href="#/live">Solo Live stage</a>
      </div>
      <p class="muted" style="margin:10px 0 0;font-size:12px">
        PIKK Connect combines random video discovery and multi-platform live controls in one place.
      </p>
    </div>`}function en(){const e=ml(),t=e.ageConfirmed&&e.rulesAccepted;return L("PIKK Connect",`<div class="connect-monkey" id="connectMonkey">
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
          <strong>${Wc}</strong>
          <p class="muted small">TEST MODE — this is a preview, not a real matching request. No match was created, no camera was requested, and no WebRTC connection was attempted.</p>
        </div>
        <p class="muted small" style="margin-top:10px">Controls are mockups until launch. Prefs save on this device.</p>
      </div>

      ${my()}

      <div class="card">
        <p class="muted" style="margin:0 0 8px">PIKK Connect <strong>does not replace</strong> Live, Messages, or Spotlight. Meanwhile:</p>
        <a class="btn" href="#/live">Live</a> <a class="btn" href="#/messages">Messages</a> <a class="btn" href="#/spotlight">Spotlight</a> <a class="btn ghost" href="#/shorts">Shorts / Clips</a>
      </div>
    </div>`,{lead:"1:1 discovery shell · multi-platform go-live · TEST MODE",badge:"Shell · no WebRTC"})}function hy(e){var t,s;e.querySelectorAll(".connect-mp-connect").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.id,n=xu(i,"");if(n!=null&&n.error)return g(String(n.error));g(`Linked ${i} · TEST MODE`),xs()})}),e.querySelectorAll(".connect-mp-disconnect").forEach(a=>{a.addEventListener("click",()=>{Au(a.dataset.id),g("Unlinked · TEST MODE"),xs()})}),e.querySelectorAll(".connect-mp-dest").forEach(a=>{a.addEventListener("change",()=>{Tu(a.dataset.id),xs()})}),(t=e.querySelector("#connectMpGoLive"))==null||t.addEventListener("click",()=>{const a=Du();if((a==null?void 0:a.error)==="signin")return g("Sign in first");if((a==null?void 0:a.error)==="none_selected")return g("Select at least one destination");if(a!=null&&a.error)return g(String(a.error));g("Multi-platform session started · TEST MODE"),xs()}),(s=e.querySelector("#connectMpEnd"))==null||s.addEventListener("click",()=>{Pu(),g("Session ended"),xs()})}function tn(e=document,t){var i,n,r;const s=()=>{if(typeof t=="function")return t();e.innerHTML=en(),tn(e)};(i=e.querySelector("#connect-age"))==null||i.addEventListener("change",o=>{const c=o.target.checked;cr(c?{ageConfirmed:!0}:{ageConfirmed:!1,rulesAccepted:!1}),s()}),(n=e.querySelector("#connect-rules"))==null||n.addEventListener("change",o=>{cr({rulesAccepted:o.target.checked}),s()}),(r=e.querySelector("#connect-start"))==null||r.addEventListener("click",()=>{const o=e.querySelector("#connect-blocked");o==null||o.removeAttribute("hidden"),g(Wc)}),hy(e);const a=je().elementId;(a==="connect-random-chat"||a==="connect-multistream")&&requestAnimationFrame(()=>{var o,c,d,p;(p=e.querySelector(`#${a}`))==null||p.scrollIntoView({behavior:(d=(c=(o=globalThis.window)==null?void 0:o.matchMedia)==null?void 0:c.call(o,"(prefers-reduced-motion: reduce)"))!=null&&d.matches?"instant":"smooth",block:"start"})})}const Yc="pikk_forum_local_v1",qs=[["music","Music & Artists","♫"],["business","Business & Money","$"],["relationships","Relationships","♡"],["gaming","Gaming","♜"],["sports","Sports","★"],["entertainment","Entertainment","▶"],["lifestyle","Lifestyle","✦"],["general","General Discussion","#"]],sn=new Set(qs.map(e=>e[0])),As=e=>String(e||"").trim();function Cs(){try{const e=JSON.parse(localStorage.getItem(Yc)||"{}");return{posts:Array.isArray(e.posts)?e.posts.filter(t=>t&&sn.has(t.topic)).slice(-150):[],votes:e.votes&&typeof e.votes=="object"?e.votes:{},hidden:Array.isArray(e.hidden)?e.hidden:[]}}catch{return{posts:[],votes:{},hidden:[]}}}function fa(e){try{return localStorage.setItem(Yc,JSON.stringify(e)),!0}catch{return g("Local storage unavailable"),!1}}function gy(e,t,s,a){let i=e.posts.filter(r=>!e.hidden.includes(r.id)&&(s==="all"||r.topic===s));const n=r=>Object.entries(e.votes).reduce((o,c)=>o+(c[0].startsWith(r.id+":")&&Number(c[1])||0),0);return i.sort((r,o)=>{var c,d;return a==="top"?n(o)-n(r):a==="discussed"?(((c=o.replies)==null?void 0:c.length)||0)-(((d=r.replies)==null?void 0:d.length)||0):o.when-r.when}),i.length?i.map(r=>{var p;const o=((p=qs.find(m=>m[0]===r.topic))==null?void 0:p[1])||"Community",c=Array.isArray(r.replies)?r.replies:[],d=Number(e.votes[r.id+":"+((t==null?void 0:t.id)||"guest")])||0;return'<article class="pikk-forum-post"><div class="pikk-forum-votes"><button data-fvote="1" data-id="'+l(r.id)+'" aria-label="Upvote" aria-pressed="'+(d===1)+'" '+(t?"":"disabled")+">▲</button><b>"+n(r)+'</b><button data-fvote="-1" data-id="'+l(r.id)+'" aria-label="Downvote" aria-pressed="'+(d===-1)+'" '+(t?"":"disabled")+'>▼</button></div><div class="pikk-forum-post-content"><p class="pikk-forum-meta">'+l(o)+" · u/"+l(r.author)+" · local preview</p><h3>"+l(r.title)+'</h3><p class="pikk-forum-text">'+l(r.body)+'</p><button class="pikk-forum-reply-button" data-fopen="'+l(r.id)+'" aria-expanded="false" aria-controls="pikk-forum-thread-'+l(r.id)+'">▤ '+c.length+" replies</button> "+(t&&t.id!==r.owner?'<button class="pikk-forum-reply-button" data-freport="'+l(r.id)+'">◇ Hide / report locally</button>':"")+'<div class="pikk-forum-thread" id="pikk-forum-thread-'+l(r.id)+'" data-thread="'+l(r.id)+'" hidden>'+c.map(m=>'<p class="pikk-forum-comment"><strong>'+l(m.author)+"</strong> "+l(m.body)+"</p>").join("")+(t?'<form data-freply="'+l(r.id)+'"><label>Reply</label><textarea maxlength="1000" required rows="2" placeholder="Join the discussion"></textarea><button class="btn primary" type="submit">Reply · local</button></form>':'<a href="#/profile" class="btn ghost">Sign in to reply</a>')+"</div></div></article>"}).join(""):'<div class="pikk-forum-empty">No discussions yet. Start the first conversation on this browser.</div>'}function fy(){const e=P().user,t=qs.map(s=>'<button data-ftopic="'+s[0]+'" type="button" aria-pressed="false"><span>'+s[2]+"</span>"+l(s[1])+"</button>").join("");return L("PIKK Communities",'<section class="pikk-forum-hero"><p class="kicker">PIKK CONNECT · TOPICS & DISCUSSIONS</p><h2>Find your people. <span>Start the conversation.</span></h2><p>Explore communities around what matters to you. Discuss, upvote, reply and discover new ideas.</p><a class="btn ghost" href="#/community">PIKK Lounge</a> <a class="btn ghost" href="#/posts">Social Posts</a></section><p class="pikk-forum-warning"><b>TEST MODE:</b> These conversations and votes are saved only in this browser. No public posting, account verification or server-side moderation is active.</p><div id="pikkForum" class="pikk-forum-layout"><aside class="pikk-forum-sidebar"><h3>Explore topics</h3><button class="on" data-ftopic="all" aria-pressed="true">✦ All discussions</button>'+t+'</aside><main class="pikk-forum-center"><nav class="pikk-forum-sort" aria-label="Sort posts"><button class="on" data-fsort="new" aria-pressed="true">✦ New</button><button data-fsort="top" aria-pressed="false">▲ Top</button><button data-fsort="discussed" aria-pressed="false">▤ Discussed</button></nav><div class="pikk-forum-topic-board"><h3>Discover communities</h3><div class="pikk-forum-topic-cards">'+qs.map(s=>'<button data-ftopic="'+s[0]+'" aria-pressed="false"><span>'+s[2]+"</span><strong>"+l(s[1])+"</strong></button>").join("")+'</div></div><section class="pikk-forum-compose"><h3>Start a discussion</h3>'+(e?'<form id="pikkForumForm"><label for="pikkForumTopic">Community</label><select id="pikkForumTopic">'+qs.map(s=>'<option value="'+s[0]+'">'+l(s[1])+"</option>").join("")+'</select><label for="pikkForumTitle">Title</label><input id="pikkForumTitle" required maxlength="110" placeholder="What is on your mind?" /><label for="pikkForumBody">Discussion</label><textarea id="pikkForumBody" required maxlength="4000" rows="3" placeholder="Ask a question or share a thought..."></textarea><button class="btn primary" type="submit">Publish locally · TEST MODE</button></form>':'<p class="muted">Sign in with a PIKK demo account to write discussions and vote.</p><a href="#/profile" class="btn primary">Sign in</a>')+'</section><section><h3 class="pikk-forum-feed-title">Community discussions</h3><div id="pikkForumFeed"></div></section></main><aside class="pikk-forum-info"><h3>About PIKK Communities</h3><p>Topic-based discussion with an original PIKK look, separate from the live Lounge and social feed.</p><h3>Community safety</h3><p>Respect others. No harassment, hate, scams or personal information. Reports on this preview only hide posts on your device.</p><a href="#/guidelines">Community Guidelines</a></aside></div>',{lead:"Topic communities · discussions · voting · replies · local preview"})}function vy(e){const t=e.querySelector("#pikkForum");if(!t)return;let s="all",a="new";const i=()=>P().user,n=t.querySelector("#pikkForumFeed"),r=()=>{n.innerHTML=gy(Cs(),i(),s,a)},o=new URLSearchParams(location.hash.split("?")[1]||"").get("topic");sn.has(o)&&(s=o);function c(d,p,m){t.querySelectorAll(d).forEach(h=>{let f=h.dataset[p]===m;h.classList.toggle("on",f),h.setAttribute("aria-pressed",String(f))})}c("[data-ftopic]","ftopic",s),t.addEventListener("click",d=>{const p=d.target.closest("[data-ftopic]");if(p){s=p.dataset.ftopic,c("[data-ftopic]","ftopic",s);const b=t.querySelector("#pikkForumTopic");b&&s!=="all"&&(b.value=s),r();return}const m=d.target.closest("[data-fsort]");if(m){a=m.dataset.fsort,c("[data-fsort]","fsort",a),r();return}const h=d.target.closest("[data-fopen]");if(h){const b=t.querySelector('[data-thread="'+h.dataset.fopen+'"]');b&&(b.hidden=!b.hidden,h.setAttribute("aria-expanded",String(!b.hidden)));return}const f=d.target.closest("[data-fvote]");if(f&&i()){const b=Cs(),y=f.dataset.id+":"+i().id,k=Number(f.dataset.fvote);b.votes[y]=b.votes[y]===k?0:k,fa(b)&&r();return}const v=d.target.closest("[data-freport]");if(v&&i()){if(!confirm("Hide this post on this browser? This will NOT submit a report to a server."))return;const b=Cs();b.hidden.push(v.dataset.freport),fa(b)&&r(),g("Hidden locally only — no server report submitted")}}),t.addEventListener("submit",d=>{var m,h,f,v;const p=d.target;if(!(!(p instanceof HTMLFormElement)||!i())){if(d.preventDefault(),p.id==="pikkForumForm"){const b=As((m=p.querySelector("input"))==null?void 0:m.value),y=As((h=p.querySelector("textarea"))==null?void 0:h.value),k=(f=p.querySelector("select"))==null?void 0:f.value;if(!b||!y||!sn.has(k))return;const w=Cs();w.posts.push({id:"local-"+Date.now()+"-"+Math.random().toString(36).slice(2,8),owner:i().id,author:As(i().username).slice(0,30)||"Member",title:b,body:y,topic:k,when:Date.now(),replies:[]}),fa(w)&&(s=k,c("[data-ftopic]","ftopic",s),p.reset(),r(),g("Saved only on this browser · TEST MODE"))}else if(p.dataset.freply){const b=As((v=p.querySelector("textarea"))==null?void 0:v.value);if(!b)return;const y=Cs(),k=y.posts.find(w=>w.id===p.dataset.freply);if(!k)return;if(k.replies||(k.replies=[]),k.replies.push({author:As(i().username).slice(0,30)||"Member",body:b}),fa(y)){r();const w=t.querySelector('[data-thread="'+k.id+'"]'),x=t.querySelector('[data-fopen="'+k.id+'"]');w&&x&&(w.hidden=!1,x.setAttribute("aria-expanded","true"),x.focus()),g("Reply saved locally")}}}}),r()}function by(){const e=ue.filter(s=>(s.category||"")==="Music Videos"&&s.embed);return(e.length?e:ue.filter(s=>s.embed)).slice(0,10).map((s,a)=>({id:`clip_${s.id}`,videoId:s.id,title:s.title,artist:s.artist||"DatBoiSkeet",embed:s.embed,youtube:s.youtube,blurb:a%3===0?"Clip cut · DEMO":a%3===1?"Highlight · DEMO":"Short · DEMO"}))}function yy(e,t){return`
    <article class="shorts-card" data-clip-id="${l(e.id)}" id="shorts-card-${t}">
      <div class="shorts-stage">
        <div class="shorts-embed hero-video">
          <iframe
            src="${l(at(e.embed))}"
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
    </article>`}function ro(){const e=by(),s=`
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
      ${e.map(yy).join("")||'<p class="muted">No demo clips seeded.</p>'}
    </div>
    <p class="muted" style="margin:12px 0 0;font-size:12px;text-align:center">
      End of DEMO feed · ${e.length} clips · Scroll for more when real clip uploads ship
    </p>`;return L("Shorts / Clips",s,{lead:"Posts · short-form feed · Picture / Short / Video create on Posts · TEST MODE"})}function oo(e){oi(e),e.querySelectorAll(".shorts-card").forEach(t=>{t.addEventListener("focusin",()=>{t.classList.add("is-focus")})}),e.querySelector(".shorts-card")||g("No demo clips · add MVs in data.js")}const Fa=[{id:"ny",name:"NY",tag:"East coast",still:"/blockwars-preview/preview-ny-still.jpg",fighter:"Brooklyn Brawler",blurb:"Street-pressured power from the five boroughs. Heavy combos, tight corners — TEST MODE teaser only."},{id:"la",name:"LA",tag:"West coast",still:"/blockwars-preview/preview-la-still.jpg",fighter:"Sunset Striker",blurb:"Flashy footwork under neon skies. Style meets speed — Coming Soon, not a real match engine."},{id:"chi",name:"Chicago",tag:"Midwest",still:"/blockwars-preview/preview-chi-still.jpg",fighter:"Windy City Wall",blurb:"Defense-first grit from the lakefront. Hold the block — lobby demo only, no live fights yet."}];function ky(e){return Fa.map(t=>{const s=t.id===e?" is-active":"",a=t.id===e?"true":"false";return`<button type="button" class="bw-city-card${s}" data-city="${l(t.id)}" aria-pressed="${a}" aria-label="${l(t.name)} fighter"><img src="${l(t.still)}" alt="" width="120" height="160" loading="lazy" decoding="async" /><span class="bw-city-meta"><span class="bw-city-name">${l(t.name)}</span><span class="bw-city-tag">${l(t.tag)}</span></span></button>`}).join("")}function Sy(e){return`<div class="bw-focus" id="bwFocus" data-city="${l(e.id)}"><div class="bw-focus-still"><img id="bwFocusImg" src="${l(e.still)}" alt="${l(e.fighter)}" width="110" height="140" /></div><div class="bw-focus-copy"><p class="bw-focus-city">${l(e.name)} · ${l(e.tag)}</p><h3 id="bwFocusName">${l(e.fighter)}</h3><p id="bwFocusBlurb">${l(e.blurb)}</p></div></div>`}function wy(){const e=Fa[0],t=`
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
        ${ky(e.id)}
      </div>

      ${Sy(e)}

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
    </div>`;return L("Block Wars",t,{lead:"Coming Soon · lobby fighter select · preview video · not playable yet."})}function $y(e,t){const s=Fa.find(c=>c.id===t)||Fa[0];e.querySelectorAll(".bw-city-card").forEach(c=>{const d=c.getAttribute("data-city")===s.id;c.classList.toggle("is-active",d),c.setAttribute("aria-pressed",d?"true":"false")});const a=e.querySelector("#bwFocus"),i=e.querySelector("#bwFocusImg"),n=e.querySelector("#bwFocusName"),r=e.querySelector("#bwFocusBlurb"),o=e.querySelector(".bw-focus-city");a&&a.setAttribute("data-city",s.id),i&&(i.src=s.still,i.alt=s.fighter),n&&(n.textContent=s.fighter),r&&(r.textContent=s.blurb),o&&(o.textContent=`${s.name} · ${s.tag}`)}function Ey(e){var i,n;(i=e.querySelector("#bwCityGrid"))==null||i.addEventListener("click",r=>{const o=r.target.closest(".bw-city-card");o&&(r.preventDefault(),$y(e,o.getAttribute("data-city")))}),(n=e.querySelector("#bwEnterArena"))==null||n.addEventListener("click",r=>{r.preventDefault(),g("Block Wars arena is Coming Soon — lobby demo only. No match engine yet.")});const t=e.querySelector("#bwCsVideo"),s=e.querySelector("#bwCsPlay");if(!t)return;const a=()=>{if(!s)return;const r=t.paused||t.ended;s.hidden=!r,s.setAttribute("aria-hidden",r?"false":"true")};s==null||s.addEventListener("click",r=>{r.preventDefault(),t.play().catch(()=>{})}),t.addEventListener("play",()=>{is(),a()}),t.addEventListener("pause",()=>{it(),a()}),t.addEventListener("ended",()=>{it(),a()}),t.addEventListener("pointerdown",()=>{t.paused||is()}),a()}function xy(){return L("PIKK Arcade",`
    <section class="pikk-arcade-intro card" aria-label="PIKK Arcade">
      <div class="pikk-arcade-heading">
        <div>
          <p class="kicker">Play · Compete · Hang out</p>
          <div class="pikk-arcade-brand"><img src="${l(Gs({artwork:"/brand/pikk-logo-official.png"}))}" alt="PIKK" loading="eager" decoding="async"/><span>ARCADE</span></div>
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
      ${Ve.map((e,t)=>`
        <article class="pikk-arcade-card pikk-game-${l(e.theme)}">
          <div class="pikk-arcade-card-header"><span class="pikk-arcade-number">${t+1}</span><h3>${l(e.name)}</h3></div>
          <div class="pikk-arcade-art" aria-label="${l(e.name)} preview artwork">
            ${e.artwork?`<img src="${l(Gs(e))}" alt="${l(e.name)} concept artwork" loading="lazy" decoding="async"/>`:`<span class="pikk-arcade-symbol" aria-hidden="true">${e.icon}</span>`}
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
  `,{lead:"Fifteen upcoming games · mobile-first catalog · previews only"})}function Ay(e){const t=Ve.length,s=(Math.trunc(Number(e)||0)%t+t)%t,a=Ve[s];return{index:s,total:t,title:a.name,description:a.description,players:a.players,image:Gs(a)}}function Jc(e,t){const s=String(t||"").trim().toLowerCase();return!s||[e.name,e.description].join(" ").toLowerCase().includes(s)}function lo(e){return Ve.flatMap((t,s)=>Jc(t,e)?[s]:[])}function Cy(e){var y;const t=e.querySelector(".pikk-arcade-grid");if(!t)return;const s=e.querySelector("#pikkArcadeSearch");if(s){const k=[...((y=t.querySelectorAll)==null?void 0:y.call(t,".pikk-arcade-card"))||[]],w=e.querySelector("#pikkArcadeSearchClear"),x=e.querySelector("#pikkArcadeSearchStatus"),S=e.querySelector("#pikkArcadeNoMatches"),T=()=>{const _=s.value;let N=0;k.forEach(($,H)=>{const M=Jc(Ve[H],_);$.hidden=!M,M&&N++}),w&&(w.hidden=!_),S&&(S.hidden=N!==0),x&&(x.textContent=_.trim()?"Showing "+N+" of "+Ve.length+" games":"Showing all "+Ve.length+" games")};s.addEventListener("input",T),s.addEventListener("keydown",_=>{_.key!=="Escape"||!s.value||_.isComposing||(_.preventDefault(),s.value="",T())}),w==null||w.addEventListener("click",()=>{s.value="",T(),s.focus()}),T()}const a=e.querySelector("#pikkArcadeLightbox");if(!a||typeof a.showModal!="function")return;let i=0,n=null,r=lo("");const o=a.querySelector("[data-arcade-prev]"),c=a.querySelector("[data-arcade-next]"),d=a.querySelector("[data-arcade-full-image]"),p=a.querySelector("[data-arcade-title]"),m=a.querySelector("[data-arcade-description]"),h=a.querySelector("[data-arcade-players]"),f=a.querySelector("[data-arcade-counter]"),v=k=>{const w=Ay(k);i=w.index,d.src=w.image,d.alt=w.title+" concept artwork",p.textContent=w.title,m.textContent=w.description,h.textContent=w.players+(w.players==="1"?" Player · Preview only":" Players · Preview only"),f.textContent=String(r.indexOf(i)+1).padStart(2,"0")+" / "+String(r.length).padStart(2,"0")},b=k=>{const w=r.indexOf(i);if(w===-1||r.length<2)return;const x=(w+k+r.length)%r.length;v(r[x])};t.addEventListener("click",k=>{const w=k.target.closest("[data-game-preview]");if(!w)return;n=w;const x=Number(w.dataset.gamePreview);r=lo(s==null?void 0:s.value),r.includes(x)||(r=[x]),o&&(o.disabled=r.length<2),c&&(c.disabled=r.length<2),v(x),a.showModal()}),a.addEventListener("click",k=>{k.target===a||k.target.closest("[data-arcade-close]")?a.close():k.target.closest("[data-arcade-prev]")?b(-1):k.target.closest("[data-arcade-next]")&&b(1)}),a.addEventListener("keydown",k=>{(k.key==="ArrowLeft"||k.key==="ArrowRight")&&(k.preventDefault(),b(k.key==="ArrowRight"?1:-1))}),a.addEventListener("close",()=>{n!=null&&n.isConnected&&n.focus()})}function Ty(){return L("PIKK Dating & Connections",`
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
  `,{lead:"Dating · mutual matches · live connections"})}function My(e){const t=new Set(["dating-discover","dating-experiences","dating-live","dating-safety"]),s=[...e.querySelectorAll("[data-dating-jump]")];function a(n,r=!1){if(!t.has(n))return;const o=e.querySelector("#"+n);if(o&&(s.forEach(c=>{const d=c.dataset.datingJump===n;c.classList.toggle("is-active",d),c.setAttribute("aria-pressed",String(d))}),r)){const c=window.matchMedia("(prefers-reduced-motion: reduce)").matches;o.scrollIntoView({behavior:c?"auto":"smooth",block:"start"}),o.focus({preventScroll:!0})}}s.forEach(n=>n.addEventListener("click",()=>a(n.dataset.datingJump,!0)));const i=je().elementId;t.has(i)&&window.setTimeout(()=>{e.querySelector("#"+i)&&a(i,!0)},80)}const Qc=60,Dy=10,Py=10,co=3;function Ly(){return{phase:"round",round:1,seconds:Qc,votes:[0,0],scores:[0,0],roundWinners:[],gifts:[0,0],rematchVotes:[0,0],winner:null,tieBreaker:!1}}function Iy(e,t){if(e.phase!=="vote"||![0,1].includes(t))return e;const s=[...e.votes];return s[t]+=1,{...e,votes:s}}function Oy(e,t){if(e.phase!=="rematch")return e;const s=[...e.rematchVotes];return s[t?0:1]+=1,{...e,rematchVotes:s}}function _y(e){if(!["round","vote","rematch"].includes(e.phase))return e;if(e.seconds>1)return{...e,seconds:e.seconds-1};if(e.phase==="round")return{...e,phase:"vote",seconds:Dy,votes:[0,0],voted:!1};if(e.phase==="vote"){const t=e.votes[0]===e.votes[1]?null:e.votes[0]>e.votes[1]?0:1,s=[...e.scores];t!==null&&(s[t]+=1);const a=[...e.roundWinners,t];return e.round>=co&&s[0]!==s[1]?{...e,scores:s,roundWinners:a,winner:s[0]>s[1]?0:1,phase:"rematch",seconds:Py,rematchVoted:!1}:{...e,scores:s,roundWinners:a,phase:"round",round:e.round+1,seconds:Qc,votes:[0,0],voted:!1,tieBreaker:e.round>=co}}return{...e,phase:"finished",seconds:0}}let V=null,Ne=null;function va(){const e=document.getElementById("roast-demo");if(!e||!V){Ne&&clearInterval(Ne),Ne=null;return}const t=V.phase,s=t==="round"?`Round ${V.round}${V.tieBreaker?" · Final tiebreaker":""}`:t==="vote"?"Vote for the round winner":t==="rematch"?"Run It Back?":"Match finished";e.innerHTML=`<h3>${s}</h3><p><strong>${String(Math.floor(V.seconds/60)).padStart(2,"0")}:${String(V.seconds%60).padStart(2,"0")}</strong></p><p>Contestant A: ${V.scores[0]} rounds · Contestant B: ${V.scores[1]} rounds</p>${t==="vote"?'<button type="button" data-roast-vote="0">Vote A</button> <button type="button" data-roast-vote="1">Vote B</button>':""}${t==="rematch"?`<p>Winner: Contestant ${V.winner===0?"A":"B"}</p><button type="button" data-roast-rematch="yes">Run It Back? Yes</button> <button type="button" data-roast-rematch="no">No</button>`:""}<p class="muted">Local interactive simulation only. Votes are not shared between viewers. No live video or gifts are connected.</p>`}function qy(){Ne&&clearInterval(Ne),Ne=null,V=null;const e=document.getElementById("roast-start");e&&(e.addEventListener("click",()=>{V=Ly(),va(),Ne&&clearInterval(Ne),Ne=setInterval(()=>{V=_y(V),va(),V.phase==="finished"&&(clearInterval(Ne),Ne=null)},1e3)}),document.getElementById("roast-demo").addEventListener("click",t=>{const s=t.target.closest("[data-roast-vote]"),a=t.target.closest("[data-roast-rematch]");s&&V&&V.phase==="vote"&&!V.voted&&(V={...Iy(V,Number(s.dataset.roastVote)),voted:!0},va()),a&&V&&V.phase==="rematch"&&!V.rematchVoted&&(V={...Oy(V,a.dataset.roastRematch==="yes"),rematchVoted:!0},va())}))}function Ny(){return L("PIKK Roast Arena",`
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
  `,{lead:"Live comedy competitions · audience votes and gifts tracked separately"})}const Ps={instagram:"Instagram",tiktok:"TikTok",facebook:"Facebook",youtube:"YouTube",x:"X",snapchat:"Snapchat",other:"Other"};function Ry(e){return((e==null?void 0:e.path)||"")==="/refer"?"refer":"share"}function oe(e){K(e==="refer"?"#/refer":"#/share")}function Ue(){const{user:e}=P();if(e)return e;const t=os("DemoCreator");return g("Signed in as DemoCreator · local demo"),t||P().user}function By(e){const t=Number(e)-Date.now();if(t<=0)return"24h window ended (demo)";const s=Math.floor(t/36e5),a=Math.floor(t%36e5/6e4);return`${s}h ${a}m left`}function Ky(e){return`<div class="admin-type-tabs rewards-tabs" style="grid-template-columns:repeat(2,minmax(0,1fr));margin-bottom:14px" role="tablist">
    <a class="admin-type-tab ${e==="share"?"on":""}" href="#/share" role="tab" aria-selected="${e==="share"}">Share &amp; Earn</a>
    <a class="admin-type-tab ${e==="refer"?"on":""}" href="#/refer" role="tab" aria-selected="${e==="refer"}">Refer &amp; Earn</a>
  </div>`}function jy(){const{user:e}=P(),t=Q(),s=t.platformsLinked||[],a=t.challenge,i=t.submissions||[],n=t.rewardsClaimed||[],r=il(),o=nl(),c=ou(),d=s.length>0?`<ul class="list-plain">${s.map(y=>`<li>
          <span><strong>${l(Ps[y.platform]||y.platform)}</strong>
            ${y.handle?`<br/><span class="muted" style="font-size:12px">@${l(String(y.handle).replace(/^@+/,""))}</span>`:""}
            ${y.url?`<br/><span class="muted" style="font-size:11px">${l(y.url)}</span>`:""}
          </span>
          <button class="btn ghost" type="button" data-unlink="${l(y.id)}">Remove</button>
        </li>`).join("")}</ul>`:'<p class="muted" style="margin:0;font-size:13px">No platforms linked yet — optional. Never asked for social passwords.</p>',p=rr().filter(y=>!s.some(k=>k.platform===y)).map(y=>`<option value="${y}">${l(Ps[y]||y)}</option>`).join("");let m="";if(!a)m=`<div class="card">
      <h3>24-hour social challenge</h3>
      <p class="muted" style="margin:0 0 10px;font-size:13px">Optional promo · separate from paid Clippers. Post official DBS ad + tracked link · keep live 24h · manual/demo verification (not guaranteed auto-check).</p>
      <button class="btn primary" id="shStart" >Start challenge · TEST MODE</button>
    </div>`;else{const y=a.status==="active",k=Date.now()>=Number(a.endsAt);m=`<div class="card">
      <div class="row wrap" style="gap:8px;margin-bottom:8px">
        <span class="chip">${y?k?"Window ended · demo":"Active":"Ended"}</span>
        <span class="chip">TEST MODE</span>
        <span class="chip">${l(By(a.endsAt))}</span>
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
    </div>`}const h=rr().map(y=>`<option value="${y}">${l(Ps[y]||y)}</option>`).join(""),f=i.length>0?`<ul class="list-plain">${i.map(y=>`<li style="align-items:flex-start">
          <span style="flex:1;min-width:0">
            <strong>${l(Ps[y.platform]||y.platform)}</strong>
            <span class="chip">${l(y.status)}</span>
            <br/><a href="${l(y.postUrl)}" target="_blank" rel="noopener" style="font-size:13px;word-break:break-all">${l(y.postUrl)}</a>
            <br/><span class="muted" style="font-size:11px">${j(y.submittedAt)} · ${l(y.note||"")}</span>
          </span>
          ${y.status==="pending"?`<span class="row wrap" style="gap:4px">
                  <button class="btn" type="button" data-verify="${l(y.id)}">Verify · demo</button>
                  <button class="btn ghost" type="button" data-reject="${l(y.id)}">Reject</button>
                </span>`:""}
        </li>`).join("")}</ul>`:'<p class="muted" style="margin:0;font-size:13px">No post URLs submitted yet.</p>',v=c.map(y=>{const k=n.some(x=>x.tierId===y.id),w=o.some(x=>x.id===y.id);return`<tr style="border-top:1px solid rgba(255,255,255,.06)">
        <td style="padding:8px 4px"><strong>${l(y.label)}</strong><br/><span class="muted" style="font-size:11px">≥${y.minVerified} verified platform${y.minVerified===1?"":"s"}${y.requireAllLinked?" · all linked (≥3)":""}</span></td>
        <td style="padding:8px 4px">${k?'<span class="chip">Claimed</span>':w?`<button class="btn primary" type="button" data-claim-share="${l(y.id)}">Claim</button>`:`<span class="muted" style="font-size:12px">Locked (${r}/${y.minVerified})</span>`}</td>
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
        <span class="chip">Verified platforms: ${r}</span>
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

    ${a?`<div class="card">
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
      <p class="muted" style="margin:0 0 8px;font-size:13px">1 → badge · 2 → decoration · 3 → 7d PIKK+ · all linked (≥3) → 30d PIKK+. No auto paid billing.</p>
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <tbody>${v}</tbody>
        </table>
      </div>
      <h4 style="margin:16px 0 8px;font-size:14px">Claim history</h4>
      ${b}
    </div>
  `}function Fy(){const{user:e}=P(),t=ds(),s=rl(),a=t.invitees||[],i=ol(),n=ll(),r=fu(),o=t.milestonesClaimed||[],c=Kt(),d=r.find(v=>i<v.n),p=d?`${i} / ${d.n} verified active → ${d.label}`:i>=100?"All milestones unlocked":`${i} verified active`,m=a.length>0?`<ul class="list-plain">${a.map(v=>{const b=(v.activeDays||[]).length;return`<li style="align-items:flex-start">
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
          </li>`}).join("")}</ul>`:'<p class="muted" style="margin:0;font-size:13px">No invitees yet — simulate a signup or load demo referrals.</p>',h=r.map(v=>{const b=o.some(k=>k.milestoneId===v.id),y=n.some(k=>k.id===v.id);return`<tr style="border-top:1px solid rgba(255,255,255,.06)">
        <td style="padding:8px 4px"><strong>${v.n}</strong> verified active</td>
        <td style="padding:8px 4px">${l(v.label)}</td>
        <td style="padding:8px 4px">${b?'<span class="chip">Claimed</span>':y?`<button class="btn primary" type="button" data-claim-ref="${l(v.id)}">Claim</button>`:`<span class="muted" style="font-size:12px">${i}/${v.n}</span>`}</td>
      </tr>`}).join(""),f=o.length>0?`<ul class="list-plain">${o.map(v=>`<li>
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
        <li><span>3 days PIKK+</span><span class="chip">after 3 active days</span></li>
        <li><span>Extra 7 days PIKK+</span><span class="chip">7-day first-week streak</span></li>
      </ul>
      <p class="muted" style="margin:8px 0 0;font-size:12px">Invitee membership grants are illustrative chips in this demo; use Welcome perk + active days on each invitee card.</p>
    </div>
  `}function Gy(e){return Xc(e||{path:"/share"})}function Uy(e){return Xc(e||{path:"/refer"})}function Xc(e){const t=Ry(e),s=`
    ${Ky(t)}
    ${t==="refer"?Fy():jy()}
  `;return L("DBS Rewards",s,{lead:t==="refer"?"Refer & Earn · verified active friends · TEST MODE (§33).":"Share & Earn · 24h social promo · TEST MODE (§32)."})}function Hy(e){Zc(e,"share")}function Vy(e){Zc(e,"refer")}function Zc(e,t){var a,i,n,r,o,c,d,p,m,h,f,v,b;const s=t||(location.hash.includes("/refer")?"refer":"share");(a=e.querySelector("#rwSignIn"))==null||a.addEventListener("click",()=>{Ue(),oe(s)}),(i=e.querySelector("#shLinkForm"))==null||i.addEventListener("submit",y=>{var T,_,N;y.preventDefault(),Ue();const k=(T=e.querySelector("#shPlat"))==null?void 0:T.value,w=((_=e.querySelector("#shHandle"))==null?void 0:_.value)||"",x=((N=e.querySelector("#shUrl"))==null?void 0:N.value)||"",S=lu({platform:k,handle:w,url:x});if(S.error==="signin")return g("Sign in required");if(S.error==="already_linked")return g("Already linked");if(S.error==="required")return g("Handle or URL required");if(S.error)return g("Could not link");g(`Linked ${Ps[k]||k}`),oe("share")}),e.querySelectorAll("[data-unlink]").forEach(y=>{y.addEventListener("click",()=>{cu(y.getAttribute("data-unlink")),g("Platform removed"),oe("share")})}),(n=e.querySelector("#shStart"))==null||n.addEventListener("click",()=>{Ue();const y=du();if(y.error==="signin")return g("Sign in required");if(y.error==="already_active")return g("Challenge already active");if(y.error)return g("Could not start");g("Challenge started · 24h window"),oe("share")}),(r=e.querySelector("#shCopyLink"))==null||r.addEventListener("click",async()=>{var k;const y=((k=e.querySelector("#shTracked"))==null?void 0:k.value)||"";try{await navigator.clipboard.writeText(y),g("Tracked link copied")}catch{g("Copy manually")}}),(o=e.querySelector("#shCopyCaption"))==null||o.addEventListener("click",async()=>{var w;const k=((w=Q().challenge)==null?void 0:w.caption)||"";try{await navigator.clipboard.writeText(k),g("Caption copied")}catch{g("Copy manually")}}),(c=e.querySelector("#shSim24"))==null||c.addEventListener("click",()=>{if(pu().error)return g("No active challenge");g("Simulated 24h elapsed"),oe("share")}),(d=e.querySelector("#shEnd"))==null||d.addEventListener("click",()=>{uu(),g("Challenge ended"),oe("share")}),(p=e.querySelector("#shSubmitForm"))==null||p.addEventListener("submit",y=>{var S,T;y.preventDefault(),Ue();const k=(S=e.querySelector("#shSubPlat"))==null?void 0:S.value,w=((T=e.querySelector("#shSubUrl"))==null?void 0:T.value)||"",x=mu({platform:k,postUrl:w});if(x.error==="required")return g("Post URL required");if(x.error==="duplicate")return g("Already submitted for this platform");if(x.error==="no_challenge")return g("Start a challenge first");if(x.error)return g("Submit failed");g("Submitted · pending demo verification"),oe("share")}),e.querySelectorAll("[data-verify]").forEach(y=>{y.addEventListener("click",()=>{or(y.getAttribute("data-verify"),"verified"),g("Verified · demo (manual)"),oe("share")})}),e.querySelectorAll("[data-reject]").forEach(y=>{y.addEventListener("click",()=>{or(y.getAttribute("data-reject"),"rejected"),g("Rejected"),oe("share")})}),e.querySelectorAll("[data-claim-share]").forEach(y=>{y.addEventListener("click",()=>{Ue();const k=hu(y.getAttribute("data-claim-share"));if(k.error==="not_claimable")return g("Not claimable yet");if(k.error)return g("Claim failed");g(`Claimed · ${k.claim.label}`),oe("share")})}),(m=e.querySelector("#shReset"))==null||m.addEventListener("click",()=>{gu(),g("Share demo reset"),oe("share")}),(h=e.querySelector("#refCopy"))==null||h.addEventListener("click",async()=>{var k;Ue(),ds();const y=((k=e.querySelector("#refLink"))==null?void 0:k.value)||rl();try{await navigator.clipboard.writeText(y),g("Referral link copied")}catch{g("Copy manually")}}),(f=e.querySelector("#refInviteForm"))==null||f.addEventListener("submit",y=>{var x;y.preventDefault(),Ue();const k=((x=e.querySelector("#refInviteName"))==null?void 0:x.value)||"",w=vu({username:k});if(w.error==="self_referral")return g("Self-referral blocked");if(w.error==="signin")return g("Sign in required");if(w.error)return g("Could not add invitee");g(`Invitee ${w.invitee.username} signed up`),oe("refer")}),e.querySelectorAll("[data-welcome]").forEach(y=>{y.addEventListener("click",()=>{const k=bu(y.getAttribute("data-welcome"));if(k.error==="fraud")return g("Flagged fraud");if(k.error)return g("Welcome claim failed");g(k.perk||"Welcome perk claimed"),oe("refer")})}),e.querySelectorAll("[data-activeday]").forEach(y=>{y.addEventListener("click",()=>{const k=yu(y.getAttribute("data-activeday"));if(k.error==="fraud")return g("Flagged fraud");if(k.error==="outside_window")return g("Outside first-7-day window");if(k.error==="window_full")return g("All 7 demo days already marked");if(k.error)return g("Could not mark day");const w=(k.invitee.activeDays||[]).length;g(w>=3?`${k.invitee.username} → verified active (${w} days)`:`Active day ${w}/3 for ${k.invitee.username}`),oe("refer")})}),e.querySelectorAll("[data-fraud]").forEach(y=>{y.addEventListener("click",()=>{lr(y.getAttribute("data-fraud"),!0),g("Flagged as fraud · demo"),oe("refer")})}),e.querySelectorAll("[data-unfraud]").forEach(y=>{y.addEventListener("click",()=>{lr(y.getAttribute("data-unfraud"),!1),g("Fraud flag cleared"),oe("refer")})}),e.querySelectorAll("[data-claim-ref]").forEach(y=>{y.addEventListener("click",()=>{Ue();const k=ku(y.getAttribute("data-claim-ref"));if(k.error==="not_claimable")return g("Not claimable yet");if(k.error)return g("Claim failed");g(`Milestone claimed · ${k.claim.label}`),oe("refer")})}),(v=e.querySelector("#refSeed"))==null||v.addEventListener("click",()=>{Ue();const y=wu({force:!0});if(y.error==="signin")return g("Sign in required");g(`Loaded ${y.seeded||0} demo invitees`),oe("refer")}),(b=e.querySelector("#refReset"))==null||b.addEventListener("click",()=>{Ue(),Su(),g("Refer demo reset"),oe("refer")})}function zy(e){return{badge:`Phase ${e} shell`}}function po(e){return`
    <article class="card pikk-video-tile">
      <div class="hero-video" style="margin:0 0 10px">
        <iframe src="${l(at(e.embed))}" title="${l(e.title)}" allowfullscreen loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </div>
      <span class="chip">${l(e.category||"Music Videos")}</span>
      <h3 style="margin:8px 0 4px">${l(e.title)}</h3>
      <p class="muted" style="margin:0 0 8px">${l(e.artist||"DatBoiSkeet")}</p>
      <div class="row wrap">
        <a class="btn" href="${l(e.youtube)}" target="_blank" rel="noopener">Open on YouTube</a>
        <button class="btn ghost video-share" data-url="${l(e.youtube)}" data-title="${l(e.title)}">Share link</button>
      </div>
    </article>`}function Wy(){var c;const e=["Music Videos","Mixes","Interviews"],t={};ue.forEach(d=>{const p=d.category||"Music Videos";(t[p]||(t[p]=[])).push(d)});const s=e.filter(d=>{var p;return(p=t[d])==null?void 0:p.length}).map(d=>{const p=t[d].map(po).join("");return`<section class="pikk-video-section" data-video-category="${l(d)}"><h3>${l(d)}</h3><div class="pikk-video-grid">${p}</div></section>`}).join(""),a=Object.keys(t).filter(d=>!e.includes(d)).map(d=>`<section class="pikk-video-section" data-video-category="${l(d)}"><h3>${l(d)}</h3><div class="pikk-video-grid">${t[d].map(po).join("")}</div></section>`).join(""),i=qt({publishedOnly:!0,types:["video"]}),n=i.map(d=>{const p=d.youtube||"",m=d.embed||"";if(m||p){const h=m||"";return`<article class="card catalog-admin-video" data-id="${l(d.id)}">
          ${h?`<div class="hero-video" style="margin:0 0 10px"><iframe src="${l(at(h))}" title="${l(d.title)}" allowfullscreen loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>`:""}
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
      </article>`}).join(""),r={};cd.forEach(d=>{var p;(r[p=d.category]||(r[p]=[])).push(d)});const o=Object.entries(r).map(([d,p])=>`
      <div class="card pikk-video-coming-card" data-video-coming-category="${l(d)}">
        <h3>${l(d)}</h3>
        <p class="muted" style="margin:0 0 8px">No verified URLs in repo yet — titles from plan §9 only. No invented view counts.</p>
        <ul class="list-plain">${p.map(m=>`<li><span>${l(m.title)}</span><span class="chip">Coming Soon</span></li>`).join("")}</ul>
      </div>`).join("");return L("Videos & Interviews",`${lh()}
    <section class="pikk-video-hero card">
      <div class="pikk-video-hero-copy">
        <p class="kicker">PIKK VIDEOS · OFFICIAL RELEASES</p>
        <h2>Watch. Discover. Repeat.</h2>
        <p class="muted">Verified DatBoiSkeet music videos, mixes and interviews. Original YouTube playback, with no invented view counts.</p>
        <a class="btn primary" href="#/explore">Explore creators</a>
      </div>
      ${(c=ue[0])!=null&&c.youtube?`<a class="pikk-video-hero-preview" href="${l(ue[0].youtube)}" target="_blank" rel="noopener" aria-label="Watch ${l(ue[0].title)}">
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
      ${o}
    </section>`,{lead:"Official MVs · Mixes · Interviews · admin uploads."})}function Yy(e){var r;const t=[...e.querySelectorAll("[data-videos-filter]")],s=[...e.querySelectorAll(".pikk-video-section[data-video-category]")],a=[...e.querySelectorAll("[data-video-coming-category]")],i=e.querySelector(".pikk-video-coming-list"),n=e.querySelector("[data-video-filter-status]");t.forEach(o=>o.addEventListener("click",()=>{const c=o.dataset.videosFilter||"All";t.forEach(p=>{const m=p===o;p.classList.toggle("on",m),p.setAttribute("aria-pressed",m?"true":"false")}),s.forEach(p=>{const m=c==="All"||p.dataset.videoCategory===c;p.hidden=!m}),a.forEach(p=>{p.hidden=c!=="All"&&p.dataset.videoComingCategory!==c});const d=a.some(p=>!p.hidden);if(i&&(i.hidden=!d),n){const p=s.some(m=>!m.hidden);n.textContent=c==="All"?"Showing all video categories and upcoming titles.":p?`Showing ${c}${d?" and upcoming titles":""}.`:d?`No published ${c} videos yet. Upcoming titles are listed below.`:`No published ${c} videos yet.`}})),(r=e.querySelector(".pikk-video-filters"))==null||r.addEventListener("keydown",o=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(o.key))return;const c=t.indexOf(o.target);if(c<0||!t.length)return;o.preventDefault();const d=o.key==="Home"?0:o.key==="End"?t.length-1:(c+(o.key==="ArrowRight"?1:-1)+t.length)%t.length;t[d].focus(),t[d].click()}),oi(e),e.querySelectorAll("video.catalog-video").forEach(o=>{o.addEventListener("play",()=>is()),o.addEventListener("pause",()=>it()),o.addEventListener("ended",()=>it())}),e.querySelectorAll(".video-share").forEach(o=>{o.addEventListener("click",async()=>{const c=o.dataset.url||"";try{await navigator.clipboard.writeText(c),g("Link copied")}catch{g(c||"Copy failed")}})}),e.querySelectorAll("[data-idb-src]").forEach(async o=>{const c=(o.getAttribute("data-idb-src")||"").trim();if(c)try{const d=await li(c);if(!d){o.tagName==="VIDEO"&&o.insertAdjacentHTML("afterend",'<p class="muted" style="font-size:12px">Media blob missing — re-upload from Admin.</p>');return}if((o.tagName==="IMG"||o.tagName==="VIDEO"||o.tagName==="AUDIO")&&(o.setAttribute("src",d),o.src=d,o.tagName==="VIDEO"||o.tagName==="AUDIO")){o.setAttribute("playsinline",""),o.setAttribute("webkit-playsinline",""),o.controls=!0;try{o.load()}catch{}}}catch(d){console.warn("idb media hydrate failed",c,d)}})}function Jy(){const e=nn.map(a=>`<li class="pikk-tier" data-tier="${l(a.id)}"><span><strong>${l(a.name)}</strong><br/><small class="muted">${l(a.blurb||"")}</small></span><strong>$${a.price}/mo</strong><button type="button" class="btn primary pikk-join" data-join="${l(a.id)}">${a.id==="inner"?"Join":"Subscribe"}</button></li>`).join(""),t=P().creatorSellApps||[],s=t.length?`<ul class="list-plain" style="margin-top:10px">${t.slice(0,8).map(a=>`<li><span>${l(a.name)} · ${l(a.contact)} · ${l(a.sells)}</span><span class="chip">${l(a.status||"pending")}</span></li>`).join("")}</ul>`:'<p class="muted" style="margin:8px 0 0;font-size:12px">No applications on this device yet.</p>';return L("Pricing",`<div class="card">
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

    <div class="card" id="memberships"><h3>Memberships</h3><p class="pikk-member-status" data-member-status role="status">${l(Dn(Al()))}</p><ul class="list-plain">${e}</ul><div class="pikk-join-confirm" data-join-confirm hidden></div><p class="muted" style="font-size:12px">TEST MODE · no real charge. Billing starts when Stripe is live.</p></div>
     <div class="card"><h3>Music price ranges</h3>
       <ul class="list-plain">
         <li><span>Song</span><span>$0.99–$1.29</span></li>
         <li><span>EP</span><span>$4.99–$6.99</span></li>
         <li><span>Album</span><span>$9.99–$12.99</span></li>
       </ul>
       <p class="chip">TEST MODE · no charges</p>
     </div>`,{lead:"Sell music, videos, beats &amp; merch · rules &amp; fees · apply form · memberships &amp; gifts — admin-adjustable."})}function Qy(e){var s;ok(e||document),typeof location<"u"&&(location.hash.includes("focus=sell")||location.hash.includes("creator-sell"))&&setTimeout(()=>{var a;return(a=document.getElementById("creator-sell"))==null?void 0:a.scrollIntoView({behavior:"smooth",block:"start"})},60),(s=e.querySelector("#csSubmit"))==null||s.addEventListener("click",()=>{var c,d,p,m,h,f;const a=(d=(c=e.querySelector("#csName"))==null?void 0:c.value)==null?void 0:d.trim(),i=(m=(p=e.querySelector("#csContact"))==null?void 0:p.value)==null?void 0:m.trim(),n=((h=e.querySelector("#csSells"))==null?void 0:h.value)||"both",r=!!((f=e.querySelector("#csAgree"))!=null&&f.checked);if(!a||!i)return g("Name and email/handle required");if(!r)return g("Agree to rules & fees to continue");const o=Sd({name:a,contact:i,sells:n,agreed:r});if(o!=null&&o.error)return g(o.error==="rules"?"Agree to rules & fees to continue":"Name and email/handle required");g("Application saved · TEST MODE"),K("#/pricing?focus=sell")})}function Xy(){return L("Community Guidelines",`<div class="card">
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
    </div>`,{lead:"Rules for posts, chat, Live & Lounge — plan §13."})}const Ii=[{id:"dbs-lounge",cat:"NETWORK",hash:"#dbs-lounge",name:"PIKK Lounge",blurb:"Main hub · official announcements & network news",chip:"Hub"},{id:"conversation",cat:"NETWORK",hash:"#the-conversation",name:"The Conversation",blurb:"Public music & fan discussion threads",chip:"Public"},{id:"listening",cat:"VOICE / LISTENING",hash:"#listening-rooms",name:"Listening Rooms",blurb:"Listening parties & reactions to new releases",chip:"Parties"},{id:"backstage",cat:"MEMBERS",hash:"#backstage-rooms",name:"Backstage Rooms",blurb:"Tier-restricted spaces for PIKK+ / Backstage / Inner Circle",chip:"Members"},{id:"live-rooms",cat:"NETWORK",hash:"#live-rooms",name:"Live Rooms",blurb:"Scheduled community events & discussions",chip:"Events"},{id:"spotlight",cat:"NETWORK",hash:"#the-spotlight",name:"The Spotlight",blurb:"Featured fan conversations & creator posts",chip:"Featured"}],uo={"dbs-lounge":[{who:"PIKK · System",text:"Welcome to PIKK Lounge — DatBoiSkeet’s channel-style community hub.",tag:"DEMO"},{who:"TEST MODE",text:"Live chat isn’t connected yet. These rows are placeholders so the room pane feels real.",tag:"DEMO"}],conversation:[{who:"DEMO",text:"Drop takes on new releases here once Phase 2 chat ships.",tag:"DEMO"}],listening:[{who:"DEMO",text:"Listening parties will sync reactions here — preview only.",tag:"DEMO"}],backstage:[{who:"DEMO",text:"Member-tier rooms unlock with PIKK+ / Backstage / Inner Circle.",tag:"DEMO"}],"live-rooms":[{who:"DEMO",text:"Scheduled community events will list here — no live presence yet.",tag:"DEMO"}],spotlight:[{who:"DEMO",text:"Featured fan conversations land here in Phase 2.",tag:"DEMO"}]},Zy=[{name:"DatBoiSkeet",role:"Owner"},{name:"SkeetMod",role:"Mod · DEMO"},{name:"FanDemo01",role:"DEMO"},{name:"ListenerX",role:"DEMO"}];function ek(e){const s=(uo[e.id]||uo["dbs-lounge"]).map(a=>`<div class="lounge-msg">
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
  </div>`}function tk(){const e=[],t=new Set;Ii.forEach(n=>{t.has(n.cat)||(t.add(n.cat),e.push(n.cat))});const s=e.map(n=>{const r=Ii.filter(o=>o.cat===n).map(o=>`<button type="button" class="lounge-channel${o.id==="dbs-lounge"?" on":""}" data-channel="${l(o.id)}" aria-pressed="${o.id==="dbs-lounge"?"true":"false"}">
            <span class="lounge-hash">#</span>
            <span class="lounge-channel-label">${l(o.name)}</span>
            <span class="chip lounge-channel-chip">${l(o.chip)}</span>
          </button>`).join("");return`<div class="lounge-cat-block">
        <p class="lounge-cat-label">${l(n)}</p>
        ${r}
      </div>`}).join(""),a=Ii.map(ek).join(""),i=Zy.map(n=>`<li><span class="lounge-member-dot" aria-hidden="true"></span><span><strong>${l(n.name)}</strong><br/><span class="muted" style="font-size:11px">${l(n.role)}</span></span></li>`).join("");return L("PIKK Lounge",`<div class="card lounge-intro">
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
    </div>`,{lead:"Discord-inspired channels · DatBoiSkeet branded.",...zy(2)})}function sk(e=document){const t=e.querySelector("#loungeDiscord")||e,s=[...t.querySelectorAll(".lounge-channel")],a=[...t.querySelectorAll(".lounge-pane")];s.length&&s.forEach(i=>{i.addEventListener("click",()=>{const n=i.dataset.channel;s.forEach(r=>{const o=r===i;r.classList.toggle("on",o),r.setAttribute("aria-pressed",o?"true":"false")}),a.forEach(r=>{r.dataset.pane===n?r.removeAttribute("hidden"):r.setAttribute("hidden","")})})})}function ak(){return L("Signup & Creator Apps",`<div class="card">
      <p class="kicker">Join PIKK</p>
      <h2 style="margin:0 0 8px">Fan account first</h2>
      <p>Everyone creates a PIKK account to participate — follow, comment, save, join Lounge rooms, buy memberships, message the team, or apply to earn. Visitors can browse public promo pages; signing up unlocks the network.</p>
      <p class="muted" style="margin:8px 0 12px"><strong>Basic fan signup is free</strong> — no manual approval. This demo uses local Profile sign-in (TEST MODE · no real email/auth yet).</p>
      <a class="btn primary" href="#/profile">Sign in / create demo user</a>
      <a class="btn ghost" href="#/guidelines" style="margin-left:8px">Read Guidelines</a>
      <p class="muted" style="margin:10px 0 0;font-size:12px">By signing up you agree to the <a href="#/terms">Terms</a> (draft), including <a href="#/terms?s=security">Security &amp; Data Breach / Limitation of Liability</a>, and the <a href="#/privacy">Privacy</a> notice.</p>
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
    </div>`,{lead:"Free fan signup + creator role applications · §16."})}function ik(){const t=[{label:"Registration & role approval",status:"Demo",note:"Profile/signup local demo · real auth later"},{label:"Moderation / reporting / appeals",status:"TODO",note:"Guidelines copy ready · enforcement UI Phase 2"},{label:"Payments & refunds",status:"TEST",note:"TEST MODE only · no real charges"},{label:"Creator payouts verification",status:"SHELL",note:"Wallet / KYC stubs · not launch-ready"},{label:"Music & video rights",status:"Partial",note:"3 official MVs · streaming links still SHELL"},{label:"Gift-battle fraud prevention",status:"SHELL",note:"Gift Battles not wired for launch"},{label:"Livestream safety",status:"Demo",note:"Go-live demo PASS · age/safety stack incomplete"},{label:"Background audio pause/resume",status:"PARTIAL",note:"§17 sticky top YT player + pauseDbsPlayer hooks"},{label:"Account recovery / optional 2FA",status:"TODO",note:"Local demo sign-in only"},{label:"Loyalty analytics consent",status:"SHELL",note:"Privacy/consent controls before launch"},{label:"PIKK Connect safety (age + WebRTC)",status:"Blocked",note:"Must not launch without assurance"}].map(s=>`<li><span><strong>${l(s.label)}</strong><br/><span class="muted" style="font-size:12px">${l(s.note)}</span></span><span class="chip">${l(s.status)}</span></li>`).join("");return L("Launch Readiness",`<div class="card">
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
    </div>`,{lead:"Pre-launch checklist with honest demo status · §31."})}function nk(){const e=[{n:1,title:"Foundation",summary:"Videos, Music/Vault, Posts, profiles, followers, engagement alerts, Clippers applications.",status:"DONE",items:[{label:"§1 Posts",status:"DONE",href:"#/posts"},{label:"§2 Clippers apply",status:"DONE",href:"#/clippers"},{label:"§7 Profiles",status:"DONE",href:"#/profile"},{label:"§8 Music & Vault",status:"DONE",href:"#/music"},{label:"§9 Videos & Interviews",status:"DONE",href:"#/videos"},{label:"§14 Streaming links",status:"DONE",href:"#/music"},{label:"§19 Loading splash",status:"DONE",href:"#/home"},{label:"§20 Home dashboard",status:"DONE",href:"#/home"},{label:"§21 Merch showcase",status:"DONE",href:"#/merch"},{label:"§34 Coming Soon covers",status:"DONE",href:"#/music"},{label:"§17 Home MV + continuous play",status:"PARTIAL",href:"#/home",note:"Sticky top YT player · Stream Everywhere open links · PENDING AUDIT"}]},{n:2,title:"Growth & Creator Economy",summary:"Clipper campaigns, missions, referrals, creator earnings, and payouts.",status:"DONE",items:[{label:"§5 Creator Earnings",status:"DONE",href:"#/earnings"},{label:"§6 Missions",status:"DONE",href:"#/missions"},{label:"§27 Wallet & Payouts",status:"DONE",href:"#/wallet"},{label:"§32 Share & Earn",status:"DONE",href:"#/share"},{label:"§33 Refer & Earn",status:"DONE",href:"#/refer"},{label:"§10 Pricing",status:"DONE",href:"#/pricing"},{label:"§11 Admin dashboard",status:"DONE",href:"#/admin"},{label:"§16 Signup / Creator apps",status:"DONE",href:"#/signup"},{label:"§24 Explore",status:"DONE",href:"#/explore"},{label:"§25 Notifications",status:"DONE",href:"#/notifications"},{label:"§26 Fan Clubs",status:"DONE",href:"#/fanclubs"},{label:"§28 Loyalty Club",status:"DONE",href:"#/loyalty"},{label:"§22 Profile Shop cosmetics",status:"DONE",href:"#/shop",note:"Checker PASS · cosmetics demo"}]},{n:3,title:"Live & Marketplace",summary:"Creator livestreaming, gifts, donations, advertising, creator subscriptions, and Marketplace.",status:"DONE",items:[{label:"§3 Live",status:"DONE",href:"#/live"},{label:"§4 Marketplace ads",status:"DONE",href:"#/marketplace"},{label:"§18 Messages",status:"DONE",href:"#/messages"},{label:"§23 Gift Battles",status:"DONE",href:"#/giftbattles"},{label:"§29 Multi-Guest Live",status:"DONE",href:"#/multiguest"},{label:"§30 Open Mic",status:"DONE",href:"#/openmic"},{label:"§35 24/7 Spotlight",status:"DONE",href:"#/spotlight"},{label:"§36 Connect (opt-in shell)",status:"DONE",href:"#/connect"},{label:"§37 Restream + streamer tiers",status:"DONE",href:"#/restream"},{label:"§13 Guidelines",status:"DONE",href:"#/guidelines"},{label:"§15 Community / Lounge",status:"DONE",href:"#/community"},{label:"§31 Launch readiness",status:"DONE",href:"#/launch"}]}],t=a=>a==="DONE"?"chip chip-ok":a==="PARTIAL"?"chip chip-partial":a==="PENDING AUDIT"?"chip chip-audit":"chip",s=e.map(a=>{const i=a.items.map(n=>{const r=n.note?`<br/><span class="muted" style="font-size:12px">${l(n.note)}</span>`:"";return`<li><span>${n.href?`<a href="${l(n.href)}" style="color:inherit;text-decoration:none"><strong>${l(n.label)}</strong></a>`:`<strong>${l(n.label)}</strong>`}${r}</span><span class="${t(n.status)}">${l(n.status)}</span></li>`}).join("");return`<div class="card">
      <div class="row wrap" style="gap:8px;align-items:center;margin-bottom:8px">
        <span class="chip">Phase ${a.n}</span>
        <span class="${t(a.status)}">${l(a.status)}</span>
      </div>
      <h2 style="margin:0 0 6px">${l(a.title)}</h2>
      <p class="muted" style="margin:0 0 12px">${l(a.summary)}</p>
      <ul class="list-plain">${i}</ul>
    </div>`}).join(`

    `);return L("Development Phases",`<div class="card">
      <p class="kicker">Plan §12</p>
      <h2 style="margin:0 0 8px">Roadmap · what shipped vs remaining</h2>
      <p class="muted" style="margin:0">Phase 1–3 from the DatBoiSkeet developer plan. Chips mirror STATUS.md — <strong>DONE</strong> needs Checker PASS; <strong>PARTIAL</strong> and <strong>PENDING AUDIT</strong> are not launch-complete.</p>
      <p class="muted" style="margin:10px 0 0">Still open: <a href="#/home">§17 sticky player</a> (YT embed · no PIKK-hosted audio yet) · <a href="#/shop">§22 Profile Shop</a> (awaiting Checker) · identity/payout verification &amp; fraud controls before activating real money features.</p>
    </div>

    ${s}

    <div class="card">
      <h3>Before activating paid features</h3>
      <p class="muted" style="margin:0">Implement identity and payout verification, payment security, copyright controls, moderation, and fraud prevention before turning on real charges, gifts, or payouts. See <a href="#/launch">Launch Readiness</a>.</p>
    </div>`,{lead:"Phase 1 · Phase 2 · Phase 3 roadmap with live status chips · §12."})}function rk(e){return L("Not found",`<div class="card"><p>No page for <code>${l(e)}</code>.</p><a class="btn" href="#/home">Home</a></div>`)}function ok(e){const t=e.querySelector("[data-join-confirm]");t&&e.querySelectorAll("[data-join]").forEach(s=>s.addEventListener("click",()=>{const a=nn.find(i=>i.id===s.dataset.join);a&&(t.hidden=!1,t.innerHTML=`<div role="dialog" aria-modal="false" aria-labelledby="joinH" class="pikk-join-dialog"><h4 id="joinH">Join ${l(a.name)} · $${a.price}/mo</h4><p>TEST MODE: no card is charged. Your choice is saved on this device; billing starts when Stripe is live.</p><button type="button" class="btn primary" data-join-ok="${l(a.id)}">Confirm ${l(a.name)}</button> <button type="button" class="btn ghost" data-join-cancel>Cancel</button></div>`,t.querySelector("[data-join-ok]").addEventListener("click",()=>{const i=pm(a);e.querySelector("[data-member-status]").textContent=Dn(i),t.hidden=!0,t.innerHTML=""}),t.querySelector("[data-join-cancel]").addEventListener("click",()=>{t.hidden=!0,t.innerHTML=""}))}))}function lk(){return L("Create on PIKK",`<div class="pikk-create-page">${ed()}
    <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · uploads depend on available prototype tools</p></div>`)}const ck={"/home":{render:Ih,bind:Oh},"/create":{render:lk},"/promote":{render:lg,bind:cg},"/donate":{render:dg,bind:pg},"/payments":{render:mg,bind:hg},"/story":{render:Eg,bind:Cg},"/crew":{render:wg,bind:xg},"/favorites":{render:$g,bind:Ag},"/updates":{render:Nh,bind:Rh},"/posts":{render:ig,bind:ng},"/music":{render:Or,bind:_r},"/ai-artists":{render:Rg,bind:Bg},"/shield":{render:Vg,bind:zg},"/support":{render:af,bind:nf},"/vault":{render:Or,bind:_r},"/merch":{render:rf,bind:of},"/profile":{render:lf,bind:cf},"/clippers":{render:pf,bind:uf},"/videos":{render:Wy,bind:Yy},"/live":{render:uv,bind:fv},"/viral-live":{render:kv,bind:Sv},"/explore":{render:rb,bind:ob},"/marketplace":{render:Ev,bind:xv},"/earnings":{render:Uv,bind:Hv},"/missions":{render:Yv,bind:Jv},"/pricing":{render:Jy,bind:Qy},"/admin":{render:Zh,bind:eg},"/guidelines":{render:Xy},"/settings":{render:Cl,bind:Tl},"/contest":{render:ur,bind:mr},"/contest/twerk":{render:ur,bind:mr},"/community":{render:tk,bind:sk},"/communities":{render:fy,bind:vy},"/signup":{render:ak},"/terms":{render:rd,bind:ld},"/privacy":{render:od},"/messages":{render:qv,bind:Nv},"/shop":{render:Zb,bind:ey},"/profile-shop":{render:Vb,bind:zb},"/giftbattles":{render:bb,bind:yb},"/notifications":{render:Rv,bind:Bv},"/fanclubs":{render:Ob,bind:_b},"/wallet":{render:jv,bind:Fv},"/loyalty":{render:qb,bind:Nb},"/multiguest":{render:Db,bind:Pb},"/openmic":{render:Bb,bind:Kb},"/launch":{render:ik},"/phases":{render:nk},"/share":{render:Gy,bind:Hy},"/refer":{render:Uy,bind:Vy},"/spotlight":{render:py,bind:uy},"/restream":{render:()=>(queueMicrotask(()=>{location.hash="/connect#connect-multistream"}),en()),bind:tn},"/shorts":{render:ro,bind:oo},"/clips":{render:ro,bind:oo},"/connect":{render:en,bind:tn},"/blockwars":{render:wy,bind:Ey},"/games":{render:xy,bind:Cy},"/dating":{render:Ty,bind:My},"/roast-arena":{render:Ny,bind:qy}};function Vn(){var t,s,a;const e=document.getElementById("tabbar");if(P().user)try{mn()}catch{}e.innerHTML=rn.map(i=>{const r="/"+i.href.replace(/^#/,"").replace(/^\//,"").split(/[?#]/)[0],o=l(i.label);return`<a${i.primary?' class="tab-primary"':""} href="${i.href}" data-path="${r}" aria-label="${o}"${i.href==="#/create"?' aria-haspopup="dialog" aria-controls="pikkCreateMenu" aria-expanded="false"':i.href==="#/music"?' aria-haspopup="dialog" aria-controls="pikkMusicMenu" aria-expanded="false"':Us[r.slice(1)]?` aria-haspopup="dialog" aria-controls="pikk${o}Menu" aria-expanded="false"`:""}><span class="tab-ico">${i.href==="#/create"?`<img class="pikk-create-logo-icon" src="${ut("/brand/pikk-logo-badge.png")}" alt="" width="40" height="29" decoding="async" />`:Ns[i.icon]||""}</span><span>${o}</span></a>`}).join("");for(const i of Object.keys(Us))(t=e.querySelector(`a[href="#/${i}"]`))==null||t.addEventListener("click",n=>{n.preventDefault(),Sm(i,n.currentTarget)});(s=e.querySelector('a[href="#/music"]'))==null||s.addEventListener("click",i=>{i.preventDefault(),It(),xm(i.currentTarget)}),(a=e.querySelector('a[href="#/create"]'))==null||a.addEventListener("click",i=>{var r;Ds(),It(),i.preventDefault();const n=dk();n.hidden=!n.hidden,i.currentTarget.setAttribute("aria-expanded",String(!n.hidden)),n.hidden||(r=n.querySelector("[data-create-close]"))==null||r.focus()}),e.style.gridTemplateColumns="",e.classList.remove("tabbar-scroll"),e.classList.add("tabbar-reshaped","tabbar-fit7")}function ed(){return Il.map(e=>{const t=e.items.map(s=>{const a=`<span class="pikk-menu-icon" aria-hidden="true">${Ns[s.icon]||Ns.explore}</span><strong class="pikk-menu-title">${l(s.title)}</strong><small>${l(s.detail)}</small>`;return s.href?`<a href="${l(s.href)}" class="pikk-create-tile">${a}</a>`:`<div class="pikk-create-tile pikk-create-tile-planned" aria-disabled="true">${a}</div>`}).join("");return`<section class="pikk-create-menu-group" aria-label="${l(e.title)}"><h3>${l(e.title)}</h3><div class="pikk-create-options pikk-create-grid">${t}</div></section>`}).join("")}const td=()=>{const e=(location.hash.replace(/^#/,"")||"/home").split(/[?#]/)[0];document.querySelectorAll(".pikk-explore-rail a").forEach(t=>{t.getAttribute("href").slice(1)===e?t.setAttribute("aria-current","page"):t.removeAttribute("aria-current")})};window.addEventListener("hashchange",td);td();function dk(){let e=document.getElementById("pikkCreateMenu");if(e)return e;e=document.createElement("div"),e.id="pikkCreateMenu",e.className="pikk-create-overlay",e.hidden=!0,e.innerHTML=`<div class="pikk-create-sheet" role="dialog" aria-modal="true" aria-label="Create on PIKK">
    <div class="pikk-create-head"><strong>Create on PIKK</strong><button type="button" class="btn ghost" data-create-close aria-label="Close create menu">✕</button></div>
    ${ed()}
    <button type="button" class="pikk-menu-cancel" data-create-close>Cancel</button>
    <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · uploads depend on available prototype tools</p>
  </div>`,document.body.appendChild(e);const t=(s=!1)=>{e.hidden=!0;const a=document.querySelector('#tabbar a[href="#/create"]');a==null||a.setAttribute("aria-expanded","false"),s&&(a==null||a.focus())};return window.addEventListener("hashchange",()=>t()),e.addEventListener("click",s=>{s.target===e||s.target.closest("[data-create-close]")?t(!0):s.target.closest(".pikk-create-options a")&&t()}),document.addEventListener("keydown",s=>{if(!e.hidden&&(s.key==="Escape"&&(s.preventDefault(),t(!0)),s.key==="Tab")){const a=[...e.querySelectorAll("a[href], button:not([disabled])")],i=a[0],n=a[a.length-1];if(!i){s.preventDefault();return}e.contains(document.activeElement)?s.shiftKey&&document.activeElement===i?(s.preventDefault(),n.focus()):!s.shiftKey&&document.activeElement===n&&(s.preventDefault(),i.focus()):(s.preventDefault(),(s.shiftKey?n:i).focus())}}),e}function pk(){const e=document.getElementById("tabbar");if(!e)return;Vn();const t=je();Zl(e,t.path);try{sd()}catch{}}function uk(){const e=document.getElementById("sideNav"),t=je(),s="#"+(t.raw||t.path),a="#"+t.path,i=Om().map(n=>{if(n.href)return`<a class="drawer-direct${n.href===a||n.href===s?" on":""}" href="${n.href}">${l(n.label)}</a>`;const r=n.links||[],o=r.some(m=>m.href===a||m.href===s),c=o?" open":"",d=o?" has-active":"",p=r.map(m=>m.href?`<a class="drawer-link${m.href===a||m.href===s?" on":""}" href="${m.href}">${l(m.label)}</a>`:`<span class="drawer-link drawer-soon" aria-disabled="true">${l(m.label)} <small>· ${l(/planned/i.test(m.detail||"")?"Planned":"Coming Soon")}</small></span>`).join("");return`<div class="drawer-group${c}${d}" data-group="${l(n.id)}"><button type="button" class="drawer-cat" aria-expanded="${o?"true":"false"}"><span>${l(n.label)}</span><span class="drawer-caret" aria-hidden="true"></span></button><div class="drawer-children" role="group">${p}</div></div>`}).join("");e.innerHTML=`<h2 class="drawer-brand"><img src="${ut("/brand/pikk-logo-official.png")}" alt="" width="140" height="33" decoding="async" /><span>PIKK Network</span></h2>${i}`}function Ls(e,t=!1){sh({drawer:document.getElementById("sideNav"),scrim:document.getElementById("scrim"),trigger:document.getElementById("menuBtn")},e,t)}function mk(e){const t=e.path;Vn(),Zl(document.getElementById("tabbar"),t),document.querySelectorAll("#sideNav a").forEach(n=>{const r=n.getAttribute("href")||"";n.classList.toggle("on",r==="#"+t||r==="#"+e.raw)});const s="#"+t,a="#"+e.raw;document.querySelectorAll("#sideNav .drawer-group").forEach(n=>{const r=[...n.querySelectorAll("a")].some(c=>c.getAttribute("href")===s||c.getAttribute("href")===a);n.classList.toggle("open",r),n.classList.toggle("has-active",r);const o=n.querySelector(".drawer-cat");o&&o.setAttribute("aria-expanded",r?"true":"false")});const i=document.getElementById("headerMsg");if(i&&(i.hidden=!1),P().user)try{mn()}catch{}sd()}function sd(){const e=document.getElementById("headerMsgBadge"),t=document.getElementById("headerMsg");if(!e||!t)return;let s=0;try{s=dt()}catch{s=0}if(s>0){const a=s>99?"99+":String(s);e.textContent=a,e.hidden=!1,t.setAttribute("aria-label",`Messages, ${s} unread`)}else e.textContent="",e.hidden=!0,t.setAttribute("aria-label","Messages")}function hk(e){var i;Ls(!1);const t=document.getElementById("app"),s=ck[e.path],a=s?s.render(e):rk(e.path);t.innerHTML=a,Xl(t),(i=s==null?void 0:s.bind)==null||i.call(s,t),Fl(t),mk(e),th(e,t,document.getElementById("pikkRouteAnnouncer")),Vm(e.path),window.scrollTo(0,0),(e.path==="/music"||e.path==="/vault")&&(location.hash.includes("vault")||e.path==="/vault")&&setTimeout(()=>{var n;return(n=document.getElementById("vault"))==null?void 0:n.scrollIntoView({behavior:"smooth"})},50),e.path==="/pricing"&&(location.hash.includes("focus=sell")||location.hash.includes("creator-sell"))&&setTimeout(()=>{var n;return(n=document.getElementById("creator-sell"))==null?void 0:n.scrollIntoView({behavior:"smooth",block:"start"})},50),e.path==="/wallet"&&(e.elementId==="wallet-coins"||e.query.section==="coins"||location.hash.includes("wallet-coins"))&&setTimeout(()=>{var n;return(n=document.getElementById("wallet-coins"))==null?void 0:n.scrollIntoView({behavior:"smooth",block:"start"})},50),e.path==="/live"&&(e.query.go==="1"||e.elementId==="live-go"||location.hash.includes("go=1"))&&setTimeout(()=>{var n;return(n=document.getElementById("live-go"))==null?void 0:n.scrollIntoView({behavior:"smooth",block:"start"})},50)}function gk(){if(new URLSearchParams(location.search).has("holdSplash"))return;const e=document.getElementById("splash");!e||e.classList.contains("hide")||(e.classList.add("hide"),wd(),setTimeout(()=>e.remove(),hm))}function fk(){if(!ss().splashChime)return;const e=document.getElementById("splashChime");if(!e)return;const t=()=>{const a=e.play();a&&typeof a.catch=="function"&&a.catch(()=>{})};t();const s=()=>{t(),window.removeEventListener("pointerdown",s),window.removeEventListener("keydown",s)};window.addEventListener("pointerdown",s,{once:!0}),window.addEventListener("keydown",s,{once:!0})}function vk(){window.addEventListener("dbs:interrupt-music",e=>{var s;const t=((s=e==null?void 0:e.detail)==null?void 0:s.reason)||"route";ta(t)}),window.addEventListener("dbs:resume-music",e=>{var s;const t=(s=e==null?void 0:e.detail)==null?void 0:s.reason;t==="live"?Wl():t==="video"?it():zl(t)})}function bk(){window.addEventListener("dbs:messages-unread",()=>{try{pk()}catch{}})}function yk(){var e;if((e=document.getElementById("pikkSkipContent"))==null||e.addEventListener("click",()=>{var t;(t=document.getElementById("app"))==null||t.focus()}),vo(),Xl(document),Vn(),uk(),Hm(),vk(),bk(),document.getElementById("menuBtn").addEventListener("click",()=>Ls(!0)),document.getElementById("scrim").addEventListener("click",()=>Ls(!1,!0)),document.addEventListener("keydown",t=>{var s;t.key!=="Escape"||!((s=document.getElementById("sideNav"))!=null&&s.classList.contains("open"))||(t.preventDefault(),Ls(!1,!0))}),document.getElementById("sideNav").addEventListener("click",t=>{const s=t.target.closest(".drawer-cat");if(s){t.preventDefault();const a=s.closest(".drawer-group"),i=!a.classList.contains("open");document.querySelectorAll("#sideNav .drawer-group").forEach(n=>{const r=i&&n===a;n.classList.toggle("open",r);const o=n.querySelector(".drawer-cat");o&&o.setAttribute("aria-expanded",r?"true":"false")});return}t.target.closest("a")&&Ls(!1)}),document.getElementById("notifBtn").addEventListener("click",()=>{location.hash="/notifications"}),Xm(hk),Zm(),El(),(!$d()||!ss().showSplash)&&!new URLSearchParams(location.search).has("holdSplash")){const t=document.getElementById("splash");t&&t.remove()}else{setTimeout(()=>fk(),gm);let t=!1;setTimeout(()=>{t||(t=!0,gk())},mm)}}yk();const zn=".pikk-menu-planned, .pikk-create-tile-planned, .drawer-soon, .pikk-notif-planned, [data-coming-soon]";function ad(e){var s,a;const t=(((s=e.querySelector(".pikk-menu-title, strong"))==null?void 0:s.textContent)||((a=e.firstChild)==null?void 0:a.textContent)||"").trim();g(t?`${t} · Coming Soon`:"Coming Soon")}document.addEventListener("click",e=>{var s,a;const t=(a=(s=e.target).closest)==null?void 0:a.call(s,zn);t&&(e.preventDefault(),ad(t))});document.addEventListener("keydown",e=>{var s,a;if(e.key!=="Enter"&&e.key!==" ")return;const t=(a=(s=e.target).closest)==null?void 0:a.call(s,zn);t&&(e.preventDefault(),ad(t))});new MutationObserver(()=>{document.querySelectorAll(zn).forEach(e=>{e.hasAttribute("tabindex")||(e.setAttribute("tabindex","0"),e.setAttribute("role","button"))})}).observe(document.body,{childList:!0,subtree:!0});document.addEventListener("click",e=>{var s,a;const t=(a=(s=e.target).closest)==null?void 0:a.call(s,".pikk-home-circle-strip .pikk-home-circle");t&&Pn("story:"+(t.getAttribute("href")||t.textContent.trim()),{kind:"story",opened:!0,source:t.closest("[data-promoted]")?"promote":"organic"})});
