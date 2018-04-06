/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var loaders = require('./loaders');
var resolve = require('./resolve');

module.exports = {
  bail: true,
  entry: {
    index: './index.scss'
  },
  output: {
    filename: 'index.css',
    path: '.'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!sass')
      }
    ]
  },
  resolve: resolve,
  plugins: [new ExtractTextPlugin('index.css')]
};
