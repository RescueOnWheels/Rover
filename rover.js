const Motor = require('./Motor');
const Larynx = require('./Larynx');

Larynx.on('move', (data) => {
  console.log(data);

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
