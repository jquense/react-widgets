var path = require('path')
  , makeConfig = require('./make-config');

module.exports = makeConfig({
  noCompile: true,
  banner: true,
  minimize: false,
  production: true,

  entry: {
    'react-widgets-globalize': './lib/localizers/globalize.js',
    'react-widgets-moment': './lib/localizers/moment.js',
    'react-widgets-simple-number': './lib/localizers/simple-number.js'
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
  },

  externals: {
    '../configure': 'window.ReactWidgets',
    react: 'window.React'
  }
})
