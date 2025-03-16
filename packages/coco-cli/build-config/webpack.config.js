const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
// const json = require('./config/config.json');

const config = {
  mode: 'production',
  entry: path.join(process.cwd(), './src/.coco/index.tsx'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              extends: path.resolve(__dirname, 'babel.config.js'),
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: false,
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
                plugins: [
                  require('tailwindcss')({
                    config: path.resolve(__dirname, 'tailwind.config.js'),
                  }),
                  require('autoprefixer'),
                ],
              },
            },
          },
        ],
      },
    ],
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, '../node_modules'), 'node_modules'],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  output: {
    filename: 'main.js',
    path: path.join(process.cwd(), 'dist'),
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(process.cwd(), 'dist'),
    },
    compress: true,
    historyApiFallback: true,
    port: 9700,
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
