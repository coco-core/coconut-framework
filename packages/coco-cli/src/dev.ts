import process from 'node:process';
import { execSync, spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { genDotCoco, watch } from './gen-dot-coco';
import { validateConstructor } from './validate-constructor';

const webpack = (isDev: boolean) => {
  const cwd = process.cwd();
  if (!fs.existsSync(path.join(cwd, './package.json'))) {
    throw new Error('当前似乎不是在一个项目中');
  }
  genDotCoco('');

  const args = isDev
    ? ['serve', '--config', 'webpack.config.js']
    : ['--config', 'webpack.config.js'];
  return spawn('webpack', args, {
    cwd: process.cwd(),
    stdio: 'inherit',
  });
};

export const dev = () => {
  // todo 添加watch
  validateConstructor('');
  const webpackProcess = webpack(true);
  watch('');
  process.on('uncaughtException', () => {
    webpackProcess.kill('SIGINT'); // 显式杀死子进程
  });
};
export const build = () => {
  validateConstructor('');
  webpack(false);
};
