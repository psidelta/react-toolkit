/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var loaders = require('./loaders');
var resolve = require('./resolve');

var moduleName = process.env.npm_config_module;
var devEntryPoint = './src/' + moduleName + '/examples/index.js';

module.exports = {
  entry: devEntryPoint,
  watch: true,
  watchOptions: { aggregateTimeout: 300, poll: 1000 },
  devtool: 'source-map',
  module: {
    loaders: loaders
  },
  resolve: resolve,
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    publicPath: '/assets',
    port: process.env.PORT || 9999,
    host: '0.0.0.0',
    historyApiFallback: true,
    disableHostCheck: true
  }
};
