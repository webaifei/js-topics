const http = require('http');
const fs = require('fs');
const path = require('path');
const STATIC_PATH = path.resolve(__dirname, 'static');
const PORT = 3000 || process.env.PORT;


const server = http.createServer((req, res) => {
  // route /
  if (req.url === '/') {
    fs.readFile(path.join(STATIC_PATH, 'index2.html'), function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end('not found!')
      }
      res.end(data.toString())
    })
  } else if (req.url.indexOf('.js') >= 0) { // handle js
    fs.readFile(path.join(STATIC_PATH, req.url), function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end('not found!')
      }
      // 模拟common.js响应返回很晚
      if (req.url.indexOf('common.js') > -1) {
        setTimeout(() => {
          res.setHeader('Content-Type', 'application/javascript');
          res.end(data.toString())
        }, 3000);
      } else {
        res.setHeader('Content-Type', 'application/javascript');
        res.end(data.toString())
      }

    })
  } else if (req.url.indexOf('.css') >= 0) { // handle css

    fs.readFile(path.join(STATIC_PATH, req.url), function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end('not found!')
      }
      res.setHeader('Content-Type', 'text/css');
      res.end(data.toString())
    })

  } else {
    fs.readFile(path.join(STATIC_PATH, req.url), function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end('not found!')
      }
      res.end('not found')
    })
  }
})

server.listen(PORT, (err) => {
  if (err) {
    throw Error(err);
  } else {
    console.log('server started at port:', PORT);
  }
})