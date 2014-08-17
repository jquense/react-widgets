var gulp = require('gulp')
  , less = require('gulp-less')
  , plumber = require('gulp-plumber')
  , source = require('vinyl-source-stream')
  , browserify = require('browserify')
  , browserSync = require('browser-sync')
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


gulp.task('sync', function() {
    browserSync({
        server: {
            baseDir: ["./example", './'],
            index: "index.htm"
        }
    });
});

gulp.task('less', function(){
    gulp.src('./src/less/react-widgets.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('watcher', function() {
    gulp.watch('./src/less/**/*.less', ['less']);
    gulp.watch(['./src/**/*'], ['browserify']);
});

// Default Task
gulp.task('browserify', ['libs', 'examples']);
gulp.task('default', [ 'sync', 'browserify', 'less' ]);

gulp.task('watch', ['sync', 'watcher']);


gulp.task('docs', ['docs-build', 'docs-less']);

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}