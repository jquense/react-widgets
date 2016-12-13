var merge = require('webpack-merge');
var webpack = require('webpack');

module.exports = function (config) {
  return merge({}, config, {
    devtool: 'source-map',

    output: {
      libraryTarget: 'var'
    },
    module: {
      loaders: [
        { test: /\.json$/, loader: 'json-loader' },
        { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
        { test: /\.js$/, loader: 'imports-loader?define=>false' },
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.BannerPlugin(
        '(c) 2014 - present: Jason Quense | https://github.com/jquense/react-widgets/blob/master/LICENSE.md',
        { entryOnly : true }
      )
    ],
    externals: {
      'react': 'window.React',
      'react-widgets/lib/configure': 'window.ReactWidgets',
    },
    node: {
      Buffer: false
    },
  })
}
