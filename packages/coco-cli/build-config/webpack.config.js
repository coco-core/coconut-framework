const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('node:path');
const fs = require('node:fs');
const { merge } = require('webpack-merge');
const { getEnvConfigName } = require('./env');

function readWebpack(env) {
  const filename = env ? `config.${env}.js` : 'config.js';
  const filepath = path.resolve(process.cwd(), `config/${filename}`);
  if (!fs.existsSync(filepath)) {
    console.warn(`找不到配置文件：${filename}`);
    return {};
  }
  return require(filepath).webpack ?? {}; // Merging undefined is not supported
}

const baseConfig = readWebpack();
const env = getEnvConfigName();
const envConfig = env && readWebpack(env);

const buildInConfig = {
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
              context: process.cwd(),
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
    alias: {
      '@': path.resolve(process.cwd(), 'src/'),
    },
  },
  output: {
    publicPath: '/',
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

module.exports = merge(buildInConfig, baseConfig, envConfig);
