const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const json = require('./config/config.json');

const config = {
  mode: 'production',
  entry: './src/.coco/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: false,
              compilerOptions: {
                verbatimModuleSyntax: true, // todo 删除
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('tailwindcss'), require('autoprefixer')],
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, json.target),
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, json.target),
    },
    compress: true,
    historyApiFallback: true,
    port: 8000,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: `
<!DOCTYPE html>
<html lang="en">
<body>
  <div id="root"></div>
</body>
</html>
  `,
    }),
  ],
};

module.exports = config;
