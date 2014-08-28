var gulp    = require('gulp')
  , docs    = require('./tasks/docs')
  , dev     = require('./tasks/development')
  , assets  = require('./tasks/assets')
  , browser = require('./tasks/browser');

gulp.task('dev-server',    dev.devServer)
gulp.task('doc-server',    dev.docServer)

gulp.task('assets-less',   assets.less)
gulp.task('assets-fonts',  assets.fonts)

gulp.task('lib-clean',     assets.clean)
gulp.task('lib-compile',   ['lib-clean'], assets.compile)

gulp.task('browser-clean', browser.clean)
gulp.task('browser-build', ['lib', 'browser-clean'], browser.build)

gulp.task('docs',    [ 'assets'], docs.build)
gulp.task('assets',  [ 'assets-fonts', 'assets-less'])
gulp.task('lib',     [ 'lib-clean', 'lib-compile'])

gulp.task('browser', [ 'browser-clean', 'browser-build'])

gulp.task('release', [ 'lib', 'assets', 'docs', 'browser']);
