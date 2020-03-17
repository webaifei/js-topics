function isObject(obj) {
    return obj != null && (typeof obj === 'object');
}
function deepCopy(target) {
    let ret;
    if(!isObject(target)) {
        ret = target;
    } else {
        ret = Array.isArray(target)? [] : {};
        for(let key in target) {
            if(target.hasOwnProperty(key)) {
                ret[key] = deepCopy(target[key])
            }
        }
    }
    return ret;
}

var target1 = {
    name: "ngnice",
    obj: {
        age: 10,
        aa: null
    }
}
var target2 = {
    name: "ngnice",
    obj: {
        age: 10,
        aa: null
    }, 
    list: [1,2,4]
}
var target3 = {
    name: "ngnice",
    obj: {
        age: 10,
        aa: null
    }, 
    list: [1,2,4],
    log:function (){}
}
console.log(target3);

console.log(deepCopy(target3));
