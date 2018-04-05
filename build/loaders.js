/**
 * Copyright (c) 2015-present, Zippy Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
module.exports = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel'
  },
  {
    test: /\.scss$/,
    loader: 'style!css!autoprefixer!sass'
  },
  {
    test: /\.css$/,
    loader: 'style!css!autoprefixer'
  },
  {
    test: /\.json$/,
    loader: 'json-loader'
  },
  {
    test: /\.md$/,
    loader: 'raw-loader'
  },

  {
    test: /\.(png)$/,
    loader: 'url-loader'
    // ,
    // options: {
    //   name: 'fonts/[name].[ext]'
    // }
  },
  {
    test: /\.(ttf|eot|woff|woff2)$/,
    loader: 'file-loader',
    options: {
      name: 'fonts/[name].[ext]'
    }
  }
];

//
// {
//   test: /\.css$/,
//   loader: 'style-loader!css-loader!autoprefixer-loader'
// },
