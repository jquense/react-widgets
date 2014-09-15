'use strict';

module.exports = function (config) {
  
  config.set({

    basePath: '',

    frameworks: ['mocha', 'expect'],

    files: [
      'test/*.js'
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
      'test/*.js': ['webpack']
    },

    webpack: require('./tasks/webpack.configs').test,

    plugins: [
        require("karma-webpack"),
        require("karma-mocha"),
        require("karma-expect"),
    ]
  });
};