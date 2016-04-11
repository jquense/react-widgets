var webpack = require('webpack')
var path = require('path')
var makeConfig = require('./make-config')
var args = require('yargs').argv;

module.exports = makeConfig({

    minimize: args.production,

    devtool: args.production ? null : 'source-map',
    //hot: !args.production,

    entry:  {
      app: path.join(__dirname, '../docs/components/Docs.jsx'),
      vendor: ['react', 'react-dom', 'globalize']
    },

    output: {
      path: path.join(__dirname, '../docs/public'),
      filename: 'docs.js',
      publicPath: '/docs/public'
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
    ],

    loaders: [
      { test: /\.json$/, loader: 'json' },
      { test: /\.raw$/, loader: 'raw' },
      { test: /\.api\.md$/, loader: 'babel-loader!' + path.join(__dirname, '../docs/vendor/apiLoader') },
      { test: /.md$/, loader: 'babel-loader!' + path.join(__dirname, '../docs/vendor/mdLoader'), exclude: /\.api\.md$/ }
    ]
  })
