const Larynx = require('./Larynx');
const Motor = require('./Motor');
const Nervi = require('./Nervi');
/*
var fs = require('fs');
var path = require('path');
var Canvas = require('canvas');
*/
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

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

/* +0 is the angle from compass */
const ownAngle = 0;
const leftAngle = 270 + ownAngle;
const rightAngle = 90 + ownAngle;

Nervi.rightRotary.on('speed', (speed) => {
  /* Speed is emitted every 500ms */
  /* Speed = distance covered in the last 500ms, but converted to 1000ms (m/s) thus divide by 2. */
  speed /= 2;

  /* Calculate own coords */
  let deltaX = Math.sin(toRadians(ownAngle)) * speed;
  deltaX = Math.round(deltaX * 100) / 100;
  let deltaY = Math.cos(toRadians(ownAngle)) * speed;
  deltaY = Math.round(deltaY * 100) / 100;

  coords.x += deltaX;
  coords.y += deltaY;
  history.push(coords);

  /* Calculate the left coords */
  let leftDeltaX = Math.sin(toRadians(leftAngle)) * lastMeasurement.left;
  leftDeltaX = Math.round(leftDeltaX * 100) / 100;
  let leftDeltaY = Math.cos(toRadians(leftAngle)) * lastMeasurement.left;
  leftDeltaY = Math.round(leftDeltaY * 100) / 100;

  leftCoords.x = coords.x + leftDeltaX;
  leftCoords.y = coords.y + leftDeltaY;
  leftHistory.push(leftCoords);

  /* Calculate the right coords */
  let rightDeltaX = Math.sin(toRadians(rightAngle)) * lastMeasurement.right;
  rightDeltaX = Math.round(rightDeltaX * 100) / 100;
  let rightDeltaY = Math.cos(toRadians(rightAngle)) * lastMeasurement.right;
  rightDeltaY = Math.round(rightDeltaY * 100) / 100;

  rightCoords.x = coords.x + rightDeltaX;
  rightCoords.y = coords.y + rightDeltaY;
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
/**
 * TODO test function, should be removed!!
 * draws a random generated straight-down map to file:
 */
/*
function drawRandomMap(filename) {
  var canvas = Canvas.createCanvas(1000, 500);
  var ctx = canvas.getContext('2d');

  function spark(ctx, data) {
    var len = data.length;
    var pad = 1;
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var barWidth = width / len;
    var max = Math.max.apply(null, data);

    var leftwall = [];
    var rightwall = [];
    var me = [];

    ctx.fillStyle = 'rgba(0,0,255,0.5)';
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;


    for (let i = 0; i < 20; i++) {
      leftwall.push({ x: 10 + Math.random() * 10, y: i * 10 });
      me.push({ x: 55 + Math.random() * 10, y: i * 10 });
      rightwall.push({ x: 100 + Math.random() * 10, y: i * 10 });
    }

    leftwall.forEach(coord => {
      ctx.beginPath();
      ctx.fillRect(coord.x - 4, coord.y - 4, 8, 8);
      ctx.stroke();
    });

    rightwall.forEach(coord => {
      ctx.beginPath();
      ctx.fillRect(coord.x - 4, coord.y - 4, 8, 8);
      ctx.stroke();
    });

    ctx.beginPath();
    ctx.moveTo(me[0].x, me[0].y);
    for (let i = 1; i < me.length; i++) {
      ctx.lineTo(me[i].x, me[i].y);
    }
    ctx.stroke();

  }

  spark(ctx, [1, 2, 4, 5, 10, 4, 2, 5, 4, 3, 3, 2])
  //
  canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, filename + '.png')))

} */
