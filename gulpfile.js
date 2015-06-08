'use strict';
var gulp    = require('gulp')
  , del     = require('del')
  , merge   = require('merge-stream')
  , webpack = require('webpack')
  , release = require('jq-release')
  , WebpackServer = require("webpack-dev-server")
  , concat = require('gulp-concat')
  , less = require('gulp-less')
  //, assign = require('react/lib/Object.assign')
  , rename = require('gulp-rename')
  , exec = require('child_process').exec
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
      .pipe(babelTransform('./util/babelHelpers.js'))
      .pipe(rename({ extname: '.js' }))
      .pipe(gulp.dest('./lib'));
})


gulp.task('lib', [ 'lib-clean', 'lib-assets', 'lib-compile'])

gulp.task('dist-assets', function(){

  return merge(
    gulp.src('./src/less/react-widgets.less')
      .pipe(less({ compress: false }))
      .pipe(gulp.dest('./dist/css')),

    gulp.src('./src/img/*')
      .pipe(gulp.dest('./dist/img')),

    gulp.src('./src/fonts/*')
      .pipe(gulp.dest('./dist/fonts'))
  );
})

gulp.task('dist-build', ['lib', 'dist-assets'], function(cb) {
  webpack(configs.browser, function(err, stats){
    console.log(stats.toString({ colors: true }))
    cb()
  });
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
      })
  })
})

gulp.task('less-test', function(){

  return gulp.src([
      './src/less/variables.less', 
      './src/less/mixins.less',
      './src/less/bootstrap-theme.less',
      './src/less/core.less',
    ])
    .pipe(concat('core.less'))
    .pipe(less({ compress: false }))
    .pipe(gulp.dest('./dist/css'))
})

gulp.task('release', [ 'lib', 'dist-build']);

gulp.task('publish', ['release'], release)

gulp.task('publish-docs', ['docs'], function(finish){
  run('git cm "rebuild docs"', function(){
    run('git co gh-pages && git merge master" ', function(){
      run('git push origin gh-pages" ', finish)
    })
  })

  function run(cmd, cb){
    exec(cmd, function(err, stdout, stderr){
      if (err) return finish(err);
      console.log(stdout);
      console.log(stderr);
      cb()
    })
  }
})
