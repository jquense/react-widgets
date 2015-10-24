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
    autoWatch: process.env.TRAVIS_CI ? false : true,
    singleRun: process.env.TRAVIS_CI ? true : false,

    logLevel: config.LOG_INFO,

    browsers: ['Chrome'],

    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap']
    },

    webpack: require('./build/test.config'),
    webpackServer: {
      noInfo: true
    }
  });
};
