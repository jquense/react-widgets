var merge = require('webpack-merge');
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');

var appConfig = require('../../tools/app-config');
var pkg = require('./package.json');

var TARGET = process.env.NODE_ENV || 'development';
var PRODUCTION = TARGET === 'production';

console.log( // eslint-disable-line
  '---------------------\n' +
  '-- env: ' + (TARGET) + '\n' +
  '---------------------\n'
);


var apiRegex = /\.api\.md$/;

var config = appConfig(__dirname, {
  cache: true,
  devtool: 'inline-module-source-map',

  entry:  './components/docs.js',

  output: {
    path: __dirname,
    filename: 'docs.js',
    publicPath: '/docs/'
  },

  module: {
    loaders: [
      { test: apiRegex, loader: 'babel-loader' },
      { test: apiRegex, loader: path.join(__dirname, './tools/apiLoader'),
        query: {
          template: require.resolve('./templates/doc-page')
        }
      },
      { test: /.md$/, exclude: apiRegex, loader: 'babel-loader' },
      { test: /.md$/, exclude: apiRegex, loader: path.join(__dirname, './tools/apiLoader'),
        query: {
          template: require.resolve('./templates/md-component')
        }
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      '__VERSION__': JSON.stringify(pkg.version),
    }),
    new HtmlWebpackPlugin({
      template: './templates/index.html',
      inject: true,
    }),
  ],
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom')
    }
  },
  devServer: {
    historyApiFallback: {
      index: '/docs/',
    },
  },
})

if (PRODUCTION) {
  config = merge(config, {
    devtool: 'source-map',

    output: {
      path: path.join(__dirname, '/../../docs'),
      filename: 'docs.js',
      publicPath: '/docs'
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
