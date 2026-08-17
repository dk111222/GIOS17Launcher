const http = require('http');
const paths = ['/','/css/base.css','/css/panels.css','/css/pages.css',
  '/js/core.js','/js/icons-launcher.js','/js/data.js','/js/gree-home.js',
  '/js/events.js','/js/rooms.js','/js/devices.js','/js/devices-extra.js',
  '/js/services.js','/js/neo.js','/js/neo-bind.js','/js/main.js'];
let done=0, ok=0;
paths.forEach(p=>{
  const req = http.get({host:'127.0.0.1',port:7102,path:p,agent:false}, res=>{
    let len=0; res.on('data',d=>len+=d.length); res.on('end',()=>{
      console.log(p+' => '+res.statusCode+' '+res.headers['content-type']+' '+len+'B');
      if(res.statusCode===200) ok++;
      if(++done===paths.length){ console.log('SUMMARY: '+ok+'/'+paths.length+' OK'); process.exit(0); }
    });
  });
  req.on('error',e=>{ console.log(p+' ERR '+e.message); if(++done===paths.length){ console.log('SUMMARY: '+ok+'/'+paths.length+' OK'); process.exit(0); } });
});