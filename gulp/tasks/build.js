var gulp = require('gulp'),
    compile = require('./compile.js')
    revision = require('./revision.js')
    files = require('./files.js')

gulp.task('build', [
  'compile',
  'files',
  'revision'
]);
