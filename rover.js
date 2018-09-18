const Motor = require('./Motor');
const Larynx = require('./Larynx');

const motor = new Motor();

Larynx.on('move', (data) => {
    console.log(data);

    if (data == 'left') {
        motor.Left();
    } else if (data == 'right') {
        motor.Right();
    } else if (data.speed == 0 || data.speed == -0) {
        motor.Stop();
    } else {
        motor.Forward(data);
    }
});

Larynx.on('disconnect', () => {
    motor.Stop();
});