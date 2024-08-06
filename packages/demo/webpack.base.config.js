const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { InjectBodyPlugin } = require("inject-body-webpack-plugin");

module.exports = {
  entry: './src/.coco/index.jsx',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          { loader: 'babel-loader' }
        ],
        exclude: /node_module/
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: `
    <html>
    <head><meta charset="UTF-8"></head>
      <body>
        <div id="root"></div>
      </body>
    </html>
  `
    })
  ],
};