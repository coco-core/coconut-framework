/**
 * 打包coco-cli和coco-mvc
 */
const rollup = require('rollup');
const typescript = require('@rollup/plugin-typescript');
const aliasPlugin = require('@rollup/plugin-alias');
const replace = require('rollup-plugin-replace');
const {genRollupAliasConfig} = require('./alias');
const buildTargets = require('./build-target') ;

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
    for (const { output, ...rest } of buildTargets) {
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

build();