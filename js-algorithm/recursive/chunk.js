/**
 * chunk
 */

function chunk(arr, size=1) {
  const _arr = [];
  const start = 0;
  const end = start + size;
  var _chunk = function (start, end) {
    var item = arr.slice(start, end);
    _arr.push(item)
    if(end < arr.length ) {
      _chunk(end, end+size);      
    }
  }
  _chunk(start, end);

  return _arr;
}

var arr = [1,2,3,43,4,65,7]

console.log(chunk(arr));
console.log(chunk(arr, 2));

