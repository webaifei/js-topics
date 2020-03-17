/**
 * 每隔一定时间执行一次
 */
function throttle(func, wait) {
    let lastTime = Date.now();
    return function (...args) {
        let cur = Date.now();
        let timestamp =  - lastTime;
        if(timestamp >= wait) {
            lastTime = cur;
            return func.apply(null, args)
        }

}