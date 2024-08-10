
const { rollupTarget } = require('./build-target');
const { build } = require("./rollup-builder");


async function buildAll () {
  await build(rollupTarget)
}

buildAll();
