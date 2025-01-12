import process from 'node:process';
import { execSync, spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { genDotCoco, watch } from './gen-dot-coco';

const webpack = (isDev: boolean) => {
  const cwd = process.cwd();
  if (!fs.existsSync(path.join(cwd, './package.json'))) {
    throw new Error('当前似乎不是在一个项目中');
  }
  genDotCoco('');

  const args = isDev
    ? ['serve', '--config', 'webpack.config.js']
    : ['--config', 'webpack.config.js'];
  const webpackDevServer = spawn('webpack', args, {
    cwd: process.cwd(),
    stdio: 'inherit',
  });

  if (isDev) {
    watch('');
    process.on('uncaughtException', () => {
      webpackDevServer.kill('SIGINT'); // 显式杀死子进程
    });
  }
};

export const dev = () => {
  webpack(true);
};
export const build = () => {
  webpack(false);
};
