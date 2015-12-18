var gulp = require('gulp'),
    config = require('../../config'),
    mainBowerFiles = require('main-bower-files');

gulp.task('bower:mainFiles', ['bower:init'], function() {
  return gulp.src(mainBowerFiles(), {base: 'bower_components'})
    .pipe(gulp.dest(config.dest + 'bower_components'));
});
