/* Packages */
const fs = require('fs');

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

let ownAngle = 0;
let leftAngle = 270 + ownAngle;
let rightAngle = 90 + ownAngle;

Nervi.rightRotary.on('speed', (speed) => {
  ownAngle = Nervi.compass.degrees;
  leftAngle = 270 + ownAngle;
  rightAngle = 90 + ownAngle;

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
});

/**
 * Graceful shutdown of Controller and Socket.IO.
 */
[
  'SIGINT',
  'SIGTERM',
].forEach((event) => {
  process.on(event, () => {
    const jsonMe = JSON.stringify(history);
    const jsonLeft = JSON.stringify(leftHistory);
    const jsonRight = JSON.stringify(rightHistory);

    fs.writeFileSync('me.json', jsonMe);
    fs.writeFileSync('left.json', jsonLeft);
    fs.writeFileSync('right.json', jsonRight);

    process.exit(0);
  });
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
