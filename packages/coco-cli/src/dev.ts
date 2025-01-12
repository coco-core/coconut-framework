import * as process from 'process';
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
    const watcher = watch('');
    watcher.on('close', () => {
      console.log('[Chokidar] Exiting...');
      // 当 chokidar 退出时，终止 webpack-dev-server
      webpackDevServer.kill('SIGINT'); // 发送 SIGINT 信号来通知 webpack-dev-server 退出
    });
    // todo 当chokidar意外退出时也需要结束webpackDevServer
  }
};

export const dev = () => {
  webpack(true);
};
export const build = () => {
  webpack(false);
};
