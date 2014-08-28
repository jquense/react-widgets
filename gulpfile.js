var gulp = require('gulp')
  , less = require('gulp-less')
  , plumber = require('gulp-plumber')
  , replace = require('gulp-replace')
  , clean = require('gulp-clean')
  , gulpReact = require('gulp-react')
  , configs = require('./webpack.configs')
  , WebpackDevServer = require("webpack-dev-server")
  , gulpWebpack = require('gulp-webpack')
  , webpack = require('webpack')
  , fs = require('fs');


gulp.task("dev-build", function() {
    return gulpWebpack(configs.dev)
      .pipe(gulp.dest('./example/'));
})

gulp.task("docs-build", function() {

    return gulpWebpack(configs.docs)
      .pipe(gulp.dest('./docs/js'));
})

gulp.task('docs-less', function(){
    gulp.src('./src/less/react-widgets.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('./docs/css'));
});

gulp.task("dist-build", ['build-js'], function() {
    return gulpWebpack(configs.browser)
      .pipe(gulp.dest('./dist/'));
})

gulp.task('dist-less', function(){
    gulp.src('./src/less/react-widgets.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task("dev-server", function(callback) {

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(configs.dev), {
    publicPath: "/example",
    stats: {
      colors: true
    }
  }).listen(8080, "localhost");
});

gulp.task("doc-server", function(callback) {

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(configs.docs), {
    publicPath: "/docs",
    stats: { colors: true }
  }).listen(8081, "localhost");
});

gulp.task('build-clean', function(){
    return gulp.src('./lib/*', { read: false })
        .pipe(clean())
})

gulp.task('build-js', [ 'build-clean' ], function(){
    gulp.src('./src/**/*.js')
      .pipe(gulp.dest('./lib'))

    return gulp.src('./src/**/*.jsx')
        .pipe(plumber())
        .pipe(gulpReact({ harmony: true }))
        .pipe(replace(/.jsx/g, ''))
        .pipe(gulp.dest('./lib'));
});


gulp.task('less', function(){
    gulp.src('./src/less/react-widgets.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('./dist/css'));
});


// Default Task

gulp.task('docs', ['docs-build', 'docs-less']);
gulp.task('browser', ['build-clean', 'build-js', 'dist-build', 'dist-less']);

gulp.task('build', [ 'docs', 'browser']);

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}