var gulp = require('gulp'),
    config = require('../../config'),
    mainBowerFiles = require('main-bower-files'),
    filter = require('gulp-filter'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css');

gulp.task('bower:stylesheets', ['bower:init'], function() {
  return gulp.src(mainBowerFiles(), { base: 'bower_components' })
    .pipe(filter('**/*.css'))
    .pipe(concat('vendor.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest(config.dest + 'vendor'));
});
