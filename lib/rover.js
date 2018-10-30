const Larynx = require('./Larynx');
const Motor = require('./Motor');
const Nervi = require('./Nervi');

Motor.setGlobalPower(255);
Motor.setSoftStart(0);

Larynx.on('move', (data) => {
  if (data === 'left') {
    Motor.turnLeft();
  } else if (data === 'right') {
    Motor.turnRight();
  } else if (data.speed === 0) {
    Motor.stop();
  } else {
    Motor.move(data);
  }
});

Larynx.on('stop', () => {
  Motor.stop();
});

Larynx.on('disconnect', () => {
  Motor.stop();
});

Larynx.on('camera move', (position) => {
  const json = JSON.parse(position);
  Nervi.cameraMount.moveTo(json.horizontal, json.vertical);
});

Nervi.rightRotary.on('speed', (speed) => {
  // Why am I doing this ...
  Larynx.emit('speed', speed);
});

function stop() {
  Motor.stop();
}

let hasStopped = false;
Nervi.ultrasonicFront.on('data', (distance) => {
  if (distance < 0.10 || distance > 2.00) {
    return;
  }

  if (distance > 0.50) {
    if (!hasStopped) {
      return;
    }
    Motor.setForwardMulti(100);
    hasStopped = false;
  } else {
    if (hasStopped) {
      return;
    }

    hasStopped = true;
    Motor.setForwardMulti(0);
    Motor.move({ speed: 100, direction: 1 });
    setTimeout(stop.bind(this), 500);
  }
});
