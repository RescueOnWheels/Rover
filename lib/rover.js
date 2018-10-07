const Motor = require('./Motor');
const Larynx = require('./Larynx');

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
