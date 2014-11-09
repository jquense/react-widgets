'use strict';
var gulp    = require('gulp')
  , docs    = require('./tasks/docs')
  , dev     = require('./tasks/development')
  , assets  = require('./tasks/assets')
  , browser = require('./tasks/browser');

gulp.task('dev-server',    dev.devServer)

gulp.task('doc-watch',    function(){
	gulp.watch(['./src/**/*', './docs/**/*.jsx'], ['docs'])
})


gulp.task('assets-less',   assets.less)
gulp.task('assets-fonts',  assets.fonts)

gulp.task('lib-clean',     assets.clean)
gulp.task('lib-compile',   ['lib-clean'], assets.compile)

gulp.task('browser-clean', browser.clean)
gulp.task('browser-build', ['lib', 'browser-clean'], browser.build)

gulp.task('lib',     [ 'lib-clean', 'lib-compile'])
gulp.task('assets',  [ 'assets-fonts', 'assets-less'])

gulp.task('docs',    [ 'lib', 'assets'], docs.build)

gulp.task('doc-server', ['docs', 'doc-watch'])

gulp.task('browser', [ 'browser-clean', 'browser-build'])

gulp.task('release', [ 'lib', 'assets', 'docs', 'browser']);
