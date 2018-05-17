var thunkify = require('thunkify');
var fs = require('fs');

var readFile = thunkify(fs.readFile);

var gen = function* () {
  // 结合thunk函数 返回一个函数 
  var r1 = yield readFile('./data/text01.txt');
  console.log(r1.toString())
  var r2 = yield readFile('./data/text02.txt');
  console.log(r2.toString())
}

// 
var g = gen();
var r1 = g.next(); // 执行到第一个yield语句
// r1.value 是一个函数 接受一个回调
r1.value(function (err, data) {
  if(err) {
    throw err;
  } else {
    var r2 = g.next(data);
    r2.value(function (err, data) {
      if(err) {
        throw err;
      } else {
        g.next(data);
      }
    })
  }
})
