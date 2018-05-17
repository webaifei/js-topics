var thunkify = require('thunkify');
var fs = require('fs');

var readFile = thunkify(fs.readFile);

var gen = function* () {
  var r1 = yield readFile('./data/text01.txt');
  console.log(r1.toString())
  var r2 = yield readFile('./data/text02.txt');
  console.log(r2.toString())
}
// thunk函数 自动化执行
// 1. 关键是如何将yield语句交出的执行权归还 也就是自动调用next
// 2. 利用递归思想来实现， 通过判断done属性来判断递归结束
// 3. 注意的是next接收的参数会作为上一个yield语句的结果
function run (fn) {
  // 执行generator函数 得到一个有限状态机
  var g = fn();
  // 封装next方法
  // 将来会作为thunk函数的回调函数传入
  function next(err, data) {
    // next方法 交还执行权，到达不同的状态
    // 传入data作为上一个yield语句的返回值
    var res = g.next(data);
    // 判断是否状态迭代完毕
    if(res.done) {
      return;
    } else {
      // thunk函数接收一个回调函数作为参数
      // 递归调用的关键
      res.value(next)
    }
  }
  // 首次调用执行
  next();
  
}

run(gen)
