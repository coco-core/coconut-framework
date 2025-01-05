// 修改coco-mvc/dist/types/coco-mvc/src/index.d.ts中引入其他子包的路径
const fs = require("fs");
const path = require("path");

function modifyDeclareImport () {
  const mvcDts = path.resolve(__dirname, "../../packages/coco-mvc/dist/types/coco-mvc/src/index.d.ts");
  const content = fs.readFileSync(mvcDts, "utf8");
  const replaced = content.replaceAll(/from '(coco-ioc-container|coco-reactive|coco-router)'/g, "from '../../$1/src/index'");
  fs.writeFileSync(mvcDts, replaced, "utf8");
}

module.exports = modifyDeclareImport;
