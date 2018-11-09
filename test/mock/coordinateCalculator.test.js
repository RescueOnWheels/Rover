/* Packages */
const chai = require('chai');

/* Test target */
const coordinateCalculator = require('./../../lib/helpers/coordinateCalculator');

chai.should();

module.exports = () => {
  // Arrange
  let coordinate;

  describe('Output', () => {
    it('should return an object.', () => {
      // Act
      coordinate = coordinateCalculator(0, 10, { x: 0, y: 0 });

      // Assert
      coordinate.should.be.an.instanceOf(Object);
    });
  });

  describe('Expected errors', () => {});

  describe('Test cases', () => {
    describe('test case 1', () => {
      // Arrange
      const ANGLE = 60;
      const DISTANCE = 5;

      it('left ultrasonic', () => {
        // Arrange
        const leftAngle = 270 + ANGLE;

        // Act
        coordinate = coordinateCalculator(leftAngle, DISTANCE, { x: 10, y: 10 });

        // Assert
        (Math.round(coordinate.x * 100) / 100).should.equal(7.5);
        (Math.round(coordinate.y * 100) / 100).should.equal(14.33);
      });

      it('right ultrasonic', () => {
        // Arrange
        const rightAngle = 90 + ANGLE;

        // Act
        coordinate = coordinateCalculator(rightAngle, DISTANCE, { x: 10, y: 10 });

        // Assert
        (Math.round(coordinate.x * 100) / 100).should.equal(12.5);
        (Math.round(coordinate.y * 100) / 100).should.equal(5.67);
      });
    });

    describe('test case 2', () => {
      // Arrange
      const ANGLE = 90;
      const DISTANCE = 2;

      it('left ultrasonic', () => {
        // Arrange
        const leftAngle = 270 + ANGLE;

        // Act
        coordinate = coordinateCalculator(leftAngle, DISTANCE, { x: 0, y: 0 });

        // Assert
        (Math.round(coordinate.x * 100) / 100).should.equal(0);
        (Math.round(coordinate.y * 100) / 100).should.equal(2);
      });

      it('right ultrasonic', () => {
        // Arrange
        const rightAngle = 90 + ANGLE;

        // Act
        coordinate = coordinateCalculator(rightAngle, DISTANCE, { x: 0, y: 0 });

        // Assert
        (Math.round(coordinate.x * 100) / 100).should.equal(0);
        (Math.round(coordinate.y * 100) / 100).should.equal(-2);
      });
    });

    describe('test case 3', () => {
      // Arrange
      const ANGLE = 270;
      const DISTANCE = 2;

      it('left ultrasonic', () => {
        // Arrange
        const leftAngle = 270 + ANGLE;

        // Act
        coordinate = coordinateCalculator(leftAngle, DISTANCE, { x: 0, y: 0 });

        // Assert
        (Math.round(coordinate.x * 100) / 100).should.equal(0);
        (Math.round(coordinate.y * 100) / 100).should.equal(-2);
      });

      it('right ultrasonic', () => {
        // Arrange
        const rightAngle = 90 + ANGLE;

        // Act
        coordinate = coordinateCalculator(rightAngle, DISTANCE, { x: 0, y: 0 });

        // Assert
        (Math.round(coordinate.x * 100) / 100).should.equal(0);
        (Math.round(coordinate.y * 100) / 100).should.equal(2);
      });
    });
  });
};
