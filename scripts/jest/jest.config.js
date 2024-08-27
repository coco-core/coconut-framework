const path = require("path");

module.exports = {
  rootDir: path.join(__dirname, '../..'),
  testEnvironment: 'jsdom',
  testMatch: ['**/__test__/**/*.test.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    "\\.[jt]sx?$": [
      "babel-jest",
      {
        "extends": path.join(__dirname, './babel.config.js')
      }
    ]
  },
  moduleNameMapper: {
    "coconut-web": "<rootDir>/packages/coconut-web/src/index.js",
    "coconut-reconciler": "<rootDir>/packages/coconut-reconciler/src/index.js",
    "ReactFiberHostConfig": "<rootDir>/packages/coconut-web/src/ReactDomHostConfig.js",
  },
  setupFiles: ['<rootDir>/scripts/jest/setup.js'],
};
