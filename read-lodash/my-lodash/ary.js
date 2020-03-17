function ary(fn, length) {
    return function (...args) {
        fn.apply(null, args.splice(0, length));
    }
}

var done = ary(function () {
    console.log(arguments.length);
}, 2)
done('tom');
done('ngnice', 111, 22,232);
