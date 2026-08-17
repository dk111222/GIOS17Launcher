/* ================= V3 房间二级页 ================= */
function openRoomV3(name){
  if(name==='客厅')return openLivingV3();
  if(name==='厨房')return openKitchenV3();
  if(name==='主卧')return openBedroomV3();
  if(name==='阳台')return openBalconyV3();
  openOtherRoomV3(name);
}
function bindQk(el){
  el.querySelectorAll('[data-qk]').forEach(b=>b.onclick=()=>{
    b.classList.toggle('on');const on=b.classList.contains('on');
    toast(`「${b.dataset.qk}」已${on?'开启':'关闭'}`);});
}
function bindDevGrid(el,attr){
  el.querySelectorAll(`[data-${attr||'dev'}]`).forEach(c=>c.onclick=()=>openDeviceCtl(DEVICES.find(d=>d.id===c.dataset[attr||'dev'])));
}
/* ---------- 空间页框架（客厅同款） ---------- */
const ROOM_FAB='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="4" y="4" width="7" height="7" rx="1.8"/><rect x="13" y="4" width="7" height="7" rx="1.8"/><rect x="4" y="13" width="7" height="7" rx="1.8"/><rect x="13" y="13" width="7" height="7" rx="1.8"/></svg>';
const ECO_LEAF='<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1a56c4" stroke-width="1.8" stroke-linecap="round"><path d="M5 19c0-7.5 4.5-12.5 13.5-14-1 9-5.5 14-13.5 14z"/><path d="M5 19c2.5-3.5 5.5-6.5 9.5-8.5"/></svg>';
const roomHead=(name,a,extra,miniX)=>`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button><h1>${name}</h1><span class="air-mini" id="airMiniRm"><b>${a.t}°</b><i></i><b>${a.h}%</b><i></i><b style="color:var(--green)">${a.aqi}</b>${miniX||''}</span><span class="pg-extra">${extra}</span></div>`;
function bindRoomFrame(el,alsoSel){
  const eg=el.querySelector('[data-engfull]');if(eg)eg.onclick=()=>openEnergyPage();
  const psc=el.querySelector('.page-scroll'),airCard=el.querySelector('.svc-card,.ctl-card'),mini=el.querySelector('#airMiniRm'),pgh=el.querySelector('.pg-head');
  if(!psc||!mini||!airCard||!pgh)return;
  const also=alsoSel?el.querySelector(alsoSel):null;
  const gone=x=>x.getBoundingClientRect().bottom<psc.getBoundingClientRect().top+6;
  psc.addEventListener('scroll',()=>{mini.classList.toggle('show',gone(airCard)&&(!also||gone(also)));},{passive:true});
  const toTop=()=>psc.scrollTo({top:0,behavior:'smooth'});
  pgh.addEventListener('dblclick',e=>{if(e.target.closest('.pg-back'))return;toTop();});
  let lt=0;
  pgh.addEventListener('touchend',e=>{if(e.target.closest('.pg-back'))return;const n=Date.now();if(n-lt<330){toTop();e.preventDefault();}lt=n;});
}
const roomFabHTML=ds=>`<button class="dev-fab" id="roomFab" aria-label="设备列表">${ROOM_FAB}<span class="fb-n">${ds.length}</span></button>`;
function bindRoomFab(el,ds,name){
  el.querySelector('#roomFab').onclick=()=>{
    const m=openModal(`<div class="dev-sheet-h"><h3 style="font-size:15px;font-weight:700;margin:0">${name}设备</h3><span style="margin-left:auto;font-size:11px;color:var(--ink3)">${ds.filter(d=>d.on).length}/${ds.length} 运行</span></div><div class="dev-grid">${ds.map(devCell).join('')}</div>`);
    m.querySelectorAll('[data-dev]').forEach(c=>c.onclick=()=>{const d=DEVICES.find(x=>x.id===c.dataset.dev);closeModal(m);openDeviceCtl(d);});
  };
}
const aiFoldRow=(rows,onCnt)=>`<div class="qk-row">
    <div class="v3-svc-head" data-ai-head>
      <h3 style="font-size:14px;font-weight:700;margin:0">AI 智慧服务</h3>
      <span style="margin-left:auto;font-size:11px;color:var(--blue);font-weight:600;cursor:pointer" data-ai-all>${onCnt} 项开启 · 全部 ›</span>
      <span class="v3-chev"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 9l6 6 6-6"/></svg></span>
    </div>
    <div class="v3-fold" style="margin-top:6px">${rows}</div>
  </div>`;
function bindAiFold(el,cat){
  const head=el.querySelector('[data-ai-head]');if(!head)return;
  const body=head.nextElementSibling,chev=head.querySelector('.v3-chev');
  head.onclick=()=>{const o=body.classList.toggle('show');chev.classList.toggle('open',o);};
  el.querySelector('[data-ai-all]').onclick=e=>{e.stopPropagation();openAIServices(cat);};
}
const engSec=(eco,cols,rank,ef)=>`
    <div class="ks-sec-h">电量情况<span>今日 ${cols[0][0]} ${cols[0][1]}</span></div>
    <div class="ctl-card">
      <div class="ks-row" id="ecoAiRm" style="cursor:pointer;margin-bottom:11px">
        <span class="kic" style="background:${eco.ibg}">${eco.ic}</span>
        <div><h5>${eco.t}</h5><p>${eco.p}</p></div>
        <span class="kb" style="color:${eco.kc};background:${eco.kbg}">详情 ›</span>
      </div>
      <div class="eng-cols">
        ${cols.map(c=>`<div class="eng-col"><b${c[3]?` style="color:${c[3]}"`:''}>${c[0]}<span style="font-size:10px"> ${c[1]}</span></b><small>${c[2]}</small></div>`).join('')}
      </div>
      <div style="margin-top:12px;font-size:11px;color:var(--ink3);margin-bottom:2px">用电占比</div>
      ${rank.map(r=>`<div style="display:flex;align-items:center;gap:10px;margin-top:9px"><span style="width:118px;font-size:11px;color:var(--ink2)">${r[0]}</span>
        <div style="flex:1;height:7px;border-radius:99px;background:#eef0f3;overflow:hidden"><div style="width:${r[2]}%;height:100%;border-radius:99px;background:${r[3]}"></div></div>
        <b style="width:44px;text-align:right;font-size:11px">${r[1]}</b></div>`).join('')}
      ${ef?`<div data-engfull style="display:flex;align-items:center;justify-content:center;gap:3px;margin-top:13px;padding-top:11px;border-top:1px dashed #e8eaee;font-size:12px;font-weight:600;color:var(--blue);cursor:pointer">查看全屋用电情况 ${svgArrow}</div>`:''}
    </div>`;
/* ---------- 房间快捷控制（客厅同款） ---------- */
const RM_WIND='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5b8def" stroke-width="1.8" stroke-linecap="round"><path d="M4 8h8a2.5 2.5 0 1 0-2.4-3.2M4 12h13a2.5 2.5 0 1 1-2.4 3.2M4 16h6"/></svg>';
const RM_CURTAIN='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6a5bd8" stroke-width="1.8" stroke-linecap="round"><path d="M4 4h16M5 4v13.5c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0V4"/><path d="M12 4v3.5"/></svg>';
const RM_SCENES={
 '主卧':[['睡眠模式','img/sc_sleep.png'],['观影模式','img/sc_movie.png'],['节能模式','img/sc_eco.png'],['离家模式','img/sc_away.png']],
 '儿童房':[['学习模式','img/sc_home.png'],['睡眠模式','img/sc_sleep.png'],['观影模式','img/sc_movie.png'],['节能模式','img/sc_eco.png']],
 '书房':[['专注模式','img/sc_home.png'],['会客模式','img/sc_guest.png'],['节能模式','img/sc_eco.png'],['离家模式','img/sc_away.png']],
 '餐厅':[['用餐模式','img/sc_guest.png'],['派对模式','img/sc_movie.png'],['回家模式','img/sc_home.png'],['节能模式','img/sc_eco.png']],
};
const RM_MDESC={'制冷':'强劲降温 · 夏日清凉','制热':'温暖送风 · 寒冬取暖','除湿':'降低湿度 · 体感干爽'};
const RM_MICO={'制冷':'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1a9fd8" stroke-width="1.8" stroke-linecap="round"><path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9M12 3l-2 2.4M12 3l2 2.4M12 21l-2-2.4M12 21l2-2.4"/></svg>','制热':'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#f29900" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5 5l1.8 1.8M17.2 17.2 19 19M19 5l-1.8 1.8M6.8 17.2 5 19"/></svg>','除湿':'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#00a8c6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5s5.5 6 5.5 10a5.5 5.5 0 0 1-11 0c0-4 5.5-10 5.5-10z"/></svg>'};
const RM_MIBG={'制冷':'#e3f2fd','制热':'#fdf3e3','除湿':'#e8f6fb'};
const RM_MCOL={'制冷':'#1a73e8','制热':'#e8710a','除湿':'#00a8c6'};
const RM_MCLS={'制冷':'md-cool','制热':'md-heat','除湿':'md-dry'};
const RM_CHEV='<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M6 9l6 6 6-6"/></svg>';
const quickCtlRows=(name,curtain)=>`
      <div class="qk-row">
        <div class="qk-h"><h5>场景</h5><span style="margin-left:auto;font-size:11px;color:var(--ink3)">左右滑动查看更多</span></div>
        <div class="sc3-row" data-rm-sc style="padding:8px 0 2px">${RM_SCENES[name].map(x=>`<button class="scene-btn" data-rmsc="${x[0]}"><img src="${x[1]}"><span>${x[0]}</span></button>`).join('')}</div>
      </div>
      <div class="qk-row temp">
        <div class="qk-h"><span class="qk-ic" style="background:#e8f1ff">${IC.ac('#1a73e8')}</span><h5>温度</h5><span class="qk-act" style="margin-left:0"><button class="chip on" data-rm-mode>制冷 ${RM_CHEV}</button></span>
          <span class="qk-step"><button data-rm-tdn>−</button><b data-rm-tempv>26°C</b><button data-rm-tup>＋</button></span></div>
      </div>
      <div class="qk-row">
        <div class="qk-h"><span class="qk-ic" style="background:#eef4fe">${RM_WIND}</span><h5>风速</h5>
          <span class="qk-seg">${['低速','中速','高速'].map((m,i)=>`<button class="${i===1?'on':''}" data-rm-fs="${m}">${m}</button>`).join('')}</span></div>
      </div>
      <div class="qk-row">
        <div class="qk-h"><h5>湿度</h5>
          <span class="qk-seg">${[['偏干',45],['舒适',55],['湿润',68]].map((x,i)=>`<button class="${i===1?'on':''}" data-rm-hm="${x[1]}">${x[0]}</button>`).join('')}</span></div>
      </div>
      <div class="qk-row">
        <div class="qk-h"><span class="qk-ic" style="background:#fdf3e3">${IC.light('#f29900')}</span><h5>主灯</h5>
          <span class="qk-seg" style="margin-left:auto;margin-right:9px">${[['夜灯',20],['日常',80],['明亮',100]].map((x,i)=>`<button class="${i===1?'on':''}" data-rm-bri="${x[1]}">${x[0]}</button>`).join('')}</span>
          <span class="switch on" data-rm-sw></span></div>
      </div>
      ${name==='主卧'?`<div class="qk-row">
        <div class="qk-h"><span style="display:flex;align-items:center;gap:8px;cursor:pointer" data-rm-ehgo><span class="qk-ic" style="background:#fdeee2">${IC.eheater('#f2641d')}</span><h5>电暖器</h5></span>
          <span class="qk-seg" style="margin-left:auto;margin-right:9px">${['静热','速热','睡眠'].map((m,i)=>`<button class="${i===0?'on':''}" data-rm-eh="${m}">${m}</button>`).join('')}</span>
          <span class="switch on" data-rm-ehsw></span></div>
      </div>`:''}
      ${curtain?`<div class="qk-row">
        <div class="qk-h"><span class="qk-ic" style="background:#efebff">${RM_CURTAIN}</span><h5>窗帘</h5>
          <span class="qk-seg">${[['全关',0],['半开',60],['全开',100]].map((x,i)=>`<button class="${i===1?'on':''}" data-rm-cur="${x[1]}">${x[0]}</button>`).join('')}</span></div>
      </div>`:''}`;
function bindQuickCtl(el){
  el.classList.add('rm-v3','md-cool');
  el.querySelectorAll('[data-rmsc]').forEach(b=>b.onclick=()=>{b.style.transform='scale(.94)';setTimeout(()=>b.style.transform='',220);toast(`执行「${b.dataset.rmsc}」场景成功`)});
  const scr=el.querySelector('[data-rm-sc]');if(scr)dragScroll(scr);
  /* 温度步进（防抖 toast） */
  let curTemp=26;const tv=el.querySelector('[data-rm-tempv]');let tT=null;
  const setT=v=>{curTemp=Math.max(16,Math.min(30,v));tv.textContent=curTemp+'°C';
    clearTimeout(tT);tT=setTimeout(()=>toast(`空调温度已设为 ${curTemp}°C`),450);};
  el.querySelector('[data-rm-tdn]').onclick=()=>setT(curTemp-1);
  el.querySelector('[data-rm-tup]').onclick=()=>setT(curTemp+1);
  /* 模式弹层 */
  const tempIc=el.querySelector('.qk-row.temp .qk-ic');
  let curMode='制冷';
  const modeBtn=el.querySelector('[data-rm-mode]');
  modeBtn.onclick=()=>{
    const m=openModal(`<div class="dev-sheet-h"><h3 style="font-size:15px;font-weight:700;margin:0">空调模式</h3><span style="margin-left:auto;font-size:11px;color:var(--ink3)">当前 · ${curMode}</span></div>
     ${['制冷','制热','除湿'].map(md=>`<div class="ks-row" data-mopt="${md}" style="cursor:pointer;${md==='除湿'?'border-bottom:none':''}"><span class="kic" style="background:${RM_MIBG[md]}">${RM_MICO[md]}</span><div><h5>${md}</h5><p>${RM_MDESC[md]}</p></div>${md===curMode?'<b style="margin-left:auto;color:var(--blue);font-size:16px">✓</b>':''}</div>`).join('')}`);
    m.querySelectorAll('[data-mopt]').forEach(r=>r.onclick=()=>{
      curMode=r.dataset.mopt;
      modeBtn.innerHTML=`${curMode} ${RM_CHEV}`;
      el.classList.remove('md-cool','md-heat','md-dry');el.classList.add(RM_MCLS[curMode]);
      tempIc.innerHTML=IC.ac(RM_MCOL[curMode]);
      closeModal(m);toast(`已切换为「${curMode}」模式`);
    });
  };
  /* 风速分段 */
  el.querySelectorAll('[data-rm-fs]').forEach(b=>b.onclick=()=>{
    el.querySelectorAll('[data-rm-fs]').forEach(x=>x.classList.toggle('on',x===b));
    toast(`风速已调至「${b.dataset.rmFs}」`);});
  /* 湿度分段 */
  el.querySelectorAll('[data-rm-hm]').forEach(b=>b.onclick=()=>{
    el.querySelectorAll('[data-rm-hm]').forEach(x=>x.classList.toggle('on',x===b));
    toast(`湿度已调至「${b.textContent}」 ${b.dataset.rmHm}%`);});
  /* 主灯：亮度分段 + 开关 */
  const sw=el.querySelector('[data-rm-sw]');
  const briBtns=el.querySelectorAll('[data-rm-bri]');
  briBtns.forEach(b=>b.onclick=()=>{
    if(sw&&!sw.classList.contains('on'))sw.classList.add('on');
    briBtns.forEach(x=>x.classList.toggle('on',x===b));
    toast(`主灯已调至「${b.textContent}」 ${b.dataset.rmBri}%`);});
  if(sw)sw.onclick=()=>{const on=sw.classList.toggle('on');toast(`主灯已${on?'打开':'关闭'}`);};
  /* 窗帘分段 */
  el.querySelectorAll('[data-rm-cur]').forEach(b=>b.onclick=()=>{
    el.querySelectorAll('[data-rm-cur]').forEach(x=>x.classList.toggle('on',x===b));
    const v=+b.dataset.rmCur;toast(v===100?'窗帘已全开':v===0?'窗帘已全关':`窗帘开合度已调至 ${v}%`);});
  /* 电暖器（主卧）：模式分段 + 开关 + 点行进控制页 */
  const ehD=DEVICES.find(x=>x.id==='eh1');
  const ehsw=el.querySelector('[data-rm-ehsw]');
  el.querySelectorAll('[data-rm-eh]').forEach(b=>b.onclick=()=>{
    el.querySelectorAll('[data-rm-eh]').forEach(x=>x.classList.toggle('on',x===b));
    if(ehD){ehD.mode=b.dataset.rmEh;if(!ehD.on){ehD.on=true;if(ehsw)ehsw.classList.add('on');}}
    toast(`电暖器已切换为「${b.dataset.rmEh}」模式`);});
  if(ehsw)ehsw.onclick=()=>{const on=ehsw.classList.toggle('on');if(ehD)ehD.on=on;toast(`电暖器已${on?'开机':'关机'}`);};
  const ehgo=el.querySelector('[data-rm-ehgo]');if(ehgo&&ehD)ehgo.onclick=()=>openEHeaterCtl(ehD);
}
/* ---------- 客厅 ---------- */
function openLivingV3(){
  const a=airOf('客厅'),ds=roomDevs('客厅');
  const defs={eng_liv:{base:'客厅用电',unit:' 度',color:'#1a73e8',type:'line'}};
  const rank=[['客厅空调','3.5 度',68,'#1a73e8'],['新风机','0.6 度',12,'#34a853'],['灯光·窗帘·其他','1.1 度',20,'#f29900']];
  const SC3=[['观影模式','img/sc_movie.png'],['会客模式','img/sc_guest.png'],['回家模式','img/sc_home.png'],['节能模式','img/sc_eco.png']];
  const airCell=(ic,v,u,c)=>`<div class="eng-col"><span class="ec-ic">${ic}</span><b${c?` style="color:${c}"`:''}>${v}</b><small>${u}</small></div>`;
  const SVC4=[
   {id:'purify',ibg:'#e9f9ef',ic:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#0d5c34" stroke-width="1.8" stroke-linecap="round"><path d="M4 10h9a2.5 2.5 0 1 0-2.4-3.2M4 14h13a2.5 2.5 0 1 1-2.4 3.2M4 18h6"/></svg>',t:'智能净化技术',p:'PM2.5 超标自动开启净化',kb:'已开启',kc:'#0d5c34',kbg:'#b9f2cf'},
   {id:'clean',ibg:'#e6f7f5',ic:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#00796b" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5s5.5 6 5.5 10a5.5 5.5 0 0 1-11 0c0-4 5.5-10 5.5-10z"/><path d="m12 9.5-1.4 3.2h2.8L12 16"/></svg>',t:'AI 双效自洁技术',p:'蒸发器自动清洁 · 出风更洁净',kb:'已开启',kc:'#00796b',kbg:'#c9efe9'},
   {id:'eco',ibg:'#e8f1ff',ic:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1a56c4" stroke-width="1.8" stroke-linecap="round"><path d="M5 19c0-7.5 4.5-12.5 13.5-14-1 9-5.5 14-13.5 14z"/><path d="M5 19c2.5-3.5 5.5-6.5 9.5-8.5"/></svg>',t:'无人节能场景',p:'当前有人 · 今日已节能 1 次 · 省电 0.8 度',kb:'查看',kc:'#1a56c4',kbg:'#d3e5fb'},
   {id:'sun',ibg:'#fdf3e3',ic:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#b26a00" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5 5l1.8 1.8M17.2 17.2 19 19M19 5l-1.8 1.8M6.8 17.2 5 19"/></svg>',t:'西晒升温 · 建议关窗帘',p:'14-16 点升温约 1.8°C',kb:'执行',kc:'#8a5200',kbg:'#ffe3b3'},
  ];
  const ecoSvc=SVC4.find(v=>v.id==='eco');
  const CURTAIN='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6a5bd8" stroke-width="1.8" stroke-linecap="round"><path d="M4 4h16M5 4v13.5c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0V4"/><path d="M12 4v3.5"/></svg>';
  const FAB='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="4" y="4" width="7" height="7" rx="1.8"/><rect x="13" y="4" width="7" height="7" rx="1.8"/><rect x="4" y="13" width="7" height="7" rx="1.8"/><rect x="13" y="13" width="7" height="7" rx="1.8"/></svg>';
  openPage(`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button><h1>客厅</h1><span class="air-mini" id="airMini3"><b>${a.t}°</b><i></i><b>${a.h}%</b><i></i><b style="color:var(--green)">${a.aqi}</b></span><span class="pg-extra">当前有人 · ${ds.filter(d=>d.on).length}/${ds.length} 运行</span></div>
   <div class="page-scroll" style="padding:0 0 96px">
    <div class="ks-sec-h" style="margin-top:14px">空气质量<span>实时</span></div>
    <div class="ctl-card" style="margin:0 14px 12px">
      <div class="eng-cols c4">
        ${airCell(V3IC.temp,a.t+'°','温度')}${airCell(V3IC.hum,a.h+'%','湿度')}${airCell(V3IC.aqi,a.aqi,'空气质量','var(--green)')}${airCell(V3IC.pm,a.pm,'PM2.5')}
        ${airCell(V3IC.tvoc,a.tvoc,'TVOC')}${airCell(V3IC.hcho,a.hcho,'甲醛')}${airCell(V3IC.co2,a.co2,'CO₂')}
        <div class="eng-col" id="airGo3" style="background:var(--blue);color:#fff;cursor:pointer"><b>详情</b><small style="color:rgba(255,255,255,.8)">趋势报告</small></div>
      </div>
    </div>
    <div class="ks-sec-h">房间快速控制</div>
    <div class="ctl-card">
      <div class="qk-row">
        <div class="v3-svc-head" id="aiSvcHead3">
          <h3 style="font-size:14px;font-weight:700;margin:0">AI 智慧服务</h3>
          <span style="margin-left:auto;font-size:11px;color:var(--blue);font-weight:600;cursor:pointer" id="aiAll3">2 项开启 · 全部 ›</span>
          <span class="v3-chev" id="aiChev3"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 9l6 6 6-6"/></svg></span>
        </div>
        <div class="v3-fold" id="aiSvcBody3" style="margin-top:6px">
          ${SVC4.map((v,i)=>`<div class="ks-row" data-svc4="${v.id}" style="cursor:pointer;${i===3?'border-bottom:none':''}"><span class="kic" style="background:${v.ibg}">${v.ic}</span><div><h5>${v.t}</h5><p>${v.p}</p></div><span class="kb" style="color:${v.kc};background:${v.kbg}">${v.kb}</span></div>`).join('')}
        </div>
      </div>
      <div class="qk-row">
        <div class="qk-h"><h5>场景</h5><span style="margin-left:auto;font-size:11px;color:var(--ink3)">左右滑动查看更多</span></div>
        <div class="sc3-row" id="sc3Row" style="padding:8px 0 2px">${SC3.map(x=>`<button class="scene-btn" data-sc3="${x[0]}"><img src="${x[1]}"><span>${x[0]}</span></button>`).join('')}</div>
      </div>
      <div class="qk-row temp">
        <div class="qk-h"><span class="qk-ic" style="background:#e8f1ff">${IC.ac('#1a73e8')}</span><h5>温度</h5><span class="qk-act" style="margin-left:0"><button class="chip on" id="qkMode3">制冷 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M6 9l6 6 6-6"/></svg></button></span>
          <span class="qk-step"><button id="qkTdn">−</button><b id="qkTempV">26°C</b><button id="qkTup">＋</button></span></div>
      </div>
      <div class="qk-row">
        <div class="qk-h"><span class="qk-ic" style="background:#eef4fe"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5b8def" stroke-width="1.8" stroke-linecap="round"><path d="M4 8h8a2.5 2.5 0 1 0-2.4-3.2M4 12h13a2.5 2.5 0 1 1-2.4 3.2M4 16h6"/></svg></span><h5>风速</h5>
          <span class="qk-seg">${['低速','中速','高速'].map((m,i2)=>`<button class="${i2===1?'on':''}" data-fs3="${m}">${m}</button>`).join('')}</span></div>
      </div>
      <div class="qk-row">
        <div class="qk-h"><h5>湿度</h5>
          <span class="qk-seg">${[['偏干',45],['舒适',55],['湿润',68]].map((x,i)=>`<button class="${i===1?'on':''}" data-hum3="${x[1]}">${x[0]}</button>`).join('')}</span></div>
      </div>
      <div class="qk-row">
        <div class="qk-h"><span class="qk-ic" style="background:#fdf3e3">${IC.light('#f29900')}</span><h5>主灯</h5>
          <span class="qk-seg" style="margin-left:auto;margin-right:9px">${[['夜灯',20],['日常',80],['明亮',100]].map((x,i)=>`<button class="${i===1?'on':''}" data-bri3="${x[1]}">${x[0]}</button>`).join('')}</span>
          <span class="switch on" data-sw3="灯"></span></div>
      </div>
      <div class="qk-row">
        <div class="qk-h"><span class="qk-ic" style="background:#efebff">${CURTAIN}</span><h5>窗帘</h5>
          <span class="qk-seg">${[['全关',0],['半开',60],['全开',100]].map((x,i)=>`<button class="${i===1?'on':''}" data-cur3="${x[1]}">${x[0]}</button>`).join('')}</span></div>
      </div>
    </div>
    <div class="ks-sec-h">电量情况<span>今日 5.2 度</span></div>
    <div class="ctl-card">
      <div class="ks-row" id="ecoAi3" style="cursor:pointer;margin-bottom:11px">
        <span class="kic" style="background:${ecoSvc.ibg}">${ecoSvc.ic}</span>
        <div><h5>人感节电 AI</h5><p>${ecoSvc.p}</p></div>
        <span class="kb" style="color:${ecoSvc.kc};background:${ecoSvc.kbg}">详情 ›</span>
      </div>
      <div class="eng-cols">
        <div class="eng-col"><b>5.2<span style="font-size:10px"> 度</span></b><small>今日用电</small></div>
        <div class="eng-col"><b>98<span style="font-size:10px"> 度</span></b><small>本月累计</small></div>
        <div class="eng-col"><b style="color:var(--green)">-12<span style="font-size:10px">%</span></b><small>较昨日</small></div>
      </div>
      <div style="margin-top:12px;font-size:11px;color:var(--ink3);margin-bottom:2px">用电占比</div>
      ${rank.map(r=>`<div style="display:flex;align-items:center;gap:10px;margin-top:9px"><span style="width:118px;font-size:11px;color:var(--ink2)">${r[0]}</span>
        <div style="flex:1;height:7px;border-radius:99px;background:#eef0f3;overflow:hidden"><div style="width:${r[2]}%;height:100%;border-radius:99px;background:${r[3]}"></div></div>
        <b style="width:44px;text-align:right;font-size:11px">${r[1]}</b></div>`).join('')}
    </div>
    ${chartCard('客厅用电','eng_liv',' 度','#1a73e8','line',1)}
   </div>
   <button class="dev-fab" id="devFab3" aria-label="客厅设备列表">${FAB}<span class="fb-n">${ds.length}</span></button>`,el=>{
    el.querySelector('#airGo3').onclick=()=>openAirPage('客厅');
    el.querySelector('#ecoAi3').onclick=()=>openAISvcDetail('eco');
    el.querySelector('[data-engfull]').onclick=()=>openEnergyPage();
    const aiHead=el.querySelector('#aiSvcHead3'),aiBody=el.querySelector('#aiSvcBody3'),aiChev=el.querySelector('#aiChev3');
    aiHead.onclick=()=>{const o=aiBody.classList.toggle('show');aiChev.classList.toggle('open',o);};
    el.querySelector('#aiAll3').onclick=e=>{e.stopPropagation();openAIServices('空气');};
    el.querySelectorAll('[data-svc4]').forEach(c=>c.onclick=()=>{
      const id=c.dataset.svc4;
      if(id==='sun'){const kb=c.querySelector('.kb');kb.textContent='已执行';kb.style.color='#0d5c34';kb.style.background='#b9f2cf';toast('已为你关闭客厅窗帘 50%');}
      else openAISvcDetail(id);
    });
    el.querySelectorAll('[data-sc3]').forEach(b=>b.onclick=()=>{b.style.transform='scale(.94)';setTimeout(()=>b.style.transform='',220);toast(`执行「${b.dataset.sc3}」场景成功`)});
    const tr=el.querySelector('#qkTdn'),trUp=el.querySelector('#qkTup'),tv=el.querySelector('#qkTempV');
    let curTemp=26,tT=null;
    const setT=v=>{curTemp=Math.max(16,Math.min(30,v));tv.textContent=curTemp+'°C';
      clearTimeout(tT);tT=setTimeout(()=>toast(`空调温度已设为 ${curTemp}°C`),450);};
    tr.onclick=()=>setT(curTemp-1);trUp.onclick=()=>setT(curTemp+1);
    el.classList.add('rm-v3','md-cool');
    const tempIc=el.querySelector('.qk-row.temp .qk-ic');
    const MCOL={'制冷':'#1a73e8','制热':'#e8710a','除湿':'#00a8c6'};
    const MCLS={'制冷':'md-cool','制热':'md-heat','除湿':'md-dry'};
    let curMode='制冷';
    const MDESC={'制冷':'强劲降温 · 夏日清凉','制热':'温暖送风 · 寒冬取暖','除湿':'降低湿度 · 体感干爽'};
    const MICO={'制冷':'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1a9fd8" stroke-width="1.8" stroke-linecap="round"><path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9M12 3l-2 2.4M12 3l2 2.4M12 21l-2-2.4M12 21l2-2.4"/></svg>','制热':'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#f29900" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5 5l1.8 1.8M17.2 17.2 19 19M19 5l-1.8 1.8M6.8 17.2 5 19"/></svg>','除湿':'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#00a8c6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5s5.5 6 5.5 10a5.5 5.5 0 0 1-11 0c0-4 5.5-10 5.5-10z"/></svg>'};
    const MIBG={'制冷':'#e3f2fd','制热':'#fdf3e3','除湿':'#e8f6fb'};
    const modeBtn=el.querySelector('#qkMode3');
    modeBtn.onclick=()=>{
      const m=openModal(`<div class="dev-sheet-h"><h3 style="font-size:15px;font-weight:700;margin:0">空调模式</h3><span style="margin-left:auto;font-size:11px;color:var(--ink3)">当前 · ${curMode}</span></div>
       ${['制冷','制热','除湿'].map(md=>`<div class="ks-row" data-mopt="${md}" style="cursor:pointer;${md==='除湿'?'border-bottom:none':''}"><span class="kic" style="background:${MIBG[md]}">${MICO[md]}</span><div><h5>${md}</h5><p>${MDESC[md]}</p></div>${md===curMode?'<b style="margin-left:auto;color:var(--blue);font-size:16px">✓</b>':''}</div>`).join('')}`);
      m.querySelectorAll('[data-mopt]').forEach(r=>r.onclick=()=>{
        curMode=r.dataset.mopt;
        modeBtn.innerHTML=`${curMode} <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M6 9l6 6 6-6"/></svg>`;
        el.classList.remove('md-cool','md-heat','md-dry');el.classList.add(MCLS[curMode]);
        tempIc.innerHTML=IC.ac(MCOL[curMode]);
        closeModal(m);toast(`已切换为「${curMode}」模式`);
      });
    };
    /* 风速分段 */
    el.querySelectorAll('[data-fs3]').forEach(b=>b.onclick=()=>{
      el.querySelectorAll('[data-fs3]').forEach(x=>x.classList.toggle('on',x===b));
      toast(`风速已调至「${b.dataset.fs3}」`)});
    /* 湿度分段 */
    el.querySelectorAll('[data-hum3]').forEach(b=>b.onclick=()=>{
      el.querySelectorAll('[data-hum3]').forEach(x=>x.classList.toggle('on',x===b));
      toast(`湿度已调至「${b.textContent}」 ${b.dataset.hum3}%`)});
    /* 主灯亮度分段 */
    const sw3=el.querySelector('[data-sw3]');const briBtns=el.querySelectorAll('[data-bri3]');
    briBtns.forEach(b=>b.onclick=()=>{
      if(sw3&&!sw3.classList.contains('on'))sw3.classList.add('on');
      briBtns.forEach(x=>x.classList.toggle('on',x===b));
      toast(`主灯已调至「${b.textContent}」 ${b.dataset.bri3}%`)});
    /* 窗帘分段 */
    el.querySelectorAll('[data-cur3]').forEach(b=>b.onclick=()=>{
      el.querySelectorAll('[data-cur3]').forEach(x=>x.classList.toggle('on',x===b));
      const v=+b.dataset.cur3;toast(v===100?'窗帘已全开':v===0?'窗帘已全关':`窗帘开合度已调至 ${v}%`)});
    el.querySelectorAll('[data-sw3]').forEach(sw=>sw.onclick=()=>{const on=sw.classList.toggle('on');
      toast(`主灯已${on?'打开':'关闭'}`);});
    el.querySelector('#devFab3').onclick=()=>{
      const m=openModal(`<div class="dev-sheet-h"><h3 style="font-size:15px;font-weight:700;margin:0">客厅设备</h3><span style="margin-left:auto;font-size:11px;color:var(--ink3)">${ds.filter(d=>d.on).length}/${ds.length} 运行</span></div><div class="dev-grid">${ds.map(devCell).join('')}</div>`);
      m.querySelectorAll('[data-dev]').forEach(c=>c.onclick=()=>{const d=DEVICES.find(x=>x.id===c.dataset.dev);closeModal(m);openDeviceCtl(d);});
    };
    const psc=el.querySelector('.page-scroll'),airCard=el.querySelector('.svc-card,.ctl-card'),mini=el.querySelector('#airMini3');
    psc.addEventListener('scroll',()=>{mini.classList.toggle('show',airCard.getBoundingClientRect().bottom<psc.getBoundingClientRect().top+6);},{passive:true});
    const pgh=el.querySelector('.pg-head');
    const toTop=()=>psc.scrollTo({top:0,behavior:'smooth'});
    pgh.addEventListener('dblclick',e=>{if(e.target.closest('.pg-back'))return;toTop();});
    let lastTap=0;
    pgh.addEventListener('touchend',e=>{if(e.target.closest('.pg-back'))return;const n=Date.now();if(n-lastTap<330){toTop();e.preventDefault();}lastTap=n;});
    bindCharts(el,defs);
    dragScroll(el.querySelector('#sc3Row'));
   });
}
/* ---------- 厨房 ---------- */
function openKitchenV3(skipPop){
  const a=airOf('厨房');
  const KDEV=[
   {id:'fr1',t:'fridge',n:'冰箱',st:'3° / -18°',on:1},
   {id:'rc1',t:'rice',n:'电饭煲',st:'米已洗好',on:0},
   {id:'ov1',t:'oven',n:'蒸烤箱',st:'保温中',on:1},
   {id:'gs1',t:'gas',n:'燃气灶',st:'已关闭',on:0},
   {id:'hd1',t:'hood',n:'油烟机',st:'2 档',on:1},
   {id:'dw1',t:'dish',n:'洗碗机',st:'待机',on:0},
   {id:'wp1',t:'water',n:'净水机',st:'TDS 42',on:1}];
  const coldItems=FOODS.filter(f=>f.pos.includes('冷藏')).sort((x,y)=>x.days-y.days);
  const tabs=[['jieqi','二十四节气'],['oven','蒸烤箱推荐'],['rice','电饭煲推荐']];
  const el=openPage(roomHead('厨房',a,'当前有人 · 安全监测中','<i></i><b style="color:#0d5c34">安全</b>')+`
   <div class="page-scroll" style="padding:0 0 24px">
    <div class="ks-sec-h" style="margin-top:14px">环境与安全概况</div>
    <div class="ctl-card"><div class="eng-cols">
      <div class="eng-col"><span class="ec-ic">${V3IC.temp}</span><b>${a.t}°</b><small>温度</small></div>
      <div class="eng-col"><span class="ec-ic">${V3IC.hum}</span><b>${a.h}<span style="font-size:10px">%</span></b><small>湿度</small></div>
      <div class="eng-col"><span class="ec-ic">${V3IC.aqi}</span><b style="color:var(--orange)">${a.aqi}</b><small>空气质量 PM ${a.pm}</small></div>
    </div></div>
    <div style="padding:0 14px"><div class="lv-banner" id="kSafe3" style="margin-bottom:0;background:linear-gradient(120deg,#fdeeee,#fff7f3);border-color:#f6d9d9"><span class="lv-ic" style="background:#e54545">${KS_SHIELD}</span><div><h4>厨房安全 · 连续安全 26 天</h4><p>4 项监测全部正常</p></div><span class="arr" style="color:#e5a0a0">›</span></div></div>
    <div class="ks-sec-h">电器工作状态<span>4 台工作中</span></div>
    <div style="padding:0 12px"><div class="dev-grid">${KDEV.map(k=>`<div class="dev-cell ${k.on?'is-on':''}" data-kdev="${k.id}"><div class="dc-ic" style="${k.on?`background:${TYPE_META[k.t].c}`:''}">${devIcon(k.t)}</div><h5>${k.n}</h5><p>${k.st}</p></div>`).join('')}</div></div>
    <div class="tab-strip" id="kTabs" style="padding-top:2px">
      <button class="chip on" data-kt="food">食材管理</button>
      <button class="chip" data-kt="water">饮用水</button>
    </div>
    <div id="kTabBody"></div>
   </div>`);
  el.querySelector('#kSafe3').onclick=()=>openKitchenSafety();
  bindRoomFrame(el,'#kSafe3');
  bindDevGrid(el,'kdev');
  const tb=el.querySelector('#kTabBody');
  const renderRecipes3=()=>{
    tb.querySelector('#recipeStrip3').innerHTML=RECIPES[foodTab].map((r,i)=>`
      <div class="recipe-card" data-rc="${i}"><img src="${r.img}"><div class="rc-t"><h5>${r.name}</h5><p>${r.tag}</p></div></div>`).join('');
    tb.querySelectorAll('[data-rc]').forEach(c=>c.onclick=()=>openRecipe(RECIPES[foodTab][+c.dataset.rc]));
  };
  const showFood=()=>{
    tb.innerHTML=`<div class="ks-sec-h">食材管理<span>${FOODS.length} 种 · 已过期 ${FOOD_EXP().length} · 临期 ${FOOD_NEAR().length}</span></div>
    <div class="report-entry">
     <button class="re" id="foodConsume3" style="background:linear-gradient(135deg,#b26a00,#f29900)">
      <svg style="position:absolute;right:-14px;top:-16px;z-index:1;opacity:.22" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round"><path d="M4 13a8 8 0 0 1 16 0z"/><path d="M12 5V3M9 3.5h6"/><circle cx="12" cy="13" r="1.6" fill="#fff" stroke="none"/></svg>
      <span class="re-t"><b>食材消耗及营养摄入</b><small>32 种 · 蛋白 92% ›</small></span></button>
     <button class="re" id="foodShop3" style="background:linear-gradient(135deg,#0d5c34,#34a853)">
      <svg style="position:absolute;right:-14px;top:-16px;z-index:1;opacity:.22" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round"><path d="M5 8h14l-1.5 12h-11z"/><path d="M8.5 8a3.5 3.5 0 0 1 7 0M9.5 12v4M14.5 12v4"/></svg>
      <span class="re-t"><b>食材采购补充建议</b><small>8 条 · 4 人定制 ›</small></span></button>
    </div>
    <div class="fridge-sec"><h3>冷藏室<small>智能识别 · 自动录入 · 按保鲜期排序</small></h3>
      <div class="ing-grid">${coldItems.map(f=>`<div class="ing-cell" data-ing="${f.name}">
        ${f.days<=7?`<span class="exp" style="background:${f.days<=3||f.days<0?'var(--red)':'var(--orange)'}">${freshTag(f)[0]}</span>`:''}
        <img src="${f.img}"><h5>${f.name}</h5><p>${f.pos}<br>${f.qty}</p></div>`).join('')}</div>
      <button class="add-btn" id="foodAdd3" style="margin:10px 14px 2px;width:calc(100% - 28px)">＋ 拍照录入食材</button></div>
    <div class="ks-sec-h">食谱推荐<span>按库存生成</span></div>
    <div class="tab-strip" style="padding-top:0">${tabs.map(t=>`<button class="chip ${foodTab===t[0]?'on':''}" data-ft3="${t[0]}">${t[1]}</button>`).join('')}</div>
    <div class="recipe-strip" id="recipeStrip3"></div>`;
    tb.querySelectorAll('[data-ing]').forEach(c=>c.onclick=()=>openIngredient(FOODS.find(f=>f.name===c.dataset.ing)));
    tb.querySelector('#foodConsume3').onclick=()=>openFoodConsume();
    tb.querySelector('#foodShop3').onclick=()=>openFoodShop();
    tb.querySelector('#foodAdd3').onclick=()=>openCamMock('请对准食材拍照','识别成功：青椒 ×3，已录入冷藏室',()=>{
      FOODS.push({name:'青椒',cat:'蔬菜',img:'img/pepper.png',pos:'冷藏室 L3 · C 格',qty:'3 个',days:7,
        baike:'青椒维生素 C 含量在蔬菜中名列前茅，口感脆嫩爽口，可炒可拌。',
        keep:'保鲜袋包裹后冷藏，建议 7 天内食用，避免与苹果同放以免催熟。',
        nut:'每 100g 含维生素 C 约 72mg、膳食纤维 1.4g，热量极低。',
        dishes:['青椒炒肉丝','虎皮青椒']});
      closePage();openKitchenV3(true);
    });
    tb.querySelectorAll('[data-ft3]').forEach(b=>b.onclick=()=>{foodTab=b.dataset.ft3;
      tb.querySelectorAll('[data-ft3]').forEach(x=>x.classList.toggle('on',x===b));renderRecipes3()});
    renderRecipes3();
    tb.querySelectorAll('.recipe-strip').forEach(x=>dragScroll(x));
  };
  const showWater=()=>{tb.innerHTML=waterTabHTML();bindWaterTab(tb);};
  el.querySelectorAll('[data-kt]').forEach(b=>b.onclick=()=>{
    el.querySelectorAll('[data-kt]').forEach(x=>x.classList.toggle('on',x===b));
    if(b.dataset.kt==='water')showWater();else showFood();});
  showFood();
  /* 进入厨房页：过期食材弹窗提示 */
  if(!skipPop){const exps=FOOD_EXP();if(exps.length)setTimeout(()=>{
    const m=openModal(`<h3 style="font-size:15px;font-weight:700">食材过期提醒</h3>
     <p style="font-size:11.5px;color:var(--ink2);margin-top:8px;line-height:1.7">以下食材已过保质期，请勿食用并尽快处理：</p>
     ${exps.map(f=>{const ft=freshTag(f);return `<div class="msg-item" style="margin-top:9px;cursor:pointer" data-expf="${f.name}">
       <img src="${f.img}" style="width:40px;height:40px;object-fit:contain;flex:0 0 auto">
       <div class="mi-t"><div class="mi-top"><h4>${f.name}</h4><span class="mi-tag" style="color:${ft[1]};background:${ft[2]}">${ft[0]}</span></div>
       <p>${f.pos} · ${f.qty}</p></div></div>`}).join('')}
     <div style="display:flex;gap:9px;margin-top:14px">
       <button class="cook-btn" id="expShop" style="flex:1;background:#f1f3f6;color:var(--ink);box-shadow:none">采购替代品</button>
       <button class="cook-btn" data-close style="flex:1">知道了</button></div>`,{center:true});
    m.querySelectorAll('[data-expf]').forEach(b=>b.onclick=()=>{closeModal(m);openIngredient(FOODS.find(f=>f.name===b.dataset.expf));});
    m.querySelector('#expShop').onclick=()=>{closeModal(m);openFoodShop();};
  },380);}
}

/* ---------- 主卧 ---------- */
function openBedroomV3(){
  const a=airOf('主卧'),ds=roomDevs('主卧');
  const sp=sleepData(0,0),tt=sp.deep+sp.light+sp.rem;
  const defs={eng_bd:{base:'主卧用电',unit:' 度',color:'#6a5bd8',type:'line'}};
  const ecoBd={id:'eco',ibg:'#e8f1ff',ic:ECO_LEAF,t:'人感节电 AI',p:'当前无人 · 空调自动调高 1°C · 今日省电 0.5 度',kc:'#1a56c4',kbg:'#d3e5fb'};
  const aiRows=`<div class="ks-row" id="bdSlp3" style="cursor:pointer"><span class="kic" style="background:#efebff"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#6a5bd8" stroke-width="1.8" stroke-linecap="round"><path d="M20 14.5A8.2 8.2 0 0 1 9.5 4 8.2 8.2 0 1 0 20 14.5z"/></svg></span><div><h5>睡眠温度曲线已就绪</h5><p>入睡 27° → 深睡 26° → 晨起 26.5°</p></div><span class="kb" style="color:#6a5bd8;background:#efebff">查看</span></div>
      <div class="ks-row" id="bdDh3" style="cursor:pointer;border-bottom:none"><span class="kic" style="background:#e8f1ff"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" stroke-width="1.8" stroke-linecap="round"><path d="M12 3s5.5 6 5.5 10a5.5 5.5 0 0 1-11 0c0-4 5.5-10 5.5-10z"/></svg></span><div><h5>湿度偏高 · 睡前除湿 1 小时</h5><p>55-60% 更助深睡</p></div><span class="kb" style="color:#1a73e8;background:#e8f1ff">开启</span></div>`;
  openPage(roomHead('主卧',a,`当前无人 · ${ds.filter(d=>d.on).length}/${ds.length} 运行`)+`
   <div class="page-scroll" style="padding:0 0 96px">
    <div class="ks-sec-h" style="margin-top:14px">空气质量数据<span>实时</span></div>
    <div class="ctl-card" style="margin:0 14px 12px">
      <div class="eng-cols c4">
        <div class="eng-col"><span class="ec-ic">${V3IC.temp}</span><b>${a.t}°</b><small>温度</small></div>
        <div class="eng-col"><span class="ec-ic">${V3IC.hum}</span><b>${a.h}<span style="font-size:10px">%</span></b><small>湿度</small></div>
        <div class="eng-col"><span class="ec-ic">${V3IC.aqi}</span><b style="color:var(--green)">${a.aqi}</b><small>空气质量</small></div>
        <div class="eng-col"><span class="ec-ic">${V3IC.pm}</span><b>${a.pm}</b><small>PM2.5</small></div>
        <div class="eng-col"><span class="ec-ic">${V3IC.tvoc}</span><b>${a.tvoc}</b><small>TVOC</small></div>
        <div class="eng-col"><span class="ec-ic">${V3IC.hcho}</span><b>${a.hcho}</b><small>甲醛</small></div>
        <div class="eng-col"><span class="ec-ic">${V3IC.co2}</span><b>${a.co2}</b><small>CO₂</small></div>
        <div class="eng-col" id="airGoM" style="background:#6a5bd8;color:#fff;cursor:pointer"><b>详情</b><small style="color:rgba(255,255,255,.8)">趋势与报告</small></div>
      </div>
    </div>
    <div style="padding:0 14px"><div class="lv-banner slp" id="bdWho3" style="margin-bottom:0"><span class="lv-ic">${LV_RADAR}</span><div><h4>主卧当前无人</h4><p>22:00 自动进入睡眠模式</p></div></div></div>
    <div class="ks-sec-h">房间快速控制</div>
    <div class="ctl-card">
      ${aiFoldRow(aiRows,2)}
      ${quickCtlRows('主卧',true)}
    </div>
    <div class="ks-sec-h">睡眠报告<span>昨晚 · ${FAMILY[0].n}</span></div>
    <div class="svc-card" style="margin:0 14px 12px;background:linear-gradient(140deg,#e9eaff,#f7f5ff)">
      <div class="slp-ov">
        <div class="so"><b style="color:#f29900">${sp.score} 分</b><span>睡眠质量 中</span></div>
        <div class="so"><b>${Math.floor(tt/60)} 小时 ${tt%60} 分</b><span>睡眠时长</span></div>
        <div class="so"><b style="color:#f29900">${sp.move} 次</b><span>体动 偏多</span></div>
      </div>
      <button class="cook-btn" id="bdSlpGo" style="margin-top:12px;background:linear-gradient(120deg,#6a5bd8,#8b7cf0);box-shadow:0 6px 16px rgba(106,91,216,.32)">查看完整睡眠报告</button>
    </div>
    ${engSec(ecoBd,[['2.8','度','今日用电'],['56','度','本月累计'],['-8','%','较昨日','var(--green)']],[['卧室空调','1.9 度',68,'#6a5bd8'],['除湿机','0.5 度',18,'#00a8c6'],['灯光·其他','0.4 度',14,'#f29900']])}
    ${chartCard('主卧用电','eng_bd',' 度','#6a5bd8','line',1)}
   </div>
   ${roomFabHTML(ds)}`,el=>{
    el.querySelector('#airGoM').onclick=()=>openAirPage('主卧');
    el.querySelector('#bdWho3').onclick=()=>toast('主卧人体存在监测运行中，有人进入将自动感知');
    el.querySelector('#bdSlp3').onclick=()=>openAISvcDetail('sleepac');
    el.querySelector('#bdDh3').onclick=e=>{const kb=e.currentTarget.querySelector('.kb');kb.textContent='已开启';kb.style.color='#0d5c34';kb.style.background='#b9f2cf';toast('已开启主卧除湿机，目标湿度 58%');};
    el.querySelector('#bdSlpGo').onclick=()=>openSleepPage();
    el.querySelector('#ecoAiRm').onclick=()=>openAISvcDetail('eco');
    bindQuickCtl(el);bindAiFold(el,'睡眠健康');bindRoomFrame(el);bindRoomFab(el,ds,'主卧');
    bindCharts(el,defs);
   });
}
/* ---------- 其他房间（儿童房/书房/餐厅/卫生间） ---------- */
function openOtherRoomV3(name){
  const a=airOf(name),r=ROOMS.find(x=>x.name===name),ds=roomDevs(name);
  const defs={eng_ot:{base:name+'用电',unit:' 度',color:'#1a73e8',type:'line'}};
  const HINT={
   '儿童房':{c:'#f29900',bg:'#fdf3e3',kbg:'#ffe3b3',kc:'#8a5200',t:'空调待深度清洗',p:'已用 90 天 · 建议预约',btn:'去预约',act:'mall'},
   '书房':{c:'#00b8a9',bg:'#e6f7f5',kbg:'#c9efe9',kc:'#00796b',t:'书房无人节能中',p:'无人 · 设备已自动关闭',btn:'提前开启',act:'toast',tip:'已开启书房空调 26°C，预计 20 分钟达到舒适温度'},
   '餐厅':{c:'#b26a00',bg:'#fdf3e3',kbg:'#ffe3b3',kc:'#8a5200',t:'用餐灯光场景',p:'18:30 自动开启暖光',btn:'立即开启',act:'toast',tip:'已开启餐厅吊灯 · 暖光 70%'},
   '卫生间':{c:'#4a90d9',bg:'#e8f1fd',kbg:'#d3e5fb',kc:'#1a56c4',t:'用水高峰速热',p:'21:00 用水高峰前自动提速',btn:'立即速热',act:'toast',tip:'已开启热水器速热模式，约 15 分钟达 60°C'},
  }[name]||{c:'#5f6368',bg:'#f1f3f6',kbg:'#e2e5e9',kc:'#3c4043',t:'房间状态良好',p:'各项设备运行正常',btn:'查看',act:'toast',tip:'房间设备运行正常'};
  const shortN=n=>n.replace(/^(客厅|主卧|儿童房|书房|厨房|阳台|卫生间|餐厅)/,'');
  const ecoOt={id:'eco',ibg:'#e8f1ff',ic:ECO_LEAF,t:'人感节电 AI',
    p:name==='书房'?'无人 · 设备自动关闭 · 今日省电 0.6 度':`当前${r.who?'有人':'无人'} · 无人自动待机 · 今日省电 0.3 度`,
    kc:'#1a56c4',kbg:'#d3e5fb'};
  const cols=name==='书房'?[['1.2','度','今日用电'],['28','度','本月累计'],['-15','%','较昨日','var(--green)']]:[['1.8','度','今日用电'],['42','度','本月累计'],['-6','%','较昨日','var(--green)']];
  const rank=ds.slice(0,3).map((d,i)=>[shortN(d.name)||d.name,['1.1 度','0.4 度','0.3 度'][i],[62,24,14][i],['#1a73e8','#34a853','#f29900'][i]]);
  const aiRows=`<div class="ks-row" id="otHint" style="cursor:pointer;border-bottom:none"><span class="kic" style="background:${HINT.bg}"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="${HINT.c}" stroke-width="1.8" stroke-linecap="round"><path d="M12 3a6 6 0 0 1 3.5 10.9c-.7.5-1 1.1-1 2.1h-5c0-1-.3-1.6-1-2.1A6 6 0 0 1 12 3z"/><path d="M9.5 19h5M10.5 21.5h3"/></svg></span><div><h5>${HINT.t}</h5><p>${HINT.p}</p></div><span class="kb" style="color:${HINT.kc};background:${HINT.kbg}">${HINT.btn}</span></div>`;
  openPage(roomHead(name,a,`${r.who?'有人':'无人'} · ${ds.filter(d=>d.on).length}/${ds.length} 运行`)+`
   <div class="page-scroll" style="padding:0 0 96px">
    <div class="ks-sec-h" style="margin-top:14px">空气与温湿度<span>实时</span></div>
    <div class="ctl-card"><div class="eng-cols">
      <div class="eng-col"><span class="ec-ic">${V3IC.temp}</span><b>${a.t}°</b><small>温度</small></div>
      <div class="eng-col"><span class="ec-ic">${V3IC.hum}</span><b>${a.h}<span style="font-size:10px">%</span></b><small>湿度</small></div>
      <div class="eng-col"><span class="ec-ic">${V3IC.aqi}</span><b style="color:${a.aqi==='优'?'var(--green)':'var(--orange)'}">${a.aqi}</b><small>空气质量 PM ${a.pm}</small></div>
    </div></div>
    <div class="ks-sec-h">房间快速控制</div>
    <div class="ctl-card">
      ${aiFoldRow(aiRows,1)}
      ${RM_SCENES[name]?quickCtlRows(name,name!=='餐厅'):`<div class="qk-row"><div class="v3-qk">
        ${ds.map(d=>{const lb=d.type==='ac'?shortN(d.name)+' · '+d.t+'°C':shortN(d.name);return `<button class="chip ${d.on?'on':''}" data-qk="${lb}">${lb}</button>`}).join('')}
      </div></div>`}
    </div>
    ${(name==='餐厅'||name==='卫生间')?`<div class="tab-strip" id="dnTabs" style="padding-top:2px">
      <button class="chip on" data-dnt="power">用电</button>
      <button class="chip" data-dnt="water">${name==='卫生间'?'用水':'饮水'}</button>
    </div><div id="dnTabBody"></div>`:engSec(ecoOt,cols,rank.length?rank:[['照明·其他','1.1 度',62,'#1a73e8']])+chartCard(name+'用电','eng_ot',' 度','#1a73e8','line',1)}
   </div>
   ${roomFabHTML(ds)}`,el=>{
    el.querySelector('#otHint').onclick=e=>{
      if(HINT.act==='mall'){openWebView('https://fmall.gree.com/','董明珠店');toast('已为你跳转空调清洗预约');}
      else{const kb=e.currentTarget.querySelector('.kb');kb.textContent='已执行';kb.style.color='#0d5c34';kb.style.background='#b9f2cf';toast(HINT.tip);}
    };
    if(RM_SCENES[name])bindQuickCtl(el);else bindQk(el);
    bindAiFold(el);bindRoomFrame(el);bindRoomFab(el,ds,name);
    if(name==='餐厅'||name==='卫生间'){
      const tb=el.querySelector('#dnTabBody');
      const showPower=()=>{tb.innerHTML=engSec(ecoOt,cols,rank.length?rank:[['照明·其他','1.1 度',62,'#1a73e8']])+chartCard(name+'用电','eng_ot',' 度','#1a73e8','line',1);
        tb.querySelector('#ecoAiRm').onclick=()=>openAISvcDetail('eco');
        const eg=tb.querySelector('[data-engfull]');if(eg)eg.onclick=()=>openEnergyPage();
        bindCharts(tb,defs);};
      const showWater=name==='卫生间'
        ?()=>{tb.innerHTML=bathWaterTabHTML();bindBathWaterTab(tb);}
        :()=>{tb.innerHTML=waterTabHTML();bindWaterTab(tb);};
      el.querySelectorAll('[data-dnt]').forEach(b=>b.onclick=()=>{
        el.querySelectorAll('[data-dnt]').forEach(x=>x.classList.toggle('on',x===b));
        if(b.dataset.dnt==='water')showWater();else showPower();});
      showPower();
    }else{
      el.querySelectorAll('[data-sw]').forEach(sw=>sw.onclick=()=>{sw.classList.toggle('on');toast(sw.classList.contains('on')?'速热模式已开启':'速热模式已关闭')});
      el.querySelector('#ecoAiRm').onclick=()=>openAISvcDetail('eco');
      bindCharts(el,defs);
    }
   });
}
/* ---------- 用水 Tab（阳台/厨房/餐厅共用） ---------- */
const WT_DEFS={
 wt_use:{t:'用水量',key:'wt_use',unit:' L',color:'#00a8c6',type:'bar'},
 wt_drink:{t:'饮水量',key:'wt_drink',unit:' L',color:'#1a73e8',type:'bar'}};
function tdsCardHTML(kv){
  return `<div class="ctl-card"><h3>水质对比</h3>
      <div style="display:flex;gap:12px">
        <div style="flex:1;background:linear-gradient(140deg,#e9f9ef,#f3fdf6);border-radius:16px;padding:14px;text-align:center">
          <div style="font-size:30px;font-weight:300;color:var(--green)">42</div>
          <div style="font-size:10.5px;color:var(--ink2);margin-top:4px">家中净水 TDS ppm</div>
          <span class="tds-badge" style="color:#0d5c34;background:#b9f2cf">水质优 · 可直饮</span></div>
        <div style="flex:1;background:#fdf6ec;border-radius:16px;padding:14px;text-align:center">
          <div style="font-size:30px;font-weight:300;color:var(--orange)">168</div>
          <div style="font-size:10.5px;color:var(--ink2);margin-top:4px">自来水 TDS ppm</div>
          <span class="tds-badge" style="color:#8a5200;background:#ffe3b3">水质偏硬</span></div>
      </div>
      <div style="font-size:9.5px;color:var(--ink3);margin-top:8px">&lt;50 优 · 50-100 良好 · &gt;100 偏硬</div>
      ${kv}</div>`;
}
function filterCardHTML(){
  return `<div class="ctl-card"><h3>滤芯状态</h3>
      ${[['PP 棉滤芯',62,'#34a853','约 6 个月'],['前置活性炭滤芯',45,'#f29900','约 4 个月'],['反渗透滤芯',2,'#e54545','剩 3 天'],['后置活性炭滤芯',78,'#34a853','约 9 个月']].map(f=>`
      <div class="filter-item"><img src="img/m_filter.png"><div class="fi-t"><h5>${f[0]}</h5><div class="fi-bar"><i style="width:${f[1]}%;background:${f[2]}"></i></div></div>
      <div style="text-align:right"><b style="color:${f[2]}">${f[1]}%</b><div style="font-size:9.5px;color:var(--ink3);margin-top:3px">${f[3]}</div></div></div>`).join('')}
      <button class="cook-btn" id="buyFilter3" style="margin-top:10px">反渗透滤芯 · 一键购买 ¥299</button></div>`;
}
/* 完整版：厨房 / 餐厅「饮用水」 */
function waterTabHTML(){
  return `<div class="ks-sec-h">饮用水</div>
    ${tdsCardHTML('<div class="kv" style="margin-top:8px"><span>今日用水 / 饮水</span><b>86 L / 1.8 L</b></div>')}
    ${waterFamilyCardHTML()}
    ${filterCardHTML()}
    ${chartCard('用水量','wt_use',' L','#00a8c6','bar')}
    ${chartCard('饮水量','wt_drink',' L','#1a73e8','bar')}`;
}
/* 精简版：阳台「用水」——仅 TDS / 用水量图表 / 滤芯 */
function waterTabLiteHTML(){
  return `<div class="ks-sec-h">用水</div>
    ${tdsCardHTML('<div class="kv" style="margin-top:8px"><span>今日用水</span><b>86 L</b></div>')}
    ${filterCardHTML()}
    ${chartCard('用水量','wt_use',' L','#00a8c6','bar')}`;
}
/* 卫生间「用水」——热水器状态 / TDS / 用水量图表 */
function bathWaterTabHTML(){
  return `<div class="ks-sec-h">用水</div>
    <div class="ctl-card"><h3>热水器状态</h3>
      <div class="kv"><span>当前水温</span><b style="color:#e54545">45°C 保温中</b></div>
      <div class="kv"><span>今日热水用量</span><b>86 L</b></div>
      <div class="kv"><span>速热模式</span><span class="switch" data-sw></span></div></div>
    ${tdsCardHTML('')}
    ${chartCard('用水量','wt_use',' L','#00a8c6','bar')}`;
}
function bindBathWaterTab(root){
  root.querySelectorAll('[data-sw]').forEach(sw=>sw.onclick=()=>{sw.classList.toggle('on');toast(sw.classList.contains('on')?'速热模式已开启':'速热模式已关闭')});
  bindCharts(root,WT_DEFS);
}
function bindWaterTab(root){
  const bf=root.querySelector('#buyFilter3');if(bf)bf.onclick=()=>openWebView(MALL[2].url,'净水器反渗透滤芯');
  bindCharts(root,WT_DEFS);bindWaterFamily(root);
}
/* ---------- 阳台（并入原水的详情页） ---------- */
function openBalconyV3(){
  const a=airOf('阳台'),ds=roomDevs('阳台');
  const w=S.washer;
  const ecoBl={id:'eco',ibg:'#e8f1ff',ic:ECO_LEAF,t:'人感节电 AI',p:'洗衣完成自动待机 · 今日省电 0.2 度',kc:'#1a56c4',kbg:'#d3e5fb'};
  const aiRows=`<div class="ks-row" id="blFw" style="cursor:pointer"><span class="kic" style="background:#efe6ff"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#6a3fd4" stroke-width="1.8" stroke-linecap="round"><path d="M4 10h9a2.5 2.5 0 1 0-2.4-3.2M4 14h13a2.5 2.5 0 1 1-2.4 3.2M4 18h6"/></svg></span><div><h5>新风托管 · 防闷味</h5><p>洗护完成未取衣自动换气</p></div><span class="kb" style="color:#6a3fd4;background:#efe6ff">查看</span></div>
      <div class="ks-row" id="blFl" style="cursor:pointer;border-bottom:none"><span class="kic" style="background:#e6f7f5"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#00796b" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5s5.5 6 5.5 10a5.5 5.5 0 0 1-11 0c0-4 5.5-10 5.5-10z"/></svg></span><div><h5>滤芯寿命预测</h5><p>反渗透滤芯剩 3 天 · 一键复购</p></div><span class="kb" style="color:#00796b;background:#c9efe9">查看</span></div>`;
  openPage(roomHead('阳台',a,'无人 · 洗衣进行中')+`
   <div class="page-scroll" style="padding:0 0 96px">
    <div class="ks-sec-h" style="margin-top:14px">空气与温湿度</div>
    <div class="ctl-card"><div class="eng-cols">
      <div class="eng-col"><span class="ec-ic">${V3IC.temp}</span><b>${a.t}°</b><small>温度</small></div>
      <div class="eng-col"><span class="ec-ic">${V3IC.hum}</span><b>${a.h}<span style="font-size:10px">%</span></b><small>湿度</small></div>
      <div class="eng-col"><span class="ec-ic">${V3IC.aqi}</span><b style="color:var(--orange)">${a.aqi}</b><small>空气质量 PM ${a.pm}</small></div>
    </div></div>
    <div class="ks-sec-h">房间快速控制</div>
    <div class="ctl-card">
      ${aiFoldRow(aiRows,2)}
      <div class="ks-row" id="blWm" style="cursor:pointer;border-bottom:none;padding-bottom:0">
        <span class="kic" style="background:#efe6ff">${IC.washer('#6a3fd4')}</span>
        <div><h5>洗烘一体机 · ${w.mode} 进行中</h5><p>剩余 ${fmt(w.left)} · 建议 2 小时内晾晒</p></div>
        <span class="kb" style="color:#6a3fd4;background:#efe6ff">控制 ›</span>
      </div>
    </div>
    ${engSec(ecoBl,[['0.9','度','今日用电'],['21','度','本月累计'],['-5','%','较昨日','var(--green)']],[['洗烘一体机','0.7 度',78,'#6a3fd4'],['净水设备','0.2 度',22,'#00a8c6']],1)}
    <div class="tab-strip" id="blTabs" style="padding-top:2px">
      <button class="chip on" data-blt="water">用水</button>
      <button class="chip" data-blt="ward">私人衣橱</button>
    </div>
    <div id="blTabBody"></div>
   </div>
   ${roomFabHTML(ds)}`,el=>{
    el.querySelector('#blFw').onclick=()=>openAISvcDetail('freshwind');
    el.querySelector('#blFl').onclick=()=>openAISvcDetail('filter');
    el.querySelector('#blWm').onclick=()=>{const d=ds.find(x=>x.type==='washer')||DEVICES.find(x=>x.id==='wm1');if(d)openDeviceCtl(d);};
    el.querySelector('#ecoAiRm').onclick=()=>openAISvcDetail('eco');
    bindAiFold(el);bindRoomFrame(el);bindRoomFab(el,ds,'阳台');
    const tb=el.querySelector('#blTabBody');
    const showWater=()=>{tb.innerHTML=waterTabLiteHTML();bindWaterTab(tb);};
    const showWard=()=>{tb.innerHTML=wardBodyHTML();bindWardBody(tb);};
    el.querySelectorAll('[data-blt]').forEach(b=>b.onclick=()=>{
      el.querySelectorAll('[data-blt]').forEach(x=>x.classList.toggle('on',x===b));
      if(b.dataset.blt==='ward')showWard();else showWater();});
    showWater();
   });
}
