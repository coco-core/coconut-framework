
const { rollupTargets, tsTargets } = require('./build-target');
const { build } = require("./rollup-builder");
const compiler = require("./ts-compiler");


async function buildAll () {
  await Promise.all([build(rollupTargets),compiler(tsTargets)])
}

buildAll();
