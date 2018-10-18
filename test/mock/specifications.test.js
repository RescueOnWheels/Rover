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
    it('should expose the `Left` function.', () => {
      // Assert
      should.exist(Motor.Left);

      // Assert
      Motor.Left.should.be.an('function');
    });

    it('should expose the `Movement` function.', () => {
      // Assert
      should.exist(Motor.Movement);

      // Assert
      Motor.Movement.should.be.an('function');
    });

    it('should expose the `Right` function.', () => {
      // Assert
      should.exist(Motor.Right);

      // Assert
      Motor.Right.should.be.an('function');
    });

    it('should expose the `Stop` function.', () => {
      // Assert
      should.exist(Motor.Stop);

      // Assert
      Motor.Stop.should.be.an('function');
    });
  });
};
