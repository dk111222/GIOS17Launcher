const fs = require('fs');
const root = 'D:\\Codearts\\Phone-Classic\\app\\';
const src = fs.readFileSync(root + 'index.html.bak', 'utf8').split(/\r?\n/);

// 1. 提取 body 骨架（原文件行 2493-2551，1-indexed inclusive）
const bodySkeleton = src.slice(2492, 2551).join('\n');

// 2. 组装新 index.html
const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>格力智慧家庭 · Android 概念 Demo</title>
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/panels.css">
<link rel="stylesheet" href="css/pages.css">
</head>
${bodySkeleton}
<script src="js/core.js"></script>
<script src="js/icons-launcher.js"></script>
<script src="js/data.js"></script>
<script src="js/gree-home.js"></script>
<script src="js/events.js"></script>
<script src="js/rooms.js"></script>
<script src="js/devices.js"></script>
<script src="js/devices-extra.js"></script>
<script src="js/services.js"></script>
<script src="js/neo.js"></script>
<script src="js/neo-bind.js"></script>
<script src="js/main.js"></script>
</body>
</html>
`;
fs.writeFileSync(root + 'index.html', html, 'utf8');
console.log('REBUILT: ' + html.length + ' bytes, ' + html.split('\n').length + ' lines');

// 3. 一致性验证：原文件 style/script 块内容 vs 拆分文件内容
// norm: 去行尾空白 + 折叠连续空行 + 去首尾空行（拆分文件每文件末尾的换行会产生段间空行，属无害差异）
function norm(s){return s.split(/\r?\n/).map(l=>l.replace(/\s+$/,'')).filter(l=>l.length>0).join('\n');}
const cssRanges=[[8,190],[193,446],[449,2490]];
const origCss=norm(cssRanges.map(([s,e])=>src.slice(s-1,e).join('\n')).join('\n'));
const newCss=norm(['css/base.css','css/panels.css','css/pages.css'].map(f=>fs.readFileSync(root+f,'utf8')).join('\n'));
console.log('CSS_MATCH: ' + (origCss === newCss));
const jsRanges=[[2554,2655],[2658,2874],[2877,3147],[3150,3751],[3754,3840],[3843,4485],[4488,4504],[4507,4826],[4829,4972],[4975,7678],[7681,7858],[7861,8210],[8213,9467],[9470,9530]];
const origJs=norm(jsRanges.map(([s,e])=>src.slice(s-1,e).join('\n')).join('\n'));
const newJs=norm(['core','icons-launcher','data','gree-home','events','rooms','devices','devices-extra','services','neo','neo-bind','main'].map(f=>fs.readFileSync(root+'js/'+f+'.js','utf8')).join('\n'));
console.log('JS_MATCH: ' + (origJs === newJs));
if(origCss!==newCss){console.log('CSS DIFF! orig='+origCss.length+' new='+newCss.length);}
if(origJs!==newJs){console.log('JS DIFF! orig='+origJs.length+' new='+newJs.length);}