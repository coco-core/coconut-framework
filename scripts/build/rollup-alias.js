const path = require("node:path");

const packages = path.join(__dirname, '../../packages');
// todo 和tsconfig.json.path放在一起维护
const cocoMvc = path.join(packages, './coco-mvc/src/index.ts')
// todo 单独暴露出所有的Metadata
const cocoMvcDecorator = path.join(packages, './coco-mvc/src/decorator')
const reconciler = path.join(packages, './coconut-reconciler/src/index.js')
const web = path.join(packages, './coconut-web/src/index.js')
const iocContainer = path.join(packages, './coco-ioc-container/src/index.ts')
// todo 支持@
const shared = path.join(packages, './shared')
const ReactFiberHostConfig = path.join(packages, './coconut-web/src/ReactDomHostConfig.js')

const PACKAGE = {
  COCO_MVC: 'coco-mvc',
  COCO_MVC_DECORATOR: 'coco-mvc-decorator',
  RECONCILER: 'coconut-reconciler',
  WEB: 'coconut-web',
  IOC_CONTAINER: 'coco-ioc-container',
  HOST_CONFIG: 'ReactFiberHostConfig',
  SHARED: 'shared',
};

const pathMap = {
  [PACKAGE.COCO_MVC]: cocoMvc,
  [PACKAGE.COCO_MVC_DECORATOR]: cocoMvcDecorator,
  [PACKAGE.RECONCILER]: reconciler,
  [PACKAGE.WEB]: web,
  [PACKAGE.IOC_CONTAINER]: iocContainer,
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