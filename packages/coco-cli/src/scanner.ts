/**
 * 递归所有ioc组件，并注册到ioc容器中
 */
import * as fs from 'fs';
import * as path from 'path';
import Paths from './paths';

const RE_DEFAULT_EXPORT = /export\s+default\s+(\w+);?\s?/;

type ScanResult = { className: string; filePath: string }[];

function scanFolder(folderPath: string, fileExt: string, decorator: string) {
  const result: ScanResult = [];
  if (!fs.existsSync(folderPath)) {
    return result;
  }
  const files = fs.readdirSync(folderPath);
  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      const find = this.scanFolder(filePath, fileExt, decorator);
      if (find.length) {
        result.push(...find);
      }
    } else if (stat.isFile() && path.extname(filePath) === fileExt) {
      const content = fs.readFileSync(filePath, 'utf-8');
      if (content.includes(decorator) && RE_DEFAULT_EXPORT.test(content)) {
        // todo 需要校验export出来的class名称和注解的是否一致
        const className = RE_DEFAULT_EXPORT.exec(content)[1];
        result.push({ className, filePath });
      }
    }
  }
  return result;
}
export const scan = (paths: Paths): ScanResult => {
  return [
    {
      type: 'controller',
      folderPath: paths.controllerFolder,
      fileExt: '.js',
      decorator: '@controller',
    },
    {
      type: 'component',
      folderPath: paths.componentFolder,
      fileExt: '.ts',
      decorator: '@component',
    },
    {
      type: 'service',
      folderPath: paths.serviceFolder,
      fileExt: '.js',
      decorator: '@service',
    },
    {
      type: 'view',
      folderPath: paths.viewFolder,
      fileExt: '.tsx',
      decorator: '@view',
    },
  ].reduce((prev, curr) => {
    prev.push(...scanFolder(curr.folderPath, curr.fileExt, curr.decorator));
    return prev;
  }, []);
};
