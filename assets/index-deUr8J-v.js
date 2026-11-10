(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(i){if(i.ep)return;i.ep=!0;const n=s(i);fetch(i.href,n)}})();function ac(e,t=Date.now()){const s=new URL(e);return s.searchParams.set("refresh",String(t)),s.toString()}var sc;(sc=document.getElementById("pikk-refresh-link"))==null||sc.addEventListener("click",function(e){e.preventDefault(),window.location.assign(ac(window.location.href))});let ko;function f(e){const t=document.getElementById("toast");t&&(t.textContent=e,t.classList.add("show"),clearTimeout(ko),ko=setTimeout(()=>t.classList.remove("show"),2400))}function l(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function G(e){const t=Math.max(0,Math.floor((Date.now()-e)/1e3));if(t<60)return t+"s";const s=Math.floor(t/60);if(s<60)return s+"m";const a=Math.floor(s/60);return a<24?a+"h":Math.floor(a/24)+"d"}function M(e,t,s={}){let a="";if(s.badgeHtml)a=s.badgeHtml;else if(s.badge){const n=l(s.badge),o=s.badgeAria?` aria-label="${l(s.badgeAria)}"`:"",r=s.badgeTitle||s.badgeAria?` title="${l(s.badgeTitle||s.badgeAria)}"`:"";s.badgeHref?a=`<a class="badge-phase"${o}${r} href="${l(s.badgeHref)}">${n}</a>`:a=`<span class="badge-phase"${o}${r}>${n}</span>`}const i=s.lead?`<p class="lead">${s.lead}</p>`:"";return`
    <section class="page">
      <header class="page-head">
        <h1>${l(e)} ${a}</h1>
        ${i}
      </header>
      ${t}
    </section>
  `}const ya={heart:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.5c0 4.6-8.8 10.4-8.8 10.4S3.2 13.1 3.2 8.5a4.5 4.5 0 0 1 8.8-1.2 4.5 4.5 0 0 1 8.8 1.2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',home:'<svg viewBox="0 0 24 24"><path d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5z" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',posts:'<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 10h8M8 14h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',camera:'<svg viewBox="0 0 24 24"><path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h2.1l1.2-1.8A1.5 1.5 0 0 1 11 3.5h2a1.5 1.5 0 0 1 1.2.7L15.4 6h2.1A2.5 2.5 0 0 1 20 8.5v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-8z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="12.5" r="3.2" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',music:'<svg viewBox="0 0 24 24"><path d="M9 18V6l10-2v12" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="7" cy="18" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="16" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',merch:'<svg viewBox="0 0 24 24"><path d="M6 8h12l1 12H5L6 8zm3-3a3 3 0 0 1 6 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',explore:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m20 20-3.5-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',live:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" fill="currentColor"/><circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.2" opacity=".5"/></svg>',profile:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 19a7 7 0 0 1 14 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',videos:'<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10 9.5v5l5-2.5-5-2.5z" fill="currentColor"/></svg>',chat:'<svg viewBox="0 0 24 24"><path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v5A2.5 2.5 0 0 1 16.5 14H11l-3.5 3v-3H7.5A2.5 2.5 0 0 1 5 11.5v-5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 17.5V19a1 1 0 0 0 1.5.85L14 17h2.5" fill="none" stroke="currentColor" stroke-width="1.6" opacity=".55"/></svg>',msg:'<svg viewBox="0 0 24 24"><rect x="3.5" y="6" width="17" height="12" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m4.5 7.5 7.5 5.2L19.5 7.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',game:'<svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="11" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 13h2.5M9.25 11.5v3M15.2 12.2h.01M17.3 14.2h.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M9 8V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V8" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>'};function yt(e,t="rel=0"){const s=String(e||"").trim();if(!s)return"";const a=s.includes("?")?"&":"?";return`${s}${a}${t}`}const rp="#/terms?s=security",op="PIKK uses reasonable measures to protect your information, but no system is 100% secure. To the fullest extent permitted by law, PIKK and its owners are not liable for damages resulting from unauthorized access, hacking, or data breaches beyond our reasonable control. If a breach affects your data, we will notify you as required by law.",Fn='<span class="chip pikk-legal-draft">Draft — pending legal review</span>';function lp(){return M("Terms",`
    <div class="card"><p class="kicker">PIKK Terms of Service</p>${Fn}<p>Full Terms ship before public launch. See also <a href="#/guidelines">Community Guidelines</a> and <a href="#/privacy">Privacy</a>.</p></div>
    <section class="card pikk-legal-section" id="terms-security" aria-labelledby="terms-security-h">
      <h2 id="terms-security-h">Security &amp; Data Breach / Limitation of Liability</h2>${Fn}
      <p>${op}</p>
    </section>`,{badge:"DRAFT"})}function cp(){return M("Privacy",`
    <div class="card"><p class="kicker">PIKK Privacy</p>${Fn}<p>TEST MODE: most data in this demo stays on your device. The full Privacy Policy ships before public launch.</p>
    <p><a href="${rp}">Security &amp; Data Breach / Limitation of Liability</a></p></div>`,{badge:"DRAFT"})}function dp(){typeof location<"u"&&/[?&]s=security\b/.test(location.hash)&&setTimeout(()=>{var e;return(e=document.getElementById("terms-security"))==null?void 0:e.scrollIntoView({block:"start"})},50)}const fe=[{id:"dirty-money",title:"Dirty Money ft. Lil Baby",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=-rHDLWfiuDI",embed:"https://www.youtube.com/embed/-rHDLWfiuDI"},{id:"93",title:"93 ft. DaBaby",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=zC0BYFxs5W0",embed:"https://www.youtube.com/embed/zC0BYFxs5W0"},{id:"no-love",title:"No Love ft. YFN Lucci",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=6pCVEIE9pB8",embed:"https://www.youtube.com/embed/6pCVEIE9pB8"},{id:"bouquet",title:"Bouquet",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=DTe4OiX2otg",embed:"https://www.youtube.com/embed/DTe4OiX2otg"},{id:"where-im-from",title:"Where I'm From ft. Tee Grizzley",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=BH7_Ttk86eQ",embed:"https://www.youtube.com/embed/BH7_Ttk86eQ"},{id:"gang-ties",title:"Gang Ties",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=0ikbrk901Kc",embed:"https://www.youtube.com/embed/0ikbrk901Kc"},{id:"go-2-work",title:"Go 2 Work",artist:"DatBoiSkeet",category:"Music Videos",featured:!0,youtube:"https://www.youtube.com/watch?v=gRq8c2i4ESM",embed:"https://www.youtube.com/embed/gRq8c2i4ESM"},{id:"ramen-noodles",title:"Ramen Noodles",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=YNCdtAC273M",embed:"https://www.youtube.com/embed/YNCdtAC273M"},{id:"men-in-blacc",title:"Men In Blacc",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=MKyw-hzxQWY",embed:"https://www.youtube.com/embed/MKyw-hzxQWY"},{id:"king-city",title:"King City",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=wyNJYUqpRFM",embed:"https://www.youtube.com/embed/wyNJYUqpRFM"},{id:"in-her-bag",title:"In Her Bag",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=Dux8rm-pzRg",embed:"https://www.youtube.com/embed/Dux8rm-pzRg"},{id:"lonely",title:"Lonely",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=IVnDjPJ8dRg",embed:"https://www.youtube.com/embed/IVnDjPJ8dRg"},{id:"they-aint-coming-home",title:"They Ain't Coming Home",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=Yi4uBFkn0-o",embed:"https://www.youtube.com/embed/Yi4uBFkn0-o"},{id:"mind-on-a-licc",title:"Mind On A Licc",artist:"DatBoiSkeet",category:"Music Videos",youtube:"https://www.youtube.com/watch?v=sADinuRcRr4",embed:"https://www.youtube.com/embed/sADinuRcRr4"},{id:"dbs-mix",title:"DatBoiSkeet Mix",artist:"DatBoiSkeet",category:"Mixes",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t",embed:"https://www.youtube.com/embed/videoseries?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t",openLink:"https://www.youtube.com/playlist?list=RDEMDYIvPhQWVGU3Zf3gcxT_4w"},{id:"on-the-radar",title:"On The Radar Interview — Talk of The Town",artist:"DatBoiSkeet",category:"Interviews",youtube:"https://www.youtube.com/watch?v=6IFiHo5HrdE",embed:"https://www.youtube.com/embed/6IFiHo5HrdE"}],fr=[{id:"dbs-mix",title:"DatBoiSkeet Mix",blurb:"Official channel Music Videos playlist embed (stable). YouTube Radio Mix link kept as Play on YouTube — RD mixes often fail to embed.",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t",embed:"https://www.youtube.com/embed/videoseries?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t",openLink:"https://www.youtube.com/playlist?list=RDEMDYIvPhQWVGU3Zf3gcxT_4w",source:"channel-pl-music-videos + user-t96u openLink"}],Un=[{id:"pl-music-videos",title:"DatBoiSkeet Music Videos",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQERro-n6XWI2ECIC4crgf4t"},{id:"pl-interviews",title:"DatBoiSkeet Interviews",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQHoRjRTD58TpLGqm0XMsa7U"},{id:"pl-vlogs",title:"DatBoiSkeet Vlogs",youtube:"https://www.youtube.com/playlist?list=PLC6_HdjaVaQEqroQ8LYGLgpDfzK3pyutQ"}],up=[{category:"Interviews",title:"Off The Porch (no verified DatBoiSkeet YouTube URL yet — add via Admin)"},{category:"Behind the Scenes",title:"BTS clips (coming soon)"},{category:"Exclusive Videos",title:"Vault / member exclusives (coming soon)"}],ke={youtube:"https://www.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA",youtubeHandle:"https://www.youtube.com/@DatBoiSkeet1",youtubeMusic:"https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA",spotify:"https://open.spotify.com/artist/0Po64h8VleQOR97okM68zh",apple:"https://music.apple.com/us/artist/datboiskeet/1270542870"},vt=[{id:"stream-dirty-money",title:"Dirty Money (feat. Lil Baby)",artist:"DatBoiSkeet",type:"single",year:2018,albumNote:"From Broke Is the Root of All Evil",cover:"https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2a/7a/67/2a7a676e-af85-489e-55fd-2bae2793948b/datboiskeet-bitroae-cover-3000px.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/track/17Pw88uBIWpgOVCfhEyszG",apple:"https://music.apple.com/us/song/dirty-money-feat-lil-baby/1395681218",youtubeMusic:"https://music.youtube.com/watch?v=-rHDLWfiuDI",youtube:"https://www.youtube.com/watch?v=-rHDLWfiuDI"}},{id:"stream-93",title:"93 (feat. DaBaby)",artist:"DatBoiSkeet",type:"single",year:2019,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/19/60/5f/19605f4c-7014-6dbc-ca18-baa2a672c697/194923194110.png/600x600bb.jpg",links:{spotify:"https://open.spotify.com/track/3gKwZybDOkUoz2wXquDHVZ",apple:"https://music.apple.com/us/album/93-feat-da-baby-single/1493456214",youtubeMusic:"https://music.youtube.com/watch?v=zC0BYFxs5W0",youtube:"https://www.youtube.com/watch?v=zC0BYFxs5W0"}},{id:"stream-no-love",title:"No Love (feat. YFN Lucci)",artist:"DatBoiSkeet",type:"single",year:2017,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/49/e5/62/49e56292-e427-3992-84bd-ead0b06fb06a/artwork.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/track/2KqnCXMM0lAMlEv1fDN63o",apple:"https://music.apple.com/us/album/no-love-feat-yfn-lucci-single/1317778810",youtubeMusic:"https://music.youtube.com/watch?v=6pCVEIE9pB8",youtube:"https://www.youtube.com/watch?v=6pCVEIE9pB8"}},{id:"stream-broke",title:"Broke Is the Root of All Evil",artist:"DatBoiSkeet",type:"album",year:2018,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2a/7a/67/2a7a676e-af85-489e-55fd-2bae2793948b/datboiskeet-bitroae-cover-3000px.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/album/51j6ReXYreCDV0ZwtPdj1Q",apple:"https://music.apple.com/us/album/broke-is-the-root-of-all-evil/1395680910",youtubeMusic:"https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA"}},{id:"stream-talk",title:"Talk of the Town",artist:"DatBoiSkeet",type:"album",year:2020,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/f6/0d/a0/f60da0bf-c3de-8b12-5cd8-e8c1d3c2053b/artwork.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/album/4OY5rM0TBPDsC4n8Dka4Gr",apple:"https://music.apple.com/us/album/talk-of-the-town/1541180619",youtubeMusic:"https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA"}},{id:"stream-said-you-love-me",title:"Said You Love Me",artist:"DatBoiSkeet",type:"single",year:2025,cover:"https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/f4/4f/6b/f44f6b18-dff9-0486-e6e6-a615724e02fe/artwork.jpg/600x600bb.jpg",links:{spotify:"https://open.spotify.com/album/7FhoRIzhuGgmt2pZlWMc5c",apple:"https://music.apple.com/us/album/said-you-love-me-single/1835164001",youtubeMusic:"https://music.youtube.com/channel/UCA2GGwQ-cOUW0ZqmWaGzEBA"}}],Es=[{id:"long-story-short",title:"Long Story Short",artist:"DatBoiSkeet",cover:"/music/01_Long_Story_Short_Coming_Soon.jpg",status:"Coming Soon",order:1},{id:"ladies-only",title:"Ladies Only",artist:"DatBoiSkeet",cover:"/music/02_Ladies_Only_Coming_Soon.jpg",status:"Coming Soon",order:2}],pp=[{id:"vault-long-story-short",title:"Long Story Short (Vault Preview)",artist:"DatBoiSkeet",cover:"/music/01_Long_Story_Short_Coming_Soon.jpg",tier:"skeet+",status:"Coming Soon"},{id:"vault-ladies-only",title:"Ladies Only (Vault Exclusive)",artist:"DatBoiSkeet",cover:"/music/02_Ladies_Only_Coming_Soon.jpg",tier:"backstage",status:"Coming Soon"}],wo=[{id:"long-story-short",title:"Long Story Short",artist:"DatBoiSkeet",cover:"/music/01_Long_Story_Short_Coming_Soon.jpg",price:1.29,status:"Coming Soon"},{id:"ladies-only",title:"Ladies Only",artist:"DatBoiSkeet",cover:"/music/02_Ladies_Only_Coming_Soon.jpg",price:1.29,status:"Coming Soon"}],Re=[{id:"hat-716-orange",name:"716 Buffalo Braves Snapback (Black/Orange)",price:30,category:"Hats",image:"/merch/01_black_orange_716_hat.jpeg",shopUrl:"https://foreignx-change.com"},{id:"hat-716-blue",name:"716 Buffalo Hat (Blue/Red)",price:30,category:"Hats",image:"/merch/02_blue_red_716_hat.jpeg",shopUrl:"https://foreignx-change.com"},{id:"jacket-blue",name:"Buffalo Sports Varsity Jacket (Blue/White)",price:200,category:"Jackets",image:"/merch/03_blue_buffalo_jacket.jpeg",shopUrl:"https://foreignx-change.com"},{id:"jacket-black",name:"Foreign X-Change Buffalo Varsity (Black/White)",price:200,category:"Jackets",image:"/merch/07_black_buffalo_jacket.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-fx-back",name:"Foreign X-Change Graphic Tee (Back)",price:65,category:"Shirts",image:"/merch/04_black_fx_tee_back_screenshot.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-fx-front",name:"Foreign X-Change Text Tee (Front)",price:65,category:"Shirts",image:"/merch/05_black_fx_tee_front_screenshot.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-ptsd",name:"PTSD Tee (Black)",price:65,category:"Shirts",image:"/merch/06_black_ptsd_tee.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-abstract",name:"Abstract FX Tee (White)",price:65,category:"Shirts",image:"/merch/08_white_abstract_fx_tee.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-dealer",name:"Support Your Local Dealer Tee (Navy)",price:65,category:"Shirts",image:"/merch/09_navy_dealer_tee.jpeg",shopUrl:"https://foreignx-change.com"},{id:"tee-skulls",name:"Skulls FX Tee (White)",price:65,category:"Shirts",image:"/merch/10_white_skulls_tee.jpeg",shopUrl:"https://foreignx-change.com"}],ii=[{id:"frame-chrome-crown",name:"Chrome Crown",category:"frames",rarity:"legendary",price:12.99,emoji:"👑"},{id:"frame-iced-out",name:"Iced Out",category:"frames",rarity:"epic",price:9.99,emoji:"💎"},{id:"frame-trap-flame",name:"Trap Flame",category:"frames",rarity:"epic",price:7.99,emoji:"🔥"},{id:"frame-rodeo-gold",name:"Rodeo Gold",category:"frames",rarity:"rare",price:5.99,emoji:"🤠"},{id:"frame-rose-petals",name:"Rose Petals",category:"frames",rarity:"rare",price:4.99,emoji:"🌹"},{id:"fx-bass-pulse",name:"Bass Pulse",category:"effects",rarity:"epic",price:8.99,emoji:"🎵"},{id:"fx-snowfall",name:"Snowfall",category:"effects",rarity:"rare",price:5.99,emoji:"❄️"},{id:"fx-city-lights",name:"City Lights",category:"effects",rarity:"epic",price:7.99,emoji:"🌃"},{id:"fx-holo-glitch",name:"Holographic Glitch",category:"effects",rarity:"legendary",price:14.99,emoji:"✨"},{id:"ban-skyline",name:"City Skyline",category:"banners",rarity:"rare",price:4.99,emoji:"🏙️"},{id:"ban-studio",name:"Studio Booth",category:"banners",rarity:"rare",price:4.99,emoji:"🎙️"},{id:"ban-arena",name:"Arena Lights",category:"banners",rarity:"epic",price:6.99,emoji:"🏟️"},{id:"ban-chrome",name:"Luxury Chrome",category:"banners",rarity:"legendary",price:11.99,emoji:"🪞"},{id:"name-chrome",name:"Chrome Name",category:"name styles",rarity:"epic",price:6.99,emoji:"🅰️"},{id:"name-neon",name:"Neon Name",category:"name styles",rarity:"rare",price:3.99,emoji:"💜"},{id:"name-varsity",name:"Bold Varsity",category:"name styles",rarity:"rare",price:3.99,emoji:"🏟️"},{id:"name-western",name:"Western Script",category:"name styles",rarity:"epic",price:5.99,emoji:"🏜️"},{id:"badge-dayone",name:"Day One (cosmetic style)",category:"badges",rarity:"rare",price:2.99,emoji:"1️⃣"},{id:"badge-topfan",name:"Top Fan (cosmetic style)",category:"badges",rarity:"epic",price:4.99,emoji:"⭐"},{id:"badge-backstage",name:"Backstage Glow",category:"badges",rarity:"epic",price:5.99,emoji:"🎫"}],mp=[{id:"all",label:"All"},{id:"frames",label:"Frames"},{id:"effects",label:"Effects"},{id:"banners",label:"Banners"},{id:"name styles",label:"Name styles"},{id:"badges",label:"Badges"}],Ki=[{id:"skeet",name:"PIKK+",price:3.99,blurb:"Early releases · basic Vault"},{id:"backstage",name:"Backstage",price:7.99,blurb:"Deeper Vault · studio lives · listening rooms"},{id:"inner",name:"Inner Circle",price:12.99,blurb:"VIP drops · private Q&As · Inner Circle rooms"}],hp=[{label:"Long Story Short",src:"/music/01_Long_Story_Short_Coming_Soon.jpg"},{label:"Ladies Only",src:"/music/02_Ladies_Only_Coming_Soon.jpg"},{label:"716 Orange Hat",src:"/merch/01_black_orange_716_hat.jpeg"},{label:"716 Blue Hat",src:"/merch/02_blue_red_716_hat.jpeg"},{label:"Blue Jacket",src:"/merch/03_blue_buffalo_jacket.jpeg"},{label:"PTSD Tee",src:"/merch/06_black_ptsd_tee.jpeg"}],fp=[{route:"/explore",title:"Explore",blurb:"Discover DatBoiSkeet · creators · drops"},{route:"/music",title:"Music",blurb:"Long Story Short · Ladies Only · Vault"},{route:"/videos",title:"Videos",blurb:"Official music videos"},{route:"/posts",title:"Posts",blurb:"Text · Picture · Short · Video"},{route:"/shorts",title:"Shorts",blurb:"Under Posts · quick clips"},{route:"/live",title:"Live",blurb:"Go live · TEST MODE demo"},{route:"/shop",title:"PIKK Shop",blurb:"Foreign X-Change merch · external checkout"},{route:"/community",title:"PIKK Lounge",blurb:"Artist-owned rooms · Phase 2"},{route:"/music",title:"Vault",blurb:"Member exclusives · Coming Soon",hash:"vault"},{route:"/marketplace",title:"Marketplace",blurb:"Brand ads & sponsored offers"},{route:"/missions",title:"Missions",blurb:"Clipper promo campaigns"},{route:"/clippers",title:"Clippers",blurb:"Apply · cut clips · earn"}],ic=[{id:"home",label:"Home",href:"#/home"},{id:"explore",label:"Explore",href:"#/explore"},{id:"profile",label:"Profile / Sign in",href:"#/profile"},{id:"watch",label:"Watch",links:[{href:"#/videos",label:"Videos"},{href:"#/live",label:"Live"},{href:"#/openmic",label:"Open Mic / Talent Discovery (24/7)"},{href:"#/spotlight",label:"Spotlight (24/7)"},{href:"#/multiguest",label:"Multi-Guest Live"}]},{id:"music",label:"Music",links:[{href:"#/music",label:"Music & Vault"}]},{id:"social",label:"Social",links:[{href:"#/posts",label:"Posts"},{href:"#/posts?compose=1",label:"Post · Text / Picture / Short / Video"},{href:"#/shorts",label:"Shorts (in Posts)"},{href:"#/notifications",label:"Notifications"},{href:"#/connect",label:"Connect"},{href:"#/dating",label:"Dating & Connections"},{href:"#/community",label:"Community / Lounge"}]},{id:"messages",label:"Messages",href:"#/messages"},{id:"games",label:"Games",links:[{href:"#/games",label:"PIKK Arcade · 15 Games Coming Soon"},{href:"#/blockwars",label:"Block Wars · Coming Soon"}]},{id:"shop",label:"Shop",links:[{href:"#/merch",label:"Foreign X-Change Merch"},{href:"#/marketplace",label:"Marketplace"},{href:"#/shop",label:"PIKK Shop"},{href:"#/profile-shop",label:"Profile Shop · cosmetics"}]},{id:"earn",label:"Creators & Earnings",links:[{href:"#/wallet",label:"Wallet"},{href:"#/earnings",label:"Creator Earnings"},{href:"#/missions",label:"Missions"},{href:"#/clippers",label:"Clippers Apply"},{href:"#/share",label:"Share & Earn"},{href:"#/refer",label:"Refer & Earn"},{href:"#/pricing",label:"Pricing (rules & fees)"}]},{id:"account",label:"Account",links:[{href:"#/profile",label:"Profile"},{href:"#/signup",label:"Signup / Creator Apps"},{href:"#/loyalty",label:"Loyalty Club"},{href:"#/fanclubs",label:"Fan Clubs"},{href:"#/guidelines",label:"Community Guidelines"}]},{id:"studio",label:"Studio / Owner",links:[{href:"#/admin",label:"Admin"},{href:"#/phases",label:"Development Phases"},{href:"#/launch",label:"Launch Readiness"}]}];ic.flatMap(e=>e.href?[{href:e.href,label:e.label}]:e.links||[]);const gr=[{href:"#/music",label:"Music",icon:"music"},{href:"#/videos",label:"Videos",icon:"videos"},{href:"#/connect",label:"Connect",icon:"profile"},{href:"#/create",label:"Create",icon:"live",primary:!0},{href:"#/dating",label:"Dating",icon:"heart"},{href:"#/games",label:"Games",icon:"game"},{href:"#/shop",label:"Shop",icon:"merch"}],nc={DEV:!1,VITE_PIKK_API_BASE:"https://pikk-api.pikk-0fa.workers.dev"},rc="dbs_v1",ha=()=>({user:null,profiles:{dbs:{id:"dbs",username:"DatBoiSkeet",bio:"Official DatBoiSkeet · Long Story Short & Ladies Only Coming Soon · Vault · Foreign X-Change",avatar:"/brand/pikk-logo-square.png",followers:[],following:[],verified:!0}},posts:[],comments:{},likes:{},clipperApps:[],creatorSellApps:[],brandApps:[],listings:[],live:null,liveHistory:[],liveSongRequests:[],coins:{balance:0,history:[]},liveGiftLedger:[],liveGbChallengePop:null,threads:{},demoUnreadSeeded:!1,messagePrefs:{allowDMs:!0,allowRequests:!0},notifications:{releases:!0,lives:!0,messages:!0,quietHours:!1},wallet:{balance:0,history:[]},creatorWallet:{available:0,holds:0,threshold:25,verification:"demo_unverified",earnings:[],payouts:[]},catalog:[],missions:[],giftBattles:{active:null,history:[],champions:[],prefs:{invitationsEnabled:!0}},multiGuest:{active:null,history:[]},spotlight:{nowPlaying:null,queue:[],history:[],houseIndex:0},fanClubs:{clubs:[],posts:{},seeded:!1},shareEarn:{platformsLinked:[],challenge:null,submissions:[],rewardsClaimed:[]},referEarn:{code:"",invitees:[],milestonesClaimed:[]},restream:{platforms:{},selected:[],session:null,history:[],ingest:null,campaign:{tier:null,status:"none",enrolledAt:null,cancelledAt:null},campaignConfig:null},loyalty:{points:0,history:[],badges:[],publicVisible:!0,lastActionAt:{},dayCounts:{}},openMic:{applications:[],seeded:!1,houseIndex:0},profileShop:{owned:[],equipped:{},reduceMotion:!1},hotFeed:{lives:[],posts:[],seededLives:!1,seededPosts:!1,seededPostsVer:0},engagementAlerts:[],engagementAlertThresholds:{postScore:10,commentCount:5},postShares:{},splashSeenAt:0,dailyGoals:{app:null,liveByHost:{},history:[]}});function gp(){var e,t,s,a,i,n,o,r,c,d,u,p,h,g,v,b,y,k,S,$,w,C,P,q,E,V,A,N,j,I,R,O,F,J,B,H,me,W,Z,Q,de,Oe,Et,hs,Ht,zt,ae,xe,T,Ae,Ws;try{const Ys=localStorage.getItem(rc);if(!Ys)return ha();const x=JSON.parse(Ys),re=ha();return{...re,...x,profiles:{...re.profiles,...x.profiles||{}},notifications:{...re.notifications,...x.notifications||{}},wallet:{...re.wallet,...x.wallet||{}},creatorWallet:{...re.creatorWallet,...x.creatorWallet||{},earnings:Array.isArray((e=x.creatorWallet)==null?void 0:e.earnings)?x.creatorWallet.earnings:[],payouts:Array.isArray((t=x.creatorWallet)==null?void 0:t.payouts)?x.creatorWallet.payouts:[],available:Number((s=x.creatorWallet)==null?void 0:s.available)||0,holds:Number((a=x.creatorWallet)==null?void 0:a.holds)||0,threshold:Number((i=x.creatorWallet)==null?void 0:i.threshold)>0?Number(x.creatorWallet.threshold):25,verification:((n=x.creatorWallet)==null?void 0:n.verification)==="demo_verified"?"demo_verified":"demo_unverified"},brandApps:x.brandApps||[],listings:Array.isArray(x.listings)?x.listings:[],live:x.live??null,liveHistory:Array.isArray(x.liveHistory)?x.liveHistory:[],liveSongRequests:Array.isArray(x.liveSongRequests)?x.liveSongRequests:[],coins:{balance:Number((o=x.coins)==null?void 0:o.balance)||0,history:Array.isArray((r=x.coins)==null?void 0:r.history)?x.coins.history:[]},liveGiftLedger:Array.isArray(x.liveGiftLedger)?x.liveGiftLedger:[],liveGbChallengePop:x.liveGbChallengePop||null,threads:{...x.threads||{}},demoUnreadSeeded:!!x.demoUnreadSeeded,messagePrefs:{...re.messagePrefs,...x.messagePrefs||{}},catalog:Array.isArray(x.catalog)?x.catalog:[],missions:Array.isArray(x.missions)?x.missions:[],giftBattles:{...re.giftBattles,...x.giftBattles||{},history:Array.isArray((c=x.giftBattles)==null?void 0:c.history)?x.giftBattles.history:[],champions:Array.isArray((d=x.giftBattles)==null?void 0:d.champions)?x.giftBattles.champions:[],prefs:{...re.giftBattles.prefs,...((u=x.giftBattles)==null?void 0:u.prefs)||{}},active:((p=x.giftBattles)==null?void 0:p.active)??null},multiGuest:{...re.multiGuest,...x.multiGuest||{},history:Array.isArray((h=x.multiGuest)==null?void 0:h.history)?x.multiGuest.history:[],active:((g=x.multiGuest)==null?void 0:g.active)??null},fanClubs:{...re.fanClubs,...x.fanClubs||{},clubs:Array.isArray((v=x.fanClubs)==null?void 0:v.clubs)?x.fanClubs.clubs:[],posts:(b=x.fanClubs)!=null&&b.posts&&typeof x.fanClubs.posts=="object"?x.fanClubs.posts:{},seeded:!!((y=x.fanClubs)!=null&&y.seeded)},shareEarn:{...re.shareEarn,...x.shareEarn||{},platformsLinked:Array.isArray((k=x.shareEarn)==null?void 0:k.platformsLinked)?x.shareEarn.platformsLinked:[],challenge:((S=x.shareEarn)==null?void 0:S.challenge)??null,submissions:Array.isArray(($=x.shareEarn)==null?void 0:$.submissions)?x.shareEarn.submissions:[],rewardsClaimed:Array.isArray((w=x.shareEarn)==null?void 0:w.rewardsClaimed)?x.shareEarn.rewardsClaimed:[]},referEarn:{...re.referEarn,...x.referEarn||{},code:typeof((C=x.referEarn)==null?void 0:C.code)=="string"?x.referEarn.code:"",invitees:Array.isArray((P=x.referEarn)==null?void 0:P.invitees)?x.referEarn.invitees:[],milestonesClaimed:Array.isArray((q=x.referEarn)==null?void 0:q.milestonesClaimed)?x.referEarn.milestonesClaimed:[]},restream:{...re.restream,...x.restream||{},platforms:(E=x.restream)!=null&&E.platforms&&typeof x.restream.platforms=="object"?x.restream.platforms:{},selected:Array.isArray((V=x.restream)==null?void 0:V.selected)?x.restream.selected:[],session:((A=x.restream)==null?void 0:A.session)??null,history:Array.isArray((N=x.restream)==null?void 0:N.history)?x.restream.history:[],ingest:((j=x.restream)==null?void 0:j.ingest)??null,campaign:{...re.restream.campaign,...((I=x.restream)==null?void 0:I.campaign)||{}},campaignConfig:((R=x.restream)==null?void 0:R.campaignConfig)??null},loyalty:{...re.loyalty,...x.loyalty||{},points:Number((O=x.loyalty)==null?void 0:O.points)||0,history:Array.isArray((F=x.loyalty)==null?void 0:F.history)?x.loyalty.history:[],badges:Array.isArray((J=x.loyalty)==null?void 0:J.badges)?x.loyalty.badges:[],publicVisible:((B=x.loyalty)==null?void 0:B.publicVisible)===void 0?!0:!!x.loyalty.publicVisible,lastActionAt:(H=x.loyalty)!=null&&H.lastActionAt&&typeof x.loyalty.lastActionAt=="object"?x.loyalty.lastActionAt:{},dayCounts:(me=x.loyalty)!=null&&me.dayCounts&&typeof x.loyalty.dayCounts=="object"?x.loyalty.dayCounts:{}},openMic:{...re.openMic,...x.openMic||{},applications:Array.isArray((W=x.openMic)==null?void 0:W.applications)?x.openMic.applications:[],seeded:!!((Z=x.openMic)!=null&&Z.seeded),houseIndex:typeof((Q=x.openMic)==null?void 0:Q.houseIndex)=="number"?x.openMic.houseIndex:0},profileShop:{...re.profileShop,...x.profileShop||{},owned:Array.isArray((de=x.profileShop)==null?void 0:de.owned)?x.profileShop.owned:[],equipped:(Oe=x.profileShop)!=null&&Oe.equipped&&typeof x.profileShop.equipped=="object"?x.profileShop.equipped:{},reduceMotion:!!((Et=x.profileShop)!=null&&Et.reduceMotion)},hotFeed:{...re.hotFeed,...x.hotFeed||{},lives:Array.isArray((hs=x.hotFeed)==null?void 0:hs.lives)?x.hotFeed.lives:[],posts:Array.isArray((Ht=x.hotFeed)==null?void 0:Ht.posts)?x.hotFeed.posts:[],seededLives:!!((zt=x.hotFeed)!=null&&zt.seededLives),seededPosts:!!((ae=x.hotFeed)!=null&&ae.seededPosts),seededPostsVer:Number((xe=x.hotFeed)==null?void 0:xe.seededPostsVer)||0},engagementAlerts:Array.isArray(x.engagementAlerts)?x.engagementAlerts:[],postShares:x.postShares&&typeof x.postShares=="object"?x.postShares:{},creatorSellApps:Array.isArray(x.creatorSellApps)?x.creatorSellApps:[],dailyGoals:{...re.dailyGoals,...x.dailyGoals||{},app:((T=x.dailyGoals)==null?void 0:T.app)??null,liveByHost:(Ae=x.dailyGoals)!=null&&Ae.liveByHost&&typeof x.dailyGoals.liveByHost=="object"?x.dailyGoals.liveByHost:{},history:Array.isArray((Ws=x.dailyGoals)==null?void 0:Ws.history)?x.dailyGoals.history:[]}}}catch{return ha()}}function L(e){localStorage.setItem(rc,JSON.stringify(e))}let m=gp();function D(){return m}function So(e){return m={...m,...e},L(m),m}function vp(e){return m=e(m)||m,L(m),m}function St(e){e&&(m={...m,profiles:{...m.profiles,[e.id]:{id:e.id,username:e.username,bio:e.bio||"",avatar:e.avatar||"",followers:e.followers||[],following:e.following||[],memberships:e.memberships||{},verified:!!e.verified}}})}function ls(e){return e?m.user&&m.user.id===e?m.user:m.profiles[e]||null:null}function $o(e){const t=ls(e);return t?(t.followers||[]).map(s=>ls(s)||{id:s,username:s}).filter(Boolean):[]}function Gn(e){const t=ls(e);return t?(t.following||[]).map(s=>ls(s)||{id:s,username:s}).filter(Boolean):[]}function oc(){if(m.posts.length)return;const e=[{id:"p1",userId:"dbs",username:"DatBoiSkeet",text:"Long Story Short — cover is up. Coming Soon on DBS Music. Stay ready.",image:"/music/01_Long_Story_Short_Coming_Soon.jpg",at:Date.now()-864e5*2},{id:"p2",userId:"dbs",username:"DatBoiSkeet",text:"Foreign X-Change — hats, tees & jackets. Checkout on ForeignX-Change.com (not inside DBS).",image:"/merch/01_black_orange_716_hat.jpeg",at:Date.now()-864e5},{id:"p3",userId:"dbs",username:"DatBoiSkeet",text:"Ladies Only — cover art live. Official playback unlocks when the single drops.",image:"/music/02_Ladies_Only_Coming_Soon.jpg",at:Date.now()-864e5*3},{id:"p4",userId:"dbs",username:"DatBoiSkeet",text:"716 Buffalo Braves snapback on Foreign X-Change — shop the external store.",image:"/merch/02_blue_red_716_hat.jpeg",at:Date.now()-864e5*4}];m={...m,posts:e,likes:{p1:[],p2:[],p3:[],p4:[]},comments:{p1:[],p2:[],p3:[],p4:[]}},L(m)}function _a(e){const t=(e||"Fan").trim().slice(0,24)||"Fan",s="u_"+t.toLowerCase().replace(/\W+/g,"_")+"_"+Date.now().toString(36),a={id:s,username:t,bio:"DBS fan · local demo account (TEST MODE)",avatar:"",followers:[],following:["dbs"],membership:null,memberships:{skeetPlus:!1,backstage:!1,innerCircle:!1},purchasedTracks:[],createdAt:Date.now()},i=m.profiles.dbs||ha().profiles.dbs,n=new Set(i.followers||[]);return n.add(s),m={...m,user:a,profiles:{...m.profiles,dbs:{...i,followers:[...n]}}},St(a),L(m),a}function bp(){Zt={...ka},m={...m,user:null},L(m)}function ws(e){if(!(e!=null&&e.id)||!(e!=null&&e.handle))return null;const t=m.user&&m.user.id===e.id?m.user:{},s={...t,id:e.id,username:e.display_name||e.handle,handle:e.handle,email:e.email||"",emailVerified:!!e.email_verified,authSource:"backend",bio:e.bio!==void 0?String(e.bio||"").slice(0,280):t.bio||"",avatar:e.avatar_url!==void 0?String(e.avatar_url||""):t.avatar||"",followers:t.followers||[],following:t.following||[],membership:t.membership??null,memberships:t.memberships||{skeetPlus:!1,backstage:!1,innerCircle:!1},purchasedTracks:t.purchasedTracks||[],createdAt:t.createdAt||Date.now()};return m={...m,user:s},St(s),L(m),s}function xs(){vr=[],Zt={...ka},m={...m,user:null},L(m)}function yp({bio:e,avatar:t,username:s}){const a=m.user;if(!a)return{error:"signin"};const i={...a,bio:e!==void 0?String(e).slice(0,280):a.bio,avatar:t!==void 0?String(t).trim():a.avatar,username:s!==void 0&&String(s).trim().slice(0,24)||a.username};return m={...m,user:i},St(i),L(m),i}function ji(e,t=!0){const s=m.user;if(!s)return{error:"signin"};if(Ns())return{error:"server_authoritative",membership:Ft()};let a=s.membership??null;const i=d=>d==="skeet"||d==="skeetPlus"||d==="skeet+"?"skeet+":d==="backstage"?"backstage":d==="inner"||d==="innerCircle"?"inner":null,n={null:0,"skeet+":1,backstage:2,inner:3},o=i(e);t?o&&(a=o):a=null;const r={skeetPlus:n[a||"null"]>=1,backstage:n[a||"null"]>=2,innerCircle:n[a||"null"]>=3},c={...s,membership:a,memberships:r};return m={...m,user:c},St(c),L(m),c}function Ns(){const e=typeof import.meta<"u"&&nc||{};return!!(typeof window<"u"&&typeof window.__PIKK_API_BASE__=="string"&&window.__PIKK_API_BASE__.trim()||String(e.VITE_PIKK_API_BASE||"").trim())}const ka=Object.freeze({status:"inactive",plan:null,authoritative:!0,userId:null,billing_configured:!1,activation:"not_available",source:"none",billing_reason:null,subscription_status:null,current_period_end:null,cancel_at_period_end:!1,entitlements:null,entitlement_policy:"unconfigured"});let Zt={...ka};function na(e,{userId:t=null}={}){if(!e||typeof e!="object")return Zt={...ka},{...Zt};const s=e.status==="active"&&typeof e.plan=="string"&&!!e.plan;return Zt={...ka,status:s?"active":"inactive",plan:s?e.plan:null,userId:t?String(t):null,billing_configured:e.billing_configured===!0,activation:typeof e.activation=="string"?e.activation:"not_available",source:typeof e.source=="string"?e.source:"none",billing_reason:typeof e.billing_reason=="string"?e.billing_reason:null,subscription_status:typeof e.subscription_status=="string"?e.subscription_status:null,current_period_end:typeof e.current_period_end=="string"?e.current_period_end:null,cancel_at_period_end:e.cancel_at_period_end===!0,entitlements:e.entitlements&&typeof e.entitlements=="object"?{...e.entitlements}:null,entitlement_policy:typeof e.entitlement_policy=="string"?e.entitlement_policy:"unconfigured"},{...Zt}}function ni(){return{...Zt}}function Ft(){if(Ns())return null;const e=m.user;if(!e)return null;if(e.membership)return e.membership;const t=e.memberships||{};return t.innerCircle?"inner":t.backstage?"backstage":t.skeetPlus?"skeet+":null}function Vn(e="skeet"){const t=Ft(),s={null:0,"skeet+":1,backstage:2,inner:3},a=e==="backstage"?2:e==="inner"?3:1;return(s[t||"null"]||0)>=a}function kp(e){const t=m.user;if(!t)return{error:"signin"};const s=new Set(t.purchasedTracks||[]);s.add(e);const a={...t,purchasedTracks:[...s]};return m={...m,user:a},St(a),L(m),a}function Eo({text:e,image:t,mediaType:s,mediaUrl:a}){const i=m.user;if(!i)throw new Error("Sign in required");const n="p_"+Date.now().toString(36),o=["picture","short","video","image","text"].includes(s)?s==="image"?"picture":s:t?"picture":"text",r={id:n,userId:i.id,username:i.username,text:(e||"").trim(),image:(t||"").trim(),mediaType:o==="text"&&!(t||"").trim()?"text":o,mediaUrl:(a||"").trim(),at:Date.now()};return m={...m,posts:[r,...m.posts],likes:{...m.likes,[n]:[]},comments:{...m.comments,[n]:[]}},L(m),r}function wp(e){const t=m.user;if(!t)return{error:"signin"};const s=new Set(m.likes[e]||[]);s.has(t.id)?s.delete(t.id):s.add(t.id),m={...m,likes:{...m.likes,[e]:[...s]}},L(m);try{ze()}catch{}return{count:s.size,liked:s.has(t.id)}}function Sp(e,t){const s=m.user;if(!s)return{error:"signin"};const a={id:"c_"+Date.now().toString(36),userId:s.id,username:s.username,text:t.trim(),at:Date.now()},i=m.comments[e]||[];m={...m,comments:{...m.comments,[e]:[...i,a]}},L(m);try{ze()}catch{}return a}function Fi(e){const t=m.user;if(!t)return{error:"signin"};if(e===t.id)return{error:"self"};if(t.following.includes(e))return t;const s={...t,following:[...t.following,e]},a={...m.profiles},i=a[e]||ls(e);if(i){const n=new Set(i.followers||[]);n.add(t.id),a[e]={...i,followers:[...n]}}return m={...m,user:s,profiles:a},St(s),L(m),s}function Ui(e){const t=m.user;if(!t)return{error:"signin"};const s={...t,following:(t.following||[]).filter(n=>n!==e)},a={...m.profiles},i=a[e]||ls(e);return i&&(a[e]={...i,followers:(i.followers||[]).filter(n=>n!==t.id)}),m={...m,user:s,profiles:a},St(s),L(m),s}function $p(e){const t={id:"clip_"+Date.now().toString(36),...e,status:"pending",at:Date.now()};return m={...m,clipperApps:[t,...m.clipperApps]},L(m),t}function Ep(e){const t=e||{},s=String(t.name||"").trim().slice(0,80),a=String(t.contact||t.email||t.handle||"").trim().slice(0,120),i=String(t.sells||"both").trim().slice(0,40),n=!!t.agreed;if(!s||!a)return{error:"missing"};if(!n)return{error:"rules"};const o={id:"csa_"+Date.now().toString(36),name:s,contact:a,sells:["music","merch","both"].includes(i)?i:"both",agreed:!0,status:"pending",at:Date.now()},r=[o,...m.creatorSellApps||[]].slice(0,40);return m={...m,creatorSellApps:r},L(m),{ok:!0,app:o}}function lc(e,t){if(!["pending","approved","rejected","waitlisted"].includes(t))return{error:"bad_status"};const a=m.clipperApps.map(i=>i.id===e?{...i,status:t,reviewedAt:Date.now()}:i);return m={...m,clipperApps:a},L(m),a.find(i=>i.id===e)}function wn(e){m={...m,notifications:{...m.notifications,...e}},L(m)}function xp(){m={...m,splashSeenAt:Date.now()},L(m)}function Ap(){return!m.splashSeenAt}let vr=[];function xo(e){vr=Array.isArray(e)?e.map(String):[]}function Oa(){const e=typeof import.meta<"u"&&nc||{},t=typeof window<"u"&&typeof window.__PIKK_API_BASE__=="string"&&window.__PIKK_API_BASE__.trim()||String(e.VITE_PIKK_API_BASE||"").trim();return e.DEV===!0&&!t}function ee(){return vr.includes("admin")?!0:Oa()&&!!(m.user&&m.user.role==="admin")}function Gi(e=!0){if(e&&!Oa())return{error:"staff_only"};const t=m.user;if(!t)return{error:"signin"};const s={...t,role:e?"admin":"fan"};return m={...m,user:s},St(s),L(m),s}function cc(){var r;const e=m.posts||[],t=m.clipperApps||[],s={pending:0,approved:0,rejected:0,waitlisted:0};t.forEach(c=>{const d=c.status||"pending";s[d]!==void 0?s[d]+=1:s.pending+=1});let a=0;Object.values(m.likes||{}).forEach(c=>{a+=(c||[]).length});let i=0;Object.values(m.comments||{}).forEach(c=>{i+=(c||[]).length});let n=0;m.user&&(m.user.membership||(r=m.user.memberships)!=null&&r.skeetPlus)&&(n+=1),Object.values(m.profiles||{}).forEach(c=>{var d,u;c.id!==((d=m.user)==null?void 0:d.id)&&(c.membership||(u=c.memberships)!=null&&u.skeetPlus)&&(n+=1)});const o=m.catalog||[];return{posts:e.length,likes:a,comments:i,clippers:t.length,clipperByStatus:s,members:n,profiles:Object.keys(m.profiles||{}).length,catalogTotal:o.length,catalogPublished:o.filter(c=>c.published).length}}function dc(e){const t=["spotify","apple","youtubeMusic","youtube","tidal","amazon"],s={};if(!e||typeof e!="object")return s;for(const a of t){const i=String(e[a]||"").trim();(i.startsWith("http://")||i.startsWith("https://"))&&(s[a]=i.slice(0,500))}return s}function as({publishedOnly:e=!1,types:t=null,includeUnpublishedForAdmin:s=!1}={}){let a=m.catalog||[];if(e?a=a.filter(i=>i.published):s||(a=a.filter(i=>i.published)),t&&t.length){const i=new Set(t);a=a.filter(n=>i.has(n.type))}return[...a].sort((i,n)=>(n.createdAt||0)-(i.createdAt||0))}function Tp(e){var a;if(!ee())return{error:"forbidden"};const s={id:e.id||"cat_"+Date.now().toString(36),type:e.type,title:String(e.title||"").trim().slice(0,120),artist:String(e.artist).trim().slice(0,80),coverRef:e.coverRef||"",mediaRef:e.mediaRef||"",youtube:String(e.youtube||"").trim(),embed:String(e.embed||"").trim(),streamingLinks:dc(e.streamingLinks),published:!!e.published,createdAt:Date.now(),updatedAt:Date.now(),createdBy:((a=m.user)==null?void 0:a.id)||null};return s.title?["song","album","video","picture"].includes(s.type)?(m={...m,catalog:[s,...m.catalog||[]]},L(m),s):{error:"type"}:{error:"title"}}function uc(e,t){if(!ee())return{error:"forbidden"};let s=null;const a=(m.catalog||[]).map(i=>{if(i.id!==e)return i;const n={...i,...t,id:i.id,updatedAt:Date.now()};return t&&Object.prototype.hasOwnProperty.call(t,"streamingLinks")&&(n.streamingLinks=dc(t.streamingLinks)),s=n,s});return s?(m={...m,catalog:a},L(m),s):{error:"missing"}}function Cp(e,t){return uc(e,{published:!!t})}function Pp(e){if(!ee())return{error:"forbidden"};const t=(m.catalog||[]).filter(s=>s.id!==e);return m={...m,catalog:t},L(m),!0}function Ao(e,t={}){const s=m.user;if(!s)return{error:"signin"};if(m.live&&!m.live.endedAt)return{error:"already_live",live:m.live};const a={id:"live_"+Date.now().toString(36),hostId:s.id,hostName:s.username,title:(e||"DBS Live · TEST MODE").trim().slice(0,80),category:t.category||"",permissions:t.permissions||null,startedAt:Date.now(),viewers:0,giftsTotal:0,tipsTotal:0,giftLog:[],chat:[{id:"sys1",userId:"system",username:"DBS",text:"Welcome · Follow DatBoiSkeet · TEST MODE (no real stream)",at:Date.now()}],endedAt:null};return m={...m,live:a},L(m),a}function Ip(){if(!m.live||m.live.endedAt)return m.live;const e={...m.live,endedAt:Date.now()},t=[e,...m.liveHistory||[]].slice(0,20);return m={...m,live:e,liveHistory:t},L(m),e}function Mp(e){const t=m.user;if(!t)return{error:"signin"};if(!m.live||m.live.endedAt)return{error:"offline"};const s={id:"lc_"+Date.now().toString(36),userId:t.id,username:t.username,text:String(e||"").trim().slice(0,280),at:Date.now()};if(!s.text)return{error:"empty"};const a={...m.live,chat:[...m.live.chat||[],s]};return m={...m,live:a},L(m),s}function Lp({kind:e="tip",amount:t=1,label:s=""}={}){var p;const a=m.user;if(!a)return{error:"signin"};if(!m.live||m.live.endedAt)return{error:"offline"};const i=Math.max(.5,Number(t)||1),n=e==="gift"?"gift":"tip",o=((p=m.wallet)==null?void 0:p.balance)||0;let r=m.wallet||{balance:0,history:[]};o>=i&&(r={balance:+(o-i).toFixed(2),history:[...r.history||[],{at:Date.now(),amount:-i,note:`Live ${n} · ${m.live.title}`}]});const c={id:"lg_"+Date.now().toString(36),userId:a.id,username:a.username,kind:n,amount:i,label:(s||(n==="gift"?"🔥 Fire":"Tip")).slice(0,40),at:Date.now()},d={id:"lc_"+Date.now().toString(36)+"g",userId:a.id,username:a.username,text:n==="gift"?`sent ${c.label} ($${i.toFixed(2)}) · TEST MODE`:`tipped $${i.toFixed(2)} · TEST MODE`,at:Date.now(),support:!0},u={...m.live,giftsTotal:(m.live.giftsTotal||0)+(n==="gift"?i:0),tipsTotal:(m.live.tipsTotal||0)+(n==="tip"?i:0),giftLog:[...m.live.giftLog||[],c],chat:[...m.live.chat||[],d]};return m={...m,live:u,wallet:r},L(m),o>=i&&Ar({category:n==="gift"?"gifts":"tips",gross:i,note:`Live ${n} from @${a.username} · ${m.live.title}`,source:"live"}),{live:u,entry:c,wallet:m.wallet,creatorWallet:m.creatorWallet}}function Dp(){return m.liveHistory||[]}const pc=[{pack:1,price:10,label:"1 song",save:0},{pack:2,price:25,label:"2 songs",save:0},{pack:3,price:45,label:"3 songs",save:5}];function fa(){return Array.isArray(m.liveSongRequests)?m.liveSongRequests:[]}function _p(e){var s;const t=e||((s=m.live)==null?void 0:s.id);return t?fa().filter(a=>a.liveId===t):[]}function br(e){const t=[];for(const s of _p(e))(s.titles||[]).forEach((a,i)=>{t.push({requestId:s.id,songIndex:i,title:a,status:s.songStatuses&&s.songStatuses[i]||"queued",username:s.username,userId:s.userId,pack:s.pack,price:s.price,at:s.at})});return t}function Op({pack:e,titles:t}={}){var u;const s=m.user;if(!s)return{error:"signin"};if(!m.live||m.live.endedAt)return{error:"offline"};const a=pc.find(p=>p.pack===Number(e));if(!a)return{error:"bad_pack"};const i=(Array.isArray(t)?t:[]).map(p=>String(p||"").trim().slice(0,80)).filter(Boolean);if(i.length!==a.pack)return{error:"title_count",need:a.pack,got:i.length};const n=om(a.price,`Song request ×${a.pack} · ${m.live.title} · TEST MODE`);if((n==null?void 0:n.error)==="insufficient")return{error:"insufficient",need:a.price,balance:Number(((u=m.wallet)==null?void 0:u.balance)||0)};const o={id:"lsr_"+Date.now().toString(36),liveId:m.live.id,hostId:m.live.hostId,userId:s.id,username:s.username,pack:a.pack,price:a.price,titles:i,songStatuses:i.map(()=>"queued"),status:"open",at:Date.now(),charged:a.price},r=[o,...fa()].slice(0,200),c={id:"lc_"+Date.now().toString(36)+"sr",userId:s.id,username:s.username,text:`requested ${a.pack} song${a.pack>1?"s":""} ($${a.price}) · TEST MODE`,at:Date.now(),support:!0},d={...m.live,chat:[...m.live.chat||[],c]};return m={...m,liveSongRequests:r,live:d},L(m),Ar({category:"tips",gross:a.price,note:`Song request ×${a.pack} from @${s.username} · ${m.live.title}`,source:"live_song_request"}),{ok:!0,entry:o,wallet:m.wallet,live:m.live}}function yr(e,t,s){var v;const a=m.user;if(!a)return{error:"signin"};if(!["playing","played","skipped","queued"].includes(s))return{error:"bad_status"};const n=fa().findIndex(b=>b.id===e);if(n<0)return{error:"missing"};const o=fa()[n],r=m.live;if(!(r&&r.hostId===a.id&&r.id===o.liveId||a.id===o.hostId)&&!ee())return{error:"host_only"};const d=Number(t);if(!Number.isInteger(d)||d<0||d>=(o.titles||[]).length)return{error:"bad_index"};let u=[...o.songStatuses||o.titles.map(()=>"queued")];if(s==="playing"){const b=fa().map(y=>{if(y.liveId!==o.liveId)return y;const k=[...y.songStatuses||(y.titles||[]).map(()=>"queued")];let S=!1;for(let w=0;w<k.length;w++)k[w]==="playing"&&(k[w]="played",S=!0);if(!S)return y;const $=k.every(w=>w==="played"||w==="skipped");return{...y,songStatuses:k,status:$?"done":"open"}});m={...m,liveSongRequests:b},u=[...((v=m.liveSongRequests[n])==null?void 0:v.songStatuses)||u]}u[d]=s;const p=u.every(b=>b==="played"||b==="skipped"),h={...m.liveSongRequests[n],songStatuses:u,status:p?"done":"open"},g=[...m.liveSongRequests];return g[n]=h,m={...m,liveSongRequests:g},L(m),{ok:!0,entry:h}}function qp(e,t){return yr(e,t,"playing")}function Rp(e,t){return yr(e,t,"skipped")}function Np(e,t){return yr(e,t,"played")}const kr=[{slug:"rose",name:"DBS Rose",coins:5,usd:.1,animation:"Rotating glossy rose and petals",tier:"small"},{slug:"big-love",name:"Big Love",coins:25,usd:.5,animation:"Pulsing luminous heart",tier:"small"},{slug:"turn-up",name:"Turn Up",coins:50,usd:1,animation:"Flame burst and DBS sparks",tier:"small"},{slug:"cash-rain",name:"Cash Rain",coins:150,usd:3,animation:"Stylized bills and confetti",tier:"mid"},{slug:"bottle-pop",name:"Bottle Pop",coins:300,usd:6,animation:"Bottle pop and confetti",tier:"mid"},{slug:"money-gun",name:"Money Gun",coins:750,usd:15,animation:"Stylized cash launcher",tier:"premium"},{slug:"diamond-drip",name:"Diamond Drip",coins:1500,usd:30,animation:"Rotating diamond",tier:"premium"},{slug:"foreign-whip",name:"Foreign Whip",coins:3e3,usd:60,animation:"Original luxury vehicle drives across screen",tier:"premium"},{slug:"helicopter",name:"Helicopter",coins:5e3,usd:100,animation:"Helicopter spotlight flyover",tier:"cinematic"},{slug:"private-jet",name:"Private Jet",coins:1e4,usd:200,animation:"Jet cinematic flyover",tier:"cinematic"},{slug:"dbs-crown",name:"DBS Crown",coins:25e3,usd:500,animation:"Gold diamond crown",tier:"cinematic"},{slug:"dbs-universe",name:"DBS Universe",coins:5e4,usd:1e3,animation:"Galaxy DBS logo reveal",tier:"cinematic"}],Vi=[{coins:100,usd:2},{coins:500,usd:10},{coins:1e3,usd:20},{coins:2500,usd:50},{coins:5e3,usd:100},{coins:1e4,usd:200}],Bp=750,Sn=80,To=20;function Hi(e){return{balance:Math.max(0,Number(e==null?void 0:e.balance)||0),history:Array.isArray(e==null?void 0:e.history)?e.history:[]}}function zi(){return Hi(m.coins).balance}function Kp(){return Vi.map(e=>({...e}))}function jp(){return kr.map(e=>({...e}))}function mc(e){const t=Vi.find(n=>n.coins===Number(e));if(!t)return{error:"bad_package"};const s=Hi(m.coins),a={at:Date.now(),amount:t.coins,note:`Bought ${t.coins} coins ($${t.usd}) · TEST MODE`,kind:"buy",packageCoins:t.coins,usd:t.usd},i={balance:s.balance+t.coins,history:[a,...s.history].slice(0,200)};return m={...m,coins:i},L(m),{ok:!0,coins:i,pack:t,entry:a}}function wr(){return Array.isArray(m.liveGiftLedger)?m.liveGiftLedger:[]}function Fp(e){var s;const t=e||((s=m.live)==null?void 0:s.id);return t?wr().filter(a=>a.liveId===t).map(a=>({id:a.id,liveId:a.liveId,giftSlug:a.giftSlug,giftName:a.giftName,coins:a.coins,usd:a.usd,fromUserId:a.fromUserId,fromUser:a.fromUser,at:a.at,animation:a.animation,tier:a.tier})):[]}function Up(e=10,t=Date.now()){const s=Math.min(Math.max(1,Number(e)||10),10),a=new Date(t);a.setHours(0,0,0,0);const i=a.getTime(),n=new Date(t);n.setHours(23,59,59,999);const o=n.getTime(),r={};for(const c of wr()){const d=Number(c.at||0);if(d<i||d>o)continue;const u=c.fromUserId||c.fromUser||"anon",p=r[u]||{userId:u,username:c.fromUser||u,usd:0,coins:0,gifts:0,lastSlug:c.giftSlug||"rose"};p.usd=+(p.usd+Number(c.usd||0)).toFixed(2),p.coins+=Number(c.coins||0),p.gifts+=1,p.username=c.fromUser||p.username,p.lastSlug=c.giftSlug||p.lastSlug,r[u]=p}return Object.values(r).sort((c,d)=>d.usd-c.usd||d.coins-c.coins||c.username.localeCompare(d.username)).slice(0,s)}function hc(e){let s=(xr(m.creatorWallet).earnings||[]).filter(a=>a.category==="gifts");return e&&(s=s.filter(a=>!a.hostId||a.hostId===e)),s.map(a=>({...a}))}function Gp({liveId:e,slug:t}={}){const s=m.user;if(!s)return{error:"signin"};const a=m.live;if(!a||a.endedAt)return{error:"offline"};if(e&&e!==a.id)return{error:"live_mismatch"};const i=kr.find(E=>E.slug===t);if(!i)return{error:"bad_gift"};const n=Hi(m.coins);if(n.balance<i.coins)return{error:"insufficient",need:i.coins,balance:n.balance};const o=K(i.usd),r=0,c=o,d=K(c*Sn/100),u=K(c-d),p=Date.now(),h="lgift_"+p.toString(36)+"_"+Math.random().toString(36).slice(2,6),g={at:p,amount:-i.coins,note:`Gift ${i.name} · ${a.title} · TEST MODE`,kind:"gift",giftSlug:i.slug,liveId:a.id,usd:o},v={balance:n.balance-i.coins,history:[g,...n.history].slice(0,200)},b={id:h,liveId:a.id,hostId:a.hostId,giftSlug:i.slug,giftName:i.name,coins:i.coins,usd:o,fees:r,net:c,creatorShare:d,platformShare:u,dbsShare:u,creatorPct:Sn,dbsPct:To,fromUserId:s.id,fromUser:s.username,at:p,animation:i.animation,tier:i.tier,testModeNetAsListed:!0},y={id:h,userId:s.id,username:s.username,kind:"gift",giftSlug:i.slug,label:i.name,amount:o,coins:i.coins,at:p},k={id:"lc_"+p.toString(36)+"gf",userId:s.id,username:s.username,text:`sent ${i.name} (${i.coins} coins) · TEST MODE`,at:p,support:!0,giftSlug:i.slug},S={...a,giftsTotal:K((a.giftsTotal||0)+o),giftLog:[...a.giftLog||[],y],chat:[...a.chat||[],k]},$=[b,...wr()].slice(0,500),w=xr(m.creatorWallet),C={id:"earn_"+p.toString(36)+"_"+Math.random().toString(36).slice(2,6),category:"gifts",label:"Live gifts",note:`Live gift ${i.name} from @${s.username} · ${a.title}`,gross:o,fees:r,net:c,creatorPct:Sn,dbsPct:To,creatorShare:d,dbsShare:u,source:"live_gift",giftSlug:i.slug,giftId:h,liveId:a.id,hostId:a.hostId,fromUserId:s.id,at:p,payoutId:null},P={...w,available:K(w.available+d),earnings:[C,...w.earnings||[]]},q={id:"gbpop_"+p.toString(36),liveId:a.id,fromUserId:s.id,fromUser:s.username,giftSlug:i.slug,giftName:i.name,coins:i.coins,usd:o,at:p,expiresAt:p+6e4};return m={...m,coins:v,live:S,liveGiftLedger:$,creatorWallet:P,liveGbChallengePop:q},L(m),{ok:!0,entry:b,viewerEntry:y,coins:v,live:S,earning:C,creatorWallet:P,challengePop:q}}const fc=24*60*60*1e3,Co=50;function Wi(e){return{app:e!=null&&e.app&&typeof e.app=="object"?e.app:null,liveByHost:e!=null&&e.liveByHost&&typeof e.liveByHost=="object"?{...e.liveByHost}:{},history:Array.isArray(e==null?void 0:e.history)?e.history:[]}}function wa(e,t=Date.now()){return!e||typeof e!="object"?!1:(Number(e.endsAt)||0)>t}function As(e){return e?{...e}:null}function gc(e){return"goal_"+e+"_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,6)}function Sr(e,t){if(!t)return e;const s=[{...t,archivedAt:Date.now()},...e.history||[]].slice(0,40);return{...e,history:s}}function Vp(e=Date.now()){return{id:gc("app"),scope:"app",name:"PIKK daily community goal",targetAmount:50,raised:0,endsAt:e+fc,createdAt:e}}function vi(e){return m={...m,dailyGoals:e},L(m),e}function bi(e=Date.now()){let t=Wi(m.dailyGoals),s=!1;return t.app&&!wa(t.app,e)&&(t={...Sr(t,t.app),app:null},s=!0),wa(t.app,e)||(t={...t,app:Vp(e)},s=!0),s&&vi(t),t.app&&t.app.name==="DBS daily community goal"&&(t={...t,app:{...t.app,name:"PIKK daily community goal"}},vi(t)),As(t.app)}function Hp(e,t=Date.now()){var n,o;const s=e||((n=m.live)==null?void 0:n.hostId)||((o=m.user)==null?void 0:o.id)||null;if(!s)return null;let a=Wi(m.dailyGoals);const i=a.liveByHost[s]||null;if(i&&!wa(i,t)){const r={...a.liveByHost};return delete r[s],a={...Sr(a,i),liveByHost:r},vi(a),null}return As(wa(i,t)?i:null)}function vc({name:e,targetAmount:t}={}){const s=m.user;if(!s)return{error:"signin"};const a=String(e||"").trim().slice(0,80),i=Number(t);if(!a)return{error:"bad_name"};if(!Number.isFinite(i)||i<=0)return{error:"bad_amount"};const n=Date.now();let o=Wi(m.dailyGoals);const r=o.liveByHost[s.id];r&&(o=Sr(o,r));const c={id:gc("live"),scope:"live",hostId:s.id,hostName:s.username,name:a,targetAmount:K(i),raised:0,endsAt:n+fc,createdAt:n};return o={...o,liveByHost:{...o.liveByHost,[s.id]:c}},vi(o),{ok:!0,goal:As(c)}}function yi(e,t,s={}){if(!m.user)return{error:"signin"};const i=Math.floor(Number(t));if(!Number.isFinite(i)||i<=0)return{error:"invalid_amount"};const n=String(e||"");if(!n)return{error:"unknown_goal"};const o=Date.now();let r=Wi(m.dailyGoals),c=null,d=null,u=null;if(r.app&&r.app.id===n)c="app",u=r.app;else for(const[P,q]of Object.entries(r.liveByHost))if(q&&q.id===n){c="live",d=P,u=q;break}if(!u)return{error:"unknown_goal"};if(!wa(u,o))return{error:"expired"};const p=Number(u.targetAmount)||0,h=Number(u.raised)||0;if(u.completedAt||p>0&&h>=p)return{error:"completed",goal:As(u)};let g=i;if(p>0){const P=Math.max(0,K(p-h)),q=Math.ceil(P*Co);if(q<=0)return{error:"completed",goal:As(u)};g>q&&(g=q)}const v=Hi(m.coins);if(v.balance<g)return{error:"insufficient",need:g,balance:v.balance};const b=K(g/Co),y=K(h+b),k=p>0&&y>=p?o:u.completedAt,S={...u,raised:p>0?Math.min(y,K(p)):y,...k?{completedAt:k}:{}},$=String((s==null?void 0:s.message)||"").trim().slice(0,180),w={at:o,amount:-g,note:`Goal donate · ${u.name} · $${b.toFixed(2)} · TEST MODE`,kind:"goal",goalId:u.id,...$?{message:$}:{},usd:b},C={balance:v.balance-g,history:[w,...v.history].slice(0,200)};return c==="app"?r={...r,app:S}:r={...r,liveByHost:{...r.liveByHost,[d]:S}},m={...m,dailyGoals:r,coins:C},L(m),{ok:!0,goal:As(S),coins:C,donated:{coins:g,usd:b,requested:i,message:$}}}function zp(e){const t=m.user,s={id:"brand_"+Date.now().toString(36),brand:String(e.brand||"").trim().slice(0,80),contact:String(e.contact||"").trim().slice(0,120),email:String(e.email||"").trim().slice(0,120),campaign:String(e.campaign||"sponsored_post").trim().slice(0,40),budget:String(e.budget||"").trim().slice(0,40),pitch:String(e.pitch||"").trim().slice(0,500),url:String(e.url||"").trim().slice(0,300),applicantUserId:(t==null?void 0:t.id)||null,status:"pending",at:Date.now()};return!s.brand||!s.email?{error:"required"}:(m={...m,brandApps:[s,...m.brandApps]},L(m),s)}function Wp(e,t){if(!["pending","approved","rejected"].includes(t))return{error:"bad_status"};const a=m.brandApps.map(i=>i.id===e?{...i,status:t,reviewedAt:Date.now()}:i);return m={...m,brandApps:a},L(m),a.find(i=>i.id===e)}function Po(e){const t=m.user,s={id:"list_"+Date.now().toString(36),title:String(e.title||"").trim().slice(0,80),brand:String(e.brand||"").trim().slice(0,80),blurb:String(e.blurb||"").trim().slice(0,280),url:String(e.url||"").trim().slice(0,300),disclosure:String(e.disclosure||"Paid partnership · TEST MODE").trim().slice(0,120),brandAppId:e.brandAppId||null,createdBy:(t==null?void 0:t.id)||null,active:!0,at:Date.now()};return!s.title||!s.brand?{error:"required"}:(m={...m,listings:[s,...m.listings||[]]},L(m),s)}function Yp(e,t){const s=(m.listings||[]).map(a=>a.id===e?{...a,active:!!t}:a);return m={...m,listings:s},L(m),s.find(a=>a.id===e)}function Jp({activeOnly:e=!1}={}){const t=m.listings||[];return e?t.filter(s=>s.active):t}function Qp(e){var s;return[((s=m.user)==null?void 0:s.id)||"guest",e].sort().join("__")}function $r(){const e=m.user;return e?Object.values(m.threads||{}).filter(t=>{var s;return(s=t.participants)==null?void 0:s.includes(e.id)}).sort((t,s)=>(s.updatedAt||0)-(t.updatedAt||0)):[]}function ki(e){const t=m.user;if(!t||!e||e.muted||e.blocked)return 0;const s=e.lastReadAt||0;return(e.messages||[]).filter(a=>a.from!==t.id&&(a.at||0)>s).length}function Lt(){return $r().reduce((e,t)=>e+ki(t),0)}function Io(e){const t=m.user;if(!t||!e)return null;const s=m.threads[e];if(!s||!(s.participants||[]).includes(t.id))return null;const a={...s,lastReadAt:Date.now()};m={...m,threads:{...m.threads,[a.id]:a},demoUnreadSeeded:!0},L(m);try{typeof window<"u"&&window.dispatchEvent&&window.dispatchEvent(new CustomEvent("dbs:messages-unread",{detail:{count:Lt()}}))}catch{}return m.threads[a.id]}function Er(){var d;const e=m.user;if(!e)return{seeded:!1};if(qa(),m.demoUnreadSeeded)return{seeded:!1,count:Lt(),once:!0};if(Lt()>0)return m={...m,demoUnreadSeeded:!0},L(m),{seeded:!1,count:Lt()};const t="maya",s=(((d=m.profiles)==null?void 0:d.maya)||{}).username||"MayaBeats",a=ga(t,s);if(a.error)return a;const i=m.threads[a.id];if((i.messages||[]).some(u=>u.from!==e.id)){const u=(i.messages||[]).filter(b=>b.from!==e.id).map(b=>b.at||0),p=i.lastReadAt||0;if(p>=Math.max(...u,0)||p>0)return m={...m,demoUnreadSeeded:!0},L(m),{seeded:!1,count:Lt()};const g=Math.min(...u),v={...i,lastReadAt:Math.max(0,g-1)};return m={...m,threads:{...m.threads,[v.id]:v},demoUnreadSeeded:!0},L(m),{seeded:!0,count:Lt()}}const o=Date.now(),r=[{id:"m_demo_unread_1",from:t,fromName:s,text:"Yo — drop coming Friday. You in for the listening party?",at:o-1e3*60*12},{id:"m_demo_unread_2",from:t,fromName:s,text:"Also sent a beat pack in the vault 🔥",at:o-1e3*60*5}],c={...i,messages:[...i.messages||[],...r],updatedAt:o-1e3*60*5,lastReadAt:0,request:!1};return m={...m,threads:{...m.threads,[c.id]:c},demoUnreadSeeded:!0},L(m),{seeded:!0,count:Lt()}}function bc(e){return(m.threads||{})[e]||null}function yc(e){var a;const t=m.user;if(!t||!e)return!1;const s=(a=m.profiles)==null?void 0:a[e];return s?(t.following||[]).includes(e)&&(s.following||[]).includes(t.id):!1}function Sa(e){var a,i;if(!e||e.kind==="group")return"";const t=e.peerHandle||((i=(a=m.profiles)==null?void 0:a[e.peerId])==null?void 0:i.handle)||"",s=String(t).trim().replace(/^@/,"");return/^[A-Za-z0-9_]{3,30}$/.test(s)?s:""}function ga(e,t,{peerHandle:s}={}){const a=m.user;if(!a)return{error:"signin"};const i=Qp(e);let n=m.threads[i];if(n){if(!n.peerHandle&&n.kind!=="group"){const o=Sa({...n,peerHandle:s||""});o&&(n={...n,peerHandle:o},m={...m,threads:{...m.threads,[i]:n}},L(m))}}else{const o=e==="dbs"||yc(e);n={id:i,kind:"dm",participants:[a.id,e],peerId:e,peerName:t||e,peerHandle:"",messages:[],updatedAt:Date.now(),request:!o,muted:!1,blocked:!1},n.peerHandle=Sa({...n,peerHandle:s||""}),m={...m,threads:{...m.threads,[i]:n}},L(m)}return n}function Xp(e,t,s,{priority:a=!1}={}){const i=m.user;if(!i)return{error:"signin"};const n=String(s||"").trim().slice(0,500);if(!n)return{error:"empty"};const o=ga(e,t);if(o.error)return o;const r={id:"m_"+Date.now().toString(36),from:i.id,fromName:i.username,text:n,at:Date.now(),priority:!!a},c={...m.threads[o.id],messages:[...m.threads[o.id].messages||[],r],updatedAt:Date.now(),peerName:t||m.threads[o.id].peerName};if(m={...m,threads:{...m.threads,[c.id]:c}},a){const d=m.wallet||{balance:0,history:[]};m={...m,wallet:{balance:d.balance,history:[...d.history||[],{at:Date.now(),amount:0,note:"Priority message · TEST MODE $2.99 (not charged)"}]}}}return L(m),{thread:m.threads[c.id],message:r}}function qa(){const e={...m.profiles||{}};let t=!1;e.maya||(e.maya={id:"maya",username:"MayaBeats",bio:"Creator · beats & live demos",avatar:"",followers:[],following:["dbs"],verified:!1},t=!0),e.fanjay||(e.fanjay={id:"fanjay",username:"FanJay",bio:"Day-one fan · playlist curator",avatar:"",followers:[],following:["dbs"],verified:!1},t=!0);const s=m.user;if(s){const a={...e.maya},i=new Set(a.following||[]),n=new Set(a.followers||[]);i.has(s.id)||(i.add(s.id),t=!0),n.has(s.id)||(n.add(s.id),t=!0),a.following=[...i],a.followers=[...n],e.maya=a;let o=s;(s.following||[]).includes("maya")||(o={...s,following:[...s.following||[],"maya"]},t=!0),t&&(m={...m,user:o,profiles:e},St(o),L(m))}else t&&(m={...m,profiles:e},L(m));return[{id:"dbs",username:"DatBoiSkeet",team:!0,bio:(m.profiles.dbs||{}).bio||""},{id:"maya",username:m.profiles.maya.username,team:!1,bio:m.profiles.maya.bio},{id:"fanjay",username:m.profiles.fanjay.username,team:!1,bio:m.profiles.fanjay.bio}]}function Zp(e,t=[]){const s=m.user;if(!s)return{error:"signin"};const a=String(e).trim().slice(0,60)||"Group",i=[...new Set([s.id,...t.filter(Boolean)])],n=a.toLowerCase().replace(/\W+/g,"_").slice(0,24)||"group",o=n==="dbs_fans"?"group_dbs_fans":"group_"+n+"_"+String(s.id).slice(-4);let r=m.threads[o];if(!r)r={id:o,kind:"group",peerId:o,peerName:a,participants:i,memberIds:i,messages:[],updatedAt:Date.now(),muted:!1,blocked:!1},m={...m,threads:{...m.threads,[o]:r}},L(m);else if(s&&!(r.participants||[]).includes(s.id)){const c=[...new Set([...r.participants||[],s.id])],d=[...new Set([...r.memberIds||c,s.id])];r={...r,participants:c,memberIds:d},m={...m,threads:{...m.threads,[o]:r}},L(m)}return m.threads[o]}function em(){return m.user?(qa(),Zp("DBS Fans",["dbs","maya","fanjay"])):{error:"signin"}}function tm(e,t){const s=m.user;if(!s)return{error:"signin"};const a=m.threads[e];if(!a||a.kind!=="group")return{error:"not_group"};if(!(a.participants||[]).includes(s.id))return{error:"forbidden"};const i=String(t||"").trim().slice(0,500);if(!i)return{error:"empty"};const n={id:"m_"+Date.now().toString(36),from:s.id,fromName:s.username,text:i,at:Date.now(),priority:!1},o={...a,messages:[...a.messages||[],n],updatedAt:Date.now()};return m={...m,threads:{...m.threads,[o.id]:o}},L(m),{thread:m.threads[o.id],message:n}}function $n(e,t={}){const s=m.threads[e];if(!s)return{error:"missing"};const a={...s,muted:t.muted!==void 0?!!t.muted:!!s.muted,blocked:t.blocked!==void 0?!!t.blocked:!!s.blocked,reportedAt:t.report?Date.now():s.reportedAt||null};return m={...m,threads:{...m.threads,[a.id]:a}},L(m),a}function Mo(e={}){const t={...m.messagePrefs||{allowDMs:!0,allowRequests:!0},...e};return m={...m,messagePrefs:t},L(m),t}const es={gifts:{creatorPct:80,dbsPct:20,label:"Live gifts"},tips:{creatorPct:90,dbsPct:10,label:"Tips"},subscriptions:{creatorPct:85,dbsPct:15,label:"Subscriptions"},paid_content:{creatorPct:85,dbsPct:15,label:"Paid content"},referrals:{creatorPct:85,dbsPct:15,label:"Referrals"},clippers:{creatorPct:80,dbsPct:20,label:"Clippers"},sponsorships:{creatorPct:80,dbsPct:20,label:"Sponsorships"},merch:{creatorPct:85,dbsPct:15,label:"Merch / affiliate"}},sm=[{category:"gifts",gross:40,note:"Live gifts · demo week"},{category:"tips",gross:22.5,note:"Live tips · demo week"},{category:"subscriptions",gross:29.99,note:"PIKK+ fan sub · demo"},{category:"referrals",gross:15,note:"Refer & Earn milestone · demo"},{category:"clippers",gross:50,note:"Clippers campaign payout · demo"},{category:"sponsorships",gross:100,note:"Sponsored livestream · demo"},{category:"merch",gross:35,note:"Foreign X-Change affiliate · demo"}];function K(e){return Math.round(Number(e)*100)/100}function xr(e){const t=ha().creatorWallet;return!e||typeof e!="object"?{...t}:{...t,...e,available:K(e.available??0),holds:K(e.holds??0),threshold:Number(e.threshold)>0?Number(e.threshold):25,verification:e.verification==="demo_verified"?"demo_verified":"demo_unverified",earnings:Array.isArray(e.earnings)?e.earnings:[],payouts:Array.isArray(e.payouts)?e.payouts:[]}}function Ut(){const e=xr(m.creatorWallet);return m.creatorWallet!==e&&(m={...m,creatorWallet:e}),e}function kc({category:e,gross:t,note:s,source:a="demo",at:i=Date.now()}){const n=es[e]||es.tips,o=K(Math.max(0,Number(t)||0)),r=K(o*.029+(o>0?.3:0)),c=K(Math.max(0,o-r)),d=K(c*n.creatorPct/100),u=K(c-d);return{id:"earn_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,6),category:e,label:n.label,note:String(s||n.label).slice(0,120),gross:o,fees:r,net:c,creatorPct:n.creatorPct,dbsPct:n.dbsPct,creatorShare:d,dbsShare:u,source:a,at:i,payoutId:null}}function am(){return{...es}}function $a(){return Ut()}function Ar(e){const t=kc(e),s=Ut(),a={...s,available:K(s.available+t.creatorShare),earnings:[t,...s.earnings||[]]};return m={...m,creatorWallet:a},L(m),t}function wc({force:e=!1}={}){const t=Ut();if(!e&&(t.earnings||[]).length>0)return{skipped:!0,creatorWallet:t};const s=Date.now()-6*864e5,i=sm.map((r,c)=>kc({category:r.category,gross:r.gross,note:r.note,source:"seed",at:s+c*36e5})).map((r,c)=>({...r,id:"earn_seed_"+c+"_"+r.category})),n=K(i.reduce((r,c)=>r+c.creatorShare,0)),o={...t,available:e?n:K(t.available+n),earnings:e?i:[...i,...t.earnings||[]],holds:e?0:t.holds,payouts:e?[]:t.payouts};return e&&(o.available=n,o.holds=0,o.payouts=[],o.earnings=i),m={...m,creatorWallet:o},L(m),{seeded:i.length,creatorWallet:o}}function im({amount:e}={}){const t=Ut(),s=(t.payouts||[]).find(h=>h.status==="pending");if(s)return{error:"pending_exists",pending:s};const a=K(t.available);if(a<t.threshold)return{error:"below_threshold",available:a,threshold:t.threshold};const i=e!=null?K(e):a;if(i<=0||i>a)return{error:"bad_amount"};const n=(t.earnings||[]).filter(h=>!h.payoutId).sort((h,g)=>h.at-g.at),o=[];let r=0;for(const h of n){const g=K(h.creatorShare);if(!(g<=0)&&!(K(r+g)>i)&&(o.push(h.id),r=K(r+g),r>=i))break}if(!o.length){const h=n.find(g=>K(g.creatorShare)>0);if(!h)return{error:"no_earnings"};if(K(h.creatorShare)>a)return{error:"bad_amount"};o.push(h.id),r=K(h.creatorShare)}const c=r,d={id:"po_"+Date.now().toString(36),amount:c,status:"pending",at:Date.now(),earningIds:o,note:"TEST MODE payout request · not real money"},u=(t.earnings||[]).map(h=>o.includes(h.id)?{...h,payoutId:d.id}:h),p={...t,available:K(a-c),holds:K(t.holds+c),earnings:u,payouts:[d,...t.payouts||[]]};return m={...m,creatorWallet:p},L(m),d}function nm(e,t){if(!["pending","completed","rejected"].includes(t))return{error:"bad_status"};const a=Ut(),i=(a.payouts||[]).find(u=>u.id===e);if(!i)return{error:"missing"};if(i.status!=="pending"&&t!=="pending")return{error:"already_final",payout:i};let n=a.available,o=a.holds,r=a.earnings||[];if(i.status==="pending"&&t==="completed")o=K(Math.max(0,o-i.amount));else if(i.status==="pending"&&t==="rejected"){o=K(Math.max(0,o-i.amount)),n=K(n+i.amount);const u=new Set(i.earningIds||[]);r=r.map(p=>u.has(p.id)?{...p,payoutId:null}:p)}const c=a.payouts.map(u=>u.id===e?{...u,status:t,reviewedAt:Date.now()}:u),d={...a,available:n,holds:o,earnings:r,payouts:c};return m={...m,creatorWallet:d},L(m),c.find(u=>u.id===e)}function rm(e){const s={...Ut(),verification:e?"demo_verified":"demo_unverified"};return m={...m,creatorWallet:s},L(m),s}function Tr(){const e=Ut(),t={};for(const s of Object.keys(es))t[s]={category:s,label:es[s].label,creatorPct:es[s].creatorPct,dbsPct:es[s].dbsPct,gross:0,fees:0,net:0,creatorShare:0,dbsShare:0,count:0};for(const s of e.earnings||[]){const a=t[s.category]||(t[s.category]={category:s.category,label:s.label||s.category,creatorPct:s.creatorPct,dbsPct:s.dbsPct,gross:0,fees:0,net:0,creatorShare:0,dbsShare:0,count:0});a.gross=K(a.gross+s.gross),a.fees=K(a.fees+s.fees),a.net=K(a.net+s.net),a.creatorShare=K(a.creatorShare+s.creatorShare),a.dbsShare=K(a.dbsShare+s.dbsShare),a.count+=1}return Object.values(t)}function Hn(e=5,t="Demo credit"){const s=m.wallet||{balance:0,history:[]},a=Number(s.balance||0)+Number(e),i=[...s.history||[],{at:Date.now(),amount:Number(e),note:t}];return m={...m,wallet:{balance:a,history:i}},L(m),m.wallet}function om(e,t="Demo spend"){const s=m.wallet||{balance:0,history:[]},a=Number(e);if(Number(s.balance||0)<a)return{error:"insufficient"};const i=Number(s.balance||0)-a,n=[...s.history||[],{at:Date.now(),amount:-a,note:t}];return m={...m,wallet:{balance:i,history:n}},L(m),m.wallet}function z(e,t){return String(e||"").toLowerCase().includes(t)}function lm(e){const t=String(e||"").trim().toLowerCase(),s={query:String(e||"").trim(),posts:[],profiles:[],music:[],videos:[],lives:[],products:[],pictures:[]};if(!t)return s;const a=(m.posts||[]).filter(h=>z(h.text,t)||z(h.username,t)),i=Object.values(m.profiles||{}).filter(h=>z(h.username,t)||z(h.bio,t));if(m.user){const h=m.user;(z(h.username,t)||z(h.bio,t))&&(i.find(g=>g.id===h.id)||i.push(h))}const n=(m.catalog||[]).filter(h=>h.published),o=n.filter(h=>(h.type==="song"||h.type==="album")&&(z(h.title,t)||z(h.artist,t)||z(h.type,t))),r=n.filter(h=>h.type==="video"&&(z(h.title,t)||z(h.artist,t)||z("video",t))),c=n.filter(h=>h.type==="picture"&&(z(h.title,t)||z(h.artist,t)||z("picture",t))),d=[],u=m.live;u&&!u.endedAt&&(z(u.title,t)||z(u.hostName,t)||z("live",t))&&d.push({...u,status:"live"}),(m.liveHistory||[]).forEach(h=>{(z(h.title,t)||z(h.hostName,t)||z("live",t))&&d.push({...h,status:"ended"})});const p=(m.listings||[]).filter(h=>h.active!==!1&&(z(h.title,t)||z(h.brand,t)||z(h.blurb,t)||z("marketplace",t)||z("product",t)));return{query:String(e||"").trim(),posts:a,profiles:i,music:o,videos:r,lives:d,products:p,pictures:c}}function cm(e=8){const t=m.likes||{},s=(m.posts||[]).map(r=>({kind:"post",id:r.id,title:(r.text||"").slice(0,72)||"Post",subtitle:"@"+(r.username||"creator"),href:"#/posts",score:(t[r.id]||[]).length,image:r.image||""})).sort((r,c)=>c.score-r.score||(c.id>r.id?1:-1)),a=[{kind:"music",id:"trend_music",title:"Long Story Short",subtitle:"Coming Soon · Music",href:"#/music",score:3,image:"/music/01_Long_Story_Short_Coming_Soon.jpg"},{kind:"video",id:"trend_video",title:"Dirty Money ft. Lil Baby",subtitle:"Official MV",href:"#/videos",score:3,image:""},{kind:"live",id:"trend_live",title:"Go live on DBS",subtitle:"Creators · Live",href:"#/live",score:2,image:""},{kind:"market",id:"trend_mkt",title:"Sponsored Marketplace",subtitle:"Brand ads · demo",href:"#/marketplace",score:2,image:""},{kind:"spotlight",id:"trend_spot",title:"24/7 Spotlight",subtitle:"Stage · Discover",href:"#/spotlight",score:1,image:""}],i=m.live;return i&&!i.endedAt&&a.unshift({kind:"live",id:"trend_live_now",title:i.title||"Live now",subtitle:"@"+(i.hostName||"creator")+" · LIVE",href:"#/live",score:99,image:""}),(m.catalog||[]).filter(r=>r.published).slice(0,3).forEach(r=>{const c=r.type==="video"?"#/videos":r.type==="picture"?"#/home":"#/music";a.push({kind:r.type,id:"trend_cat_"+r.id,title:r.title,subtitle:(r.artist||"Admin")+" · From Admin",href:c,score:4,image:r.coverRef&&!String(r.coverRef).startsWith("idb:")?r.coverRef:""})}),[...s,...a].sort((r,c)=>c.score-r.score).slice(0,e)}function dm(){const e=Object.values(m.profiles||{}).map(t=>({id:t.id,username:t.username,bio:t.bio||"",avatar:t.avatar||"",verified:!!t.verified,followers:(t.followers||[]).length}));return m.user&&!e.find(t=>t.id===m.user.id)&&e.push({id:m.user.id,username:m.user.username,bio:m.user.bio||"",avatar:m.user.avatar||"",verified:!!m.user.verified,followers:(m.user.followers||[]).length}),e.sort((t,s)=>s.followers-t.followers||t.username.localeCompare(s.username))}const Yi=6e4,Cr=24*60*60*1e3,um=Object.freeze({voteSeconds:10}),Ea=um.voteSeconds*1e3,Sc=Object.freeze(["test-viewer-1","test-viewer-2","test-viewer-3"]),En=10;function pm(e){return Number(e)+Cr}function mm(e=Date.now()){const t=new Date(e);return t.setHours(23,59,59,999),t.getTime()}function hm(e=Date.now()){const t=new Date(e);return t.setHours(0,0,0,0),t.getTime()}const Pr=[{id:"streamer_maya",name:"MayaBeats",bio:"Test streamer · live now",live:!0},{id:"streamer_jay",name:"JayOnAir",bio:"Test streamer · live now",live:!0}];function xa(e,t=m){return e?Pr.some(s=>s.id===e&&s.live)?!0:!!(t.live&&!t.live.endedAt&&t.live.hostId===e):!1}function ve(){return m.giftBattles||{active:null,history:[],champions:[],prefs:{invitationsEnabled:!0}}}function nt(e){return m={...m,giftBattles:e},L(m),e}function Ir(e,t=Date.now()){if(!e)return e;if(e.status==="active"){if(t<(e.endsAt||0))return e;const r=e.endsAt||t;e={...e,status:"voting",voteStartedAt:r,voteEndsAt:r+Ea,votesA:0,votesB:0,voters:[]}}if(e.status!=="voting"||t<(e.voteEndsAt||0))return e;const s=Number(e.votesA||0),a=Number(e.votesB||0);let i="tie",n=null,o=null;return s>a?(i="win",n=e.challenger.id,o=e.challenger.name):a>s&&(i="win",n=e.opponent.id,o=e.opponent.name),{...e,status:"ended",endedAt:e.voteEndsAt,result:i,winnerId:n,winnerName:o,scoreA:s,scoreB:a,championUntil:n?pm(e.voteEndsAt):null}}function Mr(e,t=m){var a;const s=[...Sc,(a=t.user)==null?void 0:a.id].filter(Boolean);return[...new Set(s)].filter(i=>i!==e.challenger.id&&i!==e.opponent.id&&!xa(i,t))}function fm(e){return{voted:(e.voters||[]).length,eligible:Mr(e).length}}function gm({viewerId:e,side:t}={}){let s=Ms();if(!s||s.status!=="voting")return{error:"not_voting"};if(!["challenger","opponent"].includes(t))return{error:"bad_side"};if(e===s.challenger.id||e===s.opponent.id||xa(e))return{error:"streamer_cannot_vote"};if(!Mr(s).includes(e))return{error:"not_eligible"};if((s.voters||[]).includes(e))return{error:"already_voted"};const a={...s,votesA:s.votesA+(t==="challenger"?1:0),votesB:s.votesB+(t==="opponent"?1:0),voters:[...s.voters,e]};return nt({...ve(),active:a}),{battle:a}}function vm(){return Pr.filter(e=>e.live).map(e=>({...e}))}function Lr(){return{invitationsEnabled:!0,...ve().prefs||{}}}function bm(e={}){const t=ve(),s={...t.prefs,...e};return nt({...t,prefs:s})}function Ms(){const e=ve();let t=e.active;if(!t)return null;if(t.status==="active"||t.status==="voting"){const s=Ir(t);if(s!==t&&s.status==="ended")return Dr(s);s.status==="voting"&&t.status==="active"&&nt({...e,active:s}),t=s}return t}function Dr(e){const t=ve(),s=[e,...(t.history||[]).filter(i=>i.id!==e.id)].slice(0,40);let a=t.champions||[];return e.winnerId&&(a=[{battleId:e.id,userId:e.winnerId,username:e.winnerName,score:e.winnerId===e.challenger.id?e.scoreA:e.scoreB,opponentScore:e.winnerId===e.challenger.id?e.scoreB:e.scoreA,endedAt:e.endedAt,championUntil:e.championUntil,mode:e.mode},...a.filter(n=>n.battleId!==e.id)].slice(0,30)),nt({...t,active:e,history:s,champions:a}),e}function ym({opponentId:e}={}){const t=m.user;if(!t)return{error:"signin"};if(!Lr().invitationsEnabled)return{error:"invites_disabled"};if(!xa(t.id))return{error:"not_streamer"};if(e===t.id)return{error:"self"};const a=Pr.find(r=>r.id===e&&r.live);if(!a||!xa(a.id))return{error:"opponent_not_streamer"};const i=ve(),n=i.active;if(n&&["pending","active","voting"].includes(n.status))return{error:"battle_in_progress",battle:n};const o={id:"gb_"+Date.now().toString(36),status:"pending",mode:"streamer_vs_streamer",testMode:!0,liveId:m.live.id,liveTitle:m.live.title,challenger:{id:t.id,name:t.username},opponent:{id:a.id,name:a.name},createdAt:Date.now(),startedAt:null,endsAt:null,durationMs:Yi,scoreA:0,scoreB:0,giftA:0,giftB:0,votesA:0,votesB:0,voters:[],giftLog:[],result:null,winnerId:null,winnerName:null,endedAt:null,championUntil:null};return nt({...i,active:o}),{battle:o}}function km({actorId:e}={}){var o;const t=ve(),s=t.active;if(!s||s.status!=="pending")return{error:"no_pending"};if(!Lr().invitationsEnabled)return{error:"invites_disabled"};const a=e||((o=m.user)==null?void 0:o.id);if(a!==s.opponent.id)return{error:"not_invitee"};if(!xa(a))return{error:"not_streamer"};const i=Date.now(),n={...s,status:"active",startedAt:i,endsAt:i+(s.durationMs||Yi),scoreA:0,scoreB:0};return nt({...t,active:n}),{battle:n}}function wm({actorId:e}={}){var n;const t=ve(),s=t.active;if(!s||s.status!=="pending")return{error:"no_pending"};if((e||((n=m.user)==null?void 0:n.id))!==s.opponent.id)return{error:"not_invitee"};const a={...s,status:"declined",endedAt:Date.now(),result:"declined"},i=[a,...t.history||[]].slice(0,40);return nt({...t,active:null,history:i}),{battle:a}}function Sm(){const e=ve(),t=e.active;return t&&["pending","active","voting"].includes(t.status)?{error:"still_running",battle:t}:(nt({...e,active:null}),{ok:!0})}function $c(e=Date.now()){const t=m.liveGbChallengePop;return t?t.expiresAt&&e>t.expiresAt?(m={...m,liveGbChallengePop:null},L(m),null):!m.live||m.live.endedAt||t.liveId&&t.liveId!==m.live.id?null:{...t}:null}function Lo(e){const t=m.liveGbChallengePop;return t?e&&t.id!==e?{error:"mismatch"}:(m={...m,liveGbChallengePop:null},L(m),{ok:!0}):{ok:!0}}function $m({side:e="challenger",kind:t="gift",amount:s=2,label:a=""}={}){const i=m.user;if(!i)return{error:"signin"};let n=Ms();if(!n||n.status!=="active")return{error:"no_active"};if(n=ve().active,!n||n.status!=="active")return{error:"ended"};if(!["challenger","opponent"].includes(e))return{error:"bad_side"};const o=Number(s);if(!(o>0))return{error:"bad_amount"};const r=e==="opponent",c=r?n.opponent:n.challenger,d=t==="tip"?"tip":"gift",u={id:"gbg_"+Date.now().toString(36)+"_"+(n.giftLog||[]).length,side:e,toStreamerId:c.id,fromUserId:i.id,fromUsername:i.username,kind:d,amount:o,label:(a||(d==="gift"?"TEST gift":"TEST tip")).slice(0,40),testMode:!0,at:Date.now()},p=Number(n.giftA||0)+(r?0:o),h=Number(n.giftB||0)+(r?o:0);let g={...n,giftA:+p.toFixed(2),giftB:+h.toFixed(2),giftLog:[...n.giftLog||[],u]};return g=Ir(g),g.status==="ended"?Dr(g):nt({...ve(),active:g}),{battle:g,entry:u}}function _r(){const e=ve(),t=e.active;if(!t||!["active","voting"].includes(t.status))return t;const s=Ir(t);return s.status==="voting"&&t.status==="active"&&nt({...e,active:s}),s.status==="ended"&&t.status!=="ended"?Dr(s):s}function Em(e=20){return(ve().history||[]).slice(0,e)}function xm(e=Date.now()){const t=ve(),s=t.active;return s&&s.status==="ended"&&s.winnerId&&s.championUntil&&e<s.championUntil?{battleId:s.id,userId:s.winnerId,username:s.winnerName,score:s.winnerId===s.challenger.id?s.scoreA:s.scoreB,endedAt:s.endedAt,championUntil:s.championUntil,mode:s.mode}:(t.champions||[]).find(i=>i.championUntil&&e<i.championUntil)||null}function Am(e=15){var s;const t={};for(const a of ve().history||[]){if(a.result!=="win"||!a.winnerId)continue;const i=t[a.winnerId]||{userId:a.winnerId,username:a.winnerName,wins:0,points:0};i.wins+=1;const n=a.winnerId===((s=a.challenger)==null?void 0:s.id)?Number(a.scoreA||0):Number(a.scoreB||0);i.points=+(i.points+n).toFixed(2),i.username=a.winnerName||i.username,t[a.winnerId]=i}return Object.values(t).sort((a,i)=>i.wins-a.wins||i.points-a.points||a.username.localeCompare(i.username)).slice(0,e)}function Or(e=En,t=Date.now()){var c;const s=Math.min(Math.max(1,Number(e)||En),En),a=hm(t),i=mm(t),n=new Set,o=[],r=d=>{if(!(d!=null&&d.userId)||!(d!=null&&d.username)||n.has(d.userId))return;const u=Number(d.endedAt||0);u<a||u>i||d.championUntil&&t>d.championUntil||(n.add(d.userId),o.push({userId:d.userId,username:d.username,score:Number(d.score||0),endedAt:u,championUntil:d.championUntil||i,battleId:d.battleId||d.id||null,mode:d.mode||"demo"}))};for(const d of ve().champions||[])if(r(d),o.length>=s)return o;for(const d of ve().history||[])if(!(d.result!=="win"||!d.winnerId)&&(r({userId:d.winnerId,username:d.winnerName,score:d.winnerId===((c=d.challenger)==null?void 0:c.id)?d.scoreA:d.scoreB,endedAt:d.endedAt,championUntil:d.championUntil||i,battleId:d.id,mode:d.mode}),o.length>=s))break;return o}const qr=4,zn=[{id:"maya",username:"MayaBeats",bio:"Creator · beats & live demos"},{id:"fanjay",username:"FanJay",bio:"Day-one fan · playlist curator"},{id:"ria",username:"RiaLoops",bio:"Demo co-host · loops & hooks"},{id:"dez",username:"DezOnMic",bio:"Demo guest · freestyle nights"}];function je(){return m.multiGuest||{active:null,history:[]}}function rt(e){return m={...m,multiGuest:e},L(m),e}function Ra(e,t){const s=[e,...t],a=s.length||1,i=Math.floor(100/a*100)/100,n={};let o=0;return s.forEach((r,c)=>{c===s.length-1?n[r]=+(100-o).toFixed(2):(n[r]=i,o=+(o+i).toFixed(2))}),n}function Ji(){qa();const e={...m.profiles||{}};let t=!1;for(const s of zn)e[s.id]||(e[s.id]={id:s.id,username:s.username,bio:s.bio,avatar:"",followers:[],following:["dbs"],verified:!1},t=!0);return t&&(m={...m,profiles:e},L(m)),zn.map(s=>{const a=m.profiles[s.id]||s;return{id:s.id,username:a.username||s.username,bio:a.bio||s.bio,followers:(a.followers||[]).length}})}function Tm(){return Ji()}function Aa(){return je().active||null}function Cm(e=20){return(je().history||[]).slice(0,e)}function Pm(e){const t=m.user;if(!t)return{error:"signin"};const s=je();if(s.active&&!s.active.endedAt)return{error:"session_in_progress",session:s.active};const a=String(e||"").trim().slice(0,80)||"Multi-Guest Live";Ji();const i={id:"mg_"+Date.now().toString(36),title:a,hostId:t.id,hostName:t.username,startedAt:Date.now(),endedAt:null,maxGuests:qr,guests:[],chat:[{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:"Multi-guest session started · TEST MODE · no camera / WebRTC",at:Date.now(),system:!0}],giftSplit:{mode:"equal",shares:{[t.id]:100},disclosed:!1,disclosedAt:null},broadcastReady:!1};return rt({...s,active:i}),{session:i}}function Im(e){var h;const t=m.user;if(!t)return{error:"signin"};const s=je(),a=s.active;if(!a||a.endedAt)return{error:"no_session"};if(a.hostId!==t.id)return{error:"host_only"};Ji();const i=zn.find(g=>g.id===e),n=(h=m.profiles)==null?void 0:h[e];if(!i&&!n)return{error:"unknown_guest"};if(e===t.id||e===a.hostId)return{error:"self"};const o=(a.guests||[]).find(g=>g.id===e);if(o&&(o.status==="invited"||o.status==="joined"))return{error:"already_invited",session:a};if((a.guests||[]).filter(g=>g.status==="joined"||g.status==="invited").length>=(a.maxGuests||qr))return{error:"full"};const c={id:e,username:(n==null?void 0:n.username)||(i==null?void 0:i.username)||e,status:"invited",muted:!1,invitedAt:Date.now(),joinedAt:null},d=[...(a.guests||[]).filter(g=>g.id!==e),c],u=[...a.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`Invited @${c.username} to the stage`,at:Date.now(),system:!0}].slice(-80),p={...a,guests:d,chat:u,broadcastReady:!1};return p.giftSplit={...p.giftSplit,disclosed:!1,disclosedAt:null,shares:Ra(a.hostId,d.filter(g=>g.status==="joined").map(g=>g.id))},rt({...s,active:p}),{session:p,guest:c}}function Mm(e){var u;const t=m.user;if(!t)return{error:"signin"};const s=je(),a=s.active;if(!a||a.endedAt)return{error:"no_session"};if(a.hostId!==t.id)return{error:"host_only"};const i=(a.guests||[]).map(p=>({...p})),n=i.findIndex(p=>p.id===e);if(n<0)return{error:"not_found"};if(i[n].status==="joined")return{session:a,guest:i[n]};if(i.filter(p=>p.status==="joined").length>=(a.maxGuests||qr))return{error:"full"};i[n]={...i[n],status:"joined",joinedAt:Date.now(),muted:!1};const r=i.filter(p=>p.status==="joined").map(p=>p.id),c=[...a.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`@${i[n].username} joined the stage`,at:Date.now(),system:!0}].slice(-80),d={...a,guests:i,chat:c,broadcastReady:!1,giftSplit:{mode:((u=a.giftSplit)==null?void 0:u.mode)||"equal",shares:Ra(a.hostId,r),disclosed:!1,disclosedAt:null}};return rt({...s,active:d}),{session:d,guest:i[n]}}function Lm(e){var c;const t=m.user;if(!t)return{error:"signin"};const s=je(),a=s.active;if(!a||a.endedAt)return{error:"no_session"};if(a.hostId!==t.id)return{error:"host_only"};const i=(a.guests||[]).map(d=>d.id===e?{...d,status:"declined"}:d);if(!(a.guests||[]).some(d=>d.id===e))return{error:"not_found"};const n=((c=(a.guests||[]).find(d=>d.id===e))==null?void 0:c.username)||e,o=[...a.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`@${n} declined the invite`,at:Date.now(),system:!0}].slice(-80),r={...a,guests:i,chat:o};return rt({...s,active:r}),{session:r}}function Dm(e){var d,u;const t=m.user;if(!t)return{error:"signin"};const s=je(),a=s.active;if(!a||a.endedAt)return{error:"no_session"};if(a.hostId!==t.id&&t.id!==e)return{error:"forbidden"};const i=(a.guests||[]).map(p=>p.id===e?{...p,status:"left",muted:!1}:p);if(!(a.guests||[]).some(p=>p.id===e))return{error:"not_found"};const n=((d=(a.guests||[]).find(p=>p.id===e))==null?void 0:d.username)||e,o=i.filter(p=>p.status==="joined").map(p=>p.id),r=[...a.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`@${n} left the stage`,at:Date.now(),system:!0}].slice(-80),c={...a,guests:i,chat:r,broadcastReady:!1,giftSplit:{mode:((u=a.giftSplit)==null?void 0:u.mode)||"equal",shares:Ra(a.hostId,o),disclosed:!1,disclosedAt:null}};return rt({...s,active:c}),{session:c}}function _m(e){var d,u;const t=m.user;if(!t)return{error:"signin"};const s=je(),a=s.active;if(!a||a.endedAt)return{error:"no_session"};if(a.hostId!==t.id)return{error:"host_only"};const i=(a.guests||[]).map(p=>p.id===e?{...p,status:"removed",muted:!1}:p);if(!(a.guests||[]).some(p=>p.id===e))return{error:"not_found"};const n=((d=(a.guests||[]).find(p=>p.id===e))==null?void 0:d.username)||e,o=i.filter(p=>p.status==="joined").map(p=>p.id),r=[...a.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:`Host removed @${n} from the stage`,at:Date.now(),system:!0}].slice(-80),c={...a,guests:i,chat:r,broadcastReady:!1,giftSplit:{mode:((u=a.giftSplit)==null?void 0:u.mode)||"equal",shares:Ra(a.hostId,o),disclosed:!1,disclosedAt:null}};return rt({...s,active:c}),{session:c}}function Om(e,t=!0){var d;const s=m.user;if(!s)return{error:"signin"};const a=je(),i=a.active;if(!i||i.endedAt)return{error:"no_session"};if(i.hostId!==s.id)return{error:"host_only"};const n=(i.guests||[]).map(u=>u.id===e&&u.status==="joined"?{...u,muted:!!t}:u);if(!(i.guests||[]).some(u=>u.id===e&&u.status==="joined"))return{error:"not_joined"};const o=((d=(i.guests||[]).find(u=>u.id===e))==null?void 0:d.username)||e,r=[...i.chat||[],{id:"c_"+Date.now().toString(36),userId:"system",username:"DBS",text:t?`Host muted @${o}`:`Host unmuted @${o}`,at:Date.now(),system:!0}].slice(-80),c={...i,guests:n,chat:r};return rt({...a,active:c}),{session:c}}function qm(e){const t=m.user;if(!t)return{error:"signin"};const s=je(),a=s.active;if(!a||a.endedAt)return{error:"no_session"};const i=String(e||"").trim().slice(0,280);if(!i)return{error:"empty"};const n={id:"c_"+Date.now().toString(36),userId:t.id,username:t.username,text:i,at:Date.now()},o=[...a.chat||[],n].slice(-80),r={...a,chat:o};return rt({...s,active:r}),{session:r,message:n}}function ra({mode:e="equal",shares:t=null,disclose:s=!1}={}){var h,g;const a=m.user;if(!a)return{error:"signin"};const i=je(),n=i.active;if(!n||n.endedAt)return{error:"no_session"};if(n.hostId!==a.id)return{error:"host_only"};const o=(n.guests||[]).filter(v=>v.status==="joined").map(v=>v.id),r=[n.hostId,...o];let c,d=e==="custom"?"custom":"equal";if(d==="equal")c=Ra(n.hostId,o);else{c={};let v=0;for(const b of r){const y=Math.max(0,Number(t==null?void 0:t[b])||0);c[b]=+y.toFixed(2),v+=c[b]}if(v=+v.toFixed(2),Math.abs(v-100)>.05)return{error:"split_total",total:v,expected:100}}const u={mode:d,shares:c,disclosed:!!s||!!((h=n.giftSplit)!=null&&h.disclosed),disclosedAt:s?Date.now():((g=n.giftSplit)==null?void 0:g.disclosedAt)||null};s&&(u.disclosed=!0),s&&(u.disclosedAt=Date.now());const p={...n,giftSplit:u,broadcastReady:!!u.disclosed};return rt({...i,active:p}),{session:p}}function Rm(){var e,t,s,a;return ra({mode:((t=(e=Aa())==null?void 0:e.giftSplit)==null?void 0:t.mode)||"equal",shares:((a=(s=Aa())==null?void 0:s.giftSplit)==null?void 0:a.shares)||null,disclose:!0})}function Nm(){const e=m.user;if(!e)return{error:"signin"};const t=je(),s=t.active;if(!s||s.endedAt)return{error:"no_session"};if(s.hostId!==e.id)return{error:"host_only"};const a={...s,endedAt:Date.now(),broadcastReady:!1},i=[a,...(t.history||[]).filter(n=>n.id!==a.id)].slice(0,20);return rt({active:null,history:i}),{session:a}}const Ec=["song","album","video","live","app","interview"],Rr=["draft","active","paused","ended"];function us(e){if(!e||typeof e!="object")return null;const t=e.fundSource==="third_party"?"third_party":"dbs",s=Ec.includes(e.promoteType)?e.promoteType:"app",a=Rr.includes(e.status)?e.status:"draft",i=Number(e.deadline)||0;return{id:String(e.id||""),title:String(e.title||"").slice(0,120),promoteType:s,budget:Math.max(0,Number(e.budget)||0),deadline:i,fundSource:t,managementFeePct:t==="third_party"?20:0,reward:String(e.reward||"").slice(0,200),status:a,participants:Array.isArray(e.participants)?e.participants:[],submissions:Array.isArray(e.submissions)?e.submissions:[],createdAt:Number(e.createdAt)||Date.now(),createdBy:e.createdBy||null}}function Bs(e){m={...m,missions:e},L(m)}function Qi({status:e=null}={}){const t=(m.missions||[]).map(us).filter(Boolean);if(!e)return t;const s=Array.isArray(e)?e:[e];return t.filter(a=>s.includes(a.status))}function Bm(e){return Qi().find(t=>t.id===e)||null}function Km(e={}){var r;const t=String(e.title||"").trim().slice(0,120);if(!t)return{error:"required"};const s=Ec.includes(e.promoteType)?e.promoteType:"app",a=e.fundSource==="third_party"?"third_party":"dbs";let i=e.deadline;if(typeof i=="string"&&i){const c=Date.parse(i);i=Number.isFinite(c)?c:Date.now()+7*864e5}else i=Number(i)||Date.now()+7*864e5;const n=Rr.includes(e.status)?e.status:"active",o=us({id:"msn_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),title:t,promoteType:s,budget:Number(e.budget)||0,deadline:i,fundSource:a,reward:String(e.reward||"").trim().slice(0,200)||"Demo reward · TEST MODE",status:n,participants:[],submissions:[],createdAt:Date.now(),createdBy:((r=m.user)==null?void 0:r.id)||"demo_admin"});return Bs([o,...m.missions||[]]),o}function jm(e,t){if(!Rr.includes(t))return{error:"bad_status"};let s=null;const a=(m.missions||[]).map(i=>{const n=us(i);return!n||n.id!==e?i:(s={...n,status:t},s)});return s?(Bs(a),s):{error:"not_found"}}function Fm(e){const t=m.user;if(!t)return{error:"signin"};let s=null;const a=(m.missions||[]).map(i=>{const n=us(i);if(!n||n.id!==e)return i;if(n.status!=="active")return s={error:"not_active",mission:n},i;if((n.participants||[]).some(c=>c.userId===t.id))return s={error:"already_joined",mission:n},i;const r={userId:t.id,username:t.username||"creator",joinedAt:Date.now(),score:0,referralCode:"REF-"+t.id.slice(0,6).toUpperCase()+"-"+Math.random().toString(36).slice(2,5).toUpperCase()};return s={...n,participants:[...n.participants||[],r]},s});return s?(s.error||Bs(a),s):{error:"not_found"}}function Um(e,{proof:t=""}={}){const s=m.user;if(!s)return{error:"signin"};const a=String(t||"").trim().slice(0,400);if(!a)return{error:"required"};let i=null;const n=(m.missions||[]).map(o=>{const r=us(o);if(!r||r.id!==e)return o;if(r.status!=="active")return i={error:"not_active",mission:r},o;if(!(r.participants||[]).some(p=>p.userId===s.id))return i={error:"not_joined",mission:r},o;const d={id:"sub_"+Date.now().toString(36)+Math.random().toString(36).slice(2,5),userId:s.id,username:s.username||"creator",proof:a,at:Date.now(),status:"pending"},u=(r.participants||[]).map(p=>p.userId===s.id?{...p,score:(Number(p.score)||0)+10}:p);return i={...r,participants:u,submissions:[d,...r.submissions||[]]},i});return i?(i.error||Bs(n),i):{error:"not_found"}}function Gm(e,t=5){const s=m.user;if(!s)return{error:"signin"};const a=Math.max(1,Math.min(50,Number(t)||5));let i=null;const n=(m.missions||[]).map(o=>{const r=us(o);if(!r||r.id!==e)return o;if(!(r.participants||[]).some(u=>u.userId===s.id))return i={error:"not_joined",mission:r},o;const d=(r.participants||[]).map(u=>u.userId===s.id?{...u,score:(Number(u.score)||0)+a}:u);return i={...r,participants:d},i});return i?(i.error||Bs(n),i):{error:"not_found"}}function Vm(e){const t=Bm(e);return t?[...t.participants||[]].map(s=>({userId:s.userId,username:s.username,score:Number(s.score)||0,referralCode:s.referralCode||"",joinedAt:s.joinedAt,submissions:(t.submissions||[]).filter(a=>a.userId===s.userId).length})).sort((s,a)=>a.score-s.score||(s.joinedAt||0)-(a.joinedAt||0)):[]}function Hm({force:e=!1}={}){if((m.missions||[]).length&&!e)return{skipped:!0,missions:Qi()};const s=Date.now(),a=864e5,i=[{id:"msn_demo_song",title:"Push Long Story Short (clip challenge)",promoteType:"song",budget:2500,deadline:s+14*a,fundSource:"dbs",reward:"$50–$200 demo credits by rank · DBS-funded marketing",status:"active",participants:[{userId:"clipper_demo",username:"ClipQueen",joinedAt:s-2*a,score:42,referralCode:"REF-CLIP-AAA"},{userId:"dbs",username:"DatBoiSkeet",joinedAt:s-a,score:28,referralCode:"REF-DBS-001"}],submissions:[{id:"sub_demo1",userId:"clipper_demo",username:"ClipQueen",proof:"https://example.com/tiktok/lss-clip-1 · 12k views",at:s-a,status:"pending"}],createdAt:s-3*a,createdBy:"demo_admin"},{id:"msn_demo_live",title:"Boost Friday Night Live",promoteType:"live",budget:800,deadline:s+5*a,fundSource:"third_party",reward:"Share of $800 pot after 20% management fee",status:"active",participants:[],submissions:[],createdAt:s-a,createdBy:"demo_admin"},{id:"msn_demo_app",title:"Download DBS · invite 3 friends",promoteType:"app",budget:1200,deadline:s+30*a,fundSource:"dbs",reward:"Referral bonus stack · verified installs only",status:"active",participants:[],submissions:[],createdAt:s-5*a,createdBy:"demo_admin"},{id:"msn_demo_ended",title:"Ladies Only teaser push (ended)",promoteType:"video",budget:500,deadline:s-2*a,fundSource:"third_party",reward:"Completed · demo archive",status:"ended",participants:[{userId:"clipper_demo",username:"ClipQueen",joinedAt:s-10*a,score:90,referralCode:"REF-CLIP-OLD"}],submissions:[],createdAt:s-20*a,createdBy:"demo_admin"}].map(us);return Bs(i),{seeded:i.length,missions:i}}const xc=60*1e3,Nr=60*1e3,Ta=2,Xi=3,Zi=3,Na=3,zm=["song","beat","music_video"],Wm=[...zm,"freestyle"];function Ac(){const e=m.spotlight||{};return{nowPlaying:e.nowPlaying||null,queue:Array.isArray(e.queue)?e.queue:[],history:Array.isArray(e.history)?e.history:[],houseIndex:typeof e.houseIndex=="number"?e.houseIndex:0}}function we(e){return m={...m,spotlight:e},L(m),e}function Ym(e){return e==="freestyle"?"Live Freestyle":e==="beat"?"Beat":e==="music_video"?"Music Video":"Song"}function Wn(e,t="ended"){return e?{id:e.id,userId:e.userId,username:e.username,type:e.type,title:e.title,artist:e.artist,startedAt:e.startedAt,endedAt:Date.now(),extensions:e.extensions||0,playCount:e.playCount||1,reason:t}:null}function pe(e=Date.now()){let t=Ac(),s=t.nowPlaying;if(!s)return Jm(t,e);if(s.house)return t;if(s.type==="freestyle"&&s.endsAt&&e>=s.endsAt&&!s.awaitingPlayAnother){if(Object.keys(s.keepGoingVotes||{}).length>=Xi&&(s.extensions||0)<Ta&&!s.extensionApplied){s={...s,extensions:(s.extensions||0)+1,endsAt:e+Nr,keepGoingVotes:{},extensionApplied:!1,voteWindowOpen:!0};const u={...t,nowPlaying:s};return we(u),u}const n=[Wn(s,"timer"),...t.history||[]].slice(0,30),o=[...t.queue||[]];let r=null,c=typeof t.houseIndex=="number"?t.houseIndex:0;if(o.length){const u=o.shift();r=wi(u,e)}else r=Si(cs(c),e);const d={nowPlaying:r,queue:o,history:n,houseIndex:c};return we(d),d}if(s.awaitingPlayAnother&&s.playAnotherDeadline&&e>=s.playAnotherDeadline){const a=Object.keys(s.playAnotherVotes||{}).length,i=s.playCount||1;if(a>=Zi&&i<Na){s={...s,awaitingPlayAnother:!1,playAnotherVotes:{},playAnotherDeadline:null,playCount:i+1,title:s.nextTitle||s.title,startedAt:e,endsAt:null,nextTitle:null};const u={...t,nowPlaying:s};return we(u),u}const n=[Wn(s,"play_another_fail"),...t.history||[]].slice(0,30),o=[...t.queue||[]];let r=null,c=typeof t.houseIndex=="number"?t.houseIndex:0;o.length?r=wi(o.shift(),e):r=Si(cs(c),e);const d={nowPlaying:r,queue:o,history:n,houseIndex:c};return we(d),d}return t}function wi(e,t=Date.now()){const s=e.type==="freestyle";return{id:"sp_"+t.toString(36)+"_"+Math.random().toString(36).slice(2,6),userId:e.userId,username:e.username,type:e.type,title:e.title||(s?"Live Freestyle":"Untitled"),artist:e.artist||e.username,cover:e.cover||"",startedAt:t,endsAt:s?t+xc:null,extensions:0,playCount:1,keepGoingVotes:{},playAnotherVotes:{},voteWindowOpen:s,awaitingPlayAnother:!1,playAnotherDeadline:null,reactions:{fire:0,heart:0,clap:0},chat:[{id:"c_"+t.toString(36),userId:"system",username:"DBS",text:`${e.username} took the Spotlight · ${Ym(e.type)} · TEST MODE`,at:t,system:!0}]}}function ce(){const e=pe();return{nowPlaying:e.nowPlaying||null,queue:[...e.queue||[]],history:[...e.history||[]],houseIndex:typeof e.houseIndex=="number"?e.houseIndex:0,thresholds:{keepGoing:Xi,playAnother:Zi,maxExtensions:Ta,maxUploadStreak:Na,freestyleMs:xc}}}function Tc(){const e=[];for(const s of fe||[])!s||!s.embed||(s.category==="Music Videos"?e.push({id:s.id,title:s.title,artist:s.artist||"DatBoiSkeet",embed:s.embed,youtube:s.youtube||"",kind:"music_video",chipLabel:"House · Music Video",note:"DatBoiSkeet catalog · original YouTube · not a live act",cover:s.cover||""}):s.category==="Interviews"&&e.push({id:s.id,title:s.title,artist:s.artist||"DatBoiSkeet",embed:s.embed,youtube:s.youtube||"",kind:"interview",chipLabel:"House · Interview",note:"DatBoiSkeet interview · original YouTube · not a live act",cover:s.cover||""}));const t=(Un||[]).find(s=>s.id==="pl-vlogs");if(t&&t.youtube){const s=String(t.youtube).match(/[?&]list=([^&]+)/),a=s&&s[1];a&&e.push({id:"house-bts-vlogs",title:t.title||"DatBoiSkeet Vlogs",artist:"DatBoiSkeet",embed:"https://www.youtube.com/embed/videoseries?list="+a,youtube:t.youtube,kind:"bts",chipLabel:"House · BTS",note:"Channel vlogs · dedicated BTS clips thin · original YouTube · not a live act",cover:""})}return e}function Cc(){const e=Tc().length;return e>0?e:1}function cs(e){const t=Tc();if(!t.length)return{id:"house_empty",title:"DatBoiSkeet catalog",artist:"DatBoiSkeet",embed:"",youtube:"https://www.youtube.com/@DatBoiSkeet1",kind:"music_video",chipLabel:"House · Music Video",note:"Catalog loading · not a live act",cover:"",status:"House rotation"};const s=(e%t.length+t.length)%t.length;return{...t[s],status:t[s].chipLabel}}function Si(e,t=Date.now()){return{id:"house_"+(e.id||"x")+"_"+t.toString(36),userId:"dbs",username:"DatBoiSkeet",type:"music_video",house:!0,houseKind:e.kind||"music_video",chipLabel:e.chipLabel||"House · Music Video",title:e.title,artist:e.artist||"DatBoiSkeet",embed:e.embed||"",youtube:e.youtube||"",note:e.note||"House catalog · not a live act",cover:e.cover||"",startedAt:t,endsAt:null,extensions:0,playCount:1,keepGoingVotes:{},playAnotherVotes:{},voteWindowOpen:!1,awaitingPlayAnother:!1,playAnotherDeadline:null,reactions:{fire:0,heart:0,clap:0},chat:[{id:"c_house_"+t.toString(36),userId:"system",username:"DBS",text:`House catalog · ${e.chipLabel||"House"} · ${e.title} · not a live act · TEST MODE`,at:t,system:!0}]}}function Jm(e,t=Date.now()){if(e.nowPlaying)return e;const s=typeof e.houseIndex=="number"?e.houseIndex:0,a=cs(s),i=Si(a,t),n={...e,nowPlaying:i,houseIndex:s};return we(n),n}function Pc(){const e=Ac();return cs(typeof e.houseIndex=="number"?e.houseIndex:0)}function Qm({type:e="song",title:t="",artist:s=""}={}){const a=m.user;if(!a)return{error:"signin"};const i=Wm.includes(e)?e:"song",n=pe(),o=a.id,r=(n.queue||[]).some(b=>b.userId===o),c=n.nowPlaying&&!n.nowPlaying.house&&n.nowPlaying.userId===o&&!n.nowPlaying.awaitingPlayAnother;if(r||c)return{error:"already_queued",state:ce()};const d=String(t||"").trim().slice(0,80)||(i==="freestyle"?"Live Freestyle":i==="beat"?"Untitled Beat":i==="music_video"?"Untitled MV":"Untitled Song"),u=String(s||a.username||"").trim().slice(0,60),p={id:"q_"+Date.now().toString(36),userId:o,username:a.username,type:i,title:d,artist:u,cover:"",joinedAt:Date.now()};let h=n.nowPlaying,g=[...n.queue||[]],v=typeof n.houseIndex=="number"?n.houseIndex:0;return h?(h.house,g.push(p)):(h=wi(p),g=[]),we({...n,nowPlaying:h,queue:g,houseIndex:v}),{ok:!0,state:ce()}}function Do(){const e=m.user;if(!e)return{error:"signin"};const t=pe(),s=(t.queue||[]).length,a=(t.queue||[]).filter(i=>i.userId!==e.id);return a.length===s?{error:"not_in_queue"}:(we({...t,queue:a}),{ok:!0,state:ce()})}function Xm(e){if(!m.user)return{error:"signin"};const s=pe(),a=(s.queue||[]).filter(i=>i.id!==e);return we({...s,queue:a}),{ok:!0,state:ce()}}function Ic(e="advance"){if(!m.user)return{error:"signin"};const s=pe(),a=s.nowPlaying,i=!!(a&&a.house),n=a&&!i?[Wn(a,e),...s.history||[]].slice(0,30):[...s.history||[]],o=[...s.queue||[]];let r=typeof s.houseIndex=="number"?s.houseIndex:0;i&&(r=(r+1)%Cc());let c=null;return o.length?c=wi(o.shift()):c=Si(cs(r)),we({nowPlaying:c,queue:o,history:n,houseIndex:r}),{ok:!0,state:ce()}}function Zm(){return Ic("skip")}function eh(){const e=m.user;if(!e)return{error:"signin"};const t=pe(),s=t.nowPlaying;if(!s)return{error:"empty_stage"};if(s.house)return{error:"house_use_skip"};if(s.type==="freestyle")return{error:"freestyle_use_timer"};if(s.awaitingPlayAnother)return{error:"already_voting"};!(s.userId===e.id)&&ee();const i=s.playCount||1;if(i>=Na)return Ic("max_streak");const n={...s,awaitingPlayAnother:!0,playAnotherVotes:{},playAnotherDeadline:Date.now()+30*1e3,nextTitle:s.title+" (take "+(i+1)+")"};return we({...t,nowPlaying:n}),{ok:!0,state:ce()}}function th(){const e=m.user;if(!e)return{error:"signin"};const t=pe(),s=t.nowPlaying;if(!s||s.type!=="freestyle")return{error:"no_freestyle"};if(!s.voteWindowOpen)return{error:"window_closed"};if(s.awaitingPlayAnother)return{error:"wrong_mode"};if((s.extensions||0)>=Ta)return{error:"max_extensions"};const a={...s.keepGoingVotes||{}};if(a[e.id])return{error:"already_voted",state:ce()};a[e.id]=Date.now();let i={...s,keepGoingVotes:a};const n=Object.keys(a).length;return n>=Xi&&(s.extensions||0)<Ta&&(i={...i,extensions:(s.extensions||0)+1,endsAt:Date.now()+Nr,keepGoingVotes:{},voteWindowOpen:!0}),we({...t,nowPlaying:i}),{ok:!0,state:ce(),votes:Object.keys(i.keepGoingVotes||{}).length||n}}function sh(e=2){const t=pe(),s=t.nowPlaying;if(!s||s.type!=="freestyle")return{error:"no_freestyle"};const a={...s.keepGoingVotes||{}},i=Object.keys(a).length;for(let r=0;r<e;r++){const c="fan_sim_"+(i+r)+"_"+Date.now().toString(36);a[c]=Date.now()}let n={...s,keepGoingVotes:a};return Object.keys(a).length>=Xi&&(s.extensions||0)<Ta&&(n={...n,extensions:(s.extensions||0)+1,endsAt:Date.now()+Nr,keepGoingVotes:{},voteWindowOpen:!0}),we({...t,nowPlaying:n}),{ok:!0,state:ce()}}function ah(){const e=m.user;if(!e)return{error:"signin"};const t=pe(),s=t.nowPlaying;if(!s||!s.awaitingPlayAnother)return{error:"no_vote"};const a={...s.playAnotherVotes||{}};if(a[e.id])return{error:"already_voted",state:ce()};a[e.id]=Date.now();let i={...s,playAnotherVotes:a};const n=Object.keys(a).length,o=s.playCount||1;return n>=Zi&&o<Na&&(i={...i,awaitingPlayAnother:!1,playAnotherVotes:{},playAnotherDeadline:null,playCount:o+1,title:s.nextTitle||s.title,startedAt:Date.now(),endsAt:null,nextTitle:null}),we({...t,nowPlaying:i}),{ok:!0,state:ce()}}function ih(e=2){const t=pe(),s=t.nowPlaying;if(!s||!s.awaitingPlayAnother)return{error:"no_vote"};const a={...s.playAnotherVotes||{}},i=Object.keys(a).length;for(let c=0;c<e;c++)a["fan_pa_"+(i+c)+"_"+Date.now().toString(36)]=Date.now();let n={...s,playAnotherVotes:a};const o=Object.keys(a).length,r=s.playCount||1;return o>=Zi&&r<Na&&(n={...n,awaitingPlayAnother:!1,playAnotherVotes:{},playAnotherDeadline:null,playCount:r+1,title:s.nextTitle||s.title,startedAt:Date.now(),endsAt:null,nextTitle:null}),we({...t,nowPlaying:n}),{ok:!0,state:ce()}}function nh(e="fire"){const t=pe(),s=t.nowPlaying;if(!s)return{error:"empty_stage"};const a=["fire","heart","clap"].includes(e)?e:"fire",i={...s.reactions||{fire:0,heart:0,clap:0}};return i[a]=(i[a]||0)+1,we({...t,nowPlaying:{...s,reactions:i}}),{ok:!0,state:ce()}}function rh(e){const t=m.user;if(!t)return{error:"signin"};const s=String(e||"").trim().slice(0,200);if(!s)return{error:"empty"};const a=pe(),i=a.nowPlaying;if(!i)return{error:"empty_stage"};const n=[...i.chat||[],{id:"c_"+Date.now().toString(36),userId:t.id,username:t.username,text:s,at:Date.now()}].slice(-40);return we({...a,nowPlaying:{...i,chat:n}}),{ok:!0,state:ce()}}function oh(e=20){return(pe().history||[]).slice(0,e)}function ot(){const e=m.fanClubs||{clubs:[],posts:{},seeded:!1};return{clubs:Array.isArray(e.clubs)?e.clubs:[],posts:e.posts&&typeof e.posts=="object"?e.posts:{},seeded:!!e.seeded}}function Ks(e){m={...m,fanClubs:e},L(m)}function Mc(e){return e+"_"+Date.now().toString(36)+Math.random().toString(36).slice(2,7)}function Lc(){return lt(),ot().clubs.slice().sort((e,t)=>e.official&&!t.official?-1:!e.official&&t.official?1:(t.memberCount||0)-(e.memberCount||0))}function Ba(e){return lt(),ot().clubs.find(t=>t.id===e)||null}function lt({force:e=!1}={}){const t=ot();if(t.seeded&&!e&&t.clubs.length>0)return{skipped:!0,clubs:t.clubs};const s=Date.now(),a=864e5,i=[{id:"fc_official_dbs",name:"DatBoiSkeet Official",description:"Official DatBoiSkeet fan club inside DBS Lounge. Music drops, Vault tips, Foreign X-Change, and community rules — DBS branding first. Follow optional.",graphic:"/brand/pikk-logo-square.png",hostId:"dbs",hostName:"DatBoiSkeet",privacy:"public",official:!0,members:["dbs"],followers:["dbs"],mods:["dbs"],memberCount:1,createdAt:s-14*a},{id:"fc_lss_crew",name:"Long Story Short Crew",description:"Creator club for LSS listeners. Public lounge chat + PIKK+ members-only drop room.",graphic:"/music/01_Long_Story_Short_Coming_Soon.jpg",hostId:"dbs",hostName:"DatBoiSkeet",privacy:"members",official:!1,members:["dbs"],followers:["dbs"],mods:["dbs"],memberCount:1,createdAt:s-7*a},{id:"fc_ladies_only",name:"Ladies Only Circle",description:"Paid / PIKK+ gated room demo for Ladies Only supporters. Unlock via membership TEST MODE.",graphic:"/music/02_Ladies_Only_Coming_Soon.jpg",hostId:"dbs",hostName:"DatBoiSkeet",privacy:"paid",official:!1,members:["dbs"],followers:[],mods:["dbs"],memberCount:1,createdAt:s-3*a}],n={fc_official_dbs:[{id:"fcp_welcome",userId:"dbs",username:"DatBoiSkeet",text:"Welcome to the official club. Discover music on #/music · explore more on #/explore. No forced follows.",at:s-2*a,pinned:!0,removed:!1},{id:"fcp_lounge",userId:"dbs",username:"DatBoiSkeet",text:"DBS Lounge rooms stay music-first. Keep it respectful — see Community Guidelines.",at:s-a,pinned:!1,removed:!1}],fc_lss_crew:[{id:"fcp_lss1",userId:"dbs",username:"DatBoiSkeet",text:"LSS cover art is live in Coming Soon. Members can discuss theories here.",at:s-a,pinned:!1,removed:!1}],fc_ladies_only:[{id:"fcp_lo1",userId:"dbs",username:"DatBoiSkeet",text:"PIKK+ members-only preview chat. Join PIKK+ on Pricing (TEST MODE) to unlock.",at:s-12*36e5,pinned:!0,removed:!1}]};return Ks({clubs:i,posts:n,seeded:!0}),{seeded:i.length,clubs:i}}function lh({name:e,description:t,graphic:s,privacy:a="public"}={}){const i=m.user;if(!i)return{error:"signin"};const n=String(e||"").trim().slice(0,48);if(!n)return{error:"name"};const o=["public","members","paid"].includes(a)?a:"public";lt();const r=ot(),c={id:Mc("fc"),name:n,description:String(t||"").trim().slice(0,280),graphic:String(s||"/brand/pikk-logo-square.png").slice(0,200),hostId:i.id,hostName:i.username,privacy:o,official:!1,members:[i.id],followers:[i.id],mods:[i.id],memberCount:1,createdAt:Date.now()};return Ks({...r,clubs:[c,...r.clubs],posts:{...r.posts,[c.id]:[]},seeded:!0}),{ok:!0,club:c}}function en(e,t){lt();const s=ot(),a=s.clubs.findIndex(o=>o.id===e);if(a<0)return{error:"missing"};const i=t({...s.clubs[a]});if(i&&i.error)return i;const n=s.clubs.slice();return n[a]=i,Ks({...s,clubs:n}),{ok:!0,club:i}}function Dc(e){const t=m.user;return t?en(e,s=>{const a=new Set(s.members||[]);return a.add(t.id),{...s,members:[...a],memberCount:a.size}}):{error:"signin"}}function ch(e){const t=m.user;return t?en(e,s=>{if(s.hostId===t.id)return{error:"host"};const a=(s.members||[]).filter(i=>i!==t.id);return{...s,members:a,memberCount:a.length}}):{error:"signin"}}function dh(e){const t=m.user;return t?en(e,s=>{const a=new Set(s.followers||[]);return a.add(t.id),{...s,followers:[...a]}}):{error:"signin"}}function uh(e){const t=m.user;return t?en(e,s=>{const a=(s.followers||[]).filter(i=>i!==t.id);return{...s,followers:a}}):{error:"signin"}}function _c(e){const t=m.user;if(!t)return!1;const s=Ba(e);return!!(s&&(s.members||[]).includes(t.id))}function ph(e){const t=m.user;if(!t)return!1;const s=Ba(e);return!!(s&&(s.followers||[]).includes(t.id))}function Ca(e){const t=m.user;if(!t)return!1;const s=Ba(e);return s?ee()||s.hostId===t.id||(s.mods||[]).includes(t.id):!1}function Oc(e){const t=Ba(e);if(!t)return{ok:!1,reason:"missing"};if(t.privacy==="public")return{ok:!0,reason:"public"};if(t.privacy==="members")return _c(e)||Ca(e)?{ok:!0,reason:"member"}:{ok:!1,reason:"members"};if(t.privacy==="paid"){const s=Ft();return({null:0,"skeet+":1,backstage:2,inner:3}[s||"null"]||0)>=1||Ca(e)?{ok:!0,reason:"paid"}:{ok:!1,reason:"paid"}}return{ok:!0,reason:"public"}}function mh(e){return lt(),(ot().posts[e]||[]).filter(s=>!s.removed).slice().sort((s,a)=>s.pinned&&!a.pinned?-1:!s.pinned&&a.pinned?1:(a.at||0)-(s.at||0))}function hh(e,t){const s=m.user;if(!s)return{error:"signin"};const a=Oc(e);if(!a.ok)return{error:"gated",reason:a.reason};const i=String(t||"").trim().slice(0,500);if(!i)return{error:"empty"};const n=ot();if(!n.clubs.some(c=>c.id===e))return{error:"missing"};const o={id:Mc("fcp"),userId:s.id,username:s.username,text:i,at:Date.now(),pinned:!1,removed:!1},r=[o,...n.posts[e]||[]].slice(0,100);return Ks({...n,posts:{...n.posts,[e]:r}}),{ok:!0,post:o}}function fh(e,t){if(!Ca(e))return{error:"mod"};const s=ot(),a=(s.posts[e]||[]).map(i=>i.id===t?{...i,pinned:!i.pinned}:i);return Ks({...s,posts:{...s.posts,[e]:a}}),{ok:!0}}function gh(e,t){if(!Ca(e))return{error:"mod"};const s=ot(),a=(s.posts[e]||[]).map(i=>i.id===t?{...i,removed:!0}:i);return Ks({...s,posts:{...s.posts,[e]:a}}),{ok:!0}}const Br=["instagram","tiktok","facebook","youtube","x","snapchat","other"],qc=[{id:"badge",minVerified:1,label:"Exclusive DBS badge",kind:"badge"},{id:"decoration",minVerified:2,label:"Premium avatar decoration",kind:"decoration"},{id:"skeet7",minVerified:3,label:"7 days PIKK+ (TEST MODE)",kind:"membership_trial",membership:"skeet+",days:7},{id:"skeet30",minVerified:3,requireAllLinked:!0,label:"30 days PIKK+ (all linked · min 3)",kind:"membership_trial",membership:"skeet+",days:30}],Rc=[{n:1,id:"m1",label:"Profile decoration",kind:"decoration"},{n:3,id:"m3",label:"7 days PIKK+ (TEST MODE)",kind:"membership_trial",membership:"skeet+",days:7},{n:5,id:"m5",label:"30 days PIKK+ (TEST MODE)",kind:"membership_trial",membership:"skeet+",days:30},{n:10,id:"m10",label:"Premium profile bundle",kind:"bundle"},{n:25,id:"m25",label:"30 days Backstage (TEST MODE)",kind:"membership_trial",membership:"backstage",days:30},{n:50,id:"m50",label:"30 days Inner Circle (TEST MODE)",kind:"membership_trial",membership:"inner",days:30},{n:100,id:"m100",label:"Founder Promoter badge / VIP",kind:"badge"}];function Nc(){return{platformsLinked:[],challenge:null,submissions:[],rewardsClaimed:[]}}function Bc(){return{code:"",invitees:[],milestonesClaimed:[]}}function Kc(e){const t=Nc();return!e||typeof e!="object"?t:{platformsLinked:Array.isArray(e.platformsLinked)?e.platformsLinked:[],challenge:e.challenge&&typeof e.challenge=="object"?e.challenge:null,submissions:Array.isArray(e.submissions)?e.submissions:[],rewardsClaimed:Array.isArray(e.rewardsClaimed)?e.rewardsClaimed:[]}}function jc(e){const t=Bc();return!e||typeof e!="object"?t:{code:typeof e.code=="string"?e.code:"",invitees:Array.isArray(e.invitees)?e.invitees:[],milestonesClaimed:Array.isArray(e.milestonesClaimed)?e.milestonesClaimed:[]}}function $t(e){return m={...m,shareEarn:Kc(e)},L(m),m.shareEarn}function Gt(e){return m={...m,referEarn:jc(e)},L(m),m.referEarn}function Fc(e){if(!e)return"DBS-GUEST";const t=String(e.username||"fan").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,8)||"FAN",s=String(e.id||"").replace(/^u_/,"").slice(-4).toUpperCase()||"DEMO";return`DBS-${t}-${s}`}function ps(e){return e+"_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function oa(e=Date.now()){return new Date(e).toISOString().slice(0,10)}function se(){return Kc(m.shareEarn)}function _o(){return Br.slice()}function vh(){return qc.map(e=>({...e}))}function bh({platform:e,handle:t="",url:s="",followers:a=""}={}){if(!m.user)return{error:"signin"};const n=String(e||"").toLowerCase().trim();if(!Br.includes(n))return{error:"bad_platform"};const o=String(t||"").trim().replace(/^@+/,"").slice(0,64),r=String(s||"").trim().slice(0,240);if(!o&&!r)return{error:"required"};const c=se();if((c.platformsLinked||[]).some(p=>p.platform===n))return{error:"already_linked",shareEarn:c};const d={id:ps("plat"),platform:n,handle:o,url:r,followers:String(a||"").trim().slice(0,32),linkedAt:Date.now()},u={...c,platformsLinked:[...c.platformsLinked||[],d]};return $t(u),{ok:!0,platform:d,shareEarn:se()}}function yh(e){const t=se(),s={...t,platformsLinked:(t.platformsLinked||[]).filter(a=>a.id!==e)};return $t(s),se()}function kh(){if(!m.user)return{error:"signin"};const t=se();if(t.challenge&&t.challenge.status==="active")return{error:"already_active",shareEarn:t};const s=js().code,a=Date.now(),i={id:ps("ch"),startedAt:a,endsAt:a+24*60*60*1e3,adTitle:"DatBoiSkeet · Long Story Short & Ladies Only",caption:"🔥 Join me on DBS — music, live, vault & more. Long Story Short + Ladies Only Coming Soon. #DBS #PaidPartnership #ad",trackedLink:`https://dbs.app/s/${s}?utm=share24`,status:"active",disclosure:"Incentivized promotion · disclose #ad / Paid partnership"};return $t({...t,challenge:i,submissions:[],rewardsClaimed:(t.rewardsClaimed||[]).filter(n=>n.challengeId!==i.id)}),{ok:!0,challenge:i,shareEarn:se()}}function wh(){const e=se();if(!e.challenge||e.challenge.status!=="active")return{error:"no_active"};const t={...e.challenge,startedAt:Date.now()-25*60*60*1e3,endsAt:Date.now()-1*60*60*1e3,simulatedElapsed:!0};return $t({...e,challenge:t}),{ok:!0,challenge:t,shareEarn:se()}}function Sh(){const e=se();if(!e.challenge)return{error:"none"};const t={...e.challenge,status:"ended",endedAt:Date.now()};return $t({...e,challenge:t}),{ok:!0,challenge:t,shareEarn:se()}}function $h({platform:e,postUrl:t=""}={}){if(!m.user)return{error:"signin"};const a=se();if(!a.challenge||a.challenge.status!=="active")return{error:"no_challenge"};const i=String(e||"").toLowerCase().trim();if(!Br.includes(i))return{error:"bad_platform"};const n=String(t||"").trim().slice(0,400);if(!n)return{error:"required"};if((a.submissions||[]).some(c=>c.platform===i&&(c.status==="pending"||c.status==="verified")))return{error:"duplicate",shareEarn:a};const r={id:ps("sub"),platform:i,postUrl:n,submittedAt:Date.now(),status:"pending",note:"Awaiting 24h continuous visibility check (manual/demo)"};return $t({...a,submissions:[r,...a.submissions||[]]}),{ok:!0,submission:r,shareEarn:se()}}function Oo(e,t,{note:s=""}={}){if(!["pending","verified","rejected"].includes(t))return{error:"bad_status"};const a=se();let i=null;const n=(a.submissions||[]).map(o=>o.id!==e?o:(i={...o,status:t,verifiedAt:t==="verified"?Date.now():o.verifiedAt||null,note:s||(t==="verified"?"Demo verified · 24h visibility assumed (manual)":t==="rejected"?"Rejected · ineligible / deleted / unverified":o.note)},i));return i?($t({...a,submissions:n}),{ok:!0,submission:i,shareEarn:se()}):{error:"not_found"}}function Uc(){const e=se();return new Set((e.submissions||[]).filter(s=>s.status==="verified").map(s=>s.platform)).size}function Gc(){const e=se(),t=Uc(),s=(e.platformsLinked||[]).length,a=new Set((e.rewardsClaimed||[]).map(i=>i.tierId));return qc.filter(i=>{if(a.has(i.id)||t<i.minVerified)return!1;if(i.requireAllLinked){if(s<3)return!1;const n=new Set((e.platformsLinked||[]).map(r=>r.platform)),o=new Set((e.submissions||[]).filter(r=>r.status==="verified").map(r=>r.platform));for(const r of n)if(!o.has(r))return!1}return!0}).map(i=>({...i,verifiedCount:t,linkedCount:s}))}function Eh(e){var o;if(!m.user)return{error:"signin"};const a=Gc().find(r=>r.id===e);if(!a)return{error:"not_claimable"};const i=se(),n={id:ps("srw"),tierId:a.id,label:a.label,kind:a.kind,at:Date.now(),challengeId:((o=i.challenge)==null?void 0:o.id)||null,testMode:!0};return a.membership&&ji(a.membership,!0),$t({...i,rewardsClaimed:[n,...i.rewardsClaimed||[]]}),{ok:!0,claim:n,shareEarn:se(),membership:Ft()}}function xh(){return $t(Nc()),se()}function _e(){return jc(m.referEarn)}function Ah(){return Rc.map(e=>({...e}))}function js(){const e=m.user,t=_e();if(t.code)return t;const s=Fc(e);return Gt({...t,code:s})}function Vc(){return`https://dbs.app/r/${js().code}`}function Th({username:e=""}={}){const t=m.user;if(!t)return{error:"signin"};const s=js(),a=String(e||"").trim().slice(0,24)||"Invitee"+(s.invitees.length+1);if(a.toLowerCase()===String(t.username||"").toLowerCase())return{error:"self_referral"};const i={id:ps("inv"),username:a,signedUpAt:Date.now(),activeDays:[],status:"pending",welcomeClaimed:!1,flaggedFraud:!1};return Gt({...s,invitees:[i,...s.invitees||[]]}),{ok:!0,invitee:i,referEarn:_e()}}function Ch(e){const t=_e();let s=null;const a=(t.invitees||[]).map(i=>i.id!==e?i:i.flaggedFraud?(s={error:"fraud",invitee:i},i):(s={...i,welcomeClaimed:!0,welcomeAt:Date.now()},s));return s?s.error?s:(Gt({...t,invitees:a}),{ok:!0,invitee:s,perk:"Welcome badge / profile decoration (TEST MODE)"}):{error:"not_found"}}function Ph(e,{day:t=null}={}){const s=_e();let a=null;const i=(s.invitees||[]).map(n=>{if(n.id!==e)return n;if(n.flaggedFraud)return a={error:"fraud",invitee:n},n;const o=Number(n.signedUpAt)||Date.now(),r=o+7*864e5;let c=t;if(!c){const h=new Set(n.activeDays||[]);let g=null;for(let v=0;v<7;v++){const b=oa(o+v*864e5);if(!h.has(b)){g=b;break}}if(!g)return a={error:"window_full",invitee:n},n;c=g}const d=Date.parse(c+"T12:00:00Z");if(!Number.isFinite(d)||d<o-864e5||d>r)return a={error:"outside_window",invitee:n},n;const u=Array.from(new Set([...n.activeDays||[],c])).sort();let p=n.status;return u.length>=3&&(p="active"),a={...n,activeDays:u,status:p},a});return a?a.error?a:(Gt({...s,invitees:i}),{ok:!0,invitee:a,referEarn:_e()}):{error:"not_found"}}function qo(e,t=!0){const s=_e();let a=null;const i=(s.invitees||[]).map(n=>{var o;return n.id!==e?n:(a={...n,flaggedFraud:!!t,status:t?"fraud":((o=n.activeDays)==null?void 0:o.length)>=3?"active":"pending"},a)});return a?(Gt({...s,invitees:i}),{ok:!0,invitee:a,referEarn:_e()}):{error:"not_found"}}function Hc(){return(_e().invitees||[]).filter(t=>t.status==="active"&&!t.flaggedFraud).length}function zc(){const e=_e(),t=Hc(),s=new Set((e.milestonesClaimed||[]).map(a=>a.milestoneId));return Rc.filter(a=>t>=a.n&&!s.has(a.id)).map(a=>({...a,activeCount:t}))}function Ih(e){if(!m.user)return{error:"signin"};const a=zc().find(o=>o.id===e);if(!a)return{error:"not_claimable"};const i=_e(),n={id:ps("rmw"),milestoneId:a.id,n:a.n,label:a.label,kind:a.kind,at:Date.now(),testMode:!0,note:"Distinct from Clippers commissions · TEST MODE · no real billing"};return a.membership&&ji(a.membership,!0),Gt({...i,milestonesClaimed:[n,...i.milestonesClaimed||[]]}),{ok:!0,claim:n,referEarn:_e(),membership:Ft()}}function Mh(){const e=m.user;return Gt({...Bc(),code:Fc(e)}),_e()}function Lh({force:e=!1}={}){if(!m.user)return{error:"signin"};const s=js();if(!e&&(s.invitees||[]).length>0)return{error:"already_seeded",referEarn:s};const a=Date.now(),i=864e5,n=[{id:"inv_demo_a",username:"NovaFan",signedUpAt:a-5*i,activeDays:[oa(a-5*i),oa(a-4*i),oa(a-3*i)],status:"active",welcomeClaimed:!0,flaggedFraud:!1},{id:"inv_demo_b",username:"ClipCurious",signedUpAt:a-2*i,activeDays:[oa(a-2*i)],status:"pending",welcomeClaimed:!0,flaggedFraud:!1},{id:"inv_demo_c",username:"BottyMcBot",signedUpAt:a-6*i,activeDays:[],status:"fraud",welcomeClaimed:!1,flaggedFraud:!0}];return Gt({...s,invitees:n,milestonesClaimed:s.milestonesClaimed||[]}),{ok:!0,seeded:n.length,referEarn:_e()}}const tn=[{id:"youtube",label:"YouTube",color:"#ff4444",hint:"YouTube Live / Studio"},{id:"tiktok",label:"TikTok",color:"#69c9d0",hint:"TikTok LIVE"},{id:"twitch",label:"Twitch",color:"#9146ff",hint:"Twitch Dashboard"},{id:"facebook",label:"Facebook",color:"#1877f2",hint:"Facebook Live"},{id:"instagram",label:"Instagram",color:"#e1306c",hint:"IG Live (demo)"},{id:"kick",label:"Kick",color:"#53fc18",hint:"Kick Studio"},{id:"custom_rtmp",label:"Custom RTMP",color:"#ffb020",hint:"Any RTMP endpoint"}],Dh=()=>({freeMaxDestinations:2,houseUnlimited:!0,houseUserIds:["dbs"],tiers:{bronze:{id:"bronze",label:"Bronze",price:4.99,maxDestinations:3,placement:!1,badge:"Bronze Streamer",perks:["3 destination slots","Campaign badge on Go Live"]},silver:{id:"silver",label:"Silver",price:9.99,maxDestinations:5,placement:!0,badge:"Silver Streamer",perks:["5 destination slots","Campaign badge","Explore / Live placement flag"]},gold:{id:"gold",label:"Gold",price:19.99,maxDestinations:7,placement:!0,badge:"Gold Streamer",perks:["All 7 destinations","Campaign badge","Priority Explore / Live placement"]}}});function ri(){return{platforms:{},selected:[],session:null,history:[],ingest:null,campaign:{tier:null,status:"none",enrolledAt:null,cancelledAt:null},campaignConfig:null}}function sn(){const e=m.restream||ri();return{...ri(),...e,platforms:e.platforms&&typeof e.platforms=="object"?e.platforms:{},selected:Array.isArray(e.selected)?e.selected:[],history:Array.isArray(e.history)?e.history:[],campaign:{...ri().campaign,...e.campaign||{}}}}function Fs(e){return m={...m,restream:e},L(m),m.restream}function _h(e){var s,a;if((s=e.ingest)!=null&&s.rtmpUrl&&((a=e.ingest)!=null&&a.streamKey))return e;const t="dbs_demo_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,10);return{...e,ingest:{rtmpUrl:"rtmp://ingest.dbs.local/live",streamKey:t,rotatedAt:Date.now(),note:"TEST MODE demo key · not a real media server"}}}function Vt(){let e=sn();const t=e.ingest;return e=_h(e),e.ingest!==t&&Fs(e),e}function Wc(){const e=Vt();return tn.map(t=>{const s=e.platforms[t.id]||{};return{...t,connected:!!s.connected,connectedAt:s.connectedAt||null,handle:s.handle||"",lastError:s.lastError||null,enabled:s.enabled!==!1}})}function Oh(e,t=""){const s=tn.find(n=>n.id===e);if(!s)return{error:"unknown_platform"};const a=Vt(),i={...a.platforms,[e]:{id:e,connected:!0,connectedAt:Date.now(),handle:String(t||s.label+" Demo").slice(0,40),lastError:null,enabled:!0}};return Fs({...a,platforms:i}),{ok:!0,platform:Wc().find(n=>n.id===e)}}function qh(e){var n;const t=Vt();if(!((n=t.platforms[e])!=null&&n.connected))return{error:"not_connected"};const s={...t.platforms,[e]:{...t.platforms[e],connected:!1,disconnectedAt:Date.now(),lastError:null}},a=(t.selected||[]).filter(o=>o!==e);let i=t.session;return i&&!i.endedAt&&(i={...i,destinations:(i.destinations||[]).map(o=>o.id===e?{...o,status:"disconnected",health:"error"}:o)}),Fs({...t,platforms:s,selected:a,session:i}),{ok:!0}}function Rh(e){const t=Vt(),s=new Set(Object.values(t.platforms).filter(i=>i.connected).map(i=>i.id)),a=(Array.isArray(e)?e:[]).filter(i=>s.has(i)).slice(0,7);return Fs({...t,selected:a}),{ok:!0,selected:a}}function Nh(e){var a;const t=Vt();if(!((a=t.platforms[e])!=null&&a.connected))return{error:"not_connected"};const s=new Set(t.selected||[]);return s.has(e)?s.delete(e):s.add(e),Rh([...s])}function Yc(){var a,i,n;const e=sn(),t=Dh(),s=e.campaignConfig||{};return{...t,...s,tiers:{...t.tiers,...s.tiers||{},bronze:{...t.tiers.bronze,...((a=s.tiers)==null?void 0:a.bronze)||{}},silver:{...t.tiers.silver,...((i=s.tiers)==null?void 0:i.silver)||{}},gold:{...t.tiers.gold,...((n=s.tiers)==null?void 0:n.gold)||{}}},freeMaxDestinations:Number(s.freeMaxDestinations)>0?Number(s.freeMaxDestinations):t.freeMaxDestinations,houseUnlimited:s.houseUnlimited!==!1,houseUserIds:Array.isArray(s.houseUserIds)?s.houseUserIds:t.houseUserIds}}function Jc(){return{...ri().campaign,...sn().campaign||{}}}function Bh(){const e=m.user;if(!e)return!1;const t=Yc();return e.id==="dbs"||e.username==="DatBoiSkeet"?!0:(t.houseUserIds||[]).includes(e.id)}function Qc(){const e=Yc();if(Bh()&&e.houseUnlimited)return{max:tn.length,source:"house_free",tier:null};const t=Jc();if(t.status==="active"&&t.tier&&e.tiers[t.tier]){const s=e.tiers[t.tier];return{max:s.maxDestinations,source:"campaign",tier:t.tier,badge:s.badge,placement:!!s.placement}}return{max:e.freeMaxDestinations,source:"free_baseline",tier:null,badge:null,placement:!1}}function Kh(){const e=m.user;if(!e)return{error:"signin"};const t=Vt();if(t.session&&!t.session.endedAt)return{error:"already_live"};const s=Object.values(t.platforms).filter(c=>c.connected).map(c=>c.id);if(!s.length)return{error:"no_platforms"};let a=(t.selected||[]).filter(c=>s.includes(c));if(!a.length)return{error:"none_selected"};const i=Qc();if(a.length>i.max)return{error:"over_cap",max:i.max,selected:a.length,source:i.source};const n=a.map((c,d)=>{const u=tn.find(h=>h.id===c),p=d===a.length-1&&a.length>2?"connecting":"streaming";return{id:c,label:(u==null?void 0:u.label)||c,status:p==="connecting"?"connecting":"streaming",health:p,startedAt:Date.now()}}),o=Jc(),r={id:ps("rs"),hostId:e.id,hostName:e.username,startedAt:Date.now(),destinations:n,selected:a.slice(),campaignTier:o.status==="active"?o.tier:null,campaignBadge:i.badge||null,placement:!!i.placement,testMode:!0,endedAt:null};return Fs({...t,session:r,selected:a}),{ok:!0,session:r}}function jh(){const e=Vt();if(!e.session||e.session.endedAt)return{error:"offline"};const t={...e.session,endedAt:Date.now(),destinations:(e.session.destinations||[]).map(a=>({...a,status:a.health==="error"?"error":"ended",health:a.health==="error"?"error":"ended"}))},s=[t,...e.history||[]].slice(0,20);return Fs({...e,session:null,history:s}),{ok:!0,session:t,history:s}}function Fh(){const e=sn().session;return e&&!e.endedAt?e:null}function Xc(){const e=D().connectPrefs||{};return{ageConfirmed:!!e.ageConfirmed,rulesAccepted:!!e.rulesAccepted}}function Ro(e={}){const t={...Xc(),...e};return t.ageConfirmed||(t.rulesAccepted=!1),vp(s=>({...s,connectPrefs:t})),t}const Zc=[{id:"day_one",name:"Day One",blurb:"Joined the Loyalty Club — recognition starts with showing up, not spending.",need:0,kind:"join"},{id:"listener",name:"Listener",blurb:"Logged authorized listening (demo tick). Not purchase-only.",need:1,kind:"listen"},{id:"live_attendee",name:"Live Regular",blurb:"Attended a livestream (demo stub). Healthy participation.",need:1,kind:"live"},{id:"club_member",name:"Club Member",blurb:"Joined a Fan Club discussion community.",need:1,kind:"club"},{id:"helper",name:"Helper",blurb:"Community-helper milestone (welcome tip / guidelines share demo).",need:1,kind:"help"},{id:"top_fan",name:"Top Fan",blurb:"Earned 50+ loyalty points from mixed healthy actions — gifts alone do not unlock this.",needPoints:50}];function ed(e=Date.now()){return new Date(e).toISOString().slice(0,10)}function Ka(){const e=m.loyalty||{};return{points:Number(e.points)||0,history:Array.isArray(e.history)?e.history:[],badges:Array.isArray(e.badges)?e.badges:[],publicVisible:e.publicVisible!==!1,lastActionAt:e.lastActionAt&&typeof e.lastActionAt=="object"?e.lastActionAt:{},dayCounts:e.dayCounts&&typeof e.dayCounts=="object"?e.dayCounts:{}}}function Kr(e){m={...m,loyalty:e},L(m)}function Uh(){return"loy_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function Gh(e,{cooldownMs:t=8e3,dailyCap:s=8}={}){const a=Ka(),i=Date.now(),n=Number(a.lastActionAt[e])||0;if(i-n<t)return{ok:!1,reason:"cooldown"};const o=ed(i);return((a.dayCounts[o]||{})[e]||0)>=s?{ok:!1,reason:"daily_cap"}:{ok:!0}}function Vh(e){const t=new Set(e.badges||[]),s={};return(e.history||[]).forEach(a=>{s[a.kind]=(s[a.kind]||0)+1}),Zc.forEach(a=>{if(!t.has(a.id)){if(a.needPoints!=null){e.points>=a.needPoints&&t.add(a.id);return}if(a.id==="day_one"){((e.history||[]).length>0||e.points>0)&&t.add(a.id);return}(s[a.kind]||0)>=(a.need||1)&&t.add(a.id)}}),[...t]}function ja(){return Ka()}function Hh(e){const t=Ka();return Kr({...t,publicVisible:!!e}),ja()}function zh(e,{points:t=5,note:s=""}={}){if(!m.user)return{error:"signin"};const i=Gh(e);if(!i.ok)return{error:i.reason};const n=Ka(),o=Date.now(),r=ed(o),c={...n.dayCounts,[r]:{...n.dayCounts[r]||{},[e]:((n.dayCounts[r]||{})[e]||0)+1}},d={id:Uh(),at:o,kind:e,points:t,note:String(s||e).slice(0,120)},u={...n,points:n.points+t,history:[d,...n.history].slice(0,80),lastActionAt:{...n.lastActionAt,[e]:o},dayCounts:c};return u.badges.includes("day_one")||(u.history=u.history),u.badges=Vh(u),u.badges.includes("day_one")||(u.badges=["day_one",...u.badges]),Kr(u),{ok:!0,loyalty:ja(),entry:d,newBadges:u.badges.filter(p=>!(n.badges||[]).includes(p))}}function td(){const e=ja(),t=new Set(e.badges||[]);return Zc.map(s=>({...s,unlocked:t.has(s.id)}))}function Wh(){return Kr({points:0,history:[],badges:[],publicVisible:!0,lastActionAt:{},dayCounts:{}}),ja()}function ms(){const e=m.openMic||{};return{applications:Array.isArray(e.applications)?e.applications:[],seeded:!!e.seeded,houseIndex:typeof e.houseIndex=="number"?e.houseIndex:0}}function an(e){m={...m,openMic:e},L(m)}function Yh(){return"om_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function Us({force:e=!1}={}){const t=ms();if(t.seeded&&!e&&t.applications.length>0)return{skipped:!0,applications:t.applications};const s=Date.now(),a=864e5,i=[{id:"om_demo_approved",userId:"u_ria",username:"RiaLoops",talent:"producer",trackTitle:"Midnight Pads (demo)",profileNote:"Beatmaker · looking to collab on LSS energy",rightsCertified:!0,status:"approved",at:s-10*a,reviewedAt:s-9*a},{id:"om_demo_pending",userId:"u_dez",username:"DezOnMic",talent:"rapper",trackTitle:"Porch Light Freestyle",profileNote:"Opt-in showcase · not pay-to-win",rightsCertified:!0,status:"pending",at:s-2*a},{id:"om_demo_rejected",userId:"u_spam",username:"SpamBeats",talent:"dj",trackTitle:"Untitled drop",profileNote:"No rights cert honesty",rightsCertified:!1,status:"rejected",at:s-5*a,reviewedAt:s-4*a,reviewNote:"Rights certification required"}],n=typeof t.houseIndex=="number"?t.houseIndex:0;return an({applications:i,seeded:!0,houseIndex:n}),{seeded:i.length,applications:i}}function Yn({status:e=null}={}){Us();let t=ms().applications.slice();return e&&(t=t.filter(s=>s.status===e)),t.sort((s,a)=>(a.at||0)-(s.at||0))}function Jh(){return Yn({status:"approved"})}function Qh(){const e=ms();return cs(typeof e.houseIndex=="number"?e.houseIndex:0)}function Xh(){const e=ms(),t=((typeof e.houseIndex=="number"?e.houseIndex:0)+1)%Cc();return an({...e,houseIndex:t}),cs(t)}function Zh({talent:e="rapper",trackTitle:t="",profileNote:s="",rightsCertified:a=!1}={}){const i=m.user;if(!i)return{error:"signin"};if(!a)return{error:"rights"};const n=String(t||"").trim().slice(0,80);if(!n)return{error:"title"};Us();const o=ms();if(o.applications.some(c=>c.userId===i.id&&c.status==="pending"))return{error:"pending"};const r={id:Yh(),userId:i.id,username:i.username,talent:String(e||"other").slice(0,32),trackTitle:n,profileNote:String(s||"").trim().slice(0,240),rightsCertified:!0,status:"pending",at:Date.now()};return an({...o,applications:[r,...o.applications],seeded:!0}),{ok:!0,application:r}}function Jn(e,t,s=""){if(!ee())return{error:"admin"};if(!["pending","approved","rejected"].includes(t))return{error:"status"};const i=ms();let n=null;const o=i.applications.map(r=>r.id!==e?r:(n={...r,status:t,reviewedAt:Date.now(),reviewNote:String(s||"").slice(0,160)},n));return n?(an({...i,applications:o}),{ok:!0,application:n}):{error:"missing"}}function ef(){var S,$;Us(),lt();try{Fa(),ze()}catch{}const e=ms().applications||[],t={pending:0,approved:0,rejected:0};e.forEach(w=>{const C=w.status||"pending";t[C]!==void 0?t[C]+=1:t.pending+=1});const s=e.filter(w=>w.status==="pending").sort((w,C)=>(C.at||0)-(w.at||0)),a=ot().clubs.slice().sort((w,C)=>(C.createdAt||0)-(w.createdAt||0)),i=a.slice(0,5).map(w=>({id:w.id,name:w.name,privacy:w.privacy,official:!!w.official,memberCount:w.memberCount||(w.members||[]).length||0,createdAt:w.createdAt||0})),n=Ka(),r=td().filter(w=>w.unlocked),c=Ut(),d=Tr();let u=0,p=0,h=0,g=0,v=0;d.forEach(w=>{u=K(u+(w.gross||0)),p=K(p+(w.fees||0)),h=K(h+(w.creatorShare||0)),g=K(g+(w.dbsShare||0)),v+=w.count||0});const b=m.wallet||{balance:0},y=m.catalog||[],k=cc();return{openMic:{total:e.length,byStatus:t,pending:s},fanClubs:{total:a.length,recent:i},loyalty:{points:n.points||0,badgeCount:r.length,badges:r.map(w=>w.name||w.id),publicVisible:n.publicVisible!==!1,historyCount:(n.history||[]).length,note:"Device-local loyalty for signed-in user · not a multi-fan leaderboard"},revenue:{demo:!0,chip:"demo figures · not production",gross:u,fees:p,creatorShare:h,dbsShare:g,earnCount:v,creatorAvailable:K(c.available||0),creatorHolds:K(c.holds||0),fanWalletBalance:Number(b.balance)||0,byCategory:d.filter(w=>w.count>0),catalogPublished:y.filter(w=>w.published).length,catalogTotal:y.length},moderation:{warnings:[],suspensions:[],note:"Stub · Content Polish owns Guidelines copy"},hotFeed:{openAlerts:(m.engagementAlerts||[]).filter(w=>!w.handledAt).length,totalAlerts:(m.engagementAlerts||[]).length,hotPosts:Array.isArray((S=m.hotFeed)==null?void 0:S.posts)?m.hotFeed.posts.length:0,hotLives:Array.isArray(($=m.hotFeed)==null?void 0:$.lives)?m.hotFeed.lives.length:0,note:"§38 · Build posts + Live Social lives"},stats:k}}const tf={frames:"frame",effects:"effect",banners:"banner","name styles":"nameStyle",badges:"badge"},No=["frame-rodeo-gold","fx-snowfall","ban-skyline","name-neon","badge-dayone"];function sf(e){const t=e&&typeof e=="object"?e:{},s={};return["frame","effect","banner","nameStyle","badge"].forEach(a=>{typeof t[a]=="string"&&t[a]&&(s[a]=t[a])}),s}function Gs(){const e=m.profileShop||{};return{owned:Array.isArray(e.owned)?[...new Set(e.owned.map(String))]:[],equipped:sf(e.equipped),reduceMotion:!!e.reduceMotion}}function Vs(e){m={...m,profileShop:e},L(m)}function Kt(){return Gs()}function sd(e){return e&&tf[e.category]||null}function af(e){const t=String(e||"");if(!t)return{error:"missing"};const s=Gs();return s.owned.includes(t)?{ok:!0,already:!0,shop:Kt()}:(Vs({...s,owned:[...s.owned,t]}),{ok:!0,shop:Kt()})}function nf(){const e=Gs(),t=new Set(e.owned);return No.forEach(s=>t.add(s)),Vs({...e,owned:[...t]}),{ok:!0,unlocked:No,shop:Kt()}}function rf(e){const t=String(e||"");return t.startsWith("frame-")?"frame":t.startsWith("fx-")?"effect":t.startsWith("ban-")?"banner":t.startsWith("name-")?"nameStyle":t.startsWith("badge-")?"badge":null}function of(e){const t=String(e||""),s=Gs();if(!s.owned.includes(t))return{error:"not_owned"};const a=rf(t);if(!a)return{error:"unknown_item"};const i={...s.equipped,[a]:t};return Vs({...s,equipped:i}),{ok:!0,slot:a,shop:Kt()}}function lf(e){const t=String(e||"");if(!["frame","effect","banner","nameStyle","badge"].includes(t))return{error:"bad_slot"};const s=Gs(),a={...s.equipped};return delete a[t],Vs({...s,equipped:a}),{ok:!0,shop:Kt()}}function cf(e){const t=Gs();return Vs({...t,reduceMotion:!!e}),Kt()}function df(){return Vs({owned:[],equipped:{},reduceMotion:!1}),Kt()}const uf=5,pf=8,mf=[{id:"hp_maya_1",userId:"maya",username:"MayaBeats",text:"Studio loop dropping later — who wants the stem pack? 🔥",image:"/music/01_Long_Story_Short_Coming_Soon.jpg",mediaType:"image",atOffset:36e5*5,likeUsers:["dbs","fanjay","u_seed_a","u_seed_b","u_seed_c","u_seed_d","clipqueen"],comments:[{id:"hc_m1",userId:"fanjay",username:"FanJay",text:"Send it 🙌"},{id:"hc_m2",userId:"dbs",username:"DatBoiSkeet",text:"Pull up on Spotlight"},{id:"hc_m3",userId:"clipqueen",username:"ClipQueen",text:"Stem pack please"}],shares:5},{id:"hp_jay_1",userId:"fanjay",username:"FanJay",text:"Foreign X-Change fit check from the community — buffalo energy.",image:"/merch/03_blue_buffalo_jacket.jpeg",mediaType:"image",atOffset:36e5*8,likeUsers:["maya","dbs","u_seed_a","u_seed_c","u_seed_d","clipqueen","u_seed_b"],comments:[{id:"hc_j1",userId:"maya",username:"MayaBeats",text:"Jacket hits"},{id:"hc_j2",userId:"clipqueen",username:"ClipQueen",text:"Need this"}],shares:6},{id:"hp_clip_1",userId:"clipqueen",username:"ClipQueen",text:"New clip cut from last Live — tag @DatBoiSkeet if you remix 🎬",image:"/merch/06_black_ptsd_tee.jpeg",mediaType:"video",atOffset:36e5*12,likeUsers:["dbs","maya","fanjay","u_seed_a","u_seed_b","u_seed_c"],comments:[{id:"hc_c1",userId:"dbs",username:"DatBoiSkeet",text:"Clean edit"},{id:"hc_c2",userId:"maya",username:"MayaBeats",text:"Clipping goals"},{id:"hc_c3",userId:"fanjay",username:"FanJay",text:"Saved"},{id:"hc_c4",userId:"u_seed_a",username:"FanA",text:"Fire"}],shares:4},{id:"hp_dbs_boost",userId:"dbs",username:"DatBoiSkeet",text:"Community shoutout — Maya + Jay keeping the feed hot. Keep posting.",image:"/music/02_Ladies_Only_Coming_Soon.jpg",mediaType:"image",atOffset:36e5*3,likeUsers:["maya","fanjay","u_seed_a"],comments:[{id:"hc_d1",userId:"maya",username:"MayaBeats",text:"Grateful 💛"},{id:"hc_d2",userId:"fanjay",username:"FanJay",text:"Lets go"}],shares:2}];function He(){const e=m.hotFeed||{};return{lives:Array.isArray(e.lives)?e.lives:[],posts:Array.isArray(e.posts)?e.posts:[],seededLives:!!e.seededLives,seededPosts:!!e.seededPosts,seededPostsVer:Number(e.seededPostsVer)||0}}function ad(e){m={...m,hotFeed:e},L(m)}function hf(){const e={...m.profiles};let t=!1;const s=(a,i,n)=>{e[a]||(e[a]={id:a,username:i,bio:n,avatar:"",followers:[],following:["dbs"],verified:!1},t=!0)};s("maya","MayaBeats","Creator · beats & live demos"),s("fanjay","FanJay","Day-one fan · playlist curator"),s("clipqueen","ClipQueen","Clipper · community edits"),t&&(m={...m,profiles:e})}function Fa(){oc(),hf();const e=He(),t=Number(e.seededPostsVer)||0;if(e.seededPosts&&t>=2)return He();if(e.seededPosts&&t<2){const c={...m.likes||{}},d={...m.comments||{}},u={...m.postShares||{}},p=(h,g,v,b)=>{c[h]=[...new Set([...c[h]||[],...g])];const y=new Set((d[h]||[]).map(S=>S.id)),k=[...d[h]||[]];(v||[]).forEach(S=>{y.has(S.id)||k.push({...S,at:S.at||Date.now()})}),d[h]=k,u[h]=Math.max(Number(u[h]||0),b)};return p("hp_maya_1",["dbs","fanjay","u_seed_a","u_seed_b","u_seed_c","u_seed_d","clipqueen"],[{id:"hc_m3",userId:"clipqueen",username:"ClipQueen",text:"Stem pack please"}],5),p("hp_jay_1",["maya","dbs","u_seed_a","u_seed_c","u_seed_d","clipqueen","u_seed_b"],[{id:"hc_j2",userId:"clipqueen",username:"ClipQueen",text:"Need this"}],6),p("hp_clip_1",["dbs","maya","fanjay","u_seed_a","u_seed_b","u_seed_c"],[{id:"hc_c4",userId:"u_seed_a",username:"FanA",text:"Fire"}],4),c.hp_dbs_boost&&(c.hp_dbs_boost=(c.hp_dbs_boost||[]).slice(0,3),u.hp_dbs_boost=Math.min(Number(u.hp_dbs_boost||0),2)),m={...m,likes:c,comments:d,postShares:u,hotFeed:{...e,seededPosts:!0,seededPostsVer:2}},L(m),ze(),He()}const s=new Set((m.posts||[]).map(c=>c.id)),a=[...m.posts||[]],i={...m.likes||{}},n={...m.comments||{}},o={...m.postShares||{}},r=Date.now();return mf.forEach(c=>{s.has(c.id)||(a.unshift({id:c.id,userId:c.userId,username:c.username,text:c.text,image:c.image||"",mediaType:c.mediaType||(c.image?"image":"text"),at:r-(c.atOffset||0),house:c.userId==="dbs"}),i[c.id]=[...c.likeUsers||[]],n[c.id]=(c.comments||[]).map(d=>({...d,text:d.text,at:r-(c.atOffset||0)+6e4})),c.shares&&(o[c.id]=c.shares))}),i.p1&&i.p1.length<3&&(i.p1=[...new Set([...i.p1||[],"maya","fanjay","u_seed_a"])]),i.p2&&i.p2.length<2&&(i.p2=[...new Set([...i.p2||[],"maya","fanjay"])]),(!n.p1||n.p1.length<2)&&(n.p1=[...n.p1||[],{id:"hc_p1a",userId:"maya",username:"MayaBeats",text:"Cover art goes crazy",at:r-8e7},{id:"hc_p1b",userId:"fanjay",username:"FanJay",text:"Been waiting on this",at:r-7e7}]),o.p1=Math.max(o.p1||0,2),o.p2=Math.max(o.p2||0,1),m={...m,posts:a,likes:i,comments:n,postShares:o,hotFeed:{...e,seededPosts:!0,seededPostsVer:2}},L(m),ze(),He()}function nn(e){const t=m.likes&&m.likes[e]||[],s=m.comments&&m.comments[e]||[],a=m.postShares&&m.postShares[e]||0;return t.length+s.length+Number(a||0)}function jr(){const e=m.engagementAlertThresholds||{};return{postScore:Number.isInteger(e.postScore)&&e.postScore>0?e.postScore:10,commentCount:Number.isInteger(e.commentCount)&&e.commentCount>0?e.commentCount:5}}function ff({postScore:e,commentCount:t}={}){if(!ee())return{error:"admin"};const s=a=>Number.isSafeInteger(Number(a))&&Number(a)>=1&&Number(a)<=1e6;return!s(e)||!s(t)?{error:"invalid_threshold"}:(m={...m,engagementAlertThresholds:{postScore:Number(e),commentCount:Number(t)}},L(m),ze(),{ok:!0,thresholds:jr()})}function ze(){const e=He(),t=m.posts||[],s=t.map(r=>{const c=(m.likes&&m.likes[r.id]||[]).length,d=(m.comments&&m.comments[r.id]||[]).length,u=Number(m.postShares&&m.postShares[r.id]||0),p=c+d+u;return{id:r.id,postId:r.id,score:p,likes:c,comments:d,shares:u,username:r.username,userId:r.userId,preview:(r.text||"").slice(0,120),text:r.text||"",image:r.image||"",mediaType:r.mediaType||(r.image?"image":"text"),at:r.at||0,house:r.userId==="dbs"||!!r.house}}).filter(r=>r.score>=uf).sort((r,c)=>c.score-r.score||c.at-r.at).slice(0,pf),a=Array.isArray(m.engagementAlerts)?[...m.engagementAlerts]:[],i=new Set(a.filter(r=>r.kind==="post").map(r=>r.refId)),n=jr();for(const r of t){if(i.has(r.id))continue;const c=(m.likes&&m.likes[r.id]||[]).length,d=(m.comments&&m.comments[r.id]||[]).length,u=Number(m.postShares&&m.postShares[r.id]||0),p=c+d+u;p<n.postScore&&d<n.commentCount||(a.unshift({id:"ea_post_"+r.id+"_"+Date.now().toString(36),kind:"post",refId:r.id,title:String(r.text||"Engaging post").slice(0,80),username:r.username,score:p,mediaType:r.mediaType||"text",at:Date.now(),handledAt:null,handledNote:null}),i.add(r.id))}const o=a.slice(0,60);return m={...m,hotFeed:{lives:e.lives,seededLives:e.seededLives,posts:s,seededPosts:e.seededPosts||s.length>0,seededPostsVer:Number(e.seededPostsVer)||0},engagementAlerts:o},L(m),He()}function id(e=8){return Fa(),He().posts.length||ze(),(He().posts||[]).slice(0,Math.max(1,Number(e)||8))}function nd(e){const t=String(e||"");if(!t)return{error:"missing"};if(!(m.posts||[]).find(i=>i.id===t))return{error:"missing"};const a={...m.postShares||{}};return a[t]=Number(a[t]||0)+1,m={...m,postShares:a},L(m),ze(),{ok:!0,shares:a[t],score:nn(t)}}function gf(e){const t=e||{},s=t.kind==="live"?"live":"post",a=String(t.refId||t.id||"");if(!a)return{error:"missing"};const i=Array.isArray(m.engagementAlerts)?[...m.engagementAlerts]:[],n=i.find(r=>r.kind===s&&r.refId===a&&!r.handledAt);if(n)return{ok:!0,alert:n,deduped:!0};const o={id:t.id||"ea_"+s+"_"+a+"_"+Date.now().toString(36),kind:s,refId:a,title:String(t.title||"Hot item").slice(0,120),username:String(t.username||""),score:Number(t.score)||0,viewers:t.viewers!=null?Number(t.viewers):void 0,gifts:t.gifts!=null?Number(t.gifts):void 0,mediaType:t.mediaType||(s==="live"?"live":"text"),at:t.at||Date.now(),handledAt:t.handledAt||null,handledNote:t.handledNote||null};return m={...m,engagementAlerts:[o,...i].slice(0,60)},L(m),{ok:!0,alert:o}}function Bo({openOnly:e=!0}={}){const t=Array.isArray(m.engagementAlerts)?m.engagementAlerts:[];return(e?t.filter(a=>!a.handledAt):t.slice()).sort((a,i)=>(i.at||0)-(a.at||0))}function Ha(e,t){if(!ee())return{error:"admin"};const s=String(e||"");if(!s)return{error:"missing"};const a=Array.isArray(m.engagementAlerts)?m.engagementAlerts:[];let i=null;const n=a.map(o=>o.id!==s?o:(i={...o,handledAt:Date.now(),handledNote:t!=null?String(t):o.handledNote||"handled"},i));return i?(m={...m,engagementAlerts:n},L(m),{ok:!0,alert:i}):{error:"missing"}}function vf(e){if(!ee())return{error:"admin"};const t=m.user;if(!t)return{error:"signin"};const s=String(e||""),a=new Set(m.likes&&m.likes[s]||[]);return a.add(t.id),m={...m,likes:{...m.likes,[s]:[...a]}},L(m),ze(),{ok:!0,count:a.size,score:nn(s)}}function bf(e,t){if(!ee())return{error:"admin"};const s=m.user;if(!s)return{error:"signin"};const a=String(e||""),i=t.trim();if(!i)return{error:"empty"};const n={id:"c_admin_"+Date.now().toString(36),userId:s.id,username:s.username,text:i,at:Date.now(),admin:!0},o=m.comments&&m.comments[a]||[];return m={...m,comments:{...m.comments,[a]:[...o,n]}},L(m),ze(),{ok:!0,comment:n,score:nn(a)}}function yf(e){if(!ee())return{error:"admin"};const t=nd(e);return t.error?t:{ok:!0,shares:t.shares,link:"#/posts",score:t.score}}function Fr(e,t){return Math.max(0,Number(e)||0)+Math.max(0,Number(t)||0)*20}function Ur(e){if(!e||typeof e!="object")return null;const t=String(e.id||e.liveId||"");if(!t)return null;const s=String(e.hostId||e.userId||""),a=String(e.hostName||e.username||e.handle||"Creator"),i=Math.max(0,Number(e.viewers)||0),n=Math.max(0,Number(e.giftsTotal??e.gifts)||0),o=e.score!=null&&Number.isFinite(Number(e.score))?Number(e.score):Fr(i,n);return{id:t,hostId:s,hostName:a,title:String(e.title||"Live"),viewers:i,giftsTotal:n,house:!!e.house,example:!0,spikedAt:e.spikedAt||null,score:o}}function rd({force:e=!1}={}){const t=He();if(t.seededLives&&!e&&(t.lives||[]).length>0)return{skipped:!0,lives:t.lives.map(Ur).filter(Boolean)};const s=[{id:"hl_dbs_house",hostId:"dbs",hostName:"DatBoiSkeet",title:"DBS Live · Listening Session",viewers:8420,giftsTotal:186,house:!0},{id:"hl_dbs_vault",hostId:"dbs",hostName:"DatBoiSkeet",title:"Vault Drop Afterparty · House",viewers:3210,giftsTotal:94,house:!0},{id:"hl_skeetfan",hostId:"u_skeetfanatl",hostName:"SkeetFanATL",title:"ATL reacts · Long Story Short",viewers:1540,giftsTotal:42,house:!1},{id:"hl_vaultwatch",hostId:"u_vaultwatcher",hostName:"VaultWatcher",title:"Vault deep cut night",viewers:980,giftsTotal:61,house:!1},{id:"hl_fxclip",hostId:"u_fxclipper",hostName:"FXClipper",title:"Foreign X-Change clips live",viewers:2210,giftsTotal:28,house:!1},{id:"hl_nightowl",hostId:"u_nightowldbs",hostName:"NightOwlDBS",title:"Late night lounge · chill",viewers:412,giftsTotal:15,house:!1},{id:"hl_longstory",hostId:"u_longstorylistener",hostName:"LongStoryListener",title:"LSS theory hour",viewers:128,giftsTotal:7,house:!1},{id:"hl_ladies",hostId:"u_ladiesonlyfan",hostName:"LadiesOnlyFan",title:"Ladies Only countdown",viewers:67,giftsTotal:3,house:!1}].map(a=>({...a,spikedAt:null,score:Fr(a.viewers,a.giftsTotal)}));return ad({...t,lives:s,seededLives:!0}),{ok:!0,lives:s}}function Hs(){return rd(),(He().lives||[]).map(Ur).filter(Boolean).sort((t,s)=>(s.score||0)-(t.score||0)||(s.viewers||0)-(t.viewers||0))}function kf(e){const t=String(e||"");if(!t)return{error:"missing"};rd();const s=He();let a=null;const i=(s.lives||[]).map(o=>{const r=Ur(o);if(!r||r.id!==t)return o;const c=r.viewers,d=r.giftsTotal,u=Fr(c,d);return a={...r,viewers:c,giftsTotal:d,score:u,spikedAt:Date.now()},a});if(!a)return{error:"missing"};ad({...s,lives:i,seededLives:!0});const n=gf({kind:"live",refId:a.id,title:a.title,username:a.hostName,score:a.score,viewers:a.viewers,gifts:a.giftsTotal});return{ok:!0,live:a,alert:(n==null?void 0:n.alert)||null,deduped:!!(n!=null&&n.deduped)}}function wf(){return Hs().filter(s=>s&&!s.house).sort((s,a)=>(a.score||0)-(s.score||0)||(a.viewers||0)-(s.viewers||0)).slice(0,6).map(s=>({id:s.id,hostId:s.hostId,hostName:s.hostName,title:s.title,viewers:s.viewers,giftsTotal:s.giftsTotal,house:!!s.house,score:s.score,spikedAt:s.spikedAt||null,playbacksToday:s.playbacksToday!=null?s.playbacksToday:Math.max(1,Math.round((s.viewers||0)/40))}))}function od(){const e=new Date().toISOString().slice(0,10),s=(as({publishedOnly:!0,types:["song"]})||[]).map(i=>{const n=Number(i.playsToday)||Number(i.playCount)||Number(i.plays)||0;let o="";return i.coverRef&&!String(i.coverRef).startsWith("idb:")&&(o=i.coverRef),{id:i.id,title:i.title||"Untitled",artist:i.artist||"DatBoiSkeet",cover:o,playsToday:n,href:"#/music",demo:!1,day:e,status:i.status||(i.published?"Published":"Catalog")}}).filter(i=>i.playsToday>0).sort((i,n)=>n.playsToday-i.playsToday||String(i.title).localeCompare(String(n.title)));return s[0]?s[0]:{id:"demo_most_played_lss",title:"Long Story Short",artist:"DatBoiSkeet",cover:"/music/01_Long_Story_Short_Coming_Soon.jpg",playsToday:900+e.split("-").reduce((i,n)=>i+Number(n),0)%400,href:"#/music",demo:!0,day:e,status:"Coming Soon"}}const Sf={BASE_URL:"/pikk-app/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_BASE:"/pikk-app/",VITE_BUILD_SHA:"df4128bd0318860677ad40ecf80c05ec05a8b361",VITE_PIKK_API_BASE:"https://pikk-api.pikk-0fa.workers.dev"},ld="pikk.settings.v1",Qn=Object.freeze({notifyMessages:!0,notifyLive:!0,notifyDrops:!0,notifyPromos:!1,highContrast:!1,reduceMotion:!1,splashChime:!0,showSplash:!0}),rn=()=>{try{return globalThis.localStorage||null}catch{return null}};function Ls(){var e;try{return{...Qn,...JSON.parse(((e=rn())==null?void 0:e.getItem(ld))||"{}")}}catch{return{...Qn}}}function $f(e,t){var a;if(!(e in Qn))return Ls();const s={...Ls(),[e]:!!t};return(a=rn())==null||a.setItem(ld,JSON.stringify(s)),s}function cd(e=Ls(),t=(s=>(s=globalThis.document)==null?void 0:s.documentElement)()){t&&(t.classList.toggle("pikk-high-contrast",!!e.highContrast),t.classList.toggle("pikk-reduce-motion",!!e.reduceMotion))}const dd="pikk.membership.v1";function ud(){try{const e=typeof import.meta<"u"&&Sf||{};return!!((typeof window<"u"&&typeof window.__PIKK_API_BASE__=="string"?window.__PIKK_API_BASE__.trim():"")||String(e.VITE_PIKK_API_BASE||"").trim())}catch{return!1}}function pd(){var e;if(ud())return null;try{return JSON.parse(((e=rn())==null?void 0:e.getItem(dd))||"null")}catch{return null}}function Ef(e){var s;if(ud()||!e||!e.id)return null;const t={id:e.id,name:e.name,price:e.price,at:Date.now(),testMode:!0};return(s=rn())==null||s.setItem(dd,JSON.stringify(t)),t}const Gr=e=>e?`${e.name} (test mode) — billing starts when Stripe is live`:"",xf="0.1.0",xt=(e,t,s,a)=>`<label class="pikk-set-row"><span><strong>${l(t)}</strong>${s?`<small>${l(s)}</small>`:""}</span><input type="checkbox" class="pikk-switch" data-setting="${e}"${a[e]?" checked":""} /></label>`,ct=(e,t,s)=>`<a class="pikk-set-row pikk-set-link" href="${e}"><span><strong>${l(t)}</strong>${s?`<small>${l(s)}</small>`:""}</span><span aria-hidden="true">→</span></a>`,Wt=(e,t,s)=>`<section class="card pikk-set-group" id="set-${e}" aria-labelledby="set-${e}-h"><h2 id="set-${e}-h">${l(t)}</h2>${s}</section>`;function md(){var i;const e=Ls(),t=(i=D())==null?void 0:i.user,s=pd(),a=t?`<p class="pikk-set-who">Signed in as <strong>@${l(t.username)}</strong> · local demo account</p>${ct("#/profile","Edit profile","Name, bio, avatar")}<button type="button" class="btn pikk-set-btn" id="setSignOut">Sign out</button>`:`<p class="pikk-set-who">You're not signed in.</p><a class="btn primary pikk-set-btn" href="#/profile" id="setSignIn">Sign in / Create account</a>`;return M("Settings",`
    ${Wt("account","Account",a+(s?`<p class="pikk-set-member" data-membership>${l(Gr(s))}</p>`:"")+ct("#/pricing","Memberships","PIKK+ · Backstage · Inner Circle"))}
    ${Wt("notifications","Notifications",xt("notifyMessages","Messages","New messages and requests",e)+xt("notifyLive","Live","When creators you follow go live",e)+xt("notifyDrops","Music drops","New releases from DatBoiSkeet",e)+xt("notifyPromos","Promotions","Offers and PIKK news",e)+'<p class="muted pikk-set-note">Preferences only — push notifications arrive once the PIKK backend is live.</p>')}
    ${Wt("privacy","Privacy",ct("#/crew","PIKK Crew","Who sees your Crew stories")+ct("#/favorites","Favorites","People who rank first in your feeds")+ct("#/guidelines","Community guidelines","")+ct("#/privacy","Privacy","Draft — pending legal review")+ct("#/terms?s=security","Security &amp; data breach","Terms · draft"))}
    ${Wt("appearance","Appearance",xt("highContrast","High contrast","Brighter text and borders",e)+xt("reduceMotion","Reduce motion","Fewer animations",e))}
    ${Wt("sound","Sound & splash",xt("splashChime","Splash chime","Tuning-fork chime when PIKK opens",e)+xt("showSplash","Show opening splash","3-second PIKK logo on launch",e))}
    ${Wt("more","Payments & help",ct("#/payments","Payments","Donate, coins, wallet, memberships")+ct("#/support","Support","Help & tickets"))}
    ${Wt("about","About",`<p class="pikk-set-about">PIKK Network · version <strong data-version>${xf}</strong> · TEST MODE</p><p class="muted pikk-set-note">Settings are saved only on this device until PIKK accounts are live.</p>`)}
  `,{badge:"TEST MODE"})}function hd(e=document.getElementById("app")){var t;e==null||e.querySelectorAll("[data-setting]").forEach(s=>s.addEventListener("change",()=>{const a=$f(s.dataset.setting,s.checked);cd(a),f("Saved on this device")})),(t=e==null?void 0:e.querySelector("#setSignOut"))==null||t.addEventListener("click",()=>{bp(),f("Signed out"),e.innerHTML=md(),hd(e)})}const Af=5e3,Tf=500,Cf=800,Pf="modulepreload",If=function(e){return"/pikk-app/"+e},Ko={},oi=function(t,s,a){let i=Promise.resolve();if(s&&s.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),r=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=Promise.allSettled(s.map(c=>{if(c=If(c),c in Ko)return;Ko[c]=!0;const d=c.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${u}`))return;const p=document.createElement("link");if(p.rel=d?"stylesheet":Pf,d||(p.as="script"),p.crossOrigin="",p.href=c,r&&p.setAttribute("nonce",r),document.head.appendChild(p),d)return new Promise((h,g)=>{p.addEventListener("load",h),p.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)))})}))}function n(o){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=o,window.dispatchEvent(r),!r.defaultPrevented)throw o}return i.then(o=>{for(const r of o||[])r.status==="rejected"&&n(r.reason);return t().catch(n)})},fd="pikk.contest.twerk.age18",gd=()=>{try{return globalThis.localStorage||null}catch{return null}},Mf=()=>{var e;return((e=gd())==null?void 0:e.getItem(fd))==="yes"};function Lf(){var e;(e=gd())==null||e.setItem(fd,"yes")}function Df(){return`<section class="pikk-contest pikk-contest-gate" aria-labelledby="twerkGateH">
    <p class="kicker">Twerk Contest · 18+</p>
    <h1 id="twerkGateH">Are you 18 or older?</h1>
    <p>This contest is for adults only. Confirm you are 18+ to continue. Your answer is saved only on this device.</p>
    <p class="muted">TEST MODE: this is a self-confirmation. Real age verification will be required once PIKK Safety and the backend are live. <a href="#/verify-age">Verify age / ID</a></p>
    <div class="pikk-contest-actions">
      <button type="button" class="pikk-contest-enter" id="twerkGateYes">I'm 18 or older</button>
      <a class="pikk-contest-leave" href="#/home">No, take me back</a>
    </div>
  </section>`}function vd(){return`<section class="pikk-contest pikk-contest-rules" aria-labelledby="twerkRulesH">
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
  </section>`}const jo=()=>Mf()?vd():Df();function _f(e){return e?e.can_enter?`<form id="twerkEntryForm" class="card"><h2>Go live to compete</h2>
      <p class="muted">Live, solo entries only. Just you on camera.</p>
      <label>Title <input id="twerkEntryTitle" maxlength="120" required></label>
      <div class="pikk-contest-actions"><button type="submit" class="pikk-contest-enter" id="twerkGoLive">Go live (solo)</button></div></form>`:e.gender_ok?'<p>To enter as a contestant, complete ID/age verification first.</p><a class="pikk-contest-enter" href="#/verify-age">Verify age / ID</a>':`<p class="muted">This contest is for women contestants. You can watch and vote.</p>${e.gender_set?"":'<p class="muted">Account gender not set. <a href="#/profile">Set it on your profile</a> if you are a woman who wants to enter.</p>'}`:'<p class="muted">Sign in to see whether you can enter. Watching and voting stay open.</p>'}function Xn(e=document.getElementById("app")){var s;(s=e==null?void 0:e.querySelector("#twerkGateYes"))==null||s.addEventListener("click",()=>{var a,i;Lf(),e.innerHTML=vd(),(i=(a=e.querySelector("h1"))==null?void 0:a.focus)==null||i.call(a),Xn(e)});const t=e==null?void 0:e.querySelector("#twerkEntry");t&&oi(()=>Promise.resolve().then(()=>nr),void 0).then(async a=>{var o;if(!a.isVerificationApiConfigured())return;let i=null;try{i=await a.verificationApi.contestEligibility("twerk")}catch(r){if((r==null?void 0:r.status)!==401)return}t.innerHTML=_f(i);const n=async r=>{var d,u;const c=(u=(d=t.querySelector("#twerkEntryTitle"))==null?void 0:d.value)==null?void 0:u.trim();if(c)try{await a.verificationApi.submitEntry("twerk",c,r),t.innerHTML='<p role="status">Entry received. It will be reviewed by moderators before it appears.</p>'}catch(p){(p==null?void 0:p.code)==="age_verification_required"?location.hash="#/verify-age":t.insertAdjacentHTML("beforeend",`<p role="alert">${String((p==null?void 0:p.message)||"Could not submit").replace(/[<>&]/g,"")}</p>`)}};(o=t.querySelector("#twerkEntryForm"))==null||o.addEventListener("submit",r=>{r.preventDefault(),n(!0)})})}const Of={BASE_URL:"/pikk-app/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_BASE:"/pikk-app/",VITE_BUILD_SHA:"df4128bd0318860677ad40ecf80c05ec05a8b361",VITE_PIKK_API_BASE:"https://pikk-api.pikk-0fa.workers.dev"},it=Object.freeze([{name:"Block Wars",players:"1–2",icon:"🥊",theme:"fighters",artwork:"/games/approved/01_block_wars.jpg",description:"City-based fighters, combos and special moves.",href:"#/blockwars"},{name:"PIKK Playground",players:"1–8",icon:"🎈",theme:"playground",artwork:"/games/approved/02_pikk_playground.jpg",description:"Create your character, race, jump and explore with friends."},{name:"PIKK Clash",players:"1",icon:"💎",theme:"clash",artwork:"/games/approved/03_pikk_clash.jpg",description:"Original neighborhood-themed match puzzles and venue upgrades."},{name:"PIKK Knockout",players:"1",icon:"💥",theme:"knockout",artwork:"/games/approved/04_pikk_knockout.jpg",description:"Stylized physics challenges: launch, bounce and knock targets off moving platforms."},{name:"PIKK Bowling",players:"1–4",icon:"🎳",theme:"bowling",artwork:"/games/approved/05_pikk_bowling.jpg",description:"Compete for strikes, spares and high scores."},{name:"PIKK Pickleball",players:"2–4",icon:"🏓",theme:"pickleball",artwork:"/games/approved/06_pikk_pickleball.jpg",description:"Play singles or doubles on colorful courts."},{name:"PIKK Pool",players:"1–2",icon:"🎱",theme:"pool",artwork:"/games/approved/07_pikk_pool.jpg",description:"Play 8-ball pool against friends or the computer."},{name:"PIKK Cup Pong",players:"2–4",icon:"🥤",theme:"pong",artwork:"/games/approved/08_pikk_cup_pong.jpg",description:"Aim, throw and eliminate opponents’ cups."},{name:"PIKK Poker",players:"2–8",icon:"♠️",theme:"poker",artwork:"/games/approved/09_pikk_poker.jpg",description:"Social Texas Hold’em with nonredeemable Play Chips."},{name:"PIKK Blackjack",players:"1–5",icon:"🃏",theme:"blackjack",artwork:"/games/approved/10_pikk_blackjack.jpg",description:"Try for 21 against the dealer using Play Chips."},{name:"PIKK Slots",players:"1",icon:"🎰",theme:"slots",artwork:"/games/approved/11_pikk_slots.jpg",description:"Entertainment-only reels and virtual Play Chips."},{name:"PIKK Speed",players:"2",icon:"⚡",theme:"speed",artwork:"/games/approved/12_pikk_speed.jpg",description:"Race to play your cards before your opponent."},{name:"PIKK Spades",players:"4",icon:"♠",theme:"spades",artwork:"/games/approved/13_pikk_spades.jpg",description:"Partner strategy and card battles."},{name:"PIKK Dominoes",players:"2–4",icon:"🁢",theme:"dominoes",artwork:"/games/approved/14_pikk_dominoes.jpg",description:"Match tiles and outplay opponents."},{name:"PIKK Chess",players:"2",icon:"♟",theme:"chess",artwork:"/games/approved/15_pikk_chess.jpg",description:"Challenge opponents in a classic strategy game."}]);function Pa(e){return e!=null&&e.artwork?(Of&&"/pikk-app/"||"/").replace(/\/?$/,"/")+String(e.artwork).replace(/^\/+/,""):""}const Ia=Object.freeze({videos:[{title:"Video Feed",href:"#/videos",detail:"Watch and discover videos",icon:"▶"},{title:"Shorts & Reels",href:"#/shorts",detail:"Browse short-form clips",icon:"▣"},{title:"Posts",href:"#/posts",detail:"View the community feed",icon:"▤"},{title:"Upload Video",href:"#/posts?type=video",detail:"Available prototype publishing tools · TEST MODE",icon:"⇧"},{title:"24/7 Viral Live",href:"#/viral-live",detail:"Rotating viral clips · preview",icon:"◉"},{title:"Spotlight",href:"#/spotlight",detail:"Featured creators · preview",icon:"✦"},{title:"Clippers",href:"#/clippers",detail:"Clip creators · TEST MODE",icon:"✂"},{title:"Stories",href:"#/story",detail:"Share to Everyone or Crew · TEST MODE",icon:"◌"},{title:"Premieres",detail:"Video premieres · Coming Soon",icon:"▶"}],connect:[{title:"Connect",href:"#/connect",detail:"Discover people and communities",icon:"♧"},{title:"PIKK Communities",href:"#/communities",detail:"Topic discussions, votes and replies · TEST MODE",icon:"#"},{title:"Messages",href:"#/messages",detail:"Open your messages",icon:"✉"},{title:"PIKK Crew",href:"#/crew",detail:"Private story list · TEST MODE",icon:"◎"},{title:"Favorites",href:"#/favorites",detail:"People who rank first · TEST MODE",icon:"★"},{title:"Random Chat",href:"#/connect#connect-random-chat",detail:"Preview only · real matching unavailable",icon:"◉"},{title:"Multistream",href:"#/connect#connect-multistream",detail:"Broadcast connection preview · TEST MODE",icon:"▹"},{title:"Explore",href:"#/explore",detail:"Search people, music, videos, live",icon:"⌕"},{title:"Live Rooms",href:"#/live",detail:"Live room directory · TEST MODE",icon:"●"},{title:"Fan Clubs",href:"#/fanclubs",detail:"Creator fan clubs · TEST MODE",icon:"♛"},{title:"Party Line",href:"#/multiguest",detail:"Multi-guest rooms · preview",icon:"☎"},{title:"Notifications",href:"#/notifications",detail:"Your activity",icon:"🔔"},{title:"City Connect",detail:"City-based rooms · Coming Soon",icon:"⌂"},{title:"Events",detail:"Community events · Coming Soon",icon:"◷"}],dating:[{title:"Discover Dating",href:"#/dating",detail:"Explore dating features · TEST MODE",icon:"♡"},{title:"Messages",href:"#/messages",detail:"Open private messages",icon:"✉"},{title:"My Profile",href:"#/profile",detail:"Review your profile settings",icon:"◉"},{title:"Safety Guidelines",href:"#/guidelines",detail:"Review community safety rules",icon:"◇"},{title:"Matches",detail:"Mutual matches · Coming Soon",icon:"♥"},{title:"Liked You",detail:"Who liked you · Coming Soon",icon:"♡"},{title:"Age & ID Verification",detail:"18+ identity checks · Coming Soon",icon:"✓"},{title:"Report & Block",href:"#/shield",detail:"PIKK Shield safety tools · TEST MODE",icon:"⚑"}],games:[{title:"PIKK Arcade",href:"#/games",detail:"View the full game collection · preview",icon:"♜"},...it.map(e=>({title:e.name,...e.href?{href:e.href}:{},detail:e.href?"Fighting game · development preview":e.description+" · planned",icon:e.name==="Block Wars"?"▣":"♜"})),{title:"Roast Arena",href:"#/roast-arena",detail:"Roast battles · preview",icon:"🔥"},{title:"PIKK Battles",href:"#/battles",detail:"Streamer vs streamer · audience votes decide · TEST MODE",icon:"⚔"},{title:"Missions",href:"#/missions",detail:"Daily missions · TEST MODE",icon:"★"},{title:"Loyalty Rewards",href:"#/loyalty",detail:"Play Chips & rewards · no cash value",icon:"◆"}],shop:[{title:"PIKK Shop",href:"#/shop",detail:"Browse available products",icon:"▤"},{title:"Marketplace",href:"#/marketplace",detail:"Community listings · TEST MODE",icon:"◇"},{title:"Foreign X-Change",href:"#/merch",detail:"Official merchandise",icon:"✦"},{title:"Creator Pricing",href:"#/pricing",detail:"Explore creator selling information",icon:"$"},{title:"Profile Shop",href:"#/profile-shop",detail:"Creator storefront · preview",icon:"▦"},{title:"Wallet",href:"#/wallet",detail:"Balance & activity · TEST MODE",icon:"◎"},{title:"Sell on PIKK",href:"#/pricing?focus=sell",detail:"Seller rules & apply · TEST MODE",icon:"⇧"},{title:"Orders & Shipping",detail:"Order tracking · Coming Soon",icon:"⛟"},{title:"Refunds",detail:"Returns & disputes · Coming Soon",icon:"↺"}]}),qf=Object.freeze({"Video Feed":"videos","Shorts & Reels":"videos",Posts:"posts","Upload Video":"videos",Connect:"profile","PIKK Communities":"chat",Communities:"chat",Messages:"msg","Random Chat":"camera",Multistream:"live","Discover Dating":"heart","My Profile":"profile","Safety Guidelines":"heart","PIKK Arcade":"game","PIKK Speed":"game","PIKK Blackjack":"game","PIKK Slots":"game","PIKK Poker":"game","PIKK Spades":"game","PIKK Dominoes":"game","PIKK Chess":"game","PIKK Clash":"game","PIKK Knockout":"game","PIKK Playground":"game","PIKK Bowling":"game","PIKK Pickleball":"game","PIKK Pool":"game","PIKK Cup Pong":"game","Block Wars":"game","24/7 Viral Live":"live",Spotlight:"videos",Clippers:"videos",Stories:"camera",Premieres:"videos",Explore:"explore","Live Rooms":"live","Fan Clubs":"heart","Party Line":"chat",Notifications:"msg","City Connect":"explore",Events:"explore",Matches:"heart","Liked You":"heart","Age & ID Verification":"profile","Report & Block":"heart","Roast Arena":"game","PIKK Battles":"live",Missions:"game","Loyalty Rewards":"game","Profile Shop":"merch",Wallet:"merch","Sell on PIKK":"merch","Orders & Shipping":"merch",Refunds:"merch","PIKK Shop":"merch",Marketplace:"merch","Foreign X-Change":"merch","Creator Pricing":"posts"}),bd={videos:"pikkVideosMenu",connect:"pikkConnectMenu",dating:"pikkDatingMenu",games:"pikkGamesMenu",shop:"pikkShopMenu"};function Xt(e=!1){for(const[t,s]of Object.entries(bd)){const a=document.getElementById(s);if(!a||a.hidden)continue;a.hidden=!0;const i=document.querySelector(`#tabbar a[href="#/${t}"]`);i==null||i.setAttribute("aria-expanded","false"),e&&(i==null||i.focus())}}function Rf(e,t){var r,c,d;if(!Object.hasOwn(Ia,e))return;const s=bd[e];let a=document.getElementById(s);a||(a=document.createElement("div"),a.id=s,a.className="pikk-create-overlay",a.hidden=!0,a.innerHTML=`<div class="pikk-create-sheet" role="dialog" aria-modal="true" aria-labelledby="${s}Title">
      <div class="pikk-create-head"><strong id="${s}Title">${e[0].toUpperCase()+e.slice(1)} on PIKK</strong><button type="button" class="btn ghost" data-section-close aria-label="Close ${e} menu">✕</button></div>
      <div class="pikk-create-options pikk-create-grid">${Ia[e].map(u=>{const p=`<span class="pikk-menu-icon" aria-hidden="true">${ya[qf[u.title]||"explore"]}</span><strong class="pikk-menu-title">${u.title}</strong><small>${u.detail}</small>`;return u.href?`<a class="pikk-create-tile" href="${u.href}">${p}</a>`:`<div class="pikk-create-tile pikk-menu-planned" aria-disabled="true">${p}</div>`}).join("")}</div>
      <button type="button" class="pikk-menu-cancel" data-section-close>Cancel</button>
      <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · Production features are not enabled until secure services are available.</p>
    </div>`,document.body.appendChild(a),a.addEventListener("click",u=>{u.target===a||u.target.closest("[data-section-close]")?Xt(!0):u.target.closest(".pikk-create-options a")&&Xt()}),document.addEventListener("keydown",u=>{if(a.hidden)return;if(u.key==="Escape"){u.preventDefault(),Xt(!0);return}if(u.key!=="Tab")return;const p=[...a.querySelectorAll("button:not([disabled]), a[href]")],h=p[0],g=p[p.length-1];if(!h){u.preventDefault();return}a.contains(document.activeElement)?u.shiftKey&&document.activeElement===h?(u.preventDefault(),g.focus()):!u.shiftKey&&document.activeElement===g&&(u.preventDefault(),h.focus()):(u.preventDefault(),(u.shiftKey?g:h).focus())}),window.addEventListener("hashchange",()=>Xt()));const i=a.hidden;Xt();const n=document.getElementById("pikkMusicMenu");n&&!n.hidden&&(n.hidden=!0,(r=document.querySelector('#tabbar a[href="#/music"]'))==null||r.setAttribute("aria-expanded","false"));const o=document.getElementById("pikkCreateMenu");o&&!o.hidden&&(o.hidden=!0,(c=document.querySelector('#tabbar a[href="#/create"]'))==null||c.setAttribute("aria-expanded","false")),a.hidden=!i,t==null||t.setAttribute("aria-expanded",String(i)),i?(d=a.querySelector("[data-section-close]"))==null||d.focus():t==null||t.focus()}const yd=Object.freeze([{title:"Create on PIKK",items:[{title:"Post Photos",href:"#/posts?type=picture",detail:"Add photos · TEST MODE",icon:"camera"},{title:"Story",href:"#/story",detail:"Everyone or Crew · TEST MODE",icon:"camera"},{title:"Shorts / Reels",href:"#/posts?type=short",detail:"Short video · TEST MODE",icon:"videos"},{title:"Upload Video",href:"#/posts?type=video",detail:"Long video · TEST MODE",icon:"videos"},{title:"Create Post",href:"#/posts?type=text",detail:"Text / poll / link · TEST MODE",icon:"posts"},{title:"Go Live",href:"#/live?go=1",detail:"Start a stream · TEST MODE",icon:"live"},{title:"Upload Music",href:"#/music?view=upload",detail:"Beat / song · planned",icon:"music"},{title:"Sell Something",href:"#/marketplace",detail:"List a product · TEST MODE",icon:"merch"},{title:"Paid Content",href:"#/pricing",detail:"Premium creator content · planned",icon:"merch"}]},{title:"Social & Community",items:[{title:"Community Post",href:"#/community",detail:"Open community · preview",icon:"chat"},{title:"Reels",href:"#/posts?type=short",detail:"Short video · TEST MODE",icon:"videos"},{title:"Photo Post",href:"#/posts?type=picture",detail:"Photos · TEST MODE",icon:"camera"},{title:"PIKK Crew",href:"#/crew",detail:"Private story list · TEST MODE",icon:"heart"},{title:"Favorites",href:"#/favorites",detail:"People who rank first · TEST MODE",icon:"heart"},{title:"Create Poll",detail:"Interactive polls · Planned",icon:"posts"},{title:"Create Community",href:"#/community",detail:"Community area · preview",icon:"chat"},{title:"Create Chatroom",detail:"Room creation · Planned",icon:"msg"},{title:"Create Event",detail:"Events · Planned",icon:"explore"}]},{title:"Videos & Music",items:[{title:"Music Video",href:"#/posts?type=video",detail:"Video composer · TEST MODE",icon:"videos"},{title:"Short Video",href:"#/posts?type=short",detail:"Short composer · TEST MODE",icon:"videos"},{title:"Upload Song",detail:"Song publishing · Planned",icon:"music"},{title:"Upload Album",detail:"Album publishing · Planned",icon:"music"},{title:"Upload EP",detail:"EP publishing · Planned",icon:"music"},{title:"Upload Beats",detail:"Beat publishing · Planned",icon:"music"},{title:"Create Playlist",href:"#/music",detail:"Open music area · preview",icon:"music"},{title:"Add to Vault",href:"#/vault",detail:"Open Vault · preview",icon:"music"}]},{title:"Live & Commerce",items:[{title:"Schedule Live",detail:"Live scheduling · Planned",icon:"live"},{title:"Live Battle",href:"#/giftbattles",detail:"Battle area · preview",icon:"live"},{title:"List Product",href:"#/marketplace",detail:"Marketplace · TEST MODE",icon:"merch"},{title:"Seller Store",detail:"Store creation · Planned",icon:"merch"},{title:"Exclusive Content",detail:"Exclusive publishing · Planned",icon:"heart"}]},{title:"Creator Tools & Protection",items:[{title:"Creator Dashboard",href:"#/profile",detail:"Creator profile",icon:"profile"},{title:"Manage Content",href:"#/posts",detail:"Posts and content",icon:"posts"},{title:"Drafts",detail:"Draft management · Planned",icon:"posts"},{title:"Artist Protection",href:"#/shield",detail:"PIKK Shield local rights drafts · TEST MODE",icon:"music"},{title:"AI Support",detail:"Support assistant · Planned",icon:"chat"}]}]),Nf=Object.freeze(yd.flatMap(e=>e.items)),kd=Object.freeze([{label:"Songs",href:"#/music?view=songs",detail:"Browse released singles",icon:"♫"},{label:"Albums",href:"#/music?view=albums",detail:"Browse released albums",icon:"▣"},{label:"Beats",href:"#/music?view=beats",detail:"Beat marketplace not yet available",icon:"◉"},{label:"Playlists",href:"#/music?view=playlists",detail:"Verified YouTube playlists",icon:"▤"},{label:"Upload Music",href:"#/music?view=upload",detail:"Creator uploads coming later",icon:"⇧"},{label:"Trending",href:"#/music?view=songs",detail:"Most-played released songs",icon:"↗"},{label:"Music Vault",href:"#/vault",detail:"Vault · preview",icon:"◈"},{label:"AI Artists",href:"#/ai-artists",detail:"AI artist area · labelled AI",icon:"✦"},{label:"Open Mic",href:"#/openmic",detail:"Open mic sessions · TEST MODE",icon:"🎤"},{label:"Artist Earnings",href:"#/earnings",detail:"Creator earnings · TEST MODE",icon:"$"}]),Bf=Object.freeze({Songs:"music",Albums:"music",Beats:"music",Playlists:"videos","Upload Music":"music"});function la(e=!1){const t=document.getElementById("pikkMusicMenu");if(!t||t.hidden)return;t.hidden=!0;const s=document.querySelector('#tabbar a[href="#/music"]');s==null||s.setAttribute("aria-expanded","false"),e&&(s==null||s.focus())}function Kf(){let e=document.getElementById("pikkMusicMenu");return e||(e=document.createElement("div"),e.id="pikkMusicMenu",e.className="pikk-create-overlay",e.hidden=!0,e.innerHTML=`<div class="pikk-create-sheet" role="dialog" aria-modal="true" aria-labelledby="pikkMusicMenuTitle">
    <div class="pikk-create-head"><strong id="pikkMusicMenuTitle">Music on PIKK</strong><button type="button" class="btn ghost" data-music-close aria-label="Close music menu">✕</button></div>
    <div class="pikk-create-options pikk-create-grid">
      ${kd.map(t=>`<a class="pikk-create-tile" href="${t.href}"><span class="pikk-menu-icon" aria-hidden="true">${ya[Bf[t.label]||"music"]}</span><strong class="pikk-menu-title">${t.label}</strong><small>${t.detail}</small></a>`).join("")}
    </div>
    <button type="button" class="pikk-menu-cancel" data-music-close>Cancel</button>
    <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · Beat selling and music uploads are not available yet</p>
  </div>`,document.body.appendChild(e),window.addEventListener("hashchange",()=>la()),e.addEventListener("click",t=>{t.target===e||t.target.closest("[data-music-close]")?la(!0):t.target.closest(".pikk-create-options a")&&la()}),document.addEventListener("keydown",t=>{if(e.hidden||(t.key==="Escape"&&(t.preventDefault(),la(!0)),t.key!=="Tab"))return;const s=[...e.querySelectorAll("a[href], button:not([disabled])")],a=s[0],i=s[s.length-1];if(!a){t.preventDefault();return}e.contains(document.activeElement)?t.shiftKey&&document.activeElement===a?(t.preventDefault(),i.focus()):!t.shiftKey&&document.activeElement===i&&(t.preventDefault(),a.focus()):(t.preventDefault(),(t.shiftKey?i:a).focus())}),e)}function jf(e){var i,n;const t=Kf(),s=t.hidden,a=document.getElementById("pikkCreateMenu");s&&a&&!a.hidden&&(a.hidden=!0,(i=document.querySelector('#tabbar a[href="#/create"]'))==null||i.setAttribute("aria-expanded","false")),t.hidden=!s,e==null||e.setAttribute("aria-expanded",String(s)),s?(n=t.querySelector("[data-music-close]"))==null||n.focus():e==null||e.focus()}const li=Object.freeze([{tier:"spotlight",name:"Premium Spotlight",slots:1,day:199,week:999},{tier:"featured",name:"Featured Box",slots:2,day:99,week:499},{tier:"promo",name:"Promo Box",slots:3,day:49,week:249}]),Te=e=>Object.freeze(e),$i=Object.freeze([{id:"featured",title:"Featured placements",link:"#/videos",items:li.map(e=>Te({name:e.name,day:e.day,week:e.week,slots:e.slots}))},{id:"player",title:"Music Player placement",link:"#/home",items:[Te({name:"Top PIKK Music Player on Home (Trending / Promoted slot)",day:149,week:699,slots:20})]},{id:"storyrail",title:"Story rail placement",link:"#/home",items:[Te({name:"Home story rail (Trending / Promoted slot)",day:49,week:229,slots:20})]},{id:"music",title:"Music",link:"#/music",items:[Te({name:"Trending Music boost (tracks, albums)",day:29,week:129})]},{id:"videos",title:"Videos and Clips",link:"#/videos",items:[Te({name:"Video / Clip boost",day:19,week:89})]},{id:"live",title:"Live",link:"#/live",items:[Te({name:"Live stream boost (pre-live + during the live)",perStream:25})]},{id:"shop",title:"Shop",link:"#/shop",items:[Te({name:"Shop product boost",day:15,week:69}),Te({name:"Store spotlight",week:59})]},{id:"posts",title:"Posts and Stories",link:"#/posts",items:[Te({name:"Post / Story boost",day:9,week:39})]},{id:"profiles",title:"Profiles",link:"#/profile",items:[Te({name:"Profile / Creator boost",day:19,week:89})]},{id:"events",title:"Events",link:"#/openmic",items:[Te({name:"Event / Open Mic listing",perEvent:25})]},{id:"battles",title:"Battles and Roast",link:"#/giftbattles",items:[Te({name:"Battles / Roast Arena matchup feature",perMatch:35})]},{id:"communities",title:"Communities",link:"#/communities",items:[Te({name:"Community spotlight",week:29})]},{id:"dating",title:"Dating boost",link:"#/dating",gate:"18+ only · requires age & ID verification and safety review before launch",items:[Te({name:"Dating profile boost",hour:4.99,day:14.99})]}]),fs=e=>"$"+(Number.isInteger(e)?e:e.toFixed(2));function Ff(e){return[e.hour!=null&&`${fs(e.hour)} / hour`,e.day!=null&&`${fs(e.day)} / 24h`,e.week!=null&&`${fs(e.week)} / 7 days`,e.perStream!=null&&`${fs(e.perStream)} per stream`,e.perEvent!=null&&`${fs(e.perEvent)} per event`,e.perMatch!=null&&`${fs(e.perMatch)} per match`].filter(Boolean)}const wd=Object.freeze({player:20,storyrail:20,spotlight:1,featured:2,promo:3}),Uf=Object.freeze({player:0,storyrail:0,spotlight:0,featured:0,promo:0});function Gf(e,t){const s=Math.max(0,e|0),a=Math.min(s,Math.max(0,t|0)),i=s-a;return{cap:s,booked:a,left:i,soldOut:i===0,label:i===0?"Sold out":`${i} of ${s} slots left`}}const Vf=e=>`#/promote?s=${e}`;function Hf(e={}){return e.promoted&&e.house?"Promoted · House demo":e.trending===!0?"Trending":"House pick"}const xn=e=>({title:e.title||e.label,href:e.href||"",detail:e.detail||""});function zf(e){return e==="music"?kd.map(xn):e==="create"?Nf.map(xn):(Ia[e]||[]).map(xn)}const Wf=gr.map(e=>e.href.replace("#/","")),Yf=Object.freeze({id:"promote",label:"Promote",links:$i.map(e=>({href:Vf(e.id),label:e.title}))}),Fo=[{id:"explore",label:"Explore",href:"#/explore"},{id:"profile",label:"Profile / Sign in",href:"#/profile"},{id:"messages",label:"Messages",href:"#/messages"},{id:"notifications",label:"Notifications",href:"#/notifications"},{id:"settings",label:"Settings",href:"#/settings"},{id:"donate",label:"Donate · PIKK goal",href:"#/donate"},{id:"support",label:"Support · Help & tickets",href:"#/support"}],An=e=>"/"+String(e).replace(/^#\/?/,"").split(/[?#]/)[0];function Jf(){const e=Wf.map(n=>{const o=gr.find(r=>r.href==="#/"+n);return{id:n,label:o.label,links:zf(n).map(r=>({href:r.href,label:r.title,soon:!r.href,detail:r.detail}))}}),t=new Set(["/home",...e.flatMap(n=>n.links.filter(o=>o.href).map(o=>An(o.href))),...Fo.map(n=>An(n.href)),"/promote"]),s=ic.flatMap(n=>n.href?[{href:n.href,label:n.label}]:n.links||[]),a=new Set,i=s.filter(n=>{const o=An(n.href);return t.has(o)||a.has(o)?!1:(a.add(o),!0)});return[{id:"home",label:"Home",href:"#/home"},...e,Yf,...Fo,{id:"more",label:"More",links:i},{id:"updates",label:"What's New · App Updates",href:"#/updates"}]}const Qf=3,Xf=3e4,Sd="pikk.playCounts.v1";let $d={};const Ed=()=>{try{return globalThis.localStorage||null}catch{return null}};function xd(){const e=Ed();try{return JSON.parse((e?e.getItem(Sd):$d.v)||"{}")}catch{return{}}}function Zf(e){const t=JSON.stringify(e),s=Ed();s?s.setItem(Sd,t):$d.v=t}const Uo=new Map;function Vr(e,{kind:t="audio",seconds:s=0,opened:a=!1,source:i="organic",now:n=Date.now()}={}){var u;const o=String(e||"").trim();if(!o||(t==="story"?!a:!(Number(s)>=Qf)))return!1;const r=Uo.get(o);if(r!=null&&n-r<Xf)return!1;Uo.set(o,n);const c=xd(),d=c[o]||{total:0,promote:0};d.total+=1,i==="promote"&&(d.promote+=1),c[o]=d,Zf(c);try{(u=globalThis.dispatchEvent)==null||u.call(globalThis,new CustomEvent("pikk:playcount",{detail:{id:o,count:d.total}}))}catch{}return!0}function Ad(e){var t;return((t=xd()[String(e||"").trim()])==null?void 0:t.total)||0}function Td(e,t="audio"){return`${e} ${t==="audio"?e===1?"play":"plays":e===1?"view":"views"} · this device`}function Cd(e=globalThis.document){var s,a;if(!(e!=null&&e.querySelectorAll))return;const t=i=>(String(i).match(/ytimg\.com\/vi(?:_webp)?\/([\w-]{6,})\//)||[])[1];for(const i of e.querySelectorAll('[data-yt], [data-video-id], img[src*="ytimg.com/vi"]')){const n=((s=i.dataset)==null?void 0:s.yt)||((a=i.dataset)==null?void 0:a.videoId)||t(i.getAttribute("src"));if(!n)continue;const o=i.tagName==="IMG"?i.parentElement:i;if(!o)continue;let r=o.querySelector(":scope > .pikk-play-count");const c=Ad(n);if(!c){r==null||r.remove();continue}r||(r=e.createElement?e.createElement("small"):globalThis.document.createElement("small"),r.className="pikk-play-count",o.appendChild(r)),r.dataset.playCountFor=n,r.textContent=Td(c,"video")}}const Go="https://www.youtube.com/iframe_api";let X=[],ne=0,_=null,za=!1,Ke=!1,We=!1;const te=new Set;let Vo=!1,Ho=null;const zo=new Map;function ft(e){if(!e)return"";try{const t=new URL(e);if(t.hostname.includes("youtu.be"))return t.pathname.slice(1).split("/")[0]||"";const s=t.searchParams.get("v");if(s)return s;const a=t.pathname.match(/\/embed\/([^/?]+)/);if(a)return a[1]==="videoseries"?"":a[1]}catch{}return""}function Wo(e){if(!e)return"";try{return new URL(e).searchParams.get("list")||""}catch{return""}}function Ts(e){return e?`https://i.ytimg.com/vi/${e}/hqdefault.jpg`:""}function eg(){var n,o;const e=[],t=new Set,s=new Set,a=r=>{if(r.playlistId){if(s.has(r.playlistId))return;s.add(r.playlistId)}else if(r.youtubeId){if(t.has(r.youtubeId))return;t.add(r.youtubeId)}else return;e.push(r)};for(const r of vt){const c=((n=r.links)==null?void 0:n.youtube)||"",d=ft(c)||ft(((o=r.links)==null?void 0:o.youtubeMusic)||"");d&&a({id:r.id,title:r.title,artist:r.artist||"DatBoiSkeet",cover:r.cover||Ts(d),youtubeId:d,youtube:c||`https://www.youtube.com/watch?v=${d}`,embed:`https://www.youtube.com/embed/${d}`,links:{...r.links||{},youtube:c||`https://www.youtube.com/watch?v=${d}`},kind:"track"})}for(const r of fr){const c=Wo(r.youtube)||Wo(r.embed);c&&a({id:r.id,title:r.title,artist:"DatBoiSkeet",cover:Ts("DTe4OiX2otg")||"/brand/pikk-logo-square.png",playlistId:c,youtube:r.youtube,embed:r.embed||`https://www.youtube.com/embed/videoseries?list=${c}`,links:{youtube:r.youtube,youtubeMusic:ke.youtubeMusic,spotify:ke.spotify,apple:ke.apple},kind:"mix"})}const i=new Set(["Music Videos"]);for(const r of fe){if(!i.has(r.category||"Music Videos")||!r.featured&&!["dirty-money","93","no-love","bouquet","where-im-from","go-2-work"].includes(r.id)&&!r.featured)continue;const c=ft(r.youtube)||ft(r.embed);if(!c||t.has(c))continue;const d=vt.find(u=>{var p;return ft(((p=u.links)==null?void 0:p.youtube)||"")===c});a({id:r.id,title:r.title,artist:r.artist||"DatBoiSkeet",cover:(d==null?void 0:d.cover)||Ts(c),youtubeId:c,youtube:r.youtube,embed:r.embed||`https://www.youtube.com/embed/${c}`,links:{youtube:r.youtube,youtubeMusic:`https://music.youtube.com/watch?v=${c}`,...(d==null?void 0:d.links)||{}},kind:"mv"})}return X=e,ne>=X.length&&(ne=0),X}function dt(e){return String(e||"").toLowerCase().replace(/\(.*?\)/g,"").replace(/[^a-z0-9]+/g," ").trim()}function Pd(){var a,i;const e=od();if(!e)return{item:null,meta:null,playable:!1};const t=dt(e.title),s=X.find(n=>dt(n.title)===t||dt(n.title).includes(t)||t.includes(dt(n.title)));if(s&&(s.youtubeId||s.playlistId))return{item:{...s},meta:e,playable:!0};for(const n of vt){if(dt(n.title)!==t&&!dt(n.title).startsWith(t)&&!t.startsWith(dt(n.title)))continue;const o=((a=n.links)==null?void 0:a.youtube)||"",r=ft(o)||ft(((i=n.links)==null?void 0:i.youtubeMusic)||"");return r?{item:{id:n.id,title:n.title,artist:n.artist||"DatBoiSkeet",cover:n.cover||Ts(r),youtubeId:r,youtube:o||`https://www.youtube.com/watch?v=${r}`,embed:`https://www.youtube.com/embed/${r}`,links:{...n.links||{},youtube:o||`https://www.youtube.com/watch?v=${r}`},kind:"track"},meta:e,playable:!0}:{item:{id:n.id,title:n.title,artist:n.artist||"DatBoiSkeet",cover:n.cover||e.cover||"",youtube:o||ke.youtube,embed:"",links:{...n.links||{}},kind:"track"},meta:e,playable:!1}}for(const n of fe){if(dt(n.title)!==t&&!dt(n.title).includes(t))continue;const o=ft(n.youtube)||ft(n.embed);if(o)return{item:{id:n.id,title:n.title,artist:n.artist||"DatBoiSkeet",cover:Ts(o),youtubeId:o,youtube:n.youtube,embed:n.embed||`https://www.youtube.com/embed/${o}`,links:{youtube:n.youtube,youtubeMusic:`https://music.youtube.com/watch?v=${o}`},kind:"mv"},meta:e,playable:!0}}return{item:{id:e.id||"most-played",title:e.title||"Most played",artist:e.artist||"DatBoiSkeet",cover:e.cover||"",youtube:"",embed:"",links:{spotify:ke.spotify,apple:ke.apple,youtubeMusic:ke.youtubeMusic,youtube:ke.youtube},kind:"track"},meta:e,playable:!1}}function Id(){const e=document.getElementById("spPlayNextMost"),t=document.getElementById("spPlayNextSub"),{meta:s,playable:a}=Pd();if(e){if(!s){e.hidden=!0;return}if(e.hidden=!1,e.dataset.playable=a?"1":"0",e.dataset.demo=s.demo?"1":"0",e.title=a?`Most played today · ${s.title} → Play next`:`Most played today · ${s.title} (Coming Soon / open platform)`,e.setAttribute("aria-label",`Play next — ${s.title}`),t){const i=s.demo?"DEMO · ":"";t.textContent=`${i}Most played today · ${s.title}`}}}function Yo(e){if(!e)return-1;if(!X.length)return X.push(e),ne=0,0;let t=X.findIndex(a=>e.youtubeId&&a.youtubeId===e.youtubeId||e.playlistId&&a.playlistId===e.playlistId||a.id===e.id);if(t===ne)return ne;if(t>=0){const[a]=X.splice(t,1);t<ne&&(ne-=1),e=a}const s=Math.min(ne+1,X.length);return X.splice(s,0,e),s}function tg(){var n,o,r,c;const{item:e,meta:t,playable:s}=Pd();if(!t||!e){f("No most-played track yet");return}if(!s){const d=document.getElementById("spOpen"),u=((n=e.links)==null?void 0:n.apple)||((o=e.links)==null?void 0:o.youtubeMusic)||((r=e.links)==null?void 0:r.spotify)||((c=e.links)==null?void 0:c.youtube)||ke.apple;d&&u&&(d.href=u),f(t.demo||t.status==="Coming Soon"?`${t.title} · Coming Soon — no in-app master. Open Music / Stream Everywhere when it drops.`:`${t.title} — open official platform (not in-app audio)`),Id();return}if(on()||!!We&&Ke&&te.size===0||te.size>0){const d=Yo(e);f(d===ne?`Already playing · ${e.title}`:`Queued next · ${e.title}`),ge();return}let i=X.findIndex(d=>e.youtubeId&&d.youtubeId===e.youtubeId||e.playlistId&&d.playlistId===e.playlistId||d.id===e.id);i<0&&(i=Yo(e)),qd(i),f(`Playing · ${e.title}`)}const Js=[];function Md(){var e;return(e=window.YT)!=null&&e.Player?Promise.resolve(window.YT):new Promise(t=>{var a;if(Js.push(t),za)return;za=!0;const s=window.onYouTubeIframeAPIReady;if(window.onYouTubeIframeAPIReady=()=>{za=!1;try{s==null||s()}catch{}const i=window.YT;for(;Js.length;)try{Js.shift()(i)}catch{}Ds()},document.querySelector(`script[src="${Go}"]`)){if((a=window.YT)!=null&&a.Player){za=!1;const i=window.YT;for(;Js.length;)try{Js.shift()(i)}catch{}Ds()}}else{const i=document.createElement("script");i.src=Go,i.async=!0,document.head.appendChild(i)}})}function Ld(){Md().then(()=>Ds()).catch(()=>{})}function Ds(){var n;if(!(document.getElementById("dbsStickyFrame")||document.getElementById("dbsYtHost"))||!((n=window.YT)!=null&&n.Player)||_)return;const t=X[ne],s={autoplay:0,controls:0,rel:0,modestbranding:1,playsinline:1,enablejsapi:1,origin:location.origin},a={height:"1",width:"1",playerVars:s,events:{onReady:()=>{ge()},onStateChange:o=>{var r;if(clearTimeout(Ho),o.data===1){if(te.size>0||!We){try{(r=_==null?void 0:_.pauseVideo)==null||r.call(_)}catch{}ge();return}const c=X[ne];Ho=setTimeout(()=>{X[ne]===c&&on()&&(Vr((c==null?void 0:c.youtubeId)||(c==null?void 0:c.title),{kind:"audio",seconds:3,source:c!=null&&c.promoted?"promote":"organic"}),ge())},3e3)}o.data===0&&Od({auto:!0}),ge()},onError:()=>{f("YouTube embed error — Open on YouTube"),ge()}}};t!=null&&t.playlistId?a.playerVars={...s,listType:"playlist",list:t.playlistId}:t!=null&&t.youtubeId?a.videoId=t.youtubeId:a.videoId="DTe4OiX2otg";const i=document.getElementById("dbsStickyFrame")?"dbsStickyFrame":"dbsYtHost";_=new window.YT.Player(i,a)}function Ma({autoplay:e}={autoplay:!1}){const t=X[ne];if(!t||!(_!=null&&_.cueVideoById)){Ds();return}try{t.playlistId?(typeof _.loadPlaylist=="function"?_.loadPlaylist({list:t.playlistId,listType:"playlist",index:0}):typeof _.cuePlaylist=="function"&&_.cuePlaylist({list:t.playlistId,listType:"playlist",index:0}),e&&Ke&&te.size===0&&setTimeout(()=>{var s;if(!(te.size>0||!Ke||!We))try{(s=_==null?void 0:_.playVideo)==null||s.call(_)}catch{}},250)):t.youtubeId&&(e&&Ke&&te.size===0?_.loadVideoById(t.youtubeId):_.cueVideoById(t.youtubeId))}catch{}ge()}function on(){var e;try{return((e=_==null?void 0:_.getPlayerState)==null?void 0:e.call(_))===1}catch{return!1}}function ge(){var p,h,g;const e=X[ne],t=document.getElementById("spArt"),s=document.getElementById("spTitle"),a=document.getElementById("spSub"),i=document.getElementById("spPlay"),n=document.getElementById("spOpen"),o=document.getElementById("spSource"),r=te.size>0,c=!r&&(We||on());t&&e&&(t.src=e.cover||Ts(e.youtubeId||"")||"/brand/pikk-logo-square.png",t.alt=e.title||""),s&&(s.textContent=(e==null?void 0:e.title)||"PIKK Music");const d=document.getElementById("spPlays");if(d){const v=e?Ad(e.youtubeId||e.title):0;d.textContent=v?Td(v,"audio"):""}if(a&&(Ke?r?a.textContent=`Paused · ${[...te][0]} interrupt`:a.textContent=`${(e==null?void 0:e.artist)||"DatBoiSkeet"} · via YouTube (not Spotify in-app)`:a.textContent="Tap Play · YouTube embed · Stream Everywhere"),i&&(i.textContent=c?"❚❚":"▶",i.setAttribute("aria-label",c?"Pause":"Play PIKK Music"),i.dataset.playing=c?"1":"0"),n&&e){const v=((p=e.links)==null?void 0:p.apple)||((h=e.links)==null?void 0:h.youtubeMusic)||((g=e.links)==null?void 0:g.spotify)||e.youtube||ke.apple;n.href=v,n.title="Open on official platform"}o&&(o.textContent=(e==null?void 0:e.kind)==="mix"?"YT Mix":(e==null?void 0:e.kind)==="mv"?"YT MV":"YouTube");const u=document.getElementById("spBadge");u&&(u.textContent=r?"INTERRUPTED":Ke&&c?"PLAYING · YT":"TEST · YT EMBED"),Id()}function sg(){var e;if(te.size>0){f("Paused for "+[...te][0]+" — resume when done"),ge();return}Ke=!0,We=!0,Ld(),Ds();try{if(_!=null&&_.playVideo){const t=(e=_.getPlayerState)==null?void 0:e.call(_);t===-1||t===5||t===void 0?Ma({autoplay:!0}):_.playVideo()}else{const t=setInterval(()=>{_!=null&&_.playVideo&&(clearInterval(t),Ma({autoplay:te.size===0&&We}))},120);setTimeout(()=>clearInterval(t),8e3)}}catch{f("Tap Play PIKK Music again if autoplay blocked")}ge()}function ag({clearDesire:e}={}){var t;e&&(We=!1);try{(t=_==null?void 0:_.pauseVideo)==null||t.call(_)}catch{}ge()}function Ua(e="user"){e&&e!=="user"&&te.add(e),ag({clearDesire:e==="user"}),ge()}function Dd(e){var t;if(e?te.delete(e):te.clear(),te.size===0&&Ke&&We)try{(t=_==null?void 0:_.playVideo)==null||t.call(_)}catch{}ge()}function Ei(e){return Dd(e)}function _s(){Ua("video")}function Tn(){Ua("live")}function _d(){Ei("live")}function kt(){Ei("video")}function Od({auto:e}={}){X.length&&(ne=(ne+1)%X.length,We=!0,e||(Ke=!0),Ma({autoplay:Ke&&te.size===0}),ge())}function ig(){X.length&&(ne=(ne-1+X.length)%X.length,Ke=!0,We=!0,Ma({autoplay:te.size===0}),ge())}function qd(e){e<0||e>=X.length||(ne=e,Ke=!0,We=!0,Ma({autoplay:te.size===0}),ge())}function ng(){var e,t,s,a,i,n;Vo||(Vo=!0,(e=document.getElementById("spPlay"))==null||e.addEventListener("click",()=>{if(te.size>0){f("Other audio is playing — PIKK music will resume afterward");return}on()?Ua("user"):sg()}),(t=document.getElementById("spPrev"))==null||t.addEventListener("click",()=>{ig()}),(s=document.getElementById("spNext"))==null||s.addEventListener("click",()=>{Od()}),mg(),(a=document.getElementById("spOpen"))==null||a.addEventListener("click",o=>{f("Opening external music service (playback depends on provider)")}),(i=document.getElementById("spPlayNextMost"))==null||i.addEventListener("click",()=>{tg()}),(n=document.getElementById("spQueueBtn"))==null||n.addEventListener("click",()=>{const o=document.getElementById("spQueuePanel");if(!o)return;o.hasAttribute("hidden")?(o.removeAttribute("hidden"),o.innerHTML=X.map((c,d)=>`<button type="button" class="sp-q-item${d===ne?" on":""}" data-i="${d}">
              <img src="${c.cover||""}" alt="" width="36" height="36" />
              <span><b>${Jo(c.title)}</b><small>${Jo(c.artist)} · ${c.kind}</small></span>
            </button>`).join(""),o.querySelectorAll(".sp-q-item").forEach(c=>{c.addEventListener("click",()=>{qd(Number(c.dataset.i)),o.setAttribute("hidden","")})})):o.setAttribute("hidden","")}),document.addEventListener("click",o=>{const r=document.getElementById("spQueuePanel");!r||r.hasAttribute("hidden")||!o.target.closest("#spQueuePanel")&&!o.target.closest("#spQueueBtn")&&r.setAttribute("hidden","")}))}function Jo(e){return String(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}let Qo=!1;function rg(){Qo||(Qo=!0,window.addEventListener("dbs:interrupt-music",e=>{var s;const t=((s=e==null?void 0:e.detail)==null?void 0:s.reason)||"user";Ua(t)}))}function og(){eg(),ng(),rg(),ge(),Ld(),setTimeout(()=>Ds(),400)}function lg(e){var a,i;const t=e==="/live",s=e==="/videos"||e==="/home"||e==="/music"||e==="/vault";!t&&te.has("live")&&Ei("live");for(const[n,o]of[...ie.entries()])if(!document.getElementById(n)){o.playing&&(at=Math.max(0,at-1));try{(i=(a=o.player)==null?void 0:a.destroy)==null||i.call(a)}catch{}ie.delete(n)}at===0&&!s&&te.has("video")&&Ei("video"),ge()}const ie=new Map;let at=0,Xo=0;function Zn(e){var s;if(!e||!(e instanceof Element))return!0;const t=e.id||"";return!!(t==="dbsStickyFrame"||t==="dbsYtHost"||(s=e.closest)!=null&&s.call(e,"#dbs-sticky-player, #stickyPlayer, #dbsStickyFrame, #dbsYtHost"))}function Hr(e){return e?/youtube\.com\/embed|youtube-nocookie\.com\/embed|youtu\.be\//.test(e):!1}function cg(e){let t=e.getAttribute("src")||e.src||"";if(!Hr(t))return!1;let s=!1;return/[?&]enablejsapi=1(?:&|$)/.test(t)||(t+=(t.includes("?")?"&":"?")+"enablejsapi=1",s=!0),/[?&]origin=/.test(t)||(t+=(t.includes("?")?"&":"?")+"origin="+encodeURIComponent(location.origin),s=!0),s&&(e.setAttribute("src",t),e.src=t),!0}function dg(e){if(e.id&&!ie.has(e.id)&&e.id!=="dbsStickyFrame"&&e.id!=="dbsYtHost"||e.id&&ie.has(e.id))return e.id;Xo+=1;const t=`dbs-page-yt-${Xo}`;return e.id=t,t}function ug(e,t){var a,i,n;const s=ie.get(e);if(s){if(clearTimeout(zo.get(e)),t.data===1){const o=(n=(i=(a=t.target)==null?void 0:a.getVideoData)==null?void 0:i.call(a))==null?void 0:n.video_id;o&&zo.set(e,setTimeout(()=>{var r,c;(r=ie.get(e))!=null&&r.playing&&(Vr(o,{kind:"video",seconds:3,source:(c=document.querySelector(`#${CSS.escape(e)}`))!=null&&c.closest("[data-promoted]")?"promote":"organic"}),Cd(document))},3e3))}t.data===1?(s.playing||(s.playing=!0,at+=1),_s()):(t.data===0||t.data===2)&&(s.playing&&(s.playing=!1,at=Math.max(0,at-1)),at===0&&kt())}}function Rd(e){var n,o;const t=typeof e=="string"?document.getElementById(e):e;if(!t||Zn(t))return Promise.resolve(null);let s=t;if(t.tagName!=="IFRAME"&&(s=((n=t.querySelector)==null?void 0:n.call(t,"iframe"))||t),!s||s.tagName!=="IFRAME"||Zn(s))return Promise.resolve(null);const a=s.getAttribute("src")||s.src||"";if(!Hr(a)||!cg(s))return Promise.resolve(null);const i=dg(s);return ie.has(i)&&((o=ie.get(i))!=null&&o.player)?Promise.resolve(ie.get(i).player):Md().then(()=>new Promise(r=>{var p;if(ie.has(i)&&((p=ie.get(i))!=null&&p.player)){r(ie.get(i).player);return}const c=()=>{var h;if(!document.getElementById(i)){r(null);return}if(ie.has(i)&&((h=ie.get(i))!=null&&h.player)){r(ie.get(i).player);return}try{const g=new window.YT.Player(i,{events:{onReady:()=>{},onStateChange:v=>ug(i,v),onError:()=>{}}});ie.set(i,{player:g,el:s,playing:!1}),s.dataset.dbsYtBound="1",r(g)}catch(g){console.warn("[dbs] bindYoutubeInterrupt failed",i,g),r(null)}};if(s.dataset.dbsYtBound==="1"&&ie.has(i)){r(ie.get(i).player);return}let d=!1;const u=()=>{d||(d=!0,c())};s.addEventListener("load",u,{once:!0}),setTimeout(u,400)}))}function ln(e){const s=[...(e&&e.querySelectorAll?e:document).querySelectorAll("iframe")].filter(a=>{if(Zn(a))return!1;const i=a.getAttribute("src")||a.src||"";return Hr(i)});return Promise.all(s.map(a=>Rd(a)))}function pg(e){var i,n;const t=typeof e=="string"?document.getElementById(e):e,s=typeof e=="string"?e:t==null?void 0:t.id;if(!s||s==="dbsStickyFrame"||s==="dbsYtHost")return;const a=ie.get(s);if(a){a.playing&&(a.playing=!1,at=Math.max(0,at-1),at===0&&kt());try{(n=(i=a.player)==null?void 0:i.destroy)==null||n.call(i)}catch{}ie.delete(s)}}function Wa(e){if(!Number.isFinite(e)||e<=0)return"--:--";const t=Math.floor(e);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}let Cn=!1;function mg(){var i;const e=document.getElementById("spSeek"),t=document.getElementById("spTimeCur"),s=document.getElementById("spTimeDur"),a=document.getElementById("spVol");!e||!t||!s||(e.addEventListener("input",()=>{Cn=!0}),e.addEventListener("change",()=>{var o,r;const n=((o=_==null?void 0:_.getDuration)==null?void 0:o.call(_))||0;n>0&&((r=_.seekTo)==null||r.call(_,Number(e.value)/1e3*n,!0)),Cn=!1}),a==null||a.addEventListener("input",()=>{var n;return(n=_==null?void 0:_.setVolume)==null?void 0:n.call(_,Number(a.value))}),(i=document.getElementById("spCast"))==null||i.addEventListener("click",()=>f("Cast is not available yet")),setInterval(()=>{var r,c;const n=((r=_==null?void 0:_.getDuration)==null?void 0:r.call(_))||0,o=((c=_==null?void 0:_.getCurrentTime)==null?void 0:c.call(_))||0;n>0?(e.disabled=!1,Cn||(e.value=String(Math.round(o/n*1e3))),t.textContent=o>0?Wa(o):"0:00",s.textContent=Wa(n),e.setAttribute("aria-valuetext",`${Wa(o)} of ${Wa(n)}`),e.style.setProperty("--sp-pct",`${o/n*100}%`)):(e.disabled=!0,t.textContent="--:--",s.textContent="--:--")},500))}const xi=new Set;function Ye(){const e=(location.hash||"").replace(/^#/,"")||"/home";let t="",s=e;const a=e.indexOf("#");a>=0&&(t=e.slice(a+1).split("?")[0],s=e.slice(0,a));const i=s.startsWith("/")?s:"/"+s,n=i.indexOf("?"),o=n===-1?i:i.slice(0,n),r=n===-1?"":i.slice(n+1),c=o.split("/").filter(Boolean).map((d,u)=>{if(u===0)return d;try{return decodeURIComponent(d)}catch{return d}});return{path:"/"+(c[0]||"home"),parts:c,query:Object.fromEntries(new URLSearchParams(r)),elementId:t,raw:i}}function U(e){const s=(e.startsWith("#")?e:"#"+(e.startsWith("/")?e:"/"+e)).replace(/^#/,"");if((location.hash||"").replace(/^#/,"")===s){xi.forEach(i=>i(Ye()));return}location.hash=s}function hg(e){return xi.add(e),()=>xi.delete(e)}function fg(){const e=()=>xi.forEach(t=>t(Ye()));window.addEventListener("hashchange",e),location.hash?e():location.hash="/home"}const gg={BASE_URL:"/pikk-app/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_BASE:"/pikk-app/",VITE_BUILD_SHA:"df4128bd0318860677ad40ecf80c05ec05a8b361",VITE_PIKK_API_BASE:"https://pikk-api.pikk-0fa.workers.dev"},Pn=gg&&"/pikk-app/"||"/",ks=Pn.endsWith("/")?Pn.slice(0,-1):Pn;function bt(e){if(e==null||e==="")return e;const t=String(e);return/^(https?:|data:|blob:|idb:|#|\/\/)/i.test(t)||ks&&(t===ks||t.startsWith(ks+"/"))?t:t.startsWith("/")?ks+t:(ks||"")+"/"+t}function Nd(e=document){ks&&(e.querySelectorAll("[src]").forEach(t=>{const s=t.getAttribute("src");if(!s)return;const a=bt(s);a!==s&&t.setAttribute("src",a)}),e.querySelectorAll("[srcset]").forEach(t=>{const s=t.getAttribute("srcset");if(!s||!s.includes("/"))return;const a=s.replace(/(^|,\s*)(\/(?!\/)[^\s,]+)/g,(i,n,o)=>n+bt(o));a!==s&&t.setAttribute("srcset",a)}),e.querySelectorAll("[data-zoom]").forEach(t=>{const s=t.getAttribute("data-zoom");if(!s)return;const a=bt(s);a!==s&&t.setAttribute("data-zoom",a)}),e.querySelectorAll("[poster]").forEach(t=>{const s=t.getAttribute("poster");if(!s)return;const a=bt(s);a!==s&&t.setAttribute("poster",a)}))}function Bd(e,t){e&&e.querySelectorAll("a[data-path]").forEach(s=>{const a=s.getAttribute("data-path")===t;s.classList.toggle("on",a),a?s.setAttribute("aria-current","page"):s.removeAttribute("aria-current")})}function vg(e,t){var i,n,o;const s=(o=(n=(i=t==null?void 0:t.querySelector)==null?void 0:i.call(t,"h1"))==null?void 0:n.textContent)==null?void 0:o.replace(/\s+/g," ").trim();return s?s.slice(0,80):(String((e==null?void 0:e.path)||"/home").split("/").filter(Boolean).pop()||"home").replace(/[-_]+/g," ").replace(/\b\w/g,r=>r.toUpperCase())}function bg(e,t,s,a=document){const i=vg(e,t);return a.title=`${i} | PIKK`,s&&(s.textContent=`${i} page loaded`),i}function yg({drawer:e,scrim:t,trigger:s},a,i=!1){var o;if(!e||!t||!s)return;const n=!!a;e.classList.toggle("open",n),e.setAttribute("aria-hidden",String(!n)),e.inert=!n,t.classList.toggle("show",n),s.setAttribute("aria-expanded",String(n)),s.setAttribute("aria-label",n?"Close navigation menu":"Open navigation menu"),n?(o=e.querySelector("button, a[href]"))==null||o.focus():i&&s.focus()}const kg="https://pikk-api.pikk-0fa.workers.dev".trim().replace(/\/$/,"");function zr(){return((typeof window<"u"&&typeof window.__PIKK_API_BASE__=="string"?window.__PIKK_API_BASE__.trim():"")||kg).replace(/\/$/,"")}function cn(){return zr()}function Ie(){return!!zr()}async function tt(e,{method:t="GET",body:s}={}){var o,r,c;const a=zr();if(!a){const d=new Error("PIKK API is not configured");throw d.code="api_not_configured",d}const i=await fetch(a+e,{method:t,credentials:"include",headers:s===void 0?void 0:{"Content-Type":"application/json"},body:s===void 0?void 0:JSON.stringify(s)});let n=null;try{n=await i.json()}catch{}if(!i.ok){const d=new Error(((o=n==null?void 0:n.error)==null?void 0:o.message)||`Request failed (${i.status})`);throw d.code=((r=n==null?void 0:n.error)==null?void 0:r.code)||"request_failed",d.status=i.status,d.details=((c=n==null?void 0:n.error)==null?void 0:c.details)||null,d.requestId=(n==null?void 0:n.request_id)||null,d}return n}const wg={me:()=>tt("/memberships/me")},Ve={health:()=>tt("/health"),me:()=>tt("/auth/me"),signup:({email:e,handle:t,displayName:s,password:a,signupRoles:i=["member"],gender:n})=>tt("/auth/signup",{method:"POST",body:{email:e,handle:t,display_name:s,password:a,signup_roles:i,...n?{gender:n}:{}}}),login:({email:e,password:t})=>tt("/auth/login",{method:"POST",body:{email:e,password:t}}),logout:()=>tt("/auth/logout",{method:"POST",body:{}}),verifyEmail:e=>tt("/auth/verify",{method:"POST",body:{token:e}}),resendVerification:()=>tt("/auth/resend-verification",{method:"POST",body:{}}),forgotPassword:e=>tt("/auth/forgot-password",{method:"POST",body:{email:e}}),resetPassword:({token:e,password:t})=>tt("/auth/reset-password",{method:"POST",body:{token:e,password:t}})},ci=Object.freeze({GUEST:"guest",DEMO:"demo",AUTHENTICATED:"authenticated"});let La=null;const er=new Set;function Sg(e){return er.add(e),()=>er.delete(e)}function Kd(e){const t=La;if(La=e,t!==e)for(const s of[...er])try{s(t,e)}catch{}}function di(e){const t=e!=null&&e.id?String(e.id):"";return Kd(t||null),La}function Cs(){Kd(null)}function Ne(){return La}function $g({demoUser:e=null,session:t=null}={}){var a;return((t==null?void 0:t.liveFromAuthMe)===!0&&((a=t==null?void 0:t.user)!=null&&a.id)?String(t.user.id):La)?ci.AUTHENTICATED:e?ci.DEMO:ci.GUEST}function Eg(e){return e===ci.AUTHENTICATED}const jd="pikk:membership-changed",xg=/^[A-Za-z0-9][A-Za-z0-9_+.-]{0,63}$/,Ag=/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;let tr=0,st="idle",Mt=null;function ca(){try{const e=typeof window<"u"?window:null;e&&typeof e.dispatchEvent=="function"&&typeof e.CustomEvent=="function"&&e.dispatchEvent(new e.CustomEvent(jd,{detail:dn()}))}catch{}}function Tg(e){const t=e&&typeof e=="object"?e.membership:null;return!t||typeof t!="object"||Array.isArray(t)||t.authoritative!==!0||t.status!=="active"&&t.status!=="inactive"||t.status==="active"&&(typeof t.plan!="string"||!xg.test(t.plan))||t.status==="inactive"&&t.plan!==null&&t.plan!==void 0||t.billing_configured!==void 0&&typeof t.billing_configured!="boolean"||t.current_period_end!==void 0&&t.current_period_end!==null&&(typeof t.current_period_end!="string"||!Ag.test(t.current_period_end))||t.entitlements!==void 0&&t.entitlements!==null&&(typeof t.entitlements!="object"||Array.isArray(t.entitlements))?null:t}function Fd(e="idle"){tr+=1,Mt=null,na(null),st=e,ca()}function Ai(){if(!Ns())return Promise.resolve(null);const e=Ne();if(!e)return(st!=="signed_out"||ni().userId)&&Fd("signed_out"),Promise.resolve(null);if(Mt&&Mt.userId===e)return Mt.promise;const t=++tr;ni().userId!==e&&na(null),st="loading",ca();const s=()=>t===tr&&Ne()===e,a=Promise.resolve().then(()=>wg.me()).then(i=>{if(!s())return null;const n=Tg(i);return n?(na(n,{userId:e}),st="ready",ca(),ni()):(na(null),st="error",ca(),null)},i=>(s()&&(na(null),st=i&&i.status===401?"signed_out":"error",ca()),null)).finally(()=>{Mt&&Mt.gen===t&&(Mt=null)});return Mt={userId:e,gen:t,promise:a},a}function dn(){if(!Ns())return{mode:"demo"};const e=Ne();if(!e)return{mode:"api",phase:"signed_out"};const t=ni();return st==="loading"?{mode:"api",phase:"loading"}:st==="error"?{mode:"api",phase:"error"}:st==="signed_out"?{mode:"api",phase:"signed_out"}:st!=="ready"||t.userId!==e?{mode:"api",phase:"loading"}:{mode:"api",phase:"ready",status:t.status,plan:t.plan,billing_configured:t.billing_configured,current_period_end:t.current_period_end,cancel_at_period_end:t.cancel_at_period_end,entitlements:t.entitlements}}Sg(()=>Fd(Ne()?"idle":"signed_out"));function Ud(e){const t=Ki.find(s=>s.id===e);return t?t.name:String(e||"")}function Cg(e){const t=new Date(e);return Number.isNaN(t.getTime())?"":t.toISOString().slice(0,10)}function Gd(e){if(!e||e.mode!=="api")return null;switch(e.phase){case"signed_out":return"Sign in to see your membership status.";case"loading":return"Checking membership status…";case"error":return"Membership status is unavailable right now."}if(e.status!=="active")return e.billing_configured?"No active membership.":"No active membership · memberships are not available yet.";let t=`Active membership · ${Ud(e.plan)}`;const s=e.current_period_end?Cg(e.current_period_end):"";return s&&(t+=e.cancel_at_period_end?` · ends ${s}`:` · current period ends ${s}`),e.entitlements||(t+=" · member perks are not enabled yet"),t}function Vd(e){return!e||e.mode!=="api"?null:e.phase==="loading"?"Membership · checking…":e.phase==="error"?"Membership · unavailable":e.phase==="signed_out"?null:e.status==="active"?`Member · ${Ud(e.plan)}`:"No membership"}function Hd(e,t){if(!e||typeof e.querySelectorAll!="function")return;const s=Gd(t),a=Vd(t);e.querySelectorAll("[data-server-membership]").forEach(i=>{const o=i.getAttribute("data-server-membership")==="chip"?a:s;i.textContent=o||"",i.hidden=!o,i.setAttribute("data-membership-phase",t&&t.phase?t.phase:"demo"),t&&t.phase==="ready"?i.setAttribute("data-membership-status",t.status):i.removeAttribute("data-membership-status")})}const Pg="https://pikk-api.pikk-0fa.workers.dev".trim().replace(/\/$/,"");function zd(){return((typeof window<"u"&&typeof window.__PIKK_API_BASE__=="string"?window.__PIKK_API_BASE__.trim():"")||Pg).replace(/\/$/,"")}function un(){return!!zd()}async function gs(e,{method:t="GET",body:s}={}){var o,r,c;const a=zd();if(!a){const d=new Error("PIKK API is not configured");throw d.code="api_not_configured",d}const i=await fetch(a+e,{method:t,credentials:"include",headers:s===void 0?void 0:{"Content-Type":"application/json"},body:s===void 0?void 0:JSON.stringify(s)});let n=null;try{n=await i.json()}catch{}if(!i.ok){const d=new Error(((o=n==null?void 0:n.error)==null?void 0:o.message)||`Request failed (${i.status})`);throw d.status=i.status,d.code=((r=n==null?void 0:n.error)==null?void 0:r.code)||"request_failed",d.details=((c=n==null?void 0:n.error)==null?void 0:c.details)||null,d}return n}const Dt={list:()=>gs("/messages/conversations"),unreadCount:()=>gs("/messages/unread-count"),start:e=>gs("/messages/conversations",{method:"POST",body:{handle:e}}),get:e=>gs("/messages/conversations/"+encodeURIComponent(e)),send:(e,t)=>gs("/messages/conversations/"+encodeURIComponent(e)+"/messages",{method:"POST",body:{message:t}}),markRead:e=>gs("/messages/conversations/"+encodeURIComponent(e)+"/read",{method:"POST",body:{}})},Ig="dbs_media_v1",Os="blobs",Mg=1;function Wd(){return new Promise((e,t)=>{const s=indexedDB.open(Ig,Mg);s.onupgradeneeded=()=>{const a=s.result;a.objectStoreNames.contains(Os)||a.createObjectStore(Os,{keyPath:"id"})},s.onsuccess=()=>e(s.result),s.onerror=()=>t(s.error||new Error("idb open failed"))})}async function Lg(e,t,s={}){const a=await Wd();return new Promise((i,n)=>{const o=a.transaction(Os,"readwrite");o.objectStore(Os).put({id:e,blob:t,mime:t.type||s.mime||"application/octet-stream",name:s.name||"",size:t.size||0,at:Date.now()}),o.oncomplete=()=>i(e),o.onerror=()=>n(o.error)})}async function Dg(e){const t=await Wd();return new Promise((s,a)=>{const n=t.transaction(Os,"readonly").objectStore(Os).get(e);n.onsuccess=()=>s(n.result||null),n.onerror=()=>a(n.error)})}const In=new Map;async function pn(e){if(!e)return"";if(e.startsWith("idb:")){const t=e.slice(4);if(In.has(t))return In.get(t);const s=await Dg(t);if(!(s!=null&&s.blob))return"";const a=URL.createObjectURL(s.blob);return In.set(t,a),a}return e}function _g(e="blob"){return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function Mn(e,t){return`<article class="pikk-ad-slot pikk-ad-${e.tier}" data-promo-tier="${e.tier}" aria-label="${e.name} slot ${t}, pricing preview">
    <span class="pikk-ad-slot-top"><span class="pikk-ad-slot-icon" aria-hidden="true">▶</span><span class="pikk-ad-slot-number">0${t}</span></span>
    <strong>${e.name}</strong>
    <span class="pikk-ad-slot-description">Available placement · booking coming soon</span>
    <span class="pikk-ad-slot-prices"><b>$${e.day}</b><small>/ 24 hours</small></span>
    <span class="pikk-ad-slot-week">$${e.week} / 7 days</span>
  </article>`}function Yd(){return`<section class="pikk-featured-inventory" aria-label="Featured on PIKK sponsored placement pricing">
      <div class="pikk-featured-heading"><div><p class="kicker">Creator &amp; brand visibility</p><h2>Featured on PIKK</h2></div><span class="pikk-featured-sponsored">Sponsored placements</span></div>
      <p class="pikk-featured-intro">Six premium advertising positions on each page. Preview pricing below; booking and checkout are not active yet.</p>
      <div class="pikk-featured-rows">
        <div class="pikk-featured-row pikk-featured-row-hero">${Mn(li[0],1)}</div>
        <div class="pikk-featured-row pikk-featured-row-two">${[1,2].map(e=>Mn(li[1],e)).join("")}</div>
        <div class="pikk-featured-row pikk-featured-row-three">${[1,2,3].map(e=>Mn(li[2],e)).join("")}</div>
      </div>
      <p class="pikk-featured-footnote">Home and Videos placements are priced separately. Rates are introductory proposals; no paid placement or guaranteed views are currently offered.</p>
    </section>`}function Og(e){return`<div class="pikk-stories-promotions" data-featured-context="videos">
    <section class="pikk-stories-strip" aria-label="PIKK Stories preview">
      <div class="pikk-featured-heading"><div><p class="kicker">Connect in 24 hours</p><h2>PIKK Stories</h2></div><span class="pikk-featured-state">Coming soon</span></div>
      <div class="pikk-stories-preview">
        <div class="pikk-story-preview"><span class="pikk-story-ring"><span aria-hidden="true">＋</span></span><strong>Your Story</strong></div>
        <p>Share moments with your followers. Stories will disappear after 24 hours once publishing launches.</p>
      </div>
    </section>
    ${Yd()}
  </div>`}const qg=Object.freeze(["Music","Rap","Gaming","Dance","Comedy","Sports","Art","Fashion"]),sr=15;function Rg(){return`
  <section class="pikk-hs pikk-matchup" id="homeMatchUp" data-hs="matchup" data-test-mode aria-labelledby="homeMatchUpH">
    <div class="pikk-hs-head"><div><p class="kicker">Random 1-on-1 video chat</p>
      <h2 id="homeMatchUpH">PIKK Match Up <span class="pikk-badge-18" aria-label="18 plus only">18+</span> <span class="chip pikk-mu-test">TEST MODE</span></h2></div></div>
    <p class="pikk-mu-lead">Demo preview only — no camera or microphone is used and no real people are matched.</p>
    <div class="pikk-mu-tags" role="group" aria-label="Interest tags">${qg.map(t=>`<button type="button" class="pikk-mu-tag" data-mu-tag="${l(t)}" aria-pressed="false">${l(t)}</button>`).join("")}</div>
    <div class="pikk-mu-stage">
      <div class="pikk-mu-tile pikk-mu-you" aria-label="Your tile (placeholder)"><span aria-hidden="true">◉</span><small>You · camera off (demo)</small></div>
      <div class="pikk-mu-tile pikk-mu-them" aria-label="Match tile (placeholder)"><span aria-hidden="true">?</span><small data-mu-status>Demo match placeholder</small></div>
    </div>
    <div class="pikk-mu-timer" aria-live="polite"><span data-mu-time>${sr}</span>s
      <button type="button" class="pikk-mu-btn" data-mu-add>+15s Add time</button></div>
    <div class="pikk-mu-actions">
      <button type="button" class="pikk-mu-btn pikk-mu-start" data-mu-start>Start matching</button>
      <button type="button" class="pikk-mu-btn" data-mu-next disabled>Skip / Next</button>
      <button type="button" class="pikk-mu-btn" data-mu-friend disabled>Add friend</button>
      <button type="button" class="pikk-mu-btn" data-mu-report disabled>Report</button>
      <button type="button" class="pikk-mu-btn" data-mu-block disabled>Block</button>
    </div>
    <p class="pikk-mu-safety" role="note"><strong>Safety:</strong> 18+ only. Never share personal info. Report or Block ends a chat right away. Live matching launches only after age verification and moderation are in place — this is a demo.</p>
  </section>`}function Ng(e){const t=e.querySelector("#homeMatchUp");if(!t)return;const s=g=>t.querySelector(g),a=s("[data-mu-time]"),i=s("[data-mu-status]");let n=sr,o=null,r=0;const c=()=>{o&&clearInterval(o),o=null},d=g=>["[data-mu-next]","[data-mu-friend]","[data-mu-report]","[data-mu-block]"].forEach(v=>{s(v).disabled=!g}),u=()=>[...t.querySelectorAll('.pikk-mu-tag[aria-pressed="true"]')].map(g=>g.dataset.muTag),p=()=>{c(),r+=1,n=sr,a.textContent=n,d(!0);const g=u();i.textContent=`Demo round ${r}${g.length?" · "+g.join(", "):""} · placeholder, not a real user`,o=setInterval(()=>{if(!document.body.contains(t))return c();n-=1,a.textContent=Math.max(n,0),n<=0&&(c(),d(!1),i.textContent="Time up (demo). Tap Start matching again.")},1e3)};t.querySelectorAll(".pikk-mu-tag").forEach(g=>g.addEventListener("click",()=>{const v=g.getAttribute("aria-pressed")!=="true";g.setAttribute("aria-pressed",String(v)),g.classList.toggle("is-on",v)})),s("[data-mu-start]").addEventListener("click",p),s("[data-mu-next]").addEventListener("click",p),s("[data-mu-add]").addEventListener("click",()=>{o&&(n+=15,a.textContent=n)}),s("[data-mu-friend]").addEventListener("click",()=>{i.textContent="Friend request (demo) — not sent; no real user."});const h=g=>{c(),d(!1),i.textContent=`${g} (demo) — chat ended. Real reports go to moderation at launch.`};s("[data-mu-report]").addEventListener("click",()=>h("Reported")),s("[data-mu-block]").addEventListener("click",()=>h("Blocked"))}const Bg=e=>(String(e||"").match(/(?:v=|embed\/|youtu\.be\/)([\w-]{6,})/)||[])[1]||"",Zo=e=>{const t=Bg(e);return t?`https://i.ytimg.com/vi/${t}/hqdefault.jpg`:""},vs=(e,t="")=>e?`<img src="${l(e)}" alt="${l(t)}" loading="lazy" decoding="async"/>`:'<span class="hs-ph" aria-hidden="true">◆</span>',Fe=(e,t,s,a,i,n="")=>`
  <section class="pikk-hs" id="hs-${e}" data-hs="${e}" aria-labelledby="hs-${e}-h">
    <div class="pikk-hs-head"><div><p class="kicker">${l(a)}</p><h2 id="hs-${e}-h">${l(t)}</h2></div><a class="pikk-hs-all" href="${s}" data-see-all>See all →</a></div>
    <div class="pikk-hs-row" role="list">${i}</div>${n?`<p class="pikk-hs-note">${l(n)}</p>`:""}
  </section>`,Me=(e,t,s,a,i="",n="")=>`<a class="pikk-hs-card ${i}" role="listitem" href="${e}"><span class="pikk-hs-media">${t}${n?`<span class="pikk-hs-badge">${l(n)}</span>`:""}</span><strong>${l(s)}</strong>${a?`<small>${l(a)}</small>`:""}</a>`,Kg=["live","connect","posts","videos","music","dating","contest","matchup","battles","shop","more"],Je=Object.freeze({music:"#/music",posts:"#/posts",videos:"#/videos",live:"#/live",connect:"#/connect",dating:"#/dating",games:"#/games",battles:"#/giftbattles",contest:"#/contest/twerk",shop:"#/shop"}),jg=Object.freeze([["#/clips","Clips","Short clips feed"],["#/openmic","Open Mic","24/7 category · TEST MODE"],["#/spotlight","Spotlight","Request a feature · TEST MODE"],["#/multiguest","Multi-guest Live","Coming soon"],["#/fanclubs","Fan clubs","Coming soon"],["","Events","Coming soon · no page yet"],["#/crew","PIKK Crew","Private story list"],["#/story","Stories","Post a story"],["#/favorites","Favorites","Saved on this device"],["#/payments","$ Payments","Hub · TEST MODE · not live"],["#/wallet","Wallet","Coins · TEST MODE"],["#/earnings","Earnings","Creator payouts · TEST MODE"],["#/loyalty","Loyalty","Rewards · Coming soon"],["#/refer","Refer a friend","Invite link"],["#/ai-artists","AI Artists","Coming soon"],["#/vault","Vault","Exclusive drops · Coming soon"],["#/shield","PIKK Shield","Safety tools"],["#/support","Support","Help & contact"],["#/settings","Settings","Your preferences"],["#/updates","Updates","What’s new"],["#/notifications","Notifications","Your alerts"],["#/profile-shop","Profile shop","Creator storefront · TEST MODE"],["#/share","Share PIKK","Invite & share links"],["#/launch","Launch","Launch plan · Coming soon"],["#/phases","Roadmap phases","What ships next"],["#/guidelines","Community guidelines","Rules & safety"],["#/terms","Terms","Draft terms"],["#/privacy","Privacy","Draft privacy policy"]]);function Fg(){const e=vt.map(g=>Me("#/music",vs(g.cover,g.title),g.title,`${g.artist} · ${g.type==="album"?"Album":"Single"}${g.year?" · "+g.year:""}`,"is-square",g.type==="album"?"Album":"Track")).join("")+[["#/music?view=playlists","Playlists","Curated lists"]].map(([g,v,b])=>Me(g,'<span class="hs-ph" aria-hidden="true">♪</span>',v,b,"is-chip")).join(""),s=fe.filter(g=>g.category==="Music Videos").slice(0,6).map((g,v)=>Me(v%3===1?"#/shorts":"#/posts",vs(Zo(g.youtube),g.title),g.title,v%3===0?"Picture · house":v%3===1?"Short · house":"Video · house",v%3===1?"is-tall":"is-square",v%3===0?"Photo":v%3===1?"Short":"Video")).join(""),a=fe.slice(0,8).map(g=>Me("#/videos",vs(Zo(g.youtube),g.title),g.title,`${g.artist||"DatBoiSkeet"} · PIKK Official`,"is-wide")).join(""),i=[["#/live","Live Rooms","Directory preview · TEST MODE"],["#/live?go=1","Go Live","Start a stream · TEST MODE"],["#/viral-live","24/7 Viral Live","Rotating clips · preview"]].map(([g,v,b])=>Me(g,'<span class="hs-ph hs-live" aria-hidden="true">●</span>',v,b,"is-chip")).join(""),n=[["#/explore","People","Discover creators"],["#/communities","Communities","Topics & votes · TEST MODE"],["#/community","PIKK Lounge","Channel rooms"],["#/live","Live connections","Rooms · TEST MODE"],["#/messages","Messages","Your inbox"],["#/connect#connect-random-chat","Random Chat","18+ · TEST MODE"],["#/connect#connect-multistream","Multi-platform go-live","TEST MODE · no real relay"]].map(([g,v,b])=>Me(g,'<span class="hs-ph" aria-hidden="true">◎</span>',v,b,"is-chip")).join(""),o=Me("#/dating",'<span class="hs-ph hs-18" aria-hidden="true">18+</span>',"PIKK Dating · pre-launch","Adults only · age & ID verification and safety review before launch. No profiles shown.","is-wide is-teaser"),c=Me("#/blockwars",vs("/blockwars-preview/01-title.jpg","Block Wars"),"Block Wars","Coming Soon · gameplay paused","is-wide","Coming Soon")+it.filter(g=>g.name!=="Block Wars").map(g=>Me("#/games",vs(Pa(g),g.name),g.name,"Coming Soon · concept art","is-square","Coming Soon")).join(""),d=[["#/giftbattles","Live Battles","Battle area · preview"],["#/roast-arena","Roast Arena","Matchups · preview"]].map(([g,v,b])=>Me(g,'<span class="hs-ph" aria-hidden="true">⚔</span>',v,b,"is-chip")).join(""),u=Re.slice(0,8).map(g=>Me("#/shop",vs(g.image,g.name),g.name,`$${g.price} · Foreign X-Change`,"is-square")).join("")+Me("#/shop",'<span class="hs-ph" aria-hidden="true">⌂</span>',"Foreign X-Change store","Official merch store · checkout on merchant site","is-chip"),h={music:Fe("music","Music",Je.music,"Tracks & albums",e),posts:Fe("posts","Posts",Je.posts,"Pictures · shorts · videos",s,"House samples from official releases."),videos:Fe("videos","Videos",Je.videos,"Long-form",a),live:Fe("live","Live",Je.live,"Live now & go live",i,"Live streaming is TEST MODE; no viewer counts are shown."),connect:Fe("connect","Connect",Je.connect,"People · communities · live",n),dating:Fe("dating","Dating",Je.dating,"18+ · safety-gated",o),games:Fe("games","Games",Je.games,"PIKK Arcade · all games",c,"Concept previews · games are not playable yet."),battles:Fe("battles","Battles & Roast",Je.battles,"Head-to-head",d),contest:Fe("contest","Contests",Je.contest,"18+ · community",'<div class="pikk-hs-contest" role="listitem"><strong class="pikk-contest-title">Twerk Contest</strong><span class="pikk-badge-18" aria-label="18 plus only">18+</span><a class="pikk-contest-enter" href="#/contest/twerk">Enter</a></div>'),matchup:Rg(),more:Fe("more","More on PIKK","#/explore","Every feature · one tap",jg.map(([g,v,b])=>g?Me(g,'<span class="hs-ph" aria-hidden="true">◆</span>',v,b,"is-chip"):`<div class="pikk-hs-card is-chip is-soon" role="listitem"><span class="pikk-hs-media"><span class="hs-ph" aria-hidden="true">◆</span></span><strong>${l(v)}</strong><small>${l(b)}</small></div>`).join("")),shop:Fe("shop","Shop",Je.shop,"Featured products & stores",u)};return`<div class="pikk-home-showcase" id="pikkHomeShowcase">${Kg.map(g=>h[g]).join("")}</div>`}const Ug=Object.freeze(["partyline","board","livechat","servers"]),Gg={partyline:{title:"Party Line",kicker:"Voice + chat rooms",detail:"Drop-in group voice lines with chat. Coming soon — needs Safety review and the backend.",soon:!0},board:{title:"Message Board",kicker:"Public posts & replies",detail:"Short posts, replies and reposts from the community · TEST MODE",href:"#/posts"},livechat:{title:"Live Chat Room",kicker:"Chat during streams",detail:"Chat alongside live rooms · TEST MODE preview",href:"#/live"},servers:{title:"Community Servers",kicker:"Servers & channels",detail:"PIKK Lounge channel rooms and topic communities · TEST MODE",href:"#/community",extra:["#/communities","Browse communities"]}};function Vg(){return`<section class="pikk-hub" id="home-hub" aria-label="PIKK community">${Ug.map(t=>{const s=Gg[t],a=`<p class="kicker">${l(s.kicker)}</p><h3>${l(s.title)}</h3><p>${l(s.detail)}</p>`;return s.soon?`<div class="card pikk-hub-card is-soon" id="home-${t}" data-hub="${t}" data-coming-soon role="button" tabindex="0">${a}<span class="chip">Coming soon</span></div>`:`<div class="card pikk-hub-card" id="home-${t}" data-hub="${t}">${a}<div class="row wrap"><a class="btn primary" href="${s.href}">Open ${l(s.title)}</a>${s.extra?`<a class="btn ghost" href="${s.extra[0]}">${l(s.extra[1])}</a>`:""}</div></div>`}).join("")}</section>`}typeof document<"u"&&document.addEventListener("click",e=>{var i,n,o,r;const t=(n=(i=e.target).closest)==null?void 0:n.call(i,"[data-psv]");if(!t)return;const s=(o=t.closest(".pikk-psv"))==null?void 0:o.querySelector("[data-psv-track]");if(!s)return;const a=((r=s.querySelector(".pikk-psv-slide"))==null?void 0:r.getBoundingClientRect().width)||240;s.scrollBy({left:Number(t.dataset.psv)*(a+12),behavior:"smooth"})});const Hg={Explore:"🧭","Shorts / Clips":"▶",Music:"🎵",Videos:"🎬",Posts:"📸",Live:"🔴","PIKK Lounge":"💬",Vault:"🔐",Marketplace:"🛍️",Missions:"🎯"},Ti=[{id:"toplive",label:"Top live"},{id:"videos",label:"Videos"},{id:"rising",label:"Rising"},{id:"hot",label:"Hot lives"},{id:"songs",label:"Songs"}],zg=8e3,Wr="dbs_home_stage_v2",Wg=["dbs_home_stage"],Jd='<span class="chip pikk-example-tag" title="Example data · not real viewers">Example</span>';function Qd(e){const t=Number(e)||0;return t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)}k`:String(t)}function Ya(e){return e?!!(e.house||e.hostId==="dbs"||e.hostName==="DatBoiSkeet"):!1}function el(e){return e?!!(e.house||e.userId==="dbs"||e.username==="DatBoiSkeet"):!1}function Yg(e=3){const t=Hs(),s=t.filter(n=>!Ya(n)),a=t.filter(n=>Ya(n)),i=s.slice(0,Math.max(2,e-1));for(a[0]&&i.push(a[0]);i.length<e&&s[i.filter(n=>!Ya(n)).length];){const n=s[i.filter(o=>!Ya(o)).length];if(!n||i.includes(n))break;i.push(n)}return i.slice(0,e)}function Jg(e=4){const t=id(Math.max(8,e+4)),s=t.filter(n=>!el(n)),a=t.filter(n=>el(n)),i=[...s.slice(0,3)];a[0]&&i.push(a[0]);for(const n of s.slice(3)){if(i.length>=e)break;i.includes(n)||i.push(n)}for(const n of a.slice(1)){if(i.length>=e)break;i.includes(n)||i.push(n)}return i.slice(0,e)}function Xd(){const e=D().live,t=Hs().map(s=>({...s}));if(e&&!e.endedAt){const s=Math.max(0,Number(e.viewers)||0),a=Math.max(0,Number(e.giftsTotal)||0);t.push({id:e.id||"session",hostId:e.hostId,hostName:e.hostName||"Creator",title:e.title||"Live now",viewers:s,giftsTotal:a,score:s+a*20,house:e.hostId==="dbs"||e.hostName==="DatBoiSkeet"})}return t.sort((s,a)=>(Number(a.viewers)||0)-(Number(s.viewers)||0)||(Number(a.score)||0)-(Number(s.score)||0)),t[0]||null}function ui(e,{rising:t=!1}={}){const s=e.house?"House":t?"Rising":"Hot",a=Number(e.viewers)||0,i=Qd(a),n=t&&e.playbacksToday!=null?` · ~${l(String(e.playbacksToday))} playbacks today`:"";return`
    <a class="home-live-card" href="#/live">
      <div class="live-hoodie" aria-hidden="false">
        <span class="live-hoodie-pill">LIVE</span>
        <span class="live-hoodie-viewers" title="${l(i)} watching · example">${l(i)}</span>${Jd}
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
    </a>`}function Qg(e){return e.mediaType==="video"?"Video":e.image||e.mediaType==="image"?"Pic":"Post"}function Xg(e){if(!e)return"";const t=Number(e.playsToday)||0,s=t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)}k`:String(t),a=e.cover?`<img class="la-thumb" src="${l(e.cover)}" alt="" loading="lazy" />`:'<span class="la-thumb la-thumb-empty" aria-hidden="true">♪</span>',i=e.demo?" · DEMO seed":"";return`
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
    </li>`}function Zg(e){const t=Number(e.viewers)||0,s=Qd(t),a=e.house?"House":"Hot";return`
    <li class="la-row la-live">
      <a class="la-main" href="#/live">
        <span class="la-hoodie" aria-label="Live · ${l(s)} watching (example data)">
          <span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span>
          <span class="live-hoodie-viewers">${l(s)}</span>${Jd}
        </span>
        <span class="la-body">
          <strong>@${l(e.hostName)}</strong>
          <span class="la-preview">${l(e.title||"Live now")}</span>
          <span class="la-stats muted">${l(s)} watching (example) · ${l(String(e.giftsTotal||0))} gifts · score ${l(String(e.score||0))}</span>
        </span>
      </a>
      <span class="chip">${l(a)}</span>
    </li>`}function ev(e){const t=e.postId||e.id,s=Qg(e),a=e.image?`<img class="la-thumb" src="${l(e.image)}" alt="" loading="lazy" />`:`<span class="la-thumb la-thumb-empty" aria-hidden="true">${l(((e.username||"?")[0]||"?").toUpperCase())}</span>`,i=e.house?" · house":"";return`
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
    </li>`}function tv(e){const t=e.coverRef&&!String(e.coverRef).startsWith("idb:")?e.coverRef:"";return`
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
    </li>`}function sv(){for(const e of Wg){try{sessionStorage.removeItem(e)}catch{}try{localStorage.removeItem(e)}catch{}}try{localStorage.removeItem(Wr)}catch{}}function Zd(){sv();try{const e=sessionStorage.getItem(Wr);if(Ti.some(t=>t.id===e))return e}catch{}return"toplive"}function av(e){try{sessionStorage.setItem(Wr,e)}catch{}}function Ci(e){return"$"+Number(e||0).toLocaleString(void 0,{maximumFractionDigits:2})}function iv(e){const t=Math.max(0,e-Date.now()),s=Math.floor(t/36e5),a=Math.floor(t%36e5/6e4);return t<=0?"Ended":`${s}h ${a}m left`}function nv(e){const t=e?Math.min(100,Math.round(e.raised/(e.targetAmount||1)*100)):0;return`<a class="home-goal-slim" id="home-app-goal" href="#/donate" aria-label="PIKK daily goal ${t}% funded. Open Donate">
    <span class="home-goal-slim-label"><strong>PIKK goal</strong><small>${e?`${Ci(e.raised)} of ${Ci(e.targetAmount)} · TEST MODE`:"No goal today"}</small></span>
    <span class="home-goal-slim-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${t}"><span style="width:${t}%"></span></span>
    <span class="btn primary home-goal-slim-btn">Donate</span>
  </a>`}function eu(e){if(!e)return'<p class="muted" style="margin:0">No daily app goal right now.</p>';const t=Math.min(100,Math.round(e.raised/(e.targetAmount||1)*100));return`
    <div class="home-goal-head"><strong class="home-goal-name">${l(e.name)}</strong>
      <span class="chip home-goal-time" id="homeGoalTimeLeft">${iv(e.endsAt)}</span></div>
    <div class="home-goal-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${t}">
      <div class="home-goal-fill" style="width:${t}%"></div></div>
    <p class="muted home-goal-amounts" style="margin:6px 0 10px">${Ci(e.raised)} raised of ${Ci(e.targetAmount)} · ${t}%</p>
    <div class="row wrap" style="gap:8px">
      ${[50,100,250].map(s=>`<button type="button" class="btn ghost home-goal-donate" data-goal-id="${l(e.id)}" data-coins="${s}">Donate ${s} coins</button>`).join("")}
      <form class="home-goal-custom-form" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;align-items:end">
        <label style="flex:1;min-width:125px">Custom coins
          <input class="home-goal-custom-coins" type="number" inputmode="numeric" min="1" max="1000000" step="1" required placeholder="Enter coins" style="width:100%" />
        </label>
        <button type="submit" class="btn primary">Donate custom</button>
      </form>
    </div>`}function rv(){var xe;const e=fp.map(T=>`
    <a class="preview-card" href="#${T.route}${T.hash?"#"+T.hash:""}">
      <span class="pc-icon" aria-hidden="true">${Hg[T.title]||"◆"}</span>
      <strong>${l(T.title)}</strong>
      <span class="muted">${l(T.blurb)}</span>
    </a>`).join(""),t=Es.map(T=>`
    <a class="cover-card" href="#/music">
      <div class="cover-frame">
        <span class="badge-cs">${l(T.status)}</span>
        <img src="${l(T.cover)}" alt="${l(T.title)}" loading="lazy" />
      </div>
      <div class="t">${l(T.title)}</div>
      <div class="sub">${l(T.artist)}</div>
    </a>`).join(""),s=fe.filter(T=>(T.category||"Music Videos")==="Music Videos"),a=s.filter(T=>T.featured),i=a.length?a:s.slice(0,6),n=i[0]||s[0]||fe[0],o=fr[0];i.map(T=>`
    <div class="vid">
      <a class="thumb" href="${l(T.youtube)}" target="_blank" rel="noopener" aria-label="Play ${l(T.title)}"><span>▶</span></a>
      <div>
        <strong>${l(T.title)}</strong>
        <div class="muted" style="font-size:12px;margin-top:4px">
          <a href="${l(T.youtube)}" target="_blank" rel="noopener">Watch on YouTube</a>
          · <a href="#/videos">Embed on Videos</a>
        </div>
      </div>
    </div>`).join("");const r=i.map((T,Ae)=>`
    <button type="button" class="mv-pick${Ae===0?" on":""}" data-embed="${l(T.embed)}" data-title="${l(T.title)}" data-yt="${l(T.youtube)}">
      <span class="mv-pick-play" aria-hidden="true">▶</span>
      <span class="mv-pick-t">${l(T.title)}</span>
    </button>`).join("");o&&`${l(yt(o.embed))}${l(o.title)}${l(o.youtube)}`;const d=as({publishedOnly:!0,types:["picture"]}).map(T=>`
    <div class="cover-card catalog-admin-home" data-id="${l(T.id)}">
      <div class="cover-frame">
        <span class="badge-cs">From Admin</span>
        <img data-idb-src="${l(T.coverRef&&T.coverRef.startsWith("idb:")?T.coverRef:"")}" src="${l(T.coverRef&&!T.coverRef.startsWith("idb:")?T.coverRef:"")}" alt="${l(T.title)}" loading="lazy" />
      </div>
      <div class="t">${l(T.title)}</div>
      <div class="sub">${l(T.artist)}</div>
    </div>`).join("");as({publishedOnly:!0,types:["video"]}).slice(0,3).map(T=>`
    <div class="vid catalog-admin-home" data-id="${l(T.id)}">
      <a class="thumb" href="${l(T.youtube||"#/videos")}" ${T.youtube?'target="_blank" rel="noopener"':""}><span>▶</span></a>
      <div>
        <strong>${l(T.title)}</strong>
        <div class="muted" style="font-size:12px;margin-top:4px">${l(T.artist)} · Admin</div>
      </div>
    </div>`).join("");const p=D().live,h=p&&!p.endedAt?`<li class="la-row la-session"><a class="la-main" href="#/live"><span class="la-hoodie" aria-label="Live now"><span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span><span class="live-hoodie-viewers">Demo · no real viewers</span></span><span class="la-body"><strong>@${l(p.hostName)}</strong><span class="la-preview">${l(p.title||"Live now")}</span><span class="la-stats muted">${l(String(p.viewers||0))} watching · your session</span></span></a><span class="chip">Live</span></li>`:"",g=od(),v=Xg(g),b=Yg(3),y=Jg(4),k=as({publishedOnly:!0,types:["picture"]}).slice(0,2),S=b.map(Zg).join(""),$=y.map(ev).join(""),w=k.map(tv).join(""),q=`${v}${h}${S}${$}${w}
        <li class="la-row la-kicker"><span class="la-main la-kicker-main"><span class="la-body"><strong>Ladies Only</strong><span class="la-preview">Art live on Music · playback when it drops</span></span></span><span class="chip">Music</span></li>
        <li class="la-row la-kicker"><a class="la-main" href="#/restream"><span class="la-body"><strong>PIKK Restream</strong><span class="la-preview">Stream to YouTube, TikTok, Twitch &amp; more — free inside PIKK</span></span></a><span class="chip">Restream</span></li>${!v&&!S&&!$&&!w&&!h?'<li class="la-row"><span class="la-main la-kicker-main"><span class="la-body"><span class="la-preview muted">No hot activity yet — engage on Posts / go Live to spike the feed.</span></span></span><span class="chip">TEST</span></li>':""}`,E=Zd(),V=Ti.map(T=>`
    <button type="button" class="home-stage-tab${T.id===E?" on":""}" role="tab"
      aria-selected="${T.id===E?"true":"false"}" data-stage="${T.id}" id="stage-tab-${T.id}">
      ${l(T.label)}
    </button>`).join(""),A=Hs().slice(0,5),N=wf().slice(0,5),j=A.map(T=>ui(T)).join("")||'<p class="muted">No hot lives yet — seed from Live / Hot Feed.</p>',I=N.map(T=>ui(T,{rising:!0})).join("")||'<p class="muted">No rising streamers yet.</p>',R=Es.map(T=>`
    <a class="home-song-card" href="#/music">
      <img src="${l(T.cover)}" alt="" loading="lazy" />
      <div>
        <strong>${l(T.title)}</strong>
        <div class="muted" style="font-size:12px">${l(T.artist)} · ${l(T.status)}</div>
        <span class="chip" style="margin-top:6px">Enhancement · Coming Soon</span>
      </div>
    </a>`).join(""),O=Xd(),F=O?ui(O):'<p class="muted">No live streams right now — go Live or check Hot Feed.</p>',J=`
    <div class="home-stage-panel${E==="toplive"?" on":""}" data-panel="toplive" role="tabpanel" id="homeTopLivePanel" ${E==="toplive"?"":"hidden"}>
      <p class="muted home-stage-lead">Top live · highest viewers right now. Red LIVE hoodie on the card · updates as rankings change.</p>
      <div class="home-live-grid" id="homeTopLiveGrid">${F}</div>
      <a class="btn ghost block" href="#/live" style="margin-top:10px">Open Live</a>
    </div>`,B=`
    <div class="home-stage-panel${E==="videos"?" on":""}" data-panel="videos" role="tabpanel" ${E==="videos"?"":"hidden"}>
      <div class="hero-video" id="homeFeaturedVideo">
        <iframe
          id="homeFeaturedIframe"
          src="${l(yt(n.embed))}"
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
    </div>`,H=`
    <div class="home-stage-panel${E==="rising"?" on":""}" data-panel="rising" role="tabpanel" ${E==="rising"?"":"hidden"}>
      <p class="muted home-stage-lead">Rising streamers · mid-tier creators from §38 Hot Feed signals (non-house). TEST MODE seeds.</p>
      <div class="home-live-grid">${I}</div>
      <a class="btn ghost block" href="#/live" style="margin-top:10px">Open Live</a>
    </div>`,me=`
    <div class="home-stage-panel${E==="hot"?" on":""}" data-panel="hot" role="tabpanel" ${E==="hot"?"":"hidden"}>
      <p class="muted home-stage-lead">Hot lives · ranked by viewers + gifts score (house OK). Strong playbacks / spikes from earlier today count.</p>
      <div class="home-live-grid">${j}</div>
      <a class="btn ghost block" href="#/live" style="margin-top:10px">Open Live</a>
    </div>`,W=`
    <div class="home-stage-panel${E==="songs"?" on":""}" data-panel="songs" role="tabpanel" ${E==="songs"?"":"hidden"}>
      <p class="muted home-stage-lead">Enhancements &amp; songs · Coming Soon covers + featured tracks. Upload &amp; sell on Music when Commerce lands.</p>
      <div class="home-song-grid">${R}
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
    </div>`,Z=`
    <div class="home-stage card" id="homeFeaturedStage" data-active="${l(E)}">
      <div class="home-stage-head">
        <div>
          <p class="kicker" style="margin:0">Featured stage</p>
          <h2 class="home-stage-title">Top live · Videos · Rising · Hot · Songs</h2>
        </div>
        <span class="chip chip-audit">TEST MODE · auto-cycle</span>
      </div>
      <div class="home-stage-tabs" role="tablist" aria-label="Featured stage">${V}</div>
      <div class="home-stage-panels">
        ${J}
        ${B}
        ${H}
        ${me}
        ${W}
      </div>
    </div>`,Q=`
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
    </div>`,de=nv(bi()),Oe=i.slice(0,6).map((T,Ae)=>{const Ws=new URL(T.youtube).searchParams.get("v")||"",Ys=Ws?`https://i.ytimg.com/vi/${encodeURIComponent(Ws)}/hqdefault.jpg`:"";return`<a class="pikk-home-media-card ${Ae<2?"is-featured":""}" href="${l(T.youtube)}" target="_blank" rel="noopener noreferrer"
       aria-label="Watch ${l(T.title)} on YouTube">
       ${Ys?`<img src="${l(Ys)}" alt="" loading="${Ae<2?"eager":"lazy"}" decoding="async" referrerpolicy="no-referrer"/>`:'<span class="pikk-home-media-fallback" aria-hidden="true">♫</span>'}
       <span class="pikk-home-media-shadow"></span>
       <span class="pikk-home-media-badge">▶ OFFICIAL VIDEO</span>
       <span class="pikk-home-media-title">${l(T.title)}</span>
     </a>`}).join(""),Et=[...vt.map(T=>T.cover),...Es.slice(0,4).map(T=>T.cover)].filter(Boolean),Ht=[{label:"For You",href:"#/explore"},{label:"Following",href:"#/posts"},{label:"Music",href:"#/music"},{label:"Nearby",href:"#/connect"},{label:"Live",href:"#/live"}].map((T,Ae)=>`
    <a class="pikk-home-circle" href="${T.href}" aria-label="Open ${l(T.label)}">
      <span class="pikk-home-circle-ring">${Et[Ae]?`<img src="${l(Et[Ae])}" alt="" loading="lazy" decoding="async"/>`:'<span aria-hidden="true">●</span>'}</span>
      <small class="pikk-rail-tag">${l(Hf(T))}</small>
      <span>${l(T.label)}</span>
    </a>`).join(""),zt=`
    <section class="pikk-home-visual" id="pikkHomeVisual" aria-labelledby="pikkHomeVisualTitle">
      <div class="pikk-home-visual-top">
        <div><p class="kicker">PIKK DISCOVER</p><h2 id="pikkHomeVisualTitle">Your music. Your world.</h2></div>
        <a href="#/explore" class="pikk-home-visual-more">Explore ↗</a>
      </div>
      <nav class="pikk-home-circle-strip" aria-label="Browse PIKK features">
        <a class="pikk-home-circle pikk-home-circle-me" href="#/posts?compose=1" aria-label="Create a post on PIKK">
          <span class="pikk-home-circle-ring">${(xe=D().user)!=null&&xe.avatar?`<img src="${l(D().user.avatar)}" alt="" loading="lazy" decoding="async"/>`:'<span class="pikk-home-circle-avatar" aria-hidden="true"><svg viewBox="0 0 24 24" width="40" height="40"><circle cx="12" cy="8.5" r="4" fill="currentColor"/><path d="M4 21c1.4-4.2 4.6-6.3 8-6.3s6.6 2.1 8 6.3" fill="currentColor"/></svg></span>'}</span>
          <span class="pikk-home-circle-plus" aria-hidden="true">+</span><span>Create</span>
        </a>
        ${Ht}
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
        ${Oe}
      </div>
      <div class="pikk-home-media-footer">
        <p class="muted">Real official releases · Video thumbnails from YouTube · No fabricated views or live counts</p>
        <a href="#/videos">View all videos →</a>
      </div>
    </section>`,ae=`
    ${de}
    ${zt}
    ${Z}
    ${Fg()}
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



    ${Q}

    <section class="home-arcade card" id="homeArcade" aria-label="PIKK Games featured slideshow">
      <div class="home-arcade-top">
        <div><p class="kicker">Discover the arcade</p><h2>15 GAMES. ONE PIKK.</h2></div>
        <a href="#/games" class="btn ghost">All games →</a>
      </div>
      <div class="home-arcade-stage" aria-live="off">
        ${it.map((T,Ae)=>`<article class="home-arcade-slide pikk-game-${l(T.theme)}" data-game-slide="${Ae}" ${Ae?"hidden":""}>
          <div class="home-arcade-image">${T.artwork?`<img src="${l(Pa(T))}" alt="" loading="lazy" decoding="async" />`:`<span class="home-arcade-symbol" aria-hidden="true">${T.icon}</span>`}</div>
          <div class="home-arcade-info">
            <span class="chip">GAME ${Ae+1} OF 15 · COMING SOON</span>
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
    <div class="cover-row" style="margin-bottom:18px">${t}${d}</div>

    <p class="kicker">DatBoiSkeet Network</p>
    <h2 style="margin:0 0 8px;font-size:15px;text-transform:uppercase;letter-spacing:.04em">Explore PIKK</h2>
    <div class="section-swipe" style="margin-bottom:18px">${e}</div>

    ${Vg()}

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
  `;return M("Home",ae,{lead:"Featured stage · PIKK Match Up (TEST MODE) · creator sell DEMO · PIKK Arcade · Party Line · message board · live chat · community servers · live activity."})}function ov(e){var q,E,V,A,N,j;const t=e.querySelector("#homeArcade");if(t){const I=[...t.querySelectorAll("[data-game-slide]")],R=t.querySelector("#homeArcadePosition");let O=0,F=null;const J=(E=(q=window.matchMedia)==null?void 0:q.call(window,"(prefers-reduced-motion: reduce)"))==null?void 0:E.matches,B=W=>{O=(W+I.length)%I.length,I.forEach((Z,Q)=>{Z.hidden=Q!==O}),R&&(R.textContent=`${O+1} / ${I.length}`)},H=()=>{F!==null&&clearInterval(F),F=null};(V=t.querySelector("[data-arcade-prev]"))==null||V.addEventListener("click",()=>{H(),B(O-1)}),(A=t.querySelector("[data-arcade-next]"))==null||A.addEventListener("click",()=>{H(),B(O+1)}),J||(F=setInterval(()=>{if(!document.body.contains(t)){H();return}document.visibilityState==="visible"&&B(O+1)},6500));const me=new MutationObserver(()=>{document.body.contains(t)||(H(),me.disconnect())});me.observe(document.body,{childList:!0,subtree:!0})}tu(e),Ng(e);const s=e.querySelector(".page-head");if(s){s.querySelectorAll(".badge-phase, a.badge-phase, .live-hoodie-pill, .live-hoodie").forEach(R=>{R.remove()}),s.querySelectorAll("a, span, button").forEach(R=>{const O=(R.textContent||"").replace(/\s+/g," ").trim();(/^●?\s*LIVE$/i.test(O)||O==="LIVE")&&R.remove()});const I=s.querySelector("h1");I&&[...I.children].forEach(R=>{const O=(R.textContent||"").replace(/\s+/g," ").trim();(/LIVE/i.test(O)||R.classList.contains("badge-phase")||R.classList.contains("live-hoodie-pill"))&&R.remove()})}e.querySelectorAll("[data-idb-src]").forEach(async I=>{const R=I.getAttribute("data-idb-src");if(!R)return;const O=await pn(R);O&&(I.tagName==="IMG"||I.tagName==="VIDEO"||I.tagName==="AUDIO")&&(I.src=O)});const a=e.querySelector("#homeFeaturedIframe"),i=e.querySelector("#homeFeaturedTitle");e.querySelectorAll(".mv-pick").forEach(I=>{I.addEventListener("click",()=>{e.querySelectorAll(".mv-pick").forEach(O=>O.classList.remove("on")),I.classList.add("on");const R=I.dataset.embed||"";a&&R&&(pg(a),a.removeAttribute("data-dbs-yt-bound"),a.src=R+(R.includes("?")?"&":"?")+"rel=0",a.title=I.dataset.title||"",Rd(a)),i&&(i.textContent=I.dataset.title||"")})}),ln(e);const n=e.querySelector("#bwPreviewVideo"),o=e.querySelector("#bwPreviewPlay");if(n){const I=()=>{if(!o)return;const R=n.paused||n.ended;o.hidden=!R,o.setAttribute("aria-hidden",R?"false":"true")};o==null||o.addEventListener("click",R=>{R.preventDefault(),n.play().catch(()=>{})}),n.addEventListener("play",()=>{_s(),I()}),n.addEventListener("pause",()=>{kt(),I()}),n.addEventListener("ended",()=>{kt(),I()}),n.addEventListener("pointerdown",()=>{n.paused||_s()}),I()}const r=2e4;function c(){const I=e.querySelector("#homeTopLiveGrid");if(!I||!document.body.contains(I))return!1;const R=Xd();return I.innerHTML=R?ui(R):'<p class="muted">No live streams right now — go Live or check Hot Feed.</p>',!0}let d=setInterval(()=>{c()||(clearInterval(d),d=null)},r);const u=()=>{document.visibilityState==="visible"&&c()};document.addEventListener("visibilitychange",u),window.addEventListener("focus",c);const p=e.querySelector("#homeFeaturedStage");if(!p){const I=new MutationObserver(()=>{document.body.contains(e)||(d&&clearInterval(d),document.removeEventListener("visibilitychange",u),window.removeEventListener("focus",c),I.disconnect())});I.observe(document.body,{childList:!0,subtree:!0});return}const h=[...e.querySelectorAll(".home-stage-tab")],g=[...e.querySelectorAll(".home-stage-panel")];let v=!1,b=null;const y=typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches||document.documentElement.classList.contains("reduce-motion")||((j=(N=document.body)==null?void 0:N.classList)==null?void 0:j.contains("reduce-motion"));function k(I){Ti.some(R=>R.id===I)||(I="toplive"),p.dataset.active=I,av(I),h.forEach(R=>{const O=R.dataset.stage===I;R.classList.toggle("on",O),R.setAttribute("aria-selected",O?"true":"false")}),g.forEach(R=>{const O=R.dataset.panel===I;R.classList.toggle("on",O),O?R.removeAttribute("hidden"):R.setAttribute("hidden","")})}function S(){const I=Ti.map(F=>F.id),R=p.dataset.active||"toplive",O=I.indexOf(R);k(I[(O+1)%I.length])}function $(){w(),!(v||y)&&(b=setInterval(S,zg))}function w(){b&&(clearInterval(b),b=null)}h.forEach(I=>{I.addEventListener("click",()=>{v=!0,w(),k(I.dataset.stage)})});const C=Zd()||"toplive";k(C),y||setTimeout(()=>{!document.body.contains(p)||v||$()},1e4);const P=new MutationObserver(()=>{document.body.contains(p)||(w(),d&&(clearInterval(d),d=null),document.removeEventListener("visibilitychange",u),window.removeEventListener("focus",c),P.disconnect())});P.observe(document.body,{childList:!0,subtree:!0})}function tu(e){const t=e.querySelector("#homeAppGoalBody");if(t){const s=()=>{document.body.contains(t)?t.innerHTML=eu(bi()):(clearInterval(i),document.removeEventListener("visibilitychange",a))},a=()=>{document.visibilityState==="visible"&&s()},i=setInterval(s,3e4);document.addEventListener("visibilitychange",a),t.addEventListener("submit",n=>{var d,u;if(!n.target.matches(".home-goal-custom-form"))return;n.preventDefault();const o=Number((d=n.target.querySelector(".home-goal-custom-coins"))==null?void 0:d.value);if(!Number.isSafeInteger(o)||o<1||o>1e6)return f("Enter 1–1,000,000 whole coins");const r=(u=bi())==null?void 0:u.id,c=yi(r,o);f(c!=null&&c.ok?"Custom donation sent · TEST MODE":(c==null?void 0:c.error)==="insufficient"?"Not enough demo coins":(c==null?void 0:c.error)==="signin"?"Sign in first":"Donation unavailable · TEST MODE"),s()}),t.addEventListener("click",n=>{const o=n.target.closest(".home-goal-donate");if(!o)return;const r=yi(o.dataset.goalId,Number(o.dataset.coins));f(r&&r.ok?`TEST MODE · ${o.dataset.coins} coins donated (no real payment)`:"TEST MODE · donate unavailable"),s()})}}const lv="df4128bd0318860677ad40ecf80c05ec05a8b361",cv=Object.freeze([{title:"Support: Find Answers Faster",detail:"Search help guides with live match counts, clear your search by button or Escape, and browse consistent guide links. Tickets remain saved only on this device; AI agents are not connected.",route:"#/support",pr:276,kind:"SUPPORT · HELP CENTER"},{title:"Support: Accurate Saved-Draft Feedback",detail:"Saving an identical local ticket draft now says it was already saved rather than implying a new support request was submitted. No ticket is sent to staff.",route:"#/support",pr:274,kind:"SUPPORT · LOCAL DRAFTS"},{title:"Support: No Duplicate Drafts",detail:"Repeated saves of the same support issue no longer create duplicate browser-local drafts. Distinct issues can still be saved separately.",route:"#/support",pr:272,kind:"SUPPORT · LOCAL DRAFTS"},{title:"Communities: Accessible Reply Threads",detail:"After posting a local reply, the conversation stays expanded and keyboard focus returns to the correct thread control. Public community hosting is not connected.",route:"#/communities",pr:271,kind:"COMMUNITIES · ACCESSIBILITY"},{title:"Profile: Reliable Member Links",detail:"Follower, following and public-profile links now safely handle usernames and profile IDs containing reserved characters. Account data remains browser-local.",route:"#/profile",pr:270,kind:"PROFILE · NAVIGATION"}]);function dv(){const e=lv.slice(0,8),t=cv.map((s,a)=>`
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
    </article>`).join("");return M("PIKK Updates",`
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
      <div class="pikk-updates-hero-mark"><img src="${l(bt("brand/pikk-logo-official.png"))}" alt="PIKK official chrome logo" loading="eager"></div>
    </section>
    <section class="pikk-updates-list" aria-label="Recent published updates">
      <h2>Latest verified improvements</h2>
      ${t}
    </section>
    <p class="pikk-updates-note">A refresh reloads this browser's app bundle; it does not clear your account or local demo data. If a change still does not appear, compare the version above with the published source commit.</p>
  `,{lead:"A clear record of recent PIKK improvements."})}function uv(e){var t;(t=e.querySelector("#pikkUpdatesRefresh"))==null||t.addEventListener("click",()=>{window.location.assign(ac(window.location.href))})}const pv=20*60,mv=250*1024*1024;function hv({duration:e,size:t,type:s}){return s!=null&&s.startsWith("video/")?!Number.isFinite(t)||t<=0||t>mv?"Video must be under 250 MB for this device-local preview.":!Number.isFinite(e)||e<=0?"Unable to read video duration. Try another file.":e>pv?"PIKKUP Phase 1 videos must be 20 minutes or shorter.":"":"Select a supported video file."}function fv(e){return new Promise((t,s)=>{const a=URL.createObjectURL(e),i=document.createElement("video");let n=!1;const o=setTimeout(()=>r(new Error("Video metadata timed out")),12e3);function r(c,d){n||(n=!0,clearTimeout(o),i.removeAttribute("src"),i.load(),URL.revokeObjectURL(a),c?s(c):t(d))}i.preload="metadata",i.onloadedmetadata=()=>r(null,i.duration),i.onerror=()=>r(new Error("Cannot read this video file")),i.src=a})}const su=[{id:"song",label:"Song",acceptCover:"image/*",acceptMedia:"audio/*,.mp3,.m4a,.wav,.aac"},{id:"album",label:"Album",acceptCover:"image/*",acceptMedia:"audio/*,.mp3,.m4a,.wav,.aac"},{id:"video",label:"Video",acceptCover:"image/*",acceptMedia:"video/*,.mp4,.mov,.webm"},{id:"picture",label:"Picture",acceptCover:"image/*",acceptMedia:"image/*"}];function gv(e){return M("Admin",`<div class="card admin-gate">
      <h3>Staff only</h3>
      <p class="muted">The admin dashboard is for PIKK staff. Access comes from your server-verified account role; it cannot be turned on from the browser.</p>
      <p>Signed in as: <strong>${l((e==null?void 0:e.username)||"guest")}</strong>
        ${e?"":'· <a class="btn" href="#/profile">Sign in</a>'}</p>
    </div>
    <div class="card muted">Full team roles, revenue, and moderation ship later phases.</div>`,{lead:"Gated demo dashboard."})}function vv(){return`
  <section class="card admin-add" id="adminAdd">
    <h3>Add Content</h3>
    <p class="muted admin-add-note">PIKKUP preview: video uploads must be 20 minutes or shorter and at most 250 MB. Device-local only, not public hosting. TEST MODE · no backend. Metadata → <code>localStorage dbs_v1.catalog</code>. Files → IndexedDB <code>dbs_media_v1</code>. Works on iPhone Safari &amp; desktop. Large files stay on this device only.</p>

    <div class="admin-type-tabs" role="tablist" aria-label="Content type">${su.map((t,s)=>`<button type="button" class="admin-type-tab${s===0?" on":""}" data-type="${l(t.id)}" role="tab">${l(t.label)}</button>`).join("")}</div>

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
  </section>`}function bv(e){if(!e.length)return'<div class="card admin-catalog"><h3>Catalog</h3><p class="muted">No admin-added items yet.</p></div>';const t=e.map(s=>{const a=s.coverRef&&!s.coverRef.startsWith("idb:")?l(s.coverRef):"";return`<div class="admin-catalog-row" data-id="${l(s.id)}">
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
    <div class="admin-catalog-list">${t}</div></div>`}function Qe(e){return"$"+(Number(e)||0).toFixed(2)}function yv(e){var i,n,o;const t=((i=e.openMic)==null?void 0:i.pending)||[],s=((n=e.openMic)==null?void 0:n.byStatus)||{},a=t.length?t.map(r=>`<div class="row wrap admin-om-row" data-om-id="${l(r.id)}">
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
  </section>`}function kv(e){const t=e.fanClubs||{total:0,recent:[]},s=t.recent.length?`<ul class="list-plain">${t.recent.map(a=>`<li><span><strong>${l(a.name)}</strong> · ${l(a.privacy)}${a.official?" · official":""}</span><span class="muted">${a.memberCount} members</span></li>`).join("")}</ul>`:'<p class="muted">No clubs yet.</p>';return`<section class="card admin-fanclubs" id="adminFanClubs">
    <h3>Fan Clubs glance</h3>
    <div class="stats">
      <div><strong>${t.total}</strong><span>Clubs</span></div>
    </div>
    ${s}
    <p class="admin-panel-links"><a class="btn" href="#/fanclubs">Open Fan Clubs</a></p>
  </section>`}function wv(e){const t=e.loyalty||{},s=(t.badges||[]).slice(0,6).map(a=>`<span class="chip">${l(a)}</span>`).join(" ")||'<span class="muted">None unlocked</span>';return`<section class="card admin-loyalty" id="adminLoyalty">
    <h3>Loyalty glance</h3>
    <p class="muted">${l(t.note||"Device-local loyalty")}</p>
    <div class="stats">
      <div><strong>${t.points||0}</strong><span>Points</span></div>
      <div><strong>${t.badgeCount||0}</strong><span>Badges</span></div>
      <div><strong>${t.historyCount||0}</strong><span>Actions</span></div>
    </div>
    <p class="admin-badge-row">${s}</p>
    <p class="admin-panel-links"><a class="btn" href="#/loyalty">Open Loyalty Club</a></p>
  </section>`}function Sv(){return`<section class="card admin-quicklinks" id="adminQuickLinks">
    <h3>Quick links</h3>
    <p class="muted">Deep-links only · page ownership stays with Live Social / Commerce / Build.</p>
    ${[{owner:"Live Social",links:[["#/live","Live"],["#/messages","Messages"],["#/giftbattles","Gift battles"],["#/multiguest","Multi-guest"],["#/spotlight","Spotlight"],["#/restream","Restream"],["#/connect","Connect"]]},{owner:"Commerce",links:[["#/marketplace","Marketplace"],["#/wallet","Wallet"],["#/earnings","Earnings"],["#/missions","Missions"],["#/share","Share & Earn"],["#/refer","Refer & Earn"]]},{owner:"Build",links:[["#/explore","Explore"],["#/notifications","Notifications"],["#/fanclubs","Fan Clubs"],["#/loyalty","Loyalty"],["#/openmic","Open Mic"]]}].map(s=>{const a=s.links.map(([i,n])=>`<a class="btn ghost admin-qlink" href="${i}">${l(n)}</a>`).join("");return`<div class="admin-ql-group"><span class="chip">${l(s.owner)}</span><div class="admin-ql-row">${a}</div></div>`}).join("")}
  </section>`}function $v(e){const t=e.revenue||{},s=(t.byCategory||[]).map(a=>`<li><span>${l(a.label||a.category)} ×${a.count}</span><span class="muted">gross ${Qe(a.gross)} · creator ${Qe(a.creatorShare)} · PIKK ${Qe(a.dbsShare)}</span></li>`).join("");return`<section class="card admin-revenue" id="adminRevenue">
    <h3>Revenue / analytics shell</h3>
    <div class="row wrap" style="gap:8px;margin-bottom:8px">
      <span class="chip">TEST MODE</span>
      <span class="chip">${l(t.chip||"demo figures · not production")}</span>
    </div>
    <div class="stats">
      <div><strong>${Qe(t.gross)}</strong><span>Gross</span></div>
      <div><strong>${Qe(t.fees)}</strong><span>Fees</span></div>
      <div><strong>${Qe(t.creatorShare)}</strong><span>Creator net</span></div>
      <div><strong>${Qe(t.dbsShare)}</strong><span>PIKK net</span></div>
    </div>
    <p class="muted">Creator available ${Qe(t.creatorAvailable)} · holds ${Qe(t.creatorHolds)} · fan wallet ${Qe(t.fanWalletBalance)} · catalog ${t.catalogPublished||0}/${t.catalogTotal||0} published · earning lines ${t.earnCount||0}</p>
    ${s?`<ul class="list-plain">${s}</ul>`:'<p class="muted">No creator earnings in store yet — open Wallet / Earnings (Commerce) to seed demos.</p>'}
    <p class="admin-panel-links">
      <a class="btn" href="#/wallet">Wallet</a>
      <a class="btn" href="#/earnings">Earnings</a>
    </p>
  </section>`}function Ev(e){Fa(),ze();const t=jr(),s=Bo({openOnly:!0}),a=Bo({openOnly:!1}).length,i=e.hotFeed||{},n=s.length?s.slice(0,12).map(o=>{const r=o.kind==="live"?'<span class="chip">live</span>':'<span class="chip">post</span>',c=o.kind==="live"?` · viewers ${o.viewers??"—"} · gifts ${o.gifts??"—"}`:` · score ${o.score??0}`,d=o.kind==="post"?`<button type="button" class="btn primary admin-ea-like" data-ref="${l(o.refId)}" data-alert="${l(o.id)}">Like</button>
                 <button type="button" class="btn ghost admin-ea-comment" data-ref="${l(o.refId)}" data-alert="${l(o.id)}">Comment</button>
                 <button type="button" class="btn ghost admin-ea-share" data-ref="${l(o.refId)}" data-alert="${l(o.id)}">Share</button>`:'<a class="btn ghost" href="#/live">Open Live</a>';return`<div class="admin-ea-row" data-alert-id="${l(o.id)}">
            <div class="admin-ea-main">
              <strong>${l(o.username||"creator")}</strong> ${r}
              <div class="muted">${l(o.title||"")}${c}</div>
            </div>
            <div class="admin-ea-actions row wrap">
              ${d}
              <button type="button" class="btn ghost admin-ea-handle" data-alert="${l(o.id)}">Mark handled</button>
            </div>
          </div>`}).join(""):'<p class="muted">No open engagement alerts. Hot posts/lives will appear here when score spikes (TEST MODE).</p>';return`<section class="card admin-engagement" id="adminEngagement">
    <h3>Engagement alerts</h3>
    <form id="adminEngagementThresholdForm" class="row wrap" style="gap:8px;align-items:end">
      <label>Post engagement score <input type="number" name="postScore" min="1" max="1000000" required value="${t.postScore}" style="width:110px"></label>
      <label>Comment count <input type="number" name="commentCount" min="1" max="1000000" required value="${t.commentCount}" style="width:110px"></label>
      <button class="btn primary" type="submit">Save alert thresholds</button>
    </form>
    <div class="row wrap" style="gap:8px;margin-bottom:8px">
      <span class="chip">TEST MODE</span>
      <span class="chip">§38 Hot Feed</span>
    </div>
    <p class="muted">When posts or lives go hot, alert Admin · one-tap Like / Comment / Share · mark handled. Persist <code>dbs_v1.engagementAlerts</code>.</p>
    <div class="stats">
      <div><strong>${s.length}</strong><span>Open</span></div>
      <div><strong>${a}</strong><span>Total alerts</span></div>
      <div><strong>${i.hotPosts||0}</strong><span>Hot posts</span></div>
      <div><strong>${i.hotLives||0}</strong><span>Hot lives</span></div>
    </div>
    ${n}
    <p class="admin-panel-links"><a class="btn" href="#/posts">Open Posts Hot strip</a><a class="btn" href="#/live">Open Live</a></p>
  </section>`}function xv(e){const t=e.moderation||{};return`<section class="card admin-moderation" id="adminModeration">
    <h3>Moderation stub</h3>
    <p class="muted">${l(t.note||"Stub")}</p>
    <div class="stats">
      <div><strong>${(t.warnings||[]).length}</strong><span>Warnings</span></div>
      <div><strong>${(t.suspensions||[]).length}</strong><span>Suspensions</span></div>
    </div>
    <p class="muted">Empty-state · no enforcement actions stored yet.</p>
    <p class="admin-panel-links"><a class="btn" href="#/guidelines">Community Guidelines</a></p>
  </section>`}function Av(){Ye();const{posts:e,clipperApps:t,user:s}=D();if(!ee())return gv(s);Us(),lt(),Fa();const a=cc(),i=ef(),n=a.clipperByStatus,o=as({includeUnpublishedForAdmin:!0});return M("Admin",`<div class="card admin-header">
      <div class="row wrap">
        <span class="chip">TEST MODE</span>
        <span class="chip">role=admin</span>
        <span class="spacer muted">Signed in as <strong>${l(s.username)}</strong></span>
        <button class="btn ghost" id="adminRevoke">Revoke admin</button>
      </div>
      <p class="muted admin-gate-hint">Gate: server-verified staff role (dev demo builds may use the local toggle). Phase 2 panels deep-link to owner pages.</p>
    </div>

    ${Sv()}
    ${Ev(i)}
    ${yv(i)}
    ${kv(i)}
    ${wv(i)}
    ${$v(i)}
    ${xv(i)}

    ${vv()}
    ${bv(o)}

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
                   </div>`).join(""):'<p class="muted">None yet — submit via <a href="#/clippers">Clippers</a>.</p>'}</div>`,{lead:"Phase 2 controls · Add Content · Clippers · catalog."})}async function tl(e){if(!e)return"";const t=_g("media");return await Lg(t,e,{name:e.name,mime:e.type}),"idb:"+t}function sl(e){if(!e)return"";try{const t=new URL(e);let s=t.searchParams.get("v");return!s&&t.hostname.includes("youtu.be")&&(s=t.pathname.slice(1)),!s&&t.pathname.startsWith("/embed/")&&(s=t.pathname.split("/")[2]),s?`https://www.youtube.com/embed/${s}`:""}catch{return""}}function Tv(e){var i,n,o;(i=e.querySelector("#adminRevoke"))==null||i.addEventListener("click",()=>{Gi(!1),f("Admin revoked"),U("#/admin")}),e.querySelectorAll(".admin-clip").forEach(r=>{r.addEventListener("click",()=>{lc(r.dataset.id,r.dataset.status),f("Clipper "+r.dataset.status),U("#/admin")})}),e.querySelectorAll(".admin-om").forEach(r=>{r.addEventListener("click",()=>{const c=Jn(r.dataset.id,r.dataset.status,r.dataset.status==="rejected"?"Admin reject":"");if(c!=null&&c.error){f(c.error==="admin"?"Admin required":"Open Mic update failed");return}f(r.dataset.status==="approved"?"Open Mic approved":"Open Mic rejected"),U("#/admin")})}),(n=e.querySelector("#adminEngagementThresholdForm"))==null||n.addEventListener("submit",r=>{r.preventDefault();const c=r.currentTarget,d=ff({postScore:c.elements.postScore.value,commentCount:c.elements.commentCount.value});if(d.error)return f(d.error==="admin"?"Admin required":"Enter whole-number thresholds from 1 to 1,000,000");f("Engagement thresholds saved · TEST MODE"),U("#/admin")}),e.querySelectorAll(".admin-ea-like").forEach(r=>{r.addEventListener("click",()=>{const c=vf(r.dataset.ref);if(c!=null&&c.error)return f(c.error==="admin"?"Admin required":"Like failed");r.dataset.alert&&Ha(r.dataset.alert,"liked"),f("Liked · TEST MODE"),U("#/admin")})}),e.querySelectorAll(".admin-ea-comment").forEach(r=>{r.addEventListener("click",()=>{const c=bf(r.dataset.ref,"🔥 PIKK team — keep it up! (TEST MODE)");if(c!=null&&c.error)return f(c.error==="admin"?"Admin required":"Comment failed");r.dataset.alert&&Ha(r.dataset.alert,"commented"),f("Comment posted · TEST MODE"),U("#/admin")})}),e.querySelectorAll(".admin-ea-share").forEach(r=>{r.addEventListener("click",async()=>{var u;const c=yf(r.dataset.ref);if(c!=null&&c.error)return f(c.error==="admin"?"Admin required":"Share failed");const d=`${location.origin}${location.pathname}#/posts?focus=${encodeURIComponent(r.dataset.ref)}`;try{(u=navigator.clipboard)!=null&&u.writeText&&await navigator.clipboard.writeText(d),f("Link copied · share +1 (TEST MODE)")}catch{f("Share +1 (TEST MODE)")}r.dataset.alert&&Ha(r.dataset.alert,"shared"),U("#/admin")})}),e.querySelectorAll(".admin-ea-handle").forEach(r=>{r.addEventListener("click",()=>{const c=Ha(r.dataset.alert,"handled");if(c!=null&&c.error)return f("Could not mark handled");f("Alert handled"),U("#/admin")})}),e.querySelectorAll("img[data-idb-src]").forEach(async r=>{const c=r.getAttribute("data-idb-src");if(!c)return;const d=await pn(c);d&&(r.src=d,r.classList.remove("idb-pending"))});const t=e.querySelector("#adminType"),s=e.querySelector("#adminMediaFile"),a=e.querySelector("#adminCoverFile");e.querySelectorAll(".admin-type-tab").forEach(r=>{r.addEventListener("click",()=>{e.querySelectorAll(".admin-type-tab").forEach(h=>h.classList.remove("on")),r.classList.add("on");const c=r.dataset.type;t&&(t.value=c);const d=su.find(h=>h.id===c);d&&s&&(s.accept=d.acceptMedia),d&&a&&(a.accept=d.acceptCover);const u=e.querySelector("#adminMediaLabel");u&&(u.textContent=c==="picture"?"Picture file (or use cover only)":c==="video"?"Video file (optional if YouTube link set)":"Audio / media file (optional)");const p=e.querySelector("#adminStreamingFields");p&&(p.style.display=c==="song"||c==="album"?"":"none")})}),e.querySelectorAll(".admin-dropzone").forEach(r=>{const c=r.querySelector(".admin-file-input"),d=r.querySelector(".admin-file-name");r.addEventListener("click",u=>{u.target!==c&&(c==null||c.click())}),r.addEventListener("keydown",u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),c==null||c.click())}),c==null||c.addEventListener("change",()=>{var p;const u=(p=c.files)==null?void 0:p[0];d&&(d.textContent=u?`${u.name} · ${(u.size/1024/1024).toFixed(2)} MB`:"")}),r.addEventListener("dragover",u=>{u.preventDefault(),r.classList.add("drag")}),r.addEventListener("dragleave",()=>r.classList.remove("drag")),r.addEventListener("drop",u=>{var g,v;u.preventDefault(),r.classList.remove("drag");const p=(v=(g=u.dataTransfer)==null?void 0:g.files)==null?void 0:v[0];if(!p||!c)return;const h=new DataTransfer;h.items.add(p),c.files=h.files,c.dispatchEvent(new Event("change"))})}),(o=e.querySelector("#adminAddForm"))==null||o.addEventListener("submit",async r=>{var w,C,P,q,E,V,A,N,j,I,R,O,F,J,B,H,me,W,Z,Q,de,Oe,Et,hs,Ht,zt;r.preventDefault();const c=e.querySelector("#adminAddStatus"),d=e.querySelector("#adminSave"),u=(C=(w=e.querySelector("#adminTitle"))==null?void 0:w.value)==null?void 0:C.trim(),p=((q=(P=e.querySelector("#adminArtist"))==null?void 0:P.value)==null?void 0:q.trim())||"DatBoiSkeet",h=((E=e.querySelector("#adminType"))==null?void 0:E.value)||"song",g=((A=(V=e.querySelector("#adminCoverUrl"))==null?void 0:V.value)==null?void 0:A.trim())||"",v=((j=(N=e.querySelector("#adminMediaUrl"))==null?void 0:N.value)==null?void 0:j.trim())||"",b=((R=(I=e.querySelector("#adminYoutube"))==null?void 0:I.value)==null?void 0:R.trim())||"",y={spotify:((F=(O=e.querySelector("#adminSpotify"))==null?void 0:O.value)==null?void 0:F.trim())||"",apple:((B=(J=e.querySelector("#adminApple"))==null?void 0:J.value)==null?void 0:B.trim())||"",youtubeMusic:((me=(H=e.querySelector("#adminYtm"))==null?void 0:H.value)==null?void 0:me.trim())||"",tidal:((Z=(W=e.querySelector("#adminTidal"))==null?void 0:W.value)==null?void 0:Z.trim())||"",amazon:((de=(Q=e.querySelector("#adminAmazon"))==null?void 0:Q.value)==null?void 0:de.trim())||"",youtube:b||""},k=!!((Oe=e.querySelector("#adminPublished"))!=null&&Oe.checked),S=(hs=(Et=e.querySelector("#adminCoverFile"))==null?void 0:Et.files)==null?void 0:hs[0],$=(zt=(Ht=e.querySelector("#adminMediaFile"))==null?void 0:Ht.files)==null?void 0:zt[0];if(!u){f("Title required");return}if(h==="video"&&$)try{const ae=await fv($),xe=hv({duration:ae,size:$.size,type:$.type});if(xe){f(xe),c&&(c.textContent=xe);return}}catch{const ae="Could not verify video duration. Upload canceled.";f(ae),c&&(c.textContent=ae);return}d&&(d.disabled=!0),c&&(c.textContent="Saving… (large files may take a moment on iPhone)");try{let ae=g,xe=v;S&&(ae=await tl(S)),$&&(xe=await tl($)),h==="picture"&&!ae&&xe&&(ae=xe);const T=Tp({type:h,title:u,artist:p,coverRef:ae,mediaRef:xe,youtube:b,streamingLinks:h==="song"||h==="album"?y:{},published:k,embed:sl(b)});if(T!=null&&T.error){f(T.error==="forbidden"?"Admin required":"Could not save"),c&&(c.textContent=""),d&&(d.disabled=!1);return}b&&T.id&&uc(T.id,{embed:sl(b)}),f(k?"Published to catalog":"Saved as draft"),U("#/admin")}catch(ae){console.error(ae),f("Save failed — file may be too large for this browser"),c&&(c.textContent=String((ae==null?void 0:ae.message)||ae)),d&&(d.disabled=!1)}}),e.querySelectorAll(".admin-cat-pub").forEach(r=>{r.addEventListener("click",()=>{Cp(r.dataset.id,r.dataset.on==="1"),f(r.dataset.on==="1"?"Published":"Unpublished"),U("#/admin")})}),e.querySelectorAll(".admin-cat-del").forEach(r=>{r.addEventListener("click",()=>{confirm("Delete this catalog item?")&&(Pp(r.dataset.id),f("Deleted"),U("#/admin"))})})}const Cv=["healthy","degraded","down","stale","unknown","demo"],Pv={api:"API",database:"Database",shield:"PIKK Shield",support:"Support",audit:"Audit log",ledger:"Ledger / Revenue",vault:"Vault media",live:"Live",broadcast:"Broadcast",costs:"Costs",backups:"Backups",workers:"Workers (heartbeats)",jobs:"Jobs"};function Iv(e={}){const t=String(e.VITE_PIKK_API_BASE||"").trim();return/^https:\/\//.test(t)?t.replace(/\/+$/,""):""}async function Mv(e,t=globalThis.fetch){if(!e||typeof t!="function")return{state:"not_connected"};let s;try{s=await t(`${e}/admin/ops/summary`,{credentials:"include",headers:{Accept:"application/json"}})}catch{return{state:"not_connected"}}if(s.status===401)return{state:"unauthenticated"};if(s.status===403)return{state:"forbidden"};if(!s.ok)return{state:"error",status:s.status};try{const a=await s.json();return!a||typeof a.panels!="object"?{state:"error",status:s.status}:{state:"ok",summary:a}}catch{return{state:"error",status:s.status}}}function Lv(e,t=Date.now()){return!e||!Cv.includes(e.status)?"unknown":e.checkedAt&&e.freshnessLimitSec&&["healthy","degraded"].includes(e.status)&&!((t-Date.parse(e.checkedAt))/1e3<=e.freshnessLimitSec)?"stale":e.status}const Dv={VITE_PIKK_API_BASE:"https://pikk-api.pikk-0fa.workers.dev"},al={loading:["Checking…","Contacting the PIKK API."],not_connected:["Not connected","The PIKK API is not connected to this build yet, so there is no live data to show. Nothing on this screen is simulated."],unauthenticated:["Not signed in","Sign in with the PIKK owner account to view Master Mind."],forbidden:["Not authorized","Master Mind is owner-only. The server refused this account."],error:["Unavailable","The PIKK API returned an error. No data is shown rather than guessing."]};function au(e){const[t,s]=al[e]||al.error;return`<article class="card mastermind-state" data-mastermind-state="${l(e)}"><strong>${l(t)}</strong><p class="muted">${l(s)}</p></article>`}function _v(e){if(!e||typeof e!="object")return"";const t=Array.isArray(e.workers)?e.workers.map(a=>`<li><span class="muted">${l(a.worker)}</span> <strong>${l(a.status)}</strong> <span class="muted">${l(a.lastBeatAt?`last beat ${a.ageSec}s ago`:"no heartbeat recorded")}</span></li>`).join(""):"",s=Array.isArray(e.recentFailures)?e.recentFailures.map(a=>`<li><span class="muted">${l(a.kind)}</span> <strong>${l(a.state)}</strong> <span class="muted">attempts ${l(a.attempts)} · ${l(a.error_code||"")} · ${l(a.at)}</span></li>`).join(""):"";return t+s+Object.entries(e).filter(([a])=>a!=="recent"&&a!=="workers"&&a!=="recentFailures").map(([a,i])=>`<li><span class="muted">${l(a)}</span> <strong>${l(typeof i=="object"?JSON.stringify(i):i)}</strong></li>`).join("")}function Ov(e,t=Date.now()){return Object.entries(e.panels).map(([s,a])=>{const i=Lv(a,t);return`<article class="card mastermind-panel" data-panel="${l(s)}">
      <div class="row wrap"><strong>${l(Pv[s]||s)}</strong><span class="chip mastermind-status-${l(i)}">${l(i)}</span></div>
      <p class="muted">Source: ${l((a==null?void 0:a.source)||"none")} · Checked: ${l(a!=null&&a.checkedAt?new Date(a.checkedAt).toLocaleString():"never")}</p>
      <ul class="mastermind-detail">${_v(a==null?void 0:a.detail)}</ul>
    </article>`}).join("")}function qv(){return M("PIKK Master Mind",`
    <div class="mastermind">
      <header class="row wrap mastermind-head"><img src="${l(bt("brand/pikk-logo-official.png"))}" alt="PIKK" width="40" height="40" loading="eager"/>
        <p class="muted">Owner-only, read-only operations view. Every status comes from the server; unknown means unknown.</p></header>
      <div id="mastermindBody">${au("loading")}</div>
    </div>`,{badge:"READ-ONLY"})}async function Rv(e=document){const t=e.querySelector("#mastermindBody");if(!t)return;const s=await Mv(Iv(Dv||{}));t.innerHTML=s.state==="ok"?Ov(s.summary):au(s.state)}const Nv="https://pikk-api.pikk-0fa.workers.dev".trim().replace(/\/$/,"");function iu(){return((typeof window<"u"&&typeof window.__PIKK_API_BASE__=="string"?window.__PIKK_API_BASE__.trim():"")||Nv).replace(/\/$/,"")}function mn(){return!!iu()}async function ut(e,{method:t="GET",body:s}={}){var o,r,c;const a=iu();if(!a){const d=new Error("PIKK API is not configured");throw d.code="api_not_configured",d}const i=await fetch(a+e,{method:t,credentials:"include",headers:s===void 0?void 0:{"Content-Type":"application/json"},body:s===void 0?void 0:JSON.stringify(s)});let n=null;try{n=await i.json()}catch{}if(!i.ok){const d=new Error(((o=n==null?void 0:n.error)==null?void 0:o.message)||`Request failed (${i.status})`);throw d.status=i.status,d.code=((r=n==null?void 0:n.error)==null?void 0:r.code)||"request_failed",d.details=((c=n==null?void 0:n.error)==null?void 0:c.details)||null,d}return n}const Ue={discover:()=>ut("/posts"),following:()=>ut("/feed"),createText:e=>ut("/posts",{method:"POST",body:{kind:"text",body:e}}),user:e=>ut("/users/"+encodeURIComponent(String(e||"").replace(/^@/,""))),follow:e=>ut("/follows",{method:"POST",body:{handle:e}}),like:e=>ut("/posts/"+encodeURIComponent(e)+"/like",{method:"POST",body:{}}),unlike:e=>ut("/posts/"+encodeURIComponent(e)+"/like",{method:"DELETE",body:{}}),comments:e=>ut("/posts/"+encodeURIComponent(e)+"/comments"),comment:(e,t)=>ut("/posts/"+encodeURIComponent(e)+"/comments",{method:"POST",body:{body:t}})},Bv=Object.freeze(Object.defineProperty({__proto__:null,isPostsApiConfigured:mn,postsApi:Ue},Symbol.toStringTag,{value:"Module"}));function bs(){U("#/posts")}function Kv(){Fa();const e=id(8);return e.length?`<section class="card hot-strip" id="hotStrip">
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
    </section>`}function il(e=[]){return e.length?e.map(t=>`<div class="comment"><strong>@${l(t.author||"user")}</strong> ${l(t.body)}<br/><small class="muted">${new Date(t.created_at).toLocaleString()}</small></div>`).join(""):'<p class="muted">No comments yet.</p>'}function jv(e=[],{focusId:t="",currentHandle:s=""}={}){return e.length?e.map(a=>{const i=a.author||"creator",n=t&&t===a.id?" post-focus":"",o=s&&s.toLowerCase()!==String(i).toLowerCase();return`<article class="post persistent-post${n}" data-id="${l(a.id)}" id="post-${l(a.id)}">
      <div class="meta">
        <div class="avatar">${l((a.display_name||i)[0].toUpperCase())}</div>
        <div class="spacer">
          <div class="who"><a href="#/profile/${encodeURIComponent(i)}" data-user-link="${l(i)}">@${l(i)}</a> <span class="chip">Persistent</span> <span class="chip">${l(a.kind||"text")}</span></div>
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
    </article>`}).join(""):'<div class="card muted">No persistent posts yet.</div>'}function Fv(e){var $,w,C,P,q;const t=mn(),{posts:s,likes:a,comments:i,user:n,postShares:o}=D(),r=(($=e==null?void 0:e.query)==null?void 0:$.tab)==="following"?"following":"discover",c=((w=e==null?void 0:e.query)==null?void 0:w.focus)||"",d=new Set((n==null?void 0:n.following)||[]),u=r==="following"&&n?s.filter(E=>d.has(E.userId)||E.userId===n.id):s,p=hp.map(E=>`<button type="button" class="chip preset-img" data-src="${l(E.src)}" title="${l(E.label)}">${l(E.label)}</button>`).join(""),h=((C=e==null?void 0:e.query)==null?void 0:C.compose)==="1"||((P=e==null?void 0:e.query)==null?void 0:P.type),g=["text","picture","short","video"].includes((q=e==null?void 0:e.query)==null?void 0:q.type)?e.query.type:"",v=n?`
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
        <div class="row wrap" id="postPresets" style="margin-bottom:10px">${p}</div>
        <p class="muted" id="postMediaNote" style="font-size:12px;margin:0 0 10px">${t?"Persistent text posting is live. Picture/Short/Video uploads are not connected yet.":"TEST MODE · no real upload — paste a path or YouTube link."}</p>
        <button class="btn primary" id="postSubmit">${t?"Post to PIKK":"Post"}</button>
      </div>
    </div>`:`<div class="card"><p class="muted">Sign in from Profile to post text, a picture, short, or video.</p>
       <a class="btn primary" href="#/profile">Sign in</a></div>`,b=`
    <div class="row wrap" style="margin-bottom:12px;gap:8px">
      <a class="chip pikk-chip${r==="discover"?" on":""}"${r==="discover"?' aria-current="page"':""} href="#/posts">Discover</a>
      <a class="chip pikk-chip${r==="following"?" on":""}"${r==="following"?' aria-current="page"':""} href="#/posts?tab=following">Following</a>
      <a class="btn ghost" href="#/profile/dbs">@DatBoiSkeet</a>
    </div>`,y=u.map(E=>{const V=a[E.id]||[],A=n&&V.includes(n.id),N=i[E.id]||[],j=o&&o[E.id]||0,I=nn(E.id),R=n&&d.has(E.userId),O=c&&c===E.id?" post-focus":"",F=n&&E.userId!==n.id?`<button class="btn ghost follow-btn" data-uid="${l(E.userId)}" data-on="${R?"1":"0"}">${R?"Following":"Follow"}</button>`:"",J=E.userId==="dbs"?'<span class="chip">house</span>':'<span class="chip">community</span>',B=E.mediaType||(E.image?"picture":"text"),H=B==="short"?'<span class="chip">Short</span>':B==="video"?'<span class="chip">Video</span>':B==="picture"||B==="image"?'<span class="chip">Picture</span>':B==="text"?'<span class="chip">Text</span>':"",me=(()=>{const W=(E.mediaUrl||E.image||"").trim();if(!W)return"";if(B==="short"||B==="video"){const Z=/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{6,})/i.exec(W);if(Z)return`<div class="media media-video"><iframe src="https://www.youtube.com/embed/${Z[1]}?rel=0" title="post video" allowfullscreen loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>`;if(W.startsWith("http")||W.endsWith(".mp4")||W.endsWith(".webm"))return`<video class="media" src="${l(W)}" controls playsinline preload="metadata"></video>`}return`<img class="media" src="${l(W)}" alt="" loading="lazy" />`})();return`
      <article class="post${O}" data-id="${l(E.id)}" id="post-${l(E.id)}">
        <div class="meta">
          <a class="avatar" href="#/profile/${l(E.userId)}">${l((E.username||"?")[0].toUpperCase())}</a>
          <div class="spacer">
            <div class="who"><a href="#/profile/${l(E.userId)}">${l(E.username)}</a> ${J}${H}</div>
            <div class="when">${G(E.at)}${I>=5?` · <span class="hot-inline">🔥 ${I}</span>`:""}</div>
          </div>
          ${F}
        </div>
        <p class="body-text">${l(E.text)}</p>
        ${me}
        <div class="post-actions">
          <button class="btn like-btn ${A?"primary":""}" data-id="${l(E.id)}">
            ♥ ${V.length}
          </button>
          <button class="btn ghost comment-toggle" data-id="${l(E.id)}">💬 ${N.length}</button>
          <button class="btn ghost share-btn" data-id="${l(E.id)}" title="Share (demo count)">↗ ${j}</button>
        </div>
        <div class="comments" id="c-${l(E.id)}" hidden>
          ${N.map(W=>`<div class="comment"><b>${l(W.username)}</b> ${l(W.text)}</div>`).join("")||'<div class="muted">No comments yet</div>'}
          ${n?`<div class="row" style="margin-top:8px">
                  <input class="c-input" data-id="${l(E.id)}" placeholder="Add a comment…" style="flex:1;background:#0e0e14;border:1px solid var(--line);border-radius:12px;padding:8px 10px" />
                  <button class="btn primary c-send" data-id="${l(E.id)}">Send</button>
                </div>`:""}
        </div>
      </article>`}).join(""),S=t?'<section id="pikkPersistentPosts" aria-live="polite"><div class="card muted">Loading persistent posts…</div></section>':y||(r==="following"?'<div class="card muted">No posts from people you follow yet. Discover feed has official drops.</div>':'<div class="card muted">No posts yet.</div>');return M("Posts",(t?"":Kv())+v+b+S,{lead:t?"Persistent PIKK text posts · Discover and Following load from the backend. Media uploads are next.":"Demo · this browser only (localStorage) · Post Text, Picture, Short, or Video · not shared across devices."})}function Uv(e){var p;const t=mn(),s=e.querySelector("#pikkPersistentPosts"),a=async()=>{var h;if(!(!t||!s))try{const v=typeof location<"u"&&location.hash.includes("tab=following")?await Ue.following():await Ue.discover();s.innerHTML=jv(v.posts||[],{focusId:new URLSearchParams((location.hash.split("?")[1]||"").split("#")[0]).get("focus")||"",currentHandle:((h=D().user)==null?void 0:h.handle)||""})}catch(g){s.innerHTML=(g==null?void 0:g.status)===401?'<div class="card muted">Sign in from <a href="#/profile">Profile</a> to load persistent PIKK posts.</div>':`<div class="card muted">Could not load persistent posts: ${l((g==null?void 0:g.message)||"Unknown error")}</div>`}};a();const i=e.querySelector(".post-focus");if(i)try{i.scrollIntoView({behavior:"smooth",block:"center"})}catch{}else typeof location<"u"&&(location.hash.includes("compose=1")||location.hash.includes("type="))&&setTimeout(()=>{var h;return(h=e.querySelector("#composer"))==null?void 0:h.scrollIntoView({behavior:"smooth",block:"start"})},50);const n=e.querySelector("#postComposeBody"),o=e.querySelector("#postType"),r=e.querySelector("#postTypeChip"),c=e.querySelector("#postMediaLabel"),d=e.querySelector("#postPresets");function u(h){const g=h||"picture";e.querySelectorAll(".post-type-btn").forEach(k=>k.classList.toggle("on",k.dataset.type===g)),o&&(o.value=g),r&&(r.textContent=g.charAt(0).toUpperCase()+g.slice(1)+" post");const v=e.querySelector("#postMediaField"),b=e.querySelector("#postMediaNote"),y=g==="text";v&&(v.hidden=y),b&&(b.hidden=y),c&&!y&&(c.textContent=g==="short"?"Short clip link (YouTube / demo path)":g==="video"?"Video link (YouTube / demo path)":"Picture link (demo path)"),d&&(d.hidden=g!=="picture"),n&&(n.hidden=!1,n.classList.remove("is-collapsed"))}e.querySelectorAll(".post-type-btn").forEach(h=>{h.addEventListener("click",()=>u(h.dataset.type))}),o!=null&&o.value&&u(o.value),e.querySelectorAll(".preset-img").forEach(h=>{h.addEventListener("click",()=>{const g=e.querySelector("#postImg");g&&(g.value=h.dataset.src||""),f("Picture selected")})}),(p=e.querySelector("#postSubmit"))==null||p.addEventListener("click",async()=>{var h,g;try{const v=(h=e.querySelector("#postText"))==null?void 0:h.value,b=(o==null?void 0:o.value)||"picture",y=(((g=e.querySelector("#postImg"))==null?void 0:g.value)||"").trim();if(t){if(b!=="text")return f("Persistent Picture/Short/Video uploads are not connected yet");if(!(v!=null&&v.trim()))return f("Write some words for a Text post");await Ue.createText(v.trim()),f("Text post saved to PIKK"),await a(),e.querySelector("#postText")&&(e.querySelector("#postText").value="");return}if(b==="text"){if(!(v!=null&&v.trim()))return f("Write some words for a Text post");Eo({text:v.trim(),mediaType:"text"}),f("Text posted"),bs();return}if(!(v!=null&&v.trim())&&!y)return f("Add a caption or media");if((b==="short"||b==="video")&&!y)return f("Add a "+b+" link (TEST MODE)");Eo({text:v||(b==="picture"?"Photo":b==="short"?"Short":"Video"),image:b==="picture"?y:"",mediaType:b,mediaUrl:y}),f(b.charAt(0).toUpperCase()+b.slice(1)+" posted"),bs()}catch(v){if((v==null?void 0:v.code)==="email_unverified")return f("Verify your email before posting");f(v.message||"Could not post")}}),e.querySelectorAll(".like-btn").forEach(h=>{h.addEventListener("click",()=>{if(wp(h.dataset.id).error)return f("Sign in to like");bs()})}),e.querySelectorAll(".comment-toggle").forEach(h=>{h.addEventListener("click",()=>{const g=e.querySelector("#c-"+h.dataset.id);g&&(g.hidden=!g.hidden)})}),e.querySelectorAll(".c-send").forEach(h=>{h.addEventListener("click",()=>{var k;const g=h.dataset.id,v=e.querySelector(`.c-input[data-id="${g}"]`),b=(k=v==null?void 0:v.value)==null?void 0:k.trim();if(!b)return;if(Sp(g,b).error)return f("Sign in to comment");f("Comment added"),bs()})}),e.querySelectorAll(".share-btn").forEach(h=>{h.addEventListener("click",async()=>{var y;const g=h.dataset.id;if(nd(g).error)return f("Could not share");const b=`${location.origin}${location.pathname}#/posts?focus=${encodeURIComponent(g)}`;try{(y=navigator.clipboard)!=null&&y.writeText&&await navigator.clipboard.writeText(b),f("Shared · link copied (TEST MODE)")}catch{f("Shared · count +1 (TEST MODE)")}bs()})}),e.addEventListener("click",async h=>{var y,k,S,$,w,C;if(!t)return;const g=(k=(y=h.target).closest)==null?void 0:k.call(y,".persistent-follow");if(g){try{await Ue.follow(g.dataset.handle),f("Following @"+g.dataset.handle),await a()}catch(P){f((P==null?void 0:P.code)==="email_unverified"?"Verify your email before following":(P==null?void 0:P.message)||"Could not follow")}return}const v=($=(S=h.target).closest)==null?void 0:$.call(S,".persistent-like");if(v){try{await(v.dataset.liked==="1"?Ue.unlike(v.dataset.id):Ue.like(v.dataset.id)),await a()}catch(P){f((P==null?void 0:P.code)==="email_unverified"?"Verify your email before liking posts":(P==null?void 0:P.message)||"Could not update like")}return}const b=(C=(w=h.target).closest)==null?void 0:C.call(w,".persistent-comments-toggle");if(b){const P=s==null?void 0:s.querySelector(`[data-comments-for="${CSS.escape(b.dataset.id)}"]`);if(!P)return;if(P.hidden=!P.hidden,!P.hidden){const q=P.querySelector(".persistent-comments-list");if(q)try{const E=await Ue.comments(b.dataset.id);q.innerHTML=il(E.comments||[])}catch(E){q.innerHTML=`<p class="muted">Could not load comments: ${l((E==null?void 0:E.message)||"Unknown error")}</p>`}}}}),s==null||s.addEventListener("submit",async h=>{var y,k,S,$;const g=(k=(y=h.target).closest)==null?void 0:k.call(y,".persistent-comment-form");if(!g||!t)return;h.preventDefault();const v=g.querySelector(".persistent-comment-input"),b=(S=v==null?void 0:v.value)==null?void 0:S.trim();if(b)try{await Ue.comment(g.dataset.id,b),v.value="";const w=await Ue.comments(g.dataset.id),C=($=g.closest(".persistent-comments"))==null?void 0:$.querySelector(".persistent-comments-list");C&&(C.innerHTML=il(w.comments||[])),await a(),f("Comment added")}catch(w){f((w==null?void 0:w.code)==="email_unverified"?"Verify your email before commenting":(w==null?void 0:w.message)||"Could not add comment")}}),e.querySelectorAll(".follow-btn").forEach(h=>{h.addEventListener("click",()=>{const g=h.dataset.uid,v=h.dataset.on==="1";if((v?Ui(g):Fi(g)).error)return f("Sign in to follow");f(v?"Unfollowed":"Following"),bs()})})}const Gv={"Premium Spotlight":"spotlight","Featured Box":"featured","Promo Box":"promo"},Vv=(e,t)=>Gv[t.name]||(wd[e.id]?e.id:null);function Hv(){const e=$i.map(t=>`
    <section class="pikk-promote-group" id="promote-${t.id}" data-promote-section="${t.id}" aria-labelledby="promote-${t.id}-h">
      <div class="pikk-promote-head"><h3 id="promote-${t.id}-h">${l(t.title)}</h3>${t.gate?`<span class="chip pikk-promote-gate">${l(t.gate)}</span>`:""}</div>
      <ul class="pikk-promote-items">${t.items.map(s=>{const a=Vv(t,s),i=a?Gf(wd[a],Uf[a]):null;return`<li data-promote-option${i?` data-slots="${a}" data-sold-out="${i.soldOut}"`:""}><span>${l(s.name)}</span><span class="pikk-promote-tiers">${Ff(s).map(n=>`<small data-price>${l(n)}</small>`).join("")}${i?`<small class="pikk-promote-slots${i.soldOut?" is-sold-out":""}" data-slot-label>${l(i.label)} · TEST MODE (no bookings yet)</small>`:""}</span><button type="button" class="btn ghost" data-promote-book="${l(s.name)}"${i&&i.soldOut?' disabled aria-disabled="true"':""} aria-label="Promote ${l(s.name)} (${i&&i.soldOut?"sold out":"coming soon"})">${i&&i.soldOut?"Sold out":"Promote"}</button></li>`}).join("")}</ul>
      <a class="pikk-promote-open" href="${t.link}">Open ${l(t.title)} →</a>
    </section>`).join("");return M("Promote on PIKK",`
    <p class="pikk-promote-intro">Choose what to promote. Prices are introductory previews. <strong>Booking and checkout are Coming soon</strong> until secure payments (Stripe) are live; nothing is charged and no views are guaranteed.</p>
    <nav class="pikk-promote-jump" aria-label="Promote sections">${$i.map(t=>`<a class="chip" href="#/promote?s=${t.id}">${l(t.title)}</a>`).join("")}</nav>
    ${Yd()}
    <div class="pikk-promote-groups">${e}</div>`,{badge:"TEST MODE · Coming soon"})}function zv(e=document){e.addEventListener("click",s=>{const a=s.target.closest("[data-promote-book]");if(a){if(s.preventDefault(),a.disabled||a.closest('[data-sold-out="true"]')){f(`${a.dataset.promoteBook} · Sold out for this window`);return}f(`${a.dataset.promoteBook} · Coming soon, no payment taken`)}});const t=new URLSearchParams(location.hash.split("?")[1]||"").get("s");t&&$i.some(s=>s.id===t)&&setTimeout(()=>{var s;return(s=document.getElementById("promote-"+t))==null?void 0:s.scrollIntoView({block:"start"})},60)}function Wv(){return M("Donate",`<section class="card home-app-goal home-app-goal-full">
    <p class="kicker">PIKK daily app goal · 24h</p>
    <div id="homeAppGoalBody">${eu(bi())}</div>
    <p class="chip" style="margin-top:10px">TEST MODE · demo coins only · no real payments</p>
  </section>`,{badge:"TEST MODE"})}const Yv=e=>tu(e),Jv=Object.freeze([{id:"donate",title:"Donate",detail:"PIKK daily app goal · TEST MODE demo coins",href:"#/donate"},{id:"donate-live",title:"Creator & host goals",detail:"Live goals on streams · TEST MODE",href:"#/live"},{id:"coins",title:"Buy coins & gifts",detail:"Coin packs and gifts · Coming soon until Stripe",soon:!0},{id:"promote",title:"Promote bookings",detail:"Placements and boosts · booking Coming soon",href:"#/promote"},{id:"shop",title:"Shop orders & checkout",detail:"Merch checkout on the merchant site; in-app orders Coming soon",href:"#/shop"},{id:"subs",title:"Subscriptions & fan clubs",detail:"Creator fan clubs · TEST MODE",href:"#/fanclubs"},{id:"membership",title:"PIKK memberships",detail:"Plans preview · no billing yet",href:"#/pricing"},{id:"tips",title:"Tips",detail:"Tip creators · Coming soon until Stripe",soon:!0},{id:"wallet",title:"Wallet balance",detail:"Demo coin balance · TEST MODE",href:"#/wallet"},{id:"payouts",title:"Payouts & earnings",detail:"Creator earnings preview · payouts Coming soon",href:"#/earnings"},{id:"history",title:"Payment history",detail:"Receipts and refunds · Coming soon until Stripe",soon:!0}]);function Qv(){const e=Jv.map(t=>t.href?`<a class="pikk-pay-item" href="${t.href}" data-pay="${t.id}"><span class="pikk-pay-ico" aria-hidden="true">$</span><span><strong>${l(t.title)}</strong><small>${l(t.detail)}</small></span><span aria-hidden="true">→</span></a>`:`<div class="pikk-pay-item is-soon" data-pay="${t.id}" data-coming-soon role="button" tabindex="0"><span class="pikk-pay-ico" aria-hidden="true">$</span><span><strong class="pikk-menu-title">${l(t.title)}</strong><small>${l(t.detail)}</small></span><span class="chip">Coming soon</span></div>`).join("");return M("Payments",`<p class="pikk-pay-intro">Everything money on PIKK in one place. <strong>No real payments are processed yet</strong>; secure checkout (Stripe) is Coming soon. Balances are TEST MODE demo coins.</p><div class="pikk-pay-list">${e}</div>`,{badge:"TEST MODE"})}function Xv(){}const be={circle:"pikk.crew.v1",favorites:"pikk.favorites.v1",stories:"pikk.stories.v1"},nu={},ru=()=>{try{return globalThis.localStorage||null}catch{return null}};function hn(e){const t=ru();try{return JSON.parse((t?t.getItem(e):nu[e])||"[]")}catch{return[]}}function Ga(e,t){const s=JSON.stringify(t),a=ru();return a?a.setItem(e,s):nu[e]=s,t}function ds(e){const t=String(e||"").trim().replace(/^@+/,"").toLowerCase();return/^[a-z0-9_.]{2,30}$/.test(t)?t:""}const Ot=e=>hn(e).filter(t=>typeof t=="string");function ou(e,t){const s=ds(t);if(!s)return!1;const a=Ot(e);return a.includes(s)||Ga(e,[...a,s]),!0}function lu(e,t){const s=ds(t);Ga(e,Ot(e).filter(a=>a!==s))}const Va={list:()=>Ot(be.circle),add:e=>ou(be.circle,e),remove:e=>lu(be.circle,e),has:e=>Ot(be.circle).includes(ds(e))},Nt={list:()=>Ot(be.favorites),add:e=>ou(be.favorites,e),remove:e=>lu(be.favorites,e),has:e=>Ot(be.favorites).includes(ds(e)),moveUp:e=>{const t=ds(e),s=Ot(be.favorites),a=s.indexOf(t);return a>0&&([s[a-1],s[a]]=[s[a],s[a-1]],Ga(be.favorites,s)),Ot(be.favorites)},toggle:e=>Nt.has(e)?(Nt.remove(e),!1):Nt.add(e)},nl=Object.freeze({everyone:"Everyone",crew:"PIKK Crew"});function Zv({text:e,audience:t="everyone",author:s="you"}){const a=String(e||"").trim().slice(0,280);if(!a)return null;const i={id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),text:a,audience:t==="crew"?"crew":"everyone",author:ds(s)||"you",at:Date.now()};return Ga(be.stories,[i,...hn(be.stories)].slice(0,50)),i}const eb=24*3600*1e3;function tb(e=Date.now()){return hn(be.stories).filter(t=>t&&e-t.at<eb)}function sb(e){Ga(be.stories,hn(be.stories).filter(t=>t.id!==e))}function ab(e,t=Nt.list(),s=a=>a.author){const a=i=>{const n=t.indexOf(ds(s(i)));return n<0?1/0:n};return[...e].map((i,n)=>[i,n]).sort((i,n)=>a(i[0])-a(n[0])||(n[0].at||0)-(i[0].at||0)||i[1]-n[1]).map(i=>i[0])}const ib=e=>`${e} ${e===1?"person":"people"}`,Yr='<p class="pikk-ic-test">TEST MODE · Saved only on this device until PIKK accounts are live. No one is notified.</p>',nb=e=>e==="crew"?'<span class="pikk-ic-badge" title="Crew only">◎ Crew</span>':'<span class="pikk-ic-everyone">Everyone</span>',cu='<span class="pikk-fav-star" aria-hidden="true">★</span>',Jr=e=>`<nav class="pikk-ic-subnav" aria-label="Stories and people">${[["#/story","New Story"],["#/crew","PIKK Crew"],["#/favorites","Favorites"]].map(([t,s])=>`<a href="${t}"${t===e?' aria-current="page" class="on"':""}>${s}</a>`).join("")}</nav>`;function Qr(e){const s=(e==="circle"?Va:Nt).list();return s.length?`<ul class="pikk-ic-people">${s.map(a=>`<li>${e==="fav"?cu:'<span class="pikk-ic-dot" aria-hidden="true"></span>'}<span>@${l(a)}</span>${e==="fav"?`<button type="button" class="btn ghost" data-up="${l(a)}" aria-label="Move @${l(a)} up">↑</button>`:""}<button type="button" class="btn ghost" data-remove="${l(a)}" aria-label="Remove @${l(a)}">Remove</button></li>`).join("")}</ul>`:`<p class="muted pikk-ic-empty">${e==="circle"?"Your Crew is empty. Add people by @handle.":"No favorites yet. Add people by @handle."}</p>`}function du(e){return`<form class="pikk-ic-add" data-add-form="${e}"><label class="sr-only" for="ic-add-${e}">@handle</label><input id="ic-add-${e}" name="h" placeholder="@handle" autocomplete="off" maxlength="31" /><button class="btn primary" type="submit">${e==="circle"?"Add to Crew":"Add favorite"}</button></form>`}function rb(){return M("PIKK Crew",`${Jr("#/crew")}
    <section class="pikk-ic-hero"><span class="pikk-ic-ring-demo" aria-hidden="true"></span><div><h2>PIKK Crew</h2><p>Share stories with a private list you choose. Stories set to Crew show an electric-blue/red ring and only people on this list can view them.</p></div></section>
    <section class="card pikk-ic-panel"><h3>People in your Crew (<span data-count>${Va.list().length}</span>)</h3>${du("circle")}<div data-people="circle">${Qr("circle")}</div>${Yr}</section>`,{badge:"TEST MODE"})}function ob(){return M("Favorites",`${Jr("#/favorites")}
    <section class="pikk-ic-hero pikk-fav-hero"><span class="pikk-fav-star big" aria-hidden="true">★</span><div><h2>Favorites</h2><p>Posts and stories from people you favorite rank first in your feeds. Use ↑ to reorder; the first favorite ranks highest. Favorites show a ★ marker.</p></div></section>
    <section class="card pikk-ic-panel"><h3>Your favorites (<span data-count>${Nt.list().length}</span>)</h3>${du("fav")}<div data-people="fav">${Qr("fav")}</div>${Yr}</section>`,{badge:"TEST MODE"})}function ar(){const e=ab(tb());return e.length?`<ul class="pikk-story-list">${e.map(t=>`<li class="pikk-story-item${t.audience==="crew"?" is-circle":""}"><span class="pikk-story-ring${t.audience==="crew"?" circle":""}" aria-hidden="true">${l(t.author.slice(0,1).toUpperCase())}</span><div><p>${l(t.text)}</p><small>${Nt.has(t.author)?cu+" ":""}@${l(t.author)} · ${nb(t.audience)}</small></div><button type="button" class="btn ghost" data-del-story="${l(t.id)}" aria-label="Delete story">Delete</button></li>`).join("")}</ul>`:'<p class="muted pikk-ic-empty">No stories in the last 24 hours on this device.</p>'}function lb(){return M("New Story",`${Jr("#/story")}
    <form class="card pikk-story-form" data-story-form>
      <label for="story-text"><strong>Your story</strong></label>
      <textarea id="story-text" name="text" maxlength="280" rows="3" placeholder="What's happening?"></textarea>
      <fieldset class="pikk-audience"><legend>Who can see this?</legend>
        <label><input type="radio" name="audience" value="everyone" checked /> <span>${nl.everyone}</span></label>
        <label><input type="radio" name="audience" value="crew" /> <span class="pikk-ic-badge">◎ ${nl.crew}</span> <small data-circle-count>(${ib(Va.list().length)})</small></label>
      </fieldset>
      <p class="muted pikk-aud-hint"><a href="#/crew">Edit Crew list</a></p>
      <button class="btn primary" type="submit">Share story</button>
      ${Yr}
    </form>
    <section class="card pikk-ic-panel"><h3>Your recent stories</h3><div data-stories>${ar()}</div></section>`,{badge:"TEST MODE"})}function uu(e,t){var i;const s=t==="circle"?Va:Nt,a=()=>{e.querySelector(`[data-people="${t}"]`).innerHTML=Qr(t);const n=e.querySelector("[data-count]");n&&(n.textContent=s.list().length)};(i=e.querySelector(`[data-add-form="${t}"]`))==null||i.addEventListener("submit",n=>{n.preventDefault();const o=n.target.h;s.add(o.value)?(o.value="",a(),f(t==="circle"?"Added to Crew":"Added to Favorites")):f("Enter a valid @handle (2–30 letters, numbers, _ or .)")}),e.addEventListener("click",n=>{const o=n.target.closest("[data-up]");if(o&&s.moveUp){s.moveUp(o.dataset.up),a();return}const r=n.target.closest("[data-remove]");r&&(s.remove(r.dataset.remove),a())})}const cb=(e=document)=>uu(e,"circle"),db=(e=document)=>uu(e,"fav");function ub(e=document){const t=e.querySelector("[data-story-form]");t&&(t.addEventListener("submit",s=>{var i;s.preventDefault();const a=(i=t.querySelector("input[name=audience]:checked"))==null?void 0:i.value;if(a==="crew"&&!Va.list().length){f("Add people to your Crew first");return}if(!Zv({text:t.text.value,audience:a})){f("Write something first");return}t.text.value="",e.querySelector("[data-stories]").innerHTML=ar(),f(a==="crew"?"Shared to Crew · TEST MODE":"Shared to Everyone · TEST MODE")}),e.addEventListener("click",s=>{const a=s.target.closest("[data-del-story]");a&&(sb(a.dataset.delStory),e.querySelector("[data-stories]").innerHTML=ar())}))}function fn(){return Ie()}async function pu(){if(!Ie())return{apiConfigured:!1,mediaStorage:!1,reachable:!1,healthOk:!1};try{const e=cn(),t=await fetch(e+"/health",{credentials:"include"});if(!t.ok)return{apiConfigured:!0,mediaStorage:!1,reachable:!1,healthOk:!1};const s=await t.json().catch(()=>null);return s?{apiConfigured:!0,mediaStorage:!!(s.capabilities&&s.capabilities.media_storage),healthOk:!!s.ok,reachable:!0}:{apiConfigured:!0,mediaStorage:!1,reachable:!1,healthOk:!1}}catch{return{apiConfigured:!0,mediaStorage:!1,reachable:!1,healthOk:!1}}}async function pt(e,{method:t="GET",body:s,headers:a}={}){var d,u,p;const i=cn();if(!i){const h=new Error("PIKK API is not configured");throw h.code="api_not_configured",h}const n=s instanceof Uint8Array||s instanceof ArrayBuffer||s instanceof Blob,o=await fetch(i+e,{method:t,credentials:"include",headers:s===void 0?a:n?{...a||{}}:{"Content-Type":"application/json",...a||{}},body:s===void 0?void 0:n||typeof s=="string"?s:JSON.stringify(s)}),r=o.headers.get("Content-Type")||"";let c=null;if(r.includes("application/json"))try{c=await o.json()}catch{}if(!o.ok){const h=new Error(((d=c==null?void 0:c.error)==null?void 0:d.message)||`Request failed (${o.status})`);throw h.code=((u=c==null?void 0:c.error)==null?void 0:u.code)||"request_failed",h.status=o.status,h.details=((p=c==null?void 0:c.error)==null?void 0:p.details)||null,h}return c===null?{ok:!0,status:o.status}:c}async function rl(e,t,s="application/octet-stream"){var r,c;const a=cn();if(!a){const d=new Error("PIKK API is not configured");throw d.code="api_not_configured",d}const i=t instanceof Blob?t:new Blob([t instanceof Uint8Array?t:new Uint8Array(t)],{type:s}),n=await fetch(`${a}${e}`,{method:"PUT",credentials:"include",headers:{"Content-Type":s},body:i});let o=null;try{o=await n.json()}catch{}if(!n.ok){const d=new Error(((r=o==null?void 0:o.error)==null?void 0:r.message)||`Upload failed (${n.status})`);throw d.code=((c=o==null?void 0:o.error)==null?void 0:c.code)||"request_failed",d.status=n.status,d}return o}const is=Object.freeze({photo:{maxBytes:20*1024*1024,contentTypes:["image/jpeg","image/png","image/gif","image/webp"],accept:"image/jpeg,image/png,image/gif,image/webp"},video:{maxBytes:500*1024*1024,contentTypes:["video/mp4","video/webm","video/quicktime"],accept:"video/mp4,video/webm,video/quicktime"},audio:{maxBytes:50*1024*1024,contentTypes:["audio/mpeg","audio/wav","audio/x-wav","audio/ogg","audio/flac","audio/mp4","audio/x-m4a"],accept:"audio/mpeg,audio/wav,audio/ogg,audio/flac,audio/mp4,audio/x-m4a"},multipartMinBytes:5*1024*1024,multipartPartBytes:8*1024*1024});function mu(e){const t=String((e==null?void 0:e.type)||"").toLowerCase();for(const[s,a]of Object.entries(is))if(!(s==="multipartMinBytes"||s==="multipartPartBytes")&&a.contentTypes&&a.contentTypes.includes(t))return s;return null}const Se={listMine:(e=50,{cursor:t}={})=>{const s=new URLSearchParams;return s.set("limit",String(e)),t&&s.set("cursor",t),pt(`/media?${s}`)},createUpload:e=>pt("/media/uploads",{method:"POST",body:e}),putBytes:(e,t)=>rl(`/media/uploads/${encodeURIComponent(e)}`,t),putPart:(e,t,s)=>rl(`/media/uploads/${encodeURIComponent(e)}/parts/${t}`,s),completeParts:e=>pt(`/media/uploads/${encodeURIComponent(e)}/parts/complete`,{method:"POST"}),complete:e=>pt(`/media/${encodeURIComponent(e)}/complete`,{method:"POST"}),cancel:e=>pt(`/media/uploads/${encodeURIComponent(e)}`,{method:"DELETE"}),delete:e=>pt(`/media/${encodeURIComponent(e)}`,{method:"DELETE"}),get:e=>pt(`/media/${encodeURIComponent(e)}`),accessUrl:(e,{download:t=!1}={})=>pt(`/media/${encodeURIComponent(e)}/access-url${t?"?download=1":""}`,{method:"POST"}),usage:()=>pt("/vault/usage")};async function pb(e,{access:t="private",onProgress:s,signal:a}={}){const i=mu(e);if(!i){const u=new Error("Unsupported file type");throw u.code="unsupported_type",u}const n=is[i];if(e.size>n.maxBytes){const u=new Error(`File exceeds ${i} size limit`);throw u.code="payload_too_large",u}const o=e.size>=is.multipartMinBytes;s==null||s({phase:"create"});const c=(await Se.createUpload({type:i,content_type:e.type,filename:e.name||"file",size:e.size,access:t,multipart:o})).upload;if(a!=null&&a.aborted){try{await Se.cancel(c.id)}catch{}const u=new Error("Upload cancelled");throw u.code="cancelled",u}if(o){const u=c.part_size||is.multipartPartBytes,p=c.part_count||Math.ceil(e.size/u);for(let h=1;h<=p;h++){if(a!=null&&a.aborted){try{await Se.cancel(c.id)}catch{}const b=new Error("Upload cancelled");throw b.code="cancelled",b}const g=(h-1)*u,v=Math.min(e.size,g+u);await Se.putPart(c.id,h,e.slice(g,v)),s==null||s({phase:"upload",part:h,partCount:p})}s==null||s({phase:"assemble"}),await Se.completeParts(c.id)}else s==null||s({phase:"upload"}),await Se.putBytes(c.id,e);if(a!=null&&a.aborted){try{await Se.cancel(c.id)}catch{}const u=new Error("Upload cancelled");throw u.code="cancelled",u}s==null||s({phase:"finalize"});const d=await Se.complete(c.id);return s==null||s({phase:"processing",media:d.media}),d}async function mb(e,{timeoutMs:t=6e4,intervalMs:s=400,signal:a}={}){var o;const i=Date.now();for(;Date.now()-i<t;){if(a!=null&&a.aborted){const d=new Error("Cancelled");throw d.code="cancelled",d}const r=await Se.get(e),c=(o=r==null?void 0:r.media)==null?void 0:o.state;if(c==="ready"||c==="failed"||c==="rejected"||c==="deleted")return r.media;await new Promise(d=>setTimeout(d,s))}const n=new Error("Processing timed out");throw n.code="processing_timeout",n}const hb=[is.photo.accept,is.video.accept,is.audio.accept].join(",");let At=0,Le=null,Tt=null;function Ja(){var s,a;const e=Ne();if(e)return e;const t=(s=D())==null?void 0:s.session;return(t==null?void 0:t.liveFromAuthMe)===!0&&((a=t==null?void 0:t.user)!=null&&a.id)?String(t.user.id):null}function fb(){const{user:e,session:t}=D(),s=$g({demoUser:e&&!(t!=null&&t.liveFromAuthMe)?e:null,session:t});return Eg(s)}function gb(e){const t=Number(e)||0;return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(1)} KB`:`${(t/(1024*1024)).toFixed(1)} MB`}function hu(e){const t=String(e||"");return/size (did not match|mismatch)/i.test(t)?"Stored size did not match":/type did not match|content does not match/i.test(t)?"File type did not match":/incomplete|object missing/i.test(t)?"Upload incomplete":"Processing failed"}function vb(e){return!e||!e.phase?"":e.phase==="create"?"Creating upload…":e.phase==="upload"&&e.part&&e.partCount?`Uploading part ${e.part} of ${e.partCount}…`:e.phase==="upload"?"Uploading…":e.phase==="assemble"?"Assembling parts…":e.phase==="finalize"?"Finalizing…":e.phase==="processing"?"Processing (probe only; no thumbnail)…":`${e.phase}…`}function bb(e){return e!=null&&e.length?`<div class="support-history">${e.map(t=>{const s=t.state==="pending_upload"||t.state==="uploaded",a=t.state==="ready",i=t.state==="processing",n=t.state==="failed"?hu(t.error):"";return`<article class="card" style="margin:0 0 8px" data-vault-media-id="${l(t.id)}">
      <div class="row wrap" style="gap:8px;align-items:center">
        <strong>${l(t.filename||t.id)}</strong>
        <span class="chip">${l(t.state)}</span>
        <span class="chip">${l(t.type||"")}</span>
      </div>
      <p class="muted" style="margin:5px 0;font-size:12px">${gb(t.size)} · ${l(t.access||"private")}
        ${n?` · ${l(n)}`:""}
        ${a?"":i?" · processing (no thumbnail yet)":""}
      </p>
      <div class="row wrap" style="gap:8px">
        ${a?`<button type="button" class="btn ghost vault-media-open" data-id="${l(t.id)}">Open (signed link)</button>`:""}
        ${a?`<button type="button" class="btn ghost vault-media-delete" data-id="${l(t.id)}">Delete</button>`:""}
        ${s?`<button type="button" class="btn ghost vault-media-cancel" data-id="${l(t.id)}">Cancel upload</button>`:""}
      </div>
    </article>`}).join("")}</div>`:'<p class="muted">No Vault media yet.</p>'}function yb(){return`
    <div class="card" id="vaultMediaPanel" style="margin-top:16px">
      <h3 style="margin:0 0 6px">My Vault media</h3>
      <p class="muted" style="font-size:12px;margin:0 0 10px" id="vaultMediaReadyStatus">
        ${fn()?"Checking media storage readiness…":"API not configured · Vault media uploads unavailable."}
      </p>
      <p class="muted" style="font-size:11px;margin:0 0 10px">
        Private by default. Thumbnails and video/audio transcoding are <strong>not</strong> available yet
        (probe/checksum only). Signed links are short-lived and are not saved on this device.
      </p>
      <form id="vaultMediaUploadForm" hidden>
        <label class="muted" style="display:block;font-size:12px;margin-bottom:6px" for="vaultMediaFile">
          Photo, video, or audio (server size limits apply)
        </label>
        <input type="file" id="vaultMediaFile" accept="${hb}" style="margin-bottom:8px" />
        <div class="row wrap" style="gap:8px;margin-bottom:8px">
          <button type="submit" class="btn primary" id="vaultMediaSubmit">Upload to Vault</button>
          <button type="button" class="btn ghost" id="vaultMediaCancelInFlight" hidden>Cancel upload</button>
        </div>
      </form>
      <p class="muted" id="vaultMediaFormBlocked" style="font-size:12px"></p>
      <div id="vaultMediaProgress" class="muted" style="font-size:12px;margin:8px 0" hidden></div>
      <div id="vaultMediaList"><p class="muted">No media loaded yet.</p></div>
      <div class="row wrap" style="gap:8px;margin-top:8px">
        <button type="button" class="btn ghost" id="vaultMediaLoadMore" hidden>Load more</button>
      </div>
    </div>`}function Xe(e,t,s=!0){e&&(e.hidden=!s,e.textContent=t||"")}function kb(e,t){if(!t||e==null||e==="")return null;try{const s=new URL(String(e),t),a=new URL(t).origin;return s.origin!==a||!s.pathname.startsWith("/media/")?null:s.href}catch{return null}}function wb(e){const t=e&&e.querySelector?e.querySelector("#vaultMediaPanel"):null;if(!t)return;const s=++At,a=Ja();if(Le){try{Le.abort()}catch{}const A=Tt;Le=null,Tt=null,A&&Se.cancel(A).catch(()=>{})}const i=t.querySelector("#vaultMediaReadyStatus"),n=t.querySelector("#vaultMediaUploadForm"),o=t.querySelector("#vaultMediaFormBlocked"),r=t.querySelector("#vaultMediaList"),c=t.querySelector("#vaultMediaProgress"),d=t.querySelector("#vaultMediaCancelInFlight"),u=t.querySelector("#vaultMediaFile"),p=()=>s===At&&!!t.isConnected,h=()=>{const A=Ja();return a!=null&&A!=null&&String(a)===String(A)},g=A=>{p()&&(n&&(n.hidden=!0),o&&(o.textContent=A))},v=()=>{!p()||!h()||(n&&(n.hidden=!1),o&&(o.textContent=""))};if(!fn()){i&&(i.textContent="API not configured · Vault media uploads unavailable."),g("Configure the Worker API base to use Vault media. No local upload fallback.");return}if(!fb()||!a){i&&(i.textContent="Sign in with a verified account to upload or list Vault media."),g("Authenticated verified session required. Demo/local membership unlock is separate and does not grant uploads.");return}const b=t.querySelector("#vaultMediaLoadMore");let y=[],k=null,S=!1,$=0;function w(){r&&(r.innerHTML=bb(y),b&&(b.hidden=!k,b.disabled=!1,b.textContent="Load more"))}function C(A){const N=new Set,j=[];for(const I of A||[])!(I!=null&&I.id)||N.has(I.id)||(N.add(I.id),j.push(I));return j}async function P({append:A=!1,cursor:N=null}={}){if(!r)return;const j=s,I=a;let R;A?R=$:($+=1,R=$,S=!1);try{const O=await Se.listMine(50,{cursor:N||void 0});if(j!==At||!r.isConnected||String(I)!==String(Ja()||"")||R!==$)return;const F=O.media||[];A?y=C(y.concat(F)):y=C(F),k=O.next_cursor||null,w()}catch(O){if(j!==At||!r.isConnected||String(I)!==String(Ja()||"")||R!==$)return;A?f((O==null?void 0:O.message)||"Could not load more"):((O==null?void 0:O.status)===401||(O==null?void 0:O.code)==="unauthenticated"?r.innerHTML='<p class="muted">Sign in from <a href="#/profile">Profile</a> to see your Vault media.</p>':(O==null?void 0:O.status)===403||(O==null?void 0:O.code)==="email_unverified"?r.innerHTML='<p class="muted">Verify your email before using Vault media.</p>':r.innerHTML=`<p class="muted">Could not load media: ${l((O==null?void 0:O.message)||"error")}</p>`,b&&(b.hidden=!0))}}b==null||b.addEventListener("click",async()=>{if(!p()||!h()||!k||S)return;S=!0,b&&(b.disabled=!0,b.textContent="Loading…");const A=k,N=$;try{await P({append:!0,cursor:A})}finally{N===$&&(S=!1)}}),pu().then(async A=>{if(!(!p()||!h()||!(i!=null&&i.isConnected))){if(!A.reachable){i.textContent="Could not reach API /health · uploads disabled.",g("Could not reach API. No local fallback.");return}if(!A.mediaStorage){i.textContent="Media storage not ready (R2 unbound or Worker reports media_storage:false). Uploads disabled — nothing was saved locally.",g("Vault storage unavailable. Mutations are disabled until /health capabilities.media_storage is true.");return}i.textContent="Media storage ready · private uploads use your signed-in session. Thumbnails/transcoding unsupported.",v(),await P()}}).catch(()=>{!p()||!(i!=null&&i.isConnected)||(i.textContent="Could not reach API /health · uploads disabled.",g("Could not reach API. No local fallback."))});let q=null;const E=()=>{if(s===At&&Le){try{Le.abort()}catch{}const A=Tt;Le=null,Tt=null,A&&Se.cancel(A).catch(()=>{})}},V=()=>{q&&clearInterval(q),q=setInterval(()=>{if(s!==At){clearInterval(q),q=null;return}t.isConnected||(clearInterval(q),q=null,E())},500)};d==null||d.addEventListener("click",()=>{Le&&s===At&&Le.abort()}),n==null||n.addEventListener("submit",async A=>{var R,O;if(A.preventDefault(),!p()||!h())return;const N=(R=u==null?void 0:u.files)==null?void 0:R[0];if(!N)return f("Choose a photo, video, or audio file");if(!mu(N))return f("Unsupported file type for Vault");if(Le)try{Le.abort()}catch{}Le=new AbortController,Tt=null;const j=Le.signal;V(),d&&(d.hidden=!1);const I=t.querySelector("#vaultMediaSubmit");I&&(I.disabled=!0),Xe(c,"Creating upload…");try{const F=await pb(N,{access:"private",signal:j,onProgress:B=>{var H;p()&&((H=B==null?void 0:B.media)!=null&&H.id&&(Tt=B.media.id),Xe(c,vb(B)))}});if(!p()||!h())return;const J=(O=F==null?void 0:F.media)==null?void 0:O.id;if(Tt=J||null,Xe(c,"Waiting for ready…"),J)try{const B=await mb(J,{signal:j,timeoutMs:9e4});if(!p()||!h())return;if(B.state==="ready")Xe(c,`Ready: ${B.filename||J}`),f("Vault upload ready");else{const H=B.state==="failed"?hu(B.error):"";Xe(c,`Finished with state ${B.state}${H?": "+H:""}`),f(`Upload ended: ${B.state}`)}}catch(B){if(!p())return;if((B==null?void 0:B.code)==="processing_timeout")Xe(c,"Uploaded; processing still running — refresh list shortly.");else throw B}u&&(u.value=""),p()&&h()&&await P()}catch(F){if(!p())return;if((F==null?void 0:F.code)==="cancelled")Xe(c,"Upload cancelled."),f("Upload cancelled");else{const B={unauthenticated:"Sign in to upload.",email_unverified:"Verify your email before uploading.",vault_storage_not_configured:"Media storage not configured. Nothing was uploaded.",media_storage_not_configured:"Media storage not configured. Nothing was uploaded.",payload_too_large:"File exceeds the server size limit.",unsupported_type:"Unsupported file type.",quota_exceeded:"Vault quota exceeded."}[F==null?void 0:F.code]||"Upload failed";Xe(c,B),f(B)}p()&&h()&&await P().catch(()=>{})}finally{s===At&&(Le=null,Tt=null,q&&(clearInterval(q),q=null)),p()&&(d&&(d.hidden=!0),I&&(I.disabled=!1))}}),r==null||r.addEventListener("click",async A=>{var R,O,F,J,B,H,me,W;if(!p()||!h())return;const N=(O=(R=A.target).closest)==null?void 0:O.call(R,".vault-media-open"),j=(J=(F=A.target).closest)==null?void 0:J.call(F,".vault-media-cancel"),I=(H=(B=A.target).closest)==null?void 0:H.call(B,".vault-media-delete");if(N){const Z=N.getAttribute("data-id");if(!Z)return;N.disabled=!0;try{const Q=await Se.accessUrl(Z);if(!p()||!h())return;const de=kb(Q==null?void 0:Q.url,cn());if(!de){f("Could not open media");return}const Oe=document.createElement("a");Oe.href=de,Oe.target="_blank",Oe.rel="noopener",Oe.click()}catch{p()&&f("Could not open media")}finally{p()&&(N.disabled=!1)}return}if(j){const Z=j.getAttribute("data-id");if(!Z)return;j.disabled=!0;try{const Q=await Se.cancel(Z);if(!p()||!h())return;(me=Q==null?void 0:Q.media)!=null&&me.cleanup_pending?(f("Cancelled · storage cleanup pending"),Xe(c,"Cancelled · storage cleanup pending")):f("Upload cancelled"),await P()}catch(Q){p()&&f((Q==null?void 0:Q.message)||"Cancel failed")}finally{p()&&(j.disabled=!1)}return}if(I){const Z=I.getAttribute("data-id");if(!Z||!(typeof window.confirm=="function"?window.confirm("Remove this ready media from your Vault library? Signed links will stop working. Storage cleanup may finish in the background if needed."):!1))return;I.disabled=!0;try{const de=await Se.delete(Z);if(!p()||!h())return;(W=de==null?void 0:de.media)!=null&&W.cleanup_pending?(f("Removed from library · storage cleanup pending"),Xe(c,"Removed from library · storage cleanup pending (bytes may still be queued)")):f("Media deleted"),await P()}catch(de){p()&&f((de==null?void 0:de.message)||"Delete failed")}finally{p()&&(I.disabled=!1)}}})}const Sb="https://pikk-api.pikk-0fa.workers.dev".trim().replace(/\/$/,"");function pi(){return((typeof window<"u"&&typeof window.__PIKK_API_BASE__=="string"?window.__PIKK_API_BASE__.trim():"")||Sb).replace(/\/$/,"")}function $b(){return!!pi()}async function Ln(e){var s,a,i;let t=null;try{t=await e.json()}catch{}if(!e.ok){const n=new Error(((s=t==null?void 0:t.error)==null?void 0:s.message)||`Request failed (${e.status})`);throw n.status=e.status,n.code=((a=t==null?void 0:t.error)==null?void 0:a.code)||"request_failed",n.details=((i=t==null?void 0:t.error)==null?void 0:i.details)||null,n}return t}const Dn={deleteDraft:async e=>{const t=pi();if(!t){const a=new Error("PIKK API is not configured");throw a.code="api_not_configured",a}const s=await fetch(t+"/media/music/"+encodeURIComponent(e),{method:"DELETE",credentials:"include"});return Ln(s)},list:async()=>{const e=await fetch(pi()+"/media/music",{credentials:"include"});return Ln(e)},upload:async({audio:e,title:t,artistName:s,albumTitle:a="",genre:i="",rightsCertified:n=!1,explicitContent:o=!1})=>{const r=pi();if(!r){const u=new Error("PIKK API is not configured");throw u.code="api_not_configured",u}const c=new FormData;c.set("audio",e),c.set("title",t),c.set("artist_name",s),a&&c.set("album_title",a),i&&c.set("genre",i),c.set("rights_certified",n?"true":"false"),c.set("explicit_content",o?"true":"false");const d=await fetch(r+"/media/music",{method:"POST",credentials:"include",body:c});return Ln(d)}},Eb="pikk_music_cleanup_pending:",xb="pikk_music_cleanup_pending",Xr=/^[\w-]{1,80}$/;function fu(e){const t=e!=null?String(e):"";return!t||!Xr.test(t)?null:Eb+t}function gu(e){if(!Array.isArray(e))return[];const t=[],s=new Set;for(const a of e)typeof a!="string"||!Xr.test(a)||s.has(a)||(s.add(a),t.push(a));return t}function Qs(e){const t=fu(e);if(!t)return[];try{return gu(JSON.parse(sessionStorage.getItem(t)||"[]"))}catch{return[]}}function Qa(e,t){const s=fu(e);if(s)try{sessionStorage.setItem(s,JSON.stringify(gu(t)))}catch{}}function Ab(){try{sessionStorage.removeItem(xb)}catch{}}let Xs=0,ol=null;function ll(e){U(e)}const ir={apple:"Apple Music",spotify:"Spotify",youtubeMusic:"YouTube Music",youtube:"YouTube",tidal:"Tidal",amazon:"Amazon Music"};function vu(e){if(!e||typeof e!="object")return{};const t={};for(const s of Object.keys(ir)){const a=String(e[s]||"").trim();(a.startsWith("http://")||a.startsWith("https://"))&&(t[s]=a)}return t}function Tb(e){const t=vu(e),s=Object.keys(ir).filter(a=>t[a]);return s.length?s.map(a=>`<a class="btn stream-plat stream-plat-${l(a)}" href="${l(t[a])}" target="_blank" rel="noopener">${l(ir[a])}</a>`).join(""):'<span class="muted" style="font-size:12px">No platform links yet</span>'}function Cb(e){try{const t=new URL(e);return t.protocol!=="https:"||t.hostname!=="music.apple.com"||!/^\/[a-z]{2}(?:-[a-z]{2})?\/(?:song|album)\//i.test(t.pathname)?"":"https://embed.music.apple.com"+t.pathname+t.search}catch{return""}}function _n(e){var o;const t=e.cover?`<img class="stream-cover" src="${l(e.cover)}" alt="${l(e.title)}" loading="lazy" referrerpolicy="no-referrer" />`:'<div class="stream-cover stream-cover-empty" aria-hidden="true">♪</div>',s=e.albumNote?`<div class="muted" style="font-size:11px">${l(e.albumNote)}</div>`:"",a=e.year?` · ${l(String(e.year))}`:"",i=Cb((o=e.links)==null?void 0:o.apple),n=i?`<details class="apple-music-embed"><summary>Play in PIKK · Apple Music</summary><iframe title="Apple Music player for ${l(e.title)}" src="${l(i)}" loading="lazy" allow="autoplay *; encrypted-media *; fullscreen *" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation" style="width:100%;height:175px;border:0;border-radius:12px"></iframe><small class="muted">Apple controls playback availability. Full listening may require Apple Music.</small></details>`:"";return`
    <article class="stream-release">
      ${t}
      <div class="stream-meta">
        <span class="chip">${l(e.type||"release")}</span>
        <strong>${l(e.title)}</strong>
        <div class="muted" style="font-size:12px">${l(e.artist||"DatBoiSkeet")}${a}</div>
        ${s}
        ${n}
        <div class="stream-plats">${Tb(e.links)}</div>
      </div>
    </article>`}function cl(e){return e==="inner"?"Inner Circle":e==="backstage"?"Backstage":e==="skeet+"?"PIKK+":"None"}const Pb={skeet:"PIKK+","skeet+":"PIKK+",backstage:"Backstage",inner:"Inner Circle"},dl=e=>Pb[e]||e;function Ib(e){return pp.map(t=>{const s=t.tier==="backstage"||t.tier==="inner";return e&&Vn(s?"backstage":"skeet")?`
      <article class="vault-card unlocked" data-id="${l(t.id)}">
        <img src="${l(t.cover)}" alt="${l(t.title)}" />
        <div class="vault-meta">
          <span class="chip" style="border-color:var(--line);color:var(--tx)">Unlocked</span>
          <strong>${l(t.title)}</strong>
          <div class="muted" style="font-size:12px">${l(t.artist)} · ${l(t.status)}</div>
          <div class="muted" style="font-size:11px">Requires ${l(dl(t.tier))} · no audio yet</div>
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
          <div class="muted" style="font-size:11px">Join ${l(dl(t.tier))} to unlock</div>
        </div>
      </article>`}).join("")}function ul(e={}){var $;const t=["songs","albums","beats","playlists","upload"].includes(($=e.query)==null?void 0:$.view)?e.query.view:"",{user:s}=D(),a=Ft(),i=Vn("skeet"),n=new Set((s==null?void 0:s.purchasedTracks)||[]),o=Es.map(w=>`
    <div class="cover-card" style="flex:0 0 160px">
      <span class="badge-cs">${l(w.status)}</span>
      <img src="${l(w.cover)}" alt="${l(w.title)}" style="width:160px;height:160px" />
      <div class="t">${l(w.title)}</div>
      <div class="muted" style="font-size:11px">${l(w.artist)}</div>
    </div>`).join(""),r=Ki.map(w=>{const C=w.id==="skeet"?"skeet+":w.id==="inner"?"inner":w.id,P=a===C;return`
    <div class="card" style="margin:0">
      <h3>${l(w.name)}</h3>
      <div class="price" style="font-size:22px;font-weight:900">$${w.price}<span class="muted" style="font-size:13px">/mo</span></div>
      <p class="muted">${l(w.blurb)}</p>
      ${s?P?`<button type="button" class="btn ghost block mem-toggle" data-tier="${l(w.id)}" data-on="1">Active · tap to cancel (demo)</button>`:`<button type="button" class="btn primary block mem-toggle" data-tier="${l(w.id)}" data-on="0">Join · TEST MODE</button>`:'<a class="btn primary block" href="#/profile">Sign in to join</a>'}
    </div>`}).join(""),c=wo.filter(w=>n.has(w.id)),d=wo.map(w=>{const C=n.has(w.id);return`
      <div class="card" style="margin:0;display:flex;gap:12px;align-items:center">
        <img src="${l(w.cover)}" alt="" style="width:72px;height:72px;border-radius:10px;object-fit:cover;flex:0 0 72px" />
        <div class="spacer">
          <strong>${l(w.title)}</strong>
          <div class="muted" style="font-size:12px">${l(w.artist)} · ${l(w.status)}</div>
          <div style="font-weight:800;margin-top:4px">$${w.price.toFixed(2)}</div>
        </div>
        ${s?C?'<span class="chip">In My Music</span>':`<button type="button" class="btn primary buy-track" data-id="${l(w.id)}">Buy · demo</button>`:'<a class="btn" href="#/profile">Sign in</a>'}
      </div>`}).join(""),u=as({publishedOnly:!0,types:["song","album"]}),p=u.map(w=>{const C=vu(w.streamingLinks||{});return Object.keys(C).length?{id:w.id,title:w.title,artist:w.artist,type:w.type||"song",cover:w.coverRef&&!String(w.coverRef).startsWith("idb:")?w.coverRef:"",links:C,fromAdmin:!0}:null}).filter(Boolean),h=[...vt,...p];let g="";if(t==="songs"||t==="albums"){const w=t==="albums",C=h.filter(P=>w?P.type==="album":P.type==="single"||P.type==="song");g=`<div class="card" id="music-focused-view">
      <h2>${w?"Albums":"Songs"}</h2>
      <p class="muted">Verified releases and available official listening links.</p>
      <div class="stream-grid">${C.map(_n).join("")||'<p class="muted">No releases listed in this category yet.</p>'}</div>
      <a class="btn ghost" href="#/music">Music overview</a>
    </div>`}else t==="playlists"?g=`<div class="card" id="music-focused-view">
      <h2>Playlists</h2>
      <p class="muted">Official YouTube playlists open on YouTube. No rehosted audio.</p>
      <div class="row wrap" style="gap:8px">
        ${Un.map(w=>`<a class="btn ghost" href="${l(w.youtube)}" target="_blank" rel="noopener">${l(w.title)}</a>`).join("")}
      </div>
      <a class="btn ghost" href="#/music">Music overview</a>
    </div>`:(t==="beats"||t==="upload")&&(t==="upload"?$b()?g=`<section class="card" id="music-focused-view">
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
      </div>`);const v=u.length?`<div class="card catalog-admin-music">
        <h2>From Admin</h2>
        <p class="muted">Published songs &amp; albums added in Admin · TEST MODE (device-local).</p>
        <div class="cover-row">${u.map(w=>`
          <div class="cover-card catalog-item" data-id="${l(w.id)}" style="flex:0 0 160px">
            <span class="badge-cs">${l(w.type)}</span>
            <img data-idb-src="${l(w.coverRef||"")}" src="${l(w.coverRef&&!w.coverRef.startsWith("idb:")?w.coverRef:"")}" alt="${l(w.title)}" style="width:160px;height:160px;object-fit:cover;background:#111" />
            <div class="t">${l(w.title)}</div>
            <div class="muted" style="font-size:11px">${l(w.artist)}</div>
            ${w.mediaRef?`<audio class="catalog-audio" data-idb-src="${l(w.mediaRef)}" controls preload="none" style="width:100%;margin-top:6px"></audio>`:""}
          </div>`).join("")}</div>
      </div>`:"",b=vt.find(w=>w.cover)||null,y=vt.filter(w=>w.cover).slice(0,5),S=`
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
        <a class="btn" href="${l(ke.youtube)}" target="_blank" rel="noopener">Official channel</a>
        <a class="btn ghost" href="${l(ke.youtubeHandle)}" target="_blank" rel="noopener">@DatBoiSkeet1</a>
        ${Un.map(w=>`<a class="btn ghost" href="${l(w.youtube)}" target="_blank" rel="noopener">${l(w.title)}</a>`).join("")}
      </div>
      <div class="yt-mix-grid">
        ${fr.map(w=>`
          <article class="yt-mix-card">
            <div class="hero-video" style="margin:0 0 10px">
              <iframe src="${l(yt(w.embed))}" title="${l(w.title)}" allowfullscreen loading="lazy"
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
        <a class="btn stream-plat stream-plat-apple" href="${l(ke.apple)}" target="_blank" rel="noopener">Apple Music · Listen</a>
        <a class="btn ghost stream-plat stream-plat-spotify" href="${l(ke.spotify)}" target="_blank" rel="noopener">Spotify · Alternative</a>
        <a class="btn stream-plat stream-plat-youtubeMusic" href="${l(ke.youtubeMusic)}" target="_blank" rel="noopener">YouTube Music</a>
        <a class="btn stream-plat stream-plat-youtube" href="${l(ke.youtube)}" target="_blank" rel="noopener">YouTube</a>
      </div>
      <div class="stream-grid">
        ${vt.map(_n).join("")}
        ${p.map(_n).join("")}
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
      <h2>Vault ${i?'<span class="chip" style="border-color:var(--line);color:var(--tx)">Unlocked · '+l(cl(a))+"</span>":'<span class="chip">Locked</span>'}</h2>
      <p class="muted" style="font-size:12px;margin:6px 0 0" id="vaultApiStatus">Demo membership cards below are separate from real Vault media.${fn()?" Checking storage readiness…":" API not configured."}</p>
      <p class="muted">Exclusive unreleased tracks &amp; previews for members. Nested under Music — not a bottom-nav tab.</p>

      <div class="vault-grid" style="margin:12px 0">
        ${Ib(i)}
      </div>

      ${i?`<div class="vault-lock" style="border-style:solid;border-color:#2a4a3a;color:var(--tx)">
              ✅ Membership active: <strong>${l(cl(a))}</strong>. Exclusive cards above are unlocked.
              Cancel anytime with the tier button below (demo). Purchased My Music items are kept.
            </div>`:`<div class="vault-lock">
              🔒 Vault locked. Sign in, then tap <strong>Join · TEST MODE</strong> on PIKK+ or Backstage below.
              Locked cards show title/cover only — no exclusive content until you join.
            </div>`}

      ${yb()}

      <h3 style="margin:16px 0 8px">Membership (TEST MODE)</h3>
      <div class="grid-2">${r}</div>
    </div>

  `;return M("Music & Vault",S,{lead:"Singles, albums, Coming Soon, and member Vault."})}function Mb(e=[]){return e.length?`<div class="support-history">${e.map(t=>`<article class="card" style="margin:0 0 8px"><div class="row wrap"><strong>${l(t.title)}</strong><span class="chip">${l(t.status)}</span></div><p class="muted" style="margin:5px 0">${l(t.artist_name)}${t.album_title?" · "+l(t.album_title):""}</p><small class="muted">${l(t.original_name)} · ${Math.max(1,Math.round((Number(t.size_bytes)||0)/1024/1024*10)/10)} MB${t.explicit_content?" · Explicit":""}</small><div style="margin-top:8px"><button type="button" class="btn ghost music-draft-delete" data-id="${l(t.id)}">Delete draft</button></div></article>`).join("")}</div>`:'<p class="muted">No backend music drafts yet.</p>'}function pl(e){const t=document.getElementById("vaultApiStatus");t&&fn()&&pu().then(p=>{t.isConnected&&(p.reachable?p.mediaStorage?t.textContent="Worker reports media storage ready · use My Vault media panel for private uploads (no thumbnails/transcoding yet).":t.textContent="API base set · media storage not ready (R2 unbound / media_storage:false) · My Vault media mutations disabled.":t.textContent="API base set · could not reach /health · My Vault media mutations disabled.")}).catch(()=>{t.isConnected&&(t.textContent="API base set · could not reach /health · My Vault media mutations disabled.")}),wb(e);const s=e.querySelector("#pikkMusicUploadForm"),a=e.querySelector("#pikkMusicUploadList"),i=e.querySelector("#musicUploadStatus");Ab();let n=0;const o=Ne()||null;Xs+=1;const r=Xs;String(o||"")!==String(ol||"")&&(ol=o,a&&(a.innerHTML=""));const c=()=>r===Xs&&String(Ne()||"")===String(o||""),d=async()=>{if(!a)return;const p=++n,h=Ne()||null;if(!h){if(!c()||p!==n)return;a.innerHTML='<p class="muted">Sign in from <a href="#/profile">Profile</a> to view your music drafts.</p>';return}try{const g=await Dn.list();if(!c()||p!==n||String(Ne()||"")!==String(h))return;const v=Array.isArray(g==null?void 0:g.uploads)?g.uploads:[];a.innerHTML=Mb(v);const b=Qs(h).filter(y=>!v.some(k=>k&&k.id===y));for(const y of b)a.insertAdjacentHTML("beforeend",`<article class="card" style="margin:0 0 8px" data-cleanup-pending="1"><div class="row wrap"><strong>Draft</strong><span class="chip">cleanup pending</span></div><p class="muted" style="margin:5px 0">Storage delete incomplete — retry required (no automatic sweeper).</p><div style="margin-top:8px"><button type="button" class="btn ghost music-draft-cleanup-retry" data-id="${l(y)}">Retry storage cleanup</button></div></article>`)}catch(g){if(!c()||p!==n)return;a.innerHTML=(g==null?void 0:g.status)===401?'<p class="muted">Sign in from <a href="#/profile">Profile</a> to view your music drafts.</p>':`<p class="muted">Could not load drafts: ${l((g==null?void 0:g.message)||"Unknown error")}</p>`}};a==null||a.addEventListener("click",async p=>{var k,S;const h=p.target.closest(".music-draft-delete,.music-draft-cleanup-retry");if(!h)return;const g=h.classList.contains("music-draft-cleanup-retry"),v=String(h.dataset.id||""),b=Ne()||null;if(!b){f("Sign in required");return}if(!Xr.test(v)){Qa(b,Qs(b).filter($=>$!==v)),(k=h.closest("article"))==null||k.remove(),f("Invalid draft id");return}if(!g&&!confirm("Delete this private music draft?")||h.dataset.busy==="1")return;h.dataset.busy="1",h.disabled=!0;const y=r;try{const $=await Dn.deleteDraft(v),w=y===Xs,C=String(Ne()||"")===String(b);if($!=null&&$.cleanup_pending||$!=null&&$.retry_required){if(Qa(b,Qs(b).concat(v)),!w||!C)return;f($.message||"Storage delete failed — retry Delete to finish. No automatic cleanup.");const P=h.closest("article");P&&(P.dataset.cleanupPending="1",h.textContent="Retry storage cleanup",h.classList.add("music-draft-cleanup-retry"),h.classList.remove("music-draft-delete"),h.disabled=!1,h.dataset.busy="0");return}if(Qa(b,Qs(b).filter(P=>P!==v)),!w||!C)return;f(g?"Stored audio removed":"Music draft deleted"),await d()}catch($){const w=y===Xs,C=String(Ne()||"")===String(b);if(($==null?void 0:$.status)===404||($==null?void 0:$.status)===409){if(Qa(b,Qs(b).filter(P=>P!==v)),!w||!C)return;(S=h.closest("article"))==null||S.remove(),f(($==null?void 0:$.message)||(($==null?void 0:$.status)===409?"Only private drafts can be deleted":"Draft not found"));return}if(!w||!C)return;f(($==null?void 0:$.message)||"Could not delete music draft"),h.disabled=!1,h.dataset.busy="0"}}),s==null||s.addEventListener("submit",async p=>{var v,b,y,k,S,$,w,C,P,q,E,V;p.preventDefault();const h=(b=(v=e.querySelector("#musicUploadFile"))==null?void 0:v.files)==null?void 0:b[0];if(!h)return f("Choose an audio file");const g=e.querySelector("#musicUploadSubmit");g&&(g.disabled=!0),i&&(i.textContent="Uploading private draft…");try{const A=await Dn.upload({audio:h,title:((k=(y=e.querySelector("#musicUploadTitle"))==null?void 0:y.value)==null?void 0:k.trim())||"",artistName:(($=(S=e.querySelector("#musicUploadArtist"))==null?void 0:S.value)==null?void 0:$.trim())||"",albumTitle:((C=(w=e.querySelector("#musicUploadAlbum"))==null?void 0:w.value)==null?void 0:C.trim())||"",genre:((q=(P=e.querySelector("#musicUploadGenre"))==null?void 0:P.value)==null?void 0:q.trim())||"",rightsCertified:!!((E=e.querySelector("#musicUploadRights"))!=null&&E.checked),explicitContent:!!((V=e.querySelector("#musicUploadExplicit"))!=null&&V.checked)});if(!c())return;i&&(i.textContent=`Draft uploaded: ${A.upload.title}. It is not published yet.`),f("Music draft uploaded"),s.reset(),await d()}catch(A){if(!c())return;const j={unauthenticated:"Sign in to upload music.",email_unverified:"Verify your email before uploading music.",creator_role_required:"Add Creator, Artist or Producer to your PIKK account before uploading.",media_storage_not_configured:"PIKK media storage is not connected yet. No file was uploaded.",rights_required:"Confirm that you own or control the rights to this audio."}[A==null?void 0:A.code]||(A==null?void 0:A.message)||"Could not upload music";i&&(i.textContent=j),f(j)}finally{g&&(g.disabled=!1)}}),a&&d();const u=e.querySelector("#youtube-mixes")||e;ln(u),e.querySelectorAll(".mem-toggle").forEach(p=>{p.addEventListener("click",h=>{h.preventDefault();const g=p.dataset.on==="1",v=ji(p.dataset.tier,!g);if(v!=null&&v.error)return f("Sign in required — open Profile first");f(g?"Membership cancelled (demo) · My Music purchases kept":`Joined ${p.dataset.tier} (TEST MODE) · Vault unlocked`),ll("#/music"),setTimeout(()=>{var b;return(b=document.getElementById("vault"))==null?void 0:b.scrollIntoView({behavior:"smooth",block:"start"})},40)})}),e.querySelectorAll(".buy-track").forEach(p=>{p.addEventListener("click",h=>{h.preventDefault();const g=kp(p.dataset.id);if(g!=null&&g.error)return f("Sign in required");f("Added to My Music (demo · no charge)"),ll("#/music")})}),e.querySelectorAll("[data-idb-src]").forEach(async p=>{const h=p.getAttribute("data-idb-src");if(!h)return;const g=await pn(h);g&&(p.tagName==="IMG"||p.tagName==="AUDIO"||p.tagName==="VIDEO")&&(p.src=g)})}const Zr="pikk_ai_artists_local_drafts_v1",bu=Object.freeze(["Fully AI-generated music","AI-assisted music with human performance","Human-made music with AI artwork only"]),Lb="AI-generated or AI-assisted";function Db(e,t=Date.now()){const s=String(e.artist||"").trim().slice(0,80),a=String(e.track||"").trim().slice(0,120),i=String(e.creation||""),n=String(e.description||"").trim().slice(0,600),o=Number(e.price);if(!s||!a||!bu.includes(i)||!e.confirmed)throw Error("Artist, title, creation type and honest AI disclosure are required.");if(!Number.isFinite(o)||o<0||o>100)throw Error("Preview price must be between $0 and $100.");return{id:"ai-draft-"+t+"-"+Math.random().toString(36).slice(2,8),artist:s,track:a,creation:i,description:n,price:o,createdAt:t,status:"Private local draft · not published",disclosure:Lb}}function eo(e){try{const t=JSON.parse(e.getItem(Zr)||"[]");return Array.isArray(t)?t.filter(s=>s&&typeof s.id=="string").slice(0,40):[]}catch{return[]}}function _b(e,t){const s=[t,...eo(e)].slice(0,40);return e.setItem(Zr,JSON.stringify(s)),s}function Ob(e,t){const s=eo(e).filter(a=>a.id!==t);return e.setItem(Zr,JSON.stringify(s)),s}function qb(){const e=eo(window.localStorage),t=e.length?e.map(s=>`<article class="card ai-artist-draft"><div class="row wrap"><strong>${l(s.track)}</strong><span class="chip">AI · ${l(s.creation)}</span></div><p class="muted">by ${l(s.artist)} · Preview price $${s.price.toFixed(2)}</p><p class="muted">${l(s.status)}</p><button type="button" class="btn ghost ai-artist-delete" data-id="${l(s.id)}">Delete draft</button></article>`).join(""):'<p class="muted">No AI music drafts saved on this device. This is not a public music catalog.</p>';return M("PIKK AI Artists",`
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
       <div class="field"><label for="aiCreationType">How was this made? *</label><select id="aiCreationType" name="creation">${bu.map(s=>`<option value="${l(s)}">${l(s)}</option>`).join("")}</select></div>
       <div class="field"><label for="aiPreviewPrice">Planned purchase price in USD (preview only)</label><input id="aiPreviewPrice" name="price" type="number" min="0" max="100" step=".01" value="1.00" required /></div>
       <div class="field"><label for="aiDescription">Description (optional)</label><textarea id="aiDescription" name="description" maxlength="600"></textarea></div>
       <label class="ai-artist-certify"><input type="checkbox" id="aiArtistCertify" required /> I accurately disclosed the use of AI and confirm I hold or can obtain the necessary commercial rights, including voice and likeness permissions.</label>
       <button type="submit" class="btn primary">Save private AI music draft</button>
     </form>
    </section>
    <section class="card ai-artist-panel"><h3>My private drafts (${e.length})</h3><div class="ai-artist-drafts">${t}</div><p class="muted">A real AI Artist storefront, public discovery feed and licensed downloadable sales require backend, payments and rights verification.</p></section>
   </div>
  </div>`,{lead:"Dedicated AI music category · Disclosure first"})}function Rb(e){var t;(t=e.querySelector("#aiArtistForm"))==null||t.addEventListener("submit",s=>{s.preventDefault();const a=s.currentTarget;try{const i=Db({artist:a.elements.artist.value,track:a.elements.track.value,creation:a.elements.creation.value,price:a.elements.price.value,description:a.elements.description.value,confirmed:e.querySelector("#aiArtistCertify").checked});_b(window.localStorage,i),f("Private AI artist draft saved · not published"),location.hash==="#/ai-artists"&&(location.hash="#/ai-artists?updated=1"),window.dispatchEvent(new HashChangeEvent("hashchange"))}catch(i){f(i.message)}}),e.querySelectorAll(".ai-artist-delete").forEach(s=>s.addEventListener("click",()=>{Ob(window.localStorage,s.dataset.id),window.dispatchEvent(new HashChangeEvent("hashchange"))}))}const gn="pikk_shield_intake_v1",Pi=30,to=Object.freeze(["Original creator","Licensed with permission","Authorized representative"]);function Ps(e){const t=String(e||"").trim();if(!t)return"";try{const s=new URL(t);return["https:","http:"].includes(s.protocol)?s.href:""}catch{return""}}function Nb(e,t=Date.now()){const s=String(e.title||"").trim().slice(0,120),a=String(e.owner||"").trim().slice(0,100),i=String(e.rights||""),n=String(e.contact||"").trim().slice(0,180),o=String(e.notes||"").trim().slice(0,800),r=Ps(e.source);if(!s||!a||!n||!to.includes(i)||!e.certified)throw new Error("Complete title, rights holder, contact, ownership basis and certification.");if(String(e.source||"").trim()&&!r)throw new Error("Use a valid http or https link.");return{id:"shield-"+t+"-"+Math.random().toString(36).slice(2,8),type:"rights-declaration",title:s,owner:a,rights:i,contact:n,notes:o,source:r,at:t,status:"Local draft — not submitted"}}function qs(e){try{const t=JSON.parse(e.getItem(gn)||"[]");return Array.isArray(t)?t.filter(s=>s&&s.type==="rights-declaration").slice(0,Pi):[]}catch{return[]}}function Bb(e,t){const s=[t,...qs(e)].slice(0,Pi);return e.setItem(gn,JSON.stringify(s)),s}function Kb(e,t){const s=qs(e).filter(a=>a.id!==t);return e.setItem(gn,JSON.stringify(s)),s}function jb(e){const t=qs(e).map(s=>({id:String(s.id||""),type:"rights-declaration",title:String(s.title||""),owner:String(s.owner||""),rights:String(s.rights||""),contact:String(s.contact||""),notes:String(s.notes||""),source:Ps(s.source),at:Number.isFinite(s.at)?s.at:null,status:"Local draft — not submitted"}));return JSON.stringify({format:"PIKK Shield local rights drafts",version:1,drafts:t},null,2)}function Fb(e,t){if(typeof t!="string"||t.length>65536)throw new Error("Backup file must be under 64 KB.");let s;try{s=JSON.parse(t)}catch{throw new Error("Invalid JSON backup file.")}if(!s||s.format!=="PIKK Shield local rights drafts"||s.version!==1||!Array.isArray(s.drafts)||s.drafts.length>Pi)throw new Error("Not a supported PIKK Shield backup (maximum 30 drafts).");const a=s.drafts.map((c,d)=>{if(!c||typeof c!="object"||Array.isArray(c))throw new Error("Invalid draft in backup.");for(const u of["id","title","owner","rights","contact","notes","source"])if(typeof c[u]!="string")throw new Error("Invalid draft field: "+u);if(!/^shield-[a-zA-Z0-9-]{1,80}$/.test(c.id)||!c.title.trim()||c.title.length>120||!c.owner.trim()||c.owner.length>100||!to.includes(c.rights)||!c.contact.trim()||c.contact.length>180||c.notes.length>800||c.source&&(!Ps(c.source)||Ps(c.source)!==c.source)||c.at!==null&&(!Number.isFinite(c.at)||c.at<0))throw new Error("Backup draft "+(d+1)+" contains invalid fields.");return{id:c.id,type:"rights-declaration",title:c.title.trim(),owner:c.owner.trim(),rights:c.rights,contact:c.contact.trim(),notes:c.notes,source:Ps(c.source),at:c.at??Date.now(),status:"Local draft — not submitted"}}),i=qs(e),n=new Set(i.map(c=>c.id)),o=[];for(const c of a)n.has(c.id)||(n.add(c.id),o.push(c));const r=o.slice(0,Math.max(0,Pi-i.length));return r.length&&e.setItem(gn,JSON.stringify([...r,...i])),{added:r.length,duplicates:a.length-o.length,total:qs(e).length}}const Ub=()=>qs(window.localStorage);function Gb(){const e=Ub(),t=e.length?e.map(s=>{const a=Ps(s.source);return`
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
            <div class="field"><label for="shieldRights">Rights basis *</label><select id="shieldRights" name="rights" required>${to.map(s=>`<option value="${l(s)}">${l(s)}</option>`).join("")}</select></div>
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
    </div>`,{lead:"Rights declaration preview · No official copyright protection is active yet"})}function Vb(e){var i,n,o;(i=e.querySelector("#shieldForm"))==null||i.addEventListener("submit",r=>{r.preventDefault();const c=r.currentTarget;try{const d=Nb({title:c.elements.title.value,owner:c.elements.owner.value,rights:c.elements.rights.value,contact:c.elements.contact.value,source:c.elements.source.value,notes:c.elements.notes.value,certified:e.querySelector("#shieldCertify").checked});Bb(window.localStorage,d),f("Local rights draft saved — not submitted"),location.hash="#/shield?updated=1",window.dispatchEvent(new HashChangeEvent("hashchange"))}catch(d){f(d.message)}});const t=e.querySelector("#shieldImportFile");(n=e.querySelector("#shieldImportDrafts"))==null||n.addEventListener("click",()=>t==null?void 0:t.click()),t==null||t.addEventListener("change",async()=>{var c;const r=(c=t.files)==null?void 0:c[0];if(r)try{if(r.size>65536)throw new Error("Backup file must be under 64 KB.");const d=await r.text();if(!window.confirm("Restore PIKK Shield drafts from this file? Valid drafts will be merged into this browser, without replacing existing drafts."))return;const u=Fb(window.localStorage,d);f(`Restored ${u.added} local draft(s); ${u.duplicates} already saved`),window.dispatchEvent(new HashChangeEvent("hashchange"))}catch(d){f(d.message||"Unable to restore backup")}finally{t.value=""}}),(o=e.querySelector("#shieldExportDrafts"))==null||o.addEventListener("click",()=>{const r=jb(window.localStorage),c=URL.createObjectURL(new Blob([r],{type:"application/json"})),d=document.createElement("a");d.href=c,d.download="pikk-shield-local-drafts.json",document.body.appendChild(d),d.click(),d.remove(),setTimeout(()=>URL.revokeObjectURL(c),1e3),f("Local backup downloaded — store it privately")});const s=e.querySelector("#shieldDraftSearch"),a=[...e.querySelectorAll(".shield-entry")];s==null||s.addEventListener("input",()=>{const r=s.value.trim().toLocaleLowerCase();let c=0;a.forEach(p=>{const h=p.dataset.shieldSearch.includes(r);p.hidden=!h,h&&c++});const d=e.querySelector("#shieldSearchCount");d&&(d.textContent=`Showing ${c} of ${a.length} drafts`);const u=e.querySelector("#shieldSearchEmpty");u&&(u.hidden=c!==0)}),e.querySelectorAll(".shield-delete").forEach(r=>r.addEventListener("click",()=>{var d,u;const c=((u=(d=r.closest(".shield-entry"))==null?void 0:d.querySelector("strong"))==null?void 0:u.textContent)||"this rights draft";window.confirm(`Delete local rights draft "${c}"? This cannot be undone.`)&&(Kb(window.localStorage,r.dataset.id),f("Local draft deleted"),window.dispatchEvent(new HashChangeEvent("hashchange")))}))}const so="pikk_support_local_tickets_v1",yu=Object.freeze(["Account & login","Music & artist rights","Livestreams & gifts","Billing & purchases","Safety & reporting","Technical issue","Bug report","Other"]),ku=40;function Hb(e,t=Date.now()){const s=String(e.category||""),a=String(e.subject||"").trim().slice(0,120),i=String(e.message||"").trim().slice(0,1500),n=String(e.contact||"").trim().slice(0,180);if(!yu.includes(s)||a.length<4||i.length<10||!n)throw Error("Select a topic and enter a subject, contact and detailed message.");return{id:"draft-"+t+"-"+Math.random().toString(36).slice(2,7),category:s,subject:a,message:i,contact:n,createdAt:t,status:"Saved on this device — support inbox coming soon · not submitted"}}function ao(e){try{const t=JSON.parse(e.getItem(so)||"[]");return Array.isArray(t)?t.filter(s=>s&&typeof s.id=="string").slice(0,ku):[]}catch{return[]}}function zb(e,t){const s=ao(e);if(s.some(n=>n.category===t.category&&n.subject===t.subject&&n.message===t.message&&n.contact===t.contact))return s;const i=[t,...s].slice(0,ku);return e.setItem(so,JSON.stringify(i)),i}function Wb(e,t){const s=ao(e).filter(a=>a.id!==t);return e.setItem(so,JSON.stringify(s)),s}const Ii=Object.freeze([{topic:"Music & artist rights",answer:"For copyright protection, review PIKK Shield. Fingerprinting, review and takedowns are not yet operating.",href:"#/shield"},{topic:"Livestreams & gifts",answer:"Check the Live section for available demo features. Real payouts and broadcasts require production integrations.",href:"#/live"},{topic:"Billing & purchases",answer:"Wallet and payments shown in this preview may be demonstration values. Do not assume money was charged or refunded.",href:"#/wallet"},{topic:"Payments & refunds",answer:"No real payments are processed yet, so there is nothing to refund. See the Payments hub for what is live and what is Coming soon.",href:"#/payments"},{topic:"Safety & abuse",answer:"Read the Community Guidelines and use in-app report controls where available. For emergencies contact local authorities.",href:"#/guidelines"},{topic:"Account & login",answer:"This early version does not provide verified human account recovery or password reset via Support.",href:"#/profile"}]);function Yb(e){const t=String(e||"").trim().toLowerCase();return t?Ii.filter(s=>(s.topic+" "+s.answer).toLowerCase().includes(t)):Ii.slice()}const Jb=Object.freeze([{id:"faq",title:"Help / FAQ search",href:"#/support?s=faq"},{id:"contact",title:"Contact support",href:"#/support?s=contact"},{id:"bug",title:"Report a problem / bug",href:"#/support?s=bug"},{id:"abuse",title:"Report abuse / safety",href:"#/guidelines"},{id:"payments",title:"Payments & refunds help",href:"#/payments"},{id:"account",title:"Account & login help",href:"#/support?s=account"},{id:"tickets",title:"My tickets",href:"#/support?s=tickets"}]),Qb="https://pikk-api.pikk-0fa.workers.dev".trim().replace(/\/$/,"");function wu(){return((typeof window<"u"&&typeof window.__PIKK_API_BASE__=="string"?window.__PIKK_API_BASE__.trim():"")||Qb).replace(/\/$/,"")}function io(){return!!wu()}async function Zs(e,{method:t="GET",body:s}={}){var o,r,c;const a=wu();if(!a){const d=new Error("PIKK API is not configured");throw d.code="api_not_configured",d}const i=await fetch(a+e,{method:t,credentials:"include",headers:s===void 0?void 0:{"Content-Type":"application/json"},body:s===void 0?void 0:JSON.stringify(s)});let n=null;try{n=await i.json()}catch{}if(!i.ok){const d=new Error(((o=n==null?void 0:n.error)==null?void 0:o.message)||`Request failed (${i.status})`);throw d.code=((r=n==null?void 0:n.error)==null?void 0:r.code)||"request_failed",d.status=i.status,d.details=((c=n==null?void 0:n.error)==null?void 0:c.details)||null,d}return n}const Xb=Object.freeze({"Account & login":"account","Music & artist rights":"other","Livestreams & gifts":"other","Billing & purchases":"payments","Safety & reporting":"safety","Technical issue":"technical","Bug report":"technical",Other:"other"});function Zb(e){return Xb[e]||"other"}const gt={createTicket:({category:e,subject:t,message:s})=>Zs("/support/tickets",{method:"POST",body:{category:Zb(e),subject:t,message:s}}),listTickets:()=>Zs("/support/tickets"),staffList:()=>Zs("/support/staff/tickets"),getTicket:e=>Zs("/support/tickets/"+encodeURIComponent(e)),reply:(e,t)=>Zs("/support/tickets/"+encodeURIComponent(e)+"/messages",{method:"POST",body:{message:t}})};function Su(e){return e.map(t=>`<a class="support-guide" href="${l(t.href)}"><strong>${l(t.topic)}</strong><span>${l(t.answer)}</span><span class="support-guide-link">View related page →</span></a>`).join("")}function $u(e,t=""){return String(t).trim()?`${e} matching help ${e===1?"guide":"guides"}`:`Showing all ${e} help guides`}function ey(e=[]){return e.length?e.map(t=>`<article class="card support-ticket support-ticket-remote" data-id="${l(t.id)}"><strong>${l(t.subject)}</strong><span class="chip">${l(t.status)}</span><p class="muted">${l(t.category)} · ${new Date(t.created_at).toLocaleDateString()}</p><button class="btn ghost" type="button" data-open-ticket="${l(t.id)}">Open ticket</button></article>`).join(""):'<p class="muted">No submitted support tickets yet.</p>'}function ml(e){const t=e==null?void 0:e.ticket,s=(e==null?void 0:e.messages)||[];if(!t)return"";const a=s.map(i=>`<article class="support-thread-message ${i.is_staff?"is-staff":"is-user"}"><strong>${i.is_staff?"PIKK Support":"@"+l(i.handle||"you")}</strong><p>${l(i.body)}</p><small class="muted">${new Date(i.created_at).toLocaleString()}</small></article>`).join("");return`<div class="card support-ticket-detail" data-ticket-detail="${l(t.id)}"><div class="row wrap"><h3 style="margin:0">${l(t.subject)}</h3><span class="chip">${l(t.status)}</span></div><div class="support-thread">${a||'<p class="muted">No messages yet.</p>'}</div>${t.status==="closed"?'<p class="muted">This ticket is closed.</p>':`<form id="pikkSupportReplyForm" data-ticket-id="${l(t.id)}"><div class="field"><label for="pikkSupportReply">Reply</label><textarea id="pikkSupportReply" name="message" minlength="1" maxlength="5000" required></textarea></div><button class="btn primary" type="submit">Send reply</button></form>`}</div>`}function ty(){const e=io(),t=ao(window.localStorage),s=Su(Ii),a=t.length?t.map(r=>`<article class="card support-ticket" data-id="${l(r.id)}"><strong>${l(r.subject)}</strong><span class="chip">${l(r.status)}</span><p class="muted">${l(r.category)} · ${new Date(r.createdAt).toLocaleDateString()}</p><button class="btn ghost support-delete" type="button" data-id="${l(r.id)}">Delete local draft</button></article>`).join(""):'<p class="muted">No support drafts saved on this device.</p>',i=e?'<p>Find relevant help or submit a support ticket to the PIKK support queue. Submitted tickets are tied to your signed-in account.</p><p class="support-warning"><strong>ACCOUNT SUPPORT:</strong> Sign in before submitting. Never include passwords, payment card numbers, government IDs or confidential documents.</p>':'<p>Find relevant help and prepare a support ticket. Human agents, AI chat, account actions and backend tickets are not yet connected.</p><p class="support-warning"><strong>TEST MODE:</strong> Tickets are saved only in this browser. No request is sent to staff. For urgent safety concerns or unauthorized charges, contact the relevant service or authorities directly.</p>',n=e?"":'<div class="field"><label for="pikkSupportContact">Contact *</label><input id="pikkSupportContact" name="contact" maxlength="180" required placeholder="Email or username" /></div>',o=e?'<section class="card support-pane" id="support-tickets"><h3>My tickets</h3><div class="support-history" id="pikkSupportRemoteHistory" aria-live="polite"><p class="muted">Loading submitted tickets…</p></div><div id="pikkSupportRemoteDetail"></div></section>':`<section class="card support-pane" id="support-tickets"><h3>Saved drafts (${t.length})</h3><div class="support-history">${a}</div></section>`;return M("PIKK Support",`
  <div class="support-studio">
   <header class="support-hero"><span class="support-eyebrow">PIKK HELP CENTER · EARLY ACCESS</span><h2>Answers, guidance & support</h2>${i}</header>
   <nav class="support-jump" aria-label="Support sections">${Jb.map(r=>`<a class="chip" href="${l(r.href)}" data-support-jump="${l(r.id)}">${l(r.title)}</a>`).join("")}</nav>
   <section class="card support-pane" id="support-faq"><h3>Help / FAQ search</h3><div class="support-search-row"><input id="pikkSupportSearch" type="search" aria-label="Search PIKK help guides" placeholder="Search help (e.g. refund, login, live)" aria-label="Search help" aria-controls="pikkSupportResults" aria-describedby="pikkSupportSearchStatus" /><button class="btn ghost support-search-clear" id="pikkSupportClear" type="button" hidden>Clear search</button></div><p class="support-search-status muted" id="pikkSupportSearchStatus" role="status" aria-live="polite" aria-atomic="true">${$u(Ii.length)}</p><div class="support-guides" id="pikkSupportResults">${s}</div></section>
   <section class="card support-pane" id="support-account"><h3>Account &amp; login help</h3><p class="muted">Sign in or manage your profile from <a href="#/profile">Profile</a>. Password reset by Support is not live yet; never share your password with anyone.</p></section>
   <section class="card support-pane" id="support-links"><h3>Safety, payments &amp; bugs</h3><div class="support-guides"><a class="support-guide" href="#/guidelines"><strong>Report abuse / safety</strong><span>Community Guidelines and how reporting works.</span></a><a class="support-guide" href="#/payments"><strong>Payments &amp; refunds help</strong><span>Payments hub · real payments are Coming soon.</span></a><button type="button" class="support-guide" data-support-bug><strong>Report a problem / bug</strong><span>Prefills the ticket form with Bug report.</span></button></div></section>
   <div class="support-layout">
    <section class="card support-pane" hidden><h3>Find help</h3><div class="support-guides">${s}</div><p class="muted">These are general guides, not an automated resolution or personalized AI answer.</p></section>
    <section class="card support-pane" id="support-contact"><h3>Contact support</h3><p class="muted"><strong>${e?"Submitted to the PIKK support queue.":"Saved on this device — support inbox coming soon."}</strong></p><p class="muted">Do not include passwords, payment card numbers, government IDs or confidential documents.</p>
     <form id="pikkSupportForm">
      <div class="field"><label for="pikkSupportTopic">Issue category *</label><select id="pikkSupportTopic" name="category">${yu.map(r=>`<option value="${l(r)}">${l(r)}</option>`).join("")}</select></div>
      <div class="field"><label for="pikkSupportSubject">Subject *</label><input id="pikkSupportSubject" name="subject" maxlength="120" minlength="4" required /></div>
      ${n}
      <div class="field"><label for="pikkSupportMessage">Describe the issue *</label><textarea id="pikkSupportMessage" name="message" minlength="10" maxlength="1500" required></textarea></div>
      <button class="btn primary" type="submit">${e?"Submit ticket to PIKK Support":"Save ticket draft locally"}</button>
     </form>
    </section>
   </div>
   ${o}
  </div>`,{lead:e?"Account-linked support tickets · PIKK support queue":"Local help preview · Ticket submission and AI agents are not yet live"})}function sy(e){var h,g;const t=io(),s=e.querySelector("#pikkSupportResults"),a=e.querySelector("#pikkSupportSearch"),i=e.querySelector("#pikkSupportClear"),n=e.querySelector("#pikkSupportSearchStatus"),o=e.querySelector("#pikkSupportRemoteHistory"),r=e.querySelector("#pikkSupportRemoteDetail"),c=v=>{const b=Yb(v);s.innerHTML=b.length?Su(b):t?'<p class="muted">No matching help yet. <a href="#/support?s=contact">Submit a support ticket</a> below.</p>':'<p class="muted">No matching help yet. <a href="#/support?s=contact">Prepare a local support draft</a> below.</p>',n&&(n.textContent=$u(b.length,v)),i&&(i.hidden=!String(v).trim())},d=async()=>{if(!(!t||!o))try{const v=await gt.listTickets();o.innerHTML=ey(v.tickets||[])}catch(v){o.innerHTML=(v==null?void 0:v.status)===401?'<p class="muted">Sign in from <a href="#/profile">Profile</a> to view submitted tickets.</p>':`<p class="muted">Could not load tickets: ${l(v.message||"Unknown error")}</p>`}};a==null||a.addEventListener("input",()=>c(a.value)),a==null||a.addEventListener("keydown",v=>{v.key==="Escape"&&a.value&&(v.preventDefault(),a.value="",c(""))}),i==null||i.addEventListener("click",()=>{a&&(a.value="",c(""),a.focus())});const u=()=>{var b,y;const v=e.querySelector("#pikkSupportTopic");v&&(v.value="Bug report"),(b=e.querySelector("#support-contact"))==null||b.scrollIntoView({block:"start"}),(y=e.querySelector("#pikkSupportSubject"))==null||y.focus()};(h=e.querySelector("[data-support-bug]"))==null||h.addEventListener("click",u);const p=new URLSearchParams(location.hash.split("?")[1]||"").get("s");p==="bug"?setTimeout(u,80):p&&setTimeout(()=>{var v;return(v=e.querySelector("#support-"+p))==null?void 0:v.scrollIntoView({block:"start"})},80),(g=e.querySelector("#pikkSupportForm"))==null||g.addEventListener("submit",async v=>{var y;v.preventDefault();const b=v.currentTarget;if(t){try{await gt.createTicket({category:b.elements.category.value,subject:b.elements.subject.value,message:b.elements.message.value}),f("Ticket submitted to PIKK Support"),b.reset(),await d(),(y=e.querySelector("#support-tickets"))==null||y.scrollIntoView({block:"start"})}catch(k){f((k==null?void 0:k.status)===401?"Sign in to submit a support ticket":k.message||"Could not submit ticket")}return}try{const k=Hb({category:b.elements.category.value,subject:b.elements.subject.value,contact:b.elements.contact.value,message:b.elements.message.value}),$=zb(window.localStorage,k).some(w=>w.id===k.id);f($?"Ticket draft saved locally · not sent":"An identical draft is already saved on this device · not sent"),location.hash==="#/support"&&(location.hash="#/support?updated=1"),window.dispatchEvent(new HashChangeEvent("hashchange"))}catch(k){f(k.message)}}),o==null||o.addEventListener("click",async v=>{const b=v.target.closest("[data-open-ticket]");if(!(!b||!r))try{const y=await gt.getTicket(b.dataset.openTicket);r.innerHTML=ml(y),r.scrollIntoView({block:"start"})}catch(y){f(y.message||"Could not open ticket")}}),r==null||r.addEventListener("submit",async v=>{if(v.target.id!=="pikkSupportReplyForm")return;v.preventDefault();const b=v.target,y=b.elements.message.value;try{await gt.reply(b.dataset.ticketId,y);const k=await gt.getTicket(b.dataset.ticketId);r.innerHTML=ml(k),await d(),f("Reply sent to PIKK Support")}catch(k){f(k.message||"Could not send reply")}}),e.querySelectorAll(".support-delete").forEach(v=>v.addEventListener("click",()=>{Wb(window.localStorage,v.dataset.id),f("Local ticket draft deleted"),window.dispatchEvent(new HashChangeEvent("hashchange"))})),t&&d()}const ay="https://pikk-api.pikk-0fa.workers.dev".trim().replace(/\/$/,"");function Eu(){return((typeof window<"u"&&typeof window.__PIKK_API_BASE__=="string"?window.__PIKK_API_BASE__.trim():"")||ay).replace(/\/$/,"")}const Mi=()=>!!Eu();async function Ct(e,t="GET",s){var o,r;const a=Eu();if(!a){const c=new Error("PIKK API is not configured");throw c.code="api_not_configured",c}const i=await fetch(a+e,{method:t,credentials:"include",headers:t==="GET"?void 0:{"Content-Type":"application/json"},body:t==="GET"?void 0:JSON.stringify(s||{})});let n=null;try{n=await i.json()}catch{}if(!i.ok){const c=new Error(((o=n==null?void 0:n.error)==null?void 0:o.message)||`Request failed (${i.status})`);throw c.code=((r=n==null?void 0:n.error)==null?void 0:r.code)||"request_failed",c.status=i.status,c}return n}const Li=Object.freeze({not_connected:{label:"Not available yet",text:"ID verification provider not connected yet. Dating and 18+ contests stay locked until it is."},not_started:{label:"Not started",text:"Verify you are 18+ with a government ID and a selfie through our verification partner. PIKK keeps only the result."},pending:{label:"Pending",text:"Your verification is in progress. This page updates once the provider sends a result."},needs_review:{label:"Under review",text:"Your verification needs a manual review by the provider."},verified:{label:"Verified 18+",text:"You are verified 18+."},declined:{label:"Declined",text:"Verification was not approved. Contact Support if you think this is a mistake."},expired:{label:"Expired",text:"Your verification session expired. Start again."},signin:{label:"Sign in required",text:"Sign in with a verified email to verify your age."}}),da={status:()=>Ct("/verification/age"),start:()=>Ct("/verification/age/start","POST"),consentText:()=>Ct("/verification/age/consent"),consent:({version:e,sha256:t,fullName:s})=>Ct("/verification/age/consent","POST",{agree:!0,version:e,sha256:t,full_name:s}),contestEligibility:e=>Ct(`/contests/${encodeURIComponent(e)}/eligibility`),submitEntry:(e,t,s=!1)=>Ct(`/contests/${encodeURIComponent(e)}/${s?"live":"entries"}`,"POST",{title:t}),getGender:()=>Ct("/account/gender"),setGender:e=>Ct("/account/gender","POST",{gender:e})};function mi(e){return(e==null?void 0:e.code)==="api_not_configured"||(e==null?void 0:e.code)==="provider_not_connected"?"not_connected":(e==null?void 0:e.status)===401||(e==null?void 0:e.code)==="email_unverified"?"signin":"not_connected"}function xu(e){try{const t=new URL(e);return t.protocol==="https:"?t.href:null}catch{return null}}function Au(e,t){return e===!0&&/\S+\s+\S+/.test(String(t||"").trim())&&String(t).trim().length>=3}const nr=Object.freeze(Object.defineProperty({__proto__:null,STATUS_COPY:Li,isVerificationApiConfigured:Mi,safeHostedUrl:xu,statusFromError:mi,validConsentSignature:Au,verificationApi:da},Symbol.toStringTag,{value:"Module"}));function Tu(e,t=""){const s=Li[e]||Li.not_connected,a=["not_started","declined","expired"].includes(e);return`<div class="card" id="verifyAgeCard" data-status="${l(e)}">
    <h3>Status: <span class="chip">${l(s.label)}</span></h3>
    <p>${l(s.text)}</p>${t}
    ${a?'<button type="button" class="btn primary" id="verifyAgeStart">Verify age / ID</button>':""}
    ${e==="signin"?'<a class="btn primary" href="#/profile">Sign in</a>':""}
    ${e==="verified"?'<a class="btn" href="#/dating">Go to Dating</a>':""}
  </div>`}function iy(){return M("Verify age / ID",`
    <div id="verifyAgeRoot">${Tu(Mi()?"pending":"not_connected",Mi()?'<p class="muted">Checking…</p>':"")}</div>
    <div class="card muted"><h3>Privacy</h3><p>Verification is done by an outside provider. PIKK stores only whether you are 18+, the method, the date and the provider reference. PIKK never stores your ID images or date of birth.</p></div>`,{lead:"Required for Dating and 18+ contests."})}async function ny(e){const t=e.querySelector("#verifyAgeRoot");if(!t||!Mi())return;const s=async n=>{let o;try{o=await da.consentText()}catch(p){return a(mi(p))}t.innerHTML=`<div class="card" id="bioConsent">
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
      </div></div>`;const r=t.querySelector("#bioAgree"),c=t.querySelector("#bioName"),d=t.querySelector("#bioSign"),u=()=>{d.disabled=!Au(r.checked,c.value)};r.addEventListener("change",u),c.addEventListener("input",u),d.addEventListener("click",async()=>{d.disabled=!0;try{await da.consent({version:o.version,sha256:o.sha256,fullName:c.value.trim()}),f("Consent recorded"),a(n,!0)}catch(p){f((p==null?void 0:p.message)||"Could not record consent"),u()}})},a=(n,o=!1)=>{var r;t.innerHTML=Tu(n),(r=t.querySelector("#verifyAgeStart"))==null||r.addEventListener("click",async c=>{if(c.target.disabled=!0,i&&!o)return s(n);try{const d=await da.start(),u=xu(d==null?void 0:d.hosted_url);if(!u)throw Object.assign(new Error("bad url"),{code:"provider_error"});window.location.assign(u)}catch(d){if((d==null?void 0:d.code)==="biometric_consent_required")return s(n);f((d==null?void 0:d.code)==="provider_not_connected"?Li.not_connected.text:"Could not start verification. Try again later."),a(mi(d)==="signin"?"signin":n)}})};let i=!0;try{const n=await da.status();i=(n==null?void 0:n.consent_required)!==!1,a((n==null?void 0:n.status)||"not_connected")}catch(n){a(mi(n))}}const ry="2026-11-02.draft1",oy=`PIKK Biometric Information Notice and Written Consent (DRAFT — lawyer review required)

1. What is collected. To verify that you are 18 or older, our vendor Persona Identities, Inc. ("Persona") collects a photo of your government ID and a selfie/liveness video, and creates face geometry (a biometric identifier) from them to compare your face with your ID photo.
2. Purpose. This is used only to verify your age (18+) and identity for PIKK Dating and as a contestant in 18+ contests. It is not used for advertising, profiling or any other purpose.
3. Who processes it. Persona processes this data as PIKK's vendor. PIKK itself never receives or stores your ID images, selfie, face geometry or date of birth. PIKK stores only: whether you are verified 18+, the method, the date and Persona's reference number.
4. Retention and destruction. Persona keeps the data only under the retention policy PIKK configures and destroys it when the verification purpose is satisfied, and in all cases no later than the earlier of (a) when the purpose is satisfied or (b) 3 years after your last interaction with PIKK (Illinois), or within the time required by Texas and Washington law, whichever is sooner. See the PIKK Biometric Retention Policy at #/biometric-policy.
5. No sale. PIKK and Persona will not sell, lease, trade or otherwise profit from your biometric data.
6. Your choice. You may decline. If you decline, you can still use PIKK, view and vote in contests, but you cannot use Dating or enter 18+ contests as a contestant.

By checking the box and typing your full legal name, you give written consent (electronic signature) to the collection, storage and use of your biometric identifiers and information as described above.`,ly=ry;function cy(){return M("Biometric Retention Policy",`<div class="card">
    <p class="chip">Draft · lawyer review required · v${ly}</p>
    <p class="muted" style="font-size:12px">Consent text SHA-256: <code id="consentHash">computing…</code></p>
    <h3>What is collected</h3><p>For 18+ age/identity verification only, our vendor Persona collects your government ID photo and a selfie/liveness capture and derives face geometry to match them.</p>
    <h3>What PIKK keeps</h3><p>PIKK stores no biometric identifiers or information: no ID images, selfies, face geometry or date of birth. PIKK keeps only the 18+ result, method, date, Persona's reference number and your signed consent record.</p>
    <h3>Retention and destruction</h3><p>Persona retains biometric data only under the retention policy PIKK configures and must destroy it when the initial purpose (age/identity verification) is satisfied, and in any case no later than 3 years after your last interaction with PIKK (Illinois 740 ILCS 14/15(a)), or sooner where Texas (Bus. &amp; Com. Code §503.001) or Washington (RCW 19.375) law requires.</p>
    <h3>No sale</h3><p>PIKK and Persona will not sell, lease, trade or otherwise profit from biometric data, and will not disclose it except as required by law.</p>
    <h3>Your choices</h3><p>Verification is optional. You may decline and still use PIKK, including watching and voting in contests. Questions or deletion requests: <a href="#/support">Support</a>.</p>
  </div>`,{lead:"Public policy for biometric data used in age verification."})}async function dy(e){var a;const t=e==null?void 0:e.querySelector("#consentHash");if(!t||!((a=globalThis.crypto)!=null&&a.subtle))return;const s=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(oy));t.textContent=[...new Uint8Array(s)].map(i=>i.toString(16).padStart(2,"0")).join("")}function uy(e=[]){return e.length?e.map(t=>`<button type="button" class="card support-staff-ticket" data-staff-ticket="${l(t.id)}">
    <div class="row wrap"><strong>${l(t.subject)}</strong><span class="chip">${l(t.status)}</span></div>
    <p class="muted" style="margin:5px 0">@${l(t.handle||"user")} · ${l(t.email||"")} · ${l(t.category)}</p>
    <small class="muted">${new Date(t.created_at).toLocaleString()}</small>
  </button>`).join(""):'<p class="muted">No support tickets in the queue.</p>'}function hl(e){const t=e==null?void 0:e.ticket,s=(e==null?void 0:e.messages)||[];return t?`<section class="card"><div class="row wrap"><h3 style="margin:0">${l(t.subject)}</h3><span class="chip">${l(t.status)}</span></div>
   <div class="support-thread" style="margin:12px 0">${s.map(a=>`<article class="support-thread-message ${a.is_staff?"is-staff":"is-user"}"><strong>${a.is_staff?"PIKK Support":"@"+l(a.handle||"user")}</strong><p>${l(a.body)}</p><small class="muted">${new Date(a.created_at).toLocaleString()}</small></article>`).join("")}</div>
   <form id="supportStaffReply" data-ticket-id="${l(t.id)}"><div class="field"><label for="supportStaffMessage">Staff reply</label><textarea id="supportStaffMessage" name="message" maxlength="5000" required></textarea></div><button class="btn primary" type="submit">Send support reply</button></form>
 </section>`:""}function py(){return io()?M("Support Staff Queue",'<section class="card"><p class="kicker">PIKK SUPPORT · STAFF ONLY</p><h2>Submitted ticket queue</h2><p class="muted">Requires a real backend <code>support_agent</code> or <code>admin</code> role. Unauthorized accounts cannot read this queue.</p></section><div class="grid-2 support-staff-layout"><section class="card"><h3>Queue</h3><div id="supportStaffQueue"><p class="muted">Loading queue…</p></div></section><div id="supportStaffDetail"></div></div>',{lead:"Persistent account-linked support tickets"}):M("Support Staff Queue",'<div class="card"><h3>Backend support queue unavailable</h3><p class="muted">The production PIKK API endpoint is not configured in this build.</p></div>')}function my(e){const t=e.querySelector("#supportStaffQueue"),s=e.querySelector("#supportStaffDetail");if(!t)return;const a=async()=>{try{const i=await gt.staffList();t.innerHTML=uy(i.tickets||[])}catch(i){t.innerHTML=(i==null?void 0:i.status)===403?'<p class="muted">Your account is signed in but does not have Support Staff permission.</p>':(i==null?void 0:i.status)===401?'<p class="muted">Sign in with a Support Staff account from <a href="#/profile">Profile</a>.</p>':`<p class="muted">Could not load staff queue: ${l((i==null?void 0:i.message)||"Unknown error")}</p>`}};t.addEventListener("click",async i=>{const n=i.target.closest("[data-staff-ticket]");if(!(!n||!s))try{const o=await gt.getTicket(n.dataset.staffTicket);s.innerHTML=hl(o),s.scrollIntoView({block:"start"})}catch(o){f((o==null?void 0:o.message)||"Could not open ticket")}}),s==null||s.addEventListener("submit",async i=>{if(i.target.id!=="supportStaffReply")return;i.preventDefault();const n=i.target,o=n.elements.message.value.trim();if(o)try{await gt.reply(n.dataset.ticketId,o);const r=await gt.getTicket(n.dataset.ticketId);s.innerHTML=hl(r),await a(),f("Support reply sent")}catch(r){f((r==null?void 0:r.message)||"Could not send support reply")}}),a()}const hy="https://pikk-api.pikk-0fa.workers.dev".trim().replace(/\/$/,"");function Cu(){return((typeof window<"u"&&typeof window.__PIKK_API_BASE__=="string"?window.__PIKK_API_BASE__.trim():"")||hy).replace(/\/$/,"")}function no(){return!!Cu()}async function ys(e,{method:t="GET",body:s}={}){var o,r,c;const a=Cu();if(!a){const d=new Error("PIKK API is not configured");throw d.code="api_not_configured",d}const i=await fetch(a+e,{method:t,credentials:"include",headers:s===void 0?void 0:{"Content-Type":"application/json"},body:s===void 0?void 0:JSON.stringify(s)});let n=null;try{n=await i.json()}catch{}if(!i.ok){const d=new Error(((o=n==null?void 0:n.error)==null?void 0:o.message)||`Request failed (${i.status})`);throw d.status=i.status,d.code=((r=n==null?void 0:n.error)==null?void 0:r.code)||"request_failed",d.details=((c=n==null?void 0:n.error)==null?void 0:c.details)||null,d}return n}const Rs={me:()=>ys("/auth/me"),publicProfile:e=>ys("/users/"+encodeURIComponent(String(e||"").replace(/^@/,""))),updateSignupRoles:e=>ys("/account/signup-roles",{method:"POST",body:{signup_roles:e}}),updateProfile:({displayName:e,bio:t,avatarUrl:s})=>ys("/account/profile",{method:"POST",body:{display_name:e,bio:t,avatar_url:s}}),listRoleReviews:(e="")=>ys("/admin/signup-roles"+(e?"?status="+encodeURIComponent(e):"")),reviewRole:({handle:e,role:t,status:s,reason:a})=>ys("/admin/signup-roles/review",{method:"POST",body:{handle:e,role:t,status:s,reason:a}})},fl=["","declared","pending_review","approved","rejected"];function fy(e=[]){return e.length?e.map(t=>`<article class="card creator-review-row" data-review-row="${l(t.handle)}:${l(t.role)}">
    <div class="row wrap"><strong>@${l(t.handle)} · ${l(t.role)}</strong><span class="chip">${l(t.status)}</span></div>
    <p class="muted" style="margin:6px 0">${l(t.display_name||"")} · ${l(t.email||"")} · declared ${new Date(t.declared_at).toLocaleString()}</p>
    <div class="field"><label>Review reason</label><input class="creator-review-reason" maxlength="500" placeholder="Required reason for status change" /></div>
    <div class="row wrap">
      <button class="btn ghost creator-review-action" data-handle="${l(t.handle)}" data-role="${l(t.role)}" data-status="pending_review">Pending review</button>
      <button class="btn primary creator-review-action" data-handle="${l(t.handle)}" data-role="${l(t.role)}" data-status="approved">Approve</button>
      <button class="btn ghost creator-review-action" data-handle="${l(t.handle)}" data-role="${l(t.role)}" data-status="rejected">Reject</button>
    </div>
  </article>`).join(""):'<p class="muted">No role declarations match this filter.</p>'}function gy(e){var a;if(!no())return M("Creator Role Review",'<div class="card"><h3>Backend review unavailable</h3><p class="muted">The production PIKK API endpoint is not configured in this build.</p></div>');const t=fl.includes(((a=e==null?void 0:e.query)==null?void 0:a.status)||"")&&e.query.status||"",s=fl.map(i=>`<a class="chip${t===i?" on":""}" href="#/creator-review${i?"?status="+i:""}">${i||"All"}</a>`).join("");return M("Creator Role Review",`
    <section class="card"><p class="kicker">PIKK ADMIN · CREATOR TOOLS</p><h2>Review declared account roles</h2>
      <p class="muted">Requires a real backend Admin role. Approval here changes the account role review status only; payout eligibility, identity/tax checks and other provider approvals remain separate.</p>
      <div class="row wrap">${s}</div>
    </section>
    <section id="creatorReviewQueue" data-filter="${l(t)}"><div class="card muted">Loading creator role declarations…</div></section>
  `,{lead:"Admin-only creator role review queue"})}function vy(e){const t=e.querySelector("#creatorReviewQueue");if(!t)return;const s=t.dataset.filter||"",a=async()=>{try{const i=await Rs.listRoleReviews(s);t.innerHTML=fy(i.roles||[])}catch(i){t.innerHTML=(i==null?void 0:i.status)===403?'<div class="card muted">Your signed-in account does not have Admin permission to review creator roles.</div>':(i==null?void 0:i.status)===401?'<div class="card muted">Sign in with an Admin account from <a href="#/profile">Profile</a>.</div>':`<div class="card muted">Could not load role reviews: ${l((i==null?void 0:i.message)||"Unknown error")}</div>`}};t.addEventListener("click",async i=>{var c,d;const n=i.target.closest(".creator-review-action");if(!n)return;const o=n.closest(".creator-review-row"),r=((d=(c=o==null?void 0:o.querySelector(".creator-review-reason"))==null?void 0:c.value)==null?void 0:d.trim())||"";if(r.length<3)return f("Enter a review reason");n.disabled=!0;try{await Rs.reviewRole({handle:n.dataset.handle,role:n.dataset.role,status:n.dataset.status,reason:r}),f("Role review saved"),await a()}catch(u){f((u==null?void 0:u.message)||"Could not save role review"),n.disabled=!1}}),a()}function by(){const t=`
    <div class="card merch-hero">
      <p class="kicker">Physical merch</p>
      <h2 style="margin:0 0 8px">Foreign X-Change</h2>
      <p class="muted">All orders, sizes, shipping, and payment happen on
        <a class="fx-link" href="https://foreignx-change.com" target="_blank" rel="noopener">foreignx-change.com</a>
        — not inside PIKK. Product links open the shop homepage until verified per-item URLs are provided.</p>
      <a class="btn primary" href="https://foreignx-change.com" target="_blank" rel="noopener">Visit Foreign X-Change</a>
      <p class="merch-note" style="margin-top:10px">Hats $30 · Tees $65 · Jackets $200 · prices exclude shipping</p>
    </div>
    <div class="merch-grid">${Re.map(s=>`
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
  `;return M("Merch",t,{lead:"Foreign X-Change showcase · 10 products · external checkout only"})}function yy(e){e.querySelectorAll(".shop-link").forEach(r=>{r.addEventListener("click",()=>{f("TEST MODE — opening Foreign X-Change")})});const t=e.querySelector("#merchLightbox"),s=t==null?void 0:t.querySelector("img"),a=t==null?void 0:t.querySelector(".merch-lightbox-close");let i=null;const n=r=>{var c,d;!t||!s||!a||(i=r,s.src=((c=r.querySelector("img"))==null?void 0:c.currentSrc)||r.dataset.zoom,s.alt=((d=r.querySelector("img"))==null?void 0:d.alt)||"Product preview",t.classList.add("show"),t.setAttribute("aria-hidden","false"),a.focus())},o=()=>{t!=null&&t.classList.contains("show")&&(t.classList.remove("show"),t.setAttribute("aria-hidden","true"),s==null||s.removeAttribute("src"),i!=null&&i.isConnected&&i.focus(),i=null)};e.querySelectorAll(".img-wrap").forEach(r=>{const c=()=>n(r);r.addEventListener("click",c),r.addEventListener("keydown",d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),c())})}),t==null||t.addEventListener("click",o),t==null||t.addEventListener("keydown",r=>{r.key==="Escape"?(r.preventDefault(),o()):r.key==="Tab"&&(r.preventDefault(),a==null||a.focus())})}const ky=Object.freeze(["female","male","nonbinary","undisclosed"]),Pu=Object.freeze({female:"Female",male:"Male",nonbinary:"Non-binary",undisclosed:"Prefer not to say"}),gl=()=>'<option value="">Choose…</option>'+ky.map(e=>`<option value="${e}">${Pu[e]}</option>`).join("");function Di(e,t=""){const s="#/profile/"+encodeURIComponent(String(e));return t==="public"?s+"?view=public":s}function Ze(e){U(e||"#/profile")}function vl(e){return e.avatar?`<img class="avatar" src="${l(e.avatar)}" alt="" style="object-fit:cover" />`:`<div class="avatar">${l((e.username||"?")[0].toUpperCase())}</div>`}function Xa(e,t){return t.length?`<div class="card"><h3>${l(e)}</h3>
    <ul class="list-plain">${t.map(s=>`<li><a href="${l(Di(s.id))}"><span>${l(s.username)}</span></a>
           <a class="chip" href="${l(Di(s.id))}">View</a></li>`).join("")}</ul></div>`:`<div class="card"><h3>${l(e)}</h3><p class="muted">None yet.</p></div>`}function wy(e){var g,v;const t=((g=e==null?void 0:e.parts)==null?void 0:g[1])||null,s=D(),a=Ie()&&s.user&&s.user.authSource!=="backend"?null:s.user,{posts:i}=s,n=!!(t&&a&&t===a.id&&((v=e==null?void 0:e.query)==null?void 0:v.view)==="public"),o=!!t&&(!a||t!==a.id);if(o||n){const b=ls(t);if(!b&&Ie()&&o)return M("Profile",`<section id="backendPublicProfile" data-handle="${l(t)}"><div class="card muted">Loading @${l(t)}…</div></section>`,{lead:"Persistent PIKK account profile"});if(!b)return M("Profile",`<div class="card muted">User not found.</div>
         <a class="btn" href="#/profile">Back</a>`);const y=i.filter(C=>C.userId===b.id),k=a&&!n&&(a.following||[]).includes(b.id),S=$o(b.id),$=Gn(b.id),w=`
      <section class="pikk-profile-cover" aria-label="Public PIKK profile">
        <div class="pikk-profile-cover-inner">
          <span class="pikk-profile-cover-kicker">${Ie()?"PIKK · LOCAL DEMO PROFILE":"PIKK · CREATOR PROFILE"}</span>
          ${vl(b)}
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
        ${y.length?y.map(C=>`<div style="padding:8px 0;border-bottom:1px solid var(--line)">
                      <div class="muted" style="font-size:11px">${new Date(C.at).toLocaleString()}</div>
                      ${l(C.text)}
                      ${C.image?`<img src="${l(C.image)}" alt="" style="margin-top:8px;border-radius:12px;max-height:200px;object-fit:cover;width:100%" />`:""}
                    </div>`).join(""):'<p class="muted">No posts yet.</p>'}
      </div>
      ${Xa("Followers",S)}
      ${Xa("Following",$)}
    `;return M(b.username,w)}if(!a)return M("Profile",`
      <section class="pikk-profile-guest-hero" aria-label="Join PIKK">
        <p class="kicker">PIKK · YOUR PROFILE</p>
        <h2>Your space. Your people. <span>One PIKK.</span></h2>
        <p>Create your PIKK account or sign in to follow creators, post, message and use account tools.</p>
        <span class="chip">${Ie()?"Backend account service connected":"Account service configuration pending"}</span>
      </section>
      <div class="card">
        <p class="kicker">PIKK account</p>
        <h3>Create account</h3>
        <div class="field"><label>Display name</label><input id="signupDisplay" autocomplete="name" maxlength="60" /></div>
        <div class="field"><label>Username</label><input id="signupHandle" autocomplete="username" maxlength="30" placeholder="3–30 letters, numbers or _" /></div>
        <div class="field"><label>Email</label><input id="signupEmail" type="email" autocomplete="email" /></div>
        <div class="field"><label>Password</label><input id="signupPassword" type="password" autocomplete="new-password" minlength="10" placeholder="10+ chars · a letter + a number" /></div>
        <div class="field"><label for="signupGender">Gender</label><select id="signupGender" required>${gl()}</select><small class="muted">Chosen once at signup and cannot be changed later.</small></div>
        <button class="btn primary block" id="signupAccountBtn">Create PIKK account</button>
      </div>
      <div class="card">
        <h3>Sign in</h3>
        <div class="field"><label>Email</label><input id="loginEmail" type="email" autocomplete="email" /></div>
        <div class="field"><label>Password</label><input id="loginPassword" type="password" autocomplete="current-password" /></div>
        <button class="btn primary block" id="loginAccountBtn">Sign in</button>
        <p style="margin:10px 0 0"><a class="muted" href="#/forgot-password">Forgot password?</a></p>
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
      </div>`,{lead:"Free PIKK fan profile · follow · posts · role apps · TEST MODE."});const r=i.filter(b=>b.userId===a.id),c=$o(a.id),d=Gn(a.id),u=a.memberships||{};let p=`
    <section class="pikk-profile-cover" aria-label="Your PIKK profile">
      <div class="pikk-profile-cover-inner">
        <span class="pikk-profile-cover-kicker">PIKK · MY PROFILE</span>
        ${vl(a)}
        <div>
          <h2 style="margin:0">${l(a.username)}</h2>
          <p class="muted" style="margin:4px 0 0">${l(a.bio)}</p>
          <span class="chip">${a.authSource==="backend"?a.emailVerified?"Backend account · email verified":"Backend account · verification pending":"Legacy demo account"}</span>
          ${Ie()?(()=>{const b=Vd(dn());return`<span class="chip" data-server-membership="chip"${b?"":" hidden"}>${l(b||"")}</span>`})():u.skeetPlus||u.backstage||u.innerCircle?`<span class="chip">${u.innerCircle?"Inner Circle":u.backstage?"Backstage":"PIKK+"}</span>`:""}
        </div>
      </div>
      <div class="stats pikk-profile-stats">
        <div><strong>${r.length}</strong><span>Posts</span></div>
        <div><strong>${(a.followers||[]).length}</strong><span>Followers</span></div>
        <div><strong>${(a.following||[]).length}</strong><span>Following</span></div>
      </div>
      <div class="row wrap pikk-profile-shortcuts">
        <a class="btn" href="#/posts">New post</a>
        <a class="btn" href="${l(Di(a.id,"public"))}">Public view</a>
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

    ${Xa("Followers",c)}
    ${Xa("Following",d)}

    <div class="card">
      <h3>Roles &amp; membership</h3>
      <p class="muted" style="margin:0 0 8px">Clipper campaigns, Live creator tools, brand ads, or PIKK+ / Backstage / Inner Circle for Vault access.</p>
      <a class="btn block" href="#/clippers">Apply as Clipper <span class="badge-cs badge-cs-inline">Coming Soon</span></a>
      <a class="btn block" href="#/signup" style="margin-top:8px">Other creator roles</a>
      <a class="btn block" href="#/music" style="margin-top:8px">Music &amp; Vault membership</a>
    </div>

    ${Oa()?`<div class="card">
      <h3>Demo Admin · DEV ONLY</h3>
      <p class="muted" style="font-size:12px">Sets <code>user.role='admin'</code> in localStorage <code>dbs_v1</code>. Dev builds without a backend only; real admin is staff-only.</p>
      <div class="row wrap" style="margin-top:8px">
        <span class="chip">${ee()?"role=admin":"role=fan"}</span>
        <button class="btn ${ee()?"ghost":"primary"}" id="toggleAdmin">${ee()?"Revoke admin":"Enable Demo Admin"}</button>
        <a class="btn" href="#/admin">Open Admin</a>
      </div>
    </div>`:""}
  `;const h=`<div class="card" id="accountGenderCard">
      <h3>Account gender</h3>
      <p id="accountGenderValue"><span class="chip">Loading…</span></p>
      <p class="muted" style="font-size:12px">Chosen at signup and saved on the PIKK server. It cannot be changed. If it was entered by mistake, contact <a href="#/support">Support</a>.</p>
      <div id="accountGenderLegacy" hidden>
        <p class="muted" style="font-size:12px">Your account was created before gender was asked at signup. You can set it once; it locks immediately.</p>
        <div class="row wrap" style="gap:8px"><select id="accountGender" aria-label="Account gender">${gl()}</select><button type="button" class="btn" id="saveAccountGender">Set once</button></div>
      </div></div>`;return p+=h,M("Profile",p)}function Sy(e){var s,a,i,n,o,r,c,d;const t=e.querySelector("#backendPublicProfile");if(t&&Ie()){const u=t.dataset.handle||"";Rs.publicProfile(u).then(p=>{var b,y,k;const h=p==null?void 0:p.user;if(!(h!=null&&h.handle))throw new Error("User not found");const g=h.avatar_url?`<img class="avatar" src="${l(h.avatar_url)}" alt="" style="object-fit:cover" />`:`<div class="avatar">${l((h.display_name||h.handle||"?")[0].toUpperCase())}</div>`,v=((b=D().user)==null?void 0:b.authSource)==="backend"&&((y=D().user)==null?void 0:y.handle)&&D().user.handle.toLowerCase()!==String(h.handle).toLowerCase();t.innerHTML=`
        <section class="pikk-profile-cover" aria-label="Public PIKK profile">
          <div class="pikk-profile-cover-inner">
            <span class="pikk-profile-cover-kicker">PIKK · PUBLIC PROFILE</span>
            ${g}
            <div>
              <h2 style="margin:0">${l(h.display_name||h.handle)}</h2>
              <p class="muted" style="margin:4px 0 0">@${l(h.handle)}</p>
              <p class="muted" style="margin:6px 0 0">${l(h.bio||"")}</p>
            </div>
          </div>
          <div class="row wrap pikk-profile-shortcuts">
            ${v?`<button type="button" class="btn primary" id="backendPubFollow" data-handle="${l(h.handle)}">Follow</button>`:""}
            <a class="btn" href="#/posts">Posts feed</a>
            <a class="btn ghost" href="#/messages?view=new&handle=${encodeURIComponent(h.handle)}">Message</a>
            <a class="btn ghost" href="#/profile">My profile</a>
          </div>
        </section>`,(k=e.querySelector("#backendPubFollow"))==null||k.addEventListener("click",async S=>{const $=S.currentTarget;try{const{postsApi:w}=await oi(async()=>{const{postsApi:C}=await Promise.resolve().then(()=>Bv);return{postsApi:C}},void 0);await w.follow($.dataset.handle),f("Following @"+$.dataset.handle),$.textContent="Following",$.disabled=!0}catch(w){f((w==null?void 0:w.code)==="email_unverified"?"Verify your email before following":(w==null?void 0:w.message)||"Could not follow")}})}).catch(p=>{t.innerHTML=`<div class="card muted">${l((p==null?void 0:p.status)===404?"User not found":(p==null?void 0:p.message)||"Could not load profile")}<br/><a class="btn" href="#/profile">Back</a></div>`})}if(oi(()=>Promise.resolve().then(()=>nr),void 0).then(async u=>{const p=e.querySelector("#accountGenderValue");if(p){if(!u.isVerificationApiConfigured()){p.innerHTML='<span class="chip">Account server not connected</span>';return}try{const h=await u.verificationApi.getGender();h!=null&&h.gender?p.innerHTML=`<span class="chip">${l(Pu[h.gender]||h.gender)} · locked</span>`:(p.innerHTML='<span class="chip">Not set</span>',e.querySelector("#accountGenderLegacy").hidden=!1)}catch{p.innerHTML='<span class="chip">Sign in to see</span>'}}}),(s=e.querySelector("#saveAccountGender"))==null||s.addEventListener("click",async()=>{var p;const u=(p=e.querySelector("#accountGender"))==null?void 0:p.value;if(u&&confirm("Gender can only be set once and cannot be changed. Continue?"))try{await(await oi(()=>Promise.resolve().then(()=>nr),void 0)).verificationApi.setGender(u),f("Saved · locked"),Ze("#/profile")}catch(h){f((h==null?void 0:h.code)==="gender_locked"?"Gender is locked. Contact Support if it was entered by mistake.":(h==null?void 0:h.code)==="api_not_configured"?"Account server not connected yet":(h==null?void 0:h.message)||"Could not save")}}),Ie()){const u=D().user;u&&u.authSource!=="backend"&&xs(),(!u||u.authSource==="backend")&&Ve.me().then(p=>{p!=null&&p.user&&(ws(p.user),di(p.user),Ai(),(!u||u.id!==p.user.id||!u.emailVerified==!p.user.email_verified)&&Ze("#/profile"))}).catch(p=>{if(Cs(),(p==null?void 0:p.status)===401&&(u==null?void 0:u.authSource)==="backend"){xs(),Ze("#/profile");return}(p==null?void 0:p.status)!==401&&console.warn("PIKK auth session check failed",p)})}(a=e.querySelector("#signupAccountBtn"))==null||a.addEventListener("click",async()=>{var p,h,g,v,b,y,k,S,$;const u=((p=e.querySelector("#signupGender"))==null?void 0:p.value)||"";if(!u){f("Choose your gender. It cannot be changed later.");return}try{const w=await Ve.signup({gender:u,displayName:(g=(h=e.querySelector("#signupDisplay"))==null?void 0:h.value)==null?void 0:g.trim(),handle:(b=(v=e.querySelector("#signupHandle"))==null?void 0:v.value)==null?void 0:b.trim(),email:(k=(y=e.querySelector("#signupEmail"))==null?void 0:y.value)==null?void 0:k.trim(),password:((S=e.querySelector("#signupPassword"))==null?void 0:S.value)||""});ws(w.user),di(w.user),f(($=w.user)!=null&&$.email_verified?"Account created":"Account created · email verification pending"),Ze("#/profile")}catch(w){f((w==null?void 0:w.message)||"Could not create account")}}),(i=e.querySelector("#loginAccountBtn"))==null||i.addEventListener("click",async()=>{var u,p,h;try{await Ve.login({email:(p=(u=e.querySelector("#loginEmail"))==null?void 0:u.value)==null?void 0:p.trim(),password:((h=e.querySelector("#loginPassword"))==null?void 0:h.value)||""});const g=await Ve.me();ws(g.user),di(g.user),Ai(),f("Signed in"),Ze("#/profile")}catch(g){f((g==null?void 0:g.message)||"Could not sign in")}}),(n=e.querySelector("#resendVerifyBtn"))==null||n.addEventListener("click",async()=>{var u;try{const p=await Ve.resendVerification(),h=(u=p==null?void 0:p.verification)==null?void 0:u.delivery;f(h==="email_sent"?"Verification email sent":h==="already_verified"?"Email is already verified":h==="email_provider_not_configured"?"Verification email service is not configured yet":h==="email_send_failed"?"Verification email could not be sent":"Verification request created")}catch(p){f((p==null?void 0:p.message)||"Could not resend verification email")}}),(o=e.querySelector("#signoutBtn"))==null||o.addEventListener("click",async()=>{try{await Ve.logout()}catch{}Cs(),xs(),f("Signed out"),Ze("#/profile")}),(r=e.querySelector("#saveProfile"))==null||r.addEventListener("click",async()=>{var v,b;const u=D().user,p=((v=e.querySelector("#editBio"))==null?void 0:v.value)||"",h=((b=e.querySelector("#editAvatar"))==null?void 0:b.value)||"";if((u==null?void 0:u.authSource)==="backend"&&Ie()){try{const y=await Rs.updateProfile({displayName:u.username||u.handle,bio:p,avatarUrl:h});ws(y.user),f("Profile saved to PIKK"),Ze("#/profile")}catch(y){f((y==null?void 0:y.message)||"Could not save profile")}return}if(yp({bio:p,avatar:h}).error)return f("Sign in required");f("Profile saved locally"),Ze("#/profile")}),(c=e.querySelector("#pubFollow"))==null||c.addEventListener("click",u=>{const p=u.currentTarget,h=p.dataset.uid,g=p.dataset.on==="1";if((g?Ui(h):Fi(h)).error)return f("Sign in to follow");f(g?"Unfollowed":"Following"),Ze(Di(h))}),(d=e.querySelector("#toggleAdmin"))==null||d.addEventListener("click",()=>{const u=!ee();if(Gi(u).error)return f("Sign in required");f(u?"Demo Admin enabled":"Admin revoked"),Ze("#/profile")})}const $y="https://pikk-api.pikk-0fa.workers.dev".trim().replace(/\/$/,"");function Iu(){return((typeof window<"u"&&typeof window.__PIKK_API_BASE__=="string"?window.__PIKK_API_BASE__.trim():"")||$y).replace(/\/$/,"")}function Ey(){return!!Iu()}const xy=Object.freeze(["user","post","message","live","room","listing","dating_profile","roast"]),ro=Object.freeze(["csam","ncii","self_harm","threat","underage","harassment","hate","sexual","violence","impersonation","fraud","copyright","spam","other"]),Ay="Saved on this device only (demo). Not sent to PIKK moderators.",Ty="Hidden on this device only (demo). This does not block them across PIKK.";async function On(e,{method:t="GET",body:s}={}){var o,r;const a=Iu();if(!a){const c=new Error("PIKK API is not configured");throw c.code="api_not_configured",c}const i=await fetch(a+e,{method:t,credentials:"include",headers:s===void 0?void 0:{"Content-Type":"application/json"},body:s===void 0?void 0:JSON.stringify(s)});let n=null;try{n=await i.json()}catch{}if(!i.ok){const c=new Error(((o=n==null?void 0:n.error)==null?void 0:o.message)||`Request failed (${i.status})`);throw c.code=((r=n==null?void 0:n.error)==null?void 0:r.code)||"request_failed",c.status=i.status,c}return n}function Cy({targetType:e,targetId:t,category:s,details:a}={}){return xy.includes(e)?!t||String(t).length>64?"invalid_target_id":ro.includes(s)?a!=null&&String(a).length>2e3?"details_too_long":null:"invalid_category":"invalid_target_type"}const bl={report:({targetType:e,targetId:t,category:s,details:a})=>{const i=Cy({targetType:e,targetId:t,category:s,details:a});if(i)return Promise.reject(Object.assign(new Error(i),{code:"validation_failed"}));const n={target_type:e,target_id:String(t),category:s};return a&&(n.details=String(a)),On("/reports",{method:"POST",body:n})},block:e=>On("/blocks",{method:"POST",body:{handle:String(e||"").replace(/^@/,"")}}),listReports:()=>On("/reports")};function yl(e){switch(e==null?void 0:e.code){case"duplicate_report":return"You already have an open report on this.";case"rate_limited":return"Too many reports right now. Try again later.";case"email_unverified":return"Verify your email before reporting or blocking.";case"unauthenticated":return"Sign in to report or block.";default:return(e==null?void 0:e.message)||"Something went wrong."}}const Py=/^[A-Za-z0-9_]{3,30}$/;function vn(e){const t=String(e||"").trim().replace(/^@/,"");return Py.test(t)?t:""}function Iy(e){var t;return!!vn(e)&&Ey()&&((t=D().user)==null?void 0:t.authSource)==="backend"}const My={csam:"Child sexual abuse material",ncii:"Non-consensual intimate imagery",self_harm:"Self-harm",threat:"Threat",underage:"Underage user",harassment:"Harassment",hate:"Hate",sexual:"Sexual content",violence:"Violence",impersonation:"Impersonation",fraud:"Fraud / scam",copyright:"Copyright",spam:"Spam",other:"Other"},kl="Choose a report category first.";function oo(e="data-report-category"){return`<select ${e} class="pikk-safety-tap" aria-label="Report category" required><option value="" selected>Report reason…</option>${ro.map(t=>`<option value="${t}">${My[t]||t}</option>`).join("")}</select>`}function Ly(e){return ro.includes(e)}function va(e,t,{notify:s=f,details:a="Reported from Messages",category:i=""}={}){const n=vn(t);if(e==="report"&&!Ly(i))return s(kl),Promise.resolve(kl);if(!Iy(n)){const r=e==="block"?"Blocked · "+Ty:"Reported · stub (Guidelines §13) · "+Ay;return s(r),Promise.resolve(r)}return(e==="block"?bl.block(n).then(()=>"Blocked across PIKK",r=>"Hidden here only — server block failed: "+yl(r)):bl.report({targetType:"user",targetId:n,category:i,details:a}).then(()=>"Report sent to PIKK moderators",r=>"Report not sent: "+yl(r))).then(r=>(s(r),r))}function Dy(e,{selfHandle:t=""}={}){const s=vn(e==null?void 0:e.handle);if(!s)return'<div class="card muted">User not found.</div>';const a=t&&t.toLowerCase()===s.toLowerCase();return`<section class="card pikk-server-user" data-server-user="${l(s)}">
    <h2 style="margin:0">${l(e.display_name||s)}</h2>
    <p class="muted" style="margin:4px 0">@${l(s)} <span class="chip">PIKK account</span></p>
    ${e.bio?`<p>${l(e.bio)}</p>`:""}
    ${a?"":`<div class="row wrap" style="gap:6px;margin-top:8px">
      <button type="button" class="btn primary" data-user-message="${l(s)}">Message</button>
      <button type="button" class="btn ghost pikk-safety-tap" data-user-flag="block" data-peer-handle="${l(s)}">Block</button>
      ${oo("data-report-category")}
      <button type="button" class="btn ghost danger pikk-safety-tap" data-user-flag="report" data-peer-handle="${l(s)}">Report</button>
    </div>`}
  </section>`}function _y(e){var s;const t=vn((s=e==null?void 0:e.query)==null?void 0:s.h);return mn()?D().user?t?M("Profile",`<div id="serverUserHost" data-handle="${l(t)}"><div class="card muted">Loading @${l(t)}…</div></div>`):M("Profile",'<div class="card muted">User not found.</div>'):M("Profile",'<div class="card"><a class="btn primary" href="#/profile">Sign in to view PIKK profiles</a></div>'):M("Profile",'<div class="card muted">PIKK user profiles need the PIKK server, which is not connected in this build.</div>')}function Oy(e){e.querySelectorAll("[data-user-flag]").forEach(t=>t.addEventListener("click",()=>{var s;return va(t.dataset.userFlag==="block"?"block":"report",t.dataset.peerHandle,{details:"Reported from profile",category:((s=e.querySelector("[data-report-category]"))==null?void 0:s.value)||""})})),e.querySelectorAll("[data-user-message]").forEach(t=>t.addEventListener("click",async()=>{try{const s=await Dt.start(t.dataset.userMessage);U("#/messages?t="+encodeURIComponent(s.conversation.id))}catch(s){f((s==null?void 0:s.code)==="email_unverified"?"Verify your email before starting messages":(s==null?void 0:s.message)||"Could not start conversation")}}))}async function qy(e){var s;const t=e.querySelector("#serverUserHost");if(t)try{const a=await Ue.user(t.dataset.handle);t.innerHTML=Dy(a.user,{selfHandle:((s=D().user)==null?void 0:s.handle)||""}),Oy(t)}catch(a){t.innerHTML=(a==null?void 0:a.status)===404?'<div class="card muted">User not found.</div>':`<div class="card muted">Could not load profile: ${l((a==null?void 0:a.message)||"Unknown error")}</div>`}}function Ry(e){var s;const t=((s=e==null?void 0:e.query)==null?void 0:s.token)||"";return t?Ie()?M("Verify email",`<div class="card" id="verifyEmailCard" data-token="${l(t)}"><h3>Verify your PIKK email</h3><p class="muted" id="verifyEmailStatus">Checking your verification link…</p><a class="btn" href="#/profile">Back to Profile</a></div>`):M("Verify email",'<div class="card"><h3>Account service not connected</h3><p class="muted">PIKK cannot verify this link until the production API endpoint is configured.</p><a class="btn" href="#/profile">Back to Profile</a></div>'):M("Verify email",'<div class="card"><h3>Verification link missing</h3><p class="muted">This verification link does not contain a token. Request a new verification email once email delivery is enabled.</p><a class="btn" href="#/profile">Back to Profile</a></div>')}function Ny(e){const t=e.querySelector("#verifyEmailCard");if(!t)return;const s=e.querySelector("#verifyEmailStatus"),a=t.dataset.token||"";Ve.verifyEmail(a).then(async()=>{try{const i=await Ve.me();i!=null&&i.user&&ws(i.user)}catch{}s&&(s.textContent="Email verified. Your PIKK account is ready.")}).catch(i=>{s&&(s.textContent=(i==null?void 0:i.message)||"This verification link is invalid or expired.")})}function By(){return Ie()?M("Reset password",`<div class="card">
      <p class="kicker">PIKK account</p>
      <h3>Forgot password</h3>
      <p class="muted">Enter your account email. If it matches a PIKK account, we send reset instructions. The response is the same either way.</p>
      <div class="field"><label for="forgotEmail">Email</label><input id="forgotEmail" type="email" autocomplete="email" /></div>
      <button class="btn primary block" id="forgotSubmit" type="button">Send reset link</button>
      <p class="muted" id="forgotStatus" style="margin:10px 0 0" hidden></p>
      <a class="btn ghost" href="#/profile" style="margin-top:12px">Back to Sign in</a>
    </div>`,{lead:"Secure password recovery"}):M("Reset password",'<div class="card"><h3>Account service not connected</h3><p class="muted">Password reset needs the PIKK API.</p><a class="btn" href="#/profile">Back to Profile</a></div>')}function Ky(e){var t;(t=e.querySelector("#forgotSubmit"))==null||t.addEventListener("click",async()=>{var i,n;const s=((n=(i=e.querySelector("#forgotEmail"))==null?void 0:i.value)==null?void 0:n.trim())||"",a=e.querySelector("#forgotStatus");try{const o=await Ve.forgotPassword(s);a&&(a.hidden=!1,a.textContent=(o==null?void 0:o.message)||"If an account exists for that email, password reset instructions were sent."),f("Request received")}catch(o){f((o==null?void 0:o.message)||"Could not start password reset")}})}function jy(){try{if(!String(location.hash||"").includes("token="))return;history.replaceState(null,"",`${location.pathname}${location.search}#/reset-password`)}catch{}}function Fy(e){var s;const t=((s=e==null?void 0:e.query)==null?void 0:s.token)||"";return t?Ie()?M("Reset password",`<div class="card" id="resetPasswordCard" data-token="${l(t)}">
      <p class="kicker">PIKK account</p>
      <h3>Choose a new password</h3>
      <div class="field"><label for="resetPasswordInput">New password</label><input id="resetPasswordInput" type="password" autocomplete="new-password" minlength="10" placeholder="10+ chars · a letter + a number" /></div>
      <button class="btn primary block" id="resetSubmit" type="button">Update password</button>
      <p class="muted" id="resetStatus" style="margin:10px 0 0" hidden></p>
    </div>`,{lead:"Secure password recovery"}):M("Reset password",'<div class="card"><h3>Account service not connected</h3><p class="muted">PIKK cannot reset this password until the API endpoint is configured.</p><a class="btn" href="#/profile">Back to Profile</a></div>'):M("Reset password",'<div class="card"><h3>Reset link missing</h3><p class="muted">This reset link does not contain a token. Request a new one from Profile.</p><a class="btn" href="#/forgot-password">Forgot password</a></div>')}function Uy(e){var a;const t=e.querySelector("#resetPasswordCard");if(!t)return;const s=t.dataset.token||"";t.removeAttribute("data-token"),jy(),(a=e.querySelector("#resetSubmit"))==null||a.addEventListener("click",async()=>{var o;const i=((o=e.querySelector("#resetPasswordInput"))==null?void 0:o.value)||"",n=e.querySelector("#resetStatus");try{const r=await Ve.resetPassword({token:s,password:i});Cs(),xs(),n&&(n.hidden=!1,n.textContent=(r==null?void 0:r.message)||"Password updated. Sign in with your new password."),f("Password updated"),setTimeout(()=>U("#/profile"),800)}catch(r){f((r==null?void 0:r.message)||"Could not reset password"),n&&(n.hidden=!1,n.textContent=(r==null?void 0:r.message)||"This reset link is invalid or expired.")}})}function wl(){U("#/clippers")}const Gy={pending:"Pending",approved:"Approved",rejected:"Rejected",waitlisted:"Waitlisted"};function Vy(){const{clipperApps:e,user:t}=D(),s=e.length,a=e.filter(o=>o.status==="approved").length,i=e.filter(o=>o.status==="pending").length,n=`
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
                <span class="chip">${l(Gy[o.status]||o.status)}</span>
                <span class="muted spacer" style="text-align:right">${G(o.at)}</span>
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
  `;return M("Clippers",n,{lead:"Apply → admin approve → paid campaigns & tracked links."})}function Hy(e){var t;(t=e.querySelector("#cSubmit"))==null||t.addEventListener("click",()=>{var i,n,o,r,c,d,u,p,h,g,v,b,y,k,S,$,w,C,P;const s=(n=(i=e.querySelector("#cName"))==null?void 0:i.value)==null?void 0:n.trim(),a=(r=(o=e.querySelector("#cEmail"))==null?void 0:o.value)==null?void 0:r.trim();if(!s||!a)return f("Name and email required");$p({name:s,email:a,age:(c=e.querySelector("#cAge"))==null?void 0:c.value,tiktok:(d=e.querySelector("#cTiktok"))==null?void 0:d.value,instagram:(u=e.querySelector("#cIg"))==null?void 0:u.value,youtube:(p=e.querySelector("#cYt"))==null?void 0:p.value,x:(h=e.querySelector("#cX"))==null?void 0:h.value,facebook:(g=e.querySelector("#cFb"))==null?void 0:g.value,followers:(v=e.querySelector("#cFollowers"))==null?void 0:v.value,views:(b=e.querySelector("#cViews"))==null?void 0:b.value,avgViews:(y=e.querySelector("#cAvgViews"))==null?void 0:y.value,engagement:(k=e.querySelector("#cEngage"))==null?void 0:k.value,frequency:(S=e.querySelector("#cFreq"))==null?void 0:S.value,niche:($=e.querySelector("#cNiche"))==null?void 0:$.value,samples:(w=e.querySelector("#cSamples"))==null?void 0:w.value,analyticsNotes:(C=e.querySelector("#cAnalytics"))==null?void 0:C.value,applicantUserId:((P=D().user)==null?void 0:P.id)||null}),f("Application saved for admin review"),wl()}),e.querySelectorAll(".clip-status").forEach(s=>{s.addEventListener("click",()=>{lc(s.dataset.id,s.dataset.status),f("Marked "+s.dataset.status),wl()})})}const zy={rose:"🌹","big-love":"💖","turn-up":"🔥","cash-rain":"💵","bottle-pop":"🍾","money-gun":"💸","diamond-drip":"💎","foreign-whip":"🚗",helicopter:"🚁","private-jet":"✈️","dbs-crown":"👑","dbs-universe":"🌌","battle-win":"✅","battle-crown":"👑","battle-vs":"⚔️","battle-fire":"🔥"},Wy={rose:"/gifts/rose.svg","big-love":"/gifts/big-love.svg","turn-up":"/gifts/turn-up.svg","cash-rain":"/gifts/cash-rain.svg","bottle-pop":"/gifts/bottle-pop.svg","money-gun":"/gifts/money-gun.svg","diamond-drip":"/gifts/diamond-drip.svg","foreign-whip":"/gifts/foreign-whip.svg",helicopter:"/gifts/helicopter.svg","private-jet":"/gifts/private-jet.svg","dbs-crown":"/gifts/dbs-crown.svg","dbs-universe":"/gifts/dbs-universe.svg","battle-win":"/gifts/battle-win.svg","battle-crown":"/gifts/battle-crown.svg","battle-vs":"/gifts/battle-vs.svg","battle-fire":"/gifts/battle-fire.svg"},Sl="gift-sticker";function Za(e){return String(e??"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}function Yy(e,t){return t&&typeof t=="object"&&t.className?t.className:`${Sl} ${Sl}--${e}`}function Da(e,t={}){const s=String(e||""),a=Yy(s||"unknown",t),i=zy[s]||"🎁",n=Wy[s]||null;return n?{src:n,className:a,emoji:i,html:`<img class="${Za(a)}" src="${Za(n)}" alt="" width="48" height="48" decoding="async" draggable="false" data-gift-slug="${Za(s)}" />`}:{src:null,className:a,emoji:i,html:`<span class="${Za(a)} gift-sticker--emoji" aria-hidden="true">${i}</span>`}}function jt(e,t){return Da(e,t&&typeof t=="object"&&typeof t!="function"?t:{}).html}const lo=Object.freeze([{id:"women",title:"Women's Rooms",icon:"💗",description:"Conversations, style, wellness, business and community",names:["Ladies Lounge","Girl Talk","Tea Time","What's the Word?","Who Did What?","Beauty Bar","Girls' Night In","Love & Standards","Boss Ladies","Fashion & Fits","Ladies Only Live","Women in Business","Women's Mental Wellness","Dating From Her Side","The Hustle Room: Women"]},{id:"men",title:"Men's Rooms",icon:"🫱🏻‍🫲🏿",description:"Brotherhood, relationships, business, wellness and hobbies",names:["The Man Cave","The Barbershop","Fellas' Night","Men's Corner","Men in Business","Cars & Motors","Fitness & Brotherhood","Fatherhood","Men's Mental Wellness","Dating From His Side","Sports Debate","Gaming Brotherhood","Men's Style","The Hustle Room","Brotherhood & Mentorship"]},{id:"coed",title:"Coed Communities",icon:"🌐",description:"Shared conversations, learning and networking for everyone",names:["Let's Talk","The Hangout","Business Connect & Wealth Academy","Couples Corner","Conspiracy Room","Game Room","Why Are You Single?","What Are You Looking For?","Single & Ready to Mingle","City Connect"]},{id:"dating",title:"Singles & Dating",icon:"💘",description:"Opt-in conversations, introductions and relationship topics",names:["Looking for My Match","The Flirt Zone","Speed Connections","Poly Connections","Date Night Live","Love & Advice"]},{id:"sports",title:"Sports",icon:"🏆",description:"A separate place for every major sport",names:["Sports Central","Basketball","Football","Soccer","Baseball","Hockey"]},{id:"talent",title:"Music & Talent",icon:"🎙️",description:"Rappers, singers, bands, producers and city competitions",names:["The Booth","Producer Room","The Stage","City Takeover"]},{id:"news",title:"News & Innovation",icon:"📰",description:"World events, markets and new ideas",names:["World News","Economy & Markets","Startups & Innovation","Tech Talk","Money Talk"]},{id:"general",title:"General Live",icon:"📡",description:"IRL, gaming, shows, comedy, food, fitness and more",names:["Just Chatting","Gaming","Music","IRL","Sports","Creative","Podcasts & Talk Shows","Food & Cooking","Fitness","Beauty & Fashion","Business & Money Talk","Dating & Connections","Education","News & Commentary","Comedy & Entertainment","Comedy & Roast Battles","Creator Spotlight"]}]);function Jy(e,t=""){if(e!=="channels")return"#/live?tab="+encodeURIComponent(e);const s=String(t||"").trim();return s?"#/live?tab=channels&category="+encodeURIComponent(s):"#/live"}function Qy(e,t){const s=new Map(e.map(c=>[c[0],c])),a=new Set,i=([c,d,u])=>{const p=c==="Comedy & Roast Battles",h=p?"#/roast-arena":"#/live?tab=channels&category="+encodeURIComponent(c),g=p?"Preview Roast Arena":"Browse channels",v=p?"preview Roast Arena (coming soon)":"browse channels";return'<a class="live-cat-card pikk-live-room-card" href="'+h+'" aria-label="'+t(c)+": "+v+'"><span class="pikk-live-room-emoji" aria-hidden="true">'+t(u)+"</span><strong>"+t(c)+'</strong><p class="muted">'+t(d)+'</p><span class="pikk-live-room-action">'+g+' <span aria-hidden="true">›</span></span></a>'},n=[...lo].sort((c,d)=>+(d.id==="general")-+(c.id==="general")).map(c=>{const d=c.names.map(u=>s.get(u)).filter(Boolean);return d.forEach(u=>a.add(u[0])),'<details class="pikk-live-directory-group" id="pikk-live-group-'+c.id+'"'+(c.id==="coed"||c.id==="general"?" open":"")+'><summary class="pikk-live-directory-summary"><span class="pikk-live-directory-icon" aria-hidden="true">'+c.icon+'</span><span class="pikk-live-directory-label"><strong>'+t(c.title)+"</strong><small>"+t(c.description)+'</small></span><span class="pikk-live-directory-count">'+d.length+' topics</span><span class="pikk-live-directory-chevron" aria-hidden="true">⌄</span></summary><div class="live-cat-cards pikk-live-directory-cards">'+d.map(i).join("")+"</div></details>"}),o=e.filter(c=>!a.has(c[0]));return o.length&&n.push('<details class="pikk-live-directory-group" open><summary class="pikk-live-directory-summary"><span class="pikk-live-directory-icon" aria-hidden="true">✨</span><span class="pikk-live-directory-label"><strong>More Live</strong><small>Additional topics</small></span><span class="pikk-live-directory-count">'+o.length+' topics</span><span class="pikk-live-directory-chevron" aria-hidden="true">⌄</span></summary><div class="live-cat-cards pikk-live-directory-cards">'+o.map(i).join("")+"</div></details>"),'<div class="pikk-live-directory" role="region" aria-label="Live category groups">'+('<div class="card pikk-live-room-search" style="margin-bottom:4px"><label for="liveRoomSearch"><strong>Find a Live topic</strong></label><div class="row wrap" style="gap:8px;margin-top:8px"><input id="liveRoomSearch" type="search" autocomplete="off" placeholder="Search '+e.length+' topics" aria-describedby="liveRoomSearchStatus" style="width:auto;flex:1 1 220px;min-width:0"><button type="button" id="liveRoomSearchClear" class="btn ghost" hidden style="display:none">Clear</button></div><p class="muted small" id="liveRoomSearchStatus" role="status" aria-live="polite">Browse '+e.length+" topics · these filter channels, not hosted rooms.</p></div>")+n.join("")+"</div>"}function Xy(e,t){return String(e).toLocaleLowerCase().includes(String(t).trim().toLocaleLowerCase())}function Zy(e){const t=e.querySelector("#liveRoomSearch"),s=e.querySelector("#liveRoomSearchClear"),a=e.querySelector("#liveRoomSearchStatus"),i=[...e.querySelectorAll(".pikk-live-directory-group")];if(!t||!s||!a||!i.length)return;let n=null;const o=()=>{const c=t.value.trim();c&&n===null&&(n=i.map(u=>u.open));let d=0;for(const u of i){let p=0;u.querySelectorAll(".pikk-live-room-card").forEach(g=>{var k,S;const v=((k=g.querySelector("strong"))==null?void 0:k.textContent)||"",b=((S=g.querySelector("p"))==null?void 0:S.textContent)||"",y=Xy(v+" "+b,c);g.style.display=y?"":"none",y&&p++}),u.style.display=!c||p?"":"none";const h=u.querySelector(".pikk-live-directory-count");if(h){const g=u.querySelectorAll(".pikk-live-room-card").length;h.textContent=c?p+" of "+g+" topics":g+" topics"}c&&p&&(u.open=!0),d+=p}!c&&n!==null&&(i.forEach((u,p)=>{u.open=n[p]}),n=null),s.hidden=!c,s.style.display=c?"":"none",a.textContent=c?d+" matching topic"+(d===1?"":"s")+" · channel discovery only.":"Browse "+d+" topics · these filter channels, not hosted rooms."},r=()=>{t.value="",o(),t.focus()};t.addEventListener("input",o),t.addEventListener("keydown",c=>{c.key==="Escape"&&t.value&&(c.preventDefault(),r())}),s.addEventListener("click",r),o()}const ek=3e4,tk=6e4,sk=Object.freeze([["rose",1],["turn-up",5],["diamond-drip",10]]),ua="Demo viewer (placeholder)";function $l({gifter:e,giftPts:t=1,now:s=Date.now()}){return{status:"open",gifter:String(e),giftPts:t,openedAt:s,expiresAt:s+ek,challenger:null}}function ak(e,t=Date.now()){return!!e&&e.status==="open"&&t<e.expiresAt}function El(e,t,s=Date.now()){return e?e.status!=="open"?{ok:!1,reason:"taken",window:e}:s>=e.expiresAt?{ok:!1,reason:"expired",window:{...e,status:"expired"}}:String(t)===e.gifter?{ok:!1,reason:"self",window:e}:{ok:!0,window:{...e,status:"accepted",challenger:String(t)},battle:ik(e.gifter,t,s,e.giftPts)}:{ok:!1,reason:"none"}}function ik(e,t,s=Date.now(),a=0){return{a:{name:String(e),total:a},b:{name:String(t),total:0},startedAt:s,endsAt:s+tk}}function Mu(e,t=Date.now()){return Math.max(0,e.endsAt-t)}function Ss(e,t=Date.now()){return Mu(e,t)===0}function nk(e,t,s,a=Date.now()){return Ss(e,a)||!["a","b"].includes(t)||!(s>0)?e:{...e,[t]:{...e[t],total:e[t].total+s}}}function co(e){if(e.a.total===e.b.total)return{result:"tie",name:null};const t=e.a.total>e.b.total?e.a:e.b;return{result:e.a.total>e.b.total?"a":"b",name:t.name}}function rk(e,t=!1){var n,o;const s=Math.max(0,Number((n=e==null?void 0:e.a)==null?void 0:n.total)||0),a=Math.max(0,Number((o=e==null?void 0:e.b)==null?void 0:o.total)||0),i=co(e);return!t||i.result==="tie"?{a:s,b:a,pot:s+a,winnerTakesAll:!!t&&i.result!=="tie",tie:i.result==="tie"}:i.result==="a"?{a:s+a,b:0,pot:s+a,winnerTakesAll:!0,tie:!1}:{a:0,b:s+a,pot:s+a,winnerTakesAll:!0,tie:!1}}const ok=24*36e5,lk=24*36e5,Lu=10,xl=()=>({results:[]});function ck(e,t,s=Date.now()){const a=co(t),i={a:t.a.name,b:t.b.name,aTotal:t.a.total,bTotal:t.b.total,winner:a.name,at:s};return{results:[...(e==null?void 0:e.results)||[],i].slice(-500)}}function bn(e,t,s=Date.now()){return((e==null?void 0:e.results)||[]).some(a=>a.winner===t&&s-a.at<ok&&s>=a.at)}function dk(e,t){let s=0,a=0,i=0;for(const n of(e==null?void 0:e.results)||[])n.a!==t&&n.b!==t||(n.winner?n.winner===t?s++:a++:i++);return{w:s,l:a,t:i}}const Al=e=>Math.floor(e/lk);function Du(e,t=Date.now()){const s=Al(t),a=new Map;for(const i of(e==null?void 0:e.results)||[]){if(!i.winner||Al(i.at)!==s)continue;const n=i.winner===i.a?i.aTotal:i.bTotal,o=a.get(i.winner)||{name:i.winner,gifts:0,wins:0};o.gifts+=n,o.wins+=1,a.set(i.winner,o)}return[...a.values()].sort((i,n)=>n.gifts-i.gifts||n.wins-i.wins||i.name.localeCompare(n.name)).map((i,n)=>({rank:n+1,...i}))}const uk=(e,t=Date.now())=>Du(e,t).slice(0,Lu);function pk(e){const t=e-1;return{col:Math.floor(t/2)+1,row:t%2+1}}const _u="pikk_gb_records_v1";function zs(){try{return JSON.parse(localStorage.getItem(_u))||xl()}catch{return xl()}}function mk(e){try{localStorage.setItem(_u,JSON.stringify(e))}catch{}}const ye=e=>String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function yn(e,t=zs(),s=Date.now()){const a=bn(t,e,s)?' <span class="pikk-gb-badge" title="Battle Winner · 24h · TEST MODE">🏆 Battle Winner</span>':"";return`<button type="button" class="pikk-gb-name" data-gb-name="${ye(e)}">${ye(e)}</button>${a}`}function Ou(e){return`<div class="pikk-gb-strip" data-gb-strip="${ye(e)}" hidden></div>`}function hk(e,t){const s=uk(e,t);if(!s.length)return"";const a=s.map(n=>{const o=pk(n.rank);return`<button type="button" class="pikk-gb-wchip" data-gb-open-list style="grid-column:${o.col};grid-row:${o.row}" aria-label="#${n.rank} ${ye(n.name)} ${n.gifts} gifts"><b>#${n.rank}</b> ${ye(n.name)}${bn(e,n.name,t)?" 🏆":""} <small>${n.gifts}</small></button>`}).join(""),i=Du(e,t).map(n=>`<li><b>#${n.rank}</b> ${yn(n.name,e,t)} · ${n.gifts} gifts (${n.wins} win${n.wins===1?"":"s"})</li>`).join("");return`<div class="pikk-gb-strip-grid" role="list" aria-label="Today's Battle Winners · top ${Lu}">${a}</div>
    <details class="pikk-gb-list"><summary>Today's Battle Winners · full list · TEST MODE (resets every 24h)</summary><ol class="list-plain">${i}</ol></details>`}function Tl(e){const t=zs(),s=Date.now();e.querySelectorAll("[data-gb-strip]").forEach(a=>{const i=hk(t,s);a.innerHTML=i,a.hidden=!i})}function fk(e,t){e._gbNames||(e._gbNames=!0,e.addEventListener("click",s=>{var i;const a=s.target.closest("[data-gb-name]");if(a){const n=dk(zs(),a.dataset.gbName);t(`${a.dataset.gbName} · Battle record ${n.w}-${n.l}${n.t?`-${n.t}`:""} (W-L${n.t?"-T":""}) · TEST MODE`);return}if(s.target.closest("[data-gb-open-list]")){const n=(i=s.target.closest("[data-gb-strip]"))==null?void 0:i.querySelector("details");n&&(n.open=!0)}}))}const qu=e=>{const t=Math.ceil(e/1e3);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`};function Ru(e){return`<div class="pikk-gb-controls row wrap" data-gb-controls="${ye(e)}" style="gap:6px">
    <button type="button" class="chip pikk-chip" data-gb-giftall="me">🎁 Send gift for all viewers · demo</button>
    <button type="button" class="chip pikk-chip" data-gb-giftall="demo">Demo: placeholder sends gift for all</button>
    <button type="button" class="chip pikk-chip pikk-gb-wta" data-gb-wta aria-pressed="false" title="Optional · TEST MODE demo coins only">🏆 Winner Takes All: Off <small>TEST MODE</small></button>
  </div>
  <details class="pikk-gb-how"><summary>How Gift Battles work</summary>${rr(e)}</details>
  <div class="pikk-gb" data-gb-slot="${ye(e)}" hidden aria-live="polite"></div>`}function gk(e,t,s){const a=e.gifter===t;return`<div class="pikk-gb-tab" role="status">
    <span>🎁 <strong>${ye(e.gifter)}</strong> sent a gift for all viewers</span>
    <button type="button" class="chip pikk-chip on" data-gb-accept>⚔️ Challenge to Gift Battle${a?` <small>(as ${ye(ua)})</small>`:""}</button>
    <span class="pikk-gb-timer">${qu(e.expiresAt-s)}</span>
    <small class="muted">${a?"Shown to other viewers for 30s · demo: tap to accept for the placeholder":"First tap wins · 30s"} · TEST MODE</small></div>`}function Cl(e,t,s){const a=e.a.total+e.b.total,i=a?Math.round(e.a.total/a*100):50,n=Ss(e,s),o=u=>yn(e[u].name),r=u=>sk.map(([p,h])=>`<button type="button" class="chip pikk-chip pikk-gb-gift" data-gb-side="${u}" data-gb-pts="${h}" aria-label="Gift +${h} for ${ye(e[u].name)} · TEST MODE">${Da(p,{className:"gift-sticker gift-sticker--sm"}).html}<small>+${h}</small></button>`).join(""),c=n?co(e):null,d=n?rk(e,e.wta):null;return`<div class="pikk-gb-head"><strong>⚔️ Gift Battle</strong> <span class="chip">TEST MODE · demo gifts · no charges</span>${e.wta?'<span class="chip pikk-gb-wta-on">🏆 Winner Takes All · TEST MODE</span>':""}<span class="pikk-gb-timer" data-gb-timer>${n?"Ended":qu(Mu(e,s))}</span></div>
    <div class="pikk-gb-bar" role="img" aria-label="${ye(e.a.name)} ${e.a.total} vs ${ye(e.b.name)} ${e.b.total}">
      <div class="pikk-gb-a" style="width:${i}%"><span>${o("a")} · ${e.a.total}</span></div>
      <div class="pikk-gb-b" style="width:${100-i}%"><span>${e.b.total} · ${o("b")}</span></div></div>
    ${n?`<p class="pikk-gb-winner" role="status">${Da("battle-win",{className:"gift-sticker gift-sticker--sm"}).html} <strong>${c.result==="tie"?"Tie":`${ye(c.name)} wins`}</strong> · ${e.a.total}–${e.b.total} · TEST MODE</p><p class="pikk-gb-payout muted" data-gb-payout>${d.winnerTakesAll?`Winner Takes All: ${ye(c.name)} receives all ${d.pot} demo coins`:`${d.tie&&e.wta?"Tie, so Winner Takes All does not apply: ":""}each side keeps its own: ${ye(e.a.name)} ${d.a} · ${ye(e.b.name)} ${d.b} demo coins`} · TEST MODE · no real money</p><button type="button" class="chip pikk-chip" data-gb-close>Close</button>`:`<div class="pikk-gb-gifts"><div>${r("a")}</div><div>${r("b")}</div></div><small class="muted">Totals change only by taps on this device · the placeholder side moves only when you tap it.</small>`}`}function vk(e,{me:t="You",toast:s=()=>{}}={}){fk(e,s),Tl(e),e.querySelectorAll("[data-gb-slot]").forEach(a=>{const i=e.querySelector(`[data-gb-controls="${a.dataset.gbSlot}"]`);if(!i)return;const n={w:null,b:null,t:null,wta:!1},o=()=>{const c=Date.now();if(n.b)a.innerHTML=Cl(n.b,t,c);else if(ak(n.w,c))a.innerHTML=gk(n.w,t,c);else{a.hidden=!0,a.innerHTML="",clearInterval(n.t);return}a.hidden=!1,n.b&&Ss(n.b,c)&&(clearInterval(n.t),n.b.recorded||(n.b={...n.b,recorded:!0},mk(ck(zs(),n.b,c)),Tl(e),a.innerHTML=Cl(n.b,t,c)))},r=()=>{clearInterval(n.t),n.t=setInterval(()=>document.body.contains(a)?o():clearInterval(n.t),1e3)};i.addEventListener("click",c=>{const d=c.target.closest("[data-gb-wta]");if(d){if(n.b&&!Ss(n.b))return s("Winner Takes All is set before a battle starts");n.wta=!n.wta,d.setAttribute("aria-pressed",String(n.wta)),d.classList.toggle("on",n.wta),d.innerHTML=`🏆 Winner Takes All: ${n.wta?"On":"Off"} <small>TEST MODE</small>`;return}const u=c.target.closest("[data-gb-giftall]");if(u){if(n.b&&!Ss(n.b))return s("A Gift Battle is already running");n.b=null,n.w=$l({gifter:u.dataset.gbGiftall==="me"?t:ua}),o(),r()}}),a.addEventListener("pikk-gb-challenge",c=>{var p;const d=String(((p=c.detail)==null?void 0:p.gifter)||ua);if(n.b&&!Ss(n.b))return s("A Gift Battle is already running");n.b=null,n.w=$l({gifter:d});const u=El(n.w,d===t?ua:t);n.w=u.window||n.w,u.ok&&(n.b=u.battle),o(),r()}),a.addEventListener("click",c=>{var u;if(c.target.closest("[data-gb-accept]")){const p=((u=n.w)==null?void 0:u.gifter)===t?ua:t,h=El(n.w,p);if(n.w=h.window||n.w,!h.ok)return s(h.reason==="expired"?"Challenge expired":"Someone already accepted");n.b={...h.battle,wta:!!n.wta},o(),r();return}const d=c.target.closest("[data-gb-side]");if(d&&n.b){n.b=nk(n.b,d.dataset.gbSide,Number(d.dataset.gbPts)),o();return}c.target.closest("[data-gb-close]")&&(n.b=null,n.w=null,o())})})}function bk(e,t){const s=e.querySelector("[data-gb-slot]");return s?(s.dispatchEvent(new CustomEvent("pikk-gb-challenge",{detail:{gifter:t}})),!0):!1}const yk=()=>{try{return!!JSON.parse(localStorage.getItem("dbs_v1")||"{}").user}catch{return!1}};function kk(){return`
    <div class="card pikk-sb-explainer" id="sbExplainer">
      <h3 style="margin:0 0 6px">Streamer Battles</h3>
      <ol class="gb-rules-list">
        <li>Two streamers go head to head on stage.</li>
        <li>The <strong>audience votes</strong>: one vote per viewer, and votes alone decide the winner.</li>
        <li>Support sent during a battle never changes the score.</li>
        <li>The winner wears the winner badge for 24 hours.</li>
      </ol>
      <p class="muted small">TEST MODE: demo only, no charges, votes count only on this device.</p>
      ${yk()?"":'<div class="row wrap" style="gap:8px;margin-top:10px"><a class="btn primary" href="#/profile" data-sb-signin>Sign in to vote</a></div>'}
    </div>`}function rr(e){return e!=="live"&&e!=="room"?kk():`
    <div class="card pikk-gb-explainer" id="gbExplainer">
      <h3 style="margin:0 0 6px">Gift Battles happen inside Live &amp; Group Rooms</h3>
      <ol class="gb-rules-list">
        <li>A viewer sends a gift <strong>for all viewers</strong>.</li>
        <li>Everyone else sees a <strong>Challenge to Gift Battle</strong> tab for <strong>30 seconds</strong>.</li>
        <li>The <strong>first</strong> viewer to tap it starts a <strong>60-second</strong> battle: the original gifter vs the challenger.</li>
        ${e==="live"||e==="room"?"<li><strong>Winner Takes All</strong> (optional toggle, off by default): the winner receives all of the battle’s gift coins; off, each side keeps its own. TEST MODE demo coins only, no real money.</li>":""}
        <li>Both send gifts — whoever sends more total wins. The compact battle bar never blocks the video, chat or reactions.</li>
      </ol>
      <p class="muted small">Gifts are voluntary support — not wagers, no prizes. TEST MODE: demo gifts only, no charges; totals count only taps on this device. Roast Battles are separate (Roast Arena).</p>
      <div class="row wrap" style="gap:8px;margin-top:10px">
        <a class="btn primary" href="#/live?tab=channels">Open Live</a>
        <a class="chip pikk-chip" href="#/live?tab=rooms">Group Rooms</a>
        <a class="chip pikk-chip" href="#/roast-arena">Roast Arena (separate)</a>
      </div>
    </div>`}const or=lo.find(e=>e.id==="general").names,Pl=lo.filter(e=>e.id!=="general"),wk=Object.freeze(["Video","Voice","Text"]),Sk=Object.freeze([[2,"2 min"],[5,"5 min"],[15,"15 min"],[30,"30 min"],[60,"1 hour"],[120,"2 hours"]]),$k=Object.freeze(["🔥","❤️","😂","👏","💯"]),Bt=e=>String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function Ek(){const e=or.map(t=>`<button type="button" class="chip pikk-chip pikk-golive-cat" role="radio" aria-checked="false" aria-pressed="false" data-golive-cat="${Bt(t)}">${Bt(t)}</button>`).join("");return`
      <fieldset class="field pikk-golive-cats" id="liveCategoryPick">
        <legend>Category <span class="muted">(pick exactly one · ${or.length} General Live)</span></legend>
        <div class="row wrap" role="radiogroup" aria-label="Go Live category" style="gap:6px">${e}</div>
        <input type="hidden" id="liveCategory" value="" />
      </fieldset>
      <fieldset class="field pikk-golive-perms" id="livePermissions">
        <legend>Permissions</legend>
        <label>Who can chat <select id="livePermChat"><option value="everyone">Everyone</option><option value="followers">Followers</option><option value="subscribers">Subscribers</option><option value="off">Chat off</option></select></label>
        <label>Guest requests <select id="livePermGuests"><option value="approve">Request · host approves</option><option value="off">Off</option></select></label>
        <label class="row" style="gap:6px"><input type="checkbox" id="livePermGifts" checked /> Allow gifts &amp; donations (demo coins)</label>
        <label class="row" style="gap:6px"><input type="checkbox" id="livePermReplay" /> Save replay (Coming soon)</label>
      </fieldset>`}function xk(e){const t=e.querySelector("#liveCategory");e.querySelectorAll(".pikk-golive-cat").forEach(s=>s.addEventListener("click",()=>{e.querySelectorAll(".pikk-golive-cat").forEach(a=>{const i=a===s;a.classList.toggle("on",i),a.setAttribute("aria-pressed",String(i)),a.setAttribute("aria-checked",String(i))}),t&&(t.value=s.dataset.goliveCat)}))}function Ak(e){var s,a,i,n,o;const t=((s=e.querySelector("#liveCategory"))==null?void 0:s.value)||"";return{category:or.includes(t)?t:"",permissions:{chat:((a=e.querySelector("#livePermChat"))==null?void 0:a.value)||"everyone",guests:((i=e.querySelector("#livePermGuests"))==null?void 0:i.value)||"approve",gifts:!!((n=e.querySelector("#livePermGifts"))!=null&&n.checked),replay:!!((o=e.querySelector("#livePermReplay"))!=null&&o.checked)}}}function Tk({user:e,goalHtml:t=""}={}){const s=Pl.map(o=>`<optgroup label="${Bt(o.title)} (${o.names.length})">${o.names.map(r=>`<option value="${Bt(r)}">${Bt(r)}</option>`).join("")}</optgroup>`).join(""),a=wk.map((o,r)=>`<button type="button" class="chip pikk-chip pikk-room-mode${r?"":" on"}" aria-pressed="${r?"false":"true"}" data-room-mode="${o}">${o}</button>`).join(""),i=$k.map(o=>`<button type="button" class="chip pikk-chip pikk-room-react" data-react="${o}" aria-label="React ${o}">${o}</button>`).join(""),n=Sk.map(([o,r])=>`<option value="${o}">${r}</option>`).join("");return`
    <div class="card live-disc-panel pikk-rooms" id="liveTabRooms" data-panel="rooms" data-test-mode>
      <div class="pikk-rooms-head"><h3 style="margin:0">Group Rooms</h3><span class="chip">TEST MODE</span></div>
      <p class="muted small">Pick a topic, then start a Video, Voice or Text session. Demo shell only — no camera or microphone is used and no real people join.</p>
      <div id="roomSetup">
        <label class="field">Topic (${Pl.reduce((o,r)=>o+r.names.length,0)} rooms)
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
        ${Ru("room")}
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
        ${Ou("room")}
        <div class="pikk-room-chat"><ul class="list-plain" id="roomChat" aria-label="Room chat"></ul>
          <form id="roomChatForm" class="row" style="gap:6px"><input id="roomChatInput" maxlength="200" placeholder="Message the room" style="flex:1" aria-label="Chat message" /><button class="btn" type="submit">Send</button></form></div>
        <button type="button" class="btn ghost" id="roomLeave">Leave Room</button>
        <p class="muted small">Safety: be respectful; Block / Report ends contact immediately. Real rooms launch only with moderation and age checks.</p>
      </section>
    </div>`}function Ck(e,{toast:t=()=>{},me:s=""}={}){const a=e.querySelector("#liveTabRooms");if(!a)return;const i=d=>a.querySelector(d),n={mode:"Video",msgs:0,reacts:0,hands:0,queue:[],open:!1,pinTimer:null},o=()=>{i("#roomActivity").textContent=`Demo-only activity (this device): 1 participant (you) · ${n.msgs} messages · ${n.reacts} reactions · ${n.hands} hand raises`},r=(d,u)=>{const p=document.createElement("li"),h=d==="You"?s||"You":d;d!=="System"&&bn(zs(),h)&&(p.className="pikk-gb-hl"),p.innerHTML=`<strong>${d==="System"?"System":yn(h)}:</strong> ${Bt(u)}`,i("#roomChat").appendChild(p)},c=()=>{i("#roomQueue").innerHTML=n.queue.length?n.queue.map((d,u)=>`<li class="row" style="gap:6px">✋ ${Bt(d)} <button type="button" class="chip pikk-chip" data-approve="${u}">Approve speaker</button></li>`).join(""):'<li class="muted small">No speaker requests yet.</li>',a.querySelectorAll("[data-approve]").forEach(d=>d.addEventListener("click",()=>{const u=n.queue.splice(+d.dataset.approve,1)[0];r("System",`${u} approved to speak (demo)`),c()}))};a.querySelectorAll(".pikk-room-mode").forEach(d=>d.addEventListener("click",()=>{n.mode=d.dataset.roomMode,a.querySelectorAll(".pikk-room-mode").forEach(u=>{const p=u===d;u.classList.toggle("on",p),u.setAttribute("aria-pressed",String(p))})})),i("#roomStart").addEventListener("click",()=>{const d=i("#roomTopic").value;if(!d)return t("Pick a topic first");i("#roomTitle").textContent=d,i("#roomModeChip").textContent=n.mode+(n.mode==="Text"?" chat":" (demo · no camera/mic)"),i("#roomStage").hidden=n.mode!=="Video",i("#roomVoice").hidden=n.mode!=="Voice",i("#roomSetup").hidden=!0,i("#roomShell").hidden=!1,r("System",`${n.mode} session started in ${d} · TEST MODE`)}),i("#roomRole").addEventListener("change",d=>{i("#roomHostTools").hidden=d.target.value!=="host"}),i("#roomChatForm").addEventListener("submit",d=>{d.preventDefault();const u=i("#roomChatInput").value.trim();u&&(r("You",u),n.msgs++,i("#roomChatInput").value="",o())}),a.querySelectorAll(".pikk-room-react").forEach(d=>d.addEventListener("click",()=>{n.reacts++,o()})),i("#roomRaiseHand").addEventListener("click",d=>{const u=d.currentTarget.getAttribute("aria-pressed")!=="true";d.currentTarget.setAttribute("aria-pressed",String(u)),d.currentTarget.classList.toggle("on",u),u?(n.hands++,n.queue.push("You")):n.queue=n.queue.filter(p=>p!=="You"),c(),o()}),i("#roomOpenMics").addEventListener("click",d=>{n.open=!n.open,d.currentTarget.setAttribute("aria-pressed",String(n.open)),d.currentTarget.classList.toggle("on",n.open),r("System",`Open microphones ${n.open?"on":"off"} (demo)`)}),a.querySelectorAll("[data-host-act]").forEach(d=>d.addEventListener("click",()=>{const u=d.dataset.hostAct;r("System",{cohost:"Open seat made co-host",mute:"Open seat muted",remove:"Open seat removed",block:"Open seat blocked & reported to moderation"}[u]+" (demo · no real user)")})),i("#roomPinBtn").addEventListener("click",()=>{const d=i("#roomPinText").value.trim();if(!d)return t("Write a thank-you first");const u=+i("#roomPinMins").value,p=Date.now()+u*6e4,h=i("#roomPinned");clearInterval(n.pinTimer);const g=()=>{const v=p-Date.now();if(v<=0||!document.body.contains(h)){h.hidden=!0,clearInterval(n.pinTimer);return}h.hidden=!1,h.innerHTML=`📌 <strong>Pinned thank-you</strong> · ${Bt(d)} <small>(${Math.ceil(v/6e4)} min left · TEST MODE)</small>`};g(),n.pinTimer=setInterval(g,15e3)}),i("#roomLeave").addEventListener("click",()=>{clearInterval(n.pinTimer),i("#roomShell").hidden=!0,i("#roomSetup").hidden=!1,i("#roomChat").innerHTML="",Object.assign(n,{msgs:0,reacts:0,hands:0,queue:[]}),c(),o(),t("You left the room")})}function Nu(){const e=(Ye().query||{}).tab;return e==="live"||e==="channels"?"channels":e==="following"||e==="categories"||e==="rooms"?e:"channels"}function $e(){var s;const e=Nu(),t=((s=Ye().query)==null?void 0:s.category)||"";U(Jy(e,t))}function Ee(e){return"$"+Number(e||0).toFixed(2)}function qt(e){const t=Number(e)||0;return t>=1e3?(t/1e3).toFixed(t>=1e4?0:1).replace(/\.0$/,"")+"K":String(t)}function Pk(e="live"){return`
    <nav class="live-cat-chips" aria-label="Live categories">
      ${[{id:"live",href:"#/live?tab=channels",label:"Live"},{id:"openmic",href:"#/openmic",label:"Open Mic / Talent Discovery (24/7)"},{id:"spotlight",href:"#/spotlight",label:"Spotlight (24/7)"},{id:"viral",href:"#/viral-live",label:"Viral Live · Preview"}].map(a=>{const i=a.id===e?" on":"",n=a.id===e?' aria-current="page"':"";return`<a class="live-cat-chip${i}" href="${a.href}"${n}>${l(a.label)}</a>`}).join("")}
    </nav>`}function Ik(e="channels"){return`
    <nav class="live-disc-tabs" aria-label="Live discovery">
      ${[{id:"following",href:"#/live?tab=following",label:"Following"},{id:"clips",href:"#/shorts",label:"Clips"},{id:"channels",href:"#/live?tab=channels",label:"Channels"},{id:"categories",href:"#/live?tab=categories",label:"Categories"},{id:"rooms",href:"#/live?tab=rooms",label:"Group Rooms"}].map(a=>{const i=a.id===e?" on":"",n=a.id===e?' aria-current="page"':"";return`<a class="live-disc-tab${i}" href="${a.href}" data-tab="${a.id}"${n}>${l(a.label)}</a>`}).join("")}
    </nav>`}function Bu(e={}){const t=Pc(),s=t.chipLabel||"House · Music Video",a=t.embed?yt(t.embed,"rel=0"):"",i=e.title||"House catalog · while stages are quiet";return`
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
    </div>`}function Mk(e){const t=e?Gn(e.id):[],s=new Set(t.map(o=>o.id)),a=Hs().filter(o=>s.has(o.hostId)),i=t.length?t.slice(0,12).map(o=>`<a class="chip" href="#/profile/${encodeURIComponent(o.id)}">${l("@"+(o.username||o.id))}</a>`).join(""):'<span class="muted">Nobody followed yet · DEMO</span>';let n;if(!e)n=`
      <p class="muted">Sign in to see lives from accounts you follow.</p>
      <a class="btn primary" href="#/profile">Demo profile</a>
      <p class="chip" style="margin-top:10px">TEST MODE · Following is local demo graph</p>`;else if(!a.length)n=`
      <p class="muted" style="margin:0 0 8px">
        None of the people you follow are live right now (demo filter on seeded Hot lives).
      </p>
      <div class="row wrap" style="gap:6px;margin-bottom:10px">${i}</div>
      <a class="btn ghost" href="#/live?tab=channels">Browse Live channels</a>
      <p class="chip" style="margin-top:10px">TEST MODE · not a scrape</p>
      ${Bu({title:"Meanwhile — DatBoiSkeet house catalog on 24/7 stages"})}`;else{const o=a.map(r=>`
        <article class="hot-live-card${r.house?" is-house":""}" data-live-id="${l(r.id)}">
          <div class="live-hoodie" aria-label="Live · ${l(qt(r.viewers))} watching (example data)">
            <span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span>
            <span class="live-hoodie-viewers">${l(qt(r.viewers))}</span><span class="chip pikk-example-tag" title="Example data · not real viewers">Example</span>
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
    </div>`}const Lk=[["The Booth","Rappers, freestyles, hip-hop performances and song previews","🎙️"],["The Stage","Singers, bands, vocalists and instrumental performances","🎤"],["City Takeover","City-versus-city showcases, performances and local pride challenges","🌆"],["Producer Room","Beat showcases, producer collaborations and beat competitions","🎹"],["Ladies Lounge","Women-centered girl talk, beauty, fashion, relationships and community","💅"],["Girl Talk","Everyday conversations, friendships and women’s discussions","💬"],["Tea Time","Celebrity gossip, trending stories and entertainment drama","🫖"],["Who Did What?","Viral moments, celebrity controversies and debates","👀"],["Boss Ladies","Women entrepreneurs, business networking and financial growth","👑"],["Fashion & Fits","Fashion, outfits and personal style","👗"],["Ladies Only Live","Women-centered livestreams and hosted events","🎥"],["What's the Word?","Entertainment news, celebrity conversations, viral moments and trending discussions","🗣️"],["Women in Business","Women entrepreneurs, founders, business networking and mentorship","👩‍💼"],["The Man Cave","Men’s social conversations, sports and community","🤝"],["Men in Business","Men’s entrepreneurship, networking, mentorship and partnerships","👔"],["Girls' Night In","Women-centered social nights, games and discussions","🌙"],["Beauty Bar","Beauty, hair, makeup and skincare conversations","💄"],["Love & Standards","Dating, relationships and boundaries","💗"],["Women's Mental Wellness","Women-centered stress, confidence, emotional wellbeing and peer support","🧠"],["Dating From Her Side","Women-centered dating experiences, relationships and personal standards","💞"],["The Hustle Room: Women","Women-centered side hustles, extra income ideas and building businesses","📈"],["The Barbershop","Men-centered everyday debates, conversation and community","💈"],["Fellas' Night","Men-centered social events and games","🌃"],["Men's Corner","Men-centered life, relationships and personal development","🧢"],["Cars & Motors","Cars, motorcycles, customization and auto culture","🚘"],["Fitness & Brotherhood","Fitness, wellbeing and peer support","💪"],["Fatherhood","Parenting, family responsibilities and raising children","👨‍👧"],["Men's Mental Wellness","Men-centered stress, wellbeing and peer support","🧠"],["Dating From His Side","Men-centered dating experiences and relationship advice","💬"],["Sports Debate","Sports arguments, player comparisons and predictions","🏅"],["Gaming Brotherhood","Gaming, tournaments and player communities","🎮"],["Men's Style","Fashion, grooming, watches and fragrances","⌚"],["The Hustle Room","Careers, side businesses and professional growth","📈"],["Brotherhood & Mentorship","Intergenerational mentoring and peer support","🤝"],["Sports Central","All-sports discussion, fan talk and analysis","🏆"],["Basketball","Basketball discussion and fan streams","🏀"],["Football","American football discussion and fan streams","🏈"],["Soccer","Soccer discussion and fan streams","⚽"],["Baseball","Baseball discussion and fan streams","⚾"],["Hockey","Hockey discussion and fan streams","🏒"],["Tech Talk","AI, gadgets, apps and technology","💻"],["Startups & Innovation","Building businesses, technology and new ideas","🚀"],["World News","International events and global news discussions","🌍"],["Economy & Markets","Inflation, housing, jobs, interest rates and markets","📈"],["Let's Talk","Open conversations, questions and community discussion","🗣️"],["The Hangout","Conversations and social live streams","💬"],["Creator Spotlight","Featured creators and emerging talent","🌟"],["Game Room","Gameplay, tournaments and community games","🎮"],["Why Are You Single?","Coed conversations about single life, dating experiences and relationship challenges","❓"],["What Are You Looking For?","Coed conversations about dating intentions, values and ideal partners","💭"],["Single & Ready to Mingle","Opt-in coed social conversations and introductions for singles","💘"],["Looking for My Match","Opt-in dating live conversations","❤️"],["The Flirt Zone","Dating and connection conversations","💕"],["Speed Connections","Fast-paced introductions and connections","⏱️"],["Poly Connections","Consensual nonmonogamy discussions and connections","🔗"],["Couples Corner","Couples-versus-couples games, trivia, partner challenges, friendly competitions and rematches","💞"],["Date Night Live","Live dating conversations and activities","🌹"],["Love & Advice","Relationship conversations and advice","💌"],["Business Connect & Wealth Academy","Coed business networking and beginner education in entrepreneurship, credit, stocks, crypto, real estate and Roth IRAs","💼"],["City Connect","Meet people by city for friendship, dating, business networking and local conversations","📍"],["Conspiracy Room","Open discussion of theories and claims","🧩"],["Money Talk","Stocks, housing, crypto and financial discussions","💰"],["Just Chatting","Conversations, Q&A and hanging out","💬"],["Gaming","Gameplay, tournaments and community games","🎮"],["Music","Artists, DJs, producers and listening sessions","🎵"],["IRL","Everyday life, travel and outdoor streams","🌎"],["Sports","Sports talk and watch-along discussions","🏀"],["Creative","Art, design, production and making things","🎨"],["Podcasts & Talk Shows","Interviews, panels and conversations","🎙️"],["Food & Cooking","Recipes, kitchens and food reviews","🍳"],["Fitness","Training, wellness and movement","💪"],["Beauty & Fashion","Style, hair, makeup and fashion","✨"],["Business & Money Talk","Entrepreneurs, careers and money discussions","💼"],["Dating & Connections","Opt-in conversations and dating live rooms","❤️"],["Education","Tutorials, learning and study sessions","📚"],["News & Commentary","Current events and opinions","📰"],["Comedy & Entertainment","Comedy, variety and entertainment","🎭"],["Comedy & Roast Battles","1v1, open mic and tournaments","🎤"]];function Dk(){return`
    <div class="card live-disc-panel" id="liveTabCategories" data-panel="categories">
      <div class="pikk-live-directory-hero">
        <span class="pikk-live-directory-kicker">PIKK LIVE · DISCOVER</span>
        <h3>Find your room.</h3>
        <p>Choose a community, explore a sport or find a conversation. Open a section to browse its topics.</p>
        <span class="pikk-live-directory-note">Discovery categories filter channels; a category is not a hosted room or a live stream. No active stream? You'll see an empty result.</span>
      </div>
      ${Qy(Lk,l)}
      <h3 style="margin:20px 0 8px">PIKK 24/7 Stages</h3>
      <div class="live-cat-cards">
        <a class="live-cat-card" href="#/openmic"><strong>Open Mic / Talent Discovery</strong><span class="chip">24/7 stage</span><p class="muted">Join the performance queue</p></a>
        <a class="live-cat-card" href="#/spotlight"><strong>Spotlight Live</strong><span class="chip">24/7 stage</span><p class="muted">Keep Going votes and creator performances</p></a>
        <a class="live-cat-card" href="#/shorts"><strong>Clips / Shorts</strong><span class="chip">Watch</span><p class="muted">Watch short videos</p></a>
        <a class="live-cat-card" href="#/viral-live"><strong>PIKK Viral Live</strong><span class="chip">Preview · not broadcasting</span><p class="muted">Explore the future 24/7 trending channel and original video sources</p></a>
      </div>
    </div>`}function _k(e){return e!=null&&e.spikedAt?Date.now()-Number(e.spikedAt)<15*60*1e3:!1}function Ok(e=""){const t=Hs();return`
    <div class="card hot-lives-rail" id="hotLivesRail">
      <div class="row wrap" style="justify-content:space-between;align-items:baseline;gap:8px">
        <h3 style="margin:0">Hot lives · Top streamers</h3>
        <span class="chip">score · viewers + engagement</span>
      </div>
      <p class="muted" style="margin:6px 0 10px;font-size:12px">TEST MODE · seeded demo · not third-party scrape · house + community</p>
      <div class="hot-lives-track">
        ${(e?t.filter(i=>String(i.category||"").toLowerCase()===e.toLowerCase()):t).map(i=>{const n=_k(i);return`
      <article class="hot-live-card${n?" is-hot":""}${i.house?" is-house":""}" data-live-id="${l(i.id)}">
        <div class="live-hoodie" aria-label="Live · ${l(qt(i.viewers))} watching (example data)">
          <span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span>
          <span class="live-hoodie-viewers" title="${l(qt(i.viewers))} watching · example">${l(qt(i.viewers))}</span><span class="chip pikk-example-tag" title="Example data · not real viewers">Example</span>
        </div>
        <div class="hot-live-body">
          <div class="hot-live-host">@${l(i.hostName)}</div>
          <div class="hot-live-title">${l(i.title)}</div>
          <div class="hot-live-chips">
            <span class="chip">${l(qt(i.viewers))} watching · Example</span>
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
    </div>`}function qk(e){const t=String(e||"queued");return t==="playing"?'<span class="chip live-chip">Playing</span>':t==="played"?'<span class="chip chip-ok">Played</span>':t==="skipped"?'<span class="chip">Skipped</span>':'<span class="chip">Queued</span>'}function De(e){const t=Number(e)||0;return t>=1e3?(t/1e3).toFixed(t%1e3===0?0:1).replace(/\.0$/,"")+"K":String(t)}function Rk(e,t){if(!e||e.endedAt)return"";const s=zi(),a=jp(),i=Fp(e.id).slice(0,12),n=a.map(d=>{const u=d.coins>=Bp,p=s>=d.coins;return`
      <button type="button" class="lg-gift" data-slug="${l(d.slug)}" data-coins="${d.coins}" data-confirm="${u?"1":"0"}" title="${l(d.animation)}">
        <span class="lg-gift-emoji">${jt(d.slug)}</span>
        <span class="lg-gift-name">${l(d.name)}</span>
        <span class="lg-gift-price">${l(De(d.coins))} · ${Ee(d.usd)}</span>
        ${p?'<span class="chip">Ready</span>':'<span class="chip">Need demo coins</span>'}
        ${u?'<span class="chip lg-confirm-chip">Confirm</span>':""}
      </button>`}).join(""),o=Vi.map(d=>`<button type="button" class="btn ghost lg-buy" data-coins="${d.coins}">${l(De(d.coins))} · ${Ee(d.usd)}</button>`).join(""),r=i.length?i.map(d=>`<li class="lg-hist-row">
            <span class="lg-hist-emoji">${jt(d.giftSlug)}</span>
            <span><strong>${l(d.giftName)}</strong> · @${l(d.fromUser)} · ${l(De(d.coins))} coins</span>
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
        <span class="chip">Coins ${l(De(s))} · TEST MODE</span>
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
    </div>`}function Nk(e,t){var c;if(!e||e.endedAt)return"";const s=!!(t&&e.hostId===t.id),a=Number(((c=D().wallet)==null?void 0:c.balance)||0),i=br(e.id),n=pc.map(d=>{const u=d.save>0?`<span class="chip chip-ok lsr-save">Save $${d.save}</span>`:"";return`
      <button type="button" class="lsr-pack" data-pack="${d.pack}" data-price="${d.price}" aria-pressed="false">
        <strong>${l(d.label)}</strong>
        <span class="lsr-pack-price">${Ee(d.price)}</span>
        ${u}
      </button>`}).join(""),o=i.length?i.map(d=>{const u=s?`<div class="row wrap lsr-host-acts" style="gap:6px">
                 ${d.status==="queued"||d.status==="playing"?`<button type="button" class="btn primary lsr-play" data-rid="${l(d.requestId)}" data-si="${d.songIndex}">${d.status==="playing"?"Mark played":"Play"}</button>
                        <button type="button" class="btn ghost lsr-skip" data-rid="${l(d.requestId)}" data-si="${d.songIndex}">Skip</button>`:""}
               </div>`:"";return`
          <li class="lsr-queue-row" data-status="${l(d.status)}">
            <div class="lsr-queue-main">
              <strong>${l(d.title)}</strong>
              <span class="muted" style="font-size:12px">@${l(d.username)} · ${l(String(d.pack))}‑pack</span>
            </div>
            ${qk(d.status)}
            ${u}
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
          <span class="chip">Wallet ${Ee(a)}</span>
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
    </div>`}function Bk(e){var o;const t=e.endedAt?Math.max(0,Math.floor((e.endedAt-e.startedAt)/1e3)):Math.max(0,Math.floor((Date.now()-e.startedAt)/1e3)),s=String(Math.floor(t/60)).padStart(2,"0"),a=String(t%60).padStart(2,"0"),i=e.endedAt?`<div class="live-stage-meta"><span class="chip">Ended · ${G(e.endedAt)}</span></div>`:`<div class="live-hoodie live-hoodie--stage" aria-label="Live demo · no real viewers">
          <span class="live-hoodie-pill"><span class="dot" aria-hidden="true"></span> LIVE</span>
          <span class="live-hoodie-viewers" id="liveViewers" title="TEST MODE demo stream">Demo · no real viewers</span>
        </div>
        <div class="live-stage-meta">
          <span class="chip">${s}:${a}</span>
        </div>`,n=(e.chat||[]).slice(-40).map(r=>`
      <div class="live-chat-row ${r.support?"support":""}${bn(zs(),r.username)?" pikk-gb-hl":""}">
        <strong>${yn(r.username)}</strong>
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
        <span class="chip">Tips ${Ee(e.tipsTotal)}</span>
        <span class="chip">Gifts ${Ee(e.giftsTotal||0)}</span>
        <span class="chip">Song reqs (see queue)</span>
        <span class="chip">Coins ${De(zi())}</span>
        <span class="chip">Wallet ${Ee(((o=D().wallet)==null?void 0:o.balance)||0)}</span>
      </div>

      ${e.endedAt?`<p class="muted" style="margin:10px 0 0">Stream ended. Start another below.</p>
             <button class="btn primary" id="liveRestart">New go-live</button>`:`<div class="row wrap" style="margin-top:10px;gap:8px">
               <button class="btn" id="liveTip" data-kind="tip" data-amt="1">Tip $1 · demo</button>
               <button class="btn ghost" id="liveFocusGifts">Gifts tray</button>
               <button class="btn ghost danger" id="liveEnd">End stream</button>
             </div>
             ${Ru("live")}`}
    </div>

    <div class="card live-chat-card">
      <h3>Live chat</h3>
      ${Ou("live")}
      <div class="live-chat" id="liveChat">${n||'<p class="muted">No messages yet.</p>'}</div>
      ${e.endedAt?"":`<div class="row" style="gap:8px;margin-top:10px">
               <input id="liveChatInput" placeholder="Say something…" maxlength="280" style="flex:1" />
               <button class="btn primary" id="liveChatSend">Send</button>
             </div>`}
    </div>
  `}function Kk(e){const t=Number(e==null?void 0:e.targetAmount)||0;return t<=0?0:Math.min(100,Math.round((Number(e.raised)||0)/t*100))}function jk(e){const t=Math.max(0,Number(e)-Date.now());if(t<=0)return"Ended · 24h window over";const s=Math.floor(t/36e5),a=Math.floor(t%36e5/6e4);return s>=1?`Resets in ${s}h ${a}m`:`Resets in ${a}m`}function Il(e,t){if(!e||e.endedAt)return"";const s=e.hostId,a=Hp(s),i=!!(t&&s&&t.id===s),n=zi();if(!a)return i?`
    <div class="card live-daily-goal" id="liveDailyGoal">
      <h3 style="margin:0 0 6px">Set today's Live goal</h3>
      <p class="muted" style="margin:0 0 10px;font-size:12px">Name + amount · 24h window · viewers can donate with coins · TEST MODE</p>
      <div class="field"><label for="liveGoalName">Goal name</label>
        <input id="liveGoalName" maxlength="80" placeholder="e.g. New merch drop fund" /></div>
      <div class="field"><label for="liveGoalAmt">Goal amount ($)</label>
        <input id="liveGoalAmt" type="number" min="1" step="1" placeholder="50" /></div>
      <button type="button" class="btn primary" id="liveGoalSave">Start 24h goal</button>
      <p class="chip" style="margin-top:10px">TEST MODE · demo coins only</p>
    </div>`:`
      <div class="card live-daily-goal" id="liveDailyGoal">
        <h3 style="margin:0 0 6px">Host daily goal</h3>
        <p class="muted" style="margin:0;font-size:12px">No goal set for this Live yet · TEST MODE</p>
      </div>`;const o=Kk(a),r=!!(a.completedAt||o>=100),c=o>=100?"Complete":o>=70?"Close":o>=30?"On the way":"Far",d=[50,100,250].map(p=>`<button type="button" class="btn ghost live-goal-donate" data-goal-id="${l(a.id)}" data-coins="${p}" title="≈ $${(p/50).toFixed(0)}">Donate ${p} coins</button>`).join(""),u=i?`<details class="live-goal-edit" style="margin-top:10px">
        <summary class="muted" style="cursor:pointer;font-size:12px">Edit goal (new 24h window)</summary>
        <div class="field" style="margin-top:8px"><label for="liveGoalName">Goal name</label>
          <input id="liveGoalName" maxlength="80" value="${l(a.name)}" /></div>
        <div class="field"><label for="liveGoalAmt">Goal amount ($)</label>
          <input id="liveGoalAmt" type="number" min="1" step="1" value="${l(String(a.targetAmount))}" /></div>
        <button type="button" class="btn" id="liveGoalSave">Save · reset 24h</button>
      </details>`:"";return`
    <div class="card live-daily-goal" id="liveDailyGoal">
      <div class="live-goal-head">
        <h3 style="margin:0">Daily goal · ${l(a.name)}</h3>
        <span class="chip${r?" chip-ok":""}">${r?"Goal met":l(c)}</span>
      </div>
      <p class="muted" style="margin:4px 0 8px;font-size:12px">${l(jk(a.endsAt))} · @${l(a.hostName||e.hostName)} · TEST MODE</p>
      <div class="live-goal-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${o}" aria-label="Goal progress">
        <div class="live-goal-fill" style="width:${o}%"></div>
      </div>
      <p class="live-goal-amounts" style="margin:8px 0 10px">
        <strong>${Ee(a.raised)}</strong> / ${Ee(a.targetAmount)}
        <span class="muted"> · ${o}%</span>
        <span class="chip" style="margin-left:8px">Coins ${l(De(n))}</span>
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
      ${u}
    </div>`}function Fk(e){return e?`
    <div class="card" id="live-go">
      <h3>Go live · TEST MODE</h3>
      <p class="muted">Fake stream UI with title, viewer stub, chat, tips, gifts (coins), and paid song requests. Persisted in localStorage (<code>dbs_v1.live</code> + <code>coins</code> + <code>liveGiftLedger</code> + <code>liveSongRequests</code>).</p>
      <div class="field"><label for="liveTitle">Stream title</label>
        <input id="liveTitle" maxlength="80" placeholder="e.g. Listening session · Long Story Short" value="PIKK Live · ${l(e.username)}" />
      </div>
      ${Ek()}
      <div class="field"><label for="liveGoalNameGo">Today's goal name <span class="muted">(optional)</span></label>
        <input id="liveGoalNameGo" maxlength="80" placeholder="e.g. Studio session fund" />
      </div>
      <div class="field"><label for="liveGoalAmtGo">Goal amount ($) <span class="muted">(optional)</span></label>
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
      </div>`}function Uk(e){return e.length?`
    <div class="card">
      <h3>Recent streams (this device)</h3>
      <ul class="list-plain">
        ${e.slice(0,8).map(t=>`<li>
              <span><strong>${l(t.title)}</strong><br/><span class="muted" style="font-size:12px">@${l(t.hostName)} · ${G(t.endedAt||t.startedAt)} · tips ${Ee(t.tipsTotal)}</span></span>
              <span class="chip">${t.endedAt?"Ended":"Live"}</span>
            </li>`).join("")}
      </ul>
    </div>`:""}function Gk(e){if(!e||e.endedAt)return"";const t=Up(10),s=t.length?t.map((r,c)=>{const d=jt(r.lastSlug||"rose",{className:"gift-sticker gift-sticker--xs"});return`<div class="live-obar-cell" title="${l(r.username)} · ${Ee(r.usd)} today">
            <span class="live-obar-rank">${c+1}</span>
            ${d}
            <span class="live-obar-name">${l(r.username)}</span>
          </div>`}).join(""):'<div class="live-obar-empty muted">No gifters yet today</div>',a=Or(10),i=a.length?a.map((r,c)=>{const d=jt("battle-win",{className:"gift-sticker gift-sticker--xs"});return`<div class="live-obar-cell" title="${l(r.username)} · rest of day">
            <span class="live-obar-rank">${c+1}</span>
            ${d}
            <span class="live-obar-name">${l(r.username)}</span>
          </div>`}).join(""):'<div class="live-obar-empty muted">No winners yet today</div>',n=br(e.id).find(r=>r.status==="playing");let o="";if(n){const r=n.title||"Song";o=`
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
    </div>`}function Vk(e){const t=$c();if(!t)return"";const s=jt(t.giftSlug||"rose",{className:"gift-sticker"}),i=e&&e.id===t.fromUserId?`<p class="muted" style="margin:8px 0 0;font-size:12px">You triggered this · others can Challenge you · TEST MODE</p>
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
    </div>`}function Hk(e){var i,n,o,r,c,d,u,p;_r();const t=Ms();if(!t||!e)return"";if(t.status==="active"||t.status==="ended"){const h=Math.max(0,Number(t.scoreA)||0),g=Math.max(0,Number(t.scoreB)||0),v=h+g,b=t.status==="active"?Math.max(0,Math.ceil((Number(t.endsAt)-Date.now())/1e3)):0,y=t.winnerName?"@"+l(t.winnerName):"Tie";return`
      <section class="card live-battle-scoreboard" aria-label="Live Gift Battle scoreboard">
        <div class="row wrap" style="justify-content:space-between;align-items:center">
          <strong>⚔️ PIKK Live Battle</strong>
          <span class="chip" id="liveBattleTimer" data-ends-at="${Number(t.endsAt)||0}">${t.status==="active"?b+"s left":"Finished"}</span>
        </div>
        <div class="row" style="justify-content:space-between;gap:12px;margin:12px 0">
          <div><strong>@${l(((i=t.challenger)==null?void 0:i.name)||"Challenger")}</strong><div>${qt(h)} demo points</div></div>
          <strong>VS</strong>
          <div style="text-align:right"><strong>@${l(((n=t.opponent)==null?void 0:n.name)||"Opponent")}</strong><div>${qt(g)} demo points</div></div>
        </div>
        <div class="live-battle-score-track" role="progressbar" aria-label="Challenger share of battle points" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${v?Math.round(h/v*100):50}" style="height:10px;background:var(--blue);border-radius:10px;overflow:hidden">
          <div style="width:${v?Math.round(h/v*100):50}%;height:100%;background:var(--acc)"></div>
        </div>
        ${t.status==="ended"?`<p class="live-battle-winner" style="font-weight:800;margin-top:10px">🏆 ${y} · Battle complete</p>`:'<p class="muted" style="margin-top:10px">Scores update with demo gifts · no real money</p>'}
        <a href="#/giftbattles" class="btn ghost" style="margin-top:8px">Battle details</a>
      </section>`}if(t.status!=="pending")return"";const s=((o=t.opponent)==null?void 0:o.id)===e.id,a=((r=t.challenger)==null?void 0:r.id)===e.id;return!s&&!a?`
      <div class="card live-gb-pending-note">
        <span class="chip">Pending battle</span>
        <span class="muted" style="margin-left:8px;font-size:12px">${l((c=t.challenger)==null?void 0:c.name)} vs ${l((d=t.opponent)==null?void 0:d.name)} · waiting</span>
      </div>`:s?`
      <div class="card live-gb-pending" id="liveGbPending">
        <strong>@${l((u=t.challenger)==null?void 0:u.name)}</strong> challenged you to a Gift Battle
        <div class="row wrap" style="gap:8px;margin-top:8px">
          <button type="button" class="btn primary" id="liveGbAccept">Accept · 60s</button>
          <button type="button" class="btn ghost" id="liveGbDecline">Decline</button>
        </div>
        <p class="chip" style="margin-top:8px">TEST MODE · recognition only</p>
      </div>`:`
    <div class="card live-gb-pending-note">
      <span class="chip">Waiting</span>
      <span class="muted" style="margin-left:8px;font-size:12px">Challenge sent to @${l((p=t.opponent)==null?void 0:p.name)}</span>
      <a class="btn ghost" href="#/giftbattles" style="margin-left:8px">Open Gift Battles</a>
    </div>`}function zk(){const e=Or(10);return e.length?`
    <div class="card live-gb-day" id="liveGbDayWinners">
      <h3 style="margin:0 0 6px">Gift Battle winners today</h3>
      <p class="muted" style="margin:0 0 8px;font-size:12px">Up to 10 · until end of day · TEST MODE</p>
      <ul class="live-gb-day-list">${e.map((s,a)=>`<li class="live-gb-day-row"><span class="live-gb-day-sticker">${jt("battle-win",{className:"gift-sticker gift-sticker--xs"})}</span><span class="chip">#${a+1}</span><strong>${l(s.username)}</strong></li>`).join("")}</ul>
    </div>`:""}function Wk(){var u;const{user:e,live:t}=D(),s=Dp(),a=t&&!t.endedAt,i=!!t,n=Nu(),o=((u=Ye().query)==null?void 0:u.category)||"";let c=`
    <div class="live-disc-panel" data-panel="channels">
      ${o?`<div class="card"><strong>Category: ${l(o)}</strong> <a class="btn ghost" href="#/live?tab=categories">All categories</a> <a class="btn ghost" href="#/live?tab=channels">All channels</a><p class="muted small">Only channels tagged with this category are shown below.</p></div>`:""}
      ${Ok(o)}
      ${o?"":zk()}
      ${a?"":Fk(e)}
      ${a?"":Bu({title:"No active Live on this device — house catalog on Spotlight / Open Mic"})}
      ${Uk(s)}
      <div class="card">
        <p class="muted" style="margin:0 0 8px">More Live tools</p>
        <div class="row wrap">
          <a class="btn ghost" href="#/connect#connect-multistream">Multi-platform go-live</a>
          <a class="btn ghost" href="#/multiguest">Multi-Guest</a>
          <a class="btn ghost" href="#/shorts">Shorts / Clips</a>
        </div>
        <p class="muted" style="margin:8px 0 0;font-size:12px">Open Mic + Spotlight are 24/7 categories (chips above). Clips live under Watch → Shorts / Clips. Gifts + song requests run during an active Live. Gift Battles is not promoted from this page.</p>
      </div>
    </div>`;n==="following"?c=Mk(e):n==="categories"?c=Dk():n==="rooms"&&(c=Tk({user:e,goalHtml:e&&!a?Il({hostId:e.id,hostName:e.username},e):e?'<p class="muted small">Your Live daily goal is shown above while you are live (TEST MODE).</p>':'<p class="muted small">Sign in to set a room donation goal (reuses the Live daily goal · TEST MODE).</p>'}));const d=`
    ${Ik(n)}
    ${Pk("live")}
    ${a?Gk(t):""}
    ${a?Vk(e):""}
    ${a?Hk(e):""}
    ${i?Bk(t):""}
    ${a?Il(t,e):""}
    ${a?Rk(t,e):""}
    ${a?Nk(t,e):""}
    ${c}
  `;return M("PIKK Live",d,{lead:"Following · Clips · Channels · Categories → Shorts · Request Spotlight · TEST MODE.",badge:a?"LIVE":void 0})}const lr=[];let qn=!1;function Yk(e,t){lr.push(t),Ku(e)}function Ku(e){if(qn)return;const t=e.querySelector("#liveGiftOverlay");if(!t){lr.length=0;return}const s=lr.shift();if(!s)return;qn=!0;const i=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches?900:s.tier==="cinematic"?4200:s.tier==="premium"?2800:1600;t.innerHTML=`
    <div class="lg-overlay-card lg-tier-${l(s.tier||"small")}" data-slug="${l(s.slug)}">
      <div class="lg-overlay-sticker">${jt(s.slug)}</div>
      <div class="lg-overlay-copy">
        <strong>${l(s.name)}</strong>
        <span>@${l(s.fromUser)} · ${l(De(s.coins))} coins</span>
        <span class="muted lg-overlay-brief">${l(s.animation||"")}</span>
      </div>
    </div>`,t.classList.add("is-on"),window.setTimeout(()=>{t.classList.remove("is-on"),t.innerHTML="",qn=!1,Ku(e)},i)}function Jk(e){e.querySelectorAll(".lg-buy").forEach(t=>{t.addEventListener("click",()=>{const s=mc(Number(t.dataset.coins));if((s==null?void 0:s.error)==="bad_package")return f("Unknown coin pack");if(s!=null&&s.error)return f(String(s.error));f(`+${De(s.pack.coins)} coins · ${Ee(s.pack.usd)} · TEST MODE`),$e()})}),e.querySelectorAll(".lg-gift").forEach(t=>{t.addEventListener("click",()=>{var r,c,d;const s=t.dataset.slug,a=t.dataset.confirm==="1",i=kr.find(u=>u.slug===s);if(!i)return f("Gift not found");if(a&&!window.confirm(`Send ${i.name} for ${De(i.coins)} coins (${Ee(i.usd)})?
TEST MODE · demo coins only`))return;const n=(r=D().live)==null?void 0:r.id,o=Gp({liveId:n,slug:s});if((o==null?void 0:o.error)==="signin")return f("Sign in first");if((o==null?void 0:o.error)==="offline")return f("Not live");if((o==null?void 0:o.error)==="insufficient")return f(`Need ${De(o.need)} coins — buy a pack below · TEST MODE`);if((o==null?void 0:o.error)==="bad_gift")return f("Unknown gift");if(o!=null&&o.error)return f(String(o.error));Yk(e,{slug:i.slug,name:i.name,coins:i.coins,tier:i.tier,animation:i.animation,fromUser:((c=o.entry)==null?void 0:c.fromUser)||((d=D().user)==null?void 0:d.username)||"you"}),f(`Sent ${i.name} · ${De(i.coins)} coins · TEST MODE`),window.setTimeout(()=>$e(),200)})})}function Qk(e){var o,r;const t=e.querySelector("#lsrPacks"),s=e.querySelector("#lsrTitleFields");if(!t||!s)return;let a=1;const i=()=>{const c=a,d=Array.from({length:c},(u,p)=>`<div class="field"><label>Song ${p+1}</label>
        <input class="lsr-title-input" data-i="${p}" maxlength="80" placeholder="Song title…" /></div>`).join("");s.innerHTML=d},n=c=>{a=Number(c)||1,t.querySelectorAll(".lsr-pack").forEach(d=>{const u=Number(d.dataset.pack)===a;d.classList.toggle("on",u),d.setAttribute("aria-pressed",u?"true":"false")}),i()};t.querySelectorAll(".lsr-pack").forEach(c=>{c.addEventListener("click",()=>n(c.dataset.pack))}),n(1),(o=e.querySelector("#lsrSeedWallet"))==null||o.addEventListener("click",()=>{Hn(50,"Song request demo credit · TEST MODE"),f("+$50 wallet demo · TEST MODE"),$e()}),(r=e.querySelector("#lsrSubmit"))==null||r.addEventListener("click",()=>{const c=Array.from(e.querySelectorAll(".lsr-title-input")).map(u=>u.value),d=Op({pack:a,titles:c});if((d==null?void 0:d.error)==="signin")return f("Sign in first");if((d==null?void 0:d.error)==="offline")return f("Not live");if((d==null?void 0:d.error)==="bad_pack")return f("Pick a pack");if((d==null?void 0:d.error)==="title_count")return f(`Enter ${d.need} song title${d.need>1?"s":""}`);if((d==null?void 0:d.error)==="insufficient")return f(`Need ${Ee(d.need)} — tap + $50 demo credit · TEST MODE`);if(d!=null&&d.error)return f(String(d.error));f(`Song request submitted · ${Ee(d.entry.price)} · TEST MODE`),$e()}),e.querySelectorAll(".lsr-play").forEach(c=>{c.addEventListener("click",()=>{var v;const d=c.dataset.rid,u=Number(c.dataset.si),h=br((v=D().live)==null?void 0:v.id).find(b=>b.requestId===d&&b.songIndex===u);let g;if((h==null?void 0:h.status)==="playing"){if(g=Np(d,u),(g==null?void 0:g.error)==="host_only")return f("Host only");if(g!=null&&g.error)return f(String(g.error));f("Marked played · TEST MODE")}else{if(g=qp(d,u),(g==null?void 0:g.error)==="host_only")return f("Host only");if(g!=null&&g.error)return f(String(g.error));f("Now playing · TEST MODE")}$e()})}),e.querySelectorAll(".lsr-skip").forEach(c=>{c.addEventListener("click",()=>{const d=Rp(c.dataset.rid,Number(c.dataset.si));if((d==null?void 0:d.error)==="host_only")return f("Host only");if(d!=null&&d.error)return f(String(d.error));f("Skipped · TEST MODE"),$e()})})}function Xk(e){e.addEventListener("click",t=>{var a,i;const s=$c();if(t.target.closest("#liveGbPopChallenge")){if(!s)return f("Challenge expired");const n=bk(e,s.fromUser);Lo(s.id),(a=e.querySelector("#liveGbChallengePop"))==null||a.remove(),n||f("Gift Battle runs on the Live stage · TEST MODE");return}t.target.closest("#liveGbPopDismiss")&&(Lo(s==null?void 0:s.id),(i=e.querySelector("#liveGbChallengePop"))==null||i.remove())})}function Zk(e){var s,a,i,n,o,r,c,d,u;Xk(e),Zy(e),e.querySelectorAll(".hot-live-watch").forEach(p=>{p.addEventListener("click",()=>{Tn();const h=p.dataset.host||"creator",g=p.dataset.id||"",v=e.querySelector(`.hot-live-card[data-live-id="${CSS.escape(g)}"]`);e.querySelectorAll(".hot-live-card.is-watching").forEach(b=>b.classList.remove("is-watching")),v==null||v.classList.add("is-watching"),f(`Watching @${h} · demo only`)})}),e.querySelectorAll(".hot-live-spike").forEach(p=>{p.addEventListener("click",()=>{var b;const h=p.dataset.id,g=kf(h);if((g==null?void 0:g.error)==="missing")return f("Live not found");if(g!=null&&g.error)return f(String(g.error));const v=((b=g.live)==null?void 0:b.hostName)||"creator";f(g.deduped?`Spike @${v} · Admin alert already open`:`Spike @${v} · Admin engagement alert queued`),$e()})}),xk(e),Ck(e,{toast:f,me:((s=D().user)==null?void 0:s.username)||"You"}),vk(e,{toast:f,me:((a=D().user)==null?void 0:a.username)||"You"}),(i=e.querySelector("#liveStart"))==null||i.addEventListener("click",()=>{var k,S,$,w,C,P;const p=(S=(k=e.querySelector("#liveTitle"))==null?void 0:k.value)==null?void 0:S.trim(),h=Ak(e);if(!h.category)return f("Pick one Go Live category");const g=((w=($=e.querySelector("#liveGoalNameGo"))==null?void 0:$.value)==null?void 0:w.trim())||"",v=((P=(C=e.querySelector("#liveGoalAmtGo"))==null?void 0:C.value)==null?void 0:P.trim())||"",b=Number(v);if(g&&!v)return f("Enter a goal amount ($)");if(v&&!g)return f("Enter a goal name");if(v&&(!Number.isFinite(b)||b<=0||!Number.isInteger(b)))return f("Enter a whole-dollar goal amount greater than zero");const y=Ao(p,h);if((y==null?void 0:y.error)==="signin")return f("Sign in first");if((y==null?void 0:y.error)==="already_live")return f("Already live");if(g&&v){const q=vc({name:g,targetAmount:b});(q==null?void 0:q.error)==="signin"?f("Sign in to set goal"):q!=null&&q.error?f("Goal not set · "+q.error):f(`Live goal set · ${b} · 24h · TEST MODE`)}Tn(),f("You are live · TEST MODE"),$e()}),(n=e.querySelector("#liveRestart"))==null||n.addEventListener("click",()=>{var g;const p="PIKK Live · "+(((g=D().user)==null?void 0:g.username)||"Demo"),h=Ao(p);if(h!=null&&h.error)return f(String(h.error));Tn(),f("Back live · TEST MODE"),$e()}),(o=e.querySelector("#liveEnd"))==null||o.addEventListener("click",()=>{Ip(),_d(),f("Stream ended"),$e()}),(r=e.querySelector("#liveTip"))==null||r.addEventListener("click",p=>{const h=p.currentTarget,g=Lp({kind:"tip",amount:Number(h.dataset.amt)||1});if((g==null?void 0:g.error)==="signin")return f("Sign in first");if((g==null?void 0:g.error)==="offline")return f("Not live");f("Tip sent · demo"),$e()});const t=()=>{var v;const p=e.querySelector("#liveChatInput"),h=(v=p==null?void 0:p.value)==null?void 0:v.trim();if(!h)return f("Type a message");const g=Mp(h);if((g==null?void 0:g.error)==="signin")return f("Sign in first");if((g==null?void 0:g.error)==="offline")return f("Not live");(g==null?void 0:g.error)!=="empty"&&(p&&(p.value=""),$e())};(c=e.querySelector("#liveChatSend"))==null||c.addEventListener("click",t),(d=e.querySelector("#liveChatInput"))==null||d.addEventListener("keydown",p=>{p.key==="Enter"&&t()}),(u=e.querySelector("#liveFocusGifts"))==null||u.addEventListener("click",()=>{var p;(p=e.querySelector("#liveGifts"))==null||p.scrollIntoView({behavior:"smooth",block:"start"})}),Jk(e),Qk(e),ew(e)}function ew(e){var a;(a=e.querySelector("#liveGoalSave"))==null||a.addEventListener("click",()=>{var r,c,d;const i=(c=(r=e.querySelector("#liveGoalName"))==null?void 0:r.value)==null?void 0:c.trim(),n=Number((d=e.querySelector("#liveGoalAmt"))==null?void 0:d.value),o=vc({name:i,targetAmount:n});if((o==null?void 0:o.error)==="signin")return f("Sign in first");if((o==null?void 0:o.error)==="bad_name")return f("Enter a goal name");if((o==null?void 0:o.error)==="bad_amount")return f("Enter a goal amount ($)");if(o!=null&&o.error)return f(String(o.error));f(`Goal live · $${o.goal.targetAmount} · 24h window · TEST MODE`),$e()});const t=e.querySelector("#liveGoalSupportMessage"),s=e.querySelector("#liveGoalSupportMessageCount");if(t&&s){const i=()=>{s.textContent=`${t.value.length} / 180`};t.addEventListener("input",i),i()}e.querySelectorAll(".live-goal-custom-form").forEach(i=>{i.addEventListener("submit",n=>{var c,d;n.preventDefault();const o=Number((c=i.querySelector(".live-goal-custom-coins"))==null?void 0:c.value);if(!Number.isSafeInteger(o)||o<1||o>1e6)return f("Enter 1–1,000,000 whole coins");const r=yi(i.dataset.goalId,o,{message:((d=e.querySelector("#liveGoalSupportMessage"))==null?void 0:d.value)||""});if((r==null?void 0:r.error)==="signin")return f("Sign in first");if((r==null?void 0:r.error)==="insufficient")return f("Not enough demo coins");if(r!=null&&r.error)return f("Donation unavailable · TEST MODE");f("Custom donation sent · TEST MODE"),$e()})}),e.querySelectorAll(".live-goal-donate").forEach(i=>{i.addEventListener("click",()=>{var d,u;const n=i.dataset.goalId,o=Number(i.dataset.coins),r=yi(n,o,{message:((d=e.querySelector("#liveGoalSupportMessage"))==null?void 0:d.value)||""});if((r==null?void 0:r.error)==="signin")return f("Sign in first");if((r==null?void 0:r.error)==="insufficient")return f(`Need ${De(r.need)} coins — buy a pack in Gifts · TEST MODE`);if((r==null?void 0:r.error)==="expired")return f("Goal ended · 24h window over");if((r==null?void 0:r.error)==="unknown_goal")return f("Goal not found");if((r==null?void 0:r.error)==="invalid_amount")return f("Pick a donate amount");if(r!=null&&r.error)return f(String(r.error));const c=((u=r.donated)==null?void 0:u.usd)??o/50;f(`Donated ${De(o)} coins ($${Number(c).toFixed(2)}) · TEST MODE`),$e()})})}const tw={BASE_URL:"/pikk-app/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_BASE:"/pikk-app/",VITE_BUILD_SHA:"df4128bd0318860677ad40ecf80c05ec05a8b361",VITE_PIKK_API_BASE:"https://pikk-api.pikk-0fa.workers.dev"};function sw(e=tw&&"/pikk-app/"||"/"){return String(e).replace(/\/?$/,"/")+"brand/pikk-logo-official.png"}const hi=fe.filter(e=>["dirty-money","93","no-love"].includes(e.id)).map(e=>({id:e.id,title:e.title,artist:"DatBoiSkeet",url:e.youtube,thumbnail:`https://i.ytimg.com/vi/${encodeURIComponent(new URL(e.youtube).searchParams.get("v"))}/hqdefault.jpg`})),Ml=[{id:"videos",label:"Videos"},{id:"clips",label:"Viral clips",browseHref:"#/shorts",browseLabel:"Browse existing PIKK Clips"},{id:"songs",label:"Songs",browseHref:"#/music",browseLabel:"Explore PIKK Music"},{id:"photos",label:"Photos",browseHref:"#/home",browseLabel:"Explore PIKK Home"}];function aw(){const e=hi[0],t=hi.map((s,a)=>`
    <button type="button" class="pikk-viral-choice${a===0?" is-selected":""}"
      data-viral-pick="${a}" aria-pressed="${a===0}">
      <span class="pikk-viral-choice-num">${String(a+1).padStart(2,"0")}</span>
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
        <div class="pikk-viral-hero-mark" aria-hidden="true"><img class="pikk-viral-hero-logo" src="${l(sw())}" alt="" decoding="async" loading="eager"></div>
      </section>

      <div class="pikk-viral-notice" role="status">
        <strong>PREVIEW · NOT BROADCASTING</strong>
        <span>Real-time viewer counts, live chat, engagement ranking and 24/7 playback are not connected. Nothing here is represented as live.</span>
      </div>

      <nav class="pikk-viral-tabs" aria-label="Viral Live content types" role="tablist">
        ${Ml.map((s,a)=>`<button type="button" role="tab" data-viral-type="${s.id}" aria-selected="${a===0}" tabindex="${a===0?0:-1}" aria-controls="viral-panel-${s.id}" id="viral-tab-${s.id}">${s.label}</button>`).join("")}
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
        <div class="pikk-viral-section-head"><h3>Up next · source library</h3><span>Manual preview · ${hi.length} existing music videos</span></div>
        <div class="pikk-viral-queue" id="pikkViralQueue" role="group" aria-label="Choose an original video source">${t}</div>
      </section>

      ${Ml.filter(s=>s.id!=="videos").map(s=>`
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
  `,{lead:"Discover the planned 24/7 viral channel · preview only"})}function iw(e){const t=e.querySelector("#pikkViralPreview");if(!t)return;t.querySelectorAll("[data-viral-pick]").forEach(n=>{n.addEventListener("click",()=>{const o=Number(n.dataset.viralPick),r=hi[o];r&&(t.querySelector("#pikkViralTitle").textContent=r.title,t.querySelector("#pikkViralCreator").textContent=r.artist+" · Watch from the original publisher",t.querySelector("#pikkViralSource").href=r.url,t.querySelector("#pikkViralThumbnail").src=r.thumbnail,t.querySelectorAll("[data-viral-pick]").forEach(c=>{const d=c===n;c.classList.toggle("is-selected",d),c.setAttribute("aria-pressed",String(d))}))})});const s=Array.from(t.querySelectorAll("[data-viral-pick]"));s.forEach((n,o)=>{n.addEventListener("keydown",r=>{if(!["ArrowRight","ArrowLeft","ArrowDown","ArrowUp","Home","End"].includes(r.key))return;r.preventDefault();const c=s.length-1,d=r.key==="Home"?0:r.key==="End"?c:(o+(["ArrowRight","ArrowDown"].includes(r.key)?1:-1)+s.length)%s.length,u=s[d];u.click(),u.focus(),u.scrollIntoView({block:"nearest",inline:"nearest"})})});const a=Array.from(t.querySelectorAll("[data-viral-type]"));function i(n,o=!1){const r=n.dataset.viralType;a.forEach(c=>{const d=c===n;c.setAttribute("aria-selected",String(d)),c.tabIndex=d?0:-1}),t.querySelectorAll("[data-viral-panel]").forEach(c=>{c.hidden=c.dataset.viralPanel!==r}),o&&(n.focus(),n.scrollIntoView({block:"nearest",inline:"nearest"}))}a.forEach((n,o)=>{n.addEventListener("click",()=>i(n)),n.addEventListener("keydown",r=>{if(!["ArrowRight","ArrowLeft","Home","End"].includes(r.key))return;r.preventDefault();const c=a.length-1,d=r.key==="Home"?0:r.key==="End"?c:(o+(r.key==="ArrowRight"?1:-1)+a.length)%a.length;i(a[d],!0)})})}function ea(){U("#/marketplace")}const nw={pending:"Pending",approved:"Approved",rejected:"Rejected"},rw=[{v:"sponsored_post",label:"Sponsored post"},{v:"livestream_promo",label:"Livestream promo"},{v:"affiliate",label:"Affiliate link"},{v:"storefront",label:"Product storefront"}];function ow(){const{brandApps:e,user:t}=D(),s=Jp(),a=s.filter(r=>r.active),i=a.length?a.map(r=>`
      <article class="card market-listing" data-id="${l(r.id)}">
        <div class="row wrap">
          <span class="chip">Sponsored</span>
          <span class="chip">${l(r.disclosure||"Paid partnership")}</span>
          <span class="muted spacer" style="text-align:right;font-size:12px">${G(r.at)}</span>
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
          <span class="chip">${l(nw[r.status]||r.status)}</span>
          <span class="muted spacer" style="text-align:right">${G(r.at)}</span>
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
          ${rw.map(r=>`<option value="${r.v}">${l(r.label)}</option>`).join("")}
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
  `;return M("Marketplace",o,{lead:"Brand applications & sponsored listings · localStorage demo."})}function lw(e){var t,s;(t=e.querySelector("#mSubmit"))==null||t.addEventListener("click",()=>{var i,n,o,r,c,d,u;const a=zp({brand:(i=e.querySelector("#mBrand"))==null?void 0:i.value,contact:(n=e.querySelector("#mContact"))==null?void 0:n.value,email:(o=e.querySelector("#mEmail"))==null?void 0:o.value,budget:(r=e.querySelector("#mBudget"))==null?void 0:r.value,campaign:(c=e.querySelector("#mCampaign"))==null?void 0:c.value,url:(d=e.querySelector("#mUrl"))==null?void 0:d.value,pitch:(u=e.querySelector("#mPitch"))==null?void 0:u.value});if((a==null?void 0:a.error)==="required")return f("Brand and email required");f("Application saved"),ea()}),e.querySelectorAll(".brand-status").forEach(a=>{a.addEventListener("click",()=>{Wp(a.dataset.id,a.dataset.status),f("Marked "+a.dataset.status),ea()})}),e.querySelectorAll(".brand-to-listing").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.brand||"Brand",n=Po({title:`${i} · sponsored`,brand:i,blurb:a.dataset.pitch||"Sponsored offer from approved brand application.",url:a.dataset.url||"",disclosure:"Paid partnership · TEST MODE",brandAppId:a.dataset.id});if(n!=null&&n.error)return f("Could not create listing");f("Listing published"),ea()})}),(s=e.querySelector("#lCreate"))==null||s.addEventListener("click",()=>{var i,n,o,r,c;const a=Po({title:(i=e.querySelector("#lTitle"))==null?void 0:i.value,brand:(n=e.querySelector("#lBrand"))==null?void 0:n.value,blurb:(o=e.querySelector("#lBlurb"))==null?void 0:o.value,url:(r=e.querySelector("#lUrl"))==null?void 0:r.value,disclosure:(c=e.querySelector("#lDisc"))==null?void 0:c.value});if((a==null?void 0:a.error)==="required")return f("Title and brand required");f("Listing published"),ea()}),e.querySelectorAll(".listing-toggle").forEach(a=>{a.addEventListener("click",()=>{Yp(a.dataset.id,a.dataset.active==="1"),f(a.dataset.active==="1"?"Listing shown":"Listing hidden"),ea()})})}function cw(e){const t=Array.isArray(e==null?void 0:e.messages)?e.messages:[],s=t.length?t[t.length-1]:null,a=String((e==null?void 0:e.peerName)||(e==null?void 0:e.peerId)||""),i=String((s==null?void 0:s.text)||"").slice(0,80);return`${a} ${i}`.toLowerCase()}function ju(e,t,s=!1){const a=Math.max(0,Math.trunc(Number(t)||0)),i=Math.min(a,Math.max(0,Math.trunc(Number(e)||0))),n=`conversation${a===1?"":"s"}`;return s?`Showing ${i} of ${a} ${n}`:`${a} ${n}`}function ue(e){U(e||"#/messages")}function dw(e){const t=e.messages||[];if(!t.length)return"No messages yet";const s=t[t.length-1];return(s.priority?"⚡ ":"")+(s.text||"").slice(0,80)}function uw(){return M("Messages",`<section class="pikk-msg-flow-hero" aria-label="PIKK messages sign-in">
      <span class="pikk-msg-flow-kicker">PIKK CONNECT · PRIVATE MESSAGES</span>
      <h2>Your conversations. <em>Your circle.</em></h2>
      <p>Try DMs, group conversations and the creator messages with a local demo account.</p>
      <span class="chip">TEST MODE · No server messaging</span>
    </section>
    <div class="card pikk-msg-flow-panel">
      <h3>Sign in required</h3>
      <p class="muted">Private DMs, team inbox, and group chats need a local demo account.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,{lead:"Private messaging & team inbox · TEST MODE"})}function pw(e){const t=$r(),s=t.filter(n=>ki(n)>0),a=D().messagePrefs||{allowDMs:!0,allowRequests:!0},i=t.map(n=>{const o=n.kind==="group",r=!o&&n.peerId==="dbs",c=[o?'<span class="chip">Group</span>':"",r?'<span class="chip">Team</span>':"",n.request?'<span class="chip">Request</span>':"",n.muted?'<span class="chip">Muted</span>':"",n.blocked?'<span class="chip">Blocked</span>':""].filter(Boolean).join(" "),d=ki(n),u=d?`<span class="chip msg-unread-chip" aria-label="${d} unread">${d}</span>`:"";return`
      <button type="button" class="msg-thread-row${d?" has-unread":""}" data-search="${l(cw(n))}" data-unread="${d>0}" data-open-thread="${l(n.id)}">
        <div class="pikk-msg-avatar" aria-hidden="true">${l(String(n.peerName||n.peerId||"?").slice(0,1).toUpperCase())}</div>
        <div class="pikk-msg-thread-body"><div class="msg-thread-top">
          <strong>${l(n.peerName||n.peerId)}</strong>
          <span class="muted">${l(G(n.updatedAt||0))}</span>
        </div>
        <div class="msg-thread-preview muted">${l(dw(n))}</div>
        <div class="msg-thread-chips">${u}${c}</div></div>
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
      <p id="pikkMsgResultCount" class="muted" role="status" aria-live="polite" aria-atomic="true" style="margin:8px 0 0;font-size:.875rem">${ju(t.length,t.length)}</p>
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
  `}function mw(){return`
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
    <section class="pikk-msg-contact-grid" aria-label="Available demo contacts">${qa().map(s=>{const a=s.team||yc(s.id),i=s.team?"Creator message":a?"Message":"Message request";return`
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
  `}function hw(){return`
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
  `}function fw(e,{teamPriorityHint:t=!1}={}){const s=D().user,a=e.kind==="group",i=!a&&e.peerId==="dbs",n=!!e.blocked,o=(e.messages||[]).map(d=>`
      <div class="msg-bubble ${d.from===(s==null?void 0:s.id)?"mine":""} ${d.priority?"priority":""}">
        <div class="msg-bubble-meta">
          <strong>${l(d.fromName||d.from)}</strong>
          ${d.priority?'<span class="chip priority-chip">Priority</span>':""}
          <span class="muted">${l(G(d.at))}</span>
        </div>
        <div class="msg-bubble-text">${l(d.text)}</div>
      </div>`).join(""),r=e.request?'<div class="msg-banner">Message request · recipient approval stub (demo still delivers locally)</div>':"",c=t?'<div class="msg-banner priority">Next send can use Priority $2.99 TEST MODE (wallet note only — not charged).</div>':"";return`
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
          ${a?"":oo("data-report-category")}
          <button type="button" class="btn ghost danger pikk-safety-tap" data-flag="report">Report</button>
        </div>
        ${!a&&!Sa(e)?'<p class="muted msg-device-only-note" style="font-size:12px;margin:6px 0 0">Demo contact · Report and Block save on this device only — not sent to PIKK moderators.</p>':""}
      </div>
    </div>
    ${r}
    ${c}
    <div class="card msg-thread-card pikk-msg-flow-panel">
      <div class="msg-thread" id="msgThread">${o||'<p class="muted">No messages yet — say hi.</p>'}</div>
      ${n?'<p class="muted" style="margin-top:10px">Thread blocked · composer disabled (demo).</p>':`<div class="msg-composer">
               <input id="msgInput" placeholder="${i?"Write an inquiry…":"Message…"}" maxlength="500" />
               <button type="button" class="btn primary" id="msgSend">Send</button>
               ${i?'<button type="button" class="btn" id="msgSendPriority" title="TEST MODE — not charged">Priority $2.99</button>':""}
             </div>`}
    </div>
  `}function gw(e=[]){return e.length?e.map(t=>{const s=t.peer_display_name||t.peer_handle||"PIKK user",a=t.last_message||"No messages yet",i=t.last_message_at||t.created_at;return`<button type="button" class="msg-thread-row persistent-msg-row" data-open-remote-thread="${l(t.id)}">
      <div class="pikk-msg-avatar" aria-hidden="true">${l(String(s).slice(0,1).toUpperCase())}</div>
      <div class="pikk-msg-thread-body">
        <div class="msg-thread-top"><strong>${l(s)}</strong><span class="muted">${i?l(G(Date.parse(i))):""}</span></div>
        <div class="msg-thread-preview muted">${l(a.slice(0,100))}</div>
        <div class="msg-thread-chips"><span class="chip">Persistent</span><span class="muted">@${l(t.peer_handle||"user")}</span></div>
      </div>
    </button>`}).join(""):'<div class="msg-empty"><p class="muted">No persistent conversations yet.</p><a class="btn primary" href="#/messages?view=new">Start a chat</a></div>'}function Ll(e,t=""){var o,r,c;const s=e==null?void 0:e.conversation,a=(e==null?void 0:e.messages)||[];if(!s)return'<div class="card muted">Conversation not found.</div>';const i=((o=s.peer)==null?void 0:o.display_name)||((r=s.peer)==null?void 0:r.handle)||"PIKK user",n=a.map(d=>{var p;const u=d.sender_id===t;return`<div class="msg-bubble ${u?"mine":""}">
      <div class="msg-bubble-meta"><strong>${u?"You":"@"+l(d.sender_handle||((p=s.peer)==null?void 0:p.handle)||"user")}</strong><span class="muted">${l(G(Date.parse(d.created_at)))}</span></div>
      <div class="msg-bubble-text">${l(d.body)}</div>
    </div>`}).join("");return`<section class="pikk-msg-flow-hero pikk-msg-flow-hero-thread"><span class="pikk-msg-flow-kicker">PIKK CONNECT · DIRECT MESSAGES</span><h2>${l(i)}</h2><p>Persistent private conversation stored on PIKK.</p><span class="chip">Backend message thread</span></section>
    <div class="card msg-thread-head pikk-msg-flow-panel"><button type="button" class="btn ghost" data-remote-inbox>← Inbox</button><h3 style="margin:10px 0 0">${l(i)}</h3>${(c=s.peer)!=null&&c.handle?`<div class="row wrap" style="margin-top:8px"><button type="button" class="btn ghost pikk-safety-tap" data-remote-flag="block" data-peer-handle="${l(s.peer.handle)}">Block</button>${oo("data-report-category")}<button type="button" class="btn ghost danger pikk-safety-tap" data-remote-flag="report" data-peer-handle="${l(s.peer.handle)}">Report</button></div>`:""}</div>
    <div class="card msg-thread-card pikk-msg-flow-panel">
      <div class="msg-thread" id="remoteMsgThread">${n||'<p class="muted">No messages yet — say hi.</p>'}</div>
      <div class="msg-composer"><input id="remoteMsgInput" placeholder="Message…" maxlength="4000" /><button type="button" class="btn primary" id="remoteMsgSend">Send</button></div>
    </div>`}function vw(e,t){var i,n,o;if(!t)return M("Messages",'<section class="pikk-msg-flow-hero"><span class="pikk-msg-flow-kicker">PIKK CONNECT · PRIVATE MESSAGES</span><h2>Your conversations.</h2><p>Sign in with your PIKK account to use persistent private messages.</p><span class="chip">Backend messaging</span></section><div class="card"><a class="btn primary" href="#/profile">Sign in</a></div>',{lead:"Persistent private messaging"});const s=((i=e==null?void 0:e.query)==null?void 0:i.view)||"",a=((n=e==null?void 0:e.query)==null?void 0:n.t)||"";if(a)return M("Messages",`<div id="persistentMessageThread" data-thread-id="${l(a)}"><div class="card muted">Loading conversation…</div></div>`,{lead:"Persistent private messaging"});if(s==="new"){const r=((o=e==null?void 0:e.query)==null?void 0:o.handle)||"";return M("Messages",`<section class="pikk-msg-flow-hero"><span class="pikk-msg-flow-kicker">PIKK CONNECT · NEW CONVERSATION</span><h2>Start a private chat.</h2><p>Enter the PIKK username you want to message.</p><span class="chip">Verified accounts only</span></section><div class="card pikk-msg-flow-panel"><button type="button" class="btn ghost" data-remote-inbox>← Inbox</button><form id="remoteNewChatForm" style="margin-top:12px"><div class="field"><label for="remotePeerHandle">PIKK username</label><input id="remotePeerHandle" name="handle" maxlength="30" pattern="[A-Za-z0-9_]{3,30}" autocomplete="off" required placeholder="username" value="${l(r)}" /></div><button class="btn primary" type="submit">Start conversation</button></form></div>`,{lead:"Persistent private messaging"})}return M("Messages",'<section class="pikk-messages-hero"><div><p class="kicker">PIKK CONNECT · MESSAGES</p><h2>Your conversations.</h2><p>Private messages tied to your PIKK account.</p></div><span class="pikk-messages-hero-mark" aria-hidden="true">✉</span></section><div class="pikk-msg-tools"><div class="pikk-msg-tool-actions"><a class="btn primary" href="#/messages?view=new">+ New chat</a></div></div><div class="card"><h3>Inbox</h3><div class="msg-inbox" id="persistentMsgInbox"><p class="muted">Loading conversations…</p></div></div>',{lead:"Persistent private messaging · backend stored"})}async function Fu(e){var i,n,o,r,c,d;const t=D().user;if(!t)return;e.querySelectorAll("[data-remote-inbox]").forEach(u=>u.addEventListener("click",()=>ue("#/messages")));const s=e.querySelector("#persistentMsgInbox");if(s)try{const u=await Dt.list();s.innerHTML=gw(u.conversations||[]),s.querySelectorAll("[data-open-remote-thread]").forEach(p=>p.addEventListener("click",()=>ue("#/messages?t="+encodeURIComponent(p.dataset.openRemoteThread))))}catch(u){s.innerHTML=(u==null?void 0:u.status)===401?'<p class="muted">Your session expired. <a href="#/profile">Sign in again</a>.</p>':`<p class="muted">Could not load messages: ${l((u==null?void 0:u.message)||"Unknown error")}</p>`}(i=e.querySelector("#remoteNewChatForm"))==null||i.addEventListener("submit",async u=>{u.preventDefault();const p=u.currentTarget.elements.handle.value.trim();if(p)try{const h=await Dt.start(p);ue("#/messages?t="+encodeURIComponent(h.conversation.id))}catch(h){f((h==null?void 0:h.code)==="email_unverified"?"Verify your email before starting messages":(h==null?void 0:h.message)||"Could not start conversation")}});const a=e.querySelector("#persistentMessageThread");if(a){const u=a.dataset.threadId;try{const p=await Dt.get(u);a.innerHTML=Ll(p,t.id),await Dt.markRead(u).catch(()=>{}),(n=a.querySelector("[data-remote-inbox]"))==null||n.addEventListener("click",()=>ue("#/messages"));const h=((r=(o=p==null?void 0:p.conversation)==null?void 0:o.peer)==null?void 0:r.handle)||"";a.querySelectorAll("[data-remote-flag]").forEach(b=>b.addEventListener("click",()=>{var y;return va(b.dataset.remoteFlag==="block"?"block":"report",h,{category:((y=a.querySelector("[data-report-category]"))==null?void 0:y.value)||""})}));const g=async()=>{var k;const b=a.querySelector("#remoteMsgInput"),y=(k=b==null?void 0:b.value)==null?void 0:k.trim();if(!y)return f("Type a message");try{await Dt.send(u,y);const S=await Dt.get(u);a.innerHTML=Ll(S,t.id),Fu(e),f("Sent")}catch(S){f((S==null?void 0:S.code)==="email_unverified"?"Verify your email before sending messages":(S==null?void 0:S.message)||"Could not send")}};(c=a.querySelector("#remoteMsgSend"))==null||c.addEventListener("click",g),(d=a.querySelector("#remoteMsgInput"))==null||d.addEventListener("keydown",b=>{b.key==="Enter"&&(b.preventDefault(),g())});const v=a.querySelector("#remoteMsgThread");v&&(v.scrollTop=v.scrollHeight)}catch(p){a.innerHTML=(p==null?void 0:p.status)===404?'<div class="card muted">Conversation not found or unavailable.</div>':`<div class="card muted">Could not load conversation: ${l((p==null?void 0:p.message)||"Unknown error")}</div>`}}}function bw(e){var o,r,c;const t=D().user;if(un())return vw(e,t);if(!t)return uw();qa(),Er();const s=((o=e==null?void 0:e.query)==null?void 0:o.view)||"",a=((r=e==null?void 0:e.query)==null?void 0:r.t)||"",i=((c=e==null?void 0:e.query)==null?void 0:c.priority)==="1";let n;if(a){const d=bc(a);d?n=fw(d,{teamPriorityHint:i&&d.peerId==="dbs"}):n='<div class="card"><p class="muted">Thread not found.</p><button type="button" class="btn" id="msgBackInbox">← Inbox</button></div>'}else s==="new"?n=mw():s==="team"?n=hw():n=pw();return M("Messages",n,{lead:"DMs, group chats, and creator messages · TEST MODE"})}function yw(e,t,{go:s=ue}={}){e.querySelectorAll("[data-flag]").forEach(a=>{a.addEventListener("click",()=>{var n;if(!t)return;const i=a.dataset.flag;if(i==="mute"){const o=$n(t.id,{muted:!t.muted});f(o.muted?"Muted":"Unmuted")}else if(i==="block")$n(t.id,{blocked:!t.blocked}).blocked?va("block",Sa(t)):f("Unblocked on this device");else if(i==="report"){const o=((n=e.querySelector("[data-report-category]"))==null?void 0:n.value)||"";if(!o){va("report","",{category:o});return}$n(t.id,{report:!0}),va("report",Sa(t),{category:o})}s("#/messages?t="+encodeURIComponent(t.id))})})}function kw(e){var d,u,p,h,g,v,b,y,k,S,$,w,C,P,q,E,V;const t=D().user;if(un()){Fu(e);return}if(!t)return;const s=()=>ue("#/messages");(d=e.querySelector("#msgBackInbox"))==null||d.addEventListener("click",s),(u=e.querySelector("#msgMarkAllRead"))==null||u.addEventListener("click",()=>{const A=$r().filter(N=>ki(N)>0);A.length&&(A.forEach(N=>Io(N.id)),f(`${A.length} conversation${A.length===1?"":"s"} marked read`),ue("#/messages"))}),(p=e.querySelector("#msgNewChat"))==null||p.addEventListener("click",()=>ue("#/messages?view=new")),(h=e.querySelector("#pikkNewChatTop"))==null||h.addEventListener("click",()=>ue("#/messages?view=new"));const a=()=>{var J,B;const A=String(((J=e.querySelector("#pikkMsgSearch"))==null?void 0:J.value)||"").trim().toLowerCase(),N=!!((B=e.querySelector("#pikkMsgUnreadOnly"))!=null&&B.checked);let j=0;e.querySelectorAll("#msgInbox [data-open-thread]").forEach(H=>{const me=!A||String(H.dataset.search||"").includes(A),W=!N||H.dataset.unread==="true";H.hidden=!(me&&W),H.hidden||j++});const I=e.querySelectorAll("#msgInbox [data-open-thread]").length,R=e.querySelector("#pikkMsgResultCount");R&&(R.textContent=ju(j,I,!!(A||N)));const O=e.querySelector("#pikkMsgNoResults");O&&(O.textContent=N?A?"No unread conversations match your search.":"No unread conversations.":"No conversations match your search.",O.hidden=j>0||!A&&!N);const F=e.querySelector("#pikkMsgClearFilters");F&&(F.hidden=!A&&!N)};(g=e.querySelector("#pikkMsgClearFilters"))==null||g.addEventListener("click",()=>{const A=e.querySelector("#pikkMsgSearch"),N=e.querySelector("#pikkMsgUnreadOnly");A&&(A.value=""),N&&(N.checked=!1),a(),A==null||A.focus()});const i=e.querySelector("#pikkMsgSearch");i==null||i.addEventListener("input",a),i==null||i.addEventListener("keydown",A=>{A.key!=="Escape"||!i.value||(A.preventDefault(),A.stopPropagation(),i.value="",a())}),(v=e.querySelector("#pikkMsgUnreadOnly"))==null||v.addEventListener("change",a),(b=e.querySelector("#msgEmptyNew"))==null||b.addEventListener("click",()=>ue("#/messages?view=new")),(y=e.querySelector("#msgOpenTeam"))==null||y.addEventListener("click",()=>ue("#/messages?view=team")),(k=e.querySelector("#pikkGroupTop"))==null||k.addEventListener("click",()=>{var A;return(A=e.querySelector("#msgOpenGroup"))==null?void 0:A.click()}),(S=e.querySelector("#msgOpenGroup"))==null||S.addEventListener("click",()=>{const A=em();if(A!=null&&A.error){f("Sign in required");return}f("Opened DBS Fans"),ue("#/messages?t="+encodeURIComponent(A.id))}),($=e.querySelector("#msgTeamFree"))==null||$.addEventListener("click",()=>{const A=ga("dbs","DatBoiSkeet");if(A.error)return f("Sign in required");ue("#/messages?t="+encodeURIComponent(A.id))}),(w=e.querySelector("#msgTeamPriority"))==null||w.addEventListener("click",()=>{const A=ga("dbs","DatBoiSkeet");if(A.error)return f("Sign in required");ue("#/messages?t="+encodeURIComponent(A.id)+"&priority=1")}),e.querySelectorAll("[data-start-peer]").forEach(A=>{A.addEventListener("click",()=>{const N=A.dataset.startPeer,j=A.dataset.peerName||N;if(N==="dbs"){ue("#/messages?view=team");return}const I=ga(N,j,{peerHandle:A.dataset.peerHandle||""});if(I.error)return f("Sign in required");I.request&&f("Request thread created · demo"),ue("#/messages?t="+encodeURIComponent(I.id))})}),e.querySelectorAll("[data-open-thread]").forEach(A=>{A.addEventListener("click",()=>{ue("#/messages?t="+encodeURIComponent(A.dataset.openThread))})}),(C=e.querySelector("#msgPrefDMs"))==null||C.addEventListener("change",A=>{Mo({allowDMs:!!A.target.checked}),f(A.target.checked?"DMs allowed":"DMs disabled (stub)")}),(P=e.querySelector("#msgPrefRequests"))==null||P.addEventListener("change",A=>{Mo({allowRequests:!!A.target.checked}),f(A.target.checked?"Requests allowed":"Requests disabled (stub)")});const n=new URLSearchParams(location.hash.split("?")[1]||"").get("t"),o=n?bc(n):null;o&&Io(o.id),yw(e,o);const r=A=>{if(!o)return;const N=e.querySelector("#msgInput"),j=(N==null?void 0:N.value)||"";let I;if(o.kind==="group"?I=tm(o.id,j):I=Xp(o.peerId,o.peerName,j,{priority:!!A}),(I==null?void 0:I.error)==="empty")return f("Type a message");if(I!=null&&I.error)return f("Could not send");f(A?"Priority sent · TEST MODE $2.99 not charged":"Sent"),ue("#/messages?t="+encodeURIComponent(o.id))};(q=e.querySelector("#msgSend"))==null||q.addEventListener("click",()=>r(!1)),(E=e.querySelector("#msgSendPriority"))==null||E.addEventListener("click",()=>r(!0)),(V=e.querySelector("#msgInput"))==null||V.addEventListener("keydown",A=>{A.key==="Enter"&&(A.preventDefault(),r(!1))});const c=e.querySelector("#msgThread");c&&(c.scrollTop=c.scrollHeight)}const Dl=Object.freeze({releases:!0,lives:!0,messages:!0,quietHours:!1}),ts=Object.freeze([{key:"releases",title:"New music releases",detail:"Keep track of new DatBoiSkeet music and official drops.",group:"discover"},{key:"lives",title:"Livestreams",detail:"Choose whether you want live-session updates.",group:"discover"},{key:"messages",title:"Messages",detail:"Control conversation notification preferences.",group:"social"},{key:"quietHours",title:"Quiet hours",detail:"Save your preference for a quieter experience.",group:"social"}]);function _l(e,t){const s=!!t[e.key];return`<label class="pikk-notif-row" for="pikk-notif-${e.key}">
    <span class="pikk-notif-row-copy"><strong>${e.title}</strong><small>${e.detail}</small></span>
    <input id="pikk-notif-${e.key}" type="checkbox" data-k="${e.key}" ${s?"checked":""} />
  </label>`}function ww(){const e=D().notifications||{},t=ts.filter(s=>!!e[s.key]).length;return M("Notifications",`
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
          ${ts.filter(s=>s.group==="discover").map(s=>_l(s,e)).join("")}
        </section>
        <section class="pikk-notif-panel" aria-labelledby="pikkNotifSocialTitle">
          <div class="pikk-notif-panel-head"><span class="pikk-notif-panel-icon" aria-hidden="true">✉</span><div><span class="pikk-notif-kicker">YOUR SPACE</span><h3 id="pikkNotifSocialTitle">Social &amp; Focus</h3></div></div>
          ${ts.filter(s=>s.group==="social").map(s=>_l(s,e)).join("")}
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
    </div>`,{lead:"Music, live and social preferences · browser-local demo."})}function Sw(e){var a,i,n;const t=e.querySelector("#notifPrefs");if(!t)return;const s=o=>{const r=["releases","lives","messages"];wn(Object.fromEntries(r.map(h=>[h,o]))),t.querySelectorAll("input[data-k]").forEach(h=>{r.includes(h.dataset.k)&&(h.checked=o)});const c=D().notifications||{},d=ts.filter(h=>!!c[h.key]).length,u=t.querySelector("#pikkNotifEnabled");u&&(u.textContent=`${d} of 4`);const p=t.querySelector("#pikkNotifStatus");p&&(p.textContent=o?"Music, live and message preferences resumed on this device. Real push delivery is not connected.":"Music, live and message preferences paused on this device. Real push delivery is not connected."),f(o?"Alerts resumed":"Alerts paused")};(a=t.querySelector("#pikkNotifPause"))==null||a.addEventListener("click",()=>s(!1)),(i=t.querySelector("#pikkNotifResume"))==null||i.addEventListener("click",()=>s(!0)),(n=t.querySelector("#pikkNotifReset"))==null||n.addEventListener("click",()=>{wn(Dl),t.querySelectorAll("input[data-k]").forEach(c=>{c.checked=Dl[c.dataset.k]});const o=t.querySelector("#pikkNotifEnabled");o&&(o.textContent="3 of 4");const r=t.querySelector("#pikkNotifStatus");r&&(r.textContent="Notification preferences restored to defaults on this device."),f("Defaults restored")}),t.querySelectorAll("input[data-k]").forEach(o=>{o.addEventListener("change",()=>{const r=o.dataset.k;if(!ts.some(h=>h.key===r))return;wn({[r]:o.checked});const c=D().notifications||{},d=ts.filter(h=>!!c[h.key]).length,u=t.querySelector("#pikkNotifEnabled");u&&(u.textContent=`${d} of 4`);const p=t.querySelector("#pikkNotifStatus");p&&(p.textContent=`${ts.find(h=>h.key===r).title} preference saved on this device.`),f("Preference saved")})})}function Yt(){U("#/wallet")}function Y(e){return"$"+Number(e||0).toFixed(2)}function ei(e){return Number(e||0).toLocaleString()}const $w={pending:"Pending",completed:"Completed",rejected:"Rejected"};function Ew(){const{wallet:e,user:t,coins:s}=D(),a=e||{balance:0,history:[]},i=zi(),n=[...(s==null?void 0:s.history)||[]].slice(0,10),o=Kp(),r=$a(),c=Tr().filter(E=>E.count>0),d=hc(t==null?void 0:t.id),u=[...a.history||[]].slice(-12).reverse(),p=[...r.earnings||[]].slice(0,20),h=r.payouts||[],g=h.find(E=>E.status==="pending"),v=!g&&r.available>=r.threshold,b=r.verification==="demo_verified",y=u.length>0?`<ul class="list-plain">${u.map(E=>`<li>
          <span>${l(E.note||"Entry")}<br/><span class="muted" style="font-size:12px">${G(E.at)}</span></span>
          <strong style="color:${Number(E.amount)>=0?"var(--ok,#6dffb0)":"inherit"}">${Number(E.amount)>=0?"+":""}${Y(E.amount)}</strong>
        </li>`).join("")}</ul>`:'<p class="muted" style="margin:0">No fan USD credit activity yet.</p>',k=o.map(E=>{const V=`pack_${E.coins}`;return`<button type="button" class="card coin-pack-btn" data-coins="${E.coins}" id="${l(V)}" style="text-align:left;cursor:pointer;margin:0;padding:12px;border:1px solid rgba(255,255,255,.08);background:#12121a">
        <div style="font-size:20px;font-weight:900">${ei(E.coins)} <span class="muted" style="font-size:13px;font-weight:600">coins</span></div>
        <div class="muted" style="font-size:13px;margin-top:4px">${Y(E.usd)} · TEST MODE</div>
        <div style="margin-top:8px"><span class="chip">Buy · demo credit</span></div>
      </button>`}).join(""),S=n.length>0?`<ul class="list-plain">${n.map(E=>{const V=Number(E.amount)||0;return`<li>
          <span>${l(E.note||"Coins")}<br/><span class="muted" style="font-size:12px">${G(E.at)}</span></span>
          <strong style="color:${V>=0?"var(--ok,#6dffb0)":"inherit"}">${V>=0?"+":""}${ei(V)}</strong>
        </li>`}).join("")}</ul>`:'<p class="muted" style="margin:0">No coin purchases or gifts yet. Buy a pack below for Live gifts.</p>',$=d.length>0?`<ul class="list-plain">${d.slice(0,8).map(E=>`<li>
          <span>
            <strong>${l(E.note||E.label||"Live gift")}</strong>
            <span class="chip">80/20 NET</span>
            ${E.giftSlug?`<span class="chip">${l(E.giftSlug)}</span>`:""}
            <br/><span class="muted" style="font-size:12px">gross ${Y(E.gross)} · fees ${Y(E.fees)} · net ${Y(E.net)} · ${G(E.at)}</span>
          </span>
          <span style="text-align:right;font-size:13px">
            <strong>${Y(E.creatorShare)}</strong><br/>
            <span class="muted">PIKK ${Y(E.dbsShare)}</span>
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
          ${c.map(E=>`<tr style="border-top:1px solid rgba(255,255,255,.06)">
            <td style="padding:8px 4px"><strong>${l(E.label)}</strong><br/><span class="muted" style="font-size:11px">${E.creatorPct}/${E.dbsPct} · ${E.count} line${E.count===1?"":"s"}</span></td>
            <td style="padding:8px 4px">${Y(E.gross)}</td>
            <td style="padding:8px 4px">${Y(E.fees)}</td>
            <td style="padding:8px 4px">${Y(E.net)}</td>
            <td style="padding:8px 4px"><strong>${Y(E.creatorShare)}</strong></td>
            <td style="padding:8px 4px">${Y(E.dbsShare)}</td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>
    <p class="muted" style="font-size:12px;margin:8px 0 0">Default fees = demo 2.9% + $0.30. <strong>Live catalog gifts (t185u)</strong> treat listed USD as NET (fees $0) then 80/20. Seeded rows labeled in ledger.</p>`:'<p class="muted" style="margin:0">No creator earnings yet. Load demo earnings or receive Live tips/gifts.</p>',C=p.length>0?`<ul class="list-plain">${p.map(E=>`<li>
          <span>
            <strong>${l(E.label)}</strong>
            ${E.payoutId?'<span class="chip">In payout</span>':'<span class="chip">Open</span>'}
            ${E.source==="seed"?'<span class="chip">Demo seed</span>':""}
            ${E.source==="live_gift"?'<span class="chip">Coin gift</span>':""}
            <br/><span class="muted" style="font-size:12px">${l(E.note)} · ${G(E.at)}</span>
          </span>
          <span style="text-align:right;font-size:13px">
            <strong>${Y(E.creatorShare)}</strong><br/>
            <span class="muted">gross ${Y(E.gross)}</span>
          </span>
        </li>`).join("")}</ul>`:"",P=h.length>0?h.map(E=>`<div class="card" style="margin:0 0 10px;background:#12121a" data-payout="${l(E.id)}">
        <div class="row wrap">
          <strong>${Y(E.amount)}</strong>
          <span class="chip">${l($w[E.status]||E.status)}</span>
          <span class="muted spacer" style="text-align:right;font-size:12px">${G(E.at)}</span>
        </div>
        <p class="muted" style="margin:6px 0;font-size:12px">${l(E.note||"Payout")} · ${(E.earningIds||[]).length} earning line(s)</p>
        ${E.status==="pending"?`<div class="row wrap">
                <button class="btn primary payout-status" data-id="${l(E.id)}" data-status="completed">Mark completed · demo</button>
                <button class="btn ghost payout-status" data-id="${l(E.id)}" data-status="rejected">Reject · release hold</button>
              </div>`:E.reviewedAt?`<p class="muted" style="margin:0;font-size:12px">Reviewed ${G(E.reviewedAt)}</p>`:""}
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
        <div class="pikk-wallet-metric"><span>Gift coins</span><strong>${ei(i)}</strong><small>Live gifting · demo</small></div>
        <div class="pikk-wallet-metric"><span>Fan USD credits</span><strong>${Y(a.balance)}</strong><small>Tips and requests · demo</small></div>
        <div class="pikk-wallet-metric"><span>Creator available</span><strong>${Y(r.available)}</strong><small>Eligible balance · demo</small></div>
        <div class="pikk-wallet-metric"><span>Creator on hold</span><strong>${Y(r.holds)}</strong><small>Payout review · demo</small></div>
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
      <div style="font-size:32px;font-weight:900;margin-top:8px">${ei(i)} <span class="muted" style="font-size:16px;font-weight:600">coins</span></div>
      <p class="muted" style="margin:4px 0 12px">≈ ${Y(i*.02)} · stored in <code>dbs_v1.coins</code> (not USD <code>wallet</code>). Used for Live gift tray.</p>
      <h4 style="margin:0 0 8px;font-size:14px">Buy coin pack</h4>
      <div class="grid-2" style="gap:10px">${k}</div>
      <p class="muted" style="font-size:12px;margin:10px 0 0">No discounts · packs ${Vi.map(E=>`${E.coins}/$${E.usd}`).join(" · ")}. Demo credit only — no payment processor.</p>
      <h4 style="margin:16px 0 8px;font-size:14px">Recent coin activity</h4>
      ${S}
      <div class="row wrap" style="margin-top:12px">
        <a class="btn ghost" href="#/live">Go to Live · send gifts</a>
        <a class="btn ghost" href="#/earnings?cat=gifts">Gift earnings</a>
      </div>
    </div>

    <div class="card">
      <h3>Fan spendable USD credits</h3>
      <div style="font-size:32px;font-weight:900">${Y(a.balance)}</div>
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
          <div style="font-size:28px;font-weight:900">${Y(r.available)}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Holds / in review</p>
          <div style="font-size:28px;font-weight:900">${Y(r.holds)}</div>
        </div>
      </div>
      <div class="row wrap" style="margin-top:10px">
        <span class="chip">Threshold ${Y(r.threshold)}</span>
        <span class="chip">Holds / refunds · demo</span>
        ${g?'<span class="chip">Payout pending</span>':""}
      </div>
      <div class="row wrap" style="margin-top:12px">
        <button class="btn primary" id="cwPayout" ${v?"":"disabled"}>Request payout · TEST MODE</button>
        <button class="btn" id="cwSeed">${(r.earnings||[]).length?"Reload demo earnings":"Load demo earnings"}</button>
        <a class="btn ghost" href="#/earnings">Earnings overview</a>
      </div>
      ${v?'<p class="muted" style="margin:10px 0 0;font-size:12px">Moves available → holds and locks those earning lines until completed or rejected.</p>':`<p class="muted" style="margin:10px 0 0;font-size:12px">${g?"Finish or reject the pending payout before requesting another (anti double-payout).":`Need at least ${Y(r.threshold)} available · currently ${Y(r.available)}.`}</p>`}
      <p class="chip" style="margin-top:10px">Signed in as ${l((t==null?void 0:t.username)||"guest")}</p>
    </div>

    <div class="card" id="wallet-gift-earnings">
      <h3>Live gift earnings · creator view</h3>
      <p class="muted" style="margin:0 0 10px;font-size:13px">80% creator / 20% PIKK on NET catalog gifts. Not shown on Live / gift tray.</p>
      ${$}
    </div>

    <div class="card">
      <h3>Earnings breakdown</h3>
      <p class="muted" style="margin:0 0 10px">Gifts, tips, subscriptions, referrals, Clippers, sponsorships, merch/affiliate — gross → fees → net → creator% / PIKK%.</p>
      ${w}
      ${C?`<h4 style="margin:16px 0 8px;font-size:14px">Ledger (recent)</h4>${C}`:""}
    </div>

    <div class="card">
      <h3>Payout history</h3>
      <p class="muted" style="margin:0 0 10px">On-device demo approve / reject. Completed funds leave holds; rejected releases hold and untags earnings.</p>
      ${P}
    </div>
    </div>
  `;return M("Wallet & Payouts",q,{lead:"Creator Wallet & Payout Center · gift coins + fan USD · TEST MODE."})}function xw(e){var t,s,a,i,n;e.querySelectorAll(".coin-pack-btn").forEach(o=>{o.addEventListener("click",()=>{const r=Number(o.dataset.coins),c=mc(r);if((c==null?void 0:c.error)==="bad_package")return f("Unknown pack");if(c!=null&&c.error)return f("Could not buy coins");f(`+${r.toLocaleString()} coins · TEST MODE`),Yt()})}),(t=e.querySelector("#fanCredit5"))==null||t.addEventListener("click",()=>{Hn(5,"Demo credit +$5"),f("+$5 fan credits"),Yt()}),(s=e.querySelector("#fanCredit25"))==null||s.addEventListener("click",()=>{Hn(25,"Demo credit +$25"),f("+$25 fan credits"),Yt()}),(a=e.querySelector("#cwSeed"))==null||a.addEventListener("click",()=>{const o=($a().earnings||[]).length>0,r=wc({force:!0});f(o?"Demo earnings reloaded":`Loaded ${r.seeded||0} demo lines`),Yt()}),(i=e.querySelector("#cwPayout"))==null||i.addEventListener("click",()=>{const o=im();if((o==null?void 0:o.error)==="pending_exists")return f("Payout already pending");if((o==null?void 0:o.error)==="below_threshold")return f("Below payout threshold");if(o!=null&&o.error)return f("Could not request payout");f("Payout requested · held"),Yt()}),(n=e.querySelector("#cwVerify"))==null||n.addEventListener("click",()=>{const r=$a().verification!=="demo_verified";rm(r),f(r?"Demo verified":"Verification cleared"),Yt()}),e.querySelectorAll(".payout-status").forEach(o=>{o.addEventListener("click",()=>{const r=nm(o.dataset.id,o.dataset.status);if(r!=null&&r.error)return f("Could not update payout");f("Payout "+o.dataset.status),Yt()})})}function Ol(e){U(e||"#/earnings")}function le(e){return"$"+Number(e||0).toFixed(2)}const Uu=[{id:"all",label:"All"},{id:"gifts",label:"Gifts"},{id:"tips",label:"Tips"},{id:"subscriptions",label:"Subscriptions"},{id:"clippers",label:"Clippers"},{id:"referrals",label:"Referrals"},{id:"sponsorships",label:"Sponsorships"},{id:"merch",label:"Merch"}];function Gu(){var t;const e=(((t=Ye().query)==null?void 0:t.cat)||"all").toLowerCase();return Uu.some(s=>s.id===e)?e:"all"}function Aw(e){return(e||[]).reduce((t,s)=>(t.gross+=Number(s.gross)||0,t.fees+=Number(s.fees)||0,t.net+=Number(s.net)||0,t.creatorShare+=Number(s.creatorShare)||0,t.dbsShare+=Number(s.dbsShare)||0,t),{gross:0,fees:0,net:0,creatorShare:0,dbsShare:0})}function ta(e){return Math.round(Number(e)*100)/100}function Tw(){const e=$a(),t=am(),s=Gu(),a=[...e.earnings||[]].sort((b,y)=>(y.at||0)-(b.at||0)),i=s==="all"?a:a.filter(b=>b.category===s||s==="subscriptions"&&b.category==="paid_content"),n=Aw(a),o=Tr(),r=hc(),c=s==="gifts"?`<div class="card" style="margin:0 0 12px;background:#12121a">
      <div class="row wrap">
        <span class="chip">t185u · catalog gifts</span>
        <span class="chip">80% creator / 20% PIKK · NET</span>
        <span class="chip">TEST MODE · listed USD = net</span>
      </div>
      <p class="muted" style="margin:8px 0 0;font-size:13px">Coin gifts from Live use <code>sendLiveGift</code> → creator earnings here. Viewers on Live / gift tray never see this split. ${r.length?`${r.length} gift line(s) on device.`:"Send a catalog gift on an active Live to populate."}</p>
    </div>`:"",d=Uu.map(b=>{const y=b.id==="all"?"#/earnings":`#/earnings?cat=${b.id}`,k=b.id==="all"?a.length:a.filter($=>$.category===b.id||b.id==="subscriptions"&&$.category==="paid_content").length,S=s===b.id;return`<a class="chip earn-filter${S?" active":""}" href="${y}" data-cat="${l(b.id)}" style="${S?"outline:1px solid var(--accent,#6dffb0);font-weight:700":""}">${l(b.label)}${k?` · ${k}`:""}</a>`}).join(""),u=Object.entries(t).map(([b,y])=>`<tr style="border-top:1px solid rgba(255,255,255,.06)">
        <td style="padding:8px 4px"><strong>${l(y.label)}</strong><br/><span class="muted" style="font-size:11px">${l(b)}</span></td>
        <td style="padding:8px 4px">${y.creatorPct}%</td>
        <td style="padding:8px 4px">${y.dbsPct}%</td>
      </tr>`).join(""),p=Object.entries(t).map(([b,y])=>`<option value="${l(b)}">${l(y.label)}</option>`).join(""),h=o.filter(b=>b.count>0).length>0?`<div style="overflow-x:auto;margin-top:8px">
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
            <td style="padding:8px 4px">${le(b.gross)}</td>
            <td style="padding:8px 4px">${le(b.fees)}</td>
            <td style="padding:8px 4px">${le(b.net)}</td>
            <td style="padding:8px 4px"><strong>${le(b.creatorShare)}</strong></td>
            <td style="padding:8px 4px">${le(b.dbsShare)}</td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>`:"",g=i.length>0?`<ul class="list-plain">${i.map(b=>`<li style="align-items:flex-start">
          <span style="flex:1;min-width:0">
            <strong>${l(b.label||b.category)}</strong>
            ${b.payoutId?'<span class="chip">In payout</span>':'<span class="chip">Open</span>'}
            ${b.source==="seed"?'<span class="chip">Demo seed</span>':""}
            <br/><span class="muted" style="font-size:12px">${l(b.note||"")} · ${G(b.at)}</span>
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
          <div style="font-size:22px;font-weight:800">${le(ta(n.creatorShare))}</div>
        </div>
        <div>
          <p class="muted" style="margin:0;font-size:12px">Lifetime PIKK share</p>
          <div style="font-size:22px;font-weight:800">${le(ta(n.dbsShare))}</div>
        </div>
      </div>
      <div class="row wrap" style="margin-top:10px">
        <span class="chip">Lifetime gross ${le(ta(n.gross))}</span>
        <span class="chip">Fees ${le(ta(n.fees))}</span>
        <span class="chip">Net ${le(ta(n.net))}</span>
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
          <tbody>${u}</tbody>
        </table>
      </div>
      ${h?`<h4 style="margin:16px 0 0;font-size:14px">Totals by source (this device)</h4>${h}`:""}
    </div>

    <div class="card">
      <h3>Earnings ledger</h3>
      ${c}
      <div class="row wrap" style="margin:0 0 12px;gap:6px">${d}</div>
      ${g}
    </div>

    <div class="card">
      <h3>Record demo earning</h3>
      <p class="muted" style="margin:0 0 10px;font-size:13px">Adds one line via <code>creditCreatorEarning</code> (same shape as Wallet / Live tips). Not a real charge.</p>
      <form id="earnDemoForm" style="display:grid;gap:10px;max-width:420px">
        <div class="field"><label>Category</label><select name="category" id="earnCat">${p}</select></div>
        <div class="field"><label>Gross amount (USD)</label><input name="gross" id="earnGross" type="number" min="0.01" step="0.01" value="10" required /></div>
        <div class="field"><label>Note (optional)</label><input name="note" id="earnNote" type="text" maxlength="120" placeholder="Manual demo earning" /></div>
        <button class="btn primary" type="submit">Record demo earning</button>
      </form>
    </div>
    </div>
  `;return M("Creator Earnings",v,{lead:"Rewards, commissions & ledger · TEST MODE · payouts on Wallet (§27)."})}function Cw(e){var t,s;(t=e.querySelector("#earnSeed"))==null||t.addEventListener("click",()=>{const a=($a().earnings||[]).length>0,i=wc({force:!0});f(a?"Demo earnings reloaded":`Loaded ${i.seeded||0} demo lines`),Ol(ql(Gu()))}),(s=e.querySelector("#earnDemoForm"))==null||s.addEventListener("submit",a=>{var c,d,u;a.preventDefault();const i=((c=e.querySelector("#earnCat"))==null?void 0:c.value)||"tips",n=Number((d=e.querySelector("#earnGross"))==null?void 0:d.value),o=(((u=e.querySelector("#earnNote"))==null?void 0:u.value)||"").trim()||"Manual demo earning";if(!(n>0))return f("Enter a positive gross amount");const r=Ar({category:i,gross:n,note:o,source:"manual_demo"});f(`Recorded ${le(r.creatorShare)} creator share`),Ol(ql(i))})}function ql(e){return!e||e==="all"?"#/earnings":`#/earnings?cat=${e}`}function Jt(){U("#/missions")}const Rl={song:"Song",album:"Album",video:"Video",live:"Livestream",app:"DBS App",interview:"Interview"};function Pw(e){return"$"+Number(e||0).toFixed(0)}function Iw(e){const t=Number(e)||0;if(!t)return"No deadline";const s=t-Date.now();if(s<0)return`Ended ${Math.ceil(-s/864e5)}d ago`;const a=Math.ceil(s/864e5);return a<=1?"Due today / tomorrow":`${a}d left`}function Mw(e=14){return new Date(Date.now()+e*864e5).toISOString().slice(0,10)}function ti(){const{user:e}=D();if(e)return e;const t=_a("DemoCreator");return f("Signed in as DemoCreator · local demo"),t||D().user}function Lw(){const{user:e}=D(),t=Qi().sort((u,p)=>(p.createdAt||0)-(u.createdAt||0)),s=t.filter(u=>u.status==="active"||u.status==="paused"),a=t.filter(u=>u.status==="ended"||u.status==="draft"),i=new Set(t.flatMap(u=>(u.participants||[]).map(p=>p.userId).filter(Boolean))).size,n=t.reduce((u,p)=>u+(p.submissions||[]).length,0),o=u=>{const p=u.fundSource==="third_party"?'<span class="chip">20% management fee · disclosed</span>':'<span class="chip">DBS-funded · marketing expense</span>',h=Vm(u.id),g=e&&(u.participants||[]).some(S=>S.userId===e.id),v=(u.submissions||[]).filter(S=>e&&S.userId===e.id),b=h.length>0?h.slice(0,8).map((S,$)=>`<tr style="border-top:1px solid rgba(255,255,255,.06)">
              <td style="padding:6px 4px">${$+1}</td>
              <td style="padding:6px 4px"><strong>${l(S.username)}</strong>
                ${S.referralCode?`<br/><span class="muted" style="font-size:11px">${l(S.referralCode)}</span>`:""}
              </td>
              <td style="padding:6px 4px">${S.score}</td>
              <td style="padding:6px 4px">${S.submissions}</td>
            </tr>`).join(""):'<tr><td colspan="4" class="muted" style="padding:8px 4px">No participants yet — join to appear on the board.</td></tr>',y=(u.submissions||[]).length>0?`<ul class="list-plain" style="margin-top:8px">${(u.submissions||[]).slice(0,5).map(S=>`<li style="align-items:flex-start">
              <span style="flex:1;min-width:0">
                <strong>${l(S.username)}</strong>
                <span class="chip">${l(S.status||"pending")}</span>
                <br/><span style="font-size:13px">${l(S.proof)}</span>
                <br/><span class="muted" style="font-size:11px">${G(S.at)} · Manual review</span>
              </span>
            </li>`).join("")}</ul>`:'<p class="muted" style="margin:8px 0 0;font-size:13px">No proof submissions yet.</p>',k=u.status==="active"?`<div class="row wrap" style="margin-top:10px;gap:8px">
            ${g?`<span class="chip">Joined</span>
                   <button class="btn" data-bump="${l(u.id)}">+5 demo points</button>`:`<button class="btn primary" data-join="${l(u.id)}">Join mission</button>`}
            <button class="btn ghost" data-status="${l(u.id)}" data-next="paused">Pause</button>
            <button class="btn ghost" data-status="${l(u.id)}" data-next="ended">End mission</button>
          </div>
          ${g?`<form class="msn-proof" data-id="${l(u.id)}" style="display:grid;gap:8px;margin-top:12px;max-width:480px">
                  <div class="field"><label>Submit proof (URL or note)</label>
                    <input name="proof" placeholder="https://… or clip description" maxlength="400" required />
                  </div>
                  <button class="btn" type="submit">Submit for review · +10 pts</button>
                </form>`:""}`:u.status==="paused"?`<div class="row wrap" style="margin-top:10px;gap:8px">
              <button class="btn primary" data-status="${l(u.id)}" data-next="active">Resume</button>
              <button class="btn ghost" data-status="${l(u.id)}" data-next="ended">End mission</button>
            </div>`:`<div class="row wrap" style="margin-top:10px"><span class="chip">Archive · ${l(u.status)}</span></div>`;return`<article class="card pikk-mission-card" data-mission="${l(u.id)}">
      <div class="row wrap">
        <span class="chip">${l(Rl[u.promoteType]||u.promoteType)}</span>
        <span class="chip">${l(u.status)}</span>
        <span class="chip">Budget ${Pw(u.budget)}</span>
        <span class="chip">${l(Iw(u.deadline))}</span>
        ${p}
        <span class="muted spacer" style="text-align:right;font-size:12px">${G(u.createdAt)}</span>
      </div>
      <h3 style="margin:10px 0 4px">${l(u.title)}</h3>
      <p class="muted" style="margin:0 0 6px;font-size:13px">${l(u.reward||"")}</p>
      <p class="muted" style="margin:0;font-size:12px">
        Fund: <strong>${u.fundSource==="third_party"?"Third-party":"DBS"}</strong>
        ${u.fundSource==="third_party"?" · 20% management fee (disclosed)":" · not a creator commission — marketing expense"}
        · ${(u.participants||[]).length} joined · ${(u.submissions||[]).length} submissions
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
    </article>`},r=s.length?s.map(o).join(""):t.length?'<div class="card"><p class="muted" style="margin:0">No active or paused missions. Create one or resume from archive.</p></div>':"",c=a.length>0?`<div class="card"><h3>Archive</h3>${a.map(o).join("")}</div>`:"",d=`
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
              ${Object.entries(Rl).map(([u,p])=>`<option value="${u}">${l(p)}</option>`).join("")}
            </select>
          </div>
          <div class="field"><label>Budget (USD)</label><input name="budget" id="msnBudget" type="number" min="0" step="1" value="500" /></div>
        </div>
        <div class="grid-2">
          <div class="field"><label>Deadline</label><input name="deadline" id="msnDeadline" type="date" value="${Mw(14)}" /></div>
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
  `;return M("Missions",d,{lead:"Promotional campaigns · Clippers & creators · TEST MODE (§6)."})}function Dw(e){var t,s,a;(t=e.querySelector("#msnSeed"))==null||t.addEventListener("click",()=>{const i=Qi().length>0,n=Hm({force:!0});f(i?"Demo missions reloaded":`Loaded ${n.seeded||0} demo missions`),Jt()}),(s=e.querySelector("#msnSignIn"))==null||s.addEventListener("click",()=>{ti(),Jt()}),(a=e.querySelector("#msnCreate"))==null||a.addEventListener("submit",i=>{var h,g,v,b,y,k;i.preventDefault();const n=((h=e.querySelector("#msnTitle"))==null?void 0:h.value)||"",o=((g=e.querySelector("#msnType"))==null?void 0:g.value)||"app",r=Number((v=e.querySelector("#msnBudget"))==null?void 0:v.value)||0,c=((b=e.querySelector("#msnDeadline"))==null?void 0:b.value)||"",d=((y=e.querySelector("#msnFund"))==null?void 0:y.value)||"dbs",u=((k=e.querySelector("#msnReward"))==null?void 0:k.value)||"",p=Km({title:n,promoteType:o,budget:r,deadline:c,fundSource:d,reward:u,status:"active"});if(p.error)return f("Title required");f(`Mission created · ${p.title}`),Jt()}),e.querySelectorAll("[data-join]").forEach(i=>{i.addEventListener("click",()=>{ti();const n=i.getAttribute("data-join"),o=Fm(n);if(o.error==="signin")return f("Sign in required");if(o.error==="already_joined")return f("Already joined");if(o.error==="not_active")return f("Mission not active");if(o.error)return f("Could not join");f("Joined mission · referral code assigned"),Jt()})}),e.querySelectorAll("[data-bump]").forEach(i=>{i.addEventListener("click",()=>{ti();const n=i.getAttribute("data-bump"),o=Gm(n,5);if(o.error)return f(o.error==="not_joined"?"Join first":"Bump failed");f("+5 demo points"),Jt()})}),e.querySelectorAll("[data-status]").forEach(i=>{i.addEventListener("click",()=>{const n=i.getAttribute("data-status"),o=i.getAttribute("data-next");if(jm(n,o).error)return f("Status update failed");f(`Mission → ${o}`),Jt()})}),e.querySelectorAll("form.msn-proof").forEach(i=>{i.addEventListener("submit",n=>{var d;n.preventDefault(),ti();const o=i.getAttribute("data-id"),r=((d=i.querySelector('[name="proof"]'))==null?void 0:d.value)||"",c=Um(o,{proof:r});if(c.error==="required")return f("Enter a URL or note");if(c.error==="not_joined")return f("Join first");if(c.error==="not_active")return f("Mission not active");if(c.error)return f("Submit failed");f("Proof submitted · pending manual review · +10 pts"),Jt()})})}const _w="AL:Alabama,AK:Alaska,AZ:Arizona,AR:Arkansas,CA:California,CO:Colorado,CT:Connecticut,DE:Delaware,FL:Florida,GA:Georgia,HI:Hawaii,ID:Idaho,IL:Illinois,IN:Indiana,IA:Iowa,KS:Kansas,KY:Kentucky,LA:Louisiana,ME:Maine,MD:Maryland,MA:Massachusetts,MI:Michigan,MN:Minnesota,MS:Mississippi,MO:Missouri,MT:Montana,NE:Nebraska,NV:Nevada,NH:New Hampshire,NJ:New Jersey,NM:New Mexico,NY:New York,NC:North Carolina,ND:North Dakota,OH:Ohio,OK:Oklahoma,OR:Oregon,PA:Pennsylvania,RI:Rhode Island,SC:South Carolina,SD:South Dakota,TN:Tennessee,TX:Texas,UT:Utah,VT:Vermont,VA:Virginia,WA:Washington,WV:West Virginia,WI:Wisconsin,WY:Wyoming,DC:District of Columbia".split(",").map(e=>e.split(":")),Ow=new Map(_w.flatMap(([e,t])=>[[e.toLowerCase(),e],[t.toLowerCase(),e]])),Rt=e=>String(e||"").trim().replace(/\s+/g," ").toLowerCase(),Nl=e=>Ow.get(Rt(e))||Rt(e),qw=(e,t)=>!t||[e.username,e.bio,e.title,e.text,e.hostName,e.artist,e.type].some(s=>Rt(s).includes(t));function Vu({query:e="",keywordQuery:t,locationLabel:s=""}={}){const a=String(t===void 0?e:t).trim(),i=String(s||"").trim();return[a?"for “"+a+"”":"",i?"in "+i:""].filter(Boolean).join(" ")}function Bl(e,{city:t="",state:s=""}={}){if(!e||e.locationDiscoverable!==!0||e.private===!0||e.isPrivate===!0)return!1;const a=e.location&&typeof e.location=="object"?e.location:e;return!Rt(a.city)||!Rt(a.state)?!1:(!t||Rt(a.city)===Rt(t))&&(!s||Nl(a.state)===Nl(s))}function Rw(e,{city:t="",state:s="",query:a=""}={}){const i=Rt(a),n=h=>Bl(h,{city:t,state:s})&&qw(h,i),o=e.exploreDiscoverable===!0&&Bl(e.user,{city:t,state:s}),r=Object.values(e.profiles||{}).filter(h=>{var g;return(((g=e.user)==null?void 0:g.id)==null||h.id!==e.user.id||o)&&n(h)});e.exploreDiscoverable===!0&&n(e.user)&&!r.some(h=>h.id===e.user.id)&&r.push(e.user);const c=(e.posts||[]).filter(n),d=(e.catalog||[]).filter(h=>h.published===!0&&n(h)),u=e.live&&!e.live.endedAt&&n(e.live)?[{...e.live,status:"live"}]:[],p=(e.liveHistory||[]).filter(n).map(h=>({...h,status:"ended"}));return{query:String(a||"").trim()||"City & State",keywordQuery:String(a||"").trim(),locationLabel:[t,s].map(h=>String(h||"").trim()).filter(Boolean).join(", "),profiles:r,posts:c,music:d.filter(h=>h.type==="song"||h.type==="album"),videos:d.filter(h=>h.type==="video"),pictures:d.filter(h=>h.type==="picture"),lives:[...u,...p],products:(e.listings||[]).filter(h=>h.active!==!1&&n(h))}}const Nw=[{id:"trending",label:"Trending"},{id:"following",label:"Following"},{id:"discover",label:"Discover"}];function Bw(){return!!D().exploreDiscoverable}function qe({href:e,title:t,meta:s,chip:a}){return`<a class="explore-hit" href="${l(e)}">
    <div>
      <strong>${l(t)}</strong>
      <div class="muted" style="font-size:12px;margin-top:2px">${l(s||"")}</div>
    </div>
    ${a?`<span class="chip">${l(a)}</span>`:""}
  </a>`}function Pt(e,t,s){return t?`<div class="card explore-section">
    <h3>${l(e)}</h3>
    <div class="explore-hits">${t}</div>
  </div>`:`<div class="card explore-section">
      <h3>${l(e)}</h3>
      <p class="muted" style="margin:0">${l(s||"No matches")}</p>
    </div>`}function _i(e){if(!e||!e.query)return`<div class="card" id="exploreResults">
      <p class="muted" style="margin:0">Search creators, fans, songs, albums, videos, posts, livestreams, and products. Exact locations are never indexed.</p>
    </div>`;const t=l(Vu(e)),s=e.posts.length+e.profiles.length+e.music.length+e.videos.length+e.lives.length+e.products.length+e.pictures.length;if(!s)return`<div class="card" id="exploreResults">
      <p style="margin:0 0 6px"><strong>No results ${t}</strong></p>
      <p class="muted" style="margin:0">${e.locationLabel?"Only content explicitly opted into city/state discovery can appear here. No matching public location tags are available in this demo.":"Try another keyword, or browse Trending / Discover below. Report spam from a result’s destination page (demo shell)."}</p>
    </div>`;const a=e.posts.slice(0,8).map(h=>qe({href:"#/posts",title:(h.text||"").slice(0,90)||"Post",meta:`@${h.username||"user"} · ${G(h.at||Date.now())}`,chip:"Post"})).join(""),i=e.profiles.slice(0,8).map(h=>qe({href:`#/profile/${encodeURIComponent(h.id)}`,title:`@${h.username||h.id}`,meta:(h.bio||"Creator / fan").slice(0,80),chip:h.verified?"Verified":"Profile"})).join(""),n=e.music.slice(0,8).map(h=>qe({href:"#/music",title:h.title,meta:`${h.artist||"Artist not credited"} · ${h.type}`,chip:h.type==="album"?"Album":"Song"})).join(""),o=e.videos.slice(0,8).map(h=>qe({href:"#/videos",title:h.title,meta:`${h.artist||"Artist not credited"} · Video catalog`,chip:"Video"})).join(""),r=e.pictures.slice(0,8).map(h=>qe({href:"#/home",title:h.title,meta:`${h.artist||"Creator not credited"} · picture`,chip:"Picture"})).join(""),c=e.lives.slice(0,8).map(h=>qe({href:"#/live",title:h.title||"Livestream",meta:`@${h.hostName||"host"} · ${h.status==="live"?"LIVE now":"Ended"}`,chip:h.status==="live"?"Live":"Replay"})).join(""),d=e.products.slice(0,8).map(h=>qe({href:"#/marketplace",title:h.title,meta:`${h.brand||"Brand"} · ${h.disclosure||"Sponsored"}`,chip:"Ad"})).join(""),u=e.query.toLowerCase(),p=e.locationLabel?"":[...Es.filter(h=>h.title.toLowerCase().includes(u)||h.artist.toLowerCase().includes(u)||u.includes("music")||u.includes("song")||u.includes("album")).map(h=>qe({href:"#/music",title:h.title,meta:`${h.artist} · ${h.status}`,chip:"Cover"})),...fe.filter(h=>h.title.toLowerCase().includes(u)||(h.artist||"").toLowerCase().includes(u)||u.includes("video")||u.includes("mv")).map(h=>qe({href:"#/videos",title:h.title,meta:`${h.artist||"Artist not credited"} · Official MV`,chip:"MV"}))].join("");return`<div id="exploreResults">
    <p class="muted" style="margin:0 0 10px">${s} result${s===1?"":"s"} ${t}</p>
    ${Pt("People",i,"No matching creators or fans")}
    ${Pt("Posts",a,"No matching posts")}
    ${Pt("Music (catalog)",n,"No published songs/albums")}
    ${Pt("Videos (catalog)",o,"No published videos")}
    ${Pt("Pictures",r,"No published pictures")}
    ${Pt("Livestreams",c,"No live or history matches")}
    ${Pt("Products / ads",d,"No marketplace listings")}
    ${p?Pt("Music-based picks",p):""}
  </div>`}function Kw(){const e=cm(10);return e.length?`<div class="section-swipe explore-trend">
    ${e.map(t=>`<a class="preview-card" href="${l(t.href)}">
        <strong>${l(t.title)}</strong>
        <span class="muted">${l(t.subtitle)}${t.score?` · ♥${t.score}`:""}</span>
      </a>`).join("")}
  </div>`:'<p class="muted">Nothing trending yet — like posts or publish catalog items.</p>'}function jw(){const e=D().user;if(!e)return'<div class="card"><p class="muted" style="margin:0">Sign in on <a href="#/profile">Profile</a> to see accounts you follow. Demo only — no exact locations.</p></div>';const t=e.following||[];return t.length?`<div class="card explore-section"><h3>Following</h3><div class="explore-hits">${t.map(a=>{var n;const i=((n=D().profiles)==null?void 0:n[a])||{id:a,username:a};return qe({href:`#/profile/${encodeURIComponent(i.id)}`,title:`@${i.username||i.id}`,meta:(i.bio||"Following").slice(0,80),chip:"Following"})}).join("")}</div></div>`:`<div class="card"><p class="muted" style="margin:0">You're not following anyone yet. Discover suggested accounts below, then follow from their profile.</p></div>`}function Fw(){const t=dm().slice(0,8).map(a=>qe({href:`#/profile/${encodeURIComponent(a.id)}`,title:`@${a.username}`,meta:(a.bio||"Suggested").slice(0,80),chip:a.verified?"Verified":"Suggest"})).join(""),s=Es.map(a=>qe({href:"#/music",title:a.title,meta:`${a.artist} · music-based`,chip:"Cover"})).join("");return`
    <div class="card">
      <h3>Discoverability (opt-in)</h3>
      <p class="muted" style="margin:0 0 10px">Appear in Explore suggestions. Off by default. No exact locations stored or shown.</p>
      <label class="row" style="gap:8px;align-items:center">
        <input type="checkbox" id="exploreDiscoverable" ${Bw()?"checked":""} />
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
    </div>`}function Uw(){const e=D().exploreTab||"trending",t=Nw.map(i=>`<button type="button" role="tab" id="explore-tab-${i.id}" aria-controls="explorePanel" aria-selected="${i.id===e}" tabindex="${i.id===e?0:-1}" class="shop-chip${i.id===e?" on":""}" data-explore-tab="${i.id}">${l(i.label)}</button>`).join("");let s="";e==="following"?s=jw():e==="discover"?s=Fw():s=`<div class="card">
      <h3>Trending Across PIKK</h3>
      <p class="muted" style="margin:0 0 10px">High-engagement public posts and seeded demo cards (not a full engagement pipeline).</p>
      ${Kw()}
    </div>
    <div id="exploreResultsWrap">${_i(null)}</div>`;const a=`
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
  `;return M("Explore",a,{lead:"Universal search & discovery across PIKK.",badge:"Phase 2 demo"})}function Kl(e,t){var c,d,u,p,h,g,v,b,y;const s=((c=e.querySelector("#exploreCity"))==null?void 0:c.value.trim())||"",a=((d=e.querySelector("#exploreState"))==null?void 0:d.value.trim())||"",i=s||a?Rw(D(),{city:s,state:a,query:t}):lm(t),n=e.querySelector("#exploreResultsWrap");if(n)n.innerHTML=_i(i);else{const k=e.querySelector("#explorePanel");if(k){let S=k.querySelector("#exploreLiveInsert");S||(S=document.createElement("div"),S.id="exploreLiveInsert",k.prepend(S)),S.innerHTML=_i(i)}}const o=(((u=i.posts)==null?void 0:u.length)||0)+(((p=i.profiles)==null?void 0:p.length)||0)+(((h=i.music)==null?void 0:h.length)||0)+(((g=i.videos)==null?void 0:g.length)||0)+(((v=i.lives)==null?void 0:v.length)||0)+(((b=i.products)==null?void 0:b.length)||0)+(((y=i.pictures)==null?void 0:y.length)||0),r=e.querySelector("#exploreSearchStatus");if(r){const k=Vu(i);r.textContent=i.query?`${o} result${o===1?"":"s"} ${k||"across PIKK"}.`:"Enter a keyword, city or state to search."}i.query&&f(o?`${o} result(s)`:"No matches")}function Gw(e){var p;const t=e.querySelector("#exploreQ"),s=e.querySelector("#exploreGo"),a=e.querySelector("#exploreClear"),i=e.querySelector("#exploreCity"),n=e.querySelector("#exploreState"),o=()=>Kl(e,(t==null?void 0:t.value)||"");s==null||s.addEventListener("click",o);function r(){var v;clearTimeout(c),t&&(t.value=""),i&&(i.value=""),n&&(n.value="");const h=e.querySelector("#exploreResultsWrap");h&&(h.innerHTML=_i(null)),(v=e.querySelector("#exploreLiveInsert"))==null||v.remove();const g=e.querySelector("#exploreSearchStatus");g&&(g.textContent="Ready to search PIKK."),f("Cleared")}a==null||a.addEventListener("click",r);let c;t==null||t.addEventListener("input",()=>{clearTimeout(c),c=setTimeout(o,220)});for(const h of[i,n])h==null||h.addEventListener("input",()=>{clearTimeout(c),c=setTimeout(o,220)}),h==null||h.addEventListener("keydown",g=>{g.key==="Escape"&&(t!=null&&t.value||i!=null&&i.value||n!=null&&n.value)?(g.preventDefault(),r(),h.focus()):g.key==="Enter"&&(g.preventDefault(),clearTimeout(c),o())});t==null||t.addEventListener("keydown",h=>{h.key==="Escape"&&(t.value||i!=null&&i.value||n!=null&&n.value)?(h.preventDefault(),r(),t.focus()):h.key==="Enter"&&(h.preventDefault(),clearTimeout(c),o())});const d=[...e.querySelectorAll("[data-explore-tab]")];function u(h,g=!1){var k;const v=(t==null?void 0:t.value)||"",b=(i==null?void 0:i.value)||"",y=(n==null?void 0:n.value)||"";if(clearTimeout(c),So({exploreTab:h}),U("/explore"),v.trim()||b.trim()||y.trim()){const S=document.getElementById("app"),$=S==null?void 0:S.querySelector("#exploreQ");if($){$.value=v;const w=S.querySelector("#exploreCity"),C=S.querySelector("#exploreState");w&&(w.value=b),C&&(C.value=y),Kl(S,v)}}g&&((k=document.getElementById("explore-tab-"+h))==null||k.focus())}d.forEach((h,g)=>{h.addEventListener("click",()=>u(h.dataset.exploreTab)),h.addEventListener("keydown",v=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(v.key))return;v.preventDefault();const b=d.length-1,y=v.key==="Home"?0:v.key==="End"?b:(g+(v.key==="ArrowRight"?1:-1)+d.length)%d.length;u(d[y].dataset.exploreTab,!0)})}),(p=e.querySelector("#exploreDiscoverable"))==null||p.addEventListener("change",h=>{So({exploreDiscoverable:!!h.target.checked}),f(h.target.checked?"Discoverable on":"Discoverable off")})}let fi=null;const Is=e=>`${Number(e)||0} vote${Number(e)===1?"":"s"}`;function mt(e){U("#/giftbattles")}function jl(){fi&&(clearInterval(fi),fi=null)}function uo(e){const t=Math.max(0,Math.ceil(e/1e3)),s=Math.floor(t/60),a=t%60;return`${s}:${String(a).padStart(2,"0")}`}const Fl="Two live streamers · 60s round · audience votes decide · gifts don't score · 24-hour champion badge · TEST MODE";function Vw(){const e=(t,s,a)=>`<div class="gb-split-tile" style="flex:1;min-width:0;text-align:center;border:2px dashed currentColor;border-radius:12px;padding:10px">
      <div class="muted" style="font-size:12px">Sample stream · preview</div>
      <strong>${t}</strong>
      <div class="gb-gifts">TEST gifts: ${s} <span class="muted">(does not score)</span></div>
      <div class="gb-score">${Is(a)}</div>
    </div>`;return`
    <div class="card" data-gb-signed-out>
      <span class="chip">TEST MODE · preview · sample data</span>
      <h3 style="margin:8px 0 4px">PIKK Battles: streamer vs streamer</h3>
      <p class="muted" style="margin:0">Two live streamers battle in a ${Yi/1e3}-second round. Then the audience votes, and the most votes wins. Viewers can send TEST gifts, but gifts don&apos;t score. The winner gets a ${Cr/36e5}-hour champion badge.</p>
      <p class="muted" style="margin:6px 0 0;font-size:12px"><em>Owner verification needed:</em> vote length (${Ea/1e3}s placeholder), tie handling, badge on a repeat or newer win, and who counts as a streamer.</p>
    </div>
    <div class="card" data-gb-preview="split" aria-label="Sample split screen (preview)">
      <h3 style="margin:0 0 8px">Sample split screen</h3>
      <div class="gb-split" style="display:flex;gap:8px;align-items:stretch">${e("Streamer A (sample)",10,2)}<div class="gb-vs" aria-hidden="true" style="align-self:center">VS</div>${e("Streamer B (sample)",25,1)}</div>
    </div>
    <div class="card" data-gb-preview="vote" aria-label="Sample vote screen (preview)">
      <div class="gb-countdown"><span class="gb-countdown-label">Vote: who won? (sample)</span> <span class="gb-countdown-clock">0:${String(Ea/1e3).padStart(2,"0")}</span></div>
      <p><strong>3 of 5 eligible viewers voted</strong> <span class="chip">sample</span></p>
      <p class="muted">In a battle, viewers tap a streamer&apos;s name to vote. Streamer A wins this sample on votes even with fewer gifts.</p>
    </div>
    `}function Hw(){return`
    <div class="card gb-rules">
      <h3>How PIKK Battles work</h3>
      <ul class="gb-rules-list">
        <li><strong>Streamer vs streamer.</strong> A live streamer invites another live streamer; the invited streamer accepts or declines. Viewers cannot be contestants.</li>
        <li>Split screen · <strong>${Yi/1e3}-second</strong> countdown starts when the invite is accepted.</li>
        <li>After the countdown, a <strong>${Ea/1e3}s audience vote</strong> <em>(vote length · owner verification needed)</em>. One vote per eligible viewer; the two streamers cannot vote.</li>
        <li><strong>Audience votes decide the winner, not gifts.</strong> Viewers can still send TEST gifts to a streamer; the gift tally is shown but does not score.</li>
        <li>Most votes wins and the winner is announced. Equal votes = tie, no badge <em>(tie handling · owner verification needed)</em>.</li>
        <li>The winner gets a <strong>${Cr/36e5}-hour champion badge</strong>, counted from the moment of the win <em>(repeat win / newer champion · owner verification needed)</em>.</li>
      </ul>
      <p class="muted" style="margin:10px 0 0">TEST MODE · TEST gifts only · no real payments, wallet charges or server events.</p>
    </div>`}function zw(e){if(!e)return`
      <div class="card">
        <h3>Champion Spotlight</h3>
        <p class="muted" style="margin:0">No active champion. Win a battle to earn the 24-hour champion badge.</p>
      </div>`;const t=Math.max(0,(e.championUntil||0)-Date.now()),s=Math.floor(t/36e5),a=Math.floor(t%36e5/6e4);return`
    <div class="card gb-champion" role="status">
      <div class="row wrap" style="gap:8px;align-items:center">
        <span class="gb-sticker-slot" aria-hidden="true">${Da("battle-crown",{className:"gift-sticker gift-sticker--battle"}).html}</span>
        <div class="chip" data-gb-badge>Champion · 24-hour badge</div>
      </div>
      <h3 class="gb-champion-name">${l(e.username)}</h3>
      <p class="muted" style="margin:0">
        ${l(Is(e.score))} · badge expires in ~${s}h ${a}m
        (<time data-gb-badge-expires datetime="${new Date(e.championUntil).toISOString()}">${l(new Date(e.championUntil).toLocaleString())}</time>)
      </p>
    </div>`}function Ww(e,t){return e?`
      <div class="card gb-live-banner">
        <span class="chip">LIVE</span>
        <strong style="margin-left:8px">${l(t.title||"Live")}</strong>
        <p class="muted" style="margin:6px 0 0">You are streaming, so you can invite another live streamer <em>(who counts as a streamer · owner verification needed)</em>.</p>
      </div>`:`
    <div class="card" data-gb-gate="not-streamer">
      <h3>Only streamers can battle</h3>
      <p class="muted">PIKK Battles are streamer vs streamer. Go live first, then invite another live streamer. Viewers cannot be contestants.</p>
      <a class="btn primary" href="#/live">Go live first</a>
    </div>`}function po(e){const t=(s,a,i,n)=>`<div class="gb-split-tile" data-gb-tile="${n}" style="flex:1;min-width:0;text-align:center;border:2px dashed currentColor;border-radius:12px;padding:10px">
      <div class="muted" style="font-size:12px">TEST MODE · placeholder stream · no camera</div>
      <strong>${l(s.name)}</strong>
      <div class="gb-gifts" id="gbGift${n}">TEST gifts: ${l(String(a))} <span class="muted">(does not score)</span></div>
      ${i==null?"":`<div class="gb-score" id="gbVotes${n}">${l(Is(i))}</div>`}
    </div>`;return`<div class="gb-split" role="group" aria-label="Split screen" style="display:flex;gap:8px;align-items:stretch">
      ${t(e.challenger,e.giftA||0,e.status==="voting"||e.status==="ended"?e.votesA||0:null,"A")}<div class="gb-vs" aria-hidden="true" style="align-self:center">VS</div>${t(e.opponent,e.giftB||0,e.status==="voting"||e.status==="ended"?e.votesB||0:null,"B")}
    </div>`}function Yw(e){return`
    <div class="card gb-battle" data-gb-status="pending">
      <h3>Invite sent</h3>
      <p><strong>${l(e.challenger.name)}</strong> invited streamer <strong>${l(e.opponent.name)}</strong>. The countdown starts when they accept.</p>
      ${po(e)}
      <p class="muted" style="margin-top:10px">Test control: act as the invited test streamer.</p>
      <div class="row wrap" style="gap:8px">
        <button type="button" class="btn primary" id="gbAccept">Accept as ${l(e.opponent.name)}</button>
        <button type="button" class="btn ghost" id="gbDecline">Decline as ${l(e.opponent.name)}</button>
      </div>
    </div>`}function Jw(e){const t=Math.max(0,(e.endsAt||0)-Date.now()),s=(a,i)=>[1,5,10].map(n=>`<button type="button" class="btn" data-gb-gift="${a}" data-kind="gift" data-amt="${n}">TEST gift ${n} → ${l(i.name)}</button>`).join("");return`
    <div class="card gb-battle" data-gb-status="active">
      <div class="gb-countdown" aria-live="polite" aria-atomic="true">
        <span class="gb-countdown-label">Time left</span>
        <span class="gb-countdown-clock" id="gbClock">${l(uo(t))}</span>
      </div>
      ${po(e)}
      <h3 style="margin-top:16px">Viewers: send a TEST gift to a streamer</h3>
      <div class="row wrap" style="gap:8px">${s("challenger",e.challenger)}</div>
      <div class="row wrap" style="gap:8px;margin-top:8px">${s("opponent",e.opponent)}</div>
      <p class="muted" style="margin:8px 0 0">TEST gifts only · they do not score; audience votes decide the winner · no wallet charge or payment.</p>
    </div>`}let $s=Sc[0];function Qw(e){const t=Math.max(0,(e.voteEndsAt||0)-Date.now()),{voted:s,eligible:a}=fm(e),i=Mr(e);i.includes($s)||($s=i[0]);const n=(e.voters||[]).includes($s);return`
    <div class="card gb-battle" data-gb-status="voting">
      <div class="gb-countdown" aria-live="polite" aria-atomic="true">
        <span class="gb-countdown-label">Vote: who won?</span>
        <span class="gb-countdown-clock" id="gbVoteClock">${l(uo(t))}</span>
      </div>
      <p class="muted" style="margin:0 0 8px">Vote window ${Ea/1e3}s <em>(owner verification needed)</em> · audience votes decide the winner, not gifts · streamers cannot vote.</p>
      ${po(e)}
      <p data-gb-turnout style="margin-top:10px"><strong>${s} of ${a} eligible viewers voted</strong> <span class="chip">TEST MODE · test viewer list</span></p>
      <label>Acting as test viewer: <select id="gbViewer">${i.map(o=>`<option ${o===$s?"selected":""}>${l(o)}</option>`).join("")}</select></label>
      ${n?'<p class="muted">This viewer already voted.</p>':`<p>Tap a streamer to vote:</p>
      <p><button type="button" class="btn primary gb-vote-tap" data-gb-vote="challenger">${l(e.challenger.name)}</button>
      <button type="button" class="btn primary gb-vote-tap" data-gb-vote="opponent">${l(e.opponent.name)}</button></p>`}
    </div>`}function Xw(e){var i,n;let t="Tie",s="Equal votes · no badge (tie handling · owner verification needed)";e.result==="win"&&e.winnerName?(t=`Winner · ${e.winnerName}`,s="24-hour champion badge awarded from the moment of the win"):e.result==="declined"&&(t="Declined",s="The invited streamer declined");const a=e.result==="win"?Da("battle-win",{className:"gift-sticker gift-sticker--battle"}).html:"";return`
    <div class="card gb-battle gb-ended" data-gb-status="ended">
      <div class="row wrap" style="gap:8px;align-items:center">
        ${a?`<span class="gb-sticker-slot" aria-hidden="true">${a}</span>`:""}
        <div class="chip">${e.result==="win"?"Winner":e.result==="tie"?"Tie":"Ended"}</div>
      </div>
      <h3 class="gb-winner-banner">${l(t)}</h3>
      <p class="muted">${l(s)}</p>
      <p class="gb-score-text" style="margin:12px 0">
        Votes: ${l(((i=e.challenger)==null?void 0:i.name)||"?")} ${l(String(e.scoreA))} —
        ${l(((n=e.opponent)==null?void 0:n.name)||"?")} ${l(String(e.scoreB))} · TEST gifts (not scored): ${l(String(e.giftA||0))} — ${l(String(e.giftB||0))}
      </p>
      <button type="button" class="btn primary" id="gbClear">New battle</button>
    </div>`}function Zw(e,t){if(!e)return"";const s=vm().map(a=>`<option value="${l(a.id)}">${l(a.name)} — ${l(a.bio)}</option>`).join("");return`
    <div class="card">
      <h3>Invite a live streamer</h3>
      ${t.invitationsEnabled?"":'<p class="gb-warn">Invitations are disabled in prefs — enable below to invite.</p>'}
      <label class="field"><span>Streamer</span><select id="gbOpponent">${s}</select></label>
      <div class="row wrap" style="gap:8px;margin-top:12px">
        <button type="button" class="btn primary" id="gbInvite" ${t.invitationsEnabled?"":"disabled"}>Send battle invite</button>
      </div>
      <p class="muted" style="margin:10px 0 0">Test streamers only · TEST MODE</p>
    </div>`}function eS(){const e=Or(10),t=e.length?e.map((s,a)=>`<li class="gb-day-row">${jt("battle-win",{className:"gift-sticker gift-sticker--xs"})}<span class="chip">#${a+1}</span><strong>${l(s.username)}</strong></li>`).join(""):'<li class="muted">No winners yet today</li>';return`
    <div class="card gb-day-board" id="gbDayWinners">
      <div class="row wrap" style="justify-content:space-between;gap:8px">
        <h3 style="margin:0">Today&apos;s winners</h3>
        <span class="chip">${e.length}/10 · won today · badge 24h</span>
      </div>
      <p class="muted" style="margin:6px 0 8px;font-size:12px">Winners of battles that ended today · TEST MODE</p>
      <ol class="gb-list gb-day-list">${t}</ol>
    </div>`}function tS(){const e=Em(12),t=Am(15),s=e.length?e.map(i=>{var o,r;const n=i.result==="win"?`Winner ${i.winnerName}`:i.result==="tie"?"Tie":i.result||i.status;return`<li>
            <strong>${l(n)}</strong>
            <span class="muted"> · ${l(((o=i.challenger)==null?void 0:o.name)||"?")} ${l(Is(i.scoreA))} vs ${l(((r=i.opponent)==null?void 0:r.name)||"?")} ${l(Is(i.scoreB))} · ${l(G(i.endedAt||i.createdAt||0))} · ${l(i.mode||"")}</span>
          </li>`}).join(""):'<li class="muted">No battles yet.</li>';return`
    <div class="card">
      <h3>Top winners (local)</h3>
      <ol class="gb-list">${t.length?t.map((i,n)=>`<li><span class="chip">#${n+1}</span> <strong>${l(i.username)}</strong> <span class="muted">${i.wins} win${i.wins===1?"":"s"} · ${l(Is(i.points))}</span></li>`).join(""):'<li class="muted">Win a battle to appear here.</li>'}</ol>
    </div>
    <div class="card">
      <h3>Battle history</h3>
      <ul class="gb-list">${s}</ul>
    </div>`}function sS(e){return`
    <div class="card">
      <h3>Battle prefs</h3>
      <label class="toggle"><span>Allow battle invitations</span>
        <input type="checkbox" id="gbPrefInvites" ${e.invitationsEnabled?"checked":""}/>
      </label>
      <p class="muted" style="margin:8px 0 0">When off, new challenges are blocked. Existing active battles can still finish.</p>
    </div>`}function Ul(){const{user:e,live:t}=D();if(!e)return M("PIKK Battles",rr("battles")+Vw(),{lead:Fl});_r();const s=Ms(),a=Lr(),i=xm(),n=!!(t&&!t.endedAt);let o="";(s==null?void 0:s.status)==="pending"?o=Yw(s):(s==null?void 0:s.status)==="active"?o=Jw(s):(s==null?void 0:s.status)==="voting"?o=Qw(s):(s==null?void 0:s.status)==="ended"?o=Xw(s):o=Zw(n,a);const r=`
    ${rr("battles")}
    ${Hw()}
    ${zw(i)}
    ${eS()}
    ${Ww(n,t)}
    ${o}
    ${tS()}
    ${sS(a)}
  `;return M("PIKK Battles",r,{lead:Fl,badge:(s==null?void 0:s.status)==="active"?"BATTLE":i?"CHAMP":void 0})}function Gl(e){var a,i,n,o,r,c,d;jl(),(a=e.querySelector("#gbPrefInvites"))==null||a.addEventListener("change",u=>{bm({invitationsEnabled:u.target.checked}),f(u.target.checked?"Invitations on":"Invitations off")}),(i=e.querySelector("#gbInvite"))==null||i.addEventListener("click",()=>{var h;const u=ym({opponentId:(h=e.querySelector("#gbOpponent"))==null?void 0:h.value}),p={signin:"Sign in first",invites_disabled:"Invitations disabled",not_streamer:"Only live streamers can invite",opponent_not_streamer:"You can only invite a live streamer",battle_in_progress:"Battle already in progress",self:"Pick another streamer"};if(u!=null&&u.error)return f(p[u.error]||String(u.error));f("Invite sent · waiting for the streamer to accept"),mt()});const t=()=>{var u,p;return(p=(u=Ms())==null?void 0:u.opponent)==null?void 0:p.id};(n=e.querySelector("#gbAccept"))==null||n.addEventListener("click",()=>{const u=km({actorId:t()});if(u!=null&&u.error)return f(String(u.error));f("Battle started · 1:00"),mt()}),(o=e.querySelector("#gbDecline"))==null||o.addEventListener("click",()=>{const u=wm({actorId:t()});if(u!=null&&u.error)return f(String(u.error));f("Invite declined"),mt()}),(r=e.querySelector("#gbClear"))==null||r.addEventListener("click",()=>{const u=Sm();if(u!=null&&u.error)return f("Battle still running");mt()}),e.querySelectorAll("[data-gb-gift]").forEach(u=>{u.addEventListener("click",()=>{var v;const p=$m({side:u.dataset.gbGift,kind:u.dataset.kind||"gift",amount:Number(u.dataset.amt)||2,label:u.dataset.label||""});if(p!=null&&p.error)return f(p.error==="signin"?"Sign in first":"No active battle");if(((v=p.battle)==null?void 0:v.status)==="ended"){f(p.battle.result==="win"?`Winner · ${p.battle.winnerName}`:"Tie!"),mt();return}const h=e.querySelector("#gbGiftA"),g=e.querySelector("#gbGiftB");h&&g?(h.firstChild.textContent=`TEST gifts: ${p.battle.giftA} `,g.firstChild.textContent=`TEST gifts: ${p.battle.giftB} `):mt()})}),(c=e.querySelector("#gbViewer"))==null||c.addEventListener("change",u=>{$s=u.target.value,mt()}),e.querySelectorAll("[data-gb-vote]").forEach(u=>{u.addEventListener("click",()=>{const p=gm({viewerId:$s,side:u.dataset.gbVote});if(p!=null&&p.error)return f(String(p.error));f("Vote counted"),mt()})});const s=e.querySelector("#gbClock")||e.querySelector("#gbVoteClock");if(s){const u=(d=Ms())==null?void 0:d.status;fi=setInterval(()=>{const p=_r();if(!p||p.status!==u){jl(),(p==null?void 0:p.status)==="ended"&&f(p.result==="win"?`Winner · ${p.winnerName}`:"Tie!"),mt();return}const h=Math.max(0,((p.status==="voting"?p.voteEndsAt:p.endsAt)||0)-Date.now());s.textContent=uo(h)},250)}}function Ce(){U("#/multiguest")}function aS(e){return(String(e||"?").trim().slice(0,2)||"?").toUpperCase()}function iS(e){const t=D().user;return!t||!e?!1:(t.following||[]).includes(e)}function mo(e){return((e==null?void 0:e.guests)||[]).filter(t=>t.status==="joined")}function nS(e){return((e==null?void 0:e.guests)||[]).filter(t=>t.status==="invited")}function cr(e,t){var a,i;return`${Number(((i=(a=e==null?void 0:e.giftSplit)==null?void 0:a.shares)==null?void 0:i[t])||0).toFixed(0)}%`}function rS(){return M("Multi-Guest Live",`<div class="card">
      <h3>Sign in required</h3>
      <p class="muted">Start a multi-guest demo session as host. No camera / WebRTC — fake stage tiles only.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,{lead:"Invite 2–4 co-hosts · disclosed gift splits · TEST MODE"})}function oS(){return`
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
    </div>`}function Rn({role:e,name:t,sub:s,muted:a,empty:i,followId:n}){if(i)return`
      <div class="mg-tile mg-tile-empty" aria-label="Empty guest slot">
        <div class="mg-avatar mg-avatar-empty">+</div>
        <div class="mg-tile-name muted">Open slot</div>
        <div class="mg-tile-sub muted">Invite a guest</div>
      </div>`;const o=a?'<span class="chip">Muted</span>':"",r=n&&n!=="dbs"?iS(n)?`<button class="btn ghost mg-follow" data-follow="${l(n)}" data-on="1">Following</button>`:`<button class="btn ghost mg-follow" data-follow="${l(n)}" data-on="0">Follow</button>`:n==="dbs"?'<a class="btn ghost" href="#/profile">Follow PIKK</a>':"";return`
    <div class="mg-tile ${e==="host"?"mg-tile-host":""} ${a?"mg-muted":""}">
      <div class="mg-avatar" aria-hidden="true">${l(aS(t))}</div>
      <div class="mg-tile-name">${l(t)}</div>
      <div class="mg-tile-sub">${l(s||"")} ${o}</div>
      <div class="mg-tile-actions">${r}</div>
    </div>`}function lS(e){var n,o;const t=mo(e),s=[];s.push(Rn({role:"host",name:e.hostName,sub:"Host",followId:e.hostId===((n=D().user)==null?void 0:n.id)?"dbs":e.hostId}));for(let r=0;r<(e.maxGuests||4);r++){const c=t[r];c?s.push(Rn({role:"guest",name:c.username,sub:"Guest",muted:c.muted,followId:c.id})):s.push(Rn({empty:!0}))}const a=(o=e.giftSplit)!=null&&o.disclosed?'<span class="chip">Split disclosed</span>':'<span class="chip">Split pending</span>',i=e.broadcastReady?'<span class="chip">Broadcast ready</span>':'<span class="chip">Setup</span>';return`
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
    </div>`}function cS(e){const t=Tm(),s=new Set((e.guests||[]).filter(u=>u.status==="invited"||u.status==="joined").map(u=>u.id)),a=t.filter(u=>u.id!==e.hostId&&!s.has(u.id)),i=nS(e),n=mo(e),o=a.length?a.map(u=>`<option value="${l(u.id)}">${l(u.username)} — ${l(u.bio||"demo")}</option>`).join(""):'<option value="">No more demo guests</option>',r=i.length?i.map(u=>`
        <li class="mg-guest-row">
          <span><strong>@${l(u.username)}</strong> <span class="chip">Invited</span></span>
          <span class="row wrap" style="gap:6px">
            <button class="btn primary mg-accept" data-id="${l(u.id)}">Accept (sim)</button>
            <button class="btn ghost mg-decline" data-id="${l(u.id)}">Decline</button>
          </span>
        </li>`).join(""):'<li class="muted">No pending invites.</li>',c=n.length?n.map(u=>`
        <li class="mg-guest-row">
          <span>
            <strong>@${l(u.username)}</strong>
            ${u.muted?'<span class="chip">Muted</span>':'<span class="chip">On stage</span>'}
            <span class="muted" style="font-size:12px"> · gift ${l(cr(e,u.id))}</span>
          </span>
          <span class="row wrap" style="gap:6px">
            <button class="btn ghost mg-mute" data-id="${l(u.id)}" data-muted="${u.muted?"1":"0"}">
              ${u.muted?"Unmute":"Mute"}
            </button>
            <button class="btn ghost mg-leave" data-id="${l(u.id)}">Leave (sim)</button>
            <button class="btn ghost danger mg-remove" data-id="${l(u.id)}">Remove</button>
          </span>
        </li>`).join(""):'<li class="muted">No guests on stage yet — invite below.</li>',d=n.length+i.length>=(e.maxGuests||4);return`
    <div class="card">
      <h3>Guests &amp; moderation</h3>
      <p class="muted" style="margin:0 0 8px">Host simulates Accept/Decline. Up to ${l(String(e.maxGuests||4))} guests.</p>
      <ul class="mg-list">${c}</ul>
      <h4 style="margin:14px 0 6px">Pending invites</h4>
      <ul class="mg-list">${r}</ul>
      <div class="field" style="margin-top:12px">
        <span>Invite demo guest</span>
        <div class="row wrap" style="gap:8px;margin-top:6px">
          <select id="mgInviteSelect" ${d||!a.length?"disabled":""}>${o}</select>
          <button class="btn primary" id="mgInviteBtn" ${d||!a.length?"disabled":""}>Invite</button>
        </div>
      </div>
      ${d?'<p class="muted" style="margin:8px 0 0">Guest slots full (joined + pending).</p>':""}
    </div>`}function dS(e){var o,r;const t=mo(e),s=[{id:e.hostId,username:e.hostName,role:"Host"},...t.map(c=>({id:c.id,username:c.username,role:"Guest"}))],a=((o=e.giftSplit)==null?void 0:o.mode)||"equal",i=!!((r=e.giftSplit)!=null&&r.disclosed),n=s.map(c=>{var u,p;const d=Number(((p=(u=e.giftSplit)==null?void 0:u.shares)==null?void 0:p[c.id])||0);return`
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
      <p class="muted" style="margin:8px 0 0">Host share: <strong>${l(cr(e,e.hostId))}</strong>
        · Guests: ${t.length?t.map(c=>`@${l(c.username)} ${l(cr(e,c.id))}`).join(" · "):"none yet"}</p>
      ${i?`<p class="mg-ok" style="margin:10px 0 0">✓ Split disclosed ${e.giftSplit.disclosedAt?"· "+G(e.giftSplit.disclosedAt):""}. Broadcast ready (demo).</p>`:`<div class="row wrap" style="gap:8px;margin-top:12px">
               ${a==="custom"?'<button class="btn" id="mgSplitApply">Apply custom %</button>':""}
               <button class="btn primary" id="mgDisclose">Disclose &amp; ready broadcast</button>
             </div>
             <p class="muted" style="margin:8px 0 0">Custom % must total 100 among host + joined guests.</p>`}
    </div>`}function uS(e){return`
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
    </div>`}function Vl(e){return e.length?`
    <div class="card">
      <h3>Recent multi-guest sessions</h3>
      <ul class="mg-list">${e.slice(0,8).map(s=>{var i;const a=(s.guests||[]).filter(n=>n.status==="joined"||n.joinedAt).length;return`<li><strong>${l(s.title)}</strong> · ${l(String(a))} guests · ${G(s.endedAt||s.startedAt)}
        ${(i=s.giftSplit)!=null&&i.disclosed?" · split disclosed":""}</li>`}).join("")}</ul>
    </div>`:`
      <div class="card">
        <h3>Recent multi-guest sessions</h3>
        <p class="muted" style="margin:0">No ended sessions yet.</p>
      </div>`}function pS(e){return`
    <div class="card">
      <h3>Start multi-guest session</h3>
      <p class="muted">You host as <strong>@${l(e.username)}</strong>. Invite demo contacts next — no real stream.</p>
      <div class="field" style="margin-top:10px">
        <span>Session title</span>
        <input id="mgTitle" maxlength="80" placeholder="e.g. Friday collab freestyle" value="PIKK Multi-Guest Demo" />
      </div>
      <button class="btn primary" id="mgStart" style="margin-top:12px">Start as host</button>
    </div>`}function mS(){const t=D().user;if(!t)return rS();Ji();const s=Aa(),a=Cm();return!s||s.endedAt?M("Multi-Guest Live",`${oS()}${pS(t)}${Vl(a)}`,{lead:"2–4 co-hosts · gift split disclosure · TEST MODE"}):M("Multi-Guest Live",`${lS(s)}${cS(s)}${dS(s)}${uS(s)}${Vl(a)}`,{lead:"Active collab session · fake stage · TEST MODE"})}function hS(e){var s,a,i,n,o,r,c,d,u;if(!e)return;(s=e.querySelector("#mgStart"))==null||s.addEventListener("click",()=>{var g;const p=((g=e.querySelector("#mgTitle"))==null?void 0:g.value)||"",h=Pm(p);if(h.error==="signin")return f("Sign in first");if(h.error==="session_in_progress")return f("Session already active");f("Multi-guest session started"),Ce()}),(a=e.querySelector("#mgEnd"))==null||a.addEventListener("click",()=>{const p=Nm();if(p.error)return f(p.error==="host_only"?"Host only":"No session");f("Session ended"),Ce()}),(i=e.querySelector("#mgInviteBtn"))==null||i.addEventListener("click",()=>{var g,v;const p=(g=e.querySelector("#mgInviteSelect"))==null?void 0:g.value;if(!p)return f("Pick a guest");const h=Im(p);if(h.error==="full")return f("Guest slots full");if(h.error==="already_invited")return f("Already invited");if(h.error)return f("Invite failed: "+h.error);f("Invited @"+(((v=h.guest)==null?void 0:v.username)||p)),Ce()}),e.querySelectorAll(".mg-accept").forEach(p=>{p.addEventListener("click",()=>{var g;const h=Mm(p.getAttribute("data-id"));if(h.error==="full")return f("Stage full");if(h.error)return f("Accept failed");f("@"+(((g=h.guest)==null?void 0:g.username)||"")+" joined"),Ce()})}),e.querySelectorAll(".mg-decline").forEach(p=>{p.addEventListener("click",()=>{if(Lm(p.getAttribute("data-id")).error)return f("Decline failed");f("Invite declined"),Ce()})}),e.querySelectorAll(".mg-mute").forEach(p=>{p.addEventListener("click",()=>{const h=p.getAttribute("data-id"),g=p.getAttribute("data-muted")==="1";if(Om(h,!g).error)return f("Mute failed");f(g?"Unmuted":"Muted"),Ce()})}),e.querySelectorAll(".mg-leave").forEach(p=>{p.addEventListener("click",()=>{if(Dm(p.getAttribute("data-id")).error)return f("Leave failed");f("Guest left"),Ce()})}),e.querySelectorAll(".mg-remove").forEach(p=>{p.addEventListener("click",()=>{if(_m(p.getAttribute("data-id")).error)return f("Remove failed");f("Guest removed"),Ce()})}),e.querySelectorAll(".mg-follow").forEach(p=>{p.addEventListener("click",()=>{const h=p.getAttribute("data-follow");p.getAttribute("data-on")==="1"?(Ui(h),f("Unfollowed")):(Fi(h),f("Following")),Ce()})}),(n=e.querySelector("#mgSplitEqual"))==null||n.addEventListener("click",()=>{if(ra({mode:"equal",disclose:!1}).error)return f("Split failed");f("Equal split applied"),Ce()}),(o=e.querySelector("#mgSplitCustom"))==null||o.addEventListener("click",()=>{var g;const p=Aa();if(ra({mode:"custom",shares:((g=p==null?void 0:p.giftSplit)==null?void 0:g.shares)||{},disclose:!1}).error)return f("Could not switch to custom");f("Custom split — edit % then Apply"),Ce()}),(r=e.querySelector("#mgSplitApply"))==null||r.addEventListener("click",()=>{const p={};e.querySelectorAll(".mg-share-input").forEach(g=>{p[g.getAttribute("data-id")]=Number(g.value)||0});const h=ra({mode:"custom",shares:p,disclose:!1});if(h.error==="split_total")return f(`Percents total ${h.total}% — need 100%`);if(h.error)return f("Apply failed");f("Custom split saved"),Ce()}),(c=e.querySelector("#mgDisclose"))==null||c.addEventListener("click",()=>{var g;const p=Aa();if(((g=p==null?void 0:p.giftSplit)==null?void 0:g.mode)==="custom"){const v={},b=e.querySelectorAll(".mg-share-input");if(b.length){b.forEach(k=>{v[k.getAttribute("data-id")]=Number(k.value)||0});const y=ra({mode:"custom",shares:v,disclose:!1});if(y.error==="split_total")return f(`Percents total ${y.total}% — need 100%`)}}const h=Rm();if(h.error==="split_total")return f(`Percents total ${h.total}% — need 100%`);if(h.error)return f("Disclose failed");f("Gift split disclosed · broadcast ready (demo)"),Ce()});const t=()=>{const p=e.querySelector("#mgChatInput"),h=(p==null?void 0:p.value)||"",g=qm(h);if(g.error==="empty")return f("Type a message");if(g.error)return f("Chat failed");p&&(p.value=""),Ce()};(d=e.querySelector("#mgChatSend"))==null||d.addEventListener("click",t),(u=e.querySelector("#mgChatInput"))==null||u.addEventListener("keydown",p=>{p.key==="Enter"&&(p.preventDefault(),t())})}function Pe(e){U(e?`#/fanclubs?club=${encodeURIComponent(e)}`:"#/fanclubs")}function ht(e="DemoFan"){const{user:t}=D();if(t)return t;const s=_a(e);return f(`Signed in as ${e} · local demo`),s||D().user}function Hu(e){return e==="paid"?"Paid / PIKK+":e==="members"?"Members only":"Public"}function fS(e,t){const s=t===e.id,a=[e.official?'<span class="chip">Official DBS</span>':"",`<span class="chip">${l(Hu(e.privacy))}</span>`,`<span class="chip">${e.memberCount||0} members</span>`].filter(Boolean).join(" ");return`<button type="button" class="fanclub-card${s?" on":""}" data-open-club="${l(e.id)}" data-search="${l(`${e.name||""} ${e.hostName||""} ${e.description||""}`)}" aria-label="Open ${l(e.name)} club">
    <div class="row" style="gap:10px;align-items:center">
      <img src="${l(e.graphic||"/brand/pikk-logo-square.png")}" alt="" width="48" height="48" style="border-radius:12px;object-fit:cover;background:#111" />
      <div style="flex:1;min-width:0">
        <strong>${l(e.name)}</strong>
        <div class="muted" style="font-size:12px;margin-top:2px">Host @${l(e.hostName)} · Discover DatBoiSkeet</div>
        <div class="row wrap" style="gap:6px;margin-top:6px">${a}</div>
      </div>
    </div>
  </button>`}function gS(e){const t=Ba(e);if(!t)return'<div class="card"><p class="muted" style="margin:0">Club not found.</p><button class="btn" data-back-list>Back to clubs</button></div>';const s=D().user,a=_c(t.id),i=ph(t.id),n=Ca(t.id),o=Oc(t.id),r=Ft(),c=o.ok?"":`<div class="card" style="border-color:rgba(245,158,11,.35)">
          <h3 style="margin:0 0 6px">${t.privacy==="paid"?"PIKK+ room":"Members only"}</h3>
          <p class="muted" style="margin:0 0 10px">${t.privacy==="paid"?"This room uses membership permissions (PIKK+ or higher). TEST MODE unlock below — no real charge.":"Join the club to enter the discussion room."}</p>
          ${t.privacy==="paid"?`<button class="btn primary" id="fcUnlockSkeet">Unlock PIKK+ · TEST MODE</button>
                 <a class="btn" href="#/pricing">Pricing</a>
                 <p class="chip" style="margin-top:8px">Current membership: ${l(r||"none")}</p>`:`<button class="btn primary" data-join="${l(t.id)}">Join club</button>`}
        </div>`,d=o.ok?mh(t.id):[],u=o.ok?d.length?d.map(h=>{const g=n?`<div class="row wrap" style="gap:6px;margin-top:6px">
                   <button class="btn ghost" data-pin="${l(h.id)}" data-club="${l(t.id)}">${h.pinned?"Unpin":"Pin"} · mod</button>
                   <button class="btn ghost" data-remove="${l(h.id)}" data-club="${l(t.id)}">Remove · mod</button>
                 </div>`:"";return`<li style="padding:10px 0;border-top:1px solid rgba(255,255,255,.06)">
              <div class="row" style="justify-content:space-between;gap:8px">
                <strong>@${l(h.username)}</strong>
                <span class="muted" style="font-size:12px">${l(G(h.at))}${h.pinned?" · pinned":""}</span>
              </div>
              <p style="margin:6px 0 0">${l(h.text)}</p>
              ${g}
            </li>`}).join(""):'<li class="muted" style="padding:8px 0">No posts yet — start the discussion.</li>':"",p=o.ok?`<form id="fcPostForm" class="card" style="margin-top:10px">
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
            <span class="chip">${l(Hu(t.privacy))}</span>
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
    ${o.ok?`<div class="card">
             <h3 style="margin:0 0 4px">Discussion</h3>
             <p class="muted" style="margin:0 0 8px;font-size:12px">Local posts in dbs_v1 · mods can pin/remove</p>
             <ul class="list-plain" id="fcPosts">${u}</ul>
           </div>
           ${p}`:""}
  `}function vS(e){var d;lt();const t=Lc(),s=((d=e==null?void 0:e.query)==null?void 0:d.club)||"",{user:a}=D(),i=t.map(u=>fS(u,s)).join(""),n=t.filter(u=>u.privacy==="public").length,o=t.length-n,r=`
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
        ${Oa()?'<button class="btn ghost" type="button" id="fcAdmin">Toggle demo admin</button>':""}
        <p class="chip" style="margin-top:10px">TEST MODE · no real payments · DBS branding stays prominent</p>
      </form>
    </div>`,c=s?gS(s):`
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
    `;return M("Fan Clubs",`<div class="fanclubs-studio">${c}</div>`,{lead:"Creator communities inside DBS Lounge · DEMO.",badge:"Phase 2 demo"})}function bS(e){var a,i,n,o,r,c,d;e.querySelectorAll("[data-fc-jump]").forEach(u=>u.addEventListener("click",()=>{var h;const p=u.getAttribute("data-fc-jump");(h=e.querySelector(`#${p}`))==null||h.scrollIntoView({behavior:"smooth",block:"start"})}));const t=e.querySelector("#fcSearch"),s=()=>{const u=String((t==null?void 0:t.value)||"").trim().toLocaleLowerCase(),p=[...e.querySelectorAll(".fanclub-card[data-search]")];let h=0;p.forEach(b=>{const y=(b.dataset.search||"").toLocaleLowerCase().includes(u);b.hidden=!y,y&&(h+=1)});const g=e.querySelector("#fcSearchStatus");g&&(g.textContent=`Showing ${h} of ${p.length} clubs`);const v=e.querySelector("#fcNoResults");v&&(v.hidden=h>0||!u)};t==null||t.addEventListener("input",s),t==null||t.addEventListener("keydown",u=>{u.key!=="Escape"||!t.value||(u.preventDefault(),u.stopPropagation(),t.value="",s())}),e.querySelectorAll("[data-open-club]").forEach(u=>{u.addEventListener("click",()=>Pe(u.getAttribute("data-open-club")))}),(a=e.querySelector("[data-back-list]"))==null||a.addEventListener("click",()=>Pe()),(i=e.querySelector("#fcSignIn"))==null||i.addEventListener("click",()=>{ht("DemoFan"),Pe()}),(n=e.querySelector("#fcAdmin"))==null||n.addEventListener("click",()=>{var p,h;ht("DemoAdmin");const u=!ee();Gi(u),f(u?"Demo admin on":"Demo admin off"),Pe(((p=e.querySelector("[data-leave],[data-join]"))==null?void 0:p.getAttribute("data-leave"))||((h=e.querySelector("[data-join]"))==null?void 0:h.getAttribute("data-join"))||void 0)}),(o=e.querySelector("#fcSeedBtn"))==null||o.addEventListener("click",()=>{lt({force:!0}),f("Demo clubs reseeded"),Pe()}),(r=e.querySelector("#fcCreateForm"))==null||r.addEventListener("submit",u=>{var y,k,S,$,w;u.preventDefault(),ht("DemoCreator");const p=(y=e.querySelector("#fcName"))==null?void 0:y.value,h=(k=e.querySelector("#fcDesc"))==null?void 0:k.value,g=((S=e.querySelector("#fcGraphic"))==null?void 0:S.value)||"/brand/pikk-logo-square.png",v=(($=e.querySelector("#fcPrivacy"))==null?void 0:$.value)||"public",b=lh({name:p,description:h,graphic:g,privacy:v});if(b.error==="signin")return f("Sign in required");if(b.error==="name")return f("Name required");f("Club created · TEST MODE"),Pe((w=b.club)==null?void 0:w.id)}),e.querySelectorAll("[data-join]").forEach(u=>{u.addEventListener("click",()=>{ht();const p=u.getAttribute("data-join");if(Dc(p).error)return f("Could not join");f("Joined club"),Pe(p)})}),e.querySelectorAll("[data-leave]").forEach(u=>{u.addEventListener("click",()=>{ht();const p=u.getAttribute("data-leave"),h=ch(p);if(h.error==="host")return f("Host cannot leave — transfer later");if(h.error)return f("Could not leave");f("Left club"),Pe(p)})}),e.querySelectorAll("[data-follow]").forEach(u=>{u.addEventListener("click",()=>{ht();const p=u.getAttribute("data-follow");dh(p),f("Following · optional"),Pe(p)})}),e.querySelectorAll("[data-unfollow]").forEach(u=>{u.addEventListener("click",()=>{ht();const p=u.getAttribute("data-unfollow");uh(p),f("Unfollowed"),Pe(p)})}),(c=e.querySelector("#fcUnlockSkeet"))==null||c.addEventListener("click",()=>{ht(),ji("skeet+",!0),f("PIKK+ unlocked · TEST MODE");const u=new URLSearchParams(location.hash.split("?")[1]||"");Pe(u.get("club")||void 0)}),(d=e.querySelector("#fcPostForm"))==null||d.addEventListener("submit",u=>{var b;u.preventDefault(),ht();const h=new URLSearchParams(location.hash.split("?")[1]||"").get("club"),g=(b=e.querySelector("#fcPostText"))==null?void 0:b.value,v=hh(h,g);if(v.error==="gated")return f("Room gated");if(v.error==="empty")return f("Write something");if(v.error)return f("Could not post");f("Posted"),Pe(h)}),e.querySelectorAll("[data-pin]").forEach(u=>{u.addEventListener("click",()=>{const p=u.getAttribute("data-club");if(fh(p,u.getAttribute("data-pin")).error==="mod")return f("Mods only");f("Pin toggled · TEST MODE"),Pe(p)})}),e.querySelectorAll("[data-remove]").forEach(u=>{u.addEventListener("click",()=>{const p=u.getAttribute("data-club");if(gh(p,u.getAttribute("data-remove")).error==="mod")return f("Mods only");f("Post removed · TEST MODE"),Pe(p)})})}function dr(){U("#/loyalty")}function ur(){const{user:e}=D();if(e)return e;const t=_a("LoyalFan");return f("Signed in as LoyalFan · local demo"),t||D().user}function si(e,t,s){var i;ur();const a=zh(e,{points:t,note:s});if(a.error==="signin")return f("Sign in required");if(a.error==="cooldown")return f("Anti-farming · wait a few seconds");if(a.error==="daily_cap")return f("Daily cap hit · come back tomorrow (demo)");if(a.error)return f("Could not record");(a.newBadges||[]).filter(n=>n!=="day_one"||(a.loyalty.badges||[]).includes("day_one")),(i=a.newBadges)!=null&&i.length?f(`+${t} pts · badge: ${a.newBadges.join(", ")}`):f(`+${t} pts · ${s}`),dr()}function yS(){const{user:e}=D(),t=ja(),a=td().map(o=>{const r=o.unlocked;return`<div class="card" style="opacity:${r?1:.55};margin:0">
        <div class="row" style="justify-content:space-between;gap:8px">
          <strong>${l(o.name)}</strong>
          <span class="chip">${r?"Unlocked":"Locked"}</span>
        </div>
        <p class="muted" style="margin:6px 0 0;font-size:12px">${l(o.blurb)}</p>
      </div>`}).join(""),i=(t.history||[]).length===0?'<p class="muted" style="margin:0">No actions yet — try a listen tick or join a club.</p>':`<ul class="list-plain">${(t.history||[]).slice(0,12).map(o=>`<li style="padding:8px 0;border-top:1px solid rgba(255,255,255,.06)">
            <div class="row" style="justify-content:space-between">
              <span><strong>+${o.points}</strong> · ${l(o.note||o.kind)}</span>
              <span class="muted" style="font-size:12px">${l(G(o.at))}</span>
            </div>
          </li>`).join("")}</ul>`,n=t.publicVisible?"Your badges & points can appear on your profile (demo flag).":"History & achievements are private — only you see them here.";return M("Loyalty Club",`
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
    `,{lead:"Recognition for healthy participation · DEMO.",badge:"Phase 2 demo"})}function kS(e){var t,s,a,i,n,o;(t=e.querySelector("#loyListen"))==null||t.addEventListener("click",()=>si("listen",5,"Authorized listening tick")),(s=e.querySelector("#loyLive"))==null||s.addEventListener("click",()=>si("live",8,"Attended live (stub)")),(a=e.querySelector("#loyHelp"))==null||a.addEventListener("click",()=>si("help",6,"Shared community helper tip")),(i=e.querySelector("#loyClub"))==null||i.addEventListener("click",()=>{ur(),lt();const r=Lc(),c=r.find(d=>d.privacy==="public")||r[0];c&&Dc(c.id),si("club",10,c?`Joined ${c.name}`:"Joined Fan Club")}),(n=e.querySelector("#loyPublic"))==null||n.addEventListener("change",r=>{ur(),Hh(r.target.checked),f(r.target.checked?"Public visibility on":"Achievements private"),dr()}),(o=e.querySelector("#loyReset"))==null||o.addEventListener("click",()=>{Wh(),f("Loyalty demo reset"),dr()})}function Qt(){U("#/openmic")}function Nn(e="MicHopeful"){const{user:t}=D();if(t)return t;const s=_a(e);return f(`Signed in as ${e} · local demo`),s||D().user}function Hl(e){return`<span class="chip">${l(e==="approved"?"Approved":e==="rejected"?"Rejected":"Pending")}</span>`}function wS(){const e=Qh(),t=e.chipLabel||"House rotation",s=e.embed?yt(e.embed,"rel=0"):"";return`
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
    </div>`}function SS(){Us();const{user:e}=D(),t=ee(),s=Jh(),a=e?Yn().filter(d=>d.userId===e.id):[],i=t?Yn({status:"pending"}):[],n=a.filter(d=>d.status==="pending").length,o=s.length===0?'<p class="muted" style="margin:0">No approved performers yet.</p>':s.map(d=>`<article class="card" style="margin:0 0 10px">
              <div class="row" style="justify-content:space-between;gap:8px">
                <div>
                  <strong>${l(d.trackTitle)}</strong>
                  <div class="muted" style="font-size:12px">@${l(d.username)} · ${l(d.talent)}</div>
                </div>
                ${Hl("approved")}
              </div>
              <p style="margin:8px 0 0">${l(d.profileNote||"Featured in PIKK Open Mic showcase.")}</p>
              <p class="muted" style="font-size:11px;margin:8px 0 0">Not a paid ranking · discovery showcase</p>
            </article>`).join(""),r=a.length===0?'<p class="muted" style="margin:0">You have no applications yet.</p>':`<ul class="list-plain">${a.map(d=>`<li style="padding:10px 0;border-top:1px solid rgba(255,255,255,.06)">
              <div class="row" style="justify-content:space-between">
                <strong>${l(d.trackTitle)}</strong>
                ${Hl(d.status)}
              </div>
              <div class="muted" style="font-size:12px">${l(d.talent)} · ${l(G(d.at))}</div>
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
        <div><span>Your applications</span><strong>${a.length}</strong><small>On this device</small></div>
        <div><span>Awaiting review</span><strong>${n}</strong><small>Your pending submissions</small></div>
      </section>
    ${wS()}

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
        ${Oa()?`<button class="btn ghost" id="omAdmin">${t?"Admin on":"Toggle demo admin"}</button>`:""}
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
    `,{lead:"24/7 house catalog when idle · opt-in talent showcase · DEMO.",badge:"Phase 2 demo"})}function $S(e){var t,s,a,i,n;e.querySelectorAll("[data-om-jump]").forEach(o=>{o.addEventListener("click",()=>{const r=o.getAttribute("data-om-jump"),c=r==="omApplyCard"||r==="omShowcaseCard"?e.querySelector("#"+r):null;c==null||c.scrollIntoView({behavior:"smooth",block:"start"})})}),(t=e.querySelector("#omSignIn"))==null||t.addEventListener("click",()=>{Nn(),Qt()}),(s=e.querySelector("#omAdmin"))==null||s.addEventListener("click",()=>{Nn("DemoAdmin");const o=!ee();Gi(o),f(o?"Demo admin on":"Demo admin off"),Qt()}),(a=e.querySelector("#omSeed"))==null||a.addEventListener("click",()=>{Us({force:!0}),f("Open Mic demos reseeded"),Qt()}),(i=e.querySelector("#omForm"))==null||i.addEventListener("submit",o=>{var d,u,p,h;o.preventDefault(),Nn();const r=(d=e.querySelector("#omRights"))==null?void 0:d.checked,c=Zh({talent:(u=e.querySelector("#omTalent"))==null?void 0:u.value,trackTitle:(p=e.querySelector("#omTitle"))==null?void 0:p.value,profileNote:(h=e.querySelector("#omNote"))==null?void 0:h.value,rightsCertified:!!r});if(c.error==="rights")return f("Rights certification required");if(c.error==="title")return f("Title required");if(c.error==="pending")return f("You already have a pending application");if(c.error)return f("Could not submit");f("Application submitted · pending review"),Qt()}),e.querySelectorAll("[data-om-approve]").forEach(o=>{o.addEventListener("click",()=>{if(Jn(o.getAttribute("data-om-approve"),"approved").error==="admin")return f("Admin only");f("Approved · showcase"),Qt()})}),e.querySelectorAll("[data-om-reject]").forEach(o=>{o.addEventListener("click",()=>{if(Jn(o.getAttribute("data-om-reject"),"rejected","Demo reject").error==="admin")return f("Admin only");f("Rejected"),Qt()})}),(n=e.querySelector("#omNextHouse"))==null||n.addEventListener("click",()=>{const o=Xh();f("Next house · "+(o.chipLabel||"House")),Qt()})}let Ge=null,ss="all";try{const e=sessionStorage.getItem("dbs_shop_cat");e&&(ss=e,sessionStorage.removeItem("dbs_shop_cat"));const t=sessionStorage.getItem("dbs_shop_preview");t&&(Ge=t,sessionStorage.removeItem("dbs_shop_preview"))}catch{}function It(){U("#/profile-shop")}function _t(e){return ii.find(t=>t.id===e)||null}function zu(e){return sd(e)}function ES(e){const t={...e.equipped},s=Ge?_t(Ge):null;if(s){const a=zu(s);a&&(t[a]=s.id)}return t}function xS(e){return`rarity-${l(e||"rare")}`}function AS(e){return`$${Number(e).toFixed(2)}`}function TS(e){const{user:t}=D(),s=ES(e),a=s.frame?_t(s.frame):null,i=s.effect?_t(s.effect):null,n=s.banner?_t(s.banner):null,o=s.nameStyle?_t(s.nameStyle):null,r=s.badge?_t(s.badge):null,c=(t==null?void 0:t.username)||"DemoFan",d=e.reduceMotion,u=i?`shop-fx shop-fx--${l(i.id.replace(/^fx-/,""))}${d?" shop-fx--still":""}`:"",p=o?`shop-name shop-name--${l(o.id.replace(/^name-/,""))}`:"shop-name",h=a?`shop-avatar-frame shop-frame--${l(a.id.replace(/^frame-/,""))}`:"shop-avatar-frame";return`
    <div class="shop-preview card" id="shopPreview">
      <div class="row wrap" style="justify-content:space-between;gap:8px;margin-bottom:10px">
        <h3 style="margin:0">Live preview</h3>
        <span class="chip">CONCEPT</span>
      </div>
      <div class="${n?`shop-preview-banner shop-banner--${l(n.id.replace(/^ban-/,""))}`:"shop-preview-banner shop-banner--default"}" aria-hidden="true">
        <span class="shop-banner-emoji">${n?l(n.emoji):"🎧"}</span>
      </div>
      <div class="shop-preview-body ${u}">
        <div class="${h}">
          <div class="shop-avatar-inner">${l(c.slice(0,1).toUpperCase())}</div>
          ${a?`<span class="shop-frame-emoji" aria-hidden="true">${l(a.emoji)}</span>`:""}
        </div>
        <div class="shop-preview-meta">
          <div class="${p}">${l(c)}</div>
          <p class="muted small" style="margin:4px 0 0">Cosmetic preview only · not a status grant</p>
          ${r?`<span class="shop-cosmetic-badge" title="Cosmetic style — not Verified/Founder">${l(r.emoji)} ${l(r.name)}</span>`:'<span class="muted small">No cosmetic badge equipped</span>'}
        </div>
      </div>
      <div class="shop-equipped-row">
        ${["frame","effect","banner","nameStyle","badge"].map(v=>{const b=s[v],y=b?_t(b):null,k=v==="nameStyle"?"Name":v.charAt(0).toUpperCase()+v.slice(1);return`<span class="shop-eq-chip ${y?"on":""}">${l(k)}: ${y?l(y.emoji+" "+y.name):"—"}</span>`}).join("")}
      </div>
    </div>`}function CS(e,t){const s=t.owned.includes(e.id),a=zu(e),i=a&&t.equipped[a]===e.id,n=Ge===e.id;return`
    <article class="cosmetic-card ${xS(e.rarity)} ${n?"is-selected":""} ${s?"is-owned":""} ${i?"is-equipped":""}" data-id="${l(e.id)}">
      <div class="cosmetic-art" role="button" tabindex="0" data-preview="${l(e.id)}" aria-label="Preview ${l(e.name)}">
        <span class="cosmetic-emoji">${l(e.emoji)}</span>
        <span class="concept-flag">CONCEPT</span>
        ${s?'<span class="owned-flag">Owned</span>':""}
        ${i?'<span class="equipped-flag">Equipped</span>':""}
      </div>
      <div class="body">
        <div class="name">${l(e.name)}</div>
        <div class="meta">${l(e.category)} · ${l(e.rarity)}</div>
        <div class="price">${AS(e.price)} <span class="chip" style="margin-left:4px">TEST MODE</span></div>
        <div class="cosmetic-actions row wrap" style="gap:6px;margin-top:8px">
          <button type="button" class="btn ghost shop-act" data-act="preview" data-id="${l(e.id)}">Preview</button>
          ${s?i?`<button type="button" class="btn shop-act" data-act="unequip" data-slot="${l(a)}" data-id="${l(e.id)}">Unequip</button>`:`<button type="button" class="btn primary shop-act" data-act="equip" data-id="${l(e.id)}">Equip</button>`:`<button type="button" class="btn primary shop-act" data-act="unlock" data-id="${l(e.id)}">Unlock · TEST MODE</button>`}
        </div>
      </div>
    </article>`}function PS(){const e=Kt(),t=ss==="all"?ii:ii.filter(n=>n.category===ss),s=mp.map(n=>`<button type="button" class="shop-chip ${ss===n.id?"on":""}" data-cat="${l(n.id)}" aria-pressed="${ss===n.id?"true":"false"}">${l(n.label)}</button>`).join(""),a=t.length===0?'<p class="muted">No cosmetics in this category.</p>':`<div class="cosmetic-grid">${t.map(n=>CS(n,e)).join("")}</div>`,i=`
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

    ${TS(e)}

    <div class="card">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center;margin-bottom:10px">
        <h3 style="margin:0">Catalog · ${ii.length} items</h3>
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
  `;return M("Profile Shop",i,{lead:"PIKK digital cosmetics · live preview · CONCEPT / TEST MODE.",badge:"Phase 2 · CONCEPT"})}function IS(e){var s,a,i;e.querySelectorAll(".shop-chip").forEach(n=>{n.addEventListener("click",()=>{ss=n.dataset.cat||"all",It();const o=[...document.querySelectorAll(".shop-chip")].find(r=>r.dataset.cat===ss);o==null||o.focus()})}),(s=e.querySelector("#shopReduceMotion"))==null||s.addEventListener("change",n=>{cf(n.target.checked),f(n.target.checked?"Motion reduced":"Motion on"),It()}),(a=e.querySelector("#shopBundle"))==null||a.addEventListener("click",()=>{var o;const n=nf();f(`Starter bundle unlocked · ${((o=n.unlocked)==null?void 0:o.length)||0} items · no charge`),It()}),(i=e.querySelector("#shopReset"))==null||i.addEventListener("click",()=>{df(),Ge=null,f("Demo inventory reset"),It()});const t=n=>{Ge=n,f("Preview updated"),It()};e.querySelectorAll("[data-preview]").forEach(n=>{n.addEventListener("click",()=>t(n.dataset.preview)),n.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),t(n.dataset.preview))})}),e.querySelectorAll(".shop-act").forEach(n=>{n.addEventListener("click",()=>{const o=n.dataset.act,r=n.dataset.id;if(o==="preview")return t(r);if(o==="unlock"){const c=af(r);return c.error?f("Could not unlock"):(Ge=r,f(c.already?"Already owned · TEST MODE":"Unlocked · TEST MODE · no charge"),It())}if(o==="equip"){const c=of(r);return c.error==="not_owned"?f("Unlock first · TEST MODE"):c.error?f("Could not equip"):(Ge=r,f("Equipped"),It())}if(o==="unequip"){const c=n.dataset.slot;if(lf(c).error)return f("Could not unequip");const u=Ge?_t(Ge):null;return u&&sd(u)===c&&(Ge=null),f("Unequipped"),It()}})})}const MS=["All","Hats","Shirts","Jackets"],LS=["Ladies Shop","Men's Shop","Beauty & Hair","Fashion & Accessories","Lifestyle & Home","Creator Brands","Live Shopping","Deals"];function DS(e,t="All",s=""){const a=String(s||"").trim().toLocaleLowerCase();return e.filter(i=>(t==="All"||i.category===t)&&(!a||`${i.name} ${i.category}`.toLocaleLowerCase().includes(a)))}function _S(e,t="featured"){const s=[...e];return t==="price-asc"?s.sort((a,i)=>Number(a.price)-Number(i.price)):t==="price-desc"?s.sort((a,i)=>Number(i.price)-Number(a.price)):t==="name-asc"?s.sort((a,i)=>String(a.name).localeCompare(String(i.name))):s}function OS(e){return`
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
    </article>`}function qS(){const e=MS.map(i=>`<button type="button" class="chip pikk-chip pikk-shop-filter${i==="All"?" on":""}"
      data-category="${l(i)}" aria-pressed="${i==="All"?"true":"false"}">${l(i)}</button>`).join(""),t=LS.map(i=>`<li><span>${l(i)}</span><span class="chip">Coming Soon</span></li>`).join(""),a=[Re.find(i=>i.id==="jacket-black")||Re.find(i=>i.category==="Jackets"),Re.find(i=>i.id==="hat-716-orange")||Re.find(i=>i.category==="Hats"),Re.find(i=>i.id==="tee-ptsd")||Re.find(i=>i.category==="Shirts")].filter(Boolean).map(i=>'<a class="pikk-shop-featured-product" href="'+l(i.shopUrl)+'" target="_blank" rel="noopener noreferrer" aria-label="View '+l(i.name)+' on Foreign X-Change"><img src="'+l(i.image)+'" alt="'+l(i.name)+'" loading="eager" decoding="async" /><span>'+l(i.category)+"</span></a>").join("");return M("PIKK Shop",`
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
      <p class="muted small" id="pikkShopCount" aria-live="polite">${Re.length} items</p>
      <div class="merch-grid pikk-shop-premium-grid pikk-shop-real-grid" id="pikkShopProducts">${Re.map(OS).join("")}</div>
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
  `,{lead:"Physical merchandise · external checkout · future verified storefronts"})}function RS(e){var h;const t=e.querySelector("#pikkShopSearch"),s=[...e.querySelectorAll(".pikk-shop-product")],a=[...e.querySelectorAll(".pikk-shop-filter, .pikk-shop-category")],i=e.querySelector("#pikkShopCount"),n=e.querySelector("#pikkShopEmpty"),o=e.querySelector("#pikkShopReset"),r=e.querySelector("#pikkShopSort"),c=e.querySelector("#pikkShopProducts"),d=new Map(s.map(g=>[g.dataset.productId,g]));let u="All";function p(){const g=new Set(DS(Re,u,(t==null?void 0:t.value)||"").map(v=>v.id));for(const v of _S(Re,(r==null?void 0:r.value)||"featured")){const b=d.get(v.id);b&&(c==null||c.appendChild(b))}for(const v of s){const b=g.has(v.dataset.productId);v.hidden=!b,v.style.display=b?"":"none"}if(i&&(i.textContent=`${g.size} ${g.size===1?"item":"items"}`),n&&(n.hidden=g.size>0),o){const v=u!=="All"||!!(t!=null&&t.value.trim())||((r==null?void 0:r.value)||"featured")!=="featured";o.hidden=!v,o.style.display=v?"":"none"}for(const v of a){const b=v.dataset.category===u;v.setAttribute("aria-pressed",String(b)),v.classList.toggle("on",b)}}t==null||t.addEventListener("input",p),t==null||t.addEventListener("keydown",g=>{g.key!=="Escape"||!t.value||g.isComposing||(g.preventDefault(),g.stopPropagation(),t.value="",p())}),r==null||r.addEventListener("change",p),o==null||o.addEventListener("click",()=>{u="All",t&&(t.value=""),r&&(r.value="featured"),p(),t==null||t.focus()}),(h=e.querySelector("[data-shop-scroll]"))==null||h.addEventListener("click",()=>{var g,v,b;t==null||t.focus({preventScroll:!0}),(b=e.querySelector("#pikkShopCatalog"))==null||b.scrollIntoView({behavior:(v=(g=window.matchMedia)==null?void 0:g.call(window,"(prefers-reduced-motion: reduce)"))!=null&&v.matches?"instant":"smooth",block:"start"})});for(const g of a)g.addEventListener("click",()=>{var v;u=g.dataset.category||"All",p(),g.classList.contains("pikk-shop-category")&&((v=e.querySelector("#pikkShopCatalog"))==null||v.scrollIntoView({behavior:"auto",block:"start"}))})}let gi=null;function he(){U("#/spotlight")}function Bn(){gi&&(clearInterval(gi),gi=null)}function Wu(e){const t=Math.max(0,Math.ceil(e/1e3)),s=Math.floor(t/60),a=t%60;return`${s}:${String(a).padStart(2,"0")}`}function ho(e){return e==="freestyle"?"Live Freestyle":e==="beat"?"Beat":e==="music_video"?"Music Video":"Song"}function NS(e){const t=D().user;return!t||!e?!1:(t.following||[]).includes(e)}function fo(){return!!D().user}function BS(){return M("24/7 Spotlight",`<div class="card">
      <h3>Sign in required</h3>
      <p class="muted">Join the FIFO Spotlight queue, vote Keep Going / Play Another, and chat from a local demo account.</p>
      <a class="btn primary" href="#/profile">Sign in</a>
    </div>`,{lead:"Continuous music showcase · votes ≠ paid advantage · TEST MODE"})}function KS(e){return`
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
    </div>`}function jS(e,{showSkip:t=!0}={}){const s=e.chipLabel||e.status||"House rotation",a=e.embed?yt(e.embed,"rel=0"):"";return`
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
        ${e.cover?`<img class="sp-cover" src="${l(bt(e.cover))}" alt="" />`:""}
        <div>
          <div class="sp-now-title">${l(e.title)}</div>
          <div class="sp-now-meta">${l(e.artist||"DatBoiSkeet")} · house catalog</div>
          <p class="muted sp-note">${l(e.note||"Approved catalog filler · not a live act")}</p>
          ${e.youtube?`<p style="margin:8px 0 0"><a class="btn ghost" href="${l(e.youtube)}" target="_blank" rel="noopener">Open on YouTube</a></p>`:""}
        </div>
      </div>
      ${t&&fo()?`<div class="row wrap" style="gap:8px;margin-top:12px">
               <button class="btn" id="spSkipHouse">Skip house · next</button>
               <span class="muted" style="font-size:12px;align-self:center">Join queue takes the stage over house · Skip advances catalog</span>
             </div>`:""}
    </div>`}function FS(e,t){if(!e||e.house){const v=e&&e.house?{id:e.id,title:e.title,artist:e.artist,embed:e.embed,youtube:e.youtube,chipLabel:e.chipLabel||"House · Music Video",note:e.note,cover:e.cover,kind:e.houseKind}:Pc();return jS(v)}const s=D().user,a=e.type==="freestyle",i=a&&e.endsAt?Math.max(0,e.endsAt-Date.now()):null,n=Object.keys(e.keepGoingVotes||{}).length,o=Object.keys(e.playAnotherVotes||{}).length,r=e.userId,c=NS(r),d=s&&s.id===e.userId,u=e.reactions||{fire:0,heart:0,clap:0},p=a?`<div class="sp-timer" aria-live="polite">
         <div class="sp-timer-label">Freestyle timer · ext ${e.extensions||0}/${t.maxExtensions}</div>
         <div class="sp-timer-clock" id="spClock">${Wu(i||0)}</div>
         <div class="muted" style="font-size:12px">Keep Going ${n}/${t.keepGoing} · refresh recovers endsAt</div>
       </div>`:`<div class="sp-timer">
         <div class="sp-timer-label">Uploaded · play ${e.playCount||1}/${t.maxUploadStreak}</div>
         <div class="muted" style="font-size:12px">No real audio in TEST MODE · use End set when finished</div>
       </div>`,h=e.awaitingPlayAnother?`<div class="card sp-vote">
         <h3>Play Another?</h3>
         <p class="muted">Audience vote · ${o}/${t.playAnother} · window ends ${e.playAnotherDeadline?G(e.playAnotherDeadline):"soon"} (deadline-based)</p>
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
         </div>`:"",g=d?"":c?`<button class="btn ghost sp-follow" data-follow="${l(r)}" data-on="1">Following</button>`:`<button class="btn ghost sp-follow" data-follow="${l(r)}" data-on="0">Follow</button>`;return`
    <div class="card sp-stage">
      <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center">
        <div class="chip">On stage · ${l(ho(e.type))}</div>
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
      ${p}
      <div class="row wrap sp-reacts" style="gap:8px;margin-top:10px">
        <button class="btn ghost sp-react" data-kind="fire">🔥 ${u.fire||0}</button>
        <button class="btn ghost sp-react" data-kind="heart">❤️ ${u.heart||0}</button>
        <button class="btn ghost sp-react" data-kind="clap">👏 ${u.clap||0}</button>
      </div>
    </div>
    ${h}`}function US(e,t,s){const a=r=>Math.max(1,(r+(t?1:0))*2),i=(e||[]).map((r,c)=>`
      <li class="sp-q-row">
        <div>
          <strong>${l(r.username)}</strong>
          <span class="muted"> · ${l(ho(r.type))} · ${l(r.title)}</span>
          <div class="muted" style="font-size:12px">${c===0?"Next up":`#${c+1}`} · ~${a(c)} min wait (stub)</div>
        </div>
        <div class="row wrap" style="gap:6px">
          ${s&&r.userId===s.id?'<button class="btn ghost sp-leave-q">Leave</button>':""}
          ${fo()?`<button class="btn ghost sp-remove-q" data-qid="${l(r.id)}" title="Demo moderator">Remove</button>`:""}
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
    </div>`}function GS(e){if(!fo())return"";const t=ee()?"Admin":"Demo moderator · TEST MODE",s=e&&!e.house;return`
    <div class="card sp-mod">
      <h3>Moderator controls</h3>
      <p class="muted" style="margin-top:0"><span class="chip">${l(t)}</span> Skip / remove for safety · fair order otherwise. House Skip → next queue or next house.</p>
      <div class="row wrap" style="gap:8px">
        <button class="btn" id="spSkip" ${e?"":"disabled"}>Skip current</button>
        ${s&&e.type!=="freestyle"&&!e.awaitingPlayAnother?'<button class="btn ghost" id="spEndSet">End set</button>':""}
      </div>
    </div>`}function VS(e){const t=D().user;return!e||e.house||e.type==="freestyle"||e.awaitingPlayAnother||!t||t.id!==e.userId?"":`
    <div class="card">
      <h3>Your set</h3>
      <p class="muted">No real audio file — tap End set when your demo track “finishes”.</p>
      <button class="btn primary" id="spEndSetSelf">End set</button>
    </div>`}function HS(e){return!e||e.house?"":`
    <div class="card sp-chat-card">
      <h3>Stage chat</h3>
      <div class="sp-chat" id="spChat">${(e.chat||[]).slice(-20).map(s=>`<div class="sp-chat-row ${s.system?"system":""}"><strong>${l(s.username)}</strong>${l(s.text)}</div>`).join("")||'<div class="muted">No messages yet</div>'}</div>
      <form id="spChatForm" class="row" style="gap:8px;margin-top:8px">
        <input id="spChatInput" maxlength="200" placeholder="Say something…" style="flex:1" />
        <button class="btn primary" type="submit">Send</button>
      </form>
    </div>`}function zS(e){return e.length?`
    <div class="card">
      <h3>Recent stage</h3>
      <ul class="sp-list">${e.slice(0,12).map(s=>`<li><strong>${l(s.username)}</strong> · ${l(ho(s.type))} · ${l(s.title)}
         <span class="muted"> · ${l(s.reason||"ended")} · ${G(s.endedAt)}</span></li>`).join("")}</ul>
    </div>`:`
      <div class="card">
        <h3>Recent stage</h3>
        <p class="muted" style="margin:0">No completed turns yet.</p>
      </div>`}function WS(){pe();const e=D().user;if(!e)return BS();const t=ce(),s=oh(12);return M("24/7 Spotlight",`${KS(t.thresholds)}
     ${FS(t.nowPlaying,t.thresholds)}
     ${VS(t.nowPlaying)}
     ${GS(t.nowPlaying)}
     ${US(t.queue,t.nowPlaying,e)}
     ${HS(t.nowPlaying)}
     ${zS(s)}`,{lead:"Always-on music showcase · FIFO queue · votes ≠ wagers · TEST MODE"})}function YS(e){var n,o,r,c,d,u,p,h,g,v,b;Bn(),pe();const s=ce().nowPlaying;if(s&&s.type==="freestyle"&&s.endsAt){const y=e.querySelector("#spClock");gi=setInterval(()=>{pe();const k=ce().nowPlaying;if(!k||k.type!=="freestyle"||!k.endsAt){Bn(),he();return}const S=Math.max(0,k.endsAt-Date.now());y&&(y.textContent=Wu(S)),S<=0&&(Bn(),pe(),he())},250)}if(s&&s.awaitingPlayAnother&&s.playAnotherDeadline){const y=Math.max(0,s.playAnotherDeadline-Date.now())+50;setTimeout(()=>{pe(),he()},Math.min(y,35e3))}(n=e.querySelector("#spJoinForm"))==null||n.addEventListener("submit",y=>{var C,P,q;y.preventDefault();const k=((C=e.querySelector("#spType"))==null?void 0:C.value)||"song",S=((P=e.querySelector("#spTitle"))==null?void 0:P.value)||"",$=((q=e.querySelector("#spArtist"))==null?void 0:q.value)||"",w=Qm({type:k,title:S,artist:$});if(w.error==="signin")return f("Sign in first");if(w.error==="already_queued")return f("You already have a queue/stage spot");f(k==="freestyle"?"Freestyle — you're up or in queue":"Joined Spotlight queue"),he()}),(o=e.querySelector("#spLeaveQueue"))==null||o.addEventListener("click",()=>{if(Do().error)return f("Not in queue");f("Left queue"),he()}),e.querySelectorAll(".sp-leave-q").forEach(y=>{y.addEventListener("click",()=>{Do(),f("Left queue"),he()})}),e.querySelectorAll(".sp-remove-q").forEach(y=>{y.addEventListener("click",()=>{Xm(y.getAttribute("data-qid")),f("Removed from queue (demo mod)"),he()})});const a=()=>{ce().nowPlaying,Zm();const y=ce().nowPlaying;y&&y.house?f("Next house · "+(y.chipLabel||"House")):f(y?"Skipped · "+(y.username||"next")+" on stage":"Skipped"),he()};(r=e.querySelector("#spSkip"))==null||r.addEventListener("click",a),(c=e.querySelector("#spSkipHouse"))==null||c.addEventListener("click",a);const i=()=>{const y=eh();if(y.error==="max_streak"||y.ok){f(y.error==="max_streak"?"Max 3 in a row — advancing":"Play Another? vote open"),he();return}y.error?f("Cannot end set: "+y.error):he()};(d=e.querySelector("#spEndSet"))==null||d.addEventListener("click",i),(u=e.querySelector("#spEndSetSelf"))==null||u.addEventListener("click",i),(p=e.querySelector("#spKeepGoing"))==null||p.addEventListener("click",()=>{const y=th();if(y.error==="already_voted")return f("Already voted");if(y.error==="max_extensions")return f("Max extensions reached");if(y.error)return f(y.error);f("Keep Going counted"),he()}),(h=e.querySelector("#spSimKeepGoing"))==null||h.addEventListener("click",()=>{sh(2),f("+2 simulated fan votes"),he()}),(g=e.querySelector("#spPlayAnother"))==null||g.addEventListener("click",()=>{const y=ah();if(y.error==="already_voted")return f("Already voted");if(y.error)return f(y.error);f("Play Another vote counted"),he()}),(v=e.querySelector("#spSimPlayAnother"))==null||v.addEventListener("click",()=>{ih(2),f("+2 simulated fan votes"),he()}),e.querySelectorAll(".sp-follow").forEach(y=>{y.addEventListener("click",()=>{const k=y.getAttribute("data-follow");y.getAttribute("data-on")==="1"?(Ui(k),f("Unfollowed")):(Fi(k),f("Following")),he()})}),e.querySelectorAll(".sp-react").forEach(y=>{y.addEventListener("click",()=>{nh(y.getAttribute("data-kind")||"fire"),he()})}),(b=e.querySelector("#spChatForm"))==null||b.addEventListener("submit",y=>{y.preventDefault();const k=e.querySelector("#spChatInput"),S=rh((k==null?void 0:k.value)||"");if(S.error!=="empty"){if(S.error)return f(S.error);k&&(k.value=""),he()}})}const Yu="Not available — WebRTC + age assurance required before launch";function sa(){U("#/connect")}function JS(){var u;const e=Wc(),s=Vt().selected||[],a=Fh(),i=Qc(),n=Number(i==null?void 0:i.max)||0,o=!!a,r=e.map(p=>{const h=s.includes(p.id),g=p.connected?`<span class="chip">Linked${p.handle?" · "+l(p.handle):""}</span>`:'<span class="chip muted-chip">Not linked</span>';return`
      <div class="connect-mp-plat ${p.connected?"on":""}" data-plat="${l(p.id)}">
        <div class="row wrap" style="justify-content:space-between;gap:8px;align-items:center">
          <div>
            <strong>${l(p.label)}</strong>
            <div class="muted" style="font-size:12px">${l(p.hint||"")}</div>
          </div>
          ${g}
        </div>
        <div class="row wrap" style="gap:6px;margin-top:8px;align-items:center">
          ${p.connected?`<button type="button" class="btn ghost connect-mp-disconnect" data-id="${l(p.id)}">Unlink</button>
                 <label class="connect-mp-select">
                   <input type="checkbox" class="connect-mp-dest" data-id="${l(p.id)}" ${h?"checked":""} ${o?"disabled":""} />
                   Include
                 </label>`:`<button type="button" class="btn primary connect-mp-connect" data-id="${l(p.id)}">Link</button>`}
        </div>
      </div>`}).join(""),c=s.length,d=o?`<button type="button" class="btn danger" id="connectMpEnd">End multi-platform session</button>
       <span class="chip">LIVE · ${l(String(((u=a==null?void 0:a.destinations)==null?void 0:u.length)||c))} dest · TEST MODE</span>`:`<button type="button" class="btn primary" id="connectMpGoLive" ${c?"":"disabled"}>Go live to selected</button>
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
    </div>`}function pr(){const e=Xc(),t=e.ageConfirmed&&e.rulesAccepted;return M("PIKK Connect",`<div class="connect-monkey" id="connectMonkey">
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
          <strong>${Yu}</strong>
          <p class="muted small">TEST MODE — this is a preview, not a real matching request. No match was created, no camera was requested, and no WebRTC connection was attempted.</p>
        </div>
        <p class="muted small" style="margin-top:10px">Controls are mockups until launch. Prefs save on this device.</p>
      </div>

      ${JS()}

      <div class="card">
        <p class="muted" style="margin:0 0 8px">PIKK Connect <strong>does not replace</strong> Live, Messages, or Spotlight. Meanwhile:</p>
        <a class="btn" href="#/live">Live</a> <a class="btn" href="#/messages">Messages</a> <a class="btn" href="#/spotlight">Spotlight</a> <a class="btn ghost" href="#/shorts">Shorts / Clips</a>
      </div>
    </div>`,{lead:"1:1 discovery shell · multi-platform go-live · TEST MODE",badge:"Shell · no WebRTC"})}function QS(e){var t,s;e.querySelectorAll(".connect-mp-connect").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.id,n=Oh(i,"");if(n!=null&&n.error)return f(String(n.error));f(`Linked ${i} · TEST MODE`),sa()})}),e.querySelectorAll(".connect-mp-disconnect").forEach(a=>{a.addEventListener("click",()=>{qh(a.dataset.id),f("Unlinked · TEST MODE"),sa()})}),e.querySelectorAll(".connect-mp-dest").forEach(a=>{a.addEventListener("change",()=>{Nh(a.dataset.id),sa()})}),(t=e.querySelector("#connectMpGoLive"))==null||t.addEventListener("click",()=>{const a=Kh();if((a==null?void 0:a.error)==="signin")return f("Sign in first");if((a==null?void 0:a.error)==="none_selected")return f("Select at least one destination");if(a!=null&&a.error)return f(String(a.error));f("Multi-platform session started · TEST MODE"),sa()}),(s=e.querySelector("#connectMpEnd"))==null||s.addEventListener("click",()=>{jh(),f("Session ended"),sa()})}function mr(e=document,t){var i,n,o;const s=()=>{if(typeof t=="function")return t();e.innerHTML=pr(),mr(e)};(i=e.querySelector("#connect-age"))==null||i.addEventListener("change",r=>{const c=r.target.checked;Ro(c?{ageConfirmed:!0}:{ageConfirmed:!1,rulesAccepted:!1}),s()}),(n=e.querySelector("#connect-rules"))==null||n.addEventListener("change",r=>{Ro({rulesAccepted:r.target.checked}),s()}),(o=e.querySelector("#connect-start"))==null||o.addEventListener("click",()=>{const r=e.querySelector("#connect-blocked");r==null||r.removeAttribute("hidden"),f(Yu)}),QS(e);const a=Ye().elementId;(a==="connect-random-chat"||a==="connect-multistream")&&requestAnimationFrame(()=>{var r,c,d,u;(u=e.querySelector(`#${a}`))==null||u.scrollIntoView({behavior:(d=(c=(r=globalThis.window)==null?void 0:r.matchMedia)==null?void 0:c.call(r,"(prefers-reduced-motion: reduce)"))!=null&&d.matches?"instant":"smooth",block:"start"})})}const Ju="pikk_forum_local_v1",ns=[["music","Music & Artists","♫"],["business","Business & Money","$"],["relationships","Relationships","♡"],["gaming","Gaming","♜"],["sports","Sports","★"],["entertainment","Entertainment","▶"],["lifestyle","Lifestyle","✦"],["general","General Discussion","#"]],hr=new Set(ns.map(e=>e[0])),aa=e=>String(e||"").trim();function ia(){try{const e=JSON.parse(localStorage.getItem(Ju)||"{}");return{posts:Array.isArray(e.posts)?e.posts.filter(t=>t&&hr.has(t.topic)).slice(-150):[],votes:e.votes&&typeof e.votes=="object"?e.votes:{},hidden:Array.isArray(e.hidden)?e.hidden:[]}}catch{return{posts:[],votes:{},hidden:[]}}}function ai(e){try{return localStorage.setItem(Ju,JSON.stringify(e)),!0}catch{return f("Local storage unavailable"),!1}}function XS(e,t,s,a){var o;let i=e.posts.filter(r=>!e.hidden.includes(r.id)&&(s==="all"||r.topic===s));const n=r=>Object.entries(e.votes).reduce((c,d)=>c+(d[0].startsWith(r.id+":")&&Number(d[1])||0),0);if(i.sort((r,c)=>{var d,u;return a==="top"?n(c)-n(r):a==="discussed"?(((d=c.replies)==null?void 0:d.length)||0)-(((u=r.replies)==null?void 0:u.length)||0):c.when-r.when}),!i.length){const r=((o=ns.find(d=>d[0]===s))==null?void 0:o[1])||"this community";return'<div class="pikk-forum-empty" role="status">'+(s==="all"?"No discussions yet. Start the first conversation on this browser.":"No discussions in "+l(r)+" yet. Choose All discussions to browse other topics, or start a conversation here.")+"</div>"}return i.map(r=>{var p;const c=((p=ns.find(h=>h[0]===r.topic))==null?void 0:p[1])||"Community",d=Array.isArray(r.replies)?r.replies:[],u=Number(e.votes[r.id+":"+((t==null?void 0:t.id)||"guest")])||0;return'<article class="pikk-forum-post"><div class="pikk-forum-votes"><button data-fvote="1" data-id="'+l(r.id)+'" aria-label="Upvote '+l(r.title)+'" aria-pressed="'+(u===1)+'" '+(t?"":"disabled")+">▲</button><b>"+n(r)+'</b><button data-fvote="-1" data-id="'+l(r.id)+'" aria-label="Downvote '+l(r.title)+'" aria-pressed="'+(u===-1)+'" '+(t?"":"disabled")+'>▼</button></div><div class="pikk-forum-post-content"><p class="pikk-forum-meta">'+l(c)+" · u/"+l(r.author)+" · local preview</p><h3>"+l(r.title)+'</h3><p class="pikk-forum-text">'+l(r.body)+'</p><button class="pikk-forum-reply-button" data-fopen="'+l(r.id)+'" aria-expanded="false" aria-controls="pikk-forum-thread-'+l(r.id)+'">▤ '+d.length+" replies</button> "+(t&&t.id!==r.owner?'<button class="pikk-forum-reply-button" data-freport="'+l(r.id)+'">◇ Hide / report locally</button>':"")+'<div class="pikk-forum-thread" id="pikk-forum-thread-'+l(r.id)+'" data-thread="'+l(r.id)+'" hidden>'+d.map(h=>'<p class="pikk-forum-comment"><strong>'+l(h.author)+"</strong> "+l(h.body)+"</p>").join("")+(t?'<form data-freply="'+l(r.id)+'"><label for="pikk-forum-reply-'+l(r.id)+'">Reply</label><textarea id="pikk-forum-reply-'+l(r.id)+'" maxlength="1000" required rows="2" placeholder="Join the discussion"></textarea><button class="btn primary" type="submit">Reply · local</button></form>':'<a href="#/profile" class="btn ghost">Sign in to reply</a>')+"</div></div></article>"}).join("")}function ZS(){const e=D().user,t=ns.map(s=>'<button data-ftopic="'+s[0]+'" type="button" aria-pressed="false"><span>'+s[2]+"</span>"+l(s[1])+"</button>").join("");return M("PIKK Communities",'<section class="pikk-forum-hero"><p class="kicker">PIKK CONNECT · TOPICS & DISCUSSIONS</p><h2>Find your people. <span>Start the conversation.</span></h2><p>Explore communities around what matters to you. Discuss, upvote, reply and discover new ideas.</p><a class="btn ghost" href="#/community">PIKK Lounge</a> <a class="btn ghost" href="#/posts">Social Posts</a></section><p class="pikk-forum-warning"><b>TEST MODE:</b> These conversations and votes are saved only in this browser. No public posting, account verification or server-side moderation is active.</p><div id="pikkForum" class="pikk-forum-layout"><aside class="pikk-forum-sidebar"><h3>Explore topics</h3><button class="on" data-ftopic="all" aria-pressed="true">✦ All discussions</button>'+t+'</aside><main class="pikk-forum-center"><nav class="pikk-forum-sort" aria-label="Sort posts"><button class="on" data-fsort="new" aria-pressed="true">✦ New</button><button data-fsort="top" aria-pressed="false">▲ Top</button><button data-fsort="discussed" aria-pressed="false">▤ Discussed</button></nav><div class="pikk-forum-topic-board"><h3>Discover communities</h3><div class="pikk-forum-topic-cards">'+ns.map(s=>'<button data-ftopic="'+s[0]+'" aria-pressed="false"><span>'+s[2]+"</span><strong>"+l(s[1])+"</strong></button>").join("")+'</div></div><section class="pikk-forum-compose"><h3>Start a discussion</h3>'+(e?'<form id="pikkForumForm"><label for="pikkForumTopic">Community</label><select id="pikkForumTopic">'+ns.map(s=>'<option value="'+s[0]+'">'+l(s[1])+"</option>").join("")+'</select><label for="pikkForumTitle">Title</label><input id="pikkForumTitle" required maxlength="110" placeholder="What is on your mind?" /><label for="pikkForumBody">Discussion</label><textarea id="pikkForumBody" required maxlength="4000" rows="3" placeholder="Ask a question or share a thought..."></textarea><button class="btn primary" type="submit">Publish locally · TEST MODE</button></form>':'<p class="muted">Sign in with a PIKK demo account to write discussions and vote.</p><a href="#/profile" class="btn primary">Sign in</a>')+'</section><section><h3 class="pikk-forum-feed-title">Community discussions</h3><p id="pikkForumFilterStatus" class="muted" role="status" aria-live="polite"></p><div id="pikkForumFeed"></div></section></main><aside class="pikk-forum-info"><h3>About PIKK Communities</h3><p>Topic-based discussion with an original PIKK look, separate from the live Lounge and social feed.</p><h3>Community safety</h3><p>Respect others. No harassment, hate, scams or personal information. Reports on this preview only hide posts on your device.</p><a href="#/guidelines">Community Guidelines</a></aside></div>',{lead:"Topic communities · discussions · voting · replies · local preview"})}function e0(e){const t=e.querySelector("#pikkForum");if(!t)return;let s="all",a="new";const i=()=>D().user,n=t.querySelector("#pikkForumFeed"),o=t.querySelector("#pikkForumFilterStatus"),r=()=>{var v;const u=ia();n.innerHTML=XS(u,i(),s,a);const p=u.posts.filter(b=>!u.hidden.includes(b.id)&&(s==="all"||b.topic===s)).length,h=s==="all"?"All discussions":((v=ns.find(b=>b[0]===s))==null?void 0:v[1])||"Community",g={new:"Newest first",top:"Top voted",discussed:"Most discussed"}[a];o.textContent=`${h} · ${p} ${p===1?"discussion":"discussions"} · ${g}`},c=new URLSearchParams(location.hash.split("?")[1]||"").get("topic");hr.has(c)&&(s=c);function d(u,p,h){t.querySelectorAll(u).forEach(g=>{let v=g.dataset[p]===h;g.classList.toggle("on",v),g.setAttribute("aria-pressed",String(v))})}d("[data-ftopic]","ftopic",s),t.addEventListener("click",u=>{var y;const p=u.target.closest("[data-ftopic]");if(p){s=p.dataset.ftopic,d("[data-ftopic]","ftopic",s);const k=t.querySelector("#pikkForumTopic");k&&s!=="all"&&(k.value=s),r();return}const h=u.target.closest("[data-fsort]");if(h){a=h.dataset.fsort,d("[data-fsort]","fsort",a),r();return}const g=u.target.closest("[data-fopen]");if(g){const k=t.querySelector('[data-thread="'+g.dataset.fopen+'"]');k&&(k.hidden=!k.hidden,g.setAttribute("aria-expanded",String(!k.hidden)));return}const v=u.target.closest("[data-fvote]");if(v&&i()){const k=ia(),S=v.dataset.id+":"+i().id,$=Number(v.dataset.fvote);if(k.votes[S]=k.votes[S]===$?0:$,ai(k)){const w=v.dataset.id,C=v.dataset.fvote;r(),(y=[...n.querySelectorAll("[data-fvote]")].find(P=>P.dataset.id===w&&P.dataset.fvote===C))==null||y.focus()}return}const b=u.target.closest("[data-freport]");if(b&&i()){if(!confirm("Hide this post on this browser? This will NOT submit a report to a server."))return;const k=ia();k.hidden.push(b.dataset.freport),ai(k)&&r(),f("Hidden locally only — no server report submitted")}}),t.addEventListener("submit",u=>{var h,g,v,b;const p=u.target;if(!(!(p instanceof HTMLFormElement)||!i())){if(u.preventDefault(),p.id==="pikkForumForm"){const y=aa((h=p.querySelector("input"))==null?void 0:h.value),k=aa((g=p.querySelector("textarea"))==null?void 0:g.value),S=(v=p.querySelector("select"))==null?void 0:v.value;if(!y||!k||!hr.has(S))return;const $=ia();$.posts.push({id:"local-"+Date.now()+"-"+Math.random().toString(36).slice(2,8),owner:i().id,author:aa(i().username).slice(0,30)||"Member",title:y,body:k,topic:S,when:Date.now(),replies:[]}),ai($)&&(s=S,d("[data-ftopic]","ftopic",s),p.reset(),r(),f("Saved only on this browser · TEST MODE"))}else if(p.dataset.freply){const y=aa((b=p.querySelector("textarea"))==null?void 0:b.value);if(!y)return;const k=ia(),S=k.posts.find($=>$.id===p.dataset.freply);if(!S)return;if(S.replies||(S.replies=[]),S.replies.push({author:aa(i().username).slice(0,30)||"Member",body:y}),ai(k)){r();const $=t.querySelector('[data-thread="'+S.id+'"]'),w=t.querySelector('[data-fopen="'+S.id+'"]');$&&w&&($.hidden=!1,w.setAttribute("aria-expanded","true"),w.focus()),f("Reply saved locally")}}}}),r()}function t0(){const e=fe.filter(s=>(s.category||"")==="Music Videos"&&s.embed);return(e.length?e:fe.filter(s=>s.embed)).slice(0,10).map((s,a)=>({id:`clip_${s.id}`,videoId:s.id,title:s.title,artist:s.artist||"DatBoiSkeet",embed:s.embed,youtube:s.youtube,blurb:a%3===0?"Clip cut · DEMO":a%3===1?"Highlight · DEMO":"Short · DEMO"}))}function s0(e,t){return`
    <article class="shorts-card" data-clip-id="${l(e.id)}" id="shorts-card-${t}">
      <div class="shorts-stage">
        <div class="shorts-embed hero-video">
          <iframe
            src="${l(yt(e.embed))}"
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
    </article>`}function zl(){const e=t0(),s=`
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
      ${e.map(s0).join("")||'<p class="muted">No demo clips seeded.</p>'}
    </div>
    <p class="muted" style="margin:12px 0 0;font-size:12px;text-align:center">
      End of DEMO feed · ${e.length} clips · Scroll for more when real clip uploads ship
    </p>`;return M("Shorts / Clips",s,{lead:"Posts · short-form feed · Picture / Short / Video create on Posts · TEST MODE"})}function Wl(e){ln(e),e.querySelectorAll(".shorts-card").forEach(t=>{t.addEventListener("focusin",()=>{t.classList.add("is-focus")})}),e.querySelector(".shorts-card")||f("No demo clips · add MVs in data.js")}const Oi=[{id:"ny",name:"NY",tag:"East coast",still:"/blockwars-preview/preview-ny-still.jpg",fighter:"Brooklyn Brawler",blurb:"Street-pressured power from the five boroughs. Heavy combos, tight corners — TEST MODE teaser only."},{id:"la",name:"LA",tag:"West coast",still:"/blockwars-preview/preview-la-still.jpg",fighter:"Sunset Striker",blurb:"Flashy footwork under neon skies. Style meets speed — Coming Soon, not a real match engine."},{id:"chi",name:"Chicago",tag:"Midwest",still:"/blockwars-preview/preview-chi-still.jpg",fighter:"Windy City Wall",blurb:"Defense-first grit from the lakefront. Hold the block — lobby demo only, no live fights yet."}];function a0(e){return Oi.map(t=>{const s=t.id===e?" is-active":"",a=t.id===e?"true":"false";return`<button type="button" class="bw-city-card${s}" data-city="${l(t.id)}" aria-pressed="${a}" aria-label="${l(t.name)} fighter"><img src="${l(t.still)}" alt="" width="120" height="160" loading="lazy" decoding="async" /><span class="bw-city-meta"><span class="bw-city-name">${l(t.name)}</span><span class="bw-city-tag">${l(t.tag)}</span></span></button>`}).join("")}function i0(e){return`<div class="bw-focus" id="bwFocus" data-city="${l(e.id)}"><div class="bw-focus-still"><img id="bwFocusImg" src="${l(e.still)}" alt="${l(e.fighter)}" width="110" height="140" /></div><div class="bw-focus-copy"><p class="bw-focus-city">${l(e.name)} · ${l(e.tag)}</p><h3 id="bwFocusName">${l(e.fighter)}</h3><p id="bwFocusBlurb">${l(e.blurb)}</p></div></div>`}function n0(){const e=Oi[0],t=`
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
        ${a0(e.id)}
      </div>

      ${i0(e)}

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
    </div>`;return M("Block Wars",t,{lead:"Coming Soon · lobby fighter select · preview video · not playable yet."})}function r0(e,t){const s=Oi.find(c=>c.id===t)||Oi[0];e.querySelectorAll(".bw-city-card").forEach(c=>{const d=c.getAttribute("data-city")===s.id;c.classList.toggle("is-active",d),c.setAttribute("aria-pressed",d?"true":"false")});const a=e.querySelector("#bwFocus"),i=e.querySelector("#bwFocusImg"),n=e.querySelector("#bwFocusName"),o=e.querySelector("#bwFocusBlurb"),r=e.querySelector(".bw-focus-city");a&&a.setAttribute("data-city",s.id),i&&(i.src=s.still,i.alt=s.fighter),n&&(n.textContent=s.fighter),o&&(o.textContent=s.blurb),r&&(r.textContent=`${s.name} · ${s.tag}`)}function o0(e){var i,n;(i=e.querySelector("#bwCityGrid"))==null||i.addEventListener("click",o=>{const r=o.target.closest(".bw-city-card");r&&(o.preventDefault(),r0(e,r.getAttribute("data-city")))}),(n=e.querySelector("#bwEnterArena"))==null||n.addEventListener("click",o=>{o.preventDefault(),f("Block Wars arena is Coming Soon — lobby demo only. No match engine yet.")});const t=e.querySelector("#bwCsVideo"),s=e.querySelector("#bwCsPlay");if(!t)return;const a=()=>{if(!s)return;const o=t.paused||t.ended;s.hidden=!o,s.setAttribute("aria-hidden",o?"false":"true")};s==null||s.addEventListener("click",o=>{o.preventDefault(),t.play().catch(()=>{})}),t.addEventListener("play",()=>{_s(),a()}),t.addEventListener("pause",()=>{kt(),a()}),t.addEventListener("ended",()=>{kt(),a()}),t.addEventListener("pointerdown",()=>{t.paused||_s()}),a()}function l0(){return M("PIKK Arcade",`
    <section class="pikk-arcade-intro card" aria-label="PIKK Arcade">
      <div class="pikk-arcade-heading">
        <div>
          <p class="kicker">Play · Compete · Hang out</p>
          <div class="pikk-arcade-brand"><img src="${l(Pa({artwork:"/brand/pikk-logo-official.png"}))}" alt="PIKK" loading="eager" decoding="async"/><span>ARCADE</span></div>
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
      ${it.map((e,t)=>`
        <article class="pikk-arcade-card pikk-game-${l(e.theme)}">
          <div class="pikk-arcade-card-header"><span class="pikk-arcade-number">${t+1}</span><h3>${l(e.name)}</h3></div>
          <div class="pikk-arcade-art" aria-label="${l(e.name)} preview artwork">
            ${e.artwork?`<img src="${l(Pa(e))}" alt="${l(e.name)} concept artwork" loading="lazy" decoding="async"/>`:`<span class="pikk-arcade-symbol" aria-hidden="true">${e.icon}</span>`}
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
  `,{lead:"Fifteen upcoming games · mobile-first catalog · previews only"})}function c0(e){const t=it.length,s=(Math.trunc(Number(e)||0)%t+t)%t,a=it[s];return{index:s,total:t,title:a.name,description:a.description,players:a.players,image:Pa(a)}}function Qu(e,t){const s=String(t||"").trim().toLowerCase();return!s||[e.name,e.description].join(" ").toLowerCase().includes(s)}function Yl(e){return it.flatMap((t,s)=>Qu(t,e)?[s]:[])}function d0(e){var y;const t=e.querySelector(".pikk-arcade-grid");if(!t)return;const s=e.querySelector("#pikkArcadeSearch");if(s){const k=[...((y=t.querySelectorAll)==null?void 0:y.call(t,".pikk-arcade-card"))||[]],S=e.querySelector("#pikkArcadeSearchClear"),$=e.querySelector("#pikkArcadeSearchStatus"),w=e.querySelector("#pikkArcadeNoMatches"),C=()=>{const P=s.value;let q=0;k.forEach((E,V)=>{const A=Qu(it[V],P);E.hidden=!A,A&&q++}),S&&(S.hidden=!P),w&&(w.hidden=q!==0),$&&($.textContent=P.trim()?"Showing "+q+" of "+it.length+" games":"Showing all "+it.length+" games")};s.addEventListener("input",C),s.addEventListener("keydown",P=>{P.key!=="Escape"||!s.value||P.isComposing||(P.preventDefault(),s.value="",C())}),S==null||S.addEventListener("click",()=>{s.value="",C(),s.focus()}),C()}const a=e.querySelector("#pikkArcadeLightbox");if(!a||typeof a.showModal!="function")return;let i=0,n=null,o=Yl("");const r=a.querySelector("[data-arcade-prev]"),c=a.querySelector("[data-arcade-next]"),d=a.querySelector("[data-arcade-full-image]"),u=a.querySelector("[data-arcade-title]"),p=a.querySelector("[data-arcade-description]"),h=a.querySelector("[data-arcade-players]"),g=a.querySelector("[data-arcade-counter]"),v=k=>{const S=c0(k);i=S.index,d.src=S.image,d.alt=S.title+" concept artwork",u.textContent=S.title,p.textContent=S.description,h.textContent=S.players+(S.players==="1"?" Player · Preview only":" Players · Preview only"),g.textContent=String(o.indexOf(i)+1).padStart(2,"0")+" / "+String(o.length).padStart(2,"0")},b=k=>{const S=o.indexOf(i);if(S===-1||o.length<2)return;const $=(S+k+o.length)%o.length;v(o[$])};t.addEventListener("click",k=>{const S=k.target.closest("[data-game-preview]");if(!S)return;n=S;const $=Number(S.dataset.gamePreview);o=Yl(s==null?void 0:s.value),o.includes($)||(o=[$]),r&&(r.disabled=o.length<2),c&&(c.disabled=o.length<2),v($),a.showModal()}),a.addEventListener("click",k=>{k.target===a||k.target.closest("[data-arcade-close]")?a.close():k.target.closest("[data-arcade-prev]")?b(-1):k.target.closest("[data-arcade-next]")&&b(1)}),a.addEventListener("keydown",k=>{(k.key==="ArrowLeft"||k.key==="ArrowRight")&&(k.preventDefault(),b(k.key==="ArrowRight"?1:-1))}),a.addEventListener("close",()=>{n!=null&&n.isConnected&&n.focus()})}function u0(){return M("PIKK Dating & Connections",`
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
  `,{lead:"Dating · mutual matches · live connections"})}function p0(e){const t=new Set(["dating-discover","dating-experiences","dating-live","dating-safety"]),s=[...e.querySelectorAll("[data-dating-jump]")];function a(n,o=!1){if(!t.has(n))return;const r=e.querySelector("#"+n);if(r&&(s.forEach(c=>{const d=c.dataset.datingJump===n;c.classList.toggle("is-active",d),c.setAttribute("aria-pressed",String(d))}),o)){const c=window.matchMedia("(prefers-reduced-motion: reduce)").matches;r.scrollIntoView({behavior:c?"auto":"smooth",block:"start"}),r.focus({preventScroll:!0})}}s.forEach(n=>n.addEventListener("click",()=>a(n.dataset.datingJump,!0)));const i=Ye().elementId;t.has(i)&&window.setTimeout(()=>{e.querySelector("#"+i)&&a(i,!0)},80)}const kn=Object.freeze({roundSeconds:60,baseRounds:3,voteSeconds:10,rematchSeconds:5}),m0=Object.freeze({tiebreakerRounds:1,contestantsMayVote:!1,rematchRequiresAllContestants:!0}),qi=kn.roundSeconds,go=kn.voteSeconds,Ri=kn.rematchSeconds,ba=kn.baseRounds;let h0=0;const vo=()=>new Date().toISOString();function f0({inviterId:e,inviteeId:t,consentAccepted:s,blocked:a=!1}){if(s!==!0)return{error:"consent_required"};if(a)return{error:"blocked"};const i=vo();return{id:`test-rvi-${++h0}`,inviter_id:e,invitee_id:t,mode:"roast_1v1",status:"pending",inviter_consent_at:i,invitee_consent_at:null,created_at:i,testMode:!0}}function Jl(e,{accept:t,consentAccepted:s}){return!e||e.status!=="pending"?{error:"not_found"}:t?s!==!0?{error:"consent_required"}:{...e,status:"accepted",invitee_consent_at:vo()}:{...e,status:"declined"}}function g0(e){return!!e&&e.status==="accepted"&&!!e.inviter_consent_at&&!!e.invitee_consent_at}function Xu(e,{eligibleViewerIds:t=[],rules:s=m0}={}){if(!g0(e))throw new Error("consent_required: both contestants must accept before a match starts");const a=[e.inviter_id,e.invitee_id],i={mode:"roast_1v1"};return{testMode:!0,inviteId:e.id,contestants:a,...i,rules:s,eligibleViewerIds:[...new Set(t)].filter(n=>s.contestantsMayVote||!a.includes(n)),phase:"round",round:1,seconds:qi,votes:[0,0],votersThisRound:[],scores:[0,0],roundWinners:[],gifts:[0,0],rematchAgreement:{},rematch:null,reports:[],winner:null,result:null,tieBreaker:!1,tiebreakersPlayed:0}}function v0(e,t,s){if(e.phase!=="vote"||![0,1].includes(t)||!e.eligibleViewerIds.includes(s)||e.votersThisRound.includes(s)||!e.rules.contestantsMayVote&&e.contestants.includes(s))return e;const a=[...e.votes];return a[t]+=1,{...e,votes:a,votersThisRound:[...e.votersThisRound,s]}}function b0(e){return{voted:e.votersThisRound.length,eligible:e.eligibleViewerIds.length}}function y0(e,t,s=1){if(!["round","vote"].includes(e.phase)||![0,1].includes(t)||!(s>0))return e;const a=[...e.gifts];return a[t]+=s,{...e,gifts:a}}function k0(e,t,s){var o;if(e.phase!=="rematch"||!e.contestants.includes(s)||s in e.rematchAgreement)return e;const a={...e.rematchAgreement,[s]:!!t};return t?(((o=e.rules)==null?void 0:o.rematchRequiresAllContestants)!==!1?e.contestants.every(r=>a[r]===!0):!0)?{...e,rematchAgreement:a,rematch:"agreed",phase:"finished",seconds:0}:{...e,rematchAgreement:a}:{...e,rematchAgreement:a,rematch:"declined",phase:"finished",seconds:0}}function w0(e,t){if(e.rematch!=="agreed"||(t==null?void 0:t.id)!==e.inviteId)throw new Error("rematch_not_agreed");return Xu(t,{eligibleViewerIds:e.eligibleViewerIds})}function S0(e,{reporterId:t,targetId:s,reason:a}){return!t||!a?e:{...e,reports:[...e.reports,{reporterId:t,targetId:s||null,reason:a,at:vo(),localOnly:!0}]}}function Zu(e){if(!["round","vote","rematch"].includes(e.phase))return e;if(e.seconds>1)return{...e,seconds:e.seconds-1};if(e.phase==="round")return{...e,phase:"vote",seconds:go,votes:[0,0],votersThisRound:[]};if(e.phase==="vote"){const t=e.votes[0]===e.votes[1]?null:e.votes[0]>e.votes[1]?0:1,s=[...e.scores];t!==null&&(s[t]+=1);const a=[...e.roundWinners,t];if(e.round>=ba&&s[0]!==s[1]){const n=s[0]>s[1]?0:1;return{...e,scores:s,roundWinners:a,winner:n,result:"winner",phase:"rematch",seconds:Ri}}if(e.round>=ba&&e.tiebreakersPlayed>=e.rules.tiebreakerRounds)return{...e,scores:s,roundWinners:a,winner:null,result:"tie",phase:"finished",seconds:0};const i=e.round>=ba;return{...e,scores:s,roundWinners:a,phase:"round",round:e.round+1,seconds:qi,votes:[0,0],votersThisRound:[],tieBreaker:i,tiebreakersPlayed:e.tiebreakersPlayed+(i?1:0)}}return{...e,phase:"finished",seconds:0,rematch:e.rematch||"expired"}}const Ni=["test-viewer-1","test-viewer-2","test-viewer-3"],wt={"1v1":{root:"roast-1v1",names:["Challenger (test)","Opponent (test)"]}},$0=(e,t,s)=>wt[e].names[t.contestants.indexOf(s)],rs={},Be=e=>String(e).replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),E0=e=>`${String(Math.floor(e/60)).padStart(2,"0")}:${String(e%60).padStart(2,"0")}`;function os(e){e!=null&&e.timer&&clearInterval(e.timer),e&&(e.timer=null)}function Ql(e){const t=rs[e];os(t),t.timer=setInterval(()=>{if(!document.getElementById(wt[e].root))return os(t);t.match=Zu(t.match),t.match.phase==="finished"&&os(t),Bi(e)},1e3)}const Xl=e=>e.error?`<p class="muted" role="alert">${Be(e.error)}</p>`:"";function x0(e){const t=wt["1v1"].names,s=e.invite;return s?s.status==="declined"?`<h3>Invite declined</h3><p>${Be(t[1])} declined. No match was started.</p><button type="button" class="btn" data-roast="reset">Start over</button>`:`<h3>Step 2 · Opponent responds</h3><p>Pending TEST invite <code>${Be(s.id)}</code> from ${Be(t[0])} (challenger consent recorded).</p>
    <label><input type="checkbox" data-consent="opponent"> I (opponent) accept the Roast Arena rules and consent to being roasted.</label>
    <p><button type="button" class="btn primary" data-roast="accept">Accept</button> <button type="button" class="btn" data-roast="decline">Decline</button></p>${Xl(e)}`:`<h3>Step 1 · Challenger sends invite</h3>
      <label><input type="checkbox" data-consent="challenger"> I (challenger) accept the Roast Arena rules and consent to being roasted.</label>
      <p><button type="button" class="btn primary" data-roast="invite">Send TEST invite to ${Be(t[1])}</button></p>${Xl(e)}`}function Zl(e,t,s){const a=wt[e].names;return`<div class="card roast-panel" data-roast-panel="${t}" style="flex:1;min-width:140px;text-align:center">
    <div style="aspect-ratio:3/4;margin-bottom:6px;display:flex;align-items:center;justify-content:center;border:2px dashed currentColor;border-radius:12px;opacity:.8">
      <div><strong>TEST MODE</strong><br><span class="muted">Placeholder tile · no camera connected</span></div></div>
    <h4>${Be(a[t])}</h4>
    <p>Rounds won: <strong>${s.scores[t]}</strong></p>
    <p class="muted">Test gifts: ${s.gifts[t]} (not counted for winner)</p>
    ${["round","vote"].includes(s.phase)?`<button type="button" class="btn" data-roast-gift="${t}">Send TEST gift</button>`:""}
  </div>`}function A0(e,t){const s=t.match,a=wt[e].names,i=s.tieBreaker?"Tie Breaker":`Round ${s.round}`,n=s.phase==="round"?i:s.phase==="vote"?`${i} · Vote: who won?`:s.phase==="rematch"?"Result · Run It Back?":"Match finished",o=s.result==="winner"?`<p data-roast-result="winner"><strong>Winner (audience votes): ${Be(a[s.winner])}</strong></p>`:s.result==="tie"?'<p data-roast-result="tie"><strong>Result: Tie</strong> (tiebreaker round was also tied)</p>':"",r=s.votersThisRound.includes(t.viewer);return`<p class="chip">TEST MODE · local only · no server, video or real payments</p>
    <div class="card"><strong>On-screen rules (automated, no host):</strong> ${ba} rounds of ${qi}s, then a vote after each round (vote window ${go}s). One vote per viewer per round. Winner is decided by votes only; gifts are tallied separately. If tied after ${ba} rounds, one tiebreaker round is played, then it ends as a tie. Contestants cannot vote. A rematch needs every contestant to agree (decision window ${Ri}s, rematch rounds are also ${qi}s).</div>
    <h3 aria-live="polite">${n} · <span data-roast-clock>${E0(s.seconds)}</span></h3>
    <div class="row" style="display:flex;gap:12px">${Zl(e,0,s)}${Zl(e,1,s)}</div>
    <p>Round votes so far: ${s.votes[0]} – ${s.votes[1]} · Round winners: ${s.roundWinners.map(c=>c===null?"tie":a[c].split(" ")[0]).join(", ")||"—"}</p>
    <label>Acting as test viewer: <select data-roast-viewer>${Ni.map(c=>`<option ${c===t.viewer?"selected":""}>${c}</option>`).join("")}</select></label>
    ${s.phase==="vote"?(({voted:c,eligible:d})=>`<p data-roast-turnout><strong>${c} of ${d} eligible viewers voted</strong> <span class="chip">TEST MODE · test viewer list</span></p>`)(b0(s)):""}
    ${s.phase==="vote"?r?'<p class="muted">This viewer already voted this round.</p>':`<p data-roast-vote-screen><strong data-roast-vote-round>${i}</strong> · Tap a name to vote who won:</p><p><button type="button" class="btn primary roast-tap" data-roast-vote="0" aria-label="Vote for ${Be(a[0])}">${Be(a[0])}</button> <button type="button" class="btn primary roast-tap" data-roast-vote="1" aria-label="Vote for ${Be(a[1])}">${Be(a[1])}</button></p>`:""}
    ${o}
    ${s.phase==="rematch"?`<p><strong>Rematch? Every contestant must agree within ${Ri}s.</strong> Viewers do not vote on rematches.</p><ul data-roast-rematch-list>${s.contestants.map(c=>`<li>${Be($0(e,s,c))}: ${c in s.rematchAgreement?s.rematchAgreement[c]?"<strong>Yes</strong>":"No":`<button type="button" class="btn roast-tap" data-roast-rematch="yes" data-contestant="${c}">Rematch: Yes</button> <button type="button" class="btn roast-tap" data-roast-rematch="no" data-contestant="${c}">Rematch: No</button>`}</li>`).join("")}</ul>`:""}
    ${s.rematch==="agreed"?'<p data-roast-rematch-status="agreed">All contestants agreed. <button type="button" class="btn primary" data-roast="rematch">Start rematch</button></p>':s.rematch==="declined"?'<p data-roast-rematch-status="declined">Rematch declined by a contestant. Match over.</p>':s.rematch==="expired"?'<p data-roast-rematch-status="expired">Rematch window closed without agreement. Match over.</p>':""}
    <p><button type="button" class="btn" data-roast="report">Report (stub)</button> <button type="button" class="btn" data-roast="skip">Skip to next phase (test control)</button></p>
    ${s.reports.length?`<p class="muted" data-roast-reports>${s.reports.length} report(s) recorded locally only. Not sent to moderators.</p>`:""}`}function Bi(e){const t=document.getElementById(wt[e].root),s=rs[e];!t||!s||(t.innerHTML=s.match?A0(e,s):x0(s))}function T0(e,t){const s=t.target.closest("[data-roast],[data-roast-vote],[data-roast-gift],[data-roast-rematch]");if(!s)return;const a=rs[e],i=document.getElementById(wt[e].root),n=r=>{var c;return((c=i.querySelector(`[data-consent="${r}"]`))==null?void 0:c.checked)===!0};a.error="";const o=s.dataset.roast;if(o==="invite"){const r=f0({inviterId:"test-challenger",inviteeId:"test-opponent",consentAccepted:n("challenger")});r.error?a.error="You must accept the rules and consent before inviting.":a.invite=r}else if(o==="accept"){const r=Jl(a.invite,{accept:!0,consentAccepted:n("opponent")});r.error?a.error="That member must accept the rules and consent first.":(a.invite=r,r.status==="accepted"&&(a.match=Xu(r,{eligibleViewerIds:Ni}),Ql(e)))}else o==="decline"?a.invite=Jl(a.invite,{accept:!1}):o==="reset"?(os(a),rs[e]={viewer:Ni[0]}):o==="rematch"?(a.match=w0(a.match,a.invite),Ql(e)):o==="report"?a.match=S0(a.match,{reporterId:a.viewer,reason:"test report"}):o==="skip"?(a.match=Zu({...a.match,seconds:1}),a.match.phase==="finished"&&os(a)):s.dataset.roastVote!==void 0?a.match=v0(a.match,Number(s.dataset.roastVote),a.viewer):s.dataset.roastGift!==void 0?a.match=y0(a.match,Number(s.dataset.roastGift),1):s.dataset.roastRematch!==void 0&&(a.match=k0(a.match,s.dataset.roastRematch==="yes",s.dataset.contestant),a.match.phase==="finished"&&os(a));Bi(e)}function C0(){for(const e of Object.keys(wt)){os(rs[e]);const t=document.getElementById(wt[e].root);t&&(rs[e]={viewer:Ni[0]},t.addEventListener("click",s=>T0(e,s)),t.addEventListener("change",s=>{s.target.matches("[data-roast-viewer]")&&(rs[e].viewer=s.target.value,Bi(e))}),Bi(e))}}function P0(){return M("PIKK Roast Arena",`
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
      <h3>Battle formats</h3>
      <div class="row wrap"><span class="chip">1 vs. 1</span><span class="chip">Open Mic</span><span class="chip">Tournament</span></div>
      <p class="muted">Automated format: split-screen contestants, on-screen rules, automatic round countdown, timed voting buttons for viewers, gifts and requests to battle. No host is required.</p>
    </div>
    <div class="card">
      <h3>How an automated round works</h3>
      <ol>
        <li>Both contestants opt in and see the rules before the round begins.</li>
        <li>The system starts a visible countdown and displays the current round and time remaining to everyone.</li>
        <li>When the round ends, both microphones pause and viewers see <strong>Vote: Contestant A</strong> or <strong>Vote: Contestant B</strong> buttons.</li>
        <li>Each eligible viewer gets one vote per round within the timed voting window; the system locks voting when time expires.</li>
        <li>Results display the round winner, cumulative score and a separate gifts leaderboard. The <strong>audience voting window is the only break</strong> (${go} seconds, owner-approved) between rounds. The next round starts immediately after voting closes. If the final match vote is tied, an automatic <strong>tiebreaker final round</strong> begins after voting closes. At the end of a decided match, each contestant has ${Ri} seconds to choose <strong>Rematch: Yes</strong> or <strong>Rematch: No</strong>; a rematch proceeds only if both contestants agree. Viewers do not vote on rematches.</li>
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
  `,{lead:"Live comedy competitions · audience votes and gifts tracked separately"})}const pa={instagram:"Instagram",tiktok:"TikTok",facebook:"Facebook",youtube:"YouTube",x:"X",snapchat:"Snapchat",other:"Other"};function I0(e){return((e==null?void 0:e.path)||"")==="/refer"?"refer":"share"}function oe(e){U(e==="refer"?"#/refer":"#/share")}function et(){const{user:e}=D();if(e)return e;const t=_a("DemoCreator");return f("Signed in as DemoCreator · local demo"),t||D().user}function M0(e){const t=Number(e)-Date.now();if(t<=0)return"24h window ended (demo)";const s=Math.floor(t/36e5),a=Math.floor(t%36e5/6e4);return`${s}h ${a}m left`}function L0(e){return`<div class="admin-type-tabs rewards-tabs" style="grid-template-columns:repeat(2,minmax(0,1fr));margin-bottom:14px" role="tablist">
    <a class="admin-type-tab ${e==="share"?"on":""}" href="#/share" role="tab" aria-selected="${e==="share"}">Share &amp; Earn</a>
    <a class="admin-type-tab ${e==="refer"?"on":""}" href="#/refer" role="tab" aria-selected="${e==="refer"}">Refer &amp; Earn</a>
  </div>`}function D0(){const{user:e}=D(),t=se(),s=t.platformsLinked||[],a=t.challenge,i=t.submissions||[],n=t.rewardsClaimed||[],o=Uc(),r=Gc(),c=vh(),d=s.length>0?`<ul class="list-plain">${s.map(y=>`<li>
          <span><strong>${l(pa[y.platform]||y.platform)}</strong>
            ${y.handle?`<br/><span class="muted" style="font-size:12px">@${l(String(y.handle).replace(/^@+/,""))}</span>`:""}
            ${y.url?`<br/><span class="muted" style="font-size:11px">${l(y.url)}</span>`:""}
          </span>
          <button class="btn ghost" type="button" data-unlink="${l(y.id)}">Remove</button>
        </li>`).join("")}</ul>`:'<p class="muted" style="margin:0;font-size:13px">No platforms linked yet — optional. Never asked for social passwords.</p>',u=_o().filter(y=>!s.some(k=>k.platform===y)).map(y=>`<option value="${y}">${l(pa[y]||y)}</option>`).join("");let p="";if(!a)p=`<div class="card">
      <h3>24-hour social challenge</h3>
      <p class="muted" style="margin:0 0 10px;font-size:13px">Optional promo · separate from paid Clippers. Post official DBS ad + tracked link · keep live 24h · manual/demo verification (not guaranteed auto-check).</p>
      <button class="btn primary" id="shStart" >Start challenge · TEST MODE</button>
    </div>`;else{const y=a.status==="active",k=Date.now()>=Number(a.endsAt);p=`<div class="card">
      <div class="row wrap" style="gap:8px;margin-bottom:8px">
        <span class="chip">${y?k?"Window ended · demo":"Active":"Ended"}</span>
        <span class="chip">TEST MODE</span>
        <span class="chip">${l(M0(a.endsAt))}</span>
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
    </div>`}const h=_o().map(y=>`<option value="${y}">${l(pa[y]||y)}</option>`).join(""),g=i.length>0?`<ul class="list-plain">${i.map(y=>`<li style="align-items:flex-start">
          <span style="flex:1;min-width:0">
            <strong>${l(pa[y.platform]||y.platform)}</strong>
            <span class="chip">${l(y.status)}</span>
            <br/><a href="${l(y.postUrl)}" target="_blank" rel="noopener" style="font-size:13px;word-break:break-all">${l(y.postUrl)}</a>
            <br/><span class="muted" style="font-size:11px">${G(y.submittedAt)} · ${l(y.note||"")}</span>
          </span>
          ${y.status==="pending"?`<span class="row wrap" style="gap:4px">
                  <button class="btn" type="button" data-verify="${l(y.id)}">Verify · demo</button>
                  <button class="btn ghost" type="button" data-reject="${l(y.id)}">Reject</button>
                </span>`:""}
        </li>`).join("")}</ul>`:'<p class="muted" style="margin:0;font-size:13px">No post URLs submitted yet.</p>',v=c.map(y=>{const k=n.some($=>$.tierId===y.id),S=r.some($=>$.id===y.id);return`<tr style="border-top:1px solid rgba(255,255,255,.06)">
        <td style="padding:8px 4px"><strong>${l(y.label)}</strong><br/><span class="muted" style="font-size:11px">≥${y.minVerified} verified platform${y.minVerified===1?"":"s"}${y.requireAllLinked?" · all linked (≥3)":""}</span></td>
        <td style="padding:8px 4px">${k?'<span class="chip">Claimed</span>':S?`<button class="btn primary" type="button" data-claim-share="${l(y.id)}">Claim</button>`:`<span class="muted" style="font-size:12px">Locked (${o}/${y.minVerified})</span>`}</td>
      </tr>`}).join(""),b=n.length>0?`<ul class="list-plain">${n.map(y=>`<li>
          <span>${l(y.label)}<br/><span class="muted" style="font-size:11px">${G(y.at)} · TEST MODE</span></span>
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
      ${d}
      <form id="shLinkForm" style="display:grid;gap:10px;max-width:520px;margin-top:12px">
        <div class="grid-2">
          <div class="field"><label>Platform</label>
            <select name="platform" id="shPlat" ${u?"":"disabled"}>
              ${u||'<option value="">All linked</option>'}
            </select>
          </div>
          <div class="field"><label>Handle (no password)</label><input name="handle" id="shHandle" maxlength="64" placeholder="you (no @ needed)" /></div>
        </div>
        <div class="field"><label>Profile URL (optional)</label><input name="url" id="shUrl" maxlength="240" placeholder="https://…" /></div>
        <button class="btn" type="submit" ${u?"":"disabled"}>Link platform</button>
        <p class="muted" style="margin:0;font-size:12px">Skip anytime — do not create fake accounts for rewards.</p>
      </form>
    </div>

    ${p}

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
  `}function _0(){const{user:e}=D(),t=js(),s=Vc(),a=t.invitees||[],i=Hc(),n=zc(),o=Ah(),r=t.milestonesClaimed||[],c=Ft(),d=o.find(v=>i<v.n),u=d?`${i} / ${d.n} verified active → ${d.label}`:i>=100?"All milestones unlocked":`${i} verified active`,p=a.length>0?`<ul class="list-plain">${a.map(v=>{const b=(v.activeDays||[]).length;return`<li style="align-items:flex-start">
            <span style="flex:1;min-width:0">
              <strong>${l(v.username)}</strong>
              <span class="chip">${l(v.status)}</span>
              ${v.flaggedFraud?'<span class="chip">Fraud flag</span>':""}
              ${v.welcomeClaimed?'<span class="chip">Welcome claimed</span>':""}
              <br/><span class="muted" style="font-size:12px">Active days: ${b}/3 · ${l((v.activeDays||[]).join(", ")||"none")} · signed ${G(v.signedUpAt)}</span>
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
          <span>${l(v.label)}<br/><span class="muted" style="font-size:11px">${G(v.at)} · not Clippers pay</span></span>
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
      <p class="muted" style="margin:10px 0 0;font-size:12px">Progress: ${l(u)}</p>
    </div>

    <div class="card">
      <h3>Simulate invitee</h3>
      <p class="muted" style="margin:0 0 10px;font-size:13px">Demo controls · fraud-resistant toggles (self-referral blocked · flag bots).</p>
      <form id="refInviteForm" class="row wrap" style="gap:8px;align-items:flex-end">
        <div class="field" style="margin:0;flex:1;min-width:160px"><label>Invitee username</label><input id="refInviteName" maxlength="24" placeholder="NewFriend" /></div>
        <button class="btn primary" type="submit">Simulate signup</button>
      </form>
      <div style="margin-top:12px">${p}</div>
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
  `}function O0(e){return ep(e||{path:"/share"})}function q0(e){return ep(e||{path:"/refer"})}function ep(e){const t=I0(e),s=`
    ${L0(t)}
    ${t==="refer"?_0():D0()}
  `;return M("DBS Rewards",s,{lead:t==="refer"?"Refer & Earn · verified active friends · TEST MODE (§33).":"Share & Earn · 24h social promo · TEST MODE (§32)."})}function R0(e){tp(e,"share")}function N0(e){tp(e,"refer")}function tp(e,t){var a,i,n,o,r,c,d,u,p,h,g,v,b;const s=t||(location.hash.includes("/refer")?"refer":"share");(a=e.querySelector("#rwSignIn"))==null||a.addEventListener("click",()=>{et(),oe(s)}),(i=e.querySelector("#shLinkForm"))==null||i.addEventListener("submit",y=>{var C,P,q;y.preventDefault(),et();const k=(C=e.querySelector("#shPlat"))==null?void 0:C.value,S=((P=e.querySelector("#shHandle"))==null?void 0:P.value)||"",$=((q=e.querySelector("#shUrl"))==null?void 0:q.value)||"",w=bh({platform:k,handle:S,url:$});if(w.error==="signin")return f("Sign in required");if(w.error==="already_linked")return f("Already linked");if(w.error==="required")return f("Handle or URL required");if(w.error)return f("Could not link");f(`Linked ${pa[k]||k}`),oe("share")}),e.querySelectorAll("[data-unlink]").forEach(y=>{y.addEventListener("click",()=>{yh(y.getAttribute("data-unlink")),f("Platform removed"),oe("share")})}),(n=e.querySelector("#shStart"))==null||n.addEventListener("click",()=>{et();const y=kh();if(y.error==="signin")return f("Sign in required");if(y.error==="already_active")return f("Challenge already active");if(y.error)return f("Could not start");f("Challenge started · 24h window"),oe("share")}),(o=e.querySelector("#shCopyLink"))==null||o.addEventListener("click",async()=>{var k;const y=((k=e.querySelector("#shTracked"))==null?void 0:k.value)||"";try{await navigator.clipboard.writeText(y),f("Tracked link copied")}catch{f("Copy manually")}}),(r=e.querySelector("#shCopyCaption"))==null||r.addEventListener("click",async()=>{var S;const k=((S=se().challenge)==null?void 0:S.caption)||"";try{await navigator.clipboard.writeText(k),f("Caption copied")}catch{f("Copy manually")}}),(c=e.querySelector("#shSim24"))==null||c.addEventListener("click",()=>{if(wh().error)return f("No active challenge");f("Simulated 24h elapsed"),oe("share")}),(d=e.querySelector("#shEnd"))==null||d.addEventListener("click",()=>{Sh(),f("Challenge ended"),oe("share")}),(u=e.querySelector("#shSubmitForm"))==null||u.addEventListener("submit",y=>{var w,C;y.preventDefault(),et();const k=(w=e.querySelector("#shSubPlat"))==null?void 0:w.value,S=((C=e.querySelector("#shSubUrl"))==null?void 0:C.value)||"",$=$h({platform:k,postUrl:S});if($.error==="required")return f("Post URL required");if($.error==="duplicate")return f("Already submitted for this platform");if($.error==="no_challenge")return f("Start a challenge first");if($.error)return f("Submit failed");f("Submitted · pending demo verification"),oe("share")}),e.querySelectorAll("[data-verify]").forEach(y=>{y.addEventListener("click",()=>{Oo(y.getAttribute("data-verify"),"verified"),f("Verified · demo (manual)"),oe("share")})}),e.querySelectorAll("[data-reject]").forEach(y=>{y.addEventListener("click",()=>{Oo(y.getAttribute("data-reject"),"rejected"),f("Rejected"),oe("share")})}),e.querySelectorAll("[data-claim-share]").forEach(y=>{y.addEventListener("click",()=>{et();const k=Eh(y.getAttribute("data-claim-share"));if(k.error==="not_claimable")return f("Not claimable yet");if(k.error)return f("Claim failed");f(`Claimed · ${k.claim.label}`),oe("share")})}),(p=e.querySelector("#shReset"))==null||p.addEventListener("click",()=>{xh(),f("Share demo reset"),oe("share")}),(h=e.querySelector("#refCopy"))==null||h.addEventListener("click",async()=>{var k;et(),js();const y=((k=e.querySelector("#refLink"))==null?void 0:k.value)||Vc();try{await navigator.clipboard.writeText(y),f("Referral link copied")}catch{f("Copy manually")}}),(g=e.querySelector("#refInviteForm"))==null||g.addEventListener("submit",y=>{var $;y.preventDefault(),et();const k=(($=e.querySelector("#refInviteName"))==null?void 0:$.value)||"",S=Th({username:k});if(S.error==="self_referral")return f("Self-referral blocked");if(S.error==="signin")return f("Sign in required");if(S.error)return f("Could not add invitee");f(`Invitee ${S.invitee.username} signed up`),oe("refer")}),e.querySelectorAll("[data-welcome]").forEach(y=>{y.addEventListener("click",()=>{const k=Ch(y.getAttribute("data-welcome"));if(k.error==="fraud")return f("Flagged fraud");if(k.error)return f("Welcome claim failed");f(k.perk||"Welcome perk claimed"),oe("refer")})}),e.querySelectorAll("[data-activeday]").forEach(y=>{y.addEventListener("click",()=>{const k=Ph(y.getAttribute("data-activeday"));if(k.error==="fraud")return f("Flagged fraud");if(k.error==="outside_window")return f("Outside first-7-day window");if(k.error==="window_full")return f("All 7 demo days already marked");if(k.error)return f("Could not mark day");const S=(k.invitee.activeDays||[]).length;f(S>=3?`${k.invitee.username} → verified active (${S} days)`:`Active day ${S}/3 for ${k.invitee.username}`),oe("refer")})}),e.querySelectorAll("[data-fraud]").forEach(y=>{y.addEventListener("click",()=>{qo(y.getAttribute("data-fraud"),!0),f("Flagged as fraud · demo"),oe("refer")})}),e.querySelectorAll("[data-unfraud]").forEach(y=>{y.addEventListener("click",()=>{qo(y.getAttribute("data-unfraud"),!1),f("Fraud flag cleared"),oe("refer")})}),e.querySelectorAll("[data-claim-ref]").forEach(y=>{y.addEventListener("click",()=>{et();const k=Ih(y.getAttribute("data-claim-ref"));if(k.error==="not_claimable")return f("Not claimable yet");if(k.error)return f("Claim failed");f(`Milestone claimed · ${k.claim.label}`),oe("refer")})}),(v=e.querySelector("#refSeed"))==null||v.addEventListener("click",()=>{et();const y=Lh({force:!0});if(y.error==="signin")return f("Sign in required");f(`Loaded ${y.seeded||0} demo invitees`),oe("refer")}),(b=e.querySelector("#refReset"))==null||b.addEventListener("click",()=>{et(),Mh(),f("Refer demo reset"),oe("refer")})}function B0(e){return{badge:`Phase ${e} shell`}}function ec(e){return`
    <article class="card pikk-video-tile">
      <div class="hero-video" style="margin:0 0 10px">
        <iframe src="${l(yt(e.embed))}" title="${l(e.title)}" allowfullscreen loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </div>
      <span class="chip">${l(e.category||"Music Videos")}</span>
      <h3 style="margin:8px 0 4px">${l(e.title)}</h3>
      <p class="muted" style="margin:0 0 8px">${l(e.artist||"DatBoiSkeet")}</p>
      <div class="row wrap">
        <a class="btn" href="${l(e.youtube)}" target="_blank" rel="noopener">Open on YouTube</a>
        <button class="btn ghost video-share" data-url="${l(e.youtube)}" data-title="${l(e.title)}">Share link</button>
      </div>
    </article>`}function K0(){var c;const e=["Music Videos","Mixes","Interviews"],t={};fe.forEach(d=>{const u=d.category||"Music Videos";(t[u]||(t[u]=[])).push(d)});const s=e.filter(d=>{var u;return(u=t[d])==null?void 0:u.length}).map(d=>{const u=t[d].map(ec).join("");return`<section class="pikk-video-section" data-video-category="${l(d)}"><h3>${l(d)}</h3><div class="pikk-video-grid">${u}</div></section>`}).join(""),a=Object.keys(t).filter(d=>!e.includes(d)).map(d=>`<section class="pikk-video-section" data-video-category="${l(d)}"><h3>${l(d)}</h3><div class="pikk-video-grid">${t[d].map(ec).join("")}</div></section>`).join(""),i=as({publishedOnly:!0,types:["video"]}),n=i.map(d=>{const u=d.youtube||"",p=d.embed||"";if(p||u){const h=p||"";return`<article class="card catalog-admin-video" data-id="${l(d.id)}">
          ${h?`<div class="hero-video" style="margin:0 0 10px"><iframe src="${l(yt(h))}" title="${l(d.title)}" allowfullscreen loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>`:""}
          <span class="chip">Admin</span>
          <h3 style="margin:8px 0 4px">${l(d.title)}</h3>
          <p class="muted">${l(d.artist)}</p>
          ${u?`<a class="btn" href="${l(u)}" target="_blank" rel="noopener">Open on YouTube</a>`:""}
        </article>`}return`<article class="card catalog-admin-video" data-id="${l(d.id)}">
        <span class="chip">Admin · uploaded</span>
        <h3 style="margin:8px 0 4px">${l(d.title)}</h3>
        <p class="muted">${l(d.artist)}</p>
        ${d.coverRef?`<img data-idb-src="${l(d.coverRef.startsWith("idb:")?d.coverRef:"")}" src="${l(d.coverRef.startsWith("idb:")?"":d.coverRef)}" alt="" class="catalog-cover" style="width:100%;max-height:220px;object-fit:cover;border-radius:12px;margin:8px 0" />`:""}
        ${d.mediaRef?`<video class="catalog-video" data-idb-src="${l(d.mediaRef.startsWith("idb:")?d.mediaRef:"")}" src="${l(d.mediaRef.startsWith("idb:")?"":d.mediaRef)}" controls playsinline webkit-playsinline preload="metadata" style="width:100%;border-radius:12px;background:#000"></video>`:'<p class="muted">No media file</p>'}
      </article>`}).join(""),o={};up.forEach(d=>{var u;(o[u=d.category]||(o[u]=[])).push(d)});const r=Object.entries(o).map(([d,u])=>`
      <div class="card pikk-video-coming-card" data-video-coming-category="${l(d)}">
        <h3>${l(d)}</h3>
        <p class="muted" style="margin:0 0 8px">No verified URLs in repo yet — titles from plan §9 only. No invented view counts.</p>
        <ul class="list-plain">${u.map(p=>`<li><span>${l(p.title)}</span><span class="chip">Coming Soon</span></li>`).join("")}</ul>
      </div>`).join("");return M("Videos & Interviews",`${Og()}
    <section class="pikk-video-hero card">
      <div class="pikk-video-hero-copy">
        <p class="kicker">PIKK VIDEOS · OFFICIAL RELEASES</p>
        <h2>Watch. Discover. Repeat.</h2>
        <p class="muted">Verified DatBoiSkeet music videos, mixes and interviews. Original YouTube playback, with no invented view counts.</p>
        <a class="btn primary" href="#/explore">Explore creators</a>
      </div>
      ${(c=fe[0])!=null&&c.youtube?`<a class="pikk-video-hero-preview" href="${l(fe[0].youtube)}" target="_blank" rel="noopener" aria-label="Watch ${l(fe[0].title)}">
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
    </section>`,{lead:"Official MVs · Mixes · Interviews · admin uploads."})}function j0(e){var o;const t=[...e.querySelectorAll("[data-videos-filter]")],s=[...e.querySelectorAll(".pikk-video-section[data-video-category]")],a=[...e.querySelectorAll("[data-video-coming-category]")],i=e.querySelector(".pikk-video-coming-list"),n=e.querySelector("[data-video-filter-status]");t.forEach(r=>r.addEventListener("click",()=>{const c=r.dataset.videosFilter||"All";t.forEach(u=>{const p=u===r;u.classList.toggle("on",p),u.setAttribute("aria-pressed",p?"true":"false")}),s.forEach(u=>{const p=c==="All"||u.dataset.videoCategory===c;u.hidden=!p}),a.forEach(u=>{u.hidden=c!=="All"&&u.dataset.videoComingCategory!==c});const d=a.some(u=>!u.hidden);if(i&&(i.hidden=!d),n){const u=s.some(p=>!p.hidden);n.textContent=c==="All"?"Showing all video categories and upcoming titles.":u?`Showing ${c}${d?" and upcoming titles":""}.`:d?`No published ${c} videos yet. Upcoming titles are listed below.`:`No published ${c} videos yet.`}})),(o=e.querySelector(".pikk-video-filters"))==null||o.addEventListener("keydown",r=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(r.key))return;const c=t.indexOf(r.target);if(c<0||!t.length)return;r.preventDefault();const d=r.key==="Home"?0:r.key==="End"?t.length-1:(c+(r.key==="ArrowRight"?1:-1)+t.length)%t.length;t[d].focus(),t[d].click()}),ln(e),e.querySelectorAll("video.catalog-video").forEach(r=>{r.addEventListener("play",()=>_s()),r.addEventListener("pause",()=>kt()),r.addEventListener("ended",()=>kt())}),e.querySelectorAll(".video-share").forEach(r=>{r.addEventListener("click",async()=>{const c=r.dataset.url||"";try{await navigator.clipboard.writeText(c),f("Link copied")}catch{f(c||"Copy failed")}})}),e.querySelectorAll("[data-idb-src]").forEach(async r=>{const c=(r.getAttribute("data-idb-src")||"").trim();if(c)try{const d=await pn(c);if(!d){r.tagName==="VIDEO"&&r.insertAdjacentHTML("afterend",'<p class="muted" style="font-size:12px">Media blob missing — re-upload from Admin.</p>');return}if((r.tagName==="IMG"||r.tagName==="VIDEO"||r.tagName==="AUDIO")&&(r.setAttribute("src",d),r.src=d,r.tagName==="VIDEO"||r.tagName==="AUDIO")){r.setAttribute("playsinline",""),r.setAttribute("webkit-playsinline",""),r.controls=!0;try{r.load()}catch{}}}catch(d){console.warn("idb media hydrate failed",c,d)}})}function F0(){const e=Ns(),t=e?`<p class="pikk-member-status" data-member-status data-server-membership="text" role="status">${l(Gd(dn())||"")}</p>`:`<p class="pikk-member-status" data-member-status role="status">${l(Gr(pd()))}</p>`,s=Ki.map(n=>`<li class="pikk-tier" data-tier="${l(n.id)}"><span><strong>${l(n.name)}</strong><br/><small class="muted">${l(n.blurb||"")}</small></span><strong>$${n.price}/mo</strong><button type="button" class="btn primary pikk-join" data-join="${l(n.id)}"${e?' disabled aria-disabled="true" title="Membership checkout is not available yet"':""}>${n.id==="inner"?"Join":"Subscribe"}</button></li>`).join(""),a=D().creatorSellApps||[],i=a.length?`<ul class="list-plain" style="margin-top:10px">${a.slice(0,8).map(n=>`<li><span>${l(n.name)} · ${l(n.contact)} · ${l(n.sells)}</span><span class="chip">${l(n.status||"pending")}</span></li>`).join("")}</ul>`:'<p class="muted" style="margin:8px 0 0;font-size:12px">No applications on this device yet.</p>';return M("Pricing",`<div class="card">
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
      ${i}
    </div>

    <div class="card" id="memberships"><h3>Memberships</h3>${t}<ul class="list-plain">${s}</ul>${e?'<p class="muted" style="font-size:12px" data-membership-checkout-note>Membership checkout is not available yet · nothing is charged and nothing is unlocked from this page.</p>':""}<div class="pikk-join-confirm" data-join-confirm hidden></div><p class="muted" style="font-size:12px">TEST MODE · no real charge. Billing starts when Stripe is live.</p></div>
     <div class="card"><h3>Music price ranges</h3>
       <ul class="list-plain">
         <li><span>Song</span><span>$0.99–$1.29</span></li>
         <li><span>EP</span><span>$4.99–$6.99</span></li>
         <li><span>Album</span><span>$9.99–$12.99</span></li>
       </ul>
       <p class="chip">TEST MODE · no charges</p>
     </div>`,{lead:"Sell music, videos, beats &amp; merch · rules &amp; fees · apply form · memberships &amp; gifts — admin-adjustable."})}function U0(e){var s;t$(e||document),typeof location<"u"&&(location.hash.includes("focus=sell")||location.hash.includes("creator-sell"))&&setTimeout(()=>{var a;return(a=document.getElementById("creator-sell"))==null?void 0:a.scrollIntoView({behavior:"smooth",block:"start"})},60),(s=e.querySelector("#csSubmit"))==null||s.addEventListener("click",()=>{var c,d,u,p,h,g;const a=(d=(c=e.querySelector("#csName"))==null?void 0:c.value)==null?void 0:d.trim(),i=(p=(u=e.querySelector("#csContact"))==null?void 0:u.value)==null?void 0:p.trim(),n=((h=e.querySelector("#csSells"))==null?void 0:h.value)||"both",o=!!((g=e.querySelector("#csAgree"))!=null&&g.checked);if(!a||!i)return f("Name and email/handle required");if(!o)return f("Agree to rules & fees to continue");const r=Ep({name:a,contact:i,sells:n,agreed:o});if(r!=null&&r.error)return f(r.error==="rules"?"Agree to rules & fees to continue":"Name and email/handle required");f("Application saved · TEST MODE"),U("#/pricing?focus=sell")})}function G0(){return M("Community Guidelines",`<div class="card">
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
    </div>`,{lead:"Rules for posts, chat, Live & Lounge — plan §13."})}const Kn=[{id:"dbs-lounge",cat:"NETWORK",hash:"#dbs-lounge",name:"PIKK Lounge",blurb:"Main hub · official announcements & network news",chip:"Hub"},{id:"conversation",cat:"NETWORK",hash:"#the-conversation",name:"The Conversation",blurb:"Public music & fan discussion threads",chip:"Public"},{id:"listening",cat:"VOICE / LISTENING",hash:"#listening-rooms",name:"Listening Rooms",blurb:"Listening parties & reactions to new releases",chip:"Parties"},{id:"backstage",cat:"MEMBERS",hash:"#backstage-rooms",name:"Backstage Rooms",blurb:"Tier-restricted spaces for PIKK+ / Backstage / Inner Circle",chip:"Members"},{id:"live-rooms",cat:"NETWORK",hash:"#live-rooms",name:"Live Rooms",blurb:"Scheduled community events & discussions",chip:"Events"},{id:"spotlight",cat:"NETWORK",hash:"#the-spotlight",name:"The Spotlight",blurb:"Featured fan conversations & creator posts",chip:"Featured"}],tc={"dbs-lounge":[{who:"PIKK · System",text:"Welcome to PIKK Lounge — DatBoiSkeet’s channel-style community hub.",tag:"DEMO"},{who:"TEST MODE",text:"Live chat isn’t connected yet. These rows are placeholders so the room pane feels real.",tag:"DEMO"}],conversation:[{who:"DEMO",text:"Drop takes on new releases here once Phase 2 chat ships.",tag:"DEMO"}],listening:[{who:"DEMO",text:"Listening parties will sync reactions here — preview only.",tag:"DEMO"}],backstage:[{who:"DEMO",text:"Member-tier rooms unlock with PIKK+ / Backstage / Inner Circle.",tag:"DEMO"}],"live-rooms":[{who:"DEMO",text:"Scheduled community events will list here — no live presence yet.",tag:"DEMO"}],spotlight:[{who:"DEMO",text:"Featured fan conversations land here in Phase 2.",tag:"DEMO"}]},V0=[{name:"DatBoiSkeet",role:"Owner"},{name:"SkeetMod",role:"Mod · DEMO"},{name:"FanDemo01",role:"DEMO"},{name:"ListenerX",role:"DEMO"}];function H0(e){const s=(tc[e.id]||tc["dbs-lounge"]).map(a=>`<div class="lounge-msg">
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
  </div>`}function z0(){const e=[],t=new Set;Kn.forEach(n=>{t.has(n.cat)||(t.add(n.cat),e.push(n.cat))});const s=e.map(n=>{const o=Kn.filter(r=>r.cat===n).map(r=>`<button type="button" class="lounge-channel${r.id==="dbs-lounge"?" on":""}" data-channel="${l(r.id)}" aria-pressed="${r.id==="dbs-lounge"?"true":"false"}">
            <span class="lounge-hash">#</span>
            <span class="lounge-channel-label">${l(r.name)}</span>
            <span class="chip lounge-channel-chip">${l(r.chip)}</span>
          </button>`).join("");return`<div class="lounge-cat-block">
        <p class="lounge-cat-label">${l(n)}</p>
        ${o}
      </div>`}).join(""),a=Kn.map(H0).join(""),i=V0.map(n=>`<li><span class="lounge-member-dot" aria-hidden="true"></span><span><strong>${l(n.name)}</strong><br/><span class="muted" style="font-size:11px">${l(n.role)}</span></span></li>`).join("");return M("PIKK Lounge",`<div class="card lounge-intro">
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
    </div>`,{lead:"Discord-inspired channels · DatBoiSkeet branded.",...B0(2)})}function W0(e=document){const t=e.querySelector("#loungeDiscord")||e,s=[...t.querySelectorAll(".lounge-channel")],a=[...t.querySelectorAll(".lounge-pane")];s.length&&s.forEach(i=>{i.addEventListener("click",()=>{const n=i.dataset.channel;s.forEach(o=>{const r=o===i;o.classList.toggle("on",r),o.setAttribute("aria-pressed",r?"true":"false")}),a.forEach(o=>{o.dataset.pane===n?o.removeAttribute("hidden"):o.setAttribute("hidden","")})})})}const Y0=Object.freeze([{id:"creator",label:"Creator",note:"General creator tools and profile publishing."},{id:"artist",label:"Artist",note:"Music uploads and artist tools."},{id:"streamer",label:"Streamer",note:"Livestream creator tools."},{id:"producer",label:"Producer",note:"Beat/music creator tools."},{id:"publisher",label:"Publisher",note:"Publishing/rights workflow declaration."},{id:"seller",label:"Seller",note:"Marketplace/storefront tools."},{id:"advertiser",label:"Advertiser",note:"Business advertising tools."},{id:"clipper",label:"Clipper",note:"Clipper campaigns and submissions."}]);function J0(){const e=no(),t=Y0.map(s=>`<label class="card creator-role-choice" style="margin:0" data-role-card="${l(s.id)}"><span class="row" style="align-items:flex-start"><input type="checkbox" name="creatorRole" value="${l(s.id)}" /><span class="spacer"><strong>${l(s.label)}</strong><br/><small class="muted">${l(s.note)}</small></span><span class="chip creator-role-state" data-role-state="${l(s.id)}">not selected</span></span></label>`).join("");return M("Signup & Creator Apps",`<div class="card">
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
    </div>`,{lead:e?"Real account role declarations + specialized creator applications":"Creator role manager waiting for production API configuration"})}function Q0(e){if(!no())return;const t=e.querySelector("#creatorRoleForm"),s=e.querySelector("#creatorRoleStatus");if(!t)return;const a=i=>{s&&(s.textContent=i)};Rs.me().then(i=>{const n=(i.signup_roles||[]).map(r=>typeof r=="string"?{role:r,status:"declared"}:r),o=new Map(n.map(r=>[r.role,r.status||"declared"]));e.querySelectorAll('input[name="creatorRole"]').forEach(r=>{r.checked=o.has(r.value);const c=e.querySelector(`[data-role-state="${CSS.escape(r.value)}"]`);c&&(c.textContent=o.get(r.value)||"not selected")}),a("Current account roles and review statuses loaded.")}).catch(i=>{a((i==null?void 0:i.status)===401?"Sign in from Profile to manage creator roles.":(i==null?void 0:i.message)||"Could not load account roles.")}),t.addEventListener("submit",async i=>{i.preventDefault();const n=[...e.querySelectorAll('input[name="creatorRole"]:checked')].map(r=>r.value),o=t.querySelector('button[type="submit"]');o&&(o.disabled=!0),a("Saving account roles…");try{const c=((await Rs.updateSignupRoles(n)).signup_roles||[]).filter(d=>d!=="member");e.querySelectorAll('input[name="creatorRole"]').forEach(d=>{const u=e.querySelector(`[data-role-state="${CSS.escape(d.value)}"]`);u&&(u.textContent=c.includes(d.value)?"declared":"not selected")}),a(c.length?"Saved role declarations: "+c.join(", ")+". Review status may be updated separately where required.":"Saved as Member only."),f("Account roles saved")}catch(r){a((r==null?void 0:r.status)===401?"Sign in to save account roles.":(r==null?void 0:r.message)||"Could not save account roles.")}finally{o&&(o.disabled=!1)}})}function X0(){const t=[{label:"Registration & role approval",status:"Demo",note:"Profile/signup local demo · real auth later"},{label:"Moderation / reporting / appeals",status:"TODO",note:"Guidelines copy ready · enforcement UI Phase 2"},{label:"Payments & refunds",status:"TEST",note:"TEST MODE only · no real charges"},{label:"Creator payouts verification",status:"SHELL",note:"Wallet / KYC stubs · not launch-ready"},{label:"Music & video rights",status:"Partial",note:"3 official MVs · streaming links still SHELL"},{label:"Gift-battle fraud prevention",status:"SHELL",note:"Gift Battles not wired for launch"},{label:"Livestream safety",status:"Demo",note:"Go-live demo PASS · age/safety stack incomplete"},{label:"Background audio pause/resume",status:"PARTIAL",note:"§17 sticky top YT player + pauseDbsPlayer hooks"},{label:"Account recovery / optional 2FA",status:"TODO",note:"Local demo sign-in only"},{label:"Loyalty analytics consent",status:"SHELL",note:"Privacy/consent controls before launch"},{label:"PIKK Connect safety (age + WebRTC)",status:"Blocked",note:"Must not launch without assurance"}].map(s=>`<li><span><strong>${l(s.label)}</strong><br/><span class="muted" style="font-size:12px">${l(s.note)}</span></span><span class="chip">${l(s.status)}</span></li>`).join("");return M("Launch Readiness",`<div class="card">
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
    </div>`,{lead:"Pre-launch checklist with honest demo status · §31."})}function Z0(){const e=[{n:1,title:"Foundation",summary:"Videos, Music/Vault, Posts, profiles, followers, engagement alerts, Clippers applications.",status:"DONE",items:[{label:"§1 Posts",status:"DONE",href:"#/posts"},{label:"§2 Clippers apply",status:"DONE",href:"#/clippers"},{label:"§7 Profiles",status:"DONE",href:"#/profile"},{label:"§8 Music & Vault",status:"DONE",href:"#/music"},{label:"§9 Videos & Interviews",status:"DONE",href:"#/videos"},{label:"§14 Streaming links",status:"DONE",href:"#/music"},{label:"§19 Loading splash",status:"DONE",href:"#/home"},{label:"§20 Home dashboard",status:"DONE",href:"#/home"},{label:"§21 Merch showcase",status:"DONE",href:"#/merch"},{label:"§34 Coming Soon covers",status:"DONE",href:"#/music"},{label:"§17 Home MV + continuous play",status:"PARTIAL",href:"#/home",note:"Sticky top YT player · Stream Everywhere open links · PENDING AUDIT"}]},{n:2,title:"Growth & Creator Economy",summary:"Clipper campaigns, missions, referrals, creator earnings, and payouts.",status:"DONE",items:[{label:"§5 Creator Earnings",status:"DONE",href:"#/earnings"},{label:"§6 Missions",status:"DONE",href:"#/missions"},{label:"§27 Wallet & Payouts",status:"DONE",href:"#/wallet"},{label:"§32 Share & Earn",status:"DONE",href:"#/share"},{label:"§33 Refer & Earn",status:"DONE",href:"#/refer"},{label:"§10 Pricing",status:"DONE",href:"#/pricing"},{label:"§11 Admin dashboard",status:"DONE",href:"#/admin"},{label:"§16 Signup / Creator apps",status:"DONE",href:"#/signup"},{label:"§24 Explore",status:"DONE",href:"#/explore"},{label:"§25 Notifications",status:"DONE",href:"#/notifications"},{label:"§26 Fan Clubs",status:"DONE",href:"#/fanclubs"},{label:"§28 Loyalty Club",status:"DONE",href:"#/loyalty"},{label:"§22 Profile Shop cosmetics",status:"DONE",href:"#/shop",note:"Checker PASS · cosmetics demo"}]},{n:3,title:"Live & Marketplace",summary:"Creator livestreaming, gifts, donations, advertising, creator subscriptions, and Marketplace.",status:"DONE",items:[{label:"§3 Live",status:"DONE",href:"#/live"},{label:"§4 Marketplace ads",status:"DONE",href:"#/marketplace"},{label:"§18 Messages",status:"DONE",href:"#/messages"},{label:"§23 Gift Battles",status:"DONE",href:"#/giftbattles"},{label:"§29 Multi-Guest Live",status:"DONE",href:"#/multiguest"},{label:"§30 Open Mic",status:"DONE",href:"#/openmic"},{label:"§35 24/7 Spotlight",status:"DONE",href:"#/spotlight"},{label:"§36 Connect (opt-in shell)",status:"DONE",href:"#/connect"},{label:"§37 Restream + streamer tiers",status:"DONE",href:"#/restream"},{label:"§13 Guidelines",status:"DONE",href:"#/guidelines"},{label:"§15 Community / Lounge",status:"DONE",href:"#/community"},{label:"§31 Launch readiness",status:"DONE",href:"#/launch"}]}],t=a=>a==="DONE"?"chip chip-ok":a==="PARTIAL"?"chip chip-partial":a==="PENDING AUDIT"?"chip chip-audit":"chip",s=e.map(a=>{const i=a.items.map(n=>{const o=n.note?`<br/><span class="muted" style="font-size:12px">${l(n.note)}</span>`:"";return`<li><span>${n.href?`<a href="${l(n.href)}" style="color:inherit;text-decoration:none"><strong>${l(n.label)}</strong></a>`:`<strong>${l(n.label)}</strong>`}${o}</span><span class="${t(n.status)}">${l(n.status)}</span></li>`}).join("");return`<div class="card">
      <div class="row wrap" style="gap:8px;align-items:center;margin-bottom:8px">
        <span class="chip">Phase ${a.n}</span>
        <span class="${t(a.status)}">${l(a.status)}</span>
      </div>
      <h2 style="margin:0 0 6px">${l(a.title)}</h2>
      <p class="muted" style="margin:0 0 12px">${l(a.summary)}</p>
      <ul class="list-plain">${i}</ul>
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
    </div>`,{lead:"Phase 1 · Phase 2 · Phase 3 roadmap with live status chips · §12."})}function e$(e){return M("Not found",`<div class="card"><p>No page for <code>${l(e)}</code>.</p><a class="btn" href="#/home">Home</a></div>`)}function t$(e){if(Ns()){Hd(e,dn()),Ai();return}const t=e.querySelector("[data-join-confirm]");t&&e.querySelectorAll("[data-join]").forEach(s=>s.addEventListener("click",()=>{const a=Ki.find(i=>i.id===s.dataset.join);a&&(t.hidden=!1,t.innerHTML=`<div role="dialog" aria-modal="false" aria-labelledby="joinH" class="pikk-join-dialog"><h4 id="joinH">Join ${l(a.name)} · $${a.price}/mo</h4><p>TEST MODE: no card is charged. Your choice is saved on this device; billing starts when Stripe is live.</p><button type="button" class="btn primary" data-join-ok="${l(a.id)}">Confirm ${l(a.name)}</button> <button type="button" class="btn ghost" data-join-cancel>Cancel</button></div>`,t.querySelector("[data-join-ok]").addEventListener("click",()=>{const i=Ef(a);e.querySelector("[data-member-status]").textContent=Gr(i),t.hidden=!0,t.innerHTML=""}),t.querySelector("[data-join-cancel]").addEventListener("click",()=>{t.hidden=!0,t.innerHTML=""}))}))}function s$(){return M("Create on PIKK",`<div class="pikk-create-page">${sp()}
    <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · uploads depend on available prototype tools</p></div>`)}const a$={"/home":{render:rv,bind:ov},"/create":{render:s$},"/promote":{render:Hv,bind:zv},"/donate":{render:Wv,bind:Yv},"/payments":{render:Qv,bind:Xv},"/story":{render:lb,bind:ub},"/crew":{render:rb,bind:cb},"/favorites":{render:ob,bind:db},"/updates":{render:dv,bind:uv},"/posts":{render:Fv,bind:Uv},"/music":{render:ul,bind:pl},"/ai-artists":{render:qb,bind:Rb},"/shield":{render:Gb,bind:Vb},"/support":{render:ty,bind:sy},"/verify-age":{render:iy,bind:ny},"/biometric-policy":{render:cy,bind:dy},"/support-staff":{render:py,bind:my},"/creator-review":{render:gy,bind:vy},"/vault":{render:ul,bind:pl},"/merch":{render:by,bind:yy},"/profile":{render:wy,bind:Sy},"/user":{render:_y,bind:qy},"/verify-email":{render:Ry,bind:Ny},"/forgot-password":{render:By,bind:Ky},"/reset-password":{render:Fy,bind:Uy},"/clippers":{render:Vy,bind:Hy},"/videos":{render:K0,bind:j0},"/live":{render:Wk,bind:Zk},"/viral-live":{render:aw,bind:iw},"/explore":{render:Uw,bind:Gw},"/marketplace":{render:ow,bind:lw},"/earnings":{render:Tw,bind:Cw},"/missions":{render:Lw,bind:Dw},"/pricing":{render:F0,bind:U0},"/admin":{render:Av,bind:Tv},"/mastermind":{render:qv,bind:Rv},"/guidelines":{render:G0},"/settings":{render:md,bind:hd},"/contest":{render:jo,bind:Xn},"/contest/twerk":{render:jo,bind:Xn},"/community":{render:z0,bind:W0},"/communities":{render:ZS,bind:e0},"/signup":{render:J0,bind:Q0},"/terms":{render:lp,bind:dp},"/privacy":{render:cp},"/messages":{render:bw,bind:kw},"/shop":{render:qS,bind:RS},"/profile-shop":{render:PS,bind:IS},"/giftbattles":{render:Ul,bind:Gl},"/battles":{render:Ul,bind:Gl},"/notifications":{render:ww,bind:Sw},"/fanclubs":{render:vS,bind:bS},"/wallet":{render:Ew,bind:xw},"/loyalty":{render:yS,bind:kS},"/multiguest":{render:mS,bind:hS},"/openmic":{render:SS,bind:$S},"/launch":{render:X0},"/phases":{render:Z0},"/share":{render:O0,bind:R0},"/refer":{render:q0,bind:N0},"/spotlight":{render:WS,bind:YS},"/restream":{render:()=>(queueMicrotask(()=>{location.hash="/connect#connect-multistream"}),pr()),bind:mr},"/shorts":{render:zl,bind:Wl},"/clips":{render:zl,bind:Wl},"/connect":{render:pr,bind:mr},"/blockwars":{render:n0,bind:o0},"/games":{render:l0,bind:d0},"/dating":{render:u0,bind:p0},"/roast-arena":{render:P0,bind:C0}};function bo(){var t,s,a;const e=document.getElementById("tabbar");if(D().user)try{Er()}catch{}e.innerHTML=gr.map(i=>{const o="/"+i.href.replace(/^#/,"").replace(/^\//,"").split(/[?#]/)[0],r=l(i.label);return`<a${i.primary?' class="tab-primary"':""} href="${i.href}" data-path="${o}" aria-label="${r}"${i.href==="#/create"?' aria-haspopup="dialog" aria-controls="pikkCreateMenu" aria-expanded="false"':i.href==="#/music"?' aria-haspopup="dialog" aria-controls="pikkMusicMenu" aria-expanded="false"':Ia[o.slice(1)]?` aria-haspopup="dialog" aria-controls="pikk${r}Menu" aria-expanded="false"`:""}><span class="tab-ico">${i.href==="#/create"?`<img class="pikk-create-logo-icon" src="${bt("/brand/pikk-logo-badge.png")}" alt="" width="40" height="29" decoding="async" />`:ya[i.icon]||""}</span><span>${r}</span></a>`}).join("");for(const i of Object.keys(Ia))(t=e.querySelector(`a[href="#/${i}"]`))==null||t.addEventListener("click",n=>{n.preventDefault(),Rf(i,n.currentTarget)});(s=e.querySelector('a[href="#/music"]'))==null||s.addEventListener("click",i=>{i.preventDefault(),Xt(),jf(i.currentTarget)}),(a=e.querySelector('a[href="#/create"]'))==null||a.addEventListener("click",i=>{var o;la(),Xt(),i.preventDefault();const n=i$();n.hidden=!n.hidden,i.currentTarget.setAttribute("aria-expanded",String(!n.hidden)),n.hidden||(o=n.querySelector("[data-create-close]"))==null||o.focus()}),e.style.gridTemplateColumns="",e.classList.remove("tabbar-scroll"),e.classList.add("tabbar-reshaped","tabbar-fit7")}function sp(){return yd.map(e=>{const t=e.items.map(s=>{const a=`<span class="pikk-menu-icon" aria-hidden="true">${ya[s.icon]||ya.explore}</span><strong class="pikk-menu-title">${l(s.title)}</strong><small>${l(s.detail)}</small>`;return s.href?`<a href="${l(s.href)}" class="pikk-create-tile">${a}</a>`:`<div class="pikk-create-tile pikk-create-tile-planned" aria-disabled="true">${a}</div>`}).join("");return`<section class="pikk-create-menu-group" aria-label="${l(e.title)}"><h3>${l(e.title)}</h3><div class="pikk-create-options pikk-create-grid">${t}</div></section>`}).join("")}const ap=()=>{const e=(location.hash.replace(/^#/,"")||"/home").split(/[?#]/)[0];document.querySelectorAll(".pikk-explore-rail a").forEach(t=>{t.getAttribute("href").slice(1)===e?t.setAttribute("aria-current","page"):t.removeAttribute("aria-current")})};window.addEventListener("hashchange",ap);ap();function i$(){let e=document.getElementById("pikkCreateMenu");if(e)return e;e=document.createElement("div"),e.id="pikkCreateMenu",e.className="pikk-create-overlay",e.hidden=!0,e.innerHTML=`<div class="pikk-create-sheet" role="dialog" aria-modal="true" aria-label="Create on PIKK">
    <div class="pikk-create-head"><strong>Create on PIKK</strong><button type="button" class="btn ghost" data-create-close aria-label="Close create menu">✕</button></div>
    ${sp()}
    <button type="button" class="pikk-menu-cancel" data-create-close>Cancel</button>
    <p class="muted" style="font-size:11px;margin:10px 0 0">TEST MODE · uploads depend on available prototype tools</p>
  </div>`,document.body.appendChild(e);const t=(s=!1)=>{e.hidden=!0;const a=document.querySelector('#tabbar a[href="#/create"]');a==null||a.setAttribute("aria-expanded","false"),s&&(a==null||a.focus())};return window.addEventListener("hashchange",()=>t()),e.addEventListener("click",s=>{s.target===e||s.target.closest("[data-create-close]")?t(!0):s.target.closest(".pikk-create-options a")&&t()}),document.addEventListener("keydown",s=>{if(!e.hidden&&(s.key==="Escape"&&(s.preventDefault(),t(!0)),s.key==="Tab")){const a=[...e.querySelectorAll("a[href], button:not([disabled])")],i=a[0],n=a[a.length-1];if(!i){s.preventDefault();return}e.contains(document.activeElement)?s.shiftKey&&document.activeElement===i?(s.preventDefault(),n.focus()):!s.shiftKey&&document.activeElement===n&&(s.preventDefault(),i.focus()):(s.preventDefault(),(s.shiftKey?n:i).focus())}}),e}function n$(){const e=document.getElementById("tabbar");if(!e)return;bo();const t=Ye();Bd(e,t.path);try{ip()}catch{}}function r$(){const e=document.getElementById("sideNav"),t=Ye(),s="#"+(t.raw||t.path),a="#"+t.path,i=Jf().map(n=>{if(n.href)return`<a class="drawer-direct${n.href===a||n.href===s?" on":""}" href="${n.href}">${l(n.label)}</a>`;const o=n.links||[],r=o.some(p=>p.href===a||p.href===s),c=r?" open":"",d=r?" has-active":"",u=o.map(p=>p.href?`<a class="drawer-link${p.href===a||p.href===s?" on":""}" href="${p.href}">${l(p.label)}</a>`:`<span class="drawer-link drawer-soon" aria-disabled="true">${l(p.label)} <small>· ${l(/planned/i.test(p.detail||"")?"Planned":"Coming Soon")}</small></span>`).join("");return`<div class="drawer-group${c}${d}" data-group="${l(n.id)}"><button type="button" class="drawer-cat" aria-expanded="${r?"true":"false"}"><span>${l(n.label)}</span><span class="drawer-caret" aria-hidden="true"></span></button><div class="drawer-children" role="group">${u}</div></div>`}).join("");e.innerHTML=`<h2 class="drawer-brand"><img src="${bt("/brand/pikk-logo-official.png")}" alt="" width="140" height="33" decoding="async" /><span>PIKK Network</span></h2>${i}`}function ma(e,t=!1){yg({drawer:document.getElementById("sideNav"),scrim:document.getElementById("scrim"),trigger:document.getElementById("menuBtn")},e,t)}function o$(e){const t=e.path;bo(),Bd(document.getElementById("tabbar"),t),document.querySelectorAll("#sideNav a").forEach(n=>{const o=n.getAttribute("href")||"";n.classList.toggle("on",o==="#"+t||o==="#"+e.raw)});const s="#"+t,a="#"+e.raw;document.querySelectorAll("#sideNav .drawer-group").forEach(n=>{const o=[...n.querySelectorAll("a")].some(c=>c.getAttribute("href")===s||c.getAttribute("href")===a);n.classList.toggle("open",o),n.classList.toggle("has-active",o);const r=n.querySelector(".drawer-cat");r&&r.setAttribute("aria-expanded",o?"true":"false")});const i=document.getElementById("headerMsg");if(i&&(i.hidden=!1),D().user&&!un())try{Er()}catch{}ip()}function jn(e){const t=document.getElementById("headerMsgBadge"),s=document.getElementById("headerMsg");if(!(!t||!s))if(e>0){const a=e>99?"99+":String(e);t.textContent=a,t.hidden=!1,s.setAttribute("aria-label",`Messages, ${e} unread`)}else t.textContent="",t.hidden=!0,s.setAttribute("aria-label","Messages")}function ip(){var t;if(un()&&((t=D().user)==null?void 0:t.authSource)==="backend"){Dt.unreadCount().then(s=>jn(Number((s==null?void 0:s.unread)||0))).catch(()=>jn(0));return}let e=0;try{e=Lt()}catch{e=0}jn(e)}function l$(e){var i;ma(!1);const t=document.getElementById("app"),s=a$[e.path],a=s?s.render(e):e$(e.path);t.innerHTML=a,Nd(t),(i=s==null?void 0:s.bind)==null||i.call(s,t),Cd(t),o$(e),bg(e,t,document.getElementById("pikkRouteAnnouncer")),lg(e.path),window.scrollTo(0,0),(e.path==="/music"||e.path==="/vault")&&(location.hash.includes("vault")||e.path==="/vault")&&setTimeout(()=>{var n;return(n=document.getElementById("vault"))==null?void 0:n.scrollIntoView({behavior:"smooth"})},50),e.path==="/pricing"&&(location.hash.includes("focus=sell")||location.hash.includes("creator-sell"))&&setTimeout(()=>{var n;return(n=document.getElementById("creator-sell"))==null?void 0:n.scrollIntoView({behavior:"smooth",block:"start"})},50),e.path==="/wallet"&&(e.elementId==="wallet-coins"||e.query.section==="coins"||location.hash.includes("wallet-coins"))&&setTimeout(()=>{var n;return(n=document.getElementById("wallet-coins"))==null?void 0:n.scrollIntoView({behavior:"smooth",block:"start"})},50),e.path==="/live"&&(e.query.go==="1"||e.elementId==="live-go"||location.hash.includes("go=1"))&&setTimeout(()=>{var n;return(n=document.getElementById("live-go"))==null?void 0:n.scrollIntoView({behavior:"smooth",block:"start"})},50)}function c$(){if(new URLSearchParams(location.search).has("holdSplash"))return;const e=document.getElementById("splash");!e||e.classList.contains("hide")||(e.classList.add("hide"),xp(),setTimeout(()=>e.remove(),Tf))}function d$(){if(!Ls().splashChime)return;const e=document.getElementById("splashChime");if(!e)return;const t=()=>{const a=e.play();a&&typeof a.catch=="function"&&a.catch(()=>{})};t();const s=()=>{t(),window.removeEventListener("pointerdown",s),window.removeEventListener("keydown",s)};window.addEventListener("pointerdown",s,{once:!0}),window.addEventListener("keydown",s,{once:!0})}function u$(){window.addEventListener("dbs:interrupt-music",e=>{var s;const t=((s=e==null?void 0:e.detail)==null?void 0:s.reason)||"route";Ua(t)}),window.addEventListener("dbs:resume-music",e=>{var s;const t=(s=e==null?void 0:e.detail)==null?void 0:s.reason;t==="live"?_d():t==="video"?kt():Dd(t)})}function p$(){window.addEventListener(jd,e=>{try{Hd(document,e.detail)}catch{}})}function m$(){window.addEventListener("dbs:messages-unread",()=>{try{n$()}catch{}})}async function h$(){var t;if(!Ie()){Cs();return}const e=D().user;e&&e.authSource!=="backend"&&xs();try{const s=await Ve.me();s!=null&&s.user?(ws(s.user),di(s.user),Ai()):Cs(),xo((s==null?void 0:s.roles)||[])}catch(s){if((s==null?void 0:s.status)===401){xo([]),Cs(),((t=D().user)==null?void 0:t.authSource)==="backend"&&xs();return}console.warn("PIKK startup session check failed",s)}}async function f$(){var e;if((e=document.getElementById("pikkSkipContent"))==null||e.addEventListener("click",()=>{var t;(t=document.getElementById("app"))==null||t.focus()}),oc(),Nd(document),bo(),r$(),og(),u$(),m$(),p$(),document.getElementById("menuBtn").addEventListener("click",()=>ma(!0)),document.getElementById("scrim").addEventListener("click",()=>ma(!1,!0)),document.addEventListener("keydown",t=>{var s;t.key!=="Escape"||!((s=document.getElementById("sideNav"))!=null&&s.classList.contains("open"))||(t.preventDefault(),ma(!1,!0))}),document.getElementById("sideNav").addEventListener("click",t=>{const s=t.target.closest(".drawer-cat");if(s){t.preventDefault();const a=s.closest(".drawer-group"),i=!a.classList.contains("open");document.querySelectorAll("#sideNav .drawer-group").forEach(n=>{const o=i&&n===a;n.classList.toggle("open",o);const r=n.querySelector(".drawer-cat");r&&r.setAttribute("aria-expanded",o?"true":"false")});return}t.target.closest("a")&&ma(!1)}),document.getElementById("notifBtn").addEventListener("click",()=>{location.hash="/notifications"}),await h$(),hg(l$),fg(),cd(),(!Ap()||!Ls().showSplash)&&!new URLSearchParams(location.search).has("holdSplash")){const t=document.getElementById("splash");t&&t.remove()}else{setTimeout(()=>d$(),Cf);let t=!1;setTimeout(()=>{t||(t=!0,c$())},Af)}}f$();const yo=".pikk-menu-planned, .pikk-create-tile-planned, .drawer-soon, .pikk-notif-planned, [data-coming-soon]";function np(e){var s,a;const t=(((s=e.querySelector(".pikk-menu-title, strong"))==null?void 0:s.textContent)||((a=e.firstChild)==null?void 0:a.textContent)||"").trim();f(t?`${t} · Coming Soon`:"Coming Soon")}document.addEventListener("click",e=>{var s,a;const t=(a=(s=e.target).closest)==null?void 0:a.call(s,yo);t&&(e.preventDefault(),np(t))});document.addEventListener("keydown",e=>{var s,a;if(e.key!=="Enter"&&e.key!==" ")return;const t=(a=(s=e.target).closest)==null?void 0:a.call(s,yo);t&&(e.preventDefault(),np(t))});new MutationObserver(()=>{document.querySelectorAll(yo).forEach(e=>{e.hasAttribute("tabindex")||(e.setAttribute("tabindex","0"),e.setAttribute("role","button"))})}).observe(document.body,{childList:!0,subtree:!0});document.addEventListener("click",e=>{var s,a;const t=(a=(s=e.target).closest)==null?void 0:a.call(s,".pikk-home-circle-strip .pikk-home-circle");t&&Vr("story:"+(t.getAttribute("href")||t.textContent.trim()),{kind:"story",opened:!0,source:t.closest("[data-promoted]")?"promote":"organic"})});
