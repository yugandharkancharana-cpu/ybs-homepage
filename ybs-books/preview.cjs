const http=require('http'),fs=require('fs'),path=require('path');
const base=path.join(__dirname,'dist');
const server=http.createServer((req,res)=>{let p;try{p=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400);res.end();return}if(p==='/'||p==='/index.html')p='/index.html';const f=path.resolve(base,'.'+p);if(!f.startsWith(base+path.sep)){res.writeHead(403);res.end();return}fs.readFile(f,(err,data)=>{if(err){res.writeHead(404);res.end('Not found');return}res.setHeader('Content-Type',f.endsWith('.html')?'text/html; charset=utf-8':'text/plain; charset=utf-8');res.end(data)})});
server.listen(5200,'127.0.0.1',()=>console.log('YBS Books preview: http://127.0.0.1:5200'));
