import typescript from '@rollup/plugin-typescript'

export default {
  input: './test-demo/index.ts',
  output: {
    file: './test-demo/bundle.js',
    format: 'cjs'
  },
  plugins: [typescript()]
};