var _ = require('lodash')
  , path = require('path')
  , webpack = require('webpack')
  , ProdDefine = new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify("production")
      }
    })

module.exports = {

  browser: {

    entry: './index.js',

    output: {
      path: path.join(__dirname, "./dist"),
      filename: 'react-widgets.js',
      library:  'ReactWidgets',
      libraryTarget: 'this'
    },

    externals: {
      '$':      'window.$',
      'lodash': 'window._',
      'globalize': 'window.Globalize',
      'react':  'window.React'
    },

    module: {
      loaders: [
        //{ test: /\.jsx$/, loader: 'jsx-loader?harmony=true&insertPragma=React.DOM' },
        //{ test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
      ],
    },
    plugins: [
      ProdDefine,
      //new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin()
    ],
  },

  dev: {

    devtool: 'source-map',
    entry: './example/example.jsx',
    output: {
      filename: "example.js",
      path: path.join(__dirname, "./example"),
      publicPath: "example/"
    },

    module: {
      loaders: [
        { test: /\.jsx$/,  loader: 'jsx-loader?harmony=true&insertPragma=React.DOM' },
        // { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
        // { test: /\.woff$/, loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
        // { test: /\.ttf$/,  loader: "file-loader?prefix=font/" },
        // { test: /\.eot$/,  loader: "file-loader?prefix=font/" },
        // { test: /\.svg$/,  loader: "file-loader?prefix=font/" },
      ],
    },
  },

  docs: {
    //devtool: 'source-map',
    entry: './docs/components/docs.jsx',
    
    output: {
      path: path.join(__dirname, "./docs/js"),
      filename: 'docs.js',
      publicPath: "docs/"
    },

    externals: {
      'react':  'window.React',
      'lodash': 'window._'
    },

    module: {
      loaders: [
        { test: /\.jsx$/, loader: 'jsx-loader?harmony=true&insertPragma=React.DOM' }
      ],
    },

    plugins: [
      ProdDefine,
      new webpack.optimize.UglifyJsPlugin()
    ],
  },
}