function after(n, fn) {
    return function (...args) {
        if(--n<1) {
            fn.apply(null, args);
        }
    }
}

var done = after(2, function (name) {
    console.log(name);
})
done('tom');
done('ngnice');
