import typescript from '@rollup/plugin-typescript';

export default {
  input: './src/index.ts',
  output: {
    file: './dist/decor-framework.cjs.js',
    format: 'cjs',
  },
  plugins: [typescript()],
};
