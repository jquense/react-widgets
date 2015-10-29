var path = require('path')
  , makeConfig = require('./make-config');

module.exports = makeConfig({

  noCompile: true,

  banner: true,

  minimize: false,

  entry: {
    'react-widgets': './lib/index.js',
    'react-widgets-globalize': './lib/localizers/globalize.js',
    'react-widgets-moment': './lib/localizers/moment.js',
    'react-widgets-simple-number': './lib/localizers/simple-number.js'
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    library:  'ReactWidgets',
    libraryTarget: 'umd'
  },

  externals: {
    '../configure': 'ReactWidgets',

    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom'
    },
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react'
    }
  }
})
