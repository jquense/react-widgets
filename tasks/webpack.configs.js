var path = require('path')
  , webpack = require('webpack')
  , pkg = require('../package.json')
  , ProdDefine = new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify('production')
      }
    })

module.exports = {

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
      ProdDefine,
      
      new webpack.BannerPlugin( 
        'v' + JSON.stringify(pkg.version) + ' | (c) ' + (new Date).getFullYear() + ' Jason Quense | '
        + 'https://github.com/jquense/react-widgets/blob/master/License.txt'
        , { entryOnly : true }),

      new webpack.optimize.UglifyJsPlugin()
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
    
    module: {
      loaders: [
        { test: /\.jsx$/, loader: 'jsx-loader' }
      ],
      postLoaders: [
        { loader: path.join(__dirname, './jstransform-loader') }
      ]
    },
  },

  docs: {
    devtool: 'source-map',
    entry: './docs/components/docs.jsx',
    
    output: {
      path: path.join(__dirname, './docs'),
      filename: 'docs.js',
      publicPath: 'docs/'
    },

    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
    },

    externals: {
      react:  'window.React'
    },

    module: {
      loaders: [
        { test: /\.jsx$/, loader:  'jsx-loader' },
        { test: /\.css$/, loader:  'style-loader!css-loader' },
        { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
      ],
      postLoaders: [
        { loader: path.join(__dirname, './jstransform-loader') }
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
      "process.env": {
          // This has effect on the react lib size
          "NODE_ENV": JSON.stringify('development')
        }
      }),
      new webpack.BannerPlugin( 
        'v' + JSON.stringify(pkg.version) + ' | (c) ' + (new Date).getFullYear() + ' Jason Quense | '
        + 'https://github.com/jaquense/react-widgets/blob/master/License.txt'
        , { entryOnly : true }),
     // new webpack.optimize.UglifyJsPlugin()
    ],
  },

  test: {
    devtool: 'source-map',
    cache: true,
    module: {
      loaders: [
        { test: /\.jsx$/, loader: 'jsx-loader?insertPragma=React.DOM' },
        { test: /\.css$/, loader: 'style-loader!css-loader' },
        { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
      ],
      postLoaders: [
        { loader: path.join(__dirname, './jstransform-loader') }
      ]
    },
  }
}