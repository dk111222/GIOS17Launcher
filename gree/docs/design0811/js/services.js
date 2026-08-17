/* ================= 空气管家 ================= */
const AIR_DIMS=[
 {t:'温度',key:'air_t',unit:'°C',color:'#e54545',type:'line'},
 {t:'湿度',key:'air_h',unit:'%',color:'#1a73e8',type:'line'},
 {t:'PM2.5',key:'air_pm',unit:'μg/m³',color:'#7c4dff',type:'line'},
 {t:'TVOC',key:'air_tvoc',unit:'mg/m³',color:'#00b8a9',type:'line'},
 {t:'甲醛',key:'air_hcho',unit:'mg/m³',color:'#f29900',type:'line'},
 {t:'二氧化碳',key:'air_co2',unit:'ppm',color:'#5f6368',type:'line'},
];
function openAirPage(room){
  let cur=room||S.airRoom||'全屋';
  const tabs=['全屋',...ROOMS.map(r=>r.name)];
  function bodyHTML(){
    const a=airOf(cur);
    const ctl=cur!=='全屋'?`
    <div class="ctl-card" style="margin-top:0"><h3>${cur} · 快捷控制</h3>
      <div class="kv"><span>设定温度</span><span style="display:flex;align-items:center;gap:12px">
        <button class="ctl-btn" style="width:34px;height:34px" id="rTdn">−</button><b id="rTv" style="font-size:17px">${S.roomT[cur]}°C</b>
        <button class="ctl-btn" style="width:34px;height:34px" id="rTup">＋</button></span></div>
      <div style="padding:12px 0 0"><div style="display:flex;justify-content:space-between;font-size:11px;color:var(--ink2)"><span>设定湿度 <b id="rHv" style="color:var(--blue)">${S.roomH[cur]}%</b></span></div>
        <input type="range" class="slider" id="rH" min="40" max="70" value="${S.roomH[cur]}">
        <div style="display:flex;justify-content:space-between;font-size:10.5px;margin-top:2px">
        ${['偏干','舒适','湿润'].map(l=>`<button data-hz="${l==='偏干'?45:l==='舒适'?55:65}" style="color:${(S.roomH[cur]<50&&l==='偏干')||(S.roomH[cur]>=50&&S.roomH[cur]<62&&l==='舒适')||(S.roomH[cur]>=62&&l==='湿润')?'var(--blue)':'var(--ink3)'};font-weight:${(S.roomH[cur]<50&&l==='偏干')||(S.roomH[cur]>=50&&S.roomH[cur]<62&&l==='舒适')||(S.roomH[cur]>=62&&l==='湿润')?'700':'400'}">${l}</button>`).join('')}</div></div>
      <div class="ai-row"><span class="ai-ic"><svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.9 5.7L19.5 9l-5.6 1.3L12 16l-1.9-5.7L4.5 9l5.6-1.3L12 2zM18.5 14.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6zM6 15l.7 2.1 2.1.7-2.1.7L6 20.6l-.7-2.1-2.1-.7 2.1-.7L6 15z"/></svg></span><div class="ai-t"><b>AI 主动好空气</b><small>自动监测并调节温度、湿度与新风</small></div><span class="switch ${S.aiAir[cur]?'on':''}" id="aiSw"></span></div></div>`:'';
    return `${ctl}
    ${aiSvcBannerHTML('空气','12px 14px 12px')}
    <div class="ctl-card" style="${cur==='全屋'?'margin-top:0':''}"><h3>实时空气 · ${cur}</h3>
      <div class="air-grid">
        <div class="air-cell"><span class="ac-ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e54545" stroke-width="1.9" stroke-linecap="round"><path d="M10 4a2 2 0 1 1 4 0v7.6a4.5 4.5 0 1 1-4 0z"/><path d="M12 9v5.5"/><circle cx="12" cy="16.8" r="1.5" fill="#e54545" stroke="none"/></svg></span><b>${a.t}°</b><small>温度</small></div>
        <div class="air-cell"><span class="ac-ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2b86c8" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5s5.5 6.2 5.5 10a5.5 5.5 0 0 1-11 0c0-3.8 5.5-10 5.5-10z"/><path d="M9.2 13.5a2.8 2.8 0 0 0 2.4 2.9"/></svg></span><b>${a.h}<span class="u">%</span></b><small>湿度</small></div>
        <div class="air-cell"><span class="ac-ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34a853" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19C5 9.5 12 4.5 20 4.5c0 8-5 14.5-15 14.5z"/><path d="M5 19c3-5.5 7-9.5 11-11.5"/></svg></span><b style="color:${a.aqi==='优'?'var(--green)':'var(--orange)'}">${a.aqi}</b><small>空气质量</small></div>
        <div class="air-cell"><span class="ac-ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c4dff" stroke-width="1.9" stroke-linecap="round"><circle cx="7" cy="8" r="1.2" fill="#7c4dff" stroke="none"/><circle cx="13" cy="6" r=".9" fill="#7c4dff" stroke="none"/><circle cx="17.5" cy="10" r="1.4" fill="#7c4dff" stroke="none"/><circle cx="9" cy="14" r="1" fill="#7c4dff" stroke="none"/><circle cx="15" cy="15.5" r="1.1" fill="#7c4dff" stroke="none"/><path d="M5 19h14"/></svg></span><b>${a.pm}</b><small>PM2.5</small></div>
        <div class="air-cell"><span class="ac-ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00b8a9" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3.5v5L4.8 17a2.4 2.4 0 0 0 2.1 3.5h10.2a2.4 2.4 0 0 0 2.1-3.5L14 8.5v-5"/><path d="M8.5 3.5h7"/><path d="M7.5 14.5h9"/></svg></span><b>${a.tvoc}</b><small>TVOC</small></div>
        <div class="air-cell"><span class="ac-ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f29900" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 2.8 19.5h18.4z"/><path d="M12 9.5v4.5"/><circle cx="12" cy="16.8" r=".9" fill="#f29900" stroke="none"/></svg></span><b>${a.hcho}</b><small>甲醛</small></div>
        <div class="air-cell"><span class="ac-ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5f7ea8" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M7 16.5a4 4 0 0 1-.5-8A5.5 5.5 0 0 1 17 9.5a3.5 3.5 0 0 1 .5 7z"/><path d="M9 20h.01M13 20.5h.01M16.5 20h.01"/></svg></span><b>${a.co2}</b><small>CO₂</small></div>
        <div class="air-cell"><span class="ac-ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" stroke-width="1.9" stroke-linecap="round"><path d="M4 14a8 8 0 1 1 16 0"/><path d="M12 14l3.5-3.5"/><circle cx="12" cy="14" r="1.4" fill="#1a73e8" stroke="none"/></svg></span><b style="color:var(--blue)">${a.aqv}</b><small>AQI 指数</small></div>
      </div></div>
    ${AIR_DIMS.map(d=>chartCard(d.t,d.key+cur,d.unit,d.color,d.type)).join('')}`;
  }
  const el=openPage(`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button><h1>空气管家</h1></div>
   <div class="tab-strip" id="airTabs">${tabs.map(t=>`<button class="chip ${t===cur?'on':''}" data-t="${t}">${t}</button>`).join('')}</div>
   <div class="page-scroll" id="airBody" style="padding-top:8px"></div>`);
  const render=()=>{el.querySelector('#airBody').innerHTML=bodyHTML();bindLocal();bindCharts(el,Object.fromEntries(AIR_DIMS.map(d=>[d.key+cur,d])))};
  function bindLocal(){
    el.querySelectorAll('#airTabs .chip').forEach(c=>c.onclick=()=>{cur=c.dataset.t;
      el.querySelectorAll('#airTabs .chip').forEach(x=>x.classList.toggle('on',x===c));render()});
    const up=el.querySelector('#rTup'),dn=el.querySelector('#rTdn');
    if(up){up.onclick=()=>{S.roomT[cur]=Math.min(30,S.roomT[cur]+1);el.querySelector('#rTv').textContent=S.roomT[cur]+'°C';toast(`${cur}空调设定 ${S.roomT[cur]}°C`)};
      dn.onclick=()=>{S.roomT[cur]=Math.max(16,S.roomT[cur]-1);el.querySelector('#rTv').textContent=S.roomT[cur]+'°C';toast(`${cur}空调设定 ${S.roomT[cur]}°C`)};}
    const rh=el.querySelector('#rH');
    if(rh){rh.oninput=()=>{S.roomH[cur]=+rh.value;el.querySelector('#rHv').textContent=rh.value+'%'};
      el.querySelectorAll('[data-hz]').forEach(b=>b.onclick=()=>{S.roomH[cur]=+b.dataset.hz;render();toast(`已切换至「${b.textContent}」档`)});
      const sw=el.querySelector('#aiSw');sw.onclick=()=>{S.aiAir[cur]=!S.aiAir[cur];sw.classList.toggle('on',S.aiAir[cur]);toast(S.aiAir[cur]?'AI 主动好空气已开启':'已关闭')};}
  }
  render();
}
function openAirReport(type){
  const isM=type==='月';
  const D=isM?{
    tag:'MONTHLY AIR REPORT',title:'2026 年 6 月 · 空气月报',range:'统计周期 2026.06.01 — 06.30 · 全屋 9 个监测点',
    score:86,beat:'优于同城 78% 家庭',times:'47',img:null,heroBg:'',
    acc:'#7ec3ff',acc2:'#4ae3c2',accbd:'rgba(142,197,255,.4)',chipc:'#cfe4ff',chipbg:'rgba(126,197,255,.14)',chipbd:'rgba(126,197,255,.25)',
    chips:['# 空气优良','# 湿度偏高','# 除醛达标','# 新风给力'],
    tiles:[['21',' μg/m³','PM2.5 均值','优','#0d5c34','#b9f2cf'],['66',' %','湿度均值','偏高','#8a5200','#ffe3b3'],['28',' 天','空气优良天数','占比 93%','#0d5c34','#b9f2cf'],['3.2',' 小时','CO₂ 超标时长','需关注','#8a5200','#ffe3b3']],
    best:[['🏆','最佳房间','儿童房 · AQI 均值 24','A+'],['⚠️','最需关注','厨房 · TVOC 峰值 0.58 mg/m³','B'],['📅','最佳单日','6 月 14 日 · AQI 21','优']],
    seasons:null,
    chart:{t:'月度湿度走势',key:'rep_h_m',unit:'%',color:'#1a73e8',type:'line'},
    tips:['湿度持续偏高，建议主卧除湿机每日 10:00-16:00 自动运行。','厨房爆炒时 CO₂ 与 TVOC 同步升高，建议联动油烟机与新风机强排。','儿童房夜间 CO₂ 接近 800ppm，建议睡前开启新风 30 分钟。','入夏空调使用频繁，建议每月清洗滤网保持出风洁净。'],
    foot:'格力空气管家 · 报告生成于 2026-07-01<br>数据来自全屋 9 个空气监测点，仅供参考'
  }:{
    tag:'ANNUAL AIR REPORT',title:'2025 年度 · 空气年报',range:'统计周期 2025.01.01 — 12.31 · 全屋 9 个监测点',
    score:82,beat:'优于同城 71% 家庭',times:'512',img:'img/bg_rep_y.png',
    heroBg:'background:linear-gradient(165deg,#14351f 0%,#0b1230 78%)',
    acc:'#ffd166',acc2:'#7ee2a8',accbd:'rgba(255,209,102,.45)',chipc:'#ffe9b8',chipbg:'rgba(255,209,102,.13)',chipbd:'rgba(255,209,102,.28)',
    chips:['# 四季分明','# 冬季偏干','# 整体优良','# 稳步提升'],
    tiles:[['24',' μg/m³','PM2.5 年均值','优','#0d5c34','#b9f2cf'],['58',' %','湿度年均值','舒适','#0d5c34','#b9f2cf'],['329',' 天','全年优良天数','占比 90%','#0d5c34','#b9f2cf'],['41',' 小时','CO₂ 年超标时长','需关注','#8a5200','#ffe3b3']],
    best:[['🏆','最佳月份','10 月 · AQI 均值 26','A+'],['⚠️','最需关注','1 月 · 供暖期干燥 PM 略高','B'],['🌱','同比进步','PM2.5 年均值下降 12%','↑']],
    seasons:[['🌸','春季','AQI 均值 31 · 花粉季新风常开'],['🌞','夏季','AQI 均值 28 · 空调房关注 CO₂'],['🍂','秋季','AQI 均值 26 · 全年最佳'],['❄️','冬季','AQI 均值 38 · 供暖期偏干']],
    chart:{t:'逐月 PM2.5 走势',key:'rep_pm_y',unit:'μg/m³',color:'#7c4dff',type:'bar'},
    tips:['冬季供暖期湿度低至 38%，建议 12-2 月开启加湿与新风平衡模式。','全年空气优良率 90%，继续保持开窗通风与新风联动习惯。','建议 2026 年为儿童房、主卧加装独立 CO₂ 监测，提升夜间空气质量。','空调滤网按季度清洗，可使出风 PM2.5 再降约 15%。'],
    foot:'格力空气管家 · 报告生成于 2026-01-05<br>数据来自全屋 9 个空气监测点，仅供参考'
  };
  const ring=(()=>{const r=52,c=2*Math.PI*r;return `<svg width="120" height="120" style="transform:rotate(-90deg)"><defs><linearGradient id="pgr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${D.acc}"/><stop offset="1" stop-color="${D.acc2}"/></linearGradient></defs><circle cx="60" cy="60" r="${r}" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="8"/><circle cx="60" cy="60" r="${r}" fill="none" stroke="url(#pgr)" stroke-width="8" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-D.score/100)}"/></svg>`})();
  openPage(`<div class="pg-head" style="background:#0b1230"><button class="pg-back" data-back style="color:#fff">${svgBack}</button><h1 style="color:#fff">空气报告</h1></div>
   <div class="tab-strip" style="background:#0b1230;padding-top:0"><button class="chip ${isM?'on':''}" id="rpM">月报</button><button class="chip ${isM?'':'on'}" id="rpY">年报</button></div>
   <div class="poster" style="--acc:${D.acc};--acc2:${D.acc2};--accbd:${D.accbd};--chipc:${D.chipc};--chipbg:${D.chipbg};--chipbd:${D.chipbd}">
    <div class="p-hero" style="${D.heroBg}">
      ${D.img?`<img class="p-heroimg" src="${D.img}">`:''}
      <span class="p-tag">${D.tag}</span>
      <div class="p-title">${D.title}</div>
      <div class="p-range">${D.range}</div>
      <div class="p-score">
        <div style="position:relative;width:120px;height:120px">${ring}<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center"><span class="num">${D.score}</span><span style="font-size:9px;color:rgba(255,255,255,.55);margin-top:3px">综合评分</span></div></div>
        <div class="lbl">${D.beat}<br>设备联动处理空气异常 <b style="color:var(--acc)">${D.times}</b> 次</div>
      </div>
      <div class="p-chips">${D.chips.map(c=>`<span class="p-chip">${c}</span>`).join('')}</div>
    </div>
    <div class="p-sec"><h3>核心指标</h3><div class="p-tiles">
      ${D.tiles.map(t=>`<div class="p-tile"><div class="v">${t[0]}<small>${t[1]}</small></div><div class="k">${t[2]}</div><span class="s" style="color:${t[4]};background:${t[5]}">${t[3]}</span></div>`).join('')}
    </div></div>
    <div class="p-sec"><h3>${isM?'本月':'年度'}之最</h3><div class="p-best">
      ${D.best.map(b=>`<div class="row"><span class="medal">${b[0]}</span><div><b>${b[1]}</b><small>${b[2]}</small></div><span class="val">${b[3]}</span></div>`).join('')}
    </div></div>
    ${D.seasons?`<div class="p-sec"><h3>四季回顾</h3><div class="p-tiles">
      ${D.seasons.map(s=>`<div class="p-tile" style="padding:13px 14px"><div style="font-size:17px">${s[0]} <b style="font-size:13px">${s[1]}</b></div><div class="k" style="margin-top:6px;line-height:1.6">${s[2]}</div></div>`).join('')}
    </div></div>`:''}
    <div class="p-sec"><h3>${isM?'月度':'逐月'}走势</h3></div>
    <div class="p-chart" id="repChart"></div>
    <div class="p-sec"><h3>空气处理建议</h3><div class="p-tips">
      ${D.tips.map((t,i)=>`<div class="p-tip"><i>${i+1}</i><p>${t}</p></div>`).join('')}
    </div></div>
    <div class="p-foot">${D.foot}</div>
   </div>`,el=>{
    el.querySelector('#rpM').onclick=()=>{if(!isM){closePage();openAirReport('月')}};
    el.querySelector('#rpY').onclick=()=>{if(isM){closePage();openAirReport('年')}};
    el.querySelector('#repChart').innerHTML=D.chart.type==='bar'?barChart(D.chart.key,'月',D.chart.unit,D.chart.color):lineChart(D.chart.key,'月',D.chart.unit,D.chart.color);
  },true);
}
/* ================= 能源管家 ================= */
function openEnergyPage(){
  const defs={
   eng_use:{base:'用电量',unit:' 度',color:'#1a73e8',type:'bar'},
   eng_type:{base:'设备类型用电',type:'donut'},
   eng_gen:{base:'光伏发电量',unit:' 度',color:'#34a853',type:'bar'},
   eng_store:{base:'储能充放电',unit:' 度',color:'#00b8a9',type:'line'},
  };
  openPage(`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button><h1>能源管家</h1></div>
   <div class="page-scroll" style="padding-bottom:20px">
    ${aiSvcBannerHTML('能源','12px 14px 0')}
    <div class="topo">
      <div style="display:flex;justify-content:space-between;font-size:11px;opacity:.85;padding:0 4px 8px"><span>家庭电力拓扑 · 发储用管</span><span style="color:#7ee2a8">● 实时</span></div>
      <svg viewBox="0 0 360 210" style="width:100%">
        <defs><marker id="arr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L8 4L0 8z" fill="#7ee2a8"/></marker></defs>
        <line x1="80" y1="55" x2="170" y2="100" stroke="#7ee2a8" stroke-width="2" class="flow" marker-end="url(#arr)"/>
        <line x1="280" y1="55" x2="195" y2="100" stroke="#8ec5ff" stroke-width="2" class="flow" style="animation-direction:reverse" marker-end="url(#arr)"/>
        <line x1="180" y1="130" x2="180" y2="168" stroke="#ffd166" stroke-width="2" class="flow" marker-end="url(#arr)"/>
        <line x1="88" y1="185" x2="152" y2="185" stroke="#7ee2a8" stroke-width="2" class="flow" style="animation-direction:reverse"/>
        <g><circle cx="60" cy="42" r="24" fill="rgba(255,255,255,.1)" stroke="#7ee2a8" stroke-width="1.5"/>
          <text x="60" y="39" text-anchor="middle" font-size="13">☀️</text><text x="60" y="54" text-anchor="middle" font-size="8.5" fill="#cdeed9">光伏 3.2kW</text></g>
        <g><circle cx="300" cy="42" r="24" fill="rgba(255,255,255,.1)" stroke="#8ec5ff" stroke-width="1.5"/>
          <text x="300" y="39" text-anchor="middle" font-size="13">🏙️</text><text x="300" y="54" text-anchor="middle" font-size="8.5" fill="#cfe4ff">电网</text></g>
        <g><rect x="150" y="92" width="60" height="40" rx="12" fill="rgba(255,255,255,.14)" stroke="#ffd166" stroke-width="1.5"/>
          <text x="180" y="109" text-anchor="middle" font-size="13">🔋</text><text x="180" y="124" text-anchor="middle" font-size="8.5" fill="#ffe9b8">储能 68%</text></g>
        <g><rect x="156" y="168" width="48" height="34" rx="10" fill="rgba(255,255,255,.14)" stroke="#ffb3b3" stroke-width="1.5"/>
          <text x="180" y="183" text-anchor="middle" font-size="13">🏠</text><text x="180" y="196" text-anchor="middle" font-size="8.5" fill="#ffd7d7">家庭负载</text></g>
        <g><rect x="36" y="170" width="52" height="30" rx="10" fill="rgba(126,226,168,.16)"/>
          <text x="62" y="189" text-anchor="middle" font-size="8.5" fill="#a9f0c6">余电上网</text></g>
      </svg>
      <div style="display:flex;justify-content:space-around;font-size:10.5px;opacity:.9;padding-top:6px">
        <span>发电 <b style="color:#7ee2a8">12.4 度</b></span><span>用电 <b style="color:#ffd166">18.6 度</b></span>
        <span>储电 <b style="color:#8ec5ff">6.2 度</b></span><span>自发自用率 <b>67%</b></span></div>
    </div>
    ${chartCard('用电量','eng_use',' 度','#1a73e8','bar')}
    ${chartCard('设备类型用电','eng_type','','','donut')}
    ${chartCard('光伏发电量','eng_gen',' 度','#34a853','bar')}
    ${chartCard('储能充放电','eng_store',' 度','#00b8a9','line')}
    <div class="ctl-card"><h3>节能收益</h3>
     <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:4px">
      <div style="background:#f0fbf4;border-radius:14px;padding:12px 14px">
       <div style="font-size:22px;font-weight:800;color:#0d5c34;font-variant-numeric:tabular-nums">86<small style="font-size:11px;font-weight:500;color:var(--ink2)"> 度</small></div>
       <div style="font-size:10.5px;color:var(--ink2);margin-top:4px">本月节能 · 光伏自用为主</div></div>
      <div style="background:#eef6ff;border-radius:14px;padding:12px 14px">
       <div style="font-size:22px;font-weight:800;color:#1a56c4;font-variant-numeric:tabular-nums">1,286<small style="font-size:11px;font-weight:500;color:var(--ink2)"> 度</small></div>
       <div style="font-size:10.5px;color:var(--ink2);margin-top:4px">累计节能 · 近 15 个月</div></div>
     </div>
     <div style="margin-top:12px;border-radius:16px;padding:14px 16px;background:linear-gradient(135deg,#0f5c34,#1e7a52);color:#fff;display:flex;align-items:center;gap:13px">
      <svg width="48" height="40" viewBox="0 0 48 40" fill="none" style="flex:0 0 auto"><path d="M14 3 6 17h4l-6 12h20l-6-12h4z" fill="#7ee2a8"/><rect x="12.4" y="29" width="3.2" height="7" rx="1.2" fill="#c98f5f"/><path d="M33 8 26 20h4l-5 10h16l-5-10h4z" fill="#4ae3c2"/><rect x="31.4" y="30" width="3.2" height="6" rx="1.2" fill="#c98f5f"/></svg>
      <div><b style="font-size:13.5px">相当于为地球种下 39 棵树</b>
       <p style="font-size:10.5px;opacity:.82;margin-top:4px;line-height:1.6">累计减碳约 707 kg CO₂（0.55 kg/度）<br>感谢你的每一次节能贡献 🌱</p></div>
     </div>
     <div style="margin-top:13px">
      <div style="display:flex;align-items:baseline;justify-content:space-between;font-size:12px;color:var(--ink2)"><span>累计节能约等于 <b style="color:#0d5c34;font-size:16px">¥771.60</b></span><span style="font-size:10px;color:var(--ink3)">按居民电价 0.6 元/度</span></div>
      <div style="height:8px;border-radius:99px;background:#eef0f3;margin-top:9px;overflow:hidden"><div style="width:92%;height:100%;border-radius:99px;background:linear-gradient(90deg,#34a853,#00b8a9)"></div></div>
      <div style="font-size:10.5px;color:var(--ink2);margin-top:7px">超过同城 <b style="color:#0d5c34">92%</b> 的邻居 · 本月已省 <b style="color:#0d5c34">¥51.60</b></div>
     </div>
    </div>
   </div>`,el=>bindCharts(el,defs));
}
