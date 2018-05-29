var Promise = function(wrappedFn, wrappedThis) {
  this.then = function(wrappedFn, wrappedThis) {
    this.next = new Promise(wrappedFn, wrappedThis);
    return this.next;
  };
    
  this.run = function() {
    wrappedFn.promise = this;
    wrappedFn.apply(wrappedThis);
  };
    
  this.complete = function() {
    if (this.next) {
      this.next.run();
    }
  };
};

Promise.create = function(func) { 
  if (func.hasOwnProperty('promise')) { 
    return func.promise;
  } else { 
    return new Promise();
  } 
};