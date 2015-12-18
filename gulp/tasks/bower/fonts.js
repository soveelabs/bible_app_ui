var gulp = require('gulp'),
    config = require('../../config'),
    mainBowerFiles = require('main-bower-files'),
    filter = require('gulp-filter'),
    rename = require('gulp-rename');

gulp.task('bower:fonts', ['bower:init'], function() {
  return gulp.src(mainBowerFiles(), {base: 'bower_components'})
    .pipe(filter([
      '**/fonts/*.otf',
      '**/fonts/*.eot',
      '**/fonts/*.ttf',
      '**/fonts/*.woff',
      '**/fonts/*.woff2',
      '**/fonts/*.svg'
    ]))
    .pipe(rename(function(path) {
      if (~path.dirname.indexOf('fonts')) {
        path.dirname = '/fonts'
      }
    }))
    .pipe(gulp.dest(config.dest));
});
