var i2c = require('i2c');
var address = 0x32;
var wire = new i2c(address, {device: '/dev/i2c-1'}); // point to your i2c address, debug provides REPL interface
 
wire.scan(function(err, data) {
  if(err) {
      console.log(err);
      
  } else {
      console.log(data);
      
  }
});


var MotorHF = [7,3,0xa5,2,3,0xa5,2]; 
wire.write(MotorHF, function(err) {
console.log(err);

});
 

 while(true) {}