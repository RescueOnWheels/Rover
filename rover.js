const Motor = require('./Motor');
const Larynx = require('./Larynx');

const comm = new Larynx();

comm.on('move', (data) => {
    console.log(data);

})

comm.Connect();