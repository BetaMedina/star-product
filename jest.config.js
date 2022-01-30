module.exports = {
  clearMocks: true,
  coverageProvider: 'v8',
  roots: ['<rootDir>/tests/'],
  testMatch: ['***/src/**/*.js?(x)', '**/?(*.)(test|spec).js?(x)'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
    '!<rootDir>/src/infra/**/*.js',
    '!<rootDir>/src/main/**/*.js'
  ],

  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  testPathIgnorePatterns: ['/node_modules/']
}
