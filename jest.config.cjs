module.exports = {
  preset: '@shelf/jest-mongodb',
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text',
    'lcov',
    'json-summary'
  ]
};
