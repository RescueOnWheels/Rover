/* Packages */
const chai = require('chai');

/* Test target */
const Larynx = require('./../../lib/Larynx');
const Motor = require('./../../lib/Motor');

const should = chai.should();

module.exports = () => {
  describe('Larynx', () => {
    it('should extend from EventEmitter.', () => {
      // Arrange
      const superName = Object.getPrototypeOf(Object.getPrototypeOf(Larynx)).constructor.name;

      // Assert
      superName.should.equal('EventEmitter');
    });

    it('should expose the `on` function.', () => {
      // Assert
      should.exist(Larynx.on);

      // Assert
      Larynx.on.should.be.an('function');
    });
  });

  describe('Motor', () => {
    it('should expose the `move` function.', () => {
      // Assert
      should.exist(Motor.move);

      // Assert
      Motor.move.should.be.an('function');
    });

    it('should expose the `turnLeft` function.', () => {
      // Assert
      should.exist(Motor.turnLeft);

      // Assert
      Motor.turnLeft.should.be.an('function');
    });

    it('should expose the `turnRight` function.', () => {
      // Assert
      should.exist(Motor.turnRight);

      // Assert
      Motor.turnRight.should.be.an('function');
    });

    it('should expose the `Stop` function.', () => {
      // Assert
      should.exist(Motor.stop);

      // Assert
      Motor.stop.should.be.an('function');
    });
  });
};
