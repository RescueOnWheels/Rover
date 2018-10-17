/* Packages */
const chai = require('chai');

/* Test target */
const Motor = require('./../../lib/Motor');

const should = chai.should();

module.exports = () => {
  describe('Motor', () => {
    it('should expose the `Left` function.', () => {
      should.exist(Motor.Left);
      Motor.Left.should.be.an('function');
    });

    it('should expose the `Right` function.', () => {
      should.exist(Motor.Right);
      Motor.Right.should.be.an('function');
    });
  });
};
