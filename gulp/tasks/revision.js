var gulp = require('gulp');

gulp.task('revision', [
  'revision:init',
  'revision:replace',
  'revision:cleanup'
]);
