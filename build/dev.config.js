/**
 * Copyright 2015-present Zippy Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
