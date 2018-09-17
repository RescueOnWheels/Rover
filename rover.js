const Motor = require('./Motor');
const Larynx = require('./Larynx');

const comm = new Larynx();
const motor = new Motor();

comm.on('move', (data) => {
    console.log(data);

    if(data == 'left') {
        motor.Left();
    } else if (data == 'right') {
        motor.Right();
    } else if (data.speed == 0 || data.speed == -0) {
        motor.Stop();
    } else {
        motor.Forward(data);
    }
});

comm.on('disconnect', () => {
    motor.Stop();
});

comm.Connect();