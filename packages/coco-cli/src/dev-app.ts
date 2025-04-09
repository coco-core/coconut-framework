import { fork, spawn } from 'child_process';
import * as path from 'path';
import { resolveFromProject } from './util/resolve';

const startWebpackDevServer = () => {
  const devServer = resolveFromProject('webpack-dev-server');
  const webpackConfigPath = path.resolve(
    __dirname,
    '../build-config/webpack.config.js'
  );
  return spawn('node', [devServer, '--config', webpackConfigPath], {
    cwd: process.cwd(),
    stdio: 'inherit',
  });
};

async function devApp() {
  const watchProcess = fork(path.join(__dirname, './prepare-build'), ['watch']);
  let webpackDevProcess;
  watchProcess.on('message', (msg) => {
    switch (msg) {
      case 'prepare-success': {
        console.info('prepare-success');
        webpackDevProcess = startWebpackDevServer();
        break;
      }
      default: {
        console.info(msg);
        break;
      }
    }
  });
  watchProcess.on('exit', (code) => {});
  process.on('exit', () => {
    if (watchProcess) {
      watchProcess.kill('SIGINT');
    }
    if (webpackDevProcess) {
      webpackDevProcess.kill('SIGINT'); // 显式杀死子进程
    }
  });
  process.on('uncaughtException', () => {
    if (watchProcess) {
      watchProcess.kill('SIGINT');
    }
    if (webpackDevProcess) {
      webpackDevProcess.kill('SIGINT'); // 显式杀死子进程
    }
  });

  watchProcess.send('start');
}

export default devApp;
