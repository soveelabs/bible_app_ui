var gulp = require('gulp'),
    del = require('del'),
    config = require('../../config');

gulp.task("revision:cleanup", ['revision:init', 'revision:replace'], function(){
  del([config.dest + '*.min.*']);
  return del([config.dest + 'rev-manifest.json']);
})

