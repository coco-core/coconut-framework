const path = require('path');

module.exports = {
  rootDir: path.join(__dirname, '../..'),
  maxConcurrency: 1,
  testEnvironment: 'jsdom',
  testMatch: ['**/*.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '\\.[jt]sx?$': '<rootDir>/scripts/jest/transformer.js',
  },
  moduleNameMapper: {
    'coco-mvc/jsx-runtime$': '<rootDir>/packages/coco-mvc/dist/jsx.cjs.js',
    'coco-mvc$': '<rootDir>/packages/coco-mvc/dist/coco-mvc.cjs.js',
    '@cocojs/cli$': '<rootDir>/packages/coco-cli/dist/__tests__/index.js',
  },
  setupFiles: ['<rootDir>/scripts/jest/setup.js'],
};
