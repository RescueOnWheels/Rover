/* Helpers */
const toRadians = require('./toRadians');

function coordinateCalculator(angle, distance, { x, y }) {
  let deltaX = Math.sin(toRadians(angle)) * distance;
  deltaX = Math.round(deltaX * 100) / 100;

  let deltaY = Math.cos(toRadians(angle)) * distance;
  deltaY = Math.round(deltaY * 100) / 100;

  x += deltaX;
  y += deltaY;

  return {
    x,
    y,
  };
}

module.exports = coordinateCalculator;
