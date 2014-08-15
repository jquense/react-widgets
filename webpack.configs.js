var _ = require('lodash')
  , webpack = require('webpack')

module.exports = {

  browser: {

    entry: './index.js',

    output: {
      filename: 'react-widgets.js',
      library:  'react-widgets',
      libraryTarget: 'this'
    },

    externals: {
      '$':      'window.$',
      'lodash': 'window._',
      'react':  'window.React',
      'react/addons':  'window.React',
    },

    module: {
      loaders: [
        { test: /\.jsx$/, loader: 'jsx-loader?harmony=true&insertPragma=React.DOM' },
      ],
    },
  },

  dev: {

    devtool: 'source-map',
    entry: './example/example.jsx',
    output: {
      filename: "example.js"
    },

    externals: {
      "$": "$",
    },

    module: {
      loaders: [
        { test: /\.jsx$/, loader: 'jsx-loader?harmony=true&insertPragma=React.DOM' },
      ],
    },
  }

}