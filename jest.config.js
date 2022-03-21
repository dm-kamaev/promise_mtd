module.exports = {
  bail: 1,
  verbose: true,
  testEnvironment: 'node',
  automock: false,
  setupFilesAfterEnv: ['./jest-setup.js'],
  coverageReporters: ['json-summary', 'json-summary', 'text', 'lcov']
};
