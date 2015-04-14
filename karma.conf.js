'use strict';

module.exports = function (config) {
  
  
  //console.log(process.env.TRAVIS_CI)

  config.set({

    basePath: '',

    frameworks: ['mocha', 'expect'],

    files: [
      './vendor/phantomjs-shim.js',
      './vendor/sinon-1.10.3.js',
      './vendor/jquery-1.11.2.min.js',
      '_test-bootstrap.js',
    ],

    reporters: ['mocha'],

    port: 9876,
    colors: true,
    autoWatch: process.env.TRAVIS_CI ? false : true,
    singleRun: process.env.TRAVIS_CI ? true : false,

    logLevel: config.LOG_INFO,

    browsers: [ 'PhantomJS'],

    preprocessors: {
      '_test-bootstrap.js': ['webpack', 'sourcemap']
    },

    webpack: require('./webpack.configs').test,
    webpackServer: {
      noInfo: true
    }
  });
};