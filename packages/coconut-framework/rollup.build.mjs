import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: './src/index.ts',
    output: {
      file: './dist/coconut-framework.cjs.js',
      format: 'cjs',
    },
    plugins: [typescript()],
  }, {
    input: './src/jsx-runtime/index.ts',
    output: {
      file: './dist/jsx-runtime.cjs.js',
      format: 'cjs',
    },
    plugins: [typescript()],
  }];