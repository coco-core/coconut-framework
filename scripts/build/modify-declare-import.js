// 修改coco-mvc/dist/types/coco-mvc/src/index.d.ts中引入其他子包的路径
const fs = require("fs");
const path = require("path");

function modifyDeclareImport () {
  const mvcDts = path.resolve(__dirname, "../../packages/coco-mvc/dist/types/coco-mvc/src/index.d.ts");
  if (fs.existsSync(mvcDts)) {
    const content = fs.readFileSync(mvcDts, "utf8");
    const replaced = content.replaceAll(/from '(coco-ioc-container|coco-reactive|coco-router)'/g, "from '../../$1/src/index'");
    fs.writeFileSync(mvcDts, replaced, "utf8");
  } else {
    console.error('dist/types下没有找到入口什么文件');
    const root = path.resolve(__dirname, "../../packages/coco-mvc/dist/types");
    if (fs.existsSync(root)) {
      const rootFiles = fs.readdirSync(root).map(file => {
        return file.trim()
      })
      console.error('dist/types下存在如下文件（夹）：', rootFiles);
    }
  }
}

module.exports = modifyDeclareImport;
