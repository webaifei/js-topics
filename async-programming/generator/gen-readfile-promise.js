/**
 * 通过promise封装来实现自动执行generator函数
 */

var fs = require('fs');
// use promise wrapper the readfile 
var readFile = function (file) {
  return new Promise(function (resolve, reject) {
    fs.readFile(file, 'utf-8', function (err, data) {
      if(err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  });
}
/**
 * 自动执行generator函数
 */
function runGen (gen) {
  if(typeof gen === 'function') {
   var g = gen();
   if(typeof g.next === 'function') {
    function next(data) {
      var res = g.next(data);
      if(res.done) {
        console.log(res.value)
        return;
      } else {
        res.value.then(function (data) {
          next(data)
        })
      }
    }
    next();
   } else {
    throw Error('argument must be an generator function');
   }
  } else {
    throw Error('argument must be an function')
  }
}


//real logic
function* readFileGen () {
  var r1 = yield readFile('./data/text01.txt');
  var r2 = yield readFile('./data/text02.txt');
  console.log(r1)
  console.log(r2)
}

runGen(readFileGen)