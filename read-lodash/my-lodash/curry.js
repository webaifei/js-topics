function curry(fn, length) {
    let args = [];
    length = length|| fn.length;
    return function inner(...arg) {
        args = args.concat(arg);
        if(length) {
            if(args.length<length) {
                // console.log('inner');
                return inner;
            } else {
                return fn.apply(null, args)
            }
        }
    }
}


var abc = function (a, b, c) {
    return [a, b, c];
};

var curried = curry(abc);

console.log(abc(1, 2, 3));
 // [1,2,3]
// console.log(curried(1)(2)(3));
console.log(curried(1,2)(3));
