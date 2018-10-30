const Larynx = require('./Larynx');
const Locum = require('./Locum');
const Motor = require('./Motor');
const Nervi = require('./Nervi');

let lastMeasurement = {
  front = -1,
  left = -1,
  right = -1
};

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

Nervi.ultrasonicFront.on('data', (distance) => {
  
  lastMeasurement.front = distance;
  if (distance > 0.30) {
    Motor.setForwardMulti(100);
    return;
  }

  if (distance < 0.10) {
    Motor.setForwardMulti(0);
  } else if (distance < 0.20) {
    Motor.setForwardMulti(25);
  } else {
    Motor.setForwardMulti(50);
  }
});

Nervi.ultrasonicLeft.on('data', (distance)=>{
  lastMeasurement.left = distance;
});

Nervi.ultrasonicRight.on('data', (distance)=>{
  lastMeasurement.right = distance;
});

function getPossition(dir) {
  if (!dir) {
    return lastMeasurement;
  } else if (dir === 'left') {
    return lastMeasurement.left;
  } else if (dir === 'right') {
    return lastMeasurement.right;
  } else if (dir === 'front') {
    return lastMeasurement.front;
  } else{
    return -1;
    debug('Please, present valide value.')
  }

}