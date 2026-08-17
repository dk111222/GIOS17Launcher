
/* ================= 空调控制页（格力+ 风管机） ================= */
const AC_FANS=['低速','中速','高速','超强风'];
const AC_MODE_SVG={
 '制冷':'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4a90e2" stroke-width="1.6" stroke-linecap="round"><path d="M12 2.5v19M12 2.5 9.8 4.7M12 2.5l2.2 2.2M12 21.5l-2.2-2.2M12 21.5l2.2-2.2M3.7 7.2l16.6 9.6M3.7 7.2l3.1.5M3.7 7.2l.5 3.1M20.3 16.8l-3.1-.5M20.3 16.8l-.5-3.1M3.7 16.8l16.6-9.6M3.7 16.8l.5-3.1M3.7 16.8l3.1-.5M20.3 7.2l-3.1.5M20.3 7.2l-.5 3.1"/></svg>',
 '制热':'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e57145" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2.8v2.6M12 18.6v2.6M2.8 12h2.6M18.6 12h2.6M5.2 5.2l1.8 1.8M17 17l1.8 1.8M18.8 5.2 17 7M7 17l-1.8 1.8"/></svg>',
 '除湿':'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00a8c6" stroke-width="1.7" stroke-linecap="round"><path d="M12 3.5s5.6 6.2 5.6 10.2a5.6 5.6 0 0 1-11.2 0C6.4 9.7 12 3.5 12 3.5z"/><path d="M9.6 13.6a2.6 2.6 0 0 0 2 2.6"/></svg>',
 '送风':'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34a853" stroke-width="1.7" stroke-linecap="round"><path d="M3 8.5h8.5a2.75 2.75 0 1 0-2.75-2.75M3 12.5h13.5a2.75 2.75 0 1 1-2.75 2.75M3 16.5h6.5"/></svg>',
 '自动':'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c4dff" stroke-width="1.8" stroke-linecap="round"><path d="M7 19 12 4.5 17 19M8.9 13.8h6.2"/></svg>'};
const AC_FEATS=[
 {n:'上下定格',crn:1,svg:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M5 3.5h14M5 20.5h14M12 7v3.5M12 7l-2 2M12 7l2 2M12 17v-3.5M12 17l-2-2M12 17l2-2"/></svg>'},
 {n:'恒暖除霜',dis:1,svg:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="9" cy="9" r="3.2"/><path d="M9 3.5v1.8M9 12.8v1.7M3.5 9h1.8M12.7 9h1.8M5.1 5.1l1.3 1.3M12.9 5.1l-1.3 1.3"/><path d="M14.5 15.5h6M14.5 19h6M17.5 13v9" stroke-width="1.4"/></svg>'},
 {n:'温度限制',crn:1,svg:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M8.5 4.5a2 2 0 0 1 4 0v7.6a4.3 4.3 0 1 1-4 0z"/><path d="M10.5 9v6.5"/><circle cx="10.5" cy="15.5" r="1.6" fill="currentColor" stroke="none"/><path d="M16.5 5l2-2 2 2M18.5 3v5.5"/></svg>'},
 {n:'上下扫风',crn:1,svg:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M8 3.5v17M8 3.5 5.8 5.7M8 3.5l2.2 2.2M16 20.5v-17M16 20.5l-2.2-2.2M16 20.5l2.2-2.2"/></svg>'},
 {n:'健康',svg:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M5 19c0-7.5 4.5-12.5 13.5-14-1 9-5.5 14-13.5 14z"/><path d="M5 19c2.5-3.5 5.5-6.5 9.5-8.5"/></svg>'},
 {n:'左右扫风',svg:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3.5 8h17M3.5 8l2.2-2.2M3.5 8l2.2 2.2M20.5 16h-17M20.5 16l-2.2-2.2M20.5 16l-2.2 2.2"/></svg>'},
 {n:'内机防霉',svg:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 3l7 2.6v5.2c0 4.4-2.9 7.9-7 9.2-4.1-1.3-7-4.8-7-9.2V5.6z"/><path d="M8.8 11.8l2.2 2.2 4.2-4.4"/></svg>'},
 {n:'可控除湿',dis:1,svg:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 5.5s4.2 4.7 4.2 7.7a4.2 4.2 0 0 1-8.4 0c0-3 4.2-7.7 4.2-7.7z"/><path d="M17.5 3.5a9 9 0 0 1 3.2 5.5M6.5 20.5a9 9 0 0 1-3.2-5.5"/></svg>'}];
const AC_SVC_SVG={
 cloud:'<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4a90e2" stroke-width="1.5"><path d="M7 18.5a4.5 4.5 0 0 1-.4-9A6 6 0 0 1 18.3 10 3.8 3.8 0 0 1 17.5 18.5z"/><text x="12" y="15.8" font-size="6" text-anchor="middle" fill="#4a90e2" stroke="none" font-weight="700">AI</text></svg>',
 moon:'<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="1.6" stroke-linecap="round"><path d="M20 14.5A8.2 8.2 0 0 1 9.5 4 8.2 8.2 0 1 0 20 14.5z"/><path d="M16.6 4.6l.5 1.4 1.4.5-1.4.5-.5 1.4-.5-1.4-1.4-.5 1.4-.5z" fill="#9aa0a6" stroke="none"/></svg>',
 mute:'<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="1.6" stroke-linecap="round"><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z"/><path d="M15.5 9.5l5 5M20.5 9.5l-5 5"/></svg>',
 phone:'<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="1.6"><rect x="7" y="2.8" width="10" height="18.4" rx="2.4"/><path d="M10.5 18.6h3" stroke-linecap="round"/></svg>'};
const AC_HEALTH_SVG={
 folder:'<svg width="46" height="46" viewBox="0 0 48 48"><path d="M6 12a4 4 0 0 1 4-4h10l4 5h14a4 4 0 0 1 4 4v4H6z" fill="#c98ae0"/><path d="M4 20h40v16a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" fill="#e6b8f5"/><rect x="17" y="26" width="14" height="3.2" rx="1.6" fill="#c98ae0"/></svg>',
 clean:'<svg width="46" height="46" viewBox="0 0 48 48"><rect x="17" y="17" width="14" height="24" rx="5" fill="#a9cdf5"/><path d="M20 17v-4.5h8V17" fill="#7fb3ec"/><path d="M22.5 12.5V8h3v4.5" fill="#4a90e2"/><path d="M34 9h7M35.5 5.5 39 7.5M35.5 12.5 39 10.5" stroke="#a9cdf5" stroke-width="2" stroke-linecap="round"/><rect x="21" y="23" width="6" height="10" rx="3" fill="#d6e7fb"/></svg>',
 filter:'<svg width="46" height="46" viewBox="0 0 48 48"><circle cx="24" cy="24" r="17" fill="#d9f5e6"/><path d="M15.5 24.5l6 6 11.5-12.5" stroke="#34a853" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'};
const AC_MISC_SVG={
 dots:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="12" cy="19" r="1.8"/></svg>',
 clockSm:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.4l3.4 2"/></svg>',
 power:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 3v8"/><path d="M6.3 6.5a8 8 0 1 0 11.4 0"/></svg>',
 clockLg:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v4.8l3.2 1.9"/></svg>'};

function openAcCtl(d){return openAcnCtl(d)}

/* ================= 空调控制页 V2（清凉蓝系 · 智慧空气管家） ================= */
const ACN_INFO='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c9cc4" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 10.8V17M12 7.2v.2"/></svg>';
const ACN_CHECK='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12.5l5 5L19.5 7"/></svg>';
const ACN_STAGES=[{n:'清醒',c:'#fbbf24',m:22},{n:'浅睡',c:'#60a5fa',m:244},{n:'深睡',c:'#7c3aed',m:102},{n:'REM',c:'#2dd4bf',m:88}];
const ACN_GK_TABS=[['home','首页'],['sleep','睡眠'],['cozy','舒适'],['act','活动'],['air','空气'],['eco','节能'],['quiet','静音']];
function acnRing(score,color,track){
  const r=44,c=2*Math.PI*r;
  return `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="${r}" fill="none" stroke="${track}" stroke-width="9"/>
   <circle cx="50" cy="50" r="${r}" fill="none" stroke="${color}" stroke-width="9" stroke-linecap="round" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${(c*(1-score/100)).toFixed(1)}" transform="rotate(-90 50 50)"/></svg>`;
}
function acnSeries(key,n,min,max,smooth){
  const r=seeded('acn_'+key);const a=[];let v=min+(max-min)*r();
  for(let i=0;i<n;i++){v+=(r()-.5)*(max-min)*(smooth||.18);v=Math.max(min,Math.min(max,v));a.push(v);}
  return a;
}
function acnChart(series,opts={}){
  const w=opts.w||320,h=opts.h||140,pad=opts.pad||16;
  const n=series[0].data.length;
  const X=i=>pad+i*(w-2*pad)/(n-1);
  let band='';
  if(opts.band){const s0=series[0];
    const Yb=v=>h-pad-(v-s0.min)/(s0.max-s0.min)*(h-2*pad);
    const y1=Yb(opts.band[1]),y2=Yb(opts.band[0]);
    band=`<rect x="${pad}" y="${y1.toFixed(1)}" width="${(w-2*pad).toFixed(1)}" height="${(y2-y1).toFixed(1)}" fill="${opts.bandColor||'rgba(96,165,250,.12)'}" rx="4"/>`+
     (opts.bandLabel?`<text x="${w-pad-5}" y="${(y1+11).toFixed(1)}" font-size="8.5" fill="#7c9cc4" text-anchor="end">${opts.bandLabel}</text>`:'');}
  const lines=series.map(s=>{
    const Y=v=>h-pad-(v-s.min)/(s.max-s.min)*(h-2*pad);
    const pts=s.data.map((v,i)=>X(i).toFixed(1)+','+Y(v).toFixed(1)).join(' ');
    const area=s.fill?`<polygon points="${pad},${h-pad} ${pts} ${w-pad},${h-pad}" fill="${s.fill}"/>`:'';
    return area+`<polyline points="${pts}" fill="none" stroke="${s.c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  }).join('');
  return `<svg class="acn-chart" viewBox="0 0 ${w} ${h}">${band}${lines}</svg>`;
}
function acnBars24(key){
  const r=seeded('acnb_'+key);const w=320,h=110,bw=(w-20)/24;let bars='';
  for(let i=0;i<24;i++){
    let v=r();
    if(i>=1&&i<=5)v*=.22;else if(i>=7&&i<=9)v*=.85;
    else if(i>=12&&i<=14)v*=.7;else if(i>=18&&i<=20)v=.78+r()*.22;
    const bh=Math.max(4,v*(h-24));
    const x=10+i*bw+2,y=h-bh;
    const hot=(i>=18&&i<=20);
    bars+=`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(bw-4).toFixed(1)}" height="${bh.toFixed(1)}" rx="3" fill="${hot?'#1a73e8':'#bfd8f6'}"/>`;
  }
  return `<svg class="acn-chart" viewBox="0 0 ${w} ${h}">${bars}</svg>
   <div class="acn-axis"><span>0时</span><span>6时</span><span>12时</span><span>18时</span><span>24时</span></div>`;
}
function acnTrackSVG(key){
  const r=seeded('acntk_'+key);const w=320,h=200,cx=w/2,cy=h/2;let pts='';
  for(let i=0;i<26;i++){
    const a=r()*Math.PI*2,dd=18+r()*72;
    const x=Math.max(16,Math.min(w-16,cx+Math.cos(a)*dd*1.5));
    const y=Math.max(16,Math.min(h-16,cy+Math.sin(a)*dd*.72));
    pts+=`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="3.5" fill="rgba(26,115,232,.55)"/>`;
  }
  return `<svg class="acn-chart" viewBox="0 0 ${w} ${h}" style="background:rgba(239,246,255,.5);border-radius:14px">
   <line x1="${cx}" y1="12" x2="${cx}" y2="${h-12}" stroke="#c7d8ec" stroke-dasharray="3 4"/>
   <line x1="16" y1="${cy}" x2="${w-16}" y2="${cy}" stroke="#c7d8ec" stroke-dasharray="3 4"/>
   <rect x="${cx-9}" y="${cy-9}" width="18" height="18" rx="5" fill="#1a73e8"/>
   <text x="${cx+14}" y="${cy+4}" font-size="9" fill="#5f7285">空调柜机</text>${pts}</svg>`;
}
function acnRec(ic,bg,fg,t,p,tm,done){
  return `<div class="acn-rec"><span class="acn-rec-ic" style="background:${bg};color:${fg}">${ic}</span>
   <div style="flex:1;min-width:0"><b>${t}</b><p>${p}</p></div>
   ${done?'<span class="done">已完成</span>':`<span class="tm">${tm}</span>`}</div>`;
}
function acnStageBar(){
  return `<div class="acn-stage">${ACN_STAGES.map(s=>`<i style="width:${(s.m/456*100).toFixed(1)}%;background:${s.c}"></i>`).join('')}</div>`;
}
function acnStageLegend(){
  const fm=m=>m<60?m+'分':Math.floor(m/60)+':'+String(m%60).padStart(2,'0');
  return `<div class="acn-legend">${ACN_STAGES.map(s=>`<span><i style="background:${s.c}"></i>${s.n} ${fm(s.m)}</span>`).join('')}</div>`;
}
/* ---------- 快捷数据迷你图：折线 / 柱形 / 声波 ---------- */
function acnSpark(key,c,w=76,h=34){
  const data=acnSeries(key,16,.15,.85,.3);
  const pts=data.map((v,i)=>(2+i*(w-4)/15).toFixed(1)+','+(h-4-v*(h-9)).toFixed(1)).join(' ');
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><polyline points="${pts}" fill="none" stroke="${c}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}
function acnSparkBars(key,c,n=9,w=76,h=34){
  const r=seeded('acnb2_'+key);let s='';
  const bw=(w-2*(n-1))/n;
  for(let i=0;i<n;i++){
    const v=.22+r()*.78,bh=v*(h-7);
    s+=`<rect x="${(i*(bw+2)).toFixed(1)}" y="${(h-2-bh).toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="2" fill="${c}"/>`;
  }
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${s}</svg>`;
}
function acnSparkWave(key,c,n=13,w=96,h=34){
  const r=seeded('acnw_'+key);let s='';
  const bw=4,gap=(w-n*bw)/(n-1);
  for(let i=0;i<n;i++){
    const mid=1-Math.abs(i-(n-1)/2)/((n-1)/2);
    const bh=Math.min(h-8,(.18+r()*.45+mid*.35)*(h-8));
    s+=`<rect x="${(i*(bw+gap)).toFixed(1)}" y="${((h-bh)/2).toFixed(1)}" width="${bw}" height="${bh.toFixed(1)}" rx="2" fill="${c}"/>`;
  }
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${s}</svg>`;
}
/* ---------- 管家 tab：首页 ---------- */
function acnGkHome(d){
  const qd=[
   {go:'cozy',ic:'温',ibg:'#dbeafe',ifg:'#1a73e8',t:'舒适达标',v:'96',u:'%',cap:'全天温湿度稳定',chart:acnSpark('qd1','#1a73e8')},
   {go:'air',ic:'氧',ibg:'#ccfbf1',ifg:'#0d9488',t:'客厅空气',v:'优',u:'94分',cap:'自动联动5次',chart:acnSpark('qd2','#14b8a6')},
   {go:'act',ic:'动',ibg:'#ede9fe',ifg:'#7c3aed',t:'家庭活动',v:'2.8',u:'小时',cap:'08:12 今日打卡',chart:acnSparkBars('qd3','#8b5cf6')},
   {go:'eco',ic:'省',ibg:'#dcfce7',ifg:'#16a34a',t:'AI节能',v:'0.5',u:'度',cap:'预计节省1.3元',chart:acnSpark('qd4','#22c55e')},
   {go:'quiet',ic:'静',ibg:'#e8eef5',ifg:'#52708e',t:'卧室静音',v:'19',u:'dB(A)',cap:'标定均值 · 室内近3分钟29dB(A)',chart:acnSparkWave('qd5','#3b82f6'),wide:1}];
  const qdHTML=`<div class="acn-qd-grid">${qd.map(c=>`
   <div class="acn-qd ${c.wide?'wide':''}" data-go="${c.go}">
    <div class="acn-qd-h"><span class="acn-qd-ic" style="background:${c.ibg};color:${c.ifg}">${c.ic}</span><b>${c.t}</b><span class="acn-qd-go">›</span></div>
    <div class="acn-qd-m"><div class="acn-qd-v"><b>${c.v}</b><span>${c.u}</span></div>${c.chart}</div>
    <p>${c.cap}</p>
   </div>`).join('')}</div>`;
  return `
  <div class="acn-gk-hero">
   <div class="t1">7月29日 · 周三</div>
   <div class="t2">家中空气舒适，主动服务运行良好</div>
   <p>今日已完成 12 次主动调节 · 累计省电 0.5 度</p>
   <div class="acn-gk-ring">${acnRing(94,'#fff','rgba(255,255,255,.3)')}<b>94</b><span>综合舒适</span></div>
  </div>
  <section class="acn-card">
   <div class="acn-card-t"><b>昨夜睡眠摘要</b><span class="lk" data-go="sleep">查看 ›</span></div>
   <div style="display:flex;align-items:center;gap:14px">
    <div style="text-align:center;flex:0 0 auto"><b style="font-size:30px;font-weight:700;color:#4f46e5">92</b><p style="font-size:10px;color:#9aa8b5;margin-top:2px">睡眠分</p></div>
    <div style="flex:1;min-width:0">
     <div style="display:flex;gap:14px;font-size:11px;color:#5f7285"><span>时长 <b style="color:#1c2733">7时36分</b></span><span>深睡 <b style="color:#1c2733">1时42分</b></span><span>调节 <b style="color:#1c2733">8次</b></span></div>
     ${acnStageBar()}
    </div>
   </div>
  </section>
  ${qdHTML}
  <section class="acn-card" style="padding-top:6px;padding-bottom:6px">
   <div class="acn-card-t" style="margin-bottom:0;padding-top:8px"><b>今日主动服务</b><span>4 项</span></div>
   ${acnRec('醒','#dbeafe','#1557b0','晨起打卡','检测到您已起床，温度回升至 26°C','08:12')}
   ${acnRec('节','#fef3c7','#b45309','无人节能','客厅无人超 30 分钟，设定温度上调 1°C','10:55')}
   ${acnRec('氧','#ccfbf1','#0d9488','低噪新风','CO₂ 升高至 950ppm，低噪音引入新风','14:20')}
   ${acnRec('冷','#dbeafe','#1557b0','人数增加','检测到 3 人活动，提升制冷量','18:36')}
  </section>`;
}
/* ---------- 管家 tab：睡眠 ---------- */
function acnGkSleep(d){
  const ts=acnSeries('slpT'+d.id,24,23.2,26.2),hs=acnSeries('slpH'+d.id,24,48,66);
  return `
  <div class="acn-gk-hero indigo">
   <div class="t1">昨夜睡眠</div>
   <div class="t2">深度睡眠充足，晨起状态好</div>
   <p>22:40 - 06:38 · 睡眠效率 93%</p>
   <div class="acn-gk-ring">${acnRing(92,'#fff','rgba(255,255,255,.3)')}<b>92</b><span>睡眠分</span></div>
   <div class="acn-gk-stats"><div><b>7h36m</b><span>总时长</span></div><div><b>1h42m</b><span>深睡</span></div><div><b>8次</b><span>夜间调节</span></div></div>
  </div>
  <section class="acn-card">
   <div class="acn-card-t"><b>睡眠阶段</b><span>22:40 - 06:38</span></div>
   ${acnStageBar()}${acnStageLegend()}
  </section>
  <section class="acn-card">
   <div class="acn-card-t"><b>睡眠环境变化</b><span>舒适区 23.5 - 24.5°C</span></div>
   ${acnChart([{data:ts,c:'#1a73e8',min:22,max:28,fill:'rgba(26,115,232,.07)'},{data:hs,c:'#f59e0b',min:40,max:75}],{band:[23.5,24.5],bandLabel:'舒适区'})}
   <div class="acn-legend"><span><i style="background:#1a73e8"></i>室温 °C</span><span><i style="background:#f59e0b"></i>湿度 %</span></div>
  </section>
  <section class="acn-card" style="padding-top:6px;padding-bottom:6px">
   <div class="acn-card-t" style="margin-bottom:0;padding-top:8px"><b>夜间调节记录</b><span>4 条</span></div>
   ${acnRec('眠','#ede9fe','#6d28d9','助眠模式','入睡前温度缓降至 25°C，风速调低','22:40')}
   ${acnRec('风','#dbeafe','#1557b0','入睡降风','检测到入睡，风速降至静音档','23:15')}
   ${acnRec('湿','#ccfbf1','#0d9488','低扰除湿','湿度 65% → 55%，低噪音除湿 20 分钟','03:25')}
   ${acnRec('醒','#fef3c7','#b45309','晨起渐醒','温度缓升、风量渐增，柔和唤醒','06:30')}
  </section>
  <div class="acn-note">${ACN_INFO}<span>睡眠数据由空调运行状态与环境传感器融合估算，仅用于舒适调节参考，不作为医疗诊断依据。</span></div>`;
}
/* ---------- 管家 tab：舒适 ---------- */
function acnGkCozy(d){
  const ts=acnSeries('czyT'+d.id,24,23.4,26.4),hs=acnSeries('czyH'+d.id,24,50,64);
  return `
  <div class="acn-kpis c2">
   <div class="acn-kpi"><b>96%</b><span>恒温达标</span></div>
   <div class="acn-kpi"><b>91%</b><span>恒湿达标</span></div>
   <div class="acn-kpi"><b>±0.8°C</b><span>最大波动</span></div>
   <div class="acn-kpi"><b>12次</b><span>今日调节</span></div>
  </div>
  <section class="acn-card">
   <div class="acn-card-t"><b>24 小时温湿度曲线</b><span>舒适区 23.5 - 24.5°C</span></div>
   ${acnChart([{data:ts,c:'#1a73e8',min:22,max:28,fill:'rgba(26,115,232,.07)'},{data:hs,c:'#f59e0b',min:40,max:75}],{band:[23.5,24.5],bandLabel:'舒适区'})}
   <div class="acn-legend"><span><i style="background:#1a73e8"></i>室温 °C</span><span><i style="background:#f59e0b"></i>湿度 %</span></div>
  </section>
  <section class="acn-card" style="padding-top:6px;padding-bottom:6px">
   <div class="acn-card-t" style="margin-bottom:0;padding-top:8px"><b>舒适调节记录</b><span>3 条</span></div>
   ${acnRec('冷','#dbeafe','#1557b0','人数增加','检测到活动人数增加，提升制冷量','18:36')}
   ${acnRec('湿','#ccfbf1','#0d9488','湿度偏高','湿度升至 62%，开启舒适除湿','15:10')}
   ${acnRec('风','#dbeafe','#1557b0','午后高温','室温逼近 26°C，自动加大风量','13:20')}
  </section>`;
}
/* ---------- 管家 tab：活动 ---------- */
function acnGkAct(d){
  const sim=d.gk.actSim,view=d.gk.actView||'trend';
  const hero=`<div class="acn-gk-hero green">
   <div class="t1">毫米波感知 · ${d.room}</div>
   <div class="t2 wide">${sim?'检测到 1 人活动':'等待首次活动检测'}</div>
   <p class="wide">${sim?'当前'+d.room+'有人 · 活动轨迹持续记录中':'毫米波传感器待命中，检测到活动后自动开始记录'}</p>
   <button class="acn-gk-btn" id="acnActSim">${sim?'模拟人员离开':'模拟人员进入'}</button>
  </div>`;
  const seg=`<div class="acn-seg" id="acnActSeg" style="margin-top:12px">
   <button class="${view==='trend'?'on':''}" data-av="trend">活动趋势</button>
   <button class="${view==='track'?'on':''}" data-av="track">相对轨迹</button></div>`;
  if(view==='track'){
    return hero+seg+`
    <section class="acn-card">
     <div class="acn-card-t"><b>相对位置轨迹</b><span>26 条</span></div>
     ${acnTrackSVG('act'+d.id)}
     <div class="acn-legend"><span><i style="background:#1a73e8"></i>活动轨迹点</span><span><i style="background:#c7d8ec"></i>参考坐标轴</span></div>
    </section>
    <div class="acn-note">${ACN_INFO}<span>轨迹以空调柜机为原点记录相对位置，仅作参考；不采集、不存储任何影像信息。</span></div>`;
  }
  return hero+seg+`
  <div class="acn-kpis c2">
   <div class="acn-kpi"><b>2.8h</b><span>今日活动时长</span></div>
   <div class="acn-kpi"><b>07:42</b><span>首次活动</span></div>
   <div class="acn-kpi"><b>18-20时</b><span>最活跃时段</span></div>
   <div class="acn-kpi"><b>3.2h</b><span>最长无人</span></div>
  </div>
  <section class="acn-card">
   <div class="acn-card-t"><b>24 小时活动分布</b><span>高于近 7 日 8%</span></div>
   ${acnBars24('act'+d.id)}
  </section>
  <section class="acn-card">
   <div class="acn-card-t"><b>近 7 日打卡</b><span>已连续 12 天</span></div>
   <div class="acn-checks">${[['四','23'],['五','24'],['六','25'],['日','26'],['一','27'],['二','28'],['三','29']].map(x=>`<div class="acn-check"><i>${ACN_CHECK}</i><span>周${x[0]}</span><b>7/${x[1]}</b></div>`).join('')}</div>
  </section>`;
}
/* ---------- 管家 tab：空气 ---------- */
function acnGkAir(d){
  const cs=acnSeries('co2'+d.id,24,560,980),ps=acnSeries('pm'+d.id,24,8,32);
  return `
  <div class="acn-gk-hero teal">
   <div class="t1">当前空气 · ${d.room}</div>
   <div class="t2">空气优，清新舒适</div>
   <p>今日已主动联动调节 5 次</p>
   <div class="acn-gk-ring">${acnRing(94,'#fff','rgba(255,255,255,.3)')}<b>94</b><span>空气分</span></div>
   <div class="acn-gk-stats"><div><b>720</b><span>CO₂ ppm</span></div><div><b>12</b><span>PM2.5 μg/m³</span></div><div><b>54%</b><span>湿度</span></div><div><b>5次</b><span>联动</span></div></div>
  </div>
  <section class="acn-card">
   <div class="acn-card-t"><b>24 小时空气变化</b><span>CO₂ 舒适 ≤800ppm</span></div>
   ${acnChart([{data:cs,c:'#0d9488',min:400,max:1100,fill:'rgba(13,148,136,.07)'},{data:ps,c:'#f59e0b',min:0,max:50}],{band:[400,800],bandColor:'rgba(45,212,191,.12)',bandLabel:'CO₂ 舒适范围'})}
   <div class="acn-legend"><span><i style="background:#0d9488"></i>CO₂ ppm</span><span><i style="background:#f59e0b"></i>PM2.5 μg/m³</span></div>
   <div class="acn-event"><span class="acn-rec-ic" style="background:#ccfbf1;color:#0d9488">氧</span><div><b>14:20 CO₂ 升至 950ppm，自动开启新风</b><p>低噪音引入新风，18 分钟后降回 720ppm</p></div></div>
  </section>
  <section class="acn-card" style="padding-top:6px;padding-bottom:6px">
   <div class="acn-card-t" style="margin-bottom:0;padding-top:8px"><b>异常处理记录</b><span>2 条</span></div>
   ${acnRec('氧','#ccfbf1','#0d9488','CO₂ 偏高','950ppm → 720ppm，新风换气 18 分钟','14:20')}
   ${acnRec('尘','#fef3c7','#b45309','PM2.5 短时升高','开窗导致，联动净化 16 分钟恢复','16:06')}
  </section>
  <section class="acn-card" style="padding-top:6px;padding-bottom:6px">
   <div class="acn-card-t" style="margin-bottom:0;padding-top:8px"><b>协同控制记录</b><span>3 条</span></div>
   ${acnRec('新','#ccfbf1','#0d9488','新风换气','14:20 - 14:38 · 低噪音档位','',true)}
   ${acnRec('净','#dbeafe','#1557b0','联动空气净化','16:06 - 16:22 · 与空气净化器协同','',true)}
   ${acnRec('湿','#dbeafe','#1557b0','自动除湿','18:40 - 19:05 · 湿度 62% → 54%','',true)}
  </section>
  <div class="acn-note">${ACN_INFO}<span>仅展示已接入传感器可检测的指标，缺失指标不显示，不虚构数据。</span></div>`;
}
/* ---------- 管家 tab：节能 ---------- */
function acnGkEco(d){
  const src=[['精准控温',0.18],['无人分级运行',0.16],['温度优化',0.09],['低负荷维持',0.07]];
  return `
  <div class="acn-gk-hero green">
   <div class="t1">AI 节能 · 今日</div>
   <div class="t2 wide">今日省电 0.5 度</div>
   <p class="wide">较基准能耗降低 18% · 约节省 ¥1.3</p>
   <div class="acn-gk-stats"><div><b>4.2度</b><span>实际用电</span></div><div><b>5.1度</b><span>基准能耗</span></div><div><b>6.5h</b><span>运行时长</span></div></div>
  </div>
  <section class="acn-card">
   <div class="acn-card-t"><b>用电对比</b><span>今日</span></div>
   <div class="acn-vs">
    <div class="va"><b>4.2<small style="font-size:11px;font-weight:500"> 度</small></b><span>实际用电 · 运行 6.5h</span><small>AI 主动节能策略运行中</small></div>
    <div class="vb"><b>5.1<small style="font-size:11px;font-weight:500"> 度</small></b><span>基准能耗</span><small>同户型近 30 天相同工况均值</small></div>
   </div>
  </section>
  <section class="acn-card">
   <div class="acn-card-t"><b>省电来源分解</b><span>合计 0.50 度</span></div>
   ${src.map(s=>`<div class="acn-src"><span>${s[0]}</span><div class="bar"><i style="width:${(s[1]/0.18*100).toFixed(0)}%"></i></div><b>${s[1].toFixed(2)}度</b></div>`).join('')}
  </section>
  <div class="acn-note">${ACN_INFO}<span>基准能耗为同户型近 30 天相同工况（气温、运行时长）下的平均用电，节能数据仅供参考。</span></div>`;
}
/* ---------- 管家 tab：静音 ---------- */
function acnGkQuiet(d){
  const as=acnSeries('dbA'+d.id,24,16,26),es=acnSeries('dbE'+d.id,24,26,36);
  return `
  <div class="acn-gk-hero violet">
   <div class="t1">静音守护 · ${d.room}</div>
   <div class="t2 wide">19 dB(A)</div>
   <p class="wide">当前运行噪声 · 接近图书馆环境</p>
   <div class="acn-gk-stats"><div><b>19</b><span>运行均值 dB(A)</span></div><div><b>6.5h</b><span>静音时长</span></div><div><b>29</b><span>环境声 dB(A)</span></div><div><b>16</b><span>最低 dB(A)</span></div></div>
  </div>
  <div class="acn-kpis c2">
   <div class="acn-kpi"><b>3次</b><span>今日噪声波动</span></div>
   <div class="acn-kpi"><b>5次</b><span>静音调节</span></div>
  </div>
  <section class="acn-card">
   <div class="acn-card-t"><b>24 小时噪声趋势</b><span>安静参考 ≤25dB</span></div>
   ${acnChart([{data:as,c:'#6d28d9',min:10,max:40,fill:'rgba(109,40,217,.06)'},{data:es,c:'#94a3b8',min:10,max:40}],{band:[10,25],bandColor:'rgba(167,139,250,.12)',bandLabel:'安静参考 ≤25dB(A)'})}
   <div class="acn-legend"><span><i style="background:#6d28d9"></i>空调运行声</span><span><i style="background:#94a3b8"></i>环境背景声</span></div>
  </section>
  <section class="acn-card" style="padding-top:6px;padding-bottom:6px">
   <div class="acn-card-t" style="margin-bottom:0;padding-top:8px"><b>静音调节记录</b><span>4 条</span></div>
   ${acnRec('静','#ede9fe','#6d28d9','进入助眠时段','压缩机降频，风量下调一档','22:40')}
   ${acnRec('眠','#ede9fe','#6d28d9','入睡降风','检测到入睡，风速降至静音档','23:15')}
   ${acnRec('湿','#ccfbf1','#0d9488','低扰除湿','低速除湿 20 分钟，≤20dB(A)','03:25')}
   ${acnRec('醒','#fef3c7','#b45309','晨起恢复','渐醒结束后恢复正常风量','06:30')}
  </section>
  <section class="acn-card">
   <div class="acn-card-t"><b>声音来源区分</b><span>双通道采集</span></div>
   <div class="acn-vs">
    <div class="va"><b style="font-size:14px">机身麦克风</b><span>16 - 22 dB(A)</span><small>采集压缩机与风道运行声</small></div>
    <div class="vb"><b style="font-size:14px">毫米波环境采样</b><span>24 - 35 dB(A)</span><small>采集环境背景声，两路不混合分析</small></div>
   </div>
  </section>`;
}
function acnGkHTML(d){
  switch(d.gk.tab){
    case 'sleep':return acnGkSleep(d);
    case 'cozy':return acnGkCozy(d);
    case 'act':return acnGkAct(d);
    case 'air':return acnGkAir(d);
    case 'eco':return acnGkEco(d);
    case 'quiet':return acnGkQuiet(d);
    default:return acnGkHome(d);
  }
}
/* ---------- 主页面 ---------- */
function openAcnCtl(d,embed){
  if(d.fan===undefined)d.fan=2;
  if(d.fanMode===undefined)d.fanMode=null;
  if(!d.opts)d.opts={'上下定格':false,'恒暖除霜':false,'温度限制':false,'上下扫风':true,'健康':false,'左右扫风':false,'内机防霉':false,'可控除湿':false};
  if(d.timer===undefined)d.timer='17:30关机';
  if(d.beep===undefined)d.beep=false;
  if(d.lock===undefined)d.lock=false;
  if(d.screenT===undefined)d.screenT='0.5分钟';
  if(!d.svc)d.svc={aiRun:false,sleep:false,mute:false};
  if(!d.gk)d.gk={tab:'home',actSim:false,actView:'trend'};
  if(d.ctlOpen===undefined)d.ctlOpen=false;
  const air=AIR[d.room]||AIR['全屋'];
  const model=d.id==='ac1'?'KFR-72LW/(72591)':'KFR-35GW/(35592)';
  const fanLabel=()=>d.fanMode||AC_FANS[d.fan];
  const head=embed?'':`<div class="acn-head" style="padding-top:46px">
   <button class="acn-ico-btn" data-back>${svgBack}</button>
   <div class="acn-head-t"><h1>空调</h1><p>${model} · ${d.room}</p></div>
   <button class="acn-ico-btn" id="acnMenu">${AC_MISC_SVG.dots}</button></div>`;
  const body=`
  <section class="acn-hero"><div class="acn-hero-in">
   <div>
    <span class="acn-badge ${d.on?'':'off'}" id="acnBadge">${d.on?d.mode+' · 运行中':'已关机'}</span>
    <div class="acn-big"><b id="acnBigT">${d.t}</b><span>°C</span></div>
    <p class="acn-cap">设定温度</p>
    <div class="acn-env">
     <div><p>室内温度</p><b>${Math.round(air.t)}°C</b></div>
     <div><p>室内湿度</p><b>${Math.round(air.h)}%</b></div>
     <div><p>室外温度</p><b>33°C</b></div>
    </div>
   </div>
   <div class="acn-ring" id="acnRing">${acnRing(94,'#1a73e8','#dbeafe')}<b>94</b><span>综合舒适</span></div>
  </div></section>
  <section class="acn-card">
   <div class="acn-power-row">
    <div><b>开关</b><p id="acnPwSt">${d.on?'设备运行中':'已关闭'}</p></div>
    <button class="acn-power-btn ${d.on?'':'off'}" id="acnPower">${AC_MISC_SVG.power}</button>
   </div>
   <div class="acn-ov" id="acnOv" style="display:${d.ctlOpen?'none':''}">
    <div class="acn-ov-grid">
     <div><b id="acnOvT">${d.t}°C</b><span>设定温度</span></div>
     <div><b id="acnOvF">${fanLabel()}</b><span>风速</span></div>
     <div><b id="acnOvM">${d.mode}</b><span>模式</span></div>
     <div><b id="acnOvFn">${AC_FEATS.filter(f=>!f.dis&&d.opts[f.n]).length}项</b><span>功能开启</span></div>
    </div>
   </div>
   <button class="acn-ov-tg ${d.ctlOpen?'open':''}" id="acnOvTg"><span id="acnOvTgT">${d.ctlOpen?'收起控制':'展开控制'}</span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9.5l6 6 6-6"/></svg></button>
  </section>
  <div id="acnCtl" style="display:${d.ctlOpen?'':'none'}">
  <section class="acn-card">
   <div class="acn-card-t"><b>温度调节</b><span>16 - 30 °C</span></div>
   <div class="acn-temp-row">
    <button class="acn-step" id="acnTDn">−</button>
    <div class="acn-temp-v"><b id="acnTV">${d.t}</b><span>°C</span></div>
    <button class="acn-step" id="acnTUp">＋</button>
   </div>
   <div class="acn-slider" id="acnSl">
    <div class="acn-track"><div class="acn-fill" id="acnFill"></div></div>
    <div class="acn-thumb" id="acnThumb"></div>
    <div class="acn-scale"><span>16</span><span>20</span><span>26</span><span>30</span></div>
   </div>
  </section>
  <section class="acn-card">
   <div class="acn-card-t"><b>风速</b><span id="acnFanV">${fanLabel()}</span></div>
   <div class="acn-seg" id="acnFanSeg">${AC_FANS.map((f,i)=>`<button class="${!d.fanMode&&d.fan===i?'on':''}" data-fi="${i}">${f}</button>`).join('')}</div>
   <div class="acn-pills">${['自动风','静音风','强劲风'].map(p=>`<button class="acn-pill ${d.fanMode===p?'on':''}" data-fm="${p}">${p}</button>`).join('')}</div>
  </section>
  <div class="acn-duo" style="margin-top:12px">
   <button class="acn-tile" id="acnModeTile"><div class="acn-tile-h"><span>模式</span><span class="acn-tile-ic" id="acnModeIc">${AC_MODE_SVG[d.mode]}</span></div><b id="acnModeV">${d.mode}</b><small>点击切换运行模式</small></button>
   <button class="acn-tile" id="acnTimerTile"><div class="acn-tile-h"><span>定时</span><span class="acn-tile-ic">${AC_MISC_SVG.clockLg}</span></div><b id="acnTimerV">${d.timer||'未设置'}</b><small>点击设置定时开关</small></button>
  </div>
  <div class="acn-sec"><h2>常用功能</h2><span class="sub" id="acnFeatQ" style="cursor:pointer">说明</span></div>
  <section class="acn-card">
   <div class="acn-grid4">
    ${AC_FEATS.map(f=>`<div class="acn-fn ${d.opts[f.n]&&!f.dis?'on':''} ${f.dis?'dis':''}" data-f="${f.n}"><span class="acn-fn-ic">${f.svg}</span><b>${f.n}</b></div>`).join('')}
   </div>
  </section>
  </div>
  <div class="acn-sec" id="acnGkSec"><h2>智慧空气管家</h2><span class="sub">主动服务 · 全天守护</span></div>
  <div class="acn-gk-tabs" id="acnGkTabs">${ACN_GK_TABS.map(t=>`<button class="acn-gk-tab ${d.gk.tab===t[0]?'on':''}" data-gk="${t[0]}"><i></i>${t[1]}</button>`).join('')}</div>
  <div id="acnGkBody"></div>
  <div class="acn-sec"><h2>智能控制</h2></div>
  <div class="acn-list">
   <div class="acn-li" id="acnQuick"><span class="acn-li-ic grad"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"><path d="M13 2 4.5 13.5H11L9.5 22 19 10h-6.5z"/></svg></span><div style="flex:1;min-width:0"><b>一键快控</b><p>快速制冷 / 舒适睡眠 / 节能运行</p></div><span class="go">${svgArrow}</span></div>
   <div class="acn-li" id="acnAiRow"><span class="acn-li-ic plain">${AC_SVC_SVG.cloud}</span><div style="flex:1;min-width:0"><b>AI运行</b><p>保证设备节能舒适运行</p></div><span class="acn-sw ${d.svc.aiRun?'on':''}" id="acnSwAi"><i></i></span></div>
   <div class="acn-li" id="acnEnergy"><span class="acn-li-ic plain"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" stroke-width="2" stroke-linecap="round"><path d="M4 20V12M9.3 20V6M14.7 20v-8M20 20V9M2.5 20h19"/></svg></span><div style="flex:1;min-width:0"><b>电量报告</b><p>今日用电 4.2 度 · 较基准 -18%</p></div><span class="go">${svgArrow}</span></div>
   <div class="acn-li" id="acnClean"><span class="acn-li-ic plain"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" stroke-width="2" stroke-linejoin="round"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M18.5 15.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/></svg></span><div style="flex:1;min-width:0"><b>智清洁</b><p>距离上次清洁已过 10 天</p></div><span class="go">${svgArrow}</span></div>
   <div class="acn-li" id="acnFilter"><span class="acn-li-ic plain"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 2.6v5.2c0 4.4-2.9 7.9-7 9.2-4.1-1.3-7-4.8-7-9.2V5.6z"/><path d="M8.8 11.8l2.2 2.2 4.2-4.4"/></svg></span><div style="flex:1;min-width:0"><b>滤网洁净</b><p>洁净度良好，无需清洁</p></div><span class="go">${svgArrow}</span></div>
  </div>
  <div class="acn-sec"><h2>面板设置</h2></div>
  <section class="acn-card" style="padding-top:4px;padding-bottom:4px">
   <div class="acn-lrow"><div><b>按键声</b><p>面板操作提示音</p></div><span class="acn-sw ${d.beep?'on':''}" id="acnSwBeep"><i></i></span></div>
   <div class="acn-lrow"><div><b>童锁</b><p>锁定面板防止误触</p></div><span class="acn-sw ${d.lock?'on':''}" id="acnSwLock"><i></i></span></div>
   <div class="acn-lrow" id="acnScrT" style="cursor:pointer"><div><b>亮屏时间</b><p>面板屏幕点亮时长</p></div><b style="font-size:12.5px;color:#1557b0;font-weight:600">${d.screenT} ›</b></div>
  </section>
  <div style="height:8px"></div>`;
  let el;
  if(embed){embed.innerHTML=`<div class="acn-wrap acn-embed"><div class="acn-body">${body}</div></div>`;el=embed;}
  else el=openPage(`<div class="acn-wrap">${head}<div class="acn-body">${body}</div></div>`);
  /* ---- 状态同步 ---- */
  const syncPower=()=>{
    el.querySelector('#acnPower').classList.toggle('off',!d.on);
    const b=el.querySelector('#acnBadge');
    b.classList.toggle('off',!d.on);
    b.textContent=d.on?d.mode+' · 运行中':'已关机';
    el.querySelector('#acnPwSt').textContent=d.on?'设备运行中':'已关闭';
  };
  const syncTemp=()=>{
    el.querySelector('#acnTV').textContent=d.t;
    el.querySelector('#acnBigT').textContent=d.t;
    el.querySelector('#acnOvT').textContent=d.t+'°C';
    const p=(d.t-16)/14*100;
    el.querySelector('#acnFill').style.width=p+'%';
    el.querySelector('#acnThumb').style.left=p+'%';
  };
  const syncFanUI=()=>{
    el.querySelector('#acnFanV').textContent=fanLabel();
    el.querySelector('#acnOvF').textContent=fanLabel();
    el.querySelectorAll('#acnFanSeg button').forEach(x=>x.classList.toggle('on',!d.fanMode&&+x.dataset.fi===d.fan));
    el.querySelectorAll('.acn-pill').forEach(x=>x.classList.toggle('on',x.dataset.fm===d.fanMode));
  };
  const syncTimer=()=>{el.querySelector('#acnTimerV').textContent=d.timer||'未设置';};
  const syncMode=()=>{
    el.querySelector('#acnModeV').textContent=d.mode;
    el.querySelector('#acnOvM').textContent=d.mode;
    el.querySelector('#acnModeIc').innerHTML=AC_MODE_SVG[d.mode];
    syncPower();
  };
  const syncOvFn=()=>{el.querySelector('#acnOvFn').textContent=AC_FEATS.filter(f=>!f.dis&&d.opts[f.n]).length+'项';};
  /* ---- 控制区折叠 / 展开 ---- */
  const syncCtl=()=>{
    el.querySelector('[id="acnCtl"]').style.display=d.ctlOpen?'':'none';
    el.querySelector('#acnOv').style.display=d.ctlOpen?'none':'';
    el.querySelector('#acnOvTg').classList.toggle('open',d.ctlOpen);
    el.querySelector('#acnOvTgT').textContent=d.ctlOpen?'收起控制':'展开控制';
  };
  el.querySelector('#acnOvTg').onclick=()=>{d.ctlOpen=!d.ctlOpen;syncCtl();toast(d.ctlOpen?'控制面板已展开':'控制面板已折叠');};
  syncTemp();
  /* ---- 开关 ---- */
  el.querySelector('#acnPower').onclick=()=>{d.on=!d.on;syncPower();toast(d.name+(d.on?' 已开启':' 已关闭'));};
  /* ---- 温度 ---- */
  el.querySelector('#acnTUp').onclick=()=>{if(d.t>=30)return toast('已是最高温度 30°C');d.t++;syncTemp();toast('设定温度 '+d.t+'°C');};
  el.querySelector('#acnTDn').onclick=()=>{if(d.t<=16)return toast('已是最低温度 16°C');d.t--;syncTemp();toast('设定温度 '+d.t+'°C');};
  const sl=el.querySelector('#acnSl');
  let slDrag=false;
  const setTFromEvt=e=>{const r=sl.querySelector('.acn-track').getBoundingClientRect();
    const p=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width));
    const t=16+Math.round(p*14);
    if(t!==d.t){d.t=t;syncTemp();}};
  sl.addEventListener('pointerdown',e=>{slDrag=true;try{sl.setPointerCapture(e.pointerId)}catch(_){}setTFromEvt(e);});
  sl.addEventListener('pointermove',e=>{if(slDrag)setTFromEvt(e);});
  sl.addEventListener('pointerup',()=>{if(slDrag){slDrag=false;toast('设定温度 '+d.t+'°C');}});
  /* ---- 风速 ---- */
  el.querySelectorAll('#acnFanSeg button').forEach(x=>x.onclick=()=>{d.fan=+x.dataset.fi;d.fanMode=null;syncFanUI();toast('风速已设为 '+AC_FANS[d.fan]);});
  el.querySelectorAll('.acn-pill').forEach(x=>x.onclick=()=>{d.fanMode=x.dataset.fm;syncFanUI();toast('已开启 '+d.fanMode);});
  /* ---- 模式 ---- */
  el.querySelector('#acnModeTile').onclick=()=>{
    const m=openModal(`<div class="ac-sheet-t">选择模式</div>${Object.keys(AC_MODE_SVG).map(md=>
      `<div class="ac-opt ${d.mode===md?'on':''}" data-m="${md}">${AC_MODE_SVG[md]}<span>${md}</span><span class="ok">✓</span></div>`).join('')}`);
    m.querySelectorAll('[data-m]').forEach(o=>o.onclick=()=>{d.mode=o.dataset.m;syncMode();closeModal(m);toast('已切换为「'+d.mode+'」模式');});};
  /* ---- 定时 ---- */
  const openTimer=()=>{
    const opts=['17:30关机','19:00关机','22:00关机','7小时后关机','取消定时'];
    const m=openModal(`<div class="ac-sheet-t">定时设置</div>${opts.map(o=>{
      const on=(d.timer===o)||(o==='取消定时'&&!d.timer);
      return `<div class="ac-opt ${on?'on':''}" data-tm="${o}"><span>${o}</span><span class="ok">✓</span></div>`;}).join('')}`);
    m.querySelectorAll('[data-tm]').forEach(r=>r.onclick=()=>{const v=r.dataset.tm;
      d.timer=(v==='取消定时')?null:v;syncTimer();closeModal(m);
      toast(d.timer?'定时已设置：'+d.timer:'定时已取消');});};
  el.querySelector('#acnTimerTile').onclick=openTimer;
  /* ---- 常用功能 ---- */
  const openTempLimit=()=>{
    const m=openModal(`<div class="ac-sheet-t">温度限制</div>
     <div class="ac-opt"><span><b>限制设定温度范围</b><p>防止误触导致温度过低或过高</p></span><span class="switch ${d.opts['温度限制']?'on':''}" id="tlSw" style="margin-left:auto"></span></div>
     <div class="ac-opt"><span>可调温度范围</span><b style="margin-left:auto;color:#1a73e8">20°C ~ 28°C</b></div>`);
    const sw=m.querySelector('#tlSw');
    sw.onclick=()=>{sw.classList.toggle('on');d.opts['温度限制']=sw.classList.contains('on');
      el.querySelector('[data-f="温度限制"]').classList.toggle('on',d.opts['温度限制']);syncOvFn();
      toast('温度限制'+(d.opts['温度限制']?' 已开启':' 已关闭'));};};
  el.querySelectorAll('[data-f]').forEach(it=>it.onclick=()=>{
    const n=it.dataset.f,f=AC_FEATS.find(x=>x.n===n);
    if(f.dis)return toast('当前模式下「'+n+'」暂不可用');
    if(n==='温度限制')return openTempLimit();
    d.opts[n]=!d.opts[n];it.classList.toggle('on',d.opts[n]);syncOvFn();
    toast(n+(d.opts[n]?' 已开启':' 已关闭'));});
  el.querySelector('#acnFeatQ').onclick=()=>openModal(`<div class="ac-sheet-t">常用功能</div>
   <p style="font-size:12.5px;color:#5f7285;line-height:1.8;padding:0 4px">带开关状态的功能点击即可切换；灰色功能在当前模式下暂不可用。「温度限制」支持进入详细设置。</p>
   <div class="ac-opt" data-close><span style="margin:auto;color:#1a73e8">知道了</span></div>`);
  /* ---- 智慧空气管家 ---- */
  const gkBody=el.querySelector('#acnGkBody');
  const setGkTab=k=>{d.gk.tab=k;
    el.querySelectorAll('.acn-gk-tab').forEach(t=>t.classList.toggle('on',t.dataset.gk===k));
    renderGk();};
  const renderGk=()=>{
    gkBody.innerHTML=acnGkHTML(d);
    gkBody.querySelectorAll('[data-go]').forEach(x=>x.onclick=()=>setGkTab(x.dataset.go));
    const sim=gkBody.querySelector('#acnActSim');
    if(sim)sim.onclick=()=>{d.gk.actSim=!d.gk.actSim;renderGk();toast(d.gk.actSim?'已模拟人员进入，开始记录活动':'已模拟人员离开');};
    gkBody.querySelectorAll('#acnActSeg button').forEach(x=>x.onclick=()=>{d.gk.actView=x.dataset.av;renderGk();});
  };
  el.querySelectorAll('.acn-gk-tab').forEach(t=>t.onclick=()=>setGkTab(t.dataset.gk));
  dragScroll(el.querySelector('#acnGkTabs'));
  renderGk();
  el.querySelector('#acnRing').onclick=()=>{
    const s=el.querySelector('#acnGkSec');
    if(s&&s.scrollIntoView)s.scrollIntoView({behavior:'smooth',block:'start'});};
  /* ---- 智能控制 ---- */
  el.querySelector('#acnQuick').onclick=()=>{
    const opts=[['快速制冷','制冷 · 18°C · 超强风',()=>{d.mode='制冷';d.t=18;d.fan=3;d.fanMode=null;}],
      ['舒适睡眠','制冷 · 27°C · 静音风',()=>{d.mode='制冷';d.t=27;d.fanMode='静音风';}],
      ['节能运行','制冷 · 26°C · 低速',()=>{d.mode='制冷';d.t=26;d.fan=0;d.fanMode=null;}]];
    const m=openModal(`<div class="ac-sheet-t">一键快控</div>${opts.map((o,i)=>
      `<div class="ac-opt" data-q="${i}"><span><b>${o[0]}</b><p>${o[1]}</p></span><span class="ok">✓</span></div>`).join('')}`);
    m.querySelectorAll('[data-q]').forEach(r=>r.onclick=()=>{const o=opts[+r.dataset.q];o[2]();
      d.on=true;syncTemp();syncFanUI();syncMode();closeModal(m);toast('「'+o[0]+'」已执行');});};
  const swAi=el.querySelector('#acnSwAi');
  el.querySelector('#acnAiRow').onclick=()=>{d.svc.aiRun=!d.svc.aiRun;swAi.classList.toggle('on',d.svc.aiRun);toast('AI运行'+(d.svc.aiRun?' 已开启':' 已关闭'));};
  el.querySelector('#acnEnergy').onclick=()=>openEnergyPage();
  el.querySelector('#acnClean').onclick=()=>toast('智清洁已启动，蒸发器自清洁约 30 分钟');
  el.querySelector('#acnFilter').onclick=()=>toast('滤网洁净度良好，无需清洁');
  /* ---- 面板设置 ---- */
  const swBeep=el.querySelector('#acnSwBeep'),swLock=el.querySelector('#acnSwLock');
  swBeep.onclick=()=>{swBeep.classList.toggle('on');d.beep=swBeep.classList.contains('on');toast('按键声'+(d.beep?' 已开启':' 已关闭'));};
  swLock.onclick=()=>{swLock.classList.toggle('on');d.lock=swLock.classList.contains('on');toast('童锁'+(d.lock?' 已开启':' 已关闭'));};
  el.querySelector('#acnScrT').onclick=()=>{
    const opts=['0.5分钟','1分钟','5分钟','常亮'];
    const m=openModal(`<div class="ac-sheet-t">亮屏时间</div>${opts.map(o=>
      `<div class="ac-opt ${d.screenT===o?'on':''}" data-sc="${o}"><span>${o}</span><span class="ok">✓</span></div>`).join('')}`);
    m.querySelectorAll('[data-sc]').forEach(r=>r.onclick=()=>{d.screenT=r.dataset.sc;
      el.querySelector('#acnScrT>div+b, #acnScrT b').textContent=d.screenT+' ›';closeModal(m);toast('亮屏时间已设为 '+d.screenT);});};
  /* ---- ⋮ 菜单 ---- */
  const acnMenuB=el.querySelector('#acnMenu');
  if(acnMenuB)acnMenuB.onclick=()=>{
    const items=[['设备信息',model+' · 已接入格力+'],['分享设备','与家人共享设备控制权'],['固件升级','当前 v2.1.6 已是最新版本'],['常见问题','查看空调使用帮助与故障排查']];
    const m=openModal(`<div class="ac-sheet-t">更多</div>${items.map((it,i)=>
      `<div class="ac-opt" data-mi="${i}"><span><b>${it[0]}</b><p>${it[1]}</p></span></div>`).join('')}`);
    m.querySelectorAll('[data-mi]').forEach(r=>r.onclick=()=>{closeModal(m);toast(items[+r.dataset.mi][0]+'（演示）');});};
}

/* ================= 睡眠管家 / 人体感知 / 饮水适配 / 预备烹饪 ================= */
const SLP_MOON17='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round"><path d="M20 14.5A8.2 8.2 0 0 1 9.5 4 8.2 8.2 0 1 0 20 14.5z"/></svg>';
const LV_RADAR='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="2" fill="#fff" stroke="none"/><path d="M12 5.5a6.5 6.5 0 0 1 6.5 6.5M12 9a3 3 0 0 1 3 3"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>';
const SLP_STAGE=[{n:'深睡',c:'#7c3aed'},{n:'浅睡',c:'#c084fc'},{n:'快速眼动',c:'#f97066'},{n:'清醒',c:'#fbbf24'}];
function sleepData(mi,off){
  const base=[
   {score:74,deep:112,light:196,rem:82,move:22,start:'23:52',end:'06:34',hr:[48,62,86],br:[11,14,17]},
   {score:85,deep:138,light:208,rem:94,move:9,start:'23:21',end:'06:41',hr:[46,58,78],br:[11,13,16]},
   {score:68,deep:96,light:226,rem:62,move:16,start:'22:48',end:'05:52',hr:[50,64,82],br:[12,15,18]},
   {score:91,deep:152,light:234,rem:106,move:6,start:'21:32',end:'06:58',hr:[44,55,72],br:[10,12,15]}][mi];
  if(off===0)return Object.assign({},base);
  const r=seeded('slp'+mi+'d'+off);
  const j=(v,a)=>Math.max(1,Math.round(v*(1-a+r()*a*2)));
  return {score:Math.min(96,Math.max(58,j(base.score,.09))),deep:j(base.deep,.15),light:j(base.light,.1),
   rem:j(base.rem,.15),move:j(base.move,.35),start:base.start,end:base.end,hr:base.hr,br:base.br};
}
function slpLevel(score){return score>=90?['优','#34a853']:score>=80?['良','#1a73e8']:score>=70?['中','#f29900']:['差','#e54545']}
function slpStages(mi,off){
  const r=seeded('slpSt'+mi+'_'+off);const seq=[];
  for(let i=0;i<48;i++){
    const p=r(),t=i/48;let cur;
    if(i<2)cur=1;
    else if(t<.35)cur=p<.48?0:(p<.82?1:2);
    else if(t<.75)cur=p<.3?0:(p<.75?1:2);
    else cur=p<.1?0:(p<.52?1:(p<.92?2:3));
    if(r()<.05)cur=3;
    seq.push(cur);
  }
  seq[0]=1;seq[47]=3;return seq;
}
function slpHypno(st,W,H){
  const bw=W/st.length,base=H-4;
  const yy=s=>[H*.74,H*.52,H*.3,H*.08][s];
  return st.map((v,i)=>`<rect x="${(i*bw).toFixed(1)}" y="${yy(v).toFixed(1)}" width="${(bw+.7).toFixed(1)}" height="${(base-yy(v)).toFixed(1)}" rx="2" fill="${SLP_STAGE[v].c}"/>`).join('');
}
function slpDonut(deep,light,rem){
  const total=deep+light+rem,R=40,C=2*Math.PI*R;let acc=0;
  const arcs=[[deep,'#7c3aed'],[light,'#c084fc'],[rem,'#f97066']].map(pt=>{
    const len=C*pt[0]/total;
    const str=`<circle cx="50" cy="50" r="${R}" fill="none" stroke="${pt[1]}" stroke-width="13" stroke-dasharray="${len.toFixed(1)} ${(C-len).toFixed(1)}" stroke-dashoffset="${(-acc).toFixed(1)}"/>`;
    acc+=len;return str;}).join('');
  return `<svg width="104" height="104" style="transform:rotate(-90deg);flex:0 0 auto">${arcs}</svg>`;
}
function slpLine(key,lo,hi,color){
  const r=seeded(key);const W=344,H=84,P=6,n=48;
  let v=(lo+hi)/2;const pts=[];
  for(let i=0;i<n;i++){v=Math.max(lo,Math.min(hi,v+(r()-.5)*(hi-lo)*.18));pts.push([P+i*(W-P*2)/(n-1),H-12-(v-lo)/(hi-lo)*(H-28)]);}
  const line=pts.map((pt,i)=>(i?'L':'M')+pt[0].toFixed(1)+' '+pt[1].toFixed(1)).join(' ');
  return `<svg viewBox="0 0 ${W} ${H}" style="width:100%"><path d="${line} L${pts[n-1][0].toFixed(1)} ${H-12} L${P} ${H-12} Z" fill="${color}18"/><path class="lc-line" d="${line}" fill="none" stroke="${color}" stroke-width="1.8"/></svg>`;
}
function slpMovesBars(mi,off,total){
  const r=seeded('slpMv'+mi+'_'+off);
  let ws=Array.from({length:7},()=>.3+r());
  const sum=ws.reduce((a,b)=>a+b,0);
  const vs=ws.map(w=>Math.round(w/sum*total));
  const labels=['23','00','01','02','03','04','05'];
  const mx=Math.max(...vs,1);
  return `<div style="display:flex;align-items:flex-end;gap:8px;height:74px;padding:8px 4px 0">${vs.map((v,i)=>`
   <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
    <div style="width:100%;height:${Math.max(3,v/mx*52)}px;border-radius:5px 5px 2px 2px;background:${v>=6?'#f29900':'#c084fc'}"></div>
    <span style="font-size:8.5px;color:var(--ink3)">${labels[i]}时</span></div>`).join('')}</div>`;
}
function slpBodyHTML(d,mi,off){
  const st=slpStages(mi,off);
  const total=d.deep+d.light+d.rem;
  const lv=slpLevel(d.score);
  const room=mi===3?'儿童房':mi===2?'书房（老人房）':'主卧';
  const deepP=Math.round(d.deep/total*100);
  const starN=Math.round(d.score/20);
  const fmt2=v=>`${Math.floor(v/60)} 小时 ${v%60} 分`;
  const moveTag=d.move>=18?['偏多','#b26a00','#fdf3e3']:d.move>=8?['正常','#0d5c34','#e9f9ef']:['较少','#3d6db5','#eef3fb'];
  const acLog=[
   {t:d.start+' · 入睡',s:1,h:'检测入睡，进入浅睡期',tags:['温度 26→27°C','风速 低速','新风 低档']},
   {t:'00:40 · 深睡',s:0,h:'进入深睡期，恒温护眠',tags:['温度 27.5°C','静音风','湿度保持 55%']},
   {t:'03:10 · 换气',s:0,h:'CO₂ 升至 890 ppm，自动换气',tags:['新风开启','含氧量回升 20.8%','CO₂ 降至 720 ppm']},
   {t:'05:20 · 快速眼动',s:2,h:'快速眼动期，温度微调',tags:['温度 27°C','保持静音']},
   {t:d.end+' · 醒来',s:3,h:'检测到醒来，恢复日常运行',tags:['温度回升 26°C','风速 自动','退出睡眠模式']},
  ];
  const advices=[];
  if(d.move>=18)advices.push('体动偏多：建议睡前 1 小时避免剧烈运动与咖啡因，卧室温度可再下调 0.5°C。');
  if(deepP<25)advices.push('深睡比例偏低：建议固定就寝时间，睡前减少手机屏幕使用。');
  if(d.score>=85)advices.push('睡眠质量良好，请继续保持规律作息。');
  advices.push('入睡时间偏晚：建议 23:30 前就寝，有助于延长深睡时长。');
  advices.push(`${room}空调已开启睡眠联动，将随睡眠分期自动调节温度、风档、湿度与新风。`);
  return `
  <div class="ctl-card" style="margin-top:10px">
   <div class="slp-score">
    <div><span class="sc-b">${d.score}<small> 分</small></span><div class="slp-stars">${'★'.repeat(starN)}${'☆'.repeat(5-starN)}</div></div>
    <div><span class="slp-lv" style="color:${lv[1]};background:${lv[1]}1a">睡眠质量 ${lv[0]}</span>
     <div style="font-size:11px;color:var(--ink2);margin-top:8px">超过了 ${Math.min(99,d.score+7)}% 的用户</div>
     <div style="font-size:11px;color:var(--ink3);margin-top:3px">${FAMILY[mi].n} · ${room}</div></div>
   </div>
  </div>
  ${aiSvcBannerHTML('睡眠健康','12px 14px 12px')}
  <div class="ctl-card"><h3>夜间睡眠 · ${Math.floor(total/60)} 小时 ${total%60} 分钟</h3>
   <svg viewBox="0 0 344 120" style="width:100%;margin-top:8px">${slpHypno(st,344,120)}</svg>
   <div style="display:flex;justify-content:space-between;font-size:10.5px;color:var(--ink2);padding:2px 2px 0"><span>入睡 ${d.start}</span><span>醒来 ${d.end}</span></div>
   <div class="slp-lgn">${SLP_STAGE.map(x=>`<span><i style="background:${x.c}"></i>${x.n}</span>`).join('')}</div>
  </div>
  <div class="ctl-card"><h3>睡眠比例</h3>
   <div style="display:flex;align-items:center;gap:18px;margin-top:10px">
    ${slpDonut(d.deep,d.light,d.rem)}
    <div style="flex:1">
     ${[['深睡',d.deep,'#7c3aed'],['浅睡',d.light,'#c084fc'],['快速眼动',d.rem,'#f97066']].map(x=>`
     <div style="display:flex;align-items:center;gap:8px;font-size:12px;padding:5px 0"><i style="width:9px;height:9px;border-radius:50%;background:${x[2]}"></i><span style="color:var(--ink2)">${x[0]}</span><b style="margin-left:auto">${fmt2(x[1])}</b></div>`).join('')}
    </div>
   </div>
   <div class="slp-kv" style="margin-top:6px"><span>深睡比例 ${deepP}%<div class="rg">参考值：20-60%</div></span><span class="slp-ok" style="color:${deepP>=20?'#0d5c34':'#b26a00'};background:${deepP>=20?'#e9f9ef':'#fdf3e3'}">${deepP>=20?'正常':'偏少'}</span></div>
   <div class="slp-kv"><span>夜间睡眠 ${Math.floor(total/60)} 小时 ${total%60} 分钟<div class="rg">参考值：6-10 小时</div></span><span class="slp-ok" style="color:#0d5c34;background:#e9f9ef">正常</span></div>
  </div>
  <div class="ctl-card"><h3>体动情况 <span class="slp-ok" style="color:${moveTag[1]};background:${moveTag[2]};float:right">整晚 ${d.move} 次 · ${moveTag[0]}</span></h3>
   ${slpMovesBars(mi,off,d.move)}
   <p style="font-size:11px;color:var(--ink2);line-height:1.6;margin-top:6px">${d.move>=18?'体动主要集中在 01:00-04:00，与浅睡期吻合，建议关注睡前状态。':'体动分布均匀，睡眠安稳。'}</p>
  </div>
  <div class="ctl-card"><h3>心跳数据</h3>
   <div style="display:flex;gap:16px;font-size:11px;color:var(--ink2);margin:6px 0 2px"><span>最低 <b style="color:#e54545">${d.hr[0]}</b> bpm</span><span>平均 <b style="color:#e54545">${d.hr[1]}</b> bpm</span><span>最高 <b style="color:#e54545">${d.hr[2]}</b> bpm</span></div>
   ${slpLine('hr'+mi+'_'+off,d.hr[0]-4,d.hr[2]+4,'#e54545')}
  </div>
  <div class="ctl-card"><h3>呼吸数据</h3>
   <div style="display:flex;gap:16px;font-size:11px;color:var(--ink2);margin:6px 0 2px"><span>最低 <b style="color:#00a8c6">${d.br[0]}</b> 次/分</span><span>平均 <b style="color:#00a8c6">${d.br[1]}</b> 次/分</span><span>最高 <b style="color:#00a8c6">${d.br[2]}</b> 次/分</span></div>
   ${slpLine('br'+mi+'_'+off,d.br[0]-2,d.br[2]+3,'#00a8c6')}
  </div>
  <div class="ctl-card"><h3>解读与建议</h3>
   ${advices.map(a=>`<div style="display:flex;gap:9px;padding:9px 0;border-bottom:1px solid #f3f4f6"><span style="color:#7c4dff;flex:0 0 auto">◈</span><p style="font-size:12px;color:var(--ink2);line-height:1.65">${a}</p></div>`).join('')}
  </div>
  <div class="ctl-card"><h3>${room}空调 · 睡眠联动调节</h3>
   <div class="slp-ac-tl">
    ${acLog.map(l=>`<div class="slp-ac-it" style="--sc:${SLP_STAGE[l.s].c}"><style></style><time>${l.t}</time><h5>${l.h}</h5><div class="tags">${l.tags.map(t=>`<span>${t}</span>`).join('')}</div></div>`).join('')}
   </div>
  </div>`;
}
function openSleepPage(mi=0,off=0){
  const head=`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button><h1>睡眠报告</h1>
   <span class="pg-extra" id="slpWho">${FAMILY[mi].n}</span><img class="slp-ava" id="slpAva" src="${FAMILY[mi].img}"></div>`;
  const el=openPage(head+`<div class="page-scroll" style="padding:0 14px 26px">
   <div class="slp-date"><button id="slpPrev">${svgBack}</button><span id="slpDateT"></span><button id="slpNext" style="transform:scaleX(-1)">${svgBack}</button></div>
   <div id="slpBody"></div></div>`);
  const render=()=>{
    const dt=new Date(2026,6,22-off);
    el.querySelector('#slpDateT').textContent=`${off===0?'昨天 · ':''}2026年7月${22-off}日 周${'日一二三四五六'[dt.getDay()]}`;
    el.querySelector('#slpNext').classList.toggle('dis',off===0);
    el.querySelector('#slpAva').src=FAMILY[mi].img;
    el.querySelector('#slpWho').textContent=FAMILY[mi].n;
    el.querySelector('#slpBody').innerHTML=slpBodyHTML(sleepData(mi,off),mi,off);
  };
  el.querySelector('#slpPrev').onclick=()=>{if(off<14){off++;render()}};
  el.querySelector('#slpNext').onclick=()=>{if(off>0){off--;render()}};
  el.querySelector('#slpAva').onclick=()=>{
    const m=openModal(`<div class="ac-sheet-t">查看家庭成员睡眠报告</div>${FAMILY.map((f,i)=>
     `<div class="ac-opt ${i===mi?'on':''}" data-sm="${i}"><img src="${f.img}" style="width:32px;height:32px;border-radius:50%;object-fit:cover"><span><b>${f.n}</b><p>${f.r}</p></span><span class="ok">✓</span></div>`).join('')}`);
    m.querySelectorAll('[data-sm]').forEach(r=>r.onclick=()=>{mi=+r.dataset.sm;off=0;closeModal(m);render();toast('已切换为「'+FAMILY[mi].n+'」的睡眠报告')});};
  render();
}

/* ================= 客厅人体感知（雷达） ================= */
function openLivingPresence(){
  const logs=[
   {c:'#4ade80',h:'无人 · 持续 15 分钟',p:'10:00 后未检测到活动，空调已进入轻度节能（温度上调 1°C、风速降档）。',t:'10:00 - 现在'},
   {c:'#4a90e2',h:'2 人活动',p:'两人在沙发区停留，电视打开，空调 26°C 正常运行。',t:'09:00 - 10:00'},
   {c:'#4a90e2',h:'1 人活动',p:'一人经过客厅走向阳台，停留约 4 分钟。',t:'08:20 - 09:00'},
   {c:'#4a90e2',h:'3 人活动',p:'早餐时段，客厅与餐厅多人活动。',t:'07:10 - 08:20'},
   {c:'#9aa0a6',h:'无人 · 夜间',p:'22:30 后未检测到活动，客厅空调已于 23:00 自动关闭。',t:'昨天 22:30 - 07:00'},
   {c:'#4a90e2',h:'4 人活动',p:'晚间全家观影，空调运行观影模式。',t:'昨天 19:30 - 22:30'},
  ];
  openPage(`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button><h1>客厅 · 人体感知</h1><span class="pg-extra">人感检测工作中</span></div>
   <div class="page-scroll" style="padding-bottom:24px">
    <div class="rdr-wrap">
     <div class="rdr-badge">● 无人</div>
     <svg viewBox="0 0 300 210" style="width:100%;display:block;margin-top:4px">
      <rect x="14" y="14" width="272" height="182" rx="10" fill="rgba(255,255,255,.05)" stroke="rgba(143,176,216,.5)" stroke-width="1.6"/>
      <rect x="20" y="46" width="30" height="118" rx="6" fill="rgba(143,176,216,.22)" stroke="rgba(143,176,216,.5)"/>
      <text x="35" y="110" font-size="10" fill="#8fb0d8" text-anchor="middle">沙发</text>
      <rect x="256" y="82" width="22" height="52" rx="4" fill="rgba(143,176,216,.22)" stroke="rgba(143,176,216,.5)"/>
      <text x="267" y="110" font-size="9" fill="#8fb0d8" text-anchor="middle">电视</text>
      <circle cx="170" cy="110" r="20" fill="rgba(143,176,216,.16)" stroke="rgba(143,176,216,.45)"/>
      <text x="170" y="114" font-size="9" fill="#8fb0d8" text-anchor="middle">茶几</text>
      <circle cx="264" cy="30" r="5" fill="#4ade80"><animate attributeName="opacity" values="1;.3;1" dur="1.6s" repeatCount="indefinite"/></circle>
      <text x="252" y="24" font-size="9" fill="#4ade80" text-anchor="end">AI柜机</text>
     </svg>
     <div class="rdr-cap">最后检测：15 分钟前 · 2 人在沙发区活动</div>
    </div>
    <div class="lv-stat-row">
     <div class="lv-stat"><b>15 分钟</b><span>无人持续</span></div>
     <div class="lv-stat"><b>23 人次</b><span>今日检测</span></div>
     <div class="lv-stat"><b style="color:#4a90e2">轻度节能</b><span>客厅空调</span></div>
    </div>
    <div class="lv-log"><h3>节能策略</h3>
     <div class="lv-item"><span class="lv-dot" style="background:#4ade80"></span><div><h5>轻度节能 · 已生效</h5><p>无人超过 15 分钟：设定温度上调 1°C、风速降档运行。</p></div></div>
     <div class="lv-item"><span class="lv-dot" style="background:#f29900"></span><div><h5>深度节能 · 待触发</h5><p>无人超过 60 分钟：降低保温、关闭新风机及空气净化器。</p></div></div>
    </div>
    <div class="lv-log"><h3>活动记录 · 按小时（最新在前）</h3>
     ${logs.map(l=>`<div class="lv-item"><span class="lv-dot" style="background:${l.c}"></span><div><h5>${l.h}</h5><p>${l.p}</p></div><time>${l.t}</time></div>`).join('')}
    </div>
   </div>`);
}
/* ================= 饮用水 · 家庭适配 ================= */
const WATER_PREFS=[
 {temp:'常温 25°C',tds:'40-60',goal:'2.0 L'},
 {temp:'45°C 温水',tds:'40-60',goal:'1.8 L'},
 {temp:'50°C 温开水',tds:'30-50 低钠',goal:'1.5 L'},
 {temp:'40°C 温水',tds:'30-50',goal:'1.2 L'}];
function wqText(i){const w=(S.waterPref&&S.waterPref[i])||WATER_PREFS[i];return `${w.temp} · TDS ${w.tds} ppm · 每日 ${w.goal}`}
function openWaterPref(mi,onSave){
  const cur=Object.assign({},WATER_PREFS[mi],(S.waterPref||{})[mi]);
  const row=(t,arr,key)=>`<div style="margin:12px 0 6px;font-size:12.5px;font-weight:700">${t}</div>
   <div style="display:flex;gap:7px;flex-wrap:wrap">${arr.map(v=>`<button class="chip ${cur[key]===v?'on':''}" data-wp="${key}|${v}" style="margin:0">${v}</button>`).join('')}</div>`;
  const m=openModal(`<div class="ac-sheet-t">水质参数 · ${FAMILY[mi].n}</div>
   ${row('出水温度',['常温 25°C','40°C 温水','45°C 温水','50°C 温开水'],'temp')}
   ${row('TDS 范围 ppm',['30-50','40-60','60-100','30-50 低钠'],'tds')}
   ${row('每日饮水目标',['1.2 L','1.5 L','1.8 L','2.0 L'],'goal')}
   <button class="cook-btn" id="wqSave" style="margin-top:14px">保存参数</button>
   <button class="cook-btn" id="wqNfc" style="margin-top:8px;background:#e8f6fb;color:#0090b0;box-shadow:none">一键写入 NFC 杯贴</button>`);
  m.querySelectorAll('[data-wp]').forEach(b=>b.onclick=()=>{const kv=b.dataset.wp.split('|');cur[kv[0]]=kv[1];
   b.parentElement.querySelectorAll('.chip').forEach(c=>c.classList.remove('on'));b.classList.add('on');});
  const save=()=>{if(!S.waterPref)S.waterPref={};S.waterPref[mi]=Object.assign({},cur);};
  m.querySelector('#wqSave').onclick=()=>{save();closeModal(m);toast('水质参数已保存并下发净水器');if(onSave)onSave();};
  m.querySelector('#wqNfc').onclick=()=>{save();closeModal(m);toast(`已将「${FAMILY[mi].n}」的水质参数写入 NFC 杯贴`);if(onSave)onSave();};
}
/* ================= 电饭煲软硬度浮窗 ================= */
function openRiceSoftSheet(cb){
  const opts=[['颗粒分明','偏硬有嚼劲'],['柔软适中','大众口感'],['柔软口感','推荐 · 软糯适口']];
  const cur=S.riceSoft||'柔软口感';
  const m=openModal(`<div class="ac-sheet-t">米饭软硬度</div>${opts.map(o=>
   `<div class="ac-opt ${cur===o[0]?'on':''}" data-s="${o[0]}"><span><b>${o[0]}</b><p>${o[1]}</p></span><span class="ok">✓</span></div>`).join('')}`);
  m.querySelectorAll('[data-s]').forEach(r=>r.onclick=()=>{S.riceSoft=r.dataset.s;closeModal(m);
   if(cb)cb(r.dataset.s);toast('米饭软硬度已设为「'+r.dataset.s+'」');});
}
/* ================= 电饭煲预备烹饪 ================= */
function rpSmooth(pts){
  let d=`M${pts[0][0]} ${pts[0][1]}`;
  for(let i=1;i<pts.length;i++){
    const a=pts[i-1],b=pts[i];const mx=((+a[0]+ +b[0])/2).toFixed(1);
    d+=` C${mx} ${a[1]}, ${mx} ${b[1]}, ${b[0]} ${b[1]}`;}
  return d;
}
const RP_MODE_IC={
 '煮饭':'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4.5" y="8.5" width="15" height="10" rx="4"/><path d="M9 8.5v-2h6v2"/></svg>',
 '煮粥':'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 12.5h16a8 8 0 0 1-16 0z"/><path d="M8 9.5c.8-1 .8-2 0-3M12 9.5c.8-1 .8-2 0-3M16 9.5c.8-1 .8-2 0-3"/></svg>',
 '蛋糕':'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21h14"/><path d="M6 21v-5.5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2V21"/><path d="M12 13.5v-3"/><circle cx="12" cy="8.6" r="1.1"/><path d="M8.5 13.5V12M15.5 13.5V12"/></svg>',
 '煲仔饭':'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4.5 11h15l-1.3 6.5a3 3 0 0 1-3 2.5H8.8a3 3 0 0 1-3-2.5z"/><path d="M3 11h18"/><path d="M9.5 7.5c.8-1 .8-2 0-2.8M14 7.5c.8-1 .8-2 0-2.8"/></svg>'};
const RP_SOFT_IC={
 '颗粒分明':'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f29900" stroke-width="1.8"><ellipse cx="7.5" cy="8" rx="2" ry="3"/><ellipse cx="15.5" cy="7" rx="2" ry="3"/><ellipse cx="11.5" cy="15.5" rx="2" ry="3"/></svg>',
 '柔软适中':'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f29900" stroke-width="1.8" stroke-linecap="round"><path d="M4 13.5h16a8 8 0 0 1-16 0z"/><ellipse cx="9" cy="9" rx="1.5" ry="2.4"/><ellipse cx="13.5" cy="8.5" rx="1.5" ry="2.4"/></svg>',
 '柔软口感':'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f29900" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17.5a4 4 0 0 1-.5-8A5.5 5.5 0 0 1 17 10.5a3.5 3.5 0 0 1 .5 7z"/></svg>'};
function openRicePrep(){
  const rp={mode:'煮饭',soft:S.riceSoft||'柔软口感'};
  const MODES={'煮饭':42,'煮粥':60,'蛋糕':50,'煲仔饭':48};
  const SOFTD={'颗粒分明':-4,'柔软适中':0,'柔软口感':3};
  const head=`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button><h1>电饭煲 · 预备烹饪</h1><span class="pg-extra">厨房</span></div>`;
  const el=openPage(head+`<div class="page-scroll" style="padding:4px 14px 26px">
   <div class="ctl-card" style="margin-top:6px"><h3>入锅检测</h3>
    <div class="rp-grid">
     <div class="rp-cell"><span class="rp-ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b26a00" stroke-width="1.9" stroke-linecap="round"><path d="M4 12.5h16a8 8 0 0 1-16 0z"/><path d="M8 9.5c.8-1 .8-2 0-3M12 9.5c.8-1 .8-2 0-3M16 9.5c.8-1 .8-2 0-3"/></svg></span><b>约 300g</b><span>米量 · 2 杯</span></div>
     <div class="rp-cell"><span class="rp-ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2b86c8" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5s5.5 6.2 5.5 10a5.5 5.5 0 0 1-11 0c0-3.8 5.5-10 5.5-10z"/><path d="M9.2 13.5a2.8 2.8 0 0 0 2.4 2.9"/></svg></span><b>约 400mL</b><span>水量 · 1:1.3</span></div>
     <div class="rp-cell"><span class="rp-ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e54545" stroke-width="1.9" stroke-linecap="round"><path d="M10 4a2 2 0 1 1 4 0v7.6a4.5 4.5 0 1 1-4 0z"/><path d="M12 9v5.5"/><circle cx="12" cy="16.8" r="1.5" fill="#e54545" stroke="none"/></svg></span><b>28°C</b><span>饭煲内温度</span></div>
     <div class="rp-cell"><span class="rp-ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34a853" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18 9 7l4.2 7.2L15.5 11 21 18z"/><path d="M9 7l1.6 2.8"/></svg></span><b>12 m</b><span>海拔 · 沸点 100°C</span></div>
    </div></div>
   <div class="ctl-card"><h3>模式选择</h3>
    <div class="chip-row rp-mode-row" style="justify-content:flex-start">${Object.keys(MODES).map(m=>`<button class="chip ${rp.mode===m?'on':''}" data-rm="${m}">${RP_MODE_IC[m]}${m}</button>`).join('')}</div></div>
   <div class="ctl-card" id="rpSoftCard"><h3>米饭软硬度</h3>
    <div class="rp-soft">${Object.keys(SOFTD).map(sf=>`<div class="rs ${rp.soft===sf?'on':''}" data-rs="${sf}"><span class="rs-ic">${RP_SOFT_IC[sf]}</span><b>${sf}</b><span>${sf==='颗粒分明'?'偏硬有嚼劲':sf==='柔软适中'?'大众口感':'推荐 · 软糯适口'}</span></div>`).join('')}</div></div>
   <div class="ctl-card" id="rpCurveCard"></div>
   <button class="cook-btn" id="rpStart" style="margin-top:14px">一键煮饭</button>
  </div>`);
  const render=()=>{
    el.querySelector('#rpSoftCard').style.display=rp.mode==='煮饭'?'':'none';
    el.querySelectorAll('[data-rm]').forEach(b=>b.classList.toggle('on',b.dataset.rm===rp.mode));
    el.querySelectorAll('[data-rs]').forEach(b=>b.classList.toggle('on',b.dataset.rs===rp.soft));
    const dur=MODES[rp.mode]+(rp.mode==='煮饭'?SOFTD[rp.soft]:0);
    const fin=new Date(Date.now()+dur*60000);
    const fh=String(fin.getHours()).padStart(2,'0'),fm=String(fin.getMinutes()).padStart(2,'0');
    const W=340,H=150,px=22;
    const T2Y=t=>H-24-(t-25)/(130-25)*(H-46);
    const X=mm=>px+mm/62*(W-px-8);
    let pts;
    if(rp.mode==='煮饭'){
      const soak=rp.soft==='柔软口感'?14:rp.soft==='柔软适中'?11:8;
      const st=rp.soft==='颗粒分明'?62:58;
      pts=[[0,28],[soak,st],[soak+8,96],[dur-12,103],[dur-6,98],[dur,78]];
    }else if(rp.mode==='煮粥')pts=[[0,28],[12,70],[20,96],[dur-10,95],[dur,82]];
    else if(rp.mode==='蛋糕')pts=[[0,28],[10,60],[24,105],[dur-8,118],[dur,90]];
    else pts=[[0,28],[10,60],[22,100],[dur-12,104],[dur-5,110],[dur,85]];
    const line=rpSmooth(pts.map(pt=>[X(pt[0]).toFixed(1),T2Y(pt[1]).toFixed(1)]));
    el.querySelector('#rpCurveCard').innerHTML=`<h3>烹饪温度曲线 · ${rp.mode}${rp.mode==='煮饭'?' · '+rp.soft:''}</h3>
     <svg viewBox="0 0 ${W} ${H}" style="width:100%;margin-top:6px">
      ${[40,70,100,130].map(t=>`<line x1="${px}" y1="${T2Y(t)}" x2="${W-8}" y2="${T2Y(t)}" stroke="#eef0f3" stroke-width="1"/><text x="${px-3}" y="${T2Y(t)+3}" font-size="8" fill="#9aa0a6" text-anchor="end">${t}°</text>`).join('')}
      <path class="lc-line" d="${line}" fill="none" stroke="#f29900" stroke-width="2.2"/>
      ${pts.map(pt=>`<circle cx="${X(pt[0])}" cy="${T2Y(pt[1])}" r="3" fill="#fff" stroke="#f29900" stroke-width="2"/>`).join('')}
     </svg>
     <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--ink3);padding:2px 6px 0"><span>吸水</span><span>加热</span><span>沸腾糊化</span><span>焖饭</span></div>
     <div class="slp-kv" style="margin-top:8px"><span>预计耗时 <b style="color:#f29900">${dur} 分钟</b></span><span class="rg">现在开始烹饪，约 <b style="color:#f29900">${fh}:${fm}</b> 完成</span></div>`;
  };
  el.querySelectorAll('[data-rm]').forEach(b=>b.onclick=()=>{rp.mode=b.dataset.rm;render();});
  el.querySelectorAll('[data-rs]').forEach(b=>b.onclick=()=>{rp.soft=b.dataset.rs;S.riceSoft=rp.soft;render();toast('软硬度已设为「'+rp.soft+'」');});
  el.querySelector('#rpStart').onclick=()=>{
    const dur=MODES[rp.mode]+(rp.mode==='煮饭'?SOFTD[rp.soft]:0);
    S.riceSoft=rp.soft;
    S.rice={dish:rp.mode==='煮饭'?`精煮饭 · ${rp.soft}`:rp.mode,left:dur*60,running:true,cooking:true};
    toast(`电饭煲已启动：${S.rice.dish} · 预计 ${dur} 分钟`);
    closePage();};
  render();
}


/* ================= 鼠标拖拽横滑 ================= */
function dragScroll(el){
  let down=false,sx=0,sl=0,moved=false;
  el.addEventListener('pointerdown',e=>{down=true;moved=false;sx=e.clientX;sl=el.scrollLeft;el.style.scrollSnapType='none';});
  el.addEventListener('pointermove',e=>{if(!down)return;const dx=e.clientX-sx;
    if(Math.abs(dx)>6){moved=true;el.setPointerCapture&&down&&e.preventDefault();}
    el.scrollLeft=sl-dx;});
  ['pointerup','pointercancel','pointerleave'].forEach(ev=>el.addEventListener(ev,()=>{down=false;el.style.scrollSnapType='';}));
  el.addEventListener('click',e=>{if(moved){e.stopPropagation();e.preventDefault();moved=false;}},true);
}
/* ================= 灯光控制页 ================= */
function openLightCtl(d){
  if(d.ctemp===undefined)d.ctemp=3200;
  const bulb=c=>`<svg width="22" height="22" viewBox="0 0 24 24" fill="${c}"><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z"/><path d="M9.5 19h5v.5a2.5 2.5 0 0 1-5 0z"/></svg>`;
  const head=`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button>
   <div class="ac-tt"><h1>${d.name}</h1><span>智能筒射灯 · ${d.room}</span></div>
   <button class="ac-more" id="ltMenu">${AC_MISC_SVG.dots}</button></div>`;
  const el=openPage(head+`<div class="page-scroll" style="padding-bottom:26px">
   <div class="lt-hero">
    <svg width="196" height="196" viewBox="0 0 196 196">
     <defs><linearGradient id="ltg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffd98a"/><stop offset="1" stop-color="#ff8a3d"/></linearGradient></defs>
     <circle id="ltRingC" cx="98" cy="98" r="82" fill="none" stroke="url(#ltg)" stroke-width="15" stroke-linecap="round"/>
    </svg>
    <div class="lt-c" id="ltC"></div>
   </div>
   <div class="ac-card">
    <div class="lt-lab">亮度<i>|</i><b id="ltBriT">${d.bri}%</b></div>
    <div class="xsl-row"><button class="xstep" id="ltBD">−</button>
     <input type="range" class="xslider" id="ltBri" min="1" max="100" value="${d.bri}">
     <button class="xstep" id="ltBU">＋</button></div>
   </div>
   <div class="ac-card">
    <div class="lt-lab">色温<i>|</i><b id="ltCtT">${d.ctemp}K</b></div>
    <div class="xsl-row"><button class="xstep" id="ltCD">−</button>
     <input type="range" class="xslider ct-slider" id="ltCt" min="2700" max="6500" step="100" value="${d.ctemp}">
     <button class="xstep" id="ltCU">＋</button></div>
    <div class="xsl-minmax"><span>2700K 暖光</span><span>6500K 冷光</span></div>
   </div>
   <div class="ac-card" style="text-align:center;padding:22px 18px">
    <button class="lt-power ${d.on?'':'off'}" id="ltPower">${AC_MISC_SVG.power}</button>
    <div style="font-size:12.5px;margin-top:9px">开关</div>
   </div>
  </div>`);
  const bri=el.querySelector('#ltBri'),ct=el.querySelector('#ltCt');
  const sync=()=>{
    bri.style.setProperty('--fill',d.bri+'%');
    el.querySelector('#ltBriT').textContent=d.bri+'%';
    el.querySelector('#ltCtT').textContent=d.ctemp+'K';
    el.querySelector('#ltC').innerHTML=d.on?bulb('#f2994c')+`<span style="color:#f2994c">已开启</span>`:bulb('#b9c0c9')+`<span style="color:#9aa0a6">已关闭</span>`;
    el.querySelector('#ltRingC').setAttribute('stroke',d.on?'url(#ltg)':'#dfe3e8');
    el.querySelector('#ltPower').classList.toggle('off',!d.on);
  };
  const step=(key,v,min,max)=>{d[key]=Math.max(min,Math.min(max,d[key]+v));sync();};
  bri.oninput=()=>{d.bri=+bri.value;sync();};
  ct.oninput=()=>{d.ctemp=+ct.value;sync();};
  el.querySelector('#ltBD').onclick=()=>step('bri',-5,1,100);
  el.querySelector('#ltBU').onclick=()=>step('bri',5,1,100);
  el.querySelector('#ltCD').onclick=()=>step('ctemp',-100,2700,6500);
  el.querySelector('#ltCU').onclick=()=>step('ctemp',100,2700,6500);
  el.querySelector('#ltPower').onclick=()=>{d.on=!d.on;sync();toast(d.name+(d.on?' 已开启':' 已关闭'));};
  el.querySelector('#ltMenu').onclick=()=>{
    const items=[['定时开关','每天 22:30 自动关灯'],['延时关灯','15 分钟后自动关闭'],['设备信息','智能筒射灯 Pro · 已接入格力+'],['分享设备','与家人共享设备控制权']];
    const m=openModal(`<div class="ac-sheet-t">更多</div>${items.map((it,i)=>`<div class="ac-opt" data-mi="${i}"><span><b>${it[0]}</b><p>${it[1]}</p></span></div>`).join('')}`);
    m.querySelectorAll('[data-mi]').forEach(r=>r.onclick=()=>{closeModal(m);toast(items[+r.dataset.mi][0]+'（演示）');});};
  sync();
}

/* ================= 冰箱控制页 ================= */
function openFridgeCtl(d,skipPop){return openFr2Ctl(d,skipPop)}

/* ================= 冰箱控制页 V2（冰蓝鲜储 · 智能保鲜） ================= */
const FR2_IC={
 cam:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l2-2.5h6L17 8h3a1.5 1.5 0 0 1 1.5 1.5V18a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 18V9.5A1.5 1.5 0 0 1 4 8z"/><circle cx="12" cy="13.5" r="3.4"/></svg>',
 fruit:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8c-4.5 0-7 2.8-7 6.5S8 21 12 21s7-2.3 7-6.5S16.5 8 12 8z"/><path d="M12 8V5.5A2.5 2.5 0 0 1 14.5 3"/></svg>',
 scan:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2M4 12h16"/></svg>',
 meat:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 4a5.5 5.5 0 0 1 4 9.4l-8.9 8.9a2.6 2.6 0 0 1-3.7-3.7l8.9-8.9A5.5 5.5 0 0 1 15.5 4z"/><path d="M13 8.5a2.5 2.5 0 0 1 3.5 2.3"/></svg>',
 siri:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/></svg>',
 grid:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M13 2 4.5 13.5H11L9.5 22 19 9.5h-6.5z"/></svg>',
 drop:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3s6.5 6.8 6.5 11.3a6.5 6.5 0 1 1-13 0C5.5 9.8 12 3 12 3z"/></svg>',
 temp:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 14.8V5a2 2 0 1 0-4 0v9.8a4 4 0 1 0 4 0z"/><circle cx="12" cy="18" r="2"/></svg>',
 info:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><circle cx="12" cy="7.6" r=".6" fill="currentColor"/></svg>'};
/* 鲜果舱水果：最佳存储参数与保鲜期模型 */
const FR2_FRUITS=[
 {n:'草莓',days:2,optT:2.0,optH:90,per:1.8,note:'浆果怕闷 · 保持干爽'},
 {n:'蓝莓',days:5,optT:4.0,optH:88,per:1.2,note:'表皮蜡质 · 忌低温冻伤'},
 {n:'车厘子',days:4,optT:1.0,optH:89,per:1.5,note:'低温锁鲜 · 避免挤压'}];
function fr2FreshDays(f,t){return Math.max(1,Math.round(f.days-(t-f.optT)*f.per))}
function openFr2Ctl(d,skipPop){
  if(d.coldT===undefined){d.coldT=5;d.freezeT=-20;d.varT=0;d.smart=true;d.ster=true;}
  if(d.light===undefined)d.light=true;
  if(d.grid===undefined)d.grid=true;
  const model='BCD-501W';
  /* 食材数据与厨房页同源（FOODS）：新鲜 days>7 / 临期 0~7 / 过期 <0 */
  const fdN=FOODS.length,fdExp=FOOD_EXP(),fdNear=FOOD_NEAR(),fdFresh=fdN-fdExp.length-fdNear.length;
  const fr2Tag=f=>f.days<0?[`已过期 ${-f.days} 天`,'#dc2626','#fee2e2']:f.days<=3?[`剩 ${f.days} 天`,'#dc2626','#fee2e2']:f.days<=7?[`剩 ${f.days} 天`,'#d97706','#fef3c7']:['新鲜','#16a34a','#dcfce7'];
  const head=`<div class="fr2-head" style="padding-top:46px">
   <button class="fr2-ico" data-back>${svgBack}</button>
   <div class="fr2-head-t"><h1>冰箱</h1><p>${model} 大两门 · ${d.room}</p></div>
   <button class="fr2-ico" id="fr2Menu">${AC_MISC_SVG.dots}</button></div>`;
  const zones=[['冷藏室',d.coldT,'coldT',2,8,.5,'#0284c7'],['冷藏室',d.coldT,'coldT',2,8,.5,'#0284c7'],
   ['变温室',d.varT,'varT',-7,5,1,'#0891b2'],['变温室',d.varT,'varT',-7,5,1,'#0891b2'],
   ['冷冻室',d.freezeT,'freezeT',-24,-16,1,'#4f46e5'],['冷冻室',d.freezeT,'freezeT',-24,-16,1,'#4f46e5']];
  const body=`
  <section class="fr2-hero"><div class="fr2-hero-in">
   <div style="min-width:0">
    <span class="fr2-badge">保鲜运行中</span>
    <div class="fr2-big"><b id="fr2Big">${d.coldT.toFixed(1)}°C</b></div>
    <p class="fr2-cap">冷藏 · 风冷无霜 · 智能模式</p>
    <div class="fr2-env">
     <div><p>变温</p><b id="fr2EnvV">${d.varT.toFixed(0)}°C</b></div>
     <div><p>冷冻</p><b id="fr2EnvF">${d.freezeT.toFixed(0)}°C</b></div>
     <div><p>湿度</p><b>88%</b></div>
    </div>
    <p class="fr2-sync">数据实时同步 · 刚刚更新</p>
   </div>
   <div class="fr2-hero-img"><img src="img/fridge_new.png" alt="冰箱"></div>
  </div></section>

  <div class="fr2-sec"><h2>温区温度</h2><span class="sub">点击温区可微调</span></div>
  <div class="fr2-zones" id="fr2Zones">
   ${zones.map((z,i)=>`<button class="fr2-zone" data-zone="${i}"><span>${z[0]}</span><b style="color:${z[6]}">${z[1].toFixed(1)}°C</b></button>`).join('')}
  </div>

  <div class="fr2-sec"><h2>鲜果舱 · 食材新鲜度</h2><span class="sub">3 秒无感识别</span></div>
  <section class="fr2-card">
   <div class="fr2-card-t"><b>舱内水果 · ${FR2_FRUITS.length} 种</b><span>上摄像头已识别种类与位置</span></div>
   <div class="fr2-airow">
    <span class="fr2-sw on" id="fr2AiSw"><i></i></span>
    <div class="fr2-airow-t"><b>AI 综合保鲜</b><p>多食材同舱 · 智能平衡保鲜参数</p></div>
    <button class="fr2-ai-info" id="fr2AiInfo">${FR2_IC.info}<span>保鲜策略</span></button>
   </div>
   <div id="fr2FreshBox"></div>
  </section>

  <div class="fr2-sec"><h2>近红外光谱新鲜度</h2><span class="sub">牛排 · 冰鲜抽屉</span></div>
  <section class="fr2-card">
   <div class="fr2-meat-h">
    <span class="fr2-li-ic">${FR2_IC.meat}</span>
    <div style="flex:1;min-width:0"><b>牛排 · 新鲜度 92</b><p>近红外光谱检测 · 建议 8月13日 前食用</p></div>
    <span class="fr2-tag" style="background:#dcfce7;color:#16a34a">新鲜</span>
   </div>
   <div class="fr2-kpis" style="grid-template-columns:repeat(4,1fr)">
    <div class="fr2-kpi"><b>8.2</b><span>TVB-N<br>mg/100g</span></div>
    <div class="fr2-kpi"><b>22%</b><span>脂肪</span></div>
    <div class="fr2-kpi"><b>19.8%</b><span>蛋白质</span></div>
    <div class="fr2-kpi"><b>68%</b><span>水分</span></div>
   </div>
   <div class="fr2-ctl-t" style="margin-top:14px"><b>新鲜度智能温控</b><span>已自动调至推荐值</span></div>
   <div class="fr2-tadj">
    <button class="fr2-step" id="fr2MeatDn">−</button>
    <div class="fr2-tadj-v"><b id="fr2MeatT">-1.5°C</b><span id="fr2MeatCap">冰鲜温区 · 保鲜约 6 天</span></div>
    <button class="fr2-step" id="fr2MeatUp">＋</button>
   </div>
  </section>

  <div class="fr2-sec"><h2>食材管理</h2><span class="sub">${fdN} 种 · 已过期 ${fdExp.length} · 临期 ${fdNear.length}</span></div>
  <section class="fr2-card">
   ${fdExp.length?`<div class="fr2-expbanner" id="fr2ExpBanner">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3 2.5 20h19z"/><path d="M12 9.5v4.5"/><circle cx="12" cy="17" r=".5" fill="currentColor"/></svg>
    <span>${fdExp.map(f=>f.name).join('、')} 已过期，请尽快处理</span><b id="fr2ExpGo">查看 ›</b></div>`:''}
   <div class="fr2-donut-row">
    <div class="fr2-donut">
     <svg viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="48" fill="none" stroke="#eef3f8" stroke-width="14"/>
      <circle cx="60" cy="60" r="48" fill="none" stroke="#22c55e" stroke-width="14" stroke-linecap="round"
       stroke-dasharray="${(fdFresh/fdN*2*Math.PI*48).toFixed(1)} 999" transform="rotate(-90 60 60)"/>
      <circle cx="60" cy="60" r="48" fill="none" stroke="#f59e0b" stroke-width="14"
       stroke-dasharray="${(fdNear.length/fdN*2*Math.PI*48).toFixed(1)} 999" transform="rotate(${-90+fdFresh/fdN*360} 60 60)"/>
      <circle cx="60" cy="60" r="48" fill="none" stroke="#ef4444" stroke-width="14"
       stroke-dasharray="${(fdExp.length/fdN*2*Math.PI*48).toFixed(1)} 999" transform="rotate(${-90+(fdFresh+fdNear.length)/fdN*360} 60 60)"/>
      <text x="60" y="58" text-anchor="middle" font-size="26" font-weight="700" fill="#1c2733">${fdN}</text>
      <text x="60" y="76" text-anchor="middle" font-size="11" fill="#9aa8b5">种食材</text>
     </svg>
    </div>
    <div class="fr2-legend">
     <div><i style="background:#22c55e"></i>新鲜<b>${fdFresh}</b></div>
     <div><i style="background:#f59e0b"></i>临期<b>${fdNear.length}</b></div>
     <div><i style="background:#ef4444"></i>过期<b>${fdExp.length}</b></div>
    </div>
   </div>
   <div class="fr2-tabs" id="fr2FoodTabs">
    <button class="on" data-ft="all">全部 ${fdN}</button><button data-ft="fresh">保鲜中 ${fdFresh}</button><button data-ft="warn">临期 ${fdNear.length}</button><button data-ft="over">过期 ${fdExp.length}</button>
   </div>
   <div class="fr2-foodlist" id="fr2FoodList"></div>
   <div class="fr2-addrow">
    <button class="fr2-add" id="fr2AddManual">＋ 手动添加</button>
    <button class="fr2-add alt" id="fr2AddCam">${FR2_IC.cam}<span>拍照添加</span></button>
   </div>
   <div class="fr2-note">${ACN_INFO}<span>上摄像头识别食材种类与位置；下摄像头（包装与文字识别）将于 9 月上线。语音录入与小票识别即将开放。</span></div>
  </section>

  <div class="fr2-sec"><h2>智能生活</h2></div>
  <section class="fr2-card">
   <div class="fr2-lrow"><div><b>净味</b><p>除菌净味 · 保持箱内清新</p></div><span class="fr2-sw ${d.ster?'on':''}" id="fr2Ster"><i></i></span></div>
   <div class="fr2-lrow"><div><b>灯光</b><p>冷藏室照明 · 已开启</p></div><span class="fr2-sw ${d.light?'on':''}" id="fr2Light"><i></i></span></div>
   <div class="fr2-lrow" style="border:none"><div><b>智能电网</b><p>延迟电冰箱负载 · 已开启</p></div><span class="fr2-sw ${d.grid?'on':''}" id="fr2Grid"><i></i></span></div>
  </section>

  <div class="fr2-sec"><h2>智能控制</h2></div>
  <div class="fr2-list">
   <div class="fr2-li" id="fr2Siri"><span class="fr2-li-ic">${FR2_IC.siri}</span><div style="flex:1;min-width:0"><b>Siri 快捷控制</b><p>设置 Siri 语音指令 · 已添加 2 条</p></div><span class="fr2-go">${svgArrow}</span></div>
   <div class="fr2-li" id="fr2Scene"><span class="fr2-li-ic">${FR2_IC.grid}</span><div style="flex:1;min-width:0"><b>智能场景</b><p>推荐场景 · 我的场景</p></div><span class="fr2-go">${svgArrow}</span></div>
  </div>

  <div class="fr2-sec"><h2>设备报告</h2><span class="sub" id="fr2His" style="cursor:pointer">历史记录 ›</span></div>
  <section class="fr2-card">
   <div class="fr2-kpis" style="grid-template-columns:1fr 1fr">
    <div class="fr2-kpi"><b>1.5<small style="font-size:10px;font-weight:500"> 度</small></b><span>今日用电</span></div>
    <div class="fr2-kpi"><b>5<small style="font-size:10px;font-weight:500"> 次</small></b><span>今日开门次数</span></div>
   </div>
   <div class="fr2-card-t" style="margin-top:14px"><b>开关门记录</b><span>今天</span></div>
   <div class="fr2-tl">
    <div class="fr2-tl-i"><span class="dot open"></span><div class="tt"><b>14:59:50 冷藏室开门</b><b>14:59:50 冷藏室关门</b></div><span class="dur">10秒</span></div>
    <div class="fr2-tl-i"><span class="dot open"></span><div class="tt"><b>12:31:06 冷冻室开门</b><b>12:31:14 冷冻室关门</b></div><span class="dur">8秒</span></div>
    <div class="fr2-tl-i"><span class="dot open"></span><div class="tt"><b>09:12:44 冷藏室开门</b><b>09:12:52 冷藏室关门</b></div><span class="dur">8秒</span></div>
   </div>
  </section>
  <div style="height:8px"></div>`;
  const el=openPage(`<div class="fr2-wrap">${head}<div class="fr2-body">${body}</div>
   <button class="fr2-voice" id="fr2Voice">${FR2_IC.siri}</button></div>`);
  /* 温区微调 */
  el.querySelectorAll('#fr2Zones [data-zone]').forEach(b=>b.onclick=()=>{
    const z=zones[+b.dataset.zone],key=z[2];
    const step=v=>Math.max(z[3],Math.min(z[4],+(v).toFixed(1)));
    const m=openModal(`<div class="ac-sheet-t">${z[0]}温度</div>
     <div class="fr2-tadj" style="margin:4px 4px 10px">
      <button class="fr2-step" id="tzDn">−</button>
      <div class="fr2-tadj-v"><b id="tzV">${d[key].toFixed(1)}°C</b><span>范围 ${z[3]}°C ~ ${z[4]}°C</span></div>
      <button class="fr2-step" id="tzUp">＋</button>
     </div>
     <div class="ac-opt" data-close><span style="margin:auto;color:#0284c7">完成</span></div>`);
    const sy=()=>{m.querySelector('#tzV').textContent=d[key].toFixed(1)+'°C';
      el.querySelectorAll(`#fr2Zones [data-zone]`).forEach(x=>{if(zones[+x.dataset.zone][2]===key)x.querySelector('b').textContent=d[key].toFixed(1)+'°C';});
      if(key==='coldT')el.querySelector('#fr2Big').textContent=d.coldT.toFixed(1)+'°C';
      if(key==='varT')el.querySelector('#fr2EnvV').textContent=d.varT.toFixed(0)+'°C';
      if(key==='freezeT')el.querySelector('#fr2EnvF').textContent=d.freezeT.toFixed(0)+'°C';};
    m.querySelector('#tzDn').onclick=()=>{d[key]=step(d[key]-z[5]);sy();};
    m.querySelector('#tzUp').onclick=()=>{d[key]=step(d[key]+z[5]);sy();};});
  /* 鲜果舱：AI 综合保鲜 / 手动统一设置 */
  let freshMode='multi',selFruit=0; /* selFruit:-1=自定义 */
  const man={t:FR2_FRUITS[0].optT,h:FR2_FRUITS[0].optH};
  const multiT={t:2.0};
  const renderFresh=()=>{
    const box=el.querySelector('[id="fr2FreshBox"]');
    if(freshMode==='multi'){
      const t=multiT.t;
      box.innerHTML=`
      <div class="fr2-strategy">
       <div class="fr2-st-h"><b>AI 已设定舱内环境</b><span>优先保障最易过期食材</span></div>
       <div class="fr2-tadj fr2-tadj-ro">
        <div class="fr2-tadj-v"><b>${t.toFixed(1)}°C · 湿度 90%</b><span>AI 自动平衡舱内温湿度 · 无需手动调节</span></div>
       </div>
       <div class="fr2-st-list">
        ${FR2_FRUITS.map((f,i)=>`<div class="fr2-st-row"><span>${f.n}</span><span class="rec">${f.note} · 最佳 ${f.optT.toFixed(1)}°C</span><b class="${fr2FreshDays(f,t)<=2?'warn':''}">保鲜 ${fr2FreshDays(f,t)} 天</b></div>`).join('')}
       </div>
       <div class="fr2-note" style="margin-top:10px">${ACN_INFO}<span>草莓最易过期，系统按其最佳温度优先保障；其余水果保鲜期已按当前舱温重新校准。如需自定义温湿度，可关闭 AI 综合保鲜。</span></div>
      </div>`;
    }else{
      const ref=selFruit>=0?FR2_FRUITS[selFruit]:null;
      box.innerHTML=`
      <div class="fr2-strategy">
       <div class="fr2-st-h"><b>手动保鲜设置</b><span>全舱统一温湿度</span></div>
       <div class="fr2-quick">
        ${FR2_FRUITS.map((x,i)=>`<button class="fr2-qk ${i===selFruit?'on':''}" data-qk="${i}"><b>${x.n}</b><span>${x.optT.toFixed(0)}°C · ${x.optH}%</span></button>`).join('')}
        <button class="fr2-qk ${selFruit===-1?'on':''}" data-qk="-1"><b>自定义</b><span>手动调节</span></button>
       </div>
       <div class="fr2-tadj" style="margin-top:12px">
        <button class="fr2-step" id="fsDn">−</button>
        <div class="fr2-tadj-v"><b>${man.t.toFixed(1)}°C</b><span>舱内温度${ref?` · ${ref.n}最佳 ${ref.optT.toFixed(1)}°C`:' · 自定义'}</span></div>
        <button class="fr2-step" id="fsUp">＋</button>
       </div>
       <div class="fr2-tadj" style="margin-top:8px">
        <button class="fr2-step" id="fsHn">−</button>
        <div class="fr2-tadj-v"><b>${man.h}%</b><span>舱内湿度${ref?` · ${ref.n}最佳 ${ref.optH}%`:' · 自定义'}</span></div>
        <button class="fr2-step" id="fsHp">＋</button>
       </div>
       <div class="fr2-st-list">
        ${FR2_FRUITS.map(f=>{const dys=fr2FreshDays(f,man.t);const best=f.optT===man.t&&f.optH===man.h;
         return `<div class="fr2-st-row"><span>${f.n}</span><span class="rec">${f.note} · 最佳 ${f.optT.toFixed(1)}°C · ${f.optH}%${best?'（当前最佳）':''}</span><b class="${dys<=2?'warn':''}">保鲜 ${dys} 天</b></div>`}).join('')}
       </div>
       <div class="fr2-note" style="margin-top:10px">${ACN_INFO}<span>舱内温湿度为统一设置，无法按水果分别调节；点击水果可一键应用其最佳参数，手动微调后将进入自定义模式。</span></div>
      </div>`;
      box.querySelectorAll('[data-qk]').forEach(x=>x.onclick=()=>{selFruit=+x.dataset.qk;
        if(selFruit>=0){man.t=FR2_FRUITS[selFruit].optT;man.h=FR2_FRUITS[selFruit].optH;}
        renderFresh();});
      const toCustom=()=>{selFruit=-1;};
      box.querySelector('#fsDn').onclick=()=>{toCustom();man.t=Math.max(0,+(man.t-.5).toFixed(1));renderFresh();};
      box.querySelector('#fsUp').onclick=()=>{toCustom();man.t=Math.min(8,+(man.t+.5).toFixed(1));renderFresh();};
      box.querySelector('#fsHn').onclick=()=>{toCustom();man.h=Math.max(60,man.h-1);renderFresh();};
      box.querySelector('#fsHp').onclick=()=>{toCustom();man.h=Math.min(95,man.h+1);renderFresh();};
    }
  };
  const aiSw=el.querySelector('#fr2AiSw');
  aiSw.onclick=()=>{aiSw.classList.toggle('on');const on=aiSw.classList.contains('on');
    freshMode=on?'multi':'single';renderFresh();
    toast(on?'已开启 AI 综合保鲜':'已关闭 AI 综合保鲜 · 可按水果逐一设置');};
  el.querySelector('#fr2AiInfo').onclick=()=>{
    openModal(`<div class="ac-sheet-t">AI 综合保鲜 · 保鲜策略</div>
     <p style="font-size:12.5px;color:#5f7285;line-height:1.8;padding:0 4px 10px">多种水果同舱存放时，保鲜需求各不相同。开启 AI 综合保鲜后，系统将按下述策略自动平衡舱内环境：</p>
     <div class="fr2-stp"><i>1</i><div><b>无感识别</b><p>上摄像头 3 秒识别舱内水果的种类、数量与摆放位置，无需手动录入。</p></div></div>
     <div class="fr2-stp"><i>2</i><div><b>优先保障最易过期</b><p>以保鲜期最短的水果（当前为草莓，剩 2 天）的最佳存储温度为基准，优先延长其保鲜时长。</p></div></div>
     <div class="fr2-stp"><i>3</i><div><b>重新校准其余水果</b><p>其余水果的预计保鲜期将按实际舱温重新计算并实时展示，偏离最佳温度每 +1°C，保鲜期相应缩短。</p></div></div>
     <div class="fr2-stp"><i>4</i><div><b>自动切换保障对象</b><p>取走最易过期的水果后，系统会自动切换到新的优先保障对象并重新设定舱温；如需自定义温湿度，可关闭 AI 综合保鲜开关。</p></div></div>
     <div class="ac-opt" data-close style="margin-top:14px"><span style="margin:auto;color:#0284c7">我知道了</span></div>`);};
  renderFresh();
  /* 近红外温控 */
  let meatT=-1.5;
  const syMeat=()=>{el.querySelector('#fr2MeatT').textContent=meatT.toFixed(1)+'°C';
    const days=Math.max(2,Math.round(6-(meatT+1.5)*2));
    el.querySelector('#fr2MeatCap').textContent='冰鲜温区 · 保鲜约 '+days+' 天';};
  el.querySelector('#fr2MeatDn').onclick=()=>{meatT=Math.max(-4,+(meatT-.5).toFixed(1));syMeat();};
  el.querySelector('#fr2MeatUp').onclick=()=>{meatT=Math.min(2,+(meatT+.5).toFixed(1));syMeat();};
  /* 食材管理 tabs（数据与厨房页同源 FOODS，真实图文） */
  let foodTab='all';
  const stOf=f=>f.days<0?'over':(f.days<=7?'warn':'fresh');
  const renderFoods=()=>{
    const list=FOODS.filter(f=>foodTab==='all'||stOf(f)===foodTab).slice().sort((a,b)=>a.days-b.days);
    el.querySelector('#fr2FoodList').innerHTML=list.map(f=>{
      const ft=fr2Tag(f);
      return `<div class="fr2-food" data-fd="${f.name}"><img class="fr2-food-img" src="${f.img}" alt="${f.name}"><div style="flex:1;min-width:0"><b>${f.name}</b><p>${f.pos} · ${f.qty}</p></div><span class="fr2-tag" style="background:${ft[2]};color:${ft[1]}">${ft[0]}</span></div>`}).join('')
      ||'<p style="font-size:11px;color:#9aa8b5;text-align:center;padding:14px 0">暂无食材</p>';
    el.querySelectorAll('#fr2FoodList [data-fd]').forEach(r=>r.onclick=()=>openIngredient(FOODS.find(f=>f.name===r.dataset.fd)));};
  el.querySelectorAll('#fr2FoodTabs button').forEach(b=>b.onclick=()=>{foodTab=b.dataset.ft;
    el.querySelectorAll('#fr2FoodTabs button').forEach(x=>x.classList.toggle('on',x===b));renderFoods();});
  renderFoods();
  const goExpTab=()=>{foodTab='over';
    el.querySelectorAll('#fr2FoodTabs button').forEach(x=>x.classList.toggle('on',x.dataset.ft==='over'));renderFoods();
    el.querySelector('#fr2FoodTabs').scrollIntoView({behavior:'smooth',block:'center'});};
  const expGo=el.querySelector('#fr2ExpGo');if(expGo)expGo.onclick=goExpTab;
  el.querySelector('#fr2AddManual').onclick=()=>{
    const m=openModal(`<div class="ac-sheet-t">手动添加食材</div>
     <div class="ac-opt"><span>食材名称</span><b style="margin-left:auto;color:#9aa8b5;font-weight:400">点击输入</b></div>
     <div class="ac-opt"><span>存放位置</span><b style="margin-left:auto;color:#9aa8b5;font-weight:400">冷藏室 / 鲜果舱 / 冷冻室</b></div>
     <div class="ac-opt" data-close><span style="margin:auto;color:#0284c7">保存（演示）</span></div>`);};
  el.querySelector('#fr2AddCam').onclick=()=>openCamMock('请对准食材拍照','识别成功：青椒 ×3，已录入冷藏室',()=>{
    FOODS.push({name:'青椒',cat:'蔬菜',img:'img/pepper.png',pos:'冷藏室 L3 · C 格',qty:'3 个',days:7,
      baike:'青椒维生素 C 含量在蔬菜中名列前茅，口感脆嫩爽口，可炒可拌。',
      keep:'保鲜袋包裹后冷藏，建议 7 天内食用，避免与苹果同放以免催熟。',
      nut:'每 100g 含维生素 C 约 72mg、膳食纤维 1.4g，热量极低。',
      dishes:['青椒炒肉丝','虎皮青椒']});
    closePage();openFr2Ctl(d,true);});
  /* 进入冰箱页：过期食材弹窗提醒（与厨房页一致） */
  if(!skipPop&&fdExp.length)setTimeout(()=>{
    const m=openModal(`<h3 style="font-size:15px;font-weight:700">食材过期提醒</h3>
     <p style="font-size:11.5px;color:#5f7285;margin-top:8px;line-height:1.7">以下食材已过保质期，请勿食用并尽快处理：</p>
     ${fdExp.map(f=>{const ft=fr2Tag(f);return `<div class="msg-item" style="margin-top:9px;cursor:pointer;display:flex;gap:10px;align-items:center" data-expf="${f.name}">
       <img src="${f.img}" style="width:40px;height:40px;object-fit:contain;flex:0 0 auto">
       <div class="mi-t" style="flex:1;min-width:0"><div class="mi-top"><h4>${f.name}</h4><span class="mi-tag" style="color:${ft[1]};background:${ft[2]}">${ft[0]}</span></div>
       <p>${f.pos} · ${f.qty}</p></div></div>`}).join('')}
     <div style="display:flex;gap:9px;margin-top:14px">
       <button class="cook-btn" id="fr2ExpShop" style="flex:1;background:#f1f3f6;color:#1c2733;box-shadow:none">采购替代品</button>
       <button class="cook-btn" data-close style="flex:1">知道了</button></div>`,{center:true});
    m.querySelectorAll('[data-expf]').forEach(b=>b.onclick=()=>{closeModal(m);openIngredient(FOODS.find(f=>f.name===b.dataset.expf));});
    m.querySelector('#fr2ExpShop').onclick=()=>{closeModal(m);openFoodShop();};
  },380);
  /* 智能生活开关 */
  const bindSw=(id,key,name,onT,offT)=>{const sw=el.querySelector(id);
    sw.onclick=()=>{sw.classList.toggle('on');d[key]=sw.classList.contains('on');toast(name+(d[key]?onT:offT));};};
  bindSw('#fr2Ster','ster','除菌净味',' 已开启',' 已关闭');
  bindSw('#fr2Light','light','冷藏室灯光',' 已开启',' 已关闭');
  bindSw('#fr2Grid','grid','智能电网延迟负载',' 已开启',' 已关闭');
  /* Siri / 场景 */
  el.querySelector('#fr2Siri').onclick=()=>{
    const cmds=['冷藏室调低 1 度','打开净味模式'];
    const m=openModal(`<div class="ac-sheet-t">Siri 快捷控制</div>
     <p style="font-size:12px;color:#5f7285;padding:0 4px 8px;line-height:1.7">对 Siri 说出指令即可控制冰箱，支持添加与删除。</p>
     <div id="siriList">${cmds.map(c=>`<div class="ac-opt"><span><b>「${c}」</b></span><b style="margin-left:auto;color:#dc2626;cursor:pointer" data-del="${c}">删除</b></div>`).join('')}</div>
     <div class="ac-opt" id="siriAdd"><span style="margin:auto;color:#0284c7">＋ 添加 Siri 语音指令</span></div>`);
    m.querySelectorAll('[data-del]').forEach(x=>x.onclick=()=>{x.closest('.ac-opt').remove();toast('已删除 Siri 指令（演示）');});
    m.querySelector('#siriAdd').onclick=()=>toast('Siri 指令录制入口（演示）');};
  el.querySelector('#fr2Scene').onclick=()=>{
    const m=openModal(`<div class="ac-sheet-t">智能场景</div>
     <p style="font-size:11px;color:#9aa8b5;padding:0 4px 8px;letter-spacing:.08em">推荐场景</p>
     <div class="ac-opt" data-scn="假日模式"><span><b>假日模式</b><p>外出期间低能耗运行，冷藏调高至 8°C</p></span><b style="margin-left:auto;color:#0284c7">开启</b></div>
     <div class="ac-opt" data-scn="囤货模式"><span><b>囤货模式</b><p>大量食材存入，速冷 + 净味加强 24 小时</p></span><b style="margin-left:auto;color:#0284c7">开启</b></div>
     <p style="font-size:11px;color:#9aa8b5;padding:10px 4px 8px;letter-spacing:.08em">我的场景</p>
     <div class="ac-opt" data-scn="夜间静音"><span><b>夜间静音</b><p>22:00-7:00 压缩机低频运行</p></span><span class="switch on" style="margin-left:auto"></span></div>
     <div class="ac-opt" id="scnNew"><span style="margin:auto;color:#0284c7">＋ 自定义场景</span></div>`);
    m.querySelectorAll('[data-scn]').forEach(r=>r.onclick=()=>{closeModal(m);toast('已开启「'+r.dataset.scn+'」场景');});
    m.querySelectorAll('.switch').forEach(sw=>sw.onclick=e=>{e.stopPropagation();sw.classList.toggle('on');});
    m.querySelector('#scnNew').onclick=()=>toast('自定义场景编辑器（演示）');};
  el.querySelector('#fr2His').onclick=()=>toast('演示环境：历史开关门记录');
  el.querySelector('#fr2Voice').onclick=()=>{
    const m=openModal(`<div class="ac-sheet-t">语音助手</div>
     <p style="font-size:12.5px;color:#5f7285;line-height:1.8;padding:0 4px 6px">试试说：「草莓还能放几天」「把冷冻室调到 -22 度」「牛肉新鲜吗」。语音可完成食材管理、设备控制与场景切换。</p>
     <div class="ac-opt" data-close><span style="margin:auto;color:#0284c7">按住说话（演示）</span></div>`);};
  el.querySelector('#fr2Menu').onclick=()=>{
    const items=[['设备信息',model+' 大两门智能冰箱 · 已接入格力+'],['假日模式','外出时低能耗运行'],['分享设备','与家人共享设备控制权'],['常见问题','查看冰箱使用帮助']];
    const m=openModal(`<div class="ac-sheet-t">更多</div>${items.map((it,i)=>
      `<div class="ac-opt" data-mi="${i}"><span><b>${it[0]}</b><p>${it[1]}</p></span></div>`).join('')}`);
    m.querySelectorAll('[data-mi]').forEach(r=>r.onclick=()=>{closeModal(m);toast(items[+r.dataset.mi][0]+'（演示）');});};
}


/* ================= 公用小图标（烟机/洗碗/热水器/电饭煲） ================= */
const PW_POWER='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1"><path d="M12 3v8"/><path d="M6.3 6.5a8 8 0 1 0 11.4 0" stroke-linecap="round"/></svg>';
const PLAY_SM='<svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><path d="M7 4.8v14.4L19 12z"/></svg>';
const HD_GEST='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 12V6.2a1.4 1.4 0 0 1 2.8 0v4"/><path d="M11.3 10.5V4.8a1.4 1.4 0 0 1 2.8 0v5.7"/><path d="M14.1 11V6.4a1.4 1.4 0 0 1 2.8 0V13"/><path d="M17 13c0 4.5-2.4 7-6 7-3 0-4.8-1.8-5.8-4.6l-1-2.6a1.4 1.4 0 0 1 2.4-1.3l1.9 2"/></svg>';
const HD_AI='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4.5 12a7.5 7.5 0 0 1 13-5.2" /><path d="M19.5 12a7.5 7.5 0 0 1-13 5.2"/><path d="M17.5 3.5v3.3h-3.3M6.5 20.5v-3.3h3.3"/><path d="M9.6 14.6 12 9l2.4 5.6M10.4 13h3.2"/></svg>';

/* ================= 油烟机控制页 ================= */
const HOOD_IMG=`<svg width="196" height="126" viewBox="0 0 200 130">
 <defs><linearGradient id="hdgA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d3d8de"/><stop offset="1" stop-color="#9aa1a9"/></linearGradient>
 <linearGradient id="hdgB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd6f2"/><stop offset="1" stop-color="#3a9bd0"/></linearGradient></defs>
 <rect x="60" y="4" width="80" height="44" rx="5" fill="url(#hdgA)"/>
 <rect x="50" y="48" width="100" height="32" rx="4" fill="#5c636b"/>
 <rect x="50" y="48" width="100" height="13" rx="4" fill="url(#hdgB)"/>
 <rect x="82" y="64" width="36" height="10" rx="2" fill="#2c3138"/>
 <path d="M62 84h76l10 36H52z" fill="#bd9058"/>
 <path d="M68 90h64l7 24H61z" fill="#dcb67e"/>
</svg>`;
function openHoodCtl(d){
  const GEARS=['1档','2档','3档','4档','爆炒'];
  d.gear=d.gear||2;
  const head=`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button>
   <div class="ac-tt"><h1>油烟机</h1><span>${d.name} · ${d.room}</span></div>
   <button class="ac-more" id="hdMenu">${AC_MISC_SVG.dots}</button></div>`;
  const el=openPage(head+`<div class="page-scroll" style="padding-bottom:16px;background:linear-gradient(180deg,#fdeee2 0%,#fdf8f3 34%,#f4f5f7 78%)">
   <div class="hd-top"><div class="it" id="hdAc"><h4>空调</h4><p>24°C制冷</p></div><div class="it on"><h4>烟机</h4><p id="hdGearTop">${GEARS[d.gear-1]}</p></div></div>
   <div style="text-align:center;padding:8px 0 0">${HOOD_IMG}</div>
   <div style="display:flex;justify-content:center;gap:64px;padding:4px 0 6px">
    <div style="text-align:center"><b style="font-size:17px">27°C</b><p style="font-size:11px;color:var(--ink2);margin-top:2px">室外温度</p></div>
    <div style="text-align:center"><b style="font-size:17px">27°C</b><p style="font-size:11px;color:var(--ink2);margin-top:2px">室内温度</p></div></div>
   <div class="pw-card" style="display:flex;align-items:center;justify-content:space-between"><b style="font-size:15px">开关</b>
    <button class="pw-power ${d.on===false?'off':''}" id="hdPower">${PW_POWER}</button></div>
   <div class="pw-card"><div style="display:flex;gap:10px;align-items:baseline"><b style="font-size:14px">档位</b><span style="font-size:12.5px;color:var(--ink2)" id="hdGearV">${GEARS[d.gear-1]}</span></div>
    <input type="range" class="xslider" id="hdGear" min="1" max="5" step="1" value="${d.gear}" style="--sl-a:#ffb25c;--sl-b:#f2441d;width:100%;margin-top:14px;--fill:${(d.gear-1)/4*100}%">
    <div class="seg-labels">${GEARS.map(g=>`<span>${g}</span>`).join('')}</div></div>
   <div class="pw-sec">常用功能</div>
   <div class="pw-card"><div class="tile-grid">
    <div class="tile ${d.ai?'on':''}" data-hf="ai"><span style="display:inline-flex">${HD_AI}</span><h5>智能烟感</h5><p>${d.ai?'开启':'关闭'}</p></div>
    <div class="tile ${d.light?'on':''}" data-hf="light"><span style="display:inline-flex">${OV_BULB}</span><h5>照明</h5><p>${d.light?'开启':'关闭'}</p></div>
    <div class="tile ${d.gest?'on':''}" data-hf="gest"><span style="display:inline-flex">${HD_GEST}</span><h5>手势</h5><p>${d.gest?'开启':'关闭'}</p></div>
   </div></div>
   <div class="pw-card" style="padding-top:4px;padding-bottom:4px">
    <div class="kv" style="border:none;padding:11px 0"><span style="color:var(--ink);font-size:13.5px">新风</span><span style="display:flex;align-items:center;gap:10px"><span style="font-size:11.5px;color:var(--ink3)">30次 | 30分钟</span><span class="switch ${d.fresh?'on':''}" id="hdFreshSw"></span></span></div>
    <div class="kv" style="border:none;padding:11px 0;cursor:pointer" id="hdLink"><span style="color:var(--ink);font-size:13.5px">烟灶联动</span><span style="font-size:12px;color:var(--ink3)" id="hdLinkV">${d.link?'已配对 厨房燃气灶':'未配对'} ›</span></div>
    <div class="kv" style="border:none;padding:11px 0;cursor:pointer" id="hdCup"><span style="color:var(--ink);font-size:13.5px">油杯洁净提醒</span><span style="font-size:12px;color:var(--ink3)">›</span></div>
   </div>
  </div>`);
  el.querySelector('#hdMenu').onclick=()=>toast('油烟机设置');
  el.querySelector('#hdAc').onclick=()=>toast('空调控制请进入空调设备页');
  const pw=el.querySelector('#hdPower');
  pw.onclick=()=>{d.on=d.on===false?true:false;pw.classList.toggle('off',d.on===false);toast(d.on===false?'油烟机已关机':'油烟机已开机');};
  const sl=el.querySelector('#hdGear');
  sl.oninput=()=>{d.gear=+sl.value;sl.style.setProperty('--fill',(d.gear-1)/4*100+'%');
    el.querySelector('#hdGearV').textContent=GEARS[d.gear-1];
    el.querySelector('#hdGearTop').textContent=GEARS[d.gear-1];};
  sl.onchange=()=>toast('烟机档位已设为「'+GEARS[d.gear-1]+'」');
  el.querySelectorAll('[data-hf]').forEach(t=>t.onclick=()=>{
    if(d.on===false)return toast('请先开机');
    const k=t.dataset.hf;d[k]=!d[k];t.classList.toggle('on',d[k]);
    t.querySelector('p').textContent=d[k]?'开启':'关闭';
    toast(t.querySelector('h5').textContent+(d[k]?' 已开启':' 已关闭'));});
  const fs=el.querySelector('#hdFreshSw');
  fs.onclick=()=>{d.fresh=!d.fresh;fs.classList.toggle('on',d.fresh);toast(d.fresh?'新风已开启（30次 | 30分钟）':'新风已关闭');};
  el.querySelector('#hdLink').onclick=()=>{d.link=!d.link;
    el.querySelector('#hdLinkV').textContent=(d.link?'已配对 厨房燃气灶':'未配对')+' ›';
    toast(d.link?'已与「厨房燃气灶」配对，点火自动开烟机':'已解除烟灶联动');};
  el.querySelector('#hdCup').onclick=()=>toast('油杯已使用约 120 小时，预计 30 小时后提醒清洗');
}

/* ================= 洗碗机控制页 ================= */
const DSH_BOWL=s=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 11.5h16a8 8 0 0 1-16 0z"/><path d="M8 7.5c1-1.2 2.5-1.2 3.5 0M13 7.5c1-1.2 2.5-1.2 3.5 0"/></svg>`;
const DSH_AI=s=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M8.8 15.5 12 8.5l3.2 7M10.2 13h3.6"/></svg>`;
const DSH_PWR=s=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M13 2.5 4.5 13.5H11l-1.5 8L18.5 10h-6.5z"/></svg>`;
const DSH_LEAF=s=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19C5 9.5 12 4.5 20 4.5c0 8-5 14.5-15 14.5z"/><path d="M5 19c3-5.5 7-9.5 11-11.5"/></svg>`;
const DSH_GLASS=s=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M7 3.5h10c0 4.8-2 7.5-5 7.5S7 8.3 7 3.5z"/><path d="M12 11v7M8.5 21h7"/></svg>`;
const DSH_SODA=s=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 9.5h14l-1.4 10h-11.2z"/><path d="M8.5 9.5 12 4.5l3.5 5"/><path d="M9.5 13.5h5M10 16.5h4"/></svg>`;
const DSH_CLOCK=s=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.4l3.4 2"/></svg>`;
const DSH_DRY=s=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 8h9.5a2.8 2.8 0 1 0-2.8-2.8M3 12.5h13.5a2.8 2.8 0 1 1-2.8 2.8M3 17h6"/></svg>`;
const DSH_LOCK='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="5.5" y="10.5" width="13" height="9.5" rx="2.5"/><path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3"/><circle cx="12" cy="15.2" r="1.4" fill="currentColor" stroke="none"/></svg>';
const DSH_TABS=[
 ['洗消',[['标准洗','2小时52分钟',172,'blue',DSH_BOWL],['智能洗','3小时08分钟',188,'sky',DSH_AI],['强净洗','3小时05分钟',185,'blue',DSH_PWR],['节能洗','5小时13分钟',313,'green',DSH_LEAF],['玻璃洗','2小时55分钟',175,'sky',DSH_GLASS],['苏打洗','3小时20分钟',200,'blue',DSH_SODA]]],
 ['单洗',[['快速洗','29分钟',29,'sky',DSH_BOWL],['预冲洗','15分钟',15,'blue',DSH_GLASS],['筒自洁','1小时',60,'blue',DSH_SODA]]],
 ['辅助模式',[['加强烘干','+30分钟',30,'amber',DSH_DRY],['消毒保管','24小时',0,'green',DSH_LEAF],['预约洗涤','1-24小时',0,'blue',DSH_CLOCK]]]];
function openDishCtl(d){
  let tab='洗消';
  const head=`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button>
   <div class="ac-tt"><h1>洗碗机</h1><span>${d.name} · ${d.room}</span></div>
   <button class="ac-more" id="dshMenu">${AC_MISC_SVG.dots}</button></div>`;
  const el=openPage(head+`<div class="page-scroll" style="padding-bottom:12px">
   <div id="dshRun"></div>
   <div class="wp-tabs" id="dshTabs">${DSH_TABS.map(t=>`<button class="${t[0]===tab?'on':''}" data-t="${t[0]}">${t[0]}</button>`).join('')}<span class="all" id="dshAll">查看全部 ›</span></div>
   <div class="ov-grid" id="dshGrid"></div>
   <div class="pw-sec">更多功能</div>
   <div class="wp-list" style="margin-top:8px">
    <div class="wp-li" data-df="软水档位"><span>软水档位</span><span class="val">4档</span><span class="arr">›</span></div>
    <div class="wp-li" data-df="漂洗剂等级"><span>漂洗剂等级</span><span class="val">4档</span><span class="arr">›</span></div>
    <div class="wp-li" data-df="洗碗报告"><span>洗碗报告</span><span class="arr">›</span></div>
    <div class="wp-li" data-df="错峰省电"><span>错峰省电</span><span class="val" id="dshEcoV">${d.eco?'已开启':'关闭'}</span><span class="arr">›</span></div>
    <div class="wp-li" style="cursor:default;border-bottom:none"><span>水电报告</span><span class="arr"></span></div>
    <div style="display:flex;text-align:center;padding:0 0 14px">
     <div style="flex:1"><b style="font-size:26px;font-variant-numeric:tabular-nums">0.86</b><span style="font-size:13px"> 度</span><div style="font-size:10.5px;color:var(--ink2)">今日用电</div></div>
     <div style="flex:1;border-left:1px solid #f3f4f6"><b style="font-size:26px;font-variant-numeric:tabular-nums">9.8</b><span style="font-size:13px"> 升</span><div style="font-size:10.5px;color:var(--ink2)">今日用水</div></div>
    </div>
   </div>
   <div style="height:12px"></div>
  </div>
  <div class="ac-dock">
   <div class="ac-dock-it"><button class="ac-dock-btn ${d.on===false?'off':''}" id="dshPower">${AC_MISC_SVG.power}</button><span>开关</span></div>
   <div class="ac-dock-it"><button class="ac-dock-btn ${d.lock?'':'off'}" id="dshLock">${DSH_LOCK}</button><span>童锁</span></div>
  </div>`);
  const renderRun=()=>{
    const w=S.dish,active=w.cooking&&w.left>0;
    el.querySelector('#dshRun').innerHTML=active?`<div class="wp-run">
     <div class="rt"><h4>${w.mode}</h4><p>${w.running?'<span class="cook-anim"></span> 洗涤中':'已暂停'} · ${d.room}</p></div>
     <div style="text-align:right"><b id="ringDish">${fmt(w.left)}</b><div style="font-size:9.5px;color:var(--ink2)">剩余时间</div></div>
     <button class="mini-btn" id="dshPause" style="margin:0">${w.running?'暂停':'继续'}</button>
     <button class="mini-btn" id="dshCancel" style="margin:0;background:#f3f4f6;color:var(--ink2)">取消</button></div>`:'';
    const p=el.querySelector('#dshPause');
    if(p)p.onclick=()=>{w.running=!w.running;renderRun();toast(w.running?'继续洗涤':'已暂停');};
    const c=el.querySelector('#dshCancel');
    if(c)c.onclick=()=>{S.dish={mode:'',left:0,running:false,cooking:false};renderRun();toast('已取消洗涤');};
  };
  const renderGrid=()=>{
    const progs=DSH_TABS.find(t=>t[0]===tab)[1];
    el.querySelector('#dshGrid').innerHTML=progs.map(m=>`<div class="ov-card ${m[3]}" data-dp="${m[0]}|${m[2]}">
     <span class="fan">${m[4](22)}</span><h4>${m[0]}</h4><span class="dur">${m[1]}</span>
     <span class="play">${PLAY_SM}</span><span class="wm">${m[4](96)}</span></div>`).join('');
    el.querySelectorAll('[data-dp]').forEach(c=>c.onclick=()=>{
      if(d.on===false)return toast('请先开机');
      if(d.lock)return toast('童锁已开启，请先解锁');
      const v=c.dataset.dp.split('|'),min=+v[1];
      if(min<=0)return toast('「'+v[0]+'」已设置');
      S.dish={mode:v[0],left:min*60,running:true,cooking:true};
      renderRun();toast('已启动「'+v[0]+'」程序');
      el.querySelector('.page-scroll').scrollTop=0;});
  };
  el.querySelectorAll('#dshTabs button').forEach(b=>b.onclick=()=>{tab=b.dataset.t;
    el.querySelectorAll('#dshTabs button').forEach(x=>x.classList.toggle('on',x===b));renderGrid();});
  el.querySelector('#dshAll').onclick=()=>toast('共 12 个洗涤程序，已全部按类展示');
  el.querySelector('#dshMenu').onclick=()=>toast('洗碗机设置');
  el.querySelectorAll('[data-df]').forEach(r=>r.onclick=()=>{
    if(r.dataset.df==='错峰省电'){d.eco=!d.eco;el.querySelector('#dshEcoV').textContent=d.eco?'已开启':'关闭';toast(d.eco?'错峰省电已开启（谷电时段运行）':'错峰省电已关闭');}
    else toast(r.dataset.df+'设置');});
  const pwr=el.querySelector('#dshPower');
  pwr.onclick=()=>{d.on=d.on===false?true:false;pwr.classList.toggle('off',d.on===false);
    if(d.on===false&&S.dish.cooking){S.dish={mode:'',left:0,running:false,cooking:false};renderRun();}
    toast(d.on===false?'洗碗机已关机':'洗碗机已开机');};
  const lk=el.querySelector('#dshLock');
  lk.onclick=()=>{d.lock=!d.lock;lk.classList.toggle('off',!d.lock);toast(d.lock?'童锁已开启':'童锁已关闭');};
  renderRun();renderGrid();
}

/* ================= 净水机控制页 ================= */
/* ================= 净水器 V2（反渗透净热一体机 WTE-PRC800-2702 · 需求文档） ================= */
const WT2_MEMBERS=[
 {n:'爸爸',tag:'健康人群',t:'45°C',a:'300ml',w:'矿化水',rec:'低钠淡矿 · 日常饮用',c:'#0284c7'},
 {n:'妈妈',tag:'孕期',t:'50°C',a:'350ml',w:'纯水',rec:'纯水低矿 · 孕期更安心',c:'#db2777'},
 {n:'宝宝',tag:'3 岁 · 冲奶',t:'45°C',a:'200ml',w:'纯水',rec:'恒温 45°C · 冲奶直用',c:'#d97706'}];
const WT2_CITIES=[['珠海',168,0.30,124],['广州',150,0.28,110],['上海',185,0.35,150],['成都',110,0.22,95],['北京',320,0.42,280]];
function openWaterCtl(d){
  if(d.zl===undefined)d.zl=true;
  if(d.lock===undefined)d.lock=false;
  if(d.push===undefined)d.push=true;
  const model='WTE-PRC800-2702';
  const head=`<div class="wm2-head" style="padding-top:46px">
   <button class="wm2-ico" data-back>${svgBack}</button>
   <div class="wm2-head-t"><h1>净水机</h1><p>${model} 反渗透净热一体机 · ${d.room}</p></div>
   <button class="wm2-ico" id="wt2Menu">${AC_MISC_SVG.dots}</button></div>`;
  const body=`
  <section class="fr2-hero wt2-hero"><div class="fr2-hero-in">
   <div style="min-width:0">
    <span class="fr2-badge" style="background:rgba(103,232,249,.55);color:#155e75">待机中 · 反渗透净热一体</span>
    <div class="fr2-big"><b>15<small style="font-size:14px;font-weight:400"> mg/L</small></b></div>
    <p class="fr2-cap" style="color:#155e75">饮用水 TDS · 优于市政自来水</p>
    <div class="fr2-env">
     <div><p>进水 TDS</p><b>168</b></div>
     <div><p>余氯</p><b>0.30</b></div>
     <div><p>累计制水</p><b>200L</b></div>
    </div>
    <p class="fr2-sync">数据实时同步 · 刚刚更新</p>
   </div>
   <div class="fr2-hero-img wt2-hero-img"><img src="img/water_new.png" alt="净水机"></div>
  </div></section>

  <div class="fr2-sec"><h2>取水设置</h2><span class="sub">取水类型 · 温度 · 水量</span></div>
  <section class="fr2-card">
   <div class="fr2-seg" id="wt2Type">
    <button class="on" data-wtt="矿化水">矿化水</button><button data-wtt="纯水">纯水</button><button data-wtt="生活水">生活水</button>
   </div>
   <div class="fr2-card-t" style="margin:14px 0 9px"><b>出水温度</b><span id="wt2TmpV">45°C</span></div>
   <div class="wt2-chips" id="wt2Tmps">${['常温','45°C','65°C','85°C','开水'].map((t,i)=>`<button class="wt2-chip ${i===1?'on':''}" data-tmp="${t}">${t}</button>`).join('')}</div>
   <div class="fr2-card-t" style="margin:14px 0 9px"><b>出水量</b><span id="wt2AmtV">300ml</span></div>
   <div class="wt2-chips" id="wt2Amts">${['200ml','300ml','500ml','1.0L','不限量'].map((a,i)=>`<button class="wt2-chip ${i===1?'on':''}" data-amt="${a}">${a}</button>`).join('')}</div>
   <button class="wt2-pour" id="wt2Pour">开始取水</button>
  </section>

  <div class="fr2-sec"><h2>个性化水质</h2><span class="sub">NFC 杯贴 · 声纹识别取水</span></div>
  <section class="fr2-card">
   <div class="fr2-card-t"><b>家庭成员饮水档案</b><span>已按健康信息推荐</span></div>
   ${WT2_MEMBERS.map(m=>`<div class="fr2-lrow"><span class="wt2-mava" style="background:${m.c}14;color:${m.c}">${m.n[0]}</span>
    <div style="flex:1;min-width:0"><b>${m.n}<small style="font-size:10px;color:#9aa8b5;font-weight:400"> · ${m.tag}</small></b><p>推荐 ${m.t} · ${m.a} · ${m.w}（${m.rec}）</p></div>
    <span class="fr2-tag" style="background:#e0f2fe;color:#0369a1">NFC</span></div>`).join('')}
   <div class="fr2-addrow" style="margin-top:14px">
    <button class="fr2-add" id="wt2Nfc">写入 NFC 杯贴</button>
    <button class="fr2-add alt" id="wt2VoiceId">声纹识别取水</button>
   </div>
   <div class="fr2-note">${ACN_INFO}<span>带 NFC 标贴的杯子放到净水机感应区，整机自动读取杯贴并按档案取水；声纹识别可在手机端提前录入不同人的水质、水温、水量与健康信息。</span></div>
  </section>

  <div class="fr2-sec"><h2>水质信息</h2><span class="sub">珠海 · 本地水质公示</span></div>
  <section class="fr2-card">
   <div class="fr2-kpis" style="grid-template-columns:repeat(3,1fr)">
    <div class="fr2-kpi"><b>168</b><span>TDS mg/L</span></div>
    <div class="fr2-kpi"><b>0.30</b><span>余氯 mg/L</span></div>
    <div class="fr2-kpi"><b>124</b><span>硬度 mg/L</span></div>
   </div>
   <div class="fr2-note">${ACN_INFO}<span>数据来源：珠海自来水公司水质公示（zhuhai-water.com.cn/xxgk/szbg），每月更新。</span></div>
   <button class="fr2-add alt" id="wt2Map" style="margin-top:10px">查看全国水质地图 ›</button>
  </section>

  <div class="fr2-sec"><h2>滤芯寿命</h2><span class="sub">到期推送提醒 + 购买链接</span></div>
  <section class="fr2-card">
   <div class="wt2-fil"><div class="wt2-fil-h"><b>反渗透膜滤芯</b><span style="color:#16a34a">剩余 75%</span></div>
    <div class="wt2-bar"><i style="width:75%;background:#22c55e"></i></div></div>
   <div class="wt2-fil" style="margin-top:14px"><div class="wt2-fil-h"><b>PCC 复合滤芯<small class="fr2-tag" style="background:#fee2e2;color:#dc2626;margin-left:6px">即将到期</small></b><span style="color:#dc2626">剩余 5%</span></div>
    <div class="wt2-bar"><i style="width:5%;background:#ef4444"></i></div></div>
   <div class="fr2-lrow" style="margin-top:6px"><div><b>滤芯到期推送提醒</b><p>寿命到期后手机推送通知，并附滤芯购买链接</p></div><span class="fr2-sw on" id="wt2Push"><i></i></span></div>
   <div class="fr2-addrow" style="margin-top:12px">
    <button class="fr2-add" id="wt2BuyPcc">PCC 滤芯 · 一键购买 ¥169</button>
    <button class="fr2-add alt" id="wt2BuyRo">反渗透滤芯 ¥299</button>
   </div>
  </section>

  <div class="fr2-sec"><h2>语音控制取水</h2><span class="sub">对“小格”说出取水指令</span></div>
  <section class="fr2-card">
   <div class="wt2-cmds">
    ${['小格小格，取 200ml 45 度的水','小格小格，宝宝冲奶的水','小格小格，一杯常温水'].map(c=>`<button class="wt2-cmd" data-cmd="${c}">“${c}”</button>`).join('')}
   </div>
   <div class="fr2-note">${ACN_INFO}<span>支持声纹身份识别：匹配到个人身份后，自动按其水质、水温、水量档案取水。</span></div>
  </section>

  <div class="fr2-sec"><h2>服务</h2></div>
  <div class="fr2-list">
   <div class="fr2-li" id="wt2Anti"><span class="fr2-li-ic">${FR2_IC.scan}</span><div style="flex:1;min-width:0"><b>滤芯防伪验证</b><p>扫描滤芯条形码或手动输入，验证是否正品</p></div><span class="fr2-go">${svgArrow}</span></div>
   <div class="fr2-li" id="wt2Fix"><span class="fr2-li-ic">${FR2_IC.info}</span><div style="flex:1;min-width:0"><b>智能一键报修</b><p>扫码自动报修 · 手动输入信息报修</p></div><span class="fr2-go">${svgArrow}</span></div>
  </div>

  <div class="fr2-sec"><h2>制水报告</h2></div>
  <section class="fr2-card">
   <div class="fr2-kpis" style="grid-template-columns:1fr 1fr">
    <div class="fr2-kpi"><b>5.2<small style="font-size:10px;font-weight:500"> 升</small></b><span>今日制水</span></div>
    <div class="fr2-kpi"><b>126.4<small style="font-size:10px;font-weight:500"> 升</small></b><span>本月制水</span></div>
   </div>
  </section>
  <div style="height:8px"></div>`;
  const el=openPage(`<div class="fr2-wrap">${head}<div class="fr2-body">${body}</div>
   <button class="fr2-voice" id="wt2Ball">${FR2_IC.siri}</button></div>`);
  /* 取水设置 */
  let wType='矿化水',wTmp='45°C',wAmt='300ml';
  el.querySelectorAll('#wt2Type button').forEach(b=>b.onclick=()=>{wType=b.dataset.wtt;
    el.querySelectorAll('#wt2Type button').forEach(x=>x.classList.toggle('on',x===b));});
  el.querySelectorAll('#wt2Tmps .wt2-chip').forEach(b=>b.onclick=()=>{wTmp=b.dataset.tmp;
    el.querySelectorAll('#wt2Tmps .wt2-chip').forEach(x=>x.classList.toggle('on',x===b));
    el.querySelector('#wt2TmpV').textContent=wTmp;});
  el.querySelectorAll('#wt2Amts .wt2-chip').forEach(b=>b.onclick=()=>{wAmt=b.dataset.amt;
    el.querySelectorAll('#wt2Amts .wt2-chip').forEach(x=>x.classList.toggle('on',x===b));
    el.querySelector('#wt2AmtV').textContent=wAmt;});
  el.querySelector('#wt2Pour').onclick=()=>toast(`已出水：${wTmp} · ${wAmt} · ${wType}（演示）`);
  /* 个性化水质 */
  el.querySelector('#wt2Nfc').onclick=()=>{
    const m=openModal(`<div class="ac-sheet-t">写入 NFC 杯贴</div>
     <p style="font-size:12.5px;color:#5f7285;line-height:1.8;padding:0 4px 8px">将 NFC 杯贴贴近手机写入档案；之后杯子放到净水机 NFC 感应区，整机自动读取并按档案取水。</p>
     <div class="ac-opt" data-nfc><span>人群</span><b style="margin-left:auto;color:#0284c7">健康人群 ›</b></div>
     <div class="ac-opt" data-nfc><span>健康信息</span><b style="margin-left:auto;color:#0284c7">无基础疾病 ›</b></div>
     <div class="ac-opt" data-nfc><span>取水偏好</span><b style="margin-left:auto;color:#0284c7">45°C · 300ml ›</b></div>
     <div class="ac-opt" data-nfc><span>取水类型</span><b style="margin-left:auto;color:#0284c7">矿化水 ›</b></div>
     <div class="wt2-rec">已按档案推荐：<b>45°C 矿化水 300ml</b><span>低钠淡矿，适合健康人群日常饮用</span></div>
     <div class="ac-opt" data-close><span style="margin:auto;color:#0284c7">确认并写入（演示）</span></div>`);
    m.querySelectorAll('[data-nfc]').forEach(o=>{o.style.cursor='pointer';o.onclick=()=>toast('演示：选项编辑');});};
  el.querySelector('#wt2VoiceId').onclick=()=>{
    const m=openModal(`<div class="ac-sheet-t">声纹识别取水</div>
     <p style="font-size:12.5px;color:#5f7285;line-height:1.8;padding:0 4px 10px">已录入 ${WT2_MEMBERS.length} 位家庭成员声纹。对净水机说出取水指令，声纹匹配身份后自动按其档案出水。</p>
     ${WT2_MEMBERS.map(x=>`<div class="ac-opt"><span><b>${x.n}</b><p style="font-size:11px;color:#9aa8b5;margin-top:2px">${x.tag} · ${x.t} · ${x.a} · ${x.w}</p></span><span class="fr2-tag" style="background:#dcfce7;color:#16a34a;margin-left:auto">声纹已录</span></div>`).join('')}
     <div class="ac-opt" id="wt2VoiceGo" style="margin-top:12px"><span style="margin:auto;color:#0284c7;font-weight:700">模拟声纹取水</span></div>`);
    m.querySelector('#wt2VoiceGo').onclick=()=>{closeModal(m);toast('声纹匹配：爸爸 · 已出 45°C 矿化水 300ml（演示）');};};
  /* 水质地图 */
  el.querySelector('#wt2Map').onclick=()=>{
    const mx=Math.max(...WT2_CITIES.map(c=>c[1]));
    openModal(`<div class="ac-sheet-t">全国水质地图 · TDS</div>
     <p style="font-size:12px;color:#5f7285;padding:0 4px 8px;line-height:1.7">参照水质地图展示形式：选择地区查看 TDS / 余氯 / 硬度（演示数据）。</p>
     ${WT2_CITIES.map(c=>`<div class="wt2-city"><span class="wt2-city-n">${c[0]}</span><div class="wt2-city-bar"><i style="width:${Math.round(c[1]/mx*100)}%;background:${c[1]>200?'#ef4444':c[1]>160?'#f59e0b':'#22c55e'}"></i></div><b>${c[1]}</b><span class="wt2-city-s">余氯 ${c[2]} · 硬度 ${c[3]}</span></div>`).join('')}
     <div class="ac-opt" data-close style="margin-top:12px"><span style="margin:auto;color:#0284c7">关闭</span></div>`);};
  /* 滤芯 */
  const pushSw=el.querySelector('#wt2Push');
  pushSw.onclick=()=>{pushSw.classList.toggle('on');d.push=pushSw.classList.contains('on');toast('滤芯到期推送'+(d.push?' 已开启':' 已关闭'));};
  el.querySelector('#wt2BuyPcc').onclick=()=>openWebView(MALL[2].url,'净水器 PCC 复合滤芯');
  el.querySelector('#wt2BuyRo').onclick=()=>openWebView(MALL[2].url,'净水器反渗透滤芯');
  /* 语音指令 */
  el.querySelectorAll('[data-cmd]').forEach(b=>b.onclick=()=>toast('已执行：“'+b.dataset.cmd+'”（演示）'));
  /* 防伪验证 */
  el.querySelector('#wt2Anti').onclick=()=>{
    const m=openModal(`<div class="ac-sheet-t">滤芯防伪验证</div>
     <div class="fr2-scanbox" id="wt2Scan">${FR2_IC.scan}<b>扫描滤芯条形码</b><p>对准滤芯包装上的条形码即可验证</p></div>
     <div class="ac-opt" style="margin-top:10px"><span>手动输入条码</span><input id="wt2Code" placeholder="6903552 ******" style="margin-left:auto;text-align:right;border:none;outline:none;font-size:13px;background:transparent;min-width:0;flex:1"></div>
     <div class="ac-opt" id="wt2Verify"><span style="margin:auto;color:#0284c7;font-weight:700">验证</span></div>
     <div id="wt2AntiRes"></div>`);
    const showRes=()=>{m.querySelector('#wt2AntiRes').innerHTML=`<div class="wt2-ok">✔ 正品滤芯<span>格力原厂 PCC 复合滤芯 · 适配 ${model} · 质保期内</span></div>`;};
    m.querySelector('#wt2Scan').onclick=showRes;
    m.querySelector('#wt2Verify').onclick=showRes;};
  /* 一键报修 */
  el.querySelector('#wt2Fix').onclick=()=>{
    const m=openModal(`<div class="ac-sheet-t">智能一键报修</div>
     <div class="fr2-scanbox" id="wt2FixScan">${FR2_IC.scan}<b>扫码自动报修</b><p>扫描机身条码，自动带入型号与保修信息</p></div>
     <div class="ac-opt" id="wt2FixManual" style="margin-top:10px"><span style="margin:auto;color:#0284c7">手动输入信息报修</span></div>`);
    m.querySelector('#wt2FixScan').onclick=()=>{closeModal(m);toast('已识别机身条码，报修单已提交（演示）');};
    m.querySelector('#wt2FixManual').onclick=()=>{closeModal(m);toast('手动报修入口（演示）');};};
  el.querySelector('#wt2Menu').onclick=()=>toast('净水机设置');
  el.querySelector('#wt2Ball').onclick=()=>toast('小格语音取水（演示）：请说“取 200ml 45 度的水”');
}

/* ================= 燃气热水器控制页 ================= */
const HT_IMG=`<svg width="96" height="118" viewBox="0 0 96 118">
 <rect x="41" y="0" width="14" height="9" rx="2" fill="#c9ced4"/>
 <rect x="10" y="7" width="76" height="106" rx="12" fill="#fff" stroke="#eceef1"/>
 <circle cx="48" cy="62" r="17" fill="#f5f6f8" stroke="#e6e8eb"/>
 <text x="48" y="68" font-size="14" text-anchor="middle" fill="#f2441d" font-weight="600">50°</text>
 <rect x="28" y="90" width="40" height="4" rx="2" fill="#eef0f2"/>
 <rect x="34" y="99" width="28" height="4" rx="2" fill="#f2f3f5"/>
</svg>`;
const HT_ONCE='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M20 12a8 8 0 1 1-2.4-5.7"/><path d="M20 3.5V8h-4.5"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/></svg>';
const HT_TAP='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M8 3.5h8v3a4 4 0 0 1-8 0z"/><path d="M12 10.5v2"/><path d="M7 15.5l-.8 1.6M12 16l-.8 1.6M17 15.5l-.8 1.6M9.5 12.5l-.8 1.6M14.5 12.5l-.8 1.6"/></svg>';
const HT_ALLDAY='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.4l3.4 2"/><path d="M4 4.5h4M4 4.5v4" opacity=".0"/></svg>';
const HT_KITCH='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 20h14v-3a7 7 0 0 0-7-7H5z"/><path d="M12 10V6.5h4"/><path d="M8 6.5h4" opacity="0"/><circle cx="16" cy="6.5" r="1.2"/></svg>';
const HT_BATH='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 12.5h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M6.5 12.5V5.8A1.8 1.8 0 0 1 8.3 4a1.8 1.8 0 0 1 1.8 1.8"/><path d="M8 19.5 7 21.5M16 19.5l1 2"/></svg>';
function openHeaterCtl(d){
  d.t=d.t||50;d.mode=d.mode||'厨房';
  const head=`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button>
   <div class="ac-tt"><h1>燃气热水器</h1><span>${d.name} · ${d.room}</span></div>
   <button class="ac-more" id="htMenu">${AC_MISC_SVG.dots}</button></div>`;
  const el=openPage(head+`<div class="page-scroll" style="padding-bottom:16px;background:linear-gradient(180deg,#fdeee2 0%,#fdf8f3 36%,#f4f5f7 80%)">
   <div class="ht-hero">
    <div><p style="font-size:13px;color:var(--ink2)" id="htSt">${d.on===false?'已关闭':'加热中'}</p>
     <b style="font-size:52px;font-weight:600;line-height:1.1" id="htT">${d.t}<small style="font-size:20px;font-weight:400">°C</small></b>
     <p style="font-size:12px;color:var(--ink2);margin-top:4px">进水温度 20°C</p></div>
    ${HT_IMG}
   </div>
   <div class="pw-card" style="display:flex;align-items:center;justify-content:space-between"><b style="font-size:15px">开关</b>
    <button class="pw-power ${d.on===false?'off':''}" id="htPower">${PW_POWER}</button></div>
   <div class="pw-card">
    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 6px">
     <button class="ctl-btn" id="htDn">−</button><b style="font-size:28px" id="htTV">${d.t}°C</b><button class="ctl-btn" id="htUp">＋</button></div>
    <input type="range" class="xslider" id="htSl" min="35" max="65" value="${d.t}" style="--sl-a:#ffb25c;--sl-b:#f2441d;width:100%;margin-top:12px;--fill:${(d.t-35)/30*100}%">
   </div>
   <div class="pw-card">
    <div style="display:flex;justify-content:space-between;align-items:baseline;padding-bottom:10px"><b style="font-size:13.5px">零冷水</b><span style="font-size:11px;color:var(--ink3)">点击卡片一键执行 ›</span></div>
    <div class="tile-grid">
     <div class="tile" data-cr="单次巡航"><span style="display:inline-flex">${HT_ONCE}</span><h5>单次巡航</h5><p>即刻循环一次</p></div>
     <div class="tile" data-cr="点动巡航"><span style="display:inline-flex">${HT_TAP}</span><h5>点动巡航</h5><p>开水龙头触发</p></div>
     <div class="tile" data-cr="全天候巡航"><span style="display:inline-flex">${HT_ALLDAY}</span><h5>全天候巡航</h5><p>24h 恒温循环保温</p></div>
    </div>
    <div style="display:flex;justify-content:center;gap:5px;padding-top:10px"><i style="width:5px;height:5px;border-radius:99px;background:#d7dade"></i><i style="width:5px;height:5px;border-radius:99px;background:#eef0f2"></i></div>
   </div>
   <div class="pw-card">
    <b style="font-size:13.5px;display:block;margin-bottom:12px">用水模式</b>
    <div style="display:flex;justify-content:center;gap:34px">
     <div class="ht-mode ${d.mode==='厨房'?'on':''}" data-hm="厨房"><i>${HT_KITCH}</i><span>厨房</span></div>
     <div class="ht-mode ${d.mode==='随心浴'?'on':''}" data-hm="随心浴"><i>${HT_BATH}</i><span>随心浴</span></div>
     <div class="ht-mode ${d.mode==='节能'?'on':''}" data-hm="节能"><i>${DSH_LEAF(24)}</i><span>节能</span></div>
    </div>
   </div>
   <div class="pw-card" style="padding-top:4px;padding-bottom:4px">
    <div class="kv" style="border:none;padding:11px 0"><span style="color:var(--ink);font-size:13.5px">增压 <span style="font-size:11px;color:var(--ink3)">智能◢</span></span><span class="switch on" data-tg="增压"></span></div>
    <div class="kv" style="border:none;padding:11px 0;cursor:pointer" id="htTimer"><span style="color:var(--ink);font-size:13.5px">定时 <span style="font-size:11px;color:var(--ink3)">未开启</span></span><span style="color:#f2441d;display:flex">${AC_MISC_SVG.clockSm}</span></div>
   </div>
   <div class="pw-sec">智能控制</div>
   <div class="pw-card" style="padding-top:4px;padding-bottom:4px">
    <div class="kv" style="border:none;padding:11px 0;cursor:pointer" data-hc="智能场景"><span style="color:var(--ink);font-size:13.5px">智能场景</span><span style="font-size:11.5px;color:var(--ink3)">定制智能家居场景 ›</span></div>
    <div class="kv" style="border:none;padding:11px 0;cursor:pointer" data-hc="Siri 快捷控制"><span style="color:var(--ink);font-size:13.5px">Siri 快捷控制</span><span style="font-size:11.5px;color:var(--ink3)">唤醒 Siri 控制设备 ›</span></div>
    <div class="kv" style="border:none;padding:11px 0;cursor:pointer" data-hc="远程控制授权"><span style="color:var(--ink);font-size:13.5px">远程控制授权</span><span style="font-size:11.5px;color:var(--ink3)">已授权 ›</span></div>
   </div>
   <div class="pw-sec">能耗统计</div>
   <div class="pw-card" style="display:flex;text-align:center">
    <div style="flex:1;cursor:pointer" data-hc="用水统计"><div style="display:inline-flex;color:#2b86c8">${IC.water('#2b86c8')}</div><h5 style="font-size:13px;margin-top:6px">用水统计</h5><p style="font-size:11px;color:var(--ink2);margin-top:3px">今日用水 <b style="color:#2b86c8">5.01 m³</b></p></div>
    <div style="flex:1;border-left:1px solid #f3f4f6;cursor:pointer" data-hc="用气统计"><div style="display:inline-flex;color:#f29900">${IC.gas('#f29900')}</div><h5 style="font-size:13px;margin-top:6px">用气统计</h5><p style="font-size:11px;color:var(--ink2);margin-top:3px">今日用气 <b style="color:#f29900">3.02 m³</b></p></div>
   </div>
  </div>`);
  el.querySelector('#htMenu').onclick=()=>toast('热水器设置');
  const setT=v=>{d.t=Math.max(35,Math.min(65,v));
    el.querySelector('#htT').innerHTML=d.t+'<small style="font-size:20px;font-weight:400">°C</small>';
    el.querySelector('#htTV').textContent=d.t+'°C';
    const sl=el.querySelector('#htSl');sl.value=d.t;sl.style.setProperty('--fill',(d.t-35)/30*100+'%');};
  el.querySelector('#htDn').onclick=()=>{if(d.on===false)return toast('请先开机');setT(d.t-1);};
  el.querySelector('#htUp').onclick=()=>{if(d.on===false)return toast('请先开机');setT(d.t+1);};
  const sl=el.querySelector('#htSl');
  sl.oninput=()=>setT(+sl.value);
  sl.onchange=()=>toast('出水温度已设为 '+d.t+'°C');
  const pw=el.querySelector('#htPower');
  pw.onclick=()=>{d.on=d.on===false?true:false;pw.classList.toggle('off',d.on===false);
    el.querySelector('#htSt').textContent=d.on===false?'已关闭':'加热中';
    toast(d.on===false?'热水器已关机':'热水器已开机');};
  el.querySelectorAll('[data-cr]').forEach(t=>t.onclick=()=>{
    if(d.on===false)return toast('请先开机');
    toast('已启动「'+t.dataset.cr+'」，热水即开即来');});
  el.querySelectorAll('[data-hm]').forEach(m=>m.onclick=()=>{
    if(d.on===false)return toast('请先开机');
    d.mode=m.dataset.hm;
    el.querySelectorAll('[data-hm]').forEach(x=>x.classList.toggle('on',x===m));
    toast('用水模式已切换为「'+d.mode+'」');});
  el.querySelectorAll('[data-tg]').forEach(sw=>sw.onclick=()=>{sw.classList.toggle('on');
    toast(sw.dataset.tg+(sw.classList.contains('on')?' 已开启':' 已关闭'));});
  el.querySelector('#htTimer').onclick=()=>toast('定时开关机设置');
  el.querySelectorAll('[data-hc]').forEach(r=>r.onclick=()=>toast(r.dataset.hc));
}

/* ================= 电暖器（复刻参考设计 · 严格还原） ================= */
const EHSVG={
 flame:'<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
 therm:'<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>',
 drop:'<path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>',
 shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 8v4M12 16h.01"/>',
 power:'<path d="M12 2v10"/><path d="M18.4 6.6a9 9 0 1 1-12.77.04"/>',
 minus:'<path d="M5 12h14"/>',plus:'<path d="M5 12h14M12 5v14"/>',
 calclk:'<path d="M16 14v2.2l1.6 1M16 2v4M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5M3 10h5M8 2v4"/><circle cx="16" cy="16" r="6"/>',
 help:'<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>',
 wind:'<path d="M12.8 19.6A2 2 0 1 0 14 16H2M17.5 8a2.5 2.5 0 1 1 2 4H2M9.8 4.4A2 2 0 1 1 11 8H2"/>',
 refresh:'<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
 monitor:'<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',
 bulb:'<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6M10 22h4"/>',
 zap:'<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
 userx:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" x2="22" y1="8" y2="13"/><line x1="22" x2="17" y1="8" y2="13"/>',
 cald:'<path d="M8 2v4M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>',
 dots:'<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>',
 back:'<path d="m15 18-6-6 6-6"/>',arr:'<path d="m9 18 6-6-6-6"/>',check:'<path d="M20 6 9 17l-5-5"/>',
 moon:'<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>',
 leaf:'<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
 spark:'<path d="M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2z"/>'};
const ehSvg=(k,sz,c)=>`<svg width="${sz||20}" height="${sz||20}" viewBox="0 0 24 24" fill="none" stroke="${c||'currentColor'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${EHSVG[k]}</svg>`;
function openEHeaterCtl(d){
  d.t=d.t||28;d.mode=d.mode||'静热';d.eh=d.eh||{anion:false,swing:false,disp:true,light:false,noOff:true};
  d.ehd=d.ehd||{days:[1,2],onT:'10:30',offT:'22:30',en:true};
  const st=d.eh;
  const pg=openPage(`<div class="eh-wrap"><div class="eh-head" style="padding-top:46px">
    <button class="eh-ico-btn" data-back>${ehSvg('back',20,'#404040')}</button>
    <div class="eh-head-t"><h1 style="font-size:15px;font-weight:600">电暖器</h1><p>NDY-23A · 智能恒温</p></div>
    <button class="eh-ico-btn" id="ehMenu">${ehSvg('dots',20,'#404040')}</button></div>
   <div class="eh-body">
    <section class="eh-hero"><div class="eh-hero-in">
     <div>
      <span class="eh-badge" id="ehBadge">${ehSvg('flame',12)}${d.on?'偏热':'已关机'}</span>
      <div class="eh-big"><b id="ehBigT">${d.t}</b><span>℃</span></div>
      <p class="eh-cap">目标温度</p>
      <div class="eh-env">
       <div class="eh-env-row"><span class="eh-env-ic">${ehSvg('therm',14,'#f97316')}</span><div><p>室内温度</p><b>31℃ · <span style="color:#ea580c">偏热</span></b></div></div>
       <div class="eh-env-row"><span class="eh-env-ic">${ehSvg('drop',14,'#f59e0b')}</span><div><p>湿度</p><b>35% · <span style="color:#b45309">干燥</span></b></div></div>
      </div>
     </div>
     <div class="eh-hero-img"><img src="img/heater_new.png" alt="电暖器"></div>
    </div></section>
    <section class="eh-card">
     <div class="eh-alert" id="ehAlert" style="display:${d.on?'flex':'none'}">
      <span class="eh-alert-ic">${ehSvg('shield',16,'#ea580c')}</span>
      <div style="flex:1;min-width:0"><b>防烫提醒</b><p>检测到有人靠近，接近停止加热</p></div>
      <span class="eh-alert-tag"><i></i>检测中</span></div>
     <div class="eh-power-row"><div><b>开关</b><p id="ehPwSt">${d.on?'设备运行中':'已关闭'}</p></div>
      <button class="eh-power-btn ${d.on?'':'off'}" id="ehPower">${ehSvg('power',24)}</button></div>
    </section>
    <section class="eh-card">
     <div class="eh-card-t"><b>温度调节</b><span>16 - 35 ℃</span></div>
     <div class="eh-temp-row">
      <button class="eh-step" id="ehDn">${ehSvg('minus',20)}</button>
      <div class="eh-temp-v"><b id="ehTV">${d.t}</b><span>℃</span></div>
      <button class="eh-step" id="ehUp">${ehSvg('plus',20)}</button>
     </div>
     <div class="eh-slider" id="ehSl">
      <div class="eh-track"><div class="eh-fill" id="ehFill" style="width:${(d.t-16)/19*100}%"></div></div>
      <div class="eh-thumb" id="ehThumb" style="left:${(d.t-16)/19*100}%">${ehSvg('flame',14,'#f97316')}</div>
      <div class="eh-scale"><span>16</span><span>20</span><span>25</span><span>30</span><span>35</span></div>
     </div>
    </section>
    <section class="eh-card"><div class="eh-duo">
     <button class="eh-tile" id="ehMode"><div class="eh-tile-h"><span>模式</span><span class="eh-tile-ic">${ehSvg('flame',16,'#f97316')}</span></div><b id="ehModeV">${d.mode}</b></button>
     <button class="eh-tile" id="ehTimer"><div class="eh-tile-h"><span>周期定时</span><span class="eh-tile-ic">${ehSvg('calclk',16,'#f97316')}</span></div><b class="eh-tile-hot" id="ehTimerV">${d.ehd&&d.ehd.days.length?d.ehd.days.map(x=>'周'+'一二三四五六日'[x-1]).join('、'):'未设置'}</b><small id="ehTimerS">${d.ehd&&d.ehd.days.length?d.ehd.onT+' 开机':'点击设置定时'}</small></button>
    </div></section>
    <div class="eh-sec"><h2>常用功能</h2><button class="eh-q" id="ehHelp">${ehSvg('help',12,'#737373')}</button></div>
    <section class="eh-card"><div class="eh-grid4">
     ${[['anion','负离子','wind'],['swing','摇头','refresh'],['disp','屏显','monitor'],['light','氛围灯','bulb']].map(f=>`
     <button class="eh-fn ${st[f[0]]?'on':''}" data-fn="${f[0]}"><span class="eh-fn-ic">${ehSvg(f[2],20)}</span><b>${f[1]}</b><small>${st[f[0]]?'已开启':'关闭'}</small></button>`).join('')}
    </div></section>
    <div class="eh-sec"><h2>智能控制</h2></div>
    <section class="eh-list">
     <div class="eh-li" id="ehQuick"><span class="eh-li-ic grad">${ehSvg('zap',20)}</span><div style="flex:1;min-width:0"><b>一键快控</b><p>个性化设置，一键应用</p></div><span class="go">${ehSvg('arr',16,'#a3a3a3')}</span></div>
     <div class="eh-li"><span class="eh-li-ic plain">${ehSvg('userx',20)}</span><div style="flex:1;min-width:0"><b>无人关机开关</b><p>检测无人时自动关机</p></div><span class="eh-sw ${st.noOff?'on':''}" id="ehNoOff"><i></i></span></div>
    </section>
    <div class="eh-sec"><h2>电量统计</h2></div>
    <section class="eh-card" id="ehEng" style="cursor:pointer">
     <div><div class="eh-eng-top"><span class="eh-eng-l">${ehSvg('cald',14,'#f97316')}本月电量</span><span class="eh-eng-r">较上月 <b>+12.3%</b></span></div>
      <div class="eh-eng-v"><b>86.5</b><span>度</span></div>
      <div class="eh-chart">${[['2月',58],['3月',64],['4月',41],['5月',36],['6月',52],['7月',86.5]].map((m,i)=>`<div class="bar ${i===5?'cur':''}"><i style="height:${m[1]/86.5*100}%"></i><span>${m[0]}</span></div>`).join('')}</div></div>
     <div class="eh-pw-row"><span class="eh-pw-l"><i></i>实时功率</span><b>1500<span>W</span></b></div>
    </section>
   </div></div>`);
  const $q=s=>pg.querySelector(s);
  const setT=v=>{d.t=Math.max(16,Math.min(35,v));
    $q('#ehBigT').textContent=d.t;$q('#ehTV').textContent=d.t;
    const p=(d.t-16)/19*100;$q('#ehFill').style.width=p+'%';$q('#ehThumb').style.left=p+'%';};
  $q('#ehMenu').onclick=()=>toast('电暖器设置');
  $q('#ehDn').onclick=()=>{if(!d.on)return toast('请先开机');setT(d.t-1);};
  $q('#ehUp').onclick=()=>{if(!d.on)return toast('请先开机');setT(d.t+1);};
  /* 滑条拖动 */
  const sl=$q('#ehSl');
  const slSet=x=>{const r=sl.getBoundingClientRect();const p=Math.max(0,Math.min(1,(x-r.left)/r.width));setT(16+Math.round(p*19));};
  let slOn=false;
  sl.addEventListener('pointerdown',e=>{if(!d.on)return;slOn=true;sl.setPointerCapture(e.pointerId);slSet(e.clientX);});
  sl.addEventListener('pointermove',e=>{if(slOn)slSet(e.clientX);});
  sl.addEventListener('pointerup',()=>{if(slOn){slOn=false;toast('目标温度已设为 '+d.t+'℃');}});
  /* 开关 */
  $q('#ehPower').onclick=()=>{d.on=!d.on;
    $q('#ehPower').classList.toggle('off',!d.on);
    $q('#ehPwSt').textContent=d.on?'设备运行中':'已关闭';
    $q('#ehBadge').innerHTML=ehSvg('flame',12)+(d.on?'偏热':'已关机');
    $q('#ehAlert').style.display=d.on?'flex':'none';
    toast(d.on?'电暖器已开机':'电暖器已关机');};
  /* 常用功能 */
  pg.querySelectorAll('[data-fn]').forEach(b=>b.onclick=()=>{
    if(!d.on)return toast('请先开机');
    const k=b.dataset.fn;st[k]=!st[k];b.classList.toggle('on',st[k]);
    b.querySelector('small').textContent=st[k]?'已开启':'关闭';
    const nm={anion:'负离子',swing:'摇头',disp:'屏显',light:'氛围灯'}[k];
    toast(nm+(st[k]?' 已开启':' 已关闭'));});
  $q('#ehHelp').onclick=()=>openModal(`<div class="ac-sheet-t">常用功能说明</div>
   <p style="font-size:11.5px;color:var(--ink2);margin-top:8px;line-height:1.9">负离子：释放负离子，净化空气沉降浮尘<br>摇头：左右 70° 广角送暖，室温更均匀<br>屏显：机身显示屏开关，夜间可关闭<br>氛围灯：底部暖光氛围灯带</p>
   <button class="cook-btn" data-close style="margin-top:14px;background:linear-gradient(135deg,#fb923c,#fb7185)">知道了</button>`,{center:true});
  /* 智能控制 */
  $q('#ehNoOff').onclick=()=>{st.noOff=!st.noOff;$q('#ehNoOff').classList.toggle('on',st.noOff);
    toast(st.noOff?'无人自动关机已开启':'无人自动关机已关闭');};
  /* 二级页 */
  $q('#ehMode').onclick=()=>openEhMode(d,$q);
  $q('#ehTimer').onclick=()=>openEhTimer(d,$q);
  $q('#ehQuick').onclick=()=>openEhQuick(d);
  $q('#ehEng').onclick=()=>openEhEnergy(d);
}
/* ---------- 电暖器二级页 · 通用头 ---------- */
function ehSubHead(t){return `<div class="eh-head" style="padding-top:46px">
  <button class="eh-ico-btn" data-back>${ehSvg('back',20,'#404040')}</button>
  <h1 style="font-size:15px;font-weight:600">${t}</h1><span style="width:36px"></span></div>`;}
/* ---------- 模式 ---------- */
const EH_MODES=[
 {n:'静热',ic:'flame',d:'低噪恒温运行，适合夜间长开',c:'#f97316',bg:'#ffedd5'},
 {n:'速热',ic:'zap',d:'1500W 全功率，快速暖房',c:'#ea580c',bg:'#ffedd5'},
 {n:'睡眠',ic:'moon',d:'渐降功率，后半夜自动保温',c:'#6366f1',bg:'#e0e7ff'},
 {n:'节能',ic:'leaf',d:'限功率运行，省电优先',c:'#16a34a',bg:'#dcfce7'},
 {n:'自动',ic:'spark',d:'按室温智能调节功率',c:'#d97706',bg:'#fef3c7'}];
function openEhMode(d,$q){
  const pg=openPage(`<div class="eh-wrap">${ehSubHead('模式')}<div class="eh-body">
   <div class="eh-list">${EH_MODES.map(m=>`
    <div class="eh-opt" data-md="${m.n}"><span class="eh-opt-ic" style="background:${m.bg};color:${m.c}">${ehSvg(m.ic,20)}</span>
     <div style="flex:1;min-width:0"><b>${m.n}</b><p>${m.d}</p></div>
     ${d.mode===m.n?`<span class="ok">${ehSvg('check',20)}</span>`:''}</div>`).join('')}
   </div></div></div>`);
  pg.querySelectorAll('[data-md]').forEach(o=>o.onclick=()=>{
    d.mode=o.dataset.md;
    if($q&&$q('#ehModeV'))$q('#ehModeV').textContent=d.mode;
    toast('已切换为「'+d.mode+'」模式');closePage();});
}
/* ---------- 周期定时 ---------- */
function openEhTimer(d,$q){
  d.ehd=d.ehd||{days:[1,2],onT:'10:30',offT:'22:30',en:true};const sc=d.ehd;
  const t2m=t=>{const[a,b]=t.split(':');return +a*60+ +b;};
  const m2t=m=>{m=Math.max(0,Math.min(1439,m));return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0');};
  const pg=openPage(`<div class="eh-wrap">${ehSubHead('周期定时')}<div class="eh-body">
   <section class="eh-list"><div class="eh-li"><span class="eh-li-ic grad">${ehSvg('calclk',20)}</span><div style="flex:1;min-width:0"><b>定时开关机</b><p id="ehScSt">${sc.en?'已启用':'已关闭'}</p></div><span class="eh-sw ${sc.en?'on':''}" id="ehScSw"><i></i></span></div></section>
   <div class="eh-sec"><h2>重复</h2></div>
   <section class="eh-card"><div class="eh-day">${'一二三四五六日'.split('').map((w,i)=>`<button class="${sc.days.includes(i+1)?'on':''}" data-day="${i+1}">${w}</button>`).join('')}</div></section>
   <div class="eh-sec"><h2>时间</h2></div>
   <section class="eh-card" style="padding:4px 16px">
    <div class="eh-time-row"><b>开机时间</b><div class="eh-time-v"><button data-tj="on,-30">−</button><span class="t" id="ehOnT">${sc.onT}</span><button data-tj="on,30">＋</button></div></div>
    <div class="eh-time-row"><b>关机时间</b><div class="eh-time-v"><button data-tj="off,-30">−</button><span class="t" id="ehOffT">${sc.offT}</span><button data-tj="off,30">＋</button></div></div>
   </section>
   <p style="font-size:10.5px;color:#a3a3a3;text-align:center;margin:14px 0">到点自动执行，执行时推送通知</p>
   <button class="cook-btn" id="ehScSave" style="background:linear-gradient(135deg,#fb923c,#fb7185)">保存定时</button>
  </div></div>`);
  const sync=()=>{if($q&&$q('#ehTimerV')){$q('#ehTimerV').textContent=sc.days.length?sc.days.slice().sort().map(x=>'周'+'一二三四五六日'[x-1]).join('、'):'未设置';
    $q('#ehTimerS').textContent=sc.days.length?sc.onT+' 开机':'点击设置定时';}};
  pg.querySelector('#ehScSw').onclick=()=>{sc.en=!sc.en;pg.querySelector('#ehScSw').classList.toggle('on',sc.en);
    pg.querySelector('#ehScSt').textContent=sc.en?'已启用':'已关闭';};
  pg.querySelectorAll('[data-day]').forEach(b=>b.onclick=()=>{
    const i=+b.dataset.day,ix=sc.days.indexOf(i);
    if(ix>=0)sc.days.splice(ix,1);else sc.days.push(i);
    b.classList.toggle('on',ix<0);});
  pg.querySelectorAll('[data-tj]').forEach(b=>b.onclick=()=>{
    const[k,v]=b.dataset.tj.split(',');const key=k==='on'?'onT':'offT';
    sc[key]=m2t(t2m(sc[key])+ +v);
    pg.querySelector(k==='on'?'#ehOnT':'#ehOffT').textContent=sc[key];});
  pg.querySelector('#ehScSave').onclick=()=>{sync();toast('周期定时已保存');closePage();};
}
/* ---------- 一键快控 ---------- */
const EH_QUICK=[
 {n:'回家速暖',d:'速热 · 28℃ · 摇头开',bg:'linear-gradient(135deg,#fb923c,#f43f5e)',t:28,m:'速热',f:{swing:true}},
 {n:'睡眠呵护',d:'睡眠模式 · 24℃ · 屏显关',bg:'linear-gradient(135deg,#818cf8,#6366f1)',t:24,m:'睡眠',f:{disp:false}},
 {n:'节能保温',d:'节能 · 22℃ · 负离子开',bg:'linear-gradient(135deg,#4ade80,#16a34a)',t:22,m:'节能',f:{anion:true}}];
function openEhQuick(d){
  const pg=openPage(`<div class="eh-wrap">${ehSubHead('一键快控')}<div class="eh-body">
   <p style="font-size:11px;color:#737373;margin:4px 4px 14px;line-height:1.6">个性化预设，一键应用全部参数</p>
   ${EH_QUICK.map((q,i)=>`<div class="eh-qk-card" style="background:${q.bg}" data-qk="${i}">
     <b>${q.n}</b><p>${q.d}</p><button class="eh-qk-apply" data-apply="${i}">一键应用</button></div>`).join('')}
   <p style="font-size:10.5px;color:#a3a3a3;text-align:center;margin-top:16px">长按卡片可编辑预设（演示）</p>
  </div></div>`);
  pg.querySelectorAll('[data-apply]').forEach(b=>b.onclick=e=>{
    e.stopPropagation();const q=EH_QUICK[+b.dataset.apply];
    d.t=q.t;d.mode=q.m;Object.assign(d.eh,q.f);
    toast('已应用「'+q.n+'」：'+q.m+' · '+q.t+'℃');
    setTimeout(()=>{closePage();setTimeout(()=>{closePage();openEHeaterCtl(d);},120);},450);});
}
/* ---------- 电量统计 ---------- */
function openEhEnergy(d){
  const defs={eh_use:{t:'用电量',key:'eh_use',unit:' 度',color:'#fb923c',type:'bar'}};
  const pg=openPage(`<div class="eh-wrap">${ehSubHead('电量统计')}<div class="eh-body">
   <section class="eh-card">
    <div class="eh-eng-top"><span class="eh-eng-l">${ehSvg('cald',14,'#f97316')}本月电量</span><span class="eh-eng-r">较上月 <b>+12.3%</b></span></div>
    <div class="eh-eng-v"><b>86.5</b><span>度</span></div>
    <div class="eh-chart">${[['2月',58],['3月',64],['4月',41],['5月',36],['6月',52],['7月',86.5]].map((m,i)=>`<div class="bar ${i===5?'cur':''}"><i style="height:${m[1]/86.5*100}%"></i><span>${m[0]}</span></div>`).join('')}</div>
   </section>
   <div class="eh-sec"><h2>用电明细</h2></div>
   ${chartCard('用电量','eh_use',' 度','#fb923c','bar')}
   <section class="eh-list" style="margin-top:12px">
    <div class="eh-li"><span class="eh-li-ic plain">${ehSvg('zap',20)}</span><div style="flex:1;min-width:0"><b>实时功率</b><p>当前运行功率</p></div><b style="font-size:15px">1500 W</b></div>
    <div class="eh-li"><span class="eh-li-ic plain">${ehSvg('cald',20)}</span><div style="flex:1;min-width:0"><b>今日用电</b><p>较昨日 -8%</p></div><b style="font-size:15px">3.2 度</b></div>
    <div class="eh-li"><span class="eh-li-ic plain">${ehSvg('leaf',20)}</span><div style="flex:1;min-width:0"><b>电费预估</b><p>按 0.6 元/度</p></div><b style="font-size:15px">51.9 元</b></div>
   </section>
  </div></div>`);
  bindCharts(pg,defs);
}

/* ================= 电饭煲控制页 ================= */
const RC_POT=s=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="4" y="8.5" width="16" height="10.5" rx="4"/><path d="M8.5 8.5v-2h7v2"/><circle cx="12" cy="13.5" r="1.8"/></svg>`;
const RC_QUICK=s=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8.5" width="16" height="10.5" rx="4"/><path d="M12.6 10.5 10.8 13h2l-1.6 3.4 4-4h-2.2z" fill="currentColor" stroke="none"/></svg>`;
const RC_CONGEE=s=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 12.5h16a8 8 0 0 1-16 0z"/><path d="M8 9c.8-1 .8-2 0-3M12 9c.8-1 .8-2 0-3M16 9c.8-1 .8-2 0-3"/></svg>`;
const RC_STEW=s=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 10.5h14v1.5a7 7 0 0 1-14 0z"/><path d="M5 10.5c0-2.2 3-3.5 7-3.5s7 1.3 7 3.5"/><path d="M9.5 4.6c.7-.9.7-1.8 0-2.6M13.5 4.6c.7-.9.7-1.8 0-2.6"/></svg>`;
const RC_CLOCHE=s=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3.5 18h17"/><path d="M5 18a7 7 0 0 1 14 0"/><path d="M12 11V9"/><circle cx="12" cy="7.8" r="1.1"/></svg>`;
const RC_CLAY=s=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4.5 11h15l-1.3 7a3 3 0 0 1-3 2.5H8.8a3 3 0 0 1-3-2.5z"/><path d="M3 11h18"/><path d="M9 7.6c.8-1 .8-2 0-2.9M14 7.6c.8-1 .8-2 0-2.9"/></svg>`;
const RC_SPROUT=s=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.5h16a7 7 0 0 1-16 0z"/><path d="M12 14.5v-5"/><path d="M12 9.5c0-3-2-4.5-5-4.5 0 2.5 2 4.5 5 4.5zM12 9.5c0-3 2-4.5 5-4.5 0 2.5-2 4.5-5 4.5z"/></svg>`;
const RC_MODES=[
 ['精华饭','50分钟',50,'coral',RC_POT],['快煮饭','28分钟',28,'amber',RC_QUICK],
 ['香浓粥','1小时30分钟',90,'coral',RC_CONGEE],['焖炖','1小时',60,'amber',RC_STEW],
 ['无水焗','45分钟',45,'coral',RC_CLOCHE],['煲仔饭','55分钟',55,'',RC_CLAY],
 ['发芽饭','2小时',120,'green',RC_SPROUT],['热饭','20分钟',20,'amber',RC_CONGEE]];
const RC_CLOUD=[['r_rice','腊味煲仔饭','煲仔饭模式 · 55分钟',55],['r_soup','冬瓜排骨汤','焖炖模式 · 1小时',60],['r_cake','电饭煲蛋糕','蛋糕模式 · 50分钟',50],['r_pudding','焦糖炖奶','蒸煮模式 · 25分钟',25]];
/* ================= 电饭煲（格米智能 GDCF-3025Ca · 需求文档复刻） ================= */
const RCSVG={
 back:'<path d="m15 18-6-6 6-6"/>',arr:'<path d="m9 18 6-6-6-6"/>',check:'<path d="M20 6 9 17l-5-5"/>',
 dots:'<circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>',
 bell:'<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2.5h-15z"/><path d="M10 21a2 2 0 0 0 4 0"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
 cam:'<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
 star:'<path d="m12 2.5 2.9 5.9 6.6 1-4.7 4.6 1.1 6.5L12 17.4l-5.9 3.1 1.1-6.5L2.5 9.4l6.6-1z"/>',
 clk:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
 spark:'<path d="M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2z"/>',
 mic:'<rect x="9" y="2.5" width="6" height="11.5" rx="3"/><path d="M5.8 11.2a6.2 6.2 0 0 0 12.4 0"/><path d="M12 17.4v3.1"/><path d="M9 20.5h6"/>',
 cart:'<circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/><path d="M3 4h2l2.4 12h9.6l2-9H7"/>',
 pin:'<path d="M12 21s-6.5-5.4-6.5-10.2A6.5 6.5 0 0 1 12 4.5a6.5 6.5 0 0 1 6.5 6.3C18.5 15.6 12 21 12 21z"/><circle cx="12" cy="10.8" r="2.2"/>',
 flame:'<path d="M12 2.5c1 3.5-4 5.5-4 10a4 4 0 0 0 8 0c0-1.5-.5-2.5-1-3.5-1 1-1.5 1.5-2 3-1-2-.5-6-1-9.5z"/>',
 pot:'<path d="M4 10h16v3a8 8 0 0 1-16 0z"/><path d="M2 10h20M8 6c0-1.5 1-2 2-2s2 .5 2 2"/>',
 bag:'<path d="M6 8h12l-1 12.5H7z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
 spoon:'<path d="M8 2.5a3.5 3.5 0 0 1 3.5 3.5c0 2-1.5 3-2.5 3.5V21h-2V9.5C6 9 4.5 8 4.5 6A3.5 3.5 0 0 1 8 2.5z"/>',
 cloth:'<path d="M4 7c2.5-2 5-2 8 0s5.5 2 8 0v10c-2.5 2-5 2-8 0s-5.5-2-8 0z"/>',
 share:'<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4"/>',
 cmt:'<path d="M21 11.5a7.5 7.5 0 0 1-7.5 7.5H4l2-3.4A7.5 7.5 0 1 1 21 11.5z"/>',
 fav:'<path d="M12 20.5S4 15.5 4 9.8A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 8 2.8c0 5.7-8 10.7-8 10.7z"/>',
 hist:'<path d="M3 12a9 9 0 1 0 2.6-6.3L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3.5 2"/>',
 edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
 wave:'<path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4"/>',
 grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
 book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'};
const rcSvg=(k,sz,c,sw)=>`<svg width="${sz||18}" height="${sz||18}" viewBox="0 0 24 24" fill="none" stroke="${c||'currentColor'}" stroke-width="${sw||2}" stroke-linecap="round" stroke-linejoin="round">${RCSVG[k]}</svg>`;
const RC_TYPES=['东北珍珠米','五常稻香米','东北长粒香','丝苗米','糙米'];
const RC_TYPE_D={'东北珍珠米':'圆润饱满，饭香浓郁','五常稻香米':'核心产区，油润香甜','东北长粒香':'修长粒型，松软清香','丝苗米':'煲仔饭首选，粒粒分明','糙米':'低糖高纤，健康粗粮'};
const RC_MODE_LST=[['精煮饭',45],['快煮饭',25],['煲仔饭',55],['煮粥',60],['杂粮饭',50],['蛋糕',50],['保温',0]];
const RC_RECIPES=[
 {n:'广式煲仔饭',img:'r_rice',min:45,star:4.8,mode:'煲仔饭',d:'腊肠润肠与丝苗米同焖，锅底结出金黄锅巴，淋豉油香气扑鼻。'},
 {n:'杂粮养生饭',img:'r_mung',min:55,star:4.6,mode:'杂粮饭',d:'糙米、燕麦与红豆科学配比，低糖高纤，口感层次丰富。'},
 {n:'南瓜小米粥',img:'r_pudding',min:30,star:4.9,mode:'煮粥',d:'南瓜自然清甜，小米软糯顺滑，晨起养胃首选。'},
 {n:'电饭煲蛋糕',img:'r_cake',min:50,star:4.7,mode:'蛋糕',d:'无需烤箱，蓬松绵软的戚风蛋糕，新手一次成功。'},
 {n:'冬瓜排骨汤',img:'r_soup',min:60,star:4.9,mode:'煮粥',d:'文火慢炖，汤清味鲜，冬瓜入口即化。'}];
const RC_SHOP=[['大米粗粮',[
 {n:'东北珍珠米',p:39.9,o:58,img:'img/shop_rice1.jpg',tag:'当季新米'},
 {n:'五常稻香米',p:89.9,o:128,img:'img/shop_rice2.jpg',tag:'核心产区'},
 {n:'东北长粒香',p:18.9,o:25,img:'img/shop_rice3.jpg',tag:'性价比之选'}]],
 ['配件',[
 {n:'不粘内胆 4L',p:159,o:0,img:'img/shop_pot.jpg',tag:'原厂适配'},
 {n:'饭勺套装',p:29.9,o:0,img:'img/shop_spoon.jpg',tag:'食品级材质'},
 {n:'清洁抹布套装',p:39,o:0,img:'img/shop_cloth.jpg',tag:'3 条装'}]]];
const RC_HIS=[
 {d:'06',m:'08月',n:'精煮饭 · 东北珍珠米',t:'18:32 · 32min · 口感 Q弹',mode:'精煮饭',min:32},
 {d:'05',m:'08月',n:'杂粮养生饭',t:'17:05 · 55min · 口感 适中',mode:'杂粮饭',min:55},
 {d:'03',m:'08月',n:'煮粥 · 东北珍珠米',t:'07:15 · 60min · 口感 软糯',mode:'煮粥',min:60},
 {d:'01',m:'08月',n:'煲仔饭 · 丝苗米',t:'19:02 · 55min · 口感 嚼劲',mode:'煲仔饭',min:55}];
function rcStageInfo(){
 const r=S.rice;
 if(!r.cooking)return {n:'待机',t:'--'};
 if(r.left<=0)return {n:'保温中',t:'65°C'};
 const p=1-r.left/(r.dur||45*60);
 if(p<.25)return {n:'吸水期',t:'45°C'};
 if(p<.5)return {n:'加热期',t:'78°C'};
 if(p<.8)return {n:'沸腾期',t:'98°C'};
 return {n:'焖饭期',t:'85°C'};}
function rcEta(){const t=new Date(Date.now()+S.rice.left*1000);return String(t.getHours()).padStart(2,'0')+':'+String(t.getMinutes()).padStart(2,'0');}
function rcCurveSVG(full){
 const r=S.rice,p=full?1:(r.cooking?Math.min(1,Math.max(0,1-r.left/(r.dur||45*60))):0);
 const pts=[[34,97],[96,76],[152,20],[224,22],[282,38],[306,49]];
 const line=pts.map((q,i)=>(i?'L':'M')+q[0]+' '+q[1]).join(' ');
 const xs=[65,124,188,253,294],si=p>=1?4:p<.25?0:p<.5?1:p<.8?2:3;
 const cx=34+248*p;let cy=97;
 for(let i=0;i<5;i++){const a=pts[i][0],b=pts[i+1][0];
  if(cx<=b||i===4){cy=pts[i][1]+(pts[i+1][1]-pts[i][1])*Math.min(1,Math.max(0,(cx-a)/(b-a)));break;}}
 const show=r.cooking&&!full;
 return `<svg viewBox="0 0 320 124" style="width:100%;display:block;margin-top:8px">
  <defs><linearGradient id="rcg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f29900" stop-opacity=".26"/><stop offset="1" stop-color="#f29900" stop-opacity="0"/></linearGradient></defs>
  ${[20,60,100].map(t=>{const y=100-(t-20)/90*80;return `<line x1="30" x2="312" y1="${y}" y2="${y}" stroke="#f0e9da" stroke-width="1" stroke-dasharray="3 4"/><text x="6" y="${y+3}" font-size="8" fill="#c3b696">${t}°</text>`}).join('')}
  <path d="${line} L306 108 L34 108 Z" fill="url(#rcg)"/>
  <path d="${line}" fill="none" stroke="#f29900" stroke-width="2.2" stroke-linecap="round"/>
  ${['吸水','加热','沸腾','焖饭','保温'].map((s,i)=>`<text x="${xs[i]}" y="119" font-size="8.5" fill="${i===si&&show?'#e8710a':'#b3a88f'}" text-anchor="middle" font-weight="${i===si&&show?700:400}">${s}</text>`).join('')}
  ${show?`<circle cx="${cx}" cy="${cy}" r="4.2" fill="#e8710a" stroke="#fff" stroke-width="2"/>
   <text x="${Math.min(cx+9,236)}" y="${Math.max(cy-9,12)}" font-size="9" fill="#e8710a" font-weight="700">${S.riceTaste||'Q弹偏软'}</text>`:''}
 </svg>`;}
function rcPage(title,body){
 return openPage(`<div class="rc-wrap">
  <div class="rc-head" style="padding-bottom:8px"><button class="rc-bk" data-back>${rcSvg('back',18,'#6b6152')}</button>
   <h1 style="font-size:15px">${title}</h1></div>
  <div class="rc-body" style="padding-top:2px">${body}</div></div>`);}
function openRiceCtl(d){
 S.riceType=S.riceType||'东北珍珠米';S.riceTaste=S.riceTaste||'Q弹偏软';
 S.rcModes=S.rcModes||['精煮饭','快煮饭','煲仔饭','煮粥','杂粮饭'];
 S.rcMode=S.rcMode||'精煮饭';
 S.rcRemind=S.rcRemind||{on:true,t:'18:00'};
 const el=openPage(`<div class="rc-wrap">
  <div class="wm2-head" style="padding-top:46px"><button class="wm2-ico" data-back>${svgBack}</button>
   <div class="wm2-head-t"><h1>智能电饭煲</h1><p>GDCF-3025Ca · 智能烹饪</p></div>
   <button class="wm2-ico" id="rcMore">${AC_MISC_SVG.dots}</button></div>
  <div class="rc-body" id="rcBody"></div>
  <button class="rc-mic" id="rcMic">${rcSvg('mic',22,'#fff')}</button>
 </div>`);
 el.querySelector('#rcMore').onclick=()=>toast('电饭煲设置');
 const startCook=(name,min)=>{
  S.rice={dish:name,left:min*60,dur:min*60,running:true,cooking:true};
  render();el.querySelector('#rcBody').scrollTop=0;toast('已启动「'+name+'」');};
 const render=()=>{
  const r=S.rice,cook=r.cooking&&r.left>0,done=r.cooking&&r.left<=0,st=rcStageInfo();
  el.querySelector('#rcBody').innerHTML=`
   <div class="rc-hero">${cook?`
     <div><span class="rc-alt">${rcSvg('pin',11,'#c07a12')}珠海 · 23m</span>
      <div class="rc-hero-st" style="margin-top:5px">${r.dish}烹饪中</div>
      <div class="rc-hero-sub" style="margin-top:8px">剩余时间</div>
      <div class="rc-hero-big" id="ringRice">${fmt(r.left)}</div>
      <div class="rc-hero-sub" id="rcEta">预计 ${rcEta()} 完成</div>
      <button class="rc-endbtn" id="rcEnd">结束</button></div>`
    :done?`
     <div><span class="rc-alt">${rcSvg('pin',11,'#c07a12')}珠海 · 23m</span>
      <div class="rc-hero-st" style="margin-top:5px">${r.dish} 已完成</div>
      <div class="rc-hero-big" style="font-size:32px;margin-top:8px">保温中</div>
      <div class="rc-hero-sub">65°C 恒温保鲜 · 请及时享用</div>
      <button class="rc-endbtn" id="rcEnd">结束保温</button></div>`
    :`<div><span class="rc-alt">${rcSvg('pin',11,'#c07a12')}珠海 · 23m</span>
      <div class="rc-hero-st" style="font-size:17px;margin-top:5px">待机</div>
      <div class="rc-hero-sub" style="margin-top:6px">米已洗好，随时可开始煮饭</div></div>`}
    <img src="img/rice_new.png" alt="智能电饭煲"></div>
   ${r.cooking?`<div class="rc-card"><div class="rc-card-h"><b>${rcSvg('wave',15,'#e8710a')} 烹饪曲线</b><span class="rc-badge" id="rcStageB">${st.n} · ${st.t}</span></div>${rcCurveSVG()}</div>`
    :`<div class="rc-card rc-remind" id="rcRemindC"><span class="rc-remind-ic">${rcSvg('bell',18)}</span>
      <div style="flex:1;min-width:0"><b>忘煮饭提醒${S.rcRemind.on?'已开启':'已关闭'}</b><p>每日 ${S.rcRemind.t} 未煮将通知家人</p></div>
      <button id="rcQuickStart">一键煮饭</button></div>`}
   <div class="rc-duo" style="margin-top:12px">
    <div class="rc-mini"><div class="rc-mini-h">${rcSvg('flame',13,'#e8710a')} 米种 <span class="g" id="rcTypeG">${rcSvg('gear',14)}</span></div>
     <div class="rc-mini-v"><b>${S.riceType}</b><span class="rc-tag">常用</span></div>
     <button class="rc-cambtn" id="rcCam">${rcSvg('cam',14)}拍照识别米种</button></div>
    <div class="rc-mini"><div class="rc-mini-h">${rcSvg('star',13,'#e8710a')} 口感 <span class="g" id="rcTasteG">${rcSvg('gear',14)}</span></div>
     <div class="rc-mini-v"><b>${S.riceTaste}</b><span class="rc-tag">根据习惯</span></div>
     <p>根据烹饪习惯自动学习，推荐最适合您的口感偏好</p></div></div>
   <div class="rc-sec"><h2>${rcSvg('grid',14,'#e8710a')} 模式</h2><span class="more" id="rcModeEdit">编辑 ›</span></div>
   <div class="rc-card"><div class="rc-chips">${S.rcModes.map(m=>`<button class="rc-chip ${m===S.rcMode?'on':''}" data-m="${m}">${m}</button>`).join('')}</div>
    <div class="rc-tiles">
     <button class="rc-tile" id="rcBook"><b>${rcSvg('clk',14,'#e8710a')}预约烹饪</b><small>定时启动</small></button>
     <button class="rc-tile" id="rcDiy"><b>${rcSvg('spark',14,'#e8710a')}DIY 烹饪程序</b><small>分步编辑</small></button></div></div>
   <div class="rc-sec"><h2>${rcSvg('book',14,'#e8710a')} 食谱推荐</h2><span class="more" id="rcRecAll">全部 ›</span></div>
   <div class="rc-recipes">${RC_RECIPES.map((r2,i)=>`<div class="rc-rec" data-ri="${i}"><img src="img/${r2.img}.png"><div class="n">${r2.n}</div><div class="m">${r2.min}min · ${r2.star}★</div></div>`).join('')}</div>
   <div class="rc-sec"><h2>${rcSvg('bag',14,'#e8710a')} 商城</h2><span class="more" id="rcShopAll">全部 ›</span></div>
   <div class="rc-card">${RC_SHOP.map(g=>`<div class="rc-sub">${g[0]}</div><div class="rc-shop-g">${g[1].map(p2=>`
     <div class="rc-goods"><div class="pic"><img src="${p2.img}" alt="${p2.n}"></div>
      <div class="n">${p2.n}</div><div class="pr"><b>¥${p2.p}</b>${p2.o?`<s>¥${p2.o}</s>`:''}<span class="rc-cart" data-add="${p2.n}">${rcSvg('cart',12,'#fff')}</span></div></div>`).join('')}</div>`).join('')}</div>
   <div class="rc-sec"><h2>${rcSvg('hist',14,'#e8710a')} 烹饪记录</h2><span class="more" id="rcHisAll">历史 ›</span></div>
   <div class="rc-card">${RC_HIS.slice(0,2).map((h,i)=>`
    <div class="rc-recl"><div class="rc-date"><b>${h.d}</b><span>${h.m}</span></div>
     <div class="ti"><b>${h.n}</b><p>${h.t}</p></div>
     <button class="rc-again" data-ag="${i}">一键煮饭</button></div>`).join('')}</div>
   <div style="height:6px"></div>`;
  bind();};
 const bind=()=>{
  el.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{S.rcMode=b.dataset.m;render();});
  const qs=el.querySelector('#rcQuickStart');
  if(qs)qs.onclick=e=>{e.stopPropagation();const mm=RC_MODE_LST.find(x=>x[0]===S.rcMode)||RC_MODE_LST[0];startCook(mm[0],mm[1]);};
  const rc=el.querySelector('#rcRemindC');
  if(rc)rc.onclick=()=>openRcRemind(render);
  const en=el.querySelector('#rcEnd');
  if(en)en.onclick=()=>{const wasDone=S.rice.left<=0;S.rice={dish:'',left:0,running:false,cooking:false};render();toast(wasDone?'已结束保温':'已结束烹饪');};
  el.querySelector('#rcTypeG').onclick=()=>openRcType(render);
  el.querySelector('#rcCam').onclick=()=>openCamMock('请对准大米拍照','识别成功：五常稻香米',()=>{S.riceType='五常稻香米';render();});
  el.querySelector('#rcTasteG').onclick=()=>openRcTaste(render);
  el.querySelector('#rcBook').onclick=()=>openRcBook();
  el.querySelector('#rcDiy').onclick=()=>openRcDiy();
  el.querySelector('#rcModeEdit').onclick=()=>openRcModeEdit(render);
  el.querySelector('#rcRecAll').onclick=()=>openRcRecipes(startCook);
  el.querySelectorAll('[data-ri]').forEach(c=>c.onclick=()=>openRcRecipes(startCook));
  el.querySelector('#rcShopAll').onclick=()=>openRcShop();
  el.querySelectorAll('[data-add]').forEach(b=>b.onclick=e=>{e.stopPropagation();toast('已将「'+b.dataset.add+'」加入购物车');});
  el.querySelector('#rcHisAll').onclick=()=>openRcHis(startCook);
  el.querySelectorAll('[data-ag]').forEach(b=>b.onclick=()=>{const h=RC_HIS[+b.dataset.ag];startCook(h.mode,h.min);});};
 el.querySelector('#rcMic').onclick=()=>openRcVoice(startCook);
 render();
}
/* ---------- 电饭煲二级页 ---------- */
function openRcTaste(done){
 const opts=[['软糯','水分更足，适合老人与小孩'],['Q弹偏软','米粒分明又带软糯，大多数人喜欢'],['嚼劲','偏硬有嚼头，炒饭口感更佳']];
 const el=rcPage('口感定制',`
  <div class="rc-card" style="margin-top:6px">${opts.map(o=>`
   <div class="rc-opt" data-t="${o[0]}"><div style="flex:1;min-width:0"><b>${o[0]}</b><p>${o[1]}</p></div>
    <span class="rc-radio ${S.riceTaste===o[0]?'on':''}">${rcSvg('check',13)}</span></div>`).join('')}</div>
  <div class="rc-card"><div style="display:flex;align-items:center;gap:8px"><b style="font-size:13px;flex:1">根据习惯自动学习</b>
   <span class="eh-sw ${S.rcLearn===false?'':'on'}" id="rcLearn"><i></i></span></div>
   <p style="font-size:10.5px;color:#a39880;margin-top:8px;line-height:1.6">已学习近 30 天 12 次烹饪反馈，自动微调吸水时长与焖饭温度，为您推荐「${S.riceTaste}」。</p></div>
  <div class="rc-card"><b style="font-size:13px">餐后反馈</b>
   <p style="font-size:10.5px;color:#a39880;margin-top:6px">上一锅「精煮饭」的口感如何？反馈后 AI 将自动调整</p>
   <div class="rc-chips" style="margin-top:10px">${['好吃，保持','偏硬一点','偏软一点'].map(x=>`<button class="rc-chip" data-fb="${x}">${x}</button>`).join('')}</div></div>`);
 el.querySelectorAll('[data-t]').forEach(o=>o.onclick=()=>{S.riceTaste=o.dataset.t;
  el.querySelectorAll('[data-t] .rc-radio').forEach(x=>x.classList.remove('on'));
  o.querySelector('.rc-radio').classList.add('on');
  toast('口感已设为「'+o.dataset.t+'」');if(done)done();});
 el.querySelector('#rcLearn').onclick=e=>{S.rcLearn=!e.currentTarget.classList.contains('on');e.currentTarget.classList.toggle('on',S.rcLearn);toast(S.rcLearn?'自动学习已开启':'自动学习已关闭');};
 el.querySelectorAll('[data-fb]').forEach(b=>b.onclick=()=>toast('已记录反馈，下次烹饪将自动微调'));
}
function openRcType(done){
 const el=rcPage('默认米种',`
  <div class="rc-card" style="margin-top:6px" id="rcTypeList">${RC_TYPES.map(t=>`
   <div class="rc-opt" data-t="${t}"><span class="rc-remind-ic" style="width:34px;height:34px">${rcSvg('bag',16)}</span>
    <div style="flex:1;min-width:0"><b>${t}</b><p>${RC_TYPE_D[t]}</p></div>
    ${S.riceType===t?'<span class="rc-tag">常用</span>':''}<span class="rc-radio ${S.riceType===t?'on':''}">${rcSvg('check',13)}</span></div>`).join('')}</div>
  <button class="rc-cambtn" id="rcCam2" style="margin-top:12px;background:#fff;box-shadow:0 2px 12px rgba(160,120,50,.07);padding:14px 0;border-radius:20px">${rcSvg('cam',15)}拍照识别米种</button>
  <p style="font-size:10px;color:#a39880;text-align:center;margin-top:10px">识别后将自动匹配该米种的吸水曲线与烹饪参数</p>`);
 const upd=()=>{el.querySelectorAll('[data-t]').forEach(x=>{
   const on=x.dataset.t===S.riceType;
   x.querySelector('.rc-radio').classList.toggle('on',on);
   const tag=x.querySelector('.rc-tag');if(tag)tag.remove();
   if(on)x.querySelector('.rc-radio').insertAdjacentHTML('beforebegin','<span class="rc-tag">常用</span>');});};
 el.querySelectorAll('[data-t]').forEach(o=>o.onclick=()=>{S.riceType=o.dataset.t;upd();toast('默认米种已设为「'+o.dataset.t+'」');if(done)done();});
 el.querySelector('#rcCam2').onclick=()=>openCamMock('请对准大米拍照','识别成功：五常稻香米',()=>{S.riceType='五常稻香米';upd();if(done)done();});
}
function openRcRemind(done){
 const r=S.rcRemind;let mins=18*60;
 const mm=r.t.match(/(\d+):(\d+)/);if(mm)mins=(+mm[1])*60+(+mm[2]);
 const el=rcPage('忘煮饭提醒',`
  <div class="rc-card" style="margin-top:6px"><div style="display:flex;align-items:center;gap:9px">
   <span class="rc-remind-ic">${rcSvg('bell',17)}</span><div style="flex:1"><b style="font-size:13px">提醒开关</b><p style="font-size:10px;color:#a39880;margin-top:2px">检测到已放米水但到点未煮时提醒</p></div>
   <span class="eh-sw ${r.on?'on':''}" id="rmSw"><i></i></span></div></div>
  <div class="rc-card"><b style="font-size:13px">提醒时间</b>
   <div class="rc-book-t"><button class="eh-step" id="rtD">−</button><b id="rtV">${r.t}</b><button class="eh-step" id="rtU">＋</button></div>
   <p style="font-size:10.5px;color:#a39880;margin-top:8px;text-align:center">AI 已学习：工作日晚饭通常 17:30 - 18:30 开始</p></div>
  <div class="rc-card"><b style="font-size:13px">通知家人</b>
   ${['爸爸','妈妈','爷爷','奶奶'].map((n,i)=>`<div class="rc-opt" style="cursor:default"><div style="flex:1"><b style="font-size:12.5px">${n}</b></div><span class="eh-sw ${i<2?'on':''}" data-fam><i></i></span></div>`).join('')}</div>`);
 const show=()=>el.querySelector('#rtV').textContent=r.t;
 el.querySelector('#rmSw').onclick=e=>{r.on=!r.on;e.currentTarget.classList.toggle('on',r.on);toast(r.on?'忘煮饭提醒已开启':'提醒已关闭');if(done)done();};
 el.querySelector('#rtU').onclick=()=>{mins=Math.min(23*60+30,mins+30);r.t=String(Math.floor(mins/60)).padStart(2,'0')+':'+String(mins%60).padStart(2,'0');show();if(done)done();};
 el.querySelector('#rtD').onclick=()=>{mins=Math.max(0,mins-30);r.t=String(Math.floor(mins/60)).padStart(2,'0')+':'+String(mins%60).padStart(2,'0');show();if(done)done();};
 el.querySelectorAll('[data-fam]').forEach(s=>s.onclick=()=>{s.classList.toggle('on');toast(s.classList.contains('on')?'已加入通知名单':'已移出通知名单');});
}
function openRcBook(){
 let mins=18*60+30,mode=S.rcMode;
 const el=rcPage('预约烹饪',`
  <div class="rc-card" style="margin-top:6px"><b style="font-size:13px">烹饪模式</b>
   <div class="rc-chips" style="margin-top:10px">${S.rcModes.map(m=>`<button class="rc-chip ${m===mode?'on':''}" data-bm="${m}">${m}</button>`).join('')}</div></div>
  <div class="rc-card"><b style="font-size:13px">完成时间</b>
   <div class="rc-book-t"><button class="eh-step" id="bkD">−</button><b id="bkV">今晚 18:30</b><button class="eh-step" id="bkU">＋</button></div>
   <p style="font-size:10.5px;color:#a39880;margin-top:8px;text-align:center">按 30 分钟步进调整，电饭煲自动倒推启动时间</p></div>
  <div class="rc-card"><b style="font-size:13px">预约说明</b>
   <p style="font-size:10.5px;color:#a39880;margin-top:6px;line-height:1.7">请在预约前放好米与水；夏季长时间浸泡建议选择 4 小时内的预约。到点前 10 分钟手机将再次提醒。</p></div>
  <button class="rc-save" id="bkSave">保存预约</button>`);
 const show=()=>el.querySelector('#bkV').textContent='今晚 '+String(Math.floor(mins/60)).padStart(2,'0')+':'+String(mins%60).padStart(2,'0');
 el.querySelectorAll('[data-bm]').forEach(b=>b.onclick=()=>{mode=b.dataset.bm;el.querySelectorAll('[data-bm]').forEach(x=>x.classList.toggle('on',x===b));});
 el.querySelector('#bkU').onclick=()=>{mins=Math.min(23*60+30,mins+30);show();};
 el.querySelector('#bkD').onclick=()=>{mins=Math.max(6*60,mins-30);show();};
 el.querySelector('#bkSave').onclick=()=>{S.rcBook={mode,t:el.querySelector('#bkV').textContent};toast('已预约：'+el.querySelector('#bkV').textContent+' 完成「'+mode+'」');closePage();};
}
function openRcDiy(){
 const steps=S.rcDiySteps=S.rcDiySteps||[{n:'吸水',min:10,t:65,f:'小火'},{n:'加热',min:8,t:100,f:'大火'},{n:'沸腾',min:15,t:98,f:'中火'},{n:'焖饭',min:12,t:85,f:'小火'}];
 const FIRES=['小火','中火','大火'];
 const el=rcPage('DIY 烹饪程序',`<div id="diyList"></div>
  <button class="rc-addstep" id="diyAdd">＋ 添加步骤</button>
  <div class="rc-card"><b style="font-size:13px">程序说明</b>
   <p style="font-size:10.5px;color:#a39880;margin-top:6px;line-height:1.7">分步自定义时长、温度与火力，保存后同步至电饭煲，可作为固定模式一键启动。沸点已按珠海海拔 23m 自动校准。</p></div>
  <button class="rc-save" id="diySave">保存并同步到电饭煲</button>`);
 const render=()=>{
  el.querySelector('#diyList').innerHTML=steps.map((s,i)=>`
   <div class="rc-card rc-step"><div class="rc-step-h"><b>第${'一二三四五六'[i]}步 · ${s.n}</b>${steps.length>1?`<span class="g" data-del="${i}">删除</span>`:''}</div>
    <div class="rc-step-row"><span>时长</span><div class="rc-mini-st"><button data-ds="${i}|min|-1">−</button><b>${s.min} 分钟</b><button data-ds="${i}|min|1">＋</button></div></div>
    <div class="rc-step-row"><span>温度</span><div class="rc-mini-st"><button data-ds="${i}|t|-1">−</button><b>${s.t} °C</b><button data-ds="${i}|t|1">＋</button></div></div>
    <div class="rc-step-row"><span>火力</span><div class="rc-mini-st"><button data-ds="${i}|f|-1">−</button><b>${s.f}</b><button data-ds="${i}|f|1">＋</button></div></div></div>`).join('');
  el.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{steps.splice(+b.dataset.del,1);render();});
  el.querySelectorAll('[data-ds]').forEach(b=>b.onclick=()=>{const[i,k,dir]=b.dataset.ds.split('|'),s=steps[+i];
   if(k==='min')s.min=Math.min(60,Math.max(1,s.min+ +dir));
   else if(k==='t')s.t=Math.min(110,Math.max(40,s.t+ +dir*5));
   else{const fi=FIRES.indexOf(s.f);s.f=FIRES[(fi+ +dir+3)%3];}
   render();});};
 el.querySelector('#diyAdd').onclick=()=>{if(steps.length>=6)return toast('最多 6 个步骤');steps.push({n:'自定义',min:10,t:80,f:'中火'});render();};
 el.querySelector('#diySave').onclick=()=>{toast('DIY 程序已保存（'+steps.length+' 步），已同步到电饭煲');closePage();};
 render();
}
function openRcModeEdit(done){
 const all=RC_MODE_LST.map(x=>x[0]);
 const el=rcPage('模式管理',`<div class="rc-card" style="margin-top:6px">${RC_MODE_LST.map(m=>`
  <div class="rc-opt" style="cursor:default"><div style="flex:1"><b>${m[0]}</b><p>${m[1]?m[1]+' 分钟':'恒温 65°C 保鲜'}</p></div>
   <span class="eh-sw ${S.rcModes.includes(m[0])?'on':''}" data-mm="${m[0]}"><i></i></span></div>`).join('')}</div>
  <p style="font-size:10px;color:#a39880;text-align:center;margin-top:10px">关闭后该模式不在首页显示</p>`);
 el.querySelectorAll('[data-mm]').forEach(s=>s.onclick=()=>{
  const m=s.dataset.mm;
  if(S.rcModes.includes(m)){if(S.rcModes.length<=1)return toast('至少保留一个模式');if(m===S.rcMode)return toast('当前选中模式不可隐藏');
   S.rcModes=S.rcModes.filter(x=>x!==m);s.classList.remove('on');}
  else{S.rcModes.push(m);S.rcModes=all.filter(x=>S.rcModes.includes(x));s.classList.add('on');}
  if(done)done();});
}
function openRcRecipes(startCook){
 const el=rcPage('食谱推荐',`<div class="rc-card" style="margin-top:6px;display:flex;align-items:center;gap:9px">
   <span class="rc-remind-ic">${rcSvg('spark',17)}</span>
   <p style="font-size:11px;color:#8a7f6a;line-height:1.6">根据您的米种「${S.riceType}」与口感「${S.riceTaste}」智能推荐</p></div>
  ${RC_RECIPES.map((r,i)=>`
  <div class="rc-card rc-recipe"><div style="display:flex;gap:11px">
   <img src="img/${r.img}.png" style="width:86px;height:86px;border-radius:14px;object-fit:cover;flex:0 0 auto">
   <div style="flex:1;min-width:0"><b style="font-size:13.5px">${r.n}</b>
    <p style="font-size:10.5px;color:#a39880;margin-top:4px">${r.min} 分钟 · ${r.star} ★ · ${r.mode}模式</p>
    <p style="font-size:10.5px;color:#8a7f6a;margin-top:5px;line-height:1.5">${r.d}</p></div></div>
   <div class="rc-recipe-a">
    <button data-fav="${i}">${rcSvg('fav',13)}<span>收藏</span></button>
    <button data-cmt="${i}">${rcSvg('cmt',13)}<span>评论 ${88+i*37}</span></button>
    <button data-shr="${i}">${rcSvg('share',13)}<span>分享</span></button>
    <button class="go" data-cook="${i}">一键烹饪</button></div></div>`).join('')}`);
 el.querySelectorAll('[data-fav]').forEach(b=>b.onclick=()=>{b.classList.toggle('on');b.querySelector('span').textContent=b.classList.contains('on')?'已收藏':'收藏';toast(b.classList.contains('on')?'已收藏「'+RC_RECIPES[+b.dataset.fav].n+'」':'已取消收藏');});
 el.querySelectorAll('[data-cmt]').forEach(b=>b.onclick=()=>toast('评论区建设中'));
 el.querySelectorAll('[data-shr]').forEach(b=>b.onclick=()=>toast('已生成「'+RC_RECIPES[+b.dataset.shr].n+'」分享卡片'));
 el.querySelectorAll('[data-cook]').forEach(b=>b.onclick=()=>{const r=RC_RECIPES[+b.dataset.cook];S.rcMode=r.mode;startCook(r.mode,r.min);closePage();});
}
function openRcShop(){
 let cartN=0;
 const el=rcPage('商城 · 米粮配件',`
  <div class="rc-shop-ban"><b>好机配好谷</b><p>原厂米粮 · 配件直供，全场满 59 包邮</p></div>
  ${RC_SHOP.map(g=>`<div class="rc-sec" style="margin-top:16px"><h2>${g[0]}</h2></div>
   <div class="rc-card">${g[1].map(p=>`<div class="rc-goods-row">
    <div class="pic"><img src="${p.img}" alt="${p.n}"></div>
    <div style="flex:1;min-width:0"><b>${p.n}</b><p>${p.tag}</p>
     <div style="display:flex;align-items:baseline;gap:5px;margin-top:4px"><b style="color:#e8710a;font-size:15px">¥${p.p}</b>${p.o?`<s style="font-size:10px;color:#c9c0ac">¥${p.o}</s>`:''}</div></div>
    <button class="rc-again" data-add2="${p.n}">加入购物车</button></div>`).join('')}</div>`).join('')}
  <div class="rc-card" style="display:flex;align-items:center;gap:9px"><span class="rc-remind-ic">${rcSvg('cart',17)}</span>
   <div style="flex:1;min-width:0"><b style="font-size:13px">购物车</b><p style="font-size:10.5px;color:#a39880;margin-top:2px" id="rcCartN">还没有商品</p></div>
   <button class="rc-again" id="rcCartGo">去结算</button></div>`);
 el.querySelectorAll('[data-add2]').forEach(b=>b.onclick=()=>{cartN++;el.querySelector('#rcCartN').textContent=cartN+' 件商品 · 满 59 包邮';toast('已将「'+b.dataset.add2+'」加入购物车');});
 el.querySelector('#rcCartGo').onclick=()=>toast(cartN?'结算功能建设中':'购物车还是空的');
}
function openRcHis(startCook){
 const el=rcPage('烹饪记录',`<div class="rc-card" style="margin-top:6px">${RC_HIS.map((h,i)=>`
  <div class="rc-recl" data-hi="${i}" style="cursor:pointer"><div class="rc-date"><b>${h.d}</b><span>${h.m}</span></div>
   <div class="ti"><b>${h.n}</b><p>${h.t}</p></div>
   <button class="rc-again" data-ag2="${i}">一键重新烹饪</button></div>`).join('')}</div>
  <p style="font-size:10px;color:#a39880;text-align:center;margin-top:12px">点击记录可回看烹饪曲线</p>`);
 el.querySelectorAll('[data-ag2]').forEach(b=>b.onclick=e=>{e.stopPropagation();const h=RC_HIS[+b.dataset.ag2];startCook(h.mode,h.min);closePage();});
 el.querySelectorAll('[data-hi]').forEach(r=>r.onclick=()=>openRcCurve(RC_HIS[+r.dataset.hi]));
}
function openRcCurve(h){
 rcPage('烹饪曲线回看',`<div class="rc-card" style="margin-top:6px"><div class="rc-card-h"><b>${rcSvg('wave',15,'#e8710a')} 全程温度曲线</b><span class="rc-badge">已完成</span></div>${rcCurveSVG(true)}</div>
  <div class="rc-card">${[['烹饪模式',h.mode],['总时长',h.min+' 分钟'],['米种',h.n.includes('·')?h.n.split('·')[1].trim():'东北珍珠米'],['口感',(h.t.split('口感 ')[1]||'Q弹')],['沸点校准','已按珠海海拔 23m 自动校准']].map((kv,i)=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;font-size:12px;${i?'border-top:1px solid #f5f0e6':''}"><span style="color:#8a7f6a">${kv[0]}</span><b>${kv[1]}</b></div>`).join('')}</div>`);
}
function openRcVoice(startCook){
 const m=openModal(`<div class="rc-mdv" style="padding:22px 18px 18px;text-align:center">
  <div class="rc-voice-wave"><i></i><i></i><i></i><i></i><i></i></div>
  <b style="font-size:14px">我在听，请说…</b>
  <p style="font-size:10.5px;color:#a39880;margin-top:6px">试试下面的指令，或直接对手机说话</p>
  <div class="rc-chips" style="justify-content:center;margin-top:14px">
   <button class="rc-chip" data-vc="a">「开始精煮饭」</button>
   <button class="rc-chip" data-vc="b">「预约明早 7 点煮粥」</button>
   <button class="rc-chip" data-vc="c">「还剩多久」</button></div>
  <div id="rcVoiceA" style="min-height:20px;margin-top:12px;font-size:12px;color:#e8710a;font-weight:600;line-height:1.6"></div>
  <button class="cook-btn" data-close style="margin-top:8px;background:#f5f1e8;color:#6b6152;box-shadow:none">关闭</button></div>`,{center:true});
 m.querySelectorAll('[data-vc]').forEach(b=>b.onclick=()=>{
  const a=m.querySelector('#rcVoiceA');
  if(b.dataset.vc==='a'){closeModal(m);startCook('精煮饭',45);}
  else if(b.dataset.vc==='b'){a.textContent='好的，已预约：明早 07:00 完成「煮粥」';}
  else{a.textContent=S.rice.cooking?S.rice.left>0?'「'+S.rice.dish+'」还剩 '+fmt(S.rice.left)+'，预计 '+rcEta()+' 完成':'「'+S.rice.dish+'」已完成，正在保温中':'当前没有在烹饪，随时可开始';}});
}


/* ================= 空气净化器（薄荷绿系 · 同电暖器版式语法） ================= */
const PFSVG={
 filter:'<path d="M4 5.5h16M7 12h10M10 18.5h4"/>',
 smoke:'<path d="M3 17.5h10a3 3 0 1 0-3-3M3 20.5h13"/><path d="M16.5 11.5c1.8.6 3.5 1 3.5 4"/>',
 home:'<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/>',
 paw:'<circle cx="6.8" cy="9.2" r="1.5"/><circle cx="12" cy="7" r="1.5"/><circle cx="17.2" cy="9.2" r="1.5"/><path d="M12 11.2c-2.7 0-5.3 2-5.3 4.4 0 1.5 1.1 2.4 2.6 2.4.9 0 1.7-.5 2.7-.5s1.8.5 2.7.5c1.5 0 2.6-.9 2.6-2.4 0-2.4-2.6-4.4-5.3-4.4z"/>',
 mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
 lock:'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
 key:'<circle cx="8" cy="15" r="4"/><path d="M11 12 20 3M16.5 6.5l3 3"/>',
 pin:'<path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/>',
 chart:'<path d="M4 20V10M10 20V4M16 20v-8M2 20h20"/>',
 timer:'<circle cx="12" cy="13" r="7.5"/><path d="M12 9.5V13l2.5 1.5M9.5 2.5h5"/>',
 wave:'<path d="M3 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>'};
const pfSvg=(k,sz,c)=>`<svg width="${sz||20}" height="${sz||20}" viewBox="0 0 24 24" fill="none" stroke="${c||'currentColor'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${PFSVG[k]||EHSVG[k]||''}</svg>`;
const PF_PARAMS=[
 {k:'pm25',n:'PM2.5',v:12,u:'μg/m³',lv:'优',cls:'g'},{k:'pm10',n:'PM10',v:23,u:'μg/m³',lv:'优',cls:'g'},
 {k:'pm1',n:'PM1.0',v:8,u:'μg/m³',lv:'优',cls:'g'},{k:'hcho',n:'甲醛',v:0.03,u:'mg/m³',lv:'优',cls:'g'},
 {k:'voc',n:'VOC',v:0.4,u:'mg/m³',lv:'良',cls:'y'},{k:'allergen',n:'过敏原',v:'低',u:'',lv:'优',cls:'g'},
 {k:'particle',n:'粒子数量',v:1.2,u:'万个/L',lv:'良',cls:'y'},{k:'hum',n:'湿度',v:55,u:'%',lv:'舒适',cls:'g'},
 {k:'temp',n:'温度',v:27,u:'℃',lv:'适宜',cls:'g'}];
const PF_SCENES=[
 {k:'smoke',n:'快速除烟',ic:'smoke',d:'检测到 PM2.5 + VOC 升高，自动开最高档'},
 {k:'hcho',n:'新房除醛',ic:'home',d:'高温或甲醛超标即开最高档，持续压低浓度'},
 {k:'pet',n:'宠物净化',ic:'paw',d:'过敏原 + 异味检测，大吸力除毛除味'}];
const PF_REC_SCENES=[
 {n:'回家自动净化',d:'定位到家 500m 内，自动开机净化',ic:'pin'},
 {n:'睡眠静享',d:'23:00 自动切睡眠模式并关闭灯光',ic:'moon'},
 {n:'做饭联动除味',d:'油烟机启动时，自动开启除味模式',ic:'wave'},
 {n:'梅雨季防霉',d:'湿度 >75% 时自动加强净化',ic:'drop'}];
const pfT2m=t=>{const[a,b]=t.split(':');return +a*60+(+b)};
const pfM2t=m=>{m=((m%1440)+1440)%1440;return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0')};
function pfSubHead(t){return `<div class="pf-head" style="padding-top:46px">
  <button class="pf-ico-btn" data-back>${pfSvg('back',20,'#3d4a45')}</button>
  <h1 style="font-size:15px;font-weight:600">${t}</h1><span style="width:36px"></span></div>`;}
function openPurifierCtl(d){
  d.pf=d.pf||{speed:3,mode:'智能',deodor:false,sterile:true,anion:false,monitor24:true,
   crystal:'空气质量',uplight:'高亮',lampAll:true,disp:'高亮',beep:true,lock:false,
   timer:{en:false,onT:'08:00',offT:'22:00'},auth:'已授权',clean:{en:true,t:'03:00'},
   scenes:['宝宝午睡轻音净化'],siri:['打开空气净化器','今天空气怎么样']};
  const st=d.pf;
  const pg=openPage(`<div class="pf-wrap"><div class="pf-head" style="padding-top:46px">
    <button class="pf-ico-btn" data-back>${pfSvg('back',20,'#3d4a45')}</button>
    <div class="pf-head-t"><h1 style="font-size:15px;font-weight:600">空气净化器</h1><p>KJ900F-A01 · 智能净化</p></div>
    <button class="pf-ico-btn" id="pfMenu">${pfSvg('dots',20,'#3d4a45')}</button></div>
   <div class="pf-body">
    <section class="pf-hero"><div class="pf-hero-in">
     <div>
      <span class="pf-badge ${d.on?'':'off'}" id="pfBadge">${pfSvg('leaf',12)}${d.on?'空气质量 · 优':'已关机'}</span>
      <div class="pf-aqi"><b id="pfAqi">12</b><span>μg/m³</span></div>
      <p class="pf-cap" id="pfCap">${d.on?'室内 PM2.5 · 实时监测中':'设备已关机，监测待机中'}</p>
      <div class="pf-loc">${pfSvg('pin',12,'#7d8b84')}<span>客厅 · KJ900F-A01</span></div>
     </div>
     <div class="pf-hero-img"><img src="img/purifier.png" alt="空气净化器"></div>
    </div></section>
    <section class="pf-card">
     <div class="pf-power-row"><div><b>开关</b><p id="pfPwSt">${d.on?'净化运行中 · '+st.mode+'模式':'已关闭'}</p></div>
      <button class="pf-power-btn ${d.on?'':'off'}" id="pfPower">${pfSvg('power',24)}</button></div>
    </section>
    <section class="pf-card">
     <div class="pf-card-t"><b>实时环境参数</b><span class="lk" id="pfGoCurve">监测曲线 ›</span></div>
     <div class="pf-grid9">${PF_PARAMS.map(p=>`<button class="pf-cell" data-pp="${p.k}"><p>${p.n}</p><b>${p.v}<small style="font-size:9px;font-weight:400;color:#9aa8a2;margin-left:1px">${p.u}</small></b><i class="${p.cls}">${p.lv}</i></button>`).join('')}</div>
    </section>
    <section class="pf-card">
     <div class="pf-card-t"><b>风速调节</b><span id="pfSpdCap">${st.mode} · ${st.speed} 档</span></div>
     <div class="pf-seg" id="pfSpd">${[1,2,3,4,5].map(s=>`<button class="${st.speed===s?'on':''}" data-spd="${s}">${s} 档</button>`).join('')}</div>
     <div class="pf-modes">${[['智能','spark','按空气质量自动调节'],['睡眠','moon','低噪 1 档运行'],['速净','zap','5 档强劲净化']].map(m=>`<button class="pf-mode ${st.mode===m[0]?'on':''}" data-md="${m[0]}">${pfSvg(m[1],18)}<b>${m[0]}</b><small>${m[2]}</small></button>`).join('')}</div>
    </section>
    <div class="pf-sec"><h2>特色场景</h2></div>
    <section class="pf-card"><div class="pf-scene">${PF_SCENES.map(s=>`
     <button class="pf-sc" data-sc="${s.k}"><span class="pf-sc-ic">${pfSvg(s.ic,22)}</span><b>${s.n}</b><small>${s.d}</small></button>`).join('')}</div></section>
    <div class="pf-sec"><h2>常用功能</h2></div>
    <section class="pf-card"><div class="pf-grid4">
     ${[['deodor','除味','wave'],['sterile','杀菌','shield'],['anion','负离子','wind'],['monitor24','全天候监测','chart']].map(f=>`
     <button class="pf-fn ${st[f[0]]?'on':''}" data-fn="${f[0]}"><span class="pf-fn-ic">${pfSvg(f[2],20)}</span><b>${f[1]}</b><small>${st[f[0]]?'已开启':'关闭'}</small></button>`).join('')}
    </div></section>
    <div class="pf-sec"><h2>灯光控制</h2></div>
    <section class="pf-card" style="padding-top:6px">
     <div class="pf-lrow" style="border:none"><div><b>水晶灯</b><p>顶部水晶灯效，随空气质量变色</p></div></div>
     <div class="pf-seg" data-segk="crystal">${['空气质量','氛围灯','关灯'].map(o=>`<button class="${st.crystal===o?'on':''}" data-v="${o}">${o}</button>`).join('')}</div>
     <div class="pf-lrow" style="margin-top:8px;border:none"><div><b>上氛围灯</b><p>机身顶部氛围灯带亮度</p></div></div>
     <div class="pf-seg" data-segk="uplight">${['高亮','低亮'].map(o=>`<button class="${st.uplight===o?'on':''}" data-v="${o}">${o}</button>`).join('')}</div>
     <div class="pf-lrow" style="margin-top:4px"><div><b>灯总控</b><p>一键开关全部灯光</p></div><span class="pf-sw ${st.lampAll?'on':''}" id="pfLampAll"><i></i></span></div>
    </section>
    <div class="pf-sec"><h2>屏显与提示</h2></div>
    <section class="pf-card" style="padding-top:6px">
     <div class="pf-lrow" style="border:none"><div><b>屏显亮度</b><p>机身显示屏亮度</p></div></div>
     <div class="pf-seg" data-segk="disp">${['高亮','低亮'].map(o=>`<button class="${st.disp===o?'on':''}" data-v="${o}">${o}</button>`).join('')}</div>
     <div class="pf-lrow" style="margin-top:4px"><div><b>提示音</b><p>操作与告警提示音</p></div><span class="pf-sw ${st.beep?'on':''}" id="pfBeep"><i></i></span></div>
     <div class="pf-lrow"><div><b>童锁</b><p>锁定机身按键，防止误触</p></div><span class="pf-sw ${st.lock?'on':''}" id="pfLock"><i></i></span></div>
    </section>
    <div class="pf-sec"><h2>智能控制</h2></div>
    <section class="pf-list">
     <div class="pf-li" id="pfGoTimer"><span class="pf-li-ic grad">${pfSvg('timer',20)}</span><div style="flex:1;min-width:0"><b>定时开关机</b><p>00:01 - 23:59，步距 1 分钟</p></div><span class="val" id="pfTimerV">${st.timer.en?st.timer.onT+' 开机':'未开启'}</span><span class="go">${pfSvg('arr',16,'#9aa8a2')}</span></div>
     <div class="pf-li" id="pfGoScene"><span class="pf-li-ic plain">${pfSvg('spark',20)}</span><div style="flex:1;min-width:0"><b>智能场景</b><p>推荐场景与自定义联动</p></div><span class="go">${pfSvg('arr',16,'#9aa8a2')}</span></div>
     <div class="pf-li" id="pfGoSiri"><span class="pf-li-ic plain">${pfSvg('mic',20)}</span><div style="flex:1;min-width:0"><b>Siri 快捷控制</b><p>语音指令一键执行</p></div><span class="go">${pfSvg('arr',16,'#9aa8a2')}</span></div>
     <div class="pf-li" id="pfGoAuth"><span class="pf-li-ic plain">${pfSvg('key',20)}</span><div style="flex:1;min-width:0"><b>远程控制授权</b><p>允许家人远程控制本机</p></div><span class="val" id="pfAuthV">${st.auth}</span><span class="go">${pfSvg('arr',16,'#9aa8a2')}</span></div>
     <div class="pf-li" id="pfGoClean"><span class="pf-li-ic plain">${pfSvg('refresh',20)}</span><div style="flex:1;min-width:0"><b>自清洁</b><p>定期自动清洁风道与扇叶</p></div><span class="val" id="pfCleanV">${st.clean.en?st.clean.t:'已关闭'}</span><span class="go">${pfSvg('arr',16,'#9aa8a2')}</span></div>
    </section>
    <div class="pf-sec"><h2>滤网管理</h2></div>
    <section class="pf-card" id="pfFilter" style="cursor:pointer">
     <div class="pf-filter"><span class="pf-filter-img">${pfSvg('filter',26)}</span>
      <div style="flex:1;min-width:0"><b>高效复合滤网</b><p>HEPA + 活性炭 · 剩余约 1800 小时</p></div>
      <span class="go">${pfSvg('arr',16,'#9aa8a2')}</span></div>
     <div class="pf-bar"><i style="width:68%"></i></div>
     <div class="pf-bar-t"><span>滤网余量 <b>68%</b></span><span>预计还可用 6 个月</span></div>
    </section>
   </div></div>`);
  const $q=s=>pg.querySelector(s);
  const needOn=()=>{if(!d.on){toast('请先开机');return true}return false};
  $q('#pfMenu').onclick=()=>toast('空气净化器设置');
  /* 开关 */
  $q('#pfPower').onclick=()=>{d.on=!d.on;
    $q('#pfPower').classList.toggle('off',!d.on);
    $q('#pfPwSt').textContent=d.on?'净化运行中 · '+st.mode+'模式':'已关闭';
    const bd=$q('#pfBadge');bd.className='pf-badge'+(d.on?'':' off');
    bd.innerHTML=pfSvg('leaf',12)+(d.on?'空气质量 · 优':'已关机');
    $q('#pfCap').textContent=d.on?'室内 PM2.5 · 实时监测中':'设备已关机，监测待机中';
    toast(d.on?'空气净化器已开机':'空气净化器已关机');};
  /* 风速 */
  pg.querySelectorAll('[data-spd]').forEach(b=>b.onclick=()=>{
    if(needOn())return;
    st.speed=+b.dataset.spd;
    pg.querySelectorAll('[data-spd]').forEach(x=>x.classList.toggle('on',x===b));
    $q('#pfSpdCap').textContent=st.mode+' · '+st.speed+' 档';
    toast('风速已调至 '+st.speed+' 档');});
  pg.querySelectorAll('[data-md]').forEach(b=>b.onclick=()=>{
    if(needOn())return;
    st.mode=b.dataset.md;
    if(st.mode==='睡眠')st.speed=1;else if(st.mode==='速净')st.speed=5;
    pg.querySelectorAll('[data-md]').forEach(x=>x.classList.toggle('on',x===b));
    pg.querySelectorAll('[data-spd]').forEach(x=>x.classList.toggle('on',+x.dataset.spd===st.speed));
    $q('#pfSpdCap').textContent=st.mode+' · '+st.speed+' 档';
    $q('#pfPwSt').textContent='净化运行中 · '+st.mode+'模式';
    toast('已切换「'+st.mode+'」模式');});
  /* 特色场景 */
  pg.querySelectorAll('[data-sc]').forEach(b=>b.onclick=()=>{
    if(needOn())return;
    const sc=PF_SCENES.find(s=>s.k===b.dataset.sc);
    st.speed=5;st.mode='智能';
    pg.querySelectorAll('[data-spd]').forEach(x=>x.classList.toggle('on',+x.dataset.spd===5));
    pg.querySelectorAll('[data-md]').forEach(x=>x.classList.toggle('on',x.dataset.md==='智能'));
    $q('#pfSpdCap').textContent='智能 · 5 档';
    toast('「'+sc.n+'」已启动，风速升至最高档');});
  /* 常用功能 */
  pg.querySelectorAll('[data-fn]').forEach(b=>b.onclick=()=>{
    if(b.dataset.fn!=='monitor24'&&needOn())return;
    const k=b.dataset.fn;st[k]=!st[k];b.classList.toggle('on',st[k]);
    b.querySelector('small').textContent=st[k]?'已开启':'关闭';
    const nm={deodor:'除味',sterile:'杀菌',anion:'负离子',monitor24:'全天候环境监测'}[k];
    toast(nm+(st[k]?' 已开启':' 已关闭'));});
  /* 灯光 / 屏显 seg */
  pg.querySelectorAll('[data-segk]').forEach(sg=>{
    sg.querySelectorAll('button').forEach(b=>b.onclick=()=>{
      if(needOn())return;
      const k=sg.dataset.segk;st[k]=b.dataset.v;
      sg.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));
      const nm={crystal:'水晶灯',uplight:'上氛围灯',disp:'屏显亮度'}[k];
      toast(nm+' 已设为「'+b.dataset.v+'」');});});
  const bindSw=(id,k,nm)=>{const el=$q(id);el.onclick=()=>{if(needOn())return;st[k]=!st[k];el.classList.toggle('on',st[k]);toast(nm+(st[k]?' 已开启':' 已关闭'));}};
  bindSw('#pfLampAll','lampAll','灯总控');bindSw('#pfBeep','beep','提示音');bindSw('#pfLock','lock','童锁');
  /* 二级页 */
  $q('#pfGoCurve').onclick=()=>openPfCurve(d);
  pg.querySelectorAll('[data-pp]').forEach(c=>c.onclick=()=>openPfCurve(d,c.dataset.pp));
  $q('#pfGoTimer').onclick=()=>openPfTimer(d);
  $q('#pfGoScene').onclick=()=>openPfScene(d);
  $q('#pfGoSiri').onclick=()=>openPfSiri(d);
  $q('#pfGoAuth').onclick=()=>openPfAuth(d);
  $q('#pfGoClean').onclick=()=>openPfClean(d);
  $q('#pfFilter').onclick=()=>openPfFilter(d);
}
/* ---------- 监测曲线 ---------- */
function openPfCurve(d,sel){
  let cur=sel||'pm25',per='day';
  const BASE={pm25:[14,16,'μg/m³'],pm10:[24,20,'μg/m³'],pm1:[9,8,'μg/m³'],hcho:[0.03,0.03,'mg/m³'],voc:[0.42,0.3,'mg/m³'],allergen:[2,1.6,'级'],particle:[1.3,0.9,'万个/L'],hum:[55,14,'%'],temp:[27,4,'℃']};
  const NN={day:24,week:7,month:30};
  const pg=openPage(`<div class="pf-wrap">${pfSubHead('环境监测曲线')}<div class="pf-body">
   <div class="pf-pchips" id="pfPc">${PF_PARAMS.map(p=>`<button class="pf-pchip ${p.k===cur?'on':''}" data-k="${p.k}">${p.n}</button>`).join('')}</div>
   <section class="pf-card" style="margin-top:0">
    <div class="pf-tabs" id="pfTabs">${[['day','日'],['week','周'],['month','月']].map(t=>`<button class="${t[0]===per?'on':''}" data-per="${t[0]}">${t[1]}</button>`).join('')}</div>
    <div class="pf-card-t" style="margin-bottom:4px"><b id="pfCvT">PM2.5 变化曲线</b><span id="pfCvU">μg/m³</span></div>
    <div id="pfCvC"></div>
    <div class="pf-stat">
     <div><p>最高值</p><b id="pfCvMx">-</b></div>
     <div><p>平均值</p><b id="pfCvAv">-</b></div>
    </div>
   </section>
   <div class="pf-note">${pfSvg('chart',14,'#0d9668')}<span>数据来自机身高精度传感器，每分钟上报一次，云端保留最近 90 天记录。</span></div>
  </div></div>`);
  const $q=s=>pg.querySelector(s);
  const draw=()=>{
    const p=PF_PARAMS.find(x=>x.k===cur);
    const[base,amp,u]=BASE[cur];const n=NN[per];const dp=base<1?2:1;
    const r=seeded('pf'+cur+per);const vals=[];
    for(let i=0;i<n;i++)vals.push(Math.max(0,+(base+(r()-0.35)*amp).toFixed(dp)));
    const W=320,H=150,PL=6,PR=6,PT=10,PB=20;
    const mxV=Math.max.apply(null,vals),mnV=Math.min.apply(null,vals);
    const mx=mxV*1.12||1,mn=mnV*0.88;
    const X=i=>PL+i*(W-PL-PR)/(n-1),Y=v=>PT+(mx-v)/(mx-mn||1)*(H-PT-PB);
    const pts=vals.map((v,i)=>X(i).toFixed(1)+','+Y(v).toFixed(1));
    const area='M'+X(0).toFixed(1)+','+(H-PB)+' L'+pts.join(' L')+' L'+X(n-1).toFixed(1)+','+(H-PB)+' Z';
    let xl=[];
    if(per==='day')xl=[[0,'0时'],[6,'6时'],[12,'12时'],[18,'18时'],[23,'23时']];
    else if(per==='week')xl=vals.map((_,i)=>[i,'周'+'一二三四五六日'[i]]);
    else xl=[[0,'1日'],[9,'10日'],[19,'20日'],[29,'30日']];
    const mi=vals.indexOf(mxV);
    $q('#pfCvC').innerHTML=`<svg class="pf-chart" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
     <defs><linearGradient id="pfg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#34d399" stop-opacity=".35"/><stop offset="1" stop-color="#34d399" stop-opacity="0"/></linearGradient></defs>
     ${[0.25,0.5,0.75].map(g=>`<line x1="${PL}" x2="${W-PR}" y1="${PT+(H-PT-PB)*g}" y2="${PT+(H-PT-PB)*g}" stroke="#eef4f1" stroke-width="1"/>`).join('')}
     <path d="${area}" fill="url(#pfg)"/>
     <polyline points="${pts.join(' ')}" fill="none" stroke="#10b981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
     <circle cx="${X(mi).toFixed(1)}" cy="${Y(mxV).toFixed(1)}" r="3.5" fill="#fff" stroke="#10b981" stroke-width="2"/>
     ${xl.map(l=>`<text x="${X(l[0]).toFixed(1)}" y="${H-6}" font-size="8.5" fill="#9aa8a2" text-anchor="middle">${l[1]}</text>`).join('')}
    </svg>`;
    const av=+(vals.reduce((a,b)=>a+b,0)/n).toFixed(dp);
    $q('#pfCvT').textContent=p.n+' 变化曲线';$q('#pfCvU').textContent=u;
    $q('#pfCvMx').textContent=mxV+' '+u;$q('#pfCvAv').textContent=av+' '+u;};
  $q('#pfPc').querySelectorAll('button').forEach(b=>b.onclick=()=>{cur=b.dataset.k;
    $q('#pfPc').querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));draw();});
  $q('#pfTabs').querySelectorAll('button').forEach(b=>b.onclick=()=>{per=b.dataset.per;
    $q('#pfTabs').querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));draw();});
  draw();
}
/* ---------- 定时开关机 ---------- */
function openPfTimer(d){
  const tm=d.pf.timer;
  const pg=openPage(`<div class="pf-wrap">${pfSubHead('定时开关机')}<div class="pf-body">
   <section class="pf-card" style="margin-top:0">
    <div class="pf-lrow" style="padding-top:0;border:none"><div><b>定时开关机</b><p>到点自动开机 / 关机</p></div><span class="pf-sw ${tm.en?'on':''}" id="pfTmEn"><i></i></span></div>
   </section>
   <section class="pf-card">
    ${[['onT','开机时间','到点自动开机并运行智能模式'],['offT','关机时间','到点自动关机']].map(r=>`
    <div class="pf-time"><div><b>${r[1]}</b><p>${r[2]}</p></div>
     <div style="display:flex;align-items:center;gap:10px">
      <button class="pf-step" data-tk="${r[0]}" data-d="-1">${pfSvg('minus',16)}</button>
      <span class="pf-tv" id="pfT_${r[0]}">${tm[r[0]]}</span>
      <button class="pf-step" data-tk="${r[0]}" data-d="1">${pfSvg('plus',16)}</button>
     </div></div>`).join('')}
   </section>
   <div class="pf-note">${pfSvg('timer',14,'#0d9668')}<span>支持 00:01 - 23:59 任意时刻，步距 1 分钟；设备关机状态下定时任务依然生效。</span></div>
  </div></div>`);
  const $q=s=>pg.querySelector(s);
  const syncMain=()=>{const v=document.querySelector('#pfTimerV');if(v)v.textContent=tm.en?tm.onT+' 开机':'未开启';};
  $q('#pfTmEn').onclick=()=>{tm.en=!tm.en;$q('#pfTmEn').classList.toggle('on',tm.en);syncMain();
    toast('定时开关机'+(tm.en?' 已开启':' 已关闭'));};
  pg.querySelectorAll('[data-tk]').forEach(b=>b.onclick=()=>{
    if(!tm.en)return toast('请先开启定时开关机');
    const k=b.dataset.tk;tm[k]=pfM2t(pfT2m(tm[k])+(+b.dataset.d));
    $q('#pfT_'+k).textContent=tm[k];syncMain();});
}
/* ---------- 智能场景 ---------- */
function openPfScene(d){
  const st=d.pf;
  const pg=openPage(`<div class="pf-wrap">${pfSubHead('智能场景')}<div class="pf-body">
   <div class="pf-card-t" style="margin:2px 4px 10px"><b style="font-size:13.5px">我的场景</b><span id="pfScCnt"></span></div>
   <section class="pf-list" id="pfMySc"></section>
   <div class="pf-card-t" style="margin:16px 4px 10px"><b style="font-size:13.5px">推荐场景</b></div>
   <section class="pf-list">${PF_REC_SCENES.map((s,i)=>`
    <div class="pf-li"><span class="pf-li-ic plain">${pfSvg(s.ic,20)}</span>
     <div style="flex:1;min-width:0"><b>${s.n}</b><p>${s.d}</p></div>
     <button class="pf-btn pri" style="width:auto;padding:7px 14px;font-size:11px;box-shadow:none" data-add="${i}">添加</button></div>`).join('')}</section>
   <button class="pf-btn ghost" id="pfNewSc" style="margin-top:12px">＋ 自定义场景</button>
  </div></div>`);
  const $q=s=>pg.querySelector(s);
  const refresh=()=>{
    $q('#pfScCnt').textContent='共 '+st.scenes.length+' 个';
    const box=$q('#pfMySc');
    box.innerHTML=st.scenes.map((s,i)=>`
    <div class="pf-li"><span class="pf-li-ic grad">${pfSvg('spark',20)}</span>
     <div style="flex:1;min-width:0"><b>${s}</b><p>我的场景 · 执行中</p></div>
     <button class="pf-step" data-del="${i}">${pfSvg('minus',16)}</button></div>`).join('')||'<div style="padding:22px;text-align:center;font-size:11px;color:#9aa8a2">暂无场景，从下方推荐中添加</div>';
    box.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{st.scenes.splice(+b.dataset.del,1);refresh();toast('场景已删除');});};
  refresh();
  pg.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>{const s=PF_REC_SCENES[+b.dataset.add];
    if(st.scenes.indexOf(s.n)>-1)return toast('该场景已在我的场景中');
    st.scenes.push(s.n);refresh();toast('已添加「'+s.n+'」');});
  $q('#pfNewSc').onclick=()=>{
    const m=openModal(`<div class="ac-sheet-t">自定义场景</div>
     <div style="margin-top:12px"><input id="pfScName" placeholder="场景名称，如：宝宝午睡净化" style="width:100%;padding:11px 13px;border-radius:12px;background:#f4f7f5;font-size:12.5px;border:none;outline:none"></div>
     <div class="pf-note">${pfSvg('spark',14,'#0d9668')}<span>如果：空气质量变差 / 湿度超标 / 定时到点<br>就执行：开机 · 指定风速 · 灯光联动</span></div>
     <button class="pf-btn pri" id="pfScOk" style="margin-top:14px">保存场景</button>
     <button class="pf-btn ghost" data-close style="margin-top:8px">取消</button>`,{center:true});
    m.querySelector('#pfScOk').onclick=()=>{const nm=m.querySelector('#pfScName').value.trim();
      if(!nm)return toast('请输入场景名称');
      st.scenes.push(nm);refresh();closeModal(m);toast('场景「'+nm+'」已创建');};};
}
/* ---------- Siri 快捷控制 ---------- */
function openPfSiri(d){
  const st=d.pf;
  const pg=openPage(`<div class="pf-wrap">${pfSubHead('Siri 快捷控制')}<div class="pf-body">
   <div class="pf-note" style="margin-top:0">${pfSvg('mic',14,'#0d9668')}<span>将常用操作添加为 Siri 语音指令，对手机说「嘿 Siri」即可直接执行。</span></div>
   <section class="pf-list" id="pfSiriL" style="margin-top:12px"></section>
   <section class="pf-card">
    <div style="display:flex;gap:8px">
     <input id="pfSiriIn" placeholder="输入语音指令，如：打开速净模式" style="flex:1;padding:11px 13px;border-radius:12px;background:#f4f7f5;font-size:12.5px;border:none;outline:none">
     <button class="pf-btn pri" id="pfSiriAdd" style="width:auto;padding:0 16px">添加</button>
    </div>
   </section>
  </div></div>`);
  const $q=s=>pg.querySelector(s);
  const refresh=()=>{const box=$q('#pfSiriL');
    box.innerHTML=st.siri.map((s,i)=>`
    <div class="pf-li"><span class="pf-li-ic plain">${pfSvg('mic',20)}</span>
     <div style="flex:1;min-width:0"><b>「${s}」</b><p>语音指令</p></div>
     <button class="pf-step" data-del="${i}">${pfSvg('minus',16)}</button></div>`).join('')||'<div style="padding:22px;text-align:center;font-size:11px;color:#9aa8a2">暂无语音指令</div>';
    box.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{st.siri.splice(+b.dataset.del,1);refresh();toast('指令已删除');});};
  refresh();
  $q('#pfSiriAdd').onclick=()=>{const v=$q('#pfSiriIn').value.trim();if(!v)return toast('请输入语音指令');
    st.siri.push(v);$q('#pfSiriIn').value='';refresh();toast('已添加 Siri 指令');};
}
/* ---------- 远程控制授权 ---------- */
function openPfAuth(d){
  const st=d.pf;
  const OPTS=[
   {n:'未授权',d:'仅本账号可控制本机',ic:'lock'},
   {n:'已授权',d:'授权家庭成员临时控制，可随时收回',ic:'key'},
   {n:'长期授权',d:'家庭共享成员长期可控制本机',ic:'shield'}];
  const pg=openPage(`<div class="pf-wrap">${pfSubHead('远程控制授权')}<div class="pf-body">
   <section class="pf-list" style="margin-top:0">${OPTS.map(o=>`
    <div class="pf-opt" data-au="${o.n}"><span class="pf-opt-ic" style="background:#d1fae5;color:#0d9668">${pfSvg(o.ic,20)}</span>
     <div style="flex:1;min-width:0"><b>${o.n}</b><p>${o.d}</p></div>
     <span class="ok" style="display:${st.auth===o.n?'block':'none'}">${pfSvg('check',20)}</span></div>`).join('')}</section>
   <div class="pf-note">${pfSvg('shield',14,'#0d9668')}<span>授权通过格力+ 家庭组同步，被授权人可远程开关机、调节风速并查看家中空气质量。</span></div>
  </div></div>`);
  pg.querySelectorAll('[data-au]').forEach(b=>b.onclick=()=>{
    st.auth=b.dataset.au;
    pg.querySelectorAll('[data-au]').forEach(x=>x.querySelector('.ok').style.display=x===b?'block':'none');
    const v=document.querySelector('#pfAuthV');if(v)v.textContent=st.auth;
    toast('远程授权已切换为「'+st.auth+'」');});
}
/* ---------- 自清洁 ---------- */
function openPfClean(d){
  const cl=d.pf.clean;
  const pg=openPage(`<div class="pf-wrap">${pfSubHead('自清洁')}<div class="pf-body">
   <section class="pf-card" style="margin-top:0">
    <div class="pf-lrow" style="padding-top:0;border:none"><div><b>自清洁</b><p>定期自动清洁内部风道与扇叶</p></div><span class="pf-sw ${cl.en?'on':''}" id="pfClEn"><i></i></span></div>
   </section>
   <section class="pf-card">
    <div class="pf-time"><div><b>启动时间</b><p>建议设置在夜间停机时段</p></div>
     <div style="display:flex;align-items:center;gap:10px">
      <button class="pf-step" data-cd="-1">${pfSvg('minus',16)}</button>
      <span class="pf-tv" id="pfClT">${cl.t}</span>
      <button class="pf-step" data-cd="1">${pfSvg('plus',16)}</button>
     </div></div>
   </section>
   <div class="pf-note">${pfSvg('refresh',14,'#0d9668')}<span>自清洁约运行 20 分钟，期间风机间歇运转属正常现象；可设置 00:01 - 23:59 任意时刻（步距 1 分钟）或关闭。</span></div>
  </div></div>`);
  const $q=s=>pg.querySelector(s);
  const syncMain=()=>{const v=document.querySelector('#pfCleanV');if(v)v.textContent=cl.en?cl.t:'已关闭';};
  $q('#pfClEn').onclick=()=>{cl.en=!cl.en;$q('#pfClEn').classList.toggle('on',cl.en);syncMain();
    toast('自清洁'+(cl.en?' 已开启':' 已关闭'));};
  pg.querySelectorAll('[data-cd]').forEach(b=>b.onclick=()=>{
    if(!cl.en)return toast('请先开启自清洁');
    cl.t=pfM2t(pfT2m(cl.t)+(+b.dataset.cd));$q('#pfClT').textContent=cl.t;syncMain();});
}
/* ---------- 滤网详情 ---------- */
function openPfFilter(d){
  const pg=openPage(`<div class="pf-wrap">${pfSubHead('滤网管理')}<div class="pf-body">
   <section class="pf-card" style="margin-top:0;text-align:center;padding:22px 16px">
    <div style="width:86px;height:86px;border-radius:24px;background:rgba(240,253,244,.9);display:inline-flex;align-items:center;justify-content:center;color:#0d9668">${pfSvg('filter',42)}</div>
    <b style="display:block;font-size:16px;font-weight:700;margin-top:12px;color:#1f2a26">高效复合滤网</b>
    <p style="font-size:11px;color:#7d8b84;margin-top:4px">HEPA H13 + 高碘值活性炭 · 适配 KJ900F-A01</p>
    <div class="pf-bar" style="margin-top:16px"><i style="width:68%"></i></div>
    <div class="pf-bar-t"><span>余量 <b>68%</b></span><span>剩余约 1800 小时 · 预计 6 个月</span></div>
   </section>
   <section class="pf-card" style="padding:6px 16px">
    ${[['打开后盖','关机断电后，扣住后盖凹槽向外轻拉'],['取出旧滤网','提拉滤网提手，整组取出并装入回收袋'],['装入新滤网','撕掉新滤网塑封，按箭头方向推入到位'],['复位余量','长按机身「滤网」键 3 秒，余量重置为 100%']].map((s,i)=>`
    <div class="pf-li" style="cursor:default"><span class="pf-li-ic plain" style="width:32px;height:32px;font-size:13px;font-weight:700">${i+1}</span>
     <div style="flex:1;min-width:0"><b>${s[0]}</b><p>${s[1]}</p></div></div>`).join('')}
   </section>
   <button class="pf-btn pri" id="pfBuyF" style="margin-top:12px">购买原装滤网 · ¥299</button>
   <p style="text-align:center;font-size:10px;color:#9aa8a2;margin-top:10px">滤网余量 ≤4%（约 120 小时）时将推送更换提醒</p>
  </div></div>`);
  pg.querySelector('#pfBuyF').onclick=()=>{openWebView('https://fmall.gree.com/','董明珠店');toast('已为你跳转原装滤网专区');};
}

/* ================= AI智能服务 ================= */
const AI_CATS=[
 {n:'空气',c:'#1a73e8',ic:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" stroke-width="1.9" stroke-linecap="round"><path d="M3 8h9.5a2.8 2.8 0 1 0-2.8-2.8M3 12.5h13.5a2.8 2.8 0 1 1-2.8 2.8M3 17h6"/></svg>'},
 {n:'能源',c:'#f29900',ic:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f29900" stroke-width="1.9" stroke-linejoin="round"><path d="M13 2.5 4.5 13.5H11l-1.5 8L18.5 10h-6.5z"/></svg>'},
 {n:'食品健康',c:'#34a853',ic:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34a853" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.5S4 15.5 4 9.8A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 8 2.8c0 5.7-8 10.7-8 10.7z"/></svg>'},
 {n:'饮用水',c:'#2b86c8',ic:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2b86c8" stroke-width="1.9" stroke-linejoin="round"><path d="M12 3.5s5.5 6.2 5.5 10a5.5 5.5 0 0 1-11 0c0-3.8 5.5-10 5.5-10z"/></svg>'},
 {n:'厨房安全',c:'#e54545',ic:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e54545" stroke-width="1.9" stroke-linejoin="round"><path d="M12 3 4.5 6v5.5c0 4.5 3 8 7.5 9.5 4.5-1.5 7.5-5 7.5-9.5V6z"/><path d="M12 8.2c1.6 1.6 1.6 3.8 0 5.4-1.6-1.6-1.6-3.8 0-5.4z"/></svg>'},
 {n:'衣物护理',c:'#7c4dff',ic:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c4dff" stroke-width="1.9" stroke-linecap="round"><rect x="3.5" y="3" width="17" height="18" rx="3"/><path d="M3.5 7.5h17"/><circle cx="12" cy="14" r="4.2"/><path d="M12 11.5a2.5 2.5 0 0 1 2.5 2.5"/></svg>'},
 {n:'睡眠健康',c:'#6a5bd8',ic:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6a5bd8" stroke-width="1.9" stroke-linejoin="round"><path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5z"/></svg>'},
 {n:'提醒服务',c:'#d64488',ic:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d64488" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2.5h-15z"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>'}];
const AI_SERVICES=[
 {id:'purify',cat:'空气',name:'智能净化技术',img:'img/ai_air.png',on:true,art:'purify',
  brief:'预测归家时间，到家前提前完成室内除菌净化',
  intro:['基于用户生活习惯和定位数据，预测归家时间；结合客厅面积，智能判断除菌所需时长，在用户到家前提前完成室内净化。','净化完成后自动生成空气健康报告，可在手机上查看除菌率、净化时长与空气质量变化。'],
  habit:{sum:'近 7 日平均归家时间 <b>18:40</b>，最早 17:52，最晚 20:15；平均提前 32 分钟完成净化。',rows:[['7月22日','18:32 到家','18:05 自动净化'],['7月21日','18:47 到家','18:15 自动净化'],['7月20日','19:05 到家','18:35 自动净化'],['7月19日','17:58 到家','17:30 自动净化'],['7月18日','20:12 到家','19:45 自动净化']]},
  params:[{t:'sw',n:'使用定位数据预测归家',k:'loc',v:true},{t:'sl',n:'提前净化时长',k:'pre',min:15,max:60,step:5,v:30,u:' 分钟'},{t:'ch',n:'除菌强度',k:'lv',opts:['标准','强劲'],v:'标准'}]},
 {id:'clean',cat:'空气',name:'AI 双效自洁技术',img:'img/ai_air.png',on:true,art:'clean',
  brief:'预测滤网与蒸发器脏堵风险，按脏污程度自动调节自清洁流程',
  intro:['融合运行时长、电机参数、空气质量、温湿度与使用环境等数据，预测滤网和蒸发器脏堵风险。','按脏污程度自动调节自清洁流程，实现主动提醒、精准清洁与空气净化。当前滤网脏堵风险评估：<b style="color:var(--green)">12%（健康）</b>。'],
  params:[{t:'sw',n:'自动自清洁',k:'auto',v:true},{t:'sw',n:'脏堵风险主动提醒',k:'remind',v:true},{t:'ch',n:'自洁灵敏度',k:'sen',opts:['偏低','标准','偏高'],v:'标准'}]},
 {id:'eco',cat:'能源',name:'客厅无人分级节能',img:'img/ai_energy.png',on:true,art:'eco',
  brief:'感知人的位置与轨迹，按无人时长自动匹配 L1-L4 节能策略',
  intro:['通过感知人的位置、移动轨迹，并深度学习用户行为习惯，判断是否离家、预计离家时长和归家时间，自动匹配节能分级控制策略。'],
  table:`<div style="margin-top:10px;border-radius:12px;overflow:hidden;border:1px solid #f0f1f3">
   ${[['L1','0-15min','短时离开','保持舒适、低风低频运行，避免频繁启停'],['L2','15-60min','临时外出','轻度节能、温度放宽 1-2℃，风量自动降低'],['L3','1-4h','长时无人','深度节能、降低保温，关闭非必要新风/净化'],['L4','>4h','久无人','关机提醒、手机提醒关机，归家前预热控温']].map((r,i)=>`<div style="display:flex;gap:8px;padding:9px 11px;font-size:11px;${i%2?'background:#f7f9fc':''};border-top:${i?'1px solid #f0f1f3':'none'};align-items:center"><b style="color:#f29900;flex:0 0 24px">${r[0]}</b><span style="flex:0 0 56px;color:var(--ink2)">${r[1]}</span><span style="flex:0 0 52px;font-weight:600">${r[2]}</span><span style="color:var(--ink2);line-height:1.45">${r[3]}</span></div>`).join('')}</div>`,
  params:[{t:'sw',n:'L4 久无人关机提醒',k:'l4',v:true},{t:'sw',n:'归家前预热控温',k:'preheat',v:true},{t:'sw',n:'联动关闭非必要新风/净化',k:'fresh',v:false}]},
 {id:'habitwash',cat:'衣物护理',name:'用户习惯分析 · 主动预测',img:'img/ai_cloth.png',on:true,art:'habitwash',
  brief:'分析洗衣习惯，推荐程序置顶、参数记忆、换季提醒、看时看天气',
  intro:['根据用户洗衣习惯分析，自动推荐符合需求的程序置于最前，一键洗衣。','自动记忆上次设置的参数，不用反复设置；换季提醒提前处理换季衣物；看时/看天气自动调整洗衣参数。以下能力均可单独开关。'],
  habit:{sum:'近 30 天洗衣 12 次，最常用 <b>混合洗（58%）</b>，平均水温 40°C，常于周六上午 10 点洗涤。',rows:[['7月20日 10:12','混合洗 40°C · 58分钟'],['7月16日 20:05','快洗 15分钟 · 冷水'],['7月13日 10:08','混合洗 40°C · 58分钟'],['7月09日 19:42','羊毛洗 · 45分钟'],['7月06日 10:15','混合洗 40°C · 58分钟']]},
  params:[{t:'sw',n:'常用程序置顶推荐',k:'top',v:true},{t:'sw',n:'自动记忆上次参数',k:'mem',v:true},{t:'sw',n:'换季衣物提醒',k:'season',v:true},{t:'sw',n:'看时/看天气自动调整参数',k:'weather',v:false}]},
 {id:'freshwind',cat:'衣物护理',name:'新风托管',img:'img/ai_cloth.png',on:false,art:'freshwind',
  brief:'洗护完成长时间未取衣，自动开启新风防闷异味',
  intro:['洗护完成后，长时间未取衣时洗衣机自动开启新风托管，筒内循环换气，防止衣物闷出异味。','托管期间可随时一键开门取衣，新风自动停止。'],
  params:[{t:'sl',n:'未取衣超时启动',k:'timeout',min:30,max:180,step:10,v:60,u:' 分钟'},{t:'ch',n:'单次新风时长',k:'dur',opts:['30分钟','60分钟','90分钟'],v:'60分钟'}]},
 {id:'opendoor',cat:'衣物护理',name:'靠近唤醒 · 自动开门',img:'img/ai_cloth.png',on:false,art:'opendoor',
  brief:'靠近洗衣机自动点亮屏幕、自动开门，便捷拿取衣物',
  intro:['用户靠近洗衣机时，屏幕自动点亮、机门自动开门，便捷启动运行、拿取衣物。','夜间（23:00-6:00）自动降低感应灵敏度，避免误触发。'],
  params:[{t:'ch',n:'感应距离',k:'dist',opts:['近（0.5m）','中（1m）','远（1.5m）'],v:'中（1m）'},{t:'sw',n:'靠近自动点亮屏幕',k:'screen',v:true},{t:'sw',n:'靠近自动开门',k:'door',v:true}]},
 {id:'rice',cat:'提醒服务',name:'未煮饭主动提醒',img:'img/ai_remind.png',on:true,art:'rice',
  brief:'米水已备好但到点未煮饭，手机提醒并支持一键煮饭',
  intro:['若电饭煲已放米跟水，且已到日常煮饭时间但未开启煮饭，通过手机提醒家庭成员，并支持一键煮饭。','AI 主动学习煮饭行为习惯，自动设置日常煮饭时间，也可手动修改。'],
  habit:{sum:'AI 已学习：工作日午饭 <b>11:30</b>、晚饭 <b>17:30</b>；周末午饭 12:10。近 30 天提醒 3 次，均完成一键煮饭。',rows:[['7月22日 11:30','已放米水未煮 · 提醒后一键煮饭'],['7月15日 17:35','已放米水未煮 · 提醒后一键煮饭'],['7月08日 11:32','已放米水未煮 · 提醒后一键煮饭']]},
  params:[{t:'sw',n:'AI 自动学习煮饭时间',k:'learn',v:true},{t:'ch',n:'日常煮饭时间（午饭）',k:'lunch',opts:['11:00','11:30','12:00'],v:'11:30'},{t:'ch',n:'日常煮饭时间（晚饭）',k:'dinner',opts:['17:00','17:30','18:00'],v:'17:30'},{t:'sl',n:'到点未煮提醒延迟',k:'delay',min:10,max:60,step:5,v:20,u:' 分钟'}]},
 {id:'heater',cat:'提醒服务',name:'自动关闭电暖器提醒',img:'img/ai_remind.png',on:true,art:'heater',
  brief:'毫米波雷达监测无人环境，自动关闭电暖器并推送提醒',
  intro:['通过集成毫米波雷达的空调或其他中控平台，监测人的活动状态。','当检测到无人环境时自动关闭电暖器，手机自动推送关机提示信息。'],
  params:[{t:'sl',n:'无人判定时间',k:'noone',min:5,max:30,step:5,v:15,u:' 分钟'},{t:'sl',n:'延迟关机时间',k:'delay',min:0,max:10,step:1,v:3,u:' 分钟'},{t:'sw',n:'关机后推送提示',k:'push',v:true}]},
 {id:'dryburn',cat:'厨房安全',name:'燃气灶干烧提醒',img:'img/ai_ksafe.png',on:true,art:'dryburn',
  brief:'干烧自动关火、烟机联动排烟、手机消息提醒',
  intro:['燃气灶发生干烧时，燃气灶自动关火，油烟机启动排烟，同时发送消息到用户手机提醒。','可设置干烧多长时间后提醒，已默认提供安全值。'],
  params:[{t:'sl',n:'干烧判定时间（安全值 60 秒）',k:'sec',min:30,max:180,step:10,v:60,u:' 秒'},{t:'sw',n:'干烧自动关火',k:'off',v:true},{t:'sw',n:'油烟机联动排烟',k:'hood',v:true},{t:'tx',txt:'免责声明：本功能为辅助安全提醒服务，不能替代用户的安全注意义务。请勿在烹饪时长时间离开厨房，燃气安全以现场确认为准。'}]},
 {id:'timer',cat:'厨房安全',name:'定时关火',img:'img/ai_ksafe.png',on:true,art:'timer',
  brief:'煲汤设定时长，到点自动关火并消息提醒',
  intro:['煲汤时设定时长后即可放心处理其他事务，到达时间自动关火并发消息提醒用户。','支持按食材推荐时长：老火汤 120 分钟、快汤 60 分钟、炖煮 90 分钟。'],
  params:[{t:'sl',n:'煲汤时长',k:'dur',min:30,max:240,step:10,v:120,u:' 分钟'},{t:'sw',n:'到点消息提醒',k:'push',v:true}]},
 {id:'flameout',cat:'厨房安全',name:'外出未关火提醒',img:'img/ai_ksafe.png',on:true,art:'flameout',
  brief:'检测到出门意图且燃气灶未关火，立即提醒指定成员',
  intro:['燃气灶未关火时，手机检测到用户出门意图（离家定位/门锁联动），立即提醒用户燃气灶未关。','可设置推送给谁，包括指定成员，也可以同时推送给在家附近的家庭成员。'],
  params:[{t:'mb',n:'推送指定成员',k:'members',opts:['张明','李婷','张建国','张小妹'],v:['张明','李婷']},{t:'sw',n:'同时推送给在家附近的家庭成员',k:'near',v:true}]},
 {id:'expiry',cat:'食品健康',name:'食材临期主动提醒',img:'img/ai_food.png',on:true,art:'expiry',
  brief:'冰箱食材临近保质期主动提醒，并推荐消耗菜谱',
  intro:['基于冰箱食材库存与录入日期，预测食材新鲜度，临近保质期时主动提醒。','同步推荐可消耗该食材的菜谱，一键下发到蒸烤箱/电饭煲。'],
  params:[{t:'ch',n:'临期提醒阈值',k:'days',opts:['提前 1 天','提前 2 天','提前 3 天'],v:'提前 2 天'},{t:'sw',n:'推荐消耗菜谱',k:'recipe',v:true}]},
 {id:'recipe',cat:'食品健康',name:'节气菜谱智能推荐',img:'img/ai_food.png',on:false,art:'recipe',
  brief:'结合节气、天气与冰箱库存，每日推荐应季菜谱',
  intro:['结合二十四节气、当地天气与冰箱现有食材，每日推荐应季养生菜谱。','支持按家庭成员口味偏好过滤（少辣/低盐/儿童餐）。'],
  params:[{t:'ch',n:'推荐频次',k:'freq',opts:['每日','每周'],v:'每日'},{t:'sw',n:'结合冰箱库存推荐',k:'stock',v:true},{t:'sw',n:'按家庭成员口味过滤',k:'taste',v:true}]},
 {id:'filter',cat:'饮用水',name:'滤芯寿命预测 · 一键复购',img:'img/ai_water.png',on:true,art:'filter',
  brief:'按水质与用水量预测滤芯寿命，到期提醒并一键复购',
  intro:['根据进水 TDS、累计制水量与使用天数，AI 预测每支滤芯的真实剩余寿命，而非简单按天数估算。','寿命不足时主动提醒，支持一键下单复购，滤芯到家扫码自动复位。'],
  params:[{t:'ch',n:'到期提醒阈值',k:'th',opts:['剩 3 天','剩 7 天','剩 15 天'],v:'剩 7 天'},{t:'sw',n:'到期自动加入购物清单',k:'cart',v:false}]},
 {id:'drink',cat:'饮用水',name:'饮水习惯分析 · 补水提醒',img:'img/ai_water.png',on:false,art:'drink',
  brief:'分析家庭成员饮水习惯，长时间未饮水主动提醒补水',
  intro:['通过 NFC 杯贴识别家庭成员取水记录，分析每人饮水习惯。','超过设定间隔未饮水时，向对应成员推送补水提醒（儿童/老人优先）。'],
  habit:{sum:'今日全家已饮水 <b>6.8L</b>：张明 2.1L（达标）、李婷 1.8L（达标）、张建国 1.2L、张小妹 0.9L（偏少）。',rows:[['张明','日均 2.2L · 习惯上午大量饮水'],['李婷','日均 1.9L · 下午 15 点常取 65°C 温水'],['张建国','日均 1.3L · 晚间饮水偏多'],['张小妹','日均 1.0L · 需提醒，偏好 45°C']]},
  params:[{t:'sl',n:'未饮水提醒间隔',k:'gap',min:1,max:4,step:0.5,v:2,u:' 小时'},{t:'sw',n:'儿童/老人优先提醒',k:'priority',v:true}]},
 {id:'sleepac',cat:'睡眠健康',name:'睡眠分期空调联动',img:'img/ai_sleep.png',on:true,art:'sleepac',
  brief:'按深睡/浅睡/REM 分期自动调节温度、风档与新风',
  intro:['根据床垫传感器识别的睡眠分期，卧室空调自动联动：入睡期柔和降温、深睡期恒温低风、清晨预热。','同步调节新风量与湿度目标，维持 CO₂ 与含氧量在舒适区间。'],
  params:[{t:'sw',n:'深睡期恒温低风',k:'deep',v:true},{t:'sw',n:'CO₂ 超标自动新风',k:'co2',v:true},{t:'sl',n:'湿度目标',k:'hum',min:40,max:65,step:5,v:55,u:'%'}]},
 {id:'wakeup',cat:'睡眠健康',name:'晨起缓醒 · 灯光窗帘联动',img:'img/ai_sleep.png',on:false,art:'wakeup',
  brief:'起床前 20 分钟灯光渐亮、窗帘缓开、空调回温',
  intro:['根据睡眠报告预测的浅睡窗口，在起床前 20 分钟启动缓醒程序：灯光渐亮、窗帘缓开、卧室空调回温。','比闹钟更自然的唤醒体验，减少晨起疲惫感。'],
  params:[{t:'ch',n:'目标起床时间',k:'time',opts:['6:30','7:00','7:30','8:00'],v:'7:00'},{t:'sw',n:'灯光渐亮',k:'light',v:true},{t:'sw',n:'窗帘缓开',k:'curtain',v:true},{t:'sw',n:'空调提前回温',k:'ac',v:true}]}];
S.aiSvc={};
const aiOn=s=>S.aiSvc[s.id]!==undefined?S.aiSvc[s.id]:s.on;
const aiSetOn=(s,v)=>{S.aiSvc[s.id]=v;};
const aiSvcBannerHTML=(cat,m)=>{
  const c=AI_CATS.find(x=>x.n===cat);
  const sv=AI_SERVICES.filter(v=>v.cat===cat);
  const on=sv.filter(v=>aiOn(v)).length;
  return `<div class="pw-card" onclick="openAIServices('${cat}')" style="cursor:pointer;display:flex;align-items:center;gap:12px;margin:${m||'12px 14px 0'};background:linear-gradient(135deg,${c.c}14,${c.c}2b)">
   <span class="ai-cat-ic" style="background:#fff;box-shadow:0 2px 8px ${c.c}22">${c.ic}</span>
   <div style="flex:1"><b style="font-size:13.5px">AI智能服务 · ${cat}</b><p style="font-size:11px;color:var(--ink2);margin-top:3px">${sv.length} 项智能服务 · ${on} 项已开启</p></div>
   <span style="color:${c.c};font-size:12px;font-weight:600">查看 ›</span></div>`;
};

const AI_ART={
purify:c=>`<rect x="22" y="52" width="112" height="80" rx="10" fill="#fff" opacity=".9"/><path d="M16 56 78 20l62 36" stroke="${c}" stroke-width="4" fill="none" stroke-linecap="round"/>
 <rect x="196" y="58" width="46" height="72" rx="10" fill="#fff"/><circle cx="219" cy="86" r="12" stroke="${c}" stroke-width="3" fill="none"/>
 <g><path d="M219 86l9-7M219 86l-9 7M219 86v11" stroke="${c}" stroke-width="2.4" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 219 86" to="360 219 86" dur="2s" repeatCount="indefinite"/></g>
 <g stroke="${c}" stroke-width="2" fill="none" stroke-linecap="round"><path d="M254 76c13-6 25-6 37 0"><animate attributeName="stroke-dasharray" values="0 70;35 35;0 70" dur="2.6s" repeatCount="indefinite"/></path><path d="M254 92c13-6 25-6 37 0"><animate attributeName="stroke-dasharray" values="0 70;35 35;0 70" dur="2.6s" begin=".5s" repeatCount="indefinite"/></path><path d="M254 108c13-6 25-6 37 0"><animate attributeName="stroke-dasharray" values="0 70;35 35;0 70" dur="2.6s" begin="1s" repeatCount="indefinite"/></path></g>
 <circle cx="96" cy="112" r="3" fill="${c}"><animate attributeName="cy" values="112;70" dur="2.2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;0" dur="2.2s" repeatCount="indefinite"/></circle>
 <circle cx="116" cy="116" r="2.2" fill="${c}"><animate attributeName="cy" values="116;76" dur="2.6s" begin=".8s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;0" dur="2.6s" begin=".8s" repeatCount="indefinite"/></circle>`,
clean:c=>`<rect x="105" y="36" width="110" height="42" rx="8" fill="#fff"/><rect x="115" y="66" width="90" height="5" rx="2.5" fill="${c}" opacity=".35"/>
 <g><circle cx="188" cy="57" r="10" stroke="${c}" stroke-width="2.6" fill="none"/><path d="M188 57l7-6M188 57l-7 6M188 57v9" stroke="${c}" stroke-width="2.2" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 188 57" to="360 188 57" dur="1.6s" repeatCount="indefinite"/></g>
 <path d="M240 44l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill="${c}"><animate attributeName="opacity" values=".2;1;.2" dur="1.4s" repeatCount="indefinite"/></path>
 <path d="M82 60l1.6 3.2 3.2 1.6-3.2 1.6-1.6 3.2-1.6-3.2-3.2-1.6 3.2-1.6z" fill="${c}"><animate attributeName="opacity" values="1;.2;1" dur="1.4s" repeatCount="indefinite"/></path>
 <circle cx="150" cy="112" r="3" fill="${c}" opacity=".6"><animate attributeName="cy" values="120;88" dur="2.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.7;0" dur="2.4s" repeatCount="indefinite"/></circle>
 <circle cx="172" cy="118" r="2.4" fill="${c}" opacity=".6"><animate attributeName="cy" values="122;92" dur="2.8s" begin=".7s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.7;0" dur="2.8s" begin=".7s" repeatCount="indefinite"/></circle>`,
eco:c=>`<rect x="30" y="88" width="52" height="44" rx="8" fill="#fff"/><path d="M25 92 56 70l31 22" stroke="${c}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
 <circle cx="46" cy="66" r="6" fill="${c}"/><rect x="41" y="73" width="10" height="14" rx="5" fill="${c}"/>
 ${[0,1,2,3].map(i=>`<g><rect x="${150+i*42}" y="${110-i*16}" width="30" height="${22+i*16}" rx="6" fill="${c}" opacity=".22"><animate attributeName="opacity" values=".22;1;.22" dur="4s" begin="${i*0.8}s" repeatCount="indefinite"/></rect><text x="${165+i*42}" y="142" font-size="9" fill="${c}" text-anchor="middle" font-weight="700">L${i+1}</text></g>`).join('')}`,
habitwash:c=>`<rect x="120" y="34" width="80" height="96" rx="12" fill="#fff"/><circle cx="160" cy="88" r="24" stroke="${c}" stroke-width="4" fill="none"/>
 <path d="M160 88c-8-2-12-8-10-16 8 2 12 8 10 16zM160 88c8 2 12 8 10 16-8-2-12-8-10-16z" fill="${c}" opacity=".55"><animateTransform attributeName="transform" type="rotate" from="0 160 88" to="360 160 88" dur="3s" repeatCount="indefinite"/></path>
 <rect x="212" y="34" width="46" height="14" rx="7" fill="${c}"><animate attributeName="opacity" values=".35;1;.35" dur="1.8s" repeatCount="indefinite"/><text x="235" y="44" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">AI</text></rect>
 ${[0,1,2].map(i=>`<rect x="${66+i*18}" y="120" width="12" height="8" rx="4" fill="${c}" opacity=".3"><animate attributeName="opacity" values=".3;1;.3" dur="2.4s" begin="${i*0.5}s" repeatCount="indefinite"/></rect>`).join('')}`,
freshwind:c=>`<rect x="130" y="36" width="76" height="94" rx="12" fill="#fff"/><circle cx="168" cy="88" r="22" stroke="${c}" stroke-width="3.5" fill="none" opacity=".7"/>
 <g stroke="${c}" stroke-width="2.4" fill="none" stroke-linecap="round"><path d="M222 66c14-7 28-7 42 0"><animate attributeName="stroke-dasharray" values="0 80;40 40;0 80" dur="2.2s" repeatCount="indefinite"/></path><path d="M222 88c14-7 28-7 42 0"><animate attributeName="stroke-dasharray" values="0 80;40 40;0 80" dur="2.2s" begin=".4s" repeatCount="indefinite"/></path><path d="M222 110c14-7 28-7 42 0"><animate attributeName="stroke-dasharray" values="0 80;40 40;0 80" dur="2.2s" begin=".8s" repeatCount="indefinite"/></path></g>
 <circle cx="70" cy="80" r="7" fill="${c}" opacity=".8"/><rect x="64" y="88" width="12" height="16" rx="6" fill="${c}" opacity=".8"/><text x="70" y="120" font-size="9" fill="${c}" text-anchor="middle">新风托管中</text>`,
opendoor:c=>`<rect x="150" y="36" width="76" height="94" rx="12" fill="#fff"/>
 <g><path d="M168 64a24 24 0 0 1 0 48" stroke="${c}" stroke-width="4" fill="none" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" values="0 168 88;-38 168 88;0 168 88" keyTimes="0;.5;1" dur="3.2s" repeatCount="indefinite"/></path></g>
 <circle cx="80" cy="80" r="7" fill="${c}"><animate attributeName="cx" values="60;120;60" keyTimes="0;.5;1" dur="3.2s" repeatCount="indefinite"/></circle>
 <rect x="75" y="88" width="12" height="16" rx="6" fill="${c}"><animate attributeName="x" values="55;115;55" keyTimes="0;.5;1" dur="3.2s" repeatCount="indefinite"/></rect>
 <path d="M232 52l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill="${c}"><animate attributeName="opacity" values=".2;1;.2" dur="1.6s" repeatCount="indefinite"/></path>`,
rice:c=>`<rect x="120" y="62" width="80" height="56" rx="14" fill="#fff"/><path d="M132 62v-8h56v8" stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round"/>
 <g stroke="${c}" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".8"><path d="M148 48c3-4 3-8 0-12"><animate attributeName="opacity" values="0;.9;0" dur="2s" repeatCount="indefinite"/></path><path d="M162 48c3-4 3-8 0-12"><animate attributeName="opacity" values="0;.9;0" dur="2s" begin=".5s" repeatCount="indefinite"/></path><path d="M176 48c3-4 3-8 0-12"><animate attributeName="opacity" values="0;.9;0" dur="2s" begin="1s" repeatCount="indefinite"/></path></g>
 <circle cx="238" cy="60" r="20" fill="#fff" stroke="${c}" stroke-width="3"/><path d="M238 60V46" stroke="${c}" stroke-width="3" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 238 60" to="360 238 60" dur="10s" repeatCount="indefinite"/></path><path d="M238 60l9 5" stroke="${c}" stroke-width="3" stroke-linecap="round"/>
 <path d="M66 76v-14a10 10 0 0 1 20 0v14l5 8H61z" fill="${c}"><animateTransform attributeName="transform" type="rotate" values="0 76 60;8 76 60;-8 76 60;0 76 60" dur="1.6s" repeatCount="indefinite"/></path><circle cx="76" cy="90" r="4" fill="${c}"/>`,
heater:c=>`<rect x="130" y="56" width="60" height="70" rx="10" fill="#fff"/><g stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round"><path d="M144 78c4-5 4-9 0-14"><animate attributeName="opacity" values=".2;1;.2" dur="1.5s" repeatCount="indefinite"/></path><path d="M160 78c4-5 4-9 0-14"><animate attributeName="opacity" values=".2;1;.2" dur="1.5s" begin=".3s" repeatCount="indefinite"/></path><path d="M176 78c4-5 4-9 0-14"><animate attributeName="opacity" values=".2;1;.2" dur="1.5s" begin=".6s" repeatCount="indefinite"/></path></g><rect x="140" y="96" width="40" height="20" rx="4" fill="${c}" opacity=".25"/>
 <g><circle cx="70" cy="72" r="7" fill="${c}"/><rect x="64" y="80" width="12" height="16" rx="6" fill="${c}"/><animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;.45;.55;.9;1" dur="5s" repeatCount="indefinite"/></g>
 <rect x="220" y="52" width="40" height="66" rx="8" fill="#fff"/><rect x="226" y="60" width="28" height="40" rx="4" fill="${c}" opacity=".2"/><path d="M240 106a3 3 0 1 0 0 .1z" fill="${c}"/><path d="M232 72l5-5 3 3 7-7" stroke="${c}" stroke-width="2.4" fill="none" stroke-linecap="round"><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.5;.6;.95;1" dur="5s" repeatCount="indefinite"/></path>`,
dryburn:c=>`<rect x="120" y="96" width="80" height="26" rx="8" fill="#fff"/><circle cx="160" cy="109" r="9" stroke="${c}" stroke-width="3" fill="none"/>
 <ellipse cx="160" cy="76" rx="9" ry="14" fill="${c}"><animate attributeName="ry" values="14;17;12;14" dur="1.1s" repeatCount="indefinite"/></ellipse><ellipse cx="160" cy="82" rx="4.5" ry="7" fill="#fff" opacity=".85"/>
 <circle cx="160" cy="80" r="30" stroke="${c}" stroke-width="2" fill="none" opacity=".5"><animate attributeName="r" values="24;34" dur="1.6s" repeatCount="indefinite"/><animate attributeName="opacity" values=".7;0" dur="1.6s" repeatCount="indefinite"/></circle>
 <path d="M228 44l14 24h-28z" fill="${c}"><animate attributeName="opacity" values=".25;1;.25" dur="1.1s" repeatCount="indefinite"/></path><path d="M228 53v7" stroke="#fff" stroke-width="2.6" stroke-linecap="round"><animate attributeName="opacity" values=".25;1;.25" dur="1.1s" repeatCount="indefinite"/></path><circle cx="228" cy="64" r="1.6" fill="#fff"><animate attributeName="opacity" values=".25;1;.25" dur="1.1s" repeatCount="indefinite"/></circle>
 <path d="M84 84V64a10 10 0 0 1 20 0v20l5 8H79z" fill="${c}" opacity=".85"/><circle cx="94" cy="98" r="4" fill="${c}"/>`,
timer:c=>`<circle cx="120" cy="76" r="34" fill="#fff" stroke="${c}" stroke-width="4"/><path d="M120 76V52" stroke="${c}" stroke-width="4" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 120 76" to="360 120 76" dur="8s" repeatCount="indefinite"/></path><path d="M120 76l14 8" stroke="${c}" stroke-width="4" stroke-linecap="round"/><circle cx="120" cy="76" r="4" fill="${c}"/>
 <rect x="196" y="76" width="70" height="42" rx="12" fill="#fff"/><g stroke="${c}" stroke-width="2.4" fill="none" stroke-linecap="round"><path d="M216 66c3-4 3-8 0-12"><animate attributeName="opacity" values="0;.9;0" dur="2s" repeatCount="indefinite"/></path><path d="M232 66c3-4 3-8 0-12"><animate attributeName="opacity" values="0;.9;0" dur="2s" begin=".6s" repeatCount="indefinite"/></path><path d="M248 66c3-4 3-8 0-12"><animate attributeName="opacity" values="0;.9;0" dur="2s" begin="1.1s" repeatCount="indefinite"/></path></g>`,
flameout:c=>`<rect x="34" y="46" width="44" height="86" rx="8" fill="#fff"/><circle cx="68" cy="90" r="3.5" fill="${c}"/>
 <g><circle cx="120" cy="70" r="7" fill="${c}"/><rect x="114" y="78" width="12" height="16" rx="6" fill="${c}"/><animateTransform attributeName="transform" type="translate" values="40 0;0 0;40 0" keyTimes="0;.5;1" dur="4s" repeatCount="indefinite"/></g>
 <ellipse cx="190" cy="66" rx="8" ry="13" fill="${c}"><animate attributeName="ry" values="13;16;11;13" dur="1.2s" repeatCount="indefinite"/></ellipse><rect x="172" y="88" width="36" height="18" rx="6" fill="#fff"/><circle cx="190" cy="97" r="7" stroke="${c}" stroke-width="2.6" fill="none"/>
 <rect x="232" y="50" width="38" height="64" rx="8" fill="#fff"/><path d="M244 76v-12a7 7 0 0 1 14 0v12l4 6h-22z" fill="${c}"><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.45;.55;.9;1" dur="4s" repeatCount="indefinite"/></path>`,
expiry:c=>`<rect x="110" y="34" width="64" height="98" rx="10" fill="#fff"/><path d="M110 72h64" stroke="${c}" stroke-width="2.5"/><rect x="120" y="44" width="20" height="18" rx="4" fill="${c}" opacity=".3"/><rect x="146" y="44" width="20" height="18" rx="4" fill="${c}" opacity=".55"/><rect x="120" y="82" width="44" height="10" rx="5" fill="${c}" opacity=".3"/><rect x="120" y="98" width="32" height="10" rx="5" fill="${c}" opacity=".2"/>
 <rect x="196" y="48" width="52" height="46" rx="8" fill="#fff"/><rect x="196" y="48" width="52" height="14" rx="8" fill="${c}"/><text x="222" y="82" font-size="15" fill="${c}" text-anchor="middle" font-weight="700">2</text>
 <circle cx="222" cy="116" r="14" fill="${c}"><animate attributeName="opacity" values=".25;1;.25" dur="1.6s" repeatCount="indefinite"/></circle><text x="222" y="121" font-size="14" fill="#fff" text-anchor="middle" font-weight="700">!</text>`,
recipe:c=>`<path d="M96 108a64 20 0 0 0 128 0z" fill="#fff"/><path d="M96 108a64 26 0 0 1 128 0" fill="#fff" stroke="${c}" stroke-width="3"/><circle cx="160" cy="78" r="6" fill="${c}"/>
 <g stroke="${c}" stroke-width="2.4" fill="none" stroke-linecap="round"><path d="M132 64c3-4 3-8 0-12"><animate attributeName="opacity" values="0;.9;0" dur="2s" repeatCount="indefinite"/></path><path d="M160 58c3-4 3-8 0-12"><animate attributeName="opacity" values="0;.9;0" dur="2s" begin=".5s" repeatCount="indefinite"/></path><path d="M188 64c3-4 3-8 0-12"><animate attributeName="opacity" values="0;.9;0" dur="2s" begin="1s" repeatCount="indefinite"/></path></g>
 <path d="M228 44l2.4 5 5 2.4-5 2.4-2.4 5-2.4-5-5-2.4 5-2.4z" fill="${c}"><animate attributeName="opacity" values=".2;1;.2" dur="1.5s" repeatCount="indefinite"/></path><path d="M88 52l1.8 3.8 3.8 1.8-3.8 1.8-1.8 3.8-1.8-3.8-3.8-1.8 3.8-1.8z" fill="${c}"><animate attributeName="opacity" values="1;.2;1" dur="1.5s" repeatCount="indefinite"/></path>`,
filter:c=>`<rect x="130" y="34" width="42" height="96" rx="14" fill="#fff"/><rect x="138" y="44" width="26" height="76" rx="9" fill="${c}" opacity=".22"/><rect x="138" y="44" width="26" height="30" rx="9" fill="${c}" opacity=".5"><animate attributeName="height" values="30;70;30" dur="4s" repeatCount="indefinite"/></rect>
 <path d="M216 44s10 11 10 17a10 10 0 0 1-20 0c0-6 10-17 10-17z" fill="${c}"><animate attributeName="opacity" values=".35;1;.35" dur="2s" repeatCount="indefinite"/></path>
 <ellipse cx="216" cy="108" rx="16" ry="5" stroke="${c}" stroke-width="2" fill="none"><animate attributeName="rx" values="8;22" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0" dur="2s" repeatCount="indefinite"/></ellipse>
 <circle cx="90" cy="112" r="15" fill="${c}"><animate attributeName="opacity" values=".2;1;.2" dur="2.4s" repeatCount="indefinite"/></circle><text x="90" y="117" font-size="12" fill="#fff" text-anchor="middle" font-weight="700">75%</text>`,
drink:c=>`<path d="M132 44h56l-8 86h-40z" fill="#fff"/><path d="M136 76h48l-5 54h-38z" fill="${c}" opacity=".45"><animate attributeName="opacity" values=".3;.6;.3" dur="2.6s" repeatCount="indefinite"/></path><path d="M132 44h56" stroke="${c}" stroke-width="3" stroke-linecap="round"/>
 <circle cx="160" cy="94" r="4" fill="#fff" opacity=".8"><animate attributeName="cy" values="112;82" dur="2.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.9;0" dur="2.4s" repeatCount="indefinite"/></circle>
 <path d="M226 66v-14a10 10 0 0 1 20 0v14l5 8h-30z" fill="${c}"><animateTransform attributeName="transform" type="rotate" values="0 236 50;8 236 50;-8 236 50;0 236 50" dur="1.8s" repeatCount="indefinite"/></path><circle cx="236" cy="80" r="4" fill="${c}"/>`,
sleepac:c=>`<path d="M250 42a18 18 0 1 1-20-24 14 14 0 0 0 20 24z" fill="${c}"/>
 <circle cx="196" cy="34" r="2" fill="${c}"><animate attributeName="opacity" values=".2;1;.2" dur="1.6s" repeatCount="indefinite"/></circle><circle cx="222" cy="24" r="1.6" fill="${c}"><animate attributeName="opacity" values="1;.2;1" dur="1.6s" repeatCount="indefinite"/></circle>
 <rect x="56" y="96" width="120" height="22" rx="9" fill="#fff"/><rect x="62" y="82" width="34" height="16" rx="7" fill="#fff" stroke="${c}" stroke-width="2"/>
 <g stroke="${c}" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".85"><path d="M196 96c12-6 24-6 36 0"><animate attributeName="stroke-dasharray" values="0 60;30 30;0 60" dur="2.8s" repeatCount="indefinite"/></path><path d="M196 110c12-6 24-6 36 0"><animate attributeName="stroke-dasharray" values="0 60;30 30;0 60" dur="2.8s" begin=".7s" repeatCount="indefinite"/></path></g>
 <text x="104" y="66" font-size="13" fill="${c}" font-weight="700">Z</text><text x="116" y="56" font-size="10" fill="${c}"><animate attributeName="opacity" values="0;1;0" dur="2.2s" repeatCount="indefinite"/>Z</text><text x="126" y="48" font-size="8" fill="${c}"><animate attributeName="opacity" values="0;1;0" dur="2.2s" begin=".6s" repeatCount="indefinite"/>Z</text>`,
wakeup:c=>`<circle cx="160" cy="96" r="20" fill="${c}"><animate attributeName="cy" values="106;86;106" dur="4s" repeatCount="indefinite"/></circle>
 <g stroke="${c}" stroke-width="2.6" stroke-linecap="round"><path d="M160 58v-8"/><path d="M132 68l-6-6"/><path d="M188 68l6-6"/><path d="M124 96h-10"/><path d="M196 96h10"/><animate attributeName="opacity" values=".3;1;.3" dur="4s" repeatCount="indefinite"/></g>
 <rect x="60" y="52" width="22" height="76" rx="8" fill="#fff"/><rect x="238" y="52" width="22" height="76" rx="8" fill="#fff"/>
 <rect x="66" y="58" width="10" height="64" rx="5" fill="${c}" opacity=".35"><animate attributeName="width" values="10;4;10" dur="4s" repeatCount="indefinite"/></rect><rect x="244" y="58" width="10" height="64" rx="5" fill="${c}" opacity=".35"><animate attributeName="x" values="244;250;244" dur="4s" repeatCount="indefinite"/><animate attributeName="width" values="10;4;10" dur="4s" repeatCount="indefinite"/></rect>
 <path d="M160 118a44 12 0 0 0 88 0z" fill="#fff" opacity=".0"/>`};
function aiArt(s){
  const c=(AI_CATS.find(x=>x.n===s.cat)||{}).c||'#1a73e8';
  return `<div class="ai-art" style="background:linear-gradient(135deg,${c}12,${c}26)"><svg viewBox="0 0 320 150">${(AI_ART[s.art]||AI_ART.purify)(c)}</svg></div>`;
}

function openAIServices(cat0){
  let cat=cat0||'全部',st='全部';
  const el=openPage(`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button><h1>AI智能服务</h1><span class="pg-extra" id="aiCnt"></span></div>
   <div style="display:flex;gap:10px;align-items:center;padding:10px 14px 0">
    <div class="msg-filter" id="aiCats">${['全部',...AI_CATS.map(c=>c.n)].map(t=>`<button class="chip ${t===cat?'on':''}" data-ac="${t}">${t}</button>`).join('')}</div>
    <div class="msg-sort">${['全部','已开启','已关闭'].map(t=>`<button class="${t==='全部'?'on':''}" data-as="${t}">${t}</button>`).join('')}</div>
   </div>
   <div class="page-scroll" id="aiBody" style="padding-bottom:20px"></div>`,el=>{
    const cardHTML=s=>{
      const c=AI_CATS.find(x=>x.n===s.cat);
      return `<div class="ai-svc" data-asvc="${s.id}"><img src="${s.img}">
       <div class="t"><span class="cat-tag" style="color:${c.c};background:${c.c}1a">${s.cat}</span><h4>${s.name}</h4><p>${s.brief}</p></div>
       <span class="switch ${aiOn(s)?'on':''}" data-asw="${s.id}"></span></div>`;};
    const render=()=>{
      const list=AI_SERVICES.filter(s=>(cat==='全部'||s.cat===cat)&&(st==='全部'||(st==='已开启')===aiOn(s)));
      const onAll=AI_SERVICES.filter(s=>aiOn(s)).length;
      el.querySelector('#aiCnt').textContent=`${onAll}/${AI_SERVICES.length} 已开启`;
      let html='';
      if(cat==='全部'){
        AI_CATS.forEach(c=>{const items=list.filter(s=>s.cat===c.n);
          if(items.length)html+=`<div class="ai-list" style="padding-top:0"><div class="msg-group" style="margin:12px 4px 6px">${c.n} · ${items.length} 项</div>${items.map(cardHTML).join('')}</div>`;});
        html=html||'<div style="text-align:center;color:var(--ink3);padding:60px 0;font-size:12.5px">暂无符合条件的AI服务</div>';
      }else{
        html=`<div class="ai-list">${list.map(cardHTML).join('')||'<div style="text-align:center;color:var(--ink3);padding:60px 0;font-size:12.5px">暂无符合条件的AI服务</div>'}</div>`;
      }
      el.querySelector('#aiBody').innerHTML=html;
      el.querySelectorAll('[data-asvc]').forEach(cd=>cd.onclick=()=>openAISvcDetail(cd.dataset.asvc));
      el.querySelectorAll('[data-asw]').forEach(sw=>sw.onclick=e=>{e.stopPropagation();
        const s=AI_SERVICES.find(x=>x.id===sw.dataset.asw);
        aiSetOn(s,!aiOn(s));sw.classList.toggle('on',aiOn(s));
        el.querySelector('#aiCnt').textContent=`${AI_SERVICES.filter(x=>aiOn(x)).length}/${AI_SERVICES.length} 已开启`;
        toast(aiOn(s)?`已开启「${s.name}」`:`已关闭「${s.name}」`);});
    };
    el.querySelectorAll('[data-ac]').forEach(c=>c.onclick=()=>{cat=c.dataset.ac;
      el.querySelectorAll('[data-ac]').forEach(x=>x.classList.toggle('on',x===c));render();});
    el.querySelectorAll('[data-as]').forEach(b=>b.onclick=()=>{st=b.dataset.as;
      el.querySelectorAll('[data-as]').forEach(x=>x.classList.toggle('on',x===b));render();});
    const fl=el.querySelector('#aiCats');if(fl)dragScroll(fl);
    render();
  });
}
function openAISvcDetail(id){
  const s=AI_SERVICES.find(x=>x.id===id);
  const c=AI_CATS.find(x=>x.n===s.cat);
  const paramHTML=p=>{
    if(p.t==='sw')return `<div class="kv" style="border:none;padding:11px 0"><span style="color:var(--ink);font-size:12.5px">${p.n}</span><span class="switch ${p.v?'on':''}" data-psw="${p.k}"></span></div>`;
    if(p.t==='sl')return `<div style="padding:11px 0"><div style="display:flex;justify-content:space-between;align-items:baseline"><span style="font-size:12.5px">${p.n}</span><b style="font-size:12.5px;color:var(--blue)" id="pv_${p.k}">${p.v}${p.u}</b></div>
      <input type="range" class="xslider" data-psl="${p.k}" min="${p.min}" max="${p.max}" step="${p.step}" value="${p.v}" style="--sl-a:#7db3f5;--sl-b:#1a73e8;width:100%;margin-top:10px;--fill:${(p.v-p.min)/(p.max-p.min)*100}%"></div>`;
    if(p.t==='ch')return `<div style="padding:11px 0"><span style="font-size:12.5px">${p.n}</span><div class="chip-row" style="justify-content:flex-start;margin-top:8px;flex-wrap:wrap">${p.opts.map(o=>`<button class="chip ${p.v===o?'on':''}" data-pch="${p.k}|${o}">${o}</button>`).join('')}</div></div>`;
    if(p.t==='mb')return `<div style="padding:11px 0"><span style="font-size:12.5px">${p.n}</span><div class="chip-row" style="justify-content:flex-start;margin-top:8px;flex-wrap:wrap">${p.opts.map(o=>`<button class="chip ${p.v.includes(o)?'on':''}" data-pmb="${p.k}">${o}</button>`).join('')}</div></div>`;
    if(p.t==='tx')return `<p style="font-size:11px;color:var(--ink3);background:#f7f8fa;border-radius:10px;padding:11px;margin:11px 0 2px;line-height:1.65">${p.txt}</p>`;
    return '';
  };
  const el=openPage(`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button><h1>${s.name}</h1><span class="pg-extra" style="color:${c.c};font-weight:600">${c.n}</span></div>
   <div class="page-scroll" style="padding-bottom:92px">
    ${aiArt(s)}
    <div class="pw-card"><b style="font-size:13.5px">服务介绍</b>
     ${s.intro.map(t=>`<p style="font-size:12px;color:var(--ink2);line-height:1.7;margin-top:8px">${t}</p>`).join('')}
     ${s.table||''}</div>
    ${s.habit?`<div class="pw-card"><div class="kv" style="border:none;padding:2px 0;cursor:pointer" id="aiHabitT"><span style="color:var(--ink);font-size:13.5px;font-weight:700">用户习惯分析</span><span style="font-size:11.5px;color:var(--blue)" id="aiHabitV">查看历史行为记录 ›</span></div>
     <p style="font-size:12px;color:var(--ink2);line-height:1.65;margin-top:8px">${s.habit.sum}</p>
     <div class="ai-hist" id="aiHist">${s.habit.rows.map(r=>`<div class="kv" style="border:none"><span style="font-size:12px">${r[0]}</span><span style="font-size:11px;color:var(--ink2);text-align:right">${r[1]}${r[2]?'<br>'+r[2]:''}</span></div>`).join('')}</div></div>`:''}
    <div class="pw-card"><b style="font-size:13.5px">参数设置</b><div style="margin-top:2px">${s.params.map(paramHTML).join('')}</div></div>
   </div>
   <div class="ai-dock"><button id="aiToggle" class="${aiOn(s)?'off-btn':'on-btn'}">${aiOn(s)?'关闭服务':'开启服务'}</button></div>`,el=>{
    el.querySelector('#aiToggle').onclick=()=>{
      aiSetOn(s,!aiOn(s));
      const b=el.querySelector('#aiToggle');
      b.textContent=aiOn(s)?'关闭服务':'开启服务';
      b.className=aiOn(s)?'off-btn':'on-btn';
      toast(aiOn(s)?`已开启「${s.name}」`:`已关闭「${s.name}」`);};
    const ht=el.querySelector('#aiHabitT');
    if(ht)ht.onclick=()=>{
      const h=el.querySelector('#aiHist'),open=h.style.display==='block';
      h.style.display=open?'none':'block';
      el.querySelector('#aiHabitV').textContent=open?'查看历史行为记录 ›':'收起记录 ∧';};
    el.querySelectorAll('[data-psw]').forEach(sw=>sw.onclick=()=>{sw.classList.toggle('on');
      const p=s.params.find(x=>x.k===sw.dataset.psw);p.v=sw.classList.contains('on');});
    el.querySelectorAll('[data-psl]').forEach(sl=>{
      const p=s.params.find(x=>x.k===sl.dataset.psl);
      sl.oninput=()=>{p.v=+sl.value;sl.style.setProperty('--fill',(p.v-p.min)/(p.max-p.min)*100+'%');
        el.querySelector('#pv_'+p.k).textContent=p.v+p.u;};
      sl.onchange=()=>toast('已更新：'+p.n);});
    el.querySelectorAll('[data-pch]').forEach(ch=>ch.onclick=()=>{
      const [k,v]=ch.dataset.pch.split('|');
      s.params.find(x=>x.k===k).v=v;
      ch.parentElement.querySelectorAll('.chip').forEach(x=>x.classList.toggle('on',x===ch));});
    el.querySelectorAll('[data-pmb]').forEach(ch=>ch.onclick=()=>{
      const p=s.params.find(x=>x.k===ch.dataset.pmb);
      const i=p.v.indexOf(ch.textContent);
      if(i<0)p.v.push(ch.textContent);else p.v.splice(i,1);
      ch.classList.toggle('on',i<0);});
  });
}

/* ================= 蒸烤箱控制页 ================= */
const OV_FAN=(s)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="4.5"/><circle cx="12" cy="12" r="1.5"/><path d="M12 10.5c.3-2.3 1.2-4.5 3.2-4.5 2.3 0 1.9 3.5-1.2 4.7M13.5 12c2.3.3 4.5 1.2 4.5 3.2 0 2.3-3.5 1.9-4.7-1.2M12 13.5c-.3 2.3-1.2 4.5-3.2 4.5-2.3 0-1.9-3.5 1.2-4.7M10.5 12c-2.3-.3-4.5-1.2-4.5-3.2 0-2.3 3.5-1.9 4.7 1.2"/></svg>`;
const OV_BOOK='<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H19v17.5H7.5A2.5 2.5 0 0 0 5 22z"/><path d="M5 19.5A2.5 2.5 0 0 1 7.5 17H19"/><path d="M9 7h6M9 10.5h4"/></svg>';
const OV_CHEF='<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M8.5 17.5h7"/><path d="M7 13.5A3.5 3.5 0 0 1 8.4 6.7 4.2 4.2 0 0 1 12 5a4.2 4.2 0 0 1 3.6 1.7A3.5 3.5 0 0 1 17 13.5v4H7z"/></svg>';
const OV_BULB='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9.5 18h5M10.5 21h3"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/></svg>';
const OV_SEARCH='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>';
const OV_MODES={
 fav:[['纯蒸','清蒸鲈鱼','12分钟',12],['嫩烤','蜜汁烤鸡翅','22分钟',22],['空气炸','黄金薯条','15分钟',15],['发酵','面团发酵','40分钟',40]],
 cus:[['3D热风','自定义1','18分钟',18],['3D热风','自定义2','55分钟',55],['3D热风','自定义3','1小时10分钟',70],['3D热风','自定义4','25分钟',25]]};
const OV_CLOUD=[['r_fish','清蒸鲈鱼','纯蒸 100°C · 12分钟',12],['r_wings','蜜汁烤鸡翅','嫩烤 200°C · 22分钟',22],['r_cake','戚风蛋糕','3D热风 160°C · 50分钟',50],['r_egg','虾仁蒸水蛋','纯蒸 95°C · 15分钟',15]];
function openOvenCtl(d){
  let sec='fav';
  const head=`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button>
   <div class="ac-tt"><h1>蒸烤箱</h1><span>${d.name} · ${d.room}</span></div>
   <button class="ac-more" id="ovMenu">${AC_MISC_SVG.dots}</button></div>`;
  const el=openPage(head+`<div class="ov-top">
    <div class="ov-top-tabs"><button class="on" data-ott="dev">蒸烤箱</button><button data-ott="cloud">云菜单</button></div>
    <span class="ov-top-ic" id="ovSearch">${OV_SEARCH}</span></div>
   <div class="page-scroll" style="padding-bottom:12px">
    <div id="ovDev">
     <div id="ovRun"></div>
     <div class="ov-entries">
      <div class="ov-ent" id="ovSmart"><i style="background:linear-gradient(135deg,#ff7d9c,#f53d5c)">${OV_BOOK}</i><span>智能菜单</span></div>
      <div class="ov-ent" id="ovPro"><i style="background:linear-gradient(135deg,#ffb25c,#f5791d)">${OV_CHEF}</i><span>专业模式</span></div>
     </div>
     <div class="ov-sec"><button class="${sec==='fav'?'on':''}" data-os="fav">我的收藏</button><button class="${sec==='cus'?'on':''}" data-os="cus">自定义模式</button><span class="all" id="ovAll">查看全部 ›</span></div>
     <div class="ov-grid" id="ovGrid"></div>
     <div class="ov-add" id="ovAdd"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f2441d" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>添加自定义模式（6/10）</div>
    </div>
    <div id="ovCloudBox" style="display:none"><div class="ov-cloud" id="ovCloudList"></div></div>
    <div style="height:10px"></div>
   </div>
   <div class="ac-dock">
    <div class="ac-dock-it"><button class="ac-dock-btn ${d.on===false?'off':''}" id="ovPower">${AC_MISC_SVG.power}</button><span>开关</span></div>
    <div class="ac-dock-it"><button class="ac-dock-btn ${d.light?'':'off'}" id="ovLight">${OV_BULB}</button><span>灯光</span></div>
   </div>`);
  const renderRun=()=>{
    const o=S.oven,active=o.cooking&&o.left>0;
    el.querySelector('#ovRun').innerHTML=active?`<div class="wp-run" style="background:linear-gradient(120deg,#fdeeea,#fff6f2);border-color:#f6d9cb">
     <div class="rt"><h4>${o.dish}</h4><p>${o.running?'<span class="cook-anim"></span> 烹饪中':'已暂停'} · ${d.room}</p></div>
     <div style="text-align:right"><b id="ringOven">${fmt(o.left)}</b><div style="font-size:9.5px;color:var(--ink2)">剩余时间</div></div>
     <button class="mini-btn" id="ovPause" style="margin:0">${o.running?'暂停':'继续'}</button>
     <button class="mini-btn" id="ovCancel" style="margin:0;background:#f3f4f6;color:var(--ink2)">取消</button></div>`:'';
    const p=el.querySelector('#ovPause');
    if(p)p.onclick=()=>{o.running=!o.running;renderRun();toast(o.running?'继续烹饪':'已暂停');};
    const c=el.querySelector('#ovCancel');
    if(c)c.onclick=()=>{S.oven={dish:'',left:0,running:false,cooking:false};renderRun();toast('已取消烹饪');};
  };
  const startCook=(name,min)=>{
    if(d.on===false)return toast('请先开机');
    S.oven={dish:name,left:min*60,running:true,cooking:true};
    renderRun();toast('已启动「'+name+'」');
    el.querySelector('.page-scroll').scrollTop=0;};
  const renderGrid=()=>{
    el.querySelector('#ovGrid').innerHTML=OV_MODES[sec].map(m=>`<div class="ov-card" data-oc="${m[1]}|${m[3]}">
     <span class="tag">${m[0]}</span><span class="fan">${OV_FAN(22)}</span>
     <h4>${m[1]}</h4><span class="dur">${m[2]}</span><span class="wm">${OV_FAN(96)}</span></div>`).join('');
    el.querySelectorAll('[data-oc]').forEach(c=>c.onclick=()=>{const v=c.dataset.oc.split('|');startCook(v[0],+v[1]);});
  };
  el.querySelectorAll('[data-os]').forEach(b=>b.onclick=()=>{sec=b.dataset.os;
    el.querySelectorAll('[data-os]').forEach(x=>x.classList.toggle('on',x===b));renderGrid();});
  el.querySelector('#ovAll').onclick=()=>toast(sec==='fav'?'共 12 个收藏模式，已展示常用 4 个':'自定义模式已满 6/10');
  el.querySelector('#ovAdd').onclick=()=>toast('自定义模式：选择加热方式 + 温度 + 时间即可保存');
  el.querySelector('#ovSmart').onclick=()=>{el.querySelector('[data-ott="cloud"]').click();};
  el.querySelector('#ovPro').onclick=()=>toast('专业模式：可自定义温度 / 蒸汽 / 时间多段组合');
  el.querySelector('#ovSearch').onclick=()=>toast('搜索烹饪模式与云菜谱');
  el.querySelector('#ovMenu').onclick=()=>toast('蒸烤箱设置');
  el.querySelector('#ovCloudList').innerHTML=OV_CLOUD.map(r=>`<div class="ov-cr"><img src="img/${r[0]}.png">
    <div style="flex:1"><h4>${r[1]}</h4><p>${r[2]}</p></div>
    <button class="mini-btn" style="margin:0" data-ck="${r[1]}|${r[3]}">一键烹饪</button></div>`).join('');
  el.querySelectorAll('[data-ck]').forEach(b=>b.onclick=()=>{const v=b.dataset.ck.split('|');startCook(v[0],+v[1]);
    el.querySelector('[data-ott="dev"]').click();});
  el.querySelectorAll('[data-ott]').forEach(b=>b.onclick=()=>{
    el.querySelectorAll('[data-ott]').forEach(x=>x.classList.toggle('on',x===b));
    const dev=b.dataset.ott==='dev';
    el.querySelector('#ovDev').style.display=dev?'':'none';
    el.querySelector('#ovCloudBox').style.display=dev?'none':'';});
  const pwr=el.querySelector('#ovPower');
  pwr.onclick=()=>{d.on=d.on===false?true:false;pwr.classList.toggle('off',d.on===false);
    if(d.on===false&&S.oven.cooking){S.oven={dish:'',left:0,running:false,cooking:false};renderRun();}
    toast(d.on===false?'蒸烤箱已关机':'蒸烤箱已开机');};
  const lt=el.querySelector('#ovLight');
  lt.onclick=()=>{d.light=!d.light;lt.classList.toggle('off',!d.light);toast(d.light?'炉灯已开启':'炉灯已关闭');};
  renderRun();renderGrid();
}

/* ================= 洗衣机控制页 ================= */
const WP_TABS=[
 ['洗涤',[['AI智洗','Auto','w_ai'],['混合','58分钟','w_mix'],['大物','1小时30分钟','w_big'],['除毛净','1小时','w_feather'],['衬衣','1小时','c_silk'],['羽绒','1小时20分钟','c_down']]],
 ['洗烘',[['混合洗烘','1小时40分钟','w_mix'],['快洗烘','59分钟','w_big'],['除菌洗烘','2小时','w_feather'],['羽绒洗烘','2小时10分钟','c_down']]],
 ['热泵烘干',[['即穿烘','1小时','w_mix'],['大物烘','2小时30分钟','w_big'],['除菌烘','1小时30分钟','w_feather'],['羽绒烘','1小时50分钟','c_down']]],
 ['空气洗',[['羊绒护理','30分钟','c_cashmere'],['真丝护理','25分钟','c_silk'],['西装护理','35分钟','c_suit'],['羽绒蓬松','40分钟','c_down']]]];
function openWasherCtl(d){return openWm2Ctl(d)}

/* ================= 洗衣机控制页 V2（清泉水系 · 智能洗护） ================= */
const WM2_IC={
 scale:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v2.5M7 20.5h10"/><path d="M8 20.5 10 12h4l2 8.5"/><circle cx="12" cy="9" r="2.4"/></svg>',
 robe:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4 4.5 7 6 10.5 8.5 9.5V20h7V9.5L18 10.5 19.5 7 15 4a3 3 0 0 1-6 0z"/></svg>',
 wind:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M3 8.5h8.5a2.75 2.75 0 1 0-2.75-2.75M3 12.5h13.5a2.75 2.75 0 1 1-2.75 2.75M3 16.5h6.5"/></svg>',
 flask:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 3h5M10.5 3v5.2L5.4 17a3 3 0 0 0 2.7 4h7.8a3 3 0 0 0 2.7-4l-5.1-8.8V3z"/><path d="M7.5 14h9"/></svg>',
 spark:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/></svg>',
 voice:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/></svg>'};
function wm2Decay(key,n,a,b){
  const r=seeded('wm2_'+key);const out=[];
  for(let i=0;i<n;i++){
    const t=i/(n-1);
    let v=a+(b-a)*t+(r()-.5)*Math.abs(a-b)*.12;
    v=Math.max(Math.min(a,b),Math.min(Math.max(a,b),v));
    if(i&&a>b)v=Math.min(v,out[i-1]);
    if(i&&a<b)v=Math.max(v,out[i-1]);
    out.push(v);
  }
  return out;
}
function openWm2Ctl(d){
  if(d.on===undefined)d.on=true;
  if(d.lock===undefined)d.lock=false;
  if(!d.wm)d.wm={wake:true,air:false,airH:4,curve:'dirt'};
  const model='XQG100-HBD14376';
  let tab='洗涤';
  const durMin=t=>{if(t==='Auto')return 45;let m=0;const h=t.match(/(\d+)小时/),mm=t.match(/(\d+)分钟/);
    if(h)m+=+h[1]*60;if(mm)m+=+mm[1];return m||60;};
  const head=`<div class="wm2-head" style="padding-top:46px">
   <button class="wm2-ico" data-back>${svgBack}</button>
   <div class="wm2-head-t"><h1>洗衣机</h1><p>${model} · ${d.room}</p></div>
   <button class="wm2-ico" id="wm2Menu">${AC_MISC_SVG.dots}</button></div>`;
  const body=`
  <section class="wm2-hero"><div class="wm2-hero-in">
   <div style="min-width:0">
    <span class="wm2-badge" id="wm2Badge">待机</span>
    <div class="wm2-big"><b id="wm2Big">--:--</b></div>
    <p class="wm2-cap" id="wm2Cap">热泵洗烘一体 · 待命就绪</p>
    <div class="wm2-env">
     <div><p>已称重</p><b>3.2kg</b></div>
     <div><p>智能投放</p><b>32ml</b></div>
     <div><p>水温</p><b>30°C</b></div>
    </div>
   </div>
   <div class="wm2-hero-img"><img src="img/washer_new.png" alt="洗衣机"></div>
  </div></section>
  <section class="wm2-card">
   <div class="wm2-power-row">
    <div><b>开关</b><p id="wm2PwSt">${d.on?'设备已开机':'已关机'}</p></div>
    <button class="wm2-power-btn ${d.on?'':'off'}" id="wm2Power">${AC_MISC_SVG.power}</button>
   </div>
   <div class="wm2-lrow"><div><b>童锁</b><p>锁定面板与程序启动</p></div><span class="wm2-sw ${d.lock?'on':''}" id="wm2Lock"><i></i></span></div>
   <div class="wm2-lrow"><div><b>靠近唤醒</b><p>有人靠近自动亮屏 · 迎宾灯 · 推送</p></div><span class="wm2-sw ${d.wm.wake?'on':''}" id="wm2Wake"><i></i></span></div>
  </section>
  <div id="wm2RunWrap"></div>
  <section class="wm2-reco">
   <span class="wm2-reco-ic">AI</span>
   <div style="flex:1;min-width:0"><b>习惯预测 · 为你推荐</b><p>根据你的使用习惯、今晚多云 31°C 与作息规律，推荐「混合洗」，21:00 前完成晾晒</p></div>
   <button class="wm2-mini" id="wm2RecoGo">启动</button>
  </section>
  <div class="wm2-sec"><h2>洗护程序</h2><span class="sub" id="wm2All" style="cursor:pointer">共 24 个程序</span></div>
  <div class="wm2-tabs" id="wm2Tabs">${WP_TABS.map((t,i)=>`<button class="${i===0?'on':''}" data-t="${t[0]}">${t[0]}</button>`).join('')}</div>
  <div class="wm2-progs" id="wm2Progs"></div>
  <div class="wm2-sec"><h2>智能服务</h2></div>
  <div class="wm2-list">
   <div class="wm2-li" id="wm2Scale"><span class="wm2-li-ic">${WM2_IC.scale}</span><div style="flex:1;min-width:0"><b>AI称重</b><p>3.2kg · 已自动匹配投放与用水</p></div><span class="wm2-go">${svgArrow}</span></div>
   <div class="wm2-li" id="wm2Ward"><span class="wm2-li-ic">${WM2_IC.robe}</span><div style="flex:1;min-width:0"><b>智慧衣橱</b><p>拍洗标识别材质 · 5 件已同步</p></div><span class="wm2-go">${svgArrow}</span></div>
   <div class="wm2-li" id="wm2Air"><span class="wm2-li-ic">${WM2_IC.wind}</span><div style="flex:1;min-width:0"><b>新风托管</b><p id="wm2AirP">${d.wm.air?'已开启 · '+d.wm.airH+' 小时':'忘取衣自动换气防闷味'}</p></div><span class="wm2-go">${svgArrow}</span></div>
   <div class="wm2-li" id="wm2Det"><span class="wm2-li-ic">${WM2_IC.flask}</span><div style="flex:1;min-width:0"><b>洗涤剂识别</b><p>浓缩型 · 本次投放 32ml</p></div><span class="wm2-go">${svgArrow}</span></div>
   <div class="wm2-li" id="wm2Care"><span class="wm2-li-ic">${WM2_IC.spark}</span><div style="flex:1;min-width:0"><b>清洁与耗材</b><p>洗涤剂余量 45% · 筒清洁提醒</p></div><span class="wm2-go">${svgArrow}</span></div>
   <div class="wm2-li" id="wm2Voice"><span class="wm2-li-ic">${WM2_IC.voice}</span><div style="flex:1;min-width:0"><b>自然语音</b><p>语音大模型对话 · 支持空调中枢控制</p></div><span class="wm2-go">${svgArrow}</span></div>
  </div>
  <div class="wm2-sec"><h2>水电报告</h2><span class="sub" id="wm2Energy" style="cursor:pointer">详情 ›</span></div>
  <section class="wm2-card">
   <div class="wm2-kpis">
    <div class="wm2-kpi"><b>32.6度</b><span>本月用电</span></div>
    <div class="wm2-kpi"><b>3.2吨</b><span>本月用水</span></div>
    <div class="wm2-kpi"><b>6洗 2烘</b><span>本周洗护</span></div>
    <div class="wm2-kpi"><b>-12%</b><span>较上周</span></div>
   </div>
   <div class="wm2-card-t" style="margin-top:14px"><b>近 7 日用电</b><span>度 / 日</span></div>
   ${acnChart([{data:acnSeries('wmWk',7,.35,.9),c:'#0891b2',min:0,max:1,fill:'rgba(8,145,178,.08)'}],{h:110})}
  </section>
  <div class="wm2-sec"><h2>洗护记录</h2><span class="sub">近 7 天</span></div>
  <section class="wm2-card" style="padding-top:6px;padding-bottom:6px">
   ${acnRec('混','#cffafe','#0e7490','混合洗 · 已完成','用水 45L · 用电 0.62 度 · 58 分钟','昨天 21:30')}
   ${acnRec('智','#cffafe','#0e7490','AI智洗 · 已完成','称重 2.8kg · 智能投放 28ml','7月28日')}
   ${acnRec('烘','#cffafe','#0e7490','羽绒洗烘 · 已完成','穿透判干 · 用时 1小时52分','7月26日')}
  </section>
  <div style="height:8px"></div>`;
  const el=openPage(`<div class="wm2-wrap">${head}<div class="wm2-body">${body}</div></div>`);
  const syncHero=()=>{
    const w=S.washer,active=w.mode&&w.left>0;
    const b=el.querySelector('#wm2Badge');
    if(active){
      b.textContent=w.running?'运行中':'已暂停';b.className='wm2-badge'+(w.running?'':' pause');
      el.querySelector('#wm2Big').textContent=fmt(w.left);
      el.querySelector('#wm2Cap').textContent=w.mode+' · '+d.room;
    }else{
      b.textContent=d.on?'待机':'已关机';b.className='wm2-badge'+(d.on?'':'off');
      el.querySelector('#wm2Big').textContent='--:--';
      el.querySelector('#wm2Cap').textContent=d.on?'热泵洗烘一体 · 待命就绪':'已关机 · 点击开关开机';
    }
  };
  const progT=()=>{const w=S.washer;return Math.max(0,Math.min(1,w.total?1-w.left/w.total:.45));};
  const curNTU=()=>(12+(2.8-12)*progT()).toFixed(1);
  const curDry=()=>Math.round(78+(12-78)*progT());
  const curveChartHTML=()=>d.wm.curve==='dirt'
    ?acnChart([{data:wm2Decay('dirt',28,12,2.6),c:'#0891b2',min:0,max:14,fill:'rgba(8,145,178,.08)'}],{h:130})
    :acnChart([{data:wm2Decay('dry',28,78,12),c:'#7c3aed',min:0,max:90,fill:'rgba(124,58,237,.07)'}],{h:130});
  const renderRun=()=>{
    const w=S.washer,active=w.mode&&w.left>0;
    el.querySelector('[id="wm2RunWrap"]').innerHTML=`
    <section class="wm2-card">
     <div class="wm2-card-t"><b>${active?w.mode:'洗涤过程曲线'}</b><span>${active?(w.running?'运行中 · 预计 '+fmt(w.left)+' 后完成':'已暂停'):'上次程序回顾 · 混合洗'}</span></div>
     ${active?`<div class="wm2-run-row"><div class="wm2-run-t"><b>${fmt(w.left)}</b><span>剩余时间</span></div><button class="wm2-mini" id="wm2Pause">${w.running?'暂停':'继续'}</button></div>`:''}
     <div class="wm2-seg" id="wm2CurveSeg">
      <button class="${d.wm.curve==='dirt'?'on':''}" data-cv="dirt">脏污度曲线</button>
      <button class="${d.wm.curve==='dry'?'on':''}" data-cv="dry">衣服湿度曲线</button>
     </div>
     <div class="wm2-curve-live" id="wm2CurveLive"></div>
     <div id="wm2CurveBox">${curveChartHTML()}</div>
     <div class="wm2-note">${ACN_INFO}<span id="wm2CurveNote"></span></div>
    </section>`;
    const box=el.querySelector('[id="wm2RunWrap"]');
    const syncTxt=()=>{
      const dirt=d.wm.curve==='dirt';
      box.querySelector('#wm2CurveLive').innerHTML=dirt
        ?`<span><i style="background:#0891b2"></i>当前 <b>${curNTU()} NTU</b></span><span>目标 ≤ 3 NTU · 不净自动加漂</span>`
        :`<span><i style="background:#7c3aed"></i>当前 <b>${curDry()}%</b></span><span>衣干即停 · 判干 ≤ 12%</span>`;
      box.querySelector('#wm2CurveNote').textContent=dirt
        ?'浊度传感器实时反馈脏污与残留：循环泵预混洗涤剂并循环喷淋提升洗净，漂洗不净将自动增加漂洗次数。'
        :'穿透式判干穿透衣物表面识别内部湿度，程序根据判干情况衣干即停，避免过度烘干。';
    };
    syncTxt();
    box.querySelectorAll('#wm2CurveSeg button').forEach(x=>x.onclick=()=>{d.wm.curve=x.dataset.cv;
      box.querySelectorAll('#wm2CurveSeg button').forEach(b=>b.classList.toggle('on',b===x));
      box.querySelector('#wm2CurveBox').innerHTML=curveChartHTML();syncTxt();});
    const p=box.querySelector('#wm2Pause');
    if(p)p.onclick=()=>{w.running=!w.running;renderRun();syncHero();toast(w.running?'继续运行':'已暂停');};
  };
  const startProg=p=>{
    if(!d.on)return toast('请先开机');
    if(d.lock)return toast('童锁已开启，请先解锁');
    const nm=p.split('|'),sec=durMin(nm[1])*60;
    S.washer={mode:nm[0],left:sec,total:sec,running:true};
    renderRun();syncHero();toast('已启动「'+nm[0]+'」程序');
    el.querySelector('.wm2-body').scrollTop=0;
  };
  const renderGrid=()=>{
    const progs=WP_TABS.find(t=>t[0]===tab)[1];
    el.querySelector('#wm2Progs').innerHTML=progs.map(pr=>`<button class="wm2-prog" data-p="${pr[0]}|${pr[1]}">
     <img src="img/${pr[2]}.png"><b>${pr[0]}</b><span>${pr[1]}</span></button>`).join('');
    el.querySelectorAll('#wm2Progs [data-p]').forEach(c=>c.onclick=()=>startProg(c.dataset.p));
  };
  el.querySelectorAll('#wm2Tabs button').forEach(b=>b.onclick=()=>{tab=b.dataset.t;
    el.querySelectorAll('#wm2Tabs button').forEach(x=>x.classList.toggle('on',x===b));renderGrid();});
  dragScroll(el.querySelector('#wm2Tabs'));
  el.querySelector('#wm2All').onclick=()=>toast('共 24 个洗护程序，已全部按类展示');
  el.querySelector('#wm2RecoGo').onclick=()=>startProg('混合|58分钟');
  el.querySelector('#wm2Power').onclick=()=>{d.on=!d.on;
    el.querySelector('#wm2Power').classList.toggle('off',!d.on);
    el.querySelector('#wm2PwSt').textContent=d.on?'设备已开机':'已关机';
    syncHero();toast('洗衣机'+(d.on?' 已开机':' 已关机'));};
  const swL=el.querySelector('#wm2Lock');
  swL.onclick=()=>{swL.classList.toggle('on');d.lock=swL.classList.contains('on');toast('童锁'+(d.lock?' 已开启':' 已关闭'));};
  const swW=el.querySelector('#wm2Wake');
  swW.onclick=()=>{swW.classList.toggle('on');d.wm.wake=swW.classList.contains('on');
    toast('靠近唤醒'+(d.wm.wake?' 已开启：靠近自动亮屏并推送':' 已关闭'));};
  el.querySelector('#wm2Scale').onclick=()=>openModal(`<div class="ac-sheet-t">AI称重</div>
   <p style="font-size:12.5px;color:#5f7285;line-height:1.8;padding:0 4px 6px">机器学习模型提升干衣物称重精度，称重结果自动调整洗涤剂投放量、用水量与漂洗次数。</p>
   <div class="ac-opt"><span><b>本次称重</b></span><b style="margin-left:auto;color:#0891b2">3.2 kg</b></div>
   <div class="ac-opt"><span>洗涤剂投放量</span><b style="margin-left:auto">40ml → <i style="color:#0891b2;font-style:normal">32ml</i></b></div>
   <div class="ac-opt"><span>用水量</span><b style="margin-left:auto">52L → <i style="color:#0891b2;font-style:normal">45L</i></b></div>
   <div class="ac-opt"><span>漂洗次数</span><b style="margin-left:auto">3 次 → <i style="color:#0891b2;font-style:normal">2 次</i></b></div>`);
  el.querySelector('#wm2Ward').onclick=()=>openWmWardrobe(d);
  el.querySelector('#wm2Det').onclick=()=>openWmDetergent(d);
  el.querySelector('#wm2Care').onclick=()=>openWmCare(d);
  el.querySelector('#wm2Voice').onclick=()=>openModal(`<div class="ac-sheet-t">自然语音</div>
   <p style="font-size:12.5px;color:#5f7285;line-height:1.8;padding:0 4px 6px">AI 语音大模型支持自然对话，减少按键操作。可对小格说「开始洗衣」「还剩多久」，也可通过客厅空调中枢语音控制洗衣机。</p>
   <div class="ac-opt" data-close><span style="margin:auto;color:#0891b2">知道了</span></div>`);
  const syncAirP=()=>{el.querySelector('#wm2AirP').textContent=d.wm.air?'已开启 · '+d.wm.airH+' 小时':'忘取衣自动换气防闷味';};
  el.querySelector('#wm2Air').onclick=()=>{
    const m=openModal(`<div class="ac-sheet-t">新风托管</div>
     <p style="font-size:12.5px;color:#5f7285;line-height:1.8;padding:0 4px 6px">程序结束后若衣物久未取走，自动开启新风换气防闷味，到时自动停止。</p>
     <div class="ac-opt"><span><b>开启新风托管</b></span><span class="switch ${d.wm.air?'on':''}" id="airSw" style="margin-left:auto"></span></div>
     ${[2,4,6,8,10,12].map(h=>`<div class="ac-opt ${d.wm.airH===h?'on':''}" data-h="${h}"><span>${h} 小时</span><span class="ok">✓</span></div>`).join('')}`);
    const sw=m.querySelector('#airSw');
    sw.onclick=()=>{sw.classList.toggle('on');d.wm.air=sw.classList.contains('on');syncAirP();toast('新风托管'+(d.wm.air?' 已开启':' 已关闭'));};
    m.querySelectorAll('[data-h]').forEach(r=>r.onclick=()=>{d.wm.airH=+r.dataset.h;d.wm.air=true;syncAirP();closeModal(m);toast('新风托管已设为 '+d.wm.airH+' 小时');});};
  el.querySelector('#wm2Energy').onclick=()=>openEnergyPage();
  el.querySelector('#wm2Menu').onclick=()=>{
    const items=[['设备信息',model+' 热泵洗烘一体 · 已接入格力+'],['分享设备','与家人共享设备控制权'],['固件升级','当前 v3.0.2 已是最新版本'],['常见问题','查看洗衣机使用帮助与故障排查']];
    const m=openModal(`<div class="ac-sheet-t">更多</div>${items.map((it,i)=>
      `<div class="ac-opt" data-mi="${i}"><span><b>${it[0]}</b><p>${it[1]}</p></span></div>`).join('')}`);
    m.querySelectorAll('[data-mi]').forEach(r=>r.onclick=()=>{closeModal(m);toast(items[+r.dataset.mi][0]+'（演示）');});};
  const iv=setInterval(()=>{if(!el.isConnected)return clearInterval(iv);
    const w=S.washer;if(w.mode&&w.left>0&&w.running)syncHero();},1000);
  renderRun();renderGrid();syncHero();
}
function openWmWardrobe(d){
  const clothes=[
   ['纯棉T恤','100% 棉','日常','#fde68a','#b45309'],
   ['羊毛衫','80% 羊毛 · 20% 锦纶','高端护理','#ddd6fe','#6d28d9'],
   ['牛仔裤','100% 棉 · 牛津布','日常','#bfdbfe','#1d4ed8'],
   ['丝绸衬衫','100% 桑蚕丝','高端护理','#fbcfe8','#be185d'],
   ['羽绒服','90% 白鹅绒','大物','#a7f3d0','#047857']];
  const head=`<div class="wm2-head" style="padding-top:46px">
   <button class="wm2-ico" data-back>${svgBack}</button>
   <div class="wm2-head-t"><h1>智慧衣橱</h1><p>拍洗标 · 识别材质 · 匹配参数</p></div>
   <span style="width:36px;flex:0 0 auto"></span></div>`;
  const el=openPage(`<div class="wm2-wrap">${head}<div class="wm2-body">
  <section class="wm2-hero"><div class="wm2-hero-in" style="display:flex;align-items:center;gap:14px;grid-template-columns:none">
   <div style="flex:1;min-width:0">
    <b style="font-size:16px;color:#164e63">拍洗标 / 平铺衣物</b>
    <p style="font-size:11px;color:#0e7490;margin-top:6px;line-height:1.6">AI 识别衣物材质与类别，自动匹配洗涤参数</p>
    <button class="wm2-mini" id="wdShoot" style="margin-top:12px">立即拍摄</button>
   </div>
   <span class="wm2-big-ic">${WM2_IC.robe}</span>
  </div></section>
  <div class="wm2-sec"><h2>已识别衣物</h2><span class="sub">5 件 · 已同步整机</span></div>
  <div class="wm2-list">
   ${clothes.map(c=>`<div class="wm2-li"><span class="wm2-li-ic" style="background:${c[3]};color:${c[4]}">${WM2_IC.robe}</span><div style="flex:1;min-width:0"><b>${c[0]}</b><p>${c[1]}</p></div><span class="wm2-tag" style="background:${c[3]};color:${c[4]}">${c[2]}</span></div>`).join('')}
  </div>
  <div class="wm2-sec"><h2>AI 匹配洗涤参数</h2><span class="sub">基于 3 件待洗衣物</span></div>
  <section class="wm2-card">
   <div class="wm2-kpis" style="grid-template-columns:repeat(3,1fr)">
    <div class="wm2-kpi"><b>30°C</b><span>水温</span></div>
    <div class="wm2-kpi"><b>600rpm</b><span>转速</span></div>
    <div class="wm2-kpi"><b>42分</b><span>时长</span></div>
   </div>
   <div class="wm2-tips"><p>不可漂白 · 不可烘干</p><p>中性洗涤剂 · 低速脱水</p><p>已同步整机端 · 3 件衣物待洗</p></div>
  </section>
  <div class="wm2-sec"><h2>衣物分类统计</h2></div>
  <section class="wm2-card">
   ${[['日常',2,'#0891b2'],['高端护理',2,'#7c3aed'],['大物',1,'#f59e0b']].map(s=>`<div class="wm2-src"><span>${s[0]}</span><div class="bar"><i style="width:${s[1]/2*100}%;background:${s[2]}"></i></div><b>${s[1]} 件</b></div>`).join('')}
  </section>
  <div style="height:8px"></div></div></div>`);
  el.querySelector('#wdShoot').onclick=()=>toast('请对准衣物洗标或平铺拍摄（演示）');
}
function openWmDetergent(d){
  if(!d.wm)d.wm={wake:true,air:false,airH:4,curve:'dirt'};
  if(!d.wm.detScan)d.wm.detScan='bar';
  const head=`<div class="wm2-head" style="padding-top:46px">
   <button class="wm2-ico" data-back>${svgBack}</button>
   <div class="wm2-head-t"><h1>洗涤剂识别</h1><p>扫条形码 · 拍瓶身文字</p></div>
   <span style="width:36px;flex:0 0 auto"></span></div>`;
  const el=openPage(`<div class="wm2-wrap">${head}<div class="wm2-body">
  <div class="wm2-seg" id="detSeg">
   <button class="${d.wm.detScan==='bar'?'on':''}" data-ds="bar">扫条形码</button>
   <button class="${d.wm.detScan==='txt'?'on':''}" data-ds="txt">拍瓶身文字</button>
  </div>
  <div class="wm2-scan">
   <i class="cn tl"></i><i class="cn tr"></i><i class="cn bl"></i><i class="cn br"></i>
   <span class="wm2-scan-ic">${WM2_IC.flask}</span>
   <b>立白天然皂液</b><p id="detScanTip">将条形码对准框内</p>
  </div>
  <button class="wm2-wide-btn" id="detRescan">重新扫描</button>
  <div class="wm2-sec"><h2>识别结果</h2></div>
  <section class="wm2-card">
   <div class="wm2-det-h"><span class="wm2-li-ic">${WM2_IC.flask}</span><div style="flex:1;min-width:0"><b>立白天然皂液</b><p>液体 · 1.5L</p></div><span class="wm2-tag" style="background:#dcfce7;color:#16a34a">浓缩型</span></div>
   <div class="wm2-drow"><span>活性物含量</span><div class="bar"><i style="width:30%"></i></div><b>30%</b></div>
   <div class="wm2-drow"><span>最佳使用量</span><b>30ml / 3kg</b></div>
   <div class="wm2-drow"><span>本次投放</span><b style="color:#0891b2">32 ml</b></div>
   <div class="wm2-drow"><span>识别方式</span><b>条形码</b></div>
  </section>
  <section class="wm2-adjust">
   <b>智能投放已调整</b><p>程序根据洗涤剂类型自动调整投放量</p>
   <div class="wm2-kpis" style="grid-template-columns:repeat(3,1fr);margin-top:10px">
    <div class="wm2-kpi alt"><b>40ml</b><span>原投放</span></div>
    <div class="wm2-kpi alt"><b>32ml</b><span>现投放</span></div>
    <div class="wm2-kpi alt"><b>20%</b><span>节省</span></div>
   </div>
  </section>
  <section class="wm2-card">
   <div class="wm2-card-t"><b>浓缩型 vs 非浓缩型</b></div>
   <div class="wm2-vsrow"><b>浓缩型</b><p>活性物 ≥ 25%（本品 30%），每次仅需 1/3 瓶盖用量，低量强去污</p></div>
   <div class="wm2-vsrow"><b>非浓缩型</b><p>活性物 15% 左右，需按标准瓶盖用量使用</p></div>
  </section>
  <div class="wm2-sec"><h2>历史识别记录</h2><span class="sub">共 3 款</span></div>
  <div class="wm2-list">
   <div class="wm2-li"><span class="wm2-li-ic">${WM2_IC.flask}</span><div style="flex:1;min-width:0"><b>立白天然皂液</b><p>活性物 30% · 液体</p></div><span class="wm2-tag" style="background:#dcfce7;color:#16a34a">浓缩型</span></div>
   <div class="wm2-li"><span class="wm2-li-ic" style="background:#eff6ff;color:#1d4ed8">${WM2_IC.flask}</span><div style="flex:1;min-width:0"><b>蓝月亮深层洁净</b><p>活性物 15% · 液体</p></div><span class="wm2-tag" style="background:#eff6ff;color:#1d4ed8">非浓缩型</span></div>
  </div>
  <div style="height:8px"></div></div></div>`);
  el.querySelectorAll('#detSeg button').forEach(b=>b.onclick=()=>{d.wm.detScan=b.dataset.ds;
    el.querySelectorAll('#detSeg button').forEach(x=>x.classList.toggle('on',x===b));
    el.querySelector('#detScanTip').textContent=b.dataset.ds==='bar'?'将条形码对准框内':'对准瓶身文字区域拍摄';});
  el.querySelector('#detRescan').onclick=()=>toast('识别成功：立白天然皂液 · 浓缩型（演示）');
}
function openWmCare(d){
  const cons=[
   ['洗涤剂','45','ml','/ 800ml','自动投放 · 浓缩型',45,'#0891b2','flask'],
   ['银离子盒','78','%','','除菌抑菌 · 长效保护',78,'#7c3aed','spark'],
   ['柔顺剂','22','ml','/ 500ml','低余量提醒',22,'#f59e0b','flask']];
  const head=`<div class="wm2-head" style="padding-top:46px">
   <button class="wm2-ico" data-back>${svgBack}</button>
   <div class="wm2-head-t"><h1>清洁与耗材</h1><p>耗材余量 · 自身养护</p></div>
   <span style="width:36px;flex:0 0 auto"></span></div>`;
  const el=openPage(`<div class="wm2-wrap">${head}<div class="wm2-body">
  <div class="wm2-sec" style="margin-top:4px"><h2>耗材余量</h2></div>
  ${cons.map(c=>`<section class="wm2-card">
   <div class="wm2-care-row">
    <span class="wm2-li-ic" style="color:${c[6]}">${WM2_IC[c[7]]}</span>
    <div><b>${c[0]}</b><p>${c[4]}</p></div>
    <div class="wm2-cons-v"><b style="color:${c[6]}">${c[1]}<small style="font-size:11px;font-weight:500">${c[2]}</small></b><span>${c[3]||'&nbsp;'}</span></div>
   </div>
   <div class="wm2-bar"><i style="width:${c[5]}%;background:${c[6]}"></i></div>
   <button class="wm2-buy" style="background:linear-gradient(135deg,${c[6]},${c[6]}cc)" data-buy="${c[0]}">前往商城补货 →</button>
  </section>`).join('')}
  <div class="wm2-sec"><h2>自身养护</h2></div>
  <section class="wm2-card">
   <div class="wm2-care-row">
    <span class="wm2-li-ic" style="color:#e54545;background:#fee2e2">${WM2_IC.spark}</span>
    <div><b>环保筒清洁</b><p>60-70°C 高温除菌 · 建议每月 1 次</p></div>
    <button class="wm2-care-btn" id="careClean" style="background:linear-gradient(135deg,#f87171,#dc2626)">立即清洁</button>
   </div>
   <div class="wm2-sub-note">上次清洁 32 天前，建议尽快执行</div>
  </section>
  <section class="wm2-card">
   <div class="wm2-care-row">
    <span class="wm2-li-ic">${WM2_IC.wind}</span>
    <div><b>滤网清洁</b><p>过滤纤维毛发 · 建议每周 1 次</p></div>
    <button class="wm2-care-btn" id="careFilter" style="background:linear-gradient(135deg,#22d3ee,#0891b2)">查看教程</button>
   </div>
   <div class="wm2-sub-note" style="color:#16a34a">上次清洁 5 天前，状态良好</div>
  </section>
  <section class="wm2-card">
   <div class="wm2-care-row">
    <span class="wm2-li-ic" style="color:#16a34a;background:#dcfce7">${WM2_IC.scale}</span>
    <div><b>智能自检</b><p>整机健康检查 · 电机 / 水路 / 传感</p></div>
    <button class="wm2-care-btn" id="careDiag" style="background:linear-gradient(135deg,#4ade80,#16a34a)">开始检测</button>
   </div>
   <div class="wm2-kpis" style="grid-template-columns:repeat(3,1fr);margin-top:12px">
    <div class="wm2-kpi alt"><b>正常</b><span>电机</span></div>
    <div class="wm2-kpi alt"><b>正常</b><span>水路</span></div>
    <div class="wm2-kpi alt"><b>正常</b><span>传感</span></div>
   </div>
  </section>
  <div style="height:8px"></div></div></div>`);
  el.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>{openWebView(MALL[3].url,'董明珠店');toast('已为你跳转「'+b.dataset.buy+'」补货专区');});
  el.querySelector('#careClean').onclick=()=>{S.washer={mode:'筒自洁',left:60*60,total:60*60,running:true};toast('筒自洁程序已启动 · 约 60 分钟');};
  el.querySelector('#careFilter').onclick=()=>openModal(`<div class="ac-sheet-t">滤网清洁教程</div>
   <div class="ac-opt"><span><b>第一步</b><p>断电后打开右下角滤网盖，逆时针旋出滤网。</p></span></div>
   <div class="ac-opt"><span><b>第二步</b><p>清水冲洗滤网上的纤维毛发，软毛刷轻刷。</p></span></div>
   <div class="ac-opt"><span><b>第三步</b><p>擦干后顺时针装回，关闭滤网盖即可。</p></span></div>
   <div class="ac-opt" data-close><span style="margin:auto;color:#0891b2">知道了</span></div>`);
  el.querySelector('#careDiag').onclick=()=>toast('自检完成：电机 / 水路 / 传感器均正常');
}

/* ================= 厨房安全 ================= */
const KS_SHIELD='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round"><path d="M12 3l7 2.6v5.2c0 4.4-2.9 7.9-7 9.2-4.1-1.3-7-4.8-7-9.2V5.6z"/><path d="M8.8 11.8l2.2 2.2 4.2-4.4"/></svg>';
const KSAFE=[
 {k:'leak',n:'漏水监测',st:'无漏水',ok:1,sub:'厨房地面干燥，水浸传感器工作正常'},
 {k:'gas',n:'漏气监测',st:'无漏气',ok:1,sub:'燃气浓度 0 ppm，阀门密封良好'},
 {k:'dry',n:'燃气灶干烧',st:'无干烧',ok:1,sub:'灶具温度正常，无空烧风险'},
 {k:'fire',n:'火开无人',st:'无',ok:1,sub:'当前家中有人，灶具处于关闭状态'}];
const KS_IC={
 leak:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#0d5c34" stroke-width="1.8" stroke-linecap="round"><path d="M12 3.5s5.5 6 5.5 10a5.5 5.5 0 0 1-11 0c0-4 5.5-10 5.5-10z"/></svg>',
 gas:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#0d5c34" stroke-width="1.8" stroke-linecap="round"><path d="M12 3c1 3 4.5 5.5 4.5 9a4.5 4.5 0 0 1-9 0c0-1.8.8-3.1 1.8-4.5.4 1 1 1.7 1.7 2C10.6 7 11 5 12 3z"/></svg>',
 dry:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#0d5c34" stroke-width="1.8" stroke-linecap="round"><rect x="3.5" y="6" width="17" height="12" rx="2.5"/><circle cx="9" cy="12" r="2.6"/><circle cx="16" cy="12" r="1.6"/><path d="M7 3.5h4"/></svg>',
 fire:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#0d5c34" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="7.5" r="3"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/></svg>'};
function openKitchenSafety(){
  const logs=[
   {c:'#e54545',h:'燃气灶点火',p:'左灶点火成功，开始烹饪晚餐。',t:'今天 19:02'},
   {c:'#34a853',h:'燃气灶关火',p:'左灶关闭，本次燃烧 22 分钟。',t:'今天 19:24'},
   {c:'#34a853',h:'燃气自检通过',p:'燃气浓度 0 ppm，无泄漏风险。',t:'今天 12:15'},
   {c:'#4a90e2',h:'漏水自检通过',p:'厨房水浸传感器干燥，水压正常。',t:'今天 08:30'},
   {c:'#f29900',h:'干烧预警（已处理）',p:'右灶空烧 90 秒，已语音提醒并推送消息，家人及时关火。',t:'昨天 20:12'},
   {c:'#34a853',h:'燃气灶关火',p:'右灶关闭，干烧风险解除。',t:'昨天 20:14'},
   {c:'#4a90e2',h:'漏水自检通过',p:'厨房水浸传感器干燥。',t:'昨天 13:05'},
   {c:'#e54545',h:'人离火开提醒（已处理）',p:'检测到已离家但燃气灶未关，已远程一键关火。',t:'7月20日 21:30'},
   {c:'#34a853',h:'远程关火成功',p:'燃气阀门已远程关闭，厨房恢复安全。',t:'7月20日 21:31'}];
  const dryBars=Array.from({length:30},(_,i)=>{const v=i===21?1:0;const h=v?52:3;const step=324/30,x=8+i*step+(step-7)/2;
    return `<rect x="${x.toFixed(1)}" y="${106-h}" width="7" height="${h}" rx="3" fill="${v?'#f29900':'#e8eaee'}"/>`}).join('');
  const dryChart=`<svg viewBox="0 0 340 116" class="chart-box">${dryBars}
   <text x="332" y="12" font-size="8.5" fill="#f29900" text-anchor="end" font-weight="700">近 30 天共 1 次 · 已成功拦截</text>
   <text x="8" y="114" font-size="7.5" fill="#c3c8cf">1日</text><text x="332" y="114" font-size="7.5" fill="#c3c8cf" text-anchor="end">30日</text></svg>`;
  const lkPts=(()=>{const r=seeded('leak30');return Array.from({length:30},(_,i)=>{const v=98.4+r()*1.6;const x=8+i*(324/29);const y=106-(v-96)/4*88;return [x,y,v]})})();
  const lkLine=lkPts.map((q,i)=>(i?'L':'M')+q[0].toFixed(1)+' '+q[1].toFixed(1)).join(' ');
  const lkArea=lkLine+` L${lkPts[29][0].toFixed(1)} 106 L8 106 Z`;
  const lkAvg=(lkPts.reduce((a,q)=>a+q[2],0)/30).toFixed(1);
  const leakChart=`<svg viewBox="0 0 340 116" class="chart-box">
   <defs><linearGradient id="lkg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#34a853" stop-opacity=".25"/><stop offset="1" stop-color="#34a853" stop-opacity=".02"/></linearGradient></defs>
   <path d="${lkArea}" fill="url(#lkg)"/><path d="${lkLine}" fill="none" stroke="#34a853" stroke-width="2" stroke-linecap="round"/>
   <text x="332" y="12" font-size="8.5" fill="#0d5c34" text-anchor="end" font-weight="700">平均通过率 ${lkAvg}%</text>
   <text x="8" y="114" font-size="7.5" fill="#c3c8cf">1日</text><text x="332" y="114" font-size="7.5" fill="#c3c8cf" text-anchor="end">30日</text></svg>`;
  openPage(`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button><h1>厨房安全</h1><span class="pg-extra ks-gasoff" id="ksGasOff">紧急关阀</span></div>
   <div class="page-scroll" style="padding:0 0 24px">
    ${aiSvcBannerHTML('厨房安全','12px 14px 0')}
    <div class="ctl-card">
     <div class="ks-hero">
      <div class="ks-ring"><b>安全</b><span>综合评分 92 分</span></div>
      <p style="font-size:11.5px;color:var(--ink2);margin-top:12px;line-height:1.6">漏水、漏气、干烧、人离火开四项监测全部正常<br>厨房当前处于安全状态</p>
     </div>
     <div style="display:flex;justify-content:center;gap:8px;margin-top:12px">
      <span class="slp-lv" style="color:#0d5c34;background:#b9f2cf">安全</span>
      <span class="slp-lv" style="color:#9aa0a6;background:#f1f3f6">有隐患</span>
      <span class="slp-lv" style="color:#9aa0a6;background:#f1f3f6">危险</span>
     </div>
    </div>
    <div class="report-entry">
     <button class="re" id="ksRepW" style="background:linear-gradient(135deg,#0f4c9c,#1a73e8)">
      <svg style="position:absolute;right:-14px;top:-16px;z-index:1;opacity:.22" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round"><path d="M12 3l7 2.6v5.2c0 4.4-2.9 7.9-7 9.2-4.1-1.3-7-4.8-7-9.2V5.6z"/><path d="M8.8 11.8l2.2 2.2 4.2-4.4"/></svg>
      <span class="re-t"><b>安全周报</b><small>07.22 — 07.28 · 评分 96 ›</small></span></button>
     <button class="re" id="ksRepM" style="background:linear-gradient(135deg,#14351f,#1e7a52)">
      <svg style="position:absolute;right:-14px;top:-16px;z-index:1;opacity:.22" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round"><rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 9.5h17M8 3v3.5M16 3v3.5M8 13h3M13 13h3M8 16.5h5"/></svg>
      <span class="re-t"><b>安全月报</b><small>2026 年 7 月 · 评分 94 ›</small></span></button>
    </div>
    <div class="ctl-card"><h3>实时监测</h3>
     ${KSAFE.map(k=>`<div class="ks-row"><span class="kic">${KS_IC[k.k]}</span><div><h5>${k.n}</h5><p>${k.sub}</p></div><span class="kb" style="color:#0d5c34;background:#b9f2cf">${k.st}</span></div>`).join('')}
    </div>
    <div class="ks-sec-h">安全趋势<span>近 30 天</span></div>
    <div class="chart-card"><div class="cc-h"><h4>燃气日均点火时长</h4><span style="margin-left:auto;font-size:10px;color:var(--ink3)">小时 / 日</span></div>
     ${lineChart('eng_gasd','月',' h','#e54545')}</div>
    <div class="chart-card"><div class="cc-h"><h4>干烧预警次数</h4><span style="margin-left:auto;font-size:10px;color:#0d5c34">29 天为 0</span></div>
     ${dryChart}</div>
    <div class="chart-card"><div class="cc-h"><h4>漏水自检通过率</h4><span style="margin-left:auto;font-size:10px;color:#0d5c34">持续达标</span></div>
     ${leakChart}</div>
    <div class="ctl-card"><h3>AI 主动建议</h3>
     <div class="ks-row" data-ksadv="dry" style="cursor:pointer"><span class="kic" style="background:#fdf3e3">${KS_IC.dry}</span><div><h5>开启「灶具离人自动断气」</h5><p>右灶本周 2 次干烧，建议离人 3 分钟自动关阀</p></div><span class="kb" style="color:#8a5200;background:#ffe3b3">去开启</span></div>
     <div class="ks-row" data-ksadv="seal" style="cursor:pointer"><span class="kic" style="background:#e8f1ff"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" stroke-width="1.8" stroke-linecap="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 5.4-5.4L15 12l-3-3z"/></svg></span><div><h5>更换燃气阀密封圈</h5><p>燃气阀已使用 18 个月，董明珠店可购原厂配件</p></div><span class="kb" style="color:#1a73e8;background:#e8f1ff">去购买</span></div>
     <div class="ks-row" data-ksadv="leak" style="cursor:pointer"><span class="kic" style="background:#e8f6fb">${KS_IC.leak}</span><div><h5>水浸传感器每月自检</h5><p>梅雨季厨房湿度偏高，建议保持每月自检一次</p></div><span class="kb" style="color:#0090b0;background:#e8f6fb">设提醒</span></div>
    </div>
    <div class="lv-log"><h3>安全记录 · 由新到旧</h3>
     ${logs.map(l=>`<div class="lv-item"><span class="lv-dot" style="background:${l.c}"></span><div><h5>${l.h}</h5><p>${l.p}</p></div><time>${l.t}</time></div>`).join('')}
    </div>
   </div>`,el=>{
    const gb=el.querySelector('#ksGasOff');
    gb.onclick=()=>{if(gb.classList.contains('done'))return;
      gb.classList.add('done');gb.textContent='已关阀 ✓';
      toast('已远程关阀，燃气阀门已关闭');};
    el.querySelector('#ksRepW').onclick=()=>openKsReport('周');
    el.querySelector('#ksRepM').onclick=()=>openKsReport('月');
    el.querySelector('[data-ksadv="dry"]').onclick=()=>openAISvcDetail('dryburn');
    el.querySelector('[data-ksadv="seal"]').onclick=()=>{openWebView('https://fmall.gree.com/','董明珠店');toast('已为你跳转原厂配件专区');};
    el.querySelector('[data-ksadv="leak"]').onclick=()=>toast('已设置每月 1 日水浸自检提醒');
   });
}
/* ================= 厨房安全周报 / 月报 ================= */
function openKsReport(type){
  const isW=type==='周';
  const D={
    tag:isW?'WEEKLY KITCHEN SAFETY REPORT':'MONTHLY KITCHEN SAFETY REPORT',
    title:isW?'本周 · 厨房安全周报':'2026 年 7 月 · 厨房安全月报',
    range:(isW?'统计周期 2026.07.22 — 07.28':'统计周期 2026.06.28 — 07.27')+' · 燃气 / 水浸 / 干烧 / 离人 四项监测',
    score:isW?96:94,
    hook:isW?'本周 AI 替你拦下 <b style="color:var(--acc)">1</b> 次干烧风险<br>厨房连续安全 7 天':'本月 AI 替你拦下 <b style="color:var(--acc)">1</b> 次干烧风险<br>厨房连续安全 26 天',
    acc:'#7ee2a8',acc2:'#7ec3ff',accbd:'rgba(126,226,168,.45)',chipc:'#d8ffe9',chipbg:'rgba(126,226,168,.13)',chipbd:'rgba(126,226,168,.3)',
    heroBg:'background:linear-gradient(165deg,#14351f 0%,#0b1230 78%)',
    chips:['# 燃气安全','# 防干烧','# 防水浸','# 人离火关'],
    tiles:isW?[['7',' 次','燃气自检','全通过','#0d5c34','#b9f2cf'],['1',' 次','干烧 AI 拦截','已处理','#0d5c34','#b9f2cf'],['168',' 小时','累计安全时长','满勤','#0d5c34','#b9f2cf'],['0',' 起','安全隐患','无','#0d5c34','#b9f2cf']]
             :[['30',' 次','燃气自检','全通过','#0d5c34','#b9f2cf'],['1',' 次','干烧 AI 拦截','已处理','#0d5c34','#b9f2cf'],['26',' 天','连续安全','纪录保持','#0d5c34','#b9f2cf'],['0',' 起','安全隐患','无','#0d5c34','#b9f2cf']],
    best:[['🛡️','最及时拦截','右灶空烧 90 秒 · 语音提醒家人关火','A+'],['🔥','最常使用',(isW?'左灶 · 本周点火 12 次':'左灶 · 本月点火 46 次'),'日常'],['💧','水浸自检',(isW?'7 次全部通过':'28 次全部通过'),'优']],
    tips:['检测到右灶'+(isW?'本周':'本月')+' 2 次干烧，建议开启「灶具离人自动断气」，离人 3 分钟自动关阀。','燃气阀已使用 18 个月，密封圈建议更换，董明珠店可购原厂配件。','梅雨季厨房湿度偏高，水浸传感器建议每月自检一次，保持灵敏度。'],
    foot:'格力厨房安全管家 · 报告生成于 2026-07-28<br>数据来自燃气、水浸、温度与人体传感器，仅供参考'
  };
  const ring=(()=>{const r=52,c=2*Math.PI*r;return `<svg width="120" height="120" style="transform:rotate(-90deg)"><defs><linearGradient id="pgr2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${D.acc}"/><stop offset="1" stop-color="${D.acc2}"/></linearGradient></defs><circle cx="60" cy="60" r="${r}" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="8"/><circle cx="60" cy="60" r="${r}" fill="none" stroke="url(#pgr2)" stroke-width="8" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-D.score/100)}"/></svg>`})();
  openPage(`<div class="pg-head" style="background:#0b1230"><button class="pg-back" data-back style="color:#fff">${svgBack}</button><h1 style="color:#fff">厨房安全报告</h1></div>
   <div class="tab-strip" style="background:#0b1230;padding-top:0"><button class="chip ${isW?'on':''}" id="rpW2">周报</button><button class="chip ${isW?'':'on'}" id="rpM2">月报</button></div>
   <div class="poster" style="--acc:${D.acc};--acc2:${D.acc2};--accbd:${D.accbd};--chipc:${D.chipc};--chipbg:${D.chipbg};--chipbd:${D.chipbd}">
    <div class="p-hero" style="${D.heroBg}">
      <span class="p-tag">${D.tag}</span>
      <div class="p-title">${D.title}</div>
      <div class="p-range">${D.range}</div>
      <div class="p-score">
        <div style="position:relative;width:120px;height:120px">${ring}<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center"><span class="num">${D.score}</span><span style="font-size:9px;color:rgba(255,255,255,.55);margin-top:3px">安全评分</span></div></div>
        <div class="lbl">${D.hook}</div>
      </div>
      <div class="p-chips">${D.chips.map(c=>`<span class="p-chip">${c}</span>`).join('')}</div>
    </div>
    <div class="p-sec"><h3>核心指标</h3><div class="p-tiles">
      ${D.tiles.map(t=>`<div class="p-tile"><div class="v">${t[0]}<small>${t[1]}</small></div><div class="k">${t[2]}</div><span class="s" style="color:${t[4]};background:${t[5]}">${t[3]}</span></div>`).join('')}
    </div></div>
    <div class="p-sec"><h3>${isW?'本周':'本月'}之最</h3><div class="p-best">
      ${D.best.map(b=>`<div class="row"><span class="medal">${b[0]}</span><div><b>${b[1]}</b><small>${b[2]}</small></div><span class="val">${b[3]}</span></div>`).join('')}
    </div></div>
    <div class="p-sec"><h3>燃气日均点火时长 · 近 30 天</h3></div>
    <div class="p-chart" id="ksRepChart"></div>
    <div class="p-sec"><h3>AI 主动建议</h3><div class="p-tips">
      ${D.tips.map((t,i)=>`<div class="p-tip" data-tip="${i}" ${i===1?'style="cursor:pointer"':''}><i>${i+1}</i><p>${t}${i===1?' <b style="color:var(--acc)">去购买 ›</b>':''}</p></div>`).join('')}
    </div></div>
    <div class="p-foot">${D.foot}</div>
   </div>`,el=>{
    el.querySelector('#rpW2').onclick=()=>{if(!isW){closePage();openKsReport('周')}};
    el.querySelector('#rpM2').onclick=()=>{if(isW){closePage();openKsReport('月')}};
    el.querySelector('#ksRepChart').innerHTML=isW?barChart('eng_gasw','月',' h','#ff8a65'):lineChart('eng_gasm','月',' h','#ff8a65');
    el.querySelector('[data-tip="1"]').onclick=()=>{openWebView('https://fmall.gree.com/','董明珠店');toast('已为你跳转原厂配件专区');};
   },true);
}
/* ================= 家庭成员详情 ================= */
const MEMBER_EXT=[
 {age:38,h:176,w:72,loc:'家中 · 明珠花园 3 栋',inF:1,pos:[172,96],
  diet:'健身管理期：推荐西兰花、鸡胸肉等高蛋白低脂食材，晚餐七分饱。',
  water:'运动后 30 分钟内补水约 300mL，少喝碳酸饮料。'},
 {age:36,h:163,w:52,loc:'公司 · 格力科技园（围栏外 2.3km）',inF:0,pos:[258,42],
  diet:'补钙养颜：推荐鲈鱼、嫩豆腐，注意补充胶原蛋白与维生素 C。',
  water:'晨起一杯 45°C 温水；午后减少咖啡，避免影响睡眠。'},
 {age:65,h:170,w:68,loc:'小区花园 · 散步中（围栏内）',inF:1,pos:[148,118],
  diet:'低盐低脂、软烂易消化：推荐鸡蛋羹、菠菜，注意补铁护心。',
  water:'少量多次，睡前 1 小时避免大量饮水；用药期间遵医嘱饮水。'},
 {age:7,h:126,w:26,loc:'学校 · 实验小学（围栏内）',inF:1,pos:[196,116],
  diet:'成长发育期：推荐鲜牛奶、红富士苹果，少食多餐、少零食。',
  water:'避免冰水，课间定时提醒喝水，每日不少于 1.2L。'}];
function openMemberPage(i){
  const f=FAMILY[i],ex=MEMBER_EXT[i],sd=sleepData(i,0),lv=slpLevel(sd.score);
  const total=sd.deep+sd.light+sd.rem;
  const head=`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button><h1>${f.n}</h1><span class="pg-extra">${f.r}</span></div>`;
  openPage(head+`<div class="page-scroll" style="padding:0 14px 24px">
   <div class="ctl-card" style="margin-top:6px;display:flex;align-items:center;gap:14px">
    <img src="${f.img}" style="width:62px;height:62px;border-radius:50%;object-fit:cover;flex:0 0 auto">
    <div><h3 style="font-size:17px;font-weight:700">${f.n}</h3>
     <p style="font-size:11.5px;color:var(--ink2);margin-top:3px">${f.d}</p></div>
   </div>
   <div class="mb-grid">
    <div class="mb-cell"><b>${ex.age} 岁</b><span>年龄</span></div>
    <div class="mb-cell"><b>${ex.h} cm</b><span>身高</span></div>
    <div class="mb-cell"><b>${ex.w} kg</b><span>体重</span></div>
   </div>
   <div class="ctl-card"><h3>健康数据</h3>
    <div class="ks-row"><span class="kic" style="background:#efebff">${'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#6a5bd8" stroke-width="1.8" stroke-linecap="round"><path d="M20 14.5A8.2 8.2 0 0 1 9.5 4 8.2 8.2 0 1 0 20 14.5z"/></svg>'}</span>
     <div><h5>睡眠情况 · 昨日</h5><p>${Math.floor(total/60)} 小时 ${total%60} 分 · 入睡 ${sd.start} · 醒来 ${sd.end}</p></div>
     <span class="kb" style="color:${lv[1]};background:${lv[1]}1a">质量 ${lv[0]}</span></div>
    <div class="ks-row"><span class="kic" style="background:#fdf3e3">${'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#b26a00" stroke-width="1.8" stroke-linecap="round"><path d="M5 19c0-7.5 4.5-12.5 13.5-14-1 9-5.5 14-13.5 14z"/></svg>'}</span>
     <div><h5>饮食注意</h5><p>${ex.diet}</p></div></div>
    <div class="ks-row" id="mbWaterSet" style="cursor:pointer"><span class="kic" style="background:#e8f6fb">${'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#0090b0" stroke-width="1.8" stroke-linecap="round"><path d="M12 3.5s5.5 6 5.5 10a5.5 5.5 0 0 1-11 0c0-4 5.5-10 5.5-10z"/></svg>'}</span>
     <div><h5>用水注意点</h5><p id="mbWqText">${wqText(i)}<br>${ex.water}</p></div>
     <span class="kb" style="color:#0090b0;background:#e8f6fb">饮水设置 ›</span></div>
   </div>
   <div class="ctl-card"><h3>地理围栏</h3>
    <div class="mb-map"><svg viewBox="0 0 344 180" style="width:100%;display:block">
     <rect width="344" height="180" fill="#edf3ea"/>
     <rect x="0" y="78" width="344" height="14" fill="#fff"/>
     <rect x="96" y="0" width="14" height="180" fill="#fff"/>
     <rect x="224" y="0" width="12" height="180" fill="#fff"/>
     <rect x="0" y="140" width="344" height="10" fill="#fff"/>
     <rect x="130" y="20" width="60" height="38" rx="5" fill="#dce8d2"/>
     <rect x="250" y="100" width="70" height="30" rx="5" fill="#dce8d2"/>
     <circle cx="172" cy="96" r="60" fill="rgba(26,115,232,.07)" stroke="#1a73e8" stroke-width="1.5" stroke-dasharray="6 4"/>
     <circle cx="172" cy="96" r="10" fill="#1a73e8"/><text x="172" y="100" font-size="8.5" fill="#fff" text-anchor="middle">家</text>
     <circle cx="${ex.pos[0]}" cy="${ex.pos[1]}" r="9" fill="${ex.inF?'#34a853':'#f29900'}"><animate attributeName="opacity" values="1;.5;1" dur="1.8s" repeatCount="indefinite"/></circle>
     <circle cx="${ex.pos[0]}" cy="${ex.pos[1]}" r="3.6" fill="#fff"/>
    </svg></div>
    <div class="ks-row" style="border:none;padding-bottom:4px">
     <div><h5>${ex.loc}</h5><p>家 · 围栏半径 500 米，进出围栏自动提醒</p></div>
     <span class="kb" style="color:${ex.inF?'#0d5c34':'#b26a00'};background:${ex.inF?'#b9f2cf':'#fdf3e3'}">${ex.inF?'围栏内':'围栏外'}</span></div>
   </div>
  </div>`,el=>{
    el.querySelector('#mbWaterSet').onclick=()=>openWaterPref(i,()=>{
      const t=el.querySelector('#mbWqText');if(t)t.innerHTML=`${wqText(i)}<br>${ex.water}`;});
  });
}

/* ================= 图表引擎 ================= */
function genSeries(key,view){
  const r=seeded(key+view);
  if(view==='日'){return {labels:Array.from({length:24},(_,i)=>i+''),data:Array.from({length:24},(_,i)=>{const base=.45+.4*Math.sin((i-6)/24*Math.PI*2-Math.PI/2);return Math.max(.05,base+r()*.3)})}}
  if(view==='月'){return {labels:Array.from({length:30},(_,i)=>i+1+''),data:Array.from({length:30},()=>.25+r()*.7)}}
  return {labels:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],data:Array.from({length:12},()=>.25+r()*.7)};
}
function lineChart(key,view,unit,color){
  const {labels,data}=genSeries(key,view);const W=340,H=120,P=8;
  const scale=key.includes('co2')?900:key.startsWith('air_t')?36:key.startsWith('air_h')?100:key.startsWith('wt')?6:key.startsWith('eng')?4:100;
  const step=(W-P*2)/(data.length-1);
  const pts=data.map((v,i)=>[P+i*step,H-14-v*(H-30)]);
  const line=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
  const area=line+` L${pts[pts.length-1][0].toFixed(1)} ${H-14} L${pts[0][0].toFixed(1)} ${H-14} Z`;
  const gid='g'+Math.random().toString(36).slice(2,7);
  const max=Math.max(...data),maxI=data.indexOf(max);
  const fmtV=v=>{const val=v*scale;return (scale>=100?Math.round(val):val.toFixed(1))+unit};
  const yLabels=[0,.5,1].map(f=>{const v=(max*f);return `<text x="${P}" y="${(H-14-f*(H-30)).toFixed(0)}" font-size="7.5" fill="#c3c8cf" text-anchor="start" dy="-2">${v<10?v.toFixed(1):Math.round(v)}</text>`}).join('');
  const hoverPts=data.map((v,i)=>{const x=pts[i][0],y=pts[i][1];
    const tx=Math.min(W-26,Math.max(20,x));
    const lb=view==='日'?labels[i]+':00':view==='月'?labels[i]+'日':labels[i];
    return `<g class="pt"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9" fill="transparent"/><circle class="dot" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="${color}"/><text x="${tx.toFixed(1)}" y="${Math.max(11,y-9).toFixed(1)}" font-size="8" fill="#3c4043" text-anchor="middle" font-weight="700" stroke="#fff" stroke-width="3" paint-order="stroke">${lb} · ${fmtV(v)}</text></g>`}).join('');
  return `<svg viewBox="0 0 ${W} ${H}" class="chart-box">
   <defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity=".28"/><stop offset="1" stop-color="${color}" stop-opacity=".02"/></linearGradient></defs>
   ${yLabels}
   <path class="lc-area" d="${area}" fill="url(#${gid})"/><path class="lc-line" d="${line}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
   ${hoverPts}
   <text x="${Math.min(W-52,Math.max(34,pts[maxI][0]))}" y="${pts[maxI][1]-12}" font-size="8.5" fill="${color}" text-anchor="middle" font-weight="700" stroke="#fff" stroke-width="3" paint-order="stroke">峰值 ${fmtV(max)}</text>
   <text x="${P}" y="${H-2}" font-size="7.5" fill="#c3c8cf">${labels[0]}${view==='日'?':00':''}</text>
   <text x="${W-P}" y="${H-2}" font-size="7.5" fill="#c3c8cf" text-anchor="end">${labels[labels.length-1]}${view==='日'?':00':''}</text></svg>`;
}
function barChart(key,view,unit,color){
  const {labels,data}=genSeries(key,view);const W=340,H=120,P=8;
  const scaleB=key.includes('eng')?2.2:key.startsWith('wt')?3.4:key.startsWith('rep')?40:10;
  const step=(W-P*2)/data.length,bw=Math.min(14,step*.55);
  const bars=data.map((v,i)=>{const h=v*(H-34);const x=P+i*step+(step-bw)/2;
    const lb=view==='日'?labels[i]+':00':view==='月'?labels[i]+'日':labels[i];
    return `<g class="bp"><rect class="bar-r" x="${x.toFixed(1)}" y="${(H-14-h).toFixed(1)}" width="${bw}" height="${h.toFixed(1)}" rx="${Math.min(4,bw/2)}" fill="${color}" opacity="${.55+v*.45}" style="animation-delay:${i*28}ms"/><text x="${(x+bw/2).toFixed(1)}" y="${Math.max(11,H-14-h-5).toFixed(1)}" font-size="8" fill="#3c4043" text-anchor="middle" font-weight="700" stroke="#fff" stroke-width="3" paint-order="stroke">${lb} · ${(v*scaleB).toFixed(1)}${unit}</text></g>`}).join('');
  const total=data.reduce((a,b)=>a+b,0);
  return `<svg viewBox="0 0 ${W} ${H}" class="chart-box">${bars}
   <text x="${W-P}" y="12" font-size="8.5" fill="${color}" text-anchor="end" font-weight="700">合计 ${(total*scaleB).toFixed(1)}${unit}</text>
   <text x="${P}" y="${H-2}" font-size="7.5" fill="#c3c8cf">${labels[0]}${view==='日'?'时':''}</text>
   <text x="${W-P}" y="${H-2}" font-size="7.5" fill="#c3c8cf" text-anchor="end">${labels[labels.length-1]}${view==='日'?'时':''}</text></svg>`;
}
function donut(parts){
  let acc=0;const r=44,c=2*Math.PI*r;
  const segs=parts.map(p=>{const s=`<circle cx="70" cy="70" r="${r}" fill="none" stroke="${p[2]}" stroke-width="15" stroke-dasharray="${p[1]/100*c} ${c}" stroke-dashoffset="${-acc/100*c}" transform="rotate(-90 70 70)"/>`;acc+=p[1];return s}).join('');
  return `<div style="display:flex;align-items:center;gap:16px"><svg viewBox="0 0 140 140" style="width:128px;flex:0 0 auto">${segs}
   <text x="70" y="66" text-anchor="middle" font-size="15" font-weight="700" fill="#17181c">18.6 度</text>
   <text x="70" y="82" text-anchor="middle" font-size="8" fill="#9aa0a6">今日用电</text></svg>
   <div style="flex:1">${parts.map(p=>`<div style="display:flex;align-items:center;gap:7px;font-size:11px;color:var(--ink2);padding:3.5px 0"><i style="width:9px;height:9px;border-radius:3px;background:${p[2]}"></i>${p[0]}<b style="margin-left:auto;color:var(--ink)">${p[1]}%</b></div>`).join('')}</div></div>`;
}
function donutView(view,off){
  const totals={'日':18.6,'月':486,'年':5320};
  const r=seeded('etype'+view+off);
  const base=[['空调',52,'#1a73e8'],['冰箱',12,'#00b8a9'],['热水器',10,'#e54545'],['照明',6,'#f29900'],['洗衣机',6,'#7c4dff'],['蒸烤箱',5,'#ff7a59'],['其他',9,'#9aa0a6']];
  let parts=base.map(p=>[p[0],p[1]*(0.9+r()*0.2),p[2]]);
  const sum=parts.reduce((a,p)=>a+p[1],0);parts=parts.map(p=>[p[0],p[1]/sum*100,p[2]]);
  const total=totals[view]*(0.95+r()*0.1);
  let acc=0;const R=44,c=2*Math.PI*R;
  const segs=parts.map(p=>{const s=`<circle class="donut-c" cx="70" cy="70" r="${R}" fill="none" stroke="${p[2]}" stroke-width="15" stroke-dasharray="${p[1]/100*c} ${c}" stroke-dashoffset="${-acc/100*c}" transform="rotate(-90 70 70)" style="animation-delay:${parts.indexOf(p)*80}ms"/>`;acc+=p[1];return s}).join('');
  const centerSub=view==='日'?'当日用电':view==='月'?'当月用电':'全年用电';
  return `<div style="display:flex;align-items:center;gap:14px"><svg viewBox="0 0 140 140" style="width:124px;flex:0 0 auto">${segs}
   <text x="70" y="66" text-anchor="middle" font-size="14" font-weight="700" fill="#17181c">${total.toFixed(1)} 度</text>
   <text x="70" y="82" text-anchor="middle" font-size="8" fill="#9aa0a6">${centerSub}</text></svg>
   <div style="flex:1">${parts.map(p=>`<div style="display:flex;align-items:center;gap:7px;font-size:11px;color:var(--ink2);padding:3px 0"><i style="width:9px;height:9px;border-radius:3px;background:${p[2]}"></i>${p[0]}<b style="margin-left:auto;color:var(--ink);font-variant-numeric:tabular-nums">${(p[1]/100*total).toFixed(1)} 度</b><span style="width:36px;text-align:right;color:var(--ink3);font-variant-numeric:tabular-nums">${p[1].toFixed(0)}%</span></div>`).join('')}</div></div>`;
}
function chartCard(base,key,unit,color,type,full){
  const body=type==='donut'?donutView('日',0):(type==='bar'?barChart(key+'日0','日',unit,color):lineChart(key+'日0','日',unit,color));
  return `<div class="chart-card"><div class="cc-h"><h4>${base} · 今日</h4>
   <div class="seg" data-seg="${key}">${['日','月','年'].map((v,i)=>`<button class="${i===0?'on':''}" data-v="${v}">${v}</button>`).join('')}</div></div>
   <div class="cc-date" data-date="${key}"><button data-dir="-1">‹</button><span>2026年7月22日</span><button data-dir="1">›</button></div>
   <div class="cc-body" data-body="${key}">${body}</div>
   ${full?`<div data-engfull style="display:flex;align-items:center;justify-content:center;gap:3px;margin-top:13px;padding-top:11px;border-top:1px dashed #e8eaee;font-size:12px;font-weight:600;color:var(--blue);cursor:pointer">查看全屋用电情况 ${svgArrow}</div>`:''}</div>`;
}
function periodLabel(view,off){
  if(view==='日')return off===0?'今日':`7月${22+off}日`;
  if(view==='月')return off===0?'本月':`${7+off}月`;
  return off===0?'今年':`${2026+off}年`;
}
function dateLabel(view,off){
  if(view==='日')return `2026年7月${22+off}日`;
  if(view==='月')return `2026年${7+off}月`;
  return `${2026+off}年`;
}
function chartBodyHTML(key,view,off,d){
  if(d.type==='donut')return donutView(view,off);
  const k=key+view+off;
  return d.type==='bar'?barChart(k,view,d.unit,d.color):lineChart(k,view,d.unit,d.color);
}
function bindCharts(el,defs){
  el.querySelectorAll('[data-seg]').forEach(seg=>{
    const key=seg.dataset.seg;const d=defs[key];d.base=d.base||d.t;
    const card=seg.closest('.chart-card');
    const body=card.querySelector(`[data-body="${key}"]`);
    const dateSpan=card.querySelector(`[data-date="${key}"] span`);
    const titleEl=card.querySelector('h4');
    card.dataset.off=0;
    const refresh=()=>{
      const view=seg.querySelector('.on').dataset.v,off=+card.dataset.off;
      body.innerHTML=chartBodyHTML(key,view,off,d);
      dateSpan.textContent=dateLabel(view,off);
      titleEl.textContent=`${d.base} · ${periodLabel(view,off)}`;
    };
    seg.querySelectorAll('button').forEach(b=>b.onclick=()=>{
      seg.querySelectorAll('button').forEach(x=>x.classList.remove('on'));b.classList.add('on');
      card.dataset.off=0;refresh();});
    card.querySelectorAll('.cc-date button').forEach(b=>b.onclick=()=>{
      card.dataset.off=+card.dataset.off+ +b.dataset.dir;refresh();});
  });
}

/* ================= 全屋空调聚合页（顶部 tab 切换不同空调） ================= */
function openAcHub(){
  const acs=DEVICES.filter(d=>d.type==='ac');
  let cur=acs[0];
  const el=openPage(`<div class="fr2-wrap">
   <div class="wm2-head" style="padding-top:46px">
    <button class="wm2-ico" data-back>${svgBack}</button>
    <div class="wm2-head-t"><h1>空调</h1><p>全屋 ${acs.length} 台 · ${acs.filter(d=>d.on).length} 台运行中</p></div>
    <button class="wm2-ico" id="achMenu">${AC_MISC_SVG.dots}</button></div>
   <div class="ach-tabs" id="achTabs">${acs.map((d,i)=>`<button class="${i===0?'on':''}" data-ach="${d.id}">${d.room}</button>`).join('')}</div>
   <div class="fr2-body" id="achBody"></div>
  </div>`);
  const render=()=>{
    const body=el.querySelector('#achBody');
    openAcnCtl(cur,body);
    body.scrollTop=0;
  };
  el.querySelectorAll('[data-ach]').forEach(b=>b.onclick=()=>{
    cur=acs.find(d=>d.id===b.dataset.ach);
    el.querySelectorAll('[data-ach]').forEach(x=>x.classList.toggle('on',x===b));render();});
  el.querySelector('#achMenu').onclick=()=>toast('全屋空调设置');
  render();
}

/* ================= 新风机 V2（全屋净化新风 · 绿系） ================= */
function openFresh2Ctl(d){
  if(d.gear===undefined)d.gear=3;
  if(d.mode2===undefined)d.mode2='自动';
  if(d.timer===undefined)d.timer='关';
  if(d.hex===undefined)d.hex=true;
  if(d.ion===undefined)d.ion=true;
  if(d.co2===undefined)d.co2=true;
  if(d.heat===undefined)d.heat=false;
  const head=`<div class="wm2-head" style="padding-top:46px">
   <button class="wm2-ico" data-back>${svgBack}</button>
   <div class="wm2-head-t"><h1>新风机</h1><p>全屋净化新风 · ${d.room}</p></div>
   <button class="wm2-ico" id="fa2Menu">${AC_MISC_SVG.dots}</button></div>`;
  const body=`
  <section class="fr2-hero fa2-hero"><div class="fr2-hero-in">
   <div style="min-width:0">
    <span class="fr2-badge fa2-badge">${d.on?'运行中 · '+d.mode2+'模式':'已关机'}</span>
    <div class="fr2-big"><b>16<small style="font-size:13px;font-weight:400"> μg/m³</small></b></div>
    <p class="fr2-cap" style="color:#166534">室内 PM2.5 · 优</p>
    <div class="fr2-env">
     <div><p>室外 PM2.5</p><b>42</b></div>
     <div><p>CO₂</p><b>620</b></div>
     <div><p>风量</p><b>${d.gear*100}m³/h</b></div>
    </div>
    <p class="fr2-sync">数据实时同步 · 刚刚更新</p>
   </div>
   <div class="fa2-art"><span class="fa2-art-c">${devIcon('fresh','#16a34a')}</span><i class="fa2-wind w1"></i><i class="fa2-wind w2"></i><i class="fa2-wind w3"></i></div>
  </div></section>

  <div class="fr2-sec"><h2>运行设置</h2><span class="sub">模式 · 风量 · 定时</span></div>
  <section class="fr2-card">
   <div class="fa2-chips" id="fa2Modes">${['自动','静音','强劲','睡眠'].map(m=>`<button class="fa2-chip ${m===d.mode2?'on':''}" data-fm="${m}">${m}</button>`).join('')}</div>
   <div class="fr2-card-t" style="margin:14px 0 9px"><b>风量档位</b><span id="fa2GearV">${d.gear} 档 · ${d.gear*100}m³/h</span></div>
   <div class="fr2-tadj">
    <button class="fr2-step" id="fa2GDn">−</button>
    <div class="fr2-tadj-v"><div class="fa2-gears" id="fa2Gears">${[1,2,3,4,5].map(g=>`<i class="${g<=d.gear?'on':''}"></i>`).join('')}</div><span>1 档静音 ~ 5 档强劲</span></div>
    <button class="fr2-step" id="fa2GUp">＋</button>
   </div>
   <div class="fr2-card-t" style="margin:14px 0 9px"><b>定时关闭</b><span id="fa2TmV">${d.timer==='关'?'不定时':d.timer+' 后关闭'}</span></div>
   <div class="fa2-chips" id="fa2Timer">${['关','1h','2h','4h','8h'].map(t=>`<button class="fa2-chip ${t===d.timer?'on':''}" data-ft="${t}">${t==='关'?'不定时':t}</button>`).join('')}</div>
  </section>

  <div class="fr2-sec"><h2>智能换气</h2></div>
  <section class="fr2-card">
   <div class="fr2-lrow"><div><b>全热交换</b><p>回收排出空气的温度 · 冬夏更节能</p></div><span class="fr2-sw fa2-sw ${d.hex?'on':''}" id="fa2Hex"><i></i></span></div>
   <div class="fr2-lrow"><div><b>负离子净化</b><p>释放负离子 · 辅助沉降颗粒物</p></div><span class="fr2-sw fa2-sw ${d.ion?'on':''}" id="fa2Ion"><i></i></span></div>
   <div class="fr2-lrow"><div><b>CO₂ 智能新风</b><p>室内 CO₂ 超过 800ppm 自动提速换气</p></div><span class="fr2-sw fa2-sw ${d.co2?'on':''}" id="fa2Co2"><i></i></span></div>
   <div class="fr2-lrow" style="border:none"><div><b>辅热</b><p>冬季进风预热 · 防冷风直吹</p></div><span class="fr2-sw fa2-sw ${d.heat?'on':''}" id="fa2Heat"><i></i></span></div>
  </section>

  <div class="fr2-sec"><h2>滤网寿命</h2><span class="sub">到期自动提醒</span></div>
  <section class="fr2-card">
   <div class="wt2-fil"><div class="wt2-fil-h"><b>HEPA 滤网</b><span style="color:#16a34a">剩余 71%</span></div>
    <div class="wt2-bar"><i style="width:71%;background:#22c55e"></i></div></div>
   <div class="wt2-fil" style="margin-top:14px"><div class="wt2-fil-h"><b>初效滤网</b><span style="color:#d97706">剩余 45%</span></div>
    <div class="wt2-bar"><i style="width:45%;background:#f59e0b"></i></div></div>
   <div class="fr2-addrow" style="margin-top:14px">
    <button class="fr2-add fa2-add" id="fa2Buy">HEPA 滤网 · 一键购买 ¥129</button>
   </div>
  </section>

  <div class="fr2-sec"><h2>换气报告</h2></div>
  <section class="fr2-card">
   <div class="fr2-kpis" style="grid-template-columns:1fr 1fr">
    <div class="fr2-kpi"><b>86<small style="font-size:10px;font-weight:500"> m³</small></b><span>今日换气量</span></div>
    <div class="fr2-kpi"><b>18<small style="font-size:10px;font-weight:500"> μg/m³</small></b><span>本周 PM2.5 均值</span></div>
   </div>
  </section>
  <div style="height:8px"></div>`;
  const el=openPage(`<div class="fr2-wrap fa2-wrap">${head}<div class="fr2-body">${body}</div>
   <button class="fr2-voice fa2-voice" id="fa2Ball">${FR2_IC.siri}</button></div>`);
  /* 模式 */
  el.querySelectorAll('#fa2Modes .fa2-chip').forEach(b=>b.onclick=()=>{d.mode2=b.dataset.fm;
    el.querySelectorAll('#fa2Modes .fa2-chip').forEach(x=>x.classList.toggle('on',x===b));
    el.querySelector('.fa2-badge').textContent='运行中 · '+d.mode2+'模式';
    toast('已切换到「'+d.mode2+'」模式');});
  /* 风量 */
  const syGear=()=>{el.querySelector('#fa2GearV').textContent=d.gear+' 档 · '+d.gear*100+'m³/h';
    el.querySelectorAll('#fa2Gears i').forEach((x,xi)=>x.classList.toggle('on',xi<d.gear));};
  el.querySelector('#fa2GDn').onclick=()=>{d.gear=Math.max(1,d.gear-1);syGear();};
  el.querySelector('#fa2GUp').onclick=()=>{d.gear=Math.min(5,d.gear+1);syGear();};
  /* 定时 */
  el.querySelectorAll('#fa2Timer .fa2-chip').forEach(b=>b.onclick=()=>{d.timer=b.dataset.ft;
    el.querySelectorAll('#fa2Timer .fa2-chip').forEach(x=>x.classList.toggle('on',x===b));
    el.querySelector('#fa2TmV').textContent=d.timer==='关'?'不定时':d.timer+' 后关闭';
    toast(d.timer==='关'?'已取消定时':'已设定 '+d.timer+' 后关闭');});
  /* 开关 */
  const bindSw=(id,key,name)=>{const sw=el.querySelector(id);
    sw.onclick=()=>{sw.classList.toggle('on');d[key]=sw.classList.contains('on');toast(name+(d[key]?' 已开启':' 已关闭'));};};
  bindSw('#fa2Hex','hex','全热交换');bindSw('#fa2Ion','ion','负离子净化');
  bindSw('#fa2Co2','co2','CO₂ 智能新风');bindSw('#fa2Heat','heat','辅热');
  el.querySelector('#fa2Buy').onclick=()=>toast('已为你跳转董明珠店 · HEPA 滤网（演示）');
  el.querySelector('#fa2Menu').onclick=()=>toast('新风机设置');
  el.querySelector('#fa2Ball').onclick=()=>toast('小格语音（演示）：请说“新风机调到睡眠模式”');
}
