/* Submodules */
const Larynx = require('./Larynx');
const Motor = require('./Motor');
const Nervi = require('./Nervi');

Motor.setGlobalPower(100);
Motor.setSoftStart(0);

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
Nervi.ultrasonic.setInterval(1);

let hasStopped = false;
Nervi.ultrasonic.on('data', (distance) => {
  /* Ignore invalid data */
  if (distance === -1) return;

  /* Ignore extremely low speeds */
  if (Nervi.rotary.lastSpeed < 0.05) return;

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

/* STOP: Auto-stop */
