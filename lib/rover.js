const Larynx = require('./Larynx');
const Motor = require('./Motor');
const Nervi = require('./Nervi');

const lastMeasurement = {
  front: -1,
  left: -1,
  right: -1,
};

const leftCoords = {
  x: 0,
  y: 0,
};
const rightCoords = {
  x: 0,
  y: 0,
};

const coords = {
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

Nervi.rightRotary.on('speed', (speed) => {
  coords.y += speed / 2;
  history.push(coords);

  leftCoords.y = coords.y;
  leftCoords.x = coords.x - lastMeasurement.left;
  leftHistory.push(leftCoords);

  rightCoords.y = coords.y;
  rightCoords.x = coords.x + lastMeasurement.right;
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
  let dist = distance;
  dist *= 100;
  dist = Math.round(dist) / 100;
  lastMeasurement.front = dist;
  if (dist === -1) {
    return;
  }

  if (dist > 0.50 && hasStopped) {
    hasStopped = false;
    Motor.setForwardMulti(100);
  } else if (dist <= 0.50 && !hasStopped) {
    hasStopped = true;

    Motor.setForwardMulti(0);
    Motor.move({ speed: 100, direction: 1 });
    setTimeout(stop.bind(this), 500);
  }
});

Nervi.ultrasonicLeft.on('data', (distance) => {
  let dist = distance;
  dist *= 100;
  dist = Math.round(dist) / 100;
  lastMeasurement.left = dist;
});

Nervi.ultrasonicRight.on('data', (distance) => {
  let dist = distance;
  dist *= 100;
  dist = Math.round(dist) / 100;
  lastMeasurement.right = dist;
});
