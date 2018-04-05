/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var assign = require('object-assign');

module.exports = assign({}, require('./build.config.js'), {
  bail: true,
  entry: './index.jsx',
  output: {
    filename: 'index.js'
  }
});
