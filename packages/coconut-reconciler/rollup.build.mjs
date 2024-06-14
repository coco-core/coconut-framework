import alias from '@rollup/plugin-alias';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    input: './src/index.js',
    output: {
      file: './dist/coconut-reconcile.cjs.js',
      format: 'cjs',
    },
    plugins: [
      alias({entries: [
          { find: 'ReactFiberHostConfig', replacement: path.join(__dirname, '../coconut-web/src/ReactDomHostConfig.js') }
        ]
      }),
    ]
  }];