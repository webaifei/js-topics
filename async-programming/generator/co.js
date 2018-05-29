function co (gen) {
  var g = gen();
  var res = g.next();

  function next(res) {
    if(!res.done) {
      res.value.then(function (data) {
        var res = g.next(data);
        next(res);
      })
    } else {
      return res.value;
    }
  }

  next(res);
}


function* flowPromise() {
  var res1 = yield new Promise(function (resolve) {
    resolve('res1')
  });
  var res2 = yield new Promise(function (resolve) {
    resolve('res2')
  })
  console.log(res1, res2);
  
}

co(flowPromise);