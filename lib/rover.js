/* Packages */
const fs = require('fs');

/* Submodules */
const Larynx = require('./Larynx');
const Motor = require('./Motor');
const Nervi = require('./Nervi');

Motor.setGlobalPower(100);
Motor.setSoftStart(0);

Nervi.compass.disable();
Nervi.ultrasonicLeft.disable();
Nervi.ultrasonicRight.disable();

/* Helpers */
const coordCalc = require('./helpers/coordinateCalculator');

function stop() {
  Motor.stop();
}

/* START: Communication */

Larynx.on('move', (data) => {
  if (data === 'left') {
    Motor.turnLeft();
  } else if (data === 'right') {
    Motor.turnRight();
  } else if (data.speed === 0) {
    stop();
  } else {
    Motor.move(data);
  }
});

Larynx.on('stop', () => {
  stop();
});

Larynx.on('disconnect', () => {
  stop();
});

Larynx.on('camera move', (position) => {
  const json = JSON.parse(position);
  Nervi.cameraMount.moveTo(json.horizontal, json.vertical);
});

/* STOP: Communication */
/* START: Auto-stop */

/* Set interval as low as possible, ultrasonic will determine the true minimum time. */
Nervi.ultrasonicFront.setInterval(1);

let hasStopped = false;
Nervi.ultrasonicFront.on('data', (distance) => {
  /* Ignore invalid data */
  if (distance === -1) return;

  /* Ignore distance if we are standing still, 5cm/s margin. */
  if (Nervi.rightRotary.lastSpeed < 0.05) {
    return;
  }

  /* Normal situation. */
  if (distance > 0.50 && !hasStopped) {
    return;
  }

  /* Reset motor power back to normal. */
  if (distance > 0.50 && hasStopped) {
    Motor.setForwardMulti(100);
    hasStopped = false;
    return;
  }

  hasStopped = true;

  /* Start decreasing the motor power. */
  if (distance <= 0.50 && distance > 0.20) {
    Motor.setForwardMulti((distance - 0.20) * (3 + (1 / 3)));
    return;
  }

  /* Disable all forward motor power. */
  Motor.setForwardMulti(0);
  Motor.move({ speed: 100, direction: 1 });
  setTimeout(stop.bind(this), 100);
});

/* STOP: Auto-stop */
/* START: Mapping */

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

let ownAngle = 0;
let leftAngle = 270 + ownAngle;
let rightAngle = 90 + ownAngle;

Nervi.rightRotary.on('data', (speed) => {
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


Nervi.ultrasonicFront.on('data', (distance) => {
  lastMeasurement.front = distance;
});


Nervi.ultrasonicLeft.on('data', (distance) => {
  lastMeasurement.left = distance;
});

Nervi.ultrasonicRight.on('data', (distance) => {
  lastMeasurement.right = distance;
});


/* STOP: Mapping */
