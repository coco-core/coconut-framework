import typescript from '@rollup/plugin-typescript';
import alias from "@rollup/plugin-alias";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    input: './src/index.ts',
    output: {
      file: './dist/coconut.cjs.js',
      format: 'cjs',
    },
    plugins: [
      typescript(),
      alias({entries: [
          { find: 'coconut-reconciler', replacement: path.join(__dirname, '../coconut-reconciler/src/index.js') },
          { find: 'coconut-web', replacement: path.join(__dirname, '../coconut-web/src/index.js') },
          { find: 'shared', replacement: path.join(__dirname, '../shared') },
          { find: 'ReactFiberHostConfig', replacement: path.join(__dirname, '../coconut-web/src/ReactDomHostConfig.js') }
        ]
      }),
    ],
  }, {
    input: './src/jsx-runtime/index.ts',
    output: {
      file: './dist/jsx-runtime.cjs.js',
      format: 'cjs',
    },
    plugins: [typescript()],
  }];