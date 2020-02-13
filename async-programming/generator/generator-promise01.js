var fs = require("fs");

var readfile = function (...args) {

    return new Promise(function(resolve, reject) {
        fs.readFile(...args, function (err, data) {
            if(err) reject(err);
            return resolve(data);
        })
    })
}
var g;
var gen = function *() {
    let content1 = yield readfile('test.txt', 'utf-8').then(function (data) {
        console.log(data);
        g.next(data);
    })
    let content2 = yield readfile('test02.txt', 'utf-8').then(function (data) {
        console.log(data);
        g.next(data);
    })
    console.log(content1, content2);
}
g = gen();
g.next();


