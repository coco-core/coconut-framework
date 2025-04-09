import * as path from 'path';
import webpack from 'webpack';
import { fork } from 'child_process';

const runWebpack = async () => {
  const { default: config } = await import(
    path.resolve(__dirname, '../build-config/webpack.config.js')
  );
  return webpack(config, (err, stats) => {
    console.log(
      stats.toString({
        chunks: false, // 使构建过程更静默无输出
        colors: true, // 在控制台展示颜色
      })
    );
  });
};

async function prepare() {
  return new Promise(function (resolve, reject) {
    const prepareProcess = fork(path.join(__dirname, './prepare-build'));
    prepareProcess.on('exit', (code) => {
      resolve(true);
    });
  });
}

async function buildApp() {
  await prepare();
  await runWebpack();
}

export default buildApp;
