var path = require('path')
  , webpack = require('webpack')
  , pkg = require('./package.json');

var compress = new webpack.optimize.UglifyJsPlugin();

var prodDefine = new webpack.DefinePlugin({
      "process.env": { 
        "NODE_ENV": JSON.stringify('production') }
    });

var banner = new webpack.BannerPlugin( 
      'v' + JSON.stringify(pkg.version) + ' | (c) ' + (new Date).getFullYear() + ' Jason Quense | '
      + 'https://github.com/jquense/react-widgets/blob/master/License.txt'
      , { entryOnly : true });


var config = {
      experimental: true,
      loose: ['all'],

      whitelist: [
        'es6.classes',
        'es6.modules',
        'es6.arrowFunctions',
        'es6.properties.computed',
        'es6.properties.shorthand',
        'es6.parameters.default',
        'es6.parameters.rest',
        'es6.templateLiterals',
        'es6.destructuring',
        'es7.objectRestSpread',
        'react'
      ]
    }

module.exports = {

  to5Config: config,

  browser: {

    entry: './index.js',

    output: {
      path: path.join(__dirname, './browser'),
      filename: 'react-widgets.js',
      library:  'ReactWidgets',
      libraryTarget: 'this'
    },

    externals: {
      globalize: 'Globalize',
      react:  'React'
    },

    plugins: [
      prodDefine, banner, compress
    ],
  },

  dev: {
    devtool: 'source-map',
    entry: './example/example.jsx',
    output: {
      filename: 'example.js',
      path: path.join(__dirname, './example'),
      publicPath: 'example/'
    },
    
    resolve: {
      extensions: ['', '.js', '.jsx']
    },

    module: {
      loaders: [
        { test: /\.css$/,  loader: "style-loader!css-loader" },
        { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
        { 
          test: /\.jsx$|\.js$/, 
          loader: '6to5-loader', 
          exclude: /node_modules/,
          query: config
        }
      ]
    },
  },

  docs: {
    devtool: 'source-map',

    entry: './docs/components/docs.jsx',
    
    output: {
      path: path.join(__dirname, './docs'),
      filename: 'docs.js',
      publicPath: '/docs'
    },

    resolve: {
      extensions: ['', '.js', '.jsx']
    },

    externals: {
      react:  'window.React'
    },

    module: {
      loaders: [
        { test: /\.css$/, loader:  'style-loader!css-loader', exclude: /node_modules/ },
        { test: /\.less$/, loader: 'style-loader!css-loader!less-loader', exclude: /node_modules/ },
        { 
          test: /\.jsx$|\.js$/, 
          loader: '6to5-loader', 
          exclude: /node_modules/,
          query: config
        }
      ]
    },

    plugins: [
      banner,
      new webpack.DefinePlugin({
        '__VERSION__': JSON.stringify(pkg.version),
        "process.env": {
          "NODE_ENV": JSON.stringify('development') }
      })
    ],
  },

  test: {
    devtool: 'inline-source-map',
    cache: true,
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module: {
      loaders: [
        { test: /\.css$/, loader: "style-loader!css-loader" },
        { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
        { test: /sinon-chai/, loader: "imports?define=>false" },
        { 
          test: /\.jsx$|\.js$/, 
          loader: '6to5-loader', 
          exclude: /node_modules/,
          query: config
        }
      ]
    },
    //plugins: [ ProdDefine ]
  }
}