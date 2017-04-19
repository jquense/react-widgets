var path = require('path')
var appConfig = require('../../tools/app-config');

module.exports = function (config) {

  config.set({

    basePath: '',

    frameworks: ['mocha', 'expect', 'sinon'],

    files: [
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

    webpack: appConfig(__dirname, {
      entry: './test/index.js',
      module: {
        loaders: [
          {
            test: /sinon-chai/,
            loader: 'imports-loader?define=>false'
          }
        ]
      },
      resolve: {
        alias: {
          'react-widgets/lib': path.resolve(__dirname, './src'),
        }
      },
      stats: 'minimal',
    }),

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
