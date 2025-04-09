/**
 * 构建.coco文件夹
 */
import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import Project from './project';
import type { ScanResult } from './scanner';
import * as process from 'node:process';

function genIndexTsx(project: Project, iocComponents: ScanResult) {
  // 2. 生成.coco文件
  const importStatements = iocComponents.map(({ className, filePath }) => {
    const relativePath = path.relative('src/.coco', filePath);
    const extLen = path.extname(relativePath).length;
    const relativePathNoExt = relativePath.slice(
      0,
      relativePath.length - extLen
    );
    return `export { default as ${className} } from '${relativePathNoExt}';`;
  });
  const dotCocoDir = project.genFullPath(Project.DOT_COCO_DIR);
  fse.ensureDirSync(dotCocoDir);
  fs.writeFileSync(
    path.join(dotCocoDir, 'index.tsx'),
    appendExport(importStatements),
    { encoding: 'utf-8' }
  );
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

export default genIndexTsx;
