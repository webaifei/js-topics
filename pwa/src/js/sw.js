// console.log(1111);
const COUNT = 1000*1000*1000;
onmessage = function(e) {
  console.log('Message received from main script', e);
  var val = e.data;
  
  for (let i =0; i < COUNT; i++) {
     val++; 
     if(val>1000) {
      
     }
  }
  postMessage(val);
}

