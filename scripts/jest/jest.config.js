const path = require('path');

module.exports = {
  rootDir: path.join(__dirname, '../..'),
  maxConcurrency: 1,
  testEnvironment: 'jsdom',
  testMatch: ['**/__test__/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '\\.[jt]sx?$': [
      'babel-jest',
      {
        extends: path.join(__dirname, './babel.config.js'),
      },
    ],
  },
  moduleNameMapper: {
    'coco-mvc/jsx-runtime$': '<rootDir>/packages/coco-mvc/dist/jsx.cjs.js',
    'coco-mvc$': '<rootDir>/packages/coco-mvc/dist/coco-mvc.cjs.js',
  },
  setupFiles: ['<rootDir>/scripts/jest/setup.js'],
};
