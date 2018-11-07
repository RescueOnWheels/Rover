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
    it('test case 1', () => {
      // Arrange
      const angle = 0;
      const distance = 5;

      // Act
      coordinate = coordinateCalculator(angle, distance, { x: 0, y: 0 });

      // Assert
      coordinate.x.should.equal(0);
      coordinate.y.should.equal(5);
    });

    it('test case 2', () => {
      // Arrange
      const angle = 90;
      const distance = 5;

      // Act
      coordinate = coordinateCalculator(angle, distance, { x: 0, y: 0 });

      // Assert
      coordinate.x.should.equal(5);
      coordinate.y.should.equal(0);
    });

    it('test case 3', () => {
      // Arrange
      const angle = 180;
      const distance = 5;

      // Act
      coordinate = coordinateCalculator(angle, distance, { x: 0, y: 0 });

      // Assert
      coordinate.x.should.equal(0);
      coordinate.y.should.equal(-5);
    });

    it('test case 4', () => {
      // Arrange
      const angle = 270;
      const distance = 5;

      // Act
      coordinate = coordinateCalculator(angle, distance, { x: 0, y: 0 });

      // Assert
      coordinate.x.should.equal(-5);
      coordinate.y.should.equal(0);
    });
  });
};
