var gulp = require('gulp'),
    config = require('../../config');

gulp.task('files:images', function(){
  return gulp.src(config.src + 'img/*.*')
    .pipe(gulp.dest(config.dest + 'img'));
});
