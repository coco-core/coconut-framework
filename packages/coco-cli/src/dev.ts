import process from 'node:process';
import { execSync, spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { genDotCoco, watch } from './gen-dot-coco';
import { validateConstructor } from './validate-constructor';
import { resolveFromProject } from './util/resolve';

const webpack = (isDev: boolean) => {
  const cwd = process.cwd();
  if (!fs.existsSync(path.join(cwd, './package.json'))) {
    throw new Error('当前似乎不是在一个项目中');
  }
  genDotCoco('');

  const webpack = resolveFromProject('webpack');
  const webpackDevServer = resolveFromProject('webpack-dev-server');
  const webpackConfigPath = path.resolve(
    __dirname,
    '../build-config/webpack.config.js'
  );
  const args = isDev
    ? [webpackDevServer, '--config', webpackConfigPath]
    : [webpack, '--config', webpackConfigPath];
  return spawn('node', args, {
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
