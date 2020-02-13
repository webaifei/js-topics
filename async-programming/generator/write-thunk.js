// 使用thunk实现generator的自动执行

// 1 编程中的求值策略： 传值 和 传名
// 2 其中 传名求值的一种实现方案就是 通过 thunk来实现
// 3 thunk就是 用函数替换表达式的， 但是在javascript中 是将多参数函数转换成一个
// 接受一个参数，参数是一个callback的 函数
// 4. 

const fs = require('fs');
// fs.readFile callback方式
fs.readFile('./test.txt', function (err, data) {
    if(err) {
        throw err;
    } else {
        console.log(data.toString());
    }
})
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
readfile('./test.txt')( function (err, data) {
    if(err) {
        throw err;
    } else {
        console.log(data.toString());
    }
})

