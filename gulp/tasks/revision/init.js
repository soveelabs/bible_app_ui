var gulp = require('gulp'),
    rev = require('gulp-rev'),
    del = require('del'),
    config = require('../../config');

gulp.task("revision:init", ['compile', 'files'], function(){
  return gulp.src([config.dest + "*.css", config.dest + "*.js"])
    .pipe(rev())
    .pipe(gulp.dest(config.dest))
    .pipe(rev.manifest())
    .pipe(gulp.dest(config.dest))
});
