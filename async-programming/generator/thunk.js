var fs = require('fs');

var readFile = fs.readFile;

// normal excute
// readFile('./index01.html', 'utf8', function (err, data) {
//   if(err) {
//     return console.log(err);
//   } else {
//     console.log(data);
//   }
// })
// thunk function 
// 利用闭包的特性将参数存储起来
function thunk(fn) {
  return function () {
    var args = [].slice.call(arguments);
    return function (callback) {
      args.push(callback);
      return fn.apply(this, args);
    }
  }
}
var readFileThunk = thunk(readFile);
readFileThunk('./index01.html', 'utf-8')(function (err, data) {
  if(err) {
    return console.log(err);
  } else {
    console.log(data)
  }
})