var path = require('path')
  , makeConfig = require('./make-config');


var globalize = makeConfig({
  noCompile: true,
  banner: true,
  minimize: false,
  production: true,

  entry: 'imports-loader?module=../lib/localizers/globalize.js,args=>[Globalize]!./build/configure-shim.js',

  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'react-widgets-globalize.js'
  },

  externals: {
    '../configure': 'window.ReactWidgets',
    react: 'window.React'
  }
})


var moment = makeConfig({
  noCompile: true,
  banner: true,
  minimize: false,
  production: true,

  entry: 'imports-loader?module=../lib/localizers/moment.js,args=>[moment]!./build/configure-shim.js',

  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'react-widgets-moment.js'
  },

  externals: {
    '../configure': 'window.ReactWidgets',
    react: 'window.React'
  }
})


var simpleNumber = makeConfig({
  noCompile: true,
  banner: true,
  minimize: false,
  production: true,

  entry: 'imports-loader?module=../lib/localizers/simple-number.js,args=>[]!./build/configure-shim.js',

  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'react-widgets-simple-number.js'
  },

  externals: {
    '../configure': 'window.ReactWidgets',
    react: 'window.React'
  }
})

module.exports = [
  globalize,
  moment,
  simpleNumber
];
