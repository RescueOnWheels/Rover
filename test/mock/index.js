const specifications = require('./specifications.test');

/* Helpers */
const coordinateCalculator = require('./coordinateCalculator.test');
const toRadians = require('./toRadians.test');

/* Lib */
const Larynx = require('./../../lib/Larynx/test');
const Motor = require('./../../lib/Motor/test');
const Nervi = require('./../../lib/Nervi/test');

describe('Mock', () => {
  describe('specifications', specifications);

  describe('helpers', () => {
    describe('coordinateCalculator', coordinateCalculator);
    describe('toRadians', toRadians);
  });

  describe('lib', () => {
    describe('Larynx', Larynx);
    describe('Motor', Motor);
    describe('Nervi', Nervi);
  });
});
