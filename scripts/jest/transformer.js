const ts = require('typescript');
const babelJest = require('babel-jest').default;

module.exports = {
  process(src, filename, transformOptions) {
    if (filename.endsWith('.ts') || filename.endsWith('.tsx')) {
      const { outputText } = ts.transpileModule(src, {
        compilerOptions: {
          target: 'es2015',
          lib: ['dom'],
          module: 'ESNext',
          moduleResolution: 'node',
          allowSyntheticDefaultImports: true,
          jsx: 'preserve',
          resolveJsonModule: true,
          plugins: [
            {
              transform: '@cocojs/typescript-transformer',
              transformProgram: true,
            },
          ],
        },
        fileName: filename,
      });

      const transformer = babelJest.createTransformer({
        presets: [['@babel/preset-env']],
        plugins: [
          ['@babel/plugin-proposal-decorators', { version: '2023-11' }],
          [
            '@babel/plugin-transform-react-jsx',
            {
              runtime: 'automatic',
              importSource: 'coco-mvc',
            },
          ],
        ],
      });
      return transformer.process(outputText, filename, transformOptions);
    }
    return { code: src };
  },
};
