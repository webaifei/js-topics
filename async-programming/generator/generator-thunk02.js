// 使用thunk实现generator的自动执行

// 1 编程中的求值策略： 传值 和 传名
// 2 其中 传名求值的一种实现方案就是 通过 thunk来实现
// 3 thunk就是 用函数替换表达式的， 但是在javascript中 是将多参数函数转换成一个
// 接受一个参数，参数是一个callback的 函数
// 4. 

const fs = require('fs');

//经过转换之后的调用方式
// readfile()
// thunk转换函数实现
// 1. 利用的还是函数必报的特性
function thunkify(fn) {
    return function (...args) {
        return function (callback) {
            args.push(callback);
            return fn.apply(null, args)
        }
    }
    
}

let readfile = thunkify(fs.readFile);
let writefile = thunkify(fs.writeFile);
let g;

function* flow () {
    let content1 = yield readfile('test.txt', 'utf-8');
    let content2 = yield readfile('test02.txt', 'utf-8');
    let res = yield writefile('new-all.txt', content1+content2);
}

// 通过thunk实现 genrator的自动化执行

function runGengerator(gen){ 
    var g = gen();
    function next(err, data) {
        var step = g.next(data);
        if(step.done) {
            return step;
        }
        step.value(function (err, data) {
            console.log(data)
            if(err) {
                g.throw(err);
            } else {
                next(err, data)
            }
        });
    }
    next();
    

}

console.log(runGengerator(flow));
