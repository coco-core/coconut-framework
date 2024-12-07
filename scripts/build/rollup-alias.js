const path = require("node:path");

const packages = path.join(__dirname, '../../packages');
// todo 和tsconfig.json.path放在一起维护
const cocoMvc = path.join(packages, './coco-mvc/src/index.ts')
const reconciler = path.join(packages, './coconut-reconciler/src/index.js')
const web = path.join(packages, './coconut-web/src/index.js')
const iocContainer = path.join(packages, './coco-ioc-container/src/index.ts')
const reactive = path.join(packages, './coco-reactive/src/index.ts')
const router = path.join(packages, './coco-router/src/index.ts')
// todo 支持@
const shared = path.join(packages, './shared/index.ts')
const ReactFiberHostConfig = path.join(packages, './coconut-web/src/ReactDomHostConfig.js')

const PACKAGE = {
  COCO_MVC: 'coco-mvc',
  RECONCILER: 'coconut-reconciler',
  WEB: 'coconut-web',
  IOC_CONTAINER: 'coco-ioc-container',
  REACTIVE: 'coco-reactive',
  ROUTER: 'coco-router',
  HOST_CONFIG: 'ReactFiberHostConfig',
  SHARED: 'shared',
};

const pathMap = {
  [PACKAGE.COCO_MVC]: cocoMvc,
  [PACKAGE.RECONCILER]: reconciler,
  [PACKAGE.WEB]: web,
  [PACKAGE.IOC_CONTAINER]: iocContainer,
  [PACKAGE.REACTIVE]: reactive,
  [PACKAGE.ROUTER]: router,
  [PACKAGE.HOST_CONFIG]: ReactFiberHostConfig,
  [PACKAGE.SHARED]: shared
}

function genEntries(config) {
  return (config || []).map(name => ({
    find: name,
    replacement: pathMap[name],
  }))
}

module.exports = {
  PACKAGE,
  genEntries
};