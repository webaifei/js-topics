//  求阶乘
function factorial(num) {
  if(num > 1) {
    return num * factorial(--num);
  } else {
    return num;
  }
}
console.log(factorial(10))