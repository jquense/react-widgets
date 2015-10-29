'use strict';
var Server = require('karma').Server
  , webpack = require('webpack')
  , webpackConfig = require('../build/test.config');

var plugins = webpackConfig.plugins || [];

webpackConfig.externals = {
  'react': 'window.React',
  'react-dom': 'window.React',
  'react/addons': 'window.React',
  'react-dom/server': 'window.React'
}


var SUPPORTED_VERSIONS = ['0.14.0-rc'];


series(SUPPORTED_VERSIONS, function(version, idx, next){
  console.log('-------------------------------------------');
  console.log('------- Testing React version: ' + version );
  console.log('-------------------------------------------');

  var server = new Server(config(version), function(exitCode) {
    if ( exitCode )
      process.exit(exitCode) //eslint-disable-line

    next();
  });


  server.start();
})

function config(version){

  webpackConfig.plugins = plugins.concat(
    new webpack.DefinePlugin({
      '__REACT_VERSION__': JSON.stringify(version)
    })
  )

  return {

    basePath: '',

    frameworks: ['mocha', 'expect'],

    files: [
      './vendor/phantomjs-shim.js',
      'https://cdnjs.cloudflare.com/ajax/libs/react/' + version + '/react-with-addons.js',
      './vendor/sinon-1.10.3.js',
      './vendor/jquery-1.11.2.min.js',
      './test/index.js'
    ],

    reporters: ['mocha'],

    port: 9876,
    colors: true,
    autoWatch: false,
    singleRun: true,

    logLevel: 'INFO',

    browsers: ['PhantomJS'],

    preprocessors: {
      'test/index.js': ['webpack']
    },

    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  }
}


function series(versions, iter, cb){

  (function next(idx){
    if( idx === versions.length)
      return cb && cb()

    iter(versions[idx], idx, next.bind(null, idx + 1))

  })(0)
}
