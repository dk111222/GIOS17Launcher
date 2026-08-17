/* ================= 创新板式 NEO · 服务信息看板 ================= */
let MODE=localStorage.getItem('gree-mode')||'classic';
/* ---------- 图标 ---------- */
const NEO_IC={
 scan:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2M4 12h16"/></svg>',
 bell:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2.5h-15z"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>',
 mic:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><rect x="9" y="2.5" width="6" height="11.5" rx="3"/><path d="M5.8 11.2a6.2 6.2 0 0 0 12.4 0"/><path d="M12 17.4v3.1"/><path d="M9 20.5h6"/></svg>',
 now:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8"/></svg>',
 flow:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4 7h9a3 3 0 0 1 3 3v0a3 3 0 0 0 3 3h1"/><path d="M18 10l2 3-2 3"/><path d="M4 17h7"/></svg>',
 space:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10.5 12 4l8 6.5"/><path d="M6.5 9.5V20h11V9.5"/><path d="M10 20v-4.5h4V20"/></svg>',
 me:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="12" cy="8" r="3.6"/><path d="M5 20c1.4-3.4 4-5 7-5s5.6 1.6 7 5"/></svg>',
 spark:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><path d="M12 3l1.9 5.6 5.6 1.4-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z"/><path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/></svg>',
 back:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 5l-7 7 7 7"/></svg>',
 shop:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9l1.2-4h13.6L20 9M4 9v11h16V9M4 9h16M9.5 20v-6h5v6"/></svg>'};
/* ---------- 空间素材 ---------- */
const NEO_ROOM_IMG={'客厅':'img/neo_living.jpg','主卧':'img/neo_bedroom.jpg','厨房':'img/neo_kitchen.jpg','儿童房':'img/neo_kid.jpg','书房':'img/neo_study.jpg','阳台':'img/neo_balcony.jpg','餐厅':'img/neo_dining.jpg','卫生间':'img/neo_bath.jpg'};
const NEO_ROOM_TINT={'书房':['#edf0e6','#8a9a78'],'阳台':['#e4efe8','#4e8a70'],'餐厅':['#f6ece1','#b08355'],'卫生间':['#e5edf3','#5d82a2']};
let neoView='now';
function neoSky(){const h=new Date().getHours();return (h>=22||h<6)?'night':(h>=17?'dusk':'')}
function neoRun(){return DEVICES.filter(d=>d.on).length}
function devBrief(d){
  if(d.type==='ac')return d.on?`${d.mode} · ${d.t}°C`:'已关闭';
  if(d.type==='light')return d.on?`亮度 ${d.bri}%`:'已关闭';
  if(d.type==='fridge')return '冷藏 5° · 冷冻 -18°';
  if(d.type==='washer')return S.washer.running?`${S.washer.mode} · 剩余 ${fmt(S.washer.left)}`:'已暂停';
  if(d.type==='oven')return S.oven.cooking?`${S.oven.dish} · 剩余 ${fmt(S.oven.left)}`:'待机';
  if(d.type==='hood')return d.on?`${d.gear||2} 档运行`:'已关闭';
  if(d.type==='heater')return d.on?'45°C 保温中' :'已关闭';
 if(d.type==='eheater')return d.on?`${d.mode||'静热'} · ${d.t||28}°C`:'已关闭';
  return d.on?'运行中':'已关闭';
}
/* ---------- 视图：此刻 ---------- */
function neoNowHTML(){
  const a=airOf(S.airRoom);const h=HOMES[S.homeIdx||0]||HOMES[0];
  const washOn=S.washer.running&&S.washer.left>0,ovenOn=S.oven.cooking&&S.oven.left>0,riceOn=S.rice.cooking&&S.rice.left>0;
  const aiList=AI_SERVICES.filter(v=>aiOn(v));
  const aiIc=v=>{const c=AI_CATS.find(x=>x.n===v.cat)||AI_CATS[0];
    return {bg:c.c,ic:c.ic.replace(/stroke="#[0-9a-fA-F]{3,6}"/g,'stroke="#fff"').replace('width="18" height="18"','width="15" height="15"')};};
  return `
  <section class="neo-hero ${neoSky()}"><div class="neo-hero-in">
    <div class="neo-toprow rise" style="--d:.02s">
      <button class="neo-homepill" id="neoHome">${HOME_SVG.replace('width="14" height="14"','width="13" height="13"')}<span style="overflow:hidden;text-overflow:ellipsis">${h.n}</span><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.8)" stroke-width="2.2"><path d="M6 9l6 6 6-6"/></svg></button>
      <div class="neo-top-ic">
        <button class="neo-icbtn" id="neoScan">${NEO_IC.scan}</button>
        <button class="neo-icbtn" id="neoBell">${NEO_IC.bell}<i class="neo-badge">5</i></button>
        <button class="neo-icbtn" id="neoAdd"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button>
      </div>
    </div>
    <div class="neo-statusline rise" style="--d:.1s;margin-top:20px">
      <span class="neo-breath"><i></i></span>
      <div class="neo-status-t"><b>家安好</b><span>${DEVICES.length} 台设备 · ${neoRun()} 台运行 · 无异常</span></div>
    </div>
  </div></section>

  <section class="neo-sec rise" style="--d:.16s">
    <div class="neo-lab"><span>01</span>家安好<em>空气 · 能源 · 安全</em></div>
    <div class="neo-trio">
      <button class="neo-trio-c neo-card nbig" id="neoAir">
        <span class="nb-ic" style="background:rgba(139,188,111,.18);color:#7aa55c">${ND_G.air}</span>
        <b class="nb-v" style="color:#7aa55c">${a.aqi}</b>
        <span class="nb-l">空气 · ${a.t}° ${a.h}%</span>
        <div class="tc-bar"><i style="width:92%;background:#8fbc6f"></i></div>
      </button>
      <button class="neo-trio-c neo-card nbig" id="neoEng">
        <span class="nb-ic" style="background:rgba(242,166,90,.18);color:#ef9b4a">${ND_G.zap}</span>
        <b class="nb-v" style="color:#ef9b4a">18.6°</b>
        <span class="nb-l">能源 · 光伏 12.4°</span>
        <div class="tc-bar"><i style="width:68%;background:#f2a65a"></i></div>
      </button>
      <button class="neo-trio-c neo-card nbig" id="neoSafe">
        <span class="nb-ic" style="background:rgba(91,141,239,.16);color:#5b8def">${ND_G.shield}</span>
        <b class="nb-v" style="color:#5b8def">正常</b>
        <span class="nb-l">燃气 · 水浸 · 门磁</span>
        <div class="tc-dots"><i></i><i></i><i></i></div>
      </button>
    </div>
  </section>

  <section class="neo-sec rise" style="--d:.22s">
    <div class="neo-lab"><span>02</span>进行中<em><a id="neoDevAll">查看所有设备 ›</a></em></div>
    <div class="neo-live-row">
      <button class="neo-live neo-card nlive" id="neoLiveWash">
        <div class="nl-top"><span class="nb-ic" style="background:rgba(223,118,66,.14);color:#df7642">${IC.washer('#df7642')}</span>
          <div class="nl-tt"><b>洗衣机</b><span id="neoWashSub">${washOn?'混合洗 · 剩余':'已完成'}</span></div></div>
        <b class="nl-time" id="neoWash">${fmt(S.washer.left)}</b>
        <div class="nl-bar"><i id="neoWashBar" style="width:${S.washer.left/(28*60)*100}%"></i></div>
      </button>
      <button class="neo-live neo-card nlive" id="neoLiveOven">
        <div class="nl-top"><span class="nb-ic" style="background:rgba(223,118,66,.14);color:#df7642">${IC.oven('#df7642')}</span>
          <div class="nl-tt"><b>蒸烤箱</b><span id="neoOvenSub">${ovenOn?(S.oven.dish||'烹饪')+' · 剩余':'保温中'}</span></div></div>
        <b class="nl-time" id="neoOven">${fmt(S.oven.left)}</b>
        <div class="nl-bar"><i id="neoOvenBar" style="width:${S.oven.left/(5*60)*100}%"></i></div>
      </button>
      <button class="neo-live neo-card nlive" id="neoLiveRice">
        <div class="nl-top"><span class="nb-ic" style="background:rgba(223,118,66,.14);color:#df7642">${IC.rice('#df7642')}</span>
          <div class="nl-tt"><b>电饭煲</b><span id="neoRiceSub">${riceOn?S.rice.dish+' · 剩余':'保温中'}</span></div></div>
        <b class="nl-time" id="neoRice">${fmt(S.rice.left)}</b>
        <div class="nl-bar"><i id="neoRiceBar" style="width:${S.rice.left/(35*60)*100}%"></i></div>
      </button>
      <button class="neo-live neo-card nlive" id="neoLiveAI">
        <div class="nl-top"><span class="nb-ic" style="background:rgba(138,122,184,.16);color:#8a7ab8">${NEO_IC.spark}</span>
          <div class="nl-tt"><b>AI 服务</b><span>自动看家中</span></div></div>
        <b class="nl-time">${aiList.length}<span> 项在运行</span></b>
        <div class="nl-bar"><i style="width:100%;background:linear-gradient(90deg,#b3a6d8,#8a7ab8)"></i></div>
      </button>
    </div>
    <div class="nai-g">
      ${aiList.slice(0,4).map(v=>{const m=aiIc(v);return `<button class="nai" data-nsvc="${v.id}">
        <span class="nb-ic" style="background:${m.bg}">${m.ic}</span>
        <b>${v.name}</b><span class="st"><i></i>运行中</span></button>`}).join('')}
      ${aiList.length>4?`<button class="nai-more" id="neoAiMore">查看全部 ${aiList.length} 项 AI 服务 ${svgArrow}</button>`:''}
    </div>
  </section>

  <section class="neo-sec rise" style="--d:.28s">
    <div class="neo-lab"><span>03</span>待处理<em>${V2_TODOS.length} 项 · 一键办</em></div>
    ${V2_TODOS.map((t,i)=>{const mi=NT_MALL[i];
      if(mi)return `<button class="neo-todo2 neo-card nt-mall" data-ntodo="${i}">
      <span class="nt-ic nt-img"><img src="${mi.img}" alt=""></span>
      <div><b>${t.t}</b><span>${t.p} · ${t.time}</span></div><span class="go">${svgArrow}</span>
      <div class="nt-mallft" style="background-image:url('${mi.ft}')"><span>${mi.ftt}</span><b>${mi.btn}</b></div>
      </button>`;
      return `<button class="neo-todo2 neo-card" data-ntodo="${i}">
      <span class="nt-ic" style="background:${t.c}1a;color:${t.c}">${t.ic}</span>
      <div><b>${t.t}</b><span>${t.p} · ${t.time}</span></div><span class="go">${svgArrow}</span></button>`;}).join('')}
  </section>`;
}
/* ---------- 视图：时刻 ---------- */
const NEO_EVENTS=[
 ...EV_DONES.map(e=>({time:e.time,t:e.t,d:e.d,svc:e.svc||'',kind:'auto'})),
 {time:'12:30',t:'你将客厅空调调至 26°',d:'制冷 · 风速自动 · 手机远程操作',kind:'man'},
 {time:'11:47',t:'你启动了蒸烤箱「清蒸鲈鱼」',d:'蒸制 18 分钟 · 完成后自动转保温',kind:'man'},
 {time:'09:12',t:'李婷将主卧温度调至 26°',d:'格力家 App · 远程操作',kind:'man'},
 {time:'07:05',t:'你打开了客厅新风机',d:'手动开启 · 智能模式运行',kind:'man'},
];
let momTab='all';
const t2min=s=>{const[a,b]=s.split(':');return +a*60+(+b)};
function neoMomListHTML(){
  const list=NEO_EVENTS.filter(e=>momTab==='all'||e.kind===momTab).sort((x,y)=>t2min(y.time)-t2min(x.time));
  return list.map(e=>`
   <div class="neo-tl-item"><span class="neo-tl-time">${e.time}</span><span class="neo-tl-dot${e.kind==='auto'?' ai':''}"></span>
     <button class="neo-tl-card neo-card" data-flowsvc="${e.svc||''}"><h5>${e.t}</h5><p>${e.d}</p>
     <span class="neo-mom-tag ${e.kind}">${e.kind==='auto'?'自动完成':'手动完成'}</span></button>
   </div>`).join('');
}
const NEO_PLAN=[
 {time:'19:25',s:'热水器 45°C',t:'热水器 · 提前备好 45°C 热水',why:'你工作日通常 19:30 洗澡 · 提前 5 分钟准备',kind:'ai'},
 {time:'22:50',s:'主卧空调 26°C',t:'主卧空调 · 提前制冷至 26°C',why:'你通常 23:00 入睡 · 主卧当前 30°C，提前 10 分钟开启',kind:'ai'},
 {time:'22:10',s:'提醒放衣·自动洗衣',t:'提醒放入工作服 · 自动开始洗衣',why:'工作服标准洗约 45 分钟 · 建议 22:10 前放入，完成后提醒你',kind:'ai'},
 {trig:'洗碗完成后',s:'洗碗机消毒',t:'洗碗机 · 自动追加消毒程序',why:'昨天碗筷未消毒 · 今天洗碗结束后自动开启消毒，保证碗筷洁净',kind:'ai'},
];
let neoPlanOff=new Set(); /* 「不需要」的安排 */
function neoPlanHTML(){
  const now=new Date().getHours()*60+new Date().getMinutes();
  const all=NEO_PLAN.map((p,i)=>({...p,i})).filter(p=>!neoPlanOff.has(p.i));
  const timed=all.filter(p=>p.time);
  const upcoming=timed.filter(p=>t2min(p.time)>=now);
  const list=(upcoming.length?upcoming:timed).concat(all.filter(p=>!p.time));
  if(!list.length)return '<div style="font-size:11px;color:rgba(255,255,255,.6);padding:16px 0;text-align:center">暂无安排 · AI 将持续学习规划</div>';
  return list.map((p,idx)=>`<div class="npl-item${idx===0?' next':''}"><div class="neo-plan-item"><time>${p.time||p.trig}${p.time&&t2min(p.time)<now?' <small>次日</small>':''}</time><div class="np-t"><b>${p.t}</b><small>${p.why}</small></div><span class="nx ai">AI 规划</span></div>
   <div class="np-acts"><button data-npa="do" data-npi="${p.i}">马上执行</button><button data-npa="no" data-npi="${p.i}">不需要</button><button data-npa="delay" data-npi="${p.i}">延时</button></div></div>`).join('');
}
/* 延时：底部弹窗 · 无极选择小时/分钟 */
function openNeoPlanDelay(p){
  const m=openModal(`<div class="ac-sheet-t">延时执行 · ${p.s||p.t}</div>
   <div class="np-wheels">
    <div class="np-wheel" id="npWh">${'<i></i>'.repeat(2)}${Array.from({length:24},(_,h)=>`<b>${h} 小时</b>`).join('')}${'<i></i>'.repeat(2)}</div>
    <div class="np-wheel" id="npWm">${'<i></i>'.repeat(2)}${Array.from({length:60},(_,x)=>`<b>${String(x).padStart(2,'0')} 分</b>`).join('')}${'<i></i>'.repeat(2)}</div>
    <div class="np-wheel-hl"></div>
   </div>
   <div class="ac-opt" id="npDelayOk"><span style="margin:auto;color:#0284c7;font-weight:700">确认延时</span></div>`);
  const H=34;
  const bindWheel=(id,def)=>{const wl=m.querySelector(id);
    requestAnimationFrame(()=>{wl.scrollTop=def*H;sync();});
    const sync=()=>{const sel=Math.round(wl.scrollTop/H);
      wl.querySelectorAll('b').forEach((x,xi)=>x.classList.toggle('on',xi===sel));};
    wl.addEventListener('scroll',sync,{passive:true});};
  bindWheel('#npWh',1);bindWheel('#npWm',30);
  m.querySelector('#npDelayOk').onclick=()=>{
    const h=Math.round(m.querySelector('#npWh').scrollTop/H),mm=Math.round(m.querySelector('#npWm').scrollTop/H);
    closeModal(m);
    toast(`已延时 ${h?h+' 小时 ':''}${mm?mm+' 分钟 ':''}后执行「${p.s||p.t}」（演示）`);};
}
function neoFlowHTML(){
  const autoCnt=NEO_EVENTS.filter(e=>e.kind==='auto').length,manCnt=NEO_EVENTS.length-autoCnt;
  return `
  <div class="neo-flow-head rise" style="--d:.02s">
    <div class="neo-flow-num">${NEO_EVENTS.length}</div>
    <div class="neo-flow-head-t"><b>件事，家今天已完成</b><span>${autoCnt} 件自动完成 · ${manCnt} 件手动操作</span></div>
  </div>
  <div class="neo-mom-tabs rise" style="--d:.06s" id="neoMomTabs">
    <button data-mtab="all" class="${momTab==='all'?'on':''}">所有事件</button>
    <button data-mtab="auto" class="${momTab==='auto'?'on':''}">自动完成</button>
    <button data-mtab="man" class="${momTab==='man'?'on':''}">手动完成</button>
  </div>
  <div class="neo-mom-box rise" id="neoMomBox" style="--d:.1s">
    <div class="neo-tl" id="neoMomList">${neoMomListHTML()}</div>
  </div>
  <div class="neo-plan rise" style="--d:.16s">
    <div class="np-head"><h4>接下来 · 家的安排</h4><button class="np-info" id="neoPlanInfo"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><circle cx="12" cy="7.6" r=".6" fill="currentColor"/></svg><span>AI 如何规划</span></button></div>
    <div id="neoPlanList">${neoPlanHTML()}</div>
  </div>`;
}
/* 事件盒高度吸附：只显示完整卡片，避免底边把事件卡切半（视觉上像被下方卡片盖住）；
   用 offsetTop/offsetHeight 纯布局单位测量（getBoundingClientRect 会受手机框 scale 变换影响而失效）；
   若 41vh 内不足 3 张则保底显示 3 张 */
function neoMomBoxFit(){
  const box=document.querySelector('#nv-flow #neoMomBox');if(!box)return;
  box.style.maxHeight='';
  const cap=box.clientHeight;if(!cap)return;
  const items=[...box.querySelectorAll('.neo-tl-item')];if(!items.length)return;
  const relB=it=>{let y=0,n=it;while(n&&n!==box){y+=n.offsetTop;n=n.offsetParent;}return y+it.offsetHeight;};
  let fit=0,n=0;
  for(const it of items){const b=relB(it);if(b<=cap+1){fit=b;n++;}else break;}
  if(n===items.length)return; /* 全部放得下：随内容自适应 */
  if(n<3&&items.length>=3)fit=relB(items[2]);
  if(fit>0)box.style.maxHeight=Math.ceil(fit)+'px';
}
/* ---------- 视图：空间 ---------- */
function neoRoomChips(r){
  const ds=roomDevs(r),run=ds.filter(d=>d.on).length,a=airOf(r);
  const who=ROOMS.find(x=>x.name===r).who;
  const lights=ds.filter(d=>d.type==='light'),lOn=lights.some(d=>d.on);
  const lamp=lights.length?(lOn?'灯 开':'灯 关'):null;
  const out=[];
  if(r==='厨房'){
    out.push(`${a.t}° · ${a.h}%`,'安防 正常',`临期食材 ${FOODS.filter(f=>f.days<=7).length} 种`,who?'有人':'无人',`${run}/${ds.length} 运行`);
    if(S.rice.cooking&&S.rice.left>0)out.push({t:`电饭煲 剩 ${fmt(S.rice.left)}`,live:1});
  }else if(r==='阳台'){
    if(lamp)out.push(lamp);
    out.push(who?'有人':'无人',`${run}/${ds.length} 运行`);
    if(S.washer.running&&S.washer.left>0)out.push({t:`洗衣机 剩 ${fmt(S.washer.left)}`,live:1});
  }else{
    if(lamp)out.push(lamp);
    out.unshift(`${a.t}° · ${a.h}%`,`空气 ${a.aqi}`);
    out.push(who?'有人':'无人',`${run}/${ds.length} 运行`);
  }
  return out;
}
function neoSpaceHTML(){
  const chipHTML=(r,cls)=>neoRoomChips(r).map(c=>typeof c==='string'
    ?`<span class="${cls}">${c}</span>`:`<span class="${cls} live">${c.t}</span>`).join('');
  return `
  <div class="neo-space-head rise" style="--d:.02s"><h2>空间</h2><p>${ROOMS.length} 个房间 · ${neoRun()}/${DEVICES.length} 台设备运行中</p></div>
  ${ROOMS.map((rm,i)=>{const r=rm.name,who=rm.who;
    return `<button class="neo-roomcard rise" style="--d:${.06+i*.05}s" data-nroom="${r}">
    <img src="${NEO_ROOM_IMG[r]}"><span class="rc-shade"></span>
    <div class="rc-info"><h3>${r}</h3>${who?'<span class="rc-tag who">有人</span>':''}<span class="rc-temp">${S.roomT[r]}°</span>
    <span class="rc-chips">${chipHTML(r,'rc-chip')}</span></div>
  </button>`}).join('')}`;
}
/* ---------- 房间面板（高保真） ---------- */
function openNeoRoom(name){
  openRoomV3(name);
  const rec=stackOpen[stackOpen.length-1];if(!rec)return;
  const el=rec.el;el.classList.add('nv3');
  const img=NEO_ROOM_IMG[name],who=ROOMS.find(r=>r.name===name).who,ds=roomDevs(name);
  const psc=el.querySelector('.page-scroll');if(!psc)return;
  const h=document.createElement('div');h.className='nv3-hero';
  h.innerHTML=`${img?`<img src="${img}">`:`<div style="width:100%;height:100%;background:linear-gradient(150deg,#efe9db,#f8f4ea)"></div>`}<span class="nv3-shade"></span>
   <div class="nv3-hero-t"><h1>${name}</h1><p>${who?'有人':'无人'} · ${ds.filter(d=>d.on).length}/${ds.length} 台运行</p></div>`;
  psc.prepend(h);
}
function openNeoDevices(){
  openDevicesPage();
  const rec=stackOpen[stackOpen.length-1];if(rec)rec.el.classList.add('nv3');
}
/* ---------- 董明珠店主体（英雄卡以下）：为你推荐 + 我的服务 ---------- */
function neoMallBodyHTML(){
  return `<div style="font-size:10.5px;letter-spacing:.14em;color:#8f8a7c;font-weight:700;margin:2px 2px 10px">为你推荐</div>
   ${MALL.map((m,i)=>`<div class="shop-card" style="background:#fffdf9"><img src="${m.img}"><div class="sc-t"><h5>${m.t}</h5><p>${m.p}</p></div><button class="sc-btn" data-mall="${i}">${m.btn}</button></div>`).join('')}
   ${svcHTML(1)}`;
}
function bindNeoMall(ct){
  if(!ct)return;
  const q=s=>ct.querySelector(s),qa=s=>[...ct.querySelectorAll(s)];
  const gm=q('#goMall');if(gm)gm.onclick=()=>openWebView('https://fmall.gree.com/','董明珠店');
  qa('[data-mall]').forEach(b=>b.onclick=()=>openWebView(MALL[+b.dataset.mall].url,'董明珠店'));
  const oa=q('#orderAll');if(oa)oa.onclick=()=>toast('演示环境：全部订单列表');
  const sa=q('#svcAll');if(sa)sa.onclick=()=>toast('演示环境：全部服务大厅');
  qa('[data-odent]').forEach(b=>b.onclick=()=>{
    if(b.dataset.odent.indexOf('运输中')>-1){const oc=q('#odCard');if(oc)oc.scrollIntoView({behavior:'smooth',block:'center'});toast('1 个包裹正在运输中，物流进度见下方卡片');}
    else toast('演示环境：'+b.dataset.odent);});
  qa('[data-svcent]').forEach(b=>b.onclick=()=>{
    const k=b.dataset.svcent;
    if(k==='trade'){openWebView('https://fmall.gree.com/','董明珠店');toast('已为你跳转以旧换新专区');}
    else if(k==='more')openWebView('https://fmall.gree.com/distributionh5/#/user','董明珠店');
    else if(k==='cs')toast('已为你接入格力在线客服，请稍候…');
    else if(k==='cpn')toast('已领取新人券包 ¥500，结算时自动抵扣');
    else toast('演示环境：附近门店 3 家，最近 1.2km');});
  const odTk=q('#odSlides');if(!odTk)return;
  const odDs=qa('#odDots i');let odIdx=0,tmr=null;
  const goOd=i=>{odIdx=(i+MALL_ORDERS.length)%MALL_ORDERS.length;
    odTk.style.transform=`translateX(${-odIdx*100}%)`;
    odDs.forEach((d,j)=>d.classList.toggle('on',j===odIdx));};
  const auto=()=>{clearInterval(tmr);tmr=setInterval(()=>{
    if(!document.body.contains(odTk)){clearInterval(tmr);return}
    goOd(odIdx+1);},4200);};
  auto();
  let odSx=null;
  odTk.addEventListener('touchstart',e=>{odSx=e.touches[0].clientX},{passive:true});
  odTk.addEventListener('touchend',e=>{if(odSx===null)return;const dx=e.changedTouches[0].clientX-odSx;odSx=null;
    if(Math.abs(dx)>40){goOd(odIdx+(dx<0?1:-1));auto();}});
  odTk.addEventListener('dragstart',e=>e.preventDefault());
  odTk.addEventListener('mousedown',e=>{e.preventDefault();odSx=e.clientX;
    const up=ev=>{const dx=ev.clientX-odSx;odSx=null;document.removeEventListener('mouseup',up);
      if(Math.abs(dx)>40){goOd(odIdx+(dx<0?1:-1));auto();}};
    document.addEventListener('mouseup',up);});
  qa('[data-odact]').forEach(b=>b.onclick=()=>toast(MALL_ORDERS[+b.dataset.odact].tip));
  qa('[data-odtrack]').forEach(b=>b.onclick=()=>{
    const o=MALL_ORDERS[+b.dataset.odtrack],log=o.track;
    openModal(`<div class="dev-sheet-h"><h3>物流详情</h3><span style="font-size:11px;color:var(--ink3)">${o.no}</span></div>
      <div style="font-size:13px;font-weight:700;margin:2px 0 14px">${o.t} ×1</div>
      <div>${log.map((x,i)=>`<div style="display:flex;gap:12px;position:relative;padding-bottom:${i<log.length-1?'18px':'0'}">
        <div style="display:flex;flex-direction:column;align-items:center;flex:0 0 12px">
          <span style="width:${i===0?'12':'9'}px;height:${i===0?'12':'9'}px;border-radius:50%;${x[2]?(i===0?'background:var(--blue);box-shadow:0 0 0 3px rgba(26,115,232,.16)':'background:var(--blue)'):'background:#dfe3ea'}"></span>
          ${i<log.length-1?`<span style="flex:1;width:2px;background:#e8eaee;margin-top:3px"></span>`:''}
        </div>
        <div style="flex:1;min-width:0;margin-top:-3px">
          <div style="font-size:12px;line-height:1.5;${x[2]?(i===0?'font-weight:700;color:var(--blue)':'color:var(--ink)'):'color:var(--ink3)'}">${x[1]}</div>
          <div style="font-size:10px;color:var(--ink3);margin-top:2px">${x[0]}</div>
        </div></div>`).join('')}</div>
      <div style="margin-top:14px;font-size:10.5px;color:var(--ink3);text-align:center">${o.trackTip}</div>`);
  });
}
/* ---------- 商城工具 + 售后服务（附件参考） ---------- */
const NEO_TOOLS=[
 {n:'地址管理',bg:'#f2994a',act:'addr',ic:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>'},
 {n:'客户服务',bg:'#5b8def',act:'cs',ic:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4 13a8 8 0 1 1 16 0"/><rect x="2.5" y="12.5" width="4" height="6" rx="2"/><rect x="17.5" y="12.5" width="4" height="6" rx="2"/><path d="M20 18.5v1a2.5 2.5 0 0 1-2.5 2.5H13"/></svg>'},
 {n:'以旧换新',bg:'#4a9e78',act:'trade',ic:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h13l-2.5-2.5M20 16H7l2.5 2.5"/></svg>'},
 {n:'领券中心',bg:'#e05a8a',act:'cpn',ic:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4 7h16v4a2 2 0 0 0 0 4v4H4v-4a2 2 0 0 0 0-4V7z"/><path d="M13 8v2M13 12v2M13 16v2"/></svg>'},
 {n:'设置',bg:'#8a7ab8',act:'set',ic:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="12" cy="12" r="3.2"/><path d="M19 12a7 7 0 0 0-.14-1.4l2-1.5-2-3.4-2.3 1a7 7 0 0 0-2.4-1.4L13.7 2h-3.4l-.4 2.6a7 7 0 0 0-2.4 1.4l-2.3-1-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .5.05 1 .14 1.4l-2 1.5 2 3.4 2.3-1a7 7 0 0 0 2.4 1.4l.4 2.6h3.4l.4-2.6a7 7 0 0 0 2.4-1.4l2.3 1 2-3.4-2-1.5c.1-.5.14-1 .14-1.4z"/></svg>'},
 {n:'用户反馈',bg:'#eb7d4a',act:'fb',ic:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="12" cy="8" r="3.6"/><path d="M5 20c1.4-3.4 4-5 7-5s5.6 1.6 7 5"/></svg>'},
 {n:'店铺信息',bg:'#e5484d',act:'shop',ic:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9l1.2-4h13.6L20 9M4 9v11h16V9M4 9h16M9.5 20v-6h5v6"/></svg>'},
 {n:'关于平台',bg:'#00b8a9',act:'about',ic:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5"/><circle cx="12" cy="8" r="1.1" fill="currentColor" stroke="none"/></svg>'},
 {n:'视频百科',bg:'#9d6bd8',act:'video',ic:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="14" rx="3"/><path d="m10.5 9.5 5 2.5-5 2.5z" fill="currentColor" stroke="none"/></svg>'},
 {n:'企业购',bg:'#2ba8c6',act:'biz',ic:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4 20V9l6-4 6 4v11"/><path d="M14 20v-6h-4v6"/><path d="M20 20v-8h-4"/></svg>'},
 {n:'服务网点',bg:'#f2762e',act:'sites',ic:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z"/><path d="M9.5 10.5h5M12 8v5"/></svg>'},
 {n:'尊师惠师',bg:'#6a8fd8',act:'teacher',ic:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="m12 4 9 4.5-9 4.5-9-4.5z"/><path d="M7 11.5V16c0 1.5 2.2 3 5 3s5-1.5 5-3v-4.5"/></svg>'},
];
const NEO_ASVC=[
 {n:'安装',bg:'linear-gradient(140deg,#ffb26b,#f2762e)',ic:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f2762e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="8" width="17" height="11" rx="2.5"/><path d="M8.5 8V6.5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2V8M3.5 12.5h17"/></svg>'},
 {n:'维修',bg:'linear-gradient(140deg,#7db4f5,#3d7ec2)',ic:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3d7ec2" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 5.4-5.4L15 12l-3-3z"/></svg>'},
 {n:'清洗保养',bg:'linear-gradient(140deg,#5ecfd6,#00a8c6)',ic:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00a8c6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M10 3v4L5.5 18a2.5 2.5 0 0 0 2.3 3.5h8.4A2.5 2.5 0 0 0 18.5 18L14 7V3"/><path d="M8 14h8"/></svg>'},
];
const NEO_ASVC2=[
 {n:'移机服务',bg:'#fdf1e6',c:'#f2762e',ic:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7.5" cy="18" r="1.7"/><circle cx="17" cy="18" r="1.7"/></svg>'},
 {n:'拆机服务',bg:'#e8f1ff',c:'#3d7ec2',ic:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="12" rx="2"/><path d="M9 20h6M12 16v4"/></svg>'},
 {n:'回收服务',bg:'#e6f4ec',c:'#4a9e78',ic:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5v2M6.5 7l1 13h9l1-13"/><path d="m10.5 13 1.5 1.5 3-3" stroke-linecap="round"/></svg>'},
 {n:'以旧换新',bg:'#efeaf8',c:'#8a7ab8',ic:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h13l-2.5-2.5M20 16H7l2.5 2.5"/></svg>'},
];
function neoSvcHTML(){
  return `
  <div class="neo-space-head rise" style="--d:.02s"><h2>服务</h2><p>董明珠店 · 商城工具 ${NEO_TOOLS.length} 项 · 售后服务</p></div>
  <div class="neo-mallhero rise" style="--d:.08s">
    <h2>董明珠店</h2>
    <p>格力官方线上商城 · 正品保障 · 全国联保<br>新人礼包已到账，至高 500 元券包</p>
    <button id="goMall">进入线上商城</button>
  </div>
  <div class="neo-sec rise" style="--d:.08s">
    <div class="neo-lab"><span>·</span>为你推荐<em>董明珠店</em></div>
    <div class="neo-mall">${MALL.map((m,i)=>`<div class="shop-card" style="background:#fffdf9"><img src="${m.img}"><div class="sc-t"><h5>${m.t}</h5><p>${m.p}</p></div><button class="sc-btn" data-mall="${i}">${m.btn}</button></div>`).join('')}</div>
  </div>
  <div class="neo-sec rise" style="--d:.12s">
    <div class="neo-lab"><span>·</span>我的服务<em>订单 · 物流</em></div>
    <div class="neo-mall">${svcHTML(1)}</div>
  </div>
  <div class="neo-sec rise" style="--d:.16s">
    <div class="neo-lab"><span>·</span>商城工具<em>${NEO_TOOLS.length} 项</em></div>
    <div class="neo-card neo-tools">${NEO_TOOLS.map(t=>`<div class="neo-tool" data-ntool="${t.act}"><span class="ic" style="background:${t.bg}">${t.ic}</span><span>${t.n}</span></div>`).join('')}</div>
  </div>
  <div class="neo-sec rise" style="--d:.2s">
    <div class="neo-lab"><span>·</span>售后服务<em>自助服务</em></div>
    <div class="neo-asvc-big">${NEO_ASVC.map(s=>`<button class="neo-asvc-b" data-nasvc="${s.n}" style="background:${s.bg}"><span class="ic">${s.ic}</span><span>${s.n}</span></button>`).join('')}</div>
    <div class="neo-card neo-asvc-sm">${NEO_ASVC2.map(s=>`<div class="neo-asvc-s" data-nasvc="${s.n}"><span class="ic" style="background:${s.bg};color:${s.c}">${s.ic}</span><span>${s.n}</span></div>`).join('')}</div>
  </div>`;
}
/* ---------- 系统图标扩展 ---------- */
Object.assign(NEO_IC,{
 search:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.8-3.8"/></svg>',
 chevUp:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m5 15 7-7 7 7"/></svg>',
 apps:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/></svg>',
 wifi:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 9a15 15 0 0 1 19 0M5.5 12.5a10.5 10.5 0 0 1 13 0M8.6 16a6 6 0 0 1 6.8 0"/><circle cx="12" cy="19" r="1.3" fill="currentColor" stroke="none"/></svg>',
 bt:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m7 8 10 8-5 4V4l5 4L7 16"/></svg>',
 cell:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="14" width="3.4" height="6" rx="1"/><rect x="10" y="10" width="3.4" height="10" rx="1"/><rect x="16" y="6" width="3.4" height="14" rx="1"/></svg>',
 disp:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4.4"/><path d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M5 5l1.8 1.8M17.2 17.2 19 19M19 5l-1.8 1.8M6.8 17.2 5 19"/></svg>',
 snd:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 9.5v5h3.5L13 19V5L7.5 9.5z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/></svg>',
 batt:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="8" width="15" height="8" rx="2.5"/><path d="M21 11v2" stroke-linecap="round"/><rect x="5" y="10" width="8" height="4" rx="1.2" fill="currentColor" stroke="none"/></svg>',
 info:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5" stroke-linecap="round"/><circle cx="12" cy="8" r="1.1" fill="currentColor" stroke="none"/></svg>',
 sun:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/></svg>',
 cloud:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 18a4.5 4.5 0 0 1-.4-9A6 6 0 0 1 18 10a3.6 3.6 0 0 1-1 7z"/></svg>',
 rain:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 15a4.5 4.5 0 0 1-.4-9A6 6 0 0 1 18 7a3.6 3.6 0 0 1-1 7z"/><path d="M8 18v2.5M12 18v2.5M16 18v2.5" stroke-linecap="round"/></svg>',
 calc:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="5" y="3" width="14" height="18" rx="3"/><path d="M8.5 7.5h7" stroke-linecap="round"/><circle cx="8.7" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="15.3" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="8.7" cy="16" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="16" r="1" fill="currentColor" stroke="none"/><circle cx="15.3" cy="16" r="1" fill="currentColor" stroke="none"/></svg>',
 dial:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="7" y="3" width="10" height="18" rx="2.5"/><circle cx="9.8" cy="8" r=".9" fill="currentColor" stroke="none"/><circle cx="12.4" cy="8" r=".9" fill="currentColor" stroke="none"/><circle cx="15" cy="8" r=".9" fill="currentColor" stroke="none"/><circle cx="9.8" cy="11.5" r=".9" fill="currentColor" stroke="none"/><circle cx="12.4" cy="11.5" r=".9" fill="currentColor" stroke="none"/><circle cx="15" cy="11.5" r=".9" fill="currentColor" stroke="none"/><circle cx="9.8" cy="15" r=".9" fill="currentColor" stroke="none"/><circle cx="12.4" cy="15" r=".9" fill="currentColor" stroke="none"/><circle cx="15" cy="15" r=".9" fill="currentColor" stroke="none"/></svg>',
 pin:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>',
 alarm:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="13" r="7"/><path d="M12 9.5V13l2.6 1.6M5 3.5 3 5.5M19 3.5l2 2" stroke-linecap="round"/></svg>',
 globe:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.4 3.8 5.3 3.8 8.5s-1.3 6.1-3.8 8.5c-2.5-2.4-3.8-5.3-3.8-8.5s1.3-6.1 3.8-8.5z"/></svg>'});
/* ---------- 应用注册表 ---------- */
const NEO_APPS=[
 {id:'phone',n:'电话',ic:IC.phone(),bg:'#34a853',cat:'通讯',pv:'linear-gradient(160deg,#48bb6a,#2b8a47)',open:()=>neoAppPhone()},
 {id:'msg',n:'信息',ic:IC.msg(),bg:'#1a73e8',cat:'通讯',pv:'linear-gradient(160deg,#3d8bfd,#1a5fd0)',open:()=>openMessages('sms')},
 {id:'browser',n:'浏览器',ic:IC.chrome(),bg:'#ffffff',cat:'通讯',pv:'linear-gradient(160deg,#e8eefb,#c9d6f2)',pvInk:'#1a73e8',open:()=>neoAppBrowser()},
 {id:'camera',n:'相机',ic:IC.cam(),bg:'#3c4043',cat:'影像',pv:'linear-gradient(160deg,#4a4e52,#232628)',open:()=>neoAppCamera()},
 {id:'photos',n:'相册',ic:IC.photo(),bg:'#7c4dff',cat:'影像',pv:'linear-gradient(160deg,#9266ff,#6a3df0)',open:()=>neoAppPhotos()},
 {id:'cal',n:'日历',ic:IC.cal(),bg:'#ffffff',ink:'#1a73e8',cat:'效率',pv:'linear-gradient(160deg,#fff,#e3ecfd)',pvInk:'#1a73e8',open:()=>neoAppCalendar()},
 {id:'clock',n:'时钟',ic:IC.clock(),bg:'#202124',cat:'效率',pv:'linear-gradient(160deg,#3a3c40,#17181a)',open:()=>neoAppClock()},
 {id:'notes',n:'备忘录',ic:IC.note(),bg:'#f29900',cat:'效率',pv:'linear-gradient(160deg,#f7b733,#e8930c)',open:()=>neoAppNotes()},
 {id:'mail',n:'邮件',ic:IC.mail(),bg:'#00a8c6',cat:'通讯',pv:'linear-gradient(160deg,#1ec3e3,#0193b0)',open:()=>neoAppMail()},
 {id:'map',n:'地图',ic:IC.map(),bg:'#e54545',cat:'出行',pv:'linear-gradient(160deg,#f26660,#d23a35)',open:()=>neoAppMap()},
 {id:'weather',n:'天气',ic:NEO_IC.cloud,bg:'#4a90d9',cat:'效率',pv:'linear-gradient(160deg,#63a6e8,#3d7ec2)',open:()=>neoAppWeather()},
 {id:'calc',n:'计算器',ic:NEO_IC.calc,bg:'#8a7ab8',cat:'效率',pv:'linear-gradient(160deg,#9d8fc8,#7767a8)',open:()=>neoAppCalc()},
 {id:'settings',n:'设置',ic:IC.set(),bg:'#5f6368',cat:'系统',pv:'linear-gradient(160deg,#7a7e83,#4c5054)',open:()=>neoAppSettings()},
 {id:'store',n:'应用商店',ic:IC.play(),bg:'#00b8a9',cat:'系统',pv:'linear-gradient(160deg,#16cfbe,#02a191)',open:()=>neoAppStore()},
 {id:'files',n:'文件管理',ic:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linejoin="round"><path d="M3.5 7a2 2 0 0 1 2-2h4l2 2.5h7a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/></svg>',bg:'#f29900',cat:'系统',pv:'linear-gradient(160deg,#f7b733,#e8930c)',open:()=>toast('演示环境：文件管理')},
 {id:'recorder',n:'录音机',ic:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3"/></svg>',bg:'#e54545',cat:'系统',pv:'linear-gradient(160deg,#f26660,#d23a35)',open:()=>toast('演示环境：录音机')},
 {id:'theme',n:'主题',ic:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9"><circle cx="12" cy="12" r="8.5"/><circle cx="9" cy="9.5" r="1.1" fill="#fff" stroke="none"/><circle cx="14.8" cy="8.8" r="1.1" fill="#fff" stroke="none"/><circle cx="8.6" cy="14.6" r="1.1" fill="#fff" stroke="none"/><path d="M12 20.5c2.8 0 3.6-1.6 2.6-3.1-1.2-1.8.4-3.4 2.4-3.4h1.5"/></svg>',bg:'#7c4dff',cat:'系统',pv:'linear-gradient(160deg,#9266ff,#6a3df0)',open:()=>toast('演示环境：主题商店')},
 {id:'music',n:'音乐',ic:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18.5V6l10-2v12.5"/><circle cx="6.5" cy="18.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>',bg:'#f23372',cat:'系统',pv:'linear-gradient(160deg,#f5578f,#d91e5b)',open:()=>toast('演示环境：音乐')},
 {id:'video',n:'视频',ic:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linejoin="round"><rect x="3.5" y="5.5" width="17" height="13" rx="3"/><path d="m10.5 9.5 4.5 2.5-4.5 2.5z" fill="#fff"/></svg>',bg:'#00a8c6',cat:'系统',pv:'linear-gradient(160deg,#1ec3e3,#0193b0)',open:()=>toast('演示环境：视频')},
 {id:'wallet',n:'钱包',ic:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9"><rect x="3.5" y="6" width="17" height="13" rx="3"/><path d="M3.5 10h17M15.5 14.5h2" stroke-linecap="round"/></svg>',bg:'#34a853',cat:'系统',pv:'linear-gradient(160deg,#48bb6a,#2b8a47)',open:()=>toast('演示环境：钱包')},
 {id:'down',n:'下载管理',ic:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v10M7.5 10.5 12 15l4.5-4.5"/><path d="M4.5 19.5h15"/></svg>',bg:'#5f6368',cat:'系统',pv:'linear-gradient(160deg,#7a7e83,#4c5054)',open:()=>toast('演示环境：下载管理')},
 {id:'gree',n:'格力家',ic:IC.gree(),bg:'linear-gradient(135deg,#1a73e8,#00b8a9)',cat:'格力智家',pv:'linear-gradient(160deg,#1a73e8,#00b8a9)',open:()=>openNeoHome()},
 {id:'mall',n:'董明珠店',ic:NEO_IC.shop,bg:'#df7642',cat:'格力智家',pv:'linear-gradient(160deg,#eb9259,#c25e2c)',open:()=>openWebView('https://fmall.gree.com/','董明珠店')},
 {id:'claw',n:'Claw 助手',ic:NEO_IC.spark,bg:'#8a7ab8',cat:'格力智家',pv:'linear-gradient(160deg,#9d8fc8,#7767a8)',open:()=>openClaw()},
];
const NEO_DESK=['browser','photos','cal','clock','notes','mail','map','weather'];
const NEO_DOCK=['phone','msg','camera','gree'];
function neoAppIco(a){return a.ink?a.ic.replaceAll('#fff',a.ink):a.ic}
function ndAppHTML(a,noLabel){return `<div class="nd-app" data-napp="${a.id}"><div class="ic" style="background:${a.bg}">${neoAppIco(a)}</div>${noLabel?'':`<span>${a.n}</span>`}</div>`}
/* ---------- 主渲染：分页桌面（首屏驾驶舱 + 右一屏应用库） ---------- */
const ND_G={leaf:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4C10 4 4.5 9.5 4.5 17c0 1.2.2 2.3.6 3.4.8-4.5 4-9.3 9.4-11.9-4 3.4-6.8 7.8-7.6 12.3.9.3 1.9.4 2.9.4 8 0 11.3-7.6 10.2-17.2z"/></svg>',
 air:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 8h9.5a2.5 2.5 0 1 0-2.4-3.2M3 12h14.5a2.5 2.5 0 1 1-2.4 3.2M3 16h7"/></svg>',
 temp:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 14.8V5a2 2 0 1 0-4 0v9.8a4 4 0 1 0 4 0z"/><circle cx="12" cy="18" r="2"/></svg>',
 drop:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3s6.5 6.8 6.5 11.3a6.5 6.5 0 1 1-13 0C5.5 9.8 12 3 12 3z"/></svg>',
 zap:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4.5 13.5H11L9.5 22 19 9.5h-6.5z"/></svg>',
 shield:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linejoin="round"><path d="M12 3 4.5 6v5.5c0 4.5 3 8 7.5 9.5 4.5-1.5 7.5-5 7.5-9.5V6z"/><path d="m9 11.6 2.2 2.2 4-4" stroke-linecap="round"/></svg>'};
/* ---------- 负一屏：设备列表 + 手机服务 + 格力服务 ---------- */
/* 桌面商城服务卡：与格力家「服务」推荐一致（滤芯购买 / 除湿机 / 以旧换新） */
const ND_MALL=[
 {idx:2,img:MALL[2].img,t:'反渗透滤芯',p:'寿命剩 3 天 · 一键购买'},
 {idx:0,img:MALL[0].img,t:'格力除湿机',p:'湿度 82% 偏高 · 新品推荐'},
 {idx:3,img:MALL[3].img,t:'以旧换新',p:'书房空调 10 年+ · 补贴 800'}];
/* 格力家首页「待处理」商城类条目：icon 换推荐商品图 + 底部商城底图元素（与服务页推荐一致） */
const NT_MALL={
 0:{img:MALL[2].img,ft:MALL[2].img,ftt:'董明珠店 · 滤芯选购',btn:'一键购买 ›'},
 2:{img:MALL[1].img,ft:MALL[1].img,ftt:'董明珠店 · 清洗服务',btn:'预约清洗 ›'}};
const M1_SVG={
 wx:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a90d9" stroke-width="2"><path d="M7 18a4.5 4.5 0 0 1-.4-9A6 6 0 0 1 18 10a3.6 3.6 0 0 1-1 7z"/></svg>',
 cal:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" stroke-width="1.9"><rect x="3.5" y="5" width="17" height="16" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>',
 box:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b26a00" stroke-width="1.9" stroke-linejoin="round"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/></svg>',
 train:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00a8c6" stroke-width="1.9" stroke-linecap="round"><rect x="5" y="3" width="14" height="14" rx="3.5"/><path d="M5 10h14M9 20.5 7 23M15 20.5 17 23"/><circle cx="9" cy="13.5" r=".9" fill="#00a8c6"/><circle cx="15" cy="13.5" r=".9" fill="#00a8c6"/></svg>',
 clean:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4e8a70" stroke-width="1.9" stroke-linecap="round"><path d="M10 3.5h4M12 3.5V7"/><path d="M7 21v-6.5A4.5 4.5 0 0 1 11.5 10h1A4.5 4.5 0 0 1 17 14.5V21"/><path d="M7 21h10"/></svg>',
 trade:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c25e2c" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9a8 8 0 0 1 14-3.5M20 15a8 8 0 0 1-14 3.5"/><path d="M18 2v4h-4M6 22v-4h4"/></svg>',
 sun:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef9b4a" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/></svg>',
 chart:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c4dff" stroke-width="1.9" stroke-linecap="round"><path d="M4 20V4"/><path d="M4 20h16"/><path d="M8.5 15v-4M12.5 15V7M16.5 15v-6"/></svg>',
 memo:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c4dff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h11l3 3v13H5z"/><path d="M9 10h6M9 13.5h6M9 17h4"/></svg>',
 news:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e54545" stroke-width="1.9" stroke-linecap="round"><rect x="3.5" y="5" width="14" height="15" rx="2.5"/><path d="M17.5 8H20a1.5 1.5 0 0 1 1.5 1.5V18a2 2 0 0 1-2 2h-13"/><path d="M7 9h7M7 12.5h7M7 16h4.5"/></svg>'};
const M1_POW='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 3.5v7.5"/><path d="M6.6 6.4a7.5 7.5 0 1 0 10.8 0"/></svg>';
function m1DevCard(d){
  const col=d.on?'#c25e2c':'#8f8a7c';
  return `<button class="m1-dev ${d.on?'on':''}" data-m1dev="${d.id}">
    <b>${d.name}</b><span class="ds">${d.room} · ${devBrief(d)}</span>
    <span class="di">${devIcon(d.type,col).replace('width="24" height="24"','width="22" height="22"')}</span>
    <span class="m1-pw ${d.on?'on':''}" data-m1sw="${d.id}">${M1_POW}</span></button>`;
}
function m1Big(k,ic,bg,t,p){return `<button class="m1-big" data-m1svc="${k}"><span class="sv-ic" style="background:${bg}">${ic}</span><div style="flex:1;min-width:0"><b>${t}</b><p>${p}</p></div><span class="sv-go">›</span></button>`}
function m1Big2(k,ic,bg,t,p){return `<button class="m1-big span2" data-m1svc="${k}"><span class="sv-ic" style="background:${bg}">${ic}</span><div style="flex:1;min-width:0"><b>${t}</b><p>${p}</p></div><span class="sv-go">›</span></button>`}
function m1BigImg(k,src,t,p,fit){return `<button class="m1-big" data-m1svc="${k}"><span class="sv-img${fit==='contain'?' ctn':''}"><img src="${src}" alt=""></span><div style="flex:1;min-width:0"><b>${t}</b><p>${p}</p></div><span class="sv-go">›</span></button>`}
function m1WxCard(){return `<button class="m1-big span2 m1-wx" data-m1svc="weather">
   <div class="m1-wx-in"><b>珠海 · 多云 31°</b><p>湿度 82% · 东南风 3 级 · 傍晚转晴<br>15:00 32° · 17:00 31° · 19:00 29°</p></div>
   <span class="m1-wx-ic">${M1_SVG.wx}</span><span class="sv-go">›</span></button>`}
function m1NewsCard(){return `<button class="m1-big span2" data-m1svc="news">
   <span class="sv-img news"><img src="img/news_launch.jpg" alt="新闻速览"></span>
   <div style="flex:1;min-width:0"><b>新闻速览</b><p>格力电器发布 2026 冷年全屋智能新品<br>珠海今明多云转晴，周末最高 33°</p></div><span class="sv-go">›</span></button>`}
/* ---------- 负一屏「我的场景」（可设置展示哪些场景，最多 4 个） ---------- */
const M1_SCENES_ALL=['回家模式','离家模式','观影模式','睡眠模式','会客模式','节能模式'];
const M1_SCENE_D={'回家模式':'灯光 · 空调 · 新风自动开启','离家模式':'全屋布防 · 电器关闭','观影模式':'灯光渐暗 · 氛围就绪','睡眠模式':'主卧 27° · 灯光关闭','会客模式':'客厅明亮 · 窗帘全开','节能模式':'无人房间自动节能'};
function m1ScenesOn(){try{const v=JSON.parse(localStorage.getItem('m1-scenes'));if(Array.isArray(v)&&v.length)return v.filter(n=>M1_SCENES_ALL.includes(n))}catch(e){}return M1_SCENES_ALL.slice(0,4)}
function m1SceneCard(n){const s=SCENES.find(x=>x.n===n);if(!s)return '';
  return `<button class="m1-scn" data-m1scn="${n}"><img src="${s.img}" alt="${n}"><div style="flex:1;min-width:0"><b>${n}</b><span>${M1_SCENE_D[n]||''}</span></div><span class="m1-scn-go">执行</span></button>`}
/* ---------- 负一屏「格力服务」顶部横幅轮播：新品 / 优惠 / 直播 ---------- */
const M1_BN=[
 {img:'img/m_dehum.png',tag:'新品',t:'格力除湿机 · 新品首发',p:'梅雨天也能干爽舒适 · 直降 300 元',btn:'去看看',url:0,bg:'linear-gradient(120deg,#0e7490 0%,#06b6d4 100%)'},
 {img:'img/m_ac.png',tag:'优惠',t:'空调以旧换新季',p:'旧机至高补贴 800 元 · 新一级能效更省电',btn:'立即换新',url:3,bg:'linear-gradient(120deg,#b45309 0%,#f59e0b 100%)'},
 {img:'',tag:'LIVE',t:'董明珠店 · 直播中',p:'今晚 19:30 全屋智能专场 · 下单抽免单',btn:'进入直播间',url:-1,bg:'linear-gradient(120deg,#6d28d9 0%,#a855f7 100%)'}];
function m1BnHTML(){
  const one=M1_BN.map((b,i)=>`<button class="m1-bn-i" style="background:${b.bg}" data-bn="${i}">
    <div class="m1-bn-t"><span class="m1-bn-tag">${b.tag}</span><b>${b.t}</b><p>${b.p}</p><span class="m1-bn-btn">${b.btn} ›</span></div>
    ${b.img?`<img src="${b.img}" alt="">`:''}</button>`).join('');
  return `<div class="m1-bn"><div class="m1-bn-track" id="m1BnTrack">${one}${M1_BN.length?`<button class="m1-bn-i" style="background:${M1_BN[0].bg}" data-bn="0">
    <div class="m1-bn-t"><span class="m1-bn-tag">${M1_BN[0].tag}</span><b>${M1_BN[0].t}</b><p>${M1_BN[0].p}</p><span class="m1-bn-btn">${M1_BN[0].btn} ›</span></div>
    ${M1_BN[0].img?`<img src="${M1_BN[0].img}" alt="">`:''}</button>`:''}</div></div>
   <div class="m1-bn-dots" id="m1BnDots">${M1_BN.map((_,i)=>`<i class="${i===0?'on':''}"></i>`).join('')}</div>`;
}
function m1BodyHTML(){
  return `<div class="m1-sec"><span>我的场景</span><em>${m1ScenesOn().length} 个 · 一键执行</em><button id="m1DevAll">查看所有设备 ›</button><button class="m1-set" id="m1ScnSet">设置</button></div>
   <div class="m1-scngrid">${m1ScenesOn().map(m1SceneCard).join('')}</div>
   <div class="m1-div"></div>
   <div class="m1-sec"><span>格力服务</span><em>专属</em></div>
   ${m1BnHTML()}
   <div class="m1-grid2">
    ${m1BigImg('clean','img/m_clean.png','清洗服务提醒','客厅空调累计运行 326 小时<br>建议预约深度清洗')}
    ${m1BigImg('trade','img/lw_ac.png','以旧换新','书房空调已使用 10 年+<br>换新至高补贴 800 元','contain')}
    ${m1BigImg('wxrec','img/m_ac.png','天气联动推荐','今日 31° 晴热 · 空调焕新季<br>新一级能效直降')}
    ${m1BigImg('report','img/ai_energy.png','家庭数据报告','本周用电 86.4 度 · 省 8%<br>用水 3.2 吨 · 食材告急 2 种')}
   </div>
   <div class="m1-div"></div>
   <div class="m1-sec"><span>手机服务</span><em>动态展示</em></div>
   <div class="m1-grid2">
    ${m1WxCard()}
    ${m1Big('cal',M1_SVG.cal,'#e3ecfd','明天 9:00 项目评审会','今天 18:00 接孩子 · 20:00 与妈妈视频')}
    ${m1Big('exp',M1_SVG.box,'#f6ece1','快递 1 个待取','净水器滤芯已到驿站<br>取件码 8-2-6305')}
    ${m1Big('trip',M1_SVG.train,'#e0f2f4','周六 G6158 珠海 → 广州南','10:35 开 · 06 车 12A · 已加提醒')}
    ${m1Big('memo',M1_SVG.memo,'#f3edfb','备忘录','购物清单 · 牛奶 / 鸡蛋 / 西红柿 3 条')}
    ${m1NewsCard()}
   </div>`;
}
function bindM1(){
  const ms=$('#m1Search');if(ms)ms.onclick=()=>openNeoSearch();
  const me=$('#m1Me');if(me)me.onclick=()=>openProfile();
  const sc=$('#m1Scan');if(sc)sc.onclick=()=>openScan();
  const dm=$('#m1DevAll');if(dm)dm.onclick=()=>openNeoDevices();
  $$('#launcher [data-m1scn]').forEach(b=>b.onclick=()=>{
    b.style.transform='scale(.94)';setTimeout(()=>b.style.transform='',220);
    toast(`执行「${b.dataset.m1scn}」场景成功`);});
  const st=$('#m1ScnSet');if(st)st.onclick=()=>{
    const on=m1ScenesOn();
    const m=openModal(`<div class="ac-sheet-t">负一屏场景设置</div>
     <p style="font-size:12px;color:var(--ink2);padding:0 4px 8px;line-height:1.7">选择负一屏展示的场景（最多 4 个），关闭后不再占用负一屏篇幅。</p>
     ${M1_SCENES_ALL.map(n=>{const s=SCENES.find(x=>x.n===n);return `<div class="ac-opt scn-opt" data-scnset="${n}">
       <img src="${s.img}" style="width:34px;height:34px;border-radius:10px;object-fit:cover;margin-right:4px">
       <span><b>${n}</b><p>${M1_SCENE_D[n]}</p></span>
       <span class="switch ${on.includes(n)?'on':''}" style="margin-left:auto;flex:0 0 auto"></span></div>`}).join('')}`);
    m.querySelectorAll('[data-scnset]').forEach(r=>r.onclick=()=>{
      const n=r.dataset.scnset;let cur=m1ScenesOn();
      if(cur.includes(n)){cur=cur.filter(x=>x!==n);}
      else{if(cur.length>=4)return toast('最多展示 4 个场景');cur=[...cur,n];}
      if(!cur.length)return toast('至少保留 1 个场景');
      localStorage.setItem('m1-scenes',JSON.stringify(cur));
      r.querySelector('.switch').classList.toggle('on',cur.includes(n));
      refreshM1();});};
  $$('#launcher [data-m1sw]').forEach(s=>s.onclick=e=>{e.stopPropagation();
    const d=DEVICES.find(x=>x.id===s.dataset.m1sw);if(!d)return;d.on=!d.on;
    if(d.type==='gas'&&!d.on)toast('厨房燃气灶已关火，燃气阀门已关闭');
    renderNeo();});
  $$('#launcher [data-m1dev]').forEach(r=>r.onclick=()=>{const d=DEVICES.find(x=>x.id===r.dataset.m1dev);if(d)openDeviceCtl(d);});
  $$('#launcher [data-m1svc]').forEach(b=>b.onclick=()=>m1SvcGo(b.dataset.m1svc));
  /* 格力服务 banner 轮播 */
  const bnTr=$('#m1BnTrack');
  if(bnTr){let bi=0;const BN=M1_BN.length;
    clearInterval(window._m1BnT);
    window._m1BnT=setInterval(()=>{if(!document.body.contains(bnTr)){clearInterval(window._m1BnT);return}
      bi++;
      bnTr.style.transition='transform .5s cubic-bezier(.4,0,.2,1)';
      bnTr.style.transform=`translateX(${-bi*100}%)`;
      const dots=$$('#m1BnDots i');dots.forEach((d2,di)=>d2.classList.toggle('on',di===bi%BN));
      if(bi===BN)setTimeout(()=>{bnTr.style.transition='none';bnTr.style.transform='translateX(0)';bi=0},530);},3600);
    $$('#launcher [data-bn]').forEach(b=>b.onclick=()=>{
      const it=M1_BN[+b.dataset.bn];if(!it)return;
      if(it.url>=0)openWebView(MALL[it.url].url,it.t);
      else toast('董明珠店直播间（演示）：今晚 19:30 开播，已为你预约提醒');});}
}
function refreshM1(){const b=$('#m1Body');if(b){b.innerHTML=m1BodyHTML();bindM1();}}
function m1SvcGo(k){
  if(k==='weather')neoAppOpen('weather');
  else if(k==='cal')neoAppOpen('cal');
  else if(k==='memo')neoAppOpen('notes');
  else if(k==='news')neoAppOpen('browser');
  else if(k==='exp'){
    const m=openModal(`<h3 style="font-size:15px;font-weight:700">中通快递 · ZT7351881206</h3>
     <p style="font-size:11.5px;color:var(--ink2);margin-top:8px;line-height:1.8">格力净水器 RO 反渗透滤芯<br>已到达：菜鸟驿站（小区东门店）<br>取件码 <b style="font-size:15px;color:var(--ink)">8-2-6305</b><br>今天 14:02 入库 · 请及时取件</p>
     <button class="cook-btn" data-close style="margin-top:14px">好的</button>`,{center:true});}
  else if(k==='trip'){
    const m=openModal(`<h3 style="font-size:15px;font-weight:700">G6158 · 珠海 → 广州南</h3>
     <p style="font-size:11.5px;color:var(--ink2);margin-top:8px;line-height:1.8">周六 10:35 开 · 11:42 到<br>二等座 06 车 12A · 张明<br>已加入日历，出发前 1 小时提醒你<br>珠海站当前客流平稳，建议 9:50 出门</p>
     <button class="cook-btn" data-close style="margin-top:14px">查看行程详情</button>`,{center:true});}
  else if(k==='clean'){
    const m=openModal(`<h3 style="font-size:15px;font-weight:700">空调深度清洗预约</h3>
     <p style="font-size:11.5px;color:var(--ink2);margin-top:8px;line-height:1.8">客厅空调 · 累计运行 326 小时<br>深度清洗套餐 ¥129（会员价 ¥99）<br>最快明天 10:00-12:00 上门 · 格力认证工程师</p>
     <button class="cook-btn" id="m1CleanGo" style="margin-top:14px">预约明天上午上门</button>`,{center:true});
    m.querySelector('#m1CleanGo').onclick=()=>{closeModal(m);toast('已预约：明天 10:00 空调深度清洗上门服务');};}
  else if(k==='trade'){openWebView(MALL[3].url,'董明珠店');toast('已为你跳转以旧换新专区');}
  else if(k==='wxrec'){openWebView(MALL[3].url,'董明珠店');toast('今日 31° 晴热，已为你匹配空调焕新推荐');}
  else if(k==='report')openEnergyPage();
}
let neoPg=1,ndMallIdx=0,ndMallTimer=null,ndTdotTimer=null;
function neoSetPg(i,anim=true){neoPg=i;const p=$('#neoPages');if(!p)return;
  const N=p.children.length;
  p.classList.toggle('drag',!anim);p.style.transform=`translateX(${-i*100/N}%)`;
  $$('.neo-dots i').forEach((d,j)=>d.classList.toggle('on',j===i));
  const dk=$('#neoDock');if(dk)dk.classList.toggle('hide',i===0);
  const nd=$('.neo-dots');if(nd)nd.classList.toggle('hide',i===0);
  const vl=$('#neoVeil');if(vl)vl.classList.toggle('on',i===0);
  if(!stackOpen.length)setSysTheme(i===1);}
function renderNeo(){
  const l=$('#launcher');const a=airOf(S.airRoom);
  /* 今晚家的安排：与格力家 APP 时刻页 NEO_PLAN 同源 */
  const _npNow=new Date().getHours()*60+new Date().getMinutes();
  const _npT=NEO_PLAN.map((p,i)=>({...p,i})).filter(p=>p.time&&!neoPlanOff.has(p.i));
  const _npUp=_npT.filter(p=>t2min(p.time)>=_npNow);
  const plan2=(_npUp.length?_npUp:_npT).slice(0,2);
  const per=20,appPages=[];
  for(let i=0;i<NEO_APPS.length;i+=per)appPages.push(NEO_APPS.slice(i,i+per));
  const N=2+appPages.length,W=(100/N).toFixed(4);
  l.innerHTML=`<div class="neo-root neo-desk-root">
   <div class="neo-pager"><div class="neo-veil" id="neoVeil"></div><div class="neo-pages" id="neoPages" style="width:${N*100}%">
    <div class="neo-page m1" style="width:${W}%">
      <div class="m1-top">
        <button class="m1-search" id="m1Search">${NEO_IC.search}<span>搜索设备、服务、应用…</span></button>
        <button class="m1-scbtn" id="m1Scan">${NEO_IC.scan}</button>
        <button class="m1-ava" id="m1Me"><img src="img/a_dad.png" alt="个人中心"></button>
      </div>
      <div class="m1-scroll">
      <div id="m1Body">${m1BodyHTML()}</div>
      </div>
    </div>
    <div class="neo-page neo-desk2" style="width:${W}%">
      <div class="nd-hero"><div class="nd-hero-in">
        <div class="nd-time" id="ndTime">--:--</div>
        <div class="nd-hero-meta"><span id="ndDate"></span><span class="wx">${NEO_IC.cloud} 多云 31° · 湿度 82%</span></div>
      </div></div>
      <button class="nd-env" id="ndHome">
        <div class="nd-env-h"><span class="nd-glyph g-green">${ND_G.leaf}</span>我的家概况<span class="go">${DEVICES.length} 台设备 · ${neoRun()} 台运行 ${svgArrow}</span></div>
        <div class="nd-env-row">
          <div class="nd-env-c"><span class="nd-glyph g-green">${ND_G.air}</span><span class="nd-env-l">空气</span><b class="nd-env-v c-green">优</b></div>
          <div class="nd-env-c"><span class="nd-glyph g-orange">${ND_G.temp}</span><span class="nd-env-l">温度</span><b class="nd-env-v c-orange">${a.t}°</b></div>
          <div class="nd-env-c"><span class="nd-glyph g-blue">${ND_G.drop}</span><span class="nd-env-l">湿度</span><b class="nd-env-v c-blue">${a.h}%</b></div>
          <div class="nd-env-c"><span class="nd-glyph g-orange">${ND_G.zap}</span><span class="nd-env-l">用电</span><b class="nd-env-v c-orange">18.6<small class="nd-env-u">度</small></b></div>
          <div class="nd-env-c"><span class="nd-glyph g-green">${ND_G.shield}</span><span class="nd-env-l">安全</span><b class="nd-env-v c-green">正常</b></div>
        </div>
      </button>
      <div class="nd-sec-t"><span>设备及服务</span><em>${DEVICES.filter(d=>d.on).length} 台运行中</em><div class="nd-sec-btns"><button class="nd-sec-btn" id="ndDevAll">全部空间 ${svgArrow}</button><button class="nd-sec-btn" id="ndAllDev">全部设备 ${svgArrow}</button></div></div>
      <div class="nd-devs">
        <button class="nd-dev" id="ndAcHub">
          <div class="nd-dev-t"><b><svg class="nd-agg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"><rect x="3" y="8" width="12" height="12" rx="3"/><path d="M8 8V6.5A2.5 2.5 0 0 1 10.5 4h8A2.5 2.5 0 0 1 21 6.5v8a2.5 2.5 0 0 1-2.5 2.5H17"/></svg>空调</b><span class="nd-dev-room">全屋</span></div>
          <div class="nd-dev-st"><b>${DEVICES.filter(d=>d.type==='ac'&&d.on).length} 台制冷中</b><span>共 ${DEVICES.filter(d=>d.type==='ac').length} 台 · 客厅 ${DEVICES.find(d=>d.id==='ac1').t}°</span></div>
          <div class="nd-ac-fan">${DEVICES.filter(d=>d.type==='ac'&&d.id!=='ac1').map(d=>`<img src="img/moon-ac.png" alt="${d.room}">`).join('')}<img class="f0" src="img/lw_ac.png" alt="客厅"></div>
        </button>
        <button class="nd-dev" data-dev="fr1">
          <div class="nd-dev-t"><b>冰箱</b><span class="nd-dev-room">厨房</span></div>
          <div class="nd-dev-st"><b>5° / -18°</b><span>冷藏 · 冷冻 · 智能模式</span></div>
          <img class="nd-dev-img" src="img/lw_fridge.png">
        </button>
        <button class="nd-dev" data-dev="wm1">
          <div class="nd-dev-t"><b>洗衣机</b><span class="nd-dev-room">阳台</span></div>
          <div class="nd-dev-st"><b id="ndvWashT">${fmt(S.washer.left)}</b><span id="ndvWashS">${S.washer.mode} · 剩余</span></div>
          <span class="nd-dev-bar"><i id="ndvWashBar" style="width:${S.washer.left/(28*60)*100}%"></i></span>
          <img class="nd-dev-img wm2p" src="img/washer_new.png">
        </button>
        <button class="nd-dev rice" data-dev="rc1">
          <div class="nd-dev-t"><b>电饭煲</b><span class="nd-dev-room">厨房</span></div>
          <div class="nd-dev-st"><b id="ndvRiceT">${fmt(S.rice.left)}</b><span id="ndvRiceS">${S.rice.dish} · 剩余</span></div>
          <span class="nd-dev-bar"><i id="ndvRiceBar" style="width:${S.rice.left/(35*60)*100}%"></i></span>
          <img class="nd-dev-img sq" src="img/lw_rice.png">
        </button>
      </div>
      <div class="nd-duo">
        <button class="nd-duo-c nd-mall" id="ndTodo">
          <div class="nd-duo-t">商城服务<span class="go">${svgArrow}</span></div>
          <div class="nd-mall-win"><div class="nd-mall-track" id="ndMallTrack">${ND_MALL.map((m,i)=>`<div class="nd-mall-i" data-nmall="${m.idx}"><img src="${m.img}"><div class="nd-mall-t"><b>${m.t}</b><span>${m.p}</span></div></div>`).join('')}<div class="nd-mall-i" data-nmall="${ND_MALL[0].idx}"><img src="${ND_MALL[0].img}"><div class="nd-mall-t"><b>${ND_MALL[0].t}</b><span>${ND_MALL[0].p}</span></div></div></div></div>
          <div class="nd-mall-dots" id="ndMallDots">${ND_MALL.map((_,i)=>`<i class="${i===0?'on':''}"></i>`).join('')}</div>
        </button>
        <button class="nd-duo-c" id="ndTonight">
          <div class="nd-duo-t">今晚 · 家的安排<span class="go">${svgArrow}</span></div>
          <div class="nd-duo-b"><b>${plan2[0]?plan2[0].time+' '+plan2[0].s:'暂无安排'}</b><span>${plan2[1]?plan2[1].time+' '+plan2[1].s+' · ':''}AI 主动规划</span></div>
        </button>
      </div>
    </div>
    ${appPages.map(pg=>`<div class="neo-page nap" style="width:${W}%"><div class="nd-grid">${pg.map(x=>ndAppHTML(x)).join('')}</div></div>`).join('')}
   </div></div>
   <div class="neo-dots">${'<i></i>'.repeat(N)}</div>
   <div class="nd-dock" id="neoDock">${NEO_DOCK.map(id=>ndAppHTML(NEO_APPS.find(x=>x.id===id),1)).join('')}</div>
  </div>`;
  bindNeoDesk();
  neoSetPg(neoPg,false);
}
function bindNeoDesk(){
  $$('#launcher [data-napp]').forEach(b=>b.onclick=()=>neoAppOpen(b.dataset.napp));
  bindM1();
  $('#ndHome').onclick=()=>{neoView='now';neoAppOpen('gree');};
  $('#ndTonight').onclick=()=>{neoView='flow';neoAppOpen('gree');};
  const ndMall=()=>openWebView(MALL[ND_MALL[ndMallIdx].idx].url,'董明珠店');
  $('#ndTodo').onclick=()=>{ndMall();toast('已为你跳转「'+ND_MALL[ndMallIdx].t+'」');};
  /* 商城服务卡：滚动轮换 */
  const mt=$('#ndMallTrack'),md=$$('#ndMallDots i');
  if(mt){const goM=i=>{ndMallIdx=(i+ND_MALL.length)%ND_MALL.length;
      mt.style.transform=`translateX(${-ndMallIdx*100}%)`;
      md.forEach((x,j)=>x.classList.toggle('on',j===ndMallIdx));};
    goM(ndMallIdx);
    clearInterval(ndMallTimer);
    ndMallTimer=setInterval(()=>{if(!document.body.contains(mt)){clearInterval(ndMallTimer);return}goM(ndMallIdx+1);},4200);
    let msx=null;
    mt.addEventListener('touchstart',e=>{msx=e.touches[0].clientX},{passive:true});
    mt.addEventListener('touchend',e=>{if(msx===null)return;const dx=e.changedTouches[0].clientX-msx;msx=null;
      if(Math.abs(dx)>40)goM(ndMallIdx+(dx<0?1:-1));});}
  /* 家概况待办滚动已移除 */
  $$('#launcher [data-dev]').forEach(b=>b.onclick=()=>{
    const d=DEVICES.find(x=>x.id===b.dataset.dev);if(d)openDeviceCtl(d);});
  const acHub=$('#ndAcHub');if(acHub)acHub.onclick=()=>openAcHub();
  $('#ndDevAll').onclick=()=>{neoView='space';neoAppOpen('gree');};
  $('#ndAllDev').onclick=()=>openNeoDevices();
  $$('#launcher [data-dscene]').forEach(b=>b.onclick=()=>{
    b.style.transform='scale(.92)';setTimeout(()=>b.style.transform='',200);
    toast(`执行「${b.dataset.dscene}」场景成功`);});
  /* 分页手势：横向翻页（跟随手指）· 下滑搜索 · 上滑直达应用库 */
  const pg=$('#neoPages');let s=null,mode=0,supClick=false;
  pg.addEventListener('click',e=>{if(supClick){e.stopPropagation();e.preventDefault();supClick=false;}},true);
  pg.addEventListener('pointerdown',e=>{s={x:e.clientX,y:e.clientY,pg:neoPg};mode=0;});
  pg.addEventListener('pointermove',e=>{if(!s)return;const dx=e.clientX-s.x,dy=e.clientY-s.y;
    if(!mode){if(Math.abs(dx)>12&&Math.abs(dx)>Math.abs(dy)*1.3)mode=1;else if(Math.abs(dy)>12)mode=2;}
    if(mode===1){const N=pg.children.length,W=100/N;pg.classList.add('drag');
      pg.style.transform=`translateX(${-s.pg*W+dx/pg.parentNode.offsetWidth*W}%)`;}});
  pg.addEventListener('pointerup',e=>{if(!s)return;const dx=e.clientX-s.x,dy=e.clientY-s.y,m=mode;
    s=null;mode=0;if(m){supClick=true;setTimeout(()=>supClick=false,80);}
    const N=pg.children.length;
    if(m===1){const th=pg.parentNode.offsetWidth*.16;
      if(dx<-th&&neoPg<N-1)neoSetPg(neoPg+1);else if(dx>th&&neoPg>0)neoSetPg(neoPg-1);else neoSetPg(neoPg);}
    else if(m===2&&!stackOpen.length){
      if(dy>56&&neoPg===1)openNeoSearch();
      else if(dy<-56&&neoPg===1)neoSetPg(2);
      else if(dy>56&&neoPg>=2)neoSetPg(1);}});
  /* 长按卡片：进入更换桌面小组件（演示） */
  $$('.neo-desk2 .nd-env,.neo-desk2 .nd-dev,.neo-desk2 .nd-duo-c').forEach(c=>{
    c.addEventListener('contextmenu',e=>e.preventDefault());
    c.addEventListener('pointerdown',e=>{
      const sx=e.clientX,sy=e.clientY;
      const lpT=setTimeout(()=>{
        supClick=true;setTimeout(()=>supClick=false,200);
        openWidgetGal(cardWgTarget(c));
      },480);
      const cancel=()=>clearTimeout(lpT);
      const mv=ev=>{if(Math.hypot(ev.clientX-sx,ev.clientY-sy)>10)cancel();};
      const up=()=>{cancel();window.removeEventListener('pointermove',mv);window.removeEventListener('pointerup',up);window.removeEventListener('pointercancel',up);};
      window.addEventListener('pointermove',mv);
      window.addEventListener('pointerup',up);
      window.addEventListener('pointercancel',up);
    });
  });
  /* 首屏壁纸蒙版高度：底部边缘到环境卡片中间 */
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    const desk=$('.neo-desk2'),env=$('#ndHome');
    if(desk&&env)desk.style.setProperty('--dmh',(env.offsetTop+Math.round(env.offsetHeight/2))+'px');
  }));
  tickClock();
}
/* ---------- 更换桌面小组件（华为风 · 演示示意） ---------- */
function cardWgTarget(c){
  if(c.classList.contains('nd-env'))return {n:'环境卡片'};
  if(c.id==='ndTodo')return {n:'商城服务'};
  if(c.id==='ndTonight')return {n:'今晚 · 家的安排'};
  if(c.dataset&&c.dataset.dev){const d=DEVICES.find(x=>x.id===c.dataset.dev);return {n:d?d.room+TYPE_META[d.type].n:'电器卡片'};}
  return {n:'电器卡片'};
}
function openWidgetGal(t){
  const desk=$('.neo-desk2');if(desk)desk.classList.add('editing');
  const ISV=(p,sz,c)=>`<svg width="${sz||16}" height="${sz||16}" viewBox="0 0 24 24" fill="none" stroke="${c||'currentColor'}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const ENV=[['全屋','优','26°','55%'],['客厅','优','27.2°','66%'],['主卧','优','26°','52%'],['儿童房','优','27°','65%']];
  const SVC=[
   ['待处理','3','项待处理','#e54545',ISV('<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2.5h-15z"/><path d="M10 21a2 2 0 0 0 4 0"/>',16,'#e54545')],
   ['规划任务','2','项今晚执行','#7c4dff',ISV('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',16,'#7c4dff')],
   ['消息中心','5','条未读消息','#1a73e8',ISV('<path d="M21 11.5a7.5 7.5 0 0 1-7.5 7.5H4l2-3.4A7.5 7.5 0 1 1 21 11.5z"/>',16,'#1a73e8')]];
  const PHONE=[
   ['日历',`<div class="wm-cal"><i>八月</i><b>7</b><span>周四 · 立秋</span></div>`],
   ['备忘录',`<div class="wm-lines"><i style="width:60%"></i><i style="width:92%"></i><i style="width:85%"></i><i style="width:70%"></i><i style="width:88%"></i><i style="width:52%"></i></div>`],
   ['天气',`<div class="wm-center">${ISV('<path d="M17.5 17H7a4 4 0 1 1 .6-7.95A5.5 5.5 0 0 1 18.3 8.6a4.6 4.6 0 0 1-.8 8.4z"/>',22,'#5b8def')}<b>31°</b><span>多云 · 珠海</span></div>`],
   ['时钟',`<div class="wm-center">${ISV('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',26,'#1f1c16')}<span style="margin-top:5px">珠海 ·  GMT+8</span></div>`]];
  const MALLWG=[
   ['新品推荐',`<div class="wm-mall"><img src="${MALL[0].img}"><div><b>格力除湿机</b><span>新品首发 · 限时直降</span></div></div>`],
   ['优惠券',`<div class="wm-svc"><span class="wm-ic" style="background:#e5454516">${ISV('<path d="M4 9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1.5a2 2 0 0 0 0 3V15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1.5a2 2 0 0 0 0-3z"/><path d="M13.5 7v10" stroke-dasharray="2.4 2.4"/>',16,'#e54545')}</span><b style="color:#e54545">3</b><span>张优惠券可领</span></div>`],
   ['直播跟踪',`<div class="wm-svc"><span class="wm-ic" style="background:#7c4dff16">${ISV('<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M10.2 9.6v4.8l4.2-2.4z" fill="#7c4dff" stroke="none"/>',16,'#7c4dff')}</span><b style="color:#7c4dff">LIVE</b><span>董明珠店 · 19:30 开播</span></div>`],
   ['物流信息',`<div class="wm-svc"><span class="wm-ic" style="background:#1a73e816">${ISV('<path d="M2.5 7h11v9h-11zM13.5 10h4l3 3v3h-7z"/><circle cx="6.5" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>',16,'#1a73e8')}</span><b style="color:#1a73e8">运输中</b><span>反渗透滤芯 · 明天送达</span></div>`]];
  const pv=(inner,name)=>`<button class="wg-pv" data-wg="${name}"><div class="wg-mock">${inner}</div><span>${name}</span></button>`;
  const envRow=ENV.map(e=>pv(`<div class="wm-t">${e[0]}<i>有人</i></div><div class="wm-m">
    <div><b style="color:#7aa55c">${e[1]}</b><span>空气</span></div><div><b>${e[2]}</b><span>温度</span></div><div><b style="color:#5b8def">${e[3]}</b><span>湿度</span></div></div>`,e[0]+'环境卡')).join('');
  const devRow=Object.keys(TYPE_META).map(tp=>{const mt=TYPE_META[tp];const d0=DEVICES.find(x=>x.type===tp);
    return pv(`<div class="wm-dev"><span class="wm-ic" style="background:${mt.c}16;color:${mt.c}">${devIcon(tp,mt.c)}</span><b>${mt.n}</b><span class="wm-st">${d0?d0.room+' · ':''}${d0&&d0.on?'运行中':'待机'}</span></div>`,mt.n+'卡片');}).join('');
  const svcRow=SVC.map(s=>pv(`<div class="wm-svc"><span class="wm-ic" style="background:${s[3]}16">${s[4]}</span><b style="color:${s[3]}">${s[1]}</b><span>${s[2]}</span></div>`,s[0])).join('');
  const phnRow=PHONE.map(p=>pv(p[1],p[0])).join('');
  const mallRow=MALLWG.map(p=>pv(p[1],p[0])).join('');
  const m=openModal(`<div class="wg-head"><div style="flex:1;min-width:0"><b>更换桌面小组件</b><p>将长按的「${t.n}」替换为以下组件（演示示意，不会真实更换）</p></div><button class="wg-done" data-close>完成</button></div>
   <div class="wg-scroll">
    <div class="wg-g"><h4>环境卡片<em>${ENV.length} 款</em></h4><div class="wg-row">${envRow}</div></div>
    <div class="wg-g"><h4>电器卡片<em>${Object.keys(TYPE_META).length} 款 · 每类电器均可选</em></h4><div class="wg-row">${devRow}</div></div>
    <div class="wg-g"><h4>智能家居服务卡片<em>${SVC.length} 款</em></h4><div class="wg-row">${svcRow}</div></div>
    <div class="wg-g"><h4>商城服务卡片<em>${MALLWG.length} 款</em></h4><div class="wg-row">${mallRow}</div></div>
    <div class="wg-g"><h4>手机组件<em>${PHONE.length} 款</em></h4><div class="wg-row">${phnRow}</div></div>
   </div>`);
  m.querySelector('.sheet').classList.add('wg-sheet');
  m.style.pointerEvents='none';setTimeout(()=>m.style.pointerEvents='',380);
  const exit=()=>{if(desk)desk.classList.remove('editing');closeModal(m);};
  m.querySelector('.wg-done').onclick=exit;
  m.addEventListener('click',e=>{if(e.target===m)exit();});
  m.querySelectorAll('[data-wg]').forEach(b=>b.onclick=()=>{
    m.querySelectorAll('.wg-pv').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');
    setTimeout(()=>{exit();toast(`已将「${t.n}」更换为「${b.dataset.wg}」（演示示意）`);},280);});
}
/* ---------- 格力家 · 超级应用 ---------- */
function openNeoHome(){
  const _el=openPage(`<div class="neo-root">
    <div class="neo-statmask"></div>
    <div class="neo-views">
      <div class="neo-view${neoView==='now'?' on':''}" id="nv-now">${neoNowHTML()}</div>
      <div class="neo-view${neoView==='flow'?' on':''}" id="nv-flow">${neoFlowHTML()}</div>
      <div class="neo-view${neoView==='space'?' on':''}" id="nv-space">${neoSpaceHTML()}</div>
      <div class="neo-view${neoView==='svc'?' on':''}" id="nv-svc">${neoSvcHTML()}</div>
    </div>
    <nav class="neo-nav">
      <button class="${neoView==='now'?'on':''}" data-nv="now">${NEO_IC.now}<span>首页</span></button>
      <button class="${neoView==='flow'?'on':''}" data-nv="flow">${NEO_IC.flow}<span>时刻</span></button>
      <button class="neo-fab" id="neoNavClaw">${NEO_IC.mic}</button>
      <button class="${neoView==='space'?'on':''}" data-nv="space">${NEO_IC.space}<span>空间</span></button>
      <button class="${neoView==='svc'?'on':''}" data-nv="svc">${NEO_IC.shop}<span>服务</span></button>
    </nav>
  </div>`,el=>bindNeoHome(el),false);
  _el.classList.add('zoom');
  const rec=stackOpen[stackOpen.length-1];if(rec)rec.neoHome=true;
  tickClock();
}
function neoGo(v){neoView=v;
  $$('.neo-view').forEach(x=>x.classList.toggle('on',x.id==='nv-'+v));
  $$('.neo-nav [data-nv]').forEach(b=>b.classList.toggle('on',b.dataset.nv===v));
  if(v==='flow'){setTimeout(neoMomBoxFit,60);setTimeout(neoMomBoxFit,400);}
  setSysTheme(false);}
function bindNeoHome(el){
  const q=s=>el.querySelector(s),qa=s=>[...el.querySelectorAll(s)];
  q('#neoHome').onclick=()=>openHomeSwitch();
  q('#neoScan').onclick=()=>openScan();
  q('#neoBell').onclick=()=>openMessages();
  q('#neoAdd').onclick=()=>toast('添加设备入口建设中，敬请期待');
  /* 家安好三卡 */
  q('#neoAir').onclick=()=>openAirPage();
  q('#neoEng').onclick=()=>openEnergyPage();
  q('#neoSafe').onclick=()=>openKitchenSafety();
  /* 进行中 */
  q('#neoLiveWash').onclick=()=>openDeviceCtl(DEVICES.find(d=>d.id==='wm1'));
  q('#neoLiveOven').onclick=()=>openDeviceCtl(DEVICES.find(d=>d.id==='ov1'));
  q('#neoLiveRice').onclick=()=>openDeviceCtl(DEVICES.find(d=>d.id==='rc1'));
  q('#neoLiveAI').onclick=()=>openAIServices();
  q('#neoDevAll').onclick=()=>openNeoDevices();
  qa('[data-nsvc]').forEach(b=>b.onclick=()=>openAISvcDetail(b.dataset.nsvc));
  const am=q('#neoAiMore');if(am)am.onclick=()=>openAIServices();
  /* 待处理 */
  qa('[data-ntodo]').forEach(b=>b.onclick=()=>goTodo(V2_TODOS[+b.dataset.ntodo]));
  /* 服务 */
  bindNeoMall(q('#nv-now'));
  bindNeoMall(q('#nv-svc'));
  qa('[data-ntool]').forEach(b=>b.onclick=()=>{
    const k=b.dataset.ntool;
    if(k==='trade'){openWebView('https://fmall.gree.com/','董明珠店');toast('已为你跳转以旧换新专区');}
    else if(k==='cs')toast('已为你接入格力在线客服，请稍候…');
    else if(k==='cpn')toast('已领取新人券包 ¥500，结算时自动抵扣');
    else if(k==='addr')toast('演示环境：收货地址管理');
    else if(k==='sites')toast('演示环境：附近服务网点 3 家，最近 1.2km');
    else if(k==='biz')openWebView('https://fmall.gree.com/distributionh5/#/user','董明珠店');
    else toast('演示环境：'+b.textContent.trim());});
  qa('[data-nasvc]').forEach(b=>b.onclick=()=>toast(`已为你提交「${b.dataset.nasvc}」预约，售后客服将电话联系确认`));
  /* 时刻 */
  qa('#neoMomTabs [data-mtab]').forEach(b=>b.onclick=()=>{
    momTab=b.dataset.mtab;
    qa('#neoMomTabs [data-mtab]').forEach(x=>x.classList.toggle('on',x===b));
    const ml=q('#neoMomList');if(ml){ml.innerHTML=neoMomListHTML();
      ml.querySelectorAll('[data-flowsvc]').forEach(c=>c.onclick=()=>{const s=c.dataset.flowsvc;if(s)openAISvcDetail(s);else openEventLog()});}
    neoMomBoxFit();setTimeout(neoMomBoxFit,350);});
  qa('[data-flowsvc]').forEach(c=>c.onclick=()=>{const s=c.dataset.flowsvc;if(s)openAISvcDetail(s);else openEventLog()});
  const npi=q('#neoPlanInfo');if(npi)npi.onclick=()=>{
    openModal(`<div class="ac-sheet-t">AI 主动规划 · 如何推荐</div>
     <p style="font-size:12.5px;color:var(--ink2);line-height:1.8;padding:0 4px 10px">「家的安排」由 AI 根据你的历史行为数据主动规划，每天自动生成，无需手动设置：</p>
     <div class="np-step"><i>1</i><div><b>学习历史习惯</b><p>基于近 30 天的行为数据，学习你的作息规律——几点洗澡、几点入睡、哪天洗工作服、洗碗机使用频率等。</p></div></div>
     <div class="np-step"><i>2</i><div><b>结合实时状态</b><p>参考房间当前温湿度、设备运行状态、耗材余量等实时数据，判断是否需要提前介入。</p></div></div>
     <div class="np-step"><i>3</i><div><b>计算准备时长</b><p>按任务所需耗时倒排执行时间——洗澡前 5 分钟备热水、入睡前 10 分钟开空调、洗衣 45 分钟提前提醒放衣。</p></div></div>
     <div class="np-step"><i>4</i><div><b>越用越准</b><p>你的每一次手动调整都会被记录学习；规律变化（如换季、作息调整）后，推荐会自动跟随更新。行为数据仅在家庭本地处理，不上传云端。</p></div></div>
     <div class="ac-opt" data-close style="margin-top:14px"><span style="margin:auto;color:#0284c7">我知道了</span></div>`);};
  /* 家的安排：马上执行 / 不需要 / 延时 */
  const bindPlan=()=>{qa('[data-npa]').forEach(b=>b.onclick=()=>{
    const p=NEO_PLAN[+b.dataset.npi];if(!p)return;
    if(b.dataset.npa==='do')toast(`已立即执行「${p.s||p.t}」（演示）`);
    else if(b.dataset.npa==='no'){neoPlanOff.add(+b.dataset.npi);
      const l=q('#neoPlanList');if(l){l.innerHTML=neoPlanHTML();bindPlan();}
      toast('已取消该安排');}
    else openNeoPlanDelay(p);});};
  bindPlan();
  /* 事件盒高度吸附：多次补测，避开字体/框架缩放稳定前的高度抖动 */
  setTimeout(neoMomBoxFit,90);setTimeout(neoMomBoxFit,450);setTimeout(neoMomBoxFit,1200);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>setTimeout(neoMomBoxFit,30));
  /* 空间 & 导航 */
  qa('[data-nroom]').forEach(b=>b.onclick=()=>openNeoRoom(b.dataset.nroom));
  qa('.neo-nav [data-nv]').forEach(b=>b.onclick=()=>neoGo(b.dataset.nv));
  q('#neoNavClaw').onclick=()=>openClaw(null,true);
  tickClock();
}
/* ---------- 任务栈 / 应用打开 ---------- */
let NEO_TASKS=[];
function neoAppOpen(id){const a=typeof id==='string'?NEO_APPS.find(x=>x.id===id):id;if(!a)return;
  NEO_TASKS=NEO_TASKS.filter(t=>t.id!==a.id);NEO_TASKS.unshift({id:a.id,at:Date.now()});
  if(NEO_TASKS.length>9)NEO_TASKS.pop();a.open();}
const NEO_TSUM={phone:'最近通话 · 妈妈 昨天',msg:'3 条未读 · 格力+ 通知',browser:'董明珠店 · 收藏夹',camera:'照片模式 · 取景中',photos:'16 张照片 · 4 个相簿',cal:'今天 2 个日程',clock:'世界时钟 · 4 座城市',notes:'购物清单 · 3 条笔记',mail:'2 封未读邮件',map:'距家 3.2 km · 12 分钟',weather:'珠海 31° · 多云',calc:'计算器',settings:'栖 Home OS 1.0.2',store:'格力生态 · 精选推荐',mall:'1 个包裹运输中',claw:'语音助手 · 待命中'};
function neoTaskSummary(id){if(id==='gree')return `家安好 · ${neoRun()} 台设备运行中`;
  if(id==='clock')return new Date().toTimeString().slice(0,5)+' · 世界时钟';return NEO_TSUM[id]||''}
function neoGoHome(){closeNeoSearch();closeNeoCC();closeNeoSwitcher(true);neoSetPg(1);while(stackOpen.length)closePage();}
/* ---------- 多任务切换器 ---------- */
function openNeoSwitcher(){if(MODE!=='neo')return;closeNeoSearch();closeNeoCC();
  let sw=$('#neoSwitcher');
  if(!sw){sw=document.createElement('div');sw.className='neo-sw';sw.id='neoSwitcher';$('#screen').appendChild(sw);}
  const cards=NEO_TASKS.map(t=>NEO_APPS.find(a=>a.id===t.id)).filter(Boolean);
  sw.innerHTML=`<div class="nsw-head"><b>最近使用</b><span>${cards.length} 个应用</span></div>
   ${cards.length?`<div class="nsw-list">${cards.map(a=>`
    <div class="nsw-card" data-task="${a.id}">
      <div class="nsw-h"><span class="ic" style="background:${a.bg}">${neoAppIco(a)}</span><b>${a.n}</b><span class="nsw-x" data-kill="${a.id}">×</span></div>
      <div class="nsw-pv" style="background:${a.pv};${a.pvInk?`color:${a.pvInk}`:''}">${neoAppIco(a)}<span>${neoTaskSummary(a.id)}</span></div>
    </div>`).join('')}</div>
   <div class="nsw-hint">上划卡片关闭 · 点击卡片继续 · 点空白回到桌面</div>`
   :`<div class="nsw-empty">${NEO_IC.apps}<div>没有运行中的应用</div><span style="font-size:10.5px;opacity:.7">从桌面打开应用后会出现在这里</span></div>
   <div class="nsw-hint">点空白回到桌面</div>`}`;
  requestAnimationFrame(()=>requestAnimationFrame(()=>sw.classList.add('open')));
  sw.onclick=e=>{
    const kill=e.target.closest('[data-kill]');
    if(kill){killTask(kill.dataset.kill,kill.closest('.nsw-card'));return}
    const card=e.target.closest('[data-task]');
    if(card){if(card.dataset.moved){delete card.dataset.moved;return}
      closeNeoSwitcher();setTimeout(()=>neoAppOpen(card.dataset.task),140);}
    else neoGoHome();
  };
  sw.querySelectorAll('.nsw-card').forEach(c=>{let s=null;
    c.addEventListener('pointerdown',e=>{s={y:e.clientY}});
    c.addEventListener('pointermove',e=>{if(!s)return;const dy=e.clientY-s.y;
      if(dy<-8){c.style.transform=`translateY(${dy}px)`;c.dataset.moved='1'}});
    c.addEventListener('pointerup',e=>{if(!s)return;const dy=e.clientY-s.y;s=null;c.style.transform='';
      if(dy<-70)killTask(c.dataset.task,c);});
  });
}
function killTask(id,card){NEO_TASKS=NEO_TASKS.filter(t=>t.id!==id);
  if(card){card.classList.add('kill');setTimeout(()=>{const sw=$('#neoSwitcher');if(sw&&sw.classList.contains('open'))openNeoSwitcher();},270);}}
function closeNeoSwitcher(now){const sw=$('#neoSwitcher');if(!sw)return;
  if(now){sw.style.transition='none';sw.classList.remove('open');sw.style.opacity=0;
    setTimeout(()=>{sw.style.transition='';sw.style.opacity=''},60);}
  else sw.classList.remove('open');}
/* ---------- 控制中心 ---------- */
const CC_IC={
 wifi:NEO_IC.wifi.replace('width="16" height="16"','width="17" height="17"'),
 bt:NEO_IC.bt.replace('width="16" height="16"','width="17" height="17"'),
 data:NEO_IC.cell.replace('width="16" height="16"','width="17" height="17"'),
 loc:NEO_IC.pin.replace('width="16" height="16"','width="17" height="17"'),
 flash:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12z"/></svg>',
 dnd:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M20 13.5A8.5 8.5 0 1 1 10.5 4a7 7 0 0 0 9.5 9.5z"/></svg>',
 save:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M12 3a9 9 0 1 0 9 9"/><path d="M12 7v5l3.2 1.8"/><path d="M18 3.5 21 3l-.5 3"/></svg>',
 plane:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><path d="M10.5 13.5 4 11l1.5-1.5L12 11l4.5-4.5a2.1 2.1 0 0 1 3 3L15 14l1.5 6.5L15 22l-3.5-6.5z"/></svg>'};
const CC_TOGGLES=[
 {k:'wifi',n:'WLAN',on:true,ic:CC_IC.wifi},
 {k:'bt',n:'蓝牙',on:true,ic:CC_IC.bt},
 {k:'data',n:'移动数据',on:true,ic:CC_IC.data},
 {k:'flash',n:'手电筒',on:false,ic:CC_IC.flash},
 {k:'loc',n:'定位',on:true,ic:CC_IC.loc},
 {k:'dnd',n:'勿扰',on:false,ic:CC_IC.dnd},
 {k:'save',n:'省电',on:false,ic:CC_IC.save},
 {k:'plane',n:'飞行模式',on:false,ic:CC_IC.plane}];
function openNeoCC(){if(MODE!=='neo')return;closeNeoSearch();closeNeoSwitcher(true);toggleShade(false);
  renderNeoCC();$('#neoCC').classList.add('open');}
function closeNeoCC(){const c=$('#neoCC');if(c)c.classList.remove('open');}
function renderNeoCC(){
  const cc=$('#neoCC');if(!cc)return;
  const tm=new Date().toTimeString().slice(0,5);
  const devs=DEVICES.slice().sort((a,b)=>(b.on?1:0)-(a.on?1:0)).slice(0,6);
  cc.innerHTML=`<div class="ncc-panel">
   <div class="ncc-head"><b>控制中心</b><span>${tm} · 珠海 多云 31°</span></div>
   <div class="ncc-tg">${CC_TOGGLES.map((t,i)=>`<button class="${t.on?'on':''}" data-cctg="${i}"><span class="tg-ic">${t.ic}</span><span>${t.n}</span></button>`).join('')}</div>
   <div class="ncc-bri">${NEO_IC.sun}<input type="range" min="5" max="100" value="72" id="nccBri"><b id="nccBriV">72%</b></div>
   <div class="ncc-dev-h"><b>我的设备 · ${neoRun()} 台运行</b><button id="nccMore">显示更多 ›</button></div>
   <div class="ncc-grid">${devs.map(d=>`<div class="ncc-dev${d.on?' on':''}" data-ccdev="${d.id}">
     <span class="di">${devIcon(d.type,d.on?'#c25e2c':'#8f8a7c').replace('width="24" height="24"','width="19" height="19"')}</span>
     <div style="flex:1;min-width:0"><b>${d.name}</b><span>${d.room} · ${d.on?devBrief(d):'已关闭'}</span></div>
     <span class="m1-sw2${d.on?' on':''}" data-ccsw="${d.id}"></span></div>`).join('')}</div>
  </div>`;
  cc.onclick=e=>{if(e.target===cc)closeNeoCC();};
  cc.querySelectorAll('[data-cctg]').forEach(b=>b.onclick=()=>{
    const t=CC_TOGGLES[+b.dataset.cctg];t.on=!t.on;b.classList.toggle('on',t.on);
    toast(`${t.n}已${t.on?'开启':'关闭'}`);});
  const bri=cc.querySelector('#nccBri'),briV=cc.querySelector('#nccBriV');
  if(bri)bri.oninput=()=>{briV.textContent=bri.value+'%';};
  const more=cc.querySelector('#nccMore');
  if(more)more.onclick=()=>{closeNeoCC();setTimeout(()=>openNeoDevices(),150);};
  cc.querySelectorAll('[data-ccsw]').forEach(sw=>sw.onclick=e=>{e.stopPropagation();
    const d=DEVICES.find(x=>x.id===sw.dataset.ccsw);if(!d)return;d.on=!d.on;
    if(d.type==='gas'&&!d.on)toast('厨房燃气灶已关火，燃气阀门已关闭');
    renderNeoCC();renderNeo();});
  cc.querySelectorAll('[data-ccdev]').forEach(c=>c.onclick=()=>{
    const d=DEVICES.find(x=>x.id===c.dataset.ccdev);if(!d)return;
    closeNeoCC();setTimeout(()=>openDeviceCtl(d),150);});
}
/* ---------- 全局搜索 ---------- */
const NEO_SVC=[
 {n:'食材管理',d:'冰箱 · 临期食材提醒',f:()=>openFoodPage()},
 {n:'水质监测',d:'净水器 · 42 ppm 优',f:()=>openWaterPage()},
 {n:'睡眠报告',d:'昨夜睡眠质量分析',f:()=>openSleepPage()},
 {n:'私人衣橱',d:'衣物护理 · 空气洗',f:()=>openWardPage()},
 {n:'家庭能耗',d:'今日用电 · 光伏储能',f:()=>openEnergyPage()},
 {n:'厨房安全',d:'燃气 · 水浸 · 冰箱门',f:()=>openKitchenSafety()},
 {n:'AI 服务',d:'净化 · 节能 · 睡眠 自动看家',f:()=>openAIServices()},
 {n:'事件日志',d:'今天 8 件事家已自动完成',f:()=>openEventLog()},
];
function openNeoSearch(){if(MODE!=='neo')return;closeNeoSwitcher(true);closeNeoCC();
  let s=$('#neoSearch');
  if(!s){s=document.createElement('div');s.className='neo-search';s.id='neoSearch';$('#screen').appendChild(s);}
  s.innerHTML=`<div class="ns-box">${NEO_IC.search}<input id="nsInput" placeholder="搜索应用、设备、场景、服务…" autocomplete="off"><button class="ns-go" id="nsGo">搜索</button><button class="ns-scan" id="nsScan" aria-label="扫一扫">${NEO_IC.scan}</button></div>
   <div class="ns-body" id="nsBody"></div>`;
  requestAnimationFrame(()=>requestAnimationFrame(()=>s.classList.add('open')));
  const go=()=>{const f=s.querySelector('[data-sact]');if(f)f.click();};
  s.querySelector('#nsGo').onclick=go;
  s.querySelector('#nsScan').onclick=()=>{closeNeoSearch();setTimeout(()=>openScan(),120);};
  s.onclick=e=>{if(e.target===s||e.target.id==='nsBody')closeNeoSearch();};
  const inp=s.querySelector('#nsInput');
  inp.addEventListener('input',()=>neoSearchRender(inp.value));
  inp.addEventListener('keydown',e=>{if(e.key==='Enter')go();});
  neoSearchRender('');
  setTimeout(()=>inp.focus(),320);
}
function closeNeoSearch(){const s=$('#neoSearch');if(s)s.classList.remove('open');}
function neoSearchRender(q){
  const body=$('#nsBody');if(!body)return;q=(q||'').trim();
  const acts=[];let html='';
  const item=(ic,bg,t,d,run)=>{acts.push(run);return `<button class="ns-item" data-sact="${acts.length-1}">
    <span class="ic" style="background:${bg}">${ic}</span><div><b>${t}</b><span>${d}</span></div><span class="go">${svgArrow}</span></button>`};
  if(!q){
    const sugg=['phone','msg','browser','camera','gree','mall','photos','weather'];
    html=`<div class="ns-gp-t">建议</div><div class="ns-sugg">${sugg.map((id,i)=>{const a=NEO_APPS.find(x=>x.id===id);
      acts.push(()=>neoAppOpen(id));
      return `<div class="ns-sg" data-sact="${i}"><span class="ic" style="background:${a.bg}">${neoAppIco(a)}</span><span>${a.n}</span></div>`}).join('')}</div>
    <div class="ns-gp-t">常用服务</div>
    ${item(NEO_IC.spark,'#8a7ab8','AI 服务','净化 · 节能 · 睡眠 自动看家',()=>openAIServices())}
    ${item(NEO_IC.disp,'#4a9e78','家庭能耗','今日用电 18.6° · 光伏 12.4°',()=>openEnergyPage())}
    ${item(NEO_IC.shop,'#df7642','董明珠店','滤芯 3 天到期 · 一键购',()=>openWebView('https://fmall.gree.com/','董明珠店'))}`;
  }else{
    const qa=NEO_APPS.filter(a=>a.n.includes(q)||a.id.includes(q.toLowerCase()));
    const qd=DEVICES.filter(d=>d.name.includes(q)||d.room.includes(q)).slice(0,5);
    const qs=SCENES.filter(s=>s.n.includes(q));
    const qv=NEO_SVC.filter(v=>v.n.includes(q)||v.d.includes(q));
    if(qa.length)html+=`<div class="ns-gp-t">应用</div>`+qa.map(a=>item(neoAppIco(a),a.bg,a.n,a.cat+' · 应用',()=>neoAppOpen(a.id))).join('');
    if(qd.length)html+=`<div class="ns-gp-t">智能设备</div>`+qd.map(d=>{const m=TYPE_META[d.type]||{c:'#9aa0a6'};
      return item(devIcon(d.type),m.c,d.name,`${d.room} · ${devBrief(d)}`,()=>openNeoRoom(d.room))}).join('');
    if(qs.length)html+=`<div class="ns-gp-t">场景</div>`+qs.map(sc=>item(IC.gree(),'#4a9e78',sc.n,'一键执行场景',()=>toast(`执行「${sc.n}」场景成功`))).join('');
    if(qv.length)html+=`<div class="ns-gp-t">服务</div>`+qv.map(v=>item(NEO_IC.spark,'#8a7ab8',v.n,v.d,v.f)).join('');
    if(!html)html=`<div class="ns-empty">没有找到「${esc(q)}」相关内容</div>`;
  }
  body.innerHTML=html;
  body.querySelectorAll('[data-sact]').forEach(b=>b.onclick=()=>{const run=acts[+b.dataset.sact];
    closeNeoSearch();setTimeout(run,130);});
}
/* ---------- 模拟应用 · 通用页架 ---------- */
function npHead(title,extra){return `<div class="np-head"><button class="np-back" data-back>${NEO_IC.back}</button><h1>${title}</h1>${extra?`<span class="np-extra">${extra}</span>`:''}</div>`}
/* ---------- 电话 ---------- */
function neoAppPhone(){
  const calls=[{n:'妈妈',sub:'手机 · 昨天 20:14',miss:false},{n:'格力售后服务',sub:'400-836-5315 · 昨天 15:02',miss:false},
   {n:'爸爸',sub:'手机 · 周一 18:40 · 未接',miss:true},{n:'物业前台',sub:'0756-268-8888 · 周一 09:12',miss:false}];
  openPage(`<div class="npl-item">${npHead('电话','珠海')}
   <div class="np-body">
    <div class="ns-gp-t" style="margin-top:2px">最近通话</div>
    <div class="np-card">${calls.map(c=>`<div class="np-row" data-call="${c.n}">
      <span class="ic" style="background:${c.miss?'#e54545':'#34a853'}">${IC.phone().replace('width="26" height="26"','width="15" height="15"')}</span>
      <div><b style="${c.miss?'color:#e54545':''}">${c.n}</b><span>${c.sub}</span></div><span class="go">${svgArrow}</span></div>`).join('')}</div>
    <div class="ns-gp-t">拨号</div>
    <div class="nph-num" id="nphNum"></div>
    <div class="nph-pad">${[['1',''],['2','ABC'],['3','DEF'],['4','GHI'],['5','JKL'],['6','MNO'],['7','PQRS'],['8','TUV'],['9','WXYZ'],['*',''],['0','+'],['#','']].map(k=>`<div class="nph-key" data-key="${k[0]}"><b>${k[0]}</b><span>${k[1]||'&nbsp;'}</span></div>`).join('')}</div>
    <div class="nph-call"><button id="nphCall">${IC.phone()}</button></div>
   </div></div>`,el=>{
    let num='';const disp=el.querySelector('#nphNum');
    el.querySelectorAll('[data-key]').forEach(k=>k.onclick=()=>{if(num.length>=15)return;num+=k.dataset.key;disp.textContent=num;});
    el.querySelectorAll('[data-call]').forEach(r=>r.onclick=()=>toast(`正在回拨「${r.dataset.call}」…`));
    el.querySelector('#nphCall').onclick=()=>{toast(num?`正在呼叫 ${num} …`:'请输入号码');if(num){num='';setTimeout(()=>disp.textContent='',400);}};
    disp.textContent='';
  },false);
}
/* ---------- 浏览器 ---------- */
function neoAppBrowser(){
  const favs=[{n:'董明珠店',d:'fmall.gree.com',ic:NEO_IC.shop,bg:'#df7642',run:()=>openWebView('https://fmall.gree.com/','董明珠店')},
   {n:'格力电器',d:'gree.com.cn',ic:IC.gree(),bg:'#1a73e8',run:()=>toast('正在打开 gree.com.cn …')},
   {n:'天气',d:'珠海 · 实时天气',ic:NEO_IC.cloud,bg:'#4a90d9',run:()=>neoAppWeather()},
   {n:'格力新闻',d:'news.gree.com',ic:NEO_IC.globe,bg:'#5f6368',run:()=>toast('正在打开格力新闻 …')}];
  openPage(`<div class="npl-item">${npHead('浏览器','收藏夹')}
   <div class="np-body">
    <button class="nd-search" id="npbAddr">${NEO_IC.search}<span>搜索或输入网址</span></button>
    <div class="ns-gp-t">收藏</div>
    <div class="nd-grid" style="margin-top:0">${favs.map((f,i)=>`<div class="nd-app" data-fav="${i}"><div class="ic" style="background:${f.bg}">${f.ic}</div><span>${f.n}</span></div>`).join('')}</div>
    <div class="ns-gp-t">历史记录</div>
    <div class="np-card">
      <div class="np-row" data-his="mall"><span class="ic" style="background:#df7642">${NEO_IC.shop}</span><div><b>董明珠店 · 反渗透滤芯</b><span>fmall.gree.com · 昨天 21:08</span></div><span class="go">${svgArrow}</span></div>
      <div class="np-row" data-his="ac"><span class="ic" style="background:#1a73e8">${NEO_IC.globe}</span><div><b>空调一级能效选购指南</b><span>jingdong · 周一 14:32</span></div><span class="go">${svgArrow}</span></div>
      <div class="np-row" data-his="recipe"><span class="ic" style="background:#f29900">${NEO_IC.globe}</span><div><b>清蒸鲈鱼的火候与时间</b><span>xiachufang · 周日 17:20</span></div><span class="go">${svgArrow}</span></div>
    </div>
   </div></div>`,el=>{
    el.querySelectorAll('[data-fav]').forEach(b=>b.onclick=()=>favs[+b.dataset.fav].run());
    el.querySelector('[data-his="mall"]').onclick=()=>openWebView('https://fmall.gree.com/','董明珠店');
    el.querySelector('[data-his="ac"]').onclick=()=>toast('正在打开历史页面 …');
    el.querySelector('[data-his="recipe"]').onclick=()=>toast('正在打开历史页面 …');
    el.querySelector('#npbAddr').onclick=()=>openNeoSearch();
  },false);
}
/* ---------- 相机 ---------- */
function neoAppCamera(){
  openPage(`<div class="npc-view">
    <img src="img/neo_living.jpg">
    <div class="npc-grid"></div>
    <div class="npc-top"><span>✦ 智能场景</span><span>HDR</span><span>4K</span></div>
    <div class="npc-modes"><span>视频</span><b>照片</b><span>人像</span></div>
    <div class="npc-bottom">
      <img class="npc-thumb" id="npcThumb" src="img/neo_kid.jpg">
      <button class="npc-shutter" id="npcShutter"></button>
      <span style="width:38px;text-align:center;color:rgba(255,255,255,.8);font-size:11px" id="npcFlip">翻转</span>
    </div>
    <div class="npc-flash" id="npcFlash"></div>
    <button class="np-back" data-back style="position:absolute;top:44px;left:16px;background:rgba(0,0,0,.3);border-color:rgba(255,255,255,.2);color:#fff">${NEO_IC.back}</button>
   </div>`,el=>{
    el.querySelector('#npcShutter').onclick=()=>{const f=el.querySelector('#npcFlash');
      f.classList.add('on');setTimeout(()=>f.classList.remove('on'),160);toast('已拍摄 · 保存到相册');};
    el.querySelector('#npcThumb').onclick=()=>neoAppPhotos();
    el.querySelector('#npcFlip').onclick=()=>toast('已切换到前置摄像头');
  },true);
}
/* ---------- 相册 ---------- */
const NEO_PHOTOS=[
 {s:'img/neo_living.jpg',a:'家',t:'客厅 · 今天'},{s:'img/neo_kid.jpg',a:'家',t:'儿童房 · 今天'},
 {s:'img/neo_kitchen.jpg',a:'家',t:'厨房 · 昨天'},{s:'img/neo_bedroom.jpg',a:'家',t:'主卧 · 昨天'},
 {s:'img/r_fish.png',a:'美食',t:'清蒸鲈鱼 · 周一'},{s:'img/r_cake.png',a:'美食',t:'草莓蛋糕 · 周日'},
 {s:'img/r_wings.png',a:'美食',t:'烤鸡翅 · 周日'},{s:'img/r_soup.png',a:'美食',t:'老火靓汤 · 上周'},
 {s:'img/r_tomegg.png',a:'美食',t:'番茄炒蛋 · 上周'},{s:'img/sc_home.png',a:'场景',t:'回家模式 · 7月'},
 {s:'img/sc_movie.png',a:'场景',t:'观影模式 · 7月'},{s:'img/sc_sleep.png',a:'场景',t:'睡眠模式 · 7月'},
 {s:'img/sc_away.png',a:'场景',t:'离家模式 · 6月'},{s:'img/sc_guest.png',a:'场景',t:'会客模式 · 6月'},
 {s:'img/r_rice.png',a:'美食',t:'柴火饭 · 6月'},{s:'img/sc_eco.png',a:'场景',t:'节能模式 · 6月'}];
function neoAppPhotos(filter){
  const cats=['全部','家','美食','场景'];const f=filter||'全部';
  const list=NEO_PHOTOS.filter(p=>f==='全部'||p.a===f);
  openPage(`<div class="npl-item">${npHead('相册',list.length+' 张')}
   <div class="np-body">
    <div class="npp-albums">${cats.map(c=>`<button class="npp-al${c===f?' on':''}" data-alb="${c}">${c}</button>`).join('')}</div>
    <div class="npp-grid">${list.map((p,i)=>`<img src="${p.s}" data-ph="${i}">`).join('')}</div>
   </div></div>`,el=>{
    el.querySelectorAll('[data-alb]').forEach(b=>b.onclick=()=>{closePage();neoAppPhotos(b.dataset.alb)});
    el.querySelectorAll('[data-ph]').forEach(im=>im.onclick=()=>{
      const p=list[+im.dataset.ph];
      openPage(`<div class="npp-view">
        <div class="np-head" style="position:absolute;top:0;left:0;right:0;z-index:3"><button class="np-back" data-back style="background:rgba(0,0,0,.34);border-color:rgba(255,255,255,.2);color:#fff">${NEO_IC.back}</button><h1 style="color:#fff;font-size:13px">${p.t}</h1></div>
        <img src="${p.s}">
        <div style="display:flex;justify-content:space-around;padding:12px 0 30px;color:rgba(255,255,255,.85);font-size:11.5px">
          <span id="pvShare">分享</span><span id="pvFav">收藏</span><span id="pvEdit">编辑</span><span id="pvDel">删除</span></div>
       </div>`,el2=>{
        el2.querySelector('#pvShare').onclick=()=>toast('已生成分享链接');
        el2.querySelector('#pvFav').onclick=()=>toast('已收藏');
        el2.querySelector('#pvEdit').onclick=()=>toast('进入编辑（演示）');
        el2.querySelector('#pvDel').onclick=()=>{closePage();toast('已移入最近删除');};
      },true);
    });
  },false);
}
/* ---------- 日历 ---------- */
function neoAppCalendar(){
  const now=new Date(),y=now.getFullYear(),m=now.getMonth(),today=now.getDate();
  const first=new Date(y,m,1).getDay(),days=new Date(y,m+1,0).getDate(),prev=new Date(y,m,0).getDate();
  const evs={[today]:1,[today+2>days?today:days>6?7:5]:1,12:1,20:1};evs[today]=1;
  let cells='';
  for(let i=first-1;i>=0;i--)cells+=`<div class="ncal-d dim">${prev-i}</div>`;
  for(let d=1;d<=days;d++)cells+=`<div class="ncal-d${d===today?' today':''}${evs[d]?' ev':''}">${d}</div>`;
  const total=first+days,trail=(7-total%7)%7;
  for(let d=1;d<=trail;d++)cells+=`<div class="ncal-d dim">${d}</div>`;
  openPage(`<div class="npl-item">${npHead('日历','')}
   <div class="np-body">
    <div class="np-card" style="padding:12px 10px 14px">
      <div class="ncal-month" style="padding:2px 8px 10px">${y}年${m+1}月</div>
      <div class="ncal-week">${['日','一','二','三','四','五','六'].map(w=>`<span>${w}</span>`).join('')}</div>
      <div class="ncal-days">${cells}</div>
    </div>
    <div class="ns-gp-t">今天 · 2 个日程</div>
    <div class="np-card">
      <div class="ncal-ev"><time>14:00</time><div><b>空调深度清洗</b><span>格力售后上门 · 客厅 + 主卧</span></div></div>
      <div class="ncal-ev"><time>19:30</time><div><b>观影模式</b><span>自动执行 · 客厅灯光渐暗</span></div></div>
    </div>
    <div class="ns-gp-t">接下来</div>
    <div class="np-card">
      <div class="ncal-ev"><time>${m+1}月${Math.min(days,today+2)}日</time><div><b>净水器滤芯更换</b><span>格力家 · 已备件</span></div></div>
      <div class="ncal-ev"><time>${m+1}月12日</time><div><b>冰箱保养巡检</b><span>格力+ 服务预约</span></div></div>
      <div class="ncal-ev"><time>${m+1}月20日</time><div><b>妈妈生日</b><span>提前订蛋糕 · 提醒</span></div></div>
    </div>
   </div></div>`,null,false);
}
/* ---------- 时钟 ---------- */
function neoAppClock(){
  const now=new Date();
  const wc=[['北京','家里',0],['东京','',1],['伦敦','',-7],['纽约','',-12]].map(z=>{
    const t=new Date(now.getTime()+z[2]*3600*1000);
    return {n:z[0],sub:z[1]||(z[2]>0?`快 ${z[2]} 小时`:`慢 ${-z[2]} 小时`),
      hh:String(t.getHours()).padStart(2,'0'),mm:String(t.getMinutes()).padStart(2,'0')};
  });
  openPage(`<div class="npl-item">${npHead('时钟','世界时钟')}
   <div class="np-body">
    <div class="nck-now"><b id="npClockTime">${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:00</b><span>珠海 · 本地时间</span></div>
    <div class="np-card">${wc.map(w=>`<div class="np-row"><span class="ic" style="background:#202124">${NEO_IC.globe}</span>
      <div><b>${w.n}</b><span>${w.sub}</span></div>
      <b style="margin-left:auto;font-size:20px;font-weight:300;font-variant-numeric:tabular-nums">${w.hh}:${w.mm}</b></div>`).join('')}</div>
    <div class="ns-gp-t">闹钟</div>
    <div class="np-card">
      <div class="np-row"><span class="ic" style="background:#8a7ab8">${NEO_IC.alarm}</span>
        <div><b>06:50 · 晨起唤醒</b><span>联动睡眠模式 · 窗帘渐开</span></div>
        <span class="rd-sw on" id="nckAl1" style="margin-left:auto"></span></div>
      <div class="np-row"><span class="ic" style="background:#5f6368">${NEO_IC.alarm}</span>
        <div><b>22:30 · 睡觉提醒</b><span>工作日 · 联动勿扰</span></div>
        <span class="rd-sw" id="nckAl2" style="margin-left:auto"></span></div>
    </div>
   </div></div>`,el=>{
    el.querySelector('#nckAl1').onclick=e=>{e.currentTarget.classList.toggle('on');toast('闹钟已'+(e.currentTarget.classList.contains('on')?'开启':'关闭'));};
    el.querySelector('#nckAl2').onclick=e=>{e.currentTarget.classList.toggle('on');toast('闹钟已'+(e.currentTarget.classList.contains('on')?'开启':'关闭'));};
  },false);
}
/* ---------- 备忘录 ---------- */
function neoAppNotes(){
  const notes=[
   {n:'购物清单',t:'8月4日',b:'牛奶 × 2、鸡蛋一盒、鲈鱼一条（周四清蒸）、滤芯提醒：净水器滤芯这周到。'},
   {n:'家电保修信息',t:'7月28日',b:'客厅空调 KFR-35GW · 保修至 2029-06；蒸烤箱保修至 2028-11；格力售后 400-836-5315。'},
   {n:'家里 Wi-Fi',t:'7月2日',b:'GREE-Home-5G · 密码贴在书房路由器背面；访客网络：GREE-Guest。'}];
  openPage(`<div class="npl-item">${npHead('备忘录',notes.length+' 条')}
   <div class="np-body">
    <div class="np-card">${notes.map((n,i)=>`<div class="np-row" data-note="${i}">
      <span class="ic" style="background:#f29900">${IC.note().replace('width="26" height="26"','width="16" height="16"')}</span>
      <div style="min-width:0"><b class="npmi-title">${n.n}</b><p class="npmi-snip">${n.b}</p></div>
      <span class="npmi-time">${n.t}</span></div>`).join('')}</div>
   </div></div>`,el=>{
    el.querySelectorAll('[data-note]').forEach(r=>r.onclick=()=>{const n=notes[+r.dataset.note];
      openPage(`<div class="npl-item">${npHead(n.n,n.t)}
        <div class="np-body"><div class="np-card" style="padding:16px;font-size:13px;line-height:1.9;color:#3c382e">${n.b}</div></div></div>`,null,false);});
  },false);
}
/* ---------- 邮件 ---------- */
function neoAppMail(){
  const mails=[
   {f:'董明珠店',s:'您的订单已发货 · 反渗透滤芯',b:'您好，您购买的净水器反渗透滤芯已由珠海仓发出，顺丰 SF138****662，预计明天送达。收到后可打开格力家 App 一键预约更换。',t:'10:24',un:1},
   {f:'格力家庭能源',s:'7 月家庭能耗月报',b:'7 月总用电 412 度，其中空调占 61%；光伏发电 305 度，储能系统为您节省电费约 ¥186。点击查看详细分析。',t:'昨天',un:1},
   {f:'格力+ 服务',s:'空调深度清洗预约成功',b:'您预约的空调深度清洗服务已确认：本周四 14:00，服务工程师梁师傅将上门，请保持电话畅通。',t:'周一',un:0},
   {f:'格力家庭手机',s:'欢迎使用栖 Home OS 1.0',b:'这是一台为家而生的手机：下拉全局搜索家的每个角落，底部横条一划回到桌面，拖住上划管理任务。愿家安好。',t:'7月20日',un:0}];
  openPage(`<div class="npl-item">${npHead('收件箱',mails.filter(x=>x.un).length+' 封未读')}
   <div class="np-body">
    <div class="np-card">${mails.map((ml,i)=>`<div class="np-row" data-mail="${i}">
      ${ml.un?'<span class="npp-dot"></span>':'<span style="width:8px;flex:0 0 auto"></span>'}
      <div style="min-width:0"><b class="npmi-title">${ml.f}</b><p class="npmi-snip"><b>${ml.s}</b> · ${ml.b}</p></div>
      <span class="npmi-time">${ml.t}</span></div>`).join('')}</div>
   </div></div>`,el=>{
    el.querySelectorAll('[data-mail]').forEach(r=>r.onclick=()=>{const ml=mails[+r.dataset.mail];
      openPage(`<div class="npl-item">${npHead(ml.s,ml.t)}
        <div class="np-body"><div class="np-card" style="padding:16px">
          <div style="font-size:13px;font-weight:700">${ml.f}</div>
          <div style="font-size:10.5px;color:#8f8a7c;margin:4px 0 12px">发给我 · ${ml.t}</div>
          <div style="font-size:13px;line-height:1.9;color:#3c382e">${ml.b}</div></div></div></div>`,null,false);});
  },false);
}
/* ---------- 地图 ---------- */
function neoAppMap(){
  openPage(`<div class="npl-item">${npHead('地图','珠海 · 香洲')}
   <div class="np-body">
    <div class="npm-map">
      <svg width="100%" height="100%" viewBox="0 0 320 330">
        <rect width="320" height="330" fill="#e8ecdf"/>
        <path d="M0 60 Q120 40 320 80 L320 0 L0 0 Z" fill="#dfe7d2"/>
        <path d="M-20 300 Q100 240 180 300 T340 280" stroke="#bcd6ea" stroke-width="26" fill="none" stroke-linecap="round"/>
        <path d="M40 0 L70 330 M130 0 L150 330 M230 0 L240 330 M310 0 L300 330" stroke="#ffffff" stroke-width="9" fill="none"/>
        <path d="M0 110 L320 120 M0 190 L320 185 M0 260 L320 250" stroke="#ffffff" stroke-width="9" fill="none"/>
        <rect x="86" y="130" width="46" height="40" rx="8" fill="#cfe0bd"/>
        <rect x="176" y="205" width="52" height="36" rx="8" fill="#cfe0bd"/>
        <path d="M110 250 Q150 210 160 152" stroke="#df7642" stroke-width="4" fill="none" stroke-dasharray="8 7" stroke-linecap="round"/>
        <circle cx="110" cy="250" r="7" fill="#1a73e8" stroke="#fff" stroke-width="3"/>
        <g><circle cx="160" cy="150" r="9" fill="#df7642" opacity=".35"><animate attributeName="r" values="9;22" dur="1.6s" repeatCount="indefinite"/><animate attributeName="opacity" values=".4;0" dur="1.6s" repeatCount="indefinite"/></circle>
        <path d="M160 132c-8 0-13 5.5-13 12.5 0 9 13 19.5 13 19.5s13-10.5 13-19.5c0-7-5-12.5-13-12.5z" fill="#df7642" stroke="#fff" stroke-width="2.5"/>
        <circle cx="160" cy="145" r="4.5" fill="#fff"/></g>
        <text x="160" y="182" font-size="10" fill="#6d675a" text-anchor="middle" font-weight="600">明珠花园</text>
        <text x="110" y="276" font-size="9.5" fill="#1a73e8" text-anchor="middle">我的位置</text>
      </svg>
      <div class="npm-card"><span class="ic" style="width:34px;height:34px;border-radius:11px;background:#df7642;display:flex;align-items:center;justify-content:center;color:#fff">${IC.gree().replace('width="26" height="26"','width="17" height="17"')}</span>
        <div><b>回家 · 明珠花园 3 栋</b><span>3.2 km · 驾车约 12 分钟 · 一路畅通</span></div>
        <button class="npm-go" id="npmGo">导航</button></div>
    </div>
    <div class="ns-gp-t">常用地点</div>
    <div class="np-card">
      <div class="np-row" data-pt="公司"><span class="ic" style="background:#5f6368">${NEO_IC.pin}</span><div><b>公司</b><span>格力电器总部 · 6.8 km</span></div><span class="go">${svgArrow}</span></div>
      <div class="np-row" data-pt="学校"><span class="ic" style="background:#f29900">${NEO_IC.pin}</span><div><b>孩子的学校</b><span>香洲一小 · 1.9 km</span></div><span class="go">${svgArrow}</span></div>
    </div>
   </div></div>`,el=>{
    el.querySelector('#npmGo').onclick=()=>toast('开始导航 · 预计 12 分钟到家');
    el.querySelectorAll('[data-pt]').forEach(r=>r.onclick=()=>toast(`导航到「${r.dataset.pt}」（演示）`));
  },false);
}
/* ---------- 天气 ---------- */
function neoAppWeather(){
  const hrs=[['14时','sun','31°'],['15时','sun','31°'],['16时','cloud','30°'],['17时','cloud','29°'],['18时','cloud','28°'],['19时','rain','27°'],['20时','rain','26°'],['21时','cloud','26°']];
  const days=[['今天','多云转阵雨','26°','31°'],['周四','阵雨','25°','29°'],['周五','多云','26°','31°'],['周六','晴','27°','32°'],['周日','晴','27°','33°'],['周一','多云','26°','32°'],['周二','雷阵雨','25°','29°']];
  openPage(`<div class="npl-item">${npHead('天气','珠海 · 香洲')}
   <div class="np-body">
    <div class="npw-hero"><h2>珠海</h2><b>31°</b><p>多云 · 最高 31° 最低 26° · 体感 34°</p></div>
    <div class="npw-hours">${hrs.map(h=>`<div class="npw-hr"><span>${h[0]}</span><div class="wi">${NEO_IC[h[1]]}</div><b>${h[2]}</b></div>`).join('')}</div>
    <div class="ns-gp-t">未来 7 天</div>
    <div class="np-card">${days.map(d=>`<div class="np-row"><b style="width:52px;flex:0 0 auto">${d[0]}</b>
      <span style="font-size:11px;color:#8f8a7c">${d[1]}</span>
      <b style="margin-left:auto;font-weight:400;font-variant-numeric:tabular-nums"><span style="color:#a09a89">${d[2]}</span> · ${d[3]}</b></div>`).join('')}</div>
    <div class="ndh-chips" style="margin-top:12px">
      <div class="ndh-chip"><b>82%</b><span>湿度</span></div>
      <div class="ndh-chip"><b>3 级</b><span>东南风</span></div>
      <div class="ndh-chip"><b>中等</b><span>紫外线</span></div>
      <div class="ndh-chip"><b>优</b><span>空气</span></div>
    </div>
    <div class="np-card" style="margin-top:12px;padding:13px 14px;font-size:11.5px;color:#6d675a;line-height:1.8">
      今晚有阵雨，阳台晾的衣服建议 19:00 前收回；明日晴，适合开启「晾晒模式」。</div>
   </div></div>`,null,false);
}
/* ---------- 计算器 ---------- */
function neoAppCalc(){
  openPage(`<div class="npl-item">${npHead('计算器','')}
   <div class="ncc-disp"><div class="ncc-hist" id="nccHist"></div><div class="ncc-cur" id="nccCur">0</div></div>
   <div class="ncc-pad" style="padding:0 16px 30px">
    ${['C','±','%','÷','7','8','9','×','4','5','6','−','1','2','3','+','0','.','⌫','='].map(k=>
      `<div class="ncc-key${'÷×−+'.includes(k)?' op':k==='='?' eq':''}" data-cc="${k}">${k}</div>`).join('')}
   </div></div>`,el=>{
    let cur='0',acc=null,op=null,fresh=true;
    const curEl=el.querySelector('#nccCur'),histEl=el.querySelector('#nccHist');
    const show=()=>curEl.textContent=cur;
    const calc=(a,b,o)=>{a=+a;b=+b;let r=o==='+'?a+b:o==='−'?a-b:o==='×'?a*b:b===0?NaN:a/b;
      r=Math.round(r*1e10)/1e10;return String(r)};
    el.querySelectorAll('[data-cc]').forEach(k=>k.onclick=()=>{
      const v=k.dataset.cc;
      if(/\d/.test(v)){cur=(fresh||cur==='0')?v:cur+v;fresh=false;}
      else if(v==='.'){if(fresh){cur='0.';fresh=false}else if(!cur.includes('.'))cur+='.';}
      else if(v==='C'){cur='0';acc=null;op=null;fresh=true;histEl.textContent='';}
      else if(v==='⌫'){cur=cur.length>1?cur.slice(0,-1):'0';}
      else if(v==='±'){cur=cur.startsWith('-')?cur.slice(1):cur==='0'?cur:'-'+cur;}
      else if(v==='%'){cur=String(+cur/100);}
      else if('÷×−+'.includes(v)){
        if(op&&!fresh&&acc!==null){cur=calc(acc,cur,op);}
        acc=cur;op=v;histEl.textContent=`${acc} ${v}`;fresh=true;}
      else if(v==='='){if(op&&acc!==null){histEl.textContent=`${acc} ${op} ${cur} =`;
        cur=calc(acc,cur,op);acc=null;op=null;fresh=true;}}
      show();
    });
  },false);
}
/* ---------- 设置 ---------- */
function neoAppSettings(){
  const rows=[
   {n:'无线局域网',d:'GREE-Home-5G',ic:NEO_IC.wifi,bg:'#1a73e8',f:()=>toast('WLAN 设置（演示）')},
   {n:'蓝牙',d:'已连接 · 格力耳机',ic:NEO_IC.bt,bg:'#1a73e8',f:()=>toast('蓝牙设置（演示）')},
   {n:'蜂窝网络',d:'5G · 信号良好',ic:NEO_IC.cell,bg:'#34a853',f:()=>toast('蜂窝网络（演示）')},
   {n:'显示与亮度',d:'护眼暖色 · 自动',ic:NEO_IC.disp,bg:'#4a90d9',f:()=>toast('显示设置（演示）')},
   {n:'声音与触感',d:'铃声 · 家的旋律',ic:NEO_IC.snd,bg:'#e54545',f:()=>toast('声音设置（演示）')},
   {n:'电池',d:'82% · 低功耗模式关',ic:NEO_IC.batt,bg:'#34a853',f:()=>toast('电池（演示）')},
   {n:'通用',d:'存储 512 GB · 已用 38%',ic:IC.set('#fff'),bg:'#5f6368',f:()=>toast('通用（演示）')},
   {n:'关于本机',d:'栖 Home OS 1.0.2',ic:NEO_IC.info,bg:'#8a7ab8',f:()=>neoAppAbout()}];
  openPage(`<div class="npl-item">${npHead('设置','')}
   <div class="np-body">
    <div class="np-card nps-id"><img src="img/a_mom.png"><div><b>何女士</b><span>格力账号 · 明珠花园 3 栋 1201</span></div></div>
    <div class="ns-gp-t">系统</div>
    <div class="np-card">${rows.map((r,i)=>`<div class="np-row" data-set="${i}">
      <span class="ic" style="background:${r.bg}">${r.ic}</span><div><b>${r.n}</b><span>${r.d}</span></div><span class="go">${svgArrow}</span></div>`).join('')}</div>
    <div class="ns-gp-t">家庭</div>
    <div class="np-card">
      <div class="np-row" data-setg="homes"><span class="ic" style="background:linear-gradient(135deg,#1a73e8,#00b8a9)">${IC.gree().replace('width="26" height="26"','width="16" height="16"')}</span><div><b>家庭与房间</b><span>明珠花园 · 8 个房间 · ${DEVICES.length} 台设备</span></div><span class="go">${svgArrow}</span></div>
      <div class="np-row" data-setg="mode"><span class="ic" style="background:#df7642">${NEO_IC.apps}</span><div><b>系统板式</b><span>当前 · 创新板式（栖 Home OS）</span></div><span class="go">${svgArrow}</span></div>
    </div>
   </div></div>`,el=>{
    el.querySelectorAll('[data-set]').forEach(r=>r.onclick=()=>rows[+r.dataset.set].f());
    el.querySelector('[data-setg="homes"]').onclick=()=>openHomeSwitch();
    el.querySelector('[data-setg="mode"]').onclick=()=>toast('在左侧控制台可切换「经典板式 / 创新板式」');
  },false);
}
function neoAppAbout(){
  openPage(`<div class="npl-item">${npHead('关于本机','')}
   <div class="np-body" style="text-align:center">
    <div class="npa-logo">${IC.gree().replace('width="26" height="26"','width="34" height="34"')}</div>
    <div style="font-size:17px;font-weight:700">格力家庭手机 · G-Home Pro</div>
    <div style="font-size:11px;color:#8f8a7c;margin-top:5px">为家而生 · 栖 Home OS</div>
    <div class="np-card" style="margin-top:20px;text-align:left">
      <div class="np-row"><b>系统版本</b><span style="margin-left:auto">栖 Home OS 1.0.2（基于 Android 16 深度定制）</span></div>
      <div class="np-row"><b>运行内存</b><span style="margin-left:auto">12 GB + 8 GB 扩展</span></div>
      <div class="np-row"><b>机身存储</b><span style="margin-left:auto">512 GB</span></div>
      <div class="np-row"><b>芯片</b><span style="margin-left:auto">格力芯 G2 · 家庭 AI 引擎</span></div>
      <div class="np-row"><b>家庭中枢</b><span style="margin-left:auto">已连接 ${DEVICES.length} 台设备 · ${ROOMS.length} 个房间</span></div>
    </div>
   </div></div>`,null,false);
}
/* ---------- 应用商店 ---------- */
function neoAppStore(){
  const rows=[
   {n:'格力+',d:'设备控制 · 家庭服务官方应用',ic:IC.gree(),bg:'linear-gradient(135deg,#1a73e8,#00b8a9)',tag:'官方'},
   {n:'董明珠店',d:'品质家电 · 一站购齐',ic:NEO_IC.shop,bg:'#df7642',tag:'购物'},
   {n:'Claw 助手',d:'家庭 AI 语音助手',ic:NEO_IC.spark,bg:'#8a7ab8',tag:'AI'},
   {n:'格力厨味',d:'蒸烤菜谱 · 一键下发',ic:NEO_IC.cloud,bg:'#f29900',tag:'生活'}];
  openPage(`<div class="npl-item">${npHead('应用商店','格力生态')}
   <div class="np-body">
    <div class="nst-banner" id="nstBan"><img src="img/neo_living.jpg"><div><b>格力家 · 焕新上线</b><span>此刻 / 流转 / 空间 · 为家而生的超级应用</span></div></div>
    <div class="ns-gp-t">精选应用</div>
    <div class="np-card">${rows.map(r=>`<div class="np-row" data-sto="${r.n}">
      <span class="ic" style="background:${r.bg}">${r.ic}</span>
      <div><b>${r.n}</b><span>${r.d}</span></div>
      <button class="nst-get" data-get="${r.n}">获取</button></div>`).join('')}</div>
    <div class="ns-gp-t">排行榜 · 智能家居类</div>
    <div class="np-card">${['米家','华为智慧生活','美的美居','海尔智家'].map((n,i)=>`<div class="np-row">
      <b style="width:20px;color:#c8c2b1;font-weight:650">${i+1}</b><div><b>${n}</b><span>智能家居</span></div>
      <button class="nst-get" data-get="${n}">获取</button></div>`).join('')}</div>
   </div></div>`,el=>{
    el.querySelector('#nstBan').onclick=()=>neoAppOpen('gree');
    el.querySelectorAll('[data-get]').forEach(b=>b.onclick=e=>{e.stopPropagation();
      b.textContent='下载中…';setTimeout(()=>{b.textContent='打开';toast(`「${b.dataset.get}」安装完成`)},900);});
    el.querySelectorAll('[data-sto]').forEach(r=>r.onclick=()=>toast(`查看「${r.dataset.sto}」详情（演示）`));
  },false);
}
function setMode(m){
  MODE=m;localStorage.setItem('gree-mode',m);
  const bc=$('#btnModeClassic'),bn=$('#btnModeNeo');
  if(bc)bc.classList.toggle('on',m!=='neo');
  if(bn)bn.classList.toggle('on',m==='neo');
  if(m==='neo'){$('#gree').classList.remove('on');$('#launcher').classList.remove('off');}
  const gb=$('#neoGbar');if(gb)gb.style.display=(m==='neo')?'flex':'none';
  const ch=$('#ccHot');if(ch)ch.style.display=(m==='neo')?'block':'none';
  const nh=$('#ntfHot');if(nh)nh.style.display=(m==='neo')?'block':'none';
  $$('.cls-only').forEach(b=>b.style.display=(m==='neo')?'none':'');
  $$('.neo-only').forEach(b=>b.style.display=(m==='neo')?'':'none');
  if(m!=='neo'){closeNeoSearch();closeNeoSwitcher(true);closeNeoCC();toggleShade(false);}
  renderLauncher();
  if(!stackOpen.length)setSysTheme(m==='neo'?neoPg===1:($('#gree').classList.contains('on')?false:true));
}
