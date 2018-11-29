const specifications = require('./specifications.test');

/* Lib */
const Larynx = require('./../../lib/Larynx/test');
const Motor = require('./../../lib/Motor/test');
const Nervi = require('./../../lib/Nervi/test');

describe('Mock', () => {
  describe('specifications', specifications);

  describe('lib', () => {
    describe('Larynx', Larynx);
    describe('Motor', Motor);
    describe('Nervi', Nervi);
  });
});
