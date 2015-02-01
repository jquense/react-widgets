'use strict';
var gulp    = require('gulp')
  , dev     = require('./tasks/development')
  , assets  = require('./tasks/assets')
  , configs = require('./tasks/webpack.configs')
  , del     = require('del')
  , webpack = require('gulp-webpack');

gulp.task('assets-less',   assets.less)
gulp.task('assets-fonts',  assets.fonts)

gulp.task('lib-clean', function(cb){
  del('./lib', cb);
})

gulp.task('lib-compile',   ['lib-clean'], assets.compile)

gulp.task('browser-clean', function(cb){
  del('./browser/*.js', cb);
})

gulp.task('browser-build', ['lib', 'browser-clean'], function() {
  return webpack(configs.browser)
    .pipe(gulp.dest('./browser/'));
})

gulp.task('browser', [ 'browser-clean', 'browser-build'])

gulp.task('lib',     [ 'lib-clean', 'lib-compile'])
gulp.task('assets',  [ 'assets-fonts', 'assets-less'])

gulp.task('docs',    [ 'lib', 'assets'], function() {
  return webpack(configs.docs)
    .pipe(gulp.dest('./docs'));
})

gulp.task('doc-watch',    function(){
  gulp.watch(['./src/**/*', './docs/**/*.jsx'], ['docs'])
})


gulp.task('dev',      dev.devServer)
gulp.task('dev-docs', ['docs', 'doc-watch'])

gulp.task('release', [ 'lib', 'assets', 'docs', 'browser']);
