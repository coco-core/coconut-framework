const path = require("node:path");

const packages = path.join(__dirname, '../../packages');
const reconciler = path.join(packages, './coconut-reconciler/src/index.js')
const web = path.join(packages, './coconut-web/src/index.js')
const iocContainer = path.join(packages, './coco-ioc-container/src/index.js')
const shared = path.join(packages, './shared')
const ReactFiberHostConfig = path.join(packages, './coconut-web/src/ReactDomHostConfig.js')

const PACKAGE = {
  RECONCILER: 'coconut-reconciler',
  WEB: 'coconut-web',
  IOC_CONTAINER: 'coco-ioc-container',
  HOST_CONFIG: 'ReactFiberHostConfig',
  SHARED: 'shared',
};

const pathMap = {
  [PACKAGE.RECONCILER]: reconciler,
  [PACKAGE.WEB]: web,
  [PACKAGE.IOC_CONTAINER]: iocContainer,
  [PACKAGE.HOST_CONFIG]: ReactFiberHostConfig,
  [PACKAGE.SHARED]: shared,
}

const entries = [
  PACKAGE.RECONCILER,
  PACKAGE.WEB,
  PACKAGE.IOC_CONTAINER,
  PACKAGE.HOST_CONFIG,
  PACKAGE.SHARED,
].map(name => ({
  find: name,
  replacement: pathMap[name],
}))

module.exports.entries = {
  entries
};