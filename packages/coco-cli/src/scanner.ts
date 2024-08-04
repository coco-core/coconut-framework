/**
 * 递归所有ioc组件，并注册到ioc容器中
 */
import * as fs from "fs";
import * as path from "path";
import Paths from "./paths";

function scanFolder (folderPath: string, fileExt: string, annotation: string) {
  const result = [];
  const files = fs.readdirSync(folderPath);
  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      const find = this.scanFolder(filePath, fileExt, annotation);
      if (find.length) {
        result.push(...find);
      }
    } else if (stat.isFile() && path.extname(filePath) === fileExt) {
      const content = fs.readFileSync(filePath, "utf-8");
      if (content.includes(annotation) && content.includes("export default")) {
        // todo 需要校验export出来的class名称和注解的是否一致
        result.push(filePath);
      }
    }
  }
  return result;
}
export const scan = (paths: Paths) => {
  return [
    {
      type: "controller",
      folderPath: paths.controllerFolder,
      fileExt: '.js',
      annotation: "@controller",
    },
    {
      type: "service",
      folderPath: paths.serviceFolder,
      fileExt: '.js',
      annotation: "@service",
    },
    {
      type: "page",
      folderPath: paths.pageFolder,
      fileExt: '.jsx',
      annotation: "@component",
    },
  ].reduce((prev, curr) => {
    prev[curr.type] = scanFolder(curr.folderPath, curr.fileExt, curr.annotation);
    return prev;
  }, {})
}