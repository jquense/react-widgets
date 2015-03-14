'use strict';
var gulp    = require('gulp')
  , del     = require('del')
  , merge   = require('merge-stream')
  , webpack = require('webpack')
  , WebpackServer = require("webpack-dev-server")

  , less = require('gulp-less')
  , assign = require('lodash/object/assign')
  , rename = require('gulp-rename')
  , babelTransform = require('gulp-babel-helpers')
  , plumber = require('gulp-plumber')
  , configs = require('./webpack.configs');

gulp.task('dist-clean', function(cb){
  del('./dist/*', cb);
})

gulp.task('lib-clean', function(cb){
  del('./lib/*', cb);
})

gulp.task('lib-assets', [ 'lib-clean' ], function(){

  return merge(
    gulp.src('./src/less/*.less')
      .pipe(gulp.dest('./lib/less')),

    gulp.src('./src/img/*')
      .pipe(gulp.dest('./lib/img')),

    gulp.src('./src/fonts/*')
      .pipe(gulp.dest('./lib/fonts'))
  );
})

gulp.task('lib-compile', [ 'lib-clean' ], function(){

  return gulp.src(['./src/**/*.js', './src/**/*.jsx'])
      .pipe(plumber())
      .pipe(babelTransform(
          assign({}, configs.babel)
        , './util/babelHelpers.js'
        , './lib/util/babelHelpers.js'))
      .pipe(rename({ extname: '.js' }))
      .pipe(gulp.dest('./lib'));
})


gulp.task('lib', [ 'lib-clean', 'lib-assets', 'lib-compile'])

gulp.task('dist-assets', function(){

  return merge(
    gulp.src('./src/less/react-widgets.less')
      .pipe(less({ compress: true }))
      .pipe(gulp.dest('./dist/css')),

    gulp.src('./src/img/*')
      .pipe(gulp.dest('./dist/img')),

    gulp.src('./src/fonts/*')
      .pipe(gulp.dest('./dist/fonts'))
  );
})

gulp.task('dist-build', ['lib', 'dist-assets'], function(cb) {
  webpack(configs.browser, cb);

})

gulp.task('test-build', function(cb) {
  del('./_test.bundle.js', function(){
     webpack(configs.test, cb);
  });
})

gulp.task('docs', function(cb) {
  webpack(configs.docBuild, cb);
})

gulp.task('dev', function(cb) {

  new WebpackServer(webpack(configs.dev), {
    publicPath: "/dev",
    hot: true,
    hotComponent: true,
    stats: { colors: true }
  })
  .listen(8080, 'localhost', function (err, result) {
    if (err) return console.log(err);
    
    console.log('Listening at localhost:8080');
    cb()
  });
})

gulp.task('dev-docs', function(cb) {
  
  del('./docs/docs.js', function(){

      new WebpackServer(webpack(configs.docServer), { 
        publicPath: "/docs", 
        hot: true, 
        hotComponent: true,
        stats: { colors: true } 
      })
      .listen(8080, "localhost", function (err, result) {
        if (err) return console.log(err);
        
        console.log('Listening at localhost:8080');
        cb()
      });
  });
})

gulp.task('release', [ 'lib', 'dist-build', 'docs']);
