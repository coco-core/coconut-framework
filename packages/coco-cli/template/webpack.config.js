const path = require('path');

const config = {
  mode: 'development',
  entry: './src/.coco/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
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
            },
          },
        ],
        exclude: /node_module/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

module.exports = config;
