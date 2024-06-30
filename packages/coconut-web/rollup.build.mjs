import alias from '@rollup/plugin-alias';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    input: './src/index.js',
    output: {
      file: './dist/coconut-web.cjs.js',
      format: 'cjs',
    },
    plugins: [
      alias({entries: [
          { find: 'coconut-reconciler', replacement: path.join(__dirname, '../coconut-reconciler/src/index.js') },
          { find: 'ReactFiberHostConfig', replacement: path.join(__dirname, './src/ReactDomHostConfig.js') },
          { find: 'shared', replacement: path.join(__dirname, '../shared') },
        ]
      }),
    ]
  }];