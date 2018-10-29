const Motor = require('./../../lib/Motor/test/test');
const Nervi = require('./../../lib/Nervi/test/test');

const specifications = require('./specifications.test');

describe('Mock', () => {
  describe('specifications', specifications);

  describe('lib', () => {
    describe('Motor', Motor);
    describe('Nervi', Nervi);
  });
});
