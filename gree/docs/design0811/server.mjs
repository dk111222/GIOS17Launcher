import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const argv = process.argv.slice(2);
function argVal(name, dflt) {
  const i = argv.findIndex(a => a === name || a.startsWith(name + '='));
  if (i === -1) return dflt;
  const a = argv[i];
  return a.includes('=') ? a.split('=')[1] : (argv[i + 1] || dflt);
}
const port = Number(process.env.PORT || argVal('--port', 7100));
const host = process.env.HOST || argVal('--host', '127.0.0.1');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.svg': 'image/svg+xml', '.webp': 'image/webp',
  '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2'
};

createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p === '/') p = '/index.html';
    const file = normalize(join(root, p));
    if (!file.startsWith(normalize(root))) { res.writeHead(403); return res.end(); }
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': MIME[extname(file).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404); res.end('Not Found');
  }
}).listen(port, host, () => console.log(`格力智慧家庭 Demo → http://${host}:${port}/`));
