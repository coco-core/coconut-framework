/**
 * 打包coco-cli和coco-mvc
 */
const rollup = require('rollup');
const typescript = require('@rollup/plugin-typescript');
const aliasPlugin = require('@rollup/plugin-alias');
const replace = require('rollup-plugin-replace');
const path = require('node:path');
const packages = path.join(__dirname, '../../packages');
const cocoMvc = path.join(packages, './coco-mvc');
const cocoMvcInput = path.join(cocoMvc, './src/index.ts');
const cocoMvcFile = `${path.join(cocoMvc, './dist')}/coconut.cjs.js`;
const jsxInput = path.join(cocoMvc, './src/jsx-runtime/index.ts');
const jsxFile = `${path.join(cocoMvc, './dist')}/jsx-runtime.cjs.js`;
const {PACKAGE, genRollupAliasConfig} = require('./alias');

const bundles = [
  [
    {
      input: cocoMvcInput,
      alias: [
        PACKAGE.RECONCILER,
        PACKAGE.WEB,
        PACKAGE.IOC_CONTAINER,
        PACKAGE.HOST_CONFIG,
        PACKAGE.SHARED
      ],
    },
    {
      file: cocoMvcFile,
      format: 'cjs',
    }
  ],
  [
    {
      input: jsxInput
    },
    {
      file: jsxFile,
      format: 'cjs',
    }
  ],
]

function genRollupConfig (inputConfig) {
  const {input, alias} = inputConfig

  return {
    input,
    plugins: [
      replace({ __DEV__: false }),
      typescript({compilerOptions: {
        "target": "es2015", "lib": ["dom", "es2015"]
      }}),
      alias ? aliasPlugin(genRollupAliasConfig(alias)) : undefined
    ].filter(Boolean)
  }
}

async function build() {
  try {
    for (const [inputConfig, outputConfig] of bundles) {
      const rollupConfig = genRollupConfig(inputConfig);
      const result = await rollup.rollup(rollupConfig)
      await result.write(outputConfig)
      console.log('=======result===========', result);
    }
  } catch (e) {
    console.error('rollup rollup error', e);
    throw e;
  }
}

build();