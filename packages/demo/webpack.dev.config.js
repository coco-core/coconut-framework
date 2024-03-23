const path = require('path');
const baseConfig = require('./webpack.base.config');

module.exports = {
  mode: 'development',
  watch: true,
  ...baseConfig
};