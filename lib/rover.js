const Larynx = require('./Larynx');
const Motor = require('./Motor');
const Nervi = require('./Nervi');

Motor.setGlobalPower(255);
Motor.setSoftStart(0);

Larynx.on('move', (data) => {
  if (data === 'left') {
    Motor.Left();
  } else if (data === 'right') {
    Motor.Right();
  } else if (data.speed === 0) {
    Motor.Stop();
  } else {
    Motor.Forward(data);
  }
});

Larynx.on('stop', () => {
  Motor.Stop();
});

Larynx.on('disconnect', () => {
  Motor.Stop();
});

Nervi.rightRotary.on('speed', (speed) => {
  // Why am I doing this ...
  Larynx.emit('speed', speed);
});
