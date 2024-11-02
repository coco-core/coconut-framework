const path = require("path");

module.exports = {
  rootDir: path.join(__dirname, '../..'),
  testEnvironment: 'jsdom',
  testMatch: ['**/__test__/**/*.test.ts'],
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
    "coco-mvc": "<rootDir>/packages/coco-mvc/dist/coco-mvc.cjs.js"
  },
  setupFiles: ['<rootDir>/scripts/jest/setup.js'],
};
