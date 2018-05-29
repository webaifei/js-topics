/**
 * Promise 
 * 1. 接受一个fn 传入参数 resolve reject
 */
;(function (win) {
  function Promise (fn) {
    var that = this;
    this.state = 'PENDING';
    this._resolves = [];
    this._rejects = [];
    this._value;
    // 执行传入的异步操作
    fn(function _resolve(value) {
      return resolve(value, that);
    });
  }

  Promise.prototype = {
    constructor: Promise,
    // 添加回调
    then: function (onFullFilled) {
      if(this.state === 'RESOLVED') {
        onFullFilled(this._value);
      } else {
        this._resolves.push(onFullFilled);
      }
      return this;
    },
  }
  // 1. 修改state
  // 2. 触发回调
  function resolve(value, promise) {
    // 添加到异步队列中 防止没有同步调用 then方法添加的回调执行不到
    // 更新_value的值 能够允许回调去修改value值
    setTimeout(function () {
      if(promise.state === 'PENDING') {
        promise.state = 'RESOLVED';
        promise._resolves.forEach(function (callback) {
          promise._value = callback(promise._value||value);
        })
      }
    })
  }
  
  win.Promise = Promise;
})(window)