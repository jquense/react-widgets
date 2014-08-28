var gulp = require('gulp')
  , less = require('gulp-less')
  , plumber = require('gulp-plumber')
  , configs = require('./webpack.configs')
  , webpack = require('gulp-webpack');

module.exports = {

  clean: function(){

  },

  build: function() {
      return webpack(configs.docs)
        .pipe(gulp.dest('./docs'));
  }

}



