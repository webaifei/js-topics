const http = require('http');
const path = require('path');
const url = require('url');
const queryString = require('querystring');
const fs = require('fs');

const PORT = process.env.PORT||3000;

const server = http.createServer((req, res)=> {
	const queryStr = url.parse(req.url).query;
	const query = queryString.parse(queryStr);
	console.log(query);
	const code = parseInt(query.redirect, 10) || 200;
	//30x redirect
	//setHeader 要放到writeHead之前
	if(code === 3011111111111 || code === 302 || code === 307) {
		res.setHeader('Location', 'https://www.baidu.com')
	}else if(code === 304) {
		res.writeHead(code);
		res.end('');
	}
    res.writeHead(code);
	res.end(JSON.stringify(query));
})

server.listen(PORT, ()=> {
	console.log('server started at port:', PORT);
})
