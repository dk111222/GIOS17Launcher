/* ================= V2 家庭主动服务 / 待处理 ================= */
const EV_FEED=[
 {time:'12:05',t:'蒸烤箱「清蒸鲈鱼」已完成，已进入保温'},
 {time:'11:30',t:'洗衣机「混合洗」已完成，记得及时晾晒'},
 {time:'10:15',t:'客厅无人超 15 分钟，空调已进入轻度节能',svc:'eco'},
 {time:'09:40',t:'PM2.5 超标，智能净化已自动开启 20 分钟',svc:'purify'},
 {time:'08:00',t:'昨日睡眠报告已生成，睡眠质量中',svc:'sleepac'},
 {time:'07:30',t:'新风托管完成夜间换气 2 次',svc:'freshwind'},
 {time:'18:00',t:'米已洗好，已提醒确认开始煮饭',svc:'rice'},
 {time:'15:20',t:'真丝衬衫空气洗护理已完成'},
 {time:'14:10',t:'饮用水 TDS 检测完成，水质优'},
 {time:'06:30',t:'夜间厨房安全巡检完成，无异常'},
];
const EV_DONES=[
 {time:'10:15',t:'客厅无人超 15 分钟，空调已进入轻度节能',d:'AI 场景自动执行，预计今日省电 0.8 度；超过 60 分钟无人将进入深度节能。',svc:'eco'},
 {time:'09:40',t:'客厅 PM2.5 超标，智能净化自动开启',d:'净化 20 分钟后 PM2.5 由 58 降至 18 μg/m³，已自动停机。',svc:'purify'},
 {time:'08:00',t:'昨日睡眠报告已生成',d:'睡眠 6 小时 30 分 · 质量中 · 体动偏多，已同步至睡眠管家。',svc:'sleepac'},
 {time:'07:30',t:'新风托管完成夜间换气 2 次',d:'夜间 CO₂ 维持在 650ppm 以下，晨起空气清新。',svc:'freshwind'},
 {time:'12:05',t:'蒸烤箱「清蒸鲈鱼」已完成',d:'蒸制 18 分钟，已转入 60°C 保温，可随时取用。'},
 {time:'11:30',t:'洗衣机「混合洗」已完成',d:'用时 58 分钟，已发送晾晒提醒至手机。'},
 {time:'18:00',t:'米已洗好，已提醒确认煮饭',d:'检测到入锅未启动，已推送提醒，点击可一键开始烹饪。',svc:'rice'},
 {time:'15:20',t:'真丝衬衫空气洗护理已完成',d:'低温护理 30 分钟，今日湿度 82%，建议悬挂除湿存放。'},
];
const V2_TODOS=[
 {c:'#00a8c6',t:'反渗透滤芯寿命剩 3 天，建议及时更换',p:'净水机滤芯即将到期，及时更换保障饮水安全',time:'今天 08:00',act:'mall',tip:'已为你跳转滤芯选购',
  ic:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/></svg>'},
 {c:'#e54545',t:'燃气报警器电池电量低，请尽快更换电池',p:'电池电量低于 20%，报警功能可能失效',time:'昨天 21:15',act:'ksafe',
  ic:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="3" y="8" width="14" height="9" rx="2"/><path d="M20 11v3M6.5 11v3M10 11v3M13.5 11v3"/></svg>'},
 {c:'#1a73e8',t:'儿童房空调已使用 90 天，建议预约深度清洗',p:'蒸发器积尘易滋生细菌，建议深度清洗一次',time:'7月24日 09:30',act:'mall',tip:'已为你跳转空调清洗预约',
  ic:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="8" cy="9" r="3"/><circle cx="15.5" cy="6.5" r="2"/><circle cx="16" cy="14" r="3"/><circle cx="9" cy="16.5" r="2"/></svg>'},
];
let evFeedTimer=null,todoFeedTimer=null,msgFeedTimer=null,odTimer=null,v2TodoCur=0;
function goTodo(t){
  if(!t)return;
  if(t.act==='ksafe')openKitchenSafety();
  else{openWebView('https://fmall.gree.com/','董明珠店');toast(t.tip||'已为你跳转董明珠店')}
}
function startV2Feeds(){
  clearInterval(evFeedTimer);clearInterval(todoFeedTimer);clearInterval(msgFeedTimer);v2TodoCur=0;
  const ml=document.querySelector('#msgList');
  if(ml){let mi=0;const H=32,K=Math.min(7,MSGS.flatMap(g=>g.items).length);
    msgFeedTimer=setInterval(()=>{
      if(!document.body.contains(ml)){clearInterval(msgFeedTimer);return}
      mi++;
      ml.style.transition='transform .55s cubic-bezier(.4,0,.2,1)';
      ml.style.transform=`translateY(${-mi*H}px)`;
      if(mi===K)setTimeout(()=>{ml.style.transition='none';ml.style.transform='translateY(0)';mi=0},580);
    },3200);}
  const li=document.querySelector('#evList');
  if(li){let idx=0;const H=32,N=EV_FEED.length;
    evFeedTimer=setInterval(()=>{
      if(!document.body.contains(li)){clearInterval(evFeedTimer);return}
      idx++;
      li.style.transition='transform .55s cubic-bezier(.4,0,.2,1)';
      li.style.transform=`translateY(${-idx*H}px)`;
      if(idx===N)setTimeout(()=>{li.style.transition='none';li.style.transform='translateY(0)';idx=0},580);
    },2600);}
  const td=document.querySelector('#todoTrack');
  if(td){let ti=0;const H=40,M=V2_TODOS.length;
    todoFeedTimer=setInterval(()=>{
      if(!document.body.contains(td)){clearInterval(todoFeedTimer);return}
      ti++;
      td.style.transition='transform .5s ease';
      td.style.transform=`translateY(${-ti*H}px)`;
      v2TodoCur=ti%M;
      if(ti===M)setTimeout(()=>{td.style.transition='none';td.style.transform='translateY(0)';ti=0;v2TodoCur=0},530);
    },3000);}
}
function eventLogBodyHTML(){
  return `<div class="page-scroll" style="padding:4px 14px 20px">
    <div class="msg-group">今日 · 家自动完成 ${EV_DONES.length} 件事</div>
    ${EV_DONES.map(e=>`<div class="msg-item" ${e.svc?`data-evsvc="${e.svc}" style="cursor:pointer"`:''}>
      <span class="ev-dot"></span>
      <div class="mi-t"><div class="mi-top"><h4 style="font-weight:600">${e.t}</h4><time style="font-size:10.5px;color:var(--ink3);flex:0 0 auto">${e.time}</time></div>
      <p>${e.d}</p>
      ${e.svc?`<span class="ev-ai">AI 场景 · ${AI_SERVICES.find(v=>v.id===e.svc).name} ${svgArrow}</span>`:''}</div>
    </div>`).join('')}
    <div class="msg-group">昨天</div>
    <div class="msg-item"><span class="ev-dot"></span><div class="mi-t"><div class="mi-top"><h4 style="font-weight:600">睡眠模式自动开启，主卧空调调至 27°C</h4><time style="font-size:10.5px;color:var(--ink3);flex:0 0 auto">22:00</time></div><p>儿童房、主卧联动进入睡眠温度曲线。</p></div></div>
    <div class="msg-item"><span class="ev-dot"></span><div class="mi-t"><div class="mi-top"><h4 style="font-weight:600">离家布防完成，灯与窗帘已关闭</h4><time style="font-size:10.5px;color:var(--ink3);flex:0 0 auto">09:12</time></div><p>检测到全家离家，自动执行离家场景。</p></div></div>
   </div>`;
}
function bindEventLogBody(root){root.querySelectorAll('[data-evsvc]').forEach(c=>c.onclick=()=>openAISvcDetail(c.dataset.evsvc));}
function openEventLog(){
  openPage(`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button><h1>家庭主动服务</h1><span class="pg-extra">今日完成 ${EV_DONES.length} 件</span></div>
   ${eventLogBodyHTML()}`,el=>{bindEventLogBody(el);});
}
