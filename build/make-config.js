var path = require('path')
  , webpack = require('webpack')
  , ExtractTextPlugin = require('extract-text-webpack-plugin')
  , pkg = require('../package.json');

module.exports = function makeConfig(options){
  var entry = options.entry
    , plugins = options.plugins || []

  var loaders = [
    { test: /\.json$/, loader: 'json-loader' },
    { test: /\.css$/,  loader: options.extractStyles
        ? ExtractTextPlugin.extract('style-loader', 'css-loader')
        : 'style-loader!css-loader' },

    { test: /\.less$/, loader: options.extractStyles
        ? ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
        : 'style-loader!css-loader!less-loader' },

    { test: /\.gif$/, loader: 'url-loader?mimetype=image/png' },
    { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
    { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=[name].[ext]' }
  ];

  if (!options.noCompile)
    loaders.push(
      { test: /\.jsx$|\.js$/, loader: 'babel-loader', exclude: /node_modules/ })

  if (options.hot){
    loaders.splice(loaders.length - 1, 0,
      { test: /\.jsx$|\.js$/, loader: 'react-hot-loader', exclude: /node_modules/ })

    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin())

    entry = [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      entry
    ]
  }

  if (options.loaders)
    loaders = loaders.concat(options.loaders)



  if (options.minimize)
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false, dead_code: true } //eslint-disable-line
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.NoErrorsPlugin())
  else
    plugins.push(
      new webpack.DefinePlugin({
        '__VERSION__': JSON.stringify(pkg.version)
      }));

  if ( options.production || options.minimize )
    plugins.push(new webpack.DefinePlugin({
        '__VERSION__': JSON.stringify(pkg.version),
        'process.env': { NODE_ENV: JSON.stringify('production') }
      }))

  if (options.extractStyles)
    plugins.push(
      new ExtractTextPlugin(options.styleName || 'styles.css', {
          allChunks: true
      }))

  if (options.banner) {
    plugins.push(
      new webpack.BannerPlugin(
        '(c) ' + (new Date()).getFullYear() + ' Jason Quense | '
        + 'https://github.com/jquense/react-widgets/blob/master/License.txt'
        , { entryOnly : true }))
  }

  return {
    cache: true,

    devtool: options.devtool,

    entry: entry,

    output: options.output,

    externals: options.externals,

    babel: options.babel,

    resolve: {
      extensions: ['', '.js', '.jsx'],
      alias: {
        react: path.resolve('./node_modules/react'),
        'react-widgets': path.join(__dirname, '..', 'src'),
        'react-dom': path.resolve('./node_modules/react-dom')
      }
    },

    module: {
      loaders: loaders
    },

    plugins: plugins,

    node: {
      Buffer: false
    }
  }
}
