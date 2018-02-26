var path = require('path');

var webpack = require('karma-webpack');
var webpackConfig = require('./build/dev.config');

webpackConfig.module.loaders = webpackConfig.module.loaders.concat([
  {
    test: /\.json$/,
    loader: 'json-loader'
  }
]);

webpackConfig.externals = Object.assign({}, webpackConfig.externals, {
  'cheerio': 'window',
  'react/addons': true,
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true
});

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'sinon-chai'],
    files: [
      'test/**/*.spec.js'
    ],

    // add webpack as preprocessor
    preprocessors: {
      'src/**/*.js': ['webpack'],
      'test/**/*.js': ['webpack']
    },

    webpack: webpackConfig,
    webpackMiddleware: { noInfo: true },

    plugins: [
      webpack,
      'karma-mocha',
      'karma-sinon-chai',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-spec-reporter'
    ],

    reporters: [ 'spec', 'coverage' ],
    coverageReporter: {
      dir: 'build/coverage',
      reporters: [
        { type: 'html', subdir: 'report' },
        { type: 'text' }
      ]
    },

    client: {
      chai: {
        includeStack: true
      }
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  })
};
