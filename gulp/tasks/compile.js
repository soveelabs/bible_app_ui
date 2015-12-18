var gulp = require('gulp');

gulp.task('compile', [
  'compile:clean',
  'compile:scripts',
  'compile:stylesheets'
]);
