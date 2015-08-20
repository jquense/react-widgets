'use strict';
var server = require('karma').server
  , webpack = require('webpack')
  , webpackConfig = require('./webpack.configs').test;

var plugins = webpackConfig.plugins || [];

webpackConfig.externals = {
  'react':  'window.React',
  'react/addons':  'window.React'
}


var SUPPORTED_VERSIONS = ["0.12.2", "0.13.0"];


series(SUPPORTED_VERSIONS, function(version, idx, next){
  console.log('-------------------------------------------');
  console.log('------- Testing React version: ' + version );
  console.log('-------------------------------------------');

  server.start(
      config(version)
    , function(exitCode) {
        if ( exitCode )
          process.exit(exitCode)

        next();
      });
}, function(){
  process.exit(0)
})

function config(version){

  webpackConfig.plugins = plugins.concat(
    new webpack.DefinePlugin({
      '__REACT_VERSION__': JSON.stringify(version),
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
      '_test-bootstrap.js'
    ],

    reporters: ['mocha'],

    port: 9876,
    colors: true,
    autoWatch: false,
    singleRun: true,

    logLevel: 'INFO',

    browsers: ['PhantomJS'],

    preprocessors: {
      '_test-bootstrap.js': ['webpack']
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
