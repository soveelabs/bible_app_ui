var gulp = require('gulp'),
    config = require('../../config'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    rev = require('gulp-rev'),
    minifyCss = require('gulp-minify-css');

gulp.task('compile:stylesheets', ['compile:clean'], function() {
  return gulp.src(config.src + 'less/*.less')
    .pipe(less())
    .pipe(concat('styles.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest(config.dest))
});
