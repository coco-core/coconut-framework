/**
 * 构建.coco文件夹
 */
import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import Paths from './paths';
import { scan } from './scanner';
import * as process from 'node:process';

export default function build(projectPath: string) {
  const pkg = path.join(process.cwd(), projectPath, 'package.json');
  if (!fs.existsSync(pkg)) {
    throw new Error(`${pkg}好像不是一个项目文件夹`);
  }
  clean(projectPath);
  const cwd = path.join(projectPath);
  const paths = new Paths(cwd);
  // 1. 扫描所有ioc组件
  const iocComponents = scan(paths);
  // 2. 生成.coco文件
  const importStatements = iocComponents.map((component) => {
    const defaultExport = path.basename(component, path.extname(component));
    const relative = path.relative(
      path.join(projectPath, 'src/.coco'),
      component
    );
    return `import ${defaultExport} from '${relative}';`;
  });
  fse.ensureDirSync(paths.dotCocoFolder);
  fs.writeFileSync(
    path.join(paths.dotCocoFolder, 'index.js'),
    appendExport(importStatements),
    { encoding: 'utf-8' }
  );
}

function appendExport(importStatements: string[]) {
  const pre = `
import { ApplicationContext } from "coco-mvc";
`;

  const append = `
export { ApplicationContext };
  `;
  return pre.concat(importStatements.join('\n')).concat(append);
}

export function clean(projectPath: string) {
  const cocoFolder = path.join(projectPath, 'src/.coco');
  if (fs.existsSync(cocoFolder)) {
    fs.rmSync(cocoFolder, { recursive: true });
  }
}
