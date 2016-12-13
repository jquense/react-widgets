var merge = require('webpack-merge');
var path = require('path')
var webpack = require('webpack');

var TARGET = process.env.NODE_ENV || 'development';
var PRODUCTION = TARGET === 'production';

console.log( // eslint-disable-line
  '---------------------\n' +
  '-- target: ' + TARGET + ' \n' +
  '---------------------\n'
);


var config = {
  cache: true,
  devtool: 'inline-module-source-map',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
    ]
  },
  node: {
    Buffer: false
  },
}

if (PRODUCTION) {
  config = merge(config, {
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
    externals: {
      react: { root: 'React', commonjs: 'react', commonjs2: 'react' },
      'react-dom': { root: 'ReactDOM', commonjs: 'react-dom', commonjs2: 'react-dom' },
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
    ]
  })
}


module.exports = config;
