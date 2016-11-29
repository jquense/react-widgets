var merge = require('webpack-merge');
var path = require('path')
  , webpack = require('webpack')
  , pkg = require('../package.json');

var TARGET = process.env.NODE_ENV || 'development';

console.log( // eslint-disable-line
  '---------------------\n' +
  '-- Webpack: compiling target: ' + TARGET + ' \n' +
  '---------------------\n'
);

var DOCS = TARGET === 'docs';
var DIST = TARGET === 'dist';
var TEST = TARGET === 'test';

var urlLoader = 'url-loader?limit=10000&name=[name].[ext]';

function makeLocalizerConfig(config, name, args) {
  return merge({}, config, {
    devtool: false,
    entry:
      'imports-loader?createLocalizer=../lib/localizers/globalize.js,' +
      'args=>[' + args.join(', ') +']' +
      '!./build/configure-shim.js',

    output: {
      path: path.join(__dirname, '../dist'),
      filename: 'react-widgets-' + name + '.js'
    },

    externals: {
      '../configure': 'window.ReactWidgets',
      react: 'window.React'
    }
  })
}

var config = {
  cache: true,
  devtool: 'cheap-inline-module-source-map',
  module: {
    rules: [
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.js$/,   loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/,  use: ['style-loader', 'css-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.(gif|png|eot|ttf|svg)(\?.*)?$/, loader: urlLoader },
      { test: /\.woff2?(\?.*)?$/, loader: urlLoader + '&mimetype=application/font-woff'},
      { test: /\.js$/, loader: 'imports-loader?define=>false' },
    ]
  },
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-widgets': path.join(__dirname, '..', 'src'),
      'react-dom': path.resolve('./node_modules/react-dom')
    }
  },
}


if (DOCS || DIST) {
  config = merge(config, {
    node: {
      Buffer: false
    },
    plugins: [
      new webpack.DefinePlugin({
        '__VERSION__': JSON.stringify(pkg.version),
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.BannerPlugin({
        banner: '(c) 2014 - present: Jason Quense | https://github.com/jquense/react-widgets/blob/master/License.txt',
        entryOnly : true,
      })
    ]
  })
}

if (DOCS) {
  config = merge(config, {
    devtool: 'source-map',
    entry:  {
      app: path.join(__dirname, '../docs/components/Docs.js'),
      vendor: ['react', 'react-dom', 'globalize']
    },
    output: {
      path: path.join(__dirname, '../docs/public'),
      filename: 'docs.js',
      publicPath: '/docs/public'
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.bundle.js'
      })
    ],

    module: {
      rules: [
        {
          test: /\.raw$/,
          loader: 'raw'
        },
        {
          test: /\.api\.md$/,
          use: [
            'babel-loader',
            {
              loader: path.join(__dirname, '../docs/tools/apiLoader'),
              options: {
                template: require('../docs/templates/doc-page')
              }
            }
          ]
        },
        {
          test: /.md$/,
          exclude: /\.api\.md$/,
          use: [
            'babel-loader',
            {
              loader: path.join(__dirname, '../docs/tools/apiLoader'),
              options: {
                template: require('../docs/templates/md-component')
              }
            }
          ]
        }
      ]
    }
  })
}
else if (DIST) {
  config = [
    merge({}, config, {
      devtool: false,
      entry: {
        'react-widgets': './lib/index.js'
      },
      output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js',
        library:  'ReactWidgets',
        libraryTarget: 'umd'
      },
      externals: {
        react: { root: 'React', commonjs: 'react', commonjs2: 'react' },
        'react-dom': { root: 'ReactDOM', commonjs: 'react-dom', commonjs2: 'react-dom' },
      }
    }),
    makeLocalizerConfig(config, 'globalize', ['Globalize']),
    makeLocalizerConfig(config, 'moment', ['Moment']),
    makeLocalizerConfig(config, 'simple-number', []),
  ]
}
else if (TEST) {
  config = merge(config, {
    module: {
      rules: [
        {
          test: /sinon-chai/,
          loader: 'imports-loader?define=>false'
        }
      ]
    }
  })
}


module.exports = config;
