var gulp = require('gulp'),
    config = require('../config');

gulp.task('watch', ['build'], function() {
  gulp.watch(config.src + 'less/*.less', ['build']);
  gulp.watch(config.src + 'js/**/*.js', ['build']);
  gulp.watch(config.src + '**/*.html', ['build']);
  gulp.watch(config.src + 'img/**/*', ['build']);
});
