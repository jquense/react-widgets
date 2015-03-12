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


var loaders = [
  { test: /\.css$/,  loader: "style-loader!css-loader" },
  { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
  { test: /\.gif$/, loader: "url-loader?mimetype=image/png" },
  { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
  { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
  { 
    test: /\.jsx$|\.js$/, 
    loader: 'babel-loader', 
    exclude: /node_modules/,
    query: pkg.babel
  }
];

module.exports = {

  babel: pkg.babel,

  browser: {

    entry: './index.js',

    output: {
      path: path.join(__dirname, './dist'),
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
    
    cache: true,

    entry: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './dev/dev.jsx'
    ],

    output: {
      filename: 'bundle.js',
      path: __dirname
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],

    resolve: {
      extensions: ['', '.js', '.jsx']
    },

    module: {
      loaders: loadersWithHotModule(),
    }
  },

  docs: {
    devtool: 'source-map',

    entry: [
      'webpack-dev-server/client?http://localhost:8081',
      'webpack/hot/only-dev-server',
      './docs/components/docs.jsx'
    ],

    output: {
      path: path.join(__dirname, './docs'),
      filename: 'docs.js'
    },

    resolve: {
      extensions: ['', '.js', '.jsx']
    },

    externals: {
      react:  'window.React'
    },

    module: {
      loaders: loadersWithHotModule().concat([
          { test: /\.json$/, loader: "json" }
        ])
    },

    plugins: [
      banner,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
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
      loaders: loaders.concat([
        { test: /sinon-chai/, loader: "imports?define=>false" }
      ])
    },
    //plugins: [ ProdDefine ]
  }
}

function loadersWithHotModule(){
  return loaders.reduce(function (current, next, idx){
      if(next.loader === 'babel-loader')
        current.push({ test: /\.jsx$|\.js$/, loader: 'react-hot-loader', exclude: /node_modules/ }) 

      return current.concat(next);
  }, [])
}