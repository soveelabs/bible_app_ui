var gulp = require('gulp'),
    config = require('../../config'),
    sourceMaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    rev = require('gulp-rev'),
    uglify = require('gulp-uglify');

gulp.task('compile:scripts', ['compile:clean'], function() {
  return gulp.src([config.src + 'js/**/*.js'])
    .pipe(sourceMaps.init())
    .pipe(concat('app.min.js'))
    .pipe(uglify({mangle: false}))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest(config.dest))
});
