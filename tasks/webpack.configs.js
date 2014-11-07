var path = require('path')
  , webpack = require('webpack')
  , pkg = require("../package.json")
  , ProdDefine = new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify("production")
      }
    })

var visitors = [
    'jstransform/visitors/es6-arrow-function-visitors',
    'jstransform/visitors/es6-class-visitors',
    'jstransform/visitors/es6-destructuring-visitors',
    'jstransform/visitors/es6-object-concise-method-visitors',
    'jstransform/visitors/es6-object-short-notation-visitors',
    __dirname + '/transforms/rest-param',
    'jstransform/visitors/es6-template-visitors',
    'jstransform/visitors/es7-rest-property-helpers',
    'jstransform/visitors/es7-spread-property-visitors'  
]

module.exports = {

  browser: {

    entry: './index.js',

    output: {
      path: path.join(__dirname, "./browser"),
      filename: 'react-widgets.js',
      library:  'ReactWidgets',
      libraryTarget: 'this'
    },

    externals: {
      '$':      'window.$',
      'globalize': 'window.Globalize',
      'react':  'window.React'
    },

    plugins: [
      ProdDefine,
      
      new webpack.BannerPlugin( 
        "v" + JSON.stringify(pkg.version) + " | (c) " + (new Date).getFullYear() + " Jason Quense | "
        + "https://github.com/jquense/react-widgets/blob/master/License.txt"
        , { entryOnly : true }),

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
        { test: /\.jsx$/, loader: 'jsx-loader?insertPragma=React.DOM' },
        //{ test: /lodash/, loader: "imports?define=>false" }
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
      path: path.join(__dirname, "./docs"),
      filename: 'docs.js',
      publicPath: 'docs/'
    },

    externals: {
      'react':  'window.React',
      //'lodash': 'window._'
    },

    module: {
      loaders: [
        { test: /\.jsx$/, loader:  'jsx-loader?harmony=true&insertPragma=React.DOM' },
        { test: /\.css$/, loader:  "style-loader!css-loader" },
        { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
      ],
    },

    plugins: [
      ProdDefine,
      new webpack.BannerPlugin( 
        "v" + JSON.stringify(pkg.version) + " | (c) " + (new Date).getFullYear() + " Jason Quense | "
        + "https://github.com/jaquense/react-widgets/blob/master/License.txt"
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
        { test: /\.css$/, loader: "style-loader!css-loader" },
        { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
      ],
      postLoaders: [
        { loader: path.join(__dirname, './jstransform-loader') }
      ]
    },
  }
}