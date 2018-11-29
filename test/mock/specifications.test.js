/* Packages */
const chai = require('chai');

/* Test target */
const Larynx = require('./../../lib/Larynx');
const Motor = require('./../../lib/Motor');
const Nervi = require('./../../lib/Nervi');

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

  describe('Nervi', () => {
    it('should expose the `cameraMount`.', () => {
      // Assert
      should.exist(Nervi.cameraMount);

      // Assert
      Nervi.cameraMount.should.be.an('object');
    });

    it('should expose the `rotary`.', () => {
      // Assert
      should.exist(Nervi.rotary);

      // Assert
      Nervi.rotary.should.be.an('object');
    });

    it('should expose the `rotary`, which should extend from EventEmitter.', () => {
      // Arrange
      const { name } = Object.getPrototypeOf(Object.getPrototypeOf(Nervi.rotary)).constructor;

      // Assert
      name.should.equal('EventEmitter');
    });

    it('should expose the `ultrasonic`.', () => {
      // Assert
      should.exist(Nervi.ultrasonic);

      // Assert
      Nervi.ultrasonic.should.be.an('object');
    });

    it('should expose the `ultrasonic`, which should extend from EventEmitter.', () => {
      // Arrange
      const { name } = Object.getPrototypeOf(Object.getPrototypeOf(Nervi.ultrasonic)).constructor;

      // Assert
      name.should.equal('EventEmitter');
    });
  });
};
