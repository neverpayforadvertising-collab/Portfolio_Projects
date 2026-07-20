export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  // CHANGED: map NodeNext-style "./foo.js" imports in TS sources back to "./foo"
  // so ts-jest can resolve them when running tests.
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  verbose: true
};
