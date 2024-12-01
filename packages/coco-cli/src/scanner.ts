/**
 * 递归所有ioc组件，并注册到ioc容器中
 */
import * as fs from 'fs';
import * as path from 'path';
import Paths from './paths';

enum PATH_TYPE {
  FOLDER,
  FILE,
}
const RE_DEFAULT_EXPORT = /export\s+default\s+(\w+);?\s?/;

type ScanResult = { className: string; filePath: string }[];

function doScanFile(filePath: string, decorator: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  if (content.includes(decorator) && RE_DEFAULT_EXPORT.test(content)) {
    // todo 需要校验export出来的class名称和注解的是否一致
    const className = RE_DEFAULT_EXPORT.exec(content)[1];
    return { className, filePath };
  }
  return null;
}

function doScan(
  type: PATH_TYPE,
  _path: string,
  fileExt: string,
  decorator: string
) {
  const result: ScanResult = [];
  if (!fs.existsSync(_path)) {
    return result;
  }
  if (type === PATH_TYPE.FOLDER) {
    const files = fs.readdirSync(_path);
    for (const file of files) {
      const filePath = path.join(_path, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        const find = doScan(PATH_TYPE.FOLDER, filePath, fileExt, decorator);
        if (find.length) {
          result.push(...find);
        }
      } else if (stat.isFile() && path.extname(filePath) === fileExt) {
        const r = doScanFile(filePath, decorator);
        if (r) {
          result.push(r);
        }
      }
    }
  } else if (type === PATH_TYPE.FILE) {
    const r = doScanFile(_path, decorator);
    if (r) {
      result.push(r);
    }
  }
  return result;
}

export const scan = (paths: Paths): ScanResult => {
  return [
    {
      // 配置项
      type: PATH_TYPE.FOLDER,
      path: paths.configFolder,
      fileExt: '.ts',
      decorator: '@configuration',
    },
    {
      // 控制器
      type: PATH_TYPE.FOLDER,
      path: paths.controllerFolder,
      fileExt: '.ts',
      decorator: '@controller',
    },
    {
      // 通用组件
      type: PATH_TYPE.FOLDER,
      path: paths.componentFolder,
      fileExt: '.ts',
      decorator: '@component',
    },
    {
      // 服务
      type: PATH_TYPE.FOLDER,
      path: paths.serviceFolder,
      fileExt: '.ts',
      decorator: '@service',
    },
    {
      // 视图
      type: PATH_TYPE.FOLDER,
      path: paths.viewFolder,
      fileExt: '.tsx',
      decorator: '@view',
    },
    {
      // 全局数据
      type: PATH_TYPE.FOLDER,
      path: paths.globalDataFolder,
      fileExt: '.ts',
      decorator: '@globalData',
    },
    {
      // 全局状态
      type: PATH_TYPE.FOLDER,
      path: paths.storeFolder,
      fileExt: '.ts',
      decorator: '@store',
    },
    {
      // 入口文件
      type: PATH_TYPE.FILE,
      path: paths.applicationFile,
      fileExt: '.ts',
      decorator: '@webApplication',
    },
  ].reduce((prev, curr) => {
    prev.push(...doScan(curr.type, curr.path, curr.fileExt, curr.decorator));
    return prev;
  }, []);
};
