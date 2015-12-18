var gulp = require('gulp'),
    config = require('../../config');

gulp.task('files:favicon', function() {
  return gulp.src(config.src + 'favicon.ico')
    .pipe(gulp.dest(config.dest));
});
