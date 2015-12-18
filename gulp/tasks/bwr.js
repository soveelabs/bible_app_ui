var gulp = require('gulp');

gulp.task('bwr', [
  'bower:init',
  'bower:mainFiles',
  'bower:fonts',
  'bower:scripts',
  'bower:stylesheets'
]);
