const path = require('node:path');
const babel = require('@rollup/plugin-babel');
const typescript = require('@rollup/plugin-typescript');
const postcss = require('rollup-plugin-postcss');
const tailwindcss = require('tailwindcss');

const config = {
  input: path.join(process.cwd(), './src/lib.ts'),
  output: {
    file: path.join(process.cwd(), './dist/bundle.esm.js'),
    format: 'es',
  },
  plugins: [
    typescript({
      compilerOptions: {
        target: 'ESNext',
        lib: ['dom'],
        declaration: true,
        declarationDir: './dist/types',
        jsx: 'preserve',
        resolveJsonModule: true,
        plugins: [
          {
            transform: '@cocojs/typescript-transformer',
            transformProgram: true,
          },
        ],
      },
    }),
    babel({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      plugins: [
        [
          require.resolve('@babel/plugin-proposal-decorators'),
          { version: '2023-11' },
        ],
        [
          require.resolve('@babel/plugin-transform-react-jsx', {
            paths: [path.resolve(__dirname, '..', '../node_modules')],
          }),
          {
            runtime: 'automatic',
            importSource: 'coco-mvc',
          },
        ],
      ],
    }),
    postcss({
      plugins: [tailwindcss()],
      extract: true,
    }),
  ],
};

module.exports = config;
