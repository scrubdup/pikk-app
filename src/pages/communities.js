import {shellPage,esc,toast} from '../ui.js';
import {getState} from '../store.js';
// Browser-local preview. Not a public service and not connected to PIKK Lounge.
const KEY='pikk_forum_local_v1';
const TOPICS=[['music','Music & Artists','♫'],['business','Business & Money','$'],['relationships','Relationships','♡'],['gaming','Gaming','♜'],['sports','Sports','★'],['entertainment','Entertainment','▶'],['lifestyle','Lifestyle','✦'],['general','General Discussion','#']];
const ids=new Set(TOPICS.map(x=>x[0]));
const clean=x=>String(x||'').trim();
function load(){
  try{const v=JSON.parse(localStorage.getItem(KEY)||'{}');return {posts:Array.isArray(v.posts)?v.posts.filter(p=>p&&ids.has(p.topic)).slice(-150):[],votes:v.votes&&typeof v.votes==='object'?v.votes:{},hidden:Array.isArray(v.hidden)?v.hidden:[]};}
  catch{return {posts:[],votes:{},hidden:[]};}
}
function save(v){try{localStorage.setItem(KEY,JSON.stringify(v));return true;}catch{toast('Local storage unavailable');return false;}}
function makePosts(v,user,topic,sort){
  let a=v.posts.filter(p=>!v.hidden.includes(p.id)&&(topic==='all'||p.topic===topic));
  const score=p=>Object.entries(v.votes).reduce((n,x)=>n+(x[0].startsWith(p.id+':')?Number(x[1])||0:0),0);
  a.sort((x,y)=>sort==='top'?score(y)-score(x):sort==='discussed'?(y.replies?.length||0)-(x.replies?.length||0):y.when-x.when);
  if(!a.length)return '<div class="pikk-forum-empty">No discussions yet. Start the first conversation on this browser.</div>';
  return a.map(p=>{
    const label=TOPICS.find(t=>t[0]===p.topic)?.[1]||'Community';
    const replies=Array.isArray(p.replies)?p.replies:[];
    const vote=Number(v.votes[p.id+':'+(user?.id||'guest')])||0;
    return '<article class="pikk-forum-post"><div class="pikk-forum-votes">'+
      '<button data-fvote="1" data-id="'+esc(p.id)+'" aria-label="Upvote" aria-pressed="'+(vote===1)+'" '+(user?'':'disabled')+'>▲</button>'+
      '<b>'+score(p)+'</b><button data-fvote="-1" data-id="'+esc(p.id)+'" aria-label="Downvote" aria-pressed="'+(vote===-1)+'" '+(user?'':'disabled')+'>▼</button></div>'+
      '<div class="pikk-forum-post-content"><p class="pikk-forum-meta">'+esc(label)+' · u/'+esc(p.author)+' · local preview</p>'+
      '<h3>'+esc(p.title)+'</h3><p class="pikk-forum-text">'+esc(p.body)+'</p>'+
      '<button class="pikk-forum-reply-button" data-fopen="'+esc(p.id)+'">▤ '+replies.length+' replies</button> '+
      (user&&user.id!==p.owner?'<button class="pikk-forum-reply-button" data-freport="'+esc(p.id)+'">◇ Hide / report locally</button>':'')+
      '<div class="pikk-forum-thread" data-thread="'+esc(p.id)+'" hidden>'+
      replies.map(r=>'<p class="pikk-forum-comment"><strong>'+esc(r.author)+'</strong> '+esc(r.body)+'</p>').join('')+
      (user?'<form data-freply="'+esc(p.id)+'"><label>Reply</label><textarea maxlength="1000" required rows="2" placeholder="Join the discussion"></textarea><button class="btn primary" type="submit">Reply · local</button></form>':'<a href="#/profile" class="btn ghost">Sign in to reply</a>')+
      '</div></div></article>';
  }).join('');
}
export function renderCommunities(){
  const user=getState().user;
  const tabs=TOPICS.map(t=>'<button data-ftopic="'+t[0]+'" type="button" aria-pressed="false"><span>'+t[2]+'</span>'+esc(t[1])+'</button>').join('');
  return shellPage('PIKK Communities',
    '<section class="pikk-forum-hero"><p class="kicker">PIKK CONNECT · TOPICS & DISCUSSIONS</p><h2>Find your people. <span>Start the conversation.</span></h2><p>Explore communities around what matters to you. Discuss, upvote, reply and discover new ideas.</p><a class="btn ghost" href="#/community">PIKK Lounge</a> <a class="btn ghost" href="#/posts">Social Posts</a></section>'+
    '<p class="pikk-forum-warning"><b>TEST MODE:</b> These conversations and votes are saved only in this browser. No public posting, account verification or server-side moderation is active.</p>'+
    '<div id="pikkForum" class="pikk-forum-layout"><aside class="pikk-forum-sidebar"><h3>Explore topics</h3><button class="on" data-ftopic="all" aria-pressed="true">✦ All discussions</button>'+tabs+'</aside>'+
    '<main class="pikk-forum-center"><nav class="pikk-forum-sort" aria-label="Sort posts"><button class="on" data-fsort="new" aria-pressed="true">✦ New</button><button data-fsort="top" aria-pressed="false">▲ Top</button><button data-fsort="discussed" aria-pressed="false">▤ Discussed</button></nav>'+
    '<div class="pikk-forum-topic-board"><h3>Discover communities</h3><div class="pikk-forum-topic-cards">'+TOPICS.map(t=>'<button data-ftopic="'+t[0]+'" aria-pressed="false"><span>'+t[2]+'</span><strong>'+esc(t[1])+'</strong></button>').join('')+'</div></div>'+
    '<section class="pikk-forum-compose"><h3>Start a discussion</h3>'+(user?'<form id="pikkForumForm"><label for="pikkForumTopic">Community</label><select id="pikkForumTopic">'+TOPICS.map(t=>'<option value="'+t[0]+'">'+esc(t[1])+'</option>').join('')+'</select><label for="pikkForumTitle">Title</label><input id="pikkForumTitle" required maxlength="110" placeholder="What is on your mind?" /><label for="pikkForumBody">Discussion</label><textarea id="pikkForumBody" required maxlength="4000" rows="3" placeholder="Ask a question or share a thought..."></textarea><button class="btn primary" type="submit">Publish locally · TEST MODE</button></form>':'<p class="muted">Sign in with a PIKK demo account to write discussions and vote.</p><a href="#/profile" class="btn primary">Sign in</a>')+'</section>'+
    '<section><h3 class="pikk-forum-feed-title">Community discussions</h3><div id="pikkForumFeed"></div></section></main>'+
    '<aside class="pikk-forum-info"><h3>About PIKK Communities</h3><p>Topic-based discussion with an original PIKK look, separate from the live Lounge and social feed.</p><h3>Community safety</h3><p>Respect others. No harassment, hate, scams or personal information. Reports on this preview only hide posts on your device.</p><a href="#/guidelines">Community Guidelines</a></aside></div>',
    {lead:'Topic communities · discussions · voting · replies · local preview'});
}
export function bindCommunities(root){
  const host=root.querySelector('#pikkForum');if(!host)return;
  let topic='all',sort='new';
  const user=()=>getState().user;
  const feed=host.querySelector('#pikkForumFeed');
  const redraw=()=>{feed.innerHTML=makePosts(load(),user(),topic,sort);};
  const query=new URLSearchParams(location.hash.split('?')[1]||'').get('topic');
  if(ids.has(query))topic=query;
  function pressed(selector,key,value){host.querySelectorAll(selector).forEach(b=>{let on=b.dataset[key]===value;b.classList.toggle('on',on);b.setAttribute('aria-pressed',String(on));});}
  pressed('[data-ftopic]','ftopic',topic);
  host.addEventListener('click',e=>{
    const t=e.target.closest('[data-ftopic]');if(t){topic=t.dataset.ftopic;pressed('[data-ftopic]','ftopic',topic);const select=host.querySelector('#pikkForumTopic');if(select&&topic!=='all')select.value=topic;redraw();return;}
    const so=e.target.closest('[data-fsort]');if(so){sort=so.dataset.fsort;pressed('[data-fsort]','fsort',sort);redraw();return;}
    const op=e.target.closest('[data-fopen]');if(op){const p=host.querySelector('[data-thread="'+op.dataset.fopen+'"]');if(p)p.hidden=!p.hidden;return;}
    const vote=e.target.closest('[data-fvote]');if(vote&&user()){const v=load(),key=vote.dataset.id+':'+user().id,n=Number(vote.dataset.fvote);v.votes[key]=v.votes[key]===n?0:n;if(save(v))redraw();return;}
    const hide=e.target.closest('[data-freport]');if(hide&&user()){if(!confirm('Hide this post on this browser? This will NOT submit a report to a server.'))return;const v=load();v.hidden.push(hide.dataset.freport);if(save(v))redraw();toast('Hidden locally only — no server report submitted');}
  });
  host.addEventListener('submit',e=>{
    const form=e.target;if(!(form instanceof HTMLFormElement)||!user())return;
    e.preventDefault();
    if(form.id==='pikkForumForm'){
      const title=clean(form.querySelector('input')?.value),body=clean(form.querySelector('textarea')?.value),chosen=form.querySelector('select')?.value;
      if(!title||!body||!ids.has(chosen))return;
      const v=load();v.posts.push({id:'local-'+Date.now()+'-'+Math.random().toString(36).slice(2,8),owner:user().id,author:clean(user().username).slice(0,30)||'Member',title,body,topic:chosen,when:Date.now(),replies:[]});
      if(save(v)){topic=chosen;pressed('[data-ftopic]','ftopic',topic);form.reset();redraw();toast('Saved only on this browser · TEST MODE');}
    } else if(form.dataset.freply){
      const body=clean(form.querySelector('textarea')?.value);if(!body)return;
      const v=load(),p=v.posts.find(x=>x.id===form.dataset.freply);if(!p)return;
      p.replies ||= [];p.replies.push({author:clean(user().username).slice(0,30)||'Member',body});
      if(save(v)){redraw();const panel=host.querySelector('[data-thread="'+p.id+'"]');if(panel)panel.hidden=false;toast('Reply saved locally');}
    }
  });
  redraw();
}
