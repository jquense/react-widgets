'use strict';
var gulp = require('gulp')
  , less = require('gulp-less')
  , replace = require('gulp-replace')
  , clean = require('gulp-clean')
  , gulpReact = require('gulp-react')
  , plumber = require('gulp-plumber')
  , configs = require('./webpack.configs')
  , webpack = require('gulp-webpack');

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

  clean: function(){
      return gulp.src('./lib/*', { read: false })
          .pipe(clean())
  }, 

  compile: function(){
      gulp.src('./src/less/*.less')
        .pipe(gulp.dest('./lib/less'))

      return gulp.src(['./src/**/*.jsx', './src/**/*.js'])
          .pipe(plumber())
          .pipe(gulpReact({ harmony: true }))
          .pipe(replace(/\.jsx/g, ''))
          .pipe(gulp.dest('./lib'));
  }
  
}
