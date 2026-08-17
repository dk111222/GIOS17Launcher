/* ================= 负一屏 ================= */
const HOMES=[
 {n:'明珠花园 3 栋 1201',d:'当前家庭 · 4 名成员 · 12 台设备'},
 {n:'阳光小区 8 栋 302',d:'父母家 · 2 名成员 · 6 台设备'},
 {n:'海边度假公寓',d:'度假屋 · 2 名成员 · 4 台设备'},
];
const HOME_SVG='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11.5 12 4l8 7.5"/><path d="M6.5 10.5V20h11v-9.5"/><path d="M10 20v-5h4v5"/></svg>';
const HOME_PLUS='<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>';
function homePillHTML(){
  const h=HOMES[S.homeIdx||0]||HOMES[0];
  return `<div class="g-home" id="gHome"><span style="color:#1a73e8;display:inline-flex">${HOME_SVG}</span><span id="gHomeName">${h.n}</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" stroke-width="2.2"><path d="M6 9l6 6 6-6"/></svg></div>`;
}
let greeTab='home';
let greeV2=false;
let greeV3=false;
function renderGree(){
  $('#gree').innerHTML=`
   <div class="g-head">
     <img class="g-avatar" id="gAvatar" src="img/a_dad.png" alt="">
     <div class="g-tabs">
       <button class="g-tab${greeTab==='mall'?' on':''}" id="tabMall">董明珠店<span class="dot" id="mallDot"></span></button>
       <button class="g-tab${greeTab==='home'?' on':''}" id="tabHome">我的家庭</button>
     </div>
     <button class="g-scan" id="gScan"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2M4 12h16"/></svg></button>
   </div>
   ${greeTab==='home'?homePillHTML():''}
   <div class="g-body" id="gBody"></div>`;
  $('#gAvatar').onclick=()=>openProfile();
  const gHomeBtn=$('#gHome');if(gHomeBtn)gHomeBtn.onclick=()=>openHomeSwitch();
  $('#gScan').onclick=()=>openScan();
  $('#tabMall').onclick=()=>{greeTab='mall';renderGree();$('#mallDot')?.remove();};
  $('#tabHome').onclick=()=>{greeTab='home';renderGree();};
  $('#gBody').innerHTML=greeTab==='home'?(greeV3?homeHTMLV3():(greeV2?homeHTMLV2():homeHTML())):mallHTML();
  bindHome();
}
/* ---------- 董明珠店 ---------- */
const SVC_IC={
 pay:'<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10.5h18M7 15h4"/></svg>',
 ship:'<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 3.5l8 4v9l-8 4-8-4v-9l8-4z"/><path d="M4.2 7.6L12 11.5l7.8-3.9M12 11.5v8.6"/></svg>',
 recv:'<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7.5" cy="18" r="1.7"/><circle cx="17" cy="18" r="1.7"/></svg>',
 rate:'<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 4l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 9.7l5.4-.8z"/></svg>',
 back:'<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 10a8 8 0 1 1 2.2 6.2"/><path d="M4 4v6h6"/></svg>',
 cs:'<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 13a8 8 0 1 1 16 0"/><rect x="2.5" y="12.5" width="4" height="6" rx="2"/><rect x="17.5" y="12.5" width="4" height="6" rx="2"/><path d="M20 18.5v1a2.5 2.5 0 0 1-2.5 2.5H13"/></svg>',
 trade:'<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h13l-2.5-2.5M20 16H7l2.5 2.5"/></svg>',
 cpn:'<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16v4a2 2 0 0 0 0 4v4H4v-4a2 2 0 0 0 0-4V7z"/><path d="M13 8v2M13 12v2M13 16v2"/></svg>',
 shop:'<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9l1.2-4h13.6L20 9M4 9v11h16V9M4 9h16M9.5 20v-6h5v6"/></svg>',
 more:'<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="4" y="4" width="6.5" height="6.5" rx="1.8"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.8"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.8"/><path d="M16.75 13.5v6.5M13.5 16.75h6.5"/></svg>'};
const MALL_ORDERS=[
 {img:'img/m_ac.png',t:'格力 · 臻新风空调 KFR-35GW',p:'一级能效 · 1.5 匹新风挂机 ×1　¥4,299',st:'运输中',step:2,
  log:'【珠海分拨中心】快件已发出，正发往斗门配送站',no:'格力物流 GD20260731568',time:'今天 09:26',
  btn:'确认收货',tip:'包裹仍在运输中，签收后即可确认收货',trackTip:'签收后格力售后将主动联系你预约免费上门安装',
  track:[['今天 09:26','【珠海分拨中心】快件已发出，正发往斗门配送站',1],['今天 06:12','快件到达【珠海分拨中心】',1],['7月30日 18:40','珠海仓拣货完成，包裹已出库',1],['7月30日 14:02','下单成功，等待仓库处理',1],['—','预约派送时间，师傅电话联系',0],['—','签收确认',0],['—','格力售后免费上门安装，安装完成',0]]},
 {img:'img/m_dehum.png',t:'格力 · 智能变频除湿机 DH20EF',p:'20L/天除湿量 · 干衣净化二合一 ×1　¥1,699',st:'待安装',step:5,
  log:'包裹已签收，安装服务待预约',no:'格力物流 GD20260728871',time:'昨天 16:40',
  btn:'预约安装',tip:'已为你提交安装预约，师傅将电话联系确认上门时间',trackTip:'安装完成后可在订单页评价本次服务',
  track:[['昨天 16:40','包裹已签收，本人签收，感谢使用格力物流',1],['昨天 15:52','【斗门配送站】派送中，快递员张师傅 138****6621',1],['昨天 09:10','快件到达【斗门配送站】',1],['7月28日 20:30','珠海仓拣货完成，包裹已出库',1],['7月28日 11:15','下单成功，等待仓库处理',1],['—','格力售后免费上门安装，安装完成',0]]}];
function svcHTML(neo){
  const odEnt=[['pay','待付款','','暂无待付款订单'],['ship','待发货','','暂无待发货订单'],['recv','待收货','1','1 个包裹正在运输中'],['rate','待评价','','暂无待评价订单'],['back','退款/售后','','暂无退款 / 售后单']];
  const steps=['下单成功','仓库出库','运输中','预约派送','签收确认','安装完成'];
  const ent=(k,t,badge,tip)=>`<div data-odent="${tip}" style="flex:1;cursor:pointer">
      <span style="position:relative;display:inline-flex;color:var(--ink2)">${SVC_IC[k]}${badge?`<i style="position:absolute;top:-5px;right:-9px;min-width:15px;height:15px;border-radius:99px;background:#e54545;color:#fff;font-size:9px;font-weight:700;font-style:normal;display:flex;align-items:center;justify-content:center;padding:0 3px">${badge}</i>`:''}</span>
      <div style="font-size:10.5px;color:var(--ink2);margin-top:5px">${t}</div></div>`;
  const svcEnt=(k,t,act)=>`<div data-svcent="${act}" style="flex:1;cursor:pointer">
      <span style="display:inline-flex;width:40px;height:40px;border-radius:13px;background:#eef4ff;color:#1a56c4;align-items:center;justify-content:center">${SVC_IC[k]}</span>
      <div style="font-size:11px;color:var(--ink2);margin-top:6px">${t}</div></div>`;
  const slide=(o,oi)=>`<div class="od-slide">
      <div style="display:flex;gap:11px;align-items:center">
        <img src="${o.img}" style="width:54px;height:54px;border-radius:12px;object-fit:cover;background:#f3f4f6;flex:0 0 auto">
        <div style="flex:1;min-width:0"><div style="font-size:13px;font-weight:700">${o.t}</div>
          <div style="font-size:10.5px;color:var(--ink3);margin-top:3px">${o.p}</div></div>
        <span style="flex:0 0 auto;font-size:11px;font-weight:700;color:var(--blue);background:#e8f1ff;border-radius:9px;padding:3px 9px">${o.st}</span>
      </div>
      <div style="display:flex;align-items:flex-start;margin-top:16px">
        ${steps.map((st,i)=>`<div style="flex:1;display:flex;flex-direction:column;align-items:center;position:relative">
          ${i?`<span style="position:absolute;top:5px;right:50%;width:100%;height:2px;background:${i<=o.step?'var(--blue)':'#e8eaee'}"></span>`:''}
          <span style="position:relative;background:#fff;width:11px;height:11px;border-radius:50%;${i<o.step?'background:var(--blue)':i===o.step?'border:3px solid var(--blue);width:12px;height:12px;box-shadow:0 0 0 3px rgba(26,115,232,.16)':'background:#e8eaee'}"></span>
          <span style="font-size:9px;margin-top:6px;white-space:nowrap;${i===o.step?'font-weight:700;color:var(--blue)':i<o.step?'color:var(--ink2)':'color:var(--ink3)'}">${st}</span>
        </div>`).join('')}
      </div>
      <div style="margin-top:12px;background:#f6f9ff;border-radius:12px;padding:9px 12px;font-size:11px;color:var(--ink2);line-height:1.55"><b style="color:var(--blue)">最新物流</b>　${o.log}<br><span style="color:var(--ink3);font-size:10px">${o.no} · ${o.time}</span></div>
      <div style="display:flex;gap:9px;margin-top:12px">
        <button data-odtrack="${oi}" style="flex:1;font-size:12px;font-weight:700;color:var(--blue);border:1px solid var(--blue);border-radius:16px;padding:8px 0">查看物流</button>
        <button data-odact="${oi}" style="flex:1;font-size:12px;font-weight:700;color:#fff;background:linear-gradient(120deg,#1a73e8,#3d8bff);border-radius:16px;padding:8px 0">${o.btn}</button>
      </div>
    </div>`;
  return `<div style="margin:16px 0 0">
    <div style="display:flex;align-items:baseline;margin:0 4px 8px"><span style="font-size:12px;color:var(--ink3)">我的服务</span><span id="svcAll" style="margin-left:auto;font-size:11px;color:var(--blue);font-weight:600;cursor:pointer">全部服务 ›</span></div>
    <div id="odCard" style="background:#fff;border-radius:20px;padding:14px 16px;box-shadow:0 2px 10px rgba(20,25,40,.05)">
      <div style="display:flex;align-items:center"><b style="font-size:14px">我的订单</b><span id="orderAll" style="margin-left:auto;font-size:11px;color:var(--ink3);cursor:pointer">查看全部订单 ›</span></div>
      <div style="display:flex;margin-top:13px;text-align:center">${odEnt.map(e=>ent(...e)).join('')}</div>
      <div class="od-view"><div class="od-track" id="odSlides">${MALL_ORDERS.map((o,i)=>slide(o,i)).join('')}</div></div>
      <div class="od-dots" id="odDots">${MALL_ORDERS.map((_,i)=>`<i class="${i===0?'on':''}"></i>`).join('')}</div>
    </div>
    ${neo?'':`<div style="background:#fff;border-radius:20px;padding:15px 16px 13px;margin-top:10px;box-shadow:0 2px 10px rgba(20,25,40,.05);display:flex;text-align:center">
      ${svcEnt('cs','客户服务','cs')}${svcEnt('trade','以旧换新','trade')}${svcEnt('cpn','领券中心','cpn')}${svcEnt('shop','网店服务','shop')}${svcEnt('more','更多服务','more')}
    </div>`}
  </div>`;
}
function mallHTML(){
  return `<div style="padding:2px 2px 20px">
    <div style="border-radius:22px;overflow:hidden;background:linear-gradient(135deg,#0f4c9c,#1a73e8 55%,#00b8a9);color:#fff;padding:26px 20px;margin-bottom:14px">
      <div style="font-size:20px;font-weight:800">董明珠店</div>
      <div style="font-size:12px;opacity:.85;margin-top:6px;line-height:1.7">格力官方线上商城 · 正品保障 · 全国联保<br>新人礼包已到账，至高 500 元券包</div>
      <button id="goMall" style="margin-top:16px;background:#fff;color:#0f4c9c;font-size:13px;font-weight:700;border-radius:18px;padding:10px 22px">进入线上商城</button>
    </div>
    <div style="font-size:12px;color:var(--ink3);margin:0 4px 8px">为你推荐</div>
    ${MALL.map((m,i)=>`<div class="shop-card" style="background:#fff"><img src="${m.img}"><div class="sc-t"><h5>${m.t}</h5><p>${m.p}</p></div><button class="sc-btn" data-mall="${i}">${m.btn}</button></div>`).join('')}
    ${svcHTML()}
    <div style="text-align:center;font-size:10.5px;color:var(--ink3);margin-top:10px">fmall.gree.com · 格力电子商务有限公司</div>
  </div>`;
}
function bindMall(){$('#goMall').onclick=()=>openWebView('https://fmall.gree.com/','董明珠店');
  $$('[data-mall]').forEach(b=>b.onclick=()=>openWebView(MALL[+b.dataset.mall].url,'董明珠店'));
  $('#orderAll').onclick=()=>toast('演示环境：全部订单列表');
  $('#svcAll').onclick=()=>toast('演示环境：全部服务大厅');
  $$('[data-odent]').forEach(b=>b.onclick=()=>{
    if(b.dataset.odent.indexOf('运输中')>-1){$('#odCard').scrollIntoView({behavior:'smooth',block:'center'});toast('1 个包裹正在运输中，物流进度见下方卡片');}
    else toast('演示环境：'+b.dataset.odent);});
  $$('[data-svcent]').forEach(b=>b.onclick=()=>{
    const k=b.dataset.svcent;
    if(k==='trade'){openWebView('https://fmall.gree.com/','董明珠店');toast('已为你跳转以旧换新专区');}
    else if(k==='more')openWebView('https://fmall.gree.com/distributionh5/#/user','董明珠店');
    else if(k==='cs')toast('已为你接入格力在线客服，请稍候…');
    else if(k==='cpn')toast('已领取新人券包 ¥500，结算时自动抵扣');
    else toast('演示环境：附近门店 3 家，最近 1.2km');});
  let odIdx=0;
  const odTk=$('#odSlides'),odDs=$$('#odDots i');
  const goOd=i=>{odIdx=(i+MALL_ORDERS.length)%MALL_ORDERS.length;
    odTk.style.transform=`translateX(${-odIdx*100}%)`;
    odDs.forEach((d,j)=>d.classList.toggle('on',j===odIdx));};
  const autoOd=()=>{clearInterval(odTimer);odTimer=setInterval(()=>{
    if(!document.body.contains(odTk)){clearInterval(odTimer);return}
    goOd(odIdx+1);},4200);};
  autoOd();
  let odSx=null;
  odTk.addEventListener('touchstart',e=>{odSx=e.touches[0].clientX},{passive:true});
  odTk.addEventListener('touchend',e=>{if(odSx===null)return;const dx=e.changedTouches[0].clientX-odSx;odSx=null;
    if(Math.abs(dx)>40){goOd(odIdx+(dx<0?1:-1));autoOd();}});
  odTk.addEventListener('dragstart',e=>e.preventDefault());
  odTk.addEventListener('mousedown',e=>{e.preventDefault();odSx=e.clientX;
    const up=ev=>{const dx=ev.clientX-odSx;odSx=null;document.removeEventListener('mouseup',up);
      if(Math.abs(dx)>40){goOd(odIdx+(dx<0?1:-1));autoOd();}};
    document.addEventListener('mouseup',up);});
  $$('[data-odact]').forEach(b=>b.onclick=()=>toast(MALL_ORDERS[+b.dataset.odact].tip));
  $$('[data-odtrack]').forEach(b=>b.onclick=()=>{
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
  });}

/* ---------- 我的家庭 ---------- */
function airOf(r){return AIR[r]||AIR['全屋']}
function homeHTML(){
  const a=airOf(S.airRoom);
  const msgChips=[
   {c:'#6a5bd8',t:'昨天睡眠报告已生成，睡眠质量中，体动有点多',time:'今天 08:00',act:'sleep',ic:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M20 14.5A8.2 8.2 0 0 1 9.5 4 8.2 8.2 0 1 0 20 14.5z"/></svg>'},
   {c:'#4a90d9',t:'10点检测客厅无人超过15分钟，客厅空调已进入轻度节能状态',time:'今天 10:15',act:'eco',ic:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 19c0-7.5 4.5-12.5 13.5-14-1 9-5.5 14-13.5 14z"/><path d="M5 19c2.5-3.5 5.5-6.5 9.5-8.5"/></svg>'},
   {c:'#e54545',t:'冰箱门未关',time:'7月22日 15:01'},
   {c:'#f29900',t:'米洗好了，是不是忘记开始煮饭啦',time:'7月22日 18:00',act:'rice'},
   {c:'#e54545',t:'检测到已离家但燃气灶未关，请注意安全',time:'7月22日 19:00'},
   {c:'#f29900',t:'蒸烤箱正在蒸鲈鱼，还剩 5 分钟完成',time:'今天'},
   {c:'#7c4dff',t:'洗衣机混合洗正在进行中，剩余 28 分钟结束',time:'今天'},
  ].map(m=>`<div class="msg-chip" data-msgs data-act="${m.act||''}"><div class="mc-ic" style="background:${m.c}1a;color:${m.c}">${m.ic||IC.gree('currentColor')}</div><div><p><time>${m.time}</time>${m.t}</p></div>${m.act?'<span class="mc-go">›</span>':''}</div>`).join('');
  const sumPct=runCount/DEVICES.length,sumR=34,sumC=2*Math.PI*sumR;
  const sumRing=`<svg width="86" height="86" style="transform:rotate(-90deg)"><defs><linearGradient id="dsr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1a73e8"/><stop offset="1" stop-color="#00b8a9"/></linearGradient></defs><circle cx="43" cy="43" r="${sumR}" fill="none" stroke="rgba(20,25,40,.08)" stroke-width="7"/><circle cx="43" cy="43" r="${sumR}" fill="none" stroke="url(#dsr)" stroke-width="7" stroke-linecap="round" stroke-dasharray="${sumC}" stroke-dashoffset="${sumC*(1-sumPct)}"/></svg>`;
  const sumRows=['ac','light','fridge','washer'].map(t=>{
    const all=DEVICES.filter(d=>d.type===t);const run=all.filter(d=>d.on).length;const meta=TYPE_META[t];
    return `<div class="ds-row"><span class="dr-ic" style="background:${meta.c}">${MINI_IC[t]}</span><span class="dr-n">${meta.n}</span><span class="dr-bar"><i style="width:${run/all.length*100}%;background:${meta.c}"></i></span><span class="dr-v"><b style="color:${meta.c}">${run}</b>/${all.length} 运行</span></div>`}).join('');
  const rooms4=ROOMS.slice(0,4).map(r=>{
    const ds=roomDevs(r.name);const run=ds.filter(d=>d.on).length;
    const types=[...new Set(ds.map(d=>TYPE_META[d.type].n))].slice(0,3).join('、');
    return `<div class="room-cell" data-room="${r.name}">
      <div class="rc-ic">${ROOM_IC[r.name]||ROOM_IC.客厅}</div>
      <h4>${r.name}</h4><span class="rc-who ${r.who?'yes':'no'}">${r.who?'有人':'无人'}</span>
      <p>${types}<br>${run}/${ds.length} 台运行</p></div>`}).join('');
  const expiring=FOODS.filter(f=>f.days<=7).sort((x,y)=>x.days-y.days).map(f=>`
    <div class="food-card" data-foodpage><img class="fc-img" src="${f.img}"><h5>${f.name}</h5>
    <div class="fc-days ${f.days<=3||f.days<0?'d-danger':'d-warn'}">${freshTag(f)[0]}${f.days<0?'':'到期'}</div></div>`).join('');
  const recs=RECIPES.jieqi.map(r=>`<div class="food-card" data-foodpage><img class="fc-img" src="${r.img}"><h5>${r.name}</h5><div class="fc-days d-ok">${r.tag}</div></div>`).join('');
  return `
  <div class="search-bar">
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.8-3.8"/></svg>
    <input id="gSearch" placeholder="搜索设备、智能家居服务">
    <span class="mic" id="gMic"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/></svg></span>
  </div>

  <!-- 设备状态 -->
  <div class="board">
    <div class="board-h"><h2>设备状态</h2><span class="bd-badge">3 条未读</span>
      <span class="bd-arrow" data-msgs>全部 ${svgArrow}</span></div>
    <div class="hscroll">${msgChips}</div>
    <div class="dev-sum" data-devices>
      <div class="ds-ring">${sumRing}<div class="c"><b>${runCount}<i>/${DEVICES.length}</i></b><span>台运行中</span></div></div>
      <div class="ds-rows">${sumRows}</div>
    </div>
    <div class="room-grid">${rooms4}</div>
    <button class="expand-btn" id="roomExpand">全部 ${ROOMS.length} 个房间 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 9l6 6 6-6"/></svg></button>
  </div>

  <!-- 系统服务 -->
  <div class="board">
    <div class="board-h"><h2>系统服务</h2></div>

    <div class="svc-card" style="background:linear-gradient(140deg,#e8f3ff,#f2faff)">
      <div class="svc-h"><span class="svc-ic" style="background:var(--blue)">${IC.fresh()}</span><h3>空气管家</h3>
        <span style="font-size:10px;color:var(--ink2)">${S.airRoom==='全屋'?'全屋':'当前：'+S.airRoom}</span>
        <button class="svc-gear" id="airGear"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.4 13a7.6 7.6 0 0 0 0-2l2-1.5-2-3.4-2.3 1a7.7 7.7 0 0 0-1.7-1L15 3.7H9L8.6 6a7.7 7.7 0 0 0-1.7 1l-2.3-1-2 3.4L4.6 11a7.6 7.6 0 0 0 0 2l-2 1.5 2 3.4 2.3-1a7.7 7.7 0 0 0 1.7 1L9 20.3h6l.4-2.2a7.7 7.7 0 0 0 1.7-1l2.3 1 2-3.4zM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7z"/></svg></button></div>
      <div class="air-grid" data-airpage>
        <div class="air-cell"><b>${a.t}°</b><small>温度</small></div>
        <div class="air-cell"><b>${a.h}<span class="u">%</span></b><small>湿度</small></div>
        <div class="air-cell"><b style="color:${a.aqi==='优'?'var(--green)':'var(--orange)'}">${a.aqi}</b><small>空气质量</small></div>
        <div class="air-cell"><b>${a.pm}</b><small>PM2.5 <span class="u">μg/m³</span></small></div>
        <div class="air-cell"><b>${a.tvoc}</b><small>TVOC <span class="u">mg/m³</span></small></div>
        <div class="air-cell"><b>${a.hcho}</b><small>甲醛 <span class="u">mg/m³</span></small></div>
        <div class="air-cell"><b>${a.co2}</b><small>CO₂ <span class="u">ppm</span></small></div>
        <div class="air-cell" style="background:var(--blue);color:#fff"><b>详情</b><small style="color:rgba(255,255,255,.8)">点击查看</small></div>
      </div>
    </div>

    <div class="svc-card" style="background:linear-gradient(140deg,#eafaf0,#f4fdf7)" data-engpage>
      <div class="svc-h"><span class="svc-ic" style="background:var(--green)"><svg width="17" height="17" viewBox="0 0 24 24" fill="#fff"><path d="M13 2 4.5 13.5H11L9.5 22 19 9.5h-6.5z"/></svg></span><h3>能源管家</h3>
        <span class="bd-arrow" style="margin-left:auto">${svgArrow}</span></div>
      <div class="eng-cols">
        <div class="eng-col"><b>18.6<span style="font-size:10px"> 度</span></b><small>今日用电</small></div>
        <div class="eng-col"><b style="color:var(--green)">12.4<span style="font-size:10px"> 度</span></b><small>今日光伏发电</small></div>
        <div class="eng-col"><b style="color:var(--teal)">68<span style="font-size:10px">%</span></b><small>储能电量 6.2 度</small></div>
      </div>
    </div>

    <div class="svc-card" style="background:linear-gradient(140deg,#fff4e8,#fffaf3)">
      <div class="svc-h"><span class="svc-ic" style="background:var(--orange)">${IC.fridge()}</span><h3>营养管家</h3>
        <span class="bd-arrow" style="margin-left:auto" data-foodpage>${svgArrow}</span></div>
      <div class="sec-sub">临期食品 · ${FOODS.filter(f=>f.days<=7).length} 件需尽快食用</div>
      <div class="food-scroll">${expiring}</div>
      <div class="sec-sub" style="margin-top:10px">大暑节气 · 为你推荐</div>
      <div class="food-scroll">${recs}</div>
    </div>

    <div class="svc-card" style="background:linear-gradient(140deg,#e8f6fb,#f2fbfe)" data-waterpage>
      <div class="svc-h"><span class="svc-ic" style="background:#00a8c6">${IC.water()}</span><h3>饮用水</h3>
        <span class="bd-arrow" style="margin-left:auto">${svgArrow}</span></div>
      <div class="water-grid">
        <div class="water-cell"><b>86<span class="u"> L</span></b><small>今日用水</small></div>
        <div class="water-cell"><b>2.4<span class="u"> 吨</span></b><small>本月用水</small></div>
        <div class="water-cell"><b>1.8<span class="u"> L</span></b><small>今日饮水</small></div>
        <div class="water-cell"><b style="color:var(--green)">42</b><small>实时 TDS <span class="u">ppm</span></small><span class="tds-badge" style="color:#0d5c34;background:#b9f2cf">水质优</span></div>
      </div>
      <div style="font-size:10.5px;color:var(--ink2);margin-top:9px">热水设定温度 45°C · RO 滤芯寿命剩 3 天</div>
    </div>

    <div class="svc-card" style="background:linear-gradient(140deg,#fdeeee,#fff7f3)" data-ksafe>
      <div class="svc-h"><span class="svc-ic" style="background:#e54545">${KS_SHIELD}</span><h3>厨房安全</h3>
        <span class="slp-lv" style="color:#0d5c34;background:#b9f2cf;margin-left:auto">安全</span>
        <span class="bd-arrow" style="margin-left:6px">${svgArrow}</span></div>
      <div class="sec-sub">燃气 · 水浸 · 灶台实时监测中</div>
      <div class="ks-grid">
        ${KSAFE.map(k=>`<div class="ks-cell"><i style="background:${k.ok?'#34a853':'#e54545'}"></i><span>${k.n}</span><b style="color:${k.ok?'#0d5c34':'#e54545'}">${k.st}</b></div>`).join('')}
      </div>
    </div>

    <div class="svc-card" style="background:linear-gradient(140deg,#f3edff,#faf7ff)" data-wardpage>
      <div class="svc-h"><span class="svc-ic" style="background:var(--purple)"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8"><path d="M12 4 7 7 4 10l3 1.5V20h10v-8.5L20 10 17 7z"/><path d="M12 4c-1.2 1-1.2 2.2 0 3 1.2-.8 1.2-2 0-3z"/></svg></span><h3>私人衣橱</h3>
        <span class="bd-arrow" style="margin-left:auto">${svgArrow}</span></div>
      <div class="ward-flex"><img src="img/c_silk.png">
        <div class="wf-t"><h5>真丝衬衫 · 空气洗护理中</h5>
        <p><span class="cook-anim"></span>剩余 <b id="wardLeft">18:00</b> · 今日 31°C 湿度 82%，真丝衣物建议低温烘干后悬挂除湿</p></div>
      </div>
    </div>

    <div class="svc-card" style="background:linear-gradient(140deg,#e9eaff,#f7f5ff)" data-sleeppage>
      <div class="svc-h"><span class="svc-ic" style="background:#6a5bd8">${SLP_MOON17}</span><h3>睡眠管家</h3>
        <span class="bd-arrow" style="margin-left:auto">${svgArrow}</span></div>
      ${(()=>{const sp=sleepData(0,0),tt=sp.deep+sp.light+sp.rem;return `
      <div class="sec-sub">昨日睡眠 · ${FAMILY[0].n} · 主卧</div>
      <div class="slp-ov">
        <div class="so"><b style="color:#f29900">${sp.score} 分</b><span>睡眠质量 中</span></div>
        <div class="so"><b>${Math.floor(tt/60)} 小时 ${tt%60} 分</b><span>睡眠时长</span></div>
        <div class="so"><b style="color:#f29900">${sp.move} 次</b><span>体动 偏多</span></div>
      </div>`})()}
    </div>
  </div>

  <!-- AI智能服务 -->
  <div class="board">
    <div class="board-h"><h2>AI智能服务</h2><span class="bd-arrow" data-aisvc>全部服务 ${svgArrow}</span></div>
    <div class="svc-card" data-aisvc style="cursor:pointer;background:linear-gradient(140deg,#eef2ff,#f7f9ff)">
      <div class="ai-cat-grid">${AI_CATS.map(c=>{const sv=AI_SERVICES.filter(v=>v.cat===c.n);const on=sv.filter(v=>aiOn(v)).length;
        return `<div class="ai-cat" data-aisvc-cat="${c.n}"><span class="ai-cat-ic" style="background:${c.c}1a">${c.ic}</span><h5>${c.n}</h5><p><b style="color:${on?'var(--green)':'var(--ink3)'}">${on}</b>/${sv.length} 开启</p></div>`}).join('')}</div>
    </div>
  </div>
  <!-- 董明珠店 -->
  <div class="board">
    <div class="board-h"><h2>董明珠店</h2><span class="bd-arrow" id="boardMall">进入商城 ${svgArrow}</span></div>
    ${MALL.map((m,i)=>`<div class="shop-card"><img src="${m.img}"><div class="sc-t"><h5>${m.t}</h5><p>${m.p}</p></div><button class="sc-btn" data-mall="${i}">${m.btn}</button></div>`).join('')}
  </div>`;
}
/* ---------- 家庭动态合并卡（主动服务+消息提醒+待处理） ---------- */
function dynCardHTML(){
  const evItems=EV_FEED.map(e=>`<div class="v2-log-item"><span class="dot"></span><time>${e.time}</time><span class="li-t">${e.t}</span>${e.svc?'<span class="ai-tag">AI</span>':''}</div>`).join('');
  const msgItems=MSGS.flatMap(g=>g.items).slice(0,7).map(m=>`<div class="v2-log-item"><span class="dot" style="background:${m.c}"></span><time>${m.time.slice(-5)}</time><span class="li-t">${m.t}</span></div>`).join('');
  const tdOne=t=>`<div class="v2-todo-item"><span class="td-ic" style="background:${t.c}1a;color:${t.c}">${t.ic}</span><span class="li-t">${t.t}</span></div>`;
  const tdItems=V2_TODOS.map(tdOne).join('')+tdOne(V2_TODOS[0]);
  return `<div class="v2-log" id="v2Log">
    <div class="v2-log-h" id="dynHead" style="align-items:center">
      <div><span class="v2-log-tag">家庭动态</span></div>
      <span class="v2-log-go">进入 ${svgArrow}</span>
    </div>
    <div class="dyn-seg" id="dynSeg"><button class="on" data-dtab="svc">自动完成 · 8</button><button data-dtab="msg">消息提醒 · 7</button><button data-dtab="todo">待处理 · 4<i class="dyn-dot"></i></button></div>
    <div class="dyn-pane" data-dpane="svc">
      <div class="v2-log-list"><div class="v2-log-track" id="evList">${evItems}${evItems}</div></div>
    </div>
    <div class="dyn-pane" data-dpane="msg" hidden>
      <div class="v2-log-list"><div class="v2-log-track" id="msgList">${msgItems}${msgItems}</div></div>
    </div>
    <div class="dyn-pane" data-dpane="todo" hidden>
      <div class="v2-todo-wrap"><div class="v2-todo-track" id="todoTrack">${tdItems}</div></div>
      <button class="v2-todo-btn" id="v2TodoBtn" style="width:100%;margin-top:10px">去处理</button>
    </div>
  </div>`;
}
/* ---------- 我的家庭 V2（首屏高信息密度） ---------- */
function homeHTMLV2(){
  const a=airOf(S.airRoom);
  const expiring=FOODS.filter(f=>f.days<=7).sort((x,y)=>x.days-y.days).map(f=>`
    <div class="food-card" data-foodpage><img class="fc-img" src="${f.img}"><h5>${f.name}</h5>
    <div class="fc-days ${f.days<=3||f.days<0?'d-danger':'d-warn'}">${freshTag(f)[0]}${f.days<0?'':'到期'}</div></div>`).join('');
  const recs=RECIPES.jieqi.map(r=>`<div class="food-card" data-foodpage><img class="fc-img" src="${r.img}"><h5>${r.name}</h5><div class="fc-days d-ok">${r.tag}</div></div>`).join('');
  return `
  <div class="search-bar">
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.8-3.8"/></svg>
    <input id="gSearch" placeholder="搜索设备、智能家居服务">
    <span class="mic" id="gMic"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/></svg></span>
  </div>

  <!-- 家庭动态：主动服务 + 消息提醒 + 待处理 合并卡 -->
  ${dynCardHTML()}

  <!-- 设备概览（折叠为一行） -->
  <div class="v2-devline" data-devices>
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" stroke-width="1.8"><rect x="3.5" y="3.5" width="7.5" height="7.5" rx="2"/><rect x="13" y="3.5" width="7.5" height="7.5" rx="2"/><rect x="3.5" y="13" width="7.5" height="7.5" rx="2"/><rect x="13" y="13" width="7.5" height="7.5" rx="2"/></svg>
    <span>全屋 ${DEVICES.length} 台 · <b>${runCount} 台运行中</b></span>
    <span class="dl-arrow">${svgArrow}</span>
  </div>

  <!-- 系统服务：默认仅旗舰空气管家 -->
  <div class="board">
    <div class="board-h"><h2>系统服务</h2></div>
    <div class="svc-card" style="background:linear-gradient(140deg,#e8f3ff,#f2faff)">
      <div class="svc-h"><span class="svc-ic" style="background:var(--blue)">${IC.fresh()}</span><h3>空气管家</h3>
        <span style="font-size:10px;color:var(--ink2)">${S.airRoom==='全屋'?'全屋':'当前：'+S.airRoom}</span>
        <button class="svc-gear" id="airGear"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.4 13a7.6 7.6 0 0 0 0-2l2-1.5-2-3.4-2.3 1a7.7 7.7 0 0 0-1.7-1L15 3.7H9L8.6 6a7.7 7.7 0 0 0-1.7 1l-2.3-1-2 3.4L4.6 11a7.6 7.6 0 0 0 0 2l-2 1.5 2 3.4 2.3-1a7.7 7.7 0 0 0 1.7 1L9 20.3h6l.4-2.2a7.7 7.7 0 0 0 1.7-1l2.3 1 2-3.4zM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7z"/></svg></button></div>
      <div class="air-grid" data-airpage>
        <div class="air-cell"><b>${a.t}°</b><small>温度</small></div>
        <div class="air-cell"><b>${a.h}<span class="u">%</span></b><small>湿度</small></div>
        <div class="air-cell"><b style="color:${a.aqi==='优'?'var(--green)':'var(--orange)'}">${a.aqi}</b><small>空气质量</small></div>
        <div class="air-cell"><b>${a.pm}</b><small>PM2.5 <span class="u">μg/m³</span></small></div>
        <div class="air-cell"><b>${a.tvoc}</b><small>TVOC <span class="u">mg/m³</span></small></div>
        <div class="air-cell"><b>${a.hcho}</b><small>甲醛 <span class="u">mg/m³</span></small></div>
        <div class="air-cell"><b>${a.co2}</b><small>CO₂ <span class="u">ppm</span></small></div>
        <div class="air-cell" style="background:var(--blue);color:#fff"><b>详情</b><small style="color:rgba(255,255,255,.8)">点击查看</small></div>
      </div>
    </div>
    <div class="v2-svc-more" id="v2SvcMore">
    <div class="svc-card" style="background:linear-gradient(140deg,#eafaf0,#f4fdf7)" data-engpage>
      <div class="svc-h"><span class="svc-ic" style="background:var(--green)"><svg width="17" height="17" viewBox="0 0 24 24" fill="#fff"><path d="M13 2 4.5 13.5H11L9.5 22 19 9.5h-6.5z"/></svg></span><h3>能源管家</h3>
        <span class="bd-arrow" style="margin-left:auto">${svgArrow}</span></div>
      <div class="eng-cols">
        <div class="eng-col"><b>18.6<span style="font-size:10px"> 度</span></b><small>今日用电</small></div>
        <div class="eng-col"><b style="color:var(--green)">12.4<span style="font-size:10px"> 度</span></b><small>今日光伏发电</small></div>
        <div class="eng-col"><b style="color:var(--teal)">68<span style="font-size:10px">%</span></b><small>储能电量 6.2 度</small></div>
      </div>
    </div>
    <div class="svc-card" style="background:linear-gradient(140deg,#fff4e8,#fffaf3)">
      <div class="svc-h"><span class="svc-ic" style="background:var(--orange)">${IC.fridge()}</span><h3>营养管家</h3>
        <span class="bd-arrow" style="margin-left:auto" data-foodpage>${svgArrow}</span></div>
      <div class="sec-sub">临期食品 · ${FOODS.filter(f=>f.days<=7).length} 件需尽快食用</div>
      <div class="food-scroll">${expiring}</div>
      <div class="sec-sub" style="margin-top:10px">大暑节气 · 为你推荐</div>
      <div class="food-scroll">${recs}</div>
    </div>
    <div class="svc-card" style="background:linear-gradient(140deg,#e8f6fb,#f2fbfe)" data-waterpage>
      <div class="svc-h"><span class="svc-ic" style="background:#00a8c6">${IC.water()}</span><h3>饮用水</h3>
        <span class="bd-arrow" style="margin-left:auto">${svgArrow}</span></div>
      <div class="water-grid">
        <div class="water-cell"><b>86<span class="u"> L</span></b><small>今日用水</small></div>
        <div class="water-cell"><b>2.4<span class="u"> 吨</span></b><small>本月用水</small></div>
        <div class="water-cell"><b>1.8<span class="u"> L</span></b><small>今日饮水</small></div>
        <div class="water-cell"><b style="color:var(--green)">42</b><small>实时 TDS <span class="u">ppm</span></small><span class="tds-badge" style="color:#0d5c34;background:#b9f2cf">水质优</span></div>
      </div>
      <div style="font-size:10.5px;color:var(--ink2);margin-top:9px">热水设定温度 45°C · 反渗透滤芯寿命剩 3 天</div>
    </div>
    <div class="svc-card" style="background:linear-gradient(140deg,#fdeeee,#fff7f3)" data-ksafe>
      <div class="svc-h"><span class="svc-ic" style="background:#e54545">${KS_SHIELD}</span><h3>厨房安全</h3>
        <span class="slp-lv" style="color:#0d5c34;background:#b9f2cf;margin-left:auto">安全</span>
        <span class="bd-arrow" style="margin-left:6px">${svgArrow}</span></div>
      <div class="sec-sub">燃气 · 水浸 · 灶台实时监测中</div>
      <div class="ks-grid">
        ${KSAFE.map(k=>`<div class="ks-cell"><i style="background:${k.ok?'#34a853':'#e54545'}"></i><span>${k.n}</span><b style="color:${k.ok?'#0d5c34':'#e54545'}">${k.st}</b></div>`).join('')}
      </div>
    </div>
    <div class="svc-card" style="background:linear-gradient(140deg,#f3edff,#faf7ff)" data-wardpage>
      <div class="svc-h"><span class="svc-ic" style="background:var(--purple)"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8"><path d="M12 4 7 7 4 10l3 1.5V20h10v-8.5L20 10 17 7z"/><path d="M12 4c-1.2 1-1.2 2.2 0 3 1.2-.8 1.2-2 0-3z"/></svg></span><h3>私人衣橱</h3>
        <span class="bd-arrow" style="margin-left:auto">${svgArrow}</span></div>
      <div class="ward-flex"><img src="img/c_silk.png">
        <div class="wf-t"><h5>真丝衬衫 · 空气洗护理中</h5>
        <p><span class="cook-anim"></span>剩余 <b id="wardLeft">18:00</b> · 今日 31°C 湿度 82%，真丝衣物建议低温烘干后悬挂除湿</p></div>
      </div>
    </div>
    <div class="svc-card" style="background:linear-gradient(140deg,#e9eaff,#f7f5ff)" data-sleeppage>
      <div class="svc-h"><span class="svc-ic" style="background:#6a5bd8">${SLP_MOON17}</span><h3>睡眠管家</h3>
        <span class="bd-arrow" style="margin-left:auto">${svgArrow}</span></div>
      ${(()=>{const sp=sleepData(0,0),tt=sp.deep+sp.light+sp.rem;return `
      <div class="sec-sub">昨日睡眠 · ${FAMILY[0].n} · 主卧</div>
      <div class="slp-ov">
        <div class="so"><b style="color:#f29900">${sp.score} 分</b><span>睡眠质量 中</span></div>
        <div class="so"><b>${Math.floor(tt/60)} 小时 ${tt%60} 分</b><span>睡眠时长</span></div>
        <div class="so"><b style="color:#f29900">${sp.move} 次</b><span>体动 偏多</span></div>
      </div>`})()}
    </div>
    </div>
    <div class="v2-svc-foot">
      <button class="expand-btn" id="v2SvcToggle">展开全部 7 项 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 9l6 6 6-6"/></svg></button>
      <div class="v2-svc-icons" id="v2SvcIcons">
        <span class="v2-svc-ic" style="background:var(--green)" data-engpage><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4.5 13.5H11L9.5 22 19 9.5h-6.5z"/></svg></span>
        <span class="v2-svc-ic" style="background:var(--orange)" data-foodpage>${IC.fridge()}</span>
        <span class="v2-svc-ic" style="background:#00a8c6" data-waterpage>${IC.water()}</span>
        <span class="v2-svc-ic" style="background:#e54545" data-ksafe>${KS_SHIELD}</span>
        <span class="v2-svc-ic" style="background:var(--purple)" data-wardpage><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 4 7 7 4 10l3 1.5V20h10v-8.5L20 10 17 7z"/><path d="M12 4c-1.2 1-1.2 2.2 0 3 1.2-.8 1.2-2 0-3z"/></svg></span>
        <span class="v2-svc-ic" style="background:#6a5bd8" data-sleeppage>${SLP_MOON17}</span>
      </div>
    </div>
  </div>

  <!-- AI智能服务 -->
  <div class="board">
    <div class="board-h"><h2>AI智能服务</h2><span class="bd-arrow" data-aisvc>全部服务 ${svgArrow}</span></div>
    <div class="svc-card" data-aisvc style="cursor:pointer;background:linear-gradient(140deg,#eef2ff,#f7f9ff)">
      <div class="ai-cat-grid">${AI_CATS.map(c=>{const sv=AI_SERVICES.filter(v=>v.cat===c.n);const on=sv.filter(v=>aiOn(v)).length;
        return `<div class="ai-cat" data-aisvc-cat="${c.n}"><span class="ai-cat-ic" style="background:${c.c}1a">${c.ic}</span><h5>${c.n}</h5><p><b style="color:${on?'var(--green)':'var(--ink3)'}">${on}</b>/${sv.length} 开启</p></div>`}).join('')}</div>
    </div>
  </div>
  <!-- 董明珠店 -->
  <div class="board">
    <div class="board-h"><h2>董明珠店</h2><span class="bd-arrow" id="boardMall">进入商城 ${svgArrow}</span></div>
    ${MALL.map((m,i)=>`<div class="shop-card"><img src="${m.img}"><div class="sc-t"><h5>${m.t}</h5><p>${m.p}</p></div><button class="sc-btn" data-mall="${i}">${m.btn}</button></div>`).join('')}
  </div>`;
}
/* ================= V3 首屏：房间维度 ================= */
const V3IC={
 temp:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#e54545" stroke-width="2" stroke-linecap="round"><path d="M10 4a2 2 0 0 1 4 0v9.3a4.5 4.5 0 1 1-4 0z"/><circle cx="12" cy="17.5" r="1.6" fill="#e54545" stroke="none"/></svg>',
 hum:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" stroke-width="2"><path d="M12 3.5s5.5 6 5.5 10a5.5 5.5 0 0 1-11 0c0-4 5.5-10 5.5-10z"/></svg>',
 aqi:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#34a853" stroke-width="2" stroke-linecap="round"><path d="M5 19c0-7.5 4.5-12.5 13.5-14-1 9-5.5 14-13.5 14z"/><path d="M5 19c2.5-3.5 5.5-6.5 9.5-8.5"/></svg>',
 pm:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7c4dff" stroke-width="2" stroke-linecap="round"><circle cx="7" cy="8" r="2.2"/><circle cx="14" cy="6.5" r="1.6"/><circle cx="17" cy="12" r="2.2"/><circle cx="10" cy="14.5" r="1.5"/><circle cx="7" cy="19" r="1.3"/><circle cx="15" cy="18.5" r="1.7"/></svg>',
 tvoc:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00b8a9" stroke-width="2"><circle cx="8" cy="9" r="3"/><circle cx="16" cy="7" r="2"/><circle cx="15.5" cy="15" r="3.2"/><circle cx="8.5" cy="16.5" r="2"/></svg>',
 hcho:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f29900" stroke-width="2" stroke-linecap="round"><path d="M9 3h6M10 3v5.5L4.5 18a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 8.5V3"/></svg>',
 co2:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2" stroke-linecap="round"><path d="M7 18a4.5 4.5 0 1 1 .8-8.9A5.5 5.5 0 0 1 18.5 11 3.5 3.5 0 0 1 17.5 18z"/></svg>',
 zap:'<svg width="13" height="13" viewBox="0 0 24 24" fill="#e54545"><path d="M13 2 4.5 13.5H11L9.5 22 19 9.5h-6.5z"/></svg>',
 moon:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6a5bd8" stroke-width="2" stroke-linecap="round"><path d="M20 14.5A8.2 8.2 0 0 1 9.5 4 8.2 8.2 0 1 0 20 14.5z"/></svg>',
};
function homeHTMLV3(){
  const aL=airOf('客厅'),aK=airOf('厨房'),aM=airOf('主卧');
  const sp=sleepData(0,0),spt=sp.deep+sp.light+sp.rem;
  const ZAP='<svg width="14" height="14" viewBox="0 0 24 24" fill="#34a853"><path d="M13 2 4.5 13.5H11L9.5 22 19 9.5h-6.5z"/></svg>';
  const MOON='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6a5bd8" stroke-width="1.9" stroke-linecap="round"><path d="M20 14.5A8.2 8.2 0 0 1 9.5 4 8.2 8.2 0 1 0 20 14.5z"/></svg>';
  const who=r=>{const w=ROOMS.find(x=>x.name===r).who;return `<span class="v3-who ${w?'yes':'no'}">${w?'有人':'无人'}</span>`};
  const cell=(v,u,c,ic)=>`<div class="v3-cell"><span class="vrow">${ic?`<span class="cic">${ic}</span>`:''}<b${c?` style="color:${c}"`:''}>${v}</b></span><small>${u}</small></div>`;
  const roomCard=(r,bg,cells,line)=>`
   <div class="v3-room" data-v3room="${r}" style="background:${bg}">
    <div class="r3-h"><span class="r3-ic">${ROOM_IC[r]}</span><h3>${r}</h3>${who(r)}</div>
    <div class="v3-cells">${cells}</div>
    <div class="v3-line">${line}</div>
   </div>`;
  const mseg=(ic,t,c)=>`<span class="m-seg-i"${c?` style="color:${c}"`:''}>${ic}${t}</span>`;
  const TEMP='<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 4a2 2 0 0 1 4 0v9.3a4.5 4.5 0 1 1-4 0z"/><circle cx="12" cy="17.5" r="1.6" fill="currentColor" stroke="none"/></svg>';
  const DEV='<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="7" height="7" rx="1.8"/><rect x="13" y="4" width="7" height="7" rx="1.8"/><rect x="4" y="13" width="7" height="7" rx="1.8"/><rect x="13" y="13" width="7" height="7" rx="1.8"/></svg>';
  const WARN='<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 4 21 20H3z"/><path d="M12 10v4M12 17.2v.3"/></svg>';
  const DROP='<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3.5s5.5 6 5.5 10a5.5 5.5 0 0 1-11 0c0-4 5.5-10 5.5-10z"/></svg>';
  const HEAT='<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3c1 3 4.5 5.5 4.5 9a4.5 4.5 0 0 1-9 0c0-1.8.8-3.1 1.8-4.5.4 1 1 1.7 1.7 2C10.6 7 11 5 12 3z"/></svg>';
  const WASH='<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="3" width="16" height="18" rx="3"/><circle cx="12" cy="13.5" r="5"/></svg>';
  const ZAP2='<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4.5 13.5H11L9.5 22 19 9.5h-6.5z"/></svg>';
  const mini=(r,segs)=>`
   <div class="v3-mini" data-v3room="${r}">
    <span class="m-ic">${ROOM_IC[r]}</span>
    <div style="min-width:0"><h5>${r}</h5><p class="m-seg">${segs}</p></div>
    <span class="arr">${svgArrow}</span>
   </div>`;
  return `
  <div class="search-bar">
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.8-3.8"/></svg>
    <input id="gSearch" placeholder="搜索设备、智能家居服务">
    <span class="mic" id="gMic"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/></svg></span>
  </div>

  <!-- 家庭动态（沿用 V2 合并卡） -->
  ${dynCardHTML()}

  <!-- 房间维度板块 -->
  <div class="board">
    <div class="board-h"><h2>我的房间</h2><span class="bd-arrow" data-devices>全部设备 ${svgArrow}</span></div>
    ${roomCard('客厅','linear-gradient(140deg,#e8f3ff,#f2faff)',
      cell(aL.t+'°','温度',null,V3IC.temp)+cell(aL.h+'%','湿度',null,V3IC.hum)+cell(aL.aqi,'空气质量','#0d5c34',V3IC.aqi)+cell(aL.pm,'PM2.5',null,V3IC.pm),
      `${ZAP}<span>今日 <b>5.2 度</b> · 较昨日 -12%</span>`)}
    ${roomCard('厨房','linear-gradient(140deg,#fff1e6,#fff8f2)',
      cell(aK.t+'°','温度',null,V3IC.temp)+cell(aK.h+'%','湿度',null,V3IC.hum)+cell(aK.aqi,'空气质量','#b26a00',V3IC.aqi)+cell('4 台','工作中','#e54545',V3IC.zap),
      `${IC.fridge('#f29900').replace('width="24" height="24"','width="15" height="15"')}<span><b>${FOODS.length}</b> 种食材 · 临期 <b>${FOODS.filter(f=>f.days<=7).length}</b></span>`)}
    ${roomCard('主卧','linear-gradient(140deg,#f0ebff,#f8f5ff)',
      cell(aM.t+'°','温度',null,V3IC.temp)+cell(aM.h+'%','湿度',null,V3IC.hum)+cell(aM.aqi,'空气质量','#0d5c34',V3IC.aqi)+cell(sp.score+' 分','睡眠','#f29900',V3IC.moon),
      `${MOON}<span><b>${Math.floor(spt/60)} 小时 ${spt%60} 分</b> · 体动偏多 · 22:00 睡眠模式</span>`)}
    <button class="v3-fold-t" id="v3RoomToggle">其他房间 · 5 个 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 9l6 6 6-6"/></svg></button>
    <div class="v3-fold" id="v3RoomMore">
      ${mini('儿童房',mseg(TEMP,'27.0°')+mseg(DEV,'2 台')+mseg(WARN,'待清洗','#f29900'))}
      ${mini('书房',mseg(TEMP,'27.6°')+mseg(ZAP2,'已节能','#0d5c34'))}
      ${mini('餐厅',mseg(TEMP,'27.4°')+mseg(DEV,'待机','#9aa0a6'))}
      ${mini('卫生间',mseg(TEMP,'28.1°')+mseg(DROP,'78%')+mseg(HEAT,'45°C'))}
      ${mini('阳台',mseg(TEMP,'30.2°')+mseg(WASH,'28 分')+mseg(DROP,'86 L'))}
    </div>
  </div>

  <!-- AI智能服务（扁平化） -->
  <div class="board">
    <div class="board-h"><h2>AI智能服务</h2><span class="bd-arrow" data-aisvc>全部服务 ${svgArrow}</span></div>
    <div class="ai-flat" data-aisvc>
      <div class="ai-cat-grid">${AI_CATS.map(c=>{const sv=AI_SERVICES.filter(v=>v.cat===c.n);const on=sv.filter(v=>aiOn(v)).length;
        return `<div class="ai-cat" data-aisvc-cat="${c.n}"><span class="ai-cat-ic">${c.ic}</span><h5>${c.n}</h5><p><b style="color:${on?'var(--green)':'var(--ink3)'}">${on}</b>/${sv.length} 开启</p></div>`}).join('')}</div>
    </div>
  </div>

  <!-- 董明珠店（沿用 V2） -->
  <div class="board">
    <div class="board-h"><h2>董明珠店</h2><span class="bd-arrow" id="boardMall">进入商城 ${svgArrow}</span></div>
    ${MALL.map((m,i)=>`<div class="shop-card"><img src="${m.img}"><div class="sc-t"><h5>${m.t}</h5><p>${m.p}</p></div><button class="sc-btn" data-mall="${i}">${m.btn}</button></div>`).join('')}
  </div>`;
}
function bindHome(){
  if(greeTab==='mall'){bindMall();return}
  $('#gMic').onclick=()=>openClaw();
  $('#gSearch').addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.value.trim()){openClaw(e.target.value.trim())}});
  $$('[data-msgs]').forEach(el=>el.onclick=()=>{const a=el.dataset.act;
   if(a==='sleep')return openSleepPage();
   if(a==='eco')return openLivingPresence();
   if(a==='rice')return openRicePrep();
   openMessages()});
  $$('[data-devices]').forEach(el=>el.onclick=()=>openDevicesPage());
  $$('[data-room]').forEach(el=>el.onclick=()=>openRoomPage(el.dataset.room));
  const rx=$('#roomExpand');if(rx)rx.onclick=()=>openRoomSheet();
  $$('[data-airpage]').forEach(el=>el.onclick=()=>openAirPage());
  const ag=$('#airGear');if(ag)ag.onclick=e=>{e.stopPropagation();openAirRoomSheet()};
  $$('[data-engpage]').forEach(el=>el.onclick=()=>openEnergyPage());
  $$('[data-foodpage]').forEach(el=>el.onclick=()=>openFoodPage());
  $$('[data-waterpage]').forEach(el=>el.onclick=()=>openWaterPage());
  $$('[data-wardpage]').forEach(el=>el.onclick=()=>openWardPage());
  $$('[data-sleeppage]').forEach(el=>el.onclick=()=>openSleepPage());
  $$('[data-ksafe]').forEach(el=>el.onclick=()=>openKitchenSafety());
  $$('[data-aisvc]').forEach(el=>el.onclick=()=>openAIServices());
  $$('[data-aisvc-cat]').forEach(el=>el.onclick=e=>{e.stopPropagation();openAIServices(el.dataset.aisvcCat);});
  const vt=$('#v2SvcToggle');if(vt)vt.onclick=()=>{const m=$('#v2SvcMore'),o=m.classList.toggle('show');
    const ft=vt.closest('.v2-svc-foot');if(ft)ft.classList.toggle('open',o);
    vt.innerHTML=o?`收起系统服务 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 15l-6-6-6 6"/></svg>`:`展开全部 7 项 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 9l6 6 6-6"/></svg>`;};
  const tb=$('#v2TodoBtn');if(tb)tb.onclick=e=>{e.stopPropagation();goTodo(V2_TODOS[v2TodoCur]||V2_TODOS[0])};
  let dynTab='svc';
  const dseg=$('#dynSeg');
  if(dseg)dseg.querySelectorAll('button').forEach(b=>b.onclick=e=>{e.stopPropagation();dynTab=b.dataset.dtab;
    dseg.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));
    dseg.closest('.v2-log').querySelectorAll('.dyn-pane').forEach(pn=>pn.hidden=pn.dataset.dpane!==dynTab);});
  const dh=$('#dynHead');if(dh)dh.onclick=()=>openDynamics(dynTab);
  $$('[data-v3room]').forEach(el=>el.onclick=()=>openRoomV3(el.dataset.v3room));
  const v3f=$('#v3RoomToggle');if(v3f)v3f.onclick=()=>{const m=$('#v3RoomMore');const o=m.classList.toggle('show');
    v3f.innerHTML=o?`收起其他房间 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 15l-6-6-6 6"/></svg>`:`其他房间 · 5 个 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 9l6 6 6-6"/></svg>`;};
  startV2Feeds();
  const hs=$('.hscroll');if(hs)dragScroll(hs);
  $('#boardMall').onclick=()=>{greeTab='mall';renderGree()};
  $$('[data-mall]').forEach(b=>b.onclick=()=>openWebView(MALL[+b.dataset.mall].url,'董明珠店'));
}
/* 房间选择浮窗 */
function openRoomSheet(){
  const m=openModal(`<h3 style="font-size:15px;font-weight:700;margin-bottom:12px">全部房间</h3>
   <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:9px;max-height:46vh;overflow-y:auto">
   ${ROOMS.map(r=>{const ds=roomDevs(r.name);const run=ds.filter(d=>d.on).length;
    return `<div class="room-cell" data-rs="${r.name}" style="display:flex;align-items:center;gap:10px;text-align:left;padding:12px">
      <div class="rc-ic" style="margin:0">${ROOM_IC[r.name]||ROOM_IC.客厅}</div>
      <div><h4>${r.name}</h4><span class="rc-who ${r.who?'yes':'no'}">${r.who?'有人':'无人'}</span>
      <p>${ds.length} 台设备 · ${run} 运行</p></div></div>`}).join('')}</div>`);
  m.querySelectorAll('[data-rs]').forEach(el=>el.onclick=()=>{closeModal(m);openRoomPage(el.dataset.rs)});
}
/* 空气管家默认房间设置浮窗 */
function openAirRoomSheet(){
  const names=['全屋',...ROOMS.map(r=>r.name)];
  const m=openModal(`<h3 style="font-size:15px;font-weight:700;margin-bottom:4px">看板默认展示</h3>
   <p style="font-size:11px;color:var(--ink3);margin-bottom:12px">选择「空气管家」卡片默认展示的房间</p>
   ${names.map(n=>`<div class="kv" data-ar="${n}" style="cursor:pointer"><span>${n}</span><b style="color:${S.airRoom===n?'var(--blue)':'var(--ink3)'}">${S.airRoom===n?'✓ 当前':''}</b></div>`).join('')}`);
  m.querySelectorAll('[data-ar]').forEach(el=>el.onclick=()=>{S.airRoom=el.dataset.ar;closeModal(m);renderGree();toast(`空气管家已切换为「${S.airRoom}」`)});
}
