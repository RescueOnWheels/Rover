/* Packages */
const chai = require('chai');

/* Test target */
const toRadians = require('./../../lib/helpers/toRadians');

chai.should();

module.exports = () => {
  // Arrange
  let radian;

  describe('Output', () => {
    it('should return a number.', () => {
      // Act
      radian = toRadians(45);

      // Assert
      radian.should.be.a('number');
    });
  });

  describe('Expected errors', () => {});

  describe('Test cases', () => {});
};
