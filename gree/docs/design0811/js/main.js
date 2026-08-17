/* ================= 初始化 ================= */
/* 图片兜底：任何 <img> 加载失败时隐藏裂图并给浅灰占位，不影响布局 */
document.addEventListener('error',e=>{const t=e.target;
  if(t&&t.tagName==='IMG'&&!t.dataset.fbk){t.dataset.fbk='1';t.style.opacity='0';t.style.background='#eef0f3';t.style.borderRadius='12px'}
},true);
/* 衣橱倒计时（演示静态递减） */
let wardLeft=18*60;
setMode(MODE);renderGree();renderShade();tickClock();
$('#btnModeClassic').onclick=()=>setMode('classic');
$('#btnModeNeo').onclick=()=>setMode('neo');
$('#btnFrame').onclick=()=>{
  const sh=$('#phoneShell');sh.classList.toggle('frame-off');
  $('#btnFrameT').textContent=sh.classList.contains('frame-off')?'显示手机框':'隐藏手机框';};
$('#btnGree').onclick=()=>{greeV2=false;greeV3=false;renderGree();showGree();};
$('#btnGreeV2').onclick=()=>{greeV2=true;greeV3=false;renderGree();showGree();};
$('#btnGreeV3').onclick=()=>{greeV3=true;greeV2=false;renderGree();showGree();};
$('#btnHome').onclick=()=>goHome();
$('#btnShade').onclick=()=>toggleShade(true);
$('#btnNeoM1').onclick=()=>{if(MODE==='neo'){while(stackOpen.length)closePage();neoSetPg(0);}};
$('#btnNeoCC').onclick=()=>{if(MODE==='neo')openNeoCC();};
/* ---------- 栖 OS 手势条：轻点/快速上划=回桌面 · 按住上划=任务切换 ---------- */
(function(){
  const gb=$('#neoGbar');let gs=null,holdT=null;
  gb.addEventListener('pointerdown',e=>{if(MODE!=='neo')return;e.preventDefault();
    gs={y:e.clientY,t:Date.now(),held:false};
    holdT=setTimeout(()=>{if(gs){gs.held=true;openNeoSwitcher();}},430);});
  const end=e=>{if(!gs)return;clearTimeout(holdT);
    const dy=e.clientY-gs.y,dt=Date.now()-gs.t,held=gs.held;gs=null;
    if(held)return;
    if(dy<-30||dt<260)neoGoHome();};
  gb.addEventListener('pointerup',end);
  gb.addEventListener('pointercancel',()=>{clearTimeout(holdT);gs=null;});
})();
/* ---------- 右上角下拉：控制中心热区 ---------- */
(function(){
  const hot=$('#ccHot');let hs=null;
  hot.addEventListener('pointerdown',e=>{if(MODE!=='neo')return;e.preventDefault();
    hs={y:e.clientY,t:Date.now()};});
  hot.addEventListener('pointermove',e=>{if(!hs)return;
    if(e.clientY-hs.y>30){hs=null;openNeoCC();}});
  const end=e=>{if(!hs)return;const dt=Date.now()-hs.t,dy=e.clientY-hs.y;hs=null;
    if(dt<350&&dy>=-8)openNeoCC();};
  hot.addEventListener('pointerup',end);
  hot.addEventListener('pointercancel',()=>{hs=null;});
})();
/* ---------- 左上角下拉：通知栏热区 ---------- */
(function(){
  const hot=$('#ntfHot');let hs=null;
  const open=()=>{closeNeoCC();toggleShade(true);};
  hot.addEventListener('pointerdown',e=>{if(MODE!=='neo')return;e.preventDefault();
    hs={y:e.clientY,t:Date.now()};});
  hot.addEventListener('pointermove',e=>{if(!hs)return;
    if(e.clientY-hs.y>30){hs=null;open();}});
  const end=e=>{if(!hs)return;const dt=Date.now()-hs.t,dy=e.clientY-hs.y;hs=null;
    if(dt<350&&dy>=-8)open();};
  hot.addEventListener('pointerup',end);
  hot.addEventListener('pointercancel',()=>{hs=null;});
})();
setInterval(()=>{if(wardLeft>0)wardLeft--;const e=$('#wardLeft');if(e)e.textContent=fmt(wardLeft);
  const ne=$('#neoWardLeft');if(ne)ne.textContent=fmt(wardLeft)},1000);
setSysTheme(MODE==='neo'?neoPg===1:true);
