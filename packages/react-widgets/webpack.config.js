var path = require('path')
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    'react-widgets': './src/index.js'
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    library:  'ReactWidgets',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
    ]
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.BannerPlugin(
      '(c) 2014 - present: Jason Quense | https://github.com/jquense/react-widgets/blob/master/LICENSE.md',
      { entryOnly : true }
    )
  ],
  node: {
    Buffer: false,
  },
}
