const { rollupTargets } = require('./build-target');
const { build } = require("./rollup-builder");

async function buildAll () {
  await Promise.all([build(rollupTargets)])
}

buildAll();
