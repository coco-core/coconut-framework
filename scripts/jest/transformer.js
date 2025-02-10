const ts = require('typescript');
const babelJest = require('babel-jest').default;

module.exports = {
  process(src, filename, transformOptions) {
    if (filename.endsWith('.ts') || filename.endsWith('.tsx')) {
      const { outputText } = ts.transpileModule(src, {
        compilerOptions: {
          target: 'ESNext',
          lib: ['dom'],
          module: 'ESNext',
          moduleResolution: 'node',
          allowSyntheticDefaultImports: true,
          verbatimModuleSyntax: true, // todo 22 删除
          jsx: 'preserve',
          resolveJsonModule: true,
          plugins: [{ transform: '@cocojs/typescript-transformer' }],
        },
        fileName: filename,
      });

      const transformer = babelJest.createTransformer({
        presets: ['@babel/preset-env', '@babel/preset-typescript'],
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
