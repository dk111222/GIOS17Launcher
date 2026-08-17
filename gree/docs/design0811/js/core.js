/* ================= 基础 ================= */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let toastT=null;
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),1800)}
function fmt(s){s=Math.max(0,Math.round(s));return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')}
function seeded(key){let h=2166136261;for(const c of key)h=(h^c.charCodeAt(0))*16777619>>>0;return()=>{h=(h*1664525+1013904223)>>>0;return h/4294967296}}
const svgArrow='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 5l7 7-7 7"/></svg>';
const svgBack='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 5l-7 7 7 7"/></svg>';

/* ================= 全局状态 ================= */
const S={
  washer:{mode:'混合洗',left:28*60,running:true},
  oven:{dish:'清蒸鲈鱼',left:5*60,running:true,cooking:true},
  rice:{dish:'柴火饭',left:35*60,running:true,cooking:true},
  dish:{mode:'',left:0,running:false,cooking:false},
  widgetIdx:0,
  airRoom:'全屋',
  homeIdx:0,
  aiAir:{客厅:true,主卧:true,儿童房:false,厨房:false,书房:false,阳台:false,卫生间:false,餐厅:false},
  roomT:{客厅:26,主卧:26,儿童房:27,厨房:28,书房:26,阳台:29,卫生间:27,餐厅:27},
  roomH:{客厅:55,主卧:52,儿童房:50,厨房:60,书房:50,阳台:66,卫生间:70,餐厅:56},
};
setInterval(()=>{
  if(S.washer.running&&S.washer.left>0)S.washer.left--;
  if(S.oven.running&&S.oven.left>0)S.oven.left--;
  if(S.rice.running&&S.rice.left>0)S.rice.left--;
  if(S.dish.running&&S.dish.left>0)S.dish.left--;
  tickClock();tickWidget();tickRings();
},1000);

/* ================= 状态栏 / 时钟 ================= */
function tickClock(){
  const d=new Date(),hh=String(d.getHours()).padStart(2,'0'),mm=String(d.getMinutes()).padStart(2,'0');
  const sb=$('#statusbar');
  const inGree=typeof stackOpen!=='undefined'&&stackOpen.some(r=>r.neoHome);
  const wx=`<span class="sb-wx"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M7 18a4.5 4.5 0 0 1-.4-9A6 6 0 0 1 18 10a3.6 3.6 0 0 1-1 7z"/></svg>珠海 多云 31°</span>`;
  sb.innerHTML=`<span class="sb-left"><span>${hh}:${mm}</span>${inGree?wx:''}</span><span class="sb-right">
    <svg width="16" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="7" width="3" height="5" rx="1"/><rect x="5" y="5" width="3" height="7" rx="1"/><rect x="10" y="2.5" width="3" height="9.5" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
    <svg width="16" height="12" viewBox="0 0 24 18" fill="currentColor"><path d="M12 15.6 9.2 12.8a4 4 0 0 1 5.6 0L12 15.6zm-6-6L3.8 7.4a11.7 11.7 0 0 1 16.4 0L18 9.6a8.5 8.5 0 0 0-12 0zM12 18l-2.2-2.2"/></svg>
    <span class="sb-batt"><i></i></span></span>`;
  const wk=['周日','周一','周二','周三','周四','周五','周六'][d.getDay()];
  const ct=$('.clock-widget .cw-time');if(ct){ct.textContent=`${hh}:${mm}`;
    $('.clock-widget .cw-date').textContent=`${d.getMonth()+1}月${d.getDate()}日 ${wk}`;}
  const st=$('.shade .sh-time');if(st){st.textContent=`${hh}:${mm}`;
    $('.shade .sh-date').textContent=`${d.getMonth()+1}月${d.getDate()}日 ${wk}`;}
  const nt=$('#neoTime');if(nt){nt.textContent=`${hh}:${mm}`;
    const nd=$('#neoDate');if(nd)nd.textContent=`${d.getMonth()+1}月${d.getDate()}日 ${wk}`;}
  const nt2=$('#ndTime');if(nt2){nt2.textContent=`${hh}:${mm}`;
    const nd2=$('#ndDate');if(nd2)nd2.textContent=`${d.getMonth()+1}月${d.getDate()}日 ${wk}`;}
  const nct=$('#npClockTime');if(nct)nct.textContent=`${hh}:${mm}:${String(d.getSeconds()).padStart(2,'0')}`;
}

/* ================= 导航 ================= */
let stackOpen=[];
function setSysTheme(dark){
  $('#statusbar').className='statusbar '+(dark?'sb-light':'sb-dark');
}
function openPage(html,bind,dark){
  const el=document.createElement('div');el.className='stack-page';
  el.innerHTML=html;$('#stack').appendChild(el);
  requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('in')));
  const rec={el,dark:!!dark};stackOpen.push(rec);setSysTheme(!!dark);
  if(bind)bind(el);
  el.querySelectorAll('[data-back]').forEach(b=>b.onclick=()=>closePage());
  return el;
}
function closePage(){
  const rec=stackOpen.pop();if(!rec)return;
  rec.el.classList.remove('in');
  if(rec.neoHome)rec.el.classList.add('zoomout');
  else rec.el.classList.add('out');
  setTimeout(()=>rec.el.remove(),380);
  const top=stackOpen[stackOpen.length-1];
  setSysTheme(top?top.dark:($('#gree').classList.contains('on')?false:(MODE==='neo'?neoPg===1:true)));
  tickClock();
}
function goHome(){while(stackOpen.length)closePage();showLauncher();}

/* ================= 弹窗（磨砂遮罩） ================= */
function openModal(inner,opts={}){
  const m=document.createElement('div');
  m.className='mask'+(opts.center?' center':'');
  m.innerHTML=opts.center?`<div class="dialog">${inner}</div>`:`<div class="sheet"><div class="grab"></div>${inner}</div>`;
  $('#modalRoot').appendChild(m);
  requestAnimationFrame(()=>requestAnimationFrame(()=>m.classList.add('show')));
  m.addEventListener('click',e=>{if(e.target===m)closeModal(m)});
  m.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>closeModal(m));
  return m;
}
function closeModal(m){m=m||$('#modalRoot .mask:last-child');if(!m)return;m.classList.remove('show');setTimeout(()=>m.remove(),300)}
function closeAllModals(){$$('#modalRoot .mask').forEach(m=>closeModal(m))}
/* ================= 内嵌网页（手机内打开） ================= */
function openWebView(url,title){
  openPage(`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button><h1>${title||'董明珠店'}</h1><span class="pg-extra" id="wvExt">外部打开</span></div>
   <div style="flex:1;position:relative;background:#fff">
    <div id="wvLoad" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;color:var(--ink2);font-size:12px;z-index:2;background:#fff"><div class="wv-spin"></div>正在加载 fmall.gree.com…</div>
    <iframe src="${url}" style="width:100%;height:100%;border:none;position:relative;z-index:1" onload="setTimeout(()=>document.getElementById('wvLoad')?.remove(),600)"></iframe>
   </div>`,el=>{
    el.querySelector('#wvExt').onclick=()=>window.open(url,'_blank');
  });
}
