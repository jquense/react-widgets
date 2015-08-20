'use strict';
//var fs = require('fs');

module.exports = function(config) {

  // Use ENV vars on Travis and sauce.json locally to get credentials
  if (!process.env.SAUCE_USERNAME) {
    throw new Error('Missing Username and Access Key env variables')
  }

  // Browsers to run on Sauce Labs
  var customLaunchers = {
    SL_ie_8: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows XP',
      version: '8'
    },

    // SL_ie_9: {
    //   base: 'SauceLabs',
    //   browserName: 'internet explorer',
    //   platform: 'Windows 7',
    //   version: '9'
    // },
    // SL_ie_10: {
    //   base: 'SauceLabs',
    //   browserName: 'internet explorer',
    //   version: '10'
    // },
    // SL_chrome: {
    //   base: 'SauceLabs',
    //   browserName: 'chrome'
    // },
    // SL_firefox: {
    //   base: 'SauceLabs',
    //   browserName: 'firefox'
    // },
    // sl_ios_safari: {
    //   base: 'SauceLabs',
    //   browserName: 'iphone',
    //   platform: 'OS X 10.9',
    //   version: '7.1'
    // },
  };

  config.set({

    basePath: '',
    frameworks: ['mocha', 'expect'],

    files: [
      './vendor/es5-shim.min.js',
      './vendor/es5-sham.min.js',
      './vendor/html5shiv.min.js',
      './vendor/phantomjs-shim.js',
      './vendor/sinon-1.10.3.js',
      './vendor/jquery-1.11.2.min.js',
      '_test-bootstrap.js'
    ],

    reporters: ['mocha','saucelabs'],

    port: 9876,
    colors: true,
    sauceLabs: {
      testName: 'Karma and Sauce Labs demo'
    },

    captureTimeout: 120000,

    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),

    logLevel: config.LOG_INFO,

    preprocessors: {
      '_test-bootstrap.js': ['webpack']
    },

    webpack: require('./webpack.configs').test,
    webpackServer: {
      noInfo: true
    },

    client: {
      mocha: {
        timeout: 4000
      }
    },

    plugins: [
      require("karma-mocha-reporter"),
      require("karma-sauce-launcher"),
      require("karma-webpack"),
      require("karma-mocha"),
      require("karma-expect"),
    ]

  });
};