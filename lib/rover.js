/* Submodules */
const Larynx = require('./Larynx');
const Motor = require('./Motor');
const Nervi = require('./Nervi');

/* Helpers */
const coordCalc = require('./helpers/coordinateCalculator');

const lastMeasurement = {
  front: -1,
  left: -1,
  right: -1,
};

let leftCoords = {
  x: 0,
  y: 0,
};

let rightCoords = {
  x: 0,
  y: 0,
};

let coords = {
  x: 0,
  y: 0,
};

const leftHistory = [];

const rightHistory = [];

const history = [coords];

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

/* +0 is the angle from compass */
const ownAngle = 0;
const leftAngle = 270 + ownAngle;
const rightAngle = 90 + ownAngle;

Nervi.rightRotary.on('speed', (speed) => {
  /* Speed is emitted every 500ms */
  /* Speed = distance covered in the last 500ms, but converted to 1000ms (m/s) thus divide by 2. */
  speed /= 2;

  /* Calculate own coords */
  coords = coordCalc(ownAngle, speed, coords);
  history.push(coords);

  /* Calculate the left coords */
  leftCoords = coordCalc(leftAngle, lastMeasurement.left, coords);
  leftHistory.push(leftCoords);

  /* Calculate the right coords */
  rightCoords = coordCalc(rightAngle, lastMeasurement.right, coords);
  rightHistory.push(rightCoords);

  console.log(history[history.length - 1]);
  console.log(leftHistory[leftHistory.length - 1]);
  console.log(rightHistory[rightHistory.length - 1]);
  console.log();
});

function stop() {
  Motor.stop();
}

let hasStopped = false;
Nervi.ultrasonicFront.on('data', (distance) => {
  lastMeasurement.front = distance;
  if (distance === -1) {
    return;
  }

  if (distance > 0.50 && hasStopped) {
    hasStopped = false;
    Motor.setForwardMulti(100);
  } else if (distance <= 0.50 && !hasStopped) {
    hasStopped = true;

    Motor.setForwardMulti(0);
    Motor.move({ speed: 100, direction: 1 });
    setTimeout(stop.bind(this), 500);
  }
});

Nervi.ultrasonicLeft.on('data', (distance) => {
  lastMeasurement.left = distance;
});

Nervi.ultrasonicRight.on('data', (distance) => {
  lastMeasurement.right = distance;
});
