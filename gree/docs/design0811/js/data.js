/* ================= 数据 ================= */
const DEVICES=[
 {id:'ac1',name:'客厅空调',type:'ac',room:'客厅',on:true,t:26,mode:'制冷'},
 {id:'ac2',name:'主卧空调',type:'ac',room:'主卧',on:false,t:26,mode:'制冷'},
 {id:'ac3',name:'儿童房空调',type:'ac',room:'儿童房',on:true,t:27,mode:'制冷'},
 {id:'ac4',name:'书房空调',type:'ac',room:'书房',on:false,t:26,mode:'制冷'},
 {id:'lt1',name:'客厅主灯',type:'light',room:'客厅',on:true,bri:80},
 {id:'lt2',name:'客厅氛围灯',type:'light',room:'客厅',on:false,bri:60},
 {id:'lt3',name:'主卧吸顶灯',type:'light',room:'主卧',on:false,bri:70},
 {id:'lt4',name:'厨房灯',type:'light',room:'厨房',on:true,bri:90},
 {id:'lt5',name:'儿童房灯',type:'light',room:'儿童房',on:true,bri:75},
 {id:'lt6',name:'阳台灯',type:'light',room:'阳台',on:false,bri:50},
 {id:'lt7',name:'餐厅吊灯',type:'light',room:'餐厅',on:false,bri:70},
 {id:'fr1',name:'厨房冰箱',type:'fridge',room:'厨房',on:true},
 {id:'wm1',name:'阳台洗衣机',type:'washer',room:'阳台',on:true},
 {id:'ov1',name:'厨房蒸烤箱',type:'oven',room:'厨房',on:true},
 {id:'rc1',name:'厨房电饭煲',type:'rice',room:'厨房',on:false},
 {id:'gs1',name:'厨房燃气灶',type:'gas',room:'厨房',on:false},
 {id:'hd1',name:'厨房油烟机',type:'hood',room:'厨房',on:true,gear:2},
 {id:'dw1',name:'厨房洗碗机',type:'dish',room:'厨房',on:false},
 {id:'wp1',name:'厨房净水器',type:'water',room:'厨房',on:true},
 {id:'dh1',name:'主卧除湿机',type:'dehum',room:'主卧',on:false},
 {id:'eh1',name:'主卧电暖器',type:'eheater',room:'主卧',on:true,t:28,mode:'静热'},
 {id:'fa1',name:'客厅新风机',type:'fresh',room:'客厅',on:true},
 {id:'pf1',name:'客厅空气净化器',type:'purifier',room:'客厅',on:true},
 {id:'cm1',name:'客厅摄像头',type:'cam',room:'客厅',on:true},
 {id:'wh1',name:'卫生间热水器',type:'heater',room:'卫生间',on:true},
];
const ROOMS=[
 {name:'客厅',who:true,ic:'🛋️'},{name:'主卧',who:false,ic:'🛏️'},
 {name:'儿童房',who:true,ic:'🧸'},{name:'厨房',who:true,ic:'🍳'},
 {name:'书房',who:false,ic:'📚'},{name:'阳台',who:false,ic:'🌿'},
 {name:'餐厅',who:false,ic:'🍽️'},{name:'卫生间',who:false,ic:'🚿'},
];
const ROOM_IC={
 '客厅':'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3"/><path d="M3 13a2 2 0 0 1 4 0v1h10v-1a2 2 0 0 1 4 0v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M5 18v1.5M19 18v1.5"/></svg>',
 '主卧':'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6a5bd8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5"/><path d="M3 16h18"/><path d="M6 11V8.5A1.5 1.5 0 0 1 7.5 7h9A1.5 1.5 0 0 1 18 8.5V11"/></svg>',
 '儿童房':'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f29900" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="4.5"/><circle cx="7.8" cy="6" r="1.8"/><circle cx="16.2" cy="6" r="1.8"/><path d="M8.5 14.2c-2 .9-3 2.6-3 4.8h13c0-2.2-1-3.9-3-4.8"/><circle cx="10.5" cy="9.5" r=".5" fill="#f29900"/><circle cx="13.5" cy="9.5" r=".5" fill="#f29900"/></svg>',
 '厨房':'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e54545" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="13" r="6"/><path d="M15.5 10.5 21 8"/><path d="M7.3 13a2.7 2.7 0 0 1 2.7-2.7"/></svg>',
 '书房':'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00b8a9" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H19v17.5H7.5A2.5 2.5 0 0 0 5 22z"/><path d="M5 19.5A2.5 2.5 0 0 1 7.5 17H19"/><path d="M9.5 7h5"/></svg>',
 '阳台':'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34a853" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21v-8"/><path d="M12 13c0-4-2.5-6-6.5-6C5.5 11 8 13 12 13zM12 13c0-4 2.5-6 6.5-6C18.5 11 16 13 12 13z"/><path d="M8 21h8"/></svg>',
 '餐厅':'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b26a00" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v6a2.5 2.5 0 0 0 2.5 2.5V21M6 3v4M11 3v4a2.5 2.5 0 0 1-2.5 2.5"/><path d="M17.5 3c-2 1.5-2.6 4-2.6 6.5 0 2 1 3 2.6 3V21"/></svg>',
 '卫生间':'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4a90d9" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 4a5 5 0 0 1 5 5H8a5 5 0 0 1 5-5z"/><path d="M13 4V2.5"/><path d="M9.8 12 9.3 14M13 12v2M16.2 12l.5 2M11.5 17l-.4 1.6M15 17l.4 1.6"/></svg>',
};
const roomDevs=r=>DEVICES.filter(d=>d.room===r);
const runCount=DEVICES.filter(d=>d.on).length;
const SCENES=[
 {n:'回家模式',img:'img/sc_home.png'},{n:'离家模式',img:'img/sc_away.png'},
 {n:'观影模式',img:'img/sc_movie.png'},{n:'睡眠模式',img:'img/sc_sleep.png'},
 {n:'会客模式',img:'img/sc_guest.png'},{n:'节能模式',img:'img/sc_eco.png'},
];
function sceneBarHTML(){return `<div class="scene-bar"><h4>场景快捷控制</h4><div class="sc-row">${SCENES.map(s=>`<button class="scene-btn" data-scene="${s.n}"><img src="${s.img}"><span>${s.n}</span></button>`).join('')}</div></div>`}
function bindSceneBar(el){el.querySelectorAll('[data-scene]').forEach(b=>b.onclick=()=>{b.style.transform='scale(.94)';setTimeout(()=>b.style.transform='',220);toast(`执行「${b.dataset.scene}」场景成功`)});const sr=el.querySelector('.sc-row');if(sr)dragScroll(sr)}
const MSGS=[
 {g:'今天',items:[
  {tag:'安全提醒',c:'#e54545',t:'燃气灶未关提醒',p:'19:00 检测到已离家但燃气灶未关，请注意安全。已为您推送一键关火，可在设备页远程操作。',time:'今天 19:00'},
  {tag:'完成提醒',c:'#f29900',t:'蒸烤箱即将完成',p:'蒸烤箱正在蒸鲈鱼，还剩 5 分钟完成。',time:'今天 18:55'},
  {tag:'完成提醒',c:'#f29900',t:'煮饭提醒',p:'米洗好了，是不是忘记开始煮饭啦。点击可远程启动电饭煲。',time:'今天 18:00'},
  {tag:'安全提醒',c:'#e54545',t:'冰箱门未关',p:'15:01 检测到厨房冰箱门未关，请及时处理，避免冷气流失。',time:'今天 15:01'},
  {tag:'滤芯寿命',c:'#00a8c6',t:'反渗透滤芯即将到期',p:'厨房净水器 RO 反渗透滤芯寿命还剩 3 天，建议尽快更换。',time:'今天 14:20'},
  {tag:'用电提醒',c:'#7c4dff',t:'用电量偏高',p:'昨日全屋用电 18.6 度，较近 30 天日均偏高 23%，主要来自客厅空调长时间运行。',time:'今天 11:05'}]},
 {g:'昨天',items:[
  {tag:'完成提醒',c:'#f29900',t:'洗衣完成',p:'阳台洗衣机混合洗已完成，请及时晾晒衣物。',time:'昨天 21:30'},
  {tag:'空调清洗',c:'#34a853',t:'儿童房空调清洗提醒',p:'儿童房空调已 1 年未清洗，准备入夏频繁使用，建议预约深度清洗，以免滋生细菌影响健康。',time:'昨天 19:12'},
  {tag:'设备故障',c:'#e54545',t:'洗衣机传感器异常（已恢复）',p:'阳台洗衣机水位传感器短暂异常，系统已自动恢复，如再次出现请联系售后。',time:'昨天 09:40'}]},
 {g:'更早',items:[
  {tag:'设备故障',c:'#e54545',t:'新风机传感器离线',p:'客厅新风机 PM2.5 传感器离线，已尝试重连 3 次未果，建议检查设备供电。',time:'7月20日 16:42'},
  {tag:'滤芯寿命',c:'#00a8c6',t:'PP 棉滤芯已更换',p:'厨房净水器 PP 棉滤芯更换完成，寿命已重置为 100%。',time:'7月18日 10:05'},
  {tag:'用电提醒',c:'#7c4dff',t:'月度用电报告已生成',p:'6 月全屋用电 412 度，环比下降 8%，光伏自发自用率 67%。',time:'7月15日 08:00'}]},
];
/* ================= 手机短信数据 ================= */
const SMS_THREADS=[
 {id:'kd',name:'菜鸟驿站',c:'#f29900',lb:'驿',un:1,time:'今天 14:02',
  snip:'【中通快递】取件码 8-2-6305，包裹已到达小区东门店',
  msgs:[
   {who:'them',time:'今天 14:02',text:'【中通快递】您的包裹 ZT7351881206（格力净水器 RO 反渗透滤芯）已到达菜鸟驿站（小区东门店），取件码 8-2-6305，请于 21:00 前取件。'}]},
 {id:'train',name:'铁路 12306',c:'#1a73e8',lb:'铁',un:1,time:'昨天 18:20',
  snip:'【铁路12306】您已购 8月8日 G6158 次 珠海→广州南',
  msgs:[
   {who:'them',time:'昨天 18:20',text:'【铁路12306】张明，您已购 8月8日 G6158 次列车：珠海站 10:35 开 → 广州南 11:42 到，二等座 06 车 12A 号。请携带购票证件进站乘车。'},
   {who:'me',time:'昨天 18:21',text:'收到，已加入家庭日历'},
   {who:'them',time:'昨天 18:21',text:'【铁路12306】温馨提示：珠海站周末客流较大，建议提前 45 分钟到站。'}]},
 {id:'bank',name:'招商银行',c:'#e5484d',lb:'招',un:0,time:'8月5日 10:00',
  snip:'【招商银行】您尾号 6688 账户入账工资 23,600.00 元',
  msgs:[
   {who:'them',time:'8月5日 10:00',text:'【招商银行】您尾号 6688 账户于 8月5日 10:00 入账工资人民币 23,600.00 元，活期余额 58,204.16 元。'},
   {who:'them',time:'8月5日 10:01',text:'【招商银行】温馨提示：本月房贷将于 8月10日 自动扣款 6,850.00 元，请确保余额充足。'}]},
 {id:'cmcc',name:'中国移动 10086',c:'#5b8def',lb:'移',un:0,time:'8月4日 09:00',
  snip:'【中国移动】您 7 月话费账单 86.50 元已出',
  msgs:[
   {who:'them',time:'8月4日 09:00',text:'【中国移动】尊敬的客户，您 7 月话费账单 86.50 元已出：套餐费 68.00 元，流量加餐包 18.50 元。当前余额 42.30 元，回复 CXYE 查询详情。'}]},
 {id:'mom',name:'妈妈',img:'img/a_mom.png',un:1,time:'周二 20:15',
  snip:'这周六回家吃饭吗？你爸买了你爱吃的鲈鱼',
  msgs:[
   {who:'them',time:'周二 20:15',text:'这周六回家吃饭吗？你爸买了你爱吃的鲈鱼'},
   {who:'me',time:'周二 20:18',text:'回的，周六中午到。鲈鱼让爸别红烧了，我用蒸烤箱给你们清蒸'},
   {who:'them',time:'周二 20:19',text:'好呀，那你早点来，米我也提前泡上'}]},
 {id:'gree',name:'董明珠店',c:'#df7642',lb:'格',un:0,time:'7月30日 15:44',
  snip:'【董明珠店】验证码 482916，您正在登录董明珠店',
  msgs:[
   {who:'them',time:'7月30日 15:44',text:'【董明珠店】验证码 482916，您正在登录董明珠店 App，5 分钟内有效。为保障账号安全，请勿泄露给他人。'}]},
];
function smsListHTML(){
  return `<div class="page-scroll" style="padding:10px 14px 20px" id="smsBody">
   <button class="msg-item sms-row sms-compose" id="smsCompose">
    <span class="sms-ava" style="background:#1a73e8"><i>✎</i></span>
    <div class="mi-t"><div class="mi-top"><h4>编写新短信</h4></div><p>新建会话 · RCS 融合消息</p></div>
    <span class="sms-compose-go">›</span></button>
   ${SMS_THREADS.map(t=>`
   <button class="msg-item sms-row" data-sms="${t.id}">
    <span class="sms-ava" style="${t.img?'':'background:'+t.c}">${t.img?`<img src="${t.img}" alt="${t.name}">`:`<i>${t.lb}</i>`}</span>
    <div class="mi-t"><div class="mi-top"><h4>${t.name}</h4><time>${t.time}</time></div>
     <p>${t.snip}</p></div>
    ${t.un?`<span class="sms-un">${t.un}</span>`:''}</button>`).join('')}
   <div style="text-align:center;color:#b0a892;font-size:10px;padding:16px 0 4px;letter-spacing:.08em">RSC 融合消息已开启 · 共 ${SMS_THREADS.length} 个会话</div></div>`;
}
function openSmsCompose(){
  const m=openModal(`<div class="ac-sheet-t">新建短信</div>
   <div class="ac-opt"><span>收件人</span><input id="smsCTo" placeholder="输入联系人或号码" style="margin-left:auto;text-align:right;border:none;outline:none;font-size:13px;background:transparent;min-width:0;flex:1"></div>
   <div style="padding:8px 4px 4px"><textarea id="smsCText" rows="4" placeholder="输入短信内容…" style="width:100%;border:1px solid #eee;border-radius:12px;padding:10px 12px;font-size:13px;resize:none;outline:none;font-family:inherit"></textarea></div>
   <div class="ac-opt" id="smsCSend"><span style="margin:auto;color:#0284c7;font-weight:700">发送</span></div>`);
  m.querySelector('#smsCSend').onclick=()=>{
    const to=m.querySelector('#smsCTo').value.trim()||'新联系人';
    const txt=m.querySelector('#smsCText').value.trim()||'（空白短信）';
    SMS_THREADS.unshift({id:'new'+Date.now(),name:to,c:'#1a73e8',lb:to[0]||'新',un:0,time:'刚刚',
      snip:txt,msgs:[{who:'me',time:'刚刚',text:txt}]});
    closeModal(m);
    const wrap=document.querySelector('#msgTabBody');
    if(wrap){wrap.innerHTML=smsListHTML();bindSmsList(wrap);}
    toast('短信已发送（演示）');};
}
function bindSmsList(root){
  root.querySelectorAll('[data-sms]').forEach(b=>b.onclick=()=>openSmsThread(b.dataset.sms));
  const cp=root.querySelector('#smsCompose');if(cp)cp.onclick=openSmsCompose;
}
function openSmsThread(id){
  const t=SMS_THREADS.find(x=>x.id===id);if(!t)return;
  t.un=0;
  const body=t.msgs.map((m,i)=>{
    const showT=i===0||m.time!==t.msgs[i-1].time;
    return `${showT?`<div class="sms-time">${m.time}</div>`:''}<div class="sms-b ${m.who}">${m.text}</div>`;
  }).join('');
  openPage(`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button><h1>${t.name}</h1><span class="pg-extra"></span></div>
   <div class="sms-thread" id="smsThread">${body}</div>
   <div class="sms-inputbar"><span class="sms-plus">＋</span><input id="smsInput" placeholder="短信 · RCS" autocomplete="off"><button id="smsSend">发送</button></div>`,
   el=>{
    const th=el.querySelector('#smsThread');th.scrollTop=th.scrollHeight;
    const send=()=>{const inp=el.querySelector('#smsInput');if(!inp.value.trim())return;
      th.insertAdjacentHTML('beforeend',`<div class="sms-b me">${inp.value.trim().replace(/</g,'&lt;')}</div>`);
      inp.value='';th.scrollTop=th.scrollHeight;
      setTimeout(()=>{th.insertAdjacentHTML('beforeend',`<div class="sms-b them">收到啦（演示自动回复）</div>`);th.scrollTop=th.scrollHeight;},900);};
    el.querySelector('#smsSend').onclick=send;
    el.querySelector('#smsInput').addEventListener('keydown',e=>{if(e.key==='Enter')send();});
  });
}
const AIR={
 '全屋':{t:27.5,h:68,aqi:'优',aqv:32,pm:18,tvoc:'0.32',hcho:'0.04',co2:645},
 '客厅':{t:27.2,h:66,aqi:'优',aqv:30,pm:16,tvoc:'0.30',hcho:'0.03',co2:620},
 '主卧':{t:27.8,h:70,aqi:'优',aqv:35,pm:21,tvoc:'0.36',hcho:'0.05',co2:702},
 '儿童房':{t:27.0,h:65,aqi:'优',aqv:28,pm:14,tvoc:'0.28',hcho:'0.03',co2:588},
 '厨房':{t:29.4,h:72,aqi:'良',aqv:58,pm:34,tvoc:'0.51',hcho:'0.06',co2:760},
 '书房':{t:27.6,h:64,aqi:'优',aqv:33,pm:19,tvoc:'0.33',hcho:'0.04',co2:655},
 '阳台':{t:30.2,h:75,aqi:'良',aqv:52,pm:30,tvoc:'0.40',hcho:'0.04',co2:540},
 '卫生间':{t:28.1,h:78,aqi:'优',aqv:38,pm:22,tvoc:'0.44',hcho:'0.05',co2:690},
 '餐厅':{t:27.4,h:67,aqi:'优',aqv:31,pm:17,tvoc:'0.31',hcho:'0.04',co2:630},
};
const FOODS=[
 {name:'鲈鱼',cat:'水产',img:'img/fish.png',pos:'冷藏室 L1 · A 格',qty:'1 条',days:2,
  baike:'鲈鱼富含优质蛋白与 DHA，肉质细嫩少刺，是家常清蒸的首选鱼类。',
  keep:'0-4°C 冷藏保存，建议 2 天内食用；如需久存请清理后冷冻。',
  nut:'每 100g 约含蛋白质 18.6g、脂肪 3.4g，富含硒与维生素 B 族。',
  dishes:['清蒸鲈鱼','鲈鱼豆腐汤']},
 {name:'鸡蛋',cat:'蛋奶',img:'img/eggs.png',pos:'冷藏室 L1 · B 格',qty:'12 枚',days:6,
  baike:'鸡蛋是最经济的完全蛋白来源之一，蛋黄含卵磷脂与胆碱。',
  keep:'尖头朝下冷藏保存，避免清洗后存放，保质期约 15 天。',
  nut:'每枚约含蛋白质 6.5g、胆碱 147mg，维生素 A/D 丰富。',
  dishes:['番茄炒蛋','虾仁蒸水蛋']},
 {name:'鲜牛奶',cat:'蛋奶',img:'img/milk.png',pos:'冷藏室 L2 · A 格',qty:'2 瓶',days:3,
  baike:'巴氏鲜牛奶保留更多活性营养，钙与蛋白的优质来源。',
  keep:'2-6°C 冷藏，开封后 24 小时内饮用完毕。',
  nut:'每 100ml 约含蛋白质 3.2g、钙 104mg。',
  dishes:['牛奶炖蛋','酸奶蛋糕']},
 {name:'西兰花',cat:'蔬菜',img:'img/broccoli.png',pos:'冷藏室 L2 · B 格',qty:'1 颗',days:4,
  baike:'西兰花属十字花科，维生素 C 含量超过橙子，膳食纤维丰富。',
  keep:'用厨房纸包裹后装保鲜袋冷藏，建议 4 天内食用。',
  nut:'每 100g 含维生素 C 约 51mg、膳食纤维 2.6g。',
  dishes:['蒜蓉西兰花','西兰花炒鸡胸']},
 {name:'西红柿',cat:'蔬菜',img:'img/tomato.png',pos:'冷藏室 L2 · C 格',qty:'6 个',days:5,
  baike:'西红柿富含番茄红素，加热后更易被人体吸收。',
  keep:'成熟番茄冷藏并尽快食用；偏生的可室温催熟。',
  nut:'每 100g 含番茄红素约 3mg、维生素 C 14mg。',
  dishes:['番茄炒蛋','番茄牛腩']},
 {name:'嫩豆腐',cat:'豆品',img:'img/tofu.png',pos:'冷藏室 L3 · A 格',qty:'2 盒',days:2,
  baike:'嫩豆腐口感滑嫩，植物蛋白丰富，适合蒸、煮、凉拌。',
  keep:'浸清水冷藏并每日换水，建议 2 天内食用。',
  nut:'每 100g 含蛋白质 6.2g、钙 116mg，低脂易消化。',
  dishes:['鲈鱼豆腐汤','麻婆豆腐']},
 {name:'菠菜',cat:'蔬菜',img:'img/spinach.png',pos:'冷藏室 L3 · B 格',qty:'1 把',days:2,
  baike:'菠菜富含铁与叶酸，焯水后可去除大部分草酸。',
  keep:'摘除烂叶后保鲜袋冷藏，建议 2 天内食用。',
  nut:'每 100g 含铁 2.9mg、叶酸 194μg。',
  dishes:['上汤菠菜','菠菜蛋花汤']},
 {name:'红富士苹果',cat:'水果',img:'img/apple.png',pos:'冷藏室 L3 · C 格',qty:'8 个',days:12,
  baike:'红富士脆甜多汁，果胶丰富，耐储存。',
  keep:'冷藏可存 2 周以上，与香蕉分开放置避免催熟。',
  nut:'每 100g 含膳食纤维 2.4g、钾 119mg。',
  dishes:['苹果银耳羹']},
 {name:'百香果',cat:'水果',img:'img/passion.png',pos:'冷藏室 L1 · C 格',qty:'4 个',days:-2,
  baike:'百香果富含维 C 与芳香物质，可直接挖食或泡水，香气浓郁。',
  keep:'冷藏可存约 1 周，表皮起皱后甜度更高，但需尽快食用。',
  nut:'每 100g 含维生素 C 约 30mg、膳食纤维 10.4g。',
  dishes:['百香果蜂蜜水','百香果酸奶']},
 {name:'西冷牛排',cat:'肉禽',img:'img/beef.png',pos:'冷冻室 L1 · A 格',qty:'4 块',days:58,
  baike:'西冷牛排带油边，煎烤后肉香浓郁，肌间脂肪均匀。',
  keep:'-18°C 冷冻可存 2 个月，烹饪前冷藏解冻 12 小时。',
  nut:'每 100g 含蛋白质 20g、铁 2.6mg、锌 4.8mg。',
  dishes:['香煎牛排','黑椒牛肉粒']},
 {name:'鸡胸肉',cat:'肉禽',img:'img/chicken.png',pos:'冷冻室 L1 · B 格',qty:'2 块',days:45,
  baike:'鸡胸肉高蛋白低脂肪，是健身餐常用食材。',
  keep:'-18°C 冷冻保存，解冻后 24 小时内烹饪。',
  nut:'每 100g 含蛋白质 23g、脂肪仅 1.9g。',
  dishes:['西兰花炒鸡胸','蜜汁烤鸡翅']},
];
/* 食材新鲜度统一口径：[文字, 色, 底色]；days<0 为已过期 */
function freshTag(f){
  if(f.days<0)return [`已过期 ${-f.days} 天`,'var(--red)','#fdeaea'];
  if(f.days<=3)return [`剩 ${f.days} 天`,'var(--red)','#fdeaea'];
  if(f.days<=7)return [`剩 ${f.days} 天`,'var(--orange)','#fdf3e3'];
  return ['新鲜','#0d5c34','#e9f9ef'];
}
const FOOD_EXP=()=>FOODS.filter(f=>f.days<0);
const FOOD_NEAR=()=>FOODS.filter(f=>f.days>=0&&f.days<=7);
const RECIPES={
 jieqi:[
  {name:'冰糖绿豆汤',img:'img/r_mung.png',tag:'大暑 · 清热解暑',dev:null,
   ing:[['绿豆','150g',false],['冰糖','30g',false],['清水','1.2L',false]],
   nut:'清热解暑，补充水分与钾。',steps:['绿豆洗净浸泡 2 小时','加水大火煮沸转小火 40 分钟','加入冰糖再煮 5 分钟','放凉后冷藏风味更佳']},
  {name:'冬瓜排骨汤',img:'img/r_soup.png',tag:'大暑 · 祛湿生津',dev:'rice',
   ing:[['排骨','400g',false],['冬瓜','300g',false],['姜片','3 片',false],['盐','适量',false]],
   nut:'低脂高蛋白，祛湿补水。',steps:['排骨焯水去浮沫','与姜片入锅加水 1.5L','煲煮 60 分钟后下冬瓜','再煮 20 分钟调味即可']},
  {name:'清蒸鲈鱼',img:'img/r_fish.png',tag:'大暑 · 清淡高蛋白',dev:'oven',
   ing:[['鲈鱼','1 条',true],['姜丝','10g',false],['蒸鱼豉油','15ml',false],['葱丝','适量',false]],
   nut:'优质蛋白 18.6g/100g，清淡少油。',steps:['鲈鱼两面改刀，姜丝铺底','蒸烤箱纯蒸 100°C 蒸 12 分钟','倒掉盘中汁水，淋蒸鱼豉油','撒葱丝，泼热油激香']},
  {name:'苹果银耳羹',img:'img/r_pudding.png',tag:'大暑 · 润燥养颜',dev:null,
   ing:[['红富士苹果','1 个',true],['银耳','半朵',false],['枸杞','10 粒',false],['冰糖','20g',false]],
   nut:'果胶 + 银耳多糖，润燥补水。',steps:['银耳泡发撕小朵','加水炖 50 分钟出胶','加入苹果块与冰糖','再煮 10 分钟撒枸杞']},
 ],
 oven:[
  {name:'清蒸鲈鱼',img:'img/r_fish.png',tag:'纯蒸 · 12 分钟',dev:'oven',
   ing:[['鲈鱼','1 条',true],['姜丝','10g',false],['蒸鱼豉油','15ml',false],['葱丝','适量',false]],
   nut:'优质蛋白 18.6g/100g。',steps:['鲈鱼改刀铺姜丝','纯蒸 100°C 12 分钟','淋豉油撒葱丝','泼热油激香']},
  {name:'蜜汁烤鸡翅',img:'img/r_wings.png',tag:'嫩烤 · 22 分钟',dev:'oven',
   ing:[['鸡翅中','8 个',false],['蜂蜜','20g',false],['生抽','15ml',false],['蒜末','10g',false]],
   nut:'高蛋白，烤箱少油版。',steps:['鸡翅划口腌制 30 分钟','嫩烤 200°C 烤 18 分钟','刷蜂蜜水','再烤 4 分钟上色']},
  {name:'虾仁蒸水蛋',img:'img/r_egg.png',tag:'纯蒸 · 10 分钟',dev:'oven',
   ing:[['鸡蛋','3 枚',true],['虾仁','6 只',false],['温水','蛋液 1.5 倍',false],['生抽','少许',false]],
   nut:'滑嫩易消化，老少皆宜。',steps:['鸡蛋加温水打散过筛','盖保鲜膜扎孔','纯蒸 95°C 蒸 8 分钟','放虾仁再蒸 2 分钟，淋生抽']},
  {name:'酸奶蛋糕',img:'img/r_cake.png',tag:'烘焙 · 45 分钟',dev:'oven',
   ing:[['鲜牛奶','200ml',true],['鸡蛋','3 枚',true],['低筋面粉','60g',false],['细砂糖','40g',false]],
   nut:'轻乳酪口感，低油低糖。',steps:['酸奶与蛋黄搅匀筛入面粉','蛋白加糖打发','翻拌均匀入模','水浴 150°C 烤 45 分钟']},
 ],
 rice:[
  {name:'腊味煲仔饭',img:'img/r_rice.png',tag:'煲仔饭 · 40 分钟',dev:'rice',
   ing:[['大米','2 杯',false],['腊肠','2 根',false],['鸡蛋','1 枚',true],['青菜','2 棵',false]],
   nut:'主食 + 蛋白一锅出。',steps:['米淘洗浸泡 20 分钟','电饭煲选煲仔饭模式','跳闸前 10 分钟铺腊肠','窝蛋焖 8 分钟，淋豉油']},
  {name:'番茄焖饭',img:'img/r_tomegg.png',tag:'精煮饭 · 45 分钟',dev:'rice',
   ing:[['大米','2 杯',false],['西红柿','2 个',true],['鸡蛋','2 枚',true],['盐','少许',false]],
   nut:'酸甜开胃，维 C 丰富。',steps:['番茄顶部划十字放米上','正常水量精煮','跳闸后捣散番茄','拌入炒熟的鸡蛋']},
  {name:'冬瓜排骨汤',img:'img/r_soup.png',tag:'煲汤 · 80 分钟',dev:'rice',
   ing:[['排骨','400g',false],['冬瓜','300g',false],['姜片','3 片',false],['盐','适量',false]],
   nut:'低脂高蛋白，祛湿补水。',steps:['排骨焯水','加姜片与水选煲汤','60 分钟后下冬瓜','再煮 20 分钟调味']},
  {name:'牛奶炖蛋',img:'img/r_pudding.png',tag:'蒸煮 · 15 分钟',dev:'rice',
   ing:[['鲜牛奶','250ml',true],['鸡蛋','2 枚',true],['细砂糖','20g',false]],
   nut:'钙与蛋白双补，口感丝滑。',steps:['牛奶加糖微温化开','冲入蛋液搅匀过筛','电饭煲蒸煮 12 分钟','焖 3 分钟即可']},
 ],
};
const MALL=[
 {img:'img/m_dehum.png',t:'格力除湿机 · 新品推荐',p:'当前室内湿度 82% 偏高，推荐入手除湿机，梅雨天也能干爽舒适。',btn:'去看看',
  url:'https://fmall.gree.com/distributionh5/#/shopDetail?id=1002986809&skuid=1000317835&distributionShopId=2000001394&fromShopId=2000001394&fromBaseShopId=2000001394&tips=%E9%99%A4%E6%B9%BF%E6%9C%BA&fromPage=search&shopId=2000001394&baseShopId=2000001394'},
 {img:'img/m_clean.png',t:'儿童房空调清洗提醒',p:'已 1 年未清洗，入夏高频使用前建议深度清洗，以免滋生细菌影响健康。',btn:'预约清洗',
  url:'https://fmall.gree.com/distributionh5/#/shopDetail?id=1002972878&skuid=1000302383&distributionShopId=2000001394&fromShopId=2000001394&fromBaseShopId=2000001394&tips=%E6%B8%85%E6%B4%97&fromPage=search&shopId=2000001394&baseShopId=2000001394'},
 {img:'img/m_filter.png',t:'净水器反渗透滤芯',p:'RO 反渗透滤芯寿命还剩 3 天，一键下单，次日可达。',btn:'一键下单',
  url:'https://fmall.gree.com/distributionh5/#/shopDetail?id=1002982112&skuid=1000312377&distributionShopId=2000001394&topic=topic_200137&shopId=2000001394&baseShopId=2000001394'},
 {img:'img/m_ac.png',t:'空调以旧换新',p:'检测到书房空调已使用超过 10 年，换新至高补贴 800 元，新一级能效更省电。',btn:'立即换新',
  url:'https://fmall.gree.com/distributionh5/#/shopDetail?id=1003529469&skuid=1000895051&distributionShopId=2000001394&shopId=2000001394&baseShopId=2000001394'},
];
const FAMILY=[
 {img:'img/a_dad.png',n:'张明',r:'爸爸 · 户主',d:'38 岁，格力家庭账号管理员，负责全屋设备配网与场景设置。'},
 {img:'img/a_mom.png',n:'李婷',r:'妈妈',d:'36 岁，常用功能：私人衣橱、营养管家菜谱推荐。'},
 {img:'img/a_grandpa.png',n:'张建国',r:'爷爷',d:'65 岁，已开启长辈关怀模式，字体放大、语音播报提醒。'},
 {img:'img/a_girl.png',n:'张笑笑',r:'女儿',d:'7 岁，儿童房设备独立管理，22:00 后空调自动调至 27°C 睡眠模式。'},
];
