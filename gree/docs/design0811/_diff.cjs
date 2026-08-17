const fs = require('fs');
const root = 'D:\\Codearts\\Phone-Classic\\app\\';
const src = fs.readFileSync(root + 'index.html.bak', 'utf8').split(/\r?\n/);

function norm(s){return s.split(/\r?\n/).map(l=>l.replace(/\s+$/,'')).join('\n');}
const cssRanges=[[8,190],[193,446],[449,2490]];
const origCss=norm(cssRanges.map(([s,e])=>src.slice(s-1,e).join('\n')).join('\n'));
const newCss=norm(['css/base.css','css/panels.css','css/pages.css'].map(f=>fs.readFileSync(root+f,'utf8')).join('\n'));
const jsRanges=[[2554,2655],[2658,2874],[2877,3147],[3150,3751],[3754,3840],[3843,4485],[4488,4504],[4507,4826],[4829,4972],[4975,7678],[7681,7858],[7861,8210],[8213,9467],[9470,9530]];
const origJs=norm(jsRanges.map(([s,e])=>src.slice(s-1,e).join('\n')).join('\n'));
const newJs=norm(['core','icons-launcher','data','gree-home','events','rooms','devices','devices-extra','services','neo','neo-bind','main'].map(f=>fs.readFileSync(root+'js/'+f+'.js','utf8')).join('\n'));

// 找第一个差异字符
function firstDiff(a,b){
  const n=Math.min(a.length,b.length);
  for(let i=0;i<n;i++){if(a[i]!==b[i]){return {pos:i, aCtx:a.slice(Math.max(0,i-30),i+30), bCtx:b.slice(Math.max(0,i-30),i+30), aChar:a[i], bChar:b[i]};}}
  return {pos:n, aTail:a.slice(n-10), bTail:b.slice(n-10), aLen:a.length, bLen:b.length};
}
console.log('CSS firstDiff:', JSON.stringify(firstDiff(origCss,newCss)));
console.log('JS firstDiff:', JSON.stringify(firstDiff(origJs,newJs)));

// 检查末尾
console.log('CSS orig tail:', JSON.stringify(origCss.slice(-50)));
console.log('CSS new tail:', JSON.stringify(newCss.slice(-50)));
console.log('JS orig tail:', JSON.stringify(origJs.slice(-50)));
console.log('JS new tail:', JSON.stringify(newJs.slice(-50)));

// 检查每个 css/js 文件末尾是否有换行
['css/base.css','css/panels.css','css/pages.css'].forEach(f=>{
  const c=fs.readFileSync(root+f,'utf8');
  console.log(f+' endsWith:\\n='+c.endsWith('\n')+' lastChar='+JSON.stringify(c.slice(-3)));
});
['core','icons-launcher','data','gree-home','events','rooms','devices','devices-extra','services','neo','neo-bind','main'].forEach(f=>{
  const c=fs.readFileSync(root+'js/'+f+'.js','utf8');
  console.log('js/'+f+'.js endsWith:\\n='+c.endsWith('\n')+' lastChar='+JSON.stringify(c.slice(-3)));
});

// 检查原文件各段末尾
console.log('--- orig segments tail ---');
cssRanges.forEach(([s,e])=>{
  const seg=src.slice(s-1,e).join('\n');
  console.log('CSS '+s+'-'+e+' lastChar='+JSON.stringify(seg.slice(-3)));
});
jsRanges.forEach(([s,e])=>{
  const seg=src.slice(s-1,e).join('\n');
  console.log('JS '+s+'-'+e+' lastChar='+JSON.stringify(seg.slice(-3)));
});