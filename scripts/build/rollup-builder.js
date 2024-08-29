const rollup = require('rollup');
const replace = require('rollup-plugin-replace');
const babel = require('@rollup/plugin-babel');
const typescript = require('@rollup/plugin-typescript');
const alias = require('@rollup/plugin-alias');
const aliasConfig = require('./alias').entries;

function genRollupConfig (inputConfig) {
  const { input } = inputConfig

  return {
    input,
    plugins: [
      replace({ __DEV__: false }),
      babel({
        plugins: [
          ["@babel/plugin-proposal-decorators", { version: "2023-11" }]
        ]
      }),
      typescript({
        compilerOptions: {
          "target": "es2015",
          "lib": ["dom", "es2015"],
      }}),
      alias(aliasConfig)
    ]
  }
}

async function build(targets) {
  try {
    for (const { output, ...rest } of targets) {
      const rollupConfig = genRollupConfig(rest);
      const result = await rollup.rollup(rollupConfig)
      await result.write(output)
    }
  } catch (e) {
    console.error('rollup rollup error', e);
    throw e;
  }
}

module.exports.build = build;