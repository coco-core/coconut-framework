const path = require('node:path');
const { PACKAGE } = require("./rollup-alias");
const packages = path.join(__dirname, '../../packages');
const cocoMvc = path.join(packages, './coco-mvc');
const cocoMvcInput = path.join(cocoMvc, './src/index.ts');
const cocoMvcOutput = path.join(cocoMvc, './dist/coco-mvc.cjs.js');
const cocoRender = path.join(packages, './coco-render');
const jsxInput = path.join(cocoRender, './src/jsx-runtime/index.ts');
const jsxOutput = `${path.join(cocoMvc, './dist')}/jsx.cjs.js`;

const cocoCli = path.join(packages, './coco-cli');
const cliSrc = path.join(cocoCli, './src/index.ts');
const cliDist = path.join(cocoCli, '/dist/index.js');
const cliPrepareBuildSrc = path.join(cocoCli, './src/prepare-build.ts');
const cliPrepareBuildDist = path.join(cocoCli, '/dist/prepare-build.js');

module.exports.rollupTargets = [
  {
    input: cocoMvcInput,
    output: {
      file: cocoMvcOutput,
      format: 'cjs',
    },
    alias: [
      PACKAGE.MVC,
      PACKAGE.MVC_RENDER,
      PACKAGE.REACTIVE,
      PACKAGE.REACTIVE_METADATA,
      PACKAGE.ROUTER,
      PACKAGE.RECONCILER,
      PACKAGE.WEB,
      PACKAGE.SHARED,
      PACKAGE.HOST_CONFIG,
      PACKAGE.IOC_CONTAINER,
      PACKAGE.IOC_CONTAINER_TEST_HELPER,
    ],
  },
  {
    input: jsxInput,
    output: {
      file: jsxOutput,
      format: 'cjs',
    },
  },
  {
    input: cliSrc,
    output: {
      file: cliDist,
      format: 'cjs'
    }
  },
  {
    input: cliPrepareBuildSrc,
    output: {
      file: cliPrepareBuildDist,
      format: 'cjs'
    },
  }
];
