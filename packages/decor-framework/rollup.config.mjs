import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/demo.ts',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [typescript()]
};