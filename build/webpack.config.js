var merge = require('webpack-merge');
var path = require('path')
  , webpack = require('webpack')
  , pkg = require('../package.json');

var TARGET = process.env.TARGET || 'development';
var PRODUCTION = process.env.NODE_ENV === 'production';

console.log( // eslint-disable-line
  '---------------------\n' +
  '-- target: ' + TARGET + ' \n' +
  '--    env: ' + (process.env.NODE_ENV || 'dev') + '\n' +
  '---------------------\n'
);

var DOCS = TARGET === 'docs';
var DIST = TARGET === 'dist';
var TEST = TARGET === 'test';

var apiRegex = /\.api\.md$/;
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
  devtool: 'inline-module-source-map',
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.js$/,   loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/,  loader: ['style-loader', 'css-loader'].join('!') },
      { test: /\.less$/, loader: ['style-loader', 'css-loader', 'less-loader'].join('!') },
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
  node: {
    Buffer: false
  },
}

if (PRODUCTION) {
  config = merge(config, {

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.BannerPlugin(
        '(c) 2014 - present: Jason Quense | https://github.com/jquense/react-widgets/blob/master/License.txt',
        { entryOnly : true }
      )
    ]
  })
}

if (DOCS) {
  let docsPath = path.join(__dirname, '../docs/components/Docs.js');

  config = merge(config, {
    devtool: 'source-map',
    entry:  {
      app: docsPath,
    },
    output: {
      path: path.join(__dirname, '../docs/public'),
      filename: 'docs.js',
      publicPath: '/docs/public'
    },
    plugins: [
      new webpack.DefinePlugin({
        '__VERSION__': JSON.stringify(pkg.version),
      })
    ],

    module: {
      loaders: [
        { test: /\.raw$/, loader: 'raw' },

        { test: apiRegex, loader: 'babel-loader' },
        { test: apiRegex, loader: path.join(__dirname, '../docs/tools/apiLoader'),
          query: {
            template: require.resolve('../docs/templates/doc-page')
          }
        },

        { test: /.md$/, exclude: apiRegex, loader: 'babel-loader' },
        { test: /.md$/, exclude: apiRegex, loader: path.join(__dirname, '../docs/tools/apiLoader'),
          query: {
            template: require.resolve('../docs/templates/md-component')
          }
        },
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
      loaders: [
        {
          test: /sinon-chai/,
          loader: 'imports-loader?define=>false'
        }
      ]
    }
  })
}


module.exports = config;
