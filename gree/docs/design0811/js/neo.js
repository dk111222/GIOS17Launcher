/* ================= 食品仓 ================= */
let foodTab='jieqi';
function openFoodPage(){
  const secs=[
   {n:'冷藏室',items:FOODS.filter(f=>f.pos.includes('冷藏'))},
   {n:'冷冻室',items:FOODS.filter(f=>f.pos.includes('冷冻'))},
  ];
  const ovenSt=S.oven.cooking?`<p><span class="cook-anim"></span>正在烹饪 ${S.oven.dish}</p><div class="remain" id="ringOven">${fmt(S.oven.left)}</div>`:'<p>待机中 · 上次烹饪 清蒸鲈鱼</p>';
  const riceSt=S.rice.cooking?`<p><span class="cook-anim"></span>正在烹饪 ${S.rice.dish}</p><div class="remain" id="ringRice">${fmt(S.rice.left)}</div>`:'<p>待机中 · 米已洗好待煮</p>';
  const tabs=[['jieqi','二十四节气'],['oven','蒸烤箱推荐'],['rice','电饭煲推荐']];
  const NUTRI=[
   {m:0,tag:['高蛋白低脂','#e8f1ff','#1a73e8'],foods:['西兰花','鸡胸肉'],note:'健身管理 · 补充优质蛋白'},
   {m:1,tag:['补钙养颜','#fdeef5','#d64488'],foods:['鲈鱼','嫩豆腐'],note:'补充胶原蛋白与钙质'},
   {m:2,tag:['软烂易消化','#fdf3e3','#b26a00'],foods:['鸡蛋','菠菜'],note:'低盐低脂 · 补铁护心'},
   {m:3,tag:['成长发育','#e9f9ef','#0d5c34'],foods:['鲜牛奶','红富士苹果'],note:'补钙与维生素 · 少食多餐'},
  ];
  const nutriHTML=`<div class="fridge-sec"><h3>家庭成员营养推荐<small>按健康档案与冰箱库存生成</small></h3></div>
   <div class="nut-scroll">${NUTRI.map(n=>{const f=FAMILY[n.m];return `
    <div class="nut-card"><div class="nut-head"><img src="${f.img}"><div><h4>${f.n} · ${f.r}</h4><span>${n.note}</span></div></div>
     <span class="nut-tag" style="color:${n.tag[2]};background:${n.tag[1]}">${n.tag[0]}</span>
     ${n.foods.map(fn=>{const fd=FOODS.find(x=>x.name===fn)||FOODS[0];
       const fresh=fd.days<0?['已过期','#fdeaea','var(--red)']:fd.days<=3?['剩 '+fd.days+' 天','#fdeaea','var(--red)']:fd.days<=7?['剩 '+fd.days+' 天','#fdf3e3','#b26a00']:['新鲜','#e9f9ef','#0d5c34'];
       return `<div class="nut-food"><img src="${fd.img}"><div><h6>${fd.name} · ${fd.qty}</h6><p>${fd.pos}</p></div><span class="fresh" style="color:${fresh[2]};background:${fresh[1]}">${fresh[0]}</span></div>`}).join('')}
    </div>`}).join('')}</div>`;
  const el=openPage(`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button><h1>营养管家</h1><span class="pg-extra">${FOODS.length} 种食材</span><button class="pg-back" id="foodAdd" title="拍照录入食材"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 5v14M5 12h14"/></svg></button></div>
   <div class="page-scroll" style="padding-bottom:20px">
    ${aiSvcBannerHTML('食品健康','12px 14px 0')}
    ${nutriHTML}
    <div class="report-entry">
     <button class="re" id="foodConsume" style="background:linear-gradient(135deg,#b26a00,#f29900)">
      <svg style="position:absolute;right:-14px;top:-16px;z-index:1;opacity:.22" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round"><path d="M4 13a8 8 0 0 1 16 0z"/><path d="M12 5V3M9 3.5h6"/><circle cx="12" cy="13" r="1.6" fill="#fff" stroke="none"/></svg>
      <span class="re-t"><b>食材消耗及营养摄入</b><small>本周消耗 32 种 · 蛋白达标 92% ›</small></span></button>
     <button class="re" id="foodShop" style="background:linear-gradient(135deg,#0d5c34,#34a853)">
      <svg style="position:absolute;right:-14px;top:-16px;z-index:1;opacity:.22" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round"><path d="M5 8h14l-1.5 12h-11z"/><path d="M8.5 8a3.5 3.5 0 0 1 7 0M9.5 12v4M14.5 12v4"/></svg>
      <span class="re-t"><b>食材采购补充建议</b><small>8 条建议 · 为 4 位家人定制 ›</small></span></button>
    </div>
    ${secs.map(s=>`<div class="fridge-sec"><h3>${s.n}<small>智能识别 · 自动录入</small></h3>
      <div class="ing-grid">${s.items.map((f)=>`<div class="ing-cell" data-ing="${f.name}">
        ${f.days<=7?`<span class="exp" style="background:${f.days<=3||f.days<0?'var(--red)':'var(--orange)'}">${freshTag(f)[0]}</span>`:''}
        <img src="${f.img}"><h5>${f.name}</h5><p>${f.pos}<br>${f.qty}</p></div>`).join('')}</div></div>`).join('')}
    <div class="fridge-sec"><h3>厨房烹饪设备</h3></div>
    <div class="dev-status-row">
      <div class="dsr" id="dsOven"><h5>${devIcon('oven','#e54545')} 蒸烤箱</h5><div id="dsOvenB">${ovenSt}</div></div>
      <div class="dsr" id="dsRice"><h5>${devIcon('rice','#f29900')} 电饭煲</h5><div id="dsRiceB">${riceSt}</div><button class="mini-btn" id="riceSoftBtn">软硬度：${S.riceSoft||'柔软口感'} ›</button></div>
    </div>
    <div class="fridge-sec"><h3>菜谱推荐</h3></div>
    <div class="tab-strip" style="padding-top:0">${tabs.map(t=>`<button class="chip ${foodTab===t[0]?'on':''}" data-ft="${t[0]}">${t[1]}</button>`).join('')}</div>
    <div class="recipe-strip" id="recipeStrip"></div>
   </div>`);
  function renderRecipes(){
    el.querySelector('#recipeStrip').innerHTML=RECIPES[foodTab].map((r,i)=>`
      <div class="recipe-card" data-rc="${i}"><img src="${r.img}"><div class="rc-t"><h5>${r.name}</h5><p>${r.tag}</p></div></div>`).join('');
    el.querySelectorAll('[data-rc]').forEach(c=>c.onclick=()=>openRecipe(RECIPES[foodTab][+c.dataset.rc]));
  }
  el.querySelectorAll('[data-ft]').forEach(b=>b.onclick=()=>{foodTab=b.dataset.ft;
    el.querySelectorAll('[data-ft]').forEach(x=>x.classList.toggle('on',x===b));renderRecipes()});
  el.querySelectorAll('[data-ing]').forEach(c=>c.onclick=()=>openIngredient(FOODS.find(f=>f.name===c.dataset.ing)));
  el.querySelector('#dsOven').onclick=()=>openDeviceCtl(DEVICES.find(d=>d.id==='ov1'));
  el.querySelector('#dsRice').onclick=()=>openDeviceCtl(DEVICES.find(d=>d.id==='rc1'));
  const rsb=el.querySelector('#riceSoftBtn');
  if(rsb)rsb.onclick=e=>{e.stopPropagation();openRiceSoftSheet(v=>{rsb.textContent='软硬度：'+v+' ›';})};
  el.querySelectorAll('.nut-scroll,.recipe-strip').forEach(x=>dragScroll(x));
  el.querySelector('#foodConsume').onclick=()=>openFoodConsume();
  el.querySelector('#foodShop').onclick=()=>openFoodShop();
  el.querySelector('#foodAdd').onclick=()=>openCamMock('请对准食材拍照','识别成功：青椒 ×3，已录入冷藏室',()=>{
    FOODS.push({name:'青椒',cat:'蔬菜',img:'img/pepper.png',pos:'冷藏室 L3 · C 格',qty:'3 个',days:7,
      baike:'青椒维生素 C 含量在蔬菜中名列前茅，口感脆嫩爽口，可炒可拌。',
      keep:'保鲜袋包裹后冷藏，建议 7 天内食用，避免与苹果同放以免催熟。',
      nut:'每 100g 含维生素 C 约 72mg、膳食纤维 1.4g，热量极低。',
      dishes:['青椒炒肉丝','虎皮青椒']});
    closePage();openFoodPage();
  });
  renderRecipes();
}
/* ================= 食材消耗及营养摄入 ================= */
function openFoodConsume(){
  const cats=[['蔬菜类',32,'#34a853'],['肉禽水产',26,'#e54545'],['蛋奶类',18,'#f29900'],['水果类',14,'#d64488'],['谷物主食',10,'#b26a00']];
  const nuts=[['热量','2,050','kcal',96,'#1a73e8'],['蛋白质','78','g',92,'#e54545'],['膳食纤维','24','g',80,'#34a853'],['钙','860','mg',86,'#f29900'],['维生素 C','95','mg',105,'#00b8a9']];
  const veg=[310,265,380,290,340,255,365],days=['二','三','四','五','六','日','一'];
  const vegSvg=`<svg viewBox="0 0 340 120" class="chart-box">${veg.map((v,i)=>{const h=v/400*84;const x=16+i*(308/7)+(308/7-22)/2;
    return `<rect x="${x.toFixed(1)}" y="${104-h}" width="22" height="${h}" rx="6" fill="${v>=300?'#34a853':'#bfe6c9'}"/><text x="${x+11}" y="${100-h}" font-size="8" fill="#9aa0a6" text-anchor="middle">${v}</text><text x="${x+11}" y="116" font-size="8" fill="#9aa0a6" text-anchor="middle">${days[i]}</text>`}).join('')}
   <line x1="10" y1="${104-300/400*84}" x2="330" y2="${104-300/400*84}" stroke="#0d5c34" stroke-width="1" stroke-dasharray="4 4" opacity=".5"/><text x="328" y="${100-300/400*84}" font-size="7.5" fill="#0d5c34" text-anchor="end">推荐 300g</text></svg>`;
  const memberTips=[
   [3,'钙摄入仅达标 76%','建议每日 1 盒高钙奶，配合户外运动促吸收','#f29900'],
   [2,'钠摄入偏高 18%','建议烹饪少盐少酱油，多用天然香辛料提味','#e54545'],
   [0,'蛋白质缺口约 12%','建议午晚餐各加一份瘦肉或豆制品','#1a73e8'],
   [1,'膳食纤维可再提升','建议加餐蓝莓、牛油果等低 GI 蔬果','#34a853']];
  openPage(`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button><h1>消耗及营养摄入</h1><span class="pg-extra">近 7 天</span></div>
   <div class="page-scroll" style="padding:0 0 24px">
    <div class="ctl-card"><h3>本周食材消耗</h3>
     <div style="display:flex;align-items:baseline;gap:8px;margin:2px 0 10px"><b style="font-size:24px">32</b><span style="font-size:11px;color:var(--ink2)">种食材 · 共 4.2 kg · 较上周 +6%</span></div>
     ${cats.map(c=>`<div style="display:flex;align-items:center;gap:10px;margin-top:9px"><span style="width:64px;font-size:11px;color:var(--ink2)">${c[0]}</span>
       <div style="flex:1;height:8px;border-radius:99px;background:#eef0f3;overflow:hidden"><div style="width:${c[1]}%;height:100%;border-radius:99px;background:${c[2]}"></div></div>
       <b style="width:34px;text-align:right;font-size:11px">${c[1]}%</b></div>`).join('')}
    </div>
    <div class="ctl-card"><h3>冰箱周转</h3>
     <div class="eng-cols" style="margin-top:6px">
      <div class="eng-col"><b>15</b><small>现存食材 种</small></div>
      <div class="eng-col"><b>8</b><small>本周新入 种</small></div>
      <div class="eng-col"><b style="color:#0d5c34">4</b><small>临期已消耗</small></div>
      <div class="eng-col"><b style="color:#0d5c34">0.3<span style="font-size:10px"> kg</span></b><small>浪费量 ↓40%</small></div>
     </div>
    </div>
    <div class="ctl-card"><h3>全家营养摄入 · 日均</h3>
     ${nuts.map(n=>`<div style="display:flex;align-items:center;gap:10px;margin-top:11px">
       <span style="width:58px;font-size:11.5px;color:var(--ink)">${n[0]}</span>
       <b style="width:64px;font-size:12.5px;font-variant-numeric:tabular-nums">${n[1]}<small style="font-size:9px;color:var(--ink3);font-weight:500"> ${n[2]}</small></b>
       <div style="flex:1;height:7px;border-radius:99px;background:#eef0f3;overflow:hidden"><div style="width:${Math.min(n[3],100)}%;height:100%;border-radius:99px;background:${n[4]}"></div></div>
       <span style="width:44px;text-align:right;font-size:10px;font-weight:700;color:${n[3]>=90?'#0d5c34':'#b26a00'}">${n[3]}%</span></div>`).join('')}
     <div style="font-size:10px;color:var(--ink3);margin-top:10px">达标率基于《中国居民膳食指南》4 口之家推荐量折算</div>
    </div>
    <div class="chart-card"><div class="cc-h"><h4>每日蔬菜摄入</h4><span style="margin-left:auto;font-size:10px;color:var(--ink3)">克 · 近 7 天</span></div>${vegSvg}</div>
    <div class="ctl-card"><h3>家庭成员摄入提示</h3>
     ${memberTips.map(t=>{const f=FAMILY[t[0]];return `<div class="ks-row" style="cursor:default"><img src="${f.img}" style="width:34px;height:34px;border-radius:50%;flex:0 0 auto;object-fit:cover"><div><h5>${f.n} · ${t[1]}</h5><p>${t[2]}</p></div><span class="kb" style="color:${t[3]};background:${t[3]}1a">关注</span></div>`}).join('')}
    </div>
   </div>`);
}
/* ================= 食材采购补充建议 ================= */
function openFoodShop(){
  const pri={'高':['#e54545','#fdeeee'],'中':['#b26a00','#fdf3e3'],'低':['#5f6368','#f1f3f6']};
  const G=[
   {m:3,tag:'成长发育',items:[
     ['高钙纯牛奶','2 箱','高','笑笑本周钙摄入仅达标 76%，7 岁正值骨骼发育关键期，每日 1 盒可补足缺口'],
     ['深海三文鱼','500g','中','DHA 促进脑部与视力发育；冰箱水产仅剩鲈鱼 1 条（剩 2 天），需及时补货']]},
   {m:2,tag:'控脂护心',items:[
     ['即食燕麦片','1 kg','高','爷爷本周粗粮摄入不足一半，水溶性膳食纤维辅助控血脂，早餐冲泡方便'],
     ['嫩豆腐','4 盒','中','低脂优质蛋白替代部分红肉，保护心血管，质地软烂适合长辈咀嚼消化']]},
   {m:0,tag:'健身增肌',items:[
     ['牛腱子肉','1 kg','中','高蛋白低脂肪，补足本周 12% 蛋白缺口，卤制后可作健身餐主蛋白'],
     ['香蕉','1 把','低','加班补能补钾，替代高糖零食，运动前后食用更佳']]},
   {m:1,tag:'体重管理',items:[
     ['蓝莓','2 盒','低','花青素抗氧化，低 GI 加餐不升糖，体重管理期友好'],
     ['牛油果','4 个','中','优质不饱和脂肪替代部分油脂摄入，增强饱腹感，搭配全麦面包作轻食']]},
  ];
  openPage(`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button><h1>采购补充建议</h1><span class="pg-extra">8 条</span></div>
   <div class="page-scroll" style="padding:0 0 24px">
    <div class="ctl-card" style="background:linear-gradient(135deg,#0d5c34,#1e7a52);color:#fff">
     <h3 style="color:#fff">本周建议采购 8 样 · 优先 3 样</h3>
     <p style="font-size:11.5px;opacity:.85;margin-top:8px;line-height:1.7">结合 4 位家人健康档案、本周营养摄入缺口与冰箱 15 种现存食材生成；优先补充：高钙纯牛奶、即食燕麦片、深海三文鱼。</p>
    </div>
    ${G.map(g=>{const f=FAMILY[g.m];return `
    <div class="fridge-sec"><h3>${f.n} · ${f.r.split(' ')[0]}<small>${g.tag}</small></h3></div>
    <div class="ctl-card" style="margin-top:0">
     ${g.items.map(it=>`<div class="ks-row" style="cursor:default;align-items:flex-start">
       <span class="kic" style="background:#e9f9ef"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0d5c34" stroke-width="1.8" stroke-linecap="round"><path d="M5 8h14l-1.5 12h-11z"/><path d="M8.5 8a3.5 3.5 0 0 1 7 0"/></svg></span>
       <div><h5>${it[0]} <small style="font-weight:500;color:var(--ink3)">建议 ${it[1]}</small></h5><p style="margin-top:4px">${it[3]}</p></div>
       <span class="kb" style="color:${pri[it[2]][0]};background:${pri[it[2]][1]};flex:0 0 auto">${it[2]}优先</span></div>`).join('')}
    </div>`}).join('')}
    <div style="display:flex;gap:10px;margin:4px 14px 0">
     <button class="todo-btn" id="shopList" style="flex:1;background:#fff;color:var(--ink);box-shadow:0 1px 6px rgba(20,25,40,.08);padding:13px">加入购物清单</button>
     <button class="todo-btn" id="shopGo" style="flex:1;padding:13px">去董明珠店选购</button>
    </div>
   </div>`,el=>{
    el.querySelector('#shopList').onclick=()=>toast('已将 8 样食材加入购物清单');
    el.querySelector('#shopGo').onclick=()=>{openWebView('https://fmall.gree.com/','董明珠店');toast('已为你跳转生鲜食材专区');};
   });
}
function openIngredient(f){
  openModal(`<img class="detail-img" src="${f.img}">
   <div style="display:flex;align-items:center;gap:8px;margin-top:12px">
     <h3 style="font-size:17px;font-weight:800">${f.name}</h3>
     <span class="mi-tag" style="color:var(--blue);background:#e8f1ff">${f.cat}</span>
     ${f.days<=7?`<span class="mi-tag" style="color:${f.days<=3||f.days<0?'var(--red)':'var(--orange)'};background:${f.days<=3||f.days<0?'#fdeaea':'#fdf3e3'}">${freshTag(f)[0]}${f.days<0?'':'到期'}</span>`:''}
   </div>
   <div class="d-sec" style="display:flex;gap:16px;margin-top:10px">
     <div style="flex:1;background:#f6f7f9;border-radius:12px;padding:10px;text-align:center"><b style="font-size:13px">${f.qty}</b><div style="font-size:10px;color:var(--ink3);margin-top:2px">剩余数量</div></div>
     <div style="flex:1;background:#f6f7f9;border-radius:12px;padding:10px;text-align:center"><b style="font-size:13px">${f.pos}</b><div style="font-size:10px;color:var(--ink3);margin-top:2px">存放位置</div></div>
   </div>
   <div class="d-sec"><h4>📖 百科</h4><p>${f.baike}</p></div>
   <div class="d-sec"><h4>🧊 存放保鲜技巧</h4><p>${f.keep}</p></div>
   <div class="d-sec"><h4>🥗 营养价值</h4><p>${f.nut}</p></div>
   <div class="d-sec"><h4>🍳 可以做什么</h4><div style="display:flex;gap:8px;flex-wrap:wrap">${f.dishes.map(d=>`<span class="chip" data-close data-dish="${d}" style="cursor:pointer">${d}</span>`).join('')}</div></div>
   <button class="cook-btn" data-close style="background:#f1f3f6;color:var(--ink);box-shadow:none;margin-top:16px">关闭</button>`,{center:true});
}
function openRecipe(r){
  const names=FOODS.map(f=>f.name);
  const m=openModal(`<img class="detail-img" src="${r.img}">
   <h3 style="font-size:17px;font-weight:800;margin-top:12px">${r.name}</h3>
   <div style="font-size:11px;color:var(--ink3);margin-top:4px">${r.tag}</div>
   <div class="d-sec"><h4>🧺 所需食材</h4>
    ${r.ing.map(i=>{const has=names.some(n=>i[0].includes(n)||n.includes(i[0]));
      return `<div class="ing-line"><span class="${has?'ok':'miss'}">${has?'✓':'○'}</span>${i[0]} · ${i[1]}${has?'<span style="font-size:10px;color:var(--green);margin-left:auto">冰箱有货</span>':'<span style="font-size:10px;color:var(--ink3);margin-left:auto">需购买</span>'}</div>`}).join('')}</div>
   <div class="d-sec"><h4>🥗 营养价值</h4><p>${r.nut}</p></div>
   <div class="d-sec"><h4>👨‍🍳 制作步骤</h4><ul>${r.steps.map((s,i)=>`<li>${s}</li>`).join('')}</ul></div>
   ${r.dev?`<button class="cook-btn" id="oneCook">${r.dev==='oven'?'蒸烤箱一键烹饪':'电饭煲一键烹饪'}</button>`:''}`,{center:true});
  const btn=m.querySelector('#oneCook');
  if(btn)btn.onclick=()=>{
    if(r.dev==='oven'){S.oven={dish:r.name,left:12*60,running:true,cooking:true}}
    else{S.rice={dish:r.name,left:40*60,running:true,cooking:true}}
    closeModal(m);toast(`已下发${r.dev==='oven'?'蒸烤箱':'电饭煲'}：${r.name}`);
    /* 刷新食品仓设备状态卡 */
    const ob=$('#dsOvenB'),rb=$('#dsRiceB');
    if(r.dev==='oven'&&ob)ob.innerHTML=`<p><span class="cook-anim"></span>正在烹饪 ${r.name}</p><div class="remain" id="ringOven">${fmt(S.oven.left)}</div>`;
    if(r.dev==='rice'&&rb)rb.innerHTML=`<p><span class="cook-anim"></span>正在烹饪 ${r.name}</p><div class="remain" id="ringRice">${fmt(S.rice.left)}</div>`;
  };
}
/* ================= 饮用水 ================= */
/* 家庭成员饮水适配（完整板块，饮用水页 / 阳台用水 tab 复用） */
function waterFamilyCardHTML(){
  return `<div class="ctl-card"><h3>家庭成员饮水适配</h3>
    ${FAMILY.map((f,i)=>`
    <div class="wq-row" data-wq="${i}"><img src="${f.img}"><div><h5>${f.n} · ${f.r}</h5><p data-wqv="${i}">${wqText(i)}</p></div><span class="arr">›</span></div>`).join('')}
    <button class="cook-btn" id="wqSet" style="margin-top:12px;background:#e8f6fb;color:#0090b0;box-shadow:none">我的水质参数设置 · NFC 杯贴写入</button>
  </div>`;
}
function bindWaterFamily(root){
  const refreshWq=()=>root.querySelectorAll('[data-wqv]').forEach(x=>x.textContent=wqText(+x.dataset.wqv));
  root.querySelectorAll('[data-wq]').forEach(r=>r.onclick=()=>openWaterPref(+r.dataset.wq,refreshWq));
  const s=root.querySelector('#wqSet');if(s)s.onclick=()=>openWaterPref(0,refreshWq);
}
function openWaterPage(){
  const defs={
   wt_use:{t:'用水量',key:'wt_use',unit:' L',color:'#00a8c6',type:'bar'},
   wt_drink:{t:'饮水量',key:'wt_drink',unit:' L',color:'#1a73e8',type:'bar'},
  };
  openPage(`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button><h1>饮用水</h1></div>
   <div class="page-scroll" style="padding:4px 0 20px">
    ${aiSvcBannerHTML('饮用水','6px 14px 12px')}
    <div class="ctl-card" style="margin-top:6px"><h3>水质对比</h3>
      <div style="display:flex;gap:12px">
        <div style="flex:1;background:linear-gradient(140deg,#e9f9ef,#f3fdf6);border-radius:16px;padding:14px;text-align:center">
          <div style="font-size:30px;font-weight:300;color:var(--green)">42</div>
          <div style="font-size:10.5px;color:var(--ink2);margin-top:4px">家中净水 TDS ppm</div>
          <span class="tds-badge" style="color:#0d5c34;background:#b9f2cf">水质优 · 可直饮</span></div>
        <div style="flex:1;background:#fdf6ec;border-radius:16px;padding:14px;text-align:center">
          <div style="font-size:30px;font-weight:300;color:var(--orange)">168</div>
          <div style="font-size:10.5px;color:var(--ink2);margin-top:4px">同市同区自来水 TDS ppm<br>来源：珠海水务集团</div>
          <span class="tds-badge" style="color:#8a5200;background:#ffe3b3">水质偏硬</span></div>
      </div>
      <div style="font-size:9.5px;color:var(--ink3);margin-top:8px">TDS 评价标准：&lt;50 优 · 50-100 良好 · 100-300 偏硬 · &gt;300 硬</div>
      <div class="kv" style="margin-top:8px"><span>热水设定温度</span><b>45°C</b></div>
      <div class="kv"><span>今日饮水目标</span><b>1.8 / 2.0 L</b></div></div>
    ${waterFamilyCardHTML()}
    <div class="ctl-card"><h3>滤芯状态</h3>
      ${[['PP 棉滤芯',62,'#34a853','约 6 个月'],['前置活性炭滤芯',45,'#f29900','约 4 个月'],['反渗透滤芯',2,'#e54545','剩 3 天'],['后置活性炭滤芯',78,'#34a853','约 9 个月']].map(f=>`
      <div class="filter-item"><img src="img/m_filter.png"><div class="fi-t"><h5>${f[0]}</h5><div class="fi-bar"><i style="width:${f[1]}%;background:${f[2]}"></i></div></div>
      <div style="text-align:right"><b style="color:${f[2]}">${f[1]}%</b><div style="font-size:9.5px;color:var(--ink3);margin-top:3px">${f[3]}</div></div></div>`).join('')}
      <button class="cook-btn" id="buyFilter" style="margin-top:10px">反渗透滤芯 · 一键购买 ¥299</button></div>
    ${chartCard('用水量','wt_use',' L','#00a8c6','bar')}
    ${chartCard('饮水量','wt_drink',' L','#1a73e8','bar')}
   </div>`,el=>{
    bindCharts(el,defs);
    el.querySelector('#buyFilter').onclick=()=>openWebView(MALL[2].url,'净水器反渗透滤芯');
    bindWaterFamily(el);
  });
}
/* ================= 私人衣橱 ================= */
const CLOTHES=[
 {img:'img/c_cashmere.png',n:'羊绒大衣',c:'2 件',last:38,material:'100% 山羊绒'},
 {img:'img/c_silk.png',n:'真丝衬衫',c:'5 件',last:12,material:'桑蚕丝'},
 {img:'img/c_suit.png',n:'高定西装',c:'3 套',last:25,material:'羊毛混纺'},
 {img:'img/c_down.png',n:'鹅绒羽绒服',c:'4 件',last:92,material:'90 白鹅绒'},
 {img:'img/c_scarf.png',n:'真丝围巾',c:'6 条',last:8,material:'桑蚕丝'},
];
const CARE_TIPS={
 '羊绒大衣':['冷水手洗或送专业干洗，忌机洗甩干','平铺阴干，避免悬挂变形','收纳时放樟木条防蛀，保持干燥'],
 '真丝衬衫':['中性洗涤剂冷水轻揉，不可浸泡过久','阴凉通风处晾干，避免暴晒褪色','低温隔布熨烫，忌高温'],
 '高定西装':['每季干洗 1-2 次即可，不宜频繁','宽肩衣架悬挂，保持肩型','蒸汽挂烫去皱，忌压熨'],
 '鹅绒羽绒服':['30°C 以下轻柔模式机洗，用羽绒专用洗剂','低温烘干并放入烘干球，防结块','干透后轻拍恢复蓬松再收纳'],
 '真丝围巾':['冷水手洗，轻压去水不可拧绞','平铺阴干，避免阳光直射','卷起收纳，防止折痕'],
};
function openClothDetail(c){
  openPage(`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button><h1>衣物详情</h1></div>
   <div class="page-scroll" style="padding:6px 14px 24px">
    <img src="${c.img}" style="width:100%;height:190px;object-fit:cover;border-radius:20px">
    <div style="display:flex;align-items:center;gap:8px;margin-top:14px;flex-wrap:wrap">
      <h2 style="font-size:19px;font-weight:800">${c.n}</h2>
      <span class="mi-tag" style="color:var(--purple);background:#f0eaff">${c.c}</span>
      ${c.last>30?'<span class="mi-tag" style="color:var(--red);background:#fdeaea">超过 30 天未护理</span>':''}
    </div>
    <div class="ctl-card" style="margin:12px 0 0"><h3>衣物信息</h3>
      <div class="kv"><span>材质</span><b>${c.material}</b></div>
      <div class="kv"><span>件数</span><b>${c.c}</b></div>
      <div class="kv"><span>最后一次护理</span><b style="color:${c.last>30?'var(--red)':'var(--ink)'}">${c.last} 天前</b></div>
      <div class="kv"><span>建议护理周期</span><b>30 天</b></div></div>
    <div class="ctl-card" style="margin:12px 0 0"><h3>护理技巧</h3>
      <ul style="padding-left:16px;font-size:12px;color:var(--ink2);line-height:2">${CARE_TIPS[c.n].map(t=>`<li>${t}</li>`).join('')}</ul></div>
    <button class="cook-btn" id="oneCare" style="background:linear-gradient(120deg,#7c4dff,#9d7bff);box-shadow:0 6px 16px rgba(124,77,255,.32)">一键护理 · 空气洗 30 分钟</button>
   </div>`,el=>{
    el.querySelector('#oneCare').onclick=()=>{startCare(c.n);closePage();toast(`已启动「${c.n}」空气洗护理，约 30 分钟完成`)};
  });
}
function wardDevHTML(){
  const w=S.washer;
  const active=w.running&&w.left>0;
  const caring=S.care&&S.care.active&&w.mode.indexOf('空气洗')===0;
  const label=caring?`空气洗护理中 · ${S.care.item}`:(active?`${w.mode} 进行中`:'待机中');
  return `<div class="wd-inner" id="wdGo">
    <span class="wd-ic">${IC.washer('#fff')}</span>
    <div class="wd-t"><h5>阳台洗烘一体机</h5>
      <p id="wardCareSt">${active?`<span class="cook-anim"></span>${label}`:label}</p></div>
    <div class="wd-time"><b id="wardCareLeft">${active?fmt(w.left):'--:--'}</b><span>${active?'剩余完成时间':'当前未运行'}</span></div>
  </div>`;
}
function bindWdGo(root){const g=((root||document).querySelector? (root||document).querySelector('#wdGo'):null);if(g)g.onclick=()=>openDeviceCtl(DEVICES.find(d=>d.id==='wm1'))}
function refreshWardDev(){document.querySelectorAll('#wardDevCard').forEach(c=>{c.innerHTML=wardDevHTML();bindWdGo(c)})}
function startCare(item){
  S.care={item:item,active:true};
  S.washer={mode:'空气洗 · '+item,left:30*60,running:true};
  refreshWardDev();
}
/* 私人衣橱主体（私人衣橱页 / 阳台衣橱 tab 复用） */
function wardBodyHTML(){
  return `${aiSvcBannerHTML('衣物护理','6px 14px 12px')}
    <div class="ctl-card" style="margin:6px 14px 12px;background:linear-gradient(140deg,#f3edff,#faf7ff)">
      <h3>今日护理建议</h3>
      <p style="font-size:11.5px;color:var(--ink2);line-height:1.8">珠海今日 31°C · 湿度 82%。真丝与羊绒制品建议开启衣柜除湿；明日晴，适合晾晒羽绒制品。穿搭建议：真丝衬衫 + 薄西装，空调房温差大注意备外套。</p></div>
    <div class="ctl-card" id="wardDevCard" style="margin:0 14px 12px;padding:12px 14px">${wardDevHTML()}</div>
    ${CLOTHES.map((c,i)=>`<div class="cloth-item" data-ci="${i}"><img src="${c.img}"><div class="ci-t"><h5>${c.n} · ${c.c}</h5>
      <p>${c.material} · 上次护理 ${c.last} 天前</p>
      ${c.last>30?'<span class="warn-tag">超过 30 天未护理，建议尽快护理</span>':''}</div>
      <button class="care-link" data-care="${c.n}" style="color:${c.last>30?'var(--red)':'var(--purple)'}">一键护理 ›</button></div>`).join('')}
    <button class="add-btn" id="addCloth">＋ 添加衣物</button>
    <div class="note-box">ⓘ 私人衣橱数据将同步到洗衣机操作屏中，可在洗衣机中一键选用，或对格力 Claw 语音说出衣服名字，自动选择合适的护衣模式。</div>`;
}
function bindWardBody(root){
  root.querySelectorAll('[data-ci]').forEach(it=>it.onclick=e=>{if(e.target.closest('[data-care]'))return;openClothDetail(CLOTHES[+it.dataset.ci])});
  root.querySelectorAll('[data-care]').forEach(b=>b.onclick=()=>{startCare(b.dataset.care);toast(`已启动「${b.dataset.care}」空气洗护理，约 30 分钟完成`)});
  const ac=root.querySelector('#addCloth');if(ac)ac.onclick=()=>openAddCloth();
  bindWdGo(root);
}
function openWardPage(){
  openPage(`<div class="pg-head"><button class="pg-back" data-back>${svgBack}</button><h1>私人衣橱</h1><span class="pg-extra">${CLOTHES.reduce((a,c)=>a+parseInt(c.c),0)} 件衣物</span></div>
   <div class="page-scroll" style="padding:4px 0 20px">
    ${wardBodyHTML()}
   </div>`,el=>{bindWardBody(el);
  });
}
function openAddCloth(){
  const m=openModal(`<h3 style="font-size:15px;font-weight:700;margin-bottom:12px">添加衣物</h3>
   <input id="clothName" placeholder="输入衣物名称，如：羊绒围巾" style="width:100%;background:#f4f5f7;border-radius:14px;padding:12px 14px;font-size:13px">
   <button class="cook-btn" id="upCloth" style="background:#f1f3f6;color:var(--ink);box-shadow:none">📷 拍照上传衣服照片</button>
   <button class="cook-btn" id="upLabel" style="background:#f1f3f6;color:var(--ink);box-shadow:none;margin-top:10px">🏷️ 拍照上传衣标信息</button>
   <button class="cook-btn" id="saveCloth" style="margin-top:10px">保存</button>`,{center:true});
  m.querySelector('#upCloth').onclick=()=>openCamMock('请对准衣物拍照','衣物照片已上传');
  m.querySelector('#upLabel').onclick=()=>openCamMock('请对准衣标拍照','衣标信息已识别：100% 桑蚕丝 · 不可水洗 · 低温熨烫');
  m.querySelector('#saveCloth').onclick=()=>{const v=m.querySelector('#clothName').value.trim();
    closeModal(m);toast(v?`已添加「${v}」到私人衣橱`:'已添加新衣物')};
}
function openCamMock(hint,done,cb){
  const m=openModal(`<div style="background:#0b0d12;border-radius:16px;height:240px;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center">
    <div class="scan-frame" style="width:170px;height:170px"><i></i><i></i><i></i><i></i></div>
    <div class="cam-hint" style="position:absolute;bottom:14px;left:0;right:0;text-align:center;color:#fff;font-size:12px">${hint}</div></div>
   <button class="cook-btn" id="shutter" style="margin-top:14px">拍照</button>`,{center:true});
  m.querySelector('#shutter').onclick=()=>{
    m.querySelector('.cam-hint').textContent='识别中…';
    m.querySelector('#shutter').textContent='正在识别…';
    setTimeout(()=>{closeModal(m);toast(done);if(cb)cb()},900);
  };
}
