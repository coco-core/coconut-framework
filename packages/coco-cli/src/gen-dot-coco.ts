/**
 * 构建.coco文件夹
 */
import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import Paths from './paths';
import { scan, scanPathConfig, doScanFile, type ScanResult } from './scanner';
import * as process from 'node:process';
import chokidar from 'chokidar';
import genConfig from './config';

// 已经正确导出的类
let exportedInDotCoco: ScanResult = [];

export function genDotCoco(
  projectPath: string = '',
  isUpdate: boolean = false,
  cmd: string
) {
  const appTsFile = 'application.ts';
  const appFilePath = path.join(process.cwd(), projectPath, `src/${appTsFile}`);
  if (!fs.existsSync(appFilePath)) {
    throw new Error(`${projectPath}下没有${appTsFile}文件，忘记添加了？`);
  }
  if (!isUpdate) {
    clean(projectPath);
  }
  const paths = new Paths(path.join(projectPath));
  // 1. 扫描所有ioc组件
  const iocComponents = scan(paths);
  // 2. 生成.coco文件
  const importStatements = iocComponents.map(({ className, filePath }) => {
    const relativePath = path.relative(
      path.join(projectPath, 'src/.coco'),
      filePath
    );
    const extLen = path.extname(relativePath).length;
    const relativePathNoExt = relativePath.slice(
      0,
      relativePath.length - extLen
    );
    return `export { default as ${className} } from '${relativePathNoExt}';`;
  });
  const dotCocoDir = paths.genFullPath(Paths.DOT_COCO_DIR);
  fse.ensureDirSync(dotCocoDir);
  fs.writeFileSync(
    path.join(dotCocoDir, 'index.tsx'),
    appendExport(importStatements),
    { encoding: 'utf-8' }
  );

  genConfig(projectPath, cmd);

  exportedInDotCoco = [...iocComponents];
}

function appendExport(importStatements: string[]) {
  const pre = ``;

  const append = `
import { ApplicationContext } from "coco-mvc";
import applicationJson from "./application.json";
export { ApplicationContext };

${
  process.env.NODE_ENV === 'test'
    ? `// 测试时由测试用例启动ApplicationContext`
    : `new ApplicationContext(applicationJson)`
}
  `;
  return pre.concat(importStatements.join('\n')).concat(append);
}

const isTsTsxFile = (path: string) =>
  path.endsWith('.ts') || path.endsWith('.tsx');

const handleAddFile = (paths: Paths, projectPath: string, filePath: string) => {
  if (isTsTsxFile(filePath)) {
    const { dir, ext } = path.parse(filePath);
    const match = scanPathConfig.find((item) => {
      return dir.startsWith(item.path) && item.fileExt === ext;
    });
    if (!match) {
      return;
    }
    const scanRlt = doScanFile(paths.genFullPath(filePath), match.decorator);
    if (scanRlt !== null) {
      const { className } = scanRlt;
      if (!exportedInDotCoco.find((i) => i.className === className)) {
        genDotCoco(projectPath, true, 'dev');
      } else {
        // ignore
      }
    }
  }
};
const handleDeleteFile = (
  paths: Paths,
  projectPath: string,
  filePath: string
) => {
  if (isTsTsxFile(filePath)) {
    const fullPath = paths.genFullPath(filePath);
    const index = exportedInDotCoco.findIndex((i) => i.filePath === fullPath);
    if (index > 0) {
      exportedInDotCoco.splice(index, 1);
      genDotCoco(projectPath, true, 'dev');
    }
  }
};

export function watch(projectPath: string = './') {
  const paths = new Paths(path.join(projectPath));
  const projSrc = path.join(process.cwd(), projectPath, `src`);
  const watcher = chokidar.watch(projSrc, {
    ignored: (absPath, stats) => {
      // 忽略.coco文件夹
      const srcPath = path.relative(projSrc, absPath);
      return srcPath.startsWith('.coco');
    },
    ignoreInitial: true,
    cwd: projSrc,
  });
  watcher.on('add', handleAddFile.bind(null, paths, projectPath));
  watcher.on('change', handleAddFile.bind(null, paths, projectPath));
  watcher.on('unlink', handleDeleteFile.bind(null, paths, projectPath));

  return watcher;
}

export function clean(projectPath: string) {
  const cocoFolder = path.join(projectPath, 'src/.coco');
  if (fs.existsSync(cocoFolder)) {
    fs.rmSync(cocoFolder, { recursive: true });
  }
}
