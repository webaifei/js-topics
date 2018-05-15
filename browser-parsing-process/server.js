const http = require('http');
const fs = require('fs');
const path = require('path');
const STATIC_PATH = path.resolve(__dirname, 'static');
const PORT = 3000||process.env.PORT;

const server = http.createServer((req, res)=> {
  // route /
  if(req.url === '/') {
    fs.readFile(path.join(STATIC_PATH, 'index.html'), function (err, data) {
      if(err) {
        res.writeHead(404, 'route is not existed.');
      }
      res.end(data.toString())
    })    
  } else if(req.url.indexOf('.js')>=0) {// handle js
    console.log(path.join(STATIC_PATH, req.url), 'path')
    fs.readFile(path.join(STATIC_PATH, req.url), function (err, data) {
      if(err) {
        res.writeHead(404, 'route is not existed.');
      }
      if(req.url.indexOf('common.js')>-1) {
        setTimeout(() => {
          res.setHeader('Content-Type', 'application/javascript');
          res.end(data.toString())
        }, 5000);
      } else {
        res.setHeader('Content-Type', 'application/javascript');
        res.end(data.toString())
      }
     
    }) 
  } else if (req.url.indexOf('.css')>=0){// handle css

    fs.readFile(path.join(STATIC_PATH, req.url), function (err, data) {
      if(err) {
        res.writeHead(404, 'route is not existed.');
      }
      // css的下载和渲染会阻塞 render tree 的生成，
      // 不阻塞DOM TREE的生成， 如何证明 使用async 属性来测试 
      // 并且阻塞js的执行（但是不阻塞js的加载）
      setTimeout(() => {
        res.setHeader('Content-Type', 'text/css');
        res.end(data.toString())
      }, 5000);
    }) 

  } else {
    fs.readFile(path.join(STATIC_PATH, req.url), function (err, data) {
      if(err) {
        res.writeHead(404, 'route is not existed.');
      }
      res.end('not found')
    }) 
  }
})

server.listen(PORT, (err)=>{
  if(err) {
    throw Error(err);
  } else {
    console.log('server started at port:', PORT);
  }
})