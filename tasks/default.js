'use strict';

var gulp = require('gulp');

gulp.task('default', ['browserify'], function () {
    // execute watchers
    gulp.watch(['src/**/*.js','src/templates/*.hbs'], ['browserify']);
});