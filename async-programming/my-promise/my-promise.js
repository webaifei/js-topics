;(function (win){
  // 修改state
  // 触发callbacks
  function resolve(value) {
    var that = this;
    setTimeout(function () {
      that.state = 'FULLFILLED';
      that.fullFilled.forEach(function (callback) {
        that.value = callback(that.value||value);
      })
    })
  }
  function reject() {

  }
  function Promise(fn) {
    this.state = 'PENDING';
    this.fullFilled = [];
    this.rejects = [];

    fn(resolve, reject);
  }

  Promise.prototype = {
    contructor: Promise,
    then: function (onFullFilled) {
      if(this.state === 'PENDING') {
        this.value = this.fullFilled.push(onFullFilled);
      } else {
        this.value = onFullFilled(this.value);
      }
      return this;
    },
    resolve: resolve,
    reject: reject
  }


})(window)