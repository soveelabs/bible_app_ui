var gulp = require('gulp'),
    config = require('../config'),
    jshint = require('gulp-jshint');

gulp.task('jshint', function() {
  return gulp.src(config.src + 'js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
