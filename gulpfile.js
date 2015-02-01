'use strict';
var gulp    = require('gulp')
  , del     = require('del')
  , webpack = require('webpack')
  , WebpackServer = require("webpack-dev-server")

  , less = require('gulp-less')
  , assign = require('lodash/object/assign')
  , rename = require('gulp-rename')
  , toFive  = require("gulp-6to5")
  , plumber = require('gulp-plumber')
  , configs = require('./webpack.configs')
  , stripDebug = require('gulp-strip-debug');


gulp.task('assets',   function(){

  return gulp.src('./src/less/react-widgets.less')
      .pipe(plumber())
      .pipe(less({ compress: true }))
      .pipe(gulp.dest('./dist/css'));
})

gulp.task('lib-clean', function(cb){
  del('./lib', cb);
})

gulp.task('lib-compile', [ 'lib-clean' ], function(){
   gulp.src('./src/less/*.less')
    .pipe(gulp.dest('./lib/less'))

  return gulp.src(['./src/**/*.js', './src/**/*.jsx'])
      .pipe(plumber())
      .pipe(toFive(configs.to5Config))
      .pipe(rename({ extname: '.js' }))
      .pipe(stripDebug())
      .pipe(gulp.dest('./lib'));
})


gulp.task('lib', [ 'lib-clean', 'lib-compile'])


gulp.task('browser-clean', function(cb){
  del('./browser/*.js', cb);
})

gulp.task('browser-build', ['lib', 'browser-clean'], function(cb) {
  webpack(configs.browser, cb);
})

gulp.task('browser', [ 'browser-clean', 'browser-build'])

gulp.task('docs',    [ 'lib', 'assets'], function(cb) {
  webpack(assign({}, configs.docs, { devtool: '' }), cb);
})

gulp.task('doc-watch', function() {
  
  del('./docs/docs.js');

  new WebpackServer(
        webpack(configs.docs)
      , {  publicPath: "/docs", stats: { colors: true } }
    )
    .listen(8081, "localhost");
})


gulp.task('dev', function() {

  gulp.watch('./src/less/**/*.less',  ['watch-less']);
  
  new WebpackServer(
        webpack(configs.dev)
      , { publicPath: "/example", stats: { colors: true } }
    )
    .listen(8080, "localhost");
})


gulp.task('dev-docs', ['lib', 'doc-watch'])

gulp.task('release', [ 'lib', 'assets', 'docs', 'browser']);
