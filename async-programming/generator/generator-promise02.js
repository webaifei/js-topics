var fs = require("fs");

var readfile = function (...args) {
    return new Promise(function(resolve, reject) {
        fs.readFile(...args, function (err, data) {
            if(err) reject(err);
            return resolve(data);
        })
    })
}
// var g;
// var gen = function *() {
//     let content1 = yield readfile('test.txt', 'utf-8').then(function (data) {
//         console.log(data);
//         g.next(data);
//     })
//     let content2 = yield readfile('test02.txt', 'utf-8').then(function (data) {
//         console.log(data);
//         g.next(data);
//     })
//     console.log(content1, content2);
// }
// g = gen();
// g.next();


function runGeneratorWithPromise(fn) {
    var g = fn();
    // 执行
    next();

    function next(data) {
        var res = g.next(data);
        if(res.done) return res.data;
        res.value.then(next);
    }
}

runGeneratorWithPromise(function *(){
    var content1 = yield readfile('test.txt', 'utf-8');
    var content2 = yield readfile('test02.txt', 'utf-8');

    console.log(content2, content1);

})

