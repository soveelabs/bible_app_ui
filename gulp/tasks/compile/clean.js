
var gulp = require('gulp'),
    config = require('../../config'),
    del = require('del');

gulp.task('compile:clean', function() {
  del([config.dest + '*.css', config.dest + '*.js']);
});
