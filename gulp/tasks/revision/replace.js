var gulp = require('gulp'),
    config = require('../../config'),
    revCollector = require('gulp-rev-collector');

gulp.task('revision:replace', ['revision:init'], function(){
  return gulp.src([config.dest + 'rev-manifest.json', config.dest + 'index.html'])
    .pipe(revCollector({
      replaceReved: true
    }))
    .pipe(gulp.dest(config.dest));
});
