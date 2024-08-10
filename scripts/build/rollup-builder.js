const rollup = require('rollup');
const replace = require('rollup-plugin-replace');
const typescript = require('@rollup/plugin-typescript');
const alias = require('@rollup/plugin-alias');
const aliasConfig = require('./alias').entries;

function genRollupConfig (inputConfig) {
  const { input } = inputConfig

  return {
    input,
    plugins: [
      replace({ __DEV__: false }),
      typescript({compilerOptions: {
        "target": "es2015", "lib": ["dom", "es2015"]
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
      console.log('=======result===========', result);
    }
  } catch (e) {
    console.error('rollup rollup error', e);
    throw e;
  }
}

module.exports.build = build;