const rollup = require('rollup');
const replace = require('@rollup/plugin-replace');
const babel = require('@rollup/plugin-babel');
const typescript = require('@rollup/plugin-typescript');
const aliasPlugin = require('@rollup/plugin-alias');
const genEntries = require('./rollup-alias').genEntries;
const modifyDeclareImport = require('./modify-declare-import');

function genRollupConfig (inputConfig) {
  const { input, alias } = inputConfig

  return {
    input,
    plugins: [
      replace({
        __DEV__: false,
        __TEST__: process.env.NODE_ENV === 'test',
      }),
      typescript({
        compilerOptions: {
          "target": "ESNext",
          "lib": ["dom"],
          "module": 'ESNext',
          "declaration": true,
          "declarationDir": "./types",
          "plugins": [
            { transform: "@cocojs/typescript-transformer", transformProgram: true }
          ]
      }}),
      babel({
        extensions: ['.js', '.ts', '.tsx'],
        presets: ['@babel/preset-env'],
        plugins: [
          ["@babel/plugin-proposal-decorators", { version: "2023-11" }]
        ]
      }),
      aliasPlugin({
        entries: genEntries(alias)
      }),
    ],
    onLog(level, log, handler) {
      if (log.code === 'CIRCULAR_DEPENDENCY') {
        throw new Error(log);
      }
    }
  }
}

async function build(targets) {
  try {
    for (const { output, ...rest } of targets) {
      const rollupConfig = genRollupConfig(rest);
      const result = await rollup.rollup(rollupConfig)
      await result.write(output)
    }

    modifyDeclareImport();
  } catch (e) {
    console.error('rollup rollup error', e);
    throw e;
  }
}

module.exports.build = build;