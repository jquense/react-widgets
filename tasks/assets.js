'use strict';
var gulp = require('gulp')
  , less = require('gulp-less')
  , replace = require('gulp-replace')
  , rename = require('gulp-rename')
  , toFive  = require("gulp-6to5")
  , plumber = require('gulp-plumber')
  , configs = require('./webpack.configs')
  , stripDebug = require('gulp-strip-debug');

module.exports = {

  fonts: function() {
      return gulp.src('./node_modules/fonts')
        .pipe(gulp.dest('./dist/'));
  },

  less: function(){
    gulp.src('./src/less/react-widgets.less')
        .pipe(plumber())
        .pipe(less({ compress: true }))
        .pipe(gulp.dest('./dist/css'));
  },

  compile: function(){
      gulp.src('./src/less/*.less')
        .pipe(gulp.dest('./lib/less'))

      return gulp.src(['./src/**/*.jsx', './src/**/*.js'])
          .pipe(plumber())
          .pipe(toFive(configs.to5Config))
          .pipe(replace(/\.jsx/g, ''))
          .pipe(stripDebug())
          .pipe(rename({ extname: '.js'}))
          .pipe(gulp.dest('./lib'));
  },

  
}
