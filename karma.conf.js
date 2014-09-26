'use strict';

module.exports = function (config) {
  
  config.set({

    basePath: '',

    frameworks: ['mocha', 'expect'],

    files: [
      './vendor/phantomjs-shim.js',
      './vendor/sinon-1.10.3.js',
      'test/*.js', 'test/*.jsx'
    ],

    reporters: ['progress'],

    port: 9876,
    colors: true,
    autoWatch: true,
    singleRun: false,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    browsers: ['PhantomJS'],

    preprocessors: {
      'test/*': ['webpack']
    },

    webpack: require('./tasks/webpack.configs').test,
    webpackServer: {
      noInfo: true
    },

    plugins: [
      require("karma-phantomjs-launcher"),
      require("karma-webpack"),
      require("karma-mocha"),
      require("karma-expect"),
    ]
  });
};