var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('nodemon', ['build'], function () {
  return nodemon({
    script: 'app.js',
    ext: 'js ejs',
  });
});
