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
  const { horizontal, vertical } = JSON.parse(position);
  Nervi.cameraMount.moveTo(horizontal, vertical);
});

/* STOP: Communication */
/* START: Auto-stop */

/* Set interval as low as possible, ultrasonic will determine the true minimum time. */
Nervi.ultrasonic.setInterval(1);

let hasStopped = false;
Nervi.ultrasonic.on('data', (distance) => {
  /* Ignore invalid data */
  if (distance === -1) return;

  /* Easy reference to the last speed. */
  const { lastSpeed } = Nervi.rotary;

  /* Ignore extremely low speeds */
  if (lastSpeed < 0.05) return;

  /* Prevent 0-division by adding 0.01 m/s. */
  lastSpeed += 0.01;
  lastSpeed /= 10;

  /* Make sure we disable power limitation if the distance is greater than the treshold. */
  if (distance > lastSpeed) {
    /* We are already on full forward power. */
    if (!hasStopped) {
      return;
    }

    Motor.setForwardMulti(100);
    hasStopped = false;

    return;
  }

  hasStopped = true;

  /* Start decreasing the power if we are above 25% of the distance covered, based on the current speed. */
  if (distance > (lastSpeed * 0.25)) {
    Motor.setForwardMulti(distance * 100);
    return;
  }

  /* Prevent any forward movement. */
  Motor.setForwardMulti(0);

  /* Move backwareds to compensate for the passive braking system. */
  Motor.move({ speed: 100, direction: 1 });

  /* Move backwards for X ms, where X is equal to a tenth of the speed. */
  setTimeout(stop.bind(this), lastSpeed * 1000);
});

/* STOP: Auto-stop */
