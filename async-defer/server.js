const express = require("express");
const path = require('path');
const fs = require('fs');

const app = express();


app.get('/*.html', function (req, res) {
    const filePath = req.path;
    const file = path.parse(filePath).base;

    const html = fs.readFileSync(path.resolve(__dirname, 'public', file), 'utf-8');
    res.send(html);
});

app.get('*.js', function (req, res) {
    const filePath = req.path;
    const file = path.parse(filePath).base;
    const content = fs.readFileSync(path.resolve(__dirname, 'public', file), 'utf-8');
    // 对应index01.html
    // 不返回响应 阻塞DOM 解析 GUI渲染
    // res.send(content);

    // 对应index03.html
    // res.send(content);

    // 对应index03.html 
    // 验证 defer会阻止domcontentloaded触发
    if(file === 'defer.js') {
        // 不响应
    } else {
        res.send(content);
    }
    
});

app.listen(3000, ()=> {
    console.log('server started at port: %d', 3000);
});

