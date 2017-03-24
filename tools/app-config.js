var merge = require('webpack-merge');
var path = require('path')

var urlLoader = 'url-loader?limit=10000&name=[name].[ext]';

module.exports = function(root, config) {
  return merge({}, config, {
    module: {
      loaders: [
        { test: /\.json$/, loader: 'json-loader' },
        { test: /\.js$/,   loader: 'babel-loader', exclude: /node_modules/ },
        { test: /\.js$/,   loader: 'css-literal-loader',
           query: { tagName: 'less', extension: '.less' }
        },
        { test: /\.css$/,  loader: ['style-loader', 'css-loader'].join('!') },
        { test: /\.less$/, loader: ['style-loader', 'css-loader', 'less-loader'].join('!') },
        { test: /\.(gif|png|eot|ttf|svg)(\?.*)?$/, loader: urlLoader },
        { test: /\.woff2?(\?.*)?$/, loader: urlLoader + '&mimetype=application/font-woff'},
        { test: /\.js$/, loader: 'imports-loader?define=>false' },
      ]
    },
    // resolve: {
    //   root: path.join(root, './node_modules'),
    //   fallback: path.join(root, './node_modules'),
    // },
    // resolveLoader: {
    //   root: path.join(root, './node_modules'),
    //   fallback: path.join(root, './node_modules'),
    // },
    node: {
      Buffer: false
    },
  })
}
