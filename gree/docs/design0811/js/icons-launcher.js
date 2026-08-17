/* ================= 图标库（SVG） ================= */
const IC={
 phone:c=>`<svg width="26" height="26" viewBox="0 0 24 24" fill="${c||'#fff'}"><path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z"/></svg>`,
 msg:c=>`<svg width="26" height="26" viewBox="0 0 24 24" fill="${c||'#fff'}"><path d="M12 3C6.5 3 2 6.9 2 11.7c0 2.7 1.5 5.1 3.8 6.7-.1 1-.5 2.1-1.3 3.1 0 0 2.6-.2 4.5-1.3 1 .3 2 .4 3 .4 5.5 0 10-3.9 10-8.7S17.5 3 12 3z"/></svg>`,
 chrome:c=>`<svg width="26" height="26" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="${c||'#fff'}"/><circle cx="12" cy="12" r="4.2" fill="#1a73e8"/><path d="M12 2a10 10 0 0 1 8.7 5H12a5 5 0 0 0-4.6 3L3.4 5.9A10 10 0 0 1 12 2z" fill="#ea4335"/><path d="M20.7 7A10 10 0 0 1 12 22l4-6.9A5 5 0 0 0 12 7h8.7z" fill="#fbbc05"/><path d="M12 22A10 10 0 0 1 3.3 7l4 6.9A5 5 0 0 0 12 17a5 5 0 0 0 1.9-.4L8 22z" fill="#34a853" transform="translate(4 0) scale(0.67)"/></svg>`,
 cam:c=>`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="${c||'#fff'}" stroke-width="1.9"><path d="M4 8h3l2-2.5h6L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.6"/></svg>`,
 photo:c=>`<svg width="26" height="26" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="${c||'#fff'}" stroke-width="2"/><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" stroke="${c||'#fff'}" stroke-width="1.2" opacity=".6"/><circle cx="12" cy="12" r="3.4" fill="${c||'#fff'}"/></svg>`,
 set:c=>`<svg width="26" height="26" viewBox="0 0 24 24" fill="${c||'#fff'}"><path d="M19.4 13a7.6 7.6 0 0 0 0-2l2-1.5-2-3.4-2.3 1a7.7 7.7 0 0 0-1.7-1L15 3.7H9L8.6 6a7.7 7.7 0 0 0-1.7 1l-2.3-1-2 3.4L4.6 11a7.6 7.6 0 0 0 0 2l-2 1.5 2 3.4 2.3-1a7.7 7.7 0 0 0 1.7 1L9 20.3h6l.4-2.2a7.7 7.7 0 0 0 1.7-1l2.3 1 2-3.4zM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7z"/></svg>`,
 play:c=>`<svg width="26" height="26" viewBox="0 0 24 24"><path d="M5 3.8v16.4L19.4 12z" fill="${c||'#fff'}"/></svg>`,
 map:c=>`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="${c||'#fff'}" stroke-width="1.9"><path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>`,
 cal:c=>`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="${c||'#fff'}" stroke-width="1.9"><rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 9.5h17M8 3v3.5M16 3v3.5"/></svg>`,
 clock:c=>`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="${c||'#fff'}" stroke-width="1.9"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.4l3.4 2"/></svg>`,
 note:c=>`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="${c||'#fff'}" stroke-width="1.9"><path d="M5 4h11l3 3v13H5z"/><path d="M9 10h6M9 13.5h6M9 17h4"/></svg>`,
 gree:c=>`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="${c||'#fff'}" stroke-width="1.9"><path d="M3.5 11.5 12 4.5l8.5 7"/><path d="M6.5 10v9h11v-9"/><path d="M10 19v-4.5h4V19"/></svg>`,
 mail:c=>`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="${c||'#fff'}" stroke-width="1.9"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>`,
 washer:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${c||'#fff'}" stroke-width="1.8"><rect x="4" y="2.5" width="16" height="19" rx="3"/><circle cx="12" cy="13.5" r="5.5"/><path d="M8 13.5c1.5-1.6 2.5 1.6 4 0s2.5 1.6 4 0" /><circle cx="7" cy="5.5" r="1" fill="${c||'#fff'}" stroke="none"/></svg>`,
 oven:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${c||'#fff'}" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 8.5h18"/><circle cx="7" cy="6.3" r=".9" fill="${c||'#fff'}" stroke="none"/><circle cx="10.5" cy="6.3" r=".9" fill="${c||'#fff'}" stroke="none"/><rect x="7" y="12" width="10" height="4.5" rx="1.5"/></svg>`,
 ac:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${c||'#fff'}" stroke-width="1.8"><rect x="2.5" y="4" width="19" height="8" rx="3"/><path d="M6 9h12" stroke-linecap="round"/><path d="M8 15.5c-.8 1.2-.8 2.4 0 3.6M12 15.5c-.8 1.2-.8 2.4 0 3.6M16 15.5c-.8 1.2-.8 2.4 0 3.6" stroke-linecap="round"/></svg>`,
 light:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${c||'#fff'}" stroke-width="1.8"><path d="M12 3a6 6 0 0 1 3.5 10.9c-.7.5-1 1.1-1 2.1h-5c0-1-.3-1.6-1-2.1A6 6 0 0 1 12 3z"/><path d="M9.5 19h5M10.5 21.5h3" stroke-linecap="round"/></svg>`,
 fridge:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${c||'#fff'}" stroke-width="1.8"><rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M6 10h12M9 5.5v2.5M9 13v3" stroke-linecap="round"/></svg>`,
 rice:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${c||'#fff'}" stroke-width="1.8"><path d="M4 11h16v3a8 8 0 0 1-16 0z"/><path d="M8 7c1-1.5 1-3 0-4.5M12.5 7c1-1.5 1-3 0-4.5M17 7c1-1.5 1-3 0-4.5" stroke-linecap="round" transform="translate(-1.5 2)"/></svg>`,
 gas:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${c||'#fff'}" stroke-width="1.8"><path d="M12 3c2.5 3.2 6 5.6 6 9.5a6 6 0 0 1-12 0c0-2 1-3.8 2.4-5.4.4 1.2 1.2 2 2.1 2.4-.4-2.5.2-4.8 1.5-6.5z"/></svg>`,
 water:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${c||'#fff'}" stroke-width="1.8"><path d="M12 3s6.5 7 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10 12 3 12 3z"/></svg>`,
 dehum:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${c||'#fff'}" stroke-width="1.8"><rect x="6" y="3" width="12" height="18" rx="3"/><path d="M9 7.5h6" stroke-linecap="round"/><path d="M12 11s2.6 3 2.6 4.8a2.6 2.6 0 0 1-5.2 0C9.4 14 12 11 12 11z"/></svg>`,
 fresh:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${c||'#fff'}" stroke-width="1.8"><circle cx="12" cy="12" r="8.5"/><path d="M12 12 12 4.5M12 12l6.5 3.8M12 12l-6.5 3.8" stroke-linecap="round"/><circle cx="12" cy="12" r="1.6" fill="${c||'#fff'}" stroke="none"/></svg>`,
 cam2:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${c||'#fff'}" stroke-width="1.8"><rect x="2.5" y="7" width="13" height="10" rx="3"/><path d="M15.5 10.5 21 7.5v9l-5.5-3z"/></svg>`,
 speaker:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${c||'#fff'}" stroke-width="1.8"><path d="M4 9.5v5h3.5L13 19V5L7.5 9.5z"/><path d="M16 9a4.3 4.3 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11" stroke-linecap="round"/></svg>`,
 hood:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${c||'#fff'}" stroke-width="1.8" stroke-linecap="round"><path d="M7 3h10v5H7z"/><path d="M4 8h16l3 6H1z" transform="translate(1.5 0) scale(0.875)"/><path d="M5 17.5c.8 1 .8 2 0 3M12 17.5c.8 1 .8 2 0 3M19 17.5c.8 1 .8 2 0 3"/></svg>`,
 dish:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${c||'#fff'}" stroke-width="1.8" stroke-linecap="round"><rect x="3.5" y="3" width="17" height="18" rx="3"/><path d="M3.5 7.5h17"/><circle cx="7" cy="5.2" r=".9" fill="${c||'#fff'}" stroke="none"/><circle cx="12" cy="14" r="4.2"/><path d="M12 11.5a2.5 2.5 0 0 1 2.5 2.5"/></svg>`,
 heater:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${c||'#fff'}" stroke-width="1.8"><rect x="5" y="3" width="14" height="12" rx="3"/><path d="M9 18c-.7 1-.7 2 0 3M12.5 18c-.7 1-.7 2 0 3M16 18c-.7 1-.7 2 0 3" stroke-linecap="round"/><circle cx="12" cy="9" r="2.4"/></svg>`,
 eheater:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${c||'#fff'}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
 purifier:c=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${c||'#fff'}" stroke-width="1.8" stroke-linecap="round"><rect x="7" y="2.5" width="10" height="19" rx="4"/><path d="M10.5 7h3M10.5 10h3"/><path d="M12 14.2c-1.5 1-1.5 2.9 0 3.9 1.5-1 1.5-2.9 0-3.9z"/></svg>`,
};
const MINI_IC={
 ac:`<svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M4 3h16a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zm2.5 4.5h11a.9.9 0 0 1 0 1.8h-11a.9.9 0 0 1 0-1.8z"/><path d="M8 15.6c-1 1.2-1.6 2.2-1.6 3.1a1.6 1.6 0 0 0 3.2 0c0-.9-.6-1.9-1.6-3.1zm4 0c-1 1.2-1.6 2.2-1.6 3.1a1.6 1.6 0 0 0 3.2 0c0-.9-.6-1.9-1.6-3.1zm4 0c-1 1.2-1.6 2.2-1.6 3.1a1.6 1.6 0 0 0 3.2 0c0-.9-.6-1.9-1.6-3.1z"/></svg>`,
 light:`<svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M12 2a6 6 0 0 1 3.3 11c-.7.5-1.1 1.2-1.3 2h-4c-.2-.8-.6-1.5-1.3-2A6 6 0 0 1 12 2zm-2 14.5h4v.7a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.7zm1 4h2v.5a1 1 0 0 1-1 1 1 1 0 0 1-1-1v-.5z"/></svg>`,
 fridge:`<svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path fill-rule="evenodd" d="M8 2h8a2.5 2.5 0 0 1 2.5 2.5v15A2.5 2.5 0 0 1 16 22H8a2.5 2.5 0 0 1-2.5-2.5v-15A2.5 2.5 0 0 1 8 2zm1.2 2.8a.9.9 0 0 1 .9.9v2a.9.9 0 0 1-1.8 0v-2a.9.9 0 0 1 .9-.9zM5.5 11h13v1.8h-13V11zm3.7 3a.9.9 0 0 1 .9.9v2.6a.9.9 0 0 1-1.8 0v-2.6a.9.9 0 0 1 .9-.9z"/></svg>`,
 washer:`<svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path fill-rule="evenodd" d="M6 2h12a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3zm1 2.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm10.5 1h-6a.8.8 0 0 1 0-1.6h6a.8.8 0 0 1 0 1.6zM12 9a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 1.8a2.7 2.7 0 1 1 0 5.4 2.7 2.7 0 0 1 0-5.4z"/></svg>`,
};
const TYPE_META={
 ac:{n:'空调',c:'#1a73e8'},light:{n:'灯光',c:'#f29900'},fridge:{n:'冰箱',c:'#00b8a9'},
 washer:{n:'洗衣机',c:'#7c4dff'},oven:{n:'蒸烤箱',c:'#e54545'},rice:{n:'电饭煲',c:'#f29900'},
 gas:{n:'燃气灶',c:'#e54545'},water:{n:'净水器',c:'#00a8c6'},dehum:{n:'除湿机',c:'#4a90d9'},
 fresh:{n:'新风机',c:'#34a853'},cam:{n:'摄像头',c:'#5f6368'},speaker:{n:'智能音箱',c:'#7c4dff'},heater:{n:'热水器',c:'#e54545'},eheater:{n:'电暖器',c:'#f2641d'},
 hood:{n:'油烟机',c:'#f29900'},dish:{n:'洗碗机',c:'#4a90d9'},purifier:{n:'空气净化器',c:'#2fbf8f'}};
function devIcon(t,color){return (IC[t]||IC.ac)(color)}

/* ================= 桌面 ================= */
const APPS=[
 {n:'电话',ic:IC.phone(),bg:'#34a853'},{n:'信息',ic:IC.msg(),bg:'#1a73e8'},
 {n:'浏览器',ic:IC.chrome(),bg:'#fff'},{n:'相机',ic:IC.cam(),bg:'#3c4043'},
 {n:'相册',ic:IC.photo(),bg:'#7c4dff'},{n:'设置',ic:IC.set(),bg:'#5f6368'},
 {n:'Play 商店',ic:IC.play(),bg:'#00b8a9'},{n:'地图',ic:IC.map(),bg:'#e54545'},
 {n:'日历',ic:IC.cal(),bg:'#fff',dark:'#1a73e8'},{n:'时钟',ic:IC.clock(),bg:'#202124'},
 {n:'备忘录',ic:IC.note(),bg:'#f29900'},{n:'邮件',ic:IC.mail(),bg:'#00a8c6'},
];
function renderLauncher(){
  if(MODE==='neo'){$('#launcher').classList.add('neo');renderNeo();return}
  $('#launcher').classList.remove('neo');
  const grid=APPS.map(a=>`<div class="app" data-app="${a.n}"><div class="ic" style="background:${a.bg}">${a.dark?a.ic.replaceAll('#fff',a.dark):a.ic}</div><span>${a.n}</span></div>`).join('');
  const dock=[APPS[0],APPS[1],APPS[2],APPS[3]].map(a=>`<div class="app" data-app="${a.n}"><div class="ic" style="background:${a.bg}">${a.ic}</div></div>`).join('')
    +`<div class="app" id="dockGree"><div class="ic" style="background:linear-gradient(135deg,#1a73e8,#00b8a9)">${IC.gree()}</div></div>`;
  const SNOW='<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#d8ecff" stroke-width="1.8" stroke-linecap="round"><path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9M12 3l-2 2.4M12 3l2 2.4M12 21l-2-2.4M12 21l2-2.4"/></svg>';
  $('#launcher').innerHTML=`<div class="ln-inner">
    <div class="clock-widget"><div class="cw-time"></div><div class="cw-date"></div><div class="cw-weather">珠海 · 多云 31°C · 湿度 82%</div></div>
    <div class="life-widget" id="lifeWidget">
      <div class="lw-h"><span class="lw-t">智慧生活</span><button class="lw-more" id="lwMore">设备 4 · 在线 4 ${svgArrow}</button></div>
      <div class="lw-grid">
        <div class="lw-cell" id="lwAc"><h4>空调</h4><p>客厅 | 制冷</p><img class="lw-img tall" src="img/lw_ac.png"><div class="lw-st"><div class="lw-num"><b>26°C</b>${SNOW}</div><small>风速 自动</small></div></div>
        <div class="lw-cell" id="lwFr"><h4>冰箱</h4><p>厨房 | 冷藏</p><img class="lw-img tall" src="img/lw_fridge.png"><div class="lw-st"><div class="lw-num"><b>5°/-18°</b></div><small>冷藏 / 冷冻</small></div></div>
        <div class="lw-cell" id="lwWm"><h4>洗衣机</h4><p>阳台 | 洗涤</p><img class="lw-img tall" src="img/lw_washer.png"><div class="lw-st"><small>剩余</small><b class="lw-time" id="lwWashLeft">${fmt(S.washer.left)}</b><small id="lwWashSub">标准洗</small></div></div>
        <div class="lw-cell other" id="lwOther"><h4>其他电器</h4><p>2 台在线</p><img class="lw-img" src="img/lw_other.png"><span class="lw-go">${svgArrow}</span></div>
      </div>
    </div>
    <div class="app-grid">${grid}</div>
    <div class="ln-dots"><i></i><i class="on"></i></div>
    <div class="dock">${dock}</div></div>`;
  $('#dockGree').onclick=()=>showGree();
  $$('#launcher [data-app]').forEach(el=>el.onclick=()=>toast(`「${el.dataset.app}」为系统占位应用`));
  $('#lwAc').onclick=()=>openDeviceCtl(DEVICES.find(d=>d.id==='ac1'));
  $('#lwFr').onclick=()=>openDeviceCtl(DEVICES.find(d=>d.id==='fr1'));
  $('#lwWm').onclick=()=>openDeviceCtl(DEVICES.find(d=>d.id==='wm1'));
  $('#lwMore').onclick=openLifeWidgetMore;
  $('#lwOther').onclick=openLifeWidgetMore;
}
function tickWidget(){
  const wl=$('#lwWashLeft');if(!wl)return;
  wl.textContent=fmt(S.washer.left);
}
function openLifeWidgetMore(){
  const w=$('#lifeWidget');if(!w||$('#lifeWidget').dataset.exp)return;
  w.dataset.exp='1';
  const scr=$('#screen'),sr=scr.getBoundingClientRect(),wr=w.getBoundingClientRect();
  const on=DEVICES.filter(d=>d.on).length;
  const brief=d=>{
    if(d.type==='ac')return d.on?`${d.mode} · ${d.t}°C`:'已关闭';
    if(d.type==='light')return d.on?`亮度 ${d.bri}%`:'已关闭';
    if(d.type==='fridge')return '冷藏 5° · 冷冻 -18°';
    if(d.type==='washer')return S.washer.running?`${S.washer.mode} · 剩余 ${fmt(S.washer.left)}`:'已暂停';
    if(d.type==='oven')return S.oven.cooking?`${S.oven.dish} · 剩余 ${fmt(S.oven.left)}`:'待机';
    if(d.type==='hood')return d.on?`${d.gear||2} 档运行`:'已关闭';
    if(d.type==='heater')return d.on?'45°C 保温中':'已关闭';
    return d.on?'运行中':'已关闭';
  };
  const rows=DEVICES.map((d,i)=>{const meta=TYPE_META[d.type]||{c:'#9aa0a6'};
    return `<div class="lwx-row" data-lwdev="${d.id}" style="transition-delay:${120+i*26}ms"><span class="lx-ic" style="background:${meta.c}">${devIcon(d.type)}</span><div style="min-width:0"><h5>${d.name}</h5><p>${d.room} · ${brief(d)}</p></div><span class="lx-st"><b style="color:${d.on?'#7fe6a6':'rgba(255,255,255,.45)'}">${d.on?'在线':'离线'}</b>›</span></div>`}).join('');
  const gridClone=w.querySelector('.lw-grid').cloneNode(true);
  gridClone.removeAttribute('id');
  gridClone.querySelectorAll('[id]').forEach(e=>e.removeAttribute('id'));
  const mask=document.createElement('div');mask.className='lwx-mask';
  const panel=document.createElement('div');panel.className='life-widget lwx-panel';
  panel.innerHTML=`<div class="lw-h"><span class="lw-t">智慧生活</span><button class="lw-more" data-lwx-x>全部设备 ${DEVICES.length} · 在线 ${on} · 收起 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 15l6-6 6 6"/></svg></button></div>`;
  const gv=document.createElement('div');gv.className='lwx-gridview';gv.appendChild(gridClone);
  const lv=document.createElement('div');lv.className='lwx-listview';lv.innerHTML=rows;
  panel.appendChild(gv);panel.appendChild(lv);
  scr.appendChild(mask);scr.appendChild(panel);
  const r0={left:wr.left-sr.left,top:wr.top-sr.top,width:wr.width,height:wr.height};
  const r1={left:10,top:Math.round(sr.height*.12),width:sr.width-20,height:Math.round(sr.height*.78)};
  const setR=r=>{panel.style.left=r.left+'px';panel.style.top=r.top+'px';panel.style.width=r.width+'px';panel.style.height=r.height+'px';};
  setR(r0);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    w.style.visibility='hidden';
    mask.classList.add('show');panel.classList.add('on');setR(r1);
  }));
  let closed=false;
  const close=(after)=>{
    if(closed)return;closed=true;
    mask.classList.remove('show');panel.classList.remove('on');setR(r0);
    setTimeout(()=>{mask.remove();panel.remove();w.style.visibility='';delete w.dataset.exp;if(after)after();},480);
  };
  mask.onclick=()=>close();
  panel.querySelector('[data-lwx-x]').onclick=()=>close();
  panel.querySelectorAll('[data-lwdev]').forEach(rw=>rw.onclick=()=>{
    const d=DEVICES.find(x=>x.id===rw.dataset.lwdev);
    close(()=>openDeviceCtl(d));
  });
}
setInterval(()=>{S.widgetIdx++;},5000);
function tickRings(){
  const rw=$('#ringWasher');if(rw)rw.textContent=fmt(S.washer.left);
  const ro=$('#ringOven');if(ro)ro.textContent=fmt(S.oven.left);
  const rr=$('#ringRice');if(rr&&S.rice.cooking)rr.textContent=fmt(S.rice.left);
  const rsi=$('#rcStageB');if(rsi&&S.rice.cooking){const _si=rcStageInfo();rsi.textContent=_si.n+' · '+_si.t;}
  const reta=$('#rcEta');if(reta&&S.rice.cooking&&S.rice.left>0)reta.textContent='预计 '+rcEta()+' 完成';
  const rd=$('#ringDish');if(rd&&S.dish.cooking)rd.textContent=fmt(S.dish.left);
  const wl=$('#wardCareLeft');if(wl){const a=S.washer.running&&S.washer.left>0;wl.textContent=a?fmt(S.washer.left):'--:--';}
  const nw=$('#neoWash');if(nw)nw.textContent=fmt(S.washer.left);
  const no=$('#neoOven');if(no)no.textContent=fmt(S.oven.left);
  const nb=$('#neoWashBar');if(nb)nb.style.width=Math.max(0,S.washer.left/(28*60)*100)+'%';
  const ob=$('#neoOvenBar');if(ob)ob.style.width=Math.max(0,S.oven.left/(5*60)*100)+'%';
  const nws=$('#neoWashSub');if(nws&&S.washer.left<=0&&S.washer.running)nws.textContent='已完成 · 已提醒晾晒';
  const nos=$('#neoOvenSub');if(nos&&S.oven.left<=0&&S.oven.cooking)nos.textContent='已完成 · 60° 保温中';
  const nr=$('#neoRice');if(nr)nr.textContent=S.rice.cooking&&S.rice.left>0?fmt(S.rice.left):'保温中';
  const nrb=$('#neoRiceBar');if(nrb)nrb.style.width=Math.max(0,S.rice.left/(35*60)*100)+'%';
  const nrs=$('#neoRiceSub');if(nrs&&S.rice.left<=0&&S.rice.cooking)nrs.textContent='已完成 · 保温中';
  const dwL=$('#ndWashLeft');if(dwL)dwL.textContent=S.washer.running&&S.washer.left>0?fmt(S.washer.left):'已完成';
  const doL=$('#ndOvenLeft');if(doL)doL.textContent=S.oven.cooking&&S.oven.left>0?fmt(S.oven.left):'保温中';
  /* 首屏电器大卡 */
  const ac1=DEVICES.find(d=>d.id==='ac1');
  const vaT=$('#ndvAcT');if(vaT)vaT.textContent=ac1.t+'°';
  const vaS=$('#ndvAcS');if(vaS)vaS.textContent=devBrief(ac1);
  const vwT=$('#ndvWashT');if(vwT)vwT.textContent=S.washer.running&&S.washer.left>0?fmt(S.washer.left):'已完成';
  const vwS=$('#ndvWashS');if(vwS)vwS.textContent=S.washer.running&&S.washer.left>0?S.washer.mode+' · 剩余':'已提醒晾晒';
  const vwB=$('#ndvWashBar');if(vwB)vwB.style.width=Math.max(0,S.washer.left/(28*60)*100)+'%';
  const vrT=$('#ndvRiceT');if(vrT)vrT.textContent=S.rice.cooking&&S.rice.left>0?fmt(S.rice.left):'保温中';
  const vrS=$('#ndvRiceS');if(vrS)vrS.textContent=S.rice.cooking&&S.rice.left>0?S.rice.dish+' · 剩余':'保温 60°';
  const vrB=$('#ndvRiceBar');if(vrB)vrB.style.width=Math.max(0,S.rice.left/(35*60)*100)+'%';
}

/* ================= 通知栏 ================= */
const PUSH=[
 {t:'安全提醒',p:'检测到已离家但燃气灶未关，请注意安全',time:'7月22日 19:00',c:'#e54545'},
 {t:'完成提醒',p:'蒸烤箱正在蒸鲈鱼，还剩 5 分钟完成',time:'7月22日 18:55',c:'#f29900'},
 {t:'完成提醒',p:'米洗好了，是不是忘记开始煮饭啦',time:'7月22日 18:00',c:'#f29900'},
 {t:'完成提醒',p:'洗衣机混合洗正在进行中，剩余 28 分钟结束',time:'7月22日 17:32',c:'#7c4dff'},
 {t:'安全提醒',p:'冰箱门未关',time:'7月22日 15:01',c:'#e54545'},
];
function renderShade(){
  $('#shade').innerHTML=`<div class="sh-time"></div><div class="sh-date"></div>
   <div class="sh-list">${PUSH.map(n=>`<div class="sh-item"><div class="si-ic" style="background:${n.c}">${IC.gree()}</div>
    <div><h5>格力+ · ${n.t}</h5><p>${n.p}</p><time>${n.time}</time></div></div>`).join('')}</div>
   <div class="sh-clear" id="shClear">清除全部通知</div>`;
  $('#shClear').onclick=()=>{$('.sh-list').innerHTML='<div style="text-align:center;color:rgba(255,255,255,.55);font-size:12px;padding:40px 0">暂无新通知</div>';toast('已清除全部通知')};
}
function toggleShade(open){
  const sh=$('#shade');const will=open===undefined?!sh.classList.contains('open'):open;
  sh.classList.toggle('open',will);
}
$('#shade').addEventListener('click',()=>toggleShade(false));

/* ================= 手势 ================= */
function showGree(){toggleShade(false);$('#gree').classList.add('on');$('#launcher').classList.add('off');
  $$('.ln-dots i').forEach((d,i)=>d.classList.toggle('on',i===0));if(!stackOpen.length)setSysTheme(false)}
function showLauncher(){toggleShade(false);$('#gree').classList.remove('on');$('#launcher').classList.remove('off');
  $$('.ln-dots i').forEach((d,i)=>d.classList.toggle('on',i===1));if(!stackOpen.length)setSysTheme(MODE==='neo'?neoPg===1:true)}
let gS=null;
const scr=$('#screen');
scr.addEventListener('pointerdown',e=>{gS={x:e.clientX,y:e.clientY,t:Date.now()}});
scr.addEventListener('pointerup',e=>{
  if(!gS)return;const dx=e.clientX-gS.x,dy=e.clientY-gS.y;gS=null;
  if(MODE==='neo')return;
  if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.6){
    if(dx<0&&!stackOpen.length&&$('#gree').classList.contains('on'))showLauncher();
    if(dx>0&&!stackOpen.length&&!$('#gree').classList.contains('on'))showGree();
  }
});
$('#statusbar').addEventListener('click',()=>toggleShade());
/* 长按电源键唤醒 Claw 助手（直接进入语音输入） */
(function(){
  const pk=document.querySelector('.phone-shell .side-key');if(!pk)return;
  let pkT=null,pkFired=false;
  pk.addEventListener('pointerdown',e=>{e.preventDefault();pkFired=false;pk.style.background='#7c4dff';
    pkT=setTimeout(()=>{pkT=null;pkFired=true;pk.style.background='';openClaw(null,true);toast('已通过电源键唤醒 Claw 助手');},600);});
  ['pointerup','pointerleave','pointercancel'].forEach(ev=>pk.addEventListener(ev,()=>{
    if(pkT){clearTimeout(pkT);pkT=null;}
    pk.style.background='';}));
})();
