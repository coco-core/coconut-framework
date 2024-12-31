import * as process from 'process';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { genDotCoco } from './gen-dot-coco';

export const dev = () => {
  const cwd = process.cwd();
  if (!fs.existsSync(path.join(cwd, './package.json'))) {
    throw new Error('当前似乎不是在一个项目中');
  }
  genDotCoco();

  execSync('webpack --config webpack.config.js', { cwd, stdio: 'inherit' });
};
