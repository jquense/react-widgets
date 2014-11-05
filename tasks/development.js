'use strict';
var gulp    = require('gulp')
  , xtend   = require('xtend')
  , configs = require('./webpack.configs')
  , clean   = require('gulp-clean')
  , WebpackDevServer = require("webpack-dev-server")
  , webpack = require('webpack');

var docs    = require('./docs')
  , assets  = require('./assets');

gulp.task('watch-less',  assets.less)

module.exports = {

  devServer: function() {

    gulp.watch('./src/less/**/*.less',  ['watch-less']);
    
    new WebpackDevServer(webpack(configs.dev), {
      publicPath: "/example",
      stats: { colors: true }
    }).listen(8080, "localhost");

  },

  docServer: function() {
    var config = xtend(configs.docs);

    config.devtool = 'source-map'
    config.plugins = [];

    gulp.watch('./src/less/**/*.less',  ['watch-less']);

    gulp.src('./docs/*.js', { read: false }).pipe(clean())

    new WebpackDevServer(webpack(config), {
      publicPath: "/docs",
      stats: { colors: true }
    }).listen(8081, "localhost");
  }
}

