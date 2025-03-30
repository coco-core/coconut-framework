/**
 * 扫描获取所有ioc组件
 */
import * as fs from 'fs';
import * as path from 'path';
import Paths from './paths';

enum PATH_TYPE {
  FOLDER,
  FILE,
}
const RE_DEFAULT_EXPORT = /export\s+default\s+(\w+);?\s?/;

export type ScanResult = { className: string; filePath: string }[];

export function doScanFile(filePath: string, decorator: string) {
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

export const scanPathConfig = [
  {
    // 配置项
    type: PATH_TYPE.FOLDER,
    path: Paths.CONFIG_DIR,
    fileExt: '.ts',
    decorator: '@configuration',
  },
  {
    // 布局
    type: PATH_TYPE.FOLDER,
    path: Paths.LAYOUT_DIR,
    fileExt: '.tsx',
    decorator: '@layout',
  },
  {
    // 页面
    type: PATH_TYPE.FOLDER,
    path: Paths.PAGE_DIR,
    fileExt: '.tsx',
    decorator: '@page',
  },
  {
    // 控制器
    type: PATH_TYPE.FOLDER,
    path: Paths.CONTROLLER_DIR,
    fileExt: '.ts',
    decorator: '@controller',
  },
  {
    // 通用组件
    type: PATH_TYPE.FOLDER,
    path: Paths.COMPONENTS_DIR,
    fileExt: '.ts',
    decorator: '@component',
  },
  {
    // 服务
    type: PATH_TYPE.FOLDER,
    path: Paths.SERVICE_DIR,
    fileExt: '.ts',
    decorator: '@service',
  },
  {
    // 视图
    type: PATH_TYPE.FOLDER,
    path: Paths.VIEW_DIR,
    fileExt: '.tsx',
    decorator: '@view',
  },
  {
    // 全局数据
    type: PATH_TYPE.FOLDER,
    path: Paths.GLOBAL_DATA_DIR,
    fileExt: '.ts',
    decorator: '@globalData',
  },
  {
    // 全局状态
    type: PATH_TYPE.FOLDER,
    path: Paths.STORE_DIR,
    fileExt: '.ts',
    decorator: '@store',
  },
  {
    // 入口文件
    type: PATH_TYPE.FILE,
    path: Paths.APPLICATION,
    fileExt: '.ts',
    decorator: '@webApplication',
  },
];

export const scan = (paths: Paths): ScanResult => {
  return scanPathConfig.reduce((prev, curr) => {
    prev.push(
      ...doScan(
        curr.type,
        paths.genFullPath(curr.path),
        curr.fileExt,
        curr.decorator
      )
    );
    return prev;
  }, []);
};
