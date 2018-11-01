const specifications = require('./specifications.test');

/* Helpers */
const coordinateCalculator = require('./coordinateCalculator.test');
const toRadians = require('./toRadians.test');

/* Lib */
const Motor = require('./../../lib/Motor/test/test');
const Nervi = require('./../../lib/Nervi/test/test');

describe('Mock', () => {
  describe('specifications', specifications);

  describe('helpers', () => {
    describe('coordinateCalculator', coordinateCalculator);
    describe('toRadians', toRadians);
  });

  describe('lib', () => {
    describe('Motor', Motor);
    describe('Nervi', Nervi);
  });
});
