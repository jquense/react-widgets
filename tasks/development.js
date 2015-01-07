'use strict';
var gulp    = require('gulp')
  , configs = require('./webpack.configs')
  , webpack = require('webpack')
  , WebpackDevServer = require("webpack-dev-server");

var assets  = require('./assets');

gulp.task('watch-less',  assets.less)

module.exports = {

  devServer: function() {

    gulp.watch('./src/less/**/*.less',  ['watch-less']);
    
    new WebpackDevServer(webpack(configs.dev), {
      publicPath: "/example",
      stats: { colors: true }
    }).listen(8080, "localhost");

  }
}

