/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var loaders = require('./loaders');
var plugins = require('./plugins');
var resolve = require('./resolve');

module.exports = {
  bail: true,
  entry: './src/index.js',
  output: {
    path: __dirname + '/../dist',
    libraryTarget: 'umd',
    library: 'ReactFlex',
    filename: 'index.js'
  },
  plugins: plugins,
  module: {
    loaders: loaders
  },
  resolve: resolve
};
