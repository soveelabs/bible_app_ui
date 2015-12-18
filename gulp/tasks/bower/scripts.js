var gulp = require('gulp'),
    config = require('../../config'),
    mainBowerFiles = require('main-bower-files'),
    filter = require('gulp-filter'),
    order = require('gulp-order'),
    sourceMaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

gulp.task('bower:scripts', ['bower:init'], function() {
  return gulp.src(mainBowerFiles(), { base: 'bower_components' })
    .pipe(filter('**/*.js'))
    .pipe(order([
      '**/jquery.js',
      '**/angular.js',
      '**/sifter.js',
      '**/*.js'
    ]))
    .pipe(sourceMaps.init())
    .pipe(concat('vendor.min.js'))
    .pipe(uglify({mangle: false}))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest(config.dest + 'vendor'));
});
