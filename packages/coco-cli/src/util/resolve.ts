import path from 'node:path';
import fs from 'node:fs';

/**
 * 在项目开发中，应该从项目的node_modules/.bin/下找到命令对应的脚本
 * 但在使用npm link的时候，项目下的node_modules/.bin/下就没有rollup webpack-dev-server了
 * 那么现在的做法是全部从当前文件向上开始找
 */
export function resolveCli(cliName: string) {
  let dir = __dirname;
  while (dir !== path.dirname(dir)) {
    const binPath = path.join(dir, 'node_modules', '.bin', cliName);
    if (fs.existsSync(binPath)) return binPath;
    dir = path.dirname(dir); // 继续往上找
  }
  throw new Error(`Unable to resolve binary for ${cliName}`);
}
