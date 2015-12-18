var gulp = require('gulp'),
    config = require('../../config');

gulp.task('files:html', function(){
  return gulp.src(['!' + config.src + '/bower_components/**/*.html', config.src + '**/*.html'])
    .pipe(gulp.dest(config.dest));
});
