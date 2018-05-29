/**
 * flatten
 */
function flatten(arr) {
  const res = [];
  for(var item of arr) {
    if(Array.isArray(item)) {
      res.push(...flatten(item))
    } else {
      res.push(item);
    }
  }
  return res;
}

const arr = [1,2,3,4,45,[22.1, [89]]];

console.log(flatten(arr));
