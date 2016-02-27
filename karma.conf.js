'use strict';

module.exports = function (config) {

  config.set({

    basePath: '',

    frameworks: ['mocha', 'expect', 'sinon'],

    files: [
      './vendor/jquery-1.11.2.min.js',
      './test/index.js'
    ],

    reporters: ['mocha'],

    port: 9876,
    colors: true,
    autoWatch: process.env.TRAVIS ? false : true,
    singleRun: process.env.TRAVIS ? true : false,

    logLevel: config.LOG_INFO,

    browsers:  process.env.TRAVIS
      ? ['ChromeTravis']
      : ['Chrome'],

    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap']
    },

    webpack: require('./build/test.config'),
    webpackServer: {
      noInfo: true
    },

    customLaunchers: {
      ChromeTravis: {
          base: 'Chrome',
          flags: ['--no-sandbox']
      }
    }
  });
};
