var gulp = require('gulp'),
    mainBowerFiles = require('main-bower-files'),
    bower = require('gulp-bower');

gulp.task('bower:init', function() {
  return bower();
});
