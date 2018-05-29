/**
 * Promise 
 * 1. 接受一个fn 传入参数 resolve reject
 */
;(function (win) {
  function isFunction(fn) {
    return typeof fn === 'function';
  }
  // 1. 修改state
  // 2. 触发回调
  function resolve(value, that) {
    // 添加到异步队列中 防止没有同步调用 then方法添加的回调执行不到
    // 更新_value的值 能够允许回调去修改value值
    setTimeout(function () {
      if(that.state === 'PENDING') {
        that.state = 'RESOLVED';
        that._resolves.forEach(function (callback) {
          value = callback(that._value||value);
          typeof value !== 'undefined' && (that._value = value);
        })
      }
    })
  }
  function Promise (fn) {
    var that = this;
    this.state = 'PENDING';
    this._resolves = [];
    this._rejects = [];
    this._value;

    
    // 执行传入的异步操作
    fn(function (value) {
      resolve(value, that);
    });
  }

  Promise.prototype = {
    constructor: Promise,
    // 添加回调 
    then: function (onFullFilled) {
      var prePromise = this;
      // if(this.state === 'RESOLVED') {
      //   var ret = onFullFilled(this._value);
      // } else {
      //   this._resolves.push(onFullFilled);
      // }
      // return this;
      
      // 原来的逻辑 
      // 1. then中判断当前的promise对象的状态 如果是pending 就添加到回调队列中
      // 2. 如果是resolved 那么就直接执行
      // 现在的逻辑
      // 1. 返回一个新的promise对象
      // 2. 如果之前的promise对象已经resolved 那么就执行回调
      // 3. 如果之前的promise对象还是pending 就把包装过的回调添加到回调队列中
      // 4. 包装过的回调函数会执行两个操作
        // 4.1 执行用户添加的回调函数
        // 4.2 执行当前的promise对象的resolve
      return new Promise(function (resolve) {
        function handle(value) {
          var ret = isFunction(onFullFilled) && onFullFilled(value) || value;
          resolve(ret);
        }
        if(prePromise.state === 'PENDING') {
          prePromise._resolves.push(handle);
        } else {
          handle(prePromise._value);
        }
      });

    },
  }
  
  
  win.Promise = Promise;
})(window)