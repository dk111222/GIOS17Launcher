/* ================= 切换家庭 ================= */
function openHomeSwitch(){
  const cur=S.homeIdx||0;
  const m=openModal(`<div class="ac-sheet-t">切换家庭</div>
   <p style="font-size:11px;color:var(--ink3);text-align:center;margin:-6px 0 8px">切换后，负一屏将展示对应家庭的设备与服务</p>
   ${HOMES.map((h,i)=>`<div class="ac-opt ${i===cur?'on':''}" data-home="${i}">
     <span style="width:34px;height:34px;border-radius:12px;background:${i===cur?'#e8f1ff':'#f3f4f6'};display:flex;align-items:center;justify-content:center;color:${i===cur?'#1a73e8':'#6b7280'}">${HOME_SVG}</span>
     <span><b>${h.n}</b><p>${h.d}</p></span><span class="ok">✓</span></div>`).join('')}
   <div class="ac-opt" data-newhome><span style="width:34px;height:34px;border-radius:12px;background:#f3f4f6;display:flex;align-items:center;justify-content:center;color:#6b7280">${HOME_PLUS}</span><span><b>创建 / 加入新家庭</b><p>扫码邀请或输入家庭邀请码</p></span><span style="margin-left:auto;color:#b9c0c9">›</span></div>`);
  m.querySelectorAll('[data-home]').forEach(el=>el.onclick=()=>{
    const i=+el.dataset.home;
    if(i===cur){closeModal(m);return}
    S.homeIdx=i;closeModal(m);renderGree();toast(`已切换到「${HOMES[i].n}」`);
  });
  const nh=m.querySelector('[data-newhome]');
  if(nh)nh.onclick=()=>{closeModal(m);toast('演示环境：可通过家庭邀请码加入新家庭');};
}
/* ================= 个人页 ================= */
function openProfile(){
  openPage(`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button><h1>我的</h1></div>
  <div class="page-scroll" style="padding:0 14px 20px">
    <div style="background:linear-gradient(135deg,#0f4c9c,#1a73e8);border-radius:22px;padding:20px;color:#fff;display:flex;gap:14px;align-items:center;margin-top:6px">
      <img src="img/a_dad.png" style="width:62px;height:62px;border-radius:50%;object-fit:cover;border:2.5px solid rgba(255,255,255,.6)">
      <div><div style="font-size:17px;font-weight:700">张明</div>
      <div style="font-size:11.5px;opacity:.85;margin-top:5px;line-height:1.6">格力家庭账号 · 户主<br>家庭组「${HOMES[S.homeIdx||0].n}」</div></div>
    </div>
    <div class="ctl-card" style="margin:12px 0 0"><h3>个人简介</h3>
      <div class="kv"><span>账号等级</span><b>V6 尊享会员</b></div>
      <div class="kv"><span>绑定设备</span><b>${DEVICES.length} 台</b></div>
      <div class="kv"><span>家庭积分</span><b>12,860 分</b></div>
      <div class="kv"><span>注册时间</span><b>2019 年 8 月</b></div>
    </div>
    <div class="msg-group">家庭成员（${FAMILY.length}）</div>
    ${FAMILY.map((f,i)=>`<div class="msg-item" data-mi="${i}" style="cursor:pointer"><img src="${f.img}" style="width:44px;height:44px;border-radius:50%;object-fit:cover;flex:0 0 auto">
      <div class="mi-t"><div class="mi-top"><h4>${f.n}</h4><span class="mi-tag" style="color:var(--blue);background:#e8f1ff">${f.r}</span></div><p>${f.d}</p></div><span style="margin-left:auto;color:#b9c0c9;flex:0 0 auto">›</span></div>`).join('')}
  </div>`,el=>{el.querySelectorAll('[data-mi]').forEach(c=>c.onclick=()=>openMemberPage(+c.dataset.mi));});
}
/* ================= 扫一扫 ================= */
function openScan(){
  const BTN='background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);color:#fff;font-size:12px;border-radius:16px;padding:12px';
  const INFO='font-size:11.5px;color:var(--ink2);margin-top:8px;line-height:1.7';
  const el=openPage(`<div class="page scan-page" style="position:absolute;inset:0;display:flex;flex-direction:column">
    <div class="pg-head" style="background:transparent"><button class="pg-back" data-back style="color:#fff">${svgBack}</button><h1 style="color:#fff">扫一扫</h1></div>
    <div class="scan-view">
      <div class="scan-line"></div>
      <div class="scan-hint">识别二维码 / 食材 / 米袋条码 / 洗衣液条码等</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:0 16px 30px">
      <button id="scanSvc" style="${BTN}">模拟扫「码上服务」码</button>
      <button id="scanMall" style="${BTN}">模拟扫「董明珠店」码</button>
      <button id="scanTom" style="${BTN}">模拟识别食材</button>
      <button id="scanRiceB" style="${BTN}">模拟扫米袋条码</button>
    </div></div>`,null,true);
  el.querySelector('#scanSvc').onclick=()=>{
    openModal(`<img src="img/m_dehum.png" style="width:100%;height:130px;object-fit:cover;border-radius:14px">
     <h3 style="font-size:15px;font-weight:700;margin-top:12px">格力除湿机 DH20EF</h3>
     <p style="${INFO}">扫码成功 · 码上服务<br>产品序列号 GR-DH20EF-2603-8812<br>保修状态：在保（至 2028-03）<br>已绑定房间：主卧</p>
     <button class="cook-btn" data-close style="margin-top:14px">查看产品详情与电子说明书</button>`,{center:true});};
  el.querySelector('#scanMall').onclick=()=>{closePage();openWebView('https://fmall.gree.com/distributionh5/#/shopDetail?id=1003529469&skuid=1000895051&distributionShopId=2000001394&shopId=2000001394&baseShopId=2000001394','董明珠的店');toast('已识别商城码，正在打开董明珠的店');};
  el.querySelector('#scanTom').onclick=()=>{
    const m=openModal(`<img src="img/tomato.png" style="width:100%;height:130px;object-fit:cover;border-radius:14px">
     <h3 style="font-size:15px;font-weight:700;margin-top:12px">西红柿 · 新鲜度 92%</h3>
     <p style="${INFO}">识别成功 · 建议冷藏 0-4°C，预计可存放约 5 天<br>冰箱现有 6 个（冷藏室 L2 · C 格）<br>番茄红素加热后更易吸收，推荐熟食</p>
     <button class="cook-btn" id="tomRecipe" style="margin-top:14px">推荐菜谱：番茄焖饭 · 一键烹饪</button>
     <button class="cook-btn" data-close style="margin-top:10px;background:#f1f3f6;color:var(--ink);box-shadow:none">登记入冰箱食材</button>`,{center:true});
    m.querySelector('#tomRecipe').onclick=()=>{closeModal(m);openRecipe(RECIPES.rice.find(r=>r.name==='番茄焖饭'));};
  };
  el.querySelector('#scanRiceB').onclick=()=>{
    const m=openModal(`<h3 style="font-size:15px;font-weight:700">米袋条码识别 · 五常大米 5kg</h3>
     <p style="${INFO}">产地：黑龙江五常 · 一年一季<br>建议米水比 1:1.2 · 精煮 45 分钟 · 口感软糯回甘<br>储存：密封避潮，开封后 60 天内食用更佳</p>
     <button class="cook-btn" id="riceGo" style="margin-top:14px">下发到厨房电饭煲：精煮 · 米水比 1:1.2</button>`,{center:true});
    m.querySelector('#riceGo').onclick=()=>{closeModal(m);toast('已下发到厨房电饭煲：精煮程序 · 米水比 1:1.2');};
  };
}
/* ================= 格力 Claw 助手 ================= */
function openClaw(firstMsg,voice){
  const MIC='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0"/><path d="M12 18v3"/></svg>';
  const BOLT='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c4dff" stroke-width="2" stroke-linejoin="round"><path d="M13 2.5 4.5 13.5H11l-1.5 8L18.5 10h-6.5z"/></svg>';
  const el=openPage(`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button><h1>格力 Claw 助手</h1><span class="pg-extra">在线</span></div>
   <div class="chat-body" id="chatBody"></div>
   <div class="chat-input">
     <button class="ci-ic" id="chatMic">${MIC}</button>
     <button class="ci-ic" id="chatImg"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="3" y="5" width="18" height="14" rx="3"/><circle cx="9" cy="10" r="1.6"/><path d="m5 18 5-5 3 3 3.5-3.5L21 17"/></svg></button>
     <input id="chatIn" placeholder="发消息，或点麦克风语音输入">
     <button class="send" id="chatSend">发送</button>
   </div>
   <div class="voice-bar" id="voiceBar" style="display:none"><span class="vb-wave"><i></i><i></i><i></i><i></i><i></i></span><span style="flex:1">正在聆听，请说话…</span><button id="vbCancel">取消</button></div>`);
  const body=el.querySelector('#chatBody');
  const scroll=()=>body.scrollTop=body.scrollHeight;
  function bot(html){const d=document.createElement('div');d.innerHTML=html;body.appendChild(d);scroll()}
  function me(t,img){body.insertAdjacentHTML('beforeend',`<div class="bubble me">${esc(t)}${img?`<img src="${img}">`:''}</div>`);scroll()}
  setTimeout(()=>bot(`<div class="bubble bot">你好，我是格力 Claw 助手。<br>我可以帮你控制设备、查询家庭数据、推荐菜谱，试试对我说：「今晚吃什么」？</div>`),250);
  setTimeout(()=>bot(`<div class="bubble bot">查到阳台洗衣机混合洗还剩 ${fmt(S.washer.left)}，蒸烤箱的清蒸鲈鱼还剩 ${fmt(S.oven.left)}，到点我会提醒你。</div>`),900);
  function reply(q){
    setTimeout(()=>{
      if(/电饭煲|煮饭|米饭/.test(q)){
        const r=S.rice;
        bot(`<div class="chat-dev"><h5>${devIcon('rice','#f29900')} 厨房电饭煲</h5>
          <p>${r.cooking?`<span class="cook-anim"></span>正在烹饪 ${r.dish} · 剩余 ${fmt(r.left)} · 软硬度「${S.riceSoft||'柔软口感'}」`:'待机中 · 米已洗好，随时可开始煮饭'}</p>
          <div class="cd-btns">${r.cooking?'<button data-x="rc">查看进度</button>':'<button data-x="prep">去煮饭</button>'}</div></div>`);
      }else if(/空调/.test(q)){
        const d=DEVICES.find(x=>x.id==='ac1');d.on=true;
        bot(`<div class="chat-dev"><h5>${devIcon('ac','#1a73e8')} 客厅空调</h5><p>已开启 · 制冷 26°C · 风速自动</p>
          <div class="cd-btns"><button data-x="t1">调高 1°</button><button data-x="d1">调低 1°</button><button data-x="off">关闭</button></div></div>`);
        toast('客厅空调已开启');
      }else if(/蒸烤箱/.test(q)){
        const o=S.oven;
        bot(`<div class="chat-dev"><h5>${devIcon('oven','#e54545')} 厨房蒸烤箱</h5>
          <p>${o.cooking?`<span class="cook-anim"></span>正在烹饪 ${o.dish} · 剩余 ${fmt(o.left)}`:'待机中 · 可随时开始烹饪'}</p>
          <div class="cd-btns"><button data-x="ov">查看蒸烤箱</button></div></div>`);
      }else if(/洗衣机|洗衣/.test(q)){
        const w=S.washer;
        bot(`<div class="chat-dev"><h5>${devIcon('washer','#7c4dff')} 阳台洗衣机</h5>
          <p>${w.left>0?`<span class="cook-anim"></span>${w.mode} ${w.running?'进行中':'已暂停'} · 剩余 ${fmt(w.left)}`:'待机中 · 筒内干净，可以随时开洗'}</p>
          <div class="cd-btns"><button data-x="wm">查看洗衣机</button></div></div>`);
      }else if(/空气/.test(q)){
        if(/自动|调节|舒适|优化|调整/.test(q)){
          Object.keys(S.aiAir).forEach(k=>S.aiAir[k]=true);
          DEVICES.find(x=>x.id==='ac1').on=true;
          bot(`<div class="chat-dev"><h5>${devIcon('ac','#1a73e8')} 全屋空气自动调节</h5>
            <p>已按当前环境自动调节：<br>· 客厅空调 制冷 26°C 风速自动<br>· 客厅新风机 运行中<br>· 主卧除湿机 目标湿度 55%<br>当前全屋 27.5°C · 湿度 68% · 空气优</p>
            <div class="cd-btns"><button data-x="air">查看全屋空气</button></div></div>`);
          toast('已开启全屋空气自动调节');
        }else{
          bot(`<div class="chat-dev"><h5>${devIcon('fresh','#34a853')} 全屋空气</h5>
            <p>27.5°C · 湿度 68% · AQI 优 · PM2.5 18 · CO₂ 645ppm<br>整体舒适，厨房湿度略高，已建议新风换气。</p>
            <div class="cd-btns"><button data-x="air">查看详情</button></div></div>`);
        }
      }else if(/电量|用电|电费|耗电|功耗|多少电|几度/.test(q)){
        bot(`<div class="chat-dev"><h5>${BOLT} 电量报告</h5>
          <p>今日用电 <b style="color:#7c4dff">34.3</b> 度 · 较昨日 -6%<br>光伏发电 21.8 度 · 储能充电 4.2 度<br>用电大户：空调 52% · 冰箱 12% · 热水器 10%</p>
          <div class="cd-btns"><button data-x="energy">查看电量报告</button></div></div>`);
      }else if(/蒸鱼|鲈鱼/.test(q)){
        S.oven={dish:'清蒸鲈鱼',left:12*60,running:true,cooking:true};
        bot(`<div class="chat-dev"><h5>${devIcon('oven','#e54545')} 厨房蒸烤箱</h5><p><span class="cook-anim"></span>正在烹饪 清蒸鲈鱼 · 纯蒸 100°C · 剩余 12:00</p>
          <div class="cd-btns"><button data-x="ov">查看进度</button></div></div>`);
        toast('已下发蒸烤箱：清蒸鲈鱼 12 分钟');
      }else if(/吃|菜谱|饭|菜/.test(q)){
        bot(`<div class="bubble bot">结合冰箱里的食材和大暑节气，推荐你做清蒸鲈鱼，鲈鱼和配料都齐全：<img src="img/r_fish.png">要我一键下发到蒸烤箱吗？回复「开始蒸鱼」即可。</div>`);
      }else if(/水|TDS/.test(q)){
        bot(`<div class="bubble bot">当前净水器出水 TDS 为 15mg/L，优于同区自来水（168mg/L）。反渗透膜滤芯寿命还剩 75%，PCC 复合滤芯仅剩 5%，需要我帮你下单吗？</div>`);
      }else{
        bot(`<div class="bubble bot">收到。我可以控制全屋 ${DEVICES.length} 台设备、查询空气 / 能源 / 用水数据，也可以按冰箱食材推荐菜谱，直接对我说就行。</div>`);
      }
      body.querySelectorAll('[data-x]').forEach(b=>b.onclick=()=>{
        const x=b.dataset.x;
        if(x==='ov')openDeviceCtl(DEVICES.find(v=>v.id==='ov1'));
        else if(x==='wm')openDeviceCtl(DEVICES.find(v=>v.id==='wm1'));
        else if(x==='rc')openDeviceCtl(DEVICES.find(v=>v.id==='rc1'));
        else if(x==='prep')openRicePrep();
        else if(x==='air')openAirPage();
        else if(x==='energy')openEnergyPage();
        else toast('指令已下发');});
    },650);
  }
  el.querySelector('#chatSend').onclick=()=>{const v=el.querySelector('#chatIn').value.trim();if(!v)return;el.querySelector('#chatIn').value='';me(v);reply(v)};
  el.querySelector('#chatIn').addEventListener('keydown',e=>{if(e.key==='Enter')el.querySelector('#chatSend').click()});
  el.querySelector('#chatImg').onclick=()=>{me('这张菜谱照帮我看看怎么做','img/r_wings.png');
    setTimeout(()=>bot(`<div class="bubble bot">识别成功：蜜汁烤鸡翅。蒸烤箱嫩烤 200°C 约 22 分钟，腌料需要蜂蜜、生抽、蒜末。蜂蜜和生抽家里都有，要直接开始吗？</div>`),800)};
  /* 语音输入 */
  const VOICE_LINES=['电饭煲还要多久？','蒸烤箱现在什么状态？','洗衣机洗好了吗？','帮我把全屋空气调到最舒适的状态','今天家里用了多少电？'];
  let vi=0,voiceT=null;
  const micBtn=el.querySelector('#chatMic');
  const stopVoice=cancel=>{
    clearTimeout(voiceT);voiceT=null;
    el.querySelector('#voiceBar').style.display='none';
    el.querySelector('.chat-input').style.visibility='';
    micBtn.classList.remove('rec');
    if(cancel)toast('已取消语音输入');};
  const startVoice=()=>{
    if(voiceT)return;
    micBtn.classList.add('rec');
    el.querySelector('#voiceBar').style.display='flex';
    el.querySelector('.chat-input').style.visibility='hidden';
    voiceT=setTimeout(()=>{
      stopVoice(false);
      const t=VOICE_LINES[vi++%VOICE_LINES.length];
      el.querySelector('#chatIn').value=t;
      setTimeout(()=>el.querySelector('#chatSend').click(),260);
    },2000);};
  micBtn.onclick=startVoice;
  el.querySelector('#vbCancel').onclick=()=>stopVoice(true);
  if(voice)setTimeout(startVoice,500);
  if(firstMsg)setTimeout(()=>{me(firstMsg);reply(firstMsg)},400);
}
/* ================= 消息中心 ================= */
function msgDayKey(t){let d=0;
  if(t.startsWith('今天'))d=23;else if(t.startsWith('昨天'))d=22;
  else{const mm=t.match(/(\d+)月(\d+)日/);if(mm)d=+mm[2];}
  const hm=t.match(/(\d+):(\d+)/);return d*10000+(hm?(+hm[1])*100+(+hm[2]):0);}
function msgTags(){const ALL=[];MSGS.forEach(g=>g.items.forEach(m=>ALL.push({...m,g:g.g})));
  ALL.forEach(m=>m.k=msgDayKey(m.time));
  return {ALL,tags:[...new Set(ALL.map(m=>m.tag))].sort((a,b)=>
    Math.max(...ALL.filter(m=>m.tag===b).map(m=>m.k))-Math.max(...ALL.filter(m=>m.tag===a).map(m=>m.k)))};}
function msgCenterBodyHTML(f){
  const {tags}=msgTags();
  return `<div style="display:flex;gap:10px;align-items:center;padding:10px 14px 0;flex:0 0 auto">
    <div class="msg-filter" id="msgFilter">${['全部','待处理',...tags].map(t=>`<button class="chip ${t===f?'on':''}" data-ft="${t}">${t==='待处理'?`待处理 · ${V2_TODOS.length}`:t}</button>`).join('')}</div>
    <div class="msg-sort" id="msgSort"><button class="on" data-st="time">时间</button><button data-st="cat">分类</button></div>
   </div>
   <div class="page-scroll" style="padding:2px 14px 20px" id="msgBody"></div>`;
}
function bindMsgCenter(root,initial){
  const {ALL,tags}=msgTags();
  let f=initial||'全部',sort='time';
  const itemHTML=m=>`<div class="msg-item" data-mi><div class="mi-ic" style="background:${m.c}">${IC.gree()}</div>
   <div class="mi-t"><div class="mi-top"><h4>${m.t}</h4><span class="mi-tag" style="color:${m.c};background:${m.c}1a">${m.tag}</span></div>
   <p>${m.p}</p><time>${m.time}</time></div></div>`;
  const render=()=>{
    root.querySelector('#msgSort').style.display=f==='待处理'?'none':'flex';
    if(f==='待处理'){
      root.querySelector('#msgBody').innerHTML=`<div class="msg-group">待处理 · ${V2_TODOS.length} 件</div>`+
        V2_TODOS.map((t,i)=>`<div class="msg-item" data-todo="${i}" style="cursor:pointer">
         <span style="width:36px;height:36px;border-radius:12px;background:${t.c}1a;color:${t.c};display:flex;align-items:center;justify-content:center;flex:0 0 auto">${t.ic}</span>
         <div class="mi-t"><div class="mi-top"><h4>${t.t}</h4><span class="mi-tag" style="color:${t.c};background:${t.c}1a">待处理</span></div>
         <p>${t.p}</p><time>${t.time}</time></div>
         <button class="todo-btn" data-todobtn="${i}">去处理</button></div>`).join('');
      root.querySelectorAll('[data-todobtn]').forEach(b2=>b2.onclick=e2=>{e2.stopPropagation();goTodo(V2_TODOS[+b2.dataset.todobtn])});
      root.querySelectorAll('[data-todo]').forEach(r=>r.onclick=()=>goTodo(V2_TODOS[+r.dataset.todo]));
      return;
    }
    const list=ALL.filter(m=>f==='全部'||m.tag===f);
    let html='';
    if(sort==='time'){
      ['今天','昨天','更早'].forEach(g=>{const items=list.filter(m=>m.g===g).sort((a,b)=>b.k-a.k);
        if(items.length)html+=`<div class="msg-group">${g}</div>`+items.map(itemHTML).join('');});
    }else{
      tags.forEach(tg=>{const items=list.filter(m=>m.tag===tg).sort((a,b)=>b.k-a.k);
        if(items.length)html+=`<div class="msg-group">${tg} · ${items.length} 条</div>`+items.map(itemHTML).join('');});
    }
    root.querySelector('#msgBody').innerHTML=html||'<div style="text-align:center;color:var(--ink3);padding:60px 0;font-size:12.5px">暂无相关消息</div>';
    root.querySelectorAll('[data-mi]').forEach(it=>it.onclick=()=>toast('消息详情演示'));
  };
  root.querySelectorAll('[data-ft]').forEach(c=>c.onclick=()=>{f=c.dataset.ft;
    root.querySelectorAll('[data-ft]').forEach(x=>x.classList.toggle('on',x===c));render();});
  root.querySelectorAll('[data-st]').forEach(b=>b.onclick=()=>{sort=b.dataset.st;
    root.querySelectorAll('[data-st]').forEach(x=>x.classList.toggle('on',x===b));render();});
  const fl=root.querySelector('#msgFilter');if(fl)dragScroll(fl);
  render();
}
function openMessages(tab){
  const cur=tab==='sms'?'sms':'notice';
  const f=(tab&&tab!=='sms'&&tab!=='notice')?tab:'全部';
  const smsUn=SMS_THREADS.reduce((s,t)=>s+t.un,0);
  const el=openPage(`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button><h1>信息</h1><span class="pg-extra" id="msgAll">全部已读</span></div>
   <div class="dyn-page-seg" id="msgTabs"><button data-mtab="sms" class="${cur==='sms'?'on':''}">短信${smsUn?` · ${smsUn}`:''}</button><button data-mtab="notice" class="${cur==='notice'?'on':''}">通知 · ${MSGS.reduce((s,g)=>s+g.items.length,0)}</button></div>
   <div id="msgTabBody" style="flex:1;min-height:0;display:flex;flex-direction:column"></div>`,el=>{
    const body=el.querySelector('#msgTabBody');
    const showSms=()=>{body.innerHTML=smsListHTML();bindSmsList(body);};
    const showNotice=ff=>{body.innerHTML=msgCenterBodyHTML(ff);bindMsgCenter(body,ff);};
    el.querySelectorAll('[data-mtab]').forEach(b=>b.onclick=()=>{
      el.querySelectorAll('[data-mtab]').forEach(x=>x.classList.toggle('on',x===b));
      if(b.dataset.mtab==='sms')showSms();else showNotice('全部');});
    if(cur==='sms')showSms();else showNotice(f);
    el.querySelector('#msgAll').onclick=()=>toast('已全部标记为已读');
  });
}
/* ================= 家庭动态（自动完成 + 消息提醒 聚合页） ================= */
function openDynamics(tab){
  const cur=tab==='svc'?'svc':'msg';
  const el=openPage(`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button><h1>家庭动态</h1><span class="pg-extra" id="dynExtra"></span></div>
   <div class="dyn-page-seg" id="dynPageSeg"><button data-dp="svc" class="${cur==='svc'?'on':''}">自动完成 · ${EV_DONES.length}</button><button data-dp="msg" class="${cur==='msg'?'on':''}">消息提醒 · 7</button></div>
   <div id="dynPageBody" style="flex:1;min-height:0;display:flex;flex-direction:column"></div>`,el=>{
    const body=el.querySelector('#dynPageBody');
    const showSvc=()=>{body.innerHTML=eventLogBodyHTML();bindEventLogBody(body);
      el.querySelector('#dynExtra').textContent=`今日完成 ${EV_DONES.length} 件`;};
    const showMsg=f=>{body.innerHTML=msgCenterBodyHTML(f);bindMsgCenter(body,f);
      el.querySelector('#dynExtra').textContent='';};
    el.querySelectorAll('#dynPageSeg button').forEach(b=>b.onclick=()=>{
      el.querySelectorAll('#dynPageSeg button').forEach(x=>x.classList.toggle('on',x===b));
      if(b.dataset.dp==='svc')showSvc();else showMsg('全部');});
    if(cur==='svc')showSvc();else showMsg(tab==='todo'?'待处理':'全部');
  });
}
/* ================= 设备列表 ================= */
function devCell(d){
  const meta=TYPE_META[d.type];
  const st=d.on?(d.type==='ac'?`${d.mode} ${d.t}°`:'运行中'):'已关闭';
  return `<div class="dev-cell ${d.on?'is-on':''}" data-dev="${d.id}">
    <div class="dc-ic" style="${d.on?`background:${meta.c}`:''}">${devIcon(d.type)}</div>
    <h5>${d.name}</h5><p>${st}</p></div>`;
}
function openDevicesPage(){openRoomPage('全屋')}
const DC_PW='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3v8"/><path d="M6.3 6.5a8 8 0 1 0 11.4 0" stroke-linecap="round"/></svg>';
function devCard(d){
  const meta=TYPE_META[d.type];
  return `<div class="dev-card ${d.on?'is-on':''}" data-dev="${d.id}">
   <div class="dca-top"><span class="dca-ic" style="background:${d.on?meta.c:'#eef0f2'}">${devIcon(d.type,d.on?'#fff':'#9aa0a8')}</span>
    <button class="dca-pw ${d.on?'on':''}" data-pw="${d.id}">${DC_PW}</button></div>
   <div class="dca-b"><h5>${d.name}</h5><p class="dca-st">${d.room} · ${devBrief(d)}</p></div></div>`;
}

const DEV_ORDER=['ac','fridge','washer','rice','water','purifier','eheater','fresh','hood','gas','dish','heater'];
const devSort=ds=>[...ds].sort((a,b)=>{const ia=DEV_ORDER.indexOf(a.type),ib=DEV_ORDER.indexOf(b.type);return (ia<0?99:ia)-(ib<0?99:ib)});
function openRoomPage(name){
  const swRooms=[{name:'全屋'},...ROOMS.filter(r=>roomDevs(r.name).length)];
  const bodyHTML=n=>{
    const ds=n==='全屋'?devSort(DEVICES):roomDevs(n);
    return `<div class="ctl-card" style="margin:6px 0 12px;display:flex;gap:14px">
      <div style="flex:1"><div style="font-size:11px;color:var(--ink3)">温度</div><div style="font-size:19px;font-weight:700">${airOf(n).t}°C</div></div>
      <div style="flex:1"><div style="font-size:11px;color:var(--ink3)">湿度</div><div style="font-size:19px;font-weight:700">${airOf(n).h}%</div></div>
      <div style="flex:1"><div style="font-size:11px;color:var(--ink3)">空气质量</div><div style="font-size:19px;font-weight:700;color:${airOf(n).aqi==='优'?'var(--green)':'var(--orange)'}">${airOf(n).aqi}</div></div>
    </div>
    ${n==='客厅'?`<div class="lv-banner" id="lvEco"><span class="lv-ic">${LV_RADAR}</span><div><h4>客厅当前无人 · 已持续 15 分钟</h4><p>15 分钟前检测到 2 人活动，现在没人。空调已进入轻度节能状态；接下来如果超过 60 分钟没人，空调将进入深度节能：降低保温、关闭新风及净化器。</p></div><span class="arr">›</span></div>`:''}
    ${n==='主卧'?`<div class="lv-banner slp" id="lvSlp"><span class="lv-ic">${SLP_MOON17}</span><div><h4>查看睡眠报告</h4><p>昨天睡眠 6 小时 30 分钟 · 睡眠质量中 · 体动有点多，点击查看完整个人睡眠报告。</p></div><span class="arr">›</span></div>`:''}
    <div class="dev-cards">${ds.map(devCard).join('')}</div>`;
  };
  openPage(`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button><h1 id="roomTitle">${name}</h1><span class="pg-extra" id="roomExtra"></span></div>
   <div class="room-sw" id="roomSw">${swRooms.map(r=>`<button class="chip ${r.name===name?'on':''}" data-rsw="${r.name}">${r.name}</button>`).join('')}</div>
   <div class="page-scroll" id="roomBody" style="padding:4px 14px 20px">${bodyHTML(name)}</div>
   ${sceneBarHTML()}`,
   el=>{
    const syncExtra=n=>{const ds=n==='全屋'?DEVICES:roomDevs(n);const r=ROOMS.find(x=>x.name===n);
      el.querySelector('#roomExtra').textContent=`${r?(r.who?'有人':'无人')+' · ':''}${ds.filter(d=>d.on).length}/${ds.length} 运行`;};
    const bindContent=()=>{
      el.querySelectorAll('[data-dev]').forEach(c=>c.onclick=()=>openDeviceCtl(DEVICES.find(d=>d.id===c.dataset.dev)));
      el.querySelectorAll('[data-pw]').forEach(b=>b.onclick=e=>{
        e.stopPropagation();
        const d=DEVICES.find(x=>x.id===b.dataset.pw);if(!d)return;
        d.on=!d.on;b.classList.toggle('on',d.on);
        const card=b.closest('.dev-card');card.classList.toggle('is-on',d.on);
        const ic=card.querySelector('.dca-ic');ic.style.background=d.on?TYPE_META[d.type].c:'#eef0f2';
        ic.innerHTML=devIcon(d.type,d.on?'#fff':'#9aa0a8');
        card.querySelector('.dca-st').textContent=d.room+' · '+devBrief(d);
        syncExtra(el.querySelector('#roomTitle').textContent);
        toast(d.name+(d.on?' 已开机':' 已关机'));});
      const le=el.querySelector('#lvEco');if(le)le.onclick=()=>openLivingPresence();
      const ls=el.querySelector('#lvSlp');if(ls)ls.onclick=()=>openSleepPage();};
    syncExtra(name);bindContent();bindSceneBar(el);
    dragScroll(el.querySelector('#roomSw'));
    el.querySelectorAll('[data-rsw]').forEach(c=>c.onclick=()=>{
      const n=c.dataset.rsw;
      el.querySelectorAll('[data-rsw]').forEach(x=>x.classList.toggle('on',x===c));
      el.querySelector('#roomTitle').textContent=n;syncExtra(n);
      const rb=el.querySelector('#roomBody');rb.innerHTML=bodyHTML(n);rb.scrollTop=0;bindContent();});
   });
}
/* ================= 设备控制页 ================= */
function ringSVG(pct,color){
  const r=64,c=2*Math.PI*r;
  return `<svg width="150" height="150"><circle cx="75" cy="75" r="${r}" fill="none" stroke="#eef0f3" stroke-width="9"/>
   <circle cx="75" cy="75" r="${r}" fill="none" stroke="${color}" stroke-width="9" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-pct)}"/></svg>`;
}
function openDeviceCtl(d){
  if(d.type==='ac')return openAcCtl(d);
  if(d.type==='light')return openLightCtl(d);
  if(d.type==='fridge')return openFridgeCtl(d);
  if(d.type==='washer')return openWasherCtl(d);
  if(d.type==='oven')return openOvenCtl(d);
  if(d.type==='rice')return openRiceCtl(d);
  if(d.type==='water')return openWaterCtl(d);
  if(d.type==='fresh')return openFresh2Ctl(d);
  if(d.type==='heater')return openHeaterCtl(d);
  if(d.type==='eheater')return openEHeaterCtl(d);
  if(d.type==='purifier')return openPurifierCtl(d);
  if(d.type==='hood')return openHoodCtl(d);
  if(d.type==='dish')return openDishCtl(d);
  const meta=TYPE_META[d.type];
  const head=`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button><h1>${d.name}</h1><span class="pg-extra">${d.room}</span></div>`;
  let body='';
  const pw=`<button class="power-fab ${d.on?'on':''}" id="pFab"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1"><path d="M12 3v8"/><path d="M6.3 6.5a8 8 0 1 0 11.4 0" stroke-linecap="round"/></svg></button>`;
  if(d.type==='ac'){
    body=`<div class="ctl-hero"><div class="ctl-big" id="acT">${d.t}°</div>
      <div class="ctl-sub" id="acSt">${d.on?d.mode+' 运行中':'已关闭'}</div>
      <div class="ctl-row"><button class="ctl-btn" id="tDn">−</button>${pw}<button class="ctl-btn" id="tUp">＋</button></div>
      <div class="chip-row">${['制冷','制热','除湿','送风','自动'].map(m=>`<button class="chip ${d.mode===m?'on':''}" data-md="${m}">${m}</button>`).join('')}</div></div>
    <div class="ctl-card"><h3>更多设置</h3>
      <div class="kv"><span>风速</span><span>${['自动','低速','中速','高速'].map(s=>`<button class="chip ${s==='自动'?'on':''}" data-fs="${s}" style="padding:5px 11px">${s}</button>`).join('')}</span></div>
      <div class="kv"><span>上下扫风</span><span class="switch" data-sw></span></div>
      <div class="kv"><span>左右扫风</span><span class="switch" data-sw></span></div>
      <div class="kv"><span>睡眠模式</span><span class="switch" data-sw></span></div></div>`;
  }else if(d.type==='light'){
    body=`<div class="ctl-hero"><div style="margin-bottom:6px">${pw}</div>
      <div class="ctl-sub" id="ltSt">${d.on?`亮度 ${d.bri}%`:'已关闭'}</div>
      <div style="padding:8px 16px 0"><input type="range" class="slider" id="bri" value="${d.bri}" min="1" max="100"></div>
      <div class="ctl-sub">色温</div>
      <div style="padding:4px 16px 0"><input type="range" class="slider" id="ctemp" value="55" min="1" max="100"></div>
      <div class="chip-row">${['阅读','会客','影院','夜灯'].map((m,i)=>`<button class="chip ${i===0?'on':''}" data-sc="${m}">${m}</button>`).join('')}</div></div>`;
  }else if(d.type==='fridge'){
    body=`<div class="ctl-hero"><div style="display:flex;justify-content:center;gap:34px">
      <div><div class="ctl-big" style="font-size:38px">3°</div><div class="ctl-sub">冷藏室</div></div>
      <div><div class="ctl-big" style="font-size:38px">-18°</div><div class="ctl-sub">冷冻室</div></div></div>
      <div class="chip-row">${['智能','速冷','速冻','假日'].map((m,i)=>`<button class="chip ${i===0?'on':''}" data-md="${m}">${m}</button>`).join('')}</div></div>
    <div class="ctl-card"><h3>冰箱状态</h3>
      <div class="kv"><span>箱门状态</span><b style="color:var(--red)">15:01 门未关提醒（已处理）</b></div>
      <div class="kv"><span>除菌净味</span><span class="switch on" data-sw></span></div>
      <div class="kv"><span>食材管理</span><b id="goFood" style="color:var(--blue)">进入营养管家 ›</b></div></div>`;
  }else if(d.type==='washer'){
    const total=45*60,pct=1-S.washer.left/total;
    body=`<div class="ctl-hero"><div class="ring-wrap">${ringSVG(pct,'#7c4dff')}
      <div class="ring-t"><b id="ringWasher">${fmt(S.washer.left)}</b><span>剩余时间</span></div></div>
      <div class="ctl-sub" id="wmSt"><span class="cook-anim"></span>${S.washer.mode} 进行中</div>
      <div class="chip-row">${['混合洗','快洗 15′','羊毛洗','空气洗','筒自洁'].map(m=>`<button class="chip ${S.washer.mode===m?'on':''}" data-md="${m}">${m}</button>`).join('')}</div>
      <div class="ctl-row"><button class="ctl-btn" id="wmPause" style="width:auto;border-radius:26px;padding:0 22px;font-size:13px">${S.washer.running?'暂停':'继续'}</button></div></div>
    <div class="ctl-card"><h3>洗护设置</h3>
      <div class="kv"><span>水温</span><span>${['常温','30°','40°','60°'].map((s,i)=>`<button class="chip ${i===0?'on':''}" data-ch style="padding:5px 11px">${s}</button>`).join('')}</span></div>
      <div class="kv"><span>脱水转速</span><span>${['800','1000','1200'].map((s,i)=>`<button class="chip ${i===1?'on':''}" data-ch style="padding:5px 11px">${s}</button>`).join('')}</span></div>
      <div class="kv"><span>私人衣橱联动</span><span class="switch on" data-sw></span></div></div>`;
  }else if(d.type==='oven'){
    const total=15*60,pct=1-S.oven.left/total;
    body=`<div class="ctl-hero"><div class="ring-wrap">${ringSVG(Math.max(.02,pct),'#e54545')}
      <div class="ring-t"><b id="ringOven">${fmt(S.oven.left)}</b><span>剩余时间</span></div></div>
      <div class="ctl-sub" id="ovSt">${S.oven.cooking?`<span class="cook-anim"></span>正在烹饪 ${S.oven.dish}`:'待机中'}</div>
      <div class="chip-row">${['纯蒸','嫩烤','发酵','空气炸','保温'].map((m,i)=>`<button class="chip ${i===0?'on':''}" data-md="${m}">${m}</button>`).join('')}</div>
      <div class="ctl-row"><button class="ctl-btn" id="ovPause" style="width:auto;border-radius:26px;padding:0 22px;font-size:13px">${S.oven.running?'暂停':'继续'}</button></div></div>
    <div class="ctl-card"><h3>烹饪设置</h3>
      <div class="kv"><span>温度</span><span>${['90°','100°','180°','200°'].map((s,i)=>`<button class="chip ${i===1?'on':''}" data-ch style="padding:5px 11px">${s}</button>`).join('')}</span></div>
      <div class="kv"><span>蒸汽补湿</span><span class="switch on" data-sw></span></div>
      <div class="kv"><span>完成后保温</span><span class="switch" data-sw></span></div></div>`;
  }else if(d.type==='rice'){
    body=`<div class="ctl-hero"><div class="ring-wrap">${ringSVG(S.rice.cooking?.4:0,'#f29900')}
      <div class="ring-t"><b id="ringRice">${S.rice.cooking?fmt(S.rice.left):'--:--'}</b><span>${S.rice.cooking?'剩余时间':'待机中'}</span></div></div>
      <div class="ctl-sub" id="rcSt">${S.rice.cooking?`<span class="cook-anim"></span>正在烹饪 ${S.rice.dish}`:'米已洗好，等待开始煮饭'}</div>
      <div class="chip-row">${['精煮饭','快煮饭','煲仔饭','煮粥','保温'].map((m,i)=>`<button class="chip ${i===0?'on':''}" data-md="${m}">${m}</button>`).join('')}</div>
      <div class="ctl-row"><button class="ctl-btn" id="rcStart" style="width:auto;border-radius:26px;padding:0 26px;font-size:13px">${S.rice.cooking?'取消烹饪':'开始煮饭'}</button></div></div>`;
  }else if(d.type==='gas'){
    body=`<div class="ctl-hero"><div class="ctl-big" style="font-size:30px">已关火</div>
      <div class="ctl-sub">左灶 · 右灶均未工作</div>
      <div style="background:#fdeaea;border-radius:14px;padding:12px;margin-top:16px;text-align:left">
       <div style="font-size:12.5px;font-weight:700;color:var(--red)">19:00 安全提醒</div>
       <p style="font-size:11px;color:#a33;margin-top:5px;line-height:1.6">检测到已离家但燃气灶未关，系统已自动关火并关闭燃气阀门。</p></div></div>
    <div class="ctl-card"><h3>安全设置</h3>
      <div class="kv"><span>离灶自动关火</span><span class="switch on" data-sw></span></div>
      <div class="kv"><span>燃气泄漏报警</span><span class="switch on" data-sw></span></div>
      <div class="kv"><span>童锁</span><span class="switch" data-sw></span></div></div>`;
  }else if(d.type==='water'){
    body=`<div class="ctl-hero"><div style="display:flex;justify-content:center;gap:40px">
      <div><div class="ctl-big" style="font-size:38px;color:#00a8c6">42</div><div class="ctl-sub">出水 TDS ppm</div></div>
      <div><div class="ctl-big" style="font-size:38px;color:var(--ink3)">168</div><div class="ctl-sub">进水 TDS ppm</div></div></div>
      <div class="ctl-row"><button class="ctl-btn" id="flush" style="width:auto;border-radius:26px;padding:0 24px;font-size:13px">滤芯冲洗</button></div></div>
    <div class="ctl-card"><h3>滤芯寿命</h3>${[['PP 棉滤芯',62,'#34a853'],['前置活性炭',45,'#f29900'],['RO 反渗透',2,'#e54545'],['后置活性炭',78,'#34a853']].map(f=>`
      <div class="filter-item"><img src="img/m_filter.png"><div class="fi-t"><h5>${f[0]}</h5><div class="fi-bar"><i style="width:${f[1]}%;background:${f[2]}"></i></div></div><b style="color:${f[2]}">${f[1]}%</b></div>`).join('')}</div>`;
  }else if(d.type==='dehum'){
    body=`<div class="ctl-hero"><div class="ctl-big">70%</div><div class="ctl-sub">当前湿度 · 目标 55%</div>
      <div style="margin-top:14px">${pw}</div>
      <div style="padding:10px 16px 0"><input type="range" class="slider" value="55" min="30" max="80" data-sl></div>
      <div class="chip-row">${['连续除湿','智能','干衣','睡眠'].map((m,i)=>`<button class="chip ${i===1?'on':''}" data-md="${m}">${m}</button>`).join('')}</div></div>`;
  }else if(d.type==='fresh'){
    body=`<div class="ctl-hero"><div class="ctl-big" style="font-size:38px;color:var(--green)">16</div><div class="ctl-sub">室内 PM2.5 μg/m³ · 优</div>
      <div style="margin-top:14px">${pw}</div>
      <div class="chip-row">${['自动','静音','强劲','睡眠'].map((m,i)=>`<button class="chip ${i===0?'on':''}" data-md="${m}">${m}</button>`).join('')}</div></div>
    <div class="ctl-card"><h3>滤网</h3><div class="kv"><span>HEPA 滤网寿命</span><b style="color:var(--green)">71%</b></div>
      <div class="kv"><span>全热交换模式</span><span class="switch on" data-sw></span></div></div>`;
  }else if(d.type==='cam'){
    body=`<div class="ctl-hero" style="padding:0;overflow:hidden"><div style="height:190px;background:linear-gradient(140deg,#232a38,#3c4a63 55%,#1c2230);display:flex;align-items:center;justify-content:center;flex-direction:column;color:#fff">
      <div style="font-size:12px;opacity:.8">● 实时画面</div><div style="font-size:11px;opacity:.5;margin-top:8px">客厅 · 1080P · 画面正常</div></div>
      <div class="chip-row" style="padding:14px 0 4px">${['截图','对讲','回放','云存储'].map(m=>`<button class="chip" data-act="${m}">${m}</button>`).join('')}</div></div>`;
  }else if(d.type==='speaker'){
    body=`<div class="ctl-hero"><div style="font-size:15px;font-weight:700">正在播放 · 轻音乐歌单</div>
      <div class="ctl-sub">音量 40%</div><div style="padding:10px 16px 0"><input type="range" class="slider" value="40" data-sl></div>
      <div class="chip-row"><button class="chip" data-act="上一首">⏮ 上一首</button><button class="chip on" data-act="播放/暂停">⏸ 播放/暂停</button><button class="chip" data-act="下一首">下一首 ⏭</button></div></div>`;
  }else if(d.type==='heater'){
    body=`<div class="ctl-hero"><div class="ctl-big">45°</div><div class="ctl-sub">设定温度 · 当前出水 43°C</div>
      <div class="ctl-row"><button class="ctl-btn" data-td>−</button>${pw}<button class="ctl-btn" data-tu>＋</button></div>
      <div class="chip-row">${['舒适洗','节能','速热','厨房模式'].map((m,i)=>`<button class="chip ${i===0?'on':''}" data-md="${m}">${m}</button>`).join('')}</div></div>`;
  }
  const el=openPage(head+`<div class="page-scroll" style="padding-bottom:20px">${body}</div>`);
  /* ---- 绑定交互 ---- */
  el.querySelectorAll('[data-md]').forEach(b=>b.onclick=()=>{
    b.parentElement.querySelectorAll('.chip').forEach(c=>c.classList.remove('on'));b.classList.add('on');
    d.mode=b.dataset.md;toast(`已切换为「${b.dataset.md}」模式`)});
  el.querySelectorAll('[data-ch]').forEach(b=>b.onclick=()=>{
    b.parentElement.querySelectorAll('.chip').forEach(c=>c.classList.remove('on'));b.classList.add('on');toast('设置已下发')});
  el.querySelectorAll('[data-sw]').forEach(s=>s.onclick=()=>{s.classList.toggle('on');toast(s.classList.contains('on')?'已开启':'已关闭')});
  el.querySelectorAll('[data-act]').forEach(b=>b.onclick=()=>toast(`「${b.dataset.act}」执行成功`));
  el.querySelectorAll('[data-sl]').forEach(s=>s.oninput=()=>toast(`已设为 ${s.value}`));
  el.querySelectorAll('[data-sc]').forEach(b=>b.onclick=()=>{b.parentElement.querySelectorAll('.chip').forEach(c=>c.classList.remove('on'));b.classList.add('on');toast(`已切换「${b.dataset.sc}」场景`)});
  const fab=el.querySelector('#pFab');
  if(fab)fab.onclick=()=>{d.on=!d.on;fab.classList.toggle('on',d.on);toast(d.on?`${d.name}已开启`:`${d.name}已关闭`);
    const st=el.querySelector('#acSt');if(st)st.textContent=d.on?`${d.mode} 运行中`:'已关闭';};
  const tUp=el.querySelector('#tUp'),tDn=el.querySelector('#tDn');
  if(tUp){tUp.onclick=()=>{d.t=Math.min(30,d.t+1);el.querySelector('#acT').textContent=d.t+'°';toast(`设定温度 ${d.t}°C`)};
    tDn.onclick=()=>{d.t=Math.max(16,d.t-1);el.querySelector('#acT').textContent=d.t+'°';toast(`设定温度 ${d.t}°C`)};}
  const bri=el.querySelector('#bri');if(bri)bri.oninput=()=>{d.bri=+bri.value;el.querySelector('#ltSt').textContent=`亮度 ${d.bri}%`};
  const wmP=el.querySelector('#wmPause');if(wmP)wmP.onclick=()=>{S.washer.running=!S.washer.running;wmP.textContent=S.washer.running?'暂停':'继续';el.querySelector('#wmSt').innerHTML=S.washer.running?`<span class="cook-anim"></span>${S.washer.mode} 进行中`:'已暂停';toast(S.washer.running?'继续洗涤':'已暂停')};
  const ovP=el.querySelector('#ovPause');if(ovP)ovP.onclick=()=>{S.oven.running=!S.oven.running;ovP.textContent=S.oven.running?'暂停':'继续';el.querySelector('#ovSt').innerHTML=S.oven.running?`<span class="cook-anim"></span>正在烹饪 ${S.oven.dish}`:'已暂停';toast(S.oven.running?'继续烹饪':'已暂停')};
  const rcS=el.querySelector('#rcStart');if(rcS)rcS.onclick=()=>{
    if(S.rice.cooking){S.rice={dish:'',left:0,running:false,cooking:false};rcS.textContent='开始煮饭';el.querySelector('#rcSt').textContent='已取消，待机中';toast('已取消烹饪');}
    else{S.rice={dish:'精煮饭',left:45*60,running:true,cooking:true};rcS.textContent='取消烹饪';el.querySelector('#rcSt').innerHTML='<span class="cook-anim"></span>正在烹饪 精煮饭';toast('电饭煲已启动：精煮饭 45 分钟');}};
  const gf=el.querySelector('#goFood');if(gf)gf.onclick=()=>openFoodPage();
  const fl=el.querySelector('#flush');if(fl)fl.onclick=()=>toast('滤芯冲洗中，约 60 秒完成');
}
