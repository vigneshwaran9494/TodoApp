const {resolve} = require('path');

module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transform: {
    '\\.(js|ts|tsx|.ios.js)$': require.resolve(
      'react-native/jest/preprocessor.js',
    ),
  },
  collectCoverageFrom: ['**/*.{ts,tsx}'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
  setupFiles: ['./setupJest.js'],
  // this is specific to the Jest repo, not generally needed (the files we ignore will be in node_modules which is ignored by default)
  transformIgnorePatterns: [resolve(__dirname, '../../packages')],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
  },
};
