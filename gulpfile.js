var gulp = require('gulp')
  , less = require('gulp-less')
  , plumber = require('gulp-plumber')
  , source = require('vinyl-source-stream')
  , browserify = require('browserify')
  , browserSync = require('browser-sync')
  , fs = require('fs');


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
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('libs', function () {
    var bundle = browserify();

    bundle.require('react')
    bundle.require('lodash')
    bundle.require('bluebird')
    bundle.require('zepto')

    bundle.bundle({ debug: true })
        .on("error", handleError)
        .pipe(source('vendor.js'))
        .pipe(plumber())
        .pipe(gulp.dest('./dist'));

});

gulp.task('examples', function(){
    var bundle = browserify();

    bundle.add('./example/example.jsx') 
    bundle.transform({ es6: true },'reactify')
    bundle.external('react')
    bundle.external('lodash')
    bundle.external('bluebird')
    bundle.external('zepto')
    
    bundle.bundle({ debug: true })
        .on("error", handleError)
        .pipe(source('./compiled.js'))
        .pipe(plumber())
        .pipe(gulp.dest('./example'))
        .pipe(browserSync.reload({ stream:true, once: true }));
        
});

gulp.task('watcher', function() {
    gulp.watch('./src/less/**/*.less', ['less']);
    gulp.watch(['./src/**/*'], ['browserify']);
});

// Default Task
gulp.task('browserify', ['libs', 'examples']);
gulp.task('default', [ 'sync', 'browserify', 'less' ]);

gulp.task('watch', ['sync', 'watcher']);

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}