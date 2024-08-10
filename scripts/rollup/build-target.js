const path = require('node:path');
const {PACKAGE} = require("./alias");
const packages = path.join(__dirname, '../../packages');
const cocoMvc = path.join(packages, './coco-mvc');
const cocoMvcInput = path.join(cocoMvc, './src/index.ts');
const cocoMvcFile = `${path.join(cocoMvc, './dist')}/coconut.cjs.js`;
const jsxInput = path.join(cocoMvc, './src/jsx-runtime/index.ts');
const jsxFile = `${path.join(cocoMvc, './dist')}/jsx-runtime.cjs.js`;

module.exports = [
  {
    input: cocoMvcInput,
    alias: [
      PACKAGE.RECONCILER,
      PACKAGE.WEB,
      PACKAGE.IOC_CONTAINER,
      PACKAGE.HOST_CONFIG,
      PACKAGE.SHARED
    ],
    output: {
      file: cocoMvcFile,
      format: 'cjs',
    }
  },
  {
    input: jsxInput,
    output: {
      file: jsxFile,
      format: 'cjs',
    }
  },
]
