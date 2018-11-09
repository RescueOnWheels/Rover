let toMockOrNotToMockThatIsTheQuestion;

/* istanbul ignore else */
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'CI') {
  // eslint-disable-next-line no-console
  console.warn('Rover: Using the mock tests!');

  toMockOrNotToMockThatIsTheQuestion = ('./mock');
} else {
  toMockOrNotToMockThatIsTheQuestion = ('./real');
}

// eslint-disable-next-line import/no-dynamic-require
module.exports = require(toMockOrNotToMockThatIsTheQuestion);
