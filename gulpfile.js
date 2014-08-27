var gulp = require('gulp')
  , less = require('gulp-less')
  , plumber = require('gulp-plumber')
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

gulp.task("dist-build", function() {
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



gulp.task('less', function(){
    gulp.src('./src/less/react-widgets.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('./dist/css'));
});


// Default Task

gulp.task('docs', ['docs-build', 'docs-less']);
gulp.task('browser', ['dist-build', 'dist-less']);

gulp.task('build', ['docs', 'browser']);

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}