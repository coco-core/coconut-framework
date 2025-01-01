import * as process from 'process';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { genDotCoco } from './gen-dot-coco';

const webpack = (isDev: boolean) => {
  const cwd = process.cwd();
  if (!fs.existsSync(path.join(cwd, './package.json'))) {
    throw new Error('当前似乎不是在一个项目中');
  }
  genDotCoco();

  const cmd = isDev
    ? 'webpack serve --config webpack.config.js'
    : 'webpack --config webpack.config.js';
  execSync(cmd, { cwd, stdio: 'inherit' });
};

export const dev = () => {
  webpack(true);
};
export const build = () => {
  webpack(false);
};
